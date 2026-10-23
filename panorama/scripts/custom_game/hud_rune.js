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
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_CheckBox = require('./EOM_CheckBox.js');
var EOM_MultiDropDown = require('./EOM_MultiDropDown.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var Player = require('./Player.js');
var RecycleView = require('./RecycleView.js');
var server_rune_utils = require('./server_rune_utils.js');
var rune_data = require('./rune_data.js');
var solid_utils = require('./solid_utils.js');
var equipment_comp = require('./equipment_comp.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var StoreItem = require('./StoreItem.js');
var equipment_utils = require('./equipment_utils.js');
var rune_components = require('./rune_components.js');
var hero_selection_bar = require('./hero_selection_bar.js');
var global_selection = require('./global_selection.js');
require('./EOM_TextEntry.js');
require('./EOMChildren.js');
require('./service_netdata_helper.js');
require('./attribute_formatter.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_HeroImage.js');

const RUNE_BREAK_SLOT_NUM = 5;
const RUNE_BREAK_MAX_SELECT_NUM = 30;
const BREAK_ATTR_LIST = Object.values(KeyValues.rune_break_level_exp).sort((a, b) => a.level - b.level);
const MAX_LEVEL = BREAK_ATTR_LIST[BREAK_ATTR_LIST.length - 1]?.level ?? 0;
const FIRST_LEVEL_EXP = KeyValues.rune_break_level_exp[1]?.exp ?? BREAK_ATTR_LIST[0]?.exp ?? 0;
const RUNE_RARITY_OPTIONS = Object.values(KeyValues.rune_rarity_setting).sort((a, b) => a.rarity - b.rarity);
const ENGRAVING_RARITY_OPTIONS = Object.values(KeyValues.engraving_rarity_setting).sort((a, b) => a.rarity - b.rarity);
const RUNE_BREAK_EXP_ITEM_ID = "200002";
const getRuneBreakEffects = effect => {
  if (effect == undefined) {
    return [];
  }
  return Object.entries(effect).map(([name, value]) => ({
    name,
    value: Number(value)
  }));
};
const getRuneBreakExp = rune => {
  if (rune == undefined) {
    return 0;
  }
  const bonus = KeyValues.rune_rarity_setting[rune.rarity]?.break_bonus;
  if (bonus == undefined) {
    return 0;
  }
  return toFiniteNumber(bonus[RUNE_BREAK_EXP_ITEM_ID]);
};
const getRuneBreakLevelExp = level => {
  const data = KeyValues.rune_break_level_exp[level] ?? BREAK_ATTR_LIST.find(item => item.level === level);
  if (data != undefined) {
    return data.exp;
  }
  return KeyValues.rune_break_level_exp[level + 1]?.exp ?? FIRST_LEVEL_EXP;
};
const RuneBreakAttributeInfo = props => {
  let lvInfoListHandle;
  let lvInfoScrollSchedule;
  const addedAttr = libs.createMemo(() => {
    const effectAttr = {};
    for (const data of BREAK_ATTR_LIST) {
      if (data.level > props.currentLevel()) {
        continue;
      }
      for (const attr of getRuneBreakEffects(data.effect)) {
        effectAttr[attr.name] = toFiniteNumber(effectAttr[attr.name]) + attr.value;
      }
    }
    return Object.entries(effectAttr).map(([name, value]) => ({
      name,
      value
    }));
  });
  function scrollToCurrentLv(bNoSmooth = false) {
    const index = BREAK_ATTR_LIST.findIndex(data => data.level == props.currentLevel());
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
  libs.createEffect(libs.on(props.currentLevel, () => {
    scheduleScrollToCurrentLv();
  }));
  libs.onCleanup(() => {
    if (lvInfoScrollSchedule != undefined) {
      try {
        $.CancelScheduled(lvInfoScrollSchedule);
      } catch (error) {}
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "RuneBreakAttributeRoot"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "AttributeLvInfo"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "AddedAttrList",
        scroll: "y",
        "class": "VerticalScrollStyle"
      }, _el$2);
    libs.insert(_el$2, libs.createComponent(RecycleView.RecycleView, {
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
        const attrs = libs.createMemo(() => getRuneBreakEffects(dataAccessor().effect));
        return (() => {
          const _el$4 = libs.createElement("Panel", {
              get style() {
                return {
                  zIndex: MAX_LEVEL - dataAccessor().level
                };
              },
              get ["class"]() {
                return libs.classNames("LvInfoItemContainer", {
                  Unlock: props.currentLevel() >= dataAccessor().level,
                  Currentlv: props.currentLevel() == dataAccessor().level,
                  Last: dataAccessor().level == MAX_LEVEL
                });
              }
            }, null),
            _el$5 = libs.createElement("Panel", {
              id: "LvInfo"
            }, _el$4),
            _el$6 = libs.createElement("Label", {
              id: "Level",
              get text() {
                return dataAccessor().level;
              }
            }, _el$5),
            _el$7 = libs.createElement("Panel", {
              align: "center center",
              flowChildren: "down"
            }, _el$5);
            libs.createElement("Panel", {
              id: "Line"
            }, _el$4);
          libs.setProp(_el$7, "align", "center center");
          libs.setProp(_el$7, "flowChildren", "down");
          libs.insert(_el$7, libs.createComponent(libs.For, {
            get each() {
              return attrs();
            },
            children: attr => (() => {
              const _el$9 = libs.createElement("Label", {
                id: "Attr",
                get text() {
                  return GetPropertyLocalization(attr.name, attr.value);
                },
                html: true
              }, null);
              libs.effect(_$p => libs.setProp(_el$9, "text", GetPropertyLocalization(attr.name, attr.value), _$p));
              return _el$9;
            })()
          }));
          libs.effect(_p$ => {
            const _v$ = {
                zIndex: MAX_LEVEL - dataAccessor().level
              },
              _v$2 = libs.classNames("LvInfoItemContainer", {
                Unlock: props.currentLevel() >= dataAccessor().level,
                Currentlv: props.currentLevel() == dataAccessor().level,
                Last: dataAccessor().level == MAX_LEVEL
              }),
              _v$3 = dataAccessor().level;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "style", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "class", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined
          });
          return _el$4;
        })();
      }
    }), _el$3);
    libs.insert(_el$2, libs.createComponent(equipment_comp.EquipSeparator, {
      id: "LvInfoSeparator",
      text: "#RuneBreak_CurrentAttributes"
    }), _el$3);
    libs.setProp(_el$3, "scroll", "y");
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return addedAttr().length > 0;
      },
      get fallback() {
        return libs.createElement("Label", {
          "class": "AttrLabel",
          text: "#RuneBreak_CurrentAttributesEmpty"
        }, null);
      },
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return addedAttr();
          },
          children: attr => (() => {
            const _el$1 = libs.createElement("Label", {
              "class": "AttrLabel",
              get text() {
                return GetPropertyLocalization(attr.name, attr.value);
              },
              html: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$1, "text", GetPropertyLocalization(attr.name, attr.value), _$p));
            return _el$1;
          })()
        });
      }
    }));
    return _el$;
  })();
};
const RuneBreak = props => {
  const [fastAddRarity, setFastAddRarity] = libs.createSignal(0);
  const selectedItems = libs.createMemo(() => props.breakItems().filter(item => item != undefined));
  const addedExp = libs.createMemo(() => {
    if (props.breakType() !== "rune") {
      return 0;
    }
    return selectedItems().reduce((result, item) => result + getRuneBreakExp(item), 0);
  });
  const rewardList = libs.createMemo(() => {
    const rewardMap = {};
    for (const item of selectedItems()) {
      if (props.breakType() === "rune") {
        const bonus = KeyValues.rune_rarity_setting[item.rarity]?.break_bonus;
        for (const [itemID, amount] of Object.entries(bonus ?? {})) {
          if (itemID === RUNE_BREAK_EXP_ITEM_ID) {
            continue;
          }
          const value = toFiniteNumber(amount);
          if (value > 0) {
            rewardMap[itemID] = toFiniteNumber(rewardMap[itemID]) + value;
          }
        }
        continue;
      }
      const bonus = KeyValues.engraving_rarity_setting[item.rarity]?.break_bonus;
      for (const reward of bonus?.split("|") ?? []) {
        const [itemID, rawAmount] = reward.split(":");
        const amount = toFiniteNumber(rawAmount);
        if (itemID && amount > 0) {
          rewardMap[itemID] = toFiniteNumber(rewardMap[itemID]) + amount;
        }
      }
    }
    return Object.entries(rewardMap).map(([itemID, amount]) => ({
      itemID,
      amount
    })).sort((a, b) => Number(a.itemID) - Number(b.itemID));
  });
  libs.createEffect(libs.on(props.breakType, () => {
    setFastAddRarity(0);
  }));
  const getBreakWindowClass = libs.createMemo(() => {
    const level = props.currentLevel();
    if (level < 10) {
      return "Level_1_9";
    }
    if (level < 20) {
      return "Level_10_19";
    }
    return "Level_20";
  });
  const target = libs.createMemo(() => {
    const currentLevel = Math.min(props.currentLevel(), MAX_LEVEL);
    if (currentLevel >= MAX_LEVEL) {
      return {
        addedLevel: 0,
        finalLevel: currentLevel,
        finalExp: props.currentExp(),
        finalProgress: 100,
        realProgress: 100
      };
    }
    let finalExp = props.currentExp() + addedExp();
    let finalLevel = currentLevel;
    let addedLevel = 0;
    while (finalLevel < MAX_LEVEL) {
      const levelExp = getRuneBreakLevelExp(finalLevel);
      if (levelExp <= 0 || finalExp < levelExp) {
        break;
      }
      finalExp -= levelExp;
      finalLevel++;
      addedLevel++;
    }
    const currentLevelExp = getRuneBreakLevelExp(currentLevel);
    const finalLevelExp = getRuneBreakLevelExp(finalLevel);
    const realProgress = currentLevelExp > 0 ? Math.min(100, props.currentExp() / currentLevelExp * 100) : 100;
    const finalProgress = finalLevel >= MAX_LEVEL ? 100 : finalLevelExp > 0 ? Math.min(100, finalExp / finalLevelExp * 100) : 100;
    return {
      addedLevel,
      finalLevel,
      finalExp,
      finalProgress: addedLevel > 0 ? 100 : finalProgress,
      realProgress
    };
  });
  const currentMaxExp = libs.createMemo(() => getRuneBreakLevelExp(Math.min(props.currentLevel(), MAX_LEVEL)));
  const hasSelectedItems = libs.createMemo(() => selectedItems().length > 0);
  let expBar;
  let expAnimBar;
  let expLabel;
  let breakParticle;
  let curStack = 0;
  let targetStack = 0;
  let barProgress = 0;
  let targetProgress = 0;
  let prevAddedExp = 0;
  let shouldStopAt100 = false;
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
  libs.createEffect(() => {
    const currentTarget = target();
    const added = addedExp();
    if (added > 0) {
      const currentLevel = Math.min(props.currentLevel(), MAX_LEVEL);
      const currentLevelExp = getRuneBreakLevelExp(currentLevel);
      const startProgress = currentLevelExp > 0 ? Math.min(100, props.currentExp() / currentLevelExp * 100) : 100;
      if (prevAddedExp === 0) {
        barProgress = startProgress;
        curStack = 0;
      }
    } else {
      barProgress = 0;
      curStack = 0;
      shouldStopAt100 = false;
    }
    prevAddedExp = added;
    targetStack = currentTarget.addedLevel > 0 ? 1 : 0;
    targetProgress = currentTarget.addedLevel > 0 ? 100 : currentTarget.finalProgress;
    shouldStopAt100 = currentTarget.addedLevel > 0;
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
      const realLv = Math.min(props.currentLevel(), MAX_LEVEL);
      const realLvExp = getRuneBreakLevelExp(realLv);
      const realProgress = realLv >= MAX_LEVEL ? 100 : realLvExp > 0 ? Math.min(100, props.currentExp() / realLvExp * 100) : 100;
      if (expBar != undefined) {
        expBar.style.clip = `rect( 0%, ${realProgress}%, 100%, 0% )`;
      }
      if (addedExp() > 0 && expAnimBar) {
        expAnimBar.style.clip = `rect( 0%, ${barProgress}%, 100%, 0% )`;
      } else if (expAnimBar) {
        expAnimBar.style.clip = `rect( 0%, 0%, 100%, 0% )`;
      }
      if (expLabel) {
        if (props.currentLevel() < MAX_LEVEL) {
          expLabel.text = `${props.currentExp()}/${realLvExp}`;
        } else {
          expLabel.text = `${props.currentExp()}`;
        }
      }
    }, 10);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  libs.onCleanup(() => {
    if (breakParticleSchedule != undefined) {
      try {
        $.CancelScheduled(breakParticleSchedule);
      } catch (error) {}
    }
  });
  const handleSlotDragEnter = (panel, draggedPanel) => {
    const dragKey = props.breakType() === "rune" ? "rune" : "engraving";
    const itemID = Number(LoadData(draggedPanel, dragKey)) || 0;
    if (itemID <= 0 || props.requesting()) {
      return;
    }
    panel.AddClass("DropTarget");
  };
  const handleSlotDragLeave = panel => {
    panel.RemoveClass("DropTarget");
  };
  const handleSlotDragDrop = (slot, panel, draggedPanel) => {
    panel.RemoveClass("DropTarget");
    const dragKey = props.breakType() === "rune" ? "rune" : "engraving";
    const itemID = Number(LoadData(draggedPanel, dragKey)) || 0;
    if (itemID <= 0 || props.requesting()) {
      return;
    }
    props.onDropItem(slot, itemID);
  };
  return (() => {
    const _el$10 = libs.createElement("Panel", {
        id: "RuneBreakRoot",
        "class": "RuneContentSubRoot"
      }, null),
      _el$11 = libs.createElement("Panel", {
        id: "RuneBreakContent"
      }, _el$10),
      _el$12 = libs.createElement("Panel", {
        id: "ClickPanel",
        get onactivate() {
          return props.onShowBreakAttrs;
        }
      }, _el$11),
      _el$13 = libs.createElement("Panel", {
        id: "RuneBreakWindow",
        get ["class"]() {
          return libs.classNames(getBreakWindowClass());
        }
      }, _el$11),
      _el$14 = libs.createElement("Panel", {
        id: "BreakSlotsContainer"
      }, _el$13),
      _el$15 = libs.createElement("Panel", {
        id: "BreakSlots"
      }, _el$14),
      _el$17 = libs.createElement("Panel", {
        id: "CenterImage"
      }, _el$14),
      _el$18 = libs.createElement("DOTAParticleScenePanel", {
        id: "BreakForgeParticle",
        particleName: "particles/ui/game/ui_game_equipment_interface_02_fx.vpcf",
        cameraOrigin: "0 0 250",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$14),
      _el$19 = libs.createElement("Panel", {
        id: "LevelInfo"
      }, _el$14),
      _el$20 = libs.createElement("Panel", {
        width: "100%",
        verticalAlign: "center",
        flowChildren: "down"
      }, _el$19),
      _el$21 = libs.createElement("Label", {
        verticalAlign: "center",
        text: "#RuneBreak_Level"
      }, _el$20),
      _el$22 = libs.createElement("Label", {
        get text() {
          return `Lv.${props.currentLevel()}${target().addedLevel > 0 ? ToColor(`+${target().addedLevel}`, "#53b646") : ""}`;
        },
        html: true
      }, _el$20),
      _el$23 = libs.createElement("Panel", {
        "class": "ToolTipInfo",
        get onactivate() {
          return props.onToggleBreakAttrs;
        }
      }, _el$19),
      _el$24 = libs.createElement("Panel", {
        id: "FastAdd"
      }, _el$13),
      _el$26 = libs.createElement("Panel", {
        id: "ExpBarContainer"
      }, _el$13),
      _el$27 = libs.createElement("Image", {
        id: "ExpAnimBar"
      }, _el$26),
      _el$28 = libs.createElement("Image", {
        id: "ExpBar"
      }, _el$26),
      _el$29 = libs.createElement("Label", {
        id: "CurExp",
        get text() {
          return libs.memo(() => props.currentLevel() < MAX_LEVEL)() ? `${props.currentExp()}/${currentMaxExp()}` : `${props.currentExp()}`;
        }
      }, _el$26),
      _el$30 = libs.createElement("Label", {
        id: "AddexExp",
        get text() {
          return `+${addedExp()}`;
        }
      }, _el$26),
      _el$32 = libs.createElement("Panel", {
        id: "BreakReward",
        get ["class"]() {
          return libs.classNames({
            Show: rewardList().length > 0
          });
        }
      }, _el$13);
      libs.createElement("Label", {
        id: "TipsText",
        text: "#RuneBreak_ItemReturn"
      }, _el$32);
      const _el$34 = libs.createElement("Panel", {
        id: "BreakRewardList",
        flowChildren: "right"
      }, _el$32);
    libs.insert(_el$15, libs.createComponent(libs.For, {
      get each() {
        return Array(RUNE_BREAK_SLOT_NUM);
      },
      children: (_, idx) => {
        const slotItem = () => props.breakItems()[idx()];
        return (() => {
          const _el$35 = libs.createElement("Panel", {
              get id() {
                return "BreakSlot" + idx();
              },
              get ["class"]() {
                return libs.classNames("BreakSlot", {
                  Select: idx() == props.selectedBreakSlot()
                });
              }
            }, null);
            libs.createElement("Panel", {
              id: "Selected"
            }, _el$35);
          libs.setProp(_el$35, "onDragEnter", (panel, draggedPanel) => {
            handleSlotDragEnter(panel, draggedPanel);
          });
          libs.setProp(_el$35, "onDragLeave", panel => {
            handleSlotDragLeave(panel);
          });
          libs.setProp(_el$35, "onDragDrop", (panel, draggedPanel) => {
            handleSlotDragDrop(idx(), panel, draggedPanel);
          });
          libs.setProp(_el$35, "onactivate", () => {
            props.onSelectBreakSlot(idx());
          });
          libs.setProp(_el$35, "oncontextmenu", () => {
            props.onClearBreakSlot(idx());
          });
          libs.insert(_el$35, libs.createComponent(libs.Show, {
            get when() {
              return slotItem();
            },
            get fallback() {
              return libs.createElement("Panel", {
                id: "Empty"
              }, null);
            },
            get children() {
              const _el$37 = libs.createElement("Panel", {
                  get ["class"]() {
                    return `RuneBreakSlotIconRoot Rarity${slotItem().rarity}`;
                  }
                }, null),
                _el$38 = libs.createElement("Image", {
                  "class": "RuneBreakSlotIcon",
                  get src() {
                    return libs.memo(() => props.breakType() === "rune")() ? rune_data.getRuneIconPath(slotItem()) : server_rune_utils.getEngravingIconPath(slotItem());
                  }
                }, _el$37);
              libs.effect(_p$ => {
                const _v$10 = `RuneBreakSlotIconRoot Rarity${slotItem().rarity}`,
                  _v$11 = libs.memo(() => props.breakType() === "rune")() ? rune_data.getRuneIconPath(slotItem()) : server_rune_utils.getEngravingIconPath(slotItem());
                _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$37, "class", _v$10, _p$._v$10));
                _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$38, "src", _v$11, _p$._v$11));
                return _p$;
              }, {
                _v$10: undefined,
                _v$11: undefined
              });
              return _el$37;
            }
          }), null);
          libs.effect(_p$ => {
            const _v$12 = "BreakSlot" + idx(),
              _v$13 = libs.classNames("BreakSlot", {
                Select: idx() == props.selectedBreakSlot()
              });
            _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$35, "id", _v$12, _p$._v$12));
            _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$35, "class", _v$13, _p$._v$13));
            return _p$;
          }, {
            _v$12: undefined,
            _v$13: undefined
          });
          return _el$35;
        })();
      }
    }));
    libs.insert(_el$14, libs.createComponent(libs.Show, {
      get when() {
        return selectedItems().length > RUNE_BREAK_SLOT_NUM;
      },
      get children() {
        const _el$16 = libs.createElement("Label", {
          id: "BreakSelectCount",
          hittest: false,
          text: "#RuneBreak_SelectedCount",
          get vars() {
            return {
              value: selectedItems().length
            };
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$16, "vars", {
          value: selectedItems().length
        }, _$p));
        return _el$16;
      }
    }), _el$17);
    const _ref$ = breakParticle;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$18) : breakParticle = _el$18;
    libs.setProp(_el$20, "width", "100%");
    libs.setProp(_el$20, "verticalAlign", "center");
    libs.setProp(_el$20, "flowChildren", "down");
    libs.setProp(_el$21, "verticalAlign", "center");
    libs.setProp(_el$23, "tooltip_text", "#RuneBreak_LevelDescription");
    libs.insert(_el$24, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
      "class": "BreakTypeBreadcrumb",
      get list() {
        return [GetLocalization("#MenuTabButton_Rune"), GetLocalization("#MenuTabButton_Engraving")];
      },
      get selected() {
        return props.breakType() === "engraving" ? 2 : 1;
      },
      onChange: index => props.onChangeBreakType(index == 1 ? "engraving" : "rune")
    }), null);
    libs.insert(_el$24, libs.createComponent(libs.Show, {
      get when() {
        return props.breakType() === "engraving";
      },
      get fallback() {
        return libs.createComponent(EOM_DropDown.EOM_DropDown, {
          type: "EquipmentDropDown",
          get index() {
            return fastAddRarity();
          },
          menuPosition: "top",
          onChange: index => {
            setFastAddRarity(index);
          },
          get children() {
            return [libs.createElement("Label", {
              text: "#RuneBreak_FilterAll"
            }, null), libs.createComponent(libs.For, {
              each: RUNE_RARITY_OPTIONS,
              children: (rarity, idx) => (() => {
                const _el$41 = libs.createElement("Label", {
                  get style() {
                    return {
                      color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                    };
                  },
                  get text() {
                    return `#RuneBreak_RuneRarity${rarity.rarity}`;
                  }
                }, null);
                libs.effect(_p$ => {
                  const _v$14 = {
                      color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                    },
                    _v$15 = `#RuneBreak_RuneRarity${rarity.rarity}`;
                  _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$41, "style", _v$14, _p$._v$14));
                  _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$41, "text", _v$15, _p$._v$15));
                  return _p$;
                }, {
                  _v$14: undefined,
                  _v$15: undefined
                });
                return _el$41;
              })()
            })];
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_DropDown.EOM_DropDown, {
          type: "EquipmentDropDown",
          get index() {
            return fastAddRarity();
          },
          menuPosition: "top",
          onChange: index => {
            setFastAddRarity(index);
          },
          get children() {
            return [libs.createElement("Label", {
              text: "#RuneBreak_FilterAll"
            }, null), libs.createComponent(libs.For, {
              each: ENGRAVING_RARITY_OPTIONS,
              children: (rarity, idx) => (() => {
                const _el$42 = libs.createElement("Label", {
                  get style() {
                    return {
                      color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                    };
                  },
                  get text() {
                    return `#RuneBreak_RuneRarity${rarity.rarity}`;
                  }
                }, null);
                libs.effect(_p$ => {
                  const _v$16 = {
                      color: equipment_utils.EQUIP_RARITY_COLOR[idx()]
                    },
                    _v$17 = `#RuneBreak_RuneRarity${rarity.rarity}`;
                  _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$42, "style", _v$16, _p$._v$16));
                  _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$42, "text", _v$17, _p$._v$17));
                  return _p$;
                }, {
                  _v$16: undefined,
                  _v$17: undefined
                });
                return _el$42;
              })()
            })];
          }
        });
      }
    }), null);
    libs.insert(_el$24, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
      text: "#RuneBreak_FastAdd",
      get enabled() {
        return !props.requesting();
      },
      onactivate: () => {
        const rarityOptions = props.breakType() === "rune" ? RUNE_RARITY_OPTIONS : ENGRAVING_RARITY_OPTIONS;
        const rarity = fastAddRarity() == 0 ? 0 : rarityOptions[fastAddRarity() - 1]?.rarity ?? 0;
        props.onFastAdd(rarity);
      }
    }), null);
    const _ref$2 = expAnimBar;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$27) : expAnimBar = _el$27;
    const _ref$3 = expBar;
    typeof _ref$3 === "function" ? libs.use(_ref$3, _el$28) : expBar = _el$28;
    const _ref$4 = expLabel;
    typeof _ref$4 === "function" ? libs.use(_ref$4, _el$29) : expLabel = _el$29;
    libs.insert(_el$26, libs.createComponent(libs.Show, {
      get when() {
        return target().addedLevel > 0;
      },
      get children() {
        return libs.createElement("Panel", {
          id: "UpgradeIcon"
        }, null);
      }
    }), null);
    libs.setProp(_el$34, "flowChildren", "right");
    libs.insert(_el$34, libs.createComponent(libs.For, {
      get each() {
        return rewardList();
      },
      children: reward => (() => {
        const _el$43 = libs.createElement("Panel", {
            "class": "RewardItem"
          }, null),
          _el$44 = libs.createElement("Label", {
            get text() {
              return reward.amount;
            }
          }, _el$43);
        libs.insert(_el$43, libs.createComponent(StoreItem.StoreItemImage, {
          get itemid() {
            return reward.itemID;
          }
        }), _el$44);
        libs.effect(_$p => libs.setProp(_el$44, "text", reward.amount, _$p));
        return _el$43;
      })()
    }));
    libs.insert(_el$13, libs.createComponent(EOM_Button.EOM_Button, {
      id: "ConfirmBtn",
      get enabled() {
        return libs.memo(() => !!hasSelectedItems())() && !props.requesting();
      },
      color: "Confirm",
      text: "#RuneBreak_Dismantle",
      onactivate: () => props.onConfirm(playBreakParticle)
    }), null);
    libs.effect(_p$ => {
      const _v$4 = props.onShowBreakAttrs,
        _v$5 = libs.classNames(getBreakWindowClass()),
        _v$6 = `Lv.${props.currentLevel()}${target().addedLevel > 0 ? ToColor(`+${target().addedLevel}`, "#53b646") : ""}`,
        _v$7 = props.onToggleBreakAttrs,
        _v$8 = libs.memo(() => props.currentLevel() < MAX_LEVEL)() ? `${props.currentExp()}/${currentMaxExp()}` : `${props.currentExp()}`,
        _v$9 = addedExp() > 0,
        _v$0 = `+${addedExp()}`,
        _v$1 = libs.classNames({
          Show: rewardList().length > 0
        });
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "onactivate", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$13, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$22, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$23, "onactivate", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$29, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$30, "visible", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$30, "text", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$32, "class", _v$1, _p$._v$1));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined
    });
    return _el$10;
  })();
};

const RuneBagTabButton = props => {
  const [local, others] = libs.splitProps(props, ["children", "class", "iconClass", "text", "secondaryText", "selected", "locked"]);
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(others, {
    get ["class"]() {
      return libs.classNames("RuneBagTabButton", local.class);
    },
    get classList() {
      return {
        Selected: local.selected === true,
        Locked: local.locked === true
      };
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "RuneBagTabButtonContent"
        }, null),
        _el$2 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("RuneBagTabIcon", local.iconClass);
          }
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          "class": "RuneBagTabTextContainer"
        }, _el$),
        _el$4 = libs.createElement("Label", {
          "class": "RuneBagTabTitle",
          get text() {
            return local.text;
          }
        }, _el$3);
      libs.insert(_el$3, libs.createComponent(libs.Show, {
        get when() {
          return local.secondaryText;
        },
        get children() {
          const _el$5 = libs.createElement("Label", {
            "class": "RuneBagTabSecondaryText",
            get text() {
              return local.secondaryText;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$5, "text", local.secondaryText, _$p));
          return _el$5;
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return local.locked;
        },
        get children() {
          return libs.createElement("Image", {
            "class": "RuneBagTabLockIcon"
          }, null);
        }
      }), null);
      libs.insert(_el$, () => local.children, null);
      libs.effect(_p$ => {
        const _v$ = libs.classNames("RuneBagTabIcon", local.iconClass),
          _v$2 = local.text;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined
      });
      return _el$;
    }
  }));
};

const PHASES = {
  Select: "Select",
  PeekDone: "PeekDone",
  Preview: "Preview"
};
const parseDevourCosts = () => {
  const rawValue = GameUI.CustomUIConfig().rune_setting?.rune_devour?.value ?? "";
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
};
const isEntryChanged = (before, after) => {
  return JSON.stringify(before) !== JSON.stringify(after);
};
const isPlayerRuneResultValue = value => {
  return value !== "nil";
};
const getReplacedEntryKey = result => {
  const match = result.replaced_target?.match(/^([23])\|(\d+)$/);
  if (match == undefined) {
    return undefined;
  }
  const entryType = Number(match[1]);
  const entryIndex = Number(match[2]);
  const entryCount = entryType === 2 ? result.adverb_entry_data.length : result.rune_suit_data.length;
  if (!Number.isInteger(entryIndex) || entryIndex < 0 || entryIndex >= entryCount) {
    return undefined;
  }
  return `${entryType === 2 ? "adverb" : "suit"}:${entryIndex}`;
};
const RuneDevour = props => {
  const playerPropertyData = solid_utils.createPlayerPropertyData(() => Players.GetLocalPlayer());
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const playerRunes = solid_utils.createServiceNetData("player_runes", {});
  const playerRuneResults = solid_utils.createServiceNetData("player_devour_rune_results", {});
  const [selectedEntry, setSelectedEntry] = libs.createSignal();
  const [lockedAdverbEntryKeys, setLockedAdverbEntryKeys] = libs.createSignal(new Set());
  const getSelectionPhase = () => {
    return props.rightRune != undefined && selectedEntry() != undefined ? PHASES.PeekDone : PHASES.Select;
  };
  const runeMap = libs.createMemo(() => {
    return rune_data.buildRuneBagItems(playerRunes()).reduce((result, rune) => {
      result[rune.id] = rune;
      return result;
    }, {});
  });
  const previewResult = libs.createMemo(() => {
    const currentRuneMap = runeMap();
    const result = Object.values(playerRuneResults()).find(value => {
      return isPlayerRuneResultValue(value) && currentRuneMap[value.id]?.in_check === "devour";
    });
    return result;
  });
  const previewRuneID = libs.createMemo(() => previewResult()?.id);
  const oldRune = libs.createMemo(() => {
    const runeID = previewRuneID();
    if (runeID == undefined) {
      return undefined;
    }
    return runeMap()[runeID];
  });
  const isPreviewing = libs.createMemo(() => previewResult() != undefined);
  const phase = libs.createMemo(() => {
    if (isPreviewing()) {
      return PHASES.Preview;
    }
    return getSelectionPhase();
  });
  const devourCosts = libs.createMemo(() => {
    const tokenData = playerTokens();
    return parseDevourCosts().map(cost => ({
      ...cost,
      insufficient: (tokenData?.[cost.itemID]?.amounts ?? 0) < cost.amount
    }));
  });
  const insufficientCost = libs.createMemo(() => devourCosts().some(cost => cost.insufficient));
  const runeDevourLockLimit = libs.createMemo(() => {
    return toFiniteNumber(playerPropertyData().rune_devour_lock, 0);
  });
  const showAdverbEntryLockSelection = libs.createMemo(() => runeDevourLockLimit() > 0);
  const leftAdverbEntryCount = libs.createMemo(() => props.leftRune?.adverb_entry_data?.length ?? 0);
  const lockedTargetAdverbIndexes = libs.createMemo(() => {
    const maxIndex = leftAdverbEntryCount();
    return [...lockedAdverbEntryKeys()].map(entryKey => {
      const match = entryKey.match(/^adverb:(\d+)$/);
      return match == undefined ? undefined : toFiniteNumber(match[1], -1);
    }).filter(index => index != undefined && index >= 0 && index < maxIndex).sort((a, b) => a - b);
  });
  const selectedEntryKey = libs.createMemo(() => {
    if (isPreviewing()) {
      return undefined;
    }
    return selectedEntry()?.entryKey;
  });
  const rightDisplayRune = libs.createMemo(() => {
    if (isPreviewing()) {
      return oldRune();
    }
    return props.rightRune;
  });
  const allowEntrySelection = libs.createMemo(() => {
    return !isPreviewing() && !props.requesting();
  });
  const allowAdverbEntryLock = libs.createMemo(() => {
    return !isPreviewing() && !props.requesting();
  });
  const allowRuneRemove = libs.createMemo(() => {
    return !isPreviewing() && !props.requesting();
  });
  const resetRoundState = () => {
    setSelectedEntry(undefined);
    setLockedAdverbEntryKeys(new Set());
  };
  const leftDisplayRune = libs.createMemo(() => {
    const leftRune = isPreviewing() ? oldRune() : props.leftRune;
    const preview = previewResult();
    if (leftRune == undefined || preview == undefined || !isPreviewing()) {
      return leftRune;
    }
    return {
      ...leftRune,
      main_entry_data: preview.main_entry_data,
      adverb_entry_data: preview.adverb_entry_data,
      rune_suit_data: preview.rune_suit_data
    };
  });
  const highlightedEntryKeys = libs.createMemo(() => {
    const before = oldRune();
    const after = leftDisplayRune();
    const preview = previewResult();
    const result = new Set();
    if (before == undefined || after == undefined || preview == undefined || !isPreviewing()) {
      return result;
    }
    if (preview.replaced_target != undefined && preview.replaced_target !== "") {
      const replacedEntryKey = getReplacedEntryKey(preview);
      if (replacedEntryKey != undefined) {
        result.add(replacedEntryKey);
      }
      return result;
    }
    after.adverb_entry_data?.forEach((entry, index) => {
      if (isEntryChanged(before.adverb_entry_data?.[index], entry)) {
        result.add(`adverb:${index}`);
      }
    });
    after.rune_suit_data?.forEach((entry, index) => {
      if (isEntryChanged(before.rune_suit_data?.[index], entry)) {
        result.add(`suit:${index}`);
      }
    });
    return result;
  });
  let lastRightRuneID = props.rightRune?.id;
  libs.createEffect(() => {
    const rightRuneID = props.rightRune?.id;
    if (isPreviewing() || props.requesting()) {
      lastRightRuneID = rightRuneID;
      return;
    }
    if (rightRuneID !== lastRightRuneID) {
      setSelectedEntry(undefined);
    }
    lastRightRuneID = rightRuneID;
  });
  let lastLeftRuneID = props.leftRune?.id;
  libs.createEffect(() => {
    const leftRuneID = props.leftRune?.id;
    if (isPreviewing() || props.requesting()) {
      lastLeftRuneID = leftRuneID;
      return;
    }
    if (leftRuneID === lastLeftRuneID) {
      return;
    }
    resetRoundState();
    lastLeftRuneID = leftRuneID;
  });
  libs.createEffect(() => {
    const canLock = showAdverbEntryLockSelection();
    const entryCount = leftAdverbEntryCount();
    setLockedAdverbEntryKeys(currentKeys => {
      if (!canLock || entryCount <= 0) {
        return currentKeys.size === 0 ? currentKeys : new Set();
      }
      const nextKeys = new Set();
      currentKeys.forEach(entryKey => {
        const match = entryKey.match(/^adverb:(\d+)$/);
        const index = match == undefined ? -1 : toFiniteNumber(match[1], -1);
        if (index >= 0 && index < entryCount) {
          nextKeys.add(entryKey);
        }
      });
      return nextKeys.size === currentKeys.size ? currentKeys : nextKeys;
    });
  });
  let lastPreviewRuneID = previewRuneID();
  libs.createEffect(() => {
    const currentPreviewRuneID = previewRuneID();
    props.onPreviewingChange(currentPreviewRuneID != undefined);
    if (lastPreviewRuneID != undefined && currentPreviewRuneID == undefined) {
      resetRoundState();
      props.onResetSelection();
    }
    lastPreviewRuneID = currentPreviewRuneID;
  });
  const handleDevour = () => {
    const leftRune = props.leftRune;
    const rightRune = props.rightRune;
    const entry = selectedEntry();
    if (props.requesting() || leftRune == undefined || rightRune == undefined || entry == undefined) {
      return;
    }
    if (insufficientCost()) {
      ErrorMessage("#error_token_no_enough");
      return;
    }
    props.setRequesting(true);
    CallActionRequest("/v1/rune/devour", {
      entry_type: entry.entryType,
      target_rune_id: leftRune.id,
      devoured_rune_id: rightRune.id,
      devoured_entry_index: entry.entryIndex,
      locked_target_adverb_indexes: lockedTargetAdverbIndexes()
    }, result => {
      props.setRequesting(false);
      if (result.code !== 0) {
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
        return;
      }
    }, () => {
      props.setRequesting(false);
    });
  };
  const handleConfirmPreview = confirm => {
    const runeID = previewRuneID();
    if (props.requesting() || runeID == undefined) {
      return;
    }
    props.setRequesting(true);
    CallActionRequest("/v1/rune/devour_confirm", {
      rune_id: runeID,
      confirm
    }, result => {
      props.setRequesting(false);
      if (result.code !== 0) {
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
      }
    }, () => {
      props.setRequesting(false);
    });
  };
  const handleAdverbEntryLockToggle = entry => {
    if (!allowAdverbEntryLock() || !showAdverbEntryLockSelection() || entry.entryType !== 2) {
      return;
    }
    setLockedAdverbEntryKeys(currentKeys => {
      const nextKeys = new Set(currentKeys);
      if (nextKeys.has(entry.entryKey)) {
        nextKeys.delete(entry.entryKey);
        return nextKeys;
      }
      if (runeDevourLockLimit() === 1) {
        return new Set([entry.entryKey]);
      }
      const nextLockedCount = nextKeys.size + 1;
      if (nextLockedCount >= leftAdverbEntryCount()) {
        ErrorMessage("#RuneDevour_DevourLockAllNotAllow");
        return currentKeys;
      }
      if (nextLockedCount > runeDevourLockLimit()) {
        ErrorMessage("#RuneDevour_RuneDevourLockNotAllow");
        return currentKeys;
      }
      nextKeys.add(entry.entryKey);
      return nextKeys;
    });
  };
  const handleDropRune = (slot, draggedPanel) => {
    if (props.requesting() || isPreviewing()) {
      return;
    }
    const runeID = Number(LoadData(draggedPanel, "rune")) || 0;
    if (runeID <= 0) {
      return;
    }
    props.onDropRune(slot, runeID);
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "RuneDevourRoot",
        "class": "RuneContentSubRoot"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "RuneDevourMainContent",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Image", {
        id: "RuneDevourArrow",
        hittest: false
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "RuneDevourOperation",
        hittest: false
      }, _el$);
    libs.insert(_el$2, libs.createComponent(rune_components.RuneDetailCard, {
      id: "RuneDevourLeftCard",
      EmptyLabel: "#RuneDevour_LeftCardEmptyLabel",
      tooltipText: "#RuneDevour_LeftCardEmptyLabel_Tip",
      get rune() {
        return leftDisplayRune();
      },
      get highlightEntryKeys() {
        return libs.memo(() => !!isPreviewing())() ? highlightedEntryKeys() : undefined;
      },
      get lockedAdverbEntryKeys() {
        return lockedAdverbEntryKeys();
      },
      get onAdverbEntryLockToggle() {
        return showAdverbEntryLockSelection() ? handleAdverbEntryLockToggle : undefined;
      },
      get onRemoveRune() {
        return allowRuneRemove() ? () => {
          props.onRemoveRune("left");
        } : undefined;
      },
      onDragDrop: (_panel, draggedPanel) => {
        handleDropRune("left", draggedPanel);
      }
    }), _el$3);
    libs.insert(_el$2, libs.createComponent(rune_components.RuneDetailCard, {
      id: "RuneDevourRightCard",
      EmptyLabel: "#RuneDevour_RightCardEmptyLabel",
      tooltipText: "#RuneDevour_RightCardEmptyLabel_Tip",
      get rune() {
        return rightDisplayRune();
      },
      get highlightEntryKeys() {
        return libs.memo(() => !!isPreviewing())() ? highlightedEntryKeys() : undefined;
      },
      get selectable() {
        return allowEntrySelection();
      },
      get selectedEntryKey() {
        return selectedEntryKey();
      },
      onEntrySelect: entry => {
        if (allowEntrySelection()) {
          setSelectedEntry(entry);
        }
      },
      get onRemoveRune() {
        return allowRuneRemove() ? () => {
          props.onRemoveRune("right");
        } : undefined;
      },
      onDragDrop: (_panel, draggedPanel) => {
        handleDropRune("right", draggedPanel);
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return phase() === PHASES.PeekDone;
      },
      get children() {
        const _el$5 = libs.createElement("Panel", {
            id: "RuneDevourStartButtons"
          }, null),
          _el$6 = libs.createElement("Panel", {
            id: "UpgradeCost",
            flowChildren: "right"
          }, _el$5),
          _el$7 = libs.createElement("Panel", {
            id: "UpgradeCostContent",
            flowChildren: "right"
          }, _el$6);
        libs.setProp(_el$6, "flowChildren", "right");
        libs.setProp(_el$7, "flowChildren", "right");
        libs.insert(_el$7, libs.createComponent(libs.For, {
          get each() {
            return devourCosts();
          },
          children: cost => (() => {
            const _el$1 = libs.createElement("Panel", {
                "class": "RuneDevourCostItem",
                flowChildren: "right"
              }, null),
              _el$10 = libs.createElement("Label", {
                id: "UpgradeCostLabel",
                get text() {
                  return `x${cost.amount}`;
                }
              }, _el$1);
            libs.setProp(_el$1, "flowChildren", "right");
            libs.insert(_el$1, libs.createComponent(Player.CurrencyIcon, {
              id: "UpgradeCostIcon",
              width: "28px",
              height: "28px",
              get tokenID() {
                return cost.itemID;
              }
            }), _el$10);
            libs.effect(_p$ => {
              const _v$ = {
                  Insufficient: cost.insufficient
                },
                _v$2 = `x${cost.amount}`;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$10, "classList", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$10, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$1;
          })()
        }));
        libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_Button, {
          id: "RuneDevourStartConfirmButton",
          marginTop: "16px",
          color: "Confirm",
          size: "Normal",
          text: "#RuneDevour_OptCheck",
          get enabled() {
            return !props.requesting();
          },
          onactivate: handleDevour
        }), null);
        libs.effect(_$p => libs.setProp(_el$6, "visible", devourCosts().length > 0, _$p));
        return _el$5;
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return phase() === PHASES.Preview;
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
            id: "RuneDevourCheckButtons"
          }, null),
          _el$9 = libs.createElement("Panel", {
            "class": "RuneDevourCheckButtonSlot"
          }, _el$8),
          _el$0 = libs.createElement("Panel", {
            "class": "RuneDevourCheckButtonSlot"
          }, _el$8);
        libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
          id: "RuneDevourCheckConfirmButton",
          color: "Confirm",
          size: "Normal",
          text: "#RuneDevour_OptCheckResult",
          get enabled() {
            return !props.requesting();
          },
          onactivate: () => {
            handleConfirmPreview(true);
          }
        }));
        libs.insert(_el$0, libs.createComponent(EOM_Button.EOM_Button, {
          id: "RuneDevourResetButton",
          color: "Cancel",
          size: "Normal",
          text: "#RuneDevour_OptReset",
          get enabled() {
            return !props.requesting();
          },
          onactivate: () => {
            handleConfirmPreview(false);
          }
        }));
        return _el$8;
      }
    }), null);
    return _el$;
  })();
};

const defaultAbilityID = 1;
const runeUnlockConfigKeyBySlotID = {
  2: "rune_unlock_1",
  3: "rune_unlock_2"
};
const isPlayerRuneValue = value => {
  return value !== "nil";
};
const getRuneIconPath = rune => {
  if (rune == undefined) {
    return undefined;
  }
  const staticData = KeyValues.info_item_rune[rune.rune_item_id];
  if (staticData == undefined) {
    return undefined;
  }
  return `file://{images}/custom_game/store_items/${staticData.icon}.png`;
};
const buildDragHoverSlotKey = (skillID, slotID) => `${skillID}:${slotID}`;
const buildAuthoritativeAttributes = attributes => {
  if (attributes == undefined) {
    return [];
  }
  return Object.entries(attributes).map(([id, rawValue]) => ({
    id,
    value: toFiniteNumber(rawValue, 0),
    base_value: toFiniteNumber(rawValue, 0)
  })).filter(entry => entry.value !== 0).sort((a, b) => {
    const aOrder = GameUI.CustomUIConfig().rune_entry?.[a.id]?.id;
    const bOrder = GameUI.CustomUIConfig().rune_entry?.[b.id]?.id;
    if (aOrder != undefined && bOrder != undefined) {
      return aOrder - bOrder;
    }
    if (aOrder != undefined) {
      return -1;
    }
    if (bOrder != undefined) {
      return 1;
    }
    return a.id.localeCompare(b.id);
  });
};
const buildCurrentSkillSuitPoints = (currentPlan, abilityID, runes) => {
  const suitPointMap = {};
  const skillSlots = currentPlan[abilityID];
  for (const runeID of Object.values(skillSlots ?? {})) {
    if (runeID === "nil") {
      continue;
    }
    const runeData = runes[Number(runeID)];
    if (runeData == undefined) {
      continue;
    }
    for (const suitPoint of runeData.rune_suit_data ?? []) {
      const currentSuitPoint = suitPointMap[suitPoint.id];
      if (currentSuitPoint == undefined) {
        suitPointMap[suitPoint.id] = {
          ...suitPoint
        };
        continue;
      }
      currentSuitPoint.value += suitPoint.value;
    }
  }
  return Object.values(suitPointMap).filter(suitPoint => suitPoint.value > 0);
};
const buildCurrentSkillEngravingAttributes = (currentPlan, abilityID, runes) => {
  const transferAttributeMap = {};
  const strengthenAttributeMap = {};
  const skillSlots = currentPlan[abilityID];
  for (const runeID of Object.values(skillSlots ?? {})) {
    if (runeID === "nil") {
      continue;
    }
    const runeData = runes[Number(runeID)];
    if (runeData == undefined) {
      continue;
    }
    for (const engraving of runeData.inlay_engravings_data ?? []) {
      for (const entry of engraving.adverb_entry_data ?? []) {
        const attributeMap = entry.id.endsWith("_transfer") ? transferAttributeMap : entry.id.endsWith("_strengthen") ? strengthenAttributeMap : undefined;
        if (attributeMap == undefined) {
          continue;
        }
        const value = toFiniteNumber(entry.value, 0);
        const baseValue = toFiniteNumber(entry.base_value, value);
        const currentAttribute = attributeMap[entry.id];
        if (currentAttribute == undefined) {
          attributeMap[entry.id] = {
            id: entry.id,
            value,
            base_value: baseValue
          };
          continue;
        }
        currentAttribute.value += value;
        currentAttribute.base_value += baseValue;
      }
    }
  }
  const sortAttributes = attributes => attributes.filter(entry => entry.value !== 0).sort((a, b) => {
    const aOrder = server_rune_utils.getEngravingEntryConfig(a.id)?.id;
    const bOrder = server_rune_utils.getEngravingEntryConfig(b.id)?.id;
    if (aOrder != undefined && bOrder != undefined) {
      return aOrder - bOrder;
    }
    if (aOrder != undefined) {
      return -1;
    }
    if (bOrder != undefined) {
      return 1;
    }
    return a.id.localeCompare(b.id);
  });
  const transferAttributes = sortAttributes(Object.values(transferAttributeMap));
  return transferAttributes.length > 0 ? transferAttributes : sortAttributes(Object.values(strengthenAttributeMap));
};
const EMPTY_ATTRIBUTES = [];
const AttributeSummaryPanel = props => {
  const [local, other] = libs.splitProps(props, ["class", "main_attributes", "sub_attributes", "engraving_attributes", "suit_attributes", "abilities", "selectedAbilityID", "onAbilitySelect"]);
  const mainEntries = libs.createMemo(() => rune_data.buildRuneAttributeDisplays(local.main_attributes, 1, {
    showAttributeRange: false,
    usePercentColor: false
  }));
  const adverbEntries = libs.createMemo(() => rune_data.buildRuneAttributeDisplays(local.sub_attributes, 2, {
    showAttributeRange: false,
    usePercentColor: false
  }));
  const suitEntries = libs.createMemo(() => rune_data.buildRuneSuitDisplays(local.suit_attributes));
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(other, {
        id: "AttributeSummaryPanel",
        get ["class"]() {
          return local.class;
        }
      }), null);
      libs.createElement("Label", {
        id: "AttributesSummaryTitle",
        text: "#Equipment_AttributesSummary"
      }, _el$);
      libs.createElement("Panel", {
        id: "TitleLine"
      }, _el$);
      const _el$4 = libs.createElement("Panel", {
        id: "AttributesSummary",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        "class": "RuneSummaryMainAttr",
        hittest: false
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "RuneSummaryAdverbAttr",
        hittest: false
      }, _el$4);
      libs.createElement("Image", {
        "class": "RuneSummaryAttributeSeparator"
      }, _el$6);
      const _el$8 = libs.createElement("Panel", {
        "class": "RuneSummarySuitPoint",
        hittest: false
      }, _el$4);
      libs.createElement("Image", {
        "class": "RuneSummaryAttributeSeparator"
      }, _el$8);
      const _el$0 = libs.createElement("Panel", {
        id: "SummaryAbilityBar"
      }, _el$);
      libs.createElement("Image", {
        "class": "RuneSummaryAttributeSeparator"
      }, _el$0);
      const _el$10 = libs.createElement("Panel", {
        id: "SummaryAbilityList"
      }, _el$0);
    libs.spread(_el$, libs.mergeProps$1(other, {
      "id": "AttributeSummaryPanel",
      get ["class"]() {
        return local.class;
      }
    }), true);
    libs.setProp(_el$4, "scroll", "y");
    libs.insert(_el$5, libs.createComponent(libs.For, {
      get each() {
        return mainEntries();
      },
      children: entry => libs.createComponent(rune_components.RuneAttributeRow, {
        get attr_name_html() {
          return entry.nameHtml;
        },
        get attr_value_html() {
          return entry.valueText;
        },
        entry_type: "Main"
      })
    }));
    libs.insert(_el$6, libs.createComponent(libs.For, {
      get each() {
        return adverbEntries();
      },
      children: entry => libs.createComponent(rune_components.RuneAttributeRow, {
        get attr_name_html() {
          return entry.nameHtml;
        },
        get attr_value_html() {
          return entry.valueText;
        },
        entry_type: "Adverb"
      })
    }), null);
    libs.insert(_el$8, libs.createComponent(libs.For, {
      get each() {
        return suitEntries();
      },
      children: entry => libs.createComponent(rune_components.RuneBondItem, {
        get suitKey() {
          return entry.suitKey;
        },
        get currentPoint() {
          return entry.currentPoint;
        },
        get suitPoint() {
          return entry.currentPoint;
        },
        useSuitStyle: true,
        showTooltip: true
      })
    }), null);
    libs.insert(_el$10, libs.createComponent(libs.For, {
      get each() {
        return local.abilities;
      },
      children: ability => libs.createComponent(rune_components.RuneAbilityItem, {
        get abilityName() {
          return ability.abilityName;
        },
        get activeDots() {
          return ability.activeDots;
        },
        get ["class"]() {
          return libs.classNames({
            Selected: local.selectedAbilityID === ability.serviceSkillID
          });
        },
        onmouseactivate: () => {
          local.onAbilitySelect(ability.serviceSkillID);
        }
      })
    }));
    libs.effect(_p$ => {
      const _v$ = adverbEntries().length > 0,
        _v$2 = suitEntries().length > 0;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "visible", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "visible", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const RuneEmbed = props => {
  const [selectPlanID, setSelectPlanID] = libs.createSignal(1);
  const [previewHeroName, setPreviewHeroName] = global_selection.createPreviewHeroNameSignal();
  const previewHeroKV = libs.createMemo(() => KeyValues.heroes[previewHeroName()]);
  const previewAbilityList = libs.createMemo(() => {
    const heroKV = previewHeroKV();
    return props.abilityDisplayMappings.map(ability => ({
      serviceSkillID: ability.serviceSkillID,
      id: ability.id,
      abilityName: heroKV?.["Ability" + (ability.heroAbilityIndex + 1)]
    }));
  });
  const [selectAbilityID, setSelectAbilityID] = libs.createSignal(defaultAbilityID);
  const selectHeroID = () => {
    const heroName = previewHeroName();
    return GetHeroIDByHeroName(heroName);
  };
  const [showOverviewAttr, setShowOverviewAttr] = libs.createSignal(false);
  const plan_suit = solid_utils.createServiceNetData("player_hero_rune_equip_suits", {});
  const playerHeroes = solid_utils.createServiceNetData("player_heroes", {});
  const playerRunes = solid_utils.createServiceNetData("player_runes", {});
  const heroSkillOutsideAttributes = solid_utils.createServiceNetData("hero_skill_outside_attributes", {});
  const playerRuneUnlockData = solid_utils.createServiceNetData("player_rune_unlock_data", {});
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const defaultUnlockedSlotCount = libs.createMemo(() => {
    const rawValue = GameUI.CustomUIConfig().rune_setting?.rune_default?.value;
    return Math.max(1, toFiniteNumber(rawValue, 1));
  });
  const runeMap = libs.createMemo(() => {
    const runeData = playerRunes();
    const result = {};
    for (const [runeID, rune] of Object.entries(runeData)) {
      if (!isPlayerRuneValue(rune)) {
        continue;
      }
      result[Number(runeID)] = rune;
    }
    return result;
  });
  const currentPlanSuit = libs.createMemo(() => {
    const heroID = selectHeroID();
    return plan_suit()?.[heroID]?.[selectPlanID()] ?? {};
  });
  const currentPlanPeekedRuneIDs = libs.createMemo(() => {
    const currentPlan = currentPlanSuit();
    const peekedRuneIDMap = {};
    const result = [];
    for (let abilityIndex = 0; abilityIndex < props.abilityDisplayMappings.length; abilityIndex++) {
      const serviceSkillID = props.abilityDisplayMappings[abilityIndex].serviceSkillID;
      const skillSlots = currentPlan[serviceSkillID] ?? {};
      for (let slotID = 1; slotID <= 3; slotID++) {
        const runeID = skillSlots[slotID];
        if (runeID == undefined || runeID === "nil") {
          continue;
        }
        const normalizedRuneID = Number(runeID);
        if (normalizedRuneID <= 0 || peekedRuneIDMap[normalizedRuneID] === true) {
          continue;
        }
        peekedRuneIDMap[normalizedRuneID] = true;
        result.push(normalizedRuneID);
      }
    }
    return result;
  });
  const authoritativeAttributes = libs.createMemo(() => {
    const heroID = selectHeroID();
    const skillID = selectAbilityID();
    const attributes = heroSkillOutsideAttributes()?.[heroID]?.[skillID]?.data?.hero_skill_rune?.attributes;
    return buildAuthoritativeAttributes(attributes);
  });
  const currentSkillSuitPoints = libs.createMemo(() => buildCurrentSkillSuitPoints(currentPlanSuit(), selectAbilityID(), runeMap()));
  const currentSkillEngravingAttributes = libs.createMemo(() => buildCurrentSkillEngravingAttributes(currentPlanSuit(), selectAbilityID(), runeMap()));
  const getUnlockedSlotCount = skillID => {
    const defaultCount = defaultUnlockedSlotCount();
    const rawCount = playerRuneUnlockData()?.[skillID];
    return Math.max(defaultCount, toFiniteNumber(rawCount, defaultCount));
  };
  const parseUnlockCosts = slotID => {
    const configKey = runeUnlockConfigKeyBySlotID[slotID];
    if (configKey == undefined) {
      return [];
    }
    const rawValue = GameUI.CustomUIConfig().rune_setting?.[configKey]?.value ?? "";
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
  };
  const buildSlotUnlockCosts = slotID => {
    const tokenData = playerTokens();
    return parseUnlockCosts(slotID).map(cost => {
      const ownedAmount = tokenData?.[cost.itemID]?.amounts ?? 0;
      return {
        itemID: cost.itemID,
        amount: cost.amount,
        valueText: `x${cost.amount}`,
        insufficient: ownedAmount < cost.amount
      };
    });
  };
  const runRequest = request => {
    if (props.requesting()) {
      return false;
    }
    props.setRequesting(true);
    request();
    return true;
  };
  const handleUnlockSlotRequest = (serviceSkillID, slotID) => {
    return runRequest(() => {
      CallActionRequest("/v1/rune/unlock_slot", {
        skill_id: serviceSkillID,
        slot_id: slotID
      }, () => {
        props.setRequesting(false);
      }, () => {
        props.setRequesting(false);
      });
    });
  };
  const canWearRune = runeID => {
    if (runeID === 0) {
      return true;
    }
    const rune = runeMap()[runeID];
    if (rune == undefined) {
      return false;
    }
    const needLevel = KeyValues.rune_rarity_setting[rune.rarity]?.need_level ?? 1;
    const heroLv = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
    if (needLevel > heroLv) {
      ErrorMessage("#RuneEmbed_HeroLevelNotAllow");
      return false;
    }
    return true;
  };
  const handleEquipRuneRequest = (slotID, runeID) => {
    const heroID = selectHeroID();
    if (heroID == undefined || heroID <= 0) {
      return;
    }
    const unlockedSlotCount = getUnlockedSlotCount(selectAbilityID());
    if (slotID > unlockedSlotCount) {
      return;
    }
    if (!canWearRune(runeID)) {
      return;
    }
    runRequest(() => {
      CallActionRequest("/v1/hero/equip_rune", {
        hero_id: heroID,
        suit_id: selectPlanID(),
        skill_id: selectAbilityID(),
        slot_id: slotID,
        rune_id: runeID
      }, () => {
        props.setRequesting(false);
      }, () => {
        props.setRequesting(false);
      });
    });
  };
  const handleUnequipRuneRequest = slotData => {
    if (props.requesting()) {
      return;
    }
    if (slotData.locked === true || slotData.isEmpty === true) {
      return;
    }
    handleEquipRuneRequest(slotData.slotID, 0);
  };
  const handleLockedSlotActivate = slotData => {
    if (props.requesting()) {
      return;
    }
    if (slotData.locked !== true) {
      return;
    }
    if (slotData.insufficientCost) {
      ErrorMessage("#RuneDevour_ActivateCostNotAllow");
      return;
    }
    handleUnlockSlotRequest(selectAbilityID(), slotData.slotID);
  };
  const suit_points = libs.createMemo(() => rune_data.buildRuneSuitDisplays(currentSkillSuitPoints()));
  const selectedSkillSlots = libs.createMemo(() => {
    const skillSlots = currentPlanSuit()?.[selectAbilityID()] ?? {};
    const unlockedSlotCount = getUnlockedSlotCount(selectAbilityID());
    return [1, 2, 3].map(slotID => {
      if (slotID > unlockedSlotCount) {
        const costs = buildSlotUnlockCosts(slotID);
        return {
          slotID,
          isEmpty: true,
          locked: true,
          costs,
          insufficientCost: costs.some(cost => cost.insufficient)
        };
      }
      const runeID = skillSlots[slotID];
      if (runeID == undefined || runeID === "nil") {
        return {
          slotID,
          isEmpty: true,
          locked: false,
          costs: [],
          insufficientCost: false
        };
      }
      const runeData = runeMap()[Number(runeID)];
      return {
        slotID,
        runeID: Number(runeID),
        icon: getRuneIconPath(runeData),
        engravingSlots: runeData?.inlay_engravings_data,
        isEmpty: false,
        locked: false,
        costs: [],
        insufficientCost: false
      };
    });
  });
  const abilityDotState = libs.createMemo(() => {
    const currentPlan = currentPlanSuit();
    return props.abilityDisplayMappings.reduce((result, ability) => {
      const skillID = ability.serviceSkillID;
      const skillSlots = currentPlan?.[skillID] ?? {};
      const unlockedSlotCount = getUnlockedSlotCount(skillID);
      result[skillID] = [1, 2, 3].slice(0, unlockedSlotCount).map(slotID => {
        const runeID = skillSlots[slotID];
        return runeID !== undefined && runeID !== "nil";
      });
      return result;
    }, {});
  });
  const summaryAbilityList = libs.createMemo(() => previewAbilityList().map(ability => ({
    serviceSkillID: ability.serviceSkillID,
    abilityName: ability.abilityName,
    activeDots: abilityDotState()[ability.serviceSkillID] ?? []
  })));
  let syncedHeroID;
  let syncedPlanID;
  libs.createEffect(() => {
    const heroID = selectHeroID();
    const planID = Math.max(1, toFiniteNumber(playerHeroes()[heroID]?.rune_equip_suit, 1));
    if (syncedHeroID === heroID && syncedPlanID === planID) {
      return;
    }
    syncedHeroID = heroID;
    syncedPlanID = planID;
    setSelectPlanID(planID);
    setSelectAbilityID(defaultAbilityID);
    props.clearDragState();
  });
  libs.createEffect(() => {
    props.setPeekedRuneIDs(currentPlanPeekedRuneIDs());
  });
  libs.createEffect(() => {
    const heroID = selectHeroID();
    const planID = selectPlanID();
    const skillID = selectAbilityID();
    const slots = selectedSkillSlots().map(slot => ({
      slotID: slot.slotID,
      runeID: slot.runeID,
      isEmpty: slot.isEmpty,
      locked: slot.locked
    }));
    props.onContextChange?.({
      heroID,
      planID,
      skillID,
      slots,
      equipRune: handleEquipRuneRequest
    });
  });
  libs.onCleanup(() => {
    props.onContextChange?.(undefined);
  });
  const PlanDropDownOnSelect = index => {
    const planID = index + 1;
    const heroID = selectHeroID();
    if (!heroID || planID === selectPlanID() || props.requesting()) {
      return false;
    }
    props.clearDragState();
    setSelectPlanID(planID);
    CallAction("/v1/hero/change_rune_equip_suit", {
      hero_id: heroID,
      suit_id: planID
    });
    return false;
  };
  const canAcceptDraggedRune = slotData => {
    return props.requesting() !== true && slotData.locked !== true;
  };
  const handleSlotDragEnter = (slotData, draggedPanel) => {
    const runeID = LoadData(draggedPanel, "rune");
    if (!runeID || !canAcceptDraggedRune(slotData)) {
      props.setDragHoverSlotKey(undefined);
      return;
    }
    props.setDragHoverSlotKey(buildDragHoverSlotKey(selectAbilityID(), slotData.slotID));
  };
  const handleSlotDragLeave = slotData => {
    const dragHoverKey = buildDragHoverSlotKey(selectAbilityID(), slotData.slotID);
    if (props.dragHoverSlotKey() === dragHoverKey) {
      props.setDragHoverSlotKey(undefined);
    }
  };
  const handleSlotDragDrop = (slotData, draggedPanel) => {
    const runeID = Number(LoadData(draggedPanel, "rune")) || 0;
    props.setDragHoverSlotKey(undefined);
    if (runeID <= 0 || !canAcceptDraggedRune(slotData)) {
      return;
    }
    handleEquipRuneRequest(slotData.slotID, runeID);
  };
  return (() => {
    const _el$11 = libs.createElement("Panel", {
        id: "RuneEmbedRoot",
        "class": "RuneContentSubRoot"
      }, null),
      _el$12 = libs.createElement("Panel", {
        id: "RuneEmbedMainContent",
        hittest: false
      }, _el$11);
      libs.createElement("Panel", {
        id: "RuneEmbedBG",
        hittest: false
      }, _el$12);
      const _el$14 = libs.createElement("Panel", {
        id: "RuneEmbedBlock",
        hittest: false
      }, _el$12),
      _el$15 = libs.createElement("Panel", {
        id: "PlanSelectBlock"
      }, _el$14),
      _el$16 = libs.createElement("Panel", {
        id: "SplitTitleBlock",
        "class": "EOM_SectionDivider"
      }, _el$14);
      libs.createElement("Image", {
        "class": "LineLeft"
      }, _el$16);
      const _el$18 = libs.createElement("Panel", {
        id: "SplitTitleContainer"
      }, _el$16),
      _el$19 = libs.createElement("Panel", {
        id: "SplitTitleLocater"
      }, _el$18);
      libs.createElement("Label", {
        "class": "TitleToolTipInfo",
        text: "#RuneEmbed_SuitAttribute"
      }, _el$19);
      const _el$21 = libs.createElement("Panel", {
        "class": "ToolTipInfo"
      }, _el$19);
      libs.createElement("Image", {
        "class": "LineRight"
      }, _el$16);
      const _el$23 = libs.createElement("Panel", {
        id: "SuitPreviewBlock"
      }, _el$14),
      _el$24 = libs.createElement("Panel", {
        id: "SuitPreviewContent",
        hittest: false
      }, _el$23),
      _el$25 = libs.createElement("Panel", {
        id: "SlotEquipBlock"
      }, _el$14),
      _el$26 = libs.createElement("Panel", {
        id: "RuneAbilityPreview",
        hittest: false
      }, _el$12),
      _el$27 = libs.createElement("Panel", {
        id: "RuneEmbedHeroBar"
      }, _el$11);
    libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "OverviewAttributeBtn",
      get ["class"]() {
        return libs.classNames({
          ShowBtnBorder: showOverviewAttr()
        });
      },
      onactivate: () => {
        setShowOverviewAttr(prev => !prev);
      }
    }), null);
    libs.insert(_el$15, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      id: "SuitDropDown",
      type: "EquipmentDropDown",
      menuPosition: "top",
      get index() {
        return selectPlanID() - 1;
      },
      onSelect: PlanDropDownOnSelect,
      get children() {
        return libs.createComponent(libs.For, {
          each: [1, 2, 3],
          children: type => {
            return (() => {
              const _el$28 = libs.createElement("Label", {
                vars: {
                  value: type
                },
                text: "#EquipmentSuitType"
              }, null);
              libs.setProp(_el$28, "vars", {
                value: type
              });
              return _el$28;
            })();
          }
        });
      }
    }), null);
    libs.setProp(_el$21, "tooltip_text", "#RuneEmbed_TitleDescription");
    libs.insert(_el$24, libs.createComponent(libs.For, {
      get each() {
        return suit_points();
      },
      children: (suitPoint, Index) => libs.createComponent(rune_components.RuneBondItem, {
        get suitKey() {
          return suitPoint.suitKey;
        },
        get currentPoint() {
          return suitPoint.currentPoint;
        },
        get suitPoint() {
          return suitPoint.currentPoint;
        },
        useSuitStyle: true,
        showTooltip: true
      })
    }));
    libs.insert(_el$25, libs.createComponent(libs.For, {
      get each() {
        return selectedSkillSlots();
      },
      children: slotData => libs.createComponent(rune_components.RuneSlotItem, {
        get ["class"]() {
          return libs.classNames({
            DropTarget: props.dragHoverSlotKey() === buildDragHoverSlotKey(selectAbilityID(), slotData.slotID),
            DropBlocked: props.dragHoverSlotKey() === undefined && props.requesting() === false && slotData.locked === true,
            Requesting: props.requesting()
          });
        },
        get runeID() {
          return slotData.runeID;
        },
        get icon() {
          return slotData.icon;
        },
        get engravingSlots() {
          return slotData.engravingSlots;
        },
        get isEmpty() {
          return slotData.isEmpty;
        },
        get locked() {
          return slotData.locked;
        },
        get tooltipEquippedSkillID() {
          return selectAbilityID();
        },
        get costs() {
          return slotData.costs;
        },
        onDragEnter: (_panel, draggedPanel) => {
          handleSlotDragEnter(slotData, draggedPanel);
        },
        onDragLeave: () => {
          handleSlotDragLeave(slotData);
        },
        onDragDrop: (_panel, draggedPanel) => {
          handleSlotDragDrop(slotData, draggedPanel);
        },
        oncontextmenu: () => {
          handleUnequipRuneRequest(slotData);
        },
        onmouseactivate: () => {
          handleLockedSlotActivate(slotData);
        }
      })
    }));
    libs.insert(_el$26, libs.createComponent(libs.For, {
      get each() {
        return previewAbilityList();
      },
      children: ability => libs.createComponent(rune_components.RuneAbilityItem, {
        get id() {
          return ability.id;
        },
        get abilityName() {
          return ability.abilityName;
        },
        get ["class"]() {
          return libs.classNames({
            Selected: selectAbilityID() === ability.serviceSkillID
          });
        },
        get activeDots() {
          return abilityDotState()[ability.serviceSkillID] ?? [];
        },
        onmouseactivate: () => {
          setSelectAbilityID(ability.serviceSkillID);
        }
      })
    }));
    libs.insert(_el$27, libs.createComponent(hero_selection_bar.HeroSelectionBar, {
      get selecteHeroName() {
        return previewHeroName();
      },
      onchange: (heroName, _heroID) => {
        setPreviewHeroName(heroName);
      }
    }));
    libs.insert(_el$11, libs.createComponent(libs.Show, {
      get when() {
        return showOverviewAttr();
      },
      get children() {
        return libs.createComponent(AttributeSummaryPanel, {
          get main_attributes() {
            return authoritativeAttributes();
          },
          sub_attributes: EMPTY_ATTRIBUTES,
          get engraving_attributes() {
            return currentSkillEngravingAttributes();
          },
          get suit_attributes() {
            return currentSkillSuitPoints();
          },
          get abilities() {
            return summaryAbilityList();
          },
          get selectedAbilityID() {
            return selectAbilityID();
          },
          onAbilitySelect: setSelectAbilityID
        });
      }
    }), null);
    return _el$11;
  })();
};

const parseCosts = rawValue => {
  if (!rawValue) {
    return [];
  }
  return rawValue.split("|").map(costText => {
    const [itemIDText, amountText] = costText.split(":");
    return {
      itemID: toFiniteNumber(itemIDText, 0),
      amount: toFiniteNumber(amountText, 0)
    };
  }).filter(cost => cost.itemID > 0 && cost.amount > 0);
};
const isPlayerInlayResultValue = value => {
  return value !== "nil";
};
const getReplacedEngravingKey = result => {
  const match = result.replaced_target?.match(/^4\|(\d+)$/);
  if (match == undefined) {
    return undefined;
  }
  const engravingIndex = Number(match[1]);
  if (!Number.isInteger(engravingIndex) || engravingIndex < 0 || engravingIndex >= result.inlay_engravings_data.length) {
    return undefined;
  }
  return `engraving:${engravingIndex}`;
};
function EngravingDetailCard(props) {
  const [local, other] = libs.splitProps(props, ["class", "emptyLabel", "tooltipText", "engraving", "onRemoveEngraving"]);
  const attributeDisplays = libs.createMemo(() => server_rune_utils.buildEngravingAttributeDisplays(local.engraving?.adverb_entry_data));
  const canRemove = () => local.engraving != undefined && local.onRemoveEngraving != undefined;
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("EngravingDetailCard", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("EngravingDetailCard", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.engraving != undefined;
      },
      get fallback() {
        return (() => {
          const _el$0 = libs.createElement("Panel", {
              "class": "EngravingDetailCardContent EmptyMask",
              hittest: false
            }, null),
            _el$1 = libs.createElement("Panel", {
              "class": "EngravingInlayCardIcon"
            }, _el$0);
            libs.createElement("Panel", {
              "class": "EngravingInlayCardIconPlus"
            }, _el$1);
            const _el$11 = libs.createElement("Label", {
              html: true,
              get text() {
                return local.emptyLabel;
              }
            }, _el$0);
          libs.effect(_$p => libs.setProp(_el$11, "text", local.emptyLabel, _$p));
          return _el$0;
        })();
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            "class": "EngravingDetailCardContent",
            hittest: false
          }, null),
          _el$3 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("EngravingInlayCardIcon", `Rarity${local.engraving?.rarity ?? 1}`);
            }
          }, _el$2),
          _el$4 = libs.createElement("Image", {
            "class": "EngravingInlayCardIconImage",
            get src() {
              return server_rune_utils.getEngravingIconPath(local.engraving) ?? "";
            }
          }, _el$3),
          _el$5 = libs.createElement("Panel", {
            "class": "EngravingInlayCardName"
          }, _el$2);
          libs.createElement("Panel", {
            "class": "EngravingInlayCardNameBG"
          }, _el$5);
          const _el$7 = libs.createElement("Label", {
            get ["class"]() {
              return libs.classNames("EngravingInlayCardNameText", `Rarity${local.engraving?.rarity ?? 1}`);
            },
            get text() {
              return GetLocalization(`#${String(local.engraving?.engraving_item_id ?? "")}`);
            }
          }, _el$5),
          _el$8 = libs.createElement("Panel", {
            "class": "EngravingInlayCardAttributes"
          }, _el$2);
        libs.insert(_el$3, libs.createComponent(libs.Show, {
          get when() {
            return canRemove();
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_CloseButton, {
              hittest: true,
              onactivate: () => local.onRemoveEngraving?.()
            });
          }
        }), _el$4);
        libs.insert(_el$8, libs.createComponent(libs.For, {
          get each() {
            return attributeDisplays();
          },
          children: entry => libs.createComponent(rune_components.RuneAttributeRow, {
            get attr_name_html() {
              return entry.nameHtml;
            },
            get attr_value_html() {
              return entry.valueText;
            },
            entry_type: "Adverb",
            get color_name() {
              return entry.colorName;
            }
          })
        }));
        libs.effect(_p$ => {
          const _v$ = libs.classNames("EngravingInlayCardIcon", `Rarity${local.engraving?.rarity ?? 1}`),
            _v$2 = server_rune_utils.getEngravingIconPath(local.engraving) ?? "",
            _v$3 = libs.classNames("EngravingInlayCardNameText", `Rarity${local.engraving?.rarity ?? 1}`),
            _v$4 = GetLocalization(`#${String(local.engraving?.engraving_item_id ?? "")}`);
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "class", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "src", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "class", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
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
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.tooltipText != undefined;
      },
      get children() {
        const _el$9 = libs.createElement("Panel", {
          "class": "EngravingDetailCardTooltipIcon"
        }, null);
        libs.effect(_$p => libs.setProp(_el$9, "tooltip_text", local.tooltipText, _$p));
        return _el$9;
      }
    }), null);
    return _el$;
  })();
}
function RuneInlayRoot(props) {
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const playerRunes = solid_utils.createServiceNetData("player_runes", {});
  const playerInlayResults = solid_utils.createServiceNetData("player_inlay_engraving_results", {});
  const buildCosts = rawValue => libs.createMemo(() => {
    const tokenData = playerTokens();
    return parseCosts(rawValue).map(cost => ({
      ...cost,
      insufficient: (tokenData[cost.itemID]?.amounts ?? 0) < cost.amount
    }));
  });
  const punchCosts = buildCosts(GameUI.CustomUIConfig().engraving_setting?.engraving_punch?.value);
  const inlayCosts = buildCosts(GameUI.CustomUIConfig().engraving_setting?.engraving_inlay?.value);
  const hasEngravingSlot = () => (props.rune?.inlay_engravings_data?.length ?? 0) > 0;
  const hasInsufficientCost = costs => costs().some(cost => cost.insufficient);
  const runeMap = libs.createMemo(() => {
    return rune_data.buildRuneBagItems(playerRunes()).reduce((result, rune) => {
      result[rune.id] = rune;
      return result;
    }, {});
  });
  const previewResult = libs.createMemo(() => {
    const currentRuneMap = runeMap();
    return Object.values(playerInlayResults()).filter(value => {
      return isPlayerInlayResultValue(value) && currentRuneMap[value.id]?.in_check === "inlay_engraving";
    }).sort((a, b) => a.id - b.id)[0];
  });
  const previewRuneID = libs.createMemo(() => previewResult()?.id);
  const oldRune = libs.createMemo(() => {
    const runeID = previewRuneID();
    return runeID == undefined ? undefined : runeMap()[runeID];
  });
  const previewRune = libs.createMemo(() => {
    const rune = oldRune();
    const result = previewResult();
    if (rune == undefined || result == undefined) {
      return undefined;
    }
    return {
      ...rune,
      inlay_engravings_data: result.inlay_engravings_data
    };
  });
  const isPreviewing = libs.createMemo(() => previewResult() != undefined);
  const highlightedEntryKeys = libs.createMemo(() => {
    const result = previewResult();
    if (result == undefined) {
      return new Set();
    }
    const entryKey = getReplacedEngravingKey(result);
    return entryKey == undefined ? new Set() : new Set([entryKey]);
  });
  let lastPreviewRuneID = previewRuneID();
  libs.createEffect(() => {
    const currentPreviewRuneID = previewRuneID();
    props.onPreviewingChange(currentPreviewRuneID != undefined);
    if (lastPreviewRuneID != undefined && currentPreviewRuneID == undefined) {
      props.onPreviewFinished();
    }
    lastPreviewRuneID = currentPreviewRuneID;
  });
  const handlePunch = () => {
    const rune = props.rune;
    if (props.requesting || rune == undefined || hasEngravingSlot()) {
      return;
    }
    if (hasInsufficientCost(punchCosts)) {
      ErrorMessage(GetLocalization("#error_token_no_enough"));
      return;
    }
    props.setRequesting(true);
    CallActionRequest("/v1/engraving/punch_rune", {
      rune_id: rune.id
    }, result => {
      props.setRequesting(false);
      if (result.code !== 0) {
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
        return;
      }
      Game.EmitSound("UI.Rune.Punch");
    }, () => {
      props.setRequesting(false);
    });
  };
  const handleInlay = () => {
    const rune = props.rune;
    const engraving = props.engraving;
    if (props.requesting || rune == undefined || engraving == undefined || !hasEngravingSlot()) {
      return;
    }
    if (hasInsufficientCost(inlayCosts)) {
      ErrorMessage(GetLocalization("#error_token_no_enough"));
      return;
    }
    props.setRequesting(true);
    CallActionRequest("/v1/engraving/rune_inlay_engraving", {
      rune_id: rune.id,
      engraving_id: engraving.id
    }, result => {
      props.setRequesting(false);
      if (result.code !== 0) {
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
        return;
      }
      Game.EmitSound("UI.Rune.Inlay");
      props.onRemoveEngraving();
    }, () => {
      props.setRequesting(false);
    });
  };
  const handleConfirmPreview = confirm => {
    const runeID = previewRuneID();
    if (props.requesting || runeID == undefined) {
      return;
    }
    props.setRequesting(true);
    CallActionRequest("/v1/engraving/rune_inlay_engraving_confirm", {
      rune_id: runeID,
      confirm
    }, result => {
      props.setRequesting(false);
      if (result.code !== 0 && result.message != undefined) {
        ErrorMessage(result.message);
      }
    }, () => {
      props.setRequesting(false);
    });
  };
  const renderCosts = costs => (() => {
    const _el$12 = libs.createElement("Panel", {
        "class": "RuneInlayCosts"
      }, null),
      _el$13 = libs.createElement("Panel", {
        "class": "RuneInlayCostContent"
      }, _el$12);
    libs.insert(_el$13, libs.createComponent(libs.For, {
      get each() {
        return costs();
      },
      children: cost => (() => {
        const _el$14 = libs.createElement("Panel", {
            "class": "RuneInlayCostItem"
          }, null),
          _el$15 = libs.createElement("Label", {
            "class": "RuneInlayCostLabel",
            get text() {
              return `x${cost.amount}`;
            }
          }, _el$14);
        libs.insert(_el$14, libs.createComponent(Player.CurrencyIcon, {
          "class": "RuneInlayCostIcon",
          get tokenID() {
            return cost.itemID;
          }
        }), _el$15);
        libs.effect(_p$ => {
          const _v$5 = {
              Insufficient: cost.insufficient
            },
            _v$6 = `x${cost.amount}`;
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "classList", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$15, "text", _v$6, _p$._v$6));
          return _p$;
        }, {
          _v$5: undefined,
          _v$6: undefined
        });
        return _el$14;
      })()
    }));
    libs.effect(_$p => libs.setProp(_el$12, "visible", costs().length > 0, _$p));
    return _el$12;
  })();
  return (() => {
    const _el$16 = libs.createElement("Panel", {
        id: "RuneInlayRoot",
        get ["class"]() {
          return libs.classNames("RuneContentSubRoot", {
            Expanded: !isPreviewing() && hasEngravingSlot(),
            Previewing: isPreviewing()
          });
        }
      }, null),
      _el$17 = libs.createElement("Panel", {
        id: "RuneInlayCardContent"
      }, _el$16),
      _el$18 = libs.createElement("Image", {
        id: "RuneInlayArrow",
        hittest: false
      }, _el$17),
      _el$19 = libs.createElement("Panel", {
        id: "RuneInlayOperationContent"
      }, _el$16);
    libs.insert(_el$17, libs.createComponent(rune_components.RuneDetailCard, {
      id: "RuneInlayLeftCard",
      get EmptyLabel() {
        return GetLocalization("#RuneInlay_LeftCardEmptyLabel");
      },
      get tooltipText() {
        return GetLocalization("#RuneInlay_LeftCardTooltipLabel");
      },
      get rune() {
        return libs.memo(() => !!isPreviewing())() ? previewRune() : props.rune;
      },
      get highlightEntryKeys() {
        return libs.memo(() => !!isPreviewing())() ? highlightedEntryKeys() : undefined;
      },
      get onRemoveRune() {
        return isPreviewing() ? undefined : props.onRemoveRune;
      },
      onDragDrop: (_panel, draggedPanel) => {
        if (isPreviewing()) {
          return;
        }
        const runeID = Number(LoadData(draggedPanel, "rune")) || 0;
        if (runeID > 0) {
          props.onDropRune(runeID);
        }
      }
    }), _el$18);
    libs.insert(_el$17, libs.createComponent(EngravingDetailCard, {
      id: "RuneInlayRightCard",
      get hittest() {
        return libs.memo(() => !!!isPreviewing())() && hasEngravingSlot();
      },
      get hittestchildren() {
        return libs.memo(() => !!!isPreviewing())() && hasEngravingSlot();
      },
      get emptyLabel() {
        return GetLocalization("#RuneInlay_RightCardEmptyLabel");
      },
      get tooltipText() {
        return GetLocalization("#RuneInlay_RightCardTooltipLabel");
      },
      get engraving() {
        return props.engraving;
      },
      get onRemoveEngraving() {
        return props.onRemoveEngraving;
      },
      onDragDrop: (_panel, draggedPanel) => {
        if (isPreviewing()) {
          return;
        }
        const engravingID = Number(LoadData(draggedPanel, "engraving")) || 0;
        if (engravingID > 0) {
          props.onDropEngraving(engravingID);
        }
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(libs.Show, {
      get when() {
        return isPreviewing();
      },
      get children() {
        return libs.createComponent(rune_components.RuneDetailCard, {
          id: "RuneInlayPreviewRightCard",
          get EmptyLabel() {
            return GetLocalization("#RuneInlay_LeftCardEmptyLabel");
          },
          get rune() {
            return oldRune();
          },
          get highlightEntryKeys() {
            return highlightedEntryKeys();
          }
        });
      }
    }), null);
    libs.insert(_el$19, libs.createComponent(libs.Show, {
      get when() {
        return isPreviewing();
      },
      get fallback() {
        return libs.createComponent(libs.Show, {
          get when() {
            return props.rune != undefined;
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return hasEngravingSlot();
              },
              get fallback() {
                return (() => {
                  const _el$24 = libs.createElement("Panel", {
                    "class": "RuneInlayOperationSlot"
                  }, null);
                  libs.insert(_el$24, () => renderCosts(punchCosts), null);
                  libs.insert(_el$24, libs.createComponent(EOM_Button.EOM_Button, {
                    color: "Confirm",
                    size: "Normal",
                    get enabled() {
                      return libs.memo(() => !!!props.requesting)() && !hasInsufficientCost(punchCosts);
                    },
                    get text() {
                      return GetLocalization("#RuneInlay_ButtonPunch");
                    },
                    onactivate: handlePunch
                  }), null);
                  return _el$24;
                })();
              },
              get children() {
                const _el$23 = libs.createElement("Panel", {
                  "class": "RuneInlayOperationSlot"
                }, null);
                libs.insert(_el$23, () => renderCosts(inlayCosts), null);
                libs.insert(_el$23, libs.createComponent(EOM_Button.EOM_Button, {
                  color: "Confirm",
                  size: "Normal",
                  get enabled() {
                    return libs.memo(() => !!(!props.requesting && props.engraving != undefined))() && !hasInsufficientCost(inlayCosts);
                  },
                  get text() {
                    return GetLocalization("#RuneInlay_ButtonInlay");
                  },
                  onactivate: handleInlay
                }), null);
                return _el$23;
              }
            });
          }
        });
      },
      get children() {
        const _el$20 = libs.createElement("Panel", {
            id: "RuneInlayCheckButtons"
          }, null),
          _el$21 = libs.createElement("Panel", {
            "class": "RuneInlayCheckButtonSlot"
          }, _el$20),
          _el$22 = libs.createElement("Panel", {
            "class": "RuneInlayCheckButtonSlot"
          }, _el$20);
        libs.insert(_el$21, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          size: "Normal",
          get enabled() {
            return !props.requesting;
          },
          get text() {
            return GetLocalization("#RuneInlay_ButtonConfirmResult");
          },
          onactivate: () => handleConfirmPreview(true)
        }));
        libs.insert(_el$22, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Cancel",
          size: "Normal",
          get enabled() {
            return !props.requesting;
          },
          get text() {
            return GetLocalization("#RuneInlay_ButtonRestore");
          },
          onactivate: () => handleConfirmPreview(false)
        }));
        return _el$20;
      }
    }));
    libs.effect(_$p => libs.setProp(_el$16, "class", libs.classNames("RuneContentSubRoot", {
      Expanded: !isPreviewing() && hasEngravingSlot(),
      Previewing: isPreviewing()
    }), _$p));
    return _el$16;
  })();
}

const MENU_LIST = {
  RuneEmbed_Menu: [],
  RuneBreak_Menu: [],
  RuneDevour_Menu: [],
  RuneInlay_Menu: []
};
const {
  LayoutMenu,
  show,
  menuName,
  jumpInfo,
  getMenuAbyssalLockRequiredDiff,
  isAbyssalMenuUnlocked
} = EOM_MenuLayout.createMenuLayout("rune", () => MENU_LIST);
const isEngravingBagLocked = () => !isAbyssalMenuUnlocked("RuneInlay_Menu");
let player_runes = () => ({});
let runeUnreadIds;
let engravingUnreadIds;
const isRuneNew = id => runeUnreadIds?.isUnread(id) ?? false;
const markRuneRead = id => runeUnreadIds?.markRead(id);
const isEngravingNew = id => engravingUnreadIds?.isUnread(id) ?? false;
const markEngravingRead = id => engravingUnreadIds?.markRead(id);
const abilityDisplayMappings = [{
  serviceSkillID: 1,
  heroAbilityIndex: 3,
  id: "AbilityAttack"
}, {
  serviceSkillID: 2,
  heroAbilityIndex: 0,
  id: "Ability1"
}, {
  serviceSkillID: 3,
  heroAbilityIndex: 1,
  id: "Ability2"
}, {
  serviceSkillID: 4,
  heroAbilityIndex: 2,
  id: "Ability3"
}, {
  serviceSkillID: 5,
  heroAbilityIndex: 5,
  id: "Ability4"
}];
const RUNE_ADVERB_ENTRY_FILTER_MODES = ["default", "include", "exclude"];
const RUNE_NEEDLV_LIST = Array.from(new Set(Object.values(KeyValues.rune_rarity_setting).map(setting => setting.need_level))).sort((a, b) => a - b);
const RUNE_RARITY_LIST = Object.values(KeyValues.rune_rarity_setting).map(setting => setting.rarity).sort((a, b) => a - b);
const ENGRAVING_RARITY_LIST = Object.values(KeyValues.engraving_rarity_setting).map(setting => setting.rarity).sort((a, b) => a - b);
const RUNE_ADVERB_ENTRY_LIST = Object.values(GameUI.CustomUIConfig().rune_entry ?? {}).filter(entry => entry.entry_type === 2).sort((a, b) => a.id - b.id);
const RUNE_MAIN_ENTRY_LIST = Object.values(GameUI.CustomUIConfig().rune_entry ?? {}).filter(entry => entry.entry_type === 1).sort((a, b) => a.id - b.id);
const ENGRAVING_ENTRY_LIST = Object.values(KeyValues.engraving_entry).sort((a, b) => a.id - b.id);
const RUNE_BAG_MAX_CAPACITY = 400;
const ENGRAVING_BAG_MAX_CAPACITY = 400;
const CHAOS_RUNE_MIN_RARITY = 7;
const LOCKED_RUNE_BREAK_MESSAGE = "#RuneBreak_LockedErrorMessage";
const LOCKED_ENGRAVING_BREAK_MESSAGE = "#RuneBreak_LockedEngravingErrorMessage";
const EQUIPPED_RUNE_BREAK_MESSAGE = "#RuneBreak_EquippedTips";
const EQUIPPED_RUNE_DEVOUR_MESSAGE = "#RuneDevour_EquippedRuneNotAllow";
let showFilter = () => false;
let setShowFilter = () => false;
let filterNeedLv = () => ({});
let setFilterNeedLv = () => ({});
let filterRarity = () => ({});
let setFilterRarity = () => ({});
let filterSuit = () => ({});
let setFilterSuit = () => ({});
let runeFilterAdverbEntry = () => ({});
let setRuneFilterAdverbEntry = () => ({});
let engravingFilterRarity = () => ({});
let setEngravingFilterRarity = () => ({});
let engravingFilterEntry = () => ({});
let setEngravingFilterEntry = () => ({});
let runeMainFilter = () => ({});
let setRuneMainFilter = () => ({});
let runeMainRanges = () => ({});
let setRuneMainRanges = () => ({});
let runeSubRanges = () => ({});
let setRuneSubRanges = () => ({});
let runeSuitRanges = () => ({});
let setRuneSuitRanges = () => ({});
let engravingRanges = () => ({});
let setEngravingRanges = () => ({});
let resetFilter = () => 0;
let setResetFilter = () => 0;
function createRunePageState() {
  player_runes = solid_utils.createServiceNetData("player_runes", {});
  runeUnreadIds = solid_utils.createPlayerUnreadIds("rune");
  engravingUnreadIds = solid_utils.createPlayerUnreadIds("engraving");
  [showFilter, setShowFilter] = libs.createSignal(false);
  [filterNeedLv, setFilterNeedLv] = libs.createSignal({});
  [filterRarity, setFilterRarity] = libs.createSignal({});
  [filterSuit, setFilterSuit] = libs.createSignal({});
  [runeFilterAdverbEntry, setRuneFilterAdverbEntry] = libs.createSignal({});
  [engravingFilterRarity, setEngravingFilterRarity] = libs.createSignal({});
  [engravingFilterEntry, setEngravingFilterEntry] = libs.createSignal({});
  [runeMainFilter, setRuneMainFilter] = libs.createSignal({});
  [runeMainRanges, setRuneMainRanges] = libs.createSignal({});
  [runeSubRanges, setRuneSubRanges] = libs.createSignal({});
  [runeSuitRanges, setRuneSuitRanges] = libs.createSignal({});
  [engravingRanges, setEngravingRanges] = libs.createSignal({});
  [resetFilter, setResetFilter] = libs.createSignal(0);
  libs.onCleanup(() => {
    runeUnreadIds?.submitReadCache();
    engravingUnreadIds?.submitReadCache();
  });
}
const getRuneNeedLevel = rune => {
  return KeyValues.rune_rarity_setting[rune.rarity]?.need_level;
};
const isRuneEquipped = rune => {
  return rune?.in_rune_equip_suit != undefined && rune.in_rune_equip_suit !== "";
};
const handleRuneLock = (id, lock) => {
  CallAction("/v1/rune/lock", {
    id: id,
    lock: lock
  });
};
const handleEngravingLock = (id, lock) => {
  CallAction("/v1/engraving/lock", {
    id,
    lock
  });
};
function RuneFilterWindow() {
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
  libs.createEffect(libs.on(resetFilter, () => {
    needLvFilter?.reset();
  }, {
    defer: true
  }));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "RuneFilterWindow",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "NeedLvFilter",
        "class": "Filter"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "FilterType",
        get text() {
          return GetLocalization("#NeedLvFilter");
        }
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        "class": "Subheading",
        get text() {
          return GetLocalization("#Equipment_Rarity");
        }
      }, _el$);
      libs.createElement("Panel", {
        "class": "FilterLine"
      }, _el$);
      const _el$6 = libs.createElement("Panel", {
        id: "RarityFilterList",
        "class": "CheckBoxList"
      }, _el$),
      _el$7 = libs.createElement("Label", {
        "class": "Subheading",
        get text() {
          return GetLocalization("#Equipment_Suit");
        }
      }, _el$);
      libs.createElement("Panel", {
        "class": "FilterLine"
      }, _el$);
      const _el$9 = libs.createElement("Panel", {
        id: "SuitFilterList",
        "class": "EntryValueFilterList"
      }, _el$);
    libs.setProp(_el$, "scroll", "y");
    libs.insert(_el$2, libs.createComponent(EOM_MultiDropDown.EOM_MultiDropDown, {
      get placeholder() {
        return needLvText();
      },
      ref(r$) {
        const _ref$ = needLvFilter;
        typeof _ref$ === "function" ? _ref$(r$) : needLvFilter = r$;
      },
      options: RUNE_NEEDLV_LIST,
      get index() {
        return RUNE_NEEDLV_LIST.map((level, index) => filterNeedLv()[level] ? index : -1).filter(index => index >= 0);
      },
      onChange: value => {
        setFilterNeedLv(value);
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(libs.For, {
      each: RUNE_RARITY_LIST,
      children: rarity => {
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
    libs.insert(_el$9, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(KeyValues.rune_suit_effect);
      },
      children: suitID => (() => {
        const _el$0 = libs.createElement("Panel", {
          "class": "EntryRangeFilterRow"
        }, null);
        libs.insert(_el$0, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
          "class": "EntryRangeFilterName",
          get checked() {
            return filterSuit()[suitID] ?? false;
          },
          get text() {
            return GetLocalization(`#RuneSuit_${suitID}`);
          },
          onchecked: checked => setFilterSuit(prev => ({
            ...prev,
            [suitID]: checked
          }))
        }), null);
        libs.insert(_el$0, libs.createComponent(entry_range_inputs.EntryRangeInputs, {
          get range() {
            return runeSuitRanges()[suitID];
          },
          get unit() {
            return GetLocalization("#RuneFilter_Points");
          },
          onChange: range => libs.batch(() => {
            setRuneSuitRanges(prev => ({
              ...prev,
              [suitID]: range
            }));
            if (range.min.trim() || range.max.trim()) setFilterSuit(prev => ({
              ...prev,
              [suitID]: true
            }));
          })
        }), null);
        return _el$0;
      })()
    }));
    libs.insert(_el$, libs.createComponent(EntryFilterSection, {
      title: "#Equipment_SelectMainEntry",
      listID: "RuneMainEntryFilterList",
      entries: RUNE_MAIN_ENTRY_LIST,
      filter: runeMainFilter,
      setFilter: setRuneMainFilter,
      ranges: runeMainRanges,
      setRanges: setRuneMainRanges
    }), null);
    libs.insert(_el$, libs.createComponent(RuneAdverbEntryFilterSection, {}), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#NeedLvFilter"),
        _v$2 = GetLocalization("#Equipment_Rarity"),
        _v$3 = GetLocalization("#Equipment_Suit");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
function EntryFilterSection(props) {
  return [(() => {
    const _el$1 = libs.createElement("Label", {
      "class": "Subheading",
      get text() {
        return GetLocalization(props.title);
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$1, "text", GetLocalization(props.title), _$p));
    return _el$1;
  })(), libs.createElement("Panel", {
    "class": "FilterLine"
  }, null), (() => {
    const _el$11 = libs.createElement("Panel", {
      get id() {
        return props.listID;
      },
      "class": "EntryValueFilterList"
    }, null);
    libs.insert(_el$11, libs.createComponent(libs.For, {
      get each() {
        return props.entries;
      },
      children: entry => (() => {
        const _el$12 = libs.createElement("Panel", {
          "class": "EntryRangeFilterRow"
        }, null);
        libs.insert(_el$12, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
          "class": "EntryRangeFilterName",
          get checked() {
            return props.filter()[entry.entry_name] ?? false;
          },
          get text() {
            return GetLocalization(`#property_${entry.entry_name}`).replace("%", "");
          },
          onchecked: checked => props.setFilter(prev => ({
            ...prev,
            [entry.entry_name]: checked
          }))
        }), null);
        libs.insert(_el$12, libs.createComponent(entry_range_inputs.EntryRangeInputs, {
          get range() {
            return props.ranges()[entry.entry_name];
          },
          get unit() {
            return GetLocalization(`#property_${entry.entry_name}`).startsWith("%") ? "%" : "";
          },
          onChange: range => libs.batch(() => {
            props.setRanges(prev => ({
              ...prev,
              [entry.entry_name]: range
            }));
            if (range.min.trim() || range.max.trim()) props.setFilter(prev => ({
              ...prev,
              [entry.entry_name]: true
            }));
          })
        }), null);
        return _el$12;
      })()
    }));
    libs.effect(_$p => libs.setProp(_el$11, "id", props.listID, _$p));
    return _el$11;
  })()];
}
function RuneAdverbEntryFilterSection() {
  const selectMode = (entryID, mode) => {
    setRuneFilterAdverbEntry(prev => {
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
  return [(() => {
    const _el$13 = libs.createElement("Label", {
      "class": "Subheading",
      get text() {
        return GetLocalization("#RuneFilter_SelectAdverbEntry");
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$13, "text", GetLocalization("#RuneFilter_SelectAdverbEntry"), _$p));
    return _el$13;
  })(), libs.createElement("Panel", {
    "class": "FilterLine"
  }, null), (() => {
    const _el$15 = libs.createElement("Panel", {
      id: "RuneAdverbEntryFilterList"
    }, null);
    libs.insert(_el$15, libs.createComponent(libs.For, {
      each: RUNE_ADVERB_ENTRY_LIST,
      children: entry => {
        const mode = () => runeFilterAdverbEntry()[entry.entry_name] ?? "default";
        return (() => {
          const _el$16 = libs.createElement("Panel", {
              "class": "EntryFilterRule"
            }, null),
            _el$17 = libs.createElement("Panel", {
              "class": "RuneAdverbEntryFilterRow"
            }, _el$16),
            _el$18 = libs.createElement("Label", {
              html: true,
              "class": "RuneAdverbEntryName",
              get text() {
                return GetLocalization(`#property_${entry.entry_name}`).replace("%", "");
              }
            }, _el$17),
            _el$19 = libs.createElement("Panel", {
              "class": "RuneAdverbEntryMode"
            }, _el$17);
          libs.insert(_el$19, libs.createComponent(libs.For, {
            each: RUNE_ADVERB_ENTRY_FILTER_MODES,
            children: (filterMode, index) => (() => {
              const _el$20 = libs.createElement("Panel", {
                  "class": "RuneAdverbEntryModeOption"
                }, null),
                _el$21 = libs.createElement("Button", {
                  get ["class"]() {
                    return libs.classNames("RuneAdverbEntryModeButton", filterMode, {
                      Selected: mode() === filterMode
                    });
                  }
                }, _el$20),
                _el$22 = libs.createElement("Label", {
                  get text() {
                    return GetLocalization(`#RuneFilter_AdverbEntryMode_${filterMode}`);
                  }
                }, _el$21);
              libs.setProp(_el$21, "onactivate", () => selectMode(entry.entry_name, filterMode));
              libs.insert(_el$20, libs.createComponent(libs.Show, {
                get when() {
                  return index() < RUNE_ADVERB_ENTRY_FILTER_MODES.length - 1;
                },
                get children() {
                  return libs.createElement("Label", {
                    "class": "RuneAdverbEntryModeSeparator",
                    text: "/"
                  }, null);
                }
              }), null);
              libs.effect(_p$ => {
                const _v$4 = libs.classNames("RuneAdverbEntryModeButton", filterMode, {
                    Selected: mode() === filterMode
                  }),
                  _v$5 = GetLocalization(`#RuneFilter_AdverbEntryMode_${filterMode}`);
                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$21, "class", _v$4, _p$._v$4));
                _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$22, "text", _v$5, _p$._v$5));
                return _p$;
              }, {
                _v$4: undefined,
                _v$5: undefined
              });
              return _el$20;
            })()
          }));
          libs.insert(_el$16, libs.createComponent(libs.Show, {
            get when() {
              return mode() === "include";
            },
            get children() {
              return libs.createComponent(entry_range_inputs.EntryRangeInputs, {
                get range() {
                  return runeSubRanges()[entry.entry_name];
                },
                get unit() {
                  return GetLocalization(`#property_${entry.entry_name}`).startsWith("%") ? "%" : "";
                },
                onChange: range => setRuneSubRanges(prev => ({
                  ...prev,
                  [entry.entry_name]: range
                }))
              });
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$18, "text", GetLocalization(`#property_${entry.entry_name}`).replace("%", ""), _$p));
          return _el$16;
        })();
      }
    }));
    return _el$15;
  })()];
}
function EngravingEntryFilterSection() {
  return libs.createComponent(EntryFilterSection, {
    title: "#RuneFilter_SelectEngraving",
    listID: "EngravingEntryFilterList",
    entries: ENGRAVING_ENTRY_LIST,
    filter: engravingFilterEntry,
    setFilter: setEngravingFilterEntry,
    ranges: engravingRanges,
    setRanges: setEngravingRanges
  });
}
function EngravingFilterWindow() {
  return (() => {
    const _el$24 = libs.createElement("Panel", {
        id: "EngravingFilterWindow",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, null),
      _el$25 = libs.createElement("Label", {
        "class": "Subheading FirstFilterHeading",
        get text() {
          return GetLocalization("#Equipment_Rarity");
        }
      }, _el$24);
      libs.createElement("Panel", {
        "class": "FilterLine"
      }, _el$24);
      const _el$27 = libs.createElement("Panel", {
        id: "EngravingRarityFilterList",
        "class": "CheckBoxList"
      }, _el$24);
    libs.setProp(_el$24, "scroll", "y");
    libs.insert(_el$27, libs.createComponent(libs.For, {
      each: ENGRAVING_RARITY_LIST,
      children: rarity => libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
        "class": `Rarity${rarity}`,
        get checked() {
          return engravingFilterRarity()[rarity] ?? false;
        },
        get text() {
          return GetLocalization(`#Equipment_Rarity_${rarity}`);
        },
        onchecked: checked => {
          if (checked) {
            setEngravingFilterRarity(prev => ({
              ...prev,
              [rarity]: true
            }));
          } else {
            const next = {
              ...engravingFilterRarity()
            };
            delete next[rarity];
            setEngravingFilterRarity(next);
          }
        }
      })
    }));
    libs.insert(_el$24, libs.createComponent(EngravingEntryFilterSection, {}), null);
    libs.effect(_$p => libs.setProp(_el$25, "text", GetLocalization("#Equipment_Rarity"), _$p));
    return _el$24;
  })();
}
function RunePage() {
  createRunePageState();
  const [bagType, setBagType] = libs.createSignal("rune");
  const [suitFilter, setSuitFilter] = libs.createSignal("all");
  const playerEngravings = solid_utils.createServiceNetData("player_engravings", {});
  const player_hero_rune_equip_suits = solid_utils.createServiceNetData("player_hero_rune_equip_suits", {});
  const player_account_levels = solid_utils.createServiceNetData("player_account_levels", {
    rune_break_level: {
      level: 0,
      extra_exp: 0
    }
  });
  const runeList = libs.createMemo(() => rune_data.buildRuneBagItems(player_runes()));
  const engravingList = libs.createMemo(() => server_rune_utils.buildEngravingBagItems(playerEngravings()));
  const hasUnreadRune = libs.createMemo(() => runeList().some(rune => isRuneNew(rune.id)));
  const hasUnreadEngraving = libs.createMemo(() => engravingList().some(engraving => isEngravingNew(engraving.id)));
  const runeBagCount = libs.createMemo(() => runeList().length);
  const engravingBagCount = libs.createMemo(() => engravingList().length);
  const isRuneBagFull = libs.createMemo(() => runeBagCount() >= RUNE_BAG_MAX_CAPACITY);
  const runeMap = libs.createMemo(() => {
    return runeList().reduce((result, rune) => {
      result[rune.id] = rune;
      return result;
    }, {});
  });
  const engravingMap = libs.createMemo(() => {
    return engravingList().reduce((result, engraving) => {
      result[engraving.id] = engraving;
      return result;
    }, {});
  });
  const [requesting, setRequesting] = libs.createSignal(false);
  const [selectedRuneID, setSelectedRuneID] = libs.createSignal();
  const [selectedEngravingID, setSelectedEngravingID] = libs.createSignal();
  const [peekedRuneIDs, setPeekedRuneIDs] = libs.createSignal([]);
  const [draggingRuneID, setDraggingRuneID] = libs.createSignal();
  const [draggingEngravingID, setDraggingEngravingID] = libs.createSignal();
  const [dragHoverSlotKey, setDragHoverSlotKey] = libs.createSignal();
  const [devourLeftRuneID, setDevourLeftRuneID] = libs.createSignal();
  const [devourRightRuneID, setDevourRightRuneID] = libs.createSignal();
  const [devourPreviewing, setDevourPreviewing] = libs.createSignal(false);
  const [inlayRuneID, setInlayRuneID] = libs.createSignal();
  const [inlayEngravingID, setInlayEngravingID] = libs.createSignal();
  const [inlayPreviewing, setInlayPreviewing] = libs.createSignal(false);
  const [selectedBreakSlot, setSelectedBreakSlot] = libs.createSignal(-1);
  const [showBreakAttrInfo, setShowBreakAttrInfo] = libs.createSignal(false);
  const [breakItemIDs, setBreakItemIDs] = libs.createSignal([]);
  const [runeEmbedContext, setRuneEmbedContext] = libs.createSignal();
  const devourLeftRune = libs.createMemo(() => runeMap()[devourLeftRuneID() ?? 0]);
  const devourRightRune = libs.createMemo(() => runeMap()[devourRightRuneID() ?? 0]);
  const inlayRune = libs.createMemo(() => runeMap()[inlayRuneID() ?? 0]);
  const inlayEngraving = libs.createMemo(() => engravingMap()[inlayEngravingID() ?? 0]);
  const breakItems = libs.createMemo(() => {
    const itemMap = bagType() === "rune" ? runeMap() : engravingMap();
    return breakItemIDs().map(itemID => itemID == undefined ? undefined : itemMap[itemID]);
  });
  const breakSelectedItemIDs = libs.createMemo(() => {
    return breakItemIDs().filter(itemID => itemID != undefined);
  });
  const equippedRuneIDs = libs.createMemo(() => {
    const result = {};
    for (const planList of Object.values(player_hero_rune_equip_suits())) {
      for (const skillList of Object.values(planList)) {
        for (const slotList of Object.values(skillList)) {
          for (const equippedRuneID of Object.values(slotList)) {
            const runeID = Number(equippedRuneID);
            if (runeID > 0) {
              result[runeID] = true;
            }
          }
        }
      }
    }
    return Object.keys(result).map(Number);
  });
  const bagPeekedRuneIDs = libs.createMemo(() => {
    if (menuName() === "RuneEmbed_Menu") {
      return peekedRuneIDs();
    }
    return equippedRuneIDs();
  });
  const runeBreakLevel = libs.createMemo(() => player_account_levels().rune_break_level ?? {
    level: 0,
    extra_exp: 0
  });
  const rightShowAttrInfo = libs.createMemo(() => menuName() === "RuneBreak_Menu" && showBreakAttrInfo());
  const filterTabs = libs.createMemo(() => {
    const suitIDs = Object.values(KeyValues.rune_suit_effect).map(suit => suit.id);
    return ["all", ...suitIDs];
  });
  const filteredRunes = libs.createMemo(() => {
    const filter = suitFilter();
    const rarityFilter = filterRarity();
    const needLvFilter = filterNeedLv();
    const suitFilterMap = filterSuit();
    const adverbEntryFilter = runeFilterAdverbEntry();
    let result = runeList();
    if (filter !== "all") {
      result = result.filter(rune => rune.suitIDs.includes(filter));
    }
    const selectedRarity = Object.keys(rarityFilter).filter(key => rarityFilter[Number(key)]).map(Number);
    if (selectedRarity.length > 0) {
      result = result.filter(rune => selectedRarity.includes(rune.rarity));
    }
    const selectedNeedLv = Object.keys(needLvFilter).filter(key => needLvFilter[Number(key)]).map(Number);
    if (selectedNeedLv.length > 0) {
      result = result.filter(rune => {
        const needLevel = getRuneNeedLevel(rune);
        return needLevel != undefined && selectedNeedLv.includes(needLevel);
      });
    }
    const selectedSuit = Object.keys(suitFilterMap).filter(key => suitFilterMap[key]);
    if (selectedSuit.length > 0) {
      result = result.filter(rune => {
        const points = {};
        for (const entry of rune.rune_suit_data ?? []) {
          points[entry.id] = (points[entry.id] ?? 0) + entry.value;
        }
        return entry_range_inputs.matchesSelectedEntryRanges(Object.entries(points).map(([id, value]) => ({
          id,
          value
        })), selectedSuit, runeSuitRanges(), true);
      });
    }
    const includedAdverbEntries = [];
    const excludedAdverbEntries = [];
    for (const [entryID, mode] of Object.entries(adverbEntryFilter)) {
      if (mode === "include") includedAdverbEntries.push(entryID);
      if (mode === "exclude") excludedAdverbEntries.push(entryID);
    }
    const selectedMainEntries = Object.keys(runeMainFilter()).filter(id => runeMainFilter()[id]);
    result = result.filter(rune => entry_range_inputs.matchesSelectedEntryRanges(rune.main_entry_data, selectedMainEntries, runeMainRanges(), true) && entry_range_inputs.matchesSelectedEntryRanges(rune.adverb_entry_data, includedAdverbEntries, runeSubRanges()) && excludedAdverbEntries.every(id => !(rune.adverb_entry_data ?? []).some(entry => entry.id === id)));
    return result;
  });
  const filteredEngravings = libs.createMemo(() => {
    const rarityFilter = engravingFilterRarity();
    const entryFilter = engravingFilterEntry();
    let result = engravingList();
    const selectedRarity = Object.keys(rarityFilter).filter(key => rarityFilter[Number(key)]).map(Number);
    if (selectedRarity.length > 0) {
      result = result.filter(engraving => selectedRarity.includes(engraving.rarity));
    }
    const selectedEntries = Object.keys(entryFilter).filter(key => entryFilter[key]);
    if (selectedEntries.length > 0) {
      result = result.filter(engraving => entry_range_inputs.matchesSelectedEntryRanges(engraving.adverb_entry_data, selectedEntries, engravingRanges(), true));
    }
    return result;
  });
  const peekedRuneIDMap = libs.createMemo(() => {
    return bagPeekedRuneIDs().reduce((result, runeID) => {
      result[runeID] = true;
      return result;
    }, {});
  });
  const selectedRuneIDMap = libs.createMemo(() => {
    if (menuName() === "RuneBreak_Menu" && bagType() === "rune") {
      return breakSelectedItemIDs().reduce((result, runeID) => {
        result[runeID] = true;
        return result;
      }, {});
    }
    if (menuName() === "RuneInlay_Menu") {
      const runeID = inlayRuneID();
      return runeID == undefined ? {} : {
        [runeID]: true
      };
    }
    const runeID = selectedRuneID();
    return runeID == undefined ? {} : {
      [runeID]: true
    };
  });
  const selectedEngravingIDMap = libs.createMemo(() => {
    if (menuName() === "RuneBreak_Menu" && bagType() === "engraving") {
      return breakSelectedItemIDs().reduce((result, engravingID) => {
        result[engravingID] = true;
        return result;
      }, {});
    }
    if (menuName() === "RuneInlay_Menu") {
      const engravingID = inlayEngravingID();
      return engravingID == undefined ? {} : {
        [engravingID]: true
      };
    }
    const engravingID = selectedEngravingID();
    return engravingID == undefined ? {} : {
      [engravingID]: true
    };
  });
  const selectedRune = libs.createMemo(() => runeMap()[selectedRuneID() ?? 0]);
  const selectedRuneLocked = libs.createMemo(() => selectedRune()?.locked === true);
  const selectedEngraving = libs.createMemo(() => engravingMap()[selectedEngravingID() ?? 0]);
  const selectedEngravingLocked = libs.createMemo(() => selectedEngraving()?.locked === true);
  const selectedBagItem = libs.createMemo(() => bagType() === "rune" ? selectedRune() : selectedEngraving());
  const selectedBagItemLocked = libs.createMemo(() => bagType() === "rune" ? selectedRuneLocked() : selectedEngravingLocked());
  const filterIcon = filter => {
    if (filter === "all") {
      return getSrcPath("conv/icon/icon_zb_01.png");
    }
    return rune_data.getRuneSuitIconPath(filter) ?? getSrcPath("conv/icon/icon_zb_01.png");
  };
  libs.createEffect(() => {
    const rune = devourRightRune();
    if (rune?.locked === true || isRuneEquipped(rune)) {
      setDevourRightRuneID(undefined);
    }
  });
  libs.createEffect(() => {
    const currentBagType = bagType();
    setBreakItemIDs(prev => {
      const next = prev.filter(itemID => {
        if (itemID == undefined) {
          return false;
        }
        if (currentBagType === "engraving") {
          const engraving = engravingMap()[itemID];
          return engraving != undefined && engraving.locked !== true;
        }
        const rune = runeMap()[itemID];
        return rune != undefined && rune.locked !== true && !isRuneEquipped(rune);
      });
      return next.length != prev.length ? next : prev;
    });
  });
  libs.createEffect(() => {
    const runeID = inlayRuneID();
    if (runeID == undefined) {
      return;
    }
    const rune = runeMap()[runeID];
    if (rune == undefined) {
      libs.batch(() => {
        setInlayRuneID(undefined);
        setInlayEngravingID(undefined);
      });
      return;
    }
    if ((rune.inlay_engravings_data?.length ?? 0) === 0) {
      setInlayEngravingID(undefined);
    }
  });
  libs.createEffect(() => {
    const engravingID = inlayEngravingID();
    if (engravingID != undefined && engravingMap()[engravingID] == undefined) {
      setInlayEngravingID(undefined);
    }
  });
  const clearDragState = () => {
    setDraggingRuneID(undefined);
    setDraggingEngravingID(undefined);
    setDragHoverSlotKey(undefined);
  };
  const handleBagTypeChange = nextType => {
    if (requesting()) {
      return;
    }
    if (nextType === "engraving" && isEngravingBagLocked()) {
      const requiredDiff = getMenuAbyssalLockRequiredDiff("RuneInlay_Menu");
      if (requiredDiff != undefined) {
        ErrorMessage(LocalizeWithVars("#MenuLayout_AbyssalLock", {
          value: requiredDiff
        }));
      }
      return;
    }
    if (bagType() === nextType) {
      if (menuName() === "RuneBreak_Menu") {
        libs.batch(() => {
          setSelectedBreakSlot(-1);
          setShowBreakAttrInfo(false);
          setShowFilter(false);
        });
      }
      return;
    }
    libs.batch(() => {
      if (menuName() === "RuneBreak_Menu") {
        setBreakItemIDs([]);
        setSelectedBreakSlot(-1);
        setShowBreakAttrInfo(false);
        setShowFilter(false);
      }
      setBagType(nextType);
      clearDragState();
    });
  };
  const handleResetFilter = () => {
    if (bagType() === "engraving") {
      libs.batch(() => {
        setEngravingFilterRarity({});
        setEngravingFilterEntry({});
        setEngravingRanges({});
      });
      return;
    }
    libs.batch(() => {
      setFilterNeedLv({});
      setFilterRarity({});
      setFilterSuit({});
      setRuneFilterAdverbEntry({});
      setRuneMainFilter({});
      setRuneMainRanges({});
      setRuneSubRanges({});
      setRuneSuitRanges({});
      setResetFilter(prev => prev + 1);
    });
  };
  libs.createEffect(libs.on(show, isShow => {
    if (isShow) return;
    runeUnreadIds?.submitReadCache();
    engravingUnreadIds?.submitReadCache();
  }));
  const canBreakRune = rune => {
    if (rune == undefined) {
      return false;
    }
    if (rune.locked === true) {
      ErrorMessage(LOCKED_RUNE_BREAK_MESSAGE);
      return false;
    }
    if (isRuneEquipped(rune)) {
      ErrorMessage(EQUIPPED_RUNE_BREAK_MESSAGE);
      return false;
    }
    return true;
  };
  const canBreakEngraving = engraving => {
    if (engraving == undefined) {
      return false;
    }
    if (engraving.locked === true) {
      ErrorMessage(LOCKED_ENGRAVING_BREAK_MESSAGE);
      return false;
    }
    return true;
  };
  const canBreakItem = itemID => {
    return bagType() === "rune" ? canBreakRune(runeMap()[itemID]) : canBreakEngraving(engravingMap()[itemID]);
  };
  const addItemToBreakSlot = (itemID, slot) => {
    if (!canBreakItem(itemID)) {
      return false;
    }
    setBreakItemIDs(prev => {
      if (prev.includes(itemID)) {
        return prev.filter(id => id != itemID);
      }
      const targetSlot = slot != undefined ? slot : selectedBreakSlot() >= 0 ? selectedBreakSlot() : undefined;
      if (targetSlot != undefined && targetSlot >= 0 && targetSlot < RUNE_BREAK_SLOT_NUM) {
        const next = [...prev];
        next[targetSlot] = itemID;
        return next;
      }
      if (prev.length < RUNE_BREAK_MAX_SELECT_NUM) {
        return [...prev, itemID];
      }
      return prev;
    });
    return true;
  };
  const removeItemFromBreakSlots = itemID => {
    setBreakItemIDs(prev => prev.includes(itemID) ? prev.filter(id => id != itemID) : prev);
  };
  const handleFastAddBreakItems = rarity => {
    setSelectedBreakSlot(-1);
    setShowBreakAttrInfo(false);
    setShowFilter(false);
    setBreakItemIDs(prev => {
      const addList = [];
      const fastAddCandidates = bagType() === "engraving" ? [...engravingList()].sort((a, b) => a.rarity - b.rarity || a.engraving_item_id - b.engraving_item_id || a.id - b.id) : [...runeList()].sort((a, b) => a.rarity - b.rarity || a.rune_item_id - b.rune_item_id || a.id - b.id);
      for (const item of fastAddCandidates) {
        if (addList.length >= RUNE_BREAK_MAX_SELECT_NUM) {
          break;
        }
        if (item.locked === true) {
          continue;
        }
        if (bagType() === "rune" && isRuneEquipped(item)) {
          continue;
        }
        if (rarity != 0 && item.rarity != rarity) {
          continue;
        }
        addList.push(item.id);
      }
      return addList.length > 0 ? addList : prev;
    });
  };
  const handleConfirmBreakItems = playSuccessEffect => {
    if (requesting()) {
      return;
    }
    const currentBagType = bagType();
    const ids = breakItemIDs().filter(itemID => {
      if (itemID == undefined) {
        return false;
      }
      if (currentBagType === "engraving") {
        const engraving = engravingMap()[itemID];
        return engraving != undefined && engraving.locked !== true;
      }
      const rune = runeMap()[itemID];
      return rune != undefined && rune.locked !== true && !isRuneEquipped(rune);
    });
    if (ids.length == 0) {
      return;
    }
    setRequesting(true);
    const action = currentBagType === "engraving" ? "/v1/engraving/break" : "/v1/rune/break";
    CallActionRequest(action, {
      ids
    }, result => {
      setRequesting(false);
      if (result.code !== 0) {
        if (result.message != undefined) {
          if (result.message === "rune in check") {
            ErrorMessage("#RuneBreak_InCheckRuneNotAllow");
          } else {
            ErrorMessage(result.message);
          }
        }
        return;
      }
      playSuccessEffect();
      setBreakItemIDs([]);
    }, () => {
      setRequesting(false);
    });
  };
  const handleSelectBreakSlot = slot => {
    libs.batch(() => {
      setSelectedBreakSlot(slot);
      setShowBreakAttrInfo(false);
      setShowFilter(false);
    });
  };
  const handleShowBreakAttrs = () => {
    libs.batch(() => {
      setSelectedBreakSlot(-1);
      setShowBreakAttrInfo(true);
    });
  };
  const handleToggleBreakAttrs = () => {
    const nextVisible = !showBreakAttrInfo();
    libs.batch(() => {
      setShowBreakAttrInfo(nextVisible);
      if (nextVisible) {
        setSelectedBreakSlot(-1);
      }
    });
  };
  const handleClearBreakSlot = slot => {
    setBreakItemIDs(prev => {
      const itemID = prev[slot];
      if (itemID == undefined) {
        return prev;
      }
      return prev.filter(id => id != itemID);
    });
  };
  const handleDropBreakItem = (slot, itemID) => {
    if (requesting() || itemID <= 0) {
      return;
    }
    if (bagType() === "rune") {
      setSelectedRuneID(itemID);
    } else {
      setSelectedEngravingID(itemID);
    }
    addItemToBreakSlot(itemID, slot);
  };
  const setDevourRuneSlot = (slot, runeID) => {
    if (runeID == undefined) {
      if (slot === "left") {
        setDevourLeftRuneID(undefined);
      } else {
        setDevourRightRuneID(undefined);
      }
      return;
    }
    const rune = runeMap()[runeID];
    if (slot === "left" && (rune == undefined || rune.rarity < CHAOS_RUNE_MIN_RARITY)) {
      ErrorMessage("#RuneDevour_LeftCardRarityNotAllow");
      return;
    }
    if (slot === "right" && rune?.locked === true) {
      ErrorMessage("#RuneDevour_LockedRuneNotAllow");
      return;
    }
    if (slot === "right" && isRuneEquipped(rune)) {
      ErrorMessage(EQUIPPED_RUNE_DEVOUR_MESSAGE);
      return;
    }
    setSelectedRuneID(runeID);
    if (slot === "left") {
      setDevourLeftRuneID(runeID);
      if (devourRightRuneID() === runeID) {
        setDevourRightRuneID(undefined);
      }
      return;
    }
    setDevourRightRuneID(runeID);
    if (devourLeftRuneID() === runeID) {
      setDevourLeftRuneID(undefined);
    }
  };
  const handleDevourRuneActivate = runeID => {
    if (requesting() || devourPreviewing()) {
      ErrorMessage("#RuneDevour_PreviewBlockSelect");
      return;
    }
    const rune = runeMap()[runeID];
    if (rune == undefined) {
      return;
    }
    if (rune.rarity < CHAOS_RUNE_MIN_RARITY) {
      setDevourRuneSlot("right", runeID);
      return;
    }
    if (devourLeftRuneID() === runeID) {
      return;
    }
    setDevourRuneSlot(devourLeftRuneID() == undefined ? "left" : "right", runeID);
  };
  const handleRuneActivate = runeID => {
    if (menuName() === "RuneDevour_Menu") {
      handleDevourRuneActivate(runeID);
      return;
    }
    if (menuName() === "RuneInlay_Menu") {
      handleInlayRuneSelect(runeID);
      return;
    }
    setSelectedRuneID(runeID);
    if (menuName() === "RuneBreak_Menu") {
      addItemToBreakSlot(runeID);
      return;
    }
  };
  const handleEngravingActivate = engravingID => {
    if (menuName() === "RuneInlay_Menu") {
      handleInlayEngravingSelect(engravingID);
      return;
    }
    setSelectedEngravingID(engravingID);
    if (menuName() === "RuneBreak_Menu" && bagType() === "engraving") {
      addItemToBreakSlot(engravingID);
    }
  };
  const handleDevourDrop = (slot, runeID) => {
    if (requesting() || devourPreviewing() || runeID <= 0) {
      return;
    }
    setDevourRuneSlot(slot, runeID);
  };
  const handleDevourRemove = slot => {
    if (requesting() || devourPreviewing()) {
      return;
    }
    setDevourRuneSlot(slot, undefined);
  };
  const handleInlayRuneSelect = runeID => {
    if (requesting() || inlayPreviewing()) {
      if (inlayPreviewing()) {
        ErrorMessage(GetLocalization("#RuneInlay_PreviewBlockSelect"));
      }
      return;
    }
    const rune = runeMap()[runeID];
    if (rune == undefined) {
      return;
    }
    if (rune.rarity < CHAOS_RUNE_MIN_RARITY) {
      ErrorMessage(GetLocalization("#RuneInlay_RuneRarityNotAllow"));
      return;
    }
    if (inlayRuneID() === runeID) {
      return;
    }
    libs.batch(() => {
      setInlayRuneID(runeID);
      if ((rune.inlay_engravings_data?.length ?? 0) === 0) {
        setInlayEngravingID(undefined);
      }
    });
  };
  const handleInlayEngravingSelect = engravingID => {
    if (requesting() || inlayPreviewing() || engravingMap()[engravingID] == undefined) {
      if (inlayPreviewing()) {
        ErrorMessage(GetLocalization("#RuneInlay_PreviewBlockSelect"));
      }
      return;
    }
    const rune = inlayRune();
    if (rune == undefined || (rune.inlay_engravings_data?.length ?? 0) === 0) {
      ErrorMessage(GetLocalization("#RuneInlay_RuneNotPunched"));
      return;
    }
    setInlayEngravingID(engravingID);
  };
  const handleInlayRuneRemove = () => {
    if (requesting() || inlayPreviewing()) {
      return;
    }
    libs.batch(() => {
      setInlayRuneID(undefined);
      setInlayEngravingID(undefined);
    });
  };
  const handleInlayEngravingRemove = () => {
    if (!requesting() && !inlayPreviewing()) {
      setInlayEngravingID(undefined);
    }
  };
  const callEquipRune = (position, runeID) => {
    CallAction("/v1/hero/equip_rune", {
      hero_id: position.heroID,
      suit_id: position.planID,
      skill_id: position.skillID,
      slot_id: position.slotID,
      rune_id: runeID
    });
  };
  const findRuneEquipPositions = (runeID, heroID, planID) => {
    const result = [];
    for (const [rawHeroID, planList] of Object.entries(player_hero_rune_equip_suits())) {
      const normalizedHeroID = Number(rawHeroID);
      if (heroID != undefined && normalizedHeroID !== heroID) {
        continue;
      }
      for (const [rawPlanID, skillList] of Object.entries(planList)) {
        const normalizedPlanID = Number(rawPlanID);
        if (planID != undefined && normalizedPlanID !== planID) {
          continue;
        }
        for (const [rawSkillID, slotList] of Object.entries(skillList)) {
          for (const [rawSlotID, equippedRuneID] of Object.entries(slotList)) {
            if (Number(equippedRuneID) !== runeID) {
              continue;
            }
            result.push({
              heroID: normalizedHeroID,
              planID: normalizedPlanID,
              skillID: Number(rawSkillID),
              slotID: Number(rawSlotID)
            });
          }
        }
      }
    }
    return result;
  };
  const buildEmbedContextMenus = runeID => {
    const menus = {};
    const context = runeEmbedContext();
    if (!context || requesting()) {
      return menus;
    }
    const currentPositions = findRuneEquipPositions(runeID, context.heroID, context.planID);
    const emptySlot = context.slots.find(slot => slot.locked !== true && slot.isEmpty === true);
    if (emptySlot && currentPositions.length === 0) {
      menus["RuneItem_OptEquip"] = () => {
        context.equipRune(emptySlot.slotID, runeID);
      };
    }
    if (currentPositions.length > 0) {
      menus["RuneItem_OptUnequip"] = () => {
        callEquipRune(currentPositions[0], 0);
      };
    }
    const allPositions = findRuneEquipPositions(runeID);
    if (allPositions.length > 0) {
      menus["RuneItem_OptUnequipAll"] = () => {
        for (const position of allPositions) {
          callEquipRune(position, 0);
        }
      };
    }
    return menus;
  };
  const buildDevourContextMenus = runeID => {
    const menus = {};
    if (requesting() || devourPreviewing()) {
      return menus;
    }
    if (devourLeftRuneID() === runeID) {
      menus["RuneItem_OptTakeLeft"] = () => {
        setDevourRuneSlot("left", undefined);
      };
    } else {
      menus["RuneItem_OptPutLeft"] = () => {
        setDevourRuneSlot("left", runeID);
      };
    }
    if (devourRightRuneID() === runeID) {
      menus["RuneItem_OptTakeRight"] = () => {
        setDevourRuneSlot("right", undefined);
      };
    } else if (!isRuneEquipped(runeMap()[runeID])) {
      menus["RuneItem_OptPutRight"] = () => {
        setDevourRuneSlot("right", runeID);
      };
    }
    return menus;
  };
  const buildBreakContextMenus = itemID => {
    const menus = {};
    if (requesting()) {
      return menus;
    }
    if (breakItemIDs().includes(itemID)) {
      menus["RuneItem_OptTakeOut"] = () => {
        removeItemFromBreakSlots(itemID);
      };
    } else {
      menus["RuneItem_OptPutIn"] = () => {
        if (bagType() === "rune") {
          setSelectedRuneID(itemID);
        } else {
          setSelectedEngravingID(itemID);
        }
        addItemToBreakSlot(itemID);
      };
    }
    return menus;
  };
  const buildInlayRuneContextMenus = runeID => {
    const menus = {};
    if (requesting() || inlayPreviewing()) {
      return menus;
    }
    if (inlayRuneID() === runeID) {
      menus["RuneItem_OptTakeOut"] = handleInlayRuneRemove;
    } else {
      menus["RuneItem_OptPutIn"] = () => {
        handleInlayRuneSelect(runeID);
      };
    }
    return menus;
  };
  const buildInlayEngravingContextMenus = engravingID => {
    const menus = {};
    if (requesting() || inlayPreviewing()) {
      return menus;
    }
    if (inlayEngravingID() === engravingID) {
      menus["RuneItem_OptTakeOut"] = handleInlayEngravingRemove;
    } else {
      menus["RuneItem_OptPutIn"] = () => {
        handleInlayEngravingSelect(engravingID);
      };
    }
    return menus;
  };
  const buildRuneContextMenus = runeID => {
    const rune = runeMap()[runeID];
    if (!rune) {
      return {};
    }
    const menus = {};
    menus[rune.locked === true ? "RuneItem_OptUnlock" : "RuneItem_OptLock"] = () => {
      handleRuneLock(runeID, rune.locked !== true);
    };
    Object.assign(menus, (() => {
      if (menuName() === "RuneEmbed_Menu") {
        return buildEmbedContextMenus(runeID);
      }
      if (menuName() === "RuneDevour_Menu") {
        return buildDevourContextMenus(runeID);
      }
      if (menuName() === "RuneBreak_Menu") {
        return buildBreakContextMenus(runeID);
      }
      if (menuName() === "RuneInlay_Menu") {
        return buildInlayRuneContextMenus(runeID);
      }
      return {};
    })());
    return menus;
  };
  const handleRuneContextMenu = (panel, runeID) => {
    const menus = buildRuneContextMenus(runeID);
    if (Object.keys(menus).length > 0) {
      CustomUIConfig.showContextMenu(panel, menus);
    }
  };
  const buildEngravingContextMenus = engravingID => {
    const engraving = engravingMap()[engravingID];
    if (!engraving) {
      return {};
    }
    const menus = {
      [engraving.locked === true ? "RuneItem_OptUnlock" : "RuneItem_OptLock"]: () => {
        handleEngravingLock(engravingID, engraving.locked !== true);
      }
    };
    if (menuName() === "RuneBreak_Menu" && bagType() === "engraving") {
      Object.assign(menus, buildBreakContextMenus(engravingID));
    }
    if (menuName() === "RuneInlay_Menu" && bagType() === "engraving") {
      Object.assign(menus, buildInlayEngravingContextMenus(engravingID));
    }
    return menus;
  };
  const handleEngravingContextMenu = (panel, engravingID) => {
    const menus = buildEngravingContextMenus(engravingID);
    if (Object.keys(menus).length > 0) {
      CustomUIConfig.showContextMenu(panel, menus);
    }
  };
  const handleSelectedBagItemLock = () => {
    if (bagType() === "rune") {
      const rune = selectedRune();
      if (rune != undefined) {
        handleRuneLock(rune.id, rune.locked !== true);
      }
      return;
    }
    const engraving = selectedEngraving();
    if (engraving != undefined) {
      handleEngravingLock(engraving.id, engraving.locked !== true);
    }
  };
  const resetDevourSelection = () => {
    setDevourRightRuneID(undefined);
    setSelectedRuneID(undefined);
    setDevourPreviewing(false);
    clearDragState();
  };
  const finishInlayPreview = () => {
    setInlayEngravingID(undefined);
    setInlayPreviewing(false);
    clearDragState();
  };
  libs.createEffect(libs.on(menuName, name => {
    libs.batch(() => {
      setSelectedBreakSlot(-1);
      setBreakItemIDs([]);
      setShowBreakAttrInfo(name === "RuneBreak_Menu");
      if (name !== "RuneEmbed_Menu") {
        setRuneEmbedContext(undefined);
      }
      if (name !== "RuneInlay_Menu") {
        setInlayRuneID(undefined);
        setInlayEngravingID(undefined);
        setInlayPreviewing(false);
      }
    });
  }));
  libs.createEffect(libs.on(jumpInfo, info => {
    if (info?.menu !== "RuneBreak_Menu" || info.data?.bagType !== "rune" || bagType() === "rune") {
      return;
    }
    handleBagTypeChange("rune");
  }));
  let queryEquipment = false;
  libs.createEffect(() => {
    if (show() && !queryEquipment) {
      queryEquipment = true;
      CallAction("/v1/equip/fetch_all", {
        only_equipped: false
      });
    }
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "RuneRoot",
    name: "MenuButton_rune",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(Player.CurrencyGroup, {
        currencyType: "top",
        tokens: [120015]
      }), libs.createComponent(LayoutMenu, {}), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
        id: "RuneContent",
        get topbarChildren() {
          return (() => {
            const _el$36 = libs.createElement("Panel", {
                id: "BGRoot",
                get ["class"]() {
                  return menuName() == "RuneDevour_Menu" ? "DevourPage" : "EmbedPage";
                },
                hittest: false
              }, null);
              libs.createElement("Panel", {
                id: "CustomTopBottomBG",
                hittest: false
              }, _el$36);
            libs.effect(_$p => libs.setProp(_el$36, "class", menuName() == "RuneDevour_Menu" ? "DevourPage" : "EmbedPage", _$p));
            return _el$36;
          })();
        },
        get children() {
          const _el$28 = libs.createElement("Panel", {
            id: "RuneContentMain"
          }, null);
          libs.insert(_el$28, libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return menuName() == "RuneEmbed_Menu";
                },
                get children() {
                  return libs.createComponent(RuneEmbed, {
                    abilityDisplayMappings: abilityDisplayMappings,
                    requesting: requesting,
                    setRequesting: setRequesting,
                    setPeekedRuneIDs: setPeekedRuneIDs,
                    dragHoverSlotKey: dragHoverSlotKey,
                    setDragHoverSlotKey: setDragHoverSlotKey,
                    clearDragState: clearDragState,
                    onContextChange: setRuneEmbedContext
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return menuName() == "RuneDevour_Menu";
                },
                get children() {
                  return libs.createComponent(RuneDevour, {
                    get leftRune() {
                      return devourLeftRune();
                    },
                    get rightRune() {
                      return devourRightRune();
                    },
                    requesting: requesting,
                    setRequesting: setRequesting,
                    onDropRune: handleDevourDrop,
                    onRemoveRune: handleDevourRemove,
                    onPreviewingChange: setDevourPreviewing,
                    onResetSelection: resetDevourSelection
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return menuName() == "RuneBreak_Menu";
                },
                get children() {
                  return libs.createComponent(RuneBreak, {
                    breakType: bagType,
                    selectedBreakSlot: selectedBreakSlot,
                    breakItems: breakItems,
                    currentLevel: () => runeBreakLevel().level,
                    currentExp: () => runeBreakLevel().extra_exp,
                    requesting: requesting,
                    onSelectBreakSlot: handleSelectBreakSlot,
                    onClearBreakSlot: handleClearBreakSlot,
                    onDropItem: handleDropBreakItem,
                    onShowBreakAttrs: handleShowBreakAttrs,
                    onToggleBreakAttrs: handleToggleBreakAttrs,
                    onChangeBreakType: handleBagTypeChange,
                    onFastAdd: handleFastAddBreakItems,
                    onConfirm: handleConfirmBreakItems
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return menuName() == "RuneInlay_Menu";
                },
                get children() {
                  return libs.createComponent(RuneInlayRoot, {
                    get rune() {
                      return inlayRune();
                    },
                    get engraving() {
                      return inlayEngraving();
                    },
                    get requesting() {
                      return requesting();
                    },
                    setRequesting: setRequesting,
                    onDropRune: handleInlayRuneSelect,
                    onDropEngraving: handleInlayEngravingSelect,
                    onRemoveRune: handleInlayRuneRemove,
                    onRemoveEngraving: handleInlayEngravingRemove,
                    onPreviewingChange: setInlayPreviewing,
                    onPreviewFinished: finishInlayPreview
                  });
                }
              })];
            }
          }), null);
          libs.insert(_el$28, libs.createComponent(libs.Show, {
            get when() {
              return rightShowAttrInfo();
            },
            get children() {
              return libs.createComponent(RuneBreakAttributeInfo, {
                currentLevel: () => runeBreakLevel().level
              });
            }
          }), null);
          libs.insert(_el$28, libs.createComponent(libs.Show, {
            get when() {
              return !rightShowAttrInfo();
            },
            get children() {
              const _el$29 = libs.createElement("Panel", {
                  id: "RuneBagRoot",
                  "class": "RuneRightBag"
                }, null),
                _el$30 = libs.createElement("Panel", {
                  id: "RuneBagContent"
                }, _el$29),
                _el$31 = libs.createElement("Panel", {
                  id: "RuneBagLeftArea"
                }, _el$30),
                _el$34 = libs.createElement("Panel", {
                  id: "RuneBottomContainer"
                }, _el$29),
                _el$35 = libs.createElement("Button", {
                  id: "ResetBtn",
                  "class": "SecondaryButtonStates"
                }, _el$34);
              libs.insert(_el$31, libs.createComponent(libs.Show, {
                get when() {
                  return showFilter();
                },
                get children() {
                  return [libs.createComponent(libs.Show, {
                    get when() {
                      return bagType() === "rune";
                    },
                    get children() {
                      return libs.createComponent(RuneFilterWindow, {});
                    }
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return bagType() === "engraving";
                    },
                    get children() {
                      return libs.createComponent(EngravingFilterWindow, {});
                    }
                  })];
                }
              }), null);
              libs.insert(_el$31, libs.createComponent(libs.Show, {
                get when() {
                  return !showFilter();
                },
                get children() {
                  return [(() => {
                    const _el$32 = libs.createElement("Panel", {
                      id: "RuneBagTabs"
                    }, null);
                    libs.insert(_el$32, libs.createComponent(RuneBagTabButton, {
                      get ["class"]() {
                        return libs.classNames({
                          Full: isRuneBagFull()
                        });
                      },
                      iconClass: "RuneTabIcon",
                      get text() {
                        return GetLocalization("#MenuTabButton_Rune");
                      },
                      get secondaryText() {
                        return `${runeBagCount()}/${RUNE_BAG_MAX_CAPACITY}`;
                      },
                      get selected() {
                        return bagType() === "rune";
                      },
                      onactivate: () => handleBagTypeChange("rune"),
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return hasUnreadRune();
                          },
                          get children() {
                            return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                              "class": "BagTabRedMark",
                              hittest: false
                            });
                          }
                        });
                      }
                    }), null);
                    libs.insert(_el$32, libs.createComponent(RuneBagTabButton, {
                      iconClass: "EngravingTabIcon",
                      get text() {
                        return GetLocalization("#MenuTabButton_Engraving");
                      },
                      get secondaryText() {
                        return `${engravingBagCount()}/${ENGRAVING_BAG_MAX_CAPACITY}`;
                      },
                      get locked() {
                        return isEngravingBagLocked();
                      },
                      get selected() {
                        return bagType() === "engraving";
                      },
                      onactivate: () => handleBagTypeChange("engraving"),
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return libs.memo(() => !!!isEngravingBagLocked())() && hasUnreadEngraving();
                          },
                          get children() {
                            return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                              "class": "BagTabRedMark",
                              hittest: false
                            });
                          }
                        });
                      }
                    }), null);
                    return _el$32;
                  })(), libs.createComponent(libs.Show, {
                    get when() {
                      return bagType() === "engraving";
                    },
                    get children() {
                      return libs.createComponent(RecycleView.RecycleView, {
                        id: "EngravingBagItemList",
                        input: filteredEngravings,
                        direction: "VerticalGrid",
                        wheelStep: 88,
                        childConfig: {
                          width: 88,
                          height: 88,
                          margin: 2
                        },
                        grid_children: () => libs.createElement("Panel", {
                          "class": "EngravingBagListGrid"
                        }, null),
                        children: data => {
                          const engraving = data;
                          const isDragging = () => draggingEngravingID() === engraving().id;
                          return (() => {
                            const _el$39 = libs.createElement("Panel", {
                                get ["class"]() {
                                  return libs.classNames(`EngravingBagItem Class${engraving().class}`, {
                                    Selected: selectedEngravingIDMap()[engraving().id] === true,
                                    RedPoint: isEngravingNew(engraving().id),
                                    Locked: engraving().locked === true
                                  });
                                }
                              }, null),
                              _el$40 = libs.createElement("Panel", {
                                get ["class"]() {
                                  return libs.classNames(`EngravingBagItemIconRoot Rarity${engraving().rarity}`, {
                                    Dragging: isDragging(),
                                    Requesting: requesting()
                                  });
                                }
                              }, _el$39),
                              _el$41 = libs.createElement("Image", {
                                "class": "EngravingBagItemIcon",
                                get src() {
                                  return server_rune_utils.getEngravingIconPath(engraving());
                                }
                              }, _el$40);
                              libs.createElement("Panel", {
                                "class": "SelectedBorder"
                              }, _el$39);
                              libs.createElement("Panel", {
                                "class": "RuneNewRedPoint"
                              }, _el$39);
                              libs.createElement("Panel", {
                                "class": "RuenLocked"
                              }, _el$39);
                            libs.setProp(_el$39, "onmouseover", panel => {
                              markEngravingRead(engraving().id);
                              server_rune_utils.ShowServerEngravingTooltip(panel, {
                                id1: engraving().id
                              });
                            });
                            libs.setProp(_el$39, "onmouseout", panel => HideCustomTooltip(panel, "server_engraving"));
                            libs.setProp(_el$39, "onmouseactivate", () => handleEngravingActivate(engraving().id));
                            libs.setProp(_el$39, "onDragStart", (panel, dragCallbacks) => {
                              const isBreakDrag = menuName() === "RuneBreak_Menu" && bagType() === "engraving";
                              const isInlayDrag = menuName() === "RuneInlay_Menu" && bagType() === "engraving";
                              if (!isBreakDrag && !isInlayDrag || requesting() || isInlayDrag && inlayPreviewing()) {
                                if (isInlayDrag && inlayPreviewing()) {
                                  ErrorMessage(GetLocalization("#RuneInlay_PreviewBlockSelect"));
                                }
                                return false;
                              }
                              if (isBreakDrag && !canBreakEngraving(engraving())) {
                                return false;
                              }
                              setDraggingEngravingID(engraving().id);
                              const dragPanel = $.CreatePanel("Panel", $.GetContextPanel(), "engravingDragImage");
                              libs.render(() => (() => {
                                const _el$45 = libs.createElement("Panel", {
                                    "class": "RuneDragPreview"
                                  }, null),
                                  _el$46 = libs.createElement("Panel", {
                                    get ["class"]() {
                                      return `EngravingBagItemIconRoot Rarity${engraving().rarity}`;
                                    }
                                  }, _el$45),
                                  _el$47 = libs.createElement("Image", {
                                    "class": "EngravingBagItemIcon",
                                    get src() {
                                      return server_rune_utils.getEngravingIconPath(engraving());
                                    }
                                  }, _el$46);
                                libs.effect(_p$ => {
                                  const _v$9 = `EngravingBagItemIconRoot Rarity${engraving().rarity}`,
                                    _v$0 = server_rune_utils.getEngravingIconPath(engraving());
                                  _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$46, "class", _v$9, _p$._v$9));
                                  _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$47, "src", _v$0, _p$._v$0));
                                  return _p$;
                                }, {
                                  _v$9: undefined,
                                  _v$0: undefined
                                });
                                return _el$45;
                              })(), dragPanel);
                              dragCallbacks.displayPanel = dragPanel;
                              const position = GameUI.GetCursorPosition();
                              if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
                                dragCallbacks.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
                                dragCallbacks.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
                              }
                              panel.AddClass("dragging_from");
                              SaveData(dragPanel, "engraving", engraving().id);
                              $.GetContextPanel().AddClass("Rune_Dragging");
                              return true;
                            });
                            libs.setProp(_el$39, "onDragEnd", (panel, draggedPanel) => {
                              if (draggedPanel !== undefined && draggedPanel.IsValid()) {
                                draggedPanel.DeleteAsync(-1);
                              }
                              panel.RemoveClass("dragging_from");
                              $.GetContextPanel().RemoveClass("Rune_Dragging");
                              clearDragState();
                            });
                            libs.setProp(_el$39, "oncontextmenu", panel => handleEngravingContextMenu(panel, engraving().id));
                            libs.effect(_p$ => {
                              const _v$6 = libs.classNames(`EngravingBagItem Class${engraving().class}`, {
                                  Selected: selectedEngravingIDMap()[engraving().id] === true,
                                  RedPoint: isEngravingNew(engraving().id),
                                  Locked: engraving().locked === true
                                }),
                                _v$7 = libs.classNames(`EngravingBagItemIconRoot Rarity${engraving().rarity}`, {
                                  Dragging: isDragging(),
                                  Requesting: requesting()
                                }),
                                _v$8 = server_rune_utils.getEngravingIconPath(engraving());
                              _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$39, "class", _v$6, _p$._v$6));
                              _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$40, "class", _v$7, _p$._v$7));
                              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$41, "src", _v$8, _p$._v$8));
                              return _p$;
                            }, {
                              _v$6: undefined,
                              _v$7: undefined,
                              _v$8: undefined
                            });
                            return _el$39;
                          })();
                        }
                      });
                    }
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return bagType() === "rune";
                    },
                    get children() {
                      return libs.createComponent(RecycleView.RecycleView, {
                        id: "RuneBagItemList",
                        input: filteredRunes,
                        direction: "VerticalGrid",
                        wheelStep: 88,
                        childConfig: {
                          width: 88,
                          height: 88,
                          margin: 2
                        },
                        grid_children: () => libs.createElement("Panel", {
                          "class": "RuneBagListGrid"
                        }, null),
                        children: data => {
                          const rune = data;
                          const isDragging = () => draggingRuneID() === rune().id;
                          const isPeeked = () => peekedRuneIDMap()[rune().id] === true;
                          const isSelectionBlocked = () => {
                            return menuName() === "RuneDevour_Menu" && (requesting() || devourPreviewing()) || menuName() === "RuneInlay_Menu" && (requesting() || inlayPreviewing());
                          };
                          const showSelectionBlockedMessage = () => {
                            const token = menuName() === "RuneInlay_Menu" ? "#RuneInlay_PreviewBlockSelect" : "#RuneDevour_PreviewBlockSelect";
                            ErrorMessage(GetLocalization(token));
                          };
                          const isLocked = () => rune().locked === true;
                          return (() => {
                            const _el$49 = libs.createElement("Panel", {
                                get ["class"]() {
                                  return libs.classNames("RuneBagItem", {
                                    Selected: selectedRuneIDMap()[rune().id] === true,
                                    Peeked: isPeeked(),
                                    RedPoint: isRuneNew(rune().id),
                                    Locked: isLocked()
                                  });
                                }
                              }, null),
                              _el$50 = libs.createElement("Panel", {
                                get ["class"]() {
                                  return libs.classNames(`RuneBagItemIconRoot Rarity${rune().rarity}`, {
                                    Dragging: isDragging(),
                                    Requesting: requesting()
                                  });
                                }
                              }, _el$49),
                              _el$51 = libs.createElement("Image", {
                                "class": "RuneBagItemIcon",
                                get src() {
                                  return rune_data.getRuneIconPath(rune());
                                }
                              }, _el$50);
                              libs.createElement("Image", {
                                "class": "RunePeekIcon"
                              }, _el$49);
                              libs.createElement("Panel", {
                                "class": "SelectedBorder"
                              }, _el$49);
                              libs.createElement("Panel", {
                                "class": "RuneNewRedPoint"
                              }, _el$49);
                              libs.createElement("Panel", {
                                "class": "RuenLocked"
                              }, _el$49);
                            libs.setProp(_el$49, "onmouseover", panel => {
                              markRuneRead(rune().id);
                              server_rune_utils.ShowServerRuneTooltip(panel, {
                                id1: rune().id
                              });
                            });
                            libs.setProp(_el$49, "onmouseout", panel => HideCustomTooltip(panel, "server_rune"));
                            libs.setProp(_el$49, "onmouseactivate", () => {
                              if (isSelectionBlocked()) {
                                showSelectionBlockedMessage();
                                return;
                              }
                              handleRuneActivate(rune().id);
                            });
                            libs.setProp(_el$49, "onDragStart", (panel, dragCallbacks) => {
                              if (requesting()) {
                                return false;
                              }
                              if (isSelectionBlocked()) {
                                showSelectionBlockedMessage();
                                return false;
                              }
                              const runeData = rune();
                              setDraggingRuneID(runeData.id);
                              const dragPanel = $.CreatePanel("Panel", $.GetContextPanel(), "runeDragImage");
                              const dispose = libs.render(() => (() => {
                                const _el$56 = libs.createElement("Panel", {
                                    "class": "RuneDragPreview"
                                  }, null),
                                  _el$57 = libs.createElement("Panel", {
                                    get ["class"]() {
                                      return `RuneBagItemIconRoot Rarity${runeData.rarity}`;
                                    }
                                  }, _el$56),
                                  _el$58 = libs.createElement("Image", {
                                    "class": "RuneBagItemIcon",
                                    get src() {
                                      return rune_data.getRuneIconPath(runeData);
                                    }
                                  }, _el$57);
                                libs.effect(_p$ => {
                                  const _v$12 = `RuneBagItemIconRoot Rarity${runeData.rarity}`,
                                    _v$13 = rune_data.getRuneIconPath(runeData);
                                  _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$57, "class", _v$12, _p$._v$12));
                                  _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$58, "src", _v$13, _p$._v$13));
                                  return _p$;
                                }, {
                                  _v$12: undefined,
                                  _v$13: undefined
                                });
                                return _el$56;
                              })(), dragPanel);
                              SaveData(dragPanel, "_SOLIDJS_DISPOSE_", dispose);
                              dragCallbacks.displayPanel = dragPanel;
                              const position = GameUI.GetCursorPosition();
                              if (dragCallbacks.offsetX == undefined || dragCallbacks.offsetY == undefined) {
                                dragCallbacks.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
                                dragCallbacks.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
                              }
                              panel.AddClass("dragging_from");
                              SaveData(dragPanel, "rune", runeData.id);
                              $.GetContextPanel().AddClass("Rune_Dragging");
                              return true;
                            });
                            libs.setProp(_el$49, "onDragEnd", (panel, draggedPanel) => {
                              if (draggedPanel !== undefined && draggedPanel.IsValid()) {
                                const dispose = LoadData(draggedPanel, "_SOLIDJS_DISPOSE_");
                                dispose?.();
                                SaveData(draggedPanel, "_SOLIDJS_DISPOSE_", undefined);
                                draggedPanel.DeleteAsync(-1);
                              }
                              panel.RemoveClass("dragging_from");
                              $.GetContextPanel().RemoveClass("Rune_Dragging");
                              clearDragState();
                            });
                            libs.setProp(_el$49, "oncontextmenu", panel => handleRuneContextMenu(panel, rune().id));
                            libs.insert(_el$50, libs.createComponent(rune_components.RuneEngravingSlots, {
                              get slots() {
                                return rune().inlay_engravings_data;
                              }
                            }), null);
                            libs.effect(_p$ => {
                              const _v$1 = libs.classNames("RuneBagItem", {
                                  Selected: selectedRuneIDMap()[rune().id] === true,
                                  Peeked: isPeeked(),
                                  RedPoint: isRuneNew(rune().id),
                                  Locked: isLocked()
                                }),
                                _v$10 = libs.classNames(`RuneBagItemIconRoot Rarity${rune().rarity}`, {
                                  Dragging: isDragging(),
                                  Requesting: requesting()
                                }),
                                _v$11 = rune_data.getRuneIconPath(rune());
                              _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$49, "class", _v$1, _p$._v$1));
                              _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$50, "class", _v$10, _p$._v$10));
                              _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$51, "src", _v$11, _p$._v$11));
                              return _p$;
                            }, {
                              _v$1: undefined,
                              _v$10: undefined,
                              _v$11: undefined
                            });
                            return _el$49;
                          })();
                        }
                      });
                    }
                  })];
                }
              }), null);
              libs.insert(_el$30, libs.createComponent(libs.Show, {
                get when() {
                  return bagType() === "rune";
                },
                get children() {
                  const _el$33 = libs.createElement("Panel", {
                    id: "RuneBagFilter"
                  }, null);
                  libs.insert(_el$33, libs.createComponent(libs.For, {
                    get each() {
                      return filterTabs();
                    },
                    children: filter => {
                      return (() => {
                        const _el$59 = libs.createElement("Button", {
                            get ["class"]() {
                              return libs.classNames("RuneBagFilterTab", {
                                Selected: suitFilter() === filter
                              });
                            }
                          }, null),
                          _el$60 = libs.createElement("Image", {
                            "class": "RuneBagFilterIcon",
                            get src() {
                              return filterIcon(filter);
                            }
                          }, _el$59);
                        libs.setProp(_el$59, "onactivate", () => setSuitFilter(filter));
                        libs.effect(_p$ => {
                          const _v$14 = libs.classNames("RuneBagFilterTab", {
                              Selected: suitFilter() === filter
                            }),
                            _v$15 = filterIcon(filter);
                          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$59, "class", _v$14, _p$._v$14));
                          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$60, "src", _v$15, _p$._v$15));
                          return _p$;
                        }, {
                          _v$14: undefined,
                          _v$15: undefined
                        });
                        return _el$59;
                      })();
                    }
                  }));
                  return _el$33;
                }
              }), null);
              libs.insert(_el$34, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
                id: "FilterBtn",
                get ["class"]() {
                  return libs.classNames({
                    ShowBtnBorder: showFilter()
                  });
                },
                get text() {
                  return GetLocalization("#Hud_Equipment_Filter");
                },
                onactivate: () => {
                  setShowFilter(prev => !prev);
                }
              }), _el$35);
              libs.setProp(_el$35, "onactivate", handleResetFilter);
              libs.insert(_el$34, libs.createComponent(equipment_comp.EquipmentCommonBtn, {
                id: "RuneLockBtn",
                get text() {
                  return GetLocalization(selectedBagItemLocked() ? "#RuneItem_OptUnlock" : "#RuneItem_OptLock");
                },
                get enabled() {
                  return selectedBagItem() !== undefined;
                },
                onactivate: handleSelectedBagItemLock
              }), null);
              return _el$29;
            }
          }), null);
          return _el$28;
        }
      })];
    }
  });
}
function HudRune() {
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(RunePage, {});
    }
  });
}
libs.render(() => libs.createComponent(HudRune, {}), $.GetContextPanel());