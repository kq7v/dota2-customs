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
  const mergedTags = [];
  const tagMap = {};
  for (let i = 0; i < props.upgradeIDs.length; i++) {
    const tags = GetAbilityUpgradeTags(props.upgradeIDs[i]);
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      if (tagMap[tag] === true) {
        continue;
      }
      tagMap[tag] = true;
      mergedTags.push(tag);
    }
  }
  return (() => {
    const _el$ = libs.createElement("Panel", {
      "class": "AbilityUpgradeList",
      flowChildren: "right"
    }, null);
    libs.setProp(_el$, "flowChildren", "right");
    libs.insert(_el$, libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
      flowChildren: "down",
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return props.upgradeIDs;
          },
          children: upgradeID => {
            return (() => {
              const _el$2 = libs.createElement("Panel", {
                "class": "AbilityUpgradeListRow"
              }, null);
              libs.insert(_el$2, libs.createComponent(upgrade_box.UpgradeBox, {
                upgradeID: upgradeID
              }));
              return _el$2;
            })();
          }
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(FeatureTag.FeatureTagList, {
      marginLeft: "8px",
      tags: mergedTags
    }), null);
    return _el$;
  })();
}
function SetupTooltip() {
  root.RemoveAndDeleteChildren();
  const upgradeIDs = root.GetAttributeString("upgradeIDs", "").split("|").filter(id => id != "");
  if (upgradeIDs.length > 0) {
    libs.render(() => libs.createComponent(TooltipContents, {
      upgradeIDs: upgradeIDs
    }), root);
  }
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();