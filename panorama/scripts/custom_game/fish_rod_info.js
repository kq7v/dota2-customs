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
function getItemID() {
  return root.GetAttributeString("item_id", "") || root.GetAttributeString("id", "");
}
function rodEffectTexts(effect) {
  if (!effect) return [];
  return ParseEffectTooltipSegments(effect).map(seg => "<panel class='PropPoint'/>" + seg.text);
}
function TooltipSection(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "FishRodInfoTooltipSection"
      }, null),
      _el$2 = libs.createElement("Label", {
        "class": "FishRodInfoTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$);
    libs.insert(_el$, () => props.children, null);
    libs.effect(_$p => libs.setProp(_el$2, "text", props.title, _$p));
    return _el$;
  })();
}
function TooltipContents(props) {
  const rodConfig = libs.createMemo(() => KeyValues.idle_game_fish_rod?.[props.itemID]);
  const rodName = libs.createMemo(() => GetLocalization(`#rod_level${props.itemID}`, props.itemID));
  const effects = libs.createMemo(() => rodEffectTexts(rodConfig()?.effect));
  return (() => {
    const _el$3 = libs.createElement("Panel", {
        id: "FishRodInfoTooltip"
      }, null),
      _el$4 = libs.createElement("Label", {
        id: "FishRodInfoTooltipTitle",
        html: true,
        get text() {
          return rodName();
        }
      }, _el$3);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return effects().length > 0;
      },
      get children() {
        return libs.createComponent(TooltipSection, {
          get title() {
            return GetLocalization("#FishRodInfoEffectTitle", "鱼竿效果");
          },
          get children() {
            const _el$5 = libs.createElement("Label", {
              "class": "FishRodInfoTooltipEffectDesc",
              html: true,
              get text() {
                return effects().join("<br>");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$5, "text", effects().join("<br>"), _$p));
            return _el$5;
          }
        });
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$4, "text", rodName(), _$p));
    return _el$3;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get itemID() {
      return getItemID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();