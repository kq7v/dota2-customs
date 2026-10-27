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
pTooltipPanel.FindAncestor("greevil_attribute").FindChildTraverse("LeftArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_attribute").FindChildTraverse("RightArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_attribute").FindChildTraverse("TopArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_attribute").FindChildTraverse("BottomArrow").style.opacity = "0";
function localizeFirst(keys) {
  for (const key of keys) {
    const localized = $.Localize(key);
    if (localized != key) {
      return localized;
    }
  }
  return "";
}
function normalizeAttributeData(attrType, value) {
  const normalizedAttrType = attrType.replace(/^item_/, '');
  const numericValue = Number(value);
  return {
    attrType: normalizedAttrType,
    value,
    sign: numericValue > 0 ? '+' : ''
  };
}
function getAttributeName(attrType) {
  return localizeFirst(['#dota_tooltip_item_variable_item_' + attrType, '#dota_tooltip_item_variable_' + attrType, '#Attribute_' + attrType]) || attrType;
}
function getAttributeSuffix(attrType) {
  const localized = localizeFirst(['#dota_tooltip_item_variable_item_' + attrType, '#dota_tooltip_item_variable_' + attrType]);
  return localized.startsWith('%') ? '%' : '';
}
function TooltipContents({
  attrType,
  value
}) {
  const data = normalizeAttributeData(attrType, value);
  const attrName = getAttributeName(data.attrType);
  const suffix = getAttributeSuffix(data.attrType);
  const displayValue = data.sign + data.value + suffix;
  return libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
    id: "GreevilAttributeTooltip",
    flowChildren: "down",
    get children() {
      return [libs.createComponent(EOM_Tooltip.EOM_TooltipHeader, {
        id: "AttrHeader",
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            id: "AttrName",
            text: attrName
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "AttrValueRow",
        flowChildren: "right",
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            id: "AttrValue",
            text: displayValue
          });
        }
      })];
    }
  });
}
function SetupTooltip() {
  const attrType = pTooltipPanel.GetAttributeString("attrType", "");
  const value = pTooltipPanel.GetAttributeString("value", "0");
  if (!attrType) return;
  libs.render(() => libs.createComponent(TooltipContents, {
    attrType: attrType,
    value: value
  }), pTooltipPanel);
}
(function () {
  pTooltipPanel.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();