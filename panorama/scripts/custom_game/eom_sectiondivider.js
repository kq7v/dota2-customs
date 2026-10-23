--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_SectionDivider', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function EOM_SectionDivider(props) {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_SectionDivider", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["text"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
      libs.createElement("Image", {
        "class": "LineLeft"
      }, _el$);
      const _el$3 = libs.createElement("Label", {
        "class": "TitleLabel",
        get text() {
          return local.text;
        }
      }, _el$);
      libs.createElement("Image", {
        "class": "LineRight"
      }, _el$);
    libs.spread(_el$, others, true);
    libs.effect(_$p => libs.setProp(_el$3, "text", local.text, _$p));
    return _el$;
  })();
}

exports.EOM_SectionDivider = EOM_SectionDivider;