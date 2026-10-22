--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var solid_utils = require('./solid_utils.js');
var activity_menu = require('./activity_menu.js');
require('./dig_veins_logic.js');

const menus = ["setting", "store", "activity", "draw", "rank", "hero", "equipment", "cosmetic", "rune", "book", "guide", "community", "endscreen"];
const storeActivityMenus = new Set(["battlepass", "growth_fund", "starsea"]);
const STATIC_MENU_LIST = {
  rank: {
    Ladder: [],
    Rank_CommonMatchHero: []
  },
  activity: {
    first_celebration: [],
    battlepass: ["battlepass", "daily_task", "week_task"],
    growth_fund: ["growth_fund_301"],
    starsea: [],
    seven_days: [],
    boardslot: ["dice_game", "dice_gift"],
    activity_moonstone: [],
    mining: ["veins_game"]
  },
  hero: {
    Hero_Menu: [],
    Weapon_Menu: [],
    Courier_Menu: []
  },
  equipment: {
    EquipmentTab_equip: [],
    EquipmentTab_part_levelup: [],
    EquipmentTab_forge2: [],
    EquipmentTab_break: [],
    EquipmentTab_key: ["EquipmentTab_key_devour", "EquipmentTab_key_break"],
    EquipmentTab_drawing: ["EquipmentTab_drawing_make", "EquipmentTab_drawing_recast"]
  },
  cosmetic: {
    Props_Menu: [],
    Cosmetic_Hero: ["HERO_WEAPON", "HEAD", "SHOULDER", "BACK", "TAIL", "WING", "MISC", "FOOTPRINT_EFFECT", "AURA_EFFECT", "ATTACK_EFFECT", "SPECIAL_SKILL_EFFECT", "DASH_SKILL_EFFECT", "DEFENSE_SKILL_EFFECT", "ULTIMATE_SKILL_EFFECT"],
    Cosmetic_Player: ["BORDER", "TITLE"]
  },
  rune: {
    RuneEmbed_Menu: [],
    RuneBreak_Menu: [],
    RuneDevour_Menu: [],
    RuneInlay_Menu: []
  },
  book: {
    PlayerInfo_Menu: [],
    Blessing_Menu: [],
    Collection_Menu: [],
    Handbook_Menu: [],
    Achieve_Menu: []
  },
  guide: {
    Guide1: [],
    Guide2: [],
    Guide3: []
  }
};
const separatedStoreTags = new Set(["Fish", "Explore", "Flowers", "StarStone", "BoardSlotGift", "BoardSlot", "MiningGift", "Mining", "pvp_shop", "MoonDraw"]);
const staticStoreMenus = ["collection_vip", "collection_treasure"];
const storeMenuOrder = ["Privilege", "Hot", "Gift", "Resource", "collection_vip", "collection_treasure", "Moon", "Universe"];
const open_store = solid_utils.createServiceNetData("open_shop", {
  value: false
});
const player_activity_tasks = solid_utils.createServiceNetData("player_activity_tasks", {});
const player_login_activity_data = solid_utils.createServiceNetData("player_login_activity_data", {});
const getStoreMenuOrder = tag => {
  const order = storeMenuOrder.indexOf(tag);
  return order == -1 ? storeMenuOrder.length : order;
};
const getStoreMenuList = () => {
  const result = {};
  const now = Date.now() / 1000;
  for (const itemname in KeyValues.info_shop_product) {
    const itemdata = KeyValues.info_shop_product[itemname];
    if ((itemdata.start_time < now || itemdata.start_time == 0) && (itemdata.end_time > now || itemdata.end_time == 0) && itemdata.hide == 0 || itemdata.tag == "Privilege") {
      for (const tag of itemdata.tag.split("|")) {
        if (!separatedStoreTags.has(tag)) {
          result[tag] = [];
        }
      }
    }
  }
  for (const menu of staticStoreMenus) {
    result[menu] = [];
  }
  if (KeyValues.drawcards["3001"] != undefined) {
    result["Universe"] = [];
  }
  const sortedResult = {};
  for (const [key, value] of Object.entries(result).sort(([a], [b]) => getStoreMenuOrder(a) - getStoreMenuOrder(b))) {
    sortedResult[key] = value;
  }
  return sortedResult;
};
const getDrawDropdownItems = () => {
  const timestamp = CustomUIConfig.GetServerTimeStamp();
  return Object.entries(KeyValues.drawcards).sort((a, b) => a[1].order - b[1].order).filter(([_, config]) => {
    const validTime = config.open_time < timestamp && (config.end_time > timestamp || config.end_time == 0);
    return config.show == 1 && validTime;
  }).map(([poolID]) => ({
    label: "Draw_PoolName_" + poolID,
    action: () => {
      ToggleWindow("MenuButton_draw", true);
      ClientSideEvent("draw_select_pool", {
        poolID
      });
    }
  }));
};
const buildDropdownItems = menuList => {
  const result = [];
  for (const menu in menuList) {
    result.push({
      label: menu,
      menu,
      redMenu: menu
    });
  }
  return result;
};
const getActivityMenuList = () => activity_menu.buildActivityMenuList({
  menuList: STATIC_MENU_LIST["activity"],
  storeMenus: storeActivityMenus
}, {
  now: CustomUIConfig.GetServerTimeStamp(),
  tasks: player_activity_tasks(),
  loginActivities: player_login_activity_data(),
  openStore: open_store().value
});
const buildActivityDropdownItems = menuList => {
  return Object.keys(menuList).map(menu => ({
    label: menu,
    menu,
    red: activity_menu.getVisibleActivityRedPoint(menuList, menu)
  }));
};
const dropdownMenus = {
  setting: () => [{
    label: "MenuButton_setting",
    menu: "MenuButton_setting"
  }, {
    label: "MenuDropDown_Dota2Setting",
    action: () => $.DispatchEvent("DOTAShowSettingsRebornPopup", $.GetContextPanel())
  }],
  store: () => buildDropdownItems(getStoreMenuList()),
  activity: () => buildActivityDropdownItems(getActivityMenuList()),
  draw: getDrawDropdownItems,
  rank: () => buildDropdownItems(STATIC_MENU_LIST.rank),
  hero: () => buildDropdownItems(STATIC_MENU_LIST.hero),
  equipment: () => buildDropdownItems(STATIC_MENU_LIST.equipment),
  cosmetic: () => buildDropdownItems(STATIC_MENU_LIST.cosmetic),
  rune: () => buildDropdownItems(STATIC_MENU_LIST.rune),
  book: () => buildDropdownItems(STATIC_MENU_LIST.book),
  guide: () => buildDropdownItems(STATIC_MENU_LIST.guide)
};
const [selectName, setSelectName] = libs.createSignal("");
const GUIDE_SETTING_KEY = "setting_switch_guide";
const GUIDE_AUTO_CLOSE_KEY = "setting_guide_auto_closed";
const CAPACITY_LIMIT = 400;
const EQUIPMENT_CAPACITY_WARNING_RATIO = 0.8;
const EQUIPMENT_CAPACITY_CRITICAL_RATIO = 0.95;
const CAPACITY_TIP_CONFIG = [{
  type: "equipment",
  counterKey: "equipment_count",
  title: "#Equipment_EquipmentTipTitle",
  fullTitle: "#Equipment_EquipmentTipTitle2",
  content: "#Equipment_EquipmentTipContent"
}, {
  type: "gem",
  counterKey: "gem_count",
  title: "#Equipment_GemCapacityTipTitle",
  fullTitle: "#Equipment_GemCapacityTipTitle2",
  content: "#Equipment_GemCapacityTipContent"
}, {
  type: "drawing",
  counterKey: "drawing_count",
  title: "#Equipment_DrawingTipTitle",
  fullTitle: "#Equipment_DrawingTipTitle2",
  content: "#Equipment_DrawingTipContent"
}, {
  type: "key",
  counterKey: "key_count",
  title: "#Equipment_KeyCapacityTipTitle",
  fullTitle: "#Equipment_KeyCapacityTipTitle2",
  content: "#Equipment_KeyCapacityTipContent"
}, {
  type: "huntloot",
  counterKey: "huntloot_count",
  title: "#Huntloot_CapacityTipTitle",
  fullTitle: "#Huntloot_CapacityTipTitle2",
  content: "#Huntloot_CapacityTipContent"
}];
function getCapacityLevel(count, limit) {
  const ratio = count / limit;
  if (ratio >= EQUIPMENT_CAPACITY_CRITICAL_RATIO) {
    return "critical";
  }
  if (ratio >= EQUIPMENT_CAPACITY_WARNING_RATIO) {
    return "warning";
  }
  return "none";
}
function ReadBooleanSetting(value, defaultValue) {
  if (value == undefined) {
    return defaultValue;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true" || normalized === "1") {
      return true;
    }
    if (normalized === "false" || normalized === "0") {
      return false;
    }
  }
  return defaultValue;
}
const settle_info = solid_utils.createNetDataSignal("common", "settle_info", {
  end_time: -1,
  show_menu_bar: false
});
let DropContainer;
let DropContent;
let EquipmentButtonPanel;
let EquipmentCapacityTipContainer;
const EQUIPMENT_CAPACITY_TIP_POSITION_RETRIES = 2;
const EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL = 0.03;
const showDropDown = (panel, name) => {
  if (DropContainer == undefined || !DropContainer.IsValid()) return;
  if (panel != undefined) {
    if (name != undefined && dropdownMenus[name] != undefined) {
      const dropdownItems = dropdownMenus[name]();
      if (dropdownItems.length == 0) {
        LoadData(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
        DropContainer.RemoveClass("Show");
        return;
      }
      let position = panel.GetPositionWithinWindow();
      let dropX = position.x / DropContainer.actualuiscale_x - 80 + 23;
      if (DropContent != undefined) {
        DropContainer.SetPositionInPixels(Math.max(0, dropX), 0, 0);
        if (dropX < 0) {
          DropContainer.FindChild("MarginTop").style.transform = `translateX(${dropX}px)`;
        } else {
          DropContainer.FindChild("MarginTop").style.transform = `translateX(0px)`;
        }
        DropContent.RemoveAndDeleteChildren();
        for (const item of dropdownItems) {
          libs.insert(DropContent, libs.createComponent(DropdownItem, {
            menuName: name,
            item: item
          }));
        }
      }
      SaveData(DropContainer, "targetPanel", panel);
    } else {
      LoadData(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
      DropContainer.RemoveClass("Show");
      return;
    }
  }
  LoadData(DropContainer, "targetPanel")?.AddClass("ShowDropDown");
  DropContainer.AddClass("Show");
};
const hideDropDown = () => {
  if (!DropContainer?.IsValid()) return;
  LoadData(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
  DropContainer.RemoveClass("Show");
};
const updateEquipmentCapacityTipPosition = remainingRetries => {
  if (!EquipmentButtonPanel?.IsValid() || !EquipmentCapacityTipContainer?.IsValid()) return;
  const scale = EquipmentCapacityTipContainer.actualuiscale_x;
  if (!isFinite(scale) || scale <= 0) {
    if (remainingRetries > 0) {
      $.Schedule(EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL, () => updateEquipmentCapacityTipPosition(remainingRetries - 1));
    }
    return;
  }
  const position = EquipmentButtonPanel.GetPositionWithinWindow();
  const buttonCenterX = position.x + EquipmentButtonPanel.actuallayoutwidth / 2;
  const tipX = buttonCenterX / scale - 180;
  if (!isFinite(tipX)) return;
  EquipmentCapacityTipContainer.SetPositionInPixels(Math.max(0, tipX), 0, 0);
  if (remainingRetries > 0) {
    $.Schedule(EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL, () => updateEquipmentCapacityTipPosition(remainingRetries - 1));
    return;
  }
  EquipmentCapacityTipContainer.AddClass("Positioned");
};
const scheduleEquipmentCapacityTipPositionUpdate = () => {
  EquipmentCapacityTipContainer?.RemoveClass("Positioned");
  $.Schedule(EQUIPMENT_CAPACITY_TIP_POSITION_RETRY_INTERVAL, () => {
    updateEquipmentCapacityTipPosition(EQUIPMENT_CAPACITY_TIP_POSITION_RETRIES);
  });
};
const [redData, SetRed] = libs.createSignal((() => {
  let res = {};
  menus.forEach(menu => {
    res[menu] = CustomUIConfig.GetRedPoint(menu);
  });
  return res;
})());
const MenuBar = () => {
  const dungeon_loading = solid_utils.createPlayerNetDataSignal("common", "dungeon_loading", {
    state: false
  });
  const boss_intro = solid_utils.createNetDataSignal("common", "boss_intro", {
    state: false
  });
  libs.createEffect(() => {
    $.GetContextPanel().SetHasClass("DungeonLoading", (dungeon_loading()?.state ?? false) || (boss_intro()?.state ?? false));
  });
  const briefMatchData = solid_utils.createServiceNetData("player_common_match_data");
  const maxDiff = libs.createMemo(() => briefMatchData()?.max_diff ?? 0);
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values");
  const guideEnabled = libs.createMemo(() => ReadBooleanSetting(playerKeyValues()?.[GUIDE_SETTING_KEY]?.value, true));
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const [dismissedCapacityTips, setDismissedCapacityTips] = libs.createSignal({});
  const capacityTip = libs.createMemo(() => {
    const counters = playerCounters();
    const dismissed = dismissedCapacityTips();
    for (const config of CAPACITY_TIP_CONFIG) {
      const count = counters?.[config.counterKey]?.count ?? 0;
      const level = getCapacityLevel(count, CAPACITY_LIMIT);
      if (level == "none" || level == "warning" && dismissed[config.type]) {
        continue;
      }
      return {
        type: config.type,
        count,
        limit: CAPACITY_LIMIT,
        level,
        title: GetLocalization(count >= CAPACITY_LIMIT ? config.fullTitle : config.title),
        content: LocalizeWithVars(config.content, {
          count,
          limit: CAPACITY_LIMIT
        })
      };
    }
    return undefined;
  });
  libs.createEffect(() => {
    const keyValues = playerKeyValues();
    if (keyValues == undefined || maxDiff() < 3) {
      return;
    }
    if (ReadBooleanSetting(keyValues[GUIDE_AUTO_CLOSE_KEY]?.value, false)) {
      return;
    }
    Players.SetPlayerSetting(GUIDE_SETTING_KEY, false);
    Players.SetPlayerSetting(GUIDE_AUTO_CLOSE_KEY, true);
  });
  const menuVisibleWhen = {
    guide: () => guideEnabled(),
    endscreen: () => settle_info().show_menu_bar === true,
    rune: () => maxDiff() >= 5
  };
  const [activityRedVersion, setActivityRedVersion] = libs.createSignal(0);
  const visibleActivityRed = libs.createMemo(() => {
    activityRedVersion();
    return activity_menu.getVisibleActivityRedPoint(getActivityMenuList());
  });
  const [hideRecord, SetHideRecord] = libs.createStore({});
  libs.onMount(() => {
    let gameEventListeners = [];
    gameEventListeners.push(useClientSideEvent("custom_ui_toggle_windows", eventData => {
      const name = eventData.windowName.replace("MenuButton_", "");
      if (eventData.state == undefined) {
        if (selectName() == name) {
          setSelectName("");
        } else {
          setSelectName(name);
        }
      } else {
        if (eventData.state == 1) {
          setSelectName(name);
        } else {
          setSelectName("");
        }
      }
    }));
    gameEventListeners.push(CustomUIConfig.SubscribeRedPointChange(key => {
      if (key == "activity") {
        setActivityRedVersion(version => version + 1);
      }
      SetRed(oldData => {
        let old = oldData[key];
        let newState = CustomUIConfig.GetRedPoint(key);
        if (old == newState) {
          return oldData;
        }
        return {
          ...oldData,
          [key]: newState
        };
      });
    }));
    gameEventListeners.push(GameEvents.Subscribe("client_side_event", data => {
      if (data.event_name == "set_menu_bar_visible") {
        let {
          hide,
          key
        } = JSON.parse(data.event_data);
        SetHideRecord(key, hide);
      }
    }));
    libs.onCleanup(() => {
      for (const id of gameEventListeners) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
  const Hide = libs.createMemo(() => {
    return Object.values(hideRecord).some(v => v == true);
  });
  const showEquipmentCapacityTip = libs.createMemo(() => {
    if (Hide() || selectName() != "") {
      return false;
    }
    return capacityTip() != undefined;
  });
  libs.createEffect(() => {
    if (showEquipmentCapacityTip()) {
      scheduleEquipmentCapacityTipPositionUpdate();
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "MenuMain",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "MenuBar",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "DropContainer",
        hittest: false
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "MarginTop"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "DropMain"
      }, _el$3),
      _el$6 = libs.createElement("Panel", {
        id: "EquipmentCapacityTipContainer",
        hittest: false
      }, _el$);
      libs.createElement("Panel", {
        id: "EquipmentCapacityTipArrow",
        hittest: false
      }, _el$6);
    libs.insert(_el$2, libs.createComponent(MenuButton, {
      name: "Return",
      onactivate: self => $.DispatchEvent("DOTAHUDShowDashboard", self)
    }), null);
    libs.insert(_el$2, libs.createComponent(libs.For, {
      each: menus,
      children: menu => libs.createComponent(libs.Show, {
        get when() {
          return menuVisibleWhen[menu]?.() ?? true;
        },
        get children() {
          return libs.createComponent(MenuButton, {
            name: menu,
            get red() {
              return menu == "activity" ? visibleActivityRed() : redData()[menu] == true;
            },
            buttonRef: menu == "equipment" ? panel => {
              EquipmentButtonPanel = panel;
              scheduleEquipmentCapacityTipPositionUpdate();
            } : undefined,
            onMenuActivate: name => {
              const tip = capacityTip();
              if (name == "equipment" && tip != undefined) {
                setDismissedCapacityTips(prev => ({
                  ...prev,
                  [tip.type]: true
                }));
              }
            }
          });
        }
      })
    }), null);
    const _ref$ = DropContainer;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$3) : DropContainer = _el$3;
    libs.setProp(_el$4, "onmouseover", self => showDropDown());
    libs.setProp(_el$4, "onmouseout", self => hideDropDown());
    const _ref$2 = DropContent;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$5) : DropContent = _el$5;
    libs.setProp(_el$5, "onmouseover", self => showDropDown());
    libs.setProp(_el$5, "onmouseout", self => hideDropDown());
    libs.use(panel => {
      EquipmentCapacityTipContainer = panel;
      scheduleEquipmentCapacityTipPositionUpdate();
    }, _el$6);
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return capacityTip();
      },
      keyed: true,
      children: tip => libs.createComponent(EquipmentCapacityTip, tip)
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          Hidden: Hide()
        },
        _v$2 = {
          Show: showEquipmentCapacityTip()
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "classList", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const MenuButton = props => {
  const [local] = libs.splitProps(props, ["name", "hittest", "onactivate", "buttonRef", "onMenuActivate"]);
  const selected = () => selectName() == local.name;
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get id() {
      return props.name;
    },
    "class": "MenuButton",
    get classList() {
      return {
        Selected: selected()
      };
    },
    ref: self => local.buttonRef?.(self),
    get onactivate() {
      return local.onactivate ?? (self => {
        local.onMenuActivate?.(local.name);
        ToggleWindow("MenuButton_" + local.name, !selected());
      });
    },
    onmouseover: self => {
      showDropDown(self, local.name);
    },
    onmouseout: self => {
      hideDropDown();
    },
    get children() {
      return [libs.createElement("Panel", {
        id: "SelectedHover"
      }, null), (() => {
        const _el$9 = libs.createElement("Panel", {
            id: "SelectParticleRoot"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "SelectParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
            cameraOrigin: "0 0 60",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$9);
        return _el$9;
      })(), (() => {
        const _el$1 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("BGImage", local.name);
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$1, "class", libs.classNames("BGImage", local.name), _$p));
        return _el$1;
      })(), (() => {
        const _el$10 = libs.createElement("Label", {
          get ["class"]() {
            return libs.classNames("MenuLabel", local.name, {
              Selected: selected()
            });
          },
          get text() {
            return "#MenuButton_" + local.name;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$3 = libs.classNames("MenuLabel", local.name, {
              Selected: selected()
            }),
            _v$4 = "#MenuButton_" + local.name;
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "class", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$10, "text", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$10;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return props.red;
        },
        get children() {
          return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
        }
      })];
    }
  });
};
const EquipmentCapacityTip = props => {
  return (() => {
    const _el$11 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("EquipmentCapacityTip", {
            Critical: props.level == "critical"
          });
        },
        hittest: false
      }, null);
      libs.createElement("Panel", {
        "class": "TipBG",
        hittest: false
      }, _el$11);
      const _el$13 = libs.createElement("Panel", {
        "class": "TipContext"
      }, _el$11),
      _el$14 = libs.createElement("Label", {
        id: "EquipmentCapacityTipTitle",
        get text() {
          return props.title;
        },
        html: true
      }, _el$13),
      _el$15 = libs.createElement("Label", {
        id: "EquipmentCapacityTipContent",
        get text() {
          return props.content;
        },
        html: true
      }, _el$13);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames("EquipmentCapacityTip", {
          Critical: props.level == "critical"
        }),
        _v$6 = props.title,
        _v$7 = props.content;
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$14, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$15, "text", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$11;
  })();
};
const DropdownItem = props => {
  const red = () => {
    if (props.item.red != undefined) return props.item.red;
    const redMenu = props.item.redMenu;
    if (redMenu == undefined) return false;
    const redMenu2 = props.item.redMenu2;
    if (redMenu2 == undefined) {
      return CustomUIConfig.GetRedPoint(props.menuName, redMenu);
    }
    return CustomUIConfig.GetRedPoint(props.menuName, redMenu, redMenu2);
  };
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    "class": "DropdownItem",
    onactivate: self => {
      if (props.item.action != undefined) {
        props.item.action();
      } else {
        const menu = props.item.menu;
        if (menu == undefined) {
          return;
        }
        JumpToMenu({
          window_name: "MenuButton_" + props.menuName,
          menu,
          menu2: props.item.menu2,
          force: true
        });
      }
      hideDropDown();
    },
    get children() {
      return [(() => {
        const _el$16 = libs.createElement("Label", {
          get text() {
            return "#" + props.item.label;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$16, "text", "#" + props.item.label, _$p));
        return _el$16;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return red();
        },
        get children() {
          return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
        }
      })];
    }
  });
};
libs.render(() => libs.createComponent(MenuBar, {}), $.GetContextPanel());