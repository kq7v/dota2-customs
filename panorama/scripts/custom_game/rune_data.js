--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('rune_data', exports); const require = GameUI.__require;

var attribute_formatter = require('./attribute_formatter.js');

const isPlayerRuneValue = value => {
  return value !== "nil";
};
const parseRuneSuitData = value => {
  return value ?? [];
};
const buildRuneBagItems = playerRunes => {
  return Object.values(playerRunes).filter(isPlayerRuneValue).map(rune => ({
    ...(KeyValues.info_item_rune[rune.rune_item_id] ?? {}),
    ...rune,
    rarity: rune.rarity,
    suitIDs: parseRuneSuitData(rune.rune_suit_data).map(suit => suit.id)
  })).sort((a, b) => {
    return b.rarity - a.rarity || a.rune_item_id - b.rune_item_id || a.id - b.id;
  });
};
const getRuneIconPath = rune => {
  if (rune == undefined || rune.icon == undefined) {
    return undefined;
  }
  return `file://{images}/custom_game/store_items/${rune.icon}.png`;
};
const getRuneSuitIconPath = suitID => {
  const suitData = KeyValues.rune_suit_effect[suitID];
  if (suitData == undefined) {
    return undefined;
  }
  return `file://{images}/custom_game/conv/rune/${suitData.suit_icon}.png`;
};
const getRuneEntryConfig = entryID => {
  return GameUI.CustomUIConfig().rune_entry?.[entryID];
};
const buildRuneAttributeDisplays = (entries, entryType, options) => {
  if (entries == undefined) {
    return [];
  }
  return entries.map((entry, index) => {
    const config = getRuneEntryConfig(entry.id);
    const formatted = attribute_formatter.formatAttributeDisplay(entry, {
      config: {
        ratio: config?.ratio ?? 1,
        value_min: config?.value_min,
        value_max: config?.value_max
      },
      attributeNameColor: entryType === 1 ? "#BFAA82" : "#958D83",
      showAttributeRange: options?.showAttributeRange,
      usePercentColor: options?.usePercentColor
    });
    return {
      entryType,
      entryIndex: index,
      entryKey: `${entryType === 1 ? "main" : "adverb"}:${index}`,
      entry,
      valueText: formatted.valueText,
      nameHtml: formatted.nameHtml,
      colorName: formatted.colorName
    };
  });
};
const buildRuneSuitDisplays = suits => {
  if (suits == undefined) {
    return [];
  }
  return suits.map((suit, index) => ({
    entryType: 3,
    entryIndex: index,
    entryKey: `suit:${index}`,
    suitKey: suit.id,
    currentPoint: suit.value
  }));
};

exports.buildRuneAttributeDisplays = buildRuneAttributeDisplays;
exports.buildRuneBagItems = buildRuneBagItems;
exports.buildRuneSuitDisplays = buildRuneSuitDisplays;
exports.getRuneIconPath = getRuneIconPath;
exports.getRuneSuitIconPath = getRuneSuitIconPath;