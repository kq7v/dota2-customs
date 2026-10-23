--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('drawing_attr_row', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var attribute_formatter = require('./attribute_formatter.js');

function parseDrawingEntries(v) {
  if (!v) return [];
  if (typeof v === "string") return JSON.parseSafe(v) ?? [];
  return v;
}
function getDrawingMainEntry(data) {
  const entries = parseDrawingEntries(data?.main_entry_data);
  if (entries.length <= 0) {
    return undefined;
  }
  return KeyValues.drawing_entry_main[toFiniteNumber(entries[0].id)];
}
function getDrawingMainEntryText(mainEntry) {
  if (!mainEntry) {
    return "";
  }
  return LocalizeWithVars("#" + mainEntry.entry_main_type, {
    value_1: mainEntry.value_1 ?? 0,
    value_2: mainEntry.value_2 ?? 0
  });
}
function getDrawingEquipAttributeDisplay(attrData) {
  const id = attrData.id.startsWith("drawing_") ? attrData.id.slice(8) : attrData.id;
  const displayData = id === attrData.id ? attrData : {
    ...attrData,
    id
  };
  const kv = KeyValues.equip_entry[id];
  const info = attribute_formatter.formatAttributeDisplay(displayData, {
    config: {
      ratio: kv?.ratio ?? CustomUIConfig.EntryRatio?.[id] ?? 1,
      value_min: kv?.value_min,
      value_max: kv?.value_max
    },
    attributeNameColor: "#958D83",
    attributeNameLocalize: "drawing_equip_attr"
  });
  return {
    ...info,
    nameHtml: info.nameHtml
  };
}

function DrawingAttrRow(props) {
  const info = () => getDrawingEquipAttributeDisplay(props.data);
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return `DrawingAttrRow EquipmentAttrRow Adverb ${info().colorName ?? ""} ${props.class ?? ""}`.trim();
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        get id() {
          return props.pointId ?? "Point";
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        get id() {
          return props.valueId ?? "AttrValue";
        },
        get text() {
          return info().valueText;
        },
        html: true
      }, _el$),
      _el$4 = libs.createElement("Label", {
        get id() {
          return props.nameId ?? "AttrName";
        },
        get text() {
          return info().nameHtml;
        },
        html: true
      }, _el$);
    libs.effect(_p$ => {
      const _v$ = `DrawingAttrRow EquipmentAttrRow Adverb ${info().colorName ?? ""} ${props.class ?? ""}`.trim(),
        _v$2 = props.pointId ?? "Point",
        _v$3 = props.valueId ?? "AttrValue",
        _v$4 = info().valueText,
        _v$5 = props.nameId ?? "AttrName",
        _v$6 = info().nameHtml;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "id", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "id", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$3, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$4, "id", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$4, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$;
  })();
}

exports.DrawingAttrRow = DrawingAttrRow;
exports.getDrawingMainEntry = getDrawingMainEntry;
exports.getDrawingMainEntryText = getDrawingMainEntryText;
exports.parseDrawingEntries = parseDrawingEntries;