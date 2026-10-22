--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var entry_range_inputs = require('./entry_range_inputs.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_CheckBox = require('./EOM_CheckBox.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_MultiDropDown = require('./EOM_MultiDropDown.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var hero_level_main = require('./hero_level_main.js');
var hero_selection_bar = require('./hero_selection_bar.js');
var Player = require('./Player.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var RecycleView = require('./RecycleView.js');
var equip_details = require('./equip_details.js');
var equipment_utils = require('./equipment_utils.js');
var huntloot_details = require('./huntloot_details.js');
var server_huntloot = require('./server_huntloot2.js');
var server_equipment = require('./server_equipment.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var global_selection = require('./global_selection.js');
var solid_utils = require('./solid_utils.js');
var EOM_Switch = require('./EOM_Switch.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var StoreItem = require('./StoreItem.js');
var equipment_comp = require('./equipment_comp.js');
var drawing_attr_row = require('./drawing_attr_row.js');
var server_equipment_drawing = require('./server_equipment_drawing.js');
var attribute_formatter = require('./attribute_formatter.js');
var server_dungeon_key = require('./server_dungeon_key.js');
var EOM_CostLabel = require('./EOM_CostLabel.js');
require('./EOMChildren.js');
require('./EOM_RedMark.js');
require('./EOM_HeroImage.js');
require('./EOM_Loading.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');

function SummarizeHuntlootAttributes(huntloots, partBonuses) {
  const adverb = new Map();
  const spell = new Map();
  const add = (target, id, baseValue, value, extraValue = 0) => {
    const previous = target.get(id);
    target.set(id, {
      id,
      base_value: (previous?.base_value ?? 0) + baseValue,
      value: (previous?.value ?? 0) + value,
      ...(previous?.extra_value != undefined || extraValue !== 0 ? {
        extra_value: (previous?.extra_value ?? 0) + extraValue
      } : {})
    });
  };
  for (const huntloot of huntloots) {
    const bonus = partBonuses[huntloot.huntloot_part] ?? 0;
    for (const entry of huntloot.adverb_entry_data ?? []) {
      const baseValue = toFiniteNumber(entry.base_value ?? entry.value, 0);
      const value = huntloot_details.HuntlootAttributeRound(entry.id, toFiniteNumber(entry.value, baseValue) + baseValue * bonus);
      add(adverb, entry.id, baseValue, value, toFiniteNumber(entry.extra_value, 0));
    }
    for (const entry of huntloot.spell_entry_data ?? []) {
      const value = toFiniteNumber(entry.value, 0);
      add(spell, entry.id, value, value);
    }
  }
  return {
    adverb: [...adverb.values()].filter(entry => entry.value !== 0 || (entry.extra_value ?? 0) !== 0),
    spell: [...spell.values()].filter(entry => entry.value !== 0)
  };
}

const RARITY_SETTING = KeyValues.equip_rarity_setting;
const BREAK_LEVEL_EXP = KeyValues.equip_break_level_exp;
const BREAK_ATTR_LIST = Object.values(BREAK_LEVEL_EXP);
const MAX_LEVEL = Object.keys(BREAK_LEVEL_EXP).length;
const EQUIPMENT_BREAK_KEY_TYPE = "equipment_break";
const EQUIPMENT_AUTO_BREAK_ENABLED_KEY = "equipment_auto_break_enabled";
const EQUIPMENT_AUTO_BREAK_CONFIG_KEY = "equipment_auto_break_config";
const NEEDLV_LIST$1 = Object.values(KeyValues.equip_class_setting).map(setting => setting.need_level);
const SUB_ENTRY_LIST = Object.values(KeyValues.equip_entry).filter(entry => entry.entry_type === 2).sort((a, b) => a.id - b.id);
const SUB_ENTRY_COMPARISONS = ["lt", "gt", "lte", "gte"];
const DEFAULT_AUTO_BREAK_CONFIG = {
  action: "break",
  needLevels: [],
  rarities: [],
  classes: [],
  suits: [],
  parts: [],
  includeSubEntries: [],
  subEntryMaxValues: {},
  subEntryComparisons: {}
};
const getEnabledFromText = value => value === "1";
const buildSelectedMap = values => {
  const map = {};
  for (const value of values ?? []) {
    map[String(value)] = true;
  }
  return map;
};
const normalizeAutoBreakNumbers = value => {
  if (value == undefined) return [];
  return [...new Set(value)];
};
const getSelectedNumbers = map => normalizeAutoBreakNumbers(Object.keys(map).filter(key => map[key]).map(Number));
const getSelectedStrings = map => Object.keys(map).filter(key => map[key]);
const hasInvalidAutoBreakNumbers = config => [config.needLevels, config.rarities, config.classes, config.parts].some(values => values !== undefined && (!Array.isArray(values) || values.some(value => typeof value !== "number" || !Number.isInteger(value) || value <= 0)));
const parseSubEntryNumber = value => {
  if (typeof value !== "number" && typeof value !== "string") return NaN;
  if (typeof value === "string" && value.trim() === "") return NaN;
  return toFiniteNumber(value, NaN);
};
const normalizeSubEntryMaxValues = (value, included) => {
  const result = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  for (const id of included) {
    const raw = value[id];
    if (raw === undefined) continue;
    result[id] = typeof raw === "number" && Number.isFinite(raw) ? raw : "invalid";
  }
  return result;
};
const getSubEntryMaxValuesFromText = (values, included) => {
  const result = {};
  for (const id of included) {
    const text = values[id]?.trim() ?? "";
    if (text === "") continue;
    const value = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text) ? Number(text) : NaN;
    result[id] = Number.isFinite(value) ? value : "invalid";
  }
  return result;
};
const normalizeSubEntryComparisons = (value, included, action) => {
  const result = {};
  for (const id of included) {
    const raw = value && typeof value === "object" && !Array.isArray(value) ? value[id] : undefined;
    result[id] = raw === undefined ? action === "keep" ? "gte" : "lte" : SUB_ENTRY_COMPARISONS.includes(raw) ? raw : "invalid";
  }
  return result;
};
const matchesSubEntryValue = (entry, limit, comparison) => {
  const value = parseSubEntryNumber(entry.base_value);
  if (typeof limit !== "number" || !Number.isFinite(limit) || !Number.isFinite(value)) return undefined;
  switch (comparison) {
    case "lt":
      return value < limit;
    case "gt":
      return value > limit;
    case "lte":
      return value <= limit;
    case "gte":
      return value >= limit;
    default:
      return undefined;
  }
};
const equipmentHasGemEffect$1 = equipment => {
  if (!equipment?.inlay_gems_data) return false;
  const gemSlots = JSON.parseSafe(equipment.inlay_gems_data);
  return Array.isArray(gemSlots) && gemSlots.some(gem => gem?.gem_item_id != undefined);
};
const getAutoBreakConfigFromText = value => {
  if (!value) return DEFAULT_AUTO_BREAK_CONFIG;
  const parsed = JSON.parseSafe(value);
  if (!parsed) return DEFAULT_AUTO_BREAK_CONFIG;
  if (hasInvalidAutoBreakNumbers(parsed)) {
    ErrorMessage(GetLocalization("#Equipment_AutoBreakConfigInvalid"));
    return DEFAULT_AUTO_BREAK_CONFIG;
  }
  const includeSubEntries = Array.isArray(parsed.includeSubEntries) ? parsed.includeSubEntries.map(String).filter(value => value != "") : [];
  return {
    action: parsed.action === "keep" ? "keep" : "break",
    needLevels: normalizeAutoBreakNumbers(parsed.needLevels),
    rarities: normalizeAutoBreakNumbers(parsed.rarities),
    classes: normalizeAutoBreakNumbers(parsed.classes),
    suits: Array.isArray(parsed.suits) ? parsed.suits.map(String).filter(value => value != "") : [],
    parts: normalizeAutoBreakNumbers(parsed.parts),
    includeSubEntries,
    subEntryMaxValues: normalizeSubEntryMaxValues(parsed.subEntryMaxValues, includeSubEntries),
    subEntryComparisons: normalizeSubEntryComparisons(parsed.subEntryComparisons, includeSubEntries, parsed.action === "keep" ? "keep" : "break")
  };
};
const EquipBreak = () => {
  const store = equipment_comp.useEquipmentStore();
  store.draggedSlot;
  const player_equipments = () => store.player_equipments();
  const player_gems = equipment_utils.GetSimplifyGems();
  const player_huntloots = huntloot_details.GetSimplifyHuntloots();
  const [selectedItemList, setSelectedItemList] = store.selectedItemList;
  const [selectSlot, setSelectSlot] = store.selectBreakSlot;
  const [showSelectedItems, setShowSelectedItems] = store.breakListMode;
  const [hiddenItemList, setItemListIsHidden] = store.hiddenItemList;
  const [selectedItemTab, setSelectedItemTab] = store.selectedItemTab;
  const isGemMode = () => selectedItemTab() === "gem";
  const isHuntlootMode = () => selectedItemTab() === "huntloot";
  const tooltipType = () => isHuntlootMode() ? "server_huntloot" : isGemMode() ? "server_gem" : "server_equip";
  const [breakingHuntloots, setBreakingHuntloots] = libs.createSignal(false);
  const selectedItems = libs.createMemo(() => selectedItemList().filter(id => id != null));
  const selectedCount = libs.createMemo(() => selectedItems().length);
  const selectionLimit = () => showSelectedItems() ? equipment_comp.MAX_BREAK_SELECT_NUM : equipment_comp.BREAK_SLOT_NUM;
  const [fastAddRarity, setFastAddRarity] = libs.createSignal(0);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const [addedExp, setAddedExp] = libs.createSignal(0);
  const [addedLv, setAddedLv] = libs.createSignal(0);
  const [showAutoBreakWindow, setShowAutoBreakWindow] = libs.createSignal(false);
  const [autoBreakEnabled, setAutoBreakEnabled] = libs.createSignal(false);
  const [autoBreakEnabledSaving, setAutoBreakEnabledSaving] = libs.createSignal(false);
  const [autoBreakAction, setAutoBreakAction] = libs.createSignal("break");
  const [autoBreakNeedLv, setAutoBreakNeedLv] = libs.createSignal({});
  const [autoBreakRarity, setAutoBreakRarity] = libs.createSignal({});
  const [autoBreakClass, setAutoBreakClass] = libs.createSignal({});
  const [autoBreakSuit, setAutoBreakSuit] = libs.createSignal({});
  const [autoBreakParts, setAutoBreakParts] = libs.createSignal({});
  const [autoBreakSubEntries, setAutoBreakSubEntries] = libs.createSignal({});
  const [autoBreakSubEntryLimits, setAutoBreakSubEntryLimits] = libs.createSignal({});
  const [autoBreakSubEntryComparisons, setAutoBreakSubEntryComparisons] = libs.createSignal({});
  const selectAutoBreakSubEntry = (id, selected) => libs.batch(() => {
    setAutoBreakSubEntries(prev => ({
      ...prev,
      [id]: selected
    }));
    if (selected && autoBreakSubEntryComparisons()[id] === undefined) {
      setAutoBreakSubEntryComparisons(prev => ({
        ...prev,
        [id]: autoBreakAction() === "keep" ? "gte" : "lte"
      }));
    }
  });
  const [autoBreakDetails, setAutoBreakDetails] = libs.createSignal({
    status: "idle",
    items: {}
  });
  libs.createEffect(libs.on(selectedItemTab, () => {
    libs.batch(() => {
      setSelectedItemList([]);
      setFastAddRarity(0);
      setShowAutoBreakWindow(false);
    });
  }, {
    defer: true
  }));
  let appliedAutoBreakConfigText;
  const player_account_levels = solid_utils.createServiceNetData("player_account_levels", {
    "equip_break_level": {
      level: 0,
      extra_exp: 0
    }
  });
  const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
  const applyAutoBreakEnabled = enabled => {
    if (autoBreakEnabled() === enabled) return;
    setAutoBreakEnabled(enabled);
    GameEvents.SendCustomEventToServer("equipment_auto_break_intent", {
      enabled: enabled ? 1 : 0
    });
  };
  const currentLv = libs.createMemo(() => {
    const lv = player_account_levels().equip_break_level.level;
    return lv;
  });
  const getBreakWindowClass = libs.createMemo(() => {
    const lv = currentLv();
    if (lv < 10) {
      return "Level_1_9";
    } else if (lv < 20) {
      return "Level_10_19";
    } else {
      return "Level_20";
    }
  });
  libs.createEffect(libs.on([selectSlot, showAutoBreakWindow, showSelectedItems], ([slot, showingAutoBreakWindow, showingSelectedItems]) => {
    setItemListIsHidden(showingAutoBreakWindow || !showingSelectedItems && slot == -1);
  }));
  const getCurrentAutoBreakConfig = () => ({
    action: autoBreakAction(),
    needLevels: getSelectedNumbers(autoBreakNeedLv()),
    rarities: getSelectedNumbers(autoBreakRarity()),
    classes: getSelectedNumbers(autoBreakClass()),
    suits: getSelectedStrings(autoBreakSuit()),
    parts: getSelectedNumbers(autoBreakParts()),
    includeSubEntries: getSelectedStrings(autoBreakSubEntries()),
    subEntryMaxValues: getSubEntryMaxValuesFromText(autoBreakSubEntryLimits(), getSelectedStrings(autoBreakSubEntries())),
    subEntryComparisons: normalizeSubEntryComparisons(autoBreakSubEntryComparisons(), getSelectedStrings(autoBreakSubEntries()), autoBreakAction())
  });
  const applyAutoBreakConfig = config => {
    setAutoBreakAction(config.action);
    setAutoBreakNeedLv(buildSelectedMap(config.needLevels));
    setAutoBreakRarity(buildSelectedMap(config.rarities));
    setAutoBreakClass(buildSelectedMap(config.classes));
    setAutoBreakSuit(buildSelectedMap(config.suits));
    setAutoBreakParts(buildSelectedMap(config.parts));
    setAutoBreakSubEntries(buildSelectedMap(config.includeSubEntries));
    setAutoBreakSubEntryComparisons(config.subEntryComparisons);
    setAutoBreakSubEntryLimits(Object.fromEntries(Object.entries(config.subEntryMaxValues).map(([id, value]) => [id, value === "invalid" ? GetLocalization("#Equipment_AutoBreakThresholdInvalidValue") : String(value)])));
  };
  const needsAutoBreakDetails = libs.createMemo(() => getSelectedStrings(autoBreakSubEntries()).length > 0);
  const hasInvalidAutoBreakThreshold = libs.createMemo(() => {
    const config = getCurrentAutoBreakConfig();
    return hasInvalidAutoBreakNumbers(config) || Object.entries(config.subEntryMaxValues).some(([id, value]) => value === "invalid" || config.subEntryComparisons[id] === "invalid");
  });
  libs.createEffect(libs.on([showAutoBreakWindow, needsAutoBreakDetails, player_equipments], ([show, needsDetails, source]) => {
    if (!show || !needsDetails) {
      setAutoBreakDetails({
        status: "idle",
        items: {}
      });
      return;
    }
    const ids = Object.keys(source);
    if (ids.length === 0) {
      setAutoBreakDetails({
        source,
        status: "ready",
        items: {}
      });
      return;
    }
    let active = true;
    setAutoBreakDetails({
      source,
      status: "loading",
      items: {}
    });
    const request = ServerRequest("get_equip_detail", {
      id: ids
    }, items => {
      if (active) setAutoBreakDetails({
        source,
        status: "ready",
        items
      });
    }, 10, () => {
      if (active) setAutoBreakDetails({
        source,
        status: "failed",
        items: {}
      });
    });
    libs.onCleanup(() => {
      active = false;
      if (request != undefined) CancelRequest(request);
    });
  }));
  const matchesAutoBreakConditions = (equip, config) => {
    const entries = autoBreakDetails().items[equip.id]?.adverb_entry_data;
    if (config.includeSubEntries.length > 0 && entries === undefined) return undefined;
    let subEntriesMatch = true;
    for (const id of config.includeSubEntries) {
      const selected = (entries ?? []).filter(entry => entry.id === id);
      if (selected.length === 0) {
        subEntriesMatch = false;
        continue;
      }
      const limit = config.subEntryMaxValues[id];
      if (limit === undefined) continue;
      const results = selected.map(entry => matchesSubEntryValue(entry, limit, config.subEntryComparisons[id]));
      if (results.some(result => result === undefined)) return undefined;
      if (!(config.action === "keep" ? results.some(Boolean) : results.every(Boolean))) subEntriesMatch = false;
    }
    return subEntriesMatch && (config.needLevels.length === 0 || config.needLevels.includes(equip.need_level)) && (config.rarities.length === 0 || config.rarities.includes(equip.rarity)) && (config.classes.length === 0 || config.classes.includes(equip.class)) && (config.parts.length === 0 || config.parts.includes(equip.equip_part)) && (config.suits.length === 0 || Object.values(equip.ability_entry_data ?? {}).some(entry => config.suits.includes(entry.id)));
  };
  const isAutoBreakMatch = (equip, config) => {
    if (equipment_utils.EquipmentHasStates(equip) || !hasAutoBreakRule(config) || hasInvalidAutoBreakNumbers(config)) return false;
    if (Object.values(config.subEntryMaxValues).some(value => value === "invalid")) return false;
    if (Object.keys(config.subEntryMaxValues).some(id => config.subEntryComparisons[id] === "invalid")) return false;
    const matches = matchesAutoBreakConditions(equip, config);
    if (matches === undefined) return false;
    return config.action === "keep" ? !matches : matches;
  };
  const hasAutoBreakRule = config => {
    return config.needLevels.length > 0 || config.rarities.length > 0 || config.classes.length > 0 || config.suits.length > 0 || config.parts.length > 0 || config.includeSubEntries.length > 0;
  };
  const autoBreakMatchedCount = libs.createMemo(() => {
    const config = getCurrentAutoBreakConfig();
    if (!hasAutoBreakRule(config)) return 0;
    if (needsAutoBreakDetails()) {
      const details = autoBreakDetails();
      if (details.status !== "ready" || details.source !== player_equipments() || Object.values(player_equipments()).some(equip => !equipment_utils.EquipmentHasStates(equip) && !details.items[equip.id])) return undefined;
    }
    return Object.values(player_equipments()).filter(equip => isAutoBreakMatch(equip, config)).length;
  });
  const saveAutoBreakEnabled = (checked, panel) => {
    if (autoBreakEnabledSaving()) {
      if (panel?.IsValid()) panel.checked = autoBreakEnabled();
      return;
    }
    setAutoBreakEnabledSaving(true);
    applyAutoBreakEnabled(checked);
    let completed = false;
    const finish = success => {
      if (completed) return;
      completed = true;
      libs.batch(() => {
        applyAutoBreakEnabled(success ? checked : getEnabledFromText(player_key_values()?.[EQUIPMENT_AUTO_BREAK_ENABLED_KEY]?.value));
        setAutoBreakEnabledSaving(false);
      });
      if (panel?.IsValid()) panel.checked = autoBreakEnabled();
    };
    CallActionRequest("/v1/key/save", {
      type: EQUIPMENT_BREAK_KEY_TYPE,
      key: EQUIPMENT_AUTO_BREAK_ENABLED_KEY,
      value: checked ? "1" : "0"
    }, result => finish(result.code === 0 || result.code === 200), () => finish(false), false);
  };
  const submitAutoBreakConfig = (config, button) => {
    if (button?.IsValid()) {
      button.enabled = false;
    }
    CallActionRequest("/v1/key/save", {
      type: EQUIPMENT_BREAK_KEY_TYPE,
      key: EQUIPMENT_AUTO_BREAK_CONFIG_KEY,
      value: JSON.stringify(config)
    }, () => {
      if (button?.IsValid()) button.enabled = true;
    }, () => {
      if (button?.IsValid()) button.enabled = true;
    }, false);
  };
  const saveAutoBreakConfig = button => {
    const config = getCurrentAutoBreakConfig();
    if (hasInvalidAutoBreakNumbers(config)) return;
    if (Object.values(config.subEntryMaxValues).some(value => value === "invalid")) return;
    if (Object.keys(config.subEntryMaxValues).some(id => config.subEntryComparisons[id] === "invalid")) return;
    if (autoBreakMatchedCount() === undefined) return;
    const source = player_equipments();
    const highRarity = Object.values(source).filter(equip => equip.rarity >= 6 && isAutoBreakMatch(equip, config));
    if (highRarity.length > 0) {
      CustomUIConfig.showPopup("CommonConfirm", {
        text: LocalizeWithVars("#Equipment_AutoBreakHighRarityConfirm", {
          value: highRarity.length
        }),
        title: GetLocalization("#Equipment_AutoBreakTitle"),
        size: "normal",
        scrollItems: true,
        items: highRarity.map(equip => ({
          item_id: equip.equipment_item_id,
          uid: equip.id,
          rarity: equip.rarity
        })),
        showCancel: true,
        onconfirm: () => {
          if (source !== player_equipments()) {
            saveAutoBreakConfig(button);
            return;
          }
          submitAutoBreakConfig(config, button);
        }
      });
      return;
    }
    submitAutoBreakConfig(config, button);
  };
  libs.createEffect(libs.on(player_key_values, data => {
    const nextEnabled = getEnabledFromText(data?.[EQUIPMENT_AUTO_BREAK_ENABLED_KEY]?.value);
    if (!autoBreakEnabledSaving()) applyAutoBreakEnabled(nextEnabled);
    const nextConfigText = data?.[EQUIPMENT_AUTO_BREAK_CONFIG_KEY]?.value;
    if (appliedAutoBreakConfigText != nextConfigText) {
      appliedAutoBreakConfigText = nextConfigText;
      applyAutoBreakConfig(getAutoBreakConfigFromText(nextConfigText));
    }
  }));
  const resetAutoBreakStateFromSavedData = () => {
    const data = player_key_values();
    if (!autoBreakEnabledSaving()) applyAutoBreakEnabled(getEnabledFromText(data?.[EQUIPMENT_AUTO_BREAK_ENABLED_KEY]?.value));
    applyAutoBreakConfig(getAutoBreakConfigFromText(data?.[EQUIPMENT_AUTO_BREAK_CONFIG_KEY]?.value));
  };
  const toggleAutoBreakWindow = () => {
    const nextShow = !showAutoBreakWindow();
    if (nextShow) {
      resetAutoBreakStateFromSavedData();
    }
    setShowAutoBreakWindow(nextShow);
  };
  const changeBreakView = checked => {
    if (checked) {
      libs.batch(() => {
        setSelectSlot(-1);
        setShowSelectedItems(true);
      });
      return;
    }
    libs.batch(() => {
      setShowSelectedItems(false);
      setSelectedItemList(items => items.filter(id => id != null).slice(0, equipment_comp.BREAK_SLOT_NUM));
    });
  };
  const clearBreakSelection = () => {
    libs.batch(() => {
      setSelectedItemList([]);
      setSelectSlot(-1);
    });
  };
  const removeSelectedItem = (panel, id) => {
    HideCustomTooltip(panel, tooltipType());
    setSelectedItemList(items => items.filter(itemID => itemID != id));
  };
  const BreakItemIcon = props => libs.createComponent(libs.Switch, {
    get children() {
      return [libs.createComponent(libs.Match, {
        get when() {
          return isHuntlootMode();
        },
        get children() {
          return libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(() => props.data));
        }
      }), libs.createComponent(libs.Match, {
        get when() {
          return isGemMode();
        },
        get children() {
          return libs.createComponent(server_equipment.Gem, libs.mergeProps$1(() => props.data));
        }
      }), libs.createComponent(libs.Match, {
        get when() {
          return selectedItemTab() === "equipment";
        },
        get children() {
          return libs.createComponent(server_equipment.Equipment, libs.mergeProps$1(() => props.data));
        }
      })];
    }
  });
  const changeBreakType = index => {
    const nextType = index == 2 ? "huntloot" : index == 1 ? "gem" : "equipment";
    if (selectedItemTab() == nextType) return;
    libs.batch(() => {
      setSelectedItemList([]);
      setFastAddRarity(0);
      setSelectedItemTab(nextType);
    });
  };
  const AutoBreakWindow = () => {
    let needLvFilter;
    const initialNeedLvSelection = {
      ...autoBreakNeedLv()
    };
    const needLvText = libs.createMemo(() => getSelectedStrings(autoBreakNeedLv()).toString());
    const matchedCountText = libs.createMemo(() => {
      const count = autoBreakMatchedCount();
      return count != undefined ? LocalizeWithVars("#Equipment_AutoBreakMatchedCount", {
        value: count
      }) : GetLocalization(autoBreakDetails().status === "loading" ? "#Equipment_AutoBreakDetailsLoading" : "#Equipment_AutoBreakDetailsUnavailable");
    });
    libs.onMount(() => {
      needLvFilter?.setSelect(initialNeedLvSelection);
    });
    return (() => {
      const _el$ = libs.createElement("Panel", {
          id: "AutoBreakWindow"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "AutoBreakHeader"
        }, _el$),
        _el$3 = libs.createElement("Label", {
          id: "AutoBreakTitle",
          get text() {
            return GetLocalization("#Equipment_AutoBreakTitle");
          }
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "AutoBreakMode"
        }, _el$),
        _el$5 = libs.createElement("Label", {
          id: "AutoBreakRuleHint",
          get text() {
            return GetLocalization(autoBreakAction() === "keep" ? "#Equipment_AutoBreakKeepHint" : "#Equipment_AutoBreakRuleHint");
          }
        }, _el$),
        _el$6 = libs.createElement("Panel", {
          id: "AutoBreakOptions",
          "class": "VerticalScrollStyle",
          scroll: "y"
        }, _el$),
        _el$7 = libs.createElement("Label", {
          "class": "Subheading",
          get text() {
            return GetLocalization("#Equipment_AutoBreakParts");
          }
        }, _el$6);
        libs.createElement("Panel", {
          "class": "Separator FilterLine"
        }, _el$6);
        const _el$9 = libs.createElement("Panel", {
          "class": "CheckBoxList"
        }, _el$6),
        _el$0 = libs.createElement("Panel", {
          id: "NeedLvFilter",
          "class": "Filter"
        }, _el$6),
        _el$1 = libs.createElement("Label", {
          id: "FilterType",
          get text() {
            return GetLocalization("#NeedLvFilter");
          }
        }, _el$0),
        _el$10 = libs.createElement("Label", {
          "class": "Subheading",
          get text() {
            return GetLocalization("#Equipment_Rarity");
          }
        }, _el$6);
        libs.createElement("Panel", {
          "class": "Separator FilterLine"
        }, _el$6);
        const _el$12 = libs.createElement("Panel", {
          id: "RarityFilterList",
          "class": "CheckBoxList"
        }, _el$6),
        _el$13 = libs.createElement("Label", {
          "class": "Subheading",
          get text() {
            return GetLocalization("#Equipment_Class");
          }
        }, _el$6);
        libs.createElement("Panel", {
          "class": "Separator FilterLine"
        }, _el$6);
        const _el$15 = libs.createElement("Panel", {
          id: "ClassFilterList",
          "class": "CheckBoxList"
        }, _el$6),
        _el$16 = libs.createElement("Label", {
          "class": "Subheading",
          get text() {
            return GetLocalization("#Equipment_Suit");
          }
        }, _el$6);
        libs.createElement("Panel", {
          "class": "Separator FilterLine"
        }, _el$6);
        const _el$18 = libs.createElement("Panel", {
          id: "SuitFilterList",
          "class": "CheckBoxList"
        }, _el$6),
        _el$19 = libs.createElement("Label", {
          "class": "Subheading",
          get text() {
            return GetLocalization("#Equipment_AutoBreakSubTitle");
          }
        }, _el$6);
        libs.createElement("Panel", {
          "class": "Separator FilterLine"
        }, _el$6);
        const _el$21 = libs.createElement("Panel", {
          id: "AutoBreakSubColumns"
        }, _el$6);
        libs.createElement("Panel", {
          "class": "AutoBreakSubHeadingSpacer"
        }, _el$21);
        const _el$23 = libs.createElement("Label", {
          "class": "AutoBreakThresholdHeading",
          get text() {
            return GetLocalization("#Equipment_AutoBreakThreshold");
          }
        }, _el$21),
        _el$24 = libs.createElement("Panel", {
          id: "AutoBreakSubEntryList"
        }, _el$6),
        _el$25 = libs.createElement("Label", {
          id: "AutoBreakThresholdError",
          get text() {
            return GetLocalization("#Equipment_AutoBreakThresholdInvalid");
          }
        }, _el$6),
        _el$26 = libs.createElement("Panel", {
          id: "AutoBreakFooter"
        }, _el$),
        _el$27 = libs.createElement("Label", {
          id: "AutoBreakMatchedCount",
          get text() {
            return matchedCountText();
          }
        }, _el$26),
        _el$28 = libs.createElement("Panel", {
          id: "AutoBreakActions"
        }, _el$26);
      libs.insert(_el$4, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        get checked() {
          return autoBreakAction() === "break";
        },
        get text() {
          return GetLocalization("#Equipment_AutoBreakActionBreak");
        },
        onchecked: (_, panel) => {
          panel.checked = true;
          setAutoBreakAction("break");
        }
      }), null);
      libs.insert(_el$4, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        get checked() {
          return autoBreakAction() === "keep";
        },
        get text() {
          return GetLocalization("#Equipment_AutoBreakActionKeep");
        },
        onchecked: (_, panel) => {
          panel.checked = true;
          setAutoBreakAction("keep");
        }
      }), null);
      libs.setProp(_el$6, "scroll", "y");
      libs.insert(_el$9, libs.createComponent(libs.For, {
        each: equipment_utils.EQUIP_PARTS,
        children: part => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
          get checked() {
            return autoBreakParts()[part] ?? false;
          },
          get text() {
            return GetLocalization(`#Equipment_Part_${part}`);
          },
          onchecked: checked => setAutoBreakParts(prev => ({
            ...prev,
            [part]: checked
          }))
        })
      }));
      libs.insert(_el$0, libs.createComponent(EOM_MultiDropDown.EOM_MultiDropDown, {
        get placeholder() {
          return needLvText();
        },
        ref(r$) {
          const _ref$ = needLvFilter;
          typeof _ref$ === "function" ? _ref$(r$) : needLvFilter = r$;
        },
        options: NEEDLV_LIST$1,
        onChange: value => setAutoBreakNeedLv(value)
      }), null);
      libs.insert(_el$12, libs.createComponent(libs.For, {
        each: equipment_utils.EQUIP_RARITY_COLOR,
        children: (color, idx) => {
          const rarity = idx() + 1;
          return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
            "class": "Rarity" + rarity,
            get checked() {
              return autoBreakRarity()[rarity] ?? false;
            },
            get text() {
              return GetLocalization(`#Equipment_Rarity_${rarity}`);
            },
            onchecked: checked => {
              setAutoBreakRarity(prev => {
                const next = {
                  ...prev
                };
                if (checked) {
                  next[rarity] = true;
                } else {
                  delete next[rarity];
                }
                return next;
              });
            }
          });
        }
      }));
      libs.insert(_el$15, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(GameUI.CustomUIConfig().equip_class_setting);
        },
        children: equipClass => {
          const classID = Number(equipClass);
          return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
            get checked() {
              return autoBreakClass()[classID] ?? false;
            },
            text: equipClass,
            onchecked: checked => {
              setAutoBreakClass(prev => {
                const next = {
                  ...prev
                };
                if (checked) {
                  next[classID] = true;
                } else {
                  delete next[classID];
                }
                return next;
              });
            }
          });
        }
      }));
      libs.insert(_el$18, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(KeyValues.equipment_suit_effect);
        },
        children: suitID => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
          get checked() {
            return autoBreakSuit()[suitID] ?? false;
          },
          get text() {
            return GetLocalization("#" + suitID);
          },
          onchecked: checked => {
            setAutoBreakSuit(prev => {
              const next = {
                ...prev
              };
              if (checked) {
                next[suitID] = true;
              } else {
                delete next[suitID];
              }
              return next;
            });
          }
        })
      }));
      libs.insert(_el$24, libs.createComponent(libs.For, {
        each: SUB_ENTRY_LIST,
        children: entry => {
          const selected = () => autoBreakSubEntries()[entry.entry_name] ?? false;
          const limit = () => autoBreakSubEntryLimits()[entry.entry_name] ?? "";
          const comparison = () => autoBreakSubEntryComparisons()[entry.entry_name] ?? (autoBreakAction() === "keep" ? "gte" : "lte");
          const invalid = () => {
            const config = getCurrentAutoBreakConfig();
            return selected() && limit().trim() !== "" && (config.subEntryMaxValues[entry.entry_name] === "invalid" || comparison() === "invalid");
          };
          return (() => {
            const _el$29 = libs.createElement("Panel", {
                "class": "AutoBreakSubRule"
              }, null),
              _el$30 = libs.createElement("Panel", {
                "class": "AutoBreakSubInfo"
              }, _el$29),
              _el$31 = libs.createElement("Panel", {
                "class": "AutoBreakThresholdInput"
              }, _el$29),
              _el$32 = libs.createElement("Label", {
                "class": "AutoBreakThresholdUnit",
                get text() {
                  return GetLocalization(`#property_${entry.entry_name}`).startsWith("%") ? "%" : "";
                }
              }, _el$31);
            libs.insert(_el$30, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
              "class": "AutoBreakSubName",
              get checked() {
                return selected();
              },
              get text() {
                return GetLocalization(`#property_${entry.entry_name}`).replace("%", "");
              },
              onchecked: checked => selectAutoBreakSubEntry(entry.entry_name, checked)
            }));
            libs.insert(_el$31, libs.createComponent(EOM_DropDown.EOM_DropDown, {
              "class": "AutoBreakThresholdComparison",
              type: "EquipmentDropDown",
              menuClass: "AutoBreakComparisonMenu",
              customWidth: "64px",
              get index() {
                return SUB_ENTRY_COMPARISONS.indexOf(comparison());
              },
              onChange: index => {
                const next = SUB_ENTRY_COMPARISONS[index];
                if (next) setAutoBreakSubEntryComparisons(prev => ({
                  ...prev,
                  [entry.entry_name]: next
                }));
              },
              get children() {
                return libs.createComponent(libs.For, {
                  each: SUB_ENTRY_COMPARISONS,
                  children: operator => (() => {
                    const _el$33 = libs.createElement("Label", {
                      get text() {
                        return GetLocalization(`#Equipment_AutoBreakComparison_${operator}`);
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$33, "text", GetLocalization(`#Equipment_AutoBreakComparison_${operator}`), _$p));
                    return _el$33;
                  })()
                });
              }
            }), _el$32);
            libs.insert(_el$31, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
              "class": "AutoBreakThresholdValue",
              get text() {
                return limit();
              },
              get placeholder() {
                return GetLocalization("#Equipment_AutoBreakThresholdUnlimited");
              },
              onChange: (_, __, text) => libs.batch(() => {
                setAutoBreakSubEntryLimits(prev => ({
                  ...prev,
                  [entry.entry_name]: text
                }));
                if (text.trim() !== "") selectAutoBreakSubEntry(entry.entry_name, true);
              })
            }), _el$32);
            libs.effect(_p$ => {
              const _v$12 = {
                  Selected: selected(),
                  Invalid: invalid()
                },
                _v$13 = GetLocalization(`#property_${entry.entry_name}`).startsWith("%") ? "%" : "";
              _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$29, "classList", _v$12, _p$._v$12));
              _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$32, "text", _v$13, _p$._v$13));
              return _p$;
            }, {
              _v$12: undefined,
              _v$13: undefined
            });
            return _el$29;
          })();
        }
      }));
      libs.insert(_el$28, libs.createComponent(EOM_Button.EOM_Button, {
        id: "AutoBreakSaveBtn",
        get enabled() {
          return libs.memo(() => !!!hasInvalidAutoBreakThreshold())() && autoBreakMatchedCount() !== undefined;
        },
        size: "Small",
        get text() {
          return GetLocalization("#Equipment_AutoBreakSave");
        },
        onactivate: self => saveAutoBreakConfig(self)
      }), null);
      libs.insert(_el$28, libs.createComponent(EOM_Button.EOM_Button, {
        id: "AutoBreakCloseBtn",
        size: "Small",
        get text() {
          return GetLocalization("#GameUI_Close");
        },
        onactivate: () => setShowAutoBreakWindow(false)
      }), null);
      libs.effect(_p$ => {
        const _v$ = GetLocalization("#Equipment_AutoBreakTitle"),
          _v$2 = GetLocalization(autoBreakAction() === "keep" ? "#Equipment_AutoBreakKeepHint" : "#Equipment_AutoBreakRuleHint"),
          _v$3 = GetLocalization("#Equipment_AutoBreakParts"),
          _v$4 = GetLocalization("#NeedLvFilter"),
          _v$5 = GetLocalization("#Equipment_Rarity"),
          _v$6 = GetLocalization("#Equipment_Class"),
          _v$7 = GetLocalization("#Equipment_Class_Desc"),
          _v$8 = GetLocalization("#Equipment_Suit"),
          _v$9 = GetLocalization("#Equipment_AutoBreakSubTitle"),
          _v$0 = GetLocalization("#Equipment_AutoBreakThreshold"),
          _v$1 = hasInvalidAutoBreakThreshold(),
          _v$10 = GetLocalization("#Equipment_AutoBreakThresholdInvalid"),
          _v$11 = matchedCountText();
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "text", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$1, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$13, "text", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$13, "tooltip", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$16, "text", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$19, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$23, "text", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$25, "visible", _v$1, _p$._v$1));
        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$25, "text", _v$10, _p$._v$10));
        _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$27, "text", _v$11, _p$._v$11));
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
        _v$9: undefined,
        _v$0: undefined,
        _v$1: undefined,
        _v$10: undefined,
        _v$11: undefined
      });
      return _el$;
    })();
  };
  const addedAttr = libs.createMemo(() => {
    const lv = player_account_levels().equip_break_level.level;
    let effectAttr = {};
    for (let i = 1; i <= lv; i++) {
      const idx = i - 1;
      BREAK_ATTR_LIST[idx].effect.split("|").forEach(pair => {
        const [name, value] = pair.split(":");
        effectAttr[name] = toFiniteNumber(effectAttr[name]) + Number(value);
      });
    }
    return Object.entries(effectAttr).map(([k, v]) => {
      return {
        attrName: k,
        value: v
      };
    });
  });
  const calculateTarget = () => {
    const curExp = player_account_levels().equip_break_level.extra_exp;
    const curLv = currentLv();
    const added = addedExp();
    if (curLv >= MAX_LEVEL) {
      return {
        finalStack: 0,
        finalProgress: 0,
        finalExp: 0
      };
    }
    let finalExp = curExp + added;
    let targetLv = Math.min(MAX_LEVEL, addedLv() + curLv);
    let finalStack = addedLv();
    let tmp = curLv;
    while (tmp < targetLv) {
      finalExp = finalExp - BREAK_LEVEL_EXP[tmp].exp;
      tmp++;
    }
    const finalProgress = targetLv >= MAX_LEVEL ? 100 : finalExp / BREAK_LEVEL_EXP[targetLv].exp * 100;
    return {
      finalStack,
      finalProgress,
      finalExp
    };
  };
  const calculateBreakReward = (equipID, record) => {
    let lv = player_equipments()[equipID].level - 1;
    while (lv >= 0) {
      KeyValues.equip_level_setting[lv].consume.split("|").forEach(item => {
        const [itemID, num] = item.split(":");
        const amount = toFiniteNumber(num);
        if (amount > 0) {
          record[itemID] = toFiniteNumber(record[itemID]) + toFiniteNumber(num);
        }
      });
      lv--;
    }
  };
  const calculateGemBreakReward = (gemID, record) => {
    const gem = player_gems()[gemID];
    if (!gem) return;
    const kv = Object.values(KeyValues.gem_level).find(row => row.rarity === gem.rarity && row.level === gem.level);
    if (!kv || !kv.decompose) return;
    kv.decompose.split("|").forEach(item => {
      const [itemID, num] = item.split(":");
      const amount = toFiniteNumber(num);
      if (amount > 0) {
        record[itemID] = toFiniteNumber(record[itemID]) + amount;
      }
    });
  };
  libs.createEffect(libs.on(selectedItemList, itemList => {
    let reward = {};
    if (isGemMode()) {
      for (let i = 0; i < itemList.length; i++) {
        let gemID = itemList[i];
        if (!gemID) continue;
        calculateGemBreakReward(gemID, reward);
      }
      setRewardList(Object.keys(reward).map(itemID => {
        return {
          itemID,
          amount: reward[itemID]
        };
      }));
      setAddedExp(0);
      setAddedLv(0);
      return;
    }
    const curExp = player_account_levels().equip_break_level.extra_exp;
    const curLv = player_account_levels().equip_break_level.level;
    let addedExp = 0;
    let addedLv = 0;
    for (let i = 0; i < itemList.length; i++) {
      let equipID = itemList[i];
      if (!equipID) {
        continue;
      }
      if (isHuntlootMode()) {
        const item = player_huntloots()[equipID];
        if (!item) continue;
        const bonus = KeyValues.huntloot_rarity_setting[item.rarity]?.break_bonus ?? "";
        for (const pair of bonus.split("|")) {
          const [itemID, value] = pair.split(":");
          const amount = toFiniteNumber(value);
          if (amount <= 0) continue;
          if (itemID === "200001") addedExp += amount;else reward[itemID] = toFiniteNumber(reward[itemID]) + amount;
        }
        continue;
      }
      if (!player_equipments()[equipID]) continue;
      let rarity = player_equipments()[equipID].rarity;
      let [itemID, amount] = RARITY_SETTING[rarity].break_bonus.split(":");
      addedExp += Number(amount);
      calculateBreakReward(equipID, reward);
    }
    let currentLv = curLv;
    let totalExp = curExp + addedExp;
    while (currentLv < MAX_LEVEL) {
      const nextLvKv = BREAK_LEVEL_EXP[currentLv];
      if (!nextLvKv) break;
      const nextLvExp = nextLvKv.exp;
      if (totalExp >= nextLvExp) {
        totalExp -= nextLvExp;
        currentLv++;
        addedLv++;
      } else {
        break;
      }
    }
    libs.batch(() => {
      setRewardList(Object.keys(reward).map(itemID => {
        return {
          itemID,
          amount: reward[itemID]
        };
      }));
      setAddedExp(addedExp);
      setAddedLv(addedLv);
    });
    const {
      finalStack,
      finalProgress,
      finalExp
    } = calculateTarget();
    if (addedExp > 0) {
      const currentExp = player_account_levels().equip_break_level.extra_exp;
      const currentLv = player_account_levels().equip_break_level.level;
      const currentLvKv = BREAK_LEVEL_EXP[currentLv];
      animStartProgress = currentLv >= MAX_LEVEL ? 100 : currentExp / currentLvKv.exp * 100;
      if (prevAddedExp === 0) {
        barProgress = animStartProgress;
      }
    } else {
      shouldStopAt100 = false;
    }
    prevAddedExp = addedExp;
    if (addedLv > 0) {
      targetStack = 1;
    } else {
      targetStack = 0;
    }
    if (addedLv > 0) {
      targetProgress = 100;
      shouldStopAt100 = true;
    } else {
      targetProgress = finalProgress;
      shouldStopAt100 = false;
    }
    targetExp = finalExp;
  }));
  let expBar;
  let expAnimBar;
  let expLabel;
  let breakParticle;
  let lvInfoListHandle;
  let curStack = 0;
  let targetStack = 0;
  let barProgress = 0;
  let targetProgress = 0;
  let targetExp = 0;
  let animStartProgress = 0;
  let prevAddedExp = 0;
  let shouldStopAt100 = false;
  let lvInfoScrollSchedule;
  let breakParticleSchedule;
  function playBreakParticle() {
    if (!breakParticle) {
      return;
    }
    if (breakParticleSchedule != undefined) {
      try {
        $.CancelScheduled(breakParticleSchedule);
      } catch (error) {}
    }
    breakParticle.AddClass("Show");
    breakParticle.ReloadScene();
    breakParticleSchedule = $.Schedule(1.2, () => {
      breakParticleSchedule = undefined;
      breakParticle?.RemoveClass("Show");
    });
    Game.EmitSound("ui.treasure_01");
  }
  function scrollToCurrentLv(bNoSmooth = false) {
    const index = BREAK_ATTR_LIST.findIndex(data => data.level == currentLv());
    if (index >= 0) {
      lvInfoListHandle?.scroll2Child(index, "center", bNoSmooth);
    }
  }
  function scheduleScrollToCurrentLv(bNoSmooth = false) {
    if (lvInfoScrollSchedule != undefined) {
      try {
        $.CancelScheduled(lvInfoScrollSchedule);
      } catch (error) {}
    }
    lvInfoScrollSchedule = $.Schedule(0.03, () => {
      lvInfoScrollSchedule = undefined;
      scrollToCurrentLv(bNoSmooth);
    });
  }
  libs.createEffect(libs.on(currentLv, () => {
    scheduleScrollToCurrentLv();
  }));
  libs.onCleanup(() => {
    if (lvInfoScrollSchedule != undefined) {
      try {
        $.CancelScheduled(lvInfoScrollSchedule);
      } catch (error) {}
    }
    if (breakParticleSchedule != undefined) {
      try {
        $.CancelScheduled(breakParticleSchedule);
      } catch (error) {}
    }
  });
  libs.onMount(() => {
    const SPEED_FACTOR = 0.35;
    const MIN_SPEED = 0.3;
    const timer = setInterval(() => {
      let currentTarget = targetProgress;
      if (curStack < targetStack) {
        currentTarget = 100;
      } else if (curStack > targetStack) {
        barProgress = currentTarget;
      }
      if (barProgress < currentTarget) {
        const distance = currentTarget - barProgress;
        const speed = Math.max(Math.sqrt(distance) * SPEED_FACTOR, MIN_SPEED);
        barProgress = Math.min(barProgress + speed, currentTarget);
      } else if (barProgress > currentTarget) {
        barProgress = currentTarget;
      }
      const displayLv = Math.min(MAX_LEVEL, currentLv() + curStack);
      const displayLvKv = BREAK_LEVEL_EXP[displayLv];
      displayLvKv.exp;
      if (barProgress >= currentTarget) {
        if (curStack < targetStack) {
          if (shouldStopAt100) {
            curStack = targetStack;
          } else {
            barProgress = 0;
            curStack = targetStack;
          }
        } else if (curStack > targetStack) {
          barProgress = currentTarget;
          curStack = targetStack;
        }
      }
      const realExp = player_account_levels().equip_break_level.extra_exp;
      const realLv = currentLv();
      const realLvKv = BREAK_LEVEL_EXP[realLv];
      let realProgress = 100;
      if (realLvKv && realLvKv.exp != 0) {
        realProgress = realExp / realLvKv.exp * 100;
      }
      if (expBar != undefined) {
        expBar.style.clip = `rect( 0%, ${realProgress}%, 100%, 0% )`;
      }
      if (addedExp() > 0 && expAnimBar) {
        expAnimBar.style.clip = `rect( 0%, ${barProgress}%, 100%, 0% )`;
      } else if (expAnimBar) {
        expAnimBar.style.clip = `rect( 0%, 0%, 100%, 0% )`;
      }
      if (expLabel) {
        if (realLvKv) {
          if (currentLv() < MAX_LEVEL) {
            expLabel.text = LocalizeWithVars("#Equipment_BreakExp", {
              value: realExp,
              max: realLvKv.exp
            });
          } else {
            expLabel.text = GetLocalization("#Equipment_MaxLv");
          }
        }
      }
    }, 10);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipBreakRoot",
    get children() {
      const _el$34 = libs.createElement("Panel", {
          id: "CenterBlock",
          hittest: false
        }, null),
        _el$35 = libs.createElement("Panel", {
          id: "ClickPanel"
        }, _el$34),
        _el$36 = libs.createElement("Panel", {
          id: "EquipBreakWindow",
          get ["class"]() {
            return libs.classNames(getBreakWindowClass());
          }
        }, _el$34),
        _el$37 = libs.createElement("Panel", {
          id: "BreakSelectionContainer"
        }, _el$36),
        _el$38 = libs.createElement("Panel", {
          id: "BreakSlotsContainer"
        }, _el$37),
        _el$39 = libs.createElement("Panel", {
          id: "BreakSlots"
        }, _el$38),
        _el$41 = libs.createElement("Panel", {
          id: "CenterImage"
        }, _el$38),
        _el$42 = libs.createElement("DOTAParticleScenePanel", {
          id: "BreakForgeParticle",
          particleName: "particles/ui/game/ui_game_equipment_interface_02_fx.vpcf",
          cameraOrigin: "0 0 250",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$38),
        _el$43 = libs.createElement("Panel", {
          id: "LevelInfo"
        }, _el$38),
        _el$44 = libs.createElement("Panel", {
          width: "100%",
          verticalAlign: "center",
          flowChildren: "down"
        }, _el$43),
        _el$45 = libs.createElement("Label", {
          verticalAlign: "center",
          text: "#Equipment_BreakLvTips"
        }, _el$44),
        _el$47 = libs.createElement("Panel", {
          "class": "ToolTipInfo"
        }, _el$43),
        _el$48 = libs.createElement("Panel", {
          id: "SelectedBreakItemsContainer"
        }, _el$37),
        _el$49 = libs.createElement("Label", {
          id: "SelectedBreakItemsTitle",
          get text() {
            return GetLocalization("#Equipment_BreakSelectedListTitle");
          }
        }, _el$48),
        _el$50 = libs.createElement("Label", {
          id: "SelectedBreakItemsCount",
          get text() {
            return LocalizeWithVars("#Equipment_BreakSelectedCount", {
              value: selectedCount()
            });
          }
        }, _el$48),
        _el$52 = libs.createElement("Panel", {
          id: "BreakViewToggle"
        }, _el$36),
        _el$53 = libs.createElement("Label", {
          get text() {
            return GetLocalization("#Equipment_BreakListMode");
          }
        }, _el$52),
        _el$54 = libs.createElement("Panel", {
          id: "FastAdd"
        }, _el$36),
        _el$58 = libs.createElement("Panel", {
          id: "ExpBarContainer"
        }, _el$36),
        _el$59 = libs.createElement("Image", {
          id: "ExpAnimBar"
        }, _el$58),
        _el$60 = libs.createElement("Image", {
          id: "ExpBar"
        }, _el$58),
        _el$61 = libs.createElement("Label", {
          id: "CurExp"
        }, _el$58),
        _el$62 = libs.createElement("Label", {
          id: "AddexExp",
          get text() {
            return `+${addedExp()}`;
          }
        }, _el$58),
        _el$64 = libs.createElement("Panel", {
          id: "BreakReward"
        }, _el$36),
        _el$68 = libs.createElement("Panel", {
          id: "BreakActions"
        }, _el$36),
        _el$69 = libs.createElement("Panel", {
          "class": "BtnList"
        }, _el$68),
        _el$70 = libs.createElement("Panel", {
          id: "AutoBreak",
          horizontalAlign: "center",
          flowChildren: "right"
        }, _el$68),
        _el$71 = libs.createElement("Panel", {
          id: "AttributeLvInfo"
        }, _el$34);
      libs.setProp(_el$35, "onactivate", () => {
        setShowAutoBreakWindow(false);
        setSelectSlot(-1);
      });
      libs.insert(_el$39, libs.createComponent(libs.For, {
        get each() {
          return Array(equipment_comp.BREAK_SLOT_NUM);
        },
        children: (_, idx) => {
          const slotData = () => {
            const id = selectedItemList()[idx()];
            if (!id) return undefined;
            if (isHuntlootMode()) return player_huntloots()[id];
            if (isGemMode()) {
              return player_gems()[id];
            }
            return player_equipments()[id];
          };
          return (() => {
            const _el$73 = libs.createElement("Panel", {
                get id() {
                  return "BreakSlot" + idx();
                },
                get ["class"]() {
                  return libs.classNames("BreakSlot", {
                    Select: idx() == selectSlot()
                  });
                }
              }, null);
              libs.createElement("Panel", {
                id: "Selected"
              }, _el$73);
            libs.setProp(_el$73, "onDragEnter", (pPanel, draggedPanel) => {
              const dragType = isHuntlootMode() ? "huntloot" : isGemMode() ? "gem" : "equip";
              if (LoadData(draggedPanel, dragType)) {
                draggedPanel.AddClass("draggedPanel_drop_enter");
              }
            });
            libs.setProp(_el$73, "onDragLeave", (pPanel, draggedPanel) => {
              draggedPanel.RemoveClass("draggedPanel_drop_enter");
            });
            libs.setProp(_el$73, "onDragDrop", (panel, draggedPanel) => {
              if (isHuntlootMode()) {
                const id = LoadData(draggedPanel, "huntloot");
                const item = player_huntloots()[id];
                if (!item || huntloot_details.HuntlootHasStates(item, true)) return;
                setSelectedItemList(items => {
                  if (items.includes(id)) return items.filter(value => value !== id);
                  const next = [...items];
                  next[idx()] = id;
                  return next;
                });
              } else if (isGemMode()) {
                let gemId = LoadData(draggedPanel, "gem");
                if (!gemId) return;
                if (equipment_utils.GemHasStates(player_gems()[gemId], true)) {
                  return;
                }
                if (selectedItemList().includes(gemId)) {
                  setSelectedItemList(items => items.filter(i => i != gemId));
                  return;
                }
                setSelectedItemList(items => {
                  const newItems = [...items];
                  newItems[idx()] = gemId;
                  return newItems;
                });
              } else {
                let equip = LoadData(draggedPanel, "equip");
                if (!equip) return;
                if (equipment_utils.EquipmentHasStates(player_equipments()[equip], true)) {
                  return;
                }
                if (selectedItemList().includes(equip)) {
                  setSelectedItemList(items => items.filter(i => i != equip));
                  return;
                }
                setSelectedItemList(items => {
                  const newItems = [...items];
                  newItems[idx()] = equip;
                  return newItems;
                });
              }
            });
            libs.setProp(_el$73, "onactivate", () => {
              setSelectSlot(idx());
            });
            libs.setProp(_el$73, "oncontextmenu", () => {
              const slotIndex = idx();
              const id = selectedItemList()[slotIndex];
              if (id) {
                setSelectedItemList(prev => prev.filter(i => i != id));
              }
            });
            libs.insert(_el$73, libs.createComponent(libs.Show, {
              get when() {
                return slotData();
              },
              keyed: true,
              get fallback() {
                return libs.createElement("Panel", {
                  id: "Empty"
                }, null);
              },
              children: data => libs.createComponent(BreakItemIcon, {
                data: data
              })
            }), null);
            libs.effect(_p$ => {
              const _v$30 = "BreakSlot" + idx(),
                _v$31 = libs.classNames("BreakSlot", {
                  Select: idx() == selectSlot()
                });
              _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$73, "id", _v$30, _p$._v$30));
              _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$73, "class", _v$31, _p$._v$31));
              return _p$;
            }, {
              _v$30: undefined,
              _v$31: undefined
            });
            return _el$73;
          })();
        }
      }));
      libs.insert(_el$38, libs.createComponent(libs.Show, {
        get when() {
          return selectedCount() > equipment_comp.BREAK_SLOT_NUM;
        },
        get children() {
          const _el$40 = libs.createElement("Label", {
            id: "BreakSelectCount",
            hittest: false,
            get text() {
              return GetLocalization("#Equipment_BreakSelectedCount");
            },
            get vars() {
              return {
                value: selectedCount()
              };
            }
          }, null);
          libs.effect(_p$ => {
            const _v$14 = GetLocalization("#Equipment_BreakSelectedCount"),
              _v$15 = {
                value: selectedCount()
              };
            _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$40, "text", _v$14, _p$._v$14));
            _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$40, "vars", _v$15, _p$._v$15));
            return _p$;
          }, {
            _v$14: undefined,
            _v$15: undefined
          });
          return _el$40;
        }
      }), _el$41);
      const _ref$2 = breakParticle;
      typeof _ref$2 === "function" ? libs.use(_ref$2, _el$42) : breakParticle = _el$42;
      libs.setProp(_el$44, "width", "100%");
      libs.setProp(_el$44, "verticalAlign", "center");
      libs.setProp(_el$44, "flowChildren", "down");
      libs.setProp(_el$45, "verticalAlign", "center");
      libs.insert(_el$44, libs.createComponent(libs.Show, {
        get when() {
          return currentLv() == MAX_LEVEL;
        },
        get fallback() {
          return (() => {
            const _el$76 = libs.createElement("Label", {
              get text() {
                return `Lv.${currentLv()}${addedLv() > 0 ? ToColor(`+${addedLv()}`, '#53b646') : ''}`;
              },
              html: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$76, "text", `Lv.${currentLv()}${addedLv() > 0 ? ToColor(`+${addedLv()}`, '#53b646') : ''}`, _$p));
            return _el$76;
          })();
        },
        get children() {
          const _el$46 = libs.createElement("Label", {
            get text() {
              return `Lv.${currentLv()}`;
            },
            html: true
          }, null);
          libs.effect(_$p => libs.setProp(_el$46, "text", `Lv.${currentLv()}`, _$p));
          return _el$46;
        }
      }), null);
      libs.setProp(_el$47, "tooltip_text", "#Equipment_BreakTips");
      libs.insert(_el$48, libs.createComponent(libs.Show, {
        get when() {
          return selectedCount() > 0;
        },
        get fallback() {
          return (() => {
            const _el$77 = libs.createElement("Label", {
              id: "SelectedBreakItemsEmpty",
              get text() {
                return GetLocalization("#Equipment_BreakSelectedListEmpty");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$77, "text", GetLocalization("#Equipment_BreakSelectedListEmpty"), _$p));
            return _el$77;
          })();
        },
        get children() {
          const _el$51 = libs.createElement("Panel", {
            id: "SelectedBreakItemList",
            "class": "VerticalScrollStyle",
            flowChildren: "right-wrap",
            scroll: "y"
          }, null);
          libs.setProp(_el$51, "flowChildren", "right-wrap");
          libs.setProp(_el$51, "scroll", "y");
          libs.insert(_el$51, libs.createComponent(libs.For, {
            get each() {
              return selectedItems();
            },
            children: id => {
              const itemData = () => isHuntlootMode() ? player_huntloots()[id] : isGemMode() ? player_gems()[id] : player_equipments()[id];
              return libs.createComponent(libs.Show, {
                get when() {
                  return itemData();
                },
                keyed: true,
                children: data => (() => {
                  const _el$78 = libs.createElement("Panel", {
                      "class": "SelectedBreakItem"
                    }, null),
                    _el$79 = libs.createElement("Panel", {
                      "class": "RemoveSelectedItemIcon",
                      hittest: false
                    }, _el$78);
                  libs.setProp(_el$78, "onmouseover", panel => {
                    if (isHuntlootMode()) {
                      huntloot_details.ShowServerHuntlootTooltip(panel, {
                        id1: id
                      });
                    } else if (isGemMode()) {
                      equipment_utils.ShowServerGemTooltip(panel, {
                        id1: id
                      });
                    } else {
                      equipment_utils.ShowServerEquipTooltip(panel, {
                        id1: id
                      });
                    }
                  });
                  libs.setProp(_el$78, "onmouseout", panel => HideCustomTooltip(panel, tooltipType()));
                  libs.setProp(_el$78, "onactivate", panel => removeSelectedItem(panel, id));
                  libs.setProp(_el$78, "oncontextmenu", panel => removeSelectedItem(panel, id));
                  libs.insert(_el$78, libs.createComponent(BreakItemIcon, {
                    data: data
                  }), _el$79);
                  return _el$78;
                })()
              });
            }
          }));
          return _el$51;
        }
      }), null);
      libs.insert(_el$52, libs.createComponent(EOM_Switch.EOM_Switch, {
        get selected() {
          return showSelectedItems();
        },
        onchange: (_, checked) => changeBreakView(checked)
      }), null);
      libs.insert(_el$54, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
        "class": "BreakTypeBreadcrumb",
        get list() {
          return [GetLocalization("#MenuTabButton_equipment"), GetLocalization("#MenuTabButton_gem"), GetLocalization("#MenuTabButton_huntloot")];
        },
        get selected() {
          return libs.memo(() => !!isHuntlootMode())() ? 3 : isGemMode() ? 2 : 1;
        },
        onChange: changeBreakType
      }), null);
      libs.insert(_el$54, libs.createComponent(libs.Show, {
        get when() {
          return isGemMode();
        },
        get fallback() {
          return [libs.createComponent(EOM_DropDown.EOM_DropDown, {
            type: "EquipmentDropDown",
            get index() {
              return fastAddRarity();
            },
            menuPosition: "top",
            onChange: (index, item) => {
              setFastAddRarity(index);
            },
            get children() {
              return [libs.createElement("Label", {
                text: "#ALL"
              }, null), libs.createComponent(libs.For, {
                get each() {
                  return Array(isHuntlootMode() ? huntloot_details.MAX_HUNTLOOT_RARITY : equipment_utils.MAX_EQUIPMENT_RARITY);
                },
                children: (_, idx) => {
                  const rarity = idx() + 1;
                  return (() => {
                    const _el$81 = libs.createElement("Label", {
                      get style() {
                        return {
                          color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                        };
                      },
                      get text() {
                        return GetLocalization("#Equipment_Rarity_" + rarity);
                      }
                    }, null);
                    libs.effect(_p$ => {
                      const _v$32 = {
                          color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                        },
                        _v$33 = GetLocalization("#Equipment_Rarity_" + rarity);
                      _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$81, "style", _v$32, _p$._v$32));
                      _v$33 !== _p$._v$33 && (_p$._v$33 = libs.setProp(_el$81, "text", _v$33, _p$._v$33));
                      return _p$;
                    }, {
                      _v$32: undefined,
                      _v$33: undefined
                    });
                    return _el$81;
                  })();
                }
              })];
            }
          }), libs.createComponent(equipment_comp.EquipmentCommonBtn, {
            text: "#Equipment_FastAdd",
            onactivate: () => {
              setSelectSlot(-1);
              setSelectedItemList(prev => {
                const addList = [];
                if (isHuntlootMode()) {
                  return Object.values(player_huntloots()).filter(item => !huntloot_details.HuntlootHasStates(item) && (fastAddRarity() === 0 || item.rarity === fastAddRarity())).sort((a, b) => a.rarity - b.rarity).slice(0, selectionLimit()).map(item => item.id);
                }
                let equipments = Object.values(player_equipments());
                let list = equipments.map(equip => [equip.id, equip]);
                list.sort((a, b) => {
                  const kvA = KeyValues.info_item_equipment[a[1].equipment_item_id];
                  const kvB = KeyValues.info_item_equipment[b[1].equipment_item_id];
                  if (!kvA || !kvB) return 0;
                  return kvA.rarity - kvB.rarity;
                });
                for (const [uid, equip] of list) {
                  if (addList.length >= selectionLimit()) break;
                  let id = toFiniteNumber(uid);
                  if (equipment_utils.EquipmentHasStates(equip)) continue;
                  const kv = KeyValues.info_item_equipment[equip.equipment_item_id];
                  if (!kv) continue;
                  const r = kv.rarity;
                  if (fastAddRarity() == 0 || r == fastAddRarity()) {
                    addList.push(id);
                  }
                }
                return addList.length > 0 ? addList : prev;
              });
            }
          })];
        },
        get children() {
          return [libs.createComponent(EOM_DropDown.EOM_DropDown, {
            type: "EquipmentDropDown",
            get index() {
              return fastAddRarity();
            },
            menuPosition: "top",
            onChange: (index, item) => {
              setFastAddRarity(index);
            },
            get children() {
              return [libs.createElement("Label", {
                text: "#ALL"
              }, null), (() => {
                const _el$56 = libs.createElement("Label", {
                  get style() {
                    return {
                      color: equipment_utils.EQUIP_RARITY_COLOR[4]
                    };
                  },
                  get text() {
                    return GetLocalization("#Equipment_Rarity_5");
                  }
                }, null);
                libs.effect(_p$ => {
                  const _v$16 = {
                      color: equipment_utils.EQUIP_RARITY_COLOR[4]
                    },
                    _v$17 = GetLocalization("#Equipment_Rarity_5");
                  _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$56, "style", _v$16, _p$._v$16));
                  _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$56, "text", _v$17, _p$._v$17));
                  return _p$;
                }, {
                  _v$16: undefined,
                  _v$17: undefined
                });
                return _el$56;
              })(), (() => {
                const _el$57 = libs.createElement("Label", {
                  get style() {
                    return {
                      color: equipment_utils.EQUIP_RARITY_COLOR[5]
                    };
                  },
                  get text() {
                    return GetLocalization("#Equipment_Rarity_6");
                  }
                }, null);
                libs.effect(_p$ => {
                  const _v$18 = {
                      color: equipment_utils.EQUIP_RARITY_COLOR[5]
                    },
                    _v$19 = GetLocalization("#Equipment_Rarity_6");
                  _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$57, "style", _v$18, _p$._v$18));
                  _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$57, "text", _v$19, _p$._v$19));
                  return _p$;
                }, {
                  _v$18: undefined,
                  _v$19: undefined
                });
                return _el$57;
              })()];
            }
          }), libs.createComponent(equipment_comp.EquipmentCommonBtn, {
            text: "#Equipment_FastAdd",
            onactivate: () => {
              setSelectSlot(-1);
              setSelectedItemList(prev => {
                const addList = [];
                let gems = Object.values(player_gems());
                gems.sort((a, b) => a.rarity - b.rarity);
                for (const gem of gems) {
                  if (addList.length >= selectionLimit()) break;
                  if (equipment_utils.GemHasStates(gem)) continue;
                  if (fastAddRarity() == 0 || gem.rarity == fastAddRarity() + 4) {
                    addList.push(gem.id);
                  }
                }
                return addList.length > 0 ? addList : prev;
              });
            }
          })];
        }
      }), null);
      const _ref$3 = expAnimBar;
      typeof _ref$3 === "function" ? libs.use(_ref$3, _el$59) : expAnimBar = _el$59;
      const _ref$4 = expBar;
      typeof _ref$4 === "function" ? libs.use(_ref$4, _el$60) : expBar = _el$60;
      const _ref$5 = expLabel;
      typeof _ref$5 === "function" ? libs.use(_ref$5, _el$61) : expLabel = _el$61;
      libs.insert(_el$58, libs.createComponent(libs.Show, {
        get when() {
          return addedLv() > 0;
        },
        get children() {
          return libs.createElement("Panel", {
            id: "UpgradeIcon"
          }, null);
        }
      }), null);
      libs.insert(_el$64, libs.createComponent(libs.Show, {
        get when() {
          return rewardList().length > 0;
        },
        get fallback() {
          return (() => {
            const _el$82 = libs.createElement("Label", {
              id: "BreakEmptyHint",
              get text() {
                return GetLocalization(selectedCount() > 0 ? "#Equipment_BreakNoItemReward" : "#Equipment_BreakEmptyHint");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$82, "text", GetLocalization(selectedCount() > 0 ? "#Equipment_BreakNoItemReward" : "#Equipment_BreakEmptyHint"), _$p));
            return _el$82;
          })();
        },
        get children() {
          const _el$65 = libs.createElement("Panel", {
              id: "BreakRewardContent"
            }, null),
            _el$66 = libs.createElement("Label", {
              id: "TipsText",
              get text() {
                return GetLocalization("#Equipment_Breakreward");
              }
            }, _el$65),
            _el$67 = libs.createElement("Panel", {
              id: "BreakRewardList",
              flowChildren: "right"
            }, _el$65);
          libs.setProp(_el$67, "flowChildren", "right");
          libs.insert(_el$67, libs.createComponent(libs.For, {
            get each() {
              return rewardList();
            },
            children: reward => (() => {
              const _el$83 = libs.createElement("Panel", {
                  "class": "RewardItem"
                }, null),
                _el$84 = libs.createElement("Label", {
                  get text() {
                    return reward.amount;
                  }
                }, _el$83);
              libs.insert(_el$83, libs.createComponent(StoreItem.StoreItemImage, {
                get itemid() {
                  return reward.itemID;
                }
              }), _el$84);
              libs.effect(_$p => libs.setProp(_el$84, "text", reward.amount, _$p));
              return _el$83;
            })()
          }));
          libs.effect(_$p => libs.setProp(_el$66, "text", GetLocalization("#Equipment_Breakreward"), _$p));
          return _el$65;
        }
      }));
      libs.insert(_el$69, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ConfirmBtn",
        get enabled() {
          return libs.memo(() => selectedCount() > 0)() && !breakingHuntloots();
        },
        color: "Confirm",
        get text() {
          return GetLocalization("#Equipment_Break");
        },
        onactivate: () => {
          const list = selectedItemList().filter(d => d != null);
          if (list.length == 0) {
            return;
          }
          if (breakingHuntloots()) return;
          if (isHuntlootMode()) {
            if (list.some(id => !player_huntloots()[id] || huntloot_details.HuntlootHasStates(player_huntloots()[id], true))) return;
            setBreakingHuntloots(true);
            CallActionRequest("/v1/huntloot/break", {
              ids: list
            }, result => {
              setBreakingHuntloots(false);
              if (result.code !== 0) {
                if (result.message) ErrorMessage(result.message);
                return;
              }
              if (isHuntlootMode()) {
                setSelectedItemList(items => items.filter(id => !list.includes(id)));
              }
              playBreakParticle();
            }, () => setBreakingHuntloots(false));
          } else if (isGemMode()) {
            if (list.some(id => equipment_utils.GemHasStates(player_gems()[id], true))) {
              return;
            }
            CallActionRequest("/v1/gem/break", {
              gem_ids: list
            }, () => {
              clearBreakSelection();
              playBreakParticle();
            });
          } else {
            const breakEquipments = () => {
              ServerRequest("break_equipment", {
                ids: list
              }, result => {
                if (result.code != 0 && result.code != 200) {
                  if (result.message != undefined) {
                    ErrorMessage(result.message);
                  }
                  return;
                }
                clearBreakSelection();
                playBreakParticle();
              });
            };
            if (list.some(id => equipmentHasGemEffect$1(player_equipments()[id]))) {
              CustomUIConfig.showPopup("CommonConfirm", {
                text: GetLocalization("#Equipment_BreakGemEffectConfirm"),
                title: GetLocalization("#Equipment_BreakConfirmTitle"),
                onconfirm: breakEquipments
              });
              return;
            }
            breakEquipments();
          }
        }
      }));
      libs.setProp(_el$70, "horizontalAlign", "center");
      libs.setProp(_el$70, "flowChildren", "right");
      libs.insert(_el$70, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        id: "AutoBreakSwitch",
        get checked() {
          return autoBreakEnabled();
        },
        get enabled() {
          return !autoBreakEnabledSaving();
        },
        get text() {
          return GetLocalization("#Equipment_AutoBreakEnabled");
        },
        onchecked: saveAutoBreakEnabled
      }), null);
      libs.insert(_el$70, libs.createComponent(EOM_Button.EOM_Button, {
        id: "AutoBreakBtn",
        size: "Small",
        get ["class"]() {
          return libs.classNames({
            Active: showAutoBreakWindow()
          });
        },
        onactivate: toggleAutoBreakWindow,
        get text() {
          return GetLocalization("#Equipment_AutoBreak");
        }
      }), null);
      libs.insert(_el$34, libs.createComponent(libs.Show, {
        get when() {
          return showAutoBreakWindow();
        },
        get children() {
          return libs.createComponent(AutoBreakWindow, {});
        }
      }), _el$71);
      libs.insert(_el$71, libs.createComponent(RecycleView.RecycleView, {
        id: "LvInfoList",
        direction: "Vertical",
        handle: h => lvInfoListHandle = h,
        input: () => BREAK_ATTR_LIST,
        childConfig: {
          width: 400,
          height: 109
        },
        paddingStart: 30,
        paddingEnd: 30,
        showBar: false,
        onload: () => {
          scheduleScrollToCurrentLv(true);
        },
        children: dataAccessor => {
          const attrs = libs.createMemo(() => {
            return dataAccessor().effect.split("|").map(pair => {
              const [name, value] = pair.split(":");
              return {
                name,
                value: Number(value)
              };
            });
          });
          return (() => {
            const _el$85 = libs.createElement("Panel", {
                get style() {
                  return {
                    zIndex: MAX_LEVEL - dataAccessor().level
                  };
                },
                get ["class"]() {
                  return libs.classNames("LvInfoItemContainer", {
                    Unlock: currentLv() >= dataAccessor().level,
                    Currentlv: currentLv() == dataAccessor().level,
                    Last: dataAccessor().level == MAX_LEVEL
                  });
                }
              }, null),
              _el$86 = libs.createElement("Panel", {
                id: "LvInfo"
              }, _el$85),
              _el$87 = libs.createElement("Label", {
                id: "Level",
                get text() {
                  return dataAccessor().level;
                }
              }, _el$86),
              _el$88 = libs.createElement("Panel", {
                align: "center center",
                flowChildren: "down"
              }, _el$86);
              libs.createElement("Panel", {
                id: "Line"
              }, _el$85);
            libs.setProp(_el$88, "align", "center center");
            libs.setProp(_el$88, "flowChildren", "down");
            libs.insert(_el$88, libs.createComponent(libs.For, {
              get each() {
                return attrs();
              },
              children: attr => (() => {
                const _el$90 = libs.createElement("Label", {
                  id: "Attr",
                  get text() {
                    return GetPropertyLocalization(attr.name, attr.value);
                  },
                  html: true
                }, null);
                libs.effect(_$p => libs.setProp(_el$90, "text", GetPropertyLocalization(attr.name, attr.value), _$p));
                return _el$90;
              })()
            }));
            libs.effect(_p$ => {
              const _v$34 = {
                  zIndex: MAX_LEVEL - dataAccessor().level
                },
                _v$35 = libs.classNames("LvInfoItemContainer", {
                  Unlock: currentLv() >= dataAccessor().level,
                  Currentlv: currentLv() == dataAccessor().level,
                  Last: dataAccessor().level == MAX_LEVEL
                }),
                _v$36 = dataAccessor().level;
              _v$34 !== _p$._v$34 && (_p$._v$34 = libs.setProp(_el$85, "style", _v$34, _p$._v$34));
              _v$35 !== _p$._v$35 && (_p$._v$35 = libs.setProp(_el$85, "class", _v$35, _p$._v$35));
              _v$36 !== _p$._v$36 && (_p$._v$36 = libs.setProp(_el$87, "text", _v$36, _p$._v$36));
              return _p$;
            }, {
              _v$34: undefined,
              _v$35: undefined,
              _v$36: undefined
            });
            return _el$85;
          })();
        }
      }), null);
      libs.insert(_el$71, libs.createComponent(libs.Show, {
        get when() {
          return addedAttr().length > 0;
        },
        get children() {
          return [libs.createComponent(equipment_comp.EquipSeparator, {
            id: "LvInfoSeparator",
            text: "#Equipment_AttributeLvInfo"
          }), (() => {
            const _el$72 = libs.createElement("Panel", {
              id: "AddedAttrList",
              scroll: "y",
              "class": "VerticalScrollStyle"
            }, null);
            libs.setProp(_el$72, "scroll", "y");
            libs.insert(_el$72, libs.createComponent(libs.Index, {
              get each() {
                return addedAttr();
              },
              children: data => {
                return (() => {
                  const _el$91 = libs.createElement("Label", {
                    "class": "AttrLabel",
                    get text() {
                      return GetPropertyLocalization(data().attrName, Number(data().value));
                    },
                    html: true
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$91, "text", GetPropertyLocalization(data().attrName, Number(data().value)), _$p));
                  return _el$91;
                })();
              }
            }));
            return _el$72;
          })()];
        }
      }), null);
      libs.effect(_p$ => {
        const _v$20 = libs.classNames(getBreakWindowClass()),
          _v$21 = !showSelectedItems(),
          _v$22 = showSelectedItems(),
          _v$23 = GetLocalization("#Equipment_BreakSelectedListTitle"),
          _v$24 = LocalizeWithVars("#Equipment_BreakSelectedCount", {
            value: selectedCount()
          }),
          _v$25 = GetLocalization("#Equipment_BreakListMode"),
          _v$26 = addedExp() > 0,
          _v$27 = `+${addedExp()}`,
          _v$28 = selectedItemTab() === "equipment",
          _v$29 = hiddenItemList() && !showAutoBreakWindow();
        _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$36, "class", _v$20, _p$._v$20));
        _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$38, "visible", _v$21, _p$._v$21));
        _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$48, "visible", _v$22, _p$._v$22));
        _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$49, "text", _v$23, _p$._v$23));
        _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$50, "text", _v$24, _p$._v$24));
        _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$53, "text", _v$25, _p$._v$25));
        _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$62, "visible", _v$26, _p$._v$26));
        _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$62, "text", _v$27, _p$._v$27));
        _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$70, "visible", _v$28, _p$._v$28));
        _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$71, "visible", _v$29, _p$._v$29));
        return _p$;
      }, {
        _v$20: undefined,
        _v$21: undefined,
        _v$22: undefined,
        _v$23: undefined,
        _v$24: undefined,
        _v$25: undefined,
        _v$26: undefined,
        _v$27: undefined,
        _v$28: undefined,
        _v$29: undefined
      });
      return _el$34;
    }
  });
};

function calculateMainAttributeData(attrData, classFactor, lvUpFactor, rarity) {
  const baseValue = KeyValues.equip_entry[attrData.id].value_min;
  const rarityBonus = KeyValues.equip_rarity_setting[rarity]?.main_bonus ?? 0;
  let changeValue = baseValue * (1 + classFactor + rarityBonus) * (1 + lvUpFactor);
  return changeValue;
}
function calculateAdverbAttributeData(attrData, classFactor, lvUpFactor, currentClass) {
  const currentClassBonus = KeyValues.equip_class_setting[currentClass]?.adverb_bonus ?? 0;
  let changeValue = attrData.value * (1 + classFactor) / (1 + currentClassBonus);
  return changeValue;
}
const ClassUPWindow = props => {
  const MAX_CLASS = Object.keys(KeyValues.equip_class_setting).length;
  const store = equipment_comp.useEquipmentStore();
  const [selectedItemID] = store.selectedItemID;
  const [, setShowTokens] = store.showTokens;
  const itemData = () => props.itemData();
  const equipClass = () => itemData()?.class ?? 0;
  const bMax = () => equipClass() >= MAX_CLASS;
  const lv = () => itemData()?.level ?? 0;
  const rarity = () => itemData()?.rarity ?? 0;
  const curClassKv = () => {
    return KeyValues.equip_class_setting[equipClass()];
  };
  const nextClassKv = () => {
    if (bMax()) {
      return;
    }
    return KeyValues.equip_class_setting[equipClass() + 1];
  };
  const lvSettingKv = () => {
    if (bMax()) {
      return;
    }
    return KeyValues.equip_level_setting[lv()];
  };
  const consumeList = libs.createMemo(() => {
    const kv = curClassKv();
    store.player_tokens();
    if (!kv || kv.consume == undefined) {
      return [];
    }
    return kv.consume.split("|").map(item => {
      let [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(d => d.needCount > 0);
  });
  libs.createEffect(() => {
    const tokens = consumeList().map(d => toFiniteNumber(d.itemID));
    setShowTokens(tokens);
  });
  const canStrengthen = libs.createMemo(() => consumeList().every(consume => consume.hasCount >= consume.needCount));
  libs.createEffect(() => {
    props.setLeftExtraContent?.((() => {
      const _el$ = libs.createElement("Panel", {
          id: "OperationBtns"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "ConsumeBtn",
          flowChildren: "down"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          horizontalAlign: "center",
          flowChildren: "right"
        }, _el$2);
      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ReturnBtn",
        get enabled() {
          return !props.requestPending?.();
        },
        text: "#MenuButton_Return",
        onactivate: () => props.onReturn?.()
      }), _el$2);
      libs.setProp(_el$2, "flowChildren", "down");
      libs.setProp(_el$3, "horizontalAlign", "center");
      libs.setProp(_el$3, "flowChildren", "right");
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return consumeList();
        },
        children: consume => {
          return (() => {
            const _el$4 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  });
                }
              }, null),
              _el$5 = libs.createElement("Label", {
                get text() {
                  return "X" + consume.needCount;
                }
              }, _el$4);
            libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return consume.itemID;
              }
            }), _el$5);
            libs.effect(_p$ => {
              const _v$ = libs.classNames("ComsumeItem", {
                  Enough: consume.hasCount >= consume.needCount
                }),
                _v$2 = "X" + consume.needCount;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$4;
          })();
        }
      }));
      libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
        get enabled() {
          return libs.memo(() => !!!bMax())() && canStrengthen();
        },
        get loading() {
          return props.requestPending?.();
        },
        color: "Confirm",
        get text() {
          return GetLocalization(bMax() ? "#Equipment_MaxLv" : "#Equipment_ClassUP");
        },
        onactivate: () => {
          props.startForgeAnimation?.(() => new Promise(resolve => {
            CallActionRequest("/v1/equip/classup", {
              id: selectedItemID()
            }, () => resolve(), () => resolve());
          }));
        }
      }), null);
      return _el$;
    })());
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        id: "ClassUPPanel",
        get ["class"]() {
          return libs.classNames({
            IsMax: bMax()
          }, "RarityColor" + rarity());
        }
      }, null);
      libs.createElement("Label", {
        "class": "WindowTitle",
        text: "#EquipmentTab_classup"
      }, _el$6);
      const _el$8 = libs.createElement("Label", {
        "class": "EquipName EquipRarityLabel",
        get text() {
          return "#" + itemData()?.equipment_item_id;
        }
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$6);
    libs.setProp(_el$9, "tooltip_text", "#EquipClassUpTips");
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return !bMax();
      },
      get children() {
        const _el$0 = libs.createElement("Panel", {
            id: "ShowClass"
          }, null),
          _el$1 = libs.createElement("Label", {
            id: "CurClass",
            get vars() {
              return {
                value: ToColor(String(equipClass()), "#EBD9B5")
              };
            },
            text: "#Equipment_ClassUPNum",
            html: true
          }, _el$0);
          libs.createElement("Image", {
            id: "Arrow"
          }, _el$0);
          const _el$11 = libs.createElement("Label", {
            id: "NextClass",
            get vars() {
              return {
                value: ToColor(String(equipClass() + 1), "#61C441")
              };
            },
            text: "#Equipment_ClassUPNum",
            html: true
          }, _el$0);
        libs.effect(_p$ => {
          const _v$3 = {
              value: ToColor(String(equipClass()), "#EBD9B5")
            },
            _v$4 = {
              value: ToColor(String(equipClass() + 1), "#61C441")
            };
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "vars", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$11, "vars", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$0;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "ClassUPNextSeparator",
      text: "#Equipment_ClassUPNext"
    }), null);
    libs.insert(_el$6, libs.createComponent(equipment_comp.AttrContainer, {
      get children() {
        return [libs.createComponent(libs.For, {
          get each() {
            return itemData()?.main_entry_data ?? [];
          },
          children: (data, index) => {
            return libs.createComponent(equipment_comp.AttrItem, {
              get index() {
                return index();
              },
              attrData: data,
              get changeValue() {
                return libs.memo(() => !!bMax())() ? undefined : calculateMainAttributeData(data, nextClassKv()?.main_bonus ?? 0, lvSettingKv()?.main_bonus ?? 0, rarity());
              },
              type: "Main"
            });
          }
        }), libs.createComponent(libs.For, {
          get each() {
            return itemData()?.adverb_entry_data ?? [];
          },
          children: (data, index) => {
            return libs.createComponent(equipment_comp.AttrItem, {
              get index() {
                return index();
              },
              attrData: data,
              get changeValue() {
                return libs.memo(() => !!bMax())() ? undefined : calculateAdverbAttributeData(data, nextClassKv()?.adverb_bonus ?? 0, lvSettingKv()?.adverb_bonus ?? 0, equipClass());
              },
              type: "Adverb"
            });
          }
        })];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames({
          IsMax: bMax()
        }, "RarityColor" + rarity()),
        _v$6 = "#" + itemData()?.equipment_item_id;
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$6, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$8, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$6;
  })();
};

const DRAWING_RARITY_COUNT = 7;
const DRAWING_BAG_MAX_CAPACITY = 400;
const DRAWING_ENTRY_FILTER_MODES = ["default", "include", "exclude"];
const DRAWING_MAIN_ENTRY_LIST = Object.entries(KeyValues.drawing_entry_main ?? {}).map(([id, entry]) => ({
  id,
  ...entry
})).sort((a, b) => Number(a.id) - Number(b.id));
const DRAWING_ADVERB_ENTRY_LIST = Object.values(KeyValues.drawing_entry ?? {}).sort((a, b) => a.id - b.id);
const EQUIP_PART_ICON$2 = {
  0: "icon_zb_01.png",
  1: "icon_zb_03.png",
  2: "icon_zb_08.png",
  3: "icon_zb_09.png",
  4: "icon_zb_07.png",
  5: "icon_zb_06.png",
  6: "icon_zb_05.png",
  7: "icon_zb_04.png",
  8: "icon_zb_02.png"
};
function compareDrawingIDs(a, b, allDrawings) {
  const drawingA = allDrawings[a];
  const drawingB = allDrawings[b];
  const rarityDiff = (drawingA?.rarity ?? 0) - (drawingB?.rarity ?? 0);
  if (rarityDiff != 0) {
    return rarityDiff;
  }
  const itemDiff = (drawingA?.drawing_item_id ?? 0) - (drawingB?.drawing_item_id ?? 0);
  if (itemDiff != 0) {
    return itemDiff;
  }
  return Number(a) - Number(b);
}
function getDrawingPart$1(data) {
  if (!data) {
    return 0;
  }
  const drawingKV = KeyValues.info_item_drawing[data.drawing_item_id];
  return toFiniteNumber(data.drawing_part ?? drawingKV?.drawing_part, 0);
}
function lockDrawing(id, lock) {
  CallAction("/v1/drawing/lock", {
    id: Number(id),
    lock
  });
}
function showDrawingContextMenu(panel, id, data) {
  const menus = {};
  if (data.locked) {
    menus["Hud_Equipment_Unlock"] = () => lockDrawing(id, false);
  } else {
    menus["Hud_Equipment_Lock"] = () => lockDrawing(id, true);
  }
  CustomUIConfig.showContextMenu(panel, menus);
}
const DrawingListPanel = props => {
  const drawingUnreadIds = solid_utils.createPlayerUnreadIds("drawing");
  const [showFilter, setShowFilter] = libs.createSignal(false);
  const [filterRarity, setFilterRarity] = libs.createSignal({});
  const [filterMainEntry, setFilterMainEntry] = libs.createSignal({});
  const [filterAdverbEntry, setFilterAdverbEntry] = libs.createSignal({});
  const [partFilter, setPartFilter] = libs.createSignal(0);
  const drawingBagCount = libs.createMemo(() => Object.keys(props.playerDrawings()).length);
  const isDrawingBagFull = libs.createMemo(() => drawingBagCount() >= DRAWING_BAG_MAX_CAPACITY);
  libs.onCleanup(() => drawingUnreadIds.submitReadCache());
  const activeRarityFilter = libs.createMemo(() => {
    const rarityFilter = filterRarity();
    return Object.keys(rarityFilter).reduce((result, rarity) => {
      if (rarityFilter[Number(rarity)]) {
        result[Number(rarity)] = true;
      }
      return result;
    }, {});
  });
  const activeMainEntryFilter = libs.createMemo(() => {
    const result = new Set();
    for (const [entryID, enabled] of Object.entries(filterMainEntry())) {
      if (enabled) {
        result.add(entryID);
      }
    }
    return result;
  });
  const activeAdverbEntryFilter = libs.createMemo(() => {
    const included = [];
    const excluded = [];
    for (const [entryID, mode] of Object.entries(filterAdverbEntry())) {
      if (mode === "include") {
        included.push(entryID);
      } else if (mode === "exclude") {
        excluded.push(entryID);
      }
    }
    return {
      included,
      excluded
    };
  });
  const drawingIDs = libs.createMemo(() => {
    const rarityFilter = activeRarityFilter();
    const hasRarityFilter = Object.keys(rarityFilter).length > 0;
    const mainEntryFilter = activeMainEntryFilter();
    const {
      included,
      excluded
    } = activeAdverbEntryFilter();
    const selectedPart = partFilter();
    const allDrawings = props.playerDrawings();
    return Object.keys(allDrawings).filter(id => {
      const drawingData = allDrawings[id];
      if (selectedPart > 0 && getDrawingPart$1(drawingData) != selectedPart) {
        return false;
      }
      if (hasRarityFilter && rarityFilter[drawingData?.rarity] !== true) {
        return false;
      }
      if (mainEntryFilter.size > 0) {
        const mainEntries = drawing_attr_row.parseDrawingEntries(drawingData?.main_entry_data);
        if (!mainEntries.some(entry => mainEntryFilter.has(String(entry.id)))) {
          return false;
        }
      }
      if (included.length > 0 || excluded.length > 0) {
        const drawingEntryIDs = new Set(drawing_attr_row.parseDrawingEntries(drawingData?.drawing_entry_data).map(entry => String(entry.id)));
        if (!included.every(entryID => drawingEntryIDs.has(entryID)) || !excluded.every(entryID => !drawingEntryIDs.has(entryID))) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => compareDrawingIDs(a, b, allDrawings));
  });
  const highlightMap = libs.createMemo(() => {
    const result = {};
    const ids = props.highlightIDs?.() ?? [];
    for (let index = 0; index < ids.length; index++) {
      result[ids[index]] = true;
    }
    return result;
  });
  const selectedDrawingData = libs.createMemo(() => {
    const id = props.selectedID?.();
    return id != undefined ? props.playerDrawings()[id] : undefined;
  });
  const setRarityFilterEnabled = (rarity, enabled) => {
    setFilterRarity(prev => {
      const next = {
        ...prev
      };
      if (enabled) {
        next[rarity] = true;
      } else {
        delete next[rarity];
      }
      return next;
    });
  };
  const setMainEntryFilterEnabled = (entryID, enabled) => {
    setFilterMainEntry(prev => {
      const next = {
        ...prev
      };
      if (enabled) {
        next[entryID] = true;
      } else {
        delete next[entryID];
      }
      return next;
    });
  };
  const selectAdverbEntryFilterMode = (entryID, mode) => {
    setFilterAdverbEntry(prev => {
      const next = {
        ...prev
      };
      if (mode === "default") {
        delete next[entryID];
      } else {
        next[entryID] = mode;
      }
      return next;
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "DrawingListRoot"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "DrawingListTop"
      }, _el$);
      libs.createElement("Image", {
        id: "DrawingListTopBG"
      }, _el$2);
      const _el$4 = libs.createElement("Label", {
        id: "DrawingListTopTitle",
        get ["class"]() {
          return libs.classNames({
            Full: isDrawingBagFull()
          });
        },
        get text() {
          return `${drawingBagCount()}/${DRAWING_BAG_MAX_CAPACITY}`;
        }
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        id: "DrawingListContent"
      }, _el$),
      _el$6 = libs.createElement("Panel", {
        id: "DrawingListBox"
      }, _el$5),
      _el$15 = libs.createElement("Panel", {
        id: "PartFilter"
      }, _el$5),
      _el$16 = libs.createElement("Panel", {
        id: "BtnsContainer"
      }, _el$),
      _el$17 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "right"
      }, _el$16),
      _el$18 = libs.createElement("Button", {
        id: "ResetBtn",
        "class": "SecondaryButtonStates"
      }, _el$17);
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return showFilter();
      },
      get fallback() {
        return libs.createComponent(RecycleView.RecycleView, {
          id: "DrawingsList",
          input: drawingIDs,
          direction: "VerticalGrid",
          wheelStep: 88,
          childConfig: {
            width: 88,
            height: 88,
            margin: 2
          },
          grid_children: () => libs.createElement("Panel", {
            "class": "EquipListGrid"
          }, null),
          children: id => {
            const drawingData = () => props.playerDrawings()[id()];
            const isNew = () => drawingUnreadIds.isUnread(id());
            return (() => {
              const _el$20 = libs.createElement("Panel", {
                  "class": "Item",
                  get onDragStart() {
                    return props.onDrawingDragStart(id);
                  },
                  get onDragEnd() {
                    return props.onDrawingDragEnd;
                  }
                }, null),
                _el$21 = libs.createElement("Panel", {
                  "class": "SelectedBorder",
                  hittest: false
                }, _el$20);
                libs.createElement("Panel", {
                  id: "NewTag",
                  hittest: false
                }, _el$20);
              libs.setProp(_el$20, "onmouseover", () => {
                if (isNew()) {
                  drawingUnreadIds.markRead(id());
                }
              });
              libs.insert(_el$20, libs.createComponent(server_equipment_drawing.EquipmentDrawingItem, libs.mergeProps$1(drawingData, {
                onactivate: () => props.onSelect?.(id()),
                oncontextmenu: panel => {
                  showDrawingContextMenu(panel, id(), drawingData());
                }
              })), _el$21);
              libs.effect(_p$ => {
                const _v$6 = {
                    Selected: props.selectedID?.() == id(),
                    InRecast: highlightMap()[id()] === true,
                    New: isNew()
                  },
                  _v$7 = props.onDrawingDragStart(id),
                  _v$8 = props.onDrawingDragEnd;
                _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$20, "classList", _v$6, _p$._v$6));
                _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$20, "onDragStart", _v$7, _p$._v$7));
                _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$20, "onDragEnd", _v$8, _p$._v$8));
                return _p$;
              }, {
                _v$6: undefined,
                _v$7: undefined,
                _v$8: undefined
              });
              return _el$20;
            })();
          }
        });
      },
      get children() {
        const _el$7 = libs.createElement("Panel", {
            id: "DrawingFilterWindow",
            "class": "VerticalScrollStyle",
            scroll: "y"
          }, null),
          _el$8 = libs.createElement("Label", {
            id: "RarityLabel",
            "class": "Subheading FirstFilterHeading",
            get text() {
              return GetLocalization("#Equipment_Rarity");
            }
          }, _el$7);
          libs.createElement("Panel", {
            "class": "FilterLine"
          }, _el$7);
          const _el$0 = libs.createElement("Panel", {
            id: "RarityFilterList",
            "class": "CheckBoxList"
          }, _el$7),
          _el$1 = libs.createElement("Label", {
            "class": "Subheading",
            get text() {
              return GetLocalization("#Equipment_SelectMainEntry");
            }
          }, _el$7);
          libs.createElement("Panel", {
            "class": "FilterLine"
          }, _el$7);
          const _el$11 = libs.createElement("Panel", {
            id: "DrawingMainEntryFilterList"
          }, _el$7),
          _el$12 = libs.createElement("Label", {
            "class": "Subheading",
            get text() {
              return GetLocalization("#Equipment_SelectSubEntry");
            }
          }, _el$7);
          libs.createElement("Panel", {
            "class": "FilterLine"
          }, _el$7);
          const _el$14 = libs.createElement("Panel", {
            id: "DrawingAdverbEntryFilterList"
          }, _el$7);
        libs.setProp(_el$7, "scroll", "y");
        libs.insert(_el$0, libs.createComponent(libs.For, {
          get each() {
            return Array(DRAWING_RARITY_COUNT);
          },
          children: (_, idx) => {
            const rarity = idx() + 1;
            return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
              "class": "Rarity" + rarity,
              get checked() {
                return filterRarity()[rarity] ?? false;
              },
              get text() {
                return GetLocalization(`#Equipment_Rarity_${rarity}`);
              },
              onchecked: b => {
                setRarityFilterEnabled(rarity, b);
              }
            });
          }
        }));
        libs.insert(_el$11, libs.createComponent(libs.For, {
          each: DRAWING_MAIN_ENTRY_LIST,
          children: entry => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
            get checked() {
              return filterMainEntry()[entry.id] ?? false;
            },
            get text() {
              return drawing_attr_row.getDrawingMainEntryText(entry);
            },
            onchecked: enabled => setMainEntryFilterEnabled(entry.id, enabled)
          })
        }));
        libs.insert(_el$14, libs.createComponent(libs.For, {
          each: DRAWING_ADVERB_ENTRY_LIST,
          children: entry => {
            const mode = () => filterAdverbEntry()[entry.entry_name] ?? "default";
            const propertyName = entry.entry_name.replace(/^drawing_/, "");
            return (() => {
              const _el$23 = libs.createElement("Panel", {
                  "class": "DrawingAdverbEntryFilterRow"
                }, null),
                _el$24 = libs.createElement("Label", {
                  html: true,
                  "class": "DrawingAdverbEntryName",
                  get text() {
                    return GetLocalization(`#property_${propertyName}`).replace("%", "");
                  }
                }, _el$23),
                _el$25 = libs.createElement("Panel", {
                  "class": "DrawingAdverbEntryMode"
                }, _el$23);
              libs.insert(_el$25, libs.createComponent(libs.For, {
                each: DRAWING_ENTRY_FILTER_MODES,
                children: (filterMode, index) => (() => {
                  const _el$26 = libs.createElement("Panel", {
                      "class": "DrawingAdverbEntryModeOption"
                    }, null),
                    _el$27 = libs.createElement("Button", {
                      get ["class"]() {
                        return libs.classNames("DrawingAdverbEntryModeButton", filterMode, {
                          Selected: mode() === filterMode
                        });
                      }
                    }, _el$26),
                    _el$28 = libs.createElement("Label", {
                      get text() {
                        return GetLocalization(`#Equipment_GemSubFilter_${filterMode}`);
                      }
                    }, _el$27);
                  libs.setProp(_el$27, "onactivate", () => selectAdverbEntryFilterMode(entry.entry_name, filterMode));
                  libs.insert(_el$26, libs.createComponent(libs.Show, {
                    get when() {
                      return index() < DRAWING_ENTRY_FILTER_MODES.length - 1;
                    },
                    get children() {
                      return libs.createElement("Label", {
                        "class": "DrawingAdverbEntryModeSeparator",
                        text: "/"
                      }, null);
                    }
                  }), null);
                  libs.effect(_p$ => {
                    const _v$9 = libs.classNames("DrawingAdverbEntryModeButton", filterMode, {
                        Selected: mode() === filterMode
                      }),
                      _v$0 = GetLocalization(`#Equipment_GemSubFilter_${filterMode}`);
                    _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$27, "class", _v$9, _p$._v$9));
                    _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$28, "text", _v$0, _p$._v$0));
                    return _p$;
                  }, {
                    _v$9: undefined,
                    _v$0: undefined
                  });
                  return _el$26;
                })()
              }));
              libs.effect(_$p => libs.setProp(_el$24, "text", GetLocalization(`#property_${propertyName}`).replace("%", ""), _$p));
              return _el$23;
            })();
          }
        }));
        libs.effect(_p$ => {
          const _v$ = GetLocalization("#Equipment_Rarity"),
            _v$2 = GetLocalization("#Equipment_SelectMainEntry"),
            _v$3 = GetLocalization("#Equipment_SelectSubEntry");
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$8, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$12, "text", _v$3, _p$._v$3));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined
        });
        return _el$7;
      }
    }));
    libs.insert(_el$15, libs.createComponent(libs.For, {
      get each() {
        return [0, ...equipment_utils.EQUIP_PARTS];
      },
      children: part => (() => {
        const _el$30 = libs.createElement("Button", {
            get id() {
              return part.toString();
            },
            "class": "PartTab"
          }, null),
          _el$31 = libs.createElement("Image", {
            id: "PartIcon",
            get src() {
              return getSrcPath(`conv/icon/${EQUIP_PART_ICON$2[part]}`);
            }
          }, _el$30);
        libs.setProp(_el$30, "onactivate", () => setPartFilter(part));
        libs.effect(_p$ => {
          const _v$1 = part.toString(),
            _v$10 = {
              Selected: partFilter() == part
            },
            _v$11 = getSrcPath(`conv/icon/${EQUIP_PART_ICON$2[part]}`);
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$30, "id", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$30, "classList", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$31, "src", _v$11, _p$._v$11));
          return _p$;
        }, {
          _v$1: undefined,
          _v$10: undefined,
          _v$11: undefined
        });
        return _el$30;
      })()
    }));
    libs.setProp(_el$17, "align", "center center");
    libs.setProp(_el$17, "flowChildren", "right");
    libs.insert(_el$17, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
      id: "FilterBtn",
      get classList() {
        return {
          ShowBtnBorder: showFilter()
        };
      },
      get text() {
        return GetLocalization("#Hud_Equipment_Filter");
      },
      onactivate: () => {
        setShowFilter(prev => !prev);
      }
    }), _el$18);
    libs.setProp(_el$18, "onactivate", () => {
      setFilterRarity({});
      setFilterMainEntry({});
      setFilterAdverbEntry({});
      setPartFilter(0);
    });
    libs.insert(_el$17, libs.createComponent(libs.Show, {
      get when() {
        return props.selectedID != undefined;
      },
      get fallback() {
        return libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          opacity: "0"
        });
      },
      get children() {
        return libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          get text() {
            return GetLocalization(selectedDrawingData()?.locked ? "#Hud_Equipment_Unlock" : "#Hud_Equipment_Lock");
          },
          get enabled() {
            return selectedDrawingData() != undefined;
          },
          onactivate: () => {
            const id = props.selectedID?.();
            const data = selectedDrawingData();
            if (id != undefined && data != undefined) {
              lockDrawing(id, !data.locked);
            }
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = libs.classNames({
          Full: isDrawingBagFull()
        }),
        _v$5 = `${drawingBagCount()}/${DRAWING_BAG_MAX_CAPACITY}`;
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$4, "class", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$4, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$;
  })();
};

function findEquipIDByDrawingKV(drawingKV) {
  for (const equipID in KeyValues.info_item_equipment) {
    const equipKV = KeyValues.info_item_equipment[equipID];
    if (equipKV.class === drawingKV.class && equipKV.equip_part === drawingKV.drawing_part && equipKV.rarity === drawingKV.rarity) {
      return equipKV.id;
    }
  }
}
function getDrawingSelectConfig(mainEntryType) {
  switch (mainEntryType) {
    case "drawing_3":
      return {
        payloadKey: "adverb_entry_ids"
      };
    case "drawing_4":
      return {
        payloadKey: "ability_entry_ids"
      };
    case "drawing_5":
      return {
        payloadKey: "myth_entry_ids"
      };
    case "drawing_6":
      return {
        payloadKey: "chaos_entry_ids"
      };
  }
}
function matchEquipEntryByMainEntryType(mainEntryType, entryType) {
  switch (mainEntryType) {
    case "drawing_3":
      return entryType === 2;
    case "drawing_4":
      return entryType === 3;
    case "drawing_5":
      return entryType === 4;
    case "drawing_6":
      return entryType === 5;
    default:
      return false;
  }
}
function getDrawingDropDownOptionLabel(entryID, entryKV) {
  switch (entryKV.entry_type) {
    case 2:
      {
        const labelInfo = attribute_formatter.formatAttributeNameHtml({
          id: entryID
        }, {
          config: {
            ratio: entryKV.ratio ?? CustomUIConfig.EntryRatio[entryID] ?? 1,
            value_min: entryKV.value_min,
            value_max: entryKV.value_max
          }
        });
        return {
          id: entryID,
          label: labelInfo.nameHtml,
          html: true
        };
      }
    case 3:
      return {
        id: entryID,
        label: GetLocalization(entryKV.entry_name),
        html: true
      };
    case 4:
      return {
        id: entryID,
        label: GetPrivilegeDesc(entryID, 1, {
          min: entryKV.value_min,
          max: entryKV.value_max
        }).replace(/%value%%?/g, ""),
        html: true
      };
    case 5:
      return {
        id: entryID,
        label: attribute_formatter.formatAttributeNameHtml({
          id: entryID
        }, {
          config: {
            ratio: entryKV.ratio ?? CustomUIConfig.EntryRatio[entryID] ?? 1,
            value_min: entryKV.value_min,
            value_max: entryKV.value_max
          }
        }).nameHtml,
        html: true
      };
  }
}
function buildDrawingDetailViewModel(id, drawingData, heroLevel) {
  if (!drawingData) {
    return;
  }
  const drawingItemID = drawingData.drawing_item_id;
  const drawingKV = KeyValues.info_item_drawing[drawingItemID];
  if (!drawingKV) {
    return;
  }
  const drawingClassSetting = KeyValues.drawing_class_setting[drawingKV.class];
  const equipID = findEquipIDByDrawingKV(drawingKV);
  if (!equipID) {
    return;
  }
  const equipKV = KeyValues.info_item_equipment[equipID];
  if (!equipKV) {
    return;
  }
  const equipClassSetting = KeyValues.equip_class_setting[equipKV.class];
  const equipRaritySetting = KeyValues.equip_rarity_setting[equipKV.rarity];
  const mainEntry = drawing_attr_row.getDrawingMainEntry(drawingData);
  const selectConfig = getDrawingSelectConfig(mainEntry?.entry_main_type);
  const equipEntries = drawing_attr_row.parseDrawingEntries(drawingData.drawing_entry_data);
  const potentialBonus = mainEntry?.entry_main_type === "drawing_2" ? mainEntry.value_1 ?? 0 : 0;
  const consumeList = [];
  const drawingCost = drawingClassSetting?.drawing_cost;
  if (drawingCost) {
    for (const itemID in drawingCost) {
      consumeList.push({
        itemID,
        needCount: drawingCost[itemID]
      });
    }
  }
  return {
    equipId: equipID.toString(),
    rarity: drawingData.rarity ?? 0,
    equipClass: equipKV.class,
    potentialMin: (equipRaritySetting?.potential_num_min ?? 0) + potentialBonus,
    potentialMax: (equipRaritySetting?.potential_num_max ?? 0) + potentialBonus,
    needLevel: equipClassSetting?.need_level ?? 1,
    canWear: heroLevel >= (equipClassSetting?.need_level ?? 1),
    mainEntry,
    equipEntries,
    selectPayloadKey: selectConfig?.payloadKey,
    selectCount: Math.max(1, mainEntry?.value_1 ?? 1),
    consumeList
  };
}
function DrawingMakeContent(props) {
  const [requesting, setRequesting] = libs.createSignal(false);
  const drawingCraftAccountID = libs.createMemo(() => Steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
  const [selectedDropDownEntryID, setSelectedDropDownEntryID] = libs.createSignal();
  const [selectedDropDownEntryIDs, setSelectedDropDownEntryIDs] = libs.createSignal([]);
  let multiDropDownRef;
  const selectedItemData = libs.createMemo(() => {
    const id = props.selectedID();
    if (!id) {
      return;
    }
    return props.playerDrawings()[id];
  });
  const selectedDetailVM = libs.createMemo(() => {
    const id = props.selectedID();
    if (!id) {
      return;
    }
    const heroLevel = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
    return buildDrawingDetailViewModel(id, props.playerDrawings()[id], heroLevel);
  });
  const dropDownOptions = libs.createMemo(() => {
    const detailVM = selectedDetailVM();
    const mainEntryType = detailVM?.mainEntry?.entry_main_type;
    if (!mainEntryType || !detailVM?.selectPayloadKey) {
      return [];
    }
    const options = [];
    for (const entryID in KeyValues.equip_entry) {
      const entryKV = KeyValues.equip_entry[entryID];
      if (matchEquipEntryByMainEntryType(mainEntryType, entryKV.entry_type)) {
        const option = getDrawingDropDownOptionLabel(entryID, entryKV);
        if (!option) {
          continue;
        }
        options.push({
          sortID: entryKV.id,
          option
        });
      }
    }
    return options.sort((a, b) => a.sortID - b.sortID).map(item => item.option);
  });
  const selectedDropDownIndex = libs.createMemo(() => {
    const selectedEntryID = selectedDropDownEntryID();
    if (!selectedEntryID) {
      return -1;
    }
    return dropDownOptions().findIndex(option => option.id === selectedEntryID);
  });
  const isMultiSelect = libs.createMemo(() => {
    const detailVM = selectedDetailVM();
    return detailVM?.selectPayloadKey != undefined && detailVM.selectCount > 1;
  });
  const selectedDropDownEntryIDMap = libs.createMemo(() => {
    const result = {};
    const selectedIDs = selectedDropDownEntryIDs();
    for (let index = 0; index < selectedIDs.length; index++) {
      result[selectedIDs[index]] = true;
    }
    return result;
  });
  function resetSelectState() {
    setSelectedDropDownEntryID();
    setSelectedDropDownEntryIDs([]);
    multiDropDownRef?.reset();
  }
  const canCraft = libs.createMemo(() => {
    const detailVM = selectedDetailVM();
    const id = props.selectedID();
    if (!detailVM || !id || requesting()) {
      return false;
    }
    if (detailVM.selectPayloadKey) {
      if (detailVM.selectCount > 1) {
        return selectedDropDownEntryIDs().length === detailVM.selectCount;
      }
      return selectedDropDownIndex() >= 0;
    }
    return true;
  });
  libs.createEffect(() => {
    props.selectedID();
    resetSelectState();
  });
  function getMultiSelectPlaceholder() {
    const detailVM = selectedDetailVM();
    const selectedCount = Object.values(selectedDropDownEntryIDMap()).filter(Boolean).length;
    return `${drawing_attr_row.getDrawingMainEntryText(detailVM?.mainEntry)} (${selectedCount}/${detailVM?.selectCount ?? 0})`;
  }
  function handleMultiSelectChange(value) {
    const detailVM = selectedDetailVM();
    const maxSelectCount = detailVM?.selectCount ?? 1;
    const selectedIDs = [];
    const normalizedValue = {};
    const options = dropDownOptions();
    for (let index = 0; index < options.length; index++) {
      const optionID = options[index].id;
      if (value[optionID] === true && selectedIDs.length < maxSelectCount) {
        selectedIDs.push(optionID);
        normalizedValue[optionID] = true;
      } else {
        normalizedValue[optionID] = false;
      }
    }
    if (selectedIDs.length !== Object.values(value).filter(Boolean).length) {
      multiDropDownRef?.setSelect(normalizedValue);
    }
    setSelectedDropDownEntryID();
    setSelectedDropDownEntryIDs(selectedIDs);
  }
  function buildCraftPayload() {
    const detailVM = selectedDetailVM();
    const drawingID = props.selectedID();
    if (!detailVM || !drawingID) {
      return undefined;
    }
    const payload = {
      drawing_id: Number(drawingID)
    };
    if (detailVM.selectPayloadKey) {
      if (detailVM.selectCount > 1) {
        const selectedEntryIDs = selectedDropDownEntryIDs();
        if (selectedEntryIDs.length !== detailVM.selectCount) {
          return undefined;
        }
        payload[detailVM.selectPayloadKey] = selectedEntryIDs;
      } else {
        const selectedEntryID = selectedDropDownEntryID();
        if (!selectedEntryID || selectedDropDownIndex() < 0) {
          return undefined;
        }
        payload[detailVM.selectPayloadKey] = [selectedEntryID];
      }
    }
    return payload;
  }
  function handleCraft() {
    if (requesting()) {
      return;
    }
    const payload = buildCraftPayload();
    if (!payload) {
      return;
    }
    setRequesting(true);
    CallActionRequest("/v1/drawing/craft", payload, () => {
      setRequesting(false);
    }, () => {
      setRequesting(false);
    });
  }
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "DrawingMakePanelRoot"
    }, null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "ActionSlot",
      get classList() {
        return {
          HasDrawing: selectedItemData() != undefined
        };
      },
      get onDragEnter() {
        return props.onActionSlotDragEnter;
      },
      get onDragLeave() {
        return props.onActionSlotDragLeave;
      },
      get onDragDrop() {
        return props.onActionSlotDrop;
      },
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return selectedItemData();
          },
          get children() {
            return libs.createComponent(server_equipment_drawing.EquipmentDrawingItem, libs.mergeProps$1(() => selectedItemData(), {
              oncontextmenu: () => props.setSelectedID(),
              get onDragStart() {
                return props.onDrawingDragStart;
              },
              get onDragEnd() {
                return props.onDrawingDragEnd;
              }
            }));
          }
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return selectedItemData();
      },
      get fallback() {
        return [libs.createElement("Label", {
          id: "EmptyTitle",
          text: "#EquipmentDrawing_SelectDrawing"
        }, null), libs.createElement("Label", {
          id: "EmptyDesc",
          text: "#EquipmentDrawing_SelectDrawingDesc",
          html: true
        }, null)];
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            id: "DrawingDetail"
          }, null),
          _el$3 = libs.createElement("Panel", {
            id: "DetailNameRow"
          }, _el$2);
          libs.createElement("Label", {
            id: "DetailName",
            text: "#Equipment_PutDrawing"
          }, _el$3);
          const _el$5 = libs.createElement("Panel", {
            id: "PreviewTitleRow"
          }, _el$2);
          libs.createElement("Panel", {
            id: "PreviewLineLeft"
          }, _el$5);
          libs.createElement("Label", {
            id: "PreviewTitle",
            text: "#Equipment_Preview"
          }, _el$5);
          libs.createElement("Panel", {
            id: "PreviewLineRight"
          }, _el$5);
          const _el$9 = libs.createElement("Panel", {
            id: "DetailInfo"
          }, _el$2),
          _el$0 = libs.createElement("Panel", {
            id: "DetailInfoLeft"
          }, _el$9),
          _el$1 = libs.createElement("Label", {
            id: "EquipPreviewName",
            get text() {
              return "#" + (selectedDetailVM()?.equipId ?? "");
            }
          }, _el$0),
          _el$10 = libs.createElement("Panel", {
            flowChildren: "right"
          }, _el$0),
          _el$11 = libs.createElement("Panel", {
            id: "EquipPreviewPotential"
          }, _el$10),
          _el$12 = libs.createElement("Label", {
            text: "#Equip_RemainingPotentialM",
            get vars() {
              return {
                min: selectedDetailVM()?.potentialMin ?? 0,
                max: selectedDetailVM()?.potentialMax ?? 0
              };
            }
          }, _el$11),
          _el$13 = libs.createElement("Panel", {
            id: "EquipPreviewCraftBy"
          }, _el$10);
          libs.createElement("Label", {
            text: "#Equipment_Maker"
          }, _el$13);
          const _el$15 = libs.createElement("Panel", {
            id: "EquipPreviewDiff"
          }, _el$0),
          _el$16 = libs.createElement("Label", {
            "class": "InfoLabel",
            get vars() {
              return {
                value: selectedDetailVM()?.equipClass ?? 0
              };
            },
            text: "#Equip_Class"
          }, _el$15),
          _el$17 = libs.createElement("Label", {
            "class": "InfoLabel",
            get vars() {
              return {
                value: selectedDetailVM()?.canWear ? selectedDetailVM()?.needLevel.toString() ?? "1" : ToColor(selectedDetailVM()?.needLevel.toString() ?? "1", "#E55043")
              };
            },
            text: "#Equip_NeedLevel",
            html: true
          }, _el$15),
          _el$18 = libs.createElement("Panel", {
            id: "DetailInfoRight"
          }, _el$9),
          _el$19 = libs.createElement("Panel", {
            id: "EquipPreviewIconWrap"
          }, _el$18),
          _el$21 = libs.createElement("Panel", {
            id: "MakeBtnArea"
          }, _el$2),
          _el$22 = libs.createElement("Panel", {
            id: "MakeConsumeRow"
          }, _el$21);
        libs.setProp(_el$10, "flowChildren", "right");
        libs.insert(_el$13, libs.createComponent(Player.PlayerName, {
          get accountid() {
            return drawingCraftAccountID();
          }
        }), null);
        libs.insert(_el$19, libs.createComponent(server_equipment.EquipmentIcon, {
          get equipment_item_id() {
            return Number(selectedDetailVM()?.equipId ?? 0);
          },
          get rarity() {
            return selectedDetailVM()?.rarity ?? 1;
          }
        }));
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return selectedDetailVM()?.selectPayloadKey != undefined;
          },
          get fallback() {
            return libs.createComponent(libs.Show, {
              get when() {
                return selectedDetailVM()?.mainEntry;
              },
              get children() {
                const _el$25 = libs.createElement("Label", {
                  "class": "DrawingMainEntry",
                  get text() {
                    return drawing_attr_row.getDrawingMainEntryText(selectedDetailVM()?.mainEntry);
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$25, "text", drawing_attr_row.getDrawingMainEntryText(selectedDetailVM()?.mainEntry), _$p));
                return _el$25;
              }
            });
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return isMultiSelect();
              },
              get fallback() {
                return libs.createComponent(EOM_DropDown.EOM_DropDown, {
                  id: "DrawingEntryDropDown",
                  type: "EquipmentDropDown",
                  get index() {
                    return selectedDropDownIndex();
                  },
                  get placeholder() {
                    return drawing_attr_row.getDrawingMainEntryText(selectedDetailVM()?.mainEntry);
                  },
                  onChange: index => {
                    const option = dropDownOptions()[index];
                    setSelectedDropDownEntryID(option?.id);
                  },
                  onClear: () => {
                    setSelectedDropDownEntryID();
                  },
                  get children() {
                    return libs.createComponent(libs.For, {
                      get each() {
                        return dropDownOptions();
                      },
                      children: option => (() => {
                        const _el$26 = libs.createElement("Label", {
                          get text() {
                            return option.label;
                          },
                          get html() {
                            return option.html;
                          }
                        }, null);
                        libs.effect(_p$ => {
                          const _v$5 = option.label,
                            _v$6 = option.html;
                          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$26, "text", _v$5, _p$._v$5));
                          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$26, "html", _v$6, _p$._v$6));
                          return _p$;
                        }, {
                          _v$5: undefined,
                          _v$6: undefined
                        });
                        return _el$26;
                      })()
                    });
                  }
                });
              },
              get children() {
                const _el$20 = libs.createElement("Panel", {
                  id: "DrawingEntryMultiDropDown"
                }, null);
                libs.insert(_el$20, libs.createComponent(EOM_MultiDropDown.EOM_MultiDropDown, {
                  ref: ref => {
                    multiDropDownRef = ref;
                  },
                  get options() {
                    return dropDownOptions().map(option => option.id);
                  },
                  get placeholder() {
                    return getMultiSelectPlaceholder();
                  },
                  localizeFunc: id => {
                    return dropDownOptions().find(option => option.id === id)?.label ?? id;
                  },
                  onChange: handleMultiSelectChange
                }));
                return _el$20;
              }
            });
          }
        }), _el$21);
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return (selectedDetailVM()?.equipEntries.length ?? 0) > 0;
          },
          get children() {
            return libs.createComponent(equipment_comp.AttrContainer, {
              get children() {
                return libs.createComponent(libs.Index, {
                  get each() {
                    return selectedDetailVM()?.equipEntries ?? [];
                  },
                  children: data => libs.createComponent(drawing_attr_row.DrawingAttrRow, {
                    get data() {
                      return data();
                    },
                    "class": "AttrItem Adverb",
                    valueId: "AttributeValue",
                    nameId: "AttributeName"
                  })
                });
              }
            });
          }
        }), _el$21);
        libs.insert(_el$22, libs.createComponent(libs.For, {
          get each() {
            return selectedDetailVM()?.consumeList ?? [];
          },
          children: consume => (() => {
            const _el$27 = libs.createElement("Panel", {
                "class": "MakeConsumeItem"
              }, null),
              _el$28 = libs.createElement("Label", {
                get text() {
                  return "X" + consume.needCount;
                }
              }, _el$27);
            libs.insert(_el$27, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return consume.itemID;
              }
            }), _el$28);
            libs.effect(_$p => libs.setProp(_el$28, "text", "X" + consume.needCount, _$p));
            return _el$27;
          })()
        }));
        libs.insert(_el$21, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          text: "#EquipmentDrawing_Make",
          get enabled() {
            return canCraft();
          },
          get loading() {
            return requesting();
          },
          onactivate: handleCraft
        }), null);
        libs.effect(_p$ => {
          const _v$ = "#" + (selectedDetailVM()?.equipId ?? ""),
            _v$2 = {
              min: selectedDetailVM()?.potentialMin ?? 0,
              max: selectedDetailVM()?.potentialMax ?? 0
            },
            _v$3 = {
              value: selectedDetailVM()?.equipClass ?? 0
            },
            _v$4 = {
              value: selectedDetailVM()?.canWear ? selectedDetailVM()?.needLevel.toString() ?? "1" : ToColor(selectedDetailVM()?.needLevel.toString() ?? "1", "#E55043")
            };
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$1, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$12, "vars", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$16, "vars", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$17, "vars", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$2;
      }
    }), null);
    return _el$;
  })();
}
const EquipmentDrawingMake = () => {
  const playerDrawings = solid_utils.createServiceNetData("player_drawings", {});
  const [selectedID, setSelectedID] = libs.createSignal();
  const createDrawingDragStart = getID => {
    return (panel, dragCallbacks) => {
      const id = getID();
      const data = id ? playerDrawings()[id] : undefined;
      if (!id || !data) {
        return;
      }
      const pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
      const d = {
        ...data
      };
      libs.render(() => libs.createComponent(server_equipment_drawing.EquipmentDrawingItem, libs.mergeProps$1(d, {
        showTooltip: false
      })), pDisplayPanel);
      dragCallbacks.displayPanel = pDisplayPanel;
      const position = GameUI.GetCursorPosition();
      if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
        dragCallbacks.offsetX = pDisplayPanel.GetPositionWithinWindow().x - position[0];
        dragCallbacks.offsetY = pDisplayPanel.GetPositionWithinWindow().y - position[1];
      }
      panel.AddClass("dragging_from");
      SaveData(pDisplayPanel, "drawing", id);
      return true;
    };
  };
  const handleDrawingDragEnd = (panel, draggedPanel) => {
    draggedPanel.DeleteAsync(-1);
    panel.RemoveClass("dragging_from");
  };
  const handleDropToActionSlot = (pPanel, draggedPanel) => {
    pPanel.RemoveClass("potential_drop_target");
    const drawingID = LoadData(draggedPanel, "drawing");
    if (drawingID == undefined) {
      return;
    }
    setSelectedID(drawingID);
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipmentDrawingRoot",
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        id: "BGLight",
        particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), (() => {
        const _el$30 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$31 = libs.createElement("Panel", {
            id: "ActionPanelRoot"
          }, _el$30);
        libs.insert(_el$31, libs.createComponent(DrawingMakeContent, {
          selectedID: selectedID,
          setSelectedID: setSelectedID,
          playerDrawings: playerDrawings,
          onActionSlotDrop: handleDropToActionSlot,
          onActionSlotDragEnter: (pPanel, draggedPanel) => {
            if (LoadData(draggedPanel, "drawing")) {
              pPanel.AddClass("potential_drop_target");
            }
          },
          onActionSlotDragLeave: pPanel => {
            pPanel.RemoveClass("potential_drop_target");
          },
          get onDrawingDragStart() {
            return createDrawingDragStart(selectedID);
          },
          onDrawingDragEnd: handleDrawingDragEnd
        }));
        libs.insert(_el$30, libs.createComponent(DrawingListPanel, {
          playerDrawings: playerDrawings,
          selectedID: selectedID,
          onSelect: setSelectedID,
          onDrawingDragStart: createDrawingDragStart,
          onDrawingDragEnd: handleDrawingDragEnd
        }), null);
        return _el$30;
      })()];
    }
  });
};

const DRAWING_PART_COUNT = 8;
const RECAST_SLOT_COUNT = 24;
function getDrawingPart(data) {
  if (!data) {
    return 0;
  }
  const drawingKV = KeyValues.info_item_drawing[data.drawing_item_id];
  return toFiniteNumber(data.drawing_part ?? drawingKV?.drawing_part, 0);
}
function DrawingRecastContent(props) {
  const [requesting, setRequesting] = libs.createSignal(false);
  const [fastAddPart, setFastAddPart] = libs.createSignal(0);
  const handleFastAddRecastDrawings = () => {
    props.setRecastDrawingIDs(prev => {
      const allDrawings = props.playerDrawings();
      const selectedMap = prev.reduce((result, id) => {
        result[id] = true;
        return result;
      }, {});
      const addList = prev.filter(id => {
        const data = allDrawings[id];
        return data != undefined && data.locked !== true;
      });
      const candidates = Object.keys(allDrawings).sort((a, b) => compareDrawingIDs(a, b, allDrawings));
      for (const id of candidates) {
        if (addList.length >= RECAST_SLOT_COUNT) {
          break;
        }
        const data = allDrawings[id];
        if (!data || data.locked === true || selectedMap[id] === true) {
          continue;
        }
        if (fastAddPart() != 0 && getDrawingPart(data) != fastAddPart()) {
          continue;
        }
        addList.push(id);
        selectedMap[id] = true;
      }
      if (addList.length == prev.length) {
        return prev;
      }
      return addList;
    });
  };
  const handleRecast = () => {
    if (requesting()) {
      return;
    }
    const ids = props.recastDrawingIDs().map(id => Number(id)).filter(id => !Number.isNaN(id) && id > 0);
    if (ids.length <= 0) {
      return;
    }
    const payload = {
      ids
    };
    setRequesting(true);
    CallActionRequest("/v1/drawing/combine", payload, () => {
      setRequesting(false);
      props.setRecastDrawingIDs([]);
    }, () => {
      setRequesting(false);
    });
  };
  const expectedDrawingCount = () => Math.floor(props.recastDrawingIDs().length / 3);
  const completedRecastDrawingCount = () => expectedDrawingCount() * 3;
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "DrawingRecastPanelRoot"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "RecastSectionRow RecastTitleRow"
      }, _el$);
      libs.createElement("Panel", {
        "class": "RecastSectionLine RecastSectionLineLeft"
      }, _el$2);
      libs.createElement("Label", {
        id: "RecastTitle",
        text: "#EquipmentTab_drawing_recast"
      }, _el$2);
      libs.createElement("Panel", {
        "class": "RecastSectionLine RecastSectionLineRight"
      }, _el$2);
      const _el$6 = libs.createElement("Panel", {
        id: "RecastSlotList",
        get onDragEnter() {
          return props.onDragEnter;
        },
        get onDragLeave() {
          return props.onDragLeave;
        },
        get onDragDrop() {
          return props.onDropToList;
        }
      }, _el$),
      _el$7 = libs.createElement("Panel", {
        id: "RecastFastAdd"
      }, _el$),
      _el$9 = libs.createElement("Panel", {
        "class": "RecastSectionRow RecastInfoRow"
      }, _el$);
      libs.createElement("Panel", {
        "class": "RecastSectionLine RecastSectionLineLeft"
      }, _el$9);
      libs.createElement("Label", {
        id: "RecastInfo",
        text: "#EquipmentTab_drawing_recast"
      }, _el$9);
      libs.createElement("Panel", {
        "class": "RecastSectionLine RecastSectionLineRight"
      }, _el$9);
      const _el$11 = libs.createElement("Label", {
        id: "RecastExpectedText",
        text: `#EquipmentDrawing_Resast_Out`,
        get vars() {
          return {
            value: expectedDrawingCount()
          };
        },
        html: true
      }, _el$),
      _el$12 = libs.createElement("Panel", {
        id: "RecastBtnArea"
      }, _el$);
    libs.insert(_el$6, libs.createComponent(libs.For, {
      get each() {
        return Array.from({
          length: RECAST_SLOT_COUNT
        });
      },
      children: (_, idx) => {
        const drawingID = () => props.recastDrawingIDs()[idx()];
        const drawingData = () => {
          const id = drawingID();
          if (!id) {
            return undefined;
          }
          const data = props.playerDrawings()[id];
          if (!data || data.drawing_item_id == undefined || KeyValues.info_item_drawing[data.drawing_item_id] == undefined) {
            return undefined;
          }
          return data;
        };
        return libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "RecastSlot",
          get classList() {
            return {
              Incomplete: drawingID() != undefined && idx() >= completedRecastDrawingCount()
            };
          },
          get onDragEnter() {
            return props.onDragEnter;
          },
          get onDragLeave() {
            return props.onDragLeave;
          },
          onDragDrop: (pPanel, draggedPanel) => {
            props.onSlotDrop(pPanel, draggedPanel, idx());
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return drawingData();
              },
              keyed: true,
              get fallback() {
                return libs.createElement("Panel", {
                  "class": "EquipListGrid"
                }, null);
              },
              children: data => libs.createComponent(server_equipment_drawing.EquipmentDrawingItem, libs.mergeProps$1(data, {
                oncontextmenu: () => {
                  const id = drawingID();
                  if (id) {
                    props.onRemoveRecastDrawing(id);
                  }
                },
                get onDragStart() {
                  return props.onCreateDrawingDragStart(drawingID, () => {
                    const id = drawingID();
                    return id ? {
                      id,
                      source: "recast",
                      index: idx()
                    } : undefined;
                  });
                },
                get onDragEnd() {
                  return props.onDrawingDragEnd;
                }
              }))
            });
          }
        });
      }
    }));
    libs.insert(_el$7, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      type: "EquipmentDropDown",
      get index() {
        return fastAddPart();
      },
      menuPosition: "top",
      onChange: setFastAddPart,
      get children() {
        return [libs.createElement("Label", {
          text: "#ALL"
        }, null), libs.createComponent(libs.For, {
          get each() {
            return Array(DRAWING_PART_COUNT);
          },
          children: (_, idx) => {
            const part = idx() + 1;
            return (() => {
              const _el$14 = libs.createElement("Label", {
                text: "#Equipment_Part_" + part
              }, null);
              libs.setProp(_el$14, "text", "#Equipment_Part_" + part);
              return _el$14;
            })();
          }
        })];
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
      text: "#Equipment_FastAdd",
      onactivate: handleFastAddRecastDrawings
    }), null);
    libs.insert(_el$7, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
      text: "#Equipment_ClearFastAdd",
      onactivate: () => {
        props.setRecastDrawingIDs([]);
      }
    }), null);
    libs.setProp(_el$11, "text", `#EquipmentDrawing_Resast_Out`);
    libs.insert(_el$12, libs.createComponent(EOM_Button.EOM_Button, {
      color: "Confirm",
      text: "#Equipment_Recast",
      get enabled() {
        return libs.memo(() => props.recastDrawingIDs().length >= 3)() && !requesting();
      },
      get loading() {
        return requesting();
      },
      onactivate: handleRecast
    }));
    libs.effect(_p$ => {
      const _v$ = props.onDragEnter,
        _v$2 = props.onDragLeave,
        _v$3 = props.onDropToList,
        _v$4 = {
          value: expectedDrawingCount()
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "onDragEnter", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "onDragLeave", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "onDragDrop", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$11, "vars", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
}
const EquipmentDrawingRecast = () => {
  const playerDrawings = solid_utils.createServiceNetData("player_drawings", {});
  const [recastDrawingIDs, setRecastDrawingIDs] = libs.createSignal([]);
  const removeRecastDrawing = id => {
    setRecastDrawingIDs(prev => prev.filter(itemID => itemID != id));
  };
  const addRecastDrawing = id => {
    const data = playerDrawings()[id];
    if (!data || data.locked === true) {
      return;
    }
    setRecastDrawingIDs(prev => {
      if (prev.includes(id) || prev.length >= RECAST_SLOT_COUNT) {
        return prev;
      }
      return [...prev, id];
    });
  };
  libs.createEffect(() => {
    const allDrawings = playerDrawings();
    const current = recastDrawingIDs();
    const valid = current.filter(id => {
      const data = allDrawings[id];
      return data != undefined && data.locked !== true;
    });
    if (valid.length != current.length) {
      setRecastDrawingIDs(valid);
    }
  });
  const getDraggedDrawingData = draggedPanel => {
    const dragData = LoadData(draggedPanel, "drawingDrag");
    if (dragData) {
      return dragData;
    }
    const drawingID = LoadData(draggedPanel, "drawing");
    if (drawingID == undefined) {
      return;
    }
    return {
      id: drawingID,
      source: "list"
    };
  };
  const createDrawingDragStart = (getID, getDragData) => {
    return (panel, dragCallbacks) => {
      const id = getID();
      const data = id ? playerDrawings()[id] : undefined;
      if (!id || !data) {
        return;
      }
      const dragData = getDragData?.() ?? {
        id,
        source: "list"
      };
      const pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
      const d = {
        ...data
      };
      libs.render(() => libs.createComponent(server_equipment_drawing.EquipmentDrawingItem, libs.mergeProps$1(d, {
        showTooltip: false
      })), pDisplayPanel);
      dragCallbacks.displayPanel = pDisplayPanel;
      const position = GameUI.GetCursorPosition();
      if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
        dragCallbacks.offsetX = pDisplayPanel.GetPositionWithinWindow().x - position[0];
        dragCallbacks.offsetY = pDisplayPanel.GetPositionWithinWindow().y - position[1];
      }
      panel.AddClass("dragging_from");
      SaveData(pDisplayPanel, "drawing", id);
      SaveData(pDisplayPanel, "drawingDrag", dragData);
      return true;
    };
  };
  const handleDrawingDragEnd = (panel, draggedPanel) => {
    const dragData = LoadData(draggedPanel, "drawingDrag");
    if (dragData && dragData.source == "recast") {
      const dropHandled = LoadData(draggedPanel, "drawingDropHandled");
      if (!dropHandled) {
        removeRecastDrawing(dragData.id);
      }
    }
    draggedPanel.DeleteAsync(-1);
    panel.RemoveClass("dragging_from");
  };
  const handleDropToRecastSlot = (pPanel, draggedPanel, targetIndex) => {
    pPanel.RemoveClass("potential_drop_target");
    const dragData = getDraggedDrawingData(draggedPanel);
    if (!dragData) {
      return;
    }
    const data = playerDrawings()[dragData.id];
    if (!data || data.locked === true) {
      return;
    }
    SaveData(draggedPanel, "drawingDropHandled", true);
    setRecastDrawingIDs(prev => {
      let next = [...prev];
      const sourceIndex = dragData.source == "recast" ? next.indexOf(dragData.id) : -1;
      if (sourceIndex >= 0) {
        next.splice(sourceIndex, 1);
      }
      const insertIndex = Math.min(targetIndex ?? next.length, next.length);
      next = [...next.slice(0, insertIndex), dragData.id, ...next.slice(insertIndex)];
      return next.filter((id, index, arr) => id != undefined && arr.indexOf(id) == index).slice(0, RECAST_SLOT_COUNT);
    });
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipmentDrawingRoot",
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        id: "BGLight",
        particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), (() => {
        const _el$16 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$17 = libs.createElement("Panel", {
            id: "ActionPanelRoot"
          }, _el$16);
        libs.insert(_el$17, libs.createComponent(DrawingRecastContent, {
          recastDrawingIDs: recastDrawingIDs,
          setRecastDrawingIDs: setRecastDrawingIDs,
          playerDrawings: playerDrawings,
          onDropToList: handleDropToRecastSlot,
          onSlotDrop: handleDropToRecastSlot,
          onDragEnter: (pPanel, draggedPanel) => {
            if (LoadData(draggedPanel, "drawing")) {
              pPanel.AddClass("potential_drop_target");
            }
          },
          onDragLeave: pPanel => {
            pPanel.RemoveClass("potential_drop_target");
          },
          onCreateDrawingDragStart: createDrawingDragStart,
          onDrawingDragEnd: handleDrawingDragEnd,
          onRemoveRecastDrawing: removeRecastDrawing
        }));
        libs.insert(_el$16, libs.createComponent(DrawingListPanel, {
          playerDrawings: playerDrawings,
          highlightIDs: recastDrawingIDs,
          onSelect: addRecastDrawing,
          onDrawingDragStart: getID => createDrawingDragStart(getID),
          onDrawingDragEnd: handleDrawingDragEnd
        }), null);
        return _el$16;
      })()];
    }
  });
};

function GemFusionLockChoices(props) {
  const entries = libs.createMemo(() => (props.gem()?.chaos_entry_data ?? []).map((entry, entryIndex) => ({
    entry,
    entryIndex
  })));
  const getEntryText = entry => {
    if (!entry.id.startsWith("privilege_gem_suit_")) return equipment_utils.GetChaosRowInfo(entry);
    const suitData = KeyValues.gem_entry_suit[entry.id];
    const level = Math.max(1, Math.floor(toFiniteNumber(entry.value, 1)));
    const limit = toFiniteNumber(suitData?.suit_limit);
    const levelText = limit > 0 && level >= limit ? LocalizeWithVars("#Equipment_GemSuit_LevelLimit", {
      level,
      limit
    }) : LocalizeWithVars("#Equipment_GemFusion_EffectLevel", {
      level
    });
    return `${GetLocalization(`#${entry.id}`, suitData?.name ?? entry.id)} ${levelText}`;
  };
  return libs.createComponent(libs.Show, {
    get when() {
      return libs.memo(() => !!props.gem())() && entries().length > 0;
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
        "class": "GemFusionLockChoices VerticalScrollStyle",
        flowChildren: "down",
        scroll: "y"
      }, null);
      libs.setProp(_el$, "flowChildren", "down");
      libs.setProp(_el$, "scroll", "y");
      libs.insert(_el$, libs.createComponent(libs.For, {
        get each() {
          return entries();
        },
        children: ({
          entry,
          entryIndex
        }) => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
          get checked() {
            return libs.memo(() => props.selection()?.source === props.source)() && props.selection()?.entryIndex === entryIndex;
          },
          get text() {
            return getEntryText(entry);
          },
          onchecked: checked => props.onSelect(checked ? {
            source: props.source,
            gemId: props.gem().id,
            entryIndex,
            entryId: entry.id
          } : undefined)
        })
      }));
      return _el$;
    }
  });
}
function parseEntries(value) {
  if (!value) return [];
  if (typeof value === "string") return JSON.parseSafe(value) ?? [];
  return Array.isArray(value) ? value : [];
}
function normalizeEmbeddedGem(value) {
  if (!value?.gem_item_id) return undefined;
  const config = KeyValues.info_item_gem[value.gem_item_id];
  return {
    ...value,
    id: toFiniteNumber(value.id),
    gem_item_id: toFiniteNumber(value.gem_item_id),
    locked: value.locked === true || toFiniteNumber(value.locked) === 1,
    level: toFiniteNumber(value.level),
    gem_roll_change: toFiniteNumber(value.gem_roll_change),
    rarity: toFiniteNumber(value.rarity, toFiniteNumber(config?.rarity)),
    main_entry_data: parseEntries(value.main_entry_data),
    adverb_entry_data: parseEntries(value.adverb_entry_data),
    myth_entry_data: parseEntries(value.myth_entry_data),
    chaos_entry_data: parseEntries(value.chaos_entry_data),
    ability_entry_data: parseEntries(value.ability_entry_data)
  };
}
const GemFusionWindow = props => {
  const store = equipment_comp.useEquipmentStore();
  const [selectedItemID] = store.selectedItemID;
  const [, setSelectedItemTab] = store.selectedItemTab;
  const [, setLockItemTab] = store.lockItemTab;
  const [, setItemListIsHidden] = store.hiddenItemList;
  const [selectedGemList, setSelectedGemList] = store.selectedGemList;
  const [, setShowTokens] = store.showTokens;
  const fusionResults = solid_utils.createServiceNetData("player_gem_fusion_results", {});
  const [originalGem, setOriginalGem] = libs.createSignal();
  const [responseFusionResult, setResponseFusionResult] = libs.createSignal();
  const [submitting, setSubmitting] = libs.createSignal(false);
  const [confirming, setConfirming] = libs.createSignal();
  const pendingResult = libs.createMemo(() => {
    const equipmentID = selectedItemID();
    if (!equipmentID || props.confirmedEquipmentID() === equipmentID || props.itemData()?.in_check !== "gem_fusion") return undefined;
    const result = fusionResults()[String(equipmentID)];
    return result && result !== "nil" ? result : undefined;
  });
  const fusionResult = libs.createMemo(() => pendingResult() ?? responseFusionResult());
  const fusionGem = libs.createMemo(() => {
    const result = fusionResult();
    if (!result) return undefined;
    const consumedGemData = JSON.parseSafe(result.inlay_gem_data);
    return normalizeEmbeddedGem({
      ...(consumedGemData ?? {}),
      id: result.consumed_gem_id
    });
  });
  const materialGem = libs.createMemo(() => {
    const data = props.gemData();
    return data && data !== "undefined" && data.id === selectedGemList()[0] ? data : undefined;
  });
  const materialIsValid = libs.createMemo(() => {
    const data = materialGem();
    if (!data || data.locked) return false;
    const rarity = toFiniteNumber(data.rarity, toFiniteNumber(KeyValues.info_item_gem[data.gem_item_id]?.rarity));
    return rarity === 7;
  });
  const consumeList = libs.createMemo(() => {
    const cost = KeyValues.gem_setting.gem_fusion?.value;
    if (!cost) return [];
    return cost.split("|").map(item => {
      const [itemID, count] = item.split(":");
      return {
        itemID,
        needCount: toFiniteNumber(count),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(item => item.needCount > 0);
  });
  const consumeEnough = libs.createMemo(() => consumeList().every(item => item.hasCount >= item.needCount));
  const canSubmit = libs.createMemo(() => props.confirmedEquipmentID() !== selectedItemID() && props.itemData()?.in_check !== "gem_fusion" && materialIsValid() && consumeEnough() && !submitting());
  const originalSpecialEntries = libs.createMemo(() => (originalGem()?.chaos_entry_data ?? []).filter(entry => entry.id.startsWith("privilege_gem_suit_")));
  const fusionSpecialEntries = libs.createMemo(() => (fusionGem()?.chaos_entry_data ?? []).filter(entry => entry.id.startsWith("privilege_gem_suit_")));
  libs.createEffect(() => {
    libs.batch(() => {
      setSelectedItemTab("gem");
      setLockItemTab(true);
      setItemListIsHidden(originalGem() != undefined && fusionGem() != undefined);
      setShowTokens(consumeList().map(item => toFiniteNumber(item.itemID)));
    });
  });
  libs.createEffect(() => {
    const equipment = props.itemData();
    const result = pendingResult();
    if (equipment?.in_check !== "gem_fusion" || !result) return;
    const slotIndex = toFiniteNumber(result.slot_index, -1);
    if (slotIndex < 0) return;
    const gem = normalizeEmbeddedGem(parseEntries(equipment.inlay_gems_data)[slotIndex]);
    if (!gem || !fusionGem()) return;
    libs.batch(() => {
      props.setSelectGemSlot(slotIndex);
      setOriginalGem(gem);
      setSelectedGemList([]);
      setItemListIsHidden(true);
    });
  });
  libs.createEffect(libs.on(props.selectGemSlot, () => {
    if (props.itemData()?.in_check === "gem_fusion") return;
    libs.batch(() => {
      setResponseFusionResult();
      setOriginalGem();
      setSelectedGemList([]);
      setItemListIsHidden(false);
    });
  }, {
    defer: true
  }));
  const confirmFusion = confirm => {
    const equipmentID = selectedItemID();
    if (!equipmentID || confirming() != undefined) return;
    setConfirming(confirm);
    CallActionRequest("/v1/gem/fusion_confirm", {
      equipment_id: equipmentID,
      confirm
    }, result => {
      setConfirming();
      if (result.code !== 0 && result.code !== 200) {
        ErrorMessage(result.message ? GetLocalization(result.message, result.message) : GetLocalization("#Equipment_GemFusion_ConfirmFailed"));
        return;
      }
      libs.batch(() => {
        props.onConfirmed(equipmentID);
        setResponseFusionResult();
        setOriginalGem();
        setSelectedGemList([]);
        setItemListIsHidden(false);
      });
    }, () => {
      setConfirming();
      ErrorMessage(GetLocalization("#Equipment_GemFusion_Timeout"));
    });
  };
  const submit = async () => {
    const equipmentID = selectedItemID();
    const material = materialGem();
    if (!equipmentID || !material || !canSubmit()) return;
    const slotIndex = props.selectGemSlot();
    const lock = props.lockSelection();
    let nextOriginalGem;
    let nextFusionResult;
    setResponseFusionResult();
    setSubmitting(true);
    const request = () => new Promise(resolve => {
      CallActionRequest("/v1/gem/fusion", {
        equipment_id: equipmentID,
        slot_index: slotIndex,
        gem_id: material.id,
        ...(lock ? {
          lock_source: lock.source,
          lock_entry_index: lock.entryIndex
        } : {})
      }, result => {
        if (result.code !== 0 && result.code !== 200) {
          ErrorMessage(result.message ? GetLocalization(result.message, result.message) : GetLocalization("#Equipment_GemFusion_RequestFailed"));
          resolve();
          return;
        }
        const updatedEquipment = result.data?.player_equipments?.find(equipment => toFiniteNumber(equipment.id) === equipmentID);
        const slots = parseEntries(updatedEquipment?.inlay_gems_data);
        nextOriginalGem = normalizeEmbeddedGem(slots[slotIndex]);
        nextFusionResult = result.data?.player_gem_fusion_results?.find(item => toFiniteNumber(item.id) === equipmentID && toFiniteNumber(item.slot_index) === slotIndex);
        if (!nextOriginalGem || !nextFusionResult) {
          ErrorMessage(GetLocalization("#Equipment_GemFusion_ResultMissing"));
        }
        resolve();
      }, () => {
        ErrorMessage(GetLocalization("#Equipment_GemFusion_Timeout"));
        resolve();
      });
    });
    try {
      if (props.startForgeAnimation) {
        await props.startForgeAnimation(request);
      } else {
        await request();
      }
      if (nextOriginalGem && nextFusionResult) {
        libs.batch(() => {
          setResponseFusionResult(nextFusionResult);
          setOriginalGem(nextOriginalGem);
          setSelectedGemList([]);
          setItemListIsHidden(true);
        });
      }
    } finally {
      setSubmitting(false);
    }
  };
  libs.createEffect(() => {
    const hasResult = originalGem() != undefined && fusionGem() != undefined;
    props.setLeftExtraContent?.((() => {
      const _el$2 = libs.createElement("Panel", {
        id: "OperationBtns",
        "class": "GemFusionOperationBtns"
      }, null);
      libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ReturnBtn",
        get enabled() {
          return !props.requestPending?.();
        },
        get text() {
          return GetLocalization("#MenuButton_Return");
        },
        onactivate: () => props.onReturn?.()
      }), null);
      libs.insert(_el$2, libs.createComponent(libs.Show, {
        when: !hasResult,
        get children() {
          const _el$3 = libs.createElement("Panel", {
              id: "ConsumeBtn",
              flowChildren: "down"
            }, null),
            _el$4 = libs.createElement("Panel", {
              horizontalAlign: "center",
              flowChildren: "right"
            }, _el$3);
          libs.setProp(_el$3, "flowChildren", "down");
          libs.setProp(_el$4, "horizontalAlign", "center");
          libs.setProp(_el$4, "flowChildren", "right");
          libs.insert(_el$4, libs.createComponent(libs.For, {
            get each() {
              return consumeList();
            },
            children: consume => (() => {
              const _el$5 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("ComsumeItem", {
                      Enough: consume.hasCount >= consume.needCount
                    });
                  }
                }, null),
                _el$6 = libs.createElement("Label", {
                  get text() {
                    return `X${consume.needCount}`;
                  }
                }, _el$5);
              libs.insert(_el$5, libs.createComponent(StoreItem.StoreItemImage, {
                get itemid() {
                  return consume.itemID;
                }
              }), _el$6);
              libs.effect(_p$ => {
                const _v$ = libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  }),
                  _v$2 = `X${consume.needCount}`;
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "class", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined
              });
              return _el$5;
            })()
          }));
          libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_Button, {
            get enabled() {
              return canSubmit();
            },
            get loading() {
              return submitting();
            },
            color: "Confirm",
            get text() {
              return GetLocalization("#Equipment_GemFusion_Do");
            },
            onmouseover: panel => {
              if (!materialIsValid()) {
                ShowCustomTooltip(panel, "text", {
                  text: GetLocalization("#Equipment_GemFusion_SelectMaterial")
                });
              } else if (!consumeEnough()) {
                ShowCustomTooltip(panel, "text", {
                  text: GetLocalization("#Equipment_GemFusion_MaterialNotEnough")
                });
              }
            },
            onmouseout: panel => HideCustomTooltip(panel, "text"),
            onactivate: submit
          }), null);
          return _el$3;
        }
      }), null);
      return _el$2;
    })());
  });
  return (() => {
    const _el$7 = libs.createElement("Panel", {
        id: "GemFusionPanel"
      }, null),
      _el$8 = libs.createElement("Label", {
        "class": "WindowTitle",
        get text() {
          return GetLocalization(originalGem() && fusionGem() ? "#Equipment_GemFusion_CompareTitle" : "#Equipment_Fusion");
        }
      }, _el$7);
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!originalGem())() && fusionGem();
      },
      keyed: true,
      children: () => (() => {
        const _el$9 = libs.createElement("Panel", {
            id: "GemFusionResultContent"
          }, null),
          _el$0 = libs.createElement("Panel", {
            "class": "GemFusionAttributeSection OriginalAttributes"
          }, _el$9),
          _el$1 = libs.createElement("Panel", {
            "class": "SectionHeader"
          }, _el$0),
          _el$10 = libs.createElement("Label", {
            "class": "SectionTitle",
            get text() {
              return GetLocalization("#Equipment_GemFusion_OriginalAttributes");
            }
          }, _el$1),
          _el$11 = libs.createElement("Panel", {
            "class": "GemFusionSpecialEntries VerticalScrollStyle"
          }, _el$0),
          _el$12 = libs.createElement("Panel", {
            "class": "GemFusionAttributeSection FusionResultAttributes"
          }, _el$9),
          _el$13 = libs.createElement("Panel", {
            "class": "SectionHeader"
          }, _el$12),
          _el$14 = libs.createElement("Label", {
            "class": "SectionTitle",
            get text() {
              return GetLocalization("#Equipment_GemFusion_ResultTitle");
            }
          }, _el$13),
          _el$15 = libs.createElement("Panel", {
            "class": "GemFusionSpecialEntries VerticalScrollStyle"
          }, _el$12);
        libs.insert(_el$1, libs.createComponent(EOM_Button.EOM_Button, {
          get enabled() {
            return confirming() == undefined;
          },
          get loading() {
            return confirming() === false;
          },
          get text() {
            return GetLocalization("#Equipment_GemFusion_RestoreAttributes");
          },
          onactivate: () => confirmFusion(false)
        }), null);
        libs.insert(_el$11, libs.createComponent(libs.For, {
          get each() {
            return originalSpecialEntries();
          },
          children: entry => libs.createComponent(equip_details.GemSpecialEffectRow, {
            data: entry
          })
        }));
        libs.insert(_el$13, libs.createComponent(EOM_Button.EOM_Button, {
          get enabled() {
            return confirming() == undefined;
          },
          get loading() {
            return confirming() === true;
          },
          color: "Confirm",
          get text() {
            return GetLocalization("#Equipment_GemFusion_SaveAttributes");
          },
          onactivate: () => confirmFusion(true)
        }), null);
        libs.insert(_el$15, libs.createComponent(libs.For, {
          get each() {
            return fusionSpecialEntries();
          },
          children: entry => libs.createComponent(equip_details.GemSpecialEffectRow, {
            data: entry
          })
        }));
        libs.effect(_p$ => {
          const _v$3 = GetLocalization("#Equipment_GemFusion_OriginalAttributes"),
            _v$4 = GetLocalization("#Equipment_GemFusion_ResultTitle");
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "text", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$9;
      })()
    }), null);
    libs.effect(_$p => libs.setProp(_el$8, "text", GetLocalization(originalGem() && fusionGem() ? "#Equipment_GemFusion_CompareTitle" : "#Equipment_Fusion"), _$p));
    return _el$7;
  })();
};

const InlayWindow = props => {
  const equipPunchMap = {};
  for (const row of Object.values(KeyValues.equip_punch)) {
    if (!equipPunchMap[row.class]) {
      equipPunchMap[row.class] = {};
    }
    equipPunchMap[row.class][row.rarity] = row;
  }
  function canEquipPunch(equipClass, rarity) {
    return getEquipPunchConfig(equipClass, rarity) != undefined;
  }
  function getEquipPunchConfig(equipClass, rarity) {
    return equipPunchMap[equipClass]?.[rarity];
  }
  Object.keys(KeyValues.equip_level_setting).length - 1;
  const store = equipment_comp.useEquipmentStore();
  const [, setItemListIsHidden] = store.hiddenItemList;
  const [selectedItemID] = store.selectedItemID;
  const [, setSelectedItemTab] = store.selectedItemTab;
  const [, setLockTab] = store.lockItemTab;
  const [, setShowTokens] = store.showTokens;
  const [, setSelectedGemList] = store.selectedGemList;
  const [selectedItemList, setSelectedItemList] = store.selectedItemList;
  const swapMode = () => selectedItemList().length > 0;
  const equipData = () => props.itemData();
  const gemData = libs.createMemo(() => {
    if (props.gemData && props.gemData() != "undefined") {
      return props.gemData();
    } else {
      return undefined;
    }
  });
  const rarity = () => equipData()?.rarity ?? 0;
  const inlayGemData = libs.createMemo(() => {
    const data = equipData();
    if (!data) {
      return [];
    }
    return JSON.parseSafe(data.inlay_gems_data);
  });
  const getGemSlots = data => {
    if (!data?.inlay_gems_data) return [];
    const slots = JSON.parseSafe(data.inlay_gems_data);
    return Array.isArray(slots) ? slots : [];
  };
  const hasGemEffect = data => {
    return getGemSlots(data).some(gem => gem?.gem_item_id != undefined);
  };
  const buildEmbeddedGemData = gem => {
    if (!gem?.gem_item_id) return undefined;
    const parseEntries = value => {
      if (!value) return [];
      if (typeof value === "string") return JSON.parseSafe(value) ?? [];
      return value;
    };
    return JSON.stringify({
      ...gem,
      main_entry_data: parseEntries(gem.main_entry_data),
      adverb_entry_data: parseEntries(gem.adverb_entry_data),
      myth_entry_data: parseEntries(gem.myth_entry_data),
      chaos_entry_data: parseEntries(gem.chaos_entry_data),
      ability_entry_data: parseEntries(gem.ability_entry_data)
    });
  };
  const swapEquipments = libs.createMemo(() => selectedItemList().slice(0, 2).map(id => store.player_equipments()[id]));
  const canSwap = libs.createMemo(() => {
    const [first, second] = swapEquipments();
    if (!first || !second || first.id == second.id) return false;
    return getGemSlots(first).length > 0 && getGemSlots(second).length > 0 && (hasGemEffect(first) || hasGemEffect(second));
  });
  const swapConsumeList = libs.createMemo(() => {
    const cost = KeyValues.gem_setting.gem_swap?.value;
    if (!cost) return [];
    return cost.split("|").map(item => {
      const [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(consume => consume.needCount > 0);
  });
  const swapConsumeEnough = libs.createMemo(() => {
    return swapConsumeList().every(consume => consume.hasCount >= consume.needCount);
  });
  const canDoSwap = libs.createMemo(() => canSwap() && swapConsumeEnough());
  const enterSwapMode = () => {
    const equipmentID = selectedItemID();
    if (!equipmentID) return;
    libs.batch(() => {
      setSelectedGemList([]);
      setSelectedItemList([equipmentID]);
      setSelectedItemTab("equipment");
      setLockTab(true);
      setItemListIsHidden(false);
      setShowTokens([]);
    });
  };
  const leaveSwapMode = () => {
    libs.batch(() => {
      setSelectedItemList([]);
      setSelectedItemTab("gem");
      setLockTab(true);
      setItemListIsHidden(false);
    });
  };
  const GemSwapEquipmentContent = () => (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "GemSwapLeftContent GemSwapMode"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "GemSwapEquipmentList"
      }, _el$);
    libs.insert(_el$2, libs.createComponent(libs.For, {
      each: [0, 1],
      children: index => {
        const data = () => swapEquipments()[index];
        return [libs.createComponent(libs.Show, {
          when: index == 1,
          get children() {
            const _el$3 = libs.createElement("Panel", {
                "class": "GemSwapArrows"
              }, null);
              libs.createElement("Panel", {
                "class": "GemSwapArrow"
              }, _el$3);
              libs.createElement("Panel", {
                "class": "GemSwapArrow Reverse"
              }, _el$3);
            return _el$3;
          }
        }), (() => {
          const _el$6 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("GemSwapEquipmentSlot", {
                Empty: !data()
              });
            }
          }, null);
          libs.insert(_el$6, libs.createComponent(libs.Show, {
            get when() {
              return data();
            },
            keyed: true,
            get fallback() {
              return (() => {
                const _el$9 = libs.createElement("Panel", {
                    "class": "EmptySlotRoot"
                  }, null);
                  libs.createElement("Panel", {
                    "class": "GemSwapAddIcon"
                  }, _el$9);
                  const _el$1 = libs.createElement("Label", {
                    "class": "GemSwapEmptyText",
                    get text() {
                      return GetLocalization("#Equipment_GemSwap_SelectSecond");
                    }
                  }, _el$9);
                libs.effect(_$p => libs.setProp(_el$1, "text", GetLocalization("#Equipment_GemSwap_SelectSecond"), _$p));
                return _el$9;
              })();
            },
            get children() {
              return [libs.createComponent(server_equipment.Equipment, libs.mergeProps$1(() => data())), (() => {
                const _el$7 = libs.createElement("Label", {
                  "class": "GemSwapEquipName EquipRarityLabel",
                  get text() {
                    return "#" + data().equipment_item_id;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$7, "text", "#" + data().equipment_item_id, _$p));
                return _el$7;
              })(), (() => {
                const _el$8 = libs.createElement("Panel", {
                  "class": "GemSwapGemSlots"
                }, null);
                libs.insert(_el$8, libs.createComponent(libs.For, {
                  get each() {
                    return getGemSlots(data());
                  },
                  children: gem => (() => {
                    const _el$10 = libs.createElement("Panel", {
                      get ["class"]() {
                        return libs.classNames("GemSwapGemSlot", {
                          Empty: gem?.gem_item_id == undefined
                        });
                      }
                    }, null);
                    libs.setProp(_el$10, "onmouseover", panel => {
                      const embeddedGemData = buildEmbeddedGemData(gem);
                      if (!embeddedGemData) return;
                      if (gem.id != undefined) {
                        equipment_utils.ShowServerGemTooltip(panel, {
                          id1: gem.id,
                          embeddedGemData
                        });
                      } else {
                        ShowCustomTooltip(panel, "server_gem", {
                          id1: "",
                          id2: "",
                          embedded_gem_data: embeddedGemData
                        });
                      }
                    });
                    libs.setProp(_el$10, "onmouseout", panel => HideCustomTooltip(panel, "server_gem"));
                    libs.insert(_el$10, libs.createComponent(libs.Show, {
                      get when() {
                        return gem?.gem_item_id != undefined;
                      },
                      get children() {
                        return libs.createComponent(server_equipment.Gem, gem);
                      }
                    }));
                    libs.effect(_$p => libs.setProp(_el$10, "class", libs.classNames("GemSwapGemSlot", {
                      Empty: gem?.gem_item_id == undefined
                    }), _$p));
                    return _el$10;
                  })()
                }));
                return _el$8;
              })()];
            }
          }));
          libs.effect(_$p => libs.setProp(_el$6, "class", libs.classNames("GemSwapEquipmentSlot", {
            Empty: !data()
          }), _$p));
          return _el$6;
        })()];
      }
    }));
    return _el$;
  })();
  const [fusionMode, setFusionMode] = libs.createSignal(false);
  const currentSlotGem = libs.createMemo(() => normalizeEmbeddedGem(inlayGemData()[props.selectGemSlot()]));
  const [originalGem, setOriginalGem] = libs.createSignal();
  const resultGem = libs.createMemo(() => originalGem() != undefined ? currentSlotGem() : undefined);
  const hasResult = libs.createMemo(() => originalGem() != undefined && resultGem() != undefined);
  const compareData = libs.createMemo(() => {
    const original = originalGem();
    const result = resultGem();
    return original && result ? {
      original,
      result
    } : undefined;
  });
  const highlightedEntryKeys = libs.createMemo(() => {
    const data = compareData();
    const keys = new Set();
    if (!data) return keys;
    const signature = entry => entry == undefined ? "" : JSON.stringify([entry.id, toFiniteNumber(entry.value), toFiniteNumber(entry.base_value ?? entry.value), entry.percent]);
    for (const field of ["main_entry_data", "adverb_entry_data", "chaos_entry_data"]) {
      const before = data.original[field];
      const after = data.result[field];
      for (let index = 0; index < Math.max(before.length, after.length); index++) {
        if (signature(before[index]) !== signature(after[index])) keys.add(`${field}:${index}`);
      }
    }
    return keys;
  });
  const dismissResult = () => {
    libs.batch(() => {
      setOriginalGem();
      setSelectedGemList([]);
      setItemListIsHidden(false);
    });
  };
  libs.createEffect(libs.on(props.selectGemSlot, () => {
    setOriginalGem();
  }, {
    defer: true
  }));
  const fusionConsumeList = libs.createMemo(() => {
    const cost = KeyValues.gem_setting.gem_fusion_2?.value;
    if (!cost) return [];
    return cost.split("|").map(item => {
      const [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(consume => consume.needCount > 0);
  });
  const fusionConsumeEnough = libs.createMemo(() => fusionConsumeList().every(consume => consume.hasCount >= consume.needCount));
  const InlayType = libs.createMemo(() => {
    const data = equipData();
    if (!data || !canEquipPunch(data.class, data.rarity)) {
      return "None";
    }
    return inlayGemData().length == 0 ? "Punch" : "Inlay";
  });
  const consumeList = libs.createMemo(() => {
    const data = equipData();
    if (!data) {
      return [];
    }
    const config = getEquipPunchConfig(data.class, data.rarity);
    if (!config) {
      return [];
    }
    if (InlayType() == "Punch") {
      return config.cost.split("|").map(item => {
        let [itemID, num] = item.split(":");
        let count = Number(num);
        let hasCount = () => GetServiceItemCount(itemID);
        return {
          itemID,
          needCount: count,
          hasCount: hasCount()
        };
      }).filter(d => d.needCount > 0);
    }
    return [];
  });
  const consumeEnough = libs.createMemo(() => consumeList().every(consume => consume.hasCount >= consume.needCount));
  const canInlay = libs.createMemo(() => {
    if (InlayType() != "Inlay" || gemData() == undefined) return false;
    if (fusionMode()) {
      return fusionConsumeEnough() && inlayGemData()[props.selectGemSlot()]?.gem_item_id != undefined;
    }
    return true;
  });
  const inlayDisableTip = libs.createMemo(() => {
    if (InlayType() != "Inlay" || gemData() == undefined) return "#Equipment_Inlay_SelectGem";
    if (fusionMode()) {
      if (inlayGemData()[props.selectGemSlot()]?.gem_item_id == undefined) return "#Equipment_GemEntryFusion_TargetEmpty";
      if (!fusionConsumeEnough()) return "#Equipment_GemEntryFusion_MaterialNotEnough";
    }
    return undefined;
  });
  libs.createEffect(() => {
    let consumes = [];
    if (swapMode()) {
      consumes = swapConsumeList();
    } else if (InlayType() == "Inlay") {
      consumes = fusionMode() ? fusionConsumeList() : [];
    } else {
      consumes = consumeList();
    }
    setShowTokens(consumes.map(consume => toFiniteNumber(consume.itemID)));
  });
  libs.createEffect(() => {
    libs.batch(() => {
      if (swapMode()) {
        setItemListIsHidden(false);
        setSelectedItemTab("equipment");
        setLockTab(true);
      } else if (InlayType() == "Punch") {
        setItemListIsHidden(true);
      } else if (InlayType() == "Inlay") {
        if (hasResult()) {
          setItemListIsHidden(true);
        } else {
          setItemListIsHidden(false);
          setSelectedItemTab("gem");
          setLockTab(true);
        }
      }
      props.setLeftExtraContent?.([libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => InlayType() == "Inlay")() && !swapMode();
        },
        get children() {
          const _el$11 = libs.createElement("Panel", {
            id: "OperationBtns"
          }, null);
          libs.insert(_el$11, libs.createComponent(libs.Show, {
            get when() {
              return hasResult();
            },
            get fallback() {
              return [libs.createComponent(EOM_Button.EOM_Button, {
                id: "ReturnBtn",
                get enabled() {
                  return !props.requestPending?.();
                },
                text: "#MenuButton_Return",
                onactivate: () => props.onReturn?.()
              }), (() => {
                const _el$21 = libs.createElement("Panel", {
                    id: "ConsumeBtn",
                    margin: "0px 120px",
                    flowChildren: "down"
                  }, null),
                  _el$22 = libs.createElement("Panel", {
                    horizontalAlign: "center",
                    flowChildren: "right"
                  }, _el$21);
                libs.setProp(_el$21, "margin", "0px 120px");
                libs.setProp(_el$21, "flowChildren", "down");
                libs.setProp(_el$22, "horizontalAlign", "center");
                libs.setProp(_el$22, "flowChildren", "right");
                libs.insert(_el$22, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  id: "FusionModeSwitch",
                  get checked() {
                    return fusionMode();
                  },
                  get enabled() {
                    return !props.requestPending?.();
                  },
                  get text() {
                    return GetLocalization("#Equipment_InlayFusion_KeepChaos");
                  },
                  onchecked: b => setFusionMode(b)
                }), null);
                libs.insert(_el$22, libs.createComponent(libs.For, {
                  get each() {
                    return fusionConsumeList();
                  },
                  children: consume => {
                    return (() => {
                      const _el$23 = libs.createElement("Panel", {
                          get ["class"]() {
                            return libs.classNames("ComsumeItem", {
                              Enough: fusionMode() && consume.hasCount >= consume.needCount,
                              Dimmed: !fusionMode()
                            });
                          }
                        }, null),
                        _el$24 = libs.createElement("Label", {
                          get text() {
                            return "X" + consume.needCount;
                          }
                        }, _el$23);
                      libs.insert(_el$23, libs.createComponent(StoreItem.StoreItemImage, {
                        get itemid() {
                          return consume.itemID;
                        }
                      }), _el$24);
                      libs.effect(_p$ => {
                        const _v$ = libs.classNames("ComsumeItem", {
                            Enough: fusionMode() && consume.hasCount >= consume.needCount,
                            Dimmed: !fusionMode()
                          }),
                          _v$2 = "X" + consume.needCount;
                        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$23, "class", _v$, _p$._v$));
                        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$24, "text", _v$2, _p$._v$2));
                        return _p$;
                      }, {
                        _v$: undefined,
                        _v$2: undefined
                      });
                      return _el$23;
                    })();
                  }
                }), null);
                libs.insert(_el$21, libs.createComponent(EOM_Button.EOM_Button, {
                  get enabled() {
                    return canInlay();
                  },
                  get loading() {
                    return props.requestPending?.();
                  },
                  onmouseover: p => {
                    if (!canInlay()) {
                      ShowCustomTooltip(p, "text", {
                        text: inlayDisableTip() ?? "#Equipment_Inlay_SelectGem"
                      });
                    }
                  },
                  onmouseout: p => {
                    HideCustomTooltip(p, "text");
                  },
                  color: "Confirm",
                  text: "#Equipment_InlayDo",
                  onactivate: () => {
                    const gem_data = gemData();
                    if (!gem_data || !canInlay()) return;
                    const slotIndex = props.selectGemSlot();
                    const fusion = fusionMode();
                    const beforeGem = normalizeEmbeddedGem(inlayGemData()[slotIndex]);
                    let success = false;
                    props.startForgeAnimation?.(() => new Promise(resolve => {
                      CallActionRequest(fusion ? "/v1/gem/fusion_v2" : "/v1/gem/equipment_inlay_gem", {
                        equipment_id: selectedItemID(),
                        slot_index: slotIndex,
                        gem_id: gem_data.id
                      }, result => {
                        success = result.code === 0 || result.code === 200;
                        if (!success) {
                          ErrorMessage(result.message ? GetLocalization(result.message, result.message) : GetLocalization("#Equipment_GemEntryFusion_RequestFailed"));
                        }
                        resolve();
                      }, () => {
                        ErrorMessage(GetLocalization("#Equipment_GemEntryFusion_Timeout"));
                        resolve();
                      });
                    }))?.then(() => {
                      if (success && beforeGem) {
                        libs.batch(() => {
                          setOriginalGem(beforeGem);
                          setSelectedGemList([]);
                          setItemListIsHidden(true);
                        });
                      } else {
                        libs.batch(() => {
                          setSelectedGemList([]);
                          setItemListIsHidden(false);
                        });
                      }
                    });
                  }
                }), null);
                return _el$21;
              })(), libs.createComponent(EOM_Button.EOM_Button, {
                id: "GemSwapEntryBtn",
                get enabled() {
                  return !props.requestPending?.();
                },
                get text() {
                  return GetLocalization("#Equipment_GemSwap");
                },
                onactivate: enterSwapMode
              })];
            },
            get children() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                get text() {
                  return GetLocalization("#Equipment_GemFusion_Complete");
                },
                onactivate: dismissResult
              });
            }
          }));
          return _el$11;
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return swapMode();
        },
        get children() {
          const _el$12 = libs.createElement("Panel", {
              "class": "GemSwapLeftExtraContent"
            }, null),
            _el$13 = libs.createElement("Panel", {
              id: "OperationBtns",
              "class": "GemSwapOperationBtns"
            }, _el$12),
            _el$14 = libs.createElement("Panel", {
              id: "ConsumeBtn",
              flowChildren: "down"
            }, _el$13),
            _el$15 = libs.createElement("Panel", {
              horizontalAlign: "center",
              flowChildren: "right"
            }, _el$14);
          libs.insert(_el$12, libs.createComponent(GemSwapEquipmentContent, {}), _el$13);
          libs.insert(_el$13, libs.createComponent(EOM_Button.EOM_Button, {
            id: "ReturnBtn",
            get enabled() {
              return !props.requestPending?.();
            },
            text: "#MenuButton_Return",
            onactivate: leaveSwapMode
          }), _el$14);
          libs.setProp(_el$14, "flowChildren", "down");
          libs.setProp(_el$15, "horizontalAlign", "center");
          libs.setProp(_el$15, "flowChildren", "right");
          libs.insert(_el$15, libs.createComponent(libs.For, {
            get each() {
              return swapConsumeList();
            },
            children: consume => (() => {
              const _el$25 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("ComsumeItem", {
                      Enough: consume.hasCount >= consume.needCount
                    });
                  }
                }, null),
                _el$26 = libs.createElement("Label", {
                  get text() {
                    return "X" + consume.needCount;
                  }
                }, _el$25);
              libs.insert(_el$25, libs.createComponent(StoreItem.StoreItemImage, {
                get itemid() {
                  return consume.itemID;
                }
              }), _el$26);
              libs.effect(_p$ => {
                const _v$3 = libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  }),
                  _v$4 = "X" + consume.needCount;
                _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$25, "class", _v$3, _p$._v$3));
                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$26, "text", _v$4, _p$._v$4));
                return _p$;
              }, {
                _v$3: undefined,
                _v$4: undefined
              });
              return _el$25;
            })()
          }));
          libs.insert(_el$14, libs.createComponent(EOM_Button.EOM_Button, {
            get enabled() {
              return canDoSwap();
            },
            get loading() {
              return props.requestPending?.();
            },
            color: "Confirm",
            get text() {
              return GetLocalization("#Equipment_GemSwap");
            },
            onmouseover: p => {
              if (!canSwap()) {
                ShowCustomTooltip(p, "text", {
                  text: GetLocalization("#Equipment_GemSwap_SelectHint")
                });
              } else if (!swapConsumeEnough()) {
                ShowCustomTooltip(p, "text", {
                  text: GetLocalization("#Equipment_GemSwap_MaterialNotEnough")
                });
              }
            },
            onmouseout: p => HideCustomTooltip(p, "text"),
            onactivate: () => {
              const [first, second] = swapEquipments();
              if (!first || !second || !canDoSwap()) return;
              props.startForgeAnimation?.(() => new Promise(resolve => {
                CallActionRequest("/v1/gem/equipment_swap_gem", {
                  equipment_id1: first.id,
                  equipment_id2: second.id
                }, () => resolve(), () => resolve());
              }))?.then(leaveSwapMode);
            }
          }), null);
          return _el$12;
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return InlayType() == "Punch";
        },
        get children() {
          const _el$16 = libs.createElement("Panel", {
              id: "OperationBtns"
            }, null),
            _el$17 = libs.createElement("Panel", {
              id: "ConsumeBtn",
              flowChildren: "down"
            }, _el$16),
            _el$18 = libs.createElement("Panel", {
              horizontalAlign: "center",
              flowChildren: "right"
            }, _el$17);
          libs.insert(_el$16, libs.createComponent(EOM_Button.EOM_Button, {
            id: "ReturnBtn",
            get enabled() {
              return !props.requestPending?.();
            },
            text: "#MenuButton_Return",
            onactivate: () => props.onReturn?.()
          }), _el$17);
          libs.setProp(_el$17, "flowChildren", "down");
          libs.setProp(_el$18, "horizontalAlign", "center");
          libs.setProp(_el$18, "flowChildren", "right");
          libs.insert(_el$18, libs.createComponent(libs.For, {
            get each() {
              return consumeList();
            },
            children: consume => {
              return (() => {
                const _el$27 = libs.createElement("Panel", {
                    get ["class"]() {
                      return libs.classNames("ComsumeItem", {
                        Enough: consume.hasCount >= consume.needCount
                      });
                    }
                  }, null),
                  _el$28 = libs.createElement("Label", {
                    get text() {
                      return "X" + consume.needCount;
                    }
                  }, _el$27);
                libs.insert(_el$27, libs.createComponent(StoreItem.StoreItemImage, {
                  get itemid() {
                    return consume.itemID;
                  }
                }), _el$28);
                libs.effect(_p$ => {
                  const _v$5 = libs.classNames("ComsumeItem", {
                      Enough: consume.hasCount >= consume.needCount
                    }),
                    _v$6 = "X" + consume.needCount;
                  _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$27, "class", _v$5, _p$._v$5));
                  _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$28, "text", _v$6, _p$._v$6));
                  return _p$;
                }, {
                  _v$5: undefined,
                  _v$6: undefined
                });
                return _el$27;
              })();
            }
          }));
          libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_Button, {
            get enabled() {
              return consumeEnough();
            },
            get loading() {
              return props.requestPending?.();
            },
            color: "Confirm",
            text: "#Equipment_Punch",
            onactivate: () => {
              props.startForgeAnimation?.(() => new Promise(resolve => {
                CallActionRequest("/v1/gem/punch_equipment", {
                  equipment_id: selectedItemID(),
                  punch_num: getEquipPunchConfig(equipData().class, equipData().rarity).punch_num
                }, () => resolve(), () => resolve());
              }));
            }
          }), null);
          return _el$16;
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return InlayType() == "None";
        },
        get children() {
          const _el$19 = libs.createElement("Panel", {
              id: "OperationBtns"
            }, null),
            _el$20 = libs.createTextNode(`;`, _el$19);
          libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_Button, {
            id: "ReturnBtn",
            get enabled() {
              return !props.requestPending?.();
            },
            text: "#MenuButton_Return",
            onactivate: () => props.onReturn?.()
          }), _el$20);
          return _el$19;
        }
      })]);
    });
  });
  return (() => {
    const _el$29 = libs.createElement("Panel", {
        id: "InlayPanel",
        get ["class"]() {
          return libs.classNames({
            IsMax: false
          }, "RarityColor" + rarity());
        }
      }, null),
      _el$30 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$29);
    libs.setProp(_el$30, "tooltip_text", "#EquipInlayTips");
    libs.insert(_el$29, libs.createComponent(libs.Show, {
      get when() {
        return !swapMode();
      },
      get children() {
        return libs.createComponent(libs.Switch, {
          get children() {
            return [libs.createComponent(libs.Match, {
              get when() {
                return InlayType() == "Punch";
              },
              get children() {
                return [libs.createElement("Label", {
                  "class": "WindowTitle",
                  text: "#Equipment_EquipPunch"
                }, null), (() => {
                  const _el$32 = libs.createElement("Label", {
                    "class": "EquipName EquipRarityLabel",
                    get text() {
                      return "#" + equipData()?.equipment_item_id;
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$32, "text", "#" + equipData()?.equipment_item_id, _$p));
                  return _el$32;
                })(), libs.createComponent(equipment_comp.AttrContainer, {
                  get children() {
                    return [libs.createComponent(libs.For, {
                      get each() {
                        return equipData()?.main_entry_data ?? [];
                      },
                      children: (data, index) => {
                        return libs.createComponent(equipment_comp.AttrItem, {
                          get index() {
                            return index();
                          },
                          attrData: data,
                          type: "Main"
                        });
                      }
                    }), libs.createComponent(libs.For, {
                      get each() {
                        return equipData()?.adverb_entry_data ?? [];
                      },
                      children: (data, index) => {
                        return libs.createComponent(equipment_comp.AttrItem, {
                          get index() {
                            return index();
                          },
                          attrData: data,
                          type: "Adverb"
                        });
                      }
                    }), libs.createComponent(libs.Index, {
                      get each() {
                        return equipData()?.myth_entry_data ?? [];
                      },
                      children: data => {
                        const entryKv = KeyValues.equip_entry[data().id];
                        return (() => {
                          const _el$33 = libs.createElement("Panel", {
                              "class": "MythEntry"
                            }, null);
                            libs.createElement("Image", {}, _el$33);
                            const _el$35 = libs.createElement("Label", {
                              get text() {
                                return GetPrivilegeDesc(data().id, 1, {
                                  value: data().value,
                                  min: entryKv.value_min,
                                  max: entryKv.value_max
                                });
                              },
                              html: true
                            }, _el$33);
                          libs.effect(_$p => libs.setProp(_el$35, "text", GetPrivilegeDesc(data().id, 1, {
                            value: data().value,
                            min: entryKv.value_min,
                            max: entryKv.value_max
                          }), _$p));
                          return _el$33;
                        })();
                      }
                    }), libs.createComponent(libs.Index, {
                      get each() {
                        return equipData()?.chaos_entry_data ?? [];
                      },
                      children: data => (() => {
                        const _el$36 = libs.createElement("Panel", {
                            "class": `ChaosEntry`
                          }, null);
                          libs.createElement("Panel", {
                            id: "Point"
                          }, _el$36);
                          const _el$38 = libs.createElement("Label", {
                            id: "EntryText",
                            get text() {
                              return equipment_utils.GetChaosRowInfo(data());
                            },
                            html: true
                          }, _el$36);
                        libs.setProp(_el$36, "class", `ChaosEntry`);
                        libs.effect(_$p => libs.setProp(_el$38, "text", equipment_utils.GetChaosRowInfo(data()), _$p));
                        return _el$36;
                      })()
                    })];
                  }
                })];
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return InlayType() == "Inlay";
              },
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return compareData();
                  },
                  keyed: true,
                  get fallback() {
                    return libs.createElement("Label", {
                      "class": "WindowTitle",
                      text: "#Equipment_GemInlay"
                    }, null);
                  },
                  children: data => {
                    const compare = {};
                    for (const entry of [...(data.original.main_entry_data ?? []), ...(data.original.adverb_entry_data ?? [])]) {
                      compare[entry.id] = entry.base_value ?? entry.value;
                    }
                    const ResultSection = sectionProps => {
                      return (() => {
                        const _el$40 = libs.createElement("Panel", {
                            "class": "GemContainer"
                          }, null),
                          _el$41 = libs.createElement("Label", {
                            "class": "SectionTitle",
                            get text() {
                              return GetLocalization(sectionProps.title);
                            }
                          }, _el$40);
                        libs.insert(_el$40, libs.createComponent(equipment_comp.AttrContainer, {
                          get children() {
                            return [libs.createComponent(libs.For, {
                              get each() {
                                return sectionProps.gem.main_entry_data ?? [];
                              },
                              children: (entry, index) => (() => {
                                const _el$42 = libs.createElement("Panel", {
                                    "class": "GemResultEntry"
                                  }, null),
                                  _el$43 = libs.createElement("Panel", {
                                    "class": "GemResultEntryHighlightFrame",
                                    hittest: false
                                  }, _el$42);
                                libs.insert(_el$42, libs.createComponent(equip_details.EquipmentAttrRow, {
                                  data: entry,
                                  type: "Main",
                                  get compareMap() {
                                    return sectionProps.compare;
                                  }
                                }), _el$43);
                                libs.effect(_$p => libs.setProp(_el$43, "visible", highlightedEntryKeys().has(`main_entry_data:${index()}`), _$p));
                                return _el$42;
                              })()
                            }), libs.createComponent(libs.For, {
                              get each() {
                                return sectionProps.gem.adverb_entry_data ?? [];
                              },
                              children: (entry, index) => (() => {
                                const _el$44 = libs.createElement("Panel", {
                                    "class": "GemResultEntry"
                                  }, null),
                                  _el$45 = libs.createElement("Panel", {
                                    "class": "GemResultEntryHighlightFrame",
                                    hittest: false
                                  }, _el$44);
                                libs.insert(_el$44, libs.createComponent(equip_details.EquipmentAttrRow, {
                                  data: entry,
                                  type: "Adverb",
                                  get compareMap() {
                                    return sectionProps.compare;
                                  }
                                }), _el$45);
                                libs.effect(_$p => libs.setProp(_el$45, "visible", highlightedEntryKeys().has(`adverb_entry_data:${index()}`), _$p));
                                return _el$44;
                              })()
                            }), libs.createComponent(libs.Index, {
                              get each() {
                                return sectionProps.gem.chaos_entry_data ?? [];
                              },
                              children: (chaos, index) => (() => {
                                const _el$46 = libs.createElement("Panel", {
                                    "class": "GemResultEntry"
                                  }, null),
                                  _el$47 = libs.createElement("Panel", {
                                    "class": "GemResultEntryHighlightFrame",
                                    hittest: false
                                  }, _el$46);
                                libs.insert(_el$46, (() => {
                                  const _c$ = libs.memo(() => !!chaos().id.startsWith("privilege_gem_suit_"));
                                  return () => _c$() ? libs.createComponent(equip_details.GemSpecialEffectRow, {
                                    get data() {
                                      return chaos();
                                    }
                                  }) : (() => {
                                    const _el$48 = libs.createElement("Panel", {
                                        "class": "ChaosEntry"
                                      }, null);
                                      libs.createElement("Panel", {
                                        id: "Point"
                                      }, _el$48);
                                      const _el$50 = libs.createElement("Label", {
                                        id: "EntryText",
                                        get text() {
                                          return equipment_utils.GetChaosRowInfo(chaos());
                                        },
                                        html: true
                                      }, _el$48);
                                    libs.effect(_$p => libs.setProp(_el$50, "text", equipment_utils.GetChaosRowInfo(chaos()), _$p));
                                    return _el$48;
                                  })();
                                })(), _el$47);
                                libs.effect(_$p => libs.setProp(_el$47, "visible", highlightedEntryKeys().has(`chaos_entry_data:${index}`), _$p));
                                return _el$46;
                              })()
                            })];
                          }
                        }), null);
                        libs.effect(_$p => libs.setProp(_el$41, "text", GetLocalization(sectionProps.title), _$p));
                        return _el$40;
                      })();
                    };
                    return [(() => {
                      const _el$51 = libs.createElement("Label", {
                        "class": "WindowTitle",
                        get text() {
                          return GetLocalization("#Equipment_GemEntryFusion_CompareTitle");
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$51, "text", GetLocalization("#Equipment_GemEntryFusion_CompareTitle"), _$p));
                      return _el$51;
                    })(), (() => {
                      const _el$52 = libs.createElement("Panel", {
                          "class": "VerticalScrollStyle",
                          width: "100%",
                          flowChildren: "down",
                          scroll: "y",
                          paddingBottom: "10px"
                        }, null),
                        _el$53 = libs.createElement("Panel", {
                          marginTop: "24px",
                          marginBottom: "24px",
                          horizontalAlign: "center",
                          flowChildren: "right"
                        }, _el$52);
                        libs.createElement("Panel", {
                          "class": "EntryArrow"
                        }, _el$53);
                        libs.createElement("Panel", {
                          "class": "EntryArrow"
                        }, _el$53);
                      libs.setProp(_el$52, "width", "100%");
                      libs.setProp(_el$52, "flowChildren", "down");
                      libs.setProp(_el$52, "scroll", "y");
                      libs.setProp(_el$52, "paddingBottom", "10px");
                      libs.insert(_el$52, libs.createComponent(ResultSection, {
                        title: "#Equipment_GemEntryFusion_OriginalAttributes",
                        get gem() {
                          return data.original;
                        }
                      }), _el$53);
                      libs.setProp(_el$53, "marginTop", "24px");
                      libs.setProp(_el$53, "marginBottom", "24px");
                      libs.setProp(_el$53, "horizontalAlign", "center");
                      libs.setProp(_el$53, "flowChildren", "right");
                      libs.insert(_el$52, libs.createComponent(ResultSection, {
                        title: "#Equipment_GemEntryFusion_ResultTitle",
                        get gem() {
                          return data.result;
                        },
                        compare: compare
                      }), null);
                      return _el$52;
                    })()];
                  }
                });
              }
            })];
          }
        });
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$29, "class", libs.classNames({
      IsMax: false
    }, "RarityColor" + rarity()), _$p));
    return _el$29;
  })();
};

const KEY_RARITY_COUNT$1 = 7;
const KEY_BAG_MAX_CAPACITY$1 = 400;
const DEVOUR_SLOT_COUNT = 12;
const DEVOUR_COLUMN_COUNT = 6;
const ATTRIBUTE_ROW_COUNT = 4;
const PREVIEW_GREEN = "#53b646";
const KEY_MAIN_ENTRY_FILTER_MODES = ["default", "include", "exclude"];
const KEY_MAIN_ENTRY_FILTER_LIST = Object.values(KeyValues.key_entry ?? {}).filter(entry => entry.entry_type === 1).sort((a, b) => a.id - b.id);
function parseKeyMainEntries(value) {
  if (!value) {
    return [];
  }
  if (typeof value === "string") {
    return JSON.parseSafe(value) ?? [];
  }
  return Array.isArray(value) ? value : [];
}
function getKeyLevelSetting(level) {
  return KeyValues.key_level_setting[String(level)];
}
function getKeyRaritySetting$1(rarity) {
  if (rarity == undefined) {
    return undefined;
  }
  return KeyValues.key_rarity_setting[rarity] ?? KeyValues.key_rarity_setting[String(rarity)];
}
function getKeyLevelMainBonus(level) {
  return toFiniteNumber(getKeyLevelSetting(level)?.main_bonus, 0);
}
function getKeyLevelIntensityBonus(level) {
  return toFiniteNumber(getKeyLevelSetting(level)?.intensity_bonus, 0);
}
function getKeyLevelExp(setting, level) {
  return toFiniteNumber(setting?.level_exp?.[level], 0);
}
function getNextKeyLevelExp(setting, level) {
  const nextLevelExp = getKeyLevelExp(setting, level + 1);
  if (nextLevelExp > 0) {
    return nextLevelExp;
  }
  return getKeyLevelExp(setting, level);
}
function getKeyExpPreview(setting, level, currentExp, addedExp, levelMax) {
  let previewLevel = level;
  let previewExp = currentExp + addedExp;
  let nextLevelExp = getNextKeyLevelExp(setting, previewLevel);
  while (previewLevel < levelMax && nextLevelExp > 0 && previewExp >= nextLevelExp) {
    previewExp -= nextLevelExp;
    previewLevel += 1;
    nextLevelExp = getNextKeyLevelExp(setting, previewLevel);
  }
  return {
    previewLevel,
    previewExp,
    previewNextLevelExp: nextLevelExp
  };
}
function formatKeyPreviewNumber(value, ratio = 2, isPercent = false) {
  const rounded = Round(value, ratio);
  return `${rounded}${isPercent ? "%" : ""}`;
}
function getKeyAttributeDisplays(data, currentLevel, previewLevel) {
  if (!data) {
    return [];
  }
  const keyData = data;
  const currentMainBonus = getKeyLevelMainBonus(currentLevel);
  const previewMainBonus = getKeyLevelMainBonus(previewLevel);
  return parseKeyMainEntries(keyData.main_entry_data).filter(entry => entry.id != "" && entry.value != undefined).map(entry => {
    const entryConfig = KeyValues.key_entry[entry.id];
    const attributeName = entryConfig?.entry_name ?? entry.id;
    const baseValue = toFiniteNumber(entry.base_value ?? entry.value, 0);
    const value = baseValue * (1 + currentMainBonus);
    const previewValue = baseValue * (1 + previewMainBonus);
    const changeValue = previewValue - value;
    const propertyText = GetLocalization("#property_" + attributeName);
    const isPercent = propertyText.startsWith("%");
    const ratio = entryConfig?.ratio ?? 2;
    const display = attribute_formatter.formatAttributeDisplay({
      id: attributeName,
      value,
      base_value: value,
      percent: entry.percent != undefined ? toFiniteNumber(entry.percent, 0) : undefined,
      base_min: entry.base_min != undefined ? toFiniteNumber(entry.base_min, 0) : undefined,
      base_max: entry.base_max != undefined ? toFiniteNumber(entry.base_max, 0) : undefined
    }, {
      config: entryConfig
    });
    return {
      text: `${display.valueText} ${display.nameHtml}`,
      entryType: toFiniteNumber(entryConfig?.entry_type, 1),
      changeText: changeValue > 0 ? `+${formatKeyPreviewNumber(changeValue, ratio, isPercent)}` : undefined
    };
  }).filter(data => data.text != "");
}
function LockKey(id, lock) {
  CallAction("/v1/key/lock", {
    id: Number(id),
    lock: lock
  });
}
const EquipmentKey = () => {
  let actionPanelRoot;
  const player_keys = solid_utils.createServiceNetData("player_keys", {});
  const keyUnreadIds = solid_utils.createPlayerUnreadIds("key");
  const keyBagCount = libs.createMemo(() => Object.keys(player_keys()).length);
  const isKeyBagFull = libs.createMemo(() => keyBagCount() >= KEY_BAG_MAX_CAPACITY$1);
  const [actionKeyID, setActionKeyID] = libs.createSignal();
  const [devourKeyIDs, setDevourKeyIDs] = libs.createSignal([]);
  const [fastAddRarity, setFastAddRarity] = libs.createSignal(0);
  const [showFilter, setShowFilter] = libs.createSignal(false);
  const [filterRarity, setFilterRarity] = libs.createSignal({});
  const [filterMainEntry, setFilterMainEntry] = libs.createSignal({});
  libs.onCleanup(() => keyUnreadIds.submitReadCache());
  const [dragInsideActionPanelRoot, setDragInsideActionPanelRoot] = libs.createSignal(false);
  const activeRarityFilter = libs.createMemo(() => {
    const rarityFilter = filterRarity();
    return Object.keys(rarityFilter).reduce((result, rarity) => {
      if (rarityFilter[Number(rarity)]) {
        result[Number(rarity)] = true;
      }
      return result;
    }, {});
  });
  const keys = libs.createMemo(() => {
    const rarityFilter = activeRarityFilter();
    const hasRarityFilter = Object.keys(rarityFilter).length > 0;
    const includedMainEntries = [];
    const excludedMainEntries = [];
    for (const [entryID, mode] of Object.entries(filterMainEntry())) {
      if (mode === "include") {
        includedMainEntries.push(entryID);
      } else if (mode === "exclude") {
        excludedMainEntries.push(entryID);
      }
    }
    const hasMainEntryFilter = includedMainEntries.length > 0 || excludedMainEntries.length > 0;
    const allKeys = player_keys();
    return Object.keys(allKeys).filter(id => {
      const key = allKeys[id];
      if (hasRarityFilter && rarityFilter[key?.rarity] !== true) {
        return false;
      }
      if (!hasMainEntryFilter) {
        return true;
      }
      const entryIDs = new Set(parseKeyMainEntries(key?.main_entry_data).map(entry => entry.id));
      return includedMainEntries.every(entryID => entryIDs.has(entryID)) && excludedMainEntries.every(entryID => !entryIDs.has(entryID));
    }).sort((a, b) => {
      const rarityDiff = (allKeys[b]?.rarity ?? 0) - (allKeys[a]?.rarity ?? 0);
      if (rarityDiff != 0) {
        return rarityDiff;
      }
      return Number(a) - Number(b);
    });
  });
  const actionKeyData = libs.createMemo(() => {
    const id = actionKeyID();
    if (!id) {
      return;
    }
    return player_keys()[id];
  });
  const getKeyData = id => {
    if (!id) {
      return;
    }
    return player_keys()[id];
  };
  const setRarityFilterEnabled = (rarity, enabled) => {
    setFilterRarity(prev => {
      const next = {
        ...prev
      };
      if (enabled) {
        next[rarity] = true;
      } else {
        delete next[rarity];
      }
      return next;
    });
  };
  const setMainEntryFilterMode = (entryID, mode) => {
    setFilterMainEntry(prev => {
      const next = {
        ...prev
      };
      if (mode === "default") {
        delete next[entryID];
      } else {
        next[entryID] = mode;
      }
      return next;
    });
  };
  const unusedDevourKeyIDMap = libs.createMemo(() => {
    const data = actionKeyData();
    const setting = data ? getKeyRaritySetting$1(data.rarity) : undefined;
    let previewLevel = toFiniteNumber(data?.level, 0);
    let previewExp = toFiniteNumber(data?.extra_exp, 0);
    const levelMax = toFiniteNumber(setting?.level_max, 0);
    const unusedMap = {};
    if (!data || levelMax <= 0) {
      return unusedMap;
    }
    for (const id of devourKeyIDs()) {
      if (previewLevel >= levelMax) {
        unusedMap[id] = true;
        continue;
      }
      const key = getKeyData(id);
      previewExp += toFiniteNumber(getKeyRaritySetting$1(key?.rarity)?.devour_exp, 0);
      let nextLevelExp = getNextKeyLevelExp(setting, previewLevel);
      while (previewLevel < levelMax && nextLevelExp > 0 && previewExp >= nextLevelExp) {
        previewExp -= nextLevelExp;
        previewLevel += 1;
        nextLevelExp = getNextKeyLevelExp(setting, previewLevel);
      }
    }
    return unusedMap;
  });
  const devourExp = libs.createMemo(() => {
    const unusedMap = unusedDevourKeyIDMap();
    return devourKeyIDs().reduce((total, id) => {
      if (unusedMap[id]) {
        return total;
      }
      const data = getKeyData(id);
      return total + toFiniteNumber(getKeyRaritySetting$1(data?.rarity)?.devour_exp, 0);
    }, 0);
  });
  const actionKeyUpgradeInfo = libs.createMemo(() => {
    const data = actionKeyData();
    const setting = data ? getKeyRaritySetting$1(data.rarity) : undefined;
    const level = toFiniteNumber(data?.level, 0);
    const currentExp = toFiniteNumber(data?.extra_exp, 0);
    const levelMax = toFiniteNumber(setting?.level_max, 0);
    const nextLevelExp = getNextKeyLevelExp(setting, level);
    const addedExp = devourExp();
    const preview = getKeyExpPreview(setting, level, currentExp, addedExp, levelMax);
    const canUpgrade = preview.previewLevel > level;
    const displayExp = canUpgrade && nextLevelExp > 0 ? nextLevelExp : currentExp + addedExp;
    const currentPercent = nextLevelExp > 0 ? toFiniteNumber(Clamp(currentExp / nextLevelExp, 0, 1) * 100, 0) : 0;
    const previewPercent = nextLevelExp > 0 ? toFiniteNumber(Clamp(displayExp / nextLevelExp, 0, 1) * 100, 0) : 0;
    const currentIntensity = toFiniteNumber(data?.intensity, 0);
    const keyClass = data ? toFiniteNumber(KeyValues.info_item_key[String(data.key_item_id)]?.class, 1) : 1;
    const classSetting = KeyValues.key_class_setting[keyClass] ?? KeyValues.key_class_setting[String(keyClass)];
    const rarityIntensity = toFiniteNumber(setting?.intensity, 0);
    const classIntensityBonus = toFiniteNumber(classSetting?.intensity_bonus, 0);
    const initialIntensity = rarityIntensity * (1 + classIntensityBonus);
    const previewIntensityMultiplier = 1 + getKeyLevelIntensityBonus(preview.previewLevel);
    const previewIntensity = initialIntensity * previewIntensityMultiplier;
    const intensityChange = previewIntensity - currentIntensity;
    const durabilityData = data;
    const currentDurability = toFiniteNumber(durabilityData?.durability, toFiniteNumber(durabilityData?.origin_durability, 0));
    const durabilityChange = preview.previewLevel - level;
    let warning;
    if (data && levelMax <= 0) {
      warning = "#Equipment_Warning_1";
    } else if (data && level >= levelMax) {
      warning = "#Equipment_Warning_2";
    }
    return {
      data,
      setting,
      level,
      previewLevel: preview.previewLevel,
      currentExp,
      levelMax,
      nextLevelExp,
      previewNextLevelExp: preview.previewNextLevelExp,
      addedExp,
      previewExp: preview.previewExp,
      displayExp,
      currentPercent,
      previewPercent,
      currentIntensity,
      previewIntensity,
      intensityChange,
      currentDurability,
      durabilityChange,
      canUpgrade,
      expText: data && levelMax > 0 && level >= levelMax ? "Max" : data && nextLevelExp > 0 ? `${displayExp}/${nextLevelExp}` : `${displayExp}`,
      warning,
      canConfirm: data != undefined && levelMax > 0 && level < levelMax && nextLevelExp > 0
    };
  });
  const isActionKeyMaxLevel = libs.createMemo(() => {
    const info = actionKeyUpgradeInfo();
    return info.data != undefined && info.levelMax > 0 && info.level >= info.levelMax;
  });
  const actionKeyAttributeRows = libs.createMemo(() => {
    const upgradeInfo = actionKeyUpgradeInfo();
    const rows = getKeyAttributeDisplays(actionKeyData(), upgradeInfo.level, upgradeInfo.previewLevel);
    return Array.from({
      length: ATTRIBUTE_ROW_COUNT
    }, (_, index) => rows[index]);
  });
  const removeDevourKey = id => {
    setDevourKeyIDs(prev => prev.filter(itemID => itemID != id));
  };
  const getDraggedKeyData = draggedPanel => {
    const dragData = LoadData(draggedPanel, "keyDrag");
    if (dragData) {
      return dragData;
    }
    const keyID = LoadData(draggedPanel, "key");
    if (keyID == undefined) {
      return;
    }
    return {
      id: String(keyID),
      source: "list"
    };
  };
  const removeKeyFromSource = dragData => {
    if (dragData.source == "action") {
      setActionKeyID(prev => prev == dragData.id ? undefined : prev);
    } else if (dragData.source == "devour") {
      removeDevourKey(dragData.id);
    }
  };
  const isDevourCandidate = (id, key, selectedMap, actionID) => {
    return key != undefined && key.locked !== true && selectedMap[id] !== true && id != actionID;
  };
  const isCursorInsideActionPanelRoot = () => {
    if (!actionPanelRoot) {
      return dragInsideActionPanelRoot();
    }
    const cursor = GameUI.GetCursorPosition();
    const position = actionPanelRoot.GetPositionWithinWindow();
    return cursor[0] >= position.x && cursor[0] <= position.x + actionPanelRoot.actuallayoutwidth && cursor[1] >= position.y && cursor[1] <= position.y + actionPanelRoot.actuallayoutheight;
  };
  const markDropHandled = draggedPanel => {
    SaveData(draggedPanel, "keyDropHandled", true);
    setDragInsideActionPanelRoot(true);
  };
  const setActionKeyFromDrag = dragData => {
    if (!player_keys()[dragData.id]) {
      return;
    }
    const previousActionID = actionKeyID();
    libs.batch(() => {
      setActionKeyID(dragData.id);
      setDevourKeyIDs(prev => {
        let next = prev.filter(id => id != dragData.id);
        if (dragData.source == "devour" && previousActionID && previousActionID != dragData.id) {
          const targetIndex = Math.min(dragData.index ?? next.length, next.length);
          next = [...next.slice(0, targetIndex), previousActionID, ...next.slice(targetIndex)];
        }
        return next.slice(0, DEVOUR_SLOT_COUNT);
      });
    });
  };
  const setDevourSlotFromDrag = (targetIndex, dragData) => {
    if (isActionKeyMaxLevel()) {
      return;
    }
    const draggedKey = player_keys()[dragData.id];
    if (!draggedKey || draggedKey.locked === true) {
      return;
    }
    const previousActionID = actionKeyID();
    libs.batch(() => {
      setDevourKeyIDs(prev => {
        const targetID = prev[targetIndex];
        let next = [...prev];
        const sourceIndex = dragData.source == "devour" ? next.indexOf(dragData.id) : -1;
        if (dragData.source == "action") {
          next = next.filter(id => id != dragData.id);
          const insertIndex = Math.min(targetIndex, next.length);
          if (targetID && targetID != dragData.id) {
            next[insertIndex] = dragData.id;
          } else {
            next = [...next.slice(0, insertIndex), dragData.id, ...next.slice(insertIndex)];
          }
          setActionKeyID(targetID && targetID != dragData.id ? targetID : undefined);
        } else if (sourceIndex >= 0) {
          if (sourceIndex == targetIndex) {
            return prev;
          }
          if (targetID) {
            next[sourceIndex] = targetID;
            next[targetIndex] = dragData.id;
          } else {
            next.splice(sourceIndex, 1);
            next.splice(Math.min(targetIndex, next.length), 0, dragData.id);
          }
        } else {
          next = next.filter(id => id != dragData.id);
          const insertIndex = Math.min(targetIndex, next.length);
          if (targetID && targetID != dragData.id) {
            next[insertIndex] = dragData.id;
          } else {
            next = [...next.slice(0, insertIndex), dragData.id, ...next.slice(insertIndex)];
          }
          if (previousActionID == dragData.id) {
            setActionKeyID(targetID && targetID != dragData.id ? targetID : undefined);
          }
        }
        return next.filter((id, index, arr) => id != undefined && arr.indexOf(id) == index).slice(0, DEVOUR_SLOT_COUNT);
      });
    });
  };
  const createKeyDragStart = (getID, getDragData) => {
    return (panel, dragCallbacks) => {
      const id = getID();
      const data = getKeyData(id);
      if (!id || !data) {
        return;
      }
      const dragData = getDragData?.() ?? {
        id,
        source: "list"
      };
      const pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
      const d = {
        ...data
      };
      libs.render(() => libs.createComponent(server_dungeon_key.DungeonKey, {
        data: d,
        keyID: id
      }), pDisplayPanel);
      dragCallbacks.displayPanel = pDisplayPanel;
      const position = GameUI.GetCursorPosition();
      if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
        dragCallbacks.offsetX = pDisplayPanel.GetPositionWithinWindow().x - position[0];
        dragCallbacks.offsetY = pDisplayPanel.GetPositionWithinWindow().y - position[1];
      }
      panel.AddClass("dragging_from");
      SaveData(pDisplayPanel, "key", id);
      SaveData(pDisplayPanel, "keyDrag", dragData);
      SaveData(pDisplayPanel, "keyDropHandled", false);
      setDragInsideActionPanelRoot(dragData.source != "list");
      return true;
    };
  };
  const handleKeyDragEnd = (panel, draggedPanel) => {
    const dragData = LoadData(draggedPanel, "keyDrag");
    const dropHandled = LoadData(draggedPanel, "keyDropHandled");
    if (dragData && dragData.source != "list" && !dropHandled && !isCursorInsideActionPanelRoot()) {
      removeKeyFromSource(dragData);
    }
    draggedPanel.DeleteAsync(-1);
    panel.RemoveClass("dragging_from");
    setDragInsideActionPanelRoot(false);
  };
  const handleDropToActionSlot = (pPanel, draggedPanel) => {
    pPanel.RemoveClass("potential_drop_target");
    if (LoadData(draggedPanel, "keyDropHandled")) {
      return;
    }
    const dragData = getDraggedKeyData(draggedPanel);
    if (!dragData) {
      return;
    }
    markDropHandled(draggedPanel);
    setActionKeyFromDrag(dragData);
  };
  const handleDropToDevourSlot = (pPanel, draggedPanel, targetIndex) => {
    pPanel.RemoveClass("potential_drop_target");
    if (LoadData(draggedPanel, "keyDropHandled")) {
      return;
    }
    const dragData = getDraggedKeyData(draggedPanel);
    if (!dragData) {
      return;
    }
    markDropHandled(draggedPanel);
    setDevourSlotFromDrag(targetIndex ?? devourKeyIDs().length, dragData);
  };
  const compareKeyEntries = (a, b) => {
    const rarityDiff = a[1].rarity - b[1].rarity;
    if (rarityDiff != 0) {
      return rarityDiff;
    }
    const itemDiff = a[1].key_item_id - b[1].key_item_id;
    if (itemDiff != 0) {
      return itemDiff;
    }
    return Number(a[0]) - Number(b[0]);
  };
  const handleFastAddDevourKeys = () => {
    if (isActionKeyMaxLevel()) {
      return;
    }
    setDevourKeyIDs(prev => {
      const allKeys = player_keys();
      const actionID = actionKeyID();
      const selectedMap = prev.reduce((result, id) => {
        result[id] = true;
        return result;
      }, {});
      const addList = prev.filter(id => {
        const key = allKeys[id];
        return isDevourCandidate(id, key, {}, actionID);
      });
      const fastAddCandidates = Object.entries(allKeys).sort(compareKeyEntries);
      for (const [id, key] of fastAddCandidates) {
        if (addList.length >= DEVOUR_SLOT_COUNT) {
          break;
        }
        if (!isDevourCandidate(id, key, selectedMap, actionID)) {
          continue;
        }
        if (fastAddRarity() != 0 && key.rarity != fastAddRarity()) {
          continue;
        }
        addList.push(id);
        selectedMap[id] = true;
      }
      if (addList.length == prev.length) {
        return prev;
      }
      return addList;
    });
  };
  libs.createEffect(() => {
    const allKeys = player_keys();
    const currentActionKeyID = actionKeyID();
    if (currentActionKeyID && !allKeys[currentActionKeyID]) {
      setActionKeyID();
    }
    const currentDevourKeyIDs = devourKeyIDs();
    const validDevourKeyIDs = currentDevourKeyIDs.filter(id => {
      const key = allKeys[id];
      return key != undefined && key.locked !== true;
    });
    if (validDevourKeyIDs.length != currentDevourKeyIDs.length) {
      setDevourKeyIDs(validDevourKeyIDs);
    }
  });
  libs.createEffect(() => {
    if (isActionKeyMaxLevel() && devourKeyIDs().length > 0) {
      setDevourKeyIDs([]);
    }
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipmentKeyRoot",
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        id: "BGLight",
        particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), (() => {
        const _el$2 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$3 = libs.createElement("Panel", {
            id: "ActionPanelRoot"
          }, _el$2),
          _el$4 = libs.createElement("Panel", {
            id: "ActionContent"
          }, _el$3),
          _el$5 = libs.createElement("Panel", {
            id: "ActionTip"
          }, _el$4);
          libs.createElement("Label", {
            text: "#Equipment_PutKey"
          }, _el$5);
          const _el$7 = libs.createElement("Panel", {
            "class": "ToolTipInfo"
          }, _el$5),
          _el$8 = libs.createElement("Panel", {
            id: "BarInfo"
          }, _el$4);
          libs.createElement("Label", {
            "class": "InfoKey",
            text: "#Equipment_KeyLevel"
          }, _el$8);
          const _el$0 = libs.createElement("Label", {
            "class": "InfoValue",
            html: true,
            get text() {
              return libs.memo(() => actionKeyUpgradeInfo().previewLevel != actionKeyUpgradeInfo().level)() ? `${ToColor(actionKeyUpgradeInfo().previewLevel.toString(), PREVIEW_GREEN)}/${actionKeyUpgradeInfo().levelMax}` : `${actionKeyUpgradeInfo().level}/${actionKeyUpgradeInfo().levelMax}`;
            }
          }, _el$8),
          _el$1 = libs.createElement("Label", {
            marginLeft: "64px",
            "class": "InfoKey",
            get text() {
              return GetLocalization("#Equipment_Intensity");
            },
            html: true
          }, _el$8),
          _el$10 = libs.createElement("Label", {
            "class": "InfoValue",
            get text() {
              return formatKeyPreviewNumber(actionKeyUpgradeInfo().currentIntensity);
            }
          }, _el$8),
          _el$12 = libs.createElement("Label", {
            marginLeft: "64px",
            "class": "InfoKey",
            get text() {
              return GetLocalization("#Equipment_Durability");
            },
            html: true
          }, _el$8),
          _el$13 = libs.createElement("Panel", {
            "class": "KeyDurabilityList"
          }, _el$8),
          _el$16 = libs.createElement("Panel", {
            id: "ExpBarContainer"
          }, _el$4),
          _el$17 = libs.createElement("Image", {
            id: "ExpAnimBar",
            get style() {
              return {
                clip: `rect( 0%, ${actionKeyUpgradeInfo().previewPercent}%, 100%, 0% )`
              };
            }
          }, _el$16),
          _el$18 = libs.createElement("Image", {
            id: "ExpBar",
            get style() {
              return {
                clip: `rect( 0%, ${actionKeyUpgradeInfo().currentPercent}%, 100%, 0% )`
              };
            }
          }, _el$16),
          _el$19 = libs.createElement("Label", {
            id: "CurExp",
            get text() {
              return actionKeyUpgradeInfo().expText;
            }
          }, _el$16),
          _el$22 = libs.createElement("Panel", {
            id: "TitleDivider"
          }, _el$4);
          libs.createElement("Image", {
            id: "LineLeft"
          }, _el$22);
          libs.createElement("Label", {
            id: "AccessTitle",
            text: "#Equipment_DevourKey"
          }, _el$22);
          libs.createElement("Image", {
            id: "LineRight"
          }, _el$22);
          const _el$26 = libs.createElement("Panel", {
            id: "DevourList"
          }, _el$4),
          _el$27 = libs.createElement("Panel", {
            id: "ActionFooter"
          }, _el$3),
          _el$28 = libs.createElement("Panel", {
            id: "FastAdd"
          }, _el$27),
          _el$30 = libs.createElement("Panel", {
            id: "KeyListRoot"
          }, _el$2),
          _el$31 = libs.createElement("Panel", {
            id: "KeyListTop"
          }, _el$30);
          libs.createElement("Image", {
            id: "KeyListTopBG"
          }, _el$31);
          const _el$33 = libs.createElement("Label", {
            id: "KeyListTopTitle",
            get ["class"]() {
              return libs.classNames({
                Full: isKeyBagFull()
              });
            },
            get text() {
              return `${keyBagCount()}/${KEY_BAG_MAX_CAPACITY$1}`;
            }
          }, _el$31),
          _el$34 = libs.createElement("Panel", {
            id: "KeyListBox"
          }, _el$30),
          _el$42 = libs.createElement("Panel", {
            id: "BtnsContainer"
          }, _el$30),
          _el$43 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "right"
          }, _el$42),
          _el$44 = libs.createElement("Button", {
            id: "ResetBtn",
            "class": "SecondaryButtonStates"
          }, _el$43);
        const _ref$ = actionPanelRoot;
        typeof _ref$ === "function" ? libs.use(_ref$, _el$3) : actionPanelRoot = _el$3;
        libs.setProp(_el$3, "onDragEnter", (pPanel, draggedPanel) => {
          if (LoadData(draggedPanel, "key")) {
            setDragInsideActionPanelRoot(true);
          }
        });
        libs.setProp(_el$3, "onDragLeave", (pPanel, draggedPanel) => {
          if (LoadData(draggedPanel, "key")) {
            setDragInsideActionPanelRoot(false);
          }
        });
        libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "ActionSlot",
          get classList() {
            return {
              HasKey: actionKeyData() != undefined
            };
          },
          onDragEnter: (pPanel, draggedPanel) => {
            if (LoadData(draggedPanel, "key")) {
              pPanel.AddClass("potential_drop_target");
            }
          },
          onDragLeave: pPanel => {
            pPanel.RemoveClass("potential_drop_target");
          },
          onDragDrop: (pPanel, draggedPanel) => {
            handleDropToActionSlot(pPanel, draggedPanel);
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return actionKeyData();
              },
              get children() {
                return libs.createComponent(server_dungeon_key.DungeonKey, {
                  get keyID() {
                    return actionKeyID();
                  },
                  oncontextmenu: () => {
                    setActionKeyID();
                  },
                  get onDragStart() {
                    return createKeyDragStart(actionKeyID, () => {
                      const id = actionKeyID();
                      return id ? {
                        id,
                        source: "action"
                      } : undefined;
                    });
                  },
                  onDragEnd: handleKeyDragEnd
                });
              }
            });
          }
        }), _el$5);
        libs.setProp(_el$7, "tooltip_text", "#Equipment_KeyTips");
        libs.setProp(_el$1, "marginLeft", "64px");
        libs.insert(_el$8, libs.createComponent(libs.Show, {
          get when() {
            return actionKeyUpgradeInfo().intensityChange > 0;
          },
          get children() {
            const _el$11 = libs.createElement("Label", {
              "class": "InfoValue PreviewValue PreviewChangeValue",
              get text() {
                return `+${formatKeyPreviewNumber(actionKeyUpgradeInfo().intensityChange)}`;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$11, "text", `+${formatKeyPreviewNumber(actionKeyUpgradeInfo().intensityChange)}`, _$p));
            return _el$11;
          }
        }), _el$12);
        libs.setProp(_el$12, "marginLeft", "64px");
        libs.insert(_el$13, libs.createComponent(libs.For, {
          get each() {
            return Array.from({
              length: actionKeyUpgradeInfo().currentDurability
            });
          },
          children: () => libs.createElement("Panel", {
            "class": "KeyDurabilityStar"
          }, null)
        }));
        libs.insert(_el$8, libs.createComponent(libs.Show, {
          get when() {
            return actionKeyUpgradeInfo().durabilityChange > 0;
          },
          get children() {
            const _el$14 = libs.createElement("Label", {
              "class": "InfoValue PreviewValue PreviewChangeValue",
              get text() {
                return `+${actionKeyUpgradeInfo().durabilityChange}`;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$14, "text", `+${actionKeyUpgradeInfo().durabilityChange}`, _$p));
            return _el$14;
          }
        }), null);
        libs.insert(_el$4, libs.createComponent(libs.Show, {
          get when() {
            return actionKeyUpgradeInfo().warning;
          },
          get children() {
            const _el$15 = libs.createElement("Label", {
              id: "DevourWarning",
              get text() {
                return actionKeyUpgradeInfo().warning;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$15, "text", actionKeyUpgradeInfo().warning, _$p));
            return _el$15;
          }
        }), _el$16);
        libs.insert(_el$16, libs.createComponent(libs.Show, {
          get when() {
            return actionKeyUpgradeInfo().addedExp > 0;
          },
          get children() {
            const _el$20 = libs.createElement("Label", {
              id: "AddexExp",
              get text() {
                return `+${actionKeyUpgradeInfo().addedExp}`;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$20, "text", `+${actionKeyUpgradeInfo().addedExp}`, _$p));
            return _el$20;
          }
        }), null);
        libs.insert(_el$16, libs.createComponent(libs.Show, {
          get when() {
            return actionKeyUpgradeInfo().canUpgrade;
          },
          get children() {
            return libs.createElement("Panel", {
              id: "UpgradeIcon"
            }, null);
          }
        }), null);
        libs.insert(_el$4, libs.createComponent(libs.For, {
          get each() {
            return actionKeyAttributeRows();
          },
          children: row => {
            return (() => {
              const _el$46 = libs.createElement("Panel", {
                "class": "AttributeRow"
              }, null);
              libs.insert(_el$46, libs.createComponent(libs.Show, {
                when: row,
                get children() {
                  return [libs.createElement("Panel", {
                    "class": "AttributePoint"
                  }, null), (() => {
                    const _el$48 = libs.createElement("Label", {
                      "class": "AttributeText",
                      html: true,
                      get text() {
                        return row.text;
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$48, "text", row.text, _$p));
                    return _el$48;
                  })(), libs.createComponent(libs.Show, {
                    get when() {
                      return row.changeText;
                    },
                    get children() {
                      const _el$49 = libs.createElement("Label", {
                        "class": "AttributeChange",
                        get text() {
                          return row.changeText;
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$49, "text", row.changeText, _$p));
                      return _el$49;
                    }
                  })];
                }
              }));
              libs.effect(_$p => libs.setProp(_el$46, "classList", {
                Empty: row == undefined,
                Main: row?.entryType == 1,
                Adverb: row?.entryType == 2
              }, _$p));
              return _el$46;
            })();
          }
        }), _el$22);
        libs.setProp(_el$26, "onDragEnter", (pPanel, draggedPanel) => {
          if (!isActionKeyMaxLevel() && LoadData(draggedPanel, "key")) {
            pPanel.AddClass("potential_drop_target");
          }
        });
        libs.setProp(_el$26, "onDragLeave", pPanel => {
          pPanel.RemoveClass("potential_drop_target");
        });
        libs.setProp(_el$26, "onDragDrop", (pPanel, draggedPanel) => {
          handleDropToDevourSlot(pPanel, draggedPanel);
        });
        libs.insert(_el$26, libs.createComponent(libs.For, {
          get each() {
            return Array.from({
              length: DEVOUR_SLOT_COUNT / DEVOUR_COLUMN_COUNT
            });
          },
          children: (_, rowIdx) => (() => {
            const _el$50 = libs.createElement("Panel", {
              "class": "DevourRow"
            }, null);
            libs.insert(_el$50, libs.createComponent(libs.For, {
              get each() {
                return Array.from({
                  length: DEVOUR_COLUMN_COUNT
                });
              },
              children: (_, columnIdx) => {
                const idx = () => rowIdx() * DEVOUR_COLUMN_COUNT + columnIdx();
                const keyID = () => devourKeyIDs()[idx()];
                const keyData = () => getKeyData(keyID());
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  "class": "DevourSlot",
                  get classList() {
                    return {
                      Unused: unusedDevourKeyIDMap()[keyID()] === true
                    };
                  },
                  onDragEnter: (pPanel, draggedPanel) => {
                    if (!isActionKeyMaxLevel() && LoadData(draggedPanel, "key")) {
                      pPanel.AddClass("potential_drop_target");
                    }
                  },
                  onDragLeave: pPanel => {
                    pPanel.RemoveClass("potential_drop_target");
                  },
                  onDragDrop: (pPanel, draggedPanel) => {
                    handleDropToDevourSlot(pPanel, draggedPanel, idx());
                  },
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return keyData();
                      },
                      keyed: true,
                      get fallback() {
                        return libs.createElement("Panel", {
                          "class": "EquipListGrid"
                        }, null);
                      },
                      children: () => libs.createComponent(server_dungeon_key.DungeonKey, {
                        get keyID() {
                          return keyID();
                        },
                        oncontextmenu: () => {
                          const id = keyID();
                          if (id) {
                            removeDevourKey(id);
                          }
                        },
                        get onDragStart() {
                          return createKeyDragStart(keyID, () => {
                            const id = keyID();
                            return id ? {
                              id,
                              source: "devour",
                              index: idx()
                            } : undefined;
                          });
                        },
                        onDragEnd: handleKeyDragEnd
                      })
                    });
                  }
                });
              }
            }));
            return _el$50;
          })()
        }));
        libs.insert(_el$28, libs.createComponent(EOM_DropDown.EOM_DropDown, {
          type: "EquipmentDropDown",
          get index() {
            return fastAddRarity();
          },
          menuPosition: "top",
          onChange: (index, item) => {
            setFastAddRarity(index);
          },
          get children() {
            return [libs.createElement("Label", {
              text: "#ALL"
            }, null), libs.createComponent(libs.For, {
              get each() {
                return Array(KEY_RARITY_COUNT$1);
              },
              children: (_, idx) => {
                const rarity = idx() + 1;
                return (() => {
                  const _el$52 = libs.createElement("Label", {
                    get style() {
                      return {
                        color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                      };
                    },
                    get text() {
                      return GetLocalization("#Equipment_Rarity_" + rarity);
                    }
                  }, null);
                  libs.effect(_p$ => {
                    const _v$0 = {
                        color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                      },
                      _v$1 = GetLocalization("#Equipment_Rarity_" + rarity);
                    _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$52, "style", _v$0, _p$._v$0));
                    _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$52, "text", _v$1, _p$._v$1));
                    return _p$;
                  }, {
                    _v$0: undefined,
                    _v$1: undefined
                  });
                  return _el$52;
                })();
              }
            })];
          }
        }), null);
        libs.insert(_el$28, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          text: "#Equipment_FastAdd",
          get enabled() {
            return !isActionKeyMaxLevel();
          },
          onactivate: () => {
            handleFastAddDevourKeys();
          }
        }), null);
        libs.insert(_el$28, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          text: "#Equipment_ClearFastAdd",
          onactivate: () => {
            setDevourKeyIDs([]);
          }
        }), null);
        libs.insert(_el$27, libs.createComponent(EOM_Button.EOM_Button, {
          id: "ConfirmDevour",
          color: "Confirm",
          text: "#Equipment_ConfirmDevour",
          get enabled() {
            return actionKeyUpgradeInfo().canConfirm;
          },
          onactivate: () => {
            CallActionRequest("/v1/key/devour", {
              target_id: toFiniteNumber(actionKeyID()),
              devoured_ids: devourKeyIDs().map(id => toFiniteNumber(id))
            }, () => {
              setDevourKeyIDs([]);
            }, () => {});
          }
        }), null);
        libs.insert(_el$34, libs.createComponent(libs.Show, {
          get when() {
            return showFilter();
          },
          get fallback() {
            return libs.createComponent(RecycleView.RecycleView, {
              id: "KeysList",
              input: keys,
              direction: "VerticalGrid",
              wheelStep: 88,
              childConfig: {
                width: 88,
                height: 88,
                margin: 2
              },
              grid_children: () => libs.createElement("Panel", {
                "class": "EquipListGrid"
              }, null),
              children: id => {
                const keyData = () => player_keys()[id()];
                const isNew = () => keyUnreadIds.isUnread(id());
                return (() => {
                  const _el$54 = libs.createElement("Panel", {
                      "class": "Item",
                      get onDragStart() {
                        return createKeyDragStart(id);
                      }
                    }, null),
                    _el$55 = libs.createElement("Panel", {
                      "class": "SelectedBorder",
                      hittest: false
                    }, _el$54);
                    libs.createElement("Panel", {
                      id: "NewTag",
                      hittest: false
                    }, _el$54);
                  libs.setProp(_el$54, "onmouseover", () => {
                    if (isNew()) {
                      keyUnreadIds.markRead(id());
                    }
                  });
                  libs.setProp(_el$54, "onDragEnd", handleKeyDragEnd);
                  libs.insert(_el$54, libs.createComponent(server_dungeon_key.DungeonKey, {
                    get keyID() {
                      return id();
                    },
                    oncontextmenu: p => {
                      const menus = {};
                      if (keyData().locked) {
                        menus["Hud_Equipment_Unlock"] = () => {
                          LockKey(id(), false);
                        };
                      } else {
                        menus["Hud_Equipment_Lock"] = () => {
                          LockKey(id(), true);
                        };
                      }
                      CustomUIConfig.showContextMenu(p, menus);
                    }
                  }), _el$55);
                  libs.effect(_p$ => {
                    const _v$10 = {
                        Selected: actionKeyID() == id(),
                        InDevour: devourKeyIDs().includes(id()),
                        New: isNew()
                      },
                      _v$11 = createKeyDragStart(id);
                    _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$54, "classList", _v$10, _p$._v$10));
                    _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$54, "onDragStart", _v$11, _p$._v$11));
                    return _p$;
                  }, {
                    _v$10: undefined,
                    _v$11: undefined
                  });
                  return _el$54;
                })();
              }
            });
          },
          get children() {
            const _el$35 = libs.createElement("Panel", {
                id: "KeyFilterWindow",
                "class": "VerticalScrollStyle",
                scroll: "y"
              }, null);
              libs.createElement("Label", {
                id: "RarityLabel",
                "class": "Subheading FirstHeading",
                text: "#Equipment_Rarity"
              }, _el$35);
              libs.createElement("Panel", {
                "class": "FilterLine"
              }, _el$35);
              const _el$38 = libs.createElement("Panel", {
                id: "RarityFilterList",
                "class": "CheckBoxList"
              }, _el$35),
              _el$39 = libs.createElement("Label", {
                "class": "Subheading",
                get text() {
                  return GetLocalization("#Key_GoodEffect");
                }
              }, _el$35);
              libs.createElement("Panel", {
                "class": "FilterLine"
              }, _el$35);
              const _el$41 = libs.createElement("Panel", {
                id: "KeyMainEntryFilterList"
              }, _el$35);
            libs.setProp(_el$35, "scroll", "y");
            libs.insert(_el$38, libs.createComponent(libs.For, {
              get each() {
                return Array(KEY_RARITY_COUNT$1);
              },
              children: (_, idx) => {
                const rarity = idx() + 1;
                return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  "class": "Rarity" + rarity,
                  get checked() {
                    return filterRarity()[rarity] ?? false;
                  },
                  get text() {
                    return GetLocalization(`#Equipment_Rarity_${rarity}`);
                  },
                  onchecked: b => {
                    setRarityFilterEnabled(rarity, b);
                  }
                });
              }
            }));
            libs.insert(_el$41, libs.createComponent(libs.For, {
              each: KEY_MAIN_ENTRY_FILTER_LIST,
              children: entry => {
                const mode = () => filterMainEntry()[entry.entry_name] ?? "default";
                return (() => {
                  const _el$57 = libs.createElement("Panel", {
                      "class": "KeyMainEntryFilterRow"
                    }, null),
                    _el$58 = libs.createElement("Label", {
                      html: true,
                      "class": "KeyMainEntryFilterName",
                      get text() {
                        return GetLocalization(`#property_${entry.entry_name}`).replace("%", "");
                      }
                    }, _el$57),
                    _el$59 = libs.createElement("Panel", {
                      "class": "KeyMainEntryFilterModeList"
                    }, _el$57);
                  libs.insert(_el$59, libs.createComponent(libs.For, {
                    each: KEY_MAIN_ENTRY_FILTER_MODES,
                    children: (filterMode, index) => (() => {
                      const _el$60 = libs.createElement("Panel", {
                          "class": "KeyMainEntryFilterModeOption"
                        }, null),
                        _el$61 = libs.createElement("Button", {
                          get ["class"]() {
                            return libs.classNames("KeyMainEntryFilterModeButton", `KeyMainEntryFilterMode-${filterMode}`, {
                              Selected: mode() === filterMode
                            });
                          }
                        }, _el$60),
                        _el$62 = libs.createElement("Label", {
                          get text() {
                            return GetLocalization(`#RuneFilter_AdverbEntryMode_${filterMode}`);
                          }
                        }, _el$61);
                      libs.setProp(_el$61, "onactivate", () => setMainEntryFilterMode(entry.entry_name, filterMode));
                      libs.insert(_el$60, libs.createComponent(libs.Show, {
                        get when() {
                          return index() < KEY_MAIN_ENTRY_FILTER_MODES.length - 1;
                        },
                        get children() {
                          return libs.createElement("Label", {
                            "class": "KeyMainEntryFilterModeSeparator",
                            text: "/"
                          }, null);
                        }
                      }), null);
                      libs.effect(_p$ => {
                        const _v$12 = libs.classNames("KeyMainEntryFilterModeButton", `KeyMainEntryFilterMode-${filterMode}`, {
                            Selected: mode() === filterMode
                          }),
                          _v$13 = GetLocalization(`#RuneFilter_AdverbEntryMode_${filterMode}`);
                        _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$61, "class", _v$12, _p$._v$12));
                        _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$62, "text", _v$13, _p$._v$13));
                        return _p$;
                      }, {
                        _v$12: undefined,
                        _v$13: undefined
                      });
                      return _el$60;
                    })()
                  }));
                  libs.effect(_$p => libs.setProp(_el$58, "text", GetLocalization(`#property_${entry.entry_name}`).replace("%", ""), _$p));
                  return _el$57;
                })();
              }
            }));
            libs.effect(_$p => libs.setProp(_el$39, "text", GetLocalization("#Key_GoodEffect"), _$p));
            return _el$35;
          }
        }));
        libs.setProp(_el$43, "align", "center center");
        libs.setProp(_el$43, "flowChildren", "right");
        libs.insert(_el$43, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          id: "FilterBtn",
          get classList() {
            return {
              ShowBtnBorder: showFilter()
            };
          },
          text: "#Hud_Equipment_Filter",
          onactivate: () => {
            setShowFilter(prev => {
              return !prev;
            });
          }
        }), _el$44);
        libs.setProp(_el$44, "onactivate", () => {
          libs.batch(() => {
            setFilterRarity({});
            setFilterMainEntry({});
          });
        });
        libs.insert(_el$43, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          get text() {
            return actionKeyData()?.locked ? "#Hud_Equipment_Unlock" : "#Hud_Equipment_Lock";
          },
          get enabled() {
            return actionKeyID() != undefined;
          },
          onactivate: () => {
            const id = actionKeyID();
            if (id) {
              let lock = player_keys()[id].locked;
              LockKey(id, !lock);
            }
          }
        }), null);
        libs.effect(_p$ => {
          const _v$ = libs.memo(() => actionKeyUpgradeInfo().previewLevel != actionKeyUpgradeInfo().level)() ? `${ToColor(actionKeyUpgradeInfo().previewLevel.toString(), PREVIEW_GREEN)}/${actionKeyUpgradeInfo().levelMax}` : `${actionKeyUpgradeInfo().level}/${actionKeyUpgradeInfo().levelMax}`,
            _v$2 = GetLocalization("#Equipment_Intensity"),
            _v$3 = formatKeyPreviewNumber(actionKeyUpgradeInfo().currentIntensity),
            _v$4 = GetLocalization("#Equipment_Durability"),
            _v$5 = {
              clip: `rect( 0%, ${actionKeyUpgradeInfo().previewPercent}%, 100%, 0% )`
            },
            _v$6 = {
              clip: `rect( 0%, ${actionKeyUpgradeInfo().currentPercent}%, 100%, 0% )`
            },
            _v$7 = actionKeyUpgradeInfo().expText,
            _v$8 = libs.classNames({
              Full: isKeyBagFull()
            }),
            _v$9 = `${keyBagCount()}/${KEY_BAG_MAX_CAPACITY$1}`;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$0, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$17, "style", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$18, "style", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$19, "text", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$33, "class", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$33, "text", _v$9, _p$._v$9));
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
        return _el$2;
      })()];
    }
  });
};

const KEY_RARITY_COUNT = 7;
const KEY_BAG_MAX_CAPACITY = 400;
const KEY_BREAK_PREVIEW_COUNT = 24;
const KEY_BREAK_MAX_SELECT_NUM = KEY_BREAK_PREVIEW_COUNT;
const getKeyRaritySetting = rarity => KeyValues.key_rarity_setting[rarity] ?? KeyValues.key_rarity_setting[String(rarity)];
const getKeyBreakRewards = keys => {
  const rewards = {};
  for (const key of keys) {
    for (const entry of (getKeyRaritySetting(key.rarity)?.break_bonus ?? "").split("|")) {
      const [itemID, amountText] = entry.split(":");
      const amount = toFiniteNumber(amountText, 0);
      if (itemID && amount > 0) rewards[itemID] = toFiniteNumber(rewards[itemID], 0) + amount;
    }
  }
  return Object.entries(rewards).map(([itemID, amount]) => ({
    itemID,
    amount
  }));
};
const lockKey = (id, lock) => CallAction("/v1/key/lock", {
  id: Number(id),
  lock
});
const EquipmentKeyBreak = () => {
  const playerKeys = solid_utils.createServiceNetData("player_keys", {});
  const keyUnreadIds = solid_utils.createPlayerUnreadIds("key");
  const [selectedKeyIDs, setSelectedKeyIDs] = libs.createSignal([]);
  const [brokenKeyIDs, setBrokenKeyIDs] = libs.createSignal({});
  const [fastAddRarity, setFastAddRarity] = libs.createSignal(0);
  const [showFilter, setShowFilter] = libs.createSignal(false);
  const [filterRarity, setFilterRarity] = libs.createSignal({});
  libs.onCleanup(() => keyUnreadIds.submitReadCache());
  const keyBagCount = libs.createMemo(() => Object.keys(playerKeys()).filter(id => brokenKeyIDs()[id] !== true).length);
  const isKeyBagFull = libs.createMemo(() => keyBagCount() >= KEY_BAG_MAX_CAPACITY);
  const keys = libs.createMemo(() => {
    const selectedRarities = Object.keys(filterRarity()).filter(rarity => filterRarity()[Number(rarity)]).map(Number);
    return Object.entries(playerKeys()).filter(([id, key]) => brokenKeyIDs()[id] !== true && (selectedRarities.length == 0 || selectedRarities.includes(key.rarity))).sort((a, b) => b[1].rarity - a[1].rarity || Number(a[0]) - Number(b[0])).map(([id]) => id);
  });
  const selectedKeys = libs.createMemo(() => selectedKeyIDs().map(id => playerKeys()[id]).filter(key => key != undefined));
  const rewardList = libs.createMemo(() => getKeyBreakRewards(selectedKeys()));
  libs.createEffect(() => {
    const validIDs = selectedKeyIDs().filter(id => brokenKeyIDs()[id] !== true && playerKeys()[id] != undefined && playerKeys()[id].locked !== true);
    if (validIDs.length != selectedKeyIDs().length) setSelectedKeyIDs(validIDs);
  });
  const toggleKey = id => {
    if (!playerKeys()[id] || playerKeys()[id].locked === true) return;
    setSelectedKeyIDs(previous => {
      if (previous.includes(id)) return previous.filter(keyID => keyID != id);
      return previous.length < KEY_BREAK_MAX_SELECT_NUM ? [...previous, id] : previous;
    });
  };
  const fastAdd = () => setSelectedKeyIDs(previous => {
    const selected = previous.filter(id => playerKeys()[id]?.locked !== true);
    const selectedSet = new Set(selected);
    for (const id of keys()) {
      if (selected.length >= KEY_BREAK_MAX_SELECT_NUM) break;
      const key = playerKeys()[id];
      if (!key || key.locked === true || selectedSet.has(id) || fastAddRarity() != 0 && key.rarity != fastAddRarity()) continue;
      selected.push(id);
      selectedSet.add(id);
    }
    return selected;
  });
  const setRarityFilterEnabled = (rarity, enabled) => setFilterRarity(previous => {
    const next = {
      ...previous
    };
    if (enabled) next[rarity] = true;else delete next[rarity];
    return next;
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipmentKeyBreakRoot",
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        id: "BGLight",
        particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), (() => {
        const _el$2 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$3 = libs.createElement("Panel", {
            id: "BreakPanel"
          }, _el$2),
          _el$4 = libs.createElement("Panel", {
            "class": "KeyBreakSectionRow KeyBreakTitleRow"
          }, _el$3);
          libs.createElement("Panel", {
            "class": "KeyBreakSectionLine KeyBreakSectionLineLeft"
          }, _el$4);
          libs.createElement("Label", {
            id: "BreakTitle",
            text: "#EquipmentTab_key_break"
          }, _el$4);
          libs.createElement("Panel", {
            "class": "KeyBreakSectionLine KeyBreakSectionLineRight"
          }, _el$4);
          const _el$8 = libs.createElement("Panel", {
            id: "SelectedKeyList"
          }, _el$3),
          _el$9 = libs.createElement("Panel", {
            id: "FastAdd"
          }, _el$3),
          _el$1 = libs.createElement("Panel", {
            "class": "KeyBreakSectionRow KeyBreakInfoRow"
          }, _el$3);
          libs.createElement("Panel", {
            "class": "KeyBreakSectionLine KeyBreakSectionLineLeft"
          }, _el$1);
          libs.createElement("Label", {
            id: "RewardTitle",
            text: "#Equipment_KeyBreakReward"
          }, _el$1);
          libs.createElement("Panel", {
            "class": "KeyBreakSectionLine KeyBreakSectionLineRight"
          }, _el$1);
          const _el$13 = libs.createElement("Panel", {
            id: "BreakReward"
          }, _el$3),
          _el$14 = libs.createElement("Panel", {
            id: "RewardList"
          }, _el$13),
          _el$15 = libs.createElement("Panel", {
            id: "BreakFooter"
          }, _el$3),
          _el$16 = libs.createElement("Panel", {
            id: "KeyListRoot"
          }, _el$2),
          _el$17 = libs.createElement("Panel", {
            id: "KeyListTop"
          }, _el$16);
          libs.createElement("Image", {
            id: "KeyListTopBG"
          }, _el$17);
          const _el$19 = libs.createElement("Label", {
            id: "KeyListTopTitle",
            get text() {
              return `${keyBagCount()}/${KEY_BAG_MAX_CAPACITY}`;
            }
          }, _el$17),
          _el$20 = libs.createElement("Panel", {
            id: "KeyListBox"
          }, _el$16),
          _el$25 = libs.createElement("Panel", {
            id: "BtnsContainer"
          }, _el$16),
          _el$26 = libs.createElement("Button", {
            id: "ResetBtn",
            "class": "SecondaryButtonStates"
          }, _el$25);
        libs.insert(_el$8, libs.createComponent(libs.For, {
          get each() {
            return Array(KEY_BREAK_PREVIEW_COUNT);
          },
          children: (_, index) => {
            const keyID = () => selectedKeyIDs()[index()];
            return (() => {
              const _el$27 = libs.createElement("Panel", {
                "class": "SelectedKeySlot"
              }, null);
              libs.insert(_el$27, libs.createComponent(libs.Show, {
                get when() {
                  return keyID();
                },
                get fallback() {
                  return libs.createElement("Panel", {
                    "class": "KeyListGrid"
                  }, null);
                },
                get children() {
                  return libs.createComponent(server_dungeon_key.DungeonKey, {
                    get keyID() {
                      return keyID();
                    },
                    oncontextmenu: () => setSelectedKeyIDs(previous => previous.filter(id => id != keyID()))
                  });
                }
              }));
              return _el$27;
            })();
          }
        }));
        libs.insert(_el$9, libs.createComponent(EOM_DropDown.EOM_DropDown, {
          type: "EquipmentDropDown",
          get index() {
            return fastAddRarity();
          },
          menuPosition: "top",
          onChange: index => setFastAddRarity(index),
          get children() {
            return [libs.createElement("Label", {
              text: "#ALL"
            }, null), libs.createComponent(libs.For, {
              get each() {
                return Array(KEY_RARITY_COUNT);
              },
              children: (_, index) => {
                const rarity = index() + 1;
                return (() => {
                  const _el$29 = libs.createElement("Label", {
                    get style() {
                      return {
                        color: equipment_utils.EQUIP_RARITY_COLOR[index()]
                      };
                    },
                    get text() {
                      return GetLocalization(`#Equipment_Rarity_${rarity}`);
                    }
                  }, null);
                  libs.effect(_p$ => {
                    const _v$4 = {
                        color: equipment_utils.EQUIP_RARITY_COLOR[index()]
                      },
                      _v$5 = GetLocalization(`#Equipment_Rarity_${rarity}`);
                    _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$29, "style", _v$4, _p$._v$4));
                    _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$29, "text", _v$5, _p$._v$5));
                    return _p$;
                  }, {
                    _v$4: undefined,
                    _v$5: undefined
                  });
                  return _el$29;
                })();
              }
            })];
          }
        }), null);
        libs.insert(_el$9, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          text: "#Equipment_FastAdd",
          onactivate: fastAdd
        }), null);
        libs.insert(_el$9, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          text: "#Equipment_ClearFastAdd",
          onactivate: () => setSelectedKeyIDs([])
        }), null);
        libs.insert(_el$14, libs.createComponent(libs.For, {
          get each() {
            return rewardList();
          },
          children: reward => (() => {
            const _el$30 = libs.createElement("Panel", {
                "class": "RewardItem"
              }, null),
              _el$31 = libs.createElement("Label", {
                get text() {
                  return reward.amount;
                }
              }, _el$30);
            libs.insert(_el$30, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return reward.itemID;
              }
            }), _el$31);
            libs.effect(_$p => libs.setProp(_el$31, "text", reward.amount, _$p));
            return _el$30;
          })()
        }));
        libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_Button, {
          id: "ConfirmBreak",
          color: "Confirm",
          text: "#Equipment_Break",
          get enabled() {
            return selectedKeyIDs().length > 0;
          },
          onactivate: () => {
            const ids = selectedKeyIDs().map(id => Number(id));
            if (ids.length > 0) CallActionRequest("/v1/key/break", {
              ids
            }, result => {
              if (result.code != 0 && result.code != 200) {
                return;
              }
              setBrokenKeyIDs(previous => {
                const next = {
                  ...previous
                };
                for (const id of ids) {
                  next[String(id)] = true;
                }
                return next;
              });
              setSelectedKeyIDs([]);
            });
          }
        }));
        libs.insert(_el$20, libs.createComponent(libs.Show, {
          get when() {
            return showFilter();
          },
          get fallback() {
            return libs.createComponent(RecycleView.RecycleView, {
              id: "KeysList",
              input: keys,
              direction: "VerticalGrid",
              wheelStep: 88,
              childConfig: {
                width: 88,
                height: 88,
                margin: 2
              },
              grid_children: () => libs.createElement("Panel", {
                "class": "KeyListGrid"
              }, null),
              children: id => {
                const keyID = () => id();
                const keyData = () => playerKeys()[keyID()];
                const isNew = () => keyUnreadIds.isUnread(keyID());
                return (() => {
                  const _el$33 = libs.createElement("Panel", {
                      "class": "Item"
                    }, null),
                    _el$34 = libs.createElement("Panel", {
                      "class": "SelectedBorder",
                      hittest: false
                    }, _el$33);
                    libs.createElement("Panel", {
                      id: "NewTag",
                      hittest: false
                    }, _el$33);
                  libs.setProp(_el$33, "onactivate", () => toggleKey(keyID()));
                  libs.setProp(_el$33, "onmouseover", () => isNew() && keyUnreadIds.markRead(keyID()));
                  libs.insert(_el$33, libs.createComponent(server_dungeon_key.DungeonKey, {
                    get keyID() {
                      return keyID();
                    },
                    oncontextmenu: panel => {
                      const key = keyData();
                      if (!key) return;
                      CustomUIConfig.showContextMenu(panel, key.locked ? {
                        Hud_Equipment_Unlock: () => lockKey(keyID(), false)
                      } : {
                        Hud_Equipment_Lock: () => lockKey(keyID(), true)
                      });
                    }
                  }), _el$34);
                  libs.effect(_$p => libs.setProp(_el$33, "classList", {
                    Selected: selectedKeyIDs().includes(keyID()),
                    Locked: keyData()?.locked === true,
                    New: isNew()
                  }, _$p));
                  return _el$33;
                })();
              }
            });
          },
          get children() {
            const _el$21 = libs.createElement("Panel", {
                id: "KeyFilterWindow",
                "class": "VerticalScrollStyle",
                scroll: "y"
              }, null);
              libs.createElement("Label", {
                "class": "Subheading",
                text: "#Equipment_Rarity"
              }, _el$21);
              libs.createElement("Panel", {
                "class": "FilterLine"
              }, _el$21);
              const _el$24 = libs.createElement("Panel", {
                id: "RarityFilterList",
                "class": "CheckBoxList"
              }, _el$21);
            libs.setProp(_el$21, "scroll", "y");
            libs.insert(_el$24, libs.createComponent(libs.For, {
              get each() {
                return Array(KEY_RARITY_COUNT);
              },
              children: (_, index) => {
                const rarity = index() + 1;
                return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  "class": `Rarity${rarity}`,
                  get checked() {
                    return filterRarity()[rarity] ?? false;
                  },
                  get text() {
                    return GetLocalization(`#Equipment_Rarity_${rarity}`);
                  },
                  onchecked: checked => setRarityFilterEnabled(rarity, checked)
                });
              }
            }));
            return _el$21;
          }
        }));
        libs.insert(_el$25, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          id: "FilterBtn",
          get classList() {
            return {
              ShowBtnBorder: showFilter()
            };
          },
          text: "#Hud_Equipment_Filter",
          onactivate: () => setShowFilter(previous => !previous)
        }), _el$26);
        libs.setProp(_el$26, "onactivate", () => libs.batch(() => {
          setFilterRarity({});
          setShowFilter(false);
        }));
        libs.effect(_p$ => {
          const _v$ = {
              Show: rewardList().length > 0
            },
            _v$2 = {
              Full: isKeyBagFull()
            },
            _v$3 = `${keyBagCount()}/${KEY_BAG_MAX_CAPACITY}`;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$13, "classList", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$19, "classList", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$19, "text", _v$3, _p$._v$3));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined
        });
        return _el$2;
      })()];
    }
  });
};

const EQUIP_PART_LIST = [1, 2, 7, 8, 5, 6, 3, 4];
const EQUIP_PART_ICON$1 = {
  1: "icon_zb_03.png",
  2: "icon_zb_08.png",
  3: "icon_zb_09.png",
  4: "icon_zb_07.png",
  5: "icon_zb_06.png",
  6: "icon_zb_05.png",
  7: "icon_zb_04.png",
  8: "icon_zb_02.png"
};
const HUNTLOOT_PART_BASE = 100;
const HUNTLOOT_PART_LIST = [1, 2, 3].map(part => HUNTLOOT_PART_BASE + part);
const HUNTLOOT_PART_ICON = {
  [HUNTLOOT_PART_BASE + 1]: "icon_zb_16.png",
  [HUNTLOOT_PART_BASE + 2]: "icon_zb_17.png",
  [HUNTLOOT_PART_BASE + 3]: "icon_zb_18.png"
};
const isHuntlootPart = part => part >= HUNTLOOT_PART_BASE;
function formatBonus(value) {
  return `${Math.round(value * 100)}%`;
}
function EquipmentPartLevelUp() {
  const store = equipment_comp.useEquipmentStore();
  const [, setShowTokens] = store.showTokens;
  const partDatas = solid_utils.createServiceNetData("player_equipment_part_datas", {});
  const huntlootPartDatas = solid_utils.createServiceNetData("player_huntloot_part_datas", {});
  const [selectedPart, setSelectedPart] = libs.createSignal(1);
  const [requesting, setRequesting] = libs.createSignal(false);
  const [showBatchConsume, setShowBatchConsume] = libs.createSignal(false);
  const [slotScrollPercent, setSlotScrollPercent] = libs.createSignal(0);
  const maxLevel = () => Math.max(...Object.values(selectedIsHuntloot() ? KeyValues.huntloot_level_setting : KeyValues.equip_level_setting).map(data => data.level));
  let partLevelUpParticle;
  let upgradeParticle;
  let upgradeParticle2;
  let particleSchedule;
  let partLevelSlotsHandle;
  const selectedIsHuntloot = () => isHuntlootPart(selectedPart());
  const getSettingAt = level => selectedIsHuntloot() ? KeyValues.huntloot_level_setting[level] : KeyValues.equip_level_setting[level];
  const getPartIcon = part => isHuntlootPart(part) ? HUNTLOOT_PART_ICON[part] : EQUIP_PART_ICON$1[part];
  const getPartName = part => isHuntlootPart(part) ? GetLocalization(`#Equipment_HuntlootPart_${part - HUNTLOOT_PART_BASE}`) : GetLocalization(`#Equipment_Part_${part}`);
  const currentLevel = libs.createMemo(() => {
    if (selectedIsHuntloot()) {
      return huntlootPartDatas()[selectedPart() - HUNTLOOT_PART_BASE]?.level ?? 0;
    }
    return partDatas()[selectedPart()]?.level ?? 0;
  });
  const currentSetting = libs.createMemo(() => getSettingAt(currentLevel()));
  const nextSetting = libs.createMemo(() => getSettingAt(currentLevel() + 1));
  const isMax = libs.createMemo(() => currentLevel() >= maxLevel() || nextSetting() == undefined);
  const consumeList = libs.createMemo(() => {
    store.player_tokens();
    store.player_props();
    const consume = currentSetting()?.consume;
    if (!consume || isMax()) return [];
    return consume.split("|").map(item => {
      const [itemID, count] = item.split(":");
      return {
        itemID,
        needCount: Number(count),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(item => item.needCount > 0);
  });
  const canLevelUp = libs.createMemo(() => !isMax() && consumeList().every(item => item.hasCount >= item.needCount));
  const maxReachableLevel = libs.createMemo(() => {
    store.player_tokens();
    store.player_props();
    const remaining = {};
    let level = currentLevel();
    while (level < maxLevel() && getSettingAt(level + 1) != undefined) {
      const consume = getSettingAt(level)?.consume;
      if (!consume) break;
      const levelConsumes = consume.split("|").map(item => {
        const [itemID, count] = item.split(":");
        remaining[itemID] ??= GetServiceItemCount(itemID);
        return {
          itemID,
          needCount: Number(count)
        };
      }).filter(item => item.needCount > 0);
      if (!levelConsumes.every(item => remaining[item.itemID] >= item.needCount)) break;
      levelConsumes.forEach(item => remaining[item.itemID] -= item.needCount);
      level++;
    }
    return level;
  });
  const batchConsumeList = libs.createMemo(() => {
    const totals = {};
    for (let level = currentLevel(); level < maxReachableLevel(); level++) {
      const consume = getSettingAt(level)?.consume;
      if (!consume) break;
      consume.split("|").forEach(item => {
        const [itemID, count] = item.split(":");
        const needCount = Number(count);
        if (needCount > 0) totals[itemID] = (totals[itemID] ?? 0) + needCount;
      });
    }
    return Object.entries(totals).map(([itemID, needCount]) => ({
      itemID,
      needCount,
      hasCount: GetServiceItemCount(itemID)
    }));
  });
  const canBatchLevelUp = libs.createMemo(() => maxReachableLevel() > currentLevel());
  const displayedConsumeList = libs.createMemo(() => showBatchConsume() && canBatchLevelUp() ? batchConsumeList() : consumeList());
  libs.createEffect(() => {
    const tokenIDs = [...consumeList(), ...batchConsumeList()].map(item => Number(item.itemID));
    setShowTokens(Array.from(new Set(tokenIDs)));
  });
  libs.onCleanup(() => {
    setShowTokens([]);
    if (particleSchedule != undefined) {
      $.CancelScheduled(particleSchedule);
    }
  });
  const playLevelUpParticle = () => {
    if (!partLevelUpParticle && !upgradeParticle && !upgradeParticle2) return;
    if (particleSchedule != undefined) {
      $.CancelScheduled(particleSchedule);
    }
    partLevelUpParticle?.AddClass("Show");
    partLevelUpParticle?.ReloadScene();
    upgradeParticle?.AddClass("Show");
    upgradeParticle?.ReloadScene();
    upgradeParticle2?.AddClass("Show");
    upgradeParticle2?.ReloadScene();
    particleSchedule = $.Schedule(1.2, () => {
      particleSchedule = undefined;
      partLevelUpParticle?.RemoveClass("Show");
      upgradeParticle?.RemoveClass("Show");
      upgradeParticle2?.RemoveClass("Show");
    });
  };
  const levelUp = (level, isBatch = false) => {
    if (level <= 0 || requesting()) return;
    if (isBatch ? !canBatchLevelUp() : !canLevelUp()) return;
    setRequesting(true);
    CallActionRequest(selectedIsHuntloot() ? "/v1/huntloot/levelup_part" : "/v1/equip/levelup_part", {
      part: selectedIsHuntloot() ? selectedPart() - HUNTLOOT_PART_BASE : selectedPart(),
      level
    }, result => {
      if (result.code !== 0) {
        setRequesting(false);
        if (result.message) ErrorMessage(result.message);
        return;
      }
      playLevelUpParticle();
      setShowBatchConsume(false);
      setRequesting(false);
      Game.EmitSound("ui.treasure_01");
    }, () => {
      setRequesting(false);
    });
  };
  const PartSlot = props => {
    const level = () => isHuntlootPart(props.part) ? huntlootPartDatas()[props.part - HUNTLOOT_PART_BASE]?.level ?? 0 : partDatas()[props.part]?.level ?? 0;
    return libs.createComponent(EOM_Button.EOM_BaseButton, {
      get ["class"]() {
        return libs.classNames("PartLevelSlot", {
          Selected: selectedPart() == props.part
        });
      },
      onactivate: () => setSelectedPart(props.part),
      get children() {
        return [(() => {
          const _el$ = libs.createElement("Panel", {
              "class": "PartIconContainer"
            }, null),
            _el$2 = libs.createElement("Image", {
              "class": "PartIcon",
              get src() {
                return getSrcPath(`conv/icon/${getPartIcon(props.part)}`);
              }
            }, _el$);
          libs.effect(_$p => libs.setProp(_el$2, "src", getSrcPath(`conv/icon/${getPartIcon(props.part)}`), _$p));
          return _el$;
        })(), (() => {
          const _el$3 = libs.createElement("Panel", {
              "class": "PartTextContainer"
            }, null),
            _el$4 = libs.createElement("Label", {
              "class": "PartName",
              get text() {
                return getPartName(props.part);
              }
            }, _el$3),
            _el$5 = libs.createElement("Label", {
              "class": "PartLevel",
              get text() {
                return LocalizeWithVars("#Equipment_PartLevel_ListLevel", {
                  level: level()
                });
              }
            }, _el$3);
          libs.effect(_p$ => {
            const _v$ = getPartName(props.part),
              _v$2 = LocalizeWithVars("#Equipment_PartLevel_ListLevel", {
                level: level()
              });
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$3;
        })(), libs.createElement("Panel", {
          "class": "SelectedBorder"
        }, null)];
      }
    });
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipmentPartLevelUpRoot",
    get children() {
      const _el$7 = libs.createElement("Panel", {
          id: "PartLevelContent"
        }, null),
        _el$8 = libs.createElement("Panel", {
          id: "PartLevelLeft"
        }, _el$7),
        _el$9 = libs.createElement("Panel", {
          id: "PartSelected"
        }, _el$7),
        _el$0 = libs.createElement("Image", {
          id: "PartSelectedIcon",
          get src() {
            return getSrcPath(`conv/icon/${getPartIcon(selectedPart())}`);
          }
        }, _el$9),
        _el$1 = libs.createElement("DOTAParticleScenePanel", {
          id: "PartLevelUpParticle",
          particleName: "particles/ui/game/ui_game_equipment_interface_02_fx.vpcf",
          cameraOrigin: "0 0 250",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$9),
        _el$10 = libs.createElement("Panel", {
          id: "PartLevelDetail"
        }, _el$7),
        _el$11 = libs.createElement("Panel", {
          "class": "ToolTipIcon"
        }, _el$10),
        _el$12 = libs.createElement("Panel", {
          id: "AccessDivider"
        }, _el$10);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$12);
        const _el$14 = libs.createElement("Label", {
          id: "AccessTitle",
          get text() {
            return LocalizeWithVars("#Equipment_PartLevel_Title", {
              part: getPartName(selectedPart())
            });
          }
        }, _el$12);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$12);
        const _el$16 = libs.createElement("Panel", {
          id: "PartLevelCore"
        }, _el$10),
        _el$17 = libs.createElement("Panel", {
          id: "PartLevelCompare"
        }, _el$16),
        _el$18 = libs.createElement("Label", {
          "class": "CurrentLevel",
          get text() {
            return LocalizeWithVars("#Equipment_PartLevel_Level", {
              level: currentLevel()
            });
          }
        }, _el$17);
        libs.createElement("Panel", {
          "class": "LevelArrow"
        }, _el$17);
        const _el$20 = libs.createElement("Label", {
          "class": "NextLevel",
          get text() {
            return libs.memo(() => !!isMax())() ? GetLocalization("#Equipment_MaxLv") : LocalizeWithVars("#Equipment_PartLevel_Level", {
              level: currentLevel() + 1
            });
          }
        }, _el$17),
        _el$21 = libs.createElement("Panel", {
          id: "AccessDivider",
          "class": "BonusTitle"
        }, _el$10);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$21);
        const _el$23 = libs.createElement("Label", {
          id: "AccessTitle",
          get text() {
            return GetLocalization("#Equipment_PartLevel_BonusTitle");
          }
        }, _el$21);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$21);
        const _el$25 = libs.createElement("Panel", {
          id: "PartBonusPanel"
        }, _el$10),
        _el$31 = libs.createElement("Panel", {
          "class": "PartBonusRow"
        }, _el$25),
        _el$32 = libs.createElement("Label", {
          "class": "BonusName",
          get text() {
            return GetLocalization("#Equipment_PartLevel_AdverbBonus");
          }
        }, _el$31),
        _el$33 = libs.createElement("Label", {
          "class": "BonusCurrent",
          get text() {
            return formatBonus(currentSetting()?.adverb_bonus ?? 0);
          }
        }, _el$31),
        _el$36 = libs.createElement("Panel", {
          id: "PartLevelOperation"
        }, _el$10),
        _el$37 = libs.createElement("Panel", {
          id: "ConsumeContainer"
        }, _el$36),
        _el$38 = libs.createElement("Panel", {
          id: "PartLevelConsumes",
          flowChildren: "right-wrap"
        }, _el$37),
        _el$39 = libs.createElement("Panel", {
          id: "PartLevelButtons"
        }, _el$37),
        _el$40 = libs.createElement("DOTAParticleScenePanel", {
          id: "UpgradeParticle1",
          "class": "UpgradeParticle",
          particleName: "particles/ui/game/ui_game_upgrade_fx.vpcf",
          cameraOrigin: "0 0 130",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$10),
        _el$41 = libs.createElement("DOTAParticleScenePanel", {
          id: "UpgradeParticle2",
          "class": "UpgradeParticle",
          particleName: "particles/ui/game/ui_game_upgrade_fx.vpcf",
          cameraOrigin: "0 0 130",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$10);
      libs.insert(_el$8, libs.createComponent(RecycleView.RecycleView, {
        id: "PartLevelSlots",
        input: () => [...EQUIP_PART_LIST, ...HUNTLOOT_PART_LIST],
        direction: "Vertical",
        childConfig: {
          width: 420,
          height: 122,
          margin_top: 8.5,
          margin_bottom: 8.5
        },
        wheelStep: 139,
        showBar: false,
        handle: handle => partLevelSlotsHandle = handle,
        onScrollPercent: percent => setSlotScrollPercent(percent),
        children: part => libs.createComponent(PartSlot, {
          get part() {
            return part();
          }
        })
      }), null);
      libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "DownArrow",
        get enabled() {
          return slotScrollPercent() < 1;
        },
        onactivate: () => partLevelSlotsHandle?.scroll(139)
      }), null);
      const _ref$ = partLevelUpParticle;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$1) : partLevelUpParticle = _el$1;
      libs.setProp(_el$11, "tooltip_text", "#EquipPartLevelupUpTips");
      libs.insert(_el$25, libs.createComponent(libs.Show, {
        get when() {
          return !selectedIsHuntloot();
        },
        get children() {
          const _el$26 = libs.createElement("Panel", {
              "class": "PartBonusRow"
            }, null),
            _el$27 = libs.createElement("Label", {
              "class": "BonusName",
              get text() {
                return GetLocalization("#Equipment_PartLevel_MainBonus");
              }
            }, _el$26),
            _el$28 = libs.createElement("Label", {
              "class": "BonusCurrent",
              get text() {
                return formatBonus(currentSetting()?.main_bonus ?? 0);
              }
            }, _el$26);
          libs.insert(_el$26, libs.createComponent(libs.Show, {
            get when() {
              return !isMax();
            },
            get children() {
              return [libs.createElement("Panel", {
                "class": "SmallArrow"
              }, null), (() => {
                const _el$30 = libs.createElement("Label", {
                  "class": "BonusNext",
                  get text() {
                    return formatBonus(nextSetting()?.main_bonus ?? 0);
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$30, "text", formatBonus(nextSetting()?.main_bonus ?? 0), _$p));
                return _el$30;
              })()];
            }
          }), null);
          libs.effect(_p$ => {
            const _v$3 = GetLocalization("#Equipment_PartLevel_MainBonus"),
              _v$4 = formatBonus(currentSetting()?.main_bonus ?? 0);
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$27, "text", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$28, "text", _v$4, _p$._v$4));
            return _p$;
          }, {
            _v$3: undefined,
            _v$4: undefined
          });
          return _el$26;
        }
      }), _el$31);
      libs.insert(_el$31, libs.createComponent(libs.Show, {
        get when() {
          return !isMax();
        },
        get children() {
          return [libs.createElement("Panel", {
            "class": "SmallArrow"
          }, null), (() => {
            const _el$35 = libs.createElement("Label", {
              "class": "BonusNext",
              get text() {
                return formatBonus(nextSetting()?.adverb_bonus ?? 0);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$35, "text", formatBonus(nextSetting()?.adverb_bonus ?? 0), _$p));
            return _el$35;
          })()];
        }
      }), null);
      libs.setProp(_el$38, "flowChildren", "right-wrap");
      libs.insert(_el$38, libs.createComponent(libs.For, {
        get each() {
          return displayedConsumeList();
        },
        children: consume => (() => {
          const _el$42 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("PartLevelConsume", {
                Enough: consume.hasCount >= consume.needCount
              });
            }
          }, null);
          libs.insert(_el$42, libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return consume.itemID;
            }
          }), null);
          libs.insert(_el$42, libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
            get cost() {
              return consume.needCount;
            },
            get have() {
              return consume.hasCount;
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$42, "class", libs.classNames("PartLevelConsume", {
            Enough: consume.hasCount >= consume.needCount
          }), _$p));
          return _el$42;
        })()
      }));
      libs.insert(_el$39, libs.createComponent(EOM_Button.EOM_Button, {
        id: "PartLevelUpButton",
        color: "Confirm",
        get enabled() {
          return canLevelUp();
        },
        get loading() {
          return requesting();
        },
        get text() {
          return libs.memo(() => !!isMax())() ? GetLocalization("#Equipment_MaxLv") : GetLocalization("#Equipment_PartLevel_Action");
        },
        onmouseover: () => setShowBatchConsume(false),
        onactivate: () => levelUp(currentLevel() + 1)
      }), null);
      libs.insert(_el$39, libs.createComponent(EOM_Button.EOM_Button, {
        id: "AutoPartLevelUpButton",
        color: "Gold",
        get enabled() {
          return canBatchLevelUp();
        },
        get loading() {
          return requesting();
        },
        get text() {
          return LocalizeWithVars("#Equipment_PartLevel_AutoAction", {
            level: maxReachableLevel()
          });
        },
        onmouseover: () => setShowBatchConsume(true),
        onmouseout: () => setShowBatchConsume(false),
        onactivate: () => levelUp(maxReachableLevel(), true)
      }), null);
      const _ref$2 = upgradeParticle;
      typeof _ref$2 === "function" ? libs.use(_ref$2, _el$40) : upgradeParticle = _el$40;
      const _ref$3 = upgradeParticle2;
      typeof _ref$3 === "function" ? libs.use(_ref$3, _el$41) : upgradeParticle2 = _el$41;
      libs.effect(_p$ => {
        const _v$5 = getSrcPath(`conv/icon/${getPartIcon(selectedPart())}`),
          _v$6 = LocalizeWithVars("#Equipment_PartLevel_Title", {
            part: getPartName(selectedPart())
          }),
          _v$7 = LocalizeWithVars("#Equipment_PartLevel_Level", {
            level: currentLevel()
          }),
          _v$8 = libs.memo(() => !!isMax())() ? GetLocalization("#Equipment_MaxLv") : LocalizeWithVars("#Equipment_PartLevel_Level", {
            level: currentLevel() + 1
          }),
          _v$9 = GetLocalization("#Equipment_PartLevel_BonusTitle"),
          _v$0 = GetLocalization("#Equipment_PartLevel_AdverbBonus"),
          _v$1 = formatBonus(currentSetting()?.adverb_bonus ?? 0);
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "src", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$14, "text", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$18, "text", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$20, "text", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$23, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$32, "text", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$33, "text", _v$1, _p$._v$1));
        return _p$;
      }, {
        _v$5: undefined,
        _v$6: undefined,
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$0: undefined,
        _v$1: undefined
      });
      return _el$7;
    }
  });
}

const KV$2 = KeyValues.equip_common_setting["equip_rarity_upgrade_cost"];
const RarityUPWindow = props => {
  const MAX_RARITY = equipment_utils.MAX_EQUIPMENT_RARITY;
  const store = equipment_comp.useEquipmentStore();
  const [selectedItemID] = store.selectedItemID;
  const [, setShowTokens] = store.showTokens;
  const itemData = () => props.itemData();
  const [upgradeRecord, setUpgradeRecord] = libs.createStore({
    equipID: 0,
    mainNum: 0,
    adverbNum: 0
  });
  libs.createEffect(libs.on(itemData, () => {
    const item = itemData();
    if (item == undefined || item.id != upgradeRecord.equipID) {
      setUpgradeRecord(solid_utils.resetStore({
        equipID: 0,
        mainNum: 0,
        adverbNum: 0
      }));
    }
  }));
  const rarity = () => itemData()?.rarity ?? 0;
  const bMax = () => rarity() >= MAX_RARITY;
  const consumeList = libs.createMemo(() => {
    store.player_tokens();
    if (!KV$2 || KV$2.value == undefined) {
      return [];
    }
    let consume = String(KV$2.value);
    return consume.split("|").map(item => {
      let [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(d => d.needCount > 0);
  });
  const canStrengthen = libs.createMemo(() => consumeList().every(consume => consume.hasCount >= consume.needCount) && (itemData()?.remaining_potential ?? 0) > 0);
  libs.createEffect(() => {
    const tokens = consumeList().map(d => toFiniteNumber(d.itemID));
    setShowTokens(tokens);
  });
  const suitEffectID = () => {
    const data = itemData();
    if (data == undefined) {
      return undefined;
    }
    if (data.ability_entry_data != undefined && data.ability_entry_data.length > 0) {
      return data.ability_entry_data[0].id;
    }
  };
  libs.createEffect(() => {
    props.setLeftExtraContent?.((() => {
      const _el$ = libs.createElement("Panel", {
          id: "OperationBtns"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "ConsumeBtn",
          flowChildren: "down"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          horizontalAlign: "center",
          flowChildren: "right"
        }, _el$2);
      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ReturnBtn",
        get enabled() {
          return !props.requestPending?.();
        },
        text: "#MenuButton_Return",
        onactivate: () => props.onReturn?.()
      }), _el$2);
      libs.setProp(_el$2, "flowChildren", "down");
      libs.setProp(_el$3, "horizontalAlign", "center");
      libs.setProp(_el$3, "flowChildren", "right");
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return consumeList();
        },
        children: consume => {
          return (() => {
            const _el$4 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  });
                }
              }, null),
              _el$5 = libs.createElement("Label", {
                get text() {
                  return "X" + consume.needCount;
                }
              }, _el$4);
            libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return consume.itemID;
              }
            }), _el$5);
            libs.effect(_p$ => {
              const _v$ = libs.classNames("ComsumeItem", {
                  Enough: consume.hasCount >= consume.needCount
                }),
                _v$2 = "X" + consume.needCount;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$4;
          })();
        }
      }));
      libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
        get enabled() {
          return libs.memo(() => !!!bMax())() && canStrengthen();
        },
        get loading() {
          return props.requestPending?.();
        },
        color: "Confirm",
        text: "#Equipment_RarityUP",
        onactivate: () => {
          const item = itemData();
          if (!item || !selectedItemID()) return;
          setUpgradeRecord({
            equipID: item.id,
            mainNum: item.main_entry_data.length,
            adverbNum: item.adverb_entry_data.length
          });
          props.startForgeAnimation?.(() => new Promise(resolve => {
            CallActionRequest("/v1/equip/rarity_upgrade", {
              id: selectedItemID()
            }, () => resolve(), () => resolve());
          }));
        }
      }), null);
      return _el$;
    })());
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        id: "RarityUPPanel",
        get ["class"]() {
          return libs.classNames({
            IsMax: bMax()
          }, "RarityColor" + rarity());
        }
      }, null);
      libs.createElement("Label", {
        "class": "WindowTitle",
        text: "#EquipmentTab_rarity_upgrade"
      }, _el$6);
      const _el$8 = libs.createElement("Label", {
        "class": "EquipName EquipRarityLabel",
        get text() {
          return "#" + itemData()?.equipment_item_id;
        }
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$6),
      _el$12 = libs.createElement("Label", {
        id: "RemainingPotential",
        get vars() {
          return {
            value: itemData()?.remaining_potential ?? 0
          };
        },
        text: "#Equip_RemainingPotential"
      }, _el$6);
    libs.setProp(_el$9, "tooltip_text", "#EquipRarityUpgradeTips");
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return !bMax();
      },
      get children() {
        const _el$0 = libs.createElement("Panel", {
            id: "ShowRarity"
          }, null),
          _el$1 = libs.createElement("Label", {
            id: "CurRarity",
            "class": "EquipRarityLabel",
            get text() {
              return `#Equipment_Rarity_${rarity()}`;
            },
            html: true
          }, _el$0);
          libs.createElement("Image", {
            id: "Arrow"
          }, _el$0);
          const _el$11 = libs.createElement("Label", {
            get ["class"]() {
              return "Rarity" + (rarity() + 1);
            },
            get text() {
              return `#Equipment_Rarity_${rarity() + 1}`;
            },
            html: true
          }, _el$0);
        libs.effect(_p$ => {
          const _v$3 = `#Equipment_Rarity_${rarity()}`,
            _v$4 = "Rarity" + (rarity() + 1),
            _v$5 = `#Equipment_Rarity_${rarity() + 1}`;
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$11, "class", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "text", _v$5, _p$._v$5));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined
        });
        return _el$0;
      }
    }), _el$12);
    libs.insert(_el$6, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "CurAttrSeparator",
      text: "#Equipment_CurAttr"
    }), null);
    libs.insert(_el$6, libs.createComponent(equipment_comp.AttrContainer, {
      get children() {
        return [libs.createComponent(libs.For, {
          get each() {
            return itemData()?.main_entry_data ?? [];
          },
          children: (data, index) => {
            const isNewEntry = () => upgradeRecord.mainNum > 0 && index() >= upgradeRecord.mainNum;
            return libs.createComponent(equipment_comp.AttrItem, {
              get index() {
                return index();
              },
              attrData: data,
              type: "Main",
              get isNew() {
                return isNewEntry();
              }
            });
          }
        }), libs.createComponent(libs.For, {
          get each() {
            return itemData()?.adverb_entry_data ?? [];
          },
          children: (data, index) => {
            const isNewEntry = () => upgradeRecord.adverbNum > 0 && index() >= upgradeRecord.adverbNum;
            return libs.createComponent(equipment_comp.AttrItem, {
              get index() {
                return index();
              },
              attrData: data,
              type: "Adverb",
              get isNew() {
                return isNewEntry();
              }
            });
          }
        }), libs.createComponent(libs.Index, {
          get each() {
            return itemData().myth_entry_data;
          },
          children: data => {
            const entryKv = KeyValues.equip_entry[data().id];
            return (() => {
              const _el$13 = libs.createElement("Panel", {
                  "class": "MythEntry"
                }, null);
                libs.createElement("Image", {}, _el$13);
                const _el$15 = libs.createElement("Label", {
                  get text() {
                    return GetPrivilegeDesc(data().id, 1, {
                      value: data().value,
                      min: entryKv.value_min,
                      max: entryKv.value_max
                    });
                  },
                  html: true
                }, _el$13);
              libs.effect(_$p => libs.setProp(_el$15, "text", GetPrivilegeDesc(data().id, 1, {
                value: data().value,
                min: entryKv.value_min,
                max: entryKv.value_max
              }), _$p));
              return _el$13;
            })();
          }
        }), libs.createComponent(libs.Index, {
          get each() {
            return itemData().chaos_entry_data;
          },
          children: data => (() => {
            const _el$16 = libs.createElement("Panel", {
                "class": `ChaosEntry`
              }, null);
              libs.createElement("Panel", {
                id: "Point"
              }, _el$16);
              const _el$18 = libs.createElement("Label", {
                id: "EntryText",
                get text() {
                  return equipment_utils.GetChaosRowInfo(data());
                },
                html: true
              }, _el$16);
            libs.setProp(_el$16, "class", `ChaosEntry`);
            libs.effect(_$p => libs.setProp(_el$18, "text", equipment_utils.GetChaosRowInfo(data()), _$p));
            return _el$16;
          })()
        }), libs.createComponent(libs.Show, {
          get when() {
            return suitEffectID();
          },
          get children() {
            return libs.createComponent(equip_details.EquipSuitList, {
              get suitEffectID() {
                return suitEffectID();
              }
            });
          }
        })];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$6 = libs.classNames({
          IsMax: bMax()
        }, "RarityColor" + rarity()),
        _v$7 = "#" + itemData()?.equipment_item_id,
        _v$8 = {
          value: itemData()?.remaining_potential ?? 0
        };
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$6, "class", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$8, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$12, "vars", _v$8, _p$._v$8));
      return _p$;
    }, {
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined
    });
    return _el$6;
  })();
};

const RARITY_COND$1 = 5;
const KV$1 = KeyValues.equip_forge_setting["entry_recast"];
function getEntryByType(data, entryType, entryIndex) {
  switch (entryType) {
    case 2:
      return data.adverb_entry_data?.[entryIndex];
    case 4:
      return data.myth_entry_data?.[entryIndex];
    case 5:
      return data.chaos_entry_data?.[entryIndex];
    default:
      return undefined;
  }
}
function parseNumber(value) {
  if (value == undefined || value === "") return undefined;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}
function normalizeRecastV2OptionEntry(raw) {
  if (!raw || typeof raw !== "object") return undefined;
  const data = raw;
  if (typeof data.id !== "string" || data.id === "") return undefined;
  return {
    id: data.id,
    value: parseNumber(data.value),
    base_value: parseNumber(data.base_value),
    extra_value: parseNumber(data.extra_value),
    percent: parseNumber(data.percent),
    base_min: parseNumber(data.base_min),
    base_max: parseNumber(data.base_max)
  };
}
function parseRecastV2OptionEntries(result) {
  const optionEntryData = result.option_entry_data;
  const rawEntries = typeof optionEntryData === "string" ? JSON.parseSafe(optionEntryData) : optionEntryData;
  if (Array.isArray(rawEntries)) {
    return rawEntries.map(normalizeRecastV2OptionEntry).filter(entry => entry != undefined);
  }
  return result.options?.split(",").filter(optionId => optionId !== "").map(id => ({
    id
  })) ?? [];
}
function getRecastV2OptionText(option) {
  if (option.id.startsWith("privilege_")) {
    const entryKv = KeyValues.equip_entry[option.id];
    return GetPrivilegeDesc(option.id, 1, {
      value: option.value ?? 0,
      min: option.base_min ?? entryKv?.value_min,
      max: option.base_max ?? entryKv?.value_max
    });
  }
  if (option.value != undefined) {
    return GetPropertyLocalization(option.id, equipment_utils.EquipAttributeRound(option.id, toFiniteNumber(option.value, 0)));
  }
  return GetLocalization("#property_" + option.id).replace("%", "");
}
const RecastWindow = props => {
  const store = equipment_comp.useEquipmentStore();
  const [selectedItemID] = store.selectedItemID;
  const [, setShowTokens] = store.showTokens;
  const itemData = () => props.itemData();
  const rarity = () => itemData()?.rarity ?? 0;
  const canStrengthen = () => rarity() >= RARITY_COND$1 && consumeList().every(consume => consume.hasCount >= consume.needCount) && (itemData()?.remaining_potential ?? 0) > 0;
  const [selectedEntry, setSelectedEntry] = libs.createSignal(null);
  const [pendingOptionIndex, setPendingOptionIndex] = libs.createSignal();
  const recastV2Results = solid_utils.createServiceNetData("player_recast_equipment_v2_results", {});
  const isRecastV2Confirm = () => itemData()?.in_check === "recast_v2";
  const currentRecastV2Result = libs.createMemo(() => {
    if (!isRecastV2Confirm()) return undefined;
    const results = recastV2Results();
    const id = String(selectedItemID());
    const result = results?.[id] ?? Object.values(results ?? {}).find(result => result !== "nil" && String(result.id) === id);
    if (result && result !== "nil") return result;
    return undefined;
  });
  const [cachedOldEntry, setCachedOldEntry] = libs.createSignal();
  const [cachedOptions, setCachedOptions] = libs.createSignal([]);
  libs.createEffect(() => {
    if (isRecastV2Confirm()) {
      const result = currentRecastV2Result();
      const data = itemData();
      if (result && data) {
        setCachedOldEntry(getEntryByType(data, result.entry_type, result.entry_index));
        setCachedOptions(parseRecastV2OptionEntries(result));
      }
    }
  });
  const recastV2OldEntry = () => cachedOldEntry();
  const recastV2Options = () => cachedOptions();
  const consumeList = libs.createMemo(() => {
    store.player_tokens();
    if (!KV$1 || KV$1.consume == undefined) {
      return [];
    }
    let consume = String(KV$1.consume);
    return consume.split("|").map(item => {
      let [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(d => d.needCount > 0);
  });
  libs.createEffect(() => {
    libs.batch(() => {
      const tokens = consumeList().map(d => toFiniteNumber(d.itemID));
      setShowTokens(tokens);
    });
  });
  const suitEffectID = () => {
    const data = itemData();
    if (data == undefined) {
      return undefined;
    }
    if (data.ability_entry_data != undefined && data.ability_entry_data.length > 0) {
      return data.ability_entry_data[0].id;
    }
  };
  libs.createEffect(() => {
    if (isRecastV2Confirm()) {
      props.setLeftExtraContent?.((() => {
        const _el$ = libs.createElement("Panel", {
            id: "OperationBtns"
          }, null),
          _el$2 = libs.createElement("Label", {
            "class": "RecastV2HintText",
            text: "#Equipment_RecastV2_SelectOption"
          }, _el$);
        libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
          id: "ReturnBtn",
          get enabled() {
            return !props.requestPending?.();
          },
          text: "#MenuButton_Return",
          onactivate: () => props.onReturn?.()
        }), _el$2);
        return _el$;
      })());
    } else {
      props.setLeftExtraContent?.((() => {
        const _el$3 = libs.createElement("Panel", {
            id: "OperationBtns"
          }, null),
          _el$4 = libs.createElement("Panel", {
            id: "ConsumeBtn",
            flowChildren: "down"
          }, _el$3),
          _el$5 = libs.createElement("Panel", {
            horizontalAlign: "center",
            flowChildren: "right"
          }, _el$4);
        libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_Button, {
          id: "ReturnBtn",
          get enabled() {
            return !props.requestPending?.();
          },
          text: "#MenuButton_Return",
          onactivate: () => props.onReturn?.()
        }), _el$4);
        libs.setProp(_el$4, "flowChildren", "down");
        libs.setProp(_el$5, "horizontalAlign", "center");
        libs.setProp(_el$5, "flowChildren", "right");
        libs.insert(_el$5, libs.createComponent(libs.For, {
          get each() {
            return consumeList();
          },
          children: consume => {
            return (() => {
              const _el$6 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("ComsumeItem", {
                      Enough: consume.hasCount >= consume.needCount
                    });
                  }
                }, null),
                _el$7 = libs.createElement("Label", {
                  get text() {
                    return "X" + consume.needCount;
                  }
                }, _el$6);
              libs.insert(_el$6, libs.createComponent(StoreItem.StoreItemImage, {
                get itemid() {
                  return consume.itemID;
                }
              }), _el$7);
              libs.effect(_p$ => {
                const _v$ = libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  }),
                  _v$2 = "X" + consume.needCount;
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "class", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined
              });
              return _el$6;
            })();
          }
        }));
        libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_Button, {
          get enabled() {
            return libs.memo(() => !!canStrengthen())() && selectedEntry() != null;
          },
          get loading() {
            return props.requestPending?.();
          },
          color: "Confirm",
          text: "#Equipment_Recast",
          onactivate: () => {
            const entry = selectedEntry();
            if (!selectedItemID() || !entry) return;
            props.startForgeAnimation?.(() => new Promise(resolve => {
              CallActionRequest("/v1/equip/recast", {
                id: selectedItemID(),
                entry_type: entry.type,
                entry_index: entry.index
              }, () => resolve(), () => resolve());
            }));
          }
        }), null);
        return _el$3;
      })());
    }
  });
  return (() => {
    const _el$8 = libs.createElement("Panel", {
        id: "RecastPanel",
        get ["class"]() {
          return libs.classNames("RarityColor" + rarity());
        }
      }, null);
      libs.createElement("Label", {
        "class": "WindowTitle",
        text: "#EquipmentTab_recast"
      }, _el$8);
      const _el$0 = libs.createElement("Label", {
        "class": "EquipName EquipRarityLabel",
        get text() {
          return "#" + itemData()?.equipment_item_id;
        }
      }, _el$8),
      _el$1 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$8),
      _el$10 = libs.createElement("Label", {
        id: "RemainingPotential",
        get vars() {
          return {
            value: itemData()?.remaining_potential ?? 0
          };
        },
        text: "#Equip_RemainingPotential"
      }, _el$8);
    libs.setProp(_el$1, "tooltip_text", "#EquipRecastTips");
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return isRecastV2Confirm() || cachedOptions().length > 0;
      },
      get fallback() {
        return [libs.createComponent(equipment_comp.EquipSeparator, {
          id: "SelectSeparator",
          text: "#Equipment_SelectEntry"
        }), libs.createComponent(equipment_comp.AttrContainer, {
          get children() {
            return [libs.createComponent(libs.For, {
              get each() {
                return itemData()?.adverb_entry_data ?? [];
              },
              children: (data, index) => {
                const isSelected = () => selectedEntry()?.type === 2 && selectedEntry()?.index === index();
                return libs.createComponent(equipment_comp.AttrItem, {
                  attrData: data,
                  get selected() {
                    return isSelected();
                  },
                  type: "Adverb",
                  get index() {
                    return index();
                  },
                  onAttrbuteClick: (type, idx) => {
                    if (isSelected()) {
                      setSelectedEntry(null);
                    } else {
                      setSelectedEntry({
                        index: idx,
                        type: 2
                      });
                    }
                  },
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return isSelected();
                      },
                      get children() {
                        return [libs.createElement("Panel", {
                          id: "ShowArrow",
                          "class": "EquipArrow"
                        }, null), libs.createElement("Label", {
                          id: "UnknowText",
                          text: "???"
                        }, null)];
                      }
                    });
                  }
                });
              }
            }), libs.createComponent(libs.Index, {
              get each() {
                return itemData().myth_entry_data;
              },
              children: (data, mythIndex) => {
                const isSelected = () => selectedEntry()?.type === 4 && selectedEntry()?.index === mythIndex;
                const entryKv = () => KeyValues.equip_entry[data().id];
                return (() => {
                  const _el$19 = libs.createElement("Panel", {
                      "class": "EntryContainer"
                    }, null),
                    _el$20 = libs.createElement("Panel", {
                      "class": "MythEntry"
                    }, _el$19);
                    libs.createElement("Image", {}, _el$20);
                    const _el$22 = libs.createElement("Label", {
                      get text() {
                        return GetPrivilegeDesc(data().id, 1, {
                          value: data().value,
                          min: entryKv().value_min,
                          max: entryKv().value_max
                        });
                      },
                      html: true
                    }, _el$20);
                  libs.setProp(_el$19, "onactivate", () => {
                    if (isSelected()) {
                      setSelectedEntry(null);
                    } else {
                      setSelectedEntry({
                        index: mythIndex,
                        type: 4
                      });
                    }
                  });
                  libs.insert(_el$19, libs.createComponent(equipment_comp.AttributeSelectBtn, {
                    get selected() {
                      return isSelected();
                    }
                  }), _el$20);
                  libs.effect(_$p => libs.setProp(_el$22, "text", GetPrivilegeDesc(data().id, 1, {
                    value: data().value,
                    min: entryKv().value_min,
                    max: entryKv().value_max
                  }), _$p));
                  return _el$19;
                })();
              }
            }), libs.createComponent(libs.Index, {
              get each() {
                return itemData().chaos_entry_data;
              },
              children: (data, chaosIndex) => {
                const isSelected = () => selectedEntry()?.type === 5 && selectedEntry()?.index === chaosIndex;
                return (() => {
                  const _el$23 = libs.createElement("Panel", {
                      "class": "EntryContainer"
                    }, null),
                    _el$24 = libs.createElement("Panel", {
                      "class": `ChaosEntry`
                    }, _el$23);
                    libs.createElement("Panel", {
                      id: "Point"
                    }, _el$24);
                    const _el$26 = libs.createElement("Label", {
                      id: "EntryText",
                      get text() {
                        return equipment_utils.GetChaosRowInfo(data());
                      },
                      html: true
                    }, _el$24);
                  libs.setProp(_el$23, "onactivate", () => {
                    if (isSelected()) {
                      setSelectedEntry(null);
                    } else {
                      setSelectedEntry({
                        index: chaosIndex,
                        type: 5
                      });
                    }
                  });
                  libs.insert(_el$23, libs.createComponent(equipment_comp.AttributeSelectBtn, {
                    get selected() {
                      return isSelected();
                    }
                  }), _el$24);
                  libs.setProp(_el$24, "class", `ChaosEntry`);
                  libs.effect(_$p => libs.setProp(_el$26, "text", equipment_utils.GetChaosRowInfo(data()), _$p));
                  return _el$23;
                })();
              }
            }), libs.createComponent(libs.Show, {
              get when() {
                return suitEffectID();
              },
              get children() {
                const _el$16 = libs.createElement("Panel", {
                  "class": "EntryContainer"
                }, null);
                libs.setProp(_el$16, "onactivate", () => {
                  const isSelected = selectedEntry()?.type === 3 && selectedEntry()?.index === 0;
                  if (isSelected) {
                    setSelectedEntry(null);
                  } else {
                    setSelectedEntry({
                      index: 0,
                      type: 3
                    });
                  }
                });
                libs.insert(_el$16, libs.createComponent(equipment_comp.AttributeSelectBtn, {
                  get selected() {
                    return libs.memo(() => selectedEntry()?.type === 3)() && selectedEntry()?.index === 0;
                  }
                }), null);
                libs.insert(_el$16, libs.createComponent(equip_details.EquipSuitList, {
                  get suitEffectID() {
                    return suitEffectID();
                  }
                }), null);
                return _el$16;
              }
            })];
          }
        })];
      },
      get children() {
        const _el$11 = libs.createElement("Panel", {
            id: "RecastV2ConfirmPanel"
          }, null),
          _el$12 = libs.createElement("Panel", {
            "class": "RecastV2OldEntry"
          }, _el$11),
          _el$13 = libs.createElement("Panel", {
            "class": "RecastV2Arrow"
          }, _el$11);
          libs.createElement("Panel", {
            id: "ShowArrow",
            "class": "EquipArrow"
          }, _el$13);
          const _el$15 = libs.createElement("Panel", {
            "class": "RecastV2Options"
          }, _el$11);
        libs.insert(_el$11, libs.createComponent(equipment_comp.EquipSeparator, {
          id: "SelectSeparator",
          text: "#Equipment_RecastV2_Recasting"
        }), _el$12);
        libs.insert(_el$12, libs.createComponent(libs.Show, {
          get when() {
            return recastV2OldEntry();
          },
          get children() {
            return (() => {
              const entry = recastV2OldEntry();
              const isPrivilege = entry.id.startsWith("privilege_");
              const text = isPrivilege ? GetPrivilegeDesc(entry.id, 1, {
                value: entry.value,
                min: entry.min,
                max: entry.max
              }) : GetPropertyLocalization(entry.id, equipment_utils.EquipAttributeRound(entry.id, toFiniteNumber(entry.value, 0)));
              return (() => {
                const _el$27 = libs.createElement("Label", {
                  "class": "RecastV2OldEntryText",
                  text: text,
                  html: true
                }, null);
                libs.setProp(_el$27, "text", text);
                return _el$27;
              })();
            })();
          }
        }));
        libs.insert(_el$15, libs.createComponent(libs.For, {
          get each() {
            return recastV2Options();
          },
          children: (option, index) => {
            return (() => {
              const _el$28 = libs.createElement("Panel", {
                  "class": "RecastV2OptionBtn"
                }, null),
                _el$30 = libs.createElement("Label", {
                  "class": "RecastV2OptionText",
                  get text() {
                    return getRecastV2OptionText(option);
                  },
                  html: true
                }, _el$28);
              libs.setProp(_el$28, "onactivate", () => {
                if (!selectedItemID() || props.requestPending?.()) return;
                setPendingOptionIndex(index());
                props.startForgeAnimation?.(() => new Promise(resolve => {
                  CallActionRequest("/v1/equip/recast_v2_confirm", {
                    id: selectedItemID(),
                    option: index()
                  }, () => resolve(), () => resolve());
                }))?.then(() => {
                  libs.batch(() => {
                    setCachedOldEntry();
                    setCachedOptions([]);
                  });
                })?.finally(() => setPendingOptionIndex());
              });
              libs.insert(_el$28, libs.createComponent(libs.Show, {
                get when() {
                  return libs.memo(() => !!props.requestPending?.())() && pendingOptionIndex() === index();
                },
                get children() {
                  return libs.createElement("Image", {
                    "class": "RecastV2OptionLoadingIcon"
                  }, null);
                }
              }), _el$30);
              libs.effect(_p$ => {
                const _v$6 = !props.requestPending?.(),
                  _v$7 = getRecastV2OptionText(option);
                _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$28, "enabled", _v$6, _p$._v$6));
                _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$30, "text", _v$7, _p$._v$7));
                return _p$;
              }, {
                _v$6: undefined,
                _v$7: undefined
              });
              return _el$28;
            })();
          }
        }));
        return _el$11;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = libs.classNames("RarityColor" + rarity()),
        _v$4 = "#" + itemData()?.equipment_item_id,
        _v$5 = {
          value: itemData()?.remaining_potential ?? 0
        };
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "class", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "vars", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$8;
  })();
};

const RARITY_COND = 5;
const KV = KeyValues.equip_forge_setting["entry_refine"];
const RefineWindow = props => {
  const store = equipment_comp.useEquipmentStore();
  const [selectedItemID] = store.selectedItemID;
  const [, setShowTokens] = store.showTokens;
  const itemData = () => props.itemData();
  const rarity = () => itemData()?.rarity ?? 0;
  const getSelectedEntryPercent = () => {
    const entry = selectedEntry();
    if (!entry) return null;
    let data;
    if (entry.type === 2) {
      data = itemData()?.adverb_entry_data?.[entry.index];
    } else if (entry.type === 4) {
      data = itemData()?.myth_entry_data?.[entry.index];
    } else if (entry.type === 5) {
      data = itemData()?.chaos_entry_data?.[entry.index];
    }
    return data ? toFiniteNumber(data.percent, 0) : null;
  };
  const isEntryMaxValue = () => {
    const percent = getSelectedEntryPercent();
    return percent != null && percent >= 100;
  };
  const canStrengthen = () => rarity() >= RARITY_COND && consumeList().every(consume => consume.hasCount >= consume.needCount) && (itemData()?.remaining_potential ?? 0) > 0 && !isEntryMaxValue();
  const [selectedEntry, setSelectedEntry] = libs.createSignal(null);
  const consumeList = libs.createMemo(() => {
    store.player_tokens();
    if (!KV || KV.consume == undefined) {
      return [];
    }
    let consume = String(KV.consume);
    return consume.split("|").map(item => {
      let [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(d => d.needCount > 0);
  });
  libs.createEffect(() => {
    const tokens = consumeList().map(d => toFiniteNumber(d.itemID));
    setShowTokens(tokens);
  });
  libs.createEffect(() => {
    props.setLeftExtraContent?.((() => {
      const _el$ = libs.createElement("Panel", {
          id: "OperationBtns"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "ConsumeBtn",
          flowChildren: "down"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          horizontalAlign: "center",
          flowChildren: "right"
        }, _el$2);
      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ReturnBtn",
        get enabled() {
          return !props.requestPending?.();
        },
        text: "#MenuButton_Return",
        onactivate: () => props.onReturn?.()
      }), _el$2);
      libs.setProp(_el$2, "flowChildren", "down");
      libs.setProp(_el$3, "horizontalAlign", "center");
      libs.setProp(_el$3, "flowChildren", "right");
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return consumeList();
        },
        children: consume => {
          return (() => {
            const _el$4 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  });
                }
              }, null),
              _el$5 = libs.createElement("Label", {
                get text() {
                  return "X" + consume.needCount;
                }
              }, _el$4);
            libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return consume.itemID;
              }
            }), _el$5);
            libs.effect(_p$ => {
              const _v$ = libs.classNames("ComsumeItem", {
                  Enough: consume.hasCount >= consume.needCount
                }),
                _v$2 = "X" + consume.needCount;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$4;
          })();
        }
      }));
      libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
        get enabled() {
          return libs.memo(() => !!canStrengthen())() && selectedEntry() != null;
        },
        get loading() {
          return props.requestPending?.();
        },
        color: "Confirm",
        text: "#Equipment_Refine",
        onactivate: () => {
          const entry = selectedEntry();
          if (!selectedItemID() || !entry) return;
          props.startForgeAnimation?.(() => new Promise(resolve => {
            CallActionRequest("/v1/equip/refine", {
              id: selectedItemID(),
              entry_type: entry.type,
              entry_index: entry.index
            }, () => resolve(), () => resolve());
          }));
        }
      }), null);
      return _el$;
    })());
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        id: "RefinePanel",
        get ["class"]() {
          return libs.classNames("RarityColor" + rarity());
        }
      }, null);
      libs.createElement("Label", {
        "class": "WindowTitle",
        text: "#EquipmentTab_refine"
      }, _el$6);
      const _el$8 = libs.createElement("Label", {
        "class": "EquipName EquipRarityLabel",
        get text() {
          return "#" + itemData()?.equipment_item_id;
        }
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$6),
      _el$0 = libs.createElement("Label", {
        id: "RemainingPotential",
        get vars() {
          return {
            value: itemData()?.remaining_potential ?? 0
          };
        },
        text: "#Equip_RemainingPotential"
      }, _el$6);
    libs.setProp(_el$9, "tooltip_text", "#EquipRefineTips");
    libs.insert(_el$6, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "SelectSeparator",
      text: "#Equipment_SelectEntry"
    }), null);
    libs.insert(_el$6, libs.createComponent(equipment_comp.AttrContainer, {
      get children() {
        return [libs.createComponent(libs.For, {
          get each() {
            return itemData()?.main_entry_data ?? [];
          },
          children: (data, index) => {
            return libs.createComponent(equipment_comp.AttrItem, {
              attrData: data,
              type: "Main",
              get index() {
                return index();
              }
            });
          }
        }), libs.createComponent(libs.For, {
          get each() {
            return itemData()?.adverb_entry_data ?? [];
          },
          children: (data, index) => {
            const isSelected = () => selectedEntry()?.type === 2 && selectedEntry()?.index === index();
            return libs.createComponent(equipment_comp.AttrItem, {
              attrData: data,
              get selected() {
                return isSelected();
              },
              type: "Adverb",
              get index() {
                return index();
              },
              get changeValue() {
                return isSelected() ? "???" : undefined;
              },
              onAttrbuteClick: (type, idx) => {
                if (isSelected()) {
                  setSelectedEntry(null);
                } else {
                  setSelectedEntry({
                    index: idx,
                    type: 2
                  });
                }
              }
            });
          }
        }), libs.createComponent(libs.Index, {
          get each() {
            return itemData().myth_entry_data;
          },
          children: (data, mythIndex) => {
            const isSelected = () => selectedEntry()?.type === 4 && selectedEntry()?.index === mythIndex;
            const entryKv = KeyValues.equip_entry[data().id];
            return (() => {
              const _el$1 = libs.createElement("Panel", {
                  "class": "EntryContainer"
                }, null),
                _el$10 = libs.createElement("Panel", {
                  "class": "MythEntry"
                }, _el$1);
                libs.createElement("Image", {}, _el$10);
                const _el$12 = libs.createElement("Label", {
                  get text() {
                    return GetPrivilegeDesc(data().id, 1, {
                      value: data().value,
                      min: entryKv.value_min,
                      max: entryKv.value_max
                    });
                  },
                  html: true
                }, _el$10);
              libs.setProp(_el$1, "onactivate", () => {
                if (isSelected()) {
                  setSelectedEntry(null);
                } else {
                  setSelectedEntry({
                    index: mythIndex,
                    type: 4
                  });
                }
              });
              libs.insert(_el$1, libs.createComponent(equipment_comp.AttributeSelectBtn, {
                get selected() {
                  return isSelected();
                }
              }), _el$10);
              libs.effect(_$p => libs.setProp(_el$12, "text", GetPrivilegeDesc(data().id, 1, {
                value: data().value,
                min: entryKv.value_min,
                max: entryKv.value_max
              }), _$p));
              return _el$1;
            })();
          }
        }), libs.createComponent(libs.Index, {
          get each() {
            return itemData().chaos_entry_data;
          },
          children: (data, chaosIndex) => {
            const isSelected = () => selectedEntry()?.type === 5 && selectedEntry()?.index === chaosIndex;
            return (() => {
              const _el$13 = libs.createElement("Panel", {
                  "class": "EntryContainer"
                }, null),
                _el$14 = libs.createElement("Panel", {
                  "class": `ChaosEntry`
                }, _el$13);
                libs.createElement("Panel", {
                  id: "Point"
                }, _el$14);
                const _el$16 = libs.createElement("Label", {
                  id: "EntryText",
                  get text() {
                    return equipment_utils.GetChaosRowInfo(data());
                  },
                  html: true
                }, _el$14);
              libs.setProp(_el$13, "onactivate", () => {
                if (isSelected()) {
                  setSelectedEntry(null);
                } else {
                  setSelectedEntry({
                    index: chaosIndex,
                    type: 5
                  });
                }
              });
              libs.insert(_el$13, libs.createComponent(equipment_comp.AttributeSelectBtn, {
                get selected() {
                  return isSelected();
                }
              }), _el$14);
              libs.setProp(_el$14, "class", `ChaosEntry`);
              libs.effect(_$p => libs.setProp(_el$16, "text", equipment_utils.GetChaosRowInfo(data()), _$p));
              return _el$13;
            })();
          }
        })];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = libs.classNames("RarityColor" + rarity()),
        _v$4 = "#" + itemData()?.equipment_item_id,
        _v$5 = {
          value: itemData()?.remaining_potential ?? 0
        };
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "class", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$8, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "vars", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$6;
  })();
};

function findGemLevelKv(rarity, level) {
  return Object.values(KeyValues.gem_level).find(row => row.rarity === rarity && row.level === level);
}
const GemLevelvpWindow = props => {
  const store = equipment_comp.useEquipmentStore();
  const [, setShowTokens] = store.showTokens;
  const gemData = libs.createMemo(() => {
    if (props.gemData && props.gemData() != "undefined") {
      return props.gemData();
    } else {
      return undefined;
    }
  });
  const rarity = () => gemData()?.rarity ?? 0;
  const lv = () => gemData()?.level ?? 0;
  const MAX_LV = libs.createMemo(() => {
    const r = rarity();
    const maxLv = Object.values(KeyValues.gem_level).filter(row => row.rarity === r).reduce((max, row) => Math.max(max, row.level), 0);
    return maxLv;
  });
  const bMax = () => lv() >= MAX_LV();
  const currentLvKv = () => findGemLevelKv(rarity(), lv());
  const nextLVKv = () => {
    if (bMax()) {
      return;
    }
    return findGemLevelKv(rarity(), lv() + 1);
  };
  const consumeList = libs.createMemo(() => {
    const kv = currentLvKv();
    if (!kv || kv.consume == undefined) {
      return [];
    }
    return kv.consume.split("|").map(item => {
      let [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(d => d.needCount > 0);
  });
  libs.createEffect(() => {
    const tokens = consumeList().map(d => toFiniteNumber(d.itemID));
    setShowTokens(tokens);
  });
  const canStrengthen = libs.createMemo(() => consumeList().every(consume => consume.hasCount >= consume.needCount));
  libs.createEffect(() => {
    props.setLeftExtraContent?.((() => {
      const _el$ = libs.createElement("Panel", {
          id: "OperationBtns"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "ConsumeBtn",
          flowChildren: "down"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          horizontalAlign: "center",
          flowChildren: "right"
        }, _el$2);
      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ReturnBtn",
        get enabled() {
          return !props.requestPending?.();
        },
        text: "#MenuButton_Return",
        onactivate: () => props.onReturn?.()
      }), _el$2);
      libs.setProp(_el$2, "flowChildren", "down");
      libs.setProp(_el$3, "horizontalAlign", "center");
      libs.setProp(_el$3, "flowChildren", "right");
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return consumeList();
        },
        children: consume => {
          return (() => {
            const _el$4 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  });
                }
              }, null),
              _el$5 = libs.createElement("Label", {
                get text() {
                  return "X" + consume.needCount;
                }
              }, _el$4);
            libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return consume.itemID;
              }
            }), _el$5);
            libs.effect(_p$ => {
              const _v$ = libs.classNames("ComsumeItem", {
                  Enough: consume.hasCount >= consume.needCount
                }),
                _v$2 = "X" + consume.needCount;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$4;
          })();
        }
      }));
      libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
        get enabled() {
          return libs.memo(() => !!!bMax())() && canStrengthen();
        },
        get loading() {
          return props.requestPending?.();
        },
        color: "Confirm",
        get text() {
          return bMax() ? "#Equipment_MaxLv" : "#Equipment_LevelUP";
        },
        onactivate: () => {
          const gem = gemData();
          if (!gem) return;
          props.startForgeAnimation?.(() => new Promise(resolve => {
            CallActionRequest("/v1/gem/levelup", {
              gem_id: gem.id,
              level: 1
            }, () => resolve(), () => resolve());
          }));
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$3, "visible", !bMax(), _$p));
      return _el$;
    })());
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        id: "GemLevelupPanel",
        get ["class"]() {
          return libs.classNames({
            IsMax: bMax()
          }, "RarityColor" + rarity());
        }
      }, null);
      libs.createElement("Label", {
        "class": "WindowTitle",
        text: "#Equipment_GemLevelUP"
      }, _el$6);
      const _el$8 = libs.createElement("Label", {
        "class": "EquipName EquipRarityLabel",
        get text() {
          return "#" + gemData()?.gem_item_id;
        }
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$6);
      libs.createElement("Label", {
        "class": "MaxLvLabel",
        text: "#AlreadyMaxLv"
      }, _el$6);
      const _el$13 = libs.createElement("Label", {
        id: "GemRollChance",
        get text() {
          return LocalizeWithVars("#Gem_Change", {
            value: toFiniteNumber(gemData()?.gem_roll_change)
          });
        },
        hittest: false
      }, _el$6);
    libs.setProp(_el$9, "tooltip_text", "#GemLevelUPTips");
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return !bMax();
      },
      get children() {
        const _el$1 = libs.createElement("Panel", {
            id: "ShowLv",
            hittest: false
          }, null),
          _el$10 = libs.createElement("Label", {
            id: "CurLv",
            get vars() {
              return {
                value: ToColor(String(lv()), "#EBD9B5")
              };
            },
            text: "#Equipment_LevelUPNum",
            html: true
          }, _el$1);
          libs.createElement("Image", {
            id: "Arrow"
          }, _el$1);
          const _el$12 = libs.createElement("Label", {
            id: "NextLv",
            get vars() {
              return {
                value: ToColor(String(lv() + 1), "#61C441")
              };
            },
            text: "#Equipment_LevelUPNum",
            html: true
          }, _el$1);
        libs.effect(_p$ => {
          const _v$3 = {
              value: ToColor(String(lv()), "#EBD9B5")
            },
            _v$4 = {
              value: ToColor(String(lv() + 1), "#61C441")
            };
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "vars", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "vars", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$1;
      }
    }), _el$13);
    libs.insert(_el$6, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "LevelEffectSeparator",
      get text() {
        return bMax() ? "#CurrentLevelEffectPreview" : "#LevelEffectPreview";
      },
      hittest: false
    }), null);
    libs.insert(_el$6, libs.createComponent(equipment_comp.AttrContainer, {
      get children() {
        return [libs.createComponent(libs.For, {
          get each() {
            return gemData()?.main_entry_data ?? [];
          },
          children: (data, index) => {
            const {
              attrData,
              changeValue
            } = equipment_comp.calculateAttributeData(data, nextLVKv()?.main_mul ?? 0);
            return libs.createComponent(equipment_comp.AttrItem, {
              get index() {
                return index();
              },
              attrData: attrData,
              get changeValue() {
                return bMax() ? undefined : changeValue;
              },
              type: "Main"
            });
          }
        }), libs.createComponent(libs.For, {
          get each() {
            return gemData()?.adverb_entry_data ?? [];
          },
          children: (data, index) => libs.createComponent(equipment_comp.AttrItem, {
            get index() {
              return index();
            },
            attrData: data,
            type: "Adverb"
          })
        })];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames({
          IsMax: bMax()
        }, "RarityColor" + rarity()),
        _v$6 = "#" + gemData()?.gem_item_id,
        _v$7 = {
          Active: toFiniteNumber(gemData()?.gem_roll_change) > 0
        },
        _v$8 = LocalizeWithVars("#Gem_Change", {
          value: toFiniteNumber(gemData()?.gem_roll_change)
        });
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$6, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$8, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$13, "classList", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$13, "text", _v$8, _p$._v$8));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined
    });
    return _el$6;
  })();
};

const GemMakePreviewItem = props => (() => {
  const _el$ = libs.createElement("Panel", {
      get ["class"]() {
        return `AttrItem ${props.type}`;
      }
    }, null),
    _el$2 = libs.createElement("Panel", {
      verticalAlign: "center",
      flowChildren: "right"
    }, _el$);
    libs.createElement("Panel", {
      id: "Point"
    }, _el$2);
    const _el$4 = libs.createElement("Label", {
      id: "AttributeName",
      get text() {
        return props.name;
      },
      html: true
    }, _el$2),
    _el$5 = libs.createElement("Label", {
      id: "AttributeValue",
      get text() {
        return props.value;
      }
    }, _el$);
  libs.setProp(_el$2, "verticalAlign", "center");
  libs.setProp(_el$2, "style", {
    overflow: "noclip"
  });
  libs.setProp(_el$2, "flowChildren", "right");
  libs.effect(_p$ => {
    const _v$ = `AttrItem ${props.type}`,
      _v$2 = props.name,
      _v$3 = props.value;
    _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
    _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
    _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
    return _p$;
  }, {
    _v$: undefined,
    _v$2: undefined,
    _v$3: undefined
  });
  return _el$;
})();
const GemMakeWindow = props => {
  const store = equipment_comp.useEquipmentStore();
  const [, setShowTokens] = store.showTokens;
  const gemData = libs.createMemo(() => {
    if (props.gemData && props.gemData() != "undefined") {
      return props.gemData();
    } else {
      return undefined;
    }
  });
  const [selectedMainIndex, setSelectedMainIndex] = libs.createSignal(-1);
  const [selectedAdverbIndex, setSelectedAdverbIndex] = libs.createSignal(-1);
  const gemItemConfig = libs.createMemo(() => {
    const gemItemID = gemData()?.gem_item_id;
    return gemItemID == undefined ? undefined : KeyValues.info_item_gem[gemItemID];
  });
  const gemClassSetting = libs.createMemo(() => {
    const gemClass = gemItemConfig()?.class;
    return gemClass == undefined ? undefined : KeyValues.gem_class_setting[gemClass];
  });
  const dropdownMainEntry = libs.createMemo(() => {
    const entryPool = gemItemConfig()?.main_entry_pool;
    if (entryPool == undefined) return [];
    return Object.values(KeyValues.gem_entry).filter(entry => entry.pool_id === entryPool);
  });
  const dropdownAdverbEntry = libs.createMemo(() => {
    const entryPool = gemItemConfig()?.adverb_entry_pool;
    if (entryPool == undefined) return [];
    return Object.values(KeyValues.gem_entry).filter(entry => entry.pool_id === entryPool);
  });
  const selectedMainEntry = libs.createMemo(() => dropdownMainEntry()[selectedMainIndex()]);
  const selectedAdverbEntry = libs.createMemo(() => dropdownAdverbEntry()[selectedAdverbIndex()]);
  const getEntryName = (entry, placeholder) => {
    if (!entry) return GetLocalization(placeholder);
    return entry.entry_id.startsWith("privilege_") ? GetPrivilegeDesc(entry.entry_id, 1, {}).replace(/%value%%?/g, "") : GetLocalization("#property_" + entry.entry_id).replace("%", "");
  };
  const getEntryRange = (entry, bonus = 0) => {
    if (!entry) return "??%";
    const multiplier = 1 + bonus;
    return `${Round(entry.min * multiplier, entry.ratio)}~${Round(entry.max * multiplier, entry.ratio)}%`;
  };
  const consumeList = libs.createMemo(() => {
    const configValue = gemItemConfig()?.make_cost;
    if (!configValue) return [];
    return configValue.split("|").map(item => {
      const [itemID, num] = item.split(":");
      return {
        itemID,
        needCount: Number(num),
        hasCount: GetServiceItemCount(itemID)
      };
    }).filter(d => d.needCount > 0);
  });
  libs.createEffect(() => {
    const tokens = consumeList().map(d => ({
      itemID: toFiniteNumber(d.itemID),
      value: d.hasCount
    }));
    setShowTokens(tokens);
  });
  const canMake = libs.createMemo(() => {
    const mainSelected = selectedMainIndex() >= 0;
    const adverbSelected = selectedAdverbIndex() >= 0;
    const hasMaterials = consumeList().every(c => c.hasCount >= c.needCount);
    return mainSelected && adverbSelected && hasMaterials;
  });
  libs.createEffect(() => {
    props.setLeftExtraContent?.((() => {
      const _el$6 = libs.createElement("Panel", {
          id: "OperationBtns"
        }, null),
        _el$7 = libs.createElement("Panel", {
          id: "ConsumeBtn",
          flowChildren: "down"
        }, _el$6),
        _el$8 = libs.createElement("Panel", {
          horizontalAlign: "center",
          flowChildren: "right"
        }, _el$7);
      libs.insert(_el$6, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ReturnBtn",
        get enabled() {
          return !props.requestPending?.();
        },
        text: "#MenuButton_Return",
        onactivate: () => props.onReturn?.()
      }), _el$7);
      libs.setProp(_el$7, "flowChildren", "down");
      libs.setProp(_el$8, "horizontalAlign", "center");
      libs.setProp(_el$8, "flowChildren", "right");
      libs.insert(_el$8, libs.createComponent(libs.For, {
        get each() {
          return consumeList();
        },
        children: consume => {
          return (() => {
            const _el$9 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("ComsumeItem", {
                    Enough: consume.hasCount >= consume.needCount
                  });
                }
              }, null),
              _el$0 = libs.createElement("Label", {
                get text() {
                  return "X" + consume.needCount;
                }
              }, _el$9);
            libs.insert(_el$9, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return consume.itemID;
              }
            }), _el$0);
            libs.effect(_p$ => {
              const _v$4 = libs.classNames("ComsumeItem", {
                  Enough: consume.hasCount >= consume.needCount
                }),
                _v$5 = "X" + consume.needCount;
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "class", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "text", _v$5, _p$._v$5));
              return _p$;
            }, {
              _v$4: undefined,
              _v$5: undefined
            });
            return _el$9;
          })();
        }
      }));
      libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_Button, {
        get enabled() {
          return canMake();
        },
        get loading() {
          return props.requestPending?.();
        },
        color: "Confirm",
        text: "#Equipment_GemMake",
        onactivate: () => {
          const gem = gemData();
          if (!gem) return;
          if (equipment_utils.GemHasStates(gem, true)) return;
          props.startForgeAnimation?.(() => new Promise(resolve => {
            CallActionRequest("/v1/gem/make", {
              gem_id: gem.id,
              main_entry_id: dropdownMainEntry()[selectedMainIndex()].entry_id,
              adverb_entry_id: dropdownAdverbEntry()[selectedAdverbIndex()].entry_id
            }, () => resolve(), () => resolve());
          }));
        }
      }), null);
      return _el$6;
    })());
  });
  return (() => {
    const _el$1 = libs.createElement("Panel", {
        id: "GemMakePanel"
      }, null);
      libs.createElement("Label", {
        "class": "WindowTitle",
        text: "#Equipment_GemMake"
      }, _el$1);
      const _el$11 = libs.createElement("Label", {
        "class": "EquipName EquipRarityLabel",
        get text() {
          return "#" + gemData()?.gem_item_id;
        }
      }, _el$1),
      _el$12 = libs.createElement("Panel", {
        "class": "ToolTipIcon"
      }, _el$1);
    libs.setProp(_el$12, "tooltip_text", "#GemMakeTips");
    libs.insert(_el$1, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "SelectEntry",
      text: "#Equipment_EntrySelection",
      hittest: false
    }), null);
    libs.insert(_el$1, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      id: "MainEntrySelector",
      type: "EquipmentDropDown",
      index: -1,
      placeholder: "#Equipment_SelectMainEntry",
      onChange: index => setSelectedMainIndex(index),
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return dropdownMainEntry();
          },
          children: entry => (() => {
            const _el$13 = libs.createElement("Label", {
              get text() {
                return libs.memo(() => !!entry.entry_id.startsWith("privilege_"))() ? GetPrivilegeDesc(entry.entry_id, 1, {}).replace(/%value%%?/g, "") : GetLocalization("#property_" + entry.entry_id).replace("%", "");
              },
              html: true
            }, null);
            libs.setProp(_el$13, "style", {
              marginLeft: "24px"
            });
            libs.effect(_$p => libs.setProp(_el$13, "text", libs.memo(() => !!entry.entry_id.startsWith("privilege_"))() ? GetPrivilegeDesc(entry.entry_id, 1, {}).replace(/%value%%?/g, "") : GetLocalization("#property_" + entry.entry_id).replace("%", ""), _$p));
            return _el$13;
          })()
        });
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      id: "AdverbEntrySelector",
      type: "EquipmentDropDown",
      placeholder: "#Equipment_SelectSubEntry",
      index: -1,
      onChange: index => setSelectedAdverbIndex(index),
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return dropdownAdverbEntry();
          },
          children: entry => (() => {
            const _el$14 = libs.createElement("Label", {
              get text() {
                return libs.memo(() => !!entry.entry_id.startsWith("privilege_"))() ? GetPrivilegeDesc(entry.entry_id, 1, {}).replace(/%value%%?/g, "") : GetLocalization("#property_" + entry.entry_id).replace("%", "");
              },
              html: true
            }, null);
            libs.setProp(_el$14, "style", {
              marginLeft: "24px"
            });
            libs.effect(_$p => libs.setProp(_el$14, "text", libs.memo(() => !!entry.entry_id.startsWith("privilege_"))() ? GetPrivilegeDesc(entry.entry_id, 1, {}).replace(/%value%%?/g, "") : GetLocalization("#property_" + entry.entry_id).replace("%", ""), _$p));
            return _el$14;
          })()
        });
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "AttrPrev",
      text: "#Equipment_AttrPreview",
      hittest: false
    }), null);
    libs.insert(_el$1, libs.createComponent(equipment_comp.AttrContainer, {
      get children() {
        return [libs.createComponent(GemMakePreviewItem, {
          type: "Main",
          get name() {
            return getEntryName(selectedMainEntry(), "#Equipment_SelectMainEntry");
          },
          get value() {
            return getEntryRange(selectedMainEntry(), gemClassSetting()?.main_bonus);
          }
        }), libs.createComponent(GemMakePreviewItem, {
          type: "Adverb",
          get name() {
            return getEntryName(selectedAdverbEntry(), "#Equipment_SelectSubEntry");
          },
          get value() {
            return getEntryRange(selectedAdverbEntry(), gemClassSetting()?.adverb_bonus);
          }
        }), libs.createComponent(GemMakePreviewItem, {
          type: "Adverb",
          get name() {
            return GetLocalization("#Equipment_GemMake_RandomEntry");
          },
          value: "??%"
        }), libs.createComponent(GemMakePreviewItem, {
          type: "Adverb",
          get name() {
            return GetLocalization("#Equipment_GemMake_RandomEntry");
          },
          value: "??%"
        }), libs.createComponent(libs.For, {
          get each() {
            return gemData()?.chaos_entry_data ?? [];
          },
          children: entry => entry.id.startsWith("privilege_gem_suit_") ? libs.createComponent(equip_details.GemSpecialEffectRow, {
            data: entry
          }) : (() => {
            const _el$15 = libs.createElement("Panel", {
                "class": "ChaosEntry"
              }, null);
              libs.createElement("Panel", {
                id: "Point"
              }, _el$15);
              const _el$17 = libs.createElement("Label", {
                id: "EntryText",
                get text() {
                  return equipment_utils.GetChaosRowInfo(entry);
                },
                html: true
              }, _el$15);
            libs.effect(_$p => libs.setProp(_el$17, "text", equipment_utils.GetChaosRowInfo(entry), _$p));
            return _el$15;
          })()
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$11, "text", "#" + gemData()?.gem_item_id, _$p));
    return _el$1;
  })();
};

const HuntlootCardEntryRow = props => {
  const info = libs.createMemo(() => huntloot_details.GetHuntlootAttrDisplay(props.entry, props.entryType));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return `HuntlootDetailCardEntryRow ${info()?.colorName ?? ""}`;
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "HuntlootDetailCardEntryRowContent",
        hittest: false
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        "class": "HuntlootDetailCardAttrRow",
        hittest: false
      }, _el$2);
      libs.createElement("Panel", {
        id: "Point"
      }, _el$5);
      const _el$7 = libs.createElement("Label", {
        id: "AttrValue",
        get text() {
          return info()?.valueText ?? "";
        },
        html: true
      }, _el$5),
      _el$8 = libs.createElement("Label", {
        id: "AttrName",
        get text() {
          return info()?.nameHtml ?? "";
        },
        html: true
      }, _el$5),
      _el$0 = libs.createElement("Panel", {
        "class": "HuntlootDetailCardEntryHighlightFrame",
        hittest: false
      }, _el$);
    libs.setProp(_el$, "onmouseactivate", () => {
      if (props.selectable) {
        props.onActivate?.();
      }
    });
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return props.selectable;
      },
      get children() {
        const _el$3 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("HuntlootSelectionBox", {
                Selected: props.selected === true
              });
            },
            hittest: false
          }, null);
          libs.createElement("Panel", {
            "class": "HuntlootSelectionBoxTick",
            hittest: false
          }, _el$3);
        libs.effect(_$p => libs.setProp(_el$3, "class", libs.classNames("HuntlootSelectionBox", {
          Selected: props.selected === true
        }), _$p));
        return _el$3;
      }
    }), _el$5);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return props.entry.class != undefined;
      },
      get children() {
        const _el$9 = libs.createElement("Label", {
          "class": "HuntlootEntryDifficulty",
          get text() {
            return LocalizeWithVars("#Huntloot_EntryDifficulty", {
              difficulty: props.entry.class
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$9, "text", LocalizeWithVars("#Huntloot_EntryDifficulty", {
          difficulty: props.entry.class
        }), _$p));
        return _el$9;
      }
    }), null);
    libs.insert(_el$5, libs.createComponent(huntloot_details.HuntlootTierIIEffect, {
      get entryID() {
        return props.entry.id;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = `HuntlootDetailCardEntryRow ${info()?.colorName ?? ""}`,
        _v$2 = info()?.valueText ?? "",
        _v$3 = info()?.nameHtml ?? "",
        _v$4 = props.highlighted === true;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "visible", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
};
const HuntlootDetailCard = props => {
  const [local, other] = libs.splitProps(props, ["EmptyLabel", "huntloot", "selectable", "selectedEntryKey", "highlightEntryKeys", "onEntrySelect", "onRemoveHuntloot", "onDragDrop", "class"]);
  const adverbEntries = libs.createMemo(() => local.huntloot?.adverb_entry_data ?? []);
  const spellEntries = libs.createMemo(() => local.huntloot?.spell_entry_data ?? []);
  const isHighlighted = entryKey => local.highlightEntryKeys?.has(entryKey) === true;
  const canRemove = libs.createMemo(() => local.huntloot != undefined && local.onRemoveHuntloot != undefined);
  return (() => {
    const _el$1 = libs.createElement("Panel", libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("HuntlootDetailCard", local.class);
      }
    }), null);
    libs.spread(_el$1, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("HuntlootDetailCard", local.class);
      },
      "onDragDrop": (panel, draggedPanel) => {
        local.onDragDrop?.(panel, draggedPanel);
      }
    }), true);
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return local.huntloot != undefined;
      },
      get fallback() {
        return (() => {
          const _el$17 = libs.createElement("Panel", {
              "class": "EmptyMask HuntlootDetailCardContent",
              hittest: false
            }, null),
            _el$18 = libs.createElement("Panel", {
              "class": "HuntlootDevourCardIcon",
              hittest: false
            }, _el$17);
            libs.createElement("Panel", {
              "class": "HuntlootDevourCardIconPlus",
              hittest: false
            }, _el$18);
            const _el$20 = libs.createElement("Label", {
              html: true,
              get text() {
                return local.EmptyLabel;
              }
            }, _el$17);
          libs.effect(_$p => libs.setProp(_el$20, "text", local.EmptyLabel, _$p));
          return _el$17;
        })();
      },
      get children() {
        const _el$10 = libs.createElement("Panel", {
            "class": "HuntlootDetailCardContent",
            hittest: false
          }, null),
          _el$11 = libs.createElement("Panel", {
            "class": "HuntlootDevourCardIcon",
            hittest: false
          }, _el$10),
          _el$12 = libs.createElement("Panel", {
            "class": "HuntlootDevourCardName",
            hittest: false
          }, _el$10);
          libs.createElement("Panel", {
            id: "HuntlootDevourCardNameBG"
          }, _el$12);
          const _el$14 = libs.createElement("Label", {
            get ["class"]() {
              return libs.classNames("HuntlootDevourCardNameText", `Rarity${local.huntloot?.rarity ?? 1}`);
            },
            get text() {
              return huntloot_details.GetHuntlootName(local.huntloot);
            },
            hittest: false
          }, _el$12),
          _el$15 = libs.createElement("Panel", {
            "class": "HuntlootDetailCardEntryList VerticalScrollStyle",
            scroll: "y",
            hittest: false
          }, _el$10);
        libs.insert(_el$11, libs.createComponent(libs.Show, {
          get when() {
            return canRemove();
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_CloseButton, {
              onactivate: () => {
                if (!canRemove()) {
                  return;
                }
                local.onRemoveHuntloot?.();
              }
            });
          }
        }), null);
        libs.insert(_el$11, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(() => local.huntloot)), null);
        libs.setProp(_el$15, "scroll", "y");
        libs.insert(_el$15, libs.createComponent(libs.For, {
          get each() {
            return adverbEntries();
          },
          children: (entry, index) => {
            const entryKey = `adverb:${index()}`;
            return libs.createComponent(HuntlootCardEntryRow, {
              entry: entry,
              entryType: 2,
              entryKey: entryKey,
              get selectable() {
                return local.selectable;
              },
              get selected() {
                return local.selectedEntryKey === entryKey;
              },
              get highlighted() {
                return isHighlighted(entryKey);
              },
              onActivate: () => {
                local.onEntrySelect?.({
                  entryType: 2,
                  entryIndex: index(),
                  entryKey
                });
              }
            });
          }
        }), null);
        libs.insert(_el$15, libs.createComponent(libs.Show, {
          get when() {
            return libs.memo(() => adverbEntries().length > 0)() && spellEntries().length > 0;
          },
          get children() {
            return libs.createElement("Panel", {
              "class": "HuntlootDetailCardSeparator",
              hittest: false
            }, null);
          }
        }), null);
        libs.insert(_el$15, libs.createComponent(libs.For, {
          get each() {
            return spellEntries();
          },
          children: (entry, index) => {
            const entryKey = `spell:${index()}`;
            return libs.createComponent(HuntlootCardEntryRow, {
              entry: entry,
              entryType: 3,
              entryKey: entryKey,
              get selectable() {
                return local.selectable;
              },
              get selected() {
                return local.selectedEntryKey === entryKey;
              },
              get highlighted() {
                return isHighlighted(entryKey);
              },
              onActivate: () => {
                local.onEntrySelect?.({
                  entryType: 3,
                  entryIndex: index(),
                  entryKey
                });
              }
            });
          }
        }), null);
        libs.effect(_p$ => {
          const _v$5 = libs.classNames("HuntlootDevourCardNameText", `Rarity${local.huntloot?.rarity ?? 1}`),
            _v$6 = huntloot_details.GetHuntlootName(local.huntloot);
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$14, "class", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$14, "text", _v$6, _p$._v$6));
          return _p$;
        }, {
          _v$5: undefined,
          _v$6: undefined
        });
        return _el$10;
      }
    }));
    return _el$1;
  })();
};

function normalizeResult(data) {
  const entries = raw => {
    const parsed = typeof raw === "string" ? JSON.parseSafe(raw) : raw;
    const attributes = Array.isArray(parsed) ? parsed : Object.values(parsed ?? {});
    return attributes.map(entry => ({
      ...entry,
      value: toFiniteNumber(entry.value),
      base_value: toFiniteNumber(entry.base_value ?? entry.value),
      ...(entry.extra_value != undefined ? {
        extra_value: toFiniteNumber(entry.extra_value)
      } : {}),
      ...(entry.base_min != undefined ? {
        base_min: toFiniteNumber(entry.base_min)
      } : {}),
      ...(entry.base_max != undefined ? {
        base_max: toFiniteNumber(entry.base_max)
      } : {}),
      ...(entry.percent != undefined ? {
        percent: toFiniteNumber(entry.percent)
      } : {}),
      ...(entry.class != undefined ? {
        class: toFiniteNumber(entry.class)
      } : {})
    }));
  };
  return {
    ...data,
    id: toFiniteNumber(data.id),
    adverb_entry_data: entries(data.adverb_entry_data),
    spell_entry_data: entries(data.spell_entry_data)
  };
}
const entrySignature = entry => entry == undefined ? "" : JSON.stringify([entry.id, toFiniteNumber(entry.value), toFiniteNumber(entry.base_value ?? entry.value), toFiniteNumber(entry.extra_value), toFiniteNumber(entry.class)]);
const HuntlootDevourWindow = props => {
  const huntloots = huntloot_details.GetSimplifyHuntloots();
  const netResults = solid_utils.createServiceNetData("player_devour_huntloot_results", {});
  const [materialDetail, setMaterialDetail] = libs.createSignal();
  const [selectedEntry, setSelectedEntry] = libs.createSignal();
  const [originalTarget, setOriginalTarget] = libs.createSignal();
  const [responseResult, setResponseResult] = libs.createSignal();
  const [dismissedTargetID, setDismissedTargetID] = libs.createSignal();
  const [requesting, setRequesting] = libs.createSignal(false);
  const [confirming, setConfirming] = libs.createSignal();
  const targetID = () => toFiniteNumber(props.huntlootData()?.id, 0);
  const busy = () => requesting() || confirming() != undefined;
  let active = true;
  libs.onCleanup(() => {
    active = false;
    props.onPreviewingChange(false);
  });
  libs.createEffect(libs.on(props.devouredHuntlootID, id => {
    libs.batch(() => {
      setMaterialDetail();
      setSelectedEntry();
    });
    if (id == undefined) return;
    let valid = true;
    const request = huntloot_details.GetHuntlootDetail([id], data => {
      if (valid) setMaterialDetail(data[id]);
    }, true);
    libs.onCleanup(() => {
      valid = false;
      if (request) CancelRequest(request);
    });
  }));
  let lastTargetID;
  libs.createEffect(libs.on(targetID, id => {
    if (id <= 0 || id === lastTargetID) return;
    lastTargetID = id;
    libs.batch(() => {
      setOriginalTarget();
      setResponseResult();
      setDismissedTargetID();
      setSelectedEntry();
      props.setDevouredHuntlootID(undefined);
    });
  }));
  const previewResult = libs.createMemo(() => {
    const id = targetID();
    if (id <= 0 || dismissedTargetID() === id) return undefined;
    const response = responseResult();
    if (response?.id === id) return response;
    const value = Object.values(netResults()).find(result => result != null && result !== "nil" && toFiniteNumber(result.id) === id);
    return value && value !== "nil" ? normalizeResult(value) : undefined;
  });
  const isPreviewing = () => previewResult() != undefined || dismissedTargetID() !== targetID() && ["devour", "huntloot_devour"].includes(huntloots()[targetID()]?.in_check ?? "");
  libs.createEffect(() => props.onPreviewingChange(isPreviewing() || busy()));
  const leftData = libs.createMemo(() => {
    const target = props.huntlootData();
    const result = previewResult();
    return target && result ? {
      ...target,
      adverb_entry_data: result.adverb_entry_data,
      spell_entry_data: result.spell_entry_data
    } : target;
  });
  const rightData = () => isPreviewing() ? originalTarget() ?? props.huntlootData() : materialDetail();
  const highlightedKeys = libs.createMemo(() => {
    const keys = new Set();
    const result = previewResult();
    if (!result) return keys;
    const match = result.replaced_target?.match(/^([23])\|(\d+)$/);
    if (match) {
      const type = match[1] === "2" ? "adverb" : "spell";
      const index = Number(match[2]);
      const entries = type === "adverb" ? result.adverb_entry_data : result.spell_entry_data;
      if (entries[index]) {
        keys.add(`${type}:${index}`);
        return keys;
      }
    }
    const before = originalTarget() ?? props.huntlootData();
    if (!before) return keys;
    result.adverb_entry_data.forEach((entry, index) => {
      if (entrySignature(entry) !== entrySignature(before.adverb_entry_data[index])) keys.add(`adverb:${index}`);
    });
    result.spell_entry_data.forEach((entry, index) => {
      if (entrySignature(entry) !== entrySignature(before.spell_entry_data[index])) keys.add(`spell:${index}`);
    });
    return keys;
  });
  const costs = libs.createMemo(() => huntloot_details.ParseHuntlootDevourCosts());
  const canDevour = () => !busy() && !isPreviewing() && targetID() > 0 && materialDetail() != undefined && materialDetail()?.id === props.devouredHuntlootID() && materialDetail()?.huntloot_part === props.huntlootData()?.huntloot_part && selectedEntry() != undefined;
  const canConfirm = () => !busy() && isPreviewing() && targetID() > 0;
  const showError = (message, fallback) => ErrorMessage(message ? GetLocalization(message, message) : GetLocalization(fallback));
  const selectMaterial = id => {
    if (busy() || isPreviewing() || id === targetID() || id <= 0) return;
    const material = huntloots()[id];
    if (!material || huntloot_details.HuntlootHasStates(material, true)) return;
    const target = huntloots()[targetID()];
    if (!target) return;
    if (material.huntloot_part !== target.huntloot_part) {
      showError(undefined, "#HuntlootDevour_PartMismatch");
      return;
    }
    props.setDevouredHuntlootID(id);
  };
  const devour = () => {
    if (!canDevour()) return;
    const target = props.huntlootData();
    const material = materialDetail();
    const entry = selectedEntry();
    const currentTarget = huntloots()[target.id];
    const currentMaterial = huntloots()[material.id];
    if (!currentTarget || currentTarget.rarity !== huntloot_details.MAX_HUNTLOOT_RARITY || currentTarget.in_check) return;
    if (material.id === target.id || !currentMaterial || huntloot_details.HuntlootHasStates(currentMaterial, true)) return;
    if (currentMaterial.huntloot_part !== currentTarget.huntloot_part) {
      showError(undefined, "#HuntlootDevour_PartMismatch");
      return;
    }
    const entries = entry.entryType === 2 ? material.adverb_entry_data : material.spell_entry_data;
    if (!entries[entry.entryIndex]) return;
    setOriginalTarget({
      ...target,
      adverb_entry_data: target.adverb_entry_data.map(attr => ({
        ...attr
      })),
      spell_entry_data: target.spell_entry_data.map(attr => ({
        ...attr
      }))
    });
    const params = {
      target_id: target.id,
      devoured_id: material.id,
      entry_type: entry.entryType,
      devoured_entry_index: entry.entryIndex
    };
    setRequesting(true);
    CallActionRequest("/v1/huntloot/devour", params, response => {
      if (!active) return;
      setRequesting(false);
      if (response.code !== 0 && response.code !== 200) {
        showError(response.message, "#HuntlootDevour_RequestFailed");
        return;
      }
      if (targetID() !== params.target_id) return;
      const result = Object.values(response.data?.player_devour_huntloot_results ?? {}).find(item => toFiniteNumber(item.id) === params.target_id);
      libs.batch(() => {
        setDismissedTargetID();
        if (result) setResponseResult(normalizeResult(result));
        props.setDevouredHuntlootID(undefined);
      });
    }, () => {
      if (!active) return;
      setRequesting(false);
      showError(undefined, "#HuntlootDevour_RequestTimeout");
    });
  };
  const confirmDevour = confirm => {
    if (!canConfirm()) return;
    const params = {
      target_id: targetID(),
      confirm
    };
    setConfirming(confirm);
    CallActionRequest("/v1/huntloot/devour_confirm", params, response => {
      if (!active) return;
      setConfirming();
      if (response.code !== 0 && response.code !== 200) {
        showError(response.message, "#HuntlootDevour_ConfirmFailed");
        return;
      }
      if (targetID() !== params.target_id) return;
      libs.batch(() => {
        setDismissedTargetID(params.target_id);
        setResponseResult();
        setSelectedEntry();
        props.setDevouredHuntlootID(undefined);
      });
      props.onPreviewFinished();
    }, () => {
      if (!active) return;
      setConfirming();
      showError(undefined, "#HuntlootDevour_ConfirmTimeout");
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HuntlootDevourRoot"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "HuntlootDevourMainContent",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "HuntlootDevourArrow",
        hittest: false
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "HuntlootDevourOperation",
        hittest: false
      }, _el$);
    libs.insert(_el$2, libs.createComponent(HuntlootDetailCard, {
      id: "HuntlootDevourLeftCard",
      get EmptyLabel() {
        return GetLocalization("#HuntlootDevour_LeftCardEmptyLabel");
      },
      get huntloot() {
        return leftData();
      },
      get highlightEntryKeys() {
        return libs.memo(() => !!isPreviewing())() ? highlightedKeys() : undefined;
      },
      get onRemoveHuntloot() {
        return !busy() && !isPreviewing() ? props.onRemoveTarget : undefined;
      }
    }), _el$3);
    libs.insert(_el$2, libs.createComponent(HuntlootDetailCard, {
      id: "HuntlootDevourRightCard",
      get EmptyLabel() {
        return GetLocalization("#HuntlootDevour_RightCardEmptyLabel");
      },
      get huntloot() {
        return rightData();
      },
      get highlightEntryKeys() {
        return libs.memo(() => !!isPreviewing())() ? highlightedKeys() : undefined;
      },
      get selectable() {
        return libs.memo(() => !!!busy())() && !isPreviewing();
      },
      get selectedEntryKey() {
        return selectedEntry()?.entryKey;
      },
      onEntrySelect: entry => {
        if (!busy() && !isPreviewing()) setSelectedEntry(entry);
      },
      get onRemoveHuntloot() {
        return !busy() && !isPreviewing() ? () => props.setDevouredHuntlootID(undefined) : undefined;
      },
      onDragDrop: (_panel, dragged) => selectMaterial(toFiniteNumber(LoadData(dragged, "huntloot")))
    }), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return !isPreviewing();
      },
      get children() {
        const _el$5 = libs.createElement("Panel", {
            id: "HuntlootDevourStartButtons"
          }, null),
          _el$6 = libs.createElement("Panel", {
            id: "UpgradeCost"
          }, _el$5),
          _el$7 = libs.createElement("Panel", {
            id: "UpgradeCostContent"
          }, _el$6);
        libs.insert(_el$7, libs.createComponent(libs.For, {
          get each() {
            return costs();
          },
          children: cost => (() => {
            const _el$1 = libs.createElement("Panel", {
                "class": "HuntlootDevourCostItem"
              }, null),
              _el$10 = libs.createElement("Label", {
                id: "UpgradeCostLabel",
                get text() {
                  return `x${cost.amount}`;
                }
              }, _el$1);
            libs.insert(_el$1, libs.createComponent(Player.CurrencyIcon, {
              id: "UpgradeCostIcon",
              get tokenID() {
                return cost.itemID;
              }
            }), _el$10);
            libs.effect(_$p => libs.setProp(_el$10, "text", `x${cost.amount}`, _$p));
            return _el$1;
          })()
        }));
        libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_Button, {
          id: "HuntlootDevourStartConfirmButton",
          color: "Confirm",
          size: "Normal",
          get text() {
            return GetLocalization("#HuntlootDevour_OptCheck");
          },
          get enabled() {
            return canDevour();
          },
          get loading() {
            return requesting();
          },
          onactivate: devour
        }), null);
        libs.effect(_$p => libs.setProp(_el$6, "visible", costs().length > 0, _$p));
        return _el$5;
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return isPreviewing();
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
            id: "HuntlootDevourCheckButtons"
          }, null),
          _el$9 = libs.createElement("Panel", {
            "class": "HuntlootDevourCheckButtonSlot"
          }, _el$8),
          _el$0 = libs.createElement("Panel", {
            "class": "HuntlootDevourCheckButtonSlot"
          }, _el$8);
        libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
          id: "HuntlootDevourCheckConfirmButton",
          color: "Confirm",
          size: "Normal",
          get text() {
            return GetLocalization("#HuntlootDevour_OptCheckResult");
          },
          get enabled() {
            return canConfirm();
          },
          get loading() {
            return confirming() === true;
          },
          onactivate: () => confirmDevour(true)
        }));
        libs.insert(_el$0, libs.createComponent(EOM_Button.EOM_Button, {
          id: "HuntlootDevourResetButton",
          color: "Cancel",
          size: "Normal",
          get text() {
            return GetLocalization("#HuntlootDevour_OptReset");
          },
          get enabled() {
            return canConfirm();
          },
          get loading() {
            return confirming() === false;
          },
          onactivate: () => confirmDevour(false)
        }));
        return _el$8;
      }
    }), null);
    return _el$;
  })();
};

const ENTRY_FILTER_MODES = ["default", "include", "exclude"];
function matchesHuntlootEntryFilter(entries, filter) {
  const ids = new Set(entries.map(entry => entry.id));
  return Object.entries(filter).every(([id, mode]) => mode === "default" || (mode === "include" ? ids.has(id) : !ids.has(id)));
}
function HuntlootEntryFilterList(props) {
  const entries = [...new Map(Object.values(KeyValues.huntloot_entry).filter(entry => entry.entry_type === props.entryType).sort((a, b) => a.id - b.id).map(entry => [entry.entry_name, entry])).values()];
  return (() => {
    const _el$ = libs.createElement("Panel", {
      "class": "HuntlootEntryFilterList"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.For, {
      each: entries,
      children: entry => (() => {
        const _el$2 = libs.createElement("Panel", {
            "class": "EquipmentSubEntryFilterRow"
          }, null),
          _el$3 = libs.createElement("Label", {
            html: true,
            "class": "EquipmentSubEntryName",
            get text() {
              return huntloot_details.GetHuntlootAttrDisplay({
                id: entry.entry_name,
                value: 0,
                base_value: 0
              }, props.entryType, {
                showAttributeRange: false
              }).nameHtml;
            }
          }, _el$2),
          _el$4 = libs.createElement("Panel", {
            "class": "EquipmentSubEntryMode"
          }, _el$2);
        libs.insert(_el$4, libs.createComponent(libs.For, {
          each: ENTRY_FILTER_MODES,
          children: (mode, index) => (() => {
            const _el$5 = libs.createElement("Panel", {
                "class": "EquipmentSubEntryModeOption"
              }, null),
              _el$6 = libs.createElement("Button", {
                get ["class"]() {
                  return libs.classNames("EquipmentSubEntryModeButton", mode, {
                    Selected: (props.filter()[entry.entry_name] ?? "default") === mode
                  });
                }
              }, _el$5),
              _el$7 = libs.createElement("Label", {
                get text() {
                  return GetLocalization(`#Equipment_GemSubFilter_${mode}`);
                }
              }, _el$6);
            libs.setProp(_el$6, "onactivate", () => props.setFilter(previous => {
              const next = {
                ...previous
              };
              if (mode === "default") delete next[entry.entry_name];else next[entry.entry_name] = mode;
              return next;
            }));
            libs.insert(_el$5, libs.createComponent(libs.Show, {
              get when() {
                return index() < ENTRY_FILTER_MODES.length - 1;
              },
              get children() {
                return libs.createElement("Label", {
                  "class": "EquipmentSubEntryModeSeparator",
                  text: "/"
                }, null);
              }
            }), null);
            libs.effect(_p$ => {
              const _v$ = libs.classNames("EquipmentSubEntryModeButton", mode, {
                  Selected: (props.filter()[entry.entry_name] ?? "default") === mode
                }),
                _v$2 = GetLocalization(`#Equipment_GemSubFilter_${mode}`);
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "class", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$5;
          })()
        }));
        libs.effect(_$p => libs.setProp(_el$3, "text", huntloot_details.GetHuntlootAttrDisplay({
          id: entry.entry_name,
          value: 0,
          base_value: 0
        }, props.entryType, {
          showAttributeRange: false
        }).nameHtml, _$p));
        return _el$2;
      })()
    }));
    return _el$;
  })();
}
function HuntlootFilterContent(props) {
  const rarities = [...new Set(Object.values(KeyValues.info_item_huntloot).map(item => item.rarity))].sort((a, b) => a - b);
  const classes = Object.values(KeyValues.huntloot_class_setting).map(row => row.huntloot_class).sort((a, b) => a - b);
  return (() => {
    const _el$9 = libs.createElement("Panel", {
        "class": "HuntlootFilterContent VerticalScrollStyle",
        scroll: "y"
      }, null),
      _el$0 = libs.createElement("Label", {
        "class": "Subheading",
        get text() {
          return GetLocalization("#Equipment_Rarity");
        }
      }, _el$9);
      libs.createElement("Panel", {
        "class": "Separator FilterLine"
      }, _el$9);
      const _el$10 = libs.createElement("Panel", {
        "class": "CheckBoxList"
      }, _el$9),
      _el$11 = libs.createElement("Label", {
        "class": "Subheading",
        get text() {
          return GetLocalization("#Huntloot_FilterClass");
        }
      }, _el$9);
      libs.createElement("Panel", {
        "class": "Separator FilterLine"
      }, _el$9);
      const _el$13 = libs.createElement("Panel", {
        "class": "CheckBoxList"
      }, _el$9),
      _el$14 = libs.createElement("Label", {
        "class": "Subheading",
        get text() {
          return GetLocalization("#Huntloot_FilterAdverb");
        }
      }, _el$9);
      libs.createElement("Panel", {
        "class": "Separator FilterLine"
      }, _el$9);
      const _el$16 = libs.createElement("Label", {
        "class": "Subheading",
        get text() {
          return GetLocalization("#Huntloot_FilterSpell");
        }
      }, _el$9);
      libs.createElement("Panel", {
        "class": "Separator FilterLine"
      }, _el$9);
    libs.setProp(_el$9, "scroll", "y");
    libs.insert(_el$10, libs.createComponent(libs.For, {
      each: rarities,
      children: rarity => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        "class": `Rarity${rarity}`,
        get checked() {
          return props.rarity()[rarity] ?? false;
        },
        get text() {
          return GetLocalization(`#Equipment_Rarity_${rarity}`);
        },
        onchecked: checked => props.setRarity(previous => ({
          ...previous,
          [rarity]: checked
        }))
      })
    }));
    libs.insert(_el$13, libs.createComponent(libs.For, {
      each: classes,
      children: huntlootClass => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        get checked() {
          return props.classFilter()[huntlootClass] ?? false;
        },
        get text() {
          return LocalizeWithVars("#Huntloot_EntryDifficulty", {
            difficulty: huntlootClass
          });
        },
        onchecked: checked => props.setClassFilter(previous => ({
          ...previous,
          [huntlootClass]: checked
        }))
      })
    }));
    libs.insert(_el$9, libs.createComponent(HuntlootEntryFilterList, {
      entryType: 2,
      get filter() {
        return props.adverb;
      },
      get setFilter() {
        return props.setAdverb;
      }
    }), _el$16);
    libs.insert(_el$9, libs.createComponent(HuntlootEntryFilterList, {
      entryType: 3,
      get filter() {
        return props.spell;
      },
      get setFilter() {
        return props.setSpell;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = GetLocalization("#Equipment_Rarity"),
        _v$4 = GetLocalization("#Huntloot_FilterClass"),
        _v$5 = GetLocalization("#Huntloot_FilterAdverb"),
        _v$6 = GetLocalization("#Huntloot_FilterSpell");
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$0, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$11, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$14, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$16, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$9;
  })();
}

const MENU_LIST = {
  EquipmentTab_equip: [],
  EquipmentTab_part_levelup: [],
  EquipmentTab_forge2: [],
  EquipmentTab_break: [],
  EquipmentTab_key: ["EquipmentTab_key_devour", "EquipmentTab_key_break"],
  EquipmentTab_drawing: ["EquipmentTab_drawing_make", "EquipmentTab_drawing_recast"]
};
const SHOW_ITEM_LIST_MENU = {
  "EquipmentTab_equip": true,
  "EquipmentTab_classup": true,
  "EquipmentTab_forge": true,
  "EquipmentTab_break": true,
  "EquipmentTab_forge2": true
};
const SHOW_EQUIPED_MENU = {
  "EquipmentTab_equip": true
};
function setDragPanelOffset(dragCallbacks, dragPanel) {
  const position = GameUI.GetCursorPosition();
  if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
    dragCallbacks.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
    dragCallbacks.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
  }
}
const EQUIP_PART_ICON = {
  0: "icon_zb_01.png",
  1: "icon_zb_03.png",
  2: "icon_zb_08.png",
  3: "icon_zb_09.png",
  4: "icon_zb_07.png",
  5: "icon_zb_06.png",
  6: "icon_zb_05.png",
  7: "icon_zb_04.png",
  8: "icon_zb_02.png"
};
const GEM_RARITY_ICON = {
  5: "icon_zb_10.png",
  6: "icon_zb_11.png",
  7: "icon_zb_12.png"
};
const HUNTLOOT_SLOT_ICON = {
  1: "icon_zb_16.png",
  2: "icon_zb_17.png",
  3: "icon_zb_18.png"
};
const HUNTLOOT_DRAG_SLOT_BASE = 100;
const GEM_MAIN_ENTRY_POOLS = new Set(Object.values(KeyValues.info_item_gem).map(gem => gem.main_entry_pool));
const GEM_SUB_ENTRY_POOLS = new Set(Object.values(KeyValues.info_item_gem).map(gem => gem.adverb_entry_pool));
const GEM_MAIN_ENTRY_IDS = [...new Set(Object.values(KeyValues.gem_entry).filter(entry => GEM_MAIN_ENTRY_POOLS.has(entry.pool_id)).map(entry => entry.entry_id))];
const GEM_SUB_ENTRY_IDS = [...new Set(Object.values(KeyValues.gem_entry).filter(entry => GEM_SUB_ENTRY_POOLS.has(entry.pool_id)).map(entry => entry.entry_id))];
const GEM_CLASSES = [...new Set(Object.values(KeyValues.info_item_gem).map(gem => gem.class))].sort((a, b) => a - b);
const EQUIP_SUB_ENTRY_LIST = Object.values(KeyValues.equip_entry).filter(entry => entry.entry_type === 2).sort((a, b) => a.id - b.id);
const EQUIP_SUB_ENTRY_FILTER_MODES = ["default", "include", "exclude"];
const GEM_SUB_ENTRY_FILTER_MODES = ["default", "include", "exclude"];
CustomUIConfig.EntryRatio ??= {};
for (let k in KeyValues.gem_entry) {
  const id = KeyValues.gem_entry[k].entry_id;
  CustomUIConfig.EntryRatio[id] = KeyValues.gem_entry[k].ratio;
}
for (let id in KeyValues.equip_entry) {
  CustomUIConfig.EntryRatio[id] = KeyValues.equip_entry[id].ratio;
}
const classSetting = Object.values(KeyValues.equip_class_setting);
const NEEDLV_LIST = [];
const CLASS_LIST = [];
for (let i = 0; i < classSetting.length; i++) {
  let d = classSetting[i];
  NEEDLV_LIST.push(d.need_level);
  CLASS_LIST.push(d.equip_class);
}
const equipPunchMap = {};
for (const row of Object.values(KeyValues.equip_punch)) {
  if (!equipPunchMap[row.class]) {
    equipPunchMap[row.class] = {};
  }
  equipPunchMap[row.class][row.rarity] = row;
}
function canEquipPunch(equipClass, rarity) {
  return getEquipPunchConfig(equipClass, rarity) != undefined;
}
function getEquipPunchConfig(equipClass, rarity) {
  return equipPunchMap[equipClass]?.[rarity];
}
function getRarityUpgradeMax(equipClass) {
  return KeyValues.equip_class_setting[equipClass]?.rarity_upgrade_max;
}
function canEquipRarityUp(data) {
  const raritySetting = KeyValues.equip_rarity_setting[data.rarity];
  const maxRarity = getRarityUpgradeMax(data.class);
  return data.remaining_potential > 0 && raritySetting?.rarity_upgrade == 1 && maxRarity != undefined && data.rarity < maxRarity;
}
function getRarityUpgradeRange(equipClass) {
  const maxRarity = getRarityUpgradeMax(equipClass);
  const range = findRarityRangeByFlag("rarity_upgrade");
  if (!range || maxRarity == undefined) return range;
  const max = Math.min(range.max, maxRarity - 1);
  if (max < range.min) return undefined;
  return {
    min: range.min,
    max
  };
}
const getEquipmentGemSlots = data => {
  if (!data?.inlay_gems_data) return [];
  const slots = JSON.parseSafe(data.inlay_gems_data);
  return Array.isArray(slots) ? slots : [];
};
const hasGemChaosEntries = gem => {
  const rawEntries = gem?.chaos_entry_data;
  const entries = typeof rawEntries === "string" ? JSON.parseSafe(rawEntries) : rawEntries;
  return Array.isArray(entries) && entries.length > 0;
};
const getPendingForgeTab = data => {
  if (data?.in_check === "recast_v2") return "Recast";
  if (data?.in_check === "gem_fusion") return "Fusion";
  if (data?.in_check === "huntloot_devour") return "Devour";
};
const isEquipMeetCondition = (data, tabName) => {
  const pendingForgeTab = getPendingForgeTab(data);
  if (pendingForgeTab) {
    return tabName === pendingForgeTab;
  }
  const equipClass = data.class;
  const equipRarity = data.rarity;
  if (tabName == "ClassUP") {
    const classSetting = KeyValues.equip_class_setting[equipClass];
    if (!classSetting) return false;
    return !(data.level < 50 && classSetting.ischange != 1);
  } else if (tabName == "RarityUP") {
    return canEquipRarityUp(data);
  } else if (tabName == "Recast") {
    const raritySetting = KeyValues.equip_rarity_setting[equipRarity];
    if (!raritySetting) return false;
    return data.remaining_potential > 0 && raritySetting.entry_recast == 1;
  } else if (tabName == "Refine") {
    const raritySetting = KeyValues.equip_rarity_setting[equipRarity];
    if (!raritySetting) return false;
    return data.remaining_potential > 0 && raritySetting.entry_refine == 1;
  } else if (tabName == "Inlay") {
    return canEquipPunch(data.class, data.rarity);
  } else if (tabName == "Fusion") {
    return getEquipmentGemSlots(data).some(hasGemChaosEntries);
  }
  return true;
};
const equipmentHasGemEffect = data => {
  return getEquipmentGemSlots(data).some(gem => gem?.gem_item_id != undefined);
};
const canSwapEquipmentGems = (first, second) => {
  if (!first || !second || first.id == second.id) return false;
  return getEquipmentGemSlots(first).length > 0 && getEquipmentGemSlots(second).length > 0 && (equipmentHasGemEffect(first) || equipmentHasGemEffect(second));
};
const isGemMeetCondition = (data, tabName) => {
  if (tabName == "GemLevelUP") {
    const rows = Object.values(KeyValues.gem_level).filter(row => row.rarity === data.rarity);
    if (rows.length === 0) return false;
    const maxLevel = rows.reduce((max, row) => Math.max(max, row.level), 0);
    return data.level < maxLevel;
  } else if (tabName == "GemMake") {
    return data.level === 0;
  } else if (tabName == "Fusion") {
    return data.rarity === 7 && !data.locked;
  }
  return true;
};
const isHuntlootMeetCondition = (data, tabName) => {
  if (tabName == "Devour") {
    const target = player_huntloots()[selectedItemID() ?? 0];
    return target != undefined && data.id !== target.id && data.huntloot_part === target.huntloot_part && !huntloot_details.HuntlootHasStates(data);
  }
  return true;
};
const getHuntlootDisableReasons = (data, tabName) => {
  if (tabName == "Devour") {
    if (data.rarity !== huntloot_details.MAX_HUNTLOOT_RARITY) {
      return [{
        key: "#HuntlootDevour_RarityNotSupport",
        vars: {
          rarity: huntloot_details.MAX_HUNTLOOT_RARITY
        }
      }];
    }
  }
  return [];
};
function findRarityRangeByFlag(flag) {
  const settings = KeyValues.equip_rarity_setting;
  if (!settings) return undefined;
  let min;
  let max;
  for (let r = 1; r <= 7; r++) {
    const row = settings[r];
    if (row && row[flag] == 1) {
      if (min == null) min = r;
      max = r;
    }
  }
  if (min == null || max == null) return undefined;
  return {
    min,
    max
  };
}
function getRarityRangeText(range) {
  if (!range) return undefined;
  const minName = GetLocalization("#Equipment_Rarity_" + range.min);
  const maxName = GetLocalization("#Equipment_Rarity_" + range.max);
  return range.min === range.max ? minName : `${minName}-${maxName}`;
}
const getEquipDisableReasons = (data, tabName) => {
  const pendingForgeTab = getPendingForgeTab(data);
  if (pendingForgeTab) {
    if (tabName !== pendingForgeTab) {
      return [{
        key: pendingForgeTab === "Fusion" ? "#Equipment_GemFusion_PendingConfirm" : "#Equipment_TextTips_InCheck"
      }];
    }
  }
  if (tabName == "ClassUP") {
    const classSetting = KeyValues.equip_class_setting[data.class];
    if (!classSetting) return [{
      key: "#Equipment_TextTips_ClassUP_NotSupport"
    }];
    if (data.level < 50 && classSetting.ischange != 1) return [{
      key: "#Equipment_TextTips_ClassUP_LevelNotEnough",
      vars: {
        value: 50
      }
    }];
    return [];
  } else if (tabName == "RarityUP") {
    const reasons = [];
    if (!canEquipRarityUp(data) && data.remaining_potential > 0) {
      const rarityText = getRarityRangeText(getRarityUpgradeRange(data.class));
      reasons.push({
        key: "#Equipment_TextTips_RarityUP_RarityNotSupport",
        vars: rarityText ? {
          rarity: rarityText
        } : undefined
      });
    }
    if (data.remaining_potential <= 0) {
      reasons.push({
        key: "#Equipment_TextTips_NoPotential"
      });
    }
    return reasons;
  } else if (tabName == "Recast") {
    const reasons = [];
    const raritySetting = KeyValues.equip_rarity_setting[data.rarity];
    if (!raritySetting || raritySetting.entry_recast != 1) {
      const rarityText = getRarityRangeText(findRarityRangeByFlag("entry_recast"));
      reasons.push({
        key: "#Equipment_TextTips_Recast_RarityNotSupport",
        vars: rarityText ? {
          rarity: rarityText
        } : undefined
      });
    }
    if (data.remaining_potential <= 0) {
      reasons.push({
        key: "#Equipment_TextTips_NoPotential"
      });
    }
    return reasons;
  } else if (tabName == "Refine") {
    const reasons = [];
    const raritySetting = KeyValues.equip_rarity_setting[data.rarity];
    if (!raritySetting || raritySetting.entry_refine != 1) {
      const rarityText = getRarityRangeText(findRarityRangeByFlag("entry_refine"));
      reasons.push({
        key: "#Equipment_TextTips_Refine_RarityNotSupport",
        vars: rarityText ? {
          rarity: rarityText
        } : undefined
      });
    }
    if (data.remaining_potential <= 0) {
      reasons.push({
        key: "#Equipment_TextTips_NoPotential"
      });
    }
    return reasons;
  } else if (tabName == "Inlay") {
    if (!canEquipPunch(data.class, data.rarity)) {
      const reasons = [];
      const allClasses = Object.keys(equipPunchMap).map(Number);
      const allRarities = allClasses.flatMap(c => Object.keys(equipPunchMap[c]).map(Number));
      const minClass = allClasses.length > 0 ? Math.min(...allClasses) : undefined;
      const rarityRange = allRarities.length > 0 ? {
        min: Math.min(...allRarities),
        max: Math.max(...allRarities)
      } : undefined;
      if (minClass != null && data.class < minClass) {
        reasons.push({
          key: "#Equipment_TextTips_Inlay_ClassRequire",
          vars: {
            value: minClass
          }
        });
      }
      if (rarityRange && data.rarity < rarityRange.min) {
        const rarityText = getRarityRangeText(rarityRange);
        reasons.push({
          key: "#Equipment_TextTips_Inlay_RarityNotSupport",
          vars: rarityText ? {
            rarity: rarityText
          } : undefined
        });
      }
      if (reasons.length === 0) {
        reasons.push({
          key: "#Equipment_TextTips_Inlay_NotSupport"
        });
      }
      return reasons;
    }
    return [];
  } else if (tabName == "Fusion") {
    return getEquipmentGemSlots(data).some(hasGemChaosEntries) ? [] : [{
      key: "#Equipment_GemFusion_TargetRequired"
    }];
  }
  return [];
};
const getGemDisableReasons = (data, tabName) => {
  if (tabName == "GemLevelUP") {
    const rows = Object.values(KeyValues.gem_level).filter(row => row.rarity === data.rarity);
    if (rows.length === 0) return [{
      key: "#Equipment_TextTips_GemLevelUP_NoConfig"
    }];
    const maxLevel = rows.reduce((max, row) => Math.max(max, row.level), 0);
    if (data.level >= maxLevel) return [{
      key: "#Equipment_TextTips_GemLevelUP_MaxLevel"
    }];
    return [];
  } else if (tabName == "GemMake") {
    if (data.level !== 0) return [{
      key: "#Equipment_TextTips_GemMake_AlreadyEnhanced"
    }];
    return [];
  }
  return [];
};
const {
  LayoutMenu,
  show,
  secondTabName,
  menuName,
  jumpInfo
} = EOM_MenuLayout.createMenuLayout("equipment", () => MENU_LIST);
const [previewHeroName, setPreviewHeroName] = global_selection.createPreviewHeroNameSignal();
const selectHeroID = () => {
  const heroName = previewHeroName();
  return GetHeroIDByHeroName(heroName);
};
let selectEquipSuitID = () => 1;
let setSelectEquipSuitID = () => 1;
let selectedItemID = () => undefined;
let setSelectedItemID = () => undefined;
const selectedItemData = () => {
  const id = selectedItemID();
  if (!id) {
    return;
  }
  return player_equipments()[id];
};
let selectedSlot = () => undefined;
let setSelectedSlot = () => undefined;
let selectedItemTab = () => "equipment";
let setSelectedItemTab = () => "equipment";
let draggedSlot = () => undefined;
let setDraggedSlot = () => undefined;
let selectedItemList = () => [];
let setSelectedItemList = () => [];
let selectBreakSlot = () => -1;
let setSelectBreakSlot = () => -1;
let breakListMode = () => false;
let setBreakListMode = () => false;
let selectedGemList = () => [];
let setSelectedGemList = () => [];
let hiddenItemList = () => false;
let setItemListIsHidden = () => false;
let forgeChildTab = () => undefined;
let setForgeChildTab = () => undefined;
let lockItemTab = () => false;
let setLockItemTab = () => false;
let showFilter = () => false;
let setShowFilter = () => false;
let showTokens = () => [];
let setShowTokens = () => [];
let equipmentUnreadIds;
let gemUnreadIds;
let partFilter = () => 0;
let setPartFilter = () => 0;
let filterNeedLv = () => ({});
let setFilterNeedLv = () => ({});
let filterRarity = () => ({});
let setFilterRarity = () => ({});
let filterGemMainEntry = () => ({});
let setFilterGemMainEntry = () => ({});
let filterGemClass = () => ({});
let setFilterGemClass = () => ({});
let filterGemSubEntry = () => ({});
let setFilterGemSubEntry = () => ({});
let filterGemChaosEntry = () => ({});
let setFilterGemChaosEntry = () => ({});
const hasInvalidGemChaosRange = () => Object.values(filterGemChaosEntry()).some(range => {
  if (!range.selected) return false;
  const min = range.min.trim();
  const max = range.max.trim();
  return min !== "" && (!Number.isInteger(Number(min)) || Number(min) < 1) || max !== "" && (!Number.isInteger(Number(max)) || Number(max) < 1) || min !== "" && max !== "" && Number(min) > Number(max);
});
let filterGemMainRanges = () => ({});
let setFilterGemMainRanges = () => ({});
let filterGemSubRanges = () => ({});
let setFilterGemSubRanges = () => ({});
let filterGemChaosAny = () => false;
let setFilterGemChaosAny = () => false;
const hasInvalidGemValueRange = () => Object.keys(filterGemMainEntry()).some(id => filterGemMainEntry()[id] && !entry_range_inputs.isEntryFilterRangeValid(filterGemMainRanges()[id])) || Object.keys(filterGemSubEntry()).some(id => filterGemSubEntry()[id] === "include" && !entry_range_inputs.isEntryFilterRangeValid(filterGemSubRanges()[id]));
let filteredGemIDs = () => undefined;
let setFilteredGemIDs = () => undefined;
let gemFilterRequesting = () => false;
let setGemFilterRequesting = () => false;
let filterEquipSubEntry = () => ({});
let setFilterEquipSubEntry = () => ({});
let filterEquipSubRanges = () => ({});
let setFilterEquipSubRanges = () => ({});
const hasInvalidEquipValueRange = () => Object.keys(filterEquipSubEntry()).some(id => filterEquipSubEntry()[id] === "include" && !entry_range_inputs.isEntryFilterRangeValid(filterEquipSubRanges()[id]));
let filterHuntlootRarity = () => ({});
let setFilterHuntlootRarity = () => ({});
let filterHuntlootClass = () => ({});
let setFilterHuntlootClass = () => ({});
let filterHuntlootAdverb = () => ({});
let setFilterHuntlootAdverb = () => ({});
let filterHuntlootSpell = () => ({});
let setFilterHuntlootSpell = () => ({});
let filterClass = () => ({});
let setFilterClass = () => ({});
let filterSuit = () => ({});
let setFilterSuit = () => ({});
let filterMythText = () => "";
let setFilterMythText = () => "";
let resetFilter = () => 0;
let setResterFilter = () => 0;
const isItemTabLocked = tabName => false;
let player_heroes = () => ({});
let player_hero_equip_suit = () => ({});
let player_equipments = () => ({});
let player_gems = () => ({});
let player_huntloots = () => ({});
let player_hero_huntloot_suit = () => ({});
let equipmentCount = () => 0;
let gemCount = () => 0;
let huntlootCount = () => 0;
let devouredHuntlootID = () => undefined;
let setDevouredHuntlootID = () => undefined;
let huntlootDevourPreviewing = () => false;
let setHuntlootDevourPreviewing = () => false;
let player_props = () => ({});
let player_tokens = () => ({});
let equippedEquipment = () => undefined;
let playerAccountLevel = () => undefined;
function createEquipmentPageState() {
  [selectEquipSuitID, setSelectEquipSuitID] = libs.createSignal(1);
  [selectedItemID, setSelectedItemID] = libs.createSignal();
  [selectedSlot, setSelectedSlot] = libs.createSignal();
  [selectedItemTab, setSelectedItemTab] = libs.createSignal("equipment");
  [draggedSlot, setDraggedSlot] = libs.createSignal();
  [selectedItemList, setSelectedItemList] = libs.createSignal([]);
  [selectBreakSlot, setSelectBreakSlot] = libs.createSignal(-1);
  [breakListMode, setBreakListMode] = libs.createSignal(false);
  [selectedGemList, setSelectedGemList] = libs.createSignal([]);
  [hiddenItemList, setItemListIsHidden] = libs.createSignal(false);
  [forgeChildTab, setForgeChildTab] = libs.createSignal();
  [lockItemTab, setLockItemTab] = libs.createSignal(false);
  [showFilter, setShowFilter] = libs.createSignal(false);
  [showTokens, setShowTokens] = libs.createSignal([]);
  [devouredHuntlootID, setDevouredHuntlootID] = libs.createSignal();
  [huntlootDevourPreviewing, setHuntlootDevourPreviewing] = libs.createSignal(false);
  equipmentUnreadIds = solid_utils.createPlayerUnreadIds("equipment");
  gemUnreadIds = solid_utils.createPlayerUnreadIds("gem");
  [partFilter, setPartFilter] = libs.createSignal(0);
  [filterNeedLv, setFilterNeedLv] = libs.createSignal({});
  [filterRarity, setFilterRarity] = libs.createSignal({});
  [filterGemMainEntry, setFilterGemMainEntry] = libs.createSignal({});
  [filterGemClass, setFilterGemClass] = libs.createSignal({});
  [filterGemSubEntry, setFilterGemSubEntry] = libs.createSignal({});
  [filterGemChaosEntry, setFilterGemChaosEntry] = libs.createSignal({});
  [filterGemMainRanges, setFilterGemMainRanges] = libs.createSignal({});
  [filterGemSubRanges, setFilterGemSubRanges] = libs.createSignal({});
  [filterGemChaosAny, setFilterGemChaosAny] = libs.createSignal(false);
  [filteredGemIDs, setFilteredGemIDs] = libs.createSignal();
  [gemFilterRequesting, setGemFilterRequesting] = libs.createSignal(false);
  [filterEquipSubEntry, setFilterEquipSubEntry] = libs.createSignal({});
  [filterEquipSubRanges, setFilterEquipSubRanges] = libs.createSignal({});
  [filterHuntlootRarity, setFilterHuntlootRarity] = libs.createSignal({});
  [filterHuntlootClass, setFilterHuntlootClass] = libs.createSignal({});
  [filterHuntlootAdverb, setFilterHuntlootAdverb] = libs.createSignal({});
  [filterHuntlootSpell, setFilterHuntlootSpell] = libs.createSignal({});
  [filterClass, setFilterClass] = libs.createSignal({});
  [filterSuit, setFilterSuit] = libs.createSignal({});
  [filterMythText, setFilterMythText] = libs.createSignal("");
  [resetFilter, setResterFilter] = libs.createSignal(0);
  libs.createEffect(libs.on(menuName, () => {
    setSelectedItemList([]);
    setSelectedItemID();
    setSelectBreakSlot(-1);
    setBreakListMode(false);
    setSelectedGemList([]);
    setDevouredHuntlootID();
    setHuntlootDevourPreviewing(false);
    setItemListIsHidden(false);
    setLockItemTab(false);
    setSelectedItemTab("equipment");
    setForgeChildTab();
    if (menuName() == "EquipmentTab_equip") {
      setShowTokens([]);
    }
  }));
  libs.createEffect(libs.on(jumpInfo, info => {
    const itemTab = info?.data?.itemTab;
    if (itemTab === "equipment" || itemTab === "gem") {
      setSelectedItemTab(itemTab);
    }
  }));
  libs.createEffect(libs.on(secondTabName, () => {
    setSelectedItemID();
  }));
  libs.createEffect(libs.on(selectedItemTab, () => {
    setPartFilter(0);
  }));
  player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  player_hero_equip_suit = solid_utils.createServiceNetData("player_hero_equip_suits", {});
  player_equipments = equipment_utils.GetSimplifyEquipment();
  player_gems = equipment_utils.GetSimplifyGems();
  player_huntloots = huntloot_details.GetSimplifyHuntloots();
  player_hero_huntloot_suit = solid_utils.createServiceNetData("player_hero_huntloot_equip_suits", {});
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  equipmentCount = libs.createMemo(() => playerCounters()?.equipment_count?.count ?? 0);
  gemCount = libs.createMemo(() => playerCounters()?.gem_count?.count ?? 0);
  huntlootCount = libs.createMemo(() => Object.keys(player_huntloots()).length);
  solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  player_props = solid_utils.createServiceNetData("player_props", {});
  player_tokens = solid_utils.createServiceNetData("player_tokens", {});
  equippedEquipment = libs.createMemo(() => player_hero_equip_suit()?.[selectHeroID()]?.[selectEquipSuitID()]);
  playerAccountLevel = service_netdata_helper.usePlayerAccountLevel("hero_level");
  libs.onCleanup(() => {
    equipmentUnreadIds.submitReadCache();
    gemUnreadIds.submitReadCache();
  });
}
function EquipmentProvider(props) {
  const store = {
    selectHeroID: selectHeroID,
    selectEquipSuitID: [selectEquipSuitID, setSelectEquipSuitID],
    selectedItemID: [selectedItemID, setSelectedItemID],
    selectedSlot: [selectedSlot, setSelectedSlot],
    selectedItemTab: [selectedItemTab, setSelectedItemTab],
    selectedItemList: [selectedItemList, setSelectedItemList],
    selectBreakSlot: [selectBreakSlot, setSelectBreakSlot],
    breakListMode: [breakListMode, setBreakListMode],
    selectedGemList: [selectedGemList, setSelectedGemList],
    hiddenItemList: [hiddenItemList, setItemListIsHidden],
    lockItemTab: [lockItemTab, setLockItemTab],
    showTokens: [showTokens, setShowTokens],
    draggedSlot: [draggedSlot, setDraggedSlot],
    player_equipments,
    player_props,
    player_tokens
  };
  return libs.createComponent(equipment_comp.EquipmentContext.Provider, {
    value: store,
    get children() {
      return props.children;
    }
  });
}
function EquipmentContent() {
  libs.createEffect(() => {
    let heroId = selectHeroID();
    let heroData = player_heroes();
    libs.batch(() => {
      if (heroId) {
        setSelectEquipSuitID(heroData[heroId]?.equip_suit ?? 1);
      }
    });
  });
  let QueryEquipment = false;
  libs.createEffect(libs.on(show, show => {
    if (show) {
      if (QueryEquipment == false) {
        QueryEquipment = true;
        CallAction("/v1/equip/fetch_all", {
          only_equipped: false
        });
      }
    } else {
      equipmentUnreadIds.submitReadCache();
      gemUnreadIds.submitReadCache();
    }
  }));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "EquipmentRoot",
    name: "MenuButton_equipment",
    renderOnShow: true,
    get show() {
      return show();
    },
    get backgroundChildren() {
      return (() => {
        const _el$6 = libs.createElement("Panel", {
          id: "HudEquipBG",
          get ["class"]() {
            return menuName();
          }
        }, null);
        libs.setProp(_el$6, "onactivate", () => {
          if (menuName() == "EquipmentTab_equip") {
            libs.batch(() => {
              setSelectedSlot();
              setSelectedGemList([]);
              setSelectedItemID();
              setPartFilter(0);
              setForgeChildTab();
              setLockItemTab(false);
            });
          }
        });
        libs.effect(_$p => libs.setProp(_el$6, "class", menuName(), _$p));
        return _el$6;
      })();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(Player.CurrencyGroup, {
        currencyType: "top",
        get tokens() {
          return showTokens().map(token => typeof token === "number" ? token : token.itemID);
        },
        get values() {
          return showTokens().reduce((values, token) => {
            if (typeof token !== "number") values[token.itemID] = token.value;
            return values;
          }, {});
        }
      }), (() => {
        const _el$ = libs.createElement("Panel", {
            id: "ParticleRoot"
          }, null);
          libs.createElement("Image", {
            id: "SlotRootBG",
            hittest: false
          }, _el$);
          libs.createElement("DOTAParticleScenePanel", {
            id: "BGLight",
            particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
            cameraOrigin: "0 0 700",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$);
        libs.effect(_$p => libs.setProp(_el$, "visible", menuName() == "EquipmentTab_equip", _$p));
        return _el$;
      })(), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "EquipmentTab_part_levelup";
            },
            get children() {
              return libs.createComponent(EquipmentPartLevelUp, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "EquipmentTab_break";
            },
            get children() {
              return libs.createComponent(EquipBreak, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "EquipmentTab_forge2";
            },
            get children() {
              return libs.createComponent(EquipForge, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "EquipmentTab_key";
            },
            get children() {
              return libs.createComponent(libs.Switch, {
                get children() {
                  return [libs.createComponent(libs.Match, {
                    get when() {
                      return secondTabName() == "EquipmentTab_key_break";
                    },
                    get children() {
                      return libs.createComponent(EquipmentKeyBreak, {});
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return secondTabName() == "EquipmentTab_key_devour";
                    },
                    get children() {
                      return libs.createComponent(EquipmentKey, {});
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "EquipmentTab_drawing";
            },
            get children() {
              return libs.createComponent(libs.Switch, {
                get children() {
                  return [libs.createComponent(libs.Match, {
                    get when() {
                      return secondTabName() == "EquipmentTab_drawing_recast";
                    },
                    get children() {
                      return libs.createComponent(EquipmentDrawingRecast, {});
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return secondTabName() == "EquipmentTab_drawing_make";
                    },
                    get children() {
                      return libs.createComponent(EquipmentDrawingMake, {});
                    }
                  })];
                }
              });
            }
          })];
        }
      }), (() => {
        const _el$4 = libs.createElement("Panel", {
            id: "MainBlockContainer",
            hittest: false
          }, null),
          _el$5 = libs.createElement("Panel", {
            id: "MainCenterBlock",
            hittest: false
          }, _el$4);
        libs.insert(_el$5, libs.createComponent(EquipSlot, {}), null);
        libs.insert(_el$5, libs.createComponent(ItemsRoot, {}), null);
        return _el$4;
      })()];
    }
  });
}
function HudEquipment() {
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(EquipmentPage, {});
    }
  });
}
function EquipmentPage() {
  createEquipmentPageState();
  return libs.createComponent(EquipmentProvider, {
    get children() {
      return libs.createComponent(EquipmentContent, {});
    }
  });
}
function EquipEquipment(equipID, heroID, suitID, part) {
  const equipData = player_equipments()[equipID];
  if (equipID != 0 && equipData == undefined) {
    return;
  }
  const heroLv = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
  if (equipData && equipData.need_level > heroLv) {
    ErrorMessage("#EquipEquipmentLvTips");
    return;
  }
  CallAction("/v1/hero/equip_equipment", {
    equipment_id: equipID,
    hero_id: heroID,
    suit_id: suitID,
    part: part
  });
}
const CURRENT_SUIT_OPTIONS = [{
  type: "current",
  suitID: 1
}, {
  type: "current",
  suitID: 2
}, {
  type: "current",
  suitID: 3
}];
function CopyHeroSuitEquipment(sourceHeroID, sourceSuitID, targetHeroID, targetSuitID) {
  const sourceSuit = player_hero_equip_suit()?.[sourceHeroID]?.[sourceSuitID];
  for (const part of equipment_utils.EQUIP_PARTS) {
    const equipID = sourceSuit?.[part] ?? 0;
    EquipEquipment(equipID, targetHeroID, targetSuitID, part);
  }
}
function LockEquipment(id, lock) {
  CallAction("/v1/equip/lock", {
    id: id,
    lock: lock
  });
}
function LockGem(id, lock) {
  CallAction("/v1/gem/lock", {
    gem_id: id,
    lock: lock
  });
}
function LockHuntloot(id, lock) {
  if (player_huntloots()[id]?.in_check) {
    ErrorMessage("#EquipmentError_InCheck");
    return;
  }
  CallAction("/v1/huntloot/lock", {
    id: id,
    lock: lock
  });
}
function EquipHuntloot(huntlootID, heroID, suitID, part) {
  const huntlootData = player_huntloots()[huntlootID];
  const equippedID = player_hero_huntloot_suit()[heroID]?.[suitID]?.[part];
  if (huntlootData?.in_check || player_huntloots()[equippedID]?.in_check) {
    ErrorMessage("#EquipmentError_InCheck");
    return;
  }
  if (huntlootID != 0 && huntlootData == undefined) {
    return;
  }
  const heroLv = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
  if (huntlootData && huntlootData.need_level > heroLv) {
    ErrorMessage("#EquipEquipmentLvTips");
    return;
  }
  CallAction("/v1/hero/equip_huntloot", {
    huntloot_id: huntlootID,
    hero_id: heroID,
    suit_id: suitID,
    part: part
  });
}
function EquipSlot() {
  const showEquipSlot = () => {
    return SHOW_EQUIPED_MENU[menuName()];
  };
  const activeGemSuits = libs.createMemo(() => {
    const heroID = selectHeroID();
    const activeSuitID = player_heroes()[heroID]?.equip_suit;
    const equipped = player_hero_equip_suit()[heroID]?.[activeSuitID];
    if (!equipped) return [];
    const levels = {};
    const equipments = player_equipments();
    for (const part of equipment_utils.EQUIP_PARTS) {
      const equipment = equipments[equipped[part]];
      if (!equipment?.inlay_gems_data) continue;
      const gems = JSON.parseSafe(equipment.inlay_gems_data);
      if (!Array.isArray(gems)) continue;
      for (const gem of gems) {
        const rawEntries = gem?.chaos_entry_data;
        const entries = typeof rawEntries === "string" ? JSON.parseSafe(rawEntries) : rawEntries;
        if (!Array.isArray(entries)) continue;
        for (const entry of entries) {
          if (!entry?.id) continue;
          const config = KeyValues.gem_entry_suit[entry.id];
          if (!config?.suit_icon) continue;
          const entryLevel = Math.floor(toFiniteNumber(entry.value));
          if (entryLevel <= 0) continue;
          const suit = levels[config.suit_icon] ??= {
            icon: config.suit_icon,
            level: 0,
            order: config.id,
            effects: {}
          };
          suit.level += entryLevel;
          suit.order = Math.min(suit.order, config.id);
          suit.effects[entry.id] = (suit.effects[entry.id] ?? 0) + entryLevel;
        }
      }
    }
    return Object.values(levels).sort((a, b) => a.order - b.order);
  });
  const showGemSuitTooltip = (panel, suit) => {
    ShowCustomTooltip(panel, "gem_suit", {
      icon: suit.icon,
      effects: JSON.stringify(Object.entries(suit.effects).map(([id, level]) => ({
        id,
        level
      })))
    });
  };
  const equipmentPartDatas = solid_utils.createServiceNetData("player_equipment_part_datas", {});
  const huntlootPartDatas = solid_utils.createServiceNetData("player_huntloot_part_datas", {});
  const gameState = solid_utils.createNetDataSignal("common", "game_state", {
    state: "GameState_Prepare",
    start_time: -1,
    end_time: -1
  });
  const isBattleState = () => gameState().state === "GameState_Dungeon";
  const [suitDropDownData, setSuitDropDownData] = libs.createSignal({
    key: "",
    options: CURRENT_SUIT_OPTIONS
  });
  libs.createEffect(() => {
    const currentHeroID = selectHeroID();
    const heroes = player_heroes();
    const suitData = player_hero_equip_suit();
    const copyOptions = [];
    for (const [heroIDText, heroInfo] of Object.entries(heroes)) {
      const heroID = Number(heroIDText);
      if (!heroID || heroID === currentHeroID) {
        continue;
      }
      const suitList = suitData[heroID];
      if (!suitList) {
        continue;
      }
      const heroToken = GetHeroNameByHeroID(heroInfo?.hero_id ?? heroID);
      const heroName = heroToken ? GetLocalization("#" + heroToken) : String(heroID);
      for (const suitID of [1, 2, 3]) {
        const suit = suitList[suitID];
        if (!suit || !equipment_utils.EQUIP_PARTS.some(part => (suit[part] ?? 0) !== 0)) {
          continue;
        }
        copyOptions.push({
          type: "copy",
          heroID,
          suitID,
          label: `${heroName}|${GetLocalization("#EquipmentSuit")}${suitID}`
        });
      }
    }
    const key = `${currentHeroID}|${copyOptions.map(option => `${option.heroID}:${option.suitID}`).join(";")}`;
    if (key !== libs.untrack(() => suitDropDownData().key)) {
      setSuitDropDownData({
        key,
        options: [...CURRENT_SUIT_OPTIONS, ...copyOptions]
      });
    }
  });
  const [showOverviewAttr, setShowOverviewAttr] = libs.createSignal(false);
  const [showGemSuitBook, setShowGemSuitBook] = libs.createSignal(false);
  const SlotItem = props => {
    const slotLevel = () => equipmentPartDatas()[props.part]?.level ?? 0;
    const equipID = () => {
      const heroID = selectHeroID();
      if (!heroID) return;
      const suit = player_hero_equip_suit()[heroID]?.[selectEquipSuitID()];
      if (!suit) return;
      const equipID = suit[props.part];
      if (equipID != 0) {
        return equipID;
      }
    };
    const equipData = () => {
      const id = equipID();
      if (!id) return;
      return player_equipments()[id];
    };
    return (() => {
      const _el$7 = libs.createElement("Panel", {
          get id() {
            return "EquipSlot_" + props.part;
          },
          get ["class"]() {
            return libs.classNames("EquipSlot", {
              "Selected": selectedSlot() == props.part,
              Shine: draggedSlot() == props.part
            });
          }
        }, null),
        _el$8 = libs.createElement("Panel", {
          "class": "SlotIcon"
        }, _el$7),
        _el$9 = libs.createElement("Panel", {
          "class": "SelectedBorder"
        }, _el$8),
        _el$0 = libs.createElement("Label", {
          "class": "SlotLevel",
          hittest: false,
          get text() {
            return LocalizeWithVars("#Equipment_PartLevel_SlotLevel", {
              level: slotLevel()
            });
          }
        }, _el$7);
      libs.setProp(_el$7, "onmouseover", p => {
        if (equipID()) {
          equipment_utils.ShowServerEquipTooltip(p, {
            id1: equipID(),
            hero_id: selectHeroID()
          });
        }
      });
      libs.setProp(_el$7, "onmouseout", p => HideCustomTooltip(p, "server_equip"));
      libs.setProp(_el$7, "oncontextmenu", () => {
        if (!equipData()) {
          return;
        }
        EquipEquipment(0, selectHeroID(), selectEquipSuitID(), props.part);
      });
      libs.setProp(_el$7, "onactivate", () => {
        setSelectedItemTab("equipment");
        libs.batch(() => {
          setShowFilter(false);
          setSelectedSlot(prev => prev === props.part ? undefined : props.part);
          setPartFilter(props.part);
        });
      });
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return equipData();
        },
        get fallback() {
          return (() => {
            const _el$1 = libs.createElement("Image", {
              id: "EmptySlot",
              get src() {
                return getSrcPath(`conv/icon/${EQUIP_PART_ICON[props.part]}`);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$1, "src", getSrcPath(`conv/icon/${EQUIP_PART_ICON[props.part]}`), _$p));
            return _el$1;
          })();
        },
        get children() {
          return libs.createComponent(server_equipment.Equipment, libs.mergeProps$1(() => equipData()));
        }
      }), _el$9);
      libs.effect(_p$ => {
        const _v$ = "EquipSlot_" + props.part,
          _v$2 = libs.classNames("EquipSlot", {
            "Selected": selectedSlot() == props.part,
            Shine: draggedSlot() == props.part
          }),
          _v$3 = LocalizeWithVars("#Equipment_PartLevel_SlotLevel", {
            level: slotLevel()
          });
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$7, "id", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "class", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$0, "text", _v$3, _p$._v$3));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined
      });
      return _el$7;
    })();
  };
  const HuntlootSlotItem = props => {
    const dragSlot = () => HUNTLOOT_DRAG_SLOT_BASE + props.part;
    const slotLevel = () => huntlootPartDatas()[props.part]?.level ?? 0;
    const huntlootID = () => {
      const heroID = selectHeroID();
      if (!heroID) return;
      const suit = player_hero_huntloot_suit()[heroID]?.[selectEquipSuitID()];
      if (!suit) return;
      const id = suit[props.part];
      if (id != 0 && id != "nil") {
        return id;
      }
    };
    const huntlootData = () => {
      const id = huntlootID();
      if (!id) return;
      return player_huntloots()[id];
    };
    return (() => {
      const _el$10 = libs.createElement("Panel", {
          get id() {
            return "HuntlootSlot_" + props.part;
          },
          get ["class"]() {
            return libs.classNames("EquipSlot HuntlootSlot", {
              "Selected": selectedSlot() == dragSlot(),
              Shine: draggedSlot() == dragSlot()
            });
          }
        }, null),
        _el$11 = libs.createElement("Panel", {
          "class": "SlotIcon"
        }, _el$10),
        _el$12 = libs.createElement("Panel", {
          "class": "SelectedBorder"
        }, _el$11),
        _el$13 = libs.createElement("Label", {
          "class": "SlotLevel",
          hittest: false,
          get text() {
            return LocalizeWithVars("#Equipment_PartLevel_SlotLevel", {
              level: slotLevel()
            });
          }
        }, _el$10);
      libs.setProp(_el$10, "onmouseover", p => {
        if (huntlootID()) {
          huntloot_details.ShowServerHuntlootTooltip(p, {
            id1: huntlootID(),
            hero_id: selectHeroID()
          });
        }
      });
      libs.setProp(_el$10, "onmouseout", p => HideCustomTooltip(p, "server_huntloot"));
      libs.setProp(_el$10, "oncontextmenu", () => {
        if (!huntlootData()) {
          return;
        }
        EquipHuntloot(0, selectHeroID(), selectEquipSuitID(), props.part);
      });
      libs.setProp(_el$10, "onactivate", () => {
        setSelectedItemTab("huntloot");
        libs.batch(() => {
          setShowFilter(false);
          setSelectedSlot(prev => prev === dragSlot() ? undefined : dragSlot());
          setPartFilter(props.part);
        });
      });
      libs.insert(_el$11, libs.createComponent(libs.Show, {
        get when() {
          return huntlootData();
        },
        get fallback() {
          return (() => {
            const _el$14 = libs.createElement("Image", {
              id: "EmptySlot",
              get src() {
                return getSrcPath(`conv/icon/${HUNTLOOT_SLOT_ICON[props.part]}`);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$14, "src", getSrcPath(`conv/icon/${HUNTLOOT_SLOT_ICON[props.part]}`), _$p));
            return _el$14;
          })();
        },
        get children() {
          return libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(() => huntlootData()));
        }
      }), _el$12);
      libs.effect(_p$ => {
        const _v$4 = "HuntlootSlot_" + props.part,
          _v$5 = libs.classNames("EquipSlot HuntlootSlot", {
            "Selected": selectedSlot() == dragSlot(),
            Shine: draggedSlot() == dragSlot()
          }),
          _v$6 = LocalizeWithVars("#Equipment_PartLevel_SlotLevel", {
            level: slotLevel()
          });
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$10, "id", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "class", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$13, "text", _v$6, _p$._v$6));
        return _p$;
      }, {
        _v$4: undefined,
        _v$5: undefined,
        _v$6: undefined
      });
      return _el$10;
    })();
  };
  return (() => {
    const _el$15 = libs.createElement("Panel", {
        id: "EquipSlotRoot",
        get ["class"]() {
          return libs.classNames("RootWindow", {
            Hidden: !showEquipSlot()
          });
        },
        hittest: false
      }, null),
      _el$16 = libs.createElement("Panel", {
        id: "GemSuit"
      }, _el$15),
      _el$18 = libs.createElement("Label", {
        id: "GemSuitTitle",
        get text() {
          return GetLocalization("#Equipment_GemSuit_Title");
        }
      }, _el$16),
      _el$19 = libs.createElement("Panel", {
        id: "GemSuitList"
      }, _el$16),
      _el$20 = libs.createElement("Panel", {
        id: "SlotContainer",
        hittest: false
      }, _el$15);
      libs.createElement("Image", {
        id: "SlotRootBG",
        hittest: false
      }, _el$20);
      const _el$22 = libs.createElement("Panel", {
        id: "Slots",
        get ["class"]() {
          return libs.classNames({
            Z: draggedSlot() != undefined
          });
        },
        get hittest() {
          return draggedSlot() == undefined;
        },
        get hittestchildren() {
          return draggedSlot() == undefined;
        }
      }, _el$20),
      _el$23 = libs.createElement("Panel", {
        flowChildren: "down"
      }, _el$22),
      _el$24 = libs.createElement("Panel", {
        horizontalAlign: "right",
        flowChildren: "down"
      }, _el$22),
      _el$27 = libs.createElement("Panel", {
        id: "HuntlootSlotList"
      }, _el$20),
      _el$28 = libs.createElement("Panel", {
        "class": "HuntlootSlotContainer"
      }, _el$27),
      _el$29 = libs.createElement("Panel", {
        id: "BottomParticleRoot"
      }, _el$20);
      libs.createElement("DOTAParticleScenePanel", {
        id: "BottomParticle",
        particleName: "particles/ui/game/ui_game_general_special_effects_05_fx.vpcf",
        cameraOrigin: "0 0 800",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$29);
      const _el$31 = libs.createElement("Panel", {
        id: "EquipmentDropPanel"
      }, _el$20);
      libs.createElement("Label", {
        text: "#Hud_Equipment_Drag_Here"
      }, _el$31);
      const _el$33 = libs.createElement("Panel", {
        id: "AttributesSummaryContainer",
        get ["class"]() {
          return libs.classNames({
            Show: showOverviewAttr() && draggedSlot() == undefined
          });
        }
      }, _el$20);
    libs.insert(_el$15, libs.createComponent(solid_utils.DynamicKey, {
      key: () => suitDropDownData().key,
      children: () => libs.createComponent(EOM_DropDown.EOM_DropDown, {
        id: "SuitDropDown",
        type: "EquipmentDropDown",
        menuPosition: "bottom",
        get index() {
          return selectEquipSuitID() - 1;
        },
        onSelect: index => {
          const option = suitDropDownData().options[index];
          if (option?.type !== "copy") {
            return true;
          }
          const heroID = selectHeroID();
          if (!heroID) {
            return false;
          }
          CopyHeroSuitEquipment(option.heroID, option.suitID, heroID, selectEquipSuitID());
          return false;
        },
        onChange: (index, item) => {
          const option = suitDropDownData().options[index];
          if (option?.type !== "current") {
            return;
          }
          const suitID = option.suitID;
          const heroID = selectHeroID();
          setSelectEquipSuitID(suitID);
          if (heroID) {
            CallAction("/v1/hero/change_equip_suit", {
              hero_id: heroID,
              suit_id: suitID
            });
          }
        },
        get children() {
          return libs.createComponent(libs.For, {
            get each() {
              return suitDropDownData().options;
            },
            children: option => {
              if (option.type === "current") {
                return (() => {
                  const _el$34 = libs.createElement("Label", {
                    get vars() {
                      return {
                        value: option.suitID
                      };
                    },
                    text: "#EquipmentSuitType"
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$34, "vars", {
                    value: option.suitID
                  }, _$p));
                  return _el$34;
                })();
              }
              return (() => {
                const _el$35 = libs.createElement("Label", {
                  get text() {
                    return option.label;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$35, "text", option.label, _$p));
                return _el$35;
              })();
            }
          });
        }
      })
    }), _el$16);
    libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "OverviewAttributeBtn",
      get ["class"]() {
        return libs.classNames({
          ShowBtnBorder: showOverviewAttr()
        });
      },
      onactivate: () => {
        setShowOverviewAttr(prev => !prev);
        setShowGemSuitBook(false);
      }
    }), _el$16);
    libs.insert(_el$16, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "GemSuitBook",
      onactivate: () => {
        setShowGemSuitBook(prev => !prev);
        setShowOverviewAttr(false);
      },
      get children() {
        const _el$17 = libs.createElement("Label", {
          get text() {
            return GetLocalization("#Equipment_GemBook");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$17, "text", GetLocalization("#Equipment_GemBook"), _$p));
        return _el$17;
      }
    }), _el$18);
    libs.insert(_el$19, libs.createComponent(libs.For, {
      get each() {
        return activeGemSuits();
      },
      children: suit => (() => {
        const _el$36 = libs.createElement("Panel", {
            "class": "GemSuitItem",
            hittestchildren: false
          }, null),
          _el$37 = libs.createElement("Label", {
            "class": "GemSuitLevel",
            get text() {
              return LocalizeWithVars("#Equipment_GemSuit_Level", {
                level: suit.level
              });
            }
          }, _el$36);
        libs.setProp(_el$36, "onmouseover", panel => showGemSuitTooltip(panel, suit));
        libs.setProp(_el$36, "onmouseout", panel => HideCustomTooltip(panel, "gem_suit"));
        libs.insert(_el$36, libs.createComponent(server_equipment.SuitIcon, {
          get suitName() {
            return suit.icon;
          }
        }), _el$37);
        libs.effect(_$p => libs.setProp(_el$37, "text", LocalizeWithVars("#Equipment_GemSuit_Level", {
          level: suit.level
        }), _$p));
        return _el$36;
      })()
    }));
    libs.setProp(_el$23, "flowChildren", "down");
    libs.insert(_el$23, libs.createComponent(libs.For, {
      each: [1, 7, 5, 3],
      children: part => {
        return libs.createComponent(SlotItem, {
          part: part
        });
      }
    }));
    libs.setProp(_el$24, "horizontalAlign", "right");
    libs.setProp(_el$24, "flowChildren", "down");
    libs.insert(_el$24, libs.createComponent(libs.For, {
      each: [2, 8, 6, 4],
      children: part => {
        return libs.createComponent(SlotItem, {
          part: part
        });
      }
    }));
    libs.insert(_el$20, libs.createComponent(libs.Show, {
      get when() {
        return isBattleState();
      },
      get children() {
        const _el$25 = libs.createElement("Panel", {
            id: "BattleTips"
          }, null);
          libs.createElement("Label", {
            text: "#Equipment_BattleTips"
          }, _el$25);
        return _el$25;
      }
    }), _el$27);
    libs.insert(_el$20, libs.createComponent(solid_utils.DynamicKey, {
      key: previewHeroName,
      children: hero => libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
        id: "FullBodyPreview",
        unit: hero,
        hittest: false,
        hittestchildren: false
      })
    }), _el$27);
    libs.insert(_el$28, libs.createComponent(libs.For, {
      each: huntloot_details.HUNTLOOT_PARTS,
      children: part => {
        return libs.createComponent(HuntlootSlotItem, {
          part: part
        });
      }
    }));
    libs.insert(_el$20, libs.createComponent(hero_selection_bar.HeroSelectionBar, {
      get selecteHeroName() {
        return previewHeroName();
      },
      onchange: (heroName, heroID) => {
        setPreviewHeroName(heroName);
      }
    }), _el$31);
    libs.setProp(_el$31, "onDragEnter", (pPanel, draggedPanel) => {
      if (LoadData(draggedPanel, "equip") || LoadData(draggedPanel, "huntloot")) {
        pPanel.AddClass("potential_drop_target");
      }
    });
    libs.setProp(_el$31, "onDragLeave", (pPanel, draggedPanel) => {
      pPanel.RemoveClass("potential_drop_target");
    });
    libs.setProp(_el$31, "onDragDrop", (panel, draggedPanel) => {
      if (!selectHeroID()) return;
      let equip = LoadData(draggedPanel, "equip");
      if (equip && draggedSlot() != undefined && draggedSlot() < HUNTLOOT_DRAG_SLOT_BASE) {
        EquipEquipment(equip, selectHeroID(), selectEquipSuitID(), draggedSlot());
        return;
      }
      let huntloot = LoadData(draggedPanel, "huntloot");
      if (huntloot && draggedSlot() != undefined && draggedSlot() >= HUNTLOOT_DRAG_SLOT_BASE) {
        EquipHuntloot(huntloot, selectHeroID(), selectEquipSuitID(), draggedSlot() - HUNTLOOT_DRAG_SLOT_BASE);
      }
    });
    libs.insert(_el$20, libs.createComponent(hero_level_main.HeroLevelMain, {
      get level() {
        return playerAccountLevel().level;
      },
      get extraExp() {
        return playerAccountLevel().extra_exp;
      },
      get title() {
        return "#" + previewHeroName();
      },
      tooltip: "#Equipment_TextTips_HeroLv"
    }), _el$33);
    libs.insert(_el$33, libs.createComponent(AttributesSummary, {}));
    libs.insert(_el$20, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!showGemSuitBook())() && draggedSlot() == undefined;
      },
      get children() {
        return libs.createComponent(EOM_Popup.EOM_Popup, {
          id: "GemSuitBook",
          popType: "PopupType_PopOut",
          classList: {
            EOM_PopupMainShow: true
          },
          get title() {
            return GetLocalization("#Equipment_GemBook");
          },
          onClose: () => setShowGemSuitBook(false),
          get children() {
            return libs.createComponent(GemSuitBook, {});
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$7 = libs.classNames("RootWindow", {
          Hidden: !showEquipSlot()
        }),
        _v$8 = {
          NoEffects: activeGemSuits().length === 0
        },
        _v$9 = GetLocalization("#Equipment_GemSuit_Title"),
        _v$0 = libs.classNames({
          Z: draggedSlot() != undefined
        }),
        _v$1 = draggedSlot() == undefined,
        _v$10 = draggedSlot() == undefined,
        _v$11 = draggedSlot() != undefined,
        _v$12 = libs.classNames({
          Show: showOverviewAttr() && draggedSlot() == undefined
        });
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$15, "class", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$16, "classList", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$18, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$22, "class", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$22, "hittest", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$22, "hittestchildren", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$31, "visible", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$33, "class", _v$12, _p$._v$12));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined
    });
    return _el$15;
  })();
}
const GEM_SUIT_TYPE_ORDER = [1, 2, 3, 4, 0];
const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function GetGemSuitGrowthSegments(valueData, startLevel, limitLevel) {
  const growthList = String(valueData.extra_level_growth).split(" ").map(value => toFiniteNumber(value, 0));
  const segments = [];
  if (growthList.length == 0) return segments;
  for (let level = startLevel + 1; level <= limitLevel; level++) {
    const growthIndex = Math.min(growthList.length - 1, Math.floor((level - 1) / 10));
    const growth = growthList[growthIndex];
    const previous = segments[segments.length - 1];
    if (previous && previous.growth == growth && previous.endLevel == level - 1) {
      previous.endLevel = level;
    } else {
      segments.push({
        startLevel: level,
        endLevel: level,
        growth
      });
    }
  }
  return segments;
}
function GetGemSuitBookDesc(privilege, startLevel, limitLevel) {
  const privilegeData = KeyValues.privilege[privilege];
  if (!privilegeData) return "";
  if (limitLevel <= startLevel) return GetPrivilegeDesc(privilege, startLevel);
  const abilityValues = privilegeData.AbilityValues ?? {};
  let description = GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, "");
  for (const [valueName, valueData] of Object.entries(abilityValues)) {
    if (valueData == null || typeof valueData != "object" || valueData.extra_level_growth == undefined) continue;
    const baseValue = GetAbilityExtraLevelGrowthValue(valueData, startLevel);
    const growthSegments = GetGemSuitGrowthSegments(valueData, startLevel, limitLevel);
    if (baseValue == undefined || growthSegments.length == 0) continue;
    const replaceGrowthToken = hasPct => {
      const token = `%${valueName}%${hasPct ? "%" : ""}`;
      if (!description.includes(token)) return;
      const pattern = new RegExp(`([：:]?)([+-]?)${escapeRegExp(token)}`, "g");
      description = description.replace(pattern, (_match, separator, sign) => {
        const pctSymbol = hasPct ? "%" : "";
        const segmentText = growthSegments.map(segment => {
          const growthSign = segment.growth >= 0 ? "+" : "";
          return LocalizeWithVars("#Equipment_GemSuit_GrowthSegment", {
            start: segment.startLevel,
            end: segment.endLevel,
            value: `${growthSign}${segment.growth}${pctSymbol}`
          });
        }).join("；");
        const growthText = LocalizeWithVars("#Equipment_GemSuit_Growth", {
          value: segmentText
        });
        return `${separator}<span class='GemSuitBaseValue'>${sign}${baseValue}${pctSymbol}</span>` + `<span class='GemSuitGrowthDetail'>${growthText}</span>`;
      });
    };
    replaceGrowthToken(true);
    replaceGrowthToken(false);
  }
  return getKeyValueDescription(description, abilityValues, {
    level: startLevel,
    onlyShowNowLevel: true
  });
}
function GemSuitBook() {
  const [expandedEntry, setExpandedEntry] = libs.createSignal();
  const suitTypeGroups = libs.createMemo(() => {
    const groups = {};
    for (const config of Object.values(KeyValues.gem_entry_suit)) {
      (groups[config.suit_type] ??= []).push(config);
    }
    return GEM_SUIT_TYPE_ORDER.map(suit_type => ({
      suit_type,
      entries: (groups[suit_type] ?? []).sort((a, b) => a.id - b.id)
    })).filter(group => group.entries.length > 0);
  });
  const getEntryLevel = config => Math.max(1, Math.floor(toFiniteNumber(config.base_suit, 1)));
  const getEntryLimit = config => Math.floor(toFiniteNumber(config.entry_limit));
  const hasEntryGrowth = config => {
    const abilityValues = KeyValues.privilege[config.entry_id]?.AbilityValues ?? {};
    return Object.values(abilityValues).some(valueData => {
      return valueData != null && typeof valueData == "object" && valueData.extra_level_growth != undefined;
    });
  };
  const getPreviewLevels = config => {
    const startLevel = getEntryLevel(config);
    const limitLevel = getEntryLimit(config);
    const levels = [];
    for (let level = 10; level <= limitLevel; level += 10) {
      if (level > startLevel) levels.push(level);
    }
    if (limitLevel > startLevel && limitLevel % 10 != 0) levels.push(limitLevel);
    return levels;
  };
  const getUnlockText = config => {
    return (config.suit_unlock ?? "").split("|").map(segment => {
      const [type, level] = segment.split(":");
      const suitType = Number(type);
      const suitLevel = Math.floor(Number(level));
      if (!suitType || !(suitLevel > 0)) return "";
      return GetLocalization(`#Equipment_GemSuit_Type_${suitType}`) + LocalizeWithVars("#Equipment_GemSuit_Level", {
        level: suitLevel
      });
    }).filter(text => text).join(" & ");
  };
  return (() => {
    const _el$38 = libs.createElement("Panel", {
      id: "GemSuitBookList",
      "class": "VerticalScrollStyle"
    }, null);
    libs.insert(_el$38, libs.createComponent(libs.For, {
      get each() {
        return suitTypeGroups();
      },
      children: group => (() => {
        const _el$39 = libs.createElement("Panel", {
            "class": "GemSuitTypeGroup"
          }, null),
          _el$40 = libs.createElement("Panel", {
            "class": "GemSuitTypeHeader"
          }, _el$39),
          _el$42 = libs.createElement("Label", {
            "class": "GemSuitTypeName",
            get text() {
              return GetLocalization(`#Equipment_GemSuit_Type_${group.suit_type}`);
            }
          }, _el$40);
        libs.insert(_el$40, libs.createComponent(libs.Show, {
          get when() {
            return group.suit_type != 0;
          },
          get children() {
            const _el$41 = libs.createElement("Image", {
              "class": "GemSuitTypeIcon",
              get src() {
                return getSrcPath(`suit_icons/gem_suit_${group.suit_type}.png`);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$41, "src", getSrcPath(`suit_icons/gem_suit_${group.suit_type}.png`), _$p));
            return _el$41;
          }
        }), _el$42);
        libs.insert(_el$39, libs.createComponent(libs.For, {
          get each() {
            return group.entries;
          },
          children: config => (() => {
            const _el$43 = libs.createElement("Panel", {
                "class": "GemSuitBookEntry"
              }, null),
              _el$44 = libs.createElement("Panel", {
                "class": "EntryInfo"
              }, _el$43),
              _el$45 = libs.createElement("Panel", {
                "class": "EntryTitleRoot"
              }, _el$44),
              _el$46 = libs.createElement("Label", {
                "class": "EntryName",
                get text() {
                  return GetLocalization(`#${config.entry_id}`, config.name);
                }
              }, _el$45),
              _el$51 = libs.createElement("Label", {
                "class": "EntryDesc",
                html: true,
                get text() {
                  return GetGemSuitBookDesc(config.entry_id, getEntryLevel(config), getEntryLimit(config));
                }
              }, _el$44);
            libs.insert(_el$45, libs.createComponent(libs.Show, {
              get when() {
                return config.suit_type != 0;
              },
              get fallback() {
                return (() => {
                  const _el$53 = libs.createElement("Label", {
                    "class": "EntryUnlock",
                    get text() {
                      return LocalizeWithVars("#Equipment_GemSuit_Unlock", {
                        value: getUnlockText(config)
                      });
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$53, "text", LocalizeWithVars("#Equipment_GemSuit_Unlock", {
                    value: getUnlockText(config)
                  }), _$p));
                  return _el$53;
                })();
              },
              get children() {
                const _el$47 = libs.createElement("Label", {
                  "class": "EntryLevel",
                  get text() {
                    return LocalizeWithVars("#Equipment_GemSuit_Level", {
                      level: getEntryLevel(config)
                    });
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$47, "text", LocalizeWithVars("#Equipment_GemSuit_Level", {
                  level: getEntryLevel(config)
                }), _$p));
                return _el$47;
              }
            }), null);
            libs.insert(_el$45, libs.createComponent(libs.Show, {
              get when() {
                return getEntryLimit(config) > 0;
              },
              get children() {
                const _el$48 = libs.createElement("Label", {
                  "class": "EntryLimit",
                  get text() {
                    return LocalizeWithVars("#Equipment_GemSuit_Limit", {
                      limit: getEntryLimit(config)
                    });
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$48, "text", LocalizeWithVars("#Equipment_GemSuit_Limit", {
                  limit: getEntryLimit(config)
                }), _$p));
                return _el$48;
              }
            }), null);
            libs.insert(_el$45, libs.createComponent(libs.Show, {
              get when() {
                return libs.memo(() => !!hasEntryGrowth(config))() && getPreviewLevels(config).length > 0;
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  "class": "EntryGrowthToggle",
                  get classList() {
                    return {
                      Expanded: expandedEntry() == config.entry_id
                    };
                  },
                  onactivate: () => setExpandedEntry(current => current == config.entry_id ? undefined : config.entry_id),
                  get children() {
                    return [(() => {
                      const _el$49 = libs.createElement("Label", {
                        get text() {
                          return GetLocalization(expandedEntry() == config.entry_id ? "#Equipment_GemSuit_LevelPreviewCollapse" : "#Equipment_GemSuit_LevelPreview");
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$49, "text", GetLocalization(expandedEntry() == config.entry_id ? "#Equipment_GemSuit_LevelPreviewCollapse" : "#Equipment_GemSuit_LevelPreview"), _$p));
                      return _el$49;
                    })(), (() => {
                      const _el$50 = libs.createElement("Label", {
                        "class": "EntryGrowthToggleArrow",
                        get text() {
                          return expandedEntry() == config.entry_id ? "▲" : "▼";
                        }
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$50, "text", expandedEntry() == config.entry_id ? "▲" : "▼", _$p));
                      return _el$50;
                    })()];
                  }
                });
              }
            }), null);
            libs.insert(_el$44, libs.createComponent(libs.Show, {
              get when() {
                return expandedEntry() == config.entry_id;
              },
              get children() {
                const _el$52 = libs.createElement("Panel", {
                  "class": "EntryGrowthPreview"
                }, null);
                libs.insert(_el$52, libs.createComponent(libs.For, {
                  get each() {
                    return getPreviewLevels(config);
                  },
                  children: level => (() => {
                    const _el$54 = libs.createElement("Panel", {
                        "class": "EntryGrowthPreviewRow"
                      }, null),
                      _el$55 = libs.createElement("Label", {
                        "class": "EntryGrowthPreviewLevel",
                        get text() {
                          return LocalizeWithVars("#Equipment_GemSuit_Level", {
                            level
                          });
                        }
                      }, _el$54),
                      _el$56 = libs.createElement("Label", {
                        "class": "EntryGrowthPreviewDesc",
                        html: true,
                        get text() {
                          return GetPrivilegeDesc(config.entry_id, level);
                        }
                      }, _el$54);
                    libs.effect(_p$ => {
                      const _v$15 = LocalizeWithVars("#Equipment_GemSuit_Level", {
                          level
                        }),
                        _v$16 = GetPrivilegeDesc(config.entry_id, level);
                      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$55, "text", _v$15, _p$._v$15));
                      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$56, "text", _v$16, _p$._v$16));
                      return _p$;
                    }, {
                      _v$15: undefined,
                      _v$16: undefined
                    });
                    return _el$54;
                  })()
                }));
                return _el$52;
              }
            }), null);
            libs.effect(_p$ => {
              const _v$13 = GetLocalization(`#${config.entry_id}`, config.name),
                _v$14 = GetGemSuitBookDesc(config.entry_id, getEntryLevel(config), getEntryLimit(config));
              _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$46, "text", _v$13, _p$._v$13));
              _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$51, "text", _v$14, _p$._v$14));
              return _p$;
            }, {
              _v$13: undefined,
              _v$14: undefined
            });
            return _el$43;
          })()
        }), null);
        libs.effect(_$p => libs.setProp(_el$42, "text", GetLocalization(`#Equipment_GemSuit_Type_${group.suit_type}`), _$p));
        return _el$39;
      })()
    }));
    return _el$38;
  })();
}
function AttributesSummary() {
  const debugSnapshots = new Map();
  const logHuntlootSummary = (stage, data) => {
    const snapshot = JSON.stringify(data);
    if (debugSnapshots.get(stage) === snapshot) return;
    debugSnapshots.set(stage, snapshot);
    console.log(`[HuntlootSummary] equipment.${stage}: ${snapshot}`);
  };
  logHuntlootSummary("init", {});
  const huntlootPartLevels = solid_utils.createServiceNetData("player_huntloot_part_datas", {});
  const [huntlootDetails, setHuntlootDetails] = libs.createSignal([]);
  const huntlootRevision = libs.createMemo(() => {
    const heroID = selectHeroID();
    const suitID = selectEquipSuitID();
    const parts = player_hero_huntloot_suit()[heroID]?.[suitID] ?? {};
    const ids = [...new Set(huntloot_details.HUNTLOOT_PARTS.map(part => toFiniteNumber(parts[part], 0)).filter(id => id > 0))];
    const instances = ids.map(id => player_huntloots()[id]);
    logHuntlootSummary("selection", {
      heroID,
      suitID,
      parts,
      ids,
      instances
    });
    return JSON.stringify({
      heroID,
      suitID,
      ids,
      instances
    });
  });
  libs.createEffect(libs.on(huntlootRevision, revision => {
    const {
      ids
    } = JSON.parse(revision);
    setHuntlootDetails([]);
    if (ids.length === 0) return;
    let active = true;
    logHuntlootSummary("request", {
      ids
    });
    const request = huntloot_details.GetHuntlootDetail(ids, data => {
      logHuntlootSummary("response", {
        active,
        data
      });
      if (active) setHuntlootDetails(ids.map(id => data[id]).filter(item => item !== undefined));
    }, true, logHuntlootSummary);
    libs.onCleanup(() => {
      active = false;
      if (request) CancelRequest(request);
    });
  }));
  const huntlootAttributes = libs.createMemo(() => {
    const bonuses = {};
    for (const part of huntloot_details.HUNTLOOT_PARTS) {
      const level = huntlootPartLevels()[part]?.level ?? 0;
      bonuses[part] = KeyValues.huntloot_level_setting[level]?.adverb_bonus ?? 0;
    }
    const attributes = SummarizeHuntlootAttributes(huntlootDetails(), bonuses);
    logHuntlootSummary("summary", {
      bonuses,
      attributes
    });
    return attributes;
  });
  const parseEntries = value => {
    if (!value) return [];
    if (typeof value === "string") return JSON.parseSafe(value) ?? [];
    return value;
  };
  const [attrSum, setAttrSum] = libs.createSignal({});
  const [mythList, setMythList] = libs.createSignal([]);
  const [chaosAttr, setChaosAttr] = libs.createSignal({});
  const [gemSuitAttr, setGemSuitAttr] = libs.createSignal({});
  const [suitList, setSuitList] = libs.createSignal([]);
  const equipmentPartDatas = solid_utils.createServiceNetData("player_equipment_part_datas", {});
  const equippedRevision = libs.createMemo(() => {
    const equipped = player_hero_equip_suit()[selectHeroID()]?.[selectEquipSuitID()];
    if (equipped == undefined) return "";
    const equipments = player_equipments();
    return equipment_utils.EQUIP_PARTS.map(part => {
      const id = equipped[part] ?? 0;
      return `${part}:${id}:${JSON.stringify(equipments[id] ?? null)}`;
    }).join("|");
  });
  const mergedAttributes = libs.createMemo(() => {
    const normal = {
      main_entry_data: {},
      adverb_entry_data: {}
    };
    const chaos = {};
    const mainIDs = new Set(Object.keys(attrSum().main_entry_data ?? {}));
    const add = (target, id, attribute) => {
      const previous = target[id] ?? {
        base_value: 0,
        value: 0
      };
      target[id] = {
        base_value: previous.base_value + attribute.base_value,
        value: previous.value + attribute.value,
        ...(previous.extra_value != undefined || attribute.extra_value != undefined ? {
          extra_value: (previous.extra_value ?? 0) + (attribute.extra_value ?? 0)
        } : {})
      };
    };
    const addNormal = (id, attribute) => {
      add(normal[mainIDs.has(id) ? "main_entry_data" : "adverb_entry_data"], id, attribute);
    };
    for (const group of Object.values(attrSum())) {
      for (const [id, attribute] of Object.entries(group)) addNormal(id, attribute);
    }
    for (const attribute of huntlootAttributes().adverb) addNormal(attribute.id, attribute);
    for (const [id, attribute] of Object.entries(chaosAttr())) {
      if (normal.main_entry_data[id] || normal.adverb_entry_data[id]) addNormal(id, attribute);else add(chaos, id, attribute);
    }
    return {
      normal,
      chaos
    };
  });
  const sumKeys = libs.createMemo(() => Object.keys(mergedAttributes().normal).filter(key => Object.keys(mergedAttributes().normal[key]).length > 0));
  const mergedMythList = libs.createMemo(() => {
    const entries = new Map();
    for (const entry of mythList()) {
      const previous = entries.get(entry.id);
      entries.set(entry.id, {
        ...entry,
        value: (previous?.value ?? 0) + toFiniteNumber(entry.value)
      });
    }
    return [...entries.values()];
  });
  const gemSuitEntries = libs.createMemo(() => Object.entries(gemSuitAttr()).sort(([left], [right]) => (KeyValues.gem_entry_suit[left]?.id ?? 0) - (KeyValues.gem_entry_suit[right]?.id ?? 0)));
  libs.createEffect(() => {
    equippedRevision();
    const hero = selectHeroID();
    const suit = selectEquipSuitID();
    const data = player_hero_equip_suit();
    let equipped = data[hero]?.[suit];
    let ids = equipped == undefined ? [] : Object.values(equipped).filter(id => Number(id) != 0);
    const partDatas = equipmentPartDatas();
    if (ids.length == 0) {
      libs.batch(() => {
        setAttrSum({});
        setChaosAttr({});
        setGemSuitAttr({});
        setMythList([]);
        setSuitList([]);
      });
      return;
    }
    let request = equipment_utils.GetEquipmentDetail(ids, result => {
      let sum = {
        "main_entry_data": {},
        "adverb_entry_data": {}
      };
      let chaosAttr = {};
      const gemSuitAttr = {};
      let mythList = [];
      let suitList = [];
      let suitRecord = {};
      const addAttribute = (list, attr, bonus = 0) => {
        list[attr.id] ??= {
          base_value: 0,
          value: 0
        };
        list[attr.id].base_value += toFiniteNumber(attr.base_value, 0);
        const enhancedValue = equipment_utils.EquipAttributeRound(attr.id, toFiniteNumber(attr.value, 0) + toFiniteNumber(attr.base_value, 0) * bonus);
        list[attr.id].value += enhancedValue;
        const extraValue = toFiniteNumber(attr.extra_value, 0);
        if (extraValue != 0) {
          list[attr.id].extra_value = toFiniteNumber(list[attr.id].extra_value, 0) + extraValue;
        }
      };
      const addGemAttribute = (list, attr) => {
        addAttribute(list, {
          ...attr,
          base_value: toFiniteNumber(attr.base_value, toFiniteNumber(attr.value, 0))
        });
      };
      const addChaosAttribute = attr => {
        if (attr.id.startsWith("privilege_gem_suit_")) {
          const level = Math.floor(toFiniteNumber(attr.value));
          if (level > 0) gemSuitAttr[attr.id] = (gemSuitAttr[attr.id] ?? 0) + level;
          return;
        }
        chaosAttr[attr.id] ??= {
          base_value: 0,
          value: 0
        };
        chaosAttr[attr.id].base_value = CalculatePropertyValue(attr.id, toFiniteNumber(chaosAttr[attr.id].base_value), attr.base_value);
        chaosAttr[attr.id].value = CalculatePropertyValue(attr.id, toFiniteNumber(chaosAttr[attr.id].value), attr.value);
      };
      for (const [id, data] of Object.entries(result)) {
        const partLevel = partDatas[data.equip_part]?.level ?? 0;
        const levelSetting = KeyValues.equip_level_setting[partLevel];
        for (const attr of data["main_entry_data"]) {
          addAttribute(sum["main_entry_data"], attr, levelSetting?.main_bonus ?? 0);
        }
        for (const attr of data["adverb_entry_data"]) {
          addAttribute(sum["adverb_entry_data"], attr, levelSetting?.adverb_bonus ?? 0);
        }
        for (const attr of data["chaos_entry_data"]) {
          addChaosAttribute(attr);
        }
        for (const attr of data["myth_entry_data"]) {
          mythList.push(attr);
        }
        const inlayGems = parseEntries(data.inlay_gems_data);
        for (const gem of inlayGems) {
          for (const attr of parseEntries(gem.main_entry_data)) {
            addGemAttribute(sum["adverb_entry_data"], attr);
          }
          for (const attr of parseEntries(gem.adverb_entry_data)) {
            addGemAttribute(sum["adverb_entry_data"], attr);
          }
          for (const attr of parseEntries(gem.myth_entry_data)) {
            mythList.push(attr);
          }
          for (const attr of parseEntries(gem.chaos_entry_data)) {
            addChaosAttribute(attr);
          }
        }
        if (data.ability_entry_data.length > 0) {
          const suitID = data.ability_entry_data[0].id;
          suitRecord[suitID] = (suitRecord[suitID] ?? 0) + 1;
        }
      }
      for (const [suitID, count] of Object.entries(suitRecord)) {
        if (count >= 2) {
          suitList.push(suitID);
        }
      }
      for (let [attr_type, list] of Object.entries(sum)) {
        for (let [id, attr] of Object.entries(list)) {
          let kv = KeyValues.equip_entry[id] ?? CustomUIConfig.EntryRatio[id];
          if (kv != undefined) {
            let ratio = kv.ratio ?? CustomUIConfig.EntryRatio[id] ?? 1;
            list[id].base_value = Round(attr.base_value, ratio);
            list[id].value = Round(attr.value, ratio);
            if (attr.extra_value != undefined) {
              list[id].extra_value = Round(attr.extra_value, ratio);
            }
          }
        }
      }
      libs.batch(() => {
        setAttrSum(sum);
        setChaosAttr(chaosAttr);
        setGemSuitAttr(gemSuitAttr);
        setMythList(mythList);
        setSuitList(suitList);
      });
    }, true);
    request && libs.onCleanup(() => CancelRequest(request));
  });
  return (() => {
    const _el$57 = libs.createElement("Panel", {
        id: "AttributesSummary"
      }, null),
      _el$58 = libs.createElement("Label", {
        id: "AttributesSummaryTitle",
        get text() {
          return GetLocalization("#Equipment_AttributesSummary");
        }
      }, _el$57);
      libs.createElement("Panel", {
        id: "TitleLine"
      }, _el$57);
      const _el$60 = libs.createElement("Panel", {
        id: "Attributes",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, _el$57),
      _el$61 = libs.createElement("Panel", {
        "class": "Separator"
      }, _el$60),
      _el$62 = libs.createElement("Panel", {
        "class": "Separator"
      }, _el$60),
      _el$63 = libs.createElement("Panel", {
        "class": "Separator"
      }, _el$60),
      _el$64 = libs.createElement("Panel", {
        "class": "Separator"
      }, _el$60);
    libs.setProp(_el$60, "scroll", "y");
    libs.insert(_el$60, libs.createComponent(libs.For, {
      get each() {
        return sumKeys();
      },
      children: (attr_type, idx) => {
        return [libs.createComponent(libs.For, {
          get each() {
            return Object.entries(mergedAttributes().normal[attr_type]).sort(([, a], [, b]) => b.value - a.value).map(([id]) => id);
          },
          children: id => {
            const AttrType = {
              "main_entry_data": "Main",
              "adverb_entry_data": "Adverb"
            };
            const memo = libs.createMemo(() => {
              let data = mergedAttributes().normal[attr_type][id];
              return {
                ...data,
                id
              };
            });
            const color = AttrType[attr_type] == "Main" ? "#BFAA82" : "#958D83";
            return libs.createComponent(equip_details.EquipmentAttrRow, {
              get data() {
                return memo();
              },
              get type() {
                return AttrType[attr_type];
              },
              attributNameColor: color,
              showAttributeRange: false,
              hideZeroBaseValue: true
            });
          }
        }), (() => {
          const _el$65 = libs.createElement("Panel", {
            "class": "Separator"
          }, null);
          libs.effect(_$p => libs.setProp(_el$65, "visible", idx() < sumKeys().length - 1, _$p));
          return _el$65;
        })()];
      }
    }), _el$61);
    libs.insert(_el$60, libs.createComponent(libs.For, {
      get each() {
        return mergedMythList();
      },
      children: (data, mythIndex) => {
        const entryKv = KeyValues.equip_entry[data.id];
        return (() => {
          const _el$66 = libs.createElement("Panel", {
              "class": "MythEntry"
            }, null);
            libs.createElement("Image", {}, _el$66);
            const _el$68 = libs.createElement("Label", {
              get text() {
                return GetPrivilegeDesc(data.id, 1, {
                  value: data.value,
                  min: entryKv.value_min,
                  max: entryKv.value_max
                });
              },
              html: true
            }, _el$66);
          libs.effect(_$p => libs.setProp(_el$68, "text", GetPrivilegeDesc(data.id, 1, {
            value: data.value,
            min: entryKv.value_min,
            max: entryKv.value_max
          }), _$p));
          return _el$66;
        })();
      }
    }), _el$62);
    libs.insert(_el$60, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(mergedAttributes().chaos);
      },
      children: (key, idx) => {
        const attrData = libs.createMemo(() => mergedAttributes().chaos[key]);
        return libs.createComponent(libs.Show, {
          get when() {
            return key.startsWith("drawing_");
          },
          get fallback() {
            return (() => {
              const _el$69 = libs.createElement("Panel", {
                  "class": `ChaosEntry`
                }, null);
                libs.createElement("Panel", {
                  id: "Point"
                }, _el$69);
                const _el$71 = libs.createElement("Label", {
                  id: "EntryText",
                  get text() {
                    return equipment_utils.GetChaosRowInfo({
                      id: key,
                      base_value: attrData().base_value,
                      value: attrData().value
                    });
                  },
                  html: true
                }, _el$69);
              libs.setProp(_el$69, "class", `ChaosEntry`);
              libs.effect(_$p => libs.setProp(_el$71, "text", equipment_utils.GetChaosRowInfo({
                id: key,
                base_value: attrData().base_value,
                value: attrData().value
              }), _$p));
              return _el$69;
            })();
          },
          get children() {
            return libs.createComponent(huntloot_details.HuntlootSpellRow, {
              get data() {
                return {
                  id: key,
                  ...attrData()
                };
              },
              showAttributeRange: false
            });
          }
        });
      }
    }), _el$63);
    libs.insert(_el$60, libs.createComponent(libs.For, {
      get each() {
        return suitList();
      },
      children: (suit, idx) => {
        return libs.createComponent(solid_utils.DynamicKey, {
          key: () => `${suit}:${equippedRevision()}`,
          children: () => libs.createComponent(equip_details.EquipSuitList, {
            suitEffectID: suit,
            get hero_id() {
              return selectHeroID();
            }
          })
        });
      }
    }), _el$64);
    libs.insert(_el$60, libs.createComponent(libs.For, {
      get each() {
        return gemSuitEntries();
      },
      children: ([id, level]) => libs.createComponent(equip_details.GemSpecialEffectRow, {
        data: {
          id,
          value: level
        }
      })
    }), null);
    libs.effect(_p$ => {
      const _v$17 = GetLocalization("#Equipment_AttributesSummary"),
        _v$18 = mergedMythList().length > 0,
        _v$19 = Object.keys(mergedAttributes().chaos).length > 0,
        _v$20 = suitList().length > 0,
        _v$21 = gemSuitEntries().length > 0;
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$58, "text", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$61, "visible", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$62, "visible", _v$19, _p$._v$19));
      _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$63, "visible", _v$20, _p$._v$20));
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$64, "visible", _v$21, _p$._v$21));
      return _p$;
    }, {
      _v$17: undefined,
      _v$18: undefined,
      _v$19: undefined,
      _v$20: undefined,
      _v$21: undefined
    });
    return _el$57;
  })();
}
const ItemTabs = ["equipment", "gem", "huntloot"];
const ITEM_TABS_ICON = {
  "equipment": "icon_zhaungbei",
  "gem": "icon_baoshi",
  "huntloot": "icon_zhanlipin"
};
function ItemsRoot() {
  const [huntlootDetails, setHuntlootDetails] = libs.createSignal({});
  const [huntlootDetailsSource, setHuntlootDetailsSource] = libs.createSignal();
  const [huntlootDetailsLoading, setHuntlootDetailsLoading] = libs.createSignal(false);
  const needsHuntlootDetails = () => [filterHuntlootAdverb(), filterHuntlootSpell()].some(filter => Object.values(filter).some(mode => mode !== "default"));
  libs.createEffect(libs.on([player_huntloots, filterHuntlootAdverb, filterHuntlootSpell, selectedItemTab], () => {
    const source = player_huntloots();
    setHuntlootDetailsLoading(false);
    if (selectedItemTab() !== "huntloot" || !needsHuntlootDetails() || huntlootDetailsSource() === source) return;
    const ids = Object.keys(source);
    if (ids.length === 0) {
      libs.batch(() => {
        setHuntlootDetails({});
        setHuntlootDetailsSource(source);
      });
      return;
    }
    setHuntlootDetailsLoading(true);
    let active = true;
    const request = huntloot_details.GetHuntlootDetail(ids, details => {
      if (!active) return;
      libs.batch(() => {
        setHuntlootDetails(details);
        setHuntlootDetailsSource(source);
        setHuntlootDetailsLoading(false);
      });
    }, true);
    libs.onCleanup(() => {
      active = false;
      if (request) CancelRequest(request);
    });
  }));
  const [equipmentDetailVersion, setEquipmentDetailVersion] = libs.createSignal(0);
  const [equipmentDetailsLoading, setEquipmentDetailsLoading] = libs.createSignal(false);
  let equipmentDataWithFreshDetails;
  let equipmentFreshDetails = {};
  let gemFilterRequestVersion = 0;
  const [appliedGemFilter, setAppliedGemFilter] = libs.createSignal();
  libs.createEffect(libs.on([player_equipments, filterMythText, filterEquipSubEntry, selectedItemTab, showFilter], ([equipmentData, keyword, subEntryFilter, tab]) => {
    const hasSubEntryFilter = Object.values(subEntryFilter).some(mode => mode !== "default");
    const ids = Object.keys(equipmentData);
    setEquipmentDetailsLoading(false);
    if (tab !== "equipment" || !keyword.trim() && !hasSubEntryFilter || ids.length === 0 || equipmentDataWithFreshDetails === equipmentData) {
      return;
    }
    let active = true;
    setEquipmentDetailsLoading(true);
    const request = equipment_utils.GetEquipmentDetail(ids, details => {
      if (!active) return;
      libs.batch(() => {
        equipmentDataWithFreshDetails = equipmentData;
        equipmentFreshDetails = details;
        setEquipmentDetailsLoading(false);
        setEquipmentDetailVersion(version => version + 1);
      });
    }, true, () => {
      if (!active) return;
      setEquipmentDetailsLoading(false);
      ErrorMessage(GetLocalization("#Equipment_FilterRequestFailed"));
    });
    libs.onCleanup(() => {
      active = false;
      if (request) CancelRequest(request);
    });
  }));
  const showItemsRoot = () => {
    return SHOW_ITEM_LIST_MENU[menuName()];
  };
  const filteredEquips = libs.createMemo(() => {
    const part_filter = partFilter();
    const rarity_filter = filterRarity();
    const needlv_filter = filterNeedLv();
    const class_filter = filterClass();
    const suit_filter = filterSuit();
    const myth_text_filter = filterMythText().trim().toLowerCase();
    const sub_entry_filter = filterEquipSubEntry();
    const sub_entry_ranges = filterEquipSubRanges();
    let res = Object.values(player_equipments());
    if (part_filter > 0) {
      res = res.filter(data => data.equip_part == part_filter);
    }
    const selectedRarity = Object.keys(rarity_filter).filter(k => rarity_filter[Number(k)]).map(Number);
    if (selectedRarity.length > 0) {
      res = res.filter(data => selectedRarity.includes(data.rarity));
    }
    const selectedNeedLv = Object.keys(needlv_filter).filter(k => {
      return needlv_filter[Number(k)];
    }).map(Number);
    if (selectedNeedLv.length > 0) {
      res = res.filter(data => selectedNeedLv.includes(data.need_level));
    }
    const selectedClass = Object.keys(class_filter).filter(k => class_filter[Number(k)]).map(Number);
    if (selectedClass.length > 0) {
      res = res.filter(data => {
        return selectedClass.includes(data.class);
      });
    }
    const selectedSuit = Object.keys(suit_filter).filter(k => suit_filter[k]);
    if (selectedSuit.length > 0) {
      res = res.filter(data => {
        const suitID = data.ability_entry_data?.[0]?.id;
        return suitID != undefined && selectedSuit.includes(suitID);
      });
    }
    const includedSubEntries = [];
    const excludedSubEntries = [];
    for (const [entryID, mode] of Object.entries(sub_entry_filter)) {
      if (mode === "include") includedSubEntries.push(entryID);
      if (mode === "exclude") excludedSubEntries.push(entryID);
    }
    const needsEquipmentDetails = myth_text_filter !== "" || includedSubEntries.length > 0 || excludedSubEntries.length > 0;
    equipmentDetailVersion();
    const equipmentDetailsReady = !needsEquipmentDetails || !equipmentDetailsLoading() && equipmentDataWithFreshDetails === player_equipments() && res.every(data => equipmentFreshDetails[data.id] != undefined);
    if (!equipmentDetailsReady || includedSubEntries.some(id => !entry_range_inputs.isEntryFilterRangeValid(sub_entry_ranges[id]))) return [];
    if (myth_text_filter) {
      res = res.filter(data => {
        const mythEntries = equipmentFreshDetails[data.id]?.myth_entry_data ?? [];
        return mythEntries?.some(entry => {
          const entryKv = KeyValues.equip_entry[entry.id];
          const description = GetPrivilegeDesc(entry.id, 1, {
            value: entry.value,
            min: entryKv?.value_min,
            max: entryKv?.value_max
          });
          const searchableText = [entry.id, GetLocalization(`#DOTA_Tooltip_ability_${entry.id}`, ""), description].join(" ").replace(/<[^>]*>/g, "").toLowerCase();
          return searchableText.includes(myth_text_filter);
        });
      });
    }
    if (includedSubEntries.length > 0 || excludedSubEntries.length > 0) {
      res = res.filter(data => {
        const entries = equipmentFreshDetails[data.id]?.adverb_entry_data;
        if (entries === undefined) return false;
        return entry_range_inputs.matchesSelectedEntryRanges(entries, includedSubEntries, sub_entry_ranges) && excludedSubEntries.every(entryID => !entries.some(entry => entry.id === entryID));
      });
    }
    return res;
  });
  const sortedEquips = libs.createMemo(() => {
    const dataList = filteredEquips();
    const currentTab = forgeChildTab();
    const swapSource = currentTab == "Inlay" && selectedItemList().length > 0 ? player_equipments()[selectedItemList()[0]] : undefined;
    const meetConditionList = [];
    const notMeetConditionList = [];
    for (const data of dataList) {
      const isSwapSource = swapSource?.id == data.id;
      const meetsCurrentOperation = !currentTab || isEquipMeetCondition(data, currentTab);
      const meetsSwapCondition = !swapSource || isSwapSource || canSwapEquipmentGems(swapSource, data);
      if (meetsCurrentOperation && meetsSwapCondition) {
        meetConditionList.push(data);
      } else {
        notMeetConditionList.push(data);
      }
    }
    const sortFunc = (a, b) => {
      return multiCompare(b.rarity - a.rarity, b.class - a.class);
    };
    meetConditionList.sort(sortFunc);
    notMeetConditionList.sort(sortFunc);
    const ret = [...meetConditionList, ...notMeetConditionList];
    return ret;
  });
  const sortedGems = libs.createMemo(() => {
    const currentTab = forgeChildTab();
    const rarity = partFilter();
    const classFilter = filterGemClass();
    const hasClassFilter = Object.values(classFilter).some(Boolean);
    const allowedGemIDs = filteredGemIDs();
    const gemList = Object.values(player_gems()).filter(gem => {
      if (rarity !== 0 && gem.rarity !== rarity) return false;
      const gemClass = KeyValues.info_item_gem[gem.gem_item_id]?.class ?? 10;
      if (hasClassFilter && !classFilter[gemClass]) return false;
      if (allowedGemIDs != undefined && !allowedGemIDs.includes(gem.id)) return false;
      return true;
    });
    if (!currentTab || selectedItemTab() !== "gem") {
      return gemList.sort((a, b) => b.rarity - a.rarity);
    }
    const meetList = [];
    const notMeetList = [];
    for (const gem of gemList) {
      if (isGemMeetCondition(gem, currentTab)) {
        meetList.push(gem);
      } else {
        notMeetList.push(gem);
      }
    }
    meetList.sort((a, b) => b.rarity - a.rarity);
    notMeetList.sort((a, b) => b.rarity - a.rarity);
    return [...meetList, ...notMeetList];
  });
  const sortedHuntloots = libs.createMemo(() => {
    const currentTab = forgeChildTab();
    const part = partFilter();
    const source = player_huntloots();
    const rarities = Object.keys(filterHuntlootRarity()).filter(key => filterHuntlootRarity()[Number(key)]).map(Number);
    const classes = Object.keys(filterHuntlootClass()).filter(key => filterHuntlootClass()[Number(key)]).map(Number);
    const needsDetails = needsHuntlootDetails();
    const detailsReady = !needsDetails || !huntlootDetailsLoading() && huntlootDetailsSource() === source;
    const list = Object.values(source).filter(data => {
      if (part !== 0 && data.huntloot_part !== part) return false;
      if (rarities.length > 0 && !rarities.includes(data.rarity)) return false;
      if (classes.length > 0 && !classes.includes(data.class)) return false;
      if (!needsDetails) return true;
      const detail = huntlootDetails()[data.id];
      return detailsReady && detail != undefined && matchesHuntlootEntryFilter(detail.adverb_entry_data, filterHuntlootAdverb()) && matchesHuntlootEntryFilter(detail.spell_entry_data, filterHuntlootSpell());
    });
    const meetList = [];
    const notMeetList = [];
    for (const data of list) {
      if (!currentTab || selectedItemTab() !== "huntloot" || isHuntlootMeetCondition(data, currentTab)) {
        meetList.push(data);
      } else {
        notMeetList.push(data);
      }
    }
    const sortFunc = (a, b) => {
      return multiCompare(b.rarity - a.rarity, b.class - a.class);
    };
    meetList.sort(sortFunc);
    notMeetList.sort(sortFunc);
    return [...meetList, ...notMeetList];
  });
  const applyGemEntryFilter = () => {
    if (hasInvalidGemChaosRange() || hasInvalidGemValueRange()) return;
    const chaos = Object.entries(filterGemChaosEntry()).filter(([, range]) => range.selected).map(([id, range]) => ({
      id,
      ...(range.min.trim() !== "" ? {
        min: Number(range.min)
      } : {}),
      ...(range.max.trim() !== "" ? {
        max: Number(range.max)
      } : {})
    }));
    const main = Object.keys(filterGemMainEntry()).filter(entryID => filterGemMainEntry()[entryID]);
    const include = [];
    const exclude = [];
    for (const [entryID, mode] of Object.entries(filterGemSubEntry())) {
      if (mode === "include") include.push(entryID);
      if (mode === "exclude") exclude.push(entryID);
    }
    libs.batch(() => {
      setShowFilter(false);
      setAppliedGemFilter(main.length || include.length || exclude.length || chaos.length ? {
        main,
        include,
        exclude,
        chaos,
        chaosMatchAny: filterGemChaosAny(),
        mainRanges: entry_range_inputs.serializeEntryFilterRanges(filterGemMainRanges(), main),
        includeRanges: entry_range_inputs.serializeEntryFilterRanges(filterGemSubRanges(), include)
      } : undefined);
    });
  };
  libs.createEffect(libs.on([player_gems, appliedGemFilter], ([, filters]) => {
    const requestVersion = ++gemFilterRequestVersion;
    if (filters === undefined) {
      libs.batch(() => {
        setFilteredGemIDs();
        setGemFilterRequesting(false);
      });
      return;
    }
    libs.batch(() => {
      setFilteredGemIDs([]);
      setGemFilterRequesting(true);
    });
    const request = ServerRequest("filter_gems", filters, result => {
      if (requestVersion !== gemFilterRequestVersion) return;
      libs.batch(() => {
        setFilteredGemIDs(Object.values(result.ids ?? {}).map(Number).filter(Number.isFinite));
        setGemFilterRequesting(false);
      });
    }, undefined, () => {
      if (requestVersion !== gemFilterRequestVersion) return;
      libs.batch(() => {
        setGemFilterRequesting(false);
        setShowFilter(true);
      });
      ErrorMessage(GetLocalization("#Gem_FilterRequestFailed"));
    });
    libs.onCleanup(() => CancelRequest(request));
  }));
  return (() => {
    const _el$72 = libs.createElement("Panel", {
        id: "ItemsRoot",
        get ["class"]() {
          return libs.classNames("RootWindow", {
            Hidden: !showItemsRoot() || hiddenItemList()
          });
        }
      }, null),
      _el$73 = libs.createElement("Panel", {
        id: "LeftArea"
      }, _el$72),
      _el$75 = libs.createElement("Panel", {
        id: "PartFilter",
        get ["class"]() {
          return libs.classNames({
            Gem: selectedItemTab() == "gem"
          });
        }
      }, _el$72),
      _el$76 = libs.createElement("Panel", {
        id: "BtnsContainer"
      }, _el$72),
      _el$77 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "right"
      }, _el$76),
      _el$78 = libs.createElement("Button", {
        id: "ResetBtn",
        "class": "SecondaryButtonStates"
      }, _el$77);
    libs.insert(_el$73, libs.createComponent(libs.Show, {
      get when() {
        return showFilter();
      },
      get children() {
        return libs.createComponent(FilterWindow, {});
      }
    }), null);
    libs.insert(_el$73, libs.createComponent(libs.Show, {
      get when() {
        return !showFilter();
      },
      get children() {
        return [(() => {
          const _el$74 = libs.createElement("Panel", {
            id: "Tabs",
            hittest: true
          }, null);
          libs.setProp(_el$74, "onactivate", () => {});
          libs.insert(_el$74, libs.createComponent(libs.For, {
            each: ItemTabs,
            children: name => {
              const locked = isItemTabLocked();
              return libs.createComponent(equipment_comp.MenuTabButton, {
                name: name,
                get icon() {
                  return ITEM_TABS_ICON[name];
                },
                twoLine: true,
                get enabled() {
                  return (lockItemTab() ? selectedItemTab() == name : true);
                },
                get num() {
                  return name == "equipment" ? equipmentCount() : name == "gem" ? gemCount() : huntlootCount();
                },
                locked: locked,
                get selected() {
                  return selectedItemTab() == name;
                },
                clickCallback: () => {
                  setSelectedItemTab(name);
                }
              });
            }
          }));
          return _el$74;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return selectedItemTab() == "equipment";
          },
          get children() {
            return libs.createComponent(RecycleView.RecycleView, {
              id: "ItemList",
              input: sortedEquips,
              direction: "VerticalGrid",
              wheelStep: 88,
              childConfig: {
                width: 88,
                height: 88,
                margin: 2
              },
              grid_children: () => libs.createElement("Panel", {
                "class": "EquipListGrid"
              }, null),
              children: data => {
                const id = () => data()?.id;
                const kv = () => {
                  if (!data()) return;
                  return KeyValues.info_item_equipment[data().equipment_item_id];
                };
                const select = () => {
                  return selectedItemID() == id() || selectedItemList().includes(id());
                };
                const gray = () => {
                  if (!data()) return;
                  const tab = forgeChildTab();
                  if (!tab) return false;
                  if (!isEquipMeetCondition(data(), tab)) return true;
                  const swapSourceID = tab == "Inlay" ? selectedItemList()[0] : undefined;
                  if (!swapSourceID || swapSourceID == data().id) return false;
                  return !canSwapEquipmentGems(player_equipments()[swapSourceID], data());
                };
                const isNew = () => {
                  return equipmentUnreadIds.isUnread(id());
                };
                const heroEquiped = () => {
                  const heroID = menuName() == "EquipmentTab_equip" ? selectHeroID() : undefined;
                  return equipment_utils.EquipmentIsEquiped(data(), heroID);
                };
                return (() => {
                  const _el$80 = libs.createElement("Panel", {
                      get ["class"]() {
                        return libs.classNames("Item", {
                          Selected: select(),
                          Gray: gray(),
                          New: isNew()
                        });
                      }
                    }, null),
                    _el$81 = libs.createElement("Panel", {
                      "class": "SelectedBorder"
                    }, _el$80);
                    libs.createElement("Panel", {
                      id: "NewTag"
                    }, _el$80);
                  libs.setProp(_el$80, "onmouseactivate", () => {
                    if (menuName() == "EquipmentTab_break") {
                      if (equipment_utils.EquipmentHasStates(data(), true)) {
                        return;
                      }
                      if (selectedItemList().includes(id())) {
                        setSelectedItemList(items => items.filter(i => i != id()));
                        return;
                      }
                      setSelectedItemList(items => {
                        const slot = selectBreakSlot();
                        if (slot >= 0 && slot < equipment_comp.BREAK_SLOT_NUM) {
                          const newItems = [...items];
                          newItems[slot] = id();
                          return newItems;
                        }
                        if (items.includes(id())) {
                          return items.filter(i => i != id());
                        }
                        const emptyIndex = items.findIndex(item => item == null);
                        if (emptyIndex >= 0) {
                          const newItems = [...items];
                          newItems[emptyIndex] = id();
                          return newItems;
                        }
                        const selectionLimit = breakListMode() ? equipment_comp.MAX_BREAK_SELECT_NUM : equipment_comp.BREAK_SLOT_NUM;
                        if (items.length < selectionLimit) {
                          return [...items, id()];
                        }
                        return items;
                      });
                    } else {
                      if (gray()) {
                        return;
                      }
                      if (forgeChildTab() == "Inlay" && selectedItemList().length > 0) {
                        const firstID = selectedItemList()[0];
                        if (data().id != firstID) {
                          setSelectedItemList([firstID, data().id]);
                        }
                        return;
                      }
                      setSelectedItemID(data().id);
                    }
                  });
                  libs.setProp(_el$80, "onmouseover", p => {
                    if (id()) {
                      let id2 = equippedEquipment()?.[data().equip_part];
                      if (id2 == id()) {
                        id2 = undefined;
                      }
                      equipment_utils.ShowServerEquipTooltip(p, {
                        id1: id(),
                        id2: id2
                      });
                      if (isNew()) {
                        equipmentUnreadIds.markRead(id());
                        CustomUIConfig.__equipmentRedPointState?.markEquipmentUnreadViewed([id()]);
                      }
                    }
                  });
                  libs.setProp(_el$80, "onmouseout", p => HideCustomTooltip(p, "server_equip"));
                  libs.setProp(_el$80, "onDragStart", (panel, dragCallbacks) => {
                    if (!data() || gray()) return;
                    HideCustomTooltip(panel, "server_equip");
                    let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
                    let d = {
                      ...data()
                    };
                    libs.render(() => libs.createComponent(server_equipment.Equipment, d), pDisplayPanel);
                    dragCallbacks.displayPanel = pDisplayPanel;
                    setDragPanelOffset(dragCallbacks, pDisplayPanel);
                    panel.AddClass("dragging_from");
                    SaveData(pDisplayPanel, "equip", id());
                    HideCustomTooltip(panel, "compare_server_equipment");
                    setDraggedSlot(kv().equip_part);
                    $.GetContextPanel().AddClass("Equipment_Dragging");
                    return true;
                  });
                  libs.setProp(_el$80, "onDragEnd", (panel, draggedPanel) => {
                    setDraggedSlot();
                    draggedPanel.DeleteAsync(-1);
                    panel.RemoveClass("dragging_from");
                    $.GetContextPanel().RemoveClass("Equipment_Dragging");
                  });
                  libs.setProp(_el$80, "oncontextmenu", p => {
                    const _kv = kv();
                    if (!_kv) return;
                    const menus = {};
                    const _part = _kv.equip_part;
                    const isEquip = equipment_utils.EquipmentIsEquiped(data(), selectHeroID());
                    if (data().locked) {
                      menus["Hud_Equipment_Unlock"] = () => {
                        LockEquipment(id(), false);
                      };
                    } else {
                      if (menuName() == "EquipmentTab_break" && selectedItemList().includes(id())) ; else {
                        menus["Hud_Equipment_Lock"] = () => {
                          LockEquipment(id(), true);
                        };
                      }
                    }
                    if (isEquip) {
                      menus["Hud_Equipment_UnEquip"] = () => {
                        EquipEquipment(0, selectHeroID(), selectEquipSuitID(), _part);
                      };
                    } else {
                      if (menuName() == "EquipmentTab_break" && selectedItemList().includes(id())) ; else {
                        menus["Hud_Equipment_Equip1"] = () => {
                          EquipEquipment(id(), selectHeroID(), selectEquipSuitID(), _part);
                        };
                      }
                    }
                    let equip_list = [];
                    const equipSuitData = player_hero_equip_suit();
                    for (let [hero_id, suit_list] of Object.entries(equipSuitData)) {
                      for (let [suit_id, part_list] of Object.entries(suit_list)) {
                        if (part_list[_part] == id()) {
                          equip_list.push({
                            hero_id: Number(hero_id),
                            suit_id: Number(suit_id)
                          });
                        }
                      }
                    }
                    if (equip_list.length) {
                      menus["Hud_Equipment_UnEquip_All"] = () => {
                        for (const element of equip_list) {
                          EquipEquipment(0, element.hero_id, element.suit_id, _part);
                        }
                      };
                    }
                    if (Object.keys(menus).length > 0) {
                      CustomUIConfig.showContextMenu(p, menus);
                    }
                  });
                  libs.insert(_el$80, libs.createComponent(server_equipment.Equipment, libs.mergeProps$1(data, {
                    get equipped() {
                      return heroEquiped();
                    }
                  })), _el$81);
                  libs.effect(_$p => libs.setProp(_el$80, "class", libs.classNames("Item", {
                    Selected: select(),
                    Gray: gray(),
                    New: isNew()
                  }), _$p));
                  return _el$80;
                })();
              }
            });
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return selectedItemTab() == "gem";
          },
          get children() {
            return libs.createComponent(RecycleView.RecycleView, {
              id: "ItemList",
              input: sortedGems,
              direction: "VerticalGrid",
              wheelStep: 88,
              childConfig: {
                width: 88,
                height: 88,
                margin: 2
              },
              grid_children: () => libs.createElement("Panel", {
                "class": "EquipListGrid"
              }, null),
              children: data => {
                const gemData = () => data();
                const gemId = () => gemData().id;
                const isSelected = () => {
                  if (menuName() == "EquipmentTab_break") {
                    return selectedItemList().includes(gemId());
                  }
                  return selectedGemList().includes(gemId());
                };
                const gray = () => {
                  if (!gemData()) return;
                  const tab = forgeChildTab();
                  if (!tab) return false;
                  return !isGemMeetCondition(gemData(), tab);
                };
                const isNew = () => gemUnreadIds.isUnread(gemId());
                return (() => {
                  const _el$84 = libs.createElement("Panel", {
                      get ["class"]() {
                        return libs.classNames("Item", {
                          Selected: isSelected(),
                          Gray: gray(),
                          New: isNew()
                        });
                      }
                    }, null),
                    _el$85 = libs.createElement("Panel", {
                      "class": "SelectedBorder"
                    }, _el$84);
                    libs.createElement("Panel", {
                      id: "NewTag"
                    }, _el$84);
                  libs.setProp(_el$84, "onmouseover", p => {
                    if (gemId()) {
                      const itemData = selectedItemData();
                      let embeddedGemData;
                      if (itemData) {
                        const gems = JSON.parseSafe(itemData.inlay_gems_data);
                        if (gems && gems[0] && gems[0].id != undefined) {
                          const gem = gems[0];
                          const parseEntries = v => {
                            if (!v) return [];
                            if (typeof v === "string") return JSON.parseSafe(v) ?? [];
                            return v;
                          };
                          embeddedGemData = JSON.stringify({
                            ...gem,
                            main_entry_data: parseEntries(gem.main_entry_data),
                            adverb_entry_data: parseEntries(gem.adverb_entry_data),
                            myth_entry_data: parseEntries(gem.myth_entry_data),
                            chaos_entry_data: parseEntries(gem.chaos_entry_data),
                            ability_entry_data: parseEntries(gem.ability_entry_data)
                          });
                        }
                      }
                      equipment_utils.ShowServerGemTooltip(p, {
                        id1: gemId(),
                        embeddedGemData
                      });
                      if (isNew()) {
                        gemUnreadIds.markRead(gemId());
                      }
                    }
                  });
                  libs.setProp(_el$84, "onmouseout", p => HideCustomTooltip(p, "server_gem"));
                  libs.setProp(_el$84, "onDragStart", (panel, dragCallbacks) => {
                    if (!gemData() || gray()) return;
                    HideCustomTooltip(panel, "server_gem");
                    let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
                    let d = {
                      ...gemData()
                    };
                    libs.render(() => libs.createComponent(server_equipment.Gem, d), pDisplayPanel);
                    dragCallbacks.displayPanel = pDisplayPanel;
                    setDragPanelOffset(dragCallbacks, pDisplayPanel);
                    panel.AddClass("dragging_from");
                    SaveData(pDisplayPanel, "gem", gemId());
                    return true;
                  });
                  libs.setProp(_el$84, "onDragEnd", (panel, draggedPanel) => {
                    draggedPanel.DeleteAsync(-1);
                    panel.RemoveClass("dragging_from");
                  });
                  libs.setProp(_el$84, "oncontextmenu", p => {
                    const menus = {};
                    if (gemData().locked) {
                      menus["Hud_Equipment_Unlock"] = () => {
                        LockGem(gemId(), false);
                      };
                    } else if (menuName() != "EquipmentTab_break" || !selectedItemList().includes(gemId())) {
                      menus["Hud_Equipment_Lock"] = () => {
                        LockGem(gemId(), true);
                      };
                    }
                    if (Object.keys(menus).length > 0) {
                      CustomUIConfig.showContextMenu(p, menus);
                    }
                  });
                  libs.setProp(_el$84, "onmouseactivate", () => {
                    const id = gemId();
                    if (menuName() == "EquipmentTab_break") {
                      if (gray()) return;
                      if (equipment_utils.GemHasStates(gemData(), true)) return;
                      if (selectedItemList().includes(id)) {
                        setSelectedItemList(items => items.filter(i => i != id));
                        return;
                      }
                      setSelectedItemList(items => {
                        const slot = selectBreakSlot();
                        if (slot >= 0 && slot < equipment_comp.BREAK_SLOT_NUM) {
                          const newItems = [...items];
                          newItems[slot] = id;
                          return newItems;
                        }
                        if (items.includes(id)) {
                          return items.filter(i => i != id);
                        }
                        const emptyIndex = items.findIndex(item => item == null);
                        if (emptyIndex >= 0) {
                          const newItems = [...items];
                          newItems[emptyIndex] = id;
                          return newItems;
                        }
                        const selectionLimit = breakListMode() ? equipment_comp.MAX_BREAK_SELECT_NUM : equipment_comp.BREAK_SLOT_NUM;
                        if (items.length < selectionLimit) {
                          return [...items, id];
                        }
                        return items;
                      });
                    } else {
                      if (forgeChildTab() == "Fusion" && gray()) return;
                      libs.batch(() => {
                        setSelectedGemList(prev => {
                          if (prev.includes(id)) {
                            return prev.filter(i => i !== id);
                          }
                          return [id];
                        });
                      });
                    }
                  });
                  libs.insert(_el$84, libs.createComponent(server_equipment.Gem, libs.mergeProps$1(gemData)), _el$85);
                  libs.effect(_$p => libs.setProp(_el$84, "class", libs.classNames("Item", {
                    Selected: isSelected(),
                    Gray: gray(),
                    New: isNew()
                  }), _$p));
                  return _el$84;
                })();
              }
            });
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return selectedItemTab() == "huntloot";
          },
          get children() {
            return libs.createComponent(RecycleView.RecycleView, {
              id: "ItemList",
              input: sortedHuntloots,
              direction: "VerticalGrid",
              wheelStep: 88,
              childConfig: {
                width: 88,
                height: 88,
                margin: 2
              },
              grid_children: () => libs.createElement("Panel", {
                "class": "EquipListGrid"
              }, null),
              children: data => {
                const huntloot = () => data();
                const id = () => huntloot().id;
                const kv = () => KeyValues.info_item_huntloot[huntloot().huntloot_item_id];
                const isDevourMode = () => forgeChildTab() == "Devour" && selectedItemTab() == "huntloot";
                const select = () => menuName() == "EquipmentTab_break" ? selectedItemList().includes(id()) : isDevourMode() ? devouredHuntlootID() == id() : selectedItemID() == id();
                const gray = () => {
                  if (!huntloot()) return;
                  if (menuName() == "EquipmentTab_break") return huntloot_details.HuntlootHasStates(huntloot());
                  const tab = forgeChildTab();
                  if (!tab) return false;
                  return !isHuntlootMeetCondition(huntloot(), tab);
                };
                const heroHuntlootEquiped = () => {
                  const heroID = menuName() == "EquipmentTab_equip" ? selectHeroID() : undefined;
                  return huntloot_details.HuntlootIsEquiped(huntloot(), heroID);
                };
                return (() => {
                  const _el$88 = libs.createElement("Panel", {
                      get ["class"]() {
                        return libs.classNames("Item", {
                          Selected: select(),
                          Gray: gray()
                        });
                      }
                    }, null),
                    _el$89 = libs.createElement("Panel", {
                      "class": "SelectedBorder"
                    }, _el$88);
                  libs.setProp(_el$88, "onmouseactivate", () => {
                    if (menuName() == "EquipmentTab_break") {
                      if (huntloot_details.HuntlootHasStates(huntloot(), true)) {
                        return;
                      }
                      if (selectedItemList().includes(id())) {
                        setSelectedItemList(items => items.filter(i => i != id()));
                        return;
                      }
                      setSelectedItemList(items => {
                        const slot = selectBreakSlot();
                        if (slot >= 0 && slot < equipment_comp.BREAK_SLOT_NUM) {
                          const newItems = [...items];
                          newItems[slot] = id();
                          return newItems;
                        }
                        const emptyIndex = items.findIndex(item => item == null);
                        if (emptyIndex >= 0) {
                          const newItems = [...items];
                          newItems[emptyIndex] = id();
                          return newItems;
                        }
                        const selectionLimit = breakListMode() ? equipment_comp.MAX_BREAK_SELECT_NUM : equipment_comp.BREAK_SLOT_NUM;
                        if (items.length < selectionLimit) {
                          return [...items, id()];
                        }
                        return items;
                      });
                      return;
                    }
                    if (gray()) return;
                    if (isDevourMode()) {
                      if (huntlootDevourPreviewing()) {
                        ErrorMessage("#HuntlootDevour_PreviewBlockSelect");
                        return;
                      }
                      setDevouredHuntlootID(prev => prev == id() ? undefined : id());
                      return;
                    }
                    setSelectedItemID(id());
                  });
                  libs.setProp(_el$88, "onmouseover", p => {
                    if (!id()) return;
                    const suitData = player_hero_huntloot_suit();
                    const equippedID = suitData[selectHeroID()]?.[selectEquipSuitID()]?.[kv()?.huntloot_part ?? 0];
                    let id2 = typeof equippedID === "number" && equippedID > 0 && equippedID !== id() ? equippedID : undefined;
                    huntloot_details.ShowServerHuntlootTooltip(p, {
                      id1: id(),
                      id2
                    });
                  });
                  libs.setProp(_el$88, "onmouseout", p => HideCustomTooltip(p, "server_huntloot"));
                  libs.setProp(_el$88, "onDragStart", (panel, dragCallbacks) => {
                    if (!huntloot() || gray()) return;
                    HideCustomTooltip(panel, "server_huntloot");
                    let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
                    let d = {
                      ...huntloot()
                    };
                    libs.render(() => libs.createComponent(server_huntloot.Huntloot, d), pDisplayPanel);
                    dragCallbacks.displayPanel = pDisplayPanel;
                    setDragPanelOffset(dragCallbacks, pDisplayPanel);
                    panel.AddClass("dragging_from");
                    SaveData(pDisplayPanel, "huntloot", id());
                    if (!isDevourMode()) {
                      setDraggedSlot(HUNTLOOT_DRAG_SLOT_BASE + (kv()?.huntloot_part ?? 0));
                      $.GetContextPanel().AddClass("Equipment_Dragging");
                    }
                    return true;
                  });
                  libs.setProp(_el$88, "onDragEnd", (panel, draggedPanel) => {
                    setDraggedSlot();
                    draggedPanel.DeleteAsync(-1);
                    panel.RemoveClass("dragging_from");
                    $.GetContextPanel().RemoveClass("Equipment_Dragging");
                  });
                  libs.setProp(_el$88, "oncontextmenu", p => {
                    const _part = kv()?.huntloot_part;
                    if (!_part) return;
                    const menus = {};
                    const isEquip = player_hero_huntloot_suit()[selectHeroID()]?.[selectEquipSuitID()]?.[_part] == id();
                    if (huntloot().locked) {
                      menus["Hud_Equipment_Unlock"] = () => {
                        LockHuntloot(id(), false);
                      };
                    } else {
                      menus["Hud_Equipment_Lock"] = () => {
                        LockHuntloot(id(), true);
                      };
                    }
                    if (isEquip) {
                      menus["Hud_Equipment_UnEquip"] = () => {
                        EquipHuntloot(0, selectHeroID(), selectEquipSuitID(), _part);
                      };
                    } else {
                      menus["Hud_Equipment_Equip1"] = () => {
                        EquipHuntloot(id(), selectHeroID(), selectEquipSuitID(), _part);
                      };
                    }
                    let equip_list = [];
                    const suitData = player_hero_huntloot_suit();
                    for (let [hero_id, suit_list] of Object.entries(suitData)) {
                      for (let [suit_id, part_list] of Object.entries(suit_list)) {
                        if (part_list[_part] == id()) {
                          equip_list.push({
                            hero_id: Number(hero_id),
                            suit_id: Number(suit_id)
                          });
                        }
                      }
                    }
                    if (equip_list.length) {
                      menus["Hud_Equipment_UnEquip_All"] = () => {
                        for (const element of equip_list) {
                          EquipHuntloot(0, element.hero_id, element.suit_id, _part);
                        }
                      };
                    }
                    if (Object.keys(menus).length > 0) {
                      CustomUIConfig.showContextMenu(p, menus);
                    }
                  });
                  libs.insert(_el$88, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(huntloot, {
                    get equipped() {
                      return heroHuntlootEquiped();
                    }
                  })), _el$89);
                  libs.effect(_$p => libs.setProp(_el$88, "class", libs.classNames("Item", {
                    Selected: select(),
                    Gray: gray()
                  }), _$p));
                  return _el$88;
                })();
              }
            });
          }
        })];
      }
    }), null);
    libs.insert(_el$75, libs.createComponent(libs.For, {
      get each() {
        return libs.memo(() => selectedItemTab() == "equipment")() ? [0, ...equipment_utils.EQUIP_PARTS] : selectedItemTab() == "huntloot" ? [0, ...huntloot_details.HUNTLOOT_PARTS] : [0, 5, 6, 7];
      },
      children: part => {
        return (() => {
          const _el$90 = libs.createElement("Button", {
              get id() {
                return part.toString();
              },
              get ["class"]() {
                return libs.classNames("PartTab", {
                  Selected: partFilter() == part
                });
              }
            }, null),
            _el$91 = libs.createElement("Image", {
              id: "PartIcon",
              get src() {
                return getSrcPath(`conv/icon/${selectedItemTab() == "huntloot" && part > 0 ? HUNTLOOT_SLOT_ICON[part] : selectedItemTab() == "equipment" || part == 0 ? EQUIP_PART_ICON[part] : GEM_RARITY_ICON[part]}`);
              }
            }, _el$90);
          libs.setProp(_el$90, "onactivate", () => {
            if (selectedItemTab() == "equipment" && part == 0) {
              setSelectedSlot();
            }
            setPartFilter(part);
          });
          libs.effect(_p$ => {
            const _v$25 = part.toString(),
              _v$26 = libs.classNames("PartTab", {
                Selected: partFilter() == part
              }),
              _v$27 = getSrcPath(`conv/icon/${selectedItemTab() == "huntloot" && part > 0 ? HUNTLOOT_SLOT_ICON[part] : selectedItemTab() == "equipment" || part == 0 ? EQUIP_PART_ICON[part] : GEM_RARITY_ICON[part]}`);
            _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$90, "id", _v$25, _p$._v$25));
            _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$90, "class", _v$26, _p$._v$26));
            _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$91, "src", _v$27, _p$._v$27));
            return _p$;
          }, {
            _v$25: undefined,
            _v$26: undefined,
            _v$27: undefined
          });
          return _el$90;
        })();
      }
    }));
    libs.setProp(_el$77, "align", "center center");
    libs.setProp(_el$77, "flowChildren", "right");
    libs.insert(_el$77, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
      id: "FilterBtn",
      get ["class"]() {
        return libs.classNames({
          ShowBtnBorder: showFilter()
        });
      },
      get text() {
        return GetLocalization("#Hud_Equipment_Filter");
      },
      get enabled() {
        return libs.memo(() => selectedItemTab() == "gem")() ? !gemFilterRequesting() : libs.memo(() => selectedItemTab() == "huntloot")() ? true : !equipmentDetailsLoading();
      },
      onactivate: () => {
        if (showFilter() && selectedItemTab() == "gem") {
          applyGemEntryFilter();
          return;
        }
        setShowFilter(prev => {
          return !prev;
        });
      }
    }), _el$78);
    libs.setProp(_el$78, "onactivate", () => {
      libs.batch(() => {
        setAppliedGemFilter(undefined);
        setGemFilterRequesting(false);
        setFilterNeedLv({});
        setFilterRarity({});
        setFilterGemMainEntry({});
        setFilterGemClass({});
        setFilterGemSubEntry({});
        setFilterGemChaosEntry({});
        setFilterGemChaosAny(false);
        setFilterGemMainRanges({});
        setFilterGemSubRanges({});
        setFilteredGemIDs();
        setFilterEquipSubEntry({});
        setFilterEquipSubRanges({});
        setFilterHuntlootRarity({});
        setFilterHuntlootClass({});
        setFilterHuntlootAdverb({});
        setFilterHuntlootSpell({});
        setFilterClass({});
        setFilterSuit({});
        setFilterMythText("");
        setResterFilter(prev => {
          return prev += 1;
        });
      });
    });
    libs.insert(_el$77, libs.createComponent(libs.Show, {
      get when() {
        return selectedItemTab() == "equipment";
      },
      get children() {
        return libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          get text() {
            return selectedItemData()?.locked ? "#Hud_Equipment_Unlock" : "#Hud_Equipment_Lock";
          },
          get enabled() {
            return selectedItemID() != undefined;
          },
          onactivate: () => {
            const id = selectedItemID();
            if (id) {
              LockEquipment(id, !player_equipments()[id].locked);
            }
          }
        });
      }
    }), null);
    libs.insert(_el$77, libs.createComponent(libs.Show, {
      get when() {
        return selectedItemTab() == "gem";
      },
      get children() {
        return libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          get text() {
            return player_gems()[selectedGemList()[0]]?.locked ? "#Hud_Equipment_Unlock" : "#Hud_Equipment_Lock";
          },
          get enabled() {
            return selectedGemList()[0] != undefined;
          },
          onactivate: () => {
            const id = selectedGemList()[0];
            if (id) {
              LockGem(id, !player_gems()[id].locked);
            }
          }
        });
      }
    }), null);
    libs.insert(_el$77, libs.createComponent(libs.Show, {
      get when() {
        return selectedItemTab() == "huntloot";
      },
      get children() {
        return libs.createComponent(equipment_comp.EquipmentCommonBtn, {
          get text() {
            return player_huntloots()[selectedItemID() ?? 0]?.locked ? "#Hud_Equipment_Unlock" : "#Hud_Equipment_Lock";
          },
          get enabled() {
            return selectedItemID() != undefined;
          },
          onactivate: () => {
            const id = selectedItemID();
            if (id) {
              LockHuntloot(id, !player_huntloots()[id].locked);
            }
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$22 = libs.classNames("RootWindow", {
          Hidden: !showItemsRoot() || hiddenItemList()
        }),
        _v$23 = libs.classNames({
          Gem: selectedItemTab() == "gem"
        }),
        _v$24 = !gemFilterRequesting();
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$72, "class", _v$22, _p$._v$22));
      _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$75, "class", _v$23, _p$._v$23));
      _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$78, "enabled", _v$24, _p$._v$24));
      return _p$;
    }, {
      _v$22: undefined,
      _v$23: undefined,
      _v$24: undefined
    });
    return _el$72;
  })();
}
function FilterWindow() {
  const chaosEntries = Object.values(KeyValues.gem_entry_suit).sort((a, b) => a.id - b.id);
  const updateChaosRange = (entryID, patch) => {
    setFilterGemChaosEntry(prev => ({
      ...prev,
      [entryID]: {
        ...(prev[entryID] ?? {
          selected: false,
          min: "",
          max: ""
        }),
        ...patch
      }
    }));
  };
  let needLvFilter;
  const needLvText = libs.createMemo(() => {
    let list = [];
    for (const [k, v] of Object.entries(filterNeedLv())) {
      if (v) {
        list.push(k);
      }
    }
    return list.toString();
  });
  libs.onMount(() => {
    const scheduleID = $.Schedule(0.2, () => {
      needLvFilter?.setSelect(filterNeedLv());
    });
    libs.onCleanup(() => {
      $.CancelScheduled(scheduleID);
    });
  });
  libs.createEffect(() => {
    resetFilter();
    needLvFilter?.reset();
  });
  const selectGemSubEntryFilter = (entryID, mode) => {
    setFilterGemSubEntry(prev => {
      const next = {
        ...prev
      };
      if (mode === "default") {
        delete next[entryID];
      } else {
        next[entryID] = mode;
      }
      return next;
    });
  };
  const selectEquipSubEntryFilter = (entryID, mode) => {
    setFilterEquipSubEntry(prev => {
      const next = {
        ...prev
      };
      if (mode === "default") {
        delete next[entryID];
      } else {
        next[entryID] = mode;
      }
      return next;
    });
  };
  return (() => {
    const _el$92 = libs.createElement("Panel", {
      id: "FilterWindow"
    }, null);
    libs.insert(_el$92, libs.createComponent(libs.Show, {
      get when() {
        return selectedItemTab() === "huntloot";
      },
      get children() {
        return libs.createComponent(HuntlootFilterContent, {
          rarity: filterHuntlootRarity,
          setRarity: setFilterHuntlootRarity,
          classFilter: filterHuntlootClass,
          setClassFilter: setFilterHuntlootClass,
          adverb: filterHuntlootAdverb,
          setAdverb: setFilterHuntlootAdverb,
          spell: filterHuntlootSpell,
          setSpell: setFilterHuntlootSpell
        });
      }
    }), null);
    libs.insert(_el$92, libs.createComponent(libs.Show, {
      get when() {
        return selectedItemTab() !== "huntloot";
      },
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return selectedItemTab() == "equipment";
          },
          get fallback() {
            return (() => {
              const _el$112 = libs.createElement("Panel", {
                  id: "GemFilterContent",
                  "class": "VerticalScrollStyle",
                  scroll: "y"
                }, null),
                _el$113 = libs.createElement("Label", {
                  id: "GemClassFilterLabel",
                  "class": "Subheading",
                  get text() {
                    return GetLocalization("#Gem_Class_Filter");
                  }
                }, _el$112);
                libs.createElement("Panel", {
                  "class": "Separator FilterLine"
                }, _el$112);
                const _el$115 = libs.createElement("Panel", {
                  id: "GemClassFilterList",
                  "class": "CheckBoxList"
                }, _el$112),
                _el$116 = libs.createElement("Label", {
                  id: "GemMainEntryFilterLabel",
                  "class": "Subheading",
                  get text() {
                    return GetLocalization("#Equipment_SelectMainEntry");
                  }
                }, _el$112);
                libs.createElement("Panel", {
                  "class": "Separator FilterLine"
                }, _el$112);
                const _el$118 = libs.createElement("Label", {
                  "class": "GemChaosFilterError",
                  get text() {
                    return GetLocalization("#ItemFilter_InvalidRange");
                  }
                }, _el$112),
                _el$119 = libs.createElement("Panel", {
                  id: "GemMainEntryFilterList"
                }, _el$112),
                _el$120 = libs.createElement("Label", {
                  "class": "Subheading",
                  get text() {
                    return GetLocalization("#Gem_ChaosFilter_Title");
                  }
                }, _el$112),
                _el$121 = libs.createElement("Label", {
                  "class": "GemChaosFilterHint",
                  get text() {
                    return GetLocalization("#Gem_ChaosFilter_Hint");
                  }
                }, _el$112),
                _el$122 = libs.createElement("Label", {
                  "class": "GemChaosFilterError",
                  get text() {
                    return GetLocalization("#Gem_ChaosFilter_InvalidRange");
                  }
                }, _el$112),
                _el$123 = libs.createElement("Panel", {
                  id: "GemChaosEntryFilterList"
                }, _el$112),
                _el$124 = libs.createElement("Panel", {
                  id: "GemSubEntryFilterTitle"
                }, _el$112);
                libs.createElement("Panel", {
                  "class": "Separator"
                }, _el$124);
                libs.createElement("Label", {
                  text: "#Equipment_GemSubFilter_Title"
                }, _el$124);
                libs.createElement("Panel", {
                  "class": "Separator"
                }, _el$124);
                const _el$128 = libs.createElement("Panel", {
                  id: "GemSubEntryFilterList",
                  "class": "VerticalScrollStyle",
                  scroll: "y"
                }, _el$112);
              libs.setProp(_el$112, "scroll", "y");
              libs.insert(_el$115, libs.createComponent(libs.For, {
                each: GEM_CLASSES,
                children: gemClass => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  get checked() {
                    return filterGemClass()[gemClass] ?? false;
                  },
                  get text() {
                    return LocalizeWithVars("#Gem_Class_Value", {
                      value: gemClass + 10
                    });
                  },
                  onchecked: checked => {
                    if (checked) {
                      setFilterGemClass(prev => ({
                        ...prev,
                        [gemClass]: true
                      }));
                    } else {
                      const next = {
                        ...filterGemClass()
                      };
                      delete next[gemClass];
                      setFilterGemClass(next);
                    }
                  }
                })
              }));
              libs.insert(_el$119, libs.createComponent(libs.For, {
                each: GEM_MAIN_ENTRY_IDS,
                children: entryID => (() => {
                  const _el$129 = libs.createElement("Panel", {
                    "class": "GemEntryValueRow"
                  }, null);
                  libs.insert(_el$129, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                    "class": "GemEntryValueName",
                    get checked() {
                      return filterGemMainEntry()[entryID] ?? false;
                    },
                    get text() {
                      return GetLocalization("#property_" + entryID).replace("%", "");
                    },
                    onchecked: checked => setFilterGemMainEntry(prev => ({
                      ...prev,
                      [entryID]: checked
                    }))
                  }), null);
                  libs.insert(_el$129, libs.createComponent(entry_range_inputs.EntryRangeInputs, {
                    get range() {
                      return filterGemMainRanges()[entryID];
                    },
                    get unit() {
                      return GetLocalization(`#property_${entryID}`).startsWith("%") ? "%" : "";
                    },
                    onChange: range => libs.batch(() => {
                      setFilterGemMainRanges(prev => ({
                        ...prev,
                        [entryID]: range
                      }));
                      if (range.min.trim() || range.max.trim()) setFilterGemMainEntry(prev => ({
                        ...prev,
                        [entryID]: true
                      }));
                    })
                  }), null);
                  return _el$129;
                })()
              }));
              libs.insert(_el$112, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                "class": "GemChaosMatchAny",
                get checked() {
                  return filterGemChaosAny();
                },
                get text() {
                  return GetLocalization("#Gem_ChaosFilter_MatchAny");
                },
                onchecked: checked => setFilterGemChaosAny(checked)
              }), _el$122);
              libs.insert(_el$123, libs.createComponent(libs.For, {
                each: chaosEntries,
                children: entry => {
                  const range = () => filterGemChaosEntry()[entry.entry_id];
                  return (() => {
                    const _el$130 = libs.createElement("Panel", {
                        "class": "GemChaosEntryFilterRow"
                      }, null),
                      _el$131 = libs.createElement("Label", {
                        "class": "GemChaosRangeSeparator",
                        text: "~"
                      }, _el$130);
                    libs.insert(_el$130, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                      "class": "GemChaosEntryName",
                      get checked() {
                        return range()?.selected ?? false;
                      },
                      get text() {
                        return GetLocalization(`#${entry.entry_id}`, entry.name);
                      },
                      onchecked: selected => updateChaosRange(entry.entry_id, {
                        selected
                      })
                    }), _el$131);
                    libs.insert(_el$130, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
                      "class": "GemChaosValue",
                      get text() {
                        return range()?.min ?? "";
                      },
                      get placeholder() {
                        return GetLocalization("#Gem_ChaosFilter_Min");
                      },
                      onChange: (_, __, min) => updateChaosRange(entry.entry_id, {
                        min
                      })
                    }), _el$131);
                    libs.insert(_el$130, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
                      "class": "GemChaosValue",
                      get text() {
                        return range()?.max ?? "";
                      },
                      get placeholder() {
                        return GetLocalization("#Gem_ChaosFilter_Max");
                      },
                      onChange: (_, __, max) => updateChaosRange(entry.entry_id, {
                        max
                      })
                    }), null);
                    return _el$130;
                  })();
                }
              }));
              libs.setProp(_el$128, "scroll", "y");
              libs.insert(_el$128, libs.createComponent(libs.For, {
                each: GEM_SUB_ENTRY_IDS,
                children: entryID => {
                  const mode = () => filterGemSubEntry()[entryID] ?? "default";
                  return (() => {
                    const _el$132 = libs.createElement("Panel", {
                        "class": "GemSubEntryRule"
                      }, null),
                      _el$133 = libs.createElement("Panel", {
                        "class": "GemSubEntryFilterRow"
                      }, _el$132),
                      _el$134 = libs.createElement("Label", {
                        "class": "GemSubEntryName",
                        get text() {
                          return GetLocalization("#property_" + entryID).replace("%", "");
                        },
                        html: true
                      }, _el$133),
                      _el$135 = libs.createElement("Panel", {
                        "class": "GemSubEntryMode"
                      }, _el$133);
                    libs.insert(_el$135, libs.createComponent(libs.For, {
                      each: GEM_SUB_ENTRY_FILTER_MODES,
                      children: (filterMode, index) => [(() => {
                        const _el$136 = libs.createElement("Button", {
                            get ["class"]() {
                              return libs.classNames("GemSubEntryModeButton", filterMode, {
                                Selected: mode() === filterMode
                              });
                            }
                          }, null),
                          _el$137 = libs.createElement("Label", {
                            get text() {
                              return GetLocalization(`#Equipment_GemSubFilter_${filterMode}`);
                            }
                          }, _el$136);
                        libs.setProp(_el$136, "onactivate", () => selectGemSubEntryFilter(entryID, filterMode));
                        libs.effect(_p$ => {
                          const _v$40 = libs.classNames("GemSubEntryModeButton", filterMode, {
                              Selected: mode() === filterMode
                            }),
                            _v$41 = GetLocalization(`#Equipment_GemSubFilter_${filterMode}`);
                          _v$40 !== _p$._v$40 && (_p$._v$40 = libs.setProp(_el$136, "class", _v$40, _p$._v$40));
                          _v$41 !== _p$._v$41 && (_p$._v$41 = libs.setProp(_el$137, "text", _v$41, _p$._v$41));
                          return _p$;
                        }, {
                          _v$40: undefined,
                          _v$41: undefined
                        });
                        return _el$136;
                      })(), libs.createComponent(libs.Show, {
                        get when() {
                          return index() < GEM_SUB_ENTRY_FILTER_MODES.length - 1;
                        },
                        get children() {
                          return libs.createElement("Label", {
                            "class": "GemSubEntryModeSeparator",
                            text: "/"
                          }, null);
                        }
                      })]
                    }));
                    libs.insert(_el$132, libs.createComponent(libs.Show, {
                      get when() {
                        return mode() === "include";
                      },
                      get children() {
                        return libs.createComponent(entry_range_inputs.EntryRangeInputs, {
                          get range() {
                            return filterGemSubRanges()[entryID];
                          },
                          get unit() {
                            return GetLocalization(`#property_${entryID}`).startsWith("%") ? "%" : "";
                          },
                          onChange: range => setFilterGemSubRanges(prev => ({
                            ...prev,
                            [entryID]: range
                          }))
                        });
                      }
                    }), null);
                    libs.effect(_$p => libs.setProp(_el$134, "text", GetLocalization("#property_" + entryID).replace("%", ""), _$p));
                    return _el$132;
                  })();
                }
              }));
              libs.effect(_p$ => {
                const _v$32 = GetLocalization("#Gem_Class_Filter"),
                  _v$33 = GetLocalization("#Equipment_SelectMainEntry"),
                  _v$34 = hasInvalidGemValueRange(),
                  _v$35 = GetLocalization("#ItemFilter_InvalidRange"),
                  _v$36 = GetLocalization("#Gem_ChaosFilter_Title"),
                  _v$37 = GetLocalization("#Gem_ChaosFilter_Hint"),
                  _v$38 = hasInvalidGemChaosRange(),
                  _v$39 = GetLocalization("#Gem_ChaosFilter_InvalidRange");
                _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$113, "text", _v$32, _p$._v$32));
                _v$33 !== _p$._v$33 && (_p$._v$33 = libs.setProp(_el$116, "text", _v$33, _p$._v$33));
                _v$34 !== _p$._v$34 && (_p$._v$34 = libs.setProp(_el$118, "visible", _v$34, _p$._v$34));
                _v$35 !== _p$._v$35 && (_p$._v$35 = libs.setProp(_el$118, "text", _v$35, _p$._v$35));
                _v$36 !== _p$._v$36 && (_p$._v$36 = libs.setProp(_el$120, "text", _v$36, _p$._v$36));
                _v$37 !== _p$._v$37 && (_p$._v$37 = libs.setProp(_el$121, "text", _v$37, _p$._v$37));
                _v$38 !== _p$._v$38 && (_p$._v$38 = libs.setProp(_el$122, "visible", _v$38, _p$._v$38));
                _v$39 !== _p$._v$39 && (_p$._v$39 = libs.setProp(_el$122, "text", _v$39, _p$._v$39));
                return _p$;
              }, {
                _v$32: undefined,
                _v$33: undefined,
                _v$34: undefined,
                _v$35: undefined,
                _v$36: undefined,
                _v$37: undefined,
                _v$38: undefined,
                _v$39: undefined
              });
              return _el$112;
            })();
          },
          get children() {
            const _el$93 = libs.createElement("Panel", {
                id: "EquipmentFilterContent",
                "class": "VerticalScrollStyle",
                scroll: "y"
              }, null),
              _el$94 = libs.createElement("Panel", {
                id: "NeedLvFilter",
                "class": "Filter"
              }, _el$93);
              libs.createElement("Label", {
                id: "FilterType",
                text: "#NeedLvFilter"
              }, _el$94);
              libs.createElement("Label", {
                id: "RarityLabel",
                "class": "Subheading",
                text: "#Equipment_Rarity"
              }, _el$93);
              libs.createElement("Panel", {
                "class": "Separator FilterLine"
              }, _el$93);
              const _el$98 = libs.createElement("Panel", {
                id: "RarityFilterList",
                "class": "CheckBoxList"
              }, _el$93),
              _el$99 = libs.createElement("Label", {
                id: "RarityLabel",
                "class": "Subheading",
                text: "#Equipment_Class"
              }, _el$93);
              libs.createElement("Panel", {
                "class": "Separator FilterLine"
              }, _el$93);
              const _el$101 = libs.createElement("Panel", {
                id: "ClassFilterList",
                "class": "CheckBoxList"
              }, _el$93);
              libs.createElement("Label", {
                id: "RarityLabel",
                "class": "Subheading",
                text: "#Equipment_Suit"
              }, _el$93);
              libs.createElement("Panel", {
                "class": "Separator FilterLine"
              }, _el$93);
              const _el$104 = libs.createElement("Panel", {
                id: "SuitFilterList",
                "class": "CheckBoxList"
              }, _el$93),
              _el$105 = libs.createElement("Label", {
                id: "MythFilterLabel",
                "class": "Subheading",
                get text() {
                  return GetLocalization("#Equipment_MythFilter");
                }
              }, _el$93);
              libs.createElement("Panel", {
                "class": "Separator FilterLine"
              }, _el$93);
              const _el$107 = libs.createElement("Panel", {
                id: "MythTextFilter",
                "class": "ExchangeEntry"
              }, _el$93),
              _el$108 = libs.createElement("Label", {
                "class": "Subheading",
                get text() {
                  return GetLocalization("#Equipment_GemSubFilter_Title");
                }
              }, _el$93);
              libs.createElement("Panel", {
                "class": "Separator FilterLine"
              }, _el$93);
              const _el$110 = libs.createElement("Label", {
                "class": "EquipmentFilterError",
                get text() {
                  return GetLocalization("#ItemFilter_InvalidRange");
                }
              }, _el$93),
              _el$111 = libs.createElement("Panel", {
                id: "EquipmentSubEntryFilterList"
              }, _el$93);
            libs.setProp(_el$93, "scroll", "y");
            libs.insert(_el$94, libs.createComponent(EOM_MultiDropDown.EOM_MultiDropDown, {
              get placeholder() {
                return needLvText();
              },
              ref(r$) {
                const _ref$ = needLvFilter;
                typeof _ref$ === "function" ? _ref$(r$) : needLvFilter = r$;
              },
              options: NEEDLV_LIST,
              onChange: value => {
                setFilterNeedLv(value);
              }
            }), null);
            libs.insert(_el$98, libs.createComponent(libs.For, {
              each: equipment_utils.EQUIP_RARITY_COLOR,
              children: (color, idx) => {
                let rarity = idx() + 1;
                return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  "class": "Rarity" + rarity,
                  get checked() {
                    return filterRarity()[rarity] ?? false;
                  },
                  get text() {
                    return GetLocalization(`#Equipment_Rarity_${rarity}`);
                  },
                  onchecked: b => {
                    if (b) {
                      setFilterRarity(prev => ({
                        ...prev,
                        [rarity]: b
                      }));
                    } else {
                      const newRarity = {
                        ...filterRarity()
                      };
                      delete newRarity[rarity];
                      setFilterRarity(newRarity);
                    }
                  }
                });
              }
            }));
            libs.setProp(_el$99, "tooltip", "#Equipment_Class_Desc");
            libs.insert(_el$101, libs.createComponent(libs.For, {
              get each() {
                return Object.keys(GameUI.CustomUIConfig().equip_class_setting);
              },
              children: (equipClass, idx) => {
                return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  get checked() {
                    return filterClass()[Number(equipClass)] ?? false;
                  },
                  text: equipClass,
                  onchecked: b => {
                    if (b) {
                      setFilterClass(prev => ({
                        ...prev,
                        [Number(equipClass)]: b
                      }));
                    } else {
                      const newClass = {
                        ...filterClass()
                      };
                      delete newClass[Number(equipClass)];
                      setFilterClass(newClass);
                    }
                  }
                });
              }
            }));
            libs.insert(_el$104, libs.createComponent(libs.For, {
              get each() {
                return Object.keys(KeyValues.equipment_suit_effect);
              },
              children: suitID => {
                return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                  get checked() {
                    return filterSuit()[suitID] ?? false;
                  },
                  get text() {
                    return GetLocalization("#" + suitID);
                  },
                  onchecked: b => {
                    if (b) {
                      setFilterSuit(prev => ({
                        ...prev,
                        [suitID]: b
                      }));
                    } else {
                      const newSuit = {
                        ...filterSuit()
                      };
                      delete newSuit[suitID];
                      setFilterSuit(newSuit);
                    }
                  }
                });
              }
            }));
            libs.insert(_el$107, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
              id: "ExchangeTextEntry",
              style: {
                border: "0px",
                backgroundColor: "none"
              },
              get className() {
                return Language();
              },
              placeholder: "#Equipment_MythFilter_Placeholder",
              onChange: (_, __, text) => setFilterMythText(text)
            }));
            libs.insert(_el$111, libs.createComponent(libs.For, {
              each: EQUIP_SUB_ENTRY_LIST,
              children: entry => {
                const mode = () => filterEquipSubEntry()[entry.entry_name] ?? "default";
                return (() => {
                  const _el$139 = libs.createElement("Panel", {
                      "class": "EquipmentSubEntryRule"
                    }, null),
                    _el$140 = libs.createElement("Panel", {
                      "class": "EquipmentSubEntryFilterRow"
                    }, _el$139),
                    _el$141 = libs.createElement("Label", {
                      html: true,
                      "class": "EquipmentSubEntryName",
                      get text() {
                        return GetLocalization(`#property_${entry.entry_name}`).replace("%", "");
                      }
                    }, _el$140),
                    _el$142 = libs.createElement("Panel", {
                      "class": "EquipmentSubEntryMode"
                    }, _el$140);
                  libs.insert(_el$142, libs.createComponent(libs.For, {
                    each: EQUIP_SUB_ENTRY_FILTER_MODES,
                    children: (filterMode, index) => (() => {
                      const _el$143 = libs.createElement("Panel", {
                          "class": "EquipmentSubEntryModeOption"
                        }, null),
                        _el$144 = libs.createElement("Button", {
                          get ["class"]() {
                            return libs.classNames("EquipmentSubEntryModeButton", filterMode, {
                              Selected: mode() === filterMode
                            });
                          }
                        }, _el$143),
                        _el$145 = libs.createElement("Label", {
                          get text() {
                            return GetLocalization(`#Equipment_GemSubFilter_${filterMode}`);
                          }
                        }, _el$144);
                      libs.setProp(_el$144, "onactivate", () => selectEquipSubEntryFilter(entry.entry_name, filterMode));
                      libs.insert(_el$143, libs.createComponent(libs.Show, {
                        get when() {
                          return index() < EQUIP_SUB_ENTRY_FILTER_MODES.length - 1;
                        },
                        get children() {
                          return libs.createElement("Label", {
                            "class": "EquipmentSubEntryModeSeparator",
                            text: "/"
                          }, null);
                        }
                      }), null);
                      libs.effect(_p$ => {
                        const _v$42 = libs.classNames("EquipmentSubEntryModeButton", filterMode, {
                            Selected: mode() === filterMode
                          }),
                          _v$43 = GetLocalization(`#Equipment_GemSubFilter_${filterMode}`);
                        _v$42 !== _p$._v$42 && (_p$._v$42 = libs.setProp(_el$144, "class", _v$42, _p$._v$42));
                        _v$43 !== _p$._v$43 && (_p$._v$43 = libs.setProp(_el$145, "text", _v$43, _p$._v$43));
                        return _p$;
                      }, {
                        _v$42: undefined,
                        _v$43: undefined
                      });
                      return _el$143;
                    })()
                  }));
                  libs.insert(_el$139, libs.createComponent(libs.Show, {
                    get when() {
                      return mode() === "include";
                    },
                    get children() {
                      return libs.createComponent(entry_range_inputs.EntryRangeInputs, {
                        get range() {
                          return filterEquipSubRanges()[entry.entry_name];
                        },
                        get unit() {
                          return GetLocalization(`#property_${entry.entry_name}`).startsWith("%") ? "%" : "";
                        },
                        onChange: range => setFilterEquipSubRanges(prev => ({
                          ...prev,
                          [entry.entry_name]: range
                        }))
                      });
                    }
                  }), null);
                  libs.effect(_$p => libs.setProp(_el$141, "text", GetLocalization(`#property_${entry.entry_name}`).replace("%", ""), _$p));
                  return _el$139;
                })();
              }
            }));
            libs.effect(_p$ => {
              const _v$28 = GetLocalization("#Equipment_MythFilter"),
                _v$29 = GetLocalization("#Equipment_GemSubFilter_Title"),
                _v$30 = hasInvalidEquipValueRange(),
                _v$31 = GetLocalization("#ItemFilter_InvalidRange");
              _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$105, "text", _v$28, _p$._v$28));
              _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$108, "text", _v$29, _p$._v$29));
              _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$110, "visible", _v$30, _p$._v$30));
              _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$110, "text", _v$31, _p$._v$31));
              return _p$;
            }, {
              _v$28: undefined,
              _v$29: undefined,
              _v$30: undefined,
              _v$31: undefined
            });
            return _el$93;
          }
        });
      }
    }), null);
    return _el$92;
  })();
}
function EquipForge() {
  const equipTabs = ["ClassUP", "RarityUP", "Recast", "Refine", "Inlay", "Fusion"];
  const gemTabs = ["GemLevelUP", "GemMake"];
  const huntlootTabs = ["Devour"];
  const tabTipsMap = {
    "ClassUP": "#EquipClassUpTips",
    "RarityUP": "#EquipRarityUpgradeTips",
    "Recast": "#EquipRecastTips",
    "Refine": "#EquipRefineTips",
    "Inlay": "#EquipInlayTips",
    "Fusion": "#EquipFusionTips",
    "GemLevelUP": "#GemLevelUPTips",
    "GemMake": "#GemMakeTips",
    "Devour": "#HuntlootDevour_Tips"
  };
  const {
    itemData,
    forceFresh
  } = equipment_comp.createEquipDetailSignal(selectedItemID);
  const {
    gemData,
    forceFresh: forceGemFresh
  } = equipment_comp.createGemDetailSignal(() => selectedGemList()[0]);
  const {
    huntlootData,
    forceFresh: forceHuntlootFresh
  } = huntloot_details.createHuntlootDetailSignal(selectedItemID);
  const [showAnim, setShowAnim] = libs.createSignal(false);
  const [skipForgeAnimation, setSkipForgeAnimation] = libs.createSignal(false);
  const [forgeRequestPending, setForgeRequestPending] = libs.createSignal(false);
  const [leftExtraContent, setLeftExtraContent] = libs.createSignal();
  const fusionResults = solid_utils.createServiceNetData("player_gem_fusion_results", {});
  const [confirmedFusionEquipmentID, setConfirmedFusionEquipmentID] = libs.createSignal();
  libs.createEffect(() => {
    const confirmedID = confirmedFusionEquipmentID();
    const equipment = itemData();
    if (confirmedID != undefined && equipment?.id === confirmedID && equipment.in_check !== "gem_fusion") {
      setConfirmedFusionEquipmentID();
    }
  });
  const showGemDisplayData = libs.createMemo(() => {
    const childTab = forgeChildTab();
    return (childTab == undefined || gemTabs.includes(childTab)) && selectedItemTab() === "gem";
  });
  const showHuntlootDisplayData = libs.createMemo(() => {
    return selectedItemTab() === "huntloot";
  });
  const newTabs = libs.createMemo(() => {
    if (showHuntlootDisplayData()) {
      return huntlootTabs;
    }
    return showGemDisplayData() ? gemTabs : equipTabs;
  });
  const isGemSwapMode = libs.createMemo(() => forgeChildTab() == "Inlay" && selectedItemList().length > 0);
  const displayData = libs.createMemo(() => {
    if (showAnim() || forgeRequestPending()) {
      return libs.untrack(() => itemData());
    }
    return itemData();
  });
  const displayGemData = libs.createMemo(() => {
    if (showAnim() || forgeRequestPending()) {
      return libs.untrack(() => gemData());
    }
    if (gemData() == undefined) {
      return "undefined";
    }
    return gemData();
  });
  const selectedHuntloot = libs.createMemo(() => {
    const id = selectedItemID();
    return id == undefined ? undefined : player_huntloots()[id];
  });
  const displayHuntlootData = libs.createMemo(() => {
    if (showAnim() || forgeRequestPending()) {
      return libs.untrack(() => huntlootData());
    }
    const data = huntlootData();
    return data?.id === selectedItemID() ? data : undefined;
  });
  const currentFusionResult = libs.createMemo(() => {
    const equipmentID = selectedItemID();
    if (!equipmentID || confirmedFusionEquipmentID() === equipmentID || displayData()?.in_check !== "gem_fusion") return undefined;
    const result = fusionResults()[String(equipmentID)];
    return result && result !== "nil" ? result : undefined;
  });
  const fusionMaterialDisplayData = libs.createMemo(() => {
    const result = currentFusionResult();
    if (result) {
      const consumedGemData = JSON.parseSafe(result.inlay_gem_data);
      const consumedGem = normalizeEmbeddedGem({
        ...(consumedGemData ?? {}),
        id: result.consumed_gem_id
      });
      if (consumedGem) return consumedGem;
    }
    const selectedGemID = selectedGemList()[0];
    const selectedGem = gemData();
    return selectedGemID != undefined && selectedGem?.id === selectedGemID ? selectedGem : undefined;
  });
  const inlayGemData = libs.createMemo(() => {
    const data = displayData();
    if (!data) return [];
    return JSON.parseSafe(data.inlay_gems_data) ?? [];
  });
  const InlayType = libs.createMemo(() => {
    const data = displayData();
    if (!data || !canEquipPunch(data.class, data.rarity)) {
      return "None";
    }
    return inlayGemData().length == 0 ? "Punch" : "Inlay";
  });
  const [selectGemSlot, setSelectGemSlot] = libs.createSignal(0);
  const playerPrivileges = solid_utils.createPlayerNetDataSignal("common", "player_privileges", {});
  const hasFusionLockPrivilege = libs.createMemo(() => playerPrivileges()["privilege_bless_033"] === true);
  const canChooseFusionLock = libs.createMemo(() => forgeChildTab() === "Fusion" && hasFusionLockPrivilege() && !currentFusionResult() && displayData()?.in_check !== "gem_fusion");
  const fusionEmbeddedGem = libs.createMemo(() => normalizeEmbeddedGem(inlayGemData()[selectGemSlot()]));
  const [selectedFusionLock, setSelectedFusionLock] = libs.createSignal();
  const activeFusionLock = libs.createMemo(() => {
    const selection = selectedFusionLock();
    if (!selection || !canChooseFusionLock()) return undefined;
    const gem = selection.source === 1 ? fusionEmbeddedGem() : fusionMaterialDisplayData();
    if (gem?.id !== selection.gemId || gem.chaos_entry_data?.[selection.entryIndex]?.id !== selection.entryId) return undefined;
    return selection;
  });
  libs.createEffect(libs.on([selectedItemID, selectGemSlot, forgeChildTab, hasFusionLockPrivilege], () => setSelectedFusionLock(), {
    defer: true
  }));
  libs.createEffect(libs.on(() => selectedGemList()[0], () => {
    if (selectedFusionLock()?.source === 2) setSelectedFusionLock();
  }, {
    defer: true
  }));
  libs.createEffect(libs.on([forgeChildTab], ([forgeChildTab]) => {
    if (forgeChildTab == "Devour") {
      setItemListIsHidden(false);
      setLockItemTab(true);
      setSelectedItemTab("huntloot");
    } else if (forgeChildTab != "Inlay" && forgeChildTab != "Fusion") {
      setItemListIsHidden(forgeChildTab != undefined);
    }
    setLeftExtraContent();
  }));
  libs.createEffect(libs.on([displayData], ([data]) => {
    const pendingForgeTab = getPendingForgeTab(data);
    if (pendingForgeTab && forgeChildTab() !== pendingForgeTab) {
      if (pendingForgeTab === "Fusion") {
        setSelectedGemList([]);
      }
      setForgeChildTab(pendingForgeTab);
    }
  }));
  libs.createEffect(libs.on([displayHuntlootData], ([data]) => {
    if ((data?.in_check === "huntloot_devour" || data?.in_check === "devour") && forgeChildTab() !== "Devour") {
      setForgeChildTab("Devour");
    }
  }));
  let chuiziParticle;
  let forgeParticle;
  let forgeAnimCancelled = false;
  const cancelForgeAnimation = () => {
    if (!showAnim() && !forgeRequestPending()) return;
    forgeAnimCancelled = true;
    chuiziParticle?.StopParticlesImmediately(true);
    libs.batch(() => {
      setShowAnim(false);
      setForgeRequestPending(false);
    });
  };
  libs.createEffect(libs.on(show, isShow => {
    if (!isShow) cancelForgeAnimation();
  }));
  libs.onCleanup(cancelForgeAnimation);
  const startForgeAnimation = async requestFn => {
    forgeAnimCancelled = false;
    const skipAnimation = skipForgeAnimation();
    if (skipAnimation) {
      forgeParticle?.RemoveClass("Show");
      setForgeRequestPending(true);
      try {
        await requestFn();
        if (!forgeAnimCancelled) {
          libs.batch(() => {
            forceFresh();
            forceGemFresh();
            forceHuntlootFresh();
          });
        }
      } finally {
        setForgeRequestPending(false);
      }
      return;
    }
    chuiziParticle?.StartParticles();
    setShowAnim(true);
    await Promise.all([requestFn(), new Promise(resolve => $.Schedule(1.8, resolve)), (async () => {
      for (let i = 0; i < 3; i++) {
        if (forgeAnimCancelled) return;
        Game.EmitSound("DOTA_Item.HavocHammer.Cast");
        await Timer.Wait(0.6);
      }
    })()]);
    if (forgeAnimCancelled) return;
    if (forgeParticle) {
      forgeParticle.AddClass("Show");
      forgeParticle.ReloadScene();
      Game.EmitSound("ui.treasure_01");
    }
    libs.batch(() => {
      forceFresh();
      forceGemFresh();
      forceHuntlootFresh();
      setShowAnim(false);
      chuiziParticle?.StopParticlesImmediately(true);
    });
  };
  const onReturn = () => {
    if (forgeRequestPending()) return;
    libs.batch(() => {
      const forgeTab = forgeChildTab() ?? "";
      if (equipTabs.includes(forgeTab)) {
        setSelectedItemTab("equipment");
        setSelectedGemList([]);
      } else if (gemTabs.includes(forgeTab)) {
        setSelectedItemTab("gem");
      } else if (forgeTab == "Devour") {
        setSelectedItemTab("huntloot");
      }
      setDevouredHuntlootID();
      setForgeChildTab();
      setLockItemTab(false);
      setItemListIsHidden(false);
      setShowTokens([]);
    });
  };
  const onFusionConfirmed = equipmentID => {
    setConfirmedFusionEquipmentID(equipmentID);
    forceFresh();
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "EquipForge",
    get ["class"]() {
      return libs.classNames({
        ShowAnim: showAnim(),
        GemSwapMode: isGemSwapMode()
      });
    },
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        id: "BGLight",
        particleName: "particles/ui/game/ui_game_equipment_interface_01_fx.vpcf",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), (() => {
        const _el$148 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null);
          libs.createElement("Panel", {
            id: "ForgeImage"
          }, _el$148);
          const _el$150 = libs.createElement("Panel", {
            id: "LeftArea",
            get ["class"]() {
              return libs.classNames({
                ShowAnimState: showAnim(),
                HuntlootDevourMode: showHuntlootDisplayData() && forgeChildTab() === "Devour"
              });
            }
          }, _el$148);
        libs.setProp(_el$148, "onDragEnter", (pPanel, draggedPanel) => {
          if (LoadData(draggedPanel, "equip")) {
            pPanel.AddClass("potential_drop_target");
          }
        });
        libs.setProp(_el$148, "onDragLeave", (pPanel, draggedPanel) => {
          pPanel.RemoveClass("potential_drop_target");
        });
        libs.setProp(_el$148, "onDragDrop", (panel, draggedPanel) => {
          let equip = LoadData(draggedPanel, "equip");
          if (!equip) return;
          setSelectedItemID(equip);
        });
        libs.insert(_el$150, libs.createComponent(libs.Switch, {
          get children() {
            return [libs.createComponent(libs.Match, {
              get when() {
                return showHuntlootDisplayData();
              },
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return forgeChildTab() == "Devour" || selectedHuntloot() != undefined;
                  },
                  get fallback() {
                    return (() => {
                      const _el$158 = libs.createElement("Panel", {
                          id: "EmptyState"
                        }, null);
                        libs.createElement("Panel", {
                          id: "EmptyIcon"
                        }, _el$158);
                        libs.createElement("Label", {
                          text: "#Huntloot_SelectEmpty"
                        }, _el$158);
                      return _el$158;
                    })();
                  },
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return forgeChildTab() == "Devour";
                      },
                      get fallback() {
                        return [(() => {
                          const _el$161 = libs.createElement("Panel", {
                              id: "SelectEquipContainer"
                            }, null),
                            _el$162 = libs.createElement("Panel", {
                              horizontalAlign: "center",
                              flowChildren: "right"
                            }, _el$161),
                            _el$163 = libs.createElement("Panel", {
                              id: "SelectedEquipmentArea",
                              flowChildren: "down"
                            }, _el$162),
                            _el$164 = libs.createElement("Panel", {}, _el$163),
                            _el$165 = libs.createElement("DOTAParticleScenePanel", {
                              id: "ForgeParticle",
                              particleName: "particles/ui/game/ui_game_equipment_interface_02_fx.vpcf",
                              cameraOrigin: "0 0 350",
                              fov: 90,
                              lookAt: "0 0 0",
                              hittest: false,
                              squarePixels: true
                            }, _el$161);
                          libs.setProp(_el$161, "onload", () => Game.EmitSound("ui.blacksmith_background"));
                          libs.setProp(_el$162, "horizontalAlign", "center");
                          libs.setProp(_el$162, "flowChildren", "right");
                          libs.setProp(_el$163, "flowChildren", "down");
                          libs.setProp(_el$164, "onmouseover", p => {
                            const data = selectedHuntloot();
                            if (data) {
                              huntloot_details.ShowServerHuntlootTooltip(p, {
                                id1: data.id
                              });
                            }
                          });
                          libs.setProp(_el$164, "onmouseout", p => HideCustomTooltip(p, "server_huntloot"));
                          libs.insert(_el$164, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(() => selectedHuntloot())));
                          const _ref$4 = forgeParticle;
                          typeof _ref$4 === "function" ? libs.use(_ref$4, _el$165) : forgeParticle = _el$165;
                          return _el$161;
                        })(), libs.createComponent(libs.Show, {
                          get when() {
                            return !forgeChildTab();
                          },
                          get fallback() {
                            return leftExtraContent();
                          },
                          get children() {
                            const _el$166 = libs.createElement("Panel", {
                              id: "NewBtnListContainer"
                            }, null);
                            libs.insert(_el$166, libs.createComponent(libs.For, {
                              get each() {
                                return newTabs();
                              },
                              children: (tab, index) => {
                                const disableReasons = libs.createMemo(() => {
                                  const huntloot = displayHuntlootData();
                                  if (!huntloot) return [{
                                    key: "#Equipment_TextTips_NoData"
                                  }];
                                  return getHuntlootDisableReasons(huntloot, tab);
                                });
                                const isTabEnabled = () => disableReasons().length === 0;
                                return (() => {
                                  const _el$167 = libs.createElement("Panel", {
                                      get ["class"]() {
                                        return libs.classNames("OperateBtn", tab);
                                      },
                                      get animationDelay() {
                                        return "0s," + 0.03 * index() + "s";
                                      },
                                      get animationDuration() {
                                        return 0.03 * index() + "s, 0.5s";
                                      }
                                    }, null),
                                    _el$168 = libs.createElement("Panel", {
                                      id: "BtnImg"
                                    }, _el$167),
                                    _el$169 = libs.createElement("Panel", {
                                      id: "TabName"
                                    }, _el$167),
                                    _el$170 = libs.createElement("Label", {
                                      get text() {
                                        return GetLocalization("#Equipment_" + tab);
                                      }
                                    }, _el$169);
                                    libs.createElement("Panel", {
                                      id: "Border",
                                      hittest: false
                                    }, _el$167);
                                    libs.createElement("Panel", {
                                      id: "LockIcon",
                                      hittest: false
                                    }, _el$167);
                                  libs.setProp(_el$167, "onactivate", () => {
                                    if (!isTabEnabled()) return;
                                    setForgeChildTab(tab);
                                  });
                                  libs.setProp(_el$168, "onmouseover", p => {
                                    const tipsKey = tabTipsMap[tab];
                                    const parts = [];
                                    if (tipsKey) parts.push(GetLocalization(tipsKey));
                                    const reasons = disableReasons();
                                    if (reasons.length > 0) {
                                      parts.push(...reasons.map(r => LocalizeWithVars(r.key, r.vars ?? {})));
                                    }
                                    if (parts.length > 0) {
                                      ShowCustomTooltip(p, "text", {
                                        text: parts.join("<br>")
                                      });
                                    }
                                  });
                                  libs.setProp(_el$168, "onmouseout", p => {
                                    HideCustomTooltip(p, "text");
                                  });
                                  libs.effect(_p$ => {
                                    const _v$44 = libs.classNames("OperateBtn", tab),
                                      _v$45 = "0s," + 0.03 * index() + "s",
                                      _v$46 = 0.03 * index() + "s, 0.5s",
                                      _v$47 = isTabEnabled(),
                                      _v$48 = GetLocalization("#Equipment_" + tab);
                                    _v$44 !== _p$._v$44 && (_p$._v$44 = libs.setProp(_el$167, "class", _v$44, _p$._v$44));
                                    _v$45 !== _p$._v$45 && (_p$._v$45 = libs.setProp(_el$167, "animationDelay", _v$45, _p$._v$45));
                                    _v$46 !== _p$._v$46 && (_p$._v$46 = libs.setProp(_el$167, "animationDuration", _v$46, _p$._v$46));
                                    _v$47 !== _p$._v$47 && (_p$._v$47 = libs.setProp(_el$167, "enabled", _v$47, _p$._v$47));
                                    _v$48 !== _p$._v$48 && (_p$._v$48 = libs.setProp(_el$170, "text", _v$48, _p$._v$48));
                                    return _p$;
                                  }, {
                                    _v$44: undefined,
                                    _v$45: undefined,
                                    _v$46: undefined,
                                    _v$47: undefined,
                                    _v$48: undefined
                                  });
                                  return _el$167;
                                })();
                              }
                            }));
                            return _el$166;
                          }
                        })];
                      },
                      get children() {
                        return libs.createComponent(HuntlootDevourWindow, {
                          huntlootData: displayHuntlootData,
                          devouredHuntlootID: devouredHuntlootID,
                          setDevouredHuntlootID: setDevouredHuntlootID,
                          onRemoveTarget: () => setSelectedItemID(undefined),
                          onPreviewingChange: setHuntlootDevourPreviewing,
                          onPreviewFinished: forceHuntlootFresh,
                          onReturn: onReturn
                        });
                      }
                    });
                  }
                });
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return !showHuntlootDisplayData();
              },
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return libs.memo(() => !!showGemDisplayData())() ? displayGemData() : displayData();
                  },
                  get fallback() {
                    return (() => {
                      const _el$173 = libs.createElement("Panel", {
                          id: "EmptyState"
                        }, null);
                        libs.createElement("Panel", {
                          id: "EmptyIcon"
                        }, _el$173);
                        const _el$175 = libs.createElement("Label", {
                          get text() {
                            return showGemDisplayData() ? "#Gem_SelectEmpty" : "#Equipment_SelectEmpty";
                          }
                        }, _el$173);
                      libs.effect(_$p => libs.setProp(_el$175, "text", showGemDisplayData() ? "#Gem_SelectEmpty" : "#Equipment_SelectEmpty", _$p));
                      return _el$173;
                    })();
                  },
                  get children() {
                    return [(() => {
                      const _el$151 = libs.createElement("Panel", {
                          id: "SelectEquipContainer"
                        }, null),
                        _el$153 = libs.createElement("DOTAParticleScenePanel", {
                          id: "ForgeParticle",
                          particleName: "particles/ui/game/ui_game_equipment_interface_02_fx.vpcf",
                          cameraOrigin: "0 0 350",
                          fov: 90,
                          lookAt: "0 0 0",
                          hittest: false,
                          squarePixels: true
                        }, _el$151);
                      libs.setProp(_el$151, "onload", () => Game.EmitSound("ui.blacksmith_background"));
                      libs.insert(_el$151, libs.createComponent(libs.Show, {
                        get when() {
                          return showGemDisplayData();
                        },
                        get fallback() {
                          return (() => {
                            const _el$176 = libs.createElement("Panel", {
                                get ["class"]() {
                                  return libs.classNames({
                                    FusionSelection: forgeChildTab() == "Fusion" || forgeChildTab() == "Inlay" && displayGemData() != undefined && displayGemData() != "undefined",
                                    HasFusionLockOptions: canChooseFusionLock()
                                  });
                                },
                                horizontalAlign: "center",
                                flowChildren: "right"
                              }, null),
                              _el$177 = libs.createElement("Panel", {
                                id: "SelectedEquipmentArea",
                                flowChildren: "down"
                              }, _el$176);
                            libs.setProp(_el$176, "horizontalAlign", "center");
                            libs.setProp(_el$176, "flowChildren", "right");
                            libs.setProp(_el$177, "flowChildren", "down");
                            libs.insert(_el$177, libs.createComponent(server_equipment.Equipment, libs.mergeProps$1(() => displayData(), {
                              onmouseover: p => {
                                const data = displayData();
                                if (data) {
                                  equipment_utils.ShowServerEquipTooltip(p, {
                                    id1: data.id,
                                    hero_id: selectHeroID()
                                  });
                                }
                              },
                              onmouseout: p => HideCustomTooltip(p, "server_equip")
                            })), null);
                            libs.insert(_el$177, libs.createComponent(libs.Show, {
                              get when() {
                                return InlayType() == "Inlay";
                              },
                              get children() {
                                const _el$178 = libs.createElement("Panel", {
                                  id: "ForgeGemSlotList"
                                }, null);
                                libs.insert(_el$178, libs.createComponent(libs.For, {
                                  get each() {
                                    return Array.from({
                                      length: inlayGemData().length
                                    });
                                  },
                                  children: (_, index) => {
                                    const slotData = () => inlayGemData()[index()];
                                    const emptySlot = () => slotData()?.gem_item_id == undefined;
                                    const slotGemId = () => slotData()?.id;
                                    const fusionEligible = () => hasGemChaosEntries(inlayGemData()[index()]);
                                    const buildEmbeddedGemData = () => {
                                      const embedded = inlayGemData()[index()];
                                      if (!embedded || !embedded.gem_item_id) return undefined;
                                      const parseEntries = v => {
                                        if (!v) return [];
                                        if (typeof v === "string") return JSON.parseSafe(v) ?? [];
                                        return v;
                                      };
                                      return JSON.stringify({
                                        ...embedded,
                                        main_entry_data: parseEntries(embedded.main_entry_data),
                                        adverb_entry_data: parseEntries(embedded.adverb_entry_data),
                                        myth_entry_data: parseEntries(embedded.myth_entry_data),
                                        chaos_entry_data: parseEntries(embedded.chaos_entry_data),
                                        ability_entry_data: parseEntries(embedded.ability_entry_data)
                                      });
                                    };
                                    return (() => {
                                      const _el$186 = libs.createElement("Panel", {
                                        get ["class"]() {
                                          return libs.classNames("GemSlot", {
                                            EmptySlot: emptySlot(),
                                            Selected: forgeChildTab() == "Fusion" && selectGemSlot() == index()
                                          });
                                        }
                                      }, null);
                                      libs.setProp(_el$186, "onmouseover", p => {
                                        if (!slotGemId()) {
                                          if (buildEmbeddedGemData()) {
                                            ShowCustomTooltip(p, "server_gem", {
                                              id1: "",
                                              id2: "",
                                              embedded_gem_data: buildEmbeddedGemData()
                                            });
                                          }
                                        } else {
                                          equipment_utils.ShowServerGemTooltip(p, {
                                            id1: slotGemId(),
                                            embeddedGemData: buildEmbeddedGemData()
                                          });
                                        }
                                      });
                                      libs.setProp(_el$186, "onmouseout", p => HideCustomTooltip(p, "server_gem"));
                                      libs.setProp(_el$186, "onactivate", () => {
                                        if (displayData()?.in_check === "gem_fusion") return;
                                        if (forgeChildTab() == "Fusion" && !fusionEligible()) return;
                                        setSelectGemSlot(index());
                                        setSelectedGemList([]);
                                      });
                                      libs.insert(_el$186, libs.createComponent(libs.Show, {
                                        get when() {
                                          return !emptySlot();
                                        },
                                        get children() {
                                          return libs.createComponent(server_equipment.Gem, libs.mergeProps$1(slotData));
                                        }
                                      }));
                                      libs.effect(_p$ => {
                                        const _v$52 = libs.classNames("GemSlot", {
                                            EmptySlot: emptySlot(),
                                            Selected: forgeChildTab() == "Fusion" && selectGemSlot() == index()
                                          }),
                                          _v$53 = forgeChildTab() != "Fusion" || fusionEligible();
                                        _v$52 !== _p$._v$52 && (_p$._v$52 = libs.setProp(_el$186, "class", _v$52, _p$._v$52));
                                        _v$53 !== _p$._v$53 && (_p$._v$53 = libs.setProp(_el$186, "enabled", _v$53, _p$._v$53));
                                        return _p$;
                                      }, {
                                        _v$52: undefined,
                                        _v$53: undefined
                                      });
                                      return _el$186;
                                    })();
                                  }
                                }));
                                return _el$178;
                              }
                            }), null);
                            libs.insert(_el$177, libs.createComponent(libs.Show, {
                              get when() {
                                return canChooseFusionLock();
                              },
                              get children() {
                                return libs.createComponent(GemFusionLockChoices, {
                                  gem: fusionEmbeddedGem,
                                  source: 1,
                                  selection: activeFusionLock,
                                  onSelect: setSelectedFusionLock
                                });
                              }
                            }), null);
                            libs.insert(_el$176, libs.createComponent(libs.Show, {
                              get when() {
                                return forgeChildTab() == "Fusion";
                              },
                              get children() {
                                return [libs.createElement("Panel", {
                                  id: "FusionArrow",
                                  "class": "GemSwapArrow Reverse"
                                }, null), (() => {
                                  const _el$180 = libs.createElement("Panel", {
                                      id: "FusionMaterialArea"
                                    }, null),
                                    _el$181 = libs.createElement("Panel", {
                                      id: "FusionMaterialSlot"
                                    }, _el$180),
                                    _el$182 = libs.createElement("Label", {
                                      id: "FusionEmptyText",
                                      get text() {
                                        return GetLocalization("#Equipment_GemFusion_SelectMaterial");
                                      }
                                    }, _el$180);
                                  libs.setProp(_el$181, "onmouseover", panel => {
                                    const material = fusionMaterialDisplayData();
                                    if (!material) return;
                                    if (currentFusionResult()) {
                                      ShowCustomTooltip(panel, "server_gem", {
                                        id1: "",
                                        id2: "",
                                        embedded_gem_data: JSON.stringify(material)
                                      });
                                    } else {
                                      equipment_utils.ShowServerGemTooltip(panel, {
                                        id1: material.id
                                      });
                                    }
                                  });
                                  libs.setProp(_el$181, "onmouseout", panel => HideCustomTooltip(panel, "server_gem"));
                                  libs.setProp(_el$181, "onactivate", () => {
                                    if (displayData()?.in_check === "gem_fusion") return;
                                    setSelectedGemList([]);
                                  });
                                  libs.insert(_el$181, libs.createComponent(libs.Show, {
                                    get when() {
                                      return fusionMaterialDisplayData();
                                    },
                                    get fallback() {
                                      return libs.createElement("Panel", {
                                        id: "FusionAddIcon"
                                      }, null);
                                    },
                                    get children() {
                                      return libs.createComponent(server_equipment.Gem, libs.mergeProps$1(() => fusionMaterialDisplayData()));
                                    }
                                  }));
                                  libs.insert(_el$180, libs.createComponent(libs.Show, {
                                    get when() {
                                      return canChooseFusionLock();
                                    },
                                    get children() {
                                      return libs.createComponent(GemFusionLockChoices, {
                                        gem: fusionMaterialDisplayData,
                                        source: 2,
                                        selection: activeFusionLock,
                                        onSelect: setSelectedFusionLock
                                      });
                                    }
                                  }), null);
                                  libs.effect(_p$ => {
                                    const _v$49 = {
                                        Empty: !fusionMaterialDisplayData()
                                      },
                                      _v$50 = fusionMaterialDisplayData() == undefined,
                                      _v$51 = GetLocalization("#Equipment_GemFusion_SelectMaterial");
                                    _v$49 !== _p$._v$49 && (_p$._v$49 = libs.setProp(_el$181, "classList", _v$49, _p$._v$49));
                                    _v$50 !== _p$._v$50 && (_p$._v$50 = libs.setProp(_el$182, "visible", _v$50, _p$._v$50));
                                    _v$51 !== _p$._v$51 && (_p$._v$51 = libs.setProp(_el$182, "text", _v$51, _p$._v$51));
                                    return _p$;
                                  }, {
                                    _v$49: undefined,
                                    _v$50: undefined,
                                    _v$51: undefined
                                  });
                                  return _el$180;
                                })()];
                              }
                            }), null);
                            libs.insert(_el$176, libs.createComponent(libs.Show, {
                              get when() {
                                return libs.memo(() => !!(forgeChildTab() == "Inlay" && displayGemData() != undefined))() && displayGemData() != "undefined";
                              },
                              get children() {
                                return [libs.createElement("Panel", {
                                  id: "FusionArrow",
                                  "class": "GemSwapArrow Reverse"
                                }, null), (() => {
                                  const _el$184 = libs.createElement("Panel", {
                                      id: "FusionMaterialArea"
                                    }, null),
                                    _el$185 = libs.createElement("Panel", {
                                      id: "FusionMaterialSlot"
                                    }, _el$184);
                                  libs.setProp(_el$185, "onmouseover", panel => {
                                    const gem = displayGemData();
                                    equipment_utils.ShowServerGemTooltip(panel, {
                                      id1: gem.id
                                    });
                                  });
                                  libs.setProp(_el$185, "onmouseout", panel => HideCustomTooltip(panel, "server_gem"));
                                  libs.setProp(_el$185, "onactivate", () => setSelectedGemList([]));
                                  libs.insert(_el$185, libs.createComponent(server_equipment.Gem, libs.mergeProps$1(() => displayGemData())));
                                  return _el$184;
                                })()];
                              }
                            }), null);
                            libs.effect(_$p => libs.setProp(_el$176, "class", libs.classNames({
                              FusionSelection: forgeChildTab() == "Fusion" || forgeChildTab() == "Inlay" && displayGemData() != undefined && displayGemData() != "undefined",
                              HasFusionLockOptions: canChooseFusionLock()
                            }), _$p));
                            return _el$176;
                          })();
                        },
                        get children() {
                          const _el$152 = libs.createElement("Panel", {}, null);
                          libs.setProp(_el$152, "onmouseover", p => {
                            const gem = displayGemData();
                            if (gem && gem != "undefined") {
                              equipment_utils.ShowServerGemTooltip(p, {
                                id1: gem.id
                              });
                            }
                          });
                          libs.setProp(_el$152, "onmouseout", p => HideCustomTooltip(p, "server_gem"));
                          libs.insert(_el$152, libs.createComponent(server_equipment.Gem, libs.mergeProps$1(() => displayGemData())));
                          return _el$152;
                        }
                      }), _el$153);
                      const _ref$2 = forgeParticle;
                      typeof _ref$2 === "function" ? libs.use(_ref$2, _el$153) : forgeParticle = _el$153;
                      libs.effect(_$p => libs.setProp(_el$151, "classList", {
                        GemFusionLockMode: canChooseFusionLock()
                      }, _$p));
                      return _el$151;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return !forgeChildTab();
                      },
                      get fallback() {
                        return leftExtraContent();
                      },
                      get children() {
                        const _el$154 = libs.createElement("Panel", {
                          id: "NewBtnListContainer"
                        }, null);
                        libs.insert(_el$154, libs.createComponent(libs.For, {
                          get each() {
                            return newTabs();
                          },
                          children: (tab, index) => {
                            const disableReasons = libs.createMemo(() => {
                              if (showGemDisplayData()) {
                                const gem = displayGemData();
                                if (!gem || gem == "undefined") return [{
                                  key: "#Equipment_TextTips_NoData"
                                }];
                                return getGemDisableReasons(gem, tab);
                              } else {
                                const equip = displayData();
                                if (!equip) return [{
                                  key: "#Equipment_TextTips_NoData"
                                }];
                                return getEquipDisableReasons(equip, tab);
                              }
                            });
                            const isTabEnabled = () => disableReasons().length === 0;
                            return (() => {
                              const _el$188 = libs.createElement("Panel", {
                                  get ["class"]() {
                                    return libs.classNames("OperateBtn", tab);
                                  },
                                  get animationDelay() {
                                    return "0s," + 0.03 * index() + "s";
                                  },
                                  get animationDuration() {
                                    return 0.03 * index() + "s, 0.5s";
                                  }
                                }, null),
                                _el$189 = libs.createElement("Panel", {
                                  id: "BtnImg"
                                }, _el$188),
                                _el$190 = libs.createElement("Panel", {
                                  id: "TabName"
                                }, _el$188),
                                _el$191 = libs.createElement("Label", {
                                  get text() {
                                    return GetLocalization("#Equipment_" + tab);
                                  }
                                }, _el$190);
                                libs.createElement("Panel", {
                                  id: "Border",
                                  hittest: false
                                }, _el$188);
                                libs.createElement("Panel", {
                                  id: "LockIcon",
                                  hittest: false
                                }, _el$188);
                              libs.setProp(_el$188, "onactivate", () => {
                                if (!isTabEnabled()) return;
                                if (tab == "Fusion") {
                                  const eligibleSlots = inlayGemData().map((gem, slotIndex) => hasGemChaosEntries(gem) ? slotIndex : -1).filter(slotIndex => slotIndex >= 0);
                                  if (!eligibleSlots.includes(selectGemSlot())) {
                                    setSelectGemSlot(eligibleSlots[0]);
                                  }
                                  setSelectedGemList([]);
                                }
                                setForgeChildTab(tab);
                              });
                              libs.setProp(_el$189, "onmouseover", p => {
                                const tipsKey = tabTipsMap[tab];
                                const parts = [];
                                if (tipsKey) parts.push(GetLocalization(tipsKey));
                                const reasons = disableReasons();
                                if (tab == "Fusion" && reasons.length > 0) {
                                  parts.push(...reasons.map(r => LocalizeWithVars(r.key, r.vars ?? {})));
                                }
                                if (parts.length > 0) {
                                  ShowCustomTooltip(p, "text", {
                                    text: parts.join("<br>")
                                  });
                                }
                              });
                              libs.setProp(_el$189, "onmouseout", p => {
                                HideCustomTooltip(p, "text");
                              });
                              libs.effect(_p$ => {
                                const _v$54 = libs.classNames("OperateBtn", tab),
                                  _v$55 = "0s," + 0.03 * index() + "s",
                                  _v$56 = 0.03 * index() + "s, 0.5s",
                                  _v$57 = isTabEnabled(),
                                  _v$58 = GetLocalization("#Equipment_" + tab);
                                _v$54 !== _p$._v$54 && (_p$._v$54 = libs.setProp(_el$188, "class", _v$54, _p$._v$54));
                                _v$55 !== _p$._v$55 && (_p$._v$55 = libs.setProp(_el$188, "animationDelay", _v$55, _p$._v$55));
                                _v$56 !== _p$._v$56 && (_p$._v$56 = libs.setProp(_el$188, "animationDuration", _v$56, _p$._v$56));
                                _v$57 !== _p$._v$57 && (_p$._v$57 = libs.setProp(_el$188, "enabled", _v$57, _p$._v$57));
                                _v$58 !== _p$._v$58 && (_p$._v$58 = libs.setProp(_el$191, "text", _v$58, _p$._v$58));
                                return _p$;
                              }, {
                                _v$54: undefined,
                                _v$55: undefined,
                                _v$56: undefined,
                                _v$57: undefined,
                                _v$58: undefined
                              });
                              return _el$188;
                            })();
                          }
                        }));
                        return _el$154;
                      }
                    })];
                  }
                });
              }
            })];
          }
        }), null);
        libs.insert(_el$150, libs.createComponent(libs.Show, {
          get when() {
            return equipTabs.includes(forgeChildTab() ?? "") || gemTabs.includes(forgeChildTab() ?? "");
          },
          get children() {
            return libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
              id: "SkipForgeAnimation",
              get text() {
                return GetLocalization("#Equipment_SkipForgeAnimation");
              },
              get checked() {
                return skipForgeAnimation();
              },
              get enabled() {
                return libs.memo(() => !!!showAnim())() && !forgeRequestPending();
              },
              onchecked: setSkipForgeAnimation
            });
          }
        }), null);
        libs.insert(_el$148, libs.createComponent(libs.Show, {
          get when() {
            return libs.memo(() => !!showGemDisplayData())() ? displayGemData() != undefined : displayData() != undefined;
          },
          get children() {
            const _el$155 = libs.createElement("Panel", {
              id: "EquipInfoContainer"
            }, null);
            libs.insert(_el$155, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "ClassUP";
                  },
                  get children() {
                    return libs.createComponent(ClassUPWindow, {
                      itemData: displayData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "RarityUP";
                  },
                  get children() {
                    return libs.createComponent(RarityUPWindow, {
                      itemData: displayData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "Recast";
                  },
                  get children() {
                    return libs.createComponent(RecastWindow, {
                      itemData: displayData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "Refine";
                  },
                  get children() {
                    return libs.createComponent(RefineWindow, {
                      itemData: displayData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "Inlay";
                  },
                  get children() {
                    return libs.createComponent(InlayWindow, {
                      itemData: displayData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn,
                      gemData: displayGemData,
                      selectGemSlot: selectGemSlot,
                      setSelectGemSlot: setSelectGemSlot
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "Fusion";
                  },
                  get children() {
                    return libs.createComponent(GemFusionWindow, {
                      itemData: displayData,
                      gemData: displayGemData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn,
                      selectGemSlot: selectGemSlot,
                      setSelectGemSlot: setSelectGemSlot,
                      confirmedEquipmentID: confirmedFusionEquipmentID,
                      onConfirmed: onFusionConfirmed,
                      lockSelection: activeFusionLock
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "GemLevelUP";
                  },
                  get children() {
                    return libs.createComponent(GemLevelvpWindow, {
                      itemData: displayData,
                      gemData: displayGemData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn
                    });
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return forgeChildTab() == "GemMake";
                  },
                  get children() {
                    return libs.createComponent(GemMakeWindow, {
                      gemData: displayGemData,
                      setLeftExtraContent: setLeftExtraContent,
                      startForgeAnimation: startForgeAnimation,
                      requestPending: forgeRequestPending,
                      onReturn: onReturn
                    });
                  }
                })];
              }
            }));
            libs.effect(_$p => libs.setProp(_el$155, "visible", hiddenItemList(), _$p));
            return _el$155;
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$150, "class", libs.classNames({
          ShowAnimState: showAnim(),
          HuntlootDevourMode: showHuntlootDisplayData() && forgeChildTab() === "Devour"
        }), _$p));
        return _el$148;
      })(), (() => {
        const _el$156 = libs.createElement("DOTAParticleScenePanel", {
          id: "Chuizi",
          cameraOrigin: "0 0 750",
          fov: 120,
          lookAt: "0 0 0",
          hittest: false,
          particleName: "particles/ui/game/ui_game_equipment_interface_03_fx.vpcf",
          startActive: false,
          light: "light",
          camera: "camera_top",
          map: "scene/particle_scene",
          renderdeferred: false,
          deferredalpha: true,
          particleonly: false,
          squarePixels: true
        }, null);
        const _ref$3 = chuiziParticle;
        typeof _ref$3 === "function" ? libs.use(_ref$3, _el$156) : chuiziParticle = _el$156;
        return _el$156;
      })(), libs.createElement("DOTAParticleScenePanel", {
        id: "BottomParticle",
        particleName: "particles/ui/game/ui_game_equipment_interface_01_1_fx",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null)];
    }
  });
}
libs.render(() => libs.createComponent(HudEquipment, {}), $.GetContextPanel());