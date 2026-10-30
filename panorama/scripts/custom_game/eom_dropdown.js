--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_DropDown', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var GenericPanel = require('./GenericPanel.js');
var EOM_Panel = require('./EOM_Panel.js');

let DotaHud = GameUI.CustomUIConfig()._HUDRoot_;
while (DotaHud.GetParent() != undefined) {
  DotaHud = DotaHud.GetParent();
}
let EOM_DropDownContainer = DotaHud.FindChildTraverse("EOM_DropDownContainer");
if (DotaHud != undefined && EOM_DropDownContainer == undefined) {
  EOM_DropDownContainer = $.CreatePanel("Panel", DotaHud, "EOM_DropDownContainer", {
    style: "width: 100%; height: 100%;"
  });
  EOM_DropDownContainer.visible = false;
  EOM_DropDownContainer.SetPanelEvent("onactivate", () => {
    EOM_DropDownContainer.visible = false;
    console.log("EOM_DropDownMenuShow___");
    EOM_DropDownContainer?.FindChildrenWithClassTraverse("EOM_DropDownMenu").forEach((child, i) => {
      console.log("EOM_DropDownMenuShow___ child", i);
      child.style.maxHeight = "0px";
      child.style.opacity = "0";
      child.SetHasClass("EOM_DropDownMenuShow", false);
    });
  });
}
const EOM_DropDown = props => {
  const mergerd = libs.mergeProps$1({
    id: doUniqueString("EOM_DropDown"),
    menuPosition: "bottom",
    hasClear: false,
    enable: true
  }, props);
  const [local, others] = libs.splitProps(mergerd, ["children", "index", "placeholder", "onChange", "onClear", "id", "menuPosition", "hasClear", "enable"]);
  let resolved = libs.children(() => local.children);
  let selfRef = undefined;
  let myMenu = undefined;
  libs.createEffect(libs.on(() => local.index, _index => {
    if (selfRef) {
      for (let index = 0; index < selfRef.GetChildCount(); index++) {
        const child = selfRef.GetChild(index);
        if (child && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow") {
          child.visible = index == local.index;
        }
      }
    }
  }));
  libs.onMount(() => {
    if (selfRef) {
      for (let index = 0; index < selfRef.GetChildCount(); index++) {
        const child = selfRef.GetChild(index);
        if (child && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow") {
          child.visible = index == local.index;
        }
      }
    }
  });
  libs.onCleanup(() => {
    if (myMenu && myMenu.IsValid()) {
      libs.render(() => [], myMenu);
      myMenu.DeleteAsync(0);
    }
  });
  const onChange = (childIndex, c) => {
    if (local.onChange) {
      local.onChange(childIndex, c);
    }
    if (selfRef) {
      for (let index = 0; index < selfRef.GetChildCount(); index++) {
        const c = selfRef.GetChild(index);
        if (index != childIndex) {
          if (c && c.id != "EOM_DropDown_placeholder" && c.id != "EOM_DropDown_arrow") {
            c.visible = false;
          }
        }
      }
    }
  };
  const onClear = () => {
    if (local.onClear) {
      local.onClear();
    }
  };
  const createDropDown = pBtn => {
    if (myMenu == undefined && selfRef) {
      myMenu = $.CreatePanel("Panel", selfRef, `${local.id}_DropDownMenu`);
      myMenu.AddClass("EOM_DropDownMenu");
      let _resolved = libs.children(() => local.children);
      if (_resolved()) {
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
        for (let childIndex = 0; childIndex < _resolved().length; childIndex++) {
          let content = $.CreatePanel("RadioButton", myMenu, '', {
            class: "EOM_DropDownMenuItem",
            group: "EOM_DropDownMenuItem"
          });
          content.SetPanelEvent("onblur", () => {});
          content.SetPanelEvent("onactivate", () => {
            if (pBtn) {
              for (let index = 0; index < pBtn.GetChildCount(); index++) {
                const c = pBtn.GetChild(index);
                if (c && c.id != "EOM_DropDown_arrow" && c.id != "EOM_DropDown_Clear") {
                  c.visible = index == childIndex;
                  if (c.visible) {
                    onChange(childIndex, c);
                  }
                }
              }
            }
            toggleMenu(pBtn, false);
          });
          libs.render(() => _resolved()[childIndex], content);
        }
      }
      myMenu.SetParent(EOM_DropDownContainer);
      myMenu.style.opacity = "0";
    }
  };
  const toggleMenu = (pBtn, state) => {
    console.log("toggleMenu", state);
    if (myMenu == undefined || !myMenu.IsValid()) {
      createDropDown(pBtn);
    }
    if (pBtn && myMenu?.IsValid()) {
      let my_state = state == undefined ? !myMenu.BHasClass("EOM_DropDownMenuShow") : state;
      EOM_DropDownContainer.visible = my_state;
      myMenu.SetHasClass("EOM_DropDownMenuShow", my_state);
      console.log("EOM_DropDownMenuShow Toggle", my_state);
      if (my_state) {
        myMenu.SetFocus();
        $.Schedule(0.06, () => {
          if (pBtn && myMenu) {
            myMenu.style.opacity = "1";
            myMenu.style.minWidth = Math.max(myMenu.actuallayoutwidth, pBtn.actuallayoutwidth) + "px";
            const childItems = myMenu.FindChildrenWithClassTraverse("EOM_DropDownMenuItem");
            if (childItems && childItems.length > 0) {
              childItems.forEach(item => {
                item.style.width = "100%";
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
      } else {
        myMenu.style.maxHeight = "0px";
        myMenu.style.opacity = "0";
      }
    }
  };
  return (() => {
    const _el$2 = libs.createElement("Button", libs.mergeProps({
        get id() {
          return local.id;
        }
      }, () => EOM_Panel.EOMProps(others, {
        className: libs.classNames("EOM_DropDown", {
          Disable: !local.enable
        })
      })), null),
      _el$3 = libs.createElement("Image", {
        id: "EOM_DropDown_arrow"
      }, _el$2);
    const _ref$ = selfRef;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$2) : selfRef = _el$2;
    libs.spread(_el$2, libs.mergeProps({
      get id() {
        return local.id;
      }
    }, () => EOM_Panel.EOMProps(others, {
      className: libs.classNames("EOM_DropDown", {
        Disable: !local.enable
      })
    }), {
      "onactivate": self => {
        if (!local.enable) {
          return;
        }
        toggleMenu(self);
      }
    }), true);
    libs.insert(_el$2, resolved, _el$3);
    libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
      id: "EOM_DropDown_placeholder",
      get text() {
        return $.Localize(local.index == undefined && local.placeholder ? local.placeholder : "");
      }
    }), _el$3);
    return _el$2;
  })();
};

exports.EOM_DropDown = EOM_DropDown;