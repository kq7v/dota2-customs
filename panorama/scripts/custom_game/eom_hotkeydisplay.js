--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_HotKeyDisplay', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const defaultKeyImg = {
  "MOUSE0": "hud/h_key_mouse.png",
  "MOUSE1": "hud/h_key_mouse.png",
  "MOUSE2": "hud/h_key_mouse.png",
  "SPACE": "hud/h_key_space.png"
};
const EOM_HotKeyDisplay = rawProps => {
  const props = libs.mergeProps({
    hotkey: '',
    filp: false
  }, {
    class: "EOM_HotKeyDisplay"
  }, rawProps);
  const [local, others] = libs.splitProps(props, ['hotkey', 'filp']);
  const isImage = libs.createMemo(() => {
    if (defaultKeyImg[local.hotkey]) {
      return true;
    }
    const hotkey = local.hotkey || '';
    return /\.(jpg|jpeg|png|vtex)$/i.test(hotkey);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get classList() {
        return {
          IsImage: isImage(),
          Filp: local.hotkey == "MOUSE1" || local.filp
        };
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isImage();
      },
      get fallback() {
        return [libs.createElement("Image", {
          "class": 'EOM_HotKeyDisplayBorder'
        }, null), (() => {
          const _el$4 = libs.createElement("Label", {
            "class": 'EOM_HotKeyDisplayText',
            get text() {
              return GetLocalization(local.hotkey);
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$4, "text", GetLocalization(local.hotkey), _$p));
          return _el$4;
        })()];
      },
      get children() {
        const _el$2 = libs.createElement("Image", {
          "class": 'EOM_HotKeyDisplayImage',
          get src() {
            return libs.memo(() => !!defaultKeyImg[local.hotkey])() ? getSrcPath(defaultKeyImg[local.hotkey]) : local.hotkey;
          },
          scaling: "stretch-to-cover-preserve-aspect"
        }, null);
        libs.effect(_$p => libs.setProp(_el$2, "src", libs.memo(() => !!defaultKeyImg[local.hotkey])() ? getSrcPath(defaultKeyImg[local.hotkey]) : local.hotkey, _$p));
        return _el$2;
      }
    }));
    return _el$;
  })();
};

exports.EOM_HotKeyDisplay = EOM_HotKeyDisplay;