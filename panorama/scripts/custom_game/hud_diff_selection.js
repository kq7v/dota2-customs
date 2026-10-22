--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var solid_utils = require('./solid_utils.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var StoreItem = require('./StoreItem.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_CheckBox = require('./EOM_CheckBox.js');
var Player = require('./Player.js');
var RecycleView = require('./RecycleView.js');
var server_dungeon_key = require('./server_dungeon_key.js');
var equipment_comp = require('./equipment_comp.js');
var common_item = require('./common_item.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
var hunt_buff_icon = require('./hunt_buff_icon.js');
var global_selection = require('./global_selection.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');

const HERO_OFFSET_Y$1 = -50;
const HERO_SPACING_2$1 = 250;
const HERO_SPACING_3$1 = 400;
const HERO_SPACING_4_INNER$1 = 180;
const HERO_SPACING_4_OUTER$1 = 500;
const HERO_NAME_Y_OFFSET$1 = {
  "npc_dota_hero_solthra": 170,
  "npc_dota_hero_vespera": 150
};
const DEFAULT_NAME_Y$1 = 120;
const ABYSSAL_DAILY_FREE_REWARD_LIMIT = 3;
function getHeroPosition$1(index, total) {
  if (total === 1) {
    return {
      x: 0,
      y: HERO_OFFSET_Y$1,
      zIndex: 1
    };
  } else if (total === 2) {
    if (index === 0) return {
      x: -HERO_SPACING_2$1,
      y: HERO_OFFSET_Y$1,
      zIndex: 2
    };
    if (index === 1) return {
      x: HERO_SPACING_2$1,
      y: HERO_OFFSET_Y$1,
      zIndex: 1
    };
  } else if (total === 3) {
    if (index === 0) return {
      x: 0,
      y: HERO_OFFSET_Y$1,
      zIndex: 2
    };
    if (index === 1) return {
      x: HERO_SPACING_3$1,
      y: HERO_OFFSET_Y$1 * 2,
      zIndex: 1
    };
    if (index === 2) return {
      x: -HERO_SPACING_3$1,
      y: HERO_OFFSET_Y$1 * 2,
      zIndex: 3
    };
  } else if (total === 4) {
    if (index === 0) return {
      x: -HERO_SPACING_4_INNER$1,
      y: HERO_OFFSET_Y$1,
      zIndex: 3
    };
    if (index === 1) return {
      x: HERO_SPACING_4_INNER$1,
      y: HERO_OFFSET_Y$1,
      zIndex: 2
    };
    if (index === 2) return {
      x: -HERO_SPACING_4_OUTER$1,
      y: HERO_OFFSET_Y$1 * 2,
      zIndex: 4
    };
    if (index === 3) return {
      x: HERO_SPACING_4_OUTER$1,
      y: HERO_OFFSET_Y$1 * 2,
      zIndex: 1
    };
  }
  return {
    x: 0,
    y: 0,
    zIndex: 1
  };
}
const AbyssalSelection = () => {
  const playerID = Players.GetLocalPlayer();
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const gameModeState = solid_utils.createNetDataSignal("common", "game_mode_state");
  const gameModeProfiles = solid_utils.createNetDataSignal("common", "game_mode_profiles");
  const difficultySelection = solid_utils.createNetDataSignal("common", "game_mode_difficulty_selection");
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const selectedModeProfile = libs.createMemo(() => {
    const selectedModeId = gameModeState()?.selectedModeId;
    if (selectedModeId == undefined) {
      return undefined;
    }
    return gameModeProfiles()?.registeredModes?.[String(selectedModeId)];
  });
  const diffList = libs.createMemo(() => {
    const result = new Set();
    for (const difficulty of selectedModeProfile()?.configuredDifficulties ?? []) {
      if (Number.isFinite(difficulty) && KeyValues.rune_drop[difficulty.toString()] != undefined) {
        result.add(difficulty);
      }
    }
    return Array.from(result).sort((a, b) => a - b);
  });
  const diffSet = libs.createMemo(() => new Set(diffList()));
  const [countdown, setCountdown] = libs.createSignal(0);
  let countdownTimer;
  const stopCountdown = () => {
    if (countdownTimer !== undefined) {
      clearInterval(countdownTimer);
      countdownTimer = undefined;
    }
  };
  const restartCountdown = () => {
    stopCountdown();
    const endTime = difficultySelection()?.endTime;
    if (endTime === undefined) {
      setCountdown(0);
      return;
    }
    const updateCountdown = () => {
      setCountdown(Math.max(0, Math.ceil(endTime - Game.GetGameTime())));
    };
    updateCountdown();
    if (endTime > Game.GetGameTime()) {
      countdownTimer = setInterval(updateCountdown, 1000);
    }
  };
  const player_diff_first_passes = solid_utils.createServiceNetData("player_abyssal_first_passes", {});
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const remainingFreeRuneRewardCount = libs.createMemo(() => Math.max(0, ABYSSAL_DAILY_FREE_REWARD_LIMIT - (playerCounters()?.daily_free_abyssal_rewards?.count ?? 0)));
  const remainingFreeEngravingRewardCount = libs.createMemo(() => Math.max(0, ABYSSAL_DAILY_FREE_REWARD_LIMIT - (playerCounters()?.daily_free_abyssal_engraving_rewards?.count ?? 0)));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  const [heroModelList, setHeroModelList] = libs.createSignal([]);
  const [diff, setDiff] = libs.createSignal(1);
  const updateSelectedDiff = nextValue => {
    setDiff(nextValue);
    GameEvents.SendCustomEventToServer("game_mode_select_difficulty", {
      difficulty: nextValue
    });
  };
  const isCountdownActive = libs.createMemo(() => difficultySelection()?.state === "pending");
  const isModeStarting = libs.createMemo(() => gameModeState()?.startingModeId !== undefined);
  const canEditSelection = libs.createMemo(() => isCountdownActive() == false && isModeStarting() == false);
  const isMultiplayer = libs.createMemo(() => heroModelList().length > 1);
  const availableDiffList = libs.createMemo(() => {
    return (selectedModeProfile()?.availableDifficulties ?? []).filter(info => info.available !== false).map(info => info.difficulty).filter(difficulty => diffSet().has(difficulty)).sort((a, b) => a - b);
  });
  const availableDiffSet = libs.createMemo(() => {
    const set = new Set();
    for (const value of availableDiffList()) {
      set.add(value);
    }
    return set;
  });
  const fallbackDiff = libs.createMemo(() => {
    const availableDiffs = availableDiffList();
    if (availableDiffs.length <= 0) {
      return 1;
    }
    const defaultDifficulty = selectedModeProfile()?.defaultDifficulty;
    if (defaultDifficulty != undefined && availableDiffSet().has(defaultDifficulty)) {
      return defaultDifficulty;
    }
    return availableDiffs[0];
  });
  const canMoveDiff = delta => {
    const availableDiffs = availableDiffList();
    const currentIndex = availableDiffs.indexOf(diff());
    return canEditSelection() && currentIndex >= 0 && currentIndex + delta >= 0 && currentIndex + delta < availableDiffs.length;
  };
  const isInitiatorPlayer = libs.createMemo(() => {
    if (isMultiplayer() == false) {
      return true;
    }
    return difficultySelection()?.initiatorPlayerId === playerID;
  });
  const teamDiff = libs.createMemo(() => {
    return difficultySelection()?.resolvedDifficulty ?? diff();
  });
  const config = libs.createMemo(() => KeyValues.rune_drop[diff().toString()]);
  const starRewards = libs.createMemo(() => {
    const cfg = config();
    if (!cfg) return [];
    return [1, 2, 3].map(star => ({
      star,
      items: Object.entries(cfg[`star_reward${star}`] ?? {}).map(([itemId, count]) => ({
        itemId,
        count
      })),
      title: `#DiffSelection_StarReward${star}`
    }));
  });
  libs.createEffect(libs.on(() => [difficultySelection()?.endTime, difficultySelection()?.state, gameState()?.state], () => {
    restartCountdown();
  }));
  libs.createEffect(() => {
    const selection = difficultySelection();
    if (selection !== undefined && selection.state === "pending" && selection.resolvedDifficulty !== undefined) {
      setDiff(selection.resolvedDifficulty);
    }
  });
  libs.createEffect(() => {
    if (canEditSelection() == false) {
      return;
    }
    if (!availableDiffSet().has(diff())) {
      setDiff(fallbackDiff());
    }
  });
  libs.createEffect(libs.on(() => gameState()?.state, state => {
    if (state === "GameState_DiffSelection") {
      setHeroModelList(Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS).map(id => ({
        id,
        heroName: getNetDataKey("common", "hero_selection", id)?.heroName ?? ""
      })));
    }
  }));
  libs.createEffect(libs.on(() => difficultySelection()?.playerDifficulties?.[playerID], difficulty => {
    if (canEditSelection()) {
      setDiff(difficulty !== undefined && availableDiffSet().has(difficulty) ? difficulty : fallbackDiff());
    }
  }));
  libs.onCleanup(() => {
    stopCountdown();
  });
  const createStarChecked = star => {
    return libs.createMemo(() => {
      const data = player_diff_first_passes();
      const diffKey = diff().toString();
      const playerStar = data?.[diffKey]?.star ?? 0;
      return playerStar >= star;
    });
  };
  const moveDiffSelection = delta => {
    if (canEditSelection() == false) {
      return;
    }
    const availableDiffs = availableDiffList();
    if (availableDiffs.length <= 0) {
      return;
    }
    const currentIndex = availableDiffs.indexOf(diff());
    const nextIndex = currentIndex + delta;
    if (nextIndex < 0 || nextIndex >= availableDiffs.length) {
      return;
    }
    updateSelectedDiff(availableDiffs[nextIndex]);
  };
  const startSelectedDiff = () => {
    if (canEditSelection() == false || isInitiatorPlayer() == false || availableDiffSet().has(diff()) == false) {
      return;
    }
    GameEvents.SendCustomEventToServer("game_mode_confirm_difficulty", {
      difficulty: diff()
    });
  };
  useClientSideEvent("key_pressed", data => {
    if (isGamepad() != true || gameState()?.state != "GameState_DiffSelection" || gameModeState()?.selectedModeId !== "abyssal") {
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveDiffSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveDiffSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm) {
      startSelectedDiff();
    }
  });
  let refDiffList;
  let refBGScene;
  libs.onMount(() => {
    const mouseEventName = DoUniqueString("AbyssalSelectionDiffList");
    CustomUIConfig.SubscribeMouseEvent(mouseEventName, ({
      event_name: eventName,
      value
    }) => {
      if (!refDiffList?.IsValid() || !refDiffList.BHasHoverStyle()) {
        return;
      }
      if (eventName === "wheeled") {
        if (value === 1) {
          moveDiffSelection(-1);
        } else if (value === -1) {
          moveDiffSelection(1);
        }
      }
    });
    libs.onCleanup(() => {
      try {
        CustomUIConfig.UnsubscribeMouseEvent(mouseEventName);
      } catch (error) {}
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "AbyssalSelection"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "CenterModels",
        hittest: false
      }, _el$);
      libs.createElement("DOTAParticleScenePanel", {
        id: "BottomParticle",
        particleName: "particles/ui/game/ui_game_general_special_effects_05_1_fx.vpcf",
        cameraOrigin: "0 0 800",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$2);
      const _el$4 = libs.createElement("DOTAParticleScenePanel", {
        id: "BGScene",
        particleName: "particles/ui/lottery/ui_lottery_back_fx.vpcf",
        cameraOrigin: "0 0 500",
        lookAt: "0 0 0",
        fov: 90,
        hittest: false
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        id: "DiffRight"
      }, _el$),
      _el$6 = libs.createElement("Panel", {
        id: "DiffInfo"
      }, _el$5);
      libs.createElement("Label", {
        id: "DiffSelectionTitleLabel",
        text: "#DiffSelection_Title"
      }, _el$6);
      const _el$8 = libs.createElement("Panel", {
        id: "DiffContainer"
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        id: "DiffList",
        hittest: true
      }, _el$8),
      _el$0 = libs.createElement("Panel", {
        id: "DiffDetail"
      }, _el$5);
      libs.createElement("Label", {
        id: "NormalReward",
        html: true,
        text: "#DiffSelection_NormalReward"
      }, _el$0);
      libs.createElement("Panel", {
        id: "DiffDetailDivider"
      }, _el$0);
      const _el$11 = libs.createElement("Label", {
        id: "NormalRewardDesc",
        html: true,
        get text() {
          return GetLocalization("#AbyssalDiffSelection_NormalReward" + diff());
        }
      }, _el$0),
      _el$12 = libs.createElement("Panel", {
        id: "DailyFreeRewardCounts"
      }, _el$0),
      _el$13 = libs.createElement("Label", {
        "class": "DailyFreeRewardCount",
        get text() {
          return LocalizeWithVars("#AbyssalDiffSelection_FreeRuneRewardCount", {
            count: remainingFreeRuneRewardCount()
          });
        }
      }, _el$12),
      _el$14 = libs.createElement("Label", {
        "class": "DailyFreeRewardCount",
        get text() {
          return LocalizeWithVars("#AbyssalDiffSelection_FreeEngravingRewardCount", {
            count: remainingFreeEngravingRewardCount()
          });
        }
      }, _el$12);
      libs.createElement("Label", {
        id: "ChallengeReward",
        html: true,
        text: "#DiffSelection_ChallengeReward"
      }, _el$0);
      libs.createElement("Panel", {
        id: "DiffDetailDivider"
      }, _el$0);
      const _el$17 = libs.createElement("Panel", {
        id: "StarRewardList"
      }, _el$0);
      libs.createElement("Label", {
        id: "RewardCondition",
        text: "#DiffSelection_RewardCondition"
      }, _el$0);
      libs.createElement("Panel", {
        id: "DiffDetailDivider"
      }, _el$0);
      const _el$20 = libs.createElement("Panel", {
        id: "StarConditionList"
      }, _el$0),
      _el$21 = libs.createElement("Panel", {
        height: "fill-parent-flow(1)"
      }, _el$5),
      _el$22 = libs.createElement("Panel", {
        id: "Teammate"
      }, _el$5),
      _el$23 = libs.createElement("Panel", {
        id: "TeammateDiff"
      }, _el$22),
      _el$24 = libs.createElement("Label", {
        text: "#DiffSelection_TeamDiff",
        get vars() {
          return {
            diff: teamDiff()
          };
        }
      }, _el$23),
      _el$25 = libs.createElement("Label", {
        id: "StartCountdown",
        text: "#DiffSelection_StartCountdown",
        get vars() {
          return {
            value: countdown()
          };
        }
      }, _el$22);
    libs.insert(_el$2, libs.createComponent(libs.For, {
      get each() {
        return heroModelList();
      },
      children: (player, idx) => {
        const hero = libs.createMemo(() => player.heroName);
        const nameY = libs.createMemo(() => HERO_NAME_Y_OFFSET$1[hero()] ?? DEFAULT_NAME_Y$1);
        const pos = libs.createMemo(() => getHeroPosition$1(idx(), heroModelList().length));
        const playerName = libs.createMemo(() => Players.GetPlayerName(player.id));
        const playerDiff = libs.createMemo(() => difficultySelection()?.playerDifficulties?.[player.id] ?? fallbackDiff());
        const duration = 0.25;
        const fxTime = 0.25;
        const interval = 0;
        return (() => {
          const _el$27 = libs.createElement("Panel", {
              "class": "HeroWithShowFx",
              get style() {
                return {
                  x: pos().x + "px",
                  y: pos().y + "px",
                  zIndex: pos().zIndex
                };
              }
            }, null),
            _el$28 = libs.createElement("Panel", {
              "class": "PlayerName",
              get style() {
                return {
                  x: 0 + "px",
                  y: nameY() + "px"
                };
              }
            }, _el$27),
            _el$29 = libs.createElement("Label", {
              id: "Diff",
              get text() {
                return "#DiffSelection_DiffName" + playerDiff();
              }
            }, _el$28),
            _el$30 = libs.createElement("Label", {
              id: "Name",
              get text() {
                return playerName();
              }
            }, _el$28);
          libs.insert(_el$27, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
            id: "HeroModelScene",
            get unit() {
              return hero();
            },
            get style() {
              return {
                animationDuration: duration + "s",
                animationDelay: fxTime + (duration + interval) * idx() + "s",
                animationFillMode: "both",
                animationName: "AbyssalHeroShow"
              };
            }
          }), _el$28);
          libs.effect(_p$ => {
            const _v$8 = {
                x: pos().x + "px",
                y: pos().y + "px",
                zIndex: pos().zIndex
              },
              _v$9 = {
                x: 0 + "px",
                y: nameY() + "px"
              },
              _v$0 = "#DiffSelection_DiffName" + playerDiff(),
              _v$1 = playerName();
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$27, "style", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$28, "style", _v$9, _p$._v$9));
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$29, "text", _v$0, _p$._v$0));
            _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$30, "text", _v$1, _p$._v$1));
            return _p$;
          }, {
            _v$8: undefined,
            _v$9: undefined,
            _v$0: undefined,
            _v$1: undefined
          });
          return _el$27;
        })();
      }
    }), _el$4);
    const _ref$ = refBGScene;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$4) : refBGScene = _el$4;
    libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get visible() {
        return diffList().length >= 3;
      },
      id: "LeftArrow",
      "class": "DiffSelectionArrow",
      get enabled() {
        return canMoveDiff(-1);
      },
      onactivate: () => {
        moveDiffSelection(-1);
      }
    }), _el$9);
    const _ref$2 = refDiffList;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$9) : refDiffList = _el$9;
    libs.insert(_el$9, libs.createComponent(libs.For, {
      get each() {
        return diffList();
      },
      children: _diff => {
        const posIndex = () => {
          const currentIndex = diffList().indexOf(diff());
          const itemIndex = diffList().indexOf(_diff);
          const offset = itemIndex - currentIndex;
          if (offset < -2) return -2;
          if (offset > 2) return 2;
          return offset;
        };
        return (() => {
          const _el$31 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("Diff", "Index" + posIndex());
              }
            }, null);
            libs.createElement("DOTAParticleScenePanel", {
              "class": "SelectParticle",
              particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
              cameraOrigin: "0 0 60",
              fov: 60,
              lookAt: "0 0 0",
              hittest: false,
              squarePixels: true
            }, _el$31);
          libs.insert(_el$31, libs.createComponent(EOM_Button.EOM_BaseButton, {
            "class": "DiffButton",
            get classList() {
              return {
                "Select": posIndex() == 0
              };
            },
            get enabled() {
              return libs.memo(() => !!availableDiffSet().has(_diff))() && canEditSelection();
            },
            onactivate: () => {
              updateSelectedDiff(_diff);
            },
            get children() {
              const _el$33 = libs.createElement("Label", {
                "class": "DiffName",
                text: _diff
              }, null);
              libs.setProp(_el$33, "text", _diff);
              return _el$33;
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$31, "class", libs.classNames("Diff", "Index" + posIndex()), _$p));
          return _el$31;
        })();
      }
    }));
    libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get visible() {
        return diffList().length >= 3;
      },
      id: "RightArrow",
      "class": "DiffSelectionArrow",
      get enabled() {
        return canMoveDiff(1);
      },
      onactivate: () => {
        moveDiffSelection(1);
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(libs.For, {
      get each() {
        return starRewards();
      },
      children: reward => {
        const isChecked = createStarChecked(reward.star);
        return libs.createComponent(libs.For, {
          get each() {
            return reward.items;
          },
          children: item => libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return item.itemId;
            },
            get amounts() {
              return item.count;
            },
            get children() {
              return [libs.createComponent(libs.Show, {
                get when() {
                  return isChecked();
                },
                get children() {
                  return libs.createElement("Image", {
                    id: "CheckTag",
                    hittest: false
                  }, null);
                }
              }), (() => {
                const _el$35 = libs.createElement("Panel", {
                  width: "100%",
                  height: "100%"
                }, null);
                libs.setProp(_el$35, "width", "100%");
                libs.setProp(_el$35, "height", "100%");
                libs.effect(_$p => libs.setProp(_el$35, "customTooltip", {
                  name: "title_image_text",
                  title: GetLocalization(String(item.itemId)),
                  image: getSrcPath("store_items/" + item.itemId + ".png"),
                  text: GetLocalization(item.itemId + "_description") + "<br>" + GetLocalization("DiffSelection_StarReward" + reward.star)
                }, _$p));
                return _el$35;
              })()];
            }
          })
        });
      }
    }));
    libs.insert(_el$20, libs.createComponent(libs.For, {
      get each() {
        return starRewards();
      },
      children: reward => {
        const isChecked = createStarChecked(reward.star);
        return (() => {
          const _el$36 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("StarCondition", {
                  Unfilled: !isChecked()
                });
              }
            }, null);
            libs.createElement("Image", {
              "class": "DiffStar"
            }, _el$36);
            const _el$38 = libs.createElement("Label", {
              "class": "StarConditionText",
              get text() {
                return "#AbyssalDiffSelection_StarCondition" + reward.star;
              }
            }, _el$36);
          libs.effect(_p$ => {
            const _v$10 = libs.classNames("StarCondition", {
                Unfilled: !isChecked()
              }),
              _v$11 = "#AbyssalDiffSelection_StarCondition" + reward.star;
            _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$36, "class", _v$10, _p$._v$10));
            _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$38, "text", _v$11, _p$._v$11));
            return _p$;
          }, {
            _v$10: undefined,
            _v$11: undefined
          });
          return _el$36;
        })();
      }
    }));
    libs.setProp(_el$21, "height", "fill-parent-flow(1)");
    libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "Start",
      get visible() {
        return libs.memo(() => !!isInitiatorPlayer())() && canEditSelection();
      },
      get enabled() {
        return availableDiffSet().has(diff());
      },
      onactivate: startSelectedDiff,
      get children() {
        return libs.createElement("Label", {
          text: "#DiffSelection_Start"
        }, null);
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#AbyssalDiffSelection_NormalReward" + diff()),
        _v$2 = LocalizeWithVars("#AbyssalDiffSelection_FreeRuneRewardCount", {
          count: remainingFreeRuneRewardCount()
        }),
        _v$3 = LocalizeWithVars("#AbyssalDiffSelection_FreeEngravingRewardCount", {
          count: remainingFreeEngravingRewardCount()
        }),
        _v$4 = isCountdownActive(),
        _v$5 = {
          diff: teamDiff()
        },
        _v$6 = isCountdownActive(),
        _v$7 = {
          value: countdown()
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$11, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$13, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$14, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$22, "visible", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$24, "vars", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$25, "visible", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$25, "vars", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$;
  })();
};

const HERO_OFFSET_Y = -50;
const HERO_SPACING_2 = 250;
const HERO_SPACING_3 = 400;
const HERO_SPACING_4_INNER = 180;
const HERO_SPACING_4_OUTER = 500;
const TRAIN_DIFF = 1;
const HERO_NAME_Y_OFFSET = {
  "npc_dota_hero_solthra": 170,
  "npc_dota_hero_vespera": 150
};
const DEFAULT_NAME_Y = 120;
const KEY_RARITY_COUNT = 7;
const KEY_MAIN_ENTRY_FILTER_MODES = ["default", "include", "exclude"];
const KEY_MAIN_ENTRY_FILTER_LIST = Object.values(KeyValues.key_entry ?? {}).filter(entry => entry.entry_type === 1).sort((a, b) => a.id - b.id);
function parseKeyMainEntries(value) {
  if (!value) {
    return [];
  }
  if (typeof value === "string") {
    return JSON.parseSafe(value) ?? [];
  }
  return Array.isArray(value) ? value : [];
}
function getKeyIntensity(data) {
  if (!data) {
    return 0;
  }
  return data.intensity;
}
function getKeyClassLevel(data) {
  if (!data) {
    return 0;
  }
  return toFiniteNumber(KeyValues.info_item_key[String(data.key_item_id)]?.class, 1);
}
function getHeroPosition(index, total) {
  if (total === 1) {
    return {
      x: 0,
      y: HERO_OFFSET_Y,
      zIndex: 1
    };
  } else if (total === 2) {
    if (index === 0) return {
      x: -HERO_SPACING_2,
      y: HERO_OFFSET_Y,
      zIndex: 2
    };
    if (index === 1) return {
      x: HERO_SPACING_2,
      y: HERO_OFFSET_Y,
      zIndex: 1
    };
  } else if (total === 3) {
    if (index === 0) return {
      x: 0,
      y: HERO_OFFSET_Y,
      zIndex: 2
    };
    if (index === 1) return {
      x: HERO_SPACING_3,
      y: HERO_OFFSET_Y * 2,
      zIndex: 1
    };
    if (index === 2) return {
      x: -HERO_SPACING_3,
      y: HERO_OFFSET_Y * 2,
      zIndex: 3
    };
  } else if (total === 4) {
    if (index === 0) return {
      x: -HERO_SPACING_4_INNER,
      y: HERO_OFFSET_Y,
      zIndex: 3
    };
    if (index === 1) return {
      x: HERO_SPACING_4_INNER,
      y: HERO_OFFSET_Y,
      zIndex: 2
    };
    if (index === 2) return {
      x: -HERO_SPACING_4_OUTER,
      y: HERO_OFFSET_Y * 2,
      zIndex: 4
    };
    if (index === 3) return {
      x: HERO_SPACING_4_OUTER,
      y: HERO_OFFSET_Y * 2,
      zIndex: 1
    };
  }
  return {
    x: 0,
    y: 0,
    zIndex: 1
  };
}
function isDifficultyWithinMax(difficulty) {
  return difficulty <= MAX_DIFFICULTY;
}
const DungeonSelection = () => {
  const playerID = Players.GetLocalPlayer();
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const gameModeState = solid_utils.createNetDataSignal("common", "game_mode_state");
  const gameModeProfiles = solid_utils.createNetDataSignal("common", "game_mode_profiles");
  const difficultySelection = solid_utils.createNetDataSignal("common", "game_mode_difficulty_selection");
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const selectedModeProfile = libs.createMemo(() => {
    const selectedModeId = gameModeState()?.selectedModeId;
    if (selectedModeId == undefined) {
      return undefined;
    }
    return gameModeProfiles()?.registeredModes?.[String(selectedModeId)];
  });
  const diffList = libs.createMemo(() => Object.keys(KeyValues.diff_star_rewards).map(id => Number(id)).filter(difficulty => isDifficultyWithinMax(difficulty)).sort((a, b) => a - b));
  const [countdown, setCountdown] = libs.createSignal(0);
  let countdownTimer;
  const stopCountdown = () => {
    if (countdownTimer !== undefined) {
      clearInterval(countdownTimer);
      countdownTimer = undefined;
    }
  };
  const restartCountdown = () => {
    stopCountdown();
    const endTime = difficultySelection()?.endTime;
    if (endTime === undefined) {
      setCountdown(0);
      return;
    }
    const updateCountdown = () => {
      setCountdown(Math.max(0, Math.ceil(endTime - Game.GetGameTime())));
    };
    updateCountdown();
    if (endTime > Game.GetGameTime()) {
      countdownTimer = setInterval(updateCountdown, 1000);
    }
  };
  const player_diff_first_passes = solid_utils.createServiceNetData("player_common_first_passes", {});
  const player_keys = solid_utils.createServiceNetData("player_keys", {});
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
  const [gamepadBindings, setGamepadBindings] = libs.createSignal({
    ...DEFAULT_GAMEPAD_BINDINGS
  });
  libs.createEffect(libs.on(player_key_values, data => {
    const nextGamepadBindings = {
      ...DEFAULT_GAMEPAD_BINDINGS
    };
    for (const key in data) {
      if (key.startsWith("keybind_gamepad_")) {
        const func = key.replace("keybind_gamepad_", "");
        nextGamepadBindings[func] = data[key].value;
      }
    }
    setGamepadBindings(nextGamepadBindings);
  }));
  const getGamepadHotkey = func => {
    return gamepadBindings()[func] ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
  };
  const [heroModelList, setHeroModelList] = libs.createSignal([]);
  const difficultyKey = solid_utils.createNetDataSignal("common", "difficulty_key");
  const [showKeyList, setShowKeyList] = libs.createSignal(false);
  const [showKeyFilter, setShowKeyFilter] = libs.createSignal(false);
  const [filterRarity, setFilterRarity] = libs.createSignal({});
  const [filterMainEntry, setFilterMainEntry] = libs.createSignal({});
  const [diff, setDiff] = libs.createSignal(1);
  const updateSelectedDiff = nextValue => {
    setDiff(nextValue);
    GameEvents.SendCustomEventToServer("game_mode_select_difficulty", {
      difficulty: nextValue
    });
  };
  const isCountdownActive = libs.createMemo(() => difficultySelection()?.state === "pending");
  const isModeStarting = libs.createMemo(() => gameModeState()?.startingModeId !== undefined);
  const isDungeonSelectionVisible = libs.createMemo(() => {
    return gameState()?.state === "GameState_DiffSelection" && isModeStarting() == false && gameModeState()?.selectedModeId === "common";
  });
  const canEditSelection = libs.createMemo(() => isCountdownActive() == false && isModeStarting() == false);
  const isMultiplayer = libs.createMemo(() => heroModelList().length > 1);
  const availableDiffList = libs.createMemo(() => {
    return (selectedModeProfile()?.availableDifficulties ?? []).filter(info => info.available !== false).map(info => info.difficulty).filter(difficulty => isDifficultyWithinMax(difficulty)).filter(difficulty => KeyValues.diff_star_rewards[difficulty.toString()] != undefined).sort((a, b) => a - b);
  });
  const availableDiffSet = libs.createMemo(() => {
    const set = new Set();
    for (const value of availableDiffList()) {
      set.add(value);
    }
    return set;
  });
  const fallbackDiff = libs.createMemo(() => {
    const availableDiffs = availableDiffList();
    if (availableDiffs.length <= 0) {
      return 1;
    }
    const defaultDifficulty = selectedModeProfile()?.defaultDifficulty;
    if (defaultDifficulty != undefined && availableDiffSet().has(defaultDifficulty)) {
      return defaultDifficulty;
    }
    return availableDiffs[availableDiffs.length - 1];
  });
  const canMoveDiff = delta => {
    const availableDiffs = availableDiffList();
    const currentIndex = availableDiffs.indexOf(diff());
    return canEditSelection() && currentIndex >= 0 && currentIndex + delta >= 0 && currentIndex + delta < availableDiffs.length;
  };
  const isInitiatorPlayer = libs.createMemo(() => {
    if (isMultiplayer() == false) {
      return true;
    }
    return difficultySelection()?.initiatorPlayerId === playerID;
  });
  const teamDiff = libs.createMemo(() => {
    return difficultySelection()?.resolvedDifficulty ?? diff();
  });
  const config = libs.createMemo(() => KeyValues.diff_star_rewards[diff().toString()]);
  const keyDiffSetting = libs.createMemo(() => {
    const config = GameUI.CustomUIConfig().key_diff_setting;
    return config?.[diff().toString()];
  });
  const canUseKey = libs.createMemo(() => keyDiffSetting() != undefined);
  const keyClassLevelMax = libs.createMemo(() => toFiniteNumber(keyDiffSetting()?.class_max, 0));
  const selectedKeyID = libs.createMemo(() => {
    const key = toFiniteNumber(difficultyKey()?.key, 0);
    return key > 0 ? String(key) : undefined;
  });
  const selectedKeyData = libs.createMemo(() => difficultyKey()?.key_data);
  libs.createMemo(() => getKeyClassLevel(selectedKeyData()));
  const updateDifficultyKey = keyID => {
    print("updateDifficultyKey", keyID);
    GameEvents.SendCustomEventToServer("use_key", {
      key: keyID ? toFiniteNumber(keyID, 0) : 0
    });
  };
  const removeDifficultyKey = () => {
    if (!canEditSelection()) {
      return;
    }
    const selectedKey = difficultyKey();
    if (selectedKey == undefined) {
      return;
    }
    updateDifficultyKey();
    setShowKeyList(false);
  };
  const activeRarityFilter = libs.createMemo(() => {
    const rarityFilter = filterRarity();
    return Object.keys(rarityFilter).reduce((result, rarity) => {
      if (rarityFilter[Number(rarity)]) {
        result[Number(rarity)] = true;
      }
      return result;
    }, {});
  });
  const availableKeyIDs = libs.createMemo(() => {
    const rarityFilter = activeRarityFilter();
    const hasRarityFilter = Object.keys(rarityFilter).length > 0;
    const includedMainEntries = [];
    const excludedMainEntries = [];
    for (const [entryID, mode] of Object.entries(filterMainEntry())) {
      if (mode === "include") {
        includedMainEntries.push(entryID);
      } else if (mode === "exclude") {
        excludedMainEntries.push(entryID);
      }
    }
    const hasMainEntryFilter = includedMainEntries.length > 0 || excludedMainEntries.length > 0;
    const classLevelMax = keyClassLevelMax();
    const allKeys = player_keys();
    return Object.keys(allKeys).filter(id => {
      const data = allKeys[id];
      if (data == undefined || hasRarityFilter && rarityFilter[data.rarity] !== true) {
        return false;
      }
      if (!hasMainEntryFilter) {
        return true;
      }
      const entryIDs = new Set(parseKeyMainEntries(data.main_entry_data).map(entry => entry.id));
      return includedMainEntries.every(entryID => entryIDs.has(entryID)) && excludedMainEntries.every(entryID => !entryIDs.has(entryID));
    }).sort((a, b) => {
      const intensityA = getKeyIntensity(allKeys[a]);
      const intensityB = getKeyIntensity(allKeys[b]);
      const classLevelA = getKeyClassLevel(allKeys[a]);
      const classLevelB = getKeyClassLevel(allKeys[b]);
      const exceedsMaxDiff = Number(classLevelA > classLevelMax) - Number(classLevelB > classLevelMax);
      if (exceedsMaxDiff != 0) {
        return exceedsMaxDiff;
      }
      const intensityDiff = intensityB - intensityA;
      if (intensityDiff != 0) {
        return intensityDiff;
      }
      return Number(a) - Number(b);
    });
  });
  const setRarityFilterEnabled = (rarity, enabled) => {
    setFilterRarity(prev => {
      const next = {
        ...prev
      };
      if (enabled) {
        next[rarity] = true;
      } else {
        delete next[rarity];
      }
      return next;
    });
  };
  const setMainEntryFilterMode = (entryID, mode) => {
    setFilterMainEntry(prev => {
      const next = {
        ...prev
      };
      if (mode === "default") {
        delete next[entryID];
      } else {
        next[entryID] = mode;
      }
      return next;
    });
  };
  const starRewards = libs.createMemo(() => {
    const cfg = config();
    if (!cfg) return [];
    return [1, 2, 3].map(star => ({
      star,
      items: Object.entries(cfg[`star_reward${star}`] ?? {}).map(([itemId, count]) => ({
        itemId,
        count
      })),
      title: `#DiffSelection_StarReward${star}`
    }));
  });
  libs.createEffect(libs.on(() => [difficultySelection()?.endTime, difficultySelection()?.state, gameState()?.state], () => {
    restartCountdown();
  }));
  libs.createEffect(() => {
    const selection = difficultySelection();
    if (selection !== undefined && selection.state === "pending" && selection.resolvedDifficulty !== undefined) {
      setDiff(selection.resolvedDifficulty);
    }
  });
  libs.createEffect(() => {
    if (canEditSelection() == false) {
      return;
    }
    if (!availableDiffSet().has(diff())) {
      setDiff(fallbackDiff());
    }
  });
  libs.createEffect(() => {
    if (!canUseKey()) {
      setShowKeyList(false);
    }
  });
  libs.createEffect(libs.on(isDungeonSelectionVisible, visible => {
    if (visible) {
      setShowKeyList(false);
    }
  }));
  libs.createEffect(libs.on(() => gameState()?.state, state => {
    if (state === "GameState_DiffSelection") {
      setHeroModelList(Game.GetPlayerIDsOnTeam(DOTATeam_t.DOTA_TEAM_GOODGUYS).map(id => ({
        id,
        heroName: getNetDataKey("common", "hero_selection", id)?.heroName ?? ""
      })));
    }
  }));
  libs.createEffect(libs.on(() => difficultySelection()?.playerDifficulties?.[playerID], difficulty => {
    if (canEditSelection()) {
      const nextDiff = difficulty !== undefined && availableDiffSet().has(difficulty) ? difficulty : fallbackDiff();
      setDiff(nextDiff);
    }
  }));
  libs.onCleanup(() => {
    stopCountdown();
  });
  const createStarChecked = star => {
    return libs.createMemo(() => {
      const data = player_diff_first_passes();
      const diffKey = diff().toString();
      const playerStar = data?.[diffKey]?.star ?? 0;
      return playerStar >= star;
    });
  };
  const moveDiffSelection = delta => {
    if (canEditSelection() == false) {
      return;
    }
    const availableDiffs = availableDiffList();
    if (availableDiffs.length <= 0) {
      return;
    }
    const currentIndex = availableDiffs.indexOf(diff());
    const nextIndex = currentIndex + delta;
    if (nextIndex < 0 || nextIndex >= availableDiffs.length) {
      return;
    }
    updateSelectedDiff(availableDiffs[nextIndex]);
  };
  const startSelectedDiff = () => {
    if (canEditSelection() == false || isInitiatorPlayer() == false || availableDiffSet().has(diff()) == false) {
      return;
    }
    GameEvents.SendCustomEventToServer("game_mode_confirm_difficulty", {
      difficulty: diff()
    });
  };
  useClientSideEvent("key_pressed", data => {
    if (isGamepad() != true || gameState()?.state != "GameState_DiffSelection" || gameModeState()?.selectedModeId !== "common") {
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp || data.keyFunction == KeyFunction.Left) {
      moveDiffSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown || data.keyFunction == KeyFunction.Right) {
      moveDiffSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm) {
      startSelectedDiff();
    }
  });
  let refDiffList;
  let refBGScene;
  libs.onMount(() => {
    const mouseEventName = DoUniqueString("DungeonSelectionDiffList");
    CustomUIConfig.SubscribeMouseEvent(mouseEventName, ({
      event_name: eventName,
      value
    }) => {
      if (!refDiffList?.IsValid() || !refDiffList.BHasHoverStyle()) {
        return;
      }
      if (eventName === "wheeled") {
        if (value === 1) {
          moveDiffSelection(-1);
        } else if (value === -1) {
          moveDiffSelection(1);
        }
      }
    });
    libs.onCleanup(() => {
      try {
        CustomUIConfig.UnsubscribeMouseEvent(mouseEventName);
      } catch (error) {}
    });
  });
  return [(() => {
    const _el$ = libs.createElement("Panel", {
        id: "CenterModels",
        hittest: false
      }, null);
      libs.createElement("DOTAParticleScenePanel", {
        id: "BottomParticle",
        particleName: "particles/ui/game/ui_game_general_special_effects_05_1_fx.vpcf",
        cameraOrigin: "0 0 800",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
      const _el$3 = libs.createElement("DOTAParticleScenePanel", {
        id: "BGScene",
        particleName: "particles/ui/lottery/ui_lottery_back_fx.vpcf",
        cameraOrigin: "0 0 500",
        lookAt: "0 0 0",
        fov: 90,
        hittest: false
      }, _el$);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return heroModelList();
      },
      children: (player, idx) => {
        const hero = libs.createMemo(() => player.heroName);
        const nameY = libs.createMemo(() => HERO_NAME_Y_OFFSET[hero()] ?? DEFAULT_NAME_Y);
        const pos = libs.createMemo(() => getHeroPosition(idx(), heroModelList().length));
        const playerName = libs.createMemo(() => Players.GetPlayerName(player.id));
        const playerDiff = libs.createMemo(() => difficultySelection()?.playerDifficulties?.[player.id] ?? fallbackDiff());
        const duration = 0.25;
        const fxTime = 0.25;
        const interval = 0;
        return (() => {
          const _el$46 = libs.createElement("Panel", {
              "class": "HeroWithShowFx",
              get style() {
                return {
                  x: pos().x + "px",
                  y: pos().y + "px",
                  zIndex: pos().zIndex
                };
              }
            }, null),
            _el$47 = libs.createElement("Panel", {
              "class": "PlayerName",
              get style() {
                return {
                  x: 0 + "px",
                  y: nameY() + "px"
                };
              }
            }, _el$46),
            _el$48 = libs.createElement("Label", {
              id: "Diff",
              get text() {
                return "#DiffSelection_DiffName" + playerDiff();
              }
            }, _el$47),
            _el$49 = libs.createElement("Label", {
              id: "Name",
              get text() {
                return playerName();
              }
            }, _el$47);
          libs.insert(_el$46, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
            id: "HeroModelScene",
            get unit() {
              return hero();
            },
            get style() {
              return {
                animationDuration: duration + "s",
                animationDelay: fxTime + (duration + interval) * idx() + "s",
                animationFillMode: "both",
                animationName: "HeroShow"
              };
            }
          }), _el$47);
          libs.effect(_p$ => {
            const _v$0 = {
                x: pos().x + "px",
                y: pos().y + "px",
                zIndex: pos().zIndex
              },
              _v$1 = {
                x: 0 + "px",
                y: nameY() + "px"
              },
              _v$10 = "#DiffSelection_DiffName" + playerDiff(),
              _v$11 = playerName();
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$46, "style", _v$0, _p$._v$0));
            _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$47, "style", _v$1, _p$._v$1));
            _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$48, "text", _v$10, _p$._v$10));
            _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$49, "text", _v$11, _p$._v$11));
            return _p$;
          }, {
            _v$0: undefined,
            _v$1: undefined,
            _v$10: undefined,
            _v$11: undefined
          });
          return _el$46;
        })();
      }
    }), _el$3);
    const _ref$ = refBGScene;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$3) : refBGScene = _el$3;
    return _el$;
  })(), (() => {
    const _el$4 = libs.createElement("Panel", {
        id: "DiffRight"
      }, null),
      _el$5 = libs.createElement("Panel", {
        id: "DiffInfo",
        get opacity() {
          return !showKeyList() ? 1 : 0;
        }
      }, _el$4);
      libs.createElement("Label", {
        id: "DiffSelectionTitleLabel",
        text: "#DiffSelection_Title"
      }, _el$5);
      const _el$7 = libs.createElement("Panel", {
        id: "DiffContainer"
      }, _el$5),
      _el$8 = libs.createElement("Panel", {
        id: "DiffList"
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        height: "fill-parent-flow(1)",
        horizontalAlign: "center",
        scroll: "y",
        get opacity() {
          return !showKeyList() ? 1 : 0;
        }
      }, _el$4),
      _el$0 = libs.createElement("Panel", {
        id: "DiffDetail"
      }, _el$9),
      _el$10 = libs.createElement("Label", {
        id: "NormalReward",
        html: true,
        text: "#DiffSelection_NormalReward"
      }, _el$0);
      libs.createElement("Panel", {
        id: "DiffDetailDivider"
      }, _el$0);
      const _el$12 = libs.createElement("Label", {
        id: "NormalRewardDesc",
        html: true,
        get text() {
          return "#DiffSelection_NormalReward" + diff();
        }
      }, _el$0);
      libs.createElement("Label", {
        id: "ChallengeReward",
        html: true,
        text: "#DiffSelection_ChallengeReward"
      }, _el$0);
      libs.createElement("Panel", {
        id: "DiffDetailDivider"
      }, _el$0);
      const _el$15 = libs.createElement("Panel", {
        id: "StarRewardList"
      }, _el$0);
      libs.createElement("Label", {
        id: "RewardCondition",
        text: "#DiffSelection_RewardCondition"
      }, _el$0);
      libs.createElement("Panel", {
        id: "DiffDetailDivider"
      }, _el$0);
      const _el$18 = libs.createElement("Panel", {
        id: "StarConditionList"
      }, _el$0),
      _el$40 = libs.createElement("Panel", {
        id: "Teammate"
      }, _el$4),
      _el$41 = libs.createElement("Panel", {
        id: "TeammateDiff"
      }, _el$40),
      _el$42 = libs.createElement("Label", {
        text: "#DiffSelection_TeamDiff",
        get vars() {
          return {
            diff: teamDiff()
          };
        }
      }, _el$41),
      _el$43 = libs.createElement("Label", {
        id: "StartCountdown",
        text: "#DiffSelection_StartCountdown",
        get vars() {
          return {
            value: countdown()
          };
        }
      }, _el$40);
    libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get visible() {
        return diffList().length >= 3;
      },
      id: "LeftArrow",
      "class": "DiffSelectionArrow",
      get enabled() {
        return canMoveDiff(-1);
      },
      onactivate: () => {
        moveDiffSelection(-1);
      }
    }), _el$8);
    const _ref$2 = refDiffList;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$8) : refDiffList = _el$8;
    libs.insert(_el$8, libs.createComponent(libs.For, {
      get each() {
        return diffList();
      },
      children: _diff => {
        const posIndex = () => {
          const a = _diff - diff();
          if (a < -2) return -2;
          if (a > 2) return 2;
          return a;
        };
        return (() => {
          const _el$50 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("Diff", "Index" + posIndex());
              }
            }, null),
            _el$51 = libs.createElement("Panel", {
              "class": "DiffTop"
            }, _el$50);
            libs.createElement("DOTAParticleScenePanel", {
              "class": "SelectParticle",
              particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
              cameraOrigin: "0 0 60",
              fov: 60,
              lookAt: "0 0 0",
              hittest: false,
              squarePixels: true
            }, _el$51);
          libs.insert(_el$51, libs.createComponent(EOM_Button.EOM_BaseButton, {
            "class": "DiffButton",
            get classList() {
              return {
                "Select": posIndex() == 0
              };
            },
            get enabled() {
              return libs.memo(() => !!availableDiffSet().has(_diff))() && canEditSelection();
            },
            onactivate: () => {
              updateSelectedDiff(_diff);
            },
            get children() {
              const _el$53 = libs.createElement("Label", {
                "class": "DiffName",
                text: _diff
              }, null);
              libs.setProp(_el$53, "text", _diff);
              return _el$53;
            }
          }), null);
          libs.insert(_el$50, libs.createComponent(libs.Show, {
            when: _diff <= TRAIN_DIFF,
            get children() {
              const _el$54 = libs.createElement("Label", {
                "class": "DiffDesc",
                verticalAlign: "bottom",
                text: "#DiffSelection_TrainDiff"
              }, null);
              libs.setProp(_el$54, "verticalAlign", "bottom");
              return _el$54;
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$50, "class", libs.classNames("Diff", "Index" + posIndex()), _$p));
          return _el$50;
        })();
      }
    }));
    libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get visible() {
        return diffList().length >= 3;
      },
      id: "RightArrow",
      "class": "DiffSelectionArrow",
      get enabled() {
        return canMoveDiff(1);
      },
      onactivate: () => {
        moveDiffSelection(1);
      }
    }), null);
    libs.setProp(_el$9, "height", "fill-parent-flow(1)");
    libs.setProp(_el$9, "horizontalAlign", "center");
    libs.setProp(_el$9, "className", "VerticalScrollStyle");
    libs.setProp(_el$9, "scroll", "y");
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return diff() <= TRAIN_DIFF;
      },
      get children() {
        return libs.createElement("Label", {
          id: "TrainInfo",
          html: true,
          text: "#DiffSelection_TrainInfo"
        }, null);
      }
    }), _el$10);
    libs.insert(_el$15, libs.createComponent(libs.For, {
      get each() {
        return starRewards();
      },
      children: reward => {
        const isChecked = createStarChecked(reward.star);
        return libs.createComponent(libs.For, {
          get each() {
            return reward.items;
          },
          children: item => libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return item.itemId;
            },
            get amounts() {
              return item.count;
            },
            get children() {
              return [libs.createComponent(libs.Show, {
                get when() {
                  return isChecked();
                },
                get children() {
                  return libs.createElement("Image", {
                    id: "CheckTag",
                    hittest: false
                  }, null);
                }
              }), (() => {
                const _el$56 = libs.createElement("Panel", {
                  width: "100%",
                  height: "100%"
                }, null);
                libs.setProp(_el$56, "width", "100%");
                libs.setProp(_el$56, "height", "100%");
                libs.effect(_$p => libs.setProp(_el$56, "customTooltip", {
                  name: "title_image_text",
                  title: GetLocalization(String(item.itemId)),
                  image: getSrcPath("store_items/" + item.itemId + ".png"),
                  text: GetLocalization(item.itemId + "_description") + "<br>" + GetLocalization("DiffSelection_StarReward" + reward.star)
                }, _$p));
                return _el$56;
              })()];
            }
          })
        });
      }
    }));
    libs.insert(_el$18, libs.createComponent(libs.For, {
      get each() {
        return starRewards();
      },
      children: reward => {
        const isChecked = createStarChecked(reward.star);
        return (() => {
          const _el$57 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("StarCondition", {
                  Unfilled: !isChecked()
                });
              }
            }, null);
            libs.createElement("Image", {
              "class": "DiffStar"
            }, _el$57);
            const _el$59 = libs.createElement("Label", {
              "class": "StarConditionText",
              get text() {
                return "#DiffSelection_StarCondition" + reward.star;
              }
            }, _el$57);
          libs.effect(_p$ => {
            const _v$12 = libs.classNames("StarCondition", {
                Unfilled: !isChecked()
              }),
              _v$13 = "#DiffSelection_StarCondition" + reward.star;
            _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$57, "class", _v$12, _p$._v$12));
            _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$59, "text", _v$13, _p$._v$13));
            return _p$;
          }, {
            _v$12: undefined,
            _v$13: undefined
          });
          return _el$57;
        })();
      }
    }));
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return canUseKey();
      },
      get children() {
        const _el$19 = libs.createElement("Panel", {
            id: "KeySelectionWrapper"
          }, null),
          _el$20 = libs.createElement("Panel", {
            flowChildren: "right"
          }, _el$19);
          libs.createElement("Label", {
            id: "KeySelectionTitle",
            text: "#DiffSelection_Key"
          }, _el$20);
          const _el$22 = libs.createElement("Panel", {
            "class": "ToolTipInfo"
          }, _el$20);
          libs.createElement("Panel", {
            id: "DiffDetailDivider"
          }, _el$19);
          const _el$24 = libs.createElement("Panel", {
            id: "KeySelectionRow"
          }, _el$19),
          _el$27 = libs.createElement("Label", {
            id: "KeyIntensityLimit",
            text: "#DiffSelection_KeyCondition",
            get vars() {
              return {
                diff: diff(),
                value: keyClassLevelMax()
              };
            }
          }, _el$19);
        libs.setProp(_el$20, "flowChildren", "right");
        libs.setProp(_el$22, "tooltip_text", "#Equipment_DiffKeyTips");
        libs.insert(_el$24, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "KeyActionSlot",
          get classList() {
            return {
              HasKey: selectedKeyData() != undefined
            };
          },
          get enabled() {
            return canEditSelection();
          },
          onactivate: () => {
            setShowKeyList(prev => !prev);
          },
          get children() {
            return [libs.createElement("Panel", {
              id: "Bg"
            }, null), libs.createComponent(libs.Show, {
              get when() {
                return selectedKeyData();
              },
              get children() {
                return [libs.createComponent(server_dungeon_key.DungeonKey, {
                  get data() {
                    return selectedKeyData();
                  },
                  oncontextmenu: removeDifficultyKey
                }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                  "class": "SelectedKeyCloseButton",
                  onactivate: removeDifficultyKey
                })];
              }
            })];
          }
        }), null);
        libs.insert(_el$24, libs.createComponent(libs.Show, {
          get when() {
            return difficultyKey()?.owner_id != undefined;
          },
          get children() {
            return [libs.createElement("Label", {
              id: "KeyOwnerLabel",
              text: "#DiffSelection_KeyOwner"
            }, null), libs.createComponent(Player.PlayerAvatar, {
              id: "KeyOwnerAvatar",
              get playerid() {
                return difficultyKey().owner_id;
              }
            })];
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$27, "vars", {
          diff: diff(),
          value: keyClassLevelMax()
        }, _$p));
        return _el$19;
      }
    }), _el$40);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return showKeyList();
      },
      get children() {
        const _el$28 = libs.createElement("Panel", {
            id: "KeyListRoot"
          }, null),
          _el$29 = libs.createElement("Panel", {
            id: "KeyListBox"
          }, _el$28),
          _el$37 = libs.createElement("Panel", {
            id: "BtnsContainer"
          }, _el$28),
          _el$38 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "right"
          }, _el$37),
          _el$39 = libs.createElement("Button", {
            id: "ResetBtn",
            "class": "SecondaryButtonStates"
          }, _el$38);
        libs.insert(_el$29, libs.createComponent(libs.Show, {
          get when() {
            return showKeyFilter();
          },
          get fallback() {
            return libs.createComponent(RecycleView.RecycleView, {
              id: "DungeonKeysList",
              input: availableKeyIDs,
              direction: "VerticalGrid",
              wheelStep: 88,
              childConfig: {
                width: 88,
                height: 88,
                margin: 2
              },
              grid_children: () => libs.createElement("Panel", {
                "class": "EquipListGrid"
              }, null),
              children: id => {
                const keyData = () => player_keys()[id()];
                const disabled = libs.createMemo(() => {
                  const data = keyData();
                  return data == undefined || getKeyClassLevel(data) > keyClassLevelMax();
                });
                return (() => {
                  const _el$61 = libs.createElement("Panel", {
                      "class": "Item"
                    }, null),
                    _el$62 = libs.createElement("Panel", {
                      "class": "SelectedBorder",
                      hittest: false
                    }, _el$61);
                  libs.setProp(_el$61, "onactivate", () => {
                    if (disabled()) {
                      return;
                    }
                    updateDifficultyKey(id());
                    setShowKeyList(false);
                  });
                  libs.insert(_el$61, libs.createComponent(server_dungeon_key.DungeonKey, {
                    get keyID() {
                      return id();
                    }
                  }), _el$62);
                  libs.effect(_$p => libs.setProp(_el$61, "classList", {
                    Selected: selectedKeyID() == id(),
                    InAction: selectedKeyID() == id(),
                    Gray: disabled()
                  }, _$p));
                  return _el$61;
                })();
              }
            });
          },
          get children() {
            const _el$30 = libs.createElement("Panel", {
                id: "KeyFilterWindow",
                "class": "VerticalScrollStyle",
                scroll: "y"
              }, null),
              _el$31 = libs.createElement("Label", {
                id: "RarityLabel",
                "class": "Subheading FirstHeading",
                get text() {
                  return GetLocalization("#Equipment_Rarity");
                }
              }, _el$30);
              libs.createElement("Panel", {
                "class": "FilterLine"
              }, _el$30);
              const _el$33 = libs.createElement("Panel", {
                id: "RarityFilterList",
                "class": "CheckBoxList"
              }, _el$30),
              _el$34 = libs.createElement("Label", {
                "class": "Subheading",
                get text() {
                  return GetLocalization("#Key_GoodEffect");
                }
              }, _el$30);
              libs.createElement("Panel", {
                "class": "FilterLine"
              }, _el$30);
              const _el$36 = libs.createElement("Panel", {
                id: "KeyMainEntryFilterList"
              }, _el$30);
            libs.setProp(_el$30, "scroll", "y");
            libs.insert(_el$33, libs.createComponent(libs.For, {
              get each() {
                return Array(KEY_RARITY_COUNT);
              },
              children: (_, idx) => {
                const rarity = idx() + 1;
                return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  "class": "Rarity" + rarity,
                  get checked() {
                    return filterRarity()[rarity] ?? false;
                  },
                  get text() {
                    return GetLocalization(`#Equipment_Rarity_${rarity}`);
                  },
                  onchecked: b => {
                    setRarityFilterEnabled(rarity, b);
                  }
                });
              }
            }));
            libs.insert(_el$36, libs.createComponent(libs.For, {
              each: KEY_MAIN_ENTRY_FILTER_LIST,
              children: entry => {
                const mode = () => filterMainEntry()[entry.entry_name] ?? "default";
                return (() => {
                  const _el$63 = libs.createElement("Panel", {
                      "class": "KeyMainEntryFilterRow"
                    }, null),
                    _el$64 = libs.createElement("Label", {
                      html: true,
                      "class": "KeyMainEntryFilterName",
                      get text() {
                        return GetLocalization(`#property_${entry.entry_name}`).replace("%", "");
                      }
                    }, _el$63),
                    _el$65 = libs.createElement("Panel", {
                      "class": "KeyMainEntryFilterModeList"
                    }, _el$63);
                  libs.insert(_el$65, libs.createComponent(libs.For, {
                    each: KEY_MAIN_ENTRY_FILTER_MODES,
                    children: (filterMode, index) => (() => {
                      const _el$66 = libs.createElement("Panel", {
                          "class": "KeyMainEntryFilterModeOption"
                        }, null),
                        _el$67 = libs.createElement("Button", {
                          get ["class"]() {
                            return libs.classNames("KeyMainEntryFilterModeButton", `KeyMainEntryFilterMode-${filterMode}`, {
                              Selected: mode() === filterMode
                            });
                          }
                        }, _el$66),
                        _el$68 = libs.createElement("Label", {
                          get text() {
                            return GetLocalization(`#RuneFilter_AdverbEntryMode_${filterMode}`);
                          }
                        }, _el$67);
                      libs.setProp(_el$67, "onactivate", () => setMainEntryFilterMode(entry.entry_name, filterMode));
                      libs.insert(_el$66, libs.createComponent(libs.Show, {
                        get when() {
                          return index() < KEY_MAIN_ENTRY_FILTER_MODES.length - 1;
                        },
                        get children() {
                          return libs.createElement("Label", {
                            "class": "KeyMainEntryFilterModeSeparator",
                            text: "/"
                          }, null);
                        }
                      }), null);
                      libs.effect(_p$ => {
                        const _v$14 = libs.classNames("KeyMainEntryFilterModeButton", `KeyMainEntryFilterMode-${filterMode}`, {
                            Selected: mode() === filterMode
                          }),
                          _v$15 = GetLocalization(`#RuneFilter_AdverbEntryMode_${filterMode}`);
                        _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$67, "class", _v$14, _p$._v$14));
                        _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$68, "text", _v$15, _p$._v$15));
                        return _p$;
                      }, {
                        _v$14: undefined,
                        _v$15: undefined
                      });
                      return _el$66;
                    })()
                  }));
                  libs.effect(_$p => libs.setProp(_el$64, "text", GetLocalization(`#property_${entry.entry_name}`).replace("%", ""), _$p));
                  return _el$63;
                })();
              }
            }));
            libs.effect(_p$ => {
              const _v$ = GetLocalization("#Equipment_Rarity"),
                _v$2 = GetLocalization("#Key_GoodEffect");
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$31, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$34, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$30;
          }
        }));
        libs.setProp(_el$38, "align", "center center");
        libs.setProp(_el$38, "flowChildren", "right");
        libs.insert(_el$38, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          id: "FilterBtn",
          get classList() {
            return {
              ShowBtnBorder: showKeyFilter()
            };
          },
          text: "#Hud_Equipment_Filter",
          onactivate: () => {
            setShowKeyFilter(prev => !prev);
          }
        }), _el$39);
        libs.setProp(_el$39, "onactivate", () => {
          libs.batch(() => {
            setFilterRarity({});
            setFilterMainEntry({});
          });
        });
        return _el$28;
      }
    }), _el$40);
    libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "Start",
      get visible() {
        return isInitiatorPlayer();
      },
      get enabled() {
        return libs.memo(() => !!availableDiffSet().has(diff()))() && canEditSelection();
      },
      onactivate: startSelectedDiff,
      get children() {
        const _el$44 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "right"
          }, null);
          libs.createElement("Label", {
            id: "StartLabel",
            text: "#DiffSelection_Start"
          }, _el$44);
        libs.setProp(_el$44, "align", "center center");
        libs.setProp(_el$44, "flowChildren", "right");
        libs.insert(_el$44, libs.createComponent(libs.Show, {
          get when() {
            return isGamepad();
          },
          get children() {
            return libs.createComponent(EOM_GamePad.EOM_GamePad, {
              get keyName() {
                return getGamepadHotkey(KeyFunction.OptionConfirm);
              }
            });
          }
        }), null);
        return _el$44;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = !showKeyList() ? 1 : 0,
        _v$4 = !showKeyList() ? 1 : 0,
        _v$5 = "#DiffSelection_NormalReward" + diff(),
        _v$6 = isCountdownActive(),
        _v$7 = {
          diff: teamDiff()
        },
        _v$8 = isCountdownActive(),
        _v$9 = {
          value: countdown()
        };
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "opacity", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "opacity", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$12, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$40, "visible", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$42, "vars", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$43, "visible", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$43, "vars", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$4;
  })()];
};

const huntKeyValues = KeyValues;
function getHuntBossBuffs(difficulty) {
  const raw = huntKeyValues.hunt_difficulty_affix?.[String(difficulty)]?.FixedAffixes ?? "";
  const result = [];
  const seen = new Set();
  for (const entry of raw.split("|")) {
    if (entry.trim() === "") continue;
    const parts = entry.split(":");
    const id = parts[0].trim();
    const level = parts.length === 1 ? 1 : Number(parts[1].trim());
    if (parts.length > 2 || id === "" || !Number.isInteger(level) || level < 1 || seen.has(id)) return [];
    if (hunt_buff_icon.GetHuntBuffData(id, level)?.type !== 1) return [];
    seen.add(id);
    result.push({
      id,
      level
    });
  }
  return result;
}
function getHuntFieldBuffCount(difficulty) {
  const count = Number(huntKeyValues.hunt_difficulty_affix?.[String(difficulty)]?.FieldBuffCount ?? 0);
  return Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
}
function getHuntFieldBuffs() {
  return hunt_buff_icon.GetHuntBuffCatalog().filter(buff => buff.type === 2).map(({
    id,
    level
  }) => ({
    id,
    level
  }));
}

const BOSS_PREVIEW_IMAGES = ["boss_axe.png", "boss_bloodseeker.png", "boss_earthshaker.png", "boss_grimstroke.png", "boss_lion.png", "boss_queenofpain.png", "boss_shredder.png", "boss_skeleton_king.png"];
const HUNT_BOSS_SAVE_LIMIT = 5;
const HUNT_INTELLIGENCE_TOKEN_ID = "110025";
const HUNT_INTELLIGENCE_MAX = solid_utils.parseTokenCosts(KeyValues.hunt_common?.intelligence_max?.value).find(item => item.name === HUNT_INTELLIGENCE_TOKEN_ID)?.value || 300;
const deserializeSave = save => {
  const snapshot = JSON.parseSafe(save.data);
  if (snapshot?.hero_name === undefined) return undefined;
  return {
    id: save.slot_id,
    time: global_selection.formatDateText(Number(snapshot.time)),
    hero: snapshot.hero_name,
    difficulty: save.diff,
    strength: snapshot.strength ?? 0,
    damage: snapshot.total_damage ?? 0,
    blessings: snapshot.blessings?.map(blessing => blessing.name) ?? [],
    artifacts: snapshot.artifacts?.map(artifact => artifact.item_name) ?? []
  };
};
function HuntBossSaveItems(props) {
  const width = () => props.items.length * 36;
  return libs.createComponent(RecycleView.RecycleView, {
    "class": "HuntBossSaveItems",
    get style() {
      return {
        width: `${width()}px`
      };
    },
    input: () => props.items,
    direction: "Horizontal",
    showBar: false,
    childConfig: {
      width: 36,
      height: 36
    },
    children: item => libs.createComponent(common_item.CommonItem, {
      get itemName() {
        return item();
      },
      showTips: true
    })
  });
}
const HuntBossSelection = () => {
  const playerID = Players.GetLocalPlayer();
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const gameModeState = solid_utils.createNetDataSignal("common", "game_mode_state");
  const gameModeProfiles = solid_utils.createNetDataSignal("common", "game_mode_profiles");
  const difficultySelection = solid_utils.createNetDataSignal("common", "game_mode_difficulty_selection");
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const heroSelection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const playerHuntSaveDatas = solid_utils.createServiceNetData("player_hunt_save_datas", {});
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const huntSaveRecords = libs.createMemo(() => Object.values(playerHuntSaveDatas()).map(deserializeSave).filter(record => record !== undefined).sort((a, b) => a.id - b.id));
  const selectedModeProfile = libs.createMemo(() => gameModeProfiles()?.registeredModes?.hunt_boss);
  const diffList = libs.createMemo(() => {
    return (selectedModeProfile()?.configuredDifficulties ?? []).filter(Number.isFinite).sort((a, b) => a - b);
  });
  const [difficulty, setDifficulty] = libs.createSignal(1);
  const bossBuffs = libs.createMemo(() => getHuntBossBuffs(difficulty()));
  const fieldBuffCount = libs.createMemo(() => getHuntFieldBuffCount(difficulty()));
  const fieldBuffs = getHuntFieldBuffs();
  const [showFieldBuffs, setShowFieldBuffs] = libs.createSignal(false);
  const [countdown, setCountdown] = libs.createSignal(0);
  const [showSaveSelector, setShowSaveSelector] = libs.createSignal(false);
  const selectedSave = libs.createMemo(() => {
    const slotID = difficultySelection()?.playerHuntSlotIDs?.[playerID];
    return slotID === undefined ? undefined : huntSaveRecords().find(record => record.id === slotID);
  });
  const selectedHeroName = libs.createMemo(() => heroSelection()?.heroName ?? "");
  const huntIntelligence = libs.createMemo(() => playerTokens()[HUNT_INTELLIGENCE_TOKEN_ID]?.amounts ?? 0);
  const huntIntelligenceProgress = libs.createMemo(() => huntIntelligence() / HUNT_INTELLIGENCE_MAX * 100);
  let countdownTimer;
  const availableDifficulties = libs.createMemo(() => {
    return (selectedModeProfile()?.availableDifficulties ?? []).filter(info => info.available !== false && diffList().includes(info.difficulty)).map(info => info.difficulty).sort((a, b) => a - b);
  });
  const canEdit = libs.createMemo(() => difficultySelection()?.state !== "pending" && gameModeState()?.startingModeId === undefined);
  const isSelectionVisible = libs.createMemo(() => gameState()?.state === "GameState_DiffSelection" && gameModeState()?.selectedModeId === "hunt_boss" && gameModeState()?.startingModeId === undefined);
  const isInitiator = libs.createMemo(() => {
    const initiatorPlayerId = difficultySelection()?.initiatorPlayerId;
    return initiatorPlayerId === undefined || initiatorPlayerId === playerID;
  });
  const teamDifficulty = libs.createMemo(() => difficultySelection()?.resolvedDifficulty ?? difficulty());
  const requiredSaveDifficulty = libs.createMemo(() => KeyValues.hunt_intelligence?.[String(Math.max(teamDifficulty(), difficulty()))]?.dungeon_diff ?? Infinity);
  const participantPlayerIDs = libs.createMemo(() => Object.keys(difficultySelection()?.playerHuntSaveReady ?? {}).map(id => Number(id)));
  const allSavesReady = libs.createMemo(() => participantPlayerIDs().length > 0 && participantPlayerIDs().every(id => difficultySelection()?.playerHuntSaveReady?.[id] === true));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad === 1);
  const bossPreviewImage = libs.createMemo(() => {
    const index = (Math.max(1, difficulty()) - 1) % BOSS_PREVIEW_IMAGES.length;
    return `file://{images}/custom_game/task_icons/${BOSS_PREVIEW_IMAGES[index]}`;
  });
  const fallbackDifficulty = libs.createMemo(() => {
    const available = availableDifficulties();
    const defaultDifficulty = selectedModeProfile()?.defaultDifficulty;
    return defaultDifficulty !== undefined && available.includes(defaultDifficulty) ? defaultDifficulty : available[0] ?? 1;
  });
  const stopCountdown = () => {
    if (countdownTimer !== undefined) {
      clearInterval(countdownTimer);
      countdownTimer = undefined;
    }
  };
  const restartCountdown = () => {
    stopCountdown();
    const endTime = difficultySelection()?.endTime;
    if (endTime === undefined) {
      setCountdown(0);
      return;
    }
    const update = () => setCountdown(Math.max(0, Math.ceil(endTime - Game.GetGameTime())));
    update();
    if (endTime > Game.GetGameTime()) {
      countdownTimer = setInterval(update, 1000);
    }
  };
  libs.createEffect(libs.on(isSelectionVisible, visible => {
    if (!visible) return;
    setShowSaveSelector(false);
  }));
  libs.createEffect(libs.on(() => [difficultySelection()?.endTime, difficultySelection()?.state, gameState()?.state], restartCountdown));
  libs.createEffect(() => {
    if (canEdit() && !availableDifficulties().includes(difficulty())) {
      setDifficulty(fallbackDifficulty());
    }
  });
  libs.createEffect(libs.on(() => difficultySelection()?.playerDifficulties?.[playerID], selected => {
    if (canEdit()) {
      setDifficulty(selected !== undefined && availableDifficulties().includes(selected) ? selected : fallbackDifficulty());
    }
  }));
  libs.onCleanup(stopCountdown);
  const selectDifficulty = value => {
    if (!canEdit() || !availableDifficulties().includes(value)) return;
    setDifficulty(value);
    GameEvents.SendCustomEventToServer("game_mode_select_difficulty", {
      difficulty: value
    });
  };
  const moveDifficulty = offset => {
    const available = availableDifficulties();
    const nextIndex = available.indexOf(difficulty()) + offset;
    if (canEdit() && nextIndex >= 0 && nextIndex < available.length) selectDifficulty(available[nextIndex]);
  };
  const getSaveError = record => {
    if (record.hero !== selectedHeroName()) return GetLocalization("#HuntBossDiffSelection_SaveHeroMismatch");
    if (record.difficulty < requiredSaveDifficulty()) return GetLocalization("#HuntBossDiffSelection_SaveDifficultyTooLow");
    return undefined;
  };
  const start = () => {
    if (!canEdit() || !isInitiator() || !availableDifficulties().includes(difficulty())) return;
    const save = selectedSave();
    if (save === undefined) {
      ErrorMessage(GetLocalization("#HuntBossDiffSelection_SaveNotSelected"));
      return;
    }
    const error = getSaveError(save);
    if (error !== undefined) {
      ErrorMessage(error);
      return;
    }
    if (!allSavesReady()) {
      ErrorMessage(GetLocalization("#HuntBossDiffSelection_TeamSaveNotReady"));
      return;
    }
    GameEvents.SendCustomEventToServer("game_mode_confirm_difficulty", {
      difficulty: difficulty()
    });
  };
  const selectSave = record => {
    if (!canEdit()) return;
    const error = getSaveError(record);
    if (error !== undefined) {
      ErrorMessage(error);
      return;
    }
    GameEvents.SendCustomEventToServer("game_mode_select_hunt_save", {
      hunt_slot_id: record.id
    });
    setShowSaveSelector(false);
  };
  useClientSideEvent("key_pressed", event => {
    if (!isGamepad() || gameState()?.state !== "GameState_DiffSelection" || gameModeState()?.selectedModeId !== "hunt_boss") return;
    if (event.keyFunction === KeyFunction.OptionUp) moveDifficulty(-1);else if (event.keyFunction === KeyFunction.OptionDown) moveDifficulty(1);else if (event.keyFunction === KeyFunction.OptionConfirm) start();
  });
  let refDiffList;
  libs.onMount(() => {
    const mouseEventName = DoUniqueString("HuntBossSelectionDiffList");
    CustomUIConfig.SubscribeMouseEvent(mouseEventName, ({
      event_name: eventName,
      value
    }) => {
      if (!refDiffList?.IsValid() || !refDiffList.BHasHoverStyle()) {
        return;
      }
      if (eventName === "wheeled") {
        if (value === 1) {
          moveDifficulty(-1);
        } else if (value === -1) {
          moveDifficulty(1);
        }
      }
    });
    libs.onCleanup(() => {
      try {
        CustomUIConfig.UnsubscribeMouseEvent(mouseEventName);
      } catch (error) {}
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HuntBossSelection"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "HuntBossPreview"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "HuntBossPreviewHeader"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        id: "HuntBossPreviewTitle",
        get text() {
          return GetLocalization("#HuntBossDiffSelection_ModeTitle");
        }
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "HuntBossPreviewInfo"
      }, _el$3),
      _el$6 = libs.createElement("Image", {
        id: "HuntBossPreviewImage",
        get src() {
          return bossPreviewImage();
        },
        scaling: "stretch-to-fit-preserve-aspect",
        hittest: false
      }, _el$2),
      _el$7 = libs.createElement("Panel", {
        id: "DiffRight"
      }, _el$),
      _el$8 = libs.createElement("Panel", {
        id: "DiffInfo"
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        id: "DiffContainer"
      }, _el$8),
      _el$0 = libs.createElement("Panel", {
        id: "DiffList"
      }, _el$9),
      _el$1 = libs.createElement("Panel", {
        id: "HuntBossContent"
      }, _el$7),
      _el$10 = libs.createElement("Panel", {
        id: "HuntBossDetail",
        "class": "HuntBossDetailSection"
      }, _el$1),
      _el$11 = libs.createElement("Label", {
        id: "HuntBossDetailTitle",
        "class": "HuntBossDetailTitle",
        get text() {
          return GetLocalization("#HuntBossDiffSelection_ScopeTitle");
        }
      }, _el$10);
      libs.createElement("Panel", {
        "class": "DetailDivider"
      }, _el$10);
      const _el$13 = libs.createElement("Panel", {
        "class": "HuntBossDetailBody"
      }, _el$10),
      _el$14 = libs.createElement("Label", {
        id: "HuntBossDetailText",
        get text() {
          return GetLocalization(`#HuntBossDiffSelection_${difficulty()}_Description`);
        }
      }, _el$13),
      _el$20 = libs.createElement("Panel", {
        id: "HuntBossFieldEffects",
        "class": "HuntBossDetailSection"
      }, _el$1),
      _el$21 = libs.createElement("Label", {
        "class": "HuntBossDetailTitle",
        get text() {
          return GetLocalization("#HuntBossDiffSelection_FieldEffectsTitle");
        }
      }, _el$20);
      libs.createElement("Panel", {
        "class": "DetailDivider"
      }, _el$20);
      const _el$23 = libs.createElement("Panel", {
        "class": "HuntBossDetailBody"
      }, _el$20),
      _el$25 = libs.createElement("Panel", {
        id: "HuntBossIntelligence",
        "class": "HuntBossDetailSection"
      }, _el$1),
      _el$26 = libs.createElement("Label", {
        id: "HuntBossIntelligenceTitle",
        "class": "HuntBossDetailTitle",
        get text() {
          return GetLocalization("#HuntBossDiffSelection_IntelligenceTitle");
        }
      }, _el$25);
      libs.createElement("Panel", {
        "class": "DetailDivider"
      }, _el$25);
      const _el$28 = libs.createElement("Panel", {
        "class": "HuntBossDetailBody"
      }, _el$25),
      _el$30 = libs.createElement("Panel", {
        id: "HuntBossSaveSection",
        "class": "HuntBossDetailSection"
      }, _el$1),
      _el$31 = libs.createElement("Label", {
        id: "HuntBossSaveTitle",
        "class": "HuntBossDetailTitle",
        get text() {
          return GetLocalization("#HuntBossDiffSelection_SaveTitle");
        }
      }, _el$30);
      libs.createElement("Panel", {
        "class": "DetailDivider"
      }, _el$30);
      const _el$33 = libs.createElement("Panel", {
        "class": "HuntBossDetailBody"
      }, _el$30),
      _el$37 = libs.createElement("Panel", {
        width: "100%",
        height: "fill-parent-flow(1)"
      }, _el$1),
      _el$38 = libs.createElement("Panel", {
        id: "Teammate"
      }, _el$1),
      _el$39 = libs.createElement("Panel", {
        id: "TeammateDiff"
      }, _el$38),
      _el$40 = libs.createElement("Label", {
        get text() {
          return LocalizeWithVars("#HuntBossDiffSelection_Difficulty", {
            difficulty: teamDifficulty()
          });
        }
      }, _el$39),
      _el$41 = libs.createElement("Label", {
        id: "StartCountdown",
        get text() {
          return LocalizeWithVars("#DiffSelection_StartCountdown", {
            value: countdown()
          });
        }
      }, _el$38),
      _el$42 = libs.createElement("Panel", {
        id: "HuntBossBottom"
      }, _el$7),
      _el$43 = libs.createElement("Label", {
        id: "SaveDiffLimit",
        text: "#DiffSelection_SaveCondition",
        get vars() {
          return {
            diff: Math.max(teamDifficulty(), difficulty()),
            value: requiredSaveDifficulty()
          };
        }
      }, _el$42),
      _el$45 = libs.createElement("Panel", {
        id: "HuntBossPlayerSaves"
      }, _el$42);
    libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "LeftArrow",
      "class": "DiffSelectionArrow",
      get visible() {
        return availableDifficulties().length >= 3;
      },
      get enabled() {
        return libs.memo(() => !!canEdit())() && availableDifficulties().indexOf(difficulty()) > 0;
      },
      onactivate: () => moveDifficulty(-1)
    }), _el$0);
    const _ref$ = refDiffList;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$0) : refDiffList = _el$0;
    libs.insert(_el$0, libs.createComponent(libs.For, {
      get each() {
        return availableDifficulties();
      },
      children: value => {
        const positionIndex = () => Math.max(-2, Math.min(2, availableDifficulties().indexOf(value) - availableDifficulties().indexOf(difficulty())));
        return (() => {
          const _el$60 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("Diff", "Index" + positionIndex());
              }
            }, null);
            libs.createElement("DOTAParticleScenePanel", {
              "class": "SelectParticle",
              particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
              cameraOrigin: "0 0 60",
              fov: 60,
              lookAt: "0 0 0",
              hittest: false,
              squarePixels: true
            }, _el$60);
          libs.insert(_el$60, libs.createComponent(EOM_Button.EOM_BaseButton, {
            "class": "DiffButton",
            get classList() {
              return {
                Select: positionIndex() === 0
              };
            },
            get enabled() {
              return canEdit();
            },
            onactivate: () => selectDifficulty(value),
            get children() {
              const _el$62 = libs.createElement("Label", {
                "class": "DiffName",
                text: value
              }, null);
              libs.setProp(_el$62, "text", value);
              return _el$62;
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$60, "class", libs.classNames("Diff", "Index" + positionIndex()), _$p));
          return _el$60;
        })();
      }
    }));
    libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "RightArrow",
      "class": "DiffSelectionArrow",
      get visible() {
        return availableDifficulties().length >= 3;
      },
      get enabled() {
        return libs.memo(() => !!canEdit())() && availableDifficulties().indexOf(difficulty()) < availableDifficulties().length - 1;
      },
      onactivate: () => moveDifficulty(1)
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return bossBuffs().length > 0;
      },
      get children() {
        const _el$15 = libs.createElement("Panel", {
            id: "HuntBossBuffs",
            "class": "HuntBossDetailSection"
          }, null),
          _el$16 = libs.createElement("Label", {
            id: "HuntBossBuffsTitle",
            "class": "HuntBossDetailTitle",
            get text() {
              return GetLocalization("#HuntBossDiffSelection_BuffsTitle");
            }
          }, _el$15);
          libs.createElement("Panel", {
            "class": "DetailDivider"
          }, _el$15);
          const _el$18 = libs.createElement("Panel", {
            "class": "HuntBossDetailBody"
          }, _el$15),
          _el$19 = libs.createElement("Panel", {
            id: "HuntBossBuffList"
          }, _el$18);
        libs.insert(_el$19, libs.createComponent(libs.For, {
          get each() {
            return bossBuffs();
          },
          children: buff => libs.createComponent(hunt_buff_icon.HuntBuffIcon, {
            "class": "HuntBossBuffIcon",
            buff: buff
          })
        }));
        libs.effect(_$p => libs.setProp(_el$16, "text", GetLocalization("#HuntBossDiffSelection_BuffsTitle"), _$p));
        return _el$15;
      }
    }), _el$20);
    libs.insert(_el$23, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "HuntBossFieldEffectsButton",
      onactivate: () => setShowFieldBuffs(true),
      get children() {
        const _el$24 = libs.createElement("Label", {
          id: "HuntBossFieldEffectsText",
          get text() {
            return LocalizeWithVars("#HuntBossDiffSelection_FieldEffectsCount", {
              count: fieldBuffCount()
            });
          },
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$24, "text", LocalizeWithVars("#HuntBossDiffSelection_FieldEffectsCount", {
          count: fieldBuffCount()
        }), _$p));
        return _el$24;
      }
    }));
    libs.insert(_el$28, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
      id: "HuntBossIntelligenceProgress",
      get value() {
        return huntIntelligenceProgress();
      },
      get children() {
        const _el$29 = libs.createElement("Label", {
          id: "HuntBossIntelligenceProgressValue",
          get text() {
            return LocalizeWithVars("#HuntBossDiffSelection_IntelligenceProgress", {
              current: huntIntelligence(),
              maximum: HUNT_INTELLIGENCE_MAX
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$29, "text", LocalizeWithVars("#HuntBossDiffSelection_IntelligenceProgress", {
          current: huntIntelligence(),
          maximum: HUNT_INTELLIGENCE_MAX
        }), _$p));
        return _el$29;
      }
    }));
    libs.insert(_el$33, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      id: "HuntBossSaveButton",
      get enabled() {
        return canEdit();
      },
      onactivate: () => setShowSaveSelector(true),
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return selectedSave();
          },
          get fallback() {
            return (() => {
              const _el$63 = libs.createElement("Label", {
                id: "HuntBossSaveButtonEmpty",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SelectSaveButton");
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$63, "text", GetLocalization("#HuntBossDiffSelection_SelectSaveButton"), _$p));
              return _el$63;
            })();
          },
          get children() {
            const _el$34 = libs.createElement("Panel", {
                id: "HuntBossSelectedSave"
              }, null),
              _el$35 = libs.createElement("Label", {
                id: "HuntBossSelectedSaveInfo",
                get text() {
                  return LocalizeWithVars("#HuntBossDiffSelection_SaveDifficulty", {
                    difficulty: selectedSave().difficulty,
                    strength: selectedSave().strength
                  });
                }
              }, _el$34),
              _el$36 = libs.createElement("Label", {
                id: "HuntBossSelectedSaveDamage",
                get text() {
                  return FormatNumber(selectedSave().damage);
                }
              }, _el$34);
            libs.insert(_el$34, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
              get heroname() {
                return selectedSave().hero;
              },
              heroimagestyle: "icon"
            }), _el$35);
            libs.effect(_p$ => {
              const _v$ = LocalizeWithVars("#HuntBossDiffSelection_SaveDifficulty", {
                  difficulty: selectedSave().difficulty,
                  strength: selectedSave().strength
                }),
                _v$2 = FormatNumber(selectedSave().damage);
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$35, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$36, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$34;
          }
        });
      }
    }));
    libs.setProp(_el$37, "width", "100%");
    libs.setProp(_el$37, "height", "fill-parent-flow(1)");
    libs.insert(_el$42, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "Start",
      get visible() {
        return libs.memo(() => !!isInitiator())() && canEdit();
      },
      get enabled() {
        return libs.memo(() => !!availableDifficulties().includes(difficulty()))() && allSavesReady();
      },
      onactivate: start,
      get children() {
        const _el$44 = libs.createElement("Label", {
          get text() {
            return GetLocalization("#HuntBossDiffSelection_Start");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$44, "text", GetLocalization("#HuntBossDiffSelection_Start"), _$p));
        return _el$44;
      }
    }), _el$45);
    libs.insert(_el$45, libs.createComponent(libs.For, {
      get each() {
        return participantPlayerIDs();
      },
      children: id => {
        const steamID = () => Game.GetPlayerInfo(id)?.player_steamid;
        const isSaveReady = () => difficultySelection()?.playerHuntSaveReady?.[id] === true;
        return (() => {
          const _el$64 = libs.createElement("Panel", {
              "class": "HuntBossPlayerSave"
            }, null),
            _el$65 = libs.createElement("Image", {
              "class": "HuntBossSaveReadyCheck",
              hittest: false
            }, _el$64);
          libs.insert(_el$64, libs.createComponent(Player.EOM_Avatar, {
            style: {
              align: "center center"
            },
            get steamid() {
              return steamID();
            },
            get accountid() {
              return libs.memo(() => steamID() !== undefined)() ? Steam_64_3(steamID()) : "-1";
            }
          }), _el$65);
          libs.effect(_p$ => {
            const _v$22 = {
                NoSave: !isSaveReady()
              },
              _v$23 = Players.GetPlayerName(id),
              _v$24 = isSaveReady();
            _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$64, "classList", _v$22, _p$._v$22));
            _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$64, "tooltip_text", _v$23, _p$._v$23));
            _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$65, "visible", _v$24, _p$._v$24));
            return _p$;
          }, {
            _v$22: undefined,
            _v$23: undefined,
            _v$24: undefined
          });
          return _el$64;
        })();
      }
    }));
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return showFieldBuffs();
      },
      get children() {
        const _el$46 = libs.createElement("Panel", {
          id: "HuntBossFieldEffectsOverlay",
          hittest: true
        }, null);
        libs.insert(_el$46, libs.createComponent(EOM_Popup.EOM_Popup, {
          id: "HuntBossFieldEffectsPopup",
          size: "normal",
          popType: "PopupType_PopOut",
          get title() {
            return GetLocalization("#HuntBossDiffSelection_FieldEffectsTitle");
          },
          classList: {
            EOM_PopupMainShow: true
          },
          onClose: () => setShowFieldBuffs(false),
          get children() {
            const _el$47 = libs.createElement("Panel", {
              id: "HuntBossFieldEffectsList",
              scroll: "y"
            }, null);
            libs.setProp(_el$47, "scroll", "y");
            libs.insert(_el$47, libs.createComponent(libs.For, {
              each: fieldBuffs,
              children: buff => (() => {
                const _el$66 = libs.createElement("Panel", {
                    "class": "HuntBossFieldEffectRow"
                  }, null),
                  _el$67 = libs.createElement("Panel", {
                    "class": "HuntBossFieldEffectInfo"
                  }, _el$66),
                  _el$68 = libs.createElement("Label", {
                    "class": "HuntBossFieldEffectName",
                    get text() {
                      return hunt_buff_icon.GetHuntEffectName(buff.id, buff.level);
                    }
                  }, _el$67),
                  _el$69 = libs.createElement("Label", {
                    "class": "HuntBossFieldEffectDescription",
                    get text() {
                      return hunt_buff_icon.GetHuntEffectDescription(buff.id, buff.level);
                    }
                  }, _el$67);
                libs.insert(_el$66, libs.createComponent(hunt_buff_icon.HuntBuffIcon, {
                  buff: buff,
                  tooltipType: "field",
                  showTips: false,
                  hittest: false
                }), _el$67);
                libs.effect(_p$ => {
                  const _v$25 = hunt_buff_icon.GetHuntEffectName(buff.id, buff.level),
                    _v$26 = hunt_buff_icon.GetHuntEffectDescription(buff.id, buff.level);
                  _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$68, "text", _v$25, _p$._v$25));
                  _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$69, "text", _v$26, _p$._v$26));
                  return _p$;
                }, {
                  _v$25: undefined,
                  _v$26: undefined
                });
                return _el$66;
              })()
            }));
            return _el$47;
          }
        }));
        return _el$46;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return showSaveSelector();
      },
      get children() {
        const _el$48 = libs.createElement("Panel", {
          id: "HuntBossSaveSelectorOverlay",
          hittest: true
        }, null);
        libs.insert(_el$48, libs.createComponent(EOM_Popup.EOM_Popup, {
          id: "HuntBossSaveSelector",
          size: "large",
          popType: "PopupType_PopOut",
          get title() {
            return GetLocalization("#HuntBossDiffSelection_SelectSave");
          },
          classList: {
            EOM_PopupMainShow: true
          },
          onClose: () => setShowSaveSelector(false),
          get children() {
            const _el$49 = libs.createElement("Panel", {
                id: "HuntBossSaveSelectorContent"
              }, null),
              _el$50 = libs.createElement("Label", {
                id: "HuntBossSaveUsage",
                get text() {
                  return LocalizeWithVars("#HuntBossDiffSelection_SaveUsage", {
                    used: huntSaveRecords().length,
                    maximum: HUNT_BOSS_SAVE_LIMIT
                  });
                }
              }, _el$49),
              _el$51 = libs.createElement("Panel", {
                id: "HuntBossSaveHeader"
              }, _el$49),
              _el$52 = libs.createElement("Label", {
                "class": "HuntBossSaveCol HuntBossSaveTime",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SaveTime");
                }
              }, _el$51),
              _el$53 = libs.createElement("Label", {
                "class": "HuntBossSaveCol HuntBossSaveHero",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SaveHero");
                }
              }, _el$51),
              _el$54 = libs.createElement("Label", {
                "class": "HuntBossSaveCol HuntBossSaveDifficulty",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SaveDifficultyTitle");
                }
              }, _el$51),
              _el$55 = libs.createElement("Label", {
                "class": "HuntBossSaveCol HuntBossSaveDamage",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SaveDamage");
                }
              }, _el$51),
              _el$56 = libs.createElement("Label", {
                "class": "HuntBossSaveCol HuntBossSaveBlessing",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SaveBlessing");
                }
              }, _el$51),
              _el$57 = libs.createElement("Label", {
                "class": "HuntBossSaveCol HuntBossSaveArtifact",
                get text() {
                  return GetLocalization("#HuntBossDiffSelection_SaveArtifact");
                }
              }, _el$51);
              libs.createElement("Panel", {
                "class": "HuntBossSaveDivider"
              }, _el$49);
              const _el$59 = libs.createElement("Panel", {
                id: "HuntBossSaveList"
              }, _el$49);
            libs.insert(_el$59, libs.createComponent(libs.For, {
              get each() {
                return huntSaveRecords();
              },
              get fallback() {
                return (() => {
                  const _el$70 = libs.createElement("Label", {
                    id: "HuntBossSaveEmptyHint",
                    get text() {
                      return GetLocalization("#HuntBossDiffSelection_SaveEmptyHint");
                    },
                    hittest: false
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$70, "text", GetLocalization("#HuntBossDiffSelection_SaveEmptyHint"), _$p));
                  return _el$70;
                })();
              },
              children: record => {
                const meetsDifficulty = () => record.difficulty >= requiredSaveDifficulty();
                const matchesHero = () => record.hero === selectedHeroName();
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  "class": "HuntBossSaveRow",
                  get enabled() {
                    return canEdit();
                  },
                  onactivate: () => selectSave(record),
                  get children() {
                    return [(() => {
                      const _el$71 = libs.createElement("Label", {
                        "class": "HuntBossSaveCol HuntBossSaveTime",
                        get text() {
                          return record.time;
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$71, "text", record.time, _$p));
                      return _el$71;
                    })(), (() => {
                      const _el$72 = libs.createElement("Panel", {
                        "class": "HuntBossSaveCol HuntBossSaveHero HuntBossSaveStatusCell"
                      }, null);
                      libs.insert(_el$72, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
                        get heroname() {
                          return record.hero;
                        },
                        heroimagestyle: "icon",
                        hittest: false
                      }), null);
                      libs.insert(_el$72, libs.createComponent(libs.Show, {
                        get when() {
                          return !matchesHero();
                        },
                        get children() {
                          const _el$73 = libs.createElement("Label", {
                            "class": "HuntBossSaveWarning",
                            get text() {
                              return GetLocalization("#HuntBossDiffSelection_SaveHeroMismatch");
                            },
                            hittest: false
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$73, "text", GetLocalization("#HuntBossDiffSelection_SaveHeroMismatch"), _$p));
                          return _el$73;
                        }
                      }), null);
                      return _el$72;
                    })(), (() => {
                      const _el$74 = libs.createElement("Panel", {
                          "class": "HuntBossSaveCol HuntBossSaveDifficulty HuntBossSaveStatusCell"
                        }, null),
                        _el$75 = libs.createElement("Label", {
                          "class": "HuntBossSaveDifficultyValue",
                          get text() {
                            return LocalizeWithVars("#HuntBossDiffSelection_SaveDifficulty", {
                              difficulty: record.difficulty,
                              strength: record.strength
                            });
                          },
                          hittest: false
                        }, _el$74);
                      libs.insert(_el$74, libs.createComponent(libs.Show, {
                        get when() {
                          return !meetsDifficulty();
                        },
                        get children() {
                          const _el$76 = libs.createElement("Label", {
                            "class": "HuntBossSaveWarning",
                            get text() {
                              return GetLocalization("#HuntBossDiffSelection_SaveDifficultyTooLow");
                            },
                            hittest: false
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$76, "text", GetLocalization("#HuntBossDiffSelection_SaveDifficultyTooLow"), _$p));
                          return _el$76;
                        }
                      }), null);
                      libs.effect(_$p => libs.setProp(_el$75, "text", LocalizeWithVars("#HuntBossDiffSelection_SaveDifficulty", {
                        difficulty: record.difficulty,
                        strength: record.strength
                      }), _$p));
                      return _el$74;
                    })(), (() => {
                      const _el$77 = libs.createElement("Label", {
                        "class": "HuntBossSaveCol HuntBossSaveDamage",
                        get text() {
                          return FormatNumber(record.damage);
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$77, "text", FormatNumber(record.damage), _$p));
                      return _el$77;
                    })(), (() => {
                      const _el$78 = libs.createElement("Panel", {
                        "class": "HuntBossSaveCol HuntBossSaveBlessing HuntBossSaveItemCell"
                      }, null);
                      libs.insert(_el$78, libs.createComponent(HuntBossSaveItems, {
                        get items() {
                          return record.blessings;
                        }
                      }));
                      return _el$78;
                    })(), (() => {
                      const _el$79 = libs.createElement("Panel", {
                        "class": "HuntBossSaveCol HuntBossSaveArtifact HuntBossSaveItemCell"
                      }, null);
                      libs.insert(_el$79, libs.createComponent(HuntBossSaveItems, {
                        get items() {
                          return record.artifacts;
                        }
                      }));
                      return _el$79;
                    })()];
                  }
                });
              }
            }));
            libs.effect(_p$ => {
              const _v$3 = LocalizeWithVars("#HuntBossDiffSelection_SaveUsage", {
                  used: huntSaveRecords().length,
                  maximum: HUNT_BOSS_SAVE_LIMIT
                }),
                _v$4 = GetLocalization("#HuntBossDiffSelection_SaveTime"),
                _v$5 = GetLocalization("#HuntBossDiffSelection_SaveHero"),
                _v$6 = GetLocalization("#HuntBossDiffSelection_SaveDifficultyTitle"),
                _v$7 = GetLocalization("#HuntBossDiffSelection_SaveDamage"),
                _v$8 = GetLocalization("#HuntBossDiffSelection_SaveBlessing"),
                _v$9 = GetLocalization("#HuntBossDiffSelection_SaveArtifact"),
                _v$0 = {
                  HuntBossSaveListEmpty: huntSaveRecords().length === 0
                };
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$50, "text", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$52, "text", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$53, "text", _v$5, _p$._v$5));
              _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$54, "text", _v$6, _p$._v$6));
              _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$55, "text", _v$7, _p$._v$7));
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$56, "text", _v$8, _p$._v$8));
              _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$57, "text", _v$9, _p$._v$9));
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$59, "classList", _v$0, _p$._v$0));
              return _p$;
            }, {
              _v$3: undefined,
              _v$4: undefined,
              _v$5: undefined,
              _v$6: undefined,
              _v$7: undefined,
              _v$8: undefined,
              _v$9: undefined,
              _v$0: undefined
            });
            return _el$49;
          }
        }));
        return _el$48;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$1 = GetLocalization("#HuntBossDiffSelection_ModeTitle"),
        _v$10 = GetLocalization("#HuntBossDiffSelection_Info"),
        _v$11 = bossPreviewImage(),
        _v$12 = GetLocalization("#HuntBossDiffSelection_ScopeTitle"),
        _v$13 = GetLocalization(`#HuntBossDiffSelection_${difficulty()}_Description`),
        _v$14 = GetLocalization("#HuntBossDiffSelection_FieldEffectsTitle"),
        _v$15 = GetLocalization("#HuntBossDiffSelection_IntelligenceTitle"),
        _v$16 = GetLocalization("#HuntBossDiffSelection_SaveTitle"),
        _v$17 = difficultySelection()?.state === "pending",
        _v$18 = LocalizeWithVars("#HuntBossDiffSelection_Difficulty", {
          difficulty: teamDifficulty()
        }),
        _v$19 = LocalizeWithVars("#DiffSelection_StartCountdown", {
          value: countdown()
        }),
        _v$20 = Number.isFinite(requiredSaveDifficulty()),
        _v$21 = {
          diff: Math.max(teamDifficulty(), difficulty()),
          value: requiredSaveDifficulty()
        };
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$4, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$5, "tooltip_text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$6, "src", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$11, "text", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$14, "text", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$21, "text", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$26, "text", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$31, "text", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$38, "visible", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$40, "text", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$41, "text", _v$19, _p$._v$19));
      _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$43, "visible", _v$20, _p$._v$20));
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$43, "vars", _v$21, _p$._v$21));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined,
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined,
      _v$18: undefined,
      _v$19: undefined,
      _v$20: undefined,
      _v$21: undefined
    });
    return _el$;
  })();
};

const DiffSelection = () => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const gameModeState = solid_utils.createNetDataSignal("common", "game_mode_state");
  const isModeStarting = libs.createMemo(() => gameModeState()?.startingModeId !== undefined);
  const selectedModeId = () => gameModeState()?.selectedModeId;
  const show = () => !isModeStarting() && gameState()?.state === "GameState_DiffSelection";
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "DiffSelection",
      get ["class"]() {
        return libs.classNames({
          Show: show()
        });
      },
      acceptsfocus: true
    }, null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_CloseButton, {
      onactivate: () => GameEvents.SendCustomEventToServer("game_mode_cancel_selection", {})
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return selectedModeId() === "common";
          },
          get children() {
            return libs.createComponent(DungeonSelection, {});
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return selectedModeId() === "abyssal";
          },
          get children() {
            return libs.createComponent(AbyssalSelection, {});
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return selectedModeId() === "hunt_boss";
          },
          get children() {
            return libs.createComponent(HuntBossSelection, {});
          }
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames({
      Show: show()
    }), _$p));
    return _el$;
  })();
};
libs.render(() => libs.createComponent(DiffSelection, {}), $.GetContextPanel());