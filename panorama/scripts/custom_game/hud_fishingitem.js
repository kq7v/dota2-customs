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
var EOM_CostLabel = require('./EOM_CostLabel.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
var EOM_CheckBox = require('./EOM_CheckBox.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_FilterChip = require('./EOM_FilterChip.js');
var EOM_SearchBox = require('./EOM_SearchBox.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');
var global_selection = require('./global_selection.js');
var courier_card = require('./courier_card.js');
var EOM_SectionDivider = require('./EOM_SectionDivider.js');
var fishRod3DPreview = require('./fishRod3DPreview.js');
var RecycleView = require('./RecycleView.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var equipment_comp = require('./equipment_comp.js');
var courier_explore_preview = require('./courier_explore_preview.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const COLLECTION_TYPE = "fish";
const collectionTypeList = {};
Object.entries(KeyValues.collection).forEach(([, data]) => {
  if (Number(data.hide ?? 0) === 1) return;
  const rarity = GetServiceItemRarity(data.id);
  collectionTypeList[data.type] ??= {};
  collectionTypeList[data.type][rarity] ??= [];
  collectionTypeList[data.type][rarity].push(data);
});
function getFirstVisibleFishCollectionID() {
  const collectionList = collectionTypeList[COLLECTION_TYPE] ?? {};
  const rarityList = Object.keys(collectionList).map(rarity => Number(rarity)).sort((a, b) => b - a);
  for (const rarity of rarityList) {
    const collection = collectionList[String(rarity)]?.[0];
    if (collection != undefined) return collection.id.toString();
  }
  return "";
}
const FishCollection = () => {
  const player_collections = solid_utils.createServiceNetData("player_collections", {});
  const collectionList = libs.createMemo(() => {
    return collectionTypeList[COLLECTION_TYPE] ?? {};
  });
  const [selectedID, SetSelectedID] = libs.createSignal(getFirstVisibleFishCollectionID());
  libs.createEffect(() => {
    const rarityList = Object.keys(collectionList()).map(rarity => Number(rarity));
    if (rarityList.length <= 0) return;
    const maxRarity = Math.max(...rarityList);
    const targetCollection = collectionList()[String(maxRarity)]?.[0];
    if (targetCollection) {
      SetSelectedID(targetCollection.id.toString());
    }
  });
  const selectedData = libs.createMemo(() => KeyValues.collection[selectedID()]);
  const selectedItemRarity = libs.createMemo(() => GetServiceItemRarity(selectedID()));
  const selectedLevelUpConfig = libs.createMemo(() => {
    return KeyValues.collection_level_up[COLLECTION_TYPE]?.[String(selectedItemRarity())] ?? {};
  });
  const viewCollectionData = libs.createMemo(() => player_collections()[selectedID()] ?? {
    collection_id: selectedID(),
    extra_exp: 0,
    level: 0,
    collection_type: COLLECTION_TYPE
  });
  const getAttributeValue = (value, multiplier) => Float(Math.round(toFiniteNumber(value, 0) * multiplier * 1000000) / 1000000);
  const getAttributeText = multiplier => Object.entries(selectedData().attribute).map(([attribute, value]) => GetPropertyLocalization(attribute, getAttributeValue(value, multiplier))).join("<br>");
  const currentAttributeText = libs.createMemo(() => getAttributeText(viewCollectionData().level));
  const nextAttributeText = libs.createMemo(() => getAttributeText(1));
  const maxLevel = () => Object.keys(selectedLevelUpConfig()).length;
  const maxExp = libs.createMemo(() => {
    return selectedLevelUpConfig()[String(viewCollectionData().level)]?.level_cost;
  });
  const isMax = libs.createMemo(() => {
    return viewCollectionData().level >= maxLevel();
  });
  const canLevelUp = libs.createMemo(() => {
    return Boolean(maxExp()) && viewCollectionData().extra_exp >= maxExp();
  });
  const getFirstUpgradeableCollection = () => {
    for (const [rarity, collections] of Object.entries(collectionList())) {
      const rarityLevelConfig = KeyValues.collection_level_up[COLLECTION_TYPE]?.[rarity] ?? {};
      for (const collection of collections) {
        const collectionData = player_collections()[collection.id];
        if (collectionData == undefined) continue;
        const levelCost = rarityLevelConfig[String(collectionData.level)]?.level_cost;
        if (Boolean(levelCost) && collectionData.extra_exp >= levelCost) {
          return collection;
        }
      }
    }
    return undefined;
  };
  const anyCanLevelUp = libs.createMemo(() => {
    return getFirstUpgradeableCollection() != undefined;
  });
  const collectionCardRefs = {};
  let firstUpgradeableCollectionScrollSchedule;
  let hasScrolledToFirstUpgradeableCollection = false;
  libs.createEffect(() => {
    if (hasScrolledToFirstUpgradeableCollection || firstUpgradeableCollectionScrollSchedule != undefined) return;
    if (getFirstUpgradeableCollection() == undefined) return;
    firstUpgradeableCollectionScrollSchedule = $.Schedule(0, () => {
      firstUpgradeableCollectionScrollSchedule = undefined;
      const firstUpgradeableCollection = getFirstUpgradeableCollection();
      if (firstUpgradeableCollection == undefined) return;
      const collectionID = String(firstUpgradeableCollection.id);
      SetSelectedID(collectionID);
      const collectionCard = collectionCardRefs[collectionID];
      if (!collectionCard?.IsValid()) return;
      collectionCard.ScrollParentToMakePanelFit(3, true);
      hasScrolledToFirstUpgradeableCollection = true;
    });
  });
  libs.onCleanup(() => {
    if (firstUpgradeableCollectionScrollSchedule == undefined) return;
    try {
      $.CancelScheduled(firstUpgradeableCollectionScrollSchedule);
    } catch (error) {}
  });
  const [requesting, SetRequesting] = libs.createSignal(false);
  let refImageBg;
  function ShowLevelupFx() {
    if (!refImageBg?.IsValid()) return;
    $.CreatePanel("DOTAParticleScenePanel", refImageBg, "LevelupFx", {
      particleName: "particles/ui/game/ui_game_falling_star_01.vpcf",
      cameraOrigin: "0 0 256",
      lookAt: "0 0 0",
      squarePixels: true,
      fov: 90,
      hittest: false
    }).DeleteAsync(3);
    Game.EmitSound("ui.npe_badge");
  }
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Collection",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "CollectionBlock"
        }, null),
        _el$3 = libs.createElement("Panel", {
          id: "CollectionBG",
          hittest: false
        }, _el$),
        _el$4 = libs.createElement("Panel", {
          id: "CollectionDetail",
          get ["class"]() {
            return libs.classNames({
              HideAccess: viewCollectionData().level > 0 || isMax()
            });
          }
        }, _el$),
        _el$5 = libs.createElement("Label", {
          id: "CollectionName",
          get text() {
            return "#" + selectedID();
          },
          get ["class"]() {
            return "Rarity" + selectedItemRarity();
          }
        }, _el$4),
        _el$6 = libs.createElement("Panel", {
          id: "CollectionImageBG"
        }, _el$4),
        _el$7 = libs.createElement("Label", {
          id: "CollectionLevel",
          get text() {
            return isMax() ? "#Collection_LevelMax" : "#Collection_Level";
          },
          get vars() {
            return {
              level: viewCollectionData().level,
              max_level: maxLevel()
            };
          }
        }, _el$4),
        _el$8 = libs.createElement("Panel", {
          id: "CollectionExpBar"
        }, _el$4),
        _el$9 = libs.createElement("Panel", {
          id: "CollectionExpFill",
          get width() {
            return 392 * toFiniteNumber(viewCollectionData().level / maxLevel(), 0) + "px";
          }
        }, _el$8),
        _el$0 = libs.createElement("Panel", {
          id: "CollectionEffectBlock"
        }, _el$4),
        _el$10 = libs.createElement("Panel", {
          id: "CollectionNextBlock"
        }, _el$0),
        _el$11 = libs.createElement("Label", {
          id: "CollectionNextTitle",
          get text() {
            return viewCollectionData().level === 0 ? "#Essence_UnlockEffect" : "#Essence_NextLevelEffect";
          }
        }, _el$10),
        _el$12 = libs.createElement("Label", {
          id: "CollectionNext",
          html: true,
          get text() {
            return nextAttributeText();
          }
        }, _el$10),
        _el$13 = libs.createElement("Panel", {
          id: "AccessDivider"
        }, _el$4);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$13);
        libs.createElement("Label", {
          id: "AccessTitle",
          text: "#Collection_Access"
        }, _el$13);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$13);
        const _el$17 = libs.createElement("Label", {
          id: "AccessDesc",
          get text() {
            return GetLocalization(`#${selectedID()}_Access`);
          }
        }, _el$4),
        _el$18 = libs.createElement("Panel", {
          id: "CollectionListBlock"
        }, _el$),
        _el$19 = libs.createElement("Panel", {
          id: "CollectionList",
          scroll: "y"
        }, _el$18);
      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "JumpToAquarium",
        onactivate: () => JumpToMenu({
          window_name: "aquarium",
          menu: "Aquarium_Menu",
          force: true
        }),
        get children() {
          return libs.createElement("Label", {
            text: "#Aquarium"
          }, null);
        }
      }), _el$3);
      const _ref$ = refImageBg;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$6) : refImageBg = _el$6;
      libs.insert(_el$6, libs.createComponent(StoreItem.StoreItemImage, {
        id: "CollectionIcon",
        get itemid() {
          return selectedID();
        }
      }));
      libs.insert(_el$0, libs.createComponent(libs.Show, {
        get when() {
          return currentAttributeText();
        },
        get children() {
          const _el$1 = libs.createElement("Label", {
            id: "CollectionCurrent",
            html: true,
            get text() {
              return currentAttributeText();
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$1, "text", currentAttributeText(), _$p));
          return _el$1;
        }
      }), _el$10);
      libs.insert(_el$4, libs.createComponent(libs.Show, {
        get when() {
          return !isMax();
        },
        get children() {
          return [libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return selectedID();
            },
            get amounts() {
              return viewCollectionData().extra_exp;
            }
          }), libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
            id: "UpgradeCost",
            get have() {
              return viewCollectionData().extra_exp;
            },
            get cost() {
              return maxExp();
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "UpgradeBtn",
            text: "#Collection_UpgradeBtn",
            color: "Confirm",
            get visible() {
              return canLevelUp() || viewCollectionData().level > 0 && !isMax();
            },
            get enabled() {
              return libs.memo(() => !!!requesting())() && canLevelUp();
            },
            onactivate: () => {
              if (requesting()) return;
              if (!canLevelUp()) return;
              SetRequesting(true);
              CallActionRequest("/v1/collection/levelup", {
                collection_id: toFiniteNumber(selectedID())
              }, () => {
                SetRequesting(false);
                ShowLevelupFx();
              });
            }
          })];
        }
      }), null);
      libs.setProp(_el$19, "scroll", "y");
      libs.insert(_el$19, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(collectionList()).sort((a, b) => Number(b) - Number(a));
        },
        children: rarity => [(() => {
          const _el$20 = libs.createElement("Panel", {
              "class": "CollectionRarityTitle Rarity" + rarity
            }, null),
            _el$21 = libs.createElement("Label", {
              "class": "RarityTitle",
              text: `#Collection_Rarity_${COLLECTION_TYPE}${rarity}`
            }, _el$20);
          libs.setProp(_el$20, "class", "CollectionRarityTitle Rarity" + rarity);
          libs.setProp(_el$21, "text", `#Collection_Rarity_${COLLECTION_TYPE}${rarity}`);
          return _el$20;
        })(), libs.createComponent(libs.For, {
          get each() {
            return collectionList()[rarity];
          },
          children: ({
            id
          }) => {
            const collectionData = () => player_collections()[id] ?? {
              collection_id: id,
              extra_exp: 0,
              level: 0,
              collection_type: COLLECTION_TYPE
            };
            const rarityLevelConfig = () => KeyValues.collection_level_up[COLLECTION_TYPE]?.[String(rarity)] ?? {};
            const currentMaxExp = () => rarityLevelConfig()[String(collectionData().level)]?.level_cost;
            const currentCanLevelUp = () => Boolean(currentMaxExp()) && collectionData().extra_exp >= currentMaxExp();
            const isCurrentMax = () => collectionData().level >= maxLevel();
            return (() => {
              const _el$22 = libs.createElement("Panel", {
                  "class": "CollectionCard"
                }, null),
                _el$24 = libs.createElement("Panel", {
                  id: "CardBG"
                }, _el$22),
                _el$25 = libs.createElement("Label", {
                  id: "Name",
                  text: "#" + id
                }, _el$22);
                libs.createElement("Image", {
                  id: "LockIcon",
                  hittest: false
                }, _el$22);
                libs.createElement("Panel", {
                  id: "SelectedHover",
                  hittest: false
                }, _el$22);
                const _el$28 = libs.createElement("Label", {
                  id: "CollectionLevel",
                  get text() {
                    return "Lv." + collectionData().level + (isCurrentMax() ? "(MAX)" : "");
                  }
                }, _el$22);
              libs.use(panel => {
                collectionCardRefs[String(id)] = panel;
              }, _el$22);
              libs.setProp(_el$22, "onactivate", () => SetSelectedID(String(id)));
              libs.insert(_el$22, libs.createComponent(libs.Show, {
                get when() {
                  return selectedID() == String(id);
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
              }), _el$24);
              libs.insert(_el$22, libs.createComponent(StoreItem.StoreItemImage, {
                id: "CollectionIcon",
                itemid: id
              }), _el$25);
              libs.setProp(_el$25, "text", "#" + id);
              libs.insert(_el$22, libs.createComponent(libs.Show, {
                get when() {
                  return currentCanLevelUp();
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    align: "right top"
                  });
                }
              }), null);
              libs.effect(_p$ => {
                const _v$10 = {
                    ["Rarity" + rarity]: true,
                    Lock: collectionData().level == 0,
                    Selected: selectedID() == String(id)
                  },
                  _v$11 = {
                    Max: isCurrentMax()
                  },
                  _v$12 = collectionData().level > 0,
                  _v$13 = "Lv." + collectionData().level + (isCurrentMax() ? "(MAX)" : "");
                _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$22, "classList", _v$10, _p$._v$10));
                _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$28, "classList", _v$11, _p$._v$11));
                _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$28, "visible", _v$12, _p$._v$12));
                _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$28, "text", _v$13, _p$._v$13));
                return _p$;
              }, {
                _v$10: undefined,
                _v$11: undefined,
                _v$12: undefined,
                _v$13: undefined
              });
              return _el$22;
            })();
          }
        })]
      }));
      libs.insert(_el$18, libs.createComponent(EOM_Button.EOM_Button, {
        id: "BatchUpgradeBtn",
        text: "#TreasureFastUpgradeBtn",
        color: "Gold",
        get enabled() {
          return libs.memo(() => !!!requesting())() && anyCanLevelUp();
        },
        onactivate: () => {
          if (requesting()) return;
          if (!anyCanLevelUp()) return;
          SetRequesting(true);
          CallActionRequest("/v1/collection/levelup", {
            collection_id: 0,
            collection_type: COLLECTION_TYPE
          }, () => {
            SetRequesting(false);
            ShowLevelupFx();
          });
        }
      }), null);
      libs.effect(_p$ => {
        const _v$ = libs.classNames({
            HideAccess: viewCollectionData().level > 0 || isMax()
          }),
          _v$2 = "#" + selectedID(),
          _v$3 = "Rarity" + selectedItemRarity(),
          _v$4 = isMax() ? "#Collection_LevelMax" : "#Collection_Level",
          _v$5 = {
            Max: isMax()
          },
          _v$6 = {
            level: viewCollectionData().level,
            max_level: maxLevel()
          },
          _v$7 = 392 * toFiniteNumber(viewCollectionData().level / maxLevel(), 0) + "px",
          _v$8 = nextAttributeText() != "",
          _v$9 = viewCollectionData().level === 0 ? "#Essence_UnlockEffect" : "#Essence_NextLevelEffect",
          _v$0 = nextAttributeText(),
          _v$1 = GetLocalization(`#${selectedID()}_Access`);
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "class", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$7, "classList", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$7, "vars", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$9, "width", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$10, "visible", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$11, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$12, "text", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$17, "text", _v$1, _p$._v$1));
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
        _v$1: undefined
      });
      return _el$;
    }
  });
};

const rarityTabs = [{
  label: "#FishingBag_Filter_All",
  filter: "all",
  dotColor: "#8aa4c4"
}, {
  label: "#FishingBag_Filter_Mythic",
  filter: 6,
  dotColor: "#E55043"
}, {
  label: "#FishingBag_Filter_Legendary",
  filter: 5,
  dotColor: "#f3b664"
}, {
  label: "#FishingBag_Filter_Epic",
  filter: 4,
  dotColor: "#b484ff"
}, {
  label: "#FishingBag_Filter_Rare",
  filter: 3,
  dotColor: "#66b5ff"
}, {
  label: "#FishingBag_Filter_Good",
  filter: 2,
  dotColor: "#79d19a"
}, {
  label: "#FishingBag_Filter_Common",
  filter: 1,
  dotColor: "#8aa4c4"
}, {
  label: "#Aquarium",
  filter: "aquarium",
  dotColor: "#59d0d5"
}];
const autoSellRarityTabs = rarityTabs.filter(tab => typeof tab.filter === "number").slice().reverse();
const autoSellStarOptions = [1, 2, 3, 4, 5];
const MAX_STAR_COUNT = 5;
const FISH_PRICE_TOKEN_ID = 110003;
const FISHING_BAG_KEY_TYPE = "fishing_bag";
const FISHING_BAG_AUTO_SELL_ENABLED_KEY = "fishing_bag_auto_sell_enabled";
const FISHING_BAG_AUTO_SELL_CONFIG_KEY = "fishing_bag_auto_sell_config";
const DEFAULT_FISHING_BAG_AUTO_SELL_CONFIG = {
  rarities: [],
  stars: [],
  keepMinEnabled: false,
  keepMinCount: 1
};
const getFishingRodItemID = rodLevel => `rod_level${Number(rodLevel ?? 0)}`;
const normalizeItemIDList = value => {
  return Object.values(value ?? {}).map(itemID => Number(itemID) || 0).filter(itemID => itemID > 0);
};
const getFishStarCount = weight => {
  if (weight === undefined) {
    return 1;
  }
  const normalizedWeight = Math.max(0, Math.min(100, weight));
  if (normalizedWeight <= 0) {
    return 1;
  }
  return Math.min(MAX_STAR_COUNT, Math.ceil(normalizedWeight / 20));
};
const getMappedStatValue = (weight, min, max) => {
  if (min === undefined || max === undefined) {
    return "-";
  }
  const normalizedWeight = Math.max(0, Math.min(100, weight ?? 0));
  const mappedValue = min + (max - min) * normalizedWeight / 100;
  return String(Round(mappedValue, 1));
};
const getMappedStatNumericValue = (weight, min, max) => {
  if (min === undefined || max === undefined) {
    return undefined;
  }
  const normalizedWeight = Math.max(0, Math.min(100, weight ?? 0));
  return min + (max - min) * normalizedWeight / 100;
};
const formatNumber = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const normalizeNumericText = value => value.replace(/\D/g, "");
const getAutoSellEnabledFromText = value => value === "1";
const getStatRangeText = (min, max, unit) => {
  if (min === undefined || max === undefined) {
    return "-";
  }
  return `${min}-${max}${unit}`;
};
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
const getFishSellPrice = prices => formatNumber(getFishSellPriceValue(prices));
const isFishSellable = fishData => fishData?.show !== true;
const getSelectedFishIDList = selectedFishMap => {
  return Object.keys(selectedFishMap).map(fishID => Number(fishID)).filter(fishID => fishID > 0);
};
const getFishLocalizedName = fishItemID => {
  if (fishItemID === undefined) {
    return "";
  }
  return GetLocalization(`Normal_${fishItemID}`, "");
};
const getFishActualWeightValue = (fishItemID, weight) => {
  if (fishItemID === undefined) {
    return 0;
  }
  const collectionData = KeyValues.collection[String(fishItemID)];
  return getMappedStatNumericValue(weight, collectionData?.weight_min, collectionData?.weight_max) ?? 0;
};
const normalizeSearchKeyword = keyword => keyword.trim().toLowerCase();
const getFishCapacityLimit = () => {
  const configuredCapacity = Number(GameUI.CustomUIConfig().idle_game_setting?.fish_num_max?.value ?? 0);
  return configuredCapacity > 0 ? configuredCapacity : 200;
};
const getDefaultAutoSellConfig = () => ({
  rarities: [...DEFAULT_FISHING_BAG_AUTO_SELL_CONFIG.rarities],
  stars: [...DEFAULT_FISHING_BAG_AUTO_SELL_CONFIG.stars],
  keepMinEnabled: DEFAULT_FISHING_BAG_AUTO_SELL_CONFIG.keepMinEnabled,
  keepMinCount: DEFAULT_FISHING_BAG_AUTO_SELL_CONFIG.keepMinCount
});
const normalizeNumberList = (value, min, max) => {
  const selectedMap = {};
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const numberValue = Math.floor(Number(value[i]) || 0);
      if (numberValue >= min && numberValue <= max) {
        selectedMap[numberValue] = true;
      }
    }
  }
  return Object.keys(selectedMap).map(key => Number(key)).sort((left, right) => left - right);
};
const normalizeAutoSellConfig = config => {
  if (config === undefined) {
    return getDefaultAutoSellConfig();
  }
  return {
    rarities: normalizeNumberList(config.rarities, 1, 6),
    stars: normalizeNumberList(config.stars, 1, 5),
    keepMinEnabled: config.keepMinEnabled === true,
    keepMinCount: Math.max(1, Math.floor(Number(config.keepMinCount) || 1))
  };
};
const getAutoSellConfigFromText = configText => {
  if (configText === undefined || configText === "") {
    return getDefaultAutoSellConfig();
  }
  return normalizeAutoSellConfig(JSON.parseSafe(configText));
};
const buildSelectedMap = values => {
  const selectedMap = {};
  for (let i = 0; i < values.length; i++) {
    selectedMap[values[i]] = true;
  }
  return selectedMap;
};
const getSelectedNumbers = selectedMap => Object.keys(selectedMap).map(key => Number(key)).filter(value => value > 0).sort((left, right) => left - right);
const FishingBag = () => {
  libs.onMount(() => {
    CallAction("/v1/idle_game/fetch_fishes", {});
  });
  const playerIdleGameFishes = solid_utils.createServiceNetData("player_idle_game_fishes", {});
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const [selectedFishId, setSelectedFishId] = libs.createSignal();
  const [selectedRarity, setSelectedRarity] = libs.createSignal("all");
  const [searchKeyword, setSearchKeyword] = libs.createSignal("");
  const [sortType, setSortType] = libs.createSignal(0);
  const [selectedFishMap, setSelectedFishMap] = libs.createSignal({});
  const [autoSellEnabled, setAutoSellEnabled] = libs.createSignal(false);
  const [selectedAutoSellRarityMap, setSelectedAutoSellRarityMap] = libs.createSignal({});
  const [selectedAutoSellStarMap, setSelectedAutoSellStarMap] = libs.createSignal({});
  const [showAutoSellPanel, setShowAutoSellPanel] = libs.createSignal(false);
  const [autoSellKeepMinEnabled, setAutoSellKeepMinEnabled] = libs.createSignal(false);
  const [autoSellKeepMinCountText, setAutoSellKeepMinCountText] = libs.createSignal("1");
  let autoSellEnabledSaveRequestID = 0;
  let pendingAutoSellEnabled;
  let autoSellConfigApplied = false;
  let appliedAutoSellConfigText;
  const fishList = libs.createMemo(() => Object.values(playerIdleGameFishes()));
  const getFishTooltip = fishData => {
    const fishItemID = fishData.fish_item_id;
    const getTimeText = ToColor(`${GetLocalization("#FishingBag_GetTime", "获得时间：")}${global_selection.formatDateText(fishData.get_time)}`, "#ffffff");
    const description = GetLocalization(`Normal_${fishItemID}_description`, "");
    return {
      name: "title_image_text",
      title: `#Normal_${fishItemID}`,
      image: getSrcPath(`store_items/${fishItemID}.png`),
      text: description ? `${getTimeText}<br>${description}` : getTimeText
    };
  };
  const compareFishById = (leftFishData, rightFishData) => leftFishData.id - rightFishData.id;
  const compareFishByName = (leftFishData, rightFishData) => {
    const leftName = normalizeSearchKeyword(getFishLocalizedName(leftFishData.fish_item_id));
    const rightName = normalizeSearchKeyword(getFishLocalizedName(rightFishData.fish_item_id));
    if (leftName < rightName) {
      return -1;
    }
    if (leftName > rightName) {
      return 1;
    }
    return 0;
  };
  const sortFishList = (fishes, currentSortType) => {
    fishes.sort((leftFishData, rightFishData) => {
      if (currentSortType === 0) {
        return compareFishById(leftFishData, rightFishData);
      }
      if (currentSortType === 1) {
        const nameDiff = compareFishByName(leftFishData, rightFishData);
        if (nameDiff !== 0) {
          return nameDiff;
        }
        return compareFishById(leftFishData, rightFishData);
      }
      if (currentSortType === 2) {
        const starDiff = getFishStarCount(rightFishData.weight) - getFishStarCount(leftFishData.weight);
        if (starDiff !== 0) {
          return starDiff;
        }
        return compareFishById(leftFishData, rightFishData);
      }
      if (currentSortType === 3) {
        const actualWeightDiff = getFishActualWeightValue(rightFishData.fish_item_id, rightFishData.weight) - getFishActualWeightValue(leftFishData.fish_item_id, leftFishData.weight);
        if (actualWeightDiff !== 0) {
          return actualWeightDiff;
        }
        return compareFishById(leftFishData, rightFishData);
      }
      if (currentSortType === 4) {
        const rarityDiff = GetServiceItemRarity(rightFishData.fish_item_id) - GetServiceItemRarity(leftFishData.fish_item_id);
        if (rarityDiff !== 0) {
          return rarityDiff;
        }
        return compareFishById(leftFishData, rightFishData);
      }
      const priceDiff = getFishSellPriceValue(rightFishData.price) - getFishSellPriceValue(leftFishData.price);
      if (priceDiff !== 0) {
        return priceDiff;
      }
      return compareFishById(leftFishData, rightFishData);
    });
  };
  const getVisibleFishList = (filter, keyword, currentSortType) => {
    const normalizedKeyword = normalizeSearchKeyword(keyword);
    const visibleFishes = fishList().filter(fishData => {
      const matchesKeyword = normalizeSearchKeyword(getFishLocalizedName(fishData.fish_item_id)).includes(normalizedKeyword);
      if (filter === "all") {
        return matchesKeyword;
      }
      if (filter === "aquarium") {
        return fishData.show === true && matchesKeyword;
      }
      return GetServiceItemRarity(fishData.fish_item_id) === filter && matchesKeyword;
    });
    sortFishList(visibleFishes, currentSortType);
    return visibleFishes;
  };
  const clearBatchSellSelection = () => {
    setSelectedFishMap({});
  };
  const keepVisibleFishSelected = visibleFishes => {
    const visibleFishMap = {};
    for (let i = 0; i < visibleFishes.length; i++) {
      visibleFishMap[visibleFishes[i].id] = true;
    }
    setSelectedFishMap(previousMap => {
      const nextMap = {};
      const previousSelectedFishIDs = getSelectedFishIDList(previousMap);
      for (let i = 0; i < previousSelectedFishIDs.length; i++) {
        const fishID = previousSelectedFishIDs[i];
        if (visibleFishMap[fishID] === true) {
          nextMap[fishID] = true;
        }
      }
      return nextMap;
    });
  };
  const setFishSelected = (fishID, shouldSelect) => {
    setSelectedFishMap(previousMap => {
      const nextMap = {
        ...previousMap
      };
      if (shouldSelect && isFishSellable(fishById()[fishID])) {
        nextMap[fishID] = true;
      } else {
        delete nextMap[fishID];
      }
      return nextMap;
    });
  };
  const toggleFishSelected = fishID => {
    const currentMap = selectedFishMap();
    setFishSelected(fishID, currentMap[fishID] !== true);
  };
  const handleRarityFilterChange = filter => {
    setSelectedRarity(filter);
    keepVisibleFishSelected(getVisibleFishList(filter, searchKeyword(), sortType()));
  };
  const handleSearchChange = keyword => {
    setSearchKeyword(keyword);
    keepVisibleFishSelected(getVisibleFishList(selectedRarity(), keyword, sortType()));
  };
  const handleSortChange = nextSortType => {
    setSortType(nextSortType);
  };
  const handleAutoSellKeepMinCountChange = (self, _previousText, changedText) => {
    const normalizedText = normalizeNumericText(changedText);
    if (self.text !== normalizedText) {
      self.text = normalizedText;
    }
    setAutoSellKeepMinCountText(normalizedText);
  };
  const applyAutoSellConfig = config => {
    setSelectedAutoSellRarityMap(buildSelectedMap(config.rarities));
    setSelectedAutoSellStarMap(buildSelectedMap(config.stars));
    setAutoSellKeepMinEnabled(config.keepMinEnabled);
    setAutoSellKeepMinCountText(String(config.keepMinCount));
  };
  const getCurrentAutoSellConfig = () => ({
    rarities: getSelectedNumbers(selectedAutoSellRarityMap()),
    stars: getSelectedNumbers(selectedAutoSellStarMap()),
    keepMinEnabled: autoSellKeepMinEnabled(),
    keepMinCount: Math.max(1, Math.floor(Number(autoSellKeepMinCountText()) || 1))
  });
  const saveAutoSellEnabled = (checked, panel) => {
    const previousChecked = autoSellEnabled();
    const requestID = autoSellEnabledSaveRequestID + 1;
    autoSellEnabledSaveRequestID = requestID;
    pendingAutoSellEnabled = checked;
    setAutoSellEnabled(checked);
    CallActionRequest("/v1/key/save", {
      type: FISHING_BAG_KEY_TYPE,
      key: FISHING_BAG_AUTO_SELL_ENABLED_KEY,
      value: checked ? "1" : "0"
    }, () => {}, () => {
      if (autoSellEnabledSaveRequestID !== requestID) {
        return;
      }
      pendingAutoSellEnabled = undefined;
      setAutoSellEnabled(previousChecked);
      if (panel !== undefined) {
        panel.checked = previousChecked;
      }
    }, false);
  };
  const toggleAutoSellRarity = rarity => {
    setSelectedAutoSellRarityMap(previousMap => {
      const nextMap = {
        ...previousMap
      };
      if (nextMap[rarity] === true) {
        delete nextMap[rarity];
      } else {
        nextMap[rarity] = true;
      }
      return nextMap;
    });
  };
  const toggleAutoSellStar = star => {
    setSelectedAutoSellStarMap(previousMap => {
      const nextMap = {
        ...previousMap
      };
      if (nextMap[star] === true) {
        delete nextMap[star];
      } else {
        nextMap[star] = true;
      }
      return nextMap;
    });
  };
  libs.createEffect(libs.on(playerKeyValues, data => {
    const nextAutoSellEnabled = getAutoSellEnabledFromText(data?.[FISHING_BAG_AUTO_SELL_ENABLED_KEY]?.value);
    if (pendingAutoSellEnabled === undefined || pendingAutoSellEnabled === nextAutoSellEnabled) {
      pendingAutoSellEnabled = undefined;
      setAutoSellEnabled(nextAutoSellEnabled);
    }
    const nextAutoSellConfigText = data?.[FISHING_BAG_AUTO_SELL_CONFIG_KEY]?.value;
    if (autoSellConfigApplied === false || appliedAutoSellConfigText !== nextAutoSellConfigText) {
      autoSellConfigApplied = true;
      appliedAutoSellConfigText = nextAutoSellConfigText;
      applyAutoSellConfig(getAutoSellConfigFromText(nextAutoSellConfigText));
    }
  }));
  const fishById = libs.createMemo(() => {
    const fishMap = {};
    const fishes = fishList();
    for (let i = 0; i < fishes.length; i++) {
      fishMap[fishes[i].id] = fishes[i];
    }
    return fishMap;
  });
  const selectedFish = libs.createMemo(() => {
    const currentSelectedFishId = selectedFishId();
    if (currentSelectedFishId === undefined) {
      return;
    }
    return fishById()[currentSelectedFishId];
  });
  const selectedFishItemId = libs.createMemo(() => selectedFish()?.fish_item_id);
  const selectedCollectionData = libs.createMemo(() => {
    const fishItemId = selectedFishItemId();
    if (fishItemId === undefined) {
      return;
    }
    return KeyValues.collection[String(fishItemId)];
  });
  const selectedFishName = libs.createMemo(() => selectedFishItemId() !== undefined ? "#Normal_" + selectedFishItemId() : "-");
  const selectedFishRarityClass = libs.createMemo(() => "Rarity" + GetServiceItemRarity(selectedFishItemId() ?? "420000"));
  const selectedFishTypeText = libs.createMemo(() => {
    const fishItemId = selectedFishItemId();
    if (fishItemId === undefined) {
      return "-";
    }
    return GetLocalization(`Normal_${fishItemId}_type`, "-");
  });
  const selectedFishDescription = libs.createMemo(() => {
    const fishItemId = selectedFishItemId();
    if (fishItemId === undefined) {
      return "";
    }
    return GetLocalization(`Normal_${fishItemId}_description`, "");
  });
  const detailStats = libs.createMemo(() => {
    const currentSelectedFish = selectedFish();
    const currentCollection = selectedCollectionData();
    return [{
      label: "#FishingBag_Weight",
      value: getMappedStatValue(currentSelectedFish?.weight, currentCollection?.weight_min, currentCollection?.weight_max),
      unit: "kg"
    }, {
      label: "#FishingBag_Length",
      value: getMappedStatValue(currentSelectedFish?.weight, currentCollection?.length_min, currentCollection?.length_max),
      unit: "cm"
    }, {
      label: "#FishingBag_Price",
      value: getFishSellPrice(currentSelectedFish?.price),
      unit: "<panel class='PriceIcon'/>"
    }];
  });
  const detailAttributes = libs.createMemo(() => {
    const currentCollection = selectedCollectionData();
    return [{
      label: "#FishingBag_Type",
      value: selectedFishTypeText()
    }, {
      label: "#FishingBag_Weight",
      value: getStatRangeText(currentCollection?.weight_min, currentCollection?.weight_max, "kg")
    }, {
      label: "#FishingBag_Length",
      value: getStatRangeText(currentCollection?.length_min, currentCollection?.length_max, "cm")
    }];
  });
  const captureTagItemIDs = libs.createMemo(() => {
    const currentSelectedFish = selectedFish();
    if (currentSelectedFish === undefined) {
      return [];
    }
    const itemIDs = [getFishingRodItemID(currentSelectedFish.rod_level)];
    const fishBait = Number(currentSelectedFish.fish_bait ?? 0) || 0;
    if (fishBait > 0) {
      itemIDs.push(fishBait);
    }
    const hookItemIDs = normalizeItemIDList(currentSelectedFish.fish_hooks);
    for (let i = 0; i < hookItemIDs.length; i++) {
      itemIDs.push(hookItemIDs[i]);
    }
    const courierItemIDs = normalizeItemIDList(currentSelectedFish.fish_courier_ids);
    for (let i = 0; i < courierItemIDs.length; i++) {
      itemIDs.push(courierItemIDs[i]);
    }
    return itemIDs;
  });
  const totalSellPrice = libs.createMemo(() => {
    let totalValue = 0;
    const fishes = fishList();
    for (let i = 0; i < fishes.length; i++) {
      totalValue += getFishSellPriceValue(fishes[i].price);
    }
    return formatNumber(totalValue);
  });
  const fishCapacityText = libs.createMemo(() => `${fishList().length}/${getFishCapacityLimit()}`);
  const selectedFishSellPrice = libs.createMemo(() => {
    const currentSelectedFish = selectedFish();
    return getFishSellPrice(currentSelectedFish?.price);
  });
  const shownFishCount = libs.createMemo(() => {
    let count = 0;
    const fishes = fishList();
    for (let i = 0; i < fishes.length; i++) {
      if (fishes[i].show === true) {
        count++;
      }
    }
    return count;
  });
  const property_system = solid_utils.createPlayerPropertyData(() => Players.GetLocalPlayer());
  const aquariumSlotLimit = libs.createMemo(() => {
    return toFiniteNumber(Float(property_system().aquarium_slot), 0) + toFiniteNumber(CustomUIConfig.idle_game_setting.aquarium_slot.value);
  });
  const aquariumSlotText = libs.createMemo(() => `${shownFishCount()}/${aquariumSlotLimit()}`);
  const canToggleFishShow = libs.createMemo(() => {
    const currentSelectedFish = selectedFish();
    if (currentSelectedFish === undefined) {
      return false;
    }
    if (currentSelectedFish.show === true) {
      return true;
    }
    return shownFishCount() < aquariumSlotLimit();
  });
  const canSellSelectedFish = libs.createMemo(() => isFishSellable(selectedFish()));
  const visibleFishList = libs.createMemo(() => getVisibleFishList(selectedRarity(), searchKeyword(), sortType()));
  const visibleSellableFishList = libs.createMemo(() => visibleFishList().filter(fishData => isFishSellable(fishData)));
  const selectedFishIDList = libs.createMemo(() => {
    const currentFishById = fishById();
    const fishIDs = getSelectedFishIDList(selectedFishMap());
    const sellableFishIDs = [];
    for (let i = 0; i < fishIDs.length; i++) {
      if (isFishSellable(currentFishById[fishIDs[i]])) {
        sellableFishIDs.push(fishIDs[i]);
      }
    }
    return sellableFishIDs;
  });
  const batchSellMode = libs.createMemo(() => selectedFishIDList().length > 0);
  const selectedFishCount = libs.createMemo(() => selectedFishIDList().length);
  const selectedFishTotalPrice = libs.createMemo(() => {
    let totalValue = 0;
    const selectedIDs = selectedFishIDList();
    const currentFishById = fishById();
    for (let i = 0; i < selectedIDs.length; i++) {
      const fishData = currentFishById[selectedIDs[i]];
      if (fishData !== undefined) {
        totalValue += getFishSellPriceValue(fishData.price);
      }
    }
    return formatNumber(totalValue);
  });
  const allVisibleSelected = libs.createMemo(() => {
    const currentVisibleFishList = visibleSellableFishList();
    if (currentVisibleFishList.length <= 0) {
      return false;
    }
    const currentSelectedFishMap = selectedFishMap();
    for (let i = 0; i < currentVisibleFishList.length; i++) {
      if (currentSelectedFishMap[currentVisibleFishList[i].id] !== true) {
        return false;
      }
    }
    return true;
  });
  const toggleVisibleFishSelection = () => {
    const currentVisibleFishList = visibleSellableFishList();
    if (currentVisibleFishList.length <= 0) {
      return;
    }
    if (allVisibleSelected()) {
      clearBatchSellSelection();
      return;
    }
    const nextMap = {};
    for (let i = 0; i < currentVisibleFishList.length; i++) {
      nextMap[currentVisibleFishList[i].id] = true;
    }
    setSelectedFishMap(nextMap);
  };
  const getRarityCount = filter => {
    const fishes = fishList();
    if (filter === "all") {
      return fishes.length;
    }
    if (filter === "aquarium") {
      let count = 0;
      for (let i = 0; i < fishes.length; i++) {
        if (fishes[i].show === true) {
          count++;
        }
      }
      return count;
    }
    return fishes.filter(fishData => GetServiceItemRarity(fishData.fish_item_id) === filter).length;
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "FishingBag",
    shadow_border: true,
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "FishingBagShell"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "FishingBagListPanel"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "FishingBagListHeader"
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "FishingBagSearchRow"
        }, _el$3),
        _el$5 = libs.createElement("Panel", {
          id: "FishingBagAutoSellControls"
        }, _el$4),
        _el$6 = libs.createElement("Panel", {
          id: "FishingBagFilterRow"
        }, _el$3),
        _el$7 = libs.createElement("Panel", {
          id: "FishingBagFilterTabs"
        }, _el$6),
        _el$8 = libs.createElement("Button", {
          id: "FishingBagSelectAllToggle"
        }, _el$6),
        _el$9 = libs.createElement("Label", {
          "class": "FishingBagSelectAllLabel",
          get text() {
            return allVisibleSelected() ? "#FishingBag_UnselectAll" : "#FishingBag_SelectAll";
          }
        }, _el$8),
        _el$0 = libs.createElement("Panel", {
          id: "FishingBagToolbar"
        }, _el$3);
        libs.createElement("Panel", {
          id: "FishingDividerLine"
        }, _el$2);
        const _el$16 = libs.createElement("Panel", {
          id: "FishingBagList",
          scroll: "y"
        }, _el$2),
        _el$17 = libs.createElement("Panel", {
          id: "EmptyTip"
        }, _el$16);
        libs.createElement("Image", {
          id: "EmptyImage"
        }, _el$17);
        libs.createElement("Label", {
          text: "#FishingBag_Empty"
        }, _el$17);
        libs.createElement("Panel", {
          id: "FishingDividerLine"
        }, _el$2);
        const _el$21 = libs.createElement("Panel", {
          id: "FishingBagListFooter"
        }, _el$2),
        _el$22 = libs.createElement("Panel", {
          id: "FishingBagSummary"
        }, _el$21),
        _el$23 = libs.createElement("Image", {
          "class": "SummaryIcon",
          src: "s2r://panorama/images/control_icons/24px/bundles.vsvg",
          width: "24px",
          height: "24px"
        }, _el$22),
        _el$24 = libs.createElement("Label", {
          "class": "SummaryText",
          html: true,
          text: "#FishingBag_Capacity",
          get vars() {
            return {
              value: fishCapacityText()
            };
          }
        }, _el$22),
        _el$25 = libs.createElement("Image", {
          "class": "SummaryIcon",
          src: "s2r://panorama/images/events/crownfall/survivors/gold_bag.vsvg",
          width: "24px",
          height: "24px"
        }, _el$22),
        _el$26 = libs.createElement("Label", {
          "class": "SummaryText",
          html: true,
          text: "#FishingBag_TotalPrice",
          get vars() {
            return {
              value: totalSellPrice()
            };
          }
        }, _el$22),
        _el$27 = libs.createElement("Panel", {
          id: "BatchSellSummary"
        }, _el$21),
        _el$28 = libs.createElement("Label", {
          "class": "SummaryText",
          html: true,
          text: "#FishingBag_SelectedCount",
          get vars() {
            return {
              value: String(selectedFishCount())
            };
          }
        }, _el$27),
        _el$29 = libs.createElement("Image", {
          "class": "SummaryIcon",
          src: "s2r://panorama/images/events/crownfall/survivors/gold_bag.vsvg",
          width: "24px",
          height: "24px"
        }, _el$27),
        _el$30 = libs.createElement("Label", {
          "class": "SummaryText",
          html: true,
          text: "#FishingBag_SelectedPrice",
          get vars() {
            return {
              value: selectedFishTotalPrice()
            };
          }
        }, _el$27),
        _el$31 = libs.createElement("Panel", {
          id: "BatchSellPanel"
        }, _el$21);
      libs.insert(_el$4, libs.createComponent(EOM_SearchBox.EOM_SearchBox, {
        id: "FishingBagSearch",
        get placeholder() {
          return GetLocalization("#FishingBag_SearchPlaceholder");
        },
        onSearch: handleSearchChange
      }), _el$5);
      libs.insert(_el$5, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        id: "FishingBagAutoSellToggle",
        text: "#FishingBag_AutoSellCheckbox",
        get checked() {
          return autoSellEnabled();
        },
        onchecked: saveAutoSellEnabled
      }), null);
      libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_Button, {
        id: "FishingBagAutoSellConfigButton",
        size: "Small",
        text: "#FishingBag_AutoSellBtnText",
        onactivate: () => setShowAutoSellPanel(!showAutoSellPanel())
      }), null);
      libs.insert(_el$7, libs.createComponent(libs.For, {
        each: rarityTabs,
        children: tab => libs.createComponent(EOM_FilterChip.EOM_FilterChip, {
          get selected() {
            return selectedRarity() === tab.filter;
          },
          get text() {
            return tab.label;
          },
          get count() {
            return getRarityCount(tab.filter);
          },
          get dotColor() {
            return tab.dotColor;
          },
          onactivate: () => handleRarityFilterChange(tab.filter)
        })
      }));
      libs.setProp(_el$8, "onactivate", toggleVisibleFishSelection);
      libs.insert(_el$8, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        id: "FishingBagSelectAllCheckBox",
        text: "",
        get checked() {
          return allVisibleSelected();
        },
        hittest: false
      }), _el$9);
      libs.insert(_el$0, libs.createComponent(EOM_DropDown.EOM_DropDown, {
        id: "FishingBagSort",
        get index() {
          return sortType();
        },
        onChange: index => handleSortChange(index),
        get children() {
          return [libs.createElement("Label", {
            text: "#FishingBag_Sort_Time"
          }, null), libs.createElement("Label", {
            text: "#FishingBag_Sort_Name"
          }, null), libs.createElement("Label", {
            text: "#FishingBag_Sort_Star"
          }, null), libs.createElement("Label", {
            text: "#FishingBag_Sort_Weight"
          }, null), libs.createElement("Label", {
            text: "#FishingBag_Sort_Rarity"
          }, null), libs.createElement("Label", {
            text: "#FishingBag_Sort_Price"
          }, null)];
        }
      }));
      libs.setProp(_el$16, "scroll", "y");
      libs.insert(_el$16, libs.createComponent(libs.For, {
        get each() {
          return visibleFishList();
        },
        children: fishData => {
          fishData.get_time;
          const batchSelected = () => selectedFishMap()[fishData.id] === true;
          const canBatchSell = () => isFishSellable(fishData);
          return (() => {
            const _el$86 = libs.createElement("Panel", {
                "class": "CollectionCard"
              }, null),
              _el$88 = libs.createElement("Panel", {
                id: "CardBG"
              }, _el$86),
              _el$89 = libs.createElement("Image", {
                hittest: false,
                id: "Equipped"
              }, _el$86),
              _el$90 = libs.createElement("Panel", {
                id: "StarTitle"
              }, _el$86);
              libs.createElement("Image", {
                id: "LockIcon",
                hittest: false
              }, _el$86);
              libs.createElement("Panel", {
                id: "SelectedHover",
                hittest: false
              }, _el$86);
            libs.setProp(_el$86, "onactivate", () => {
              if (batchSellMode()) {
                if (canBatchSell() === false) {
                  return;
                }
                toggleFishSelected(fishData.id);
                return;
              }
              setSelectedFishId(fishData.id);
            });
            libs.insert(_el$86, libs.createComponent(libs.Show, {
              get when() {
                return libs.memo(() => !!!batchSellMode())() && selectedFishId() === fishData.id;
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
            }), _el$88);
            libs.insert(_el$86, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
              id: "CheckBox",
              text: "",
              get checked() {
                return batchSelected();
              },
              get hittest() {
                return canBatchSell();
              },
              onchecked: checked => {
                if (canBatchSell() === false) {
                  return;
                }
                setSelectedFishId(fishData.id);
                setFishSelected(fishData.id, checked);
              }
            }), _el$89);
            libs.insert(_el$86, libs.createComponent(StoreItem.StoreItemImage, {
              hittest: false,
              id: "CollectionIcon",
              get itemid() {
                return fishData.fish_item_id;
              },
              hideTips: true
            }), _el$90);
            libs.insert(_el$90, libs.createComponent(libs.For, {
              get each() {
                return Array.from({
                  length: getFishStarCount(fishData.weight)
                });
              },
              children: () => libs.createElement("Image", {
                "class": "StarIcon"
              }, null)
            }));
            libs.effect(_p$ => {
              const _v$16 = getFishTooltip(fishData),
                _v$17 = {
                  ["Rarity" + GetServiceItemRarity(fishData.fish_item_id)]: true,
                  PreviewSelected: !batchSellMode() && selectedFishId() === fishData.id,
                  BatchSellMode: batchSellMode(),
                  BatchSelected: batchSelected(),
                  Equipped: fishData.show
                },
                _v$18 = fishData.show;
              _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$86, "customTooltip", _v$16, _p$._v$16));
              _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$86, "classList", _v$17, _p$._v$17));
              _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$89, "visible", _v$18, _p$._v$18));
              return _p$;
            }, {
              _v$16: undefined,
              _v$17: undefined,
              _v$18: undefined
            });
            return _el$86;
          })();
        }
      }), _el$17);
      libs.setProp(_el$23, "width", "24px");
      libs.setProp(_el$23, "height", "24px");
      libs.setProp(_el$25, "width", "24px");
      libs.setProp(_el$25, "height", "24px");
      libs.insert(_el$22, libs.createComponent(Player.CurrencyIcon, {
        tokenID: 110003
      }), null);
      libs.setProp(_el$29, "width", "24px");
      libs.setProp(_el$29, "height", "24px");
      libs.insert(_el$27, libs.createComponent(Player.CurrencyIcon, {
        tokenID: 110003
      }), null);
      libs.insert(_el$31, libs.createComponent(EOM_Button.EOM_Button, {
        size: "Small",
        text: "#FishingBag_BatchSell",
        onactivate: self => {
          const fishIDs = selectedFishIDList();
          if (fishIDs.length <= 0) {
            return;
          }
          self.enabled = false;
          clearBatchSellSelection();
          CallActionRequest("/v1/idle_game/sell_fishes", {
            fish_ids: fishIDs
          }, () => {
            self.enabled = true;
          });
        }
      }), null);
      libs.insert(_el$31, libs.createComponent(EOM_Button.EOM_Button, {
        size: "Small",
        text: "#FishingBag_Cancel",
        onactivate: () => clearBatchSellSelection()
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return !showAutoSellPanel();
        },
        get children() {
          const _el$32 = libs.createElement("Panel", {
              id: "FishingBagDetailPanel"
            }, null),
            _el$33 = libs.createElement("Label", {
              id: "CollectionName",
              get text() {
                return selectedFishName();
              },
              get ["class"]() {
                return selectedFishRarityClass();
              }
            }, _el$32),
            _el$34 = libs.createElement("Panel", {
              id: "CollectionImageBG"
            }, _el$32),
            _el$35 = libs.createElement("Panel", {
              id: "FishingBagDetailBody"
            }, _el$32),
            _el$36 = libs.createElement("Panel", {
              id: "FishingBagStatGrid"
            }, _el$35),
            _el$37 = libs.createElement("Panel", {
              id: "AccessDivider"
            }, _el$35);
            libs.createElement("Image", {
              id: "LineLeft"
            }, _el$37);
            libs.createElement("Label", {
              id: "AccessTitle",
              text: "#FishingBag_Intro"
            }, _el$37);
            libs.createElement("Image", {
              id: "LineRight"
            }, _el$37);
            const _el$41 = libs.createElement("Label", {
              id: "AccessDesc",
              get text() {
                return selectedFishDescription();
              }
            }, _el$35),
            _el$42 = libs.createElement("Panel", {
              id: "AccessDivider"
            }, _el$35);
            libs.createElement("Image", {
              id: "LineLeft"
            }, _el$42);
            libs.createElement("Label", {
              id: "AccessTitle",
              text: "#FishingBag_Props"
            }, _el$42);
            libs.createElement("Image", {
              id: "LineRight"
            }, _el$42);
            const _el$46 = libs.createElement("Panel", {
              id: "FishingBagAttributeList"
            }, _el$35),
            _el$47 = libs.createElement("Panel", {
              id: "AccessDivider"
            }, _el$35);
            libs.createElement("Image", {
              id: "LineLeft"
            }, _el$47);
            libs.createElement("Label", {
              id: "AccessTitle",
              text: "#FishingBag_Record"
            }, _el$47);
            libs.createElement("Image", {
              id: "LineRight"
            }, _el$47);
            const _el$51 = libs.createElement("Panel", {
              id: "FishingBagCaptureTags"
            }, _el$35),
            _el$52 = libs.createElement("Panel", {
              id: "FishingBagActions"
            }, _el$35),
            _el$53 = libs.createElement("Panel", {
              "class": "ActionColumn"
            }, _el$52),
            _el$54 = libs.createElement("Panel", {
              "class": "ActionMeta"
            }, _el$53);
            libs.createElement("Label", {
              "class": "ActionMetaLabel",
              text: "#FishingBag_Price"
            }, _el$54);
            const _el$56 = libs.createElement("Panel", {
              "class": "ActionMetaValueRow"
            }, _el$54),
            _el$57 = libs.createElement("Label", {
              "class": "ActionMetaValue",
              get text() {
                return selectedFishSellPrice();
              }
            }, _el$56),
            _el$58 = libs.createElement("Panel", {
              "class": "ActionColumn"
            }, _el$52),
            _el$59 = libs.createElement("Panel", {
              "class": "ActionMeta"
            }, _el$58);
            libs.createElement("Label", {
              "class": "ActionMetaLabel",
              text: "#FishingBag_ShowingCountLabel"
            }, _el$59);
            const _el$61 = libs.createElement("Label", {
              "class": "ActionMetaValue",
              html: true,
              text: "#FishingBag_ShowingCount",
              get vars() {
                return {
                  value: aquariumSlotText()
                };
              }
            }, _el$59);
          libs.insert(_el$34, libs.createComponent(libs.Show, {
            get when() {
              return selectedFishItemId() !== undefined;
            },
            get fallback() {
              return libs.createElement("Panel", {
                id: "Question"
              }, null);
            },
            get children() {
              return libs.createComponent(StoreItem.StoreItemImage, {
                id: "CollectionIcon",
                get itemid() {
                  return selectedFishItemId() ?? "420000";
                }
              });
            }
          }));
          libs.insert(_el$36, libs.createComponent(libs.For, {
            get each() {
              return detailStats();
            },
            children: stat => (() => {
              const _el$95 = libs.createElement("Panel", {
                  "class": "DetailStatCard"
                }, null),
                _el$96 = libs.createElement("Label", {
                  "class": "DetailStatLabel",
                  get text() {
                    return stat.label;
                  }
                }, _el$95),
                _el$97 = libs.createElement("Panel", {
                  "class": "DetailStatValueBox"
                }, _el$95),
                _el$98 = libs.createElement("Label", {
                  "class": "DetailStatValue",
                  get text() {
                    return stat.value;
                  }
                }, _el$97),
                _el$99 = libs.createElement("Label", {
                  "class": "DetailStatUnit",
                  get text() {
                    return stat.unit;
                  },
                  html: true
                }, _el$97);
              libs.effect(_p$ => {
                const _v$19 = stat.label,
                  _v$20 = stat.value,
                  _v$21 = stat.unit;
                _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$96, "text", _v$19, _p$._v$19));
                _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$98, "text", _v$20, _p$._v$20));
                _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$99, "text", _v$21, _p$._v$21));
                return _p$;
              }, {
                _v$19: undefined,
                _v$20: undefined,
                _v$21: undefined
              });
              return _el$95;
            })()
          }));
          libs.insert(_el$46, libs.createComponent(libs.For, {
            get each() {
              return detailAttributes();
            },
            children: (attribute, index) => (() => {
              const _el$100 = libs.createElement("Panel", {
                  id: "HeroAttribute"
                }, null),
                _el$101 = libs.createElement("Panel", {
                  get id() {
                    return "Icon" + index();
                  },
                  "class": "AttributeIcon"
                }, _el$100),
                _el$102 = libs.createElement("Label", {
                  "class": "AttributeName",
                  get text() {
                    return attribute.label;
                  }
                }, _el$100),
                _el$103 = libs.createElement("Label", {
                  "class": "AttributeValue",
                  get text() {
                    return attribute.value;
                  }
                }, _el$100);
              libs.effect(_p$ => {
                const _v$22 = "Icon" + index(),
                  _v$23 = attribute.label,
                  _v$24 = attribute.value;
                _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$101, "id", _v$22, _p$._v$22));
                _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$102, "text", _v$23, _p$._v$23));
                _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$103, "text", _v$24, _p$._v$24));
                return _p$;
              }, {
                _v$22: undefined,
                _v$23: undefined,
                _v$24: undefined
              });
              return _el$100;
            })()
          }));
          libs.insert(_el$51, libs.createComponent(libs.For, {
            get each() {
              return captureTagItemIDs();
            },
            children: itemID => {
              const propType = GetPropType(itemID);
              return (() => {
                const _el$104 = libs.createElement("Panel", {
                    "class": "CaptureTag"
                  }, null),
                  _el$105 = libs.createElement("Image", {
                    id: "Tag" + propType,
                    get ["class"]() {
                      return libs.classNames("TagIcon", "ExtraTag" + String(itemID).substring(0, 4));
                    }
                  }, _el$104),
                  _el$106 = libs.createElement("Label", {
                    text: "#" + itemID
                  }, _el$104);
                libs.setProp(_el$105, "id", "Tag" + propType);
                libs.setProp(_el$106, "text", "#" + itemID);
                libs.effect(_$p => libs.setProp(_el$105, "class", libs.classNames("TagIcon", "ExtraTag" + String(itemID).substring(0, 4)), _$p));
                return _el$104;
              })();
            }
          }));
          libs.insert(_el$56, libs.createComponent(Player.CurrencyIcon, {
            tokenID: 110003
          }), null);
          libs.insert(_el$53, libs.createComponent(EOM_Button.EOM_Button, {
            id: "SellFish",
            size: "Small",
            get enabled() {
              return canSellSelectedFish();
            },
            text: "#FishingBag_Sell",
            onactivate: self => {
              if (canSellSelectedFish() === false) {
                return;
              }
              self.enabled = false;
              const currentSelectedFish = selectedFish();
              if (currentSelectedFish?.id !== undefined) {
                clearBatchSellSelection();
                CallActionRequest("/v1/idle_game/sell_fishes", {
                  fish_ids: [currentSelectedFish.id]
                }, () => {
                  self.enabled = true;
                });
              } else {
                self.enabled = true;
              }
            }
          }), null);
          libs.insert(_el$58, libs.createComponent(EOM_Button.EOM_Button, {
            id: "ShowFish",
            size: "Small",
            get enabled() {
              return canToggleFishShow();
            },
            get text() {
              return (selectedFish()?.show ?? false) == false ? "#FishingBag_Show" : "#FishingBag_UnShow";
            },
            onactivate: self => {
              if (canToggleFishShow() === false) {
                return;
              }
              self.enabled = false;
              const currentSelectedFish = selectedFish();
              if (currentSelectedFish?.id !== undefined) {
                clearBatchSellSelection();
                CallActionRequest("/v1/idle_game/show_fish", {
                  fish_id: currentSelectedFish.id,
                  show: !currentSelectedFish.show
                }, () => {
                  self.enabled = true;
                });
              } else {
                self.enabled = true;
              }
            }
          }), null);
          libs.effect(_p$ => {
            const _v$ = selectedFishName(),
              _v$2 = selectedFishRarityClass(),
              _v$3 = selectedFishDescription(),
              _v$4 = selectedFish() !== undefined,
              _v$5 = selectedFishSellPrice(),
              _v$6 = {
                value: aquariumSlotText()
              };
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$33, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$33, "class", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$41, "text", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$52, "visible", _v$4, _p$._v$4));
            _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$57, "text", _v$5, _p$._v$5));
            _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$61, "vars", _v$6, _p$._v$6));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined,
            _v$4: undefined,
            _v$5: undefined,
            _v$6: undefined
          });
          return _el$32;
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return showAutoSellPanel();
        },
        get children() {
          const _el$62 = libs.createElement("Panel", {
              id: "FishingBagAutoSellPanel"
            }, null),
            _el$63 = libs.createElement("Panel", {
              id: "FishingBagAutoSellContainer"
            }, _el$62),
            _el$64 = libs.createElement("Panel", {
              id: "FishingBagAutoSellHeader"
            }, _el$63);
            libs.createElement("Label", {
              id: "FishingBagAutoSellTitle",
              text: "#FishingBag_AutoSellConfigTitle"
            }, _el$64);
            libs.createElement("Label", {
              id: "FishingBagAutoSellSubTitle",
              text: "#FishingBag_AutoSellConfigSubTitle"
            }, _el$64);
            const _el$67 = libs.createElement("Panel", {
              id: "FishingRarityFilterRarity",
              "class": "FishingRarityFilter"
            }, _el$63);
            libs.createElement("Label", {
              "class": "FishingAutoSellFilterTitle",
              text: "#FishingBag_AutoSellRarityFilter"
            }, _el$67);
            const _el$69 = libs.createElement("Panel", {
              "class": "FishingAutoSellFilterOptions"
            }, _el$67);
            libs.createElement("Panel", {
              id: "FishingDividerLine"
            }, _el$63);
            const _el$71 = libs.createElement("Panel", {
              id: "FishingRarityFilterStar",
              "class": "FishingRarityFilter"
            }, _el$63);
            libs.createElement("Label", {
              "class": "FishingAutoSellFilterTitle",
              text: "#FishingBag_AutoSellStarFilter"
            }, _el$71);
            const _el$73 = libs.createElement("Panel", {
              "class": "FishingAutoSellFilterOptions"
            }, _el$71);
            libs.createElement("Panel", {
              id: "FishingDividerLine"
            }, _el$63);
            const _el$75 = libs.createElement("Panel", {
              id: "FishingRarityFilterExtra",
              "class": "FishingRarityFilter"
            }, _el$63);
            libs.createElement("Label", {
              "class": "FishingAutoSellFilterTitle",
              text: "#FishingBag_AutoSellExtraFilter"
            }, _el$75);
            const _el$77 = libs.createElement("Panel", {
              "class": "FishingAutoSellPlaceholder"
            }, _el$75),
            _el$78 = libs.createElement("Panel", {
              id: "FishingAutoSellMinCountPlaceholder",
              "class": "FishingAutoSellFilterOptions"
            }, _el$77),
            _el$79 = libs.createElement("Panel", {
              id: "FishingAutoSellMinCountOption",
              "class": "FishingAutoSellCheckButton FishingAutoSellExtraOption"
            }, _el$78),
            _el$80 = libs.createElement("Label", {
              "class": "FishingAutoSellCheckLabel FishingAutoSellKeepMinLabel",
              text: "#FishingBag_AutoSellKeepMinPrefix"
            }, _el$79),
            _el$81 = libs.createElement("Label", {
              "class": "FishingAutoSellKeepMinUnit",
              text: "#FishingBag_AutoSellKeepMinUnit"
            }, _el$79);
            libs.createElement("Panel", {
              id: "FishingDividerLine"
            }, _el$63);
            const _el$83 = libs.createElement("Panel", {
              id: "FishingAutoSellPreview"
            }, _el$63);
            libs.createElement("Panel", {
              "class": "FishingAutoSellPlaceholder"
            }, _el$83);
            const _el$85 = libs.createElement("Panel", {
              id: "FishingAutoSellActions"
            }, _el$63);
          libs.insert(_el$69, libs.createComponent(libs.For, {
            each: autoSellRarityTabs,
            children: tab => (() => {
              const _el$107 = libs.createElement("Button", {
                  "class": "FishingAutoSellCheckButton"
                }, null),
                _el$108 = libs.createElement("Panel", {
                  "class": "FishingAutoSellRarityDot",
                  get style() {
                    return {
                      backgroundColor: tab.dotColor
                    };
                  }
                }, _el$107),
                _el$109 = libs.createElement("Label", {
                  "class": "FishingAutoSellCheckLabel",
                  get text() {
                    return tab.label;
                  }
                }, _el$107);
              libs.setProp(_el$107, "onactivate", () => toggleAutoSellRarity(tab.filter));
              libs.insert(_el$107, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                "class": "FishingAutoSellCheckBox",
                text: "",
                get checked() {
                  return selectedAutoSellRarityMap()[tab.filter] === true;
                },
                hittest: false
              }), _el$108);
              libs.effect(_p$ => {
                const _v$25 = {
                    Selected: selectedAutoSellRarityMap()[tab.filter] === true
                  },
                  _v$26 = {
                    backgroundColor: tab.dotColor
                  },
                  _v$27 = tab.label;
                _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$107, "classList", _v$25, _p$._v$25));
                _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$108, "style", _v$26, _p$._v$26));
                _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$109, "text", _v$27, _p$._v$27));
                return _p$;
              }, {
                _v$25: undefined,
                _v$26: undefined,
                _v$27: undefined
              });
              return _el$107;
            })()
          }));
          libs.insert(_el$73, libs.createComponent(libs.For, {
            each: autoSellStarOptions,
            children: star => (() => {
              const _el$110 = libs.createElement("Button", {
                  "class": "FishingAutoSellCheckButton StarFilterOption"
                }, null),
                _el$111 = libs.createElement("Panel", {
                  "class": "FishingAutoSellStarGroup"
                }, _el$110);
              libs.setProp(_el$110, "onactivate", () => toggleAutoSellStar(star));
              libs.insert(_el$110, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
                "class": "FishingAutoSellCheckBox",
                text: "",
                get checked() {
                  return selectedAutoSellStarMap()[star] === true;
                },
                hittest: false
              }), _el$111);
              libs.insert(_el$111, libs.createComponent(libs.For, {
                get each() {
                  return Array.from({
                    length: star
                  });
                },
                children: () => libs.createElement("Image", {
                  "class": "FishingAutoSellStarIcon"
                }, null)
              }));
              libs.effect(_$p => libs.setProp(_el$110, "classList", {
                Selected: selectedAutoSellStarMap()[star] === true
              }, _$p));
              return _el$110;
            })()
          }));
          libs.insert(_el$79, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
            "class": "FishingAutoSellCheckBox",
            text: "",
            get checked() {
              return autoSellKeepMinEnabled();
            },
            onchecked: checked => setAutoSellKeepMinEnabled(checked)
          }), _el$80);
          libs.insert(_el$79, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
            id: "FishingAutoSellKeepMinInput",
            textmode: "numeric",
            get text() {
              return autoSellKeepMinCountText();
            },
            get enabled() {
              return autoSellKeepMinEnabled();
            },
            onChange: handleAutoSellKeepMinCountChange
          }), _el$81);
          libs.insert(_el$85, libs.createComponent(EOM_Button.EOM_Button, {
            id: "AutoSellRecoveryDefaultConfig",
            size: "Small",
            text: "#FishingBag_AutoSellOptRecovery",
            enabled: true,
            onactivate: () => applyAutoSellConfig(getDefaultAutoSellConfig())
          }), null);
          libs.insert(_el$85, libs.createComponent(EOM_Button.EOM_Button, {
            id: "AutoSellSaveConfig",
            size: "Small",
            text: "#FishingBag_AutoSellOptSave",
            enabled: true,
            onactivate: self => {
              self.enabled = false;
              const config = getCurrentAutoSellConfig();
              setAutoSellKeepMinCountText(String(config.keepMinCount));
              CallActionRequest("/v1/key/save", {
                type: FISHING_BAG_KEY_TYPE,
                key: FISHING_BAG_AUTO_SELL_CONFIG_KEY,
                value: JSON.stringify(config)
              }, () => {
                self.enabled = true;
              }, () => {
                self.enabled = true;
              }, false);
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$79, "classList", {
            Selected: autoSellKeepMinEnabled()
          }, _$p));
          return _el$62;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$7 = {
            EOM_FilterChip: true,
            Selected: allVisibleSelected()
          },
          _v$8 = visibleSellableFishList().length > 0,
          _v$9 = allVisibleSelected() ? "#FishingBag_UnselectAll" : "#FishingBag_SelectAll",
          _v$0 = visibleFishList().length === 0,
          _v$1 = !batchSellMode(),
          _v$10 = {
            value: fishCapacityText()
          },
          _v$11 = {
            value: totalSellPrice()
          },
          _v$12 = batchSellMode(),
          _v$13 = {
            value: String(selectedFishCount())
          },
          _v$14 = {
            value: selectedFishTotalPrice()
          },
          _v$15 = batchSellMode();
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$8, "classList", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$8, "visible", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$9, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$17, "visible", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$22, "visible", _v$1, _p$._v$1));
        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$24, "vars", _v$10, _p$._v$10));
        _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$26, "vars", _v$11, _p$._v$11));
        _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$27, "visible", _v$12, _p$._v$12));
        _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$28, "vars", _v$13, _p$._v$13));
        _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$30, "vars", _v$14, _p$._v$14));
        _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$31, "visible", _v$15, _p$._v$15));
        return _p$;
      }, {
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$0: undefined,
        _v$1: undefined,
        _v$10: undefined,
        _v$11: undefined,
        _v$12: undefined,
        _v$13: undefined,
        _v$14: undefined,
        _v$15: undefined
      });
      return _el$;
    }
  });
};

const FishItemTypeList = [{
  tabType: "hook",
  name: "Hook",
  icon: "f1_icon_01"
}, {
  tabType: "bait",
  name: "Bait",
  icon: "f1_icon_02"
}];
const FishingTitleIconSrc = {
  bait: "file://{images}/custom_game/conv/icon/f1_icon_02.png",
  hook: "file://{images}/custom_game/conv/icon/f1_icon_01.png",
  courier: "file://{images}/custom_game/conv/icon/icon_messenger.png"
};
const getFishingRedPointState = () => CustomUIConfig.__fishingItemRedPointState;
const fishingRedPointState = {
  getFishingSlotUnlockNoticeKey: (type, index) => getFishingRedPointState().getFishingSlotUnlockNoticeKey(type, index),
  getFishingSlotEquipableNoticeKey: type => getFishingRedPointState().getFishingSlotEquipableNoticeKey(type),
  isFishingNoticeViewed: key => getFishingRedPointState().isFishingNoticeViewed(key),
  markFishingNoticeKeysViewed: keys => getFishingRedPointState().markFishingNoticeKeysViewed(keys),
  getFishingToolTypeByItemID: itemID => getFishingRedPointState().getFishingToolTypeByItemID(itemID),
  hasFishingSkillCourier: courierID => getFishingRedPointState().hasFishingSkillCourier(courierID),
  hasOwnedFishingTool: type => getFishingRedPointState().hasOwnedFishingTool(type),
  collectOneTimeFishingToolNoticeKeys: () => getFishingRedPointState().collectOneTimeFishingToolNoticeKeys(),
  hasNewFishingCourierNotice: () => getFishingRedPointState().hasNewFishingCourierNotice(),
  isFishingToolNew: itemID => getFishingRedPointState().isFishingToolNew(itemID),
  isFishingToolTypeNew: type => getFishingRedPointState().isFishingToolTypeNew(type),
  markFishingToolNewViewed: itemID => getFishingRedPointState().markFishingToolNewViewed(itemID),
  isFishingCourierNew: courierID => getFishingRedPointState().isFishingCourierNew(courierID),
  markFishingCourierNewViewed: courierID => getFishingRedPointState().markFishingCourierNewViewed(courierID)
};
const parseFishingRodEffects = effectText => {
  return ParseEffectTooltipSegments(effectText);
};
const buildFishingRodEffectMap = effectText => {
  const effectMap = {};
  const effects = parseFishingRodEffects(effectText);
  for (let index = 0; index < effects.length; index++) {
    const effect = effects[index];
    effectMap[effect.rawKey] = effect;
  }
  return effectMap;
};
const buildFishingCourierSkillText = skillText => {
  if (skillText === undefined || skillText === "") {
    return "";
  }
  const parts = skillText.split(":");
  if (parts.length === 2) {
    const rawKey = parts[0];
    const value = Number(parts[1]);
    if (rawKey !== "" && !Number.isNaN(value)) {
      return GetPropertyLocalization(rawKey, value);
    }
  }
  const privilegeConfig = KeyValues.idle_game_drop_privilege?.[skillText];
  if (privilegeConfig === undefined) {
    return "";
  }
  return getKeyValueDescription(GetLocalization(`#${skillText}`, ""), {
    chance: privilegeConfig.chance
  });
};
const FishingItem = () => {
  const courierSlotCount = 2;
  const baitSlotCount = 1;
  const hookSlotCount = 2;
  const tokenConfigs = KeyValues.fish_consume;
  const rodConfigs = KeyValues.idle_game_fish_rod;
  const hooks = Object.values(tokenConfigs).filter(config => config.type == "fishhook");
  const baits = Object.values(tokenConfigs).filter(config => config.type == "bait");
  const gameData = solid_utils.createServiceNetData("player_idle_game_fish_data", {
    equipment_level: 0,
    rod_level: 0,
    fish_bait: 0,
    fish_hooks: [],
    fish_courier_ids: [],
    times: 1,
    auto_switch_tools: false,
    aquarium_level: 0
  });
  const tokenData = solid_utils.createServiceNetData("player_tokens", {});
  const playerCouriers = service_netdata_helper.usePlayerCouriers();
  const propertySystem = solid_utils.createPlayerPropertyData(() => Players.GetLocalPlayer());
  const isOwnedCourier = courierID => {
    const courier = playerCouriers()?.[String(courierID)];
    return courier != undefined && Number(courier.star ?? 0) > 0;
  };
  const sortCourierList = libs.createMemo(() => service_netdata_helper.getSortedCourierIDs(playerCouriers()).filter(courierID => isOwnedCourier(courierID) && fishingRedPointState.hasFishingSkillCourier(courierID)));
  const [requesting, SetRequesting] = libs.createSignal(false);
  const [selectedSlot, setSelectedSlot] = libs.createSignal();
  const [fishTabType, setFishTabType] = libs.createSignal("bait");
  const autoSwitchToolsEnabled = libs.createMemo(() => gameData()?.auto_switch_tools === true);
  const [autoSwitchToolsTooltipButton, setAutoSwitchToolsTooltipButton] = libs.createSignal();
  let autoSwitchToolsTooltipHideSchedule;
  let previousAutoSwitchToolsEnabled = autoSwitchToolsEnabled();
  const [autoSwitchToolsTooltipHovered, setAutoSwitchToolsTooltipHovered] = libs.createSignal(false);
  const [autoSwitchToolsTooltipLocked, setAutoSwitchToolsTooltipLocked] = libs.createSignal(false);
  const autoSwitchToolsTooltipVisible = libs.createMemo(() => autoSwitchToolsTooltipHovered() || autoSwitchToolsTooltipLocked());
  const isListView = libs.createMemo(() => selectedSlot() !== undefined);
  const isCourierView = libs.createMemo(() => selectedSlot()?.type === "courier");
  const visibleFishItems = libs.createMemo(() => {
    const currentFishItems = fishTabType() === "hook" ? hooks : baits;
    return currentFishItems.filter(config => (tokenData()?.[config.id]?.amounts ?? 0) > 0);
  });
  const rodConfigList = libs.createMemo(() => Object.values(rodConfigs).filter(config => Number(config.hide ?? 0) !== 1));
  const maxRodLevel = libs.createMemo(() => Math.max(rodConfigList().length - 1, 0));
  const normalizePreviewRodIndex = index => {
    const total = rodConfigList().length;
    if (total <= 0) {
      return 0;
    }
    return (index % total + total) % total;
  };
  const currentRodLevel = libs.createMemo(() => {
    const level = gameData()?.rod_level ?? 0;
    return Math.min(maxRodLevel(), Math.max(0, level));
  });
  const currentRodConfig = libs.createMemo(() => rodConfigs[String(currentRodLevel())]);
  const equippedRodLevel = libs.createMemo(() => {
    const unlockedLevel = currentRodLevel();
    const rawEquipmentLevel = Number(gameData()?.equipment_level ?? unlockedLevel);
    return Math.min(unlockedLevel, Math.max(0, rawEquipmentLevel));
  });
  const [previewRodIndex, setPreviewRodIndex] = libs.createSignal(equippedRodLevel());
  const previewRodLevel = libs.createMemo(() => normalizePreviewRodIndex(previewRodIndex()));
  const previewRodRarity = libs.createMemo(() => rodConfigs[String(previewRodLevel())]?.rarity ?? 0);
  const previewRodTitleRarityClass = libs.createMemo(() => `Rarity${previewRodRarity()}`);
  const previewRodName = libs.createMemo(() => GetLocalization(`#rod_level${previewRodLevel()}`));
  const previewRodConfig = libs.createMemo(() => rodConfigList()[normalizePreviewRodIndex(previewRodIndex())]);
  const previewRodModel = libs.createMemo(() => previewRodConfig()?.model ?? "");
  libs.createEffect(() => {
    setPreviewRodIndex(currentRodLevel());
  });
  const unlockedBaitSlotCount = libs.createMemo(() => Number(currentRodConfig()?.is_bait ?? 0));
  const unlockedHookSlotCount = libs.createMemo(() => Number(currentRodConfig()?.fishhook_slot ?? 0));
  const nextRodConfig = libs.createMemo(() => {
    const nextLevel = currentRodLevel() + 1;
    if (nextLevel > maxRodLevel()) {
      return undefined;
    }
    return rodConfigs[String(nextLevel)];
  });
  const nextRodName = libs.createMemo(() => GetLocalization(`#rod_level${currentRodLevel() + 1}`));
  const upgradeCost = libs.createMemo(() => {
    const rawCost = currentRodConfig()?.cost ?? "";
    const [tokenID, amount] = rawCost.split(":");
    const parsedTokenID = Number(tokenID);
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedTokenID) || Number.isNaN(parsedAmount)) {
      return undefined;
    }
    return {
      tokenID: parsedTokenID,
      amount: parsedAmount
    };
  });
  const getUpgradeTokenAmount = () => {
    const cost = upgradeCost();
    if (cost === undefined) {
      return 0;
    }
    return tokenData()?.[cost.tokenID]?.amounts ?? 0;
  };
  const canRodLevelup = libs.createMemo(() => {
    const cost = upgradeCost();
    if (requesting()) {
      return false;
    }
    if (nextRodConfig() === undefined) {
      return false;
    }
    if (cost === undefined) {
      return false;
    }
    return getUpgradeTokenAmount() >= cost.amount;
  });
  const isUpgradeCostInsufficient = () => {
    const cost = upgradeCost();
    if (cost === undefined) {
      return false;
    }
    return getUpgradeTokenAmount() < cost.amount;
  };
  const equippedBaitID = libs.createMemo(() => Number(gameData()?.fish_bait ?? 0) || 0);
  const previewRodEffectMap = libs.createMemo(() => buildFishingRodEffectMap(previewRodConfig()?.effect));
  const visibleRodEffectKeys = libs.createMemo(() => Object.keys(previewRodEffectMap()));
  const visibleRodEffects = libs.createMemo(() => {
    const keys = visibleRodEffectKeys();
    const effects = [];
    for (let index = 0; index < keys.length; index++) {
      const effect = previewRodEffectMap()[keys[index]];
      if (effect !== undefined) {
        effects.push(effect);
      }
    }
    return effects;
  });
  const visibleRodEffectRows = libs.createMemo(() => {
    const effects = visibleRodEffects();
    const rows = [];
    for (let index = 0; index < effects.length; index += 2) {
      rows.push(effects.slice(index, index + 2));
    }
    return rows;
  });
  const isPreviewRodUnlocked = libs.createMemo(() => previewRodLevel() <= currentRodLevel());
  const isPreviewRodEquipped = libs.createMemo(() => previewRodLevel() === equippedRodLevel());
  const previewRodPageText = libs.createMemo(() => `${previewRodLevel() + 1}/${Math.max(rodConfigList().length, 1)}`);
  libs.createMemo(() => {
    if (!isPreviewRodUnlocked()) {
      return "#FishingItem_RodLocked";
    }
    if (isPreviewRodEquipped()) {
      return "#FishingItem_RodEquiped";
    }
    return "#FishingItem_EquipRod";
  });
  libs.createMemo(() => {
    if (requesting()) {
      return false;
    }
    if (rodConfigList().length <= 0) {
      return false;
    }
    if (!isPreviewRodUnlocked()) {
      return false;
    }
    return !isPreviewRodEquipped();
  });
  const isBaitSlotUnlocked = index => index < unlockedBaitSlotCount();
  const isHookSlotUnlocked = index => index < unlockedHookSlotCount();
  const extraCourierSlotCount = libs.createMemo(() => Math.max(0, Number(propertySystem().idle_fish_courier_slot ?? 0) || 0));
  const isCourierSlotUnlocked = index => index === 0 || index < extraCourierSlotCount() + 1;
  const getHookSlotItemID = index => Number(gameData()?.fish_hooks?.[index] ?? 0) || 0;
  const getCourierSlotID = index => Number(gameData()?.fish_courier_ids?.[index] ?? 0) || 0;
  const getTokenAmount = itemID => itemID > 0 ? tokenData()?.[itemID]?.amounts ?? 0 : 0;
  const getCourierInfo = courierID => playerCouriers()?.[String(courierID)];
  const getCourierConfig = courierID => KeyValues.service_courier[String(courierID)];
  const getCourierQuality = courierID => getCourierConfig(courierID)?.quality ?? 0;
  const isSlotUnlocked = (type, index) => {
    if (type === "bait") {
      return isBaitSlotUnlocked(index);
    }
    if (type === "hook") {
      return isHookSlotUnlocked(index);
    }
    return isCourierSlotUnlocked(index);
  };
  const getSlotCount = type => {
    if (type === "bait") {
      return baitSlotCount;
    }
    if (type === "hook") {
      return hookSlotCount;
    }
    return courierSlotCount;
  };
  const getFirstUnlockedSlotIndex = type => {
    const slotCount = getSlotCount(type);
    for (let index = 0; index < slotCount; index++) {
      if (isSlotUnlocked(type, index)) {
        return index;
      }
    }
    return undefined;
  };
  const getEquippedSlotValue = (type, index) => {
    if (type === "bait") {
      return equippedBaitID();
    }
    if (type === "hook") {
      return getHookSlotItemID(index);
    }
    return getCourierSlotID(index);
  };
  const findEquippedSlotIndex = (type, value) => {
    if (value <= 0) {
      return undefined;
    }
    const slotCount = getSlotCount(type);
    for (let index = 0; index < slotCount; index++) {
      if (!isSlotUnlocked(type, index)) {
        continue;
      }
      if (getEquippedSlotValue(type, index) === value) {
        return index;
      }
    }
    return undefined;
  };
  const findFirstEmptyUnlockedSlotIndex = type => {
    const slotCount = getSlotCount(type);
    for (let index = 0; index < slotCount; index++) {
      if (!isSlotUnlocked(type, index)) {
        continue;
      }
      if (getEquippedSlotValue(type, index) <= 0) {
        return index;
      }
    }
    return undefined;
  };
  const getPreferredEquipSlotIndex = type => {
    const currentSlot = selectedSlot();
    if (currentSlot !== undefined && currentSlot.type === type && isSlotUnlocked(type, currentSlot.index) && getEquippedSlotValue(type, currentSlot.index) <= 0) {
      return currentSlot.index;
    }
    const emptySlotIndex = findFirstEmptyUnlockedSlotIndex(type);
    if (emptySlotIndex !== undefined) {
      return emptySlotIndex;
    }
    return getFirstUnlockedSlotIndex(type);
  };
  const [currentViewFishingNoticeKeys, setCurrentViewFishingNoticeKeys] = libs.createSignal({});
  const isFishingNoticeVisibleInCurrentView = key => currentViewFishingNoticeKeys()[key] === true;
  const rememberCurrentViewFishingNoticeKeys = keys => {
    if (keys.length <= 0) {
      return;
    }
    setCurrentViewFishingNoticeKeys(previous => {
      let changed = false;
      const next = {
        ...previous
      };
      for (const key of keys) {
        if (next[key] === true) {
          continue;
        }
        next[key] = true;
        changed = true;
      }
      return changed ? next : previous;
    });
    fishingRedPointState.markFishingNoticeKeysViewed(keys);
  };
  libs.createEffect(() => {
    rememberCurrentViewFishingNoticeKeys(fishingRedPointState.collectOneTimeFishingToolNoticeKeys());
  });
  const shouldShowFishSlotNotice = (type, index) => {
    if (!isSlotUnlocked(type, index)) {
      return false;
    }
    if (getEquippedSlotValue(type, index) > 0) {
      return false;
    }
    const unlockKey = fishingRedPointState.getFishingSlotUnlockNoticeKey(type, index);
    if (isFishingNoticeVisibleInCurrentView(unlockKey)) {
      return true;
    }
    const equipableKey = fishingRedPointState.getFishingSlotEquipableNoticeKey(type);
    return isFishingNoticeVisibleInCurrentView(equipableKey) && fishingRedPointState.hasOwnedFishingTool(type);
  };
  const getFishSlotRedMarkType = (type, index) => {
    if (!isSlotUnlocked(type, index)) {
      return undefined;
    }
    if (fishingRedPointState.isFishingToolTypeNew(type)) {
      return "new";
    }
    return shouldShowFishSlotNotice(type, index) ? "dot" : undefined;
  };
  const clearCurrentFishSlotNotice = (type, index) => {
    const keys = [fishingRedPointState.getFishingSlotUnlockNoticeKey(type, index), fishingRedPointState.getFishingSlotEquipableNoticeKey(type)];
    setCurrentViewFishingNoticeKeys(previous => {
      let changed = false;
      const next = {
        ...previous
      };
      for (const key of keys) {
        if (next[key] !== true) {
          continue;
        }
        delete next[key];
        changed = true;
      }
      return changed ? next : previous;
    });
  };
  const hasUnequippedFishingCourier = libs.createMemo(() => {
    return sortCourierList().some(courierID => findEquippedSlotIndex("courier", Number(courierID) || 0) === undefined);
  });
  const shouldShowCourierSlotNotice = index => {
    return isCourierSlotUnlocked(index) && getCourierSlotID(index) <= 0 && hasUnequippedFishingCourier();
  };
  const getCourierSlotRedMarkType = index => {
    if (!isCourierSlotUnlocked(index)) {
      return undefined;
    }
    if (fishingRedPointState.hasNewFishingCourierNotice()) {
      return "new";
    }
    return shouldShowCourierSlotNotice(index) ? "dot" : undefined;
  };
  const getBaitSlotUnlockLevel = index => {
    const configs = rodConfigList();
    for (let configIndex = 0; configIndex < configs.length; configIndex++) {
      const config = configs[configIndex];
      if (Number(config?.is_bait ?? 0) > index) {
        return String(GetLocalization("rod_level" + (config?.rod_level ?? 0)));
      }
    }
    return GetLocalization("#rod_level0");
  };
  const getHookSlotUnlockLevel = index => {
    const configs = rodConfigList();
    for (let configIndex = 0; configIndex < configs.length; configIndex++) {
      const config = configs[configIndex];
      if (Number(config?.fishhook_slot ?? 0) > index) {
        return String(GetLocalization("rod_level" + (config?.rod_level ?? 0)));
      }
    }
    return GetLocalization("#rod_level0");
  };
  const getFishingSlotUnlockText = (type, index) => {
    if (type === "courier") {
      return "#FishingItem_Unlock_Privilege";
    }
    const unlockLevel = type === "bait" ? getBaitSlotUnlockLevel(index) : getHookSlotUnlockLevel(index);
    if (unlockLevel === undefined) {
      return "#FishingItem_Unlock_NotAvailable";
    }
    return LocalizeWithVars("#FishingItem_Unlock_RodLevel", {
      level: unlockLevel
    });
  };
  const getFishingItemEmptyEffectText = type => {
    if (type === "bait") {
      return "#FishingItem_Empty_Bait";
    }
    if (type === "hook") {
      return "#FishingItem_Empty_Hook";
    }
    return "#FishingItem_Empty_Courier";
  };
  const getFishingCourierSkillByStar = courierID => {
    if (courierID <= 0) {
      return "";
    }
    const courierConfig = getCourierConfig(courierID);
    const courierStar = Math.max(1, Number(getCourierInfo(courierID)?.star ?? 1));
    const skillKey = `fish_skill${courierStar}`;
    const skillText = courierConfig?.[skillKey];
    if (typeof skillText !== "string") {
      return GetLocalization("#FishingItem_Courier_NoEffect", "");
    }
    const effectText = buildFishingCourierSkillText(skillText);
    if (effectText === "") {
      return GetLocalization("#FishingItem_Courier_NoEffect", "");
    }
    return effectText;
  };
  const getFishingCourierTooltipText = courierID => {
    const normalizedCourierID = Number(courierID) || 0;
    if (normalizedCourierID <= 0) {
      return "";
    }
    return getFishingCourierSkillByStar(normalizedCourierID);
  };
  const getFishingCourierTooltipExtraDrops = courierID => {
    const normalizedCourierID = Number(courierID) || 0;
    if (normalizedCourierID <= 0) {
      return "";
    }
    return courier_explore_preview.getCourierExplorePreview(String(normalizedCourierID), playerCouriers() ?? {}, "fish_skill").extraDrops;
  };
  const getFishingCourierTooltip = courierID => {
    return {
      name: "fishing_courier",
      text: getFishingCourierTooltipText(courierID),
      extraDrops: getFishingCourierTooltipExtraDrops(courierID)
    };
  };
  const isPanelValid = panel => {
    return panel !== undefined && panel.IsValid !== undefined && panel.IsValid();
  };
  const showAutoSwitchTooltip = panel => {
    const text = getAutoSwitchToolsTooltipText();
    if (panel === undefined || panel.IsValid === undefined || !panel.IsValid() || text === "") {
      return;
    }
    ShowCustomTooltip(panel, "text", {
      name: "text",
      text
    });
  };
  const hideAutoSwitchTooltip = panel => {
    if (panel === undefined || panel.IsValid === undefined || !panel.IsValid()) {
      return;
    }
    HideCustomTooltip(panel, "text");
  };
  const getAutoSwitchToolsTooltipText = () => {
    if (autoSwitchToolsEnabled()) {
      return GetLocalization("#FishingItem_AutoSwitchTools_Enabled", "");
    }
    return GetLocalization("#FishingItem_AutoSwitchTools_Disabled", "");
  };
  const clearAutoSwitchToolsTooltipHideSchedule = () => {
    if (autoSwitchToolsTooltipHideSchedule !== undefined) {
      $.CancelScheduled(autoSwitchToolsTooltipHideSchedule);
      autoSwitchToolsTooltipHideSchedule = undefined;
    }
  };
  const scheduleAutoSwitchToolsTooltipUnlock = () => {
    clearAutoSwitchToolsTooltipHideSchedule();
    setAutoSwitchToolsTooltipLocked(true);
    autoSwitchToolsTooltipHideSchedule = $.Schedule(1.0, () => {
      autoSwitchToolsTooltipHideSchedule = undefined;
      setAutoSwitchToolsTooltipLocked(false);
    });
  };
  const setAutoSwitchTooltipHoverState = (panel, hovered) => {
    setAutoSwitchToolsTooltipButton(panel);
    setAutoSwitchToolsTooltipHovered(hovered);
  };
  const resetAutoSwitchTooltipState = () => {
    const panel = autoSwitchToolsTooltipButton();
    hideAutoSwitchTooltip(panel);
    clearAutoSwitchToolsTooltipHideSchedule();
    setAutoSwitchToolsTooltipHovered(false);
    setAutoSwitchToolsTooltipLocked(false);
    setAutoSwitchToolsTooltipButton(undefined);
  };
  libs.createEffect(() => {
    if (isListView() !== true) {
      return;
    }
    resetAutoSwitchTooltipState();
  });
  libs.createEffect(() => {
    const currentEnabled = autoSwitchToolsEnabled();
    if (currentEnabled === previousAutoSwitchToolsEnabled) {
      return;
    }
    previousAutoSwitchToolsEnabled = currentEnabled;
    if (currentEnabled) {
      scheduleAutoSwitchToolsTooltipUnlock();
      return;
    }
    clearAutoSwitchToolsTooltipHideSchedule();
    setAutoSwitchToolsTooltipLocked(false);
  });
  libs.createEffect(() => {
    const panel = autoSwitchToolsTooltipButton();
    if (!isPanelValid(panel)) {
      return;
    }
    if (!autoSwitchToolsTooltipVisible()) {
      hideAutoSwitchTooltip(panel);
      return;
    }
    showAutoSwitchTooltip(panel);
  });
  libs.onCleanup(() => {
    resetAutoSwitchTooltipState();
  });
  const getFishingSlotDisplayInfo = (type, index) => {
    const unlocked = isSlotUnlocked(type, index);
    if (!unlocked) {
      return {
        name: "#FishingItem_Status_Locked",
        effect: getFishingSlotUnlockText(type, index)
      };
    }
    const equippedValue = getEquippedSlotValue(type, index);
    if (equippedValue <= 0) {
      return {
        name: "#FishingItem_Status_Unequipped",
        effect: getFishingItemEmptyEffectText(type)
      };
    }
    if (type === "courier") {
      const courierConfig = getCourierConfig(equippedValue);
      return {
        name: GetLocalization(`#${courierConfig?.id}`),
        effect: getFishingCourierSkillByStar(equippedValue)
      };
    }
    return {
      name: GetLocalization(equippedValue + "", "name"),
      effect: GetLocalization(equippedValue + "", "description")
    };
  };
  const assignPayloadSlotValue = (payload, type, index, value) => {
    if (type === "bait") {
      payload.fish_bait = value;
      return;
    }
    if (type === "hook") {
      while (payload.fish_hooks.length <= index) {
        payload.fish_hooks.push(0);
      }
      payload.fish_hooks[index] = value;
      return;
    }
    while (payload.fish_courier_ids.length <= index) {
      payload.fish_courier_ids.push(0);
    }
    payload.fish_courier_ids[index] = value;
  };
  const isSlotSelected = (type, index) => {
    const current = selectedSlot();
    return current?.type === type && current.index === index;
  };
  const handleSlotSelect = (type, index, locked) => {
    if (locked) {
      return;
    }
    const current = selectedSlot();
    if (current?.type === type && current.index === index) {
      setSelectedSlot(undefined);
      return;
    }
    if (type === "bait") {
      setFishTabType("bait");
    } else if (type === "hook") {
      setFishTabType("hook");
    }
    setSelectedSlot({
      type,
      index
    });
  };
  const handleFishTabSelect = type => {
    setFishTabType(type);
    const currentSlot = selectedSlot();
    if (currentSlot === undefined || currentSlot.type === type) {
      return;
    }
    const nextIndex = getFirstUnlockedSlotIndex(type);
    if (nextIndex !== undefined) {
      setSelectedSlot({
        type,
        index: nextIndex
      });
    }
  };
  const handleBackToEquipmentPanel = () => {
    setSelectedSlot(undefined);
  };
  const getCurrentLoadoutPayload = () => {
    const currentData = gameData();
    const fishHooks = [...(currentData?.fish_hooks ?? [])].map(id => Number(id) || 0);
    const fishCourierIDs = [...(currentData?.fish_courier_ids ?? [])].map(id => Number(id) || 0);
    return {
      fish_bait: Number(currentData?.fish_bait ?? 0) || 0,
      fish_hooks: fishHooks,
      fish_courier_ids: fishCourierIDs,
      times: 1,
      auto_switch_tools: currentData?.auto_switch_tools === true
    };
  };
  const sendLoadoutUpdate = payload => {
    payload.fish_courier_ids = payload.fish_courier_ids.map(id => Number(id) || 0).filter(id => id > 0);
    SetRequesting(true);
    CallActionRequest("/v1/idle_game/update_fish_data", payload, () => {
      SetRequesting(false);
    });
  };
  const updateLoadoutSlot = (type, index, value) => {
    if (requesting()) {
      return;
    }
    const normalizedValue = Number(value) || 0;
    if (getEquippedSlotValue(type, index) === normalizedValue) {
      return;
    }
    const payload = getCurrentLoadoutPayload();
    assignPayloadSlotValue(payload, type, index, normalizedValue);
    sendLoadoutUpdate(payload);
  };
  const handleSlotUnequip = (type, index) => {
    if (requesting() || !isSlotUnlocked(type, index)) {
      return;
    }
    if (getEquippedSlotValue(type, index) <= 0) {
      return;
    }
    updateLoadoutSlot(type, index, 0);
  };
  const handleToggleAutoSwitchTools = () => {
    if (requesting()) {
      return;
    }
    const payload = getCurrentLoadoutPayload();
    payload.auto_switch_tools = !autoSwitchToolsEnabled();
    sendLoadoutUpdate(payload);
  };
  const handleFishItemEquip = itemID => {
    if (requesting()) {
      return;
    }
    const normalizedItemID = Number(itemID) || 0;
    if (normalizedItemID <= 0) {
      return;
    }
    fishingRedPointState.markFishingToolNewViewed(normalizedItemID);
    const type = fishTabType();
    const equippedSlotIndex = findEquippedSlotIndex(type, normalizedItemID);
    if (equippedSlotIndex !== undefined) {
      updateLoadoutSlot(type, equippedSlotIndex, 0);
      return;
    }
    const consumeConfig = KeyValues.fish_consume[String(normalizedItemID)];
    const requiredRodLevel = Number(consumeConfig?.required_rod_level ?? 0);
    if (equippedRodLevel() < requiredRodLevel) {
      ErrorMessage(LocalizeWithVars("#FishingItem_Unlock_RodLevel", {
        level: GetLocalization("rod_level" + requiredRodLevel)
      }));
      return;
    }
    const targetSlotIndex = getPreferredEquipSlotIndex(type);
    if (targetSlotIndex === undefined) {
      ErrorMessage("#FishingItem_NoIdleSlot");
      return;
    }
    clearCurrentFishSlotNotice(type, targetSlotIndex);
    updateLoadoutSlot(type, targetSlotIndex, normalizedItemID);
  };
  const handleCourierEquip = courierID => {
    if (requesting()) {
      return;
    }
    const normalizedCourierID = Number(courierID) || 0;
    if (normalizedCourierID <= 0) {
      return;
    }
    const type = "courier";
    const equippedSlotIndex = findEquippedSlotIndex(type, normalizedCourierID);
    if (equippedSlotIndex !== undefined) {
      updateLoadoutSlot(type, equippedSlotIndex, 0);
      return;
    }
    const targetSlotIndex = getPreferredEquipSlotIndex(type);
    if (targetSlotIndex === undefined) {
      return;
    }
    updateLoadoutSlot(type, targetSlotIndex, normalizedCourierID);
  };
  const handleRodLevelup = () => {
    if (!canRodLevelup()) {
      return;
    }
    const highestUnlockedLevel = currentRodLevel();
    const equippedLevelBeforeUpgrade = equippedRodLevel();
    const nextLevel = Math.min(maxRodLevel(), highestUnlockedLevel + 1);
    SetRequesting(true);
    CallActionRequest("/v1/idle_game/levelup_fish_rod", {
      target_level: highestUnlockedLevel + 1
    }, () => {
      SetRequesting(false);
      setPreviewRodIndex(nextLevel);
      if (equippedLevelBeforeUpgrade === highestUnlockedLevel) {
        sendEquipRodDebugEvent(nextLevel);
      }
    });
  };
  const isCurrentSelectedFishItem = itemID => {
    const normalizedItemID = Number(itemID) || 0;
    if (normalizedItemID <= 0) {
      return false;
    }
    if (equippedBaitID() === normalizedItemID) {
      return true;
    }
    return findEquippedSlotIndex("hook", normalizedItemID) !== undefined;
  };
  const isCurrentSelectedCourier = courierID => {
    const normalizedCourierID = Number(courierID) || 0;
    if (normalizedCourierID <= 0) {
      return false;
    }
    return findEquippedSlotIndex("courier", normalizedCourierID) !== undefined;
  };
  const cyclePreviewRod = offset => {
    if (rodConfigList().length <= 0) {
      return;
    }
    setPreviewRodIndex(currentIndex => normalizePreviewRodIndex(currentIndex + offset));
  };
  const sendEquipRodDebugEvent = targetLevel => {
    const playerID = Players.GetLocalPlayer();
    if (playerID === -1 || Players.IsSpectator(playerID) || Players.IsLocalPlayerLiveSpectating()) {
      return;
    }
    GameEvents.SendCustomGameEventToServer("fish_item_change_rod", {
      target_level: targetLevel
    });
  };
  const hasNextRodLevel = libs.createMemo(() => {
    return nextRodConfig() !== undefined && upgradeCost() !== undefined;
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "FishingItem",
    shadow_border: true,
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "FishingItemContent"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "LeftBlock"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "FishRodInfo"
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "FishRodTitle"
        }, _el$3);
        libs.createElement("Panel", {
          id: "FishRodTitileBG"
        }, _el$4);
        const _el$6 = libs.createElement("Label", {
          id: "FishRodName",
          get ["class"]() {
            return previewRodTitleRarityClass();
          },
          get text() {
            return previewRodName();
          }
        }, _el$4),
        _el$7 = libs.createElement("Panel", {
          id: "FishRodBox"
        }, _el$3),
        _el$8 = libs.createElement("Panel", {
          id: "FishRodScene"
        }, _el$7),
        _el$0 = libs.createElement("Panel", {
          id: "PageBar"
        }, _el$3),
        _el$1 = libs.createElement("Label", {
          id: "PageBarLabel",
          get text() {
            return previewRodPageText();
          }
        }, _el$0),
        _el$10 = libs.createElement("Panel", {
          id: "FishingItemEffectList"
        }, _el$3),
        _el$12 = libs.createElement("Panel", {
          id: "FishingItemOpt"
        }, _el$3),
        _el$18 = libs.createElement("Panel", {
          id: "RightBlock"
        }, _el$);
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return previewRodModel() !== "";
        },
        get children() {
          return libs.createComponent(solid_utils.DynamicKey, {
            key: previewRodModel,
            children: model => {
              if (model !== "") {
                return libs.createComponent(fishRod3DPreview.FishRod3DPreview, {
                  "class": "FishRodScenePreview",
                  model: model
                });
              }
            }
          });
        }
      }), null);
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return !isPreviewRodUnlocked();
        },
        get children() {
          return libs.createElement("Label", {
            id: "FishRodLockedTip",
            text: "#FishingItem_RodLocked",
            hittest: false
          }, null);
        }
      }), null);
      libs.insert(_el$0, libs.createComponent(EOM_Button.EOM_BaseButton, {
        get ["class"]() {
          return libs.classNames("SwitchArrow");
        },
        onactivate: () => cyclePreviewRod(-1)
      }), _el$1);
      libs.insert(_el$0, libs.createComponent(EOM_Button.EOM_BaseButton, {
        get ["class"]() {
          return libs.classNames("SwitchArrow", "Right");
        },
        onactivate: () => cyclePreviewRod(1)
      }), null);
      libs.insert(_el$3, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
        id: "FishingItemTitle",
        text: "#Blessing_Effect"
      }), _el$10);
      libs.insert(_el$10, libs.createComponent(libs.Show, {
        get when() {
          return visibleRodEffects().length > 0;
        },
        get fallback() {
          return (() => {
            const _el$46 = libs.createElement("Label", {
              id: "NoEffectTip",
              text: "#FishingItem_NoEffect"
            }, null);
            libs.effect(_$p => libs.setProp(_el$46, "visible", visibleRodEffects().length <= 0, _$p));
            return _el$46;
          })();
        },
        get children() {
          const _el$11 = libs.createElement("Panel", {
            id: "FishingEffectGrid"
          }, null);
          libs.insert(_el$11, libs.createComponent(libs.For, {
            get each() {
              return visibleRodEffectRows();
            },
            children: effectRow => {
              return (() => {
                const _el$47 = libs.createElement("Panel", {
                  "class": "FishingEffectRow"
                }, null);
                libs.insert(_el$47, libs.createComponent(libs.For, {
                  each: effectRow,
                  children: (effect, index) => {
                    return (() => {
                      const _el$48 = libs.createElement("Panel", {}, null);
                        libs.createElement("Image", {
                          "class": "DotIcon"
                        }, _el$48);
                        const _el$50 = libs.createElement("Label", {
                          "class": "EffectText",
                          html: true,
                          get text() {
                            return effect.text;
                          }
                        }, _el$48);
                      libs.effect(_p$ => {
                        const _v$1 = {
                            "FishingItemEffect": true,
                            "Left": index() % 2 === 0,
                            "Right": index() % 2 === 1
                          },
                          _v$10 = effect.text;
                        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$48, "classList", _v$1, _p$._v$1));
                        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$50, "text", _v$10, _p$._v$10));
                        return _p$;
                      }, {
                        _v$1: undefined,
                        _v$10: undefined
                      });
                      return _el$48;
                    })();
                  }
                }));
                return _el$47;
              })();
            }
          }));
          return _el$11;
        }
      }));
      libs.insert(_el$12, libs.createComponent(libs.Show, {
        get when() {
          return hasNextRodLevel();
        },
        get children() {
          const _el$13 = libs.createElement("Panel", {
            id: "UpgradeCard",
            flowChildren: "down"
          }, null);
          libs.setProp(_el$13, "flowChildren", "down");
          libs.insert(_el$13, libs.createComponent(libs.Show, {
            get when() {
              return upgradeCost() !== undefined;
            },
            get children() {
              const _el$14 = libs.createElement("Panel", {
                  id: "UpgradeCost",
                  flowChildren: "right"
                }, null),
                _el$15 = libs.createElement("Panel", {
                  id: "UpgradeCostContent",
                  flowChildren: "right"
                }, _el$14),
                _el$16 = libs.createElement("Label", {
                  id: "UpgradeCostLabel",
                  get text() {
                    return `x ${upgradeCost().amount}`;
                  }
                }, _el$15);
              libs.setProp(_el$14, "flowChildren", "right");
              libs.setProp(_el$15, "flowChildren", "right");
              libs.insert(_el$15, libs.createComponent(Player.CurrencyIcon, {
                id: "UpgradeCostIcon",
                width: "28px",
                height: "28px",
                get tokenID() {
                  return upgradeCost().tokenID;
                }
              }), _el$16);
              libs.effect(_p$ => {
                const _v$ = {
                    Insufficient: isUpgradeCostInsufficient()
                  },
                  _v$2 = `x ${upgradeCost().amount}`;
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$16, "classList", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "text", _v$2, _p$._v$2));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined
              });
              return _el$14;
            }
          }), null);
          libs.insert(_el$13, libs.createComponent(EOM_Button.EOM_Button, {
            id: "UpgradeButton",
            color: "Confirm",
            size: "Normal",
            text: "#FishingItem_Upgrade",
            get enabled() {
              return canRodLevelup();
            },
            onactivate: handleRodLevelup
          }), null);
          libs.insert(_el$13, libs.createComponent(libs.Show, {
            get when() {
              return nextRodConfig() !== undefined;
            },
            get children() {
              const _el$17 = libs.createElement("Label", {
                id: "UpgradeNextRodTip",
                get text() {
                  return `${GetLocalization("#FishingItem_NextLevelPrefix", "")}${nextRodName()}`;
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$17, "text", `${GetLocalization("#FishingItem_NextLevelPrefix", "")}${nextRodName()}`, _$p));
              return _el$17;
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$13, "classList", {
            Half: hasNextRodLevel()
          }, _$p));
          return _el$13;
        }
      }));
      libs.insert(_el$18, libs.createComponent(libs.Show, {
        get when() {
          return !isListView();
        },
        get children() {
          const _el$19 = libs.createElement("Panel", {
              id: "RightPanelContent"
            }, null),
            _el$20 = libs.createElement("Panel", {
              id: "FishRodSlotContainer"
            }, _el$19),
            _el$21 = libs.createElement("Panel", {
              id: "BaitSlotContainer",
              "class": "FishingEquipGroup",
              flowChildren: "down"
            }, _el$20),
            _el$22 = libs.createElement("Panel", {
              id: "BaitSlotTitle",
              "class": "FishingEquipGroupTitle"
            }, _el$21),
            _el$23 = libs.createElement("Image", {
              id: "BaitSlotIcon",
              "class": "FishingEquipGroupTitleIcon",
              get src() {
                return FishingTitleIconSrc.bait;
              }
            }, _el$22);
            libs.createElement("Label", {
              "class": "FishingEquipGroupTitleText",
              text: "#FishingItem_Bait"
            }, _el$22);
            const _el$25 = libs.createElement("Panel", {
              "class": "FishingEquipGroupList",
              flowChildren: "down"
            }, _el$21),
            _el$26 = libs.createElement("Panel", {
              id: "HookSlotContainer",
              "class": "FishingEquipGroup",
              flowChildren: "down"
            }, _el$20),
            _el$27 = libs.createElement("Panel", {
              id: "HookSlotTitle",
              "class": "FishingEquipGroupTitle"
            }, _el$26),
            _el$28 = libs.createElement("Image", {
              id: "HookSlotIcon",
              "class": "FishingEquipGroupTitleIcon",
              get src() {
                return FishingTitleIconSrc.hook;
              }
            }, _el$27);
            libs.createElement("Label", {
              "class": "FishingEquipGroupTitleText",
              text: "#FishingItem_Hook"
            }, _el$27);
            const _el$30 = libs.createElement("Panel", {
              "class": "FishingEquipGroupList",
              flowChildren: "down"
            }, _el$26),
            _el$31 = libs.createElement("Panel", {
              id: "CourierSlotContainer",
              "class": "FishingEquipGroup"
            }, _el$20),
            _el$32 = libs.createElement("Panel", {
              id: "CourierSlotTitle",
              "class": "FishingEquipGroupTitle"
            }, _el$31),
            _el$33 = libs.createElement("Image", {
              id: "CourierSlotIcon",
              "class": "FishingEquipGroupTitleIcon",
              get src() {
                return FishingTitleIconSrc.courier;
              }
            }, _el$32);
            libs.createElement("Label", {
              "class": "FishingEquipGroupTitleText",
              text: "#FishingItem_Courier"
            }, _el$32);
            const _el$35 = libs.createElement("Panel", {
              "class": "FishingEquipGroupList",
              flowChildren: "down"
            }, _el$31);
          libs.setProp(_el$21, "flowChildren", "down");
          libs.setProp(_el$25, "flowChildren", "down");
          libs.insert(_el$25, () => [...Array(baitSlotCount)].map((_, index) => {
            const itemID = () => equippedBaitID();
            const unlocked = () => isBaitSlotUnlocked(index);
            const slotInfo = () => getFishingSlotDisplayInfo("bait", index);
            const slotRedMarkType = () => getFishSlotRedMarkType("bait", index);
            return (() => {
              const _el$51 = libs.createElement("Panel", {
                  "class": "FishingEquipRow"
                }, null),
                _el$52 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("FishItemSlot", {
                      Empty: unlocked() && itemID() <= 0,
                      Locked: !unlocked(),
                      Selected: isSlotSelected("bait", index)
                    });
                  }
                }, _el$51),
                _el$53 = libs.createElement("Panel", {
                  "class": "FishItemIconCard"
                }, _el$52),
                _el$54 = libs.createElement("Image", {
                  "class": "AddIcon"
                }, _el$53);
                libs.createElement("Image", {
                  "class": "LockIcon"
                }, _el$53);
                libs.createElement("Panel", {
                  "class": "SelectedBorder"
                }, _el$53);
                const _el$57 = libs.createElement("Panel", {
                  "class": "FishingEquipInfo"
                }, _el$51),
                _el$58 = libs.createElement("Label", {
                  "class": "FishItemName",
                  get text() {
                    return slotInfo().name;
                  }
                }, _el$57),
                _el$59 = libs.createElement("Label", {
                  "class": "FishItemEffect",
                  html: true,
                  get text() {
                    return slotInfo().effect;
                  }
                }, _el$57),
                _el$60 = libs.createElement("Panel", {
                  "class": "FishingEquipAction"
                }, _el$51);
              libs.setProp(_el$52, "onactivate", () => {
                clearCurrentFishSlotNotice("bait", index);
                handleSlotSelect("bait", index, !unlocked());
              });
              libs.setProp(_el$52, "oncontextmenu", () => handleSlotUnequip("bait", index));
              libs.insert(_el$53, libs.createComponent(libs.Show, {
                get when() {
                  return itemID() > 0;
                },
                get children() {
                  return libs.createComponent(StoreItem.StoreItemBlock, {
                    classList: {
                      FishItem_Item: true,
                      SlotItemContent: true
                    },
                    get item_id() {
                      return itemID();
                    },
                    get amounts() {
                      return getTokenAmount(itemID());
                    },
                    hittest: false
                  });
                }
              }), _el$54);
              libs.insert(_el$53, libs.createComponent(libs.Show, {
                get when() {
                  return slotRedMarkType() !== undefined;
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    "class": "FishingSlotRedMark",
                    get type() {
                      return slotRedMarkType();
                    },
                    hittest: false
                  });
                }
              }), null);
              libs.insert(_el$60, libs.createComponent(EOM_Button.EOM_BaseButton, {
                get classList() {
                  return {
                    AutoFillButton: true,
                    Enabled: autoSwitchToolsEnabled(),
                    Disabled: !autoSwitchToolsEnabled()
                  };
                },
                ref: panel => setAutoSwitchToolsTooltipButton(panel),
                get enabled() {
                  return !requesting();
                },
                onmouseover: panel => setAutoSwitchTooltipHoverState(panel, true),
                onmouseout: panel => setAutoSwitchTooltipHoverState(panel, false),
                onactivate: handleToggleAutoSwitchTools
              }));
              libs.effect(_p$ => {
                const _v$11 = libs.classNames("FishItemSlot", {
                    Empty: unlocked() && itemID() <= 0,
                    Locked: !unlocked(),
                    Selected: isSlotSelected("bait", index)
                  }),
                  _v$12 = slotInfo().name,
                  _v$13 = slotInfo().effect;
                _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$52, "class", _v$11, _p$._v$11));
                _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$58, "text", _v$12, _p$._v$12));
                _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$59, "text", _v$13, _p$._v$13));
                return _p$;
              }, {
                _v$11: undefined,
                _v$12: undefined,
                _v$13: undefined
              });
              return _el$51;
            })();
          }));
          libs.setProp(_el$26, "flowChildren", "down");
          libs.setProp(_el$30, "flowChildren", "down");
          libs.insert(_el$30, () => [...Array(hookSlotCount)].map((_, index) => {
            const itemID = () => getHookSlotItemID(index);
            const unlocked = () => isHookSlotUnlocked(index);
            const slotInfo = () => getFishingSlotDisplayInfo("hook", index);
            const slotRedMarkType = () => getFishSlotRedMarkType("hook", index);
            return (() => {
              const _el$61 = libs.createElement("Panel", {
                  "class": "FishingEquipRow"
                }, null),
                _el$62 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("FishItemSlot", {
                      Empty: unlocked() && itemID() <= 0,
                      Locked: !unlocked(),
                      Selected: isSlotSelected("hook", index)
                    });
                  }
                }, _el$61),
                _el$63 = libs.createElement("Panel", {
                  "class": "FishItemIconCard"
                }, _el$62),
                _el$64 = libs.createElement("Image", {
                  "class": "AddIcon"
                }, _el$63);
                libs.createElement("Image", {
                  "class": "LockIcon"
                }, _el$63);
                libs.createElement("Panel", {
                  "class": "SelectedBorder",
                  hittest: false
                }, _el$63);
                const _el$67 = libs.createElement("Panel", {
                  "class": "FishingEquipInfo"
                }, _el$61),
                _el$68 = libs.createElement("Label", {
                  "class": "FishItemName",
                  get text() {
                    return slotInfo().name;
                  }
                }, _el$67),
                _el$69 = libs.createElement("Label", {
                  "class": "FishItemEffect",
                  html: true,
                  get text() {
                    return slotInfo().effect;
                  }
                }, _el$67);
              libs.setProp(_el$62, "onactivate", () => {
                clearCurrentFishSlotNotice("hook", index);
                handleSlotSelect("hook", index, !unlocked());
              });
              libs.setProp(_el$62, "oncontextmenu", () => handleSlotUnequip("hook", index));
              libs.insert(_el$63, libs.createComponent(libs.Show, {
                get when() {
                  return itemID() > 0;
                },
                get children() {
                  return libs.createComponent(StoreItem.StoreItemBlock, {
                    classList: {
                      FishItem_Item: true,
                      SlotItemContent: true
                    },
                    get item_id() {
                      return itemID();
                    },
                    get amounts() {
                      return getTokenAmount(itemID());
                    },
                    hittest: false
                  });
                }
              }), _el$64);
              libs.insert(_el$63, libs.createComponent(libs.Show, {
                get when() {
                  return slotRedMarkType() !== undefined;
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    "class": "FishingSlotRedMark",
                    get type() {
                      return slotRedMarkType();
                    },
                    hittest: false
                  });
                }
              }), null);
              libs.effect(_p$ => {
                const _v$14 = libs.classNames("FishItemSlot", {
                    Empty: unlocked() && itemID() <= 0,
                    Locked: !unlocked(),
                    Selected: isSlotSelected("hook", index)
                  }),
                  _v$15 = slotInfo().name,
                  _v$16 = slotInfo().effect;
                _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$62, "class", _v$14, _p$._v$14));
                _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$68, "text", _v$15, _p$._v$15));
                _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$69, "text", _v$16, _p$._v$16));
                return _p$;
              }, {
                _v$14: undefined,
                _v$15: undefined,
                _v$16: undefined
              });
              return _el$61;
            })();
          }));
          libs.setProp(_el$35, "flowChildren", "down");
          libs.insert(_el$35, () => [...Array(courierSlotCount)].map((_, index) => {
            const courierID = () => getCourierSlotID(index);
            const courierInfo = () => getCourierInfo(courierID());
            const unlocked = () => isCourierSlotUnlocked(index);
            const slotInfo = () => getFishingSlotDisplayInfo("courier", index);
            const slotRedMarkType = () => getCourierSlotRedMarkType(index);
            return (() => {
              const _el$70 = libs.createElement("Panel", {
                  "class": "FishingEquipRow CourierEquipRow"
                }, null),
                _el$71 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("CourierSlot", {
                      Empty: unlocked() && courierID() <= 0,
                      Locked: !unlocked(),
                      Selected: isSlotSelected("courier", index)
                    });
                  }
                }, _el$70),
                _el$72 = libs.createElement("Panel", {
                  "class": "FishCourierIconCard"
                }, _el$71),
                _el$73 = libs.createElement("Image", {
                  "class": "AddIcon"
                }, _el$72);
                libs.createElement("Image", {
                  "class": "LockIcon"
                }, _el$72);
                libs.createElement("Image", {
                  "class": "LockBorder"
                }, _el$72);
                libs.createElement("Panel", {
                  "class": "SelectedBorder",
                  hittest: false
                }, _el$72);
                const _el$77 = libs.createElement("Panel", {
                  "class": "FishingEquipInfo CourierEquipInfo"
                }, _el$70),
                _el$78 = libs.createElement("Label", {
                  "class": "FishItemName",
                  get text() {
                    return slotInfo().name;
                  }
                }, _el$77),
                _el$79 = libs.createElement("Label", {
                  "class": "FishItemEffect",
                  html: true,
                  get text() {
                    return slotInfo().effect;
                  }
                }, _el$77);
              libs.setProp(_el$71, "onactivate", () => {
                handleSlotSelect("courier", index, !unlocked());
              });
              libs.setProp(_el$71, "oncontextmenu", () => handleSlotUnequip("courier", index));
              libs.insert(_el$72, libs.createComponent(libs.Show, {
                get when() {
                  return courierID() > 0;
                },
                get children() {
                  return libs.createComponent(courier_card.CourierCard, {
                    "class": "CourierSlotCard",
                    get courier_id() {
                      return courierID();
                    },
                    get star() {
                      return courierInfo()?.star ?? 1;
                    },
                    get quality() {
                      return getCourierQuality(courierID());
                    },
                    equipped: false,
                    assisted: false,
                    selected: false,
                    showLock: false,
                    toolOnly: false,
                    get customTooltip() {
                      return getFishingCourierTooltip(courierID());
                    }
                  });
                }
              }), _el$73);
              libs.insert(_el$72, libs.createComponent(libs.Show, {
                get when() {
                  return slotRedMarkType() !== undefined;
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    "class": "FishingSlotRedMark CourierSlotRedMark",
                    get type() {
                      return slotRedMarkType();
                    },
                    hittest: false
                  });
                }
              }), null);
              libs.effect(_p$ => {
                const _v$17 = libs.classNames("CourierSlot", {
                    Empty: unlocked() && courierID() <= 0,
                    Locked: !unlocked(),
                    Selected: isSlotSelected("courier", index)
                  }),
                  _v$18 = slotInfo().name,
                  _v$19 = slotInfo().effect;
                _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$71, "class", _v$17, _p$._v$17));
                _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$78, "text", _v$18, _p$._v$18));
                _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$79, "text", _v$19, _p$._v$19));
                return _p$;
              }, {
                _v$17: undefined,
                _v$18: undefined,
                _v$19: undefined
              });
              return _el$70;
            })();
          }));
          libs.effect(_p$ => {
            const _v$3 = FishingTitleIconSrc.bait,
              _v$4 = FishingTitleIconSrc.hook,
              _v$5 = FishingTitleIconSrc.courier;
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$23, "src", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$28, "src", _v$4, _p$._v$4));
            _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$33, "src", _v$5, _p$._v$5));
            return _p$;
          }, {
            _v$3: undefined,
            _v$4: undefined,
            _v$5: undefined
          });
          return _el$19;
        }
      }), null);
      libs.insert(_el$18, libs.createComponent(libs.Show, {
        get when() {
          return isListView();
        },
        get children() {
          const _el$36 = libs.createElement("Panel", {
              id: "RightListContent"
            }, null),
            _el$37 = libs.createElement("Panel", {
              id: "RightListHeader"
            }, _el$36),
            _el$39 = libs.createElement("Panel", {
              id: "RightListBody"
            }, _el$36),
            _el$40 = libs.createElement("Panel", {
              id: "FishingItemListContainer"
            }, _el$39),
            _el$41 = libs.createElement("Panel", {
              id: "Tabs"
            }, _el$40),
            _el$42 = libs.createElement("Panel", {
              id: "CourierInfo"
            }, _el$39),
            _el$43 = libs.createElement("Panel", {
              "class": "CourierInfoTitle"
            }, _el$42),
            _el$44 = libs.createElement("Image", {
              "class": "CourierInfoTitleIcon",
              get src() {
                return FishingTitleIconSrc.courier;
              }
            }, _el$43);
            libs.createElement("Label", {
              "class": "CourierInfoTitleText",
              text: "#MenuTabButton_Courier"
            }, _el$43);
          libs.insert(_el$37, libs.createComponent(EOM_Button.EOM_BaseButton, {
            "class": "BackRightContainerButton",
            onactivate: handleBackToEquipmentPanel,
            get children() {
              return libs.createElement("Image", {
                id: "BackRightContainerIcon"
              }, null);
            }
          }));
          libs.insert(_el$41, libs.createComponent(libs.For, {
            each: FishItemTypeList,
            children: item => {
              return libs.createComponent(equipment_comp.MenuTabButton, {
                get name() {
                  return item.name;
                },
                get icon() {
                  return item.icon;
                },
                get selected() {
                  return fishTabType() === item.tabType;
                },
                clickCallback: () => {
                  handleFishTabSelect(item.tabType);
                }
              });
            }
          }));
          libs.insert(_el$40, libs.createComponent(RecycleView.RecycleView, {
            id: "FishingItemList",
            input: () => visibleFishItems(),
            direction: "VerticalGrid",
            childConfig: {
              width: 88,
              height: 88,
              margin: 2
            },
            wheelStep: 94,
            grid_children: () => libs.createElement("Panel", {
              "class": "EquipListGrid"
            }, null),
            children: item => {
              const config = () => item();
              const amount = () => tokenData()?.[config().id]?.amounts ?? 0;
              const itemType = () => fishingRedPointState.getFishingToolTypeByItemID(config().id);
              const itemNew = () => fishingRedPointState.isFishingToolNew(config().id);
              return libs.createComponent(StoreItem.StoreItemBlock, {
                get classList() {
                  return {
                    FishItem_Item: true,
                    Selected: isCurrentSelectedFishItem(config().id)
                  };
                },
                get item_id() {
                  return config().id;
                },
                get amounts() {
                  return amount();
                },
                onmouseover: () => {
                  if (itemType() !== undefined) {
                    fishingRedPointState.markFishingToolNewViewed(config().id);
                  }
                },
                onactivate: () => handleFishItemEquip(config().id),
                get children() {
                  return [libs.createElement("Panel", {
                    "class": "SelectedBorder",
                    hittest: false
                  }, null), libs.createComponent(libs.Show, {
                    get when() {
                      return itemNew();
                    },
                    get children() {
                      return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                        type: "new",
                        hittest: false
                      });
                    }
                  })];
                }
              });
            }
          }), null);
          libs.insert(_el$42, libs.createComponent(RecycleView.RecycleView, {
            id: "CourierList",
            input: () => sortCourierList(),
            direction: "VerticalGrid",
            wheelStep: 121,
            childConfig: {
              width: 94,
              height: 141
            },
            children: _courierID => {
              const courierData = KeyValues.service_courier[_courierID()];
              const quality = () => courierData?.quality ?? 0;
              const playerCourier = () => playerCouriers()?.[_courierID()];
              const currentStar = () => playerCourier()?.star ?? 0;
              return (() => {
                const _el$82 = libs.createElement("Panel", {
                    "class": "CourierCardContainer",
                    hittest: false
                  }, null),
                  _el$83 = libs.createElement("Panel", {
                    "class": "CourierCardStarList",
                    hittest: false
                  }, _el$82);
                libs.insert(_el$82, libs.createComponent(courier_card.CourierCard, {
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
                    return isCurrentSelectedCourier(_courierID());
                  },
                  toolOnly: false,
                  onmouseover: p => {
                    let data = getFishingCourierTooltip(_courierID());
                    ShowCustomTooltip(p, data.name, {
                      text: data.text
                    });
                  },
                  onmouseout: p => {
                    let data = getFishingCourierTooltip(_courierID());
                    HideCustomTooltip(p, data.name);
                  },
                  onactivate: () => {
                    fishingRedPointState.markFishingCourierNewViewed(_courierID());
                    handleCourierEquip(_courierID());
                  }
                }), _el$83);
                libs.insert(_el$82, libs.createComponent(libs.Show, {
                  get when() {
                    return fishingRedPointState.isFishingCourierNew(_courierID());
                  },
                  get children() {
                    return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                      type: "new",
                      hittest: false
                    });
                  }
                }), _el$83);
                libs.insert(_el$83, libs.createComponent(libs.For, {
                  each: [1, 2, 3, 4, 5, 6],
                  children: idx => {
                    return (() => {
                      const _el$84 = libs.createElement("Image", {
                        "class": "CourierStar"
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$84, "visible", currentStar() >= idx, _$p));
                      return _el$84;
                    })();
                  }
                }));
                return _el$82;
              })();
            }
          }), null);
          libs.effect(_p$ => {
            const _v$6 = {
                CourierSelected: isCourierView()
              },
              _v$7 = FishingTitleIconSrc.courier;
            _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$36, "classList", _v$6, _p$._v$6));
            _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$44, "src", _v$7, _p$._v$7));
            return _p$;
          }, {
            _v$6: undefined,
            _v$7: undefined
          });
          return _el$36;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$8 = previewRodTitleRarityClass(),
          _v$9 = previewRodName(),
          _v$0 = previewRodPageText();
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$6, "class", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$6, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$1, "text", _v$0, _p$._v$0));
        return _p$;
      }, {
        _v$8: undefined,
        _v$9: undefined,
        _v$0: undefined
      });
      return _el$;
    }
  });
};

function getRodSlotUnlockLevel(itemData) {
  let unlockLevel = 0;
  for (const itemID in itemData.items ?? {}) {
    const consumeConfig = KeyValues.fish_consume[itemID];
    if (consumeConfig?.type == "bait" || consumeConfig?.type == "fishhook") {
      unlockLevel = Math.max(unlockLevel, Number(consumeConfig.required_rod_level ?? 0));
    }
  }
  return unlockLevel > 0 ? unlockLevel : undefined;
}
function getFishingStoreDisableText(itemData, rodLevel) {
  const unlockLevel = getRodSlotUnlockLevel(itemData);
  if (unlockLevel != undefined && rodLevel < unlockLevel) {
    return LocalizeWithVars("#FishingItem_Unlock_RodLevel", {
      level: GetLocalization("rod_level" + unlockLevel)
    });
  }
  return undefined;
}
function getFishingStoreItems(infoProducts) {
  const result = [];
  const now = Date.now() / 1000;
  for (const itemname in KeyValues.info_shop_product) {
    const itemdata = KeyValues.info_shop_product[itemname];
    const info_product = infoProducts[itemdata.id];
    const effective_start_time = info_product ? info_product.start_time : itemdata.start_time;
    const effective_end_time = info_product ? info_product.end_time : itemdata.end_time;
    if ((effective_start_time < now || effective_start_time == 0) && (effective_end_time > now || effective_end_time == 0) && (itemdata.hide_time > now || !itemdata.hide_time) && itemdata.hide == 0 || itemdata.tag == "Privilege") {
      const tags = itemdata.tag.split("|");
      if (tags.includes("Fish")) {
        result.push(itemdata);
      }
    }
  }
  result.sort((a, b) => b.orderby - a.orderby);
  return result;
}
function FishingStore() {
  const infoProducts = solid_utils.createGlobalServiceNetData("info_products", {});
  const purchasedProduct = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const fishGameData = solid_utils.createServiceNetData("player_idle_game_fish_data", {
    equipment_level: 0,
    rod_level: 0,
    fish_bait: 0,
    fish_hooks: [],
    fish_courier_ids: [],
    times: 1,
    auto_switch_tools: false,
    aquarium_level: 0
  });
  const storeItems = libs.createMemo(() => getFishingStoreItems(infoProducts()));
  const currentRodLevel = libs.createMemo(() => Number(fishGameData()?.rod_level ?? 0));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "FishingStore",
    shadow_border: true,
    get children() {
      const _el$ = libs.createElement("Panel", {
        id: "FishingStoreList",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, null);
      libs.setProp(_el$, "scroll", "y");
      libs.insert(_el$, libs.createComponent(libs.Index, {
        get each() {
          return storeItems();
        },
        children: data => {
          const btnDisableText = libs.createMemo(() => getFishingStoreDisableText(data(), currentRodLevel()));
          return libs.createComponent(StoreItem.StoreItem, {
            get itemid() {
              return data().id;
            },
            get purchased_num() {
              return purchasedProduct()[data().id];
            },
            get btnDisable() {
              return btnDisableText() != undefined;
            },
            get btnDisableText() {
              return btnDisableText();
            }
          });
        }
      }));
      return _el$;
    }
  });
}

const MENU_LIST = {
  Aquarium: [],
  FishingBag: [],
  Collection_Menu_fish: [],
  FishingItem: [],
  Fish: []
};
const {
  LayoutMenu,
  show,
  menuName,
  setMenuName
} = EOM_MenuLayout.createMenuLayout("fishingitem", () => MENU_LIST);
libs.createEffect(libs.on(menuName, (name, prev) => {
  if (name == "Aquarium") {
    setMenuName(prev ?? "FishingBag");
    JumpToMenu({
      window_name: "aquarium",
      force: true
    });
  }
}));
function Book() {
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(FishingItemPage, {});
    }
  });
}
function FishingItemPage() {
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "FishingItemRoot",
    name: "MenuButton_fishingitem",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(Player.CurrencyGroup, {
        currencyType: "top",
        tokens: [110003, 110004]
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "FishingItem";
            },
            get children() {
              return libs.createComponent(FishingItem, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "FishingBag";
            },
            get children() {
              return libs.createComponent(FishingBag, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Fish";
            },
            get children() {
              return libs.createComponent(FishingStore, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Collection_Menu_fish";
            },
            get children() {
              return libs.createComponent(FishCollection, {});
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(Book, {}), $.GetContextPanel());