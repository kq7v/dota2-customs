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

let root = $.GetContextPanel();
function TooltipContents(props) {
  const tags = GetArtifactTags(props.itemName);
  return (() => {
    const _el$ = libs.createElement("Panel", {
      flowChildren: "down"
    }, null);
    libs.setProp(_el$, "flowChildren", "down");
    libs.insert(_el$, libs.createComponent(FeatureTag.FeatureTagList, {
      marginLeft: "8px",
      tags: tags
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.upText != undefined && props.upText !== "";
      },
      get children() {
        return libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
          marginLeft: "8px",
          get children() {
            const _el$2 = libs.createElement("Label", {
              get text() {
                return props.upText;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$2, "text", props.upText, _$p));
            return _el$2;
          }
        });
      }
    }), null);
    return _el$;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get itemName() {
      return root.GetAttributeString("itemName", "");
    },
    get upText() {
      return root.GetAttributeString("upText", "");
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();