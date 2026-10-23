--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('equipment_utils', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

const EQUIP_PARTS = [1, 2, 3, 4, 5, 6, 7, 8];
const MAX_EQUIPMENT_RARITY = 7;
const EQUIP_RARITY_COLOR = ["#7C918E", "#69944A", "#4472CE", "#875DD4", "#CEAD3C", "#E55043", "gradient(linear, 0% 0%, 0% 100%, from(#917E4B), to(#F1D999))"];
const EquipmentSimplifyConfig = ["id", "equipment_item_id", "level", "remaining_potential", "total_potential", "locked", "in_equip_suit", "ability_entry_data", "inlay_gems_data", "in_check"];
const GemSimplifyConfig = ["id", "gem_item_id", "locked", "level", "rarity", "gem_roll_change"];
const HeroID2Name = (() => {
  let res = {};
  for (let [name, {
    HeroID
  }] of Object.entries(KeyValues.heroes)) {
    res[HeroID] = name;
  }
  return res;
})();
function GetSimplifyEquipment(playerID = Game.GetLocalPlayerID(), tableName) {
  function Parse(equipments) {
    let res = {};
    for (const key in equipments) {
      const cacheData = CustomUIConfig.EquipmentDetailCache[key];
      let parsed = ParseEquipment(equipments[key], cacheData);
      if (parsed) {
        res[key] = parsed;
      }
    }
    return res;
  }
  CustomUIConfig.EquipmentDetailCache ??= {};
  CustomUIConfig.EquipmentSimpleDataCache ??= {};
  const playerEquipments = solid_utils.createServiceNetData("player_equipments", {}, playerID);
  return libs.createMemo(() => {
    let simpleData = Parse(playerEquipments());
    CustomUIConfig.EquipmentSimpleDataCache = simpleData;
    return simpleData;
  });
}
function ParseGem(serialized, copyData) {
  let result = {};
  GemSimplifyConfig.forEach((k, i) => {
    result[k] = serialized[i];
    if (copyData) {
      copyData[k] = serialized[i];
    }
  });
  return result;
}
function GetSimplifyGems(playerID = Game.GetLocalPlayerID()) {
  function Parse(gems) {
    let res = {};
    for (const key in gems) {
      const cacheData = CustomUIConfig.GemDetailCache[key];
      let parsed = ParseGem(gems[key], cacheData);
      if (parsed) {
        res[key] = parsed;
      }
    }
    return res;
  }
  CustomUIConfig.GemDetailCache ??= {};
  CustomUIConfig.GemSimpleDataCache ??= {};
  const playerGems = solid_utils.createServiceNetData("player_gems", {}, playerID);
  return libs.createMemo(() => {
    let simpleData = Parse(playerGems());
    CustomUIConfig.GemSimpleDataCache = simpleData;
    return simpleData;
  });
}
function EquipAttributeRound(id, value) {
  const ratio = CustomUIConfig.EntryRatio?.[id];
  return Round(value, ratio ?? 1);
}
function ParseEquipment(serialized, copyData) {
  let result = {};
  EquipmentSimplifyConfig.forEach((k, i) => {
    result[k] = serialized[i];
    if (copyData) {
      copyData[k] = serialized[i];
    }
  });
  FillCfgData(result);
  return result;
}
function FillCfgData(data) {
  const kv = KeyValues.info_item_equipment[data.equipment_item_id];
  if (kv == undefined) return false;
  const classSetting = KeyValues.equip_class_setting[kv.class];
  data.rarity = kv.rarity;
  data.equip_part = kv.equip_part;
  data.need_level = classSetting.need_level;
  data.class = kv.class;
  return true;
}
function GetEquipmentDetail(ids, callback, force = false, onTimeout) {
  CustomUIConfig.EquipmentDetailCache ??= {};
  let result = {};
  let requestIDs = force ? ids : ids.filter(id => {
    if (CustomUIConfig.EquipmentDetailCache[id]) {
      result[id] = CustomUIConfig.EquipmentDetailCache[id];
      return false;
    }
    return true;
  });
  if (requestIDs.length > 0) {
    return ServerRequest("get_equip_detail", {
      id: requestIDs.map(i => String(i))
    }, data => {
      for (let [id, v] of Object.entries(data)) {
        if (FillCfgData(v)) {
          result[id] = v;
          CustomUIConfig.EquipmentDetailCache[id] = v;
        }
      }
      callback(result);
    }, undefined, onTimeout);
  } else {
    callback(result);
  }
}
function GetGemDetail(ids, callback, force = false) {
  CustomUIConfig.GemDetailCache ??= {};
  let result = {};
  let requestIDs = force ? ids : ids.filter(id => {
    if (CustomUIConfig.GemDetailCache[id]) {
      result[id] = CustomUIConfig.GemDetailCache[id];
      return false;
    }
    return true;
  });
  if (requestIDs.length > 0) {
    return ServerRequest("get_gem_detail", {
      id: requestIDs.map(i => String(i))
    }, data => {
      for (let [id, v] of Object.entries(data)) {
        result[id] = v;
        CustomUIConfig.GemDetailCache[id] = v;
      }
      callback(result);
    });
  } else {
    callback(result);
  }
}
function GetSimpleDataCache(id) {
  return CustomUIConfig.EquipmentSimpleDataCache[id];
}
function ShowServerEquipTooltip(p, props) {
  let ids = [props.id1];
  if (props.id2) {
    ids.push(props.id2);
  }
  GetEquipmentDetail(ids, () => {
    if (p.IsValid() && p.BHasHoverStyle()) {
      ShowCustomTooltip(p, "server_equip", {
        id1: props.id1,
        id2: props.id2,
        hero_id: props.hero_id
      });
    }
  }, props.force);
}
function ShowServerGemTooltip(p, props) {
  let ids = [props.id1];
  if (props.id2) {
    ids.push(props.id2);
  }
  GetGemDetail(ids, () => {
    if (p.IsValid() && p.BHasHoverStyle()) {
      ShowCustomTooltip(p, "server_gem", {
        id1: props.id1,
        id2: props.id2,
        embedded_gem_data: props.embeddedGemData ?? ""
      });
    }
  });
}
const equipmentHasStateText = value => !["", "0", "false", "nil"].includes(String(value ?? "").toLowerCase());
function EquipmentIsEquiped(equip, heroID) {
  if (!equipmentHasStateText(equip.in_equip_suit)) {
    return false;
  }
  if (heroID == undefined) {
    return true;
  }
  const datas = String(equip.in_equip_suit).split(";");
  for (let i = 0; i < datas.length; i++) {
    const [hID, suit] = datas[i].split(":");
    if (Number(hID) === heroID) {
      return true;
    }
  }
  return false;
}
function EquipmentHasStates(equip, showTips) {
  let state = "";
  if (EquipmentIsEquiped(equip)) {
    state = "#EquipmentError_1";
  }
  const locked = String(equip.locked ?? "").toLowerCase();
  if (locked === "true" || locked === "1") {
    state = "#EquipmentError_2";
  }
  if (equipmentHasStateText(equip.in_check)) {
    state = equip.in_check === "gem_fusion" ? "#EquipmentError_GemFusionInCheck" : "#EquipmentError_InCheck";
  }
  let hasState = state != "";
  if (showTips && hasState) {
    ErrorMessage(state);
  }
  return hasState;
}
function GemHasStates(gem, showTips) {
  const hasState = gem.locked;
  if (showTips && hasState) {
    ErrorMessage("#EquipmentError_2");
  }
  return hasState;
}
function GetChaosRowInfo(data) {
  const id = data.id;
  const kv = KeyValues.equip_entry[id];
  const attribute = GetLocalization("#property_" + id);
  const isPercent = attribute.startsWith("%");
  const decimal = kv?.ratio ?? CustomUIConfig.EntryRatio?.[id] ?? 1;
  let attrName = attribute.replace("%", "");
  let valueText = Round(data.value, decimal).toString();
  if (isPercent) {
    valueText += "%";
  }
  return attrName + "+" + valueText;
}
const ColorMap = {
  gray: "#7C918E",
  green: "#69944A",
  blue: "#4472CE",
  purple: "#875DD4",
  yellow: "#CEAD3C",
  red: "#E55043",
  pink: "#DD92E8"
};
function GetEntryColorByPercent(percent) {
  if (percent <= 39) return "gray";
  if (percent <= 59) return "green";
  if (percent <= 69) return "blue";
  if (percent <= 79) return "purple";
  if (percent <= 89) return "yellow";
  if (percent <= 99) return "red";
  return "pink";
}
function GetEntryHtmlColorByPercent(percent) {
  return ColorMap[GetEntryColorByPercent(percent)];
}

exports.ColorMap = ColorMap;
exports.EQUIP_PARTS = EQUIP_PARTS;
exports.EQUIP_RARITY_COLOR = EQUIP_RARITY_COLOR;
exports.EquipAttributeRound = EquipAttributeRound;
exports.EquipmentHasStates = EquipmentHasStates;
exports.EquipmentIsEquiped = EquipmentIsEquiped;
exports.GemHasStates = GemHasStates;
exports.GetChaosRowInfo = GetChaosRowInfo;
exports.GetEntryColorByPercent = GetEntryColorByPercent;
exports.GetEntryHtmlColorByPercent = GetEntryHtmlColorByPercent;
exports.GetEquipmentDetail = GetEquipmentDetail;
exports.GetGemDetail = GetGemDetail;
exports.GetSimpleDataCache = GetSimpleDataCache;
exports.GetSimplifyEquipment = GetSimplifyEquipment;
exports.GetSimplifyGems = GetSimplifyGems;
exports.HeroID2Name = HeroID2Name;
exports.MAX_EQUIPMENT_RARITY = MAX_EQUIPMENT_RARITY;
exports.ParseEquipment = ParseEquipment;
exports.ShowServerEquipTooltip = ShowServerEquipTooltip;
exports.ShowServerGemTooltip = ShowServerGemTooltip;