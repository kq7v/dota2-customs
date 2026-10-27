--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_SearchBox', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');

const EOM_SearchBox = props => {
  const [local, others] = libs.splitProps(props, ["children", "onChange", "oninputsubmit", "text", "searchOnInput", "onSearch"]);
  let ref = undefined;
  const [value, setValue] = libs.createSignal(local.text ?? "");
  const onSearch = text => {
    if (local.onSearch) {
      local.onSearch(text ?? value(), ref);
    }
  };
  const onChange = text => {
    setValue(text);
    if (local.searchOnInput) {
      onSearch(text);
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps(() => EOM_Panel.EOMProps(others, {
      className: "EOM_SearchBox",
      style: {
        whiteSpace: props.multiline ? "normal" : undefined
      }
    })), null);
    libs.spread(_el$, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
      className: "EOM_SearchBox",
      style: {
        whiteSpace: props.multiline ? "normal" : undefined
      }
    })), true);
    libs.insert(_el$, libs.createComponent(Player.EOM_TextEntry, {
      ref(r$) {
        const _ref$ = ref;
        typeof _ref$ === "function" ? _ref$(r$) : ref = r$;
      },
      placeholder: "#DOTA_Search",
      onChange: self => onChange(self.text),
      oninputsubmit: self => onSearch(self.text)
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_IconButton, {
      align: "right center",
      margin: "0px 8px",
      get icon() {
        return libs.createComponent(EOM_Image.EOM_Image, {
          width: "24px",
          height: "24px",
          backgroundImage: "url('s2r://panorama/images/control_icons/icon_search_shadow_psd.vtex')"
        });
      },
      onactivate: () => onSearch()
    }), null);
    return _el$;
  })();
};

exports.EOM_SearchBox = EOM_SearchBox;