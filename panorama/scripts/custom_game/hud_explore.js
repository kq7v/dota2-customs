--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var Player = require('./Player.js');
var solid_utils = require('./solid_utils.js');
var collection = require('./collection.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_SectionDivider = require('./EOM_SectionDivider.js');
var RecycleView = require('./RecycleView.js');
var StoreItem = require('./StoreItem.js');
var courier_card = require('./courier_card.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var courier_explore_preview = require('./courier_explore_preview.js');
var courier_explore_time = require('./courier_explore_time.js');
require('./EOM_TextEntry.js');
require('./EOM_CostLabel.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const NORMAL_EXPLORE_SLOT_IDS = [1, 2, 3, 4, 5];
const PRIVILEGE_EXPLORE_SLOT_ID = 99;
const PRIVILEGE_EXPLORE_KEY = "privilege_explore_slot";
const NORMAL_SLOT_LOCKED_TIP_KEY = "#CourierExplore_NormalSlotLockedTip";
const EXPLORE_PROFIT_EFFECT_KEY = "explore_profit_110005_pct";
const getNormalSlotUnlockLevel = slotID => {
  const configs = KeyValues.explore_slot ?? {};
  let unlockLevel;
  for (const levelKey of Object.keys(configs)) {
    const config = configs[levelKey];
    const buildLevel = Number(config?.build_level ?? levelKey);
    const slotCount = Number(config?.explore_slot ?? 0);
    if (buildLevel <= 0 || slotCount < slotID) {
      continue;
    }
    if (unlockLevel === undefined || buildLevel < unlockLevel) {
      unlockLevel = buildLevel;
    }
  }
  return unlockLevel ?? slotID;
};
const ALL_EXPLORE_SLOT_IDS = [...NORMAL_EXPLORE_SLOT_IDS, PRIVILEGE_EXPLORE_SLOT_ID];
const _exploreDatas = solid_utils.createServiceNetData("player_idle_game_explore_datas", {});
const _farmLevel = solid_utils.createServiceNetData("player_idle_game_explore_building_data", {
  level: 1
});
const playerPrivileges = solid_utils.createPlayerNetDataSignal("common", "player_privileges", {});
const _hasPrivilegeExploreSlot = libs.createMemo(() => playerPrivileges()[PRIVILEGE_EXPLORE_KEY] == true);
const _hasRewards = rewards => {
  if (rewards === undefined) return false;
  let list = rewards;
  if (typeof list === "string") {
    try {
      const parsed = JSON.parse(list);
      list = Array.isArray(parsed?.[0]) ? parsed[0] : parsed;
    } catch {
      return false;
    }
  }
  return Array.isArray(list) && list.length > 0;
};
const _getClaimableSlotIDs = libs.createMemo(() => {
  const datas = _exploreDatas();
  const level = Math.max(1, Number(_farmLevel().level ?? 1));
  const slotConfigs = KeyValues.explore_slot ?? {};
  const claimable = [];
  for (const slotID of NORMAL_EXPLORE_SLOT_IDS) {
    let unlocked = false;
    for (const lk of Object.keys(slotConfigs)) {
      const cfg = slotConfigs[lk];
      const bl = Number(cfg?.build_level ?? lk);
      const sc = Number(cfg?.explore_slot ?? 0);
      if (bl > 0 && sc >= slotID && bl <= level) {
        unlocked = true;
        break;
      }
    }
    if (unlocked) {
      const data = datas[String(slotID)];
      const courierID = Number(data?.courier_id ?? 0);
      if (courierID > 0 && _hasRewards(data?.rewards)) {
        claimable.push(slotID);
      }
    }
  }
  if (_hasPrivilegeExploreSlot()) {
    const data = datas[String(PRIVILEGE_EXPLORE_SLOT_ID)];
    const courierID = Number(data?.courier_id ?? 0);
    if (courierID > 0 && _hasRewards(data?.rewards)) {
      claimable.push(PRIVILEGE_EXPLORE_SLOT_ID);
    }
  }
  return claimable;
});
libs.createEffect(libs.on(_getClaimableSlotIDs, claimable => {
  for (const slotID of ALL_EXPLORE_SLOT_IDS) {
    CustomUIConfig.SetRedPoint(claimable.includes(slotID), "explore", "CourierExplore_Title", "Slot_" + slotID);
  }
}));
function IdleSlotPanel() {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "ExploreTeamSlotPlaceholder",
        hittest: false
      }, null);
      libs.createElement("Image", {
        "class": "ExploreTeamSlotPlaceholderIdleBG",
        src: "file://{images}/custom_game/conv/item/item_hero_empty.png"
      }, _el$);
      libs.createElement("Image", {
        "class": "ExploreTeamSlotPlaceholderIdleAddIcon",
        src: "file://{images}/custom_game/e1_equipment/e1_img_add.png"
      }, _el$);
      libs.createElement("Image", {
        "class": "ExploreTeamSlotPlaceholderBorder"
      }, _el$);
    return _el$;
  })();
}
function LockedSlotPanel(props) {
  const isPrivilegeLockedSlot = props.slotInfo.isPrivilegeSlot === true;
  const lockedBackground = isPrivilegeLockedSlot ? "file://{images}/custom_game/conv/item/item_hero_empty_lifetime.png" : "file://{images}/custom_game/conv/item/item_hero_empty.png";
  return (() => {
    const _el$5 = libs.createElement("Panel", {
        "class": "ExploreTeamSlotPlaceholder",
        hittest: false
      }, null),
      _el$6 = libs.createElement("Image", {
        "class": "ExploreTeamSlotPlaceholderLockedBG",
        src: lockedBackground
      }, _el$5),
      _el$8 = libs.createElement("Image", {
        "class": "ExploreTeamSlotPlaceholderLockedIcon",
        src: "file://{images}/custom_game/conv/tag/tag_lock.png"
      }, _el$5),
      _el$9 = libs.createElement("Label", {
        "class": "ExploreTeamSlotPlaceholderLockedText",
        text: isPrivilegeLockedSlot ? "#CourierExplore_SlotTextPrivilege" : "#CourierExplore_NormalSlotLockedTip",
        get vars() {
          return isPrivilegeLockedSlot ? undefined : {
            level: getNormalSlotUnlockLevel(props.slotInfo.slot_id)
          };
        }
      }, _el$5);
    libs.setProp(_el$6, "src", lockedBackground);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      when: isPrivilegeLockedSlot,
      get children() {
        return libs.createElement("Image", {
          "class": "ExploreTeamSlotPlaceholderLockedTagIcon",
          src: "file://{images}/custom_game/conv/item/item_lifetime_subscript.png"
        }, null);
      }
    }), _el$8);
    libs.setProp(_el$9, "text", isPrivilegeLockedSlot ? "#CourierExplore_SlotTextPrivilege" : "#CourierExplore_NormalSlotLockedTip");
    libs.effect(_$p => libs.setProp(_el$9, "vars", isPrivilegeLockedSlot ? undefined : {
      level: getNormalSlotUnlockLevel(props.slotInfo.slot_id)
    }, _$p));
    return _el$5;
  })();
}
function CourierExplorePage() {
  const farmLevelState = solid_utils.createServiceNetData("player_idle_game_explore_building_data", {
    level: 1
  });
  const playerExploreDatas = solid_utils.createServiceNetData("player_idle_game_explore_datas", {});
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const playerPropertyData = solid_utils.createPlayerPropertyData(() => Players.GetLocalPlayer());
  const maxExploreDurationSeconds = libs.createMemo(() => courier_explore_time.getCourierExploreMaxDurationSeconds(Number(playerPropertyData().explore_limit ?? 0)));
  const maxExploreDurationText = libs.createMemo(() => courier_explore_time.formatCourierExploreDurationTime(maxExploreDurationSeconds()));
  const hasPrivilegeExploreSlot = libs.createMemo(() => Number(playerPrivileges()[PRIVILEGE_EXPLORE_KEY] ?? 0) > 0);
  const [currentServiceTime, setCurrentServiceTime] = libs.createSignal(courier_explore_time.getCurrentServerTime());
  const [selectedCourierID, setSelectedCourierID] = libs.createSignal("");
  const [selectedSlotID, setSelectedSlotID] = libs.createSignal(undefined);
  const [cancelConfirmPending, setCancelConfirmPending] = libs.createSignal(false);
  const [requesting, setRequesting] = libs.createSignal(false);
  const playerCouriers = service_netdata_helper.usePlayerCouriers();
  const sortCourierList = libs.createMemo(() => service_netdata_helper.getSortedCourierIDs(playerCouriers()));
  const getSlotCourierID = slotData => String(slotData.courier_id ?? "");
  const getCurrentFarmLevel = () => {
    return Math.max(1, Number(farmLevelState().level ?? 1));
  };
  const getFarmLevelConfig = level => {
    return KeyValues.explore_slot?.[String(level)];
  };
  const getCurrentFarmLevelConfig = () => {
    return getFarmLevelConfig(getCurrentFarmLevel());
  };
  const getCurrentNormalSlotCount = () => {
    const currentLevel = getCurrentFarmLevel();
    const configuredSlotCount = Number(getCurrentFarmLevelConfig()?.explore_slot ?? currentLevel);
    return Math.min(NORMAL_EXPLORE_SLOT_IDS.length, Math.max(1, configuredSlotCount));
  };
  const getCurrentExploreProfit = () => {
    return Number(getCurrentFarmLevelConfig()?.effect?.[EXPLORE_PROFIT_EFFECT_KEY] ?? 0);
  };
  const parseExploreRewards = rewards => {
    if (rewards === undefined) {
      return [];
    }
    let rewardList = rewards;
    if (typeof rewardList === "string") {
      try {
        const parsed = JSON.parse(rewardList);
        rewardList = Array.isArray(parsed?.[0]) ? parsed[0] : parsed;
      } catch (error) {
        return [];
      }
    }
    if (!Array.isArray(rewardList)) {
      return [];
    }
    return rewardList.filter(reward => reward !== undefined && reward !== null).map(reward => ({
      id: String(reward.item_id),
      count: reward.amounts
    }));
  };
  const buildExploreSlot = (slotID, unlocked, unlockConditionKey, unlockConditionVars, isPrivilegeSlot) => {
    const exploreData = playerExploreDatas()?.[String(slotID)];
    const courierIDNumber = Number(exploreData?.courier_id ?? 0);
    const hasCourier = courierIDNumber > 0;
    const rewards = hasCourier ? parseExploreRewards(exploreData?.rewards) : [];
    let status = "locked";
    if (unlocked) {
      if (rewards.length > 0) {
        status = "claimable";
      } else if (hasCourier) {
        status = "exploring";
      } else {
        status = "idle";
      }
    }
    return {
      slot_id: slotID,
      unlocked,
      status,
      unlock_condition_key: unlockConditionKey,
      unlock_condition_vars: unlockConditionVars,
      isPrivilegeSlot: isPrivilegeSlot,
      courier_id: hasCourier ? String(courierIDNumber) : undefined,
      start_time: hasCourier ? exploreData?.start_time : undefined,
      rewards
    };
  };
  const teamSlots = libs.createMemo(() => {
    const currentNormalSlotCount = getCurrentNormalSlotCount();
    const slots = NORMAL_EXPLORE_SLOT_IDS.map(slotID => buildExploreSlot(slotID, slotID <= currentNormalSlotCount, slotID <= currentNormalSlotCount ? "" : NORMAL_SLOT_LOCKED_TIP_KEY, slotID <= currentNormalSlotCount ? undefined : {
      level: getNormalSlotUnlockLevel(slotID)
    }, false));
    slots.push(buildExploreSlot(PRIVILEGE_EXPLORE_SLOT_ID, hasPrivilegeExploreSlot(), "#CourierExplore_SlotTextPrivilege", undefined, true));
    return slots;
  });
  const slotState = libs.createMemo(() => {
    const byCourierID = {};
    const bySlotID = {};
    let hasClaimableRewards = false;
    const slots = teamSlots();
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      bySlotID[String(slot.slot_id)] = slot;
      const courierID = getSlotCourierID(slot);
      if (courierID !== "") {
        byCourierID[courierID] = slot;
      }
      if (!hasClaimableRewards && slot.status === "claimable") {
        hasClaimableRewards = true;
      }
    }
    return {
      byCourierID,
      bySlotID,
      hasClaimableRewards
    };
  });
  const selectedSlotContext = libs.createMemo(() => {
    const slotID = selectedSlotID();
    if (slotID === undefined) {
      return undefined;
    }
    return slotState().bySlotID[String(slotID)];
  });
  const findSlotByCourierID = courierID => {
    if (courierID === "") {
      return undefined;
    }
    return slotState().byCourierID[courierID];
  };
  const isDispatched = courierID => {
    return slotState().byCourierID[courierID] !== undefined;
  };
  const getSlotUnlockTipText = slotData => {
    if (slotData.unlock_condition_key === "") {
      return "";
    }
    return LocalizeWithVars(slotData.unlock_condition_key, slotData.unlock_condition_vars ?? {});
  };
  const selectedCourierContext = libs.createMemo(() => {
    const currentSelectedCourierID = selectedCourierID();
    const slot = findSlotByCourierID(currentSelectedCourierID);
    const config = currentSelectedCourierID !== "" ? KeyValues.service_courier[currentSelectedCourierID] : undefined;
    const playerData = currentSelectedCourierID !== "" ? playerCouriers()?.[currentSelectedCourierID] : undefined;
    const dispatched = currentSelectedCourierID !== "" && slot !== undefined;
    let statusText = "";
    if (slot !== undefined) {
      if (slot.status === "locked") {
        statusText = getSlotUnlockTipText(slot);
      } else if (slot.status === "idle") {
        statusText = GetLocalization("#CourierExplore_IdleStatus", "");
      }
    }
    return {
      id: currentSelectedCourierID,
      config,
      playerData,
      slot,
      dispatched,
      locked: config !== undefined && playerData === undefined && !dispatched,
      rewardPreviewList: slot?.rewards ?? [],
      canClaimReward: slot?.status === "claimable",
      canCancelExplore: slot !== undefined && slot.status !== "claimable",
      statusText,
      showDetail: currentSelectedCourierID !== "" ? config ?? null : null
    };
  });
  const selectedCourierStatusText = libs.createMemo(() => {
    const context = selectedCourierContext();
    const slot = context.slot;
    if (slot === undefined || slot.status === "locked" || slot.status === "idle") {
      return context.statusText;
    }
    return `${GetLocalization("#CourierExplore_ExploringPrefix", "")}${courier_explore_time.formatCourierExploreElapsedTime(slot.start_time, currentServiceTime(), maxExploreDurationSeconds())}`;
  });
  const selectedCourierReachedTimeLimit = libs.createMemo(() => {
    const slot = selectedCourierContext().slot;
    if (slot === undefined || slot.status === "locked" || slot.status === "idle") {
      return false;
    }
    return courier_explore_time.isCourierExploreDurationMaxed(slot.start_time, currentServiceTime(), maxExploreDurationSeconds());
  });
  const selectedCourierPreviewContext = libs.createMemo(() => {
    const courierID = selectedCourierContext().id;
    const preview = courierID === "" ? {
      displayStar: 0,
      baseDrops: "",
      extraDrops: ""
    } : courier_explore_preview.getCourierExplorePreview(courierID, playerCouriers());
    return {
      baseDropList: courier_explore_preview.parseDropPreview(preview.baseDrops),
      extraDropList: courier_explore_preview.parseDropPreview(preview.extraDrops)
    };
  });
  const courierHouseRewardPreviewList = libs.createMemo(() => {
    const order = [];
    const values = {};
    const addReward = (id, count) => {
      if (id <= 0 || count <= 0) {
        return;
      }
      const key = String(id);
      if (values[key] === undefined) {
        order.push(key);
        values[key] = 0;
      }
      values[key] = Math.round((values[key] + count) * 100) / 100;
    };
    const slots = teamSlots();
    for (let i = 0; i < slots.length; i++) {
      const slotRewards = slots[i].rewards;
      if (getSlotCourierID(slots[i]) === "" || slotRewards.length <= 0) {
        continue;
      }
      for (let j = 0; j < slotRewards.length; j++) {
        addReward(Number(slotRewards[j].id), slotRewards[j].count);
      }
    }
    return order.map(id => ({
      id,
      count: values[id]
    }));
  });
  libs.onMount(() => {
    const timer = setInterval(() => {
      setCurrentServiceTime(courier_explore_time.getCurrentServerTime());
    }, 1000);
    const flushExploreDataTimer = setInterval(() => {
      CallAction("/v1/idle_game/flush_explore_data", {});
    }, 60 * 60 * 1000);
    libs.onCleanup(() => {
      clearInterval(timer);
      clearInterval(flushExploreDataTimer);
    });
  });
  const canSelectCourierForDispatch = courierID => {
    if (requesting()) {
      return false;
    }
    if (courierID === "") {
      return false;
    }
    const playerCourier = playerCouriers()?.[courierID];
    if (playerCourier === undefined) {
      return false;
    }
    if ((playerCourier.star ?? 0) <= 0) {
      return false;
    }
    return !isDispatched(courierID);
  };
  const canDispatchCourier = courierID => {
    if (!canSelectCourierForDispatch(courierID)) {
      return false;
    }
    const slot = selectedSlotContext();
    return slot !== undefined && slot.unlocked && slot.status === "idle" && getSlotCourierID(slot) === "";
  };
  const toggleSelectedCourier = courierID => {
    setSelectedCourierID(selectedCourierID() === courierID ? "" : courierID);
  };
  const sendDispatchRequest = (courierID, slotID) => {
    setRequesting(true);
    CallActionRequest("/v1/idle_game/explore_courier", {
      courier_id: finiteNumber(courierID),
      slot_id: slotID
    }, () => {
      setRequesting(false);
    }, () => {
      setRequesting(false);
    });
  };
  const handleDispatchCourier = courierID => {
    if (!canSelectCourierForDispatch(courierID)) {
      return;
    }
    const slot = selectedSlotContext();
    if (slot === undefined) {
      ErrorMessage("#CourierExplore_NoIdleSlot");
      return;
    }
    if (!slot.unlocked || slot.status !== "idle" || getSlotCourierID(slot) !== "") {
      ErrorMessage("#CourierExplore_NoIdleSlot");
      return;
    }
    sendDispatchRequest(courierID, slot.slot_id);
  };
  const getFarmUpgradeCost = farmLevel => {
    const slotConfig = getFarmLevelConfig(farmLevel);
    if (slotConfig === undefined) {
      return undefined;
    }
    const cost = slotConfig.cost;
    for (const itemIDString of Object.keys(cost ?? {})) {
      const itemID = Number(itemIDString);
      const amount = Number(cost[itemIDString] ?? 0);
      if (itemID > 0 && amount > 0) {
        return {
          itemID,
          amount
        };
      }
    }
    return undefined;
  };
  const nextFarmLevel = libs.createMemo(() => {
    const nextLevel = getCurrentFarmLevel() + 1;
    return getFarmLevelConfig(nextLevel) !== undefined ? nextLevel : undefined;
  });
  const currentFarmUpgradeCost = libs.createMemo(() => {
    return nextFarmLevel() !== undefined ? getFarmUpgradeCost(getCurrentFarmLevel()) : undefined;
  });
  const courierHouseUpgradeTooltipText = libs.createMemo(() => {
    const level = nextFarmLevel();
    if (level === undefined) {
      return "";
    }
    const config = getFarmLevelConfig(level);
    const slot = Math.min(NORMAL_EXPLORE_SLOT_IDS.length, Math.max(1, Number(config?.explore_slot ?? level)));
    const value = Number(config?.effect?.[EXPLORE_PROFIT_EFFECT_KEY] ?? 0);
    return LocalizeWithVars("#CourierExplore_UpgradeTooltip", {
      level: level,
      slot: slot,
      value: value
    });
  });
  const hasEnoughFarmUpgradeCost = () => {
    const upgradeCost = currentFarmUpgradeCost();
    if (upgradeCost === undefined) {
      return false;
    }
    return (playerTokens()?.[upgradeCost.itemID]?.amounts ?? 0) >= upgradeCost.amount;
  };
  const canUpgradeCourierHouse = () => {
    return nextFarmLevel() !== undefined && currentFarmUpgradeCost() !== undefined && hasEnoughFarmUpgradeCost() && !requesting();
  };
  const sendUpgradeFarmRequest = farmLevel => {
    setRequesting(true);
    CallActionRequest("/v1/idle_game/levelup_explore_building", {
      target_level: farmLevel
    }, () => {
      setRequesting(false);
    }, () => {
      setRequesting(false);
    });
  };
  const handleLockedSlotActivate = slotData => {
    if (requesting()) {
      return;
    }
    if (slotData.isPrivilegeSlot) {
      ErrorMessage("#CourierExplore_PrivilegeSlotTipMessage");
      return;
    }
    ErrorMessage("#CourierExplore_NormalSlotErrorMsg");
  };
  const handleSlotActivate = slotData => {
    if (slotData.status === "locked") {
      handleLockedSlotActivate(slotData);
      return;
    }
    if (selectedSlotID() === slotData.slot_id) {
      setSelectedSlotID(undefined);
      setSelectedCourierID("");
      return;
    }
    setSelectedSlotID(slotData.slot_id);
    const courierID = getSlotCourierID(slotData);
    if (courierID !== "") {
      setSelectedCourierID(courierID);
    }
  };
  const handleCourierContextAction = courierID => {
    if (requesting()) {
      return;
    }
    setSelectedCourierID(courierID);
    const slot = findSlotByCourierID(courierID);
    if (slot !== undefined) {
      handleCancelExplore(slot);
      return;
    }
    handleDispatchCourier(courierID);
  };
  const handleUpgradeCourierHouse = () => {
    if (requesting()) {
      return;
    }
    const nextLevel = nextFarmLevel();
    if (nextLevel === undefined || currentFarmUpgradeCost() === undefined) {
      return;
    }
    if (!hasEnoughFarmUpgradeCost()) {
      ErrorMessage("#CourierExplore_NotEnoughResourcesTipMessage");
      return;
    }
    sendUpgradeFarmRequest(nextLevel);
  };
  const sendClaimRewardRequest = slotID => {
    setRequesting(true);
    CallActionRequest("/v1/idle_game/receive_explore_rewards", {
      slot_id: slotID !== undefined ? slotID : 0
    }, () => {
      setRequesting(false);
    }, () => {
      setRequesting(false);
    });
  };
  const handleClaimReward = () => {
    if (requesting()) {
      return;
    }
    const slot = selectedCourierContext().slot;
    if (slot === undefined || slot.status !== "claimable") {
      return;
    }
    sendClaimRewardRequest(slot.slot_id);
  };
  const handleCancelSelectedExplore = () => {
    if (requesting()) {
      return;
    }
    const slot = selectedCourierContext().slot;
    if (slot === undefined) {
      return;
    }
    handleCancelExplore(slot);
  };
  const handleClaimAllReward = () => {
    if (requesting()) {
      return;
    }
    if (!slotState().hasClaimableRewards) {
      return;
    }
    sendClaimRewardRequest(0);
  };
  const sendCancelExploreRequest = slotID => {
    setRequesting(true);
    CallActionRequest("/v1/idle_game/explore_courier", {
      slot_id: slotID,
      courier_id: 0
    }, () => {
      setRequesting(false);
    }, () => {
      setRequesting(false);
    });
  };
  const getSlotCourierName = slotData => {
    const courierID = getSlotCourierID(slotData);
    if (courierID === "") {
      return GetLocalization("#CourierExplore_DefaultCourierName", "");
    }
    return KeyValues.service_courier[courierID]?.name ?? GetLocalization("#CourierExplore_DefaultCourierName", "");
  };
  const getSlotExploreElapsedTime = slotData => {
    const startTime = slotData.start_time;
    if (startTime === undefined) {
      return GetLocalization("#CourierExplore_UnknownTime", "");
    }
    return courier_explore_time.formatCourierExploreElapsedTime(startTime, currentServiceTime(), maxExploreDurationSeconds());
  };
  const showCancelExploreConfirm = slotData => {
    if (cancelConfirmPending() || requesting()) {
      return;
    }
    setCancelConfirmPending(true);
    const courierName = getSlotCourierName(slotData);
    const elapsedTime = getSlotExploreElapsedTime(slotData);
    CustomUIConfig.showPopup("CommonConfirm", {
      title: GetLocalization("#CourierExplore_CancelConfirmTitle", ""),
      text: `${GetLocalization("#CourierExplore_CancelConfirmTextPrefix", "")}${courierName}${GetLocalization("#CourierExplore_CancelConfirmTextMiddle", "")}${elapsedTime}${GetLocalization("#CourierExplore_CancelConfirmTextSuffix", "")}`,
      confirm_text: GetLocalization("#CourierExplore_CancelConfirmButton", ""),
      cancel_text: GetLocalization("#CourierExplore_CancelContinueButton", ""),
      onconfirm: () => {
        sendCancelExploreRequest(slotData.slot_id);
      },
      onresult: () => {
        setCancelConfirmPending(false);
      }
    });
  };
  const handleCancelExplore = slotData => {
    if (requesting()) {
      return;
    }
    const courierID = getSlotCourierID(slotData);
    if (courierID === "") {
      return;
    }
    const hasClaimableReward = slotData.status === "claimable" || slotData.rewards.length > 0;
    if (hasClaimableReward) {
      ErrorMessage("#CourierExplore_CancelBlockedByReward");
      return;
    }
    const shouldShowConfirm = slotData.start_time !== undefined;
    if (shouldShowConfirm) {
      showCancelExploreConfirm(slotData);
      return;
    }
    sendCancelExploreRequest(slotData.slot_id);
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "CourierExplorePage",
    hittest: false,
    get children() {
      return [(() => {
        const _el$0 = libs.createElement("Panel", {
          id: "ExploreLeftArea",
          hittest: false
        }, null);
        libs.insert(_el$0, libs.createComponent(libs.Show, {
          get when() {
            return selectedCourierContext().showDetail;
          },
          get children() {
            const _el$1 = libs.createElement("Panel", {
                id: "CourierDetail",
                hittest: false
              }, null),
              _el$10 = libs.createElement("Panel", {
                id: "DetailTop",
                hittest: false
              }, _el$1),
              _el$11 = libs.createElement("Panel", {
                id: "DetailTopRight",
                hittest: false
              }, _el$10),
              _el$12 = libs.createElement("Label", {
                id: "CourierName",
                get text() {
                  return GetLocalization(`#${selectedCourierContext().id}`);
                }
              }, _el$11),
              _el$13 = libs.createElement("Label", {
                id: "ExploreTime",
                get text() {
                  return selectedCourierStatusText();
                }
              }, _el$11),
              _el$14 = libs.createElement("Label", {
                id: "ExploreTimeLimit",
                get text() {
                  return GetLocalization("#CourierExplore_TimeLimitReached", "");
                }
              }, _el$11),
              _el$15 = libs.createElement("Label", {
                id: "DispatchableHint",
                text: "#CourierExplore_DispatchableHint"
              }, _el$11),
              _el$16 = libs.createElement("Label", {
                id: "LockedHint",
                text: "#CourierExplore_LockedHint"
              }, _el$11);
              libs.createElement("Image", {
                id: "DetailSepLine"
              }, _el$1);
            libs.insert(_el$10, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return selectedCourierContext().id;
              }
            }), _el$11);
            libs.insert(_el$1, libs.createComponent(libs.Show, {
              get when() {
                return selectedCourierContext().dispatched;
              },
              get children() {
                return [(() => {
                  const _el$18 = libs.createElement("Panel", {
                      id: "RewardPreview",
                      hittest: false
                    }, null);
                    libs.createElement("Label", {
                      id: "RewardPreviewTitle",
                      text: "#CourierExplore_RewardPreview"
                    }, _el$18);
                  libs.insert(_el$18, libs.createComponent(libs.Show, {
                    get when() {
                      return selectedCourierContext().rewardPreviewList.length > 0;
                    },
                    get fallback() {
                      return libs.createElement("Label", {
                        id: "RewardEmptyText",
                        text: "#CourierExplore_EmptyRewards"
                      }, null);
                    },
                    get children() {
                      return libs.createComponent(RecycleView.RecycleView, {
                        id: "RewardList",
                        input: () => selectedCourierContext().rewardPreviewList,
                        direction: "VerticalGrid",
                        wheelStep: 112,
                        childConfig: {
                          width: 68,
                          height: 68,
                          margin_right: 12,
                          margin_bottom: 12
                        },
                        showBar: false,
                        children: reward => {
                          return libs.createComponent(StoreItem.StoreItemBlock, {
                            get item_id() {
                              return Number(reward().id);
                            },
                            get amounts() {
                              return reward().count;
                            }
                          });
                        }
                      });
                    }
                  }), null);
                  return _el$18;
                })(), libs.createComponent(libs.Show, {
                  get when() {
                    return selectedCourierContext().canClaimReward;
                  },
                  get children() {
                    const _el$20 = libs.createElement("Panel", {
                      id: "ReceiveArea",
                      hittest: false
                    }, null);
                    libs.insert(_el$20, libs.createComponent(EOM_Button.EOM_Button, {
                      id: "ReceiveButton",
                      size: "Normal",
                      color: "Confirm",
                      text: "#CourierExplore_ReceiveReward",
                      get enabled() {
                        return libs.memo(() => !!selectedCourierContext().canClaimReward)() && !requesting();
                      },
                      onactivate: handleClaimReward
                    }));
                    return _el$20;
                  }
                }), libs.createComponent(libs.Show, {
                  get when() {
                    return selectedCourierContext().canCancelExplore;
                  },
                  get children() {
                    const _el$21 = libs.createElement("Panel", {
                      id: "CancelDispatchArea",
                      hittest: false
                    }, null);
                    libs.insert(_el$21, libs.createComponent(EOM_Button.EOM_Button, {
                      id: "CancelDispatchButton",
                      size: "Normal",
                      color: "Cancel",
                      text: "#CourierExplore_CancelDispatch",
                      get enabled() {
                        return libs.memo(() => !!(selectedCourierContext().canCancelExplore && !cancelConfirmPending()))() && !requesting();
                      },
                      onactivate: handleCancelSelectedExplore
                    }));
                    return _el$21;
                  }
                })];
              }
            }), null);
            libs.insert(_el$1, libs.createComponent(libs.Show, {
              get when() {
                return !selectedCourierContext().dispatched;
              },
              get children() {
                return [(() => {
                  const _el$22 = libs.createElement("Panel", {
                    id: "DropPreviewArea",
                    hittest: false
                  }, null);
                  libs.insert(_el$22, libs.createComponent(libs.Show, {
                    get when() {
                      return selectedCourierPreviewContext().baseDropList.length > 0;
                    },
                    get children() {
                      const _el$23 = libs.createElement("Panel", {
                          "class": "DropPreviewGroup",
                          hittest: false
                        }, null);
                        libs.createElement("Label", {
                          "class": "DropPreviewTitle",
                          text: "#CourierExplore_BaseDropPreview"
                        }, _el$23);
                      libs.insert(_el$23, libs.createComponent(RecycleView.RecycleView, {
                        "class": "DropPreviewList",
                        input: () => selectedCourierPreviewContext().baseDropList,
                        direction: "VerticalGrid",
                        wheelStep: 112,
                        childConfig: {
                          width: 68,
                          height: 68,
                          margin_right: 9,
                          margin_bottom: 9
                        },
                        showBar: false,
                        children: drop => {
                          return libs.createComponent(StoreItem.StoreItemBlock, {
                            get item_id() {
                              return drop().id;
                            },
                            get amounts() {
                              return drop().count;
                            }
                          });
                        }
                      }), null);
                      return _el$23;
                    }
                  }), null);
                  libs.insert(_el$22, libs.createComponent(libs.Show, {
                    get when() {
                      return selectedCourierPreviewContext().extraDropList.length > 0;
                    },
                    get children() {
                      const _el$25 = libs.createElement("Panel", {
                          "class": "DropPreviewGroup",
                          hittest: false
                        }, null);
                        libs.createElement("Label", {
                          "class": "DropPreviewTitle",
                          text: "#CourierExplore_ExtraDropPreview"
                        }, _el$25);
                      libs.insert(_el$25, libs.createComponent(RecycleView.RecycleView, {
                        "class": "DropPreviewList",
                        input: () => selectedCourierPreviewContext().extraDropList,
                        direction: "VerticalGrid",
                        wheelStep: 112,
                        childConfig: {
                          width: 80,
                          height: 80,
                          margin_right: 9,
                          margin_bottom: 9
                        },
                        showBar: false,
                        children: drop => {
                          return libs.createComponent(StoreItem.StoreItemBlock, {
                            get item_id() {
                              return drop().id;
                            },
                            get amounts() {
                              return drop().count;
                            }
                          });
                        }
                      }), null);
                      return _el$25;
                    }
                  }), null);
                  return _el$22;
                })(), (() => {
                  const _el$27 = libs.createElement("Panel", {
                    id: "DispatchArea",
                    hittest: false
                  }, null);
                  libs.insert(_el$27, libs.createComponent(EOM_Button.EOM_Button, {
                    id: "DispatchButton",
                    size: "Normal",
                    color: "Confirm",
                    text: "#CourierExplore_Dispatch",
                    get enabled() {
                      return canDispatchCourier(selectedCourierContext().id);
                    },
                    onactivate: () => handleDispatchCourier(selectedCourierContext().id)
                  }));
                  return _el$27;
                })()];
              }
            }), null);
            libs.effect(_p$ => {
              const _v$ = GetLocalization(`#${selectedCourierContext().id}`),
                _v$2 = selectedCourierStatusText(),
                _v$3 = selectedCourierContext().dispatched,
                _v$4 = GetLocalization("#CourierExplore_TimeLimitReached", ""),
                _v$5 = selectedCourierReachedTimeLimit(),
                _v$6 = selectedCourierContext().playerData !== undefined && !selectedCourierContext().dispatched,
                _v$7 = selectedCourierContext().locked;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$12, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$13, "text", _v$2, _p$._v$2));
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$13, "visible", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "text", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$14, "visible", _v$5, _p$._v$5));
              _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$15, "visible", _v$6, _p$._v$6));
              _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$16, "visible", _v$7, _p$._v$7));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined,
              _v$3: undefined,
              _v$4: undefined,
              _v$5: undefined,
              _v$6: undefined,
              _v$7: undefined
            });
            return _el$1;
          }
        }));
        return _el$0;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return selectedSlotContext() !== undefined;
        },
        get children() {
          const _el$28 = libs.createElement("Panel", {
            "class": "ExploreRightArea",
            hittest: false
          }, null);
          libs.insert(_el$28, libs.createComponent(RecycleView.RecycleView, {
            id: "CourierList",
            input: () => sortCourierList(),
            direction: "VerticalGrid",
            wheelStep: 121,
            childConfig: {
              width: 96,
              height: 144
            },
            children: _courierID => {
              const courierData = KeyValues.service_courier[_courierID()];
              const quality = () => courierData?.quality ?? 0;
              const playerCourier = () => playerCouriers()?.[_courierID()];
              const currentStar = () => playerCourier()?.star ?? 0;
              const previewDrops = libs.createMemo(() => courier_explore_preview.getCourierExplorePreview(_courierID(), playerCouriers()));
              const exploreSkill = libs.createMemo(() => {
                const skillKey = `explore_skill${previewDrops().displayStar}`;
                const skillValue = courierData?.[skillKey];
                return typeof skillValue === "string" ? skillValue : "";
              });
              return (() => {
                const _el$56 = libs.createElement("Panel", {
                    "class": "CourierCardContainer",
                    hittest: false
                  }, null),
                  _el$57 = libs.createElement("Panel", {
                    "class": "CourierCardStarList",
                    hittest: false
                  }, _el$56);
                libs.insert(_el$56, libs.createComponent(courier_card.CourierCard, {
                  get courier_id() {
                    return _courierID();
                  },
                  get star() {
                    return currentStar();
                  },
                  get quality() {
                    return quality();
                  },
                  get selected() {
                    return selectedCourierID() === _courierID();
                  },
                  get explored() {
                    return isDispatched(_courierID());
                  },
                  toolOnly: false,
                  onactivate: () => toggleSelectedCourier(_courierID()),
                  oncontextmenu: () => handleCourierContextAction(_courierID())
                }), _el$57);
                libs.insert(_el$57, libs.createComponent(libs.For, {
                  each: [1, 2, 3, 4, 5, 6],
                  children: idx => {
                    return (() => {
                      const _el$58 = libs.createElement("Image", {
                        "class": "CourierStar"
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$58, "visible", currentStar() >= idx, _$p));
                      return _el$58;
                    })();
                  }
                }));
                libs.effect(_$p => libs.setProp(_el$56, "customTooltip", {
                  name: "courier_explore",
                  title: courierData.id,
                  explore_skill: exploreSkill(),
                  baseDrops: previewDrops().baseDrops,
                  extraDrops: previewDrops().extraDrops
                }, _$p));
                return _el$56;
              })();
            }
          }));
          return _el$28;
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return selectedSlotContext() === undefined;
        },
        get children() {
          const _el$29 = libs.createElement("Panel", {
              id: "CourierHousePage",
              hittest: false
            }, null);
            libs.createElement("Image", {
              id: "CourierHouseContainerBG"
            }, _el$29);
            const _el$31 = libs.createElement("Panel", {
              id: "CourierHouseContainer",
              hittest: false
            }, _el$29),
            _el$32 = libs.createElement("Label", {
              id: "CourierHouseTitle",
              text: "#CourierExplore_FarmLevel",
              get vars() {
                return {
                  value: getCurrentFarmLevel()
                };
              }
            }, _el$31),
            _el$33 = libs.createElement("Image", {
              id: "CourierHouseIcon",
              get ["class"]() {
                return `FarmLevel${getCurrentFarmLevel()}`;
              }
            }, _el$31),
            _el$34 = libs.createElement("Panel", {
              id: "CourierHouseInfoSlot",
              "class": "CourierHouseInfo"
            }, _el$31);
            libs.createElement("Image", {
              "class": "CourierHouseInfoIcon"
            }, _el$34);
            libs.createElement("Label", {
              "class": "CourierHouseInfoText",
              text: "#CourierExplore_FarmInfoSlot"
            }, _el$34);
            const _el$37 = libs.createElement("Label", {
              "class": "CourierHouseInfoValue",
              get text() {
                return getCurrentNormalSlotCount();
              }
            }, _el$34),
            _el$38 = libs.createElement("Panel", {
              id: "CourierHouseInfoEfficiency",
              "class": "CourierHouseInfo"
            }, _el$31);
            libs.createElement("Image", {
              "class": "CourierHouseInfoIcon"
            }, _el$38);
            libs.createElement("Label", {
              "class": "CourierHouseInfoText",
              text: "#CourierExplore_FarmInfoEfficiency"
            }, _el$38);
            const _el$41 = libs.createElement("Label", {
              "class": "CourierHouseInfoValue",
              get text() {
                return `${getCurrentExploreProfit()}%`;
              }
            }, _el$38),
            _el$46 = libs.createElement("Image", {
              "class": "CourierExploreDivider"
            }, _el$31),
            _el$47 = libs.createElement("Panel", {
              id: "ExploreRewardsContainer",
              hittest: false
            }, _el$31);
          libs.insert(_el$31, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
            id: "CourierHouseTitleDivider",
            text: "#CourierExplore_HouseTitle"
          }), _el$32);
          libs.insert(_el$31, libs.createComponent(libs.Show, {
            get when() {
              return nextFarmLevel() !== undefined;
            },
            get children() {
              return [(() => {
                const _el$42 = libs.createElement("Panel", {
                    id: "CourierHouseUpgradeCost"
                  }, null),
                  _el$43 = libs.createElement("Label", {
                    id: "CourierHouseUpgradeCostText",
                    get text() {
                      return `x${currentFarmUpgradeCost()?.amount ?? 0}`;
                    }
                  }, _el$42);
                libs.insert(_el$42, libs.createComponent(StoreItem.StoreItemImage, {
                  id: "CourierHouseUpgradeCostIcon",
                  get itemid() {
                    return currentFarmUpgradeCost()?.itemID ?? 0;
                  }
                }), _el$43);
                libs.effect(_$p => libs.setProp(_el$43, "text", `x${currentFarmUpgradeCost()?.amount ?? 0}`, _$p));
                return _el$42;
              })(), libs.createComponent(EOM_Button.EOM_Button, {
                id: "CourierHouseUpgradeButton",
                size: "Normal",
                color: "Confirm",
                text: "#CourierExplore_ButtonUpgradeFarm",
                get customTooltip() {
                  return {
                    name: "text",
                    text: courierHouseUpgradeTooltipText()
                  };
                },
                get enabled() {
                  return canUpgradeCourierHouse();
                },
                onactivate: handleUpgradeCourierHouse,
                get children() {
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return canUpgradeCourierHouse();
                    },
                    get children() {
                      return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                        hittest: false
                      });
                    }
                  });
                }
              })];
            }
          }), _el$46);
          libs.insert(_el$31, libs.createComponent(libs.Show, {
            get when() {
              return nextFarmLevel() === undefined;
            },
            get children() {
              const _el$44 = libs.createElement("Panel", {
                  id: "CourierHouseLevelMaxContainer"
                }, null);
                libs.createElement("Label", {
                  text: "#CourierExplore_FarmLevelMaxTip"
                }, _el$44);
              return _el$44;
            }
          }), _el$46);
          libs.insert(_el$31, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
            id: "CourierExploreRewardsTitleDivider",
            text: "#CourierExplore_FarmRewardsTitle"
          }), _el$47);
          libs.insert(_el$47, libs.createComponent(libs.Show, {
            get when() {
              return courierHouseRewardPreviewList().length > 0;
            },
            get fallback() {
              return libs.createElement("Label", {
                id: "ExploreRewardsEmptyText",
                text: "#CourierExplore_EmptyRewards"
              }, null);
            },
            get children() {
              return libs.createComponent(RecycleView.RecycleView, {
                id: "ExploreRewardsList",
                input: () => courierHouseRewardPreviewList(),
                direction: "Horizontal",
                wheelStep: 82,
                childConfig: {
                  width: 72,
                  height: 72,
                  margin_right: 10
                },
                showBar: false,
                children: reward => {
                  return libs.createComponent(StoreItem.StoreItemBlock, {
                    get item_id() {
                      return Number(reward().id);
                    },
                    get amounts() {
                      return reward().count;
                    }
                  });
                }
              });
            }
          }));
          libs.insert(_el$31, libs.createComponent(EOM_Button.EOM_Button, {
            id: "CourierExploreReceiveButton",
            size: "Normal",
            color: "Green",
            text: "#CourierExplore_ReceiveReward",
            get enabled() {
              return libs.memo(() => !!slotState().hasClaimableRewards)() && !requesting();
            },
            onactivate: handleClaimAllReward
          }), null);
          libs.effect(_p$ => {
            const _v$8 = {
                value: getCurrentFarmLevel()
              },
              _v$9 = `FarmLevel${getCurrentFarmLevel()}`,
              _v$0 = getCurrentNormalSlotCount(),
              _v$1 = `${getCurrentExploreProfit()}%`;
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$32, "vars", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$33, "class", _v$9, _p$._v$9));
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$37, "text", _v$0, _p$._v$0));
            _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$41, "text", _v$1, _p$._v$1));
            return _p$;
          }, {
            _v$8: undefined,
            _v$9: undefined,
            _v$0: undefined,
            _v$1: undefined
          });
          return _el$29;
        }
      }), (() => {
        const _el$48 = libs.createElement("Panel", {
            "class": "ExploreBottomArea",
            hittest: false
          }, null),
          _el$49 = libs.createElement("Panel", {
            id: "BottomTitle",
            hittest: false
          }, _el$48);
          libs.createElement("Label", {
            id: "BottomTitleLabel",
            hittest: false,
            text: "#CourierExplore_Title"
          }, _el$49);
          const _el$51 = libs.createElement("Label", {
            id: "BottomTitleTimeDesc",
            hittest: false,
            get text() {
              return LocalizeWithVars("#CourierExplore_TimeDesc", {
                time: maxExploreDurationText()
              });
            }
          }, _el$49);
          libs.createElement("Image", {
            id: "BottomSepLine"
          }, _el$48);
          const _el$53 = libs.createElement("Panel", {
            id: "BottomContent"
          }, _el$48),
          _el$54 = libs.createElement("Panel", {
            id: "BottomCourierList"
          }, _el$53);
        libs.insert(_el$54, libs.createComponent(libs.For, {
          get each() {
            return teamSlots();
          },
          children: slotData => {
            const slotCourierData = () => slotData.courier_id ? KeyValues.service_courier[String(slotData.courier_id)] : undefined;
            const slotCourierID = () => slotData.courier_id ? String(slotData.courier_id) : "";
            const slotCourierStar = () => {
              const id = slotCourierID();
              return id !== "" ? playerCouriers()?.[id]?.star ?? 0 : 0;
            };
            const slotCourierQuality = () => slotCourierData()?.quality ?? 0;
            return (() => {
              const _el$60 = libs.createElement("Panel", {}, null);
              libs.setProp(_el$60, "onactivate", () => handleSlotActivate(slotData));
              libs.setProp(_el$60, "oncontextmenu", () => {
                handleCancelExplore(slotData);
              });
              libs.insert(_el$60, libs.createComponent(libs.Show, {
                get when() {
                  return slotData.courier_id;
                },
                get fallback() {
                  return libs.memo(() => slotData.status === "locked")() ? libs.createComponent(LockedSlotPanel, {
                    slotInfo: slotData
                  }) : libs.createComponent(IdleSlotPanel, {});
                },
                get children() {
                  const _el$61 = libs.createElement("Panel", {
                    "class": "ExploreTeamSlotCardWrap",
                    hittest: false
                  }, null);
                  libs.insert(_el$61, libs.createComponent(courier_card.CourierCard, {
                    get courier_id() {
                      return slotCourierID();
                    },
                    get star() {
                      return slotCourierStar();
                    },
                    get quality() {
                      return slotCourierQuality();
                    },
                    get selected() {
                      return selectedSlotID() === slotData.slot_id;
                    },
                    toolOnly: false
                  }));
                  return _el$61;
                }
              }), null);
              libs.insert(_el$60, libs.createComponent(libs.Show, {
                get when() {
                  return slotData.status === "claimable";
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    horizontalAlign: 'right',
                    margin: "5px",
                    type: "exclamation"
                  });
                }
              }), null);
              libs.effect(_$p => libs.setProp(_el$60, "classList", {
                Selected: selectedSlotID() === slotData.slot_id
              }, _$p));
              return _el$60;
            })();
          }
        }));
        libs.effect(_$p => libs.setProp(_el$51, "text", LocalizeWithVars("#CourierExplore_TimeDesc", {
          time: maxExploreDurationText()
        }), _$p));
        return _el$48;
      })()];
    }
  });
}

function getExploreStoreItems(infoProducts) {
  const result = [];
  const now = Date.now() / 1000;
  for (const itemname in KeyValues.info_shop_product) {
    const itemdata = KeyValues.info_shop_product[itemname];
    const info_product = infoProducts[itemdata.id];
    const effective_start_time = info_product ? info_product.start_time : itemdata.start_time;
    const effective_end_time = info_product ? info_product.end_time : itemdata.end_time;
    if ((effective_start_time < now || effective_start_time == 0) && (effective_end_time > now || effective_end_time == 0) && (itemdata.hide_time > now || !itemdata.hide_time) && itemdata.hide == 0 || itemdata.tag == "Privilege") {
      const tags = itemdata.tag.split("|");
      if (tags.includes("Explore")) {
        result.push(itemdata);
      }
    }
  }
  result.sort((a, b) => b.orderby - a.orderby);
  return result;
}
function ExploreStorePage() {
  const infoProducts = solid_utils.createGlobalServiceNetData("info_products", {});
  const purchasedProduct = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const storeItems = libs.createMemo(() => getExploreStoreItems(infoProducts()));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "ExploreStorePage",
    shadow_border: true,
    get children() {
      const _el$ = libs.createElement("Panel", {
        id: "ExploreStoreList",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, null);
      libs.setProp(_el$, "scroll", "y");
      libs.insert(_el$, libs.createComponent(libs.Index, {
        get each() {
          return storeItems();
        },
        children: data => {
          return libs.createComponent(StoreItem.StoreItem, {
            get itemid() {
              return data().id;
            },
            get purchased_num() {
              return purchasedProduct()[data().id];
            }
          });
        }
      }));
      return _el$;
    }
  });
}

const EXPLORE_WINDOW_NAME = "HudExplore";
const COURIER_EXPLORE_TAB = "CourierExplore_Title";
const COLLECTION_TAB = "Collection_Menu";
const EXPLORE_STORE_TAB = "Explore";
const MENU_LIST = {
  [COURIER_EXPLORE_TAB]: [],
  [COLLECTION_TAB]: [],
  [EXPLORE_STORE_TAB]: []
};
const {
  LayoutMenu,
  show,
  menuName,
  setMenuName,
  jumpInfo
} = EOM_MenuLayout.createMenuLayout("explore", () => MENU_LIST, false, EXPLORE_WINDOW_NAME);
function HudExplore() {
  const gameState = solid_utils.createNetDataSignal("common", "game_state", {
    state: "GameState_Prepare",
    start_time: -1,
    end_time: -1
  });
  const canShowExploreWindow = libs.createMemo(() => gameState().state === "GameState_Prepare");
  let hasBeenVisible = false;
  libs.createEffect(() => {
    const isVisible = show();
    if (isVisible) {
      if (jumpInfo()?.menu === undefined) {
        setMenuName(COURIER_EXPLORE_TAB);
      }
    } else if (hasBeenVisible) {
      GameEvents.SendCustomEventToServer("courier_explore_close", {});
    }
    hasBeenVisible = isVisible;
  });
  libs.createEffect(() => {
    if (canShowExploreWindow()) {
      return;
    }
    if (show()) {
      ClientSideEvent("custom_ui_toggle_windows", {
        windowName: EXPLORE_WINDOW_NAME,
        state: 0
      });
    }
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "HudExplore",
    name: EXPLORE_WINDOW_NAME,
    renderOnShow: true,
    get show() {
      return libs.memo(() => !!show())() && canShowExploreWindow();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(Player.CurrencyGroup, {
        currencyType: "top",
        tokens: [110005]
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() === COURIER_EXPLORE_TAB;
            },
            get children() {
              return libs.createComponent(CourierExplorePage, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() === COLLECTION_TAB;
            },
            get children() {
              return libs.createComponent(collection.Collection, {
                type: "collection"
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() === EXPLORE_STORE_TAB;
            },
            get children() {
              return libs.createComponent(ExploreStorePage, {});
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(HudExplore, {}), $.GetContextPanel());