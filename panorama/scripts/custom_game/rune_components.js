--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('rune_components', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');
var server_rune_utils = require('./server_rune_utils.js');
var rune_data = require('./rune_data.js');

const RuneAbilityItem = props => {
  const [local, other] = libs.splitProps(props, ["class", "abilityName", "activeDots"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("RuneAbilityItem", local.class);
        }
      }), null),
      _el$2 = libs.createElement("Panel", {
        "class": "RuneAbilityIconRoot",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        "class": "RuneAbilitySelectedFrame",
        hittest: false
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        "class": "RuneAbilitySlotPreview",
        hittest: false
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneAbilityItem", local.class);
      },
      get classList() {
        return {
          Empty: local.abilityName == undefined
        };
      },
      get customTooltip() {
        return {
          name: "hero_ability",
          abilityName: local.abilityName
        };
      }
    }), true);
    libs.insert(_el$2, (() => {
      const _c$ = libs.memo(() => local.abilityName != undefined);
      return () => _c$() ? (() => {
        const _el$5 = libs.createElement("DOTAAbilityImage", {
          "class": "RuneAbilityIcon",
          get abilityname() {
            return local.abilityName;
          },
          showtooltip: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$5, "abilityname", local.abilityName, _$p));
        return _el$5;
      })() : libs.createElement("Panel", {
        "class": "RuneAbilityIcon"
      }, null);
    })(), _el$3);
    libs.insert(_el$4, libs.createComponent(libs.For, {
      get each() {
        return local.activeDots ?? [];
      },
      children: active => {
        return (() => {
          const _el$7 = libs.createElement("Image", {}, null);
          libs.setProp(_el$7, "classList", {
            RuneAbilitySlotPreviewIcon: true,
            Active: active === true
          });
          return _el$7;
        })();
      }
    }));
    return _el$;
  })();
};
const RuneEngravingSlots = props => {
  return libs.createComponent(libs.Show, {
    get when() {
      return (props.slots?.length ?? 0) > 0;
    },
    get children() {
      const _el$8 = libs.createElement("Panel", {
        "class": "RuneEngravingSlots",
        hittest: false
      }, null);
      libs.insert(_el$8, libs.createComponent(libs.For, {
        get each() {
          return props.slots;
        },
        children: (slot, index) => (() => {
          const _el$9 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("RuneEngravingSlot", {
                First: index() === 0,
                EmptySlot: slot.engraving_item_id == undefined,
                FilledSlot: slot.engraving_item_id != undefined
              });
            },
            hittest: false
          }, null);
          libs.effect(_$p => libs.setProp(_el$9, "class", libs.classNames("RuneEngravingSlot", {
            First: index() === 0,
            EmptySlot: slot.engraving_item_id == undefined,
            FilledSlot: slot.engraving_item_id != undefined
          }), _$p));
          return _el$9;
        })()
      }));
      return _el$8;
    }
  });
};
const RuneSlotItem = props => {
  const [local, other] = libs.splitProps(props, ["class", "runeID", "icon", "engravingSlots", "isEmpty", "locked", "tooltipEquippedSkillID", "costs", "onmouseover", "onmouseout"]);
  const callPanelEvent = (event, panel) => {
    if (typeof event === "function") {
      event(panel);
    }
  };
  const customTooltip = libs.createMemo(() => {
    if (local.runeID == undefined || local.isEmpty === true || local.locked === true) {
      return undefined;
    }
    return {
      name: "server_rune",
      id1: local.runeID
    };
  });
  return (() => {
    const _el$0 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("RuneSlotItem", local.class);
        }
      }), null),
      _el$1 = libs.createElement("Panel", {
        "class": "RuneSlotMainDisplay",
        hittest: false
      }, _el$0);
      libs.createElement("Image", {
        "class": "RuneSlotBG"
      }, _el$1);
      const _el$11 = libs.createElement("Image", {
        "class": "RuneSlotIcon",
        get src() {
          return local.icon;
        }
      }, _el$1);
      libs.createElement("Panel", {
        "class": "RuneSlotSelectedFrame",
        hittest: false
      }, _el$1);
      libs.createElement("Image", {
        "class": "RuneSlotBorder",
        hittest: false
      }, _el$1);
      const _el$14 = libs.createElement("Panel", {
        "class": "RuneEngravingContent"
      }, _el$1);
      libs.createElement("Panel", {
        "class": "RuneEngravingContentBG"
      }, _el$14);
      libs.createElement("Panel", {
        "class": "RuneSlotAdd",
        hittest: false
      }, _el$1);
      libs.createElement("Panel", {
        "class": "RuneSlotLock",
        hittest: false
      }, _el$1);
      const _el$18 = libs.createElement("Panel", {
        "class": "RuneSlotUpgradeCost",
        hittest: false
      }, _el$0);
    libs.spread(_el$0, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneSlotItem", local.class);
      },
      get classList() {
        return {
          Empty: local.locked !== true && local.isEmpty === true,
          Locked: local.locked === true
        };
      },
      "onmouseover": panel => {
        callPanelEvent(local.onmouseover, panel);
        const tooltip = customTooltip();
        if (tooltip != undefined) {
          server_rune_utils.ShowServerRuneTooltip(panel, {
            id1: tooltip.id1,
            equippedSkillID: local.tooltipEquippedSkillID
          });
        }
      },
      "onmouseout": panel => {
        callPanelEvent(local.onmouseout, panel);
        if (customTooltip() != undefined) {
          HideCustomTooltip(panel, "server_rune");
        }
      }
    }), true);
    libs.insert(_el$14, libs.createComponent(RuneEngravingSlots, {
      get slots() {
        return local.engravingSlots;
      }
    }), null);
    libs.insert(_el$18, libs.createComponent(libs.For, {
      get each() {
        return local.costs ?? [];
      },
      children: cost => {
        return (() => {
          const _el$19 = libs.createElement("Panel", {
              "class": "RuneSlotUpgradeCostItem",
              hittest: false
            }, null),
            _el$20 = libs.createElement("Label", {
              "class": "RuneSlotUpgradeCostLabel",
              get text() {
                return cost.valueText;
              }
            }, _el$19);
          libs.insert(_el$19, libs.createComponent(Player.CurrencyIcon, {
            get tokenID() {
              return cost.itemID;
            }
          }), _el$20);
          libs.effect(_p$ => {
            const _v$3 = {
                Insufficient: cost.insufficient === true
              },
              _v$4 = cost.valueText;
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$20, "classList", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$20, "text", _v$4, _p$._v$4));
            return _p$;
          }, {
            _v$3: undefined,
            _v$4: undefined
          });
          return _el$19;
        })();
      }
    }));
    libs.effect(_p$ => {
      const _v$ = local.icon,
        _v$2 = (local.costs?.length ?? 0) > 0;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$11, "src", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$18, "visible", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$0;
  })();
};
const RuneSelectionBox = props => {
  const [local, other] = libs.splitProps(props, ["class", "checked"]);
  return (() => {
    const _el$21 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("RuneSelectionBox", local.class);
        },
        hittest: false
      }), null);
      libs.createElement("Panel", {
        "class": "RuneSelectionBoxTick",
        hittest: false
      }, _el$21);
    libs.spread(_el$21, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneSelectionBox", local.class);
      },
      get classList() {
        return {
          Selected: local.checked === true
        };
      },
      "hittest": false
    }), true);
    return _el$21;
  })();
};
const RuneBondItem = props => {
  const [local, other] = libs.splitProps(props, ["class", "suitKey", "currentPoint", "suitPoint", "useSuitStyle", "showTooltip"]);
  const suitName = libs.createMemo(() => local.suitKey == undefined ? "" : GetLocalization(`#RuneSuit_${local.suitKey}`));
  const icon = libs.createMemo(() => local.suitKey == undefined ? undefined : rune_data.getRuneSuitIconPath(local.suitKey));
  const label = libs.createMemo(() => `${suitName()}+${local.currentPoint ?? 0}`);
  const customTooltip = libs.createMemo(() => {
    if (local.showTooltip !== true || local.suitKey == undefined) {
      return undefined;
    }
    return {
      name: "rune_suit",
      suitKey: local.suitKey,
      currentPoint: local.currentPoint ?? 0,
      suitPoint: local.suitPoint ?? 0
    };
  });
  const suitEffectNeedPoints = libs.createMemo(() => {
    if (local.suitKey == undefined) {
      return [];
    }
    return Object.keys(KeyValues.rune_suit_effect[local.suitKey]?.points__effect ?? {}).map(point => toFiniteNumber(point, 0)).filter(point => point > 0).sort((a, b) => a - b);
  });
  const suitStyleLevel = libs.createMemo(() => {
    if (local.useSuitStyle !== true) {
      return undefined;
    }
    const [level1NeedPoint, level2NeedPoint] = suitEffectNeedPoints();
    if (level1NeedPoint == undefined) {
      return undefined;
    }
    const suitPoint = local.suitPoint ?? 0;
    if (level2NeedPoint != undefined && suitPoint >= level2NeedPoint) {
      return 2;
    }
    return suitPoint >= level1NeedPoint ? 1 : 0;
  });
  const suitLevel0 = libs.createMemo(() => suitStyleLevel() === 0);
  const suitLevel1 = libs.createMemo(() => suitStyleLevel() === 1);
  const suitLevel2 = libs.createMemo(() => suitStyleLevel() === 2);
  return (() => {
    const _el$23 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("RuneBondItem", local.class);
        }
      }), null),
      _el$24 = libs.createElement("Panel", {
        "class": "RuneBondContent",
        hittest: false
      }, _el$23),
      _el$25 = libs.createElement("Panel", {
        "class": "RuneBondIconRoot",
        hittest: false
      }, _el$24),
      _el$26 = libs.createElement("Image", {
        "class": "RuneBondIcon",
        get src() {
          return icon();
        }
      }, _el$25),
      _el$27 = libs.createElement("Image", {
        "class": "RuneBondSuitLevel2Icon",
        hittest: false
      }, _el$25),
      _el$28 = libs.createElement("Label", {
        "class": "RuneBondLabel",
        html: true,
        get text() {
          return label();
        }
      }, _el$24);
    libs.spread(_el$23, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneBondItem", local.class);
      },
      get classList() {
        return {
          SuitLevel0: suitLevel0(),
          SuitLevel1: suitLevel1(),
          SuitLevel2: suitLevel2()
        };
      },
      get customTooltip() {
        return customTooltip();
      }
    }), true);
    libs.effect(_p$ => {
      const _v$5 = icon(),
        _v$6 = suitLevel2(),
        _v$7 = label();
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$26, "src", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$27, "visible", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$28, "text", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$23;
  })();
};
const RuneAttributeRow = props => {
  const [local, other] = libs.splitProps(props, ["class", "attr_name_html", "attr_value_html", "entry_type", "color_name"]);
  return (() => {
    const _el$29 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("RuneAttributeRow", local.class);
        },
        hittest: false
      }), null);
      libs.createElement("Panel", {
        "class": "RuneAttributeRowPoint",
        hittest: false
      }, _el$29);
      const _el$31 = libs.createElement("Label", {
        "class": "RuneAttributeRowValue",
        get text() {
          return local.attr_value_html;
        },
        html: true,
        hittest: false
      }, _el$29),
      _el$32 = libs.createElement("Label", {
        "class": "RuneAttributeRowName",
        get text() {
          return local.attr_name_html;
        },
        html: true,
        hittest: false
      }, _el$29);
    libs.spread(_el$29, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneAttributeRow", local.class);
      },
      get classList() {
        return {
          Main: local.entry_type === "Main",
          Adverb: local.entry_type === "Adverb",
          gray: local.color_name === "gray",
          green: local.color_name === "green",
          blue: local.color_name === "blue",
          purple: local.color_name === "purple",
          yellow: local.color_name === "yellow",
          red: local.color_name === "red",
          pink: local.color_name === "pink"
        };
      },
      "hittest": false
    }), true);
    libs.effect(_p$ => {
      const _v$8 = local.attr_value_html,
        _v$9 = local.attr_name_html;
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$31, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$32, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$29;
  })();
};
const RuneDetailCardAttributeRow = props => {
  const interactive = () => props.interactionMode !== "none";
  return (() => {
    const _el$33 = libs.createElement("Panel", {
        "class": "RuneDetailCardAttributeRow"
      }, null),
      _el$34 = libs.createElement("Panel", {
        "class": "RuneDetailCardAttributeRowContent",
        hittest: false
      }, _el$33),
      _el$36 = libs.createElement("Panel", {
        "class": "RuneDetailCardEntryHighlightFrame",
        hittest: false
      }, _el$33);
    libs.setProp(_el$33, "onmouseactivate", () => {
      if (interactive()) {
        props.onActivate?.();
      }
    });
    libs.insert(_el$34, libs.createComponent(libs.Show, {
      get when() {
        return props.interactionMode === "lock";
      },
      get children() {
        const _el$35 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("RuneDetailCardAttributeLock", {
              SelectionLocked: props.locked === true,
              SelectionUnlocked: props.locked !== true
            });
          },
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$35, "class", libs.classNames("RuneDetailCardAttributeLock", {
          SelectionLocked: props.locked === true,
          SelectionUnlocked: props.locked !== true
        }), _$p));
        return _el$35;
      }
    }), null);
    libs.insert(_el$34, libs.createComponent(libs.Show, {
      get when() {
        return props.interactionMode === "select";
      },
      get children() {
        return libs.createComponent(RuneSelectionBox, {
          "class": "RuneDetailCardAttributeCheckBox",
          get checked() {
            return props.checked;
          }
        });
      }
    }), null);
    libs.insert(_el$34, libs.createComponent(RuneAttributeRow, {
      get attr_name_html() {
        return props.entry.nameHtml;
      },
      get attr_value_html() {
        return props.entry.valueText;
      },
      get entry_type() {
        return props.entry.entryType === 1 ? "Main" : "Adverb";
      },
      get color_name() {
        return props.entry.colorName;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$36, "visible", props.highlighted === true, _$p));
    return _el$33;
  })();
};
const RuneDetailCardSuitRow = props => {
  return (() => {
    const _el$37 = libs.createElement("Panel", {
        "class": "RuneDetailCardSuitRow"
      }, null),
      _el$38 = libs.createElement("Panel", {
        "class": "RuneDetailCardSuitRowContent",
        hittest: false
      }, _el$37),
      _el$39 = libs.createElement("Panel", {
        "class": "RuneDetailCardEntryHighlightFrame",
        hittest: false
      }, _el$37);
    libs.setProp(_el$37, "onmouseactivate", () => {
      if (props.selectable === true) {
        props.onActivate?.();
      }
    });
    libs.insert(_el$38, libs.createComponent(libs.Show, {
      get when() {
        return props.selectable === true;
      },
      get children() {
        return libs.createComponent(RuneSelectionBox, {
          "class": "RuneDetailCardSuitCheckBox",
          get checked() {
            return props.checked;
          }
        });
      }
    }), null);
    libs.insert(_el$38, libs.createComponent(RuneBondItem, {
      get suitKey() {
        return props.entry.suitKey;
      },
      get currentPoint() {
        return props.entry.currentPoint;
      },
      get suitPoint() {
        return props.entry.currentPoint;
      },
      showTooltip: true
    }), null);
    libs.effect(_p$ => {
      const _v$0 = {
          Selectable: props.selectable === true
        },
        _v$1 = props.highlighted === true;
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$37, "classList", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$39, "visible", _v$1, _p$._v$1));
      return _p$;
    }, {
      _v$0: undefined,
      _v$1: undefined
    });
    return _el$37;
  })();
};
const RuneDetailEngravingRow = props => {
  const [local, other] = libs.splitProps(props, ["class", "engraving", "shouldStrikethroughEntry"]);
  const isEmpty = () => local.engraving.engraving_item_id == undefined;
  const iconPath = libs.createMemo(() => server_rune_utils.getEngravingIconPathByItemID(local.engraving.engraving_item_id));
  const attributeDisplays = libs.createMemo(() => server_rune_utils.buildEngravingAttributeDisplays(local.engraving.adverb_entry_data));
  return (() => {
    const _el$40 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("RuneDetailEngravingRow", local.class);
        }
      }), null),
      _el$41 = libs.createElement("Panel", {
        "class": "RuneDetailEngravingSlot",
        hittest: false
      }, _el$40);
      libs.createElement("Image", {
        "class": "RuneDetailEngravingSlotBG",
        hittest: false
      }, _el$41);
    libs.spread(_el$40, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneDetailEngravingRow", local.class);
      }
    }), true);
    libs.insert(_el$41, libs.createComponent(libs.Show, {
      get when() {
        return iconPath();
      },
      get children() {
        const _el$43 = libs.createElement("Image", {
          "class": "RuneDetailEngravingIcon",
          get src() {
            return iconPath();
          },
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$43, "src", iconPath(), _$p));
        return _el$43;
      }
    }), null);
    libs.insert(_el$40, libs.createComponent(libs.Show, {
      get when() {
        return isEmpty();
      },
      get fallback() {
        return (() => {
          const _el$46 = libs.createElement("Panel", {
            "class": "EngravingAttributeContents",
            hittest: false
          }, null);
          libs.insert(_el$46, libs.createComponent(libs.For, {
            get each() {
              return attributeDisplays();
            },
            children: entry => libs.createComponent(RuneAttributeRow, {
              get ["class"]() {
                return libs.classNames({
                  Strikethrough: local.shouldStrikethroughEntry?.(entry.entry) === true
                });
              },
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
          return _el$46;
        })();
      },
      get children() {
        const _el$44 = libs.createElement("Panel", {
            "class": "EngravingAttributeEmptyRow",
            hittest: false
          }, null),
          _el$45 = libs.createElement("Label", {
            get text() {
              return GetLocalization("#Rune_EngravingSlotEmpty");
            },
            hittest: false
          }, _el$44);
        libs.effect(_$p => libs.setProp(_el$45, "text", GetLocalization("#Rune_EngravingSlotEmpty"), _$p));
        return _el$44;
      }
    }), null);
    return _el$40;
  })();
};
const RuneDetailCard = props => {
  const [local, other] = libs.splitProps(props, ["class", "EmptyLabel", "tooltipText", "rune", "selectable", "selectedEntryKey", "highlightEntryKeys", "lockedAdverbEntryKeys", "active", "onEntrySelect", "onAdverbEntryLockToggle", "onRemoveRune"]);
  const mainEntries = libs.createMemo(() => rune_data.buildRuneAttributeDisplays(local.rune?.main_entry_data, 1));
  const adverbEntries = libs.createMemo(() => rune_data.buildRuneAttributeDisplays(local.rune?.adverb_entry_data, 2));
  const suitEntries = libs.createMemo(() => rune_data.buildRuneSuitDisplays(local.rune?.rune_suit_data));
  const engravingSlots = libs.createMemo(() => local.rune?.inlay_engravings_data ?? []);
  const isHighlighted = entryKey => local.highlightEntryKeys?.has(entryKey) === true;
  const isAdverbLockable = () => local.onAdverbEntryLockToggle != undefined;
  const canRemoveRune = libs.createMemo(() => local.rune != undefined && local.onRemoveRune != undefined);
  return (() => {
    const _el$47 = libs.createElement("Panel", libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneDetailCard", local.class);
      }
    }), null);
    libs.spread(_el$47, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("RuneDetailCard", local.class);
      },
      get classList() {
        return {
          ActiveSlot: local.active === true
        };
      }
    }), true);
    libs.insert(_el$47, libs.createComponent(libs.Show, {
      get when() {
        return local.rune != undefined;
      },
      get fallback() {
        return (() => {
          const _el$65 = libs.createElement("Panel", {
              "class": "EmptyMask RuneDetailCardContent",
              hittest: false
            }, null),
            _el$66 = libs.createElement("Panel", {
              "class": "RuneDevourCardIcon",
              hittest: false
            }, _el$65);
            libs.createElement("Panel", {
              "class": "RuneDevourCardIconPlus",
              hittest: false
            }, _el$66);
            const _el$68 = libs.createElement("Label", {
              html: true,
              get text() {
                return local.EmptyLabel;
              }
            }, _el$65);
          libs.effect(_$p => libs.setProp(_el$68, "text", local.EmptyLabel, _$p));
          return _el$65;
        })();
      },
      get children() {
        const _el$48 = libs.createElement("Panel", {
            "class": "RuneDetailCardContent",
            hittest: false
          }, null),
          _el$49 = libs.createElement("Panel", {
            "class": "RuneDevourCardIcon",
            hittest: false
          }, _el$48),
          _el$50 = libs.createElement("Image", {
            "class": "RuneDevourCardIconImg",
            get src() {
              return rune_data.getRuneIconPath(local.rune);
            },
            hittest: false
          }, _el$49);
          libs.createElement("Panel", {
            "class": "RuneDevourCardSelectedFrame",
            hittest: false
          }, _el$49);
          const _el$52 = libs.createElement("Panel", {
            "class": "RuneDevourCardName",
            hittest: false
          }, _el$48);
          libs.createElement("Panel", {
            id: "RuneDevourCardNameBG"
          }, _el$52);
          const _el$54 = libs.createElement("Label", {
            get ["class"]() {
              return libs.classNames("RuneDevourCardNameText", `Rarity${local.rune?.rarity ?? 1}`);
            },
            get text() {
              return `#${String(local.rune?.rune_item_id ?? "")}`;
            },
            hittest: false
          }, _el$52),
          _el$55 = libs.createElement("Panel", {
            "class": "RuneDevourCardDesc"
          }, _el$48),
          _el$56 = libs.createElement("Panel", {
            "class": "RuneDevourCardMainAttr"
          }, _el$55),
          _el$57 = libs.createElement("Panel", {
            "class": "RuneDevourCardAttrName"
          }, _el$55);
          libs.createElement("Image", {
            "class": "RuneDevourAttributeSeparator",
            hittest: false
          }, _el$57);
          const _el$59 = libs.createElement("Panel", {
            "class": "RuneDevourCardSuitPoint",
            hittest: false
          }, _el$55);
          libs.createElement("Image", {
            "class": "RuneDevourAttributeSeparator",
            hittest: false
          }, _el$59);
        libs.insert(_el$49, libs.createComponent(libs.Show, {
          get when() {
            return canRemoveRune();
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_CloseButton, {
              onactivate: () => {
                if (!canRemoveRune()) {
                  return;
                }
                local.onRemoveRune?.();
              }
            });
          }
        }), _el$50);
        libs.insert(_el$56, libs.createComponent(libs.For, {
          get each() {
            return mainEntries();
          },
          children: entry => libs.createComponent(RuneDetailCardAttributeRow, {
            entry: entry,
            interactionMode: "none"
          })
        }));
        libs.insert(_el$57, libs.createComponent(libs.For, {
          get each() {
            return adverbEntries();
          },
          children: entry => libs.createComponent(RuneDetailCardAttributeRow, {
            entry: entry,
            get interactionMode() {
              return isAdverbLockable() ? "lock" : local.selectable === true ? "select" : "none";
            },
            get locked() {
              return local.lockedAdverbEntryKeys?.has(entry.entryKey) === true;
            },
            get checked() {
              return isAdverbLockable() ? false : local.selectedEntryKey === entry.entryKey;
            },
            get highlighted() {
              return isHighlighted(entry.entryKey);
            },
            onActivate: () => {
              if (isAdverbLockable()) {
                local.onAdverbEntryLockToggle?.({
                  entryType: entry.entryType,
                  entryIndex: entry.entryIndex,
                  entryKey: entry.entryKey
                });
                return;
              }
              local.onEntrySelect?.({
                entryType: entry.entryType,
                entryIndex: entry.entryIndex,
                entryKey: entry.entryKey
              });
            }
          })
        }), null);
        libs.insert(_el$59, libs.createComponent(libs.For, {
          get each() {
            return suitEntries();
          },
          children: entry => libs.createComponent(RuneDetailCardSuitRow, {
            entry: entry,
            get selectable() {
              return local.selectable === true;
            },
            get checked() {
              return local.selectedEntryKey === entry.entryKey;
            },
            get highlighted() {
              return isHighlighted(entry.entryKey);
            },
            onActivate: () => {
              local.onEntrySelect?.({
                entryType: entry.entryType,
                entryIndex: entry.entryIndex,
                entryKey: entry.entryKey
              });
            }
          })
        }), null);
        libs.insert(_el$55, libs.createComponent(libs.Show, {
          get when() {
            return engravingSlots().length > 0;
          },
          get children() {
            const _el$61 = libs.createElement("Panel", {
                "class": "RuneDetailCardEngravingArea",
                hittest: false
              }, null);
              libs.createElement("Image", {
                "class": "RuneDevourAttributeSeparator",
                hittest: false
              }, _el$61);
              const _el$63 = libs.createElement("Panel", {
                "class": "RuneDetailEngravings",
                hittest: false
              }, _el$61);
            libs.insert(_el$63, libs.createComponent(libs.For, {
              get each() {
                return engravingSlots();
              },
              children: (engraving, index) => (() => {
                const _el$69 = libs.createElement("Panel", {
                    "class": "RuneDetailCardEngravingRowContainer",
                    hittest: false
                  }, null),
                  _el$70 = libs.createElement("Panel", {
                    "class": "RuneDetailCardEngravingHighlightFrame",
                    hittest: false
                  }, _el$69);
                libs.insert(_el$69, libs.createComponent(RuneDetailEngravingRow, {
                  engraving: engraving
                }), _el$70);
                libs.effect(_$p => libs.setProp(_el$70, "visible", isHighlighted(`engraving:${index()}`), _$p));
                return _el$69;
              })()
            }));
            return _el$61;
          }
        }), null);
        libs.effect(_p$ => {
          const _v$10 = rune_data.getRuneIconPath(local.rune),
            _v$11 = libs.classNames("RuneDevourCardNameText", `Rarity${local.rune?.rarity ?? 1}`),
            _v$12 = `#${String(local.rune?.rune_item_id ?? "")}`,
            _v$13 = adverbEntries().length > 0,
            _v$14 = suitEntries().length > 0;
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$50, "src", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$54, "class", _v$11, _p$._v$11));
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$54, "text", _v$12, _p$._v$12));
          _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$57, "visible", _v$13, _p$._v$13));
          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$59, "visible", _v$14, _p$._v$14));
          return _p$;
        }, {
          _v$10: undefined,
          _v$11: undefined,
          _v$12: undefined,
          _v$13: undefined,
          _v$14: undefined
        });
        return _el$48;
      }
    }), null);
    libs.insert(_el$47, libs.createComponent(libs.Show, {
      get when() {
        return local.tooltipText != undefined;
      },
      get children() {
        const _el$64 = libs.createElement("Panel", {
          "class": "RuneDetailCardTooltipIcon"
        }, null);
        libs.effect(_$p => libs.setProp(_el$64, "tooltip_text", local.tooltipText, _$p));
        return _el$64;
      }
    }), null);
    return _el$47;
  })();
};

exports.RuneAbilityItem = RuneAbilityItem;
exports.RuneAttributeRow = RuneAttributeRow;
exports.RuneBondItem = RuneBondItem;
exports.RuneDetailCard = RuneDetailCard;
exports.RuneDetailEngravingRow = RuneDetailEngravingRow;
exports.RuneEngravingSlots = RuneEngravingSlots;
exports.RuneSlotItem = RuneSlotItem;