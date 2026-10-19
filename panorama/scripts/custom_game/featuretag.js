--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('FeatureTag', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const FeatureTag = props => {
  const merged = libs.mergeProps({}, props, {
    class: libs.classNames("FeatureTag TooltipContent", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["tag"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Label", {
        "class": "FeatureTagTitle",
        html: true,
        get text() {
          return "#feature_" + local.tag;
        }
      }, _el$);
      libs.createElement("Image", {
        "class": "FeatureTagLine"
      }, _el$);
      const _el$4 = libs.createElement("Label", {
        "class": "FeatureTagDesc",
        html: true,
        get text() {
          return GetLocalization("#feature_" + local.tag + "_description");
        }
      }, _el$);
    libs.spread(_el$, others, true);
    libs.effect(_p$ => {
      const _v$ = "#feature_" + local.tag,
        _v$2 = GetLocalization("#feature_" + local.tag + "_description");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const FeatureTagList = props => {
  const merged = libs.mergeProps({}, props, {
    class: libs.classNames("FeatureTags", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["tags"]);
  return (() => {
    const _el$5 = libs.createElement("Panel", others, null);
    libs.spread(_el$5, others, true);
    libs.insert(_el$5, libs.createComponent(libs.For, {
      get each() {
        return local.tags;
      },
      children: tag => libs.createComponent(FeatureTag, {
        tag: tag
      })
    }));
    return _el$5;
  })();
};

exports.FeatureTagList = FeatureTagList;