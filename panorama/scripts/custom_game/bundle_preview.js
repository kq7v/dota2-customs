--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var tooltip_base = require('./tooltip_base.js');
var BackpackItem = require('./BackpackItem.js');
require('./StoreItem.js');
require('./solid_utils.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

let pSelf = $.GetContextPanel();
function TooltipContents({
  item_list
}) {
  return libs.createComponent(libs.For, {
    get each() {
      return Object.keys(item_list);
    },
    children: (itemid, index) => {
      return (() => {
        const _el$ = libs.createElement("Panel", {
            "class": "ItemRow"
          }, null),
          _el$3 = libs.createElement("Label", {
            "class": "ItemName",
            text: "#" + itemid
          }, _el$);
        libs.insert(_el$, libs.createComponent(BackpackItem.BackpackItemContent, {
          itemid: itemid,
          get children() {
            const _el$2 = libs.createElement("Label", {
              "class": "ItemCount",
              get text() {
                return "×" + item_list[itemid];
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$2, "text", "×" + item_list[itemid], _$p));
            return _el$2;
          }
        }), _el$3);
        libs.setProp(_el$3, "text", "#" + itemid);
        return _el$;
      })();
    }
  });
}
function SetupTooltip() {
  pSelf.RemoveAndDeleteChildren();
  let item_list = JSON.parseSafe(pSelf.GetAttributeString("item_list", "")) ?? {};
  if (Object.keys(item_list).length > 0) {
    libs.render(() => libs.createComponent(TooltipContents, {
      item_list: item_list
    }), pSelf);
  }
}
(() => {
  tooltip_base.InitTooltipStyle(pSelf);
  pSelf.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();