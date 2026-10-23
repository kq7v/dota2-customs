--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if addon_game_const == nil then
	_G.addon_game_const = class({})
end

_G.icon_hero_width = {
	["npc_dota_hero_templar_assassin"] = { 0.9, 1 },
	["npc_dota_hero_pudge"] = { 0.9, 1 },
	["npc_dota_hero_mars"] = { 0.95, 1 },
	["npc_dota_hero_ogre_magi"] = { 1, 0.9 },
	["npc_dota_hero_drow_ranger"] = { 0.9, 1 },
	["npc_dota_hero_antimage"] = { 0.9, 1 },
	["npc_dota_hero_ember_spirit"] = { 0.94, 1 },
	["npc_dota_hero_monkey_king"] = { 0.9, 1 },
	["npc_dota_hero_nevermore"] = { 0.9, 1 },
	["npc_dota_hero_terrorblade"] = { 0.9, 1 },
	["npc_dota_hero_crystal_maiden"] = { 1, 0.94 },
	["npc_dota_hero_skywrath_mage"] = { 0.95, 1 },
	["npc_dota_hero_zuus"] = { 0.95, 1 },
	["npc_dota_hero_invoker"] = { 1, 0.95 },
	["npc_dota_hero_marci"] = { 0.9, 1 },
	["npc_dota_hero_sand_king"] = { 0.95, 1 },
	["npc_dota_hero_enigma"] = { 0.8, 1 },
	["npc_dota_hero_bane"] = { 0.85, 1 },
	["npc_dota_hero_life_stealer"] = { 0.9, 1 },
	["npc_dota_hero_tinker"] = { 0.95, 1 },
	["npc_dota_hero_witch_doctor"] = { 0.9, 1 },
	["npc_dota_hero_nyx_assassin"] = { 0.95, 1 },
	["npc_dota_hero_broodmother"] = { 0.95, 1 },
	["npc_dota_hero_lina_alt1"] = { 0.85, 1 },
	["npc_dota_hero_drow_ranger_alt1"] = { 0.95, 1 },
	["npc_dota_hero_drow_ranger_alt2"] = { 0.95, 1 },
	["npc_dota_hero_ogre_magi_alt1"] = { 1, 0.8 },
	["npc_dota_hero_ogre_magi_alt2"] = { 1, 0.8 },
	["npc_dota_hero_terrorblade_alt1"] = { 0.95, 1 },
	["npc_dota_hero_antimage_persona1"] = { 0.95, 1 },
	["npc_dota_hero_juggernaut_alt1"] = { 0.95, 1 },
	["npc_dota_hero_juggernaut_alt2"] = { 0.95, 1 },
	["npc_dota_hero_skeleton_king_alt1"] = { 0.95, 1 },
	["npc_dota_hero_skeleton_king_alt2"] = { 1, 0.95 },
	["npc_dota_hero_night_stalker"] = { 0.97, 1 },
	["npc_dota_hero_kunkka"] = { 0.8, 1 },
}

_G.icon_hero_id = {
	["npc_dota_hero_juggernaut"] = 23,
	["npc_dota_hero_juggernaut_alt1"] = 119,
	["npc_dota_hero_juggernaut_alt2"] = 119,
	["npc_dota_hero_phantom_assassin"] = 79,
	["npc_dota_hero_phantom_assassin_alt1"] = 122,
	["npc_dota_hero_phantom_assassin_persona1"] = 161,
	["npc_dota_hero_huskar"] = 22,
	["npc_dota_hero_nevermore"] = 33,
	["npc_dota_hero_nevermore_alt1"] = 123,
	["npc_dota_hero_queenofpain"] = 39,
	["npc_dota_hero_queenofpain_alt1"] = 142,
	["npc_dota_hero_queenofpain_alt2"] = 143,
	["npc_dota_hero_legion_commander"] = 106,
	["npc_dota_hero_legion_commander_alt1"] = 162,
	["npc_dota_hero_legion_commander_carnival"] = 171,
	["npc_dota_hero_bristleback"] = 101,
	["npc_dota_hero_bristleback_carnival"] = 170,
	["npc_dota_hero_terrorblade"] = 108,
	["npc_dota_hero_terrorblade_alt1"] = 125,
	["npc_dota_hero_puck"] = 36,
	["npc_dota_hero_void_spirit"] = 138,
	["npc_dota_hero_ember_spirit"] = 105,
	["npc_dota_hero_pudge"] = 37,
	["npc_dota_hero_pudge_alt1"] = 129,
	["npc_dota_hero_pudge_alt2"] = 129,
	["npc_dota_hero_pudge_persona1"] = 145,
	["npc_dota_hero_hoodwink"] = 148,
	["npc_dota_hero_skeleton_king"] = 46,
	["npc_dota_hero_skeleton_king_alt1"] = 141,
	["npc_dota_hero_skeleton_king_alt2"] = 165,
	["npc_dota_hero_lina"] = 28,
	["npc_dota_hero_lina_alt1"] = 127,
	["npc_dota_hero_troll_warlord"] = 99,
	["npc_dota_hero_axe"] = 0,
	["npc_dota_hero_axe_alt"] = 0,
	["npc_dota_hero_axe_carnival"] = 169,
	["npc_dota_hero_alchemist"] = 15,
	["npc_dota_hero_ogre_magi"] = 82,
	["npc_dota_hero_ogre_magi_alt1"] = 139,
	["npc_dota_hero_ogre_magi_alt2"] = 140,
	["npc_dota_hero_antimage"] = 1,
	["npc_dota_hero_antimage_persona1"] = 144,
	["npc_dota_hero_primal_beast"] = 157,
	["npc_dota_hero_marci"] = 156,
	["npc_dota_hero_templar_assassin"] = 89,
	["npc_dota_hero_bloodseeker"] = 6,
	["npc_dota_hero_monkey_king"] = 113,
	["npc_dota_hero_monkey_king_alt1"] = 116,
	["npc_dota_hero_mars"] = 133,
	["npc_dota_hero_zuus"] = 65,
	["npc_dota_hero_zuus_alt1"] = 120,
	["npc_dota_hero_leshrac"] = 25,
	["npc_dota_hero_crystal_maiden"] = 2,
	["npc_dota_hero_crystal_maiden_alt1"] = 121,
	["npc_dota_hero_crystal_maiden_persona1"] = 168,
	["npc_dota_hero_snapfire"] = 137,
	["npc_dota_hero_sven"] = 52,
	["npc_dota_hero_sniper"] = 48,
	["npc_dota_hero_muerta"] = 158,
	["npc_dota_hero_pangolier"] = 117,
	["npc_dota_hero_arc_warden"] = 115,
	["npc_dota_hero_invoker"] = 66,
	["npc_dota_hero_invoker_persona1"] = 136,
	["npc_dota_hero_razor"] = 41,
	["npc_dota_hero_razor_alt1"] = 163,
	["npc_dota_hero_razor_alt2"] = 164,
	["npc_dota_hero_sand_king"] = 43,
	["npc_dota_hero_furion"] = 21,
	["npc_dota_hero_abaddon"] = 104,
	["npc_dota_hero_drow_ranger"] = 16,
	["npc_dota_hero_drow_ranger_alt1"] = 153,
	["npc_dota_hero_drow_ranger_alt2"] = 154,
	["npc_dota_hero_skywrath_mage"] = 102,
	["npc_dota_hero_skywrath_mage_alt1"] = 166,
	["npc_dota_hero_skywrath_mage_alt2"] = 167,
	["npc_dota_hero_slark"] = 96,
	["npc_dota_hero_centaur"] = 95,
	["npc_dota_hero_enigma"] = 19,
	["npc_dota_hero_bane"] = 69,
	["npc_dota_hero_morphling"] = 31,
	["npc_dota_hero_morphling_carnival"] = 172,
	["npc_dota_hero_life_stealer"] = 27,
	["npc_dota_hero_tinker"] = 54,
	["npc_dota_hero_witch_doctor"] = 64,
	["npc_dota_hero_nyx_assassin"] = 90,
	["npc_dota_hero_broodmother"] = 8,
	["npc_dota_hero_night_stalker"] = 34,
	["npc_dota_hero_jakiro"] = 56,
	["npc_dota_hero_kunkka"] = 24,
}

--particles/hero_capture_icon/hero_capture_icon.vpcf

_G.Not_spell_damage = {
	["templar_assassin_psi_blades_custom"] = true,
	["witch_doctor_death_ward_custom"] = true,
}

_G.start_abilities = {
	"ogre_magi_dumb_luck_custom",
}

_G.rating_thresh = {
	["ranked_0-800"] = {
		["min"] = 0,
		["max"] = 799,
	},
	["ranked_800-x"] = {
		["min"] = 800,
		["max"] = 99999,
	},
	["ranked_duo"] = {
		["min"] = 0,
		["max"] = 99999,
	},
}

_G.ranked_tier = {
	0,
	150,
	300,
	500,
	750,
	1000,
	1300,
	9999999,
}

_G.NonRecordItems = {
	["item_clarity"] = true,
	["item_faerie_fire"] = true,
	["item_smoke_of_deceit"] = true,
	["item_ward_observer"] = true,
	["item_ward_sentry"] = true,
	["item_enchanted_mango"] = true,
	["item_flask"] = true,
	["item_tango"] = true,
	["item_blood_grenade"] = true,
	["item_dust"] = true,
	["item_bottle"] = true,
	["item_purple_upgrade_shop"] = true,
	["item_patrol_trap"] = true,
	["item_branches"] = true,
	["item_gauntlets"] = true,
	["item_slippers"] = true,
	["item_mantle"] = true,
	["item_circlet"] = true,
	["item_belt_of_strength"] = true,
	["item_boots_of_elves"] = true,
	["item_robe"] = true,
	["item_crown"] = true,
	["item_mystic_spark_custom"] = true,
	["item_chasm_stone_custom"] = true,
	["item_ogre_axe"] = true,
	["item_blade_of_alacrity"] = true,
	["item_staff_of_wizardry"] = true,
	["item_diadem"] = true,
	["item_ring_of_protection"] = true,
	["item_infused_raindrop"] = true,
	["item_blades_of_attack"] = true,
	["item_gloves"] = true,
	["item_chainmail"] = true,
	["item_quarterstaff"] = true,
	["item_helm_of_iron_will"] = true,
	["item_broadsword"] = true,
	["item_blitz_knuckles_custom"] = true,
	["item_javelin_custom"] = true,
	["item_claymore_custom"] = true,
	["item_mithril_hammer"] = true,
	["item_ring_of_regen"] = true,
	["item_sobi_mask"] = true,
	["item_fluffy_hat"] = true,
	["item_wind_lace"] = true,
	["item_cloak_custom"] = true,
	["item_shawl_custom"] = true,
	["item_boots"] = true,
	["item_lifesteal_custom"] = true,
	["item_voodoo_mask_custom"] = true,
	["item_magic_stick"] = true,
	["item_buckler"] = true,
	["item_ring_of_basilius"] = true,
	["item_headdress"] = true,
	["item_ring_of_health"] = true,
	["item_void_stone"] = true,
	["item_cornucopia"] = true,
	["item_energy_booster"] = true,
	["item_vitality_booster"] = true,
	["item_point_booster"] = true,
	["item_talisman_of_evasion_custom"] = true,
	["item_platemail"] = true,
	["item_hyperstone"] = true,
	["item_ultimate_orb"] = true,
	["item_demon_edge"] = true,
	["item_mystic_staff"] = true,
	["item_reaver"] = true,
	["item_eagle"] = true,
	["item_relic"] = true,
	["item_patrol_warp_amulet"] = true,
	["item_patrol_restrained_orb"] = true,
	["item_patrol_midas"] = true,
	["item_patrol_vision"] = true,
	["item_patrol_fortifier"] = true,
	["item_patrol_razor"] = true,
	["item_gray_upgrade"] = true,
	["item_ultimate_scepter"] = true,
	["item_oblivion_staff_custom"] = true,
	["item_patrol_reward_1"] = true,
	["item_tiara_of_selemene"] = true,
	["item_soul_booster"] = true,
	["item_muerta_shovel_custom"] = true,
	["item_ring_of_tarrasque"] = true,
	["item_patrol_reward_2"] = true,
	["item_pers"] = true,
	["item_blue_upgrade"] = true,
	["item_purple_upgrade"] = true,
	["item_essence_of_speed"] = true,
	["item_legendary_upgrade"] = true,
	["item_gray_upgrade"] = true,
	["item_travel_boots_2_custom"] = true,
}

_G.DeleteAbilities = {
	"custom_ability_smoke",
	"custom_ability_observer",
	"custom_ability_sentry",
	"custom_ability_dust",
	"ability_capture",
	"abyssal_underlord_portal_warp",
	"ability_lamp_use",
	"ability_pluck_famango",
}

_G.PassiveAbilities = {}

_G.UnvalidAbilities = {
	["mid_teleport"] = true,
	["custom_ability_observer"] = true,
	["custom_ability_sentry"] = true,
	["custom_ability_smoke"] = true,
	["custom_ability_dust"] = true,
	["custom_ability_grenade"] = true,
	["invoker_exort_custom"] = true,
	["invoker_wex_custom"] = true,
	["invoker_quas_custom"] = true,
	["invoker_invoke_custom"] = true,
	["hoodwink_sharpshooter_release_custom"] = true,
	["marci_summon_dragon_knight"] = true,
	["marci_summon_mirana"] = true,
	["marci_summon_luna"] = true,
	["high_five_custom"] = true,
	["skywrath_mage_mystic_flare_custom_legendary"] = true,
	["custom_puck_illusory_barrier"] = true,
	["morphling_morph_replicate_custom"] = true,
	["templar_assassin_trap_custom"] = true,
	["bane_nightmare_end_custom"] = true,
	["alchemist_acid_spray_mixing"] = true,
	["centaur_hoof_stomp_custom"] = true,
	["ember_spirit_fire_remnant_custom"] = true,
	["ember_spirit_activate_fire_remnant_custom"] = true,
	["ember_spirit_fire_remnant_custom_scepter_ability"] = true,
	["bristleback_quill_spray_custom_legendary"] = true,
	["mars_bulwark_custom"] = true,
	["jakiro_innate_custom"] = true,
	["custom_puck_ethereal_jaunt"] = true,
	["monkey_king_tree_dance_custom"] = true,
	["ogre_magi_multicast_custom"] = true,
	["custom_phantom_assassin_coup_de_grace"] = true,
}

_G.Recast_mods = {
	["item_mask_of_madness_custom"] = "modifier_item_mask_of_madness_custom_speed",
	["crystal_maiden_freezing_field_custom"] = "modifier_crystal_maiden_freezing_field_custom",
	["invoker_emp_custom"] = "modifier_invoker_emp_custom_teleport",
	["custom_juggernaut_blade_fury"] = "modifier_custom_juggernaut_blade_fury",
	["lina_scepter_custom"] = "modifier_lina_scepter_custom_caster",
	["nyx_assassin_burrow_custom"] = "modifier_nyx_assassin_burrow_custom",
	["custom_puck_illusory_orb"] = "modifier_puck_coil_orb_custom_steal_jump",
	["custom_puck_waning_rift"] = "modifier_custom_puck_waning_rift_legendary_charge",
	["monkey_king_wukongs_command_custom"] = "modifier_monkey_king_wukongs_command_custom_buff",
	["furion_teleportation_custom"] = "modifier_furion_teleportation_custom_legendary",
	["pangolier_gyroshell_custom"] = "modifier_pangolier_gyroshell_custom",
	["pangolier_rollup_custom"] = "modifier_pangolier_rollup_custom",
	["kunkka_x_marks_the_spot_custom"] = "modifier_kunkka_xmark_custom_caster",
	["kunkka_ghostship_custom"] = "modifier_kunkka_ghostship_custom_legendary_sail",
	["custom_phantom_assassin_coup_de_grace_legendary"] = "modifier_phantom_assassin_phantom_coup_de_grace_legendary",
	["primal_beast_onslaught_custom"] = "modifier_primal_beast_onslaught_custom_cast",
	["primal_beast_trample_custom"] = "modifier_primal_beast_trample_custom",
}

_G.NoPushSpells = {
	["broodmother_shard_ability_custom"] = 3,
	["item_cyclone_custom"] = 3,
	["item_wind_waker_custom"] = 3,
	["item_sheepstick_custom"] = 3,
}

_G.UnvalidItems = {
	["item_soul_ring_custom"] = true,
	["item_bracer_custom"] = true,
	["item_wraith_band_custom"] = true,
	["item_null_talisman_custom"] = true,
	["item_power_treads"] = true,
	["item_phase_boots_custom"] = true,
	["item_branches"] = true,
	["item_quelling_blade"] = true,
	["item_radiance_custom"] = true,
	["item_bfury"] = true,
	["item_vambrace"] = true,
	["item_havoc_hammer"] = true,
	["item_moon_shard"] = true,
	["item_bottle"] = true,
	["item_bfury_custom"] = true,
	["item_tpscroll_custom"] = true,
	["item_stonefeather_satchel_custom"] = true,
	["item_patrol_necro"] = true,
}

_G.custom_voice = {
	["npc_dota_hero_juggernaut"] = true,
	["npc_dota_hero_phantom_assassin"] = true,
	["npc_dota_hero_legion_commander"] = true,
	["npc_dota_hero_nevermore"] = true,
	["npc_dota_hero_razor"] = true,
	["npc_dota_hero_queenofpain"] = true,
	["npc_dota_hero_skeleton_king"] = true,
	["npc_dota_hero_monkey_king"] = true,
	["npc_dota_hero_zuus"] = true,
	["npc_dota_hero_pudge"] = true,
	["npc_dota_hero_drow_ranger"] = true,
	["npc_dota_hero_skywrath_mage"] = true,
	["npc_dota_hero_antimage"] = true,
	["npc_dota_hero_axe"] = true,
	["npc_dota_hero_ogre_magi"] = true,
	["npc_dota_hero_invoker"] = true,
	["npc_dota_hero_crystal_maiden"] = true,
	["npc_dota_hero_terrorblade"] = true,
	["npc_dota_hero_morphling"] = true,
	["npc_dota_hero_bristleback"] = true,
}

_G.new_talent_system = {
	["npc_dota_hero_skeleton_king"] = 1,
	["npc_dota_hero_zuus"] = 1,
	["npc_dota_hero_morphling"] = 1,
	["npc_dota_hero_abaddon"] = 1,
	["npc_dota_hero_alchemist"] = 1,
	["npc_dota_hero_antimage"] = 1,
	["npc_dota_hero_life_stealer"] = 1,
	["npc_dota_hero_arc_warden"] = 1,
	["npc_dota_hero_axe"] = 1,
	["npc_dota_hero_bane"] = 1,
	["npc_dota_hero_tinker"] = 1,
	["npc_dota_hero_bloodseeker"] = 1,
	["npc_dota_hero_bristleback"] = 1,
	["npc_dota_hero_centaur"] = 1,
	["npc_dota_hero_witch_doctor"] = 1,
	["npc_dota_hero_crystal_maiden"] = 1,
	["npc_dota_hero_drow_ranger"] = 1,
	["npc_dota_hero_ember_spirit"] = 1,
	["npc_dota_hero_nyx_assassin"] = 1,
	["npc_dota_hero_enigma"] = 1,
	["npc_dota_hero_hoodwink"] = 1,
	["npc_dota_hero_huskar"] = 1,
	["npc_dota_hero_broodmother"] = 1,
	["npc_dota_hero_slark"] = 1,
	["npc_dota_hero_invoker"] = 1,
	["npc_dota_hero_juggernaut"] = 1,
	["npc_dota_hero_night_stalker"] = 1,
	["npc_dota_hero_legion_commander"] = 1,
	["npc_dota_hero_leshrac"] = 1,
	["npc_dota_hero_lina"] = 1,
	["npc_dota_hero_marci"] = 1,
	["npc_dota_hero_mars"] = 1,
	["npc_dota_hero_jakiro"] = 1,
	["npc_dota_hero_monkey_king"] = 1,
	["npc_dota_hero_muerta"] = 1,
	["npc_dota_hero_furion"] = 1,
	["npc_dota_hero_ogre_magi"] = 1,
	["npc_dota_hero_pangolier"] = 1,
	["npc_dota_hero_kunkka"] = 1,
	["npc_dota_hero_phantom_assassin"] = 1,
	["npc_dota_hero_primal_beast"] = 1,
	["npc_dota_hero_puck"] = 1,
}

_G.hero_changes = {
	["npc_dota_hero_juggernaut"] = {
		"innate",
		"movespeed",
		"Blade_fury",
		"Healing_Ward",
		"Healing_Ward",
		"Blade_Dance",
		"Omnislash",
		"Scepter",
	},
	["npc_dota_hero_phantom_assassin"] = {
		"innate",
		"stats",
		"stifling",
		"stifling",
		"phantom",
		"phantom",
		"blur",
		"blur",
		"grace",
		"grace",
		"scepter",
	},
	["npc_dota_hero_huskar"] = {
		"innate",
		"movespeed",
		"Inner_Fire",
		"Burning_Spears",
		"Berserkers_Blood",
		"Life_Break",
		"Life_Break",
		"Shard",
	},
	["npc_dota_hero_nevermore"] = { "innate", "Frenzy", "Requiem", "Shard" },
	["npc_dota_hero_legion_commander"] = { "innate", "Odds", "Press", "Moment", "Duel", "Duel", "Duel", "Scepter" },
	["npc_dota_hero_queenofpain"] = { "innate", "movespeed", "Dagger", "Dagger", "Blink", "Sonic", "Scepter" },
	["npc_dota_hero_terrorblade"] = { "Reflection", "Illusion", "Illusion", "Meta", "Sunder", "Shard" },
	["npc_dota_hero_bristleback"] = {
		"innate",
		"movespeed",
		"Goo",
		"Spray",
		"Back",
		"Warpath",
		"Warpath",
		"Warpath",
		"Scepter",
	},
	["npc_dota_hero_puck"] = { "innate", "stats", "movespeed", "Rift", "Shift", "Coil", "Coil", "Scepter" },
	["npc_dota_hero_void_spirit"] = { "movespeed", "Remnant", "Remnant", "Pulse", "Pulse", "Step", "Scepter" },
	["npc_dota_hero_ember_spirit"] = { "innate", "Chain", "Guard", "Guard", "FireRemnant", "Scepter" },
	["npc_dota_hero_pudge"] = { "movespeed", "innate", "Flesh", "Dismember", "Shard", "Scepter" },
	["npc_dota_hero_hoodwink"] = { "innate", "stats", "Acorn", "Bush", "Scurry", "Sharp", "Sharp", "Scepter" },
	["npc_dota_hero_skeleton_king"] = {
		"movespeed",
		"innate",
		"blast",
		"Vampiric",
		"Vampiric",
		"Strike",
		"reincarnation",
		"Scepter",
	},
	["npc_dota_hero_lina"] = { "movespeed", "innate", "dragon", "array", "Soul", "Laguna", "laguna", "Scepter" },
	["npc_dota_hero_troll_warlord"] = { "rage", "axes", "fervor", "trance", "trance", "shard" },
	["npc_dota_hero_axe"] = { "innate", "call", "hunger", "culling", "culling", "Shard" },
	["npc_dota_hero_alchemist"] = { "movespeed", "innate", "Acid", "Unstable", "Corrosive", "Chemical", "Scepter" },
	["npc_dota_hero_ogre_magi"] = {
		"movespeed",
		"stats",
		"innate",
		"Fireblast",
		"Ignite",
		"Bloodlust",
		"Multicast",
		"Scepter",
		"Shard",
	},
	["npc_dota_hero_antimage"] = {
		"innate",
		"Manabreak",
		"Manabreak",
		"antimage_blink",
		"counterspell",
		"manavoid",
		"Scepter",
	},
	["npc_dota_hero_primal_beast"] = {
		"innate",
		"onslaught",
		"onslaught",
		"trample",
		"uproar",
		"uproar",
		"pulverize",
		"Scepter",
	},
	["npc_dota_hero_marci"] = { "innate", "dispose", "rebound", "sidekick", "sidekick", "unleash", "unleash", "Scepter" },
	["npc_dota_hero_templar_assassin"] = { "innate", "Refraction", "Meld", "Psionic", "Psionic", "Scepter" },
	["npc_dota_hero_bloodseeker"] = {
		"movespeed",
		"bloodrage",
		"bloodrite",
		"Thirst",
		"Thirst",
		"Rupture",
		"Rupture",
		"Scepter",
	},
	["npc_dota_hero_monkey_king"] = { "innate", "tree", "tree", "mastery", "mastery", "command", "command", "scepter" },
	["npc_dota_hero_mars"] = { "innate", "Spear", "Spear", "Rebuke", "Bulwark", "Bulwark", "Arena", "Scepter" },
	["npc_dota_hero_zuus"] = { "Armor", "bolt", "jump", "Jump", "Wrath", "Wrath", "Wrath", "Scepter" },
	["npc_dota_hero_leshrac"] = { "innate", "Earth", "Edict", "Storm", "Nova", "Scepter" },
	["npc_dota_hero_crystal_maiden"] = { "innate", "movespeed", "Crystal", "Frostbite", "Arcane", "Freezing", "Scepter" },
	["npc_dota_hero_snapfire"] = {
		"movespeed",
		"Cookie",
		"Cookie",
		"Shredder",
		"Shredder",
		"Kisses",
		"Kisses",
		"Scepter",
	},
	["npc_dota_hero_sven"] = { "innate", "Hammer", "Cleave", "Cry", "God", "God", "Shard" },
	["npc_dota_hero_sniper"] = {
		"Vitality_Booster",
		"Shrapnel",
		"Aim",
		"Assassinate",
		"Assassinate",
		"Assassinate",
		"Scepter",
	},
	["npc_dota_hero_muerta"] = {
		"movespeed",
		"stats",
		"innate",
		"dead",
		"calling",
		"calling",
		"Gun",
		"Veil",
		"Veil",
		"Scepter",
	},
	["npc_dota_hero_pangolier"] = { "innate", "buckle", "Shield", "Lucky", "Rolling", "Rolling", "Scepter" },
	["npc_dota_hero_arc_warden"] = {
		"innate",
		"movespeed",
		"flux",
		"spark",
		"double",
		"double",
		"double",
		"double",
		"Scepter",
	},
	["npc_dota_hero_invoker"] = {
		"innate",
		"movespeed",
		"invoke",
		"invoke",
		"quas",
		"wex",
		"exort",
		"sunstrike",
		"forge",
		"walk",
		"emp",
		"wall",
		"deafing",
		"scepter",
	},
	["npc_dota_hero_razor"] = { "link", "link", "link", "link", "eye", "eye", "scepter" },
	["npc_dota_hero_sand_king"] = { "innate", "movespeed", "sand", "stinger", "epicenter", "Scepter" },
	["npc_dota_hero_furion"] = {
		"movespeed",
		"stats",
		"innate",
		"Sprout",
		"Teleport",
		"Nature_call",
		"Nature_call",
		"nature_wrath",
		"Scepter",
	},
	["npc_dota_hero_abaddon"] = { "Mist", "Aphotic", "Curse", "Borrowed", "Scepter" },
	["npc_dota_hero_drow_ranger"] = { "innate", "gust", "multishot", "marksman", "scepter" },
	["npc_dota_hero_skywrath_mage"] = { "armor", "arcane_bolt", "arcane_bolt", "seal", "flare", "scepter" },
	["npc_dota_hero_slark"] = { "innate", "pact", "essence", "essence", "dance", "scepter" },
	["npc_dota_hero_centaur"] = {
		"innate",
		"movespeed",
		"edge",
		"edge",
		"retaliate",
		"stampede",
		"stampede",
		"Scepter",
	},
	["npc_dota_hero_enigma"] = {
		"innate",
		"movespeed",
		"malefice",
		"conversion",
		"conversion",
		"midnight",
		"blackhole",
		"blackhole",
		"scepter",
	},
	["npc_dota_hero_bane"] = {
		"movespeed",
		"innate",
		"enfeeble",
		"enfeeble",
		"brain",
		"brain",
		"nightmare",
		"nightmare",
		"grip",
		"scepter",
	},
	["npc_dota_hero_morphling"] = { "innate", "stats", "movespeed", "adaptive", "morph", "scepter" },
	["npc_dota_hero_life_stealer"] = { "innate", "lifestealer_rage", "wounds", "ghoul", "infest", "infest", "scepter" },
	["npc_dota_hero_tinker"] = { "innate", "laser", "march", "march", "matrix", "matrix", "rearm", "rearm", "scepter" },
	["npc_dota_hero_witch_doctor"] = {
		"innate",
		"movespeed",
		"cask",
		"cask",
		"voodoo",
		"maledict",
		"deathward",
		"scepter",
	},
	["npc_dota_hero_nyx_assassin"] = { "innate", "impale", "mind", "mind", "carapace", "vendetta", "scepter" },
	["npc_dota_hero_broodmother"] = {
		"innate",
		"insatiable",
		"insatiable",
		"insatiable",
		"bite",
		"spawn",
		"spawn",
		"spawn",
		"scepter",
	},
	["npc_dota_hero_night_stalker"] = {
		"innate",
		"movespeed",
		"void",
		"fear",
		"hunter",
		"dark",
		"dark",
		"dark",
		"scepter",
	},
	["npc_dota_hero_jakiro"] = {
		"stats",
		"innate",
		"innate",
		"dual",
		"path",
		"liquid",
		"macropyre",
		"macropyre",
		"scepter",
	},
	["npc_dota_hero_kunkka"] = {
		"innate",
		"innate",
		"torrent",
		"tidebringer",
		"tidebringer",
		"xmark",
		"xmark",
		"ship",
		"Scepter",
	},
}

_G.no_cleave_mods = {
	"modifier_custom_bristleback_warpath_legendary_crit",
	"modifier_void_spirit_astral_step_attack",
	"modifier_monkey_king_boundless_strike_custom_crit",
	"modifier_mars_gods_rebuke_custom",
}

_G.attack_mods = {
	["general"] = {
		["item_manta_custom_illusion"] = "",
	},
	["npc_dota_hero_phantom_assassin"] = {
		["pa_q"] = "",
		["pa_e3"] = "modifier_phantom_assassin_blur_3",
		["modifier_phantom_assassin_phantom_blur_illusion"] = "modifier_phantom_assassin_blur_7",
	},
	["npc_dota_hero_ember_spirit"] = {
		["modifier_ember_spirit_sleight_of_fist_custom_caster"] = "",
		["modifier_searing_chains_custom_legendary_damage"] = "modifier_ember_chain_7",
	},
	["npc_dota_hero_bristleback"] = {
		["modifier_custom_bristleback_warpath_legendary_crit"] = "modifier_bristle_warpath_7",
		["modifier_bristleback_innate_custom_proc_attack"] = "modifier_bristle_hero_4",
	},
	["npc_dota_hero_juggernaut"] = {
		["modifier_custom_juggernaut_blade_dance_illusion_damage"] = "modifier_juggernaut_bladedance_3",
		["modifier_custom_juggernaut_omnislash_attack"] = "",
	},
	["npc_dota_hero_legion_commander"] = {
		["modifier_moment_of_courage_custom_attack"] = "",
		["modifier_legion_commander_duel_custom_legendary_attack"] = "modifier_legion_duel_7",
	},
	["npc_dota_hero_monkey_king"] = {
		["modifier_monkey_king_boundless_strike_custom_crit"] = "",
		["modifier_monkey_king_wukongs_command_custom_soldier"] = "",
		["monkey_q7"] = "modifier_monkey_king_boundless_7",
		["monkey_e3"] = "modifier_monkey_king_mastery_3",
		["monkey_e7"] = "modifier_monkey_king_mastery_7",
	},
	["npc_dota_hero_sven"] = {
		["modifier_sven_gods_strength_custom_crit"] = "",
		["modifier_sven_great_cleave_custom_legendary"] = "",
	},
	["npc_dota_hero_terrorblade"] = {
		["modifier_terrorblade_conjureimage"] = "",
		["modifier_custom_terrorblade_reflection_unit"] = "",
		["modifier_conjure_image_custom_illusion_basic"] = "",
	},
	["npc_dota_hero_void_spirit"] = {
		["modifier_void_spirit_astral_step_attack"] = "",
		["modifier_custom_void_remnant_legendary_caster"] = "void_spirit_aether_remnant_custom_legendary",
	},
	["npc_dota_hero_skeleton_king"] = {
		["modifier_skeleton_king_vampiric_aura_custom_skeleton_ai"] = "",
	},
	["npc_dota_hero_furion"] = {
		["furion_w3"] = "modifier_furion_teleport_3",
		["modifier_furion_force_of_nature_custom"] = "",
	},
	["npc_dota_hero_mars"] = {
		["modifier_mars_gods_rebuke_custom"] = "",
		["modifier_mars_bulwark_custom_idle"] = "",
		["mars_e3"] = "modifier_mars_bulwark_3",
		["mars_e7"] = "modifier_mars_bulwark_7",
	},
	["npc_dota_hero_pangolier"] = {
		["pangolier_q"] = "pangolier_swashbuckle_custom",
		["pangolier_r"] = "pangolier_gyroshell_custom",
		["modifier_pangolier_swashbuckle_custom_scepter"] = "",
		["modifier_pangolier_innate_custom_damage"] = "",
	},
	["npc_dota_hero_puck"] = {
		["puck_shift"] = "custom_puck_phase_shift",
		["puck_r3"] = "modifier_puck_coil_3",
		["puck_r7"] = "modifier_puck_coil_7",
	},
	["npc_dota_hero_hoodwink"] = {
		["modifier_hoodwink_acorn_shot_custom"] = "",
		["modifier_hoodwink_scurry_custom_attack_mod"] = "modifier_hoodwink_scurry_3",
	},
	["npc_dota_hero_invoker"] = {
		["modifier_forged_spirit_melting_strike_custom_range"] = "",
		["modifier_invoker_emp_custom_legendary_damage"] = "modifier_invoker_wex_7",
		["modifier_invoker_exort_custom_attack"] = "modifier_invoker_exort_3",
	},
	["npc_dota_hero_marci"] = {
		["marci_e7"] = "modifier_marci_sidekick_7",
	},
	["npc_dota_hero_sand_king"] = {
		["modifier_sandking_burrowstrike_custom_legendary"] = "",
		["modifier_sandking_scorpion_strike_custom_damage"] = "",
	},
	["npc_dota_hero_razor"] = {
		["modifier_razor_static_link_custom_attacking"] = "",
		["modifier_razor_static_link_custom_legendary"] = "modifier_razor_link_7",
		["modifier_razor_eye_of_the_storm_custom_attack_proc"] = "modifier_razor_eye_4",
	},
	["npc_dota_hero_abaddon"] = {
		["modifier_abaddon_frostmourne_custom_illusion"] = "modifier_abaddon_curse_3",
		["modifier_abaddon_death_coil_custom_scepter_proc"] = "scepter",
		["modifier_abaddon_borrowed_time_custom_proc_attack"] = "modifier_abaddon_borrowed_3",
	},
	["npc_dota_hero_antimage"] = {
		["modifier_antimage_blink_custom_illusion"] = "modifier_antimage_blink_3",
	},
	["npc_dota_hero_sniper"] = {
		["modifier_sniper_take_aim_custom_active"] = "modifier_sniper_aim_7",
		["modifier_sniper_take_aim_custom_legendary_damage"] = "modifier_sniper_aim_7",
		["modifier_sniper_assassinate_custom_attack_damage"] = "",
	},
	["npc_dota_hero_arc_warden"] = {
		["modifier_arc_warden_tempest_double_custom_auto_damage"] = "modifier_arc_warden_double_3",
		["modifier_arc_warden_magnetic_field_custom_legendary_illusion"] = "modifier_arc_warden_field_7",
		["modifier_arc_warden_tempest_double_custom"] = "",
	},
	["npc_dota_hero_muerta"] = {
		["muerta_e"] = "muerta_gunslinger_custom",
	},
	["npc_dota_hero_drow_ranger"] = {
		["modifier_drow_ranger_frost_arrows_custom_attack_damage"] = "modifier_drow_frost_3",
		["modifier_drow_ranger_frost_arrows_custom_legendary_damage"] = "modifier_drow_frost_7",
	},
	["npc_dota_hero_slark"] = {
		["modifier_slark_innate_custom_double_attack"] = "modifier_slark_essence_3",
	},
	["npc_dota_hero_centaur"] = {
		["modifier_centaur_stampede_custom_legendary_damage"] = "",
	},
	["npc_dota_hero_lina"] = {
		["lina_e7"] = "modifier_lina_soul_7",
		["lina_w3"] = "modifier_lina_array_3",
	},
	["npc_dota_hero_enigma"] = {
		["modifier_enigma_demonic_conversion_custom"] = "",
	},
	["npc_dota_hero_troll_warlord"] = {
		["modifier_troll_warlord_berserkers_rage_custom_proc_damage"] = "modifier_troll_rage_4",
	},
	["npc_dota_hero_bane"] = {
		["modifier_bane_nightmare_custom_attack"] = "modifier_bane_nightmare_3",
	},
	["npc_dota_hero_zuus"] = {
		["modifier_zuus_heavenly_jump_custom_attacks_caster"] = "modifier_zuus_jump_1",
		["modifier_zuus_arc_lightning_custom_legendary_damage"] = "",
	},
	["npc_dota_hero_morphling"] = {
		["modifier_morphling_morph_custom_double_damage"] = "modifier_morphling_attribute_3",
		["modifier_morphling_replicate_custom_attack_proc_damage"] = "modifier_morphling_morph_7",
	},
	["npc_dota_hero_life_stealer"] = {
		["modifier_life_stealer_infest_custom"] = "",
		["modifier_life_stealer_feast_custom_double_damage"] = "modifier_lifestealer_ghoul_3",
	},
	["npc_dota_hero_axe"] = {
		["modifier_axe_culling_blade_custom_legendary_attacks"] = "modifier_axe_culling_7",
		["modifier_axe_berserkers_call_custom_legendary_attack"] = "modifier_axe_call_7",
	},
	["npc_dota_hero_bloodseeker"] = {
		["modifier_bloodseeker_thirst_custom_legendary_attack_damage"] = "modifier_bloodseeker_thirst_7",
	},
	["npc_dota_hero_witch_doctor"] = {
		["modifier_witch_doctor_death_ward_custom_unit"] = "",
	},
	["npc_dota_hero_tinker"] = {
		["modifier_tinker_march_of_the_machines_custom_attack_damage"] = "modifier_tinker_march_3",
		["modifier_tinker_march_of_the_machines_custom_legendary_crit"] = "modifier_tinker_march_7",
	},
	["npc_dota_hero_crystal_maiden"] = {
		["modifier_crystal_maiden_arcane_aura_custom_clone_attack"] = "modifier_maiden_arcane_3",
	},
	["npc_dota_hero_nyx_assassin"] = {
		["modifier_nyx_assassin_spiked_carapace_custom_attack"] = "modifier_nyx_carapace_3",
		["modifier_nyx_assassin_vendetta_custom_scarab"] = "modifier_nyx_vendetta_3",
	},
	["npc_dota_hero_broodmother"] = {
		["modifier_broodmother_spawn_spiderlings_custom_spider"] = "",
		["modifier_broodmother_innate_custom_attack"] = "modifier_broodmother_hero_6",
	},
	["npc_dota_hero_huskar"] = {
		["modifier_custom_huskar_burning_spear_double_damage"] = "modifier_huskar_spears_3",
	},
	["npc_dota_hero_night_stalker"] = {
		["modifier_night_stalker_darkness_custom_legendary_dash"] = "",
		["modifier_night_stalker_midnight_feast_custom_double_damage"] = "modifier_stalker_hunter_3",
	},
	["npc_dota_hero_leshrac"] = {
		["leshrac_q7"] = "modifier_leshrac_earth_7",
	},
	["npc_dota_hero_jakiro"] = {
		["jakiro_w3"] = "modifier_jakiro_path_3",
	},
	["npc_dota_hero_ogre_magi"] = {
		["ogre_scepter"] = "Scepter",
	},
	["npc_dota_hero_kunkka"] = {
		["kunkka_s8"] = "modifier_kunkka_shop_8",
		["kunkka_s9"] = "modifier_kunkka_shop_9",
		["kunkka_w7"] = "modifier_kunkka_tidebringer_7",
	},
	["npc_dota_hero_primal_beast"] = {
		["beast_q7"] = "modifier_primal_beast_onslaught_7",
		["beast_scepter"] = "Scepter",
	},
}

_G.auto_cast_spells = {
	["snapfire_scatterblast_custom"] = "modifier_snapfire_scatterblast_custom_reverse",
	["centaur_double_edge_custom"] = "modifier_centaur_double_edge_custom_silence_ready",
	["templar_assassin_meld_custom"] = "modifier_templar_assassin_meld_custom_toggle",
	["custom_terrorblade_reflection"] = "modifier_custom_terrorblade_reflection_legendary_autocast",
	["troll_warlord_battle_trance_custom"] = "modifier_troll_warlord_battle_trance_custom_legendary",
	["zuus_arc_lightning_custom"] = "modifier_zuus_arc_lightning_custom_legendary_cast",
	["morphling_replicate_custom"] = "modifier_morphling_replicate_custom_scepter_autocast",
	["life_stealer_infest_custom_legendary"] = "modifier_life_stealer_infest_custom_legendary_autocast",
	["tinker_rearm_custom"] = "modifier_tinker_rearm_custom_auto_cast",
	["bristleback_quill_spray_custom"] = "modifier_custom_bristleback_quill_spray_autocast",
	["nyx_assassin_jolt_custom"] = { "modifier_nyx_assassin_jolt_custom_legendary_toggle", true },
	["nyx_assassin_jolt_custom_legendary"] = { "modifier_nyx_assassin_jolt_custom_legendary_toggle", true },
	["enigma_demonic_conversion_custom"] = { "modifier_enigma_demonic_conversion_custom_teleport" },
	["furion_innate_custom"] = { "modifier_furion_innate_custom_toggle", true },
	["furion_wrath_of_nature_custom"] = { "modifier_furion_innate_custom_toggle", true },
	["custom_puck_phase_shift"] = "modifier_custom_puck_phase_shift_autocast",
}

_G.all_heroes = {
	"npc_dota_hero_juggernaut",
	"npc_dota_hero_phantom_assassin",
	"npc_dota_hero_huskar",
	"npc_dota_hero_nevermore",
	"npc_dota_hero_queenofpain",
	"npc_dota_hero_legion_commander",
	"npc_dota_hero_bristleback",
	"npc_dota_hero_terrorblade",
	"npc_dota_hero_puck",
	"npc_dota_hero_void_spirit",
	"npc_dota_hero_ember_spirit",
	"npc_dota_hero_pudge",
	"npc_dota_hero_hoodwink",
	"npc_dota_hero_skeleton_king",
	"npc_dota_hero_lina",
	"npc_dota_hero_troll_warlord",
	"npc_dota_hero_axe",
	"npc_dota_hero_alchemist",
	"npc_dota_hero_ogre_magi",
	"npc_dota_hero_antimage",
	"npc_dota_hero_primal_beast",
	"npc_dota_hero_marci",
	"npc_dota_hero_templar_assassin",
	"npc_dota_hero_bloodseeker",
	"npc_dota_hero_monkey_king",
	"npc_dota_hero_mars",
	"npc_dota_hero_zuus",
	"npc_dota_hero_leshrac",
	"npc_dota_hero_crystal_maiden",
	"npc_dota_hero_snapfire",
	"npc_dota_hero_sven",
	"npc_dota_hero_sniper",
	"npc_dota_hero_muerta",
	"npc_dota_hero_pangolier",
	"npc_dota_hero_arc_warden",
	"npc_dota_hero_invoker",
	"npc_dota_hero_razor",
	"npc_dota_hero_sand_king",
	"npc_dota_hero_furion",
	"npc_dota_hero_abaddon",
	"npc_dota_hero_drow_ranger",
	"npc_dota_hero_skywrath_mage",
	"npc_dota_hero_slark",
	"npc_dota_hero_centaur",
	"npc_dota_hero_enigma",
	"npc_dota_hero_bane",
	"npc_dota_hero_morphling",
	"npc_dota_hero_life_stealer",
	"npc_dota_hero_tinker",
	"npc_dota_hero_witch_doctor",
	"npc_dota_hero_nyx_assassin",
	"npc_dota_hero_broodmother",
	"npc_dota_hero_night_stalker",
	"npc_dota_hero_jakiro",
	"npc_dota_hero_kunkka",
}

dota1x6.patrol_data = {
	[1] = {
		teams = { 2, 7 },
		side = 0,
		current_team = 1,
	},
	[2] = {
		teams = { 9, 3 },
		side = 1,
		current_team = 1,
	},
	[3] = {
		teams = { 8, 6 },
		side = 1,
		current_team = 1,
	},
	["mid"] = {
		side = 0,
	},
}

dota1x6.duel_arenas = {
	[1] = {
		height = 300,
		radius = 1600,
		sides = { 0, 0, 0 },
		teams = { 2, 7 },
	},
	[2] = {
		height = 300,
		radius = 1600,
		sides = { 1, 1, 1 },
		teams = { 3, 9 },
	},
	[3] = {

		height = 300,
		radius = 1600,
		sides = { 0, 1, 1 },
		teams = { 6, 8 },
	},
}

if not IsSoloMode() then
	dota1x6.duel_arenas = {
		[1] = {
			height = 120,
			radius = 1300,
			teams = { 2, 6 },
		},
		[2] = {
			height = 120,
			radius = 1300,
			teams = { 3, 7 },
		},
	}
	dota1x6.patrol_data = {
		[1] = {
			teams = { 6, 2 },
			side = 0,
			current_team = 2,
		},
		[2] = {
			teams = { 3, 7 },
			side = 1,
			current_team = 2,
		},
	}
end

function dota1x6:IsSphere(item)
	if
		item:GetName() == "item_legendary_upgrade"
		or item:GetName() == "item_gray_upgrade"
		or item:GetName() == "item_blue_upgrade"
		or item:GetName() == "item_purple_upgrade_shop"
		or item:GetName() == "item_alchemist_recipe"
		or item:GetName() == "item_purple_upgrade"
	then
		return true
	end
	return false
end

function dota1x6:IsPatrol(name)
	if
		name == "patrol_melee_good"
		or name == "patrol_range_good"
		or name == "patrol_melee_bad"
		or name == "patrol_range_bad"
	then
		return true
	end

	return false
end

_G.RemoveForDuel = {
	["modifier_smoke_of_deceit"] = true,
	["modifier_item_revenants_brooch_counter"] = true,
	["modifier_sven_gods_strength"] = true,
}

_G.GoldK = 0.8
_G.ExpK = 0.7

_G.CreepsUpgradeHealth = 10
_G.CreepsUpgradeDamage = 10

_G.CreepsStats = {
	["npc_dota_neutral_kobold"] = { damage = 10, health = 170, exp = 20, gold = 5, blue = 2 },
	["npc_dota_neutral_kobold_tunneler"] = { damage = 11, health = 230, exp = 40, gold = 11, blue = 2 },
	["npc_dota_neutral_kobold_taskmaster"] = { damage = 12, health = 325, exp = 80, gold = 21, blue = 4 },

	["npc_dota_neutral_forest_troll_berserker"] = { damage = 23, health = 375, exp = 50, gold = 13, blue = 4 },
	["npc_dota_neutral_forest_troll_high_priest"] = { damage = 7, health = 325, exp = 80, gold = 21, blue = 4 },

	["npc_dota_neutral_harpy_scout"] = { damage = 14, health = 300, exp = 50, gold = 14, blue = 4 },
	["npc_dota_neutral_harpy_storm"] = { damage = 17, health = 500, exp = 80, gold = 18, blue = 4 },

	["npc_dota_neutral_gnoll_assassin"] = { damage = 20, health = 370, exp = 60, gold = 16, blue = 4 },

	["npc_dota_neutral_ghost"] = { damage = 22, health = 400, exp = 80, gold = 17, blue = 4 },
	["npc_dota_neutral_fel_beast"] = { damage = 14, health = 325, exp = 50, gold = 15, blue = 4 },

	["npc_dota_neutral_centaur_outrunner"] = { damage = 50, health = 1050, exp = 84, gold = 50, blue = 7 },

	["npc_dota_neutral_alpha_wolf"] = { damage = 40, health = 750, exp = 100, gold = 42, blue = 8 },
	["npc_dota_neutral_giant_wolf"] = { damage = 30, health = 500, exp = 65, gold = 25, blue = 4 },

	["npc_dota_neutral_satyr_soulstealer"] = { damage = 25, health = 550, exp = 70, gold = 30, blue = 4 },
	["npc_dota_neutral_satyr_trickster"] = { damage = 25, health = 450, exp = 45, gold = 14, blue = 4 },

	["npc_dota_neutral_mud_golem"] = { damage = 50, health = 500, exp = 60, gold = 21, blue = 4 },
	["npc_dota_neutral_mud_golem_split"] = { damage = 25, health = 200, exp = 28, gold = 11, blue = 2 },

	["npc_dota_neutral_ogre_magi"] = { damage = 25, health = 700, exp = 90, gold = 43, blue = 6 },
	["npc_dota_neutral_ogre_mauler"] = { damage = 50, health = 550, exp = 70, gold = 25, blue = 5 },

	["npc_dota_neutral_polar_furbolg_ursa_warrior"] = { damage = 80, health = 1400, exp = 174, gold = 68, blue = 12 },
	["npc_dota_neutral_polar_furbolg_champion"] = { damage = 50, health = 1050, exp = 140, gold = 61, blue = 11 },

	["npc_dota_neutral_satyr_hellcaller"] = { damage = 95, health = 1800, exp = 199, gold = 85, blue = 15 },

	["npc_dota_neutral_centaur_khan"] = { damage = 40, health = 500, exp = 146, gold = 42, blue = 9 },

	["npc_dota_neutral_wildkin"] = { damage = 40, health = 650, exp = 70, gold = 38, blue = 5 },
	["npc_dota_neutral_enraged_wildkin"] = { damage = 60, health = 1300, exp = 174, gold = 51, blue = 13 },

	["npc_dota_neutral_dark_troll"] = { damage = 50, health = 600, exp = 96, gold = 38, blue = 5 },
	["npc_dota_neutral_dark_troll_warlord"] = { damage = 40, health = 1650, exp = 122, gold = 51, blue = 13 },
	["npc_dota_dark_troll_warlord_skeleton_warrior"] = { damage = 15, health = 300, exp = 0, gold = 5, blue = 0 },

	["npc_dota_neutral_warpine_raider"] = { damage = 70, health = 1400, exp = 157, gold = 63, blue = 11.5 },

	["npc_dota_neutral_black_dragon"] = { damage = 69, health = 2200, exp = 188, gold = 85, blue = 15 },
	["npc_dota_neutral_black_drake"] = { damage = 60, health = 1700, exp = 131, gold = 64, blue = 10 },

	["npc_dota_neutral_granite_golem"] = { damage = 134, health = 2640, exp = 225, gold = 85, blue = 15 },
	["npc_dota_neutral_rock_golem"] = { damage = 89, health = 2040, exp = 112, gold = 64, blue = 10 },

	["npc_dota_neutral_big_thunder_lizard"] = { damage = 32, health = 2200, exp = 188, gold = 85, blue = 15 },
	["npc_dota_neutral_small_thunder_lizard"] = { damage = 134, health = 1700, exp = 131, gold = 64, blue = 10 },

	["npc_dota_neutral_ice_shaman"] = { damage = 26, health = 2200, exp = 188, gold = 85, blue = 15 },
	["npc_dota_neutral_frostbitten_golem"] = { damage = 109, health = 1700, exp = 131, gold = 64, blue = 10 },

	["npc_dota_neutral_prowler_shaman"] = { damage = 89, health = 2200, exp = 188, gold = 85, blue = 15 },
	["npc_dota_neutral_prowler_acolyte"] = { damage = 89, health = 1700, exp = 131, gold = 64, blue = 10 },

	["npc_dota_neutral_tadpole"] = { damage = 16, health = 320, exp = 60, gold = 16, blue = 4 },

	["npc_dota_neutral_froglet"] = { damage = 35, health = 535, exp = 65, gold = 25, blue = 4, level = 1 },
	["npc_dota_neutral_froglet_mage"] = { damage = 35, health = 535, exp = 100, gold = 40, blue = 8, level = 1 },

	["npc_dota_neutral_grown_frog"] = { damage = 46, health = 800, exp = 96, gold = 38, blue = 5, level = 2 },
	["npc_dota_neutral_grown_frog_mage"] = { damage = 46, health = 800, exp = 122, gold = 51, blue = 13, level = 2 },

	["npc_dota_neutral_ancient_frog"] = { damage = 93, health = 1493, exp = 131, gold = 64, blue = 10, level = 3 },
	["npc_dota_neutral_ancient_frog_mage"] = { damage = 93, health = 1493, exp = 188, gold = 85, blue = 15, level = 3 },

	["npc_muerta_ursa"] = { damage = 30, health = 900, exp = 200, gold = 600, blue = 50, no_upgrade = 1 },
	["npc_muerta_satyr"] = { damage = 38, health = 900, exp = 200, gold = 600, blue = 50, no_upgrade = 1 },
	["npc_muerta_centaur"] = { damage = 55, health = 900, exp = 200, gold = 600, blue = 50, no_upgrade = 1 },
	["npc_muerta_ogre"] = { damage = 55, health = 900, exp = 200, gold = 600, blue = 50, no_upgrade = 1 },
}

_G.Shared_Bounty = {

	["npc_filler_dire_stun"] = {
		blue = 40,
		gold = 400,
	},
	["npc_filler_dire_plasma"] = {
		blue = 40,
		gold = 400,
	},
	["npc_filler_dire_resist"] = {
		blue = 40,
		gold = 400,
	},
	["npc_filler_radiant_stun"] = {
		blue = 40,
		gold = 400,
	},
	["npc_filler_radiant_plasma"] = {
		blue = 40,
		gold = 400,
	},
	["npc_filler_radiant_resist"] = {
		blue = 40,
		gold = 400,
	},

	["patrol_melee_good"] = {
		blue = 7,
		gold = 50,
	},
	["patrol_range_good"] = {
		blue = 7,
		gold = 50,
	},
	["patrol_melee_bad"] = {
		blue = 7,
		gold = 50,
	},
	["patrol_range_bad"] = {
		blue = 7,
		gold = 50,
	},
	["npc_dota_tormentor_custom"] = {
		blue = 20,
	},
}

_G.team_color = {
	[2] = { 101, 183, 235 },
	[3] = { 254, 138, 24 },
	[6] = { 125, 232, 144 },
	[7] = { 227, 61, 227 },
	[12] = { 255, 158, 158 },
	[9] = { 222, 209, 35 },
}

_G.wave_types = {
	[1] = {
		["creeps"] = { "npc_kobold", "npc_kobold", "npc_kobold", "npc_kobold_t", "npc_kobold_t", "npc_kobold_m" },
		["skills"] = {},
		["creeps_type"] = 0,
		["mkb"] = 1,
	},
	[2] = {
		["creeps"] = { "npc_treant", "npc_treant", "npc_treant", "npc_treant_b" },
		["skills"] = { "npc_treant_passive", "npc_treant_seed" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[3] = {
		["creeps"] = { "npc_skelet", "npc_skelet", "npc_skelet", "npc_skelet_a" },
		["skills"] = { "npc_skelet_aura", "npc_skelet_tomb" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[4] = {
		["creeps"] = { "npc_wolf", "npc_wolf", "npc_wolf_a", "npc_wolf" },
		["skills"] = { "npc_wolf_howl", "npc_wolf_feral" },
		["creeps_type"] = 1,
		["mkb"] = 1,
	},
	[5] = {
		["creeps"] = { "npc_boar_a", "npc_boar2", "npc_boar" },
		["skills"] = { "npc_boar_spit", "npc_boar_slow" },
		["creeps_type"] = 0,
		["mkb"] = 1,
	},
	[6] = {
		["creeps"] = {
			"npc_megacreep_good",
			"npc_megacreep_good",
			"npc_megacreep_good",
			"npc_megacreep_good",
			"npc_megacreep_good",
			"npc_megacreep_good_a",
		},
		["skills"] = { "npc_megacreep_upgrade" },
		["creeps_type"] = 0,
		["mkb"] = 1,
	},
	[7] = {
		["creeps"] = {
			"npc_megacreep_bad",
			"npc_megacreep_bad",
			"npc_megacreep_bad",
			"npc_megacreep_bad",
			"npc_megacreep_bad",
			"npc_megacreep_bad_a",
		},
		["skills"] = { "npc_megacreep_debuf" },
		["creeps_type"] = 0,
		["mkb"] = 1,
	},
	[8] = {
		["creeps"] = {
			"npc_golem_large",
			"npc_golem_medium",
			"npc_golem_medium",
			"npc_golem_small",
			"npc_golem_small",
			"npc_golem_small",
			"npc_golem_small",
		},
		["skills"] = { "golem_double", "npc_golem_passive" },
		["creeps_type"] = 0,
		["mkb"] = 0,
	},
	[9] = {
		["creeps"] = { "npc_troll" },
		["skills"] = { "npc_troll_summon", "npc_troll_skelet_heal" },
		["creeps_type"] = 1,
		["mkb"] = 1,
	},
	[10] = {
		["creeps"] = { "npc_rogue", "npc_warrior", "npc_archer" },
		["skills"] = { "npc_rogue_passive", "npc_warrior_passive", "npc_archer_silence" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[11] = {
		["creeps"] = { "npc_tusk", "npc_tusk", "npc_tusk", "npc_tusk_a", "npc_tusk_a", "npc_tusk_a" },
		["skills"] = { "npc_tusk_passive", "npc_tusk_ghost_passive" },
		["creeps_type"] = 0,
		["mkb"] = 1,
	},
	[12] = {
		["creeps"] = { "npc_ogre", "npc_ogre_a", "npc_ogre_a", "npc_ogre_a", "npc_ogre_b" },
		["skills"] = { "npc_ogre_root", "npc_ogre_stun" },
		["creeps_type"] = 0,
		["mkb"] = 0,
	},
	[13] = {
		["creeps"] = { "npc_werewolf", "npc_werewolf", "npc_werewolf_a", "npc_werewolf_a" },
		["skills"] = { "npc_werewolf_bloodrage", "npc_werewolf_rupture" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[14] = {
		["creeps"] = { "npc_cone", "npc_cone", "npc_cone", "npc_cone" },
		["skills"] = { "npc_cone_armor" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[15] = {
		["creeps"] = { "npc_satyr", "npc_satyr_a", "npc_satyr_b", "npc_satyr_b" },
		["skills"] = { "npc_satyr_aura", "npc_satyr_purge", "npc_satyr_manaburn" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[16] = {
		["creeps"] = { "npc_spider", "npc_spider_a", "npc_spider_a" },
		["skills"] = { "npc_spider_toxin", "npc_spider_passive", "npc_spider_poison" },
		["creeps_type"] = 1,
		["mkb"] = 1,
	},
	[17] = {
		["creeps"] = { "npc_badsiege", "npc_badsiege", "npc_badsiege_a", "npc_badsiege_a" },
		["skills"] = { "npc_siege_passive", "npc_siege_melting" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[18] = {
		["creeps"] = { "npc_goodsiege", "npc_goodsiege", "npc_goodsiege_a", "npc_goodsiege_a" },
		["skills"] = { "npc_siege_passive", "npc_siege_armor" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[19] = {
		["creeps"] = { "npc_slardar", "npc_slardar", "npc_slardar", "npc_slardar_a" },
		["skills"] = { "npc_slardar_armor", "npc_slardar_stun" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[20] = {
		["creeps"] = { "npc_tombgolem", "npc_tombgolem" },
		["skills"] = { "npc_golem_decay", "npc_zombie_attack" },
		["creeps_type"] = 0,
		["mkb"] = 0,
	},
	[21] = {
		["creeps"] = { "npc_ancient_satyr", "npc_ancient_satyr", "npc_ancient_satyr_a", "npc_ancient_satyr_a" },
		["skills"] = { "npc_satyr_stomp", "npc_satyr_root" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[22] = {
		["creeps"] = { "npc_arc", "npc_arc", "npc_arc_a" },
		["skills"] = { "npc_arc_field", "npc_arc_knockback" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[23] = {
		["creeps"] = { "npc_techies", "npc_techies", "npc_techies" },
		["skills"] = { "npc_techies_bomb", "npc_techies_death" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[24] = {
		["creeps"] = { "npc_huskar", "npc_huskar", "npc_dazzle", "npc_dazzle" },
		["skills"] = { "npc_huskar_lowhp", "npc_dazzle_grave" },
		["creeps_type"] = 1,
		["mkb"] = 1,
	},
	[25] = {
		["creeps"] = { "npc_abbadon", "npc_abbadon_a", "npc_abbadon_a", "npc_abbadon_a" },
		["skills"] = { "npc_abbadon_ulti", "npc_abbadon_silence", "npc_abbadon_proc" },
		["creeps_type"] = 1,
		["mkb"] = 1,
	},
	[26] = {
		["creeps"] = { "npc_warlock" },
		["skills"] = {
			"warlock_boss_golem_fists_passive",
			"warlock_boss_rain_of_chaos",
			"warlock_boss_shadow_word",
			"warlock_boss_upheaval",
		},
		["creeps_type"] = 2,
		["mkb"] = 1,
	},
	[27] = {
		["creeps"] = { "npc_lich" },
		["skills"] = { "npc_lich_blast", "npc_lich_ice", "npc_lich_ulti", "npc_lich_frostbite" },
		["creeps_type"] = 2,
		["mkb"] = 1,
	},
	[28] = {
		["creeps"] = { "npc_enigma" },
		["skills"] = {
			"enigma_boss_midnight_custom",
			"enigma_boss_black_hole_custom",
			"enigma_boss_summon_custom",
			"enigma_boss_malefice_custom",
		},
		["creeps_type"] = 2,
		["mkb"] = 1,
	},
	[29] = {
		["creeps"] = { "npc_centaur", "npc_centaur", "npc_centaur", "npc_centaur_a" },
		["skills"] = { "npc_centaur_stun", "npc_centaur_double" },
		["creeps_type"] = 1,
		["mkb"] = 1,
	},
	[30] = {
		["creeps"] = { "npc_silencer", "npc_silencer", "npc_antimage", "npc_antimage" },
		["skills"] = { "npc_silencer_lastword", "npc_antimage_burn", "npc_antimage_resist" },
		["creeps_type"] = 1,
		["mkb"] = 0,
	},
	[31] = {
		["creeps"] = { "npc_frostbitten", "npc_frostbitten", "npc_frostbitten_a", "npc_frostbitten_a" },
		["skills"] = { "npc_frostbitten_spam", "npc_frostbitten_heal" },
		["creeps_type"] = 0,
		["mkb"] = 0,
	},
}

_G.necro_wave_info = {
	"npc_necro_melle",
	"npc_necro_range",
}

_G.particle_attach = {
	["point_follow"] = PATTACH_POINT_FOLLOW,
	["worldorigin"] = PATTACH_WORLDORIGIN,
	["absorigin_follow"] = PATTACH_ABSORIGIN_FOLLOW,
	["customorigin"] = PATTACH_CUSTOMORIGIN,
	["absorigin"] = PATTACH_ABSORIGIN,
	["renderorigin_follow"] = PATTACH_RENDERORIGIN_FOLLOW,
	["customorigin_follow"] = PATTACH_CUSTOMORIGIN_FOLLOW,
}