--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('common_utils', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function createLocalConsoleMessage(event, callback) {
  const command = String(Date.now() / 1000);
  GameEvents.SendEventClientSide("custom_local_console_message", {
    key: command,
    event: event,
    enable: 1
  });
  Game.AddCommand(event + command, (_, data) => {
    data = decodeURIComponent(data.replace(/\+/g, ' '));
    let v = JSON.parseSafe(data);
    callback(v);
  }, "", 1 << 26);
  libs.onCleanup(() => {
    GameEvents.SendEventClientSide("custom_local_console_message", {
      key: command,
      event: event,
      enable: 0
    });
  });
}

exports.createLocalConsoleMessage = createLocalConsoleMessage;