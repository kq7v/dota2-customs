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
    const _el$ = libs.createElement("Panel", {
        id: "TitleImageText"
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "TooltipTitle",
        html: true,
        get text() {
          return GetLocalization(props.title);
        }
      }, _el$),
      _el$3 = libs.createElement("Image", {
        id: "TooltipImage",
        get src() {
          return props.image;
        }
      }, _el$),
      _el$4 = libs.createElement("Label", {
        id: "TooltipDesc",
        html: true,
        get text() {
          return GetLocalization(props.text, props.text);
        }
      }, _el$);
    libs.effect(_p$ => {
      const _v$ = GetLocalization(props.title),
        _v$2 = props.image,
        _v$3 = GetLocalization(props.text, props.text);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "src", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get title() {
      return root.GetAttributeString("title", "");
    },
    get image() {
      return root.GetAttributeString("image", "");
    },
    get text() {
      return root.GetAttributeString("text", "");
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();