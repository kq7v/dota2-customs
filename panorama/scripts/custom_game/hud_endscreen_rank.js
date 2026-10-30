--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_PortraitFullBody = require('./EOM_PortraitFullBody.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Separator = require('./EOM_Separator.js');
var GenericPanel = require('./GenericPanel.js');
var carnival_entry = require('./carnival_entry.js');
var ProductImage = require('./ProductImage.js');
var RankTierIcon = require('./RankTierIcon.js');
var profile_info = require('./profile_info.js');
var netdata_utils = require('./netdata_utils.js');
var game_utils = require('./game_utils.js');
require('./Player.js');

$.GetContextPanel().AddClass("CosmeticPreviewLiveHidden");
if (!isSpectator()) {
  const getHeroSkinID = (ornament_data, heroName) => {
    if (heroName) {
      const playerHid = GetGoodIDByHeroName(heroName);
      for (const sid in ornament_data) {
        const skinData = ornament_data[sid];
        if (skinData.hid == playerHid && skinData.equip == 1) {
          return sid;
        }
      }
    }
    return heroName;
  };
  const showRankScore = () => {
    return isRankMode() || isKingsRankMode();
  };
  const LeftHeroList = [3000020, 3000029, 3000030];
  const [show, setShow] = libs.createSignal(false);
  const [end, setEnd] = libs.createSignal((CustomNetTables.GetTableValue("common", "game_state")?.state ?? "GameState_None") == "GameState_End");
  const [doubleScoreProp, setDoubleScoreProp] = libs.createSignal([]);
  const [protectedScoreProp, setProtectedScoreProp] = libs.createSignal([]);
  const [rankAlarm, setRankAlarm] = libs.createSignal(1);
  const [scoreCardUsed, setScoreCardUsed] = libs.createSignal(false);
  const [scoreCardUsing, setScoreCardUsing] = libs.createSignal(false);
  const [showPlayerQuestionnaire, setShowPlayerQuestionnaire] = libs.createSignal(false);
  const endScreenToNumber = (value, fallback = 0) => {
    const result = Number(value);
    return Number.isNaN(result) ? fallback : result;
  };
  const isCompletedAchievement = progress => progress.receive_progress != undefined;
  const getCompletedAchievementIDs = progresses => {
    const result = new Set();
    for (const progress of Object.values(progresses ?? {})) {
      if (isCompletedAchievement(progress)) {
        result.add(endScreenToNumber(progress.task_id));
      }
    }
    return result;
  };
  const AchievementNotice = props => libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "AchievementNotice",
    onactivate: () => {},
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "AchievementNoticeBackdrop",
        hittest: false
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "AchievementNoticeCard",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "AchievementNoticeShowcase",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "AchievementNoticeList",
                scroll: "x",
                get children() {
                  return libs.createComponent(libs.For, {
                    get each() {
                      return props.achievements;
                    },
                    children: achievement => libs.createComponent(EOM_Panel.EOM_Panel, {
                      get className() {
                        return libs.classNames("AchievementNoticeCardItem", {
                          red: achievement.quality == 4,
                          blue: achievement.quality == 2,
                          green: achievement.quality == 1,
                          gold: achievement.quality == 3
                        });
                      },
                      get children() {
                        return [libs.createComponent(EOM_Panel.EOM_Panel, {
                          className: "AchievementNoticeCardImage",
                          get backgroundImage() {
                            return `url('file://{images}/custom_game/achievement/${achievement.iconType}.png')`;
                          }
                        }), libs.createComponent(EOM_Label.EOM_Label, {
                          className: "AchievementNoticeCardName",
                          get text() {
                            return `#${achievement.iconType}_achievement`;
                          }
                        }), libs.createComponent(EOM_Label.EOM_Label, {
                          className: "AchievementNoticeCardScore",
                          get text() {
                            return $.Localize("#achievement_score") + achievement.score;
                          }
                        })];
                      }
                    })
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Label.EOM_Label, {
            id: "AchievementNoticeTitle",
            get text() {
              return $.Localize("#achievement_unlock") + "!";
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "AchievementNoticeConfirm",
            get onactivate() {
              return props.onClose;
            },
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                text: "#Popup_Button_Confirm"
              });
            }
          })];
        }
      })];
    }
  });
  const EndScreen = () => {
    const playerID = Players.GetLocalPlayer();
    let latestAchievementProgress = getNetDataCache("achievement_task_progresses", playerID);
    let latestAchievementTaskInfo = getNetDataCache("info_achievement_task");
    let achievementSnapshot = getCompletedAchievementIDs(latestAchievementProgress);
    let achievementSnapshotReady = latestAchievementProgress != undefined;
    let achievementNoticeShown = false;
    const [achievementProgress, setAchievementProgress] = libs.createSignal(latestAchievementProgress ?? {});
    const [achievementTaskInfo, setAchievementTaskInfo] = libs.createSignal(latestAchievementTaskInfo ?? {});
    const [achievementNoticeList, setAchievementNoticeList] = libs.createSignal([]);
    const [showAchievementNotice, setShowAchievementNotice] = libs.createSignal(false);
    const tryShowAchievementNotice = () => {
      if (!show() || achievementNoticeShown || !achievementSnapshotReady) return;
      const achievements = [];
      for (const progress of Object.values(achievementProgress())) {
        const achievementID = endScreenToNumber(progress.task_id);
        const task = achievementTaskInfo()[achievementID.toString()];
        if (achievementID <= 0 || achievementSnapshot.has(achievementID) || !task || endScreenToNumber(task.enable) != 1 || !isCompletedAchievement(progress)) {
          continue;
        }
        achievements.push({
          achievementID,
          iconType: endScreenToNumber(task.icon_type),
          quality: endScreenToNumber(task.quality),
          score: endScreenToNumber(task.score),
          completionTime: endScreenToNumber(progress.update_time)
        });
      }
      if (achievements.length > 0) {
        achievements.sort((a, b) => a.achievementID - b.achievementID);
        achievementNoticeShown = true;
        setAchievementNoticeList(achievements);
        setShowAchievementNotice(true);
      }
    };
    const resetAchievementSnapshot = () => {
      latestAchievementProgress = getNetDataCache("achievement_task_progresses", playerID);
      latestAchievementTaskInfo = getNetDataCache("info_achievement_task");
      achievementSnapshot = getCompletedAchievementIDs(latestAchievementProgress);
      achievementSnapshotReady = latestAchievementProgress != undefined;
      achievementNoticeShown = false;
      setAchievementProgress(latestAchievementProgress ?? {});
      setAchievementTaskInfo(latestAchievementTaskInfo ?? {});
      setAchievementNoticeList([]);
      setShowAchievementNotice(false);
    };
    const [settlement_reward, setSettlementReward] = libs.createSignal({});
    const [medal_reward, setMedalReward] = libs.createSignal(-1);
    const [playerPrivilege, setPlayerPrivilege] = libs.createSignal(CustomNetTables.GetTableValue("common", "player_privilege")?.[playerID]);
    const [playerRank, setPlayerRank] = libs.createSignal();
    const goldCoinBonus = () => (playerPrivilege()?.settlement_gold_bonus ?? 0) > 0;
    const [courierName, setCourierName] = libs.createSignal("5200000");
    const [heroName, setHeroName] = libs.createSignal();
    const [playerOrnamentHero, setPlayerOrnamentHero] = libs.createSignal({});
    const [heroSkinID, setHeroSkinID] = libs.createSignal((() => {
      const sid = getHeroSkinID(playerOrnamentHero(), heroName());
      if (sid) {
        return sid;
      } else {
        return "5100000";
      }
    })());
    const [settlementScoreData, setSettlementScoreData] = libs.createSignal();
    libs.createEffect(() => {
      const sid = getHeroSkinID(playerOrnamentHero(), heroName());
      if (sid) {
        setHeroSkinID(sid);
      } else {
        setHeroSkinID("5100000");
      }
    });
    libs.createEffect(() => {
      setShow(end() || playerRank() != undefined);
    });
    const updatePlayerDataInfo = data => {
      libs.batch(() => {
        setRankAlarm(data.rankAlarm);
        setHeroName(data.heroName);
      });
    };
    libs.onMount(() => {
      const GameEventIDs = [];
      const NetTableListenerIDs = [];
      GameEventIDs.push(useNetData("info_achievement_task", data => {
        latestAchievementTaskInfo = data ?? {};
        setAchievementTaskInfo(latestAchievementTaskInfo);
        tryShowAchievementNotice();
      }));
      GameEventIDs.push(useNetData("achievement_task_progresses", data => {
        latestAchievementProgress = data ?? {};
        if (!achievementSnapshotReady && !show()) {
          achievementSnapshot = getCompletedAchievementIDs(latestAchievementProgress);
          achievementSnapshotReady = true;
        }
        setAchievementProgress(latestAchievementProgress);
        tryShowAchievementNotice();
      }, playerID));
      GameEventIDs.push(useNetData("rank_score_change", data => {
        if (Object.keys(data).length > 0) {
          setSettlementScoreData(data);
          setDoubleScoreProp(data.double_prop);
          setProtectedScoreProp(data.projected_prop);
          setScoreCardUsed(data.use_prop == true);
        } else {
          setSettlementScoreData();
          setDoubleScoreProp([]);
          setProtectedScoreProp([]);
          setScoreCardUsed(false);
        }
      }, playerID));
      GameEventIDs.push(useNetData("player_questionnaire", data => {
        if (data?.questions && !showPlayerQuestionnaire()) {
          setShowPlayerQuestionnaire(true);
        } else {
          setShowPlayerQuestionnaire(false);
        }
      }, playerID));
      GameEventIDs.push(useNetData("settlement_rewards", data => {
        setSettlementReward(data?.add_item ?? {});
        setMedalReward(data?.medal_count ?? -1);
      }, playerID));
      NetTableListenerIDs.push(useNetTableKey("common", "game_state", data => {
        if (data.state == "GameState_None") {
          setSettlementScoreData();
          setDoubleScoreProp([]);
          setProtectedScoreProp([]);
        }
      }));
      GameEventIDs.push(useNetData("player_ornament", data => {
        libs.batch(() => {
          const courierList = getOrnamentWithType(data, OrnamentType.COURIER_SKIN);
          for (const courierID in courierList) {
            const courierData = courierList[courierID];
            if (courierData.equip == 1) {
              setCourierName(courierID);
              break;
            }
          }
          setPlayerOrnamentHero(getOrnamentWithType(data, OrnamentType.HERO_SKIN));
        });
      }, Players.GetLocalPlayer()));
      GameEventIDs.push(useNetData("player_active_box", data => {
        if (data.settlement_gain_count && data.settlement_gain_count > 0) {
          serverRequest("box_open", {
            bid: 2000098,
            pool: 93000001,
            amounts: data.settlement_gain_count
          }, data => {
            if (data.status == 0 && data?.data != undefined) {
              clientSideEvent("active_draw_box", data.data);
              GameEvents.SendEventClientSide("custom_ui_toggle_windows", {
                window_name: "MenuButton_active_star",
                state: 1
              });
            } else {
              console.log("fail");
            }
          });
        }
      }, Players.GetLocalPlayer()));
      NetTableListenerIDs.push(useNetTableKeyHasDefaultValue("player_data", playerID.toString(), data => {
        setPlayerRank(data.rank);
        if (show()) {
          updatePlayerDataInfo(data);
        }
      }));
      NetTableListenerIDs.push(useNetTableKey("common", "player_privilege", data => {
        if (data) {
          setPlayerPrivilege(data?.[playerID]);
        }
      }));
      NetTableListenerIDs.push(useNetTableKey("common", "game_state", data => {
        setEnd(data.state == "GameState_End");
        if (data.state == "GameState_None") {
          resetAchievementSnapshot();
          setShow(false);
        }
      }));
      libs.onCleanup(() => {
        GameEventIDs.forEach(id => {
          GameEvents.Unsubscribe(id);
        });
        NetTableListenerIDs.forEach(id => {
          CustomNetTables.UnsubscribeNetTableListener(id);
        });
      });
    });
    const [gradientShow, setGradientShow] = libs.createSignal(false);
    const [gradientShowClass, setGradientShowClass] = libs.createSignal("");
    libs.createEffect(() => {
      if (gradientShow() && showPlayerQuestionnaire()) {
        showPopup("PlayerQuestionnaire", {});
      }
    });
    libs.createEffect(libs.on(show, _show => {
      if (_show) {
        tryShowAchievementNotice();
        let duration = 1;
        if (end()) {
          setGradientShowClass("GameEnd");
          duration = 0.7;
        } else {
          setGradientShowClass("PlayerEnd");
        }
        $.Schedule(duration, () => {
          setGradientShow(true);
          setGradientShowClass("");
        });
        const player_data = CustomNetTables.GetTableValue("player_data", Players.GetLocalPlayer().toString());
        if (player_data) {
          updatePlayerDataInfo(player_data);
        }
      } else {
        setGradientShowClass("");
        setGradientShow(false);
      }
    }));
    return (() => {
      const _el$ = libs.createElement("Panel", {}, null);
      libs.setProp(_el$, "onactivate", () => {});
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return gradientShow();
        },
        get children() {
          return [libs.createComponent(PlayerEndMain, {
            get rank_score_data() {
              return settlementScoreData();
            },
            get courierName() {
              return courierName();
            },
            get heroSkinID() {
              return heroSkinID();
            },
            get medal_reward() {
              return medal_reward();
            },
            get goldCoinBonus() {
              return goldCoinBonus();
            },
            get settlement_reward() {
              return settlement_reward();
            },
            get rank() {
              return playerRank();
            },
            get heroName() {
              return heroName();
            }
          }), libs.createComponent(RankChange, {
            get rank_score_data() {
              return settlementScoreData();
            }
          })];
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!gradientShow())() && showAchievementNotice();
        },
        get children() {
          return libs.createComponent(AchievementNotice, {
            get achievements() {
              return achievementNoticeList();
            },
            onClose: () => setShowAchievementNotice(false)
          });
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$, "className", libs.classNames("EndScreenRoot", gradientShowClass(), {
        EndScreenShow: show()
      }), _$p));
      return _el$;
    })();
  };
  const PlayerEndMain = props => {
    const gameSeason = game_utils.GetGameSeason();
    const hid = () => KeyValues.UnitsCommonKv[props?.heroName ?? ""]?.Hid ?? -1;
    const leaderRank = () => finiteNumber(Number(props.rank_score_data?.leaderboard_rank), -1);
    const rank = () => props?.rank ?? -1;
    const sLanguage = $.Language().toLowerCase();
    const settlementItemSortWeight = {
      ["9310017"]: 101,
      ["1100001"]: 100,
      ["6100001"]: 99
    };
    const settlementList = () => Object.keys(props.settlement_reward).sort((a, b) => {
      const weight_a = settlementItemSortWeight[a] ?? 0;
      const weight_b = settlementItemSortWeight[b] ?? 0;
      return weight_b - weight_a;
    });
    const [rankScore, setRankScore] = libs.createSignal(-1);
    const rankInfo = libs.createMemo(() => getRankInfo(rankScore()));
    libs.createEffect(libs.on(gameSeason, game_season => {
      const data = getServiceNetTable("player_rank_score", Players.GetLocalPlayer());
      if (data && data[game_season]) {
        setRankScore(data[game_season].now_rank_score);
      }
    }));
    const nowScore = () => finiteNumber(Number(props.rank_score_data?.now_rank_score));
    const originScore = () => finiteNumber(Number(props.rank_score_data?.origin_rank_score));
    const changedScore = () => nowScore() - originScore();
    const fixedInfoModifyScore = () => {
      return changedScore();
    };
    const getRegameAmounts = () => {
      let c = 0;
      const data = CustomNetTables.GetAllTableValues("player_data");
      if (data) {
        Object.values(data).forEach(v => {
          if (v.value.regame_state == 1) {
            c++;
          }
        });
      }
      return c;
    };
    const [regameAmounts, setRegameAmounts] = libs.createSignal(getRegameAmounts());
    const [matchPlayerAmounts, setMatchPlayerAmounts] = libs.createSignal(8);
    const restartGameText = () => {
      return $.Localize("#EndScreen_RestartGame") + `(<font color='#6cd4b1'>${regameAmounts()}</font>/${Math.max(1, Math.floor(matchPlayerAmounts() / 2))})`;
    };
    const showPeakScore = libs.createMemo(() => {
      return props.rank_score_data?.origin_kings_score != undefined && props.rank_score_data?.now_kings_score != undefined;
    });
    libs.createEffect(() => {
      console.log("showPeakScore", props.rank_score_data);
    });
    const [peakScoreCount, setPeakScoreCount] = libs.createSignal(0);
    const [kingsRankState, setKingRankState] = libs.createSignal(true);
    const peakScore = () => props.rank_score_data?.now_kings_score ?? -1;
    const [activityList, setActivityList] = libs.createSignal([]);
    const carnivalOpen = carnival_entry.useCarnivalActivityOpen();
    libs.onMount(() => {
      const GameEventListenerIDs = [];
      const NetTableListenerIDs = [];
      NetTableListenerIDs.push(useSyncDataKey("common", "bounty_competition_mode", data => {
        setKingRankState(data?.state == true);
      }));
      NetTableListenerIDs.push(useServiceNetTable("player_rank_score", data => {
        if (data && data[gameSeason()]) {
          setRankScore(data[gameSeason()].now_rank_score);
        }
      }, Players.GetLocalPlayer()));
      NetTableListenerIDs.push(CustomNetTables.SubscribeNetTableListener("player_data", (_, playerID, data) => {
        setRegameAmounts(getRegameAmounts());
      }));
      NetTableListenerIDs.push(useNetTableKeyHasDefaultValue("common", "match_player_amounts", data => {
        setMatchPlayerAmounts(data?.count ?? 8);
      }));
      GameEventListenerIDs.push(useClientGlobalData("peak_sign_up_info", data => {
        if (data.count != undefined) {
          setPeakScoreCount(data.count);
        }
      }));
      GameEventListenerIDs.push(useNetData("info_activity_data", data => {
        let now = Math.floor(Date.now() / 1000);
        let filterList = [];
        for (const activityInfo of data) {
          if (now < activityInfo.start_time) {
            continue;
          }
          if (activityInfo.end_time > now || activityInfo.end_time == 0) {
            filterList.push(activityInfo.activity_id);
          }
        }
        setActivityList(filterList);
      }));
      libs.onCleanup(() => {
        GameEventListenerIDs.forEach(id => GameEvents.Unsubscribe(id));
        NetTableListenerIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
      });
    });
    const [HasNewRegressionPlayer, setHasNewRegressionPlayer] = libs.createSignal(false);
    netdata_utils.createNetDataEffect("match_new_regression_players", data => {
      if (data && (data?.new_players != undefined || data?.regression_players != undefined)) {
        setHasNewRegressionPlayer(true);
      } else {
        setHasNewRegressionPlayer(false);
      }
    });
    let _time = getPeakScoreRegionTime();
    let PeakScoreEnable = false;
    let server_time = ServerTimestamp();
    if (server_time >= _time.start_time && server_time < _time.end_time) {
      PeakScoreEnable = true;
    }
    const weeklyMatchData = netdata_utils.createPlayerNetData("weekly_league_data", Players.GetLocalPlayer());
    const weekly_tier = () => weeklyMatchData()?.tier ?? 1;
    return (() => {
      const _el$2 = libs.createElement("Panel", {}, null);
      libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RankAndRewards",
        get classList() {
          return {
            RankMatch: showRankScore()
          };
        },
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RankInfo",
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return showRankScore();
                },
                fallback: () => [libs.createComponent(EOM_Panel.EOM_Panel, {
                  get className() {
                    return libs.classNames("RankIcon", {
                      Higher: rank() <= 3
                    });
                  },
                  get children() {
                    return libs.createComponent(GenericPanel.CLabel, {
                      get text() {
                        return rank();
                      }
                    });
                  }
                }), libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "RankLabels",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "RankTitle",
                      text: "#player_rank",
                      get dialogVariables() {
                        return {
                          rank: rank()
                        };
                      }
                    }), libs.createComponent(libs.Switch, {
                      fallback: () => libs.createComponent(GenericPanel.CLabel, {
                        id: "EncouragementText",
                        className: sLanguage,
                        text: "#EndScreen_PlayerEnd4",
                        html: true
                      }),
                      get children() {
                        return [libs.createComponent(libs.Match, {
                          get when() {
                            return rank() == 1;
                          },
                          get children() {
                            return libs.createComponent(GenericPanel.CLabel, {
                              id: "EncouragementText",
                              className: sLanguage,
                              text: "#EndScreen_PlayerEnd1",
                              html: true
                            });
                          }
                        }), libs.createComponent(libs.Match, {
                          get when() {
                            return rank() == 2;
                          },
                          get children() {
                            return libs.createComponent(GenericPanel.CLabel, {
                              id: "EncouragementText",
                              className: sLanguage,
                              text: "#EndScreen_PlayerEnd2",
                              html: true
                            });
                          }
                        }), libs.createComponent(libs.Match, {
                          get when() {
                            return rank() == 3;
                          },
                          get children() {
                            return libs.createComponent(GenericPanel.CLabel, {
                              id: "EncouragementText",
                              className: sLanguage,
                              text: "#EndScreen_PlayerEnd3",
                              html: true
                            });
                          }
                        })];
                      }
                    })];
                  }
                }), libs.createComponent(EOM_Panel.EOM_Panel, {
                  className: "GainMedalContainer",
                  id: "Medal",
                  get visible() {
                    return props.medal_reward > 0;
                  },
                  get children() {
                    return [libs.createComponent(EOM_Icon.EOM_Icon, {
                      size: "128",
                      get src() {
                        return getSrcPath("icon/medal_larger.png");
                      }
                    }), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "MedalAmounts",
                      get children() {
                        return libs.createComponent(GenericPanel.CLabel, {
                          get text() {
                            return `+${props.medal_reward}`;
                          }
                        });
                      }
                    })];
                  }
                })],
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "PlayerRankScore",
                    get children() {
                      return [libs.createComponent(RankTierIcon.RankTierIcon, {
                        get rank_score() {
                          return rankScore();
                        },
                        get rank() {
                          return leaderRank();
                        },
                        show_title: true,
                        size: "300"
                      }), (() => {
                        const _el$3 = libs.createElement("Panel", {
                            id: "RankRightInfo"
                          }, null),
                          _el$4 = libs.createElement("Panel", {
                            id: "RankScoreInfo"
                          }, _el$3),
                          _el$5 = libs.createElement("Panel", {
                            id: "RankRightBottomInfo"
                          }, _el$4);
                        libs.insert(_el$3, libs.createComponent(GenericPanel.CLabel, {
                          id: "RankTitle",
                          text: "#player_rank",
                          get dialogVariables() {
                            return {
                              rank: rank()
                            };
                          }
                        }), _el$4);
                        libs.insert(_el$3, libs.createComponent(libs.Switch, {
                          fallback: () => libs.createComponent(GenericPanel.CLabel, {
                            id: "EncouragementText",
                            className: sLanguage,
                            text: "#EndScreen_PlayerEnd4",
                            html: true
                          }),
                          get children() {
                            return [libs.createComponent(libs.Match, {
                              get when() {
                                return rank() == 1;
                              },
                              get children() {
                                return libs.createComponent(GenericPanel.CLabel, {
                                  id: "EncouragementText",
                                  className: sLanguage,
                                  text: "#EndScreen_PlayerEnd1",
                                  html: true
                                });
                              }
                            }), libs.createComponent(libs.Match, {
                              get when() {
                                return rank() == 2;
                              },
                              get children() {
                                return libs.createComponent(GenericPanel.CLabel, {
                                  id: "EncouragementText",
                                  className: sLanguage,
                                  text: "#EndScreen_PlayerEnd2",
                                  html: true
                                });
                              }
                            }), libs.createComponent(libs.Match, {
                              get when() {
                                return rank() == 3;
                              },
                              get children() {
                                return libs.createComponent(GenericPanel.CLabel, {
                                  id: "EncouragementText",
                                  className: sLanguage,
                                  text: "#EndScreen_PlayerEnd3",
                                  html: true
                                });
                              }
                            })];
                          }
                        }), _el$4);
                        libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
                          id: "RankScoreMedal",
                          get children() {
                            return [libs.createComponent(EOM_Icon.EOM_Icon, {
                              size: "48",
                              get src() {
                                return getSrcPath("icon/icon_rank_cup.png");
                              }
                            }), libs.createComponent(libs.Show, {
                              get when() {
                                return rankInfo().score_up == 0;
                              },
                              fallback: () => libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "RankScoreProgressBar",
                                get children() {
                                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "RankScoreProgressBarUpper",
                                    get children() {
                                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                                        backgroundColor: "#fff",
                                        height: "100%",
                                        get width() {
                                          return `${rankInfo().rela_score / Math.max(rankInfo().score_up, 1) * 100}%`;
                                        }
                                      });
                                    }
                                  }), (() => {
                                    const _el$19 = libs.createElement("Label", {
                                      get text() {
                                        return `${rankInfo().rela_score}/${rankInfo().score_up}`;
                                      }
                                    }, null);
                                    libs.effect(_$p => libs.setProp(_el$19, "text", `${rankInfo().rela_score}/${rankInfo().score_up}`, _$p));
                                    return _el$19;
                                  })()];
                                }
                              }),
                              get children() {
                                return libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "RankScoreMedalInfo",
                                  get children() {
                                    return libs.createComponent(GenericPanel.CLabel, {
                                      get text() {
                                        return rankInfo().rela_score;
                                      }
                                    });
                                  }
                                });
                              }
                            }), libs.createComponent(GenericPanel.CLabel, {
                              id: "ModifyScore",
                              get className() {
                                return libs.classNames({
                                  Up: fixedInfoModifyScore() > 0,
                                  Down: fixedInfoModifyScore() < 0
                                });
                              },
                              get text() {
                                return libs.memo(() => fixedInfoModifyScore() == 0)() ? `-${fixedInfoModifyScore()}` : libs.memo(() => fixedInfoModifyScore() > 0)() ? `+${fixedInfoModifyScore()}` : fixedInfoModifyScore();
                              }
                            }), libs.createComponent(EOM_Panel.EOM_Panel, {
                              id: "PropEffect",
                              get children() {
                                return libs.createComponent(libs.Switch, {
                                  get children() {
                                    return [libs.createComponent(libs.Match, {
                                      get when() {
                                        return doubleScoreProp().length > 0;
                                      },
                                      get children() {
                                        return libs.createComponent(libs.Index, {
                                          get each() {
                                            return doubleScoreProp();
                                          },
                                          children: (id, i) => libs.createComponent(ProductImage.ProductImage, {
                                            get itemid() {
                                              return id();
                                            },
                                            count: 1
                                          })
                                        });
                                      }
                                    }), libs.createComponent(libs.Match, {
                                      get when() {
                                        return protectedScoreProp().length > 0;
                                      },
                                      get children() {
                                        return libs.createComponent(libs.Index, {
                                          get each() {
                                            return protectedScoreProp();
                                          },
                                          children: (id, i) => libs.createComponent(ProductImage.ProductImage, {
                                            get itemid() {
                                              return id();
                                            },
                                            count: 1
                                          })
                                        });
                                      }
                                    })];
                                  }
                                });
                              }
                            })];
                          }
                        }), _el$5);
                        libs.insert(_el$5, libs.createComponent(libs.Show, {
                          get when() {
                            return rankAlarm() < 1;
                          },
                          get children() {
                            return libs.createComponent(EOM_Panel.EOM_Panel, {
                              id: "RankAlarm",
                              tooltip_text: "#RankAlarm",
                              get dialogVariables() {
                                return {
                                  value: (1 - rankAlarm()) * 100
                                };
                              },
                              get children() {
                                return [libs.createElement("Image", {
                                  "class": "Alarm"
                                }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "AlarmLabel",
                                  get children() {
                                    return libs.createComponent(GenericPanel.CLabel, {
                                      text: "#RankDifference"
                                    });
                                  }
                                })];
                              }
                            });
                          }
                        }), null);
                        libs.insert(_el$5, libs.createComponent(libs.Show, {
                          get when() {
                            return libs.memo(() => !!isKingsRankMode())() && showPeakScore();
                          },
                          get children() {
                            return libs.createComponent(EOM_Panel.EOM_Panel, {
                              className: "PeakScore",
                              get children() {
                                return [libs.createComponent(EOM_Icon.EOM_Icon, {
                                  id: "PeakScoreIcon",
                                  get src() {
                                    return getSrcPath("icon/peak_score_icon.png");
                                  },
                                  onmouseover: self => {
                                    $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#PeakScore", "#PeakScore_description");
                                  },
                                  onmouseout: self => {
                                    $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                                  }
                                }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                  className: "PeakScoreLabel",
                                  get children() {
                                    return libs.createComponent(EOM_Label.EOM_Label, {
                                      get text() {
                                        return libs.memo(() => peakScore() == -1)() ? "???" : peakScore();
                                      }
                                    });
                                  }
                                })];
                              }
                            });
                          }
                        }), null);
                        return _el$3;
                      })()];
                    }
                  });
                }
              });
            }
          }), libs.createComponent(profile_info.ProfileInfo, {
            get player_id() {
              return Players.GetLocalPlayer();
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            get visible() {
              return settlementList().length > 0 || props.medal_reward > 0;
            },
            id: "RewardInfo",
            get children() {
              return [libs.createComponent(GenericPanel.CLabel, {
                id: "RewardTitle",
                text: "#EndScreen_Rewards"
              }), libs.createComponent(EOM_Separator.EOM_Separator, {}), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RewardList",
                scroll: "y",
                get children() {
                  return [libs.createComponent(libs.Show, {
                    get when() {
                      return props.medal_reward && props.medal_reward > 0;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        get className() {
                          return libs.classNames("RewardRow");
                        },
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "ProductImage",
                            get backgroundImage() {
                              return getImagePath("icon/medal.png");
                            },
                            onmouseover: self => {
                              $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#SummaryMedal", "#SummaryMedal_description");
                            },
                            onmouseout: self => {
                              $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            className: "ProductCount",
                            get text() {
                              return "×" + props.medal_reward;
                            }
                          })];
                        }
                      });
                    }
                  }), libs.createComponent(libs.For, {
                    get each() {
                      return settlementList();
                    },
                    children: (itemID, index) => {
                      const count = () => props.settlement_reward?.[Number(itemID)] ?? 0;
                      const isGoldCoin = itemID == "1100001";
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        get className() {
                          return libs.classNames("RewardRow");
                        },
                        get children() {
                          return [libs.createComponent(EOM_Image.EOM_Image, {
                            className: "ProductImage",
                            get src() {
                              return getProductSrc(itemID);
                            },
                            onmouseover: self => {
                              $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + itemID, "#" + itemID + "_description");
                            },
                            onmouseout: self => {
                              $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            className: "ProductCount",
                            get text() {
                              return "×" + count();
                            }
                          }), libs.createComponent(libs.Switch, {
                            get children() {
                              return [libs.createComponent(libs.Match, {
                                get when() {
                                  return isGoldCoin && props.goldCoinBonus;
                                },
                                get children() {
                                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                                    className: "VipBonusLabel",
                                    get children() {
                                      return [libs.createComponent(EOM_Icon.EOM_Icon, {
                                        size: "16",
                                        get src() {
                                          return getSrcPath("icon/icon_arrow_vip.png");
                                        }
                                      }), libs.createComponent(GenericPanel.CLabel, {
                                        text: "20%"
                                      }), libs.createComponent(EOM_Icon.EOM_Icon, {
                                        size: "24",
                                        get src() {
                                          return getSrcPath("icon/vip_icon_smallest.png");
                                        }
                                      })];
                                    }
                                  });
                                }
                              }), libs.createComponent(libs.Match, {
                                when: itemID == "1100083",
                                get children() {
                                  return [libs.createComponent(libs.Show, {
                                    get when() {
                                      return HasNewRegressionPlayer();
                                    },
                                    get children() {
                                      return libs.createComponent(carnival_entry.NewRegressionIcon, {
                                        tooltip_text: "#Activity_PDD_extra_drop",
                                        marginLeft: "10px",
                                        verticalAlign: "center"
                                      });
                                    }
                                  }), libs.createComponent(EOM_Button.EOM_Button, {
                                    id: "Activity_PDDJumpButton",
                                    text: "#Activity_PDD_Jump",
                                    onactivate: () => {
                                      clientSideEvent("switchActivityTag", {
                                        id: "20001"
                                      });
                                      ToggleWindows('MenuButton_activity', true);
                                    }
                                  })];
                                }
                              })];
                            }
                          })];
                        }
                      });
                    }
                  })];
                }
              })];
            }
          })];
        }
      }), null);
      libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "HeroAndCourier",
        hittest: false,
        get children() {
          return [libs.createComponent(libs.Show, {
            get when() {
              return props.heroSkinID;
            },
            get children() {
              return libs.createComponent(EOM_PortraitFullBody.EOM_PortraitFullBody, {
                get className() {
                  return libs.classNames({
                    HorizontalMirror: !LeftHeroList.includes(hid())
                  });
                },
                id: "Hero",
                showPedestal: false,
                allowrotation: false,
                get unitname() {
                  return props.heroSkinID;
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return props.courierName;
            },
            get children() {
              return libs.createComponent(EOM_PortraitFullBody.EOM_PortraitFullBody, {
                id: "Courier",
                showPedestal: false,
                allowrotation: false,
                get unitname() {
                  return props.courierName;
                }
              });
            }
          })];
        }
      }), null);
      libs.insert(_el$2, libs.createComponent(libs.Show, {
        get when() {
          return props.rank_score_data?.weekly_now_score != undefined;
        },
        get children() {
          const _el$7 = libs.createElement("Panel", {
              id: "WeeklyRankInfo"
            }, null);
            libs.createElement("Label", {
              id: "WeeklyMatchTitleLabel",
              text: "#ProfileTag_WeeklyMatch"
            }, _el$7);
            const _el$9 = libs.createElement("Image", {}, _el$7),
            _el$0 = libs.createElement("Panel", {}, _el$7),
            _el$1 = libs.createElement("Label", {
              get text() {
                return "#WeeklyMatch_Tier" + weekly_tier();
              }
            }, _el$0);
          libs.setProp(_el$0, "className", "RankTierName");
          libs.insert(_el$7, libs.createComponent(EOM_Panel.EOM_Panel, {
            "class": "WeeklyInfoRow",
            flowChildren: "right",
            horizontalAlign: "center",
            get children() {
              return [libs.createElement("Label", {
                "class": "title",
                text: "#ProfileBadge"
              }, null), (() => {
                const _el$11 = libs.createElement("Label", {
                  "class": "info nowscore",
                  get text() {
                    return props.rank_score_data.weekly_now_score;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$11, "text", props.rank_score_data.weekly_now_score, _$p));
                return _el$11;
              })(), (() => {
                const _el$12 = libs.createElement("Label", {
                  "class": "score",
                  get text() {
                    return "+" + ((props.rank_score_data.weekly_now_score ?? 0) - (props.rank_score_data.weekly_origin_score ?? 0));
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$12, "text", "+" + ((props.rank_score_data.weekly_now_score ?? 0) - (props.rank_score_data.weekly_origin_score ?? 0)), _$p));
                return _el$12;
              })()];
            }
          }), null);
          libs.insert(_el$7, libs.createComponent(EOM_Panel.EOM_Panel, {
            "class": "WeeklyInfoRow title",
            flowChildren: "right",
            horizontalAlign: "center",
            get children() {
              return [libs.createElement("Label", {
                "class": "title",
                text: "#BountyListRank"
              }, null), libs.createComponent(libs.Show, {
                get when() {
                  return (props.rank_score_data.weekly_now_rank ?? 0) > 0;
                },
                get fallback() {
                  return libs.createElement("Label", {
                    "class": "info",
                    text: "#WeeklyMatch_Status_Matching"
                  }, null);
                },
                get children() {
                  return [(() => {
                    const _el$14 = libs.createElement("Label", {
                      "class": "info",
                      get text() {
                        return props.rank_score_data.weekly_now_rank;
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$14, "text", props.rank_score_data.weekly_now_rank, _$p));
                    return _el$14;
                  })(), libs.createComponent(libs.Show, {
                    get when() {
                      return props.rank_score_data.weekly_now_rank != props.rank_score_data.weekly_origin_rank;
                    },
                    get children() {
                      const _el$15 = libs.createElement("Image", {}, null);
                      libs.effect(_$p => libs.setProp(_el$15, "className", libs.classNames("WeeklyArrow", {
                        Up: props.rank_score_data.weekly_now_rank < (props.rank_score_data.weekly_origin_rank ?? 999),
                        Down: props.rank_score_data.weekly_now_rank > (props.rank_score_data.weekly_origin_rank ?? 999)
                      }), _$p));
                      return _el$15;
                    }
                  })];
                }
              })];
            }
          }), null);
          libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "WeeklyMatchDetailButton",
            onactivate: () => {
              ToggleWindows("MenuButton_profile", true);
              clientSideEvent("menu_bar_profile_tab", {
                tag: "ProfileTag_WeeklyMatch"
              });
            },
            get children() {
              return libs.createElement("Label", {
                text: "#ShowDetail"
              }, null);
            }
          }), null);
          libs.effect(_p$ => {
            const _v$ = libs.classNames("WeeklyRankIcon", "small", "Tier" + weekly_tier()),
              _v$2 = "#WeeklyMatch_Tier" + weekly_tier();
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$9, "className", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "text", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$7;
        }
      }), null);
      libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "EndScreenButtons",
        get children() {
          return [libs.createComponent(libs.Show, {
            get when() {
              return carnivalOpen();
            },
            get children() {
              return libs.createComponent(carnival_entry.CarnivalEntry, {
                variant: "endscreen"
              });
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "FeedBackButton",
            onactivate: () => showPopup("Feedback", {}),
            tooltip_text: "#Feedback_Title"
          }), libs.createComponent(EOM_Button.EOM_Button, {
            color: "Blue",
            onactivate: () => {
              GameEvents.SendCustomEventToServer("regame_request", {});
              setShow(false);
            },
            get text() {
              return restartGameText();
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            color: "Gold",
            onactivate: () => {
              if (getPlayerData(Players.GetLocalPlayer(), "regame_state") == 1) {
                GameEvents.SendCustomEventToServer("regame_request", {});
              }
              setShow(false);
            },
            text: "#Popup_Button_Confirm",
            html: true
          })];
        }
      }), null);
      libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Advertisements",
        get children() {
          return [libs.createComponent(libs.Show, {
            when: T11LinkageEnable,
            get children() {
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                id: "ToT11Btn",
                "class": sLanguage,
                onactivate: () => {
                  $.DispatchEvent('DOTAShowCustomGamePage', 3591915450);
                  $.DispatchEvent('DOTASubscribeToCustomGame', 3591915450);
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            when: T12LinkageEnable,
            get children() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                id: "ToT12Btn",
                text: "#ToT12BtnText",
                onactivate: () => {
                  $.DispatchEvent('DOTAShowCustomGamePage', 3516074756);
                  $.DispatchEvent('DOTASubscribeToCustomGame', 3516074756);
                }
              });
            }
          }), libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => !!isKingsRankMode())() && peakScoreCount() >= 5;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "PeakCupRegion",
                    onactivate: () => {},
                    get children() {
                      return libs.createComponent(EOM_Label.EOM_Label, {
                        id: "PeakCupRegionLabel",
                        text: "#SelectRegion"
                      });
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => !!(PeakScoreEnable && isRankMode()))() && rankScore() >= 15200;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "PeakCupInvitationContainer",
                    hittest: false,
                    get children() {
                      return [libs.createElement("DOTAParticleScenePanel", {
                        id: "PeakCupInvitationParticle2",
                        hittest: false,
                        particleName: "particles/eom/ui/ui_fx/ui_fx_s2_start_game.vpcf",
                        cameraOrigin: "-2 0 400",
                        lookAt: "-2 0 0",
                        fov: 45,
                        particleonly: true
                      }, null), libs.createComponent(EOM_Button.EOM_BaseButton, {
                        id: "PeakCupInvitation",
                        onactivate: () => {
                          showPopup("PeakArena", {});
                        },
                        get children() {
                          return [libs.createComponent(EOM_Image.EOM_Image, {
                            id: "PeakCupInvitationBG"
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            id: "PeakCupInvitationLabel",
                            text: "#Activity_Dianfengsai_Invitation"
                          })];
                        }
                      }), libs.createElement("DOTAParticleScenePanel", {
                        id: "PeakCupInvitationParticle",
                        hittest: false,
                        particleName: "particles/eom/ui/ui_fx/ui_fx_s2_start_game_03.vpcf",
                        cameraOrigin: "-2 0 400",
                        lookAt: "-2 0 0",
                        fov: 45,
                        particleonly: true
                      }, null)];
                    }
                  });
                }
              })];
            }
          })];
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$2, "className", libs.classNames("PlayerEndMain"), _$p));
      return _el$2;
    })();
  };
  const animationDuration = 1;
  const RankChange = props => {
    const [changing, setChanging] = libs.createSignal(false);
    const nowScore = () => finiteNumber(Number(props.rank_score_data?.now_rank_score));
    const originScore = () => finiteNumber(Number(props.rank_score_data?.origin_rank_score));
    const leaderRank = () => finiteNumber(Number(props.rank_score_data?.leaderboard_rank), -1);
    const nowTier = () => getRankInfo(nowScore()).tier;
    const oldTier = () => getRankInfo(originScore()).tier;
    const nowNum = () => getRankInfo(nowScore()).num;
    const oldNum = () => getRankInfo(originScore()).num;
    const [currentScore, setCurrentScore] = libs.createSignal(originScore());
    const scoreDiff = () => nowScore() - originScore();
    const [upgrading, setUpgrading] = libs.createSignal(false);
    const projected = () => finiteNumber(Number(props.rank_score_data?.projected)) == 1;
    const rankShow = () => showRankScore() && props.rank_score_data != undefined && (originScore() != nowScore() || projected());
    const kingScoreShow = () => (props.rank_score_data?.now_kings_score ?? 0) != (props.rank_score_data?.origin_kings_score ?? 0);
    const [scoreChangeeShow, setScoreChangeShow] = libs.createSignal(rankShow() || kingScoreShow());
    const showPeakScore = libs.createMemo(() => {
      return props.rank_score_data?.origin_kings_score != undefined && props.rank_score_data?.now_kings_score != undefined;
    });
    const peakScore = () => props.rank_score_data?.now_kings_score ?? -1;
    const peakScoreDiff = libs.createMemo(() => {
      if (showPeakScore()) {
        return (props.rank_score_data?.now_kings_score ?? 0) - Math.max(0, props.rank_score_data?.origin_kings_score ?? 0);
      }
      return 0;
    });
    const [scoreCardInfo, setScoreCardInfo] = libs.createSignal({});
    const canUseScoreCard = () => {
      return !scoreCardUsed() && scoreDiff() != 0;
    };
    const updateScoreCardInfo = data => {
      const info = {};
      if (data) {
        Object.entries(data).map(([id, v], index) => {
          if (info[v.prop_id] == undefined) {
            if (v.prop_id == 9310015) {
              info[v.prop_id] = id;
            } else if (v.prop_id == 9310016) {
              info[v.prop_id] = id;
            }
          }
        });
      }
      setScoreCardInfo(info);
    };
    let rankChangeRoot;
    libs.createEffect(libs.on(currentScore, current_score => {
      if (rankShow() && !upgrading()) Game.EmitSound("Item.PickUpGemShop");
    }));
    libs.createEffect(libs.on(() => props.rank_score_data, data => {
      setScoreChangeShow(rankShow() || kingScoreShow());
    }));
    const upgrade = () => {
      if (nowNum() == oldNum() && oldTier() == nowTier()) return;
      const current_originScore = originScore();
      const current_nowScore = nowScore();
      const up = current_nowScore > current_originScore;
      if (rankChangeRoot && rankChangeRoot?.IsValid()) {
        let animationRoot = rankChangeRoot.FindChild("AnimationRoot");
        let particleRoot = rankChangeRoot.FindChild("ParticleRoot");
        if (animationRoot && animationRoot?.IsValid()) {
          let soundIndex = -1;
          let seq = new RunSequentialActions();
          if (up) {
            setUpgrading(true);
            let rep_1 = [];
            let rep_2;
            seq.actions.push(new RunFunctionAction(() => {
              soundIndex = Game.EmitSound("ui.treasure.underscore");
              if (animationRoot && animationRoot?.IsValid()) {
                animationRoot.RemoveAndDeleteChildren();
                if (animationRoot && animationRoot?.IsValid()) {
                  rep_2 = $.CreatePanel("Panel", animationRoot, "");
                  rep_2.style.width = "100%";
                  rep_2.style.height = "100%";
                  libs.render(() => libs.createComponent(RankTierIcon.RankTierIcon, {
                    className: "UpgradeUpNewInit",
                    rank_score: current_nowScore,
                    get rank() {
                      return leaderRank();
                    }
                  }), rep_2);
                }
                for (let i = 0; i < 10; i++) {
                  let p = $.CreatePanel("Panel", animationRoot, "");
                  rep_1.push(p);
                  p.style.width = "100%";
                  p.style.height = "100%";
                  libs.render(() => libs.createComponent(RankTierIcon.RankTierIcon, {
                    className: "UpgradeUpOldInit",
                    rank_score: current_originScore,
                    get rank() {
                      return leaderRank();
                    }
                  }), p);
                }
              }
            }));
            seq.actions.push(new WaitAction(0.5));
            seq.actions.push(new RunFunctionAction(() => {
              if (particleRoot && particleRoot?.IsValid()) {
                libs.render(() => libs.createElement("DOTAParticleScenePanel", {
                  id: "ScenePanel",
                  particleName: "particles/eom/ui/settlement_fx/settlement_fx_1.vpcf",
                  cameraOrigin: "0 0 800",
                  lookAt: "0 0 0",
                  fov: "60",
                  hittest: false
                }, null), particleRoot);
              }
            }));
            seq.actions.push(new WaitAction(0.1));
            seq.actions.push(new RunFunctionAction(() => {
              rep_1.forEach((p, i) => {
                if (p && p?.IsValid()) {
                  let icon = p.GetChild(0);
                  if (icon && icon?.IsValid()) {
                    icon.AddClass("UpgradeUpOldSplitOut" + i);
                  }
                }
              });
              if (soundIndex != -1) {
                Game.StopSound(soundIndex);
              }
              if (rep_2 && rep_2?.IsValid()) {
                let icon = rep_2.FindChildrenWithClassTraverse("RankTierIcon")[0];
                if (icon) {
                  icon.AddClass("UpgradeUpNewShow");
                  Game.EmitSound("ui.badge_levelup");
                }
              }
            }));
            seq.actions.push(new WaitAction(0.4));
            seq.actions.push(new RunFunctionAction(() => {
              if (rep_2 && rep_2?.IsValid()) {
                let icon2 = rep_2.FindChildrenWithClassTraverse("RankTierIcon")[0];
                if (icon2) {
                  icon2.AddClass("UpgradeUpNewShining");
                }
              }
            }));
            seq.actions.push(new WaitAction(0.7));
            seq.actions.push(new RunFunctionAction(() => {
              setUpgrading(false);
            }));
            seq.actions.push(new WaitAction(0.3));
            seq.actions.push(new RunFunctionAction(() => {
              if (rep_2 && rep_2?.IsValid()) {
                let icon2 = rep_2.FindChildrenWithClassTraverse("RankTierIcon")[0];
                if (icon2) {
                  icon2.RemoveClass("UpgradeUpNewShow");
                }
              }
            }));
            seq.actions.push(new WaitAction(0.2));
            seq.actions.push(new RunFunctionAction(() => {
              if (animationRoot && animationRoot?.IsValid()) {
                animationRoot.RemoveAndDeleteChildren();
              }
            }));
            RunSingleAction(seq);
          } else {
            setUpgrading(true);
            let rep_1;
            let rep_2;
            seq.actions.push(new RunFunctionAction(() => {
              soundIndex = Game.EmitSound("ui.treasure.underscore");
              if (animationRoot && animationRoot?.IsValid()) {
                animationRoot.RemoveAndDeleteChildren();
                if (animationRoot && animationRoot?.IsValid()) {
                  rep_2 = $.CreatePanel("Panel", animationRoot, "");
                  rep_2.style.width = "100%";
                  rep_2.style.height = "100%";
                  libs.render(() => libs.createComponent(RankTierIcon.RankTierIcon, {
                    className: "UpgradeUpNewInit",
                    rank_score: current_nowScore,
                    get rank() {
                      return leaderRank();
                    }
                  }), rep_2);
                  rep_1 = $.CreatePanel("Panel", animationRoot, "");
                  rep_1.style.width = "100%";
                  rep_1.style.height = "100%";
                  libs.render(() => libs.createComponent(RankTierIcon.RankTierIcon, {
                    className: "UpgradeDownOldInit",
                    rank_score: current_originScore,
                    get rank() {
                      return leaderRank();
                    }
                  }), rep_1);
                }
              }
            }));
            seq.actions.push(new WaitAction(0.2));
            seq.actions.push(new RunFunctionAction(() => {
              if (soundIndex != -1) {
                Game.StopSound(soundIndex);
              }
              if (rep_1 && rep_1?.IsValid()) {
                let icon = rep_1.FindChildrenWithClassTraverse("RankTierIcon")[0];
                if (icon) {
                  icon.AddClass("UpgradeUpOldOut");
                }
              }
              if (rep_2 && rep_2?.IsValid()) {
                let icon = rep_2.FindChildrenWithClassTraverse("RankTierIcon")[0];
                if (icon) {
                  icon.AddClass("UpgradeUpNewShow");
                  Game.EmitSound("Game_End_Scoreboard_Appear");
                }
              }
              if (particleRoot && particleRoot?.IsValid()) {
                particleRoot.AddClass("Down");
                libs.render(() => [libs.createElement("DOTAParticleScenePanel", {
                  id: "ScenePanel3",
                  particleName: "particles/eom/ui/settlement_fx/settlement_fx_1a.vpcf",
                  cameraOrigin: "0 0 800",
                  lookAt: "0 0 0",
                  fov: "85",
                  hittest: false
                }, null), libs.createElement("DOTAParticleScenePanel", {
                  id: "ScenePanel",
                  particleName: "particles/eom/ui/settlement_fx/downgrade_arrow.vpcf",
                  cameraOrigin: "600 0 0",
                  lookAt: "0 0 0",
                  fov: "25",
                  hittest: false
                }, null), libs.createElement("DOTAParticleScenePanel", {
                  id: "ScenePanel2",
                  particleName: "particles/econ/items/lina/lina_ti6/lina_ti6_laguna_blade_startpoint_halo.vpcf",
                  cameraOrigin: "0 0 900",
                  lookAt: "0 0 -1",
                  fov: "60",
                  hittest: false
                }, null)], particleRoot);
              }
            }));
            seq.actions.push(new WaitAction(0.2));
            seq.actions.push(new RunFunctionAction(() => {
              setUpgrading(false);
            }));
            seq.actions.push(new WaitAction(0.2));
            seq.actions.push(new RunFunctionAction(() => {
              if (animationRoot && animationRoot?.IsValid()) {
                animationRoot.RemoveAndDeleteChildren();
              }
            }));
            RunSingleAction(seq);
          }
        }
      }
    };
    let timer = -1;
    const clearTimers = newScore => {
      if (timer != -1) {
        setChanging(false);
        clearInterval(timer);
        timer = -1;
        upgrade();
        if (newScore) {
          setCurrentScore(newScore);
        }
      }
    };
    const startAnim = () => {
      clearTimers();
      const current_oldScore = originScore();
      const current_newScore = nowScore();
      if (current_newScore == current_oldScore) {
        setCurrentScore(current_newScore);
        return;
      }
      setChanging(true);
      let tickTimer = 10;
      let tick = 0;
      let duration = 0;
      const tickModifyScore = scoreDiff() / (animationDuration / (tickTimer * 0.001));
      timer = setInterval(() => {
        tick += 1;
        duration += tickTimer;
        if (duration >= animationDuration * 1000) {
          clearTimers(current_newScore);
        } else {
          setCurrentScore(Round(current_oldScore + tickModifyScore * tick));
        }
      }, tickTimer);
    };
    libs.onMount(() => {
      const eventIdList = [];
      eventIdList.push(useNetData("player_props", data => {
        updateScoreCardInfo(data);
      }, Players.GetLocalPlayer()));
      libs.onCleanup(() => {
        eventIdList.forEach(id => GameEvents.Unsubscribe(id));
        clearTimers();
      });
    });
    libs.createEffect(libs.on(rankShow, _show => {
      if (!_show) {
        if (rankChangeRoot && rankChangeRoot?.IsValid()) {
          let animationRoot = rankChangeRoot.FindChild("AnimationRoot");
          let particleRoot = rankChangeRoot.FindChild("ParticleRoot");
          if (animationRoot && animationRoot?.IsValid()) {
            animationRoot.RemoveAndDeleteChildren();
          }
          if (particleRoot && particleRoot?.IsValid()) {
            particleRoot.RemoveAndDeleteChildren();
          }
        }
      } else {
        $.Schedule(0.5, () => {
          startAnim();
        });
      }
    }));
    libs.createEffect(libs.on(scoreCardUsed, v => {
      startAnim();
    }));
    const currentRankScoreInfo = libs.createMemo(() => getRankInfo(currentScore()));
    const rankScore = () => changing() ? originScore() : nowScore();
    return (() => {
      const _el$25 = libs.createElement("Panel", {}, null);
      const _ref$ = rankChangeRoot;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$25) : rankChangeRoot = _el$25;
      libs.setProp(_el$25, "onactivate", () => {});
      libs.insert(_el$25, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ParticleRoot",
        hittest: false
      }), null);
      libs.insert(_el$25, libs.createComponent(RankTierIcon.RankTierIcon, {
        get className() {
          return libs.classNames({
            Upgrading: upgrading()
          });
        },
        get rank_score() {
          return rankScore();
        },
        get rank() {
          return leaderRank();
        },
        show_title: true
      }), null);
      libs.insert(_el$25, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RankScoreMedal",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            size: "48",
            get src() {
              return getSrcPath("icon/icon_rank_cup.png");
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return currentRankScoreInfo().score_up == 0;
            },
            fallback: () => libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "RankScoreProgressBar",
              get children() {
                return [libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "RankScoreProgressBarUpper",
                  get children() {
                    return libs.createComponent(EOM_Panel.EOM_Panel, {
                      backgroundColor: "#fff",
                      height: "100%",
                      get width() {
                        return `${currentRankScoreInfo().rela_score / Math.max(currentRankScoreInfo().score_up, 1) * 100}%`;
                      }
                    });
                  }
                }), libs.createComponent(GenericPanel.CLabel, {
                  get text() {
                    return `${currentRankScoreInfo().rela_score}/${currentRankScoreInfo().score_up}`;
                  }
                })];
              }
            }),
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RankScoreMedalInfo",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    id: "RankScoreMedalLabel",
                    get text() {
                      return currentRankScoreInfo().rela_score;
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "PropEffect",
            get children() {
              return libs.createComponent(libs.Switch, {
                get children() {
                  return [libs.createComponent(libs.Match, {
                    get when() {
                      return doubleScoreProp().length > 0;
                    },
                    get children() {
                      return libs.createComponent(libs.Index, {
                        get each() {
                          return doubleScoreProp();
                        },
                        children: (id, i) => libs.createComponent(ProductImage.ProductImage, {
                          get itemid() {
                            return id();
                          },
                          count: 1
                        })
                      });
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return protectedScoreProp().length > 0;
                    },
                    get children() {
                      return libs.createComponent(libs.Index, {
                        get each() {
                          return protectedScoreProp();
                        },
                        children: (id, i) => libs.createComponent(ProductImage.ProductImage, {
                          get itemid() {
                            return id();
                          },
                          count: 1
                        })
                      });
                    }
                  })];
                }
              });
            }
          })];
        }
      }), null);
      libs.insert(_el$25, libs.createComponent(EOM_Panel.EOM_Panel, {
        get visible() {
          return libs.memo(() => !!(projected() && !changing()))() && !upgrading();
        },
        className: "TierProtect",
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            text: "#RankProtected"
          });
        }
      }), null);
      libs.insert(_el$25, libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("ScoreChange");
        },
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            get ["class"]() {
              return libs.classNames("ScoreChangeLabel", {
                Add: scoreDiff() > 0,
                Keep: scoreDiff() == 0
              });
            },
            get text() {
              return libs.memo(() => scoreDiff() == 0)() ? `-${scoreDiff()}` : libs.memo(() => scoreDiff() >= 0)() ? `+${scoreDiff()}` : scoreDiff();
            }
          });
        }
      }), null);
      libs.insert(_el$25, libs.createComponent(libs.Show, {
        get when() {
          return showPeakScore();
        },
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "PeakScore",
            get children() {
              return [libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PeakScoreIcon",
                get src() {
                  return getSrcPath("bountyentry/s14_bounty_icon_large.png");
                },
                onmouseover: self => {
                  $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#BountyScore", "#BountyScore_description");
                },
                onmouseout: self => {
                  $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "PeakScoreLabel",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    get text() {
                      return libs.memo(() => peakScore() == -1)() ? "???" : peakScore();
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "PeakScoreChange",
            get children() {
              return libs.createComponent(GenericPanel.CLabel, {
                get ["class"]() {
                  return libs.classNames("PeakScoreChangeLabel", {
                    Add: peakScoreDiff() > 0,
                    Keep: peakScoreDiff() == 0
                  });
                },
                get text() {
                  return libs.memo(() => peakScoreDiff() == 0)() ? `-${peakScoreDiff()}` : libs.memo(() => peakScoreDiff() >= 0)() ? `+${peakScoreDiff()}` : peakScoreDiff();
                }
              });
            }
          })];
        }
      }), null);
      libs.insert(_el$25, libs.createComponent(EOM_Button.EOM_Button, {
        align: "center bottom",
        get marginRight() {
          return canUseScoreCard() ? "350px" : "0px";
        },
        marginBottom: "80px",
        color: "Blue",
        onactivate: () => setScoreChangeShow(false),
        text: "#Popup_Button_Confirm"
      }), null);
      libs.insert(_el$25, libs.createComponent(libs.Show, {
        get when() {
          return canUseScoreCard();
        },
        get children() {
          return libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => scoreDiff() > 0)() && scoreCardInfo()[9310016];
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    align: "center bottom",
                    get enabled() {
                      return !scoreCardUsing();
                    },
                    get marginLeft() {
                      return canUseScoreCard() ? "350px" : "0px";
                    },
                    marginBottom: "80px",
                    color: "Gold",
                    onactivate: () => {
                      setScoreCardUsing(true);
                      serverRequest("double_and_project", {
                        id: Number(scoreCardInfo()[9310016]),
                        prop_id: 9310016
                      }, data => {
                        setScoreCardUsing(false);
                      });
                    },
                    get text() {
                      return $.Localize("#use") + $.Localize("#9310016");
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => scoreDiff() < 0)() && scoreCardInfo()[9310015];
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    align: "center bottom",
                    get enabled() {
                      return !scoreCardUsing();
                    },
                    get marginLeft() {
                      return canUseScoreCard() ? "350px" : "0px";
                    },
                    marginBottom: "80px",
                    color: "Gold",
                    onactivate: () => {
                      setScoreCardUsing(true);
                      serverRequest("double_and_project", {
                        id: Number(scoreCardInfo()[9310015]),
                        prop_id: 9310015
                      }, data => {
                        setScoreCardUsing(false);
                      });
                    },
                    get text() {
                      return $.Localize("#use") + $.Localize("#9310015");
                    }
                  });
                }
              })];
            }
          });
        }
      }), null);
      libs.insert(_el$25, libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "AnimationRoot",
        hittest: false
      }), null);
      libs.effect(_$p => libs.setProp(_el$25, "className", libs.classNames("RankChange", {
        EndScreenShow: scoreChangeeShow(),
        RankShow: rankShow()
      }), _$p));
      return _el$25;
    })();
  };
  libs.render(() => libs.createComponent(EndScreen, {}), $.GetContextPanel());
}