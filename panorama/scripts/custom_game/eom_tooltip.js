--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Tooltip', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Tooltip = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_Tooltip", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
    libs.spread(_el$, others, true);
    libs.insert(_el$, () => local.children);
    return _el$;
  })();
};

exports.EOM_Tooltip = EOM_Tooltip;