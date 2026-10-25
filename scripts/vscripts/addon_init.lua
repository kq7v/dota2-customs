--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


require("utils/encryption")
require("utils/maps")
if IsClient() then
	require("utils/function_client")
end
LinkLuaModifier("modifier_pve_test_woda", "modifiers/modifier_pve_test_woda", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_stunned", "modifiers/modifier_woda_stunned", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_disconnect_player_no_damage",
	"modifiers/modifier_disconnect_player_no_damage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_wodawispdeath", "modifiers/modifier_wodawispdeath", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_vengefulspirit_magic_missile_custom_stack",
	"heroes/npc_dota_hero_vengefulspirit_custom/vengefulspirit_magic_missile_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_disruptor_glimpse_custom_movement_check_aura",
	"heroes/npc_dota_hero_disruptor_custom/disruptor_glimpse_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_disruptor_glimpse_custom",
	"heroes/npc_dota_hero_disruptor_custom/disruptor_glimpse_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_meepo_boss_h", "modifiers/modifier_meepo_boss_h", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodacreepchampionred", "modifiers/modifier_wodacreepchampion", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodacreepchampion", "modifiers/modifier_wodacreepchampion", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodawisp", "modifiers/modifier_wodawisp", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodarelax", "modifiers/modifier_wodarelax", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodarelax_invul", "modifiers/modifier_wodarelax", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodacamp", "modifiers/modifier_wodacamp", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodaduel1", "modifiers/modifier_wodaduel1", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodaduel_duo", "modifiers/modifier_wodaduel_duo", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodaduel2", "modifiers/modifier_wodaduel2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_ability_filler_woda", "shrine/ability_filler_woda", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodapig", "modifiers/modifier_wodapig", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodafrog", "modifiers/modifier_wodafrog", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodahunt", "modifiers/modifier_wodahunt", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_boss_bar", "modifiers/modifier_woda_boss_bar", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_boss_bar_pve", "modifiers/modifier_woda_boss_bar_pve", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodaduel_boss_pve", "modifiers/modifier_wodaduel_boss_pve", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wodaduel_boss_pve_end", "modifiers/modifier_wodaduel_boss_pve", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_wodaduel_boss_multiplier",
	"modifiers/modifier_wodaduel_boss_multiplier",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_pve_creep_timeout",
	"modifiers/modifier_woda_pve_creep_timeout",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_pve_creep_timeout_cooldown",
	"modifiers/modifier_woda_pve_creep_timeout",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_pve_creep_timeout_manacost",
	"modifiers/modifier_woda_pve_creep_timeout",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_pve_creep_upgrade_wave",
	"modifiers/modifier_woda_pve_creep_timeout",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_aegis_arena_pve", "modifiers/modifier_aegis_arena_pve", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("capture_point_area", "modifiers/capture_point_area", LUA_MODIFIER_MOTION_BOTH)
LinkLuaModifier("modifier_disconnect_player", "modifiers/modifier_disconnect_player", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_donate_pet", "modifiers/modifier_donate_pet", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_hero_level_upgrade_damage",
	"modifiers/modifier_hero_level_upgrade_damage",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_wisp_start_arena_stunned",
	"modifiers/modifier_wisp_start_arena_stunned",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_woda_illusion", "modifiers/modifier_woda_illusion", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_handler_player", "modifiers/modifier_woda_handler_player", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_solar_crest_armor_addition_custom",
	"items/modifier_item_solar_crest_armor_addition_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_crimson_guard_extra_custom",
	"items/modifier_item_crimson_guard_extra_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_invisible_truesight_pet_custom",
	"modifiers/modifier_invisible_truesight_pet_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_woda_emblem", "modifiers/modifier_woda_emblem", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_emblem_head", "modifiers/modifier_woda_emblem_head", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_upgrade_backpack", "modifiers/modifier_woda_upgrade_backpack", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_woda_upgrade_auto_midas",
	"modifiers/modifier_woda_upgrade_auto_midas",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_woda_arena_curse_armor", "modifiers/modifier_woda_arena_curse", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_arena_curse_magic", "modifiers/modifier_woda_arena_curse", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_smelter_bonus", "modifiers/modifier_woda_smelter_bonus", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_items_bonus", "modifiers/modifier_woda_items_bonus", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_hero_level_bonus", "modifiers/modifier_woda_hero_level_bonus", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_book_str", "items/item_book_str", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_book_agi", "items/item_book_agi", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_book_int", "items/item_book_int", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_bog", "modifiers/modifier_woda_bog", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_events_thinker_woda", "modifiers/modifier_events_thinker_woda", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_minimap_hidden", "modifiers/modifier_minimap_hidden", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_woda_minimap_out", "modifiers/modifier_woda_minimap_out", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_boss_low_health", "modifiers/modifier_boss_low_health", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_boss_low_health_buff", "modifiers/modifier_boss_low_health", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_teleport_fx_client", "modifiers/modifier_teleport_fx_client", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_faceless_void_11_buff",
	"modifiers/talents/npc_dota_hero_faceless_void/modifier_faceless_void_11",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_test_custom", "modifiers/modifier_test_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_woda_cheat_invulnerable",
	"modifiers/modifier_woda_cheat_invulnerable",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_woda_reduction_ignore", "modifiers/modifier_woda_reduction_ignore", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_woda_pve_difficulty_reduction_ignore",
	"modifiers/modifier_woda_pve_difficulty_reduction_ignore",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_6",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_13",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_23",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_25",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_30",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_33",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_34",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_effect_35",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_fountain",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_fountain_aura",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_woda_arena_room_burn", "modifiers/modifier_woda_arena_room_effect", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_woda_arena_room_burning",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_hazard_source",
	"modifiers/modifier_woda_arena_room_effect",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_rewards",
	"modifiers/modifier_woda_arena_room_rewards",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_accuracy",
	"modifiers/modifier_woda_arena_room_hazards",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_portal",
	"modifiers/modifier_woda_arena_room_hazards",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_room_portal_debuff",
	"modifiers/modifier_woda_arena_room_hazards",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_spidersack",
	"modifiers/modifier_woda_arena_room_hazards",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_woda_arena_spidersack_poison",
	"modifiers/modifier_woda_arena_room_hazards",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_rune_health", "modifiers/runes/modifier_rune_health", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_strength", "modifiers/runes/modifier_rune_strength", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_regeneration", "modifiers/runes/modifier_rune_regeneration", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_giant", "modifiers/runes/modifier_rune_giant", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_titan", "modifiers/runes/modifier_rune_titan", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_warrior", "modifiers/runes/modifier_rune_warrior", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_cast_range", "modifiers/runes/modifier_rune_cast_range", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_sentinel", "modifiers/runes/modifier_rune_sentinel", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_antimagic", "modifiers/runes/modifier_rune_antimagic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_rebirth", "modifiers/runes/modifier_rune_rebirth", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_knight", "modifiers/runes/modifier_rune_knight", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_agility", "modifiers/runes/modifier_rune_agility", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_evasion", "modifiers/runes/modifier_rune_evasion", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_rage", "modifiers/runes/modifier_rune_rage", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_monk", "modifiers/runes/modifier_rune_monk", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_berserker", "modifiers/runes/modifier_rune_berserker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_hunter", "modifiers/runes/modifier_rune_hunter", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_vampire", "modifiers/runes/modifier_rune_vampire", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_speed", "modifiers/runes/modifier_rune_speed", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_gold", "modifiers/runes/modifier_rune_gold", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_sage", "modifiers/runes/modifier_rune_sage", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_intellect", "modifiers/runes/modifier_rune_intellect", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_restoration", "modifiers/runes/modifier_rune_restoration", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_thought", "modifiers/runes/modifier_rune_thought", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_curse", "modifiers/runes/modifier_rune_curse", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_spell", "modifiers/runes/modifier_rune_spell", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_cleansing", "modifiers/runes/modifier_rune_cleansing", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_sorcerer", "modifiers/runes/modifier_rune_sorcerer", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_barrier", "modifiers/runes/modifier_rune_barrier", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_creator", "modifiers/runes/modifier_rune_creator", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_replenishment", "modifiers/runes/modifier_rune_replenishment", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_time", "modifiers/runes/modifier_rune_time", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_radius", "modifiers/runes/modifier_rune_radius", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_summoner", "modifiers/runes/modifier_rune_summoner", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_druid", "modifiers/runes/modifier_rune_druid", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_shaman", "modifiers/runes/modifier_rune_shaman", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_necromancer", "modifiers/runes/modifier_rune_necromancer", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_dominator", "modifiers/runes/modifier_rune_dominator", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_farm", "modifiers/runes/modifier_rune_farm", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rune_champion", "modifiers/runes/modifier_rune_champion", LUA_MODIFIER_MOTION_NONE)

require("configs/talents_list")

for hero, skilltable in pairs(_G.herotalents) do
	for attribute, attribute_skilltable in pairs(skilltable) do
		for line, line_skilltable in pairs(attribute_skilltable) do
			for talent_number, talent_info in pairs(line_skilltable) do
				if not string.find(talent_info[1], "empty") then
					local hero_talent = true
					for basicid, basic_talent in pairs(_G.basictalents) do
						if talent_info[1] == basic_talent then
							hero_talent = false
						end
					end
					if hero_talent then
						LinkLuaModifier(
							talent_info[1],
							"modifiers/talents/" .. hero .. "/" .. talent_info[1] .. ".lua",
							LUA_MODIFIER_MOTION_NONE
						)
					end
				end
			end
		end
	end
end

for basicid, basic_talent in pairs(_G.basictalents) do
	LinkLuaModifier(basic_talent, "modifiers/talents/basic/" .. basic_talent .. ".lua", LUA_MODIFIER_MOTION_NONE)
end

if IsClient() then
	ListenToGameEvent("woda_execute_console_command", function(data)
		if tostring(GetLocalPlayerID()) == tostring(data.player_id) then
			print("Console command: " .. tostring(data.command))
			SendToConsole(tostring(data.command))
		end
	end, nil)

	SendToConsole("net_option TimeoutConnected 30000")
	SendToConsole('net_option SDRClient_ForceRelayCluster ""')

	for i = 1, 8 do
		Convars:RegisterConvar("woda_party_" .. i, "0", "", 0)
		Convars:RegisterConvar("woda_group_" .. i, "0", "", 0)
	end
	Convars:RegisterConvar("woda_party_mode", "0", "", 0)
	Convars:RegisterConvar("woda_local_launch", "0", "", 0)

	ListenToGameEvent("woda_party_set", function(data)
		if tostring(GetLocalPlayerID()) ~= tostring(data.player_id) then
			return
		end
		for i = 1, 8 do
			Convars:SetInt("woda_party_" .. i, tonumber(data["id" .. i]) or 0)
			Convars:SetInt("woda_group_" .. i, tonumber(data["g" .. i]) or 0)
		end
		Convars:SetInt("woda_party_mode", tonumber(data.mode) or 0)
		Convars:SetInt("woda_local_launch", tonumber(data.launch) or 0)
	end, nil)
end