--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var common_box = require('./common_box.js');
var EOM_Tooltip = require('./EOM_Tooltip.js');
var tooltip_base = require('./tooltip_base.js');
require('./EOM_Icon.js');
require('./hotkey_label.js');
require('./solid_utils.js');
require('./EOM_GamePad.js');
require('./EOM_HotKeyDisplay.js');
require('./service_netdata_helper.js');
require('./common_item.js');

let root = $.GetContextPanel();
function TooltipContents(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
      "class": "AbilityUpgradeList",
      flowChildren: "right"
    }, null);
    libs.setProp(_el$, "flowChildren", "right");
    libs.insert(_el$, libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
      flowChildren: "down",
      get children() {
        return libs.createComponent(common_box.CommonBox, {
          get itemName() {
            return props.itemName;
          },
          get rarity() {
            return props.level;
          }
        });
      }
    }));
    return _el$;
  })();
}
function SetupTooltip() {
  root.RemoveAndDeleteChildren();
  const type = root.GetAttributeString("type", "");
  if (type != "") {
    const itemName = "item_suit_" + type.toLocaleLowerCase();
    const itemList = getNetDataKey("unit", Players.GetLocalPlayerPortraitUnit().toString()) ?? {
      items: []
    };
    const item = itemList.items.find(item => item.itemName == itemName);
    if (item != undefined) {
      libs.render(() => libs.createComponent(TooltipContents, {
        itemName: itemName,
        get level() {
          return item.level;
        }
      }), root);
    }
  }
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();