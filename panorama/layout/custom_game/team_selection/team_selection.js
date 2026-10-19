--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


const HUD = {
	CONTEXT: $.GetContextPanel(),
	TEAMS_ROOT: $("#TS_TeamsRoot"),
	UNASSIGNED_ROOT: $("#UnassignedPlayersContainer"),
	WEBM_ROOT: $("#TS_Tips_WebContainer"),
	HINT_MOVIE: $("#TS_VideoHint"),
	BULLETS_ROOT: $("#TS_Tips_Bullets"),
	GAME_OPTIONS_ROOT: $("#VoteOptionsButtons"),
};
const multiline_selection_teams_per_line = {
	// map_name: 4,
};

let allow_team_selection = false;

function GetPlayerPanel(player_id) {
	if (!players_panels[player_id]) {
		const player_panel = $.CreatePanel("Panel", HUD.UNASSIGNED_ROOT, `TS_Player_${player_id}`);
		player_panel.BLoadLayoutSnippet("TS_Player");
		players_panels[player_id] = player_panel;
		player_panel.SetHasClass("BLocalPlayer", player_id == LOCAL_PLAYER_ID);

		const player_info = Game.GetPlayerInfo(player_id);
		if (player_info) {
			const player_info_root = player_panel.FindChild("TS_PlayerInfo");
			const player_avatar = player_info_root.GetChild(0);
			const player_name = player_info_root.GetChild(1);

			player_avatar.steamid = player_info.player_steamid;
			player_name.steamid = player_info.player_steamid;
		}
	}
	return players_panels[player_id];
}
function CreateEmptySlot(root, team_id) {
	const empty_slot = $.CreatePanel("Button", root, ``);
	empty_slot.BLoadLayoutSnippet("TS_Player");
	empty_slot.AddClass("Empty");
}

function OnLeaveTeamPressed() {
	Game.PlayerJoinTeam(DOTATeam_t.DOTA_TEAM_NOTEAM);
}
function UpdateTeamPanel(team_panel) {
	const team_id = team_panel.GetAttributeInt("team_id", -1);
	const team_players = Game.GetPlayerIDsOnTeam(team_id);
	team_panel.player_list.RemoveAndDeleteChildren();
	team_players.forEach((player_id) => {
		GetPlayerPanel(player_id).SetParent(team_panel.player_list);
	});

	const team_max_players = GameUI.BASE_TEAM_SIZE;
	for (var empty_idx = team_players.length; empty_idx < team_max_players; ++empty_idx)
		CreateEmptySlot(team_panel.player_list, team_id);

	team_panel.SetHasClass("BTeamFull", team_players.length == team_max_players);
}
function OnTeamPlayerListChanged() {
	players_panels.forEach((player_panel) => {
		player_panel.SetParent(HUD.UNASSIGNED_ROOT);
	});
	const unassigned_players = Game.GetUnassignedPlayerIDs();
	$.Msg("unassigned_players");
	JSON.print(unassigned_players);
	unassigned_players.forEach((unassigned_player_id) => {
		GetPlayerPanel(unassigned_player_id);
	});
	let slots = [];
	team_panels.forEach((team_panel) => {
		UpdateTeamPanel(team_panel);
		slots = slots.concat(team_panel.player_list.Children());
	});

	// if (!allow_team_selection) {
	// 	let team_shuffle = 2;
	// 	let total_players = 0;
	// 	let max_players = GameUI.BASE_TEAM_SIZE * 2;
	// 	slots.forEach((s) => {
	// 		const team_root = $(`#TS_Team_${team_shuffle}`).player_list;
	// 		s.SetParent(team_root);
	//
	// 		team_shuffle = team_shuffle == 2 ? 3 : 2;
	//
	// 		if (s.id) {
	// 			team_root.MoveChildBefore(s, team_root.GetChild(0));
	// 			total_players++;
	// 		} else {
	// 			if (max_players > total_players) total_players++;
	// 			else s.DeleteAsync(0);
	// 		}
	// 	});
	// }

	HUD.CONTEXT.SetHasClass("BHasUnassignedPlayers", unassigned_players.length > 0);
}
function OnPlayerSelectedTeam(player_id, team_id, b_success) {
	if (player_id != LOCAL_PLAYER_ID) return;

	Game.EmitSound(`ui_team_select_pick_team${b_success ? "" : "_failed"}`);
}
let team_panels = [];
let players_panels = [];
function CreateTeams() {
	// var all_teams_ids = Game.GetAllTeamIDs();
	var all_teams_ids = [2, 3];
	var spectator = CustomNetTables.GetTableValue("game_options", "spectator_slots");
	if (spectator && spectator[1] && spectator[1] == 1) all_teams_ids.push(1);

	let teams_line = $.CreatePanel("Panel", HUD.TEAMS_ROOT, "");
	let multilines = multiline_selection_teams_per_line[MAP_NAME];
	all_teams_ids.forEach((team_id, idx) => {
		if (multilines && idx > 0 && idx % multilines == 0) {
			teams_line = $.CreatePanel("Panel", HUD.TEAMS_ROOT, "");
		}
		const team_root = $.CreatePanel("Panel", teams_line, `TS_Team_${team_id}`);
		team_root.BLoadLayoutSnippet("TS_Team");
		team_root.player_list = team_root.FindChildTraverse("TS_Team_Players_List");
		team_root.SetAttributeInt("team_id", team_id);
		team_root.SetDialogVariable("team_name", $.Localize(Game.GetTeamDetails(team_id).team_name).toUpperCase());
		team_panels.push(team_root);

		team_root.SetPanelEvent("onactivate", () => {
			// Game.PlayerJoinTeam(team_id);
		});
		team_root.AddClass(`Team_${team_id}`);
	});
}
function AutoAssign() {
	Game.AutoAssignPlayersToTeams();
}
function ShuffleTeams() {
	Game.ShufflePlayerTeamAssignments();
}
function LockAndStart() {
	if (Game.GetUnassignedPlayerIDs().length > 0) return;
	Game.SetTeamSelectionLocked(true);
	Game.SetRemainingSetupTime(4);
}
function UnlockTeams() {
	Game.SetTeamSelectionLocked(false);
	Game.SetRemainingSetupTime(-1);
	Game.SetAutoLaunchEnabled(false);
}

function CheckAutoAssign() {
	if (Game.GetTeamSelectionLocked()) AutoAssign();
}

function IsShowLobbyTools() {
	let players_in_lobby = 0;
	for (let player_id = 0; player_id < DOTALimits_t.DOTA_MAX_TEAM_PLAYERS; player_id++) {
		const player_info = Game.GetPlayerInfo(player_id);
		if (!player_info) continue;
		players_in_lobby++;
	}

	// return false;
	return players_in_lobby < GameUI.MAX_PLAYERS || Game.IsInToolsMode();
}

function CheckPrivileges() {
	var player_info = Game.GetLocalPlayerInfo();
	if (!player_info) return;
	HUD.CONTEXT.SetHasClass("BShowUnassigned", IsShowLobbyTools());
	HUD.CONTEXT.SetHasClass("BShowHostElements", player_info.player_has_host_privileges && IsShowLobbyTools());
	HUD.CONTEXT.SetHasClass("BShowUnlock", player_info.player_has_host_privileges && IsShowLobbyTools());
}
function UpdateSchedule() {
	HUD.CONTEXT.SetHasClass("BTeamsLocked", Game.GetTeamSelectionLocked());
	HUD.CONTEXT.SetHasClass(
		"BLocalLobby",
		(CustomNetTables.GetTableValue("game_options", "dedicated")?.state || 0) == 0,
	);
	HUD.CONTEXT.SetHasClass("BToolsMode", Game.IsInToolsMode());

	if (Game.GameStateIsAfter(DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP)) return;
	$.Schedule(0.1, UpdateSchedule);
}

const GAME_OPTIONS = [
	"game_option_super_towers",
	"game_option_no_trolls_kick",
	"game_option_no_bonus_for_weak_team",
	"game_option_no_winrate_gold_bonus",
	//"game_option_no_mmr_sort",
];
const votes_for_init_option = GameUI.BASE_TEAM_SIZE;

function InitGameOptions() {
	HUD.GAME_OPTIONS_ROOT.RemoveAndDeleteChildren();

	GAME_OPTIONS.forEach((option_name, index) => {
		const new_option = $.CreatePanel("Panel", HUD.GAME_OPTIONS_ROOT, `GameOption_${index}`);
		new_option.BLoadLayoutSnippet("VoteOption");

		new_option.progress = new_option.FindChildTraverse("VO_ProgressBar");

		new_option.SetDialogVariableLocString("vo_name", option_name);
		new_option.SetDialogVariableInt("votes_count", 0);
		new_option.SetDialogVariableInt("votes_for_init_option", votes_for_init_option);

		new_option.SetPanelEvent("onactivate", function () {
			GameEvents.SendToServerEnsured("PlayerVoteForGameOption", { id: index });
		});
		new_option.SetPanelEvent("onmouseover", function () {
			$.DispatchEvent("DOTAShowTextTooltip", new_option, $.Localize(`${option_name}_tooltip`));
		});
	});

	SubscribeToNetTableKey("game_state", "game_options", (game_options) => {
		Object.entries(game_options).forEach(([id, votes]) => {
			const option_panel = $(`#GameOption_${id}`);
			if (!option_panel) return;

			option_panel.progress.value = votes / votes_for_init_option;

			option_panel.SetDialogVariableInt("votes_count", votes);
			option_panel.SetHasClass("BVoteEnable", votes >= votes_for_init_option);
		});
	});
}

function AllowTeamSelection() {
	HUD.CONTEXT.SetHasClass("InstaLoading", false);
	allow_team_selection = true;
}

(() => {
	HUD.CONTEXT.GetParent().style.margin = "0px";
	HUD.CONTEXT.AddClass(MAP_NAME);

	HUD.TEAMS_ROOT.RemoveAndDeleteChildren();
	HUD.UNASSIGNED_ROOT.RemoveAndDeleteChildren();

	allow_team_selection = MAP_NAME == "dota_tournament";

	CreateTeams();
	OnTeamPlayerListChanged();
	CheckAutoAssign();
	CheckPrivileges();
	UpdateSchedule();
	// InitGameOptions();

	$.RegisterForUnhandledEvent("DOTAGame_TeamPlayerListChanged", OnTeamPlayerListChanged);
	$.RegisterForUnhandledEvent("DOTAGame_PlayerSelectedCustomTeam", OnPlayerSelectedTeam);

	GameEvents.SubscribeProtected("GameMode:allow_team_selection", AllowTeamSelection);

	// HUD.CONTEXT.SetHasClass("InstaLoading", MAP_NAME == "dota");
	HUD.CONTEXT.SetHasClass("InstaLoading", false);
})();