--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_GamePad', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const normalizeKeyName = keyName => keyName.trim().toLowerCase();
const isStickDirectionKey = keyName => /^(x_axis|y_axis|r_axis|u_axis)_(neg|pos)$/.test(keyName);
const textKeyLabelMap = {
  joy5: "LB",
  joy6: "RB",
  joy7: "SELECT",
  joy8: "MENU",
  z_axis_pos: "LT",
  v_axis_pos: "RT",
  lb: "LB",
  rb: "RB",
  select: "SELECT",
  menu: "MENU",
  lt: "LT",
  rt: "RT"
};
const isKnownGamePadKey = keyName => /^(joy[1-9]|joy10|z_axis_pos|v_axis_pos|pov_left|pov_right|pov_up|pov_down|x_axis_neg|x_axis_pos|y_axis_neg|y_axis_pos|r_axis_neg|r_axis_pos|u_axis_neg|u_axis_pos|start|view|home|menu|select)$/.test(keyName);
const getTextKeyLabel = keyName => textKeyLabelMap[keyName];
const EOM_GamePad = rawProps => {
  const props = libs.mergeProps({
    keyName: ""
  }, {
    class: "EOM_GamePad"
  }, rawProps);
  const [local, others] = libs.splitProps(props, ["keyName", "children"]);
  const currentKeyName = libs.createMemo(() => normalizeKeyName(local.keyName));
  const isKnownKey = libs.createMemo(() => isKnownGamePadKey(currentKeyName()));
  const isStickKey = libs.createMemo(() => isStickDirectionKey(currentKeyName()));
  const textKeyLabel = libs.createMemo(() => getTextKeyLabel(currentKeyName()));
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(props.class, {
          HasDirection: isStickKey(),
          IsTextKey: textKeyLabel() !== undefined
        }, isKnownKey() ? `Key-${currentKeyName()}` : undefined);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames(props.class, {
          HasDirection: isStickKey(),
          IsTextKey: textKeyLabel() !== undefined
        }, isKnownKey() ? `Key-${currentKeyName()}` : undefined);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isKnownKey();
      },
      get fallback() {
        return (() => {
          const _el$2 = libs.createElement("Label", {
            "class": "EOM_GamePadText",
            get text() {
              return local.keyName;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$2, "text", local.keyName, _$p));
          return _el$2;
        })();
      },
      children: () => libs.createComponent(libs.Show, {
        get when() {
          return textKeyLabel() !== undefined;
        },
        get fallback() {
          return libs.createComponent(libs.Show, {
            get when() {
              return isStickKey();
            },
            get fallback() {
              return libs.createElement("Image", {
                "class": "EOM_GamePadIcon",
                scaling: "stretch-to-fit-preserve-aspect"
              }, null);
            },
            get children() {
              return [libs.createElement("Image", {
                "class": "EOM_GamePadStick",
                scaling: "stretch-to-fit-preserve-aspect"
              }, null), libs.createElement("Image", {
                "class": "EOM_GamePadDirection",
                scaling: "stretch-to-fit-preserve-aspect"
              }, null)];
            }
          });
        },
        get children() {
          return [libs.createElement("Image", {
            "class": "EOM_GamePadTextBorder"
          }, null), (() => {
            const _el$4 = libs.createElement("Label", {
              "class": "EOM_GamePadTextValue",
              get text() {
                return textKeyLabel();
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$4, "text", textKeyLabel(), _$p));
            return _el$4;
          })()];
        }
      })
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

exports.EOM_GamePad = EOM_GamePad;