--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var hotkey_label = require('./hotkey_label.js');
var Player = require('./Player.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var tooltip_base = require('./tooltip_base.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_GamePad.js');
require('./EOM_HotKeyDisplay.js');
require('./EOM_Button.js');
require('./EOM_TextEntry.js');

const TALENT_COLORS = {
  TITLE: "#C2AB65",
  CURRENT: "#A39C82",
  NEXT: "#67B154"
};
let root = $.GetContextPanel();
function getTalentCfg(talentName, level, playerAccountLevel, talentLevels, playerTokens, tokenCosts) {
  let cfg = {
    max_level: 1,
    attributeList: [],
    privilegeList: [],
    abilityUpgradeList: [],
    cost: [],
    unlockText: []
  };
  const talentConfig = KeyValues.hero_talent[talentName];
  const talentEffectConfig = KeyValues.hero_talent_effect;
  if (!talentEffectConfig || !talentConfig || !talentEffectConfig[talentName]) {
    return cfg;
  }
  cfg.max_level = talentConfig.max_level;
  const talentEffect = talentEffectConfig[talentName];
  const effectCfg = talentEffect[level];
  if (effectCfg != undefined) {
    if (effectCfg.attribute != undefined) {
      const [name, value] = effectCfg.attribute.split(":");
      cfg.attributeList.push(GetPropertyLocalization(name, Number(value)));
    }
    if (effectCfg.privilege_effect) {
      effectCfg.privilege_effect.split("|").forEach(privilegeID => {
        const privilegeData = KeyValues.privilege[privilegeID];
        if (privilegeData) {
          cfg.privilegeList.push(getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilegeID}`, ""), privilegeData.AbilityValues, {
            level: level,
            onlyShowNowLevel: true
          }));
        }
      });
    }
    if (effectCfg.ability_upgrade) {
      effectCfg.ability_upgrade.split("|").forEach(upgradeID => {
        const upgradeCfg = KeyValues.ability_upgrades_service[upgradeID];
        let abilityValues = {};
        if (upgradeCfg != undefined) {
          abilityValues = upgradeCfg.AbilityValues;
        }
        cfg.abilityUpgradeList.push(getKeyValueDescription(GetLocalization(`#${upgradeID}_description`), abilityValues, {
          level: level,
          onlyShowNowLevel: true
        }));
      });
    }
    const costLevel = level - 1;
    const costCfg = talentEffect[costLevel];
    if (costCfg?.talent_cost) {
      for (const cost of solid_utils.parseTokenCosts(costCfg.talent_cost)) {
        const hasEnough = (playerTokens?.[cost.name]?.amounts ?? 0) - (tokenCosts?.[cost.name] ?? 0) >= cost.value;
        cfg.cost.push({
          ...cost,
          hasEnough
        });
      }
    }
  }
  const unlockConditions = [];
  const lockLevel = effectCfg?.lock;
  if (lockLevel > 0) {
    const isMet = (playerAccountLevel ?? 0) >= lockLevel;
    const color = isMet ? "#B6A391" : "#ec5b51";
    unlockConditions.push(GetLocalization("#talent_unlock_level") + ` <font color='${color}'>${lockLevel}</font>`);
  }
  const requiresStr = talentConfig.requires;
  if (requiresStr && talentLevels) {
    const [reqTalentId, reqLevelStr] = requiresStr.split(":");
    const reqLevel = Number(reqLevelStr);
    const currentLevel = talentLevels[reqTalentId] || 0;
    const isMet = currentLevel >= reqLevel;
    const color = isMet ? "#B6A391" : "#ec5b51";
    unlockConditions.push(GetLocalization("#talent_require_level") + ` <font color='${color}'>${reqLevel}</font>`);
  }
  cfg.unlockText = unlockConditions;
  return cfg;
}
function TalentLevelDisplay(props) {
  const hasContent = props.cfg.attributeList.length > 0 || props.cfg.privilegeList.length > 0 || props.cfg.abilityUpgradeList.length > 0;
  return libs.createComponent(libs.Show, {
    when: hasContent,
    get children() {
      const _el$ = libs.createElement("Panel", {
          get ["class"]() {
            return props.className;
          },
          flowChildren: "down"
        }, null),
        _el$2 = libs.createElement("Label", {
          get color() {
            return props.titleColor;
          },
          get text() {
            return props.title;
          }
        }, _el$);
      libs.setProp(_el$, "flowChildren", "down");
      libs.insert(_el$, libs.createComponent(libs.For, {
        get each() {
          return props.cfg.attributeList;
        },
        children: attribute => (() => {
          const _el$3 = libs.createElement("Label", {
            get color() {
              return props.attributeColor;
            },
            text: attribute,
            html: true
          }, null);
          libs.setProp(_el$3, "text", attribute);
          libs.effect(_$p => libs.setProp(_el$3, "color", props.attributeColor, _$p));
          return _el$3;
        })()
      }), null);
      libs.insert(_el$, libs.createComponent(libs.For, {
        get each() {
          return props.cfg.privilegeList;
        },
        children: privilege => (() => {
          const _el$4 = libs.createElement("Label", {
            get color() {
              return props.attributeColor;
            },
            text: privilege,
            html: true
          }, null);
          libs.setProp(_el$4, "text", privilege);
          libs.effect(_$p => libs.setProp(_el$4, "color", props.attributeColor, _$p));
          return _el$4;
        })()
      }), null);
      libs.insert(_el$, libs.createComponent(libs.For, {
        get each() {
          return props.cfg.abilityUpgradeList;
        },
        children: upgrade => libs.createComponent(hotkey_label.HotkeyLabel, {
          get color() {
            return props.attributeColor;
          },
          "class": "UpgradeDescription",
          html: true,
          text: upgrade
        })
      }), null);
      libs.effect(_p$ => {
        const _v$ = props.className,
          _v$2 = props.titleColor,
          _v$3 = props.title;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "color", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$2, "text", _v$3, _p$._v$3));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined
      });
      return _el$;
    }
  });
}
function TooltipContents(props) {
  const [level, setLevel] = libs.createSignal(props.level);
  const playerAccountLevel = service_netdata_helper.usePlayerAccountLevel("hero_level");
  const [talentLevels, setTalentLevels] = libs.createSignal(JSON.parseSafe(root.GetAttributeString("talentLevels", "{}")) ?? {});
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const tokenCosts = () => JSON.parseSafe(root.GetAttributeString("tokenCosts", "{}")) ?? {};
  const cfg = libs.createMemo(() => getTalentCfg(props.talentName, level(), playerAccountLevel().level, talentLevels(), playerTokens(), tokenCosts()));
  const nextcfg = libs.createMemo(() => getTalentCfg(props.talentName, level() + 1, playerAccountLevel().level, talentLevels(), playerTokens(), tokenCosts()));
  const hasNextLevel = () => cfg().max_level > level();
  libs.onMount(() => {
    const eventID = useClientSideEvent("FreshTalentLv", data => {
      if (data.name == props.talentName) {
        setLevel(data.level ?? level());
      }
      if (data.talentLevels) {
        setTalentLevels(data.talentLevels);
      }
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(eventID);
    });
  });
  return (() => {
    const _el$5 = libs.createElement("Panel", {
        "class": "TalentTooltip"
      }, null),
      _el$6 = libs.createElement("Panel", {
        "class": "TalentTitleBar"
      }, _el$5),
      _el$7 = libs.createElement("Label", {
        "class": "TalentTitle",
        get text() {
          return `#HeroTalent_${props.talentName}`;
        }
      }, _el$6),
      _el$8 = libs.createElement("Label", {
        "class": "TalentLevel",
        get text() {
          return `${level()}/${cfg().max_level}`;
        }
      }, _el$6);
      libs.createElement("Image", {
        "class": "FeatureTagLine"
      }, _el$5);
      const _el$0 = libs.createElement("Panel", {
        "class": "TalentContent"
      }, _el$5),
      _el$1 = libs.createElement("Panel", {}, _el$0);
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return level() > 0;
      },
      get children() {
        return libs.createComponent(TalentLevelDisplay, {
          title: "#talent_tips_current_level",
          get titleColor() {
            return TALENT_COLORS.CURRENT;
          },
          get attributeColor() {
            return TALENT_COLORS.CURRENT;
          },
          get cfg() {
            return cfg();
          },
          className: "TalentLevelDisplayNoMargin"
        });
      }
    }), _el$1);
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return hasNextLevel();
      },
      get children() {
        return libs.createComponent(TalentLevelDisplay, {
          title: "#talent_tips_next_level",
          get titleColor() {
            return TALENT_COLORS.NEXT;
          },
          get attributeColor() {
            return TALENT_COLORS.NEXT;
          },
          get cfg() {
            return nextcfg();
          },
          get className() {
            return level() > 0 ? "TalentLevelDisplayWithMargin" : "TalentLevelDisplayNoMargin";
          }
        });
      }
    }), null);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return nextcfg().cost.length > 0;
      },
      get children() {
        return [libs.createElement("Image", {
          "class": "FeatureTagLine2"
        }, null), (() => {
          const _el$11 = libs.createElement("Panel", {
              marginTop: "10px",
              flowChildren: "down"
            }, null);
            libs.createElement("Label", {
              "class": "TalentCostLabel",
              text: "#talent_tips_level_cost"
            }, _el$11);
            const _el$13 = libs.createElement("Panel", {
              flowChildren: "right"
            }, _el$11);
          libs.setProp(_el$11, "marginTop", "10px");
          libs.setProp(_el$11, "flowChildren", "down");
          libs.setProp(_el$13, "flowChildren", "right");
          libs.insert(_el$13, libs.createComponent(libs.For, {
            get each() {
              return nextcfg().cost;
            },
            children: cost => (() => {
              const _el$15 = libs.createElement("Panel", {
                  flowChildren: "right",
                  marginRight: "20px"
                }, null),
                _el$16 = libs.createElement("Label", {
                  "class": "TalentCostValue",
                  get text() {
                    return cost.value;
                  },
                  get color() {
                    return cost.hasEnough ? "#B6A391" : "#ec5b51";
                  }
                }, _el$15);
              libs.setProp(_el$15, "flowChildren", "right");
              libs.setProp(_el$15, "marginRight", "20px");
              libs.insert(_el$15, libs.createComponent(Player.CurrencyIcon, {
                width: "30px",
                height: "30px",
                get tokenID() {
                  return Number(cost.name);
                }
              }), _el$16);
              libs.effect(_p$ => {
                const _v$6 = cost.value,
                  _v$7 = cost.hasEnough ? "#B6A391" : "#ec5b51";
                _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$16, "text", _v$6, _p$._v$6));
                _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$16, "color", _v$7, _p$._v$7));
                return _p$;
              }, {
                _v$6: undefined,
                _v$7: undefined
              });
              return _el$15;
            })()
          }));
          return _el$11;
        })()];
      }
    }), null);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return nextcfg().unlockText.length > 0;
      },
      get children() {
        return [libs.createElement("Image", {
          "class": "FeatureTagLine2"
        }, null), libs.createComponent(libs.For, {
          get each() {
            return nextcfg().unlockText;
          },
          children: text => (() => {
            const _el$17 = libs.createElement("Label", {
              marginTop: "10px",
              "class": "TalentCostLabel",
              html: true,
              text: text
            }, null);
            libs.setProp(_el$17, "marginTop", "10px");
            libs.setProp(_el$17, "text", text);
            return _el$17;
          })()
        })];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = `#HeroTalent_${props.talentName}`,
        _v$5 = `${level()}/${cfg().max_level}`;
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$5;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get heroID() {
      return root.GetAttributeInt("heroID", 224);
    },
    get talentName() {
      return root.GetAttributeString("talentName", "");
    },
    get level() {
      return root.GetAttributeInt("level", 0);
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root);
  root.style.padding = "-27px";
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();