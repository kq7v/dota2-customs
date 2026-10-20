--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict';

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
    current = owner ,
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
  const c = createComputation(fn, value, false, STALE);
  c.user = true;
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
  return prevValue => {
    let input;
    if (isArray) {
      input = Array(deps.length);
      for (let i = 0; i < deps.length; i++) input[i] = deps[i]();
    } else input = deps();
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
createSignal(false);
function children(fn) {
  const children = createMemo(fn);
  const memo = createMemo(() => resolveChildren(children()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
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
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
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
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
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
      } else if (len === 0) {
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
  if (SUPPORTS_PROXY && $PROXY in props) {
    const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
    const res = keys.map(k => {
      return new Proxy({
        get(property) {
          return k.includes(property) ? props[property] : undefined;
        },
        has(property) {
          return k.includes(property) && property in props;
        },
        keys() {
          return k.filter(property => property in props);
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? undefined : props[property];
      },
      has(property) {
        return blocked.has(property) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter(k => !blocked.has(k));
      }
    }, propTraps));
    return res;
  }
  const otherObject = {};
  const objects = keys.map(() => ({}));
  for (const propName of Object.getOwnPropertyNames(props)) {
    const desc = Object.getOwnPropertyDescriptor(props, propName);
    const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
    let blocked = false;
    let objectIndex = 0;
    for (const k of keys) {
      if (k.includes(propName)) {
        blocked = true;
        isDefaultDesc ? objects[objectIndex][propName] = desc.value : Object.defineProperty(objects[objectIndex], propName, desc);
      }
      ++objectIndex;
    }
    if (!blocked) {
      isDefaultDesc ? otherObject[propName] = desc.value : Object.defineProperty(otherObject, propName, desc);
    }
  }
  return [...objects, otherObject];
}
const narrowedError = name => `Stale read from <${name}>.`;
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || undefined));
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

const memo$1 = fn => createMemo(() => fn());
function createRenderer$1({
  createElement,
  createTextNode,
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
    if (marker !== undefined && !initial) initial = [];
    if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
    createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
  }
  function insertExpression(parent, value, current, marker, unwrapArray) {
    while (typeof current === "function") current = current();
    if (value === current) return current;
    const t = typeof value,
      multi = marker !== undefined;
    if (t === "string" || t === "number") {
      if (t === "number") value = value.toString();
      if (multi) {
        let node = current[0];
        if (node && isTextNode(node)) {
          replaceText(node, value);
        } else node = createTextNode(value);
        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== "" && typeof current === "string") {
          replaceText(getFirstChild(parent), current = value);
        } else {
          cleanChildren(parent, current, marker, createTextNode(value));
          current = value;
        }
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
      if (normalizeIncomingArray(array, value, unwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }
      if (array.length === 0) {
        const replacement = cleanChildren(parent, current, marker);
        if (multi) return current = replacement;
      } else {
        if (Array.isArray(current)) {
          if (current.length === 0) {
            appendNodes(parent, array, marker);
          } else reconcileArrays(parent, current, array);
        } else if (current == null || current === "") {
          appendNodes(parent, array);
        } else {
          reconcileArrays(parent, multi && current || [getFirstChild(parent)], array);
        }
      }
      current = array;
    } else {
      if (Array.isArray(current)) {
        if (multi) return current = cleanChildren(parent, current, marker, value);
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === "" || !getFirstChild(parent)) {
        insertNode(parent, value);
      } else replaceNode(parent, value, getFirstChild(parent));
      current = value;
    }
    return current;
  }
  function normalizeIncomingArray(normalized, array, unwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i],
        t;
      if (item == null || item === true || item === false) ;else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t = typeof item) === "string" || t === "number") {
        normalized.push(createTextNode(item));
      } else if (t === "function") {
        if (unwrap) {
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
  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length,
      aEnd = a.length,
      bEnd = bLength,
      aStart = 0,
      bStart = 0,
      after = getNextSibling(a[aEnd - 1]),
      map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? getNextSibling(b[bStart - 1]) : b[bEnd - bStart] : after;
        while (bStart < bEnd) insertNode(parentNode, b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) removeNode(parentNode, a[aStart]);
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = getNextSibling(a[--aEnd]);
        insertNode(parentNode, b[bStart++], getNextSibling(a[aStart++]));
        insertNode(parentNode, b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = new Map();
          let i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        const index = map.get(a[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart,
              sequence = 1,
              t;
            while (++i < aEnd && i < bEnd) {
              if ((t = map.get(a[i])) == null || t !== index + sequence) break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a[aStart];
              while (bStart < index) insertNode(parentNode, b[bStart++], node);
            } else replaceNode(parentNode, b[bStart++], a[aStart++]);
          } else aStart++;
        } else removeNode(parentNode, a[aStart++]);
      }
    }
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === undefined) {
      let removed;
      while (removed = getFirstChild(parent)) removeNode(parent, removed);
      replacement && insertNode(parent, replacement);
      return "";
    }
    const node = replacement || createTextNode("");
    if (current.length) {
      let inserted = false;
      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];
        if (node !== el) {
          const isParent = getParentNode(el) === parent;
          if (!inserted && !i) isParent ? replaceNode(parent, node, el) : insertNode(parent, node, marker);else isParent && removeNode(parent, el);
        } else inserted = true;
      }
    } else insertNode(parent, node, marker);
    return [node];
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++) insertNode(parent, array[i], marker);
  }
  function replaceNode(parent, newNode, oldNode) {
    insertNode(parent, newNode, oldNode);
    removeNode(parent, oldNode);
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
    memo: memo$1,
    createComponent: createComponent$1,
    use(fn, element, arg) {
      return untrack(() => fn(element, arg));
    }
  };
}
function createRenderer(options) {
  const renderer = createRenderer$1(options);
  renderer.mergeProps = mergeProps$1;
  return renderer;
}

const StyleKeyAutoConvertToPixelList = ['x', 'y', 'z', 'width', 'height', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth', 'border-radius', 'borderRadius', 'fontSize', 'lineHeight', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'];
function noop() {}
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
    path = `file://{resources}/layout/custom_game/${path.replace('.xml', '')}.xml`;
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
  let paramsString = Object.entries(params).map(v => `${v[0]}=${v[1]}`).join('&');
  node.SetAttributeString('__CustomTooltipParams__', paramsString);
}
const hasOwn = Object.prototype.hasOwnProperty;
const nodeTrash = function () {
  let root = $.GetContextPanel();
  while (root.GetParent()) {
    root = root.GetParent();
  }
  return $.CreatePanel('Panel', root, '', {
    style: 'visibility: collapse;'
  });
}();
const {
  render: _render,
  effect,
  memo,
  createComponent,
  createElement,
  insert,
  spread,
  setProp,
  mergeProps,
  use
} = createRenderer({
  createElement(type, props, parent) {
    const {
      id,
      snippet,
      vars,
      dialogVariables,
      text,
      style,
      visible,
      enabled,
      checked,
      attrs,
      type: _type,
      ..._props
    } = props;
    const styleIsString = typeof style === 'string';
    if (styleIsString) {
      props.style = style;
    }
    if (type === 'GenericPanel') {
      type = _type;
    }
    const el = $.CreatePanel(type, parent || $.GetContextPanel(), id || '', _props);
    if (typeof visible === 'boolean') {
      el.visible = visible;
    }
    if (typeof enabled === 'boolean') {
      el.enabled = enabled;
    }
    if (typeof checked === 'boolean') {
      el.checked = checked;
    }
    el.SetDisableFocusOnMouseDown(true);
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
    if (text) {
      if (text[0] === '#') {
        el.__solidText = text;
        el.text = $.Localize(text, el);
      } else {
        el.text = text;
      }
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
        if (anchor && anchor.IsValid()) {
            parent.MoveChildBefore(node, anchor);
        } else {
            const lastChild = parent.GetChild(parent.GetChildCount() - 1);
            if (lastChild && lastChild !== node) {
                parent.MoveChildAfter(node, lastChild);
            }
        }
  },
  removeNode(parent, node) {
    if (!parent || !parent.IsValid() || !node || !node.IsValid()) {
      return;
    }
    node.SetParent(nodeTrash);
    $.Schedule(0, () => {
      if (node.GetParent() === nodeTrash) {
        node.DeleteAsync(0);
      }
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
    } else if (name === 'text') {
      if (value[0] === '#') {
        node.__solidText = value;
        node.text = $.Localize(value, node);
      } else {
        node.text = value;
      }
    } else if (name === 'src' && node.SetImage) {
      node.SetImage(value);
    } else if (name === 'classList') {
      updateClassList(node, value, prev);
    } else if (name === 'style') {
      applyStyles(node, value, prev);
    } else if (name === 'vars' || name === 'dialogVariables') {
      setDialogVariables(node, value, prev);
    } else if (name === 'attrs') {
      setAttributes(node, value);
    } else if (name === 'inputnamespace') {
      node.SetInputNamespace(value || '');
    } else if (name === 'draggable') {
      node.SetDraggable(value === true);
    } else if (name === 'acceptsfocus') {
      node.SetAcceptsFocus(value === true);
    } else if (name === 'tooltip_text') {
      setTooltipText(node, value);
    } else if (name === 'custom_tooltip') {
      setCustomTooltip(node, value);
    } else if (name === 'custom_tooltip_params') {
      setCustomTooltipParams(node, value);
    } else if (name === 'onDragStart' || name === 'onDragEnd' || name === 'onDragEnter' || name === 'onDragDrop' || name === 'onDragLeave') {
      setDragEvent(node, name, value);
    } else if (name.startsWith('data-')) {
      setData(node, name.slice(5), value);
    } else if (name.startsWith('on')) {
      setPanelEvent(node, name, value);
    } else {
      if (hasOwn.call(node, name)) {
        node[name] = value;
      } else {
        node.SetAttributeString(name, String(value));
      }
    }
  }
});
function render(code, container) {
  if (container.__solidDisposer) {
    container.__solidDisposer();
    container.RemoveAndDeleteChildren();
  }
  Object.defineProperty(container, '__solidDisposer', {
    configurable: true,
    value: _render(code, container)
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
    } else {
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
      } else if (typeof value === 'number') {
        node.SetDialogVariableInt(key, NaN);
      } else {
        node.SetDialogVariableTime(key, PANORAMA_INVALID_DATE);
      }
    }
  }
  for (const key in vars) {
    const value = vars[key];
    if (typeof value === 'string') {
      if (value[0] === '#') {
        node.SetDialogVariableLocString(key, value);
      } else {
        node.SetDialogVariable(key, value);
      }
    } else if (typeof value === 'number') {
      node.SetDialogVariableInt(key, value);
    } else {
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
    } else {
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
        desc = Object.getOwnPropertyDescriptors(value);
      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];
        if (desc[prop].get) {
          Object.defineProperty(value, prop, {
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
      if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get)) value = getNode(nodes, property, value)();
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
    setProperty(state, key, value[key]);
  }
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
const $ROOT = Symbol("store-root");
function applyState(target, parent, property, merge, key) {
  const previous = parent[property];
  if (target === previous) return;
  const isArray = Array.isArray(target);
  if (property !== $ROOT && (!isWrappable(target) || !isWrappable(previous) || isArray !== Array.isArray(previous) || key && target[key] !== previous[key])) {
    setProperty(parent, property, target);
    return;
  }
  if (isArray) {
    if (target.length && previous.length && (!merge || key && target[0] && target[0][key] != null)) {
      let i, j, start, end, newEnd, item, newIndicesNext, keyVal;
      for (start = 0, end = Math.min(previous.length, target.length); start < end && (previous[start] === target[start] || key && previous[start] && target[start] && previous[start][key] && previous[start][key] === target[start][key]); start++) {
        applyState(target[start], previous, start, merge, key);
      }
      const temp = new Array(target.length),
        newIndices = new Map();
      for (end = previous.length - 1, newEnd = target.length - 1; end >= start && newEnd >= start && (previous[end] === target[newEnd] || key && previous[end] && target[newEnd] && previous[end][key] && previous[end][key] === target[newEnd][key]); end--, newEnd--) {
        temp[newEnd] = previous[end];
      }
      if (start > newEnd || start > end) {
        for (j = start; j <= newEnd; j++) setProperty(previous, j, target[j]);
        for (; j < target.length; j++) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        }
        if (previous.length > target.length) setProperty(previous, "length", target.length);
        return;
      }
      newIndicesNext = new Array(newEnd + 1);
      for (j = newEnd; j >= start; j--) {
        item = target[j];
        keyVal = key && item ? item[key] : item;
        i = newIndices.get(keyVal);
        newIndicesNext[j] = i === undefined ? -1 : i;
        newIndices.set(keyVal, j);
      }
      for (i = start; i <= end; i++) {
        item = previous[i];
        keyVal = key && item ? item[key] : item;
        j = newIndices.get(keyVal);
        if (j !== undefined && j !== -1) {
          temp[j] = previous[i];
          j = newIndicesNext[j];
          newIndices.set(keyVal, j);
        }
      }
      for (j = start; j < target.length; j++) {
        if (j in temp) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        } else setProperty(previous, j, target[j]);
      }
    } else {
      for (let i = 0, len = target.length; i < len; i++) {
        applyState(target[i], previous, i, merge, key);
      }
    }
    if (previous.length > target.length) setProperty(previous, "length", target.length);
    return;
  }
  const targetKeys = Object.keys(target);
  for (let i = 0, len = targetKeys.length; i < len; i++) {
    applyState(target[targetKeys[i]], previous, targetKeys[i], merge, key);
  }
  const previousKeys = Object.keys(previous);
  for (let i = 0, len = previousKeys.length; i < len; i++) {
    if (target[previousKeys[i]] === undefined) setProperty(previous, previousKeys[i], undefined);
  }
}
function reconcile(value, options = {}) {
  const {
      merge,
      key = "id"
    } = options,
    v = unwrap(value);
  return state => {
    if (!isWrappable(state) || !isWrappable(v)) return v;
    const res = applyState(v, {
      [$ROOT]: state
    }, $ROOT, merge, key);
    return res === undefined ? state : res;
  };
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var classnames = {exports: {}};

var hasRequiredClassnames;

function requireClassnames () {
	if (hasRequiredClassnames) return classnames.exports;
	hasRequiredClassnames = 1;
	(function (module) {
		(function () {

		  var hasOwn = {}.hasOwnProperty;
		  function classNames() {
		    var classes = '';
		    for (var i = 0; i < arguments.length; i++) {
		      var arg = arguments[i];
		      if (arg) {
		        classes = appendClass(classes, parseValue(arg));
		      }
		    }
		    return classes;
		  }
		  function parseValue(arg) {
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
		  function appendClass(value, newClass) {
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
		})(); 
	} (classnames));
	return classnames.exports;
}

var classnamesExports = requireClassnames();
var classNames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

const CLabel = props => {
  return (() => {
    const _el$2 = createElement("Label", props, null);
    spread(_el$2, props, false);
    return _el$2;
  })();
};

const SUPPORT_CSS_LIST = ["flowChildren", "width", "height", "tooltipPosition", "verticalAlign", "horizontalAlign", "align", "margin", "marginTop", "marginLeft", "marginBottom", "marginRight", "padding", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "overflow", "backgroundImage", "backgroundSize", "backgroundColor", "washColor", "opacity", "opacity", "x", "y", "zIndex", "fontSize", "fontFamily", "textShadow", "textDecoration", "color", "scroll", "style"];
function EOMProps(props, defaultProps = {}) {
  const [css, others] = splitProps(props, SUPPORT_CSS_LIST);
  const [combine, final] = splitProps(others, ["class", "classList", "className", "customTooltip", "tooltip", "titleTooltip"]);
  if (css.scroll != undefined) {
    css.overflow = getOverflow(css.scroll);
    delete css.scroll;
  }
  const [htmlStyle, htmlCss] = splitProps(css, ["style"]);
  let style = {
    style: htmlCss
  };
  if (htmlStyle.style != undefined) {
    style.style = Object.assign(style.style, {
      ...htmlStyle.style
    });
  }
  defaultProps.style = Object.assign(Object.fromEntries(Object.entries(defaultProps.style ?? {}).filter(([key, value]) => value !== undefined)), style.style ?? {});
  defaultProps.class = (defaultProps.class ?? "") + " " + (props.class ?? "");
  defaultProps.classList = Object.assign(defaultProps.classList ?? {}, props.classList ?? {});
  defaultProps.className = classNames(defaultProps.className ?? "", props.className ?? "");
  if (combine.customTooltip != undefined) {
    defaultProps.custom_tooltip = [props.customTooltip.name, `file://{resources}/layout/custom_game/${props.customTooltip.name}.xml`];
    defaultProps.custom_tooltip_params = props.customTooltip;
  }
  if (combine.tooltip != undefined) {
    defaultProps.tooltip_text = combine.tooltip;
  }
  return mergeProps$1(defaultProps, final);
}
function getOverflow(scroll) {
  switch (scroll) {
    case "x":
      return "scroll squish";
    case "y":
      return "squish scroll";
    case "both":
      return "scroll scroll";
    case "none":
    case ["none", "none"]:
      return "squish squish";
  }
}

let DotaHud = GameUI.CustomUIConfig()._HUDRoot_ ?? $.GetContextPanel();
while (DotaHud.GetParent() != undefined) {
  DotaHud = DotaHud.GetParent();
}
let EOM_DropDownContainer = DotaHud.FindChildTraverse("EOM_DropDownContainer");
if (DotaHud != undefined && EOM_DropDownContainer == undefined) {
  EOM_DropDownContainer = $.CreatePanel("Panel", DotaHud, "EOM_DropDownContainer", {
    style: "width: 100%; height: 100%;"
  });
  EOM_DropDownContainer.visible = false;
  EOM_DropDownContainer.SetPanelEvent("onactivate", () => {
    EOM_DropDownContainer.visible = false;
    console.log("EOM_DropDownMenuShow___");
    EOM_DropDownContainer?.FindChildrenWithClassTraverse("EOM_DropDownMenu").forEach((child, i) => {
      console.log("EOM_DropDownMenuShow___ child", i);
      child.style.maxHeight = "0px";
      child.style.opacity = "0";
      child.SetHasClass("EOM_DropDownMenuShow", false);
    });
  });
}
const EOM_DropDown = props => {
  const mergerd = mergeProps$1({
    id: "EOM_DropDown_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2),
    menuPosition: "bottom",
    hasClear: false,
    enable: true
  }, props);
  const [local, others] = splitProps(mergerd, ["children", "index", "placeholder", "onChange", "onClear", "id", "menuPosition", "hasClear", "enable", "menuClassName"]);
  let resolved = children(() => local.children);
  let selfRef = undefined;
  let myMenu = undefined;
  createEffect(on(() => local.index, _index => {
    if (selfRef) {
      for (let index = 0; index < selfRef.GetChildCount(); index++) {
        const child = selfRef.GetChild(index);
        if (child && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow") {
          child.visible = index == local.index;
        }
      }
    }
  }));
  onMount(() => {
    if (selfRef) {
      for (let index = 0; index < selfRef.GetChildCount(); index++) {
        const child = selfRef.GetChild(index);
        if (child && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow") {
          child.visible = index == local.index;
        }
      }
    }
  });
  onCleanup(() => {
    if (myMenu && myMenu.IsValid()) {
      render(() => [], myMenu);
      myMenu.DeleteAsync(0);
    }
  });
  const onChange = (childIndex, c) => {
    if (local.onChange) {
      local.onChange(childIndex, c);
    }
    if (selfRef) {
      for (let index = 0; index < selfRef.GetChildCount(); index++) {
        const c = selfRef.GetChild(index);
        if (index != childIndex) {
          if (c && c.id != "EOM_DropDown_placeholder" && c.id != "EOM_DropDown_arrow") {
            c.visible = false;
          }
        }
      }
    }
  };
  const onClear = () => {
    if (local.onClear) {
      local.onClear();
    }
  };
  const createDropDown = pBtn => {
    if (myMenu == undefined && selfRef) {
      myMenu = $.CreatePanel("Panel", selfRef, `${local.id}_DropDownMenu`);
      myMenu.AddClass("EOM_DropDownMenu");
      if (local.menuClassName) myMenu.AddClass(local.menuClassName);
      let _resolved = children(() => local.children);
      if (_resolved()) {
        if (local.hasClear) {
          let content = $.CreatePanel("RadioButton", myMenu, 'EOM_DropDown_Clear', {
            class: "EOM_DropDownMenuItem",
            group: "EOM_DropDownMenuItem"
          });
          content.SetPanelEvent("onactivate", () => {
            if (pBtn) {
              for (let index = 0; index < pBtn.GetChildCount(); index++) {
                const c = pBtn.GetChild(index);
                if (c && c.id != "EOM_DropDown_arrow") {
                  c.visible = false;
                }
              }
              onClear();
              pBtn.FindChildTraverse("EOM_DropDown_placeholder").visible = true;
            }
            toggleMenu(pBtn, false);
          });
          render(() => createElement("Label", {
            text: "#DropDown_Clear"
          }, null), content);
        }
        for (let childIndex = 0; childIndex < _resolved().length; childIndex++) {
          let content = $.CreatePanel("RadioButton", myMenu, '', {
            class: "EOM_DropDownMenuItem",
            group: "EOM_DropDownMenuItem"
          });
          content.SetPanelEvent("onblur", () => {});
          content.SetPanelEvent("onactivate", () => {
            if (pBtn) {
              for (let index = 0; index < pBtn.GetChildCount(); index++) {
                const c = pBtn.GetChild(index);
                if (c && c.id != "EOM_DropDown_arrow" && c.id != "EOM_DropDown_Clear") {
                  c.visible = index == childIndex;
                  if (c.visible) {
                    onChange(childIndex, c);
                  }
                }
              }
            }
            toggleMenu(pBtn, false);
          });
          render(() => _resolved()[childIndex], content);
        }
      }
      myMenu.SetParent(EOM_DropDownContainer);
      myMenu.style.opacity = "0";
    }
  };
  const toggleMenu = (pBtn, state) => {
    console.log("toggleMenu", state);
    if (myMenu == undefined || !myMenu.IsValid()) {
      createDropDown(pBtn);
    }
    if (pBtn && myMenu?.IsValid()) {
      let my_state = state == undefined ? !myMenu.BHasClass("EOM_DropDownMenuShow") : state;
      EOM_DropDownContainer.visible = my_state;
      myMenu.SetHasClass("EOM_DropDownMenuShow", my_state);
      console.log("EOM_DropDownMenuShow Toggle", my_state);
      if (my_state) {
        myMenu.SetFocus();
        $.Schedule(0.06, () => {
          if (pBtn && myMenu) {
            myMenu.style.opacity = "1";
            myMenu.style.minWidth = Math.max(myMenu.actuallayoutwidth, pBtn.actuallayoutwidth) + "px";
            const childItems = myMenu.FindChildrenWithClassTraverse("EOM_DropDownMenuItem");
            if (childItems && childItems.length > 0) {
              childItems.forEach(item => {
                item.style.width = "100%";
              });
            }
            let vPos = pBtn.GetPositionWithinWindow();
            let menuPosition = local.menuPosition;
            let x = vPos.x;
            let y = Math.max(0, menuPosition == "bottom" ? vPos.y + pBtn.actuallayoutheight + 2 : vPos.y - myMenu.actuallayoutheight - 2);
            let maxHeight = Math.max(0, (menuPosition == "bottom" ? Game.GetScreenHeight() - y : vPos.y) - 8);
            myMenu.style.maxHeight = maxHeight / myMenu.actualuiscale_y + "px";
            if (myMenu.actuallayoutheight > maxHeight) {
              y = Math.max(0, menuPosition == "bottom" ? y : vPos.y - maxHeight);
            }
            myMenu.SetPositionInPixels(x / myMenu.actualuiscale_x, y / myMenu.actualuiscale_y, 0);
          }
        });
      } else {
        myMenu.style.maxHeight = "0px";
        myMenu.style.opacity = "0";
      }
    }
  };
  return (() => {
    const _el$2 = createElement("Button", mergeProps({
        get id() {
          return local.id;
        }
      }, () => EOMProps(others, {
        className: classNames("EOM_DropDown", {
          Disable: !local.enable
        })
      })), null),
      _el$3 = createElement("Image", {
        id: "EOM_DropDown_arrow"
      }, _el$2);
    const _ref$ = selfRef;
    typeof _ref$ === "function" ? use(_ref$, _el$2) : selfRef = _el$2;
    spread(_el$2, mergeProps({
      get id() {
        return local.id;
      }
    }, () => EOMProps(others, {
      className: classNames("EOM_DropDown", {
        Disable: !local.enable
      })
    }), {
      "onactivate": self => {
        if (!local.enable) {
          return;
        }
        toggleMenu(self);
      }
    }), true);
    insert(_el$2, resolved, _el$3);
    insert(_el$2, createComponent(CLabel, {
      id: "EOM_DropDown_placeholder",
      get text() {
        return $.Localize(local.index == undefined && local.placeholder ? local.placeholder : "");
      }
    }), _el$3);
    return _el$2;
  })();
};

const EOM_TextEntry = props => {
  const [local, others] = splitProps(props, ["children", "onChange", "oninputsubmit", "text"]);
  const resolved = children(() => local.children);
  const [text, setText] = createSignal(local.text ?? "");
  return (() => {
    const _el$ = createElement("TextEntry", mergeProps(() => EOMProps(others, {
      className: classNames(props.className, "EOM_TextEntry"),
      style: {
        whiteSpace: others.multiline ? "normal" : undefined
      }
    })), null);
    spread(_el$, mergeProps(() => EOMProps(others, {
      className: classNames(props.className, "EOM_TextEntry"),
      style: {
        whiteSpace: others.multiline ? "normal" : undefined
      }
    }), {
      "ontextentrychange": self => {
        if (local.onChange) {
          local.onChange(self, text(), self.text);
        }
        setText(self.text);
      },
      "oninputsubmit": self => {
        if (local.oninputsubmit) {
          local.oninputsubmit(self);
        }
        if (local.onChange) {
          local.onChange(self, text(), self.text);
        }
        setText(self.text);
      },
      "onload": self => {
        self.text = text();
        self.SetDisableFocusOnMouseDown(false);
        self.SetPanelEvent("onblur", () => {
          $.DispatchEvent("DropInputFocus", self);
        });
      }
    }), true);
    insert(_el$, resolved);
    return _el$;
  })();
};

function platformErrorToken(code) {
  if (code === 'INVALID_ROOM') return '#platform_invalid_room';
  if (code === 'INVALID_PASSWORD' || code === 'ROOM_PASSWORD_INVALID') return '#platform_invalid_password';
  if (code === 'REQUEST_TIMEOUT') return '#platform_request_timeout';
  if (code === 'TOOLS_BRIDGE_UNAVAILABLE') return '#platform_tools_bridge_unavailable';
  if (code === 'INVALID_MESSAGE') return '#platform_invalid_message';
  if (code === 'CONTENT_REJECTED') return '#platform_content_rejected';
  return '#platform_error';
}
function createRoomPayload(map, title, password) {
  const name = title.trim();
  if (!name || Array.from(name).length > 40) throw new Error('INVALID_ROOM');
  if (password && !/^[!-~]{4,20}$/.test(password)) throw new Error('INVALID_PASSWORD');
  return {
    map,
    title: name,
    password,
    autoStart: true
  };
}

function ReturnToLobby(props) {
  const [available, setAvailable] = createSignal(false);
  let retry;
  const listener = GameEvents.Subscribe('client_side_event', event => {
    if (event.event_name !== 'platform_route_status') return;
    try {
      setAvailable(JSON.parse(event.event_data).available === true);
    } catch {
      setAvailable(false);
    }
  });
  onMount(() => {
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
  onCleanup(() => {
    GameEvents.Unsubscribe(listener);
    if (retry !== undefined) $.CancelScheduled(retry);
  });
  return createComponent(Show, {
    get when() {
      return available();
    },
    get children() {
      const _el$ = createElement("Button", {
          "class": "PlatformReturnButton"
        }, null),
        _el$2 = createElement("Label", {
          get text() {
            return props.retry ? '#platform_retry' : '#platform_return';
          }
        }, _el$);
      setProp(_el$, "onactivate", () => GameEvents.SendEventClientSide('client_side_event', {
        event_name: 'platform_return',
        event_data: '{}'
      }));
      effect(_$p => setProp(_el$2, "text", props.retry ? '#platform_retry' : '#platform_return', _$p));
      return _el$;
    }
  });
}

function memberAccountID(player) {
  const id = player.uid || player.steamId || player.id;
  if (!/^\d+$/.test(id)) return undefined;
  const account = id.length === 17 ? (Number(id.slice(0, -8)) - 765611979) * 100000000 + Number(id.slice(-8)) - 60265728 : Number(id);
  return Number.isInteger(account) && account > 0 && account <= 4294967295 ? String(account) : undefined;
}
function memberStatus(player, room, selfID) {
  if (player.connected) return '#platform_member_in_game';
  if (player.present === false && player.id !== selfID) return '#platform_member_offline';
  if (room.launchConfirmation) return room.launchConfirmation.accepted?.includes(player.id) ? '#platform_member_confirmed' : '#platform_member_confirming';
  if (room.state === 'ALLOCATING') return '#platform_member_preparing';
  if (['WAITING', 'LOADING', 'RUNNING'].includes(room.state ?? '')) return '#platform_member_awaiting';
  return player.id === room.owner ? '#platform_owner' : '#platform_member_waiting';
}
function memberLatency(player) {
  const sample = player.latency;
  if (!sample || !['good', 'poor', 'bad'].includes(sample.state) || !Number.isInteger(sample.ms) || sample.ms < 0) return {
    state: 'unavailable',
    ms: undefined
  };
  return {
    state: sample.state,
    ms: sample.ms
  };
}
function matchFound(room) {
  return room.state !== 'LOBBY' || !!room.launchConfirmation || (room.players ?? []).filter(player => player.role !== 'spectator' && player.role !== 'observer').length >= (room.maxPlayers || room.capacity || 8);
}
function shouldAutoEnter(room, attempted, preparing) {
  return !!room && room.canLaunch === true && !attempted.has(room.id) && (room.state === 'WAITING' || room.state === 'LOADING' || room.state === 'RUNNING' && preparing.has(room.id));
}
function isMatchingRoom(room) {
  return !!room && (room.matching === true || room.matchmaking === true) && room.state === 'LOBBY' && !room.launchConfirmation;
}
function canStartRoom(room, userID) {
  return !!room && room.state === 'LOBBY' && room.owner === userID && !room.launchConfirmation && room.matching !== true && room.matchmaking !== true;
}

function ChatMessage(props) {
  let body;
  const accountID = () => {
    const author = props.chat.author;
    const member = props.players.find(player => player.id === author?.id);
    return memberAccountID({
      ...member,
      ...author,
      id: author?.id ?? ''
    }) ?? (author?.id === props.selfID ? memberAccountID({
      id: Game.GetLocalPlayerInfo()?.player_steamid ?? ''
    }) : undefined);
  };
  const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  createEffect(() => {
    if (body?.IsValid()) body.text = '<b>' + escape(props.displayName(props.chat.author ?? {})) + ':</b> ' + escape(props.chat.body);
  });
  return (() => {
    const _el$ = createElement("Panel", {
        "class": "PlatformChatMessage"
      }, null),
      _el$3 = createElement("Label", {
        "class": "PlatformChatText",
        html: true
      }, _el$);
    insert(_el$, createComponent(Show, {
      get when() {
        return accountID();
      },
      get fallback() {
        return createElement("Panel", {
          "class": "PlatformChatAvatar PlatformChatAvatarPlaceholder"
        }, null);
      },
      get children() {
        const _el$2 = createElement("DOTAAvatarImage", {
          "class": "PlatformChatAvatar",
          hittest: false
        }, null);
        use(panel => panel.accountid = accountID(), _el$2);
        return _el$2;
      }
    }), _el$3);
    const _ref$ = body;
    typeof _ref$ === "function" ? use(_ref$, _el$3) : body = _el$3;
    return _el$;
  })();
}
function MemberConnection(props) {
  const latency = () => memberLatency(props.player);
  return (() => {
    const _el$5 = createElement("Panel", {
        "class": "PlatformMemberConnection"
      }, null),
      _el$6 = createElement("Label", {
        get ["class"]() {
          return props.player.connected || props.player.id === props.room.owner ? 'PlatformMemberStatus PlatformMemberActive' : 'PlatformMemberStatus';
        },
        get text() {
          return memberStatus(props.player, props.room, props.selfID);
        }
      }, _el$5),
      _el$7 = createElement("Panel", {
        get ["class"]() {
          return 'PlatformMemberLatency PlatformLatency_' + latency().state;
        }
      }, _el$5),
      _el$8 = createElement("Panel", {
        "class": "PlatformSignalBars",
        hittest: false
      }, _el$7);
      createElement("Panel", {
        "class": "PlatformSignalBar PlatformSignalBarOne"
      }, _el$8);
      createElement("Panel", {
        "class": "PlatformSignalBar PlatformSignalBarTwo"
      }, _el$8);
      createElement("Panel", {
        "class": "PlatformSignalBar PlatformSignalBarThree"
      }, _el$8);
      const _el$10 = createElement("Label", {
        get text() {
          return latency().ms === undefined ? '#platform_latency_unknown' : '#platform_latency_ms';
        },
        get dialogVariables() {
          return {
            ms: String(latency().ms ?? '')
          };
        }
      }, _el$7);
    setProp(_el$7, "tooltip_text", "#platform_latency_hint");
    effect(_p$ => {
      const _v$ = props.player.connected || props.player.id === props.room.owner ? 'PlatformMemberStatus PlatformMemberActive' : 'PlatformMemberStatus',
        _v$2 = memberStatus(props.player, props.room, props.selfID),
        _v$3 = 'PlatformMemberLatency PlatformLatency_' + latency().state,
        _v$4 = latency().ms === undefined ? '#platform_latency_unknown' : '#platform_latency_ms',
        _v$5 = {
          ms: String(latency().ms ?? '')
        };
      _v$ !== _p$._v$ && (_p$._v$ = setProp(_el$6, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = setProp(_el$6, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = setProp(_el$7, "class", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = setProp(_el$10, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = setProp(_el$10, "dialogVariables", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$5;
  })();
}
function RoomSeats(props) {
  const seats = () => {
    const members = [...new Map([...(props.room.players ?? []), ...(props.room.observers ?? [])].map(player => [player.id, player])).values()];
    const capacity = props.room.capacity || props.room.maxPlayers || members.length;
    return Array.from({
      length: Math.max(capacity, members.length)
    }, (_, index) => members[index]);
  };
  const observer = player => props.room.observers?.some(value => value.id === player.id) || player.role === 'observer' || player.role === 'spectator';
  const accountID = player => memberAccountID(player) ?? (player.id === props.selfID ? memberAccountID({
    id: Game.GetPlayerInfo?.(Players.GetLocalPlayer())?.player_steamid ?? ''
  }) : undefined);
  return (() => {
    const _el$11 = createElement("Panel", {
        "class": "PlatformSeatGroups"
      }, null),
      _el$12 = createElement("Panel", {
        "class": "PlatformSeatColumn"
      }, _el$11);
    insert(_el$12, createComponent(For, {
      get each() {
        return seats();
      },
      children: (player, index) => (() => {
        const _el$13 = createElement("Panel", {
            "class": "PlatformSeat"
          }, null),
          _el$14 = createElement("Label", {
            "class": "PlatformSeatNumber",
            get text() {
              return String(index() + 1);
            }
          }, _el$13),
          _el$16 = createElement("Label", {
            "class": "PlatformSeatName",
            get text() {
              return player ? props.displayName(player) : '#platform_empty_seat';
            }
          }, _el$13);
        insert(_el$13, createComponent(Show, {
          get when() {
            return player && accountID(player);
          },
          get fallback() {
            return (() => {
              const _el$19 = createElement("Panel", {
                "class": player ? 'PlatformSeatAvatarPlaceholder' : 'PlatformSeatAvatarPlaceholder PlatformSeatVacant'
              }, null);
              setProp(_el$19, "class", player ? 'PlatformSeatAvatarPlaceholder' : 'PlatformSeatAvatarPlaceholder PlatformSeatVacant');
              return _el$19;
            })();
          },
          get children() {
            const _el$15 = createElement("DOTAAvatarImage", {
              "class": "PlatformSeatAvatar",
              hittest: false
            }, null);
            use(panel => panel.accountid = accountID(player), _el$15);
            return _el$15;
          }
        }), _el$16);
        insert(_el$13, createComponent(Show, {
          get when() {
            return player && observer(player);
          },
          get children() {
            return createElement("Label", {
              "class": "PlatformObserverBadge",
              text: "#platform_spectator_role"
            }, null);
          }
        }), null);
        insert(_el$13, createComponent(Show, {
          get when() {
            return player && player.id === props.room.owner;
          },
          get children() {
            return createElement("Label", {
              "class": "PlatformOwner",
              text: "#platform_owner"
            }, null);
          }
        }), null);
        insert(_el$13, createComponent(Show, {
          when: player,
          get children() {
            return createComponent(MemberConnection, {
              player: player,
              get room() {
                return props.room;
              },
              get selfID() {
                return props.selfID;
              }
            });
          }
        }), null);
        effect(_p$ => {
          const _v$6 = String(index() + 1),
            _v$7 = player ? props.displayName(player) : '#platform_empty_seat';
          _v$6 !== _p$._v$6 && (_p$._v$6 = setProp(_el$14, "text", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = setProp(_el$16, "text", _v$7, _p$._v$7));
          return _p$;
        }, {
          _v$6: undefined,
          _v$7: undefined
        });
        return _el$13;
      })()
    }));
    return _el$11;
  })();
}
function PlatformLobby() {
  const entry = Game.GetMapInfo().map_display_name === 'platform_entry';
  const [entryConnecting, setEntryConnecting] = createSignal(false);
  const chooseEntry = region => {
    if (entryConnecting()) return;
    setEntryConnecting(true);
    GameEvents.SendEventClientSide('client_side_event', {
      event_name: 'platform_entry_select',
      event_data: region
    });
  };
  const [rooms, setRooms] = createSignal([]);
  const [roomState, setRoomState] = createStore({});
  const room = () => roomState.value;
  const setRoom = value => value ? setRoomState('value', reconcile(value, {
    key: 'id'
  })) : setRoomState('value', undefined);
  const [game, setGame] = createSignal();
  const [map, setMap] = createSignal('');
  const [busy, setBusy] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [errorDetails, setErrorDetails] = createSignal('');
  const [communicationError, setCommunicationError] = createSignal(false);
  const [connected, setConnected] = createSignal(false);
  const [otherGame, setOtherGame] = createSignal('');
  const [createOpen, setCreateOpen] = createSignal(false);
  const [joinTarget, setJoinTarget] = createSignal();
  const [restoredMatchID, setRestoredMatchID] = createSignal('');
  const [reconnectPromptID, setReconnectPromptID] = createSignal('');
  const promptedMatches = new Set();
  const reconnectable = value => !!value && value.canLaunch === true && ['WAITING', 'LOADING', 'RUNNING'].includes(value.state);
  createEffect(() => {
    const current = room();
    if (current?.id !== restoredMatchID() || !reconnectable(current) || promptedMatches.has(current.id)) return;
    promptedMatches.add(current.id);
    setReconnectPromptID(current.id);
  });
  const [userID, setUserID] = createSignal('');
  const [userName, setUserName] = createSignal('');
  const [nameRevision, setNameRevision] = createSignal(0);
  const displayName = player => {
    nameRevision();
    const local = Game.GetLocalPlayerInfo();
    if (player.id && player.id === userID() && local?.player_name) return local.player_name;
    const member = room()?.players?.find(value => value.id === player.id);
    const account = memberAccountID({
      ...member,
      ...player,
      id: player.id ?? ''
    });
    if (account && typeof Players !== 'undefined') {
      for (const id of Players.GetAllPlayerIDs()) {
        const info = Game.GetPlayerInfo(id);
        if (info?.player_name && memberAccountID({
          id: info.player_steamid
        }) === account) return info.player_name;
      }
    }
    return player.steamName || member?.steamName || player.name || '#platform_player';
  };
  const defaultRoomName = () => Array.from($.Localize('#platform_default_room_name').replace('{name}', userName() || $.Localize('#platform_player'))).slice(0, 40).join('');
  const [offset, setOffset] = createSignal(0);
  const [hasMore, setHasMore] = createSignal(false);
  const [chatState, setChatState] = createStore({
    rows: []
  });
  const chats = () => chatState.rows;
  const setChats = rows => setChatState('rows', reconcile(rows, {
    key: 'id'
  }));
  const [message, setMessage] = createSignal('');
  const [chatSending, setChatSending] = createSignal(false);
  const [chatError, setChatError] = createSignal('');
  const [search, setSearch] = createSignal('');
  const [region, setRegion] = createSignal('');
  const [searchRoomID, setSearchRoomID] = createSignal('');
  const [matchStarted, setMatchStarted] = createSignal(0);
  const [now, setNow] = createSignal(Date.now());
  const matching = () => !!room() && (isMatchingRoom(room()) || searchRoomID() === room()?.id) && !matchFound(room());
  const visibleRooms = () => rooms().filter(item => !region() || item.region?.id === region());
  const regions = () => Array.from(new Map(rooms().filter(item => item.region).map(item => [item.region.id, item.region])).values());
  const matchTime = () => {
    const seconds = Math.max(0, Math.floor((now() - matchStarted()) / 1000));
    return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
  };
  let chatInput;
  let chatList;
  let roomPasswordInput;
  const [passwordVisible, setPasswordVisible] = createSignal(false);
  const [passwordDirty, setPasswordDirty] = createSignal(false);
  let roomPasswordDraft = '';
  let displayedRoomID = '';
  const autoEntryAttempted = new Set();
  const preparingRooms = new Set();
  let pageSize = 20;
  let addon = '';
  let title = '';
  let password = '';
  let serial = 0;
  const requestPrefix = Date.now().toString(36) + Math.floor(Math.random() * 0x1000000).toString(36) + '_';
  let stopped = false;
  let queuedAction;
  let poll;
  let clock;
  const pending = {};
  let transportTail = Promise.resolve();
  const listener = GameEvents.Subscribe('platform_response', event => {
    const request = pending[event.id];
    if (!request || !Number.isInteger(event.step) || event.step < 0 || event.step > 66 || typeof event.data !== 'string') return;
    if (event.addon) addon = event.addon;
    request.chunks[event.step] = event.data;
    if (event.done !== 1) return;
    delete pending[event.id];
    $.CancelScheduled(request.timer);
    try {
      for (let step = 0; step <= event.step; step++) {
        if (typeof request.chunks[step] !== 'string') throw new Error();
      }
      const data = JSON.parse(request.chunks.join(''));
      if (event.status < 200 || event.status >= 300) {
        $.Msg('[platform] Request failed: status=', event.status, ' code=', data.error ?? 'UNKNOWN', ' logId=', data.logId ?? '');
        request.reject(Object.assign(new Error(data.error ?? 'UNKNOWN'), {
          status: event.status
        }));
      } else request.resolve(data);
    } catch {
      request.reject();
    }
  });
  function request(path, method = 'GET', body = {}) {
    const result = transportTail.then(() => new Promise((resolve, reject) => {
      if (stopped) {
        reject(new Error('REQUEST_CANCELLED'));
        return;
      }
      const id = requestPrefix + (++serial).toString(36);
      const timer = $.Schedule(20, () => {
        delete pending[id];
        reject(new Error('REQUEST_TIMEOUT'));
      });
      pending[id] = {
        chunks: [],
        resolve,
        reject,
        timer
      };
      GameEvents.SendCustomGameEventToServer('platform_request', {
        id,
        path,
        method,
        body: JSON.stringify(body),
        language: $.Language()
      });
    }));
    transportTail = result.then(() => {}, () => {});
    return result;
  }
  const base = () => '/games/' + addon;
  function updateChats(rows) {
    const previous = chats();
    const changed = previous[previous.length - 1]?.id !== rows[rows.length - 1]?.id;
    setChats(rows);
    if (changed) $.Schedule(0, () => {
      if (!stopped && chatList?.IsValid() && !chatInput?.BHasKeyFocus()) chatList.ScrollToBottom();
    });
  }
  async function initialize() {
    const session = await request('/session');
    setUserID(session.user?.id ?? '');
    setUserName(Game.GetLocalPlayerInfo()?.player_name || session.user?.steamName || session.user?.name || '');
    const config = await request('/game');
    setGame(config);
    if (!map()) setMap(config.defaultMap);
    const snapshot = await request('/lobby/recover', 'POST');
    if (snapshot.room && ['ALLOCATING', 'WAITING', 'LOADING', 'RUNNING'].includes(snapshot.room.state)) setRestoredMatchID(snapshot.room.id);
    await refresh(snapshot);
    setConnected(true);
    setError('');
  }
  async function refresh(recovered) {
    setNameRevision(value => value + 1);
    const snapshot = recovered ?? (await request('/me/room'));
    setOtherGame(snapshot.otherGame ?? '');
    const own = snapshot.room;
    if (own?.id) {
      if (displayedRoomID !== own.id) {
        displayedRoomID = own.id;
        setMessage('');
        setChatError('');
        if (chatInput?.IsValid()) chatInput.text = '';
        setPasswordDirty(false);
        setPasswordVisible(false);
      }
      setCreateOpen(false);
      setJoinTarget(undefined);
      const current = own;
      setRoom(current);
      if (current.state === 'LOBBY' || !['ALLOCATING', 'WAITING', 'LOADING', 'RUNNING'].includes(current.state)) {
        setRestoredMatchID('');
        setReconnectPromptID('');
      }
      if (isMatchingRoom(current) && !matchFound(current) && searchRoomID() !== current.id) {
        setSearchRoomID(current.id);
        setMatchStarted(Date.now());
      }
      if (matchFound(current)) setSearchRoomID('');
      if (['LOBBY', 'ALLOCATING', 'WAITING', 'LOADING'].includes(current.state)) preparingRooms.add(current.id);
      if (current.state === 'LOBBY') autoEntryAttempted.delete(current.id);
      if (typeof current.map === 'string') setMap(current.map);
      if (!matching()) {
        updateChats(await request(base() + '/rooms/' + own.id + '/chat'));
        return;
      }
    } else {
      setRoom(undefined);
      setRestoredMatchID('');
      setReconnectPromptID('');
      setSearchRoomID('');
      setMatchStarted(0);
      setChats([]);
      setMessage('');
    }
    const list = await request(base() + '/rooms?offset=' + offset() + '&query=' + encodeURIComponent(search().trim()));
    setRooms(Array.isArray(list) ? list : list.rooms ?? []);
    setHasMore(list.hasMore === true);
    pageSize = typeof list.pageSize === 'number' && list.pageSize > 0 ? list.pageSize : 20;
  }
  async function run(action, background = false) {
    if (stopped) return;
    if (busy()) {
      if (!background && !queuedAction) {
        queuedAction = action;
        setLoading(true);
      }
      return;
    }
    setBusy(true);
    setLoading(!background);
    if (!background) setError('');
    try {
      await action();
      if (!stopped && communicationError()) {
        setError('');
        setCommunicationError(false);
      }
      if (!stopped && restoredMatchID() !== room()?.id && shouldAutoEnter(room(), autoEntryAttempted, preparingRooms)) {
        try {
          await enterMatch(room().id);
        } catch {
          if (!stopped) setError('#platform_auto_enter_failed');
        }
      }
    } catch (reason) {
      if (!stopped) {
        const code = reason instanceof Error ? reason.message : 'UNKNOWN';
        const status = reason?.status;
        setErrorDetails(status === undefined ? code : 'HTTP ' + status + ' / ' + code);
        setCommunicationError(background || code === 'REQUEST_TIMEOUT' || code === 'TOOLS_BRIDGE_UNAVAILABLE' || status === 0 || status === 503);
        const token = platformErrorToken(code);
        setError(token === '#platform_error' ? '#platform_request_failed_code' : token);
      }
    } finally {
      if (!stopped) {
        setBusy(false);
        setLoading(false);
      }
      const next = queuedAction;
      queuedAction = undefined;
      if (next && !stopped) void run(next);
    }
  }
  function mutate(path, body = {}) {
    void run(async () => {
      try {
        await request(base() + path, 'POST', body);
      } catch (reason) {
        try {
          await refresh();
        } catch {}
        throw reason;
      }
      await refresh();
    });
  }
  function roomAction(action, body = {}) {
    if (room()) mutate('/rooms/' + room().id + '/' + action, body);
  }
  function startMatching() {
    void run(async () => {
      const result = await request(base() + '/match', 'POST', {
        map: map(),
        launchMode: 'dedicated'
      });
      setSearchRoomID(result.id ?? '');
      setMatchStarted(Date.now());
      await refresh();
    });
  }
  async function sendMessage() {
    const current = room();
    const sent = message();
    if (!current || !sent.trim() || chatSending() || stopped) return;
    setChatSending(true);
    setChatError('');
    try {
      if (Array.from(sent).length > 300) throw new Error('INVALID_MESSAGE');
      const path = base() + '/rooms/' + current.id + '/chat';
      await request(path, 'POST', {
        text: sent.trim()
      });
      if (stopped || room()?.id !== current.id) return;
      if (message() === sent) {
        setMessage('');
        if (chatInput?.IsValid()) chatInput.text = '';
      }
      const rows = await request(path);
      if (!stopped && room()?.id === current.id) updateChats(rows);
    } catch (reason) {
      if (!stopped && room()?.id === current.id) {
        const code = reason instanceof Error ? reason.message : 'UNKNOWN';
        const status = reason?.status;
        setChatError(status === undefined ? code : 'HTTP ' + status + ' / ' + code);
      }
    } finally {
      if (!stopped) setChatSending(false);
    }
  }
  async function enterMatch(roomID = room()?.id) {
    if (!roomID || stopped) return;
    autoEntryAttempted.add(roomID);
    const ticket = await request(base() + '/rooms/' + roomID + '/launch-ticket/new', 'POST');
    if (stopped || room()?.id !== roomID) return;
    const connection = await request('/launch/redeem', 'POST', {
      ticket: ticket.ticket
    });
    if (stopped || room()?.id !== roomID) return;
    if (connection.mode !== 'dedicated') throw new Error();
    GameEvents.SendEventClientSide('client_side_event', {
      event_name: 'platform_connect',
      event_data: JSON.stringify({
        address: connection.address,
        password: connection.password
      })
    });
    setReconnectPromptID('');
  }
  onMount(() => {
    if (entry) return;
    const updateClock = () => {
      if (stopped) return;
      setNow(Date.now());
      clock = $.Schedule(0.25, updateClock);
    };
    updateClock();
    const waitForPlayer = () => {
      if (stopped) return;
      const player = Game.GetLocalPlayerInfo();
      if (!player || !player.player_steamid || player.player_steamid === '0') {
        poll = $.Schedule(0.25, waitForPlayer);
        return;
      }
      void run(initialize);
      poll = $.Schedule(1, tick);
    };
    const tick = () => {
      if (stopped) return;
      if (!busy()) void run(connected() ? refresh : initialize, true);
      poll = $.Schedule(room()?.launchConfirmation || matching() ? 1 : 5, tick);
    };
    waitForPlayer();
  });
  onCleanup(() => {
    stopped = true;
    GameEvents.Unsubscribe(listener);
    if (poll !== undefined) $.CancelScheduled(poll);
    if (clock !== undefined) $.CancelScheduled(clock);
    for (const id in pending) {
      $.CancelScheduled(pending[id].timer);
      pending[id].reject();
      delete pending[id];
    }
  });
  const button = (token, action, primary = false) => (() => {
    const _el$20 = createElement("Button", {
        "class": primary ? "PlatformButton PlatformPrimaryButton" : "PlatformButton",
        onactivate: action
      }, null),
      _el$21 = createElement("Label", {
        text: token
      }, _el$20);
    setProp(_el$20, "class", primary ? "PlatformButton PlatformPrimaryButton" : "PlatformButton");
    setProp(_el$20, "onactivate", action);
    setProp(_el$21, "text", token);
    effect(_$p => setProp(_el$20, "enabled", !loading(), _$p));
    return _el$20;
  })();
  const canEditRoom = () => canStartRoom(room(), userID()) && !loading();
  const memberCount = () => room()?.players?.length ?? Object.keys(room()?.members ?? {}).length;
  const displayedMemberCount = () => room()?.players ? new Set([...(room()?.players ?? []), ...(room()?.observers ?? [])].map(player => player.id)).size : memberCount();
  const saveRoomPassword = () => {
    if (!passwordDirty() || !canEditRoom()) return;
    const value = roomPasswordDraft;
    void run(async () => {
      if (value && !/^[!-~]{4,20}$/.test(value)) throw new Error('INVALID_PASSWORD');
      await request(base() + '/rooms/' + room().id + '/password', 'POST', {
        password: value
      });
      setPasswordDirty(false);
      await refresh();
    });
  };
  createEffect(() => {
    const value = room()?.join_password ?? '';
    if (!passwordDirty() && roomPasswordInput?.IsValid() && roomPasswordInput.text !== value) {
      roomPasswordInput.text = value;
      roomPasswordDraft = value;
    }
  });
  return (() => {
    const _el$22 = createElement("Panel", {
        "class": "PlatformRoot"
      }, null),
      _el$23 = createElement("Button", {
        "class": "PlatformDashboardButton"
      }, _el$22);
      createElement("Panel", {
        "class": "PlatformDashboardIcon",
        hittest: false
      }, _el$23);
      const _el$25 = createElement("Panel", {
        "class": "PlatformLobby"
      }, _el$22);
    setProp(_el$23, "onactivate", self => {
      $.DispatchEvent("DOTAShowDashboard");
    });
    setProp(_el$23, "onmouseover", self => $.DispatchEvent('DOTAShowTextTooltip', self, $.Localize('#platform_main_menu')));
    setProp(_el$23, "onmouseout", self => $.DispatchEvent('DOTAHideTextTooltip', self));
    insert(_el$25, createComponent(Show, {
      when: !entry,
      get children() {
        return createComponent(ReturnToLobby, {});
      }
    }), null);
    insert(_el$25, createComponent(Show, {
      get when() {
        return !room() || matching();
      },
      get children() {
        return createElement("Label", {
          "class": "PlatformTitle",
          text: "#platform_title"
        }, null);
      }
    }), null);
    insert(_el$25, createComponent(Show, {
      when: entry,
      get fallback() {
        return (() => {
          const _el$68 = createElement("Panel", {
            "class": "PlatformColumn PlatformBody"
          }, null);
          insert(_el$68, createComponent(Show, {
            get when() {
              return memo(() => !!connected())() && !otherGame();
            },
            get children() {
              return [createComponent(Show, {
                get when() {
                  return !room() || matching();
                },
                get children() {
                  const _el$69 = createElement("Panel", {
                    "class": "PlatformMatchToolbar"
                  }, null);
                  insert(_el$69, createComponent(EOM_DropDown, {
                    menuClassName: "PlatformDropDownMenu",
                    className: "PlatformMode",
                    get index() {
                      return game()?.maps.findIndex(choice => choice.id === map());
                    },
                    get enable() {
                      return memo(() => !!(!loading() && !matching()))() && (!room() || canStartRoom(room(), userID()));
                    },
                    onChange: index => {
                      const choice = game()?.maps[index];
                      if (!choice) return;
                      if (room()) roomAction('map', {
                        map: choice.id
                      });else setMap(choice.id);
                    },
                    get children() {
                      return createComponent(For, {
                        get each() {
                          return game()?.maps ?? [];
                        },
                        children: choice => (() => {
                          const _el$113 = createElement("Label", {
                            get text() {
                              return choice.name;
                            }
                          }, null);
                          effect(_$p => setProp(_el$113, "text", choice.name, _$p));
                          return _el$113;
                        })()
                      });
                    }
                  }), null);
                  insert(_el$69, createComponent(Show, {
                    get when() {
                      return !room() || matching();
                    },
                    get children() {
                      const _el$70 = createElement("Button", {
                          get ["class"]() {
                            return matching() ? 'PlatformButton PlatformMatchButton PlatformMatchingButton' : 'PlatformButton PlatformMatchButton';
                          }
                        }, null),
                        _el$71 = createElement("Label", {
                          get text() {
                            return matching() ? '#platform_cancel_match' : '#platform_match';
                          }
                        }, _el$70);
                      setProp(_el$70, "onactivate", () => matching() ? roomAction('leave') : startMatching());
                      effect(_p$ => {
                        const _v$12 = matching() ? 'PlatformButton PlatformMatchButton PlatformMatchingButton' : 'PlatformButton PlatformMatchButton',
                          _v$13 = !loading(),
                          _v$14 = matching() ? '#platform_cancel_match' : '#platform_match';
                        _v$12 !== _p$._v$12 && (_p$._v$12 = setProp(_el$70, "class", _v$12, _p$._v$12));
                        _v$13 !== _p$._v$13 && (_p$._v$13 = setProp(_el$70, "enabled", _v$13, _p$._v$13));
                        _v$14 !== _p$._v$14 && (_p$._v$14 = setProp(_el$71, "text", _v$14, _p$._v$14));
                        return _p$;
                      }, {
                        _v$12: undefined,
                        _v$13: undefined,
                        _v$14: undefined
                      });
                      return _el$70;
                    }
                  }), null);
                  return _el$69;
                }
              }), createComponent(Show, {
                get when() {
                  return memo(() => !!room())() && !matching();
                },
                get fallback() {
                  return (() => {
                    const _el$114 = createElement("Panel", {
                        "class": "PlatformColumn PlatformRoomBrowser"
                      }, null),
                      _el$115 = createElement("Panel", {
                        "class": "PlatformHallTab"
                      }, _el$114);
                      createElement("Label", {
                        text: "#platform_room_hall"
                      }, _el$115);
                      createElement("Label", {
                        "class": "PlatformSectionTitle",
                        text: "#platform_room_list"
                      }, _el$114);
                      const _el$118 = createElement("Panel", {
                        "class": "PlatformBrowserToolbar"
                      }, _el$114);
                      createElement("Label", {
                        "class": "PlatformRegionLabel",
                        text: "#platform_region"
                      }, _el$118);
                      const _el$120 = createElement("Button", {
                        get ["class"]() {
                          return region() ? 'PlatformButton PlatformRegionButton' : 'PlatformButton PlatformRegionButton PlatformRegionSelected';
                        }
                      }, _el$118);
                      createElement("Label", {
                        text: "#platform_all_regions"
                      }, _el$120);
                      const _el$122 = createElement("Panel", {
                        "class": "PlatformToolbarSpacer"
                      }, _el$118),
                      _el$123 = createElement("Button", {
                        "class": "PlatformButton PlatformRefreshButton"
                      }, _el$118);
                      createElement("Label", {
                        text: "#platform_refresh"
                      }, _el$123);
                      const _el$125 = createElement("Button", {
                        "class": "PlatformButton PlatformCreateButton"
                      }, _el$118);
                      createElement("Label", {
                        text: "#platform_create"
                      }, _el$125);
                      const _el$127 = createElement("Panel", {
                        "class": "PlatformList"
                      }, _el$114),
                      _el$128 = createElement("Panel", {
                        "class": "PlatformRoomTableHeader"
                      }, _el$127);
                      createElement("Label", {
                        "class": "PlatformRoomName",
                        text: "#platform_room_title"
                      }, _el$128);
                      createElement("Label", {
                        "class": "PlatformRoomCount",
                        text: "#platform_players"
                      }, _el$128);
                      createElement("Label", {
                        "class": "PlatformRoomState",
                        text: "#platform_status"
                      }, _el$128);
                      createElement("Label", {
                        "class": "PlatformRoomMode",
                        text: "#platform_mode"
                      }, _el$128);
                      createElement("Label", {
                        "class": "PlatformRoomHost",
                        text: "#platform_host"
                      }, _el$128);
                      createElement("Label", {
                        "class": "PlatformRoomAction",
                        text: "#platform_action"
                      }, _el$128);
                      const _el$135 = createElement("Panel", {
                        "class": "PlatformRoomTableBody"
                      }, _el$127),
                      _el$140 = createElement("Panel", {
                        "class": "PlatformRow"
                      }, _el$114);
                    setProp(_el$120, "onactivate", () => setRegion(''));
                    insert(_el$118, createComponent(For, {
                      get each() {
                        return regions();
                      },
                      children: item => (() => {
                        const _el$141 = createElement("Button", {
                            get ["class"]() {
                              return region() === item.id ? 'PlatformButton PlatformRegionButton PlatformRegionSelected' : 'PlatformButton PlatformRegionButton';
                            }
                          }, null),
                          _el$142 = createElement("Label", {
                            get text() {
                              return item.name;
                            }
                          }, _el$141);
                        setProp(_el$141, "onactivate", () => setRegion(item.id));
                        effect(_p$ => {
                          const _v$31 = region() === item.id ? 'PlatformButton PlatformRegionButton PlatformRegionSelected' : 'PlatformButton PlatformRegionButton',
                            _v$32 = item.name;
                          _v$31 !== _p$._v$31 && (_p$._v$31 = setProp(_el$141, "class", _v$31, _p$._v$31));
                          _v$32 !== _p$._v$32 && (_p$._v$32 = setProp(_el$142, "text", _v$32, _p$._v$32));
                          return _p$;
                        }, {
                          _v$31: undefined,
                          _v$32: undefined
                        });
                        return _el$141;
                      })()
                    }), _el$122);
                    insert(_el$118, createComponent(EOM_TextEntry, {
                      className: "PlatformRoomSearch",
                      placeholder: "#platform_search_rooms",
                      acceptsfocus: true,
                      ref: panel => panel.SetDisableFocusOnMouseDown(false),
                      onChange: (_, __, text) => setSearch(text),
                      oninputsubmit: () => {
                        setOffset(0);
                        void run(refresh);
                      }
                    }), _el$123);
                    setProp(_el$123, "onactivate", () => {
                      setOffset(0);
                      void run(connected() ? refresh : initialize);
                    });
                    setProp(_el$125, "onactivate", () => {
                      title = '';
                      password = '';
                      setError('');
                      setCreateOpen(true);
                    });
                    insert(_el$135, createComponent(Show, {
                      get when() {
                        return visibleRooms().length === 0;
                      },
                      get children() {
                        const _el$136 = createElement("Panel", {
                            "class": "PlatformEmptyRooms"
                          }, null),
                          _el$137 = createElement("Panel", {
                            "class": "PlatformEmptyContent"
                          }, _el$136),
                          _el$138 = createElement("Label", {
                            "class": "PlatformEmptyTitle",
                            get text() {
                              return search() || region() ? "#platform_no_search_rooms" : "#platform_no_rooms_title";
                            }
                          }, _el$137);
                          createElement("Label", {
                            "class": "PlatformEmptyHint",
                            text: "#platform_no_rooms_hint"
                          }, _el$137);
                        effect(_$p => setProp(_el$138, "text", search() || region() ? "#platform_no_search_rooms" : "#platform_no_rooms_title", _$p));
                        return _el$136;
                      }
                    }), null);
                    insert(_el$135, createComponent(For, {
                      get each() {
                        return visibleRooms();
                      },
                      children: item => (() => {
                        const _el$143 = createElement("Panel", {
                            "class": "PlatformRoomTableRow"
                          }, null),
                          _el$144 = createElement("Label", {
                            "class": "PlatformRoomName",
                            get text() {
                              return item.title || '#platform_room_title';
                            }
                          }, _el$143),
                          _el$145 = createElement("Label", {
                            "class": "PlatformRoomCount",
                            get text() {
                              return String(item.players?.length ?? Object.keys(item.members ?? {}).length) + '/' + item.capacity;
                            }
                          }, _el$143),
                          _el$146 = createElement("Label", {
                            "class": "PlatformRoomState",
                            get text() {
                              return '#platform_state_' + item.state;
                            }
                          }, _el$143),
                          _el$147 = createElement("Label", {
                            "class": "PlatformRoomMode",
                            get text() {
                              return game()?.maps.find(choice => choice.id === item.map)?.name ?? '#platform_room_title';
                            }
                          }, _el$143),
                          _el$148 = createElement("Label", {
                            "class": "PlatformRoomHost",
                            get text() {
                              return item.players?.find(player => player.id === item.owner)?.name || '#platform_player';
                            }
                          }, _el$143),
                          _el$149 = createElement("Button", {
                            "class": "PlatformButton PlatformRoomAction"
                          }, _el$143);
                          createElement("Label", {
                            text: "#platform_join"
                          }, _el$149);
                        setProp(_el$149, "onactivate", () => {
                          if (item.locked) {
                            password = '';
                            setError('');
                            setJoinTarget(item);
                          } else mutate('/rooms/' + item.id + '/join');
                        });
                        effect(_p$ => {
                          const _v$33 = item.title || '#platform_room_title',
                            _v$34 = String(item.players?.length ?? Object.keys(item.members ?? {}).length) + '/' + item.capacity,
                            _v$35 = '#platform_state_' + item.state,
                            _v$36 = game()?.maps.find(choice => choice.id === item.map)?.name ?? '#platform_room_title',
                            _v$37 = item.players?.find(player => player.id === item.owner)?.name || '#platform_player',
                            _v$38 = !loading() && !room() && item.state === 'LOBBY' && (item.players?.length ?? Object.keys(item.members ?? {}).length) < item.capacity;
                          _v$33 !== _p$._v$33 && (_p$._v$33 = setProp(_el$144, "text", _v$33, _p$._v$33));
                          _v$34 !== _p$._v$34 && (_p$._v$34 = setProp(_el$145, "text", _v$34, _p$._v$34));
                          _v$35 !== _p$._v$35 && (_p$._v$35 = setProp(_el$146, "text", _v$35, _p$._v$35));
                          _v$36 !== _p$._v$36 && (_p$._v$36 = setProp(_el$147, "text", _v$36, _p$._v$36));
                          _v$37 !== _p$._v$37 && (_p$._v$37 = setProp(_el$148, "text", _v$37, _p$._v$37));
                          _v$38 !== _p$._v$38 && (_p$._v$38 = setProp(_el$149, "enabled", _v$38, _p$._v$38));
                          return _p$;
                        }, {
                          _v$33: undefined,
                          _v$34: undefined,
                          _v$35: undefined,
                          _v$36: undefined,
                          _v$37: undefined,
                          _v$38: undefined
                        });
                        return _el$143;
                      })()
                    }), null);
                    insert(_el$140, createComponent(Show, {
                      get when() {
                        return offset() > 0;
                      },
                      get children() {
                        return button('#platform_previous', () => {
                          setOffset(Math.max(0, offset() - pageSize));
                          void run(refresh);
                        });
                      }
                    }), null);
                    insert(_el$140, createComponent(Show, {
                      get when() {
                        return hasMore();
                      },
                      get children() {
                        return button('#platform_next', () => {
                          setOffset(offset() + pageSize);
                          void run(refresh);
                        });
                      }
                    }), null);
                    effect(_p$ => {
                      const _v$28 = region() ? 'PlatformButton PlatformRegionButton' : 'PlatformButton PlatformRegionButton PlatformRegionSelected',
                        _v$29 = !loading(),
                        _v$30 = !loading() && !room();
                      _v$28 !== _p$._v$28 && (_p$._v$28 = setProp(_el$120, "class", _v$28, _p$._v$28));
                      _v$29 !== _p$._v$29 && (_p$._v$29 = setProp(_el$123, "enabled", _v$29, _p$._v$29));
                      _v$30 !== _p$._v$30 && (_p$._v$30 = setProp(_el$125, "enabled", _v$30, _p$._v$30));
                      return _p$;
                    }, {
                      _v$28: undefined,
                      _v$29: undefined,
                      _v$30: undefined
                    });
                    return _el$114;
                  })();
                },
                get children() {
                  const _el$72 = createElement("Panel", {
                      "class": "PlatformRoomPage"
                    }, null),
                    _el$73 = createElement("Panel", {
                      "class": "PlatformRoomHeader"
                    }, _el$72),
                    _el$74 = createElement("Panel", {
                      "class": "PlatformRoomHeading"
                    }, _el$73);
                    createElement("Label", {
                      "class": "PlatformRoomGameTitle",
                      text: "#platform_c4_game_title"
                    }, _el$74);
                    const _el$76 = createElement("Panel", {
                      "class": "PlatformRoomIdentity"
                    }, _el$74),
                    _el$77 = createElement("Label", {
                      "class": "PlatformRoomTitle",
                      get text() {
                        return room()?.title || '#platform_room_title';
                      }
                    }, _el$76),
                    _el$78 = createElement("Label", {
                      "class": "PlatformRoomStatus",
                      get text() {
                        return '#platform_state_' + room()?.state;
                      }
                    }, _el$76),
                    _el$79 = createElement("Panel", {
                      "class": "PlatformRoomHeaderActions"
                    }, _el$73),
                    _el$82 = createElement("Button", {
                      "class": "PlatformButton PlatformRoomLeave"
                    }, _el$79);
                    createElement("Label", {
                      text: "#platform_leave"
                    }, _el$82);
                    const _el$84 = createElement("Panel", {
                      "class": "PlatformRoomSettings"
                    }, _el$72),
                    _el$85 = createElement("Panel", {
                      "class": "PlatformRoomSetting PlatformRoomModeSetting"
                    }, _el$84);
                    createElement("Label", {
                      "class": "PlatformSettingCaption",
                      text: "#platform_mode"
                    }, _el$85);
                    const _el$87 = createElement("Panel", {
                      "class": "PlatformRoomSetting PlatformRoomHostingSetting"
                    }, _el$84);
                    createElement("Label", {
                      "class": "PlatformSettingCaption",
                      text: "#platform_play_mode"
                    }, _el$87);
                    createElement("Label", {
                      "class": "PlatformSettingValue",
                      text: "#platform_hosting_dedicated"
                    }, _el$87);
                    const _el$90 = createElement("Panel", {
                      "class": "PlatformRoomSetting PlatformRoomAutoSetting"
                    }, _el$84);
                    createElement("Label", {
                      "class": "PlatformSettingCaption",
                      text: "#platform_auto_start"
                    }, _el$90);
                    const _el$92 = createElement("Button", {
                      get ["class"]() {
                        return memberCount() > 1 && room()?.autoStart ? 'PlatformAutoStartSwitch PlatformAutoStartEnabled' : 'PlatformAutoStartSwitch';
                      }
                    }, _el$90);
                    createElement("Panel", {
                      "class": "PlatformAutoStartKnob",
                      hittest: false
                    }, _el$92);
                    const _el$94 = createElement("Label", {
                      "class": "PlatformAutoStartHint",
                      text: "#platform_auto_start_summary"
                    }, _el$90),
                    _el$95 = createElement("Panel", {
                      "class": "PlatformRoomSetting PlatformRoomPasswordSetting"
                    }, _el$84);
                    createElement("Label", {
                      "class": "PlatformSettingCaption",
                      text: "#platform_password"
                    }, _el$95);
                    const _el$101 = createElement("Panel", {
                      "class": "PlatformRoomWorkspace"
                    }, _el$72),
                    _el$102 = createElement("Panel", {
                      "class": "PlatformRoomDetails"
                    }, _el$101),
                    _el$103 = createElement("Label", {
                      "class": "PlatformRoomMembersTitle",
                      text: "#platform_room_members",
                      get dialogVariables() {
                        return {
                          count: displayedMemberCount(),
                          total: room()?.capacity ?? 8
                        };
                      }
                    }, _el$102),
                    _el$104 = createElement("Panel", {
                      "class": "PlatformChat"
                    }, _el$101);
                    createElement("Label", {
                      "class": "PlatformChatTitle",
                      text: "#platform_room_chat"
                    }, _el$104);
                    const _el$106 = createElement("Panel", {
                      "class": "PlatformChatMessages"
                    }, _el$104),
                    _el$108 = createElement("Panel", {
                      "class": "PlatformRow PlatformChatComposer"
                    }, _el$104),
                    _el$109 = createElement("TextEntry", {
                      id: "PlatformRoomChatInput",
                      "class": "PlatformChatInput",
                      placeholder: "#platform_chat_placeholder",
                      acceptsfocus: true,
                      maxchars: 300
                    }, _el$108),
                    _el$110 = createElement("Button", {
                      "class": "PlatformButton PlatformChatSend"
                    }, _el$108);
                    createElement("Label", {
                      text: "#platform_send"
                    }, _el$110);
                    const _el$112 = createElement("Label", {
                      "class": "PlatformChatError",
                      get text() {
                        return chatError() ? '#platform_request_failed_code' : '';
                      },
                      get dialogVariables() {
                        return {
                          code: chatError()
                        };
                      }
                    }, _el$104);
                  insert(_el$79, createComponent(Show, {
                    get when() {
                      return room()?.state === 'LOBBY';
                    },
                    get fallback() {
                      return (() => {
                        const _el$151 = createElement("Button", {
                            "class": "PlatformButton PlatformRoomStart"
                          }, null),
                          _el$152 = createElement("Label", {
                            get text() {
                              return memo(() => !!room()?.canLaunch)() ? restoredMatchID() === room()?.id ? '#platform_reconnect_now' : '#platform_enter' : '#platform_state_' + room()?.state;
                            }
                          }, _el$151);
                        setProp(_el$151, "onactivate", () => {
                          void run(enterMatch);
                        });
                        effect(_p$ => {
                          const _v$39 = !loading() && !!room()?.canLaunch,
                            _v$40 = memo(() => !!room()?.canLaunch)() ? restoredMatchID() === room()?.id ? '#platform_reconnect_now' : '#platform_enter' : '#platform_state_' + room()?.state;
                          _v$39 !== _p$._v$39 && (_p$._v$39 = setProp(_el$151, "enabled", _v$39, _p$._v$39));
                          _v$40 !== _p$._v$40 && (_p$._v$40 = setProp(_el$152, "text", _v$40, _p$._v$40));
                          return _p$;
                        }, {
                          _v$39: undefined,
                          _v$40: undefined
                        });
                        return _el$151;
                      })();
                    },
                    get children() {
                      const _el$80 = createElement("Button", {
                          "class": "PlatformButton PlatformRoomStart"
                        }, null);
                        createElement("Label", {
                          text: "#platform_start"
                        }, _el$80);
                      setProp(_el$80, "onactivate", () => roomAction('start', {
                        launchMode: 'dedicated'
                      }));
                      effect(_$p => setProp(_el$80, "enabled", canEditRoom(), _$p));
                      return _el$80;
                    }
                  }), _el$82);
                  setProp(_el$82, "onactivate", () => roomAction('leave'));
                  insert(_el$85, createComponent(EOM_DropDown, {
                    menuClassName: "PlatformDropDownMenu",
                    className: "PlatformMode",
                    get index() {
                      return game()?.maps.findIndex(choice => choice.id === room()?.map);
                    },
                    get enable() {
                      return canEditRoom();
                    },
                    onChange: index => {
                      const choice = game()?.maps[index];
                      if (choice) roomAction('map', {
                        map: choice.id
                      });
                    },
                    get children() {
                      return createComponent(For, {
                        get each() {
                          return game()?.maps ?? [];
                        },
                        children: choice => (() => {
                          const _el$153 = createElement("Label", {
                            get text() {
                              return choice.name;
                            }
                          }, null);
                          effect(_$p => setProp(_el$153, "text", choice.name, _$p));
                          return _el$153;
                        })()
                      });
                    }
                  }), null);
                  setProp(_el$92, "tooltip_text", "#platform_auto_start_hint");
                  setProp(_el$92, "onactivate", () => roomAction('auto-start', {
                    autoStart: !room()?.autoStart
                  }));
                  setProp(_el$94, "tooltip_text", "#platform_auto_start_hint");
                  insert(_el$95, createComponent(Show, {
                    get when() {
                      return room()?.owner === userID();
                    },
                    get fallback() {
                      return (() => {
                        const _el$154 = createElement("Label", {
                          "class": "PlatformSettingValue",
                          get text() {
                            return room()?.locked ? '#platform_password_set' : '#platform_password_not_set';
                          }
                        }, null);
                        effect(_$p => setProp(_el$154, "text", room()?.locked ? '#platform_password_set' : '#platform_password_not_set', _$p));
                        return _el$154;
                      })();
                    },
                    get children() {
                      const _el$97 = createElement("Panel", {
                          "class": "PlatformRoomPasswordRow"
                        }, null),
                        _el$98 = createElement("TextEntry", {
                          id: "PlatformRoomPasswordInput",
                          "class": "PlatformRoomPasswordInput",
                          placeholder: "#platform_password_not_set",
                          get password() {
                            return !passwordVisible();
                          },
                          acceptsfocus: true
                        }, _el$97),
                        _el$99 = createElement("Button", {
                          "class": "PlatformPasswordVisibility"
                        }, _el$97),
                        _el$100 = createElement("Label", {
                          get text() {
                            return passwordVisible() ? '#platform_password_hide' : '#platform_password_show';
                          }
                        }, _el$99);
                      use(panel => {
                        roomPasswordInput = panel;
                        panel.SetDisableFocusOnMouseDown(false);
                        roomPasswordDraft = room()?.join_password ?? '';
                        panel.text = roomPasswordDraft;
                      }, _el$98);
                      setProp(_el$98, "ontextentrychange", panel => {
                        roomPasswordDraft = panel.text;
                        setPasswordDirty(panel.text !== (room()?.join_password ?? ''));
                      });
                      setProp(_el$98, "oninputsubmit", saveRoomPassword);
                      setProp(_el$98, "onblur", saveRoomPassword);
                      setProp(_el$99, "onactivate", () => setPasswordVisible(value => !value));
                      effect(_p$ => {
                        const _v$15 = !passwordVisible(),
                          _v$16 = canEditRoom(),
                          _v$17 = !loading(),
                          _v$18 = passwordVisible() ? '#platform_password_hide' : '#platform_password_show';
                        _v$15 !== _p$._v$15 && (_p$._v$15 = setProp(_el$98, "password", _v$15, _p$._v$15));
                        _v$16 !== _p$._v$16 && (_p$._v$16 = setProp(_el$98, "enabled", _v$16, _p$._v$16));
                        _v$17 !== _p$._v$17 && (_p$._v$17 = setProp(_el$99, "enabled", _v$17, _p$._v$17));
                        _v$18 !== _p$._v$18 && (_p$._v$18 = setProp(_el$100, "text", _v$18, _p$._v$18));
                        return _p$;
                      }, {
                        _v$15: undefined,
                        _v$16: undefined,
                        _v$17: undefined,
                        _v$18: undefined
                      });
                      return _el$97;
                    }
                  }), null);
                  insert(_el$102, createComponent(RoomSeats, {
                    get room() {
                      return room();
                    },
                    get selfID() {
                      return userID();
                    },
                    displayName: displayName
                  }), null);
                  use(panel => {
                    chatList = panel;
                  }, _el$106);
                  insert(_el$106, createComponent(Show, {
                    get when() {
                      return chats().length === 0;
                    },
                    get children() {
                      return createElement("Label", {
                        "class": "PlatformChatEmpty",
                        text: "#platform_chat_empty"
                      }, null);
                    }
                  }), null);
                  insert(_el$106, createComponent(For, {
                    get each() {
                      return chats();
                    },
                    children: chat => createComponent(ChatMessage, {
                      chat: chat,
                      get players() {
                        return room()?.players ?? [];
                      },
                      get selfID() {
                        return userID();
                      },
                      displayName: displayName
                    })
                  }), null);
                  use(panel => {
                    chatInput = panel;
                    panel.SetDisableFocusOnMouseDown(false);
                  }, _el$109);
                  setProp(_el$109, "ontextentrychange", panel => setMessage(panel.text));
                  setProp(_el$109, "oninputsubmit", panel => {
                    setMessage(panel.text);
                    sendMessage();
                  });
                  setProp(_el$110, "onactivate", () => {
                    void sendMessage();
                  });
                  effect(_p$ => {
                    const _v$19 = room()?.title || '#platform_room_title',
                      _v$20 = '#platform_state_' + room()?.state,
                      _v$21 = !loading(),
                      _v$22 = memberCount() > 1 && room()?.autoStart ? 'PlatformAutoStartSwitch PlatformAutoStartEnabled' : 'PlatformAutoStartSwitch',
                      _v$23 = canEditRoom() && memberCount() > 1,
                      _v$24 = {
                        count: displayedMemberCount(),
                        total: room()?.capacity ?? 8
                      },
                      _v$25 = !chatSending(),
                      _v$26 = chatError() ? '#platform_request_failed_code' : '',
                      _v$27 = {
                        code: chatError()
                      };
                    _v$19 !== _p$._v$19 && (_p$._v$19 = setProp(_el$77, "text", _v$19, _p$._v$19));
                    _v$20 !== _p$._v$20 && (_p$._v$20 = setProp(_el$78, "text", _v$20, _p$._v$20));
                    _v$21 !== _p$._v$21 && (_p$._v$21 = setProp(_el$82, "enabled", _v$21, _p$._v$21));
                    _v$22 !== _p$._v$22 && (_p$._v$22 = setProp(_el$92, "class", _v$22, _p$._v$22));
                    _v$23 !== _p$._v$23 && (_p$._v$23 = setProp(_el$92, "enabled", _v$23, _p$._v$23));
                    _v$24 !== _p$._v$24 && (_p$._v$24 = setProp(_el$103, "dialogVariables", _v$24, _p$._v$24));
                    _v$25 !== _p$._v$25 && (_p$._v$25 = setProp(_el$110, "enabled", _v$25, _p$._v$25));
                    _v$26 !== _p$._v$26 && (_p$._v$26 = setProp(_el$112, "text", _v$26, _p$._v$26));
                    _v$27 !== _p$._v$27 && (_p$._v$27 = setProp(_el$112, "dialogVariables", _v$27, _p$._v$27));
                    return _p$;
                  }, {
                    _v$19: undefined,
                    _v$20: undefined,
                    _v$21: undefined,
                    _v$22: undefined,
                    _v$23: undefined,
                    _v$24: undefined,
                    _v$25: undefined,
                    _v$26: undefined,
                    _v$27: undefined
                  });
                  return _el$72;
                }
              })];
            }
          }));
          return _el$68;
        })();
      },
      get children() {
        const _el$27 = createElement("Panel", {
            "class": "PlatformEntryChoices"
          }, null);
          createElement("Label", {
            "class": "PlatformEntryTitle",
            text: "#platform_entry_choose"
          }, _el$27);
          const _el$29 = createElement("Panel", {
            "class": "PlatformEntryButtons"
          }, _el$27),
          _el$30 = createElement("Button", {
            "class": "PlatformButton PlatformEntryButton"
          }, _el$29);
          createElement("Label", {
            text: "#platform_entry_china"
          }, _el$30);
          const _el$32 = createElement("Button", {
            "class": "PlatformButton PlatformEntryButton"
          }, _el$29);
          createElement("Label", {
            text: "#platform_entry_overseas"
          }, _el$32);
          const _el$34 = createElement("Button", {
            "class": "PlatformButton PlatformEntryButton PlatformEntryButtonLast"
          }, _el$29);
          createElement("Label", {
            text: "#platform_entry_overseas2"
          }, _el$34);
        setProp(_el$30, "onactivate", () => chooseEntry('china'));
        setProp(_el$32, "onactivate", () => chooseEntry('overseas'));
        setProp(_el$34, "onactivate", () => chooseEntry('overseas2'));
        insert(_el$27, createComponent(Show, {
          get when() {
            return entryConnecting();
          },
          get children() {
            return createElement("Label", {
              "class": "PlatformEntryStatus",
              text: "#platform_connecting"
            }, null);
          }
        }), null);
        return _el$27;
      }
    }), null);
    insert(_el$22, createComponent(Show, {
      get when() {
        return !entry && (error() || otherGame() || loading() || matching() || !connected());
      },
      get children() {
        const _el$37 = createElement("Panel", {
            get ["class"]() {
              return memo(() => !!error())() ? 'PlatformMatchPopover PlatformStatusError' : memo(() => !!otherGame())() ? 'PlatformMatchPopover PlatformStatusWarning' : loading() || !connected() ? 'PlatformMatchPopover PlatformStatusLoading' : 'PlatformMatchPopover';
            }
          }, null),
          _el$39 = createElement("Label", {
            "class": "PlatformMatchPopoverStatus",
            get text() {
              return error() || (otherGame() ? '#platform_other_game_room' : loading() || !connected() ? '#platform_loading' : '#platform_state_MATCHING');
            },
            get dialogVariables() {
              return {
                code: errorDetails()
              };
            }
          }, _el$37);
        insert(_el$37, createComponent(Show, {
          get when() {
            return memo(() => !!!error())() && !otherGame();
          },
          get fallback() {
            return createElement("Label", {
              "class": "PlatformStatusIcon",
              text: "!"
            }, null);
          },
          get children() {
            return createElement("Panel", {
              "class": "PlatformMatchSpinner"
            }, null);
          }
        }), _el$39);
        insert(_el$37, createComponent(Show, {
          get when() {
            return matching();
          },
          get children() {
            return [(() => {
              const _el$40 = createElement("Label", {
                "class": "PlatformMatchPopoverCount",
                get text() {
                  return String(room()?.players?.filter(player => player.role !== 'spectator' && player.role !== 'observer').length ?? Object.keys(room()?.members ?? {}).length) + '/' + (room()?.maxPlayers || room()?.capacity || 8);
                }
              }, null);
              effect(_$p => setProp(_el$40, "text", String(room()?.players?.filter(player => player.role !== 'spectator' && player.role !== 'observer').length ?? Object.keys(room()?.members ?? {}).length) + '/' + (room()?.maxPlayers || room()?.capacity || 8), _$p));
              return _el$40;
            })(), (() => {
              const _el$41 = createElement("Label", {
                "class": "PlatformMatchPopoverTime",
                get text() {
                  return matchTime();
                }
              }, null);
              effect(_$p => setProp(_el$41, "text", matchTime(), _$p));
              return _el$41;
            })()];
          }
        }), null);
        insert(_el$37, createComponent(Show, {
          get when() {
            return memo(() => !!error())() && (!connected() || communicationError());
          },
          get children() {
            const _el$42 = createElement("Button", {
                "class": "PlatformStatusRetry"
              }, null);
              createElement("Label", {
                text: "#platform_retry"
              }, _el$42);
            setProp(_el$42, "onactivate", () => {
              void run(initialize);
            });
            effect(_$p => setProp(_el$42, "enabled", !loading(), _$p));
            return _el$42;
          }
        }), null);
        insert(_el$37, createComponent(Show, {
          get when() {
            return error();
          },
          get children() {
            const _el$44 = createElement("Button", {
                "class": "PlatformStatusClose"
              }, null);
              createElement("Panel", {
                "class": "PlatformStatusCloseIcon",
                hittest: false
              }, _el$44);
            setProp(_el$44, "tooltip_text", "#platform_close_notification");
            setProp(_el$44, "onactivate", () => setError(''));
            return _el$44;
          }
        }), null);
        effect(_p$ => {
          const _v$8 = memo(() => !!error())() ? 'PlatformMatchPopover PlatformStatusError' : memo(() => !!otherGame())() ? 'PlatformMatchPopover PlatformStatusWarning' : loading() || !connected() ? 'PlatformMatchPopover PlatformStatusLoading' : 'PlatformMatchPopover',
            _v$9 = error() || (otherGame() ? '#platform_other_game_room' : loading() || !connected() ? '#platform_loading' : '#platform_state_MATCHING'),
            _v$0 = {
              code: errorDetails()
            };
          _v$8 !== _p$._v$8 && (_p$._v$8 = setProp(_el$37, "class", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = setProp(_el$39, "text", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = setProp(_el$39, "dialogVariables", _v$0, _p$._v$0));
          return _p$;
        }, {
          _v$8: undefined,
          _v$9: undefined,
          _v$0: undefined
        });
        return _el$37;
      }
    }), null);
    insert(_el$22, createComponent(Show, {
      get when() {
        return memo(() => reconnectPromptID() === room()?.id)() && reconnectable(room());
      },
      get children() {
        const _el$46 = createElement("Panel", {
            "class": "PlatformModalOverlay"
          }, null),
          _el$47 = createElement("Panel", {
            "class": "PlatformCreateDialog"
          }, _el$46);
          createElement("Label", {
            "class": "PlatformTitle",
            text: "#platform_reconnect_title"
          }, _el$47);
          createElement("Label", {
            "class": "PlatformReconnectDescription",
            text: "#platform_reconnect_description"
          }, _el$47);
          const _el$50 = createElement("Label", {
            get text() {
              return room()?.title || '#platform_room_title';
            }
          }, _el$47),
          _el$51 = createElement("Panel", {
            "class": "PlatformRow PlatformDialogActions"
          }, _el$47),
          _el$52 = createElement("Button", {
            "class": "PlatformButton PlatformReconnectLater"
          }, _el$51);
          createElement("Label", {
            text: "#platform_reconnect_later"
          }, _el$52);
          const _el$54 = createElement("Button", {
            "class": "PlatformButton PlatformPrimaryButton PlatformReconnectConfirm"
          }, _el$51);
          createElement("Label", {
            text: "#platform_reconnect_now"
          }, _el$54);
        setProp(_el$52, "onactivate", () => setReconnectPromptID(''));
        setProp(_el$54, "onactivate", () => {
          const roomID = room()?.id;
          void run(() => enterMatch(roomID));
        });
        effect(_p$ => {
          const _v$1 = room()?.title || '#platform_room_title',
            _v$10 = !loading(),
            _v$11 = !loading();
          _v$1 !== _p$._v$1 && (_p$._v$1 = setProp(_el$50, "text", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = setProp(_el$52, "enabled", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = setProp(_el$54, "enabled", _v$11, _p$._v$11));
          return _p$;
        }, {
          _v$1: undefined,
          _v$10: undefined,
          _v$11: undefined
        });
        return _el$46;
      }
    }), null);
    insert(_el$22, createComponent(Show, {
      get when() {
        return memo(() => !!(createOpen() && !room()))() && !otherGame();
      },
      get children() {
        const _el$56 = createElement("Panel", {
            "class": "PlatformModalOverlay"
          }, null),
          _el$57 = createElement("Panel", {
            "class": "PlatformCreateDialog"
          }, _el$56);
          createElement("Label", {
            "class": "PlatformTitle",
            text: "#platform_create"
          }, _el$57);
          createElement("Label", {
            text: "#platform_room_title"
          }, _el$57);
          const _el$60 = createElement("Label", {
            text: "#platform_mode"
          }, _el$57),
          _el$61 = createElement("Label", {
            text: "#platform_password"
          }, _el$57),
          _el$62 = createElement("Panel", {
            "class": "PlatformRow PlatformDialogActions"
          }, _el$57);
        insert(_el$57, createComponent(EOM_TextEntry, {
          get placeholder() {
            return defaultRoomName();
          },
          acceptsfocus: true,
          ref: panel => {
            panel.SetDisableFocusOnMouseDown(false);
          },
          onChange: (_, __, text) => {
            title = text;
          }
        }), _el$60);
        insert(_el$57, createComponent(EOM_DropDown, {
          menuClassName: "PlatformDropDownMenu",
          className: "PlatformMode",
          get index() {
            return game()?.maps.findIndex(choice => choice.id === map());
          },
          get enable() {
            return !loading();
          },
          onChange: index => {
            const choice = game()?.maps[index];
            if (choice) setMap(choice.id);
          },
          get children() {
            return createComponent(For, {
              get each() {
                return game()?.maps ?? [];
              },
              children: choice => (() => {
                const _el$156 = createElement("Label", {
                  get text() {
                    return choice.name;
                  }
                }, null);
                effect(_$p => setProp(_el$156, "text", choice.name, _$p));
                return _el$156;
              })()
            });
          }
        }), _el$61);
        insert(_el$57, createComponent(EOM_TextEntry, {
          placeholder: "#platform_password",
          acceptsfocus: true,
          ref: panel => panel.SetDisableFocusOnMouseDown(false),
          onChange: (_, __, text) => {
            password = text;
          }
        }), _el$62);
        insert(_el$62, () => button('#platform_cancel', () => setCreateOpen(false)), null);
        insert(_el$62, () => button('#platform_create', () => {
          void run(async () => {
            await request(base() + '/rooms', 'POST', createRoomPayload(map(), title.trim() || defaultRoomName(), password));
            setCreateOpen(false);
            await refresh();
          });
        }, true), null);
        return _el$56;
      }
    }), null);
    insert(_el$22, createComponent(Show, {
      get when() {
        return memo(() => !!(joinTarget() && !room()))() && !otherGame();
      },
      get children() {
        const _el$63 = createElement("Panel", {
            "class": "PlatformModalOverlay"
          }, null),
          _el$64 = createElement("Panel", {
            "class": "PlatformCreateDialog"
          }, _el$63);
          createElement("Label", {
            "class": "PlatformTitle",
            text: "#platform_join"
          }, _el$64);
          const _el$66 = createElement("Label", {
            get text() {
              return joinTarget()?.title || '#platform_room_title';
            }
          }, _el$64),
          _el$67 = createElement("Panel", {
            "class": "PlatformRow PlatformDialogActions"
          }, _el$64);
        insert(_el$64, createComponent(EOM_TextEntry, {
          placeholder: "#platform_password",
          acceptsfocus: true,
          ref: panel => {
            panel.SetDisableFocusOnMouseDown(false);
            $.Schedule(0, () => {
              if (panel.IsValid()) panel.SetFocus();
            });
          },
          onChange: (_, __, text) => {
            password = text;
          }
        }), _el$67);
        insert(_el$67, () => button('#platform_cancel', () => setJoinTarget(undefined)), null);
        insert(_el$67, () => button('#platform_join', () => {
          if (joinTarget()) mutate('/rooms/' + joinTarget().id + '/join', {
            password
          });
        }, true), null);
        effect(_$p => setProp(_el$66, "text", joinTarget()?.title || '#platform_room_title', _$p));
        return _el$63;
      }
    }), null);
    return _el$22;
  })();
}
render(() => createComponent(PlatformLobby, {}), $.GetContextPanel());