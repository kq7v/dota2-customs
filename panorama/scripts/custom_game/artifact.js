--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Tooltip = require('./EOM_Tooltip.js');
var FeatureTag = require('./FeatureTag.js');
var tooltip_base = require('./tooltip_base.js');
var common_box = require('./common_box.js');
require('./EOM_Icon.js');
require('./hotkey_label.js');
require('./solid_utils.js');
require('./EOM_GamePad.js');
require('./EOM_HotKeyDisplay.js');
require('./service_netdata_helper.js');
require('./common_item.js');

let root = $.GetContextPanel();
function TooltipContents(props) {
  const tags = GetArtifactTags(props.itemName);
  return (() => {
    const _el$ = libs.createElement("Panel", {
      flowChildren: "right"
    }, null);
    libs.setProp(_el$, "flowChildren", "right");
    libs.insert(_el$, libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
      get children() {
        return libs.createComponent(common_box.CommonBox, {
          get itemName() {
            return props.itemName;
          },
          get showCost() {
            return props.showCost;
          },
          get rarity() {
            return props.rarity;
          }
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(FeatureTag.FeatureTagList, {
      marginLeft: "8px",
      tags: tags
    }), null);
    return _el$;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get itemName() {
      return root.GetAttributeString("itemName", "");
    },
    get showCost() {
      return root.GetAttributeInt("showCost", 0) == 1;
    },
    get rarity() {
      return root.GetAttributeInt("rarity", 1);
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();