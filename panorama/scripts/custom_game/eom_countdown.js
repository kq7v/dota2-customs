--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Countdown', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Countdown = props => {
  const merged = libs.mergeProps({
    updateInterval: 1,
    timeDialogVariable: "countdown_time",
    text: "{day}d {hour}h {min}m",
    onlyCoundown: true,
    short: false
  }, props, {
    class: "EOM_Countdown"
  });
  const [local, others] = libs.splitProps(merged, ["endTime", "updateInterval", "timeDialogVariable", "icon", "text", "onlyCoundown", "limitTime", "short"]);
  let ref;
  const refresh = () => {
    const diff = local.onlyCoundown ? Math.floor(local.endTime - Date.now() / 1000) : Math.floor(Math.abs(local.endTime - Date.now() / 1000));
    let days = Math.max(0, Math.floor(diff / 86400));
    let hours = Math.max(0, Math.floor(diff % 86400 / 3600));
    let minutes = Math.max(0, Math.floor(diff % 3600 / 60));
    const remainingSeconds = Math.max(0, diff % 60);
    if (local.limitTime != undefined) {
      if (local.limitTime.day != undefined && days >= local.limitTime.day) {
        days = local.limitTime.day;
        hours = 0;
        minutes = 0;
      } else if (local.limitTime.hours != undefined && hours >= local.limitTime.hours) {
        days = 0;
        hours = local.limitTime.hours;
        minutes = 0;
      } else if (local.limitTime.minutes != undefined && minutes >= local.limitTime.minutes) {
        days = 0;
        hours = 0;
        minutes = local.limitTime.minutes;
      }
    }
    if (ref?.IsValid()) {
      if (local.short) {
        let text = "";
        if (days > 0) {
          text += days.toString() + GetLocalization("#day");
        }
        text += hours.toString() + GetLocalization("#hour");
        if (days <= 0) {
          text += minutes.toString() + GetLocalization("#min");
        }
        ref.text = text;
      } else {
        ref.text = GetLocalization(local.text).replace("{day}", days.toString()).replace("{hour}", hours.toString().padStart(2, '0')).replace("{min}", minutes.toString().padStart(2, '0')).replace("{sec}", remainingSeconds.toString().padStart(2, '0'));
      }
    }
  };
  libs.onMount(() => {
    refresh();
    const timer = setInterval(() => {
      refresh();
    }, local.updateInterval * 1000);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$3 = libs.createElement("Label", {}, _el$);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.icon;
      },
      get children() {
        return libs.createElement("Image", {
          "class": "EOM_CountdownIcon"
        }, null);
      }
    }), _el$3);
    const _ref$ = ref;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$3) : ref = _el$3;
    return _el$;
  })();
};

exports.EOM_Countdown = EOM_Countdown;