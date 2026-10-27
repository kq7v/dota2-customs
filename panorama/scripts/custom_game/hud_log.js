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
var EOM_Popup = require('./EOM_Popup.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var Player = require('./Player.js');
require('./EOMDesign.js');
require('./EOM_Image.js');
require('./EOM_Label.js');

const getTime = time => {
  const min = String(Math.floor(time / 60)).padStart(2, "0");
  const sec = (time % 60).toFixed(2).padStart(5, "0");
  return min + ":" + sec;
};
const getText = logInfo => {
  if (logInfo.type == "damage") {
    if (logInfo?.is_crit) {
      return logInfo.ability?.indexOf("Attack_") == -1 ? "#CombatLog_DamageAbilityCrit" : "#CombatLog_DamageCrit";
    } else {
      return logInfo.ability?.indexOf("Attack_") == -1 ? "#CombatLog_DamageAbility" : "#CombatLog_Damage";
    }
  } else if (logInfo.type == "heal") {
    return "#CombatLog_Heal";
  } else if (logInfo.type == "buff") {
    return "#CombatLog_Buff";
  } else if (logInfo.type == "AbilityCast") {
    return "#CombatLog_AbilityCast";
  } else if (logInfo.type == "State") {
    return "#CombatLog_State";
  } else if (logInfo.type == "StateLoss") {
    return "#CombatLog_StateLoss";
  } else if (logInfo.type == "Evasion") {
    return "#CombatLog_Evasion";
  }
  return "";
};
const getAbilityName = name => {
  if (name == undefined) {
    return "";
  }
  const data = name.split("_");
  const prefix = data.shift();
  const abilityName = data.join("_");
  let tooltip = "#DOTA_Tooltip_ability_" + abilityName;
  if (prefix == "AbilityUpgrade") {
    tooltip = "#DOTA_Tooltip_ability_mechanics_" + abilityName;
  } else if (prefix == "Ability" && (GameUI.CustomUIConfig().AbilitiesKv[abilityName]?.CustomAbilityType ?? "") == "ABILITY_TYPE_TALENT") {
    tooltip = tooltip + "_Lore";
  }
  return tooltip;
};
const getUnitLabelColor = ({
  unit_name,
  info_playerID,
  viewing_playerID,
  type,
  self_cast
}) => {
  if (info_playerID == -1) {
    return `<font color='#818181'>${unit_name}</font>`;
  }
  if (type == "attacker" || type == "victim" && self_cast) {
    return info_playerID == viewing_playerID ? `<font color='#8ab5ee'>${unit_name}</font>` : `<font color='#ec8e8b'>${unit_name}</font>`;
  } else {
    return info_playerID == viewing_playerID ? `<font color='#ec8e8b'>${unit_name}</font>` : `<font color='#8ab5ee'>${unit_name}</font>`;
  }
};
function CombatLog() {
  const [show, setShow] = libs.createSignal(false);
  const playerData = getAllPlayerData();
  let dropDown;
  libs.onMount(() => {
    const event = useToggleWindow("MenuButton_combatlog", show, setShow);
    const id = CustomNetTables.SubscribeNetTableListener("player_data", (tableName, key, value) => {
      let playerID = Number(key);
      if (Players.IsValidPlayerID(playerID)) {
        playerData[playerID] = value;
        updatePlayerList(playerID);
      }
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(event);
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  const updatePlayerList = playerID => {
    if (dropDown != undefined) {
      if (playerID != undefined) ; else {
        dropDown.Children().forEach((child, index) => {
          if (child.BHasClass("EOM_DropDownChild")) ;
        });
      }
    }
  };
  libs.createSignal([]);
  const [loading, setLoading] = libs.createSignal(false);
  const [showSelf, setShowSelf] = libs.createSignal(true);
  const [showEnemy, setShowEnemy] = libs.createSignal(true);
  const [showDamage, setShowDamage] = libs.createSignal(true);
  const [showAbility, setShowAbility] = libs.createSignal(true);
  const [showHeal, setShowHeal] = libs.createSignal(true);
  const [showBuff, setShowBuff] = libs.createSignal(true);
  const [round, setRound] = libs.createSignal("1");
  const [playerID, setPlayerID] = libs.createSignal(0);
  const [viewingPlayerID, setViewingPlayerID] = libs.createSignal(0);
  const requestLog = (playerID, round) => {
    if (showSelf() || showEnemy()) {
      setLoading(true);
      setCombatLog([]);
      GameEvents.SendCustomEventToServer("request_combat_log", {
        round: round,
        requestPlayerID: playerID,
        showSelf: showSelf(),
        showEnemy: showEnemy(),
        showAbilityDamage: showAbility(),
        showAttackDamage: showDamage(),
        showBuff: showBuff(),
        showHeal: showHeal()
      });
    } else {
      ErrorMessage("#InvalidRequest");
    }
  };
  const [combatLog, setCombatLog] = libs.createSignal([]);
  libs.createEffect(() => {
    const id = GameEvents.Subscribe("combat_log_stream", data => {
      setLoading(false);
      setCombatLog(JSON.parse(data.data));
      setViewingPlayerID(data.player_id);
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
  });
  return libs.createComponent(EOM_Popup.EOM_Popup, {
    type: "Tui10",
    id: "Combatlog",
    title: "#Combatlog",
    get className() {
      return libs.classNames({
        EOM_PopupMainShow: show()
      });
    },
    verticalAlign: "top",
    marginTop: "120px",
    onClose: () => setShow(false),
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "EOM_PopupContent",
        flowChildren: "down",
        width: "100%",
        height: "100%",
        margin: "20px",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CombatLogContainer",
            flowChildren: "down",
            scroll: "y",
            padding: "2px",
            get children() {
              return [libs.createComponent(libs.Show, {
                get when() {
                  return loading();
                },
                get children() {
                  return libs.createComponent(EOM_Icon.EOM_Icon, {
                    type: "Spinner",
                    horizontalAlign: "center",
                    width: "34px",
                    height: "34px",
                    spin: true,
                    marginTop: "200px"
                  });
                }
              }), libs.createComponent(libs.Index, {
                get each() {
                  return combatLog();
                },
                children: (logInfo, index) => {
                  return (() => {
                    const _el$15 = libs.createElement("Label", {
                      html: true,
                      get text() {
                        return getText(logInfo());
                      },
                      get vars() {
                        return {
                          time: getTime(logInfo().time),
                          attacker: getUnitLabelColor({
                            unit_name: $.Localize("#" + logInfo().caster),
                            info_playerID: logInfo().playerID,
                            viewing_playerID: viewingPlayerID(),
                            type: "attacker",
                            self_cast: (logInfo()?.self_cast ?? 0) != 0
                          }),
                          victim: getUnitLabelColor({
                            unit_name: $.Localize("#" + logInfo().target),
                            info_playerID: logInfo().playerID,
                            viewing_playerID: viewingPlayerID(),
                            type: "victim",
                            self_cast: (logInfo()?.self_cast ?? 0) != 0
                          }),
                          damage: `<font color='${getDamageTypeColor(logInfo().damageType)}'>${logInfo().damage}</font>`,
                          damage_type: `<font color='${getDamageTypeColor(logInfo().damageType)}'>${$.Localize("#DamageType_" + logInfo().damageType)}</font>`,
                          abilityname: $.Localize(getAbilityName(logInfo().ability)),
                          heal: logInfo().heal ?? 0,
                          health: logInfo().health ?? 0,
                          next_health: logInfo().next_health != undefined ? logInfo().next_health : Math.max(0, (logInfo().health ?? 0) - (logInfo().damage ?? 0)),
                          count: logInfo().count ?? "",
                          buffname: $.Localize("#Sect_Effect_" + logInfo().buffname),
                          statename: $.Localize("#Buff_" + (logInfo()?.state_name ?? ""))
                        };
                      }
                    }, null);
                    libs.effect(_p$ => {
                      const _v$ = libs.classNames("LogLabel", "Type_" + logInfo().type, {
                          Show: true
                        }),
                        _v$2 = getText(logInfo()),
                        _v$3 = {
                          time: getTime(logInfo().time),
                          attacker: getUnitLabelColor({
                            unit_name: $.Localize("#" + logInfo().caster),
                            info_playerID: logInfo().playerID,
                            viewing_playerID: viewingPlayerID(),
                            type: "attacker",
                            self_cast: (logInfo()?.self_cast ?? 0) != 0
                          }),
                          victim: getUnitLabelColor({
                            unit_name: $.Localize("#" + logInfo().target),
                            info_playerID: logInfo().playerID,
                            viewing_playerID: viewingPlayerID(),
                            type: "victim",
                            self_cast: (logInfo()?.self_cast ?? 0) != 0
                          }),
                          damage: `<font color='${getDamageTypeColor(logInfo().damageType)}'>${logInfo().damage}</font>`,
                          damage_type: `<font color='${getDamageTypeColor(logInfo().damageType)}'>${$.Localize("#DamageType_" + logInfo().damageType)}</font>`,
                          abilityname: $.Localize(getAbilityName(logInfo().ability)),
                          heal: logInfo().heal ?? 0,
                          health: logInfo().health ?? 0,
                          next_health: logInfo().next_health != undefined ? logInfo().next_health : Math.max(0, (logInfo().health ?? 0) - (logInfo().damage ?? 0)),
                          count: logInfo().count ?? "",
                          buffname: $.Localize("#Sect_Effect_" + logInfo().buffname),
                          statename: $.Localize("#Buff_" + (logInfo()?.state_name ?? ""))
                        };
                      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$15, "className", _v$, _p$._v$));
                      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$15, "text", _v$2, _p$._v$2));
                      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "vars", _v$3, _p$._v$3));
                      return _p$;
                    }, {
                      _v$: undefined,
                      _v$2: undefined,
                      _v$3: undefined
                    });
                    return _el$15;
                  })();
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CombatLogOptions",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "down",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "OptionRow",
                    flowChildren: "right",
                    get children() {
                      return [(() => {
                        const _el$ = libs.createElement("Label", {
                          text: "#CombatLog_Round"
                        }, null);
                        libs.setProp(_el$, "className", "OptionName");
                        return _el$;
                      })(), libs.createComponent(Player.EOM_TextEntry, {
                        get text() {
                          return round();
                        },
                        onChange: (self, previousText, changedText) => {
                          setRound(changedText);
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "OptionRow",
                    flowChildren: "right",
                    get children() {
                      return [(() => {
                        const _el$2 = libs.createElement("Label", {
                          text: "#CombatLog_Player"
                        }, null);
                        libs.setProp(_el$2, "className", "OptionName");
                        return _el$2;
                      })(), libs.createComponent(EOM_DropDown.EOM_DropDown, {
                        id: "CombatLog",
                        get index() {
                          return playerID();
                        },
                        ref(r$) {
                          const _ref$ = dropDown;
                          typeof _ref$ === "function" ? _ref$(r$) : dropDown = r$;
                        },
                        onChange: index => {
                          setPlayerID(index);
                        },
                        get children() {
                          return libs.createComponent(libs.Index, {
                            get each() {
                              return getAllPlayerData();
                            },
                            children: (playerData, i) => {
                              return libs.createComponent(Player.PlayerName, {
                                get steamID() {
                                  return playerData().steamID;
                                },
                                playerID: i
                              });
                            }
                          });
                        }
                      })];
                    }
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                marginLeft: "20px",
                flowChildren: "down",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "OptionRow",
                    get children() {
                      return [(() => {
                        const _el$3 = libs.createElement("Label", {
                          text: "#Combatlog_Option_Self"
                        }, null);
                        libs.setProp(_el$3, "className", "OptionName");
                        return _el$3;
                      })(), (() => {
                        const _el$4 = libs.createElement("ToggleButton", {
                          get selected() {
                            return showSelf();
                          }
                        }, null);
                        libs.setProp(_el$4, "onactivate", self => {
                          setShowSelf(self.IsSelected());
                        });
                        libs.effect(_$p => libs.setProp(_el$4, "selected", showSelf(), _$p));
                        return _el$4;
                      })()];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "OptionRow",
                    get children() {
                      return [(() => {
                        const _el$5 = libs.createElement("Label", {
                          text: "#Combatlog_Option_Enemy"
                        }, null);
                        libs.setProp(_el$5, "className", "OptionName");
                        return _el$5;
                      })(), (() => {
                        const _el$6 = libs.createElement("ToggleButton", {
                          get selected() {
                            return showEnemy();
                          }
                        }, null);
                        libs.setProp(_el$6, "onactivate", self => {
                          setShowEnemy(self.IsSelected());
                        });
                        libs.effect(_$p => libs.setProp(_el$6, "selected", showEnemy(), _$p));
                        return _el$6;
                      })()];
                    }
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                marginLeft: "20px",
                flowChildren: "down",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "OptionRow",
                    get children() {
                      return [(() => {
                        const _el$7 = libs.createElement("Label", {
                          text: "#Combatlog_Option_Attack"
                        }, null);
                        libs.setProp(_el$7, "className", "OptionName");
                        return _el$7;
                      })(), (() => {
                        const _el$8 = libs.createElement("ToggleButton", {
                          get selected() {
                            return showDamage();
                          }
                        }, null);
                        libs.setProp(_el$8, "onactivate", self => {
                          setShowDamage(self.IsSelected());
                        });
                        libs.effect(_$p => libs.setProp(_el$8, "selected", showDamage(), _$p));
                        return _el$8;
                      })()];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "OptionRow",
                    get children() {
                      return [(() => {
                        const _el$9 = libs.createElement("Label", {
                          text: "#Combatlog_Option_Ability"
                        }, null);
                        libs.setProp(_el$9, "className", "OptionName");
                        return _el$9;
                      })(), (() => {
                        const _el$10 = libs.createElement("ToggleButton", {
                          get selected() {
                            return showAbility();
                          }
                        }, null);
                        libs.setProp(_el$10, "onactivate", self => {
                          setShowAbility(self.IsSelected());
                        });
                        libs.effect(_$p => libs.setProp(_el$10, "selected", showAbility(), _$p));
                        return _el$10;
                      })()];
                    }
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                marginLeft: "20px",
                flowChildren: "down",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    flowChildren: "down",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "OptionRow",
                        get children() {
                          return [(() => {
                            const _el$11 = libs.createElement("Label", {
                              text: "#Combatlog_Option_Heal"
                            }, null);
                            libs.setProp(_el$11, "className", "OptionName");
                            return _el$11;
                          })(), (() => {
                            const _el$12 = libs.createElement("ToggleButton", {
                              get selected() {
                                return showHeal();
                              }
                            }, null);
                            libs.setProp(_el$12, "onactivate", self => {
                              setShowHeal(self.IsSelected());
                            });
                            libs.effect(_$p => libs.setProp(_el$12, "selected", showHeal(), _$p));
                            return _el$12;
                          })()];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "OptionRow",
                        get children() {
                          return [(() => {
                            const _el$13 = libs.createElement("Label", {
                              text: "#Combatlog_Option_Buff"
                            }, null);
                            libs.setProp(_el$13, "className", "OptionName");
                            return _el$13;
                          })(), (() => {
                            const _el$14 = libs.createElement("ToggleButton", {
                              get selected() {
                                return showBuff();
                              }
                            }, null);
                            libs.setProp(_el$14, "onactivate", self => {
                              setShowBuff(self.IsSelected());
                            });
                            libs.effect(_$p => libs.setProp(_el$14, "selected", showBuff(), _$p));
                            return _el$14;
                          })()];
                        }
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Button.EOM_Button, {
                type: "P2",
                margin: "0px",
                align: "right bottom",
                color: "Green",
                text: "#CombatLog_Print",
                onactivate: () => {
                  requestLog(playerID(), Number(round()));
                }
              })];
            }
          })];
        }
      });
    }
  });
}
libs.render(() => libs.createComponent(CombatLog, {}), $.GetContextPanel());