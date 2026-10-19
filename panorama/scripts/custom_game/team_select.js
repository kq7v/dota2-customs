--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


// Global list of panels representing each of the teams
var g_TeamPanels = [];

// Global list of panels representing each of the players (1 per-player). These are reparented
// to the appropriate team panel to indicate which team the player is on.
var g_PlayerPanels = [];

var g_TEAM_SPECATOR = 1;

//--------------------------------------------------------------------------------------------------
// Handeler for when the unssigned players panel is clicked that causes the player to be reassigned
// to the unssigned players team
//--------------------------------------------------------------------------------------------------
function OnLeaveTeamPressed() {
	Game.PlayerJoinTeam(DOTATeam_t.DOTA_TEAM_NOTEAM);
}


//--------------------------------------------------------------------------------------------------
// Handler for when the Lock and Start button is pressed
//--------------------------------------------------------------------------------------------------
function OnLockAndStartPressed() {
	// Don't allow a forced start if there are unassigned players
	if (Game.GetUnassignedPlayerIDs().length > 0)
		return;

	// 引擎只认主机的客户端调用，所以有主机权限的玩家保留原来的调用
	var localPlayerInfo = Game.GetLocalPlayerInfo();
	if (localPlayerInfo && localPlayerInfo.player_has_host_privileges) {
		// Lock the team selection so that no more team changes can be made
		Game.SetTeamSelectionLocked(true);

		// Disable the auto start count down
		Game.SetAutoLaunchEnabled(false);

		// Set the remaining time before the game starts
		Game.SetRemainingSetupTime(4);
	}

	// 任何玩家点击都通知服务器，由服务器统一锁队伍并开始倒计时
	GameEvents.SendCustomGameEventToServer("request_start_game", {});
}


//--------------------------------------------------------------------------------------------------
// Handler for when the Cancel and Unlock button is pressed
//--------------------------------------------------------------------------------------------------
function OnCancelAndUnlockPressed() {
	var localPlayerInfo = Game.GetLocalPlayerInfo();
	if (localPlayerInfo && localPlayerInfo.player_has_host_privileges) {
		// Unlock the team selection, allowing the players to change teams again
		Game.SetTeamSelectionLocked(false);

		// Stop the countdown timer
		Game.SetRemainingSetupTime(-1);
	}

	// 任何玩家点击都通知服务器取消开始
	GameEvents.SendCustomGameEventToServer("request_cancel_start", {});
}


//--------------------------------------------------------------------------------------------------
// Handler for the auto assign button being pressed
//--------------------------------------------------------------------------------------------------
function OnAutoAssignPressed() {
	// Assign all of the currently unassigned players to a team, trying
	// to keep any players that are in a party on the same team.
	Game.AutoAssignPlayersToTeams();
	Game.SetAutoLaunchEnabled(false);
}


//--------------------------------------------------------------------------------------------------
// Handler for the shuffle player teams button being pressed
//--------------------------------------------------------------------------------------------------
function OnShufflePlayersPressed() {
	// Shuffle the team assignments of any players which are assigned to a team, 
	// this will not assign any players to a team which are currently unassigned. 
	// This will also not attempt to keep players in a party on the same team.
	Game.ShufflePlayerTeamAssignments();
}


//--------------------------------------------------------------------------------------------------
// Find the player panel for the specified player in the global list or create the panel if there 
// is not already one in the global list. Make the new or existing panel a child panel of the 
// specified parent panel
//--------------------------------------------------------------------------------------------------
function FindOrCreatePanelForPlayer(playerId, parent) {
	// Search the list of player player panels for one witht the specified player id
	for (var i = 0; i < g_PlayerPanels.length; ++i) {
		var playerPanel = g_PlayerPanels[i];

		if (playerPanel.GetAttributeInt("player_id", -1) == playerId) {
			playerPanel.SetParent(parent);
			return playerPanel;
		}
	}

	// Create a new player panel for the specified player id if an existing one was not found
	var newPlayerPanel = $.CreatePanel("Panel", parent, "player_root");
	newPlayerPanel.SetAttributeInt("player_id", playerId);
	newPlayerPanel.BLoadLayout("file://{resources}/layout/custom_game/team_select_player.xml", false, false);

	// Add the panel to the global list of player planels so that we will find it next time
	g_PlayerPanels.push(newPlayerPanel);

	return newPlayerPanel;
}


//--------------------------------------------------------------------------------------------------
// Find player slot n in the specified team panel
//--------------------------------------------------------------------------------------------------
function FindPlayerSlotInTeamPanel(teamPanel, playerSlot) {
	var playerListNode = teamPanel.FindChildInLayoutFile("PlayerList");
	if (playerListNode == null)
		return null;

	var nNumChildren = playerListNode.GetChildCount();
	for (var i = 0; i < nNumChildren; ++i) {
		var panel = playerListNode.GetChild(i);
		if (panel.GetAttributeInt("player_slot", -1) == playerSlot) {
			return panel;
		}
	}

	return null;
}


//--------------------------------------------------------------------------------------------------
// Update the specified team panel ensuring that it has all of the players currently assigned to its
// team and the the remaining slots are marked as empty
//--------------------------------------------------------------------------------------------------
function UpdateTeamPanel(teamPanel) {
	// Get the id of team this panel is displaying
	var teamId = teamPanel.GetAttributeInt("team_id", -1);
	if (teamId <= 0)
		return;

	// Add all of the players currently assigned to the team 
	var teamPlayers = Game.GetPlayerIDsOnTeam(teamId);
	for (var i = 0; i < teamPlayers.length; ++i) {
		var playerSlot = FindPlayerSlotInTeamPanel(teamPanel, i);
		playerSlot.RemoveAndDeleteChildren();
		FindOrCreatePanelForPlayer(teamPlayers[i], playerSlot);
	}

	// Fill in the remaining player slots with the empty slot indicator
	var teamDetails = Game.GetTeamDetails(teamId);
	var nNumPlayerSlots = teamDetails.team_max_players;
	for (var i = teamPlayers.length; i < nNumPlayerSlots; ++i) {
		var playerSlot = FindPlayerSlotInTeamPanel(teamPanel, i);
		if (playerSlot.GetChildCount() == 0) {
			var empty_slot = $.CreatePanel("Panel", playerSlot, "player_root");
			empty_slot.BLoadLayout("file://{resources}/layout/custom_game/team_select_empty_slot.xml", false, false);
		}
	}

	// Change the display state of the panel to indicate the team is full
	teamPanel.SetHasClass("team_is_full", (teamPlayers.length === teamDetails.team_max_players));

	// If the local player is on this team change team panel to indicate this
	var localPlayerInfo = Game.GetLocalPlayerInfo()
	if (localPlayerInfo) {
		var localPlayerIsOnTeam = (localPlayerInfo.player_team_id === teamId);
		teamPanel.SetHasClass("local_player_on_this_team", localPlayerIsOnTeam);
	}
}


//--------------------------------------------------------------------------------------------------
// Update the unassigned players list and all of the team panels whenever a change is made to the
// player team assignments
//--------------------------------------------------------------------------------------------------
function OnTeamPlayerListChanged() {
	var unassignedPlayersContainerNode = $("#UnassignedPlayersContainer");
	if (unassignedPlayersContainerNode === null)
		return;

	// Move all existing player panels back to the unassigned player list
	for (var i = 0; i < g_PlayerPanels.length; ++i) {
		var playerPanel = g_PlayerPanels[i];
		playerPanel.SetParent(unassignedPlayersContainerNode);
	}

	// Make sure all of the unassigned player have a player panel 
	// and that panel is a child of the unassigned player panel.
	var unassignedPlayers = Game.GetUnassignedPlayerIDs();
	for (var i = 0; i < unassignedPlayers.length; ++i) {
		var playerId = unassignedPlayers[i];
		FindOrCreatePanelForPlayer(playerId, unassignedPlayersContainerNode);
	}

	// Update all of the team panels moving the player panels for the
	// players assigned to each team to the corresponding team panel.
	for (var i = 0; i < g_TeamPanels.length; ++i) {
		UpdateTeamPanel(g_TeamPanels[i])
	}

	// Set the class on the panel to indicate if there are any unassigned players
	$("#GameAndPlayersRoot").SetHasClass("unassigned_players", unassignedPlayers.length != 0);
	$("#GameAndPlayersRoot").SetHasClass("no_unassigned_players", unassignedPlayers.length == 0);
}


//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
function OnPlayerSelectedTeam(nPlayerId, nTeamId, bSuccess) {
	$.Msg('OnPlayerSelectedTeam: ' + nPlayerId + '-->' + nTeamId);
	var playerInfo = Game.GetLocalPlayerInfo();
	if (!playerInfo)
		return;

	// Check to see if the event is for the local player
	if (playerInfo.player_id === nPlayerId) {
		// Play a sound to indicate success or failure
		if (bSuccess) {
			Game.EmitSound("ui_team_select_pick_team");
		}
		else {
			Game.EmitSound("ui_team_select_pick_team_failed");
		}
	}
}


//--------------------------------------------------------------------------------------------------
// Check to see if the local player has host privileges and set the 'player_has_host_privileges' on
// the root panel if so, this allows buttons to only be displayed for the host.
//--------------------------------------------------------------------------------------------------
function CheckForHostPrivileges() {
	var playerInfo = Game.GetLocalPlayerInfo();
	if (!playerInfo)
		return;

	// Set the "player_has_host_privileges" class on the panel, this can be used 
	// to have some sub-panels on display or be enabled for the host player.
	$.GetContextPanel().SetHasClass("player_has_host_privileges", playerInfo.player_has_host_privileges);
}


//--------------------------------------------------------------------------------------------------
// Update the state for the transition timer periodically
//--------------------------------------------------------------------------------------------------
function UpdateTimer() {
	var gameTime = Game.GetGameTime();
	var transitionTime = Game.GetStateTransitionTime();

	CheckForHostPrivileges();

	var mapInfo = Game.GetMapInfo();
	$("#MapInfo").SetDialogVariable("map_name", mapInfo.map_display_name);

	if (transitionTime >= 0) {
		$("#StartGameCountdownTimer").SetDialogVariableInt("countdown_timer_seconds", Math.max(0, Math.floor(transitionTime - gameTime)));
		$("#StartGameCountdownTimer").SetHasClass("countdown_active", true);
		$("#StartGameCountdownTimer").SetHasClass("countdown_inactive", false);
	}
	else {
		$("#StartGameCountdownTimer").SetHasClass("countdown_active", false);
		$("#StartGameCountdownTimer").SetHasClass("countdown_inactive", true);
	}

	var autoLaunch = Game.GetAutoLaunchEnabled();
	$("#StartGameCountdownTimer").SetHasClass("auto_start", autoLaunch);
	$("#StartGameCountdownTimer").SetHasClass("forced_start", (autoLaunch == false));

	// Allow the ui to update its state based on team selection being locked or unlocked
	$.GetContextPanel().SetHasClass("teams_locked", Game.GetTeamSelectionLocked());
	$.GetContextPanel().SetHasClass("teams_unlocked", Game.GetTeamSelectionLocked() == false);

	$.Schedule(0.1, UpdateTimer);
}


//--------------------------------------------------------------------------------------------------
// Entry point called when the team select panel is created
//--------------------------------------------------------------------------------------------------

// 禁用洗牌
$('#ShuffleTeamAssignmentButton').style.visibility = 'collapse';

// 显示模式名字和模式规则信息
$("#GameModeNameLabel").text = $.Localize('#'+'txt_gamemode_' + Game.GetMapInfo().map_display_name);
$("#MapInfoLabel").text = $.Localize('#'+'txt_gamemode_' + Game.GetMapInfo().map_display_name + '_desc');

var bShowSpectatorTeam = false;

// 不自动开始
Game.SetAutoLaunchEnabled(false);

// Automatically assign players to teams.
Game.AutoAssignPlayersToTeams();

// 显示玩家名字
showPlyaerName();
function showPlyaerName(){
	for (var i = 0; i <= 3; i++) {
		var playerdata = Game.GetPlayerInfo(i);
		if (playerdata && playerdata.player_steamid) {
			$('#team_select_player_panel_' + i).SetHasClass('invisible', false);
			$('#team_select_player_avatar_' + i).steamid = playerdata.player_steamid;
			$('#team_select_player_name_' + i).steamid = playerdata.player_steamid;
			if (playerdata.player_has_host_privileges) {
				$('#team_select_player_star_' + i).SetHasClass('invisible', false);
			}
			else {
				$('#team_select_player_star_' + i).SetHasClass('invisible', true);
			}
		}
		else {
			$('#team_select_player_panel_' + i).SetHasClass('invisible', true);
		}
	}
}


// get any custom config
if (GameUI.CustomUIConfig().team_select) {
	var cfg = GameUI.CustomUIConfig().team_select;
	if (cfg.bShowSpectatorTeam !== undefined) {
		bShowSpectatorTeam = cfg.bShowSpectatorTeam;
	}
	if (cfg.bAutoAssignTeams !== undefined) {
		bAutoAssignTeams = cfg.bAutoAssignTeams;
	}
}

$("#TeamSelectContainer").SetAcceptsFocus(true); // Prevents the chat window from taking focus by default
var teamsListRootNode = $("#TeamsListRoot");

// Construct the panels for each team
var allTeamIDs = Game.GetAllTeamIDs();

if (bShowSpectatorTeam) {
	allTeamIDs.unshift(g_TEAM_SPECATOR);
}

for (var teamId of allTeamIDs) {
	var teamNode = $.CreatePanel("Panel", teamsListRootNode, "");
	teamNode.AddClass("team_" + teamId); // team_1, etc.
	teamNode.SetAttributeInt("team_id", teamId);
	teamNode.BLoadLayout("file://{resources}/layout/custom_game/team_select_team.xml", false, false);

	// Add the team panel to the global list so we can get to it easily later to update it
	g_TeamPanels.push(teamNode);
}

// Do an initial update of the player team assignment
OnTeamPlayerListChanged();

// Start updating the timer, this function will schedule itself to be called periodically
UpdateTimer();

// Register a listener for the event which is brodcast when the team assignment of a player is actually assigned
$.RegisterForUnhandledEvent("DOTAGame_TeamPlayerListChanged", OnTeamPlayerListChanged);

// Register a listener for the event which is broadcast whenever a player attempts to pick a team
$.RegisterForUnhandledEvent("DOTAGame_PlayerSelectedCustomTeam", OnPlayerSelectedTeam);

CustomNetTables.SubscribeNetTableListener("player_info_table", OnPlayerInfoUpdate);
GameEvents.Subscribe("player_choose_hero", OnPlayerChooseHero);
GameEvents.SendCustomGameEventToServer("player_start_team_select", {});



var local_id;
var click_cd = false;

var MY_INFO = null;
// 接收用户信息，展示英雄选择界面
function OnPlayerInfoUpdate(table,key,data) {
	$('#team-block-title').SetHasClass('invisible',false);
	$('#team-block-inner').SetHasClass('invisible',false);
	$('#panel_start_button').SetHasClass('invisible',false);
	$('#panel_connect_autochess_server').SetHasClass('invisible',true);

	// 展示我的英雄列表选择
	var local_id = Game.GetPlayerInfo(Players.GetLocalPlayer()).player_steamid;
 
	if (key == 'player_info_'+local_id){
		// 是我的信息
		MY_INFO = data;
		MY_INFO['onduty_hero'] = MY_INFO['onduty_hero']['hero_id'];
		fill_my_hero_list();
		$('#select-board').style['position'] = '0px 0px 0px';

		// 选中onduty_hero
		GameEvents.SendCustomGameEventToServer("player_request_choose_hero", {
			"hero": MY_INFO['onduty_hero'],
		});
	}
	showPlyaerName();
}
function OnPlayerChooseHero(keys) {

	// 展示此用户信息对应的玩家列表
	var player_id = keys.player_id;
	var onduty_hero_info = keys.onduty_hero_info;

	if ($('#team_select_player_hero_info_' + player_id)) {
		$('#team_select_player_hero_info_' + player_id).RemoveAndDeleteChildren();

		CreateChildren($('#team_select_player_hero_info_' + player_id), GetOneHeroXML(onduty_hero_info, false, false, player_id));
		// if (data.rank_info) {
		// 	if (data.rank_info.all_level || data.rank_info.all_level == 0) {
		// 		$('#team_select_player_level_all_' + data.player_id).SetImage('file://{images}/custom_game/rank/all_rank_' + data.rank_info.all_level + '.png');
		// 	}
		// 	// if (data.rank_info.coop_level||data.rank_info.coop_level==0){
		// 	// 	$('#team_select_player_level_coop_'+data.player_id).SetImage('file://{images}/custom_game/rank/coop_rank_'+data.rank_info.coop_level+'.png');
		// 	// }
		// 	// if (data.rank_info.race_level||data.rank_info.race_level==0){
		// 	// 	$('#team_select_player_level_race_'+data.player_id).SetImage('file://{images}/custom_game/rank/race_rank_'+data.rank_info.race_level+'.png');
		// 	// }
		// }
	}
}

function GetPlayerCount() {
	var count = 0;
	for (var i = 0; i <= 7; i++) {
		var playerdata = Game.GetPlayerInfo(i);
		if (playerdata) {
			count++;
		}
	}
	return count;
}

function sort_hero_list(hero_list_obj) {
	if (!hero_list_obj) {
		return [];
	}
	var sort_array = [];
	for (var i in hero_list_obj) {
		var h = hero_list_obj[i];
		var hero_rarity = parseInt(i.slice(1, 2));
		var ability_count = 0;
		for (var k in h.ability) {
			ability_count++;
		}
		var ability_slot_count_extend = parseInt(h.extend || 0);
		var ability_slot_count = hero_rarity + ability_slot_count_extend;
		if (ability_slot_count > 4){
			ability_slot_count = 4
		}
		var empty_slot_count = ability_slot_count - ability_count;

		sort_array.push({
			hero_id: i,
			hero_number: parseInt(i.slice(1, 4)),
			hero_name: GEM_HERO_LIST[i] || '',
			effect: h.effect || '',
			hero_rarity: hero_rarity,
			extend: h.extend || 0,
			ability: h.ability,
			ability_count: ability_count,
			ability_slot_count: ability_slot_count,
			empty_slot_count: empty_slot_count,
			rank_info: MY_INFO['rank_info'],
		});
	}

	sort_array.sort(function (a, b) {
		var score_b = 0;
		var score_a = 0;

		if (a.hero_number) {
			score_a += a.hero_number * 1000000;
		}
		if (b.hero_number) {
			score_b += b.hero_number * 1000000;
		}
		return score_b - score_a;
	});

	return sort_array;
}
function find_hero_index_by_hero_id(hero_list, hero_id) {
	for (var i = 0; i < hero_list.length; i++) {
		var h = hero_list[i];
		if (h.hero_id == hero_id) {
			return i;
		}
	}
	return -1;
}

function fill_my_hero_list() {
	var hero_list, onduty_index;
	var hero_list = MY_INFO['hero_sea'];

	// 排序英雄并整理数据
	hero_list = sort_hero_list(hero_list);
	var onduty_hero = MY_INFO['onduty_hero'];
	onduty_index = find_hero_index_by_hero_id(hero_list, onduty_hero);


	var hero_list_xml = '<Panel class="my_courier_list_line">';
	for (var i = 0; i < hero_list.length; i++) {
		var hero = hero_list[i];
		var is_onduty = false;
		if (i == onduty_index) {
			is_onduty = true;
		}

		var one_hero_xml = GetOneHeroXML(hero, is_onduty, true, i);
		hero_list_xml += one_hero_xml;

		if (i >= 99) {
			break;
		}
	}
	hero_list_xml += '</Panel>';

	$('#select-block-inner').RemoveAndDeleteChildren();
	// $('#select-block-inner').BCreateChildren(hero_list_xml);
	CreateChildren($('#select-block-inner'), hero_list_xml);
}

function choose_hero(hero) {

	MY_INFO['onduty_hero'] = hero;
	fill_my_hero_list();

	GameEvents.SendCustomGameEventToServer("player_request_choose_hero", {
		"hero": hero,
	});

	// if (click_cd) {
	// 	return;
	// }
	// var url = 'http://gemtd.ppbizon.com/gemtd/hero/save/' + hero + '@' + local_id + '?hehe=' + Math.random();
	// $.AsyncWebRequest(url,
	// {
	// 	type: 'GET',
	// 	success: function (a) {
	// 		// click_cd = true;
	// 		RefreshHeroInfo(true);
	// 	}
	// });
}

function GetOneHeroXML(hero, is_onduty, is_click, i) {
	var text = '';
	var hero_id = hero.hero_id;
	var hero_name = GEM_HERO_LIST[hero_id];
	var effect = hero.effect;
	var ability = hero.ability;
	var empty_slot_count = hero.empty_slot_count;

	text += '<Panel class="my_courier_list_one ';
	if (is_onduty) {
		text += ' selected';
	}
	text += '" id="my_courier_list_' + i + '" ';
	if (is_click) {
		text += 'onactivate = "choose_hero(\'' + hero_id + '\');"';
	}
	text += '>';

	if (is_onduty) {
		// 当前英雄
		text += '<DOTAHeroMovie class="my_courier_list_one_left" heroname="' + hero_name + '">';
		text += '<Panel class="icon_equiped icon_one_equiped"/>';
		text += '</DOTAHeroMovie>';
	}
	else {
		text += '<DOTAHeroMovie class="my_courier_list_one_left" heroname="' + hero_name + '">';
		text += '</DOTAHeroMovie>';
	}

	text += '<Panel class="my_courier_list_one_right">';

	text += '<Panel class="my_courier_list_one_right_line1" >';

	text += '<Label text="' + $.Localize('#'+hero_name) + '" style="color:' + COLOR_STR[hero_id.slice(1, 2)] + ';"/>';
	if (effect) {
		text += '<Panel class="icon_effect" style="margin-left:5px;margin-top:2px;background-color:' + COLOR[effect.slice(1, 2)] + ';"/>';
		// text += '<Label text="'+$.Localize('#'+effect)+'" style="color:'+COLOR_STR[effect.slice(1,2)]+';"/>';
	}
	text += '</Panel>';

	text += '<Panel class="my_courier_list_one_right_line2">';
	text += '<Label text="Lv.1" />';
	text += '</Panel>';

	text += '</Panel>';

	text += '<Panel class="my_courier_list_one_right_right">';
	if (ability) {
		for (var a in ability) {
			text += '<Panel class="my_courier_list_one_right_right_one">';
			text += '<Panel class="my_courier_list_one_right_right_one_line1">';
			text += '<DOTAAbilityImage class="icon_ability" abilityname="' + GEM_ABILITY_LIST[a] + '" style="margin-top:5px;margin-left:0px;width:40px;height:40px;"/>';
			text += '</Panel>';
			text += '<Panel class="my_courier_list_one_right_right_one_line2">';
			var ability_icon = '□□□□';
			if (ability[a] == 1) {
				ability_icon = '■□□□';
			}
			if (ability[a] == 2) {
				ability_icon = '■■□□';
			}
			if (ability[a] == 3) {
				ability_icon = '■■■□';
			}
			if (ability[a] == 4) {
				ability_icon = '■■■■';
			}
			text += '<Label text="' + ability_icon + '" style="horizontal-align:center;"/>';

			text += '</Panel>';
			text += '</Panel>';
		}
	}
	for (var b = 0; b < empty_slot_count; b++) {
		text += '<Panel class="my_courier_list_one_right_right_one">';
		text += '<Panel class="my_courier_list_one_right_right_one_line1">';
		text += '<DOTAAbilityImage class="icon_ability" abilityname="empty1" style="margin-top:5px;margin-left:0px;width:40px;height:40px;"/>';
		text += '</Panel>';
		text += '<Panel class="my_courier_list_one_right_right_one_line2">';
		// var ability_icon = '□□□□';
		// text += '<Label text="'+ability_icon+'" style="horizontal-align:center;"/>';
		text += '</Panel>';
		text += '</Panel>';
	}
	text += '</Panel>';



	text += '</Panel>';

	return text;
}