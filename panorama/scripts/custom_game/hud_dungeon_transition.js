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

function DungeonTransition() {
  const transitionData = solid_utils.createNetDataSignal("dungeon", "transition");
  return libs.createComponent(libs.Show, {
    get when() {
      return transitionData()?.isTransitioning;
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "DungeonTransition"
        }, null);
        libs.createElement("Panel", {
          "class": "TransitionOverlay"
        }, _el$);
        const _el$3 = libs.createElement("Panel", {
          "class": "TransitionContent"
        }, _el$),
        _el$4 = libs.createElement("Label", {
          "class": "ZoneName",
          get text() {
            return `第 ${transitionData()?.zone || 1} 关`;
          }
        }, _el$3),
        _el$5 = libs.createElement("Label", {
          "class": "RoomDepth",
          get text() {
            return `房间 ${transitionData()?.depth || 1} / ${transitionData()?.totalRooms || 10}`;
          }
        }, _el$3);
      libs.effect(_p$ => {
        const _v$ = `第 ${transitionData()?.zone || 1} 关`,
          _v$2 = `房间 ${transitionData()?.depth || 1} / ${transitionData()?.totalRooms || 10}`;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined
      });
      return _el$;
    }
  });
}
libs.render(() => libs.createComponent(DungeonTransition, {}), $.GetContextPanel());