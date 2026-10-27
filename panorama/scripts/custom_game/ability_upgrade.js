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
var upgrade_box = require('./upgrade_box.js');
require('./hotkey_label.js');
require('./solid_utils.js');
require('./EOM_GamePad.js');
require('./EOM_HotKeyDisplay.js');
require('./upgrade_icon.js');

let root = $.GetContextPanel();
function TooltipContents(props) {
  const tags = GetAbilityUpgradeTags(props.upgradeID);
  return (() => {
    const _el$ = libs.createElement("Panel", {
      flowChildren: "right"
    }, null);
    libs.setProp(_el$, "flowChildren", "right");
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return !props.onlyTag;
      },
      get children() {
        return libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
          get children() {
            return libs.createComponent(upgrade_box.UpgradeBox, {
              get upgradeID() {
                return props.upgradeID;
              }
            });
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
    get upgradeID() {
      return root.GetAttributeString("upgradeID", "");
    },
    get onlyTag() {
      return root.GetAttributeInt("onlyTag", 0) == 1;
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();