--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('solid_utils', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function parseTokenCosts(rawCost) {
  if (!rawCost) {
    return [];
  }
  const costs = [];
  const costIndexes = {};
  for (const rawEntry of rawCost.split("|")) {
    const separatorIndex = rawEntry.indexOf(":");
    if (separatorIndex <= 0 || separatorIndex >= rawEntry.length - 1) {
      return [];
    }
    const rawName = rawEntry.slice(0, separatorIndex).trim();
    const rawValue = rawEntry.slice(separatorIndex + 1).trim();
    const tokenID = Number(rawName);
    const value = Number(rawValue);
    if (!Number.isFinite(tokenID) || tokenID <= 0 || !Number.isFinite(value) || value < 0) {
      return [];
    }
    const name = String(tokenID);
    const existingIndex = costIndexes[name];
    if (existingIndex == undefined) {
      costIndexes[name] = costs.length;
      costs.push({
        name,
        value
      });
    } else {
      costs[existingIndex].value += value;
    }
  }
  return costs;
}
function resolveServiceNetDataArgs(defaultPlayerID, args) {
  let defaultVar;
  let playerID = defaultPlayerID;
  if (args.length == 2) {
    [defaultVar, playerID] = args;
  } else if (args.length == 1) {
    let first = args[0];
    if (typeof first == "number") {
      playerID = first;
    } else {
      defaultVar = first;
    }
  }
  return {
    defaultVar,
    playerID
  };
}
function getServiceRegistry() {
  CustomUIConfig.__serviceNetDataRegistry ??= {};
  return CustomUIConfig.__serviceNetDataRegistry;
}
function getServiceRegistryKey(key, playerID) {
  return `service:${String(key)}:${playerID}`;
}
function acquireSharedServiceNetData(key, playerID) {
  const registry = getServiceRegistry();
  const registryKey = getServiceRegistryKey(key, playerID);
  let entry = registry[registryKey];
  if (entry == undefined) {
    const initialData = getServiceNetData(key, playerID);
    const [data, setData] = libs.createSignal(initialData);
    const listenerID = useServiceNetData(key, tData => {
      setData(() => tData);
    }, playerID);
    entry = {
      data,
      initialData,
      listenerID,
      refCount: 0
    };
    registry[registryKey] = entry;
  }
  entry.refCount++;
  const release = () => {
    const current = registry[registryKey];
    if (current == undefined) {
      return;
    }
    current.refCount--;
    if (current.refCount <= 0) {
      CustomNetTables.UnsubscribeNetTableListener(current.listenerID);
      delete registry[registryKey];
    }
  };
  if (libs.getOwner() != undefined) {
    libs.onCleanup(release);
  }
  return entry.data;
}
function createDefaultedServiceAccessor(sharedData, defaultVar) {
  return () => {
    const value = sharedData();
    return value == undefined ? defaultVar : value;
  };
}
function createToggleWindowSignal(windowName, state, options) {
  const [value, setter] = libs.createSignal(state ?? false);
  libs.onMount(() => {
    let id = useClientSideEvent("custom_ui_toggle_windows", eventData => {
      if (eventData.windowName == windowName) {
        if (eventData.state === undefined) {
          setter(value => !value);
        } else {
          setter(eventData.state == 1 || eventData.state === true);
        }
      } else if (!options?.ignoreOtherWindows) {
        setter(false);
      }
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
  });
  return [value, setter];
}
function createNetDataSignal(tableName, tableKey, defaultVar) {
  const [v, setter] = libs.createSignal(getNetDataKey(tableName, tableKey) ?? defaultVar);
  libs.onMount(() => {
    let id = useNetDataKey(tableName, tableKey, value => {
      setter(value ?? defaultVar);
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return v;
}
function createPlayerNetDataSignal(tableName, tableKey, defaultVar, playerID) {
  const actualPlayerID = playerID ?? Players.GetLocalPlayer();
  const [v, setter] = libs.createSignal(getNetDataKey(tableName, tableKey, actualPlayerID) ?? defaultVar);
  libs.onMount(() => {
    let id = useNetDataKey(tableName, tableKey, value => {
      setter(value ?? defaultVar);
    }, actualPlayerID);
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return v;
}
function createNetTableSignal(tableName, tableKey, defaultVar) {
  const [v, setter] = libs.createSignal(CustomNetTables.GetTableValue(tableName, tableKey) ?? defaultVar);
  libs.onMount(() => {
    let id = CustomNetTables.SubscribeNetTableListener(tableName, (_, key, value) => {
      if (key == tableKey && value != undefined) {
        setter(value);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return v;
}
function createPlayerPropertyData(playerID) {
  const [data, setData] = libs.createSignal({});
  libs.createEffect(() => {
    const tableKey = `1_${playerID()}`;
    setData(CustomNetTables.GetTableValue("property_system", tableKey) ?? {});
    const listenerID = CustomNetTables.SubscribeNetTableListener("property_system", (_, key, value) => {
      if (key === tableKey) {
        setData(value ?? {});
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(listenerID);
    });
  });
  return data;
}
function createServiceNetData(key, ...args) {
  const {
    defaultVar,
    playerID
  } = resolveServiceNetDataArgs(Players.GetLocalPlayer(), args);
  return createDefaultedServiceAccessor(acquireSharedServiceNetData(key, playerID), defaultVar);
}
function createPlayerUnreadIds(system) {
  const playerUnreadIds = createServiceNetData("player_unread_ids", {});
  CustomUIConfig.__playerUnreadReadCacheRegistry ??= {};
  let entry = CustomUIConfig.__playerUnreadReadCacheRegistry[system];
  if (entry == undefined) {
    const [readCache, setReadCache] = libs.createStore({});
    entry = {
      readCache,
      setReadCache
    };
    CustomUIConfig.__playerUnreadReadCacheRegistry[system] = entry;
  }
  const {
    readCache,
    setReadCache
  } = entry;
  const unreadIds = libs.createMemo(() => playerUnreadIds()[system] ?? {});
  const isUnread = id => {
    const key = String(id);
    return unreadIds()[key] === true && readCache[key] !== true;
  };
  const markRead = id => {
    const key = String(id);
    if (isUnread(key)) {
      setReadCache(key, true);
    }
  };
  const clearReadCache = ids => {
    setReadCache(libs.produce(cache => {
      if (ids != undefined) {
        for (const id of ids) {
          delete cache[String(id)];
        }
      } else {
        for (const key in cache) {
          delete cache[key];
        }
      }
    }));
  };
  libs.createEffect(() => {
    const unreads = unreadIds();
    setReadCache(libs.produce(cache => {
      for (const key in cache) {
        if (unreads[key] !== true) {
          delete cache[key];
        }
      }
    }));
  });
  let submitting = false;
  const submitReadCache = () => {
    const ids = Object.keys(readCache).map(Number).filter(id => isFinite(id));
    if (ids.length === 0 || submitting) return;
    submitting = true;
    ServerRequest("player_unread_read", {
      system,
      ids
    }, result => {
      submitting = false;
      if (result.code == 0 || result.code == 200) {
        clearReadCache(ids);
      }
    }, undefined, () => {
      submitting = false;
    });
  };
  return {
    unreadIds,
    readCache,
    isUnread,
    markRead,
    clearReadCache,
    submitReadCache
  };
}
function createGlobalServiceNetData(key, ...args) {
  const {
    defaultVar,
    playerID
  } = resolveServiceNetDataArgs(-1, args);
  return createDefaultedServiceAccessor(acquireSharedServiceNetData(key, playerID), defaultVar);
}
function createServiceNetTableDataStore(key, ...args) {
  const {
    defaultVar,
    playerID
  } = resolveServiceNetDataArgs(Players.GetLocalPlayer(), args);
  const sharedData = acquireSharedServiceNetData(key, playerID);
  const [data, setData] = libs.createStore(sharedData() ?? defaultVar ?? {});
  libs.createEffect(() => {
    setData(resetStore(sharedData() ?? defaultVar ?? {}));
  });
  return data;
}
function resetStore(data) {
  return libs.produce(prev => {
    for (let k in prev) {
      delete prev[k];
    }
    for (let [k, v] of Object.entries(data)) {
      prev[k] = v;
    }
  });
}
function DynamicKey(props) {
  return libs.createMemo(() => {
    const key = props.key();
    return libs.untrack(() => props.children(key));
  });
}

exports.DynamicKey = DynamicKey;
exports.createGlobalServiceNetData = createGlobalServiceNetData;
exports.createNetDataSignal = createNetDataSignal;
exports.createNetTableSignal = createNetTableSignal;
exports.createPlayerNetDataSignal = createPlayerNetDataSignal;
exports.createPlayerPropertyData = createPlayerPropertyData;
exports.createPlayerUnreadIds = createPlayerUnreadIds;
exports.createServiceNetData = createServiceNetData;
exports.createServiceNetTableDataStore = createServiceNetTableDataStore;
exports.createToggleWindowSignal = createToggleWindowSignal;
exports.parseTokenCosts = parseTokenCosts;
exports.resetStore = resetStore;