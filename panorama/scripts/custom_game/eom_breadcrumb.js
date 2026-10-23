--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Breadcrumb', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Breadcrumb = props => {
  const merged = libs.mergeProps({
    list: [],
    defaultSelected: 0,
    activateType: "onactivate",
    group: "EOM_Breadcrumb" + Math.random()
  }, props, {
    class: libs.classNames("EOM_Breadcrumb", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "list", "defaultSelected", "selected", "group", "activateType"]);
  const [selectedIndex, setSelectedIndex] = libs.createSignal(local.defaultSelected != undefined ? Math.min(local.list.length - 1, Math.max(0, local.defaultSelected - 1)) : undefined);
  const onHover = index => {
    if (local.activateType == "onhover") {
      onSelect(index);
    }
  };
  const onSelect = index => {
    setSelectedIndex(index);
    if (props.onChange) {
      props.onChange(index, local.list[index]);
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return local.list;
      },
      children: (name, index) => [libs.memo((() => {
        const _c$ = libs.memo(() => index() > 0);
        return () => _c$() && libs.createElement("Label", {
          "class": "EOM_BreadcrumbSeparator",
          text: "/"
        }, null);
      })()), (() => {
        const _el$2 = libs.createElement("TabButton", {
          get group() {
            return local.group;
          },
          text: name
        }, null);
        libs.setProp(_el$2, "text", name);
        libs.setProp(_el$2, "onactivate", () => onSelect(index()));
        libs.setProp(_el$2, "onmouseover", () => onHover(index()));
        libs.effect(_p$ => {
          const _v$ = local.selected !== undefined ? local.selected - 1 === index() : selectedIndex() === index(),
            _v$2 = local.group;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "checked", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "group", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$2;
      })()]
    }));
    return _el$;
  })();
};

exports.EOM_Breadcrumb = EOM_Breadcrumb;