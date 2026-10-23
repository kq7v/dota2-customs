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
var StoreTagPage = require('./StoreTagPage.js');
var solid_utils = require('./solid_utils.js');
var EOM_CostLabel = require('./EOM_CostLabel.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');
var number_format = require('./number_format.js');
var EOM_ToggleButton = require('./EOM_ToggleButton.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
var RecycleView = require('./RecycleView.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const TREASURE_RARITY_LEVEL_LIMIT_TOOLTIPS = {
  2: "#TreasureRarityLevelLimit2",
  3: "#TreasureRarityLevelLimit3",
  4: "#TreasureRarityLevelLimit4",
  5: "#TreasureRarityLevelLimit5"
};
function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}
function attributeTexts(attribute) {
  return Object.entries(attribute ?? {}).map(([attributeName, value]) => {
    return GetPropertyLocalization(attributeName, toFiniteNumber(value, 0));
  });
}
function privilegeTexts(effect, level) {
  if (!effect) return [];
  return effect.split("|").map(privilege => {
    const privilegeID = privilege.trim();
    if (!privilegeID) return "";
    const privilegeData = KeyValues.privilege[privilegeID];
    if (privilegeData == undefined) return "";
    return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilegeID}`, ""), privilegeData.AbilityValues, {
      level,
      onlyShowNowLevel: true
    });
  }).filter(text => text != "");
}
function levelEffectTexts(data, level) {
  return [...attributeTexts(data.attribute), ...privilegeTexts(data.effect, level)].filter(text => text != "");
}
function CurrentAttributeRow(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "CurrentAttributeRow"
      }, null);
      libs.createElement("Image", {
        "class": "CurrentAttributeRowDot"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        "class": "CurrentAttributeRowContent"
      }, _el$);
      libs.createElement("Image", {
        "class": "CurrentAttributeRowBG"
      }, _el$3);
      const _el$5 = libs.createElement("Label", {
        "class": "CurrentAttributeRowText",
        html: true,
        get text() {
          return props.text;
        }
      }, _el$3);
    libs.effect(_$p => libs.setProp(_el$5, "text", props.text, _$p));
    return _el$;
  })();
}
function LevelEffectRow(props) {
  const hasExp = libs.createMemo(() => {
    return props.expItemID != undefined && (props.expAmount ?? 0) > 0;
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        "class": "LevelEffectRow"
      }, null),
      _el$7 = libs.createElement("Panel", {
        "class": "LevelEffectRowDotContent"
      }, _el$6);
      libs.createElement("Image", {
        "class": "LevelEffectRowDot"
      }, _el$7);
      const _el$9 = libs.createElement("Label", {
        "class": "LevelEffectRowLevelText",
        get text() {
          return `${props.level}`;
        }
      }, _el$7),
      _el$0 = libs.createElement("Panel", {}, _el$6);
      libs.createElement("Image", {
        "class": "LevelEffectRowDescriptionBG"
      }, _el$0);
      const _el$10 = libs.createElement("Panel", {
        "class": "LevelEffectRowDescriptionList"
      }, _el$0);
    libs.insert(_el$10, libs.createComponent(libs.For, {
      get each() {
        return props.effectTexts;
      },
      children: (text, index) => (() => {
        const _el$15 = libs.createElement("Label", {
          html: true,
          text: text
        }, null);
        libs.setProp(_el$15, "text", text);
        libs.effect(_$p => libs.setProp(_el$15, "classList", {
          "LevelEffectRowDescriptionText": true,
          "FirstRow": index() === 0
        }, _$p));
        return _el$15;
      })()
    }));
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return hasExp();
      },
      get children() {
        const _el$11 = libs.createElement("Panel", {
            "class": "LevelEffectRowExpContent"
          }, null);
          libs.createElement("Image", {
            "class": "LevelEffectRowExpBG"
          }, _el$11);
          const _el$13 = libs.createElement("Panel", {
            "class": "LevelEffectRowExpDescrioption"
          }, _el$11),
          _el$14 = libs.createElement("Label", {
            "class": "LevelEffectRowExpText",
            get text() {
              return `+${props.expAmount}`;
            }
          }, _el$13);
        libs.insert(_el$13, libs.createComponent(StoreItem.StoreItemImage, {
          itemid: 210002
        }), _el$14);
        libs.effect(_$p => libs.setProp(_el$14, "text", `+${props.expAmount}`, _$p));
        return _el$11;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          Locked: props.locked
        },
        _v$2 = `${props.level}`,
        _v$3 = {
          "LevelEffectRowDescriptionContent": true,
          "WithExp": hasExp()
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$0, "classList", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$6;
  })();
}
function CollectionTreasure(props) {
  const playerTreasures = solid_utils.createServiceNetData("player_collection_treasures", {});
  const treasureList = libs.createMemo(() => {
    return Object.entries(KeyValues.collection_treasure ?? {}).map(([itemID, levelConfig]) => {
      const levels = Object.entries(levelConfig ?? {}).map(([level, data]) => ({
        level: toFiniteNumber(level, 0),
        data: data
      })).filter(({
        level
      }) => level > 0).sort((a, b) => a.level - b.level);
      return {
        itemID,
        rarity: GetServiceItemRarity(itemID),
        levels
      };
    }).filter(({
      levels
    }) => levels.length > 0).sort((a, b) => b.rarity - a.rarity || toFiniteNumber(a.itemID) - toFiniteNumber(b.itemID));
  });
  const treasureByRarity = libs.createMemo(() => {
    const result = {};
    for (const treasure of treasureList()) {
      result[treasure.rarity] ??= [];
      result[treasure.rarity].push(treasure);
    }
    return result;
  });
  const rarityList = libs.createMemo(() => {
    return Object.keys(treasureByRarity()).sort((a, b) => Number(b) - Number(a));
  });
  const [selectedID, setSelectedID] = libs.createSignal("");
  libs.createEffect(() => {
    const selected = selectedID();
    if (selected && treasureList().some(treasure => treasure.itemID == selected)) {
      return;
    }
    setSelectedID(treasureList()[0]?.itemID ?? "");
  });
  const getTreasureConfig = itemID => {
    return treasureList().find(treasure => treasure.itemID == itemID);
  };
  const getTreasureLevelConfig = (itemID, level) => {
    const treasure = getTreasureConfig(itemID);
    return treasure?.levels.find(entry => entry.level == level);
  };
  const selectedTreasure = libs.createMemo(() => {
    return getTreasureConfig(selectedID());
  });
  const selectedLevels = libs.createMemo(() => selectedTreasure()?.levels ?? []);
  const maxLevel = libs.createMemo(() => {
    return selectedLevels()[selectedLevels().length - 1]?.level ?? 0;
  });
  const getPlayerTreasureData = itemID => {
    const treasureData = playerTreasures()[itemID];
    return {
      collection_treasure_id: treasureData?.collection_treasure_id ?? itemID,
      level: Math.max(0, toFiniteNumber(treasureData?.level, 0)),
      extra_exp: Math.max(0, toFiniteNumber(treasureData?.extra_exp, 0))
    };
  };
  const selectedPlayerTreasure = libs.createMemo(() => {
    return getPlayerTreasureData(selectedID());
  });
  const currentLevel = libs.createMemo(() => {
    const max = maxLevel();
    return max > 0 ? Math.min(selectedPlayerTreasure().level, max) : 0;
  });
  const nextLevel = libs.createMemo(() => {
    return currentLevel() + 1;
  });
  const nextLevelConfig = libs.createMemo(() => {
    const level = nextLevel();
    return selectedLevels().find(entry => entry.level == level);
  });
  const isMaxLevel = libs.createMemo(() => {
    const max = maxLevel();
    return max > 0 && currentLevel() >= max;
  });
  libs.createMemo(() => {
    const max = maxLevel();
    if (max <= 0) return 0;
    return clampPercent(currentLevel() / max * 100);
  });
  libs.createMemo(() => {
    const max = maxLevel();
    const level = currentLevel();
    if (max <= 0 || level <= 1) return [];
    return Array.from({
      length: level - 1
    }, (_, index) => {
      return clampPercent((index + 1) / max * 100);
    });
  });
  const currentAttributes = libs.createMemo(() => {
    const totals = {};
    const privileges = [];
    const level = currentLevel();
    if (level <= 0) return [];
    for (const entry of selectedLevels()) {
      if (entry.level > level) continue;
      for (const [attributeName, value] of Object.entries(entry.data.attribute ?? {})) {
        totals[attributeName] = (totals[attributeName] ?? 0) + toFiniteNumber(value, 0);
      }
      const text = privilegeTexts(entry.data.effect, entry.level).join("<br>");
      if (text != "") {
        privileges.push(text);
      }
    }
    const attributes = Object.entries(totals).map(([attributeName, value]) => {
      return GetPropertyLocalization(attributeName, number_format.normalizeDisplayNumber(value));
    });
    return [...attributes, ...privileges];
  });
  const currentAttributeState = libs.createMemo(() => {
    if (currentLevel() <= 0) return "locked";
    if (currentAttributes().length <= 0) return "empty";
    return "content";
  });
  const nextLevelCost = libs.createMemo(() => {
    return nextLevelConfig()?.data.level_cost ?? 0;
  });
  const canTreasureLevelUp = treasure => {
    const treasureMaxLevel = treasure.levels[treasure.levels.length - 1]?.level ?? 0;
    if (treasureMaxLevel <= 0) return false;
    const treasureData = getPlayerTreasureData(treasure.itemID);
    const treasureLevel = Math.min(treasureData.level, treasureMaxLevel);
    if (treasureLevel >= treasureMaxLevel) return false;
    const treasureNextLevelConfig = treasure.levels.find(entry => entry.level == treasureLevel + 1);
    const treasureNextLevelCost = treasureNextLevelConfig?.data.level_cost ?? 0;
    return treasureNextLevelCost > 0 && treasureData.extra_exp >= treasureNextLevelCost;
  };
  const treasureItemRefs = {};
  let firstUpgradeableTreasureScrollSchedule;
  let hasScrolledToFirstUpgradeableTreasure = false;
  libs.createEffect(() => {
    if (hasScrolledToFirstUpgradeableTreasure || firstUpgradeableTreasureScrollSchedule != undefined) return;
    const firstUpgradeableTreasure = treasureList().find(canTreasureLevelUp);
    if (firstUpgradeableTreasure == undefined) return;
    setSelectedID(firstUpgradeableTreasure.itemID);
    firstUpgradeableTreasureScrollSchedule = $.Schedule(0, () => {
      firstUpgradeableTreasureScrollSchedule = undefined;
      const treasureItem = treasureItemRefs[firstUpgradeableTreasure.itemID];
      if (!treasureItem?.IsValid()) return;
      treasureItem.ScrollParentToMakePanelFit(3, true);
      hasScrolledToFirstUpgradeableTreasure = true;
    });
  });
  libs.onCleanup(() => {
    if (firstUpgradeableTreasureScrollSchedule == undefined) return;
    try {
      $.CancelScheduled(firstUpgradeableTreasureScrollSchedule);
    } catch (error) {}
  });
  const canLevelUp = libs.createMemo(() => {
    const treasure = selectedTreasure();
    return treasure != undefined && canTreasureLevelUp(treasure);
  });
  const targetLevel = libs.createMemo(() => {
    let level = currentLevel();
    let exp = selectedPlayerTreasure().extra_exp;
    for (const entry of selectedLevels()) {
      if (entry.level <= level) continue;
      const cost = entry.data.level_cost ?? 0;
      if (cost <= 0 || exp < cost) break;
      exp -= cost;
      level = entry.level;
    }
    return level;
  });
  const targetLevelCost = libs.createMemo(() => {
    let costTotal = 0;
    for (const entry of selectedLevels()) {
      if (entry.level <= currentLevel()) continue;
      if (entry.level > targetLevel()) break;
      costTotal += entry.data.level_cost ?? 0;
    }
    return Math.max(costTotal, nextLevelCost());
  });
  const costItemID = libs.createMemo(() => {
    return toFiniteNumber(selectedID(), 0);
  });
  const fastUpgradeIDs = libs.createMemo(() => {
    return treasureList().filter(treasure => canTreasureLevelUp(treasure)).map(treasure => toFiniteNumber(treasure.itemID, 0)).filter(itemID => itemID > 0);
  });
  const [requesting, setRequesting] = libs.createSignal(false);
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
    id: "CollectionTreasureRoot",
    get show() {
      return props.show;
    },
    get children() {
      const _el$16 = libs.createElement("Panel", {
          id: "CollectionTreasurePanel"
        }, null);
        libs.createElement("Image", {
          id: "CollectionTreasureBG"
        }, _el$16);
        const _el$18 = libs.createElement("Panel", {
          id: "CollectionDetails"
        }, _el$16),
        _el$19 = libs.createElement("Panel", {
          id: "CollectionTopContent"
        }, _el$18),
        _el$20 = libs.createElement("Panel", {
          id: "CollectionItemIconContent"
        }, _el$19),
        _el$21 = libs.createElement("Panel", {
          id: "CollectionTopRightContent"
        }, _el$19),
        _el$22 = libs.createElement("Panel", {
          id: "CollectionTitle"
        }, _el$21),
        _el$23 = libs.createElement("Label", {
          id: "CollectionTitleText",
          get ["class"]() {
            return "Rarity" + (selectedTreasure()?.rarity ?? 1);
          },
          get text() {
            return `#${selectedID()}`;
          }
        }, _el$22),
        _el$24 = libs.createElement("Panel", {
          id: "CollectionSubTitle"
        }, _el$21);
        libs.createElement("Image", {
          id: "CollectionSubTitleBG"
        }, _el$24);
        const _el$26 = libs.createElement("Label", {
          id: "CollectionSubTitleText",
          text: `#TreasureSubTitle`
        }, _el$24),
        _el$27 = libs.createElement("Panel", {
          id: "LvArea"
        }, _el$21),
        _el$28 = libs.createElement("Panel", {
          id: "CollectionLevelContentWithBorder"
        }, _el$27);
        libs.createElement("Image", {
          "class": "CollectionLevelBG"
        }, _el$28);
        const _el$30 = libs.createElement("Panel", {
          id: "CollectionLevelBorderTextContent"
        }, _el$28),
        _el$31 = libs.createElement("Label", {
          "class": "CollectionLevelBorderText BorderText",
          get text() {
            return `${currentLevel()}`;
          }
        }, _el$30),
        _el$32 = libs.createElement("Panel", {
          id: "Triangle"
        }, _el$27),
        _el$33 = libs.createElement("Panel", {
          id: "TargetLevel"
        }, _el$27);
        libs.createElement("Image", {
          "class": "CollectionLevelBG"
        }, _el$33);
        const _el$35 = libs.createElement("Panel", {
          id: "CollectionLevelBorderTextContent"
        }, _el$33),
        _el$36 = libs.createElement("Label", {
          "class": "CollectionLevelBorderText BorderText",
          get text() {
            return `${targetLevel()}`;
          }
        }, _el$35);
        libs.createElement("Image", {
          "class": "CollectionDivider"
        }, _el$18);
        const _el$38 = libs.createElement("Panel", {
          id: "CollectionCurrentAttributes"
        }, _el$18);
        libs.createElement("Image", {
          "class": "CollectionDivider"
        }, _el$18);
        const _el$42 = libs.createElement("Panel", {
          id: "CollectionLevelEffects"
        }, _el$18),
        _el$43 = libs.createElement("Panel", {
          id: "CollectionLevelEffectsTitleContent"
        }, _el$42);
        libs.createElement("Image", {
          id: "CollectionCurrentAttributesBG"
        }, _el$43);
        libs.createElement("Label", {
          id: "CollectionCurrentAttributesText",
          text: "#TreasureCurrentEffectTag"
        }, _el$43);
        const _el$46 = libs.createElement("Panel", {
          id: "CollectionLevelEffectsList"
        }, _el$42),
        _el$51 = libs.createElement("Panel", {
          id: "CollectionRightContainer"
        }, _el$16),
        _el$52 = libs.createElement("Panel", {
          id: "CollectionList",
          scroll: "y"
        }, _el$51),
        _el$53 = libs.createElement("Panel", {
          id: "CollectionRightOperations"
        }, _el$51);
      const _ref$ = refImageBg;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$20) : refImageBg = _el$20;
      libs.insert(_el$20, libs.createComponent(StoreItem.StoreItemImage, {
        id: "CollectionItemIcon",
        get itemid() {
          return costItemID();
        },
        hittest: false
      }));
      libs.setProp(_el$26, "text", `#TreasureSubTitle`);
      libs.insert(_el$38, libs.createComponent(libs.Show, {
        get when() {
          return currentAttributeState() == "locked";
        },
        get fallback() {
          return [(() => {
            const _el$54 = libs.createElement("Panel", {
                id: "CollectionCurrentAttributesTitle"
              }, null);
              libs.createElement("Image", {
                id: "CollectionCurrentAttributesBG"
              }, _el$54);
              libs.createElement("Label", {
                id: "CollectionCurrentAttributesText",
                text: "#TreasureCurrentAttributeTag"
              }, _el$54);
            return _el$54;
          })(), (() => {
            const _el$57 = libs.createElement("Panel", {
              id: "CollectionAttributesList"
            }, null);
            libs.insert(_el$57, libs.createComponent(libs.Show, {
              get when() {
                return currentAttributeState() == "empty";
              },
              get fallback() {
                return libs.createComponent(libs.For, {
                  get each() {
                    return currentAttributes();
                  },
                  children: text => libs.createComponent(CurrentAttributeRow, {
                    text: text
                  })
                });
              },
              get children() {
                return libs.createElement("Label", {
                  "class": "CollectionAttributesPlaceholder",
                  text: "#TreasureCurrentAttributeNoDescription"
                }, null);
              }
            }));
            return _el$57;
          })()];
        },
        get children() {
          const _el$39 = libs.createElement("Panel", {
              id: "CollectionCurrentAttributesLockedContent"
            }, null);
            libs.createElement("Label", {
              id: "CollectionCurrentAttributesLockedText",
              text: "#TreasureCurrentAttributeLocked"
            }, _el$39);
          return _el$39;
        }
      }));
      libs.insert(_el$46, libs.createComponent(libs.For, {
        get each() {
          return selectedLevels();
        },
        children: ({
          level,
          data
        }) => {
          const expEntry = Object.entries(data.treasure_level_exp ?? {})[0];
          const expItemID = expEntry ? toFiniteNumber(expEntry[0], 0) : undefined;
          const expAmount = expEntry ? toFiniteNumber(expEntry[1], 0) : undefined;
          return libs.createComponent(LevelEffectRow, {
            level: level,
            get effectTexts() {
              return levelEffectTexts(data, level);
            },
            get locked() {
              return level > currentLevel();
            },
            expItemID: expItemID,
            expAmount: expAmount
          });
        }
      }));
      libs.insert(_el$18, libs.createComponent(libs.Show, {
        get when() {
          return !isMaxLevel();
        },
        get children() {
          const _el$47 = libs.createElement("Panel", {
              id: "CollectionUpgradeSection"
            }, null),
            _el$48 = libs.createElement("Panel", {
              id: "CollectionUpgradeCostLabel"
            }, _el$47),
            _el$49 = libs.createElement("Label", {
              id: "CollectionUpgradeCostText2",
              text: "#TreasureUpgradeCostText"
            }, _el$48),
            _el$50 = libs.createElement("Panel", {
              id: "CollectionUpgradeItemBlock"
            }, _el$47);
          libs.insert(_el$50, libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return costItemID();
            },
            get visible() {
              return !isMaxLevel();
            }
          }), null);
          libs.insert(_el$50, libs.createComponent(libs.Show, {
            get when() {
              return canLevelUp();
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                align: "right top"
              });
            }
          }), null);
          libs.insert(_el$47, libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
            id: "UpgradeCost",
            get have() {
              return Math.min(selectedPlayerTreasure().extra_exp, targetLevelCost());
            },
            get cost() {
              return targetLevelCost();
            },
            get visible() {
              return !isMaxLevel();
            }
          }), null);
          libs.insert(_el$47, libs.createComponent(EOM_Button.EOM_Button, {
            id: "UpgradeBtn",
            text: "#TreasureUpgradeBtn",
            color: "Confirm",
            visible: true,
            get enabled() {
              return libs.memo(() => !!!requesting())() && canLevelUp();
            },
            onactivate: self => {
              if (requesting()) return;
              if (!canLevelUp()) return;
              setRequesting(true);
              CallActionRequest("/v1/collection/levelup_treasure", {
                collection_treasure_ids: [costItemID()]
              }, () => {
                setRequesting(false);
                ShowLevelupFx();
              });
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$49, "visible", !isMaxLevel(), _$p));
          return _el$47;
        }
      }), null);
      libs.setProp(_el$52, "scroll", "y");
      libs.insert(_el$52, libs.createComponent(libs.For, {
        get each() {
          return rarityList();
        },
        children: rarity => [(() => {
          const _el$59 = libs.createElement("Panel", {
              "class": `CollectionRarityTitle Rarity${rarity}`
            }, null),
            _el$60 = libs.createElement("Panel", {
              "class": `CollectionRarityTitleContent Rarity${rarity}`
            }, _el$59),
            _el$61 = libs.createElement("Label", {
              "class": `RarityTitle Rarity${rarity}`,
              text: `#Collection_Rarity_Treasure${rarity}`
            }, _el$60),
            _el$62 = libs.createElement("Image", {
              "class": `CollectionRarityIcon Rarity${rarity}`
            }, _el$60);
          libs.setProp(_el$59, "class", `CollectionRarityTitle Rarity${rarity}`);
          libs.setProp(_el$60, "class", `CollectionRarityTitleContent Rarity${rarity}`);
          libs.setProp(_el$61, "class", `RarityTitle Rarity${rarity}`);
          libs.setProp(_el$61, "text", `#Collection_Rarity_Treasure${rarity}`);
          libs.setProp(_el$62, "class", `CollectionRarityIcon Rarity${rarity}`);
          libs.setProp(_el$62, "onmouseover", panel => {
            const tooltip = TREASURE_RARITY_LEVEL_LIMIT_TOOLTIPS[rarity];
            if (tooltip) {
              ShowCustomTooltip(panel, "text", {
                text: tooltip
              });
            }
          });
          libs.setProp(_el$62, "onmouseout", panel => HideCustomTooltip(panel, "text"));
          return _el$59;
        })(), libs.createComponent(libs.For, {
          get each() {
            return treasureByRarity()[rarity];
          },
          children: treasure => {
            const treasureData = () => getPlayerTreasureData(treasure.itemID);
            const treasureMaxLevel = () => treasure.levels[treasure.levels.length - 1]?.level ?? 0;
            const treasureLevel = () => Math.min(treasureData().level, treasureMaxLevel());
            const treasureIsMax = () => treasureMaxLevel() > 0 && treasureLevel() >= treasureMaxLevel();
            return (() => {
              const _el$63 = libs.createElement("Panel", {
                  "class": "CollectionTreasureItem"
                }, null),
                _el$65 = libs.createElement("Panel", {
                  id: "CardBG"
                }, _el$63),
                _el$66 = libs.createElement("Label", {
                  id: "Name",
                  get ["class"]() {
                    return `Rarity${treasure.rarity}`;
                  },
                  get text() {
                    return `#${treasure.itemID}`;
                  }
                }, _el$63);
                libs.createElement("Image", {
                  id: "LockIcon",
                  hittest: false
                }, _el$63);
                const _el$68 = libs.createElement("Label", {
                  id: "CollectionLevel",
                  get text() {
                    return `Lv.${treasureLevel()}${treasureIsMax() ? "(MAX)" : ""}`;
                  }
                }, _el$63),
                _el$69 = libs.createElement("Panel", {
                  id: "HasCount"
                }, _el$63),
                _el$70 = libs.createElement("Panel", {
                  id: "IconContainer"
                }, _el$69);
                libs.createElement("Panel", {
                  id: "IconBG"
                }, _el$70);
                const _el$72 = libs.createElement("Label", {
                  id: "HasCountText",
                  get text() {
                    return `x${treasureData().extra_exp}`;
                  }
                }, _el$69);
                libs.createElement("Panel", {
                  id: "SelectedHover",
                  hittest: false
                }, _el$63);
              libs.use(panel => {
                treasureItemRefs[treasure.itemID] = panel;
              }, _el$63);
              libs.setProp(_el$63, "onactivate", () => setSelectedID(treasure.itemID));
              libs.insert(_el$63, libs.createComponent(libs.Show, {
                get when() {
                  return selectedID() == treasure.itemID;
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
              }), _el$65);
              libs.insert(_el$63, libs.createComponent(StoreItem.StoreItemImage, {
                id: "CollectionIcon",
                get itemid() {
                  return treasure.itemID;
                }
              }), _el$66);
              libs.insert(_el$63, libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
                id: "CollectionNumberCount",
                get visible() {
                  return treasureLevel() <= 0;
                },
                hiddenCostOnZero: true,
                get have() {
                  return getPlayerTreasureData(treasure.itemID).extra_exp;
                },
                get cost() {
                  return getTreasureLevelConfig(treasure.itemID, treasureLevel() + 1)?.data.level_cost ?? 0;
                }
              }), _el$69);
              libs.insert(_el$70, libs.createComponent(StoreItem.StoreItemImage, {
                id: "SmallCollectionIcon",
                get itemid() {
                  return treasure.itemID;
                }
              }), null);
              libs.insert(_el$63, libs.createComponent(libs.Show, {
                get when() {
                  return canTreasureLevelUp(treasure);
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    align: "right top"
                  });
                }
              }), null);
              libs.effect(_p$ => {
                const _v$1 = {
                    [`Rarity${treasure.rarity}`]: true,
                    Lock: treasureLevel() <= 0,
                    Selected: selectedID() == treasure.itemID
                  },
                  _v$10 = `Rarity${treasure.rarity}`,
                  _v$11 = `#${treasure.itemID}`,
                  _v$12 = {
                    Max: treasureIsMax()
                  },
                  _v$13 = treasureLevel() > 0,
                  _v$14 = `Lv.${treasureLevel()}${treasureIsMax() ? "(MAX)" : ""}`,
                  _v$15 = treasureLevel() > 0 && !treasureIsMax(),
                  _v$16 = `x${treasureData().extra_exp}`;
                _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$63, "classList", _v$1, _p$._v$1));
                _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$66, "class", _v$10, _p$._v$10));
                _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$66, "text", _v$11, _p$._v$11));
                _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$68, "classList", _v$12, _p$._v$12));
                _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$68, "visible", _v$13, _p$._v$13));
                _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$68, "text", _v$14, _p$._v$14));
                _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$69, "visible", _v$15, _p$._v$15));
                _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$72, "text", _v$16, _p$._v$16));
                return _p$;
              }, {
                _v$1: undefined,
                _v$10: undefined,
                _v$11: undefined,
                _v$12: undefined,
                _v$13: undefined,
                _v$14: undefined,
                _v$15: undefined,
                _v$16: undefined
              });
              return _el$63;
            })();
          }
        })]
      }));
      libs.insert(_el$53, libs.createComponent(EOM_Button.EOM_Button, {
        id: "FastUpgradeBtn",
        text: "#TreasureFastUpgradeBtn",
        color: "Gold",
        visible: true,
        get enabled() {
          return libs.memo(() => !!!requesting())() && fastUpgradeIDs().length > 0;
        },
        onactivate: self => {
          if (requesting()) return;
          const ids = fastUpgradeIDs();
          if (ids.length <= 0) return;
          setRequesting(true);
          CallActionRequest("/v1/collection/levelup_treasure", {
            collection_treasure_ids: ids
          }, () => {
            setRequesting(false);
            if (ids.includes(costItemID())) {
              ShowLevelupFx();
            }
          });
        }
      }));
      libs.effect(_p$ => {
        const _v$4 = "Rarity" + (selectedTreasure()?.rarity ?? 1),
          _v$5 = `#${selectedID()}`,
          _v$6 = `${currentLevel()}`,
          _v$7 = targetLevel() > currentLevel(),
          _v$8 = targetLevel() > currentLevel(),
          _v$9 = `${targetLevel()}`,
          _v$0 = {
            MaxLevel: isMaxLevel()
          };
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$23, "class", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$23, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$31, "text", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$32, "visible", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$33, "visible", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$36, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$42, "classList", _v$0, _p$._v$0));
        return _p$;
      }, {
        _v$4: undefined,
        _v$5: undefined,
        _v$6: undefined,
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$0: undefined
      });
      return _el$16;
    }
  });
}

const REWARD_PROGRESS_SLICE_CLASSES = ["Slice0", "Slice1", "Slice2", "Slice3", "Slice4"];
function getRewardSegmentState(segmentLevel, currentLevel) {
  if (segmentLevel < currentLevel) return "completed";
  if (segmentLevel === currentLevel) return "current";
  return "locked";
}
function getRewardSegmentProgress(segmentLevel, levelCost, currentLevel, currentLevelExp) {
  if (segmentLevel < currentLevel) return 100;
  if (segmentLevel > currentLevel || levelCost <= 0) return 0;
  return Math.max(0, Math.min(100, currentLevelExp / levelCost * 100));
}
function RewardProgressSegment(props) {
  const sliceClass = REWARD_PROGRESS_SLICE_CLASSES[props.segmentIndex % REWARD_PROGRESS_SLICE_CLASSES.length];
  let progressValue = 0;
  if (props.progress >= 100) {
    progressValue = 100;
  } else if (props.progress <= 0) {
    progressValue = 0;
  } else {
    progressValue = 13 + props.progress * 0.74;
  }
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("RewardProgressSegment", props.state, sliceClass);
        },
        hittest: false
      }, null);
      libs.createElement("Panel", {
        "class": "RewardProgressSegmentBG"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        "class": "RewardProgressSegmentFill"
      }, _el$);
    libs.setProp(_el$3, "style", {
      clip: `rect( 0%, ${progressValue}%, 100%, 0% )`
    });
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("RewardProgressSegment", props.state, sliceClass), _$p));
    return _el$;
  })();
}
function CollectionCard(props) {
  const stateClass = props.state === "received" ? "Received" : props.state === "claimable" ? "Claimable" : "Locked";
  return (() => {
    const _el$4 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("CollectionCard", `Rarity${props.rarity}`, stateClass, {
            Selected: props.selected,
            EmptyReward: !props.hasReward
          });
        },
        get onactivate() {
          return props.onactivate;
        }
      }, null),
      _el$5 = libs.createElement("Panel", {
        "class": "CollectionCardRoot"
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "CollectionCardMain"
      }, _el$5);
      libs.createElement("Image", {
        "class": "CollectionCardBG"
      }, _el$6);
      const _el$8 = libs.createElement("Panel", {
        "class": "CollectionCardFxLayerTop"
      }, _el$6);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "CollectionCardFx",
        particleName: "particles/ui/game/ui_game_tishi_fx.vpcf",
        cameraOrigin: "0 0 220",
        lookAt: "0 0 0",
        fov: 90,
        hittest: false
      }, _el$8);
      libs.createElement("Image", {
        "class": "CollectionCardSelectedBorder"
      }, _el$6);
      const _el$1 = libs.createElement("Panel", {
        "class": "CollectionCardContent"
      }, _el$6);
      libs.createElement("Image", {
        "class": "CollectionCardRecived"
      }, _el$6);
      libs.createElement("Image", {
        "class": "CollectionCardRedPoint"
      }, _el$6);
      const _el$15 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("RewardLevelMarker", stateClass, {
            Current: props.selected
          });
        }
      }, _el$4),
      _el$16 = libs.createElement("Panel", {
        "class": "RewardLevelMarkerContent"
      }, _el$15);
      libs.createElement("Image", {
        "class": "RewardLevelMarkerBG"
      }, _el$16);
      const _el$18 = libs.createElement("Label", {
        "class": "RewardLevelLabel",
        get text() {
          return props.level;
        }
      }, _el$16);
    const _ref$ = props.panelRef;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$4) : props.panelRef = _el$4;
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return props.reward_id != undefined;
      },
      get children() {
        return [(() => {
          const _el$10 = libs.createElement("Label", {
            "class": "CollectionCardName",
            get text() {
              return `#${props.reward_id}`;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$10, "text", `#${props.reward_id}`, _$p));
          return _el$10;
        })(), libs.createElement("Image", {
          "class": "CollectionCardDivider"
        }, null), libs.createComponent(StoreItem.StoreItemImage, {
          "class": "CollectionCardIcon",
          get itemid() {
            return props.reward_id;
          }
        }), (() => {
          const _el$12 = libs.createElement("Label", {
            "class": "CollectionCardAmount",
            get text() {
              return `x${props.amount}`;
            }
          }, null);
          libs.effect(_p$ => {
            const _v$ = `x${props.amount}`,
              _v$2 = (props.amount ?? 0) > 1;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$12, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$12, "visible", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$12;
        })()];
      }
    }));
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return props.segmentState != undefined;
      },
      get children() {
        return libs.createComponent(RewardProgressSegment, {
          get progress() {
            return props.segmentProgress ?? 0;
          },
          get state() {
            return props.segmentState;
          },
          get segmentIndex() {
            return props.segmentIndex ?? 0;
          }
        });
      }
    }), _el$15);
    libs.effect(_p$ => {
      const _v$3 = libs.classNames("CollectionCard", `Rarity${props.rarity}`, stateClass, {
          Selected: props.selected,
          EmptyReward: !props.hasReward
        }),
        _v$4 = props.onactivate,
        _v$5 = libs.classNames("RewardLevelMarker", stateClass, {
          Current: props.selected
        }),
        _v$6 = props.level;
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "class", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$4, "onactivate", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$18, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$4;
  })();
}
function CollectionVip(props) {
  const REWARD_BASE_SCREEN_HEIGHT = 1080;
  const REWARD_WHEEL_SCROLL_STEP = 160;
  let rewardContentRef;
  let rewardViewportRef;
  let rewardListRef;
  let rewardCardRefs = [];
  const [scrollOffset, setScrollOffset] = libs.createSignal(0);
  const [canScrollLeft, setCanScrollLeft] = libs.createSignal(false);
  const [canScrollRight, setCanScrollRight] = libs.createSignal(false);
  const [requesting, setRequesting] = libs.createSignal(false);
  const [isRewardDragging, setIsRewardDragging] = libs.createSignal(false);
  const [selectedRewardIndex, setSelectedRewardIndex] = libs.createSignal(0);
  let rewardDragLastX = 0;
  let rewardDragScheduleId;
  let rewardAutoScrollDone = false;
  let rewardUserScrolled = false;
  let rewardUserSelected = false;
  const playerAccountLevels = solid_utils.createServiceNetData("player_account_levels", {});
  const rewardReceiveRecordsRaw = solid_utils.createServiceNetData("player_account_level_rewards_receive_records", {});
  const rewardReceiveRecords = libs.createMemo(() => {
    console.log("rewardReceiveRecordsRaw ", rewardReceiveRecordsRaw());
    return rewardReceiveRecordsRaw().collection_treasure ?? {};
  });
  const rewardConfigList = libs.createMemo(() => {
    return Object.values(KeyValues.collection_treasure_level_reward ?? {}).map(config => config).sort((a, b) => a.level - b.level);
  });
  const maxLevel = libs.createMemo(() => rewardConfigList()[rewardConfigList().length - 1]?.level ?? 0);
  const currentVipLevel = libs.createMemo(() => {
    const level = Math.max(1, toFiniteNumber(playerAccountLevels().collection_treasure?.level, 1));
    const max = maxLevel();
    return max > 0 ? Math.min(level, max) : level;
  });
  const currentExp = libs.createMemo(() => Math.max(0, toFiniteNumber(playerAccountLevels().collection_treasure?.extra_exp, 0)));
  const nextVipLevel = libs.createMemo(() => {
    const max = maxLevel();
    return max > 0 ? Math.min(currentVipLevel() + 1, max) : currentVipLevel() + 1;
  });
  const currentLevelConfig = libs.createMemo(() => rewardConfigList().find(config => config.level === currentVipLevel()));
  const currentLevelCost = libs.createMemo(() => {
    if (currentVipLevel() >= maxLevel()) return 0;
    return Math.max(0, toFiniteNumber(currentLevelConfig()?.level_cost, 0));
  });
  const remainingExp = libs.createMemo(() => Math.max(0, currentLevelCost() - currentExp()));
  const vipRewards = libs.createMemo(() => {
    const currentLevel = currentVipLevel();
    const received = rewardReceiveRecords();
    const rewardConfigs = rewardConfigList();
    return rewardConfigs.map(config => {
      const rewardEntry = Object.entries(config.reward ?? {})[0];
      const rewardID = rewardEntry ? toFiniteNumber(rewardEntry[0]) : undefined;
      const amount = rewardEntry ? toFiniteNumber(rewardEntry[1]) : undefined;
      const state = received[String(config.level)] === true ? "received" : config.level <= currentLevel ? "claimable" : "locked";
      const rarity = rewardID != undefined ? GetServiceItemRarity(rewardID) : 1;
      return {
        level: config.level,
        levelCost: Math.max(0, toFiniteNumber(config.level_cost, 0)),
        reward_id: rewardID,
        amount,
        rarity: rarity,
        state,
        hasReward: rewardID != undefined
      };
    });
  });
  const hasClaimableReward = libs.createMemo(() => vipRewards().some(reward => reward.state === "claimable" && reward.hasReward));
  const selectedRewardItemID = libs.createMemo(() => vipRewards()[selectedRewardIndex()].reward_id);
  const vipLogoLang = libs.createMemo(() => {
    const lang = Language();
    if (lang == "schinese") {
      return "Language_schinese";
    } else if (lang == "russian") {
      return "Language_russian";
    } else {
      return "Language_english";
    }
  });
  function handleReceiveRewards(level) {
    if (requesting() || !hasClaimableReward()) {
      return;
    }
    setRequesting(true);
    CallActionRequest("/v1/account_level/receive_rewards", {
      account_type: "collection_treasure",
      level: level ?? 0
    }, () => {
      setRequesting(false);
    }, () => {
      setRequesting(false);
    });
  }
  function selectRewardIndex(index, userSelected = false) {
    const rewardCount = vipRewards().length;
    if (rewardCount <= 0) {
      setSelectedRewardIndex(0);
      return;
    }
    setSelectedRewardIndex(Math.max(0, Math.min(rewardCount - 1, index)));
    if (userSelected) {
      rewardUserSelected = true;
    }
  }
  function handleReceiveReward(reward, index) {
    selectRewardIndex(index, true);
    if (reward.state !== "claimable" || !reward.hasReward) {
      return;
    }
    handleReceiveRewards(reward.level);
  }
  function getRewardLayoutScale() {
    const panelScale = rewardViewportRef?.actualuiscale_x;
    if (panelScale != undefined && panelScale > 0) {
      return panelScale;
    }
    const heightScale = Game.GetScreenHeight() / REWARD_BASE_SCREEN_HEIGHT;
    return heightScale > 0 ? heightScale : 1;
  }
  function toRewardDesignPx(value) {
    return value / getRewardLayoutScale();
  }
  function getMaxScroll() {
    if (!rewardViewportRef?.IsValid() || !rewardListRef?.IsValid()) return 0;
    const viewportWidth = toRewardDesignPx(rewardViewportRef.actuallayoutwidth);
    const validCards = rewardCardRefs.filter(panel => !!panel?.IsValid());
    const lastCard = validCards[validCards.length - 1];
    const listWidth = lastCard?.IsValid() ? toRewardDesignPx(lastCard.GetPositionWithinAncestor(rewardListRef).x + lastCard.actuallayoutwidth) : toRewardDesignPx(rewardListRef.actuallayoutwidth);
    return Math.max(0, listWidth - viewportWidth);
  }
  function clampScrollOffset(offset) {
    const maxScroll = getMaxScroll();
    return Math.max(0, Math.min(maxScroll, offset));
  }
  function updateRewardScrollState() {
    const maxScroll = getMaxScroll();
    const nextOffset = clampScrollOffset(scrollOffset());
    const tolerance = 2;
    if (Math.abs(nextOffset - scrollOffset()) > tolerance) {
      setScrollOffset(nextOffset);
    }
    setCanScrollLeft(nextOffset > tolerance);
    setCanScrollRight(nextOffset < maxScroll - tolerance);
  }
  function getCurrentRewardIndex() {
    const rewards = vipRewards();
    if (rewards.length === 0) return 0;
    const currentLevel = currentVipLevel();
    let currentIndex = 0;
    for (let index = 0; index < rewards.length; index++) {
      if (rewards[index].level <= currentLevel) {
        currentIndex = index;
      } else {
        break;
      }
    }
    return currentIndex;
  }
  function getInitialRewardIndex() {
    const rewards = vipRewards();
    if (rewards.length === 0) return 0;
    const firstClaimableIndex = rewards.findIndex(reward => reward.state === "claimable" && reward.hasReward);
    return firstClaimableIndex >= 0 ? firstClaimableIndex : getCurrentRewardIndex();
  }
  libs.createEffect(() => {
    const rewards = vipRewards();
    if (rewards.length === 0) {
      setSelectedRewardIndex(0);
      return;
    }
    if (!rewardUserSelected) {
      selectRewardIndex(getInitialRewardIndex());
      return;
    }
    if (selectedRewardIndex() >= rewards.length) {
      setSelectedRewardIndex(rewards.length - 1);
    }
  });
  function scrollToRewardIndex(index, type = "center") {
    if (!rewardViewportRef?.IsValid() || !rewardListRef?.IsValid()) return false;
    const targetCard = rewardCardRefs[index];
    if (!targetCard?.IsValid()) return false;
    const viewportWidth = toRewardDesignPx(rewardViewportRef.actuallayoutwidth);
    const cardWidth = toRewardDesignPx(targetCard.actuallayoutwidth);
    if (viewportWidth <= 0 || cardWidth <= 0) return false;
    const cardX = toRewardDesignPx(targetCard.GetPositionWithinAncestor(rewardListRef).x);
    let targetOffset = cardX;
    if (type === "center") {
      targetOffset -= (viewportWidth - cardWidth) / 2;
    } else if (type === "end") {
      targetOffset -= viewportWidth - cardWidth;
    }
    setScrollOffset(clampScrollOffset(targetOffset));
    $.Schedule(0, updateRewardScrollState);
    return true;
  }
  function scrollRewardList(direction) {
    if (!rewardViewportRef?.IsValid()) return;
    const viewportWidth = toRewardDesignPx(rewardViewportRef.actuallayoutwidth);
    const pageStep = Math.max(1, Math.floor(viewportWidth * 0.8));
    rewardUserScrolled = true;
    setScrollOffset(clampScrollOffset(scrollOffset() + direction * pageStep));
    $.Schedule(0, updateRewardScrollState);
  }
  function scrollRewardListByDelta(delta) {
    if (!rewardViewportRef?.IsValid()) return;
    rewardUserScrolled = true;
    setScrollOffset(clampScrollOffset(scrollOffset() + delta));
    $.Schedule(0, updateRewardScrollState);
  }
  function stopRewardDragThinker() {
    if (rewardDragScheduleId !== undefined) {
      try {
        $.CancelScheduled(rewardDragScheduleId);
      } catch (error) {}
      rewardDragScheduleId = undefined;
    }
  }
  function rewardDragThinker() {
    rewardDragScheduleId = undefined;
    if (!isRewardDragging() || !rewardViewportRef?.IsValid()) {
      return;
    }
    const cursorX = GameUI.GetCursorPosition()[0];
    const deltaX = (cursorX - rewardDragLastX) / getRewardLayoutScale();
    if (Math.abs(deltaX) >= 1) {
      setScrollOffset(clampScrollOffset(scrollOffset() - deltaX));
      updateRewardScrollState();
      rewardDragLastX = cursorX;
    }
    rewardDragScheduleId = $.Schedule(Math.max(1 / 90, Game.GetGameFrameTime()), rewardDragThinker);
  }
  function startRewardDrag(dragCallbacks) {
    if (!rewardViewportRef?.IsValid() || getMaxScroll() <= 0) {
      return;
    }
    rewardUserScrolled = true;
    const dragPanel = $.CreatePanel("Panel", $.GetContextPanel(), "CollectionVipRewardDragPanel");
    dragPanel.visible = false;
    dragCallbacks.displayPanel = dragPanel;
    const position = GameUI.GetCursorPosition();
    if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
      dragCallbacks.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
      dragCallbacks.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
    }
    stopRewardDragThinker();
    rewardDragLastX = GameUI.GetCursorPosition()[0];
    setIsRewardDragging(true);
    rewardDragThinker();
  }
  function endRewardDrag(draggedPanel) {
    stopRewardDragThinker();
    setIsRewardDragging(false);
    if (draggedPanel?.IsValid()) {
      draggedPanel.DeleteAsync(-1);
    }
    updateRewardScrollState();
  }
  libs.createEffect(() => {
    setScrollOffset(0);
    rewardAutoScrollDone = false;
    rewardUserScrolled = false;
    let scheduleId;
    let disposed = false;
    const tick = () => {
      if (disposed) return;
      if (!rewardAutoScrollDone && !rewardUserScrolled) {
        const initialRewardIndex = getInitialRewardIndex();
        if (!rewardUserSelected) {
          selectRewardIndex(initialRewardIndex);
        }
        rewardAutoScrollDone = scrollToRewardIndex(initialRewardIndex, "center");
      }
      updateRewardScrollState();
      scheduleId = $.Schedule(0.1, tick);
    };
    scheduleId = $.Schedule(0, tick);
    libs.onCleanup(() => {
      disposed = true;
      if (scheduleId !== undefined) {
        try {
          $.CancelScheduled(scheduleId);
        } catch (error) {}
      }
    });
  });
  libs.onMount(() => {
    const mouseEventName = DoUniqueString("CollectionVipRewardList");
    CustomUIConfig.SubscribeMouseEvent(mouseEventName, ({
      event_name: eventName,
      value
    }) => {
      const isRewardListHovered = rewardViewportRef?.IsValid() && rewardViewportRef.BHasHoverStyle() || rewardContentRef?.IsValid() && rewardContentRef.BHasHoverStyle();
      if (!isRewardListHovered) {
        return;
      }
      if (eventName === "wheeled") {
        if (value === 1) {
          scrollRewardListByDelta(-REWARD_WHEEL_SCROLL_STEP);
        } else if (value === -1) {
          scrollRewardListByDelta(REWARD_WHEEL_SCROLL_STEP);
        }
      } else if (eventName === "pressed") {
        if (value === 5) {
          scrollRewardListByDelta(-REWARD_WHEEL_SCROLL_STEP);
        } else if (value === 6) {
          scrollRewardListByDelta(REWARD_WHEEL_SCROLL_STEP);
        }
      }
    });
    libs.onCleanup(() => {
      try {
        CustomUIConfig.UnsubscribeMouseEvent(mouseEventName);
      } catch (error) {}
    });
  });
  libs.onCleanup(() => {
    stopRewardDragThinker();
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "CollectionVipRoot",
    get show() {
      return props.show;
    },
    get children() {
      return [(() => {
        const _el$19 = libs.createElement("Panel", {
            id: "CollectionRewardPreview"
          }, null);
          libs.createElement("Image", {
            id: "CollectionRewardPreviewBG"
          }, _el$19);
          const _el$21 = libs.createElement("Panel", {
            "class": "CollectionBGFx"
          }, _el$19);
          libs.createElement("DOTAParticleScenePanel", {
            "class": "CollectionCardFx",
            particleName: "particles/ui/game/ui_game_f3_background_fx.vpcf",
            cameraOrigin: "0 0 320",
            lookAt: "0 0 0",
            fov: 90,
            hittest: false
          }, _el$21);
        libs.insert(_el$19, libs.createComponent(libs.Show, {
          get when() {
            return selectedRewardItemID();
          },
          keyed: true,
          children: itemID => libs.createComponent(StoreItem.StoreItemImage, {
            itemid: itemID
          })
        }), null);
        return _el$19;
      })(), (() => {
        const _el$23 = libs.createElement("Panel", {
            id: "CollectionVipTopRight"
          }, null),
          _el$24 = libs.createElement("Image", {
            id: "CollectionVipTopRightBG",
            get ["class"]() {
              return vipLogoLang();
            }
          }, _el$23),
          _el$25 = libs.createElement("Panel", {
            id: "CollectionVipToolTipIcon",
            get ["class"]() {
              return vipLogoLang();
            }
          }, _el$23);
        libs.setProp(_el$25, "tooltip_text", "#VIPLevelTitleToolTip");
        libs.effect(_p$ => {
          const _v$7 = vipLogoLang(),
            _v$8 = vipLogoLang();
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$24, "class", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$25, "class", _v$8, _p$._v$8));
          return _p$;
        }, {
          _v$7: undefined,
          _v$8: undefined
        });
        return _el$23;
      })(), (() => {
        const _el$26 = libs.createElement("Panel", {
            id: "CollectionVipContent"
          }, null),
          _el$27 = libs.createElement("Panel", {
            id: "CollectionVipTop"
          }, _el$26),
          _el$28 = libs.createElement("Panel", {
            id: "CollectionVipLevelInfo"
          }, _el$27),
          _el$29 = libs.createElement("Panel", {
            id: "CollectionVipLevel"
          }, _el$28);
          libs.createElement("Image", {
            id: "CollectionVipLevelBG"
          }, _el$29);
          const _el$31 = libs.createElement("Label", {
            id: "VipLevelNumber",
            get text() {
              return currentVipLevel();
            }
          }, _el$29),
          _el$32 = libs.createElement("Panel", {
            id: "CollectionVipProgress"
          }, _el$28),
          _el$33 = libs.createElement("Label", {
            id: "VipProgressNumber",
            get text() {
              return `${currentExp()} / ${currentLevelCost()}`;
            }
          }, _el$32),
          _el$34 = libs.createElement("Label", {
            id: "VipProgressTitle",
            get vars() {
              return {
                need_exp: remainingExp(),
                next_level: nextVipLevel()
              };
            },
            text: "#VIPLevelNeedExp"
          }, _el$32);
          libs.createElement("Label", {
            id: "VipProgressDesc",
            text: "#VIPLevelExpDescription"
          }, _el$32);
          const _el$36 = libs.createElement("Panel", {
            id: "CollectionVipOperatorContainer"
          }, _el$27),
          _el$37 = libs.createElement("Panel", {
            id: "CollectionVipCenter"
          }, _el$26),
          _el$38 = libs.createElement("Panel", {
            id: "RewardsContent",
            get ["class"]() {
              return libs.classNames({
                Dragging: isRewardDragging()
              });
            }
          }, _el$37),
          _el$39 = libs.createElement("Panel", {
            id: "RewardCardViewport",
            draggable: true
          }, _el$38),
          _el$40 = libs.createElement("Panel", {
            id: "RewardCardList",
            get style() {
              return {
                transform: `translateX(${-scrollOffset()}px)`
              };
            }
          }, _el$39);
        libs.insert(_el$36, libs.createComponent(EOM_Button.EOM_Button, {
          id: "ReciveRewardButton",
          color: "Gold",
          size: "Normal",
          text: "#ClaimRewardsBtnTxt",
          get enabled() {
            return libs.memo(() => !!!requesting())() && hasClaimableReward();
          },
          onactivate: () => handleReceiveRewards(0)
        }));
        libs.insert(_el$37, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "LeftArrow",
          get ["class"]() {
            return libs.classNames("SwitchArrow", "LeftArrow");
          },
          get enabled() {
            return canScrollLeft();
          },
          onactivate: () => scrollRewardList(-1),
          visible: false
        }), _el$38);
        libs.use(panel => rewardContentRef = panel, _el$38);
        libs.use(panel => rewardViewportRef = panel, _el$39);
        libs.setProp(_el$39, "onDragStart", (_panel, dragCallbacks) => startRewardDrag(dragCallbacks));
        libs.setProp(_el$39, "onDragEnd", (_panel, draggedPanel) => endRewardDrag(draggedPanel));
        libs.use(panel => rewardListRef = panel, _el$40);
        libs.insert(_el$40, () => vipRewards().map((reward, index, rewards) => {
          const hasNextLevel = index < rewards.length - 1;
          const segmentState = hasNextLevel ? getRewardSegmentState(reward.level, currentVipLevel()) : undefined;
          const segmentProgress = hasNextLevel ? getRewardSegmentProgress(reward.level, reward.levelCost, currentVipLevel(), currentExp()) : undefined;
          return libs.createComponent(CollectionCard, libs.mergeProps$1({
            panelRef: panel => rewardCardRefs[index] = panel
          }, reward, {
            segmentProgress: segmentProgress,
            segmentState: segmentState,
            segmentIndex: index,
            get selected() {
              return index === selectedRewardIndex();
            },
            onactivate: () => handleReceiveReward(reward, index)
          }));
        }));
        libs.insert(_el$37, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "RightArrow",
          get ["class"]() {
            return libs.classNames("SwitchArrow", "RightArrow");
          },
          get enabled() {
            return canScrollRight();
          },
          onactivate: () => scrollRewardList(1),
          visible: false
        }), null);
        libs.effect(_p$ => {
          const _v$9 = currentVipLevel(),
            _v$0 = `${currentExp()} / ${currentLevelCost()}`,
            _v$1 = {
              need_exp: remainingExp(),
              next_level: nextVipLevel()
            },
            _v$10 = libs.classNames({
              Dragging: isRewardDragging()
            }),
            _v$11 = {
              transform: `translateX(${-scrollOffset()}px)`
            };
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$31, "text", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$33, "text", _v$0, _p$._v$0));
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$34, "vars", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$38, "class", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$40, "style", _v$11, _p$._v$11));
          return _p$;
        }, {
          _v$9: undefined,
          _v$0: undefined,
          _v$1: undefined,
          _v$10: undefined,
          _v$11: undefined
        });
        return _el$26;
      })()];
    }
  });
}

const SeaMystery = props => {
  const poolID = () => props.poolID ?? 3001;
  const poolConfig = libs.createMemo(() => KeyValues.drawcards[String(poolID())]);
  const rouletteList = libs.createMemo(() => KeyValues.drawcards_pond[String(poolID())]?.map(item => String(item.drop_id)) ?? []);
  const purchasedProducts = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const playerCardGuarantees = solid_utils.createServiceNetData("player_card_guarantees", {});
  let pointer;
  const power = () => 5;
  const [drawEnabled, setDrawEnabled] = libs.createSignal(true);
  const [drawInProgress, setDrawInProgress] = libs.createSignal(false);
  const [skipAnimation, setSkipAnimation] = libs.createSignal(false);
  const [tokenCount, setTokenCount] = libs.createSignal(0);
  const [luckyPercent, setLuckyPercent] = libs.createSignal(0);
  const refreshDrawDisplay = () => {
    const guarantees = playerCardGuarantees()[poolConfig()?.inheritance_lucky ?? 0];
    const drawItem = poolConfig()?.item;
    setTokenCount(drawItem == undefined ? 0 : playerTokens()[drawItem]?.amounts ?? 0);
    setLuckyPercent((guarantees?.[5] ?? 0) / Math.max(1, poolConfig()?.q5_must ?? 1));
  };
  libs.createEffect(() => {
    if (!drawInProgress()) refreshDrawDisplay();
  });
  const setDrawingState = drawing => {
    setDrawInProgress(drawing);
    props.onDrawStateChange?.(drawing);
  };
  function createCubicBezier(x1, y1, x2, y2) {
    const bezier = (t, p0, p1, p2, p3) => {
      const u = 1 - t;
      return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    };
    const derivative = (t, p0, p1, p2, p3) => {
      const u = 1 - t;
      return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2);
    };
    return x => {
      let t = x;
      for (let i = 0; i < 5; i++) {
        const dx = derivative(t, 0, x1, x2, 1);
        if (dx === 0) break;
        t = Math.max(0, Math.min(1, t - (bezier(t, 0, x1, x2, 1) - x) / dx));
      }
      return bezier(t, 0, y1, y2, 1);
    };
  }
  const playDrawAnimation = (degrees, callback) => {
    degrees += $.RandomInt(-14, 14);
    const easing = createCubicBezier(0.24, 0.24, 0, RemapValClamped(power(), 1, 5, 1.06, 1.02));
    Game.EmitSound("UI.SeaMystery.Draw");
    if (!pointer?.IsValid()) {
      callback();
      return;
    }
    const currentTransform = pointer.style.transform ?? "";
    let currentRotation = Number(currentTransform.match(/rotateZ\\(([-\\d.]+)deg\\)/)?.[1] ?? 0);
    const startRotation = currentRotation;
    const baseRotation = 360 * 2 * power();
    const targetRotation = baseRotation + (360 - baseRotation % 360) % 360 + degrees;
    const rotationRange = targetRotation - startRotation;
    const duration = (2 + power() * 0.2) * 1500;
    const startTime = Date.now();
    Timer.CreateTimer("SeaMysteryDrawAnimation", 0, () => {
      if (!pointer?.IsValid()) return;
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      if (progress < 1) {
        currentRotation = startRotation + rotationRange * easing(progress);
        pointer.style.transform = `rotateZ(${currentRotation}deg)`;
        return 0;
      }
      callback();
    });
  };
  const draw = count => {
    const config = poolConfig();
    if (!config || !drawEnabled()) return;
    setDrawEnabled(false);
    setDrawingState(true);
    ServerRequest("draw_card", {
      count,
      id: config.id
    }, data => {
      if (data.code != 0 || !data.items_list?.length) {
        setDrawEnabled(true);
        setDrawingState(false);
        return;
      }
      const resultItems = data.items_list;
      const pondItems = KeyValues.drawcards_pond[String(poolID())];
      const rarityMap = {};
      pondItems?.forEach(item => {
        rarityMap[String(item.drop_id)] = item.drop_rarity ?? 0;
      });
      const matchedItems = resultItems.filter(item => rouletteList().includes(String(item.origin_item_id ?? item.item_id)));
      const targetItem = matchedItems.length > 0 ? matchedItems.sort((a, b) => (rarityMap[String(b.origin_item_id ?? b.item_id)] ?? 0) - (rarityMap[String(a.origin_item_id ?? a.item_id)] ?? 0))[0] : resultItems[resultItems.length - 1];
      const index = rouletteList().indexOf(String(targetItem.origin_item_id ?? targetItem.item_id));
      const showResult = () => {
        setDrawEnabled(true);
        refreshDrawDisplay();
        setDrawingState(false);
        const sortedItems = [...resultItems].sort((a, b) => (rarityMap[String(b.origin_item_id ?? b.item_id)] ?? 0) - (rarityMap[String(a.origin_item_id ?? a.item_id)] ?? 0));
        ShowPopup("StoreBuyItemResult", {
          title: GetLocalization("#SeaMysteryResultTitle"),
          result: "success",
          items: sortedItems
        });
      };
      if (index < 0 || skipAnimation()) {
        showResult();
      } else {
        playDrawAnimation(index * 30 + 15, showResult);
      }
    }, 15, () => {
      setDrawEnabled(true);
      setDrawingState(false);
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "SeaMysteryContent"
      }, null);
      libs.createElement("Panel", {
        id: "DrawerBG"
      }, _el$);
      libs.createElement("Panel", {
        id: "DrawerBG2"
      }, _el$);
      libs.createElement("Panel", {
        id: "DrawerBG3"
      }, _el$);
      const _el$5 = libs.createElement("Panel", {
        id: "LeftContent"
      }, _el$),
      _el$6 = libs.createElement("Panel", {
        id: "StoreItemContent"
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        id: "SeaMysteryDesc"
      }, _el$6),
      _el$8 = libs.createElement("Label", {
        html: true,
        id: "SeaMysteryDesc_Title",
        get text() {
          return GetLocalization("#SeaMystery");
        }
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        html: true,
        id: "SeaMysteryDesc_Desc",
        get text() {
          return GetLocalization("#SeaMysteryDesc");
        }
      }, _el$7),
      _el$0 = libs.createElement("Panel", {
        id: "ItemList",
        scroll: "y"
      }, _el$6),
      _el$1 = libs.createElement("Panel", {
        id: "RightContent"
      }, _el$);
      libs.createElement("Panel", {
        id: "RouletteTitleImage"
      }, _el$1);
      const _el$11 = libs.createElement("Panel", {
        id: "RouletteMain"
      }, _el$1);
      libs.createElement("Panel", {
        id: "Compass2"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Compass3"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Compass1"
      }, _el$11);
      const _el$15 = libs.createElement("Panel", {
        id: "Pointer",
        hittest: false
      }, _el$11);
      libs.createElement("DOTAParticleScenePanel", {
        id: "PointerParticle",
        hittest: false,
        particleName: "particles/ui/game/ui_game_athena_triden_01.vpcf",
        lookAt: "0 0 0",
        cameraOrigin: "0 0 290",
        fov: 90
      }, _el$15);
      const _el$17 = libs.createElement("Panel", {
        id: "RouletteItemList"
      }, _el$11),
      _el$18 = libs.createElement("Panel", {
        id: "RouletteTitle"
      }, _el$1),
      _el$19 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#RouletteDesc");
        }
      }, _el$18),
      _el$20 = libs.createElement("Image", {
        id: "Info"
      }, _el$18),
      _el$21 = libs.createElement("Panel", {
        id: "SeaMysteryLuckyContainer"
      }, _el$1),
      _el$22 = libs.createElement("Panel", {
        id: "SeaMysteryLuckyFrame"
      }, _el$21),
      _el$23 = libs.createElement("Panel", {
        id: "SeaMysteryLuckyFill",
        get height() {
          return `${233 * Math.min(1, luckyPercent())}px`;
        }
      }, _el$22),
      _el$24 = libs.createElement("Label", {
        id: "SeaMysteryLuckyValue",
        get text() {
          return `${Round(luckyPercent() * 100, 1)}%`;
        }
      }, _el$23),
      _el$25 = libs.createElement("Panel", {
        id: "SeaMysteryLuckyBadgeContent",
        get transform() {
          return `translateY(${-233 * luckyPercent()}px)`;
        }
      }, _el$22);
      libs.createElement("Panel", {
        id: "SeaMysteryLuckyBadge"
      }, _el$25);
      const _el$27 = libs.createElement("Label", {
        id: "SeaMysteryLuckyValue",
        get text() {
          return `${Round(luckyPercent() * 100, 1)}%`;
        }
      }, _el$25),
      _el$28 = libs.createElement("Label", {
        id: "SeaMysteryLuckyTitle",
        get text() {
          return GetLocalization("#Draw_Pool_LuckyValue");
        }
      }, _el$21),
      _el$29 = libs.createElement("Panel", {
        id: "DrawBtnContainer"
      }, _el$1),
      _el$30 = libs.createElement("Panel", {
        id: "Draw1"
      }, _el$29),
      _el$31 = libs.createElement("Panel", {
        "class": "CostContainer"
      }, _el$30),
      _el$32 = libs.createElement("Label", {
        get text() {
          return `×${poolConfig().one_num}`;
        }
      }, _el$31),
      _el$33 = libs.createElement("Panel", {
        id: "Draw2"
      }, _el$29),
      _el$34 = libs.createElement("Panel", {
        "class": "CostContainer"
      }, _el$33),
      _el$35 = libs.createElement("Label", {
        get text() {
          return `×${poolConfig().ten_num}`;
        }
      }, _el$34);
    libs.setProp(_el$0, "scroll", "y");
    libs.insert(_el$0, libs.createComponent(libs.Index, {
      get each() {
        return props.itemList;
      },
      children: data => libs.createComponent(StoreItem.StoreItem, {
        get itemid() {
          return data().id;
        },
        get purchased_num() {
          return purchasedProducts()[data().id];
        }
      })
    }));
    const _ref$ = pointer;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$15) : pointer = _el$15;
    libs.insert(_el$17, libs.createComponent(libs.For, {
      get each() {
        return rouletteList();
      },
      children: (itemID, index) => (() => {
        const _el$36 = libs.createElement("Panel", {
            "class": "RewardItemCol",
            get style() {
              return {
                transform: `rotateZ(${30 * index() + 15}deg)`
              };
            },
            hittest: false
          }, null),
          _el$37 = libs.createElement("DOTAParticleScenePanel", {
            id: "Bubble",
            get style() {
              return {
                transform: `rotateZ(${-30 * index() - 15}deg)`
              };
            },
            hittest: false,
            particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
            cameraOrigin: "0 0 40",
            fov: 40,
            lookAt: "0 0 0"
          }, _el$36);
        libs.setProp(_el$37, "visible", itemID == "110016");
        libs.insert(_el$36, libs.createComponent(StoreItem.StoreItemImage, {
          itemid: itemID,
          get style() {
            return {
              transform: `rotateZ(${-30 * index() - 15}deg)`
            };
          }
        }), null);
        libs.effect(_p$ => {
          const _v$12 = {
              transform: `rotateZ(${30 * index() + 15}deg)`
            },
            _v$13 = {
              transform: `rotateZ(${-30 * index() - 15}deg)`
            };
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$36, "style", _v$12, _p$._v$12));
          _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$37, "style", _v$13, _p$._v$13));
          return _p$;
        }, {
          _v$12: undefined,
          _v$13: undefined
        });
        return _el$36;
      })()
    }));
    libs.setProp(_el$21, "tooltip_text", "#Draw_Lucky_Tips");
    libs.insert(_el$31, libs.createComponent(Player.CurrencyIcon, {
      get tokenID() {
        return poolConfig().item;
      }
    }), _el$32);
    libs.insert(_el$30, libs.createComponent(EOM_Button.EOM_Button, {
      get enabled() {
        return libs.memo(() => !!drawEnabled())() && tokenCount() >= poolConfig().one_num;
      },
      get text() {
        return GetLocalization("#Sea_Count_1");
      },
      onactivate: () => draw(1)
    }), null);
    libs.insert(_el$34, libs.createComponent(Player.CurrencyIcon, {
      get tokenID() {
        return poolConfig().item;
      }
    }), _el$35);
    libs.insert(_el$33, libs.createComponent(EOM_Button.EOM_Button, {
      get enabled() {
        return libs.memo(() => !!drawEnabled())() && tokenCount() >= poolConfig().ten_num;
      },
      get text() {
        return GetLocalization("#Sea_Count_10");
      },
      onactivate: () => draw(10)
    }), null);
    libs.insert(_el$1, libs.createComponent(EOM_ToggleButton.EOM_ToggleButton, {
      id: "SkipButton",
      get text() {
        return GetLocalization("#Draw_Skip_Animation");
      },
      onchange: (_, checked) => setSkipAnimation(checked)
    }), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#SeaMystery"),
        _v$2 = GetLocalization("#SeaMysteryDesc"),
        _v$3 = GetLocalization("#RouletteDesc"),
        _v$4 = GetLocalization("#RouletteInfo"),
        _v$5 = `${233 * Math.min(1, luckyPercent())}px`,
        _v$6 = `${Round(luckyPercent() * 100, 1)}%`,
        _v$7 = luckyPercent() >= 0.5,
        _v$8 = `translateY(${-233 * luckyPercent()}px)`,
        _v$9 = `${Round(luckyPercent() * 100, 1)}%`,
        _v$0 = luckyPercent() < 0.5,
        _v$1 = GetLocalization("#Draw_Pool_LuckyValue"),
        _v$10 = `×${poolConfig().one_num}`,
        _v$11 = `×${poolConfig().ten_num}`;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$8, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$19, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$20, "tooltip_text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$23, "height", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$24, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$24, "visible", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$25, "transform", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$27, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$27, "visible", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$28, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$32, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$35, "text", _v$11, _p$._v$11));
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

const DEFAULT_ACTIVITY_DATA = {
  received: "",
  round: 0,
  extra_num: 0,
  total_num: 0,
  activity_id: 0
};
const SeaMysteryTask = props => {
  const activityID = () => props.activityID ?? 901;
  const playerMoonstoneActivityData = solid_utils.createServiceNetData("player_moonstone_activity_data", {});
  const rewards = libs.createMemo(() => {
    const groupedRewards = KeyValues.activity_moonstone[String(activityID())];
    return Object.values(groupedRewards ?? {}).sort((a, b) => a.num - b.num);
  });
  const activityData = libs.createMemo(() => playerMoonstoneActivityData()[String(activityID())] ?? DEFAULT_ACTIVITY_DATA);
  const receivedRewardIDs = libs.createMemo(() => {
    const received = activityData().received;
    if (Array.isArray(received)) return received.map(Number);
    return String(received ?? "").split(",").filter(Boolean).map(Number);
  });
  const progress = () => Number(activityData().extra_num ?? 0);
  const canReceiveAll = libs.createMemo(() => rewards().some(reward => !receivedRewardIDs().includes(reward.reward_id) && progress() >= reward.num));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "SeaMysteryTaskContent"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "LeftContent"
      }, _el$);
      libs.createElement("Image", {
        id: "SeaMysteryTitle"
      }, _el$2);
      const _el$4 = libs.createElement("Label", {
        id: "SeaMysteryTitle2",
        get text() {
          return GetLocalization("#SeaMysteryTitle2");
        }
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        id: "RightContent"
      }, _el$),
      _el$6 = libs.createElement("Panel", {
        id: "ItemList"
      }, _el$5);
    libs.insert(_el$6, libs.createComponent(libs.For, {
      get each() {
        return rewards();
      },
      children: reward => {
        const itemID = () => Object.keys(reward.rewards)[0] ?? "110015";
        const itemCount = () => reward.rewards[itemID()] ?? 0;
        const received = () => receivedRewardIDs().includes(reward.reward_id);
        const claimable = () => progress() >= reward.num;
        return (() => {
          const _el$7 = libs.createElement("Panel", {
              "class": "ItemCard"
            }, null),
            _el$8 = libs.createElement("Panel", {
              id: "CardBG"
            }, _el$7),
            _el$9 = libs.createElement("Panel", {
              id: "SeaTask201Title"
            }, _el$8),
            _el$0 = libs.createElement("Label", {
              get text() {
                return GetLocalization("#SeaMysteryTitle_" + reward.num);
              }
            }, _el$9),
            _el$1 = libs.createElement("Label", {
              id: "ItemCount",
              get text() {
                return itemCount();
              }
            }, _el$8),
            _el$11 = libs.createElement("Label", {
              id: "ProgressText",
              get text() {
                return `${Round(Math.min(reward.num, progress()) / reward.num * 100, 2)}%`;
              }
            }, _el$8);
            libs.createElement("Image", {
              id: "Gift"
            }, _el$7);
          libs.insert(_el$8, libs.createComponent(StoreItem.StoreItemImage, {
            get itemid() {
              return itemID();
            }
          }), _el$1);
          libs.insert(_el$8, libs.createComponent(libs.Switch, {
            get fallback() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                id: "ActionButton",
                enabled: false,
                get text() {
                  return GetLocalization("#TaskUnFinished");
                }
              });
            },
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return received();
                },
                get children() {
                  return libs.createElement("Image", {
                    id: "TaskFinished"
                  }, null);
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return claimable();
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    id: "ActionButton",
                    get text() {
                      return GetLocalization("#DailyTask_Get");
                    },
                    onactivate: () => CallActionRequest("/v1/activity/receive_rewards", {
                      activity_id: activityID(),
                      reward_id: reward.reward_id
                    }, () => {})
                  });
                }
              })];
            }
          }), _el$11);
          libs.insert(_el$8, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
            id: "Progress",
            get value() {
              return Math.min(reward.num, progress());
            },
            min: 0,
            get max() {
              return reward.num;
            }
          }), _el$11);
          libs.effect(_p$ => {
            const _v$ = GetLocalization("#SeaMysteryTitle_" + reward.num),
              _v$2 = itemCount(),
              _v$3 = `${Round(Math.min(reward.num, progress()) / reward.num * 100, 2)}%`;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$0, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "text", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$11, "text", _v$3, _p$._v$3));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined
          });
          return _el$7;
        })();
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(EOM_Button.EOM_Button, {
      horizontalAlign: "center",
      marginTop: "20px",
      get enabled() {
        return canReceiveAll();
      },
      get text() {
        return GetLocalization("#ReceiveAll");
      },
      onactivate: panel => {
        panel.enabled = false;
        CallActionRequest("/v1/activity/batch_receive_rewards", {
          activity_id: activityID()
        }, () => {
          panel.enabled = true;
        });
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$4, "text", GetLocalization("#SeaMysteryTitle2"), _$p));
    return _el$;
  })();
};

const StorePrivilege = props => {
  const language = Language();
  const purchased_product = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const player_ornament = solid_utils.createServiceNetData("player_ornament", {});
  const player_privileges = solid_utils.createPlayerNetDataSignal("common", "player_privileges", {});
  let listHandle;
  const [scrollPercent, setScrollPercent] = libs.createSignal(0);
  const sortedDatas = libs.createMemo(() => {
    const purchases = purchased_product();
    const privileges = player_privileges();
    return [...props.datas].sort((a, b) => {
      const aLimited = a.limit_type > 0 && (purchases[a.id] ?? 0) >= a.limit_count;
      const bLimited = b.limit_type > 0 && (purchases[b.id] ?? 0) >= b.limit_count;
      if (aLimited !== bLimited) return aLimited ? 1 : -1;
      const aHasBuff = HasStoreProductPrivileges(a, privileges) && (a.tag == "Privilege" || a.show_type == 1);
      const bHasBuff = HasStoreProductPrivileges(b, privileges) && (b.tag == "Privilege" || b.show_type == 1);
      if (aHasBuff !== bHasBuff) return aHasBuff ? 1 : -1;
      return a.orderby - b.orderby;
    });
  });
  const sortedDataIndexMap = libs.createMemo(() => {
    const result = {};
    sortedDatas().forEach((data, index) => {
      result[data.id] = index;
    });
    return result;
  });
  const scrollToTargetItem = () => {
    const itemid = props.targetItem?.itemid;
    if (!itemid) {
      return;
    }
    const index = sortedDataIndexMap()[itemid];
    if (index == undefined) {
      return;
    }
    listHandle?.scroll2Child(index, "center");
  };
  libs.createEffect(() => {
    const targetKey = props.targetItem?.key;
    if (targetKey == undefined) {
      return;
    }
    sortedDatas();
    $.Schedule(0.2, scrollToTargetItem);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "StorePrivilege"
    }, null);
    libs.insert(_el$, libs.createComponent(RecycleView.RecycleView, {
      id: "Content",
      direction: "Horizontal",
      input: sortedDatas,
      childConfig: {
        width: 538,
        height: 882
      },
      showBar: false,
      onScrollPercent: setScrollPercent,
      handle: h => listHandle = h,
      onload: () => {
        $.Schedule(0.2, () => {
          scrollToTargetItem();
        });
      },
      children: itemData => {
        let purchased_num = libs.createMemo(() => {
          let data = itemData();
          let purchased_num = purchased_product()[data.id] ?? 0;
          return purchased_num;
        });
        const itemList = libs.createMemo(() => Object.keys(itemData().items ?? {}));
        const memoData = libs.createMemo(() => {
          let data = itemData();
          let price = data.real_price;
          let origin_price = data.origin_price;
          if (data.pay_type == 0) {
            if (language == "english") {
              price = data.overseas_realprice;
              origin_price = data.overseas_originprice;
            } else if (language == "russian") {
              price = data.russia_realprice;
              origin_price = data.russia_originprice;
            }
          }
          let limited = data.limit_type > 0 && purchased_num() >= data.limit_count;
          let hasCosmetic = itemList().some(item_id => player_ornament()[item_id] != undefined);
          return {
            price,
            origin_price,
            limited,
            hasCosmetic
          };
        });
        let refDescContainer;
        let refDescLabel;
        const [canScrollDesc, setCanScrollDesc] = libs.createSignal(false);
        const [descAtBottom, setDescAtBottom] = libs.createSignal(false);
        const getDescScrollRange = () => {
          if (!refDescContainer?.IsValid() || !refDescLabel?.IsValid()) {
            return;
          }
          const scale = refDescContainer.actualuiscale_y || 1;
          return {
            minY: Math.min(0, (refDescContainer.actuallayoutheight - refDescLabel.actuallayoutheight) / scale),
            currentY: parseFloat(refDescLabel.style.y) || 0
          };
        };
        const updateDescScrollState = () => {
          const range = getDescScrollRange();
          if (!range) {
            return;
          }
          const scrollable = range.minY < 0;
          const currentY = scrollable ? Clamp(range.currentY, range.minY, 0) : 0;
          refDescLabel.style.y = `${currentY}px`;
          setCanScrollDesc(scrollable);
          setDescAtBottom(scrollable && currentY <= range.minY + 0.5);
        };
        const scrollDescDown = () => {
          const range = getDescScrollRange();
          if (!range || range.minY >= 0) {
            return;
          }
          const nextY = Clamp(range.currentY - 80, range.minY, 0);
          refDescLabel.style.y = `${nextY}px`;
          setDescAtBottom(nextY <= range.minY + 0.5);
        };
        libs.createEffect(() => {
          itemData().id;
          $.Schedule(0, () => {
            if (refDescLabel?.IsValid()) {
              refDescLabel.style.y = "0px";
              updateDescScrollState();
            }
          });
        });
        const animationDelay = libs.createMemo(() => {
          const index = sortedDataIndexMap()[itemData().id];
          return Math.max(index, 0) * 0.03;
        });
        return (() => {
          const _el$2 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("PrivilegeItem " + itemData().id);
              },
              get animationDelay() {
                return "0s," + animationDelay() + "s";
              },
              get animationDuration() {
                return animationDelay() + "s, 0.4s";
              }
            }, null);
            libs.createElement("Panel", {
              id: "Light"
            }, _el$2);
            libs.createElement("Panel", {
              id: "BG"
            }, _el$2);
            const _el$5 = libs.createElement("Label", {
              id: "Title",
              get text() {
                return "#" + itemData().id;
              }
            }, _el$2);
            libs.createElement("Panel", {
              "class": "Line"
            }, _el$2);
            const _el$7 = libs.createElement("Panel", {
              id: "PrivilegeDescContainer",
              get draggable() {
                return canScrollDesc();
              }
            }, _el$2),
            _el$8 = libs.createElement("Label", {
              id: "PrivilegeDesc",
              get text() {
                return GetLocalization(`#${itemData().id}_description`);
              },
              html: true
            }, _el$7),
            _el$9 = libs.createElement("Panel", {
              id: "Valid"
            }, _el$2);
            libs.createElement("Label", {
              id: "ValidTips",
              text: "#Store_Lifespan"
            }, _el$9);
            const _el$1 = libs.createElement("Label", {
              id: "ValidLabel",
              get text() {
                return `#${itemData().id}_valid`;
              }
            }, _el$9);
            libs.createElement("Panel", {
              "class": "Line BottomLine"
            }, _el$2);
            libs.createElement("Label", {
              id: "RewardTitle",
              text: "#Store_Claimed"
            }, _el$2);
            const _el$12 = libs.createElement("Panel", {
              id: "RewardList"
            }, _el$2);
          const _ref$ = refDescContainer;
          typeof _ref$ === "function" ? libs.use(_ref$, _el$7) : refDescContainer = _el$7;
          libs.setProp(_el$7, "onload", () => $.Schedule(0, updateDescScrollState));
          libs.setProp(_el$7, "onDragStart", (panel, callback) => {
            let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "");
            callback.displayPanel = pDisplayPanel;
            let position = GameUI.GetCursorPosition();
            if (callback.offsetX == undefined || callback.offsetY == undefined) {
              callback.offsetX = pDisplayPanel.GetPositionWithinWindow().x - position[0];
              callback.offsetY = pDisplayPanel.GetPositionWithinWindow().y - position[1];
            }
            let descLabel = refDescLabel;
            let lastPos = GameUI.GetCursorPosition();
            let currentY = parseFloat(descLabel.style.y) || 0;
            function Tick() {
              if (!descLabel?.IsValid()) return;
              let newPos = GameUI.GetCursorPosition();
              let deltaY = newPos[1] - lastPos[1];
              if (deltaY != 0) {
                currentY += deltaY / (panel.actualuiscale_y || 1);
                let minY = Math.min(0, (panel.actuallayoutheight - descLabel.actuallayoutheight) / (panel.actualuiscale_y || 1));
                currentY = Clamp(currentY, minY, 0);
                descLabel.style.y = `${currentY}px`;
                setDescAtBottom(currentY <= minY + 0.5);
                lastPos = newPos;
              }
              SaveData(pDisplayPanel, "dragThink", $.Schedule(0, Tick));
            }
            Tick();
          });
          libs.setProp(_el$7, "onDragEnd", (panel, draggedPanel) => {
            try {
              $.CancelScheduled(LoadData(draggedPanel, "dragThink"));
            } catch (error) {}
            draggedPanel.DeleteAsync(0);
          });
          const _ref$2 = refDescLabel;
          typeof _ref$2 === "function" ? libs.use(_ref$2, _el$8) : refDescLabel = _el$8;
          libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_BaseButton, {
            get ["class"]() {
              return libs.classNames("DownArrow", {
                Show: canScrollDesc()
              });
            },
            get enabled() {
              return !descAtBottom();
            },
            onactivate: scrollDescDown
          }), _el$9);
          libs.insert(_el$12, libs.createComponent(libs.For, {
            get each() {
              return itemList();
            },
            children: itemID => {
              const amounts = itemData().items?.[itemID];
              return libs.createComponent(StoreItem.StoreItemBlock, {
                item_id: itemID,
                amounts: amounts
              });
            }
          }));
          libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
            id: "BuyBtn",
            color: "Confirm",
            get ["class"]() {
              return libs.classNames({
                HasBuff: memoData().limited
              });
            },
            get enabled() {
              return !memoData().limited;
            },
            onactivate: () => {
              let {
                limited
              } = memoData();
              if (limited) {
                return;
              }
              if (memoData().hasCosmetic) {
                return "#Store_HasCosmetic";
              }
              Game.EmitSound("UI.Store.Click");
              ShowPopup("StoreBuyItem", {
                itemData: itemData(),
                purchased_num: purchased_num(),
                group: "StoreBuyItem"
              });
            },
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return !memoData().limited;
                },
                get fallback() {
                  return libs.createElement("Label", {
                    id: "StatLabel",
                    text: "#Store_Activated"
                  }, null);
                },
                get children() {
                  const _el$13 = libs.createElement("Panel", {
                      id: "PriceDisplay",
                      align: "center center",
                      flowChildren: "right"
                    }, null),
                    _el$14 = libs.createElement("Panel", {
                      id: "CurrentPrice",
                      horizontalAlign: "center",
                      flowChildren: "right"
                    }, _el$13),
                    _el$15 = libs.createElement("Label", {
                      id: "CostLabel",
                      get text() {
                        return memoData().price;
                      }
                    }, _el$14),
                    _el$16 = libs.createElement("Label", {
                      id: "CostOriginPriceLabel",
                      get text() {
                        return memoData().origin_price;
                      }
                    }, _el$13);
                  libs.setProp(_el$13, "align", "center center");
                  libs.setProp(_el$13, "flowChildren", "right");
                  libs.setProp(_el$14, "horizontalAlign", "center");
                  libs.setProp(_el$14, "flowChildren", "right");
                  libs.insert(_el$14, libs.createComponent(Player.CurrencyIcon, {
                    get tokenID() {
                      return itemData().pay_type;
                    }
                  }), _el$15);
                  libs.effect(_p$ => {
                    const _v$ = memoData().price,
                      _v$2 = memoData().price != memoData().origin_price,
                      _v$3 = memoData().origin_price;
                    _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$15, "text", _v$, _p$._v$));
                    _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "visible", _v$2, _p$._v$2));
                    _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$16, "text", _v$3, _p$._v$3));
                    return _p$;
                  }, {
                    _v$: undefined,
                    _v$2: undefined,
                    _v$3: undefined
                  });
                  return _el$13;
                }
              });
            }
          }), null);
          libs.effect(_p$ => {
            const _v$4 = libs.classNames("PrivilegeItem " + itemData().id),
              _v$5 = "0s," + animationDelay() + "s",
              _v$6 = animationDelay() + "s, 0.4s",
              _v$7 = "#" + itemData().id,
              _v$8 = canScrollDesc(),
              _v$9 = GetLocalization(`#${itemData().id}_description`),
              _v$0 = `#${itemData().id}_valid`;
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$2, "class", _v$4, _p$._v$4));
            _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$2, "animationDelay", _v$5, _p$._v$5));
            _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$2, "animationDuration", _v$6, _p$._v$6));
            _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$5, "text", _v$7, _p$._v$7));
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$7, "draggable", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$8, "text", _v$9, _p$._v$9));
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$1, "text", _v$0, _p$._v$0));
            return _p$;
          }, {
            _v$4: undefined,
            _v$5: undefined,
            _v$6: undefined,
            _v$7: undefined,
            _v$8: undefined,
            _v$9: undefined,
            _v$0: undefined
          });
          return _el$2;
        })();
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "LeftArrow",
      get enabled() {
        return scrollPercent() != 0;
      },
      onactivate: () => {
        listHandle?.scroll(-toFiniteNumber(listHandle.refRoot?.actuallayoutwidth));
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "RightArrow",
      get enabled() {
        return scrollPercent() != 1;
      },
      onactivate: () => {
        listHandle?.scroll(toFiniteNumber(listHandle.refRoot?.actuallayoutwidth));
      }
    }), null);
    return _el$;
  })();
};

const info_products = solid_utils.createGlobalServiceNetData("info_products", {});
const getStoreItemData = () => {
  let result = {};
  const now = Date.now() / 1000;
  for (const itemname in KeyValues.info_shop_product) {
    const itemdata = KeyValues.info_shop_product[itemname];
    const info_product = info_products()[itemdata.id];
    const effective_start_time = info_product ? info_product.start_time : itemdata.start_time;
    const effective_end_time = info_product ? info_product.end_time : itemdata.end_time;
    if ((effective_start_time < now || effective_start_time == 0) && (effective_end_time > now || effective_end_time == 0) && (itemdata.hide_time > now || !itemdata.hide_time) && itemdata.hide == 0 || itemdata.tag == "Privilege") {
      const tags = itemdata.tag.split("|");
      tags.forEach(tag => {
        result[tag] = result[tag] || [];
        result[tag].push(itemdata);
      });
    }
  }
  return result;
};
const [storeItemData, setStoreItemData] = libs.createSignal(getStoreItemData());
const purchased_product = solid_utils.createServiceNetData("player_shop_product_limits", {});
const open_store = solid_utils.createServiceNetData("open_shop", {
  value: false
});
const [targetPrivilegeItem, setTargetPrivilegeItem] = libs.createSignal();
let targetPrivilegeItemKey = 0;
const separatedStoreTags = new Set(["Fish", "Explore", "Flowers", "StarStone", "BoardSlotGift", "BoardSlot", "MiningGift", "Mining", "pvp_shop"]);
const staticStoreMenus = ["collection_vip", "collection_treasure", "MoonDraw"];
const seaMysteryPoolID = "3001";
const hasSeaMysteryPool = () => KeyValues.drawcards[seaMysteryPoolID] != undefined;
const storeMenuOrder = ["Privilege", "Hot", "Gift", "Resource", "MoonDraw", "collection_vip", "collection_treasure", "Moon", "Universe"];
const getStoreMenuOrder = tag => {
  const order = storeMenuOrder.indexOf(tag);
  return order == -1 ? storeMenuOrder.length : order;
};
const menuKeys = libs.createMemo(() => Array.from(new Set([...Object.keys(storeItemData()).filter(tag => !separatedStoreTags.has(tag)), ...staticStoreMenus, ...(hasSeaMysteryPool() ? ["Universe"] : [])])).sort((a, b) => getStoreMenuOrder(a) - getStoreMenuOrder(b)));
const menuList = libs.createMemo(() => {
  const list = {};
  for (const tag of menuKeys()) {
    list[tag] = [];
  }
  if (hasSeaMysteryPool()) {
    list.Universe = ["SeaMysteryTurntable", "SeaMysteryTask"];
  }
  return list;
}, {}, {
  equals: (a, b) => {
    let aKeys = Object.keys(a);
    let bKeys = Object.keys(b);
    if (aKeys.length != bKeys.length) return false;
    for (let i = 0; i < aKeys.length; i++) {
      if (aKeys[i] != bKeys[i]) return false;
      let key = aKeys[i];
      if (a[key].length != b[key].length) return false;
      for (let j = 0; j < a[key].length; j++) {
        if (a[key][j] != b[key][j]) return false;
      }
    }
    return true;
  }
});
const {
  LayoutMenu,
  show,
  setShow,
  menuName,
  secondTabName: menu2Name,
  setMenuName,
  setSecondTabName
} = EOM_MenuLayout.createMenuLayout("store", menuList);
libs.createEffect(libs.on([show, info_products], ([isShown]) => {
  if (isShown) {
    setStoreItemData(getStoreItemData());
  }
}));
libs.onMount(() => {
  let gameEventIDList = [];
  gameEventIDList.push(useClientSideEvent("store_jump_to_privilege_item", event => {
    const itemid = Number(event.itemid);
    if (!itemid) {
      return;
    }
    setTargetPrivilegeItem({
      itemid,
      key: targetPrivilegeItemKey++
    });
    JumpToMenu({
      window_name: "store",
      menu: "Privilege",
      force: true
    });
  }));
  gameEventIDList.push(useClientSideEvent("directly_purchase", event => {
    if (!open_store().value) {
      return;
    }
    if (event.itemid) {
      let hasFind = false;
      const now = Date.now() / 1000;
      for (const itemname in KeyValues.info_shop_product) {
        const itemData = KeyValues.info_shop_product[itemname];
        const info_product = info_products()[itemData.id];
        const effective_start_time = info_product ? info_product.start_time : itemData.start_time;
        const effective_end_time = info_product ? info_product.end_time : itemData.end_time;
        if ((effective_start_time < now || effective_start_time == 0) && (effective_end_time > now || effective_end_time == 0)) {
          if (event.itemid == itemData.id) {
            hasFind = true;
            ShowPopup("StoreBuyItem", {
              itemData,
              purchased_num: purchased_product()[event.itemid],
              group: "StoreBuyItem",
              buy_count: event.buy_count
            });
            if (event.source != undefined) {
              GameUI.CustomUIConfig().ReportClick("product|" + itemData.id, event.source + "|click");
            }
            break;
          }
        }
        if (hasFind) {
          break;
        }
      }
    }
  }));
  libs.onCleanup(() => {
    for (const id of gameEventIDList) {
      GameEvents.Unsubscribe(id);
    }
  });
});
function Store() {
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const [seaMysteryCurrencyValues, setSeaMysteryCurrencyValues] = libs.createSignal();
  const tokenIDs = libs.createMemo(() => {
    if (menuName() == "MoonDraw") {
      return [110001, 110026];
    }
    if (menuName() == "Active") {
      return [110001, 110005];
    }
    if (menuName() == "StarseaShop") {
      return [110001, 110007];
    }
    if (menuName() == "Universe") {
      if (menu2Name() == "SeaMysteryTurntable") {
        return [110016, 110015];
      } else {
        return [110001, 110015];
      }
    }
    return [110001, 110002];
  });
  const setSeaMysteryDrawing = drawing => {
    if (!drawing) {
      setSeaMysteryCurrencyValues();
      return;
    }
    setSeaMysteryCurrencyValues(Object.fromEntries(tokenIDs().map(tokenID => [tokenID, playerTokens()[tokenID]?.amounts ?? 0])));
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    renderOnShow: true,
    id: "StoreMain",
    get show() {
      return show();
    },
    get className() {
      return `${menuName()} ${menu2Name()}`;
    },
    name: "MenuButton_store",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Image", {
          id: "StoreBG",
          get ["class"]() {
            return "StoreTab" + menuName() + (menu2Name() ?? "");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$, "class", "StoreTab" + menuName() + (menu2Name() ?? ""), _$p));
        return _el$;
      })(), libs.createComponent(LayoutMenu, {}), libs.createComponent(Player.CurrencyGroup, {
        get tokens() {
          return tokenIDs();
        },
        get values() {
          return seaMysteryCurrencyValues();
        },
        exchangeButton: true,
        recentOrder: true
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Privilege";
            },
            get children() {
              return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
                id: "Privilege",
                show: true,
                get topbarChildren() {
                  return (() => {
                    const _el$2 = libs.createElement("Panel", {
                        id: "BGRoot"
                      }, null);
                      libs.createElement("DOTAParticleScenePanel", {
                        id: "BGLight",
                        particleName: "particles/ui/game/ui_game_general_special_effects_04_2_fx.vpcf",
                        cameraOrigin: "0 0 700",
                        fov: 90,
                        lookAt: "0 0 0",
                        hittest: false,
                        squarePixels: true
                      }, _el$2);
                    return _el$2;
                  })();
                },
                get children() {
                  return libs.createComponent(StorePrivilege, {
                    get datas() {
                      return storeItemData()["Privilege"] ?? [];
                    },
                    get targetItem() {
                      return targetPrivilegeItem();
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "collection_vip";
            },
            get children() {
              return libs.createComponent(CollectionVip, {
                show: true
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "collection_treasure";
            },
            get children() {
              return libs.createComponent(CollectionTreasure, {
                show: true
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Universe";
            },
            get children() {
              return libs.createComponent(libs.Switch, {
                get fallback() {
                  return libs.createComponent(SeaMystery, {
                    get itemList() {
                      return Array.from(storeItemData()["Universe"] ?? []).sort((a, b) => b.orderby - a.orderby);
                    },
                    get poolID() {
                      return Number(seaMysteryPoolID);
                    },
                    onDrawStateChange: setSeaMysteryDrawing
                  });
                },
                get children() {
                  return libs.createComponent(libs.Match, {
                    get when() {
                      return menu2Name() == "SeaMysteryTask";
                    },
                    get children() {
                      return libs.createComponent(SeaMysteryTask, {
                        activityID: 901
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            when: true,
            get children() {
              return libs.createComponent(StoreTagPage.StoreTagPage, {
                get tag() {
                  return menuName();
                },
                get id() {
                  return menuName();
                },
                show: true
              });
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(Store, {}), $.GetContextPanel());
if (!CustomUIConfig.__LocalISOCode) {
  let steamid = Game.GetLocalPlayerInfo().player_steamid;
  let uid = Steam_64_3(steamid);
  if (uid == "NaN") uid = "0";
  const sCommand = "iso_code_result_" + Math.floor(Date.now() / 1000);
  Game.AddCommand(sCommand, (_, code) => {
    CustomUIConfig.__LocalISOCode = code;
  }, "", 67108864);
  ClientRequest("get_iso_code", {
    uid,
    response_key: sCommand
  });
}