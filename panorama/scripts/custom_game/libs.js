--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('libs', exports); const require = GameUI.__require;

const IS_DEV = false;
const equalFn = (a, b) => a === b;
const $PROXY = Symbol("solid-proxy");
const SUPPORTS_PROXY = typeof Proxy === "function";
const $TRACK = Symbol("solid-track");
const signalOptions = {
  equals: equalFn
};
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Owner = null;
let Transition = null;
let ExternalSourceConfig = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
function createRoot(fn, detachedOwner) {
  const listener = Listener,
    owner = Owner,
    unowned = fn.length === 0,
    current = detachedOwner === undefined ? owner : detachedOwner,
    root = unowned ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: current ? current.context : null,
      owner: current
    },
    updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || undefined
  };
  const setter = value => {
    if (typeof value === "function") {
      value = value(s.value);
    }
    return writeSignal(s, value);
  };
  return [readSignal.bind(s), setter];
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  updateComputation(c);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c = createComputation(fn, value, false, STALE),
    s = SuspenseContext && useContext(SuspenseContext);
  if (s) c.suspense = s;
  if (!options || !options.render) c.user = true;
  Effects ? Effects.push(c) : updateComputation(c);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c = createComputation(fn, value, true, 0);
  c.observers = null;
  c.observerSlots = null;
  c.comparator = options.equals || undefined;
  updateComputation(c);
  return readSignal.bind(c);
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (Listener === null) return fn();
  const listener = Listener;
  Listener = null;
  try {
    if (ExternalSourceConfig) ;
    return fn();
  } finally {
    Listener = listener;
  }
}
function on(deps, fn, options) {
  const isArray = Array.isArray(deps);
  let prevInput;
  let defer = options && options.defer;
  return prevValue => {
    let input;
    if (isArray) {
      input = Array(deps.length);
      for (let i = 0; i < deps.length; i++) input[i] = deps[i]();
    } else input = deps();
    if (defer) {
      defer = false;
      return prevValue;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null) ;else if (Owner.cleanups === null) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
  return fn;
}
function getListener() {
  return Listener;
}
function getOwner() {
  return Owner;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  const prevListener = Listener;
  Owner = o;
  Listener = null;
  try {
    return runUpdates(fn, true);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
    Listener = prevListener;
  }
}
function createContext(defaultValue, options) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let value;
  return Owner && Owner.context && (value = Owner.context[context.id]) !== undefined ? value : context.defaultValue;
}
function children(fn) {
  const children = createMemo(fn);
  const memo = createMemo(() => resolveChildren(children()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
let SuspenseContext;
function readSignal() {
  if (this.sources && (this.state)) {
    if ((this.state) === STALE) updateComputation(this);else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const observers = this.observers;
    if (!observers || observers[observers.length - 1] !== Listener) {
      const sSlot = observers ? observers.length : 0;
      if (!Listener.sources) {
        Listener.sources = [this];
        Listener.sourceSlots = [sSlot];
      } else {
        Listener.sources.push(this);
        Listener.sourceSlots.push(sSlot);
      }
      if (!observers) {
        this.observers = [Listener];
        this.observerSlots = [Listener.sources.length - 1];
      } else {
        observers.push(Listener);
        this.observerSlots.push(Listener.sources.length - 1);
      }
    }
  }
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o)) ;
          if (TransitionRunning ? !o.tState : !o.state) {
            if (o.pure) Updates.push(o);else Effects.push(o);
            if (o.observers) markDownstream(o);
          }
          if (!TransitionRunning) o.state = STALE;
        }
        if (Updates.length > 10e5) {
          Updates = [];
          if (IS_DEV) ;
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const time = ExecCount;
  runComputation(node, node.value, time);
}
function runComputation(node, value, time) {
  let nextValue;
  const owner = Owner,
    listener = Listener;
  Listener = Owner = node;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time + 1;
    return handleError(err);
  } finally {
    Listener = listener;
    Owner = owner;
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue);
    } else node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state: state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: Owner ? Owner.context : null,
    pure
  };
  if (Owner === null) ;else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
    }
  }
  return c;
}
function runTop(node) {
  if ((node.state) === 0) return;
  if ((node.state) === PENDING) return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state) ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];
    if ((node.state) === STALE) {
      updateComputation(node);
    } else if ((node.state) === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates) return fn();
  let wait = false;
  if (!init) Updates = [];
  if (Effects) wait = true;else Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait) Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait) return;
  const e = Effects;
  Effects = null;
  if (e.length) runUpdates(() => runEffects(e), false);
}
function runQueue(queue) {
  for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function runUserEffects(queue) {
  let i,
    userLength = 0;
  for (i = 0; i < queue.length; i++) {
    const e = queue[i];
    if (!e.user) runTop(e);else queue[userLength++] = e;
  }
  for (i = 0; i < userLength; i++) runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  node.state = 0;
  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      const state = source.state;
      if (state === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
      } else if (state === PENDING) lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];
    if (!o.state) {
      o.state = PENDING;
      if (o.pure) Updates.push(o);else Effects.push(o);
      o.observers && markDownstream(o);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(),
        index = node.sourceSlots.pop(),
        obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(),
          s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (node.tOwned) {
    for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
    delete node.tOwned;
  }
  if (node.owned) {
    for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
    node.cleanups = null;
  }
  node.state = 0;
}
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err, owner = Owner) {
  const error = castError(err);
  throw error;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      if (Array.isArray(result)) {
        if (result.length < 32768) results.push.apply(results, result);else for (let j = 0; j < result.length; j++) results.push(result[j]);
      } else {
        results.push(result);
      }
    }
    return results;
  }
  return children;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(() => res = untrack(() => {
      Owner.context = {
        ...Owner.context,
        [id]: props.value
      };
      return children(() => props.children);
    }), undefined);
    return res;
  };
}

const FALLBACK = Symbol("fallback");
function dispose(d) {
  for (let i = 0; i < d.length; i++) d[i]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [],
    mapped = [],
    disposers = [],
    len = 0,
    indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [],
      newLen = newItems.length,
      i,
      j;
    newItems[$TRACK];
    return untrack(() => {
      let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot(disposer => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      }
      else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i = newIndices.get(item);
          newIndicesNext[j] = i === undefined ? -1 : i;
          newIndices.set(item, j);
        }
        for (i = start; i <= end; i++) {
          item = items[i];
          j = newIndices.get(item);
          if (j !== undefined && j !== -1) {
            temp[j] = mapped[i];
            tempdisposers[j] = disposers[i];
            indexes && (tempIndexes[j] = indexes[i]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else disposers[i]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s);
      }
      return mapFn(newItems[j]);
    }
  };
}
function indexArray(list, mapFn, options = {}) {
  let items = [],
    mapped = [],
    disposers = [],
    signals = [],
    len = 0,
    i;
  onCleanup(() => dispose(disposers));
  return () => {
    const newItems = list() || [],
      newLen = newItems.length;
    newItems[$TRACK];
    return untrack(() => {
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot(disposer => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
        return mapped;
      }
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }
      for (i = 0; i < newLen; i++) {
        if (i < items.length && items[i] !== newItems[i]) {
          signals[i](() => newItems[i]);
        } else if (i >= items.length) {
          mapped[i] = createRoot(mapper);
        }
      }
      for (; i < items.length; i++) {
        disposers[i]();
      }
      len = signals.length = disposers.length = newLen;
      items = newItems.slice(0);
      return mapped = mapped.slice(0, len);
    });
    function mapper(disposer) {
      disposers[i] = disposer;
      const [s, set] = createSignal(newItems[i]);
      signals[i] = set;
      return mapFn(s, i);
    }
  };
}
function createComponent$1(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
const propTraps = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver;
    return _.get(property);
  },
  has(_, property) {
    if (property === $PROXY) return true;
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn
    };
  },
  ownKeys(_) {
    return _.keys();
  }
};
function resolveSource(s) {
  return !(s = typeof s === "function" ? s() : s) ? {} : s;
}
function resolveSources() {
  for (let i = 0, length = this.length; i < length; ++i) {
    const v = this[i]();
    if (v !== undefined) return v;
  }
}
function mergeProps$1(...sources) {
  let proxy = false;
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    proxy = proxy || !!s && $PROXY in s;
    sources[i] = typeof s === "function" ? (proxy = true, createMemo(s)) : s;
  }
  if (SUPPORTS_PROXY && proxy) {
    return new Proxy({
      get(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          const v = resolveSource(sources[i])[property];
          if (v !== undefined) return v;
        }
      },
      has(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          if (property in resolveSource(sources[i])) return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i = 0; i < sources.length; i++) keys.push(...Object.keys(resolveSource(sources[i])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const sourcesMap = {};
  const defined = Object.create(null);
  for (let i = sources.length - 1; i >= 0; i--) {
    const source = sources[i];
    if (!source) continue;
    const sourceKeys = Object.getOwnPropertyNames(source);
    for (let i = sourceKeys.length - 1; i >= 0; i--) {
      const key = sourceKeys[i];
      if (key === "__proto__" || key === "constructor") continue;
      const desc = Object.getOwnPropertyDescriptor(source, key);
      if (!defined[key]) {
        defined[key] = desc.get ? {
          enumerable: true,
          configurable: true,
          get: resolveSources.bind(sourcesMap[key] = [desc.get.bind(source)])
        } : desc.value !== undefined ? desc : undefined;
      } else {
        const sources = sourcesMap[key];
        if (sources) {
          if (desc.get) sources.push(desc.get.bind(source));else if (desc.value !== undefined) sources.push(() => desc.value);
        }
      }
    }
  }
  const target = {};
  const definedKeys = Object.keys(defined);
  for (let i = definedKeys.length - 1; i >= 0; i--) {
    const key = definedKeys[i],
      desc = defined[key];
    if (desc && desc.get) Object.defineProperty(target, key, desc);else target[key] = desc ? desc.value : undefined;
  }
  return target;
}
function splitProps(props, ...keys) {
  const len = keys.length;
  if (SUPPORTS_PROXY && $PROXY in props) {
    const blocked = len > 1 ? keys.flat() : keys[0];
    const claimed = new Set();
    const res = keys.map(k => {
      const owned = k.filter(property => !claimed.has(property) && (claimed.add(property), true));
      return new Proxy({
        get(property) {
          return owned.includes(property) ? props[property] : undefined;
        },
        has(property) {
          return owned.includes(property) && property in props;
        },
        keys() {
          return owned.filter(property => property in props);
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.includes(property) ? undefined : props[property];
      },
      has(property) {
        return blocked.includes(property) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter(k => !blocked.includes(k));
      }
    }, propTraps));
    return res;
  }
  const objects = [];
  for (let i = 0; i <= len; i++) {
    objects[i] = {};
  }
  for (const propName of Object.getOwnPropertyNames(props)) {
    let keyIndex = len;
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].includes(propName)) {
        keyIndex = i;
        break;
      }
    }
    const desc = Object.getOwnPropertyDescriptor(props, propName);
    const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
    isDefaultDesc ? objects[keyIndex][propName] = desc.value : Object.defineProperty(objects[keyIndex], propName, desc);
  }
  return objects;
}

const narrowedError = name => `Stale read from <${name}>.`;
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || undefined));
}
function Index(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(indexArray(() => props.each, props.children, fallback || undefined));
}
function Show(props) {
  const keyed = props.keyed;
  const conditionValue = createMemo(() => props.when, undefined, undefined);
  const condition = keyed ? conditionValue : createMemo(conditionValue, undefined, {
    equals: (a, b) => !a === !b
  });
  return createMemo(() => {
    const c = condition();
    if (c) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      return fn ? untrack(() => child(keyed ? c : () => {
        if (!untrack(condition)) throw narrowedError("Show");
        return conditionValue();
      })) : child;
    }
    return props.fallback;
  }, undefined, undefined);
}
function Switch(props) {
  const chs = children(() => props.children);
  const switchFunc = createMemo(() => {
    const ch = chs();
    const mps = Array.isArray(ch) ? ch : [ch];
    let func = () => undefined;
    for (let i = 0; i < mps.length; i++) {
      const index = i;
      const mp = mps[i];
      const prevFunc = func;
      const conditionValue = createMemo(() => prevFunc() ? undefined : mp.when, undefined, undefined);
      const condition = mp.keyed ? conditionValue : createMemo(conditionValue, undefined, {
        equals: (a, b) => !a === !b
      });
      func = () => prevFunc() || (condition() ? [index, conditionValue, mp] : undefined);
    }
    return func;
  });
  return createMemo(() => {
    const sel = switchFunc()();
    if (!sel) return props.fallback;
    const [index, conditionValue, mp] = sel;
    const child = mp.children;
    const fn = typeof child === "function" && child.length > 0;
    return fn ? untrack(() => child(mp.keyed ? conditionValue() : () => {
      if (untrack(switchFunc)()?.[0] !== index) throw narrowedError("Match");
      return conditionValue();
    })) : child;
  }, undefined, undefined);
}
function Match(props) {
  return props;
}

function createRenderer({
  createElement,
  createTextNode,
  createEmptyNode,
  isTextNode,
  replaceText,
  insertNode,
  removeNode,
  setProperty,
  getParentNode,
  getFirstChild,
  getNextSibling
}) {
  function insert(parent, accessor, marker, initial) {
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
  }
  function insertExpression(parent, value, current, marker, bUnwrapArray) {
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value;
    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();
      if (current && isTextNode(current)) {
        replaceText(current, value);
      } else {
        current = cleanChildren(parent, current, marker, createTextNode(value));
      }
    } else if (value == null || t === "boolean") {
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === "function") v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      if (normalizeIncomingArray(array, value, bUnwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }
      if (array.length === 0) {
        cleanChildren(parent, current, marker);
      } else {
        if (Array.isArray(current)) {
          if (current.length === 0) {
            appendNodes(parent, array, marker);
          } else {
            reconcileArrays(parent, current, array);
          }
        } else {
          if (current) {
            reconcileArrays(parent, [current], array);
          } else {
            appendNodes(parent, array, marker);
          }
        }
      }
      current = array;
    } else {
      current = cleanChildren(parent, current, marker, value);
    }
    return current;
  }
  function normalizeIncomingArray(normalized, array, bUnwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i],
        t;
      if (item == null || item === true || item === false) ;else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === "string" || t === "number") {
        normalized.push(createTextNode(item));
      } else if (t === "function") {
        if (bUnwrap) {
          while (typeof item === "function") item = item();
          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else normalized.push(item);
    }
    return dynamic;
  }
  function reconcileArrays(parent, oldArr, newArr) {
    let oldLen = oldArr.length;
    let newLen = newArr.length;
    let end = Math.min(oldLen, newLen);
    let start = 0;
    while (start < end) {
      if (oldArr[start] === newArr[start]) {
        start++;
      } else {
        break;
      }
    }
    let oldEnd = oldLen,
      newEnd = newLen,
      endMarker = getNextSibling(oldArr[oldLen - 1]);
    while (oldEnd > start && newEnd > start) {
      if (oldArr[oldEnd - 1] === newArr[newEnd - 1]) {
        endMarker = oldArr[oldEnd - 1];
        oldEnd--;
        newEnd--;
      } else {
        break;
      }
    }
    if (oldEnd == start) {
      let marker = start == 0 ? oldArr[0] : endMarker;
      for (let i = start; i < newEnd; i++) {
        insertNode(parent, newArr[i], marker);
      }
    } else if (newEnd == start) {
      for (let i = start; i < oldEnd; i++) {
        removeNode(parent, oldArr[i]);
      }
    } else {
      let map = new Map();
      for (let i = start; i < oldEnd; i++) {
        map.set(oldArr[i], i);
      }
      if (!endMarker) {
        endMarker = newArr[--newEnd];
        if (endMarker) {
          insertNode(parent, endMarker);
          map.delete(endMarker);
        }
      }
      for (let i = start; i < newEnd; i++) {
        let item = newArr[i];
        insertNode(parent, item, endMarker);
        map.delete(item);
      }
      for (let item of map.keys()) {
        removeNode(parent, item);
      }
    }
  }
  function cleanChildren(parent, current, marker, replacement) {
    const newNode = replacement || createEmptyNode();
    if (current) {
      if (Array.isArray(current)) {
        current.forEach((node, idx) => {
          if (idx == 0) {
            insertNode(parent, newNode, node);
          }
          removeNode(parent, node);
        });
      } else {
        insertNode(parent, newNode, current);
        removeNode(parent, current);
      }
    } else {
      insertNode(parent, newNode, marker);
    }
    return newNode;
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) insertNode(parent, array[i], marker);
  }
  function spreadExpression(node, props, prevProps = {}, skipChildren) {
    props || (props = {});
    if (!skipChildren) {
      createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
    }
    createRenderEffect(() => props.ref && props.ref(node));
    createRenderEffect(() => {
      for (const prop in props) {
        if (prop === "children" || prop === "ref") continue;
        const value = props[prop];
        if (value === prevProps[prop]) continue;
        setProperty(node, prop, value, prevProps[prop]);
        prevProps[prop] = value;
      }
    });
    return prevProps;
  }
  return {
    render(code, element) {
      let disposer;
      createRoot(dispose => {
        disposer = dispose;
        insert(element, code());
      });
      return disposer;
    },
    insert,
    spread(node, accessor, skipChildren) {
      if (typeof accessor === "function") {
        createRenderEffect(current => spreadExpression(node, accessor(), current, skipChildren));
      } else spreadExpression(node, accessor, undefined, skipChildren);
    },
    createElement,
    createTextNode,
    insertNode,
    setProp(node, name, value, prev) {
      setProperty(node, name, value, prev);
      return value;
    },
    mergeProps: mergeProps$1,
    effect: createRenderEffect,
    memo: createMemo,
    createComponent: createComponent$1,
    use(fn, element, arg) {
      return untrack(() => fn(element, arg));
    }
  };
}

const StyleKeyAutoConvertToPixelList = [
    'x',
    'y',
    'z',
    'width',
    'height',
    'minHeight',
    'maxHeight',
    'minWidth',
    'maxWidth',
    'border-radius',
    'borderRadius',
    'fontSize',
    'lineHeight',
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop'
];

const LAYOUT_PROPERTIES = [
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'flowChildren',
    'verticalAlign',
    'horizontalAlign',
    'align',
    'ignoreParentFlow',
    'layoutPosition',
    'overflow',
    'perspective',
    'perspectiveOrigin'
];
const SPACING_PROPERTIES = [
    'margin',
    'marginTop',
    'marginLeft',
    'marginBottom',
    'marginRight',
    'padding',
    'paddingTop',
    'paddingLeft',
    'paddingBottom',
    'paddingRight'
];
const BORDER_PROPERTIES = [
    'border',
    'borderBottom',
    'borderBottomColor',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderBrush',
    'borderColor',
    'borderLeft',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth',
    'borderRadius',
    'borderRight',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderStyle',
    'borderTop',
    'borderTopColor',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderTopStyle',
    'borderTopWidth',
    'borderWidth'
];
const TYPOGRAPHY_PROPERTIES = [
    'font',
    'fontFamily',
    'fontSize',
    'fontStretch',
    'fontStyle',
    'fontWeight',
    'color',
    'letter-spacing',
    'lineHeight',
    'textAlign',
    'textDecoration',
    'textDecorationStyle',
    'textOverflow',
    'textShadow',
    'textTransform'
];
const BACKGROUND_PROPERTIES = [
    'backgroundBlur',
    'backgroundColor',
    'backgroundColorOpacity',
    'backgroundImage',
    'backgroundImageOpacity',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'backgroundTextureSize'
];
const VISUAL_PROPERTIES = [
    'opacity',
    'opacityBrush',
    'opacityMask',
    'opacityMaskPosition',
    'opacityMaskScale',
    'brightness',
    'hueRotation',
    'washColor',
    'blur',
    'boxShadow',
    'imgShadow',
    'preTransformRotate2d',
    'preTransformScale2d',
    'saturation',
    'textureSampling',
    'uiScale',
    'uiScaleX',
    'uiScaleY',
    'uiScaleZ',
    'visibility',
    'whiteSpace',
    'worldBlur'
];
const INTERACTION_PROPERTIES = [
    'sound',
    'soundOut'
];
const POSITION_PROPERTIES = [
    'x',
    'y',
    'zIndex',
    'position'
];
const TRANSFORM_PROPERTIES = [
    'transform',
    'transformOrigin'
];
const TRANSITION_PROPERTIES = [
    'transition',
    'transitionDelay',
    'transitionDuration',
    'transitionHighFramerate',
    'transitionProperty',
    'transitionTimingFunction'
];
const ANIMATION_PROPERTIES = [
    'animation',
    'animationDelay',
    'animationDirection',
    'animationDuration',
    'animationFillMode',
    'animationIterationCount',
    'animationName',
    'animationTimingFunction'
];
const TOOLTIP_POSITION_PROPERTIES = [
    'tooltipPosition',
    'tooltipArrowPosition',
    'tooltipBodyPosition'
];
const CSS_STYLE_PROPERTIES = [
    ...LAYOUT_PROPERTIES,
    ...SPACING_PROPERTIES,
    ...BORDER_PROPERTIES,
    ...TYPOGRAPHY_PROPERTIES,
    ...BACKGROUND_PROPERTIES,
    ...VISUAL_PROPERTIES,
    ...INTERACTION_PROPERTIES,
    ...POSITION_PROPERTIES,
    ...TRANSFORM_PROPERTIES,
    ...TRANSITION_PROPERTIES,
    ...ANIMATION_PROPERTIES,
    ...TOOLTIP_POSITION_PROPERTIES
];
const CSS_SCROLL_PROPERTIES = [
    'scroll'
];
function isCSSStyleProperty(propertyName) {
    return CSS_STYLE_PROPERTIES.includes(propertyName);
}
function isCSSScrollProperty(propertyName) {
    return CSS_SCROLL_PROPERTIES.includes(propertyName);
}
function handleCSSTooltipProperty(node, name, value, setTooltipText, setCustomTooltip, setCustomTooltipParams) {
    if (name === 'tooltip') {
        if (typeof value === 'string') {
            setCustomTooltip(node, ["text", "text"]);
            setCustomTooltipParams(node, {text: value});
        }
        else if (value && typeof value === 'object') {
            if (value.name) {
                setCustomTooltip(node, [value.name, value.name]);
                if (Object.keys(value).length > 1) {
                    const params = { ...value };
                    delete params.name;
                    setCustomTooltipParams(node, params);
                }
            }
            else if (value.title || value.text) {
                setCustomTooltip(node, ["title_text", "title_text"]);
            setCustomTooltipParams(node, {title: value.title, text: value.text});
            }
        }
        return true;
    }
    else if (name === 'titleTooltip') {
        if (value && typeof value === 'object' && (value.title || value.text)) {
            setCustomTooltip(node, ["title_text", "title_text"]);
            setCustomTooltipParams(node, {title: value.title, text: value.text});
        }
        return true;
    }
    else if (name === 'customTooltip') {
        if (value && typeof value === 'object' && value.name) {
            setCustomTooltip(node, [value.name, value.name]);
            const params = { ...value };
            delete params.name;
            if (Object.keys(params).length > 0) {
                setCustomTooltipParams(node, params);
            }
        }
        return true;
    }
    return false;
}

function noop() { }

function setDragEvent(node, event, callback) {
    event = event.slice(2);
    if (!callback) {
        $.RegisterEventHandler(event, node, noop);
        return;
    }
    if (event === 'DragStart') {
        node.SetDraggable(true);
    }
    $.RegisterEventHandler(event, node, callback);
}

function setTooltipText(node, text) {
    if (!text) {
        node.ClearPanelEvent('onmouseover');
        node.ClearPanelEvent('onmouseout');
        return;
    }
    node.SetPanelEvent('onmouseover', () => {
        $.DispatchEvent('DOTAShowTextTooltip', node, text);
    });
    node.SetPanelEvent('onmouseout', () => {
        $.DispatchEvent('DOTAHideTextTooltip', node);
    });
}
function setCustomTooltip(node, args) {
    if (!args) {
        node.ClearPanelEvent('onmouseover');
        node.ClearPanelEvent('onmouseout');
        return;
    }
    let path = args[1];
    if (!path.startsWith('file://')) {
        path = `file://{resources}/layout/custom_game/tooltips/${path.replace('.xml', '')}.xml`;
    }
    node.SetPanelEvent('onmouseover', () => {
        const params = node.GetAttributeString('__CustomTooltipParams__', '');
        $.DispatchEvent('UIShowCustomLayoutParametersTooltip', node, args[0], path, params);
    });
    node.SetPanelEvent('onmouseout', () => {
        $.DispatchEvent('UIHideCustomLayoutTooltip', args[0]);
    });
}
function setCustomTooltipParams(node, params) {
    if (!params) {
        node.SetAttributeString('__CustomTooltipParams__', '');
        return;
    }
    let paramsString = Object.entries(params)
        .map(v => `${v[0]}=${v[1]}`)
        .join('&');
    node.SetAttributeString('__CustomTooltipParams__', paramsString);
}

const hasOwn = Object.prototype.hasOwnProperty;
const __ContextPanelContext__ = createContext({ panel: null });
const nodeTrash = (function () {
    let root = $.GetContextPanel();
    while (root.GetParent()) {
        root = root.GetParent();
    }
    return $.CreatePanel('Panel', root, '', {
        style: 'visibility: collapse;'
    });
})();
const { render: _render, effect, memo, createComponent, createElement, createTextNode, insertNode, insert, spread, setProp, mergeProps, use } = createRenderer({
    createElement(type, props, parent) {
        const { id, snippet, vars, dialogVariables, style, visible, enabled, checked, attrs, type: _type, ..._props } = props;
        const styleIsString = typeof style === 'string';
        if (styleIsString) {
            props.style = style;
        }
        if (type === 'GenericPanel') {
            type = _type;
        }
        let handler = useContext(__ContextPanelContext__);
        const el = $.CreatePanel(type, handler.panel || parent || $.GetContextPanel(), id || '', _props);
        el.SetParent(parent || $.GetContextPanel());
        if (typeof visible === 'boolean') {
            el.visible = visible;
        }
        if (typeof enabled === 'boolean') {
            el.enabled = enabled;
        }
        if (typeof checked === 'boolean') {
            el.checked = checked;
        }
        if (type != "TextEntry") {
            el.SetDisableFocusOnMouseDown(true);
        }
        if (!styleIsString) {
            applyStyles(el, style);
        }
        if (snippet) {
            el.BLoadLayoutSnippet(snippet);
        }
        if (vars) {
            setDialogVariables(el, vars, {});
        }
        if (dialogVariables) {
            setDialogVariables(el, dialogVariables, {});
        }
        if (props.text) {
            el.__solidText = props.text;
        }
        return el;
    },
    createTextNode(value, parent) {
        if (typeof value !== 'string') {
            value = String(value);
        }
        if (value[0] === '#') {
            value = $.Localize(value, parent);
        }
        const child = $.CreatePanel('Label', parent || $.GetContextPanel(), '', {
            text: value,
            html: 'true'
        });
        child.SetDisableFocusOnMouseDown(true);
        if (value[0] === '#') {
            child.__solidText = value;
        }
        return child;
    },
    createEmptyNode(parent) {
        let node = $.CreatePanel('Panel', parent || $.GetContextPanel(), '');
        node.visible = false;
        return node;
    },
    replaceText(textNode, value) {
        if (!textNode || !textNode.IsValid()) {
            return;
        }
        if (value[0] === '#') {
            textNode.__solidText = value;
            value = $.Localize(value, textNode);
        }
        textNode.text = value;
    },
    isTextNode(node) {
        if (!node || !node.IsValid()) {
            return false;
        }
        return node.paneltype === 'Label';
    },
    insertNode(parent, node, anchor) {
        if (!parent || !parent.IsValid() || !node || !node.IsValid()) {
            return;
        }
        node.SetParent(parent);
        if (parent.__solidRenderRoot) {
            node.__solidChild = true;
        }
        if (anchor && anchor.IsValid()) {
            parent.MoveChildBefore(node, anchor);
        }
    },
    removeNode(parent, node) {
        if (!parent || !parent.IsValid() || !node || !node.IsValid()) {
            return;
        }
        node.SetParent(nodeTrash);
        $.Schedule(0, () => {
            nodeTrash.RemoveAndDeleteChildren();
        });
    },
    getParentNode(node) {
        if (!node || !node.IsValid()) {
            return;
        }
        const parent = node.GetParent();
        if (parent) {
            return parent;
        }
    },
    getFirstChild(node) {
        if (!node || !node.IsValid()) {
            return;
        }
        const child = node.GetChild(0);
        if (!child) {
            return;
        }
        return child;
    },
    getNextSibling(node) {
        if (!node || !node.IsValid()) {
            return;
        }
        const parent = node.GetParent();
        if (!parent) {
            return;
        }
        const el = parent.GetChild(parent.GetChildIndex(node) + 1);
        if (!el) {
            return;
        }
        return el;
    },
    setProperty(node, name, value, prev) {
        if (!node || !node.IsValid()) {
            return;
        }
        if (name === 'id') {
            return;
        }
        if (name === 'class' || name === 'className') {
            applyClassNames(node, value || '', prev || '');
        }
        else if (name === 'text') {
            if (value[0] === '#') {
                node.__solidText = value;
                node.text = $.Localize(value, node);
            }
            else {
                node.text = value;
            }
        }
        else if (name === 'src' && node.SetImage) {
            node.SetImage(value);
        }
        else if (name === 'classList') {
            updateClassList(node, value, prev);
        }
        else if (name === 'style') {
            applyStyles(node, value, prev);
        }
        else if (name === 'vars' || name === 'dialogVariables') {
            setDialogVariables(node, value, prev);
        }
        else if (name === 'attrs') {
            setAttributes(node, value);
        }
        else if (name === 'inputnamespace') {
            node.SetInputNamespace(value || '');
        }
        else if (name === 'draggable') {
            node.SetDraggable(value === true);
        }
        else if (name === 'acceptsfocus') {
            node.SetAcceptsFocus(value === true);
        }
        else if (name === 'tooltip_text') {
            setCustomTooltip(node, ["text", "text"]);
            setCustomTooltipParams(node, {text: value});
        }
        else if (name === 'custom_tooltip') {
            setCustomTooltip(node, value);
        }
        else if (name === 'custom_tooltip_params') {
            setCustomTooltipParams(node, value);
        }
        else if (isCSSStyleProperty(name)) {
            applyStyles(node, { [name]: value }, prev ? { [name]: prev } : undefined);
        }
        else if (isCSSScrollProperty(name)) {
            applyStyles(node, { ["overflow"]: getOverflow(value) }, prev ? { ["overflow"]: prev } : undefined);
        }
        else if (handleCSSTooltipProperty(node, name, value, setTooltipText, setCustomTooltip, setCustomTooltipParams)) ;
        else if (name === 'onDragStart' ||
            name === 'onDragEnd' ||
            name === 'onDragEnter' ||
            name === 'onDragDrop' ||
            name === 'onDragLeave') {
            setDragEvent(node, name, value);
        }
        else if (name.startsWith('data-')) {
            setData(node, name.slice(5), value);
        }
        else if (name.startsWith('on')) {
            setPanelEvent(node, name, value);
        }
        else {
            if (hasOwn.call(node, name)) {
                node[name] = value;
            }
            else {
                node.SetAttributeString(name, String(value));
            }
        }
    }
});
function Dynamic(props) {
    const [p, others] = splitProps(props, ['component']);
    const cached = createMemo(() => p.component);
    return createMemo(() => {
        const component = cached();
        switch (typeof component) {
            case 'function':
                return untrack(() => component(others));
            case 'string':
                const el = createElement(component);
                spread(el, others);
                return el;
        }
    });
}
function render(code, container) {
    if (container.__solidDisposer) {
        container.__solidDisposer();
        for (const c of container.Children()) {
            if (c.__solidChild) {
                c.SetParent(nodeTrash);
            }
        }
        nodeTrash.RemoveAndDeleteChildren();
    }
    container.__solidRenderRoot = true;
    Object.defineProperty(container, '__solidDisposer', {
        configurable: true,
        value: _render(() => createComponent(__ContextPanelContext__.Provider, {
            value: {
                panel: container
            },
            get children() {
                return createComponent(code, {});
            }
        }), container)
    });
    return container.__solidDisposer;
}
const splitClassName = /\s+/;
function applyClassNames(node, names, prev) {
    const nameList = names.split(splitClassName);
    const oldList = prev.split(splitClassName);
    for (let i = oldList.length - 1; i >= 0; i--) {
        const name = oldList[i];
        if (nameList.includes(name)) {
            continue;
        }
        else {
            node.RemoveClass(name);
        }
    }
    for (const name of nameList) {
        node.AddClass(name);
    }
}
function updateClassList(node, state, prev) {
    state = state || {};
    if (prev) {
        for (const k in prev) {
            if (state[k] === undefined) {
                node.RemoveClass(k);
            }
        }
    }
    for (const k in state) {
        node.SetHasClass(k, state[k] === true);
    }
}
function applyStyles(node, styles, prev) {
    styles = styles || {};
    prev = prev || {};
    for (const k in prev) {
        if (!hasOwn.call(styles, k)) {
            node.style[k] = null;
        }
    }
    for (const k in styles) {
        if (typeof styles[k] === 'number') {
            if (StyleKeyAutoConvertToPixelList.includes(k)) {
                node.style[k] = `${styles[k]}px`;
                continue;
            }
        }
        node.style[k] = styles[k] === undefined ? null : styles[k];
    }
}
function getOverflow(scroll) {
    switch (scroll) {
        case "x":
            return "scroll squish";
        case "y":
            return "squish scroll";
        case "both":
            return "scroll scroll";
    }
}
function setPanelEvent(node, event, handle) {
    if (!handle) {
        node.ClearPanelEvent(event);
        return;
    }
    node.SetPanelEvent(event, function () {
        handle(node);
    });
}
const PANORAMA_INVALID_DATE = 2 ** 52;
function setDialogVariables(node, vars, prev) {
    prev = prev || {};
    for (const key in prev) {
        if (!vars[key]) {
            const value = prev[key];
            if (typeof value === 'string') {
                node.SetDialogVariable(key, `[!s:${key}]`);
            }
            else if (typeof value === 'number') {
                node.SetDialogVariableInt(key, NaN);
            }
            else if (typeof value.getTime === 'function') {
                node.SetDialogVariableTime(key, PANORAMA_INVALID_DATE);
            }
        }
    }
    for (const key in vars) {
        const value = vars[key];
        if (typeof value === 'string') {
            if (value[0] === '#') {
                node.SetDialogVariableLocString(key, value);
            }
            else {
                node.SetDialogVariable(key, value);
            }
        }
        else if (typeof value === 'number') {
            node.SetDialogVariableInt(key, value);
        }
        else {
            node.SetDialogVariableTime(key, Math.floor(value.getTime() / 1000));
        }
    }
    if (node.__solidText) {
        node.text = $.Localize(node.__solidText, node);
    }
}
function setAttributes(node, attrs) {
    for (const key in attrs) {
        const value = attrs[key];
        if (typeof value === 'number') {
            node.SetAttributeInt(key, value);
        }
        else {
            node.SetAttributeString(key, value);
        }
    }
}
function setData(node, key, v) {
    if (!node.Data) {
        const data = {};
        Object.defineProperty(node, 'Data', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function () {
                return data;
            }
        });
    }
    node.Data()[key] = v;
}

var classnamesExports = {};
var classnames = {
  get exports(){ return classnamesExports; },
  set exports(v){ classnamesExports = v; },
};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

(function (module) {
	/* global define */

	(function () {

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (arg) {
					classes = appendClass(classes, parseValue(arg));
				}
			}

			return classes;
		}

		function parseValue (arg) {
			if (typeof arg === 'string' || typeof arg === 'number') {
				return arg;
			}

			if (typeof arg !== 'object') {
				return '';
			}

			if (Array.isArray(arg)) {
				return classNames.apply(null, arg);
			}

			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
				return arg.toString();
			}

			var classes = '';

			for (var key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes = appendClass(classes, key);
				}
			}

			return classes;
		}

		function appendClass (value, newClass) {
			if (!newClass) {
				return value;
			}
		
			if (value) {
				return value + ' ' + newClass;
			}
		
			return value + newClass;
		}

		if (module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	}());
} (classnames));

var classNames = classnamesExports;

const $RAW = Symbol("store-raw"),
  $NODE = Symbol("store-node"),
  $HAS = Symbol("store-has"),
  $SELF = Symbol("store-self");
function wrap$1(value) {
  let p = value[$PROXY];
  if (!p) {
    Object.defineProperty(value, $PROXY, {
      value: p = new Proxy(value, proxyTraps$1)
    });
    if (!Array.isArray(value)) {
      const keys = Object.keys(value),
        desc = Object.getOwnPropertyDescriptors(value),
        proto = Object.getPrototypeOf(value);
      const isClass = proto !== null && value !== null && typeof value === "object" && !Array.isArray(value) && proto !== Object.prototype;
      if (isClass) {
        const descriptors = Object.getOwnPropertyDescriptors(proto);
        keys.push(...Object.keys(descriptors));
        Object.assign(desc, descriptors);
      }
      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];
        if (isClass && prop === "constructor") continue;
        if (desc[prop].get) {
          Object.defineProperty(value, prop, {
            configurable: true,
            enumerable: desc[prop].enumerable,
            get: desc[prop].get.bind(p)
          });
        }
      }
    }
  }
  return p;
}
function isWrappable(obj) {
  let proto;
  return obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj));
}
function unwrap(item, set = new Set()) {
  let result, unwrapped, v, prop;
  if (result = item != null && item[$RAW]) return result;
  if (!isWrappable(item) || set.has(item)) return item;
  if (Array.isArray(item)) {
    if (Object.isFrozen(item)) item = item.slice(0);else set.add(item);
    for (let i = 0, l = item.length; i < l; i++) {
      v = item[i];
      if ((unwrapped = unwrap(v, set)) !== v) item[i] = unwrapped;
    }
  } else {
    if (Object.isFrozen(item)) item = Object.assign({}, item);else set.add(item);
    const keys = Object.keys(item),
      desc = Object.getOwnPropertyDescriptors(item);
    for (let i = 0, l = keys.length; i < l; i++) {
      prop = keys[i];
      if (desc[prop].get) continue;
      v = item[prop];
      if ((unwrapped = unwrap(v, set)) !== v) item[prop] = unwrapped;
    }
  }
  return item;
}
function getNodes(target, symbol) {
  let nodes = target[symbol];
  if (!nodes) Object.defineProperty(target, symbol, {
    value: nodes = Object.create(null)
  });
  return nodes;
}
function getNode(nodes, property, value) {
  if (nodes[property]) return nodes[property];
  const [s, set] = createSignal(value, {
    equals: false,
    internal: true
  });
  s.$ = set;
  return nodes[property] = s;
}
function proxyDescriptor$1(target, property) {
  const desc = Reflect.getOwnPropertyDescriptor(target, property);
  if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE) return desc;
  delete desc.value;
  delete desc.writable;
  desc.get = () => target[$PROXY][property];
  return desc;
}
function trackSelf(target) {
  getListener() && getNode(getNodes(target, $NODE), $SELF)();
}
function ownKeys(target) {
  trackSelf(target);
  return Reflect.ownKeys(target);
}
const proxyTraps$1 = {
  get(target, property, receiver) {
    if (property === $RAW) return target;
    if (property === $PROXY) return receiver;
    if (property === $TRACK) {
      trackSelf(target);
      return receiver;
    }
    const nodes = getNodes(target, $NODE);
    const tracked = nodes[property];
    let value = tracked ? tracked() : target[property];
    if (property === $NODE || property === $HAS || property === "__proto__") return value;
    if (!tracked) {
      const desc = Object.getOwnPropertyDescriptor(target, property);
      if (getListener() && (typeof value !== "function" || Object.prototype.hasOwnProperty.call(target, property)) && !(desc && desc.get)) value = getNode(nodes, property, value)();
    }
    return isWrappable(value) ? wrap$1(value) : value;
  },
  has(target, property) {
    if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === $HAS || property === "__proto__") return true;
    getListener() && getNode(getNodes(target, $HAS), property)();
    return property in target;
  },
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  ownKeys: ownKeys,
  getOwnPropertyDescriptor: proxyDescriptor$1
};
function setProperty(state, property, value, deleting = false) {
  if (property === "__proto__") {
    return;
  }
  if (!deleting && state[property] === value) return;
  const prev = state[property],
    len = state.length;
  if (value === undefined) {
    delete state[property];
    if (state[$HAS] && state[$HAS][property] && prev !== undefined) state[$HAS][property].$();
  } else {
    state[property] = value;
    if (state[$HAS] && state[$HAS][property] && prev === undefined) state[$HAS][property].$();
  }
  let nodes = getNodes(state, $NODE),
    node;
  if (node = getNode(nodes, property, prev)) node.$(() => value);
  if (Array.isArray(state) && state.length !== len) {
    for (let i = state.length; i < len; i++) (node = nodes[i]) && node.$();
    (node = getNode(nodes, "length", len)) && node.$(state.length);
  }
  (node = nodes[$SELF]) && node.$();
}
function mergeStoreNode(state, value) {
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (isUnsafeKey$1(key)) continue;
    setProperty(state, key, value[key]);
  }
}
function isUnsafeKey$1(property) {
  return property === "__proto__" || property === "constructor" || property === "prototype";
}
function updateArray(current, next) {
  if (typeof next === "function") next = next(current);
  next = unwrap(next);
  if (Array.isArray(next)) {
    if (current === next) return;
    let i = 0,
      len = next.length;
    for (; i < len; i++) {
      const value = next[i];
      if (current[i] !== value) setProperty(current, i, value);
    }
    setProperty(current, "length", len);
  } else mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part,
    prev = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part,
      isArray = Array.isArray(current);
    if (partType === "string" && (part === "__proto__" || path.length > 1 && isUnsafeKey$1(part))) {
      return;
    }
    if (Array.isArray(part)) {
      for (let i = 0; i < part.length; i++) {
        updatePath(current, [part[i]].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "function") {
      for (let i = 0; i < current.length; i++) {
        if (part(current[i], i)) updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i = from; i <= to; i += by) {
        updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    prev = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(prev, traversed);
    if (value === prev) return;
  }
  if (part === undefined && value == undefined) return;
  value = unwrap(value);
  if (part === undefined || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(prev, value);
  } else setProperty(current, part, value);
}
function createStore(...[store, options]) {
  const unwrappedStore = unwrap(store || {});
  const isArray = Array.isArray(unwrappedStore);
  const wrappedStore = wrap$1(unwrappedStore);
  function setStore(...args) {
    batch(() => {
      isArray && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
    });
  }
  return [wrappedStore, setStore];
}
const producers = new WeakMap();
const setterTraps = {
  get(target, property) {
    if (property === $RAW) return target;
    const value = target[property];
    if (property === $PROXY || property === $TRACK || property === $NODE || property === $HAS || property === "__proto__") return value;
    let proxy;
    return isWrappable(value) ? producers.get(value) || (producers.set(value, proxy = new Proxy(value, setterTraps)), proxy) : value;
  },
  set(target, property, value) {
    setProperty(target, property, unwrap(value));
    return true;
  },
  deleteProperty(target, property) {
    setProperty(target, property, undefined, true);
    return true;
  }
};
function produce(fn) {
  return state => {
    if (isWrappable(state)) {
      let proxy;
      if (!(proxy = producers.get(state))) {
        producers.set(state, proxy = new Proxy(state, setterTraps));
      }
      fn(proxy);
    }
    return state;
  };
}

exports.Dynamic = Dynamic;
exports.For = For;
exports.Index = Index;
exports.Match = Match;
exports.Show = Show;
exports.Switch = Switch;
exports.batch = batch;
exports.children = children;
exports.classNames = classNames;
exports.createComponent = createComponent;
exports.createContext = createContext;
exports.createEffect = createEffect;
exports.createElement = createElement;
exports.createMemo = createMemo;
exports.createRenderEffect = createRenderEffect;
exports.createRoot = createRoot;
exports.createSignal = createSignal;
exports.createStore = createStore;
exports.createTextNode = createTextNode;
exports.effect = effect;
exports.getOwner = getOwner;
exports.insert = insert;
exports.memo = memo;
exports.mergeProps = mergeProps$1;
exports.mergeProps$1 = mergeProps;
exports.on = on;
exports.onCleanup = onCleanup;
exports.onMount = onMount;
exports.produce = produce;
exports.render = render;
exports.runWithOwner = runWithOwner;
exports.setProp = setProp;
exports.splitProps = splitProps;
exports.spread = spread;
exports.untrack = untrack;
exports.use = use;
exports.useContext = useContext;

function handleError(err, owner = Owner) {
  let msg = err.stack ?? err;
  GameEvents.SendEventClientSide("pui_error_msg", {error: msg});
  throw err;
}