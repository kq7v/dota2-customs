--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('huntloot_details', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Loading = require('./EOM_Loading.js');
var solid_utils = require('./solid_utils.js');
var attribute_formatter = require('./attribute_formatter.js');
var server_huntloot = require('./server_huntloot2.js');
var equipment_utils = require('./equipment_utils.js');

const HUNTLOOT_PARTS = [1, 2, 3];
const MAX_HUNTLOOT_RARITY = 7;
const HuntlootSimplifyConfig = ["id", "huntloot_item_id", "level", "locked", "in_equip_suit", "in_check"];
let HuntlootEntryByName;
function GetHuntlootEntryConfig(entryID) {
  HuntlootEntryByName ??= Object.values(KeyValues.huntloot_entry ?? {}).reduce((res, row) => {
    res[row.entry_name] = row;
    return res;
  }, {});
  return HuntlootEntryByName[entryID];
}
function HuntlootAttributeRound(entryID, value) {
  const ratio = GetHuntlootEntryConfig(entryID)?.ratio ?? 1;
  return Round(value, ratio);
}
function GetHuntlootAttrDisplay(entry, entryType, options) {
  let id = entry.id;
  let displayData = entry;
  if (entryType === 3 && entry.id.startsWith("drawing_")) {
    id = entry.id.slice(8);
    displayData = {
      ...entry,
      id
    };
  }
  const kv = GetHuntlootEntryConfig(entry.id);
  return attribute_formatter.formatAttributeDisplay(displayData, {
    config: {
      ratio: kv?.ratio ?? 1,
      value_min: kv?.value_min,
      value_max: kv?.value_max
    },
    ...(entryType === 3 ? {
      attributeNameColor: "#958D83",
      attributeNameLocalize: "drawing_equip_attr"
    } : {}),
    showAttributeRange: options?.showAttributeRange,
    hideExtraValue: options?.hideExtraValue
  });
}
function FillHuntlootCfgData(data) {
  const kv = KeyValues.info_item_huntloot[data.huntloot_item_id];
  if (kv == undefined) return false;
  const classSetting = KeyValues.huntloot_class_setting[kv.class];
  data.class = kv.class;
  data.huntloot_part = kv.huntloot_part;
  data.rarity = kv.rarity;
  data.need_level = classSetting?.need_level ?? 0;
  return true;
}
function ParseHuntloot(serialized, copyData) {
  let result = {};
  HuntlootSimplifyConfig.forEach((k, i) => {
    result[k] = serialized[i];
    if (copyData) {
      copyData[k] = serialized[i];
    }
  });
  FillHuntlootCfgData(result);
  return result;
}
function GetSimplifyHuntloots(playerID = Game.GetLocalPlayerID()) {
  CustomUIConfig.HuntlootDetailCache ??= {};
  CustomUIConfig.HuntlootSimpleDataCache ??= {};
  const playerHuntloots = solid_utils.createServiceNetData("player_huntloots", {}, playerID);
  const equipSuits = solid_utils.createServiceNetData("player_hero_huntloot_equip_suits", {}, playerID);
  function Parse(huntloots, suits) {
    let res = {};
    for (const key in huntloots) {
      const data = huntloots[key];
      if (data == undefined || typeof data !== "object") continue;
      const cacheData = CustomUIConfig.HuntlootDetailCache[key];
      let parsed = ParseHuntloot(data, cacheData);
      if (parsed) {
        parsed.in_equip_suit = GetHuntlootEquippedSuits(parsed, suits).map(([heroID, suitID]) => `${heroID}:${suitID}`).join(";");
        if (cacheData) cacheData.in_equip_suit = parsed.in_equip_suit;
        res[key] = parsed;
      }
    }
    return res;
  }
  return libs.createMemo(() => {
    let simpleData = Parse(playerHuntloots(), equipSuits());
    CustomUIConfig.HuntlootSimpleDataCache = simpleData;
    return simpleData;
  });
}
function GetHuntlootDetail(ids, callback, force = false, debug) {
  CustomUIConfig.HuntlootDetailCache ??= {};
  let result = {};
  let requestIDs = force ? ids : ids.filter(id => {
    if (CustomUIConfig.HuntlootDetailCache[id]) {
      result[id] = CustomUIConfig.HuntlootDetailCache[id];
      return false;
    }
    return true;
  });
  if (requestIDs.length > 0) {
    return ServerRequest("get_huntloot_detail", {
      id: requestIDs.map(i => String(i))
    }, data => {
      debug?.("raw_response", data);
      for (let [id, v] of Object.entries(data)) {
        if (FillHuntlootCfgData(v)) {
          result[id] = v;
          CustomUIConfig.HuntlootDetailCache[id] = v;
        } else {
          debug?.("detail_rejected", {
            id,
            data: v,
            reason: "info_item_huntloot_missing",
            huntlootItemID: v.huntloot_item_id
          });
        }
      }
      callback(result);
    });
  } else {
    callback(result);
  }
}
function ShowServerHuntlootTooltip(p, props) {
  let ids = [props.id1];
  if (props.id2) {
    ids.push(props.id2);
  }
  GetHuntlootDetail(ids, () => {
    if (p.IsValid() && p.BHasHoverStyle()) {
      ShowCustomTooltip(p, "server_huntloot", {
        id1: props.id1,
        id2: props.id2,
        hero_id: props.hero_id
      });
    }
  }, props.force);
}
function GetHuntlootEquippedSuits(huntloot, equipSuits = getServiceNetData("player_hero_huntloot_equip_suits", Players.GetLocalPlayer()) ?? {}) {
  const result = [];
  if (huntloot.id <= 0) return result;
  for (const [heroID, suits] of Object.entries(equipSuits)) {
    for (const [suitID, parts] of Object.entries(suits)) {
      const equippedID = parts[huntloot.huntloot_part];
      if (equippedID != undefined && equippedID !== "nil" && String(equippedID) === String(huntloot.id)) {
        result.push([toFiniteNumber(heroID), toFiniteNumber(suitID)]);
      }
    }
  }
  return result;
}
function HuntlootIsEquiped(huntloot, heroID) {
  return GetHuntlootEquippedSuits(huntloot).some(([equippedHeroID]) => heroID == undefined || equippedHeroID === heroID);
}
function HuntlootHasStates(huntloot, showTips) {
  let state = "";
  if (HuntlootIsEquiped(huntloot)) {
    state = "#EquipmentError_1";
  }
  if (huntloot.locked) {
    state = "#EquipmentError_2";
  }
  if (huntloot.in_check && huntloot.in_check !== "") {
    state = "#EquipmentError_InCheck";
  }
  let hasState = state != "";
  if (showTips && hasState) {
    ErrorMessage(state);
  }
  return hasState;
}
function GetHuntlootName(huntloot) {
  const localizedName = GetLocalization(`#${huntloot.huntloot_item_id}`, "");
  if (localizedName != "") {
    return localizedName;
  }
  const kv = KeyValues.info_item_huntloot[huntloot.huntloot_item_id];
  const rarity = huntloot.rarity ?? kv?.rarity ?? 0;
  const part = huntloot.huntloot_part ?? kv?.huntloot_part ?? 0;
  return LocalizeWithVars("#Huntloot_DefaultName", {
    rarity,
    part: GetLocalization(`#Equipment_HuntlootPart_${part}`, "")
  });
}
function createHuntlootDetailSignal(id_signal) {
  const [huntlootData, setHuntlootData] = libs.createSignal();
  const [force, _forceFresh] = libs.createSignal(false);
  libs.createEffect(() => {
    force();
    let id = String(id_signal());
    setHuntlootData();
    if (id && id !== "undefined") {
      let request = GetHuntlootDetail([id], data => {
        setHuntlootData(data[id]);
      }, true);
      request && libs.onCleanup(() => CancelRequest(request));
    } else {
      setHuntlootData();
    }
  });
  return {
    huntlootData,
    forceFresh: () => {
      _forceFresh(b => !b);
    }
  };
}
function ParseHuntlootDevourCosts() {
  const rawValue = KeyValues.huntloot_common_setting?.huntloot_devour?.value ?? "";
  if (rawValue === "") {
    return [];
  }
  return rawValue.split("|").map(costText => {
    const [itemIDText, amountText] = costText.split(":");
    return {
      itemID: toFiniteNumber(itemIDText, 0),
      amount: toFiniteNumber(amountText, 0)
    };
  }).filter(cost => cost.itemID > 0 && cost.amount > 0);
}

function HuntlootTierIIEffect(props) {
  return libs.createComponent(libs.Show, {
    get when() {
      return libs.memo(() => props.enabled !== false)() && props.entryID.endsWith("damage_boost_2");
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "HuntlootTierIIEffect",
          hittest: false
        }, null);
        libs.createElement("Panel", {
          "class": "HuntlootTierIIFlow",
          hittest: false
        }, _el$);
        libs.createElement("Panel", {
          "class": "HuntlootTierIICore",
          hittest: false
        }, _el$);
      return _el$;
    }
  });
}

function ServerHuntlootDetail(props) {
  const [local, others] = libs.splitProps(props, ["data", "class"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("ServerHuntlootDetail", "ServerEquipDetail", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("ServerHuntlootDetail", "ServerEquipDetail", local.class);
      }
    }), true);
    libs.insert(_el$, () => libs.createMemo(() => {
      let data = props.data;
      if (data) {
        return libs.createComponent(ServerHuntlootDetailLoaded, data);
      }
      return libs.createComponent(EOM_Loading.EOM_Loading, {});
    }));
    return _el$;
  })();
}
function ServerHuntlootDetailLoaded(props) {
  const partDatas = solid_utils.createServiceNetData("player_huntloot_part_datas", {});
  const equipSuits = solid_utils.createServiceNetData("player_hero_huntloot_equip_suits", {});
  const huntlootData = () => props.data;
  const equippedData = libs.createMemo(() => GetHuntlootEquippedSuits(huntlootData(), equipSuits()));
  const equipped = () => equippedData().length > 0;
  const displayedAdverbEntries = libs.createMemo(() => {
    const entries = huntlootData().adverb_entry_data;
    if (!equipped()) return entries;
    const level = partDatas()[huntlootData().huntloot_part]?.level ?? 0;
    const bonus = KeyValues.huntloot_level_setting[level]?.adverb_bonus;
    if (!bonus) return entries;
    return entries.map(entry => ({
      ...entry,
      value: HuntlootAttributeRound(entry.id, (entry.base_value ?? entry.value) + (entry.base_value ?? entry.value) * bonus)
    }));
  });
  const canWear = () => {
    const heroLv = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
    return heroLv >= huntlootData().need_level;
  };
  const compareAdverbMap = libs.createMemo(() => {
    const compare = props.compareData;
    if (!compare) return undefined;
    const map = {};
    compare.adverb_entry_data.forEach(entry => {
      map[entry.id] = entry.base_value ?? entry.value;
    });
    return map;
  });
  const displayName = libs.createMemo(() => {
    let nameStr = GetHuntlootName(huntlootData());
    if (huntlootData().level > 0) {
      nameStr = nameStr.concat(`+${huntlootData().level}`);
    }
    return nameStr;
  });
  const featureText = libs.createMemo(() => {
    const data = huntlootData();
    const propertyLines = new Set();
    const tags = new Set();
    const displayDiagnostics = [...data.adverb_entry_data.map(entry => ({
      entry,
      entryType: 2
    })), ...data.spell_entry_data.map(entry => ({
      entry,
      entryType: 3
    }))].map(({
      entry,
      entryType
    }) => {
      const collected = CollectLocalizationFeatureTags(() => GetHuntlootAttrDisplay(entry, entryType, {
        showAttributeRange: false
      }));
      collected.tags.forEach(tag => tags.add(tag));
      return {
        id: entry.id,
        entryType,
        nameHtml: collected.result.nameHtml,
        tags: collected.tags
      };
    });
    const entries = [...data.adverb_entry_data.map(entry => entry.id), ...data.spell_entry_data.map(entry => entry.id.startsWith("drawing_") ? entry.id.slice(8) : entry.id)];
    for (const id of new Set(entries)) {
      const collected = CollectLocalizationFeatureTags(() => {
        const name = GetLocalization(`#property_${id}`, "").replace("%", "");
        GetLocalization(`#DOTA_Tooltip_ability_${id}`, "");
        const description = GetLocalization(`#property_${id}_description`, "");
        return {
          name,
          description
        };
      });
      collected.tags.forEach(tag => tags.add(tag));
      if (collected.result.name && collected.result.description) {
        propertyLines.add(LocalizeWithVars("#Huntloot_FeatureDescription", collected.result));
      }
    }
    const featureLines = new Set();
    const featureDiagnostics = [];
    for (const tag of tags) {
      const collected = CollectLocalizationFeatureTags(() => ({
        name: GetLocalization(`#feature_${tag}`, ""),
        description: GetLocalization(`#feature_${tag}_description`, "")
      }));
      collected.tags.forEach(nestedTag => tags.add(nestedTag));
      featureDiagnostics.push({
        tag,
        ...collected.result
      });
      if (collected.result.name && collected.result.description) {
        featureLines.add(LocalizeWithVars("#Huntloot_FeatureDescription", collected.result));
      }
    }
    const lines = [...featureLines, ...propertyLines];
    console.log(`[HuntlootDetails] features: ${JSON.stringify({
      id: data.id,
      displays: displayDiagnostics,
      features: featureDiagnostics,
      lines
    })}`);
    return lines;
  });
  return (() => {
    const _el$2 = libs.createElement("Panel", {
        id: "ServerEquipDetailLoaded",
        get ["class"]() {
          return libs.classNames("TipsRarity" + huntlootData().rarity, {
            UnableWear: !canWear()
          });
        }
      }, null),
      _el$3 = libs.createElement("Panel", {
        id: "Top"
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "EquipmentInfo"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "TopLeft"
      }, _el$3),
      _el$6 = libs.createElement("Label", {
        id: "Name",
        get text() {
          return displayName();
        }
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        id: "OtherInfo"
      }, _el$5),
      _el$8 = libs.createElement("Label", {
        id: "EquipNeedLevel",
        "class": "TopLabel",
        get text() {
          return LocalizeWithVars("#Huntloot_NeedLevel", {
            level: canWear() ? huntlootData().need_level.toString() : ToColor(huntlootData().need_level.toString(), "#E55043")
          });
        },
        html: true
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        id: "AttrList"
      }, _el$2),
      _el$10 = libs.createElement("Panel", {
        id: "Bottom"
      }, _el$2),
      _el$11 = libs.createElement("Panel", {
        id: "FeatureLabelContainer"
      }, _el$10);
    libs.insert(_el$4, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(huntlootData)));
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return displayedAdverbEntries().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return displayedAdverbEntries();
          },
          children: data => libs.createComponent(HuntlootAttrRow, {
            get data() {
              return data();
            },
            get compareMap() {
              return compareAdverbMap();
            },
            get hideExtraValue() {
              return props.hideExtraValue;
            }
          })
        })];
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return huntlootData().spell_entry_data.length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return huntlootData().spell_entry_data;
          },
          children: data => libs.createComponent(HuntlootSpellRow, {
            get data() {
              return data();
            },
            highlightTierII: true
          })
        })];
      }
    }), null);
    libs.insert(_el$11, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return featureText();
          },
          children: text => (() => {
            const _el$22 = libs.createElement("Label", {
              id: "FeatureLabel",
              get text() {
                return text();
              },
              html: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$22, "text", text(), _$p));
            return _el$22;
          })()
        })];
      }
    }));
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return equipped();
      },
      get children() {
        const _el$13 = libs.createElement("Panel", {
            id: "EquipedInfoContainer"
          }, null);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$13);
          const _el$15 = libs.createElement("Label", {
            id: "EquipedTips",
            get text() {
              return GetLocalization("#EquipedTips");
            }
          }, _el$13),
          _el$16 = libs.createElement("Panel", {
            id: "EquipedInfo"
          }, _el$13);
        libs.insert(_el$16, libs.createComponent(libs.For, {
          get each() {
            return equippedData();
          },
          children: ([heroID, suitID]) => (() => {
            const _el$23 = libs.createElement("Panel", {
                "class": "EquipState"
              }, null),
              _el$24 = libs.createElement("Image", {
                "class": "HeroSmallAvatar",
                get src() {
                  return `s2r://panorama/images/heroes/icons/${equipment_utils.HeroID2Name[heroID]}_png.vtex`;
                }
              }, _el$23),
              _el$25 = libs.createElement("Label", {
                id: "EquipSuit",
                vars: {
                  value: suitID
                },
                text: "#EquipmentSuitType"
              }, _el$23);
            libs.setProp(_el$25, "vars", {
              value: suitID
            });
            libs.effect(_$p => libs.setProp(_el$24, "src", `s2r://panorama/images/heroes/icons/${equipment_utils.HeroID2Name[heroID]}_png.vtex`, _$p));
            return _el$23;
          })()
        }));
        libs.effect(_$p => libs.setProp(_el$15, "text", GetLocalization("#EquipedTips"), _$p));
        return _el$13;
      }
    }), null);
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        const _el$17 = libs.createElement("Panel", {
            id: "ALTTipsContainer",
            width: "100%"
          }, null);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$17);
          const _el$19 = libs.createElement("Panel", {
            id: "ModeDetailsTips"
          }, _el$17),
          _el$20 = libs.createElement("Label", {
            id: "Tips",
            get text() {
              return GetLocalization("#EquipmentTips_Details");
            }
          }, _el$19);
          libs.createElement("Label", {
            id: "Hotkey",
            text: "ALT"
          }, _el$19);
        libs.setProp(_el$17, "width", "100%");
        libs.effect(_$p => libs.setProp(_el$20, "text", GetLocalization("#EquipmentTips_Details"), _$p));
        return _el$17;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames("TipsRarity" + huntlootData().rarity, {
          UnableWear: !canWear()
        }),
        _v$2 = displayName(),
        _v$3 = LocalizeWithVars("#Huntloot_NeedLevel", {
          level: canWear() ? huntlootData().need_level.toString() : ToColor(huntlootData().need_level.toString(), "#E55043")
        });
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$2;
  })();
}
function HuntlootAttrRow(props) {
  const info = libs.createMemo(() => GetHuntlootAttrDisplay(props.data, 2, {
    showAttributeRange: props.showAttributeRange,
    hideExtraValue: props.compareMap != undefined || props.hideExtraValue
  }));
  const isUp = () => {
    if (!props.compareMap) return undefined;
    const compareValue = props.compareMap[props.data.id];
    if (compareValue === undefined) return undefined;
    const baseValue = props.data.base_value ?? props.data.value;
    if (baseValue === compareValue) return undefined;
    return baseValue > compareValue;
  };
  return (() => {
    const _el$26 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("HuntlootTooltipAttrRow EquipmentAttrRow Adverb", info()?.colorName, {
            WithDifficulty: props.data.class != undefined
          });
        }
      }, null);
      libs.createElement("Panel", {
        id: "Point"
      }, _el$26);
      const _el$28 = libs.createElement("Label", {
        id: "AttrValue",
        get text() {
          return info()?.valueText ?? "";
        },
        html: true
      }, _el$26),
      _el$29 = libs.createElement("Label", {
        id: "AttrName",
        get text() {
          return info()?.nameHtml ?? "";
        },
        html: true
      }, _el$26);
    libs.insert(_el$26, libs.createComponent(HuntlootTierIIEffect, {
      get entryID() {
        return props.data.id;
      }
    }), _el$29);
    libs.insert(_el$26, libs.createComponent(libs.Show, {
      get when() {
        return isUp() !== undefined;
      },
      get children() {
        const _el$30 = libs.createElement("Panel", {
          id: "CompareTag",
          get ["class"]() {
            return libs.classNames({
              Up: isUp()
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$30, "class", libs.classNames({
          Up: isUp()
        }), _$p));
        return _el$30;
      }
    }), null);
    libs.insert(_el$26, libs.createComponent(libs.Show, {
      get when() {
        return props.data.class != undefined;
      },
      get children() {
        const _el$31 = libs.createElement("Label", {
          "class": "AttrDifficulty",
          get text() {
            return LocalizeWithVars("#Huntloot_EntryDifficulty", {
              difficulty: props.data.class
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$31, "text", LocalizeWithVars("#Huntloot_EntryDifficulty", {
          difficulty: props.data.class
        }), _$p));
        return _el$31;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = libs.classNames("HuntlootTooltipAttrRow EquipmentAttrRow Adverb", info()?.colorName, {
          WithDifficulty: props.data.class != undefined
        }),
        _v$5 = info()?.valueText ?? "",
        _v$6 = info()?.nameHtml ?? "";
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$26, "class", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$28, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$29, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$26;
  })();
}
function HuntlootSpellRow(props) {
  const info = libs.createMemo(() => GetHuntlootAttrDisplay(props.data, 3, {
    showAttributeRange: props.showAttributeRange
  }));
  return (() => {
    const _el$32 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("HuntlootTooltipAttrRow DrawingAttrRow EquipmentAttrRow Adverb", info()?.colorName, {
            WithDifficulty: props.data.class != undefined
          });
        }
      }, null);
      libs.createElement("Panel", {
        id: "Point"
      }, _el$32);
      const _el$34 = libs.createElement("Label", {
        id: "AttrValue",
        get text() {
          return info()?.valueText ?? "";
        },
        html: true
      }, _el$32),
      _el$35 = libs.createElement("Label", {
        id: "AttrName",
        get text() {
          return info()?.nameHtml ?? "";
        },
        html: true
      }, _el$32);
    libs.insert(_el$32, libs.createComponent(HuntlootTierIIEffect, {
      get entryID() {
        return props.data.id;
      },
      get enabled() {
        return props.highlightTierII === true;
      }
    }), _el$35);
    libs.insert(_el$32, libs.createComponent(libs.Show, {
      get when() {
        return props.data.class != undefined;
      },
      get children() {
        const _el$36 = libs.createElement("Label", {
          "class": "AttrDifficulty",
          get text() {
            return LocalizeWithVars("#Huntloot_EntryDifficulty", {
              difficulty: props.data.class
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$36, "text", LocalizeWithVars("#Huntloot_EntryDifficulty", {
          difficulty: props.data.class
        }), _$p));
        return _el$36;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$7 = libs.classNames("HuntlootTooltipAttrRow DrawingAttrRow EquipmentAttrRow Adverb", info()?.colorName, {
          WithDifficulty: props.data.class != undefined
        }),
        _v$8 = info()?.valueText ?? "",
        _v$9 = info()?.nameHtml ?? "";
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$32, "class", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$34, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$35, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$32;
  })();
}

exports.GetHuntlootAttrDisplay = GetHuntlootAttrDisplay;
exports.GetHuntlootDetail = GetHuntlootDetail;
exports.GetHuntlootName = GetHuntlootName;
exports.GetSimplifyHuntloots = GetSimplifyHuntloots;
exports.HUNTLOOT_PARTS = HUNTLOOT_PARTS;
exports.HuntlootAttributeRound = HuntlootAttributeRound;
exports.HuntlootHasStates = HuntlootHasStates;
exports.HuntlootIsEquiped = HuntlootIsEquiped;
exports.HuntlootSpellRow = HuntlootSpellRow;
exports.HuntlootTierIIEffect = HuntlootTierIIEffect;
exports.MAX_HUNTLOOT_RARITY = MAX_HUNTLOOT_RARITY;
exports.ParseHuntlootDevourCosts = ParseHuntlootDevourCosts;
exports.ServerHuntlootDetail = ServerHuntlootDetail;
exports.ShowServerHuntlootTooltip = ShowServerHuntlootTooltip;
exports.createHuntlootDetailSignal = createHuntlootDetailSignal;