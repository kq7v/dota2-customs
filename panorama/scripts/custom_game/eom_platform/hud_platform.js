--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


(function () {
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
  function useContext(context) {
    let value;
    return Owner && Owner.context && (value = Owner.context[context.id]) !== undefined ? value : context.defaultValue;
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
        if (item == null || item === true || item === false) ; else if (Array.isArray(item)) {
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
      let paramsString = Object.entries(params)
          .map(v => `${v[0]}=${v[1]}`)
          .join('&');
      node.SetAttributeString('__CustomTooltipParams__', paramsString);
  }

  const hasOwn = Object.prototype.hasOwnProperty;
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
          const { id, snippet, vars, dialogVariables, text, style, visible, enabled, checked, attrs, type: _type, ..._props } = props;
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
              }
              else {
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
  if (anchor && anchor.IsValid()) parent.MoveChildBefore(node, anchor);
  else { const last = parent.GetChild(parent.GetChildCount()-1); if (last && last !== node) parent.MoveChildAfter(node,last); }
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
              setTooltipText(node, value);
          }
          else if (name === 'custom_tooltip') {
              setCustomTooltip(node, value);
          }
          else if (name === 'custom_tooltip_params') {
              setCustomTooltipParams(node, value);
          }
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
              else {
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

  function PlatformTextEntry(props) {
    const [local, rest] = splitProps(props, ['className', 'onChange', 'oninputsubmit', 'text', 'ref']);
    let previous = local.text ?? '';
    return (() => {
      const _el$ = createElement("TextEntry", mergeProps(rest, {
        get ["class"]() {
          return local.className;
        }
      }), null);
      use(panel => {
        panel.text = previous;
        panel.SetDisableFocusOnMouseDown(false);
        if (typeof local.ref === 'function') local.ref(panel);
      }, _el$);
      spread(_el$, mergeProps(rest, {
        get ["class"]() {
          return local.className;
        },
        "ontextentrychange": panel => {
          local.onChange?.(panel, previous, panel.text);
          previous = panel.text;
        },
        "oninputsubmit": panel => local.oninputsubmit?.(panel)
      }), false);
      return _el$;
    })();
  }
  function PlatformSelect(props) {
    let button;
    let overlay;
    let dispose;
    let positionTimer;
    const [open, setOpen] = createSignal(false);
    const close = () => setOpen(false);
    onMount(() => {
      overlay = $.CreatePanel('Panel', $.GetContextPanel(), '');
      overlay.AddClass('PlatformSelectOverlay');
      overlay.visible = false;
      dispose = render(() => (() => {
        const _el$2 = createElement("Button", {
            "class": "PlatformSelectBackdrop"
          }, null),
          _el$3 = createElement("Panel", {
            get ["class"]() {
              return 'PlatformSelectMenu ' + (props.menuClassName ?? '');
            }
          }, _el$2);
        setProp(_el$2, "onactivate", close);
        use(menu => {
          createEffect(() => {
            if (positionTimer !== undefined) $.CancelScheduled(positionTimer);
            if (!open()) return;
            menu.style.maxHeight = '500px';
            let attempts = 0;
            const positionMenu = () => {
              positionTimer = undefined;
              if (!open() || !menu.IsValid() || !overlay?.IsValid()) return;
              if (!overlay.actuallayoutwidth || !overlay.actuallayoutheight || !menu.actuallayoutheight) {
                if (++attempts < 5) positionTimer = $.Schedule(0.03, positionMenu);
                return;
              }
              const scaleX = menu.actualuiscale_x || 1,
                scaleY = menu.actualuiscale_y || 1;
              const origin = overlay.GetPositionWithinWindow(),
                position = button.GetPositionWithinWindow();
              const width = overlay.actuallayoutwidth / scaleX,
                height = overlay.actuallayoutheight / scaleY;
              const x = (position.x - origin.x) / scaleX,
                top = (position.y - origin.y) / scaleY;
              const bottom = top + button.actuallayoutheight / scaleY;
              const below = Math.max(0, height - bottom - 8),
                above = Math.max(0, top - 8);
              const menuHeight = Math.min(menu.actuallayoutheight / scaleY, 500);
              const upwards = menuHeight > below && above > below;
              const available = Math.min(500, upwards ? above : below);
              const menuWidth = Math.min(button.actuallayoutwidth / scaleX, Math.max(0, width - 16));
              menu.style.width = menuWidth + 'px';
              menu.style.maxHeight = available + 'px';
              menu.SetPositionInPixels(Math.max(8, Math.min(x, width - menuWidth - 8)), upwards ? top - Math.min(menuHeight, available) : bottom, 0);
            };
            positionTimer = $.Schedule(0, positionMenu);
          });
        }, _el$3);
        insert(_el$3, createComponent(For, {
          get each() {
            return props.options;
          },
          children: (option, index) => (() => {
            const _el$4 = createElement("Button", {
                "class": "PlatformSelectItem"
              }, null),
              _el$5 = createElement("Label", {
                get text() {
                  return option.name;
                }
              }, _el$4);
            setProp(_el$4, "onactivate", () => {
              if (props.enable !== false) props.onChange(index());
              close();
            });
            effect(_$p => setProp(_el$5, "text", option.name, _$p));
            return _el$4;
          })()
        }));
        effect(_$p => setProp(_el$3, "class", 'PlatformSelectMenu ' + (props.menuClassName ?? ''), _$p));
        return _el$2;
      })(), overlay);
    });
    createEffect(() => {
      if (props.enable === false) close();
      if (overlay?.IsValid()) overlay.visible = open();
    });
    onCleanup(() => {
      if (positionTimer !== undefined) $.CancelScheduled(positionTimer);
      if (overlay?.IsValid()) {
        dispose?.();
        overlay.DeleteAsync(0);
      }
    });
    return (() => {
      const _el$6 = createElement("Button", {
          get ["class"]() {
            return 'PlatformSelect ' + (props.className ?? '') + (props.enable === false ? ' Disable' : '');
          }
        }, null),
        _el$7 = createElement("Label", {
          get text() {
            return props.options[props.index ?? -1]?.name ?? '';
          }
        }, _el$6);
        createElement("Panel", {
          "class": "PlatformSelectArrow",
          hittest: false
        }, _el$6);
      const _ref$ = button;
      typeof _ref$ === "function" ? use(_ref$, _el$6) : button = _el$6;
      setProp(_el$6, "onactivate", () => setOpen(!open()));
      effect(_p$ => {
        const _v$ = 'PlatformSelect ' + (props.className ?? '') + (props.enable === false ? ' Disable' : ''),
          _v$2 = props.enable !== false,
          _v$3 = props.options[props.index ?? -1]?.name ?? '';
        _v$ !== _p$._v$ && (_p$._v$ = setProp(_el$6, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = setProp(_el$6, "enabled", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = setProp(_el$7, "text", _v$3, _p$._v$3));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined
      });
      return _el$6;
    })();
  }

  const errorTokens = {
    INVALID_REGION: '#platform_invalid_region',
    INVALID_ROOM: '#platform_invalid_room',
    INVALID_AUTO_START: '#platform_invalid_request',
    INVALID_CAPACITY: '#platform_invalid_request',
    INVALID_CHAT_CURSOR: '#platform_invalid_request',
    INVALID_HOST: '#platform_invalid_request',
    INVALID_JSON: '#platform_invalid_request',
    INVALID_LAUNCH_MODE: '#platform_invalid_request',
    INVALID_OFFSET: '#platform_invalid_request',
    INVALID_ROOM_FIELDS: '#platform_invalid_request',
    BODY_TOO_LARGE: '#platform_invalid_request',
    REQUEST_TOO_LARGE: '#platform_invalid_request',
    METHOD_NOT_ALLOWED: '#platform_invalid_request',
    INVALID_PASSWORD: '#platform_invalid_password',
    ROOM_PASSWORD_INVALID: '#platform_room_password_invalid',
    REQUEST_TIMEOUT: '#platform_request_timeout',
    TOOLS_BRIDGE_UNAVAILABLE: '#platform_tools_bridge_unavailable',
    INVALID_MESSAGE: '#platform_invalid_message',
    CONTENT_REJECTED: '#platform_content_rejected',
    CHAT_RATE_LIMITED: '#platform_chat_rate_limited',
    CHAT_MUTED: '#platform_chat_muted',
    CHAT_UNAVAILABLE: '#platform_chat_unavailable',
    RATE_LIMIT: '#platform_rate_limit',
    PASSWORD_COOLDOWN: '#platform_password_cooldown',
    ROOM_NOT_FOUND: '#platform_room_not_found',
    ROOM_ENDED: '#platform_room_ended',
    ROOM_REJECTED: '#platform_room_rejected',
    ACTIVE_GAME_ROOM: '#platform_active_game_room',
    ROOM_STATUS_UNKNOWN: '#platform_room_status_unknown',
    ROOM_RESULT_UNKNOWN: '#platform_room_result_unknown',
    SESSION_STATUS_UNKNOWN: '#platform_session_status_unknown',
    SESSION_EXPIRED: '#platform_session_expired',
    LOGIN_REQUIRED: '#platform_session_expired',
    CONTROLLER_UNAVAILABLE: '#platform_server_unavailable',
    CONTROLLER_UNCONFIGURED: '#platform_server_unavailable',
    CONTROLLER_UNKNOWN: '#platform_server_unavailable',
    BAD_CONNECTION: '#platform_server_unavailable',
    GAME_IDENTITY_UPGRADE: '#platform_server_unavailable',
    GAME_PREREGISTER_REQUIRED: '#platform_server_unavailable',
    GAME_PROFILE_MISMATCH: '#platform_server_unavailable',
    GAME_QUERY_UNAVAILABLE: '#platform_server_unavailable',
    GAME_SCHEMA_MISMATCH: '#platform_server_unavailable',
    INVENTORY_UNAVAILABLE: '#platform_service_unavailable',
    MACHINE_UNAUTHORIZED: '#platform_service_unavailable',
    GAME_NOT_FOUND: '#platform_game_not_found',
    MATCHING_DISABLED: '#platform_matching_unavailable',
    DEDICATED_HOST_UNAVAILABLE: '#platform_server_unavailable',
    LOCAL_HOST_UNAVAILABLE: '#platform_server_unavailable',
    INVALID_MAP: '#platform_map_not_available',
    MAP_NOT_AVAILABLE: '#platform_map_not_available',
    NOT_READY: '#platform_not_ready',
    BAD_TICKET: '#platform_invalid_ticket',
    TICKET_EXPIRED: '#platform_invalid_ticket',
    STEAM_REQUIRED: '#platform_steam_required',
    STEAM_ROSTER_MISMATCH: '#platform_steam_roster_mismatch',
    NO_SHOW_PENALTY: '#platform_no_show_penalty',
    PENALTY_UNAVAILABLE: '#platform_penalty_unavailable',
    PHONE_REQUIRED: '#platform_phone_required',
    REALNAME_REQUIRED: '#platform_realname_required',
    PARTY_BUSY: '#platform_party_busy',
    PARTY_MATCHING: '#platform_party_busy',
    PARTY_CONFLICT: '#platform_party_conflict',
    PARTY_FORBIDDEN: '#platform_party_forbidden',
    PARTY_FULL: '#platform_party_full',
    PARTY_OVER_LIMIT: '#platform_party_over_limit',
    PARTY_NOT_FOUND: '#platform_party_unavailable',
    PARTY_UNAVAILABLE: '#platform_party_unavailable'
  };
  function platformErrorToken(code) {
    return Object.prototype.hasOwnProperty.call(errorTokens, code) ? errorTokens[code] : '#platform_error';
  }
  function createRoomPayload(map, title, password, region = '') {
    const name = title.trim();
    if (!name || Array.from(name).length > 40) throw new Error('INVALID_ROOM');
    if (password && !/^[!-~]{4,20}$/.test(password)) throw new Error('INVALID_PASSWORD');
    return {
      map,
      title: name,
      password,
      autoStart: true,
      ...(region ? {
        region
      } : {})
    };
  }

  function localizedCatalogName(kind, choice) {
    if (!choice) return kind === 'map' ? '#platform_mode_unknown' : '#platform_region';
    const token = '#platform_' + kind + '_' + choice.id;
    const localized = $.Localize(token);
    return localized && localized !== token && localized !== token.slice(1) ? token : choice.name;
  }
  function roomStateToken(state) {
    switch (state) {
      case 'LOBBY':
        return '#platform_state_LOBBY';
      case 'MATCHING':
        return '#platform_state_MATCHING';
      case 'ALLOCATING':
        return '#platform_state_ALLOCATING';
      case 'WAITING':
        return '#platform_state_WAITING';
      case 'LOADING':
        return '#platform_state_LOADING';
      case 'RUNNING':
        return '#platform_state_RUNNING';
      case 'FINISHING':
        return '#platform_state_FINISHING';
      case 'RECLAIMING':
        return '#platform_state_RECLAIMING';
      case 'CLOSED':
        return '#platform_state_CLOSED';
      case 'EXPIRED':
        return '#platform_state_EXPIRED';
      case 'FAILED':
        return '#platform_state_FAILED';
      default:
        return '#platform_state_unknown';
    }
  }

  function entryConfig() {
    return GameUI.CustomUIConfig().EOMPlatformEntry ?? {
      schema: 2,
      mode: 'auto',
      routing: {},
      labels: {}
    };
  }
  function lobbyRoutes(config) {
    return Object.entries(config.routing ?? {}).filter(([, address]) => {
      if (typeof address !== 'string') return false;
      const match = /^([a-zA-Z0-9.-]+):(\d+)$/.exec(address);
      return !!match && Number(match[2]) >= 1 && Number(match[2]) <= 65535;
    }).map(([key, address]) => ({
      key,
      address,
      label: config.labels?.[key] ?? '#platform_region'
    }));
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
    return room.state !== 'LOBBY' || !!room.launchConfirmation || !!(room.maxPlayers || room.capacity) && (room.players ?? []).filter(player => player.role !== 'spectator' && player.role !== 'observer').length >= (room.maxPlayers || room.capacity || Infinity);
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
    const entry = (Game.GetMapInfo().map_display_name || '').replace(/^maps\//, '').replace(/\.vpk$/, '') === 'platform_entry';
    const configuredEntry = entryConfig();
    const configuredRoutes = lobbyRoutes(configuredEntry);
    const canUseEntry = () => Game.GetState() >= DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP;
    const [entryReady, setEntryReady] = createSignal(entry && canUseEntry());
    const entryStateListener = entry ? GameEvents.Subscribe('game_rules_state_change', () => setEntryReady(canUseEntry())) : undefined;
    const [regionConnecting, setRegionConnecting] = createSignal(false);
    const [regionFailure, setRegionFailure] = createSignal(false);
    let requestedRegion = '';
    let regionAcknowledged = false;
    const [currentRegion, setCurrentRegion] = createSignal('');
    const launcherLanguage = ['schinese', 'russian'].includes($.Language()) ? $.Language() : 'english';
    const launcherRegion = () => currentRegion() || configuredRoutes.find(route => route.key === configuredEntry.defaultRegion)?.key || configuredRoutes[0]?.key || 'lobby_address';
    const openLauncher = () => {
      $.DispatchEvent('ExternalBrowserGoToURL', launcherRegion() === 'lobby_address' ? 'https://vgbattle.eomgames.net/' : 'https://home.vgbattle.com/');
    };
    let connectionAcknowledged = false;
    let regionTimer;
    let languageTimer;
    let languageAcknowledged = false;
    const chooseRegion = region => {
      if (entry || regionConnecting() || region === currentRegion() || !configuredRoutes.some(route => route.key === region)) return;
      requestedRegion = region;
      regionAcknowledged = false;
      setRegionFailure(false);
      setRegionConnecting(true);
      $.Msg('[platform] Region switch requested: ', region);
      regionTimer = $.Schedule(2, () => {
        regionTimer = undefined;
        setRegionConnecting(false);
        if (!regionAcknowledged && currentRegion() !== requestedRegion) {
          setRegionFailure(true);
          $.Msg('[platform] Region switch not acknowledged: ', requestedRegion);
        }
      });
      GameEvents.SendEventClientSide('client_side_event', {
        event_name: 'platform_region_select',
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
    const mapName = choice => localizedCatalogName('map', choice);
    const regionName = choice => localizedCatalogName('region', choice);
    const mapOptions = () => game()?.maps.map(choice => ({
      ...choice,
      name: mapName(choice)
    })) ?? [];
    const [map, setMap] = createSignal('');
    const matchingEnabled = () => game()?.matchingEnabled !== false;
    const selectedMap = () => game()?.maps.find(choice => choice.id === map());
    const soloMap = () => selectedMap()?.maxPlayers === 1;
    const canQuickStart = () => soloMap() && selectedMap()?.minPlayers === 1;
    const [busy, setBusy] = createSignal(false);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal('');
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
        for (const id of Game.GetAllPlayerIDs()) {
          const info = Game.GetPlayerInfo(id);
          if (info?.player_name && memberAccountID({
            id: info.player_steamid
          }) === account) return info.player_name;
        }
      }
      return player.steamName || member?.steamName || player.name || $.Localize('#platform_player');
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
    const [createRegion, setCreateRegion] = createSignal('');
    const gameRegions = () => game()?.regions ?? [];
    const defaultRoomRegion = () => gameRegions().find(choice => choice.id === region())?.id ?? gameRegions()[0]?.id ?? '';
    const regionPayload = id => id ? {
      region: id
    } : {};
    const [searchRoomID, setSearchRoomID] = createSignal('');
    const [matchStarted, setMatchStarted] = createSignal(0);
    const [now, setNow] = createSignal(Date.now());
    const matching = () => !!room() && (isMatchingRoom(room()) || searchRoomID() === room()?.id) && !matchFound(room());
    const visibleRooms = () => rooms().filter(item => !region() || item.region?.id === region());
    const regions = () => game()?.regions ?? Array.from(new Map(rooms().filter(item => item.region).map(item => [item.region.id, item.region])).values());
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
    const base = () => '/games/' + (game()?.id || addon);
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
      if (!map()) setMap(config.maps.some(choice => choice.id === configuredEntry.defaultMap) ? configuredEntry.defaultMap : config.defaultMap);
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
          $.Msg('[platform] Action failed: status=', status ?? '', ' code=', code);
          setCommunicationError(background || code === 'REQUEST_TIMEOUT' || code === 'TOOLS_BRIDGE_UNAVAILABLE' || status === 0 || status === 503);
          setError(platformErrorToken(code));
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
      if (!game() || !connected() || loading() || room()) return;
      void run(async () => {
        if (!game() || !connected() || room()) return;
        if (soloMap()) {
          if (!canQuickStart()) return;
          try {
            const created = await request(base() + '/rooms', 'POST', {
              map: map(),
              title: defaultRoomName(),
              capacity: 1,
              quickStart: true,
              autoStart: false,
              ...regionPayload(defaultRoomRegion())
            });
            setRoom(created);
            await request(base() + '/rooms/' + created.id + '/start', 'POST', {
              launchMode: 'dedicated'
            });
          } catch (reason) {
            try {
              await refresh();
            } catch {}
            throw reason;
          }
          await refresh();
          return;
        }
        if (!matchingEnabled()) return;
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
          $.Msg('[platform] Chat failed: status=', status ?? '', ' code=', code);
          setChatError(platformErrorToken(code));
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
    const reportServerEndpoint = () => {
      const endpoint = GameUI.CustomUIConfig().EOMPlatformServer;
      if (!entry && endpoint) {
        const address = typeof endpoint.address === 'string' && Number.isInteger(endpoint.port) && endpoint.port > 0 && endpoint.port <= 65535 ? endpoint.address + ':' + endpoint.port : '';
        setCurrentRegion(configuredRoutes.find(route => route.address === address)?.key ?? '');
        GameEvents.SendEventClientSide('client_side_event', {
          event_name: 'platform_server_endpoint',
          event_data: JSON.stringify(endpoint)
        });
      }
    };
    const serverListener = GameEvents.Subscribe('server_spawn', event => {
      if (entry || (event.mapname || '').replace(/^maps\//, '').replace(/\.vpk$/, '') !== 'platform_lobby') return;
      GameUI.CustomUIConfig().EOMPlatformServer = {
        address: event.address,
        port: event.port
      };
      reportServerEndpoint();
    });
    const connectionListener = GameEvents.Subscribe('client_side_event', event => {
      if (event.event_name !== 'platform_connection_status') return;
      try {
        const status = JSON.parse(event.event_data);
        if (!entry && status.map === 'platform_lobby') {
          if (status.phase === 'submitted' && status.region === requestedRegion) {
            regionAcknowledged = true;
            setRegionFailure(false);
          }
          const confirmed = status.serverAddress ? configuredRoutes.find(route => route.address === status.serverAddress) : configuredRoutes.find(route => route.key === status.currentRegion);
          if (confirmed) setCurrentRegion(confirmed.key);else if (!GameUI.CustomUIConfig().EOMPlatformServer) setCurrentRegion('');
          connectionAcknowledged = true;
        }
        if (entry && status.language === $.Language()) {
          languageAcknowledged = true;
          if (languageTimer !== undefined) $.CancelScheduled(languageTimer);
          languageTimer = undefined;
        }
      } catch {/* Ignore incomplete local status events. */}
    });
    onMount(() => {
      if (entry) {
        setEntryReady(canUseEntry());
        const announceLanguage = () => {
          if (stopped || languageAcknowledged) return;
          GameEvents.SendEventClientSide('client_side_event', {
            event_name: 'platform_client_language',
            event_data: $.Language()
          });
          if (!languageAcknowledged) languageTimer = $.Schedule(0.25, announceLanguage);
        };
        announceLanguage();
        return;
      }
      const queryConnection = () => {
        if (stopped || connectionAcknowledged) return;
        reportServerEndpoint();
        GameEvents.SendEventClientSide('client_side_event', {
          event_name: 'platform_connection_query',
          event_data: ''
        });
        if (!connectionAcknowledged) languageTimer = $.Schedule(1.5, queryConnection);
      };
      queryConnection();
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
      GameEvents.Unsubscribe(connectionListener);
      GameEvents.Unsubscribe(serverListener);
      if (languageTimer !== undefined) $.CancelScheduled(languageTimer);
      if (regionTimer !== undefined) $.CancelScheduled(regionTimer);
      if (entryStateListener !== undefined) GameEvents.Unsubscribe(entryStateListener);
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
    const content = () => (() => {
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
        }, _el$22),
        _el$26 = createElement("Panel", {
          get ["class"]() {
            return !room() || matching() ? 'PlatformHeader PlatformBrowserHeader' : 'PlatformHeader';
          }
        }, _el$25);
      setProp(_el$23, "onactivate", self => {
        $.DispatchEvent("DOTAShowDashboard");
      });
      setProp(_el$23, "onmouseover", self => $.DispatchEvent('DOTAShowTextTooltip', self, $.Localize('#platform_main_menu')));
      setProp(_el$23, "onmouseout", self => $.DispatchEvent('DOTAHideTextTooltip', self));
      insert(_el$26, createComponent(Show, {
        get when() {
          return !room() || matching();
        },
        get children() {
          return createElement("Label", {
            "class": "PlatformTitle",
            text: "#platform_game_title"
          }, null);
        }
      }), null);
      insert(_el$26, createComponent(Show, {
        when: !entry,
        get children() {
          const _el$28 = createElement("Panel", {
              "class": "PlatformRegionToolbar"
            }, null),
            _el$29 = createElement("Label", {
              "class": "PlatformRegionCaption",
              get text() {
                return regionConnecting() ? '#platform_region_switching' : '#platform_region_switch';
              }
            }, _el$28);
          insert(_el$28, createComponent(For, {
            each: configuredRoutes,
            children: route => (() => {
              const _el$67 = createElement("Button", {
                  get ["class"]() {
                    return 'PlatformButton PlatformLobbyRegionButton' + (currentRegion() === route.key ? ' PlatformLobbyRegionSelected' : '');
                  }
                }, null),
                _el$68 = createElement("Label", {
                  get text() {
                    return route.label;
                  }
                }, _el$67);
              setProp(_el$67, "onactivate", () => chooseRegion(route.key));
              effect(_p$ => {
                const _v$11 = 'PlatformButton PlatformLobbyRegionButton' + (currentRegion() === route.key ? ' PlatformLobbyRegionSelected' : ''),
                  _v$12 = !regionConnecting() && currentRegion() !== route.key,
                  _v$13 = currentRegion() === route.key ? '#platform_current_region' : '',
                  _v$14 = route.label;
                _v$11 !== _p$._v$11 && (_p$._v$11 = setProp(_el$67, "class", _v$11, _p$._v$11));
                _v$12 !== _p$._v$12 && (_p$._v$12 = setProp(_el$67, "enabled", _v$12, _p$._v$12));
                _v$13 !== _p$._v$13 && (_p$._v$13 = setProp(_el$67, "tooltip_text", _v$13, _p$._v$13));
                _v$14 !== _p$._v$14 && (_p$._v$14 = setProp(_el$68, "text", _v$14, _p$._v$14));
                return _p$;
              }, {
                _v$11: undefined,
                _v$12: undefined,
                _v$13: undefined,
                _v$14: undefined
              });
              return _el$67;
            })()
          }), null);
          effect(_$p => setProp(_el$29, "text", regionConnecting() ? '#platform_region_switching' : '#platform_region_switch', _$p));
          return _el$28;
        }
      }), null);
      insert(_el$25, createComponent(Show, {
        get when() {
          return regionFailure();
        },
        get children() {
          return createElement("Label", {
            "class": "PlatformRegionFailure",
            text: "#platform_region_no_response"
          }, null);
        }
      }), null);
      insert(_el$25, createComponent(Show, {
        when: entry,
        get fallback() {
          return (() => {
            const _el$69 = createElement("Panel", {
              "class": "PlatformColumn PlatformBody"
            }, null);
            insert(_el$69, createComponent(Show, {
              get when() {
                return memo(() => !!connected())() && !otherGame();
              },
              get children() {
                return createComponent(Show, {
                  get when() {
                    return memo(() => !!room())() && !matching();
                  },
                  get fallback() {
                    return (() => {
                      const _el$111 = createElement("Panel", {
                          "class": "PlatformBrowserLayout"
                        }, null),
                        _el$112 = createElement("Panel", {
                          "class": "PlatformPromotionColumn"
                        }, _el$111),
                        _el$113 = createElement("Button", {
                          "class": "PlatformLauncherAd"
                        }, _el$112),
                        _el$114 = createElement("Panel", {
                          "class": 'PlatformLauncherImage PlatformLauncherImage_' + launcherLanguage,
                          hittest: false
                        }, _el$113),
                        _el$115 = createElement("Panel", {
                          "class": "PlatformColumn PlatformRoomBrowser"
                        }, _el$111),
                        _el$116 = createElement("Panel", {
                          "class": "PlatformBrowserHeading"
                        }, _el$115);
                        createElement("Label", {
                          "class": "PlatformSectionTitle",
                          text: "#platform_room_list"
                        }, _el$116);
                        const _el$118 = createElement("Label", {
                          "class": "PlatformBrowserCount",
                          get text() {
                            return String(visibleRooms().length);
                          }
                        }, _el$116),
                        _el$119 = createElement("Panel", {
                          "class": "PlatformBrowserToolbar"
                        }, _el$115);
                        createElement("Label", {
                          "class": "PlatformRegionLabel",
                          text: "#platform_region"
                        }, _el$119);
                        const _el$121 = createElement("Button", {
                          get ["class"]() {
                            return region() ? 'PlatformButton PlatformRegionButton' : 'PlatformButton PlatformRegionButton PlatformRegionSelected';
                          }
                        }, _el$119);
                        createElement("Label", {
                          text: "#platform_all_regions"
                        }, _el$121);
                        const _el$123 = createElement("Panel", {
                          "class": "PlatformToolbarSpacer"
                        }, _el$119),
                        _el$124 = createElement("Button", {
                          "class": "PlatformButton PlatformRefreshButton"
                        }, _el$119);
                        createElement("Label", {
                          text: "#platform_refresh"
                        }, _el$124);
                        const _el$126 = createElement("Panel", {
                          "class": "PlatformList"
                        }, _el$115),
                        _el$127 = createElement("Panel", {
                          "class": "PlatformRoomTableHeader"
                        }, _el$126);
                        createElement("Label", {
                          "class": "PlatformRoomName",
                          text: "#platform_room_title"
                        }, _el$127);
                        createElement("Label", {
                          "class": "PlatformRoomCount",
                          text: "#platform_players"
                        }, _el$127);
                        createElement("Label", {
                          "class": "PlatformRoomMode",
                          text: "#platform_mode"
                        }, _el$127);
                        createElement("Label", {
                          "class": "PlatformRoomAction",
                          text: "#platform_action"
                        }, _el$127);
                        const _el$132 = createElement("Panel", {
                          "class": "PlatformRoomTableBody"
                        }, _el$126),
                        _el$137 = createElement("Panel", {
                          "class": "PlatformRow"
                        }, _el$115),
                        _el$138 = createElement("Panel", {
                          "class": "PlatformBrowserFooter"
                        }, _el$115),
                        _el$139 = createElement("Panel", {
                          "class": "PlatformMatchToolbar"
                        }, _el$138),
                        _el$140 = createElement("Button", {
                          get ["class"]() {
                            return matching() ? 'PlatformButton PlatformMatchButton PlatformMatchingButton' : 'PlatformButton PlatformMatchButton';
                          }
                        }, _el$139),
                        _el$141 = createElement("Label", {
                          get text() {
                            return memo(() => !!matching())() ? '#platform_cancel_match' : memo(() => !!!game())() ? '#platform_loading' : soloMap() ? '#platform_quick_start' : '#platform_match';
                          }
                        }, _el$140),
                        _el$142 = createElement("Button", {
                          "class": "PlatformButton PlatformCreateButton"
                        }, _el$138);
                        createElement("Label", {
                          text: "#platform_create"
                        }, _el$142);
                      setProp(_el$113, "tooltip_text", "#platform_launcher_download");
                      setProp(_el$113, "onactivate", openLauncher);
                      setProp(_el$114, "class", 'PlatformLauncherImage PlatformLauncherImage_' + launcherLanguage);
                      setProp(_el$121, "onactivate", () => setRegion(''));
                      insert(_el$119, createComponent(For, {
                        get each() {
                          return regions();
                        },
                        children: item => (() => {
                          const _el$144 = createElement("Button", {
                              get ["class"]() {
                                return region() === item.id ? 'PlatformButton PlatformRegionButton PlatformRegionSelected' : 'PlatformButton PlatformRegionButton';
                              }
                            }, null),
                            _el$145 = createElement("Label", {
                              get text() {
                                return regionName(item);
                              }
                            }, _el$144);
                          setProp(_el$144, "onactivate", () => setRegion(item.id));
                          effect(_p$ => {
                            const _v$37 = region() === item.id ? 'PlatformButton PlatformRegionButton PlatformRegionSelected' : 'PlatformButton PlatformRegionButton',
                              _v$38 = regionName(item);
                            _v$37 !== _p$._v$37 && (_p$._v$37 = setProp(_el$144, "class", _v$37, _p$._v$37));
                            _v$38 !== _p$._v$38 && (_p$._v$38 = setProp(_el$145, "text", _v$38, _p$._v$38));
                            return _p$;
                          }, {
                            _v$37: undefined,
                            _v$38: undefined
                          });
                          return _el$144;
                        })()
                      }), _el$123);
                      insert(_el$119, createComponent(PlatformTextEntry, {
                        className: "PlatformRoomSearch",
                        placeholder: "#platform_search_rooms",
                        acceptsfocus: true,
                        ref: panel => panel.SetDisableFocusOnMouseDown(false),
                        onChange: (_, __, text) => setSearch(text),
                        oninputsubmit: () => {
                          setOffset(0);
                          void run(refresh);
                        }
                      }), _el$124);
                      setProp(_el$124, "onactivate", () => {
                        setOffset(0);
                        void run(connected() ? refresh : initialize);
                      });
                      insert(_el$132, createComponent(Show, {
                        get when() {
                          return visibleRooms().length === 0;
                        },
                        get children() {
                          const _el$133 = createElement("Panel", {
                              "class": "PlatformEmptyRooms"
                            }, null),
                            _el$134 = createElement("Panel", {
                              "class": "PlatformEmptyContent"
                            }, _el$133),
                            _el$135 = createElement("Label", {
                              "class": "PlatformEmptyTitle",
                              get text() {
                                return search() || region() ? "#platform_no_search_rooms" : "#platform_no_rooms_title";
                              }
                            }, _el$134),
                            _el$136 = createElement("Label", {
                              "class": "PlatformEmptyHint",
                              get text() {
                                return soloMap() ? '#platform_no_rooms_quick_hint' : '#platform_no_rooms_hint';
                              }
                            }, _el$134);
                          effect(_p$ => {
                            const _v$27 = search() || region() ? "#platform_no_search_rooms" : "#platform_no_rooms_title",
                              _v$28 = soloMap() ? '#platform_no_rooms_quick_hint' : '#platform_no_rooms_hint';
                            _v$27 !== _p$._v$27 && (_p$._v$27 = setProp(_el$135, "text", _v$27, _p$._v$27));
                            _v$28 !== _p$._v$28 && (_p$._v$28 = setProp(_el$136, "text", _v$28, _p$._v$28));
                            return _p$;
                          }, {
                            _v$27: undefined,
                            _v$28: undefined
                          });
                          return _el$133;
                        }
                      }), null);
                      insert(_el$132, createComponent(For, {
                        get each() {
                          return visibleRooms();
                        },
                        children: item => (() => {
                          const _el$146 = createElement("Panel", {
                              "class": "PlatformRoomTableRow"
                            }, null),
                            _el$147 = createElement("Panel", {
                              "class": "PlatformRoomInfo"
                            }, _el$146),
                            _el$148 = createElement("Label", {
                              "class": "PlatformRoomName",
                              get text() {
                                return item.title || '#platform_room_title';
                              }
                            }, _el$147),
                            _el$149 = createElement("Panel", {
                              "class": "PlatformRoomMetadata"
                            }, _el$147),
                            _el$150 = createElement("Label", {
                              get ["class"]() {
                                return item.state === 'LOBBY' ? 'PlatformRoomState PlatformRoomWaiting' : 'PlatformRoomState';
                              },
                              get text() {
                                return memo(() => item.state === 'LOBBY')() ? '#platform_member_waiting' : roomStateToken(item.state);
                              }
                            }, _el$149),
                            _el$151 = createElement("Label", {
                              "class": "PlatformRoomHost",
                              text: "#platform_browser_host",
                              get dialogVariables() {
                                return {
                                  host: displayName(item.players?.find(player => player.id === item.owner) ?? {})
                                };
                              }
                            }, _el$149),
                            _el$152 = createElement("Label", {
                              "class": "PlatformRoomCount",
                              get text() {
                                return String(item.players?.length ?? Object.keys(item.members ?? {}).length) + '/' + item.capacity;
                              }
                            }, _el$146),
                            _el$153 = createElement("Label", {
                              "class": "PlatformRoomMode",
                              get text() {
                                return mapName(game()?.maps.find(choice => choice.id === item.map));
                              }
                            }, _el$146),
                            _el$154 = createElement("Button", {
                              "class": "PlatformButton PlatformRoomAction"
                            }, _el$146);
                            createElement("Label", {
                              text: "#platform_join"
                            }, _el$154);
                          setProp(_el$154, "onactivate", () => {
                            if (item.locked) {
                              password = '';
                              setError('');
                              setJoinTarget(item);
                            } else mutate('/rooms/' + item.id + '/join');
                          });
                          effect(_p$ => {
                            const _v$39 = item.title || '#platform_room_title',
                              _v$40 = item.state === 'LOBBY' ? 'PlatformRoomState PlatformRoomWaiting' : 'PlatformRoomState',
                              _v$41 = memo(() => item.state === 'LOBBY')() ? '#platform_member_waiting' : roomStateToken(item.state),
                              _v$42 = {
                                host: displayName(item.players?.find(player => player.id === item.owner) ?? {})
                              },
                              _v$43 = String(item.players?.length ?? Object.keys(item.members ?? {}).length) + '/' + item.capacity,
                              _v$44 = mapName(game()?.maps.find(choice => choice.id === item.map)),
                              _v$45 = !loading() && !room() && item.state === 'LOBBY' && (item.players?.length ?? Object.keys(item.members ?? {}).length) < item.capacity;
                            _v$39 !== _p$._v$39 && (_p$._v$39 = setProp(_el$148, "text", _v$39, _p$._v$39));
                            _v$40 !== _p$._v$40 && (_p$._v$40 = setProp(_el$150, "class", _v$40, _p$._v$40));
                            _v$41 !== _p$._v$41 && (_p$._v$41 = setProp(_el$150, "text", _v$41, _p$._v$41));
                            _v$42 !== _p$._v$42 && (_p$._v$42 = setProp(_el$151, "dialogVariables", _v$42, _p$._v$42));
                            _v$43 !== _p$._v$43 && (_p$._v$43 = setProp(_el$152, "text", _v$43, _p$._v$43));
                            _v$44 !== _p$._v$44 && (_p$._v$44 = setProp(_el$153, "text", _v$44, _p$._v$44));
                            _v$45 !== _p$._v$45 && (_p$._v$45 = setProp(_el$154, "enabled", _v$45, _p$._v$45));
                            return _p$;
                          }, {
                            _v$39: undefined,
                            _v$40: undefined,
                            _v$41: undefined,
                            _v$42: undefined,
                            _v$43: undefined,
                            _v$44: undefined,
                            _v$45: undefined
                          });
                          return _el$146;
                        })()
                      }), null);
                      insert(_el$137, createComponent(Show, {
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
                      insert(_el$137, createComponent(Show, {
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
                      insert(_el$139, createComponent(PlatformSelect, {
                        menuClassName: "PlatformDropDownMenu",
                        className: "PlatformMode",
                        get index() {
                          return game()?.maps.findIndex(choice => choice.id === map());
                        },
                        get enable() {
                          return memo(() => !!!loading())() && !matching();
                        },
                        onChange: index => {
                          const choice = game()?.maps[index];
                          if (choice) setMap(choice.id);
                        },
                        get options() {
                          return mapOptions();
                        }
                      }), _el$140);
                      setProp(_el$140, "onactivate", () => matching() ? roomAction('leave') : startMatching());
                      setProp(_el$142, "onactivate", () => {
                        title = '';
                        password = '';
                        setCreateRegion(defaultRoomRegion());
                        setError('');
                        setCreateOpen(true);
                      });
                      effect(_p$ => {
                        const _v$29 = String(visibleRooms().length),
                          _v$30 = region() ? 'PlatformButton PlatformRegionButton' : 'PlatformButton PlatformRegionButton PlatformRegionSelected',
                          _v$31 = !loading(),
                          _v$32 = matching() ? 'PlatformButton PlatformMatchButton PlatformMatchingButton' : 'PlatformButton PlatformMatchButton',
                          _v$33 = !!game() && connected() && !loading() && (matching() || (soloMap() ? canQuickStart() : matchingEnabled())),
                          _v$34 = !game() || matching() ? '' : soloMap() ? canQuickStart() ? '' : '#platform_quick_start_unavailable' : matchingEnabled() ? '' : '#platform_matching_unavailable',
                          _v$35 = memo(() => !!matching())() ? '#platform_cancel_match' : memo(() => !!!game())() ? '#platform_loading' : soloMap() ? '#platform_quick_start' : '#platform_match',
                          _v$36 = !loading() && !room();
                        _v$29 !== _p$._v$29 && (_p$._v$29 = setProp(_el$118, "text", _v$29, _p$._v$29));
                        _v$30 !== _p$._v$30 && (_p$._v$30 = setProp(_el$121, "class", _v$30, _p$._v$30));
                        _v$31 !== _p$._v$31 && (_p$._v$31 = setProp(_el$124, "enabled", _v$31, _p$._v$31));
                        _v$32 !== _p$._v$32 && (_p$._v$32 = setProp(_el$140, "class", _v$32, _p$._v$32));
                        _v$33 !== _p$._v$33 && (_p$._v$33 = setProp(_el$140, "enabled", _v$33, _p$._v$33));
                        _v$34 !== _p$._v$34 && (_p$._v$34 = setProp(_el$140, "tooltip_text", _v$34, _p$._v$34));
                        _v$35 !== _p$._v$35 && (_p$._v$35 = setProp(_el$141, "text", _v$35, _p$._v$35));
                        _v$36 !== _p$._v$36 && (_p$._v$36 = setProp(_el$142, "enabled", _v$36, _p$._v$36));
                        return _p$;
                      }, {
                        _v$29: undefined,
                        _v$30: undefined,
                        _v$31: undefined,
                        _v$32: undefined,
                        _v$33: undefined,
                        _v$34: undefined,
                        _v$35: undefined,
                        _v$36: undefined
                      });
                      return _el$111;
                    })();
                  },
                  get children() {
                    const _el$70 = createElement("Panel", {
                        "class": "PlatformRoomPage"
                      }, null),
                      _el$71 = createElement("Panel", {
                        "class": "PlatformRoomHeader"
                      }, _el$70),
                      _el$72 = createElement("Panel", {
                        "class": "PlatformRoomHeading"
                      }, _el$71);
                      createElement("Label", {
                        "class": "PlatformRoomGameTitle",
                        text: "#platform_game_title"
                      }, _el$72);
                      const _el$74 = createElement("Panel", {
                        "class": "PlatformRoomIdentity"
                      }, _el$72),
                      _el$75 = createElement("Label", {
                        "class": "PlatformRoomTitle",
                        get text() {
                          return room()?.title || '#platform_room_title';
                        }
                      }, _el$74),
                      _el$76 = createElement("Label", {
                        "class": "PlatformRoomStatus",
                        get text() {
                          return roomStateToken(room()?.state);
                        }
                      }, _el$74),
                      _el$77 = createElement("Panel", {
                        "class": "PlatformRoomHeaderActions"
                      }, _el$71),
                      _el$80 = createElement("Button", {
                        "class": "PlatformButton PlatformRoomLeave"
                      }, _el$77);
                      createElement("Label", {
                        text: "#platform_leave"
                      }, _el$80);
                      const _el$82 = createElement("Panel", {
                        "class": "PlatformRoomSettings"
                      }, _el$70),
                      _el$83 = createElement("Panel", {
                        "class": "PlatformRoomSetting PlatformRoomModeSetting"
                      }, _el$82);
                      createElement("Label", {
                        "class": "PlatformSettingCaption",
                        text: "#platform_mode"
                      }, _el$83);
                      const _el$85 = createElement("Panel", {
                        "class": "PlatformRoomSetting PlatformRoomHostingSetting"
                      }, _el$82);
                      createElement("Label", {
                        "class": "PlatformSettingCaption",
                        text: "#platform_play_mode"
                      }, _el$85);
                      createElement("Label", {
                        "class": "PlatformSettingValue",
                        text: "#platform_hosting_dedicated"
                      }, _el$85);
                      const _el$88 = createElement("Panel", {
                        "class": "PlatformRoomSetting PlatformRoomAutoSetting"
                      }, _el$82);
                      createElement("Label", {
                        "class": "PlatformSettingCaption",
                        text: "#platform_auto_start"
                      }, _el$88);
                      const _el$90 = createElement("Button", {
                        get ["class"]() {
                          return memberCount() > 1 && room()?.autoStart ? 'PlatformAutoStartSwitch PlatformAutoStartEnabled' : 'PlatformAutoStartSwitch';
                        }
                      }, _el$88);
                      createElement("Panel", {
                        "class": "PlatformAutoStartKnob",
                        hittest: false
                      }, _el$90);
                      const _el$92 = createElement("Label", {
                        "class": "PlatformAutoStartHint",
                        text: "#platform_auto_start_summary"
                      }, _el$88),
                      _el$93 = createElement("Panel", {
                        "class": "PlatformRoomSetting PlatformRoomPasswordSetting"
                      }, _el$82);
                      createElement("Label", {
                        "class": "PlatformSettingCaption",
                        text: "#platform_password"
                      }, _el$93);
                      const _el$99 = createElement("Panel", {
                        "class": "PlatformRoomWorkspace"
                      }, _el$70),
                      _el$100 = createElement("Panel", {
                        "class": "PlatformRoomDetails"
                      }, _el$99),
                      _el$101 = createElement("Label", {
                        "class": "PlatformRoomMembersTitle",
                        text: "#platform_room_members",
                        get dialogVariables() {
                          return {
                            count: displayedMemberCount(),
                            total: room()?.capacity ?? room()?.maxPlayers ?? displayedMemberCount()
                          };
                        }
                      }, _el$100),
                      _el$102 = createElement("Panel", {
                        "class": "PlatformChat"
                      }, _el$99);
                      createElement("Label", {
                        "class": "PlatformChatTitle",
                        text: "#platform_room_chat"
                      }, _el$102);
                      const _el$104 = createElement("Panel", {
                        "class": "PlatformChatMessages"
                      }, _el$102),
                      _el$106 = createElement("Panel", {
                        "class": "PlatformRow PlatformChatComposer"
                      }, _el$102),
                      _el$107 = createElement("TextEntry", {
                        id: "PlatformRoomChatInput",
                        "class": "PlatformChatInput",
                        placeholder: "#platform_chat_placeholder",
                        acceptsfocus: true,
                        maxchars: 300
                      }, _el$106),
                      _el$108 = createElement("Button", {
                        "class": "PlatformButton PlatformChatSend"
                      }, _el$106);
                      createElement("Label", {
                        text: "#platform_send"
                      }, _el$108);
                      const _el$110 = createElement("Label", {
                        "class": "PlatformChatError",
                        get text() {
                          return chatError();
                        }
                      }, _el$102);
                    insert(_el$77, createComponent(Show, {
                      get when() {
                        return room()?.state === 'LOBBY';
                      },
                      get fallback() {
                        return (() => {
                          const _el$156 = createElement("Button", {
                              "class": "PlatformButton PlatformRoomStart"
                            }, null),
                            _el$157 = createElement("Label", {
                              get text() {
                                return memo(() => !!room()?.canLaunch)() ? restoredMatchID() === room()?.id ? '#platform_reconnect_now' : '#platform_enter' : roomStateToken(room()?.state);
                              }
                            }, _el$156);
                          setProp(_el$156, "onactivate", () => {
                            void run(enterMatch);
                          });
                          effect(_p$ => {
                            const _v$46 = !loading() && !!room()?.canLaunch,
                              _v$47 = memo(() => !!room()?.canLaunch)() ? restoredMatchID() === room()?.id ? '#platform_reconnect_now' : '#platform_enter' : roomStateToken(room()?.state);
                            _v$46 !== _p$._v$46 && (_p$._v$46 = setProp(_el$156, "enabled", _v$46, _p$._v$46));
                            _v$47 !== _p$._v$47 && (_p$._v$47 = setProp(_el$157, "text", _v$47, _p$._v$47));
                            return _p$;
                          }, {
                            _v$46: undefined,
                            _v$47: undefined
                          });
                          return _el$156;
                        })();
                      },
                      get children() {
                        const _el$78 = createElement("Button", {
                            "class": "PlatformButton PlatformRoomStart"
                          }, null);
                          createElement("Label", {
                            text: "#platform_start"
                          }, _el$78);
                        setProp(_el$78, "onactivate", () => roomAction('start', {
                          launchMode: 'dedicated'
                        }));
                        effect(_$p => setProp(_el$78, "enabled", canEditRoom(), _$p));
                        return _el$78;
                      }
                    }), _el$80);
                    setProp(_el$80, "onactivate", () => roomAction('leave'));
                    insert(_el$83, createComponent(PlatformSelect, {
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
                      get options() {
                        return mapOptions();
                      }
                    }), null);
                    setProp(_el$90, "tooltip_text", "#platform_auto_start_hint");
                    setProp(_el$90, "onactivate", () => roomAction('auto-start', {
                      autoStart: !room()?.autoStart
                    }));
                    setProp(_el$92, "tooltip_text", "#platform_auto_start_hint");
                    insert(_el$93, createComponent(Show, {
                      get when() {
                        return room()?.owner === userID();
                      },
                      get fallback() {
                        return (() => {
                          const _el$158 = createElement("Label", {
                            "class": "PlatformSettingValue",
                            get text() {
                              return room()?.locked ? '#platform_password_set' : '#platform_password_not_set';
                            }
                          }, null);
                          effect(_$p => setProp(_el$158, "text", room()?.locked ? '#platform_password_set' : '#platform_password_not_set', _$p));
                          return _el$158;
                        })();
                      },
                      get children() {
                        const _el$95 = createElement("Panel", {
                            "class": "PlatformRoomPasswordRow"
                          }, null),
                          _el$96 = createElement("TextEntry", {
                            id: "PlatformRoomPasswordInput",
                            "class": "PlatformRoomPasswordInput",
                            placeholder: "#platform_password_not_set",
                            get textmode() {
                              return passwordVisible() ? 'normal' : 'password';
                            },
                            acceptsfocus: true
                          }, _el$95),
                          _el$97 = createElement("Button", {
                            "class": "PlatformPasswordVisibility"
                          }, _el$95),
                          _el$98 = createElement("Label", {
                            get text() {
                              return passwordVisible() ? '#platform_password_hide' : '#platform_password_show';
                            }
                          }, _el$97);
                        use(panel => {
                          roomPasswordInput = panel;
                          panel.SetDisableFocusOnMouseDown(false);
                          roomPasswordDraft = room()?.join_password ?? '';
                          panel.text = roomPasswordDraft;
                        }, _el$96);
                        setProp(_el$96, "ontextentrychange", panel => {
                          roomPasswordDraft = panel.text;
                          setPasswordDirty(panel.text !== (room()?.join_password ?? ''));
                        });
                        setProp(_el$96, "oninputsubmit", saveRoomPassword);
                        setProp(_el$96, "onblur", saveRoomPassword);
                        setProp(_el$97, "onactivate", () => setPasswordVisible(value => !value));
                        effect(_p$ => {
                          const _v$15 = passwordVisible() ? 'normal' : 'password',
                            _v$16 = canEditRoom(),
                            _v$17 = !loading(),
                            _v$18 = passwordVisible() ? '#platform_password_hide' : '#platform_password_show';
                          _v$15 !== _p$._v$15 && (_p$._v$15 = setProp(_el$96, "textmode", _v$15, _p$._v$15));
                          _v$16 !== _p$._v$16 && (_p$._v$16 = setProp(_el$96, "enabled", _v$16, _p$._v$16));
                          _v$17 !== _p$._v$17 && (_p$._v$17 = setProp(_el$97, "enabled", _v$17, _p$._v$17));
                          _v$18 !== _p$._v$18 && (_p$._v$18 = setProp(_el$98, "text", _v$18, _p$._v$18));
                          return _p$;
                        }, {
                          _v$15: undefined,
                          _v$16: undefined,
                          _v$17: undefined,
                          _v$18: undefined
                        });
                        return _el$95;
                      }
                    }), null);
                    insert(_el$100, createComponent(RoomSeats, {
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
                    }, _el$104);
                    insert(_el$104, createComponent(Show, {
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
                    insert(_el$104, createComponent(For, {
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
                    }, _el$107);
                    setProp(_el$107, "ontextentrychange", panel => setMessage(panel.text));
                    setProp(_el$107, "oninputsubmit", panel => {
                      setMessage(panel.text);
                      sendMessage();
                    });
                    setProp(_el$108, "onactivate", () => {
                      void sendMessage();
                    });
                    effect(_p$ => {
                      const _v$19 = room()?.title || '#platform_room_title',
                        _v$20 = roomStateToken(room()?.state),
                        _v$21 = !loading(),
                        _v$22 = memberCount() > 1 && room()?.autoStart ? 'PlatformAutoStartSwitch PlatformAutoStartEnabled' : 'PlatformAutoStartSwitch',
                        _v$23 = canEditRoom() && memberCount() > 1,
                        _v$24 = {
                          count: displayedMemberCount(),
                          total: room()?.capacity ?? room()?.maxPlayers ?? displayedMemberCount()
                        },
                        _v$25 = !chatSending(),
                        _v$26 = chatError();
                      _v$19 !== _p$._v$19 && (_p$._v$19 = setProp(_el$75, "text", _v$19, _p$._v$19));
                      _v$20 !== _p$._v$20 && (_p$._v$20 = setProp(_el$76, "text", _v$20, _p$._v$20));
                      _v$21 !== _p$._v$21 && (_p$._v$21 = setProp(_el$80, "enabled", _v$21, _p$._v$21));
                      _v$22 !== _p$._v$22 && (_p$._v$22 = setProp(_el$90, "class", _v$22, _p$._v$22));
                      _v$23 !== _p$._v$23 && (_p$._v$23 = setProp(_el$90, "enabled", _v$23, _p$._v$23));
                      _v$24 !== _p$._v$24 && (_p$._v$24 = setProp(_el$101, "dialogVariables", _v$24, _p$._v$24));
                      _v$25 !== _p$._v$25 && (_p$._v$25 = setProp(_el$108, "enabled", _v$25, _p$._v$25));
                      _v$26 !== _p$._v$26 && (_p$._v$26 = setProp(_el$110, "text", _v$26, _p$._v$26));
                      return _p$;
                    }, {
                      _v$19: undefined,
                      _v$20: undefined,
                      _v$21: undefined,
                      _v$22: undefined,
                      _v$23: undefined,
                      _v$24: undefined,
                      _v$25: undefined,
                      _v$26: undefined
                    });
                    return _el$70;
                  }
                });
              }
            }));
            return _el$69;
          })();
        },
        get children() {
          const _el$31 = createElement("Panel", {
              "class": "PlatformEntryChoices"
            }, null);
            createElement("Label", {
              "class": "PlatformEntryTitle",
              text: "#platform_entry_auto"
            }, _el$31);
            const _el$33 = createElement("Button", {
              "class": "PlatformButton"
            }, _el$31);
            createElement("Label", {
              text: "#platform_entry_retry"
            }, _el$33);
          setProp(_el$33, "onactivate", () => {
            if (canUseEntry()) GameEvents.SendEventClientSide('client_side_event', {
              event_name: 'platform_entry_retry',
              event_data: ''
            });
          });
          return _el$31;
        }
      }), null);
      insert(_el$22, createComponent(Show, {
        get when() {
          return !entry && (error() || otherGame() || loading() || matching() || !connected());
        },
        get children() {
          const _el$35 = createElement("Panel", {
              get ["class"]() {
                return memo(() => !!error())() ? 'PlatformMatchPopover PlatformStatusError' : memo(() => !!otherGame())() ? 'PlatformMatchPopover PlatformStatusWarning' : loading() || !connected() ? 'PlatformMatchPopover PlatformStatusLoading' : 'PlatformMatchPopover';
              }
            }, null),
            _el$37 = createElement("Label", {
              "class": "PlatformMatchPopoverStatus",
              get text() {
                return error() || (otherGame() ? '#platform_other_game_room' : loading() || !connected() ? '#platform_loading' : '#platform_state_MATCHING');
              }
            }, _el$35);
          insert(_el$35, createComponent(Show, {
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
          }), _el$37);
          insert(_el$35, createComponent(Show, {
            get when() {
              return matching();
            },
            get children() {
              return [(() => {
                const _el$38 = createElement("Label", {
                  "class": "PlatformMatchPopoverCount",
                  get text() {
                    return String(room()?.players?.filter(player => player.role !== 'spectator' && player.role !== 'observer').length ?? Object.keys(room()?.members ?? {}).length) + '/' + (room()?.maxPlayers || room()?.capacity || 0);
                  }
                }, null);
                effect(_$p => setProp(_el$38, "text", String(room()?.players?.filter(player => player.role !== 'spectator' && player.role !== 'observer').length ?? Object.keys(room()?.members ?? {}).length) + '/' + (room()?.maxPlayers || room()?.capacity || 0), _$p));
                return _el$38;
              })(), (() => {
                const _el$39 = createElement("Label", {
                  "class": "PlatformMatchPopoverTime",
                  get text() {
                    return matchTime();
                  }
                }, null);
                effect(_$p => setProp(_el$39, "text", matchTime(), _$p));
                return _el$39;
              })()];
            }
          }), null);
          insert(_el$35, createComponent(Show, {
            get when() {
              return memo(() => !!error())() && (!connected() || communicationError());
            },
            get children() {
              const _el$40 = createElement("Button", {
                  "class": "PlatformStatusRetry"
                }, null);
                createElement("Label", {
                  text: "#platform_retry"
                }, _el$40);
              setProp(_el$40, "onactivate", () => {
                void run(initialize);
              });
              effect(_$p => setProp(_el$40, "enabled", !loading(), _$p));
              return _el$40;
            }
          }), null);
          insert(_el$35, createComponent(Show, {
            get when() {
              return error();
            },
            get children() {
              const _el$42 = createElement("Button", {
                  "class": "PlatformStatusClose"
                }, null);
                createElement("Panel", {
                  "class": "PlatformStatusCloseIcon",
                  hittest: false
                }, _el$42);
              setProp(_el$42, "tooltip_text", "#platform_close_notification");
              setProp(_el$42, "onactivate", () => setError(''));
              return _el$42;
            }
          }), null);
          effect(_p$ => {
            const _v$8 = memo(() => !!error())() ? 'PlatformMatchPopover PlatformStatusError' : memo(() => !!otherGame())() ? 'PlatformMatchPopover PlatformStatusWarning' : loading() || !connected() ? 'PlatformMatchPopover PlatformStatusLoading' : 'PlatformMatchPopover',
              _v$9 = error() || (otherGame() ? '#platform_other_game_room' : loading() || !connected() ? '#platform_loading' : '#platform_state_MATCHING');
            _v$8 !== _p$._v$8 && (_p$._v$8 = setProp(_el$35, "class", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = setProp(_el$37, "text", _v$9, _p$._v$9));
            return _p$;
          }, {
            _v$8: undefined,
            _v$9: undefined
          });
          return _el$35;
        }
      }), null);
      insert(_el$22, createComponent(Show, {
        get when() {
          return memo(() => reconnectPromptID() === room()?.id)() && reconnectable(room());
        },
        get children() {
          const _el$44 = createElement("Panel", {
              "class": "PlatformModalOverlay"
            }, null),
            _el$45 = createElement("Panel", {
              "class": "PlatformCreateDialog"
            }, _el$44);
            createElement("Label", {
              "class": "PlatformTitle",
              text: "#platform_reconnect_title"
            }, _el$45);
            createElement("Label", {
              "class": "PlatformReconnectDescription",
              text: "#platform_reconnect_description"
            }, _el$45);
            const _el$48 = createElement("Label", {
              get text() {
                return room()?.title || '#platform_room_title';
              }
            }, _el$45),
            _el$49 = createElement("Panel", {
              "class": "PlatformRow PlatformDialogActions"
            }, _el$45),
            _el$50 = createElement("Button", {
              "class": "PlatformButton PlatformReconnectLater"
            }, _el$49);
            createElement("Label", {
              text: "#platform_reconnect_later"
            }, _el$50);
            const _el$52 = createElement("Button", {
              "class": "PlatformButton PlatformPrimaryButton PlatformReconnectConfirm"
            }, _el$49);
            createElement("Label", {
              text: "#platform_reconnect_now"
            }, _el$52);
          setProp(_el$50, "onactivate", () => setReconnectPromptID(''));
          setProp(_el$52, "onactivate", () => {
            const roomID = room()?.id;
            void run(() => enterMatch(roomID));
          });
          effect(_p$ => {
            const _v$0 = room()?.title || '#platform_room_title',
              _v$1 = !loading(),
              _v$10 = !loading();
            _v$0 !== _p$._v$0 && (_p$._v$0 = setProp(_el$48, "text", _v$0, _p$._v$0));
            _v$1 !== _p$._v$1 && (_p$._v$1 = setProp(_el$50, "enabled", _v$1, _p$._v$1));
            _v$10 !== _p$._v$10 && (_p$._v$10 = setProp(_el$52, "enabled", _v$10, _p$._v$10));
            return _p$;
          }, {
            _v$0: undefined,
            _v$1: undefined,
            _v$10: undefined
          });
          return _el$44;
        }
      }), null);
      insert(_el$22, createComponent(Show, {
        get when() {
          return memo(() => !!(createOpen() && !room()))() && !otherGame();
        },
        get children() {
          const _el$54 = createElement("Panel", {
              "class": "PlatformModalOverlay"
            }, null),
            _el$55 = createElement("Panel", {
              "class": "PlatformCreateDialog"
            }, _el$54);
            createElement("Label", {
              "class": "PlatformTitle",
              text: "#platform_create"
            }, _el$55);
            createElement("Label", {
              text: "#platform_room_title"
            }, _el$55);
            const _el$58 = createElement("Label", {
              text: "#platform_mode"
            }, _el$55),
            _el$60 = createElement("Label", {
              text: "#platform_password"
            }, _el$55),
            _el$61 = createElement("Panel", {
              "class": "PlatformRow PlatformDialogActions"
            }, _el$55);
          insert(_el$55, createComponent(PlatformTextEntry, {
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
          }), _el$58);
          insert(_el$55, createComponent(PlatformSelect, {
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
            get options() {
              return mapOptions();
            }
          }), _el$60);
          insert(_el$55, createComponent(Show, {
            get when() {
              return gameRegions().length > 0;
            },
            get children() {
              return [createElement("Label", {
                text: "#platform_region"
              }, null), createComponent(PlatformSelect, {
                menuClassName: "PlatformDropDownMenu",
                className: "PlatformMode PlatformCreateRegion",
                get index() {
                  return gameRegions().findIndex(choice => choice.id === createRegion());
                },
                get enable() {
                  return !loading();
                },
                onChange: index => {
                  const choice = gameRegions()[index];
                  if (choice) setCreateRegion(choice.id);
                },
                get options() {
                  return gameRegions().map(choice => ({
                    ...choice,
                    name: regionName(choice)
                  }));
                }
              })];
            }
          }), _el$60);
          insert(_el$55, createComponent(PlatformTextEntry, {
            placeholder: "#platform_password",
            acceptsfocus: true,
            ref: panel => panel.SetDisableFocusOnMouseDown(false),
            onChange: (_, __, text) => {
              password = text;
            }
          }), _el$61);
          insert(_el$61, () => button('#platform_cancel', () => setCreateOpen(false)), null);
          insert(_el$61, () => button('#platform_create', () => {
            void run(async () => {
              await request(base() + '/rooms', 'POST', createRoomPayload(map(), title.trim() || defaultRoomName(), password, createRegion()));
              setCreateOpen(false);
              await refresh();
            });
          }, true), null);
          return _el$54;
        }
      }), null);
      insert(_el$22, createComponent(Show, {
        get when() {
          return memo(() => !!(joinTarget() && !room()))() && !otherGame();
        },
        get children() {
          const _el$62 = createElement("Panel", {
              "class": "PlatformModalOverlay"
            }, null),
            _el$63 = createElement("Panel", {
              "class": "PlatformCreateDialog"
            }, _el$62);
            createElement("Label", {
              "class": "PlatformTitle",
              text: "#platform_join"
            }, _el$63);
            const _el$65 = createElement("Label", {
              get text() {
                return joinTarget()?.title || '#platform_room_title';
              }
            }, _el$63),
            _el$66 = createElement("Panel", {
              "class": "PlatformRow PlatformDialogActions"
            }, _el$63);
          insert(_el$63, createComponent(PlatformTextEntry, {
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
          }), _el$66);
          insert(_el$66, () => button('#platform_cancel', () => setJoinTarget(undefined)), null);
          insert(_el$66, () => button('#platform_join', () => {
            if (joinTarget()) mutate('/rooms/' + joinTarget().id + '/join', {
              password
            });
          }, true), null);
          effect(_$p => setProp(_el$65, "text", joinTarget()?.title || '#platform_room_title', _$p));
          return _el$62;
        }
      }), null);
      effect(_$p => setProp(_el$26, "class", !room() || matching() ? 'PlatformHeader PlatformBrowserHeader' : 'PlatformHeader', _$p));
      return _el$22;
    })();
    return (() => {
      const _el$160 = createElement("Panel", {
        "class": "PlatformSurface",
        hittest: false
      }, null);
      insert(_el$160, createComponent(Show, {
        get when() {
          return !entry || entryReady();
        },
        get children() {
          return content();
        }
      }));
      return _el$160;
    })();
  }
  render(() => createComponent(PlatformLobby, {}), $.GetContextPanel());

})();