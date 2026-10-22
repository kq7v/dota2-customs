--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var hunt_buff_icon = require('./hunt_buff_icon.js');
var solid_utils = require('./solid_utils.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
var EOM_Button = require('./EOM_Button.js');
var server_huntloot = require('./server_huntloot2.js');

const getDisplayedHealth = entIndex => {
  const logicalHealth = CustomNetTables.GetTableValue("large_number_health", String(entIndex));
  if (logicalHealth !== undefined) {
    const current = toFiniteNumber(logicalHealth.current, -1);
    const maximum = toFiniteNumber(logicalHealth.maximum, -1);
    if (current >= 0 && maximum > 0) return {
      current,
      maximum
    };
  }
  return {
    current: Entities.GetHealth(entIndex),
    maximum: Math.max(1, Entities.GetMaxHealth(entIndex))
  };
};
const HuntBossHealthBar = props => {
  const percent = libs.createMemo(() => Math.max(0, Math.min(100, props.boss().current / props.boss().maximum * 100)));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "HuntBossHealthBar",
        hittest: false
      }, null);
      libs.createElement("Panel", {
        "class": "HuntBossHealthBarBackground"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        "class": "HuntBossHealthBarFill",
        get width() {
          return `${percent()}%`;
        }
      }, _el$),
      _el$4 = libs.createElement("Label", {
        "class": "HuntBossHealthValue",
        get text() {
          return `${percent().toFixed(1)}%`;
        }
      }, _el$);
    libs.effect(_p$ => {
      const _v$ = `${percent()}%`,
        _v$2 = `${percent().toFixed(1)}%`;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "width", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const HuntBossHealthSlot = props => {
  const boss = libs.createMemo(() => props.bosses().find(value => value.slot === props.slot));
  return (() => {
    const _el$5 = libs.createElement("Panel", {
      "class": "HuntBossHealthSlot",
      hittest: false
    }, null);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return boss();
      },
      children: value => libs.createComponent(HuntBossHealthBar, {
        boss: value
      })
    }));
    return _el$5;
  })();
};
const HuntBossHealth = () => {
  const state = solid_utils.createNetDataSignal("hunt_boss", "state");
  const [bosses, setBosses] = libs.createSignal([]);
  const bossData = libs.createMemo(() => {
    const bosses = state()?.bosses;
    return Array.isArray(bosses) ? bosses : [];
  });
  const slots = libs.createMemo(() => bossData().map(boss => boss.slot).sort((a, b) => a - b));
  const isBattle = libs.createMemo(() => state()?.phase === "battle");
  libs.createEffect(() => {
    const timer = setInterval(() => {
      const values = [];
      for (const boss of bossData()) {
        if (!Entities.IsValidEntity(boss.ent_index)) continue;
        values.push({
          ...boss,
          ...getDisplayedHealth(boss.ent_index)
        });
      }
      setBosses(values);
    }, 0);
    libs.onCleanup(() => clearInterval(timer));
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return libs.memo(() => !!isBattle())() && bosses().length > 0;
    },
    get children() {
      const _el$6 = libs.createElement("Panel", {
        id: "HuntBossHealthContainer",
        hittest: false,
        hittestchildren: false
      }, null);
      libs.insert(_el$6, libs.createComponent(libs.For, {
        get each() {
          return slots();
        },
        children: slot => libs.createComponent(HuntBossHealthSlot, {
          slot: slot,
          bosses: bosses
        })
      }));
      libs.effect(_$p => libs.setProp(_el$6, "classList", {
        SingleBoss: slots().length === 1
      }, _$p));
      return _el$6;
    }
  });
};

const toHuntlootDisplayData = reward => ({
  id: 0,
  huntloot_item_id: reward.huntloot_item_id,
  level: 0,
  locked: false,
  in_equip_suit: "",
  in_check: "",
  class: reward.class,
  huntloot_part: reward.huntloot_part,
  rarity: reward.rarity,
  need_level: KeyValues.huntloot_class_setting[reward.class]?.need_level ?? 0
});
const toHuntlootTooltipData = reward => ({
  ...toHuntlootDisplayData(reward),
  adverb_entry_data: reward.adverb_entry ?? [],
  spell_entry_data: reward.spell_entry ?? []
});
const HuntBossCountdown = props => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HuntBossProgressCountdown"
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "HuntBossProgressCountdownValue",
        get text() {
          return LocalizeWithVars("#HuntBossIntermission_RemainingSeconds", {
            seconds: props.seconds
          });
        }
      }, _el$);
    libs.insert(_el$, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
      id: "HuntBossProgressCountdownBar",
      type: "Tui12",
      get value() {
        return props.progress;
      },
      hittest: false
    }), _el$2);
    libs.effect(_$p => libs.setProp(_el$2, "text", LocalizeWithVars("#HuntBossIntermission_RemainingSeconds", {
      seconds: props.seconds
    }), _$p));
    return _el$;
  })();
};
const HuntBossProgress = () => {
  const playerID = Players.GetLocalPlayer();
  const state = solid_utils.createNetDataSignal("hunt_boss", "state");
  const nextLevelBuffs = libs.createMemo(() => {
    const buffs = state()?.next_level_buffs;
    return Array.isArray(buffs) ? buffs : [];
  });
  const huntMatchRecords = solid_utils.createServiceNetData("player_hunt_match_records", {});
  const currentMatchRecord = libs.createMemo(() => Object.values(huntMatchRecords()).sort((a, b) => b.match_id - a.match_id)[0]);
  const rewardData = libs.createMemo(() => JSON.parseSafe(currentMatchRecord()?.reward_data ?? ""));
  const accumulatedRewards = libs.createMemo(() => {
    const rewards = rewardData()?.rewards;
    return Array.isArray(rewards) ? [...rewards].sort((a, b) => b.rarity - a.rarity) : [];
  });
  const levelRewards = libs.createMemo(() => accumulatedRewards().filter(reward => reward.layer === state()?.level));
  const levelRewardsTitle = libs.createMemo(() => {
    const title = GetLocalization("#HuntBossIntermission_LevelRewards");
    const keyIntensity = state()?.key_intensities?.[String(playerID)] ?? 0;
    return keyIntensity > 0 ? title + LocalizeWithVars("#HuntBossIntermission_KeyExtraDrop", {
      intensity: keyIntensity
    }) : title;
  });
  const cumulativeRewardRows = libs.createMemo(() => {
    const rewards = accumulatedRewards();
    const rows = [];
    for (let index = 0; index < rewards.length; index += 8) rows.push(rewards.slice(index, index + 8));
    return rows;
  });
  const [now, setNow] = libs.createSignal(Game.GetGameTime());
  const timer = setInterval(() => setNow(Game.GetGameTime()), 100);
  const isIntermission = libs.createMemo(() => state()?.phase === "intermission");
  const activePlayers = libs.createMemo(() => {
    const playerIDs = state()?.active_player_ids;
    return Array.isArray(playerIDs) ? playerIDs : [];
  });
  const isParticipant = libs.createMemo(() => activePlayers().includes(playerID));
  const isReady = libs.createMemo(() => state()?.ready_player_ids?.[String(playerID)] === true);
  const remainTime = libs.createMemo(() => Math.max(0, (state()?.intermission_end_time ?? 0) - now()));
  const remainSeconds = libs.createMemo(() => Math.ceil(remainTime()));
  const intermissionDuration = libs.createMemo(() => state()?.intermission_duration ?? 30);
  const countdownProgress = libs.createMemo(() => {
    const duration = intermissionDuration();
    return duration > 0 ? Math.max(0, Math.min(100, (1 - remainTime() / duration) * 100)) : 100;
  });
  const levelText = libs.createMemo(() => LocalizeWithVars("#HuntBossIntermission_Title", {
    level: state()?.level ?? 0
  }));
  const continueText = libs.createMemo(() => isReady() ? GetLocalization("#HuntBossIntermission_Ready") : GetLocalization("#HuntBossIntermission_Continue"));
  const ready = () => {
    if (!isIntermission() || !isParticipant() || isReady()) return;
    GameEvents.SendCustomEventToServer("hunt_boss_intermission_ready", {});
  };
  const retreat = () => {
    if (!isIntermission() || !isParticipant() || isReady()) return;
    GameEvents.SendCustomEventToServer("hunt_boss_intermission_retreat", {});
  };
  libs.onCleanup(() => clearInterval(timer));
  libs.createEffect(() => {
    $.Msg(levelRewards());
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return libs.memo(() => !!isIntermission())() && isParticipant();
    },
    get children() {
      return libs.createComponent(EOM_Popup.EOM_Popup, {
        id: "HuntBossProgressPanel",
        size: "normal",
        popType: "PopupType_PopOut",
        hideClose: true,
        get title() {
          return levelText();
        },
        classList: {
          EOM_PopupMainShow: true
        },
        get children() {
          return [(() => {
            const _el$3 = libs.createElement("Panel", {
                id: "HuntBossLevelRewards"
              }, null),
              _el$4 = libs.createElement("Panel", {
                id: "HuntBossLevelRewardsHeader"
              }, _el$3),
              _el$5 = libs.createElement("Label", {
                "class": "HuntBossProgressSectionTitle",
                get text() {
                  return levelRewardsTitle();
                },
                hittest: false
              }, _el$4),
              _el$6 = libs.createElement("Image", {
                id: "HuntBossProgressRuleInfo"
              }, _el$4),
              _el$7 = libs.createElement("Panel", {
                id: "HuntBossLevelRewardList"
              }, _el$3);
            libs.insert(_el$7, libs.createComponent(libs.For, {
              get each() {
                return levelRewards();
              },
              children: reward => (() => {
                const _el$19 = libs.createElement("Panel", {
                  "class": "HuntBossLevelReward"
                }, null);
                libs.insert(_el$19, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(() => toHuntlootDisplayData(reward), {
                  get tooltipData() {
                    return toHuntlootTooltipData(reward);
                  }
                })));
                return _el$19;
              })()
            }));
            libs.effect(_p$ => {
              const _v$ = levelRewardsTitle(),
                _v$2 = GetLocalization("#HuntBossIntermission_Rule");
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "tooltip_text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$3;
          })(), (() => {
            const _el$8 = libs.createElement("Panel", {
                id: "HuntBossCumulativeRewards"
              }, null),
              _el$9 = libs.createElement("Panel", {
                id: "HuntBossCumulativeRewardsHeader"
              }, _el$8);
              libs.createElement("Image", {
                id: "HuntBossCumulativeRewardsChest",
                hittest: false
              }, _el$9);
              const _el$1 = libs.createElement("Label", {
                "class": "HuntBossProgressSectionTitle",
                get text() {
                  return GetLocalization("#HuntBossIntermission_CumulativeRewards");
                }
              }, _el$9),
              _el$10 = libs.createElement("Panel", {
                id: "HuntBossCumulativeRewardList",
                scroll: "y"
              }, _el$8);
            libs.setProp(_el$10, "scroll", "y");
            libs.insert(_el$10, libs.createComponent(libs.For, {
              get each() {
                return cumulativeRewardRows();
              },
              children: row => (() => {
                const _el$20 = libs.createElement("Panel", {
                  "class": "HuntBossCumulativeRewardRow"
                }, null);
                libs.insert(_el$20, libs.createComponent(libs.For, {
                  each: row,
                  children: reward => (() => {
                    const _el$21 = libs.createElement("Panel", {
                      "class": "HuntBossCumulativeReward"
                    }, null);
                    libs.insert(_el$21, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(() => toHuntlootDisplayData(reward), {
                      get tooltipData() {
                        return toHuntlootTooltipData(reward);
                      }
                    })));
                    return _el$21;
                  })()
                }));
                return _el$20;
              })()
            }));
            libs.effect(_$p => libs.setProp(_el$1, "text", GetLocalization("#HuntBossIntermission_CumulativeRewards"), _$p));
            return _el$8;
          })(), (() => {
            const _el$11 = libs.createElement("Panel", {
                id: "HuntBossProgressActions"
              }, null),
              _el$12 = libs.createElement("Panel", {
                "class": "HuntBossProgressAction"
              }, _el$11),
              _el$13 = libs.createElement("Label", {
                "class": "HuntBossProgressActionHint Retreat",
                get text() {
                  return GetLocalization("#HuntBossIntermission_RetreatHint");
                }
              }, _el$12),
              _el$14 = libs.createElement("Panel", {
                "class": "HuntBossProgressAction ContinueAction"
              }, _el$11),
              _el$17 = libs.createElement("Label", {
                "class": "HuntBossProgressActionHint Continue",
                get text() {
                  return GetLocalization("#HuntBossIntermission_ContinueHint");
                }
              }, _el$14);
            libs.insert(_el$12, libs.createComponent(EOM_Button.EOM_Button, {
              id: "HuntBossProgressRetreatButton",
              color: "Cancel",
              get enabled() {
                return !isReady();
              },
              get text() {
                return GetLocalization("#HuntBossIntermission_Retreat");
              },
              onactivate: retreat
            }), _el$13);
            libs.insert(_el$14, libs.createComponent(libs.Show, {
              get when() {
                return nextLevelBuffs().length > 0;
              },
              get children() {
                const _el$15 = libs.createElement("Panel", {
                    id: "HuntBossNextLevelBuffs"
                  }, null),
                  _el$16 = libs.createElement("Panel", {
                    id: "HuntBossNextLevelBuffList"
                  }, _el$15);
                libs.insert(_el$16, libs.createComponent(libs.For, {
                  get each() {
                    return nextLevelBuffs();
                  },
                  children: buff => libs.createComponent(hunt_buff_icon.HuntBuffIcon, {
                    "class": "HuntBossNextLevelBuffIcon",
                    buff: buff,
                    tooltipType: "field"
                  })
                }));
                return _el$15;
              }
            }), _el$17);
            libs.insert(_el$14, libs.createComponent(EOM_Button.EOM_Button, {
              id: "HuntBossProgressContinueButton",
              color: "Confirm",
              get enabled() {
                return !isReady();
              },
              get text() {
                return continueText();
              },
              onactivate: ready
            }), _el$17);
            libs.effect(_p$ => {
              const _v$3 = GetLocalization("#HuntBossIntermission_RetreatHint"),
                _v$4 = GetLocalization("#HuntBossIntermission_ContinueHint");
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$13, "text", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$17, "text", _v$4, _p$._v$4));
              return _p$;
            }, {
              _v$3: undefined,
              _v$4: undefined
            });
            return _el$11;
          })(), libs.createComponent(libs.Show, {
            get when() {
              return isReady();
            },
            get children() {
              const _el$18 = libs.createElement("Label", {
                id: "HuntBossProgressReadyHint",
                get text() {
                  return GetLocalization("#HuntBossIntermission_ReadyHint");
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$18, "text", GetLocalization("#HuntBossIntermission_ReadyHint"), _$p));
              return _el$18;
            }
          }), libs.createComponent(HuntBossCountdown, {
            get progress() {
              return countdownProgress();
            },
            get seconds() {
              return remainSeconds();
            }
          })];
        }
      });
    }
  });
};

const HuntBossHud = () => {
  const playerID = Players.GetLocalPlayer();
  const state = solid_utils.createNetDataSignal("hunt_boss", "state");
  const demoState = solid_utils.createPlayerNetDataSignal("common", "demo_hunt_effects");
  const isParticipant = libs.createMemo(() => {
    const playerIDs = state()?.active_player_ids;
    return Array.isArray(playerIDs) && playerIDs.includes(playerID);
  });
  const isCompleted = libs.createMemo(() => state()?.phase === "finished" && state()?.finish_reason === "Completed");
  const isVisible = libs.createMemo(() => isParticipant() && (state()?.phase === "battle" || state()?.phase === "intermission" || isCompleted()));
  const levelText = libs.createMemo(() => LocalizeWithVars("#HuntBossHudLevel", {
    level: state()?.level ?? 0
  }));
  const difficultyText = libs.createMemo(() => {
    const keyIntensity = state()?.key_intensities?.[String(playerID)];
    const keyIntensityText = keyIntensity === undefined || keyIntensity === 0 ? "" : `-${keyIntensity}`;
    return GetLocalization("PlayerInfo_Difficulty") + ` ${state()?.difficulty ?? 0}` + keyIntensityText;
  });
  const demoBuffs = libs.createMemo(() => {
    const data = demoState();
    if (data === undefined || data.hero_ent_index < 0) return [];
    const activeIDs = Array.isArray(data.active_ids) ? data.active_ids : [];
    const effects = Array.isArray(data.effects) ? data.effects : [];
    return effects.filter(effect => activeIDs.includes(effect.id)).map(effect => hunt_buff_icon.GetHuntBuffData(effect.id, effect.level)).filter(buff => buff !== undefined);
  });
  const mergeBuffs = (buffs, type) => {
    const result = Array.isArray(buffs) ? [...buffs] : [];
    for (const buff of demoBuffs()) {
      if (buff.type === type && !result.some(existing => existing.id === buff.id && (existing.level ?? 1) === buff.level)) result.push(buff);
    }
    return result;
  };
  const fixedBuffs = libs.createMemo(() => mergeBuffs(isVisible() ? state()?.fixed_buffs : undefined, 1));
  const fieldBuffs = libs.createMemo(() => mergeBuffs(isVisible() ? state()?.current_level_buffs : undefined, 2));
  const isHudVisible = libs.createMemo(() => isVisible() || demoBuffs().length > 0);
  const statusText = libs.createMemo(() => {
    switch (state()?.phase) {
      case "battle":
        return GetLocalization("#HuntBossHudStatus_Battle");
      case "intermission":
        return GetLocalization("#HuntBossHudStatus_Intermission");
      case "finished":
        return GetLocalization("#HuntBossHudStatus_Finished");
      default:
        return "";
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "HUDHuntBossRoot",
      get ["class"]() {
        return libs.classNames("CustomHudRoot", {
          Show: isHudVisible()
        });
      },
      hittest: false
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isVisible();
      },
      get children() {
        return [(() => {
          const _el$2 = libs.createElement("Panel", {
              id: "HuntBossTopCenter"
            }, null),
            _el$3 = libs.createElement("Panel", {
              id: "HuntBossHeaderRow"
            }, _el$2),
            _el$4 = libs.createElement("Panel", {
              "class": "HuntBossHeaderSlot"
            }, _el$3),
            _el$5 = libs.createElement("Panel", {
              id: "HuntBossTitleGroup"
            }, _el$4),
            _el$6 = libs.createElement("Label", {
              id: "HuntBossTitle",
              get text() {
                return GetLocalization("#HuntBossHudTitle");
              }
            }, _el$5),
            _el$7 = libs.createElement("Label", {
              id: "HuntBossDifficulty",
              get text() {
                return difficultyText();
              }
            }, _el$5),
            _el$8 = libs.createElement("Panel", {
              "class": "HuntBossHeaderSlot HuntBossLevelSlot"
            }, _el$3),
            _el$9 = libs.createElement("Label", {
              id: "HuntBossLevel",
              get text() {
                return levelText();
              }
            }, _el$8),
            _el$0 = libs.createElement("Panel", {
              "class": "HuntBossHeaderSlot"
            }, _el$3),
            _el$1 = libs.createElement("Label", {
              id: "HuntBossStatus",
              get text() {
                return statusText();
              }
            }, _el$0);
          libs.effect(_p$ => {
            const _v$ = GetLocalization("#HuntBossHudTitle"),
              _v$2 = difficultyText(),
              _v$3 = levelText(),
              _v$4 = statusText();
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$1, "text", _v$4, _p$._v$4));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined,
            _v$4: undefined
          });
          return _el$2;
        })(), libs.createComponent(HuntBossHealth, {})];
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return fixedBuffs().length > 0 || fieldBuffs().length > 0;
      },
      get children() {
        const _el$10 = libs.createElement("Panel", {
          id: "HuntBossCurrentBuffs",
          hittest: false,
          hittestchildren: true
        }, null);
        libs.insert(_el$10, libs.createComponent(libs.Show, {
          get when() {
            return fixedBuffs().length > 0;
          },
          get children() {
            const _el$11 = libs.createElement("Panel", {
              "class": "HuntBossCurrentBuffGroup",
              hittest: false
            }, null);
            libs.insert(_el$11, libs.createComponent(libs.For, {
              get each() {
                return fixedBuffs();
              },
              children: buff => libs.createComponent(hunt_buff_icon.HuntBuffIcon, {
                buff: buff,
                hittest: true
              })
            }));
            return _el$11;
          }
        }), null);
        libs.insert(_el$10, libs.createComponent(libs.Show, {
          get when() {
            return fieldBuffs().length > 0;
          },
          get children() {
            const _el$12 = libs.createElement("Panel", {
              "class": "HuntBossCurrentBuffGroup",
              hittest: false
            }, null);
            libs.insert(_el$12, libs.createComponent(libs.For, {
              get each() {
                return fieldBuffs();
              },
              children: buff => libs.createComponent(hunt_buff_icon.HuntBuffIcon, {
                buff: buff,
                tooltipType: "field",
                hittest: true
              })
            }));
            return _el$12;
          }
        }), null);
        return _el$10;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isVisible();
      },
      get children() {
        return libs.createComponent(HuntBossProgress, {});
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("CustomHudRoot", {
      Show: isHudVisible()
    }), _$p));
    return _el$;
  })();
};
libs.render(() => libs.createComponent(HuntBossHud, {}), $.GetContextPanel());