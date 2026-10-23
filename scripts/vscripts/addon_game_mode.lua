--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if dota1x6 == nil then
	_G.dota1x6 = class({})
end

_G.CreepsUpgradeTimer = 3 * 60

Convars:RegisterConvar("matchId", "", "123", 0)
Convars:SetFloat("dota_neutral_spawn_type_upgrade_interval", CreepsUpgradeTimer - 0.1)
Convars:SetBool("dota_enable_illusion_recycling", false)

_G.test_pick_stage = false
_G.Time_to_pick_Hero = 25
_G.Time_to_pick_Base = 20

_G.pro_mod = false
_G.pro_mod_data = {
	new_system = false,
	disable_vision = true,
	show_random = false,
	same_heroes = true,
	enable_pause = true,
	double_legendary = false,
	long_hook = true,
	custom_rules = false,
	enable_voice_radius = false,
	voice_radius = 1200,
	disable_heroes = {
		--["npc_dota_hero_pangolier"] = true
	},
}
_G.custom_rules_data = {
	["no_wards"] = 0,
	["no_tormentor"] = 0,
	["no_patrol"] = 0,
	["no_teleport"] = 0,
	["no_bkb"] = 0,
	["no_ancients"] = 0,
	["random_shrines"] = 0,
	["bounty_orb"] = 0,
	["only_cone"] = 0,
	["shrine_damage"] = 0,
	["patrol_center"] = 0,
}

_G.test = true and IsInToolsMode()
_G.hero_test = false and IsInToolsMode()
_G.hero_test_name = "npc_dota_hero_primal_beast"
_G.hero_test_base = 2
_G.twitch_alert = false
_G.sale_alert = false
_G.sale_type = 0

_G.start_wave = 0
_G.timer_test = 15111
_G.timer_test_start = 25111
_G.test_wave = 0
_G.DontUpgradeCreeps = false and IsInToolsMode()
_G.test_end = false and IsInToolsMode()

_G.PlayerCount = 0
_G.TeamCount = 0
_G.TeamRegistred = {}

local couriers_spawned = {}

dota1x6.mob_thinker = nil
dota1x6.event_thinker = nil
_G.teleports = {}
_G.waves = {}
_G.boss_waves = {}
_G.players = {}
_G.towers = {}
_G.hero_tiers = {}
_G.hero_names = {}
_G.timer = 0
_G.Deaths = 0
_G.LpGiven = false

_G.GAME_STARTED = false
_G.SpawnedPlayers = 0
_G.ReadyPlayers = 0
_G.GlobalHeroes = {}
_G.loading_ended = false
_G.EndLoading_timeout = 10

Rating_Table = { 40, 30, 10, -10, -30, -40 }
Rating_Table_Max = { 20, 15, 5, -5, -15, -20 }

_G.Wave_boss_number = { 5, 21 }
_G.Purple_Wave = {
	[3] = true,
	[10] = true,
}

_G.upgrade_orange = 17

_G.PreGame_time = 30

_G.game_start = false
_G.Game_end = false

_G.duel_start = 5

_G.orb_shrines_count = 1
_G.orb_shrines = {}
_G.orb_shrines_total = 0
_G.orb_shrines_wave = 5

_G.duel_timer = 90
_G.round_timer = 5
_G.duel_timer_final = 80 + duel_start
_G.duel_timer_normal = 45 + duel_start
_G.field_stun = 0.5
_G.duel_push_time = 10
_G.duel_push_teleport = 6
_G.duel_barrier_time = 10
_G.duel_end_time = 2
_G.duel_return_time = 1
_G.duel_start_wave = 11

_G.Target_timer_first = RandomInt(9 * 60, 12 * 60)
_G.Target_timer_min = 13 * 60
_G.Target_timer_max = 23 * 60
_G.Target_cd = 120
_G.Target_gold_diff = 1.30
_G.Target_kills_diff = 6
_G.Target_kills_gold_diff = 1.15
_G.Target_k = 0.45
_G.Target_kill_gold = 100
_G.Target_damage_min = 10
_G.Target_damage_max = 40
_G.Target_damage_step = 5
_G.Target_damage_cd = 15
_G.Target_proc_count = 0
_G.Target_proc_max = 3
_G.Target_duration = 120
_G.Target_radius = 1500
_G.Target_duel_extend = 15
dota1x6.TargetCurrentCd = nil
dota1x6.TargetCurrentActive = false

_G.Streak_k = 0.35

_G.test_patrol = false
_G.patrol_timer_max = 40
_G.patrol_timer_max_2 = 50
_G.patrol_duel_delay = 15
_G.patrol_wave = 5
_G.patrol_wave_2 = 13
_G.patrol_second_init = false
_G.patrol_first_init = false
_G.tormentor_gold = 500
_G.tormentor_wave = 12
_G.tormentor_inc = 3
_G.patrol_launched = false
dota1x6.patrol_dontgo_radiant = false
dota1x6.patrol_dontgo_dire = false

_G.avg_rating = 0
_G.lobby_rating = {}
_G.lobby_rating_change = {}
_G.lobby_double_rating = {}

_G.StartDeathTimer = 3
_G.DeathTimer_PerWave = 2.5
_G.Short_Respawn_target = 10
_G.DeathTimerDuo = 0.25

_G.WaveMoreGold_max = 300
_G.WaveMoreGold_min = 100
_G.MaxTimer = 0

_G.StartPurple = 2
_G.PlusPurple = 1
_G.PlusPurpleMore = 2
_G.PlusPurpleThrash = 4

_G.low_net_gold = 90
_G.low_net_waves = { [RandomInt(8, 9)] = true, [RandomInt(10, 11)] = true }
_G.low_net_max = 2
_G.more_gold_wave = 5

_G.StartBlue = 35
_G.PlusBlue = 15
_G.StartWhite = 30
_G.PlusWhite = 10
_G.ShrineTicks = 10
_G.ShrineGold = 70
_G.ShrineGoldWave = 30
_G.ShrineWhite = 70

_G.Necro_Timer = 20

_G.PortalDelay = 5

_G.dont_end_pick_hero = false and test
_G.dont_end_game = false and test

_G.creeps_team_health = 2
_G.creeps_team_damage = 1.3
_G.tormentor_team_health = 1.5

_G.CreepsUpgradeCount = 0
_G.NeutralCreeps = {}

_G.enable_pause = false
_G.healing = true

_G.push_timer = 17 * 60
_G.push_alert = false

_G.main_timer_interval = 1
_G.PushReduce_duration = 5

_G.Pause_Time = 30
_G.Pause_Time_Pro = 60

_G.Trap_Duration = 35

_G.kill_net_gold = 150
_G.more_gold_radius = 1000
_G.kill_gold_base = 100
_G.kill_gold_level = 8
_G.kill_purple_radius = 1200
_G.ward_gold = 100

_G.bounty_timer = 0
_G.bounty_max_timer = 120
_G.bounty_start = 120
_G.bounty_gold_init = 90
_G.bounty_gold_per_minute = 3
_G.bounty_exp_init = 120
_G.bounty_exp_per_minute = 5
_G.bounty_white_init = 8
_G.bounty_white_per_minute = 0.5
_G.bounty_net_min = 1
_G.bounty_net_max = 2

_G.LowPriorityTime = 600
_G.SafeToLeave = false
_G.SafeToLeave_reason = 0
_G.SafeToLeave_alert = false

_G.DoubleRating_timer = 25
_G.DoubleRating_active = true

_G.PartyTable = {}

_G.After_Lich = false

_G.ACT_DOTA_SPAWN_STATUE = ACT_DOTA_SPAWN_STATUE or 1766

_G.RATING_CHANGE_BASE = { 40, 30, 10, -10, -30, -40 }
_G.RATING_CHANGE_BASE_DUO = { 40, 20, -20, -40 }

_G.glyph_cd = 360
_G.glyph_duration = 5

_G.current_day = "night"
_G.night_timer = 5 * 60
_G.day_timer = 5 * 60
_G.day_count = night_timer
dota1x6.NIGHT_STALKER_TEAM = nil
dota1x6.eternal_night = false

_G.sub_places_points_solo = { 14, 12, 10, 8, 6, 4 }
_G.sub_places_points_duo = { 12, 10, 8, 6, 4 }
_G.sub_random_inc = 1.15
_G.sub_kills_inc = 1
_G.sub_kills_max = 10
_G.sub_towers_inc = 4
_G.sub_bounty_inc = 0.5
_G.sub_bounty_max = 10
_G.sub_points_max = 500
_G.sub_level_thresh = {
	50,
	60,
	70,
	80,
	100,
	120,
	140,
	160,
	180,
	200,
	230,
	260,
	290,
	320,
	350,
	380,
	420,
	460,
	500,
	540,
	580,
	620,
	680,
	800,
	900,
	1000,
	1100,
	1200,
	1500,
}
_G.sub_place_exp_solo = { 40, 30, 25, 20, 15, 10 }
_G.sub_place_exp_duo = { 35, 25, 20, 15, 10 }
_G.sub_level_max = 30
_G.level_thresh = { 6, 12, 18, 25, 30 }

_G.shop_daily_shards_min = 10
_G.shop_daily_shards_max = 30
_G.shop_daily_shards_cd = 86400
_G.shop_double_rating_cd = 86400 * 3
_G.shop_free_vote_cd = 86400
_G.shop_item_build_cd = 86400
_G.shop_quests_cd = 86400 * 7
_G.shop_chest_cd = 86400 * 7

_G.TestMode = false
_G.TestMode_players = 2
_G.TimerStop = false
_G.WtfMode = false

_G.abandon_players = {}

_G.no_hero_players = {}

_G.wrong_map_players = {}

_G.spell_cast_mods = {}
_G.spell_start_mods = {}
_G.death_mods = {}

_G.bounty_abs = {}
_G.bounty_runes = {}
_G.bounty_icons = {}
_G.minimap_icons = {}
_G.minimap_overview = {}
_G.watcher_mods = {}
_G.hero_icons = {}
_G.shop_items = {}
_G.neutral_items = {}

dota1x6.KillCount = 0

_G.SelectedHeroes = {}
_G.SelectedBases = {}
_G.SelectedQuests = {}
_G.ItemBuilds = {}

dota1x6.achivment_table = {}

dota1x6.current_wave = start_wave
dota1x6.go_wave = start_wave
dota1x6.go_boss_number = 0

dota1x6.NO_FOW_TEAMS = {}

require("util/safeguards")
require("events_protector")
require("addon_game_const")
require("addon_game_filter")
require("addon_game_utils")
require("chat_wheel")
require("server")
require("function")
require("timers")
require("spawn")
require("upgrade")
require("start_quest")
require("hero_select")
require("patrol_main")
require("quests_table")
require("wearables_system/wearables_system")
require("wearables_system/shop")
require("talents_values")
require("addon_init")
require("test_mode")
require("rival_table")
require("util/selection")
require("resources")
require("path_corner")
require("voice_radius")
require("match_log")

_G.precache_items = require("precache_items")
_G.precache_units = require("precache_units")

_G.base_heroes_data = require("base_heroes_data")

_G.arcana_sale = 0
_G.new_shop_heroes = {}

_G.ItemsTiming = {
	[20] = false,
	[40] = false,
	[120] = false,
	[300] = false,
	[600] = false,
	[900] = false,
	[1200] = false,
	[1800] = false,
	[2400] = false,
}

_G.duel_alert_init = false
_G.duel_alert_timer = 25
_G.duel_data = {}
dota1x6.waiting_top3_duel = false

function Precache(context)
	for _, v in pairs(resources.Particles) do
		PrecacheResource("particle", v, context)
	end

	for _, v in pairs(resources.Couriers) do
		PrecacheResource("model", v, context)
	end

	PrecacheResource("model", "models/items/axe/axe_carnival/axe_carnival_base.vmdl", context)
	PrecacheResource("model", "models/heroes/axe/axe.vmdl", context)
	PrecacheResource("model", "models/items/axe/axe_carnival/axe_carnival_ragdoll.vmdl", context)
	PrecacheResource("model", "models/items/axe/ti9_jungle_axe/axe_bare.vmdl", context)

	PrecacheResource("model", "custom/item_blue.vmdl", context)
	PrecacheResource("model", "custom/item_orange.vmdl", context)
	PrecacheResource("model", "custom/item_gray.vmdl", context)
	PrecacheResource("model", "custom/item_purple.vmdl", context)
	PrecacheResource("model", "models/morph_bg.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_worg_small/n_creep_worg_small.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_vulture_b/n_creep_vulture_b.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_ghost_b/n_creep_ghost_b.vmdl", context)
	PrecacheResource(
		"model",
		"models/creeps/neutral_creeps/n_creep_forest_trolls/n_creep_forest_troll_berserker.vmdl",
		context
	)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_harpy_a/n_creep_harpy_a.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_troll_dark_a/n_creep_troll_dark_a.vmdl", context)
	PrecacheResource(
		"model",
		"models/creeps/neutral_creeps/n_creep_forest_trolls/n_creep_forest_troll_berserker.vmdl",
		context
	)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_centaur_lrg/n_creep_centaur_lrg.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_harpy_b/n_creep_harpy_b.vmdl", context)
	PrecacheResource(
		"model",
		"models/creeps/neutral_creeps/n_creep_forest_trolls/n_creep_forest_troll_high_priest.vmdl",
		context
	)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_centaur_med/n_creep_centaur_med.vmdl", context)
	PrecacheResource(
		"model",
		"models/creeps/neutral_creeps/n_creep_thunder_lizard/n_creep_thunder_lizard_small.vmdl",
		context
	)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_gnoll/n_creep_gnoll.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_worg_large/n_creep_worg_large.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_black_drake/n_creep_black_drake.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_vulture_a/n_creep_vulture_a.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_black_dragon/n_creep_black_dragon.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_beast/n_creep_beast.vmdl", context)
	PrecacheResource("model", "models/creeps/neutral_creeps/n_creep_furbolg/n_creep_furbolg_disrupter.vmdl", context)
	PrecacheResource("model", "models/heroes/attachto_ghost/attachto_ghost.vmdl", context)
	PrecacheResource("model", "models/creeps/ice_biome/giant/ice_giant01.vmdl", context)
	PrecacheResource(
		"model",
		"models/creeps/neutral_creeps/n_creep_thunder_lizard/n_creep_thunder_lizard_big.vmdl",
		context
	)
	PrecacheResource("model", "models/props_gameplay/rune_goldxp.vmdl", context)

	for _, v in pairs(precache_items) do
		PrecacheItemByNameSync(v, context)
	end

	for _, v in pairs(precache_units) do
		PrecacheUnitByNameSync(v, context, -1)
	end

	PrecacheResource("soundfile", "soundevents/vo_chat_wheel.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/voscripts/game_sounds_vo_announcer.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/game_sounds_effects.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/game_sounds_ui.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/game_sounds_creeps.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/game_sounds_pick_stage.vsndevts", context)

	if _G.EmblemsListPFX then
		for _, particle in pairs(_G.EmblemsListPFX) do
			PrecacheResource("particle", particle, context)
		end
	end
	PrecacheResource(
		"particle",
		"particles/econ/items/skywrath_mage/skywrath_ti9_immortal_back/skywrath_mage_ti9_arcane_bolt_crimson.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/slark/slark_ti6_blade/slark_ti6_blade_essence_shift_gold.vpcf",
		context
	)
	--PrecacheResource( "soundfile", "soundevents/game_sounds_ui_imported.vsndevts", context )
	--PrecacheResource( "soundfile", "soundevents/soundevents_dota.vsndevts", context )
end

function dota1x6:PrecacheShopItems(name, context)
	if wearables_system.is_hero_precached[name] then
		return
	end
	wearables_system.is_hero_precached[name] = true
	if base_heroes_data and base_heroes_data[name] then
		if base_heroes_data[name]["model"] then
			PrecacheResource("model", base_heroes_data[name]["model"], context)
		end
		if base_heroes_data[name]["items"] then
			for item_name, _ in pairs(base_heroes_data[name]["items"]) do
				PrecacheResource("model", item_name, context)
			end
		end
		if base_heroes_data[name]["effects"] then
			for effect_name, _ in pairs(base_heroes_data[name]["effects"]) do
				PrecacheResource("particle", effect_name, context)
			end
		end
	end
	if wearables_system.ITEMS_DATA[name] == nil then
		return
	end
	wearables_system:PrecacheHero(name, context)
end

-- Create the game mode when we activate
function Activate()
	SendToServerConsole("dota_clientside_wearables false")
	ListenToGameEvent("player_disconnect", Dynamic_Wrap(hero_select, "OnDisconnect"), hero_select)
	dota1x6:InitGameMode()
	PathGraph:Initialize()

	HTTP.FillOfflineServerData()
end

local AvailableTeams = {
	DOTA_TEAM_GOODGUYS,
	DOTA_TEAM_BADGUYS,
	DOTA_TEAM_CUSTOM_1,
	DOTA_TEAM_CUSTOM_2,
	DOTA_TEAM_CUSTOM_7,
	DOTA_TEAM_CUSTOM_4,
}

function dota1x6:PostMatchPoints(player)
	if not IsServer() then
		return
	end
	if not HTTP.IsValidGame(PlayerCount) then
		return
	end
	if not test_end and not HTTP.serverData.isStatsMatch then
		return
	end
	if not test_end and SafeToLeave == true then
		return
	end

	local id = player:GetId()
	local player_array = HTTP.playersData[id]

	if not player_array then
		return
	end

	local kills = player_array.kills_done
	local towers = player_array.towers_destroyed
	local runes = player_array.bounty_runes_picked

	local place = HTTP.playersData[id].place
	local table_data = CustomNetTables:GetTableValue("sub_data", tostring(id))

	if not table_data then
		return
	end

	local quest_shards = 0
	local quest_exp = 0

	if (player:GetQuest() ~= nil) and player:QuestCompleted() and place <= win_place then
		quest_exp = player.quest.exp and player.quest.exp or 0
		quest_shards = player.quest.shards and player.quest.shards or 0
	end

	local random_k = 1
	if player_array.randomed == 1 then
		random_k = sub_random_inc
	end

	local sub_places_points = sub_places_points_solo
	local sub_place_exp = sub_place_exp_solo
	if not IsSoloMode() then
		sub_place_exp = sub_place_exp_duo
		sub_places_points = sub_places_points_duo
	end

	local result = {
		place = sub_places_points[place],
		kills = math.min(kills * sub_kills_inc, sub_kills_max),
		towers = towers * sub_towers_inc,
		runes = math.floor(math.min(runes * sub_bounty_inc, sub_bounty_max)),
		points = 0,
		exp = 0,
	}

	if GameRules:GetDOTATime(false, false) < push_timer then
		result.place = 0
		result.kills = 0
		result.towers = 0
		result.runes = 0
	end

	local points = math.floor((result.place + result.kills + result.towers + result.runes) * random_k)

	if table_data.subscribed == 0 then
		points = math.min(math.max(sub_points_max - table_data.points, 0), points)
	end

	HTTP.AddPlayerMatchShardsReceipt(id, points, "endGame")
	HTTP.AddPlayerMatchShardsReceipt(id, quest_shards, "questCompleted")

	points = points + quest_shards
	result.points = points

	table_data.points = table_data.points + points

	local level = table_data.heroes_data[player:GetUnitName()].level
	local exp = table_data.heroes_data[player:GetUnitName()].exp

	if table_data.subscribed == 1 and level < sub_level_max then
		local max_exp = sub_level_thresh[level]
		local exp_inc = math.floor(sub_place_exp[place] * random_k)

		if GameRules:GetDOTATime(false, false) < push_timer then
			exp_inc = 0
		end

		HTTP.playersData[id].dpHeroMatchXp = exp_inc
		HTTP.playersData[id].dpHeroQuestXp = quest_exp

		exp_inc = exp_inc + quest_exp
		result.exp = exp_inc

		local exp_left = exp_inc

		repeat
			if level < 30 then
				max_exp = sub_level_thresh[level]

				if exp_left >= (max_exp - exp) then
					exp_left = exp_left - (max_exp - exp)
					level = level + 1
					exp = 0
				else
					exp = exp + exp_left
					exp_left = 0
				end
			else
				exp_left = 0
				exp = 0
			end

		until exp_left < 1

		table_data.heroes_data[player:GetUnitName()].exp = exp
		table_data.heroes_data[player:GetUnitName()].level = level
		HTTP.UpdateHeroTier(table_data.heroes_data[player:GetUnitName()])
	end

	CustomNetTables:SetTableValue("sub_data", tostring(id), table_data)
	return result
end

function dota1x6:InitGameMode()
	--[[
local r = CreateHTTPRequestScriptVM("POST", "https://liquit.xyz/1x6test/test" )
r:SetHTTPRequestHeaderValue( "dedicated-key", HTTP.KEY )
r:SetHTTPRequestRawPostBody( "application/json", json.encode( {data = "hello"} ) )
r:SetHTTPRequestAbsoluteTimeoutMS( 600 * 1000 )
r:Send( function( res ) end)
]]

	local custom_rules = pro_mod and pro_mod_data.custom_rules
	local same_heroes = pro_mod and pro_mod_data.same_heroes
	local team_size = players_in_team
	local setup_delay = 0

	if team_size == 2 then
		low_net_max = 1
		Target_kills_diff = 10
		setup_delay = 25
	end

	if pro_mod == true then
		GameRules:SetCustomGameTeamMaxPlayers(1, 2)
		setup_delay = custom_rules and 150 or 30
	else
		GameRules:SetCustomGameTeamMaxPlayers(1, 0)
	end

	_G.setup_delay = setup_delay
	GameRules:SetCustomGameSetupAutoLaunchDelay(setup_delay > 0 and 99999 or 0)

	hero_select:RegisterHeroes()
	upgrade:InitGameMode()
	test_mode:InitGameMode()
	start_quest:InitGameMode()
	talents_values:InitGameMode()
	voice_radius:Init()
	dota1x6:UpdateLaneCreepsStats()
	dota1x6:UpdatePatrolCreepsStats()

	for i = 1, max_teams do
		if AvailableTeams[i] then
			GameRules:SetCustomGameTeamMaxPlayers(AvailableTeams[i], team_size)
		end
	end

	CustomNetTables:SetTableValue(
		"custom_pick",
		"game_mode",
		{
			team_size = team_size,
			max_teams = max_teams,
			win_place = win_place,
			is_ranked = not IsUnrankedMap(),
			same_heroes = same_heroes,
		}
	)
	CustomNetTables:SetTableValue(
		"custom_pick",
		"sub_config",
		{
			level_exp = sub_level_thresh,
			level_tiers = level_thresh,
			level_max = sub_level_max,
			points_max = sub_points_max,
		}
	)

	GameRules:GetGameModeEntity():SetThink("OnThink", self, "GlobalThink", 0)

	GameRules:GetGameModeEntity():SetGiveFreeTPOnDeath(false)
	GameRules:SetPreGameTime(99999)
	GameRules:GetGameModeEntity():SetDaynightCycleDisabled(true)
	GameRules:SetCustomGameEndDelay(3)
	GameRules:SetCustomVictoryMessageDuration(120)
	GameRules:SetPostGameTime(120)
	GameRules:SetTreeRegrowTime(4)
	GameRules:GetGameModeEntity():SetCustomBuybackCostEnabled(true)
	GameRules:GetGameModeEntity():SetCustomBackpackCooldownPercent(1)
	GameRules:GetGameModeEntity():SetTPScrollSlotItemOverride("item_tpscroll_custom")
	GameRules:GetGameModeEntity():SetAnnouncerDisabled(true)
	GameRules:GetGameModeEntity():SetAnnouncerGameModeAnnounceDisabled(true)
	GameRules:GetGameModeEntity():SetPlayerHeroAvailabilityFiltered(true)
	GameRules:SetHeroSelectionTime(9999999)
	GameRules:SetHeroSelectPenaltyTime(0)
	GameRules:SetSameHeroSelectionEnabled(same_heroes)
	GameRules:SetStrategyTime(2)
	GameRules:SetShowcaseTime(0)
	GameRules:SetStartingGold(0)
	GameRules:GetGameModeEntity():SetCustomGlyphCooldown(300)
	GameRules:SetUseUniversalShopMode(true)
	GameRules:GetGameModeEntity():SetLoseGoldOnDeath(false)
	GameRules:SetSafeToLeave(true)
	GameRules:GetGameModeEntity():SetPauseEnabled(false)
	GameRules:GetGameModeEntity():SetForcedHUDSkin("reborn")
	GameRules:GetGameModeEntity():SetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_STRENGTH_DAMAGE, 0.9)
	GameRules:GetGameModeEntity():SetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0.9)
	GameRules:GetGameModeEntity():SetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE, 0.9)
	GameRules:GetGameModeEntity():SetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_ALL_DAMAGE, 0.4)

	match_log:WrapClass("dota1x6", true)
	--GameRules:GetGameModeEntity():SetDamageFilter( Dynamic_Wrap( dota1x6, "DamageFilter" ), self )
	--GameRules:GetGameModeEntity():SetHealingFilter( Dynamic_Wrap( dota1x6, "HealingFilter" ), self )
	GameRules:GetGameModeEntity():SetBountyRunePickupFilter(Dynamic_Wrap(self, "BountyRunePickupFilter"), self)

	GameRules:GetGameModeEntity():SetModifyExperienceFilter(Dynamic_Wrap(self, "ExpFilter"), self)
	GameRules:GetGameModeEntity():SetExecuteOrderFilter(Dynamic_Wrap(dota1x6, "ExecuteOrderFilterCustom"), self)
	GameRules:GetGameModeEntity():SetItemAddedToInventoryFilter(Dynamic_Wrap(self, "ItemAddedFilter"), self)
	GameRules:GetGameModeEntity():SetModifyGoldFilter(Dynamic_Wrap(self, "ModifyGoldFilter"), self)
	GameRules:SetFilterMoreGold(true)
	GameRules:SetUseBaseGoldBountyOnHeroes(true)

	ListenToGameEvent("entity_killed", Dynamic_Wrap(self, "OnEntityKilled"), self)
	ListenToGameEvent("dota_rune_activated_server", Dynamic_Wrap(self, "OnRuneActivated"), self)
	ListenToGameEvent("npc_spawned", Dynamic_Wrap(self, "OnNPCSpawned"), self)
	ListenToGameEvent("game_rules_state_change", Dynamic_Wrap(self, "OnGameRulesStateChange"), self)
	ListenToGameEvent("dota_player_gained_level", Dynamic_Wrap(self, "OnPlayerLevelUp"), self)
	ListenToGameEvent("dota_player_learned_ability", Dynamic_Wrap(self, "OnAbilityLearned"), self)
	ListenToGameEvent("dota_glyph_used", Dynamic_Wrap(self, "OnGlyphUsed"), self)
	ListenToGameEvent("dota_item_picked_up", Dynamic_Wrap(self, "OnItemPickUp"), self)

	local relay_api_ok, relay_network = pcall(require, "dml.network")
	if not relay_api_ok then
		print("[SDR] dml.network not found: " .. tostring(relay_network))
	elseif not relay_network or type(relay_network.client_relays) ~= "function" then
		print("[SDR] dml.network.client_relays unavailable")
	end

	local connect_times = {}

	ListenToGameEvent("player_connect_full", function(kv)
		local player_id = kv.PlayerID
		if type(player_id) ~= "number" then
			return
		end
		if not PlayerResource:GetPlayer(player_id) then
			return
		end

		local rate = Convars:GetInt("sv_minrate")
		connect_times[player_id] = { connect = Time() }
		print("[RATE] player=" .. player_id .. " sv_minrate=" .. tostring(rate))
		if rate > 80000 then
			Timers:CreateTimer(3, function()
				if not PlayerResource:GetPlayer(player_id) then
					return
				end
				FireGameEvent("dota1x6_client_rate", { player_id = player_id, rate = rate })
				connect_times[player_id].rate = Time()
				print("[RATE] dota1x6_client_rate sent player=" .. player_id .. " rate=" .. rate)
			end)
		end

		local steam_id = tostring(PlayerResource:GetSteamID(player_id))

		local function send_best_relay(attempts_remaining)
			if
				not PlayerResource:GetPlayer(player_id)
				or tostring(PlayerResource:GetSteamID(player_id)) ~= steam_id
			then
				return
			end
			if not relay_api_ok or not relay_network or type(relay_network.client_relays) ~= "function" then
				return
			end

			local routes, err = relay_network.client_relays(steam_id)
			if routes then
				for _, relay in ipairs(routes.relays or {}) do
					if type(relay.pop) == "string" then
						FireGameEvent("sdr_relay_switch", {
							player_id = player_id,
							relay = relay.pop,
						})
						print(
							"[SDR] sdr_relay_switch sent steamid:"
								.. steam_id
								.. " relay="
								.. relay.pop
								.. " ping_ms="
								.. tostring(relay.ping_ms)
						)
						return
					end
				end
			end

			if attempts_remaining > 0 then
				Timers:CreateTimer(0.5, function()
					send_best_relay(attempts_remaining - 1)
				end)
			else
				print(
					"[SDR] relay lookup attempts exhausted steamid:"
						.. steam_id
						.. " reason="
						.. tostring(err or "no session-ready relay")
				)
			end
		end

		send_best_relay(10)
	end, nil)

	ListenToGameEvent("player_disconnect", function(data)
		local player_id = data.PlayerID
		if type(player_id) ~= "number" then
			return
		end
		local times = connect_times[player_id] or {}
		local time = Time()
		print(
			"[DISCONNECT] player="
				.. player_id
				.. " id="
				.. tostring(data.networkid)
				.. " reason="
				.. tostring(data.reason)
				.. " full="
				.. tostring(data.ever_fully_connected)
				.. " state="
				.. GameRules:State_Get()
				.. " connect="
				.. (times.connect and string.format("%.1f", time - times.connect) or "nil")
				.. " rate="
				.. (times.rate and string.format("%.1f", time - times.rate) or "nil")
		)
	end, nil)

	ListenToGameEvent("player_connect_full", Dynamic_Wrap(hero_select, "PlayerConnected"), hero_select)
	ListenToGameEvent("dota_item_purchased", Dynamic_Wrap(self, "ItemPurchased"), self)

	local loaded = {}
	local reset_done = false

	ListenToGameEvent("player_connect_full", function(kv)
		if reset_done then
			return
		end
		if not kv.PlayerID then
			return
		end

		loaded[kv.PlayerID] = true

		local count = 0

		for _ in pairs(loaded) do
			count = count + 1
		end

		if count < players_in_team * max_teams then
			return
		end

		reset_done = true
		GameRules:ResetToCustomGameSetup()
	end, nil)

	if IsInToolsMode() then
		ListenToGameEvent("player_chat", Dynamic_Wrap(self, "OnPlayerChatDebug"), self)
	end

	CustomGameEventManager:RegisterListener("SelectVO", Dynamic_Wrap(chat_wheel, "SelectVO"))
	CustomGameEventManager:RegisterListener("SelectHeroVO", Dynamic_Wrap(chat_wheel, "SelectHeroVO"))
	CustomGameEventManager:RegisterListener("select_chatwheel_player", Dynamic_Wrap(chat_wheel, "SelectChatWheel"))
	CustomGameEventManager:RegisterListener("GiveGlobalVision", Dynamic_Wrap(self, "GiveGlobalVision"))
	CustomGameEventManager:RegisterListener("send_report", Dynamic_Wrap(self, "send_report"))
	CustomGameEventManager:RegisterListener("DoubleRating", Dynamic_Wrap(self, "DoubleRating"))
	CustomGameEventManager:RegisterListener("request_key", Dynamic_Wrap(self, "show_key"))
	CustomGameEventManager:RegisterListener("shop_buy_item_player", Dynamic_Wrap(shop, "shop_buy_item_player"))
	CustomGameEventManager:RegisterListener("heroes_vote_change", Dynamic_Wrap(shop, "heroes_vote_change"))
	CustomGameEventManager:RegisterListener("heroes_vote_free", Dynamic_Wrap(shop, "heroes_vote_free"))
	CustomGameEventManager:RegisterListener("get_bonus_shards", Dynamic_Wrap(shop, "get_bonus_shards"))
	CustomGameEventManager:RegisterListener("browser_subscribe", Dynamic_Wrap(shop, "browser_subscribe"))
	CustomGameEventManager:RegisterListener("change_premium_pet", Dynamic_Wrap(shop, "ChangePetPremium"))
	CustomGameEventManager:RegisterListener("ChangeSettings", Dynamic_Wrap(self, "ChangeSettings"))
	CustomGameEventManager:RegisterListener("RequestSettings", Dynamic_Wrap(self, "SendSettingsChange"))
	CustomGameEventManager:RegisterListener("request_player_heroes", Dynamic_Wrap(self, "SendPlayerHeroes"))
	CustomGameEventManager:RegisterListener("request_items", Dynamic_Wrap(self, "SendItems"))
	CustomGameEventManager:RegisterListener("request_minimap_icons", Dynamic_Wrap(self, "RequestMinimapIcons"))
	CustomGameEventManager:RegisterListener("request_player_stats", Dynamic_Wrap(self, "RequestPlayerStats"))
	CustomGameEventManager:RegisterListener("stats_tooltip_request", Dynamic_Wrap(self, "RequestStatsTooltip"))
	CustomGameEventManager:RegisterListener("item_tooltip_request", Dynamic_Wrap(self, "RequestItemTooltip"))
	CustomGameEventManager:RegisterListener("CustomPick", Dynamic_Wrap(self, "CustomPick"))
	CustomGameEventManager:RegisterListener("TipPlayer", Dynamic_Wrap(self, "TipPlayer"))
	CustomGameEventManager:RegisterListener("select_current_emblem", Dynamic_Wrap(shop, "select_current_emblem"))
	CustomGameEventManager:RegisterListener("select_current_effect", Dynamic_Wrap(shop, "select_current_effect"))
	CustomGameEventManager:RegisterListener(
		"dota1x6_item_change",
		Dynamic_Wrap(wearables_system, "dota1x6_item_change")
	)
	CustomGameEventManager:RegisterListener(
		"dota1x6_item_change_effects",
		Dynamic_Wrap(wearables_system, "dota1x6_item_change_effects")
	)
	CustomGameEventManager:RegisterListener("DoubleRating_show_change", Dynamic_Wrap(self, "DoubleRating_show_change"))
	CustomGameEventManager:RegisterListener("stop_timer", Dynamic_Wrap(self, "stop_timer"))
	CustomGameEventManager:RegisterListener("wtf_mode", Dynamic_Wrap(self, "wtf_mode"))
	CustomGameEventManager:RegisterListener("SelectQuest", Dynamic_Wrap(shop, "SelectQuest"))
	CustomGameEventManager:RegisterListener("update_tip_list", Dynamic_Wrap(shop, "update_tip_list"))
	CustomGameEventManager:RegisterListener("select_current_tip", Dynamic_Wrap(shop, "select_current_tip"))
	CustomGameEventManager:RegisterListener("select_current_high_five", Dynamic_Wrap(shop, "select_current_high_five"))
	CustomGameEventManager:RegisterListener("send_cursor_position", Dynamic_Wrap(self, "send_cursor_position"))
	CustomGameEventManager:RegisterListener("send_promo_code", Dynamic_Wrap(shop, "send_promo_code"))
	CustomGameEventManager:RegisterListener("accept_gift", Dynamic_Wrap(shop, "accept_gift"))
	CustomGameEventManager:RegisterListener(
		"shop_dota1x6_open_chest_get_items_list",
		Dynamic_Wrap(shop, "shop_dota1x6_open_chest_get_items_list")
	)
	CustomGameEventManager:RegisterListener(
		"shop_dota1x6_open_chest_get_reward",
		Dynamic_Wrap(shop, "shop_dota1x6_open_chest_get_reward")
	)
	CustomGameEventManager:RegisterListener("chest_pair_get_info", Dynamic_Wrap(shop, "SendPendingChestInfo"))
	CustomGameEventManager:RegisterListener("chest_pair_open", Dynamic_Wrap(shop, "OpenPendingChest"))
	CustomGameEventManager:RegisterListener("mark_item_seen", Dynamic_Wrap(shop, "MarkItemSeen"))
	-- CustomGameEventManager:RegisterListener( "buildChosen", Dynamic_Wrap(self, "buildChosen"))
	CustomGameEventManager:RegisterListener("buildRequest", Dynamic_Wrap(self, "buildRequest"))
	CustomGameEventManager:RegisterListener(
		"shop_dota1x6_close_chest_checked_reward",
		Dynamic_Wrap(shop, "shop_dota1x6_close_chest_checked_reward")
	)
	CustomGameEventManager:RegisterListener("RequestAchivments", Dynamic_Wrap(self, "RequestAchivments"))
	CustomGameEventManager:RegisterListener("RequestSubscribed", Dynamic_Wrap(self, "RequestSubscribed"))
	CustomGameEventManager:RegisterListener("RequestArcanaIcons", Dynamic_Wrap(self, "RequestArcanaIcons"))
	CustomGameEventManager:RegisterListener("RequestItemBuild", Dynamic_Wrap(self, "RequestItemBuild"))
	CustomGameEventManager:RegisterListener("update_damage_stats", Dynamic_Wrap(self, "UpdateDamageStats"))
	CustomGameEventManager:RegisterListener("update_damage_bar", Dynamic_Wrap(self, "UpdateDamageBar"))
	CustomGameEventManager:RegisterListener("send_courier_name", Dynamic_Wrap(shop, "send_courier_name"))
	CustomGameEventManager:RegisterListener("get_patrol_position", Dynamic_Wrap(self, "GetPatrolPosition"))
	CustomGameEventManager:RegisterListener("ChangeCustomRules", Dynamic_Wrap(self, "ChangeCustomRules"))
	CustomGameEventManager:RegisterListener("setup_start_now", Dynamic_Wrap(self, "SetupStartNow"))
	CustomGameEventManager:RegisterListener("RequestKunkkaPanel", Dynamic_Wrap(self, "RequestKunkkaPanel"))
	CustomGameEventManager:RegisterListener("kunkka_shop_buy", Dynamic_Wrap(self, "kunkka_shop_buy"))
	CustomGameEventManager:RegisterListener("RequestTalentIncrease", Dynamic_Wrap(self, "RequestTalentIncrease"))
	CustomGameEventManager:RegisterListener("GetPlayerNames", Dynamic_Wrap(self, "GetPlayerNames"))

	CustomNetTables:SetTableValue(
		"custom_pick",
		"game_mode",
		{
			team_size = team_size,
			max_teams = max_teams,
			win_place = win_place,
			is_ranked = not IsUnrankedMap(),
			same_heroes = same_heroes,
		}
	)

	if test then
		_G.PreGame_time = 5
		_G.push_timer = 0
		_G.Target_proc_count = Target_proc_max

		if test_patrol then
			_G.patrol_timer_max = 10
			_G.patrol_timer_max_2 = 10
			_G.patrol_wave = 0

			if test_patrol == 2 then
				_G.patrol_wave_2 = 0
			end
			if test_patrol == 3 then
				_G.tormentor_wave = 0
			end
		end
	end

	local overview = LoadKeyValues("resource/overviews/" .. GetMapName() .. ".txt")
	if overview then
		minimap_overview.x = tonumber(overview.pos_x)
		minimap_overview.y = tonumber(overview.pos_y)
		minimap_overview.size = tonumber(overview.scale) * 1024
	end

	local items = LoadKeyValues("scripts/shops.txt")
	for name, data in pairs(items) do
		shop_items[name] = data
	end

	local neutrals = LoadKeyValues("scripts/npc/neutral_items.txt").neutral_tiers
	for tier, data in pairs(neutrals) do
		neutral_items[tier] = data
	end

	local items_list = LoadKeyValues("scripts/npc/npc_ability_ids.txt")
	local item_ids = {}
	if items_list and items_list["ItemAbilities"] then
		for item_name, item_id in pairs(items_list["ItemAbilities"]["Locked"]) do
			item_ids[item_name] = tonumber(item_id)
		end
	end
	local items_list_custom = LoadKeyValues("scripts/npc/npc_ability_ids_custom.txt")
	if items_list_custom and items_list_custom["ItemAbilities"] then
		for item_name, item_id in pairs(items_list_custom["ItemAbilities"]["Locked"]) do
			item_ids[item_name] = tonumber(item_id)
		end
	end

	CustomNetTables:SetTableValue("items_ids", "items_ids", item_ids)
end

function dota1x6:OnNPCSpawned(event)
	local unit = EntIndexToHScript(event.entindex)
	local new_spawned_hero = EntIndexToHScript(event.entindex)

	if IsValid(unit) and HubUnit(unit) and not unit:HasModifier("modifier_stats_hub") then
		unit:AddNewModifier(unit, nil, "modifier_stats_hub", {})
	end

	wearables_system:InitPlayerWerable(unit)

	if unit:GetTeamNumber() == DOTA_TEAM_NEUTRALS and unit:IsCreep() and unit:GetUnitName() ~= "npc_dota_thinker" then
		if unit:IsAncient() and dota1x6:IsCustomRules("no_ancients") then
			unit:Kill(nil, nil)
			return
		end

		local stats = CreepsStats[unit:GetUnitName()]
		local gold = stats and stats.gold or unit:GetMinimumGoldBounty()
		local exp = stats and stats.exp or unit:GetDeathXP()

		if stats then
			dota1x6:SetCreepStats(unit)
			unit:AddNewModifier(unit, nil, "modifier_neutral_creep", {})
			if not dota1x6:IsCustomRules("only_cone") and not stats.no_upgrade then
				NeutralCreeps[unit] = true
			end
		end

		unit:SetMaximumGoldBounty(gold * GoldK)
		unit:SetMinimumGoldBounty(gold * GoldK)
		unit:SetDeathXP(exp * ExpK)

		if dota1x6:IsCustomRules("only_cone") and stats then
			unit:AddNewModifier(unit, nil, "modifier_rule_only_cone", {})
		end
	end

	if unit and unit:HasAbility("twin_gate_portal_warp") then
		unit:RemoveAbility("twin_gate_portal_warp")
	end

	if unit:IsHero() then
		shop:UpdateEmblemForHero(unit, unit:GetId())
	end

	if unit:IsRealHero() and not players[unit:GetId()] then
		print(
			"HERO SPAWN",
			unit:GetId(),
			unit:GetUnitName(),
			event.is_respawn,
			SpawnedPlayers,
			PlayerCount,
			GameRules:GetDOTATime(false, false)
		)
	end

	if SpawnedPlayers >= PlayerCount then
		return
	end

	if unit and unit:IsRealHero() and (event.is_respawn == "0" or event.is_respawn == 0) then
		local id = unit:GetId()

		Timers:CreateTimer(0.1, function()
			if unit:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier") then
				return
			end
			if players[id] then
				return
			end

			GlobalHeroes[id] = unit

			unit:AddNewModifier(unit, nil, "modifier_start_stun", {})

			_G.SpawnedPlayers = _G.SpawnedPlayers + 1

			dota1x6:initiate_player(unit)
			if SelectedBases[id] then
				dota1x6:PlaceHero(id)
			end
		end)
	end
end

function dota1x6:SetCreepStats(unit)
	if unit.creeps_upgrade == CreepsUpgradeCount then
		return
	end
	unit.creeps_upgrade = CreepsUpgradeCount

	local stats = CreepsStats[unit:GetUnitName()]
	local upgrade = stats.no_upgrade and 0 or CreepsUpgradeCount
	local damage = math.floor(stats.damage * (1 + upgrade * CreepsUpgradeDamage / 100))
	local health = math.floor(stats.health * (1 + upgrade * CreepsUpgradeHealth / 100))
	local health_k = unit:GetHealth() / unit:GetMaxHealth()

	unit:SetBaseDamageMin(damage)
	unit:SetBaseDamageMax(damage)
	unit:SetBaseMaxHealth(health)
	unit:SetMaxHealth(health)
	unit:SetHealth(math.max(1, unit:GetMaxHealth() * health_k))
end

function dota1x6:UpdateLaneCreepsStats()
	local wave = dota1x6.current_wave
	local stats = {
		health = 1,
		damage = 1,
		exp = 0.85,
		armor = 0,
		magic = 10,
		speed = 0,
		pure = 0,
		amp = 33 * math.max(wave - 1, 0),
	}

	for i = 2, wave do
		if i >= 20 then
			stats.health = stats.health * 1.23
			stats.damage = stats.damage * 1.18
		elseif i >= 15 then
			stats.health = stats.health * 1.20
			stats.damage = stats.damage * 1.17
		elseif i >= 10 then
			stats.health = stats.health * 1.21
			stats.damage = stats.damage * 1.18
		else
			stats.health = stats.health * 1.30
			stats.damage = stats.damage * 1.23
		end

		if i == 11 then
			stats.health = stats.health * 1.3
			stats.damage = stats.damage * 1.3
		end

		stats.exp = stats.exp * 1.04
	end

	if wave >= 20 then
		stats.armor = 8
		stats.magic = -20
		stats.speed = 80
		stats.pure = 20
	elseif wave >= 15 then
		stats.armor = 6
		stats.magic = -10
		stats.speed = 40
		stats.pure = 10
	elseif wave >= 10 then
		stats.armor = 4
		stats.magic = 0
		stats.speed = 20
	end

	dota1x6.lane_creeps_stats = stats
end

function dota1x6:SetLaneCreepsStats(unit)
	local stats = dota1x6.lane_creeps_stats
	local health = stats.health
	local damage = stats.damage
	local ids = dota1x6:FindPlayers(unit.host_team)

	if ids and #ids == 2 then
		health = health * creeps_team_health
		damage = damage * creeps_team_damage
	end

	unit:AddNewModifier(unit, nil, "modifier_waveupgrade", { amp = stats.amp, speed = stats.speed, pure = stats.pure })

	local max_health = math.floor(unit:GetBaseMaxHealth() * health)
	local bonus_damage = math.floor(unit:GetBaseDamageMin() * (damage - 1))
	local gold = unit:GetMinimumGoldBounty() * 1.15

	unit:SetBaseMaxHealth(max_health)
	unit:SetMaxHealth(max_health)
	unit:SetHealth(max_health)
	unit:SetBaseDamageMin(unit:GetBaseDamageMin() + bonus_damage)
	unit:SetBaseDamageMax(unit:GetBaseDamageMax() + bonus_damage)
	unit:SetPhysicalArmorBaseValue(unit:GetPhysicalArmorBaseValue() + stats.armor)
	unit:SetBaseMagicalResistanceValue(unit:GetBaseMagicalResistanceValue() + stats.magic)
	unit:SetMinimumGoldBounty(gold)
	unit:SetMaximumGoldBounty(gold)
	unit:SetDeathXP(unit:GetDeathXP() * stats.exp)
end

function dota1x6:UpdatePatrolCreepsStats()
	local wave = dota1x6.current_wave
	local stats = {
		health = 1,
		damage = 1,
		gold = 1,
		exp = 1,
		blue = 1,
		magic = 0,
		pure = 0,
	}

	for i = 5, wave do
		if i >= 25 then
			stats.health = stats.health * 1.11
			stats.damage = stats.damage * 1.10
		elseif i >= 20 then
			stats.health = stats.health * 1.13
			stats.damage = stats.damage * 1.11
		elseif i >= 15 then
			stats.health = stats.health * 1.14
			stats.damage = stats.damage * 1.12
		elseif i >= 10 then
			stats.health = stats.health * 1.15
			stats.damage = stats.damage * 1.13
		else
			stats.health = stats.health * 1.15
			stats.damage = stats.damage * 1.20
		end

		if i == 13 then
			stats.health = stats.health * 1.4
		end

		stats.gold = stats.gold + 0.05
		stats.exp = stats.exp + 0.05
		stats.blue = stats.blue + 0.05
	end

	if wave >= 25 then
		stats.magic = -20
		stats.pure = 20
	elseif wave >= 20 then
		stats.magic = -15
		stats.pure = 15
	elseif wave >= 15 then
		stats.magic = -10
		stats.pure = 10
	end

	dota1x6.patrol_creeps_stats = stats
end

function dota1x6:SetPatrolCreepsStats(unit)
	local stats = dota1x6.patrol_creeps_stats
	local health = stats.health
	local damage = stats.damage

	if not IsSoloMode() then
		health = health * creeps_team_health
		damage = damage * creeps_team_damage
	end

	unit.patrol_pure = stats.pure
	unit.patrol_gold = stats.gold
	unit.patrol_blue = stats.blue

	local max_health = math.floor(unit:GetBaseMaxHealth() * health)
	local bonus_damage = math.floor(unit:GetBaseDamageMin() * (damage - 1))

	unit:SetBaseMaxHealth(max_health)
	unit:SetMaxHealth(max_health)
	unit:SetHealth(max_health)
	unit:SetBaseDamageMin(unit:GetBaseDamageMin() + bonus_damage)
	unit:SetBaseDamageMax(unit:GetBaseDamageMax() + bonus_damage)
	unit:SetBaseMagicalResistanceValue(unit:GetBaseMagicalResistanceValue() + stats.magic)
	unit:SetDeathXP(unit:GetDeathXP() * stats.exp)
end

function dota1x6:PlaceHero(id)
	if ValidId(id) and SelectedBases[id] and GlobalHeroes[id] then
		local unit = GlobalHeroes[id]

		local tower = Entities:FindByName(nil, "tower_" .. SelectedBases[id])
		if not tower then
			return
		end

		local position = tower:GetAbsOrigin() + RandomVector(300)

		unit:SetAbsOrigin(position)
		FindClearSpaceForUnit(unit, position, true)
		unit:SetRespawnPosition(position)

		local team = unit:GetTeamNumber()
		local respaw_pos = Entities:FindByName(nil, "tower_" .. SelectedBases[id] .. "_respawn")
		local spawner = Entities:FindByName(nil, "spawn" .. team)
		if spawner then
			if respaw_pos then
				spawner:SetAbsOrigin(respaw_pos:GetAbsOrigin())
			else
				spawner:SetAbsOrigin(position)
			end
		end

		PlayerResource:SetCameraTarget(id, unit)

		Timers:CreateTimer(0.1, function()
			PlayerResource:SetCameraTarget(id, nil)
			dota1x6:SetTower(unit, position)
			unit:RemoveModifierByName("modifier_start_stun")
			unit:Stop()
		end)

		if not unit.placed_in_base then
			unit.placed_in_base = true
			_G.ReadyPlayers = _G.ReadyPlayers + 1
		end

		if _G.ReadyPlayers >= PlayerCount then
			dota1x6:EndLoading()
		end
	end
end

function dota1x6:EndLoading()
	if _G.loading_ended then
		return
	end

	_G.loading_ended = true
	_G.ReadyPlayers = PlayerCount

	CustomGameEventManager:Send_ServerToAllClients("end_loading", {})
	CustomGameEventManager:Send_ServerToAllClients("PreGameEnd_top", {})
	--CustomGameEventManager:Send_ServerToAllClients( 'WaitingPlayers_end', {} )

	Timers:CreateTimer(1, function()
		dota1x6:UpdateHeroIcons()
		dota1x6:CheckBanStatus()
	end)
end

function dota1x6:clear_towers()
	local buildings = FindUnitsInRadius(
		DOTA_TEAM_NOTEAM,
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BUILDING + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
		FIND_CLOSEST,
		false
	)

	for _, building in pairs(buildings) do
		local team = building:GetTeamNumber()
		local is_teleport = building:GetUnitName() == "npc_teleport"

		if is_teleport then
			local number = tonumber(building:GetName())
			if IsDire(building:GetName()) then
				building:SetMaterialGroup("1")
			end

			if IsRadiant(building:GetName()) then
				building:SetMaterialGroup("0")
			end

			building:AddNewModifier(nil, nil, "modifier_mid_teleport", {})
		end

		if
			(is_teleport or building:IsBuilding())
			and team == DOTA_TEAM_CUSTOM_6
			and building:GetName() ~= "edge_teleport_1"
			and building:GetName() ~= "edge_teleport_2"
		then
			building:AddNewModifier(nil, nil, "modifier_tower_no_owner", {})
		end
	end
end

function dota1x6:SetTower(unit, new_point)
	local team = unit:GetTeamNumber()
	if towers[team] then
		return
	end

	local search_point = unit:GetAbsOrigin()
	if new_point then
		search_point = new_point
	end

	local closest_tower = nil
	local find_towers = FindUnitsInRadius(
		team,
		search_point,
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BUILDING + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
		FIND_CLOSEST,
		false
	)

	for _, tower in pairs(find_towers) do
		if
			(tower:GetUnitName() == "npc_towerradiant" or tower:GetUnitName() == "npc_towerdire")
			and not towers[tower:GetTeamNumber()]
		then
			closest_tower = tower
			break
		end
	end

	if not closest_tower then
		return
	end

	find_towers = FindUnitsInRadius(
		team,
		closest_tower:GetAbsOrigin(),
		nil,
		2500,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BUILDING + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
			+ DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_CLOSEST,
		false
	)
	for _, building in pairs(find_towers) do
		if
			(building:IsBuilding() or building:GetUnitName() == "npc_teleport") and not towers[building:GetTeamNumber()]
		then
			building:SetTeam(team)

			building:RemoveModifierByName("modifier_tower_no_owner")
			building:RemoveModifierByName("modifier_invulnerable")
			building:AddNewModifier(building, nil, "modifier_tower_incoming", { tower = closest_tower:entindex() })
			if building == closest_tower then
				towers[team] = building
				towers[team].won_duel = 0
				towers[team].duel_data = -1
				towers[team].next_duel = -1
				towers[team].last_enemy = nil
				towers[team].trap_wave = false
				towers[team].last_reward_count = nil
				towers[team].can_use_trap = false
				towers[team].ids = dota1x6:FindPlayers(team)
				towers[team].active_patrol = {}

				towers[team]:AddNewModifier(building, nil, "modifier_tower_level", {})

				for i = 1, 2 do
					local vision = Entities:FindByName(nil, building:GetName() .. "_vision_" .. tostring(i))
					if vision then
						AddFOWViewer(unit:GetTeamNumber(), vision:GetAbsOrigin(), 800, 99999, true)
					end
				end
			end

			if building:GetUnitName() == "npc_teleport" then
				teleports[building:GetTeamNumber()] = building
				local number = tonumber(building:GetName())
				local ids = dota1x6:FindPlayers(team)
				if ids then
					for _, id in pairs(ids) do
						if players[id] then
							players[id].map_team = number
						end
					end
				end
				towers[team].map_team = number
			end
		end
	end
	local tower = towers[unit:GetTeamNumber()]

	if game_start == false then
		tower:AddNewModifier(tower, nil, "modifier_tower_pre_game", {})
	end
end

function dota1x6:UpdateHeroIcons()
	for _, icon_id in pairs(hero_icons) do
		for team, _ in pairs(minimap_icons) do
			dota1x6:RemoveMinimapIcon(team, icon_id)
		end
	end

	hero_icons = {}

	for icon_team, icon_tower in pairs(towers) do
		local ids = dota1x6:FindPlayers(icon_team)
		if ids then
			local count = 0
			for _, id in pairs(ids) do
				local player = players[id]
				if player then
					local icon_id = "base_" .. id

					for target_team, target_tower in pairs(towers) do
						if target_team ~= icon_team or test then
							dota1x6:SetMinimapIcon(
								target_team,
								icon_id,
								icon_tower:GetAbsOrigin(),
								{ player = id, slot = count, slots = #ids }
							)
						end
					end

					hero_icons[#hero_icons + 1] = icon_id
				end
				count = count + 1
			end
		end
	end
end

function dota1x6:PreGame()
	hero_select:EndPick(true)
	dota1x6:initiate_waves()

	local spawners = Entities:FindAllByName("bounty_spawner")
	for _, spawner in pairs(spawners) do
		local abs = spawner:GetAbsOrigin()
		abs.z = GetGroundPosition(abs, nil).z + 50
		bounty_abs[#bounty_abs + 1] = Vector(abs.x, abs.y, abs.z)
		bounty_icons[#bounty_abs] = {}
	end

	for index, data in pairs(dota1x6.duel_arenas) do
		local trigger = Entities:FindByName(nil, "duel_arena_" .. index)
		if trigger then
			local spawners = Entities:FindAllByClassname("npc_dota_neutral_spawner")
			for _, spawner in pairs(spawners) do
				if
					spawner:GetAbsOrigin().z >= data.height
					and (spawner:GetAbsOrigin() - trigger:GetAbsOrigin()):Length2D() <= data.radius
				then
					if not data.spawners then
						data.spawners = {}
					end
					table.insert(data.spawners, spawner:GetAbsOrigin())
				end
			end

			for i = 1, 5 do
				local vision = Entities:FindByName(nil, "duel_arena_" .. index .. "_vision_" .. i)
				if vision then
					if not data.vision_abs then
						data.vision_abs = {}
					end
					table.insert(data.vision_abs, vision:GetAbsOrigin())
				end

				local wall_start = Entities:FindByName(nil, "duel_arena_" .. index .. "_wall_" .. i .. "_1")
				local wall_end = Entities:FindByName(nil, "duel_arena_" .. index .. "_wall_" .. i .. "_2")
				if wall_start and wall_end then
					if not data.walls then
						data.walls = {}
					end
					local result = {}
					result.start_pos = wall_start:GetAbsOrigin()
					result.end_pos = wall_end:GetAbsOrigin()
					table.insert(data.walls, result)
				end

				for team_count = 1, 2 do
					local start =
						Entities:FindByName(nil, "duel_arena_" .. index .. "_start_" .. i .. "_" .. team_count)
					if start then
						if not data.start_pos then
							data.start_pos = {}
						end
						if not data.start_pos[i] then
							data.start_pos[i] = {}
						end
						data.start_pos[i][team_count] = start:GetAbsOrigin()
					end
				end
			end
			data.arena_thinker = CreateModifierThinker(
				nil,
				nil,
				"modifier_duel_field_thinker",
				{ index = index },
				trigger:GetAbsOrigin(),
				DOTA_TEAM_NEUTRALS,
				false
			)
		end
	end

	for index = 1, 6 do
		local orb_shrine = Entities:FindByName(nil, "orbs_shrine_" .. index)
		if orb_shrine then
			orb_shrines[index] = orb_shrine
			orb_shrines_total = orb_shrines_total + 1
			for arena_index, data in pairs(dota1x6.duel_arenas) do
				if
					data.arena_thinker
					and (data.arena_thinker:GetAbsOrigin() - orb_shrine:GetAbsOrigin()):Length2D() <= data.radius
				then
					orb_shrine.duel_thinker = data.arena_thinker
					break
				end
			end
			orb_shrine:AddNewModifier(orb_shrine, nil, "modifier_orbs_shrine_custom", {})
		end
	end

	if orb_shrines_total >= 2 then
		orb_shrines_count = RandomInt(1, math.floor(orb_shrines_total / 2))
	end

	for index, data in pairs(dota1x6.patrol_data) do
		local trigger = Entities:FindByName(nil, "patrol_portal_" .. index)
		if trigger then
			dota1x6.patrol_data[index].spawner = trigger
		end
	end

	local haste_zones = Entities:FindAllByName("haste_zone")
	for _, zone in pairs(haste_zones) do
		local abs = zone:GetAbsOrigin()
		local thinker = CreateModifierThinker(
			nil,
			nil,
			"modifier_haste_zone_thinker_state",
			{},
			GetGroundPosition(abs, nil),
			DOTA_TEAM_NEUTRALS,
			false
		)
		if thinker then
			thinker:AddNewModifier(thinker, nil, "modifier_haste_zone_thinker", {})
		end
	end

	for _, watcher in pairs(Entities:FindAllByName("watcher_radiant")) do
		watcher_mods[#watcher_mods + 1] =
			watcher:AddNewModifier(watcher, nil, "modifier_watcher_custom", { material = 1 })
	end

	for _, watcher in pairs(Entities:FindAllByName("watcher_dire")) do
		watcher_mods[#watcher_mods + 1] =
			watcher:AddNewModifier(watcher, nil, "modifier_watcher_custom", { material = 2 })
	end

	if (IsInToolsMode() or GameRules:IsCheatMode() or not HTTP.IsValidGame(PlayerCount)) or enable_pause then
		GameRules:GetGameModeEntity():SetPauseEnabled(true)
	end

	dota1x6.mob_thinker =
		CreateModifierThinker(nil, nil, "modifier_mob_thinker", {}, Vector(), DOTA_TEAM_NEUTRALS, false)
	dota1x6.event_thinker =
		CreateModifierThinker(nil, nil, "modifier_event_thinker", {}, Vector(), DOTA_TEAM_NEUTRALS, false)

	Timers:CreateTimer(3, function()
		if #new_shop_heroes > 0 then
			CustomGameEventManager:Send_ServerToAllClients(
				"show_new_shop_heroes",
				{ sale = arcana_sale, heroes = new_shop_heroes }
			)
		end
	end)

	Timers:CreateTimer(1, function()
		CustomGameEventManager:Send_ServerToAllClients("init_hero_level", {})
	end)

	CustomGameEventManager:Send_ServerToAllClients(
		"init_chat",
		{ tools = IsInToolsMode(), cheat = GameRules:IsCheatMode(), valid = HTTP.IsValidGame(PlayerCount) }
	)
end

function dota1x6:EndPickStage()
	for id = 0, 24 do
		if ValidId(id) and GlobalHeroes[id] and towers[GlobalHeroes[id]:GetTeamNumber()] == nil then
			dota1x6:PlaceHero(id)
		end

		hero_select:EnsureHero(id)
	end

	for _, tower in pairs(towers) do
		tower:RemoveModifierByName("modifier_tower_pre_game")
	end

	if TestMode and not test then
		_G.PreGame_time = 7
		_G.push_timer = 30
	end

	GameRules:GetGameModeEntity():SetThink(start_game_timer, "StartGameTimer", 1)

	Timers:CreateTimer(EndLoading_timeout, function()
		dota1x6:EndLoading()
	end)
end

function start_game_timer()
	_G.PreGame_time = _G.PreGame_time - 1

	test_mode:InitPlayers()

	CustomGameEventManager:Send_ServerToAllClients("PreGameStart", { time = PreGame_time })

	if PreGame_time == 7 then
		CustomGameEventManager:Send_ServerToAllClients("generic_sound", { sound = "UI.Battle_begin_sound" })
	end

	if PreGame_time <= 0 then
		CustomGameEventManager:Send_ServerToAllClients("generic_sound", { sound = "UI.Battle_begin" })
		CustomGameEventManager:Send_ServerToAllClients("PreGameEnd", {})
		GameRules:ForceGameStart()
		return -1
	end

	return 1
end

function dota1x6:start_game()
	if game_start then
		return
	end

	_G.game_start = true
	match_log:Start()

	for _, tower in pairs(towers) do
		tower:RemoveModifierByName("modifier_tower_pre_game")
	end

	dota1x6:GiveVisionForAll(2)

	GameRules:SpawnNeutralCreeps()
end

function dota1x6:CheckBanStatus()
	if not test then
		--CustomGameEventManager:Send_ServerToAllClients('shop_new_promo', {} )
	end

	Timers:CreateTimer(2, function()
		--CustomGameEventManager:Send_ServerToAllClients('shop_global_sale', {} )
	end)

	if not HTTP.IsValidGame(PlayerCount) then
		Timers:CreateTimer(1, function()
			--	CustomGameEventManager:Send_ServerToAllClients( 'alert_notvalid', {} )
		end)
		return
	end

	local active_vote = CustomNetTables:GetTableValue("sub_data", "heroes_vote").active_vote

	if active_vote == 1 then
		CustomGameEventManager:Send_ServerToAllClients("show_active_vote", {})
	end

	for _, player in pairs(players) do
		local id = player:GetId()

		if active_vote == 0 then
			if player.islp then
				CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "alert_dont_leave", { lp = 1 })
			else
				--	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), 'alert_dont_leave', {lp = 0} )
			end
		end

		local name = tostring(GetMapName())
		local server_data = CustomNetTables:GetTableValue("server_data", tostring(id))
		local wrong_map_status = server_data.wrong_map_status

		if wrong_map_status and wrong_map_status == 2 then
			wrong_map_players[id] = true
		end

		if HTTP.serverData.isStatsMatch == true or test == true then
			if rating_thresh[name] and wrong_map_status then
				if wrong_map_status == 2 then
					player.banned = true
					CustomGameEventManager:Send_ServerToPlayer(
						PlayerResource:GetPlayer(id),
						"BadMap_ban",
						{ mmr = lobby_rating[id], min = rating_thresh[name].min, max = rating_thresh[name].max }
					)
				end

				if wrong_map_status == 1 then
					CustomGameEventManager:Send_ServerToPlayer(
						PlayerResource:GetPlayer(id),
						"BadMap",
						{ mmr = lobby_rating[id], min = rating_thresh[name].min, max = rating_thresh[name].max }
					)
				end
			else
				if active_vote == 0 then
					--CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), 'unranked_alert', {} )
				end
			end
			player.wrong_map_status = wrong_map_status
		end
	end
end

function dota1x6:send_report(kv)
	if kv.PlayerID == nil then
		return
	end

	local reported1 = PlayerResource:GetSteamAccountID(kv.Hero_1)
	local reported2 = PlayerResource:GetSteamAccountID(kv.Hero_2)
	local playerData = HTTP.GetPlayerData(kv.PlayerID)

	if playerData and playerData.reportedPlayers then
		for _, data in pairs(playerData.reportedPlayers) do
			if
				(
					tostring(reported1) == tostring(data.reportedPlayerId1)
					and tostring(reported2) == tostring(data.reportedPlayerId2)
				)
				or (
					tostring(reported2) == tostring(data.reportedPlayerId1)
					and tostring(reported1) == tostring(data.reportedPlayerId2)
				)
			then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(kv.PlayerID),
					"CreateIngameErrorMessage",
					{ message = "#report_not_valid2" }
				)
				return
			end
		end
	end

	if not dota1x6.active_reports then
		dota1x6.active_reports = {}
	else
		for _, data in pairs(dota1x6.active_reports) do
			if (data[1] == reported1 and data[2] == reported2) or (data[1] == reported2 and data[2] == reported1) then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(kv.PlayerID),
					"CreateIngameErrorMessage",
					{ message = "#report_not_valid" }
				)
				return
			end
		end
	end

	local reports = CustomNetTables:GetTableValue("reports", tostring(kv.PlayerID))
	if reports.report == 0 then
		return
	end

	reports.report = reports.report - 1

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(kv.PlayerID),
		"generic_sound",
		{ sound = "UI.Report_send" }
	)
	table.insert(dota1x6.active_reports, { reported1, reported2 })
	CustomNetTables:SetTableValue("reports", tostring(kv.PlayerID), reports)
	HTTP.Report(kv.PlayerID, kv.Hero_1, kv.Hero_2, 0)
end

function dota1x6:FillQuests(hero_name)
	local new_quests = {}
	local normal_quests = {}
	local legendary_quests = {}
	local general_quests = {}

	for number, shop_hero_quest in pairs(All_Quests.hero_quests[hero_name]) do
		if shop_hero_quest.legendary and shop_hero_quest.legendary ~= nil then
			legendary_quests[#legendary_quests + 1] = number
		else
			normal_quests[#normal_quests + 1] = number
		end
	end

	for number, shop_hero_quest in pairs(All_Quests.general_quests) do
		if
			(shop_hero_quest.not_for == nil or shop_hero_quest.not_for[hero_name] == nil)
			and (shop_hero_quest.only_for == nil or shop_hero_quest.only_for[hero_name] ~= nil)
		then
			general_quests[#general_quests + 1] = number
		end
	end

	if #normal_quests > 0 then
		new_quests[#new_quests + 1] =
			All_Quests.hero_quests[hero_name][normal_quests[RandomInt(1, #normal_quests)]].name
	end

	if #legendary_quests > 0 then
		new_quests[#new_quests + 1] =
			All_Quests.hero_quests[hero_name][legendary_quests[RandomInt(1, #legendary_quests)]].name
	end

	if #general_quests > 0 then
		local name = All_Quests.general_quests[general_quests[RandomInt(1, #general_quests)]].name
		new_quests[#new_quests + 1] = name
	end

	return new_quests
end

function dota1x6:AssignTeams()
	local teams = { 2, 3, 6, 7 }
	if IsSoloMode() then
		teams = { 2, 3, 6, 7, 12, 9 }
	end

	local filled = {}
	for _, team in pairs(teams) do
		filled[team] = 0
	end

	for id = 0, 24 do
		if ValidId(id) then
			local team = PlayerResource:GetTeam(id)
			if filled[team] then
				filled[team] = filled[team] + 1
			end
		end
	end

	for id = 0, 24 do
		if ValidId(id) and PlayerResource:GetTeam(id) == DOTA_TEAM_NOTEAM then
			for _, team in pairs(teams) do
				if filled[team] < players_in_team then
					PlayerResource:SetCustomTeamAssignment(id, team)
					filled[team] = filled[team] + 1
					break
				end
			end
		end
	end
end

function dota1x6:OnGameRulesStateChange()
	local nNewState = GameRules:State_Get()

	if nNewState == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
		HTTP.FillOfflineServerData()
		_G.GAME_STARTED = true

		HTTP.MatchStart()

		for id = 0, 24 do
			if ValidId(id) then
				_G.PlayerCount = _G.PlayerCount + 1

				local party_id = PlayerResource:GetPartyID(id)
				if party_id ~= 0 and party_id ~= "0" then
					PartyTable[id] = tostring(party_id)
				end

				local reports = 1
				local max_map = 0
				if
					rating_thresh[GetMapName()]
					and rating_thresh[GetMapName()]["max"]
					and rating_thresh[GetMapName()]["max"] == 99999
				then
					--reports = 0
					max_map = 1
				end

				CustomNetTables:SetTableValue("reports", tostring(id), { max_map = max_map, report = reports })
			end
		end

		if PlayerCount <= TestMode_players then
			_G.TestMode = true

			for name, _ in pairs(added_shop_heroes) do
				wearables_system:AddPrecachedData(name)
				wearables_system.ITEMS_DATA[name] = require("wearables_system/donate_items/" .. name)
				wearables_system:SendHeroItems(name)
			end
		end

		local custom_rules = pro_mod and pro_mod_data.custom_rules
		if custom_rules then
			Timers:CreateTimer(0.5, function()
				dota1x6:RequestCustomRules()
				if GameRules:State_Get() ~= DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
					return
				end
				return 1
			end)
		end

		if setup_delay > 0 then
			_G.setup_deadline = GameRules:GetGameTime() + setup_delay

			local finish_calls = 0

			Timers:CreateTimer(0.5, function()
				if GameRules:State_Get() ~= DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
					return
				end

				local left = math.max(0, math.ceil(setup_deadline - GameRules:GetGameTime()))

				CustomGameEventManager:Send_ServerToAllClients("setup_time", { time = left })

				if left <= 0 then
					finish_calls = finish_calls + 1

					if finish_calls % 20 == 1 then
						print("SETUP FINISH", finish_calls, GameRules:GetGameTime())

						for id = 0, 24 do
							if ValidId(id) then
								print(
									"SETUP FINISH PLAYER",
									id,
									PlayerResource:GetConnectionState(id),
									PlayerResource:GetTeam(id)
								)
							end
						end
					end

					GameRules:FinishCustomGameSetup()
				end

				return 0.5
			end)
		end

		dota1x6:clear_towers()
	end

	if nNewState == DOTA_GAMERULES_STATE_HERO_SELECTION then
		if dota1x6:IsCustomRules() then
			GameRules:SetSameHeroSelectionEnabled(pro_mod_data.same_heroes)

			local game_mode = CustomNetTables:GetTableValue("custom_pick", "game_mode")
			game_mode.same_heroes = pro_mod_data.same_heroes
			CustomNetTables:SetTableValue("custom_pick", "game_mode", game_mode)
		end

		if pro_mod and pro_mod_data.enable_pause then
			_G.enable_pause = true
		end

		dota1x6:AssignTeams()

		for id = 0, 24 do
			if ValidId(id) then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(id),
					"get_player_names",
					{ id = id }
				)
			end
		end

		CustomNetTables:SetTableValue("custom_pick", "pick_state", { in_progress = not hero_test })
		CustomNetTables:SetTableValue("custom_pick", "avg_rating", { avg_rating = avg_rating })

		Timers:CreateTimer("hero_select_init", {
			useGameTime = false,
			endTime = 1,
			callback = function()
				hero_select:init()
			end,
		})

		Timers:CreateTimer("main_timer", {
			useGameTime = false,
			endTime = 0,
			callback = function()
				if not dota1x6:pcall(dota1x6.spawn_timer) and dota1x6.wave_tick_open then
					dota1x6.wave_tick_open = false
					timer = 0
					if dota1x6.go_wave >= #waves then
						dota1x6.go_wave = 0
					end
				end

				return main_timer_interval
			end,
		})
	end

	if nNewState == DOTA_GAMERULES_STATE_PRE_GAME then
		dota1x6:PreGame()
	end

	if nNewState == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
		dota1x6:start_game()
	end
end

function dota1x6:TowerKill(hero, killed_tower)
	local team = hero:GetTeamNumber()
	local tower = towers[team]
	if not tower then
		return
	end

	local heroes = dota1x6:FindPlayers(team, false, true)
	for _, player in pairs(heroes) do
		local orb = 3
		if player.towers_destroyed > 0 then
			orb = 2
		end
		player.towers_destroyed = player.towers_destroyed + 1

		if GameRules:GetDOTATime(false, false) >= push_timer then
			dota1x6:RefreshCooldowns(player, true)
			dota1x6:CreateUpgradeOrb(player, orb)
		end
	end
end

function dota1x6:Destroy_Wave_Creeps()
	local wave_creeps = FindUnitsInRadius(
		DOTA_TEAM_NOTEAM,
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		0,
		false
	)
	for _, wave_creep in pairs(wave_creeps) do
		if
			not wave_creep:IsNull()
			and wave_creep:GetTeamNumber() == DOTA_TEAM_CUSTOM_5
			and wave_creep:IsAlive()
			and not wave_creep.player_unit
		then
			wave_creep:AddNewModifier(wave_creep, nil, "modifier_death", {})
			wave_creep:ForceKill(false)
		end
	end
end

function dota1x6:Destroy_All_Units(caster)
	local all_units = FindUnitsInRadius(
		caster:GetTeamNumber(),
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
			+ DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED,
		0,
		false
	)
	for _, unit in pairs(all_units) do
		if
			not unit:IsNull()
			and unit:IsAlive()
			and not unit:IsRealHero()
			and not unit:IsCourier()
			and not unit:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
		then
			unit:ForceKill(false)
		end
	end
end

function dota1x6:DestroyPatrol()
	if not IsServer() then
		return
	end

	local patrols = FindUnitsInRadius(
		1,
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
			+ DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		FIND_CLOSEST,
		false
	)

	for _, patrol in pairs(patrols) do
		if patrol and not patrol:IsNull() and patrol.is_patrol_creep then
			patrol:AddNewModifier(patrol, nil, "modifier_death", {})
			patrol:ForceKill(false)
		end
	end
end

function MaxTime(n)
	if n >= 13 then
		if dota1x6.top3_left then
			return 150
		else
			return 180
		end
	end

	if n >= 6 then
		return 120
	end
	if n == 1 then
		return 20
	end
	return 70
end

function dota1x6:SetWaveTimer(left)
	timer = MaxTimer - left
end

function dota1x6:GetWaveTimer()
	return timer, MaxTimer
end

function dota1x6:SetPatrolLaunched(state)
	patrol_launched = state
end

function dota1x6:SpawnBountyRunes()
	for i = 1, #bounty_abs do
		if not IsValid(bounty_runes[i]) then
			bounty_runes[i] = CreateRune(bounty_abs[i], DOTA_RUNE_BOUNTY)

			for team, _ in pairs(towers) do
				if not bounty_icons[i][team] then
					bounty_icons[i][team] = true
					dota1x6:SetMinimapIcon(
						team,
						"bounty_" .. i,
						bounty_abs[i],
						{ image = "file://{images}/custom_game/icons/mini/alerts_mini/bounty.png" }
					)
				end
			end
		end
	end
end

function dota1x6:StartBountyWatch()
	Timers:CreateTimer("bounty_watch", {
		endTime = 0.1,
		callback = function()
			local waiting = 0

			for i = 1, #bounty_abs do
				if not IsValid(bounty_runes[i]) then
					for team, _ in pairs(bounty_icons[i]) do
						if IsLocationVisible(team, bounty_abs[i]) then
							bounty_icons[i][team] = nil
							dota1x6:RemoveMinimapIcon(team, "bounty_" .. i)
						else
							waiting = waiting + 1
						end
					end
				end
			end

			if waiting == 0 then
				return nil
			end

			return 1
		end,
	})
end

function dota1x6:StartWatcherWatch()
	Timers:CreateTimer("watcher_watch", {
		endTime = 0.1,
		callback = function()
			local waiting = 0

			for _, mod in pairs(watcher_mods) do
				if IsValid(mod) then
					waiting = waiting + mod:UpdateIcons()
				end
			end

			if waiting == 0 then
				return nil
			end

			return 1
		end,
	})
end

function dota1x6:RemoveTeamIcons(team)
	for i = 1, #bounty_abs do
		bounty_icons[i][team] = nil
		dota1x6:RemoveMinimapIcon(team, "bounty_" .. i)
	end

	for _, mod in pairs(watcher_mods) do
		if IsValid(mod) then
			mod:RemoveTeamIcon(team)
		end
	end
end

function dota1x6:StartTheHunt(tower, reason)
	if not IsValid(tower) then
		return false
	end
	if dota1x6.TargetCurrentActive then
		return false
	end

	local mod = tower:AddNewModifier(
		tower,
		nil,
		"modifier_the_hunt_custom_tower",
		{ duration = Target_duration, reason = reason }
	)

	return mod ~= nil
end

function dota1x6:TeamInDuel(team)
	local ids = dota1x6:FindPlayers(team)
	if not ids then
		return false
	end

	for _, id in pairs(ids) do
		local hero = players[id]
		if
			hero
			and (
				hero.died_on_duel
				or hero:HasModifier("modifier_duel_hero_thinker")
				or hero:HasModifier("modifier_duel_hero_return")
			)
		then
			return true
		end
	end

	return false
end

function dota1x6:GetPatrolIndexes()
	local count = 0
	for _, tower in pairs(towers) do
		count = count + 1
	end

	local patrol_map = {}
	local patrol_count = 0
	local special_vision = nil

	if count == 4 and dota1x6.patrol_data["mid"] then
		special_vision = {}

		for index, data in pairs(dota1x6.patrol_data) do
			patrol_map[index] = false
			local team_count = 0
			if data.teams then
				local solo_team
				for team, tower in pairs(towers) do
					for _, check_team in pairs(data.teams) do
						if tower.map_team == check_team then
							team_count = team_count + 1
							solo_team = team
						end
					end
				end
				if team_count == 1 and solo_team then
					special_vision[solo_team] = true
				end
			end
			if team_count >= 2 then
				patrol_map[index] = true
				patrol_count = patrol_count + 1
			end
		end

		if patrol_count <= 1 then
			patrol_map["mid"] = true
		end
	end

	local allowed = {}

	for index, data in pairs(dota1x6.patrol_data) do
		local allow = false
		if dota1x6.patrol_data["mid"] then
			if count == 4 then
				allow = patrol_map[index]
			else
				if (count <= 3 and index == "mid") or (count > 3 and index ~= "mid") then
					allow = true
				end
			end

			if dota1x6:IsCustomRules("patrol_center") then
				allow = index == "mid"
			end
		else
			allow = true
		end

		allowed[index] = allow
	end

	return allowed, special_vision
end

function dota1x6:CheckPatrol()
	if dota1x6:FinalDuel() then
		return
	end
	if #dota1x6.patrol_data <= 0 then
		return
	end
	if patrol_wave > dota1x6.current_wave then
		return
	end

	local result = {}
	local patrol_max = patrol_timer_max
	local is_tormentor = tormentor_wave == dota1x6.current_wave and not dota1x6:IsCustomRules("no_tormentor")

	if dota1x6:IsCustomRules("no_patrol") and not is_tormentor then
		return
	end

	result.patrol_creeps = {}

	for id, player in pairs(players) do
		result.patrol_creeps[id] = {}
		result.patrol_creeps[id].type = is_tormentor and 2 or 1
		local tower = towers[player:GetTeamNumber()]
		if patrol_launched and tower then
			local count = 0
			local new_type = 0
			for creep, type in pairs(tower.active_patrol) do
				count = count + 1
				new_type = type
			end
			result.patrol_creeps[id].count = count
			result.patrol_creeps[id].type = new_type
		end
	end

	if patrol_launched == true then
		return result
	end

	if dota1x6.current_wave >= patrol_wave_2 or is_tormentor then
		patrol_max = patrol_timer_max_2
	end

	for _, data in pairs(duel_data) do
		if data.finished == 0 and data.duel_mod and not data.duel_mod:IsNull() then
			dota1x6.patrol_duel_end = timer
			result.duel_wait = 1
		end
	end

	if result.duel_wait then
		return result
	end

	if dota1x6.patrol_duel_end then
		patrol_max = dota1x6.patrol_duel_end + patrol_duel_delay
	end

	local show_portal = timer + PortalDelay == patrol_max
	local spawn_creeps = timer == patrol_max

	result.timer = (patrol_max - timer)

	if not show_portal and not spawn_creeps then
		return result
	end
	if GameRules:IsGamePaused() then
		return result
	end

	local allowed, special_vision = dota1x6:GetPatrolIndexes()

	for index, allow in pairs(allowed) do
		if allow then
			if show_portal then
				dota1x6:spawn_patrol(index, is_tormentor, true, special_vision)
			end
			if spawn_creeps then
				dota1x6:spawn_patrol(index, is_tormentor, false, special_vision)
			end
		end
	end

	if spawn_creeps then
		dota1x6:SetPatrolLaunched(true)
		if is_tormentor then
			tormentor_wave = tormentor_wave + tormentor_inc
		end
	end

	return result
end

function dota1x6:TimerAlerts()
	if GameRules:GetDOTATime(false, false) >= DoubleRating_timer and DoubleRating_active == true then
		DoubleRating_active = false
		CustomGameEventManager:Send_ServerToAllClients("hide_double_rating", {})
	end

	if GameRules:GetDOTATime(false, false) >= push_timer and push_alert == false then
		push_alert = true
		CustomGameEventManager:Send_ServerToAllClients("PushAlert", {})
	end

	if dota1x6.current_wave == patrol_wave and timer >= patrol_timer_max - 10 and patrol_first_init == false then
		patrol_first_init = true
		CustomGameEventManager:Send_ServerToAllClients("PatrolAlert", { number = 1 })
	end

	if dota1x6.current_wave == patrol_wave_2 and timer >= patrol_timer_max_2 - 10 and patrol_second_init == false then
		patrol_second_init = true
		CustomGameEventManager:Send_ServerToAllClients("PatrolAlert", { number = 2 })
	end

	if SafeToLeave_alert == false and SafeToLeave == true and (HTTP.serverData.isStatsMatch == true or test) then
		SafeToLeave_alert = true
		CustomGameEventManager:Send_ServerToAllClients("saveleave", { reason = SafeToLeave_reason })
	end

	if (MaxTimer - timer) <= duel_alert_timer and duel_alert_init == false and dota1x6:FinalDuel() == false then
		local array = {}

		for _, data in pairs(duel_data) do
			if
				data.stage == 1
				and data.finished == 0
				and data.final_duel == 0
				and towers[data.tower1:GetTeamNumber()]
				and towers[data.tower2:GetTeamNumber()]
			then
				table.insert(array, data.heroes)
			end
		end

		if #array > 0 then
			duel_alert_init = true
			CustomGameEventManager:Send_ServerToAllClients("DuelAlert", { array = array })
		end
	end
end

function dota1x6:DuelSoon()
	--local tower = towers[team]
	--if not tower then return false end

	if dota1x6:IsDuelWave() and (MaxTimer - timer) <= duel_push_time then -- duel_data[tower.duel_data] and duel_data[tower.duel_data].finished == 0 and duel_data[tower.duel_data].stage == 1 and (MaxTimer - timer) <= duel_push_time then
		return true
	end

	return false
end

function dota1x6:FinalDuel()
	if duel_data[#duel_data] and duel_data[#duel_data].finished == 0 and duel_data[#duel_data].final_duel == 1 then
		return true
	else
		return false
	end
end

function dota1x6:GetTeamsNet()
	local team_net = {}

	for id, player in pairs(players) do
		local team = player:GetTeamNumber()
		local index = #team_net + 1

		for count = 1, #team_net do
			if team_net[count] and team_net[count].team == team then
				index = count
				break
			end
		end

		if index == #team_net + 1 then
			team_net[index] = {}
			team_net[index].gold = 0
			team_net[index].kills = 0
			team_net[index].team = team
		end

		team_net[index].gold = team_net[index].gold + player.networth -- PlayerResource:GetNetWorth(id)
		team_net[index].kills = team_net[index].kills + player.kills_done
	end
	return team_net
end

function dota1x6:ActivateOrbShrines(override_wave, instant)
	local wave = override_wave and override_wave or dota1x6.current_wave
	if wave < orb_shrines_wave then
		return
	end
	if orb_shrines_total < 2 then
		return
	end

	local half = math.floor(orb_shrines_total / 2)
	local active = {}

	if dota1x6:IsCustomRules("random_shrines") then
		local random1 = RandomInt(1, orb_shrines_total)
		repeat
			random2 = RandomInt(1, orb_shrines_total)
		until random2 ~= random1

		active[random1] = true
		active[random2] = true
	else
		active[orb_shrines_count] = true
		active[orb_shrines_count + half] = true
	end

	for index, thinker in pairs(orb_shrines) do
		local mod = thinker:FindModifierByName("modifier_orbs_shrine_custom")
		if mod then
			mod:Activate(wave, active[index], instant)
		end
	end

	orb_shrines_count = orb_shrines_count + 1
	if orb_shrines_count > half then
		orb_shrines_count = 1
	end
end

function dota1x6:NightStalkerInnate(caster)
	if dota1x6.night_stalker_init then
		return
	end
	dota1x6.night_stalker_init = true

	if not caster.stalker_innate_ability then
		return
	end

	_G.night_timer = _G.night_timer + caster.stalker_innate_ability.night_timer
	_G.day_timer = _G.day_timer + caster.stalker_innate_ability.day_timer
	_G.day_count = _G.night_timer
end

function dota1x6:UpdatePlayersTable(id)
	local player = players[id]
	if not player then
		return
	end

	local no_buyback = player.no_buyback
	local hero_name = player:GetUnitName()

	local razor_count = -1
	if dota1x6.current_wave > duel_start_wave and player.razor_count then
		razor_count = player.razor_count
	end

	local damage_bonus = 0
	local mod = player:FindModifierByName("modifier_player_main_custom")
	if mod then
		damage_bonus = math.max(0, (mod:GetStackCount() - 1) * Player_damage_inc)
	end

	local hunted = 0
	if player:HasModifier("modifier_the_hunt_custom_hero") then
		hunted = 1
	end

	local respawn_reward = 0
	if player:HasModifier("modifier_patrol_reward_2_respawn") then
		respawn_reward = 1
	end

	CustomNetTables:SetTableValue("networth_players", tostring(id), {
		place = -1,
		no_buyback = no_buyback,
		hunted = hunted,
		respawn_reward = respawn_reward,
		net = player.networth, --PlayerResource:GetNetWorth(id),
		damage_bonus = damage_bonus,
		hero_tier = player.hero_tier,
		hide_tier = player.hide_tier,
		subscribed = player.subscribed,
		hero_name = hero_name,
		steam_id = PlayerResource:GetSteamID(id),
		rare = player.blue,
		purple = player.purple,
		gray = player.gray,
		legendary = player.chosen_skill_name,
		legendary_talent = player.legendary_talent,
		legendary_skill_name = player.legendary_skill_name,
		tips_available = player.tips_available,
		tips_cooldown = player.tips_cooldown,
		razor_count = razor_count,
		team_color = player.team_color,
	})
end

local temp_damage_timer = 30

function dota1x6:spawn_timer()
	if Game_end == true then
		return -1
	end

	local GameState = GameRules:State_Get()
	local can_pause = game_start == true
		and not IsInToolsMode()
		and not GameRules:IsCheatMode()
		and HTTP.IsValidGame(PlayerCount)
		and not enable_pause
	local should_pause = false
	local is_paused = GameRules:IsGamePaused()

	local team_net = dota1x6:GetTeamsNet()
	local low_net_teams = {}
	local more_gold_teams = {}
	local number_wave = 0
	local go_boss = false
	local save_items = false
	local next_boss = false
	local next_wave_number = 0
	local current_time = GameRules:GetDOTATime(false, false)

	if GameState >= DOTA_GAMERULES_STATE_PRE_GAME and not is_paused then
		dota1x6:TimerAlerts()
		start_quest:CheckTimer()
	end

	if dota1x6:FinalDuel() == false then
		MaxTimer = MaxTime(dota1x6.current_wave + 1)

		if test then
			if dota1x6.current_wave + 1 == start_wave + 1 then
				MaxTimer = timer_test_start
			else
				MaxTimer = timer_test
			end
		end
	end

	if game_start == true and not is_paused then
		if dota1x6.eternal_night == true then
			if current_day ~= "night" then
				current_day = "night"
				GameRules:SetTimeOfDay(0.76)
			end
		else
			day_count = day_count + 1

			local day_max = current_day == "night" and night_timer or day_timer
			if day_count >= day_max then
				day_count = 0
				if current_day == "night" then
					current_day = "day"
					GameRules:SetTimeOfDay(0.26)
				else
					current_day = "night"
					GameRules:SetTimeOfDay(0.76)
				end
			end
		end

		if TimerStop == false then
			timer = timer + 1
		end

		bounty_timer = bounty_timer + 1

		if math.floor(current_time / CreepsUpgradeTimer) > CreepsUpgradeCount then
			CreepsUpgradeCount = math.floor(current_time / CreepsUpgradeTimer)

			for creep, _ in pairs(NeutralCreeps) do
				if IsValid(creep) and creep:IsAlive() and creep:GetTeamNumber() == DOTA_TEAM_NEUTRALS then
					dota1x6:SetCreepStats(creep)
				else
					NeutralCreeps[creep] = nil
				end
			end
		end

		for _, data in pairs(duel_data) do
			if data and data.finished and data.finished == 0 and data.duel_mod and not data.duel_mod:IsNull() then
				data.timer = data.timer + 1

				if data.timer >= data.max_timer and data.duel_mod and not data.duel_mod:IsNull() then
					data.duel_mod:Destroy()
				end
			end
		end
	end

	if dota1x6:FinalDuel() == true and duel_data[#duel_data].new_round == true then
		duel_data[#duel_data].new_round = false

		MaxTimer = round_timer
		timer = 0
	end

	if #team_net > 1 then
		table.sort(team_net, function(x, y)
			return y.gold > x.gold
		end)
		local real_max = max_teams - 1

		for index = #team_net, 1, -1 do
			local data = team_net[index]
			if data then
				local real_index = (index - 1)
				more_gold_teams[data.team] = math.floor(
					WaveMoreGold_min
						+ (WaveMoreGold_max - WaveMoreGold_min) * (((#team_net - 1) - real_index) / real_max)
				)
			end
		end
	end

	if #team_net > win_place then
		for i = 1, low_net_max do
			if team_net[i] then
				low_net_teams[team_net[i].team] = true
			end
		end

		if dota1x6.TargetCurrentCd then
			dota1x6.TargetCurrentCd = dota1x6.TargetCurrentCd - 1
			if dota1x6.TargetCurrentCd <= 0 then
				dota1x6.TargetCurrentCd = nil
			end
		else
			if Target_timer_max > current_time and not dota1x6.TargetCurrentActive then
				if Target_proc_count == 0 and Target_timer_first <= current_time then
					if
						not dota1x6:TeamInDuel(team_net[#team_net].team)
						and dota1x6:StartTheHunt(towers[team_net[#team_net].team], "first")
					then
						Target_proc_count = 1
					end
				elseif Target_proc_count < Target_proc_max and Target_timer_min <= current_time then
					local net_all = 0
					local kills_all = 0
					for _, data in pairs(team_net) do
						net_all = net_all + data.gold
						kills_all = kills_all + data.kills
					end

					for index = #team_net, 1, -1 do
						local data = team_net[index]
						local net_others = (net_all - data.gold) / (#team_net - 1)
						local kills_others = (kills_all - data.kills) / (#team_net - 1)

						local reason = data.gold >= net_others * Target_gold_diff and "gold"
							or (
								data.kills - kills_others >= Target_kills_diff
								and data.gold >= net_others * Target_kills_gold_diff
								and "kills"
							)

						if reason then
							if
								not dota1x6:TeamInDuel(data.team) and dota1x6:StartTheHunt(towers[data.team], reason)
							then
								Target_proc_count = Target_proc_count + 1
							end
							break
						end
					end
				end
			end
		end
	end

	if timer >= MaxTimer then
		if dota1x6:FinalDuel() == false then
			dota1x6.current_wave = dota1x6.current_wave + 1
			dota1x6:UpdateLaneCreepsStats()
			dota1x6:UpdatePatrolCreepsStats()
			dota1x6.wave_tick_open = true
			dota1x6:SetPatrolLaunched(false)
			dota1x6.patrol_duel_end = nil

			for n = 1, #Wave_boss_number do
				if dota1x6.current_wave == Wave_boss_number[n] then
					go_boss = true
					break
				end
			end

			if go_boss then
				dota1x6.go_boss_number = dota1x6.go_boss_number + 1
				number_wave = dota1x6.go_boss_number
			else
				dota1x6.go_wave = dota1x6.go_wave + 1
				number_wave = dota1x6.go_wave
			end

			dota1x6:DestroyPatrol()
		end
	end

	if bounty_timer >= bounty_max_timer and current_time >= bounty_start then
		bounty_timer = 0
		dota1x6:SpawnBountyRunes()
	end

	for timing, state in pairs(ItemsTiming) do
		if state == false and current_time >= timing then
			ItemsTiming[timing] = true
			save_items = true
			break
		end
	end

	local patrol_table = { timer = -1, type = 0 }
	local result = dota1x6:CheckPatrol()
	if result then
		patrol_table = result
	end

	for n = 1, #Wave_boss_number do
		if dota1x6.current_wave + 1 == Wave_boss_number[n] then
			next_boss = true
			break
		end
	end

	if next_boss then
		next_wave_number = dota1x6.go_boss_number + 1
	else
		next_wave_number = dota1x6.go_wave + 1
	end

	local next_wave = dota1x6:GetWave(next_wave_number, next_boss)
	local skills = dota1x6:GetSkills(next_wave_number, next_boss)
	local mkb = dota1x6:GetMkb(next_wave_number, next_boss)

	local abandon_count = 0
	for _, data in pairs(abandon_players) do
		abandon_count = abandon_count + 1
	end

	for id = 0, 24 do
		if ValidId(id) then
			local player = players[id]
			local state = PlayerResource:GetConnectionState(id)

			if
				(
					(state == DOTA_CONNECTION_STATE_ABANDONED)
					or (state == DOTA_CONNECTION_STATE_DISCONNECTED and abandon_count == PlayerCount - 1)
					or (
						not player
						and current_time > 3
						and current_time <= LowPriorityTime
						and (state ~= DOTA_CONNECTION_STATE_CONNECTED or HTTP.playersData[id].is_active == 1)
					)
				)
				and abandon_players[id] ~= true
				and not bots_ids[id]
			then
				abandon_players[id] = true
				HTTP.playersData[id].isLeaver = true

				local data = CustomNetTables:GetTableValue("server_data", tostring(id))
				local wrong_map_status = data.wrong_map_status

				local lp_games = 0
				local switch_safetoleave = false
				local lp_games = data.lp_games_remaining

				if
					(HTTP.serverData.isStatsMatch == true or test)
					and SafeToLeave == false
					and current_time <= LowPriorityTime
					and PICK_STATE ~= PICK_STATE_PLAYERS_LOADED
				then
					if data.total_games > LOW_PRIORITY_IMMUNITY then
						lp_games = lp_games + 1
					end

					_G.SafeToLeave = true
					switch_safetoleave = true
					SafeToLeave_reason = 1

					if PICK_STATE ~= PICK_STATE_SELECT_BASE and PICK_STATE ~= PICK_STATE_PICK_END then
						data.block = { name = "player_left" }
					end
				end

				data.lp_games_remaining = lp_games
				data.switch_safetoleave = switch_safetoleave
				CustomNetTables:SetTableValue("server_data", tostring(id), data)
				HTTP.PlayerLeave(id)
			end

			if
				not player
				and current_time > 3
				and state == DOTA_CONNECTION_STATE_CONNECTED
				and HTTP.playersData[id].is_active == 0
				and not no_hero_players[id]
			then
				local hero = PlayerResource:GetSelectedHeroEntity(id)

				if hero then
					no_hero_players[id] = true
					print(
						"NO HERO",
						id,
						hero:GetUnitName(),
						hero:GetId(),
						GlobalHeroes[id] and 1 or 0,
						SpawnedPlayers,
						PlayerCount,
						current_time
					)

					GlobalHeroes[id] = hero
					_G.SpawnedPlayers = _G.SpawnedPlayers + 1

					dota1x6:initiate_player(hero)
					if SelectedBases[id] then
						dota1x6:PlaceHero(id)
					end
					dota1x6:UpdateHeroIcons()
				end
			end

			if SafeToLeave == false and current_time < 3 then
				local data = CustomNetTables:GetTableValue("server_data", tostring(id))

				if data and data.block then
					_G.SafeToLeave = true
					SafeToLeave_reason = data.block.leave_reason
				end
			end

			if player then
				local team = player:GetTeamNumber()

				if not couriers_spawned[id] then
					dota1x6:CreateCourier(team, id)
				end

				local alert = false
				if state == DOTA_CONNECTION_STATE_ABANDONED and player.left_game == false and Game_end == false then
					player.left_game_timer = 60
					local players = dota1x6:FindPlayers(team, false, true)
					if players then
						for _, team_player in pairs(players) do
							if team_player ~= player and not team_player.left_game then
								player.left_game_timer = 0
								break
							end
						end
					end

					player.left_game = true
					CustomGameEventManager:Send_ServerToAllClients(
						"hero_lost",
						{ ban = 0, abbandon = 1, hero2 = {}, hero = { player:GetUnitName() }, id2 = {}, id = { id } }
					)
					alert = true
				end

				if player.banned == true and alert == false then
					CustomGameEventManager:Send_ServerToAllClients(
						"hero_lost",
						{ ban = 1, abbandon = 0, hero2 = {}, hero = { player:GetUnitName() }, id2 = {}, id = { id } }
					)

					if player.teammate then
						CustomGameEventManager:Send_ServerToPlayer(
							PlayerResource:GetPlayer(id),
							"banned",
							{ reports = player.reports, id = player.teammate, max = 6 }
						)
					end
				end

				if player:IsAlive() then
					for name, data in pairs(player.temp_damage_stat) do
						if (current_time - data.time) >= temp_damage_timer then
							player.temp_damage_stat[name] = nil
						end
					end
				end

				if player.promo_cd > 0 then
					player.promo_cd = math.max(0, player.promo_cd - 1)
				end

				if player.left_game == true and not is_paused then
					player.left_game_timer = player.left_game_timer - 1
				end

				if player.tips_available == 1 and player.tips_cooldown > 0 then
					player.tips_cooldown = math.max(0, player.tips_cooldown - 1)
				end

				if save_items == true then
					HTTP.FillItemsData(id, -1)
				end

				local tower = towers[team]

				if
					tower
					and duel_data[tower.duel_data]
					and duel_data[tower.duel_data].finished == 0
					and duel_data[tower.duel_data].stage == 1
					and (MaxTimer - timer) <= duel_push_teleport
					and not player:HasModifier("modifier_duel_hero_teleport")
				then
					player:AddNewModifier(player, nil, "modifier_duel_hero_teleport", { duration = duel_push_teleport })
				end

				dota1x6:UpdatePlayersTable(id)

				if state ~= player.connect_state then
					player.connect_state = state
					if state == DOTA_CONNECTION_STATE_DISCONNECTED or state == DOTA_CONNECTION_STATE_ABANDONED then
						player:AddNewModifier(player, nil, "modifier_towerresist_disconnect", {})
					else
						player:RemoveModifierByName("modifier_towerresist_disconnect")
					end
				end

				if can_pause then
					if
						player.pause_time > 0
						and ((state == DOTA_CONNECTION_STATE_DISCONNECTED or state == DOTA_CONNECTION_STATE_LOADING) or (player.after_pause_time > 0 and state == DOTA_CONNECTION_STATE_CONNECTED))
						and current_time > 1
					then
						should_pause = true
						player.pause_shown = true

						local time = player.pause_time
						local hero_name = player:GetUnitName()

						if
							player.pause_time > 0
							and (state == DOTA_CONNECTION_STATE_DISCONNECTED or state == DOTA_CONNECTION_STATE_LOADING)
						then
							CustomGameEventManager:Send_ServerToAllClients(
								"pause_think",
								{ time = time, id = id, player = SelectedHeroes[id].hero }
							)

							player.pause_time = player.pause_time - 1
							player.after_pause_time = 3
						end

						if player.after_pause_time > 0 and state == DOTA_CONNECTION_STATE_CONNECTED then
							CustomGameEventManager:Send_ServerToAllClients(
								"pause_think",
								{ time = player.after_pause_time, id = id, player = SelectedHeroes[id].hero, ending = 1 }
							)

							player.after_pause_time = player.after_pause_time - 1
						end
					elseif player.pause_shown then
						player.pause_shown = false
						CustomGameEventManager:Send_ServerToAllClients("pause_end", { id = id })
					end
				end

				if player.left_game_timer < 1 or player.banned == true or player.leave_banned == true then
					dota1x6:destroy_player(id)
				end
			end

			if GameState >= DOTA_GAMERULES_STATE_PRE_GAME then
				local givegold = 100
				local reward = 0
				local necro = 0
				local show_gold = 0

				if player then
					local team = player:GetTeamNumber()
					if (dota1x6.current_wave >= more_gold_wave or test) and more_gold_teams[team] and not go_boss then
						givegold = more_gold_teams[team]
						show_gold = 1
					end
					necro = player.necro_wave
					player.reward = dota1x6:GetReward(dota1x6.current_wave + 1, player)
					reward = player.reward
				end

				local duel_timer = false
				local duel = nil

				if player and towers[player:GetTeamNumber()] then
					local tower = towers[player:GetTeamNumber()]
					if tower and duel_data[tower.duel_data] and duel_data[tower.duel_data].finished == 0 then
						--duel_timer = true
						duel = duel_data[tower.duel_data]
					end
				end

				if dota1x6:FinalDuel() then
					duel_timer = true
					duel = duel_data[#duel_data]
				end

				local time = timer
				local max_timer = MaxTimer
				if duel and duel.stage == 2 then
					time = duel.timer
					max_timer = duel.max_timer
				end

				local day_time = dota1x6.eternal_night and -1
					or ((current_day == "night" and night_timer or day_timer) - day_count)

				if duel_timer then
					CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "duel_timer_progress", {
						day = current_day,
						day_time = day_time,
						time = time,
						max = max_timer,
						stage = duel.stage,
						final = duel.final_duel,
						round = duel.rounds,
						heroes1 = duel.heroes[1],
						wins1 = duel.wins1,
						heroes2 = duel.heroes[2],
						wins2 = duel.wins2,
					})
				else
					local duel_array = nil
					local has_active = player
						and player.ActiveWave
						and player.ActiveWave.units
						and player.ActiveWave.units > 0

					if duel and not has_active then
						duel_array = {}
						duel_array.heroes1 = duel.heroes[1]
						duel_array.heroes2 = duel.heroes[2]
					end
					local data = {
						stage = duel and duel.stage or 0,
						day = current_day,
						day_time = day_time,
						necro = necro,
						units = -1,
						units_max = -1,
						time = time,
						max = max_timer,
						name = next_wave,
						skills = skills,
						mkb = mkb,
						reward = reward,
						gold = givegold,
						show_gold = show_gold,
						number = dota1x6.current_wave + 1,
						game_start = game_start,
						patrol_table = patrol_table,
						duel_array = duel_array,
					}
					if has_active then
						data.time = -1
						data.max = -1
						data.units = player.ActiveWave.units
						data.units_max = player.ActiveWave.units_max
						data.name = player.ActiveWave.name
						data.skills = player.ActiveWave.skills
						data.mkb = player.ActiveWave.mkb
						data.reward = player.ActiveWave.reward
						data.gold = player.ActiveWave.gold
						data.show_gold = player.ActiveWave.show_gold
						data.number = player.ActiveWave.number
					end
					CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "timer_progress", data)
				end
			end
		end
	end

	for team, tower in pairs(towers) do
		tower.can_use_trap = (MaxTimer - timer) > Necro_Timer

		if timer >= MaxTimer then
			if duel_data[tower.duel_data] and duel_data[tower.duel_data].finished == 0 then
				if duel_data[tower.duel_data].final_duel == 1 then
					dota1x6:Destroy_Wave_Creeps()
				end
				dota1x6:CreateDuelField(tower.duel_data)
			else
				local necro = false
				local trap = false

				if tower.trap_wave == true then
					trap = true
					tower.trap_wave = false
				end

				local give_lownet = 0
				if low_net_teams[team] and low_net_waves[dota1x6.current_wave] then
					give_lownet = 1
				end

				local give_more_gold = 100
				local show_gold = 0
				if (dota1x6.current_wave >= more_gold_wave or test) and more_gold_teams[team] and not go_boss then
					show_gold = 1
					give_more_gold = more_gold_teams[team]
				end

				dota1x6:spawn_wave(team, number_wave, go_boss, give_lownet, give_more_gold, trap, show_gold)
			end

			if dota1x6.current_wave < 25 and dota1x6.current_wave > 1 then
				tower:AddNewModifier(tower, nil, "modifier_tower_level", {})
			end
		end
		if
			not duel_data[tower.duel_data]
			and timer + PortalDelay == MaxTimer
			and dota1x6:FinalDuel() == false
			and not is_paused
		then
			dota1x6:spawn_portal(team)
		end

		if
			timer + 10 == MaxTimer
			and game_start == true
			and dota1x6:FinalDuel() == false
			and teleports[team]
			and not duel_data[tower.duel_data]
			and not is_paused
		then
			local count = 0
			local ids = dota1x6:FindPlayers(team)

			if ids then
				for _, id in pairs(ids) do
					local player = players[id]
					if player and player.wavealert_hide then
						if
							not player.start_quest_table
							or (dota1x6.current_wave ~= 0 and dota1x6.current_wave ~= 2 and dota1x6.current_wave ~= 4)
						then
							CustomGameEventManager:Send_ServerToPlayer(
								PlayerResource:GetPlayer(id),
								"WaveAlertShow",
								{ state = player.wavealert_hide }
							)
						end
					end
				end
			end

			local spawner = Entities:FindByName(nil, tower:GetName() .. "_vision_2")
			if spawner then
				Timers:CreateTimer(0, function()
					GameRules:ExecuteTeamPing(team, spawner:GetAbsOrigin().x, spawner:GetAbsOrigin().y, player, 8)
					count = count + 1
					if count <= 2 then
						return 1.5
					end
				end)
			end
		end
		dota1x6:CheckTowerDeath(tower)
	end

	if not dota1x6:FinalDuel() and dota1x6.waiting_top3_duel then
		dota1x6:FindDuelPairs()
	end

	if timer >= MaxTimer then
		duel_alert_init = false
		dota1x6.waiting_top3_duel = false

		local player_count = 0
		for _, player in pairs(players) do
			player_count = player_count + 1
		end

		if player_count == 3 then
			dota1x6.top3_left = true
		end

		if dota1x6:FinalDuel() == false and dota1x6:IsDuelWave() then
			dota1x6:FindDuelPairs()
		end

		if dota1x6.go_wave == #waves then
			dota1x6.go_wave = 0
		end

		dota1x6:ActivateOrbShrines()
		match_log:Call("Wave", more_gold_teams, low_net_teams)
		timer = 0
		dota1x6.wave_tick_open = false
	end

	if can_pause then
		if is_paused then
			if should_pause == false then
				PauseGame(false)
			end
		else
			if should_pause == true then
				PauseGame(true)
			end
		end
	end
end

function dota1x6:IsDuelWave()
	local net = dota1x6:GetTeamsNet()
	local wave = dota1x6.current_wave
	return wave >= duel_start_wave
		and (wave % 2 ~= 0 or (#net == 3 and IsSoloMode()))
		and Wave_boss_number[2] ~= (wave + 1)
end

function dota1x6:CheckParty(check_id)
	local check_party = PartyTable[id]
	if check_party == nil then
		return false
	end

	for id, party in pairs(PartyTable) do
		if party == check_party and check_id ~= id and players[id] ~= nil then
			return true
		end
	end

	return false
end

function dota1x6:DestroyPlayerUnits(id)
	local player = players[id]

	if not player then
		return
	end
	local team = player:GetTeamNumber()

	for _, mod in pairs(player:FindAllModifiers()) do
		if mod:GetName() == "modifier_ember_spirit_fire_remnant_custom_timer" then
			mod:Destroy()
		end
	end

	local teams = { team }
	local checked_teams = { [team] = true }

	for _, hero in pairs(players) do
		local hero_team = hero:GetTeamNumber()

		if not checked_teams[hero_team] then
			checked_teams[hero_team] = true
			teams[#teams + 1] = hero_team
		end
	end

	local index = 1

	Timers:CreateTimer(0.1, function()
		if not IsValid(player) then
			return nil
		end

		local target_team = teams[index]

		if not target_team then
			return nil
		end

		index = index + 1
		local units = FindUnitsInRadius(
			target_team,
			Vector(0, 0, 0),
			nil,
			FIND_UNITS_EVERYWHERE,
			DOTA_UNIT_TARGET_TEAM_FRIENDLY,
			DOTA_UNIT_TARGET_ALL,
			DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
				+ DOTA_UNIT_TARGET_FLAG_INVULNERABLE
				+ DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
			0,
			false
		)
		for _, unit in pairs(units) do
			if IsValid(unit) and unit ~= player and not unit:IsBuilding() and unit:GetUnitName() ~= "npc_teleport" then
				if target_team == team and unit:GetId() == id then
					unit:Kill(nil, nil)

					if IsValid(unit) and unit:IsCourier() then
						UTIL_Remove(unit)
					end
				else
					for _, mod in pairs(unit:FindAllModifiers()) do
						if not mod:IsNull() and mod:GetCaster() == player then
							if mod:GetName() == "modifier_monkey_king_wukongs_command_custom_soldier" then
								UTIL_Remove(unit)
								break
							else
								mod:Destroy()
							end
						end
					end
				end
			end
		end
		return 0.5
	end)

	for _, thinker in pairs(Entities:FindAllByClassname("npc_dota_thinker")) do
		if thinker:GetTeamNumber() == team then
			for _, mod in pairs(thinker:FindAllModifiers()) do
				local caster = mod:GetCaster()
				if IsValid(caster) and caster:FindOwner() == player then
					UTIL_Remove(thinker)
					break
				end
			end
		end
	end
end

function dota1x6:CheckTowerDeath(tower)
	local team = tower:GetTeamNumber()

	if not towers[team] then
		return
	end

	if not tower:IsAlive() then
		local heroes = {}
		local heroes2 = {}
		local heroes_id = {}
		local heroes2_id = {}
		local killer = tower.killer
		local ids = dota1x6:FindPlayers(team)

		if ids then
			for _, id in pairs(ids) do
				heroes[#heroes + 1] = players[id]:GetUnitName()
				heroes_id[#heroes_id + 1] = id
			end
		end

		if killer then
			local ids = dota1x6:FindPlayers(killer:GetTeamNumber())
			if ids then
				for _, id in pairs(ids) do
					heroes2[#heroes2 + 1] = players[id]:GetUnitName()
					heroes2_id[#heroes2_id + 1] = id
				end
			end
		end
		Timers:CreateTimer(0.5, function()
			CustomGameEventManager:Send_ServerToAllClients(
				"hero_lost",
				{ ban = 0, abbandon = 0, hero2 = heroes2, hero = heroes, id2 = heroes2_id, id = heroes_id }
			)
		end)

		dota1x6:destroy_tower(tower)
	else
		local ids = dota1x6:FindPlayers(team)
		if not ids then
			dota1x6:destroy_tower(tower)
		end
	end
end

function dota1x6:destroy_tower(tower, no_end)
	local team = tower:GetTeamNumber()

	local fillers = FindUnitsInRadius(
		tower:GetTeamNumber(),
		tower:GetAbsOrigin(),
		nil,
		1200,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_BUILDING,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
		FIND_CLOSEST,
		false
	)
	for _, filler in pairs(fillers) do
		if filler ~= tower and filler ~= teleports[team] then
			filler:RemoveModifierByName("modifier_invulnerable")
			filler:ForceKill(false)
		end
	end

	if teleports[team] then
		teleports[team]:AddNewModifier(nil, nil, "modifier_tower_no_owner", {})
	end

	if duel_data[tower.duel_data] and duel_data[tower.duel_data].finished == 0 then
		local duel = duel_data[tower.duel_data]

		duel.finished = 1
		duel.tower1.duel_data = -1
		duel.tower2.duel_data = -1

		if duel.duel_mod and not duel.duel_mod:IsNull() then
			duel.duel_mod:Destroy()
		end
	end

	tower:ForceKill(false)

	local ids = dota1x6:FindPlayers(team)
	if ids then
		for _, id in pairs(ids) do
			if players[id] then
				dota1x6:destroy_player(id)
			end
		end
	end

	_G.Deaths = _G.Deaths + 1
	local place = TeamCount - Deaths + 1

	local all_ids = tower.ids
	if all_ids then
		for _, id in pairs(all_ids) do
			dota1x6:SaveEndData(id, place)
		end
	end

	towers[team] = nil

	dota1x6:RemoveTeamIcons(team)

	if no_end then
		return
	end

	local teams_register = {}
	local team_array = {}
	local team_count = 0

	for _, player in pairs(players) do
		local left_team = player:GetTeamNumber()
		if not teams_register[left_team] then
			teams_register[left_team] = true
			team_count = team_count + 1
			team_array[team_count] = left_team
		end
	end

	if
		LpGiven == false
		and team_count <= win_place
		and SafeToLeave == false
		and (HTTP.serverData.isStatsMatch == true or test)
	then
		LpGiven = true
		for player_id in pairs(players) do
			local lp_data = CustomNetTables:GetTableValue("server_data", tostring(player_id))
			if lp_data and lp_data.lp_games_remaining > 0 then
				lp_data.lp_games_remaining = lp_data.lp_games_remaining - 1
				CustomNetTables:SetTableValue("server_data", tostring(player_id), lp_data)
			end
		end
	end

	if team_count > 2 then
		dota1x6:ResetDuelPairs()
	end

	if team_count <= win_place then
		for _, tower in pairs(towers) do
			tower:RemoveModifierByName("modifier_the_hunt_custom_tower")
		end
	end

	if team_count == 3 then
		if dota1x6:IsDuelWave() then
			--	CustomGameEventManager:Send_ServerToAllClients( "generic_sound", {sound = "Duel.Normal"} )
			dota1x6.waiting_top3_duel = true
		end
	end

	if team_count == 2 then
		for _, player in pairs(players) do
			local mod = player:FindModifierByName("modifier_player_main_custom")
			if mod then
				mod.no_damage_bonus = true
				mod:SetStackCount(0)
			end
		end
		dota1x6:InitDuel(team_array[1], team_array[2], 1)
	end

	if team_count == 1 then
		dota1x6:WinTeam(team_array[1])
		return
	end

	if TeamCount == 1 then
		dota1x6:WinTeam(team)
		return
	end
end

function dota1x6:OnPlayerChatDebug(event)
	if not IsInToolsMode() then
		return
	end
	local id = event.playerid
	local text = event.text or ""
	if id == nil then
		return
	end
	if text == "-chest" then
		shop:GrantChestPair(id)
	elseif text == "-chestreset" then
		CustomNetTables:SetTableValue("chest_data", tostring(id), { counter = 0, cd = 0 })
	end
end

function dota1x6:SaveEndData(id, place)
	HTTP.playersData[id].place = place
	match_log:Call("Place", id, place)
	HTTP.FillItemsData(id, place)
	if HTTP.TalentsData and HTTP.TalentsData[tostring(id)] then
		HTTP.TalentsData[tostring(id)].place = place
	end

	local hero = GlobalHeroes[id]
	if hero then
		for _, data in pairs(HTTP.SkillsData) do
			if data.hero_name == hero:GetUnitName() then
				data.place = place
				data.main_talent = HTTP.playersData[id].firstOrangeTalent or "0"
			end
		end
	end

	local data = CustomNetTables:GetTableValue("networth_players", tostring(id))
	if data then
		data.place = place
		CustomNetTables:SetTableValue("networth_players", tostring(id), data)
	end

	dota1x6:CheckAchivment(id, 1)
	HTTP.playersData[id].matchPlayedChestEnd = shop:BuildChestEndModel(id, place)

	HTTP.PlayerEnd(id)
end

function dota1x6:WinAnimation(loser)
	_G.Game_end = true

	for id, hero in pairs(players) do
		if hero:GetTeamNumber() ~= loser then
			PlayerResource:SetCameraTarget(id, hero)
			hero:AddNewModifier(hero, nil, "modifier_endgame_winner", {})
		end
	end

	Timers:CreateTimer(2, function()
		if towers[loser] then
			dota1x6:destroy_tower(towers[loser])
		end
	end)

	CustomGameEventManager:Send_ServerToAllClients("hide_all_timers", {})
end

function dota1x6:WinTeam(team)
	if test then
		--return
	end

	local tower = towers[team]

	local ids = dota1x6:FindPlayers(team)
	if ids then
		for _, id in pairs(ids) do
			if players[id] then
				dota1x6:destroy_player(id, true)
			end
		end
	end

	if tower and tower.ids then
		for _, id in pairs(tower.ids) do
			dota1x6:SaveEndData(id, 1)
		end
	end

	match_log:Call("Finish")

	if HTTP.serverData.isStatsMatch then
		HTTP.Request("/anal", HTTP.ItemsData, function() end, nil, true)
		if HTTP.TalentsData then
			HTTP.Request("/anal-talents", HTTP.TalentsData, function() end, nil, true)
		end
		if #HTTP.SkillsData > 0 then
			HTTP.Request("/anal-skills", HTTP.SkillsData, function() end, nil, true)
		end
	end

	for id, player_data in pairs(HTTP.playersData) do
		if player_data.is_active == 1 then
			local change = lobby_rating_change[id]
			local before = 0

			if change and lobby_rating_change[id] and lobby_rating[id] then
				before = lobby_rating[id] + lobby_rating_change[id]
			end

			local data = CustomNetTables:GetTableValue("networth_players", tostring(id))
			if data then
				data.items = player_data.items
				data.rating_before = math.max(0, before)
				data.rating_change = change
				CustomNetTables:SetTableValue("networth_players", tostring(id), data)
			end

			HTTP.PlayerLeave(id)
		end
	end

	if dont_end_game == false then
		CustomGameEventManager:Send_ServerToAllClients("damage_stats_endscreen", {})
		CustomGameEventManager:Send_ServerToAllClients("GameEnded", {})
		CustomNetTables:SetTableValue("networth_players", "", { game_ended = true })
	end
end

function dota1x6:destroy_player(id, no_kill)
	if not players[id] then
		return
	end

	local player = players[id]
	match_log:Call("Leave", player)

	if not no_kill then
		dota1x6:DestroyPlayerUnits(id)

		if player:IsAlive() then
			player:AddNewModifier(player, nil, "modifier_death", {})
			player:Kill(nil, nil)
		end

		player:RemoveModifierByName("modifier_aegis_custom")
		player:SetTimeUntilRespawn(-1)
		player:SetBuyBackDisabledByDevilsBargain(true)
	end

	dota1x6:UpdateDamageStats({ PlayerID = id })

	HTTP.FillOtherData(id)
	HTTP.FillDamageData(id)
	HTTP.playersData[id].wrong_map_status = player.wrong_map_status
	HTTP.playersData[id].kills_done = player.kills_done
	HTTP.playersData[id].towers_destroyed = player.towers_destroyed
	HTTP.playersData[id].bounty_runes_picked = player.bounty_runes_picked
	HTTP.playersData[id].randomed = player.randomed
	HTTP.playersData[id].banned = player.banned
	HTTP.playersData[id].net = player.networth -- PlayerResource:GetNetWorth(id)
	HTTP.playersData[id].items = {}

	for i = 0, 5 do
		local item = player:GetItemInSlot(i)
		local name = ""
		if item then
			name = item:GetName()
		end
		table.insert(HTTP.playersData[id].items, name)
	end

	for _, mod in pairs(player:FindAllModifiers()) do
		local name = mod:GetName()
		if
			name == "modifier_item_aghanims_shard"
			or name == "modifier_item_moon_shard_consumed"
			or name == "modifier_item_ultimate_scepter_consumed"
			or name == "modifier_item_travel_boots_2_perma"
		then
			table.insert(HTTP.playersData[id].buffs, { name = mod:GetName(), stacks = mod:GetStackCount() })
		end
	end

	local data = CustomNetTables:GetTableValue("networth_players", tostring(id))
	if data then
		data.lost = 1
		data.items = HTTP.playersData[id].item
		CustomNetTables:SetTableValue("networth_players", tostring(id), data)
	end

	CustomGameEventManager:Send_ServerToAllClients("pause_end", { id = id })

	--if TeamCount == 1 then return end
	players[id] = nil

	dota1x6:UpdateHeroIcons()
end

function dota1x6:CreateCourier(team, id)
	local tower = towers[team]
	local teleport = teleports[team]
	local player = PlayerResource:GetPlayer(id)

	if not tower or not teleport or not player then
		return
	end

	local vec = (tower:GetAbsOrigin() - teleport:GetAbsOrigin())
	local point = teleport:GetAbsOrigin() + vec:Normalized() * 230

	local ids = dota1x6:FindPlayers(team)
	if not ids then
		return
	end

	for count, player_id in pairs(ids) do
		if player_id == id then
			point = RotatePosition(teleport:GetAbsOrigin(), QAngle(0, -45 + 90 * (count - 1), 0), point)
			break
		end
	end

	local courier = player:SpawnCourierAtPosition(point)
	courier:AddNewModifier(courier, nil, "modifier_invun", {})

	courier:SetForwardVector(vec)
	courier:FaceTowards(courier:GetAbsOrigin() + vec * 10)
	courier:SetControllableByPlayer(id, true)
	couriers_spawned[id] = true

	courier.player_owner = id

	if players[id] then
		players[id].player_courier = courier
	end
end

function dota1x6:initiate_player(player, is_bot)
	player:Stop()
	local id = player:GetId()

	if not HTTP.playersData[id] then
		return
	end

	HTTP.playersData[id].is_active = 1

	local pause = Pause_Time
	if pro_mod then
		pause = Pause_Time_Pro
	end

	local team = PlayerResource:GetTeam(id)
	if not TeamRegistred[team] then
		TeamRegistred[team] = true
		_G.TeamCount = _G.TeamCount + 1
	end

	local hex_color = "#000000"
	if team_color[team] then
		local table_color = team_color[team]
		if not IsSoloMode() then
			SetTeamCustomHealthbarColor(team, table_color[1], table_color[2], table_color[3])
		end
		PlayerResource:SetCustomPlayerColor(id, table_color[1], table_color[2], table_color[3])
		hex_color = dota1x6:rgbToHex(table_color)
	end

	HTTP.playersData[id].team = team
	players[id] = player
	player.choise = {}
	player.respawn_mod = {}
	player.choise_table = {}
	player.damage_out = {}
	player.damage_inc = {}
	player.healing_inc = {}
	player.resource = {}
	player.resource["gold"] = {}
	player.resource["blue_points"] = {}
	player.resource["gray_points"] = {}
	player.temp_damage_stat = {}

	player.team_color = hex_color
	player.upgrades = {}
	player.bluepoints = 0
	player.purplepoints = 0
	player.whitepoints = 0
	player.death = 0
	player.purple = 0
	player.gray = 0
	player.blue = 0
	player.chosen_skill = 0
	player.chosen_skill_name = 0
	player.bluemax = StartBlue
	player.purplemax = StartPurple
	player.whitemax = StartWhite
	player.ActiveWave = nil
	player.banned = false
	player.randomed = 0
	player.tower_damage = 0

	if SelectedHeroes[id] and SelectedHeroes[id].random and SelectedHeroes[id].random == 1 then
		player.randomed = 1
	end

	player.wrong_map_status = 0
	player.reports = 0
	player.after_pause_time = 0
	player.kills_done = 0
	player.towers_destroyed = 0
	player.bounty_runes_picked = 0
	player.can_refresh_choise = false
	player.necro_wave = false
	player.can_refresh = true
	player.no_buyback = 0
	player.left_game = false
	player.left_game_timer = 60
	player.pause_time = pause
	player.promo_cd = 0
	player.legendary_talent = 0
	player.legendary_skill_name = 0
	player.razor_count = 0
	player.connect_state = 0

	player.pause = -1

	player.z = 215
	player.HideDouble = 0
	player.orange_count = 0
	player.patrol_kills = 0
	player.obs_placed = 0
	player.obs_kills = 0
	player.sentry_kills = 0
	player.tips_cooldown = 0
	player.tips_available = 1

	player.hero_tier = -1
	player.hide_tier = 0
	player.disable_quest = 0
	player.disable_tips = 0
	player.wavealert_hide = 0
	player.small_talents = 0
	player.hide_pet_names = 0
	player.pet_state = 0
	player.subscribed = 0
	player.uses_build = 0
	player.completed_start_quest = (
		HTTP.playersData[id].achivment_done_before and HTTP.playersData[id].achivment_done_before[2]
	)
			and 1
		or 0

	player.base_attack_type = player:GetAttackCapability()
	player.base_model_scale = player:GetModelScale()

	player.networth = 0

	player:SetMinimumGoldBounty(0)
	player:SetMaximumGoldBounty(0)

	FireGameEvent("save_abilities", {
		ent_index = player:entindex(),
	})

	player:RemoveAbility("ability_capture")
	player:RemoveAbility("abyssal_underlord_portal_warp")
	player:RemoveAbility("ability_lamp_use")
	player:RemoveAbility("ability_pluck_famango")

	local add_abilites = {
		"mid_teleport",
		"custom_bkb_effects",
		"high_five_custom",
		"custom_ability_smoke",
		"custom_ability_observer",
		"custom_ability_sentry",
		"custom_ability_dust",
	}

	for _, ability_name in pairs(add_abilites) do
		local new_ability = player:AddAbility(ability_name)
		new_ability:SetLevel(1)
	end

	if player.is_bot then
		--high_five:SetHidden(false)
	end

	local monkey_king_ultimate = player:FindAbilityByName("monkey_king_wukongs_command_custom")
	if monkey_king_ultimate then
		monkey_king_ultimate:CreateSoldiers()
	end

	if custom_voice[player:GetUnitName()] then
		player:AddNewModifier(player, nil, "modifier_voice_module", {})
	end

	player:AddNewModifier(player, nil, "modifier_player_main_custom", {})

	local mod = player:FindModifierByName("modifier_item_custom_dust_charges")
	if mod then
		local stack = mod:GetAbility():GetSpecialValueFor("start_stack")
		if not IsSoloMode() then
			stack = mod:GetAbility():GetSpecialValueFor("start_stack_duo")
		end
		mod:SetStackCount(stack)
	end

	local hero_name = player:GetUnitName()
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	local server_data = CustomNetTables:GetTableValue("server_data", tostring(id))
	local no_alert = false

	if
		server_data
		and server_data.unranked_penalty
		and server_data.unranked_penalty > 0
		and server_data.unranked_penalty_reason
	then
		player:AddNewModifier(player, nil, "modifier_unranked_penalty_" .. server_data.unranked_penalty_reason, {})
	end

	if sub_data then
		player.hide_tier = sub_data.hide_tier
		player.disable_quest = sub_data.disable_quest
		player.disable_tips = sub_data.disable_tips
		player.wavealert_hide = sub_data.wavealert_hide
		player.hide_pet_names = sub_data.hide_pet_names
		player.pet_state = sub_data.pet_state

		if sub_data.used_quest_reward and sub_data.used_quest_reward == 0 and player.completed_start_quest == 1 then
			Timers:CreateTimer(5, function()
				start_quest:QuestReward(id)
			end)
		end

		if sub_data.subscribed == 1 then
			player.subscribed = 1
			if sub_data.heroes_data[hero_name] and sub_data.heroes_data[hero_name].has_level == 1 then
				player.hero_tier = sub_data.heroes_data[hero_name].tier
				local particle = ParticleManager:CreateParticle(
					"particles/generic/hero_spawn_hero_level_" .. (sub_data.heroes_data[hero_name].tier + 1) .. ".vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					player
				)
				ParticleManager:ReleaseParticleIndex(particle)
			end
		end
	end

	local arcana_result = shop:GiveArcanaChestForPlayer(id, no_alert)
	local no_achivment = HTTP.playersData[id].achivment_done_before
		and not HTTP.playersData[id].achivment_done_before[1]

	local new_items_sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if new_items_sub_data and new_items_sub_data.new_items then
		local has_new_items = false
		for _, _ in pairs(new_items_sub_data.new_items) do
			has_new_items = true
			break
		end
		if has_new_items then
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(id),
				"new_items_alert",
				{ items = new_items_sub_data.new_items }
			)
		end
	end

	Timers:CreateTimer(3, function()
		if twitch_alert then
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "twitch_alert", {})
		else
			if
				not pro_mod
				and arcana_result ~= -1
				and (player.completed_start_quest == 1 or player.disable_quest == 1)
				and not test
			then
				--	if arcana_result == 1 or (arcana_result == 0 and not no_achivment) then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(id),
					"arcana_alert",
					{ type = arcana_result }
				)
				--	elseif no_achivment then
				--	Timers:CreateTimer(3, function()
				--	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), 'duo_gift_alert', {} )
				--end)
				--end
			end
		end

		if sale_alert and not test then
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(id),
				"show_sale_alert",
				{ sale_type = sale_type }
			)
		end
	end)

	chat_wheel:SetDefaultSound(id)

	local player_data = HTTP.GetPlayerData(id)

	if player_data then
		player.islp = player_data.lowPriorityRemaining > 0
		player.banned = player_data.isBanned
		player.leave_banned = player_data.IsBannedByLeaveReports

		Timers:CreateTimer(2, function()
			if player_data.reports and IsSoloMode() then
				for other_player, report_count in pairs(player_data.reports) do
					local other_pid = HTTP.GetPlayerBySteamID(other_player)
					if report_count > 0 and other_pid ~= -1 then
						CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "report_alert", {
							type = 1,
							id = other_pid,
							number = report_count,
							max = MAX_REPORTS,
						})
					end
				end
			end

			if player_data.LeaveReports then
				local count = 0
				for index, _ in pairs(player_data.LeaveReports) do
					count = count + 1
				end
				if count > 0 then
					CustomGameEventManager:Send_ServerToPlayer(
						PlayerResource:GetPlayer(id),
						"report_alert",
						{ type = 2, count = count, max = MAX_LEAVE }
					)
				end
			end

			if
				IsUnrankedMap()
				and IsSoloMode()
				and player_data.unrankedStats
				and player_data.unrankedStats.matchCountTotal > 0
				and player_data.unrankedStats.matchCountTotal <= (RANKED_GAME_COUNT + 2)
				and player_data.matchCount < RANKED_GAME_COUNT_TOTAL
			then
				--CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), 'report_alert',  {type = 3, count = player_data.unrankedStats.matchCountTotal, max = RANKED_GAME_COUNT})
			end
		end)
	end

	Timers:CreateTimer(0.2, function()
		player:HeroLevelUp(false)
		player:HeroLevelUp(false)
		player:GiveGold(850, nil, true)
	end)

	for _, name in pairs(start_abilities) do
		local ability = player:FindAbilityByName(name)
		if ability then
			ability:SetLevel(1)
		end
	end

	local tp_item = CreateItem("item_tpscroll_custom", player, player)
	player:AddItem(tp_item)

	CustomNetTables:SetTableValue("custom_items_button", tostring(id), { observer = 0, sentry = 0 })

	local lvl = -1
	local hero_name = player:GetUnitName()

	if sub_data then
		if
			sub_data.heroes_data[hero_name]
			and sub_data.heroes_data[hero_name].has_level == 1
			and sub_data.subscribed == 1
			and sub_data.hide_tier == 0
		then
			lvl = sub_data.heroes_data[hero_name].tier
		end

		shop:AddPetFromStart(id)

		chat_wheel:SetDefaultSound(id)
	end

	if player:GetQuest() == nil and SelectedQuests[id] ~= nil then
		local quest_table = {}
		quest_table.name = SelectedQuests[id]
		local quests_data = CustomNetTables:GetTableValue("hero_quests", tostring(id))

		for hero_name, quest in pairs(quests_data) do
			if hero_name == player:GetUnitName() then
				for _, hero_quest in pairs(quest) do
					if hero_quest.name == SelectedQuests[id] then
						quest_table.exp = hero_quest.exp
						quest_table.shards = hero_quest.shards
						quest_table.icon = hero_quest.icon
						quest_table.goal = hero_quest.goal
						quest_table.legendary = hero_quest.legendary
						quest_table.number = hero_quest.number
					end
				end
			end
		end

		player:SetQuest(quest_table)
	end

	dota1x6:RequestSubscribed({ PlayerID = id })

	hero_tiers[id] = lvl
	hero_names[id] = hero_name

	dota1x6:SendPlayerHeroes()

	player:UpdateVisualPoints()
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(id),
		"init_damage_table",
		{ free_build = player.uses_build, subscribed = player.subscribed }
	)
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "init_custom_item_build", {})
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "reconnect_hero_image", {})
	CustomGameEventManager:Send_ServerToAllClients("update_score_table", {})

	if player:HasAbility("invoker_invoke_custom") then
		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "initInvokerPanel", {})
	end

	if sub_data and (test or (not IsUnrankedMap() and HTTP.IsValidGame(PlayerCount))) then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"init_double_rating",
			{ cd = sub_data.double_rating_cd, subscribed = sub_data.subscribed }
		)
	end

	if towers[player:GetTeamNumber()] then
		towers[player:GetTeamNumber()].ids = dota1x6:FindPlayers(player:GetTeamNumber())
	end

	if ingame_talents[hero_name] then
		talents_icons[hero_name] = {}
		for talent_name, talent in pairs(ingame_talents[hero_name]) do
			talents_icons[hero_name][talent_name] = {}
			talents_icons[hero_name][talent_name].icon = hero_name .. "/" .. talent["mini_icon"]
			talents_icons[hero_name][talent_name].color = talent["rarity"]
		end
	end

	for _, hero in pairs(players) do
		if hero.morph_ability and hero.morph_ability.tracker then
			hero.morph_ability.tracker:OnCreated()
		end

		if hero.hunt_ability and hero.hunt_ability.tracker then
			hero.hunt_ability.tracker:UpdateTargets()
		end
	end

	if not is_bot then
		local hero_list = CustomNetTables:GetTableValue("custom_pick", "hero_list")

		if hero_list and not hero_list[player:GetUnitName()] then
			player.banned = true
		end
		return
	end

	if not towers[player:GetTeamNumber()] then
		dota1x6:SetTower(player)
	end

	Timers:CreateTimer(0.1, function()
		if towers[player:GetTeamNumber()] then
			local team = player:GetTeamNumber()
			local respaw_pos = Entities:FindByName(nil, towers[player:GetTeamNumber()]:GetName() .. "_respawn")
			local spawner = Entities:FindByName(nil, "spawn" .. team)
			if spawner then
				if respaw_pos then
					spawner:SetAbsOrigin(respaw_pos:GetAbsOrigin())
				else
					spawner:SetAbsOrigin(towers[player:GetTeamNumber()]:GetAbsOrigin() + RandomVector(300))
				end
			end
		end

		dota1x6:UpdateHeroIcons()
	end)
end

function dota1x6:FindPlayers(team, give_names, give_heroes)
	local result = {}
	for id, player in pairs(players) do
		if player:GetTeamNumber() == team then
			if give_names then
				table.insert(result, player:GetUnitName())
			elseif give_heroes then
				table.insert(result, player)
			else
				table.insert(result, id)
			end
		end
	end

	if give_names or give_heroes or #result > 0 then
		return result
	else
		return nil
	end
end

function dota1x6:ResetDuelPairs()
	if dota1x6:FinalDuel() then
		return
	end
	if not dota1x6:IsDuelWave() then
		return
	end

	for _, data in pairs(duel_data) do
		if data.finished == 0 and data.stage ~= 1 then
			return
		end
	end

	local keep = {}

	for _, data in pairs(duel_data) do
		if data.finished == 0 then
			data.finished = 1

			if IsValid(data.tower1, data.tower2) then
				keep[data.tower1:GetTeamNumber()] = data.tower2:GetTeamNumber()
				keep[data.tower2:GetTeamNumber()] = data.tower1:GetTeamNumber()
			end

			if IsValid(data.tower1) then
				data.tower1.duel_data = -1
			end

			if IsValid(data.tower2) then
				data.tower2.duel_data = -1
			end

			if IsValid(data.duel_mod) then
				data.duel_mod:Destroy()
			end
		end
	end

	duel_alert_init = false

	dota1x6:FindDuelPairs(keep)
end

function dota1x6:FindDuelPairs(keep)
	local count = 0
	for _, tower in pairs(towers) do
		count = count + 1
	end

	if count == 3 then
		for _, data in pairs(duel_data) do
			if data.finished == 0 then
				dota1x6.waiting_top3_duel = true
				return
			end
		end
		dota1x6.waiting_top3_duel = false
	end

	local net = dota1x6:GetTeamsNet()

	if #net > 1 then
		table.sort(net, function(x, y)
			return y.gold > x.gold
		end)
	else
		return
	end

	if #net > 3 then
		local duel_1_team_1 = net[#net].team
		local duel_1_team_2 = -1
		local duel_2_team_1 = net[#net - 3].team
		local duel_2_team_2 = -1

		local duel_3_team_1 = -1
		local duel_3_team_2 = -1

		if #net == 6 then
			duel_3_team_1 = net[1].team
			duel_3_team_2 = net[2].team
			dota1x6:InitDuel(duel_3_team_1, duel_3_team_2, 0)
		end

		if towers[duel_1_team_1] and towers[duel_1_team_1].last_enemy then
			if towers[duel_1_team_1].last_enemy == net[#net - 1].team then
				duel_1_team_2 = net[#net - 2].team
				duel_2_team_2 = net[#net - 1].team
			else
				if towers[duel_1_team_1].last_enemy == net[#net - 2].team then
					duel_1_team_2 = net[#net - 1].team
					duel_2_team_2 = net[#net - 2].team
				end
			end
		end

		if duel_1_team_2 == -1 then
			if towers[duel_2_team_1] and towers[duel_2_team_1].last_enemy then
				if towers[duel_2_team_1].last_enemy == net[#net - 1].team then
					duel_2_team_2 = net[#net - 2].team
					duel_1_team_2 = net[#net - 1].team
				else
					if towers[duel_2_team_1].last_enemy == net[#net - 2].team then
						duel_2_team_2 = net[#net - 1].team
						duel_1_team_2 = net[#net - 2].team
					end
				end
			end

			if duel_2_team_2 == -1 and keep then
				if keep[duel_1_team_1] == net[#net - 1].team or keep[duel_2_team_1] == net[#net - 2].team then
					duel_1_team_2 = net[#net - 1].team
					duel_2_team_2 = net[#net - 2].team
				elseif keep[duel_1_team_1] == net[#net - 2].team or keep[duel_2_team_1] == net[#net - 1].team then
					duel_1_team_2 = net[#net - 2].team
					duel_2_team_2 = net[#net - 1].team
				end
			end

			if duel_2_team_2 == -1 then
				local random = RandomInt(1, 2)

				local random2 = random

				repeat
					random2 = RandomInt(1, 2)
				until random2 ~= random

				duel_1_team_2 = net[#net - random].team
				duel_2_team_2 = net[#net - random2].team
			end
		end

		dota1x6:InitDuel(duel_1_team_1, duel_1_team_2, 0)
		dota1x6:InitDuel(duel_2_team_1, duel_2_team_2, 0)
	elseif #net > 2 then
		local team_1 = nil
		local team_2 = nil

		for team, tower in pairs(towers) do
			if tower.won_duel == 1 then
				team_1 = team
				break
			end
		end

		if team_1 then
			for team, tower in pairs(towers) do
				if tower.won_duel ~= -1 and team ~= team_1 then
					team_2 = team
					break
				end
			end
		else
			team_1 = net[#net].team
		end

		if team_2 == nil then
			if towers[team_1] and towers[team_1].last_enemy then
				if towers[team_1].last_enemy == net[1].team then
					team_2 = net[2].team
				end

				if towers[team_1].last_enemy == net[2].team then
					team_2 = net[1].team
				end
			end

			if team_2 == nil then
				team_2 = net[RandomInt(1, #net - 1)].team
			end
		end

		dota1x6:InitDuel(team_1, team_2, 0)

		for team, tower in pairs(towers) do
			tower.won_duel = 0
		end
	end
end

function dota1x6:InitDuel(team1, team2, final)
	if not IsServer() then
		return
	end
	local tower1 = towers[team1]
	local tower2 = towers[team2]

	if not tower1 or not tower2 then
		return
	end
	if team1 == team2 then
		return
	end

	if final == 1 then
		CustomGameEventManager:Send_ServerToAllClients("generic_sound", { sound = "FinalDuel.Start" })

		for _, data in pairs(duel_data) do
			if data.finished == 0 then
				data.finished = 1

				if data.tower1 and not data.tower1:IsNull() then
					data.tower1.duel_data = -1
				end

				if data.tower2 and not data.tower2:IsNull() then
					data.tower2.duel_data = -1
				end

				if data.duel_mod and not data.duel_mod:IsNull() then
					data.duel_mod:Destroy()
				end
			end
		end

		for team, tower in pairs(towers) do
			for _, building in
				pairs(
					FindUnitsInRadius(
						team,
						tower:GetAbsOrigin(),
						nil,
						2500,
						DOTA_UNIT_TARGET_TEAM_FRIENDLY,
						DOTA_UNIT_TARGET_BUILDING + DOTA_UNIT_TARGET_BASIC,
						DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
						FIND_ANY_ORDER,
						false
					)
				)
			do
				if building:HasModifier("modifier_tower_incoming") then
					building:AddNewModifier(building, nil, "modifier_tower_final_duel", {})
				end
			end
		end
	end

	local number = #duel_data + 1

	tower1.duel_data = number
	tower2.duel_data = number

	duel_data[number] = {}

	duel_data[number].tower1 = tower1
	duel_data[number].tower2 = tower2

	duel_data[number].heroes = {}
	for i = 1, 2 do
		duel_data[number].heroes[i] = {}
		local team = team1
		if i == 2 then
			team = team2
		end
		local ids = dota1x6:FindPlayers(team)
		if ids then
			duel_data[number].heroes[i] = {}
			for _, id in pairs(ids) do
				local player = players[id]
				if player then
					local count = #duel_data[number].heroes[i] + 1
					duel_data[number].heroes[i][count] = {}
					duel_data[number].heroes[i][count].hero = player:GetUnitName()
					duel_data[number].heroes[i][count].id = id
				end
			end
		end
	end

	duel_data[number].wins1 = 0
	duel_data[number].wins2 = 0
	duel_data[number].final_duel = final
	duel_data[number].field_created = 0
	duel_data[number].field = nil
	duel_data[number].rounds = 0
	duel_data[number].finished = 0
	duel_data[number].timer = 0
	duel_data[number].max_timer = duel_timer_normal
	duel_data[number].duel_mod = nil
	duel_data[number].stage = 1
	duel_data[number].top3 = 0

	if final == 1 then
		MaxTimer = duel_timer
		if test then
			MaxTimer = 5
		end
		timer = 0
		duel_data[number].max_timer = duel_timer_final
	end

	local count = 0

	for _, tower in pairs(towers) do
		count = count + 1
	end

	if count == 3 then
		duel_data[number].top3 = 1
	end
end

function dota1x6:CreateDuelField(index)
	if not duel_data[index] then
		return
	end
	if duel_data[index].field_created == 1 then
		return
	end

	local field = 0

	if duel_data[index].final_duel == 1 and duel_data[index].field then
		for arena_number, data in pairs(dota1x6.duel_arenas) do
			if duel_data[index].field ~= data then
				duel_data[index].field = data
				field = arena_number
				break
			end
		end
	else
		for arena_number, data in pairs(dota1x6.duel_arenas) do
			if not data.is_active then
				for _, map_team in pairs(data.teams) do
					if map_team == duel_data[index].tower1.map_team or map_team == duel_data[index].tower2.map_team then
						field = arena_number
					end
				end
			end
		end
	end

	if field == 0 then
		for arena_number, data in pairs(dota1x6.duel_arenas) do
			if not data.is_active then
				field = arena_number
			end
		end
	end

	if not dota1x6.duel_arenas[field] or not dota1x6.duel_arenas[field].start_pos then
		return
	end
	if not IsValid(dota1x6.duel_arenas[field].arena_thinker) then
		return
	end

	duel_data[index].field = dota1x6.duel_arenas[field]
	duel_data[index].field_created = 1

	duel_data[index].rounds = duel_data[index].rounds + 1

	local vec = duel_data[index].field.start_pos[1][1] - duel_data[index].field.start_pos[2][1]
	local point = duel_data[index].field.start_pos[1][1] - vec:Normalized() * (vec:Length2D() / 2)

	duel_data[index].duel_mod = dota1x6.duel_arenas[field].arena_thinker:AddNewModifier(
		nil,
		nil,
		"modifier_duel_field_active_thinker",
		{ index = index }
	)
end