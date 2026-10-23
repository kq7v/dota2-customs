--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('hotkey_label', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');

const HOTKEY_REPLACERS = [["HotKeyAttack", KeyFunction.Attack], ["HotKeySkill", KeyFunction.Skill], ["HotKeyDodge", KeyFunction.Dodge], ["HotKeyDefense", KeyFunction.Defense], ["HotKeyUltimate", KeyFunction.Ultimate]];
const HotkeyLabel = props => {
  let ref;
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  const getKeyboardHotkey = func => {
    const data = playerKeyValues();
    const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
    const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
    const keybindData = data?.[`keybind_keyboard${modePrefix}_${func}`];
    if (keybindData !== undefined && keybindData.value !== undefined) {
      return keybindData.value;
    }
    const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
    return defaults[func] ?? "";
  };
  const getGamepadHotkey = func => {
    return playerKeyValues()[`keybind_gamepad_${func}`]?.value ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
  };
  const HotkeyIcon = iconProps => {
    const keyboardHotkey = libs.createMemo(() => getKeyboardHotkey(iconProps.func));
    const gamepadHotkey = libs.createMemo(() => getGamepadHotkey(iconProps.func));
    return libs.createComponent(libs.Show, {
      get when() {
        return isGamepad();
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return keyboardHotkey();
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return gamepadHotkey();
          },
          uiScale: "70%",
          marginTop: "-4px"
        });
      }
    });
  };
  libs.createEffect(libs.on(() => props.text, () => {
    if (ref && ref.IsValid()) {
      let replacers = ref.Children();
      if (replacers.length > 0) {
        replacers.forEach(replacer => {
          const hotkeyReplacer = HOTKEY_REPLACERS.find(([className]) => replacer.BHasClass(className));
          if (hotkeyReplacer !== undefined) {
            replacer.RemoveAndDeleteChildren();
            libs.insert(replacer, libs.createComponent(HotkeyIcon, {
              get func() {
                return hotkeyReplacer[1];
              }
            }));
          }
        });
      }
    }
  }));
  return (() => {
    const _el$ = libs.createElement("Label", props, null);
    const _ref$ = ref;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$) : ref = _el$;
    libs.spread(_el$, props, false);
    return _el$;
  })();
};

exports.HotkeyLabel = HotkeyLabel;