--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var ShopEffectCard = require('./ShopEffectCard.js');
require('./EOM_Panel.js');
require('./EOM_Image.js');
require('./EOM_Label.js');
require('./EOM_Button.js');
require('./GenericPanel.js');
require('./EOM_Icon.js');

let pTooltipPanel = $.GetContextPanel();
pTooltipPanel.style.minHeight = "0px";
pTooltipPanel.FindAncestor("greevil_cardeffect").FindChildTraverse("LeftArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_cardeffect").FindChildTraverse("RightArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_cardeffect").FindChildTraverse("TopArrow").style.opacity = "0";
pTooltipPanel.FindAncestor("greevil_cardeffect").FindChildTraverse("BottomArrow").style.opacity = "0";
function SetupTooltip() {
  const cardName = pTooltipPanel.GetAttributeString("cardName", "");
  if (!cardName || !KeyValues.CardEffectKv[cardName]) return;
  libs.render(() => libs.createComponent(ShopEffectCard.ShopEffectCard, {
    name: cardName,
    handbook: true,
    hittest: false,
    callback: () => {}
  }), pTooltipPanel);
}
(function () {
  pTooltipPanel.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();