--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var drawing_attr_row = require('./drawing_attr_row.js');
var server_equipment_drawing = require('./server_equipment_drawing.js');
require('./attribute_formatter.js');
require('./equipment_utils.js');
require('./solid_utils.js');

let root = $.GetContextPanel();
const [drawingData, setDrawingData] = libs.createSignal();
function SetupTooltip() {
  (async () => {
    setDrawingData();
    const drawingDataStr = root.GetAttributeString("drawing_data", "");
    if (drawingDataStr != "") {
      const data = JSON.parseSafe(drawingDataStr);
      if (data) {
        setDrawingData(data);
      }
      return;
    }
    const drawingId = root.GetAttributeString("drawing_id", "");
    if (!drawingId) return;
    const playerID = Game.GetLocalPlayerID();
    const allDrawings = getServiceNetData("player_drawings", playerID) ?? {};
    const data = allDrawings[drawingId];
    if (data) {
      setDrawingData(data);
    }
  })();
}
function ServerDrawingDetail(props) {
  const drawingData = () => props.data;
  const drawingKV = () => KeyValues.info_item_drawing[drawingData().drawing_item_id];
  const equipClass = () => drawingKV()?.class ?? 0;
  const needLevel = () => KeyValues.equip_class_setting[equipClass()]?.need_level ?? 1;
  const canWear = () => {
    const heroLevel = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
    return heroLevel >= needLevel();
  };
  const mainEntry = () => drawing_attr_row.getDrawingMainEntry(drawingData());
  const drawingEntries = () => drawing_attr_row.parseDrawingEntries(drawingData().drawing_entry_data);
  const featureText = libs.createMemo(() => {
    const tags = new Set();
    const collectTags = attrData => {
      const id = attrData.id.startsWith("drawing_") ? attrData.id.slice(8) : attrData.id;
      const propText = $.Localize("#property_" + id, $.GetContextPanel());
      GetTagsFromString(propText).forEach(tag => tags.add(tag));
    };
    const entries = drawingEntries();
    entries.forEach(entry => collectTags(entry));
    const drawingAttrText = $.Localize("#drawing_equip_attr", $.GetContextPanel());
    GetTagsFromString(drawingAttrText).forEach(tag => tags.add(tag));
    tags.forEach(tag => {
      const tagDescription = $.Localize("#feature_" + tag + "_description", $.GetContextPanel());
      GetTagsFromString(tagDescription).forEach(nestedTag => tags.add(nestedTag));
    });
    return Array.from(tags).map(tag => {
      const name = GetLocalization("#feature_" + tag, "");
      const description = GetLocalization("#feature_" + tag + "_description", "");
      return name != "" && description != "" ? `${name}:${description}` : "";
    }).filter(text => text != "");
  });
  const displayName = () => {
    const nameStr = GetLocalization("#" + drawingData().drawing_item_id);
    if (drawingData().level > 0) {
      return nameStr.concat(`+${drawingData().level}`);
    }
    return nameStr;
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "ServerDrawingDetail"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "ServerEquipDetailLoaded",
        get ["class"]() {
          return "TipsRarity" + drawingData().rarity;
        }
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "Top"
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "TopInfo"
      }, _el$3),
      _el$5 = libs.createElement("Label", {
        id: "Name",
        get text() {
          return displayName();
        }
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        id: "OtherInfo"
      }, _el$4),
      _el$7 = libs.createElement("Label", {
        id: "EquipClass",
        "class": "TopLabel",
        get vars() {
          return {
            value: equipClass()
          };
        },
        text: "#Equip_Class"
      }, _el$6),
      _el$8 = libs.createElement("Label", {
        id: "EquipNeedLevel",
        "class": "TopLabel",
        get vars() {
          return {
            value: canWear() ? needLevel().toString() : ToColor(needLevel().toString(), "#E55043")
          };
        },
        text: "#Equip_NeedLevel",
        html: true
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        id: "AttrList"
      }, _el$2),
      _el$11 = libs.createElement("Panel", {
        id: "Bottom"
      }, _el$2),
      _el$12 = libs.createElement("Panel", {
        id: "FeatureLabelContainer"
      }, _el$11);
    libs.insert(_el$3, libs.createComponent(server_equipment_drawing.EquipmentDrawingItem, libs.mergeProps$1(drawingData, {
      showTooltip: false
    })), _el$4);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return mainEntry();
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), (() => {
          const _el$1 = libs.createElement("Label", {
            "class": "DrawingMainEntry",
            get text() {
              return drawing_attr_row.getDrawingMainEntryText(mainEntry());
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$1, "text", drawing_attr_row.getDrawingMainEntryText(mainEntry()), _$p));
          return _el$1;
        })()];
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return drawingEntries().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return drawingEntries();
          },
          children: data => libs.createComponent(drawing_attr_row.DrawingAttrRow, {
            get data() {
              return data();
            }
          })
        })];
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return featureText();
          },
          children: text => (() => {
            const _el$19 = libs.createElement("Label", {
              id: "FeatureLabel",
              get text() {
                return text();
              },
              html: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$19, "text", text(), _$p));
            return _el$19;
          })()
        })];
      }
    }));
    libs.insert(_el$11, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        const _el$14 = libs.createElement("Panel", {
            id: "ALTTipsContainer",
            width: "100%"
          }, null);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$14);
          const _el$16 = libs.createElement("Panel", {
            id: "ModeDetailsTips"
          }, _el$14),
          _el$17 = libs.createElement("Label", {
            id: "Tips",
            get text() {
              return GetLocalization("#EquipmentTips_Details");
            }
          }, _el$16);
          libs.createElement("Label", {
            id: "Hotkey",
            text: "ALT"
          }, _el$16);
        libs.setProp(_el$14, "width", "100%");
        libs.effect(_$p => libs.setProp(_el$17, "text", GetLocalization("#EquipmentTips_Details"), _$p));
        return _el$14;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "TipsRarity" + drawingData().rarity,
        _v$2 = displayName(),
        _v$3 = {
          value: equipClass()
        },
        _v$4 = {
          value: canWear() ? needLevel().toString() : ToColor(needLevel().toString(), "#E55043")
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "vars", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$8, "vars", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
}
function TooltipContents() {
  return libs.createComponent(libs.Show, {
    get when() {
      return drawingData();
    },
    get children() {
      const _el$20 = libs.createElement("Panel", {
          "class": "DetailContainer"
        }, null);
        libs.createElement("Panel", {
          "class": "BGImg"
        }, _el$20);
      libs.insert(_el$20, libs.createComponent(ServerDrawingDetail, {
        get data() {
          return drawingData();
        }
      }), null);
      return _el$20;
    }
  });
}
(function () {
  libs.render(() => libs.createComponent(TooltipContents, {}), root);
  root.style.overflow = "noclip";
  root.GetParent().style.overflow = "noclip";
  root.GetParent().GetParent().style.overflow = "noclip";
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();