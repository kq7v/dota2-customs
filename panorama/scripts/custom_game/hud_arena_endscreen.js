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
var Player = require('./Player.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var solid_utils = require('./solid_utils.js');
var common_item = require('./common_item.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');

function SortArenaDamageHeroes(heroes, tab) {
  return [...heroes].sort((left, right) => tab === "taken" ? right.totalTaken - left.totalTaken : right.totalDamage - left.totalDamage);
}
function GetArenaDamageAbilityName(key) {
  if (key === "attack") return GetLocalization("#Arena_DamageAttack");
  const token = `#DOTA_Tooltip_ability_${key}`;
  const localized = GetLocalization(token);
  return localized === token ? key.replace(/_/g, " ") : localized;
}
function GetArenaDamageHeroName(heroName) {
  const token = `#${heroName}`;
  const localized = GetLocalization(token);
  return localized === token ? heroName.replace(/^npc_dota_hero_/, "").replace(/_/g, " ") : localized;
}
function ArenaDamageDetailAbilityIcon(props) {
  if (props.abilityKey === "attack") {
    return libs.createElement("Label", {
      "class": "ArenaDamageDetailAttackIcon",
      text: "⚔"
    }, null);
  }
  if (KeyValues.bless[props.abilityKey] !== undefined || KeyValues.artifact[props.abilityKey] !== undefined) {
    return libs.createComponent(common_item.CommonItem, {
      "class": "ArenaDamageDetailAbilityIcon",
      get itemName() {
        return props.abilityKey;
      },
      showTips: true
    });
  }
  return (() => {
    const _el$2 = libs.createElement("DOTAAbilityImage", {
      "class": "ArenaDamageDetailAbilityIcon",
      get abilityname() {
        return props.abilityKey;
      },
      showtooltip: false
    }, null);
    libs.effect(_p$ => {
      const _v$ = props.abilityKey,
        _v$2 = {
          name: "hero_ability",
          abilityName: props.abilityKey,
          entIndex: -1
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "abilityname", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "customTooltip", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$2;
  })();
}
function ArenaDamageDetailHero(props) {
  const totalDamage = () => props.tab === "taken" ? props.hero.totalTaken ?? 0 : props.hero.totalDamage ?? 0;
  const heroRatio = () => Math.max(0, Math.min(100, Math.round((props.tab === "taken" ? props.hero.takenRatio ?? 0 : props.hero.ratio ?? 0) * 100)));
  return (() => {
    const _el$3 = libs.createElement("Panel", {}, null),
      _el$4 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailHeroHeader"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailHeroInfo"
      }, _el$4),
      _el$6 = libs.createElement("Label", {
        "class": "ArenaDamageDetailHeroName",
        get text() {
          return GetArenaDamageHeroName(props.hero.heroName);
        }
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailHeroValueRow"
      }, _el$5),
      _el$8 = libs.createElement("Label", {
        "class": "ArenaDamageDetailHeroDamage",
        get text() {
          return FormatNumber(totalDamage());
        }
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        "class": "ArenaDamageDetailHeroRatio",
        get text() {
          return `${heroRatio()}%`;
        }
      }, _el$7),
      _el$0 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailHeroBarTrack"
      }, _el$5),
      _el$1 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailHeroBarFill",
        get style() {
          return {
            width: `${heroRatio()}%`
          };
        }
      }, _el$0);
    libs.insert(_el$4, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
      "class": "ArenaDamageDetailHeroPortrait",
      get heroname() {
        return props.hero.heroName;
      },
      heroimagestyle: "landscape"
    }), _el$5);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return props.tab === "damage" && props.hero.abilities.length > 0;
      },
      get children() {
        const _el$10 = libs.createElement("Panel", {
          "class": "ArenaDamageDetailAbilityList"
        }, null);
        libs.insert(_el$10, libs.createComponent(libs.For, {
          get each() {
            return props.hero.abilities;
          },
          children: ability => (() => {
            const _el$11 = libs.createElement("Panel", {
                "class": "ArenaDamageDetailAbility"
              }, null),
              _el$12 = libs.createElement("Label", {
                "class": "ArenaDamageDetailAbilityName",
                get text() {
                  return GetArenaDamageAbilityName(ability.key);
                }
              }, _el$11),
              _el$13 = libs.createElement("Label", {
                "class": "ArenaDamageDetailAbilityDamage",
                get text() {
                  return FormatNumber(ability.totalDamage);
                }
              }, _el$11),
              _el$14 = libs.createElement("Label", {
                "class": "ArenaDamageDetailAbilityRatio",
                get text() {
                  return `${Math.round(ability.ratio * 100)}%`;
                }
              }, _el$11);
            libs.insert(_el$11, libs.createComponent(ArenaDamageDetailAbilityIcon, {
              get abilityKey() {
                return ability.key;
              }
            }), _el$12);
            libs.effect(_p$ => {
              const _v$8 = GetArenaDamageAbilityName(ability.key),
                _v$9 = FormatNumber(ability.totalDamage),
                _v$0 = `${Math.round(ability.ratio * 100)}%`;
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$12, "text", _v$8, _p$._v$8));
              _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$13, "text", _v$9, _p$._v$9));
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$14, "text", _v$0, _p$._v$0));
              return _p$;
            }, {
              _v$8: undefined,
              _v$9: undefined,
              _v$0: undefined
            });
            return _el$11;
          })()
        }));
        return _el$10;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = {
          ArenaDamageDetailHero: true,
          Opponent: props.opponent === true
        },
        _v$4 = GetArenaDamageHeroName(props.hero.heroName),
        _v$5 = FormatNumber(totalDamage()),
        _v$6 = `${heroRatio()}%`,
        _v$7 = {
          width: `${heroRatio()}%`
        };
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "classList", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$9, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$1, "style", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$3;
  })();
}
function ArenaDamageDetail(props) {
  const [tab, setTab] = libs.createSignal("damage");
  const selfHeroes = libs.createMemo(() => SortArenaDamageHeroes(props.self?.heroes ?? [], tab()));
  const opponentHeroes = libs.createMemo(() => SortArenaDamageHeroes(props.opponent?.heroes ?? [], tab()));
  const selfTotal = () => (tab() === "taken" ? props.self?.totalTaken : props.self?.totalDamage) ?? 0;
  const opponentTotal = () => (tab() === "taken" ? props.opponent?.totalTaken : props.opponent?.totalDamage) ?? 0;
  return (() => {
    const _el$15 = libs.createElement("Panel", {
        id: "ArenaDamageDetailOverlay",
        hittest: true
      }, null);
      libs.createElement("Panel", {
        id: "ArenaDamageDetailBackdrop"
      }, _el$15);
      const _el$17 = libs.createElement("Panel", {
        id: "ArenaDamageDetailContainer",
        hittest: true
      }, _el$15),
      _el$18 = libs.createElement("Panel", {
        id: "ArenaDamageDetailTitle"
      }, _el$17),
      _el$19 = libs.createElement("Label", {
        id: "ArenaDamageDetailTitleText",
        get text() {
          return GetLocalization("#Arena_DamageReport");
        }
      }, _el$18),
      _el$20 = libs.createElement("Panel", {
        id: "ArenaDamageDetailContent"
      }, _el$17),
      _el$21 = libs.createElement("Panel", {
        id: "ArenaDamageDetailPlayerSummary"
      }, _el$20),
      _el$22 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailPlayerTotal"
      }, _el$21),
      _el$23 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailPlayerInfo"
      }, _el$22),
      _el$24 = libs.createElement("Label", {
        "class": "ArenaDamageDetailTotalDamage",
        get text() {
          return FormatNumber(selfTotal());
        }
      }, _el$23),
      _el$25 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailPlayerTotal Opponent"
      }, _el$21),
      _el$26 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailPlayerInfo"
      }, _el$25),
      _el$27 = libs.createElement("Label", {
        "class": "ArenaDamageDetailTotalDamage",
        get text() {
          return FormatNumber(opponentTotal());
        }
      }, _el$26),
      _el$28 = libs.createElement("Panel", {
        id: "ArenaDamageDetailColumns"
      }, _el$20),
      _el$29 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailColumn"
      }, _el$28),
      _el$30 = libs.createElement("Panel", {
        "class": "ArenaDamageDetailColumn Opponent"
      }, _el$28);
    libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_CloseButton, {
      id: "ArenaDamageDetailClose",
      get onactivate() {
        return props.onclose;
      }
    }), _el$20);
    libs.insert(_el$20, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
      id: "ArenaDamageDetailTabs",
      get list() {
        return [GetLocalization("#Arena_DamageDealt"), GetLocalization("#Arena_DamageTaken")];
      },
      get selected() {
        return tab() === "damage" ? 1 : 2;
      },
      onChange: index => setTab(index === 0 ? "damage" : "taken")
    }), _el$21);
    libs.insert(_el$22, libs.createComponent(Player.PlayerAvatar, {
      "class": "ArenaDamageDetailPlayerAvatar",
      get accountid() {
        return props.self?.uid;
      }
    }), _el$23);
    libs.insert(_el$23, libs.createComponent(Player.PlayerName, {
      "class": "ArenaDamageDetailPlayerName",
      get accountid() {
        return props.self?.uid;
      },
      showgGild: false
    }), _el$24);
    libs.insert(_el$25, libs.createComponent(Player.PlayerAvatar, {
      "class": "ArenaDamageDetailPlayerAvatar",
      get accountid() {
        return props.opponent?.uid;
      }
    }), _el$26);
    libs.insert(_el$26, libs.createComponent(Player.PlayerName, {
      "class": "ArenaDamageDetailPlayerName",
      get accountid() {
        return props.opponent?.uid;
      },
      showgGild: false
    }), _el$27);
    libs.insert(_el$29, libs.createComponent(libs.For, {
      get each() {
        return selfHeroes();
      },
      children: hero => libs.createComponent(ArenaDamageDetailHero, {
        hero: hero,
        get tab() {
          return tab();
        }
      })
    }));
    libs.insert(_el$30, libs.createComponent(libs.For, {
      get each() {
        return opponentHeroes();
      },
      children: hero => libs.createComponent(ArenaDamageDetailHero, {
        hero: hero,
        opponent: true,
        get tab() {
          return tab();
        }
      })
    }));
    libs.effect(_p$ => {
      const _v$1 = GetLocalization("#Arena_DamageReport"),
        _v$10 = FormatNumber(selfTotal()),
        _v$11 = FormatNumber(opponentTotal());
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$19, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$24, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$27, "text", _v$11, _p$._v$11));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined
    });
    return _el$15;
  })();
}

const totalBattleCount = 5;
const resultParticleName = ["particles/ui/game/ui_game_settlement_interface_01_fx.vpcf", "particles/ui/game/ui_game_settlement_interface_02_fx.vpcf"];
function ArenaResultMetric(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "ArenaResultMetric"
      }, null);
      libs.createElement("Panel", {
        "class": "ArenaResultMetricBackground",
        hittest: false
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        "class": "ArenaResultMetricContent"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        "class": "ArenaResultMetricHeader"
      }, _el$3),
      _el$5 = libs.createElement("Label", {
        "class": "ArenaResultMetricLabel",
        get text() {
          return props.label;
        }
      }, _el$4);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return props.delta !== 0;
      },
      get children() {
        const _el$6 = libs.createElement("Label", {
          get text() {
            return `${props.delta > 0 ? "+" : ""}${props.delta}`;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$ = {
              ArenaResultMetricDelta: true,
              Gain: props.delta > 0,
              Loss: props.delta < 0
            },
            _v$2 = `${props.delta > 0 ? "+" : ""}${props.delta}`;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "classList", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$6;
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return props.delta !== 0;
      },
      get fallback() {
        return (() => {
          const _el$1 = libs.createElement("Label", {
            "class": "ArenaResultMetricFinalValue",
            get text() {
              return `${props.after}`;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$1, "text", `${props.after}`, _$p));
          return _el$1;
        })();
      },
      get children() {
        const _el$7 = libs.createElement("Panel", {
            "class": "ArenaResultMetricChange"
          }, null),
          _el$8 = libs.createElement("Label", {
            "class": "ArenaResultMetricBefore",
            get text() {
              return `${props.before}`;
            }
          }, _el$7);
          libs.createElement("Label", {
            "class": "ArenaResultMetricArrow",
            text: "→"
          }, _el$7);
          const _el$0 = libs.createElement("Label", {
            "class": "ArenaResultMetricAfter",
            get text() {
              return `${props.after}`;
            }
          }, _el$7);
        libs.effect(_p$ => {
          const _v$3 = `${props.before}`,
            _v$4 = `${props.after}`;
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "text", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$7;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$5, "text", props.label, _$p));
    return _el$;
  })();
}
function ArenaFormation(props) {
  const heroes = libs.createMemo(() => props.player?.heroes.slice(0, 4) ?? []);
  return (() => {
    const _el$10 = libs.createElement("Panel", {}, null),
      _el$11 = libs.createElement("Panel", {
        "class": "ArenaFormationTeamTitle"
      }, _el$10);
      libs.createElement("Image", {
        id: "LineLeft"
      }, _el$11);
      const _el$13 = libs.createElement("Image", {
        id: "LineRight"
      }, _el$11);
    libs.insert(_el$11, libs.createComponent(Player.PlayerName, {
      classList: {
        ArenaFormationTeamLabel: true
      },
      get accountid() {
        return props.player?.uid;
      },
      showgGild: false
    }), _el$13);
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return heroes().length > 0;
      },
      get fallback() {
        return (() => {
          const _el$15 = libs.createElement("Label", {
            "class": "ArenaFormationEmpty",
            get text() {
              return GetLocalization("#Arena_DamageNoData");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$15, "text", GetLocalization("#Arena_DamageNoData"), _$p));
          return _el$15;
        })();
      },
      get children() {
        const _el$14 = libs.createElement("Panel", {
          "class": "ArenaFormationHeroList"
        }, null);
        libs.insert(_el$14, libs.createComponent(libs.For, {
          get each() {
            return heroes();
          },
          children: (hero, index) => (() => {
            const _el$16 = libs.createElement("Panel", {}, null),
              _el$17 = libs.createElement("Panel", {
                "class": "ArenaFormationHeroModel"
              }, _el$16);
            libs.insert(_el$17, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
              get unit() {
                return hero.heroName;
              },
              camera: "half"
            }));
            libs.insert(_el$16, libs.createComponent(libs.Show, {
              get when() {
                return props.defeated;
              },
              get children() {
                return libs.createElement("Panel", {
                  "class": "ArenaFormationHeroKilled"
                }, null);
              }
            }), null);
            libs.insert(_el$16, libs.createComponent(libs.Show, {
              get when() {
                return hero.totalDamage > 0 || hero.totalTaken > 0;
              },
              get children() {
                const _el$19 = libs.createElement("Panel", {
                    "class": "ArenaFormationHeroStats"
                  }, null),
                  _el$20 = libs.createElement("Panel", {
                    "class": "ArenaFormationHeroStatGroup"
                  }, _el$19),
                  _el$26 = libs.createElement("Panel", {
                    "class": "ArenaFormationHeroStatGroup"
                  }, _el$19);
                libs.insert(_el$20, libs.createComponent(libs.Show, {
                  get when() {
                    return hero.totalDamage > 0;
                  },
                  get children() {
                    return [(() => {
                      const _el$21 = libs.createElement("Panel", {
                          "class": "ArenaFormationHeroValue"
                        }, null);
                        libs.createElement("Panel", {
                          "class": "ArenaFormationHeroValueIcon"
                        }, _el$21);
                        const _el$23 = libs.createElement("Label", {
                          "class": "ArenaFormationHeroDamage",
                          get text() {
                            return FormatNumber(hero.totalDamage);
                          }
                        }, _el$21);
                      libs.effect(_$p => libs.setProp(_el$23, "text", FormatNumber(hero.totalDamage), _$p));
                      return _el$21;
                    })(), (() => {
                      const _el$24 = libs.createElement("Panel", {
                          "class": "ArenaFormationHeroBarTrack"
                        }, null),
                        _el$25 = libs.createElement("Panel", {
                          "class": "ArenaFormationHeroBarFill",
                          get style() {
                            return {
                              width: hero.ratio > 0 ? `${Math.max(3, Math.round(hero.ratio * 100))}%` : "0%"
                            };
                          }
                        }, _el$24);
                      libs.effect(_$p => libs.setProp(_el$25, "style", {
                        width: hero.ratio > 0 ? `${Math.max(3, Math.round(hero.ratio * 100))}%` : "0%"
                      }, _$p));
                      return _el$24;
                    })()];
                  }
                }));
                libs.insert(_el$26, libs.createComponent(libs.Show, {
                  get when() {
                    return hero.totalTaken > 0;
                  },
                  get children() {
                    return [(() => {
                      const _el$27 = libs.createElement("Panel", {
                          "class": "ArenaFormationHeroValue Taken"
                        }, null);
                        libs.createElement("Panel", {
                          "class": "ArenaFormationHeroValueIcon Taken"
                        }, _el$27);
                        const _el$29 = libs.createElement("Label", {
                          "class": "ArenaFormationHeroDamage Taken",
                          get text() {
                            return FormatNumber(hero.totalTaken);
                          }
                        }, _el$27);
                      libs.effect(_$p => libs.setProp(_el$29, "text", FormatNumber(hero.totalTaken), _$p));
                      return _el$27;
                    })(), (() => {
                      const _el$30 = libs.createElement("Panel", {
                          "class": "ArenaFormationHeroBarTrack"
                        }, null),
                        _el$31 = libs.createElement("Panel", {
                          "class": "ArenaFormationHeroBarFill Taken",
                          get style() {
                            return {
                              width: hero.takenRatio > 0 ? `${Math.max(3, Math.round(hero.takenRatio * 100))}%` : "0%"
                            };
                          }
                        }, _el$30);
                      libs.effect(_$p => libs.setProp(_el$31, "style", {
                        width: hero.takenRatio > 0 ? `${Math.max(3, Math.round(hero.takenRatio * 100))}%` : "0%"
                      }, _$p));
                      return _el$30;
                    })()];
                  }
                }));
                return _el$19;
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$16, "classList", {
              ArenaFormationHero: true,
              [`Hero${index()}`]: true
            }, _$p));
            return _el$16;
          })()
        }));
        return _el$14;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$10, "classList", {
      ArenaFormationTeam: true,
      Self: props.opponent !== true,
      Opponent: props.opponent === true,
      Defeated: props.defeated === true
    }, _$p));
    return _el$10;
  })();
}
function ArenaEndScreen() {
  const session = solid_utils.createPlayerNetDataSignal("arena", "session");
  const result = solid_utils.createPlayerNetDataSignal("arena", "result");
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const [step, setStep] = libs.createSignal(1);
  const [showDamageDetail, setShowDamageDetail] = libs.createSignal(false);
  const isShowing = libs.createMemo(() => session()?.phase === "result" && result() !== undefined);
  const victory = libs.createMemo(() => result()?.result === "win");
  let revealMetricsSchedule;
  let revealReportSchedule;
  const rankDelta = libs.createMemo(() => {
    const rank = result()?.pvpRank;
    return rank === undefined ? undefined : rank.before - rank.after;
  });
  const remainingBattleCount = libs.createMemo(() => Math.max(0, totalBattleCount - (playerCounters()["daily_pvp_play"]?.count ?? 0)));
  const canRematch = libs.createMemo(() => remainingBattleCount() > 0);
  const battleHintText = libs.createMemo(() => LocalizeWithVars("#LadderBattle_BattleCount", {
    allowCount: remainingBattleCount(),
    totalCount: totalBattleCount
  }));
  const scoreDelta = libs.createMemo(() => {
    const score = result()?.pvpScore;
    return score === undefined ? undefined : score.after - score.before;
  });
  const resultDamagePlayers = libs.createMemo(() => {
    const players = result()?.damage?.players ?? [];
    const opponentUID = result()?.opponentID;
    const opponent = players.find(player => player.uid === opponentUID);
    return {
      opponent,
      self: players.find(player => player.uid !== opponentUID) ?? (opponent === undefined ? players[0] : undefined)
    };
  });
  const clearRevealSchedules = () => {
    if (revealMetricsSchedule !== undefined) {
      $.CancelScheduled(revealMetricsSchedule);
      revealMetricsSchedule = undefined;
    }
    if (revealReportSchedule !== undefined) {
      $.CancelScheduled(revealReportSchedule);
      revealReportSchedule = undefined;
    }
  };
  libs.createEffect(libs.on(isShowing, showing => {
    clearRevealSchedules();
    setStep(1);
    if (!showing) setShowDamageDetail(false);
    if (!showing) return;
    revealMetricsSchedule = $.Schedule(0.9, () => {
      revealMetricsSchedule = undefined;
      if (isShowing()) setStep(2);
    });
    revealReportSchedule = $.Schedule(1.55, () => {
      revealReportSchedule = undefined;
      if (isShowing()) setStep(3);
    });
  }));
  libs.onCleanup(clearRevealSchedules);
  return (() => {
    const _el$32 = libs.createElement("Panel", {
      id: "ArenaEndScreenRoot",
      hittest: false
    }, null);
    libs.insert(_el$32, libs.createComponent(libs.Show, {
      get when() {
        return isShowing();
      },
      get children() {
        return [libs.createElement("Image", {
          id: "Background"
        }, null), (() => {
          const _el$34 = libs.createElement("Panel", {
              id: "ResultMedal",
              hittest: false
            }, null),
            _el$35 = libs.createElement("Panel", {
              id: "ResultIcon"
            }, _el$34);
          libs.insert(_el$34, () => libs.createMemo(libs.on(victory, win => (() => {
            const _el$41 = libs.createElement("DOTAParticleScenePanel", {
              id: "ResultParticle",
              get particleName() {
                return win ? resultParticleName[0] : resultParticleName[1];
              },
              cameraOrigin: "0 0 50",
              fov: 90,
              lookAt: "0 0 0",
              hittest: false,
              squarePixels: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$41, "particleName", win ? resultParticleName[0] : resultParticleName[1], _$p));
            return _el$41;
          })())), _el$35);
          return _el$34;
        })(), (() => {
          const _el$36 = libs.createElement("Panel", {
              "class": "ArenaResult",
              hittest: true
            }, null),
            _el$37 = libs.createElement("Panel", {
              "class": "ArenaResultMetrics"
            }, _el$36);
          libs.insert(_el$36, libs.createComponent(ArenaFormation, {
            get player() {
              return resultDamagePlayers().self;
            },
            get defeated() {
              return result()?.result === "lose";
            }
          }), _el$37);
          libs.insert(_el$37, libs.createComponent(libs.Show, {
            get when() {
              return libs.memo(() => result()?.pvpScore !== undefined)() && scoreDelta() !== undefined;
            },
            get children() {
              return libs.createComponent(ArenaResultMetric, {
                get label() {
                  return GetLocalization("#Arena_PvpScore");
                },
                get before() {
                  return result()?.pvpScore?.before ?? 0;
                },
                get after() {
                  return result()?.pvpScore?.after ?? 0;
                },
                get delta() {
                  return scoreDelta() ?? 0;
                }
              });
            }
          }), null);
          libs.insert(_el$37, libs.createComponent(libs.Show, {
            get when() {
              return libs.memo(() => result()?.pvpRank !== undefined)() && rankDelta() !== undefined;
            },
            get children() {
              return libs.createComponent(ArenaResultMetric, {
                get label() {
                  return GetLocalization("#LadderChart_LadderNumber");
                },
                get before() {
                  return result()?.pvpRank?.before ?? 0;
                },
                get after() {
                  return result()?.pvpRank?.after ?? 0;
                },
                get delta() {
                  return rankDelta() ?? 0;
                }
              });
            }
          }), null);
          libs.insert(_el$37, libs.createComponent(EOM_Button.EOM_Button, {
            marginTop: "50px",
            horizontalAlign: "center",
            "class": "ArenaResultButton",
            size: "Small",
            get text() {
              return GetLocalization("#Arena_DamageReport");
            },
            onactivate: () => setShowDamageDetail(true)
          }), null);
          libs.insert(_el$36, libs.createComponent(ArenaFormation, {
            get player() {
              return resultDamagePlayers().opponent;
            },
            opponent: true,
            get defeated() {
              return result()?.result === "win";
            }
          }), null);
          return _el$36;
        })(), (() => {
          const _el$38 = libs.createElement("Panel", {
            "class": "ArenaResultActions",
            hittest: true
          }, null);
          libs.insert(_el$38, libs.createComponent(libs.Show, {
            get when() {
              return canRematch();
            },
            get children() {
              const _el$39 = libs.createElement("Panel", {
                  "class": "ArenaRematchAction"
                }, null),
                _el$40 = libs.createElement("Label", {
                  "class": "ArenaRematchCount",
                  get text() {
                    return battleHintText();
                  }
                }, _el$39);
              libs.insert(_el$39, libs.createComponent(EOM_Button.EOM_Button, {
                "class": "ArenaSecondaryButton",
                get text() {
                  return GetLocalization("#Arena_Rematch");
                },
                onactivate: () => GameEvents.SendCustomEventToServer("arena_rematch", {})
              }), null);
              libs.effect(_$p => libs.setProp(_el$40, "text", battleHintText(), _$p));
              return _el$39;
            }
          }), null);
          libs.insert(_el$38, libs.createComponent(EOM_Button.EOM_Button, {
            "class": "ArenaSecondaryButton",
            color: "Green",
            get text() {
              return GetLocalization("#Arena_Exit");
            },
            onactivate: () => {
              GameEvents.SendCustomEventToServer("arena_exit", {});
              JumpToMenu({
                window_name: "rank",
                menu: "Ladder",
                menu2: "ladder_lobby",
                force: true
              });
            }
          }), null);
          return _el$38;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return showDamageDetail();
          },
          get children() {
            return libs.createComponent(ArenaDamageDetail, {
              get self() {
                return resultDamagePlayers().self;
              },
              get opponent() {
                return resultDamagePlayers().opponent;
              },
              onclose: () => setShowDamageDetail(false)
            });
          }
        })];
      }
    }));
    libs.effect(_$p => libs.setProp(_el$32, "classList", {
      Show: isShowing(),
      Victory: result()?.result === "win",
      Defeat: result()?.result === "lose",
      Step1: step() === 1,
      Step2: step() === 2,
      Step3: step() === 3
    }, _$p));
    return _el$32;
  })();
}
libs.render(() => libs.createComponent(ArenaEndScreen, {}), $.GetContextPanel());
print("ArenaEndScreen loaded 1 ");