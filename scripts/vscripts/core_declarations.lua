--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


TEAM_COLORS = {
	[DOTA_TEAM_GOODGUYS] = { 61, 210, 150 },
	[DOTA_TEAM_BADGUYS] = { 243, 201, 9 },
	[DOTA_TEAM_CUSTOM_1] = { 197, 77, 168 },
	[DOTA_TEAM_CUSTOM_2] = { 255, 108, 0 },
	[DOTA_TEAM_CUSTOM_3] = { 52, 85, 255 },
	[DOTA_TEAM_CUSTOM_4] = { 101, 212, 19 },
	[DOTA_TEAM_CUSTOM_5] = { 129, 83, 54 },
	[DOTA_TEAM_CUSTOM_6] = { 27, 192, 216 },
	[DOTA_TEAM_CUSTOM_7] = { 199, 228, 13 },
	[DOTA_TEAM_CUSTOM_8] = { 140, 42, 244 },
}

TEAMS_LAYOUTS = {
	["ot3_demo"] = {
		player_count = 1,
		teamlist = {
			DOTA_TEAM_GOODGUYS,
			DOTA_TEAM_BADGUYS,
			DOTA_TEAM_CUSTOM_1,
			DOTA_TEAM_CUSTOM_2,
			DOTA_TEAM_CUSTOM_3,
			DOTA_TEAM_CUSTOM_4,
			DOTA_TEAM_CUSTOM_5,
			DOTA_TEAM_CUSTOM_6,
		},
		-- these are ADDED to basic 960 / 720
		ring_bonuses = {
			gpm = 900,
			xpm = 1440,
		},
		ring_radius = 900,
		overboss_throw_chance = 3.33,
		kill_goal = 999,
		abandon_kill_goal_reduction = 2,
		kills_by_vote = 2,
		time_by_vote = 30,
		game_base_duration = 1200,
		respawn_time = {
			3,
			3,
		},

		common_upgrade_progress = {
			6,
			6,
		},
		-- bar starts at 2 kills, incremented by 3 after every 1 orb granted
		rare_upgrade_basic_requirement = 2,
		rare_upgrade_requirement_increment = 3,
		rare_upgrade_requirement_step = 1,
		capture_point_time = 4,
		capture_point_radius = 250,
		flying_item_drop_time = 120,
		center_vision_reveal_radius = 1100,

		starting_drop_weights = {},

		leader_overthrow_reward_min = 3,
		leader_overthrow_reward_max = 6,
		leader_overthrow_threshold = 5,

		rating_changes = { 0, 0, 0, 0, 0, 0, 0, 0 },
		min_connected_players = 99999,
	},
	["ot3_necropolis_ffa"] = {
		player_count = 1,
		teamlist = {
			DOTA_TEAM_GOODGUYS,
			DOTA_TEAM_BADGUYS,
			DOTA_TEAM_CUSTOM_1,
			DOTA_TEAM_CUSTOM_2,
			DOTA_TEAM_CUSTOM_3,
			DOTA_TEAM_CUSTOM_4,
			DOTA_TEAM_CUSTOM_5,
			DOTA_TEAM_CUSTOM_6,
		},
		-- these are ADDED to basic 960 / 720
		ring_bonuses = {
			gpm = 900,
			xpm = 1440,
		},
		ring_radius = 1100,
		overboss_throw_chance = 3, -- x2 on FFA map
		kill_goal = 30,
		abandon_kill_goal_reduction = 2,
		kills_by_vote = 1,
		time_by_vote = 30,
		game_base_duration = 1200,
		respawn_time = {
			11,
			10,
			9,
			8,
			7,
			6,
			5,
			4,
		},

		common_upgrade_progress = {
			6,
			7.3,
			8.9,
			10.9,
			13.2,
			16.2,
			19.7,
			24,
		},
		-- bar starts at 2 kills, incremented by 3 after every 1 orb granted
		rare_upgrade_basic_requirement = 2,
		rare_upgrade_requirement_increment = 3,
		rare_upgrade_requirement_step = 1,
		capture_point_time = 5,
		capture_point_radius = 250,
		flying_item_drop_time = 120, -- x2 on FFA map
		center_vision_reveal_radius = 1200,
		tower_attack_range = 1050,

		starting_drop_weights = {},

		gg_token_kill_goal_bonus = 10,
		rating_changes = { 28, 20, 12, 4, -4, -12, -20, -28 },
		stalemate_game_time_limit = 180,

		leader_overthrow_reward_min = 4,
		leader_overthrow_reward_max = 5,
		leader_overthrow_threshold = 5,

		min_connected_players = 2,
	},
	["ot3_gardens_duo"] = {
		player_count = 2,
		teamlist = {
			DOTA_TEAM_GOODGUYS,
			DOTA_TEAM_BADGUYS,
			DOTA_TEAM_CUSTOM_1,
			DOTA_TEAM_CUSTOM_2,
			DOTA_TEAM_CUSTOM_3,
		},
		-- these are ADDED to basic 960 / 720
		ring_bonuses = {
			gpm = 900,
			xpm = 1440,
		},
		ring_radius = 1050,
		overboss_throw_chance = 3.33,
		kill_goal = 50,
		abandon_kill_goal_reduction = 2,
		kills_by_vote = 2,
		time_by_vote = 30,
		game_base_duration = 1200,
		respawn_time = {
			12,
			10,
			8,
			6,
			4,
		},

		common_upgrade_progress = {
			6,
			8.5,
			12,
			17,
			24,
		},
		-- bar starts at 2 kills, incremented by 3 after every 1 orb granted
		rare_upgrade_basic_requirement = 2,
		rare_upgrade_requirement_increment = 3,
		rare_upgrade_requirement_step = 1,
		capture_point_time = 5,
		capture_point_radius = 250,
		flying_item_drop_time = 120,
		center_vision_reveal_radius = 1000,
		tower_attack_range = 850,

		starting_drop_weights = {},

		gg_token_kill_goal_bonus = 10,
		rating_changes = { 30, 15, 0, -15, -30 },
		stalemate_game_time_limit = 180,

		leader_overthrow_reward_min = 5,
		leader_overthrow_reward_max = 6,
		leader_overthrow_threshold = 5,

		min_connected_players = 2,
	},
	["ot3_jungle_quintet"] = {
		player_count = 5,
		teamlist = {
			DOTA_TEAM_GOODGUYS,
			DOTA_TEAM_BADGUYS,
			DOTA_TEAM_CUSTOM_1,
		},
		ring_bonuses = {
			gpm = 900,
			xpm = 1440,
		},
		ring_radius = 1400,
		overboss_throw_chance = 2,
		kill_goal = 90,
		abandon_kill_goal_reduction = 3,
		kills_by_vote = 2,
		time_by_vote = 20,
		game_base_duration = 1200,
		respawn_time = {
			12,
			8,
			4,
		},

		common_upgrade_progress = {
			6,
			12,
			24,
		},
		rare_upgrade_basic_requirement = 4,
		rare_upgrade_requirement_increment = 5,
		rare_upgrade_requirement_step = 1,
		capture_point_time = 7,
		capture_point_radius = 322,
		flying_item_drop_time = 200,
		center_vision_reveal_radius = 1500,
		tower_attack_range = 850,

		gg_token_kill_goal_bonus = 15,
		rating_changes = { 30, 0, -30 },
		stalemate_game_time_limit = 180,

		leader_overthrow_reward_min = 3,
		leader_overthrow_reward_max = 4,
		leader_overthrow_threshold = 5,

		starting_drop_weights = {
			[1] = 5,
			[2] = 5,
			[3] = 5,
			[8] = 5,
		},

		laggy_heroes = {
			npc_dota_hero_phantom_lancer = true,
			-- npc_dota_hero_venomancer = true,
			npc_dota_hero_chaos_knight = true,
			npc_dota_hero_shadow_shaman = true,
			npc_dota_hero_spectre = true,
			npc_dota_hero_undying = true,
			npc_dota_hero_dark_seer = true,
			npc_dota_hero_terrorblade = true,
			npc_dota_hero_meepo = true,
		},
		laggy_heroes_max_count = 1,

		min_connected_players = 4,
	},
	["ot3_desert_octet"] = {
		player_count = 7,
		teamlist = {
			DOTA_TEAM_GOODGUYS,
			DOTA_TEAM_BADGUYS,
			DOTA_TEAM_CUSTOM_1,
		},
		ring_bonuses = {
			gpm = 900,
			xpm = 1440,
		},
		ring_radius = 1400,
		overboss_throw_chance = 2,
		kill_goal = 125,
		abandon_kill_goal_reduction = 4,
		kills_by_vote = 2,
		time_by_vote = 12.5,
		game_base_duration = 1200,
		respawn_time = {
			12,
			8,
			4,
		},

		common_upgrade_progress = {
			6,
			12,
			24,
		},
		rare_upgrade_basic_requirement = 6,
		rare_upgrade_requirement_increment = 8,
		rare_upgrade_requirement_step = 1,
		capture_point_time = 10,
		capture_point_radius = 400,
		flying_item_drop_time = 200,
		center_vision_reveal_radius = 1500,
		tower_attack_range = 850,

		gg_token_kill_goal_bonus = 20,
		rating_changes = { 30, 0, -30 },

		starting_drop_weights = {
			[1] = 5,
			[2] = 5,
			[3] = 5,
			[8] = 5,
		},

		laggy_heroes = {
			npc_dota_hero_phantom_lancer = true,
			npc_dota_hero_venomancer = true,
			npc_dota_hero_chaos_knight = true,
			npc_dota_hero_shadow_shaman = true,
			npc_dota_hero_spectre = true,
			npc_dota_hero_undying = true,
			npc_dota_hero_dark_seer = true,
			npc_dota_hero_terrorblade = true,
			npc_dota_hero_meepo = true,
		},
		laggy_heroes_max_count = 1,

		stalemate_game_time_limit = 180,

		leader_overthrow_reward_min = 3,
		leader_overthrow_reward_max = 4,
		leader_overthrow_threshold = 5,

		min_connected_players = 4,
	},
}

PREGAME_TIME = 20

GAME_DURATION_OPTIONAL_EARLY_CONSUMABLES_TIME = 20

LEADER_KILL_GOLD_REWARD_PER_DIFFERENCE = 60
LEADER_KILLS_TO_DIFFERENCE = 2
GOLD_TO_EXP_RATIO = 1
NONLEADER_KILL_MULTIPLIER = 0.5

UPGRADE_RARITY_COMMON = 1
UPGRADE_RARITY_RARE = 2
UPGRADE_RARITY_EPIC = 4

-- TODO: revert
COMMON_UPGRADES_REQUIREMENT = 1000 -- (IsInToolsMode() and 50) or 1000

COURIER_PICKUP_BLACKLIST = {
	["item_gold_coin"] = true,
	["item_common_orb"] = true,
	["item_rare_orb"] = true,
	["item_epic_orb"] = true,
}

RING_RADIUS_MINIMUM = 300
-- sector-based orb random variables
RING_SECTOR_COUNT = 8
ADJACENT_SECTOR_FACTOR = 0.5 -- basically 50% of a total weight from dropped orb goes to immediate sector neighbors
RARITY_WEIGHT_MULTIPLIER = 4.0
INVERSED_WEIGHT_MULTIPLIER = 5.0 -- basically how much do we want random to bias towards least dropped epic spawn points
RING_RADIUS_PER_ORB = 200 -- radius is capped to value in per-map config
EPIC_ORB_WEIGHT = 40

OVERBOSS_ORB_THROW_MULTIPLIER_PCT = 150
OVERBOSS_ORB_THROW_MULTIPLIER_PCT_CHANGE_PER_MINUTE = -5
OVERBOSS_ORB_THROW_MULTIPLIER_MIN_CAP = 75
OVERBOSS_ORB_THROW_MULTIPLIER_MAX_CAP = 99999

OVERBOSS_ORB_THROW_RARE_PCT = 0
OVERBOSS_ORB_THROW_RARE_PCT_CHANGE_PER_MINUTE = 5
OVERBOSS_ORB_THROW_RARE_PCT_MAX_CAP = 50

OVERBOSS_ORB_THROW_EPIC_PCT = -25
OVERBOSS_ORB_THROW_EPIC_PCT_CHANGE_PER_MINUTE = 2.5
OVERBOSS_ORB_THROW_EPIC_PCT_MAX_CAP = 25

REROLL_PRICES = {
	[UPGRADE_RARITY_COMMON] = 1,
	[UPGRADE_RARITY_RARE] = 2,
	[UPGRADE_RARITY_EPIC] = 4,
}

RANDOM_BONUS_ITEMS = { "item_faerie_fire", "item_enchanted_mango", "item_infused_raindrop" }

MAX_NEUTRAL_ITEMS_PER_PLAYER = 1

PRINT_EXTENDED_DEBUG = false
DEV_BOTS_ENABLED = false
DEV_RANDOM_WINRATES = false
DEV_ENABLE_SPECTATOR_TEAM = false
DEV_ORB_DROP_PINGS = false

RATING_MULTIPLIER = 0.0125
RATING_CHANGE_CAP = 20

-- 3 minutes for simulated end game, makes sure we won't hog dedicated servers with neverending games
SIMULATED_END_GAME_DELAY = 180

DEVELOPERS = {
	["76561198132422587"] = true, -- Sanctus Animus
	["76561198064622537"] = true, -- Sheodar
	["76561198015161808"] = true, -- Cookies
	["76561198007141460"] = true, -- Firetoad
	["76561198188258659"] = true, -- Luminance
	["76561199069138789"] = true, -- Dota 2 unofficial
	["76561198054211176"] = true, -- Snoresville
	["76561198040469212"] = true, -- Draze22
	["76561198007063562"] = true, -- Daser27
}

KNOWN_LOCALE_ALIASES = {
	eng = "english",
	en = "english",
	ru = "russian",
	fr = "french",
}

END_GAME_PLAYER_COUNT_CHECK_ENABLED = not IsInToolsMode()