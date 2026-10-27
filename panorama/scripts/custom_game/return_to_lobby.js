--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('return_to_lobby', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function ReturnToLobby(props) {
  const [available, setAvailable] = libs.createSignal(false);
  let retry;
  const listener = GameEvents.Subscribe('client_side_event', event => {
    if (event.event_name !== 'platform_route_status') return;
    try {
      setAvailable(JSON.parse(event.event_data).available === true);
    } catch {
      setAvailable(false);
    }
  });
  libs.onMount(() => {
    const initialize = () => {
      if (available()) return;
      const map = Game.GetMapInfo()?.map_display_name;
      if (map === 'platform_entry' || map === 'platform_lobby') {
        GameEvents.SendEventClientSide('client_side_event', {
          event_name: 'platform_client_ready',
          event_data: map
        });
      }
      GameEvents.SendEventClientSide('client_side_event', {
        event_name: 'platform_route_query',
        event_data: '{}'
      });
      retry = $.Schedule(0.5, initialize);
    };
    initialize();
  });
  libs.onCleanup(() => {
    GameEvents.Unsubscribe(listener);
    if (retry !== undefined) $.CancelScheduled(retry);
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return available();
    },
    get children() {
      const _el$ = libs.createElement("Button", {
          "class": "PlatformReturnButton"
        }, null),
        _el$2 = libs.createElement("Label", {
          get text() {
            return props.retry ? '#platform_retry' : '#platform_return';
          }
        }, _el$);
      libs.setProp(_el$, "onactivate", () => GameEvents.SendEventClientSide('client_side_event', {
        event_name: 'platform_return',
        event_data: '{}'
      }));
      libs.effect(_$p => libs.setProp(_el$2, "text", props.retry ? '#platform_retry' : '#platform_return', _$p));
      return _el$;
    }
  });
}

exports.ReturnToLobby = ReturnToLobby;