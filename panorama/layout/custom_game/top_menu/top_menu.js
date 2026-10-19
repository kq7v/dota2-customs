--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


const HUD = {
	CONTEXT: $.GetContextPanel(),
	LINES: $("#CTM_Lines"),
};

function HideDefaultButtons() {
	const menu = FindDotaHudElement("MenuButtons");
	for (const b of menu.Children()) b.visible = false;
}
function CloseTopBanner(name) {
	HUD.CONTEXT.AddClass(`BClose_${name}`);
}
function OpenTopBanner(name) {
	HUD.CONTEXT.RemoveClass(`BClose_${name}`);
}
function CloseChatWheelBanner() {
	CloseTopBanner("ChatWheelNewPromo");
}
function OpenChatWheelTab() {
	GameUI.Collection.OpenSpecificTab("chat_wheel");
	CloseChatWheelBanner();
}

function CloseMailBanner() {
	CloseTopBanner("NewMail");
}
function OpenMail() {
	GameUI.ToggleMailPanel();
	CloseMailBanner();
}

function ToggleDisconnectWarning() {
	if (Game.GameStateIsBefore(DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) && !Game.IsInToolsMode()) {
		GameEvents.SendEventClientSide("dota_hud_error_message", {
			splitscreenplayer: 0,
			reason: 80,
			message: "ctb_disconnect_error",
		});
		return;
	}
	HUD.CONTEXT.ToggleClass("BShowDisconnectWarning");
}
function HideDisconnectWarning() {
	HUD.CONTEXT.SetHasClass("BShowDisconnectWarning", false);
}

GameUI.OpenTopBanner = OpenTopBanner;
GameUI.CloseTopBanner = CloseTopBanner;

(() => {
	CloseTopBanner("NewMail");
	CloseTopBanner("ChatWheelNewPromo");
	HideDefaultButtons();
})();