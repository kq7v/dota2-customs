--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('service_netdata_helper', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

function parseJSONSafe(jsonString, defaultValue) {
  if (!jsonString || jsonString === "null" || jsonString === "undefined") {
    return defaultValue;
  }
  try {
    const parsed = JSON.parse(jsonString);
    return parsed || defaultValue;
  } catch (e) {
    print(`[parseJSONSafe] Failed to parse JSON: ${e}`);
    return defaultValue;
  }
}
function getShopItemBaseCost(itemName, rarity, fallbackCost = 0) {
  let cost;
  const itemKV = KeyValues.npc_items_custom[itemName];
  if (itemKV != undefined && itemKV.GoldCost != undefined && String(itemKV.GoldCost) != "") {
    const costList = String(itemKV.GoldCost).split(" ").map(c => parseInt(c));
    cost = costList[Math.min(costList.length - 1, rarity - 1)];
  }
  return cost ?? SHOP_RARITY_COST[rarity] ?? fallbackCost;
}
function getShopDiscountPercent(heroIndex) {
  return Entities.IsValidEntity(heroIndex) ? Entities.GetPropertyValue(heroIndex, "shop_discount") : 0;
}
function getDiscountedShopItemCost(heroIndex, itemName, rarity, fallbackCost = 0) {
  const cost = getShopItemBaseCost(itemName, rarity, fallbackCost);
  if (cost <= 0) {
    return 0;
  }
  const discountPercent = getShopDiscountPercent(heroIndex);
  return Math.max(0, Math.ceil(cost * (1 - discountPercent * 0.01)));
}
function getShopItemUpgradeInfo(heroIndex, itemName) {
  const itemKV = KeyValues.npc_items_custom[itemName];
  const targetGroup = String(itemKV?.UpgradeGroup ?? "");
  const targetRank = Number(itemKV?.UpgradeRank ?? 0);
  if (targetGroup == "" || targetRank <= 0) {
    return undefined;
  }
  const unitData = getCachedNetDataKey("unit", String(heroIndex));
  let owned;
  for (const item of unitData?.items ?? []) {
    const ownedKV = KeyValues.npc_items_custom[item.itemName];
    if (String(ownedKV?.UpgradeGroup ?? "") != targetGroup) {
      continue;
    }
    const rank = Number(ownedKV?.UpgradeRank ?? 0);
    if (owned == undefined || rank > owned.rank) {
      owned = {
        itemName: item.itemName,
        level: getUnitItemNetData(heroIndex, item).level,
        rank
      };
    }
  }
  if (owned == undefined) {
    return undefined;
  }
  return {
    owned,
    targetRank,
    isUpgrade: owned.rank < targetRank
  };
}
function getShopItemDisplayCost(heroIndex, itemName, rarity, fallbackCost = 0) {
  const upgradeInfo = getShopItemUpgradeInfo(heroIndex, itemName);
  if (upgradeInfo != undefined) {
    if (!upgradeInfo.isUpgrade) {
      return 0;
    }
    return Math.max(0, getDiscountedShopItemCost(heroIndex, itemName, rarity, fallbackCost) - getDiscountedShopItemCost(heroIndex, upgradeInfo.owned.itemName, upgradeInfo.owned.level, fallbackCost));
  }
  return getDiscountedShopItemCost(heroIndex, itemName, rarity, fallbackCost);
}
function getTalentLevel(talentId, talentLevels) {
  return talentLevels[talentId] ?? 0;
}
function useTalentLevels(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    const talentsStr = data?.talents;
    return parseJSONSafe(talentsStr, {});
  }
  const playerTalent = solid_utils.createServiceNetData("player_talent", playerID);
  return libs.createMemo(() => Parse(playerTalent()));
}
function usePlayerAccountLevel(levelType = "hero_level", playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    return data?.[levelType] ?? {
      level: 1,
      extra_exp: 0
    };
  }
  const playerAccountLevels = solid_utils.createServiceNetData("player_account_levels", playerID);
  return libs.createMemo(() => Parse(playerAccountLevels()));
}
function usePlayerMaxDiff(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    return toFiniteNumber(data?.max_diff, 0);
  }
  const playerCommonMatchData = solid_utils.createServiceNetData("player_common_match_data", playerID);
  return libs.createMemo(() => Parse(playerCommonMatchData()));
}
function usePlayerMaxAbyssalDiff(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    let maxDiff = 0;
    for (const [diffText, info] of Object.entries(data ?? {})) {
      if ((info?.star ?? 0) <= 0) {
        continue;
      }
      const diff = toFiniteNumber(diffText, 0);
      if (diff > maxDiff) {
        maxDiff = diff;
      }
    }
    return maxDiff;
  }
  const playerAbyssalFirstPasses = solid_utils.createServiceNetData("player_abyssal_first_passes", playerID);
  return libs.createMemo(() => Parse(playerAbyssalFirstPasses()));
}
function usePlayerCouriers(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    return data ?? {};
  }
  const playerCouriers = solid_utils.createServiceNetData("player_couriers", playerID);
  return libs.createMemo(() => Parse(playerCouriers()));
}
function getCourierCategories() {
  const categories = [0];
  for (const id of Object.keys(KeyValues.service_courier || {})) {
    const category = KeyValues.service_courier[id]?.category;
    if (category !== undefined && category !== null && !categories.includes(category)) {
      categories.push(category);
    }
  }
  return categories.sort((a, b) => a - b);
}
function getSortedCourierIDs(playerCouriers, categoryID = 0) {
  const courierIDList = Object.keys(KeyValues.courier);
  return courierIDList.filter(id => {
    if (categoryID === 0) return true;
    return KeyValues.service_courier[id]?.category === categoryID;
  }).map(id => ({
    id,
    data: playerCouriers[id] ?? {
      courier_id: id,
      star: 0,
      exp: 0,
      extra_star_exp: 0,
      equipped: 0,
      assist_slot: 0
    }
  })).sort((a, b) => {
    const aEquipped = Boolean(a.data.equipped);
    const bEquipped = Boolean(b.data.equipped);
    if (aEquipped !== bEquipped) {
      return bEquipped ? 1 : -1;
    }
    const starDiff = b.data.star - a.data.star;
    if (starDiff !== 0) {
      return starDiff;
    }
    const aQuality = KeyValues.service_courier[a.id]?.quality ?? 0;
    const bQuality = KeyValues.service_courier[b.id]?.quality ?? 0;
    return bQuality - aQuality;
  }).map(item => toFiniteString(item.data.courier_id));
}
function usePlayerAchievements(playerID = Game.GetLocalPlayerID()) {
  function Parse(data) {
    return data ?? {};
  }
  const playerAchievements = solid_utils.createServiceNetData("player_achievements", playerID);
  return libs.createMemo(() => Parse(playerAchievements()));
}
function resolveMaybeAccessor(value) {
  if (typeof value === "function") {
    return value();
  }
  return value;
}
function getPlayerSteamID(props) {
  return CustomUIConfig.PlayerManager.ResolveSteamID({
    steamID: resolveMaybeAccessor(props.steamID),
    steam64ID: resolveMaybeAccessor(props.steam64ID),
    playerID: resolveMaybeAccessor(props.playerID)
  });
}
function createPlayerInfoAccessor(props, requestData) {
  const [steamID, setSteamID] = libs.createSignal();
  const [snapshot, setSnapshot] = libs.createSignal();
  const applySnapshot = targetSteamID => {
    setSnapshot(CustomUIConfig.PlayerManager.GetSnapshot(targetSteamID));
  };
  libs.createEffect(() => {
    const targetSteamID = getPlayerSteamID(props);
    setSteamID(targetSteamID);
    if (targetSteamID == undefined) {
      setSnapshot(undefined);
      return;
    }
    const unsubscribe = CustomUIConfig.PlayerManager.Subscribe(targetSteamID, () => {
      if (steamID() == targetSteamID) {
        applySnapshot(targetSteamID);
      }
    });
    libs.onCleanup(unsubscribe);
    applySnapshot(targetSteamID);
    if (requestData) {
      CustomUIConfig.PlayerManager.EnsurePlayerInfo(targetSteamID);
    }
  });
  return {
    data: () => snapshot()?.data,
    steamID,
    snapshot
  };
}
function GetPlayerInfoCache(props) {
  const playerInfo = createPlayerInfoAccessor(props, false);
  return {
    data: playerInfo.data,
    steamID: playerInfo.steamID
  };
}
function GetPlayerInfo(props) {
  const playerInfo = createPlayerInfoAccessor(props, true);
  return {
    data: playerInfo.data,
    loading: () => playerInfo.snapshot()?.status == "loading",
    refreshing: () => playerInfo.snapshot()?.status == "refreshing",
    error: () => playerInfo.snapshot()?.error,
    steamID: playerInfo.steamID,
    refresh: () => {
      const targetSteamID = playerInfo.steamID();
      if (targetSteamID != undefined) {
        CustomUIConfig.PlayerManager.RefreshPlayerInfo(targetSteamID);
      }
    }
  };
}

exports.GetPlayerInfo = GetPlayerInfo;
exports.GetPlayerInfoCache = GetPlayerInfoCache;
exports.getCourierCategories = getCourierCategories;
exports.getPlayerSteamID = getPlayerSteamID;
exports.getShopItemDisplayCost = getShopItemDisplayCost;
exports.getShopItemUpgradeInfo = getShopItemUpgradeInfo;
exports.getSortedCourierIDs = getSortedCourierIDs;
exports.getTalentLevel = getTalentLevel;
exports.usePlayerAccountLevel = usePlayerAccountLevel;
exports.usePlayerAchievements = usePlayerAchievements;
exports.usePlayerCouriers = usePlayerCouriers;
exports.usePlayerMaxAbyssalDiff = usePlayerMaxAbyssalDiff;
exports.usePlayerMaxDiff = usePlayerMaxDiff;
exports.useTalentLevels = useTalentLevels;