--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_MultiDropDown', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOMChildren = require('./EOMChildren.js');
var EOM_Button = require('./EOM_Button.js');

const [showDropDown, setShowDropDown] = libs.createSignal("");
let menuRoot;
const createDropDownContainer = panel => {
  const layoutFile = panel.layoutfile;
  while (panel.GetParent() != undefined && panel.GetParent()?.layoutfile == layoutFile) {
    panel = panel.GetParent();
  }
  let EOM_MultiDropDownContainer = panel.FindChildTraverse("EOM_MultiDropDownContainer");
  if (panel != undefined && EOM_MultiDropDownContainer == undefined) {
    EOM_MultiDropDownContainer = $.CreatePanel("Panel", panel, "EOM_MultiDropDownContainer", {
      style: "width: 100%; height: 100%; z-index: 99999;"
    });
    EOM_MultiDropDownContainer.visible = false;
    EOM_MultiDropDownContainer.SetPanelEvent("onactivate", () => {
      setShowDropDown("");
      EOM_MultiDropDownContainer.visible = false;
    });
  }
  menuRoot = EOM_MultiDropDownContainer;
  return menuRoot;
};
const EOM_MultiDropDown = props => {
  let myMenu;
  const [mountRef, setMountRef] = libs.createSignal();
  const mergerd = libs.mergeProps({
    id: DoUniqueString("EOM_MultiDropDown"),
    menuPosition: "bottom"
  }, props);
  const [local, others] = libs.splitProps(mergerd, ["index", "placeholder", "onChange", "reset", "id", "menuPosition", "options", "ref"]);
  const DropDownID = local.id;
  const defaultSelection = (() => {
    let res = {};
    Object.values(local.options).forEach(option => {
      res[option] = false;
    });
    return res;
  })();
  const [selectList, setSelectList] = libs.createSignal(Object.fromEntries(Object.values(local.options).map((option, index) => [option, local.index?.includes(index) ?? false])));
  libs.createEffect(() => {
    if (local.onChange) {
      local.onChange(selectList());
    }
  });
  libs.createEffect(libs.on(() => local.reset, () => {
    setSelectList(defaultSelection);
  }, {
    defer: true
  }));
  const toggleMenu = pBtn => {
    if (!pBtn?.IsValid()) return;
    setMountRef(createDropDownContainer(pBtn));
    if (!myMenu?.IsValid()) return;
    setShowDropDown(id => id == DropDownID ? "" : DropDownID);
    if (myMenu.visible) {
      menuRoot.visible = true;
      $.Schedule(0, () => {
        if (pBtn && myMenu && myMenu.IsValid()) {
          myMenu.SetFocus();
          let minWidth = pBtn.actuallayoutwidth / myMenu.actualuiscale_x;
          myMenu.style.minWidth = minWidth + "px";
          const childItems = myMenu.FindChildrenWithClassTraverse("EOM_MultiDropDownMenuItem");
          if (childItems && childItems.length > 0) {
            childItems.forEach(item => {
              item.style.width = minWidth - 10 + "px";
            });
          }
          let vPos = pBtn.GetPositionWithinWindow();
          let menuPosition = local.menuPosition;
          let x = vPos.x;
          let y = Math.max(0, menuPosition == "bottom" ? vPos.y + pBtn.actuallayoutheight + 2 : vPos.y - myMenu.actuallayoutheight - 2);
          let maxHeight = Math.max(0, (menuPosition == "bottom" ? Game.GetScreenHeight() - y : vPos.y) - 8);
          myMenu.style.maxHeight = maxHeight / myMenu.actualuiscale_y + "px";
          if (myMenu.actuallayoutheight > maxHeight) {
            y = Math.max(0, menuPosition == "bottom" ? y : vPos.y - maxHeight);
          }
          myMenu.SetPositionInPixels(x / myMenu.actualuiscale_x, y / myMenu.actualuiscale_y, 0);
        }
      });
    }
  };
  const selectCount = () => Object.values(selectList()).filter(item => item).length;
  if (local.ref) {
    let refData = {
      reset() {
        setSelectList(defaultSelection);
      },
      setSelect(set) {
        setSelectList(set);
      }
    };
    local.ref(refData);
  }
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(others, {
    get id() {
      return local.id;
    },
    get className() {
      return libs.classNames("EOM_MultiDropDown");
    },
    onactivate: self => {
      toggleMenu(self);
    },
    get children() {
      return [libs.createComponent(libs.Show, {
        get when() {
          return props.placeholder != "";
        },
        get fallback() {
          return (() => {
            const _el$4 = libs.createElement("Label", {
              id: "EOM_MultiDropDown_placeholder",
              text: "#All",
              get dialogVariables() {
                return {
                  count: selectCount()
                };
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$4, "dialogVariables", {
              count: selectCount()
            }, _$p));
            return _el$4;
          })();
        },
        get children() {
          const _el$ = libs.createElement("Label", {
            id: "EOM_MultiDropDown_placeholder",
            get text() {
              return props.placeholder;
            },
            get dialogVariables() {
              return {
                count: selectCount()
              };
            }
          }, null);
          libs.effect(_p$ => {
            const _v$ = props.placeholder,
              _v$2 = {
                count: selectCount()
              };
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "dialogVariables", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$;
        }
      }), (() => {
        const _el$2 = libs.createElement("Panel", {
          id: "EOM_MultiDropDown_arrow"
        }, null);
        libs.effect(_$p => libs.setProp(_el$2, "classList", {
          reverse: showDropDown() != DropDownID
        }, _$p));
        return _el$2;
      })(), libs.createComponent(EOMChildren.Portal, {
        get mount() {
          return mountRef();
        },
        get children() {
          const _el$3 = libs.createElement("Panel", {
            id: DropDownID + "_EOM_MultiDropDownMenu",
            "class": "DropDownPanelList"
          }, null);
          const _ref$ = myMenu;
          typeof _ref$ === "function" ? libs.use(_ref$, _el$3) : myMenu = _el$3;
          libs.setProp(_el$3, "id", DropDownID + "_EOM_MultiDropDownMenu");
          libs.insert(_el$3, libs.createComponent(libs.For, {
            get each() {
              return local.options;
            },
            children: item => {
              const localize = () => {
                if (props.localizeFunc) {
                  return props.localizeFunc(item.toString());
                }
                return item;
              };
              return (() => {
                const _el$5 = libs.createElement("Panel", {
                    get id() {
                      return item.toString();
                    },
                    get ["class"]() {
                      return libs.classNames("EOM_MultiDropDownMenuItem", {
                        Selected: selectList()[item]
                      });
                    }
                  }, null),
                  _el$6 = libs.createElement("Panel", {
                    id: "OptionIcon"
                  }, _el$5);
                  libs.createElement("Panel", {
                    id: "SelectedIcon"
                  }, _el$6);
                  const _el$8 = libs.createElement("Label", {
                    id: "OptionText",
                    get text() {
                      return localize();
                    },
                    html: true
                  }, _el$5);
                libs.setProp(_el$5, "onactivate", () => {
                  setSelectList(prev => prev = {
                    ...prev,
                    [item]: !prev[item]
                  });
                });
                libs.effect(_p$ => {
                  const _v$3 = item.toString(),
                    _v$4 = libs.classNames("EOM_MultiDropDownMenuItem", {
                      Selected: selectList()[item]
                    }),
                    _v$5 = localize();
                  _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "id", _v$3, _p$._v$3));
                  _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$5, "class", _v$4, _p$._v$4));
                  _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "text", _v$5, _p$._v$5));
                  return _p$;
                }, {
                  _v$3: undefined,
                  _v$4: undefined,
                  _v$5: undefined
                });
                return _el$5;
              })();
            }
          }));
          libs.effect(_$p => libs.setProp(_el$3, "visible", showDropDown() == DropDownID, _$p));
          return _el$3;
        }
      })];
    }
  }));
};

exports.EOM_MultiDropDown = EOM_MultiDropDown;