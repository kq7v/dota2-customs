--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_ToggleButton', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function EOM_ToggleButton(props) {
  const [local, others] = libs.splitProps(props, ["class", "onactivate", "oncontextmenu", "selected", "defaultSelected", "onselect", "ondeselect", "onchange", "text", "html"]);
  const [innerSelected, setInnerSelected] = libs.createSignal(local.defaultSelected ?? local.selected ?? false);
  const checked = () => local.selected ?? innerSelected();
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames(local.class, "EOM_ToggleButton");
        }
      }), null),
      _el$2 = libs.createElement("Panel", {
        id: "ToggleBox"
      }, _el$);
      libs.createElement("Panel", {
        id: "ToggleBoxRing"
      }, _el$2);
      libs.createElement("Panel", {
        id: "ToggleBoxTick"
      }, _el$2);
      const _el$5 = libs.createElement("Label", {
        get text() {
          return local.text ?? "";
        },
        get html() {
          return local.html ?? false;
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(local.class, "EOM_ToggleButton");
      },
      get checked() {
        return checked();
      },
      "onactivate": p => {
        const newVar = !checked();
        if (local.selected === undefined) {
          setInnerSelected(newVar);
        }
        if (newVar) {
          local.onselect?.(p);
        } else {
          local.ondeselect?.(p);
        }
        local.onchange?.(p, newVar);
        if (typeof local.onactivate == "function") local.onactivate?.(p);
      },
      "oncontextmenu": p => {
        local.oncontextmenu?.(p);
      }
    }), true);
    libs.effect(_p$ => {
      const _v$ = local.text ?? "",
        _v$2 = local.html ?? false;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "html", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}

exports.EOM_ToggleButton = EOM_ToggleButton;