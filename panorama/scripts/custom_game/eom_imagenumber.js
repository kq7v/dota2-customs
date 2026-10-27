--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_ImageNumber', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOMDesign = require('./EOMDesign.js');

const EOM_ImageNumber = props => {
  const [local, others] = libs.splitProps(props, ["value", "type"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(() => EOMDesign.EOMProps(others, {
      className: libs.classNames("EOM_ImageNumber" + local.type)
    })), null);
    libs.spread(_el$, libs.mergeProps$1(() => EOMDesign.EOMProps(others, {
      className: libs.classNames("EOM_ImageNumber" + local.type)
    })), true);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return String(local.value).split("");
      },
      children: (num, index) => (() => {
        const _el$2 = libs.createElement("Image", {}, null);
        libs.effect(_$p => libs.setProp(_el$2, "className", libs.classNames("EOM_NUM", "EOM_NUM_" + num), _$p));
        return _el$2;
      })()
    }));
    return _el$;
  })();
};

exports.EOM_ImageNumber = EOM_ImageNumber;