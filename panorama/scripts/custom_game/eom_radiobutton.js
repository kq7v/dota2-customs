--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_RadioButton', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');

const EOM_RadioButton = props => {
  const [local, other] = libs.splitProps(props, ["text"]);
  return (() => {
    const _el$ = libs.createElement("RadioButton", libs.mergeProps$1(() => EOM_Panel.EOMProps(other, {
        className: "EOM_RadioButton"
      })), null),
      _el$2 = libs.createElement("Label", {
        get text() {
          return local.text;
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(() => EOM_Panel.EOMProps(other, {
      className: "EOM_RadioButton"
    })), true);
    libs.effect(_$p => libs.setProp(_el$2, "text", local.text, _$p));
    return _el$;
  })();
};

exports.EOM_RadioButton = EOM_RadioButton;