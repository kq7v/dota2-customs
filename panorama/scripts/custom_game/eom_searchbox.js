--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_SearchBox', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_SearchBox = props => {
  let textEntry;
  const merged = libs.mergeProps({
    placeholder: "#DOTA_Search"
  }, props);
  const [local, rootProps] = libs.splitProps(merged, ["children", "class", "onChange", "onSearch", "oninputsubmit", "text", "placeholder", "multiline", "textmode", "maxchars"]);
  const [text, setText] = libs.createSignal(local.text ?? "");
  const [focused, setFocused] = libs.createSignal(false);
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
  const rootClass = libs.createMemo(() => libs.classNames("EOM_SearchBox", local.class, {
    Focused: focused()
  }));
  const emitChange = self => {
    const previousText = text();
    const changedText = self.text;
    if (local.onChange !== undefined) {
      local.onChange(self, previousText, changedText);
    }
    if (local.onSearch !== undefined) {
      local.onSearch(changedText);
    }
    setText(changedText);
  };
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(rootProps, {
        get ["class"]() {
          return rootClass();
        }
      }), null);
      libs.createElement("Image", {
        "class": "EOM_SearchBox_Icon",
        scaling: "stretch",
        src: "s2r://panorama/images/control_icons/24px/search.vsvg"
      }, _el$);
      const _el$3 = libs.createElement("TextEntry", {
        "class": "EOM_SearchBox_Input",
        get placeholder() {
          return local.placeholder;
        },
        get multiline() {
          return local.multiline;
        },
        get textmode() {
          return local.textmode;
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(rootProps, {
      get ["class"]() {
        return rootClass();
      }
    }), true);
    libs.setProp(_el$3, "ontextentrychange", emitChange);
    libs.setProp(_el$3, "oninputsubmit", self => {
      if (local.oninputsubmit !== undefined) {
        local.oninputsubmit(self);
      }
      emitChange(self);
    });
    libs.setProp(_el$3, "onload", self => {
      textEntry = self;
      self.text = text();
      self.SetDisableFocusOnMouseDown(false);
      self.SetPanelEvent("onfocus", () => {
        setFocused(true);
      });
      self.SetPanelEvent("onblur", () => {
        setFocused(false);
        $.DispatchEvent("DropInputFocus", self);
      });
    });
    libs.insert(_el$3, () => local.children);
    libs.effect(_p$ => {
      const _v$ = local.placeholder,
        _v$2 = local.multiline,
        _v$3 = local.textmode;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "placeholder", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "multiline", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "textmode", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
};

exports.EOM_SearchBox = EOM_SearchBox;