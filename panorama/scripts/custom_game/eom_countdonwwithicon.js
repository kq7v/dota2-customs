--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_CountdonwWithIcon', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Countdown = require('./EOM_Countdown.js');

const EOM_CountdownWithIcon = props => {
  const [local, other] = libs.splitProps(props, ["endTime", "updateInterval", "text", "onlyCoundown", "limitTime", "short"]);
  let now = () => Math.floor(Date.now() / 1000);
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps$1(() => EOM_Panel.EOMProps(other, {
    className: libs.classNames("EOM_CountdonwWithIcon", {
      LowTime: now() > (local.endTime ?? 0) - 24 * 60 * 60
    })
  }), {
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Image", {}, null);
        libs.setProp(_el$, "className", "CountDownIcon");
        return _el$;
      })(), libs.createComponent(EOM_Countdown.EOM_Countdown, local)];
    }
  }));
};

exports.EOM_CountdownWithIcon = EOM_CountdownWithIcon;