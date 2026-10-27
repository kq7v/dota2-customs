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

function ActivityVeinsRuleTooltip(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "ActivityVeinsRuleTooltip"
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "ActivityVeinsRuleTooltipText",
        html: true,
        get text() {
          return GetLocalization(props.text);
        }
      }, _el$);
    libs.effect(_$p => libs.setProp(_el$2, "text", GetLocalization(props.text), _$p));
    return _el$;
  })();
}
const root = $.GetContextPanel();
function SetupTooltip() {
  libs.render(() => libs.createComponent(ActivityVeinsRuleTooltip, {
    get text() {
      return root.GetAttributeString("text", "");
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();