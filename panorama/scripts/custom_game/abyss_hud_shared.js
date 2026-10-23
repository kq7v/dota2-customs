--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('abyss_hud_shared', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EMPTY_COMBO_STATE = {
  comboCount: 0,
  comboScore: 0,
  currentMultiplier: COMBO_CONFIG.initialMultiplier,
  peakMultiplier: COMBO_CONFIG.initialMultiplier,
  multiplierProgressCount: 0,
  comboTimer: 0,
  comboTimerEndTime: 0,
  isTimerRunning: false,
  isPaused: false
};
function createNullableNetDataSignal(tableName, tableKey) {
  const [value, setValue] = libs.createSignal(getNetDataKey(tableName, tableKey));
  libs.onMount(() => {
    const listener = useNetDataKey(tableName, tableKey, nextValue => {
      setValue(() => nextValue);
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(listener);
    });
  });
  return value;
}
function createGameTimeSignal(interval = 500) {
  const [now, setNow] = libs.createSignal(Game.GetGameTime());
  libs.onMount(() => {
    const timer = setInterval(() => {
      setNow(Game.GetGameTime());
    }, interval);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  return now;
}
function getComboTimeRemaining(state, now) {
  const endTime = state.comboTimerEndTime ?? 0;
  if (!state.isTimerRunning || state.isPaused || endTime <= 0) {
    return Math.max(0, state.comboTimer);
  }
  return Math.max(0, endTime - now);
}
function formatInteger(value) {
  const raw = Math.max(0, Math.floor(value ?? 0)).toString();
  let result = "";
  let groupCount = 0;
  for (let i = raw.length - 1; i >= 0; i--) {
    result = raw[i] + result;
    groupCount += 1;
    if (groupCount === 3 && i > 0) {
      result = "," + result;
      groupCount = 0;
    }
  }
  return result;
}
function formatPercent(value) {
  return `${Math.max(0, Math.min(100, value)).toFixed(0)}%`;
}
function formatSeconds(value) {
  const seconds = Math.max(0, Math.ceil(value));
  return `${seconds}s`;
}
function formatClock(value) {
  const totalSeconds = Math.max(0, Math.ceil(value));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function formatMultiplier(value) {
  return `${(value ?? COMBO_CONFIG.initialMultiplier).toFixed(1)}x`;
}
function buildEventKey(event) {
  return `${event.eventId}:${event.endTime}`;
}
function createAbyssEventBroadcast(activeEvents, duration = 2800) {
  const [broadcastEvent, setBroadcastEvent] = libs.createSignal();
  const [showBroadcast, setShowBroadcast] = libs.createSignal(false);
  let seenEventKeys = new Set((activeEvents() ?? []).map(buildEventKey));
  let hasObservedEvents = activeEvents() !== undefined;
  let broadcastTimer;
  libs.createEffect(() => {
    const events = activeEvents() ?? [];
    const nextKeys = new Set(events.map(buildEventKey));
    if (!hasObservedEvents) {
      seenEventKeys = nextKeys;
      hasObservedEvents = true;
      return;
    }
    const newEvent = events.find(event => !seenEventKeys.has(buildEventKey(event)));
    seenEventKeys = nextKeys;
    if (newEvent === undefined) {
      return;
    }
    if (broadcastTimer !== undefined) {
      clearTimeout(broadcastTimer);
    }
    setBroadcastEvent(newEvent);
    setShowBroadcast(false);
    setTimeout(() => {
      setShowBroadcast(true);
    }, 0);
    broadcastTimer = setTimeout(() => {
      setShowBroadcast(false);
    }, duration);
  });
  libs.onCleanup(() => {
    if (broadcastTimer !== undefined) {
      clearTimeout(broadcastTimer);
    }
  });
  return {
    broadcastEvent,
    showBroadcast
  };
}

exports.EMPTY_COMBO_STATE = EMPTY_COMBO_STATE;
exports.createAbyssEventBroadcast = createAbyssEventBroadcast;
exports.createGameTimeSignal = createGameTimeSignal;
exports.createNullableNetDataSignal = createNullableNetDataSignal;
exports.formatClock = formatClock;
exports.formatInteger = formatInteger;
exports.formatMultiplier = formatMultiplier;
exports.formatPercent = formatPercent;
exports.formatSeconds = formatSeconds;
exports.getComboTimeRemaining = getComboTimeRemaining;