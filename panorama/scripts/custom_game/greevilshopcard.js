--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('GreevilShopCard', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Button = require('./EOM_Button.js');
var GenericPanel = require('./GenericPanel.js');
var ItemImage = require('./ItemImage.js');

function getAbilityTitle(name) {
  const key = `#DOTA_Tooltip_ability_${name}`;
  const localized = $.Localize(key);
  return localized == key ? name : localized;
}
function ensurePrefix(value, prefix) {
  return value.startsWith(prefix) ? value : prefix + value;
}
function normalizeType(type) {
  return type == 'effect' ? 'greevil_effect' : type;
}
function isNumericString(value) {
  return value != undefined && value !== '' && !Number.isNaN(Number(value));
}
function getAttributeText(attrType, value) {
  const parsedValue = Number(value);
  const numericValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
  const absValue = Math.abs(numericValue);
  let localized = $.Localize('#dota_tooltip_item_variable_' + attrType);
  if (localized == '#dota_tooltip_item_variable_' + attrType && !attrType.startsWith('item_')) {
    localized = $.Localize('#dota_tooltip_item_variable_item_' + attrType);
  }
  localized = replaceInfo(localized);
  const hasPercentSign = localized.search(/%/g) == 0;
  const startIndex = hasPercentSign ? 2 : 1;
  const name = localized.length > startIndex ? localized.substring(startIndex, localized.length) : attrType;
  return `${numericValue >= 0 ? '+' : '-'}${absValue}${hasPercentSign ? '%' : ''} ${name}`;
}
const GreevilShopCard = props => {
  const merged = libs.mergeProps$1({
    playerGreevilEnergy: 0,
    mirror: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "Id", "type", "value", "rarity", "mirror", "playerGreevilEnergy", "currency", "appearance", "soldOut", "onClick", "onactivate", "cost", "special"]);
  const playerGreevilEnergy = () => local.playerGreevilEnergy;
  const cost = () => local.cost;
  const energyNotEnough = () => playerGreevilEnergy() < cost();
  const mirror = () => local.mirror;
  const type = () => normalizeType(local.type);
  const itemName = () => ensurePrefix(local.value, 'item_equipment_');
  const cardEffectName = () => ensurePrefix(local.value, 'card_effect_');
  const traitName = () => ensurePrefix(local.value, 'trait_');
  const greevilEffectName = () => ensurePrefix(local.value, 'greevil_effect_');
  const abilityName = () => local.value;
  const attributeData = () => {
    let attrType = local.value;
    let attrValue = local.special ?? '';
    if (isNumericString(local.value) && !isNumericString(local.special)) {
      attrType = local.special ?? '';
      attrValue = local.value;
    }
    return {
      attrType: attrType.replace(/^item_/, ''),
      value: attrValue
    };
  };
  const greevilGift = libs.createMemo(() => {
    let kv = KeyValues.GreevilShopKV[local.Id];
    return kv?.Round == 1;
  });
  const attributeText = () => {
    const data = attributeData();
    if (!data.attrType) {
      return local.value;
    }
    return getAttributeText(data.attrType, data.value);
  };
  const displayText = () => {
    const t = type();
    switch (t) {
      case 'ability_card':
        {
          const localized = $.Localize('#DOTA_Tooltip_ability_mechanics_' + local.value);
          return localized == '#DOTA_Tooltip_ability_mechanics_' + local.value ? getAbilityTitle(abilityName()) : localized;
        }
      case 'equipment':
        return getAbilityTitle(itemName());
      case 'card_effect':
        return getAbilityTitle(cardEffectName());
      case 'trait':
        return getAbilityTitle(traitName());
      case 'gold':
        return $.Localize("#RuneExtraGoldGain").replace(/\$\{count\}/g, `${local.value}`);
      case 'attribute':
        return attributeText();
      case 'greevil_effect':
        return getAbilityTitle(greevilEffectName());
      default:
        return local.value;
    }
  };
  const iconData = () => {
    const t = type();
    if (greevilGift()) {
      return {
        kind: 'type',
        className: 'greevil_gift'
      };
    }
    switch (t) {
      case 'ability_card':
        return {
          kind: 'ability',
          abilityName: abilityName()
        };
      case 'equipment':
        return {
          kind: 'item',
          itemName: itemName()
        };
      case 'gold':
        return {
          kind: 'type',
          className: 'gold'
        };
      case 'attribute':
        return {
          kind: 'type',
          className: 'attribute'
        };
      case 'card_effect':
        return {
          kind: 'type',
          className: 'card_effect'
        };
      case 'trait':
        return {
          kind: 'type',
          className: 'trait'
        };
      case 'greevil_effect':
        return {
          kind: 'ability',
          abilityName: greevilEffectName()
        };
      default:
        return {
          kind: 'text',
          text: t
        };
    }
  };
  const tooltipProps = () => {
    const t = type();
    const val = local.value;
    if (t === 'equipment') {
      return {
        name: 'equipment',
        itemname: itemName(),
        showOverrideWarning: 1
      };
    } else if (t === 'gold') {
      return;
    } else if (t === 'attribute') {
      return;
    }
    return {
      name: 'greevil_card',
      type: t,
      ability_name: val
    };
  };
  let buttonRef;
  let isHovering = false;
  const handleActivate = self => {
    if (local.soldOut) return;
    if (cost() != -1 && energyNotEnough()) {
      ErrorMessage(local.currency == 'gold' ? "#dota_hud_error_not_enough_gold" : "#error_enough_greevil_energy");
      return;
    }
    local.onactivate?.(self);
  };
  libs.createEffect(prevName => {
    const tp = tooltipProps();
    if (prevName) {
      $.DispatchEvent('UIHideCustomLayoutTooltip', prevName);
    }
    if (buttonRef) {
      if (tp) {
        const path = `file://{resources}/layout/custom_game/${tp.name}.xml`;
        const params = Object.entries(tp).filter(([k]) => k !== 'name').map(([k, v]) => `${k}=${v}`).join('&');
        buttonRef.SetAttributeString('__CustomTooltipParams__', params);
        buttonRef.SetPanelEvent('onmouseover', () => {
          isHovering = true;
          $.DispatchEvent('UIShowCustomLayoutParametersTooltip', buttonRef, tp.name, path, params);
        });
        buttonRef.SetPanelEvent('onmouseout', () => {
          isHovering = false;
          $.DispatchEvent('UIHideCustomLayoutTooltip', tp.name);
        });
        if (isHovering) {
          $.DispatchEvent('UIShowCustomLayoutParametersTooltip', buttonRef, tp.name, path, params);
        }
      } else {
        buttonRef.ClearPanelEvent('onmouseover');
        buttonRef.ClearPanelEvent('onmouseout');
        isHovering = false;
      }
    }
    return tp?.name;
  });
  const rarity = () => greevilGift() ? 5 : local.rarity;
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps(others, {
    id: "GreevilShopCard",
    get classList() {
      return {
        [`Rarity${rarity()}`]: true,
        ArtifactAttribute: local.appearance == 'artifact_attribute',
        SoldOut: local.soldOut || cost() == -1,
        NotEnough: local.appearance != 'artifact_attribute' && cost() != -1 && energyNotEnough()
      };
    },
    ref(r$) {
      const _ref$ = buttonRef;
      typeof _ref$ === "function" ? _ref$(r$) : buttonRef = r$;
    },
    onactivate: handleActivate,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BG",
        get classList() {
          return {
            Mirror: mirror()
          };
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ItemBG",
        get ["class"]() {
          return iconData().kind;
        },
        get children() {
          return [libs.createElement("Panel", {
            id: "ItemBGImage"
          }, null), libs.createComponent(libs.Show, {
            get when() {
              return iconData().kind == 'ability';
            },
            get children() {
              const _el$2 = libs.createElement("DOTAAbilityImage", {
                id: "AbilityIcon",
                get abilityname() {
                  return iconData().abilityName;
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$2, "abilityname", iconData().abilityName, _$p));
              return _el$2;
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return iconData().kind == 'item';
            },
            get children() {
              return libs.createComponent(ItemImage.ItemImage, {
                id: "ItemIcon",
                get itemName() {
                  return iconData().itemName;
                },
                showtooltip: false
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return iconData().kind == 'type';
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                get className() {
                  return "TypeIcon " + iconData().className;
                },
                get children() {
                  return libs.createElement("Image", {}, null);
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return iconData().kind == 'text';
            },
            get children() {
              const _el$4 = libs.createElement("Label", {
                id: "Icon",
                get text() {
                  return iconData().text;
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$4, "text", iconData().text, _$p));
              return _el$4;
            }
          })];
        }
      }), (() => {
        const _el$5 = libs.createElement("Label", {
          id: "ValueLabel",
          get text() {
            return displayText();
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$5, "text", displayText(), _$p));
        return _el$5;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return local.appearance == 'artifact_attribute' && local.soldOut;
        },
        get children() {
          return libs.createComponent(EOM_Image.EOM_Image, {
            id: "SoldOutBanner"
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => cost() > 0)() && !greevilGift();
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CostContainer",
            get classList() {
              return {
                goldNotEnough: energyNotEnough()
              };
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "right",
                align: "center center",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "EnergyIcon",
                    get classList() {
                      return {
                        Gold: local.currency == 'gold'
                      };
                    }
                  }), libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return cost();
                    }
                  })];
                }
              });
            }
          });
        }
      })];
    }
  }));
};

exports.GreevilShopCard = GreevilShopCard;
exports.getAttributeText = getAttributeText;