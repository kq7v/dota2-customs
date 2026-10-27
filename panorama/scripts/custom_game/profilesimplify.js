--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('profileSimplify', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Icon = require('./EOM_Icon.js');
var Player = require('./Player.js');
var RankTierIcon = require('./RankTierIcon.js');

const ProfileInfoSimplify = ({
  player_id = Players.GetLocalPlayer()
}) => {
  const steamID = () => {
    let tPlayerInfo = Game.GetPlayerInfo(player_id);
    if (tPlayerInfo) {
      return steam_64_3(tPlayerInfo.player_steamid) == "NaN" ? "0" : steam_64_3(tPlayerInfo.player_steamid);
    } else {
      return getPlayerData(player_id, "steamID");
    }
  };
  const [seasonGameSummary, setSeasonGameSummary] = libs.createSignal({});
  const season_winCount = libs.createMemo(() => seasonGameSummary()?.rank_1_count ?? 0);
  const season_allCount = libs.createMemo(() => seasonGameSummary()?.total_count ?? 0);
  const season_four = libs.createMemo(() => seasonGameSummary()?.win_count ?? 0);
  const winRate = libs.createMemo(() => {
    if (season_allCount() == 0) return 0;
    return Math.floor(season_four() / season_allCount() * 100);
  });
  const SeasonSummayList = {
    "all": season_allCount,
    "win": season_winCount,
    "four": season_four
  };
  const [rankScore, setRankScore] = libs.createSignal(0);
  const [gameSeason, setGameSeason] = libs.createSignal(getGameSeason(getServiceNetTable("info_game_season")));
  libs.createEffect(libs.on(gameSeason, game_season => {
    const data = getNetDataCache("player_rank_score", player_id);
    if (data && data[game_season]) {
      setRankScore(data[game_season].now_rank_score);
    }
  }));
  const rankInfo = libs.createMemo(() => getRankInfo(rankScore()));
  const Title = ({
    text,
    ...others
  }) => {
    return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps$1({
      id: "HeroTitle"
    }, others, {
      get children() {
        const _el$ = libs.createElement("Label", {
          id: "HeroTitleText",
          text: text
        }, null);
        libs.setProp(_el$, "text", text);
        return _el$;
      }
    }));
  };
  libs.onMount(() => {
    const eventIdList = [];
    const NetTableListenerIDs = [];
    eventIdList.push(useNetData("season_game_summary", data => {
      print("gameSeason", gameSeason());
      setSeasonGameSummary(data[gameSeason()]);
    }, player_id));
    eventIdList.push(useNetData("player_rank_score", data => {
      if (data && data[gameSeason()]) {
        setRankScore(data[gameSeason()].now_rank_score);
      }
    }, player_id));
    NetTableListenerIDs.push(useServiceNetTable("info_game_season", data => {
      setGameSeason(getGameSeason(data));
    }));
    libs.onCleanup(() => {
      eventIdList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableListenerIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  return [(() => {
    const _el$2 = libs.createElement("Panel", {
        id: "ProfileInfo"
      }, null),
      _el$3 = libs.createElement("Image", {
        id: "CardBG",
        get src() {
          return getSrcPath("profile/d_card.png");
        }
      }, _el$2),
      _el$4 = libs.createElement("Image", {
        id: "editBtn",
        get src() {
          return getSrcPath("profile/d_button_01.png");
        }
      }, _el$2);
    libs.insert(_el$2, libs.createComponent(Player.PlayerAvatar, {
      get steamID() {
        return steamID();
      },
      playerID: player_id
    }), _el$4);
    libs.insert(_el$2, libs.createComponent(Player.PlayerName, {
      get steamID() {
        return steamID();
      }
    }), _el$4);
    libs.effect(_p$ => {
      const _v$ = getSrcPath("profile/d_card.png"),
        _v$2 = getSrcPath("profile/d_button_01.png");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "src", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "src", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$2;
  })(), libs.createComponent(Title, {
    text: "#PersonalData"
  }), (() => {
    const _el$5 = libs.createElement("Panel", {
        id: "RankData"
      }, null),
      _el$6 = libs.createElement("Panel", {
        id: "RankText"
      }, _el$5);
      libs.createElement("Label", {
        id: "season",
        text: "#Season"
      }, _el$6);
      const _el$8 = libs.createElement("Panel", {
        id: "rankTitlePanel"
      }, _el$6),
      _el$9 = libs.createElement("Label", {
        id: "rankTitle",
        get text() {
          return $.Localize("#RankTitle_" + rankInfo().tier) + rankInfo().num;
        }
      }, _el$8),
      _el$10 = libs.createElement("Image", {
        id: "rankInfo",
        get src() {
          return getSrcPath("profile/d_button_03.png");
        }
      }, _el$8),
      _el$12 = libs.createElement("Panel", {
        id: "winRate"
      }, _el$5);
      libs.createElement("Label", {
        id: "winRateText",
        text: "#WinRate"
      }, _el$12);
      const _el$14 = libs.createElement("Panel", {
        id: "winRateBlack"
      }, _el$12),
      _el$15 = libs.createElement("Image", {
        id: "winRateGreen",
        get style() {
          return {
            clip: `radial(50% 50%, 0deg, ${-winRate() * 360 / 100}deg);`
          };
        }
      }, _el$14),
      _el$16 = libs.createElement("Label", {
        id: "winRateValue",
        get text() {
          return winRate() + "%";
        }
      }, _el$14),
      _el$17 = libs.createElement("Panel", {
        id: "Summary"
      }, _el$5);
    libs.insert(_el$5, libs.createComponent(RankTierIcon.RankTierIcon, {
      id: "RankIcon",
      get rank_score() {
        return rankScore();
      }
    }), _el$6);
    libs.setProp(_el$10, "onactivate", () => {
      showPopup("RankInfo", {});
    });
    libs.insert(_el$6, libs.createComponent(EOM_Panel.EOM_Panel, {
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
                const _el$18 = libs.createElement("Label", {
                  get text() {
                    return `${rankInfo().rela_score}/${rankInfo().score_up}`;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$18, "text", `${rankInfo().rela_score}/${rankInfo().score_up}`, _$p));
                return _el$18;
              })()];
            }
          }),
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "RankScoreMedalInfo",
              get children() {
                const _el$11 = libs.createElement("Label", {
                  id: "RankScoreMedalLabel",
                  get text() {
                    return rankInfo().rela_score;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$11, "text", rankInfo().rela_score, _$p));
                return _el$11;
              }
            });
          }
        })];
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(SeasonSummayList);
      },
      children: key => {
        return (() => {
          const _el$19 = libs.createElement("Panel", {
              id: "SummaryPanel"
            }, null);
            libs.createElement("Image", {
              id: "SummaryBg"
            }, _el$19);
            const _el$21 = libs.createElement("Label", {
              id: "SummaryText",
              text: "#" + key
            }, _el$19),
            _el$22 = libs.createElement("Label", {
              id: "SummaryValue",
              get text() {
                return SeasonSummayList[key]();
              }
            }, _el$19);
          libs.setProp(_el$21, "text", "#" + key);
          libs.effect(_$p => libs.setProp(_el$22, "text", SeasonSummayList[key](), _$p));
          return _el$19;
        })();
      }
    }));
    libs.effect(_p$ => {
      const _v$3 = $.Language().toLowerCase(),
        _v$4 = $.Localize("#RankTitle_" + rankInfo().tier) + rankInfo().num,
        _v$5 = getSrcPath("profile/d_button_03.png"),
        _v$6 = {
          clip: `radial(50% 50%, 0deg, ${-winRate() * 360 / 100}deg);`
        },
        _v$7 = winRate() + "%";
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "className", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "src", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$15, "style", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$16, "text", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$5;
  })()];
};

exports.ProfileInfoSimplify = ProfileInfoSimplify;