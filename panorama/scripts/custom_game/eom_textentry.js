--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_TextEntry', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_TextEntry = props => {
  let textEntry;
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_TextEntry", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "onChange", "oninputsubmit", "text"]);
  const [text, setText] = libs.createSignal(local.text ?? "");
  libs.createEffect(() => {
    const nextText = local.text;
    if (nextText === undefined) {
      return;
    }
    setText(nextText);
    if (textEntry !== undefined && textEntry.text !== nextText) {
      textEntry.text = nextText;
    }
  });
  return (() => {
    const _el$ = libs.createElement("TextEntry", libs.mergeProps$1(others, {
      get style() {
        return {
          whiteSpace: props.multiline ? "normal" : undefined
        };
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get style() {
        return {
          whiteSpace: props.multiline ? "normal" : undefined
        };
      },
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
        textEntry = self;
        self.text = text();
        self.SetDisableFocusOnMouseDown(false);
        self.SetPanelEvent("onblur", () => {
          $.DispatchEvent("DropInputFocus", self);
        });
      }
    }), true);
    libs.insert(_el$, () => local.children);
    return _el$;
  })();
};

exports.EOM_TextEntry = EOM_TextEntry;