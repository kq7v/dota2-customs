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
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Switch = require('./EOM_Switch.js');
var hero_selection_bar = require('./hero_selection_bar.js');
var Player = require('./Player.js');
var weapon3DPreview = require('./weapon3DPreview.js');
var StoreItem = require('./StoreItem.js');
var global_selection = require('./global_selection.js');
var solid_utils = require('./solid_utils.js');
var EOM_FilterChip = require('./EOM_FilterChip.js');
var EOM_NumberAdjust = require('./EOM_NumberAdjust.js');
var RecycleView = require('./RecycleView.js');
require('./service_netdata_helper.js');
require('./EOM_HeroImage.js');
require('./EOM_TextEntry.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const CosmeticPreview = props => {
  const [local, others] = libs.splitProps(props, ["class", "children"]);
  const [key, SetKey] = libs.createSignal(undefined);
  const [sceneEnabled, setSceneEnabled] = libs.createSignal(false);
  const entityName = "hero_preview";
  let queueReleased = false;
  let reload = false;
  let queueToken = QueueSerialSceneEntityLoad(entityName, () => {
    setSceneEnabled(true);
  });
  const releaseQueueToken = () => {
    if (!queueReleased) {
      queueReleased = true;
      ReleaseSerialSceneEntityLoad(entityName, queueToken);
    }
  };
  libs.onCleanup(() => {
    let s = key();
    if (s != undefined) {
      StopWaitSceneEntityLoad(entityName, s);
      SetKey(undefined);
    }
    releaseQueueToken();
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("CosmeticPreview", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("CosmeticPreview", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return sceneEnabled();
      },
      get children() {
        const _el$2 = libs.createElement("DOTAScenePanel", {
          id: "CosmeticPreviewScene",
          "animate-during-pause": true,
          map: "scene/hero_preview",
          camera: "camera_dist",
          light: "preview_light",
          renderdeferred: true,
          rendershadows: true,
          deferredalpha: true,
          particleonly: false,
          allowrotation: true,
          squarePixels: true,
          renderwaterreflections: true,
          antialias: true,
          allowsuspendrepaint: true
        }, null);
        libs.use(self => {
          props.sceneRef?.(self);
          reload = false;
          SetKey(WaitSceneEntityLoad(entityName, {
            heroName: props.heroName,
            bodyGroup: props.bodyGroup,
            bodyGroupChoice: props.bodyGroupChoice
          }));
          let checkUpdate = () => {
            let s = key();
            if (!self.IsValid() || s == undefined) {
              if (s != undefined) {
                StopWaitSceneEntityLoad(entityName, s);
                SetKey(undefined);
              }
              releaseQueueToken();
            } else {
              $.Schedule(0, checkUpdate);
            }
          };
          checkUpdate();
        }, _el$2);
        libs.setProp(_el$2, "onload", self => {
          props.sceneReady?.(self);
          if (reload) {
            setSceneEnabled(false);
            queueReleased = false;
            queueToken = QueueSerialSceneEntityLoad(entityName, () => {
              setSceneEnabled(true);
            });
          } else {
            let s = key();
            if (s != undefined) {
              StopWaitSceneEntityLoad(entityName, s);
              SetKey(undefined);
            }
            releaseQueueToken();
            if (reload == false) {
              reload = true;
            }
          }
          self.LerpToCameraEntity("preview_camera_far", 0.25);
        });
        return _el$2;
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

const HERO_WEAPON_CATEGORY = "HERO_WEAPON";
const maxWeaponStar = 6;
let secondTabName$1;
const cosmeticPreviewType = [COSMETIC_TYPE.HEAD, COSMETIC_TYPE.SHOULDER, COSMETIC_TYPE.BACK, COSMETIC_TYPE.TAIL, COSMETIC_TYPE.WING, COSMETIC_TYPE.MISC, COSMETIC_TYPE.FOOTPRINT_EFFECT, COSMETIC_TYPE.AURA_EFFECT];
const fakePreviewType = [COSMETIC_TYPE.ATTACK_EFFECT, COSMETIC_TYPE.SPECIAL_SKILL_EFFECT, COSMETIC_TYPE.DASH_SKILL_EFFECT, COSMETIC_TYPE.DEFENSE_SKILL_EFFECT, COSMETIC_TYPE.ULTIMATE_SKILL_EFFECT];
let wasInFakePreview = false;
let lastPreviewHeroName = "";
let cosmeticID = () => "1710001";
let setCosmeticID = () => "1710001";
let weaponID = () => "";
let setWeaponID = () => "";
let requestingWeaponEquip = () => false;
let setRequestingWeaponEquip = () => false;
let player_cosmetics = () => ({});
let player_cosmetic_equips = () => ({});
let player_weapons = () => ({});
let player_heroes = () => ({});
let cosmeticUnreadIds;
let serviceCosmeticInfo = () => undefined;
let cosmeticData = () => undefined;
let equipDefault = () => true;
let setEquipDefault = () => true;
let shortHair = () => Players.GetPlayerSetting("short_hair", false);
let setShortHair = () => false;
let previewHeroName = () => "";
let setPreviewHeroName = () => "";
let previewHeroID = () => undefined;
const isCosmeticHeroMenu = menuName => menuName == "Cosmetic_Hero";
const isHeroWeaponTab = () => secondTabName$1() == HERO_WEAPON_CATEGORY;
const shouldShowSignature = () => !isHeroWeaponTab() && serviceCosmeticInfo() != undefined && cosmeticData()?.is_sign === 1;
const isCosmeticDisplayable = item => item.hide !== 1 || Game.IsInToolsMode();
const isWeaponDisplayable = item => item.in_tool != 1 || Game.IsInToolsMode();
let equipWeaponID = () => undefined;
let weaponList = () => [];
let displayableWeaponList = () => [];
let weaponData = () => undefined;
let weaponServiceData = () => ({
  star: 0,
  extra_star_exp: 0
});
let weaponUnlocked = () => false;
let weaponEquipped = () => false;
let cosmeticByType = () => ({});
function createCosmeticPageState() {
  [cosmeticID, setCosmeticID] = libs.createSignal("1710001");
  [weaponID, setWeaponID] = libs.createSignal("");
  [requestingWeaponEquip, setRequestingWeaponEquip] = libs.createSignal(false);
  player_cosmetics = solid_utils.createServiceNetData("player_cosmetics", {});
  player_cosmetic_equips = solid_utils.createServiceNetData("player_cosmetic_equips", {});
  player_weapons = solid_utils.createServiceNetData("player_weapons", {});
  player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  cosmeticUnreadIds = solid_utils.createPlayerUnreadIds("cosmetic");
  serviceCosmeticInfo = libs.createMemo(() => {
    return player_cosmetics()?.[cosmeticID()];
  });
  cosmeticData = libs.createMemo(() => KeyValues.info_item_cosmetic[cosmeticID()]);
  [equipDefault, setEquipDefault] = libs.createSignal(true);
  [shortHair, setShortHair] = libs.createSignal(Players.GetPlayerSetting("short_hair", false));
  [previewHeroName, setPreviewHeroName] = global_selection.createPreviewHeroNameSignal();
  previewHeroID = libs.createMemo(() => GetHeroIDByHeroName(previewHeroName()));
  equipWeaponID = libs.createMemo(() => {
    const heroData = player_heroes()[String(previewHeroID())];
    return heroData?.equip_weapon;
  });
  weaponList = libs.createMemo(() => {
    const heroID = previewHeroID();
    if (heroID == undefined) return [];
    return Object.keys(KeyValues.weapon).filter(id => {
      const weapon = KeyValues.weapon[id];
      return weapon.hero == heroID;
    }).sort((weapon1, weapon2) => {
      const unlocked1 = (player_weapons()[weapon1]?.star ?? 0) > 0;
      const unlocked2 = (player_weapons()[weapon2]?.star ?? 0) > 0;
      if (unlocked1 && !unlocked2) return -1;
      if (!unlocked1 && unlocked2) return 1;
      return 0;
    });
  });
  displayableWeaponList = libs.createMemo(() => weaponList().filter(id => isWeaponDisplayable(KeyValues.weapon[id])));
  weaponData = libs.createMemo(() => KeyValues.weapon[weaponID()]);
  weaponServiceData = libs.createMemo(() => player_weapons()[weaponID()] ?? {
    star: 0,
    extra_star_exp: 0
  });
  weaponUnlocked = libs.createMemo(() => (weaponServiceData().star ?? 0) > 0);
  weaponEquipped = libs.createMemo(() => String(equipWeaponID()) == weaponID());
  cosmeticByType = libs.createMemo(() => {
    const result = {};
    for (const [cid, cosmeticData] of Object.entries(KeyValues.info_item_cosmetic)) {
      if (cosmeticPreviewType.includes(cosmeticData.type) && cosmeticData.model != undefined && (cosmeticData.hero_id == undefined || String(cosmeticData.hero_id) == String(previewHeroID()))) {
        if (result[cosmeticData.type] == undefined) {
          result[cosmeticData.type] = [];
        }
        result[cosmeticData.type].push(cosmeticData);
      }
    }
    return result;
  });
}
function getWeaponPrivilegeDescription(privilege, level = 1) {
  const privilegeData = KeyValues.privilege[privilege];
  if (!privilegeData || !privilegeData.AbilityValues) {
    return GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, "");
  }
  const abilityValues = {};
  for (const key in privilegeData.AbilityValues) {
    if (key.startsWith("desc_key")) continue;
    abilityValues[key] = privilegeData.AbilityValues[key];
  }
  const upgradeKeys = privilegeData.AbilityValues["desc_key"] !== undefined ? String(privilegeData.AbilityValues["desc_key"]).split(" ") : [];
  for (const upgradeKey of upgradeKeys) {
    const abilityUpgradeData = KeyValues.ability_upgrades_service[upgradeKey];
    const upgradeValue = abilityUpgradeData?.AbilityValues;
    if (!upgradeValue) continue;
    for (const key in upgradeValue) {
      abilityValues[key] = upgradeValue[key];
    }
  }
  return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, ""), abilityValues, {
    level
  });
}
function getWeaponSoulDescription(weapon, star) {
  if (weapon == undefined || star <= 0) {
    return GetLocalization("#Weapon_NoAttributeEffect", "");
  }
  const result = [];
  const effectData = weapon["star_effect" + star];
  for (const [attribute, value] of Object.entries(effectData ?? {})) {
    result.push(GetPropertyLocalization(attribute, value));
  }
  const privilegeData = weapon["star_privilege" + star];
  for (const privilege of privilegeData ? privilegeData.split("|").filter(Boolean) : []) {
    const desc = getWeaponPrivilegeDescription(privilege);
    if (desc) {
      result.push(desc);
    }
  }
  return result.length > 0 ? result.join("<br>") : GetLocalization("#Weapon_NoAttributeEffect", "");
}
function isCosmeticEquippedOnPreview(cid) {
  const cosmeticKV = KeyValues.info_item_cosmetic[String(cid)];
  if (cosmeticKV == undefined) return false;
  const isPlayerCosmetic = cosmeticKV.type == COSMETIC_TYPE.BORDER || cosmeticKV.type == COSMETIC_TYPE.TITLE || cosmeticKV.type == COSMETIC_TYPE.MEDAL;
  if (!isPlayerCosmetic && previewHeroID() == undefined) return false;
  const equips = player_cosmetic_equips();
  const targetID = String(cid);
  for (const [key, equip] of Object.entries(equips)) {
    if (String(equip.cosmetic_id) != targetID) continue;
    if (isPlayerCosmetic || equip.hero_id == previewHeroID()) {
      return true;
    }
  }
  return false;
}
function previewFakeCosmetic(targetID) {
  const cosmeticInfo = KeyValues.info_item_cosmetic[targetID];
  if (cosmeticInfo == undefined || !fakePreviewType.includes(cosmeticInfo.type)) return;
  GameEvents.SendCustomEventToServer("fake_cosmetic_preview_cosmetic", {
    playerID: Players.GetLocalPlayer(),
    cosmeticID: Number(targetID)
  });
}
let heroPreviewScene;
function restoreEquippedCosmetics() {
  if (heroPreviewScene == undefined || !heroPreviewScene.IsValid()) return;
  const currentHeroID = previewHeroID();
  const allCosmetics = cosmeticByType();
  const equippedIDs = new Set();
  if (currentHeroID != undefined) {
    const equips = player_cosmetic_equips();
    for (const [key, equip] of Object.entries(equips)) {
      if (equip.hero_id == currentHeroID) {
        equippedIDs.add(String(equip.cosmetic_id));
      }
    }
  }
  for (const cosmetics of Object.values(allCosmetics)) {
    const displayableCosmetics = cosmetics.filter(isCosmeticDisplayable);
    const activeIDs = new Set(displayableCosmetics.filter(cosmetic => equippedIDs.has(String(cosmetic.id))).map(cosmetic => String(cosmetic.id)));
    if (activeIDs.size == 0) {
      const defaultItem = displayableCosmetics.find(cosmetic => cosmetic.default == 1);
      if (defaultItem != undefined) {
        activeIDs.add(String(defaultItem.id));
      }
    }
    for (const cosmetic of cosmetics) {
      const cid = String(cosmetic.id);
      heroPreviewScene.FireEntityInput(cid, activeIDs.has(cid) ? 'TurnOn' : 'TurnOff', '');
    }
  }
  const equippedEffects = {};
  if (currentHeroID != undefined) {
    const equips = player_cosmetic_equips();
    for (const [key, equip] of Object.entries(equips)) {
      if (equip.hero_id != currentHeroID) continue;
      const cosmeticInfo = KeyValues.info_item_cosmetic[String(equip.cosmetic_id)];
      if (cosmeticInfo == undefined || !isCosmeticDisplayable(cosmeticInfo)) continue;
      if (cosmeticInfo.type == COSMETIC_TYPE.FOOTPRINT_EFFECT || cosmeticInfo.type == COSMETIC_TYPE.AURA_EFFECT) {
        equippedEffects[cosmeticInfo.type] = cosmeticInfo;
      }
    }
  }
  const footInfo = equippedEffects[COSMETIC_TYPE.FOOTPRINT_EFFECT];
  if (footInfo != undefined) {
    heroPreviewScene.FireEntityInput("runner", 'TurnOn', '');
    heroPreviewScene.FireEntityInput('root', 'RunScriptCode', `SwitchToFoot('${footInfo.particle}')`);
  } else {
    heroPreviewScene.FireEntityInput("runner", 'TurnOff', '');
    heroPreviewScene.FireEntityInput('root', 'RunScriptCode', `SwitchToFoot()`);
  }
  const auraInfo = equippedEffects[COSMETIC_TYPE.AURA_EFFECT];
  if (auraInfo != undefined) {
    heroPreviewScene.FireEntityInput('root', 'RunScriptCode', `SwitchToAura('${auraInfo.particle}')`);
  } else {
    heroPreviewScene.FireEntityInput('root', 'RunScriptCode', `SwitchToAura()`);
  }
}
function restoreEquippedWeapon() {
  if (heroPreviewScene == undefined || !heroPreviewScene.IsValid()) return;
  const equippedWeaponID = String(equipWeaponID());
  const displayableWeaponIDs = new Set(displayableWeaponList());
  for (const wid of weaponList()) {
    const shouldEnable = wid == equippedWeaponID && displayableWeaponIDs.has(wid);
    heroPreviewScene.FireEntityInput(wid, shouldEnable ? 'TurnOn' : 'TurnOff', '');
  }
}
function previewWeapon(targetID) {
  if (heroPreviewScene == undefined || !heroPreviewScene.IsValid()) return;
  for (const wid of weaponList()) {
    heroPreviewScene.FireEntityInput(wid, wid == targetID ? 'TurnOn' : 'TurnOff', '');
  }
}
function equipCosmetic(targetID) {
  const cosmeticInfo = KeyValues.info_item_cosmetic[targetID];
  if (cosmeticInfo == undefined) return;
  if (fakePreviewType.includes(cosmeticInfo.type)) {
    previewFakeCosmetic(targetID);
    return;
  }
  if (heroPreviewScene == undefined || !heroPreviewScene.IsValid()) return;
  if (cosmeticInfo.type == COSMETIC_TYPE.FOOTPRINT_EFFECT) {
    heroPreviewScene.FireEntityInput("runner", 'TurnOn', '');
    heroPreviewScene.FireEntityInput('root', 'RunScriptCode', `SwitchToFoot('${cosmeticInfo.particle}')`);
    return;
  }
  if (cosmeticInfo.type == COSMETIC_TYPE.AURA_EFFECT) {
    heroPreviewScene.FireEntityInput('root', 'RunScriptCode', `SwitchToAura('${cosmeticInfo.particle}')`);
    return;
  }
  if (cosmeticInfo.type == COSMETIC_TYPE.MISC) {
    const equippedIDs = new Set();
    const equips = player_cosmetic_equips();
    for (const [key, equip] of Object.entries(equips)) {
      if (equip.hero_id == previewHeroID()) {
        const equippedCosmetic = KeyValues.info_item_cosmetic[String(equip.cosmetic_id)];
        if (equippedCosmetic != undefined && isCosmeticDisplayable(equippedCosmetic)) {
          equippedIDs.add(String(equip.cosmetic_id));
        }
      }
    }
    const typeCosmetics = cosmeticByType()[cosmeticInfo.type];
    if (typeCosmetics != undefined) {
      for (let i = 0; i < typeCosmetics.length; i++) {
        const cid = String(typeCosmetics[i].id);
        if (cid != targetID && !equippedIDs.has(cid)) {
          heroPreviewScene.FireEntityInput(cid, 'TurnOff', '');
        }
      }
    }
    heroPreviewScene.FireEntityInput(targetID, 'TurnOn', '');
  } else {
    const typeCosmetics = cosmeticByType()[cosmeticInfo.type];
    if (typeCosmetics != undefined) {
      for (let i = 0; i < typeCosmetics.length; i++) {
        heroPreviewScene.FireEntityInput(String(typeCosmetics[i].id), 'TurnOff', '');
      }
    }
    heroPreviewScene.FireEntityInput(targetID, 'TurnOn', '');
  }
}
function unequipCosmetic(targetID) {
  if (heroPreviewScene == undefined || !heroPreviewScene.IsValid()) return;
  heroPreviewScene.FireEntityInput(targetID, 'TurnOff', '');
}
function findUnusedMiscSlot() {
  const equips = player_cosmetic_equips();
  const heroID = previewHeroID();
  const usedSlots = new Set();
  for (const [key, equip] of Object.entries(equips)) {
    const slot = equip.slot_id;
    if (slot >= 101 && slot <= 200 && equip.hero_id == heroID) {
      usedSlots.add(slot);
    }
  }
  for (let slot = 101; slot <= 200; slot++) {
    if (!usedSlots.has(slot)) {
      return slot;
    }
  }
  return 0;
}
function findEquippedMiscSlot(cosmeticID) {
  const equips = player_cosmetic_equips();
  for (const [key, equip] of Object.entries(equips)) {
    const slot = equip.slot_id;
    if (slot >= 101 && slot <= 200 && equip.hero_id == previewHeroID() && String(equip.cosmetic_id) == cosmeticID) {
      return slot;
    }
  }
  return 0;
}
function restorePreviewScene() {
  restoreEquippedCosmetics();
  restoreEquippedWeapon();
  if (isHeroWeaponTab() && displayableWeaponList().includes(weaponID())) {
    previewWeapon(weaponID());
  }
}
function Cosmetic(props) {
  createCosmeticPageState();
  secondTabName$1 = props.secondTabName;
  const showHeroScopedControls = () => isCosmeticHeroMenu(props.menuName());
  const cosmeticList = libs.createMemo(() => {
    return Object.values(KeyValues.info_item_cosmetic).filter(v => v.type == secondTabName$1() && isCosmeticDisplayable(v) && (v.hero_id == undefined || String(v.hero_id) == String(previewHeroID()))).sort((a, b) => (b.default == 1 ? 1 : 0) - (a.default == 1 ? 1 : 0));
  });
  const hasDisplayableItem = libs.createMemo(() => {
    return isHeroWeaponTab() ? displayableWeaponList().length > 0 : cosmeticList().length > 0;
  });
  const leaveFakePreview = () => {
    if (wasInFakePreview) {
      GameEvents.SendCustomEventToServer("fake_cosmetic_preview_leave", {
        playerID: Players.GetLocalPlayer()
      });
      wasInFakePreview = false;
      lastPreviewHeroName = "";
    }
    CustomUIConfig.Camera.EnterDefaultState({
      forceTargetPosition: true
    });
  };
  libs.createEffect(() => {
    $.GetContextPanel().SetHasClass("FakePreview", fakePreviewType.includes(secondTabName$1()));
  });
  libs.createEffect(() => {
    if (!props.show()) {
      cosmeticUnreadIds.submitReadCache();
      leaveFakePreview();
      return;
    }
    const isFake = fakePreviewType.includes(secondTabName$1()) && hasDisplayableItem();
    const currentHeroName = previewHeroName();
    if (isFake) {
      if (!wasInFakePreview || currentHeroName !== lastPreviewHeroName) {
        const localPlayer = Players.GetLocalPlayer();
        const playerIndex = localPlayer % 4;
        const baseX = -15680;
        const baseY = -15808;
        const baseZ = 128;
        const spacingX = 1344;
        CustomUIConfig.Camera.EnterFollowPosition({
          position: [baseX + playerIndex * spacingX, baseY, baseZ]
        });
        GameEvents.SendCustomEventToServer("fake_cosmetic_preview_enter", {
          playerID: localPlayer,
          heroName: currentHeroName
        });
        wasInFakePreview = true;
        lastPreviewHeroName = currentHeroName;
      }
    } else if (wasInFakePreview) {
      leaveFakePreview();
    }
  });
  libs.createEffect(() => {
    if (!props.show() || !wasInFakePreview || !fakePreviewType.includes(secondTabName$1()) || !hasDisplayableItem()) return;
    previewHeroName();
    previewFakeCosmetic(cosmeticID());
  });
  libs.onCleanup(() => {
    cosmeticUnreadIds.submitReadCache();
    $.GetContextPanel().SetHasClass("FakePreview", false);
    leaveFakePreview();
  });
  const heroCosmeticRedPoints = libs.createMemo(() => {
    const cosmetics = player_cosmetics();
    const unreads = cosmeticUnreadIds.unreadIds();
    const result = {};
    for (const id in unreads) {
      if (cosmetics[id] == undefined || !cosmeticUnreadIds.isUnread(id)) continue;
      const cosmeticInfo = KeyValues.info_item_cosmetic[id];
      if (cosmeticInfo == undefined || cosmeticInfo.type != secondTabName$1() || cosmeticInfo.hero_id == undefined) continue;
      result[String(cosmeticInfo.hero_id)] = true;
    }
    return result;
  });
  const isCosmeticEquipped = libs.createMemo(() => isCosmeticEquippedOnPreview(cosmeticID()));
  const accessDisplayMode = libs.createMemo(() => {
    if (shouldShowSignature()) return "signature";
    if (isHeroWeaponTab()) return "weapon";
    return "access";
  });
  const accessTitle = libs.createMemo(() => {
    switch (accessDisplayMode()) {
      case "signature":
        return GetLocalization("#Blessing_Sign");
      case "weapon":
        return GetLocalization("#Weapon_Soul_Effect");
      default:
        return GetLocalization("#Blessing_Access");
    }
  });
  const useSpecialEffectsBlessingImage = () => !isHeroWeaponTab() && fakePreviewType.includes(cosmeticData().type);
  const upgradeAttributeText = libs.createMemo(() => {
    if (isHeroWeaponTab()) return "";
    const parts = [];
    if (cosmeticData().type == COSMETIC_TYPE.MEDAL) {
      String(cosmeticData().attribute_equip ?? "").split("|").filter(Boolean).forEach(entry => {
        const [attribute, value] = entry.split(":");
        parts.push("<panel class='PropPoint'/>" + (value == undefined ? GetPrivilegeDesc(attribute) : GetPropertyLocalization(attribute, Number(value))));
      });
      return parts.join("<br>");
    }
    if (cosmeticData().attribute) {
      Object.entries(cosmeticData().attribute).forEach(([attribute, value]) => {
        parts.push("<panel class='PropPoint'/>" + GetPropertyLocalization(attribute, Number(value)));
      });
    }
    if (cosmeticData().effect) {
      String(cosmeticData().effect).split("|").forEach(effect => {
        parts.push("<panel class='PropPoint'/>" + GetPrivilegeDesc(effect));
      });
    }
    return parts.join("<br>");
  });
  const selectedWeaponName = libs.createMemo(() => {
    return weaponData() == undefined ? "" : "#" + weaponID();
  });
  const weaponSkillDesc = libs.createMemo(() => {
    const weapon = weaponData();
    const privilege = weapon?.weapon_effect;
    if (!privilege) {
      return GetLocalization("#Weapon_NoAbilityEffect", "");
    }
    const star = Math.max(1, Math.min(weaponServiceData().star ?? 0, maxWeaponStar));
    let desc = getWeaponPrivilegeDescription(privilege, star);
    if (!weaponUnlocked()) {
      desc = `${desc}<font color='#999999'>(${GetLocalization("#Weapon_NoAbilityUnlockTips", "")})</font>`;
    }
    return desc;
  });
  const weaponSoulRows = libs.createMemo(() => {
    const weapon = weaponData();
    const result = [];
    for (let star = 1; star <= maxWeaponStar; star++) {
      result.push({
        star,
        desc: getWeaponSoulDescription(weapon, star)
      });
    }
    return result;
  });
  libs.createEffect(() => {
    if (isHeroWeaponTab()) return;
    const list = cosmeticList();
    restorePreviewScene();
    if (list.length > 0) {
      const equippedItem = list.find(item => isCosmeticEquippedOnPreview(item.id));
      const targetItem = equippedItem ?? list.find(item => item.default == 1) ?? list.find(item => player_cosmetics()[item.id]?.permanent) ?? list[0];
      if (targetItem) {
        setCosmeticID(targetItem.id.toString());
      }
      setEquipDefault(!list.some(item => {
        return isCosmeticEquippedOnPreview(item.id);
      }));
    }
  });
  libs.createEffect(() => {
    if (!isHeroWeaponTab()) return;
    const list = displayableWeaponList();
    if (list.length == 0) {
      restorePreviewScene();
      return;
    }
    const equippedWeaponID = String(equipWeaponID());
    const selectedWeaponID = list.includes(equippedWeaponID) ? equippedWeaponID : list[0];
    setWeaponID(selectedWeaponID);
    previewWeapon(selectedWeaponID);
  });
  const OnSceneReady = () => {
    $.Schedule(0.1, () => {
      restorePreviewScene();
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "Cosmetic"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "MainContent"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "CenterSide"
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "CosmeticPreviewContainer"
      }, _el$3),
      _el$6 = libs.createElement("Panel", {
        id: "CosmeticListContainer"
      }, _el$3),
      _el$7 = libs.createElement("Panel", {
        id: "CosmeticList",
        scroll: "x"
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "SwitchHair"
      }, _el$3);
      libs.createElement("Label", {
        text: "#SwitchHair"
      }, _el$8);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return showHeroScopedControls();
      },
      get children() {
        return libs.createComponent(hero_selection_bar.HeroSelectionBar, {
          get selecteHeroName() {
            return previewHeroName();
          },
          onchange: (heroName, heroID) => {
            setPreviewHeroName(heroName);
          },
          redPoints: heroCosmeticRedPoints
        });
      }
    }), _el$4);
    libs.insert(_el$4, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return libs.memo(() => !!hasDisplayableItem())() && secondTabName$1() == COSMETIC_TYPE.BORDER;
          },
          get children() {
            return libs.createComponent(Player.AvatarBorder, {
              "class": "Preview_AVATAR_BORDER",
              get borderid() {
                return cosmeticID();
              },
              get children() {
                const _el$5 = libs.createElement("DOTAAvatarImage", {
                  steamid: "local",
                  nocompendiumborder: true,
                  hittest: false,
                  hittestchildren: false
                }, null);
                libs.setProp(_el$5, "style", {
                  width: "48.04688%",
                  height: "48.04688%",
                  align: "center center",
                  borderRadius: "10%"
                });
                return _el$5;
              }
            });
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return libs.memo(() => !!hasDisplayableItem())() && secondTabName$1() == COSMETIC_TYPE.TITLE;
          },
          get children() {
            return libs.createComponent(Player.PlayerTitle, {
              "class": "Preview_AVATAR_NAME",
              get titleid() {
                return cosmeticID();
              }
            });
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return libs.memo(() => !!hasDisplayableItem())() && secondTabName$1() == COSMETIC_TYPE.MEDAL;
          },
          get children() {
            return libs.createComponent(Player.PlayerMedal, {
              "class": "Preview_MEDAL",
              get medalID() {
                return cosmeticID();
              }
            });
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return cosmeticPreviewType.includes(secondTabName$1()) || isHeroWeaponTab();
          },
          get children() {
            return libs.createComponent(solid_utils.DynamicKey, {
              key: () => `${previewHeroName()}|${shortHair()}`,
              children: () => libs.createComponent(CosmeticPreview, {
                get heroName() {
                  return previewHeroName();
                },
                get bodyGroup() {
                  return previewHeroName() == "npc_dota_hero_solthra" && shortHair() ? "hair" : undefined;
                },
                get bodyGroupChoice() {
                  return previewHeroName() == "npc_dota_hero_solthra" && shortHair() ? 1 : undefined;
                },
                sceneRef: scene => {
                  heroPreviewScene = scene;
                },
                sceneReady: scene => OnSceneReady()
              })
            });
          }
        })];
      }
    }));
    libs.setProp(_el$7, "scroll", "x");
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return isHeroWeaponTab();
      },
      get fallback() {
        return libs.createComponent(libs.For, {
          get each() {
            return cosmeticList();
          },
          children: item => libs.createComponent(CosmeticItem, item)
        });
      },
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return displayableWeaponList();
          },
          children: weaponID => libs.createComponent(WeaponCosmeticItem, {
            weaponID: weaponID
          })
        });
      }
    }));
    libs.insert(_el$8, libs.createComponent(EOM_Switch.EOM_Switch, {
      get defaultSelected() {
        return shortHair();
      },
      onchange: (self, check) => {
        setShortHair(check);
        Players.SetPlayerSetting("short_hair", check);
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return hasDisplayableItem();
      },
      get children() {
        const _el$0 = libs.createElement("Panel", {
            id: "CosmeticContent"
          }, null),
          _el$1 = libs.createElement("Label", {
            id: "BlessingName",
            get text() {
              return libs.memo(() => !!isHeroWeaponTab())() ? selectedWeaponName() : "#" + cosmeticID();
            }
          }, _el$0),
          _el$10 = libs.createElement("Panel", {
            id: "BlessingImageBG",
            get ["class"]() {
              return libs.classNames({
                SpecialEffects: useSpecialEffectsBlessingImage()
              });
            }
          }, _el$0),
          _el$11 = libs.createElement("Panel", {
            id: "AccessDivider"
          }, _el$0);
          libs.createElement("Image", {
            id: "LineLeft"
          }, _el$11);
          const _el$13 = libs.createElement("Label", {
            id: "AccessTitle",
            get text() {
              return isHeroWeaponTab() ? "#Weapon_Effect_Title" : "#Blessing_Effect";
            }
          }, _el$11);
          libs.createElement("Image", {
            id: "LineRight"
          }, _el$11);
          const _el$15 = libs.createElement("Panel", {
            id: "BlessingEffectBlock",
            scroll: "y",
            "class": "VerticalScrollStyle"
          }, _el$0),
          _el$17 = libs.createElement("Label", {
            id: "BlessingEffect",
            html: true,
            get text() {
              return libs.memo(() => !!isHeroWeaponTab())() ? weaponSkillDesc() : upgradeAttributeText();
            }
          }, _el$15),
          _el$19 = libs.createElement("Panel", {
            height: "fill-parent-flow(1)"
          }, _el$0),
          _el$20 = libs.createElement("Panel", {
            id: "AccessDivider"
          }, _el$0);
          libs.createElement("Image", {
            id: "LineLeft"
          }, _el$20);
          const _el$22 = libs.createElement("Label", {
            id: "AccessTitle",
            get text() {
              return accessTitle();
            }
          }, _el$20);
          libs.createElement("Image", {
            id: "LineRight"
          }, _el$20);
          const _el$24 = libs.createElement("Panel", {
            id: "AccessContent"
          }, _el$0);
        libs.insert(_el$10, libs.createComponent(libs.Show, {
          get when() {
            return isHeroWeaponTab();
          },
          get fallback() {
            return libs.createComponent(libs.Show, {
              get when() {
                return useSpecialEffectsBlessingImage();
              },
              get fallback() {
                return libs.createComponent(StoreItem.StoreItemImage, {
                  id: "BlessingIcon",
                  get itemid() {
                    return cosmeticID();
                  },
                  hideTips: true
                });
              },
              get children() {
                return [libs.createElement("Image", {
                  id: "BlessingSpecialEffectsFrame"
                }, null), libs.createComponent(StoreItem.StoreItemImage, {
                  id: "BlessingIcon",
                  get itemid() {
                    return cosmeticID();
                  },
                  hideTips: true
                })];
              }
            });
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return weaponData();
              },
              children: data => libs.createComponent(solid_utils.DynamicKey, {
                key: weaponID,
                children: () => libs.createComponent(weapon3DPreview.Weapon3DPreview, {
                  id: "BlessingWeaponPreview",
                  get model() {
                    return data().model;
                  },
                  get defaultConfig() {
                    return data().hero;
                  }
                })
              })
            });
          }
        }));
        libs.setProp(_el$15, "scroll", "y");
        libs.insert(_el$15, libs.createComponent(libs.Show, {
          get when() {
            return libs.memo(() => !!!isHeroWeaponTab())() && cosmeticData().type == COSMETIC_TYPE.MEDAL;
          },
          get children() {
            const _el$16 = libs.createElement("Label", {
              id: "MedalEquipEffectOnly",
              get text() {
                return GetLocalization("#Cosmetic_EquipEffectOnly");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$16, "text", GetLocalization("#Cosmetic_EquipEffectOnly"), _$p));
            return _el$16;
          }
        }), _el$17);
        libs.insert(_el$0, libs.createComponent(libs.Show, {
          get when() {
            return accessDisplayMode() === "signature";
          },
          get children() {
            const _el$18 = libs.createElement("Label", {
              id: "Signature",
              get text() {
                return GetLocalization(`#${cosmeticID()}_Signature`);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$18, "text", GetLocalization(`#${cosmeticID()}_Signature`), _$p));
            return _el$18;
          }
        }), _el$19);
        libs.setProp(_el$19, "height", "fill-parent-flow(1)");
        libs.insert(_el$24, libs.createComponent(libs.Switch, {
          get fallback() {
            return (() => {
              const _el$31 = libs.createElement("Label", {
                id: "AccessDesc",
                get text() {
                  return GetLocalization(`#${cosmeticID()}_Access`);
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$31, "text", GetLocalization(`#${cosmeticID()}_Access`), _$p));
              return _el$31;
            })();
          },
          get children() {
            return [libs.createComponent(libs.Match, {
              get when() {
                return accessDisplayMode() === "signature";
              },
              get children() {
                const _el$25 = libs.createElement("Panel", {
                    id: "AccessOwnerName"
                  }, null);
                  libs.createElement("DOTAParticleScenePanel", {
                    "class": "AccessOwnerParticle",
                    particleName: "particles/ui/game/ui_fx_qianming_fx.vpcf",
                    cameraOrigin: "0 0 220",
                    lookAt: "0 0 0",
                    fov: 60,
                    hittest: false,
                    squarePixels: true,
                    particleonly: true
                  }, _el$25);
                  const _el$27 = libs.createElement("Label", {
                    id: "AccessSignature",
                    get text() {
                      return `${GetLocalization(`#${cosmeticID()}`)}——${Game.GetLocalPlayerInfo()?.player_name ?? ""}`;
                    }
                  }, _el$25);
                libs.effect(_$p => libs.setProp(_el$27, "text", `${GetLocalization(`#${cosmeticID()}`)}——${Game.GetLocalPlayerInfo()?.player_name ?? ""}`, _$p));
                return _el$25;
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return accessDisplayMode() === "weapon";
              },
              get children() {
                const _el$28 = libs.createElement("Panel", {
                    id: "WeaponDetailAttributeViewport"
                  }, null),
                  _el$29 = libs.createElement("Panel", {
                    id: "WeaponDetailAttributeList"
                  }, _el$28);
                libs.insert(_el$29, libs.createComponent(libs.For, {
                  get each() {
                    return weaponSoulRows();
                  },
                  children: row => {
                    const active = libs.createMemo(() => (weaponServiceData().star ?? 0) >= row.star);
                    const currentWeaponStar = () => weaponServiceData().star ?? 0;
                    return (() => {
                      const _el$32 = libs.createElement("Panel", {
                          "class": "AttributeRow"
                        }, null),
                        _el$33 = libs.createElement("Panel", {
                          "class": "AttributeRowHeader"
                        }, _el$32),
                        _el$34 = libs.createElement("Panel", {
                          "class": "AttributeRowStars"
                        }, _el$33),
                        _el$35 = libs.createElement("Label", {
                          "class": "AttributeRowTitle",
                          get text() {
                            return libs.memo(() => currentWeaponStar() >= row.star)() ? `${row.star}${GetLocalization("#ShowRoom_StarSuffix")}` : `${row.star}${GetLocalization("#ShowRoom_StarNoActivated")}`;
                          }
                        }, _el$33),
                        _el$36 = libs.createElement("Label", {
                          "class": "AttributeRowDesc",
                          html: true,
                          get text() {
                            return row.desc;
                          }
                        }, _el$32);
                      libs.insert(_el$34, libs.createComponent(libs.For, {
                        get each() {
                          return Array.from({
                            length: row.star
                          });
                        },
                        children: (_, starIndex) => (() => {
                          const _el$37 = libs.createElement("Panel", {
                            "class": "AttributeRowIcon"
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$37, "classList", {
                            RowActivated: active(),
                            PartialActivated: !active() && starIndex() < currentWeaponStar()
                          }, _$p));
                          return _el$37;
                        })()
                      }));
                      libs.effect(_p$ => {
                        const _v$7 = {
                            Active: active()
                          },
                          _v$8 = libs.memo(() => currentWeaponStar() >= row.star)() ? `${row.star}${GetLocalization("#ShowRoom_StarSuffix")}` : `${row.star}${GetLocalization("#ShowRoom_StarNoActivated")}`,
                          _v$9 = row.desc;
                        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$32, "classList", _v$7, _p$._v$7));
                        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$35, "text", _v$8, _p$._v$8));
                        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$36, "text", _v$9, _p$._v$9));
                        return _p$;
                      }, {
                        _v$7: undefined,
                        _v$8: undefined,
                        _v$9: undefined
                      });
                      return _el$32;
                    })();
                  }
                }));
                return _el$28;
              }
            })];
          }
        }));
        libs.insert(_el$0, libs.createComponent(libs.Show, {
          get when() {
            return isHeroWeaponTab();
          },
          get fallback() {
            return libs.createComponent(EOM_Button.EOM_Button, {
              id: "CosmeticAction",
              get enabled() {
                return serviceCosmeticInfo() != undefined || cosmeticData().default == 1 && !equipDefault();
              },
              get text() {
                return isCosmeticEquipped() ? "#Cosmetic_Unequip" : "#Cosmetic_Equip";
              },
              onactivate: () => {
                const isMisc = cosmeticData().type == COSMETIC_TYPE.MISC;
                const isPlayerCosmetic = cosmeticData().type == COSMETIC_TYPE.BORDER || cosmeticData().type == COSMETIC_TYPE.TITLE || cosmeticData().type == COSMETIC_TYPE.MEDAL;
                if (cosmeticData().default == 1 || isCosmeticEquipped()) {
                  CallAction("/v1/cosmetic/equip", {
                    slot_id: isMisc ? findEquippedMiscSlot(cosmeticID()) : COSMETIC_SLOT[cosmeticData().type],
                    cosmetic_id: 0,
                    ...(!isPlayerCosmetic && {
                      hero_id: previewHeroID()
                    })
                  });
                  unequipCosmetic(cosmeticID());
                } else {
                  CallAction("/v1/cosmetic/equip", {
                    slot_id: isMisc ? findUnusedMiscSlot() : COSMETIC_SLOT[cosmeticData().type],
                    cosmetic_id: Number(cosmeticID()),
                    ...(!isPlayerCosmetic && {
                      hero_id: previewHeroID()
                    })
                  });
                  equipCosmetic(cosmeticID());
                }
              }
            });
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_Button, {
              id: "CosmeticAction",
              get enabled() {
                return libs.memo(() => !!(previewHeroID() != undefined && weaponUnlocked() && !weaponEquipped()))() && !requestingWeaponEquip();
              },
              get text() {
                return libs.memo(() => !!weaponEquipped())() ? "#Weapon_Equipped" : weaponUnlocked() ? "#Weapon_Equip" : "#Weapon_NotObtained";
              },
              onactivate: () => {
                if (previewHeroID() == undefined || !weaponUnlocked() || weaponEquipped() || requestingWeaponEquip()) return;
                setRequestingWeaponEquip(true);
                Game.EmitSound("ui.inv_equip_metalblade");
                CallActionRequest("/v1/hero/equip_weapon", {
                  hero_id: previewHeroID(),
                  weapon_id: toFiniteNumber(weaponID())
                }, () => {
                  setRequestingWeaponEquip(false);
                });
              }
            });
          }
        }), null);
        libs.effect(_p$ => {
          const _v$ = {
              WeaponContent: isHeroWeaponTab()
            },
            _v$2 = libs.memo(() => !!isHeroWeaponTab())() ? selectedWeaponName() : "#" + cosmeticID(),
            _v$3 = libs.classNames({
              SpecialEffects: useSpecialEffectsBlessingImage()
            }),
            _v$4 = isHeroWeaponTab() ? "#Weapon_Effect_Title" : "#Blessing_Effect",
            _v$5 = libs.memo(() => !!isHeroWeaponTab())() ? weaponSkillDesc() : upgradeAttributeText(),
            _v$6 = accessTitle();
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$0, "classList", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "class", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$13, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$17, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$22, "text", _v$6, _p$._v$6));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined,
          _v$6: undefined
        });
        return _el$0;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$8, "visible", showHeroScopedControls() && previewHeroName() == "npc_dota_hero_solthra", _$p));
    return _el$;
  })();
}
function CosmeticItem(props) {
  const unlock = libs.createMemo(() => {
    return player_cosmetics()[props.id] != undefined || props.default == 1;
  });
  const equipped = libs.createMemo(() => {
    if (props.default == 1) {
      return equipDefault();
    } else {
      return isCosmeticEquippedOnPreview(props.id);
    }
  });
  const icon = () => {
    if (secondTabName$1() == "AVATAR_MEDAL") {
      const language = Language();
      if (language != "schinese") {
        return getSrcPath(`store_items/${language}/${props.id}.png`);
      }
    }
    return getSrcPath("store_items/" + props.id + ".png");
  };
  const useSpecialEffectsImage = () => fakePreviewType.includes(props.type);
  const selected = libs.createMemo(() => cosmeticID() == props.id.toString());
  const isNew = () => unlock() && cosmeticUnreadIds.isUnread(props.id);
  return libs.createComponent(CosmeticItemContainer, {
    get ["class"]() {
      return libs.classNames("Rarity" + props.rarity, [secondTabName$1()]);
    },
    onactivate: p => {
      cosmeticUnreadIds.markRead(props.id);
      setCosmeticID(props.id.toString());
      equipCosmetic(props.id.toString());
    },
    get selected() {
      return selected();
    },
    get children() {
      const _el$38 = libs.createElement("Panel", {
          "class": "CosmeticItem"
        }, null);
        libs.createElement("Image", {
          id: "CosmeticItemBG"
        }, _el$38);
        const _el$40 = libs.createElement("Label", {
          id: "CosmeticItemName",
          get text() {
            return "#" + props.id;
          }
        }, _el$38);
      libs.insert(_el$38, libs.createComponent(libs.Show, {
        get when() {
          return useSpecialEffectsImage();
        },
        get fallback() {
          return (() => {
            const _el$46 = libs.createElement("Image", {
              id: "CosmeticItemImage",
              get src() {
                return icon();
              },
              scaling: "stretch-to-cover-preserve-aspect"
            }, null);
            libs.effect(_$p => libs.setProp(_el$46, "src", icon(), _$p));
            return _el$46;
          })();
        },
        get children() {
          const _el$41 = libs.createElement("Panel", {
              id: "SpecialEffectsImagePanel"
            }, null);
            libs.createElement("Image", {
              id: "SpecialEffectsFrame"
            }, _el$41);
            const _el$43 = libs.createElement("Image", {
              id: "CosmeticItemImage",
              get src() {
                return icon();
              },
              scaling: "stretch-to-cover-preserve-aspect"
            }, _el$41);
          libs.effect(_$p => libs.setProp(_el$43, "src", icon(), _$p));
          return _el$41;
        }
      }), null);
      libs.insert(_el$38, libs.createComponent(libs.Switch, {
        get fallback() {
          return libs.createElement("Image", {
            id: "CosmeticLock"
          }, null);
        },
        get children() {
          return libs.createComponent(libs.Match, {
            get when() {
              return unlock();
            },
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return equipped();
                },
                get children() {
                  return libs.createElement("Image", {
                    id: "EquippedIcon"
                  }, null);
                }
              });
            }
          });
        }
      }), null);
      libs.insert(_el$38, libs.createComponent(libs.Show, {
        get when() {
          return props.hide == 1;
        },
        get children() {
          return libs.createElement("Label", {
            id: "ToolOnly",
            text: "ToolOnly"
          }, null);
        }
      }), null);
      libs.insert(_el$38, libs.createComponent(libs.Show, {
        get when() {
          return isNew();
        },
        get children() {
          return libs.createComponent(EOM_RedMark.EOM_RedMark, {
            type: "new",
            hittest: false
          });
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$40, "text", "#" + props.id, _$p));
      return _el$38;
    }
  });
}
function WeaponCosmeticItem(props) {
  const weapon = () => KeyValues.weapon[props.weaponID];
  const unlock = libs.createMemo(() => (player_weapons()[props.weaponID]?.star ?? 0) > 0);
  const equipped = libs.createMemo(() => String(equipWeaponID()) == props.weaponID);
  const selected = libs.createMemo(() => weaponID() == props.weaponID);
  return libs.createComponent(CosmeticItemContainer, {
    get ["class"]() {
      return libs.classNames("Rarity" + weapon().rarity, HERO_WEAPON_CATEGORY);
    },
    onactivate: () => {
      setWeaponID(props.weaponID);
      previewWeapon(props.weaponID);
    },
    get selected() {
      return selected();
    },
    get children() {
      const _el$48 = libs.createElement("Panel", {
          "class": "CosmeticItem"
        }, null);
        libs.createElement("Image", {
          id: "CosmeticItemBG"
        }, _el$48);
        const _el$50 = libs.createElement("Label", {
          id: "CosmeticItemName",
          get text() {
            return "#" + props.weaponID;
          }
        }, _el$48);
      libs.insert(_el$48, libs.createComponent(StoreItem.StoreItemImage, {
        id: "CosmeticItemImage",
        get itemid() {
          return props.weaponID;
        }
      }), null);
      libs.insert(_el$48, libs.createComponent(libs.Switch, {
        get fallback() {
          return libs.createElement("Image", {
            id: "CosmeticLock"
          }, null);
        },
        get children() {
          return libs.createComponent(libs.Match, {
            get when() {
              return unlock();
            },
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return equipped();
                },
                get children() {
                  return libs.createElement("Image", {
                    id: "EquippedIcon"
                  }, null);
                }
              });
            }
          });
        }
      }), null);
      libs.insert(_el$48, libs.createComponent(libs.Show, {
        get when() {
          return weapon().in_tool == 1;
        },
        get children() {
          return libs.createElement("Label", {
            id: "ToolOnly",
            text: "ToolOnly"
          }, null);
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$50, "text", "#" + props.weaponID, _$p));
      return _el$48;
    }
  });
}
function CosmeticItemContainer(props) {
  const [local, others] = libs.splitProps(props, ["children", "class", "selected"]);
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(others, {
    get ["class"]() {
      return libs.classNames("CosmeticItemContainer", local.class, {
        Selected: local.selected
      });
    },
    get children() {
      return [libs.createComponent(libs.Show, {
        get when() {
          return local.selected;
        },
        get children() {
          return libs.createElement("DOTAParticleScenePanel", {
            id: "BorderParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
            cameraOrigin: "0 0 93",
            fov: 45,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, null);
        }
      }), libs.createElement("Image", {
        id: "HoverBorder"
      }, null), libs.memo(() => local.children)];
    }
  }));
}

function findDrawPoolByItem(itemId) {
  const drawcards = KeyValues.drawcards;
  if (drawcards == undefined) return undefined;
  for (const [poolId, config] of Object.entries(drawcards)) {
    if (String(config.item) === itemId) {
      return poolId;
    }
  }
  return undefined;
}
function jumpToDrawPool(propId) {
  const poolId = findDrawPoolByItem(propId);
  if (poolId == undefined) return;
  ToggleWindow("MenuButton_draw", true);
  ClientSideEvent("draw_select_pool", {
    poolID: poolId
  });
}
const propActions = {
  "110002": {
    label: "#StarStone",
    onUse: () => {
      ToggleWindow("MenuButton_draw", true);
      ClientSideEvent("draw_show_exchange_store", {});
    }
  },
  "110003": {
    label: "#Fish",
    onUse: () => JumpToMenu({
      window_name: "fishingitem",
      menu: "Fish",
      force: true
    })
  },
  "110004": {
    label: "#Fish",
    onUse: () => JumpToMenu({
      window_name: "fishingitem",
      menu: "Fish",
      force: true
    })
  },
  "110005": {
    label: "#Explore",
    onUse: () => ClientSideEvent("toggle_window_tag", {
      window_name: "HudExplore",
      menu: "Explore",
      force: true
    })
  },
  "110007": {
    label: "#Flowers",
    onUse: () => JumpToMenu({
      window_name: "task_board",
      menu: "Flowers",
      force: true
    })
  },
  "120006": {
    label: "#Talent_Menu",
    onUse: () => JumpToMenu({
      window_name: "profile",
      menu: "Talent_Menu",
      force: true
    })
  },
  "120007": {
    label: "#Talent_Menu",
    onUse: () => JumpToMenu({
      window_name: "profile",
      menu: "Talent_Menu",
      force: true
    })
  },
  "120012": {
    label: "#HeroTalent_Menu",
    onUse: () => ShowPopup("HeroTalent", {
      group: "HeroTalent",
      heroName: "npc_dota_hero_vexis"
    })
  },
  "120013": {
    label: "#HeroTalent_Menu",
    onUse: () => ShowPopup("HeroTalent", {
      group: "HeroTalent",
      heroName: "npc_dota_hero_vexis"
    })
  },
  "190001": {
    label: "#Draw_PoolName_2001",
    onUse: propId => jumpToDrawPool(propId)
  },
  "190002": {
    label: "#Draw_PoolName_2002",
    onUse: propId => jumpToDrawPool(propId)
  },
  "190003": {
    label: "#Draw_PoolName_2003",
    onUse: propId => jumpToDrawPool(propId)
  },
  "190004": {
    label: "#Draw_PoolName_2004",
    onUse: propId => jumpToDrawPool(propId)
  },
  "190005": {
    label: "#Draw_PoolName_2101",
    onUse: propId => jumpToDrawPool(propId)
  },
  "190006": {
    label: "#Draw_PoolName_2201",
    onUse: propId => jumpToDrawPool(propId)
  }
};

const isCurrencyID = id => {
  const value = String(id);
  return value.startsWith("11") || value.startsWith("12") || value.startsWith("19");
};
const propsFilterTabs = [{
  label: "#PropType_All",
  filter: "all",
  dotColor: "#8aa4c4"
}, {
  label: "#PropType_Chest",
  filter: "chest",
  dotColor: "#f3b664"
}, {
  label: "#PropType_Token",
  filter: "currency",
  dotColor: "#59d0d5"
}, {
  label: "#PropType_BattlePass",
  filter: "battlepass",
  dotColor: "#c484e4"
}];
const Props = () => {
  const player_props = solid_utils.createServiceNetData("player_props", {});
  const player_tokens = solid_utils.createServiceNetData("player_tokens", {});
  const player_battle_passes = solid_utils.createServiceNetData("player_battle_passes", {});
  const propUnreadIds = solid_utils.createPlayerUnreadIds("prop");
  const isPropNew = id => propUnreadIds.isUnread(id);
  const markPropRead = id => propUnreadIds.markRead(id);
  const [selectedID, SetSelectedID] = libs.createSignal();
  const [useCount, SetUseCount] = libs.createSignal(1);
  const [selectedFilter, setSelectedFilter] = libs.createSignal("all");
  const propsKeys = libs.createMemo(() => Object.keys(player_props()).filter(v => player_props()[v].amounts > 0));
  const currencyKeys = libs.createMemo(() => Object.keys(player_tokens()).filter(v => isCurrencyID(v) && (player_tokens()[v].amounts ?? 0) > 0));
  const chestKeys = libs.createMemo(() => propsKeys().filter(v => GetPropType(v) == PropType.Chest));
  const battlepassItemIds = libs.createMemo(() => {
    const bpData = player_battle_passes();
    const ids = new Set();
    for (const [season, info] of Object.entries(bpData)) {
      if (info.plus) {
        const plusItemId = KeyValues.bp_season[Number(season)]?.plus_item_id;
        if (plusItemId) {
          ids.add(String(plusItemId));
        }
      }
    }
    return ids;
  });
  const battlepassKeys = libs.createMemo(() => [...battlepassItemIds()]);
  const itemKeys = libs.createMemo(() => {
    const filter = selectedFilter();
    if (filter == "chest") {
      return chestKeys();
    }
    if (filter == "currency") {
      return currencyKeys();
    }
    if (filter == "battlepass") {
      return battlepassKeys();
    }
    return [...new Set(propsKeys().concat(currencyKeys()).concat(battlepassKeys()))];
  });
  const empty = libs.createMemo(() => itemKeys().length <= 0);
  const isSelectedCurrency = libs.createMemo(() => selectedID() != undefined && currencyKeys().includes(selectedID()));
  const getFilterCount = filter => {
    if (filter == "chest") {
      return chestKeys().length;
    }
    if (filter == "currency") {
      return currencyKeys().length;
    }
    if (filter == "battlepass") {
      return battlepassKeys().length;
    }
    return new Set([...propsKeys(), ...currencyKeys(), ...battlepassKeys()]).size;
  };
  const propsData = libs.createMemo(() => KeyValues.info_item_prop[selectedID() ?? ""]);
  const propsServiceData = libs.createMemo(() => {
    let propID = selectedID();
    if (propID != undefined) {
      return player_props()[propID];
    }
  });
  const selectedAmounts = libs.createMemo(() => {
    const id = selectedID();
    if (id == undefined) return 0;
    if (isSelectedCurrency()) {
      return player_tokens()[id]?.amounts ?? 0;
    }
    return propsServiceData()?.amounts ?? 0;
  });
  const selectedItemRarity = libs.createMemo(() => GetServiceItemRarity(selectedID()));
  const customAction = libs.createMemo(() => {
    const id = selectedID();
    if (id == undefined) return undefined;
    return propActions[id];
  });
  libs.onCleanup(propUnreadIds.submitReadCache);
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Props",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "PropsBlock"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "PropsListPanel"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "PropsFilterRow"
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "PropsFilterTabs"
        }, _el$3),
        _el$5 = libs.createElement("Panel", {
          id: "PropsDetail"
        }, _el$),
        _el$6 = libs.createElement("Label", {
          id: "PropsName",
          get text() {
            return GetLocalization("#" + selectedID(), "");
          },
          get ["class"]() {
            return "Rarity" + selectedItemRarity();
          }
        }, _el$5),
        _el$7 = libs.createElement("Panel", {
          id: "PropsImageBG"
        }, _el$5),
        _el$8 = libs.createElement("Panel", {
          id: "AccessDivider"
        }, _el$5);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$8);
        libs.createElement("Label", {
          id: "AccessTitle",
          text: "#Props_Effect"
        }, _el$8);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$8);
        const _el$10 = libs.createElement("Panel", {
          id: "PropsEffectBlock"
        }, _el$5),
        _el$11 = libs.createElement("Label", {
          id: "PropsEffect",
          html: true,
          get text() {
            return GetLocalization("#" + selectedID() + "_description", "");
          }
        }, _el$10),
        _el$12 = libs.createElement("Panel", {
          id: "AccessDivider",
          marginTop: "10px",
          marginBottom: "10px"
        }, _el$5);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$12);
        libs.createElement("Label", {
          id: "AccessTitle",
          text: "#Props_Action"
        }, _el$12);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$12);
      libs.insert(_el$4, libs.createComponent(libs.For, {
        each: propsFilterTabs,
        children: tab => libs.createComponent(EOM_FilterChip.EOM_FilterChip, {
          get selected() {
            return selectedFilter() === tab.filter;
          },
          get text() {
            return tab.label;
          },
          get count() {
            return getFilterCount(tab.filter);
          },
          get dotColor() {
            return tab.dotColor;
          },
          onactivate: () => setSelectedFilter(tab.filter)
        })
      }));
      libs.insert(_el$2, libs.createComponent(libs.Show, {
        get when() {
          return !empty();
        },
        get fallback() {
          return libs.createComponent(EmptyFallback, {});
        },
        get children() {
          return libs.createComponent(RecycleView.RecycleView, {
            id: "PropsList",
            input: itemKeys,
            direction: "VerticalGrid",
            childConfig: {
              width: 128,
              height: 128
            },
            grid_children: () => libs.createElement("Panel", {
              "class": "PropsGrid"
            }, null),
            children: prop_id => {
              const isCurrency = libs.createMemo(() => currencyKeys().includes(prop_id()));
              const amounts = libs.createMemo(() => {
                if (isCurrency()) return player_tokens()[prop_id()]?.amounts ?? 0;
                return player_props()[prop_id()]?.amounts ?? 0;
              });
              return (() => {
                const _el$17 = libs.createElement("Panel", {
                    "class": "PropBlock"
                  }, null),
                  _el$18 = libs.createElement("Panel", {
                    "class": "SelectedBorder",
                    hittest: false
                  }, _el$17);
                libs.setProp(_el$17, "onactivate", () => {
                  SetSelectedID(prop_id());
                  SetUseCount(Math.min(player_props()[prop_id()]?.amounts ?? 0, 200));
                });
                libs.setProp(_el$17, "onmouseover", () => {
                  if (!isCurrency()) {
                    markPropRead(prop_id());
                  }
                });
                libs.insert(_el$17, libs.createComponent(StoreItem.StoreItemBlock, {
                  get item_id() {
                    return prop_id();
                  },
                  get amounts() {
                    return amounts() ?? 1;
                  }
                }), _el$18);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return libs.memo(() => !!!isCurrency())() && isPropNew(prop_id());
                  },
                  get children() {
                    return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                      type: "new",
                      hittest: false
                    });
                  }
                }), null);
                libs.effect(_$p => libs.setProp(_el$17, "classList", {
                  Selected: selectedID() == prop_id(),
                  Currency: isCurrency()
                }, _$p));
                return _el$17;
              })();
            }
          });
        }
      }), null);
      libs.insert(_el$7, libs.createComponent(libs.Show, {
        get when() {
          return selectedID() != undefined;
        },
        get children() {
          return libs.createComponent(StoreItem.StoreItemImage, {
            id: "PropsIcon",
            get itemid() {
              return selectedID();
            }
          });
        }
      }));
      libs.setProp(_el$12, "marginTop", "10px");
      libs.setProp(_el$12, "marginBottom", "10px");
      libs.insert(_el$5, libs.createComponent(EOM_NumberAdjust.EOM_NumberAdjust, {
        get visible() {
          return libs.memo(() => !!(!isSelectedCurrency() && !customAction() && propsData()?.use_func != "pick"))() && selectedAmounts() > 1;
        },
        min: 1,
        get max() {
          return Math.min(selectedAmounts(), 200);
        },
        get effectValue() {
          return Math.min(selectedAmounts(), 200);
        },
        onChange: (_, v) => SetUseCount(v)
      }), null);
      libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_Button, {
        id: "UsePropButton",
        get enabled() {
          return libs.memo(() => !!(customAction() != undefined || !isSelectedCurrency() && propsData()?.use_func != undefined))() && selectedAmounts() > 0;
        },
        get text() {
          return customAction()?.label ?? "#ReviveCoin_Use";
        },
        onactivate: () => {
          const action = customAction();
          if (action) {
            action.onUse(selectedID());
            return;
          }
          if (isSelectedCurrency()) return;
          if (propsData() == undefined) return;
          if (propsData().use_func == "drop" || propsData().use_func == "all") {
            const amounts = selectedAmounts();
            const count = Math.min(useCount(), amounts, 200);
            if (count > 1) {
              CallAction("/v1/prop/batch_open", {
                prop_id: propsData().id,
                amounts: count
              });
            } else {
              CallAction("/v1/prop/open", {
                prop_id: propsData().id
              });
            }
          } else if (propsData().use_func == "pick") {
            ShowPopup("PropUse", {
              prop_id: propsData().id
            });
          }
        }
      }), null);
      libs.effect(_p$ => {
        const _v$ = GetLocalization("#" + selectedID(), ""),
          _v$2 = "Rarity" + selectedItemRarity(),
          _v$3 = GetLocalization("#" + selectedID() + "_description", "");
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "text", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "class", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$11, "text", _v$3, _p$._v$3));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined
      });
      return _el$;
    }
  });
};
const EmptyFallback = () => {
  return (() => {
    const _el$19 = libs.createElement("Panel", {
        id: "EmptyFallback"
      }, null);
      libs.createElement("Image", {}, _el$19);
      const _el$21 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "down"
      }, _el$19);
      libs.createElement("Label", {
        id: "Title",
        text: "#Props_EmptyFallbackTitle"
      }, _el$21);
      libs.createElement("Label", {
        id: "Desc",
        text: "#Props_EmptyFallback"
      }, _el$21);
    libs.setProp(_el$21, "align", "center center");
    libs.setProp(_el$21, "flowChildren", "down");
    return _el$19;
  })();
};

const MENU_LIST = {
  Props_Menu: [],
  Cosmetic_Hero: ["HERO_WEAPON", COSMETIC_TYPE.HEAD, COSMETIC_TYPE.SHOULDER, COSMETIC_TYPE.BACK, COSMETIC_TYPE.TAIL, COSMETIC_TYPE.WING, COSMETIC_TYPE.MISC, COSMETIC_TYPE.FOOTPRINT_EFFECT, COSMETIC_TYPE.AURA_EFFECT, COSMETIC_TYPE.ATTACK_EFFECT, COSMETIC_TYPE.SPECIAL_SKILL_EFFECT, COSMETIC_TYPE.DASH_SKILL_EFFECT, COSMETIC_TYPE.DEFENSE_SKILL_EFFECT, COSMETIC_TYPE.ULTIMATE_SKILL_EFFECT],
  Cosmetic_Player: [COSMETIC_TYPE.BORDER, COSMETIC_TYPE.TITLE, COSMETIC_TYPE.MEDAL]
};
const {
  LayoutMenu,
  show,
  secondTabName,
  menuName
} = EOM_MenuLayout.createMenuLayout("cosmetic", () => MENU_LIST);
function CosmeticRoot() {
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "CosmeticRoot",
    name: "MenuButton_cosmetic",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Props_Menu";
            },
            get children() {
              return libs.createComponent(Props, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Cosmetic_Hero" || menuName() == "Cosmetic_Player";
            },
            get children() {
              return libs.createComponent(Cosmetic, {
                show: show,
                menuName: menuName,
                secondTabName: secondTabName
              });
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(CosmeticRoot, {}), $.GetContextPanel());