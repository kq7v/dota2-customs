--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Popup', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

const EOM_Popup = props => {
  const merged = libs.mergeProps({
    popType: "PopupType_LeftTop",
    hideClose: false,
    size: "normal",
    onClose: () => {}
  }, props, {
    class: libs.classNames("EOM_PopupMain", props.popType ?? "PopupType_LeftTop", props.size ?? "normal", {
      hideTitle: props.title == undefined
    })
  });
  const [local, others] = libs.splitProps(merged, ["children", "title", "size", "popType", "hideClose", "onClose"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
      libs.createElement("Image", {
        "class": "EOM_PopupBG",
        hittest: false
      }, _el$);
      const _el$4 = libs.createElement("Panel", {
        hittest: false,
        "class": "EOM_PopupContent"
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      "onactivate": () => {}
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.title != undefined && local.title != "";
      },
      get children() {
        const _el$3 = libs.createElement("Label", {
          "class": "EOM_PopupTitle",
          get text() {
            return local.title;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "text", local.title, _$p));
        return _el$3;
      }
    }), _el$4);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return !local.hideClose;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_CloseButton, {
          onactivate: () => local.onClose()
        });
      }
    }), _el$4);
    libs.insert(_el$4, () => local.children);
    return _el$;
  })();
};

exports.EOM_Popup = EOM_Popup;