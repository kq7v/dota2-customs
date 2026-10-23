--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Icon', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Icon = props => {
  const merged = libs.mergeProps({
    size: "32"
  }, props, {
    class: libs.classNames("EOM_Icon", {
      ["EOM_Icon" + props.type]: props.type != undefined
    }, props.extraType, "Size" + props.size, {
      EOM_IconSpin: props.spin,
      EOM_IconShadow: props.shadow
    })
  });
  const [local, others] = libs.splitProps(merged, ["children", "spin", "shadow", "size", "type", "extraType", "color"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get style() {
        return {
          "wash-color": local.color
        };
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get style() {
        return {
          "wash-color": local.color
        };
      }
    }), true);
    libs.insert(_el$, () => local.children);
    return _el$;
  })();
};

exports.EOM_Icon = EOM_Icon;