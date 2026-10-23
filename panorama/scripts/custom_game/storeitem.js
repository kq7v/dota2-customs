--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('StoreItem', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_ImageNumber = require('./EOM_ImageNumber.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');
var equipment_utils = require('./equipment_utils.js');

const StoreItem = props => {
  const language = Language();
  const itemData = () => KeyValues.info_shop_product[props.itemid];
  const player_ornament = solid_utils.createServiceNetData("player_ornament", {});
  const player_couriers = solid_utils.createServiceNetData("player_couriers", {});
  const player_blessings = solid_utils.createServiceNetData("player_blessings", {});
  const player_collections = solid_utils.createServiceNetData("player_collections", {});
  const player_privileges = solid_utils.createPlayerNetDataSignal("common", "player_privileges", {});
  let purchased_num = libs.createMemo(() => {
    let data = itemData();
    let items = data.items ?? {};
    let itemList = Object.keys(items);
    let purchased_num = props.purchased_num ?? 0;
    let use_purchased_num = data.use_purchased_num ?? 0;
    if (use_purchased_num == 0) {
      let star = 0;
      itemList.map(item_id => {
        if (player_couriers()[item_id]) {
          star += (player_couriers()[item_id]?.star ?? 0) + (player_couriers()[item_id]?.extra_star_exp ?? 0);
        }
      });
      if (star > 0) {
        return star;
      }
      const hasBlessing = itemList.some(item_id => {
        if (GetPropType(item_id) != PropType.Bless) return false;
        const blessing = player_blessings()[GetBuffIdFromItemId(item_id)];
        return blessing?.permanent || (blessing?.expire_time ?? 0) > Date.now() / 1000;
      });
      if (hasBlessing) {
        return data.limit_count;
      }
    }
    return purchased_num;
  });
  const memoData = libs.createMemo(() => {
    let data = itemData();
    let isNeedBuff = data.effect_condition != undefined && data.effect_condition != "";
    let price = data.real_price;
    let origin_price = data.origin_price;
    if (data.pay_type == 0) {
      if (language == "english") {
        price = data.overseas_realprice;
        origin_price = data.overseas_originprice;
      } else if (language == "russian") {
        price = data.russia_realprice;
        origin_price = data.russia_originprice;
      }
    }
    let items = data.items ?? {};
    let itemList = Object.keys(items);
    let itemCount = itemList.length == 1 ? items[itemList[0]] ?? 1 : 1;
    let limited = data.limit_type > 0 && purchased_num() >= data.limit_count;
    let hasBuffCondition = false;
    if (isNeedBuff) {
      hasBuffCondition = HasStorePrivilege(data.effect_condition, player_privileges());
    }
    let hasBundleBuff = HasStoreProductPrivileges(data, player_privileges()) && data.show_type == 1;
    let hasCosmetic = itemList.some(item_id => player_ornament()[item_id] != undefined);
    return {
      price,
      origin_price,
      itemCount,
      limited,
      hasBuffCondition,
      hasBundleBuff,
      isNeedBuff,
      hasCosmetic
    };
  });
  const endTime = libs.createMemo(() => {
    const et = props.endTime ?? itemData().end_time;
    if ((!et || et == 0) && itemData().hide_time) {
      return itemData().hide_time;
    }
    return et;
  });
  const conditionIconID = libs.createMemo(() => GetPrivilegeIconIDByCondition(itemData().effect_condition));
  let freeLabel = libs.createMemo(() => {
    if (memoData().isNeedBuff && !memoData().hasBuffCondition && conditionIconID() != undefined) {
      return "#Store_Buff" + conditionIconID();
    }
    return "#Store_Free_Button";
  });
  const isFree = libs.createMemo(() => {
    return memoData().price == 0;
  });
  let limitLabel = libs.createMemo(() => {
    if (memoData().hasBundleBuff && !memoData().limited) {
      return "#Store_HasBuff";
    }
    if (memoData().hasCosmetic && !memoData().limited) {
      return "#Store_HasCosmetic";
    }
    return "#Store_LimitCount" + itemData().limit_type;
  });
  let buyLimit = libs.createMemo(() => {
    return itemData().limit_type != 0 && purchased_num() >= itemData().limit_count;
  });
  const src = libs.createMemo(() => {
    let imgName = props.itemid.toString();
    if (itemData().img != undefined && itemData().img != "") {
      imgName = itemData().img;
    }
    return getSrcPath("store_items/" + imgName + ".png");
  });
  const buffIconID = libs.createMemo(() => {
    return GetStoreProductPrivilegeIconID(itemData());
  });
  const buffIconSrc = libs.createMemo(() => {
    const iconID = buffIconID();
    if (iconID == undefined) {
      return "";
    }
    return getSrcPath(`tokens/${iconID}.png`);
  });
  const customTooltip = libs.createMemo(() => {
    if (props.hideTips) {
      return undefined;
    }
    return getStoreProductTooltipData(itemData(), props.itemid, src(), player_collections);
  });
  const merged = libs.mergeProps({
    enable: true,
    btnDisable: false
  }, props);
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("StoreItemMain", {
            "Free": isFree(),
            "Limit": memoData().limited,
            "purchased": props.purchased_num,
            "HasBoundleBuff": memoData().hasBundleBuff
          });
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("StoreItem", "Rarity" + itemData().rarity);
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "ItemName",
        get text() {
          return "#" + props.itemid;
        }
      }, _el$2);
      libs.createElement("Image", {
        id: "SplitLine"
      }, _el$2);
      const _el$5 = libs.createElement("Image", {
        id: "ItemImage",
        get src() {
          return src();
        },
        scaling: "stretch-to-cover-preserve-aspect"
      }, _el$2),
      _el$6 = libs.createElement("Label", {
        id: "ItemCount",
        get text() {
          return "×" + memoData().itemCount;
        }
      }, _el$2),
      _el$7 = libs.createElement("Panel", {
        id: "LimitInfo"
      }, _el$2),
      _el$8 = libs.createElement("Label", {
        get text() {
          return limitLabel();
        },
        get vars() {
          return {
            num: purchased_num(),
            max: itemData().limit_count
          };
        },
        html: true
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        id: "FirstPayDesc",
        get text() {
          return "#" + props.itemid + "_first_pay";
        }
      }, _el$2),
      _el$0 = libs.createElement("Panel", {
        id: "DiscountNum"
      }, _el$),
      _el$1 = libs.createElement("Panel", {
        "class": "Rotate15"
      }, _el$0),
      _el$10 = libs.createElement("Panel", {
        id: "OffSign"
      }, _el$1),
      _el$11 = libs.createElement("Image", {
        id: "FirstPayLabel"
      }, _el$),
      _el$17 = libs.createElement("Image", {
        id: "RedPoint"
      }, _el$),
      _el$18 = libs.createElement("Image", {
        id: "BuffIcon",
        get src() {
          return buffIconSrc();
        }
      }, _el$);
    libs.setProp(_el$, "onmouseover", p => showStoreItemTooltip(p, customTooltip()));
    libs.setProp(_el$, "onmouseout", p => hideStoreItemTooltip(p, customTooltip()));
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!endTime())() && endTime() != 0;
      },
      get children() {
        return libs.createComponent(EOM_Countdown.EOM_Countdown, {
          get endTime() {
            return endTime();
          },
          text: "#StoreCountdownTime"
        });
      }
    }), _el$7);
    libs.insert(_el$1, libs.createComponent(EOM_ImageNumber.EOM_ImageNumber, {
      get value() {
        return itemData().discount;
      },
      type: "7",
      percentSign: true
    }), _el$10);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return !props.priceBtnHide;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          id: "PriceBtn",
          get color() {
            return isFree() ? "Green" : "Gold";
          },
          get enabled() {
            return !buyLimit() && !merged.btnDisable && (props.enable ?? true);
          },
          onactivate: () => {
            let {
              limited,
              price
            } = memoData();
            if (limited || merged.btnDisable) {
              return;
            }
            if (memoData().isNeedBuff && !memoData().hasBuffCondition) {
              const item_id = GetStorePrivilegeProductID(itemData().effect_condition);
              const icon_id = conditionIconID();
              if (item_id == undefined || icon_id == undefined) {
                return;
              }
              CustomUIConfig.showPopup("CommonConfirm", {
                text: LocalizeWithVars("#Go_To_Buy_Buff", {
                  item: GetLocalization("#" + item_id)
                }),
                title: "#Store_Buff" + icon_id,
                onconfirm: () => {
                  ClientSideEvent("store_jump_to_privilege_item", {
                    itemid: item_id
                  });
                }
              });
              return;
            }
            if (memoData().hasBundleBuff) {
              return "#Store_HasBuff";
            }
            if (memoData().hasCosmetic) {
              return "#Store_HasCosmetic";
            }
            Game.EmitSound("UI.Store.Click");
            ShowPopup("StoreBuyItem", {
              itemData: itemData(),
              purchased_num: props.purchased_num,
              group: "StoreBuyItem"
            });
            GameUI.CustomUIConfig().ReportClick("product|" + itemData().id, "store|click");
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return !buyLimit();
              },
              get fallback() {
                return libs.createElement("Label", {
                  text: "#Store_Sold"
                }, null);
              },
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return merged.btnDisableText == undefined;
                  },
                  get fallback() {
                    return (() => {
                      const _el$20 = libs.createElement("Label", {
                        get text() {
                          return merged.btnDisableText;
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$20, "text", merged.btnDisableText, _$p));
                      return _el$20;
                    })();
                  },
                  get children() {
                    const _el$12 = libs.createElement("Panel", {
                        id: "PriceDisplay",
                        align: "center center",
                        flowChildren: "right"
                      }, null),
                      _el$13 = libs.createElement("Panel", {
                        id: "CurrentPrice",
                        horizontalAlign: "center",
                        flowChildren: "right"
                      }, _el$12),
                      _el$14 = libs.createElement("Label", {
                        id: "CostLabel",
                        get text() {
                          return memoData().price;
                        }
                      }, _el$13),
                      _el$15 = libs.createElement("Label", {
                        id: "CostOriginPriceLabel",
                        get text() {
                          return memoData().origin_price;
                        }
                      }, _el$12),
                      _el$16 = libs.createElement("Label", {
                        id: "FreeLabel",
                        get text() {
                          return freeLabel();
                        }
                      }, _el$12);
                    libs.setProp(_el$12, "align", "center center");
                    libs.setProp(_el$12, "flowChildren", "right");
                    libs.setProp(_el$13, "horizontalAlign", "center");
                    libs.setProp(_el$13, "flowChildren", "right");
                    libs.insert(_el$13, libs.createComponent(Player.CurrencyIcon, {
                      get tokenID() {
                        return itemData().pay_type;
                      }
                    }), _el$14);
                    libs.effect(_p$ => {
                      const _v$ = memoData().price,
                        _v$2 = memoData().price != 0 && memoData().price != memoData().origin_price,
                        _v$3 = memoData().origin_price,
                        _v$4 = freeLabel();
                      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$14, "text", _v$, _p$._v$));
                      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$15, "visible", _v$2, _p$._v$2));
                      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "text", _v$3, _p$._v$3));
                      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "text", _v$4, _p$._v$4));
                      return _p$;
                    }, {
                      _v$: undefined,
                      _v$2: undefined,
                      _v$3: undefined,
                      _v$4: undefined
                    });
                    return _el$12;
                  }
                });
              }
            });
          }
        });
      }
    }), _el$17);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames("StoreItemMain", {
          "Free": isFree(),
          "Limit": memoData().limited,
          "purchased": props.purchased_num,
          "HasBoundleBuff": memoData().hasBundleBuff
        }),
        _v$6 = merged.enable,
        _v$7 = libs.classNames("StoreItem", "Rarity" + itemData().rarity),
        _v$8 = "#" + props.itemid,
        _v$9 = src(),
        _v$0 = "×" + memoData().itemCount,
        _v$1 = memoData().itemCount > 1,
        _v$10 = itemData().limit_type != 0,
        _v$11 = limitLabel(),
        _v$12 = {
          num: purchased_num(),
          max: itemData().limit_count
        },
        _v$13 = itemData().first_pay == 1 && (props.purchased_num ?? 0) == 0,
        _v$14 = "#" + props.itemid + "_first_pay",
        _v$15 = itemData().discount != 0,
        _v$16 = itemData().first_pay == 1 && (props.purchased_num ?? 0) == 0,
        _v$17 = memoData().price == 0 && !memoData().limited && !merged.btnDisable && (!memoData().isNeedBuff || memoData().hasBuffCondition),
        _v$18 = buffIconID() != undefined,
        _v$19 = buffIconSrc();
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$, "enabled", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$2, "class", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$3, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$5, "src", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$6, "text", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$6, "visible", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$7, "visible", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$8, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$8, "vars", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$9, "visible", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$9, "text", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$0, "visible", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$11, "visible", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$17, "visible", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$18, "visible", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$18, "src", _v$19, _p$._v$19));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
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
      _v$19: undefined
    });
    return _el$;
  })();
};
function GetDefaultToolTipText(itemID) {
  return GetLocalization(itemID + "_description");
}
function GetItemTooltipText(itemID, player_collections) {
  const id = String(itemID);
  const propType = GetPropType(id);
  if (propType == PropType.Collection) {
    const collectionData = KeyValues.collection[id];
    if (collectionData == undefined) {
      return GetDefaultToolTipText(id);
    }
    const currentLevel = player_collections()[id]?.level ?? 0;
    if (currentLevel <= 0) {
      return GetLocalization("#FishingItem_Status_Locked", "未解锁");
    }
    const perLevelTitle = GetLocalization("#Collection_PerLevelEffect", "每级效果：");
    const attributeText = Object.entries(collectionData.attribute ?? {}).map(([attribute, value]) => {
      return GetPropertyLocalization(attribute, value);
    }).join("<br>");
    return attributeText === "" ? perLevelTitle : `${perLevelTitle}<br>${attributeText}`;
  } else if (propType === PropType.Token) {
    const fishConsumeData = KeyValues.fish_consume[id];
    if (fishConsumeData !== undefined) {
      const effectText = GetEffectTooltipText(fishConsumeData.effect);
      if (effectText !== "") {
        return effectText;
      }
    }
    return GetDefaultToolTipText(id);
  } else if (propType === PropType.Cosmetic) {
    const cosmeticData = KeyValues.info_item_cosmetic[id];
    const parts = Object.entries(cosmeticData?.attribute ?? {}).map(([attribute, value]) => {
      return GetPropertyLocalization(attribute, value);
    });
    for (const effect of String(cosmeticData?.effect ?? "").split("|").filter(Boolean)) {
      const effectText = GetPrivilegeDesc(effect);
      if (effectText !== "") {
        parts.push(effectText);
      }
    }
    return parts.length > 0 ? parts.join("<br>") : GetDefaultToolTipText(id);
  } else {
    return GetDefaultToolTipText(id);
  }
}
function getPropTypeLocalizeKey(itemID) {
  const propType = GetPropType(itemID);
  const propTypeName = PropType[propType];
  if (propTypeName == undefined) {
    return "";
  }
  return "#PropType_" + propTypeName;
}
function isWeaponItem(itemID) {
  return GetPropType(itemID) === PropType.Weapon;
}
function getWeaponTooltipData(itemID) {
  return {
    name: "weapon_info",
    weapon_id: String(itemID)
  };
}
function isCourierItem(itemID) {
  return GetPropType(itemID) === PropType.Courier && KeyValues.service_courier[String(itemID)] != undefined;
}
function isBlessItem(itemID) {
  return GetPropType(itemID) === PropType.Bless;
}
function getCourierTooltipData(itemID) {
  return {
    name: "courier_info",
    courier_id: String(itemID)
  };
}
function getBlessTooltipData(itemID) {
  let blessId = String(itemID);
  if (blessId.length == 6) {
    blessId = blessId.slice(3);
  }
  return {
    name: "bless_info",
    bless_id: blessId
  };
}
function isTreasureItem(itemID) {
  return GetPropType(itemID) === PropType.CollectionTreasure;
}
function getTreasureTooltipData(itemID) {
  return {
    name: "treasure_info",
    treasure_id: String(itemID)
  };
}
function GetItemTooltipTitle(itemID) {
  const id = String(itemID);
  return id;
}
function isSpecialEffectsCosmeticItem(itemID) {
  if (GetPropType(itemID) !== PropType.Cosmetic) return false;
  const cosmeticData = KeyValues.info_item_cosmetic[String(itemID)];
  if (cosmeticData == undefined) return false;
  return [COSMETIC_TYPE.ATTACK_EFFECT, COSMETIC_TYPE.SPECIAL_SKILL_EFFECT, COSMETIC_TYPE.DASH_SKILL_EFFECT, COSMETIC_TYPE.DEFENSE_SKILL_EFFECT, COSMETIC_TYPE.ULTIMATE_SKILL_EFFECT].includes(cosmeticData.type);
}
function getTitleImageTextTooltipData(titleID, image, text, specialEffectsImage = false) {
  return {
    name: "title_image_text",
    title: GetItemTooltipTitle(titleID),
    image,
    text,
    special_effects_image: specialEffectsImage ? 1 : 0,
    prop_type: getPropTypeLocalizeKey(titleID)
  };
}
function getStoreProductRewardTooltipData(itemID, image) {
  if (isWeaponItem(itemID)) {
    return getWeaponTooltipData(itemID);
  }
  if (isCourierItem(itemID)) {
    return getCourierTooltipData(itemID);
  }
  if (isBlessItem(itemID)) {
    const ids = [340101, 310102, 310103, 310104, 310105];
    if (ids.includes(Number(itemID))) {
      const defaultText = GetDefaultToolTipText(itemID);
      if (defaultText) {
        return getTitleImageTextTooltipData(itemID, image, defaultText, isSpecialEffectsCosmeticItem(itemID));
      }
    }
    return getBlessTooltipData(itemID);
  }
  if (isTreasureItem(itemID)) {
    return getTreasureTooltipData(itemID);
  }
  return undefined;
}
function getStoreProductTooltipData(itemData, fallbackItemID, image, player_collections) {
  if (itemData.items == undefined) {
    return undefined;
  }
  const itemList = Object.keys(itemData.items);
  const firstReward = itemList[0];
  if (itemData.show_type == 1) {
    return firstReward == undefined ? undefined : {
      name: "privilege_preview",
      buff_id: String(firstReward)
    };
  }
  if (firstReward != undefined) {
    const rewardTooltip = getStoreProductRewardTooltipData(firstReward, image);
    if (rewardTooltip != undefined) {
      return rewardTooltip;
    }
  }
  if (itemList.length > 1) {
    return {
      name: "bundle_preview",
      item_list: JSON.stringify(itemData.items)
    };
  }
  const itemID = firstReward ?? fallbackItemID;
  const tooltip = getTitleImageTextTooltipData(itemID, image, GetItemTooltipText(itemID, player_collections), isSpecialEffectsCosmeticItem(itemID));
  return tooltip;
}
function showStoreItemTooltip(panel, tooltip) {
  if (tooltip == undefined) return;
  ShowCustomTooltip(panel, tooltip.name, tooltip);
}
function hideStoreItemTooltip(panel, tooltip) {
  if (tooltip == undefined) return;
  HideCustomTooltip(panel, tooltip.name);
}
function GetStoreItemImageTooltipData(itemID, image, player_collections = () => ({})) {
  if (isWeaponItem(itemID)) {
    return getWeaponTooltipData(itemID);
  }
  if (isCourierItem(itemID)) {
    return getCourierTooltipData(itemID);
  }
  if (isBlessItem(itemID)) {
    const id = String(itemID);
    const numId = Number(id);
    const ids = [340101, 310102, 310103, 310104, 310105];
    if (ids.includes(numId)) {
      const defaultText = GetDefaultToolTipText(id);
      if (defaultText) {
        return getTitleImageTextTooltipData(id, image, defaultText);
      }
    }
    return getBlessTooltipData(itemID);
  }
  if (isTreasureItem(itemID)) {
    return getTreasureTooltipData(itemID);
  }
  return getTitleImageTextTooltipData(itemID, image, GetItemTooltipText(itemID, player_collections), isSpecialEffectsCosmeticItem(itemID));
}
const StoreItemImage = props => {
  const player_collections = solid_utils.createServiceNetData("player_collections", {});
  const merged = libs.mergeProps(props, {
    class: "StoreItemImage"
  });
  const [local, other] = libs.splitProps(merged, ["itemid", "uid", "src", "hideTips"]);
  const src = libs.createMemo(() => {
    if (local.src) {
      return local.src;
    }
    const itemData = () => KeyValues.info_shop_product[props.itemid];
    if (itemData()?.img != undefined && itemData()?.img != "") {
      return getSrcPath("store_items/" + itemData().img + ".png");
    }
    const type = GetPropType(local.itemid);
    if (type == PropType.Equipment) {
      let iconName = KeyValues.info_item_equipment[local.itemid]?.icon;
      return getSrcPath("store_items/" + iconName + ".png");
    } else if (type == PropType.Huntloot) {
      const iconName = KeyValues.info_item_huntloot[local.itemid]?.icon;
      return getSrcPath("store_items/" + iconName + ".png");
    } else if (type == PropType.Key) {
      let iconName = KeyValues.info_item_key[local.itemid]?.icon;
      return getSrcPath("store_items/" + iconName + ".png");
    } else if (type == PropType.Drawing) {
      let iconName = KeyValues.info_item_drawing[local.itemid]?.icon;
      return getSrcPath("store_items/" + iconName + ".png");
    } else if (type == PropType.Gem) {
      const gemIconName = KeyValues.info_item_gem[local.itemid]?.icon;
      if (gemIconName != undefined) {
        return getSrcPath("store_items/" + gemIconName + ".png");
      }
    }
    return getSrcPath("store_items/" + local.itemid + ".png");
  });
  const tooltipItemID = libs.createMemo(() => {
    const productItems = KeyValues.info_shop_product[local.itemid]?.items;
    const itemList = Object.keys(productItems ?? {});
    return itemList.length === 1 ? itemList[0] : local.itemid;
  });
  const customTooltip = libs.createMemo(() => local.hideTips ? undefined : GetStoreItemImageTooltipData(tooltipItemID(), src(), player_collections));
  return (() => {
    const _el$21 = libs.createElement("Image", libs.mergeProps$1(other, {
      get src() {
        return src();
      }
    }), null);
    libs.spread(_el$21, libs.mergeProps$1(other, {
      get src() {
        return src();
      },
      "onmouseover": p => {
        if (local.hideTips) return;
        const propType = GetPropType(local.itemid);
        const uid = local.uid;
        if (uid != undefined && propType === PropType.Equipment) {
          equipment_utils.ShowServerEquipTooltip(p, {
            id1: uid
          });
        } else if (uid != undefined && propType === PropType.Key) {
          ShowCustomTooltip(p, "server_key", {
            key_id: String(uid)
          });
        } else if (uid != undefined && propType === PropType.Drawing) {
          ShowCustomTooltip(p, "server_drawing", {
            drawing_id: String(uid)
          });
        } else {
          const tooltip = customTooltip();
          if (tooltip == undefined) return;
          ShowCustomTooltip(p, tooltip.name, tooltip);
        }
      },
      "onmouseout": p => {
        if (local.hideTips) return;
        const propType = GetPropType(local.itemid);
        const uid = local.uid;
        if (uid != undefined && propType === PropType.Equipment) {
          HideCustomTooltip(p, "server_equip");
        } else if (uid != undefined && propType === PropType.Key) {
          HideCustomTooltip(p, "server_key");
        } else if (uid != undefined && propType === PropType.Drawing) {
          HideCustomTooltip(p, "server_drawing");
        } else {
          const tooltip = customTooltip();
          if (tooltip != undefined) {
            HideCustomTooltip(p, tooltip.name);
          }
        }
      }
    }), false);
    return _el$21;
  })();
};
function StoreItemBlock(props) {
  const [local, others] = libs.splitProps(props, ["item_id", "uid", "amounts", "rarity", "hideTips", "class"]);
  const panelClass = libs.createMemo(() => {
    const rarity = local.rarity ?? GetServiceItemRarity(local.item_id);
    return libs.classNames("StoreItemBlock", local.class, "Rarity" + rarity);
  });
  return (() => {
    const _el$22 = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(panelClass(), {
          IsEquip: local.uid != undefined && GetPropType(local.item_id) === PropType.Equipment
        });
      }
    }), null);
    libs.spread(_el$22, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(panelClass(), {
          IsEquip: local.uid != undefined && GetPropType(local.item_id) === PropType.Equipment
        });
      }
    }), true);
    libs.insert(_el$22, libs.createComponent(StoreItemImage, {
      get itemid() {
        return local.item_id;
      },
      get uid() {
        return local.uid;
      },
      get hideTips() {
        return local.hideTips;
      }
    }), null);
    libs.insert(_el$22, libs.createComponent(libs.Show, {
      get when() {
        return props.amounts != undefined && props.amounts > 1;
      },
      get children() {
        const _el$23 = libs.createElement("Label", {
          id: "ItemCount",
          hittest: false,
          get text() {
            return "×" + props.amounts;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$23, "text", "×" + props.amounts, _$p));
        return _el$23;
      }
    }), null);
    libs.insert(_el$22, () => props.children, null);
    return _el$22;
  })();
}
const StoreItemCard = props => {
  const [local, others] = libs.splitProps(props, ["item_id", "rarity", "selected", "locked", "showName", "hideTips", "class", "children"]);
  const rarity = libs.createMemo(() => local.rarity ?? GetServiceItemRarity(local.item_id));
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(others, {
    get ["class"]() {
      return libs.classNames("StoreItemCard", local.class);
    },
    get classList() {
      return {
        [`Rarity${rarity()}`]: true,
        Selected: local.selected == true,
        Lock: local.locked == true
      };
    },
    get children() {
      return [libs.createComponent(libs.Show, {
        get when() {
          return local.selected;
        },
        get children() {
          return libs.createElement("DOTAParticleScenePanel", {
            id: "BorderParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
            cameraOrigin: "0 0 90",
            fov: 45,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, null);
        }
      }), libs.createElement("Panel", {
        id: "CardBG"
      }, null), libs.createComponent(StoreItemImage, {
        id: "CollectionIcon",
        get itemid() {
          return local.item_id;
        },
        get hideTips() {
          return local.hideTips;
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.showName ?? true;
        },
        get children() {
          const _el$26 = libs.createElement("Label", {
            id: "Name",
            get ["class"]() {
              return `Rarity${rarity()}`;
            },
            get text() {
              return `#${local.item_id}`;
            }
          }, null);
          libs.effect(_p$ => {
            const _v$20 = `Rarity${rarity()}`,
              _v$21 = `#${local.item_id}`;
            _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$26, "class", _v$20, _p$._v$20));
            _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$26, "text", _v$21, _p$._v$21));
            return _p$;
          }, {
            _v$20: undefined,
            _v$21: undefined
          });
          return _el$26;
        }
      }), libs.createElement("Image", {
        id: "LockIcon",
        hittest: false
      }, null), libs.createElement("Panel", {
        id: "SelectedHover",
        hittest: false
      }, null), libs.memo(() => local.children)];
    }
  }));
};

exports.GetStoreItemImageTooltipData = GetStoreItemImageTooltipData;
exports.StoreItem = StoreItem;
exports.StoreItemBlock = StoreItemBlock;
exports.StoreItemCard = StoreItemCard;
exports.StoreItemImage = StoreItemImage;