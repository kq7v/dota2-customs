--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Switch', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function EOM_Switch(props) {
  const [local, others] = libs.splitProps(props, ["class", "selected", "defaultSelected", "onchange", "onactivate"]);
  const [innerSelected, setInnerSelected] = libs.createSignal(local.defaultSelected ?? local.selected ?? false);
  const checked = () => local.selected ?? innerSelected();
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("EOM_Switch", local.class);
        }
      }), null),
      _el$2 = libs.createElement("Panel", {
        "class": "EOM_Switch_Track"
      }, _el$);
      libs.createElement("Panel", {
        "class": "EOM_Switch_Spacer"
      }, _el$2);
      libs.createElement("Panel", {
        "class": "EOM_Switch_Thumb"
      }, _el$2);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("EOM_Switch", local.class);
      },
      get checked() {
        return checked();
      },
      "onactivate": p => {
        const newChecked = !checked();
        if (local.selected === undefined) {
          setInnerSelected(newChecked);
        }
        local.onchange?.(p, newChecked);
        if (typeof local.onactivate === "function") {
          local.onactivate(p);
        }
      }
    }), true);
    return _el$;
  })();
}

exports.EOM_Switch = EOM_Switch;