--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('courier_explore_preview', exports); const require = GameUI.__require;

const MIN_COURIER_STAR = 1;
function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      return undefined;
    }
    const parsedValue = Number(trimmedValue);
    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }
  return undefined;
}
function roundDropCount(value) {
  return Math.round(value * 100) / 100;
}
function applyPercentage(value, pct) {
  if (pct === 0) {
    return roundDropCount(value);
  }
  return roundDropCount(value * (100 + pct) / 100);
}
function createDropAccumulator() {
  return {
    order: [],
    values: {}
  };
}
function addDrop(accumulator, itemID, count) {
  if (itemID === "") {
    return;
  }
  const normalizedCount = roundDropCount(count);
  if (normalizedCount <= 0) {
    return;
  }
  if (accumulator.values[itemID] === undefined) {
    accumulator.order.push(itemID);
    accumulator.values[itemID] = 0;
  }
  accumulator.values[itemID] = roundDropCount(accumulator.values[itemID] + normalizedCount);
}
function formatDropCount(value) {
  const roundedValue = roundDropCount(value);
  if (Math.abs(roundedValue - Math.round(roundedValue)) < 0.0001) {
    return String(Math.round(roundedValue));
  }
  return roundedValue.toFixed(2).replace(/\.?0+$/, "");
}
function serializeDropAccumulator(accumulator) {
  return accumulator.order.map(itemID => {
    return `${itemID}:${formatDropCount(accumulator.values[itemID])}`;
  }).join("|");
}
function applyExploreModifierRecord(config, modifiers) {
  if (config === undefined) {
    return;
  }
  for (const [key, rawValue] of Object.entries(config)) {
    const value = toNumber(rawValue);
    if (value === undefined) {
      continue;
    }
    if (key === "explore_extra_profit_pct") {
      modifiers.extraProfitPct += value;
      continue;
    }
    const match = /^explore_profit_(.+)_pct$/.exec(key);
    if (match === null) {
      continue;
    }
    const itemID = match[1];
    modifiers.baseProfitPctByItem[itemID] = (modifiers.baseProfitPctByItem[itemID] ?? 0) + value;
  }
}
function buildExploreModifiers(courierConfig, displayStar) {
  const modifiers = {
    baseProfitPctByItem: {},
    extraProfitPct: 0
  };
  for (let star = MIN_COURIER_STAR; star <= displayStar; star++) {
    applyExploreModifierRecord(courierConfig[`star_effect${star}`], modifiers);
  }
  applyExploreModifierRecord(courierConfig[`explore_skill${displayStar}`], modifiers);
  return modifiers;
}
function buildBaseDrops(courierConfig, displayStar, modifiers) {
  const accumulator = createDropAccumulator();
  const rarityKey = String(courierConfig.quality ?? "");
  const starKey = String(displayStar);
  const rewardConfig = KeyValues.explore_reward[rarityKey]?.[starKey]?.explore_reward;
  if (rewardConfig === undefined) {
    return "";
  }
  for (const [itemID, rawCount] of Object.entries(rewardConfig)) {
    const baseCount = toNumber(rawCount);
    if (baseCount === undefined) {
      continue;
    }
    const extraPct = modifiers.baseProfitPctByItem[itemID] ?? 0;
    addDrop(accumulator, itemID, applyPercentage(baseCount, extraPct));
  }
  return serializeDropAccumulator(accumulator);
}
function buildExtraDrops(courierConfig, displayStar, modifiers, skillPrefix) {
  const accumulator = createDropAccumulator();
  const skillValue = courierConfig[`${skillPrefix}${displayStar}`];
  const privilegeIDs = [];
  if (typeof skillValue === "string") {
    if (skillValue.startsWith("privilege_")) {
      privilegeIDs.push(skillValue);
    }
  } else {
    const skillConfig = skillValue;
    if (skillConfig !== undefined) {
      for (const privilegeID of Object.keys(skillConfig)) {
        if (privilegeID.startsWith("privilege_")) {
          privilegeIDs.push(privilegeID);
        }
      }
    }
  }
  for (let index = 0; index < privilegeIDs.length; index++) {
    const privilegeID = privilegeIDs[index];
    const privilegeConfig = KeyValues.idle_game_drop_privilege[privilegeID];
    if (privilegeConfig === undefined || privilegeConfig.itemid === undefined) {
      continue;
    }
    const baseCount = toNumber(privilegeConfig.num) ?? 0;
    if (baseCount <= 0) {
      continue;
    }
    addDrop(accumulator, String(privilegeConfig.itemid), applyPercentage(baseCount, modifiers.extraProfitPct));
  }
  return serializeDropAccumulator(accumulator);
}
function parseDropPreview(serializedDrops) {
  if (serializedDrops === "") {
    return [];
  }
  const result = [];
  const segments = serializedDrops.split("|");
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === "") {
      continue;
    }
    const parts = segment.split(":");
    if (parts.length < 2) {
      continue;
    }
    const itemID = toNumber(parts[0]);
    if (itemID === undefined) {
      continue;
    }
    result.push({
      id: itemID,
      count: toNumber(parts.slice(1).join(":")) ?? 0
    });
  }
  return result;
}
function getCourierExplorePreview(courierID, playerCouriers, skillPrefix = "explore_skill") {
  const courierConfig = KeyValues.service_courier?.[courierID];
  const ownedStar = playerCouriers[courierID]?.star ?? 0;
  const displayStar = ownedStar > 0 ? ownedStar : MIN_COURIER_STAR;
  if (courierConfig === undefined) {
    return {
      displayStar,
      baseDrops: "",
      extraDrops: ""
    };
  }
  const modifiers = buildExploreModifiers(courierConfig, displayStar);
  return {
    displayStar,
    baseDrops: buildBaseDrops(courierConfig, displayStar, modifiers),
    extraDrops: buildExtraDrops(courierConfig, displayStar, modifiers, skillPrefix)
  };
}

exports.getCourierExplorePreview = getCourierExplorePreview;
exports.parseDropPreview = parseDropPreview;