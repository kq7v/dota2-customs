--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

let targetPanel;
const [menus, setMenus] = libs.createSignal(undefined, {
  equals: () => false
});
const [offset, setOffset] = libs.createSignal([1, 0]);
CustomUIConfig.showContextMenu = (panel, menus, offest = [1, 0]) => {
  targetPanel = panel;
  libs.batch(() => {
    setMenus(menus);
    setOffset(offest);
  });
};
const ContextMenu = () => {
  const dismiss = () => {
    setMenus();
    targetPanel = undefined;
  };
  const updatePosition = pSelf => {
    if (!pSelf || !pSelf.IsValid()) return;
    if (!targetPanel || !targetPanel.IsValid()) return;
    let aTargetInfo = targetPanel.GetPositionWithinWindow();
    let offestXY = offset();
    let x = aTargetInfo.x + targetPanel.actuallayoutwidth * offestXY[0];
    let y = aTargetInfo.y + targetPanel.actuallayoutheight * offestXY[1];
    if (!(isFinite(x) && isFinite(y))) {
      return;
    }
    let fScreenWidth = Game.GetScreenWidth();
    let fScreenHeight = Game.GetScreenHeight();
    let newPos = [x, y, 0];
    if (y < 0) {
      newPos[1] = 0;
    }
    if (x + pSelf.actuallayoutwidth > fScreenWidth) {
      newPos[0] = aTargetInfo.x - pSelf.actuallayoutwidth;
    }
    if (y + pSelf.actuallayoutheight > fScreenHeight) {
      newPos[1] = fScreenHeight - pSelf.actuallayoutheight;
    }
    if (x < 0) {
      newPos[0] = aTargetInfo.x + targetPanel.actuallayoutwidth;
    }
    newPos[0] /= pSelf.actualuiscale_x;
    newPos[1] /= pSelf.actualuiscale_y;
    pSelf.SetPositionInPixels(...newPos);
  };
  let root;
  libs.createEffect(libs.on(menus, _menus => {
    if (!root) return;
    if (!_menus) {
      root.ClearPanelEvent("onactivate");
      root.ClearPanelEvent("oncancel");
      root.ClearPanelEvent("oncontextmenu");
      root.hittest = false;
      return;
    }
    root.hittest = true;
    root.SetPanelEvent("onactivate", () => {
      dismiss();
    });
    root.SetPanelEvent("oncancel", () => {
      dismiss();
    });
    root.SetPanelEvent("oncontextmenu", () => {
      dismiss();
    });
  }));
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "ContextMenuRoot"
    }, null);
    const _ref$ = root;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$) : root = _el$;
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return menus();
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
          id: "ContextMenuList"
        }, null);
        libs.setProp(_el$2, "onload", p => {
          p.style.opacity = "0.0001";
          const wait = () => {
            if (!p.IsValid()) return;
            if (!p.IsSizeValid()) {
              $.Schedule(0, wait);
              return;
            }
            updatePosition(p);
            p.ClearPropertyFromCode("opacity");
            p.style.opacity = "1";
          };
          wait();
        });
        libs.insert(_el$2, libs.createComponent(libs.For, {
          get each() {
            return Object.keys(menus());
          },
          children: s => {
            return libs.createComponent(EOM_Button.EOM_Button, {
              size: "Small",
              horizontalAlign: "center",
              id: s,
              onactivate: () => {
                menus()[s]();
                dismiss();
              },
              get children() {
                const _el$3 = libs.createElement("Label", {
                  get text() {
                    return GetLocalization(s);
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$3, "text", GetLocalization(s), _$p));
                return _el$3;
              }
            });
          }
        }));
        return _el$2;
      }
    }));
    return _el$;
  })();
};
libs.render(() => libs.createComponent(ContextMenu, {}), $.GetContextPanel());