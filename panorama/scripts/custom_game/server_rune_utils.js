--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('server_rune_utils', exports); const require = GameUI.__require;

var attribute_formatter = require('./attribute_formatter.js');

const engravingEntryConfigByName = Object.values(KeyValues.engraving_entry).reduce((result, config) => {
  result[config.entry_name] = config;
  return result;
}, {});
const isPlayerEngravingValue = value => {
  return value !== "nil";
};
const buildEngravingBagItems = playerEngravings => {
  return Object.values(playerEngravings).filter(isPlayerEngravingValue).map(engraving => ({
    ...(KeyValues.info_item_engraving[engraving.engraving_item_id] ?? {}),
    ...engraving
  })).sort((a, b) => {
    return b.rarity - a.rarity || a.class - b.class || a.engraving_item_id - b.engraving_item_id || a.id - b.id;
  });
};
const getEngravingIconPath = engraving => {
  if (engraving?.icon == undefined) {
    return undefined;
  }
  return `file://{images}/custom_game/store_items/${engraving.icon}.png`;
};
const getEngravingIconPathByItemID = engravingItemID => {
  if (engravingItemID == undefined) {
    return undefined;
  }
  return getEngravingIconPath(KeyValues.info_item_engraving[engravingItemID]);
};
const getEngravingEntryConfig = entryID => {
  return engravingEntryConfigByName[entryID];
};
const buildEngravingAttributeDisplays = (entries, options) => {
  if (entries == undefined) {
    return [];
  }
  return entries.map(entry => {
    const config = getEngravingEntryConfig(entry.id);
    const formatted = attribute_formatter.formatAttributeDisplay(entry, {
      config: {
        ratio: config?.ratio ?? 1,
        value_min: config?.value_min,
        value_max: config?.value_max
      },
      attributeNameColor: "#958D83",
      showAttributeRange: options?.showAttributeRange,
      usePercentColor: options?.usePercentColor
    });
    return {
      entry,
      valueText: formatted.valueText,
      nameHtml: formatted.nameHtml,
      colorName: formatted.colorName
    };
  });
};

function GetRuneDetail(runeID, callback, force = false) {
  CustomUIConfig.RuneDetailCache ??= {};
  const id = String(runeID);
  const playerRunes = getServiceNetData("player_runes", Players.GetLocalPlayer()) ?? {};
  const localRune = playerRunes[id];
  if (!force && localRune && localRune !== "nil") {
    CustomUIConfig.RuneDetailCache[id] = localRune;
    callback(CustomUIConfig.RuneDetailCache[id]);
    return;
  }
  if (!force && CustomUIConfig.RuneDetailCache[id]) {
    callback(CustomUIConfig.RuneDetailCache[id]);
    return;
  }
  return ServerRequest("get_rune_detail", {
    id
  }, data => {
    let result;
    for (const [detailID, value] of Object.entries(data)) {
      CustomUIConfig.RuneDetailCache[detailID] = value;
      if (detailID === id) {
        result = value;
      }
    }
    if (result != undefined) {
      callback(result);
    }
  });
}
function GetEngravingDetail(engravingID, callback, force = false) {
  CustomUIConfig.EngravingDetailCache ??= {};
  const id = String(engravingID);
  const playerEngravings = getServiceNetData("player_engravings", Players.GetLocalPlayer()) ?? {};
  const localEngraving = playerEngravings[id];
  if (!force && localEngraving && localEngraving !== "nil") {
    CustomUIConfig.EngravingDetailCache[id] = localEngraving;
    callback(CustomUIConfig.EngravingDetailCache[id]);
    return;
  }
  if (!force && CustomUIConfig.EngravingDetailCache[id]) {
    callback(CustomUIConfig.EngravingDetailCache[id]);
    return;
  }
  return ServerRequest("get_engraving_detail", {
    id
  }, data => {
    let result;
    for (const [detailID, value] of Object.entries(data)) {
      CustomUIConfig.EngravingDetailCache[detailID] = value;
      if (detailID === id) {
        result = value;
      }
    }
    if (result != undefined) {
      callback(result);
    }
  });
}
function ShowServerRuneTooltip(panel, props) {
  GetRuneDetail(props.id1, () => {
    if (panel.IsValid() && panel.BHasHoverStyle()) {
      ShowCustomTooltip(panel, "server_rune", {
        id1: props.id1,
        equipped_skill_id: props.equippedSkillID != undefined && props.equippedSkillID >= 1 && props.equippedSkillID <= 5 ? props.equippedSkillID : 0
      });
    }
  }, props.force);
}
function ShowServerEngravingTooltip(panel, props) {
  GetEngravingDetail(props.id1, () => {
    if (panel.IsValid() && panel.BHasHoverStyle()) {
      ShowCustomTooltip(panel, "server_engraving", {
        id1: props.id1
      });
    }
  }, props.force);
}

exports.GetEngravingDetail = GetEngravingDetail;
exports.GetRuneDetail = GetRuneDetail;
exports.ShowServerEngravingTooltip = ShowServerEngravingTooltip;
exports.ShowServerRuneTooltip = ShowServerRuneTooltip;
exports.buildEngravingAttributeDisplays = buildEngravingAttributeDisplays;
exports.buildEngravingBagItems = buildEngravingBagItems;
exports.getEngravingEntryConfig = getEngravingEntryConfig;
exports.getEngravingIconPath = getEngravingIconPath;
exports.getEngravingIconPathByItemID = getEngravingIconPathByItemID;