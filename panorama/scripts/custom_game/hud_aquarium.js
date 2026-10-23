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
var EOM_Loading = require('./EOM_Loading.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_SearchBox = require('./EOM_SearchBox.js');
var Player = require('./Player.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_RedMark.js');
require('./EOM_TextEntry.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  Add(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x + v.x, this.y + v.y);
    } else {
      return new Vector2D(this.x + v, this.y + v);
    }
  }
  Sub(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x - v.x, this.y - v.y);
    } else {
      return new Vector2D(this.x - v, this.y - v);
    }
  }
  Mul(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x * v.x, this.y * v.y);
    } else {
      return new Vector2D(this.x * v, this.y * v);
    }
  }
  Div(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x / v.x, this.y / v.y);
    } else {
      return new Vector2D(this.x / v, this.y / v);
    }
  }
  Normalized() {
    const len = this.Length();
    if (len <= 0.0001) {
      return new Vector2D(0, 0);
    }
    return new Vector2D(this.x / len, this.y / len);
  }
  Length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  Equals(v) {
    return this.x == v.x && this.y == v.y;
  }
  DotProduct(v) {
    return this.x * v.x + this.y * v.y;
  }
  toString() {
    return `${this.x},${this.y}`;
  }
  toVector3() {
    return [this.x, this.y, 0];
  }
  static VectorLerp(t, start, end) {
    return start.Add(end.Sub(start).Mul(t));
  }
  static Rotate(vector, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2D(vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos);
  }
}

class AquariumFishPool {
  bounds = {
    width: 1600,
    height: 1000,
    centerY: 500
  };
  target = {
    yOffset: 500
  };
  fishHeight = {
    ground: 128,
    min: 200,
    max: 600,
    offset: 500
  };
  fishSpeed = {
    groundMin: 120,
    groundMax: 120,
    min: 120,
    max: 200
  };
  fishList = {};
  environment = -1;
  fishEntList = {};
  constructor() {
    this.Start();
  }
  Start() {
    if (this.scheduleID !== undefined) {
      return;
    }
    this.scheduleTick();
  }
  Stop() {
    if (this.scheduleID !== undefined) {
      $.CancelScheduled(this.scheduleID);
    }
    this.scheduleID = undefined;
  }
  SetEnvironment(environment) {
    this.environment = environment;
  }
  SetFishEntList(fishEntList) {
    this.fishEntList = fishEntList;
  }
  CreateFish(fishID, collectionID, options = {}) {
    const fishKey = String(collectionID);
    const fishEnt = this.fishEntList[fishKey];
    if (this.environment === -1 || fishEnt === undefined) {
      return undefined;
    }
    const position = this.toVector(options.position) ?? this.getRandomPosition();
    const direction = this.toVector(options.direction);
    const height = this.getFishHeight(fishKey, options.height);
    const targetPosition = this.getInitialTarget(position, direction);
    const moveDirection = this.getDirectionToTarget(position, targetPosition);
    const targetHeight = this.getNextFishHeight(fishKey, height);
    const movespeed = this.getFishMoveSpeed(fishKey, options.movespeed);
    const modelScale = options.modelScale ?? this.getDefaultModelScale(fishKey);
    const weightScale = options.weightScale ?? 1;
    const particleID = Particles.CreateParticle("particles/generic_gameplay/fish_projectile_model.vpcf", ParticleAttachment_t.PATTACH_CUSTOMORIGIN, this.environment);
    this.updateFishParticle(particleID, position, moveDirection, height, movespeed);
    Particles.SetParticleControlEnt(particleID, 2, fishEnt, ParticleAttachment_t.PATTACH_INVALID, "", Entities.GetAbsOrigin(fishEnt), false);
    Particles.SetParticleControl(particleID, 4, [modelScale, 50, weightScale]);
    print(weightScale);
    Particles.SetParticleControl(particleID, 5, [weightScale, 0, 0]);
    const fish = {
      fishID,
      collectionID: fishKey,
      position,
      direction: moveDirection,
      startPosition: position,
      targetPosition,
      height,
      startHeight: height,
      targetHeight,
      movespeed,
      modelScale,
      weightScale,
      particleID
    };
    this.fishList[fishID] = fish;
    return fish;
  }
  SyncOwnedFish(fishes) {
    const nextVisibleFishMap = this.getVisibleFishMap(fishes);
    const existingFishIDs = Object.keys(this.fishList);
    for (let i = 0; i < existingFishIDs.length; i++) {
      const fishID = Number(existingFishIDs[i]);
      if (nextVisibleFishMap[fishID] === undefined) {
        this.RemoveFish(fishID);
      }
    }
    const nextVisibleFishIDs = Object.keys(nextVisibleFishMap);
    for (let i = 0; i < nextVisibleFishIDs.length; i++) {
      const fishID = Number(nextVisibleFishIDs[i]);
      const fishData = nextVisibleFishMap[fishID];
      if (fishData === undefined) {
        continue;
      }
      const existingFish = this.fishList[fishID];
      if (existingFish === undefined) {
        this.CreateFish(fishID, fishData.collectionID, {
          position: this.getRandomPosition(),
          direction: this.getSpawnDirection(),
          height: this.getRandomHeight(),
          weightScale: this.getWeightModelScale(fishData.weight)
        });
        continue;
      }
      if (existingFish.collectionID !== fishData.collectionID) {
        this.RemoveFish(fishID);
        this.CreateFish(fishID, fishData.collectionID, {
          position: existingFish.position,
          direction: existingFish.direction,
          height: existingFish.height,
          movespeed: existingFish.movespeed,
          weightScale: this.getWeightModelScale(fishData.weight)
        });
        continue;
      }
      this.UpdateFishAppearance(fishID, fishData.weight);
    }
  }
  RemoveFish(fishIndex) {
    const fish = this.fishList[fishIndex];
    if (fish === undefined) {
      return;
    }
    Particles.DestroyParticleEffect(fish.particleID, false);
    delete this.fishList[fishIndex];
  }
  RemoveAllFish() {
    for (const fishIndex in this.fishList) {
      this.RemoveFish(Number(fishIndex));
    }
  }
  UpdateFishAppearance(fishID, weight) {
    const fish = this.fishList[fishID];
    if (fish === undefined) {
      return;
    }
    const nextWeightScale = this.getWeightModelScale(weight);
    if (Math.abs(nextWeightScale - fish.weightScale) <= 0.0001) {
      return;
    }
    fish.weightScale = nextWeightScale;
    Particles.SetParticleControl(fish.particleID, 5, [nextWeightScale, 0, 0]);
  }
  getVisibleFishMap(fishes) {
    const visibleFishMap = {};
    const fishIDs = Object.keys(fishes);
    for (let i = 0; i < fishIDs.length; i++) {
      const fishData = fishes[fishIDs[i]];
      const fishID = Number(fishData?.id ?? 0);
      const collectionID = String(fishData?.fish_item_id ?? "");
      const collectionData = KeyValues.collection[collectionID];
      if (fishData === undefined || fishData.show !== true || fishID <= 0 || collectionID === "" || collectionData === undefined || collectionData.type !== "fish" || this.fishEntList[collectionID] === undefined) {
        continue;
      }
      visibleFishMap[fishID] = {
        fishID,
        collectionID,
        weight: fishData.weight
      };
    }
    return visibleFishMap;
  }
  scheduleTick() {
    const tick = Math.max(Game.GetGameFrameTime(), 1 / 60);
    this.scheduleID = $.Schedule(tick, () => {
      this.scheduleTick();
    });
    this.UpdatePosition(tick);
  }
  UpdatePosition(frameTime) {
    for (const fishIndex in this.fishList) {
      const fish = this.fishList[fishIndex];
      if (fish === undefined) {
        continue;
      }
      fish.position = fish.position.Add(fish.direction.Mul(fish.movespeed * frameTime));
      fish.height = this.getHeightAtPosition(fish);
      const hitXBoundary = this.isOutsideX(fish.position.x);
      const hitYBoundary = this.isOutsideY(fish.position.y);
      if (hitXBoundary || hitYBoundary) {
        print(`Fish ${fish.fishID} hit boundary:`, hitXBoundary ? "X" : "", hitYBoundary ? "Y" : "");
        const boundedPosition = this.clampPosition(fish.position);
        const respawnPosition = hitXBoundary ? new Vector2D(boundedPosition.x, $.RandomFloat(this.getMinY(), this.getMaxY())) : boundedPosition;
        const startHeight = hitXBoundary ? fish.targetHeight : fish.height;
        const targetX = hitXBoundary ? this.getOppositeWallX(respawnPosition.x) : this.getTargetX(respawnPosition.x, fish.direction.x);
        fish.position = respawnPosition;
        fish.height = startHeight;
        fish.startPosition = respawnPosition;
        fish.startHeight = startHeight;
        fish.movespeed = this.getFishMoveSpeed(fish.collectionID);
        fish.targetPosition = new Vector2D(targetX, this.getNextTargetY(respawnPosition.y));
        fish.direction = this.getDirectionToTarget(respawnPosition, fish.targetPosition);
        fish.targetHeight = this.getNextFishHeight(fish.collectionID, startHeight);
      }
      this.updateFishParticle(fish.particleID, fish.position, fish.direction, fish.height, fish.movespeed);
    }
  }
  getDefaultModelScale(collectionID) {
    const rarity = KeyValues.collection[collectionID]?.rarity ?? 1;
    return 0.9 + rarity * 0.08;
  }
  getWeightModelScale(weight) {
    const normalizedWeight = this.clamp(weight ?? 0, 0, 100);
    return 1 + normalizedWeight * 0.008;
  }
  toVector(value) {
    if (value === undefined) {
      return undefined;
    }
    if (Array.isArray(value)) {
      return new Vector2D(value[0], value[1]);
    }
    return new Vector2D(value.x, value.y);
  }
  normalizeDirection(point) {
    const normalized = point.Normalized();
    if (normalized.Length() <= 0.0001) {
      return new Vector2D(1, 0);
    }
    return normalized;
  }
  getRandomPosition() {
    return new Vector2D($.RandomFloat(-this.bounds.width, this.bounds.width), $.RandomFloat(this.getMinY(), this.getMaxY()));
  }
  getRandomHeight() {
    return $.RandomFloat(this.fishHeight.min, this.fishHeight.max);
  }
  getSpawnDirection() {
    return new Vector2D($.RandomInt(0, 1) === 0 ? -1 : 1, $.RandomFloat(-0.2, 0.2));
  }
  getTargetX(positionX, directionX) {
    if (directionX !== undefined && Math.abs(directionX) > 0.0001) {
      return directionX >= 0 ? this.bounds.width : -this.bounds.width;
    }
    return positionX >= 0 ? -this.bounds.width : this.bounds.width;
  }
  getOppositeWallX(positionX) {
    return positionX <= -this.bounds.width ? this.bounds.width : -this.bounds.width;
  }
  getInitialTarget(position, direction) {
    const targetX = this.getTargetX(position.x, direction?.x);
    if (direction !== undefined && Math.abs(direction.y) > 0.0001 && Math.abs(direction.x) > 0.0001) {
      const scale = (targetX - position.x) / direction.x;
      return new Vector2D(targetX, this.clamp(position.y + direction.y * scale, this.getMinY(), this.getMaxY()));
    }
    return new Vector2D(targetX, this.getNextTargetY(position.y));
  }
  getDirectionToTarget(position, targetPosition) {
    return this.normalizeDirection(targetPosition.Sub(position));
  }
  getFishHeight(collectionID, height) {
    KeyValues.collection[collectionID];
    return height ?? this.getRandomHeight();
  }
  getNextTargetY(currentY) {
    return this.clamp($.RandomFloat(currentY - this.target.yOffset, currentY + this.target.yOffset), this.getMinY(), this.getMaxY());
  }
  getNextFishHeight(collectionID, currentHeight) {
    return this.clamp($.RandomFloat(currentHeight - this.fishHeight.offset, currentHeight + this.fishHeight.offset), this.fishHeight.min, this.fishHeight.max);
  }
  getFishMoveSpeed(collectionID, movespeed) {
    KeyValues.collection[collectionID];
    return movespeed ?? $.RandomFloat(this.fishSpeed.min, this.fishSpeed.max);
  }
  getHeightAtPosition(fish) {
    const distance = fish.targetPosition.Sub(fish.position).Length();
    const totalDistance = fish.targetPosition.Sub(fish.startPosition).Length();
    if (totalDistance <= 0.0001) {
      return fish.targetHeight;
    }
    const progress = this.clamp(1 - distance / totalDistance, 0, 1);
    return fish.startHeight + (fish.targetHeight - fish.startHeight) * progress;
  }
  updateFishParticle(particleID, position, direction, height, movespeed) {
    const renderDirection = this.getRenderDirection(direction);
    Particles.SetParticleControlTransformForward(particleID, 0, [position.x, position.y, height], renderDirection.toVector3());
    Particles.SetParticleControl(particleID, 1, [direction.x * movespeed, direction.y * movespeed, 0]);
  }
  isOutsideX(x) {
    return x <= -this.bounds.width || x >= this.bounds.width;
  }
  isOutsideY(y) {
    return y <= this.getMinY() || y >= this.getMaxY();
  }
  clampPosition(position) {
    return new Vector2D(this.clamp(position.x, -this.bounds.width, this.bounds.width), this.clamp(position.y, this.getMinY(), this.getMaxY()));
  }
  getMinY() {
    return this.bounds.centerY - this.bounds.height;
  }
  getMaxY() {
    return this.bounds.centerY + this.bounds.height;
  }
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  getRenderDirection(direction) {
    return this.normalizeDirection(new Vector2D(direction.x, 0.1));
  }
}

const PANEL_FALL_DOWN_DURATION = 0.85;
const PANEL_FOLD_UP_DURATION = 0.38;
const FISH_PRICE_TOKEN_ID = 110003;
const DEFAULT_AVATAR_BORDER_ID = "1710000";
const DEFAULT_PLAYER_FISH_DATA = {
  aquarium_level: 0,
  equipment_level: 0,
  rod_level: 0,
  fish_bait: 0,
  fish_hooks: [],
  fish_courier_ids: [],
  times: 1,
  auto_switch_tools: false
};
const aquariumRarityTabs = [{
  label: "#FishingBag_Filter_All",
  filter: "all"
}, {
  label: "#FishingBag_Filter_Legendary",
  filter: 5
}, {
  label: "#FishingBag_Filter_Epic",
  filter: 4
}, {
  label: "#FishingBag_Filter_Rare",
  filter: 3
}, {
  label: "#FishingBag_Filter_Good",
  filter: 2
}, {
  label: "#FishingBag_Filter_Common",
  filter: 1
}, {
  label: "#Aquarium",
  filter: "aquarium"
}];
const getMappedStatNumericValue = (weight, min, max) => {
  if (min === undefined || max === undefined) {
    return undefined;
  }
  const normalizedWeight = Math.max(0, Math.min(100, weight ?? 0));
  return min + (max - min) * normalizedWeight / 100;
};
const getFishLocalizedName = fishItemID => {
  if (fishItemID === undefined) {
    return "";
  }
  return GetLocalization(`Normal_${fishItemID}`, "");
};
const getPlayerAvatarBorderID = cosmeticEquips => {
  for (const equip of Object.values(cosmeticEquips ?? {})) {
    const cosmeticID = String(equip.cosmetic_id);
    if (KeyValues.info_item_cosmetic[cosmeticID]?.type == COSMETIC_TYPE.BORDER) {
      return cosmeticID;
    }
  }
  return DEFAULT_AVATAR_BORDER_ID;
};
const normalizeSearchKeyword = keyword => keyword.trim().toLowerCase();
const getFishActualLengthValue = (fishItemID, weight) => {
  if (fishItemID === undefined) {
    return 0;
  }
  const collectionData = KeyValues.collection[String(fishItemID)];
  return getMappedStatNumericValue(weight, collectionData?.length_min, collectionData?.length_max) ?? 0;
};
const getFishActualWeightValue = (fishItemID, weight) => {
  if (fishItemID === undefined) {
    return 0;
  }
  const collectionData = KeyValues.collection[String(fishItemID)];
  return getMappedStatNumericValue(weight, collectionData?.weight_min, collectionData?.weight_max) ?? 0;
};
const formatFishLength = (fishItemID, weight) => `${Round(getFishActualLengthValue(fishItemID, weight), 1)}cm`;
const getFishSellPriceValue = prices => {
  if (prices === undefined) {
    return 0;
  }
  for (let i = 0; i < prices.length; i++) {
    if (prices[i].item_id === FISH_PRICE_TOKEN_ID) {
      return prices[i].amounts;
    }
  }
  return 0;
};
const getAquariumSlotUpgradeCost = level => {
  const aquariumSlotConfig = GameUI.CustomUIConfig().aquarium_slot;
  const levelConfig = aquariumSlotConfig?.[String(level)];
  const costItems = levelConfig?.cost_item;
  if (costItems === undefined) {
    return undefined;
  }
  const costItemKeys = Object.keys(costItems);
  if (costItemKeys.length <= 0) {
    return undefined;
  }
  const tokenID = Number(costItemKeys[0]);
  const amount = Number(costItems[costItemKeys[0]] ?? 0);
  if (tokenID <= 0 || amount <= 0) {
    return undefined;
  }
  return {
    tokenID,
    amount
  };
};
const Aquarium = props => {
  const aquariumFishPool = new AquariumFishPool();
  const [sceneReady, setSceneReady] = libs.createSignal(false);
  const [playerIdleGameFishes, setPlayerIdleGameFishes] = libs.createSignal({});
  const [playerIdleGameFishData, setPlayerIdleGameFishData] = libs.createSignal(DEFAULT_PLAYER_FISH_DATA);
  libs.createSignal(1);
  libs.createSignal(10);
  const player_tokens = solid_utils.createServiceNetData("player_tokens", {});
  const localPlayerID = Players.GetLocalPlayer();
  const localSteamID = libs.createMemo(() => service_netdata_helper.getPlayerSteamID({
    playerID: localPlayerID
  }));
  const requestedSteamID = libs.createMemo(() => service_netdata_helper.getPlayerSteamID({
    playerID: props.playerID,
    steamID: props.steamID,
    steam64ID: props.steam64ID
  }));
  const hasRequestedTarget = libs.createMemo(() => props.playerID != undefined || props.steamID != undefined || props.steam64ID != undefined);
  const requestedPlayerID = libs.createMemo(() => {
    const allPlayerIDs = Game.GetAllPlayerIDs();
    if (props.playerID != undefined && allPlayerIDs.includes(props.playerID)) {
      return props.playerID;
    }
    const steamID = requestedSteamID();
    if (steamID == undefined) return undefined;
    return allPlayerIDs.find(playerID => service_netdata_helper.getPlayerSteamID({
      playerID
    }) == steamID);
  });
  const initialSelectedID = requestedPlayerID() ?? (hasRequestedTarget() ? undefined : localPlayerID);
  const [selectedID, setSelectedID] = libs.createSignal(initialSelectedID);
  const selectedSteamID = libs.createMemo(() => {
    const playerID = selectedID();
    return playerID == undefined ? requestedSteamID() : service_netdata_helper.getPlayerSteamID({
      playerID
    });
  });
  const isRemoteVisit = libs.createMemo(() => selectedID() == undefined && selectedSteamID() != undefined);
  const canManageAquarium = libs.createMemo(() => selectedID() == localPlayerID || selectedSteamID() != undefined && selectedSteamID() == localSteamID());
  const remotePlayerInfo = service_netdata_helper.GetPlayerInfo({
    steamID: () => isRemoteVisit() ? selectedSteamID() : undefined
  });
  const [levelPanelState, setLevelPanelState] = libs.createSignal("showing");
  const [managerPanelState, setManagerPanelState] = libs.createSignal("hidden");
  const [managerSearchKeyword, setManagerSearchKeyword] = libs.createSignal("");
  const [managerRarity, setManagerRarity] = libs.createSignal("all");
  const [managerSortType, setManagerSortType] = libs.createSignal(0);
  let panelScheduleID = $.Schedule(PANEL_FALL_DOWN_DURATION, () => {
    panelScheduleID = undefined;
    setLevelPanelState("shown");
  });
  const cancelPanelSchedule = () => {
    if (panelScheduleID !== undefined) {
      $.CancelScheduled(panelScheduleID);
      panelScheduleID = undefined;
    }
  };
  let requestedTargetKey = "";
  libs.createEffect(() => {
    const nextTargetKey = `${hasRequestedTarget()}:${requestedPlayerID() ?? "remote"}:${requestedSteamID() ?? ""}`;
    if (nextTargetKey == requestedTargetKey) return;
    requestedTargetKey = nextTargetKey;
    setSelectedID(requestedPlayerID() ?? (hasRequestedTarget() ? undefined : localPlayerID));
  });
  const setPanelState = (panel, state) => {
    if (panel === "level") {
      setLevelPanelState(state);
      return;
    }
    setManagerPanelState(state);
  };
  const switchAquariumPanel = targetPanel => {
    if (targetPanel == "manager" && !canManageAquarium()) {
      return;
    }
    Game.EmitSound("UI.ChainFallDown");
    const currentPanel = managerPanelState() !== "hidden" ? "manager" : "level";
    if (currentPanel === targetPanel || panelScheduleID !== undefined) {
      return;
    }
    cancelPanelSchedule();
    setPanelState(currentPanel, "hiding");
    panelScheduleID = $.Schedule(PANEL_FOLD_UP_DURATION, () => {
      setPanelState(currentPanel, "hidden");
      setPanelState(targetPanel, "showing");
      panelScheduleID = $.Schedule(PANEL_FALL_DOWN_DURATION, () => {
        setPanelState(targetPanel, "shown");
        panelScheduleID = undefined;
      });
    });
  };
  libs.createEffect(() => {
    if (canManageAquarium()) return;
    cancelPanelSchedule();
    setManagerPanelState("hidden");
    setLevelPanelState("shown");
  });
  const managerFishList = libs.createMemo(() => {
    if (!canManageAquarium()) return [];
    const fishes = Object.values(playerIdleGameFishes());
    return fishes;
  });
  const visibleFishSnapshot = libs.createMemo(() => {
    const sourceFishes = playerIdleGameFishes();
    const nextSnapshot = {};
    const fishKeys = Object.keys(sourceFishes);
    for (let i = 0; i < fishKeys.length; i++) {
      const fishData = sourceFishes[fishKeys[i]];
      if (fishData === undefined || fishData.show !== true || fishData.id <= 0) {
        continue;
      }
      nextSnapshot[String(fishData.id)] = fishData;
    }
    return nextSnapshot;
  });
  const showingFishCount = libs.createMemo(() => {
    const fishes = managerFishList();
    let count = 0;
    for (let i = 0; i < fishes.length; i++) {
      if (fishes[i].show === true) {
        count++;
      }
    }
    return count;
  });
  const property_system = solid_utils.createPlayerPropertyData(() => selectedID() ?? localPlayerID);
  const aquariumSlotLimit = libs.createMemo(() => {
    return toFiniteNumber(Float(property_system().aquarium_slot), 0) + toFiniteNumber(CustomUIConfig.idle_game_setting.aquarium_slot.value);
  });
  const managerVisibleFishList = libs.createMemo(() => {
    const filter = managerRarity();
    const keyword = normalizeSearchKeyword(managerSearchKeyword());
    const sortType = managerSortType();
    const fishes = managerFishList().filter(fishData => {
      const matchesKeyword = normalizeSearchKeyword(getFishLocalizedName(fishData.fish_item_id)).includes(keyword);
      if (!matchesKeyword) {
        return false;
      }
      if (filter === "all") {
        return true;
      }
      if (filter === "aquarium") {
        return fishData.show === true;
      }
      return GetServiceItemRarity(fishData.fish_item_id ?? "420000") === filter;
    });
    fishes.sort((leftFishData, rightFishData) => {
      const showDiff = (rightFishData.show === true ? 1 : 0) - (leftFishData.show === true ? 1 : 0);
      if (showDiff !== 0) {
        return showDiff;
      }
      if (sortType === 0) {
        return rightFishData.id - leftFishData.id;
      }
      if (sortType === 1) {
        const leftName = normalizeSearchKeyword(getFishLocalizedName(leftFishData.fish_item_id));
        const rightName = normalizeSearchKeyword(getFishLocalizedName(rightFishData.fish_item_id));
        if (leftName < rightName) {
          return -1;
        }
        if (leftName > rightName) {
          return 1;
        }
        return rightFishData.id - leftFishData.id;
      }
      if (sortType === 2) {
        const rarityDiff = GetServiceItemRarity(rightFishData.fish_item_id ?? "420000") - GetServiceItemRarity(leftFishData.fish_item_id ?? "420000");
        if (rarityDiff !== 0) {
          return rarityDiff;
        }
        return rightFishData.id - leftFishData.id;
      }
      if (sortType === 3) {
        const weightDiff = getFishActualWeightValue(rightFishData.fish_item_id, rightFishData.weight) - getFishActualWeightValue(leftFishData.fish_item_id, leftFishData.weight);
        if (weightDiff !== 0) {
          return weightDiff;
        }
        return rightFishData.id - leftFishData.id;
      }
      const priceDiff = getFishSellPriceValue(rightFishData.price) - getFishSellPriceValue(leftFishData.price);
      if (priceDiff !== 0) {
        return priceDiff;
      }
      return rightFishData.id - leftFishData.id;
    });
    return fishes;
  });
  const managerRarityIndex = libs.createMemo(() => {
    const currentFilter = managerRarity();
    for (let i = 0; i < aquariumRarityTabs.length; i++) {
      if (aquariumRarityTabs[i].filter === currentFilter) {
        return i;
      }
    }
    return 0;
  });
  const canToggleFishCard = fishData => {
    if (!canManageAquarium()) {
      return false;
    }
    if (fishData.show === true) {
      return true;
    }
    return showingFishCount() < aquariumSlotLimit();
  };
  const managerFooterVars = libs.createMemo(() => ({
    shown: String(showingFishCount()),
    limit: String(aquariumSlotLimit()),
    total: String(managerFishList().length)
  }));
  const aquariumUnlockSlotCost = libs.createMemo(() => getAquariumSlotUpgradeCost(playerIdleGameFishData().aquarium_level));
  const canUnlockAquariumSlot = libs.createMemo(() => {
    if (!canManageAquarium()) {
      return false;
    }
    const unlockCost = aquariumUnlockSlotCost();
    if (unlockCost === undefined) {
      return false;
    }
    return (player_tokens()[unlockCost.tokenID]?.amounts ?? 0) >= unlockCost.amount;
  });
  const toggleFishShowState = (fishID, show, button) => {
    if (!canManageAquarium()) {
      return;
    }
    button.enabled = false;
    CallActionRequest("/v1/idle_game/show_fish", {
      fish_id: fishID,
      show
    }, () => {
      button.enabled = true;
    });
  };
  libs.createEffect(() => {
    const playerID = selectedID();
    if (playerID == undefined) {
      const steamID = selectedSteamID();
      const playerInfoData = remotePlayerInfo.data();
      if (steamID == undefined || playerInfoData?.steamID != steamID) {
        setPlayerIdleGameFishes({});
        setPlayerIdleGameFishData(DEFAULT_PLAYER_FISH_DATA);
        return;
      }
      setPlayerIdleGameFishes(playerInfoData.player_idle_game_fishes ?? {});
      setPlayerIdleGameFishData(playerInfoData.player_idle_game_fish_data ?? DEFAULT_PLAYER_FISH_DATA);
      return;
    }
    const updateIdleGameFishes = data => {
      const nextIdleGameFishes = data ?? {};
      setPlayerIdleGameFishes(nextIdleGameFishes);
    };
    const updateIdleGameFishData = data => {
      setPlayerIdleGameFishData(data ?? DEFAULT_PLAYER_FISH_DATA);
    };
    updateIdleGameFishes(getServiceNetData("player_idle_game_fishes", playerID) ?? {});
    updateIdleGameFishData(getServiceNetData("player_idle_game_fish_data", playerID));
    const fishesListenerID = useServiceNetData("player_idle_game_fishes", data => {
      updateIdleGameFishes(data ?? {});
    }, playerID);
    const fishDataListenerID = useServiceNetData("player_idle_game_fish_data", data => {
      updateIdleGameFishData(data);
    }, playerID);
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(fishesListenerID);
      CustomNetTables.UnsubscribeNetTableListener(fishDataListenerID);
    });
  });
  libs.createEffect(() => {
    if (!sceneReady()) {
      return;
    }
    aquariumFishPool.SyncOwnedFish(visibleFishSnapshot());
    let sound = Game.EmitSound("Aquarium.UI");
    libs.onCleanup(() => {
      Game.StopSound(sound);
    });
  });
  libs.onCleanup(() => {
    cancelPanelSchedule();
    aquariumFishPool.Stop();
    aquariumFishPool.RemoveAllFish();
  });
  const handleClose = () => {
    ClientSideEvent("custom_ui_toggle_windows", {
      windowName: "MenuButton_aquarium",
      state: 0
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "Aquarium",
        get ["class"]() {
          return libs.classNames("AquariumRoot", {
            ReadOnly: !canManageAquarium()
          });
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "AquariumSceneBox"
      }, _el$),
      _el$3 = libs.createElement("DOTAScenePanel", {
        id: "AquariumScene",
        map: "maps/scene/fishing.vmap",
        camera: "camera",
        light: "light",
        renderdeferred: true,
        rendershadows: true,
        renderwaterreflections: true,
        drawbackground: true,
        particleonly: false
      }, _el$2);
      libs.createElement("Panel", {
        id: "AquariumSceneMask"
      }, _el$2);
      const _el$5 = libs.createElement("Panel", {
        id: "AquariumTopBorder"
      }, _el$);
      libs.createElement("Image", {
        id: "AquariumTopBorderImage"
      }, _el$5);
      const _el$7 = libs.createElement("Panel", {
        id: "AquariumBottomBorder"
      }, _el$);
      libs.createElement("Image", {
        id: "AquariumBottomBorderImage"
      }, _el$7);
      libs.createElement("Panel", {
        id: "AquariumBGMaskLeft"
      }, _el$);
      libs.createElement("Panel", {
        id: "AquariumBGMaskRight"
      }, _el$);
      const _el$1 = libs.createElement("Panel", {
        id: "AquariumLevelPanel",
        get ["class"]() {
          return libs.classNames("AquariumChainPanel", `State_${levelPanelState()}`);
        }
      }, _el$);
      libs.createElement("Label", {
        id: "AquariumLevelTitle",
        text: "#Aquarium_Menu"
      }, _el$1);
      const _el$11 = libs.createElement("Label", {
        id: "AquariumSlot",
        html: true,
        text: "#Aquarium_Slot",
        get vars() {
          return managerFooterVars();
        }
      }, _el$1),
      _el$12 = libs.createElement("Panel", {
        id: "AquariumActionList"
      }, _el$1),
      _el$16 = libs.createElement("Panel", {
        id: "AquariumManagerPanel",
        get ["class"]() {
          return libs.classNames("AquariumChainPanel", `State_${managerPanelState()}`);
        }
      }, _el$),
      _el$17 = libs.createElement("Panel", {
        id: "AquariumManagerTitle"
      }, _el$16),
      _el$19 = libs.createElement("Label", {
        text: "#Aquarium_Manager"
      }, _el$17),
      _el$20 = libs.createElement("Panel", {
        id: "AquariumManagerHeader"
      }, _el$16),
      _el$21 = libs.createElement("Panel", {
        id: "AquariumManagerToolbar"
      }, _el$20),
      _el$27 = libs.createElement("Panel", {
        id: "AquariumManagerList",
        scroll: "y"
      }, _el$16),
      _el$29 = libs.createElement("Panel", {
        id: "AquariumManagerFooter"
      }, _el$16),
      _el$30 = libs.createElement("Label", {
        id: "AquariumManagerSummary",
        html: true,
        text: "#Aquarium_ManagerSummary",
        get vars() {
          return managerFooterVars();
        }
      }, _el$29),
      _el$31 = libs.createElement("Panel", {
        id: "AquariumVisitPanel"
      }, _el$);
      libs.createElement("Label", {
        id: "AquariumVisitTitle",
        text: "#Aquarium_Visit"
      }, _el$31);
      const _el$33 = libs.createElement("Panel", {
        id: "AquariumVisitList"
      }, _el$31);
      libs.createElement("Panel", {
        id: "AquariumShellImage"
      }, _el$);
    libs.setProp(_el$3, "onload", self => {
      let request = ClientRequest("get_fish_ent", {});
      if (request == undefined) {
        return;
      }
      aquariumFishPool.SetEnvironment(request.entindex);
      aquariumFishPool.SetFishEntList(request.fishEntList);
      setSceneReady(true);
    });
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return aquariumUnlockSlotCost();
      },
      children: cost => (() => {
        const _el$39 = libs.createElement("Panel", {
            id: "AquariumUnlockSlotCost"
          }, null),
          _el$40 = libs.createElement("Label", {
            get text() {
              return String(cost().amount);
            }
          }, _el$39);
        libs.insert(_el$39, libs.createComponent(Player.CurrencyIcon, {
          get tokenID() {
            return cost().tokenID;
          }
        }), _el$40);
        libs.effect(_$p => libs.setProp(_el$40, "text", String(cost().amount), _$p));
        return _el$39;
      })()
    }), _el$12);
    libs.insert(_el$1, libs.createComponent(EOM_Button.EOM_Button, {
      id: "AquariumUnlockSlot",
      get enabled() {
        return canUnlockAquariumSlot();
      },
      size: "Small",
      text: "#Aquarium_UnlockSlot",
      onactivate: () => {
        if (!canManageAquarium()) return;
        CallAction("/v1/idle_game/levelup_aquarium", {
          target_level: playerIdleGameFishData().aquarium_level + 1
        });
      }
    }), _el$12);
    libs.insert(_el$12, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "AquariumAction",
      get enabled() {
        return canManageAquarium();
      },
      tooltip: "#FishingBag",
      onactivate: () => {
        if (!canManageAquarium()) return;
        JumpToMenu({
          window_name: "fishingitem",
          menu: "FishingBag",
          force: true
        });
      },
      get children() {
        return libs.createElement("Image", {
          id: "FishBag"
        }, null);
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "AquariumAction",
      get enabled() {
        return canManageAquarium();
      },
      tooltip: "#Aquarium_GotoFish",
      onactivate: () => {
        if (!canManageAquarium()) return;
        JumpToMenu({
          window_name: "fishingitem",
          menu: "Collection_Menu_fish",
          force: true
        });
      },
      get children() {
        return libs.createElement("Image", {
          id: "FishBook"
        }, null);
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "AquariumAction",
      get enabled() {
        return canManageAquarium();
      },
      tooltip: "#Aquarium_Manager",
      onactivate: () => switchAquariumPanel("manager"),
      get children() {
        return libs.createElement("Image", {
          id: "FishSetting"
        }, null);
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "AquariumAction",
      onactivate: () => switchAquariumPanel("level"),
      get children() {
        return libs.createElement("Image", {
          id: "FishReturnIcon"
        }, null);
      }
    }), _el$19);
    libs.insert(_el$20, libs.createComponent(EOM_SearchBox.EOM_SearchBox, {
      id: "AquariumManagerSearch",
      get placeholder() {
        return GetLocalization("#FishingBag_SearchPlaceholder");
      },
      onSearch: setManagerSearchKeyword
    }), _el$21);
    libs.insert(_el$20, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      id: "AquariumManagerRarity",
      type: "EquipmentDropDown",
      get index() {
        return managerRarityIndex();
      },
      onChange: index => setManagerRarity(aquariumRarityTabs[index].filter),
      get children() {
        return libs.createComponent(libs.For, {
          each: aquariumRarityTabs,
          children: tab => (() => {
            const _el$41 = libs.createElement("Label", {
              get text() {
                return tab.label;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$41, "text", tab.label, _$p));
            return _el$41;
          })()
        });
      }
    }), _el$21);
    libs.insert(_el$21, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      id: "AquariumManagerSort",
      get index() {
        return managerSortType();
      },
      type: "EquipmentDropDown",
      onChange: index => setManagerSortType(index),
      get children() {
        return [libs.createElement("Label", {
          text: "#FishingBag_Sort_Time"
        }, null), libs.createElement("Label", {
          text: "#FishingBag_Sort_Name"
        }, null), libs.createElement("Label", {
          text: "#FishingBag_Sort_Rarity"
        }, null), libs.createElement("Label", {
          text: "#FishingBag_Sort_Weight"
        }, null), libs.createElement("Label", {
          text: "#FishingBag_Sort_Price"
        }, null)];
      }
    }));
    libs.setProp(_el$27, "scroll", "y");
    libs.insert(_el$27, libs.createComponent(libs.For, {
      get each() {
        return managerVisibleFishList();
      },
      children: fishData => (() => {
        const _el$42 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("AquariumManagerFishCard", `Rarity${GetServiceItemRarity(fishData.fish_item_id ?? "420000")}`, {
                Showing: fishData.show === true
              });
            }
          }, null),
          _el$43 = libs.createElement("Label", {
            "class": "AquariumManagerFishName",
            get text() {
              return getFishLocalizedName(fishData.fish_item_id);
            }
          }, _el$42),
          _el$44 = libs.createElement("Panel", {
            "class": "AquariumManagerFishIconWrap"
          }, _el$42),
          _el$45 = libs.createElement("Panel", {
            "class": "AquariumManagerFishMetaRow"
          }, _el$42),
          _el$46 = libs.createElement("Label", {
            "class": "AquariumManagerFishMeta",
            get text() {
              return formatFishLength(fishData.fish_item_id, fishData.weight);
            }
          }, _el$45);
          libs.createElement("Label", {
            "class": "AquariumManagerFishMeta Divider",
            text: "·"
          }, _el$45);
          const _el$48 = libs.createElement("Label", {
            "class": "AquariumManagerFishMeta Price",
            get text() {
              return String(getFishSellPriceValue(fishData.price));
            }
          }, _el$45);
        libs.insert(_el$44, libs.createComponent(StoreItem.StoreItemImage, {
          hittest: false,
          "class": "AquariumManagerFishIcon",
          get itemid() {
            return fishData.fish_item_id ?? "420000";
          }
        }));
        libs.insert(_el$45, libs.createComponent(Player.CurrencyIcon, {
          tokenID: 110003
        }), null);
        libs.insert(_el$42, libs.createComponent(EOM_Button.EOM_BaseButton, {
          get ["class"]() {
            return libs.classNames("AquariumManagerToggleButton", {
              Danger: fishData.show === true,
              Disabled: !canToggleFishCard(fishData)
            });
          },
          get enabled() {
            return canToggleFishCard(fishData);
          },
          onactivate: self => toggleFishShowState(fishData.id, fishData.show !== true, self),
          get children() {
            const _el$49 = libs.createElement("Label", {
              get text() {
                return fishData.show === true ? "#Aquarium_ManagerUnShow" : "#Aquarium_ManagerShow";
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$49, "text", fishData.show === true ? "#Aquarium_ManagerUnShow" : "#Aquarium_ManagerShow", _$p));
            return _el$49;
          }
        }), null);
        libs.effect(_p$ => {
          const _v$0 = libs.classNames("AquariumManagerFishCard", `Rarity${GetServiceItemRarity(fishData.fish_item_id ?? "420000")}`, {
              Showing: fishData.show === true
            }),
            _v$1 = getFishLocalizedName(fishData.fish_item_id),
            _v$10 = formatFishLength(fishData.fish_item_id, fishData.weight),
            _v$11 = String(getFishSellPriceValue(fishData.price));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$42, "class", _v$0, _p$._v$0));
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$43, "text", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$46, "text", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$48, "text", _v$11, _p$._v$11));
          return _p$;
        }, {
          _v$0: undefined,
          _v$1: undefined,
          _v$10: undefined,
          _v$11: undefined
        });
        return _el$42;
      })()
    }), null);
    libs.insert(_el$27, libs.createComponent(libs.Show, {
      get when() {
        return managerVisibleFishList().length <= 0;
      },
      get children() {
        return libs.createElement("Label", {
          id: "AquariumManagerEmpty",
          text: "#Aquarium_ManagerEmpty"
        }, null);
      }
    }), null);
    libs.insert(_el$33, libs.createComponent(libs.Show, {
      get when() {
        return isRemoteVisit();
      },
      get fallback() {
        return libs.createComponent(libs.For, {
          get each() {
            return Game.GetAllPlayerIDs();
          },
          children: playerID => libs.createComponent(EOM_Button.EOM_BaseButton, {
            get ["class"]() {
              return libs.classNames("AquariumVisitorItem", {
                Selected: selectedID() === playerID
              });
            },
            onactivate: () => setSelectedID(playerID),
            get children() {
              return [libs.createElement("Image", {
                "class": "SelectedIcon"
              }, null), libs.createElement("Image", {
                "class": "SelectedIcon Right"
              }, null), libs.createElement("Image", {
                "class": "SelectedUnderline"
              }, null), libs.createComponent(Player.PlayerAvatar, {
                playerid: playerID,
                get borderid() {
                  return getPlayerAvatarBorderID(getServiceNetData("player_cosmetic_equips", playerID));
                }
              }), libs.createComponent(Player.PlayerName, {
                get steamid() {
                  return Game.GetPlayerInfo(playerID)?.player_steamid ?? "-1";
                }
              })];
            }
          })
        });
      },
      get children() {
        const _el$34 = libs.createElement("Panel", {
            "class": "AquariumVisitorItem Selected",
            hittest: false
          }, null);
          libs.createElement("Image", {
            "class": "SelectedIcon"
          }, _el$34);
          libs.createElement("Image", {
            "class": "SelectedIcon Right"
          }, _el$34);
          libs.createElement("Image", {
            "class": "SelectedUnderline"
          }, _el$34);
        libs.insert(_el$34, libs.createComponent(Player.PlayerAvatar, {
          get accountid() {
            return selectedSteamID();
          },
          get borderid() {
            return getPlayerAvatarBorderID(remotePlayerInfo.data()?.player_cosmetic_equips);
          }
        }), null);
        libs.insert(_el$34, libs.createComponent(Player.PlayerName, {
          get accountid() {
            return selectedSteamID();
          }
        }), null);
        return _el$34;
      }
    }));
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!isRemoteVisit())() && remotePlayerInfo.loading();
      },
      get children() {
        return libs.createComponent(EOM_Loading.EOM_Loading, {
          align: "center center",
          type: "PointSpin"
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_CloseButton, {
      onactivate: handleClose
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames("AquariumRoot", {
          ReadOnly: !canManageAquarium()
        }),
        _v$2 = libs.classNames("AquariumChainPanel", `State_${levelPanelState()}`),
        _v$3 = levelPanelState() !== "hidden",
        _v$4 = !isRemoteVisit(),
        _v$5 = managerFooterVars(),
        _v$6 = libs.classNames("AquariumChainPanel", `State_${managerPanelState()}`),
        _v$7 = managerPanelState() !== "hidden",
        _v$8 = managerFooterVars(),
        _v$9 = isRemoteVisit() || Game.GetAllPlayerIDs().length > 1;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "visible", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$11, "visible", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "vars", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$16, "class", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$16, "visible", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$30, "vars", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$31, "visible", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$;
  })();
};

const MENU_LIST = {
  Aquarium_Menu: []
};
const {
  show,
  menuName,
  jumpInfo
} = EOM_MenuLayout.createMenuLayout("aquarium", () => MENU_LIST);
const targetPlayerID = libs.createMemo(() => {
  const playerID = jumpInfo()?.data?.playerID;
  return typeof playerID == "number" ? playerID : undefined;
});
const targetSteamID = libs.createMemo(() => {
  const steamID = jumpInfo()?.data?.steamID;
  return typeof steamID == "number" || typeof steamID == "string" ? steamID : undefined;
});
const targetSteam64ID = libs.createMemo(() => {
  const steam64ID = jumpInfo()?.data?.steam64ID;
  return typeof steam64ID == "number" || typeof steam64ID == "string" ? steam64ID : undefined;
});
function AquariumRoot() {
  libs.createEffect(() => {
    print("aquarium show:", show(), "menuName:", menuName());
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(Aquarium, {
        get playerID() {
          return targetPlayerID();
        },
        get steamID() {
          return targetSteamID();
        },
        get steam64ID() {
          return targetSteam64ID();
        }
      });
    }
  });
}
libs.render(() => libs.createComponent(AquariumRoot, {}), $.GetContextPanel());