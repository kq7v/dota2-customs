--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_MenuLayout', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');

const playerMaxDiff = service_netdata_helper.usePlayerMaxDiff();
const playerMaxAbyssalDiff = service_netdata_helper.usePlayerMaxAbyssalDiff();
function parseMenuLockConfig(rawValue) {
  if (rawValue == "") {
    return {};
  }
  const result = {};
  const rows = rawValue.split("|");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row == "") {
      continue;
    }
    const [menuKey, diffText] = row.split(":");
    const requiredDiff = Number(diffText);
    if (menuKey && Number.isFinite(requiredDiff) && requiredDiff > 0) {
      result[menuKey] = requiredDiff;
    }
  }
  return result;
}
const EOM_MenuLayout = props => {
  const merged = libs.mergeProps({
    renderOnShow: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "renderOnShow", "name", "show", "close", "backgroundChildren", "class"]);
  const mergedClass = libs.createMemo(() => libs.classNames("EOM_MenuLayout", local.class));
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return mergedClass();
        }
      }), null),
      _el$2 = libs.createElement("Image", {
        id: "TopBottomBG",
        hittest: false
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return mergedClass();
      },
      get classList() {
        return {
          Show: local.show
        };
      },
      "onactivate": () => {}
    }), true);
    libs.insert(_el$, () => local.backgroundChildren, _el$2);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_CloseButton, {
      onactivate: self => {
        if (local.close != undefined) {
          local.close();
        } else {
          ClientSideEvent("custom_ui_toggle_windows", {
            windowName: local.name,
            state: 0
          });
        }
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return !local.renderOnShow || local.show;
      },
      get children() {
        return libs.untrack(() => local.children);
      }
    }), null);
    return _el$;
  })();
};
const DEFAULT_MENU_TOGGLE_BLOCKED_MESSAGE = "#MenuLayout_CannotSwitch";
function createMenuLayout(name, menuList, defaultShowOrOptions, windowNameOverride, extraOptions) {
  const options = typeof defaultShowOrOptions === "object" ? defaultShowOrOptions : {
    ...extraOptions,
    defaultShow: defaultShowOrOptions ?? extraOptions?.defaultShow,
    windowNameOverride: windowNameOverride ?? extraOptions?.windowNameOverride
  };
  return createMenuLayoutImpl(name, menuList, options);
}
function createMenuLayoutImpl(name, menuList, options = {}) {
  const windowName = options.windowNameOverride ?? "MenuButton_" + name;
  const [show, setShowSignal] = libs.createSignal(options.defaultShow ?? false);
  const prepareToShow = () => {
    if (!show()) {
      options.beforeShow?.();
    }
  };
  const setShow = value => {
    const nextShow = typeof value === "function" ? value(show()) : value;
    if (nextShow) {
      prepareToShow();
    }
    return setShowSignal(() => nextShow);
  };
  const [menuName, setMenuName] = libs.createSignal(Object.keys(menuList())[0] ?? "");
  const [jumpInfo, setJumpInfo] = libs.createSignal();
  const [menuSelected, setMenuSelected] = libs.createStore({});
  const menuLockConfigMap = libs.createMemo(() => {
    return parseMenuLockConfig(KeyValues.game_setting?.menu_lock?.value ?? "");
  });
  const menuAbyssalLockConfigMap = libs.createMemo(() => {
    return parseMenuLockConfig(KeyValues.game_setting?.menu_abyssal_lock?.value ?? "");
  });
  const getMenuAbyssalLockRequiredDiff = (menu, menu2) => {
    const abyssalConfigMap = menuAbyssalLockConfigMap();
    if (menu2 != undefined && abyssalConfigMap[menu2] != undefined) {
      return abyssalConfigMap[menu2];
    }
    return abyssalConfigMap[menu];
  };
  const isAbyssalMenuUnlocked = (menu, menu2) => {
    const requiredDiff = getMenuAbyssalLockRequiredDiff(menu, menu2);
    return requiredDiff == undefined || playerMaxAbyssalDiff() >= requiredDiff;
  };
  const getMenuLockRequirement = (menu, menu2) => {
    const commonConfigMap = menuLockConfigMap();
    const abyssalConfigMap = menuAbyssalLockConfigMap();
    if (menu2 != undefined && commonConfigMap[menu2] != undefined) {
      return {
        requiredDiff: commonConfigMap[menu2],
        type: "common"
      };
    }
    if (menu2 != undefined && abyssalConfigMap[menu2] != undefined) {
      return {
        requiredDiff: abyssalConfigMap[menu2],
        type: "abyssal"
      };
    }
    if (commonConfigMap[menu] != undefined) {
      return {
        requiredDiff: commonConfigMap[menu],
        type: "common"
      };
    }
    if (abyssalConfigMap[menu] != undefined) {
      return {
        requiredDiff: abyssalConfigMap[menu],
        type: "abyssal"
      };
    }
    return undefined;
  };
  const isMenuUnlocked = (menu, menu2) => {
    const requirement = getMenuLockRequirement(menu, menu2);
    if (requirement == undefined) {
      return true;
    }
    return requirement.type === "abyssal" ? playerMaxAbyssalDiff() >= requirement.requiredDiff : playerMaxDiff() >= requirement.requiredDiff;
  };
  const showBlockedMessage = (message, sound) => {
    const text = message ?? DEFAULT_MENU_TOGGLE_BLOCKED_MESSAGE;
    if (text == undefined || text === "") {
      return;
    }
    if (sound != undefined) {
      ErrorMessage(text, sound);
    } else {
      ErrorMessage(text);
    }
  };
  const canToggleMenu = (menu, menu2, source) => {
    const requirement = getMenuLockRequirement(menu, menu2);
    if (requirement != undefined && !isMenuUnlocked(menu, menu2)) {
      showBlockedMessage(LocalizeWithVars(requirement.type === "abyssal" ? "#MenuLayout_AbyssalLock" : "#MenuLayout_Lock", {
        value: requirement.requiredDiff
      }));
      return false;
    }
    if (options.canToggleMenu == undefined) {
      return true;
    }
    const result = options.canToggleMenu({
      fromMenu: menuName(),
      fromMenu2: menuSelected[menuName()],
      toMenu: menu,
      toMenu2: menu2,
      source
    });
    if (result === undefined || result === true) {
      return true;
    }
    if (result === false) {
      showBlockedMessage();
      return false;
    }
    if (typeof result === "string") {
      showBlockedMessage(result);
      return false;
    }
    if (result.allow) {
      return true;
    }
    showBlockedMessage(result.message, result.sound);
    return false;
  };
  libs.createEffect(libs.on(menuList, list => {
    let result = {};
    if (list) {
      for (const key in list) {
        const element = list[key];
        result[key] = element[0];
      }
      setMenuSelected(result);
      setMenuName(Object.keys(list)[0] ?? "");
    }
  }));
  libs.createEffect(libs.on(show, visible => {
    if (!visible) {
      setJumpInfo(undefined);
    }
  }));
  let LayoutMenu = () => {
    return libs.createComponent(EOM_MenuLayout_Menu, {
      menuName: name,
      get menuList() {
        return menuList();
      },
      get show() {
        return show();
      },
      get selectedMenu() {
        return menuName();
      },
      get selectedMenu2() {
        return menuSelected[menuName()];
      },
      isMenuUnlocked: isMenuUnlocked,
      onToggleMenu: (menu, menu2) => {
        if (!canToggleMenu(menu, menu2, "click")) {
          return;
        }
        if (menu) {
          setMenuName(menu);
        }
        if (menu2) {
          setMenuSelected({
            [menu]: menu2
          });
        }
        GameUI.CustomUIConfig().ReportClick(name, menu2 ?? menu);
      }
    });
  };
  libs.onMount(() => {
    const gameEventListeners = [];
    gameEventListeners.push(useClientSideEvent("custom_ui_toggle_windows", eventData => {
      if (eventData.windowName == windowName) {
        if (eventData.state === undefined) {
          const nextShow = !show();
          setShow(nextShow);
          if (!nextShow) {
            setJumpInfo(undefined);
          }
        } else {
          const nextShow = eventData.state == 1 || eventData.state === true;
          setShow(nextShow);
          if (!nextShow) {
            setJumpInfo(undefined);
          }
        }
      } else {
        setShow(false);
        setJumpInfo(undefined);
      }
    }));
    gameEventListeners.push(useClientSideEvent("toggle_window_tag", event => {
      if (event.window_name == windowName) {
        prepareToShow();
        libs.batch(() => {
          const menuEntry = event.menu && menuList()[event.menu];
          const menu2Valid = !!(menuEntry && event.menu2 && menuEntry.includes(event.menu2));
          if (menu2Valid) {
            if (!canToggleMenu(event.menu, event.menu2, "jump")) {
              return;
            }
            setMenuSelected({
              [event.menu]: event.menu2
            });
          }
          const toggle = event.force || menu2Valid;
          if (toggle) {
            if (event.menu && !canToggleMenu(event.menu, menu2Valid ? event.menu2 : undefined, "jump")) {
              return;
            }
            if (menuEntry) {
              setMenuName(event.menu);
            }
            setJumpInfo(event);
            ToggleWindow(event.window_name, true);
          }
        });
      }
    }));
    libs.onCleanup(() => gameEventListeners.forEach(id => GameEvents.Unsubscribe(id)));
  });
  return {
    LayoutMenu,
    show,
    setShow,
    jumpInfo,
    menuName,
    getMenuAbyssalLockRequiredDiff,
    isAbyssalMenuUnlocked,
    secondTabName: () => menuSelected[menuName()] ?? menuList()[menuName()]?.[0] ?? "",
    setMenuName: (menu, menu2) => {
      if (!canToggleMenu(menu, menu2, "api")) {
        return;
      }
      libs.batch(() => {
        setMenuName(menu);
        if (menu2 == undefined) {
          menu2 = menuList()[menu][0];
        }
        setMenuSelected(menu, menu2 ?? "");
      });
    },
    setSecondTabName: menu2 => {
      setMenuSelected(menuName(), menu2);
    }
  };
}
const EOM_MenuLayout_Menu = props => {
  const sLanguage = Language();
  const merged = libs.mergeProps({
    menuList: []
  }, props, {
    class: libs.classNames("EOM_MenuLayout_Menu")
  });
  const [local, others] = libs.splitProps(merged, ["menuList", "onToggleMenu", "selectedMenu", "selectedMenu2", "menuName", "mark_icon", "show", "isMenuUnlocked"]);
  const [_key, SetKey] = libs.createSignal(1);
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(CustomUIConfig.SubscribeRedPointChange(menuName => {
      SetKey(k => k + 1);
    }, props.menuName));
    libs.onCleanup(() => {
      for (const id of gameEventIDList) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
  return (() => {
    const _el$3 = libs.createElement("Panel", libs.mergeProps$1({
      hittest: false
    }, others), null);
    libs.spread(_el$3, libs.mergeProps$1(others, {
      get classList() {
        return {
          Show: local.show ?? false
        };
      }
    }), true);
    libs.insert(_el$3, libs.createComponent(libs.Index, {
      get each() {
        return Object.keys(local.menuList);
      },
      children: (menu, index) => {
        const menuIcon = () => {
          if (local.mark_icon) {
            return local.mark_icon(menu());
          }
        };
        const hasSecondaryMenu = libs.createMemo(() => {
          let list = local.menuList[menu()];
          return list != undefined && list.length > 0;
        });
        const red = () => props.menuName && _key() > 0 && CustomUIConfig.GetRedPoint(props.menuName, menu());
        const locked = () => local.isMenuUnlocked != undefined && !local.isMenuUnlocked(menu());
        let refMenu;
        libs.createEffect(old => {
          let selected = local.selectedMenu == menu();
          if (old != selected && selected && refMenu?.IsValid()) {
            $.Schedule(0.1 + Game.GetGameFrameTime(), () => {
              if (!refMenu?.IsValid()) return;
              let parent = refMenu.GetParent();
              if (!parent?.IsValid()) return;
              let position = refMenu.GetPositionWithinAncestor(parent);
              if (position.y + refMenu.actuallayoutheight > parent.actuallayoutheight) {
                refMenu.ScrollParentToMakePanelFit(2, false);
              }
            });
          }
          return old;
        });
        return [(() => {
          const _el$4 = libs.createElement("Panel", {
              get id() {
                return menu();
              }
            }, null),
            _el$6 = libs.createElement("Image", {}, _el$4),
            _el$7 = libs.createElement("Label", {
              get text() {
                return GetLocalization("#" + menu());
              },
              html: true
            }, _el$4);
          libs.setProp(_el$4, "onactivate", self => {
            let newMenu = menu();
            local.onToggleMenu(newMenu);
          });
          libs.insert(_el$4, libs.createComponent(libs.Show, {
            get when() {
              return local.selectedMenu == menu();
            },
            get children() {
              return libs.createElement("DOTAParticleScenePanel", {
                "class": "TabButtonParticle",
                particleName: "particles/ui/game/ui_game_general_special_effects_01_fx.vpcf",
                cameraOrigin: "0 0 150",
                fov: 45,
                lookAt: "0 0 0",
                hittest: false,
                squarePixels: true
              }, null);
            }
          }), _el$6);
          libs.insert(_el$4, menuIcon, _el$6);
          libs.setProp(_el$6, "className", "TabIcon");
          libs.insert(_el$4, libs.createComponent(libs.Show, {
            get when() {
              return locked();
            },
            get children() {
              return libs.createElement("Image", {
                "class": "MenuLockIcon"
              }, null);
            }
          }), null);
          libs.insert(_el$4, libs.createComponent(libs.Show, {
            get when() {
              return red();
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
            }
          }), null);
          libs.insert(_el$4, libs.createComponent(libs.Show, {
            get when() {
              return hasSecondaryMenu();
            },
            get children() {
              const _el$9 = libs.createElement("Image", {}, null);
              libs.setProp(_el$9, "className", "TabBackgroundArrow");
              return _el$9;
            }
          }), null);
          libs.effect(_p$ => {
            const _v$ = menu(),
              _v$2 = libs.classNames("TabButton", {
                HasSecondaryMenu: hasSecondaryMenu(),
                Selected: local.selectedMenu == menu()
              }),
              _v$3 = libs.classNames("TabLabel", sLanguage),
              _v$4 = GetLocalization("#" + menu());
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "id", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "className", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "className", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined,
            _v$4: undefined
          });
          return _el$4;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return hasSecondaryMenu();
          },
          get children() {
            const _el$0 = libs.createElement("Panel", {}, null);
            const _ref$ = refMenu;
            typeof _ref$ === "function" ? libs.use(_ref$, _el$0) : refMenu = _el$0;
            libs.insert(_el$0, libs.createComponent(libs.Index, {
              get each() {
                return local.menuList?.[menu()] ?? [];
              },
              children: (menu2, index2) => {
                const menu2Icon = () => {
                  if (local.mark_icon) {
                    return local.mark_icon(menu(), menu2());
                  }
                };
                const red2 = () => props.menuName && _key() > 0 && CustomUIConfig.GetRedPoint(props.menuName, menu(), menu2());
                const locked2 = () => local.isMenuUnlocked != undefined && !local.isMenuUnlocked(menu(), menu2());
                return (() => {
                  const _el$1 = libs.createElement("Panel", {}, null),
                    _el$11 = libs.createElement("Image", {}, _el$1),
                    _el$12 = libs.createElement("Panel", {
                      id: "TextAndRedMark"
                    }, _el$1),
                    _el$13 = libs.createElement("Label", {
                      get text() {
                        return GetLocalization("#" + menu2());
                      },
                      html: true
                    }, _el$12);
                  libs.setProp(_el$1, "onactivate", self => {
                    local.onToggleMenu(menu(), menu2());
                  });
                  libs.insert(_el$1, libs.createComponent(libs.Show, {
                    get when() {
                      return local.selectedMenu2 == menu2();
                    },
                    get children() {
                      return libs.createElement("DOTAParticleScenePanel", {
                        "class": "TabButtonParticle",
                        particleName: "particles/ui/game/ui_game_general_special_effects_01_fx.vpcf",
                        cameraOrigin: "0 0 150",
                        fov: 45,
                        lookAt: "0 0 0",
                        hittest: false,
                        squarePixels: true
                      }, null);
                    }
                  }), _el$11);
                  libs.setProp(_el$11, "className", "SecondaryBackgroundActive");
                  libs.insert(_el$12, libs.createComponent(libs.Show, {
                    get when() {
                      return locked2();
                    },
                    get children() {
                      return libs.createElement("Image", {
                        "class": "MenuLockIcon"
                      }, null);
                    }
                  }), null);
                  libs.insert(_el$12, libs.createComponent(libs.Show, {
                    get when() {
                      return red2();
                    },
                    get children() {
                      return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
                    }
                  }), null);
                  libs.insert(_el$1, menu2Icon, null);
                  libs.effect(_p$ => {
                    const _v$5 = libs.classNames("SecondaryMenuButton", {
                        Selected: local.selectedMenu2 == menu2()
                      }),
                      _v$6 = libs.classNames(sLanguage),
                      _v$7 = GetLocalization("#" + menu2());
                    _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "className", _v$5, _p$._v$5));
                    _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$13, "className", _v$6, _p$._v$6));
                    _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$13, "text", _v$7, _p$._v$7));
                    return _p$;
                  }, {
                    _v$5: undefined,
                    _v$6: undefined,
                    _v$7: undefined
                  });
                  return _el$1;
                })();
              }
            }));
            libs.effect(_$p => libs.setProp(_el$0, "className", libs.classNames("SecondaryContainer", {
              Selected: local.selectedMenu == menu()
            }), _$p));
            return _el$0;
          }
        })];
      }
    }));
    return _el$3;
  })();
};
const EOM_MenuLayout_Content = props => {
  const merged = libs.mergeProps(props, {
    shadow_border: false
  });
  const [local, others] = libs.splitProps(merged, ["class", "children", "show", "topbarChildren", "shadow_border"]);
  return (() => {
    const _el$15 = libs.createElement("Panel", libs.mergeProps$1(others, {
        hittest: false,
        get ["class"]() {
          return libs.classNames("EOM_MenuLayout_Content", local.class);
        }
      }), null);
      libs.createElement("Panel", {
        "class": "EOM_MenuLayout_Content_BG",
        hittest: false
      }, _el$15);
      const _el$17 = libs.createElement("Panel", {
        "class": "EOM_MenuLayout_ShadowBoder"
      }, _el$15),
      _el$18 = libs.createElement("Panel", {
        "class": "EOM_MenuLayout_ShadowBoder Right"
      }, _el$15),
      _el$19 = libs.createElement("Panel", {
        "class": "EOM_MenuLayout_Content_Box",
        hittest: false
      }, _el$15);
    libs.spread(_el$15, libs.mergeProps$1(others, {
      "hittest": false,
      get ["class"]() {
        return libs.classNames("EOM_MenuLayout_Content", local.class);
      },
      get classList() {
        return {
          Show: local.show ?? true
        };
      }
    }), true);
    libs.insert(_el$15, () => local.topbarChildren, _el$19);
    libs.insert(_el$19, () => libs.untrack(() => local.children));
    libs.effect(_p$ => {
      const _v$8 = local.shadow_border,
        _v$9 = local.shadow_border;
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$17, "visible", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$18, "visible", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$15;
  })();
};

exports.EOM_MenuLayout = EOM_MenuLayout;
exports.EOM_MenuLayout_Content = EOM_MenuLayout_Content;
exports.createMenuLayout = createMenuLayout;