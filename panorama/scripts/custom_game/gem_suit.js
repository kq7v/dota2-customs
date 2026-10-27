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

const root = $.GetContextPanel();
function GetGemSuitLevelText(effect) {
  const suitLimit = toFiniteNumber(KeyValues.gem_entry_suit[effect.id]?.entry_limit);
  if (suitLimit > 0 && effect.level >= suitLimit) {
    return LocalizeWithVars("#Equipment_GemSuit_LevelLimit", {
      level: effect.level,
      limit: suitLimit
    });
  }
  return LocalizeWithVars("#Equipment_GemSuit_Level", {
    level: effect.level
  });
}
function GemSuitTooltip(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "GemSuitTooltip"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "TooltipEffects"
      }, _el$);
    libs.insert(_el$2, libs.createComponent(libs.For, {
      get each() {
        return props.effects;
      },
      children: effect => (() => {
        const _el$3 = libs.createElement("Panel", {
            "class": "GemSuitEffect"
          }, null),
          _el$4 = libs.createElement("Panel", {
            "class": "EffectHeader"
          }, _el$3),
          _el$5 = libs.createElement("Image", {
            "class": "EffectIcon",
            get src() {
              return getSrcPath(`suit_icons/${props.icon}.png`);
            }
          }, _el$4),
          _el$6 = libs.createElement("Label", {
            "class": "EffectName",
            get text() {
              return GetLocalization(`#${effect.id}`, KeyValues.gem_entry_suit[effect.id]?.name ?? effect.id);
            }
          }, _el$4),
          _el$7 = libs.createElement("Label", {
            "class": "EffectLevel",
            get text() {
              return GetGemSuitLevelText(effect);
            }
          }, _el$4),
          _el$8 = libs.createElement("Label", {
            "class": "EffectDescription",
            html: true,
            get text() {
              return GetPrivilegeDesc(effect.id, effect.level);
            }
          }, _el$3);
        libs.effect(_p$ => {
          const _v$ = getSrcPath(`suit_icons/${props.icon}.png`),
            _v$2 = GetLocalization(`#${effect.id}`, KeyValues.gem_entry_suit[effect.id]?.name ?? effect.id),
            _v$3 = GetGemSuitLevelText(effect),
            _v$4 = GetPrivilegeDesc(effect.id, effect.level);
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "src", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$8, "text", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$3;
      })()
    }));
    return _el$;
  })();
}
function SetupTooltip() {
  const rawEffects = JSON.parseSafe(root.GetAttributeString("effects", "[]"));
  const effects = Array.isArray(rawEffects) ? rawEffects.filter(effect => effect?.id && KeyValues.gem_entry_suit[effect.id] && toFiniteNumber(effect.level) > 0).sort((left, right) => KeyValues.gem_entry_suit[left.id].id - KeyValues.gem_entry_suit[right.id].id) : [];
  libs.render(() => libs.createComponent(GemSuitTooltip, {
    get icon() {
      return root.GetAttributeString("icon", "");
    },
    effects: effects
  }), root);
}
tooltip_base.InitTooltipStyle(root, "BaseTooltip");
root.SetPanelEvent("ontooltiploaded", SetupTooltip);