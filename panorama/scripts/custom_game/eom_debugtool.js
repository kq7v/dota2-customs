--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_DebugTool', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var CityImage = require('./CityImage.js');
var GenericPanel = require('./GenericPanel.js');
var ItemImage = require('./ItemImage.js');
var RuneRewardCard = require('./RuneRewardCard.js');
var ShopSpecialCard = require('./ShopSpecialCard.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_Separator = require('./EOM_Separator.js');

const EOM_DebugTool = props => {
  const [fps, setFps] = libs.createSignal("0");
  const [fpsRecord, setFpsRecord] = libs.createSignal(0);
  const [fpsCount, setFpsCount] = libs.createSignal(0);
  const [minimized, setMinimized] = libs.createSignal(true);
  const [manualShowPanel, setManualShowPanel] = libs.createSignal(false);
  const [direction, setDirection] = libs.createSignal("left");
  const Update = () => {
    setFpsRecord(fpsRecord() + Game.GetGameFrameTime());
    setFpsCount(fpsCount() + 1);
    if (fpsRecord() > 1 && fpsCount() != 0) {
      setFps((fpsCount() / fpsRecord()).toFixed(0));
      setFpsRecord(0);
      setFpsCount(0);
    }
    if (!manualShowPanel()) {
      if (minimized() == GameUI.IsAltDown()) {
        setMinimized(!GameUI.IsAltDown());
      }
    } else {
      if (GameUI.IsAltDown()) {
        setManualShowPanel(false);
      }
    }
  };
  const timer = setInterval(Update, Game.GetGameFrameTime());
  libs.onCleanup(() => clearInterval(timer));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "EOM_DebugTool",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "EOM_DebugToolControlPanel",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {}, _el$2),
      _el$4 = libs.createElement("Panel", {}, _el$3),
      _el$5 = libs.createElement("Panel", {}, _el$4),
      _el$6 = libs.createElement("Panel", {}, _el$4),
      _el$7 = libs.createElement("Panel", {
        id: "ExpandButtonContainer"
      }, _el$2),
      _el$8 = libs.createElement("Button", {
        id: "ExpandButton"
      }, _el$7);
    libs.insert(_el$, () => props.containerElement, _el$2);
    libs.setProp(_el$3, "className", "ControlPanelContainer");
    libs.setProp(_el$4, "className", "ControlPanelTitle");
    libs.setProp(_el$5, "className", "CategoryHeaderFilledFront");
    libs.insert(_el$4, libs.createComponent(GenericPanel.CLabel, {
      className: "CategoryHeader",
      get text() {
        return `工具(FPS:${fps()})`;
      }
    }), _el$6);
    libs.setProp(_el$6, "className", "CategoryHeaderFilledNext");
    libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_IconButton, {
      className: "CategoryHeaderIcon",
      tooltip: "切换布局",
      verticalAlign: "center",
      get icon() {
        return libs.createComponent(EOM_Icon.EOM_Icon, {
          type: "Popout",
          size: "24"
        });
      },
      get children() {
        return libs.createComponent(EOM_DropDown.EOM_DropDown, {
          id: "ToggleSize",
          onChange: (index, item) => {
            setDirection(item.id);
            SaveConfig({
              direction: item.id
            });
          },
          get children() {
            return [libs.createComponent(GenericPanel.CLabel, {
              text: "左侧",
              id: "left"
            }), libs.createComponent(GenericPanel.CLabel, {
              text: "上方",
              id: "top"
            }), libs.createComponent(GenericPanel.CLabel, {
              text: "右侧",
              id: "right"
            })];
          }
        });
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_IconButton, {
      className: "CategoryHeaderIcon",
      tooltip: "重载数据",
      verticalAlign: "center",
      get icon() {
        return libs.createComponent(EOM_Icon.EOM_Icon, {
          type: "Refresh",
          size: "24"
        });
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_IconButton, {
      className: "CategoryHeaderIcon",
      tooltip: "设置",
      verticalAlign: "center",
      get icon() {
        return libs.createComponent(EOM_Icon.EOM_Icon, {
          type: "Gear",
          size: "24"
        });
      }
    }), null);
    libs.insert(_el$3, () => props.children, null);
    libs.setProp(_el$7, "style", {
      verticalAlign: "center"
    });
    libs.setProp(_el$8, "onactivate", () => {
      setManualShowPanel(minimized());
      setMinimized(!minimized());
    });
    libs.insert(_el$8, libs.createComponent(EOM_Icon.EOM_Icon, {
      type: "ArrowRight",
      width: "8px",
      height: "14px",
      align: "center center",
      get rotate() {
        return minimized() ? props.direction == "top" ? 90 : 0 : props.direction == "top" ? 270 : 180;
      }
    }));
    libs.effect(_$p => libs.setProp(_el$2, "className", libs.classNames("ControlPanel", {
      Minimized: minimized(),
      DirectionLeft: direction() == "left",
      DirectionRight: direction() == "right",
      DirectionTop: direction() == "top"
    }), _$p));
    return _el$;
  })();
};
function EOM_DebugTool_Category(props) {
  const col = props.col ?? 2;
  const layout = props.layout ?? false;
  return (() => {
    const _el$9 = libs.createElement("Panel", {}, null),
      _el$0 = libs.createElement("Panel", {}, _el$9),
      _el$1 = libs.createElement("Panel", {}, _el$0),
      _el$10 = libs.createElement("Panel", {}, _el$9);
    libs.setProp(_el$0, "className", "CategoryHeader");
    libs.insert(_el$0, libs.createComponent(GenericPanel.CLabel, {
      className: "CategoryHeaderLabel",
      get text() {
        return props.title;
      }
    }), _el$1);
    libs.setProp(_el$1, "style", {
      width: "fill-parent-flow(1)"
    });
    libs.setProp(_el$10, "className", "CategoryButtonContainer");
    libs.insert(_el$10, () => !layout && [...Array(Math.ceil((props.children?.length ?? 0) / col))].map((_, rowIndex) => {
      return (() => {
        const _el$11 = libs.createElement("Panel", {}, null);
        libs.setProp(_el$11, "className", "Row");
        libs.insert(_el$11, () => props.children?.map((child, childIndex) => {
          if (childIndex >= rowIndex * col && childIndex < rowIndex * col + col) {
            return child;
          }
        }));
        return _el$11;
      })();
    }), null);
    libs.insert(_el$10, () => layout && props.children, null);
    libs.effect(_$p => libs.setProp(_el$9, "className", libs.classNames("Category", {
      SingleCol: col <= 1
    }), _$p));
    return _el$9;
  })();
}
function FireEvent(sEventName, str = "") {
  if (!(Players.GetLocalPlayer() == -1 || Players.IsSpectator(Players.GetLocalPlayer()) || Players.IsLocalPlayerLiveSpectating())) {
    GameEvents.SendCustomGameEventToServer("DemoEvent", {
      event_name: sEventName,
      player_id: Players.GetLocalPlayer(),
      unit: Players.GetLocalPlayerPortraitUnit(),
      position: GameUI.GetCameraLookAtPosition(),
      str: str,
      spectator_view_id: isSpectator() ? GameUI.GetSpectatorViewingInfo().player_id : undefined
    });
  }
}
function SaveConfig(config) {
  GameEvents.SendCustomGameEventToServer("DemoEvent", {
    event_name: "SaveConfig",
    player_id: Players.GetLocalPlayer(),
    unit: Players.GetLocalPlayerPortraitUnit(),
    position: GameUI.GetCameraLookAtPosition(),
    str: JSON.stringify(config)
  });
}
function ToggleSelection(sPickerName) {
  let aPickerList = $.GetContextPanel().FindChildrenWithClassTraverse("SelectionContainer");
  if (aPickerList !== null) {
    for (const iterator of aPickerList) {
      if (iterator.id == sPickerName) {
        iterator.ToggleClass("Show");
      } else if (iterator.BHasClass("LockWindow") == false) {
        iterator.SetHasClass("Show", false);
      }
    }
  }
}
function CompilePopups(tooltips) {
  for (const k of tooltips) {
    $.DispatchEvent("UIShowCustomLayoutTooltip", $.GetContextPanel(), k, "file://{resources}/layout/custom_game/" + k + ".xml");
    $.Schedule(0.1, () => {
      $.DispatchEvent("UIHideCustomLayoutTooltip", $.GetContextPanel(), k);
    });
  }
  const context_menu = [];
  context_menu.forEach(src => {
    let pContextMenu = $.CreatePanel("ContextMenuScript", $.GetContextPanel(), "");
    let pContentsPanel = pContextMenu.GetContentsPanel();
    pContentsPanel.BLoadLayout(src, false, false);
  });
  $.Schedule(0.1, () => {
    $.DispatchEvent("DismissAllContextMenus");
  });
}
const DemoButton = props => {
  const onactivate = props.onactivate ?? (() => FireEvent(props.eventName, props.str));
  return (() => {
    const _el$12 = libs.createElement("TextButton", {
      get id() {
        return props.eventName;
      },
      get text() {
        return props.text;
      },
      onactivate: onactivate
    }, null);
    libs.setProp(_el$12, "onactivate", onactivate);
    libs.effect(_p$ => {
      const _v$ = props.eventName,
        _v$2 = libs.classNames("DemoButton", "HotKeyValid", "FireEvent", props.color),
        _v$3 = props.text;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$12, "id", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$12, "className", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$12, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$12;
  })();
};
const DemoToggle = props => {
  const selected = props.selected ?? false;
  return (() => {
    const _el$13 = libs.createElement("ToggleButton", {
      get id() {
        return props.eventName;
      },
      selected: selected,
      get text() {
        return props.text;
      }
    }, null);
    libs.setProp(_el$13, "className", "HotKeyValid FireEvent");
    libs.setProp(_el$13, "selected", selected);
    libs.setProp(_el$13, "onactivate", self => {
      FireEvent(props.eventName, self.IsSelected() ? "1" : "0");
    });
    libs.effect(_p$ => {
      const _v$4 = props.eventName,
        _v$5 = props.text;
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$13, "id", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$13, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$13;
  })();
};
const DemoTextEntry = props => {
  return (() => {
    const _el$14 = libs.createElement("TextButton", {
        get text() {
          return props.text;
        }
      }, null),
      _el$15 = libs.createElement("TextEntry", {
        id: "DemoTextEntry",
        get text() {
          return props.defaultValue;
        }
      }, _el$14);
    libs.setProp(_el$14, "className", "DemoTextEntry");
    libs.setProp(_el$14, "style", {
      flowChildren: "right"
    });
    libs.setProp(_el$14, "onactivate", self => {
      let TextEntry = self.FindChildTraverse("DemoTextEntry");
      FireEvent(props.eventName, TextEntry.text);
      if (props.onClick) {
        props.onClick(TextEntry.text);
      }
    });
    libs.setProp(_el$15, "onload", self => {
      self.SetDisableFocusOnMouseDown(false);
    });
    libs.setProp(_el$15, "oninputsubmit", self => {
      FireEvent(props.eventName, self.text);
      if (props.onClick) {
        props.onClick(self.text);
      }
    });
    libs.effect(_p$ => {
      const _v$6 = props.text,
        _v$7 = props.defaultValue;
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$14, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$15, "text", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$14;
  })();
};
const DemoSelectionButton = props => {
  return (() => {
    const _el$18 = libs.createElement("TextButton", {
      get id() {
        return props.eventName;
      },
      get text() {
        return props.text;
      }
    }, null);
    libs.setProp(_el$18, "className", "DemoButton HotKeyValid ToggleSelection");
    libs.setProp(_el$18, "onactivate", () => {
      ToggleSelection(props.eventName);
    });
    libs.insert(_el$18, libs.createComponent(EOM_Icon.EOM_Icon, {
      type: "ArrowSolidRight",
      width: "10px",
      align: "right center",
      style: {
        marginRight: "4px"
      }
    }));
    libs.effect(_p$ => {
      const _v$8 = props.eventName,
        _v$9 = props.text;
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$18, "id", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$18, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$18;
  })();
};
const SelectionContainer = props => {
  const merged = libs.mergeProps$1({
    canScroll: true
  }, props);
  const [local, others] = libs.splitProps(merged, ["eventName", "title", "itemNames", "toggleList", "defaultLock", "defaultRawMode", "hasRawMode", "hasToggleSize", "hasLock", "hasFilter", "hasDragable", "onSearch", "onToggleType", "onChangeRawMode", "canScroll"]);
  const [lock, setLock] = libs.createSignal(local.defaultLock ?? false);
  const [rawMode, setRawMode] = libs.createSignal(local.defaultRawMode ?? false);
  const [hasToggleList, setHasToggleList] = libs.createSignal(Object.keys(local.toggleList ?? {}).length > 0);
  const [size, setSize] = libs.createSignal({
    width: props.width ?? "864px",
    height: props.height ?? "620px"
  });
  const toggleRawMode = () => {
    setRawMode(!rawMode());
    if (local.onChangeRawMode) {
      local.onChangeRawMode(rawMode());
    }
  };
  const toggleSize = sizeText => {
    setSize({
      width: sizeText[0] + "px",
      height: sizeText[1] + "px"
    });
    SaveConfig({
      ["size_" + local.eventName]: sizeText[0] + "px" + "," + sizeText[1] + "px"
    });
  };
  let dragable = false;
  let dragPanel = undefined;
  const dragStart = panel => {
    if (local.hasDragable != false) {
      dragable = true;
      let parent = panel.FindAncestor(local.eventName);
      if (parent) {
        dragPanel = parent;
        dragTimer();
      }
    }
  };
  const dragTimer = () => {
    if (dragable) {
      if (dragPanel != undefined && dragPanel.IsValid()) {
        if (GameUI.IsMouseDown(0)) {
          let position = GameUI.GetCursorPosition();
          if (dragPanel.offsetX == undefined || dragPanel.offsetY == undefined) {
            dragPanel.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
            dragPanel.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
            dragPanel.style.align = "left top";
            dragPanel.style.margin = "0px 0px 0px 0px";
          }
          if (dragPanel.offsetX != undefined && dragPanel.offsetY != undefined) {
            dragPanel.SetPositionInPixels((position[0] + dragPanel.offsetX) / dragPanel.actualuiscale_x, (position[1] + dragPanel.offsetY) / dragPanel.actualuiscale_y, 0);
          }
        } else {
          dragPanel.offsetX = undefined;
          dragPanel.offsetY = undefined;
        }
        $.Schedule(Game.GetGameFrameTime(), dragTimer);
      }
    } else {
      dragPanel = undefined;
    }
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get id() {
      return local.eventName;
    },
    get className() {
      return libs.classNames("SelectionContainer", {
        LockWindow: lock()
      });
    },
    hittest: true,
    get width() {
      return size().width;
    },
    get height() {
      return size().height;
    },
    get children() {
      const _el$19 = libs.createElement("Panel", {
          id: "SelectionPicker"
        }, null),
        _el$20 = libs.createElement("Panel", {
          id: "SelectionPickerHeader"
        }, _el$19),
        _el$21 = libs.createElement("Panel", {}, _el$20),
        _el$22 = libs.createElement("Panel", {
          id: "SelectionList",
          get style() {
            return {
              overflow: local.canScroll ? "squish scroll" : "clip"
            };
          }
        }, _el$19);
      libs.setProp(_el$20, "onactivate", () => {});
      libs.setProp(_el$20, "onmouseover", self => dragStart(self));
      libs.setProp(_el$20, "onmouseout", self => dragable = false);
      libs.insert(_el$20, libs.createComponent(GenericPanel.CLabel, {
        id: "SelectionTitle",
        get text() {
          return local.title;
        }
      }), _el$21);
      libs.setProp(_el$21, "className", "FillWidth");
      libs.insert(_el$20, (() => {
        const _c$ = libs.memo(() => local.hasFilter != false);
        return () => _c$() && (() => {
          const _el$23 = libs.createElement("Panel", {
              id: "SelectionSearch"
            }, null),
            _el$24 = libs.createElement("TextEntry", {
              id: "SelectionSearchTextEntry",
              get style() {
                return {
                  borderLeftWidth: hasToggleList() ? "0px" : "1px"
                };
              },
              placeholder: "#DOTA_Search"
            }, _el$23);
          libs.setProp(_el$23, "className", "SearchBox");
          libs.insert(_el$23, (() => {
            const _c$5 = libs.memo(() => !!hasToggleList());
            return () => _c$5() && libs.createComponent(EOM_DropDown.EOM_DropDown, {
              placeholder: "筛选",
              onChange: (index, item) => {
                if (local.onToggleType) {
                  local.onToggleType(Object.keys(local.toggleList ?? {})[index - 1]);
                }
              },
              onClear: () => {
                if (local.onToggleType) {
                  local.onToggleType("");
                }
              },
              get children() {
                return [libs.createComponent(GenericPanel.CLabel, {
                  id: "EOM_DropDown_Clear",
                  text: "X 清除筛选"
                }), libs.memo(() => keyof(local.toggleList ?? {}).map((key, _index) => {
                  return libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return local.toggleList?.[key] ?? "";
                    }
                  });
                }))];
              }
            });
          })(), _el$24);
          libs.setProp(_el$24, "onload", self => {
            self.SetDisableFocusOnMouseDown(false);
          });
          libs.setProp(_el$24, "oninputsubmit", self => {
            if (local.onSearch) {
              local.onSearch(self.text);
            }
          });
          libs.setProp(_el$24, "ontextentrychange", self => {
            if (self.text == "") {
              if (local.onSearch) {
                local.onSearch("");
              }
            }
          });
          libs.effect(_$p => libs.setProp(_el$24, "style", {
            borderLeftWidth: hasToggleList() ? "0px" : "1px"
          }, _$p));
          return _el$23;
        })();
      })(), null);
      libs.insert(_el$20, (() => {
        const _c$2 = libs.memo(() => local.hasRawMode != false);
        return () => _c$2() && libs.createComponent(EOM_Panel.EOM_Panel, {
          className: "CodeModeLabel",
          tooltip: "查看内部编码",
          tooltipPosition: "top",
          height: "28px",
          verticalAlign: "center",
          get children() {
            const _el$25 = libs.createElement("TextButton", {
              get text() {
                return rawMode() ? "汉" : "Aa";
              }
            }, null);
            libs.setProp(_el$25, "style", {
              fontSize: "20px",
              width: "27px",
              height: "27px",
              marginTop: "2px"
            });
            libs.setProp(_el$25, "onactivate", () => toggleRawMode());
            libs.effect(_$p => libs.setProp(_el$25, "text", rawMode() ? "汉" : "Aa", _$p));
            return _el$25;
          }
        });
      })(), null);
      libs.insert(_el$20, (() => {
        const _c$3 = libs.memo(() => local.hasToggleSize != false);
        return () => _c$3() && libs.createComponent(EOM_Button.EOM_IconButton, {
          width: "30px",
          tooltip: "切换窗口大小",
          tooltipPosition: "top",
          get icon() {
            return libs.createComponent(EOM_Icon.EOM_Icon, {
              type: "ArrowExpand"
            });
          },
          get children() {
            return libs.createComponent(EOM_DropDown.EOM_DropDown, {
              id: "ToggleSize",
              onChange: (index, item) => {
                toggleSize(item.text.split("x"));
              },
              get children() {
                return [libs.createComponent(GenericPanel.CLabel, {
                  text: "1280x720"
                }), libs.createComponent(GenericPanel.CLabel, {
                  text: "864x620"
                }), libs.createComponent(GenericPanel.CLabel, {
                  text: "620x360"
                }), libs.createComponent(GenericPanel.CLabel, {
                  text: "620x620"
                })];
              }
            });
          }
        });
      })(), null);
      libs.insert(_el$20, (() => {
        const _c$4 = libs.memo(() => local.hasLock != false);
        return () => _c$4() && libs.createComponent(EOM_Button.EOM_IconButton, {
          width: "26px",
          tooltip: "锁定窗口",
          tooltipPosition: "top",
          get className() {
            return libs.classNames("LockIconButton", {
              Unlock: !lock()
            });
          },
          get icon() {
            return libs.createComponent(EOM_Icon.EOM_Icon, {
              type: "LockSmall"
            });
          },
          onactivate: () => setLock(!lock())
        });
      })(), null);
      libs.insert(_el$20, libs.createComponent(EOM_Button.EOM_IconButton, {
        width: "28px",
        tooltip: "关闭窗口",
        tooltipPosition: "top",
        get icon() {
          return libs.createComponent(EOM_Icon.EOM_Icon, {
            type: "XClose"
          });
        },
        onactivate: () => ToggleSelection(local.eventName)
      }), null);
      libs.insert(_el$22, () => props.children);
      libs.effect(_$p => libs.setProp(_el$22, "style", {
        overflow: local.canScroll ? "squish scroll" : "clip"
      }, _$p));
      return _el$19;
    }
  });
};
const EOM_DebugTool_TextPicker = props => {
  const [rawMode, setRawMode] = libs.createSignal(false);
  const [filterWord, setFilterWord] = libs.createSignal("");
  return libs.createComponent(SelectionContainer, {
    get eventName() {
      return props.eventName;
    },
    get title() {
      return props.title;
    },
    hasFilter: true,
    onChangeRawMode: rawMode => setRawMode(rawMode),
    onSearch: text => setFilterWord(text),
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "EOM_DebugTool_TextPicker",
        flowChildren: "right-wrap",
        width: "100%",
        scroll: "y",
        get children() {
          return props.itemNames?.map((itemName, index) => {
            if (filterWord() != "") {
              if (itemName.search(filterWord()) == -1 && $.Localize("#" + itemName).search(filterWord())) {
                return;
              }
            }
            return (() => {
              const _el$26 = libs.createElement("TextButton", {
                get text() {
                  return $.Localize("#" + itemName);
                }
              }, null);
              libs.setProp(_el$26, "className", "EOM_DebugTool_TextPickerItem");
              libs.setProp(_el$26, "onactivate", self => FireEvent(props.eventName, itemName));
              libs.effect(_$p => libs.setProp(_el$26, "text", $.Localize("#" + itemName), _$p));
              return _el$26;
            })();
          });
        }
      });
    }
  });
};
const EOM_DebugTool_ItemPicker = props => {
  const [local, other] = libs.splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
  const [filterWord, setFilterWord] = libs.createSignal("");
  const [toggleType, setToggleType] = libs.createSignal("");
  const [rawMode, setRawMode] = libs.createSignal(false);
  const [shopStyle, setShopStyle] = libs.createSignal(false);
  return libs.createComponent(SelectionContainer, {
    get eventName() {
      return local.eventName;
    },
    get title() {
      return local.title;
    },
    get toggleList() {
      return local.toggleList;
    },
    onSearch: text => setFilterWord(text),
    onToggleType: text => setToggleType(text),
    onChangeRawMode: rawMode => setRawMode(rawMode),
    canScroll: false,
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        width: "100%",
        height: "100%",
        margin: "-6px",
        backgroundColor: "#00000066",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            padding: "5px 10px 5px 10px",
            zIndex: 1,
            overflow: "noclip",
            horizontalAlign: "center",
            style: {
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px"
            },
            backgroundColor: "gradient(linear, 0% 0%, 0% 100%, from(#666666), to(#46637f))",
            get children() {
              const _el$28 = libs.createElement("ToggleButton", {
                text: "商店样式",
                get selected() {
                  return shopStyle();
                }
              }, null);
              libs.setProp(_el$28, "style", {
                width: "120px"
              });
              libs.setProp(_el$28, "onactivate", () => setShopStyle(v => !v));
              libs.effect(_$p => libs.setProp(_el$28, "selected", shopStyle(), _$p));
              return _el$28;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "EOM_DebugTool_AbilityPicker",
            marginTop: "10px",
            paddingTop: "30px",
            flowChildren: "right-wrap",
            width: "100%",
            scroll: "y",
            get children() {
              return local.itemNames?.map((abilityname, index) => {
                if (local.filterFunc) {
                  if (!local.filterFunc(toggleType(), abilityname)) {
                    return;
                  }
                }
                if (filterWord() != "") {
                  if (abilityname.search(new RegExp(filterWord(), "gim")) == -1 && $.Localize("#DOTA_Tooltip_ability_" + abilityname).search(new RegExp(filterWord(), "gim")) == -1) {
                    return;
                  }
                }
                const type = () => {
                  if (abilityname.includes("item_equipment")) {
                    return "neutral";
                  } else {
                    return "artifact";
                  }
                };
                return libs.createComponent(libs.Dynamic, {
                  get component() {
                    return {
                      SHOP: () => libs.createComponent(ShopSpecialCard.ShopSpecialCard, {
                        get type() {
                          return type();
                        },
                        name: abilityname,
                        callback: () => {}
                      }),
                      NORMAL: () => libs.createComponent(EOM_Button.EOM_BaseButton, {
                        className: "EOM_DebugTool_AbilityPickerItem",
                        width: "64px",
                        flowChildren: "down",
                        onactivate: self => FireEvent(local.eventName, abilityname),
                        get children() {
                          return [libs.createComponent(libs.Show, {
                            get when() {
                              return local.eventName == "AddItemButtonPressed";
                            },
                            fallback: () => (() => {
                              const _el$29 = libs.createElement("DOTAItemImage", {
                                itemname: abilityname,
                                showtooltip: true
                              }, null);
                              libs.setProp(_el$29, "itemname", abilityname);
                              return _el$29;
                            })(),
                            get children() {
                              return libs.createComponent(ItemImage.ItemImage, {
                                className: "ItemImage",
                                itemName: abilityname
                              });
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            className: "EOM_DebugTool_AbilityPickerItemName",
                            get text() {
                              return rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname;
                            }
                          })];
                        }
                      })
                    }[shopStyle() ? "SHOP" : "NORMAL"];
                  }
                });
              });
            }
          })];
        }
      });
    }
  });
};
const EOM_DebugTool_CityPicker = props => {
  const [local, other] = libs.splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
  const [filterWord, setFilterWord] = libs.createSignal("");
  const [toggleType, setToggleType] = libs.createSignal("");
  const [rawMode, setRawMode] = libs.createSignal(false);
  return libs.createComponent(SelectionContainer, {
    get eventName() {
      return local.eventName;
    },
    get title() {
      return local.title;
    },
    get toggleList() {
      return local.toggleList;
    },
    onSearch: text => setFilterWord(text),
    onToggleType: text => setToggleType(text),
    onChangeRawMode: rawMode => setRawMode(rawMode),
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "EOM_DebugTool_AbilityPicker",
        flowChildren: "right-wrap",
        width: "100%",
        scroll: "y",
        get children() {
          return local.itemNames?.map((abilityname, index) => {
            if (local.filterFunc) {
              if (!local.filterFunc(toggleType(), abilityname)) {
                return;
              }
            }
            if (filterWord() != "") {
              if (abilityname.search(new RegExp(filterWord(), "gim")) == -1 && $.Localize("#DOTA_Tooltip_ability_" + abilityname).search(new RegExp(filterWord(), "gim")) == -1) {
                return;
              }
            }
            return libs.createComponent(EOM_Button.EOM_BaseButton, {
              className: "EOM_DebugTool_AbilityPickerItem",
              width: "64px",
              flowChildren: "down",
              onactivate: self => FireEvent(local.eventName, abilityname),
              get children() {
                return [libs.createComponent(CityImage.CityImage, {
                  city_name: abilityname,
                  customTooltip: {
                    name: "city_effect",
                    abilityName: abilityname
                  }
                }), libs.createComponent(GenericPanel.CLabel, {
                  className: "EOM_DebugTool_AbilityPickerItemName",
                  get text() {
                    return rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname;
                  }
                })];
              }
            });
          });
        }
      });
    }
  });
};
const EOM_UnitInfo = props => {
  const [unitIndex, setUnitIndex] = libs.createSignal(-1);
  const [position, setPosition] = libs.createSignal("0 0 0");
  const [forward, setForward] = libs.createSignal("0 0 0");
  const Update = () => {
    const portraitEntIndex = Players.GetLocalPlayerPortraitUnit();
    if (portraitEntIndex != -1) {
      const position = Entities.GetAbsOrigin(portraitEntIndex);
      const forward = Entities.GetForward(portraitEntIndex);
      setPosition(`${position[0].toFixed(0)}, ${position[1].toFixed(0)}, ${position[2].toFixed(0)}`);
      setForward(`${forward[0].toFixed(3)}, ${forward[1].toFixed(3)}, ${forward[2].toFixed(3)}`);
      setUnitIndex(portraitEntIndex);
    }
  };
  libs.onMount(() => {
    const timer = setInterval(Update, 100);
    libs.onCleanup(() => clearInterval(timer));
  });
  return libs.createComponent(SelectionContainer, {
    eventName: "EOM_UnitInfo",
    title: "单位信息面板",
    width: "480px",
    height: "620px",
    hasRawMode: false,
    hasToggleSize: false,
    hasFilter: false,
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        flowChildren: "down",
        get children() {
          return [libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return "单位名：" + `(${unitIndex()})${Entities.GetUnitName(unitIndex())}(${Entities.GetClassNameAsCStr(unitIndex())})`;
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return "位置：" + position();
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return "朝向：" + forward();
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return "生命：" + Entities.GetHealth(unitIndex()) + "/" + Entities.GetMaxHealth(unitIndex());
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return "魔法：" + Entities.GetMana(unitIndex()) + "/" + Entities.GetMaxMana(unitIndex());
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return "攻速：" + Entities.GetAttackSpeed(unitIndex()) * 100 + "（攻击间隔：" + Entities.GetBaseAttackTime(unitIndex()).toFixed(2) + "，额外攻速：" + Entities.GetIncreasedAttackSpeed(unitIndex()) + ")";
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            text: "Modifier："
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            height: "300px",
            scroll: "y",
            flowChildren: "down",
            get children() {
              return [...Array(Entities.GetNumBuffs(unitIndex()))].map((_, index) => {
                return libs.createComponent(GenericPanel.CLabel, {
                  get text() {
                    return "		" + Buffs.GetName(unitIndex(), Entities.GetBuff(unitIndex(), index)) + "	" + Buffs.GetStackCount(unitIndex(), Entities.GetBuff(unitIndex(), index));
                  }
                });
              });
            }
          })];
        }
      });
    }
  });
};
const EOM_DebugTool_TraitPicker = props => {
  const [local, other] = libs.splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
  const [filterWord, setFilterWord] = libs.createSignal("");
  const [toggleType, setToggleType] = libs.createSignal("");
  const [rawMode, setRawMode] = libs.createSignal(false);
  const handledList = libs.createMemo(() => {
    const list = {};
    if (local.itemNames && local.itemNames.length > 0) {
      local.itemNames.forEach(name => {
        if (KeyValues.TraitKv[name] && typeof KeyValues.TraitKv[name]?.Round == "number") {
          const round = KeyValues.TraitKv[name].Round;
          if (list[round] == undefined) {
            list[round] = [];
          }
          list[round].push(name);
        }
      });
    }
    return list;
  });
  return libs.createComponent(SelectionContainer, {
    get eventName() {
      return local.eventName;
    },
    get title() {
      return local.title;
    },
    get toggleList() {
      return local.toggleList;
    },
    onSearch: text => setFilterWord(text),
    onToggleType: text => setToggleType(text),
    onChangeRawMode: rawMode => setRawMode(rawMode),
    width: "1400px",
    height: "720px",
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "EOM_DebugTool_TraitPicker",
        flowChildren: "down",
        width: "100%",
        scroll: "y",
        get children() {
          return libs.createComponent(libs.Index, {
            get each() {
              return (() => Object.keys(handledList()).sort((a, b) => Number(a) - Number(b)))();
            },
            children: (round, index) => {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                marginLeft: "20px",
                flowChildren: "down",
                get children() {
                  return [libs.createComponent(EOM_Label.EOM_Label, {
                    marginLeft: "10px",
                    color: "#e7e2c8",
                    fontSize: "28px",
                    textShadow: "0 0 4px 3px #000000",
                    text: "#TopBarRoundC4",
                    get dialogVariables() {
                      return {
                        round: Number(round())
                      };
                    }
                  }), libs.createComponent(EOM_Separator.EOM_Separator, {})];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "right-wrap",
                width: "100%",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return (() => handledList()[Number(round())])();
                    },
                    children: (abilityname, index) => {
                      const hide = () => {
                        if (local.filterFunc) {
                          if (!local.filterFunc(toggleType(), abilityname())) {
                            return true;
                          }
                        }
                        if (filterWord() != "") {
                          if (abilityname().search(new RegExp(filterWord(), "gim")) == -1 && $.Localize("#DOTA_Tooltip_ability_" + abilityname()).search(new RegExp(filterWord(), "gim")) == -1) {
                            return true;
                          }
                        }
                        return false;
                      };
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return !hide();
                        },
                        get children() {
                          return libs.createComponent(EOM_Button.EOM_BaseButton, {
                            className: "EOM_DebugTool_AbilityPickerItem",
                            flowChildren: "down",
                            onactivate: self => FireEvent(local.eventName, abilityname()),
                            get children() {
                              return libs.createComponent(RuneRewardCard.RuneRewardCard, {
                                get trait() {
                                  return abilityname();
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              })];
            }
          });
        }
      });
    }
  });
};

exports.CompilePopups = CompilePopups;
exports.DemoButton = DemoButton;
exports.DemoSelectionButton = DemoSelectionButton;
exports.DemoTextEntry = DemoTextEntry;
exports.DemoToggle = DemoToggle;
exports.EOM_DebugTool = EOM_DebugTool;
exports.EOM_DebugTool_Category = EOM_DebugTool_Category;
exports.EOM_DebugTool_CityPicker = EOM_DebugTool_CityPicker;
exports.EOM_DebugTool_ItemPicker = EOM_DebugTool_ItemPicker;
exports.EOM_DebugTool_TextPicker = EOM_DebugTool_TextPicker;
exports.EOM_DebugTool_TraitPicker = EOM_DebugTool_TraitPicker;
exports.EOM_UnitInfo = EOM_UnitInfo;
exports.FireEvent = FireEvent;
exports.SelectionContainer = SelectionContainer;