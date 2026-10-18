--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


const ContextPanel = $.GetContextPanel()
const main = $.GetContextPanel
$.GetContextPanel = () => main() || ContextPanel
var dotahud = $.GetContextPanel().GetParent().GetParent().GetParent().GetParent();

var levels =
[
	0,
	10,
	20,
	30,
	40,
	50,

	60,
	70,
	80,
	90,
	100,
	110,

	120,
	130,
	140,
	150,
	160,
	170,

	180,
	190,
	200,
	210,
	220,
	230,
	240,

	250,
	260,
	270,
	280,
	290,

	300,
]

const heroesId = 
{
    npc_dota_hero_antimage: 1,
    npc_dota_hero_axe: 2,
    npc_dota_hero_bane: 3,
    npc_dota_hero_bloodseeker: 4,
    npc_dota_hero_crystal_maiden: 5,
    npc_dota_hero_drow_ranger: 6,
    npc_dota_hero_earthshaker: 7,
    npc_dota_hero_juggernaut: 8,
    npc_dota_hero_mirana: 9,
    npc_dota_hero_nevermore: 11,
    npc_dota_hero_morphling: 10,
    npc_dota_hero_phantom_lancer: 12,
    npc_dota_hero_puck: 13,
    npc_dota_hero_pudge: 14,
    npc_dota_hero_razor: 15,
    npc_dota_hero_sand_king: 16,
    npc_dota_hero_storm_spirit: 17,
    npc_dota_hero_sven: 18,
    npc_dota_hero_tiny: 19,
    npc_dota_hero_vengefulspirit: 20,
    npc_dota_hero_windrunner: 21,
    npc_dota_hero_zuus: 22,
    npc_dota_hero_kunkka: 23,
    npc_dota_hero_lina: 25,
    npc_dota_hero_lich: 31,
    npc_dota_hero_lion: 26,
    npc_dota_hero_shadow_shaman: 27,
    npc_dota_hero_slardar: 28,
    npc_dota_hero_tidehunter: 29,
    npc_dota_hero_witch_doctor: 30,
    npc_dota_hero_riki: 32,
    npc_dota_hero_enigma: 33,
    npc_dota_hero_tinker: 34,
    npc_dota_hero_sniper: 35,
    npc_dota_hero_necrolyte: 36,
    npc_dota_hero_warlock: 37,
    npc_dota_hero_beastmaster: 38,
    npc_dota_hero_queenofpain: 39,
    npc_dota_hero_venomancer: 40,
    npc_dota_hero_faceless_void: 41,
    npc_dota_hero_skeleton_king: 42,
    npc_dota_hero_death_prophet: 43,
    npc_dota_hero_phantom_assassin: 44,
    npc_dota_hero_pugna: 45,
    npc_dota_hero_templar_assassin: 46,
    npc_dota_hero_viper: 47,
    npc_dota_hero_luna: 48,
    npc_dota_hero_dragon_knight: 49,
    npc_dota_hero_dazzle: 50,
    npc_dota_hero_rattletrap: 51,
    npc_dota_hero_leshrac: 52,
    npc_dota_hero_furion: 53,
    npc_dota_hero_life_stealer: 54,
    npc_dota_hero_dark_seer: 55,
    npc_dota_hero_clinkz: 56,
    npc_dota_hero_omniknight: 57,
    npc_dota_hero_enchantress: 58,
    npc_dota_hero_huskar: 59,
    npc_dota_hero_night_stalker: 60,
    npc_dota_hero_broodmother: 61,
    npc_dota_hero_bounty_hunter: 62,
    npc_dota_hero_weaver: 63,
    npc_dota_hero_jakiro: 64,
    npc_dota_hero_batrider: 65,
    npc_dota_hero_chen: 66,
    npc_dota_hero_spectre: 67,
    npc_dota_hero_doom_bringer: 69,
    npc_dota_hero_ancient_apparition: 68,
    npc_dota_hero_ursa: 70,
    npc_dota_hero_spirit_breaker: 71,
    npc_dota_hero_gyrocopter: 72,
    npc_dota_hero_alchemist: 73,
    npc_dota_hero_invoker: 74,
    npc_dota_hero_silencer: 75,
    npc_dota_hero_obsidian_destroyer: 76,
    npc_dota_hero_lycan: 77,
    npc_dota_hero_brewmaster: 78,
    npc_dota_hero_shadow_demon: 79,
    npc_dota_hero_lone_druid: 80,
    npc_dota_hero_chaos_knight: 81,
    npc_dota_hero_meepo: 82,
    npc_dota_hero_treant: 83,
    npc_dota_hero_ogre_magi: 84,
    npc_dota_hero_undying: 85,
    npc_dota_hero_rubick: 86,
    npc_dota_hero_disruptor: 87,
    npc_dota_hero_nyx_assassin: 88,
    npc_dota_hero_naga_siren: 89,
    npc_dota_hero_keeper_of_the_light: 90,
    npc_dota_hero_wisp: 91,
    npc_dota_hero_visage: 92,
    npc_dota_hero_slark: 93,
    npc_dota_hero_medusa: 94,
    npc_dota_hero_troll_warlord: 95,
    npc_dota_hero_centaur: 96,
    npc_dota_hero_magnataur: 97,
    npc_dota_hero_shredder: 98,
    npc_dota_hero_bristleback: 99,
    npc_dota_hero_tusk: 100,
    npc_dota_hero_skywrath_mage: 101,
    npc_dota_hero_abaddon: 102,
    npc_dota_hero_elder_titan: 103,
    npc_dota_hero_legion_commander: 104,
    npc_dota_hero_ember_spirit: 106,
    npc_dota_hero_earth_spirit: 107,
    npc_dota_hero_abyssal_underlord: 108,
    npc_dota_hero_terrorblade: 109,
    npc_dota_hero_phoenix: 110,
    npc_dota_hero_techies: 105,
    npc_dota_hero_oracle: 111,
    npc_dota_hero_winter_wyvern: 112,
    npc_dota_hero_arc_warden: 113,
    npc_dota_hero_monkey_king: 114,
    npc_dota_hero_dark_willow: 119,
    npc_dota_hero_pangolier: 120,
    npc_dota_hero_grimstroke: 121,
    npc_dota_hero_hoodwink: 123,
    npc_dota_hero_void_spirit: 126,
    npc_dota_hero_snapfire: 128,
    npc_dota_hero_mars: 129,
    npc_dota_hero_dawnbreaker: 135,
    npc_dota_hero_marci: 136,
    npc_dota_hero_primal_beast: 137,
    npc_dota_hero_muerta: 138,
    npc_dota_hero_kez: 145,
};

function init() 
{
	if (IsSpectator())
	{
		return
	}

	GameEvents.Subscribe_custom("pick_start", pick_start)
	GameEvents.Subscribe_custom("pick_select_hero", pick_select_hero)
	GameEvents.Subscribe_custom("reload_pick_heroes", reload_pick_heroes)
	GameEvents.Subscribe_custom("pick_end", end_pick)
	GameEvents.Subscribe_custom("pick_start_time", pick_start_time)
	GameEvents.Subscribe_custom("change_time", change_time)
	GameEvents.Subscribe_custom("change_random", change_random)
	InitHeroSearch()
	var InfoText = $.GetContextPanel().FindChildTraverse("InfoText")
}

function Player_Loaded() 
{
	if (IsSpectator()) 
	{
		$.GetContextPanel().AddClass('Deletion');
		$.GetContextPanel().style.opacity = "0"
		return
	}
	check_connection()

	GameEvents.OnLoaded(() => {
		WaitForHeroDataAndStart(0)
	})
}

function WaitForHeroDataAndStart(attempt)
{
	if (Game.GetState() >= DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS)
	{
		end_pick()
		return
	}
	const pick_state = Game.GetCustomTable("custom_pick", "pick_state")

	if (!pick_state || pick_state.in_progress)
	{
		// Данные героев (custom tables) могут ещё не прийти — например, если игрок
		// свернул игру во время загрузки и запрос таблиц ушёл позже. В этом случае
		// pick_load_heroes() читает undefined и пик открывается пустым. Ждём hero_list.
		const hero_list = Game.GetCustomTable("custom_pick", "hero_list")
		if (!hero_list && attempt < 300)
		{
			$.Schedule(0.1, function() { WaitForHeroDataAndStart(attempt + 1) })
			return
		}

		pick_load_heroes()
		pick_start()
		UpdateStoreBackgroundHS()
		CheckArenaDifficultyState()
	}
	else
	{
		end_pick()
	}
}

function check_connection() 
{
	for (var id = 0; id <= 8; id++) 
	{
		if (Players.GetPlayerSelectedHero(id) != 'invalid index') 
		{
			var playerInfo = Game.GetPlayerInfo(id);
			var icon = $.GetContextPanel().FindChildTraverse("player_icon" + id)

			if (icon && playerInfo) 
			{
				var connect = icon.FindChildTraverse("hero_connect" + id)
				var state = playerInfo.player_connection_state

				if (!connect && (state == DOTAConnectionState_t.DOTA_CONNECTION_STATE_DISCONNECTED || state == DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED)) 
				{
					connect = $.CreatePanel("Panel", icon, "hero_connect" + id)
					connect.AddClass("hero_disconnect")
				}

				if (connect && playerInfo.player_connection_state == DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED) 
				{
					connect.DeleteAsync(0)
				}

				if (playerInfo.player_connection_state == DOTAConnectionState_t.DOTA_CONNECTION_STATE_ABANDONED) {
					icon.AddClass("hero_abandon")
				}
			}
		}
	}

	$.Schedule(0.2, function() {
		const pick_state = Game.GetCustomTable("custom_pick", "pick_state")
		if (!pick_state || pick_state.in_progress)
		{
			check_connection()
		}
	})
}

function StealButtons() {
	if ($.GetContextPanel().BHasClass('Deletion')) return;

	var buttons = dotahud.FindChildTraverse("PreGame").FindChildTraverse('DashboardButton');
	if (buttons) {
	
		buttons.SetParent($.GetContextPanel());
	}
	
	buttons = dotahud.FindChildTraverse("PreGame").FindChildTraverse('SettingsButton');
	if (buttons) {
		buttons.SetParent($.GetContextPanel());
	}
}

function RestoreButtons() 
{
	var HudElements = dotahud.FindChildTraverse("MenuButtons").FindChildTraverse('ButtonBar');

	if (HudElements == undefined)
	{
		$.Schedule(0.5, function() 
		{
			RestoreButtons()
		})
	}

	//var buttons = dotahud.FindChildTraverse('DashboardButton');
	//if (buttons) 
	//{
	//	buttons.SetParent(HudElements);
	//	HudElements.MoveChildBefore(buttons, HudElements.FindChildTraverse("ToggleScoreboardButton"))
	//}
	//buttons = dotahud.FindChildTraverse('SettingsButton');
	//if (buttons) 
	//{
	//	buttons.SetParent(HudElements);
	//	HudElements.MoveChildBefore(buttons, HudElements.FindChildTraverse("ToggleScoreboardButton"))
	//}
}

var PICK_CONTENT_HIDE_TIME = 1.8
var PICK_CURTAIN_SHOW_DELAY = 0.3
var PICK_SCREEN_FADE_DELAY = 2.2
var PICK_SCREEN_DELETE_DELAY = 3.4
var pick_loading_active = false

function end_pick()
{
	ResetHeroSearch()
	$.DispatchEvent("DropInputFocus")
	if (Game.GetState() >= DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS)
	{
		ClosePickInRunningGame()
		return
	}
	ShowPickLoadingScreen()
}

function ClosePickInRunningGame()
{
	if (pick_loading_active) { return }
	pick_loading_active = true
	$.GetContextPanel().AddClass("PickLoading")
	$.GetContextPanel().style.opacity = "0"
	$.GetContextPanel().DeleteAsync(0)
}

function CreatePickLoadingCurtain()
{
	var curtain = $.CreatePanel("Panel", $.GetContextPanel(), "PickLoadingScreen")
	curtain.AddClass("PickLoadingScreen")
	curtain.hittest = false
	curtain.hittestchildren = false

	var player_data = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()))
	if (player_data && player_data.background_id && typeof Background_Images !== "undefined" && Background_Images[player_data.background_id])
	{
		curtain.style.backgroundImage = 'url("' + Background_Images[player_data.background_id] + '")'
		curtain.style.backgroundSize = "cover"
		curtain.style.backgroundPosition = "50% 50%"
	}
	else
	{
		$.CreatePanel("MoviePanel", curtain, "", {class: "PickLoadingMovie", src: "file://{resources}/videos/custom_game/woda_loading.webm", repeat: "true", controls: "none", autoplay: "onload", hittest: "false"})
	}

	var content = $.CreatePanel("Panel", curtain, "")
	content.AddClass("PickLoadingContent")

	var spinner = $.CreatePanel("Panel", content, "")
	spinner.AddClass("PickLoadingSpinner")

	var label = $.CreatePanel("Label", content, "")
	label.AddClass("PickLoadingLabel")
	label.text = $.Localize("#donate_shop_loading") + ".."

	curtain.SetParent($.GetContextPanel().GetParent().GetParent().GetParent())
	return curtain
}

function FadeOutPickContent()
{
	var panels = $.GetContextPanel().FindChildrenWithClassTraverse("custom_pick_general")
	for (var i = 0; i < panels.length; i++)
	{
		panels[i].style.opacity = "0"
	}
}

function GetPickLoadingCurtain()
{
	var root = $.GetContextPanel()
	while (root.GetParent())
	{
		root = root.GetParent()
	}
	return root.FindChildTraverse("PickLoadingScreen")
}

function ShowPickLoadingScreen()
{
	if (pick_loading_active) { return }
	pick_loading_active = true

	if (!GetPickLoadingCurtain())
	{
		CreatePickLoadingCurtain()
	}

	$.GetContextPanel().AddClass("PickBrighten")
	FadeOutPickContent()

	$.Schedule(PICK_CURTAIN_SHOW_DELAY, function()
	{
		var curtain = GetPickLoadingCurtain()
		if (curtain)
		{
			curtain.AddClass("Show")
			curtain.style.opacity = "1"
		}
	})

	$.Schedule(PICK_CONTENT_HIDE_TIME, function()
	{
		$.GetContextPanel().AddClass("PickLoading")
		RestoreButtons()
	})

	$.Schedule(PICK_SCREEN_FADE_DELAY, function()
	{
		$.GetContextPanel().style.opacity = "0"
	})

	$.Schedule(PICK_SCREEN_DELETE_DELAY, function()
	{
		$.GetContextPanel().DeleteAsync(0)
	})
}

function RandomHero() {
	Game.EmitSound("ui.pick_select")
	GameEvents.SendCustomGameEventToServer_custom("chose_hero", 
	{
		random: true,
		hero: "npc_dota_hero_wisp",
		
	});
	Refresh_Button()
	Refresh_Random_Button()
}

var hero_selected = ''

function pick_start_time(kv)
{
	var hero_panel = $.GetContextPanel().FindChildTraverse("player" + kv.id)

	if (Game.GetLocalPlayerID() == kv.id)
	{
		$.Schedule(1, function()
        {
			Game.EmitSound("UI.Your_turn")
		})

		if (hero_selected !== '')
		{
			RefreshButtonUntilActive(0)
		}
		return
	}

	if (hero_selected !== '')
	{
		Refresh_Button()
		Refresh_Random_Button()
	}
}

function RefreshButtonUntilActive(attempt)
{
	Refresh_Button()
	Refresh_Random_Button()
	var active_player = Game.GetCustomTable("custom_pick", "active_player");
	if ((!active_player || active_player.id !== Game.GetLocalPlayerID()) && attempt < 20)
	{
		$.Schedule(0.05, function() { RefreshButtonUntilActive(attempt + 1) })
	}
}

function change_time(kv) 
{
	var timer = $.GetContextPanel().FindChildTraverse("pick_timer")

	if (timer) 
	{
		if (Game.GetLocalPlayerID() == kv.id) 
        {
			if (kv.time == 10) 
            {
				Game.EmitSound("UI.Pick_10_sec")
			}
			if (kv.time == 5) 
            {
				Game.EmitSound("UI.Pick_5_sec")
			}
			if (kv.time < 5) 
            {
				Game.EmitSound("General.ButtonClick");
			}
		}
		timer.text = String(kv.time)
	}

	var difficulty_timer = $.GetContextPanel().FindChildTraverse("ArenaDifficultyTimer")
	if (difficulty_timer)
	{
		difficulty_timer.text = String(kv.time)
	}

    StealButtons()
}

function CreatePlayerPanel(parent, pid)
{
    let has_player_child = $.CreatePanel("Panel", parent, "player" + pid);
    has_player_child.AddClass("player_portrait")
    
    let hero_icon = $.CreatePanel("Panel", has_player_child, "player_icon" + pid);
    hero_icon.AddClass("hero_icon")
    hero_icon.backgroundSize = "100%"

    if (pid == Game.GetLocalPlayerID()) 
    {
        hero_icon.AddClass("player_portrait_local")
    }
    else if (Players.GetTeam(Number(pid)) == Players.GetTeam(Game.GetLocalPlayerID()))
    {
        hero_icon.AddClass("player_portrait_local_team")
    }

    let TournamentPlayerSelected = $.CreatePanel("Panel", has_player_child, "TournamentPlayerSelected");
    TournamentPlayerSelected.AddClass("TournamentPlayerSelected")
    
    let player_portrait_text = $.CreatePanel("Label", has_player_child, "nicname" + pid);
    player_portrait_text.text = Players.GetPlayerName(parseInt(pid))
    player_portrait_text.AddClass("player_portrait_text")

    if (Game.GetMapInfo().map_display_name == "rating_300" || Game.GetMapInfo().map_display_name == "rating_duo_300")
    {
        let player_rating_panel = $.CreatePanel("Panel", has_player_child, "player_rating" + pid);
        player_rating_panel.AddClass("player_rating")

        let player_rating_label = $.CreatePanel("Label", player_rating_panel, "player_rating_label" + pid);
        player_rating_label.text = "0"
        player_rating_label.AddClass("player_rating_label")

        GetRatingInfo(player_rating_label, pid)
    }
}

function GetRatingInfo(panel, pid)
{
    let woda_player_data = Game.GetCustomTable("woda_player_data", String(pid))
    if (woda_player_data)
    {
        panel.text = woda_player_data.rating
        if (woda_player_data.rating < 300)
        {
            panel.style.color = "red"
        } 
    }
    if (!woda_player_data)
    {
        $.Schedule(1, function()
        {
            GetRatingInfo(panel, pid)
        })
    }
}

function pick_start() 
{
	StealButtons()
	ResetHeroSearch()
	HeroSearchFocus()
	var lobby_heroes = $.GetContextPanel().FindChildTraverse("lobby_players")
	var player_list = Game.GetCustomTable("custom_pick", "player_lobby");

	var player_portraits = []
	var player_icon = []
    var hero_tier = []
	var player_nic = []

	var pick_order = []
	var pick_order_id = []

	if (player_list) {
		const players = Object.entries(player_list.lobby_players).map(([pid, data]) => [pid, data.pick_order]).sort((a, b) => a[1] - b[1])
		for (const [pid, i] of players) 
        {
			let has_player_child = lobby_heroes.FindChildTraverse( "player" + pid)
			if (!has_player_child)
			{
				CreatePlayerPanel(lobby_heroes, pid)
			}
		}
	}

	let player_table = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()))
	if (player_table)
	{
		if (player_table.last_leave == 1 && (Game.GetMapInfo().map_display_name.includes("rating")))
		{
			$("#PlayerLeavedPanel").style.visibility = "visible"
		} else if ( (Number(player_table.has_report_kill) > 0) || (Number(player_table.has_report_random) > 0) && (Game.GetMapInfo().map_display_name.includes("rating")))
		{
			$("#PlayerBanPanel").style.visibility = "visible"
		}
	}
}

GameEvents.Subscribe_custom("event_player_select_tournament_mode_announce", event_player_select_tournament_mode_announce)
function event_player_select_tournament_mode_announce(data)
{
    var lobby_heroes = $.GetContextPanel().FindChildTraverse("lobby_players")
    let player_panel = lobby_heroes.FindChildTraverse("player" + data.pid)
    if (player_panel)
    {
        let TournamentPlayerSelected = player_panel.FindChildTraverse("TournamentPlayerSelected")
        TournamentPlayerSelected.style.visibility = "visible"
    }
}

GameEvents.Subscribe_custom("event_tournament_mode_announce_clear", event_tournament_mode_announce_clear)
function event_tournament_mode_announce_clear()
{
    let lobby_players = $("#lobby_players")
    for (let child of lobby_players.Children())
    {
        let TournamentPlayerSelected = child.FindChildTraverse("TournamentPlayerSelected")
        TournamentPlayerSelected.style.visibility = "collapse"
    }
}

GameEvents.Subscribe_custom("UpdatePlayersOrdersList", UpdatePlayersOrdersList)
function UpdatePlayersOrdersList()
{
    var lobby_heroes = $.GetContextPanel().FindChildTraverse("lobby_players")
    lobby_heroes.RemoveAndDeleteChildren()
	var player_list = Game.GetCustomTable("custom_pick", "player_lobby");
	var player_portraits = []
	var player_icon = []
	var player_nic = []

	if (player_list) 
    {
		const players = Object.entries(player_list.lobby_players).map(([pid, data]) => [pid, data.pick_order]).sort((a, b) => a[1] - b[1])
		for (const [pid, i] of players) 
        {
			let has_player_child = lobby_heroes.FindChildTraverse( "player" + pid)
			if (!has_player_child)
			{
				CreatePlayerPanel(lobby_heroes, pid)
			}
		}
	}
}

GameEvents.Subscribe_custom("enable_tournament_button_player", enable_tournament_button_player)
function enable_tournament_button_player()
{
    if (Game.GetMapInfo().map_display_name.includes("rating"))
    {
        $("#TournamentActivateButton").visible = true
    }
}

GameEvents.Subscribe_custom("disable_tournament_button_player", disable_tournament_button_player)
function disable_tournament_button_player()
{
    if (Game.GetMapInfo().map_display_name.includes("rating"))
    {
        $("#TournamentActivateButton").visible = false
    }
}

function TournamentModeEnable()
{
    GameEvents.SendCustomGameEventToServer_custom("PlayerChooseTournamentMode", {});
    $("#TournamentActivateButton").visible = false
}
 
function ShowHero(panel, hero) 
{
	panel.SetPanelEvent('onmouseover', function() 
	{
		$.CreatePanel("MoviePanel", $.GetContextPanel(), 'portrait_' + hero, {
			class: "hero_portrait_hover",
			src: "file://{resources}/videos/heroes/" + hero + ".webm",
			repeat: "true",
			hittest: "false",
			autoplay: "onload"
		});

		var m = Game.GetScreenHeight() / 1080
		var pos = panel.GetPositionWithinWindow()
		var portrait_panel = $.GetContextPanel().FindChild('portrait_' + hero)
		portrait_panel.SetPositionInPixels(pos.x / m, pos.y / m, 0)
	});

	panel.SetPanelEvent('onmouseout', function() {
		var movie = $.GetContextPanel().FindChild('portrait_' + hero + '')
		if (movie) {
			movie.DeleteAsync(0)
		}
	})
}

GameEvents.Subscribe_custom("update_buy_heroes_from_lua", update_buy_heroes_from_lua)

function update_buy_heroes_from_lua() 
{
	$("#StrengthSelector").RemoveAndDeleteChildren()
	$("#AgilitySelector").RemoveAndDeleteChildren()
	$("#IntellectSelector").RemoveAndDeleteChildren()
	$("#AllSelector").RemoveAndDeleteChildren()

	const hero_list = Game.GetCustomTable("custom_pick", "hero_list");
	if (!hero_list)
		return

	const hero_names_sorted = [...Object.keys(hero_list)].sort()
	for (const hero_name of hero_names_sorted) {
		const attribute = hero_list[hero_name]
		let selector, attribute_name
		switch (attribute) {
			case 0:
				selector = $("#StrengthSelector")
				attribute_name = "str"
				break
			case 1:
				selector = $("#AgilitySelector")
				attribute_name = "agi"
				break
			case 2:
				selector = $("#IntellectSelector")
				attribute_name = "int"
				break
			case 3:
				selector = $("#AllSelector")
				attribute_name = "all"
				break
			default:
				continue
		}
		var hero_creating = selector.FindChild(hero_name)
		if (hero_creating)
			continue
		var panel = $.CreatePanel("Panel", selector, hero_name)
		panel.AddClass("hero_select_panel")
		SetPSelectEvent(panel, hero_name, attribute_name)

		if (GetHeroInformation(String(hero_name), Players.GetLocalPlayer()) != null) {
			let info = GetHeroInformation(String(hero_name), Players.GetLocalPlayer())
			let hero_lvl = GetLevelByCoins(info.coins)
			let image_rank = $.CreatePanel("Panel", panel, "");
			image_rank.AddClass("image_rank_heroes");
			image_rank.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/' + GetHeroRankIcon(hero_lvl) + '.png")'
			image_rank.style.backgroundSize = "100%"
		}

		let is_donate_hero = false
		let has_hero = false

		var hero_list_donate = Game.GetCustomTable("custom_pick", "donate_heroes");
		if (hero_list_donate)
		{
			for (var d = 1; d <= Object.keys(hero_list_donate).length; d++)  
			{
	            if (hero_list_donate[d] == hero_name) 
	            {
	                is_donate_hero = true
	            }
	        }
		}

		var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
		if (player_data_info)
		{
			for (var d = 1; d <= Object.keys(player_data_info.donate_heroes).length; d++)  
			{
	            if (player_data_info.donate_heroes[d] && player_data_info.donate_heroes[d]["hero_name"] == hero_name && player_data_info.donate_heroes[d]["days"] > 0) 
	            {
	                has_hero = true
	            }
	        }
		}

		var port = $.CreatePanel("DOTAHeroImage", panel, 'hero_portrait', {
			heroname: hero_name,
			heroimagestyle: "portrait",
			scaling: "stretch-to-cover-preserve-aspect"
		})

		var level_container = $.CreatePanel("Panel", port, "")
		level_container.AddClass("level_container")

		panel.BLoadLayoutSnippet('hero_portrait')

		var locked_donate_icon = $.CreatePanel("Panel", panel, "")
		locked_donate_icon.AddClass("locked_donate_icon")

		if (is_donate_hero && !has_hero)
		{
			locked_donate_icon.style.visibility = "visible"
			panel.AddClass("donate_hero_locked")
		}

		let is_donate_free = false
		let is_donate_free_sub = false
		let donate_heroes_free = Game.GetCustomTable("custom_pick", "donate_heroes_free");
		if (donate_heroes_free)
		{
			for (var d = 1; d <= Object.keys(donate_heroes_free).length; d++)  
			{
	            if (donate_heroes_free[d]["hero"] == hero_name) 
	            {
	                is_donate_free = true
	                if (donate_heroes_free[d]["sub"] == 1) 
	            	{
	            		is_donate_free_sub = true
	            	}
	            }
	        }
		}

		if (is_donate_free && is_donate_hero)
		{
			if (is_donate_free_sub)
			{
				var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
				if (player_data_info)
				{
					if (player_data_info.plus_days > 0)
					{
						locked_donate_icon.style.visibility = "collapse"
						panel.RemoveClass("donate_hero_locked")
					}
				}
			} else {
				locked_donate_icon.style.visibility = "collapse"
				panel.RemoveClass("donate_hero_locked")
			}
			panel.AddClass("donate_hero_free")
		}

		ShowHero(panel, hero_name)
	}
	//RefreshBuYheroButton()
	UpdateArenaHeroCrystalMarks()
}

GameUI.CustomUIConfig().UpdateBuyHeroes = function UpdateBuyHeroes() 
{
	$("#StrengthSelector").RemoveAndDeleteChildren()
	$("#AgilitySelector").RemoveAndDeleteChildren()
	$("#IntellectSelector").RemoveAndDeleteChildren()
	$("#AllSelector").RemoveAndDeleteChildren()

	const hero_list = Game.GetCustomTable("custom_pick", "hero_list");
	if (!hero_list)
		return

	const hero_names_sorted = [...Object.keys(hero_list)].sort()
	for (const hero_name of hero_names_sorted) {
		const attribute = hero_list[hero_name]
		let selector, attribute_name
		switch (attribute) {
			case 0:
				selector = $("#StrengthSelector")
				attribute_name = "str"
				break
			case 1:
				selector = $("#AgilitySelector")
				attribute_name = "agi"
				break
			case 2:
				selector = $("#IntellectSelector")
				attribute_name = "int"
				break
			case 3:
				selector = $("#AllSelector")
				attribute_name = "all"
				break
			default:
				continue
		}
		var hero_creating = selector.FindChild(hero_name)
		if (hero_creating)
			continue
		var panel = $.CreatePanel("Panel", selector, hero_name)
		panel.AddClass("hero_select_panel")
		SetPSelectEvent(panel, hero_name, attribute_name)

		if (GetHeroInformation(String(hero_name), Players.GetLocalPlayer()) != null) {
			let info = GetHeroInformation(String(hero_name), Players.GetLocalPlayer())
			let hero_lvl = GetLevelByCoins(info.coins)
			let image_rank = $.CreatePanel("Panel", panel, "");
			image_rank.AddClass("image_rank_heroes");
			image_rank.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/' + GetHeroRankIcon(hero_lvl) + '.png")'
			image_rank.style.backgroundSize = "100%"
		}

		let is_donate_hero = false
		let has_hero = false

		var hero_list_donate = Game.GetCustomTable("custom_pick", "donate_heroes");
		if (hero_list_donate)
		{
			for (var d = 1; d <= Object.keys(hero_list_donate).length; d++)  
			{
	            if (hero_list_donate[d] == hero_name) 
	            {
	                is_donate_hero = true
	            }
	        }
		}

		var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
		if (player_data_info)
		{
			for (var d = 1; d <= Object.keys(player_data_info.donate_heroes).length; d++)  
			{
	            if (player_data_info.donate_heroes[d] && player_data_info.donate_heroes[d]["hero_name"] == hero_name && player_data_info.donate_heroes[d]["days"] > 0) 
	            {
	                has_hero = true
	            }
	        }
		}

		var port = $.CreatePanel("DOTAHeroImage", panel, 'hero_portrait', {
			heroname: hero_name,
			heroimagestyle: "portrait",
			scaling: "stretch-to-cover-preserve-aspect"
		})

		var level_container = $.CreatePanel("Panel", port, "")
		level_container.AddClass("level_container")

		panel.BLoadLayoutSnippet('hero_portrait')

		var locked_donate_icon = $.CreatePanel("Panel", panel, "")
		locked_donate_icon.AddClass("locked_donate_icon")

		if (is_donate_hero && !has_hero)
		{
			locked_donate_icon.style.visibility = "visible"
			panel.AddClass("donate_hero_locked")
		}

		let is_donate_free = false
		let is_donate_free_sub = false
		let donate_heroes_free = Game.GetCustomTable("custom_pick", "donate_heroes_free");
		if (donate_heroes_free)
		{
			for (var d = 1; d <= Object.keys(donate_heroes_free).length; d++)  
			{
	            if (donate_heroes_free[d]["hero"] == hero_name) 
	            {
	                is_donate_free = true
	                if (donate_heroes_free[d]["sub"] == 1) 
	            	{
	            		is_donate_free_sub = true
	            	}
	            }
	        }
		}

		if (is_donate_free && is_donate_hero)
		{
			if (is_donate_free_sub)
			{
				var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
				if (player_data_info)
				{
					if (player_data_info.plus_days > 0)
					{
						locked_donate_icon.style.visibility = "collapse"
						panel.RemoveClass("donate_hero_locked")
					}
				}
			} else {
				locked_donate_icon.style.visibility = "collapse"
				panel.RemoveClass("donate_hero_locked")
			}
			panel.AddClass("donate_hero_free")
		}

		ShowHero(panel, hero_name)
	}
	//RefreshBuYheroButton()
	UpdateArenaHeroCrystalMarks()
}
 
var HERO_LIST_INIT = false
function pick_load_heroes() 
{
    if (HERO_LIST_INIT) { return }
    HERO_LIST_INIT = true
	$("#StrengthSelector").RemoveAndDeleteChildren()
	$("#AgilitySelector").RemoveAndDeleteChildren()
	$("#IntellectSelector").RemoveAndDeleteChildren()
	$("#AllSelector").RemoveAndDeleteChildren()

	const hero_list = Game.GetCustomTable("custom_pick", "hero_list");
	if (!hero_list)
		return

	const hero_names_sorted = [...Object.keys(hero_list)].sort()
	for (const hero_name of hero_names_sorted) {
		const attribute = hero_list[hero_name]
		let selector, attribute_name
		switch (attribute) {
			case 0:
				selector = $("#StrengthSelector")
				attribute_name = "str"
				break
			case 1:
				selector = $("#AgilitySelector")
				attribute_name = "agi"
				break
			case 2:
				selector = $("#IntellectSelector")
				attribute_name = "int"
				break
			case 3:
				selector = $("#AllSelector")
				attribute_name = "all"
				break
			default:
				continue
		}
		var hero_creating = selector.FindChild(hero_name)
		if (hero_creating)
			continue
		var panel = $.CreatePanel("Panel", selector, hero_name)
		panel.AddClass("hero_select_panel")
		SetPSelectEvent(panel, hero_name, attribute_name)

		if (GetHeroInformation(String(hero_name), Players.GetLocalPlayer()) != null) 
		{
			let info = GetHeroInformation(String(hero_name), Players.GetLocalPlayer())
			let hero_lvl = GetLevelByCoins(info.coins)
			let image_rank = $.CreatePanel("Panel", panel, "");
			image_rank.AddClass("image_rank_heroes");
			image_rank.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/' + GetHeroRankIcon(hero_lvl) + '.png")'
			image_rank.style.backgroundSize = "100%"
		}

		let is_donate_hero = false
		let has_hero = false

		var hero_list_donate = Game.GetCustomTable("custom_pick", "donate_heroes");
		if (hero_list_donate)
		{
			for (var d = 1; d <= Object.keys(hero_list_donate).length; d++)  
			{
	            if (hero_list_donate[d] == hero_name) 
	            {
	                is_donate_hero = true
	            }
	        }
		}

		var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
		if (player_data_info)
		{
			for (var d = 1; d <= Object.keys(player_data_info.donate_heroes).length; d++)  
			{
	            if (player_data_info.donate_heroes[d] && player_data_info.donate_heroes[d]["hero_name"] == hero_name && player_data_info.donate_heroes[d]["days"] > 0) 
	            {
	                has_hero = true
	            }
	        }
		}

		var port = $.CreatePanel("DOTAHeroImage", panel, 'hero_portrait', {
			heroname: hero_name,
			heroimagestyle: "portrait",
			scaling: "stretch-to-cover-preserve-aspect"
		})

        let banned_overlay = $.CreatePanel("Panel", port, "")
        banned_overlay.AddClass("banned_overlay")

		var level_container = $.CreatePanel("Panel", port, "")
		level_container.AddClass("level_container")

		panel.BLoadLayoutSnippet('hero_portrait')
		

		var locked_donate_icon = $.CreatePanel("Panel", panel, "")
		locked_donate_icon.AddClass("locked_donate_icon")

		if (is_donate_hero && !has_hero)
		{
			locked_donate_icon.style.visibility = "visible"
			panel.AddClass("donate_hero_locked")
		}

		let is_donate_free = false
		let is_donate_free_sub = false
		let donate_heroes_free = Game.GetCustomTable("custom_pick", "donate_heroes_free");
		if (donate_heroes_free)
		{
			for (var d = 1; d <= Object.keys(donate_heroes_free).length; d++)  
			{
	            if (donate_heroes_free[d]["hero"] == hero_name) 
	            {
	                is_donate_free = true
	                if (donate_heroes_free[d]["sub"] == 1) 
	            	{
	            		is_donate_free_sub = true
	            	}
	            }
	        }
		}

		if (is_donate_free && is_donate_hero)
		{
			if (is_donate_free_sub)
			{
				var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
				if (player_data_info)
				{
					if (player_data_info.plus_days > 0)
					{
						locked_donate_icon.style.visibility = "collapse"
						panel.RemoveClass("donate_hero_locked")
					}
				}
			} else {
				locked_donate_icon.style.visibility = "collapse"
				panel.RemoveClass("donate_hero_locked")
			}
			panel.AddClass("donate_hero_free")
		}

		ShowHero(panel, hero_name)
	}
	UpdateArenaHeroCrystalMarks()
}

function reload_pick_heroes(data) 
{
	for (let i = 0; i <= Object.keys(data.lobby_players).length - 1; i++) 
    {
		let icon = $.GetContextPanel().FindChildTraverse(String(data.lobby_players[i].picked_hero))
		if (icon) 
        {
			icon.AddClass("hero_picked")
		}
		let left_hero = $.GetContextPanel().FindChildTraverse("player_icon" + String(i))
		if (left_hero) 
        {
            data.lobby_players[i].picked_hero = GetPortraitHero(data.lobby_players[i].picked_hero)
			left_hero.style.backgroundImage = "url('file://{images}/heroes/" + String(data.lobby_players[i].picked_hero) + ".png')"
			left_hero.style.backgroundSize = 'contain'
		}
	}
    let hero_list = Game.GetCustomTable("custom_pick", "player_list");
    for (let i = 1; i <= Object.keys(hero_list.banned_heroes).length; i++) 
    {
        if (hero_list.banned_heroes[i]) 
        {
            let icon = $.GetContextPanel().FindChildTraverse(String(hero_list.banned_heroes[i]))
            if (icon)
            {
                icon.AddClass("hero_banned")
            }
        }
    }
}

GameEvents.Subscribe_custom("ban_client_hero", ban_client_hero)
function ban_client_hero(data)
{
    let icon = $.GetContextPanel().FindChildTraverse(String(data.hero_name))
    if (icon) 
    {
		icon.AddClass("hero_banned")
	}

    var left_hero = $.GetContextPanel().FindChildTraverse("player_icon" + String(data.player_id))
	if (left_hero) 
	{
        let portrait = GetPortraitHero(data.hero)
		left_hero.style.backgroundImage = "url('file://{images}/heroes/" + GetPortraitHero(String(data.hero_name)) + ".png')" 
		left_hero.style.backgroundSize = 'contain'
        left_hero.AddClass("hero_banned")
	}
}

GameEvents.Subscribe_custom("ban_client_hero_reload", ban_client_hero_reload)
function ban_client_hero_reload()
{
    let lobby_players = $("#lobby_players")
    for (let child of lobby_players.Children())
    {
        let icon = child.GetChild(0)
        icon.style.backgroundImage = "url('')"
    }
}

function pick_select_hero(data) 
{
	var icon = $.GetContextPanel().FindChildTraverse(String(data.hero))

	if (icon) {
		icon.AddClass("hero_picked")
	}

	if (Game.GetLocalPlayerID() == data.id) 
	{
		Game.EmitSound("UI.Pick_Hero");
	}

	Game.EmitSound("UI.Pick_" + String(data.hero));

	var left_hero = $.GetContextPanel().FindChildTraverse("player_icon" + String(data.id))
	if (left_hero) 
	{
        let portrait = GetPortraitHero(data.hero)
        left_hero.RemoveClass("hero_banned")
		left_hero.style.backgroundImage = "url('file://{images}/heroes/" + String(portrait) + ".png')"
		left_hero.style.backgroundSize = 'contain'
	}
	if (GetHeroInformation(String(data.hero), data.id) != null) 
	{
		let info = GetHeroInformation(String(data.hero), data.id)
		let hero_lvl = GetLevelByCoins(info.coins)
		let image_rank = $.CreatePanel("Panel", left_hero, "");
		image_rank.AddClass("image_rank");
		image_rank.style.backgroundImage = 'url("file://{images}/custom_game/hero_rank/' + GetHeroRankIcon(hero_lvl) + '.png")'
		image_rank.style.backgroundSize = "100%"
	}
}

function GetLevelByCoins(coins) {
	let full_sum = 0
	let level_end = 30
	for (var cc = 0; cc <= Object.keys(levels).length; cc++) {
		full_sum = full_sum + levels[cc]
		if (coins < full_sum) {
			level_end = cc - 1
			break
		}
	}
	return level_end
}

function GetHeroInformation(hero, id) {
	let woda_player_data = Game.GetCustomTable("woda_player_data", String(id))
	if (woda_player_data) {
		for (var i = 1; i <= Object.keys(woda_player_data.heroes_level).length; i++) {
			if (woda_player_data.heroes_level[i]["hero"] == hero) {
				return woda_player_data.heroes_level[i]
			}
		}
	}
	return null
}

function GetHeroRankIcon(level) {
	if (level >= 30) {
		return "rank_6"
	} else if (level >= 25) {
		return "rank_5"
	} else if (level >= 18) {
		return "rank_4"
	} else if (level >= 12) {
		return "rank_3"
	} else if (level >= 6) {
		return "rank_2"
	} else if (level >= 1) {
		return "rank_1"
	} else {
		return "rank_0"
	}
}

function SetPSelectEvent(panel, hero, attribute) 
{
	panel.SetPanelEvent("onactivate", function() {
		ChangeHeroInfo(hero, attribute);
	});
	ApplyHeroSearchToPanel(panel, hero)
}



function RefreshBuYheroButton()
{
	let is_donate_hero = false
	let has_hero = false

	var hero_list_donate = Game.GetCustomTable("custom_pick", "donate_heroes");
	if (hero_list_donate) {
		for (var d = 1; d <= Object.keys(hero_list_donate).length; d++) {
			if (hero_list_donate[d] == hero_selected) {
				is_donate_hero = true
			}
		}
	}

	var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
	if (player_data_info) {
		for (var d = 1; d <= Object.keys(player_data_info.donate_heroes).length; d++) {
			if (player_data_info.donate_heroes[d] && player_data_info.donate_heroes[d]["hero_name"] == hero_selected && player_data_info.donate_heroes[d]["days"] > 0) {
				has_hero = true
			}
		}
	}

	let BuyHeroButton = $.GetContextPanel().FindChildTraverse("BuyHeroButton")

	if (BuyHeroButton != null && hero_selected != '') {
		if (is_donate_hero && !has_hero) {
			BuyHeroButton.SetHasClass("Hidden", false)
			BuyHeroButton.SetHasClass("Opacity", false)
			BuyHeroButton.SetHasClass("buy_hero_anim", true)
			SetDonateButtonHero(BuyHeroButton, hero_selected)
		} else {
			BuyHeroButton.SetHasClass("Hidden", true)
			BuyHeroButton.SetHasClass("Opacity", false)
			BuyHeroButton.SetHasClass("buy_hero_anim", false)
			SetDonateButtonHero(BuyHeroButton, null)
		}
	}
}

function Refresh_Random_Button() {

	var hero_list = Game.GetCustomTable("custom_pick", "player_list");
	var RandomHero_button = $.GetContextPanel().FindChildTraverse("SelectRandomHero")

	RandomHero_button.SetPanelEvent("onactivate", function() {});
	RandomHero_button.RemoveClass("SelectRandomHero_picked")
	RandomHero_button.RemoveClass("SelectRandomHero_visible")
	RandomHero_button.AddClass("SelectRandomHero_hidden")

	if (HasHero())
	{
		RandomHero_button.RemoveClass("SelectRandomHero_visible")
		RandomHero_button.RemoveClass("SelectRandomHero_hidden")
		RandomHero_button.AddClass("SelectRandomHero_picked")
		RandomHero_button.SetPanelEvent("onactivate", function() {});
		return
	}

	//RefreshBuYheroButton()

	var active_player = Game.GetCustomTable("custom_pick", "active_player");
	if (active_player)
	{
		if (active_player.id !== Game.GetLocalPlayerID()) {
			return
		}
	}


	RandomHero_button.RemoveClass("SelectRandomHero_picked")
	RandomHero_button.RemoveClass("SelectRandomHero_hidden")
	RandomHero_button.AddClass("SelectRandomHero_visible")
	RandomHero_button.SetPanelEvent("onactivate", function() {
		RandomHero();
	});
}


function Refresh_Button() 
{
	var ChoseHero = $.GetContextPanel().FindChildTraverse("ChoseHero")
	var hero_list = Game.GetCustomTable("custom_pick", "player_list");
	ChoseHero.RemoveClass("ChoseHero_visible")
	ChoseHero.RemoveClass("ChoseHero_picked")
	ChoseHero.AddClass("ChoseHero")
	if (HasHero())
	{
		ChoseHero.RemoveClass("ChoseHero")
		ChoseHero.AddClass("ChoseHero_picked")
		ChoseHero.SetPanelEvent("onactivate", function() {});
		return
	} 

	var active_player = Game.GetCustomTable("custom_pick", "active_player");
	if (active_player.id !== Game.GetLocalPlayerID()) 
	{
		return
	}  

	if (hero_list) 
    {
        if (hero_list.picked_heroes)
        {
            for (var i = 1; i <= Object.keys(hero_list.picked_heroes).length; i++) 
            {
                if (hero_list.picked_heroes[i] == hero_selected) 
                {
                    ChoseHero.RemoveClass("ChoseHero")
                    ChoseHero.AddClass("ChoseHero_picked")
                    ChoseHero.SetPanelEvent("onactivate", function() {});
                    return
                }
            }
        }
        if (hero_list.banned_heroes)
        {
            for (var i = 1; i <= Object.keys(hero_list.banned_heroes).length; i++) 
            {
                if (hero_list.banned_heroes[i] == hero_selected) 
                {
                    ChoseHero.RemoveClass("ChoseHero")
                    ChoseHero.AddClass("ChoseHero_picked")
                    ChoseHero.SetPanelEvent("onactivate", function() {});
                    return
                }
            }
        }
	}

	let is_donate_hero = false
	let has_hero = false

	var hero_list_donate = Game.GetCustomTable("custom_pick", "donate_heroes");
	if (hero_list_donate)
	{
		for (var d = 1; d <= Object.keys(hero_list_donate).length; d++)  
		{
            if (hero_list_donate[d] == hero_selected) 
            {
                is_donate_hero = true
            }
        }
	}

	var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
	if (player_data_info)
	{
		for (var d = 1; d <= Object.keys(player_data_info.donate_heroes).length; d++)  
		{
            if (player_data_info.donate_heroes[d] && player_data_info.donate_heroes[d]["hero_name"] == hero_selected && player_data_info.donate_heroes[d]["days"] > 0) 
            {
                has_hero = true
            }
        }
	}

	let is_donate_free = false
	let is_donate_free_sub = false
	let donate_heroes_free = Game.GetCustomTable("custom_pick", "donate_heroes_free");
	if (donate_heroes_free)
	{
		for (var d = 1; d <= Object.keys(donate_heroes_free).length; d++)  
		{
            if (donate_heroes_free[d]["hero"] == hero_selected) 
            {
                is_donate_free = true
                if (donate_heroes_free[d]["sub"] == 1) 
            	{
            		is_donate_free_sub = true
            	}
            }
        }
	}

	if (is_donate_free && is_donate_hero)
	{
		if (is_donate_free_sub)
		{
			var player_data_info = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
			if (player_data_info)
			{
				if (player_data_info.plus_days > 0)
				{
					has_hero = true
				}
			}
		} else {
			has_hero = true
		}
	}

	if (is_donate_hero && !has_hero)
	{
		ChoseHero.RemoveClass("ChoseHero")
		ChoseHero.AddClass("ChoseHero_picked")
		ChoseHero.SetPanelEvent("onactivate", function() {});
		return
	}

	ChoseHero.RemoveClass("ChoseHero_picked")
	ChoseHero.RemoveClass("ChoseHero")
	ChoseHero.AddClass("ChoseHero_visible")
	ChoseHero.SetPanelEvent("onactivate", function() {
		Game.EmitSound("ui.pick_select")
		GameEvents.SendCustomGameEventToServer_custom("chose_hero", 
		{
			hero: hero_selected,
			
		});
		Refresh_Button()
		Refresh_Random_Button()
	});
}

function ChangeHeroInfo(hero_name, attribute) 
{
	var active_player = Game.GetCustomTable("custom_pick", "active_player");

	if (active_player == null) 
	{
		return
	}

    if (active_player.id == Game.GetLocalPlayerID() && active_player.is_ban == 1) 
    {
        Game.EmitSound("UI.Click_Hero")
        GameEvents.SendCustomGameEventToServer_custom( "select_ban_hero", {hero: hero_name} );
        return
    }

    if (active_player.is_ban_stage)
    {
        return
    }

	Game.EmitSound("UI.Click_Hero")

	if (hero_selected) 
    {
		$("#TalentWindowsStr").RemoveClass(String(hero_selected)+"_str")
		$("#TalentWindowsAgi").RemoveClass(String(hero_selected)+"_agi")
		$("#TalentWindowsInt").RemoveClass(String(hero_selected)+"_int")
	}
	
	hero_selected = hero_name

	var InfoText = $.GetContextPanel().FindChildTraverse("InfoText")
	InfoText.text = $.Localize('#' + hero_name)

	UpdateTalentsHero(hero_name)

	var HeroContainerModel = $.GetContextPanel().FindChildTraverse("HeroContainerModel")
	HeroContainerModel.RemoveAndDeleteChildren()
	$.CreatePanel("DOTAScenePanel", HeroContainerModel, "hero_model", { style: "width:100%;height:100%;", drawbackground: false, unit:hero_name, particleonly:"false", antialias:"false",allowrotation:"true" });

	var HeroContainerAbilities = $.GetContextPanel().FindChildTraverse("HeroContainerAbilities")
	HeroContainerAbilities.RemoveAndDeleteChildren()
	var abilities = GetHeroAbility(hero_name);
    var abilities_pick = 0;
    let innate_ability = GetInnateAbility(hero_name)
    if (innate_ability)
    {
        let ability_panel = $.CreatePanel('Panel', HeroContainerAbilities, "");
        ability_panel.AddClass('HeroInfoAbilty');
        ability_panel.AddClass('UseInnateIcon');
        SetShowInnateDesc(ability_panel, hero_name)
    }
    while(true)
    {
        abilities_pick++;
        if (!abilities[abilities_pick]) {break;}
        var ability_panel = $.CreatePanel('DOTAAbilityImage', HeroContainerAbilities, 'ability_' + abilities_pick);
        ability_panel.abilityname = abilities[abilities_pick];
        ability_panel.AddClass('HeroInfoAbilty');
        SetShowAbDesc(ability_panel, abilities[abilities_pick]);
    }
	Refresh_Button()
	Refresh_Random_Button()
}


function change_random(params)
{
	let hero_name = params.hero
	if (hero_selected) {
		$("#TalentWindowsStr").RemoveClass(String(hero_selected)+"_str")
		$("#TalentWindowsAgi").RemoveClass(String(hero_selected)+"_agi")
		$("#TalentWindowsInt").RemoveClass(String(hero_selected)+"_int")
	}
	
	hero_selected = hero_name

	var InfoText = $.GetContextPanel().FindChildTraverse("InfoText")
	InfoText.text = $.Localize('#' + hero_name)

	UpdateTalentsHero(hero_name)

	var HeroContainerModel = $.GetContextPanel().FindChildTraverse("HeroContainerModel")
	HeroContainerModel.RemoveAndDeleteChildren()
	$.CreatePanel("DOTAScenePanel", HeroContainerModel, "hero_model", { style: "width:100%;height:100%;", drawbackground: false, unit:hero_name, particleonly:"false", antialias:"false",allowrotation:"true" });

	var HeroContainerAbilities = $.GetContextPanel().FindChildTraverse("HeroContainerAbilities")
	HeroContainerAbilities.RemoveAndDeleteChildren()
	var abilities = GetHeroAbility(hero_name);
    var abilities_pick = 0;
    let innate_ability = GetInnateAbility(hero_name)
    if (innate_ability)
    {
        let ability_panel = $.CreatePanel('Panel', HeroContainerAbilities, "");
        ability_panel.AddClass('HeroInfoAbilty');
        ability_panel.AddClass('UseInnateIcon');
        SetShowInnateDesc(ability_panel, hero_name)
    }
    while(true)
    {
        abilities_pick++;
        if (!abilities[abilities_pick]) {break;}
        var ability_panel = $.CreatePanel('DOTAAbilityImage', HeroContainerAbilities, 'ability_' + abilities_pick);
        ability_panel.abilityname = abilities[abilities_pick];
        ability_panel.AddClass('HeroInfoAbilty');
        SetShowAbDesc(ability_panel, abilities[abilities_pick]);
    }
	Refresh_Button()
	Refresh_Random_Button()
}

function SetShowInnateDesc(panel, ability)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowInnateTooltip', panel, heroesId[ability], 0); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideInnateTooltip', panel);
    });       
}

function SetShowAbDesc(panel, ability)
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowAbilityTooltip', panel, ability); });
        
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideAbilityTooltip', panel);
    });       
}

function GetHeroAbility(hn) 
{
    var ab = Game.GetCustomTable("custom_pick", hn);
    if (ab)
    {
        return ab;
    } 
    return [];
}

function GetInnateAbility(hn) 
{
    var ab = Game.GetCustomTable("custom_pick", hn+"_innate");
    if (ab)
    {
        return ab;
    } 
    return null;
}

function SelectTalentButton(button, tab) 
{
	$("#TalentWindowsStr").style.visibility = "collapse";
	$("#TalentWindowsAgi").style.visibility = "collapse";
	$("#TalentWindowsInt").style.visibility = "collapse";

	$("#TalentButtonStr").SetHasClass( "SelectTalentButton", false );
	$("#TalentButtonAgi").SetHasClass( "SelectTalentButton", false );
	$("#TalentButtonInt").SetHasClass( "SelectTalentButton", false );

	Game.EmitSound("ui_topmenu_select")

	$("#" + button).SetHasClass( "SelectTalentButton", true );
	$("#" + tab).style.visibility = "visible";
}

function UpdateTalentsHero(hero_name) 
{
	$("#TalentsHero").style.opacity = "1"
	$("#TalentWindowsStr").RemoveAndDeleteChildren()
	$("#TalentWindowsAgi").RemoveAndDeleteChildren()
	$("#TalentWindowsInt").RemoveAndDeleteChildren()
	InitTalentStr(hero_name) 
	InitTalentAgi(hero_name) 
	InitTalentInt(hero_name) 
}

function InitTalentStr(heroname) 
{
	let heroestalent = Game.GetCustomTable("herotalents", heroname)

	$("#TalentWindowsStr").AddClass(String(heroname)+"_str")

	if (heroestalent) 
	{
		for ( var line = 0; line < 7; line++ ) 
		{
			let talent_line = $.CreatePanel("Panel", $("#TalentWindowsStr"), "")
			talent_line.AddClass("talent_line")
			for ( var block = 0; block < 5; block++) 
			{
				let talent_block = $.CreatePanel("Panel", talent_line, heroestalent[1][line + 1][block + 1][1])
				talent_block.AddClass("talent_block")
				let talent_block_image = $.CreatePanel("Panel", talent_block, "")
				talent_block_image.AddClass("talent_block_image")
				if (heroestalent[1][line + 1][block + 1][1].indexOf("empty") == -1) 
				{
					talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + heroestalent[1][line + 1][block + 1][4] + '.png")';
            		talent_block_image.style.backgroundSize = "100%";
            		MouseOver(talent_block_image,$.Localize(heroestalent[1][line + 1][block + 1][2] + "_0"))
				}
			}
		}
	}
}

function InitTalentAgi(heroname) 
{
	let heroestalent = Game.GetCustomTable("herotalents", heroname)

	$("#TalentWindowsAgi").AddClass(String(heroname)+"_agi")

	if (heroestalent) 
	{
		for ( var line = 0; line < 7; line++ ) 
		{
			let talent_line = $.CreatePanel("Panel", $("#TalentWindowsAgi"), "")
			talent_line.AddClass("talent_line")
			for ( var block = 0; block < 5; block++) 
			{
				let talent_block = $.CreatePanel("Panel", talent_line, heroestalent[2][line + 1][block + 1][1])
				talent_block.AddClass("talent_block")
				let talent_block_image = $.CreatePanel("Panel", talent_block, "")
				talent_block_image.AddClass("talent_block_image")
				if (heroestalent[2][line + 1][block + 1][1].indexOf("empty") == -1) 
				{
					talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + heroestalent[2][line + 1][block + 1][4] + '.png")';
            		talent_block_image.style.backgroundSize = "100%";
            		MouseOver(talent_block_image,$.Localize(heroestalent[2][line + 1][block + 1][2] + "_0"))
				}
			}
		}
	}
}

function InitTalentInt(heroname) 
{
	let heroestalent = Game.GetCustomTable("herotalents", heroname)

	$("#TalentWindowsInt").AddClass(String(heroname)+"_int")

	if (heroestalent) 
	{
		for ( var line = 0; line < 7; line++ ) 
		{
			let talent_line = $.CreatePanel("Panel", $("#TalentWindowsInt"), "")
			talent_line.AddClass("talent_line")
			for ( var block = 0; block < 5; block++) 
			{
				let talent_block = $.CreatePanel("Panel", talent_line, heroestalent[3][line + 1][block + 1][1])
				talent_block.AddClass("talent_block")
				let talent_block_image = $.CreatePanel("Panel", talent_block, "")
				talent_block_image.AddClass("talent_block_image")
				if (heroestalent[3][line + 1][block + 1][1].indexOf("empty") == -1) 
				{
					talent_block_image.style.backgroundImage = 'url("file://{images}/custom_game/talents/' + heroestalent[3][line + 1][block + 1][4] + '.png")';
            		talent_block_image.style.backgroundSize = "100%";
            		MouseOver(talent_block_image,$.Localize(heroestalent[3][line + 1][block + 1][2] + "_0"))
				}
			}
		}
	}
}

function MouseOver(panel, text) 
{
    panel.SetPanelEvent('onmouseover', function() {
        $.DispatchEvent('DOTAShowTextTooltip', panel, text)
    });
    panel.SetPanelEvent('onmouseout', function() {
        $.DispatchEvent('DOTAHideTextTooltip', panel);
    });
}

function HasHero()
{
	let table = Game.GetCustomTable("custom_pick", "player_current_hero"+Players.GetLocalPlayer())
	if (table && table.picked == 1)
	{
		return true
	}
	return false
}

function SetDonateButtonHero(panel, hero)
{
	if (hero == null)
	{
		panel.SetPanelEvent("onactivate", function () {});
        return;
	}
	panel.SetPanelEvent("onactivate", function () 
	{
		if (GameUI.CustomUIConfig().OpenHeroBuyCustomPick)
		{
			GameUI.CustomUIConfig().OpenHeroBuyCustomPick(hero)
		}
	});
}

GameEvents.Subscribe_custom("open_select_ban_counter", open_select_ban_counter)
function open_select_ban_counter()
{
    $("#SelectBanCounter").SetHasClass("open", true)
    $.Schedule(1, function()
    {
        $("#SelectBanCounter").SetHasClass("Pulse", true)
    })
}

GameEvents.Subscribe_custom("close_select_ban_counter", close_select_ban_counter)
function close_select_ban_counter()
{
    $("#SelectBanCounter").SetHasClass("open", false)
}

var SELECTED_BANS_COUNTER = false
function SelectTournamentBan(counter)
{
    if (SELECTED_BANS_COUNTER) { return }
    SELECTED_BANS_COUNTER = true
    let SelectBanCounter = $("#SelectBanCounter")
    let Buttons = SelectBanCounter.FindChildTraverse("Buttons")
    for (let child of Buttons.Children())
    {
        if (child.id == "Button_" + counter)
        {
            child.AddClass("Selected")
        }
        else
        {
            child.AddClass("Unselected")
        }
        child.ClearPanelEvent("onactivate")
    }
    GameEvents.SendCustomGameEventToServer_custom( "select_tournament_ban_counter", {counter: counter} );
}

var SELECTED_RANDOM_COUNTER = false
function SelectRandomHero(counter)
{
    if (SELECTED_RANDOM_COUNTER) { return }
    SELECTED_RANDOM_COUNTER = true
    let SelectBanCounter = $("#SelectBanCounter")
    let Buttons = SelectBanCounter.FindChildTraverse("ButtonsRandomHeroes")
    for (let child of Buttons.Children())
    {
        if (child.id == "Button_" + counter)
        {
            child.AddClass("Selected")
        }
        else
        {
            child.AddClass("Unselected")
        }
        child.ClearPanelEvent("onactivate")
    }
    GameEvents.SendCustomGameEventToServer_custom( "select_tournament_random_heroes", {counter: counter} );
}

GameEvents.Subscribe_custom("change_color_timer", change_color_timer)
function change_color_timer(data)
{
    let is_red_color = false
    if (data.is_ban)
    {
        is_red_color = true
    }
    $("#pick_timer_panel_main").SetHasClass("is_red_color", is_red_color)
}

GameUI.CustomUIConfig().GlobalUpdateBGHS = UpdateStoreBackgroundHS
function UpdateStoreBackgroundHS()
{
    let PLAYER_DATA = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()));
    let CustomBg = $("#BGScene_1")
    if (!CustomBg) { return }
    let MovieBackground = $("#MovieBackground")
    let MovieBackground2 = $("#MovieBackground2")

    if (PLAYER_DATA && PLAYER_DATA.background_id)
    {
        CustomBg.style.backgroundImage = 'url("' + Background_Images[PLAYER_DATA.background_id] + '")'
        CustomBg.style.backgroundSize = "cover"
        CustomBg.style.backgroundPosition = "50% 50%"
        if (MovieBackground)
        {
            MovieBackground.visible = false
            MovieBackground.style.opacity = "0"
        }
        if (MovieBackground2)
        {
            MovieBackground2.visible = false
            MovieBackground2.style.opacity = "0"
        }
    }
    else
    {
        if (MovieBackground)
        {
            MovieBackground.visible = true
            MovieBackground.style.opacity = "1"
        }
        if (MovieBackground2)
        {
            MovieBackground2.visible = true
            MovieBackground2.style.opacity = "1"
        }
    }
}

MouseOver($("#SelectRandomHero"),$.Localize("#random_button"))
MouseOver($("#TournamentActivateButton"), $.Localize("#tournament_gamemode_info"))

var HERO_SEARCH_KEYS =
[
    "key_backspace", "key_escape",
    "key_a", "key_b", "key_c", "key_d", "key_e", "key_f", "key_g",
    "key_h", "key_i", "key_j", "key_k", "key_l", "key_m", "key_n",
    "key_o", "key_p", "key_q", "key_r", "key_s", "key_t", "key_u",
    "key_v", "key_w", "key_x", "key_y", "key_z"
]

var HERO_SEARCH_RU_MAP =
{
    q: "й", w: "ц", e: "у", r: "к", t: "е", y: "н", u: "г", i: "ш", o: "щ", p: "з",
    a: "ф", s: "ы", d: "в", f: "а", g: "п", h: "р", j: "о", k: "л", l: "д",
    z: "я", x: "ч", c: "с", v: "м", b: "и", n: "т", m: "ь"
}

var hero_search_term = ""
var hero_search_names = {}

function InitHeroSearch()
{
    let panel = $.GetContextPanel()
    panel.SetAcceptsFocus(true)
    $.RegisterEventHandler("InputFocusLost", panel, HeroSearchOnFocusLost)
    GameUI.CustomUIConfig().woda_restore_focus = HeroSearchFocus
    for (let key_name of HERO_SEARCH_KEYS)
    {
        $.RegisterKeyBind(panel, key_name, function()
        {
            if (panel.BHasClass("Deletion")) return
            if (key_name === "key_backspace")
            {
                hero_search_term = hero_search_term.slice(0, -1)
            }
            else if (key_name === "key_escape")
            {
                hero_search_term = ""
            }
            else
            {
                hero_search_term += key_name.slice(4, 5)
            }
            UpdateHeroSearchFilter()
        })
    }
    HeroSearchFocus()
}

function HeroSearchFocus()
{
    let panel = $.GetContextPanel()
    if (!panel || panel.BHasClass("Deletion")) return
    if (panel.BHasKeyFocus()) return
    if (WodaIsTextEntryFocused()) return
    panel.SetAcceptsFocus(true)
    panel.SetFocus()
    panel.UpdateFocusInContext()
}

function HeroSearchOnFocusLost()
{
    $.Schedule(0.2, HeroSearchFocus)
}

function HeroSearchToRussian(term)
{
    let result = ""
    for (let i = 0; i < term.length; i++)
    {
        result += HERO_SEARCH_RU_MAP[term[i]] || term[i]
    }
    return result
}

function HeroSearchLocalize(token)
{
    let text = $.Localize("#" + token)
    if (!text || text.indexOf("npc_dota_hero") !== -1)
    {
        return ""
    }
    return text.toLowerCase()
}

function GetHeroSearchNames(hero_name)
{
    if (hero_search_names[hero_name])
    {
        return hero_search_names[hero_name]
    }
    let short_name = String(hero_name).replace("npc_dota_hero_", "").toLowerCase()
    let names =
    [
        short_name,
        short_name.replace(/_/g, " "),
        short_name.replace(/_/g, ""),
        HeroSearchLocalize(hero_name),
        HeroSearchLocalize(hero_name + "__name_alias"),
        HeroSearchLocalize(hero_name + "_name_alias")
    ]
    hero_search_names[hero_name] = names.join(";")
    return hero_search_names[hero_name]
}

function HeroSearchMatches(hero_name, latin, russian)
{
    if (latin === "") return true
    let names = GetHeroSearchNames(hero_name)
    return names.indexOf(latin) !== -1 || names.indexOf(russian) !== -1
}

function ApplyHeroSearchToPanel(panel, hero_name)
{
    if (!panel) return
    HeroSearchSetPanelState(panel, hero_name, hero_search_term, HeroSearchToRussian(hero_search_term))
}

function HeroSearchSetPanelState(panel, hero_name, latin, russian)
{
    let match = HeroSearchMatches(hero_name, latin, russian)
    panel.SetHasClass("HeroSearchDim", !match)
    panel.SetHasClass("HeroSearchHighlighted", latin !== "" && match)
}

var hero_search_fade_timer = null

function HeroSearchShowLabel(label, show)
{
    if (hero_search_fade_timer !== null)
    {
        $.CancelScheduled(hero_search_fade_timer)
        hero_search_fade_timer = null
    }
    label.SetHasClass("ShowSearch", show)
    if (!show) return
    hero_search_fade_timer = $.Schedule(1.0, function()
    {
        hero_search_fade_timer = null
        label.SetHasClass("ShowSearch", false)
    })
}

function UpdateHeroSearchFilter()
{
    let latin = hero_search_term
    let russian = HeroSearchToRussian(latin)
    let label = $("#HeroSearchLabel")
    if (label)
    {
        label.text = latin
        HeroSearchShowLabel(label, latin !== "")
    }
    let selectors = ["#StrengthSelector", "#AgilitySelector", "#IntellectSelector", "#AllSelector"]
    for (let selector_id of selectors)
    {
        let selector = $(selector_id)
        if (!selector) continue
        for (let panel of selector.Children())
        {
            HeroSearchSetPanelState(panel, panel.id, latin, russian)
        }
    }
}

function ResetHeroSearch()
{
    hero_search_term = ""
    UpdateHeroSearchFilter()
}


init()

var arena_difficulty_max_unlocked = 1
var arena_difficulty_selected = 1
var arena_difficulty_host = -1
var ARENA_DIFFICULTY_COUNT = 10

function IsArenaDifficultyHost()
{
	if (arena_difficulty_host < 0) { return true }
	return Game.GetLocalPlayerID() == arena_difficulty_host
}

function UpdateArenaDifficultyHostState()
{
	var is_host = IsArenaDifficultyHost()
	$("#ArenaDifficultyOverlay").SetHasClass("Viewer", !is_host)
	var description = $("#ArenaDifficultyDescription")
	if (description)
	{
		description.text = $.Localize(is_host ? "#arena_difficulty_description" : "#arena_difficulty_host_only")
	}
}

function ArenaDifficultyStart(data)
{
	arena_difficulty_max_unlocked = Number(data.max_unlocked) || 1
	arena_difficulty_selected = Number(data.level) || 0
	arena_difficulty_host = (data.host !== undefined && data.host !== null) ? Number(data.host) : -1
	BuildArenaDifficultyGrid()
	UpdateArenaDifficultyHostState()
	$.GetContextPanel().AddClass("DifficultyChoosing")
	$("#ArenaDifficultyOverlay").AddClass("Visible")
}

function BuildArenaDifficultyGrid()
{
	var grid = $("#ArenaDifficultyGrid")
	if (!grid) { return }
	grid.RemoveAndDeleteChildren()
	var per_row = Math.ceil(ARENA_DIFFICULTY_COUNT / 2)
	var row = null
	for (var level = 1; level <= ARENA_DIFFICULTY_COUNT; level++)
	{
		if ((level - 1) % per_row == 0)
		{
			row = $.CreatePanel("Panel", grid, "")
			row.AddClass("ArenaDifficultyGridRow")
		}
		CreateArenaDifficultyCard(row, level)
	}
}

function SetArenaDifficultyPicture(panel, level)
{
	if (!panel) { return }
	var room_id = ARENA_DIFFICULTY_ROOMS[level - 1]
	var image = (room_id !== undefined) ? "arena_rooms/arena_a_0_" + room_id : "shop/difficulty_level_badge"
	panel.style.backgroundImage = 'url("file://{images}/custom_game/' + image + '.png")'
	panel.style.backgroundSize = "100%"
}

function CreateArenaDifficultyCard(grid, level)
{
	var locked = level > arena_difficulty_max_unlocked
	var card = $.CreatePanel("Panel", grid, "ArenaDifficulty_" + level)
	card.AddClass("ArenaDifficultyCard")
	card.SetHasClass("Locked", locked)
	card.SetHasClass("Selected", level == arena_difficulty_selected)
	card.hittestchildren = false

	var picture = $.CreatePanel("Panel", card, "")
	picture.AddClass("ArenaDifficultyPicture")
	picture.AddClass("ArenaDifficultyCardPicture")
	SetArenaDifficultyPicture(picture, level)
	var row = $.CreatePanel("Panel", card, "")
	row.AddClass("ArenaDifficultyCardRow")
	var badge = $.CreatePanel("Panel", row, "")
	badge.AddClass("ArenaDifficultyCardBadge")
	var number = $.CreatePanel("Label", badge, "")
	number.AddClass("ArenaDifficultyCardNumber")
	number.text = String(level)

	var text = $.CreatePanel("Panel", row, "")
	text.AddClass("ArenaDifficultyCardText")
	var title = $.CreatePanel("Label", text, "")
	title.AddClass("ArenaDifficultyInfoTitle")
	title.text = $.Localize("#arena_difficulty_info_title")
	var room_name = $.CreatePanel("Label", text, "")
	room_name.AddClass("ArenaDifficultyInfoRoom")
	var room_id = ARENA_DIFFICULTY_ROOMS[level - 1]
	room_name.text = (room_id !== undefined) ? $.Localize("#arena_room_" + room_id) : String(level)

	var lock = $.CreatePanel("Panel", card, "")
	lock.AddClass("ArenaDifficultyLock")

	card.SetPanelEvent("onactivate", function()
	{
		if (locked || !IsArenaDifficultyHost())
		{
			Game.EmitSound("General.InvalidTarget_Invulnerable")
			return
		}
		Game.EmitSound("ui_topmenu_select")
		GameEvents.SendCustomGameEventToServer_custom("arena_difficulty_select", {level: level})
	})
	card.SetPanelEvent("onmouseover", function()
	{
		$.DispatchEvent("DOTAShowTitleTextTooltip", card, GetArenaDifficultyTooltipTitle(level), BuildArenaDifficultyRewardsLines(level).join("<br>"))
	})
	card.SetPanelEvent("onmouseout", function()
	{
		$.DispatchEvent("DOTAHideTitleTextTooltip", card)
	})
}

function ArenaDifficultySelected(data)
{
	arena_difficulty_selected = Number(data.level) || 0
	for (var level = 1; level <= ARENA_DIFFICULTY_COUNT; level++)
	{
		var card = $("#ArenaDifficulty_" + level)
		if (card)
		{
			card.SetHasClass("Selected", level == arena_difficulty_selected)
		}
	}
}

function ArenaDifficultyConfirm()
{
	if (!IsArenaDifficultyHost())
	{
		Game.EmitSound("General.InvalidTarget_Invulnerable")
		return
	}
	Game.EmitSound("ui_topmenu_select")
	GameEvents.SendCustomGameEventToServer_custom("arena_difficulty_confirm", {level: arena_difficulty_selected})
}

function ArenaDifficultyEnd(data)
{
	$.GetContextPanel().RemoveClass("DifficultyChoosing")
	$("#ArenaDifficultyOverlay").RemoveClass("Visible")
	if (data && Number(data.level) > 0)
	{
		arena_crystal_difficulty = Number(data.level)
	}
	UpdateArenaHeroCrystalMarks()
	UpdateArenaDifficultyInfo()
}

function UpdateArenaDifficultyInfo()
{
	var info = $("#ArenaDifficultyInfo")
	$.Msg("[DBG_ADI] info=", !!info, " map=", Game.GetMapInfo().map_display_name, " crystal=", arena_crystal_difficulty, " table=", JSON.stringify(Game.GetCustomTable("custom_pick", "arena_difficulty")))
	if (!info) { return }
	var difficulty = GetArenaPickDifficulty()
	$.Schedule(0.5, function()
	{
		if (!info.IsValid()) { $.Msg("[DBG_ADI] invalid"); return }
		var par = info.GetParent()
		$.Msg("[DBG_ADI] diff=", difficulty, " has=", info.BHasClass("Visible"), " vis=", info.visible, " x=", info.actualxoffset, " y=", info.actualyoffset, " w=", info.actuallayoutwidth, " h=", info.actuallayoutheight, " op=", info.style.opacity, " parent=", par ? par.id + "/" + par.paneltype + " w=" + par.actuallayoutwidth + " h=" + par.actuallayoutheight : "none")
	})
	info.SetHasClass("Visible", difficulty > 0)
	if (difficulty <= 0) { return }
	$("#ArenaDifficultyInfoNumber").text = String(difficulty)
	var room_id = ARENA_DIFFICULTY_ROOMS[difficulty - 1]
	$("#ArenaDifficultyInfoRoom").text = room_id !== undefined ? $.Localize("#arena_room_" + room_id) : ""
	info.SetPanelEvent("onmouseover", function()
	{
		var level = GetArenaPickDifficulty()
		if (level <= 0) { return }
		var difficulty_info = CustomNetTables.GetTableValue("map_info", "pve_difficulty")
		if (difficulty_info && Number(difficulty_info.level) != level) { difficulty_info = null }
		$.DispatchEvent("DOTAShowTitleTextTooltip", info, GetArenaDifficultyTooltipTitle(level), BuildArenaDifficultyTooltipText(level, difficulty_info))
	})
	info.SetPanelEvent("onmouseout", function()
	{
		$.DispatchEvent("DOTAHideTitleTextTooltip", info)
	})
}

var arena_crystal_difficulty = 0

function GetArenaPickDifficulty()
{
	if (!/^(arena|1_player|4_player)$/.test(Game.GetMapInfo().map_display_name)) { return 0 }
	if (arena_crystal_difficulty > 0) { return arena_crystal_difficulty }
	var state = Game.GetCustomTable("custom_pick", "arena_difficulty")
	if (state && state.state == "done")
	{
		return Number(state.level) || 0
	}
	return 0
}

function UpdateArenaHeroCrystalMarks()
{
	if (typeof IsArenaHeroDifficultyDone !== "function") { return }
	var difficulty = GetArenaPickDifficulty()
	var player_data = Game.GetCustomTable("woda_player_data", String(Players.GetLocalPlayer()))
	var selectors = ["StrengthSelector", "AgilitySelector", "IntellectSelector", "AllSelector"]
	for (var s = 0; s < selectors.length; s++)
	{
		var selector = $("#" + selectors[s])
		if (!selector) { continue }
		var heroes = selector.Children()
		for (var h = 0; h < heroes.length; h++)
		{
			var hero_panel = heroes[h]
			var show = difficulty > 0 && player_data != null && GetArenaHeroDifficultyQuestId(hero_panel.id, difficulty) != null && !IsArenaHeroDifficultyDone(player_data, hero_panel.id, difficulty)
			var mark = hero_panel.FindChild("ArenaCrystalMark")
			if (show && !mark)
			{
				mark = $.CreatePanel("Panel", hero_panel, "ArenaCrystalMark")
				mark.AddClass("ArenaCrystalMark")
				mark.hittest = false
			}
			if (mark)
			{
				mark.visible = show
			}
		}
	}
}

function CheckArenaDifficultyState()
{
	var state = Game.GetCustomTable("custom_pick", "arena_difficulty")
	if (state && state.state == "choose")
	{
		ArenaDifficultyStart({max_unlocked: state.max_unlocked, level: state.level, host: state.host})
	}
	else
	{
		ArenaDifficultyEnd()
	}
}

GameEvents.Subscribe_custom("arena_difficulty_start", ArenaDifficultyStart)
GameEvents.Subscribe_custom("arena_difficulty_selected", ArenaDifficultySelected)
GameEvents.Subscribe_custom("arena_difficulty_end", ArenaDifficultyEnd)