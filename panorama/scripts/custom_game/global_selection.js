--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('global_selection', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const formatDateText = timestamp => {
  if (timestamp === undefined || !Number.isFinite(timestamp) || timestamp <= 0) {
    return "-";
  }
  const date = new Date(timestamp * 1000);
  if (!Number.isFinite(date.getTime())) return "-";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const PREVIEW_SELECTION_EVENT = "preview_selection_changed";
const previewSelectionSignals = {};
function getPreviewSelections() {
  if (CustomUIConfig.__previewSelections == undefined) {
    CustomUIConfig.__previewSelections = {};
  }
  return CustomUIConfig.__previewSelections;
}
function resolveDefaultValue(defaultValue) {
  if (typeof defaultValue == "function") {
    return defaultValue();
  }
  return defaultValue;
}
function getStorageValue(options) {
  if (options.persist === false || options.storageKey == undefined) {
    return undefined;
  }
  return CustomUIConfig.Storage.LoadData(options.storageKey, undefined);
}
function getCurrentPlayerHeroName() {
  const heroIndex = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
  if (heroIndex != undefined && Entities.IsValidEntity(heroIndex)) {
    const heroName = Entities.GetUnitName(heroIndex);
    if (heroName != undefined && heroName != "") {
      return heroName;
    }
  }
  return Object.keys(KeyValues.heroes)[0];
}
function getPreviewSelectionValue(key, options) {
  const selections = getPreviewSelections();
  const currentValue = selections[key];
  if (currentValue != undefined) {
    return currentValue;
  }
  const storageValue = getStorageValue(options);
  if (storageValue != undefined) {
    selections[key] = storageValue;
    return storageValue;
  }
  const defaultValue = resolveDefaultValue(options.defaultValue);
  selections[key] = defaultValue;
  return defaultValue;
}
function setPreviewSelectionValue(key, value, options) {
  const selections = getPreviewSelections();
  selections[key] = value;
  if (options.persist !== false && options.storageKey != undefined) {
    CustomUIConfig.Storage.SaveData(options.storageKey, value);
  }
  ClientSideEvent(PREVIEW_SELECTION_EVENT, {
    key,
    value
  });
  return value;
}
function createPreviewSelectionSignal(key, options) {
  const cachedSignal = previewSelectionSignals[key];
  if (cachedSignal != undefined) {
    return cachedSignal;
  }
  const initialValue = getPreviewSelectionValue(key, options);
  const [value, setValue] = libs.createSignal(initialValue);
  useClientSideEvent(PREVIEW_SELECTION_EVENT, payload => {
    if (payload.key == key) {
      setValue(() => payload.value);
    }
  });
  const setter = nextValue => {
    let resolvedValue;
    if (typeof nextValue == "function") {
      resolvedValue = nextValue(libs.untrack(value));
    } else {
      resolvedValue = nextValue;
    }
    setValue(resolvedValue);
    return setPreviewSelectionValue(key, resolvedValue, options);
  };
  const signal = [value, setter];
  previewSelectionSignals[key] = signal;
  return signal;
}
function createPreviewHeroNameSignal() {
  return createPreviewSelectionSignal("heroName", {
    defaultValue: getCurrentPlayerHeroName,
    storageKey: "preview_hero_name"
  });
}
function createPreviewWeaponIDSignal(defaultWeaponID = "1000001") {
  return createPreviewSelectionSignal("weaponID", {
    defaultValue: defaultWeaponID,
    storageKey: "preview_weapon_id"
  });
}
function createPreviewCourierIDSignal(defaultCourierID = "600001") {
  return createPreviewSelectionSignal("courierID", {
    defaultValue: defaultCourierID,
    storageKey: "preview_courier_id"
  });
}

exports.createPreviewCourierIDSignal = createPreviewCourierIDSignal;
exports.createPreviewHeroNameSignal = createPreviewHeroNameSignal;
exports.createPreviewWeaponIDSignal = createPreviewWeaponIDSignal;
exports.formatDateText = formatDateText;