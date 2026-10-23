--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_RadioButton = require('./EOM_RadioButton.js');
var EOM_Switch = require('./EOM_Switch.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var Player = require('./Player.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_RedMark.js');

const gamepadKeys$1 = new Set(["pov_up", "pov_down", "pov_left", "pov_right", "z_axis_pos", "v_axis_pos", "y_axis_neg", "y_axis_pos", "x_axis_neg", "x_axis_pos", "r_axis_neg", "r_axis_pos", "u_axis_neg", "u_axis_pos", "joy1", "joy2", "joy3", "joy4", "joy5", "joy6", "joy7", "joy8", "joy9", "joy10", "joy11"]);
const GamepadPicker = props => {
  const [pendingKey, setPendingKey] = libs.createSignal(props.currentKey ?? "");
  libs.createEffect(() => {
    if (props.visible === true) {
      setPendingKey(props.currentKey ?? "");
    }
  });
  useClientSideEvent("key_pressed", data => {
    if (props.visible !== true) {
      return;
    }
    if (typeof data.key !== "string") {
      return;
    }
    if (!gamepadKeys$1.has(data.key)) {
      return;
    }
    setPendingKey(data.key);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "GamepadPicker",
        get hittest() {
          return props.visible === true;
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "GamepadPickerWindow",
        hittest: true
      }, _el$);
      libs.createElement("Label", {
        "class": "GamepadPickerTitle",
        text: "#Setting_Gamepad"
      }, _el$2);
      const _el$4 = libs.createElement("Label", {
        "class": "GamepadPickerDesc",
        get text() {
          return props.descriptionText ?? "#Hotkey_Pick";
        }
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        "class": "GamepadPickerContent"
      }, _el$2),
      _el$6 = libs.createElement("Label", {
        "class": "GamepadPickerKeyName",
        get text() {
          return libs.memo(() => pendingKey() == "")() ? "#Setting_Gamepad" : GetLocalization("#" + pendingKey(), pendingKey());
        }
      }, _el$2);
    libs.insert(_el$5, libs.createComponent(EOM_GamePad.EOM_GamePad, {
      get keyName() {
        return pendingKey();
      }
    }));
    libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_Button, {
      "class": "GamepadPickerConfirm",
      size: "Small",
      get enabled() {
        return pendingKey() != "";
      },
      text: "#DOTA_Confirm",
      onactivate: () => {
        if (pendingKey() != "") {
          props.onConfirm?.(pendingKey());
        }
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          Show: props.visible === true
        },
        _v$2 = props.visible === true,
        _v$3 = props.descriptionText ?? "#Hotkey_Pick",
        _v$4 = libs.memo(() => pendingKey() == "")() ? "#Setting_Gamepad" : GetLocalization("#" + pendingKey(), pendingKey());
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "hittest", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "text", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
};

const KeyBindPicker = props => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "KeyBindPicker",
        acceptsfocus: true,
        id: "KeyBindPicker"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "Header"
      }, _el$);
      libs.createElement("Label", {
        id: "Instructions",
        text: "#Hotkey_Pick"
      }, _el$2);
      const _el$4 = libs.createElement("Panel", {
        id: "KeyBindOption"
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        "class": "KeyboardOption"
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "LeftRightFlow"
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        "class": "LeftRightFlow"
      }, _el$5),
      _el$8 = libs.createElement("Panel", {
        "class": "LeftRightFlow"
      }, _el$5),
      _el$9 = libs.createElement("Panel", {
        "class": "LeftRightFlow"
      }, _el$5),
      _el$0 = libs.createElement("Panel", {
        "class": "LeftRightFlow"
      }, _el$5),
      _el$1 = libs.createElement("Panel", {
        "class": "MouseOption"
      }, _el$4);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "`",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode30",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode31",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode32",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode33",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode34",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode35",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode36",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode37",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode38",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "scancode39",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "-",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "+",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$6, libs.createComponent(KeyBinder$1, {
      keyName: "BACK",
      type: "Back",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "TAB",
      type: "Tab",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "Q",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "W",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "E",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "R",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "T",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "Y",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "U",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "I",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "O",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "P",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "[",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "]",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(KeyBinder$1, {
      keyName: "\\",
      type: "Tab",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "CAPSLOCK",
      type: "CapLk",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "A",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "S",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "D",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "F",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "G",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "H",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "J",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "K",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "L",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: ";",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "'",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(KeyBinder$1, {
      keyName: "Enter",
      type: "Enter",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "SHIFT",
      type: "Shift",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "Z",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "X",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "C",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "V",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "B",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "N",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "M",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: ",",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: ".",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "/",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(KeyBinder$1, {
      keyName: "SHIFT",
      type: "Shift",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(KeyBinder$1, {
      keyName: "CTRL",
      type: "Ctrl",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(KeyBinder$1, {
      keyName: "ALT",
      type: "Alt",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(KeyBinder$1, {
      keyName: "SPACE",
      type: "Space",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(KeyBinder$1, {
      keyName: "ALT",
      type: "Alt",
      enable: false,
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(KeyBinder$1, {
      keyName: "CTRL",
      type: "Ctrl",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(KeyBinder$1, {
      keyName: "MOUSE0",
      type: "Mouse",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(KeyBinder$1, {
      keyName: "MOUSE1",
      type: "Mouse",
      get onSelect() {
        return props.onKeySelected;
      }
    }), null);
    return _el$;
  })();
};
const KeyBinder$1 = props => {
  return (() => {
    const _el$10 = libs.createElement("Panel", {
        get id() {
          return props.keyName;
        },
        get ["class"]() {
          return libs.classNames("SettingsKeyBinder", "BindingRow", "HeroAbilityBindAbilityButton", {
            Disable: !props.enable
          }, props.type);
        }
      }, null),
      _el$11 = libs.createElement("Panel", {
        id: "LabelFXContainer"
      }, _el$10);
      libs.createElement("Panel", {
        id: "KeyBinderBG"
      }, _el$11);
      const _el$13 = libs.createElement("Panel", {
        id: "BindingLabelContainer"
      }, _el$11);
      libs.createElement("Label", {
        id: "mod",
        text: "",
        "class": "BindingRowButton"
      }, _el$13);
      libs.createElement("Label", {
        id: "dash",
        text: "-",
        "class": "BindingRowButton"
      }, _el$13);
      const _el$16 = libs.createElement("Label", {
        id: "value",
        get text() {
          return GetLocalization("#" + props.keyName, props.keyName);
        },
        "class": "BindingRowButton"
      }, _el$13);
      libs.createElement("Button", {
        "class": "ClearKeybinding"
      }, _el$11);
    libs.setProp(_el$10, "onactivate", self => {
      if (props.enable !== false && props.onSelect) {
        props.onSelect(props.keyName);
      }
    });
    libs.effect(_p$ => {
      const _v$ = props.keyName,
        _v$2 = props.enable,
        _v$3 = libs.classNames("SettingsKeyBinder", "BindingRow", "HeroAbilityBindAbilityButton", {
          Disable: !props.enable
        }, props.type),
        _v$4 = GetLocalization("#" + props.keyName, props.keyName);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$10, "id", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$10, "enabled", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "class", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "text", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$10;
  })();
};

let currentGamepadBindings = {
  ...DEFAULT_GAMEPAD_BINDINGS
};
let keyToFunction = {};
let registeredKeyboardEventNames = {};
let registeredKeyboardKeys = {};
const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state");
const KEYBOARD_MOVE_FUNCTIONS = [KeyFunction.Up, KeyFunction.Down, KeyFunction.Left, KeyFunction.Right];
function IsKeyboardMoveFunction(func) {
  return KEYBOARD_MOVE_FUNCTIONS.includes(func);
}
function IsKeyboardMoveFunctionDisabled(mode, func) {
  return mode !== MOVE_MODE_KEYBOARD && IsKeyboardMoveFunction(func);
}
function RemoveDisabledKeyboardMoveBindings(bindings, mode) {
  if (mode === MOVE_MODE_KEYBOARD) {
    return;
  }
  for (const func of KEYBOARD_MOVE_FUNCTIONS) {
    delete bindings[func];
  }
}
function RebuildKeyToFunctionMap(keyboardBindings, gamepadBindings) {
  keyToFunction = {};
  for (const func in keyboardBindings) {
    if (SELECTION_KEY_FUNCTIONS.includes(func)) continue;
    const keyName = keyboardBindings[func];
    if (keyName) {
      keyToFunction[keyName] = func;
    }
  }
  for (const func in gamepadBindings) {
    const keyName = gamepadBindings[func];
    if (keyName) {
      keyToFunction[keyName] = func;
    }
  }
}
function ResolveKeyFunctionByKeyName(keyName) {
  if (["Blessing", "SkillUpgrade", "Artifact", "BlessUpgrade", "ArtifactUpgrade"].includes(multiChoiceState()?.active_type ?? "")) {
    const selectionFunction = SELECTION_KEY_FUNCTIONS.find(func => keyBindings()[func] === keyName);
    if (selectionFunction !== undefined) return selectionFunction;
  }
  return keyToFunction[keyName];
}
function SyncKeyboardKeyRegistrations(bindings) {
  for (const func in bindings) {
    const keyFunction = func;
    const nextKey = bindings[keyFunction] ?? "";
    const registeredKey = registeredKeyboardKeys[keyFunction] ?? "";
    if (registeredKey === nextKey) {
      continue;
    }
    const registeredEventName = registeredKeyboardEventNames[keyFunction];
    if (registeredEventName) {
      UnregisterKeyEvent(registeredEventName);
      delete registeredKeyboardEventNames[keyFunction];
      delete registeredKeyboardKeys[keyFunction];
    }
    if (nextKey && !nextKey.includes("MOUSE")) {
      const eventName = RegisterKeyEvent(nextKey, onKeyPressed, onKeyReleased);
      if (eventName) {
        registeredKeyboardEventNames[keyFunction] = eventName;
        registeredKeyboardKeys[keyFunction] = nextKey;
      }
    }
  }
}
const onKeyPressed = data => {
  const keyName = data.event_name;
  const keyFunction = ResolveKeyFunctionByKeyName(keyName);
  const selectionHotkey = keyFunction !== undefined && SELECTION_KEY_FUNCTIONS.includes(keyFunction);
  const payload = {
    key: keyName,
    position: GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition()),
    entIndex: Players.GetLocalPlayerPortraitUnit()
  };
  if (keyFunction !== undefined) {
    payload.keyFunction = keyFunction;
  }
  ClientSideEvent("key_pressed", payload);
  if (!selectionHotkey) {
    GameEvents.SendCustomEventToServer("key_pressed", {
      key: keyName,
      position: payload.position,
      entIndex: payload.entIndex
    });
  }
};
const onKeyReleased = data => {
  const keyName = data.event_name;
  const keyFunction = ResolveKeyFunctionByKeyName(keyName);
  const payload = {
    key: keyName,
    position: GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition()),
    entIndex: Players.GetLocalPlayerPortraitUnit()
  };
  if (keyFunction !== undefined) {
    payload.keyFunction = keyFunction;
  }
  ClientSideEvent("key_released", payload);
  GameEvents.SendCustomEventToServer("key_released", {
    key: keyName,
    position: payload.position,
    entIndex: payload.entIndex
  });
};
const [showPicker, setShowPicker] = libs.createSignal();
const [keyBindings, setKeyBindings] = libs.createSignal({
  ...DEFAULT_KEYBOARD_BINDINGS
});
const [gamepadBindings, setGamepadBindings] = libs.createSignal({
  ...DEFAULT_GAMEPAD_BINDINGS
});
const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
const [moveMode, setMoveMode] = libs.createSignal(MOVE_MODE_KEYBOARD);
const [aimMode, setAimMode] = libs.createSignal("2");
const [clickMoveMode, setClickMoveMode] = libs.createSignal(CLICK_MOVE_MODE_CLICK);
function ReadBooleanSetting(value, defaultValue) {
  if (value == undefined) {
    return defaultValue;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true" || normalized === "1") {
      return true;
    }
    if (normalized === "false" || normalized === "0") {
      return false;
    }
  }
  return defaultValue;
}
function ApplyCameraDistanceSetting(value) {
  const distance = Math.min(Math.max(toFiniteNumber(value, 1150), 900), 1675);
  CustomUIConfig.Camera.SetCameraDistance(distance);
}
function GetCameraDistanceSettingValue(data, settingName, defaultValue) {
  return Number(data?.[settingName]?.value ?? data?.["Setting_CameraDistance"]?.value ?? defaultValue);
}
function GetCameraFollowModeSettingValue(data) {
  const value = data?.["Setting_CameraFollowMode"]?.value;
  return value === "free" || value === "comfort" ? value : "classic";
}
function ApplyCameraFollowModeSetting(value) {
  CustomUIConfig.Camera.SetCameraFollowMode(value);
}
function GetCameraComfortDeadZoneRadiusSettingValue(data) {
  return Math.min(Math.max(toFiniteNumber(data?.["Setting_CameraComfortDeadZoneRadius"]?.value, 300), 0), 600);
}
function GetCameraComfortHalfLifeSettingValue(data) {
  return Math.min(Math.max(toFiniteNumber(data?.["Setting_CameraComfortHalfLife"]?.value, 160), 50), 500);
}
function ApplyCameraComfortFollowSetting(deadZoneRadius, halfLifeMs) {
  CustomUIConfig.Camera.SetCameraComfortFollowOptions(deadZoneRadius, halfLifeMs / 1000);
}
let lastKeybindDataStr = "";
libs.createEffect(libs.on(player_key_values, data => {
  const keybindData = {};
  for (const key in data) {
    if (key.startsWith("keybind_keyboard") || key.startsWith("keybind_gamepad")) {
      keybindData[key] = data[key];
    }
  }
  const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
  setMoveMode(mode);
  const aim = data?.["aim_mode"]?.value ?? "2";
  setAimMode(aim);
  const clickMode = data?.["click_move_mode"]?.value ?? CLICK_MOVE_MODE_CLICK;
  setClickMoveMode(clickMode);
  const currentDataStr = JSON.stringify(keybindData) + mode + clickMode;
  if (currentDataStr === lastKeybindDataStr) {
    return;
  }
  lastKeybindDataStr = currentDataStr;
  const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
  const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
  const bindings = {
    ...defaults
  };
  const gpBindings = {
    ...DEFAULT_GAMEPAD_BINDINGS
  };
  for (const key in data) {
    const kbPrefix = `keybind_keyboard${modePrefix}_`;
    if (key.startsWith(kbPrefix)) {
      const func = key.replace(kbPrefix, "");
      if (IsKeyboardMoveFunctionDisabled(mode, func)) {
        continue;
      }
      bindings[func] = data[key].value;
    }
    if (key.startsWith("keybind_gamepad_")) {
      const func = key.replace("keybind_gamepad_", "");
      gpBindings[func] = data[key].value;
    }
  }
  RemoveDisabledKeyboardMoveBindings(bindings, mode);
  setKeyBindings(bindings);
  setGamepadBindings(gpBindings);
  currentGamepadBindings = gpBindings;
  RebuildKeyToFunctionMap(bindings, gpBindings);
  SyncKeyboardKeyRegistrations(bindings);
}));
function Setting() {
  const {
    LayoutMenu,
    show,
    secondTabName,
    menuName
  } = EOM_MenuLayout.createMenuLayout("setting", () => ({}));
  const getKeyForFunction = (func, isGamepad) => {
    if (isGamepad) {
      return gamepadBindings()[func] ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
    }
    if (IsKeyboardMoveFunctionDisabled(moveMode(), func)) {
      return "";
    }
    const defaults = MOVE_MODE_DEFAULTS[moveMode()] ?? DEFAULT_KEYBOARD_BINDINGS;
    return GetLocalization(keyBindings()[func] ?? defaults[func] ?? DEFAULT_KEYBOARD_BINDINGS[func] ?? "");
  };
  const settings = solid_utils.createNetDataSignal("common", "settings");
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const isLocalHost = libs.createMemo(() => settings()?.is_local_host == true || settings()?.is_local_host);
  const [tabIndex, selectTabIndex] = libs.createSignal(0);
  const [password, setPassword] = libs.createSignal("");
  const isBattleStage = () => gameState()?.state === "GameState_Dungeon";
  const cameraFollowMode = libs.createMemo(() => GetCameraFollowModeSettingValue(player_key_values()));
  const cameraComfortDeadZoneRadius = libs.createMemo(() => GetCameraComfortDeadZoneRadiusSettingValue(player_key_values()));
  const cameraComfortHalfLife = libs.createMemo(() => GetCameraComfortHalfLifeSettingValue(player_key_values()));
  const setCameraFollowMode = value => {
    ApplyCameraFollowModeSetting(value);
    CallAction("/v1/key/save", {
      type: "setting",
      key: "Setting_CameraFollowMode",
      value
    });
  };
  return libs.createComponent(EOM_Popup.EOM_Popup, {
    id: "Setting",
    title: "#MenuButton_setting",
    get classList() {
      return {
        EOM_PopupMainShow: show(),
        ShowPicker: showPicker() != undefined
      };
    },
    hideClose: false,
    onClose: () => ToggleWindow("MenuButton_setting", false),
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "SettingMain"
          }, null),
          _el$2 = libs.createElement("Panel", {
            "class": "SettingColumn"
          }, _el$),
          _el$3 = libs.createElement("Panel", {
            "class": "TitleRow"
          }, _el$2);
          libs.createElement("Label", {
            text: "#Setting_Game",
            "class": "SectionHeader"
          }, _el$3);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$2);
          const _el$6 = libs.createElement("Panel", {
            "class": "SettingList VerticalScrollStyle",
            scroll: "y"
          }, _el$2),
          _el$7 = libs.createElement("Panel", {
            "class": "SettingRadioGroup"
          }, _el$6);
          libs.createElement("Label", {
            text: "#Setting_Autocast",
            "class": "SettingLabel"
          }, _el$7);
          const _el$9 = libs.createElement("Panel", {
            "class": "SettingRadioGroup"
          }, _el$6);
          libs.createElement("Label", {
            text: "#Setting_AimMode",
            "class": "SettingLabel"
          }, _el$9);
          const _el$1 = libs.createElement("Panel", {
            "class": "SettingRadioGroup"
          }, _el$6);
          libs.createElement("Label", {
            text: "#Setting_MoveMode",
            "class": "SettingLabel"
          }, _el$1);
          const _el$11 = libs.createElement("Panel", {
            "class": "Separator"
          }, _el$1),
          _el$12 = libs.createElement("Panel", {
            "class": "SettingRadioGroup"
          }, _el$1),
          _el$13 = libs.createElement("Panel", {
            "class": "SettingRadioGroup"
          }, _el$6);
          libs.createElement("Label", {
            text: "#Setting_CameraFollowMode",
            "class": "SettingLabel"
          }, _el$13);
          const _el$15 = libs.createElement("Panel", {
            "class": "SettingColumn"
          }, _el$),
          _el$16 = libs.createElement("Panel", {
            "class": "TitleRow"
          }, _el$15);
          libs.createElement("Label", {
            text: "#Setting_Hotkey",
            "class": "SectionHeader"
          }, _el$16);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$15);
          const _el$19 = libs.createElement("Panel", {
            id: "SettingTabContainer"
          }, _el$15),
          _el$20 = libs.createElement("Panel", {
            "class": "SettingTab VerticalScrollStyle",
            scroll: "y"
          }, _el$19),
          _el$21 = libs.createElement("Panel", {
            "class": "SettingTab VerticalScrollStyle",
            scroll: "y"
          }, _el$19),
          _el$22 = libs.createElement("Panel", {
            "class": "SettingColumn"
          }, _el$),
          _el$23 = libs.createElement("Panel", {
            "class": "TitleRow"
          }, _el$22);
          libs.createElement("Label", {
            text: "#Store_Exchange_Placeholder",
            "class": "SectionHeader"
          }, _el$23);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$22);
        libs.setProp(_el$6, "scroll", "y");
        libs.insert(_el$7, libs.createComponent(SettingSwitch, {
          text: "Attack",
          defaultValue: false
        }), null);
        libs.insert(_el$7, libs.createComponent(SettingSwitch, {
          text: "Skill",
          defaultValue: false
        }), null);
        libs.insert(_el$7, libs.createComponent(SettingSwitch, {
          text: "Dodge",
          defaultValue: false
        }), null);
        libs.insert(_el$7, libs.createComponent(SettingSwitch, {
          text: "Defense",
          defaultValue: false
        }), null);
        libs.insert(_el$7, libs.createComponent(SettingSwitch, {
          text: "Ultimate",
          defaultValue: false
        }), null);
        libs.insert(_el$9, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          get selected() {
            return aimMode() === "2";
          },
          tooltip: "Setting_AimMode_2_Description",
          group: "setting_aim_mode",
          text: "#Setting_AimMode_2",
          onactivate: () => Players.SetPlayerSetting("aim_mode", "2")
        }), null);
        libs.insert(_el$9, libs.createComponent(SettingSlider, {
          settingName: "Setting_aim_distance",
          get enable() {
            return aimMode() === "2";
          },
          min: 100,
          max: 1000,
          get value() {
            return Number(player_key_values()?.["Setting_aim_distance"]?.value ?? 300);
          }
        }), null);
        libs.insert(_el$9, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          get selected() {
            return aimMode() === "3";
          },
          tooltip: "Setting_AimMode_3_Description",
          group: "setting_aim_mode",
          text: "#Setting_AimMode_3",
          onactivate: () => Players.SetPlayerSetting("aim_mode", "3")
        }), null);
        libs.insert(_el$1, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_move_mode",
          text: "#Setting_MoveMode_1",
          get checked() {
            return moveMode() === MOVE_MODE_KEYBOARD;
          },
          onactivate: () => {
            CallAction("/v1/key/save", {
              type: "setting",
              key: "move_mode",
              value: MOVE_MODE_KEYBOARD
            });
            setMoveMode(MOVE_MODE_KEYBOARD);
          }
        }), _el$11);
        libs.insert(_el$1, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_move_mode",
          text: "#Setting_MoveMode_2",
          get checked() {
            return moveMode() === MOVE_MODE_LEFT_CLICK;
          },
          onactivate: () => {
            CallAction("/v1/key/save", {
              type: "setting",
              key: "move_mode",
              value: MOVE_MODE_LEFT_CLICK
            });
            setMoveMode(MOVE_MODE_LEFT_CLICK);
          }
        }), _el$12);
        libs.insert(_el$1, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_move_mode",
          text: "#Setting_MoveMode_3",
          get checked() {
            return moveMode() === MOVE_MODE_RIGHT_CLICK;
          },
          onactivate: () => {
            CallAction("/v1/key/save", {
              type: "setting",
              key: "move_mode",
              value: MOVE_MODE_RIGHT_CLICK
            });
            setMoveMode(MOVE_MODE_RIGHT_CLICK);
          }
        }), _el$12);
        libs.insert(_el$12, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_move_click_mode",
          text: "#Setting_ClickMoveMode_1",
          get enabled() {
            return moveMode() != MOVE_MODE_KEYBOARD;
          },
          get checked() {
            return clickMoveMode() === CLICK_MOVE_MODE_CLICK;
          },
          onactivate: () => {
            CallAction("/v1/key/save", {
              type: "setting",
              key: "click_move_mode",
              value: CLICK_MOVE_MODE_CLICK
            });
            setClickMoveMode(CLICK_MOVE_MODE_CLICK);
          }
        }), null);
        libs.insert(_el$12, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_move_click_mode",
          text: "#Setting_ClickMoveMode_2",
          get enabled() {
            return moveMode() != MOVE_MODE_KEYBOARD;
          },
          get checked() {
            return clickMoveMode() === CLICK_MOVE_MODE_HOLD;
          },
          onactivate: () => {
            CallAction("/v1/key/save", {
              type: "setting",
              key: "click_move_mode",
              value: CLICK_MOVE_MODE_HOLD
            });
            setClickMoveMode(CLICK_MOVE_MODE_HOLD);
          }
        }), null);
        libs.insert(_el$12, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_move_click_mode",
          text: "#Setting_ClickMoveMode_3",
          get enabled() {
            return moveMode() != MOVE_MODE_KEYBOARD;
          },
          get checked() {
            return clickMoveMode() === CLICK_MOVE_MODE_FOLLOW;
          },
          onactivate: () => {
            CallAction("/v1/key/save", {
              type: "setting",
              key: "click_move_mode",
              value: CLICK_MOVE_MODE_FOLLOW
            });
            setClickMoveMode(CLICK_MOVE_MODE_FOLLOW);
          }
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSwitch, {
          text: "damage_msg",
          defaultValue: true
        }), _el$13);
        libs.insert(_el$6, libs.createComponent(SettingSlotSlider, {
          settingName: "Setting_ParticleLevel",
          notches: 6,
          get value() {
            return Number(player_key_values()?.["Setting_ParticleLevel"]?.value ?? 8);
          }
        }), _el$13);
        libs.insert(_el$13, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_camera_follow_mode",
          text: "#Setting_CameraFollowMode_Classic",
          tooltip: "Setting_CameraFollowMode_Classic_Description",
          get checked() {
            return cameraFollowMode() === "classic";
          },
          onactivate: () => setCameraFollowMode("classic")
        }), null);
        libs.insert(_el$13, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_camera_follow_mode",
          text: "#Setting_CameraFollowMode_Comfort",
          tooltip: "Setting_CameraFollowMode_Comfort_Description",
          get checked() {
            return cameraFollowMode() === "comfort";
          },
          onactivate: () => setCameraFollowMode("comfort")
        }), null);
        libs.insert(_el$13, libs.createComponent(SettingSlider, {
          settingName: "Setting_CameraComfortDeadZoneRadius",
          get enable() {
            return cameraFollowMode() === "comfort";
          },
          min: 100,
          max: 600,
          get value() {
            return cameraComfortDeadZoneRadius();
          },
          onChange: value => ApplyCameraComfortFollowSetting(value, cameraComfortHalfLife())
        }), null);
        libs.insert(_el$13, libs.createComponent(SettingSlider, {
          settingName: "Setting_CameraComfortHalfLife",
          get enable() {
            return cameraFollowMode() === "comfort";
          },
          min: 50,
          max: 500,
          get value() {
            return cameraComfortHalfLife();
          },
          onChange: value => ApplyCameraComfortFollowSetting(cameraComfortDeadZoneRadius(), value)
        }), null);
        libs.insert(_el$13, libs.createComponent(EOM_RadioButton.EOM_RadioButton, {
          group: "setting_camera_follow_mode",
          text: "#Setting_CameraFollowMode_Free",
          tooltip: "Setting_CameraFollowMode_Free_Description",
          get checked() {
            return cameraFollowMode() === "free";
          },
          onactivate: () => setCameraFollowMode("free")
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSlider, {
          settingName: "Setting_BaseCameraDistance",
          min: 900,
          max: 1675,
          get value() {
            return GetCameraDistanceSettingValue(player_key_values(), "Setting_BaseCameraDistance", 900);
          },
          onChange: value => {
            if (!isBattleStage()) {
              ApplyCameraDistanceSetting(value);
            }
          }
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSlider, {
          settingName: "Setting_BattleCameraDistance",
          min: 900,
          max: 1675,
          get value() {
            return GetCameraDistanceSettingValue(player_key_values(), "Setting_BattleCameraDistance", 1150);
          },
          onChange: value => {
            if (isBattleStage()) {
              ApplyCameraDistanceSetting(value);
            }
          }
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSwitch, {
          text: "auto_pick",
          defaultValue: true
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSwitch, {
          text: "auto_pick_drop_item",
          defaultValue: false
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSwitch, {
          text: "chest_high_quality_only",
          defaultValue: true
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSwitch, {
          text: "hero_voice",
          defaultValue: true
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingDropDown, {
          text: "hero_voice_type"
        }), null);
        libs.insert(_el$6, libs.createComponent(SettingSwitch, {
          text: "guide",
          defaultValue: true
        }), null);
        libs.insert(_el$15, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
          list: ["#Setting_Keyboard", "#Setting_Gamepad"],
          onChange: index => selectTabIndex(index)
        }), _el$19);
        libs.setProp(_el$20, "scroll", "y");
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Up",
          get func() {
            return KeyFunction.Up;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Up, false);
          },
          get enabled() {
            return !IsKeyboardMoveFunctionDisabled(moveMode(), KeyFunction.Up);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Down",
          get func() {
            return KeyFunction.Down;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Down, false);
          },
          get enabled() {
            return !IsKeyboardMoveFunctionDisabled(moveMode(), KeyFunction.Down);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Left",
          get func() {
            return KeyFunction.Left;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Left, false);
          },
          get enabled() {
            return !IsKeyboardMoveFunctionDisabled(moveMode(), KeyFunction.Left);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Right",
          get func() {
            return KeyFunction.Right;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Right, false);
          },
          get enabled() {
            return !IsKeyboardMoveFunctionDisabled(moveMode(), KeyFunction.Right);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Ability1",
          get func() {
            return KeyFunction.Skill;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Skill, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Ability2",
          get func() {
            return KeyFunction.Dodge;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Dodge, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Ability3",
          get func() {
            return KeyFunction.Defense;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Defense, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Ability4",
          get func() {
            return KeyFunction.Ultimate;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Ultimate, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Attack",
          get func() {
            return KeyFunction.Attack;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Attack, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Interact",
          get func() {
            return KeyFunction.Interact;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Interact, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Attribute",
          get func() {
            return KeyFunction.Attribute;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Attribute, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_ToggleAutoCast",
          get func() {
            return KeyFunction.ToggleAutoCast;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.ToggleAutoCast, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Option1",
          get func() {
            return KeyFunction.Option1;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Option1, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Option2",
          get func() {
            return KeyFunction.Option2;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Option2, false);
          }
        }), null);
        libs.insert(_el$20, libs.createComponent(KeyBinder, {
          text: "#Hotkey_Option3",
          get func() {
            return KeyFunction.Option3;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Option3, false);
          }
        }), null);
        libs.setProp(_el$21, "scroll", "y");
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Up",
          get func() {
            return KeyFunction.Up;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Up, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Down",
          get func() {
            return KeyFunction.Down;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Down, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Left",
          get func() {
            return KeyFunction.Left;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Left, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Right",
          get func() {
            return KeyFunction.Right;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Right, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Ability1",
          get func() {
            return KeyFunction.Skill;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Skill, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Ability2",
          get func() {
            return KeyFunction.Dodge;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Dodge, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Ability3",
          get func() {
            return KeyFunction.Defense;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Defense, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Ability4",
          get func() {
            return KeyFunction.Ultimate;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Ultimate, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Attack",
          get func() {
            return KeyFunction.Attack;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Attack, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Interact",
          get func() {
            return KeyFunction.Interact;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Interact, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_Attribute",
          get func() {
            return KeyFunction.Attribute;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.Attribute, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_OptionUp",
          get func() {
            return KeyFunction.OptionUp;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.OptionUp, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_OptionDown",
          get func() {
            return KeyFunction.OptionDown;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.OptionDown, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_OptionConfirm",
          get func() {
            return KeyFunction.OptionConfirm;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.OptionConfirm, true);
          }
        }), null);
        libs.insert(_el$21, libs.createComponent(GamepadKeyBinder, {
          text: "#Hotkey_ToggleAutoCast",
          get func() {
            return KeyFunction.ToggleAutoCast;
          },
          get hotkey() {
            return getKeyForFunction(KeyFunction.ToggleAutoCast, true);
          }
        }), null);
        libs.insert(_el$22, libs.createComponent(Player.ExchangeEntry, {}), null);
        libs.insert(_el$22, libs.createComponent(libs.Show, {
          get when() {
            return !isLocalHost();
          },
          get children() {
            const _el$26 = libs.createElement("Panel", {
                "class": "SettingRadioGroup"
              }, null);
              libs.createElement("Label", {
                text: "#Setting_Account",
                "class": "SettingLabel"
              }, _el$26);
              const _el$28 = libs.createElement("Panel", {
                flowChildren: "right"
              }, _el$26);
            libs.setProp(_el$26, "tooltip", "#Setting_Account_description");
            libs.setProp(_el$28, "flowChildren", "right");
            libs.insert(_el$28, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
              get enabled() {
                return settings()?.is_local_host == false;
              },
              textmode: "password",
              get text() {
                return password();
              },
              onChange: (self, _, text) => setPassword(text)
            }), null);
            libs.insert(_el$28, libs.createComponent(EOM_Button.EOM_Button, {
              get enabled() {
                return settings()?.is_local_host == false;
              },
              size: "Small",
              text: "#Setting_Password_confirm",
              onactivate: () => {
                const pwd = password();
                if (pwd.length < 8) {
                  ErrorMessage("error_password_length");
                  return;
                }
                CallAction("/v1/player/change_password", {
                  password: pwd
                });
                setPassword("");
              }
            }), null);
            return _el$26;
          }
        }), null);
        libs.insert(_el$22, libs.createComponent(EOM_Button.EOM_Button, {
          get enabled() {
            return gameState()?.state == "GameState_Dungeon";
          },
          text: "#Setting_GiveUp",
          align: "right bottom",
          onactivate: self => GameEvents.SendCustomEventToServer("restart_game", {})
        }), null);
        libs.effect(_p$ => {
          const _v$ = {
              Show: tabIndex() == 0
            },
            _v$2 = {
              Show: tabIndex() == 1
            };
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$20, "classList", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$21, "classList", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$;
      })(), (() => {
        const _el$29 = libs.createElement("Panel", {
          width: "100%",
          height: "100%",
          padding: "20px",
          id: "KeyBindPickerContainer"
        }, null);
        libs.setProp(_el$29, "width", "100%");
        libs.setProp(_el$29, "height", "100%");
        libs.setProp(_el$29, "padding", "20px");
        libs.setProp(_el$29, "onactivate", () => setShowPicker(undefined));
        libs.insert(_el$29, libs.createComponent(libs.Show, {
          get when() {
            return showPicker()?.isGamepad !== true;
          },
          get children() {
            return libs.createComponent(KeyBindPicker, {
              onKeySelected: keyName => {
                const pickerData = showPicker();
                if (pickerData === undefined) {
                  return;
                }
                if (!pickerData.isGamepad && IsKeyboardMoveFunctionDisabled(moveMode(), pickerData.func)) {
                  setShowPicker(undefined);
                  return;
                }
                const currentKey = keyBindings()[pickerData.func] ?? DEFAULT_KEYBOARD_BINDINGS[pickerData.func] ?? "";
                if (currentKey === keyName) {
                  setShowPicker(undefined);
                  return;
                }
                if (SELECTION_KEY_FUNCTIONS.includes(pickerData.func) && SELECTION_KEY_FUNCTIONS.some(func => func !== pickerData.func && keyBindings()[func] === keyName)) {
                  ErrorMessage("#Hotkey_SelectionKeyConflict");
                  return;
                }
                GameEvents.SendCustomEventToServer("update_keybind", {
                  func: pickerData.func,
                  key: keyName,
                  isGamepad: false
                });
                const nextBindings = {
                  ...keyBindings(),
                  [pickerData.func]: keyName
                };
                setKeyBindings(nextBindings);
                RebuildKeyToFunctionMap(nextBindings, currentGamepadBindings);
                SyncKeyboardKeyRegistrations(nextBindings);
                setShowPicker(undefined);
              }
            });
          }
        }), null);
        libs.insert(_el$29, libs.createComponent(GamepadPicker, {
          get visible() {
            return showPicker()?.isGamepad === true;
          },
          get currentKey() {
            return showPicker()?.currentKey;
          },
          get descriptionText() {
            return showPicker()?.text;
          },
          onClose: () => setShowPicker(undefined),
          onConfirm: keyName => {
            const pickerData = showPicker();
            if (pickerData === undefined) {
              return;
            }
            const currentKey = gamepadBindings()[pickerData.func] ?? DEFAULT_GAMEPAD_BINDINGS[pickerData.func] ?? "";
            if (currentKey === keyName) {
              setShowPicker(undefined);
              return;
            }
            GameEvents.SendCustomEventToServer("update_keybind", {
              func: pickerData.func,
              key: keyName,
              isGamepad: true
            });
            const nextGamepadBindings = {
              ...gamepadBindings(),
              [pickerData.func]: keyName
            };
            setGamepadBindings(nextGamepadBindings);
            currentGamepadBindings = nextGamepadBindings;
            RebuildKeyToFunctionMap(keyBindings(), nextGamepadBindings);
            setShowPicker(undefined);
          }
        }), null);
        return _el$29;
      })()];
    }
  });
}
const KeyBinder = props => {
  const enabled = () => props.enabled ?? true;
  return (() => {
    const _el$30 = libs.createElement("Panel", {
        "class": "KeyBinderRow"
      }, null),
      _el$31 = libs.createElement("Label", {
        "class": "KeyBinderText",
        get text() {
          return props.text;
        }
      }, _el$30),
      _el$32 = libs.createElement("Panel", {
        "class": "KeyBinderInput"
      }, _el$30),
      _el$33 = libs.createElement("Label", {
        "class": "KeyBinderHotKey",
        get text() {
          return props.hotkey;
        }
      }, _el$32);
    libs.setProp(_el$32, "onactivate", self => {
      if (!enabled()) {
        return;
      }
      setShowPicker({
        func: props.func,
        panel: self,
        currentKey: props.hotkey || "",
        isGamepad: false,
        text: props.text
      });
    });
    libs.effect(_p$ => {
      const _v$3 = {
          Disable: !enabled()
        },
        _v$4 = props.text,
        _v$5 = enabled(),
        _v$6 = props.hotkey;
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$30, "classList", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$31, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$32, "enabled", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$33, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$30;
  })();
};
const GamepadKeyBinder = props => {
  const tooltip = GetLocalization(`${props.text}_Description`, "");
  return (() => {
    const _el$34 = libs.createElement("Panel", {
        "class": "KeyBinderRow"
      }, null),
      _el$35 = libs.createElement("Label", {
        "class": "KeyBinderText",
        get text() {
          return props.text;
        }
      }, _el$34),
      _el$36 = libs.createElement("Panel", {
        "class": "GamepadInput"
      }, _el$34);
    libs.setProp(_el$34, "tooltip", tooltip == "" ? undefined : tooltip);
    libs.setProp(_el$36, "onactivate", self => {
      setShowPicker({
        func: props.func,
        panel: self,
        currentKey: props.hotkey || "",
        isGamepad: true,
        text: props.text
      });
    });
    libs.insert(_el$36, libs.createComponent(EOM_GamePad.EOM_GamePad, {
      get keyName() {
        return props.hotkey;
      }
    }));
    libs.effect(_$p => libs.setProp(_el$35, "text", props.text, _$p));
    return _el$34;
  })();
};
const SettingSwitch = props => {
  const key = "setting_switch_" + props.text;
  const tooltip = GetLocalization(`#SettingSwitch_${props.text}_Description`, "");
  let value = libs.createMemo(() => ReadBooleanSetting(player_key_values()[key]?.value, props.defaultValue ?? false));
  return (() => {
    const _el$37 = libs.createElement("Panel", {
        "class": "SwitchSettingRow"
      }, null),
      _el$38 = libs.createElement("Label", {
        "class": "SwitchSettingText",
        get text() {
          return "#SettingSwitch_" + props.text;
        }
      }, _el$37);
    libs.setProp(_el$37, "tooltip", tooltip == "" ? undefined : tooltip);
    libs.insert(_el$37, libs.createComponent(EOM_Switch.EOM_Switch, {
      get selected() {
        return value();
      },
      onchange: (p, check) => Players.SetPlayerSetting("setting_switch_" + props.text, check)
    }), null);
    libs.effect(_$p => libs.setProp(_el$38, "text", "#SettingSwitch_" + props.text, _$p));
    return _el$37;
  })();
};
const HERO_VOICE_LANGUAGES = [{
  value: "schinese",
  label: "中文"
}, {
  value: "english",
  label: "English"
}, {
  value: "russian",
  label: "Русский"
}];
function GetHeroVoiceLanguageSettingValue(value) {
  if (value === "schinese" || value === "english" || value === "russian") {
    return value;
  }
  const language = Language();
  return language === "schinese" || language === "russian" ? language : "english";
}
const SettingDropDown = props => {
  const key = "setting_switch_" + props.text;
  const tooltip = GetLocalization(`#SettingSwitch_${props.text}_Description`, "");
  const selectedLanguage = libs.createMemo(() => GetHeroVoiceLanguageSettingValue(player_key_values()[key]?.value));
  const selectedIndex = libs.createMemo(() => HERO_VOICE_LANGUAGES.findIndex(option => option.value === selectedLanguage()));
  return (() => {
    const _el$39 = libs.createElement("Panel", {
        "class": "SwitchSettingRow"
      }, null),
      _el$40 = libs.createElement("Label", {
        "class": "SwitchSettingText",
        get text() {
          return "#SettingSwitch_" + props.text;
        }
      }, _el$39);
    libs.setProp(_el$39, "tooltip", tooltip == "" ? undefined : tooltip);
    libs.insert(_el$39, libs.createComponent(EOM_DropDown.EOM_DropDown, {
      type: "EquipmentDropDown",
      get index() {
        return selectedIndex();
      },
      onChange: index => {
        const option = HERO_VOICE_LANGUAGES[index];
        if (option != undefined) {
          Players.SetPlayerSetting(key, option.value);
        }
      },
      get children() {
        return HERO_VOICE_LANGUAGES.map(option => (() => {
          const _el$41 = libs.createElement("Label", {
            get text() {
              return option.label;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$41, "text", option.label, _$p));
          return _el$41;
        })());
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$40, "text", "#SettingSwitch_" + props.text, _$p));
    return _el$39;
  })();
};
const SettingSlotSlider = props => {
  const [level, setLevel] = libs.createSignal(props.value);
  let timerID;
  const tooltip = GetLocalization(`${props.settingName}_Description`, "");
  return (() => {
    const _el$42 = libs.createElement("Panel", {
        "class": "SettingSlotSlider"
      }, null),
      _el$43 = libs.createElement("Label", {
        get text() {
          return `#${props.settingName}`;
        },
        get vars() {
          return {
            value: GetLocalization("#SkipLevel_" + level())
          };
        }
      }, _el$42),
      _el$44 = libs.createElement("SlottedSlider", {
        "class": "HorizontalSlider",
        get notches() {
          return props.notches;
        },
        get value() {
          return 1 / (props.notches - 1) * props.value;
        },
        direction: "horizontal"
      }, _el$42);
    libs.setProp(_el$42, "tooltip", tooltip == "" ? undefined : tooltip);
    libs.setProp(_el$44, "onvaluechanged", self => {
      const level = Round(self.value * (props.notches - 1));
      setLevel(level);
      if (timerID != undefined) {
        $.CancelScheduled(timerID);
      }
      timerID = $.Schedule(3, () => {
        CallAction("/v1/key/save", {
          type: "setting",
          key: props.settingName,
          value: level.toString()
        });
        timerID = undefined;
      });
    });
    libs.effect(_p$ => {
      const _v$7 = `#${props.settingName}`,
        _v$8 = {
          value: GetLocalization("#SkipLevel_" + level())
        },
        _v$9 = props.notches,
        _v$0 = 1 / (props.notches - 1) * props.value;
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$43, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$43, "vars", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$44, "notches", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$44, "value", _v$0, _p$._v$0));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined
    });
    return _el$42;
  })();
};
const SettingSlider = props => {
  const [level, setLevel] = libs.createSignal(props.value);
  let timerID;
  const tooltip = GetLocalization(`${props.settingName}_Description`, "");
  return (() => {
    const _el$45 = libs.createElement("Panel", {
        "class": "SettingSlider"
      }, null),
      _el$46 = libs.createElement("Label", {
        get text() {
          return `#${props.settingName}`;
        },
        get vars() {
          return {
            value: GetLocalization("#SkipLevel_" + level())
          };
        }
      }, _el$45),
      _el$47 = libs.createElement("Slider", {
        "class": "HorizontalSlider",
        get min() {
          return props.min;
        },
        get max() {
          return props.max;
        },
        get value() {
          return props.value;
        },
        direction: "horizontal"
      }, _el$45);
    libs.setProp(_el$45, "tooltip", tooltip == "" ? undefined : tooltip);
    libs.setProp(_el$47, "onvaluechanged", self => {
      const level = Round(self.value);
      setLevel(level);
      props.onChange?.(level);
      if (timerID != undefined) {
        $.CancelScheduled(timerID);
      }
      timerID = $.Schedule(3, () => {
        CallAction("/v1/key/save", {
          type: "setting",
          key: props.settingName,
          value: level.toString()
        });
        timerID = undefined;
      });
    });
    libs.effect(_p$ => {
      const _v$1 = {
          Disable: !(props.enable ?? true)
        },
        _v$10 = `#${props.settingName}`,
        _v$11 = {
          value: GetLocalization("#SkipLevel_" + level())
        },
        _v$12 = props.enable ?? true,
        _v$13 = props.min,
        _v$14 = props.max,
        _v$15 = props.value;
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$45, "classList", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$46, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$46, "vars", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$47, "enabled", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$47, "min", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$47, "max", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$47, "value", _v$15, _p$._v$15));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined,
      _v$15: undefined
    });
    return _el$45;
  })();
};
libs.render(Setting, $.GetContextPanel());
const gamepadKeys = ["pov_up", "pov_down", "pov_left", "pov_right", "z_axis_pos", "v_axis_pos", "y_axis_neg", "y_axis_pos", "x_axis_neg", "x_axis_pos", "r_axis_neg", "r_axis_pos", "u_axis_neg", "u_axis_pos", "joy1", "joy2", "joy3", "joy4", "joy5", "joy6", "joy7", "joy8", "joy9", "joy10", "joy11"];
for (const key of gamepadKeys) {
  RegisterKeyEvent(key, onKeyPressed, onKeyReleased);
}
let isMouseLocked = true;
libs.onMount(() => {
  const [demoSetting, _setDemoSetting] = libs.createSignal(CustomNetTables.GetTableValue("common", "demo_settings"));
  libs.createEffect(libs.on(demoSetting, setting => {
    if (setting) {
      isMouseLocked = setting.lock_mouse == 1;
    }
  }));
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "demo_settings") {
        _setDemoSetting(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
});
function IsEnemyAtCursor() {
  const cursorEntity = GetCursorEntity();
  return cursorEntity !== -1 && Entities.IsEnemy(cursorEntity) && Entities.IsAlive(cursorEntity);
}
function IsAbilityCasting(abilityIndex) {
  if (Abilities.IsInAbilityPhase(abilityIndex)) {
    return true;
  }
  return false;
}
function IsHeroCastingAbility(heroIndex) {
  for (let slot = 0; slot < 10; slot++) {
    const abilityIndex = Entities.GetAbility(heroIndex, slot);
    if (abilityIndex && Entities.IsValidEntity(abilityIndex) && IsAbilityCasting(abilityIndex)) {
      return true;
    }
  }
  return false;
}
function MoveHeroToPosition(position) {
  const heroIndex = Players.GetLocalPlayerPortraitUnit();
  if (heroIndex && !IsHeroCastingAbility(heroIndex)) {
    Game.PrepareUnitOrders({
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_MOVE_TO_POSITION,
      Position: position,
      UnitIndex: heroIndex,
      QueueBehavior: OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER
    });
  }
}
function SendKeyPressedForMove(keyName, keyFunction, position) {
  const payload = {
    key: keyName,
    position: position,
    entIndex: Players.GetLocalPlayerPortraitUnit(),
    keyFunction: keyFunction
  };
  ClientSideEvent("key_pressed", payload);
  GameEvents.SendCustomEventToServer("key_pressed", {
    key: keyName,
    position: payload.position,
    entIndex: payload.entIndex
  });
}
function SendKeyReleasedForMove(keyName, position) {
  const keyFunction = ResolveKeyFunctionByKeyName(keyName);
  const payload = {
    key: keyName,
    position: position,
    entIndex: Players.GetLocalPlayerPortraitUnit()
  };
  if (keyFunction !== undefined) {
    payload.keyFunction = keyFunction;
  }
  ClientSideEvent("key_released", payload);
  GameEvents.SendCustomEventToServer("key_released", {
    key: keyName,
    position: payload.position,
    entIndex: payload.entIndex
  });
}
let continuousMoveTimerID;
function StartContinuousMove() {
  if (continuousMoveTimerID !== undefined) return;
  const tick = () => {
    const position = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition());
    if (position) {
      MoveHeroToPosition(position);
    }
    continuousMoveTimerID = $.Schedule(0.05, tick);
  };
  tick();
}
function StopContinuousMove() {
  if (continuousMoveTimerID !== undefined) {
    $.CancelScheduled(continuousMoveTimerID);
    continuousMoveTimerID = undefined;
  }
}
libs.createEffect(libs.on(clickMoveMode, mode => {
  if (mode === CLICK_MOVE_MODE_FOLLOW && moveMode() !== MOVE_MODE_KEYBOARD) {
    StartContinuousMove();
  } else {
    StopContinuousMove();
  }
}));
libs.createEffect(libs.on(moveMode, mode => {
  if (mode === MOVE_MODE_KEYBOARD) {
    StopContinuousMove();
  } else if (clickMoveMode() === CLICK_MOVE_MODE_FOLLOW) {
    StartContinuousMove();
  }
}));
GameUI.CustomUIConfig().SubscribeMouseEvent("controller", data => {
  if (!isMouseLocked) return false;
  const keyName = `MOUSE${data.value}`;
  const position = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition());
  const selectionFunction = ResolveKeyFunctionByKeyName(keyName);
  if (selectionFunction !== undefined && SELECTION_KEY_FUNCTIONS.includes(selectionFunction)) {
    if (data.event_name === "pressed") onKeyPressed({
      event_name: keyName
    });else if (data.event_name === "released") onKeyReleased({
      event_name: keyName
    });
    return true;
  }
  const currentMode = moveMode();
  const isMoveClick = currentMode === MOVE_MODE_LEFT_CLICK && data.value === 0 || currentMode === MOVE_MODE_RIGHT_CLICK && data.value === 1;
  if (isMoveClick) {
    const currentClickMode = clickMoveMode();
    if (data.event_name == "pressed" && position) {
      const keyFunction = ResolveKeyFunctionByKeyName(keyName);
      if (currentClickMode === CLICK_MOVE_MODE_CLICK) {
        if (keyFunction !== undefined && IsEnemyAtCursor()) {
          SendKeyPressedForMove(keyName, keyFunction, position);
        } else {
          MoveHeroToPosition(position);
        }
      } else if (currentClickMode === CLICK_MOVE_MODE_HOLD) {
        if (keyFunction !== undefined && IsEnemyAtCursor()) {
          SendKeyPressedForMove(keyName, keyFunction, position);
        }
        StartContinuousMove();
      } else if (currentClickMode === CLICK_MOVE_MODE_FOLLOW) {
        if (keyFunction !== undefined && IsEnemyAtCursor()) {
          SendKeyPressedForMove(keyName, keyFunction, position);
        }
      }
    } else if (data.event_name == "released") {
      if (currentClickMode === CLICK_MOVE_MODE_HOLD) {
        StopContinuousMove();
      }
      SendKeyReleasedForMove(keyName, position);
    }
    return true;
  }
  const keyFunction = ResolveKeyFunctionByKeyName(keyName);
  const payload = {
    key: keyName,
    position: position,
    entIndex: Players.GetLocalPlayerPortraitUnit()
  };
  if (keyFunction !== undefined) {
    payload.keyFunction = keyFunction;
  }
  if (data.event_name == "pressed") {
    ClientSideEvent("key_pressed", payload);
    GameEvents.SendCustomEventToServer("key_pressed", {
      key: keyName,
      position: payload.position,
      entIndex: payload.entIndex
    });
  } else if (data.event_name == "released") {
    ClientSideEvent("key_released", payload);
    GameEvents.SendCustomEventToServer("key_released", {
      key: keyName,
      position: payload.position,
      entIndex: payload.entIndex
    });
  }
  return true;
});
GameEvents.Subscribe("cast_on_position", data => {
  const showEffects = data.showEffects != 0;
  const position = GameUI.GetScreenWorldPosition(GameUI.GetCursorPosition());
  if (position && data.abilityIndex != undefined && Abilities.IsCooldownReady(data.abilityIndex)) {
    Game.PrepareUnitOrders({
      OrderType: data.dotaunitorder_t ?? dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION,
      AbilityIndex: data.abilityIndex,
      Position: position,
      UnitIndex: Players.GetLocalPlayerPortraitUnit(),
      QueueBehavior: OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER,
      ShowEffects: showEffects
    });
  }
});