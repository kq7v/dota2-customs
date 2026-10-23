--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_ImageNumber', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_ImageNumber = props => {
  const merged = libs.mergeProps(props, {
    class: "EOM_ImageNumber" + props.type
  });
  const [local, others] = libs.splitProps(merged, ["value", "type", "percentSign"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return String(local.value).split("");
      },
      children: (num, index) => (() => {
        const _el$3 = libs.createElement("Image", {
          get ["class"]() {
            return libs.classNames("EOM_NUM", "EOM_NUM_" + num);
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "class", libs.classNames("EOM_NUM", "EOM_NUM_" + num), _$p));
        return _el$3;
      })()
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.percentSign;
      },
      get children() {
        return libs.createElement("Image", {
          "class": "EOM_PercentSign"
        }, null);
      }
    }), null);
    return _el$;
  })();
};

exports.EOM_ImageNumber = EOM_ImageNumber;