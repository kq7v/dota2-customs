--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('tooltip_base', exports); const require = GameUI.__require;

function InitTooltipStyle(tooltip, styleName = "BaseTooltip") {
  let parent = tooltip.GetParent()?.GetParent();
  if (parent) {
    parent.SetHasClass("BaseTooltip", styleName == "BaseTooltip");
    parent.SetHasClass("EmptyTooltip", styleName == "EmptyTooltip");
    let list = ["TopArrow", "BottomArrow", "LeftArrow", "RightArrow"];
    list.forEach(arrowName => {
      let arrow = parent.FindChildTraverse(arrowName);
      if (arrow) arrow.visible = false;
    });
  }
}

exports.InitTooltipStyle = InitTooltipStyle;