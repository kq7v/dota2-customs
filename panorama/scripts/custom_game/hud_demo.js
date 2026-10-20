--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

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
var ShopEffectCard = require('./ShopEffectCard.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_NumberAdjust = require('./EOM_NumberAdjust.js');
var SectIcon = require('./SectIcon.js');
var SectAbility = require('./SectAbility.js');
var netdata_utils = require('./netdata_utils.js');
require('./Heroes.js');
require('./HeroCard.js');
require('./EOM_Portrait.js');
require('./TalentTree.js');

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
  const resolved_children = libs.children(() => props.children);
  const resolved_container = libs.children(() => props.containerElement);
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
    libs.insert(_el$, resolved_container, _el$2);
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
    libs.insert(_el$3, resolved_children, null);
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
  const merged = libs.mergeProps$1({
    col: 2,
    layout: false
  }, props);
  const resolved = libs.children(() => props.children);
  return (() => {
    const _el$9 = libs.createElement("Panel", {}, null),
      _el$0 = libs.createElement("Panel", {}, _el$9),
      _el$1 = libs.createElement("Panel", {}, _el$0),
      _el$10 = libs.createElement("Panel", {}, _el$9);
    libs.setProp(_el$0, "className", "CategoryHeader");
    libs.setProp(_el$0, "style", {
      flowChildren: "right"
    });
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
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return merged.layout;
      },
      get fallback() {
        return libs.createComponent(libs.For, {
          get each() {
            return (() => [...Array(Math.ceil((resolved()?.length ?? 0) / merged.col))])();
          },
          children: (item, index) => {
            let c = () => resolved().slice(index() * merged.col, (index() + 1) * merged.col);
            return (() => {
              const _el$11 = libs.createElement("Panel", {}, null);
              libs.setProp(_el$11, "className", "Row");
              libs.insert(_el$11, c);
              return _el$11;
            })();
          }
        });
      },
      get children() {
        return resolved();
      }
    }));
    libs.effect(_$p => libs.setProp(_el$9, "className", libs.classNames("Category", {
      SingleCol: merged.col <= 1
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
  const [local, others] = libs.splitProps(merged, ["eventName", "title", "itemNames", "toggleList", "defaultLock", "defaultRawMode", "hasRawMode", "hasToggleSize", "hasLock", "hasFilter", "hasDragable", "onSearch", "onToggleType", "onChangeRawMode", "canScroll", "onClose"]);
  const [lock, setLock] = libs.createSignal(local.defaultLock ?? false);
  const [rawMode, setRawMode] = libs.createSignal(local.defaultRawMode ?? false);
  const [hasToggleList] = libs.createSignal(Object.keys(local.toggleList ?? {}).length > 0);
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
          libs.insert(_el$23, libs.createComponent(libs.Show, {
            get when() {
              return hasToggleList();
            },
            get children() {
              return libs.createComponent(EOM_DropDown.EOM_DropDown, {
                placeholder: "筛选",
                onChange: (index, item) => {
                  if (local.onToggleType) {
                    local.onToggleType(Object.keys(local.toggleList)[index - 1]);
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
                  }), libs.createComponent(libs.Index, {
                    get each() {
                      return (() => keyof(local.toggleList ?? {}))();
                    },
                    children: (key, _index) => libs.createComponent(GenericPanel.CLabel, {
                      get text() {
                        return local.toggleList?.[key()] ?? "";
                      }
                    })
                  })];
                }
              });
            }
          }), _el$24);
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
        onactivate: () => {
          ToggleSelection(local.eventName);
          if (local.onClose) {
            local.onClose();
          }
        }
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
    onClose: () => {
      if (props.OnClose) {
        props.OnClose();
      }
    },
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
              libs.setProp(_el$26, "onactivate", self => {
                FireEvent(props.eventName, itemName);
                if (props.OnPick) {
                  props.OnPick(itemName);
                }
              });
              libs.effect(_$p => libs.setProp(_el$26, "text", $.Localize("#" + itemName), _$p));
              return _el$26;
            })();
          });
        }
      });
    }
  });
};
const EOM_DebugTool_AbilityPicker = props => {
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
              onmouseover: self => {
                if (props.customTooltip != undefined) {
                  ShowCustomTooltip(self, props.customTooltip.name, props.customTooltip.params(abilityname));
                }
              },
              onmouseout: self => {
                if (props.customTooltip != undefined) {
                  HideCustomTooltip(self, props.customTooltip.name);
                }
              },
              get children() {
                return [(() => {
                  const _el$27 = libs.createElement("Image", {}, null);
                  libs.effect(_$p => libs.setProp(_el$27, "className", libs.classNames("TreasureImage", "Type_" + (KeyValues.treasure_abilities[abilityname]?.TreasureType ?? 1)), _$p));
                  return _el$27;
                })(), libs.createComponent(GenericPanel.CLabel, {
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
    const timer = setInterval(Update, 1000);
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
        width: "100%",
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
          }), libs.createComponent(EOM_Label.EOM_Label, {
            text: "Modifier："
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            "max-height": "300px",
            scroll: "y",
            flowChildren: "down",
            get children() {
              return [...Array(Entities.GetNumBuffs(unitIndex()))].map((_, index) => {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  paddingRight: "20px",
                  flowChildren: "right",
                  get children() {
                    return [libs.createComponent(EOM_Label.EOM_Label, {
                      marginRight: "40px",
                      verticalAlign: "center",
                      get text() {
                        return "\t" + Buffs.GetName(unitIndex(), Entities.GetBuff(unitIndex(), index));
                      }
                    }), libs.createComponent(EOM_Label.EOM_Label, {
                      verticalAlign: "center",
                      width: "30px",
                      textShadow: "0 0 2px 2 #000",
                      get text() {
                        return Buffs.GetStackCount(unitIndex(), Entities.GetBuff(unitIndex(), index));
                      }
                    })];
                  }
                });
              });
            }
          }), libs.createComponent(EOM_Label.EOM_Label, {
            text: "Ability："
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            "max-height": "300px",
            scroll: "y",
            flowChildren: "down",
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return Entities.GetAbilityCount(unitIndex()) > 0;
                },
                get children() {
                  return [...Array(Entities.GetAbilityCount(unitIndex()))].map((_, index) => {
                    return libs.createComponent(EOM_Label.EOM_Label, {
                      textOverflow: "shrink",
                      get text() {
                        return "\t" + Abilities.GetAbilityName(Entities.GetAbility(unitIndex(), index));
                      }
                    });
                  });
                }
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

const EOM_DebugTool_CardEffectPicker = props => {
  const [rawMode, setRawMode] = libs.createSignal(false);
  const [filterWord, setFilterWord] = libs.createSignal("");
  const [shopStyle, setShopStyle] = libs.createSignal(false);
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
    canScroll: false,
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        width: "100%",
        height: "100%",
        backgroundColor: "#00000066",
        margin: "-6px",
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
              const _el$ = libs.createElement("ToggleButton", {
                text: "商店样式",
                get selected() {
                  return shopStyle();
                }
              }, null);
              libs.setProp(_el$, "style", {
                width: "120px"
              });
              libs.setProp(_el$, "onactivate", () => setShopStyle(v => !v));
              libs.effect(_$p => libs.setProp(_el$, "selected", shopStyle(), _$p));
              return _el$;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "EOM_DebugTool_TextPicker",
            marginTop: "10px",
            paddingTop: "30px",
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
                return libs.createComponent(libs.Dynamic, {
                  get component() {
                    return {
                      SHOP: () => libs.createComponent(ShopEffectCard.ShopEffectCard, {
                        name: itemName,
                        get team_card() {
                          return isGroupMode();
                        },
                        callback: () => {
                          FireEvent(props.eventName, itemName);
                        }
                      }),
                      NORMAL: () => libs.createComponent(EOM_Button.EOM_BaseButton, {
                        get tooltip() {
                          return getCardDescription(itemName);
                        },
                        className: "EOM_DebugTool_TextPickerItem",
                        onactivate: () => FireEvent(props.eventName, itemName),
                        get children() {
                          const _el$2 = libs.createElement("Label", {
                            get text() {
                              return $.Localize("#DOTA_Tooltip_ability_" + itemName);
                            }
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$2, "text", $.Localize("#DOTA_Tooltip_ability_" + itemName), _$p));
                          return _el$2;
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

const EOM_DebugTool_CustomConfigSectPicker = props => {
  const [local, other] = libs.splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "abilityNames"]);
  const [filterWord, setFilterWord] = libs.createSignal("");
  const [toggleType, setToggleType] = libs.createSignal("");
  const [rawMode, setRawMode] = libs.createSignal(false);
  const [selectedSects, setSelectionSects] = libs.createSignal((() => {
    let arr = [];
    return arr;
  })());
  const selectedSectData = libs.createMemo(() => {
    const data = {};
    selectedSects().forEach((level, aid) => {
      data[aid.toString()] = level;
    });
    return data;
  });
  const selectedSectList = libs.createMemo(() => {
    const current_selectedSects = selectedSects();
    const list = {};
    current_selectedSects.forEach((level, aid) => {
      const kv = KeyValues.AbilityUpgradesKv[aid];
      if (kv) {
        const sects = (kv.sect ?? "").split("|");
        sects.forEach(sectName => {
          if (sectName != "") {
            if (list[sectName] == undefined) {
              list[sectName] = {};
            }
            list[sectName][aid] = level;
          }
        });
      }
    });
    return list;
  });
  const selectedSectListKeys = () => Object.keys(selectedSectList());
  const [configGold, setConfigGold] = libs.createSignal(1000);
  const consumption = libs.createMemo(() => {
    let consumption = selectedSects().reduce((pre, level, aid) => {
      if (KeyValues.AbilityUpgradesKv[aid.toString()]?.cost) {
        pre += level * KeyValues.AbilityUpgradesKv[aid.toString()].cost;
      }
      return pre;
    }, 0);
    return consumption;
  });
  const remainingGold = () => configGold() - consumption();
  const modifySects = (aid, add = true) => {
    const kv = KeyValues.AbilityUpgradesKv[aid.toString()];
    if (kv == undefined) return;
    const maxLevel = kv?.MaxLevel ?? 1;
    const current_selectedSects = selectedSects().concat([]);
    if (add) {
      if (current_selectedSects[aid] == undefined || current_selectedSects[aid] < maxLevel) {
        current_selectedSects[aid] = (current_selectedSects[aid] ?? 0) + 1;
      }
    } else {
      if (current_selectedSects[aid] != undefined) {
        current_selectedSects[aid] -= 1;
      }
    }
    if (current_selectedSects[aid] <= 0) {
      delete current_selectedSects[aid];
    }
    setSelectionSects(current_selectedSects);
  };
  let mouseClick = false;
  let mouseType;
  const [selectedAID, setSelectedAID] = libs.createSignal(-1);
  const mouseClickTimerStart = () => {
    mouseClick = false;
    mouseClickTimer();
  };
  const mouseClickTimer = () => {
    if (!mouseClick) {
      if (GameUI.IsMouseDown(0)) {
        mouseType = "Left";
        mouseClick = true;
      } else if (GameUI.IsMouseDown(1)) {
        mouseType = "Right";
        mouseClick = true;
      }
    }
    if (mouseType == "Left" && !GameUI.IsMouseDown(0)) {
      mouseType = undefined;
      mouseClick = false;
      modifySects(selectedAID(), true);
    } else if (mouseType == "Right" && !GameUI.IsMouseDown(1)) {
      mouseType = undefined;
      mouseClick = false;
      modifySects(selectedAID(), false);
    }
    if (selectedAID() != -1) {
      $.Schedule(0.03, mouseClickTimer);
    }
  };
  const rarityKeys = ["n", "r", "sr"];
  const [banListNet, setBanListNet] = libs.createSignal(CustomNetTables.GetTableValue("common", "ban_list"));
  const banList = () => Object.values(banListNet() ?? {});
  const [showBan, setShowBan] = libs.createSignal(false);
  const abilityList = libs.createMemo(() => {
    const current_abilityNames = local.abilityNames;
    const current_banList = banList();
    const current_showBan = showBan();
    if (current_abilityNames) {
      if (current_showBan) {
        return current_abilityNames;
      }
      return current_abilityNames.filter(abilityUpgradeID => {
        if (current_banList.length > 0) {
          for (let index = 0; index < current_banList.length; index++) {
            const banSectName = current_banList[index];
            if (KeyValues.AbilityUpgradesKv[abilityUpgradeID]) {
              if (KeyValues.AbilityUpgradesKv[abilityUpgradeID].sect.indexOf(banSectName) != -1) {
                return false;
              }
            }
          }
        }
        return true;
      });
    }
    return [];
  });
  const abilityList2 = () => {
    return abilityList().filter(abilityUpgradeID => {
      if (local.filterFunc) {
        if (!local.filterFunc(toggleType(), abilityUpgradeID)) {
          return false;
        }
      }
      if (filterWord() != "") {
        if (abilityUpgradeID.search(new RegExp(filterWord(), "gim")) == -1 && $.Localize("#DOTA_Tooltip_ability_mechanics_" + abilityUpgradeID).search(new RegExp(filterWord(), "gim")) == -1) {
          return false;
        }
      }
      return true;
    });
  };
  libs.onMount(() => {
    const netTableIDs = [];
    netTableIDs.push(useNetTableKey("common", "ban_list", data => {
      setBanListNet(data);
    }));
    libs.onCleanup(() => {
      netTableIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const SECT_DATA = {
    [0]: {
      MaxExp: 4
    },
    [1]: {
      MaxExp: 10
    },
    [2]: {
      MaxExp: 20
    },
    [3]: {
      MaxExp: 40
    }
  };
  const SECT_EXP = {
    n: 1,
    r: 2,
    sr: 4
  };
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
    width: "1340px",
    height: "780px",
    hasToggleSize: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "LeftContainer",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "TitleRow",
            get children() {
              return [libs.createComponent(EOM_Label.EOM_Label, {
                verticalAlign: "center",
                id: "Title",
                text: "已选技能"
              }), libs.createComponent(EOM_DropDown.EOM_DropDown, {
                id: "SectConfigFilterDropDown",
                placeholder: "快速配置",
                onChange: (index, item) => {
                  setSelectionSects((() => {
                    const sect = [];
                    if (index == 1) {
                      abilityList().forEach(aid => {
                        if (KeyValues.AbilityUpgradesKv[aid] && (KeyValues.AbilityUpgradesKv[aid].rarity == "n" || KeyValues.AbilityUpgradesKv[aid].rarity == "r")) {
                          sect[Number(aid)] = KeyValues.AbilityUpgradesKv[aid].MaxLevel;
                        }
                      });
                    } else if (index == 2) {
                      abilityList().forEach(aid => {
                        if (KeyValues.AbilityUpgradesKv[aid]) {
                          if (KeyValues.AbilityUpgradesKv[aid].rarity == "r") {
                            sect[Number(aid)] = 1;
                          } else if (KeyValues.AbilityUpgradesKv[aid].rarity == "n") {
                            sect[Number(aid)] = 3;
                          }
                        }
                      });
                    } else if (index == 3) {
                      abilityList().forEach(aid => {
                        if (KeyValues.AbilityUpgradesKv[aid]) {
                          sect[Number(aid)] = KeyValues.AbilityUpgradesKv[aid].MaxLevel;
                        }
                      });
                    }
                    return sect;
                  })());
                },
                onClear: () => {
                  setSelectionSects([]);
                },
                get children() {
                  return [libs.createComponent(GenericPanel.CLabel, {
                    id: "EOM_DropDown_Clear",
                    text: "X 清空"
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "Config1",
                    text: "全普通稀有"
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "Config2",
                    text: "3普通1稀有"
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "Config3",
                    text: "我无敌了"
                  })];
                }
              }), libs.createComponent(EOM_Button.EOM_Button, {
                horizontalAlign: "right",
                color: "Light",
                marginRight: "130px",
                text: "应用配置",
                onactivate: () => {
                  FireEvent("CustomConfigSectAbility", JSON.stringify(selectedSectData()));
                }
              }), libs.createComponent(EOM_Button.EOM_Button, {
                horizontalAlign: "right",
                color: "Gray",
                text: "清空配置",
                onactivate: () => {
                  setSelectionSects([]);
                }
              }), libs.createComponent(EOM_Button.EOM_Button, {
                horizontalAlign: "right",
                color: "Red",
                marginRight: "260px",
                text: "配置所有敌人",
                onactivate: () => {
                  FireEvent("CustomConfigAllEnemySectAbility", JSON.stringify(selectedSectData()));
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            marginBottom: "6px 4px",
            backgroundColor: "#75232322",
            marginTop: "50px",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "down",
                width: "100%",
                scroll: "y",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return selectedSectListKeys();
                    },
                    children: (sectName, _) => {
                      const sectList = () => Object.keys(selectedSectList()[sectName()]);
                      const sect_info = libs.createMemo(() => {
                        const current_sectData = selectedSectList()[sectName()];
                        const info = {
                          level: 0,
                          bonusLevel: 0,
                          exp: 0,
                          maxExp: SECT_DATA[0].MaxExp
                        };
                        Object.entries(current_sectData).forEach(([aid, _level], _index) => {
                          const kv = KeyValues.AbilityUpgradesKv[aid.toString()];
                          if (kv) {
                            const rarity = kv.rarity ?? "n";
                            info.exp += (SECT_EXP[rarity] ?? 0) * _level;
                          }
                        });
                        for (let index = 3; index >= 0; index--) {
                          const maxExp = SECT_DATA[index].MaxExp;
                          if (info.exp >= maxExp) {
                            info.level = index + 1;
                            info.maxExp = maxExp;
                            break;
                          }
                        }
                        return info;
                      });
                      const level = () => sect_info().level;
                      const maxLevel = () => 4 + sect_info().bonusLevel;
                      const exp = () => sect_info().exp;
                      const maxExp = () => sect_info().maxExp;
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "SectListContainer",
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            get className() {
                              return libs.classNames("SectTitle");
                            },
                            get children() {
                              return [" ", (() => {
                                const _el$2 = libs.createElement("Panel", {}, null),
                                  _el$3 = libs.createElement("Panel", {}, _el$2),
                                  _el$4 = libs.createElement("Image", {}, _el$2);
                                libs.setProp(_el$2, "className", "ExpPanel");
                                libs.setProp(_el$3, "className", "ExpProgressBG");
                                libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
                                  className: "ExpProgress",
                                  get width() {
                                    return level() / maxLevel() * 59 + "px";
                                  }
                                }), _el$4);
                                libs.setProp(_el$4, "className", "ExpShield");
                                libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
                                  className: "ExpLabel",
                                  get text() {
                                    return exp();
                                  }
                                }), null);
                                libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
                                  className: "ExpMaxLabel",
                                  get text() {
                                    return "/" + maxExp();
                                  }
                                }), null);
                                return _el$2;
                              })(), libs.createComponent(SectIcon.SectIcon, {
                                get sectName() {
                                  return sectName();
                                },
                                get active() {
                                  return exp() > 0;
                                },
                                get tooltip() {
                                  return "#DOTA_Tooltip_ability_" + sectName();
                                }
                              }), libs.createComponent(EOM_Label.EOM_Label, {
                                marginLeft: "140px",
                                verticalAlign: "center",
                                get text() {
                                  return `#DOTA_Tooltip_ability_${sectName()}`;
                                }
                              })];
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "SectList",
                            get children() {
                              return libs.createComponent(libs.Index, {
                                get each() {
                                  return sectList();
                                },
                                children: (_aid, index) => {
                                  const aid = () => Number(_aid());
                                  const filePath = () => {
                                    const abilityUpgradeInfo = KeyValues.AbilityUpgradesKv?.[aid()];
                                    if (abilityUpgradeInfo) {
                                      return `url('file://{images}/spellicons/${abilityUpgradeInfo.Texture}.png')`;
                                    }
                                    return `url('file://{images}/spellicons/0.png')`;
                                  };
                                  const a_level = () => {
                                    return selectedSectList()[sectName()][aid()] ?? 1;
                                  };
                                  const rarity = () => {
                                    const abilityUpgradeInfo = KeyValues.AbilityUpgradesKv?.[aid()];
                                    let _strRarity = "n";
                                    if (abilityUpgradeInfo) {
                                      _strRarity = abilityUpgradeInfo.rarity;
                                    }
                                    return Math.max(rarityKeys.indexOf(_strRarity), 0);
                                  };
                                  const starCount = () => {
                                    return [5, 3, 1][rarity()] ?? 1;
                                  };
                                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                    className: "HandBookContentPickerItem",
                                    onactivate: () => {
                                      modifySects(aid(), false);
                                    },
                                    get customTooltip() {
                                      return {
                                        name: "sect_ability",
                                        abilityUpgradeID: aid(),
                                        level: a_level()
                                      };
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                        get className() {
                                          return libs.classNames("SectAbilityContainer", "Rarity" + (rarity() + 1));
                                        },
                                        get children() {
                                          return libs.createComponent(EOM_Image.EOM_Image, {
                                            className: "DOTAAbilityImage",
                                            get backgroundImage() {
                                              return filePath();
                                            }
                                          });
                                        }
                                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                        get className() {
                                          return libs.classNames("StarsContainer", {
                                            MaxLevel: starCount() == a_level()
                                          });
                                        },
                                        flowChildren: "right",
                                        get children() {
                                          return libs.createComponent(EOM_Label.EOM_Label, {
                                            get text() {
                                              return `<font color='#acacac'>LV.</font> ${a_level()}`;
                                            },
                                            html: true
                                          });
                                        }
                                      }), libs.createComponent(EOM_Label.EOM_Label, {
                                        get className() {
                                          return libs.classNames("sectName", "Rarity" + (rarity() + 1));
                                        },
                                        get text() {
                                          return `#DOTA_Tooltip_ability_mechanics_${aid()}`;
                                        }
                                      })];
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
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RightContainer",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "TitleRow",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                marginLeft: "20px",
                height: "100%",
                width: "100%",
                marginRight: "20px",
                verticalAlign: "center",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    width: "170px",
                    verticalAlign: "center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        verticalAlign: "center",
                        get text() {
                          return `剩余经济: <font color='${remainingGold() < 0 ? "red" : "white"}'>${remainingGold()}</font>`;
                        },
                        html: true
                      }), libs.createComponent(EOM_Icon.EOM_Icon, {
                        verticalAlign: "center",
                        size: "24",
                        get src() {
                          return getSrcPath("icon/gold_icon.png");
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    marginLeft: "180px",
                    verticalAlign: "center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        verticalAlign: "center",
                        text: `预设经济: `
                      }), libs.createComponent(EOM_NumberAdjust.EOM_NumberAdjust, {
                        verticalAlign: "center",
                        get value() {
                          return configGold();
                        },
                        onChange: (self, prev, change) => {
                          if (change != undefined) setConfigGold(change);
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    width: "150px",
                    align: "right center",
                    flowChildren: "right",
                    get children() {
                      const _el$ = libs.createElement("ToggleButton", {
                        text: "显示禁用流派",
                        get selected() {
                          return showBan();
                        }
                      }, null);
                      libs.setProp(_el$, "onactivate", self => {
                        setShowBan(v => !v);
                      });
                      libs.effect(_$p => libs.setProp(_el$, "selected", showBan(), _$p));
                      return _el$;
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            marginBottom: "6px 4px",
            backgroundColor: "#013b7222",
            marginTop: "50px",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "right-wrap",
                width: "100%",
                scroll: "y",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return abilityList2();
                    },
                    children: (abilityUpgradeID, index) => {
                      const abilityUpgradeInfo = () => GameUI.CustomUIConfig().AbilityUpgradesKv[abilityUpgradeID()];
                      const rarity = () => abilityUpgradeInfo()?.rarity ?? "n";
                      return libs.createComponent(EOM_Button.EOM_BaseButton, {
                        className: "EOM_DebugTool_AbilityPickerItem",
                        width: "64px",
                        flowChildren: "down",
                        onmouseover: () => {
                          setSelectedAID(Number(abilityUpgradeID()));
                          mouseClickTimerStart();
                        },
                        onmouseout: () => {
                          setSelectedAID(-1);
                          mouseClick = true;
                        },
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            "class": "AbilityContainer",
                            get customTooltip() {
                              return {
                                name: "sect_ability",
                                abilityUpgradeID: abilityUpgradeID()
                              };
                            },
                            get children() {
                              return libs.createComponent(GenericPanel.CImage, {
                                className: "DOTAAbilityImage",
                                get src() {
                                  return `file://{images}/spellicons/${abilityUpgradeInfo().Texture}.png`;
                                }
                              });
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            get className() {
                              return libs.classNames("EOM_DebugTool_AbilityPickerItemName", rarity());
                            },
                            get text() {
                              return libs.memo(() => !!rawMode())() ? abilityUpgradeID() : "#DOTA_Tooltip_ability_mechanics_" + abilityUpgradeID();
                            }
                          })];
                        }
                      });
                    }
                  });
                }
              });
            }
          })];
        }
      })];
    }
  });
};

const EOM_DebugTool_GameSectesPicker = props => {
  const [rawMode, setRawMode] = libs.createSignal(false);
  const [filterWord, setFilterWord] = libs.createSignal("");
  libs.createSignal(false);
  const limitCount = 8;
  const [selectedSect, setSelectedSect] = libs.createSignal([]);
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
    canScroll: false,
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        width: "100%",
        height: "100%",
        backgroundColor: "#00000066",
        margin: "-6px",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "110px",
            backgroundColor: "gradient(linear, 0% 0%, 0% 100%, from(#66666688), to(#66666611))",
            flowChildren: "down",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                padding: "5px 10px 5px 10px",
                zIndex: 1,
                height: "40px",
                overflow: "noclip",
                horizontalAlign: "center",
                style: {
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
                },
                backgroundColor: "gradient(linear, 0% 0%, 0% 100%, from(#666666), to(#46637f))",
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    color: "Blue",
                    style: {
                      width: "120px",
                      height: "30px"
                    },
                    margin: "0px",
                    text: "应用",
                    onactivate: () => FireEvent(props.eventName, selectedSect().join("|"))
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                horizontalAlign: "center",
                flowChildren: "right",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return selectedSect();
                    },
                    children: (sectName, i) => libs.createComponent(SectIcon.SectIcon, {
                      get sectName() {
                        return sectName();
                      },
                      onactivate: self => {
                        setSelectedSect(v => {
                          return v.filter(v => v != sectName());
                        });
                      }
                    })
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "EOM_DebugTool_TextPicker",
            marginTop: "10px",
            paddingTop: "110px",
            flowChildren: "right-wrap",
            width: "100%",
            scroll: "y",
            get children() {
              return props.itemNames?.map((itemName, index) => {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  get enabled() {
                    return !selectedSect().includes(itemName);
                  },
                  onactivate: self => {
                    if (!selectedSect().includes(itemName)) {
                      setSelectedSect(v => {
                        if (v.length >= limitCount) {
                          v.splice(0, 1);
                        }
                        return v.concat([itemName]);
                      });
                    }
                  },
                  get children() {
                    return libs.createComponent(SectIcon.SectIcon, {
                      sectName: itemName
                    });
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

const EOM_DebugTool_GreevilEffectPicker = props => {
  const [filterWord, setFilterWord] = libs.createSignal("");
  const [shopStyle, setShopStyle] = libs.createSignal(false);
  return libs.createComponent(SelectionContainer, {
    get eventName() {
      return props.eventName;
    },
    get title() {
      return props.title;
    },
    hasFilter: true,
    onSearch: text => setFilterWord(text),
    canScroll: false,
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        width: "100%",
        height: "100%",
        backgroundColor: "#00000066",
        margin: "-6px",
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
              const _el$ = libs.createElement("ToggleButton", {
                text: "商店样式",
                get selected() {
                  return shopStyle();
                }
              }, null);
              libs.setProp(_el$, "style", {
                width: "120px"
              });
              libs.setProp(_el$, "onactivate", () => setShopStyle(v => !v));
              libs.effect(_$p => libs.setProp(_el$, "selected", shopStyle(), _$p));
              return _el$;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "EOM_DebugTool_TextPicker",
            marginTop: "10px",
            paddingTop: "30px",
            flowChildren: "right-wrap",
            width: "100%",
            scroll: "y",
            get children() {
              return props.itemNames?.map((effectName, index) => {
                if (filterWord() != "") {
                  if (effectName.search(filterWord()) == -1 && $.Localize("#DOTA_Tooltip_ability_" + effectName).search(filterWord()) == -1) {
                    return;
                  }
                }
                return libs.createComponent(libs.Dynamic, {
                  get component() {
                    return {
                      SHOP: () => libs.createComponent(ShopEffectCard.GreevilShopCard, {
                        Id: index,
                        type: "greevil_effect",
                        value: effectName,
                        rarity: 1,
                        cost: 0,
                        onClick: () => FireEvent(props.eventName, effectName)
                      }),
                      NORMAL: () => libs.createComponent(EOM_Button.EOM_BaseButton, {
                        className: "EOM_DebugTool_TextPickerItem",
                        onactivate: () => FireEvent(props.eventName, effectName),
                        get children() {
                          const _el$2 = libs.createElement("Label", {
                            get text() {
                              return $.Localize("#DOTA_Tooltip_ability_" + effectName);
                            }
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$2, "text", $.Localize("#DOTA_Tooltip_ability_" + effectName), _$p));
                          return _el$2;
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

const EOM_DebugTool_SectPicker = props => {
  const [local, other] = libs.splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "abilityNames"]);
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
        backgroundColor: "#00000066",
        margin: "-6px",
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
              const _el$ = libs.createElement("ToggleButton", {
                text: "商店样式",
                get selected() {
                  return shopStyle();
                }
              }, null);
              libs.setProp(_el$, "style", {
                width: "120px"
              });
              libs.setProp(_el$, "onactivate", () => setShopStyle(v => !v));
              libs.effect(_$p => libs.setProp(_el$, "selected", shopStyle(), _$p));
              return _el$;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "EOM_DebugTool_AbilityPicker",
            marginTop: "10px",
            paddingTop: "30px",
            flowChildren: "right-wrap",
            width: "100%",
            scroll: "y",
            get children() {
              return local.abilityNames?.map((abilityUpgradeID, index) => {
                if (local.filterFunc) {
                  if (!local.filterFunc(toggleType(), abilityUpgradeID)) {
                    return;
                  }
                }
                if (filterWord() != "") {
                  if (abilityUpgradeID.search(new RegExp(filterWord(), "gim")) == -1 && $.Localize("#DOTA_Tooltip_ability_mechanics_" + abilityUpgradeID).search(new RegExp(filterWord(), "gim")) == -1) {
                    return;
                  }
                }
                const abilityUpgradeInfo = GameUI.CustomUIConfig().AbilityUpgradesKv[abilityUpgradeID];
                return libs.createComponent(libs.Dynamic, {
                  get component() {
                    return {
                      SHOP: () => libs.createComponent(ShopSpecialCard.ShopAbilityCard, {
                        playerGold: 999,
                        name: abilityUpgradeID,
                        level: 0,
                        soldOut: false,
                        isLock: false,
                        onClick: self => FireEvent(local.eventName, abilityUpgradeID)
                      }),
                      NORMAL: () => libs.createComponent(EOM_Button.EOM_BaseButton, {
                        className: "EOM_DebugTool_AbilityPickerItem",
                        width: "64px",
                        flowChildren: "down",
                        onactivate: self => FireEvent(local.eventName, abilityUpgradeID),
                        customTooltip: {
                          name: "sect_ability",
                          abilityUpgradeID: abilityUpgradeID
                        },
                        get children() {
                          return [libs.createComponent(GenericPanel.CImage, {
                            className: "DOTAAbilityImage",
                            get src() {
                              return `file://{images}/spellicons/${abilityUpgradeInfo.Texture}.png`;
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            className: "EOM_DebugTool_AbilityPickerItemName",
                            get text() {
                              return rawMode() ? abilityUpgradeID : "#DOTA_Tooltip_ability_mechanics_" + abilityUpgradeID;
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

const EOM_DebugTool_OutsiderItemPicker = props => {
  const [rawMode, setRawMode] = libs.createSignal(false);
  const [filterWord, setFilterWord] = libs.createSignal("");
  const fastAddItem = () => {
    let filterList = [];
    const current_ornamentData = ornamentData();
    if (current_ornamentData != undefined) {
      filterList = Object.keys(current_ornamentData);
    }
    if (props.itemNames) {
      props.itemNames.filter(id => !filterList.includes(id)).forEach(itemName => {
        console.log("props.eventName", itemName);
        FireEvent(props.eventName, itemName);
      });
    }
  };
  const [ornamentData, setOrnamentData] = libs.createSignal();
  libs.onMount(() => {
    const id = useNetData("player_ornament", data => {
      setOrnamentData(data);
    }, Players.GetLocalPlayer());
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
  });
  return libs.createComponent(SelectionContainer, {
    get eventName() {
      return props.eventName;
    },
    get title() {
      return props.title;
    },
    hasFilter: true,
    canScroll: false,
    onChangeRawMode: rawMode => setRawMode(rawMode),
    onSearch: text => setFilterWord(text),
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "EOM_DebugTool_TextPicker",
        flowChildren: "right-wrap",
        width: "100%",
        marginBottom: "50px",
        height: "90%",
        scroll: "y",
        get children() {
          return props.itemNames?.map((itemName, index) => {
            if (filterWord() != "") {
              if (itemName.search(filterWord()) == -1 && $.Localize("#" + itemName).search(filterWord())) {
                return;
              }
            }
            return (() => {
              const _el$2 = libs.createElement("TextButton", {
                get text() {
                  return $.Localize("#" + itemName);
                }
              }, null);
              libs.setProp(_el$2, "className", "EOM_DebugTool_TextPickerItem");
              libs.setProp(_el$2, "onactivate", self => FireEvent(props.eventName, itemName));
              libs.effect(_$p => libs.setProp(_el$2, "text", $.Localize("#" + itemName), _$p));
              return _el$2;
            })();
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        align: "center bottom",
        width: "100%",
        marginBottom: "-10px",
        marginRight: "-10px",
        marginLeft: "-6px",
        height: "50px",
        backgroundColor: "gradient(linear, 0% 0%, 0% 25%, from(#23232666), to(#1c1d2066))",
        style: {
          border: "2px solid #32383677",
          boxShadow: "#00000099 0px 0px 8px 0px"
        },
        get children() {
          const _el$ = libs.createElement("TextButton", {
            id: "fastAddOutsideItem",
            text: "一键配置"
          }, null);
          libs.setProp(_el$, "style", {
            width: "102px",
            align: "right center",
            marginRight: "20px"
          });
          libs.setProp(_el$, "onactivate", () => fastAddItem());
          libs.effect(_$p => libs.setProp(_el$, "className", libs.classNames("DemoButton", "HotKeyValid", "FireEvent"), _$p));
          return _el$;
        }
      })];
    }
  });
};

function getSettings(context) {
  return {
    stage: context.stage,
    tier: context.tier,
    compensateGoldCard: context.compensateGoldCard,
    guaranteeHighestReward: context.guaranteeHighestReward,
    forcedEquipmentLevel: context.forcedEquipmentLevel,
    eurekaUpgradeCount: context.eurekaUpgradeCount
  };
}
function describeSettings(context) {
  return `阶段 ${context.stage} / 档位 ${context.tier} / 金卡补偿 ${context.compensateGoldCard ? '开' : '关'} / 最高奖励保底 ${context.guaranteeHighestReward ? '开' : '关'} / 强制装备 ${context.forcedEquipmentLevel ?? '无'} / 尤里卡 ${context.eurekaUpgradeCount}`;
}
function DebugChoice(props) {
  return libs.createComponent(GenericPanel.CTextButton, {
    className: "DebugChoice",
    get enabled() {
      return !props.disabled;
    },
    get text() {
      return `${props.title}：${props.value}  ›`;
    },
    onactivate: () => props.onChange(props.options[(props.options.indexOf(props.value) + 1) % props.options.length])
  });
}
function DebugToggle(props) {
  return libs.createComponent(GenericPanel.CTextButton, {
    className: "DebugChoice",
    get classList() {
      return {
        Active: props.value
      };
    },
    get enabled() {
      return !props.disabled;
    },
    get text() {
      return `${props.title}：${props.value ? '开' : '关'}`;
    },
    onactivate: () => props.onChange(!props.value)
  });
}
function DebugPackage(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {}, null);
    libs.setProp(_el$, "className", "DebugPackage");
    libs.insert(_el$, libs.createComponent(GenericPanel.CLabel, {
      className: "DebugSectionTitle",
      get text() {
        return `${props.title}${props.value?.special ? ' · 特殊组合' : ''}`;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.value;
      },
      get fallback() {
        return libs.createComponent(GenericPanel.CLabel, {
          className: "DebugHint",
          get text() {
            return props.emptyText ?? '暂无结果';
          }
        });
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {}, null);
        libs.setProp(_el$2, "className", "DebugRewards");
        libs.insert(_el$2, libs.createComponent(libs.For, {
          get each() {
            return Object.values(props.value?.displaySlots ?? {});
          },
          children: slot => {
            const abilities = () => slot.type == 'ability' ? Object.values(slot.abilities ?? [slot.ability]) : [];
            const name = () => {
              if (slot.type == 'gold') return `${slot.amount} 金币`;
              if (slot.type == 'ability') return abilities().map(aid => GetLocalization(`#DOTA_Tooltip_ability_mechanics_${aid}`)).join(' + ');
              return GetLocalization(`#DOTA_Tooltip_ability_${slot.type == 'rune' ? slot.trait : slot.item}`);
            };
            const tooltip = () => {
              if (slot.type == 'ability') return {
                name: 'roshan_reward',
                ability_list: JSON.stringify(abilities()),
                playerID: Players.GetLocalPlayer()
              };
              if (slot.type == 'equipment') return {
                name: 'equipment',
                itemname: slot.item
              };
              if (slot.type == 'artifact' || slot.type == 'rune') return {
                name: 'trait_ability',
                ability_name: slot.type == 'rune' ? slot.trait : slot.item
              };
              return undefined;
            };
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              get className() {
                return `DebugReward ${slot.uiRarity}`;
              },
              get customTooltip() {
                return tooltip();
              },
              get children() {
                return [libs.createComponent(GenericPanel.CLabel, {
                  className: "DebugSlot",
                  get text() {
                    return `原槽位 ${slot.shopSlot ?? '?'}${slot.eurekaUpgraded ? ' · 尤里卡强化' : ''}`;
                  }
                }), (() => {
                  const _el$3 = libs.createElement("Panel", {}, null);
                  libs.setProp(_el$3, "className", "DebugIcons");
                  libs.insert(_el$3, libs.createComponent(libs.For, {
                    get each() {
                      return abilities();
                    },
                    children: aid => libs.createComponent(SectAbility.SectAbilityImage, {
                      sectAbilityID: aid
                    })
                  }), null);
                  libs.insert(_el$3, libs.createComponent(libs.Show, {
                    get when() {
                      return slot.type == 'equipment';
                    },
                    get children() {
                      const _el$4 = libs.createElement("DOTAItemImage", {
                        get itemname() {
                          return slot.item;
                        },
                        showtooltip: false
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$4, "itemname", slot.item, _$p));
                      return _el$4;
                    }
                  }), null);
                  libs.insert(_el$3, libs.createComponent(libs.Show, {
                    get when() {
                      return slot.type == 'artifact' || slot.type == 'rune';
                    },
                    get children() {
                      const _el$5 = libs.createElement("DOTAAbilityImage", {
                        get abilityname() {
                          return slot.type == 'rune' ? slot.trait : slot.item;
                        },
                        showtooltip: false
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$5, "abilityname", slot.type == 'rune' ? slot.trait : slot.item, _$p));
                      return _el$5;
                    }
                  }), null);
                  libs.insert(_el$3, libs.createComponent(libs.Show, {
                    get when() {
                      return slot.type == 'gold';
                    },
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        className: "DebugGold",
                        get text() {
                          return `${slot.amount}`;
                        }
                      });
                    }
                  }), null);
                  return _el$3;
                })(), libs.createComponent(GenericPanel.CLabel, {
                  className: "DebugRewardName",
                  get text() {
                    return name();
                  }
                })];
              }
            });
          }
        }));
        return _el$2;
      }
    }), null);
    return _el$;
  })();
}
function TreasureDebugPanel() {
  const localPlayerID = Players.GetLocalPlayer();
  const playerData = netdata_utils.createNetTable('player_data', localPlayerID.toString());
  const targetPlayerID = libs.createMemo(() => isSpectator() ? GameUI.GetSpectatorViewingInfo().player_id : playerData()?.viewPlayerInfo?.player_id ?? localPlayerID);
  const [formal, setFormal] = libs.createSignal();
  const [health, setHealth] = libs.createSignal();
  const [response, setResponse] = libs.createSignal();
  const [settings, setSettings] = libs.createSignal();
  const [ignorePrevious, setIgnorePrevious] = libs.createSignal(false);
  const [pending, setPending] = libs.createSignal(false);
  const [error, setError] = libs.createSignal('');
  const [showDetails, setShowDetails] = libs.createSignal(false);
  const [poolTab, setPoolTab] = libs.createSignal('weights');
  const [historySource, setHistorySource] = libs.createSignal('test');
  const [historyUsage, setHistoryUsage] = libs.createSignal('input');
  const [historyIndex, setHistoryIndex] = libs.createSignal(0);
  const session = () => response()?.session;
  const disabled = () => pending() || settings() == undefined;
  const pendingPackage = () => formal()?.selected ? undefined : formal()?.package;
  const displayedHistory = libs.createMemo(() => {
    if (historySource() == 'formal') {
      return pendingPackage() ? [pendingPackage(), formal()?.previousPackage] : [];
    }
    const history = historyUsage() == 'input' ? session()?.last?.history : session()?.history;
    return Object.values(history ?? {});
  });
  const historyTitle = () => {
    const round = historyIndex() == 0 ? '最近一组' : '再前一组';
    if (historySource() == 'formal') return `正式历史 · ${historyIndex() == 0 ? '当前待选' : '前一组'} · 实时只读`;
    if (historyUsage() == 'next') return `测试历史 · 下次刷新基准 · ${round}`;
    return `测试历史 · 本次抽选输入 · ${round}${session()?.last?.ignorePrevious ? ' · 本次未参与排除' : ''}`;
  };
  const historyEmptyText = () => {
    if (historySource() == 'formal' && !pendingPackage()) return formal()?.selected ? '本轮正式结果已领取' : '当前无正式待选结果';
    if (historyIndex() == 1) return '暂无上两轮记录';
    return historySource() == 'test' && historyUsage() == 'input' ? '尚未模拟，或本次为初次抽取，无历史输入' : '暂无历史，可初次抽取或加载正式两轮历史';
  };
  let sessionID = '';
  let requestID = 0;
  let generation = 0;
  let requestTimer;
  function request(action) {
    if (pending() && action != 'reset') return;
    requestID++;
    setPending(true);
    setError('');
    clearTimeout(requestTimer);
    requestTimer = setTimeout(() => {
      setPending(false);
      setError('测试请求未收到响应，请检查开发环境并重新初始化。');
    }, 10000);
    FireEvent('TreasureDebug', JSON.stringify({
      sessionID,
      requestID,
      targetPlayerID: targetPlayerID(),
      action,
      settings: settings(),
      ignorePrevious: ignorePrevious()
    }));
  }
  function editSettings(patch) {
    setSettings(value => ({
      ...value,
      ...patch
    }));
    if (patch.stage != undefined) request('stage');
  }
  libs.onMount(() => {
    const dataListener = useNetData('treasure_debug', data => {
      if (data.sessionID != sessionID || data.requestID != requestID || data.targetPlayerID != targetPlayerID()) return;
      clearTimeout(requestTimer);
      setPending(false);
      setError(data.error ?? '');
      setResponse(data);
      if (data.session && !data.error) setSettings(getSettings(data.session.context));
    }, localPlayerID);
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(dataListener);
      clearTimeout(requestTimer);
    });
    libs.createEffect(libs.on(targetPlayerID, id => {
      generation++;
      sessionID = `${Date.now()}:${generation}`;
      clearTimeout(requestTimer);
      setPending(false);
      setError('');
      setResponse(undefined);
      setSettings(undefined);
      setIgnorePrevious(false);
      setHistorySource('test');
      setHistoryUsage('input');
      setHistoryIndex(0);
      setFormal(getSyncDataKey('common', 'treasure', id));
      const targetData = CustomNetTables.GetTableValue('player_data', id.toString());
      setHealth(targetData?.health);
      let waitingForHero = targetData?.heroEntIndex == undefined;
      const formalListener = useSyncDataKey('common', 'treasure', setFormal, id);
      const healthListener = useNetTableKey('player_data', id.toString(), value => {
        setHealth(value?.health);
        if (waitingForHero && value?.heroEntIndex != undefined) {
          waitingForHero = false;
          request('reset');
        }
      });
      if (!waitingForHero) request('reset');
      libs.onCleanup(() => {
        CustomNetTables.UnsubscribeNetTableListener(formalListener);
        CustomNetTables.UnsubscribeNetTableListener(healthListener);
      });
    }));
  });
  const poolText = libs.createMemo(() => {
    const context = session()?.context;
    if (!context) return '';
    switch (poolTab()) {
      case 'weights':
        return JSON.stringify({
          slotWeights: context.slotWeights,
          goldCardCompensationWeights: context.goldCardCompensationWeights
        }, null, 2);
      case 'treasures':
        return JSON.stringify(context.treasures, null, 2);
      case 'abilities':
        return JSON.stringify(context.abilityPools, null, 2);
      case 'equipment':
        return JSON.stringify(context.equipmentPools, null, 2);
      case 'last':
        return JSON.stringify(session()?.last?.context ?? {}, null, 2);
    }
  });
  const tabs = [{
    key: 'weights',
    title: '阶段权重'
  }, {
    key: 'treasures',
    title: '秘宝候选池'
  }, {
    key: 'abilities',
    title: '技能候选池'
  }, {
    key: 'equipment',
    title: '装备候选池'
  }, {
    key: 'last',
    title: '本次完整上下文'
  }];
  return libs.createComponent(SelectionContainer, {
    eventName: "TreasureDebugPanel",
    title: "黑市刷新测试",
    width: "1120px",
    height: "820px",
    hasFilter: false,
    hasRawMode: false,
    hasToggleSize: false,
    get children() {
      const _el$6 = libs.createElement("Panel", {}, null),
        _el$7 = libs.createElement("Panel", {}, _el$6),
        _el$8 = libs.createElement("Panel", {}, _el$6),
        _el$9 = libs.createElement("Panel", {}, _el$6),
        _el$0 = libs.createElement("Panel", {}, _el$6),
        _el$1 = libs.createElement("Panel", {}, _el$6),
        _el$10 = libs.createElement("Panel", {}, _el$1),
        _el$12 = libs.createElement("Panel", {}, _el$1);
      libs.setProp(_el$6, "className", "TreasureDebugContent");
      libs.setProp(_el$7, "className", "DebugRow");
      libs.insert(_el$7, libs.createComponent(GenericPanel.CLabel, {
        className: "DebugTitle",
        get text() {
          return `目标玩家 ${targetPlayerID()} · ${Players.GetPlayerName(targetPlayerID())} · 实际血量 ${health() ?? '—'}`;
        }
      }), null);
      libs.insert(_el$7, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        text: "重新初始化",
        onactivate: () => request('reset')
      }), null);
      libs.insert(_el$6, libs.createComponent(GenericPanel.CLabel, {
        className: "DebugHint",
        text: "仅模拟结果；血量档位不改变实际血量及秘宝血量条件。点击参数可切换取值。"
      }), _el$8);
      libs.insert(_el$6, libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!(!settings() && !pending()))() && !error();
        },
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            className: "DebugHint",
            text: "等待目标英雄就绪后自动读取上下文。"
          });
        }
      }), _el$8);
      libs.insert(_el$6, libs.createComponent(libs.Show, {
        get when() {
          return error();
        },
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            className: "DebugError",
            get text() {
              return error();
            }
          });
        }
      }), _el$8);
      libs.setProp(_el$8, "className", "DebugRow");
      libs.insert(_el$8, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        text: "恢复正式上下文",
        get enabled() {
          return !disabled();
        },
        onactivate: () => request('restore')
      }), null);
      libs.insert(_el$8, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        text: "加载正式两轮历史",
        get enabled() {
          return libs.memo(() => !!!disabled())() && pendingPackage() != undefined;
        },
        onactivate: () => request('load_previous')
      }), null);
      libs.insert(_el$8, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction Primary",
        text: "初次抽取",
        get enabled() {
          return !disabled();
        },
        onactivate: () => request('initial')
      }), null);
      libs.insert(_el$8, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction Primary",
        text: "模拟整组刷新",
        get enabled() {
          return libs.memo(() => !!!disabled())() && (Object.values(session()?.history ?? {}).length > 0 || ignorePrevious());
        },
        onactivate: () => request('refresh')
      }), null);
      libs.setProp(_el$9, "className", "DebugRow");
      libs.insert(_el$9, libs.createComponent(DebugChoice, {
        title: "阶段",
        get value() {
          return settings()?.stage ?? 1;
        },
        get options() {
          return Object.values(response()?.stages ?? []);
        },
        get disabled() {
          return disabled();
        },
        onChange: stage => editSettings({
          stage
        })
      }), null);
      libs.insert(_el$9, libs.createComponent(DebugChoice, {
        title: "血量档位",
        get value() {
          return settings()?.tier ?? 1;
        },
        options: [1, 2, 3, 4, 5],
        get disabled() {
          return disabled();
        },
        onChange: tier => editSettings({
          tier
        })
      }), null);
      libs.insert(_el$9, libs.createComponent(DebugChoice, {
        title: "强制装备（0=无）",
        get value() {
          return settings()?.forcedEquipmentLevel ?? 0;
        },
        get options() {
          return [0, ...Object.values(response()?.equipmentLevels ?? [])];
        },
        get disabled() {
          return disabled();
        },
        onChange: value => editSettings({
          forcedEquipmentLevel: value == 0 ? undefined : value
        })
      }), null);
      libs.insert(_el$9, libs.createComponent(DebugChoice, {
        title: "尤里卡次数",
        get value() {
          return settings()?.eurekaUpgradeCount ?? 0;
        },
        options: [0, 1, 2, 3, 4],
        get disabled() {
          return disabled();
        },
        onChange: eurekaUpgradeCount => editSettings({
          eurekaUpgradeCount
        })
      }), null);
      libs.setProp(_el$0, "className", "DebugRow");
      libs.insert(_el$0, libs.createComponent(DebugToggle, {
        title: "无金卡补偿",
        get value() {
          return settings()?.compensateGoldCard ?? false;
        },
        get disabled() {
          return disabled();
        },
        onChange: compensateGoldCard => editSettings({
          compensateGoldCard
        })
      }), null);
      libs.insert(_el$0, libs.createComponent(DebugToggle, {
        title: "最高奖励保底",
        get value() {
          return settings()?.guaranteeHighestReward ?? false;
        },
        get disabled() {
          return disabled();
        },
        onChange: guaranteeHighestReward => editSettings({
          guaranteeHighestReward
        })
      }), null);
      libs.insert(_el$0, libs.createComponent(DebugToggle, {
        title: "忽略两轮历史",
        get value() {
          return ignorePrevious();
        },
        get disabled() {
          return disabled();
        },
        onChange: setIgnorePrevious
      }), null);
      libs.insert(_el$6, libs.createComponent(GenericPanel.CLabel, {
        className: "DebugHint",
        text: "档位：1=41及以上，2=31–40，3=21–30，4=11–20，5=10及以下。忽略历史仍保留同组去重，并正常推进测试历史。"
      }), _el$1);
      libs.insert(_el$6, libs.createComponent(libs.Show, {
        get when() {
          return session()?.last;
        },
        children: last => [libs.createComponent(GenericPanel.CLabel, {
          className: "DebugSectionTitle",
          get text() {
            return `最近一次：${last().mode == 'initial' ? '初次抽取' : '整组刷新'} · ${last().ignorePrevious ? '忽略两轮历史' : '使用正常排除规则'}`;
          }
        }), libs.createComponent(GenericPanel.CLabel, {
          className: "DebugHint",
          get text() {
            return describeSettings(last().context);
          }
        }), libs.createComponent(DebugPackage, {
          title: "本次模拟结果",
          get value() {
            return last().result;
          }
        })]
      }), _el$1);
      libs.setProp(_el$1, "className", "DebugHistory");
      libs.setProp(_el$10, "className", "DebugRow");
      libs.insert(_el$10, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        get classList() {
          return {
            Active: historySource() == 'test'
          };
        },
        text: "测试历史",
        onactivate: () => setHistorySource('test')
      }), null);
      libs.insert(_el$10, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        get classList() {
          return {
            Active: historySource() == 'formal'
          };
        },
        text: "正式历史",
        onactivate: () => setHistorySource('formal')
      }), null);
      libs.insert(_el$1, libs.createComponent(libs.Show, {
        get when() {
          return historySource() == 'test';
        },
        get children() {
          const _el$11 = libs.createElement("Panel", {}, null);
          libs.setProp(_el$11, "className", "DebugRow");
          libs.insert(_el$11, libs.createComponent(GenericPanel.CTextButton, {
            className: "DebugAction",
            get classList() {
              return {
                Active: historyUsage() == 'input'
              };
            },
            text: "本次抽选输入",
            onactivate: () => setHistoryUsage('input')
          }), null);
          libs.insert(_el$11, libs.createComponent(GenericPanel.CTextButton, {
            className: "DebugAction",
            get classList() {
              return {
                Active: historyUsage() == 'next'
              };
            },
            text: "下次刷新基准",
            onactivate: () => setHistoryUsage('next')
          }), null);
          return _el$11;
        }
      }), _el$12);
      libs.setProp(_el$12, "className", "DebugRow");
      libs.insert(_el$12, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        get classList() {
          return {
            Active: historyIndex() == 0
          };
        },
        get text() {
          return historySource() == 'formal' ? '当前待选' : '最近一组';
        },
        onactivate: () => setHistoryIndex(0)
      }), null);
      libs.insert(_el$12, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        get classList() {
          return {
            Active: historyIndex() == 1
          };
        },
        get text() {
          return historySource() == 'formal' ? '前一组' : '再前一组';
        },
        onactivate: () => setHistoryIndex(1)
      }), null);
      libs.insert(_el$1, libs.createComponent(DebugPackage, {
        get title() {
          return historyTitle();
        },
        get value() {
          return displayedHistory()[historyIndex()];
        },
        get emptyText() {
          return historyEmptyText();
        }
      }), null);
      libs.insert(_el$6, libs.createComponent(GenericPanel.CTextButton, {
        className: "DebugAction",
        get text() {
          return showDetails() ? '收起只读上下文' : '展开只读上下文与候选池';
        },
        onactivate: () => setShowDetails(value => !value)
      }), null);
      libs.insert(_el$6, libs.createComponent(libs.Show, {
        get when() {
          return showDetails();
        },
        get children() {
          return [libs.createComponent(GenericPanel.CLabel, {
            className: "DebugHint",
            text: "权重和秘宝池来自当前测试上下文；技能与装备池在恢复条件或模拟时读取真实玩家状态，尚未应用两轮历史和同组排除。"
          }), (() => {
            const _el$13 = libs.createElement("Panel", {}, null);
            libs.setProp(_el$13, "className", "DebugRow");
            libs.insert(_el$13, libs.createComponent(libs.For, {
              each: tabs,
              children: tab => libs.createComponent(GenericPanel.CTextButton, {
                className: "DebugAction",
                get classList() {
                  return {
                    Active: poolTab() == tab.key
                  };
                },
                get text() {
                  return tab.title;
                },
                onactivate: () => setPoolTab(tab.key)
              })
            }));
            return _el$13;
          })(), libs.createComponent(GenericPanel.CLabel, {
            className: "DebugPoolText",
            get text() {
              return poolText();
            }
          })];
        }
      }), null);
      return _el$6;
    }
  });
}

if (Players.GetTeam(Players.GetLocalPlayer()) == DOTATeam_t.DOTA_TEAM_BADGUYS) {
  [GameUI.GetSpectatorViewingInfo, GameUI.SetSpectatorViewingInfo] = libs.createSignal((() => {
    const playerData = CustomNetTables.GetAllTableValues("player_data");
    let player_id = 0;
    if (playerData != undefined && playerData.length > 0) {
      player_id = Number(playerData[0].key);
    }
    return {
      player_id,
      illusion: false
    };
  })());
}
function Demo() {
  const [demoSetting, _setDemoSetting] = libs.createSignal(CustomNetTables.GetTableValue("common", "demo_settings"));
  const [setting, _setSetting] = libs.createSignal(CustomNetTables.GetTableValue("common", "settings"));
  const tooltipList = ["hero_ability", "buff_detail", "sect_ability", "keyword_list", "player_info", "equipment", "player_sect_list", "talent_tree", "medal_info", "hotkey_tip", "player_profile", "ladder_info", "ladder_player_profile", "custom_text", "attribute_detail", "proficiency_progress", "city_effect", "card_effect", "cosmetic_tooltip", "long_text", "hero_ban", "rune_reward", "treasure_list", "roshan_reward", "trait_task", "gold_info", "hero_detail", "shard_ability", "reward_tooltip", "forge_attribute", "greevil_card", "greevil_ability", "greevil_record", "trait_ability", "carnival_hero_tip"];
  const getItemList = () => {
    let items = [];
    for (const sItemName in GameUI.CustomUIConfig().ItemsKv) {
      if (sItemName != "Version") {
        const tItemData = GameUI.CustomUIConfig().ItemsKv[sItemName];
        if (typeof tItemData != "object") continue;
        if (tItemData.ItemRecipe && Number(tItemData.ItemRecipe) == 1) continue;
        if (sItemName.indexOf("item_equipment_") == -1) continue;
        items.push(sItemName);
      }
    }
    items.sort((a, b) => {
      if ($.Localize("#DOTA_Tooltip_ability_" + a) > $.Localize("#DOTA_Tooltip_ability_" + b)) {
        return 1;
      } else if ($.Localize("#DOTA_Tooltip_ability_" + a) < $.Localize("#DOTA_Tooltip_ability_" + b)) {
        return -1;
      }
      return 0;
    });
    return items;
  };
  const getItemToggleList = () => {
    let itemToggleList = {};
    for (const sItemName in GameUI.CustomUIConfig().ItemsKv) {
      if (sItemName != "Version") {
        const tItemData = GameUI.CustomUIConfig().ItemsKv[sItemName];
        if (typeof tItemData != "object") continue;
        if (tItemData.ItemRecipe && Number(tItemData.ItemRecipe) == 1) continue;
        if (sItemName.indexOf("item_equipment_") == -1) continue;
        itemToggleList[tItemData.ItemLevel] = `第${tItemData.ItemLevel}级`;
      }
    }
    return itemToggleList;
  };
  const itemFilter = (toggleType, itemName) => {
    if (toggleType == "") return true;
    return toggleType == GameUI.CustomUIConfig().ItemsKv[itemName].ItemLevel;
  };
  const getUnitList = () => {
    let units = [];
    for (const sUnitName in GameUI.CustomUIConfig().UnitsKv) {
      if (sUnitName != "Version") {
        const tAbilityData = GameUI.CustomUIConfig().UnitsKv[sUnitName];
        if (typeof tAbilityData != "object") continue;
        units.push(sUnitName);
      }
    }
    return units;
  };
  const getCommonHeroList = () => {
    let units = [];
    for (const sUnitName in GameUI.CustomUIConfig().UnitsCommonKv) {
      if (sUnitName != "Version") {
        const tAbilityData = GameUI.CustomUIConfig().UnitsCommonKv[sUnitName];
        if (typeof tAbilityData != "object") continue;
        if (typeof tAbilityData.Hid != "number") continue;
        units.push(sUnitName);
      }
    }
    return units;
  };
  const getSectList = () => {
    return Object.keys(GameUI.CustomUIConfig().AbilityUpgradesKv);
  };
  const sectToggleList = {
    "sect_attack": "普攻流",
    "sect_evade": "闪避流",
    "sect_crit": "暴击流",
    "sect_health": "生命流",
    "sect_regen": "回复流",
    "sect_ulti": "大招流",
    "sect_poison": "中毒流",
    "sect_ice": "寒霜流",
    "sect_fury": "怒火流",
    "sect_shield": "护盾流",
    "sect_injury": "易伤流",
    "sect_wisp": "精灵流",
    "sect_chaos": "混沌流"
  };
  const sectFilterFunc = (toggleType, abilityUpgradeID) => {
    if (GameUI.CustomUIConfig().AbilityUpgradesKv[abilityUpgradeID]) {
      if (GameUI.CustomUIConfig().AbilityUpgradesKv[abilityUpgradeID].sect.indexOf(toggleType) != -1) {
        return true;
      }
    }
    return false;
  };
  const getArtifactList = () => {
    let items = [];
    for (const sItemName in GameUI.CustomUIConfig().ItemsKv) {
      if (sItemName != "Version") {
        const tItemData = GameUI.CustomUIConfig().ItemsKv[sItemName];
        if (typeof tItemData != "object") continue;
        if (tItemData.ItemRecipe && Number(tItemData.ItemRecipe) == 1) continue;
        if (sItemName.indexOf("item_artifact_") == -1) continue;
        items.push(sItemName);
      }
    }
    items.sort((a, b) => {
      if ($.Localize("#DOTA_Tooltip_ability_" + a) > $.Localize("#DOTA_Tooltip_ability_" + b)) {
        return 1;
      } else if ($.Localize("#DOTA_Tooltip_ability_" + a) < $.Localize("#DOTA_Tooltip_ability_" + b)) {
        return -1;
      }
      return 0;
    });
    return items;
  };
  const getSkinList = () => {
    return Object.keys(KeyValues.CosmeticsKv).filter(id => id.indexOf("510") == 0 || id.indexOf("511") == 0);
  };
  const getCourierList = () => {
    return Object.keys(KeyValues.CosmeticsKv).filter(id => id.slice(0, 3) == "520");
  };
  const getCityList = () => {
    return Object.keys(KeyValues.CityEffectKv);
  };
  const positionList = ["player_home_0", "player_home_1", "player_home_2", "player_home_3", "player_home_4", "player_home_5", "player_home_6", "player_home_7", "neutral_camp_0", "neutral_camp_1", "neutral_camp_2", "neutral_camp_3", "neutral_camp_4", "neutral_camp_5", "neutral_camp_6", "neutral_camp_7", "battle_field_8_1", "battle_field_8_2", "battle_field_8_3", "battle_field_8_4", "battle_field_6_1", "battle_field_6_2", "battle_field_6_3", "battle_field_4_1", "battle_field_4_2", "battle_field_2_1"];
  const battleFieldList = ["base_tilemap_1", "base_sonw_map", "base_dragon_map_1", "base_void_map", "base_0001_map", "base_0002_map", "base_0003_map", "base_0004_map", "base_0005_map", "base_0006_map", "base_0007_map", "base_0008_map", "base_0009_map", "base_0010_map", "base_0011_map", "base_0012_map", "base_0013_map", "base_0014_map", "base_0015_map", "base_0016_map", "base_0017_1_map", "base_0017_2_map", "base_0018_map", "base_0019_map", "base_0020_map", "base_0021_map", "base_0022_map", "base_0023_map", "base_0024_map", "base_0025_map", "base_0026_map", "base_0027_map", "base_0028_map", "base_0029_map", "base_0030_map"];
  const itemList = getItemList();
  const unitList = getUnitList();
  const commonHeroList = getCommonHeroList();
  const sectList = getSectList();
  const artifactList = getArtifactList();
  const skinList = getSkinList();
  const courierList = getCourierList();
  const cityList = getCityList();
  const cardList = Object.keys(isGroupMode() ? KeyValues.TeamCardKv : KeyValues.CardEffectKv);
  const traitList = Object.keys(KeyValues.TraitKv).filter(v => KeyValues.TraitKv[v]?.IsHidden != 1);
  const greevilEffectList = Object.keys(KeyValues.GreevilEffectKV);
  const treasureList = Object.keys(GameUI.CustomUIConfig().treasure_abilities);
  const [infoProp, setInfoProp] = libs.createSignal({});
  const animationListr = ["ACT_DOTA_SPAWN", "ACT_DOTA_ATTACK", "ACT_DOTA_IDLE", "ACT_DOTA_CAST_ABILITY_1", "ACT_DOTA_RUN", "ACT_DOTA_VICTORY", "ACT_DOTA_DIE"];
  libs.onMount(() => {
    const eventIdList = [];
    eventIdList.push(useNetData("info_prop", data => {
      setInfoProp(data);
    }));
    libs.onCleanup(() => {
      eventIdList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  function SetHeroBattleLive(unit) {
    SetCosmeticPreviewLive(unit, true);
    let hide = unit != undefined;
    let p = $.GetContextPanel();
    while (p?.IsValid() && !p.BHasClass("CustomHudRoot")) {
      p.GetParent();
    }
    if (p) {
      let pParent = p.GetParent();
      if (pParent) {
        let count = pParent?.GetChildCount();
        for (let index = 0; index < count; index++) {
          const child = pParent.GetChild(index);
          if (child?.IsValid() && child.BHasClass("CosmeticPreviewLiveHidden")) {
            child.visible = !hide;
          }
        }
      }
    }
  }
  GameEvents.SendCustomEventToServer;
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "demo_settings") {
        _setDemoSetting(v);
      } else if (k === "settings") {
        _setSetting(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return setting()?.is_in_tools_mode == 1 || setting()?.is_cheat_mode == 1;
    },
    get children() {
      return libs.createComponent(EOM_DebugTool, {
        direction: "left",
        get containerElement() {
          return [libs.createComponent(EOM_DebugTool_ItemPicker, {
            title: "添加物品",
            eventName: "AddItemButtonPressed",
            itemNames: itemList,
            get toggleList() {
              return getItemToggleList();
            },
            filterFunc: itemFilter
          }), libs.createComponent(EOM_DebugTool_ItemPicker, {
            title: "添加神器",
            eventName: "AddArtifactButtonPressed",
            itemNames: artifactList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "创建友方单位",
            eventName: "CreateAllyButtonPressed",
            itemNames: unitList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "创建敌方单位",
            eventName: "CreateEnemyButtonPressed",
            itemNames: unitList
          }), libs.createComponent(EOM_DebugTool_SectPicker, {
            title: "添加流派",
            eventName: "AddSectButtonPressed",
            abilityNames: sectList,
            toggleList: sectToggleList,
            filterFunc: sectFilterFunc
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "更换英雄",
            eventName: "ChangeHeroButtonPressed",
            itemNames: commonHeroList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "英雄战斗预览",
            eventName: "PreviewHeroBattle",
            itemNames: commonHeroList,
            OnClose: () => {
              SetHeroBattleLive();
            },
            OnPick: name => {
              SetHeroBattleLive(name);
            }
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "更换饰品",
            eventName: "ChangeSkinButtonPressed",
            itemNames: skinList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "更换信使",
            eventName: "ChangeCourierButtonPressed",
            itemNames: courierList
          }), libs.createComponent(EOM_DebugTool_TraitPicker, {
            title: "更换天陨旦",
            eventName: "ChangeTraitButtonPressed",
            itemNames: traitList
          }), libs.createComponent(EOM_DebugTool_CardEffectPicker, {
            title: "添加神符",
            eventName: "AddRuneButtonPressed",
            itemNames: cardList
          }), libs.createComponent(EOM_DebugTool_AbilityPicker, {
            title: "添加黑市藏品",
            eventName: "AddTreasureButtonPressed",
            itemNames: treasureList,
            customTooltip: {
              name: "trait_ability",
              params: ability_name => ({
                ability_name
              })
            }
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "跳转到特定区域",
            eventName: "TeleportButtonPressed",
            itemNames: positionList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "切换战场",
            eventName: "SwitchBattleField",
            itemNames: battleFieldList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "指定野怪",
            eventName: "NeutralSelection",
            get itemNames() {
              return Object.keys(KeyValues.UnitsNeutralKv);
            }
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "背包道具",
            eventName: "BackpackItem",
            get itemNames() {
              return Object.keys(infoProp());
            }
          }), libs.createComponent(EOM_DebugTool_OutsiderItemPicker, {
            title: "局外物品",
            eventName: "Service_AddItem",
            get itemNames() {
              return Object.keys(KeyValues.CosmeticsKv);
            }
          }), libs.createComponent(EOM_DebugTool_CustomConfigSectPicker, {
            title: "自定义流派技能",
            eventName: "CustomConfigEnemySectButtonPress",
            abilityNames: sectList,
            filterFunc: sectFilterFunc,
            toggleList: sectToggleList
          }), libs.createComponent(EOM_DebugTool_TextPicker, {
            title: "播放动作",
            eventName: "AnimationButtonPress",
            itemNames: animationListr
          }), libs.createComponent(EOM_DebugTool_CityPicker, {
            title: "更换地域",
            eventName: "ChangeCityEffectButtonPressed",
            itemNames: cityList
          }), libs.createComponent(EOM_DebugTool_CardEffectPicker, {
            title: "效果卡片",
            eventName: "CardEffectButtonPressed",
            itemNames: cardList
          }), libs.createComponent(EOM_DebugTool_GreevilEffectPicker, {
            title: "贪魔效果",
            eventName: "GreevilEffectButtonPressed",
            itemNames: greevilEffectList
          }), libs.createComponent(EOM_DebugTool_GameSectesPicker, {
            title: "游戏流派",
            eventName: "PickSectButtonPressed",
            get itemNames() {
              return Object.keys(sectToggleList);
            }
          }), libs.createComponent(EOM_UnitInfo, {}), libs.createComponent(TreasureDebugPanel, {})];
        },
        get children() {
          return [libs.createComponent(EOM_DebugTool_Category, {
            title: "游戏",
            get children() {
              return [libs.createComponent(DemoTextEntry, {
                eventName: "ChangeHostTimescale",
                text: "主机速度"
              }), libs.createComponent(DemoButton, {
                eventName: "NextStateButtonPressed",
                color: "GreenButton",
                text: "下一阶段"
              }), libs.createComponent(DemoToggle, {
                eventName: "LockCameraPauseButtonPressed",
                text: "锁定镜头",
                get selected() {
                  return demoSetting()?.lock_camera == 1;
                }
              }), libs.createComponent(DemoToggle, {
                eventName: "ToggleStatePauseButtonPressed",
                text: "暂停阶段",
                get selected() {
                  return demoSetting()?.is_pause == 1;
                }
              }), libs.createComponent(DemoButton, {
                eventName: "ReturnMenuButtonPressed",
                color: "RedButton",
                text: "回到菜单"
              }), libs.createComponent(DemoTextEntry, {
                eventName: "ChangeRound",
                text: "调整回合"
              }), libs.createComponent(DemoToggle, {
                eventName: "ToggleAIButtonPressed",
                text: "开启AI",
                get selected() {
                  return demoSetting()?.enable_ai == 1;
                }
              }), libs.createComponent(DemoButton, {
                eventName: "StandbyButtonPressed",
                text: "备用按钮"
              }), libs.createComponent(DemoButton, {
                eventName: "StandbyButtonPressed2",
                text: "匹配算法"
              }), libs.createComponent(DemoTextEntry, {
                eventName: "SetCameraDistance",
                text: "镜头距离",
                defaultValue: "1200",
                onClick: text => {
                  let value = Number(text);
                  if (value != undefined && !Number.isNaN(value)) {
                    GameUI.SetCameraDistance(value);
                  }
                }
              }), libs.createComponent(DemoTextEntry, {
                eventName: "SetCameraDistance",
                text: "镜头高度",
                defaultValue: "0",
                onClick: text => {
                  let value = Number(text);
                  if (value != undefined && !Number.isNaN(value)) {
                    GameUI.SetCameraLookAtPositionHeightOffset(value);
                  }
                }
              }), libs.createComponent(DemoTextEntry, {
                eventName: "SetCameraYaw",
                text: "镜头角度",
                defaultValue: "0",
                onClick: text => {
                  let value = Number(text);
                  if (value != undefined && !Number.isNaN(value)) {
                    GameUI.SetCameraYaw(value);
                  }
                }
              }), libs.createComponent(DemoTextEntry, {
                eventName: "SetCameraPitch",
                text: "镜头俯仰",
                defaultValue: "60",
                onClick: text => {
                  let value = Number(text);
                  if (value != undefined && !Number.isNaN(value)) {
                    GameUI.SetCameraPitchMin(value);
                    GameUI.SetCameraPitchMax(value);
                  }
                }
              }), libs.createComponent(DemoTextEntry, {
                eventName: "ChangeCameraYOffset",
                text: "焦点距离",
                onClick: text => {
                  let value = Number(text);
                  if (value != undefined && !Number.isNaN(value)) {
                    GameUI.SetCameraLookAtPositionHeightOffset(value);
                  }
                }
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "SwitchBattleField",
                text: "切换战场"
              }), libs.createComponent(DemoTextEntry, {
                eventName: "ModifyHealth",
                text: "调整血量"
              }), libs.createComponent(DemoButton, {
                eventName: "TestUI",
                text: "测试UI",
                onactivate: () => {}
              }), libs.createComponent(DemoToggle, {
                eventName: "TestSoundButtonPressed",
                text: "测试音效",
                get selected() {
                  return demoSetting()?.test_sound == 1;
                }
              })];
            }
          }), libs.createComponent(EOM_DebugTool_Category, {
            title: "技能和物品",
            get children() {
              return [libs.createComponent(DemoSelectionButton, {
                eventName: "AddItemButtonPressed",
                text: "添加装备"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "AddArtifactButtonPressed",
                text: "添加神器"
              }), libs.createComponent(DemoToggle, {
                eventName: "ForgeSourceBuyDisabled",
                text: "禁购买给点"
              }), libs.createComponent(DemoToggle, {
                eventName: "ForgeSourceLegendaryDisabled",
                text: "禁传说给点"
              }), libs.createComponent(DemoToggle, {
                eventName: "ForgeSourceMaxLevelDisabled",
                text: "禁满级给点"
              }), libs.createComponent(DemoToggle, {
                eventName: "ForgeSourceLevelUpDisabled",
                text: "禁升级给点"
              }), libs.createComponent(DemoButton, {
                eventName: "RemoveInventoryItemsButtonPressed",
                text: "移除物品栏的物品"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "AddSectButtonPressed",
                text: "添加流派"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "CustomConfigEnemySectButtonPress",
                text: "自定义流派技能"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "AnimationButtonPress",
                text: "播放动作"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "ChangeCityEffectButtonPressed",
                text: "更换地域"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "CardEffectButtonPressed",
                text: "效果卡片"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "GreevilEffectButtonPressed",
                text: "贪魔效果"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "AddRuneButtonPressed",
                text: "添加神符"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "AddTreasureButtonPressed",
                text: "添加黑市藏品"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "TreasureDebugPanel",
                text: "黑市刷新测试"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "PickSectButtonPressed",
                text: "游戏流派"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "ChangeTraitButtonPressed",
                text: "更换天陨旦"
              }), libs.createComponent(DemoButton, {
                eventName: "DeBugClearTalent",
                text: "清空天赋"
              })];
            }
          }), libs.createComponent(EOM_DebugTool_Category, {
            title: "英雄",
            get children() {
              return [libs.createComponent(DemoButton, {
                eventName: "RefreshButtonPressed",
                text: "刷新状态"
              }), libs.createComponent(DemoToggle, {
                eventName: "FreeSpellsButtonPressed",
                text: "无限技能",
                get selected() {
                  return demoSetting()?.free_spells == 1;
                }
              }), libs.createComponent(DemoTextEntry, {
                eventName: "LevelUpButtonPressed",
                text: "升级"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "ChangeHeroButtonPressed",
                text: "更换英雄"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "ChangeSkinButtonPressed",
                text: "更换饰品"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "ChangeCourierButtonPressed",
                text: "更换信使"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "PreviewHeroBattle",
                text: "英雄战斗预览"
              })];
            }
          }), libs.createComponent(EOM_DebugTool_Category, {
            title: "单位",
            get children() {
              return [libs.createComponent(DemoButton, {
                eventName: "RemoveSpawnedUnitsButtonPressed",
                text: "移除目标"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "NeutralSelection",
                text: "指定野怪"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "CreateAllyButtonPressed",
                text: "创建友方单位"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "CreateEnemyButtonPressed",
                text: "创建敌方单位"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "ServiceSelection",
                text: "创建敌方单位"
              }), libs.createComponent(DemoButton, {
                eventName: "ControlUnitButtonPressed",
                text: "切换控制权"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "EOM_UnitInfo",
                text: "单位信息面板"
              })];
            }
          }), libs.createComponent(EOM_DebugTool_Category, {
            title: "后端",
            get children() {
              return [libs.createComponent(DemoSelectionButton, {
                eventName: "Service_AddItem",
                text: "添加物品"
              }), libs.createComponent(DemoSelectionButton, {
                eventName: "BackpackItem",
                text: "添加背包道具"
              }), []];
            }
          }), libs.createComponent(EOM_DebugTool_Category, {
            title: "其他",
            get children() {
              return [libs.createComponent(DemoButton, {
                eventName: "RefreshServicePressed",
                text: "更新后端数据"
              }), libs.createComponent(DemoButton, {
                eventName: "ReloadScriptButtonPressed",
                color: "GreenButton",
                text: "重载脚本"
              }), libs.createComponent(DemoToggle, {
                eventName: "GameTimeFrozenButtonPressed",
                text: "冻结游戏",
                get selected() {
                  return demoSetting()?.is_frozen == 1;
                }
              }), libs.createComponent(DemoButton, {
                eventName: "CompilePopups",
                text: "编译Popups",
                onactivate: () => CompilePopups(tooltipList)
              })];
            }
          })];
        }
      });
    }
  });
}
libs.render(() => libs.createComponent(Demo, {}), $.GetContextPanel());