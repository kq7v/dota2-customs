--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('entry_range_inputs', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');

function parseEntryFilterBound(text) {
  const value = text?.trim() ?? "";
  if (value === "") return undefined;
  return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) && Number.isFinite(Number(value)) ? Number(value) : NaN;
}
function isEntryFilterRangeValid(range, integer = false) {
  const min = parseEntryFilterBound(range?.min);
  const max = parseEntryFilterBound(range?.max);
  if ([min, max].some(value => value !== undefined && (!Number.isFinite(value) || integer && (!Number.isInteger(value) || value < 1)))) return false;
  return min === undefined || max === undefined || min <= max;
}
function matchesEntryFilterRange(value, range, integer = false) {
  if (!isEntryFilterRangeValid(range, integer)) return false;
  const min = parseEntryFilterBound(range?.min);
  const max = parseEntryFilterBound(range?.max);
  if (min === undefined && max === undefined) return true;
  if (typeof value !== "number" && typeof value !== "string" || String(value).trim() === "") return false;
  const number = Number(value);
  return Number.isFinite(number) && (min === undefined || number >= min - 1e-9) && (max === undefined || number <= max + 1e-9);
}
function matchesSelectedEntryRanges(entries, selected, ranges, any = false) {
  if (selected.length === 0) return true;
  if (selected.some(id => !isEntryFilterRangeValid(ranges[id]))) return false;
  const matches = id => (entries ?? []).some(entry => entry.id === id && matchesEntryFilterRange(entry.value ?? entry.base_value, ranges[id]));
  return any ? selected.some(matches) : selected.every(matches);
}
function serializeEntryFilterRanges(ranges, selected) {
  return selected.map(id => ({
    id,
    min: parseEntryFilterBound(ranges[id]?.min),
    max: parseEntryFilterBound(ranges[id]?.max)
  }));
}

function EntryRangeInputs(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "EntryRangeInputs"
      }, null),
      _el$2 = libs.createElement("Label", {
        "class": "EntryRangeSeparator",
        text: "-"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        "class": "EntryRangeUnit",
        get text() {
          return props.unit ?? "";
        }
      }, _el$);
    libs.insert(_el$, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
      "class": "EntryRangeValue",
      get text() {
        return props.range?.min ?? "";
      },
      get enabled() {
        return props.enabled !== false;
      },
      get placeholder() {
        return GetLocalization("#ItemFilter_MinValue");
      },
      onChange: (_, __, min) => props.onChange({
        min,
        max: props.range?.max ?? ""
      })
    }), _el$2);
    libs.insert(_el$, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
      "class": "EntryRangeValue",
      get text() {
        return props.range?.max ?? "";
      },
      get enabled() {
        return props.enabled !== false;
      },
      get placeholder() {
        return GetLocalization("#ItemFilter_MaxValue");
      },
      onChange: (_, __, max) => props.onChange({
        min: props.range?.min ?? "",
        max
      })
    }), _el$3);
    libs.effect(_p$ => {
      const _v$ = {
          Invalid: props.enabled !== false && !isEntryFilterRangeValid(props.range, props.integer)
        },
        _v$2 = props.unit ?? "",
        _v$3 = !!props.unit;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "visible", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}

exports.EntryRangeInputs = EntryRangeInputs;
exports.isEntryFilterRangeValid = isEntryFilterRangeValid;
exports.matchesSelectedEntryRanges = matchesSelectedEntryRanges;
exports.serializeEntryFilterRanges = serializeEntryFilterRanges;