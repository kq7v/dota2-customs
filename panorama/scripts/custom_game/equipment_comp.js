--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('equipment_comp', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var equipment_utils = require('./equipment_utils.js');

const BREAK_SLOT_NUM = 5;
const MAX_BREAK_SELECT_NUM = 30;
const MenuTabButton = props => {
  const merged = libs.mergeProps(props, {
    class: "MenuTabButton"
  });
  const [local, others] = libs.splitProps(merged, ['name', 'selected', 'locked', 'clickCallback', "icon", "num", "twoLine"]);
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1({
    get id() {
      return local.name;
    },
    get classList() {
      return {
        Selected: local.selected,
        TwoLine: local.twoLine === true
      };
    },
    get onactivate() {
      return local.clickCallback;
    }
  }, others, {
    get children() {
      const _el$ = libs.createElement("Panel", {
          align: "center center",
          get flowChildren() {
            return local.twoLine === true ? "down" : "right";
          },
          "class": "MenuTabButtonContent"
        }, null),
        _el$2 = libs.createElement("Panel", {
          "class": "MenuTabButtonTop",
          flowChildren: "right"
        }, _el$),
        _el$4 = libs.createElement("Label", {
          id: "MenuTabButtonLabel",
          get text() {
            return GetLocalization("#MenuTabButton_" + local.name);
          }
        }, _el$2);
      libs.setProp(_el$, "align", "center center");
      libs.setProp(_el$2, "flowChildren", "right");
      libs.insert(_el$2, libs.createComponent(libs.Show, {
        get when() {
          return local.icon;
        },
        get children() {
          const _el$3 = libs.createElement("Image", {
            "class": "MenuTabButtonIcon",
            get src() {
              return getSrcPath("conv/icon/" + local.icon + ".png");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$3, "src", getSrcPath("conv/icon/" + local.icon + ".png"), _$p));
          return _el$3;
        }
      }), _el$4);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return local.num != undefined;
        },
        get children() {
          const _el$5 = libs.createElement("Label", {
            "class": "MenuTabButtonNum",
            get text() {
              return `${String(local.num)}/${EQUIP_MAX_COUNT}`;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$5, "text", `${String(local.num)}/${EQUIP_MAX_COUNT}`, _$p));
          return _el$5;
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return local.locked;
        },
        get children() {
          return libs.createElement("Image", {
            "class": "MenuLockIcon"
          }, null);
        }
      }), null);
      libs.effect(_p$ => {
        const _v$ = local.twoLine === true ? "down" : "right",
          _v$2 = GetLocalization("#MenuTabButton_" + local.name);
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "flowChildren", _v$, _p$._v$));
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
const EquipmentCommonBtn = props => {
  const [local, others] = libs.splitProps(props, ["children", "class"]);
  return (() => {
    const _el$7 = libs.createElement("TextButton", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("EquipmentCommonBtn SecondaryButtonStates", local.class);
      }
    }), null);
    libs.spread(_el$7, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("EquipmentCommonBtn SecondaryButtonStates", local.class);
      }
    }), true);
    libs.insert(_el$7, () => local.children);
    return _el$7;
  })();
};
const EquipSeparator = props => {
  const [local, other] = libs.splitProps(props, ["text", "class"]);
  return (() => {
    const _el$8 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("EquipSeparator", local.class);
        }
      }), null);
      libs.createElement("Panel", {
        id: "Line1",
        "class": "Line"
      }, _el$8);
      const _el$0 = libs.createElement("Label", {
        get text() {
          return props.text;
        }
      }, _el$8);
      libs.createElement("Panel", {
        id: "Line2",
        "class": "Line"
      }, _el$8);
    libs.spread(_el$8, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("EquipSeparator", local.class);
      }
    }), true);
    libs.effect(_$p => libs.setProp(_el$0, "text", props.text, _$p));
    return _el$8;
  })();
};
const AttrContainer = props => {
  return (() => {
    const _el$16 = libs.createElement("Panel", {
        "class": "AttrBox VerticalScrollStyle"
      }, null),
      _el$17 = libs.createElement("Panel", {
        "class": "AttrContainer",
        hittest: false
      }, _el$16);
    libs.insert(_el$17, () => libs.untrack(() => props.children));
    return _el$16;
  })();
};
function AttrItem(props) {
  const [local, other] = libs.splitProps(props, ["attrData", "changeValue", "type", "index", "children", "onAttrbuteClick", "selected", "isNew", "attributeNameText"]);
  const attribute = () => GetLocalization("#property_" + local.attrData.id);
  const isPrivilege = () => local.attrData.id.startsWith("privilege_");
  const isPercent = () => attribute().startsWith("%");
  const color = () => props.attrData.percent != undefined ? equipment_utils.GetEntryHtmlColorByPercent(props.attrData.percent) : "#958D83";
  const name = () => ToColor(attribute().replace("%", ""), color());
  const displayName = () => local.attributeNameText ?? (isPrivilege() ? GetPrivilegeDesc(local.attrData.id, 1, {
    value: local.attrData.value
  }) : name());
  const valueISChange = () => local.changeValue != undefined && local.changeValue != local.attrData.value || typeof local.changeValue == "string";
  const ShowNext = () => {
    return typeof local.changeValue == "string" ? local.changeValue : `${equipment_utils.EquipAttributeRound(local.attrData.id, local.changeValue)}${isPercent() ? "%" : ""}`;
  };
  return (() => {
    const _el$18 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames({
            ValueIsChange: valueISChange(),
            New: local.isNew
          }, "AttrItem " + local.type);
        }
      }, null);
      libs.createElement("Panel", {
        "class": "NewBorder"
      }, _el$18);
      const _el$20 = libs.createElement("Panel", {
        verticalAlign: "center",
        flowChildren: "right"
      }, _el$18),
      _el$21 = libs.createElement("Panel", {
        id: "Point"
      }, _el$20),
      _el$22 = libs.createElement("Label", {
        id: "AttributeName",
        get text() {
          return displayName();
        },
        html: true
      }, _el$20);
      libs.createElement("Panel", {
        "class": "NewTag"
      }, _el$20);
    libs.setProp(_el$18, "onactivate", () => {
      local?.onAttrbuteClick?.(local.type, local.index);
    });
    libs.setProp(_el$20, "verticalAlign", "center");
    libs.setProp(_el$20, "style", {
      overflow: "noclip"
    });
    libs.setProp(_el$20, "flowChildren", "right");
    libs.insert(_el$20, libs.createComponent(libs.Show, {
      get when() {
        return local.onAttrbuteClick;
      },
      get children() {
        return libs.createComponent(AttributeSelectBtn, {
          get selected() {
            return local.selected;
          }
        });
      }
    }), _el$21);
    libs.insert(_el$20, () => libs.untrack(() => local.children), null);
    libs.insert(_el$18, libs.createComponent(libs.Show, {
      get when() {
        return !isPrivilege();
      },
      get children() {
        const _el$24 = libs.createElement("Label", {
          id: "AttributeValue",
          get text() {
            return equipment_utils.EquipAttributeRound(local.attrData.id, local.attrData.value) + (isPercent() ? "%" : "");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$24, "text", equipment_utils.EquipAttributeRound(local.attrData.id, local.attrData.value) + (isPercent() ? "%" : ""), _$p));
        return _el$24;
      }
    }), null);
    libs.insert(_el$18, libs.createComponent(libs.Show, {
      get when() {
        return valueISChange();
      },
      get children() {
        return [libs.createElement("Panel", {
          id: "ValueChangeArrow",
          "class": "EquipArrow"
        }, null), (() => {
          const _el$26 = libs.createElement("Label", {
            id: "Next",
            "class": "Green",
            get text() {
              return ShowNext();
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$26, "text", ShowNext(), _$p));
          return _el$26;
        })()];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames({
          ValueIsChange: valueISChange(),
          New: local.isNew
        }, "AttrItem " + local.type),
        _v$6 = displayName();
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$22, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$18;
  })();
}
const AttributeSelectBtn = props => {
  const merged = libs.mergeProps({
    selected: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["selected", "class"]);
  return (() => {
    const _el$27 = libs.createElement("Panel", others, null);
      libs.createElement("Panel", {
        id: "mid"
      }, _el$27);
    libs.spread(_el$27, libs.mergeProps$1(others, {
      get className() {
        return libs.classNames("AttributeSelectBtn", {
          Selected: local.selected
        }, local.class);
      }
    }), true);
    return _el$27;
  })();
};
function createEquipDetailSignal(id_signal) {
  const [itemData, setItemData] = libs.createSignal();
  const [force, _forceFresh] = libs.createSignal(false);
  libs.createEffect(() => {
    force();
    let id = String(id_signal());
    if (id) {
      let request = equipment_utils.GetEquipmentDetail([id], data => {
        setItemData(data[id]);
      }, true);
      request && libs.onCleanup(() => CancelRequest(request));
    } else {
      setItemData();
    }
  });
  return {
    itemData,
    forceFresh: () => {
      _forceFresh(b => !b);
    }
  };
}
function createGemDetailSignal(id_signal) {
  const [gemData, setGemData] = libs.createSignal();
  const [force, _forceFresh] = libs.createSignal(false);
  libs.createEffect(() => {
    force();
    let id = String(id_signal());
    if (id) {
      let request = equipment_utils.GetGemDetail([id], data => {
        setGemData(data[id]);
      }, true);
      request && libs.onCleanup(() => CancelRequest(request));
    } else {
      setGemData();
    }
  });
  return {
    gemData,
    forceFresh: () => {
      _forceFresh(b => !b);
    }
  };
}
const EquipmentContext = libs.createContext();
function useEquipmentStore() {
  const context = libs.useContext(EquipmentContext);
  if (!context) {
    throw new Error("useEquipmentStore must be used within EquipmentProvider");
  }
  return context;
}
function calculateAttributeData(attrData, bonus) {
  const addValue = attrData.base_value * bonus;
  const changeValue = equipment_utils.EquipAttributeRound(attrData.id, attrData.base_value + addValue);
  return {
    attrData,
    changeValue
  };
}

exports.AttrContainer = AttrContainer;
exports.AttrItem = AttrItem;
exports.AttributeSelectBtn = AttributeSelectBtn;
exports.BREAK_SLOT_NUM = BREAK_SLOT_NUM;
exports.EquipSeparator = EquipSeparator;
exports.EquipmentCommonBtn = EquipmentCommonBtn;
exports.EquipmentContext = EquipmentContext;
exports.MAX_BREAK_SELECT_NUM = MAX_BREAK_SELECT_NUM;
exports.MenuTabButton = MenuTabButton;
exports.calculateAttributeData = calculateAttributeData;
exports.createEquipDetailSignal = createEquipDetailSignal;
exports.createGemDetailSignal = createGemDetailSignal;
exports.useEquipmentStore = useEquipmentStore;