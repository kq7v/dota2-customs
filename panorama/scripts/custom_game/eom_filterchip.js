--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_FilterChip', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_FilterChip = props => {
  const merged = libs.mergeProps({
    selected: false,
    dotColor: "#9eb4ca"
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "class", "selected", "text", "count", "dotColor"]);
  return (() => {
    const _el$ = libs.createElement("Button", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("EOM_FilterChip", local.class, {
            Selected: local.selected
          });
        }
      }), null),
      _el$2 = libs.createElement("Panel", {
        "class": "EOM_FilterChip_Dot",
        get style() {
          return {
            backgroundColor: local.dotColor
          };
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        "class": "EOM_FilterChip_Label",
        get text() {
          return local.text;
        }
      }, _el$),
      _el$4 = libs.createElement("Label", {
        "class": "EOM_FilterChip_Count",
        get text() {
          return libs.memo(() => local.count != undefined)() ? String(local.count) : "";
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("EOM_FilterChip", local.class, {
          Selected: local.selected
        });
      }
    }), true);
    libs.insert(_el$, () => local.children, null);
    libs.effect(_p$ => {
      const _v$ = {
          backgroundColor: local.dotColor
        },
        _v$2 = local.text,
        _v$3 = libs.memo(() => local.count != undefined)() ? String(local.count) : "";
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "style", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
};

exports.EOM_FilterChip = EOM_FilterChip;