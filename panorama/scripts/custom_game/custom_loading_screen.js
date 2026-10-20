--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');

function PlatformLoadingHost() {
  let host;
  libs.onMount(() => {
    host.BLoadLayout('file://{resources}/layout/custom_game/hud_platform.xml', false, false);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "PlatformLoadingHost",
      "class": "PlatformLoadingHost"
    }, null);
    const _ref$ = host;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$) : host = _el$;
    return _el$;
  })();
}
function LoadingScreenPlatform() {
  const [platform, setPlatform] = libs.createSignal(false);
  let retry;
  const hiddenChats = new Map();
  const hiddenDashboardButtons = new Map();
  const sidebarHitTests = new Map();
  const restoreChat = () => {
    for (const [panel, visible] of hiddenChats) {
      if (panel.IsValid()) panel.visible = visible;
    }
    hiddenChats.clear();
    for (const [panel, saved] of hiddenDashboardButtons) {
      if (panel.IsValid()) {
        panel.style.opacity = saved.opacity;
        panel.hittest = saved.hittest;
      }
    }
    hiddenDashboardButtons.clear();
    for (const [panel, hittest] of sidebarHitTests) {
      if (panel.IsValid()) panel.hittest = hittest;
    }
    sidebarHitTests.clear();
  };
  libs.onMount(() => {
    const checkMap = () => {
      const map = Game.GetMapInfo()?.map_display_name;
      const active = map === 'platform_entry' || map === 'platform_lobby';
      setPlatform(active);
      if (active) {
        let root = $.GetContextPanel();
        while (root.GetParent()) root = root.GetParent();
        for (const panel of root.FindChildrenWithClassTraverse('DOTAReturnToDashboardOverlay')) {
          if (!hiddenDashboardButtons.has(panel)) hiddenDashboardButtons.set(panel, {
            opacity: panel.style.opacity ?? "0",
            hittest: panel.hittest
          });
          panel.style.opacity = '0';
          panel.hittest = false;
        }
        const sidebar = root.FindChildTraverse('SidebarAndBattleCupLayoutContainer');
        if (sidebar) {
          if (!sidebarHitTests.has(sidebar)) sidebarHitTests.set(sidebar, sidebar.hittest);
          sidebar.hittest = false;
          sidebar.hittestchildren = false;
        }
        for (const panel of root.FindChildrenWithClassTraverse('ChatTipBox')) {
          if (!hiddenChats.has(panel)) hiddenChats.set(panel, panel.visible);
          if (panel.visible) panel.visible = false;
        }
      } else {
        restoreChat();
      }
      retry = $.Schedule(0.25, checkMap);
    };
    checkMap();
  });
  libs.onCleanup(() => {
    if (retry !== undefined) $.CancelScheduled(retry);
    restoreChat();
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return platform();
    },
    get children() {
      return libs.createComponent(PlatformLoadingHost, {});
    }
  });
}
libs.render(() => libs.createComponent(LoadingScreenPlatform, {}), $.GetContextPanel());
function PanelVisible(p, visible) {
  if (p?.IsValid()) {
    p.style.opacity = visible ? "1" : "0";
  }
}
(() => {
  var root = $.GetContextPanel();
  root.AddClass($.Language().toLowerCase());
  var pParent = root.GetParent();
  if (pParent?.IsValid()) {
    let pSideBar = pParent.FindChild("SidebarAndBattleCupLayoutContainer");
    if (pSideBar?.IsValid()) {
      pSideBar.hittest = false;
      let pChild = pSideBar.FindChild("LoadingScreenBattleCupWinnerContainer");
      if (pChild?.IsValid()) {
        pChild.hittest = false;
      }
    }
  }
  if (T11LinkageEnable) {
    root.BLoadLayoutSnippet('T11ContainerRoot');
  } else if (T12LinkageEnable) {
    root.BLoadLayoutSnippet('T12ContainerRoot');
  } else if (C1LinkageEnable) {
    root.AddClass('C1Linkage');
  }
  if (loadingScreenSeason != undefined) {
    root.AddClass('Season' + loadingScreenSeason);
  }
  var Update = function () {
    var mapInfo = Game.GetMapInfo();
    PanelVisible($("#StartTips"), isRankMode());
    if (mapInfo.map_display_name == "help_map") {
      PanelVisible($("#VGLauncherNotice"), true);
      PanelVisible($("#WorldVignetteRight"), false);
      PanelVisible($("#BlackBlock"), false);
      PanelVisible($("#RankBG"), false);
    } else {
      PanelVisible($("#VGLauncherNotice"), false);
      PanelVisible($("#WorldVignetteRight"), true);
      PanelVisible($("#BlackBlock"), true);
      PanelVisible($("#RankBG"), true);
    }
    $.Schedule(0, () => {
      Update();
    });
  };
  Update();
})();