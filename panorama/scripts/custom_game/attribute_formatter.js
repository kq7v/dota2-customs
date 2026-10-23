--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('attribute_formatter', exports); const require = GameUI.__require;

var equipment_utils = require('./equipment_utils.js');

function formatAttributeNameHtml(data, options) {
  const id = data.id;
  const attribute = GetLocalization("#property_" + id);
  const isPercent = attribute.startsWith("%");
  const decimal = options?.config?.ratio ?? 1;
  let attrName = attribute.replace("%", "");
  const percent = data.percent;
  const colorName = (options?.usePercentColor ?? true) && percent !== undefined ? equipment_utils.GetEntryColorByPercent(percent) : undefined;
  const color = colorName ? equipment_utils.ColorMap[colorName] : options?.attributeNameColor ?? "#BFAA82";
  const rangeMin = data.base_min ?? options?.config?.value_min;
  const rangeMax = data.base_max ?? options?.config?.value_max;
  if (options?.attributeNameLocalize != undefined) {
    attrName = LocalizeWithVars(options?.attributeNameLocalize, {
      value: attrName
    });
  }
  if ((options?.showAttributeRange ?? true) && rangeMin !== undefined && rangeMax !== undefined) {
    let minText = Round(rangeMin, decimal).toString();
    let maxText = Round(rangeMax, decimal).toString();
    if (isPercent) {
      minText += "%";
      maxText += "%";
    }
    attrName += ToColor(`(${minText}-${maxText})`, "#686868");
  }
  if (data.extra_value != undefined) {
    const extraValue = toFiniteNumber(data.extra_value, 0);
    if (extraValue >= 0) {
      let extraValueText = Round(extraValue, decimal).toString();
      if (isPercent) {
        extraValueText += "%";
      }
      attrName += ToColor(`+${extraValueText}`, "#F2D85B");
    }
  }
  return {
    nameHtml: ToColor(attrName, color),
    colorName
  };
}
function formatAttributeDisplay(data, options) {
  const id = data.id;
  const attribute = GetLocalization("#property_" + id);
  const isPercent = attribute.startsWith("%");
  const decimal = options?.config?.ratio ?? 1;
  const baseValue = data.base_value ?? data.value;
  const extraValue = data.value - baseValue;
  let baseValueText = Round(baseValue, decimal).toString();
  let extraValueText = Round(extraValue, decimal).toString();
  if (isPercent) {
    baseValueText += "%";
    extraValueText += "%";
  }
  let valueText = options?.hideZeroBaseValue && Round(baseValue, decimal) === 0 ? "" : `+${baseValueText}`;
  if (extraValue > 0 && !options?.hideExtraValue) {
    valueText += ToColor(`+${extraValueText}`, "#61C441");
  }
  const nameInfo = formatAttributeNameHtml(data, options);
  return {
    valueText,
    nameHtml: nameInfo.nameHtml,
    colorName: nameInfo.colorName
  };
}

exports.formatAttributeDisplay = formatAttributeDisplay;
exports.formatAttributeNameHtml = formatAttributeNameHtml;