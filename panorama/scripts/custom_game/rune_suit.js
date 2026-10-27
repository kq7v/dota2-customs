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
var tooltip_base = require('./tooltip_base.js');
var rune_data = require('./rune_data.js');
require('./attribute_formatter.js');
require('./equipment_utils.js');
require('./solid_utils.js');

function getRuneSuitEffectDescription(effectItemName) {
  const itemKV = KeyValues.npc_items_custom[effectItemName];
  const desc = GetLocalization(`#DOTA_Tooltip_ability_${effectItemName}_description`, itemKV?.Description ?? "");
  return getKeyValueDescription(desc, itemKV?.AbilityValues ?? {});
}
function collectRuneSuitEffectTags(effectItemName, tags) {
  const itemKV = KeyValues.npc_items_custom[effectItemName];
  const nameText = $.Localize(`#DOTA_Tooltip_ability_${effectItemName}`, $.GetContextPanel());
  const descText = $.Localize(`#DOTA_Tooltip_ability_${effectItemName}_description`, $.GetContextPanel());
  const fallbackDesc = itemKV?.Description ?? "";
  GetTagsFromString(nameText).forEach(tag => tags.add(tag));
  GetTagsFromString(descText).forEach(tag => tags.add(tag));
  GetTagsFromString(fallbackDesc).forEach(tag => tags.add(tag));
}
function buildRuneSuitEffectDisplays(suitKey, suitPoint) {
  const suitData = KeyValues.rune_suit_effect[suitKey];
  if (suitData == undefined) {
    return [];
  }
  return Object.entries(suitData.points__effect ?? {}).map(([point, effectItemName]) => {
    const needPoint = toFiniteNumber(point, 0);
    return {
      needPoint,
      effectItemName,
      description: getRuneSuitEffectDescription(effectItemName),
      active: suitPoint >= needPoint
    };
  }).filter(effect => effect.needPoint > 0 && effect.effectItemName !== "").sort((a, b) => a.needPoint - b.needPoint);
}
function buildRuneSuitFeatureText(suitKey) {
  const suitData = KeyValues.rune_suit_effect[suitKey];
  if (suitData == undefined) {
    return [];
  }
  const tags = new Set();
  Object.values(suitData.points__effect ?? {}).forEach(effectItemName => {
    if (effectItemName !== "") {
      collectRuneSuitEffectTags(effectItemName, tags);
    }
  });
  tags.forEach(tag => {
    const tagDesc = $.Localize(`#feature_${tag}_description`, $.GetContextPanel());
    GetTagsFromString(tagDesc).forEach(nestedTag => tags.add(nestedTag));
  });
  return Array.from(tags).map(tag => {
    const name = Localize(`#feature_${tag}`);
    const desc = GetLocalization(`#feature_${tag}_description`);
    return `${name}:${desc}`;
  });
}
let root = $.GetContextPanel();
function TooltipContents(props) {
  const effects = libs.createMemo(() => buildRuneSuitEffectDisplays(props.suitKey, props.suitPoint));
  const featureText = libs.createMemo(() => buildRuneSuitFeatureText(props.suitKey));
  const icon = libs.createMemo(() => rune_data.getRuneSuitIconPath(props.suitKey));
  const suitName = libs.createMemo(() => GetLocalization(`#RuneSuit_${props.suitKey}`));
  const title = libs.createMemo(() => `${suitName()}+${props.currentPoint}`);
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "RuneSuitTooltipRoot"
    }, null);
    libs.insert(_el$, libs.createComponent(EOM_Tooltip.EOM_Tooltip, {
      "class": "RuneSuitTooltip",
      get children() {
        return [(() => {
          const _el$2 = libs.createElement("Panel", {
              id: "RuneSuitTopContent"
            }, null),
            _el$3 = libs.createElement("Panel", {
              id: "RuneSuitTooltipTopLeft"
            }, _el$2),
            _el$4 = libs.createElement("Image", {
              id: "RuneSuitTooltipIcon",
              get src() {
                return icon();
              }
            }, _el$3),
            _el$5 = libs.createElement("Panel", {
              id: "RuneSuitTooltipTopRight"
            }, _el$2),
            _el$6 = libs.createElement("Label", {
              id: "RuneSuitTooltipNameLabel",
              html: true,
              get text() {
                return title();
              }
            }, _el$5);
          libs.effect(_p$ => {
            const _v$ = icon(),
              _v$2 = title();
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "src", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$2;
        })(), (() => {
          const _el$7 = libs.createElement("Panel", {
            id: "RuneSuitTooltipEffectList"
          }, null);
          libs.insert(_el$7, libs.createComponent(libs.For, {
            get each() {
              return effects();
            },
            children: effect => (() => {
              const _el$13 = libs.createElement("Panel", {
                  "class": "RuneSuitTooltipEffectRow"
                }, null),
                _el$14 = libs.createElement("Label", {
                  "class": "RuneSuitTooltipPoint",
                  get text() {
                    return `(${Math.min(props.suitPoint, effect.needPoint)}/${effect.needPoint})`;
                  }
                }, _el$13),
                _el$15 = libs.createElement("Label", {
                  "class": "RuneSuitTooltipDesc",
                  html: true,
                  get text() {
                    return effect.description;
                  }
                }, _el$13);
              libs.effect(_p$ => {
                const _v$3 = {
                    Active: effect.active
                  },
                  _v$4 = `(${Math.min(props.suitPoint, effect.needPoint)}/${effect.needPoint})`,
                  _v$5 = effect.description;
                _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$13, "classList", _v$3, _p$._v$3));
                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "text", _v$4, _p$._v$4));
                _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "text", _v$5, _p$._v$5));
                return _p$;
              }, {
                _v$3: undefined,
                _v$4: undefined,
                _v$5: undefined
              });
              return _el$13;
            })()
          }));
          return _el$7;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return featureText().length > 0;
          },
          get children() {
            return [(() => {
              const _el$8 = libs.createElement("Panel", {
                  id: "RuneSuitFeatureLabelContainer",
                  width: "100%",
                  flowChildren: "down"
                }, null);
                libs.createElement("Panel", {
                  "class": "RuneSuitSeparator"
                }, _el$8);
              libs.setProp(_el$8, "width", "100%");
              libs.setProp(_el$8, "flowChildren", "down");
              libs.insert(_el$8, libs.createComponent(libs.For, {
                get each() {
                  return featureText();
                },
                children: text => (() => {
                  const _el$16 = libs.createElement("Label", {
                    "class": "RuneSuitFeatureLabel",
                    text: text,
                    html: true
                  }, null);
                  libs.setProp(_el$16, "text", text);
                  return _el$16;
                })()
              }), null);
              return _el$8;
            })(), (() => {
              const _el$0 = libs.createElement("Panel", {
                  id: "RuneSuitALTTipsContainer",
                  width: "100%"
                }, null);
                libs.createElement("Panel", {
                  "class": "RuneSuitSeparator"
                }, _el$0);
                const _el$10 = libs.createElement("Panel", {
                  id: "RuneSuitModeDetailsTips"
                }, _el$0);
                libs.createElement("Label", {
                  id: "RuneSuitTips",
                  text: "#EquipmentTips_Details"
                }, _el$10);
                libs.createElement("Label", {
                  id: "RuneSuitHotkey",
                  text: "ALT"
                }, _el$10);
              libs.setProp(_el$0, "width", "100%");
              return _el$0;
            })()];
          }
        })];
      }
    }));
    return _el$;
  })();
}
function SetupTooltip() {
  const suitPoint = root.GetAttributeInt("suitPoint", 0);
  libs.render(() => libs.createComponent(TooltipContents, {
    get suitKey() {
      return root.GetAttributeString("suitKey", "");
    },
    get currentPoint() {
      return root.GetAttributeInt("currentPoint", suitPoint);
    },
    suitPoint: suitPoint
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();