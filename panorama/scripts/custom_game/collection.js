--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('collection', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_CostLabel = require('./EOM_CostLabel.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');

const collectionTypeList = {};
Object.entries(KeyValues.collection).forEach(([, data]) => {
  if (Number(data.hide ?? 0) === 1) return;
  const rarity = GetServiceItemRarity(data.id);
  collectionTypeList[data.type] ??= {};
  collectionTypeList[data.type][rarity] ??= [];
  collectionTypeList[data.type][rarity].push(data);
});
function getFirstVisibleCollectionID(list) {
  const rarityList = Object.keys(list).map(rarity => Number(rarity)).sort((a, b) => b - a);
  for (const rarity of rarityList) {
    const collection = list[String(rarity)]?.[0];
    if (collection != undefined) return collection.id.toString();
  }
  return "";
}
const player_collections = solid_utils.createServiceNetData("player_collections", {});
libs.createEffect(() => {
  ["collection"].forEach(type => {
    let canLevelUp = false;
    const typeCollections = collectionTypeList[type];
    if (typeCollections) {
      for (const rarity in typeCollections) {
        for (const collection of typeCollections[rarity]) {
          const collectionData = player_collections()[collection.id];
          if (!collectionData) continue;
          const rarityLevelConfig = KeyValues.collection_level_up[type]?.[String(rarity)] ?? {};
          const levelCost = rarityLevelConfig[String(collectionData.level)]?.level_cost;
          if (Boolean(levelCost) && collectionData.extra_exp >= levelCost) {
            canLevelUp = true;
            break;
          }
        }
        if (canLevelUp) break;
      }
    }
    CustomUIConfig.SetRedPoint(canLevelUp, "book", "Collection_Menu", `Collection_Menu_${type}`);
    CustomUIConfig.SetRedPoint(canLevelUp, "explore", "Collection_Menu", `Collection_Menu_${type}`);
  });
});
const Collection = props => {
  const collectionList = libs.createMemo(() => {
    return collectionTypeList[props.type] ?? {};
  });
  const [selectedID, SetSelectedID] = libs.createSignal(getFirstVisibleCollectionID(collectionTypeList[props.type] ?? {}));
  libs.createEffect(libs.on(() => props.type, () => {
    const collectionID = getFirstVisibleCollectionID(collectionList());
    if (collectionID !== "") {
      SetSelectedID(collectionID);
    }
  }));
  const selectedData = libs.createMemo(() => KeyValues.collection[selectedID()]);
  const selectedItemRarity = libs.createMemo(() => GetServiceItemRarity(selectedID()));
  const selectedLevelUpConfig = libs.createMemo(() => {
    return KeyValues.collection_level_up[props.type]?.[String(selectedItemRarity())] ?? {};
  });
  const getAttributeText = (multiplier = 1) => Object.entries(selectedData().attribute).map(([attribute, value]) => GetPropertyLocalization(attribute, Float(toFiniteNumber(value) * multiplier))).join("<br>");
  const viewCollectionData = libs.createMemo(() => player_collections()[selectedID()] ?? {
    collection_id: selectedID(),
    extra_exp: 0,
    level: 0,
    collection_type: props.type
  });
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
      const rarityLevelConfig = KeyValues.collection_level_up[props.type]?.[rarity] ?? {};
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
  let scheduledAutoScrollType;
  let autoScrollCompletedType;
  libs.createEffect(() => {
    const collectionType = props.type;
    if (autoScrollCompletedType === collectionType) return;
    if (firstUpgradeableCollectionScrollSchedule != undefined) {
      if (scheduledAutoScrollType === collectionType) return;
      try {
        $.CancelScheduled(firstUpgradeableCollectionScrollSchedule);
      } catch (error) {}
      firstUpgradeableCollectionScrollSchedule = undefined;
    }
    if (getFirstUpgradeableCollection() == undefined) return;
    scheduledAutoScrollType = collectionType;
    firstUpgradeableCollectionScrollSchedule = $.Schedule(0, () => {
      firstUpgradeableCollectionScrollSchedule = undefined;
      if (props.type !== collectionType) return;
      const firstUpgradeableCollection = getFirstUpgradeableCollection();
      if (firstUpgradeableCollection == undefined) return;
      const collectionID = String(firstUpgradeableCollection.id);
      SetSelectedID(collectionID);
      const collectionCard = collectionCardRefs[collectionID];
      if (!collectionCard?.IsValid()) return;
      collectionCard.ScrollParentToMakePanelFit(3, true);
      autoScrollCompletedType = collectionType;
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
        get visible() {
          return props.type == "fish";
        },
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
            onactivate: self => {
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
        children: rarity => {
          return [(() => {
            const _el$20 = libs.createElement("Panel", {
                "class": "CollectionRarityTitle Rarity" + rarity
              }, null),
              _el$21 = libs.createElement("Label", {
                "class": "RarityTitle",
                get text() {
                  return `#Collection_Rarity_${props.type}${rarity}`;
                }
              }, _el$20);
            libs.setProp(_el$20, "class", "CollectionRarityTitle Rarity" + rarity);
            libs.effect(_$p => libs.setProp(_el$21, "text", `#Collection_Rarity_${props.type}${rarity}`, _$p));
            return _el$20;
          })(), libs.createComponent(libs.For, {
            get each() {
              return collectionList()[rarity];
            },
            children: ({
              id,
              attribute,
              privilege_effect
            }) => {
              const collectionData = () => player_collections()[id] ?? {
                collection_id: id,
                extra_exp: 0,
                level: 0,
                collection_type: props.type
              };
              let canLevelUp = () => {
                const rarityLevelConfig = KeyValues.collection_level_up[props.type]?.[String(rarity)] ?? {};
                let max = rarityLevelConfig[String(collectionData().level)]?.level_cost;
                return Boolean(max) && collectionData().extra_exp >= max;
              };
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
                    return canLevelUp();
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
          })];
        }
      }));
      libs.insert(_el$18, libs.createComponent(EOM_Button.EOM_Button, {
        id: "BatchUpgradeBtn",
        text: "#TreasureFastUpgradeBtn",
        color: "Gold",
        get enabled() {
          return libs.memo(() => !!!requesting())() && anyCanLevelUp();
        },
        onactivate: self => {
          if (requesting()) return;
          if (!anyCanLevelUp()) return;
          SetRequesting(true);
          CallActionRequest("/v1/collection/levelup", {
            collection_id: 0,
            collection_type: props.type
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

exports.Collection = Collection;