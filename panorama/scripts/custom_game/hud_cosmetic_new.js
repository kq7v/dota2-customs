--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var CosmeticCard = require('./CosmeticCard.js');
var CosmeticPreview = require('./CosmeticPreview.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_Loading = require('./EOM_Loading.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var EOM_Separator = require('./EOM_Separator.js');
var GenericPanel = require('./GenericPanel.js');
var HeroRoleCard = require('./HeroRoleCard.js');
var netdata_utils = require('./netdata_utils.js');
require('./EOM_Countdown.js');
require('./CourierTitle.js');
require('./EOM_PortraitFullBody.js');
require('./Player.js');
require('./WinStreak.js');
require('./Heroes.js');
require('./profile_info.js');
require('./MenuMarkIcon.js');
require('./EOM_Portrait.js');
require('./SectIcon.js');

function SetHeroSkinLive(oid) {
  SetCosmeticPreviewLive(oid);
  let hide = oid != undefined;
  let p = $.GetContextPanel();
  while (p?.IsValid() && !p.BHasClass("CustomHudRoot")) {
    p.GetParent();
  }
  if (p) {
    let pParent = p.GetParent();
    if (pParent) {
      let count = pParent?.GetChildCount();
      for (let index = 0; index < count; index++) {
        const child = pParent.GetChild(index);
        if (child?.IsValid() && child.BHasClass("CosmeticPreviewLiveHidden")) {
          child.visible = !hide;
        }
      }
    }
  }
}
const getAccessWay = (access, store_id, color_id) => {
  let [storeId, itemId] = store_id?.split(",") ?? [];
  if (access == "draw" || access == "drawExchange") {
    if (storeId.length == 8) {
      clientSideEvent("switchDrawPool", {
        pid: storeId
      });
    }
    if (access == "drawExchange") {
      if (itemId == undefined) {
        itemId = storeId;
      }
      clientSideEvent("openDrawExchange", {
        state: true,
        itemId: itemId
      });
    }
    ToggleWindows('MenuButton_draw', true);
  } else if (access == "store" && storeId != undefined && storeId != "") {
    clientSideEvent('directly_purchase', {
      itemid: storeId
    });
  } else if (access == "coloring") {
    showPopup("ColoringUnlock", {
      cosmeticId: Number(color_id),
      group: "ColoringUnlock"
    });
  } else if (access == "activity") {
    ToggleWindows('MenuButton_activity', true);
    if (storeId != undefined && storeId != "") {
      clientSideEvent("switchActivityTag", {
        id: storeId
      });
    }
  } else {
    if (access == "battlepass") {
      ToggleWindows('MenuButton_store', true);
    } else {
      ToggleWindows('MenuButton_' + access, true);
    }
  }
};
const istool = oid => {
  return KeyValues.CosmeticsKv[oid.toString()]?.tool == 1;
};
const COSMETIC_MENU_LIST = {
  CosmeticTag_hero: [OrnamentType.HERO_SKIN],
  CosmeticTag_courier: [OrnamentType.COURIER_SKIN, OrnamentType.COURIER_AMBIENT, OrnamentType.COURIER_DAMAGE, OrnamentType.COURIER_PATH, OrnamentType.COURIER_TITLE],
  CosmeticTag_wisp: [OrnamentType.WISP_SKIN],
  CosmeticTag_world: [OrnamentType.MAP, OrnamentType.BUNNY_GIRL, OrnamentType.CONSUMABLE],
  CosmeticTag_battle: [OrnamentType.TELEPORT, OrnamentType.KILL, OrnamentType.BROADCAST, OrnamentType.HOLY_LIGHT],
  CosmeticTag_emotion: [OrnamentType.EMOJI, OrnamentType.HERO_EMOJI],
  CosmeticTag_account: [OrnamentType.AVATAR_BORDER, OrnamentType.AVATAR_BACKGROUND, OrnamentType.AVATAR_DECORATION, OrnamentType.HUD_SKIN, OrnamentType.MEDAL, OrnamentType.NAME_DECORATION],
  CosmeticTag_coloring: [OrnamentType.HERO_SKIN, OrnamentType.COURIER_SKIN]
};
const useBunnyShelf = selectingID => {
  const [bunnySlot, setBunnySlot] = libs.createSignal(-1);
  const [selectedBunnySlot, setSelectedBunnySlot] = libs.createSignal(-1);
  const bunnySlotList = [1, 2, 3, 4, 5];
  const [bunnyList, setBunnyList] = libs.createSignal({});
  netdata_utils.createPlayerServiceNetTableEffect("player_bunny", data => {
    let list = {};
    Object.keys(data).forEach(key => {
      if (data[key] != -1) {
        list[data[key]] = key;
      }
    });
    setBunnyList(list);
  }, Players.GetLocalPlayer());
  const emptySlotIndex = () => {
    return bunnySlotList.find(slot => bunnyList()[slot] == undefined) ?? -1;
  };
  libs.createEffect(libs.on(() => ({
    a: selectedBunnySlot(),
    b: bunnyList()
  }), v => {
    if (selectedBunnySlot() == -1) {
      setBunnySlot(emptySlotIndex());
    } else {
      setBunnySlot(selectedBunnySlot());
    }
  }));
  const bunnyTeamPreview = () => {
    return Object.values(bunnyList()).includes(selectingID());
  };
  const refreshBunnyTeamPreview = (bunnyTeamRef, bReload = false) => {
    if (bunnyTeamRef?.IsValid()) {
      if (!bReload) {
        bunnyTeamRef.FireEntityInput('bunny_girl_1', 'TurnOn', '');
        bunnyTeamRef.FireEntityInput('bunny_girl_2', 'TurnOn', '');
        bunnyTeamRef.FireEntityInput('bunny_girl_3', 'TurnOn', '');
        bunnyTeamRef.FireEntityInput('bunny_girl_4', 'TurnOn', '');
        bunnyTeamRef.FireEntityInput('bunny_girl_5', 'TurnOn', '');
        bunnyTeamRef.FireEntityInput('pedestal_small', 'TurnOff', '');
        bunnyTeamRef.FireEntityInput('pedestal_large', 'TurnOn', '');
      } else {
        bunnyTeamRef?.ReloadScene();
      }
    }
  };
  return {
    refreshBunnyTeamPreview,
    bunnySlot,
    setSelectedBunnySlot,
    selectedBunnySlot,
    bunnyList,
    bunnySlotList,
    bunnyTeamPreview
  };
};
var emojiEvents = function (emojiEvents) {
  emojiEvents[emojiEvents["EMPTY"] = 0] = "EMPTY";
  emojiEvents[emojiEvents["KILL"] = 2] = "KILL";
  emojiEvents[emojiEvents["WIN_STREAK"] = 3] = "WIN_STREAK";
  emojiEvents[emojiEvents["STOP_WIN_STREAK"] = 4] = "STOP_WIN_STREAK";
  emojiEvents[emojiEvents["PREPARE"] = 5] = "PREPARE";
  emojiEvents[emojiEvents["LOSE"] = 6] = "LOSE";
  emojiEvents[emojiEvents["FIRST_PLACE"] = 7] = "FIRST_PLACE";
  return emojiEvents;
}(emojiEvents || {});
const useEmojiShelf = (selectingID, setPreviewID) => {
  const playerEmoji = netdata_utils.createPlayerNetData("player_emo_slots", Players.GetLocalPlayer(), {});
  const [selectedWheelSlot, setSelectedWheelSlot] = libs.createSignal(-1);
  const [wheelWaitEquipIndex, setWheelWaitEquipIndex] = libs.createSignal(-1);
  const wheelEmojiSlotArr = [1, 2, 3, 4, 5, 6, 7, 8];
  const wheelEmptySlotIndex = () => {
    return wheelEmojiSlotArr.find(slot => playerEmoji()[slot.toString()] == undefined) ?? -1;
  };
  libs.createEffect(libs.on(wheelWaitEquipIndex, v => {
    if (v == -1) {
      setSelectedWheelSlot(-1);
    }
  }));
  libs.createEffect(() => {
    if (selectedWheelSlot() == -1) {
      setWheelWaitEquipIndex(wheelEmptySlotIndex());
    } else {
      setWheelWaitEquipIndex(selectedWheelSlot());
    }
  });
  const [emojiWaitEquipIndex, setEmojiWaitEquipIndex] = libs.createSignal(emojiEvents.EMPTY);
  const heroEmojiRecord = {};
  const emojiSlotArr = [emojiEvents.KILL, emojiEvents.WIN_STREAK, emojiEvents.STOP_WIN_STREAK, emojiEvents.PREPARE, emojiEvents.LOSE, emojiEvents.FIRST_PLACE];
  let kv;
  let isToolMode = Game.IsInToolsMode();
  Object.keys(KeyValues.CosmeticsKv).forEach(oid => {
    kv = KeyValues.CosmeticsKv[oid];
    if (kv) {
      if (oid == "5100000") {
        return;
      }
      if (kv.tool == 1 && !isToolMode) {
        return;
      }
      const islot = Number(oid.slice(1, 3));
      if (islot == OrnamentType.HERO_EMOJI) {
        if (kv.hero) {
          let heroid = kv.hero.toString();
          if (heroEmojiRecord[heroid] == undefined) {
            heroEmojiRecord[heroid] = [];
          }
          heroEmojiRecord[heroid].push(oid);
        }
      }
    }
  });
  Object.keys(heroEmojiRecord).forEach(heroid => {
    heroEmojiRecord[heroid] = heroEmojiRecord[heroid].sort((a, b) => multiCompare((KeyValues.CosmeticsKv[b]?.rarity ?? 0) - (KeyValues.CosmeticsKv[a]?.rarity ?? 0), Number(b) - Number(a)));
  });
  const [selectedHeroEmojiList, setSelectedHeroEmojiList] = libs.createSignal([]);
  libs.createEffect(libs.on(selectingID, v => {
    if (selectedHeroEmojiList().toString() != (heroEmojiRecord[selectingID()] ?? []).toString()) {
      setSelectedHeroEmojiList(heroEmojiRecord[selectingID()] ?? []);
    }
  }));
  libs.createEffect(libs.on(selectedHeroEmojiList, list => {
    if (list.length > 0) {
      setEmojiWaitEquipIndex(emojiEvents.EMPTY);
      setPreviewID(list[0]);
    }
  }));
  return {
    emojiWaitEquipIndex,
    setEmojiWaitEquipIndex,
    selectedHeroEmojiList,
    emojiSlotArr,
    playerEmoji,
    wheelWaitEquipIndex,
    setWheelWaitEquipIndex,
    selectedWheelSlot,
    wheelEmojiSlotArr,
    setSelectedWheelSlot
  };
};
const useConsumableShelf = () => {
  const [consumableSlot, setConsumableSlot] = libs.createSignal(-1);
  const [selectedConsumableSlot, setSelectedConsumableSlot] = libs.createSignal(-1);
  const [playerConsumaleSlot, setPlayerConsumableSlot] = libs.createSignal({});
  const consumableSlotList = [1, 2, 3, 4, 5];
  const emptySlotIndex = () => {
    return consumableSlotList.find(slot => playerConsumaleSlot()[slot] == undefined) ?? -1;
  };
  const [playerConsumables, setPlayerConsumables] = libs.createSignal({});
  netdata_utils.createNetDataEffect("player_consumables", data => {
    let res = {};
    Object.values(data).forEach(v => {
      res[v.cid.toString()] = v.amounts;
    });
    setPlayerConsumables(res);
  }, Players.GetLocalPlayer());
  netdata_utils.createNetDataEffect("player_consumable_slots", data => {
    let slots = {};
    data.forEach(data => {
      slots[data.slot] = data.cid;
    });
    setPlayerConsumableSlot(slots);
  }, Players.GetLocalPlayer());
  libs.createEffect(libs.on([selectedConsumableSlot, playerConsumaleSlot], v => {
    if (selectedConsumableSlot() == -1) {
      setConsumableSlot(emptySlotIndex());
    } else {
      setConsumableSlot(selectedConsumableSlot());
    }
  }));
  let keyMap = {
    1: "Q",
    2: "W",
    3: "E",
    4: "D",
    5: "R"
  };
  return {
    consumableSlot,
    setConsumableSlot,
    selectedConsumableSlot,
    setSelectedConsumableSlot,
    playerConsumaleSlot,
    consumableSlotList,
    playerConsumables,
    keyMap
  };
};
const useCosmetic = () => {
  const [show, setShow] = libs.createSignal(false);
  const [showLive, setShowLive] = libs.createSignal(false);
  libs.createEffect(libs.on(show, v => {
    if (!v) {
      SetHeroSkinLive();
      setShowLive(false);
    }
  }));
  const [tagJumpState, setTagJumpState] = libs.createStore({
    tag: false,
    sec_tag: false
  });
  const [tag, setTag] = libs.createSignal("CosmeticTag_hero");
  const [sec_tag, setSecTag] = libs.createSignal(OrnamentType.HERO_SKIN);
  const selectedTagType = () => sec_tag() % 100;
  libs.createEffect(() => {
    if (tag() != "CosmeticTag_battle") {
      GameEvents.SendEventClientSide("custom_update_preview_attacker_model", {
        model: ""
      });
    }
  });
  const playerOrnament = netdata_utils.createPlayerNetData("player_ornament", Players.GetLocalPlayer(), {});
  const [experienceCosmeticData, setExperienceCosmeticData] = libs.createSignal();
  const updateExperienceCosmeticData = () => {
    const info_prop = getNetDataCache("info_prop");
    const player_props = getNetDataCache("player_props", Players.GetLocalPlayer());
    if (info_prop == undefined || player_props == undefined) {
      return;
    }
    let data = {};
    Object.values(player_props).forEach(v => {
      if (v.amounts > 0) {
        let propInfo = info_prop[v.prop_id];
        if (propInfo && propInfo.type == 5) {
          let params = JSON.parseSafe(propInfo.param);
          if (params.type && params.type != "any") {
            data[params.type] = {
              prop_id: v.prop_id,
              id: v.id
            };
          }
        }
      }
    });
    setExperienceCosmeticData(data);
  };
  const cosmeticExperienceData = oid => {
    if (oid == undefined) {
      return;
    }
    return experienceCosmeticData()?.[oid];
  };
  const playerOrnamentExpireData = libs.createMemo(() => {
    let data = {};
    Object.values(playerOrnament()).forEach(v => {
      data[v.oid] = v.permanent == 1 ? 0 : v.expire ?? -1;
    });
    return data;
  });
  const getCosmeticExpire = oid => {
    if (oid != undefined) {
      return playerOrnamentExpireData()[oid] ?? -1;
    }
    return -1;
  };
  const sortCosmeticSheld = list => {
    let sortPlayerOrnament = Object.keys(playerOrnament()).length > 0;
    let sortExperience = experienceCosmeticData() != undefined;
    let isOwn = oid => {
      if (sortPlayerOrnament) {
        return playerOrnament()[oid] != undefined || oid.endsWith("0000");
      }
      return oid.endsWith("0000");
    };
    let getRarity = oid => {
      return KeyValues.CosmeticsKv[oid]?.rarity ?? 0;
    };
    Object.keys(list).forEach(v => {
      if (Number(v) == OrnamentType.CONSUMABLE || Number(v) == OrnamentType.HERO_EMOJI) {
        return;
      }
      list[Number(v)] = list[Number(v)].sort((a, b) => {
        if (sortExperience) {
          return multiCompare((isOwn(b) ? 1 : 0) - (isOwn(a) ? 1 : 0), getRarity(b) - getRarity(a), (cosmeticExperienceData(b) == undefined ? 0 : 1) - (cosmeticExperienceData(a) == undefined ? 0 : 1), Number(b) % 100 - Number(a) % 100);
        } else {
          return multiCompare((isOwn(b) ? 1 : 0) - (isOwn(a) ? 1 : 0), getRarity(b) - getRarity(a), Number(b) % 100 - Number(a) % 100);
        }
      });
    });
    return list;
  };
  const [cosmeticShelfList, setCosmeticShelfList] = libs.createSignal((() => {
    let list = {};
    let isToolMode = Game.IsInToolsMode();
    let kv;
    Object.keys(KeyValues.CosmeticsKv).forEach(oid => {
      kv = KeyValues.CosmeticsKv[oid];
      if (kv) {
        if (oid == "5100000") {
          return;
        }
        if (kv.tool == 1 && !isToolMode) {
          return;
        }
        const islot = Number(oid.slice(1, 3));
        if (islot == OrnamentType.HERO_EMOJI) {
          if (kv.hero) {
            oid = kv.hero.toString();
            if ((list[islot] ?? []).includes(oid)) {
              return;
            }
          } else {
            return;
          }
        }
        let tag = islot;
        if (kv.coloring != undefined) {
          tag += 100;
        }
        if (list[tag] == undefined) {
          list[tag] = [];
        }
        list[tag].push(oid);
      }
    });
    list[OrnamentType.CONSUMABLE] = Object.values(KeyValues.ConsumablesKv ?? {}).filter(v => v?.IsHidden != 1).map(v => v.Id.toString());
    return sortCosmeticSheld(list);
  })());
  libs.createEffect(libs.on([experienceCosmeticData, playerOrnament], () => {
    if (cosmeticShelfList()) {
      let newList = Object.assign({}, sortCosmeticSheld(cosmeticShelfList()));
      setCosmeticShelfList(newList);
    }
  }));
  const tagSelectedRecord = {};
  const [previewID, setPreviewID] = libs.createSignal("");
  const [selectingID, setSelectingID] = libs.createSignal("");
  const [selectedShelfList, setSelectedShelfList] = libs.createSignal([]);
  const [liveLoading, setLiveLoading] = libs.createSignal("");
  libs.createEffect(libs.on(showLive, v => {
    if (v) {
      setLiveLoading(previewID());
    } else {
      setLiveLoading("");
    }
  }));
  libs.createEffect(() => {
    const id = GameEvents.Subscribe("cosmetic_preview_live_loaded", event => {
      if (liveLoading() != "" && event.cosmetic_id == Number(liveLoading())) {
        setLiveLoading("");
      }
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
  });
  const previewOwned = () => previewID() == "" || playerOrnament()[previewID()] != undefined || previewID().endsWith("0000");
  const previewAccessInfo = () => {
    let access;
    let storeID;
    if (previewID() != "" && KeyValues.CosmeticsKv[previewID()]) {
      access = KeyValues.CosmeticsKv[previewID()].access;
      storeID = KeyValues.CosmeticsKv[previewID()].StoreID;
    }
    return {
      access,
      storeID
    };
  };
  libs.createEffect(libs.on(sec_tag, v => {
    if (v != undefined) {
      libs.batch(() => {
        if (tagSelectedRecord[v] != undefined) {
          setSelectingID(tagSelectedRecord[v]);
        } else {
          setSelectingID(cosmeticShelfList()[v]?.[0] ?? "");
        }
        let list = cosmeticShelfList()[v] ?? [];
        if (list.length != selectedShelfList().length || list.toString() != selectedShelfList().toString()) {
          setSelectedShelfList(list);
        }
      });
    }
  }));
  libs.createEffect(libs.on(selectingID, v => {
    libs.batch(() => {
      if (sec_tag() != undefined && v != "") {
        tagSelectedRecord[sec_tag()] = v;
      }
      if (selectedTagType() != OrnamentType.HERO_EMOJI) {
        setPreviewID(v);
      }
      SetHeroSkinLive();
      setShowLive(false);
    });
  }));
  const hasColoring = oid => KeyValues.CosmeticColoringList[oid] != undefined;
  const selectedColoringList = () => KeyValues.CosmeticColoringList[selectingID()] ?? [];
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useToggleWindow('MenuButton_cosmetics_new', show, setShow));
    gameEventIDList.push(useClientSideEvent('cosmetic_jump_tag', data => {
      if (data.type) {
        let jumpFilterTag = -1;
        let jumpTag = "";
        for (const tag in COSMETIC_MENU_LIST) {
          const element = COSMETIC_MENU_LIST[tag];
          if (element == data.type) {
            jumpFilterTag = data.type;
            jumpTag = tag;
            break;
          }
        }
        libs.batch(() => {
          if (jumpTag != "") {
            setTagJumpState("tag", true);
            $.Schedule(0.1, () => {
              setTag(jumpTag);
              setTagJumpState("tag", false);
            });
          }
          if (jumpFilterTag != -1) {
            setTagJumpState("sec_tag", true);
            $.Schedule(0.1, () => {
              setSecTag(jumpFilterTag);
              setTagJumpState("sec_tag", false);
            });
          }
        });
      }
    }));
    gameEventIDList.push(useClientSideEvent('jump_to_courier_cosmetic', () => {
      setTag('CosmeticTag_courier');
    }));
    gameEventIDList.push(useClientSideEvent('jump_to_account', () => {
      setTag('CosmeticTag_account');
    }));
    gameEventIDList.push(useClientSideEvent('jump_to_bunny_cosmetic', () => {
      setTag('CosmeticTag_world');
      setSecTag(31);
    }));
    gameEventIDList.push(useNetData("player_props", data => {
      updateExperienceCosmeticData();
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_prop", data => {
      updateExperienceCosmeticData();
    }));
    libs.onCleanup(() => {
      for (const id of gameEventIDList) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
  return {
    show,
    tag,
    setTag,
    sec_tag,
    setSecTag,
    tagJumpState,
    getCosmeticExpire,
    hasColoring,
    previewID,
    setPreviewID,
    previewOwned,
    selectingID,
    setSelectingID,
    cosmeticShelfList,
    selectedShelfList,
    selectedColoringList,
    selectedTagType,
    playerOrnament,
    cosmeticExperienceData,
    previewAccessInfo,
    setShowLive,
    showLive,
    setLiveLoading,
    liveLoading
  };
};
const Cosmetic = () => {
  const {
    show,
    tag,
    setTag,
    sec_tag,
    setSecTag,
    tagJumpState,
    getCosmeticExpire,
    hasColoring,
    previewID,
    setPreviewID,
    previewOwned,
    selectingID,
    setSelectingID,
    selectedShelfList,
    selectedColoringList,
    selectedTagType,
    playerOrnament,
    cosmeticExperienceData,
    previewAccessInfo,
    setShowLive,
    showLive,
    setLiveLoading,
    liveLoading
  } = useCosmetic();
  const {
    consumableSlot,
    selectedConsumableSlot,
    setSelectedConsumableSlot,
    playerConsumaleSlot,
    playerConsumables,
    consumableSlotList,
    keyMap
  } = useConsumableShelf();
  const {
    emojiWaitEquipIndex,
    setEmojiWaitEquipIndex,
    selectedHeroEmojiList,
    emojiSlotArr,
    playerEmoji,
    wheelWaitEquipIndex,
    setWheelWaitEquipIndex,
    selectedWheelSlot,
    wheelEmojiSlotArr,
    setSelectedWheelSlot
  } = useEmojiShelf(selectingID, setPreviewID);
  let bunnyTeamRef;
  const {
    refreshBunnyTeamPreview,
    bunnySlot,
    setSelectedBunnySlot,
    selectedBunnySlot,
    bunnyList,
    bunnySlotList,
    bunnyTeamPreview
  } = useBunnyShelf(selectingID);
  libs.createEffect(libs.on(bunnyList, v => {
    refreshBunnyTeamPreview(bunnyTeamRef, true);
  }));
  libs.createEffect(libs.on(bunnyTeamPreview, v => {
    refreshBunnyTeamPreview(bunnyTeamRef, true);
  }));
  const IsLocked = oid => playerOrnament()[oid] == undefined && !oid.endsWith("0000");
  const isEquip = (cosmeticID, isColorList) => {
    if (sec_tag() == 99) {
      return Object.values(playerConsumaleSlot()).includes(Number(cosmeticID));
    }
    if (cosmeticID.slice(0, 3) == "550") {
      return wheelEmojiSlotArr.some(v => playerEmoji()[v.toString()]?.eid == Number(cosmeticID));
    }
    if (cosmeticID.slice(-4) == "0000") {
      let slot = cosmeticID.slice(1, 3);
      if (slot == "31") return false;
      const cosmeticData = playerOrnament()[cosmeticID];
      if (cosmeticData && cosmeticData.pool.toString() == slot && cosmeticData.equip == 1) {
        return false;
      }
      return true;
    }
    if (!isColorList && KeyValues.CosmeticsKv[cosmeticID]?.hasColoring == 1) {
      for (const oid in playerOrnament()) {
        if (playerOrnament()[oid].equip == 1 && KeyValues.CosmeticsKv[oid]?.coloring == cosmeticID) {
          return true;
        }
      }
    }
    return (playerOrnament()[cosmeticID]?.equip ?? 0) == 1;
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "CosmeticMain",
    get className() {
      return libs.classNames({
        ShowLive: showLive()
      });
    },
    renderOnShow: true,
    get show() {
      return show();
    },
    name: "MenuButton_cosmetics_new",
    get hittest() {
      return show();
    },
    onactivate: () => {},
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "CosmeticLiveLoading",
        hittest: false,
        get visible() {
          return liveLoading() != "";
        },
        get children() {
          return libs.createComponent(EOM_Loading.EOM_Loading, {
            align: "center center",
            type: "Wave"
          });
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "CosmeticLiveBackButton",
        get visible() {
          return showLive();
        },
        onactivate: () => {
          SetHeroSkinLive();
          setShowLive(false);
          setLiveLoading("");
        },
        get children() {
          return [libs.createElement("Image", {
            id: "BackIcon"
          }, null), libs.createComponent(GenericPanel.CLabel, {
            id: "BackLabel",
            text: "#UI_BACK"
          })];
        }
      }), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Menu, {
        get menuList() {
          return (() => {
            let TagList = {};
            Object.keys(COSMETIC_MENU_LIST).forEach(k => {
              TagList[k] = COSMETIC_MENU_LIST[k].map(v => "CosmeticSlot_" + v);
            });
            return TagList;
          })();
        },
        onToggleMenu: (menu, menu2) => {
          if (menu != '') {
            if (!tagJumpState["tag"]) {
              setTag(menu);
            }
            if (menu2 != "") {
              if (!tagJumpState["sec_tag"]) {
                let sec = Number(menu2?.replace("CosmeticSlot_", ""));
                if (menu == "CosmeticTag_coloring") {
                  sec += 100;
                }
                setSecTag(sec);
              }
            }
          }
        },
        menuName: "cosmetics_new",
        get selectedMenu() {
          return tag();
        },
        get selectedMenu2() {
          return "CosmeticSlot_" + sec_tag();
        },
        get show() {
          return show();
        }
      }), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
        id: "CosmeticContent",
        show: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CosmeticItems",
            flowChildren: "down",
            get visible() {
              return !showLive();
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "CosmeticItemsTitle",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    align: "center center",
                    get text() {
                      return '#CosmeticSlot_' + selectedTagType();
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "CosmeticList",
                flowChildren: "right-wrap",
                scroll: "y",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return selectedShelfList();
                    },
                    children: (oid, i) => {
                      const equipped = libs.createMemo(() => isEquip(oid()));
                      return libs.createComponent(libs.Switch, {
                        get fallback() {
                          return libs.createComponent(CosmeticCard.CosmeticCard, {
                            get itemid() {
                              return oid();
                            },
                            get lock() {
                              return libs.memo(() => sec_tag() != 99)() ? IsLocked(oid()) : false;
                            },
                            get equip() {
                              return equipped();
                            },
                            get preview() {
                              return selectingID() == oid();
                            },
                            get hasColoring() {
                              return hasColoring(oid());
                            },
                            get num() {
                              return libs.memo(() => selectedTagType() == OrnamentType.CONSUMABLE)() ? playerConsumables()[oid()] ?? 0 : -1;
                            },
                            get slot() {
                              return selectedTagType();
                            },
                            get rarity() {
                              return selectedTagType() == OrnamentType.CONSUMABLE ? 3 : undefined;
                            },
                            onactivate: () => {
                              setSelectingID(oid());
                              if (selectedTagType() == OrnamentType.CONSUMABLE) {
                                let slots = playerConsumaleSlot();
                                let _oid = Number(oid());
                                if (consumableSlot() == -1) return;
                                slots = Object.assign({}, slots);
                                slots[consumableSlot()] = _oid;
                                let params = [];
                                Object.entries(slots).forEach(([slot, cid]) => {
                                  params.push({
                                    slot: Number(slot),
                                    cid: cid
                                  });
                                });
                                callAction("equip_consumables", {
                                  slots: JSON.stringify(params)
                                });
                                setSelectedConsumableSlot(-1);
                              } else if (selectedTagType() == OrnamentType.EMOJI) {
                                if (!IsLocked(oid()) && wheelWaitEquipIndex() != -1) {
                                  callAction('emotion_equip', {
                                    eid: Number(oid()),
                                    slot: wheelWaitEquipIndex()
                                  });
                                  setWheelWaitEquipIndex(-1);
                                }
                              } else if (selectedTagType() == OrnamentType.BUNNY_GIRL) {
                                if (bunnySlot() != -1 && !IsLocked(oid())) {
                                  if (bunnyList()[bunnySlot()] != oid()) {
                                    callAction('ornament_equip', {
                                      hid: bunnySlot(),
                                      oid: Number(oid()),
                                      pool: 31
                                    });
                                  }
                                  setSelectedBunnySlot(-1);
                                }
                              } else if (!IsLocked(oid())) {
                                if (!equipped()) {
                                  callAction('ornament_equip', {
                                    oid: Number(oid()),
                                    pool: selectedTagType()
                                  });
                                }
                              }
                            },
                            get children() {
                              return [libs.createComponent(libs.Show, {
                                get when() {
                                  return getCosmeticExpire(oid()) > 0;
                                },
                                get children() {
                                  const _el$9 = libs.createElement("Panel", {
                                      id: "Trial"
                                    }, null),
                                    _el$0 = libs.createElement("Panel", {
                                      id: "TrialTime"
                                    }, _el$9);
                                  libs.insert(_el$9, libs.createComponent(GenericPanel.CImage, {
                                    id: "TrialMark",
                                    get ["class"]() {
                                      return $.Language().toLocaleLowerCase();
                                    }
                                  }), _el$0);
                                  libs.insert(_el$0, libs.createComponent(CosmeticCard.EOM_CountdownWithIcon, {
                                    id: "HeroRoleCountdown",
                                    get endTime() {
                                      return Number(getCosmeticExpire(oid()));
                                    }
                                  }));
                                  return _el$9;
                                }
                              }), libs.createComponent(libs.Show, {
                                get when() {
                                  return istool(oid());
                                },
                                get children() {
                                  return libs.createComponent(EOM_Label.EOM_Label, {
                                    className: "ToolModeWarning",
                                    text: "TOOL ONLY"
                                  });
                                }
                              }), libs.createComponent(libs.Show, {
                                get when() {
                                  return libs.memo(() => !!IsLocked(oid()))() && cosmeticExperienceData(oid()) != undefined;
                                },
                                get children() {
                                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                                    className: "Experience",
                                    get children() {
                                      return libs.createComponent(EOM_Label.EOM_Label, {
                                        color: 'white',
                                        get text() {
                                          return $.Localize("#can_experience");
                                        }
                                      });
                                    }
                                  });
                                }
                              })];
                            }
                          });
                        },
                        get children() {
                          return [libs.createComponent(libs.Match, {
                            get when() {
                              return selectedTagType() == OrnamentType.HERO_SKIN;
                            },
                            get children() {
                              return libs.createComponent(CosmeticCard.HeroCosmeticCard, {
                                get itemid() {
                                  return oid();
                                },
                                get hid() {
                                  return KeyValues.CosmeticsKv[oid()]?.hero ?? -1;
                                },
                                get lock() {
                                  return IsLocked(oid());
                                },
                                get equip() {
                                  return isEquip(oid());
                                },
                                get preview() {
                                  return selectingID() == oid();
                                },
                                get hasColoring() {
                                  return sec_tag() > 100 ? true : undefined;
                                },
                                onactivate: () => {
                                  setSelectingID(oid());
                                },
                                get children() {
                                  return [libs.createComponent(libs.Show, {
                                    get when() {
                                      return getCosmeticExpire(oid()) > 0;
                                    },
                                    get children() {
                                      const _el$7 = libs.createElement("Panel", {
                                          id: "Trial"
                                        }, null),
                                        _el$8 = libs.createElement("Panel", {
                                          id: "TrialTime"
                                        }, _el$7);
                                      libs.insert(_el$7, libs.createComponent(GenericPanel.CImage, {
                                        id: "TrialMark",
                                        get ["class"]() {
                                          return $.Language().toLocaleLowerCase();
                                        }
                                      }), _el$8);
                                      libs.insert(_el$8, libs.createComponent(CosmeticCard.EOM_CountdownWithIcon, {
                                        id: "HeroRoleCountdown",
                                        get endTime() {
                                          return Number(getCosmeticExpire(oid()));
                                        }
                                      }));
                                      return _el$7;
                                    }
                                  }), libs.createComponent(libs.Show, {
                                    get when() {
                                      return istool(oid());
                                    },
                                    get children() {
                                      return libs.createComponent(EOM_Label.EOM_Label, {
                                        className: "ToolModeWarning",
                                        text: "TOOL ONLY"
                                      });
                                    }
                                  }), libs.createComponent(libs.Show, {
                                    get when() {
                                      return libs.memo(() => !!IsLocked(oid()))() && cosmeticExperienceData(oid()) != undefined;
                                    },
                                    get children() {
                                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                                        className: "Experience",
                                        get children() {
                                          return libs.createComponent(EOM_Label.EOM_Label, {
                                            color: 'white',
                                            get text() {
                                              return $.Localize("#can_experience");
                                            }
                                          });
                                        }
                                      });
                                    }
                                  })];
                                }
                              });
                            }
                          }), libs.createComponent(libs.Match, {
                            get when() {
                              return libs.memo(() => selectedTagType() == OrnamentType.HERO_EMOJI)() && GetHeroNameByGoodID(Number(oid())) != undefined;
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                get children() {
                                  return [libs.createComponent(HeroRoleCard.HeroRoleCard, {
                                    get heroName() {
                                      return GetHeroNameByGoodID(Number(oid()));
                                    },
                                    onactivate: () => {
                                      setSelectingID(oid());
                                    }
                                  }), libs.createComponent(libs.Show, {
                                    get when() {
                                      return selectingID() == oid();
                                    },
                                    get children() {
                                      return libs.createComponent(EOM_Image.EOM_Image, {
                                        className: "HeroRoleCardHover"
                                      });
                                    }
                                  })];
                                }
                              });
                            }
                          })];
                        }
                      });
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "SelectingInfo",
            hittest: false,
            get children() {
              return [libs.createComponent(libs.Show, {
                get when() {
                  return previewID() != "";
                },
                get children() {
                  const _el$2 = libs.createElement("Panel", {
                    id: "CosmeticDesc"
                  }, null);
                  libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
                    id: "CosmeticName",
                    get text() {
                      return '#' + (previewID() ?? "");
                    }
                  }), null);
                  libs.insert(_el$2, libs.createComponent(EOM_Separator.EOM_Separator, {
                    size: "short"
                  }), null);
                  libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
                    id: "CosmeticAccess",
                    get text() {
                      return '#' + previewID() + '_description';
                    }
                  }), null);
                  return _el$2;
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                width: "100%",
                height: "100%",
                get visible() {
                  return !showLive();
                },
                get children() {
                  return [libs.createComponent(libs.Switch, {
                    get children() {
                      return [libs.createComponent(libs.Match, {
                        get when() {
                          return selectedTagType() == OrnamentType.CONSUMABLE;
                        },
                        get children() {
                          return [];
                        }
                      }), libs.createComponent(libs.Match, {
                        get when() {
                          return !previewOwned();
                        },
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "CosmeticGet",
                            get children() {
                              return libs.createComponent(libs.Show, {
                                get when() {
                                  return cosmeticExperienceData(previewID()) == undefined;
                                },
                                get fallback() {
                                  return libs.createComponent(EOM_Button.EOM_Button, {
                                    marginLeft: '20px',
                                    color: 'Gold',
                                    text: '#UseExperienceCard',
                                    onactivate: () => {
                                      const propData = cosmeticExperienceData(previewID());
                                      callAction("use_prop", {
                                        id: propData?.id ?? 0,
                                        prop_id: propData?.prop_id ?? 0,
                                        amounts: 1,
                                        params: [(previewID() ?? 0).toString()]
                                      });
                                    }
                                  });
                                },
                                get children() {
                                  return libs.createComponent(libs.Show, {
                                    get when() {
                                      return previewAccessInfo().access != undefined;
                                    },
                                    get children() {
                                      return libs.createComponent(libs.Switch, {
                                        get children() {
                                          return [libs.createComponent(libs.Match, {
                                            get when() {
                                              return previewAccessInfo().access == "activestar";
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Label.EOM_Label, {
                                                id: 'ActivityEnd',
                                                text: "#Access_activestar"
                                              });
                                            }
                                          }), libs.createComponent(libs.Match, {
                                            get when() {
                                              return previewAccessInfo().access == "none";
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Label.EOM_Label, {
                                                id: 'ActivityEnd',
                                                text: "#Activity_End"
                                              });
                                            }
                                          }), libs.createComponent(libs.Match, {
                                            get when() {
                                              return previewAccessInfo().access != "none";
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Button.EOM_Button, {
                                                color: "Blue",
                                                text: "#CosmeticGet",
                                                onactivate: () => {
                                                  if (previewAccessInfo().access == "coloring") {
                                                    getAccessWay(previewAccessInfo().access, previewID());
                                                  } else {
                                                    getAccessWay(previewAccessInfo().access, previewAccessInfo().storeID);
                                                  }
                                                }
                                              });
                                            }
                                          })];
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      }), libs.createComponent(libs.Match, {
                        get when() {
                          return selectedTagType() == OrnamentType.HERO_SKIN;
                        },
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "CosmeticGet",
                            get children() {
                              return libs.createComponent(EOM_Button.EOM_Button, {
                                color: "Blue",
                                get text() {
                                  return !isEquip(previewID(), true) ? "#Inventory_Equip" : "#Inventory_Unequip";
                                },
                                onactivate: () => {
                                  const heroid = KeyValues.CosmeticsKv[previewID()]?.hero;
                                  if (heroid) {
                                    callAction('ornament_equip', {
                                      hid: heroid,
                                      oid: isEquip(previewID(), true) ? 5100000 : Number(previewID()),
                                      pool: OrnamentType.HERO_SKIN
                                    });
                                  }
                                }
                              });
                            }
                          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                            id: "HeroSkinLivePreviewButton",
                            onactivate: self => {
                              SetHeroSkinLive(Number(previewID()));
                              setShowLive(true);
                            },
                            get children() {
                              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "HeroSkinLivePreviewButtonLabel",
                                get children() {
                                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "HeroSkinLivePreviewButtonLabelUnderline"
                                  }), libs.createComponent(EOM_Label.EOM_Label, {
                                    text: "#HeroSkinPreviewLive"
                                  })];
                                }
                              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                                size: '32',
                                get src() {
                                  return getSrcPath("ladder/pass/z3_eye.png");
                                }
                              })];
                            }
                          })];
                        }
                      })];
                    }
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return selectedColoringList().length > 0;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "ColoringContainer",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            id: "ColoringTitle",
                            text: "#ColoringSkin"
                          }), libs.createComponent(EOM_Separator.EOM_Separator, {
                            horizontalAlign: "center",
                            size: "symmetric"
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "ColoringList",
                            get children() {
                              return libs.createComponent(libs.Index, {
                                get each() {
                                  return [selectingID()].concat(selectedColoringList());
                                },
                                children: (id, _) => {
                                  return libs.createComponent(libs.Show, {
                                    get when() {
                                      return selectedTagType() == OrnamentType.HERO_SKIN;
                                    },
                                    get fallback() {
                                      return libs.createComponent(CosmeticCard.CosmeticCard, {
                                        get itemid() {
                                          return id().toString();
                                        },
                                        get lock() {
                                          return IsLocked(id());
                                        },
                                        get equip() {
                                          return isEquip(id(), true);
                                        },
                                        get preview() {
                                          return previewID() == id();
                                        },
                                        get hasColoring() {
                                          return selectedColoringList().includes(id());
                                        },
                                        onactivate: () => {
                                          setPreviewID(id());
                                          if (!IsLocked(id())) {
                                            callAction('ornament_equip', {
                                              oid: Number(id()),
                                              pool: Number(id().toString().slice(1, 3))
                                            });
                                          }
                                        },
                                        get children() {
                                          return [libs.createComponent(libs.Show, {
                                            get when() {
                                              return getCosmeticExpire(id()) > 0;
                                            },
                                            get children() {
                                              const _el$11 = libs.createElement("Panel", {
                                                  id: "Trial"
                                                }, null),
                                                _el$12 = libs.createElement("Panel", {
                                                  id: "TrialTime"
                                                }, _el$11);
                                              libs.insert(_el$11, libs.createComponent(GenericPanel.CImage, {
                                                id: "TrialMark",
                                                get ["class"]() {
                                                  return $.Language().toLocaleLowerCase();
                                                }
                                              }), _el$12);
                                              libs.insert(_el$12, libs.createComponent(CosmeticCard.EOM_CountdownWithIcon, {
                                                id: "HeroRoleCountdown",
                                                get endTime() {
                                                  return Number(getCosmeticExpire(id()));
                                                }
                                              }));
                                              return _el$11;
                                            }
                                          }), libs.createComponent(libs.Show, {
                                            get when() {
                                              return istool(id());
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Label.EOM_Label, {
                                                className: "ToolModeWarning",
                                                text: "TOOL ONLY"
                                              });
                                            }
                                          }), libs.createComponent(libs.Show, {
                                            get when() {
                                              return libs.memo(() => !!IsLocked(id()))() && cosmeticExperienceData(id()) != undefined;
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                                className: "Experience",
                                                get children() {
                                                  return libs.createComponent(EOM_Label.EOM_Label, {
                                                    color: 'white',
                                                    get text() {
                                                      return $.Localize("#can_experience");
                                                    }
                                                  });
                                                }
                                              });
                                            }
                                          })];
                                        }
                                      });
                                    },
                                    get children() {
                                      return libs.createComponent(CosmeticCard.HeroCosmeticCard, {
                                        get itemid() {
                                          return id().toString();
                                        },
                                        hid: -1,
                                        get lock() {
                                          return IsLocked(id());
                                        },
                                        get equip() {
                                          return isEquip(id(), true);
                                        },
                                        get preview() {
                                          return previewID() == id();
                                        },
                                        get hasColoring() {
                                          return selectedColoringList().includes(id());
                                        },
                                        onactivate: () => {
                                          setPreviewID(id());
                                        },
                                        get children() {
                                          return [libs.createComponent(libs.Show, {
                                            get when() {
                                              return getCosmeticExpire(id()) > 0;
                                            },
                                            get children() {
                                              const _el$1 = libs.createElement("Panel", {
                                                  id: "Trial"
                                                }, null),
                                                _el$10 = libs.createElement("Panel", {
                                                  id: "TrialTime"
                                                }, _el$1);
                                              libs.insert(_el$1, libs.createComponent(GenericPanel.CImage, {
                                                id: "TrialMark",
                                                get ["class"]() {
                                                  return $.Language().toLocaleLowerCase();
                                                }
                                              }), _el$10);
                                              libs.insert(_el$10, libs.createComponent(CosmeticCard.EOM_CountdownWithIcon, {
                                                id: "HeroRoleCountdown",
                                                get endTime() {
                                                  return Number(getCosmeticExpire(id()));
                                                }
                                              }));
                                              return _el$1;
                                            }
                                          }), libs.createComponent(libs.Show, {
                                            get when() {
                                              return libs.memo(() => !!IsLocked(id()))() && cosmeticExperienceData(id()) != undefined;
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                                className: "Experience",
                                                get children() {
                                                  return libs.createComponent(EOM_Label.EOM_Label, {
                                                    color: 'white',
                                                    get text() {
                                                      return $.Localize("#can_experience");
                                                    }
                                                  });
                                                }
                                              });
                                            }
                                          })];
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          })];
                        }
                      });
                    }
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CosmeticPreviewContainer",
            hittest: false,
            get visible() {
              return !showLive();
            },
            get children() {
              return libs.createComponent(libs.Switch, {
                get fallback() {
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return KeyValues.CosmeticsKv[previewID()] != undefined;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "CosmeticPreviewDefault",
                        get children() {
                          return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                            get cosmetic_id() {
                              return Number(previewID());
                            }
                          });
                        }
                      });
                    }
                  });
                },
                get children() {
                  return [libs.createComponent(libs.Match, {
                    get when() {
                      return selectedTagType() == OrnamentType.HERO_EMOJI;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "CosmeticPreviewBlock",
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: 'HeroEmojiTop',
                            get children() {
                              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: 'Title',
                                get children() {
                                  return libs.createComponent(GenericPanel.CLabel, {
                                    get text() {
                                      return $.Localize("#EmojiEvent_title");
                                    }
                                  });
                                }
                              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "HeroEmojiEvents",
                                flowChildren: 'right',
                                scroll: 'x',
                                get children() {
                                  return emojiSlotArr.map(heroEmojiSlot => {
                                    const _slot = Number(selectingID() + (heroEmojiSlot >= 10 ? heroEmojiSlot.toString() : '0' + heroEmojiSlot.toString()));
                                    return libs.createComponent(EOM_Panel.EOM_Panel, {
                                      className: "HeroEmojiEvent",
                                      onactivate: () => {
                                        if (emojiWaitEquipIndex() == heroEmojiSlot) {
                                          setEmojiWaitEquipIndex(emojiEvents.EMPTY);
                                        } else {
                                          setEmojiWaitEquipIndex(heroEmojiSlot);
                                        }
                                      },
                                      get children() {
                                        return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                          id: 'Main',
                                          get children() {
                                            return [libs.createComponent(EOM_Image.EOM_Image, {
                                              id: 'HeroEmojiSlot',
                                              get className() {
                                                return libs.classNames({
                                                  Empty: playerEmoji()[_slot.toString()] == undefined,
                                                  Wait: emojiWaitEquipIndex() == heroEmojiSlot
                                                });
                                              },
                                              get src() {
                                                return getCosmeticImagePath(playerEmoji()[_slot.toString()]?.eid?.toString() ?? '', Number(selectingID()));
                                              }
                                            }), libs.createComponent(libs.Show, {
                                              get when() {
                                                return libs.memo(() => emojiWaitEquipIndex() == heroEmojiSlot)() && playerEmoji()[_slot.toString()] != undefined;
                                              },
                                              get children() {
                                                return libs.createComponent(EOM_Icon.EOM_Icon, {
                                                  size: '24',
                                                  margin: '2px',
                                                  onactivate: () => {
                                                    callAction("emotion_equip", {
                                                      eid: 5510000,
                                                      slot: _slot
                                                    });
                                                    setEmojiWaitEquipIndex(emojiEvents.EMPTY);
                                                  },
                                                  get src() {
                                                    return getSrcPath("hero_collection/s5_close.png");
                                                  }
                                                });
                                              }
                                            })];
                                          }
                                        }), libs.createComponent(GenericPanel.CLabel, {
                                          id: 'EmojiEventName',
                                          get text() {
                                            return $.Localize(`#EmojiEvent_${heroEmojiSlot}`);
                                          }
                                        })];
                                      }
                                    });
                                  });
                                }
                              })];
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: 'HeroEmojiMain',
                            hittest: false,
                            get children() {
                              return [libs.createComponent(GenericPanel.CLabel, {
                                id: 'MainTitle',
                                get text() {
                                  return $.Localize(`#HeroEmoji`);
                                }
                              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "HeroEmojiList",
                                flowChildren: "right-wrap",
                                scroll: "y",
                                get children() {
                                  return libs.createComponent(libs.Index, {
                                    get each() {
                                      return selectedHeroEmojiList();
                                    },
                                    children: (oid, i) => {
                                      const equip = () => emojiSlotArr.some(slot => playerEmoji()[(selectingID() + (slot >= 10 ? slot : `0${slot}`)).toString()]?.eid == Number(oid()));
                                      return libs.createComponent(CosmeticCard.CosmeticCard, {
                                        get classList() {
                                          return {
                                            Locked: IsLocked(oid())
                                          };
                                        },
                                        get itemid() {
                                          return oid();
                                        },
                                        get lock() {
                                          return IsLocked(oid());
                                        },
                                        get equip() {
                                          return equip();
                                        },
                                        get preview() {
                                          return previewID() == oid();
                                        },
                                        onactivate: () => {
                                          let _oid = Number(oid());
                                          setPreviewID(oid());
                                          const _slot = selectingID() + (emojiWaitEquipIndex() > 10 ? `${emojiWaitEquipIndex()}` : `0${emojiWaitEquipIndex()}`);
                                          if (IsLocked(oid())) return;
                                          if (emojiWaitEquipIndex() != emojiEvents.EMPTY) {
                                            if (playerEmoji()[_slot.toString()]?.eid == _oid) return;
                                            let flag = false;
                                            emojiSlotArr.forEach(v => {
                                              if (!flag) {
                                                let key = (selectingID() + (v >= 10 ? v : `0${v}`)).toString();
                                                if (playerEmoji()[key]?.eid == _oid) {
                                                  GameEvents.SendCustomEventToServer("equip_hero_emoji", {
                                                    eid: _oid,
                                                    slot: Number(_slot),
                                                    unEquipSlot: Number(key)
                                                  });
                                                  flag = true;
                                                }
                                              }
                                            });
                                            if (!flag) {
                                              callAction("emotion_equip", {
                                                eid: _oid,
                                                slot: Number(_slot)
                                              });
                                            }
                                            setEmojiWaitEquipIndex(emojiEvents.EMPTY);
                                          } else {
                                            if (equip()) {
                                              return;
                                            }
                                            let emptySlot = emojiSlotArr.find(slot => {
                                              return playerEmoji()[(selectingID() + (slot >= 10 ? `${slot}` : `0${slot}`)).toString()] == undefined;
                                            });
                                            if (emptySlot) {
                                              callAction("emotion_equip", {
                                                eid: _oid,
                                                slot: Number(selectingID() + (emptySlot >= 10 ? emptySlot : `0${emptySlot}`))
                                              });
                                            }
                                          }
                                        },
                                        get children() {
                                          return [libs.createComponent(libs.Show, {
                                            get when() {
                                              return getCosmeticExpire(oid()) > 0;
                                            },
                                            get children() {
                                              const _el$13 = libs.createElement("Panel", {
                                                  id: "Trial"
                                                }, null),
                                                _el$14 = libs.createElement("Panel", {
                                                  id: "TrialTime"
                                                }, _el$13);
                                              libs.insert(_el$13, libs.createComponent(GenericPanel.CImage, {
                                                id: "TrialMark",
                                                get ["class"]() {
                                                  return $.Language().toLocaleLowerCase();
                                                }
                                              }), _el$14);
                                              libs.insert(_el$14, libs.createComponent(CosmeticCard.EOM_CountdownWithIcon, {
                                                id: "HeroRoleCountdown",
                                                get endTime() {
                                                  return Number(getCosmeticExpire(oid()));
                                                }
                                              }));
                                              return _el$13;
                                            }
                                          }), libs.createComponent(libs.Show, {
                                            get when() {
                                              return istool(oid());
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Label.EOM_Label, {
                                                className: "ToolModeWarning",
                                                text: "TOOL ONLY"
                                              });
                                            }
                                          }), libs.createComponent(libs.Show, {
                                            get when() {
                                              return libs.memo(() => !!IsLocked(oid()))() && cosmeticExperienceData(oid()) != undefined;
                                            },
                                            get children() {
                                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                                className: "Experience",
                                                get children() {
                                                  return libs.createComponent(EOM_Label.EOM_Label, {
                                                    color: 'white',
                                                    get text() {
                                                      return $.Localize("#can_experience");
                                                    }
                                                  });
                                                }
                                              });
                                            }
                                          })];
                                        }
                                      });
                                    }
                                  });
                                }
                              })];
                            }
                          })];
                        }
                      });
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return selectedTagType() == OrnamentType.CONSUMABLE;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "CosmeticPreviewBlock",
                        get children() {
                          return [(() => {
                            const _el$3 = libs.createElement("Panel", {
                              id: "consumable_slots"
                            }, null);
                            libs.insert(_el$3, libs.createComponent(libs.For, {
                              each: consumableSlotList,
                              children: slot => {
                                return (() => {
                                  const _el$15 = libs.createElement("Panel", {}, null),
                                    _el$16 = libs.createElement("Label", {
                                      "class": 'hotkey',
                                      get text() {
                                        return keyMap[slot];
                                      }
                                    }, _el$15);
                                  libs.setProp(_el$15, "onactivate", () => {
                                    if (selectedConsumableSlot() == slot) {
                                      setSelectedConsumableSlot(-1);
                                    } else {
                                      setSelectedConsumableSlot(slot);
                                    }
                                  });
                                  libs.insert(_el$15, libs.createComponent(EOM_Image.EOM_Image, {
                                    width: '100%',
                                    height: '100%',
                                    align: 'center center',
                                    get src() {
                                      return getCosmeticImagePath(playerConsumaleSlot()[slot]?.toString());
                                    }
                                  }), _el$16);
                                  libs.effect(_p$ => {
                                    const _v$ = libs.classNames('consumable_slot', {
                                        selected: slot == selectedConsumableSlot()
                                      }),
                                      _v$2 = keyMap[slot];
                                    _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$15, "className", _v$, _p$._v$));
                                    _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "text", _v$2, _p$._v$2));
                                    return _p$;
                                  }, {
                                    _v$: undefined,
                                    _v$2: undefined
                                  });
                                  return _el$15;
                                })();
                              }
                            }));
                            return _el$3;
                          })(), (() => {
                            const _el$4 = libs.createElement("MoviePanel", {
                              id: "MoviePreview",
                              get src() {
                                return `file://{resources}/videos/${selectingID()}.webm`;
                              },
                              repeat: true,
                              autoplay: "onload"
                            }, null);
                            libs.effect(_$p => libs.setProp(_el$4, "src", `file://{resources}/videos/${selectingID()}.webm`, _$p));
                            return _el$4;
                          })()];
                        }
                      });
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return selectedTagType() == OrnamentType.EMOJI;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "CosmeticPreviewBlock",
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "EmojiWheel"
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "EmojiWheelBorder",
                            hittest: false,
                            get children() {
                              return wheelEmojiSlotArr.map(index => {
                                return libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: 'HoverBoder' + index,
                                  get className() {
                                    return libs.classNames('HoverBoder', {
                                      Wait: selectedWheelSlot() == index
                                    });
                                  },
                                  get children() {
                                    return libs.createComponent(EOM_Image.EOM_Image, {
                                      get className() {
                                        return libs.classNames('EmojiSlot', {
                                          Empty: playerEmoji()[index.toString()] == undefined
                                        });
                                      },
                                      get src() {
                                        return getCosmeticImagePath(playerEmoji()[index.toString()]?.eid?.toString() ?? '');
                                      },
                                      onactivate: () => {
                                        if (selectedWheelSlot() == index) {
                                          setSelectedWheelSlot(-1);
                                        } else {
                                          setSelectedWheelSlot(index);
                                        }
                                      },
                                      get children() {
                                        return libs.createComponent(libs.Show, {
                                          get when() {
                                            return libs.memo(() => selectedWheelSlot() == index)() && playerEmoji()[index.toString()] != undefined;
                                          },
                                          get children() {
                                            return libs.createComponent(EOM_Icon.EOM_Icon, {
                                              size: '24',
                                              margin: '20px',
                                              onactivate: () => {
                                                callAction('emotion_equip', {
                                                  eid: 5500000,
                                                  slot: index
                                                });
                                                setWheelWaitEquipIndex(-1);
                                              },
                                              get src() {
                                                return getSrcPath("hero_collection/s5_close.png");
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              });
                            }
                          })];
                        }
                      });
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return selectedTagType() == OrnamentType.BUNNY_GIRL;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "CosmeticPreviewBlock",
                        get children() {
                          return [(() => {
                            const _el$5 = libs.createElement("Panel", {
                              id: "bunny_slots"
                            }, null);
                            libs.insert(_el$5, () => bunnySlotList.map(index => {
                              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                id: 'bunny_slot_' + index,
                                get className() {
                                  return libs.classNames('bunny_slot', {
                                    selected: index == selectedBunnySlot(),
                                    equipped: bunnyList()[index] != undefined
                                  });
                                },
                                onactivate: () => {
                                  if (selectedBunnySlot() == index) {
                                    setSelectedBunnySlot(-1);
                                  } else {
                                    setSelectedBunnySlot(index);
                                  }
                                },
                                get children() {
                                  return libs.createComponent(libs.Show, {
                                    get when() {
                                      return bunnyList()[index] != undefined;
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                        className: "bunny_slot_image_icon",
                                        get children() {
                                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                                            className: "bunny_slot_image",
                                            get backgroundImage() {
                                              return `url('${getCosmeticImagePath(bunnyList()[index]).replace("s2r://panorama/images", "file://{images}").replace("_png.vtex", ".png")}')`;
                                            }
                                          });
                                        }
                                      }), libs.createComponent(libs.Show, {
                                        get when() {
                                          return index == selectedBunnySlot();
                                        },
                                        get children() {
                                          return libs.createComponent(EOM_Icon.EOM_Icon, {
                                            size: '24',
                                            margin: '6px',
                                            onactivate: () => {
                                              callAction("ornament_equip", {
                                                hid: index,
                                                oid: 5310000,
                                                pool: 31
                                              });
                                              setSelectedBunnySlot(-1);
                                            },
                                            get src() {
                                              return getSrcPath("hero_collection/s5_close.png");
                                            }
                                          });
                                        }
                                      })];
                                    }
                                  });
                                }
                              });
                            }));
                            return _el$5;
                          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "BunnyPreview",
                            get children() {
                              return libs.createComponent(libs.Show, {
                                get when() {
                                  return bunnyTeamPreview();
                                },
                                get fallback() {
                                  return libs.createComponent(libs.Show, {
                                    get when() {
                                      return KeyValues.CosmeticsKv[previewID()] != undefined;
                                    },
                                    get children() {
                                      return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                                        get cosmetic_id() {
                                          return Number(previewID());
                                        }
                                      });
                                    }
                                  });
                                },
                                get children() {
                                  const _el$6 = libs.createElement("DOTAScenePanel", {
                                    particleonly: false,
                                    allowrotation: true,
                                    light: "preview_light",
                                    camera: "preview_camera",
                                    map: "scene/bunny_girl_preview",
                                    renderwaterreflections: true,
                                    deferredalpha: true,
                                    renderdeferred: true,
                                    rendershadows: true,
                                    allowsuspendrepaint: true
                                  }, null);
                                  const _ref$ = bunnyTeamRef;
                                  typeof _ref$ === "function" ? libs.use(_ref$, _el$6) : bunnyTeamRef = _el$6;
                                  libs.setProp(_el$6, "style", {
                                    width: '100%',
                                    height: '100%'
                                  });
                                  libs.setProp(_el$6, "onload", self => {
                                    refreshBunnyTeamPreview(self, false);
                                  });
                                  return _el$6;
                                }
                              });
                            }
                          })];
                        }
                      });
                    }
                  })];
                }
              });
            }
          })];
        }
      })];
    }
  });
};
libs.render(() => libs.createComponent(Cosmetic, {}), $.GetContextPanel());