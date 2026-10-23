--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_RedMark', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_RedMark = props => {
  const merged = libs.mergeProps({
    type: "dot",
    size: "medium",
    breathe: false,
    maxCount: 99
  }, props, {
    class: libs.classNames("EOM_RedMark", `Type-${props.type ?? "dot"}`, `Size-${props.size ?? "medium"}`, {
      "EOM_RedMark-Breathe": props.breathe ?? "false"
    }, props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "type", "size", "breathe", "count", "maxCount"]);
  const displayCount = () => {
    if (local.count === undefined || local.count <= 0) return "";
    if (local.count > local.maxCount) return `${local.maxCount}+`;
    return local.count.toString();
  };
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
      libs.createElement("Image", {
        "class": "EOM_RedMark-Dot",
        hittest: false
      }, _el$);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.type === "dot" && local.count !== undefined && local.count > 0;
      },
      get children() {
        const _el$3 = libs.createElement("Label", {
          "class": "EOM_RedMark-Count",
          get text() {
            return displayCount();
          },
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "text", displayCount(), _$p));
        return _el$3;
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

exports.EOM_RedMark = EOM_RedMark;