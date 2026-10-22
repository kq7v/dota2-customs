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
var courier_explore_time = require('./courier_explore_time.js');

const COURIER_EXPLORE_OVERHEAD_PANEL_HEIGHT = 140;
const COURIER_EXPLORE_OVERHEAD_BOTTOM_ANCHOR_OFFSET = 44;
function CourierExploreOverheadBadge(props) {
  const slotView = libs.createMemo(() => {
    const slots = props.sceneView().slots ?? [];
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (slot.entindex === props.entIndex) {
        return slot;
      }
    }
    return undefined;
  });
  const isFinished = libs.createMemo(() => {
    const slot = slotView();
    if (slot === undefined) {
      return false;
    }
    return courier_explore_time.isCourierExploreDurationMaxed(slot.start_time, props.currentServiceTime(), props.maxExploreDurationSeconds());
  });
  const timeBadgeClass = libs.createMemo(() => isFinished() ? 'CourierExploreOverheadTimeBadge CourierExploreOverheadTimeBadgeFinished' : 'CourierExploreOverheadTimeBadge CourierExploreOverheadTimeBadgeExploring');
  const stateIconClass = libs.createMemo(() => isFinished() ? 'CourierExploreOverheadStateIcon CourierExploreOverheadStateIconFinished' : 'CourierExploreOverheadStateIcon CourierExploreOverheadStateIconExploring');
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "CourierExploreOverheadContent",
        hittest: false
      }, null),
      _el$4 = libs.createElement("Panel", {
        get ["class"]() {
          return timeBadgeClass();
        },
        hittest: false
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        "class": "CourierExploreOverheadMainRow",
        hittest: false
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        get ["class"]() {
          return stateIconClass();
        },
        hittest: false
      }, _el$5),
      _el$7 = libs.createElement("Label", {
        "class": "CourierExploreOverheadTimeText",
        get text() {
          return courier_explore_time.formatCourierExploreElapsedTime(slotView()?.start_time, props.currentServiceTime(), props.maxExploreDurationSeconds());
        }
      }, _el$5);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isFinished();
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            "class": "CourierExploreOverheadTopLayer",
            hittest: false
          }, null);
          libs.createElement("Panel", {
            "class": "CourierExploreOverheadFinishedBadge",
            hittest: false
          }, _el$2);
        return _el$2;
      }
    }), _el$4);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return isFinished();
      },
      get children() {
        const _el$8 = libs.createElement("Label", {
          "class": "CourierExploreOverheadStatusText",
          get text() {
            return GetLocalization("#CourierExplore_TimeLimitReached", "");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$8, "text", GetLocalization("#CourierExplore_TimeLimitReached", ""), _$p));
        return _el$8;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = timeBadgeClass(),
        _v$2 = stateIconClass(),
        _v$3 = courier_explore_time.formatCourierExploreElapsedTime(slotView()?.start_time, props.currentServiceTime(), props.maxExploreDurationSeconds());
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
function CourierExploreOverhead() {
  const sceneView = solid_utils.createServiceNetData('courier_explore_scene_view', {
    updated_at: 0,
    slots: []
  });
  const gameState = solid_utils.createNetDataSignal('common', 'game_state', {
    state: 'GameState_Prepare',
    start_time: -1,
    end_time: -1
  });
  const playerPropertyData = solid_utils.createPlayerPropertyData(() => Players.GetLocalPlayer());
  const maxExploreDurationSeconds = libs.createMemo(() => courier_explore_time.getCourierExploreMaxDurationSeconds(Number(playerPropertyData().explore_limit ?? 0)));
  const isOverheadVisible = libs.createMemo(() => gameState().state === 'GameState_Prepare');
  const [currentServiceTime, setCurrentServiceTime] = libs.createSignal(courier_explore_time.getCurrentServerTime());
  let container;
  let recycleBin;
  let disposed = false;
  const createOverheadPanel = entIndex => {
    if (!container?.IsValid()) {
      return undefined;
    }
    const panel = $.CreatePanel('Panel', container, `courier_explore_overhead_${entIndex}`);
    panel.hittest = false;
    panel.AddClass('CourierExploreOverheadPanel');
    panel.style.height = `${COURIER_EXPLORE_OVERHEAD_PANEL_HEIGHT}px`;
    const dispose = libs.render(() => libs.createComponent(CourierExploreOverheadBadge, {
      entIndex: entIndex,
      currentServiceTime: currentServiceTime,
      maxExploreDurationSeconds: maxExploreDurationSeconds,
      sceneView: sceneView
    }), panel);
    SaveData(panel, '_SOLIDJS_DISPOSE_', dispose);
    return panel;
  };
  const updatePanelPosition = (panel, entIndex) => {
    const origin = Entities.GetAbsOrigin(entIndex);
    const x = (Game.WorldToScreenX(origin[0], origin[1], origin[2]) - panel.actuallayoutwidth / 2) / panel.actualuiscale_x;
    const y = (Game.WorldToScreenY(origin[0], origin[1], origin[2]) - panel.actuallayoutheight + COURIER_EXPLORE_OVERHEAD_BOTTOM_ANCHOR_OFFSET) / panel.actualuiscale_y;
    panel.SetPositionInPixels(x, y, 0);
  };
  const cleanupContainer = currentTime => {
    if (!container?.IsValid() || !recycleBin?.IsValid()) {
      return;
    }
    for (let i = container.GetChildCount() - 1; i >= 0; i--) {
      const panel = container.GetChild(i);
      if (panel !== null && LoadData(panel, 'fTime') !== currentTime) {
        panel.SetParent(recycleBin);
      }
    }
  };
  const disposeOverheadPanel = panel => {
    if (!panel?.IsValid()) {
      return;
    }
    const dispose = LoadData(panel, '_SOLIDJS_DISPOSE_');
    SaveData(panel, '_SOLIDJS_DISPOSE_', undefined);
    if (dispose) {
      try {
        dispose();
      } catch {}
    }
    panel.DeleteAsync(0);
  };
  const cleanupPanelChildren = parent => {
    if (!parent?.IsValid()) {
      return;
    }
    for (let i = parent.GetChildCount() - 1; i >= 0; i--) {
      disposeOverheadPanel(parent.GetChild(i));
    }
  };
  const cleanupRecycleBin = () => {
    cleanupPanelChildren(recycleBin);
  };
  libs.onMount(() => {
    const timer = setInterval(() => {
      setCurrentServiceTime(courier_explore_time.getCurrentServerTime());
    }, 1000);
    const update = () => {
      if (disposed) {
        return;
      }
      $.Schedule(0, update);
      const currentTime = Game.Time();
      if (!isOverheadVisible()) {
        cleanupContainer(currentTime);
        cleanupRecycleBin();
        return;
      }
      const slots = sceneView().slots ?? [];
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        const entIndex = slot.entindex;
        if (!Entities.IsValidEntity(entIndex)) {
          continue;
        }
        const origin = Entities.GetAbsOrigin(entIndex);
        const screenX = Game.WorldToScreenX(origin[0], origin[1], origin[2]);
        const screenY = Game.WorldToScreenY(origin[0], origin[1], origin[2]);
        if (screenX < 0 || screenX > Game.GetScreenWidth() || screenY < 0 || screenY > Game.GetScreenHeight()) {
          continue;
        }
        if (!container?.IsValid()) {
          continue;
        }
        let panel = container.FindChildTraverse(`courier_explore_overhead_${entIndex}`);
        if (!panel?.IsValid()) {
          panel = createOverheadPanel(entIndex);
        }
        if (!panel?.IsValid()) {
          continue;
        }
        updatePanelPosition(panel, entIndex);
        SaveData(panel, 'fTime', currentTime);
      }
      cleanupContainer(currentTime);
      cleanupRecycleBin();
    };
    update();
    libs.onCleanup(() => {
      disposed = true;
      clearInterval(timer);
      cleanupPanelChildren(container);
      cleanupRecycleBin();
    });
  });
  return (() => {
    const _el$9 = libs.createElement("Panel", {
        "class": "CourierExploreOverheadRoot",
        hittest: false
      }, null),
      _el$0 = libs.createElement("Panel", {
        "class": "CourierExploreOverheadRecycleBin",
        hittest: false
      }, _el$9),
      _el$1 = libs.createElement("Panel", {
        "class": "CourierExploreOverheadContainer",
        hittest: false
      }, _el$9);
    const _ref$ = recycleBin;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$0) : recycleBin = _el$0;
    const _ref$2 = container;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$1) : container = _el$1;
    libs.effect(_$p => libs.setProp(_el$9, "visible", isOverheadVisible(), _$p));
    return _el$9;
  })();
}
libs.render(CourierExploreOverhead, $.GetContextPanel());