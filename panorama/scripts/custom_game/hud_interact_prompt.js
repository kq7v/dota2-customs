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

function InteractPrompt() {
  const playerID = Players.GetLocalPlayer();
  const promptData = solid_utils.createPlayerNetDataSignal("dungeon", `interact_prompt_p${playerID}`);
  return libs.createComponent(libs.Show, {
    get when() {
      return promptData()?.show;
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "InteractPrompt"
        }, null),
        _el$2 = libs.createElement("Panel", {
          "class": "PromptContent"
        }, _el$),
        _el$3 = libs.createElement("Label", {
          "class": "PromptText",
          get text() {
            return promptData()?.text || "";
          }
        }, _el$2);
      libs.effect(_$p => libs.setProp(_el$3, "text", promptData()?.text || "", _$p));
      return _el$;
    }
  });
}
libs.render(() => libs.createComponent(InteractPrompt, {}), $.GetContextPanel());