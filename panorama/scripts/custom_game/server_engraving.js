--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Loading = require('./EOM_Loading.js');
var server_rune_utils = require('./server_rune_utils.js');
var rune_components = require('./rune_components.js');
require('./attribute_formatter.js');
require('./equipment_utils.js');
require('./solid_utils.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./rune_data.js');

function ServerEngravingDetail(props) {
  const [local, others] = libs.splitProps(props, ["data", "class"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("ServerEngravingDetail", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("ServerEngravingDetail", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.data;
      },
      get fallback() {
        return libs.createComponent(EOM_Loading.EOM_Loading, {});
      },
      children: () => libs.createComponent(ServerEngravingDetailLoaded, libs.mergeProps$1(() => local.data))
    }));
    return _el$;
  })();
}
function ServerEngravingDetailLoaded(props) {
  const engravingData = () => props.data;
  const attributeDisplays = libs.createMemo(() => server_rune_utils.buildEngravingAttributeDisplays(engravingData().adverb_entry_data));
  const featureText = libs.createMemo(() => {
    const tags = new Set();
    const tagQueue = [];
    const propertyLines = [];
    const addTags = collectedTags => {
      collectedTags.forEach(tag => {
        if (!tags.has(tag)) {
          tags.add(tag);
          tagQueue.push(tag);
        }
      });
    };
    for (const entry of engravingData().adverb_entry_data ?? []) {
      const propertyToken = `#property_${entry.id}`;
      const collected = CollectLocalizationFeatureTags(() => {
        const propertyText = GetLocalization(propertyToken);
        GetLocalization(`#DOTA_Tooltip_ability_${entry.id}`);
        const propertyDescription = GetLocalization(`${propertyToken}_description`, "");
        return {
          propertyText,
          propertyDescription
        };
      });
      addTags(collected.tags);
      const {
        propertyText,
        propertyDescription
      } = collected.result;
      if (propertyDescription) {
        propertyLines.push(`${propertyText.replace("%", "")}:${propertyDescription}`);
      }
    }
    const featureLines = [];
    for (let index = 0; index < tagQueue.length; index++) {
      const tag = tagQueue[index];
      const collected = CollectLocalizationFeatureTags(() => {
        const name = GetLocalization(`#feature_${tag}`, "");
        const description = GetLocalization(`#feature_${tag}_description`, "");
        return {
          name,
          description
        };
      });
      const {
        name,
        description
      } = collected.result;
      if (name && description) {
        featureLines.push(`${name}:${description}`);
      }
      addTags(collected.tags);
    }
    return [...featureLines, ...propertyLines];
  });
  const displayName = libs.createMemo(() => GetLocalization(`#${engravingData().engraving_item_id}`));
  return (() => {
    const _el$2 = libs.createElement("Panel", {
        id: "ServerEngravingDetailLoaded",
        get ["class"]() {
          return `TipsRarity${engravingData().rarity}`;
        }
      }, null),
      _el$3 = libs.createElement("Panel", {
        id: "EngravingTop"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        id: "EngravingName",
        get text() {
          return displayName();
        }
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "EngravingAttrList"
      }, _el$2),
      _el$7 = libs.createElement("Panel", {
        id: "EngravingBottom"
      }, _el$2),
      _el$8 = libs.createElement("Panel", {
        id: "EngravingFeatureLabelContainer",
        width: "100%",
        flowChildren: "down"
      }, _el$7);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return attributeDisplays().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "EngravingSeparator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return attributeDisplays();
          },
          children: data => libs.createComponent(rune_components.RuneAttributeRow, {
            get attr_name_html() {
              return data().nameHtml;
            },
            get attr_value_html() {
              return data().valueText;
            },
            entry_type: "Adverb",
            get color_name() {
              return data().colorName;
            }
          })
        })];
      }
    }));
    libs.setProp(_el$8, "width", "100%");
    libs.setProp(_el$8, "flowChildren", "down");
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "EngravingSeparator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return featureText();
          },
          children: text => (() => {
            const _el$13 = libs.createElement("Label", {
              "class": "EngravingFeatureLabel",
              get text() {
                return text();
              },
              html: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$13, "text", text(), _$p));
            return _el$13;
          })()
        })];
      }
    }));
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        const _el$0 = libs.createElement("Panel", {
            id: "EngravingALTTipsContainer",
            width: "100%"
          }, null);
          libs.createElement("Panel", {
            "class": "EngravingSeparator"
          }, _el$0);
          const _el$10 = libs.createElement("Panel", {
            id: "EngravingModeDetailsTips"
          }, _el$0),
          _el$11 = libs.createElement("Label", {
            id: "EngravingTips",
            get text() {
              return GetLocalization("#EquipmentTips_Details");
            }
          }, _el$10);
          libs.createElement("Label", {
            id: "EngravingHotkey",
            text: "ALT"
          }, _el$10);
        libs.setProp(_el$0, "width", "100%");
        libs.effect(_$p => libs.setProp(_el$11, "text", GetLocalization("#EquipmentTips_Details"), _$p));
        return _el$0;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = `TipsRarity${engravingData().rarity}`,
        _v$2 = displayName();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$2;
  })();
}
const root = $.GetContextPanel();
const [tooltipData, setTooltipData] = libs.createSignal();
function TooltipContents() {
  return (() => {
    const _el$14 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("EngravingDetailContainer", {
            ShowOrnament: tooltipData() != undefined && tooltipData().data.rarity >= 7
          });
        }
      }, null);
      libs.createElement("Panel", {
        "class": "EngravingBGImg"
      }, _el$14);
      const _el$16 = libs.createElement("Panel", {
        "class": "EngravingOrnamentPanel"
      }, _el$14);
    libs.insert(_el$14, libs.createComponent(ServerEngravingDetail, {
      get data() {
        return tooltipData();
      }
    }), _el$16);
    libs.effect(_$p => libs.setProp(_el$14, "class", libs.classNames("EngravingDetailContainer", {
      ShowOrnament: tooltipData() != undefined && tooltipData().data.rarity >= 7
    }), _$p));
    return _el$14;
  })();
}
function SetupTooltip() {
  setTooltipData();
  const id = root.GetAttributeString("id1", "");
  server_rune_utils.GetEngravingDetail(id, data => {
    setTooltipData({
      data
    });
  });
}
libs.render(() => libs.createComponent(TooltipContents, {}), root);
root.style.overflow = "noclip";
root.GetParent().style.overflow = "noclip";
root.GetParent().GetParent().style.overflow = "noclip";
root.SetPanelEvent("ontooltiploaded", SetupTooltip);