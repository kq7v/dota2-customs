--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

let LastTIP = 1;
for (let i = 1; i < 1000; i++) {
  const key = "#Custom_Tip_" + i;
  const sLoc = GetLocalization(key);
  if (key == sLoc) {
    break;
  }
  LastTIP = i;
}
let tipQueue = Array(LastTIP).fill(1).map((a, i) => i + 1).sort(() => Math.random() - 0.5);
const CustomTip = props => {
  const merged = libs.mergeProps({
    tick: 5
  }, props);
  const [local, others] = libs.splitProps(merged, ["tick"]);
  const [index, SetIndex] = libs.createSignal(0);
  const [id, setID] = libs.createSignal(-1);
  const PrevTip = () => {
    SetIndex(old => (old <= 0 ? old + LastTIP - 1 : old - 1) % LastTIP);
  };
  const nextTip = () => {
    SetIndex(old => (old + 1) % LastTIP);
  };
  libs.createEffect(libs.on(index, v => {
    if (id() != -1) {
      try {
        $.CancelScheduled(id());
      } catch (error) {}
    }
    setID($.Schedule(local.tick, () => {
      nextTip();
    }));
  }));
  libs.onCleanup(() => {
    if (id() != -1) {
      try {
        $.CancelScheduled(id());
        setID(-1);
      } catch (error) {}
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        "class": "CustomTip"
      }), null),
      _el$2 = libs.createElement("Button", {
        id: "PrevTip"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "TipLabel",
        get text() {
          return "#c1_Custom_Tip_" + tipQueue[index()];
        },
        hittest: false
      }, _el$),
      _el$4 = libs.createElement("Button", {
        id: "NextTip"
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      "class": "CustomTip"
    }), true);
    libs.setProp(_el$2, "onactivate", PrevTip);
    libs.setProp(_el$4, "onactivate", nextTip);
    libs.effect(_$p => libs.setProp(_el$3, "text", "#c1_Custom_Tip_" + tipQueue[index()], _$p));
    return _el$;
  })();
};

function Root() {
  const [show, setShow] = libs.createSignal($.GetContextPanel().BHasClass("Paused"));
  const customPause = solid_utils.createNetTableSignal("common", "custom_pause", {
    pause: 0
  });
  libs.createEffect(() => {
    setShow(customPause().pause == 1);
    $.GetContextPanel().SetHasClass("Paused", customPause().pause == 1);
  });
  const [sPauseKey, setPauseKey] = libs.createSignal(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_PAUSE));
  libs.createEffect(() => {
    const id = GameEvents.Subscribe("keybind_changed", events => {
      setPauseKey(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_PAUSE));
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
  });
  libs.createEffect(libs.on(sPauseKey, value => {
    const sCommand = value + Date.now() / 1000;
    Game.CreateCustomKeyBind(value, "+" + sCommand);
    Game.AddCommand("+" + sCommand, () => {
      GameEvents.SendCustomEventToServer("CustomTogglePause", {});
    }, "", 1 << 26);
  }));
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return [libs.createElement("Label", {
        id: "CustomPausing",
        text: "#CustomPausing",
        hittest: false
      }, null), libs.createComponent(CustomTip, {
        id: "PauseCustomTip",
        hittest: false
      })];
    }
  });
}
libs.render(() => libs.createComponent(Root, {}), $.GetContextPanel());