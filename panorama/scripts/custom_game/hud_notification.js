--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var common_item = require('./common_item.js');

class MyActions extends BaseAction {
  currentActionIndex = 0;
  currentActionStarted = false;
  constructor(actions = []) {
    super();
    this.actions = actions;
  }
  start() {
    this.actions = [];
    this.currentActionIndex = 0;
    this.currentActionStarted = false;
  }
  addAction(...actions) {
    this.actions.push(...actions);
  }
  reset() {
    if (this.currentActionStarted) {
      this.actions[this.currentActionIndex].finish();
    }
    this.actions = [];
    this.currentActionIndex = 0;
    this.currentActionStarted = false;
  }
  update() {
    while (this.currentActionIndex < this.actions.length) {
      if (!this.currentActionStarted) {
        this.actions[this.currentActionIndex].start();
        this.currentActionStarted = true;
      }
      if (!this.actions[this.currentActionIndex].update()) {
        this.actions[this.currentActionIndex].finish();
        this.currentActionIndex++;
        this.currentActionStarted = false;
      } else {
        return true;
      }
    }
    return false;
  }
  finish() {
    while (this.currentActionIndex < this.actions.length) {
      if (!this.currentActionStarted) {
        this.actions[this.currentActionIndex].start();
        this.currentActionStarted = true;
        this.actions[this.currentActionIndex].update();
      }
      this.actions[this.currentActionIndex].finish();
      this.currentActionIndex++;
      this.currentActionStarted = false;
    }
  }
}
function UpdateSingleAction(action) {
  action.start();
  let callback = function () {
    if (!action.update()) {
      action.finish();
    }
    $.Schedule(Game.GetGameFrameTime(), callback);
  };
  callback();
}
function ReplacePlayerIcon(panel, playerID) {
  $.Schedule(0, function () {
    if (!panel.IsValid()) {
      return;
    }
    let heroIconPanels = panel.FindChildTraverse("NotificationLabel")?.FindChildrenWithClassTraverse("CombatEventHeroPlayer_" + playerID) || [];
    for (let index = 0; index < heroIconPanels.length; index++) {
      let pHeroIconPanel = heroIconPanels[index];
      let tPlayerInfo = Game.GetPlayerInfo(playerID);
      pHeroIconPanel.RemoveClass("CombatEventHeroPlayer_" + playerID);
      pHeroIconPanel.BLoadLayoutSnippet("CombatEventPlayerIcon");
      if (tPlayerInfo) {
        let pPlayerAvatarImage = pHeroIconPanel.FindChildTraverse("PlayerAvatarImage");
        if (pPlayerAvatarImage) {
          pPlayerAvatarImage.steamid = tPlayerInfo.player_steamid;
        }
      }
    }
  });
}
function RenderItemImg(panel, itemName, sItemClass, iItemLevel) {
  $.Schedule(0, function () {
    if (!panel.IsValid()) {
      return;
    }
    panel.FindChildrenWithClassTraverse(sItemClass).forEach(itemIconPanel => {
      itemIconPanel.RemoveClass(sItemClass);
      libs.insert(itemIconPanel, libs.createComponent(common_item.CommonItem, {
        itemName: itemName,
        rarity: iItemLevel
      }));
    });
  });
}
let tResourceCombatEventIcon = {
  "gold": "CombatEventGoldIcon",
  "kill": "CombatEventKillsIcon",
  "crystal": "CombatEventCrystalIcon"
};
function formatMessageList(sFormat, list, param_type, split) {
  if (sFormat[0] == "#") {
    sFormat = GetLocalization(sFormat);
  }
  return Object.values(list).map(unit => {
    return Object.values(unit).map((v, index) => {
      if (typeof param_type != "object") {
        return v;
      }
      switch (param_type[index + 1]) {
        case "b_int":
          return FormatNumber(v);
        case "int":
          return Math.floor(v);
        case "#":
          return GetLocalization(v);
        case "custom_variable":
          print("custom_variable");
          let [sName, bPercent] = GetVariableTranslation(v);
          print(sName, bPercent);
          return bPercent ? sName + "%" : sName;
        case "resource":
          return `<panel class='${tResourceCombatEventIcon[v.toLocaleLowerCase()] ?? ""}'/>`;
        default:
          return v;
      }
    }).reduce((s, c, i) => {
      return s.replace(new RegExp(`\\$${i}`, "g"), GetLocalization(c));
    }, sFormat);
  }).join(split ?? "");
}
function formatMessageCustomVar(list, split) {
  return Object.entries(list).map(([k, v]) => {
    let [sName, bPercent] = GetVariableTranslation(k);
    return `${FormatNumber(v)}${bPercent ? "%" : ""} ${sName}`;
  }).join(split ?? "");
}
function GetVariableTranslation(sKey) {
  let sTranslation = GetLocalization(`#dota_ability_attribute_${sKey}`);
  let bIsPercent = sTranslation[0] == "%";
  if (bIsPercent) {
    sTranslation = sTranslation.substring(1);
  }
  return [sTranslation, bIsPercent];
}
function formatMessage(p, tParams) {
  var sMessage = "";
  if (tParams.message != undefined && tParams.message != null) {
    for (var key in tParams) {
      var value = tParams[key];
      if (key.startsWith("b_int_")) {
        value = FormatNumber(value);
        p.SetDialogVariable(key, value);
      } else if (key.startsWith("int_")) {
        p.SetDialogVariableInt(key, value);
      } else if (key.startsWith("float_")) {
        p.SetDialogVariable(key, String(Float(value)));
      } else if (key.startsWith("string_")) {
        p.SetDialogVariable(key, GetLocalization(value));
      } else if (key.startsWith("item_")) {
        let sItemClass = `NotificationItem_${key}`;
        let sLoc = ` <panel class="NotificationItem ${sItemClass}" /> ${GetLocalization("#DOTA_Tooltip_ability_" + value)}`;
        p.SetDialogVariable(key, sLoc);
        let rarity = tParams[key + "_rarity"];
        RenderItemImg(p, value, sItemClass, rarity);
      } else if (key.startsWith("array_")) {
        if (typeof value != "object" || typeof value.list != "object") {
          continue;
        }
        switch (value.type) {
          case "custom_variable":
            p.SetDialogVariable(key, formatMessageCustomVar(value.list, value.split));
            break;
          default:
            p.SetDialogVariable(key, formatMessageList(value.type, value.list, value.param_type, value.split));
            break;
        }
      }
    }
    sMessage = GetLocalization(tParams.message, "", p);
  }
  return sMessage;
}
function CreateNotification(tParams, parent, id) {
  let localPlayerID = Players.GetLocalPlayer();
  let panel = $.CreatePanel("Panel", parent, id);
  panel.BLoadLayoutSnippet("Notification");
  if (typeof tParams.player_id == "number" && Players.IsValidPlayerID(tParams.player_id)) {
    Players.GetPlayerHeroEntityIndex(tParams.player_id);
    let sPlayerName = Players.GetPlayerName(tParams.player_id);
    let sPlayerColor = intToARGB(Players.GetPlayerColor(tParams.player_id));
    panel.SetDialogVariable("player_name", "<panel class='CombatEventPlayerIcon CombatEventHeroPlayer_" + tParams.player_id + "' />" + "<font color='#" + sPlayerColor + "'>" + sPlayerName + "</font>");
    ReplacePlayerIcon(panel, tParams.player_id);
    panel.SetHasClass("LocalPlayerInvolved", tParams.player_id == localPlayerID);
    delete tParams.player_id;
  }
  if (typeof tParams.player_id2 == "number") {
    Players.GetPlayerHeroEntityIndex(tParams.player_id2);
    let sPlayerName = Players.GetPlayerName(tParams.player_id2);
    let sPlayerColor = intToARGB(Players.GetPlayerColor(tParams.player_id2));
    panel.SetDialogVariable("player_name2", "<panel class='CombatEventPlayerIcon CombatEventHeroPlayer_" + tParams.player_id2 + "' />" + "<font color='#" + sPlayerColor + "'>" + sPlayerName + "</font>");
    ReplacePlayerIcon(panel, tParams.player_id2);
    panel.SetHasClass("LocalPlayerInvolved", tParams.player_id2 == localPlayerID);
    delete tParams.player_id2;
  }
  if (typeof tParams.teamnumber == "number" && tParams.teamnumber != -1) {
    if (Players.GetTeam(localPlayerID) == tParams.teamnumber) {
      panel.SetHasClass("AllyEvent", true);
    } else {
      panel.SetHasClass("EnemyEvent", true);
    }
    delete tParams.teamnumber;
  }
  let pNotificationLabel = panel.FindChildTraverse("NotificationLabel");
  if (pNotificationLabel) {
    pNotificationLabel.html = true;
    pNotificationLabel.text = formatMessage(pNotificationLabel, tParams);
  }
  return panel;
}
let UpperNotificationSeq = new MyActions();
let UpperNotificationTime = 5.0;
function UpperNotification(tParams) {
  if (tParams.override == 1) {
    UpperNotificationSeq.reset();
  }
  let tmp = new RunSequentialActions();
  let type = tParams.type ?? "Normal";
  let panel;
  let particlePanel;
  let particles = {
    Normal: "particles/ui/game/ui_game_tixing2.vpcf",
    Warning: "particles/ui/game/ui_game_tixing1.vpcf"
  };
  tmp.actions.push(new RunFunctionAction(function () {
    panel = $.CreatePanel("Panel", $("#UpperNotificationContainer"), "UpperNotificationPanel", {
      text: GetLocalization(title),
      hittest: false,
      html: true
    });
    panel.SwitchClass("type", type);
    particlePanel = $.CreatePanel("DOTAParticleScenePanel", panel, "UpperNotificationParticle", {
      particleonly: "true",
      particleName: particles[type] ?? particles.Normal,
      cameraOrigin: "0 -150 460",
      lookAt: "0 -150 0",
      fov: "90",
      squarePixels: "true",
      hittest: false
    });
  }));
  tmp.actions.push(new WaitAction(0.3));
  let title = tParams.title ?? "NotificationTitle_Common";
  let titlePanel;
  let textPanel;
  tmp.actions.push(new RunFunctionAction(function () {
    if (panel) {
      titlePanel = $.CreatePanel("Label", panel, "UpperNotificationTitle", {
        text: GetLocalization(title),
        hittest: false,
        html: true
      });
      titlePanel?.AddClass("PopOut");
      textPanel = CreateNotification(tParams, panel, "UpperNotificationText");
      textPanel?.AddClass("PopOut");
    }
  }));
  tmp.actions.push(new WaitAction(toFiniteNumber(tParams.message_duration, UpperNotificationTime)));
  tmp.actions.push(new RunFunctionAction(function () {
    particlePanel?.StopParticlesWithEndcaps();
    titlePanel?.RemoveClass("PopOut");
    textPanel?.RemoveClass("PopOut");
  }));
  tmp.actions.push(new WaitAction(3));
  tmp.actions.push(new RunFunctionAction(function () {
    panel?.DeleteAsync(-1);
  }));
  UpperNotificationSeq.actions.push(tmp);
}
function OnNotificationUpper(tParams) {
  tParams.teamnumber = undefined;
  UpperNotification(tParams);
}
let combat_events;
let pCombatNotificationToastManager = $("#CombatNotificationToastManager");
function OnNotificationCombat(tParams) {
  let panel = $.CreatePanel("Panel", pCombatNotificationToastManager, "");
  CreateNotification(tParams, panel, "");
  panel.AddClass("Combat");
  let iconPanel = $.CreatePanel("Image", panel, "");
  iconPanel.AddClass("CombatIcon");
  if (tParams.panorama_class) {
    panel.AddClass(tParams.panorama_class);
  }
  pCombatNotificationToastManager.QueueToast(panel);
}
function update() {
  $.Schedule(Game.GetGameFrameTime(), update);
  if (combat_events) {
    $("#CombatNotificationContainer").SetHasClass("RevealCollapsed", combat_events.BHasClass("RevealCollapsed"));
  }
}
let ChatLinesPanel;
let ChatLineTime = 7.0;
function OnNotificationChatLine(tParams) {
  if (ChatLinesPanel == null) return;
  let localPlayerID = Players.GetLocalPlayer();
  if (tParams.player_id == undefined || tParams.player_id == null) return;
  if (Players.GetTeam(localPlayerID) != Players.GetTeam(tParams.player_id) && !Players.IsSpectator(localPlayerID)) return;
  let Label = $.CreatePanel("Label", ChatLinesPanel, "");
  Label.AddClass("ChatLine");
  Label.html = true;
  Label.hittest = false;
  Label.hittestchildren = false;
  if (tParams.team_only == 1) {
    Label.SetDialogVariable("target", GetLocalization("#DOTA_ChatTarget_GameAllies"));
    Label.SetDialogVariable("sender_class", "GameAlliesChat");
  } else {
    Label.SetDialogVariable("target", GetLocalization("#DOTA_ChatTarget_GameAll"));
    Label.SetDialogVariable("sender_class", "GameAllChat");
  }
  let tPlayerInfo = Game.GetPlayerInfo(tParams.player_id);
  Label.SetDialogVariable("hero_badge_icon", "<panel class='HeroBadge'/>");
  Label.SetDialogVariable("hero_icon", "<img class='HeroIcon' src='file://{images}/heroes/" + (tPlayerInfo?.player_selected_hero ?? "") + ".png'>");
  Label.SetDialogVariable("player_color_class", "PlayerColor" + tParams.player_id);
  Label.SetDialogVariable("event_crest", "");
  Label.SetDialogVariable("battle_cup_icon", "");
  Label.SetDialogVariable("new_player_icon", "");
  Label.SetDialogVariable("persona", tPlayerInfo?.player_name ?? "");
  Label.SetDialogVariable("message", formatMessage(Label, tParams));
  let sText = GetLocalization("#DOTA_ChatMessage_HudAll", "", Label);
  if (tParams.team_only == 1) {
    sText = GetLocalization("#DOTA_ChatMessage_Hud", "", Label);
  }
  Label.text = sText;
  let time = Game.Time() + ChatLineTime;
  let removeClass = function () {
    Label.RemoveClass("Expired");
    if (Game.Time() < time) $.Schedule(0, removeClass);
  };
  removeClass();
  Game.EmitSound("Chat.Team.Received");
  if (tParams.player_id == localPlayerID) {
    Game.EmitSound("ui_chat_msg_send");
  }
}
const pPlaceNameContainer = $("#PlaceNameContainer");
let NameSchedule = -1;
function OnShowPlaceName(event) {
  pPlaceNameContainer.FindChild("PlaceName").text = GetLocalization("#" + event.text);
  pPlaceNameContainer.RemoveClass("Show");
  pPlaceNameContainer.AddClass("Show");
  if (NameSchedule != -1) {
    $.CancelScheduled(NameSchedule);
  }
  NameSchedule = $.Schedule(event.duration, () => {
    NameSchedule = -1;
    pPlaceNameContainer.RemoveClass("Show");
  });
}
(function () {
  let HUD = $.GetContextPanel()?.GetParent()?.GetParent()?.GetParent();
  if (HUD != undefined && HUD != null) {
    combat_events = HUD.FindChildTraverse("combat_events");
    ChatLinesPanel = HUD.FindChildTraverse("HudChat")?.FindChildTraverse("ChatLinesPanel") || null;
  }
  update();
  UpdateSingleAction(UpperNotificationSeq);
  GameEvents.Subscribe("notification_upper", OnNotificationUpper);
  GameEvents.Subscribe("notification_combat", OnNotificationCombat);
  GameEvents.Subscribe("notification_chat_line", OnNotificationChatLine);
  GameEvents.Subscribe("ShowPlaceName", OnShowPlaceName);
})();