--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Tooltip = require('./EOM_Tooltip.js');
var EOM_Label = require('./EOM_Label.js');

let pTooltipPanel = $.GetContextPanel();
pTooltipPanel.style.minHeight = "0px";
pTooltipPanel.FindAncestor("greevil_effect").FindChildTraverse("LeftArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_effect").FindChildTraverse("RightArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_effect").FindChildTraverse("TopArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_effect").FindChildTraverse("BottomArrow").style.opacity = "0";
function getAbilityTitle(abilityName) {
  const key = `#DOTA_Tooltip_ability_${abilityName}`;
  const localized = $.Localize(key);
  if (localized != key) {
    return localized;
  }
  return abilityName;
}
function getAbilityDescription(abilityName) {
  const key = `#DOTA_Tooltip_ability_${abilityName}_description`;
  const localized = $.Localize(key);
  if (localized != key) {
    return replaceAll(localized);
  }
  return "";
}
function TooltipContents({
  value
}) {
  const title = getAbilityTitle(value);
  const description = getAbilityDescription(value);
  return libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
    flowChildren: "down",
    get children() {
      return [libs.createComponent(EOM_Tooltip.EOM_TooltipHeader, {
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            id: "EffectValue",
            text: title
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        flowChildren: "down",
        get children() {
          return libs.createComponent(libs.Show, {
            when: description != "",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                html: true,
                text: description
              });
            }
          });
        }
      })];
    }
  });
}
function SetupTooltip() {
  const value = pTooltipPanel.GetAttributeString("value", "");
  libs.render(() => libs.createComponent(TooltipContents, {
    value: value
  }), pTooltipPanel);
}
(function () {
  pTooltipPanel.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();