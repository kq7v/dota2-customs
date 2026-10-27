--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Currency', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOMDesign = require('./EOMDesign.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Image = require('./EOM_Image.js');

const EOM_Currency = props => {
  const merged = libs.mergeProps({
    hasFeedback: false,
    type: EOMDesign.ADDON_NAME
  }, props);
  const [local, others] = libs.splitProps(merged, ["hasFeedback", "type", "icon", "value", "onaddbuttonactivate"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(() => EOMDesign.EOMProps(others, {
      className: libs.classNames("EOM_Currency", local.type)
    })), null);
    libs.spread(_el$, libs.mergeProps$1(() => EOMDesign.EOMProps(others, {
      className: libs.classNames("EOM_Currency", local.type)
    })), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.hasFeedback;
      },
      get children() {
        const _el$2 = libs.createElement("TextButton", {
          text: "#StoreRechargeReport"
        }, null);
        libs.setProp(_el$2, "className", "EOM_Feedback");
        libs.setProp(_el$2, "onactivate", pSelf => {});
        return _el$2;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Panel.EOM_Panel, {
      className: "EOM_CurrencyContainer",
      get children() {
        return [libs.createComponent(EOM_Image.EOM_Image, {
          className: "EOM_CurrencyIconBG",
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "EOM_CurrencyIcon",
              get backgroundImage() {
                return local.icon;
              }
            });
          }
        }), (() => {
          const _el$3 = libs.createElement("Panel", {}, null),
            _el$4 = libs.createElement("Label", {
              get text() {
                return local.value;
              }
            }, _el$3);
          libs.setProp(_el$3, "className", "EOM_CurrencyLabelContainer");
          libs.effect(_$p => libs.setProp(_el$4, "text", local.value, _$p));
          return _el$3;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return local.onaddbuttonactivate != undefined;
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_IconButton, {
              className: "EOM_CurrencyRecharge",
              get icon() {
                return libs.createComponent(EOM_Image.EOM_Image, {});
              },
              get onactivate() {
                return local.onaddbuttonactivate;
              }
            });
          }
        })];
      }
    }), null);
    return _el$;
  })();
};

exports.EOM_Currency = EOM_Currency;