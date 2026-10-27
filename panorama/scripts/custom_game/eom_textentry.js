--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_TextEntry', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOMDesign = require('./EOMDesign.js');

const EOM_TextEntry = props => {
  const [local, others] = libs.splitProps(props, ["children", "onChange", "oninputsubmit", "text"]);
  const resolved = libs.children(() => local.children);
  const [text, setText] = libs.createSignal(local.text ?? "");
  return (() => {
    const _el$ = libs.createElement("TextEntry", libs.mergeProps(() => EOMDesign.EOMProps(others, {
      className: libs.classNames(props.className, "EOM_TextEntry"),
      style: {
        whiteSpace: others.multiline ? "normal" : undefined
      }
    })), null);
    libs.spread(_el$, libs.mergeProps(() => EOMDesign.EOMProps(others, {
      className: libs.classNames(props.className, "EOM_TextEntry"),
      style: {
        whiteSpace: others.multiline ? "normal" : undefined
      }
    }), {
      "ontextentrychange": self => {
        if (local.onChange) {
          local.onChange(self, text(), self.text);
        }
        setText(self.text);
      },
      "oninputsubmit": self => {
        if (local.oninputsubmit) {
          local.oninputsubmit(self);
        }
        if (local.onChange) {
          local.onChange(self, text(), self.text);
        }
        setText(self.text);
      },
      "onload": self => {
        self.text = text();
        self.SetDisableFocusOnMouseDown(false);
        self.SetPanelEvent("onblur", () => {
          $.DispatchEvent("DropInputFocus", self);
        });
      }
    }), true);
    libs.insert(_el$, resolved);
    return _el$;
  })();
};

exports.EOM_TextEntry = EOM_TextEntry;