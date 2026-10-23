--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_ProgressBar', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_ProgressBar = props => {
  const merged = libs.mergeProps({
    value: 0,
    min: 0,
    max: 100,
    class: libs.classNames("EOM_ProgressBar " + props.type)
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "value", "min", "max", "type"]);
  const resolved = libs.children(() => local.children);
  const width = libs.createMemo(() => {
    if (local.max == 0) {
      return 100;
    }
    return Clamp(Round(finiteNumber((local.value - local.min) / (local.max - local.min) * 100), 2), 0, 100);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Panel", {
        get width() {
          return width() + "%";
        }
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        get width() {
          return 100 - width() + "%";
        }
      }, _el$);
    libs.spread(_el$, others, true);
    libs.setProp(_el$2, "className", "EOM_ProgressBar_Left");
    libs.setProp(_el$3, "className", "EOM_ProgressBar_Right");
    libs.insert(_el$, resolved, null);
    libs.effect(_p$ => {
      const _v$ = width() + "%",
        _v$2 = 100 - width() + "%";
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "width", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "width", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

exports.EOM_ProgressBar = EOM_ProgressBar;