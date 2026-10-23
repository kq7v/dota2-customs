--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('hero_level_main', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function HeroLevelMain(props) {
  const size = () => props.size ?? "Normal";
  const MAX_LEVEL = Object.keys(KeyValues.hero_level_exp).length;
  const maxExp = libs.createMemo(() => {
    return KeyValues.hero_level_exp[Math.min(props.level, MAX_LEVEL)]?.exp ?? 1;
  });
  const isMax = libs.createMemo(() => {
    return (props.level ?? 1) >= MAX_LEVEL;
  });
  let tooltipNode;
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return "HeroLevelMain " + size();
        }
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "HeroLevel",
        get text() {
          return props.level;
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "HeroLevelTitle",
        get text() {
          return props.title;
        }
      }, _el$),
      _el$8 = libs.createElement("Panel", {
        width: "100%",
        height: "60%",
        verticalAlign: "bottom",
        marginLeft: "60px",
        marginRight: "70px"
      }, _el$);
    libs.setProp(_el$, "onmouseover", () => {
      const text = `${GetLocalization("#HeroExp_Tips")} ${props.extraExp}/${isMax() ? "∞" : maxExp()}`;
      if (tooltipNode) {
        ShowCustomTooltip(tooltipNode, "text", {
          text: text
        });
      }
    });
    libs.setProp(_el$, "onmouseout", () => {
      if (tooltipNode) HideCustomTooltip(tooltipNode, "text");
    });
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return !isMax();
      },
      get children() {
        const _el$4 = libs.createElement("Panel", {
            id: "HeroLevelProgressBar"
          }, null);
          libs.createElement("Panel", {
            id: "ProgressBarBG"
          }, _el$4);
          const _el$6 = libs.createElement("Panel", {
            id: "ProgressBar",
            get width() {
              return props.extraExp / maxExp() * 100;
            }
          }, _el$4);
        libs.effect(_$p => libs.setProp(_el$6, "width", props.extraExp / maxExp() * 100, _$p));
        return _el$4;
      }
    }), _el$8);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.hideToolTip != true;
      },
      get children() {
        const _el$7 = libs.createElement("Panel", {
          id: "HeroLevelTooltip"
        }, null);
        libs.effect(_$p => libs.setProp(_el$7, "tooltip", props.tooltip ?? "#HeroLevelTooltip", _$p));
        return _el$7;
      }
    }), _el$8);
    const _ref$ = tooltipNode;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$8) : tooltipNode = _el$8;
    libs.setProp(_el$8, "width", "100%");
    libs.setProp(_el$8, "height", "60%");
    libs.setProp(_el$8, "verticalAlign", "bottom");
    libs.setProp(_el$8, "marginLeft", "60px");
    libs.setProp(_el$8, "marginRight", "70px");
    libs.setProp(_el$8, "style", {
      tooltipPosition: "top"
    });
    libs.effect(_p$ => {
      const _v$ = "HeroLevelMain " + size(),
        _v$2 = props.level,
        _v$3 = props.title;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}

exports.HeroLevelMain = HeroLevelMain;