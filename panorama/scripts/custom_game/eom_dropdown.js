--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_DropDown', exports); const require = GameUI.__require;

var libs = require('./libs.js');

let menuRoot;
const createDropDownContainer = panel => {
  while (panel.GetParent() != undefined) {
    panel = panel.GetParent();
  }
  let EOM_DropDownContainer = panel.FindChildTraverse("EOM_DropDownContainer");
  if (panel != undefined && EOM_DropDownContainer == undefined) {
    EOM_DropDownContainer = $.CreatePanel("Panel", panel, "EOM_DropDownContainer", {
      style: "width: 100%; height: 100%; z-index: 99999;"
    });
    EOM_DropDownContainer.visible = false;
    EOM_DropDownContainer.SetPanelEvent("onactivate", () => {
      EOM_DropDownContainer.visible = false;
      EOM_DropDownContainer?.FindChildrenWithClassTraverse("EOM_DropDownMenu").forEach(child => {
        child.visible = false;
      });
    });
  }
  menuRoot = EOM_DropDownContainer;
};
function doUniqueString(str) {
  if (GameUI.CustomUIConfig()._Record_UniqueString == undefined) {
    GameUI.CustomUIConfig()._Record_UniqueString = 0;
  }
  let result = "_" + Math.random().toString().substring(2, 8) + GameUI.CustomUIConfig()._Record_UniqueString + "_" + str;
  GameUI.CustomUIConfig()._Record_UniqueString++;
  return result;
}
const EOM_DropDown = props => {
  const mergerd = libs.mergeProps({
    id: doUniqueString("EOM_DropDown"),
    menuPosition: "bottom",
    index: -1,
    hasClear: false
  }, props, {
    class: libs.classNames("EOM_DropDown", props.class, props.type)
  });
  const [local, others] = libs.splitProps(mergerd, ["children", "width", "index", "placeholder", "onSelect", "onChange", "onClear", "type", "menuClass", "id", "menuPosition", "hasClear"]);
  const getCustomWidth = () => {
    if (props.customWidth == undefined) {
      return undefined;
    }
    const widthText = String(props.customWidth).trim();
    const match = widthText.match(/^([0-9]+(?:\.[0-9]+)?)px$/i);
    if (match === null) {
      return undefined;
    }
    return Number(match[1]);
  };
  let selfRef;
  let myMenu;
  const isOptionChild = child => {
    return child != undefined && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow";
  };
  const getOptionChild = (button, targetIndex) => {
    let optionIndex = 0;
    for (let index = 0; index < button.GetChildCount(); index++) {
      const child = button.GetChild(index);
      if (!isOptionChild(child)) {
        continue;
      }
      if (optionIndex === targetIndex) {
        return child;
      }
      optionIndex++;
    }
    return undefined;
  };
  const syncSelectedIndex = selectedIndex => {
    if (selfRef == undefined) {
      return;
    }
    let optionIndex = 0;
    let hasSelected = false;
    for (let index = 0; index < selfRef.GetChildCount(); index++) {
      const child = selfRef.GetChild(index);
      if (!isOptionChild(child)) {
        continue;
      }
      child.visible = optionIndex === selectedIndex;
      hasSelected = hasSelected || child.visible;
      optionIndex++;
    }
    const placeholder = selfRef.FindChildTraverse("EOM_DropDown_placeholder");
    if (placeholder != undefined) {
      placeholder.visible = !hasSelected;
    }
  };
  const commitSelectedIndex = (childIndex, item) => {
    syncSelectedIndex(childIndex);
    local.onChange?.(childIndex, item);
  };
  libs.onMount(() => {
    if (selfRef) {
      syncSelectedIndex(local.index);
      createDropDownContainer(selfRef);
    }
  });
  libs.createEffect(() => {
    syncSelectedIndex(local.index);
  });
  libs.onCleanup(() => {
    if (myMenu && myMenu.IsValid()) {
      myMenu.DeleteAsync(0);
    }
  });
  const onClear = () => {
    if (local.onClear) {
      local.onClear();
    }
  };
  const owner = libs.getOwner();
  const createDropDown = pBtn => {
    if (myMenu == undefined && selfRef) {
      myMenu = $.CreatePanel("Panel", selfRef, `${local.id}_DropDownMenu`);
      myMenu.AddClass("EOM_DropDownMenu");
      if (local.type) myMenu.AddClass(local.type);
      if (local.menuClass) myMenu.AddClass(local.menuClass);
      myMenu.visible = true;
      const childrens = libs.runWithOwner(owner, () => {
        return libs.children(() => local.children).toArray();
      });
      if (childrens) {
        if (local.hasClear) {
          let content = $.CreatePanel("RadioButton", myMenu, 'EOM_DropDown_Clear', {
            class: "EOM_DropDownMenuItem",
            group: "EOM_DropDownMenuItem"
          });
          content.SetPanelEvent("onactivate", () => {
            if (pBtn) {
              for (let index = 0; index < pBtn.GetChildCount(); index++) {
                const c = pBtn.GetChild(index);
                if (c && c.id != "EOM_DropDown_arrow") {
                  c.visible = false;
                }
              }
              onClear();
              pBtn.FindChildTraverse("EOM_DropDown_placeholder").visible = true;
            }
            toggleMenu(pBtn, false);
          });
          libs.render(() => libs.createElement("Label", {
            text: "#DropDown_Clear"
          }, null), content);
        }
        for (let childIndex = 0; childIndex < childrens.length; childIndex++) {
          let content = $.CreatePanel("TabButton", myMenu, '', {
            class: "EOM_DropDownMenuItem",
            group: "EOM_DropDownMenuItem"
          });
          content.SetPanelEvent("onblur", () => {});
          content.SetPanelEvent("onactivate", () => {
            if (pBtn) {
              const selectedChild = getOptionChild(pBtn, childIndex);
              if (selectedChild?.id === "EOM_DropDown_Clear") {
                syncSelectedIndex(-1);
                onClear();
              } else if (selectedChild != undefined && local.onSelect?.(childIndex, selectedChild) !== false) {
                commitSelectedIndex(childIndex, selectedChild);
              }
            }
            toggleMenu(pBtn, false);
          });
          libs.render(() => childrens[childIndex], content);
        }
      }
      let vPos = pBtn.GetPositionWithinWindow();
      let menuPosition = local.menuPosition;
      let y = Math.max(0, menuPosition == "bottom" ? vPos.y + pBtn.actuallayoutheight + 2 : vPos.y - myMenu.actuallayoutheight - 2);
      let maxHeight = Math.max(0, (menuPosition == "bottom" ? Game.GetScreenHeight() - y : vPos.y) - 8);
      myMenu.style.maxHeight = maxHeight / myMenu.actualuiscale_y + "px";
      myMenu.SetPositionInPixels(Game.GetScreenWidth(), Game.GetScreenHeight(), 0);
      if (menuRoot != undefined) {
        myMenu.SetParent(menuRoot);
      }
      myMenu.visible = false;
    }
  };
  const toggleMenu = (pBtn, state) => {
    if (myMenu == undefined || !myMenu.IsValid()) {
      createDropDown(pBtn);
    }
    if (pBtn && myMenu?.IsValid()) {
      myMenu.visible = state == undefined ? !myMenu.visible : state;
      if (menuRoot != undefined) {
        menuRoot.visible = myMenu.visible;
      }
      myMenu.SetHasClass("EOM_DropDownMenuShow", myMenu.visible);
      if (myMenu.visible) {
        myMenu.SetFocus();
        $.Schedule(0.1, () => {
          if (pBtn && myMenu) {
            const customWidth = getCustomWidth();
            const minWidth = customWidth !== undefined ? customWidth : pBtn.actuallayoutwidth / myMenu.actualuiscale_x;
            myMenu.style.minWidth = minWidth + "px";
            if (customWidth !== undefined) {
              myMenu.style.width = customWidth + "px";
            }
            const childItems = myMenu.FindChildrenWithClassTraverse("EOM_DropDownMenuItem");
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
    }
  };
  return (() => {
    const _el$2 = libs.createElement("Button", libs.mergeProps$1({
        get id() {
          return local.id;
        }
      }, others), null),
      _el$3 = libs.createElement("Label", {
        id: "EOM_DropDown_placeholder",
        get text() {
          return local.placeholder && (local.index === undefined || local.index <= 0) ? local.placeholder : "";
        }
      }, _el$2);
      libs.createElement("Image", {
        id: "EOM_DropDown_arrow"
      }, _el$2);
    const _ref$ = selfRef;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$2) : selfRef = _el$2;
    libs.spread(_el$2, libs.mergeProps$1({
      get id() {
        return local.id;
      }
    }, others, {
      "onactivate": self => {
        toggleMenu(self);
      }
    }), true);
    libs.insert(_el$2, () => local.children, _el$3);
    libs.effect(_$p => libs.setProp(_el$3, "text", local.placeholder && (local.index === undefined || local.index <= 0) ? local.placeholder : "", _$p));
    return _el$2;
  })();
};

exports.EOM_DropDown = EOM_DropDown;