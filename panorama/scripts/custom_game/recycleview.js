--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('RecycleView', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function IsValidPanel(...args) {
  return args.every(panel => {
    return panel && panel.IsValid?.();
  });
}
function TryCancelScheduled(id) {
  try {
    $.CancelScheduled(id);
  } catch (error) {}
}
function RegisterDrag(pPanel, OnStart, OnEnd) {
  let id1 = $.RegisterForUnhandledEvent("DragStart", (_Panel, tDragCallbacks) => {
    if (_Panel == pPanel) {
      let pDisplayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "DragEmpty");
      tDragCallbacks.displayPanel = pDisplayPanel;
      OnStart();
    }
  });
  let id2 = $.RegisterForUnhandledEvent("DragEnd", (_Panel, pDraggedPanel) => {
    if (_Panel == pPanel) {
      try {
        pDraggedPanel.DeleteAsync(-1);
      } catch (error) {}
      OnEnd();
    }
  });
  return {
    "DragStart": id1,
    "DragEnd": id2
  };
}
function RecycleView(props) {
  const sMouseUnique = DoUniqueString("RecycleView");
  const GridDirectionConfig = {
    "HorizontalGrid": "Horizontal",
    "VerticalGrid": "Vertical"
  };
  let refRoot;
  let refRecycle;
  let refCache;
  let refBar;
  let childStore = {};
  let childStoreGrid = {};
  let cachePool = [];
  let fTargetScroll = -(props.paddingStart ?? 0);
  let fScroll = fTargetScroll - 1;
  let bNoSmooth = false;
  let visibleStart = -1;
  let visibleEnd = -1;
  let bDragging = false;
  let fDragLastTime = 0;
  let vDragLastPos = [0, 0];
  let dragHandle = {};
  let lastThumbPositionPct = undefined;
  let lastCurrentPage = undefined;
  let lastTotalPage = undefined;
  function CleanupDragHandle() {
    try {
      for (const eventName in dragHandle) {
        $.UnregisterForUnhandledEvent(eventName, dragHandle[eventName]);
      }
    } catch (error) {}
    dragHandle = {};
    bDragging = false;
  }
  const expose = {
    get refRoot() {
      return refRoot;
    },
    get fScroll() {
      return fScroll;
    },
    scroll2Child,
    scroll
  };
  if (props.handle) {
    props.handle(expose);
  }
  const [fParentWidth, SetParentWidth] = libs.createSignal(0);
  const [fParentHeight, SetParentHeight] = libs.createSignal(0);
  const [currentPage, setCurrentPage] = libs.createSignal(1);
  const [totalPage, setTotalPage] = libs.createSignal(1);
  const pageLabelText = libs.createMemo(() => `${currentPage()}/${totalPage()}`);
  const memoInfo = libs.createMemo(old => {
    let {
      childConfig,
      direction,
      paddingEnd = 0,
      input,
      grid_children
    } = props;
    const parent_width = fParentWidth();
    const parent_height = fParentHeight();
    let childCount = input().length;
    let top = childConfig.margin_top ?? childConfig.margin ?? 0;
    let right = childConfig.margin_right ?? childConfig.margin ?? 0;
    let bottom = childConfig.margin_bottom ?? childConfig.margin ?? 0;
    let left = childConfig.margin_left ?? childConfig.margin ?? 0;
    const width = childConfig.width + right + left;
    const height = childConfig.height + top + bottom;
    let isHorizontal = direction == "Horizontal" || direction == "HorizontalGrid";
    let isSingleScroll = direction == "Horizontal" || direction == "Vertical";
    let fParentSize = isHorizontal ? parent_width : parent_height;
    let fChildSize = isHorizontal ? width : height;
    const rawColumnCount = isSingleScroll ? 1 : Math.floor((isHorizontal ? parent_height : parent_width) / (isHorizontal ? height : width));
    let columnCount = Math.max(1, Number.isFinite(rawColumnCount) ? rawColumnCount : 1);
    let rowCount = Math.ceil(childCount / columnCount);
    if (grid_children) {
      rowCount = Math.max(Math.ceil(fParentSize / fChildSize), rowCount);
    }
    let fMaxScroll = Math.max(0, paddingEnd + (rowCount * fChildSize - fParentSize));
    let fContentSize = fChildSize * rowCount;
    if (refBar) {
      refBar.updateBarLength(fParentSize, fContentSize);
    }
    const res = {
      fMaxScroll,
      fParentSize,
      fChildSize,
      fContentSize,
      columnCount,
      rowCount,
      width,
      height,
      top,
      right,
      bottom,
      left
    };
    if (old) {
      for (const k in old) {
        if (old[k] != res[k]) {
          return res;
        }
      }
      return old;
    }
    return res;
  });
  libs.createRenderEffect(() => {
    props.input();
    libs.untrack(() => update(true));
  });
  libs.createRenderEffect(() => {
    fParentWidth();
    fParentHeight();
    libs.untrack(() => update());
  });
  libs.onMount(() => {
    function Tick() {
      const isActive = bDragging || fTargetScroll != fScroll;
      let interval = isActive ? Math.max(1 / 90, Game.GetGameFrameTime()) : 0.05;
      id = $.Schedule(interval, Tick);
      if (refRoot?.IsValid()) {
        const nextParentWidth = refRoot.actuallayoutwidth / refRoot.actualuiscale_x;
        const nextParentHeight = refRoot.actuallayoutheight / refRoot.actualuiscale_y;
        if (nextParentWidth != fParentWidth() || nextParentHeight != fParentHeight()) {
          libs.batch(() => {
            SetParentWidth(nextParentWidth);
            SetParentHeight(nextParentHeight);
          });
        }
      }
      if (bDragging) dragThinker();
      if (fTargetScroll == fScroll) return interval;
      update();
    }
    var id = $.Schedule(0, Tick);
    libs.onCleanup(() => TryCancelScheduled(id));
  });
  libs.onMount(() => {
    CustomUIConfig.SubscribeMouseEvent(sMouseUnique, ({
      event_name: sEventName,
      value: iValue
    }) => {
      let pRoot = refRoot;
      if (pRoot && pRoot.IsValid() && pRoot.BHasHoverStyle()) {
        const fWheel = props.wheelStep ?? 96;
        switch (sEventName) {
          case "pressed":
            if (iValue == 5) {
              scroll(-fWheel);
            } else if (iValue == 6) {
              scroll(fWheel);
            }
            break;
          case "wheeled":
            if (iValue == 1) {
              scroll(-fWheel);
            } else if (iValue == -1) {
              scroll(fWheel);
            }
            break;
        }
      }
    });
    libs.onCleanup(() => {
      try {
        CustomUIConfig.UnsubscribeMouseEvent(sMouseUnique);
      } catch (error) {}
    });
  });
  libs.onMount(() => {
    libs.createEffect(() => {
      const disableMouseDrag = props.disableMouseDrag ?? false;
      CleanupDragHandle();
      if (disableMouseDrag || refRoot == undefined) {
        return;
      }
      dragHandle = RegisterDrag(refRoot, () => {
        bDragging = true;
        fDragLastTime = Game.Time();
        let vPosition = GameUI.GetCursorPosition();
        vDragLastPos = vPosition;
        fScroll = fTargetScroll;
      }, () => {
        bDragging = false;
      });
      libs.onCleanup(() => {
        CleanupDragHandle();
      });
    });
    libs.onCleanup(() => {
      CleanupDragHandle();
    });
  });
  libs.onCleanup(() => {
    for (let [key, data] of Object.entries(childStore)) {
      if (data && data.disposer) {
        data.disposer();
      }
    }
  });
  function update(forceUpdate = false) {
    let pRoot = refRoot;
    if (!(pRoot && pRoot.IsValid())) {
      return;
    }
    if (pRoot.actuallayoutwidth <= 0 && pRoot.actuallayoutheight <= 0) {
      return;
    }
    const {
      direction,
      paddingStart = 0,
      onScroll,
      onScrollPercent,
      grid_children
    } = props;
    const {
      fMaxScroll,
      fParentSize,
      fChildSize,
      fContentSize,
      columnCount,
      rowCount,
      width,
      height,
      top,
      right,
      bottom,
      left
    } = memoInfo();
    const childCount = props.input().length;
    const fCurrentScroll = fScroll;
    const fMinScroll = -paddingStart;
    fTargetScroll = Clamp(fTargetScroll, fMinScroll, fMaxScroll);
    const fChange = (fTargetScroll - fScroll) / 3;
    if (bNoSmooth || Math.abs(fChange) <= 1) {
      bNoSmooth = false;
      fScroll = fTargetScroll;
    } else {
      fScroll = Math.floor(fScroll + fChange);
    }
    if (fCurrentScroll != fScroll) {
      onScroll?.(fScroll, expose);
      onScrollPercent?.(fMaxScroll > 0 ? fScroll / fMaxScroll : 0);
    }
    if (refBar) {
      const nextThumbPositionPct = fContentSize > 0 ? fScroll / fContentSize * 100 : 0;
      if (lastThumbPositionPct != nextThumbPositionPct) {
        lastThumbPositionPct = nextThumbPositionPct;
        refBar.setThumbPosition(nextThumbPositionPct);
      }
    }
    let isHorizontal = direction == "Horizontal" || direction == "HorizontalGrid";
    const lastChild = grid_children == undefined ? childCount - 1 : Math.max(columnCount * rowCount, childCount) - 1;
    const firstIndex = Clamp((Math.floor(fScroll / fChildSize) - 1 - 1) * columnCount, 0, lastChild);
    const lastIndex = Clamp(Math.ceil((fScroll + fParentSize) / fChildSize + 1) * columnCount, 0, lastChild);
    if (props.showPageLabel || props.onPageChange) {
      const rowsPerPage = Math.max(1, Math.floor(fParentSize / fChildSize));
      const nextTotalPage = Math.max(1, Math.ceil(rowCount / rowsPerPage));
      const nextCurrentPage = nextTotalPage <= 1 ? 1 : Clamp(Math.round(fScroll / fMaxScroll * (nextTotalPage - 1)) + 1, 1, nextTotalPage);
      const pageChanged = nextCurrentPage != lastCurrentPage || nextTotalPage != lastTotalPage;
      if (nextTotalPage != lastTotalPage) {
        lastTotalPage = nextTotalPage;
        setTotalPage(nextTotalPage);
      }
      if (nextCurrentPage != lastCurrentPage) {
        lastCurrentPage = nextCurrentPage;
        setCurrentPage(nextCurrentPage);
      }
      if (pageChanged) {
        props.onPageChange?.(nextCurrentPage, nextTotalPage);
      }
    }
    const rangeChanged = firstIndex != visibleStart || lastIndex != visibleEnd;
    visibleStart = firstIndex;
    visibleEnd = lastIndex;
    let realEnd = Math.min(visibleEnd, childCount - 1);
    if (rangeChanged || forceUpdate) {
      updateChild(visibleStart, realEnd, lastIndex, props.input(), forceUpdate);
    }
    for (let i = firstIndex; i <= lastIndex; i++) {
      let pChild = childStore[i]?.child;
      if (pChild && pChild.IsValid()) {
        if (isHorizontal) {
          pChild.style.x = Math.floor(i / columnCount) * width + left - fScroll + "px";
          pChild.style.y = i % columnCount * height + top + "px";
        } else {
          pChild.style.x = i % columnCount * width + left + "px";
          pChild.style.y = Math.floor(i / columnCount) * height + top - fScroll + "px";
        }
      }
    }
    for (let i = realEnd + 1; i <= lastIndex; i++) {
      let pChild = childStoreGrid[i]?.child;
      if (pChild && pChild.IsValid()) {
        if (isHorizontal) {
          pChild.style.x = Math.floor(i / columnCount) * width + left - fScroll + "px";
          pChild.style.y = i % columnCount * height + top + "px";
        } else {
          pChild.style.x = i % columnCount * width + left + "px";
          pChild.style.y = Math.floor(i / columnCount) * height + top - fScroll + "px";
        }
      }
    }
  }
  function updateChild(iStart, realEnd, totalEnd, input, fullFresh = false) {
    if (iStart < 0 || totalEnd < 0) {
      return;
    }
    let pRoot = refRoot;
    let pRecycle = refRecycle;
    let pCache = refCache;
    if (!IsValidPanel(pRoot, pRecycle, pCache)) {
      return;
    }
    let invisible = [];
    for (let [key, value] of Object.entries(childStore)) {
      let index = Number(key);
      if (index < iStart || index > realEnd) {
        invisible.push(value);
        delete childStore[index];
      }
    }
    for (let i = iStart; i <= realEnd; i++) {
      let data = childStore[i];
      if (data == undefined) {
        let p = invisible.pop();
        if (p == undefined) {
          p = cachePool.pop();
          if (p) {
            p.child.SetParent(pRoot);
          }
        }
        if (p) {
          childStore[i] = data = p;
          data.setter(input[i]);
        } else {
          libs.createRoot(disposer => {
            let [s, setter] = libs.createSignal(input[i]);
            let c = props.children(s);
            c.SetParent(pRoot);
            childStore[i] = data = {
              disposer,
              setter,
              child: c
            };
          });
        }
      } else {
        if (fullFresh) {
          data.setter(input[i]);
        }
      }
    }
    let cacheSize = props.cacheSize ?? 1;
    let cacheLeft = cacheSize - cachePool.length;
    for (let i = 0; i < invisible.length; i++) {
      const data = invisible[i];
      if (i < cacheLeft) {
        data.child.SetParent(pCache);
        cachePool.push(data);
      } else {
        data.disposer();
        data.child.SetParent(pRecycle);
      }
    }
    if (props.grid_children) {
      let invisible_block = [];
      for (let [key, value] of Object.entries(childStoreGrid)) {
        let index = Number(key);
        if (index <= realEnd || index > totalEnd) {
          invisible_block.push(value);
          delete childStoreGrid[index];
        }
      }
      for (let i = realEnd + 1; i <= totalEnd; i++) {
        let data = childStoreGrid[i];
        if (data == undefined) {
          let p = invisible_block.pop();
          if (p) {
            p.child.SetParent(pRoot);
          }
          if (p) {
            childStoreGrid[i] = data = p;
          } else {
            libs.createRoot(disposer => {
              let c = props.grid_children();
              c.SetParent(pRoot);
              childStoreGrid[i] = data = {
                disposer,
                child: c
              };
            });
          }
        }
      }
      for (let i = 0; i < invisible_block.length; i++) {
        const data = invisible_block[i];
        data.disposer();
        data.child.SetParent(pRecycle);
      }
    }
    pRecycle.RemoveAndDeleteChildren();
  }
  function dragThinker() {
    let pRoot = refRoot;
    if (pRoot == undefined) return;
    const direction = GridDirectionConfig[props.direction] ?? props.direction;
    let vPosition = GameUI.GetCursorPosition();
    let fMove = direction == "Horizontal" ? (vPosition[0] - vDragLastPos[0]) / pRoot.actualuiscale_x : (vPosition[1] - vDragLastPos[1]) / pRoot.actualuiscale_y;
    if (Math.abs(fMove) < 1) return;
    let fTimePass = Game.Time() - fDragLastTime;
    let vVelocity = fMove / fTimePass;
    if (Math.abs(vVelocity) < 2000) {
      bNoSmooth = true;
      fTargetScroll = fScroll - fMove;
    } else {
      bNoSmooth = false;
      fTargetScroll = fScroll + 0.5 * Math.pow(vVelocity, 2) / 20000 * (vVelocity >= 0 ? -1 : 1);
    }
    fDragLastTime = Game.Time();
    vDragLastPos = vPosition;
    if (!pRoot?.BHasHoverStyle()) {
      bDragging = false;
    }
  }
  function scroll(fScroll, options) {
    let pRoot = refRoot;
    if (pRoot) {
      const {
        paddingStart = 0
      } = props;
      const {
        fMaxScroll,
        fContentSize
      } = memoInfo();
      const {
        bPercent,
        bSet,
        bNoSmooth: _bNoSmooth
      } = options ?? {};
      fTargetScroll = Clamp((bSet ? 0 : fTargetScroll) + (bPercent ? fScroll * fContentSize : fScroll), -paddingStart, fMaxScroll);
      if (_bNoSmooth) {
        bNoSmooth = true;
      }
    }
  }
  function scroll2Child(index, type, _bNoSmooth = false) {
    let pRoot = refRoot;
    if (!IsValidPanel(pRoot)) {
      return;
    }
    const {
      paddingStart = 0
    } = props;
    const {
      fParentSize,
      fChildSize,
      fMaxScroll,
      columnCount
    } = memoInfo();
    index = Math.floor(index / columnCount);
    let target_scroll = index * fChildSize;
    if (type == "center") {
      target_scroll -= (fParentSize - fChildSize) / 2;
    } else if (type == "end") {
      target_scroll -= fParentSize - fChildSize;
    }
    fTargetScroll = Clamp(target_scroll, -paddingStart, fMaxScroll);
    if (_bNoSmooth) {
      bNoSmooth = true;
    }
  }
  const [local, others] = libs.splitProps(props, ["classList", "input", "children", "childConfig", "direction", "paddingStart", "paddingEnd", "onScroll", "onScrollPercent", "cacheSize", "onload", "disableMouseDrag", "showPageLabel"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get draggable() {
          return !local.disableMouseDrag;
        }
      }), null),
      _el$2 = libs.createElement("Panel", {
        id: "RecyclePool",
        hittest: false,
        hittestchildren: false,
        visible: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "CachePool",
        hittest: false,
        hittestchildren: false,
        visible: false
      }, _el$);
    const _ref$ = refRoot;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$) : refRoot = _el$;
    libs.spread(_el$, libs.mergeProps$1(others, {
      get draggable() {
        return !local.disableMouseDrag;
      },
      "onload": p => {
        p.SetAcceptsFocus(false);
        local.onload?.(p);
      },
      get classList() {
        return libs.mergeProps(local.classList, {
          RecycleView: true,
          [local.direction]: true
        });
      }
    }), true);
    const _ref$2 = refRecycle;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$2) : refRecycle = _el$2;
    libs.setProp(_el$2, "style", {
      width: "100%",
      height: "100%",
      opacity: "0"
    });
    const _ref$3 = refCache;
    typeof _ref$3 === "function" ? libs.use(_ref$3, _el$3) : refCache = _el$3;
    libs.setProp(_el$3, "style", {
      width: "100%",
      height: "100%",
      opacity: "0"
    });
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.showBar ?? true;
      },
      get children() {
        return libs.createComponent(ScrollBar, {
          ref(r$) {
            const _ref$4 = refBar;
            typeof _ref$4 === "function" ? _ref$4(r$) : refBar = r$;
          },
          get barType() {
            return GridDirectionConfig[local.direction] ?? local.direction;
          },
          scrollCallBack: scroll
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.showPageLabel ?? false;
      },
      get children() {
        const _el$4 = libs.createElement("Label", {
          "class": "RecycleViewPageLabel",
          get text() {
            return pageLabelText();
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$4, "text", pageLabelText(), _$p));
        return _el$4;
      }
    }), null);
    return _el$;
  })();
}
function ScrollBar(props) {
  let refBar;
  let refThumb;
  let thumbPct = 0;
  libs.onMount(() => {
    let pRoot = refThumb;
    if (!pRoot) return;
    let timerID;
    let dragHandle = RegisterDrag(pRoot, () => {
      let vLastPos = GameUI.GetCursorPosition();
      function Tick() {
        timerID = $.Schedule(0, Tick);
        const {
          scrollCallBack,
          barType
        } = props;
        const vPosition = GameUI.GetCursorPosition();
        const scale = 1;
        if (barType == "Horizontal") {
          const fMoveX = vPosition[0] - vLastPos[0];
          if (fMoveX != 0) {
            const pBar = refBar;
            if (pBar) {
              const fPct = fMoveX / pBar.actuallayoutwidth * scale;
              scrollCallBack(fPct, {
                bPercent: true,
                bNoSmooth: true
              });
            }
          }
        } else {
          const fMoveY = vPosition[1] - vLastPos[1];
          if (fMoveY != 0) {
            const pBar = refBar;
            if (pBar) {
              const fPct = fMoveY / pBar.actuallayoutheight * scale;
              scrollCallBack(fPct, {
                bPercent: true,
                bNoSmooth: true
              });
            }
          }
        }
        vLastPos = vPosition;
      }
      Tick();
    }, () => TryCancelScheduled(timerID));
    libs.onCleanup(() => {
      try {
        for (let [event_name, id] of Object.entries(dragHandle)) {
          $.UnregisterForUnhandledEvent(event_name, id);
        }
      } catch (error) {}
    });
  });
  function setThumbPosition(fPct) {
    if (refBar?.IsValid() && refThumb?.IsValid()) {
      if (!Number.isFinite(fPct)) {
        fPct = 0;
      }
      let pct = Round(fPct, 6) + "%";
      if (props.barType == "Horizontal") {
        refThumb.style.x = pct;
      } else {
        refThumb.style.y = pct;
      }
    }
  }
  function updateBarLength(fVisibleLength, fContentLength) {
    const pBar = refBar;
    const pThumb = refThumb;
    if (pBar && pThumb) {
      const bVisible = fContentLength > fVisibleLength;
      pBar.visible = bVisible;
      if (bVisible) {
        thumbPct = Clamp(fVisibleLength / fContentLength, 0, 1);
        const sThumbSize = thumbPct * 100 + "%";
        if (props.barType == "Horizontal") {
          pThumb.style.width = sThumbSize;
        } else {
          pThumb.style.height = sThumbSize;
        }
      }
    }
  }
  libs.createEffect(() => {
    let ref = props.ref;
    if (typeof ref == "function") {
      ref({
        setThumbPosition,
        updateBarLength
      });
    }
  });
  return (() => {
    const _el$5 = libs.createElement("Panel", {
        get ["class"]() {
          return `CustomScrollBar Custom${props.barType}ScrollBar`;
        }
      }, null),
      _el$6 = libs.createElement("Panel", {
        id: "ScrollBarThumb",
        draggable: true
      }, _el$5);
    const _ref$5 = refBar;
    typeof _ref$5 === "function" ? libs.use(_ref$5, _el$5) : refBar = _el$5;
    libs.setProp(_el$5, "onactivate", p => {
      const {
        scrollCallBack,
        barType
      } = props;
      const vCursor = GameUI.GetCursorPosition();
      const {
        x,
        y
      } = p.GetPositionWithinWindow();
      if (barType == "Horizontal") {
        let fPct = (vCursor[0] - x) / p.actuallayoutwidth;
        scrollCallBack(fPct, {
          bNoSmooth: true,
          bPercent: true,
          bSet: true
        });
      } else {
        let fPct = (vCursor[1] - y) / p.actuallayoutheight;
        scrollCallBack(fPct, {
          bNoSmooth: true,
          bPercent: true,
          bSet: true
        });
      }
    });
    const _ref$6 = refThumb;
    typeof _ref$6 === "function" ? libs.use(_ref$6, _el$6) : refThumb = _el$6;
    libs.effect(_$p => libs.setProp(_el$5, "class", `CustomScrollBar Custom${props.barType}ScrollBar`, _$p));
    return _el$5;
  })();
}

exports.RecycleView = RecycleView;