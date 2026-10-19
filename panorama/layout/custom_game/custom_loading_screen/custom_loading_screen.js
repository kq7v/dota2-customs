--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


const TIP_AUTO_TIMER = 15;
const TIPS_LIST = ["chat_wheel"].concat(
	[
		"towers",
		"kicktroll",
		"respawn",
		"disablehelp",
		"mute",
		"wisdom",
		"fountain",
		"itemtransfer",
		"perks",
		"nerfed",
		"savefavs",
		"mmr_balance",
		"nerfed2",
		"nerfed3",
		"nerfed4",
		"surrender",
		"gem",
		"rapier",
	].sort(() => Math.random() - 0.5),
);

const HUD = {
	CONTEXT: $.GetContextPanel(),
	TIP_IMAGE: $("#LoadingTipImage"),
	PLAYERS_LIST: $("#LoadingPlayers_List"),
	LS_HINT_TIMER_HEADER: $("#LS_StartTimer_Header"),
};

let TIP_SCHEDULE_TIMER;
let current_tip_idx = 0;

function SetHint(idx) {
	if (TIP_SCHEDULE_TIMER) $.CancelScheduled(TIP_SCHEDULE_TIMER);
	if (idx > TIPS_LIST.length - 1) idx = 0;

	HUD.TIP_IMAGE.SetImage(`file://{images}/custom_game/tips_icon/${TIPS_LIST[idx]}.png`);
	HUD.CONTEXT.SetDialogVariableLocString("loading_screen_tip_desc", `tip_${TIPS_LIST[idx]}`);
	HUD.CONTEXT.SetHasClass("BFirstTip", idx == 0);

	current_tip_idx = idx;
	TIP_SCHEDULE_TIMER = $.Schedule(TIP_AUTO_TIMER, function () {
		TIP_SCHEDULE_TIMER = undefined;
		NextHint();
	});
}
function PrevHint() {
	SetHint(current_tip_idx - 1);
}
function NextHint() {
	SetHint(current_tip_idx + 1);
}

let players = {};
let players_in_lobby = 0;
let players_loaded = {};
let loading_time_limit = 1800;
const LOADING_STATES_DATA = {
	[DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED]: "BState_Loaded",
	[DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED]: "BState_Failed",
	[DOTAConnectionState_t.DOTA_CONNECTION_STATE_FAILED]: "BState_Failed",
};

function UpdateTimer(force_value) {
	var game_time = Game.GetGameTime();
	var transition_time = Game.GetStateTransitionTime();

	if (transition_time >= 0)
		HUD.CONTEXT.SetDialogVariable("ls_hints_timer", FormatSeconds(Math.max(transition_time - game_time, 0)));
	else if (force_value) HUD.CONTEXT.SetDialogVariable("ls_hints_timer", FormatSeconds(force_value));

	HUD.CONTEXT.SetHasClass("BGameLaunch", transition_time >= 0);
	HUD.CONTEXT.SetHasClass(
		"BGameLoading",
		Game.GameStateIs(DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD),
	);
	HUD.CONTEXT.SetHasClass("BForceTimer", !!force_value);

	if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD))
		HUD.LS_HINT_TIMER_HEADER.text = $.Localize("#ls_hint_text_header_game_start");

	if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP)) return;
	if (!force_value) $.Schedule(0.1, UpdateTimer);
}

function GetDictionaryLengthByCondition(arr) {
	return Object.keys(arr).reduce((prev_value, key) => (prev_value += t[key] ? 1 : 0), 0);
}

function UpdatePlayersLoadState() {
	Object.entries(players).forEach(([player_id, panel]) => {
		const player_info = Game.GetPlayerInfo(parseInt(player_id));
		panel.SwitchClass("loading_state", LOADING_STATES_DATA[player_info.player_connection_state] || "BState_None");

		players_loaded[player_id] =
			player_info.player_connection_state == DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED || null;
	});

	const player_loaded_count = Object.values(players_loaded).filter((v) => v).length;

	HUD.CONTEXT.SetDialogVariableInt("players_loaded", player_loaded_count);
	HUD.CONTEXT.SetHasClass("BLoadingState", true);

	$.Schedule(0, () => {
		if (player_loaded_count < players_in_lobby) UpdatePlayersLoadState();
		else HUD.CONTEXT.SetHasClass("BLoadingState", false);
	});
}

function CreateLoadingPlayersPanel() {
	HUD.CONTEXT.AddClass(Game.GetMapInfo().map_display_name);

	HUD.PLAYERS_LIST.RemoveAndDeleteChildren();

	for (let player_id = 0; player_id < DOTALimits_t.DOTA_MAX_TEAM_PLAYERS; player_id++) {
		const player_info = Game.GetPlayerInfo(player_id);
		if (!player_info) continue;

		players_in_lobby++;

		const player_panel = $.CreatePanel("Panel", HUD.PLAYERS_LIST, `LS_PlayerLoading_${player_id}`);
		player_panel.BLoadLayoutSnippet("LS_Player");
		player_panel.SetHasClass("BLocalPlayer", player_id == Game.GetLocalPlayerID());
		players[player_id] = player_panel;

		const player_root_info = player_panel.FindChild("LS_PlayerInfo");
		player_root_info.GetChild(0).steamid = player_info.player_steamid;
		player_root_info.GetChild(1).steamid = player_info.player_steamid;
	}
	HUD.CONTEXT.SetDialogVariableInt("players_total", players_in_lobby);

	UpdatePlayersLoadState();
}

function InitLoadingScreenByLoadingState() {
	HUD.CONTEXT.SetDialogVariableLocString("game_mode_name", "ls_ndc_game_name");

	const player_info = Game.GetPlayerInfo(Game.GetLocalPlayerID());
	// MAP_NAME from utils cannot be used, because map info doesnt collected
	const map_name = Game.GetMapInfo().map_display_name;
	if (
		!player_info ||
		player_info.player_connection_state != DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED ||
		map_name == ""
	)
		return void $.Schedule(0.1, InitLoadingScreenByLoadingState);

	let insta_loading_mode = map_name != "dota_tournament";
	insta_loading_mode = false;
	HUD.CONTEXT.SetHasClass("InstaLoading", insta_loading_mode);
	HUD.CONTEXT.SwitchClass("map_name", map_name);
	if (insta_loading_mode)
		GameEvents.Subscribe("GameMode:update_setup_time", (data) => {
			UpdateTimer(data.event_data.remaining_time);
		});
	else UpdateTimer();

	CreateLoadingPlayersPanel();
}
GameUI.GetOption = (option_name) => {
	const table = CustomNetTables.GetTableValue("game_options", "host_options");
	return table ? table[option_name] || false : false;
};

function CheckLocalLobbyStateLS() {
	if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP)) return;

	let dedicated_state = CustomNetTables.GetTableValue("game_options", "dedicated")?.state || 0;

	HUD.CONTEXT.SetHasClass("BToolsMode", Game.IsInToolsMode());
	HUD.CONTEXT.SwitchClass("local-lobby-state", `BLobby_${dedicated_state === 0 ? "Local" : "Dedicated"}`);

	UpdateChatState(dedicated_state);
	$.Schedule(0, CheckLocalLobbyStateLS);
}

function UpdateChatState(dedicated_state = 0) {
	const chat = FindDotaHudElementInLS("LoadingScreenChat");
	if (!chat) return;

	chat.visible = !!dedicated_state;
}

(() => {
	InitLoadingScreenByLoadingState();
	CheckLocalLobbyStateLS();

	$.Schedule(0.2, () => {
		SetHint(current_tip_idx);
	});

	FindDotaHudElementInLS("SidebarAndBattleCupLayoutContainer").visible = false;
})();