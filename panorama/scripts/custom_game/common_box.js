--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('common_box', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');
var hotkey_label = require('./hotkey_label.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var common_item = require('./common_item.js');

const SectIcon = props => {
  const merged = libs.mergeProps({
    active: true,
    large: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "sectName", "active", "large", "class"]);
  const sectClass = libs.createMemo(() => libs.classNames("SectIcon", local.class, local.sectName, {
    Active: local.active ?? true,
    Large: local.large ?? false
  }));
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return sectClass();
        }
      }), null);
      libs.createElement("Image", {
        "class": "SectImage"
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return sectClass();
      }
    }), true);
    return _el$;
  })();
};

const CommonBox = props => {
  const merged = libs.mergeProps({
    showCost: false,
    showTips: true,
    entIndex: -1,
    showAutoAttribute: false
  }, props, {
    class: libs.classNames("CommonBox", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["itemName", "showCost", "cost", "entIndex", "rarity", "upgradeLevel", "hotkey"]);
  const kv = libs.createMemo(() => KeyValues.npc_items_custom[local.itemName] ?? {});
  const rarity = libs.createMemo(() => {
    if (local.rarity != undefined) return local.rarity;
    let kv = KeyValues.npc_items_custom[local.itemName];
    let rarity = toFiniteNumber(String(kv?.RarityRange).split("|")[0], 1);
    return rarity;
  });
  const upgradedRarity = libs.createMemo(() => {
    if (local.upgradeLevel != undefined && local.upgradeLevel > 0) return rarity() + local.upgradeLevel;
    return undefined;
  });
  const goldCost = libs.createMemo(() => {
    let cost = local.cost;
    if (cost != undefined) {
      return Math.max(0, cost);
    }
    return service_netdata_helper.getShopItemDisplayCost(local.entIndex, local.itemName, rarity());
  });
  const abilityDetailValues = libs.createMemo(() => {
    const values = kv()?.AbilityValues || {};
    return Object.entries(values).map(([key, value]) => {
      let label = GetLocalization(`DOTA_Tooltip_ability_${local.itemName}_${key}`, "");
      const hasPct = label.startsWith('%');
      if (hasPct) {
        label = label.slice(1);
      }
      const currentValue = GetAbilityValue(value, {
        hasPct,
        level: rarity(),
        onlyShowNowLevel: true
      });
      let upgradeValue;
      if (upgradedRarity() != undefined) {
        upgradeValue = GetAbilityValue(value, {
          hasPct,
          level: upgradedRarity(),
          onlyShowNowLevel: true
        });
      }
      return {
        key,
        label: label.startsWith('DOTA_Tooltip') ? key : label,
        value: currentValue,
        upgradeValue
      };
    }).filter(item => item.label !== "");
  });
  const commonDescription = libs.createMemo(() => {
    let description = getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}_description`, ""), kv()?.AbilityValues ?? {}, {
      level: rarity(),
      onlyShowNowLevel: true
    });
    if (kv().Access != "Bless") {
      description += getItemArrtibute(local.itemName, rarity());
    }
    return description;
  });
  const suitList = libs.createMemo(() => (kv().Suit ?? "").split("|").filter(Boolean));
  const extraTags = libs.createMemo(() => {
    const tags = [];
    if (toFiniteNumber(kv().Quantitylimit, 0) == 1) {
      tags.push(GetLocalization("#ArtifactQuantitylimit"));
    }
    if (String(kv().UpgradeGroup ?? "") != "") {
      tags.push(GetLocalization("#ArtifactGrouplimit"));
    }
    return tags;
  });
  const enoughGold = libs.createMemo(() => {
    const playerID = Players.GetLocalPlayer();
    const playerData = getNetDataKey("player_data", "resource", playerID);
    if (!playerData) return true;
    return (playerData.gold ?? 0) >= goldCost();
  });
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Panel", {
        "class": "CommonInfo"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        "class": "CommonNameRow"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        "class": "CommonName",
        html: true,
        get text() {
          return GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}`, "");
        }
      }, _el$3),
      _el$6 = libs.createElement("Panel", {
        "class": "SectList"
      }, _el$),
      _el$7 = libs.createElement("Label", {
        "class": "HeroAbility__PropertyValue AbilityCooldown",
        get text() {
          return kv()?.AbilityCooldown ?? "";
        }
      }, _el$),
      _el$8 = libs.createElement("Label", {
        "class": "HeroAbility__PropertyValue GoldCost",
        get text() {
          return goldCost();
        }
      }, _el$);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(common_item.CommonItem, {
      "class": "AbilityImage",
      get itemName() {
        return local.itemName;
      },
      get rarity() {
        return rarity();
      },
      size: "large"
    }), _el$2);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return local.hotkey;
      },
      get children() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return local.hotkey;
          },
          marginLeft: "6px",
          verticalAlign: "center",
          hittest: false,
          hittestchildren: false
        });
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(libs.For, {
      get each() {
        return extraTags();
      },
      children: tag => (() => {
        const _el$9 = libs.createElement("Label", {
          html: true,
          get ["class"]() {
            return libs.classNames("CommonExtraTag");
          },
          text: tag
        }, null);
        libs.setProp(_el$9, "text", tag);
        libs.effect(_$p => libs.setProp(_el$9, "class", libs.classNames("CommonExtraTag"), _$p));
        return _el$9;
      })()
    }), null);
    libs.insert(_el$2, libs.createComponent(hotkey_label.HotkeyLabel, {
      "class": "CommonDescription",
      html: true,
      get text() {
        return commonDescription();
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return abilityDetailValues().length > 0;
      },
      get children() {
        const _el$5 = libs.createElement("Panel", {
          "class": "HeroAbility__Details"
        }, null);
        libs.insert(_el$5, libs.createComponent(libs.For, {
          get each() {
            return abilityDetailValues();
          },
          children: detail => (() => {
            const _el$0 = libs.createElement("Panel", {
                "class": "HeroAbility__Detail"
              }, null),
              _el$1 = libs.createElement("Label", {
                html: true,
                "class": "HeroAbility__DetailLabel",
                get text() {
                  return detail.label;
                }
              }, _el$0),
              _el$10 = libs.createElement("Label", {
                html: true,
                "class": "HeroAbility__DetailValue",
                get text() {
                  return detail.value;
                }
              }, _el$0);
            libs.insert(_el$0, libs.createComponent(libs.Show, {
              get when() {
                return detail.upgradeValue != undefined;
              },
              get children() {
                return [libs.createComponent(EOM_Icon.EOM_Icon, {
                  marginLeft: "4px",
                  type: "DoubleArrowRight",
                  size: "16",
                  align: "center center",
                  color: "#70EA72"
                }), (() => {
                  const _el$11 = libs.createElement("Label", {
                    html: true,
                    marginLeft: "4px",
                    "class": "HeroAbility__DetailValue HeroAbility__UpgradeValue",
                    get text() {
                      return `<font color='#70EA72'>${detail.upgradeValue}</font>`;
                    }
                  }, null);
                  libs.setProp(_el$11, "marginLeft", "4px");
                  libs.effect(_$p => libs.setProp(_el$11, "text", `<font color='#70EA72'>${detail.upgradeValue}</font>`, _$p));
                  return _el$11;
                })()];
              }
            }), null);
            libs.effect(_p$ => {
              const _v$8 = detail.label,
                _v$9 = detail.value;
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$1, "text", _v$8, _p$._v$8));
              _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$10, "text", _v$9, _p$._v$9));
              return _p$;
            }, {
              _v$8: undefined,
              _v$9: undefined
            });
            return _el$0;
          })()
        }));
        return _el$5;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(libs.For, {
      get each() {
        return suitList();
      },
      children: sectName => libs.createComponent(SectIcon, {
        sectName: sectName,
        large: true
      })
    }));
    libs.effect(_p$ => {
      const _v$ = {
          ["Rarity" + rarity()]: true
        },
        _v$2 = GetLocalization(`#DOTA_Tooltip_ability_${local.itemName}`, ""),
        _v$3 = kv()?.AbilityCooldown != undefined,
        _v$4 = kv()?.AbilityCooldown ?? "",
        _v$5 = local.showCost && goldCost() > 0,
        _v$6 = {
          NoEnoughGold: !enoughGold()
        },
        _v$7 = goldCost();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "visible", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "visible", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$8, "classList", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$8, "text", _v$7, _p$._v$7));
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

exports.CommonBox = CommonBox;
exports.SectIcon = SectIcon;