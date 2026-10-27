--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var RuneRewardCard = require('./RuneRewardCard.js');
require('./EOM_Panel.js');
require('./EOM_Icon.js');
require('./EOM_Label.js');

let pTooltipPanel = $.GetContextPanel();
pTooltipPanel.style.minHeight = "0px";
pTooltipPanel.FindAncestor("greevil_trait").FindChildTraverse("LeftArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_trait").FindChildTraverse("RightArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_trait").FindChildTraverse("TopArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_trait").FindChildTraverse("BottomArrow").style.opacity = "0";
function SetupTooltip() {
  const traitName = pTooltipPanel.GetAttributeString("traitName", "");
  if (!traitName || !KeyValues.TraitKv[traitName]) return;
  libs.render(() => libs.createComponent(RuneRewardCard.RuneRewardCard, {
    trait: traitName,
    hittest: false
  }), pTooltipPanel);
}
(function () {
  pTooltipPanel.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();