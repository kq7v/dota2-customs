--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var common_item = require('./common_item.js');
var upgrade_icon = require('./upgrade_icon.js');
var EOM_ImageNumber = require('./EOM_ImageNumber.js');
var EOM_Button = require('./EOM_Button.js');
var solid_utils = require('./solid_utils.js');
var Player = require('./Player.js');
var hero_card = require('./hero_card.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./EOM_HeroImage.js');

function ArenaOpponentInfo(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "ArenaSidePanel ArenaSelectedOpponent",
        hittest: true
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "ArenaSideTitle"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        "class": "TitleLabel",
        get text() {
          return GetLocalization("#Arena_OpponentInfo");
        }
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        "class": "ArenaSelectedRank"
      }, _el$),
      _el$5 = libs.createElement("Label", {
        "class": "RankLabel",
        get text() {
          return LocalizeWithVars("#Arena_Rank", {
            value: props.opponent?.rank ?? 0
          });
        },
        html: true
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "ArenaSelectedAvatarRoot"
      }, _el$),
      _el$7 = libs.createElement("Panel", {
        "class": "ArenaScore ArenaSelectedScore"
      }, _el$);
      libs.createElement("Panel", {
        "class": "ScoreBG"
      }, _el$7);
      const _el$9 = libs.createElement("Panel", {
        "class": "ScoreFlow"
      }, _el$7);
      libs.createElement("Image", {
        "class": "ArenaRankBadge"
      }, _el$9);
      const _el$1 = libs.createElement("Label", {
        get text() {
          return `${props.opponent?.score ?? 0}`;
        }
      }, _el$9),
      _el$10 = libs.createElement("Label", {
        "class": "ArenaSelectedCombatPower",
        get text() {
          return LocalizeWithVars("#Arena_CombatPower", {
            value: FormatNumber(props.opponent?.combatPower ?? 0)
          });
        }
      }, _el$);
    libs.insert(_el$6, libs.createComponent(Player.PlayerAvatar, {
      classList: {
        ArenaSelectedAvatar: true
      },
      get accountid() {
        return props.opponent?.accountID ?? "0";
      },
      get borderid() {
        return props.opponent?.borderCosmeticID ?? "1710000";
      }
    }));
    libs.insert(_el$, libs.createComponent(Player.PlayerName, {
      "class": "ArenaSelectedName",
      get accountid() {
        return props.opponent?.accountID;
      }
    }), _el$7);
    libs.effect(_p$ => {
      const _v$ = props.visible == true && props.opponent !== undefined,
        _v$2 = GetLocalization("#Arena_OpponentInfo"),
        _v$3 = LocalizeWithVars("#Arena_Rank", {
          value: props.opponent?.rank ?? 0
        }),
        _v$4 = `${props.opponent?.score ?? 0}`,
        _v$5 = LocalizeWithVars("#Arena_CombatPower", {
          value: FormatNumber(props.opponent?.combatPower ?? 0)
        });
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "visible", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$1, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$;
  })();
}
function ArenaTeamSelection(props) {
  const selectedTeamID = libs.createMemo(() => props.session.selectedTeamID ?? 1);
  const selectedTeam = libs.createMemo(() => props.session.teamSetting?.teams.find(team => team.team_id === selectedTeamID()));
  const appliedTeamID = libs.createMemo(() => props.session.mode === "edit_defense" ? props.session.teamSetting?.defense_team : props.session.teamSetting?.attack_team);
  return (() => {
    const _el$11 = libs.createElement("Panel", {
        "class": "ArenaTeamSelection",
        hittest: true
      }, null),
      _el$12 = libs.createElement("Panel", {
        "class": "ArenaTeamNumberList"
      }, _el$11),
      _el$13 = libs.createElement("Panel", {
        "class": "ArenaTeamPowerPanel"
      }, _el$11),
      _el$14 = libs.createElement("Panel", {
        "class": "ArenaTeamPowerHeader"
      }, _el$13),
      _el$15 = libs.createElement("Label", {
        get text() {
          return LocalizeWithVars("#Arena_TeamNumber", {
            value: selectedTeamID()
          });
        }
      }, _el$14),
      _el$16 = libs.createElement("Label", {
        "class": "ArenaTeamPower",
        get text() {
          return LocalizeWithVars("#Arena_CombatPower", {
            value: FormatNumber(selectedTeam()?.power ?? 0)
          });
        }
      }, _el$13),
      _el$17 = libs.createElement("Panel", {
        "class": "ArenaTeamSelectionActions"
      }, _el$13),
      _el$18 = libs.createElement("Label", {
        "class": "ArenaTeamSaveError",
        get text() {
          return GetLocalization("#Arena_SaveFailed");
        }
      }, _el$13);
    libs.insert(_el$12, libs.createComponent(libs.For, {
      each: [1, 2, 3, 4],
      children: teamNumber => libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "ArenaTeamNumberButton",
        get classList() {
          return {
            Selected: teamNumber === selectedTeamID(),
            Applied: teamNumber === appliedTeamID()
          };
        },
        get enabled() {
          return !props.session.saving && !props.session.battleStarting;
        },
        onactivate: () => GameEvents.SendCustomEventToServer("arena_select_team", {
          teamID: teamNumber
        }),
        get children() {
          return [libs.createElement("Panel", {
            "class": "SelectBorder",
            hittest: false
          }, null), libs.createElement("Panel", {
            "class": "AppliedTag",
            hittest: false
          }, null), (() => {
            const _el$21 = libs.createElement("Label", {
              text: `${teamNumber}`
            }, null);
            libs.setProp(_el$21, "text", `${teamNumber}`);
            return _el$21;
          })()];
        }
      })
    }));
    libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      get text() {
        return GetLocalization("#Arena_Equipment");
      },
      onactivate: () => JumpToMenu({
        window_name: "equipment",
        menu: "EquipmentTab_equip",
        force: true
      })
    }), null);
    libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      get enabled() {
        return !props.session.saving && !props.session.battleStarting;
      },
      onactivate: () => GameEvents.SendCustomEventToServer("arena_edit_formation", {}),
      get text() {
        return GetLocalization("#Arena_EditFormation");
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_Button, {
      get visible() {
        return props.editor == true;
      },
      size: "Small",
      get enabled() {
        return libs.memo(() => !!!props.session.saving)() && selectedTeamID() !== appliedTeamID();
      },
      onactivate: () => GameEvents.SendCustomEventToServer("arena_apply_team", {}),
      get text() {
        return GetLocalization("#Arena_ApplyTeam");
      }
    }), null);
    libs.effect(_p$ => {
      const _v$6 = {
          Editor: props.editor == true
        },
        _v$7 = LocalizeWithVars("#Arena_TeamNumber", {
          value: selectedTeamID()
        }),
        _v$8 = LocalizeWithVars("#Arena_CombatPower", {
          value: FormatNumber(selectedTeam()?.power ?? 0)
        }),
        _v$9 = props.session.saveError !== undefined,
        _v$0 = GetLocalization("#Arena_SaveFailed");
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$11, "classList", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$15, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$16, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$18, "visible", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$18, "text", _v$0, _p$._v$0));
      return _p$;
    }, {
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined
    });
    return _el$11;
  })();
}
function ArenaTeamPanel(props) {
  const [saving, setSaving] = libs.createSignal(false);
  const [saveError, setSaveError] = libs.createSignal(false);
  const selectedCount = () => Object.keys(props.deployedHeroes).length;
  return (() => {
    const _el$22 = libs.createElement("Panel", {
        "class": "ArenaTeamPanel",
        hittest: true
      }, null);
      libs.createElement("Panel", {
        "class": "ArenaTeamPanelBackground"
      }, _el$22);
      const _el$24 = libs.createElement("Panel", {
        "class": "ArenaTeamHeader"
      }, _el$22),
      _el$25 = libs.createElement("Panel", {
        width: "100%",
        padding: "0px 5px",
        horizontalAlign: "center",
        flowChildren: "right"
      }, _el$24),
      _el$26 = libs.createElement("Label", {
        "class": "HeaderLabel",
        get text() {
          return GetLocalization("#Arena_TeamComposition");
        }
      }, _el$25);
      libs.createElement("Panel", {
        "class": "CustomInfoIcon"
      }, _el$25);
      const _el$28 = libs.createElement("Label", {
        "class": "ArenaTeamCount",
        get text() {
          return LocalizeWithVars("#Arena_TeamCount", {
            current: selectedCount(),
            total: 4
          });
        }
      }, _el$25);
      libs.createElement("Panel", {
        "class": "HeaderLine"
      }, _el$24);
      const _el$30 = libs.createElement("Panel", {
        "class": "ArenaHeroRoster"
      }, _el$22),
      _el$31 = libs.createElement("Panel", {
        "class": "HeroList",
        scroll: "y"
      }, _el$30),
      _el$32 = libs.createElement("Panel", {
        horizontalAlign: "center",
        flowChildren: "right"
      }, _el$22),
      _el$33 = libs.createElement("Label", {
        "class": "ArenaTeamSaveError",
        get text() {
          return GetLocalization("#Arena_SaveFailed");
        }
      }, _el$22);
    libs.setProp(_el$25, "width", "100%");
    libs.setProp(_el$25, "padding", "0px 5px");
    libs.setProp(_el$25, "horizontalAlign", "center");
    libs.setProp(_el$25, "flowChildren", "right");
    libs.setProp(_el$31, "scroll", "y");
    libs.insert(_el$31, libs.createComponent(libs.For, {
      get each() {
        return props.roster;
      },
      children: heroName => (() => {
        const _el$34 = libs.createElement("Panel", {
            "class": "CardItem"
          }, null),
          _el$35 = libs.createElement("Panel", {
            "class": "ArenaHeroCardContainer"
          }, _el$34),
          _el$36 = libs.createElement("Panel", {
            "class": "ArenaHeroDeployedMark",
            hittest: false
          }, _el$35),
          _el$37 = libs.createElement("Panel", {
            "class": "HeroLv"
          }, _el$34);
          libs.createElement("Label", {
            "class": "HeroLvLabel",
            text: "1"
          }, _el$37);
          const _el$39 = libs.createElement("Label", {
            "class": "HeroName",
            get text() {
              return GetLocalization(heroName);
            }
          }, _el$34);
        libs.insert(_el$35, libs.createComponent(hero_card.HeroCard, {
          "class": "ArenaHeroCard",
          heroName: heroName,
          get enabled() {
            return !saving();
          },
          onactivate: () => {
            if (props.deployedHeroes[heroName] !== undefined && selectedCount() <= 1) return;
            GameEvents.SendCustomEventToServer("arena_toggle_hero", {
              heroName
            });
          }
        }), _el$36);
        libs.effect(_p$ => {
          const _v$14 = props.deployedHeroes[heroName] !== undefined,
            _v$15 = GetLocalization(heroName);
          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$36, "visible", _v$14, _p$._v$14));
          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$39, "text", _v$15, _p$._v$15));
          return _p$;
        }, {
          _v$14: undefined,
          _v$15: undefined
        });
        return _el$34;
      })()
    }));
    libs.setProp(_el$32, "horizontalAlign", "center");
    libs.setProp(_el$32, "flowChildren", "right");
    libs.insert(_el$32, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      get loading() {
        return saving();
      },
      get enabled() {
        return !saving();
      },
      onactivate: () => {
        if (saving()) return;
        setSaving(true);
        setSaveError(false);
        ServerRequest("arena_save_team_formation", {}, result => {
          setSaving(false);
          setSaveError(!result.ok);
        }, 30, () => {
          setSaving(false);
          setSaveError(true);
        });
      },
      get text() {
        return GetLocalization("#Arena_SaveFormation");
      }
    }), null);
    libs.insert(_el$32, libs.createComponent(EOM_Button.EOM_Button, {
      marginLeft: "9px",
      size: "Small",
      get enabled() {
        return !saving();
      },
      onactivate: () => {
        setSaveError(false);
        GameEvents.SendCustomEventToServer("arena_exit_formation", {});
      },
      get text() {
        return GetLocalization("#Arena_ExitFormation");
      }
    }), null);
    libs.effect(_p$ => {
      const _v$1 = props.visible,
        _v$10 = GetLocalization("#Arena_TeamComposition"),
        _v$11 = LocalizeWithVars("#Arena_TeamCount", {
          current: selectedCount(),
          total: 4
        }),
        _v$12 = saveError(),
        _v$13 = GetLocalization("#Arena_SaveFailed");
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$22, "visible", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$26, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$28, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$33, "visible", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$33, "text", _v$13, _p$._v$13));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined
    });
    return _el$22;
  })();
}
function ArenaFormationStage(props) {
  const selectedOpponent = libs.createMemo(() => props.session.opponents.find(opponent => opponent.id == props.session.selectedOpponentID));
  return (() => {
    const _el$40 = libs.createElement("Panel", {
        "class": "ArenaFormationStage",
        hittest: false
      }, null),
      _el$41 = libs.createElement("Panel", {
        "class": "ArenaTeamSelectionColumn",
        hittest: true
      }, _el$40),
      _el$42 = libs.createElement("Panel", {
        "class": "BtnContainer"
      }, _el$40);
    libs.insert(_el$40, libs.createComponent(ArenaOpponentInfo, {
      get visible() {
        return !props.session.formationEditing && props.session.mode === "battle";
      },
      get opponent() {
        return selectedOpponent();
      }
    }), _el$41);
    libs.insert(_el$41, libs.createComponent(ArenaTeamSelection, {
      get session() {
        return props.session;
      },
      get editor() {
        return props.session.mode !== "battle";
      }
    }));
    libs.insert(_el$42, libs.createComponent(EOM_Button.EOM_Button, {
      get visible() {
        return props.session.mode === "battle";
      },
      "class": "ArenaStartBattle ArenaOrnateButton",
      get enabled() {
        return !props.session.saving;
      },
      get loading() {
        return props.session.battleStarting;
      },
      get text() {
        return GetLocalization("#Arena_StartBattle");
      },
      onactivate: () => GameEvents.SendCustomEventToServer("arena_start_battle", {})
    }), null);
    libs.insert(_el$42, libs.createComponent(EOM_Button.EOM_Button, {
      get visible() {
        return props.session.mode === "battle";
      },
      color: "Cancel",
      get enabled() {
        return !props.session.saving && !props.session.battleStarting;
      },
      get text() {
        return GetLocalization("#Arena_Back");
      },
      onactivate: () => GameEvents.SendCustomEventToServer("arena_reselect_opponent", {})
    }), null);
    libs.insert(_el$42, libs.createComponent(EOM_Button.EOM_Button, {
      get visible() {
        return props.session.mode !== "battle";
      },
      "class": "ArenaExitToLadder",
      color: "Cancel",
      get enabled() {
        return !props.session.saving;
      },
      onactivate: () => GameEvents.SendCustomEventToServer("arena_exit", {}),
      get text() {
        return GetLocalization("#Arena_ExitToLadder");
      }
    }), null);
    libs.insert(_el$40, libs.createComponent(ArenaTeamPanel, {
      get visible() {
        return props.session.formationEditing;
      },
      get roster() {
        return props.session.roster;
      },
      get deployedHeroes() {
        return props.session.friendlyUnits;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$16 = {
          Editing: props.session.formationEditing == true
        },
        _v$17 = !props.session.formationEditing;
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$40, "classList", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$41, "visible", _v$17, _p$._v$17));
      return _p$;
    }, {
      _v$16: undefined,
      _v$17: undefined
    });
    return _el$40;
  })();
}

const ARENA_TASK_ID = 8001001;
const player_weekly_pvp_tasks = solid_utils.createServiceNetData("player_weekly_pvp_tasks", {});
function ArenaOpponentCard(props) {
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    "class": "ArenaOpponentCard",
    get enabled() {
      return !props.disabled;
    },
    onactivate: () => {
      GameEvents.SendCustomEventToServer("arena_select_opponent", {
        opponentID: props.opponent.id
      });
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            "class": "RankContainer"
          }, null),
          _el$2 = libs.createElement("Panel", {
            "class": "ArenaScore ArenaOpponentScore"
          }, _el$);
          libs.createElement("Panel", {
            "class": "ScoreBG"
          }, _el$2);
          const _el$4 = libs.createElement("Panel", {
            "class": "ScoreFlow"
          }, _el$2);
          libs.createElement("Image", {
            "class": "ArenaRankBadge"
          }, _el$4);
          const _el$6 = libs.createElement("Label", {
            get text() {
              return `${props.opponent.score}`;
            }
          }, _el$4);
        libs.effect(_$p => libs.setProp(_el$6, "text", `${props.opponent.score}`, _$p));
        return _el$;
      })(), (() => {
        const _el$7 = libs.createElement("Panel", {
            "class": "ArenaOpponentAvatarRoot"
          }, null),
          _el$8 = libs.createElement("Panel", {
            "class": "ArenaOpponentAvatarTips"
          }, _el$7);
        libs.insert(_el$7, libs.createComponent(Player.PlayerAvatar, {
          classList: {
            ArenaOpponentAvatar: true
          },
          get accountid() {
            return props.opponent.accountID;
          },
          get borderid() {
            return props.opponent.borderCosmeticID ?? "1710000";
          }
        }), _el$8);
        libs.effect(_$p => libs.setProp(_el$8, "customTooltip", {
          name: "player_info",
          steam_id: props.opponent.accountID
        }, _$p));
        return _el$7;
      })(), (() => {
        const _el$9 = libs.createElement("Panel", {
          "class": "ArenaOpponentNameRoot"
        }, null);
        libs.insert(_el$9, libs.createComponent(Player.PlayerName, {
          "class": "ArenaOpponentName",
          get accountid() {
            return props.opponent.accountID;
          }
        }));
        return _el$9;
      })(), (() => {
        const _el$0 = libs.createElement("Panel", {
            "class": "ArenaPower"
          }, null);
          libs.createElement("Panel", {
            "class": "PowerBG"
          }, _el$0);
          const _el$10 = libs.createElement("Panel", {
            "class": "PowerFlow"
          }, _el$0);
          libs.createElement("Image", {
            "class": "ArenaRankBadge"
          }, _el$10);
          const _el$12 = libs.createElement("Label", {
            get text() {
              return FormatNumber(props.opponent.combatPower ?? 0);
            }
          }, _el$10);
        libs.effect(_p$ => {
          const _v$ = GetLocalization("#LadderChart_LadderPower"),
            _v$2 = FormatNumber(props.opponent.combatPower ?? 0);
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$0, "tooltip_text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$12, "text", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$0;
      })()];
    }
  });
}
function ArenaOpponentSelection(props) {
  const [testUID, setTestUID] = libs.createSignal("");
  const parsedTestUID = libs.createMemo(() => Number(testUID().trim()));
  libs.createMemo(() => Number.isFinite(parsedTestUID()) && parsedTestUID() > 0 && !props.session.opponentLoading);
  const sortedOpponents = libs.createMemo(() => [...props.session.opponents].sort((a, b) => Number(a.kind === "bot") - Number(b.kind === "bot")));
  const taskConfig = KeyValues.task[ARENA_TASK_ID];
  const arenaTask = libs.createMemo(() => {
    const timestamp = CustomUIConfig.GetServerTimeStamp();
    return Object.values(player_weekly_pvp_tasks()).find(task => task.task_id === ARENA_TASK_ID && task.start_time <= timestamp && task.end_time >= timestamp);
  });
  const taskDescriptionID = taskConfig.task_description == 1 ? taskConfig.task_id : taskConfig.event_id;
  const taskTarget = () => arenaTask()?.target ?? taskConfig.target;
  return (() => {
    const _el$13 = libs.createElement("Panel", {
        "class": "ArenaOpponentSelection",
        hittest: true
      }, null),
      _el$14 = libs.createElement("Panel", {
        "class": "ArenaSelectionHeader"
      }, _el$13),
      _el$15 = libs.createElement("Label", {
        "class": "ArenaSelectionTaskTitle",
        get text() {
          return LocalizeWithVars("#Arena_ChallengeTask", {
            progress: arenaTask()?.progress ?? 0,
            target: taskTarget()
          });
        }
      }, _el$14),
      _el$16 = libs.createElement("Label", {
        "class": "ArenaSelectionTaskText",
        get text() {
          return LocalizeWithVars(`#Task_Desc_${taskDescriptionID}`, {
            target: GetLocalization(String(taskConfig.target)),
            v1: GetLocalization(String(taskConfig.param_1)),
            v2: GetLocalization(String(taskConfig.param_2)),
            v3: GetLocalization(String(taskConfig.param_3))
          });
        }
      }, _el$14),
      _el$17 = libs.createElement("Panel", {
        "class": "ArenaOpponentCards"
      }, _el$13),
      _el$18 = libs.createElement("Panel", {
        "class": "ArenaSelectionLoading",
        hittest: true
      }, _el$13),
      _el$19 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#Arena_LoadingPvpAttributes");
        }
      }, _el$18);
    libs.insert(_el$17, libs.createComponent(libs.For, {
      get each() {
        return sortedOpponents();
      },
      children: opponent => libs.createComponent(ArenaOpponentCard, {
        opponent: opponent,
        get disabled() {
          return props.session.opponentLoading == true;
        }
      })
    }));
    libs.effect(_p$ => {
      const _v$3 = LocalizeWithVars("#Arena_ChallengeTask", {
          progress: arenaTask()?.progress ?? 0,
          target: taskTarget()
        }),
        _v$4 = LocalizeWithVars(`#Task_Desc_${taskDescriptionID}`, {
          target: GetLocalization(String(taskConfig.target)),
          v1: GetLocalization(String(taskConfig.param_1)),
          v2: GetLocalization(String(taskConfig.param_2)),
          v3: GetLocalization(String(taskConfig.param_3))
        }),
        _v$5 = props.session.opponentLoading,
        _v$6 = GetLocalization("#Arena_LoadingPvpAttributes");
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "visible", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$19, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$13;
  })();
}

const ARENA_GRID_PARTICLE = "particles/ui/game/ui_game_nest_blue_fx.vpcf";
const ARENA_TARGET_CELL_PARTICLE = "particles/ui/game/ui_game_nest_fx.vpcf";
const ARENA_DRAG_PARTICLE = "particles/buildinghelper/drag_path_m1.vpcf";
const ARENA_PREVIEW_HEIGHT = 260;
const ARENA_CELL_HIT_RADIUS = 112;
const HIDDEN_PARTICLE_POSITION = [0, 0, -10000];
function ArenaLoadoutPanel(props) {
  const upgradeHeroes = libs.createMemo(() => {
    const result = [...props.roster];
    for (const heroName of Object.keys(props.loadout?.upgrades ?? {})) {
      if (!result.includes(heroName)) result.push(heroName);
    }
    return result.filter(heroName => (props.loadout?.upgrades[heroName]?.length ?? 0) > 0);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "ArenaLoadoutPanel VerticalScrollStyle",
        hittest: true,
        scroll: "y"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "ArenaLoadoutHeader"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        "class": "TitleContainer"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        "class": "ArenaLoadoutTitle",
        get text() {
          return GetLocalization("#Arena_Build");
        }
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        "class": "IconInfo"
      }, _el$3);
    libs.setProp(_el$, "scroll", "y");
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return props.loadout !== undefined;
      },
      get children() {
        const _el$6 = libs.createElement("Label", {
          "class": "ArenaLoadoutCounts",
          get text() {
            return LocalizeWithVars("#Arena_BuildCounts", {
              blesses: props.loadout?.blesses.length ?? 0,
              relics: props.loadout?.artifacts.length ?? 0
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$6, "text", LocalizeWithVars("#Arena_BuildCounts", {
          blesses: props.loadout?.blesses.length ?? 0,
          relics: props.loadout?.artifacts.length ?? 0
        }), _$p));
        return _el$6;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.loadout;
      },
      get fallback() {
        return (() => {
          const _el$7 = libs.createElement("Label", {
            "class": "ArenaLoadoutPending",
            get text() {
              return GetLocalization("#Arena_BuildPending");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$7, "text", GetLocalization("#Arena_BuildPending"), _$p));
          return _el$7;
        })();
      },
      children: loadout => (() => {
        const _el$8 = libs.createElement("Panel", {
            "class": "ArenaLoadoutContent"
          }, null),
          _el$9 = libs.createElement("Panel", {
            "class": "ArenaLoadoutItemsColumn"
          }, _el$8),
          _el$0 = libs.createElement("Panel", {
            "class": "ArenaLoadoutGroup"
          }, _el$9),
          _el$1 = libs.createElement("Label", {
            "class": "ArenaLoadoutGroupTitle",
            get text() {
              return GetLocalization("#Arena_Blesses");
            }
          }, _el$0),
          _el$10 = libs.createElement("Panel", {
            "class": "ArenaLoadoutItemList"
          }, _el$0),
          _el$11 = libs.createElement("Panel", {
            "class": "ArenaLoadoutGroup"
          }, _el$9),
          _el$12 = libs.createElement("Label", {
            "class": "ArenaLoadoutGroupTitle",
            get text() {
              return GetLocalization("#Arena_Relics");
            }
          }, _el$11),
          _el$13 = libs.createElement("Panel", {
            "class": "ArenaLoadoutItemList"
          }, _el$11),
          _el$14 = libs.createElement("Panel", {
            "class": "ArenaUpgradeColumn"
          }, _el$8),
          _el$15 = libs.createElement("Label", {
            "class": "ArenaLoadoutGroupTitle",
            get text() {
              return GetLocalization("#Arena_Upgrades");
            }
          }, _el$14),
          _el$16 = libs.createElement("Panel", {
            "class": "ArenaUpgradeList"
          }, _el$14);
        libs.insert(_el$10, libs.createComponent(libs.For, {
          get each() {
            return loadout().blesses;
          },
          children: bless => libs.createComponent(common_item.CommonItem, {
            "class": "ArenaLoadoutItem",
            get itemName() {
              return bless.name;
            },
            get rarity() {
              return bless.rarity;
            },
            showTips: true
          })
        }));
        libs.insert(_el$13, libs.createComponent(libs.For, {
          get each() {
            return loadout().artifacts;
          },
          children: artifact => libs.createComponent(common_item.CommonItem, {
            "class": "ArenaLoadoutItem",
            get itemName() {
              return artifact.name;
            },
            get rarity() {
              return artifact.rarity;
            },
            showTips: true
          })
        }));
        libs.insert(_el$16, libs.createComponent(libs.For, {
          get each() {
            return upgradeHeroes();
          },
          children: heroName => (() => {
            const _el$17 = libs.createElement("Panel", {
                "class": "ArenaUpgradeRow"
              }, null),
              _el$18 = libs.createElement("Label", {
                "class": "ArenaUpgradeHeroName",
                get text() {
                  return GetLocalization(heroName);
                }
              }, _el$17),
              _el$19 = libs.createElement("Panel", {
                "class": "ArenaUpgradeIcons"
              }, _el$17);
            libs.insert(_el$19, libs.createComponent(libs.For, {
              get each() {
                return loadout().upgrades[heroName] ?? [];
              },
              children: upgrade => libs.createComponent(upgrade_icon.UpgradeIcon, {
                "class": "ArenaUpgradeIcon",
                upgradeID: upgrade,
                showTips: true
              })
            }));
            libs.effect(_$p => libs.setProp(_el$18, "text", GetLocalization(heroName), _$p));
            return _el$17;
          })()
        }));
        libs.effect(_p$ => {
          const _v$3 = GetLocalization("#Arena_Blesses"),
            _v$4 = GetLocalization("#Arena_Relics"),
            _v$5 = GetLocalization("#Arena_Upgrades");
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "text", _v$5, _p$._v$5));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined
        });
        return _el$8;
      })()
    }), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#Arena_Build"),
        _v$2 = GetLocalization(`#Ladder_Tips1`);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "tooltip_text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}
function ArenaHud() {
  const session = solid_utils.createPlayerNetDataSignal("arena", "session");
  const [draggedHero, setDraggedHero] = libs.createSignal();
  let dragPreview;
  let formationGridParticles = [];
  const editable = libs.createMemo(() => {
    const current = session();
    return current?.phase === "formation" && !current.saving && !current.battleStarting;
  });
  const statusText = libs.createMemo(() => {
    const current = session();
    if (current?.phase === "countdown" && current.countdown !== undefined) return LocalizeWithVars("#Arena_Countdown", {
      value: current.countdown
    });
    return GetLocalization(`#Arena_Phase_${current?.phase ?? "loading"}`);
  });
  const exitArenaToLobby = () => {
    GameEvents.SendCustomEventToServer("arena_exit", {});
    JumpToMenu({
      window_name: "rank",
      menu: "Ladder",
      menu2: "ladder_lobby",
      force: true
    });
  };
  const findDraggedHero = () => {
    const current = session();
    const worldPosition = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition());
    if (!editable() || current === undefined || worldPosition == undefined) return undefined;
    let nearestHero;
    let nearestDistance = 145 * 145;
    for (const heroName of current.roster) {
      const unit = current.friendlyUnits[heroName];
      if (unit === undefined || !Entities.IsValidEntity(unit)) continue;
      const origin = Entities.GetAbsOrigin(unit);
      const deltaX = worldPosition[0] - origin[0];
      const deltaY = worldPosition[1] - origin[1];
      const distance = deltaX * deltaX + deltaY * deltaY;
      if (distance < nearestDistance) {
        nearestHero = heroName;
        nearestDistance = distance;
      }
    }
    return nearestHero;
  };
  const getHoveredCell = current => {
    const worldPosition = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition());
    if (worldPosition == undefined) return undefined;
    let nearestCell;
    let nearestDistance = Number.MAX_SAFE_INTEGER;
    for (const cell of current.boardCells) {
      const deltaX = worldPosition[0] - cell.worldX;
      const deltaY = worldPosition[1] - cell.worldY;
      if (Math.abs(deltaX) > ARENA_CELL_HIT_RADIUS || Math.abs(deltaY) > ARENA_CELL_HIT_RADIUS) continue;
      const distance = deltaX * deltaX + deltaY * deltaY;
      if (distance < nearestDistance) {
        nearestCell = cell;
        nearestDistance = distance;
      }
    }
    return nearestCell;
  };
  const getPreviewPosition = cell => [cell.worldX, cell.worldY, ARENA_PREVIEW_HEIGHT];
  const createCellParticle = (particleName, position) => {
    const particle = Particles.CreateParticle(particleName, ParticleAttachment_t.PATTACH_CUSTOMORIGIN, -1);
    Particles.SetParticleAlwaysSimulate(particle);
    Particles.SetParticleControl(particle, 0, position);
    return particle;
  };
  const destroyDragPreview = () => {
    if (dragPreview === undefined) return;
    if (dragPreview.targetCellIndex !== undefined) {
      const targetCell = session()?.boardCells[dragPreview.targetCellIndex];
      const gridParticle = formationGridParticles[dragPreview.targetCellIndex];
      if (targetCell !== undefined && gridParticle !== undefined) Particles.SetParticleControl(gridParticle, 0, getPreviewPosition(targetCell));
    }
    Particles.DestroyParticleEffect(dragPreview.targetParticle, false);
    Particles.DestroyParticleEffect(dragPreview.dragPathParticle, false);
    dragPreview = undefined;
  };
  const updateDragPreview = () => {
    const preview = dragPreview;
    const current = session();
    const heroName = draggedHero();
    if (preview === undefined || current === undefined || heroName === undefined) return;
    if (!editable()) {
      destroyDragPreview();
      setDraggedHero(undefined);
      return;
    }
    const boardCells = current.boardCells;
    const heroEntity = current.friendlyUnits[heroName];
    const heroPosition = heroEntity !== undefined && Entities.IsValidEntity(heroEntity) ? Entities.GetAbsOrigin(heroEntity) : undefined;
    const targetCell = getHoveredCell(current);
    let targetCellIndex;
    for (let index = 0; index < boardCells.length; index++) {
      const cell = boardCells[index];
      if (targetCell?.x === cell.x && targetCell.y === cell.y) {
        targetCellIndex = index;
        break;
      }
    }
    if (preview.targetCellIndex !== targetCellIndex) {
      if (preview.targetCellIndex !== undefined) {
        const previousCell = boardCells[preview.targetCellIndex];
        const previousParticle = formationGridParticles[preview.targetCellIndex];
        if (previousCell !== undefined && previousParticle !== undefined) Particles.SetParticleControl(previousParticle, 0, getPreviewPosition(previousCell));
      }
      if (targetCellIndex !== undefined) {
        const targetGridParticle = formationGridParticles[targetCellIndex];
        if (targetGridParticle !== undefined) Particles.SetParticleControl(targetGridParticle, 0, HIDDEN_PARTICLE_POSITION);
      }
      preview.targetCellIndex = targetCellIndex;
    }
    Particles.SetParticleControl(preview.targetParticle, 0, targetCell === undefined ? HIDDEN_PARTICLE_POSITION : getPreviewPosition(targetCell));
    if (heroPosition !== undefined && targetCell !== undefined) {
      const targetPosition = getPreviewPosition(targetCell);
      Particles.SetParticleControl(preview.dragPathParticle, 4, heroPosition);
      Particles.SetParticleControl(preview.dragPathParticle, 5, targetPosition);
    } else {
      if (heroPosition !== undefined) Particles.SetParticleControl(preview.dragPathParticle, 5, heroPosition);
    }
    $.Schedule(0, updateDragPreview);
  };
  const startDragPreview = () => {
    const current = session();
    if (current === undefined) return;
    destroyDragPreview();
    const targetParticle = createCellParticle(ARENA_TARGET_CELL_PARTICLE, HIDDEN_PARTICLE_POSITION);
    const dragPathParticle = Particles.CreateParticle(ARENA_DRAG_PARTICLE, ParticleAttachment_t.PATTACH_CUSTOMORIGIN, -1);
    Particles.SetParticleAlwaysSimulate(dragPathParticle);
    dragPreview = {
      targetParticle,
      dragPathParticle
    };
    updateDragPreview();
  };
  const destroyFormationGrid = () => {
    for (const particle of formationGridParticles) Particles.DestroyParticleEffect(particle, false);
    formationGridParticles = [];
  };
  const formationGridSignature = libs.createMemo(() => {
    const current = session();
    if (!editable() || current === undefined) return "";
    return current.boardCells.map(cell => `${cell.x},${cell.y},${cell.worldX},${cell.worldY},${cell.worldZ}`).join("|");
  });
  libs.createEffect(libs.on(formationGridSignature, signature => {
    destroyFormationGrid();
    if (signature !== "") {
      const boardCells = session()?.boardCells ?? [];
      formationGridParticles = boardCells.map(cell => createCellParticle(ARENA_GRID_PARTICLE, getPreviewPosition(cell)));
    }
  }));
  libs.onCleanup(destroyFormationGrid);
  libs.onMount(() => {
    const mouseEvents = GameUI.CustomUIConfig().tMouseEvents;
    const key = "arena_scene_drag";
    mouseEvents[key] = {
      iPriority: 920,
      fCallback: event => {
        if (event.value !== 0) return false;
        if (event.event_name === "pressed") {
          const heroName = findDraggedHero();
          if (heroName === undefined) return false;
          setDraggedHero(heroName);
          startDragPreview();
          return true;
        }
        const heroName = draggedHero();
        if (event.event_name === "released" && heroName !== undefined) {
          const current = session();
          const targetCell = current === undefined ? undefined : getHoveredCell(current);
          if (targetCell !== undefined) GameEvents.SendCustomEventToServer("arena_drag_hero", {
            heroName,
            worldX: targetCell.worldX,
            worldY: targetCell.worldY
          });
          destroyDragPreview();
          setDraggedHero(undefined);
          return true;
        }
        return false;
      }
    };
    libs.onCleanup(() => {
      destroyDragPreview();
      delete mouseEvents[key];
    });
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return libs.memo(() => session() !== undefined)() && session()?.phase !== "result";
    },
    get children() {
      const _el$20 = libs.createElement("Panel", {
          "class": "ArenaHud",
          hittest: false
        }, null),
        _el$21 = libs.createElement("Panel", {
          "class": "ArenaTitle"
        }, _el$20),
        _el$22 = libs.createElement("Label", {
          "class": "TitleLabel",
          get text() {
            return statusText();
          }
        }, _el$21);
      libs.insert(_el$20, libs.createComponent(libs.Show, {
        get when() {
          return session()?.phase === "opponent_selection";
        },
        get children() {
          return [libs.createComponent(ArenaOpponentSelection, {
            get session() {
              return session();
            }
          }), libs.createComponent(EOM_Button.EOM_CloseButton, {
            "class": "ArenaExitButton",
            onactivate: exitArenaToLobby
          })];
        }
      }), null);
      libs.insert(_el$20, libs.createComponent(libs.Show, {
        get when() {
          return session()?.phase === "formation";
        },
        get children() {
          return libs.createComponent(ArenaFormationStage, {
            get session() {
              return session();
            }
          });
        }
      }), null);
      libs.insert(_el$20, libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!(session()?.mode === "battle" && session()?.phase === "formation"))() && session()?.formationEditing != true;
        },
        get children() {
          return libs.createComponent(ArenaLoadoutPanel, {
            get loadout() {
              return session()?.loadout;
            },
            get roster() {
              return session()?.roster ?? [];
            }
          });
        }
      }), null);
      libs.insert(_el$20, libs.createComponent(EOM_ImageNumber.EOM_ImageNumber, {
        id: "ArenaBattleCountdown",
        hittest: false,
        get visible() {
          return libs.memo(() => session()?.phase === "countdown")() && (session()?.countdown ?? 0) > 0;
        },
        type: "5",
        get value() {
          return session()?.countdown ?? 0;
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$22, "text", statusText(), _$p));
      return _el$20;
    }
  });
}
libs.render(() => libs.createComponent(ArenaHud, {}), $.GetContextPanel());