--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');
var common_item = require('./common_item.js');
var Player = require('./Player.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_Button.js');
require('./EOM_TextEntry.js');

const ENTITY_LIST_REFRESH_INTERVAL = 0.25;
const ENTITY_STATE_REFRESH_INTERVAL = 0.10;
const HEALTH_REFRESH_INTERVAL = 0.05;
const DUMMY_RECORD_REFRESH_INTERVAL = 0.10;
const DUMMY_RECORD_RESET_TIME = 2;
const DUMMY_NORMAL_ATTACK_KEY = "__normal_attack__";
const arenaSession = solid_utils.createPlayerNetDataSignal("arena", "session");
const pvpTopStatues = solid_utils.createNetDataSignal("arena", "top_statues", {});
function formatDummyDamage(value) {
  const formatted = FormatNumber(value, 2);
  const match = formatted.match(/^(-?\d+)(?:\.(\d+))?(.*)$/);
  if (match === null) {
    return formatted;
  }
  const decimals = match[2] ?? "";
  return `${match[1]}.${(decimals + "00").slice(0, 2)}${match[3]}`;
}
const DEFAULT_CONFIG = {
  Hero: {
    width: 129,
    height: 12,
    offset: 250
  },
  Unit: {
    width: 80,
    height: 6,
    offset: 180
  },
  ShopItem: {
    width: 200,
    height: 200,
    offset: 60
  },
  ClientItem: {
    width: 200,
    height: 80,
    offset: 160
  },
  Npc: {
    width: 200,
    height: 200,
    offset: 250
  }
};
const NPC_OFFSET_CONFIG = {
  achievement: 300,
  collection: 300,
  mail: 100,
  forging: 250,
  mirror: 450,
  leisure: 200,
  dungeon_start: 400,
  talent: 200,
  training: 200,
  fisherman: 200,
  hunt_save: 200
};
const LOCAL_NPC_LIST = [{
  unitName: "npc_hunt_save",
  name: "hunt_save"
}];
const NPC_ALWAYS_VISIBLE_NAMES = ["gem_entrance", ...LOCAL_NPC_LIST.map(npc => npc.name)];
const DEFAULT_UPGRADE_KEY = "Q";
function formatPanoramaPercent(value) {
  return Math.max(0, Math.min(100, finiteNumber(value))).toFixed(3) + "%";
}
function getUpgradeKey() {
  const playerKeyValues = getServiceNetData("player_key_values", Players.GetLocalPlayer());
  if (playerKeyValues !== undefined) {
    const interactBinding = playerKeyValues[`keybind_keyboard_${KeyFunction.Upgrade}`];
    if (interactBinding !== undefined) {
      return interactBinding.value;
    }
  }
  return DEFAULT_UPGRADE_KEY;
}
function shouldShowOverhead(entIndex, type) {
  if (!Entities.IsValidEntity(entIndex)) {
    return false;
  }
  if (pvpTopStatues()[String(entIndex)] !== undefined) {
    return Entities.IsAlive(entIndex);
  }
  if (type === "ShopItem" || type === "ClientItem") {
    const data = getNetDataKey("dropped_item", String(entIndex));
    return data !== undefined && (data.owner_player_id === undefined || data.owner_player_id === Players.GetLocalPlayer());
  }
  if (type === "Npc") {
    const playerID = getNpcPlayerID(entIndex);
    const npcName = getNpcNameByEntIndex(entIndex);
    return playerID !== undefined || NPC_ALWAYS_VISIBLE_NAMES.includes(npcName) || GameUI.IsAltDown();
  }
  return Entities.IsAlive(entIndex) && Entities.HasHealthBar(entIndex);
}
function getOverheadType(entIndex) {
  if (Entities.IsHero(entIndex)) {
    return "Hero";
  }
  const npc = getNpcData(entIndex);
  if (npc !== undefined) {
    return "Npc";
  }
  return "Unit";
}
function getNpcData(entIndex) {
  const unitName = Entities.GetUnitName(entIndex);
  const localNpc = LOCAL_NPC_LIST.find(npc => npc.unitName === unitName);
  if (localNpc !== undefined) {
    return localNpc;
  }
  if (CustomUIConfig.NpcManager === undefined) {
    return undefined;
  }
  return CustomUIConfig.NpcManager.GetNpc(entIndex);
}
function getNpcNameByEntIndex(entIndex) {
  const npc = getNpcData(entIndex);
  return npc?.name ?? "unknown";
}
function getNpcPlayerID(entIndex) {
  const npc = getNpcData(entIndex);
  return npc?.playerID;
}
function getHealthBarConfig(entIndex, type) {
  if (type === "ShopItem") {
    return DEFAULT_CONFIG.ShopItem;
  }
  if (type === "Npc") {
    const npcName = getNpcNameByEntIndex(entIndex);
    const offset = NPC_OFFSET_CONFIG[npcName] ?? DEFAULT_CONFIG.Npc.offset;
    return {
      ...DEFAULT_CONFIG.Npc,
      offset
    };
  }
  if (type === "ClientItem") {
    return DEFAULT_CONFIG.ClientItem;
  }
  const unitName = Entities.GetUnitName(entIndex);
  const kvData = type === "Hero" ? KeyValues.heroes?.[unitName] : KeyValues.npc_units_custom?.[unitName];
  return {
    width: kvData?.HealthBarWidth ?? DEFAULT_CONFIG[type].width,
    height: kvData?.HealthBarHeight ?? DEFAULT_CONFIG[type].height,
    offset: kvData?.HealthBarOffset ?? DEFAULT_CONFIG[type].offset
  };
}
function isHeroHasUpgrade() {
  const selection = getNetDataKey("common", "multi_choice_state", Players.GetLocalPlayer()) ?? {
    skill_upgrade: 0
  };
  return selection.skill_upgrade > 0;
}
const HealthBar = () => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "Bar"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "ShieldProgress"
      }, _el$);
      libs.createElement("Panel", {
        id: "ShieldProgress_Bar"
      }, _el$2);
      const _el$4 = libs.createElement("Panel", {
        id: "HealthProgress"
      }, _el$);
      libs.createElement("Panel", {
        id: "HealthProgress_Loss"
      }, _el$4);
      libs.createElement("Panel", {
        id: "HealthProgress_Left"
      }, _el$4);
    return _el$;
  })();
};
const HeroOverhead = ({
  entIndex
}) => {
  const playerID = Entities.GetPlayerOwnerID(entIndex);
  const pvpTopStatue = libs.createMemo(() => pvpTopStatues()[String(entIndex)]);
  const arenaOpponent = libs.createMemo(() => {
    const session = arenaSession();
    if (session?.selectedOpponentID === undefined || !Entities.IsEnemy(entIndex)) return undefined;
    return session.opponents.find(opponent => opponent.id === session.selectedOpponentID);
  });
  const playerCosmeticEquips = solid_utils.createServiceNetData("player_cosmetic_equips", {}, playerID);
  const titleCosmeticID = libs.createMemo(() => {
    const opponent = arenaOpponent();
    if (opponent !== undefined) {
      return opponent.titleCosmeticID !== undefined && opponent.titleCosmeticID > 0 ? String(opponent.titleCosmeticID) : "";
    }
    for (const equip of Object.values(playerCosmeticEquips())) {
      const cosmeticInfo = KeyValues.info_item_cosmetic[String(equip.cosmetic_id)];
      if (cosmeticInfo != undefined && cosmeticInfo.type == COSMETIC_TYPE.TITLE) {
        return String(equip.cosmetic_id);
      }
    }
    return "";
  });
  const playerName = libs.createMemo(() => {
    if (playerID == -1 || playerID == undefined) return "";
    return Players.GetPlayerName(playerID);
  });
  return (() => {
    const _el$7 = libs.createElement("Panel", {
        id: "OverheadContent",
        "class": "HeroContent"
      }, null),
      _el$9 = libs.createElement("Panel", {
        id: "HeroBarContainer"
      }, _el$7),
      _el$0 = libs.createElement("Panel", {
        id: "UpgradePrompt"
      }, _el$9);
      libs.createElement("DOTAParticleScenePanel", {
        lookAt: "0 0 0",
        cameraOrigin: "0 0 65",
        fov: 45,
        particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
        squarePixels: true
      }, _el$0);
      const _el$10 = libs.createElement("Panel", {
        id: "Bar"
      }, _el$9),
      _el$11 = libs.createElement("Panel", {
        id: "ShieldProgress"
      }, _el$10);
      libs.createElement("Panel", {
        id: "ShieldProgress_Bar"
      }, _el$11);
      const _el$13 = libs.createElement("Panel", {
        id: "HealthProgress"
      }, _el$10);
      libs.createElement("Panel", {
        id: "HealthProgress_Loss"
      }, _el$13);
      libs.createElement("Panel", {
        id: "HealthProgress_Left"
      }, _el$13);
      const _el$16 = libs.createElement("Panel", {
        id: "RageProgress"
      }, _el$10);
      libs.createElement("Panel", {
        id: "RageProgress_Bar"
      }, _el$16);
      const _el$18 = libs.createElement("Panel", {
        id: "DashCharge"
      }, _el$9);
      libs.createElement("Panel", {
        id: "DashCharge_Bar"
      }, _el$18);
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return (pvpTopStatue()?.title ?? "") !== "";
      },
      get fallback() {
        return libs.createComponent(libs.Show, {
          get when() {
            return titleCosmeticID() !== "";
          },
          get children() {
            return libs.createComponent(Player.PlayerTitle, {
              id: "HeroTitleImage",
              get titleid() {
                return titleCosmeticID();
              }
            });
          }
        });
      },
      get children() {
        return libs.createComponent(Player.PlayerTitle, {
          id: "HeroTitleImage",
          get titleid() {
            return pvpTopStatue().title;
          }
        });
      }
    }), _el$9);
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return pvpTopStatue() !== undefined;
      },
      get fallback() {
        return libs.createComponent(libs.Show, {
          get when() {
            return arenaOpponent() !== undefined;
          },
          get fallback() {
            return libs.createComponent(libs.Show, {
              get when() {
                return playerName() !== "";
              },
              get children() {
                const _el$21 = libs.createElement("Panel", {
                    id: "HeroPlayerName"
                  }, null),
                  _el$22 = libs.createElement("Label", {
                    get text() {
                      return playerName();
                    }
                  }, _el$21);
                libs.effect(_$p => libs.setProp(_el$22, "text", playerName(), _$p));
                return _el$21;
              }
            });
          },
          get children() {
            const _el$20 = libs.createElement("Panel", {
              id: "HeroPlayerName"
            }, null);
            libs.insert(_el$20, libs.createComponent(Player.PlayerName, {
              get accountid() {
                return arenaOpponent()?.accountID;
              }
            }));
            return _el$20;
          }
        });
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
          id: "HeroPlayerName"
        }, null);
        libs.insert(_el$8, libs.createComponent(Player.PlayerName, {
          get accountid() {
            return pvpTopStatue().uid;
          }
        }));
        return _el$8;
      }
    }), _el$9);
    libs.insert(_el$0, libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
      get hotkey() {
        return getUpgradeKey();
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$7, "classList", {
      PvpTopStatue: pvpTopStatue() !== undefined
    }, _$p));
    return _el$7;
  })();
};
const UnitOverhead = ({
  entIndex
}) => {
  const isDummy = Entities.GetUnitName(entIndex) === "demo_dummy";
  return (() => {
    const _el$23 = libs.createElement("Panel", {
      id: "OverheadContent",
      "class": "UnitContent"
    }, null);
    libs.insert(_el$23, libs.createComponent(libs.Show, {
      when: isDummy,
      get children() {
        const _el$24 = libs.createElement("Panel", {
            id: "DummyDamageRecord"
          }, null),
          _el$25 = libs.createElement("Panel", {
            id: "DummyDamageSummary"
          }, _el$24),
          _el$26 = libs.createElement("Panel", {
            "class": "DummyDamageRecordRow"
          }, _el$25),
          _el$27 = libs.createElement("Label", {
            "class": "DummyDamageRecordLabel",
            get text() {
              return GetLocalization("#TestRecord_TotalDamage");
            }
          }, _el$26);
          libs.createElement("Label", {
            id: "DummyTotalDamage",
            "class": "DummyDamageRecordValue",
            text: "0.00"
          }, _el$26);
          const _el$29 = libs.createElement("Panel", {
            "class": "DummyDamageRecordRow"
          }, _el$25),
          _el$30 = libs.createElement("Label", {
            "class": "DummyDamageRecordLabel",
            get text() {
              return GetLocalization("#TestRecord_DPS");
            }
          }, _el$29);
          libs.createElement("Label", {
            id: "DummyDps",
            "class": "DummyDamageRecordValue",
            text: "0.00"
          }, _el$29);
          const _el$32 = libs.createElement("Panel", {
            "class": "DummyDamageRecordRow"
          }, _el$25),
          _el$33 = libs.createElement("Label", {
            "class": "DummyDamageRecordLabel",
            get text() {
              return GetLocalization("#TestRecord_LastDamage");
            }
          }, _el$32);
          libs.createElement("Label", {
            id: "DummyLastDamage",
            "class": "DummyDamageRecordValue",
            text: "0"
          }, _el$32);
          const _el$35 = libs.createElement("Panel", {
            "class": "DummyDamageRecordRow"
          }, _el$25),
          _el$36 = libs.createElement("Label", {
            "class": "DummyDamageRecordLabel",
            get text() {
              return GetLocalization("#TestRecord_RecordTime");
            }
          }, _el$35),
          _el$37 = libs.createElement("Label", {
            id: "DummyRecordTime",
            "class": "DummyDamageRecordValue",
            get text() {
              return LocalizeWithVars("#TestRecord_RecordTimeValue", {
                time: "0.0"
              });
            }
          }, _el$35);
          libs.createElement("ProgressBar", {
            id: "DummyDamageCountdownBar",
            value: 0
          }, _el$25);
          libs.createElement("Panel", {
            id: "DummyAbilityDamageList"
          }, _el$24);
        libs.effect(_p$ => {
          const _v$ = GetLocalization("#TestRecord_TotalDamage"),
            _v$2 = GetLocalization("#TestRecord_DPS"),
            _v$3 = GetLocalization("#TestRecord_LastDamage"),
            _v$4 = GetLocalization("#TestRecord_RecordTime"),
            _v$5 = LocalizeWithVars("#TestRecord_RecordTimeValue", {
              time: "0.0"
            });
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$27, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$30, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$33, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$36, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$37, "text", _v$5, _p$._v$5));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined
        });
        return _el$24;
      }
    }), null);
    libs.insert(_el$23, libs.createComponent(HealthBar, {}), null);
    return _el$23;
  })();
};
const ShopItemOverhead = ({
  entIndex
}) => {
  const dropItem = solid_utils.createNetDataSignal("dropped_item", String(entIndex));
  const interactables = solid_utils.createNetDataSignal("interactables", "list");
  const playerResource = solid_utils.createPlayerNetDataSignal("player_data", "resource");
  const playerHeroIndex = libs.createMemo(() => Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
  const itemName = libs.createMemo(() => dropItem()?.item_name ?? "item_discount_card");
  const rarity = libs.createMemo(() => dropItem()?.rarity ?? 1);
  const itemTitle = libs.createMemo(() => GetLocalization(`#DOTA_Tooltip_ability_${itemName()}`, ""));
  const [shopItemGoldCost, setShopItemGoldCost] = libs.createSignal(service_netdata_helper.getShopItemDisplayCost(playerHeroIndex(), itemName(), rarity()));
  libs.onMount(() => {
    const updateDynamicGoldCost = () => {
      const heroIndex = playerHeroIndex();
      if (heroIndex !== -1) {
        setShopItemGoldCost(service_netdata_helper.getShopItemDisplayCost(heroIndex, itemName(), rarity()));
      }
    };
    updateDynamicGoldCost();
    const timer = setInterval(updateDynamicGoldCost, 500);
    libs.onCleanup(() => clearInterval(timer));
  });
  const goldCost = libs.createMemo(() => {
    if (dropItem()?.is_free == true) {
      return 0;
    }
    const syncedCost = interactables()?.[String(entIndex)]?.costInfo?.cost;
    if (syncedCost != undefined && syncedCost > 0) {
      return syncedCost;
    }
    return shopItemGoldCost();
  });
  const enoughGold = libs.createMemo(() => {
    return (playerResource()?.gold ?? 0) >= goldCost();
  });
  return (() => {
    const _el$40 = libs.createElement("Panel", {
        id: "OverheadContent",
        "class": "ShopItemContent"
      }, null),
      _el$41 = libs.createElement("Label", {
        "class": "ShopItemName",
        get text() {
          return itemTitle();
        }
      }, _el$40),
      _el$42 = libs.createElement("Label", {
        "class": "CostLabel GoldCost",
        get text() {
          return goldCost();
        }
      }, _el$40);
    libs.insert(_el$40, libs.createComponent(common_item.CommonItem, {
      get itemName() {
        return itemName();
      },
      get rarity() {
        return rarity();
      }
    }), null);
    libs.effect(_p$ => {
      const _v$6 = itemTitle(),
        _v$7 = goldCost() > 0,
        _v$8 = {
          NoEnoughGold: !enoughGold()
        },
        _v$9 = goldCost();
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$41, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$42, "visible", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$42, "classList", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$42, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$40;
  })();
};
const ClientItemOverhead = ({
  entIndex
}) => {
  const dropItem = solid_utils.createNetDataSignal("dropped_item", String(entIndex));
  const itemID = libs.createMemo(() => dropItem()?.item_id ?? "");
  if (dropItem()?.show_tip) {
    return (() => {
      const _el$43 = libs.createElement("Panel", {
          id: "OverheadContent",
          "class": "ClientItemContent"
        }, null),
        _el$44 = libs.createElement("Label", {
          get ["class"]() {
            return libs.classNames("ClientItemID", "Rarity" + dropItem()?.rarity);
          },
          get text() {
            return "#" + itemID();
          }
        }, _el$43);
      libs.effect(_p$ => {
        const _v$0 = libs.classNames("ClientItemID", "Rarity" + dropItem()?.rarity),
          _v$1 = "#" + itemID();
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$44, "class", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$44, "text", _v$1, _p$._v$1));
        return _p$;
      }, {
        _v$0: undefined,
        _v$1: undefined
      });
      return _el$43;
    })();
  }
};
const NpcOverhead = ({
  entIndex
}) => {
  const npcData = libs.createMemo(() => getNpcData(entIndex));
  const npcName = libs.createMemo(() => npcData()?.name ?? "unknown");
  const playerID = libs.createMemo(() => npcData()?.playerID);
  const isPublicNpc = libs.createMemo(() => playerID() === undefined);
  const iconPath = libs.createMemo(() => {
    const name = npcName();
    if (name === "fishpond" || name === "fisherman" || name === "hunt_save") return undefined;
    const icon = name === "npc_arena" ? "pvp" : name;
    return getSrcPath("hud/hud_icon/h_room_" + icon + ".png");
  });
  const npcNameText = libs.createMemo(() => {
    const playerName = isPublicNpc() ? "" : Players.GetPlayerName(playerID());
    return LocalizeWithVars(`#npc_${npcName()}`, {
      playerName: playerName
    });
  });
  return (() => {
    const _el$45 = libs.createElement("Panel", {
        id: "OverheadContent",
        "class": "NpcContent"
      }, null),
      _el$47 = libs.createElement("Label", {
        id: "NpcName",
        get text() {
          return npcNameText();
        }
      }, _el$45);
    libs.insert(_el$45, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!isPublicNpc())() && iconPath() !== undefined;
      },
      get children() {
        const _el$46 = libs.createElement("Image", {
          id: "NpcIcon",
          get src() {
            return iconPath();
          },
          scaling: "stretch-to-fit-preserve-aspect"
        }, null);
        libs.effect(_$p => libs.setProp(_el$46, "src", iconPath(), _$p));
        return _el$46;
      }
    }), _el$47);
    libs.effect(_$p => libs.setProp(_el$47, "text", npcNameText(), _$p));
    return _el$45;
  })();
};
function getOverheadComponent(type, entIndex) {
  switch (type) {
    case "Hero":
      return HeroOverhead;
    case "Unit":
      return UnitOverhead;
    case "ShopItem":
      return ShopItemOverhead;
    case "ClientItem":
      return ClientItemOverhead;
    case "Npc":
      return NpcOverhead;
  }
}
(() => {
  const dungeon_loading = solid_utils.createPlayerNetDataSignal("common", "dungeon_loading", {
    state: false
  });
  const boss_intro = solid_utils.createNetDataSignal("common", "boss_intro", {
    state: false
  });
  libs.createEffect(() => {
    $.GetContextPanel().SetHasClass("DungeonLoading", (dungeon_loading()?.state ?? false) || (boss_intro()?.state ?? false));
  });
  const heroContainer = $("#HeroOverHeadContainer");
  const unitContainer = $("#CommonOverheadContainer");
  const recycleBin = $("#RecycleBin");
  heroContainer.RemoveAndDeleteChildren();
  unitContainer.RemoveAndDeleteChildren();
  recycleBin.RemoveAndDeleteChildren();
  let lastHoveredEntity = -1;
  const overheadEntries = new Map();
  const dummyDamageRecords = new Map();
  let trackedEntities = [];
  let nextEntityListRefreshTime = 0;
  let nextEntityStateRefreshTime = 0;
  let nextHealthRefreshTime = 0;
  let nextDummyRecordRefreshTime = 0;
  GameEvents.Subscribe("dummy_damage_record", data => {
    const victim = data.victim;
    const abilityName = typeof data.ability_name === "string" && data.ability_name !== "" ? data.ability_name : DUMMY_NORMAL_ATTACK_KEY;
    const damage = toFiniteNumber(data.damage);
    if (damage <= 0 || !Entities.IsValidEntity(victim)) {
      return;
    }
    const now = Game.GetGameTime();
    let record = dummyDamageRecords.get(victim);
    if (record === undefined || now >= record.endTime) {
      record = {
        totalDamage: damage,
        dps: damage,
        lastDamage: damage,
        startTime: now,
        endTime: now + DUMMY_RECORD_RESET_TIME,
        damageByAbility: new Map()
      };
      dummyDamageRecords.set(victim, record);
    } else {
      record.totalDamage += damage;
      const elapsed = now - record.startTime;
      record.dps = elapsed <= 0 ? record.totalDamage : record.totalDamage / elapsed;
      record.lastDamage = damage;
      record.endTime = now + DUMMY_RECORD_RESET_TIME;
    }
    record.damageByAbility.set(abilityName, (record.damageByAbility.get(abilityName) ?? 0) + damage);
  });
  function refreshTrackedEntities() {
    const entitiesByIndex = new Map();
    const addEntities = (entities, type) => {
      for (let i = 0; i < entities.length; i++) {
        entitiesByIndex.set(entities[i], type);
      }
    };
    addEntities(Entities.GetAllHeroEntities(), "Hero");
    const units = Entities.GetAllEntitiesByName("npc_dota_creature");
    for (let i = 0; i < units.length; i++) {
      const entIndex = units[i];
      entitiesByIndex.set(entIndex, getOverheadType(entIndex));
    }
    addEntities(Entities.GetAllEntitiesByName("shop_item"), "ShopItem");
    addEntities(Entities.GetAllEntitiesByName("client_item"), "ClientItem");
    if (CustomUIConfig.NpcManager !== undefined) {
      addEntities(CustomUIConfig.NpcManager.GetNpcEntityList(), "Npc");
    }
    trackedEntities = [];
    for (const [entIndex, type] of entitiesByIndex) {
      trackedEntities.push({
        entIndex,
        type
      });
    }
  }
  function removeOverheadEntry(entry) {
    overheadEntries.delete(entry.entIndex);
    if (entry.panel.IsValid()) {
      entry.panel.SetParent(recycleBin);
    }
  }
  function createOverheadEntry(entIndex, type, container) {
    const panel = createOverheadPanel(container, entIndex, type);
    const cache = createPanelCache(panel);
    const config = getHealthBarConfig(entIndex, type);
    const entry = {
      entIndex,
      type,
      panel,
      cache,
      config,
      isNew: true
    };
    if (cache.bar !== null && config.width !== -1) {
      cache.bar.style.width = config.width + "px";
      cache.lastBarWidth = config.width;
    }
    if (cache.healthProgress !== null && config.height !== -1) {
      cache.healthProgress.style.height = config.height + "px";
      cache.lastHealthHeight = config.height;
    }
    overheadEntries.set(entIndex, entry);
    if (type === "Hero" || type === "Unit") {
      updateHealthBar(entry);
    }
    if (type === "Hero") {
      updateRageBar(entry, arenaSession() !== undefined);
    }
    return entry;
  }
  function refreshVisibleEntries() {
    const visibleEntities = new Set();
    for (let i = 0; i < trackedEntities.length; i++) {
      const {
        entIndex,
        type
      } = trackedEntities[i];
      if (!shouldShowOverhead(entIndex, type)) {
        continue;
      }
      const container = type === "Hero" ? heroContainer : unitContainer;
      let entry = overheadEntries.get(entIndex);
      if (entry !== undefined && (!entry.panel.IsValid() || entry.type !== type)) {
        removeOverheadEntry(entry);
        entry = undefined;
      }
      if (entry === undefined) {
        createOverheadEntry(entIndex, type, container);
      }
      visibleEntities.add(entIndex);
    }
    for (const entry of [...overheadEntries.values()]) {
      if (!visibleEntities.has(entry.entIndex)) {
        removeOverheadEntry(entry);
      }
    }
  }
  function update() {
    $.Schedule(0, update);
    const cursorEntity = GetCursorEntity();
    const localPlayer = Players.GetLocalPlayer();
    const selectedEntities = Players.GetSelectedEntities(localPlayer) ?? [];
    const currentTime = Game.Time();
    const gameTime = Game.GetGameTime();
    const screenWidth = Game.GetScreenWidth();
    const screenHeight = Game.GetScreenHeight();
    if (currentTime >= nextEntityListRefreshTime) {
      refreshTrackedEntities();
      nextEntityListRefreshTime = currentTime + ENTITY_LIST_REFRESH_INTERVAL;
    }
    const refreshEntityState = currentTime >= nextEntityStateRefreshTime;
    if (refreshEntityState) {
      refreshVisibleEntries();
      nextEntityStateRefreshTime = currentTime + ENTITY_STATE_REFRESH_INTERVAL;
    }
    const refreshHealth = currentTime >= nextHealthRefreshTime;
    if (refreshHealth) {
      nextHealthRefreshTime = currentTime + HEALTH_REFRESH_INTERVAL;
    }
    const refreshDummyRecord = currentTime >= nextDummyRecordRefreshTime;
    if (refreshDummyRecord) {
      cleanupDummyDamageRecords(gameTime);
      nextDummyRecordRefreshTime = currentTime + DUMMY_RECORD_REFRESH_INTERVAL;
    }
    const selectedEntity = selectedEntities.length === 1 ? selectedEntities[0] : -1;
    const hasHeroUpgrade = refreshEntityState && isHeroHasUpgrade();
    const isArenaActive = refreshHealth && arenaSession() !== undefined;
    for (const entry of overheadEntries.values()) {
      if (!Entities.IsValidEntity(entry.entIndex)) {
        setPanelScreenVisibility(entry, false);
        continue;
      }
      const origin = Entities.GetAbsOrigin(entry.entIndex);
      const offset = entry.config.offset === -1 ? 150 : entry.config.offset;
      const screenX = Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset);
      const screenY = Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset);
      if (screenX < 0 || screenX > screenWidth || screenY < 0 || screenY > screenHeight) {
        setPanelScreenVisibility(entry, false);
        continue;
      }
      setPanelScreenVisibility(entry, true);
      updatePanelPosition(entry, screenX, screenY);
      updatePanelInteractionClasses(entry, cursorEntity, selectedEntity, lastHoveredEntity);
      if (refreshEntityState) {
        updatePanelStateClasses(entry, hasHeroUpgrade, localPlayer);
      }
      if (refreshHealth && (entry.type === "Hero" || entry.type === "Unit")) {
        updateHealthBar(entry);
      }
      if (refreshHealth && entry.type === "Hero") {
        updateRageBar(entry, isArenaActive);
      }
      if (refreshDummyRecord && entry.type === "Unit") {
        updateDummyDamageRecord(entry, gameTime);
      }
      if (entry.isNew) {
        entry.panel.RemoveClass("New");
        entry.isNew = false;
      }
    }
    cleanupRecycleBin();
    if (cursorEntity !== -1) {
      lastHoveredEntity = cursorEntity;
    }
  }
  function createOverheadPanel(container, entIndex, type) {
    const panel = $.CreatePanel("Panel", container, entIndex.toString());
    panel.hittest = false;
    panel.AddClass("Overhead");
    panel.AddClass(type);
    panel.AddClass("New");
    const Component = getOverheadComponent(type);
    const dispose = libs.render(() => libs.createComponent(Component, {
      entIndex: entIndex
    }), panel);
    SaveData(panel, "_SOLIDJS_DISPOSE_", dispose);
    return panel;
  }
  function createPanelCache(panel) {
    const healthProgress = panel.FindChildTraverse("HealthProgress");
    const shieldProgress = panel.FindChildTraverse("ShieldProgress");
    const rageProgress = panel.FindChildTraverse("RageProgress");
    return {
      bar: panel.FindChildTraverse("Bar"),
      healthProgress,
      healthLeft: healthProgress?.FindChildTraverse("HealthProgress_Left") ?? null,
      healthLoss: healthProgress?.FindChildTraverse("HealthProgress_Loss") ?? null,
      shieldProgress,
      shieldBar: shieldProgress?.FindChildTraverse("ShieldProgress_Bar") ?? null,
      rageProgress,
      rageBar: rageProgress?.FindChildTraverse("RageProgress_Bar") ?? null,
      dashBar: panel.FindChildTraverse("DashCharge_Bar"),
      dummyRecord: panel.FindChildTraverse("DummyDamageRecord"),
      dummyDamageSummary: panel.FindChildTraverse("DummyDamageSummary"),
      dummyAbilityList: panel.FindChildTraverse("DummyAbilityDamageList"),
      dummyAbilityDpsLabels: new Map(),
      dummyCountdown: panel.FindChildTraverse("DummyDamageCountdownBar"),
      dummyTotalDamage: panel.FindChildTraverse("DummyTotalDamage"),
      dummyDps: panel.FindChildTraverse("DummyDps"),
      dummyLastDamage: panel.FindChildTraverse("DummyLastDamage"),
      dummyRecordTime: panel.FindChildTraverse("DummyRecordTime")
    };
  }
  function cleanupDummyDamageRecords(gameTime) {
    for (const [entIndex, record] of dummyDamageRecords) {
      if (!Entities.IsValidEntity(entIndex) || gameTime >= record.endTime) {
        dummyDamageRecords.delete(entIndex);
      }
    }
  }
  function updateDummyDamageRecord(entry, gameTime) {
    const cache = entry.cache;
    if (cache.dummyRecord === null) {
      return;
    }
    const record = dummyDamageRecords.get(entry.entIndex);
    const abilityDamageList = record === undefined || entry.lastIsCursor !== true ? [] : [...record.damageByAbility.entries()].sort((a, b) => b[1] - a[1]);
    const showAbilityList = abilityDamageList.length > 0;
    cache.dummyRecord.SetHasClass("ShowAbilityList", showAbilityList);
    const elapsed = record === undefined ? 0 : Math.max(0, gameTime - record.startTime);
    const abilityListSignature = showAbilityList ? `${record?.totalDamage ?? 0}|${abilityDamageList.map(([abilityName, damage]) => `${abilityName}:${damage}`).join("|")}` : "";
    if (cache.dummyAbilityList !== null && cache.lastDummyAbilityList !== abilityListSignature) {
      cache.dummyAbilityList.RemoveAndDeleteChildren();
      cache.dummyAbilityDpsLabels.clear();
      const header = $.CreatePanel("Panel", cache.dummyAbilityList, "");
      header.AddClass("DummyAbilityDamageHeader");
      for (const [text, className] of [["技能", "AbilityColumn"], ["DPS", "DpsColumn"], ["伤害", "DamageColumn"], ["占比", "RatioColumn"]]) {
        const label = $.CreatePanel("Label", header, "");
        label.AddClass(className);
        label.text = text;
      }
      for (const [abilityName, damage] of abilityDamageList) {
        const row = $.CreatePanel("Panel", cache.dummyAbilityList, "");
        row.AddClass("DummyAbilityDamageRow");
        const icon = $.CreatePanel("DOTAAbilityImage", row, "", {
          abilityname: abilityName === DUMMY_NORMAL_ATTACK_KEY ? "" : abilityName
        });
        icon.AddClass("DummyAbilityDamageIcon");
        const nameLabel = $.CreatePanel("Label", row, "");
        nameLabel.AddClass("DummyAbilityDamageName");
        nameLabel.text = abilityName === DUMMY_NORMAL_ATTACK_KEY ? "普通攻击" : GetLocalization(`#DOTA_Tooltip_ability_${abilityName}`, abilityName);
        const abilityDps = elapsed <= 0 ? damage : damage / elapsed;
        const dpsLabel = $.CreatePanel("Label", row, "");
        dpsLabel.AddClass("DummyAbilityDamageDps");
        dpsLabel.text = formatDummyDamage(abilityDps);
        cache.dummyAbilityDpsLabels.set(abilityName, dpsLabel);
        const damageLabel = $.CreatePanel("Label", row, "");
        damageLabel.AddClass("DummyAbilityDamageValue");
        damageLabel.text = formatDummyDamage(damage);
        const ratioLabel = $.CreatePanel("Label", row, "");
        ratioLabel.AddClass("DummyAbilityDamageRatio");
        ratioLabel.text = record !== undefined && record.totalDamage > 0 ? (damage / record.totalDamage * 100).toFixed(1) + "%" : "0.0%";
      }
      cache.lastDummyAbilityList = abilityListSignature;
    }
    for (const [abilityName, damage] of abilityDamageList) {
      const dpsLabel = cache.dummyAbilityDpsLabels.get(abilityName);
      if (dpsLabel !== undefined && dpsLabel.IsValid()) {
        const abilityDps = elapsed <= 0 ? damage : damage / elapsed;
        dpsLabel.text = formatDummyDamage(abilityDps);
      }
    }
    const active = record !== undefined;
    if (cache.lastDummyActive !== active) {
      cache.dummyRecord.SetHasClass("ShowCountdown", active);
      cache.lastDummyActive = active;
    }
    const totalDamage = formatDummyDamage(record?.totalDamage ?? 0);
    const dps = formatDummyDamage(record?.dps ?? 0);
    const lastDamage = FormatNumber(record?.lastDamage ?? 0);
    const recordTime = LocalizeWithVars("#TestRecord_RecordTimeValue", {
      time: elapsed.toFixed(1)
    });
    if (cache.dummyTotalDamage !== null && cache.lastDummyTotalDamage !== totalDamage) {
      cache.dummyTotalDamage.text = totalDamage;
      cache.lastDummyTotalDamage = totalDamage;
    }
    if (cache.dummyDps !== null && cache.lastDummyDps !== dps) {
      cache.dummyDps.text = dps;
      cache.lastDummyDps = dps;
    }
    if (cache.dummyLastDamage !== null && cache.lastDummyLastDamage !== lastDamage) {
      cache.dummyLastDamage.text = lastDamage;
      cache.lastDummyLastDamage = lastDamage;
    }
    if (cache.dummyRecordTime !== null && cache.lastDummyRecordTime !== recordTime) {
      cache.dummyRecordTime.text = recordTime;
      cache.lastDummyRecordTime = recordTime;
    }
    const countdown = record === undefined ? 0 : Clamp((record.endTime - gameTime) / DUMMY_RECORD_RESET_TIME, 0, 1);
    if (cache.dummyCountdown !== null && cache.lastDummyCountdown !== countdown) {
      cache.dummyCountdown.value = countdown;
      cache.lastDummyCountdown = countdown;
    }
  }
  function updatePanelPosition(entry, screenX, screenY) {
    const panel = entry.panel;
    const dummySummary = entry.cache.dummyDamageSummary;
    const dummyBar = dummySummary === null ? null : entry.cache.bar;
    const anchorCenterX = dummySummary === null ? panel.actuallayoutwidth / 2 : dummySummary.GetPositionWithinAncestor(panel).x + dummySummary.actuallayoutwidth / 2;
    const anchorBottomY = dummyBar === null ? panel.actuallayoutheight : dummyBar.GetPositionWithinAncestor(panel).y + dummyBar.actuallayoutheight;
    const x = (screenX - anchorCenterX) / panel.actualuiscale_x;
    const y = (screenY - anchorBottomY) / panel.actualuiscale_y;
    if (entry.lastX !== x || entry.lastY !== y) {
      panel.SetPositionInPixels(x, y, 0);
      entry.lastX = x;
      entry.lastY = y;
    }
  }
  function setPanelScreenVisibility(entry, visible) {
    if (entry.lastScreenVisible !== visible) {
      entry.panel.visible = visible;
      entry.lastScreenVisible = visible;
    }
  }
  function updatePanelInteractionClasses(entry, cursorEntity, selectedEntity, lastHovered) {
    const isCursor = entry.entIndex === cursorEntity;
    const isSelected = entry.entIndex === selectedEntity && entry.lastIsControllable === true;
    const isUpper = entry.entIndex === lastHovered;
    if (entry.lastIsCursor !== isCursor) {
      entry.panel.SetHasClass("IsCursor", isCursor);
      entry.lastIsCursor = isCursor;
    }
    if (entry.lastIsSelected !== isSelected) {
      entry.panel.SetHasClass("IsSelected", isSelected);
      entry.lastIsSelected = isSelected;
    }
    if (entry.lastIsUpper !== isUpper) {
      entry.panel.SetHasClass("IsUpper", isUpper);
      entry.lastIsUpper = isUpper;
    }
  }
  function updatePanelStateClasses(entry, hasHeroUpgrade, localPlayer) {
    const panel = entry.panel;
    const isEnemy = Entities.IsEnemy(entry.entIndex);
    const isControllable = Entities.IsControllableByPlayer(entry.entIndex, localPlayer);
    if (entry.lastIsEnemy !== isEnemy) {
      panel.SetHasClass("IsEnemy", isEnemy);
      entry.lastIsEnemy = isEnemy;
    }
    entry.lastIsControllable = isControllable;
    if (entry.type !== "Hero") {
      return;
    }
    const fishing = Entities.HasBuff(entry.entIndex, "modifier_fishing");
    if (entry.lastFishing !== fishing) {
      panel.SetHasClass("Fishing", fishing);
      entry.lastFishing = fishing;
    }
    const hasUpgrade = !fishing && hasHeroUpgrade;
    if (entry.lastHasUpgrade !== hasUpgrade) {
      panel.SetHasClass("HasUpgrade", hasUpgrade);
      entry.lastHasUpgrade = hasUpgrade;
    }
    const canThrowHook = fishing && Buffs.GetStackCount(entry.entIndex, Entities.FindBuffByName(entry.entIndex, "modifier_fishing")) === 0;
    if (entry.lastCanThrowHook !== canThrowHook) {
      panel.SetHasClass("canThrowHook", canThrowHook);
      entry.lastCanThrowHook = canThrowHook;
    }
  }
  function updateHealthBar(entry) {
    const {
      entIndex,
      cache
    } = entry;
    const healthProgress = cache.healthProgress;
    if (healthProgress === null) return;
    const health = Entities.GetHealth(entIndex);
    const maxHealth = Entities.GetMaxHealth(entIndex);
    const percent = maxHealth > 0 ? health / maxHealth : 0;
    const percentStr = formatPanoramaPercent(percent * 100);
    if (cache.lastHealthPercent !== percent) {
      cache.lastHealthPercent = percent;
      const leftBar = cache.healthLeft;
      const lossBar = cache.healthLoss;
      if (leftBar !== null) leftBar.style.width = percentStr;
      if (lossBar !== null) lossBar.style.width = percentStr;
    }
    const shieldProgress = cache.shieldProgress;
    if (shieldProgress !== null) {
      const shieldBuff = Entities.FindBuffByName(entIndex, "modifier_shield");
      let shieldValue = 0;
      if (shieldBuff !== -1) {
        shieldValue = Buffs.GetStackCount(entIndex, shieldBuff);
      }
      let shieldDenominator = Math.max(cache.lastShieldDenominator ?? 0, maxHealth);
      if (shieldValue <= 0) {
        shieldDenominator = maxHealth;
      } else if (shieldValue > shieldDenominator) {
        shieldDenominator = shieldValue;
      }
      if (cache.lastShieldValue !== shieldValue || cache.lastShieldDenominator !== shieldDenominator) {
        cache.lastShieldValue = shieldValue;
        cache.lastShieldDenominator = shieldDenominator;
        const shieldPercent = shieldDenominator > 0 ? Math.min(1, shieldValue / shieldDenominator) : 0;
        const shieldPercentStr = formatPanoramaPercent(shieldPercent * 100);
        const shieldBar = cache.shieldBar;
        if (shieldBar !== null) {
          shieldBar.style.width = shieldPercentStr;
        }
        shieldProgress.SetHasClass("HasShield", shieldValue > 0);
      }
    }
    if (Entities.IsRealHero(entIndex)) {
      const abilityIndex = Entities.GetAbility(entIndex, 1);
      const cooldownRemaining = Abilities.GetCooldownTimeRemaining(abilityIndex);
      const cooldownLength = Abilities.GetAbilityCooldown(abilityIndex);
      const chargeInfo = Abilities.GetChargeInfo(abilityIndex);
      const maxCharges = chargeInfo.maxCharge;
      const chargeRemainingTime = chargeInfo.isChargeCooldownFrozen ? Math.max(0, chargeInfo.chargeFrozenCooldownRemaining ?? 0) : Math.max(0, chargeInfo.chargeRestoreTime - Game.GetGameTime());
      const displayCooldownRemaining = maxCharges > 1 && chargeInfo.charge === 0 ? Math.max(cooldownRemaining, chargeRemainingTime) : cooldownRemaining;
      const cooldownPct = cooldownLength > 0 ? displayCooldownRemaining / cooldownLength : 0;
      const cooldownPercent = Math.max(0, Math.min(100, finiteNumber(100 - cooldownPct * 100)));
      const cooldownPercentStr = formatPanoramaPercent(cooldownPercent);
      const dashBar = cache.dashBar;
      if (dashBar !== null) {
        const dashReady = cooldownPct === 0;
        if (cache.lastDashReady !== dashReady) {
          dashBar.SetHasClass("DashReady", dashReady);
          cache.lastDashReady = dashReady;
        }
        if (cache.lastDashPercent !== cooldownPercent) {
          dashBar.style.width = cooldownPercentStr;
          cache.lastDashPercent = cooldownPercent;
        }
      }
    }
  }
  function updateRageBar(entry, visible) {
    const {
      entIndex,
      cache
    } = entry;
    const rageProgress = cache.rageProgress;
    if (rageProgress === null) return;
    if (cache.lastRageVisible !== visible) {
      rageProgress.SetHasClass("Visible", visible);
      cache.lastRageVisible = visible;
    }
    if (!visible || cache.rageBar === null) return;
    const rage = Entities.GetMana(entIndex);
    const maxRage = Entities.GetMaxMana(entIndex);
    const percent = maxRage > 0 ? Math.max(0, Math.min(1, rage / maxRage)) : 0;
    if (cache.lastRagePercent !== percent) {
      cache.rageBar.style.width = formatPanoramaPercent(percent * 100);
      cache.lastRagePercent = percent;
    }
  }
  function cleanupRecycleBin() {
    if (recycleBin.GetChildCount() === 0) return;
    for (let i = recycleBin.GetChildCount() - 1; i >= 0; i--) {
      const child = recycleBin.GetChild(i);
      if (child?.IsValid()) {
        const dispose = LoadData(child, "_SOLIDJS_DISPOSE_");
        SaveData(child, "_SOLIDJS_DISPOSE_", undefined);
        SaveData(child, "_OVERHEAD_CACHE_", undefined);
        if (dispose) {
          try {
            dispose();
          } catch {}
        }
      }
    }
    recycleBin.RemoveAndDeleteChildren();
  }
  update();
})();