--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_NumberAdjust', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

const EOM_NumberAdjust = props => {
  const merged = libs.mergeProps({
    min: 0,
    max: 1000000
  }, props, {
    class: "EOM_NumberAdjust"
  });
  const [local, others] = libs.splitProps(merged, ["children", "effectValue", "value", "min", "max", "onChange", "onvaluechanged", "changeFilter"]);
  const [value, _setValue] = libs.createSignal(local.effectValue ?? local.value ?? local.min);
  function setValue(number) {
    if (local.changeFilter) {
      let res = local.changeFilter(value(), number);
      if (typeof res == "number") {
        _setValue(res);
      } else if (res == true) {
        _setValue(number);
      }
    } else {
      _setValue(number);
    }
  }
  libs.createRenderEffect(() => {
    if (local.effectValue !== undefined) {
      _setValue(local.effectValue);
    }
  });
  let eventEnable = true;
  let textEntryPanel;
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$3 = libs.createElement("Panel", {
        id: "TextEntryContainer"
      }, _el$),
      _el$4 = libs.createElement("TextEntry", {
        get text() {
          return value().toString();
        },
        textmode: "numeric"
      }, _el$3);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get enabled() {
        return value() > local.min;
      },
      onactivate: self => {
        if (value() == undefined) {
          setValue(local.min);
        } else if (value() > local.min) {
          setValue(value() - 1);
        }
      },
      get children() {
        return libs.createElement("Image", {
          id: "Sub"
        }, null);
      }
    }), _el$3);
    libs.setProp(_el$3, "onactivate", () => {
      if (textEntryPanel) {
        textEntryPanel.SetFocus();
        textEntryPanel.SelectAll();
      }
    });
    const _ref$ = textEntryPanel;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$4) : textEntryPanel = _el$4;
    libs.setProp(_el$4, "ontextentrychange", self => {
      if (eventEnable) {
        eventEnable = false;
        if (self.text != "") {
          if (!self.text.includes("-")) {
            setValue(Math.max(local.min, Math.min(local.max, Number(self.text))));
            self.text = value().toString();
            if (local.onChange) {
              local.onChange(self, value());
            }
          } else {
            self.text = value().toString();
          }
        }
        eventEnable = true;
      }
    });
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get enabled() {
        return value() < local.max;
      },
      id: "Right",
      onactivate: self => {
        if (value() == undefined) {
          setValue(local.max);
        } else if (value() < local.max) {
          setValue(value() + 1);
        }
      },
      get children() {
        return libs.createElement("Image", {
          id: "Add"
        }, null);
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    libs.effect(_$p => libs.setProp(_el$4, "text", value().toString(), _$p));
    return _el$;
  })();
};

exports.EOM_NumberAdjust = EOM_NumberAdjust;