--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_RadioButton = require('./EOM_RadioButton.js');
var EOM_Button = require('./EOM_Button.js');

const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
const [keyBindings, setKeyBindings] = libs.createSignal({
  ...DEFAULT_KEYBOARD_BINDINGS
});
const [gamepadBindings, setGamepadBindings] = libs.createSignal({
  ...DEFAULT_GAMEPAD_BINDINGS
});
libs.createEffect(libs.on(player_key_values, data => {
  const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
  const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
  const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
  const bindings = {
    ...defaults
  };
  const nextGamepadBindings = {
    ...DEFAULT_GAMEPAD_BINDINGS
  };
  for (const key in data) {
    const kbPrefix = `keybind_keyboard${modePrefix}_`;
    if (key.startsWith(kbPrefix)) {
      const func = key.replace(kbPrefix, "");
      bindings[func] = data[key].value;
    }
    if (key.startsWith("keybind_gamepad_")) {
      const func = key.replace("keybind_gamepad_", "");
      nextGamepadBindings[func] = data[key].value;
    }
  }
  setKeyBindings(bindings);
  setGamepadBindings(nextGamepadBindings);
}));
const ABILITY_TAG_INDEX = {
  [AbilityTag.Attack]: 3,
  [AbilityTag.Skill]: 0,
  [AbilityTag.Dodge]: 1,
  [AbilityTag.Defense]: 2,
  [AbilityTag.Ultimate]: 5,
  [AbilityTag.Interact]: 4
};
const ABILITY_TAG_KEY = {
  [AbilityTag.Attack]: KeyFunction.Attack,
  [AbilityTag.Skill]: KeyFunction.Skill,
  [AbilityTag.Dodge]: KeyFunction.Dodge,
  [AbilityTag.Defense]: KeyFunction.Defense,
  [AbilityTag.Ultimate]: KeyFunction.Ultimate,
  [AbilityTag.Interact]: KeyFunction.Interact
};
function getAbilityNameByTag(abilityTag) {
  const hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
  let abilityName = "";
  let AbilityyTagIndex = ABILITY_TAG_INDEX[abilityTag];
  if (AbilityyTagIndex != undefined) {
    let index = Entities.GetAbility(hero, AbilityyTagIndex);
    let name = Abilities.GetAbilityName(index);
    if (name) {
      abilityName = name;
    }
  }
  return abilityName;
}
function HudTutorial() {
  const tutorialStage = solid_utils.createNetDataSignal("common", "tutorial_stage", {
    stage: 0
  });
  const [settingStep, setSettingStep] = libs.createSignal(0);
  libs.createEffect(libs.on(() => tutorialStage().stage, stage => {
    if (stage != 1) {
      setSettingStep(0);
    }
  }));
  return [libs.createComponent(libs.Show, {
    get when() {
      return tutorialStage().stage == 1 || tutorialStage().stage == 2;
    },
    get children() {
      return [libs.createComponent(TutorialSetting, {
        get stage() {
          return tutorialStage().stage;
        },
        get settingStep() {
          return settingStep();
        },
        onSettingStepChange: setSettingStep
      }), libs.createComponent(EOM_Button.EOM_Button, {
        id: "SkipTutorialButton",
        color: "Confirm",
        text: "#tutorial_skip",
        onactivate: () => {
          if (tutorialStage().stage == 1) {
            GameUI.CustomUIConfig().ReportClick("newbie", settingStep() == 0 ? "tutorial|skip" : "tutorial|skip_1");
          }
          GameEvents.SendCustomEventToServer("tutorial_abandon", {});
        }
      })];
    }
  }), libs.createComponent(TutorialUpper, {})];
}
const TutorialSetting = props => {
  const [enable, setEnable] = libs.createSignal(true);
  const KEYBOARD_MOVE_FUNCTIONS = [KeyFunction.Up, KeyFunction.Down, KeyFunction.Left, KeyFunction.Right];
  function IsKeyboardMoveFunction(func) {
    return KEYBOARD_MOVE_FUNCTIONS.includes(func);
  }
  function IsKeyboardMoveFunctionDisabled(mode, func) {
    return mode !== MOVE_MODE_KEYBOARD && IsKeyboardMoveFunction(func);
  }
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const isGamepad = () => inputMode().isGamepad === 1;
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("TutorialSettingRoot", {
            Show: props.stage == 1
          });
        },
        hittest: false
      }, null);
      libs.createElement("Panel", {
        id: "Border",
        hittest: true
      }, _el$);
    libs.insert(_el$, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return props.settingStep == 0;
          },
          get children() {
            const _el$3 = libs.createElement("Panel", {
                id: "TutorialPreface"
              }, null);
              libs.createElement("Label", {
                id: "TutorialPrefaceLabel",
                text: "#tutorial_preface"
              }, _el$3);
              const _el$5 = libs.createElement("Panel", {
                align: "center bottom",
                flowChildren: "down",
                height: "100px"
              }, _el$3),
              _el$6 = libs.createElement("Panel", {
                flowChildren: "right"
              }, _el$5),
              _el$7 = libs.createElement("Label", {
                text: "#tutorial_confirm_info",
                html: true
              }, _el$5);
            libs.setProp(_el$5, "align", "center bottom");
            libs.setProp(_el$5, "flowChildren", "down");
            libs.setProp(_el$6, "flowChildren", "right");
            libs.insert(_el$6, libs.createComponent(EOM_Button.EOM_Button, {
              color: "Confirm",
              text: "#tutorial_skip",
              get enabled() {
                return enable();
              },
              onactivate: () => {
                setEnable(false);
                GameUI.CustomUIConfig().ReportClick("newbie", "tutorial|skip");
                GameEvents.SendCustomEventToServer("tutorial_dungeon_start", {
                  state: 0
                });
              }
            }), null);
            libs.insert(_el$6, libs.createComponent(EOM_Button.EOM_Button, {
              horizontalAlign: "center",
              color: "Green",
              text: "#tutorial_confirm",
              get enabled() {
                return enable();
              },
              onactivate: () => {
                GameUI.CustomUIConfig().ReportClick("newbie", "tutorial|next");
                props.onSettingStepChange(props.settingStep + 1);
              }
            }), null);
            libs.setProp(_el$7, "style", {
              marginTop: "10px",
              horizontalAlign: "center",
              fontSize: "16px",
              textDecoration: "underline",
              textAlign: "center",
              color: "rgb(163, 206, 114)"
            });
            return _el$3;
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return props.settingStep == 1;
          },
          get children() {
            return (() => {
              const [selectingIndex, setSelectingIndex] = libs.createSignal();
              const [moveMode, setMoveMode] = libs.createSignal(MOVE_MODE_KEYBOARD);
              const [mouseMode, setMouseMode] = libs.createSignal(MOVE_MODE_RIGHT_CLICK);
              libs.createEffect(libs.on(isGamepad, v => {
                if (v) {
                  setSelectingIndex(0);
                } else {
                  setSelectingIndex();
                }
              }));
              const getKeyForFunction = (func, moveMode, isGamepad) => {
                if (isGamepad) {
                  return gamepadBindings()[func] ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
                }
                if (IsKeyboardMoveFunctionDisabled(moveMode, func)) {
                  return "";
                }
                const data = player_key_values();
                const modePrefix = moveMode == MOVE_MODE_KEYBOARD ? "" : `_m${moveMode}`;
                const customValue = data?.[`keybind_keyboard${modePrefix}_${func}`]?.value;
                const defaults = MOVE_MODE_DEFAULTS[moveMode] ?? DEFAULT_KEYBOARD_BINDINGS;
                return GetLocalization(customValue ?? defaults[func] ?? DEFAULT_KEYBOARD_BINDINGS[func] ?? "");
              };
              return (() => {
                const _el$8 = libs.createElement("Panel", {
                    "class": "GradientShow",
                    align: "center center",
                    flowChildren: "down"
                  }, null),
                  _el$9 = libs.createElement("Label", {
                    horizontalAlign: "center",
                    "class": "MainHeader",
                    text: "#tutorial_move_mode"
                  }, _el$8),
                  _el$0 = libs.createElement("Panel", {
                    flowChildren: "right",
                    align: "center center"
                  }, _el$8),
                  _el$20 = libs.createElement("Panel", {
                    id: "TutorialBottomButtons"
                  }, _el$8),
                  _el$21 = libs.createElement("Panel", {
                    align: "center bottom",
                    flowChildren: "right"
                  }, _el$20);
                libs.setProp(_el$8, "align", "center center");
                libs.setProp(_el$8, "flowChildren", "down");
                libs.setProp(_el$9, "horizontalAlign", "center");
                libs.setProp(_el$0, "style", {
                  margin: "40px 0 20px 0"
                });
                libs.setProp(_el$0, "flowChildren", "right");
                libs.setProp(_el$0, "align", "center center");
                libs.insert(_el$0, libs.createComponent(libs.Show, {
                  get when() {
                    return !isGamepad();
                  },
                  get fallback() {
                    return (() => {
                      const _el$22 = libs.createElement("Panel", {
                          flowChildren: "down"
                        }, null),
                        _el$23 = libs.createElement("Label", {
                          text: "#tutorial_move_mode3",
                          horizontalAlign: "center",
                          "class": "SectionHeader"
                        }, _el$22);
                      libs.setProp(_el$22, "flowChildren", "down");
                      libs.setProp(_el$23, "horizontalAlign", "center");
                      libs.insert(_el$22, libs.createComponent(EOM_Button.EOM_BaseButton, {
                        style: {
                          margin: "20px 0"
                        },
                        onactivate: () => {
                          setMoveMode(MOVE_MODE_KEYBOARD);
                          setSelectingIndex(0);
                        },
                        get children() {
                          return [(() => {
                            const _el$24 = libs.createElement("Panel", {
                              "class": "SelectedLight"
                            }, null);
                            libs.effect(_$p => libs.setProp(_el$24, "visible", selectingIndex() == 0, _$p));
                            return _el$24;
                          })(), libs.createComponent(EOM_Popup.EOM_Popup, {
                            id: "TurtorialMoveMode",
                            popType: "PopupType_PopOut",
                            get classList() {
                              return {
                                Selected: selectingIndex() == 0,
                                EOM_PopupMainShow: true,
                                ShowPicker: false
                              };
                            },
                            hideClose: true,
                            hittest: false,
                            get children() {
                              const _el$25 = libs.createElement("Panel", {
                                  id: "SettingTabContainer"
                                }, null),
                                _el$26 = libs.createElement("Panel", {
                                  "class": "SettingTab VerticalScrollStyle"
                                }, _el$25);
                              libs.setProp(_el$26, "classList", {
                                Show: true
                              });
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Up",
                                get func() {
                                  return KeyFunction.Up;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Up, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Down",
                                get func() {
                                  return KeyFunction.Down;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Down, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Left",
                                get func() {
                                  return KeyFunction.Left;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Left, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Right",
                                get func() {
                                  return KeyFunction.Right;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Right, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Ability1",
                                get func() {
                                  return KeyFunction.Skill;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Skill, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Ability2",
                                get func() {
                                  return KeyFunction.Dodge;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Dodge, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Ability3",
                                get func() {
                                  return KeyFunction.Defense;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Defense, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Ability4",
                                get func() {
                                  return KeyFunction.Ultimate;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Ultimate, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Attack",
                                get func() {
                                  return KeyFunction.Attack;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Attack, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_Interact",
                                get func() {
                                  return KeyFunction.Interact;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Interact, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_OptionUp",
                                get func() {
                                  return KeyFunction.OptionUp;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.OptionUp, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_OptionDown",
                                get func() {
                                  return KeyFunction.OptionDown;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.OptionDown, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              libs.insert(_el$26, libs.createComponent(GamepadKeyBinder, {
                                text: "#Hotkey_OptionConfirm",
                                get func() {
                                  return KeyFunction.OptionConfirm;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.OptionConfirm, MOVE_MODE_KEYBOARD, true);
                                }
                              }), null);
                              return _el$25;
                            }
                          })];
                        }
                      }), null);
                      libs.effect(_$p => libs.setProp(_el$23, "classList", {
                        UnderLine: selectingIndex() == 0
                      }, _$p));
                      return _el$22;
                    })();
                  },
                  get children() {
                    return [(() => {
                      const _el$1 = libs.createElement("Panel", {
                          flowChildren: "down"
                        }, null),
                        _el$10 = libs.createElement("Label", {
                          text: "#tutorial_move_mode1",
                          horizontalAlign: "center",
                          "class": "SectionHeader"
                        }, _el$1);
                      libs.setProp(_el$1, "flowChildren", "down");
                      libs.setProp(_el$10, "horizontalAlign", "center");
                      libs.insert(_el$1, libs.createComponent(EOM_Button.EOM_BaseButton, {
                        style: {
                          margin: "20px 0"
                        },
                        onactivate: () => {
                          setMoveMode(MOVE_MODE_KEYBOARD);
                          setSelectingIndex(0);
                        },
                        get children() {
                          return [(() => {
                            const _el$11 = libs.createElement("Panel", {
                              "class": "SelectedLight"
                            }, null);
                            libs.effect(_$p => libs.setProp(_el$11, "visible", selectingIndex() == 0, _$p));
                            return _el$11;
                          })(), libs.createComponent(EOM_Popup.EOM_Popup, {
                            id: "TurtorialMoveMode",
                            popType: "PopupType_PopOut",
                            get classList() {
                              return {
                                Selected: selectingIndex() == 0,
                                EOM_PopupMainShow: true,
                                ShowPicker: false
                              };
                            },
                            hideClose: true,
                            hittest: false,
                            get children() {
                              const _el$12 = libs.createElement("Panel", {
                                  id: "SettingTabContainer"
                                }, null),
                                _el$13 = libs.createElement("Panel", {
                                  "class": "SettingTab VerticalScrollStyle"
                                }, _el$12);
                              libs.setProp(_el$13, "classList", {
                                Show: true
                              });
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Up",
                                get func() {
                                  return KeyFunction.Up;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Up, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Down",
                                get func() {
                                  return KeyFunction.Down;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Down, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Left",
                                get func() {
                                  return KeyFunction.Left;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Left, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Right",
                                get func() {
                                  return KeyFunction.Right;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Right, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Ability1",
                                get func() {
                                  return KeyFunction.Skill;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Skill, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Ability2",
                                get func() {
                                  return KeyFunction.Dodge;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Dodge, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Ability3",
                                get func() {
                                  return KeyFunction.Defense;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Defense, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Ability4",
                                get func() {
                                  return KeyFunction.Ultimate;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Ultimate, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Attack",
                                get func() {
                                  return KeyFunction.Attack;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Attack, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              libs.insert(_el$13, libs.createComponent(KeyBinder, {
                                text: "#Hotkey_Interact",
                                get func() {
                                  return KeyFunction.Interact;
                                },
                                get hotkey() {
                                  return getKeyForFunction(KeyFunction.Interact, MOVE_MODE_KEYBOARD, false);
                                }
                              }), null);
                              return _el$12;
                            }
                          })];
                        }
                      }), null);
                      libs.effect(_$p => libs.setProp(_el$10, "classList", {
                        UnderLine: selectingIndex() == 0
                      }, _$p));
                      return _el$1;
                    })(), (() => {
                      const _el$14 = libs.createElement("Panel", {
                          flowChildren: "down"
                        }, null),
                        _el$15 = libs.createElement("Label", {
                          text: "#tutorial_move_mode2",
                          horizontalAlign: "center",
                          "class": "SectionHeader"
                        }, _el$14);
                      libs.setProp(_el$14, "flowChildren", "down");
                      libs.setProp(_el$15, "horizontalAlign", "center");
                      libs.insert(_el$14, libs.createComponent(EOM_Button.EOM_BaseButton, {
                        style: {
                          margin: "20px 0"
                        },
                        onactivate: () => {
                          setMoveMode(mouseMode());
                          setSelectingIndex(1);
                        },
                        get children() {
                          return [(() => {
                            const _el$16 = libs.createElement("Panel", {
                              "class": "SelectedLight"
                            }, null);
                            libs.effect(_$p => libs.setProp(_el$16, "visible", selectingIndex() == 1, _$p));
                            return _el$16;
                          })(), libs.createComponent(EOM_Popup.EOM_Popup, {
                            id: "TurtorialMoveMode",
                            popType: "PopupType_PopOut",
                            get classList() {
                              return {
                                Selected: selectingIndex() == 1,
                                EOM_PopupMainShow: true,
                                ShowPicker: false
                              };
                            },
                            hideClose: true,
                            hittest: false,
                            get children() {
                              return [libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
                                group: "setting_move_mode",
                                text: "#Setting_MoveMode_3",
                                get checked() {
                                  return mouseMode() === MOVE_MODE_RIGHT_CLICK;
                                },
                                onactivate: () => {
                                  setMoveMode(MOVE_MODE_RIGHT_CLICK);
                                  setMouseMode(MOVE_MODE_RIGHT_CLICK);
                                }
                              }), libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
                                group: "setting_move_mode",
                                text: "#Setting_MoveMode_2",
                                get checked() {
                                  return mouseMode() === MOVE_MODE_LEFT_CLICK;
                                },
                                onactivate: () => {
                                  setMoveMode(MOVE_MODE_LEFT_CLICK);
                                  setMouseMode(MOVE_MODE_LEFT_CLICK);
                                }
                              }), libs.createElement("Panel", {
                                "class": "Separator"
                              }, null), (() => {
                                const _el$18 = libs.createElement("Panel", {
                                    id: "SettingTabContainer"
                                  }, null),
                                  _el$19 = libs.createElement("Panel", {
                                    "class": "SettingTab VerticalScrollStyle"
                                  }, _el$18);
                                libs.setProp(_el$19, "classList", {
                                  Show: true
                                });
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Up",
                                  get func() {
                                    return KeyFunction.Up;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Up, mouseMode(), false);
                                  },
                                  get enabled() {
                                    return !IsKeyboardMoveFunctionDisabled(mouseMode(), KeyFunction.Up);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Down",
                                  get func() {
                                    return KeyFunction.Down;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Down, mouseMode(), false);
                                  },
                                  get enabled() {
                                    return !IsKeyboardMoveFunctionDisabled(mouseMode(), KeyFunction.Down);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Left",
                                  get func() {
                                    return KeyFunction.Left;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Left, mouseMode(), false);
                                  },
                                  get enabled() {
                                    return !IsKeyboardMoveFunctionDisabled(mouseMode(), KeyFunction.Left);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Right",
                                  get func() {
                                    return KeyFunction.Right;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Right, mouseMode(), false);
                                  },
                                  get enabled() {
                                    return !IsKeyboardMoveFunctionDisabled(mouseMode(), KeyFunction.Right);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Ability1",
                                  get func() {
                                    return KeyFunction.Skill;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Skill, mouseMode(), false);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Ability2",
                                  get func() {
                                    return KeyFunction.Dodge;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Dodge, mouseMode(), false);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Ability3",
                                  get func() {
                                    return KeyFunction.Defense;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Defense, mouseMode(), false);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Ability4",
                                  get func() {
                                    return KeyFunction.Ultimate;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Ultimate, mouseMode(), false);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Attack",
                                  get func() {
                                    return KeyFunction.Attack;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Attack, mouseMode(), false);
                                  }
                                }), null);
                                libs.insert(_el$19, libs.createComponent(KeyBinder, {
                                  text: "#Hotkey_Interact",
                                  get func() {
                                    return KeyFunction.Interact;
                                  },
                                  get hotkey() {
                                    return getKeyForFunction(KeyFunction.Interact, mouseMode(), false);
                                  }
                                }), null);
                                return _el$18;
                              })()];
                            }
                          })];
                        }
                      }), null);
                      libs.effect(_$p => libs.setProp(_el$15, "classList", {
                        UnderLine: selectingIndex() == 1
                      }, _$p));
                      return _el$14;
                    })()];
                  }
                }));
                libs.setProp(_el$21, "align", "center bottom");
                libs.setProp(_el$21, "flowChildren", "right");
                libs.insert(_el$21, libs.createComponent(EOM_Button.EOM_Button, {
                  get enabled() {
                    return selectingIndex() != undefined;
                  },
                  color: "Green",
                  text: "#Popup_Button_Confirm",
                  onactivate: self => {
                    GameUI.CustomUIConfig().ReportClick("newbie", moveMode() == MOVE_MODE_KEYBOARD ? "tutorial|move_keyboard" : "tutorial|move_mouse");
                    GameUI.CustomUIConfig().ReportClick("newbie", "tutorial|next_1");
                    let p = self.GetParent();
                    let count = p?.GetChildCount() ?? 0;
                    if (count > 0) {
                      for (let index = 0; index < count; index++) {
                        const element = p?.GetChild(index);
                        if (element) {
                          element.enabled = false;
                        }
                      }
                    }
                    $.Schedule(1, () => {
                      if (self?.IsValid()) {
                        let p = self.GetParent();
                        let count = p?.GetChildCount() ?? 0;
                        if (count > 0) {
                          for (let index = 0; index < count; index++) {
                            const element = p?.GetChild(index);
                            if (element) {
                              element.enabled = true;
                            }
                          }
                        }
                      }
                    });
                    CallAction("/v1/key/save", {
                      type: "setting",
                      key: "move_mode",
                      value: moveMode()
                    });
                    if (moveMode() != MOVE_MODE_KEYBOARD) {
                      CustomUIConfig.Camera.SetCameraFollowMode("free");
                      CallAction("/v1/key/save", {
                        type: "setting",
                        key: "Setting_CameraFollowMode",
                        value: "free"
                      });
                    } else {
                      CustomUIConfig.Camera.SetCameraFollowMode("classic");
                      CallAction("/v1/key/save", {
                        type: "setting",
                        key: "Setting_CameraFollowMode",
                        value: "classic"
                      });
                    }
                    GameEvents.SendCustomEventToServer("tutorial_dungeon_start", {
                      state: 1
                    });
                  }
                }));
                return _el$8;
              })();
            })();
          }
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("TutorialSettingRoot", {
      Show: props.stage == 1
    }), _$p));
    return _el$;
  })();
};
const KeyBinder = props => {
  const enabled = () => props.enabled ?? true;
  return (() => {
    const _el$27 = libs.createElement("Panel", {
        "class": "KeyBinderRow"
      }, null),
      _el$28 = libs.createElement("Label", {
        "class": "KeyBinderText",
        get text() {
          return props.text;
        }
      }, _el$27),
      _el$29 = libs.createElement("Panel", {
        "class": "KeyBinderInput"
      }, _el$27),
      _el$30 = libs.createElement("Label", {
        "class": "KeyBinderHotKey",
        get text() {
          return props.hotkey;
        }
      }, _el$29);
    libs.effect(_p$ => {
      const _v$ = {
          Disable: !enabled()
        },
        _v$2 = props.text,
        _v$3 = enabled(),
        _v$4 = props.hotkey;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$27, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$28, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$29, "enabled", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$30, "text", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$27;
  })();
};
const GamepadKeyBinder = props => {
  const enabled = () => props.enabled ?? true;
  return (() => {
    const _el$31 = libs.createElement("Panel", {
        "class": "KeyBinderRow"
      }, null),
      _el$32 = libs.createElement("Label", {
        "class": "KeyBinderText",
        get text() {
          return props.text;
        }
      }, _el$31),
      _el$33 = libs.createElement("Panel", {
        "class": "GamepadInput"
      }, _el$31);
    libs.insert(_el$33, libs.createComponent(EOM_GamePad.EOM_GamePad, {
      get keyName() {
        return props.hotkey;
      }
    }));
    libs.effect(_p$ => {
      const _v$5 = {
          Disable: !enabled()
        },
        _v$6 = props.text;
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$31, "classList", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$32, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$31;
  })();
};
const TutorialUpper = () => {
  const [upperInfo, setUpperInfo] = libs.createSignal(null);
  const [visible, setVisible] = libs.createSignal(false);
  const upperType = () => upperInfo()?.type ?? "TEXT";
  const upperText = () => upperInfo()?.text ?? "";
  const upperAbility = () => upperInfo()?.ability ?? AbilityTag.Attack;
  let hideTimer;
  function showHint(data) {
    setUpperInfo(data);
    setVisible(true);
    if (hideTimer !== undefined) {
      clearInterval(hideTimer);
      hideTimer = undefined;
    }
    if (data.endTime > 0) {
      hideTimer = setInterval(() => {
        let time = data.endTime - Game.GetGameTime();
        if (time <= 0) {
          hideHint();
          return;
        }
      }, 30);
    }
  }
  function hideHint(notNoticeServer) {
    if (hideTimer !== undefined) {
      clearInterval(hideTimer);
      hideTimer = undefined;
    }
    if (upperInfo()?.unique != undefined && !notNoticeServer) {
      GameEvents.SendCustomEventToServer("tutorial_upper_close", {
        unique: upperInfo().unique
      });
    }
    setVisible(false);
    let lastUnique = upperInfo()?.unique;
    if (lastUnique != undefined) {
      $.Schedule(0.2, () => {
        if (upperInfo()?.unique == lastUnique) {
          setUpperInfo(null);
        }
      });
    }
  }
  libs.onMount(() => {
    libs.createEffect(() => {
      const id = GameEvents.Subscribe("tutorial_upper_tip", data => {
        showHint(data);
      });
      libs.onCleanup(() => {
        GameEvents.Unsubscribe(id);
      });
    });
    libs.createEffect(() => {
      const id = GameEvents.Subscribe("tutorial_upper_close", event => {
        if (event.unique === upperInfo()?.unique) {
          hideHint(true);
        }
      });
      libs.onCleanup(() => {
        GameEvents.Unsubscribe(id);
      });
    });
  });
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const isGamepad = () => inputMode().isGamepad === 1;
  const getHotKey = key => {
    if (isGamepad()) {
      return gamepadBindings()[key] ?? DEFAULT_GAMEPAD_BINDINGS[key] ?? "";
    }
    const data = player_key_values();
    const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
    const isMoveKey = key === KeyFunction.Up || key === KeyFunction.Down || key === KeyFunction.Left || key === KeyFunction.Right;
    if (mode !== MOVE_MODE_KEYBOARD && isMoveKey) {
      return "";
    }
    const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
    const customValue = data?.[`keybind_keyboard${modePrefix}_${key}`]?.value;
    const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
    return GetLocalization(customValue ?? defaults[key] ?? DEFAULT_KEYBOARD_BINDINGS[key] ?? "");
  };
  return (() => {
    const _el$34 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("TutorialUpperRoot", {
            Show: visible()
          });
        }
      }, null);
      libs.createElement("Image", {
        id: "TutorialBackground"
      }, _el$34);
      const _el$36 = libs.createElement("Panel", {
        id: "TutorialUpperMain"
      }, _el$34);
    libs.insert(_el$36, libs.createComponent(libs.Show, {
      get when() {
        return upperInfo() != null;
      },
      get children() {
        return [(() => {
          const _el$37 = libs.createElement("Panel", {
            id: "TopContent"
          }, null);
          libs.insert(_el$37, libs.createComponent(libs.Dynamic, {
            get component() {
              return {
                "ABILITY": () => {
                  const abilityName = libs.createMemo(() => {
                    let name = getAbilityNameByTag(upperAbility());
                    return name;
                  });
                  const hotkey = libs.createMemo(() => {
                    return getHotKey(ABILITY_TAG_KEY[upperAbility()] ?? KeyFunction.Attack);
                  });
                  const abilityData = libs.createMemo(() => {
                    const config = GameUI.CustomUIConfig()?.hero_abilities;
                    return config?.[abilityName()];
                  });
                  const abilityValues = libs.createMemo(() => {
                    const data = abilityData();
                    const baseValues = data?.AbilityValues || {};
                    return baseValues;
                  });
                  const abilityDescription = libs.createMemo(() => {
                    return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${abilityName()}_description`), abilityValues());
                  });
                  const abilityDisplayName = libs.createMemo(() => {
                    return GetLocalization("#DOTA_Tooltip_ability_" + abilityName());
                  });
                  const abilityTag = libs.createMemo(() => {
                    return "#feature_" + abilityData()?.AbilityTag;
                  });
                  return (() => {
                    const _el$40 = libs.createElement("Panel", {
                        "class": "TutorialAbilityHint",
                        hittest: false
                      }, null),
                      _el$41 = libs.createElement("Panel", {
                        "class": "TutorialAbilityRow"
                      }, _el$40),
                      _el$42 = libs.createElement("Panel", {
                        flowChildren: "down"
                      }, _el$41),
                      _el$43 = libs.createElement("Panel", {
                        "class": "AbilityImageContainer"
                      }, _el$42),
                      _el$44 = libs.createElement("DOTAAbilityImage", {
                        get abilityname() {
                          return abilityName();
                        }
                      }, _el$43),
                      _el$45 = libs.createElement("Panel", {
                        flowChildren: "down"
                      }, _el$41),
                      _el$46 = libs.createElement("Label", {
                        "class": "HeroAbility__Name",
                        get text() {
                          return abilityDisplayName();
                        }
                      }, _el$45),
                      _el$47 = libs.createElement("Label", {
                        "class": "HeroAbility__Tag",
                        get text() {
                          return abilityTag();
                        }
                      }, _el$45),
                      _el$48 = libs.createElement("Label", {
                        id: "HeroAbility__Description",
                        get text() {
                          return abilityDescription();
                        }
                      }, _el$40);
                    libs.setProp(_el$42, "flowChildren", "down");
                    libs.insert(_el$42, libs.createComponent(libs.Show, {
                      get when() {
                        return isGamepad();
                      },
                      get fallback() {
                        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                          horizontalAlign: "center",
                          get hotkey() {
                            return hotkey();
                          }
                        });
                      },
                      get children() {
                        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
                          horizontalAlign: "center",
                          get keyName() {
                            return hotkey();
                          }
                        });
                      }
                    }), null);
                    libs.setProp(_el$45, "flowChildren", "down");
                    libs.effect(_p$ => {
                      const _v$7 = abilityName(),
                        _v$8 = {
                          name: "hero_ability",
                          abilityName: abilityName(),
                          entIndex: -1
                        },
                        _v$9 = abilityDisplayName(),
                        _v$0 = abilityTag(),
                        _v$1 = abilityDescription();
                      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$44, "abilityname", _v$7, _p$._v$7));
                      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$44, "customTooltip", _v$8, _p$._v$8));
                      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$46, "text", _v$9, _p$._v$9));
                      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$47, "text", _v$0, _p$._v$0));
                      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$48, "text", _v$1, _p$._v$1));
                      return _p$;
                    }, {
                      _v$7: undefined,
                      _v$8: undefined,
                      _v$9: undefined,
                      _v$0: undefined,
                      _v$1: undefined
                    });
                    return _el$40;
                  })();
                },
                "MOVEMENT": () => {
                  const moveMode = libs.createMemo(() => {
                    return player_key_values()?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
                  });
                  const isMouseMode = () => !isGamepad() && moveMode() !== MOVE_MODE_KEYBOARD;
                  const moveMouseKey = libs.createMemo(() => {
                    return moveMode() === MOVE_MODE_LEFT_CLICK ? "MOUSE0" : "MOUSE1";
                  });
                  const movekeys = libs.createMemo(() => {
                    const keyFunctions = ["", KeyFunction.Up, "", KeyFunction.Left, KeyFunction.Down, KeyFunction.Right];
                    let keys = [];
                    for (let i = 0; i < keyFunctions.length; i++) {
                      if (keyFunctions[i] != "") {
                        let keybind = getHotKey(keyFunctions[i]);
                        keys.push(keybind);
                      } else {
                        keys.push(undefined);
                      }
                    }
                    return keys;
                  });
                  return (() => {
                    const _el$49 = libs.createElement("Panel", {
                      "class": "MoveKeyList"
                    }, null);
                    libs.insert(_el$49, libs.createComponent(libs.Show, {
                      get when() {
                        return !isGamepad();
                      },
                      get fallback() {
                        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
                          horizontalAlign: "center",
                          get keyName() {
                            return getHotKey(KeyFunction.Up);
                          }
                        });
                      },
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return !isMouseMode();
                          },
                          get fallback() {
                            return (() => {
                              const _el$50 = libs.createElement("Panel", {
                                "class": "KeyContainer"
                              }, null);
                              libs.insert(_el$50, libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                                get hotkey() {
                                  return moveMouseKey();
                                }
                              }));
                              return _el$50;
                            })();
                          },
                          get children() {
                            return libs.createComponent(libs.For, {
                              get each() {
                                return movekeys();
                              },
                              children: key => {
                                return (() => {
                                  const _el$51 = libs.createElement("Panel", {
                                    "class": "KeyContainer"
                                  }, null);
                                  libs.insert(_el$51, libs.createComponent(libs.Show, {
                                    when: key,
                                    get children() {
                                      return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                                        hotkey: key
                                      });
                                    }
                                  }));
                                  return _el$51;
                                })();
                              }
                            });
                          }
                        });
                      }
                    }));
                    return _el$49;
                  })();
                },
                "TEXT": () => [],
                "INTERACT": () => {
                  const hotkey = libs.createMemo(() => {
                    return getHotKey(KeyFunction.Interact);
                  });
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return isGamepad();
                    },
                    get fallback() {
                      return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                        horizontalAlign: "center",
                        get hotkey() {
                          return hotkey();
                        }
                      });
                    },
                    get children() {
                      return libs.createComponent(EOM_GamePad.EOM_GamePad, {
                        horizontalAlign: "center",
                        get keyName() {
                          return hotkey();
                        }
                      });
                    }
                  });
                }
              }[upperType()];
            }
          }));
          return _el$37;
        })(), (() => {
          const _el$38 = libs.createElement("Panel", {
              id: "TextContent"
            }, null),
            _el$39 = libs.createElement("Label", {
              id: "TutorialTextLabel",
              get text() {
                return "#" + upperText();
              }
            }, _el$38);
          libs.effect(_$p => libs.setProp(_el$39, "text", "#" + upperText(), _$p));
          return _el$38;
        })()];
      }
    }));
    libs.effect(_$p => libs.setProp(_el$34, "class", libs.classNames("TutorialUpperRoot", {
      Show: visible()
    }), _$p));
    return _el$34;
  })();
};
libs.render(() => libs.createComponent(HudTutorial, {}), $.GetContextPanel());