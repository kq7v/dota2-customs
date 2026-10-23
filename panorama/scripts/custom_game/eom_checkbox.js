--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_CheckBox', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function EOM_CheckBox2(props) {
  const [local, others] = libs.splitProps(props, ["text", "onchecked", "class"]);
  return (() => {
    const _el$3 = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("EOM_CheckBox2", local.class);
        }
      }), null),
      _el$4 = libs.createElement("Panel", {
        id: "CheckBox"
      }, _el$3);
      libs.createElement("Panel", {
        id: "CheckBoxTick"
      }, _el$4);
      const _el$6 = libs.createElement("Label", {
        "class": "CheckLabel",
        get text() {
          return local.text;
        },
        html: true
      }, _el$3);
    libs.spread(_el$3, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("EOM_CheckBox2", local.class);
      },
      "onactivate": p => {
        p.checked = !p.checked;
        local.onchecked?.(p.checked, p);
      }
    }), true);
    libs.effect(_$p => libs.setProp(_el$6, "text", local.text, _$p));
    return _el$3;
  })();
}

exports.EOM_CheckBox2 = EOM_CheckBox2;