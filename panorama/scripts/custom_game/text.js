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

let root = $.GetContextPanel();
function TooltipContents(props) {
  return (() => {
    const _el$ = libs.createElement("Label", {
      html: true,
      get text() {
        return GetLocalization(props.text);
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$, "text", GetLocalization(props.text), _$p));
    return _el$;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get text() {
      return root.GetAttributeString("text", "");
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();