--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Button', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Button = props => {
  const merged = libs.mergeProps({
    loading: false,
    color: "Gold",
    size: "Normal",
    loadingStyle: "Spinner",
    enabled: true
  }, props);
  const [local, others] = libs.splitProps(merged, ["loading", "loadingStyle", "icon", "color", "size", "enabled", "children", "text", "html", "vars", "btnScale"]);
  const mergedClass = libs.createMemo(() => libs.classNames("EOM_Button", local.loading ? "Loading" : "", local.loadingStyle == "Refresh" ? "Loading_Refresh" : "Loading_Spinner", `color-${local.enabled == false ? "Gray" : local.color || "Gold"}`, `size-${local.size || "Normal"}`, props.class, props.className));
  const enabled = libs.createMemo(() => local.loading ? false : local.enabled);
  return libs.createComponent(EOM_BaseButton, libs.mergeProps$1(others, {
    get ["class"]() {
      return mergedClass();
    },
    get style() {
      return {
        uiScale: local.btnScale
      };
    },
    get enabled() {
      return enabled();
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            "class": "EOM_Button_Content"
          }, null),
          _el$3 = libs.createElement("Label", {
            "class": "EOM_Button_Label",
            get vars() {
              return local.vars;
            },
            get text() {
              return local.text;
            },
            get html() {
              return local.html;
            }
          }, _el$);
        libs.insert(_el$, libs.createComponent(libs.Switch, {
          get fallback() {
            return local.icon;
          },
          get children() {
            return libs.createComponent(libs.Match, {
              get when() {
                return local.loading == true;
              },
              get children() {
                return libs.createElement("Image", {
                  "class": "EOM_Button_LoadingIcon"
                }, null);
              }
            });
          }
        }), _el$3);
        libs.effect(_p$ => {
          const _v$ = local.vars,
            _v$2 = local.text != undefined,
            _v$3 = local.text,
            _v$4 = local.html;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "vars", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "visible", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$3, "html", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$;
      })(), libs.memo(() => local.children)];
    }
  }));
};
const EOM_BaseButton = props => {
  const [local, others] = libs.splitProps(props, ["text", "html", "children", "class"]);
  return (() => {
    const _el$4 = libs.createElement("Button", libs.mergeProps$1({
      get ["class"]() {
        return libs.classNames("EOM_BaseButton", local.class);
      }
    }, others), null);
    libs.spread(_el$4, libs.mergeProps$1({
      get ["class"]() {
        return libs.classNames("EOM_BaseButton", local.class);
      }
    }, others), true);
    libs.insert(_el$4, () => local.children, null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return local.text;
      },
      get children() {
        const _el$5 = libs.createElement("Label", {
          get text() {
            return local.text;
          },
          get html() {
            return local.html;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$5 = local.text,
            _v$6 = local.html;
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$5, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$5, "html", _v$6, _p$._v$6));
          return _p$;
        }, {
          _v$5: undefined,
          _v$6: undefined
        });
        return _el$5;
      }
    }), null);
    return _el$4;
  })();
};
const EOM_CloseButton = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_CloseButton SecondaryButtonStates", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children"]);
  return libs.createComponent(EOM_BaseButton, libs.mergeProps$1(others, {
    get children() {
      return local.children;
    }
  }));
};
const EOM_IconButton = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_IconButton", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "icon"]);
  return libs.createComponent(EOM_BaseButton, libs.mergeProps$1(others, {
    get children() {
      return [libs.memo(() => local.icon), libs.memo(() => local.children)];
    }
  }));
};

exports.EOM_BaseButton = EOM_BaseButton;
exports.EOM_Button = EOM_Button;
exports.EOM_CloseButton = EOM_CloseButton;
exports.EOM_IconButton = EOM_IconButton;