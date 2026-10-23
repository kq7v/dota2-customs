--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('StoreTagPage', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var StoreItem = require('./StoreItem.js');

function isActiveTime(startTime, endTime, now) {
  return (startTime < now || startTime == 0) && (endTime > now || endTime == 0);
}
function getStoreTagItems(tag, infoProducts) {
  const result = [];
  const now = Date.now() / 1000;
  for (const itemName in KeyValues.info_shop_product) {
    const itemData = KeyValues.info_shop_product[itemName];
    if (itemData.hide_time && itemData.hide_time <= now) {
      continue;
    }
    const tags = String(itemData.tag ?? "").split("|");
    if (!tags.includes(tag) || itemData.hide != 0) {
      continue;
    }
    const infoProduct = infoProducts[itemData.id];
    if (isActiveTime(itemData.start_time, itemData.end_time, now) || infoProduct != undefined && isActiveTime(infoProduct.start_time, infoProduct.end_time, now)) {
      result.push(itemData);
    }
  }
  return result.sort((a, b) => b.orderby - a.orderby);
}
function sortStoreTagItems(items, purchasedProducts) {
  return [...items].sort((a, b) => {
    const aLimited = a.limit_type != 0 && (purchasedProducts[a.id] ?? 0) >= a.limit_count;
    const bLimited = b.limit_type != 0 && (purchasedProducts[b.id] ?? 0) >= b.limit_count;
    if (aLimited !== bLimited) return aLimited ? 1 : -1;
    return b.orderby - a.orderby;
  });
}
function hasFreeStoreTagItem(items, purchasedProducts, playerPrivileges) {
  const language = Language();
  return items.some(itemData => {
    const purchased = purchasedProducts[itemData.id] ?? 0;
    const limited = itemData.limit_type != 0 && purchased >= itemData.limit_count;
    if (limited || !HasStorePrivilege(itemData.effect_condition, playerPrivileges)) {
      return false;
    }
    let price = itemData.real_price;
    if (itemData.pay_type == 0) {
      if (language == "english") {
        price = itemData.overseas_realprice;
      } else if (language == "russian") {
        price = itemData.russia_realprice;
      }
    }
    return price == 0;
  });
}
function StoreTagPage(props) {
  const infoProducts = solid_utils.createGlobalServiceNetData("info_products", {});
  const purchasedProducts = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const storeItems = libs.createMemo(() => sortStoreTagItems(getStoreTagItems(props.tag, infoProducts()), purchasedProducts()));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    get id() {
      return props.id ?? props.tag;
    },
    get show() {
      return props.show;
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
        "class": "StoreTagPageList VerticalScrollStyle",
        scroll: "y"
      }, null);
      libs.setProp(_el$, "scroll", "y");
      libs.insert(_el$, libs.createComponent(libs.Index, {
        get each() {
          return storeItems();
        },
        children: data => {
          const infoProduct = () => infoProducts()[data().id];
          return libs.createComponent(StoreItem.StoreItem, {
            get itemid() {
              return data().id;
            },
            get purchased_num() {
              return purchasedProducts()[data().id];
            },
            get startTime() {
              return infoProduct()?.start_time;
            },
            get endTime() {
              return infoProduct()?.end_time;
            }
          });
        }
      }));
      return _el$;
    }
  });
}
function createStoreTagRedPointData(tag) {
  const infoProducts = solid_utils.createGlobalServiceNetData("info_products", {});
  const purchasedProducts = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const playerPrivileges = solid_utils.createPlayerNetDataSignal("common", "player_privileges", {});
  const items = libs.createMemo(() => getStoreTagItems(tag, infoProducts()));
  return () => hasFreeStoreTagItem(items(), purchasedProducts(), playerPrivileges());
}

exports.StoreTagPage = StoreTagPage;
exports.createStoreTagRedPointData = createStoreTagRedPointData;
exports.hasFreeStoreTagItem = hasFreeStoreTagItem;