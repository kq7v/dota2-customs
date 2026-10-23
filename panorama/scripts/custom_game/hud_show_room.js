--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Loading = require('./EOM_Loading.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var portraitsCourier = require('./portraitsCourier.js');
var weapon3DPreview = require('./weapon3DPreview.js');
var RecycleView = require('./RecycleView.js');
var equipment_utils = require('./equipment_utils.js');
var server_equipment = require('./server_equipment.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_RedMark.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./Player.js');
require('./EOM_TextEntry.js');

const SLOT_COUNT = 5;
const SLOT_NUMBERS = Array.from({
  length: SLOT_COUNT
}, (_, i) => i + 1);
const getItemDisplayId = item => {
  if (item.type === "equipment") {
    return item.data.equipment_item_id;
  }
  return item.id;
};
const findNextEmptySlot = (showType, showRoomData) => {
  for (let i = 1; i <= SLOT_COUNT; i++) {
    const data = showRoomData()?.[`${showType}-${i}`];
    if (!data) return i;
  }
  return undefined;
};
const getListedItemIds = (showType, showRoomData) => {
  const ids = new Set();
  for (let i = 1; i <= SLOT_COUNT; i++) {
    const data = showRoomData()?.[`${showType}-${i}`];
    if (data) {
      ids.add(data.id);
    }
  }
  return ids;
};

const STAR_LEVELS = [1, 2, 3, 4, 5, 6];
const SHOW_ROOM_LIKE_LIMIT = 10;
const SHOW_ROOM_LIKE_COLORS = ["#D0B090", "#FF6B8A", "#FF9F43", "#FFD166", "#72D6A0", "#65C7F7", "#B89CFF", "#F7A8E2"];
const SHOW_ROOM_LIKE_DRIFT_CLASSES = ["DriftLeft", "DriftCenter", "DriftRight"];
const SHOW_ROOM_COSMETIC_TYPES = [COSMETIC_TYPE.HEAD, COSMETIC_TYPE.SHOULDER, COSMETIC_TYPE.BACK, COSMETIC_TYPE.TAIL, COSMETIC_TYPE.WING, COSMETIC_TYPE.MISC];
const EQUIP_PART_ICON = {
  0: "icon_zb_01.png",
  1: "icon_zb_03.png",
  2: "icon_zb_09.png",
  3: "icon_zb_10.png",
  4: "icon_zb_11.png",
  5: "icon_zb_06.png",
  6: "icon_zb_05.png",
  7: "icon_zb_04.png",
  8: "icon_zb_02.png"
};
const findListedSlot = (showType, id, showRoomData) => {
  for (let i = 1; i <= SLOT_NUMBERS.length; i++) {
    const data = showRoomData()?.[`${showType}-${i}`];
    if (data?.id === id) {
      return i;
    }
  }
  return undefined;
};
const MENU_LIST = {
  WeaponShowRoom_Menu: [],
  EquipmentShowRoom_Menu: [],
  CourierShowRoom_Menu: [],
  CosmeticShowRoom_Menu: []
};
const {
  LayoutMenu,
  show,
  menuName,
  jumpInfo
} = EOM_MenuLayout.createMenuLayout("show_room", () => MENU_LIST);
const getPrivilegeDescription = (privilege, level = 1) => {
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
};
const getShowRoomOriginText = origin => {
  if (!origin) return "";
  if (origin === "default") {
    return GetLocalization("#Origin_default", origin);
  }
  if (origin === "drawing" || origin === "craft") {
    return GetLocalization("#Origin_craft", origin);
  }
  const drawCardMatch = origin.match(/^draw_card_rewards_(\d+)$/);
  if (drawCardMatch) {
    return GetLocalization(drawCardMatch[1] === "1" ? "#Origin_draw_card_rewards_single" : "#Origin_draw_card_rewards_ten", origin);
  }
  const matchRoomMatch = origin.match(/^match_room_rewards:(\d+)$/);
  if (matchRoomMatch) {
    return LocalizeWithVars("#Origin_match_room_rewards", {
      difficulty: matchRoomMatch[1]
    });
  }
  return GetLocalization("#Origin_" + origin, origin);
};
const getShowRoomCreationText = creationDetails => {
  if (!creationDetails) return "";
  const data = JSON.parseSafe(creationDetails);
  if (!data) return "";
  const date = new Date(data.first_get_time * 1000);
  const dateText = data.first_get_time > 0 && !isNaN(date.getTime()) ? `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}` : "";
  const originText = getShowRoomOriginText(data.origin);
  return [dateText, originText].filter(Boolean).join(" ");
};
const getShowRoomCreationTime = itemData => {
  const creationDetails = itemData?.creation_details;
  if (!creationDetails) return 0;
  const data = JSON.parseSafe(creationDetails);
  return toFiniteNumber(data?.first_get_time, 0);
};
const getShowRoomItemCreationTime = (item, showRoomData) => {
  const itemCreationTime = getShowRoomCreationTime(item.data);
  if (itemCreationTime > 0) return itemCreationTime;
  const listedSlot = findListedSlot(item.type, item.id, showRoomData);
  if (listedSlot == undefined) return 0;
  return getShowRoomCreationTime(showRoomData()?.[`${item.type}-${listedSlot}`]?.[item.type]);
};
const compareShowRoomCollectionItems = (a, b, listedItemIds, getQuality, getCreationTime) => {
  return multiCompare(Number(listedItemIds.has(b.id)) - Number(listedItemIds.has(a.id)), toFiniteNumber(b.data?.star, 0) - toFiniteNumber(a.data?.star, 0), getQuality(b) - getQuality(a), getCreationTime(b) - getCreationTime(a), a.id - b.id);
};
const StarEffectRows = props => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "ItemDescAttributes"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return props.rows();
      },
      children: rowData => {
        const content = libs.createMemo(() => {
          const result = [];
          for (let i = 0; i < rowData.entries.length; i++) {
            const [attribute, value] = rowData.entries[i];
            result.push(GetPropertyLocalization(attribute, value));
          }
          for (let i = 0; i < (rowData.privileges ?? []).length; i++) {
            const privilege = rowData.privileges[i];
            const privilegeDesc = props.getPrivilegeDescription?.(privilege);
            if (privilegeDesc) {
              result.push(privilegeDesc);
            }
          }
          if (result.length === 0) {
            return "#Weapon_NoAttributeEffect";
          }
          return result.join("<br>");
        });
        const rowActivated = () => props.activeStar() >= rowData.star;
        return (() => {
          const _el$2 = libs.createElement("Panel", {
              "class": "AttributeRow"
            }, null),
            _el$3 = libs.createElement("Panel", {
              "class": "AttributeRowHeader"
            }, _el$2),
            _el$4 = libs.createElement("Panel", {
              "class": "AttributeRowStars"
            }, _el$3),
            _el$5 = libs.createElement("Label", {
              "class": "AttributeRowTitle",
              get text() {
                return `${rowData.star}${GetLocalization("#ShowRoom_StarSuffix", "星")}`;
              }
            }, _el$3),
            _el$6 = libs.createElement("Label", {
              "class": "AttributeRowDesc",
              html: true,
              get text() {
                return content();
              }
            }, _el$2);
          libs.insert(_el$4, libs.createComponent(libs.For, {
            get each() {
              return Array.from({
                length: rowData.star
              });
            },
            children: () => (() => {
              const _el$7 = libs.createElement("Panel", {
                "class": "AttributeRowIcon"
              }, null);
              libs.effect(_$p => libs.setProp(_el$7, "classList", {
                RowActivated: rowActivated()
              }, _$p));
              return _el$7;
            })()
          }));
          libs.effect(_p$ => {
            const _v$ = {
                Active: rowActivated()
              },
              _v$2 = `${rowData.star}${GetLocalization("#ShowRoom_StarSuffix", "星")}`,
              _v$3 = content();
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "classList", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined
          });
          return _el$2;
        })();
      }
    }));
    return _el$;
  })();
};
const CourierShowRoomStoreItem = props => {
  const star = libs.createMemo(() => props.item?.data?.star ?? 0);
  return (() => {
    const _el$8 = libs.createElement("Panel", {
        "class": "ShowRoomCourierStoreItem"
      }, null),
      _el$9 = libs.createElement("Panel", {
        "class": "StarList"
      }, _el$8);
    libs.insert(_el$8, libs.createComponent(StoreItem.StoreItemBlock, {
      get item_id() {
        return libs.memo(() => !!props.item)() ? getItemDisplayId(props.item) : 0;
      }
    }), _el$9);
    libs.insert(_el$9, libs.createComponent(libs.For, {
      each: STAR_LEVELS,
      children: (_, starIndex) => (() => {
        const _el$0 = libs.createElement("Image", {
          "class": "CourierStar"
        }, null);
        libs.effect(_$p => libs.setProp(_el$0, "classList", {
          Unlock: star() > starIndex()
        }, _$p));
        return _el$0;
      })()
    }));
    return _el$8;
  })();
};
const WeaponShowRoomStoreItem = props => {
  const star = libs.createMemo(() => props.item?.data?.star ?? 0);
  return (() => {
    const _el$1 = libs.createElement("Panel", {
        "class": "ShowRoomWeaponStoreItem"
      }, null),
      _el$10 = libs.createElement("Panel", {
        "class": "StarList"
      }, _el$1);
    libs.insert(_el$1, libs.createComponent(StoreItem.StoreItemBlock, {
      get item_id() {
        return libs.memo(() => !!props.item)() ? getItemDisplayId(props.item) : 0;
      }
    }), _el$10);
    libs.insert(_el$10, libs.createComponent(libs.For, {
      each: STAR_LEVELS,
      children: (_, starIndex) => (() => {
        const _el$11 = libs.createElement("Panel", {
          "class": "WeaponStar"
        }, null);
        libs.effect(_$p => libs.setProp(_el$11, "classList", {
          Unlock: star() > starIndex()
        }, _$p));
        return _el$11;
      })()
    }));
    return _el$1;
  })();
};
const ShowRoomDetailStars = props => {
  return (() => {
    const _el$12 = libs.createElement("Panel", {
        "class": "ShowRoomDetailStars"
      }, null);
      libs.createElement("Label", {
        "class": "ShowRoomDetailStarsLabel",
        text: "#ShowRoom_StarLevel"
      }, _el$12);
      const _el$14 = libs.createElement("Panel", {
        "class": "ShowRoomDetailStarList"
      }, _el$12);
    libs.insert(_el$14, libs.createComponent(libs.For, {
      each: STAR_LEVELS,
      children: (_, starIndex) => (() => {
        const _el$15 = libs.createElement("Panel", {
          get ["class"]() {
            return "ShowRoomDetailStar " + props.type;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$4 = "ShowRoomDetailStar " + props.type,
            _v$5 = {
              Unlock: props.star() > starIndex()
            };
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$15, "class", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "classList", _v$5, _p$._v$5));
          return _p$;
        }, {
          _v$4: undefined,
          _v$5: undefined
        });
        return _el$15;
      })()
    }));
    return _el$12;
  })();
};
const ShowRoomDetailMeta = props => {
  const hasStars = libs.createMemo(() => props.star?.() != undefined && props.type != undefined);
  const hasLevel = libs.createMemo(() => props.level?.() != undefined);
  const star = libs.createMemo(() => props.star?.() ?? 0);
  return (() => {
    const _el$16 = libs.createElement("Panel", {
        "class": "ShowRoomDetailMeta"
      }, null),
      _el$18 = libs.createElement("Label", {
        "class": "Origin",
        get text() {
          return props.origin();
        }
      }, _el$16);
    libs.insert(_el$16, libs.createComponent(libs.Show, {
      get when() {
        return hasStars();
      },
      get children() {
        return libs.createComponent(ShowRoomDetailStars, {
          star: star,
          get type() {
            return props.type;
          }
        });
      }
    }), _el$18);
    libs.insert(_el$16, libs.createComponent(libs.Show, {
      get when() {
        return hasLevel();
      },
      get children() {
        const _el$17 = libs.createElement("Label", {
          "class": "ShowRoomDetailLevel",
          get vars() {
            return {
              value: props.level?.() ?? 0
            };
          },
          text: "#Equip_Level"
        }, null);
        libs.effect(_$p => libs.setProp(_el$17, "vars", {
          value: props.level?.() ?? 0
        }, _$p));
        return _el$17;
      }
    }), _el$18);
    libs.effect(_p$ => {
      const _v$6 = {
          HasStars: hasStars(),
          HasLevel: hasLevel()
        },
        _v$7 = props.origin();
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$16, "classList", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$18, "text", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$16;
  })();
};
const WeaponShowRoomFullDetail = props => {
  const weaponId = libs.createMemo(() => {
    const data = props.slotData();
    return data?.weapon?.weapon_id ?? data?.id ?? 0;
  });
  const weaponData = libs.createMemo(() => KeyValues.weapon[weaponId()]);
  const weaponStar = libs.createMemo(() => props.slotData()?.weapon?.star);
  const weaponCreationText = libs.createMemo(() => getShowRoomCreationText(props.slotData()?.weapon?.creation_details));
  const weaponSkillName = libs.createMemo(() => weaponData()?.weapon_effect);
  const weaponSkillDesc = libs.createMemo(() => {
    const privilege = weaponSkillName();
    if (!privilege) {
      return GetLocalization("#Weapon_NoAbilityEffect", "");
    }
    return getPrivilegeDescription(privilege, Math.max(1, Math.min(weaponStar() ?? 0, 6)));
  });
  return (() => {
    const _el$19 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetail weapon"
      }, null),
      _el$20 = libs.createElement("Label", {
        get ["class"]() {
          return "ShowRoomFullDetailName Rarity" + (weaponData()?.rarity ?? 0);
        },
        get text() {
          return "#" + weaponId();
        }
      }, _el$19),
      _el$21 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailModel"
      }, _el$19),
      _el$22 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailSkill"
      }, _el$19),
      _el$23 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "right"
      }, _el$22),
      _el$25 = libs.createElement("Label", {
        "class": "ShowRoomFullDetailSkillText",
        html: true,
        get text() {
          return weaponSkillDesc();
        }
      }, _el$23);
    libs.insert(_el$21, libs.createComponent(solid_utils.DynamicKey, {
      key: weaponId,
      children: wid => libs.createComponent(libs.Show, {
        get when() {
          return wid && weaponData();
        },
        get children() {
          return libs.createComponent(weapon3DPreview.Weapon3DPreview, {
            get model() {
              return KeyValues.weapon[wid].model;
            },
            get defaultConfig() {
              return KeyValues.weapon[wid].hero;
            }
          });
        }
      })
    }));
    libs.setProp(_el$23, "align", "center center");
    libs.setProp(_el$23, "flowChildren", "right");
    libs.insert(_el$23, libs.createComponent(libs.Show, {
      get when() {
        return weaponSkillName();
      },
      get children() {
        const _el$24 = libs.createElement("DOTAAbilityImage", {
          "class": "ShowRoomFullDetailSkillIcon",
          get abilityname() {
            return weaponSkillName();
          },
          showtooltip: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$24, "abilityname", weaponSkillName(), _$p));
        return _el$24;
      }
    }), _el$25);
    libs.insert(_el$19, libs.createComponent(ShowRoomDetailMeta, {
      star: weaponStar,
      type: "weapon",
      origin: weaponCreationText
    }), null);
    libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "ShowRoomFullDetailClose",
      get onactivate() {
        return props.close;
      },
      get children() {
        return libs.createElement("Label", {
          text: "#ShowRoom_ClickToClose"
        }, null);
      }
    }), null);
    libs.effect(_p$ => {
      const _v$8 = "ShowRoomFullDetailName Rarity" + (weaponData()?.rarity ?? 0),
        _v$9 = "#" + weaponId(),
        _v$0 = weaponSkillDesc();
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$20, "class", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$20, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$25, "text", _v$0, _p$._v$0));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined
    });
    return _el$19;
  })();
};
const getCourierFishExploreInfo = (fishSkill, exploreSkill) => {
  const type = fishSkill ? "fish" : "explore";
  const rawValue = fishSkill || exploreSkill;
  if (rawValue == undefined) {
    return {
      txt: "",
      type
    };
  }
  const parts = rawValue.split(":");
  if (parts.length == 2) {
    return {
      type,
      txt: GetPropertyLocalization(parts[0], toFiniteNumber(parts[1], 0))
    };
  }
  const cfg = KeyValues.idle_game_drop_privilege[rawValue];
  if (cfg == undefined) {
    return {
      txt: "",
      type
    };
  }
  return {
    type,
    txt: getKeyValueDescription(GetLocalization(`#${rawValue}`, ""), {
      chance: cfg.chance
    }),
    item: {
      id: cfg.itemid.toString(),
      count: cfg.num
    }
  };
};
const getCourierFishExploreTitleKey = type => {
  return type === "fish" ? "#courier_ability_fish_bonus" : "#courier_ability_explore_bonus";
};
const CourierShowRoomFullDetail = props => {
  const courierId = libs.createMemo(() => {
    const data = props.slotData();
    return data?.courier?.courier_id ?? data?.id ?? 0;
  });
  const courierData = libs.createMemo(() => KeyValues.service_courier[courierId()]);
  const courierStar = libs.createMemo(() => props.slotData()?.courier?.star);
  const courierCreationText = libs.createMemo(() => getShowRoomCreationText(props.slotData()?.courier?.creation_details));
  const courierAbility = libs.createMemo(() => courierData()?.active_skill);
  const courierAbilityLevel = libs.createMemo(() => Math.max(1, courierStar() ?? 0));
  const courierFish = libs.createMemo(() => courierData()?.["fish_skill" + courierAbilityLevel()]);
  const courierExplore = libs.createMemo(() => courierData()?.["explore_skill" + courierAbilityLevel()]);
  const courierFishExploreInfo = libs.createMemo(() => getCourierFishExploreInfo(courierFish(), courierExplore()));
  const courierAbilityValues = libs.createMemo(() => {
    const ability = courierAbility();
    return ability ? KeyValues.courier_abilities[ability]?.AbilityValues ?? {} : {};
  });
  const courierSkillDesc = libs.createMemo(() => {
    const ability = courierAbility();
    if (!ability) return "";
    return getKeyValueDescription(GetLocalization("#DOTA_Tooltip_ability_" + ability + "_Description", ""), courierAbilityValues(), {
      level: courierAbilityLevel()
    });
  });
  return (() => {
    const _el$27 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetail courier"
      }, null),
      _el$28 = libs.createElement("Label", {
        get ["class"]() {
          return "ShowRoomFullDetailName Rarity" + (courierData()?.quality ?? 0);
        },
        get text() {
          return "#" + courierId();
        }
      }, _el$27),
      _el$29 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailModel courier"
      }, _el$27),
      _el$30 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailSkill"
      }, _el$27),
      _el$31 = libs.createElement("Panel", {
        flowChildren: "down",
        align: "center center"
      }, _el$30),
      _el$32 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "right"
      }, _el$31),
      _el$34 = libs.createElement("Label", {
        "class": "ShowRoomFullDetailSkillText",
        html: true,
        get text() {
          return courierSkillDesc();
        }
      }, _el$32);
    libs.insert(_el$29, libs.createComponent(solid_utils.DynamicKey, {
      key: courierId,
      children: cid => libs.createComponent(libs.Show, {
        when: cid,
        get children() {
          return libs.createComponent(portraitsCourier.PortraitsCourier, {
            courier_id: cid,
            scale: 1.5,
            allowrotation: true
          });
        }
      })
    }));
    libs.setProp(_el$31, "flowChildren", "down");
    libs.setProp(_el$31, "align", "center center");
    libs.setProp(_el$32, "align", "center center");
    libs.setProp(_el$32, "flowChildren", "right");
    libs.insert(_el$32, libs.createComponent(libs.Show, {
      get when() {
        return courierAbility();
      },
      get children() {
        const _el$33 = libs.createElement("DOTAAbilityImage", {
          "class": "ShowRoomFullDetailSkillIcon",
          get abilityname() {
            return courierAbility();
          },
          showtooltip: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$33, "abilityname", courierAbility(), _$p));
        return _el$33;
      }
    }), _el$34);
    libs.insert(_el$31, libs.createComponent(libs.Show, {
      get when() {
        return courierFishExploreInfo().txt != "";
      },
      get children() {
        const _el$35 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "right"
          }, null),
          _el$36 = libs.createElement("Label", {
            "class": "ShowRoomFullDetailSkillType",
            get text() {
              return getCourierFishExploreTitleKey(courierFishExploreInfo().type);
            }
          }, _el$35),
          _el$37 = libs.createElement("Label", {
            "class": "ShowRoomFullDetailSkillText",
            html: true,
            get text() {
              return courierFishExploreInfo().txt;
            }
          }, _el$35);
        libs.setProp(_el$35, "align", "center center");
        libs.setProp(_el$35, "flowChildren", "right");
        libs.insert(_el$35, libs.createComponent(libs.Show, {
          get when() {
            return courierFishExploreInfo().item != undefined;
          },
          get children() {
            return libs.createComponent(StoreItem.StoreItemBlock, {
              "class": "ShowRoomFullDetailSkillItem",
              get item_id() {
                return courierFishExploreInfo().item.id;
              },
              get amounts() {
                return courierFishExploreInfo().item.count;
              }
            });
          }
        }), null);
        libs.effect(_p$ => {
          const _v$1 = getCourierFishExploreTitleKey(courierFishExploreInfo().type),
            _v$10 = courierFishExploreInfo().txt;
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$36, "text", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$37, "text", _v$10, _p$._v$10));
          return _p$;
        }, {
          _v$1: undefined,
          _v$10: undefined
        });
        return _el$35;
      }
    }), null);
    libs.insert(_el$27, libs.createComponent(ShowRoomDetailMeta, {
      star: courierStar,
      type: "courier",
      origin: courierCreationText
    }), null);
    libs.insert(_el$27, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "ShowRoomFullDetailClose",
      get onactivate() {
        return props.close;
      },
      get children() {
        return libs.createElement("Label", {
          text: "#ShowRoom_ClickToClose"
        }, null);
      }
    }), null);
    libs.effect(_p$ => {
      const _v$11 = "ShowRoomFullDetailName Rarity" + (courierData()?.quality ?? 0),
        _v$12 = "#" + courierId(),
        _v$13 = courierAbility() != undefined,
        _v$14 = courierSkillDesc();
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$28, "class", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$28, "text", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$32, "visible", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$34, "text", _v$14, _p$._v$14));
      return _p$;
    }, {
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined
    });
    return _el$27;
  })();
};
const EquipmentShowRoomFullDetail = props => {
  const equipmentData = libs.createMemo(() => getShowRoomEquipmentData(props.slotData()));
  const equipmentItemId = libs.createMemo(() => equipmentData()?.equipment_item_id ?? 0);
  const equipmentCreationText = libs.createMemo(() => getShowRoomCreationText(equipmentData()?.creation_details));
  const equipmentLevel = libs.createMemo(() => equipmentData()?.level);
  const suitEffectId = libs.createMemo(() => {
    const raw = equipmentData()?.ability_entry_data;
    const entries = typeof raw === "string" ? JSON.parseSafe(raw) : raw;
    return entries?.[0]?.id;
  });
  const suitLv6Privilege = libs.createMemo(() => {
    const id = suitEffectId();
    return id ? KeyValues.equipment_suit_effect[id]?.lv6 : undefined;
  });
  const suitLv6Desc = libs.createMemo(() => {
    const privilege = suitLv6Privilege();
    return privilege ? GetPrivilegeDesc(privilege) : "";
  });
  const suitLv6Name = libs.createMemo(() => {
    return GetLocalization("#" + suitEffectId(), "");
  });
  const hasSuitLv6Effect = libs.createMemo(() => suitLv6Name() != "" || suitLv6Desc() != "");
  return (() => {
    const _el$39 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetail equipment"
      }, null),
      _el$40 = libs.createElement("Label", {
        get ["class"]() {
          return "ShowRoomFullDetailName Rarity" + (equipmentData()?.rarity ?? 0);
        },
        get text() {
          return "#" + equipmentItemId();
        }
      }, _el$39),
      _el$41 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailModel equipment"
      }, _el$39);
    libs.insert(_el$41, libs.createComponent(solid_utils.DynamicKey, {
      key: equipmentItemId,
      children: itemId => libs.createComponent(libs.Show, {
        when: itemId,
        get children() {
          return libs.createComponent(server_equipment.EquipmentIcon, {
            equipment_item_id: itemId,
            get rarity() {
              return equipmentData()?.rarity ?? 0;
            }
          });
        }
      })
    }));
    libs.insert(_el$39, libs.createComponent(libs.Show, {
      get when() {
        return hasSuitLv6Effect();
      },
      get children() {
        const _el$42 = libs.createElement("Panel", {
            "class": "ShowRoomFullDetailSkill"
          }, null),
          _el$43 = libs.createElement("Panel", {
            "class": "ShowRoomFullDetailSkillContent",
            align: "center center",
            flowChildren: "right"
          }, _el$42),
          _el$44 = libs.createElement("Panel", {
            "class": "ShowRoomFullDetailSkillTitle"
          }, _el$43),
          _el$45 = libs.createElement("Label", {
            "class": "ShowRoomFullDetailSkillName",
            get text() {
              return suitLv6Name();
            }
          }, _el$44),
          _el$46 = libs.createElement("Label", {
            "class": "ShowRoomFullDetailSkillText",
            html: true,
            get text() {
              return suitLv6Desc();
            }
          }, _el$43);
        libs.setProp(_el$43, "align", "center center");
        libs.setProp(_el$43, "flowChildren", "right");
        libs.insert(_el$44, libs.createComponent(server_equipment.SuitIcon, {
          get suitName() {
            return suitEffectId();
          }
        }), _el$45);
        libs.effect(_p$ => {
          const _v$15 = suitLv6Name(),
            _v$16 = suitLv6Desc();
          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$45, "text", _v$15, _p$._v$15));
          _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$46, "text", _v$16, _p$._v$16));
          return _p$;
        }, {
          _v$15: undefined,
          _v$16: undefined
        });
        return _el$42;
      }
    }), null);
    libs.insert(_el$39, libs.createComponent(ShowRoomDetailMeta, {
      level: equipmentLevel,
      origin: equipmentCreationText
    }), null);
    libs.insert(_el$39, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "ShowRoomFullDetailClose",
      get onactivate() {
        return props.close;
      },
      get children() {
        return libs.createElement("Label", {
          text: "#ShowRoom_ClickToClose"
        }, null);
      }
    }), null);
    libs.effect(_p$ => {
      const _v$17 = "ShowRoomFullDetailName Rarity" + (equipmentData()?.rarity ?? 0),
        _v$18 = "#" + equipmentItemId();
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$40, "class", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$40, "text", _v$18, _p$._v$18));
      return _p$;
    }, {
      _v$17: undefined,
      _v$18: undefined
    });
    return _el$39;
  })();
};
const CosmeticShowRoomFullDetail = props => {
  const cosmeticId = libs.createMemo(() => props.slotData()?.id ?? 0);
  const cosmeticData = libs.createMemo(() => KeyValues.info_item_cosmetic[String(cosmeticId())]);
  const specialEffects = libs.createMemo(() => {
    return String(cosmeticData()?.effect ?? "").split("|").filter(Boolean).map(effect => GetPrivilegeDesc(effect)).filter(Boolean);
  });
  const specialEffectText = libs.createMemo(() => {
    const effects = specialEffects();
    return effects.length > 0 ? effects.join("<br>") : GetLocalization("#ShowRoom_CosmeticNoSpecialEffect");
  });
  const attributeText = libs.createMemo(() => {
    return Object.entries(cosmeticData()?.attribute ?? {}).map(([attribute, value]) => GetPropertyLocalization(attribute, Number(value))).filter(Boolean).join("<br>");
  });
  return (() => {
    const _el$48 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetail cosmetic"
      }, null),
      _el$49 = libs.createElement("Label", {
        get ["class"]() {
          return "ShowRoomFullDetailName Rarity" + (cosmeticData()?.rarity ?? 0);
        },
        get text() {
          return GetLocalization("#" + cosmeticId());
        }
      }, _el$48),
      _el$50 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailModel cosmetic"
      }, _el$48),
      _el$51 = libs.createElement("Panel", {
        "class": "ShowRoomCosmeticEffectList"
      }, _el$48),
      _el$52 = libs.createElement("Panel", {
        "class": "ShowRoomFullDetailSkill cosmetic"
      }, _el$51),
      _el$54 = libs.createElement("Label", {
        "class": "ShowRoomFullDetailSkillText",
        html: true,
        get text() {
          return specialEffectText();
        }
      }, _el$52);
    libs.insert(_el$50, libs.createComponent(solid_utils.DynamicKey, {
      key: cosmeticId,
      children: id => libs.createComponent(libs.Show, {
        when: id,
        get children() {
          const _el$59 = libs.createElement("Image", {
            "class": "CosmeticImage",
            get src() {
              return getSrcPath(`store_items/${id}.png`);
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$59, "src", getSrcPath(`store_items/${id}.png`), _$p));
          return _el$59;
        }
      })
    }));
    libs.insert(_el$52, libs.createComponent(libs.Show, {
      get when() {
        return specialEffects().length > 0;
      },
      get children() {
        const _el$53 = libs.createElement("Label", {
          "class": "ShowRoomCosmeticEffectTitle",
          get text() {
            return GetLocalization("#ShowRoom_CosmeticSpecialEffect");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$53, "text", GetLocalization("#ShowRoom_CosmeticSpecialEffect"), _$p));
        return _el$53;
      }
    }), _el$54);
    libs.insert(_el$51, libs.createComponent(libs.Show, {
      get when() {
        return attributeText() != "";
      },
      get children() {
        const _el$55 = libs.createElement("Panel", {
            "class": "ShowRoomFullDetailSkill cosmetic"
          }, null),
          _el$56 = libs.createElement("Label", {
            "class": "ShowRoomCosmeticEffectTitle",
            get text() {
              return GetLocalization("#ShowRoom_CosmeticAttributeEffect");
            }
          }, _el$55),
          _el$57 = libs.createElement("Label", {
            "class": "ShowRoomFullDetailSkillText",
            html: true,
            get text() {
              return attributeText();
            }
          }, _el$55);
        libs.effect(_p$ => {
          const _v$19 = GetLocalization("#ShowRoom_CosmeticAttributeEffect"),
            _v$20 = attributeText();
          _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$56, "text", _v$19, _p$._v$19));
          _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$57, "text", _v$20, _p$._v$20));
          return _p$;
        }, {
          _v$19: undefined,
          _v$20: undefined
        });
        return _el$55;
      }
    }), null);
    libs.insert(_el$48, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "ShowRoomFullDetailClose",
      get onactivate() {
        return props.close;
      },
      get children() {
        const _el$58 = libs.createElement("Label", {
          get text() {
            return GetLocalization("#ShowRoom_ClickToClose");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$58, "text", GetLocalization("#ShowRoom_ClickToClose"), _$p));
        return _el$58;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$21 = "ShowRoomFullDetailName Rarity" + (cosmeticData()?.rarity ?? 0),
        _v$22 = GetLocalization("#" + cosmeticId()),
        _v$23 = specialEffectText();
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$49, "class", _v$21, _p$._v$21));
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$49, "text", _v$22, _p$._v$22));
      _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$54, "text", _v$23, _p$._v$23));
      return _p$;
    }, {
      _v$21: undefined,
      _v$22: undefined,
      _v$23: undefined
    });
    return _el$48;
  })();
};
const CourierAbilityItem = props => {
  const abilityValues = libs.createMemo(() => {
    const kv = KeyValues.courier_abilities[props.abilityName];
    return kv?.AbilityValues ?? {};
  });
  return (() => {
    const _el$60 = libs.createElement("Panel", {
        "class": "CourierAbilityItem"
      }, null),
      _el$61 = libs.createElement("Panel", {
        "class": "CourierAbilityName"
      }, _el$60);
      libs.createElement("Panel", {
        "class": "AbilityNameDecorLeft"
      }, _el$61);
      const _el$63 = libs.createElement("Label", {
        "class": "CourierAbilityLabel",
        get text() {
          return "#courier_ability_" + props.type;
        }
      }, _el$61);
      libs.createElement("Panel", {
        "class": "AbilityNameDecorRight"
      }, _el$61);
      const _el$65 = libs.createElement("Panel", {
        "class": "CourierAbilityDesc"
      }, _el$60),
      _el$66 = libs.createElement("DOTAAbilityImage", {
        "class": "CourierAbilityIcon",
        get abilityname() {
          return props.abilityName;
        },
        showtooltip: false
      }, _el$65),
      _el$67 = libs.createElement("Label", {
        "class": "CourierAbilityText",
        html: true,
        get text() {
          return getKeyValueDescription(GetLocalization("#DOTA_Tooltip_ability_" + props.abilityName + "_Description", ""), abilityValues(), {
            level: props.abilityLevel
          });
        }
      }, _el$65);
    libs.effect(_p$ => {
      const _v$24 = "#courier_ability_" + props.type,
        _v$25 = props.abilityName,
        _v$26 = getKeyValueDescription(GetLocalization("#DOTA_Tooltip_ability_" + props.abilityName + "_Description", ""), abilityValues(), {
          level: props.abilityLevel
        });
      _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$63, "text", _v$24, _p$._v$24));
      _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$66, "abilityname", _v$25, _p$._v$25));
      _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$67, "text", _v$26, _p$._v$26));
      return _p$;
    }, {
      _v$24: undefined,
      _v$25: undefined,
      _v$26: undefined
    });
    return _el$60;
  })();
};
const CourierFishExploreItem = props => {
  const abilityInfo = libs.createMemo(() => getCourierFishExploreInfo(props.fish_skill, props.explore_skill));
  const titleKey = libs.createMemo(() => getCourierFishExploreTitleKey(abilityInfo().type));
  return (() => {
    const _el$68 = libs.createElement("Panel", {
        "class": "CourierAbilityItem"
      }, null),
      _el$69 = libs.createElement("Panel", {
        "class": "CourierAbilityName"
      }, _el$68);
      libs.createElement("Panel", {
        "class": "AbilityNameDecorLeft"
      }, _el$69);
      const _el$71 = libs.createElement("Label", {
        "class": "CourierAbilityLabel",
        get text() {
          return titleKey();
        }
      }, _el$69);
      libs.createElement("Panel", {
        "class": "AbilityNameDecorRight"
      }, _el$69);
      const _el$73 = libs.createElement("Panel", {
        "class": "CourierAbilityDesc"
      }, _el$68),
      _el$74 = libs.createElement("Label", {
        "class": "CourierAbilityText",
        html: true,
        get text() {
          return abilityInfo().txt;
        }
      }, _el$73);
    libs.insert(_el$73, libs.createComponent(libs.Show, {
      get when() {
        return abilityInfo().item != undefined;
      },
      get children() {
        return libs.createComponent(StoreItem.StoreItemBlock, {
          get item_id() {
            return abilityInfo().item.id;
          },
          get amounts() {
            return abilityInfo().item.count;
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$27 = titleKey(),
        _v$28 = abilityInfo().txt;
      _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$71, "text", _v$27, _p$._v$27));
      _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$74, "text", _v$28, _p$._v$28));
      return _p$;
    }, {
      _v$27: undefined,
      _v$28: undefined
    });
    return _el$68;
  })();
};
const WeaponItemDetail = props => {
  const hoverWeaponData = libs.createMemo(() => {
    const id = props.hoverItemID();
    if (!id) return undefined;
    return KeyValues.weapon[id];
  });
  const hoverWeaponServiceData = libs.createMemo(() => {
    const id = props.hoverItemID();
    if (!id) return {
      star: 0
    };
    return props.playerWeapons()?.[String(id)] ?? {
      star: 0
    };
  });
  const weaponSkillDesc = libs.createMemo(() => {
    const data = hoverWeaponData();
    if (!data) return "";
    const star = hoverWeaponServiceData()?.star ?? 0;
    const privilege = data.weapon_effect;
    if (!privilege) {
      return GetLocalization("#Weapon_NoAbilityEffect", "");
    }
    return getPrivilegeDescription(privilege, Math.max(1, Math.min(star, 6)));
  });
  const weaponEffectList = libs.createMemo(() => {
    const data = hoverWeaponData();
    if (!data) return [];
    const result = [];
    for (let i = 1; i <= 6; i++) {
      const effectData = data["star_effect" + i];
      const privilegeData = data["star_privilege" + i];
      result.push({
        star: i,
        entries: Object.entries(effectData ?? {}),
        privileges: privilegeData ? privilegeData.split("|").filter(Boolean) : []
      });
    }
    return result;
  });
  const activeStar = libs.createMemo(() => hoverWeaponServiceData()?.star ?? 0);
  return (() => {
    const _el$75 = libs.createElement("Panel", {
      id: "ItemDesc",
      "class": "VerticalScrollStyle"
    }, null);
    libs.insert(_el$75, libs.createComponent(libs.Show, {
      get when() {
        return props.hoverItemID();
      },
      get children() {
        return [(() => {
          const _el$76 = libs.createElement("Label", {
            id: "ItemDescName",
            get text() {
              return "#" + props.hoverItemID();
            }
          }, null);
          libs.effect(_p$ => {
            const _v$29 = "Rarity" + (hoverWeaponData()?.rarity ?? 0),
              _v$30 = "#" + props.hoverItemID();
            _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$76, "className", _v$29, _p$._v$29));
            _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$76, "text", _v$30, _p$._v$30));
            return _p$;
          }, {
            _v$29: undefined,
            _v$30: undefined
          });
          return _el$76;
        })(), (() => {
          const _el$77 = libs.createElement("Panel", {
              id: "ItemDescSkill"
            }, null),
            _el$78 = libs.createElement("Label", {
              id: "ItemDescSkillText",
              html: true,
              get text() {
                return weaponSkillDesc();
              }
            }, _el$77);
          libs.effect(_$p => libs.setProp(_el$78, "text", weaponSkillDesc(), _$p));
          return _el$77;
        })(), libs.createComponent(StarEffectRows, {
          rows: weaponEffectList,
          activeStar: activeStar,
          getPrivilegeDescription: getPrivilegeDescription
        })];
      }
    }));
    return _el$75;
  })();
};
const CourierItemDetail = props => {
  const hoverCourierData = libs.createMemo(() => {
    const id = props.hoverItemID();
    if (!id) return undefined;
    return KeyValues.service_courier[id];
  });
  const hoverCourierServiceData = libs.createMemo(() => {
    const id = props.hoverItemID();
    if (!id) return {
      star: 0
    };
    return props.playerCouriers()?.[String(id)] ?? {
      star: 0
    };
  });
  const courierAbility = libs.createMemo(() => {
    return hoverCourierData()?.active_skill;
  });
  const currentAbilityLevel = libs.createMemo(() => Math.max(1, hoverCourierServiceData()?.star ?? 0));
  const courierFish = libs.createMemo(() => {
    return hoverCourierData()?.["fish_skill" + currentAbilityLevel()];
  });
  const courierExplore = libs.createMemo(() => {
    return hoverCourierData()?.["explore_skill" + currentAbilityLevel()];
  });
  const courierStarEffectList = libs.createMemo(() => {
    const data = hoverCourierData();
    if (!data) return [];
    const result = [];
    for (let i = 1; i <= 6; i++) {
      const effectData = data["star_effect" + i];
      result.push({
        star: i,
        entries: Object.entries(effectData ?? {})
      });
    }
    return result;
  });
  const activeStar = libs.createMemo(() => hoverCourierServiceData()?.star ?? 0);
  return (() => {
    const _el$79 = libs.createElement("Panel", {
      id: "ItemDesc",
      "class": "VerticalScrollStyle"
    }, null);
    libs.insert(_el$79, libs.createComponent(libs.Show, {
      get when() {
        return props.hoverItemID();
      },
      get children() {
        return [(() => {
          const _el$80 = libs.createElement("Label", {
            id: "ItemDescName",
            get text() {
              return "#" + props.hoverItemID();
            }
          }, null);
          libs.effect(_p$ => {
            const _v$31 = "Rarity" + (hoverCourierData()?.quality ?? 0),
              _v$32 = "#" + props.hoverItemID();
            _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$80, "className", _v$31, _p$._v$31));
            _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$80, "text", _v$32, _p$._v$32));
            return _p$;
          }, {
            _v$31: undefined,
            _v$32: undefined
          });
          return _el$80;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return courierAbility() != undefined;
          },
          get children() {
            return libs.createComponent(CourierAbilityItem, {
              get abilityName() {
                return courierAbility();
              },
              get abilityLevel() {
                return currentAbilityLevel();
              },
              type: "active"
            });
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return courierFish() != undefined || courierExplore() != undefined;
          },
          get children() {
            return libs.createComponent(CourierFishExploreItem, {
              get explore_skill() {
                return courierExplore();
              },
              get fish_skill() {
                return courierFish();
              }
            });
          }
        }), libs.createComponent(StarEffectRows, {
          rows: courierStarEffectList,
          activeStar: activeStar
        })];
      }
    }));
    return _el$79;
  })();
};
const ShowRoomContent = () => {
  const [isDragging, setIsDragging] = libs.createSignal();
  const [dropHoverSlot, setDropHoverSlot] = libs.createSignal();
  const [isEditing, setIsEditing] = libs.createSignal(false);
  const [hoverItemID, setHoverItemID] = libs.createSignal();
  const [bRequesting, SetRequesting] = libs.createSignal(false);
  const [detailSlot, setDetailSlot] = libs.createSignal();
  let showRoomPanel;
  const showType = libs.createMemo(() => currentConfig().showType);
  const listedItemIds = libs.createMemo(() => getListedItemIds(showType(), showRoomData));
  const likeCount = libs.createMemo(() => playerCounters()?.["show_room_liked_total"]?.count ?? 0);
  const targetLikeCount = libs.createMemo(() => {
    const targetUID = targetSteamID();
    if (targetUID == undefined) return 0;
    return playerShowRoomLikes()?.[String(targetUID)]?.count ?? 0;
  });
  const canLike = libs.createMemo(() => !canEdit() && targetLikeCount() < SHOW_ROOM_LIKE_LIMIT);
  const itemChildConfig = libs.createMemo(() => currentConfig().itemChildConfig ?? {
    width: 84,
    height: 84,
    margin: 5
  });
  const detailSlotData = libs.createMemo(() => {
    const slot = detailSlot();
    if (slot == undefined) return undefined;
    return showRoomData()?.[`${showType()}-${slot}`];
  });
  const detailVisible = libs.createMemo(() => detailSlotData() != undefined && currentConfig().renderFullDetail != undefined);
  libs.createEffect(() => {
    showType();
    targetSteamID();
    setIsEditing(false);
    setIsDragging(undefined);
    setDropHoverSlot(undefined);
    setDetailSlot(undefined);
  });
  libs.createEffect(() => {
    const list = currentConfig().itemList();
    const current = hoverItemID();
    if (current != undefined && list.some(item => item.id === current)) {
      return;
    }
    setHoverItemID(list[0]?.id);
  });
  const playLikeAnimation = () => {
    if (!showRoomPanel?.IsValid()) return;
    const size = 20 + Math.floor(Math.random() * 19);
    const startRight = 190 + Math.floor(Math.random() * 36);
    const startTop = 86 + Math.floor(Math.random() * 14);
    const color = SHOW_ROOM_LIKE_COLORS[Math.floor(Math.random() * SHOW_ROOM_LIKE_COLORS.length)];
    const driftClass = SHOW_ROOM_LIKE_DRIFT_CLASSES[Math.floor(Math.random() * SHOW_ROOM_LIKE_DRIFT_CLASSES.length)];
    const likePanel = $.CreatePanel("Panel", showRoomPanel, "");
    likePanel.hittest = false;
    likePanel.style.width = `${size}px`;
    likePanel.style.height = `${size}px`;
    likePanel.style.marginRight = `${startRight}px`;
    likePanel.style.marginTop = `${startTop}px`;
    likePanel.style.washColor = color;
    likePanel.AddClass(driftClass);
    likePanel.AddClass("FloatingLike");
    likePanel.DeleteAsync(1.4);
  };
  const onLike = () => {
    if (!canLike()) return;
    playLikeAnimation();
    if (bRequesting()) return;
    const targetUID = targetSteamID();
    if (targetUID == undefined) return;
    SetRequesting(true);
    ServerRequest("like_show_room", {
      target_player_id: targetPlayerID(),
      target_uid: Number(targetUID)
    }, result => {
      SetRequesting(false);
      if (result.code != 0 && result.code != 200) {
        if (result.message == "daily like count limit") {
          ErrorMessage("#ShowRoom_DailyLikeLimit");
        } else if (result.message != undefined) {
          ErrorMessage(result.message);
        }
      } else {
        playerInfo.refresh();
      }
    }, undefined, () => {
      SetRequesting(false);
    });
  };
  const requestUpdateShowRoomSlot = (showType, slot, id, onSuccess) => {
    if (bRequesting() || !canEdit()) return;
    SetRequesting(true);
    CallActionRequest("/v1/brief/update_show_room", {
      show_type: showType,
      slot,
      id
    }, result => {
      SetRequesting(false);
      if (result.code !== 0) {
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
        return;
      }
      playerInfo.refresh();
      onSuccess?.();
    }, () => {
      SetRequesting(false);
    }, false);
  };
  const assignItemToSlot = (showType, slot, id, showRoomData, sourceSlot) => {
    if (bRequesting() || !canEdit()) return;
    const validSourceSlot = sourceSlot != undefined && showRoomData()?.[`${showType}-${sourceSlot}`]?.id === id ? sourceSlot : undefined;
    const listedSlot = validSourceSlot ?? findListedSlot(showType, id, showRoomData);
    if (listedSlot === slot) return;
    const targetItemId = showRoomData()?.[`${showType}-${slot}`]?.id;
    const assignToTargetSlot = () => requestUpdateShowRoomSlot(showType, slot, id, () => {
      if (listedSlot !== undefined && targetItemId != undefined && targetItemId !== id) {
        requestUpdateShowRoomSlot(showType, listedSlot, targetItemId);
      }
    });
    if (listedSlot !== undefined) {
      requestUpdateShowRoomSlot(showType, listedSlot, 0, assignToTargetSlot);
      return;
    }
    assignToTargetSlot();
  };
  const onItemContextMenu = (p, item) => {
    if (bRequesting() || !canEdit()) return;
    const menus = {};
    const currentShowType = showType();
    const isListed = listedItemIds().has(item.id);
    if (isListed) {
      menus[GetLocalization("#ShowRoom_Unlist")] = () => {
        for (let i = 1; i <= SLOT_NUMBERS.length; i++) {
          const data = showRoomData()?.[`${currentShowType}-${i}`];
          if (data && data.id === item.id) {
            requestUpdateShowRoomSlot(currentShowType, i, 0);
            break;
          }
        }
      };
    } else {
      const emptySlot = findNextEmptySlot(currentShowType, showRoomData);
      if (emptySlot !== undefined) {
        menus[GetLocalization("#ShowRoom_List")] = () => {
          requestUpdateShowRoomSlot(currentShowType, emptySlot, item.id);
        };
      }
    }
    if (Object.keys(menus).length > 0) {
      CustomUIConfig.showContextMenu(p, menus);
    }
  };
  const renderStoreItemBlock = item => {
    const customRender = currentConfig().renderStoreItemBlock;
    if (customRender) {
      return customRender(item);
    }
    return libs.createComponent(StoreItem.StoreItemBlock, {
      get item_id() {
        return item ? getItemDisplayId(item) : 0;
      }
    });
  };
  const getSlotItem = data => {
    const type = showType();
    const itemData = data?.[type];
    if (!data || !itemData) return undefined;
    return {
      key: `${type}-${data.id}`,
      type,
      id: data.id,
      data: itemData
    };
  };
  const startItemDrag = (item, sourcePanel, dragCallbacks, sourceSlot) => {
    if (item.type === "equipment") {
      HideCustomTooltip(sourcePanel, "server_equip");
    }
    const displayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "dragImage");
    libs.render(() => item.type === "equipment" ? libs.createComponent(EquipmentShowRoomStoreItem, {
      item: item,
      hideTips: true
    }) : libs.createComponent(StoreItem.StoreItemBlock, {
      get item_id() {
        return getItemDisplayId(item);
      }
    }), displayPanel);
    dragCallbacks.displayPanel = displayPanel;
    dragCallbacks.offsetX = 50;
    dragCallbacks.offsetY = 50;
    SaveData(displayPanel, "showRoomItem", item.id);
    if (sourceSlot != undefined) {
      SaveData(displayPanel, "showRoomSourceSlot", sourceSlot);
    }
    setIsDragging(item.key);
    return true;
  };
  const endItemDrag = draggedPanel => {
    setIsDragging(undefined);
    setDropHoverSlot(undefined);
    draggedPanel.DeleteAsync(-1);
  };
  const openSlotDetail = slotNum => {
    if (isEditing()) return;
    const data = showRoomData()?.[`${showType()}-${slotNum}`];
    if (!data) return;
    setDetailSlot(slotNum);
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "ShowRoomContent",
    get ["class"]() {
      return showType() + (isEditing() ? " editing" : "") + (detailVisible() ? " previewing" : "");
    },
    get children() {
      return libs.createComponent(libs.Show, {
        get when() {
          return playerInfoReady();
        },
        get fallback() {
          return libs.createComponent(EOM_Loading.EOM_Loading, {
            type: "PointSpin",
            horizontalAlign: "center",
            verticalAlign: "center"
          });
        },
        get children() {
          return [(() => {
            const _el$81 = libs.createElement("Panel", {
                id: "ShowRoom"
              }, null),
              _el$87 = libs.createElement("Panel", {
                "class": "SlotContainer"
              }, _el$81);
            libs.use(panel => showRoomPanel = panel, _el$81);
            libs.insert(_el$81, libs.createComponent(libs.Show, {
              get when() {
                return !isEditing();
              },
              get children() {
                return [(() => {
                  const _el$82 = libs.createElement("Panel", {
                    id: "RightTopBtns"
                  }, null);
                  libs.insert(_el$82, libs.createComponent(EOM_Button.EOM_BaseButton, {
                    "class": "RightTopBtn LikeBtn",
                    get enabled() {
                      return canLike();
                    },
                    onactivate: () => onLike(),
                    get children() {
                      return [(() => {
                        const _el$83 = libs.createElement("Panel", {
                            "class": "IconFrame"
                          }, null);
                          libs.createElement("Panel", {
                            "class": "Icon"
                          }, _el$83);
                        return _el$83;
                      })(), (() => {
                        const _el$85 = libs.createElement("Label", {
                          "class": "NumLabel",
                          get text() {
                            return String(likeCount());
                          }
                        }, null);
                        libs.effect(_$p => libs.setProp(_el$85, "text", String(likeCount()), _$p));
                        return _el$85;
                      })()];
                    }
                  }));
                  return _el$82;
                })(), (() => {
                  const _el$86 = libs.createElement("Panel", {
                    "class": "Info"
                  }, null);
                  libs.setProp(_el$86, "tooltip_text", "#ShowRoom_Tips1");
                  return _el$86;
                })()];
              }
            }), _el$87);
            libs.insert(_el$87, libs.createComponent(libs.For, {
              each: SLOT_NUMBERS,
              children: slotNum => {
                const slotData = () => showRoomData()?.[`${showType()}-${slotNum}`];
                const slotItemData = () => slotData()?.[showType()];
                const isEmpty = () => !slotItemData();
                const onSlotActivate = () => {
                  if (isEmpty()) {
                    if (canEdit()) {
                      setIsEditing(true);
                    }
                    return;
                  }
                  openSlotDetail(slotNum);
                };
                return (() => {
                  const _el$94 = libs.createElement("Panel", {
                      id: "Slot" + slotNum,
                      "class": "ShowRoomSlot"
                    }, null),
                    _el$95 = libs.createElement("Panel", {
                      id: "Border"
                    }, _el$94);
                  libs.setProp(_el$94, "id", "Slot" + slotNum);
                  libs.setProp(_el$94, "ondblclick", () => {
                    openSlotDetail(slotNum);
                  });
                  libs.setProp(_el$94, "onDragEnter", (p, draggedPanel) => {
                    if (!canEdit()) return;
                    if (LoadData(draggedPanel, "showRoomItem")) {
                      setDropHoverSlot(slotNum);
                    }
                  });
                  libs.setProp(_el$94, "onDragLeave", () => {
                    if (!canEdit()) return;
                    if (dropHoverSlot() === slotNum) {
                      setDropHoverSlot(undefined);
                    }
                  });
                  libs.setProp(_el$94, "onDragDrop", (p, draggedPanel) => {
                    if (!canEdit()) return;
                    setDropHoverSlot(undefined);
                    const itemId = LoadData(draggedPanel, "showRoomItem");
                    if (itemId) {
                      const sourceSlot = LoadData(draggedPanel, "showRoomSourceSlot");
                      assignItemToSlot(showType(), slotNum, itemId, showRoomData, sourceSlot);
                    }
                  });
                  libs.setProp(_el$94, "onDragStart", (panel, dragCallbacks) => {
                    if (!isEditing() || bRequesting() || !canEdit()) return;
                    const item = getSlotItem(slotData());
                    if (!item) return;
                    return startItemDrag(item, panel, dragCallbacks, slotNum);
                  });
                  libs.setProp(_el$94, "onDragEnd", (panel, draggedPanel) => {
                    endItemDrag(draggedPanel);
                  });
                  libs.setProp(_el$94, "oncontextmenu", () => {
                    if (bRequesting() || !canEdit() || isEmpty()) return;
                    requestUpdateShowRoomSlot(showType(), slotNum, 0);
                  });
                  libs.setProp(_el$94, "onactivate", onSlotActivate);
                  libs.insert(_el$94, libs.createComponent(libs.Show, {
                    get when() {
                      return !isEmpty();
                    },
                    get children() {
                      return currentConfig().renderSlotItem(slotData);
                    }
                  }), _el$95);
                  libs.effect(_$p => libs.setProp(_el$94, "classList", {
                    Filled: !isEmpty(),
                    potential_drop_target: dropHoverSlot() === slotNum
                  }, _$p));
                  return _el$94;
                })();
              }
            }));
            libs.insert(_el$81, libs.createComponent(libs.Show, {
              get when() {
                return libs.memo(() => !!!isEditing())() && canEdit();
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  "class": "EditBtn",
                  onactivate: () => setIsEditing(true),
                  get children() {
                    return [(() => {
                      const _el$88 = libs.createElement("Panel", {
                          "class": "IconFrame"
                        }, null);
                        libs.createElement("Panel", {
                          "class": "Icon"
                        }, _el$88);
                      return _el$88;
                    })(), libs.createElement("Label", {
                      text: "#ShowRoom_Edit"
                    }, null)];
                  }
                });
              }
            }), null);
            libs.insert(_el$81, libs.createComponent(libs.Show, {
              get when() {
                return libs.memo(() => !!isEditing())() && canEdit();
              },
              get children() {
                const _el$91 = libs.createElement("Panel", {
                    id: "ShowRoomRight"
                  }, null),
                  _el$92 = libs.createElement("Panel", {
                    flowChildren: "right"
                  }, _el$91),
                  _el$93 = libs.createElement("Panel", {
                    "class": "ItemListContainer"
                  }, _el$92);
                libs.setProp(_el$92, "flowChildren", "right");
                libs.insert(_el$93, libs.createComponent(RecycleView.RecycleView, {
                  id: "ShowRoomGrid",
                  get input() {
                    return currentConfig().itemList;
                  },
                  direction: "VerticalGrid",
                  wheelStep: 84,
                  get childConfig() {
                    return itemChildConfig();
                  },
                  children: data => {
                    const item = libs.createMemo(() => data());
                    return (() => {
                      const _el$96 = libs.createElement("Panel", {
                        "class": "GridItem"
                      }, null);
                      libs.setProp(_el$96, "onmouseover", () => setHoverItemID(item()?.id));
                      libs.setProp(_el$96, "onDragStart", (panel, dragCallbacks) => {
                        if (!canEdit()) return;
                        const currentItem = item();
                        if (!currentItem) return;
                        return startItemDrag(currentItem, panel, dragCallbacks);
                      });
                      libs.setProp(_el$96, "onDragEnd", (panel, draggedPanel) => {
                        endItemDrag(draggedPanel);
                      });
                      libs.setProp(_el$96, "oncontextmenu", p => {
                        const currentItem = item();
                        if (currentItem) onItemContextMenu(p, currentItem);
                      });
                      libs.insert(_el$96, () => renderStoreItemBlock(item()), null);
                      libs.insert(_el$96, libs.createComponent(libs.Show, {
                        get when() {
                          return listedItemIds().has(item()?.id);
                        },
                        get children() {
                          return libs.createElement("Panel", {
                            "class": "CheckIcon"
                          }, null);
                        }
                      }), null);
                      libs.effect(_$p => libs.setProp(_el$96, "classList", {
                        dragging_from: isDragging() === item()?.key,
                        StarGridItem: item()?.type === "courier" || item()?.type === "weapon"
                      }, _$p));
                      return _el$96;
                    })();
                  }
                }));
                libs.insert(_el$92, () => currentConfig().renderExtraRightPanel?.(), null);
                libs.insert(_el$91, libs.createComponent(EOM_Button.EOM_Button, {
                  "class": "CancelBtn",
                  uiScale: "90%",
                  text: "#ShowRoom_Confirm",
                  onactivate: () => setIsEditing(false)
                }), null);
                return _el$91;
              }
            }), null);
            libs.effect(_p$ => {
              const _v$33 = !detailVisible(),
                _v$34 = {
                  editing: isEditing()
                };
              _v$33 !== _p$._v$33 && (_p$._v$33 = libs.setProp(_el$81, "visible", _v$33, _p$._v$33));
              _v$34 !== _p$._v$34 && (_p$._v$34 = libs.setProp(_el$81, "classList", _v$34, _p$._v$34));
              return _p$;
            }, {
              _v$33: undefined,
              _v$34: undefined
            });
            return _el$81;
          })(), libs.createComponent(libs.Show, {
            get when() {
              return detailVisible();
            },
            get children() {
              return currentConfig().renderFullDetail(detailSlotData, () => setDetailSlot(undefined));
            }
          })];
        }
      });
    }
  });
};
let targetPlayerID = () => undefined;
let targetSteamID = () => undefined;
let localSteamID = () => undefined;
let canEdit = () => false;
let playerInfo;
let playerInfoReady = () => false;
let playerInfoData = () => ({});
let showRoomData = () => ({});
let playerWeapons = () => ({});
let playerCouriers = () => ({});
let playerCosmetics = () => ({});
let rawPlayerEquipments = () => ({});
let playerCounters = () => ({});
let playerShowRoomLikes = () => ({});
let partFilter = () => 0;
let setPartFilter = () => 0;
let playerEquipments = () => ({});
let weaponItemList = () => [];
let courierItemList = () => [];
let cosmeticItemList = () => [];
let allEquipmentItemList = () => [];
let equipmentItemList = () => [];
let currentConfig = () => undefined;
function createShowRoomPageState() {
  targetPlayerID = libs.createMemo(() => {
    const target = jumpInfo()?.data?.playerID;
    return typeof target == "number" ? target : undefined;
  });
  targetSteamID = libs.createMemo(() => {
    const data = jumpInfo()?.data;
    const steamID = data?.steamID;
    if (typeof steamID == "number" || typeof steamID == "string") {
      return service_netdata_helper.getPlayerSteamID({
        steamID
      });
    }
    const steam64ID = data?.steam64ID;
    if (typeof steam64ID == "number" || typeof steam64ID == "string") {
      return service_netdata_helper.getPlayerSteamID({
        steam64ID
      });
    }
    return service_netdata_helper.getPlayerSteamID({
      playerID: targetPlayerID() ?? Players.GetLocalPlayer()
    });
  });
  localSteamID = libs.createMemo(() => service_netdata_helper.getPlayerSteamID({
    playerID: Players.GetLocalPlayer()
  }));
  canEdit = libs.createMemo(() => targetSteamID() != undefined && targetSteamID() == localSteamID());
  playerInfo = service_netdata_helper.GetPlayerInfo({
    steamID: targetSteamID
  });
  playerInfoReady = libs.createMemo(() => {
    const steamID = targetSteamID();
    const data = playerInfo.data();
    return !playerInfo.loading() && steamID != undefined && data != undefined && data.steamID == steamID;
  });
  playerInfoData = libs.createMemo(() => playerInfoReady() ? playerInfo.data() ?? {} : {});
  showRoomData = libs.createMemo(() => playerInfoData().player_show_rooms ?? {});
  playerWeapons = solid_utils.createServiceNetData("player_weapons", {});
  playerCouriers = solid_utils.createServiceNetData("player_couriers", {});
  playerCosmetics = solid_utils.createServiceNetData("player_cosmetics", {});
  rawPlayerEquipments = solid_utils.createServiceNetData("player_equipments", {});
  playerCounters = libs.createMemo(() => playerInfoData().player_counters ?? {});
  playerShowRoomLikes = solid_utils.createServiceNetData("player_show_room_likes", {});
  [partFilter, setPartFilter] = libs.createSignal(0);
  playerEquipments = libs.createMemo(() => {
    CustomUIConfig.EquipmentDetailCache ??= {};
    CustomUIConfig.EquipmentSimpleDataCache ??= {};
    const result = {};
    for (const key in rawPlayerEquipments()) {
      const parsed = equipment_utils.ParseEquipment(rawPlayerEquipments()[key], CustomUIConfig.EquipmentDetailCache[key]);
      if (parsed) {
        result[key] = parsed;
      }
    }
    CustomUIConfig.EquipmentSimpleDataCache = result;
    return result;
  });
  weaponItemList = libs.createMemo(() => {
    const listedItemIds = getListedItemIds("weapon", showRoomData);
    return Object.entries(playerWeapons()).filter(([_, v]) => v).map(([key, v]) => ({
      key,
      type: "weapon",
      id: v.weapon_id ?? Number(key),
      data: v
    })).sort((a, b) => compareShowRoomCollectionItems(a, b, listedItemIds, item => toFiniteNumber(KeyValues.weapon[item.id]?.rarity, 0), item => getShowRoomItemCreationTime(item, showRoomData)));
  });
  courierItemList = libs.createMemo(() => {
    const listedItemIds = getListedItemIds("courier", showRoomData);
    return Object.entries(playerCouriers()).filter(([_, v]) => v).map(([key, v]) => ({
      key,
      type: "courier",
      id: v.courier_id ?? Number(key),
      data: v
    })).sort((a, b) => compareShowRoomCollectionItems(a, b, listedItemIds, item => toFiniteNumber(KeyValues.service_courier[item.id]?.quality, 0), item => getShowRoomItemCreationTime(item, showRoomData)));
  });
  cosmeticItemList = libs.createMemo(() => {
    return Object.values(KeyValues.info_item_cosmetic).filter(cosmeticData => {
      return SHOW_ROOM_COSMETIC_TYPES.includes(cosmeticData.type) && cosmeticData.model != undefined && (cosmeticData.hide !== 1 || Game.IsInToolsMode()) && (cosmeticData.default === 1 || playerCosmetics()[String(cosmeticData.id)] != undefined);
    }).map(cosmeticData => {
      const id = cosmeticData.id;
      const serviceData = playerCosmetics()[String(id)] ?? {
        cosmetic_id: id,
        permanent: 1
      };
      return {
        key: String(id),
        type: "cosmetic",
        id,
        data: serviceData
      };
    }).sort((a, b) => multiCompare(toFiniteNumber(KeyValues.info_item_cosmetic[String(b.id)]?.rarity, 0) - toFiniteNumber(KeyValues.info_item_cosmetic[String(a.id)]?.rarity, 0), a.id - b.id));
  });
  allEquipmentItemList = libs.createMemo(() => {
    return Object.entries(playerEquipments()).filter(([_, v]) => v).map(([key, v]) => ({
      key,
      type: "equipment",
      id: v.id ?? Number(key),
      data: v
    })).sort((a, b) => multiCompare(b.data.rarity - a.data.rarity, b.data.class - a.data.class));
  });
  equipmentItemList = libs.createMemo(() => {
    const filter = partFilter();
    if (filter === 0) return allEquipmentItemList();
    return allEquipmentItemList().filter(item => item.data.equip_part === filter);
  });
  currentConfig = libs.createMemo(() => {
    switch (menuName()) {
      case "EquipmentShowRoom_Menu":
        return equipmentConfig;
      case "CourierShowRoom_Menu":
        return courierConfig;
      case "CosmeticShowRoom_Menu":
        return cosmeticConfig;
      case "WeaponShowRoom_Menu":
      default:
        return weaponConfig;
    }
  });
}
const getShowRoomEquipmentData = slotData => {
  const equipmentData = slotData?.equipment;
  if (equipmentData?.equipment_item_id != undefined) {
    return equipmentData;
  }
  if (!canEdit()) {
    return equipmentData;
  }
  const equipmentID = slotData?.id;
  if (equipmentID == undefined) {
    return equipmentData;
  }
  return playerEquipments()[String(equipmentID)] ?? equipmentData;
};
const weaponConfig = {
  showType: "weapon",
  itemList: () => weaponItemList(),
  itemChildConfig: {
    width: 84,
    height: 96,
    margin: 5
  },
  renderSlotItem: slotData => {
    const weaponId = libs.createMemo(() => slotData()?.weapon?.weapon_id ?? slotData()?.id ?? 0);
    return (() => {
      const _el$98 = libs.createElement("Panel", {
        "class": "ModelContainer"
      }, null);
      libs.insert(_el$98, libs.createComponent(solid_utils.DynamicKey, {
        key: weaponId,
        children: wid => libs.createComponent(libs.Show, {
          when: wid,
          get children() {
            return libs.createComponent(weapon3DPreview.Weapon3DPreview, {
              get model() {
                return KeyValues.weapon[wid].model;
              },
              get defaultConfig() {
                return KeyValues.weapon[wid].hero;
              }
            });
          }
        })
      }));
      return _el$98;
    })();
  },
  renderItemDetail: hoverItemID => libs.createComponent(WeaponItemDetail, {
    hoverItemID: hoverItemID,
    playerWeapons: playerWeapons
  }),
  renderStoreItemBlock: item => libs.createComponent(WeaponShowRoomStoreItem, {
    item: item
  }),
  renderFullDetail: (slotData, close) => libs.createComponent(WeaponShowRoomFullDetail, {
    slotData: slotData,
    close: close
  })
};
const courierConfig = {
  showType: "courier",
  itemList: () => courierItemList(),
  itemChildConfig: {
    width: 84,
    height: 96,
    margin: 5
  },
  renderSlotItem: slotData => {
    const courierId = libs.createMemo(() => slotData()?.courier?.courier_id ?? slotData()?.id ?? 0);
    return (() => {
      const _el$99 = libs.createElement("Panel", {
        "class": "ModelContainer Courier"
      }, null);
      libs.insert(_el$99, libs.createComponent(solid_utils.DynamicKey, {
        key: courierId,
        children: cid => libs.createComponent(libs.Show, {
          when: cid,
          get children() {
            return libs.createComponent(portraitsCourier.PortraitsCourier, {
              courier_id: cid,
              allowrotation: true
            });
          }
        })
      }));
      return _el$99;
    })();
  },
  renderItemDetail: hoverItemID => libs.createComponent(CourierItemDetail, {
    hoverItemID: hoverItemID,
    playerCouriers: playerCouriers
  }),
  renderStoreItemBlock: item => libs.createComponent(CourierShowRoomStoreItem, {
    item: item
  }),
  renderFullDetail: (slotData, close) => libs.createComponent(CourierShowRoomFullDetail, {
    slotData: slotData,
    close: close
  })
};
const EquipmentShowRoomStoreItem = props => {
  const level = libs.createMemo(() => props.item?.data?.level ?? 0);
  return (() => {
    const _el$100 = libs.createElement("Panel", {
      "class": "ShowRoomEquipmentStoreItem"
    }, null);
    libs.insert(_el$100, libs.createComponent(StoreItem.StoreItemBlock, {
      get item_id() {
        return libs.memo(() => !!props.item)() ? getItemDisplayId(props.item) : 0;
      },
      get uid() {
        return props.item?.type === "equipment" ? props.item.id : undefined;
      },
      get hideTips() {
        return props.hideTips;
      }
    }), null);
    libs.insert(_el$100, libs.createComponent(libs.Show, {
      get when() {
        return level() > 0;
      },
      get children() {
        const _el$101 = libs.createElement("Label", {
          id: "LevelLabel",
          get text() {
            return "+" + level();
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$101, "text", "+" + level(), _$p));
        return _el$101;
      }
    }), null);
    return _el$100;
  })();
};
const equipmentConfig = {
  showType: "equipment",
  itemList: () => equipmentItemList(),
  renderSlotItem: slotData => {
    const equipmentData = libs.createMemo(() => getShowRoomEquipmentData(slotData()));
    const equipItemId = libs.createMemo(() => equipmentData()?.equipment_item_id ?? 0);
    const showRoomEquipmentTooltip = () => {
      const equipment = equipmentData();
      if (equipment?.equipment_item_id == undefined) return undefined;
      return {
        name: "server_equip",
        data: JSON.stringify(equipment)
      };
    };
    return (() => {
      const _el$102 = libs.createElement("Panel", {
        "class": "ModelContainer"
      }, null);
      libs.insert(_el$102, libs.createComponent(solid_utils.DynamicKey, {
        key: equipItemId,
        children: itemId => libs.createComponent(libs.Show, {
          when: itemId,
          get children() {
            return libs.createComponent(server_equipment.EquipmentIcon, {
              equipment_item_id: itemId,
              get rarity() {
                return equipmentData()?.rarity ?? 0;
              }
            });
          }
        })
      }));
      libs.effect(_$p => libs.setProp(_el$102, "customTooltip", showRoomEquipmentTooltip(), _$p));
      return _el$102;
    })();
  },
  renderStoreItemBlock: item => libs.createComponent(EquipmentShowRoomStoreItem, {
    item: item
  }),
  renderFullDetail: (slotData, close) => libs.createComponent(EquipmentShowRoomFullDetail, {
    slotData: slotData,
    close: close
  }),
  renderExtraRightPanel: () => (() => {
    const _el$103 = libs.createElement("Panel", {
      id: "PartFilter"
    }, null);
    libs.insert(_el$103, libs.createComponent(libs.For, {
      get each() {
        return [0, ...equipment_utils.EQUIP_PARTS];
      },
      children: part => {
        return (() => {
          const _el$104 = libs.createElement("Button", {
              get id() {
                return part.toString();
              },
              get ["class"]() {
                return "PartTab" + (partFilter() === part ? " Selected" : "");
              }
            }, null),
            _el$105 = libs.createElement("Image", {
              id: "PartIcon",
              get src() {
                return getSrcPath(`conv/icon/${EQUIP_PART_ICON[part]}`);
              }
            }, _el$104);
          libs.setProp(_el$104, "onactivate", () => setPartFilter(part));
          libs.effect(_p$ => {
            const _v$35 = part.toString(),
              _v$36 = "PartTab" + (partFilter() === part ? " Selected" : ""),
              _v$37 = getSrcPath(`conv/icon/${EQUIP_PART_ICON[part]}`);
            _v$35 !== _p$._v$35 && (_p$._v$35 = libs.setProp(_el$104, "id", _v$35, _p$._v$35));
            _v$36 !== _p$._v$36 && (_p$._v$36 = libs.setProp(_el$104, "class", _v$36, _p$._v$36));
            _v$37 !== _p$._v$37 && (_p$._v$37 = libs.setProp(_el$105, "src", _v$37, _p$._v$37));
            return _p$;
          }, {
            _v$35: undefined,
            _v$36: undefined,
            _v$37: undefined
          });
          return _el$104;
        })();
      }
    }));
    return _el$103;
  })()
};
const cosmeticConfig = {
  showType: "cosmetic",
  itemList: () => cosmeticItemList(),
  renderSlotItem: slotData => {
    const cosmeticId = libs.createMemo(() => slotData()?.id ?? 0);
    const cosmeticTooltip = libs.createMemo(() => {
      const id = cosmeticId();
      if (!id) return undefined;
      const image = getSrcPath(`store_items/${id}.png`);
      return StoreItem.GetStoreItemImageTooltipData(id, image);
    });
    return (() => {
      const _el$106 = libs.createElement("Panel", {
        "class": "ModelContainer Cosmetic"
      }, null);
      libs.insert(_el$106, libs.createComponent(solid_utils.DynamicKey, {
        key: cosmeticId,
        children: id => libs.createComponent(libs.Show, {
          when: id,
          get children() {
            const _el$107 = libs.createElement("Image", {
              "class": "CosmeticImage",
              get src() {
                return getSrcPath(`store_items/${id}.png`);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$107, "src", getSrcPath(`store_items/${id}.png`), _$p));
            return _el$107;
          }
        })
      }));
      libs.effect(_$p => libs.setProp(_el$106, "customTooltip", cosmeticTooltip(), _$p));
      return _el$106;
    })();
  },
  renderFullDetail: (slotData, close) => libs.createComponent(CosmeticShowRoomFullDetail, {
    slotData: slotData,
    close: close
  })
};
function ShowRoomRoot() {
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(ShowRoomPage, {});
    }
  });
}
function ShowRoomPage() {
  createShowRoomPageState();
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "ShowRoomRoot",
    name: "MenuButton_show_room",
    renderOnShow: true,
    get show() {
      return show();
    },
    close: () => {
      JumpToMenu({
        window_name: "book",
        menu: "PlayerInfo_Menu",
        force: true,
        data: {
          playerID: targetPlayerID(),
          steamID: targetSteamID()
        }
      });
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(ShowRoomContent, {}), libs.createElement("DOTAParticleScenePanel", {
        id: "BGLight",
        particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
        cameraOrigin: "0 0 700",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null)];
    }
  });
}
libs.render(() => libs.createComponent(ShowRoomRoot, {}), $.GetContextPanel());