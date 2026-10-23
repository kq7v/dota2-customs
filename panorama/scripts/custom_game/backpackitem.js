--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('BackpackItem', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var StoreItem = require('./StoreItem.js');

const BackpackItemContent = props => {
  const rarity = () => {
    const tokenRarity = {
      "110001": 3,
      "110002": 3,
      "110003": 0,
      "110004": 4,
      "110005": 0,
      "110006": 5
    };
    if (tokenRarity[String(props.itemid)]) {
      return tokenRarity[String(props.itemid)];
    }
    return props.rarity ?? GetServiceItemRarity(props.itemid);
  };
  const merged = libs.mergeProps(props, {
    class: libs.classNames("BackpackItemContent", "Rarity" + rarity())
  });
  const [local, others] = libs.splitProps(merged, ["itemid", "rarity", "children", "amounts"]);
  return (() => {
    const _el$7 = libs.createElement("Panel", others, null);
      libs.createElement("Panel", {
        id: "Bg"
      }, _el$7);
      const _el$9 = libs.createElement("Label", {
        id: "BackpackItemCount",
        get text() {
          return "×" + local.amounts;
        }
      }, _el$7);
    libs.spread(_el$7, others, true);
    libs.insert(_el$7, libs.createComponent(StoreItem.StoreItemImage, {
      id: "BackpackItemImage",
      get itemid() {
        return local.itemid;
      }
    }), _el$9);
    libs.insert(_el$7, () => libs.untrack(() => local.children), null);
    libs.effect(_p$ => {
      const _v$ = local.amounts != undefined && local.amounts > 0,
        _v$2 = "×" + local.amounts;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$9, "visible", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$7;
  })();
};

exports.BackpackItemContent = BackpackItemContent;