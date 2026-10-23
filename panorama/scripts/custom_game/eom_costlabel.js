--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_CostLabel', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_CostLabel = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_CostLabel", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "cost", "have", "hiddenCostOnZero"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Label", {
        "class": "EOM_CostLabelValue EOM_CostLabelValueHave",
        get text() {
          return local.have;
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        "class": "EOM_CostLabelValue EOM_CostLabelValueCost",
        get text() {
          return `/${local.cost}`;
        }
      }, _el$);
    libs.spread(_el$, others, true);
    libs.insert(_el$, () => local.children, null);
    libs.effect(_p$ => {
      const _v$ = {
          NoEnough: local.have < local.cost
        },
        _v$2 = local.have,
        _v$3 = `/${local.cost}`,
        _v$4 = !local.hiddenCostOnZero || local.cost !== 0;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$3, "visible", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
};

exports.EOM_CostLabel = EOM_CostLabel;