--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('top_bar', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var GenericPanel = require('./GenericPanel.js');

const TopBar = props => {
  const merged = libs.mergeProps$1({
    type: "default"
  }, props);
  const [local, others] = libs.splitProps(merged, ["type"]);
  const [roundData, _setRoundData] = libs.createSignal(CustomNetTables.GetTableValue("common", "round_data"));
  const [gameState, setGameState] = libs.createSignal();
  const [gameStateConfig, setGameStateConfig] = libs.createSignal({});
  const [roshan_reward_selection, setRoshanRewardSelection] = libs.createSignal();
  const stateEndTime = libs.createMemo(() => {
    if (roshan_reward_selection() != undefined && roshan_reward_selection()?.end_time != -1) {
      return roshan_reward_selection().end_time;
    }
    return gameState()?.time_end ?? 0;
  });
  libs.createEffect(libs.on(stateEndTime, v => {
    if (v > 0) {
      startTimer();
    }
  }));
  const startTimer = () => {
    if (id != undefined) {
      clearInterval(id);
    }
    if (gameState()?.is_pause == 0) {
      setTime(Math.floor(stateEndTime() - Game.GetGameTime()));
    }
    id = setInterval(() => {
      if (gameState()?.is_pause == 0) {
        setTime(Round(stateEndTime() - Game.GetGameTime()));
      }
    }, 1000);
  };
  let id;
  const [time, setTime] = libs.createSignal(-1);
  libs.onMount(() => {
    let NetTableIDs = [];
    NetTableIDs.push(useNetTableKeyHasDefaultValue("common", "game_state", data => {
      setGameState(data);
    }));
    NetTableIDs.push(useNetTableKeyHasDefaultValue("common", "constant", data => {
      setGameStateConfig(data.GAME_STATE_CONFIG ?? {});
    }));
    NetTableIDs.push(useNetTableKeyHasDefaultValue("common", "roshan_reward_selection", data => {
      setRoshanRewardSelection(data);
    }));
    libs.onCleanup(() => {
      NetTableIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
      if (id != undefined) {
        clearInterval(id);
      }
    });
  });
  let refRoundTime;
  const warningCountDown = libs.createMemo(() => {
    if (roshan_reward_selection() != undefined && roshan_reward_selection()?.selecting != -1) {
      if (roshan_reward_selection().selecting == Players.GetLocalPlayer()) {
        return 3;
      }
      return -1;
    }
    const gameStateName = gameState()?.state ?? "GameState_None";
    const config = gameStateConfig();
    const countdown = config[gameStateName]?.warnCountdown;
    if (typeof countdown == "number") {
      return countdown;
    }
    return -1;
  });
  libs.createEffect(libs.on(time, _time => {
    if (warningCountDown() != -1) {
      let jump = false;
      if (_time <= warningCountDown()) {
        if (refRoundTime?.IsValid()) {
          refRoundTime?.SetHasClass("Warning", true);
        }
        jump = true;
        if (_time <= 10) {
          Game.EmitSound("announcer_ann_custom_countdown_" + (_time < 10 ? "0" + _time : _time));
        }
      } else {
        if (refRoundTime?.IsValid()) {
          refRoundTime?.SetHasClass("Warning", false);
        }
      }
      if (jump && refRoundTime?.IsValid()) {
        refRoundTime.RemoveClass("TimeCountdown");
        refRoundTime.ToggleClass("TimeCountdown");
      }
    } else {
      if (refRoundTime?.IsValid()) {
        refRoundTime?.SetHasClass("Warning", false);
      }
    }
  }));
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "round_data") {
        _setRoundData(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "HudTopBar",
    hittest: false,
    get ["class"]() {
      return "Skin" + getEquipCosmetic(OrnamentType.HUD_SKIN);
    },
    get children() {
      return libs.memo(() => local.type == "hero_selection")() ? libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "HeroSelectionTop",
        get children() {
          return [libs.createComponent(GenericPanel.CLabel, {
            id: "HeroSelectionRoundLabel",
            text: "#TopBarRoundC4",
            get dialogVariables() {
              return {
                round: roundData()?.round_number ?? -1
              };
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            id: "HeroSelectionRoundState",
            get text() {
              return $.Localize("#" + gameState()?.state);
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return time() >= 0;
            },
            get children() {
              return libs.createComponent(GenericPanel.CLabel, {
                className: "HeroSelectionRoundTime",
                ref(r$) {
                  const _ref$ = refRoundTime;
                  typeof _ref$ === "function" ? _ref$(r$) : refRoundTime = r$;
                },
                get text() {
                  return time();
                }
              });
            }
          })];
        }
      }) : [libs.createElement("Image", {
        id: "RoundBG"
      }, null), libs.createComponent(GenericPanel.CLabel, {
        id: "RoundLabel",
        text: "#TopBarRoundC4",
        get dialogVariables() {
          return {
            round: roundData()?.round_number ?? -1
          };
        }
      }), libs.createComponent(GenericPanel.CLabel, {
        id: "RoundState",
        get text() {
          return $.Localize("#" + gameState()?.state);
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return time() >= 0;
        },
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            className: "RoundTime",
            ref(r$) {
              const _ref$2 = refRoundTime;
              typeof _ref$2 === "function" ? _ref$2(r$) : refRoundTime = r$;
            },
            get text() {
              return time();
            }
          });
        }
      })];
    }
  });
};

exports.TopBar = TopBar;