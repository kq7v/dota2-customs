--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict';
function JumpT11Url() {
  $.DispatchEvent('DOTAShowCustomGamePage', 3591915450);
  $.DispatchEvent('DOTASubscribeToCustomGame', 3591915450);
}

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
