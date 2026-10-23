--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


_G.LinkLuaModifier_old = LinkLuaModifier_old or LinkLuaModifier
_G.log_modifiers = log_modifiers or {}
_G.hub_pending = hub_pending or {}
_G.hub_functions = {
	[MODIFIER_PROPERTY_STATS_STRENGTH_BONUS] = "GetModifierBonusStats_Strength",
	[MODIFIER_PROPERTY_STATS_AGILITY_BONUS] = "GetModifierBonusStats_Agility",
	[MODIFIER_PROPERTY_STATS_INTELLECT_BONUS] = "GetModifierBonusStats_Intellect",
	[MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT] = "GetModifierAttackSpeedBonus_Constant",
	[MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE] = "GetModifierPreAttack_BonusDamage",
	[MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS] = "GetModifierPhysicalArmorBonus",
	[MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT] = "GetModifierMoveSpeedBonus_Constant",
	[MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING] = "GetModifierCastRangeBonusStacking",
}
_G.hub_units = {
	[MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT] = true,
}
_G.hub_stats = {
	[MODIFIER_PROPERTY_STATS_STRENGTH_BONUS] = true,
	[MODIFIER_PROPERTY_STATS_AGILITY_BONUS] = true,
	[MODIFIER_PROPERTY_STATS_INTELLECT_BONUS] = true,
}

function HubUnit(unit)
	local team = unit:GetTeamNumber()
	return team ~= DOTA_TEAM_NEUTRALS and team ~= DOTA_TEAM_CUSTOM_5 and unit:GetUnitName() ~= "npc_dota_thinker"
end

function HubDeclareWrap(declare)
	return function(obj)
		local list = declare(obj)
		if not IsServer() or type(list) ~= "table" or obj.is_hub then
			return list
		end
		local parent = obj:GetParent()
		if not IsValid(parent) or not HubUnit(parent) then
			return list
		end

		local hero = parent:IsHero()
		local hub = IsValid(parent.stats_hub) and parent.stats_hub.hub
		if not hub and not hero then
			return list
		end

		local result = {}
		local stats = false
		for _, func in pairs(list) do
			if hero and hub_stats[func] then
				stats = true
			end
			if not hub_functions[func] or (not hero and not hub_units[func]) then
				table.insert(result, func)
			elseif hub then
				hub[func][obj] = true
			else
				parent.hub_orphans = parent.hub_orphans or {}
				parent.hub_orphans[obj] = parent.hub_orphans[obj] or {}
				table.insert(parent.hub_orphans[obj], func)
			end
		end
		if not stats then
			return result
		end

		local meta = getmetatable(obj)
		local class = type(meta) == "table" and rawget(meta, "__index")
		if type(class) ~= "table" or rawget(class, "hub_destroy") then
			return result
		end

		rawset(class, "hub_destroy", true)
		local destroy = class.OnDestroy
		rawset(class, "OnDestroy", function(mod)
			local unit = mod:GetParent()
			if IsValid(unit) and IsValid(unit.stats_hub) then
				for _, mods in pairs(unit.stats_hub.hub) do
					mods[mod] = nil
				end
				if unit:IsAlive() and unit:IsHero() then
					unit:CalculateStatBonus(true)
				end
			end
			if destroy then
				return destroy(mod)
			end
		end)
		return result
	end
end

function LinkLuaModifier(name, path, motion, log)
	if log ~= nil then
		log_modifiers[name] = log
	end

	if rawget(_G, "getfenv") then
		local env = getfenv(2)
		local meta = getmetatable(env)
		hub_pending[name] = true
		if env ~= _G and type(meta) == "table" and not meta.__newindex then
			meta.__newindex = function(t, key, value)
				rawset(t, key, value)
				if type(value) ~= "table" or not hub_pending[key] then
					return
				end
				local class_meta = getmetatable(value)
				if not class_meta then
					class_meta = {}
					setmetatable(value, class_meta)
				end
				if class_meta.__newindex then
					return
				end
				class_meta.__newindex = function(class, field, func)
					if field == "DeclareFunctions" and type(func) == "function" then
						rawset(class, "hub_wrapped", true)
						func = HubDeclareWrap(func)
					end
					rawset(class, field, func)
				end
			end
		end
	end

	LinkLuaModifier_old(name, path, motion)
end

LinkLuaModifier(
	"modifier_generic_attack_speed",
	"modifiers/generic/modifier_generic_attack_speed",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_generic_armor_reduction",
	"modifiers/generic/modifier_generic_armor_reduction",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_generic_silence", "modifiers/generic/modifier_generic_silence", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_leash", "modifiers/generic/modifier_generic_leash", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_vision", "modifiers/generic/modifier_generic_vision", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_arc", "modifiers/generic/modifier_generic_arc", LUA_MODIFIER_MOTION_BOTH)
LinkLuaModifier("modifier_generic_movespeed", "modifiers/generic/modifier_generic_movespeed", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_knockback", "modifiers/generic/modifier_generic_knockback", LUA_MODIFIER_MOTION_BOTH)
LinkLuaModifier("modifier_generic_taunt", "modifiers/generic/modifier_generic_taunt", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_repair", "modifiers/generic/modifier_generic_repair", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_break", "modifiers/generic/modifier_generic_break", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_bkb", "modifiers/generic/modifier_generic_bkb", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_passing", "modifiers/generic/modifier_generic_passing", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_no_cleave", "modifiers/generic/modifier_no_cleave", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_stun", "modifiers/generic/modifier_generic_stun", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_generic_debuff_immune",
	"modifiers/generic/modifier_generic_debuff_immune",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_generic_bkb_visual",
	"modifiers/generic/modifier_generic_bkb_visual",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_attacking_hero", "modifiers/generic/modifier_attacking_hero", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_generic_shield", "modifiers/generic/modifier_generic_shield", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_generic_shield_multiple",
	"modifiers/generic/modifier_generic_shield",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_generic_path", "modifiers/generic/modifier_generic_path", LUA_MODIFIER_MOTION_NONE)

LinkLuaModifier("modifier_aegis_custom", "modifiers/utils/modifier_aegis_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_invun", "modifiers/utils/modifier_invun", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_unselect", "modifiers/utils/modifier_unselect", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_start_stun", "modifiers/utils/modifier_start_stun", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_cooldown_speed", "modifiers/utils/modifier_cooldown_speed", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_can_not_push", "modifiers/utils/modifier_can_not_push", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_ward_attack_range", "modifiers/utils/modifier_ward_attack_range", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_unranked_penalty_1", "modifiers/utils/modifier_unranked_penalty", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_unranked_penalty_2", "modifiers/utils/modifier_unranked_penalty", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_unranked_penalty_3", "modifiers/utils/modifier_unranked_penalty", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_blink_break_custom", "modifiers/utils/modifier_blink_break_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_rule_only_cone", "modifiers/utils/modifier_rule_only_cone", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_neutral_creep", "abilities/creeps_neutral/modifier_neutral_creep", LUA_MODIFIER_MOTION_NONE)

LinkLuaModifier("modifier_orb_icon", "modifiers/map_mods/modifier_orb_icon", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_teleport_cast", "modifiers/map_mods/modifier_teleport_cast", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_watcher_custom", "modifiers/map_mods/modifier_watcher_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_haste_zone_thinker",
	"modifiers/map_mods/modifier_haste_zone_thinker",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_mid_teleport", "modifiers/map_mods/modifier_mid_teleport", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_orbs_shrine_custom",
	"modifiers/map_mods/modifier_orbs_shrine_custom",
	LUA_MODIFIER_MOTION_NONE
)

LinkLuaModifier(
	"modifier_player_main_custom",
	"modifiers/main_mods/modifier_player_main_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_stats_hub", "modifiers/main_mods/modifier_stats_hub", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_death", "modifiers/main_mods/modifier_death", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_mob_thinker", "modifiers/main_mods/modifier_mob_thinker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_event_thinker", "modifiers/main_mods/modifier_event_thinker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_event_thinker_heal", "modifiers/main_mods/modifier_event_thinker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_proc_accuracy", "modifiers/main_mods/modifier_event_thinker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_proc_accuracy_swing", "modifiers/main_mods/modifier_event_thinker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_quest_blink", "modifiers/main_mods/modifier_event_thinker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_voice_module", "modifiers/main_mods/modifier_voice_module", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_donate_pet", "modifiers/main_mods/modifier_donate_pet", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_quest_logic", "modifiers/main_mods/modifier_quest_logic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_test_hero_custom", "modifiers/main_mods/modifier_test_mode", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_end_choise", "modifiers/main_mods/modifier_end_choise", LUA_MODIFIER_MOTION_NONE)

LinkLuaModifier(
	"modifier_patrol_reward_1_orb",
	"modifiers/patrol_rewards/modifier_patrol_reward_1_orb",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_1_vision",
	"modifiers/patrol_rewards/modifier_patrol_reward_1_vision",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_1_ward",
	"modifiers/patrol_rewards/modifier_patrol_reward_1_ward",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_1_gold",
	"modifiers/patrol_rewards/modifier_patrol_reward_1_gold",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_1_shield",
	"modifiers/patrol_rewards/modifier_patrol_reward_1_shield",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_2_respawn",
	"modifiers/patrol_rewards/modifier_patrol_reward_2_respawn",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_2_buff",
	"modifiers/patrol_rewards/modifier_patrol_reward_2_buff",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_2_fortifier",
	"modifiers/patrol_rewards/modifier_patrol_reward_2_fortifier",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_2_portal",
	"modifiers/patrol_rewards/modifier_patrol_reward_2_portal",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_patrol_reward_2_gem",
	"modifiers/patrol_rewards/modifier_patrol_reward_2_gem",
	LUA_MODIFIER_MOTION_NONE
)

LinkLuaModifier("modifier_tower_pre_game", "modifiers/tower/modifier_tower_pre_game", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_tower_no_owner", "modifiers/tower/modifier_tower_no_owner", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_tower_level", "modifiers/tower/modifier_tower_level", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_tower_incoming", "modifiers/tower/modifier_tower_incoming", LUA_MODIFIER_MOTION_NONE)

LinkLuaModifier("modifier_waveupgrade", "modifiers/creeps/modifier_waveupgrade", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_waveupgrade_boss", "modifiers/creeps/modifier_waveupgrade_boss", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_creeps_trap", "modifiers/creeps/modifier_creeps_trap", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_creeps_movespeed", "modifiers/creeps/modifier_creeps_trap", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_neutral_cast", "modifiers/creeps/modifier_neutral_cast", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_neutral_cast_cd", "modifiers/creeps/modifier_neutral_cast", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_patrol_death", "modifiers/creeps/modifier_patrol_start", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_return_to_path", "modifiers/creeps/modifier_return_to_path", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_patrol_start", "modifiers/creeps/modifier_patrol_start", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_patrol_gospawn", "modifiers/creeps/modifier_patrol_start", LUA_MODIFIER_MOTION_NONE)

LinkLuaModifier("modifier_endgame_winner", "modifiers/game_mode/modifier_endgame_winner", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_duel_field_thinker", "modifiers/game_mode/modifier_duel_logic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_duel_hero_thinker", "modifiers/game_mode/modifier_duel_logic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_duel_hero_return", "modifiers/game_mode/modifier_duel_logic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_duel_tower_return", "modifiers/game_mode/modifier_duel_logic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_duel_hero_teleport", "modifiers/game_mode/modifier_duel_logic", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_the_hunt_custom_tower",
	"modifiers/game_mode/modifier_the_hunt_custom_tower",
	LUA_MODIFIER_MOTION_NONE
)

LinkLuaModifier(
	"modifier_axe_culling_blade_custom_aegis",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)

_G.ARCANA_ICONS = {
	["9059"] = "npc_dota_hero_juggernaut_alt1",
	["2059"] = "npc_dota_hero_juggernaut_alt1",
	["2068"] = "npc_dota_hero_juggernaut_alt2",
	["4239"] = "npc_dota_hero_phantom_assassin_alt1",
	["4560"] = "npc_dota_hero_phantom_assassin_alt1",
	["4561"] = "npc_dota_hero_phantom_assassin_alt1",
	["4480"] = "npc_dota_hero_phantom_assassin_persona1",
	["5810"] = "npc_dota_hero_legion_commander_alt1",
	["6996"] = "npc_dota_hero_nevermore_alt1",
	["23095"] = "npc_dota_hero_razor_alt1",
	["2309599"] = "npc_dota_hero_razor_alt2",
	["12930"] = "npc_dota_hero_queenofpain_alt1",
	["1293001"] = "npc_dota_hero_queenofpain_alt2",
	["13456"] = "npc_dota_hero_skeleton_king_alt1",
	["1345601"] = "npc_dota_hero_skeleton_king_alt2",
	["905001"] = "npc_dota_hero_monkey_king_alt1",
	["905002"] = "npc_dota_hero_monkey_king_alt1",
	["905003"] = "npc_dota_hero_monkey_king_alt1",
	["905004"] = "npc_dota_hero_monkey_king_alt1",
	["4794"] = "npc_dota_hero_lina_alt1",
	["6914"] = "npc_dota_hero_zuus_alt1",
	["7756"] = "npc_dota_hero_pudge_alt1",
	["77561"] = "npc_dota_hero_pudge_alt2",
	["999251"] = "npc_dota_hero_pudge_persona1",
	["19090"] = "npc_dota_hero_drow_ranger_alt1",
	["190901"] = "npc_dota_hero_drow_ranger_alt2",
	["18539"] = "npc_dota_hero_skywrath_mage_alt1",
	["185391"] = "npc_dota_hero_skywrath_mage_alt2",
	["13783"] = "npc_dota_hero_antimage_persona1",
	["12964"] = "npc_dota_hero_axe_alt",
	["13670"] = "npc_dota_hero_ogre_magi_alt1",
	["136701"] = "npc_dota_hero_ogre_magi_alt2",
	["13042"] = "npc_dota_hero_invoker_persona1",
	["30721"] = "npc_dota_hero_invoker_persona1",
	["7385"] = "npc_dota_hero_crystal_maiden_alt1",
	["26559"] = "npc_dota_hero_crystal_maiden_persona1",
	["5957"] = "npc_dota_hero_terrorblade_alt1",
	["31367"] = "npc_dota_hero_axe_carnival",
	["36191"] = "npc_dota_hero_legion_commander_carnival",
	["36214"] = "npc_dota_hero_bristleback_carnival",
	["36193"] = "npc_dota_hero_morphling_carnival",
}

_G.added_shop_heroes = {
	["npc_dota_hero_kunkka"] = true,
	["npc_dota_hero_juggernaut"] = true,
	["npc_dota_hero_troll_warlord"] = true,
	["npc_dota_hero_void_spirit"] = true,
	["npc_dota_hero_bane"] = true,
	["npc_dota_hero_morphling"] = true,
	["npc_dota_hero_abaddon"] = true,
	["npc_dota_hero_alchemist"] = true,
	["npc_dota_hero_life_stealer"] = true,
	["npc_dota_hero_arc_warden"] = true,
	["npc_dota_hero_tinker"] = true,
	["npc_dota_hero_bloodseeker"] = true,
	["npc_dota_hero_bristleback"] = true,
	["npc_dota_hero_centaur"] = true,
	["npc_dota_hero_witch_doctor"] = true,
	["npc_dota_hero_ember_spirit"] = true,
	["npc_dota_hero_nyx_assassin"] = true,
	["npc_dota_hero_enigma"] = true,
	["npc_dota_hero_hoodwink"] = true,
	["npc_dota_hero_broodmother"] = true,
	["npc_dota_hero_nevermore"] = true,
	["npc_dota_hero_axe"] = true,
	["npc_dota_hero_lina"] = true,
	["npc_dota_hero_legion_commander"] = true,
	["npc_dota_hero_zuus"] = true,
	["npc_dota_hero_skeleton_king"] = true,
	["npc_dota_hero_terrorblade"] = true,
	["npc_dota_hero_huskar"] = true,
	["npc_dota_hero_queenofpain"] = true,
	["npc_dota_hero_drow_ranger"] = true,
	["npc_dota_hero_skywrath_mage"] = true,
	["npc_dota_hero_ogre_magi"] = true,
	["npc_dota_hero_monkey_king"] = true,
	["npc_dota_hero_razor"] = true,
	["npc_dota_hero_phantom_assassin"] = true,
	["npc_dota_hero_crystal_maiden"] = true,
	["npc_dota_hero_antimage"] = true,
	["npc_dota_hero_pudge"] = true,
	["npc_dota_hero_invoker"] = true,
	["npc_dota_hero_slark"] = true,
	["npc_dota_hero_night_stalker"] = true,
	["npc_dota_hero_leshrac"] = true,
	["npc_dota_hero_marci"] = true,
	["npc_dota_hero_mars"] = true,
	["npc_dota_hero_jakiro"] = true,
	["npc_dota_hero_muerta"] = true,
	["npc_dota_hero_furion"] = true,
	["npc_dota_hero_pangolier"] = true,
	["npc_dota_hero_primal_beast"] = true,
	["npc_dota_hero_puck"] = true,
}

_G.NoCdItems = {
	["item_aeon_disk"] = true,
	["item_hand_of_midas_custom"] = true,
	["item_ultimate_scepter"] = true,
	["item_tranquil_boots_custom"] = true,
	["item_falcon_blade_custom"] = true,
	["item_basher"] = true,
	["item_black_king_bar_custom"] = true,
	["item_basher_custom"] = true,
	["item_sphere_custom"] = true,
	["item_mirror_shield_custom"] = true,
	["item_invoker_custom_legendary"] = true,
	["item_octarine_core_custom"] = true,
}

_G.BaseAbilities = {
	["witch_doctor_maledict_custom_legendary"] = true,
	["witch_doctor_death_ward_custom_legendary"] = true,
	["arc_warden_magnetic_field_custom_legendary"] = true,
	["morphling_morph_replicate_custom"] = true,
	["slark_shadow_dance_custom_legendary"] = true,
	["slark_pounce_custom_legendary"] = true,
	["night_stalker_void_custom_legendary"] = true,
	["life_stealer_infest_custom_legendary"] = true,
	["nyx_assassin_jolt_custom_legendary"] = true,
	["marci_summon_custom_wisp"] = true,
	["mars_avatar_custom"] = true,
	["mars_revenge_custom"] = true,
	["muerta_dead_shot_custom_proc"] = true,
	["pangolier_heartpiercer_custom"] = true,
	["pangolier_gyroshell_custom_legendary"] = true,
	["custom_phantom_assassin_coup_de_grace_legendary"] = true,
}

-- Init client wearables system

if IsClient() then
	ListenToGameEvent("sdr_relay_switch", function(data)
		if data.player_id ~= GetLocalPlayerID() then
			return
		end
		SendToConsole("net_option SDRClient_ForceRelayCluster " .. data.relay)
	end, nil)

	ListenToGameEvent("dota1x6_client_rate", function(data)
		if data.player_id ~= GetLocalPlayerID() then
			return
		end
		SendToConsole("rate " .. data.rate)
	end, nil)

	ListenToGameEvent("client_modifier_linked", function(data)
		local path = data.path
		local modifier_name = data.modifier_name
		LinkLuaModifier(modifier_name, path, LUA_MODIFIER_MOTION_NONE)
	end, nil)

	require("wearables_system/wearables_system_client")

	_G.HEROES_DATA_ITEMS_CLIENT = _G.HEROES_DATA_ITEMS_CLIENT or {}

	_G.AllItemsData = _G.AllItemsData or {}
	_G.AllItemsStyles = _G.AllItemsStyles or {}
	ListenToGameEvent("send_items_data", function(data)
		_G.AllItemsData[data.player_id] = json.decode(tostring(data.items_data))
		_G.AllItemsStyles[data.player_id] = json.decode(tostring(data.styles_list))
	end, nil)

	_G.PLAYER_PORTRAIT_UNIT = _G.PLAYER_PORTRAIT_UNIT or nil
	ListenToGameEvent("update_portrait_lua", function(data)
		_G.PLAYER_PORTRAIT_UNIT = data.portrait_unit
	end, nil)

	_G.PLAYER_KILLER_UNIT = _G.PLAYER_KILLER_UNIT or nil
	ListenToGameEvent("update_killer_lua", function(data)
		_G.PLAYER_KILLER_UNIT = data.portrait_unit
	end, nil)
end

if IsClient() then
	ListenToGameEvent("talent_added", function(event)
		local ent_index = event.ent_index
		local talent = event.talent
		local level = event.level

		local unit = EntIndexToHScript(ent_index)
		if unit and not unit:IsNull() then
			if level == 0 then
				unit:RemoveTalent(talent)
			else
				unit:AddTalent(talent, level)
			end
		end
	end, nil)
end

function SaveBaseAbilities(unit)
	unit.base_abilities = {}
	local hero_values = LoadKeyValues("scripts/npc/npc_heroes_custom.txt")
	if hero_values and hero_values[unit:GetUnitName()] then
		local max = unit:GetUnitName() == "npc_dota_hero_invoker" and 17 or 7
		for i = 1, max do
			if hero_values[unit:GetUnitName()]["Ability" .. i] then
				local name = hero_values[unit:GetUnitName()]["Ability" .. i]
				local ability = unit:FindAbilityByName(name)
				if ability then
					ability.init = false
					table.insert(unit.base_abilities, hero_values[unit:GetUnitName()]["Ability" .. i])
				end
			end
		end
	end
	for name, _ in pairs(BaseAbilities) do
		local ability = unit:FindAbilityByName(name)
		if ability then
			ability.init = false
			table.insert(unit.base_abilities, name)
		end
	end

	table.insert(unit.base_abilities, "custom_general_talents")
end

ListenToGameEvent("save_abilities", function(event)
	local ent_index = event.ent_index
	local unit = EntIndexToHScript(ent_index)

	if IsValid(unit) and not unit.base_abilities then
		SaveBaseAbilities(unit)

		local aghs_key = "aghs_" .. unit:GetUnitName()
		if not CustomNetTables:GetTableValue("custom_pick", aghs_key) then
			local upgrades = {}
			local ability_keys = {}
			for i = 0, unit:GetAbilityCount() - 1 do
				local ability = unit:GetAbilityByIndex(i)
				if ability then
					local kv = ability:GetAbilityKeyValues()
					local scepter = tostring(kv.IsGrantedByScepter) == "1" and 2
						or tostring(kv.HasScepterUpgrade) == "1" and 1
						or 0
					local shard = tostring(kv.IsGrantedByShard) == "1" and 2
						or tostring(kv.HasShardUpgrade) == "1" and 1
						or 0
					if scepter > 0 or shard > 0 then
						table.insert(
							upgrades,
							{
								name = ability:GetAbilityName(),
								scepter = scepter,
								shard = shard,
								innate = tostring(kv.Innate) == "1" and 1 or 0,
							}
						)
					end
					if type(kv.AbilityValues) == "table" then
						for key, value in pairs(kv.AbilityValues) do
							local mark = type(value) == "table"
									and (value.levelkey or tostring(value.dynamic_value) == "true" and "dynamic")
								or key:find("+", 1, true) and "sum"
								or nil
							if mark then
								ability_keys[ability:GetAbilityName()] = ability_keys[ability:GetAbilityName()] or {}
								ability_keys[ability:GetAbilityName()][key] = mark
							end
						end
					end
				end
			end
			CustomNetTables:SetTableValue("custom_pick", aghs_key, upgrades)
			if next(ability_keys) then
				CustomNetTables:SetTableValue("custom_pick", "ability_keys_" .. unit:GetUnitName(), ability_keys)
			end
		end
	end
end, nil)

ListenToGameEvent("save_talents", function(event)
	talents_values:SendTalents(nil, event.hero_name)
end, nil)

LinkLuaModifier(
	"modifier_crystal_maiden_death_custom",
	"wearables_system/modifiers/modifier_crystal_maiden_death_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_donate_hero_illusion_item",
	"wearables_system/modifiers/modifier_donate_hero_illusion_item",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_activity_animation_custom",
	"wearables_system/modifiers/modifier_activity_animation_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_illusion_handler",
	"wearables_system/modifiers/modifier_illusion_handler",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hero_wearables_system",
	"wearables_system/modifiers/modifier_hero_wearables_system",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_illusion_custom", "modifiers/utils/modifier_illusion_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_status_effect_thinker_custom",
	"wearables_system/modifiers/modifier_status_effect_thinker_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_terrorblade_arcana_custom",
	"wearables_system/modifiers/modifier_terrorblade_arcana_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_terrorblade_arcana_custom_death",
	"wearables_system/modifiers/modifier_terrorblade_arcana_custom",
	LUA_MODIFIER_MOTION_NONE
)

if IsClient() then
	require("function_client")
	require("upgrade")
end

_G.Player_damage_max = 4
_G.Player_damage_inc = 15
_G.Player_damage_time = 17 * 60

_G.MODIFIER_PRIORITY_ILLUSION = 99999
_G.CUSTOM_FLAG_AXE_CULLING_BLADE = 1
_G.CUSTOM_FLAG_TINKER_MATRIX = 2
_G.CUSTOM_FLAG_TINKER_REARM = 3
_G.CUSTOM_FLAG_BRISTLEBACK_GOO = 4
_G.CUSTOM_FLAG_INVOKER_SNAP = 5
_G.CUSTOM_FLAG_GOLD_KHANDA = 5

_G.DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM = 137438953472
_G.DOTA_ABILITY_BEHAVIOR_ALT_CASTABLE_CUSTOM = 1099511627776

_G.LIFESTEAL_CREEPS_CUSTOM = 1 / 3

_G.MAX_LEAVE = 3
_G.UNRANKED_DAMAGE_PENALTY = 20
_G.UNRANKED_RATING_PENALTY = 800
_G.MAX_REPORTS = 4
_G.RANKED_GAME_COUNT = 0 --доступ к ранкеду 25 игр в анранкеде
_G.RANKED_GAME_COUNT_TOTAL = 0 --доступ к ранкеду 75 игр на аккаунте
_G.RANKED_DAMAGE_BONUS = 15
_G.LOW_PRIORITY_IMMUNITY = 10
_G.MAX_FREE_BUILDS = 15
_G.FREE_BUILDS_MAX_GAMES = 25

_G.players_in_team = 1
_G.max_teams = 6
_G.win_place = 3

_G.test_ids = {
	-- [1] = "188179173",
	-- [2] = "1422977290",
}

if
	GetMapName() == "unranked_duo"
	or GetMapName() == "maps/unranked_duo.vpk"
	or GetMapName() == "maps/ranked_duo.vpk"
	or GetMapName() == "ranked_duo"
then
	_G.players_in_team = 2
	_G.max_teams = 4
	_G.win_place = 2
end

_G.bots_ids = {}

function IsSoloMode()
	return players_in_team == 1
end

function IsUnrankedMap()
	return GetMapName() == "unranked"
		or GetMapName() == "maps/unranked.vpk"
		or GetMapName() == "unranked_duo"
		or GetMapName() == "maps/unranked_duo.vpk"
end

function IsValid(...)
	for i = 1, select("#", ...) do
		local entity = select(i, ...)
		if not entity or not entity.IsNull or entity:IsNull() then
			return false
		end
	end
	return true
end

function IsRadiant(name)
	if name == "2" or name == "6" or (name == "7" and IsSoloMode()) or name == "edge_teleport_1" then
		return true
	end
	return false
end

function IsDire(name)
	if name == "3" or name == "8" or name == "9" or (name == "7" and not IsSoloMode()) or name == "edge_teleport_2" then
		return true
	end
	return false
end

function IsTree(unit)
	if unit.is_tree then
		return true
	end
	local class_name = unit:GetClassname()
	if class_name == "ent_dota_tree" or class_name == "dota_temp_tree" then
		return true
	end
	if unit.IsTree then
		return unit:IsTree()
	end
	return false
end

function ValidId(id)
	if IsClient() then
		return
	end
	return PlayerResource:IsValidPlayerID(id) and (PlayerResource:GetSteamAccountID(id) ~= 0 or bots_ids[id])
end

function ReflectedDamage(params)
	if not IsServer() then
		return
	end
	if not params.damage_flags then
		return false
	end
	return bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION
end

mod_hidden = class({})
function mod_hidden:IsHidden()
	return true
end
function mod_hidden:IsPurgable()
	return false
end

mod_cd = class({})
function mod_cd:IsHidden()
	return false
end
function mod_cd:IsPurgable()
	return false
end
function mod_cd:IsDebuff()
	return true
end
function mod_cd:RemoveOnDeath()
	return false
end
function mod_cd:OnCreated(table)
	self.RemoveForDuel = true
end

mod_visible = class({})
function mod_visible:IsHidden()
	return false
end
function mod_visible:IsPurgable()
	return false
end

if not AddFOWViewer_old then
	AddFOWViewer_old = AddFOWViewer
end

function AddFOWViewer(team, point, radius, duration, full_vision)
	if not IsServer() then
		return
	end
	if dota1x6.NO_FOW_TEAMS and dota1x6.NO_FOW_TEAMS[team] then
		return
	end
	AddFOWViewer_old(team, point, radius, duration, full_vision)
end

_G.destroy_parents = destroy_parents or setmetatable({}, { __mode = "k" })

if not UTIL_Remove_old then
	UTIL_Remove_old = UTIL_Remove
	RemoveSelf_old = CEntityInstance.RemoveSelf
end

function UTIL_Remove(unit)
	if unit and destroy_parents[unit] == GetFrameCount() then
		Timers:CreateTimer(FrameTime(), function()
			if IsValid(unit) then
				UTIL_Remove_old(unit)
			end
		end)
		return
	end
	UTIL_Remove_old(unit)
end

function CEntityInstance:RemoveSelf()
	if destroy_parents[self] == GetFrameCount() then
		UTIL_Remove(self)
		return
	end
	RemoveSelf_old(self)
end

_G.prd_keys = prd_keys or {}
_G.prd_next = prd_next or 20000

if not RollPseudoRandomPercentage_old then
	RollPseudoRandomPercentage_old = RollPseudoRandomPercentage
end

function RollPseudoRandomPercentage(chance, key, unit)
	if type(key) == "string" then
		if not prd_keys[key] then
			prd_next = prd_next + 1
			prd_keys[key] = prd_next
		end
		key = prd_keys[key]
	end
	return RollPseudoRandomPercentage_old(chance, key, unit)
end

function InvokerAbilityManager(caster)
	if not IsValid(caster.snap_ability) then
		caster.snap_ability = caster:FindAbilityByName("invoker_cold_snap_custom")
	end
	if not IsValid(caster.wall_ability) then
		caster.wall_ability = caster:FindAbilityByName("invoker_ice_wall_custom")
	end
	if not IsValid(caster.ghost_ability) then
		caster.ghost_ability = caster:FindAbilityByName("invoker_ghost_walk_custom")
	end
	if not IsValid(caster.tornado_ability) then
		caster.tornado_ability = caster:FindAbilityByName("invoker_tornado_custom")
	end
	if not IsValid(caster.emp_ability) then
		caster.emp_ability = caster:FindAbilityByName("invoker_emp_custom")
	end
	if not IsValid(caster.alacrity_ability) then
		caster.alacrity_ability = caster:FindAbilityByName("invoker_alacrity_custom")
	end
	if not IsValid(caster.forge_ability) then
		caster.forge_ability = caster:FindAbilityByName("invoker_forge_spirit_custom")
	end
	if not IsValid(caster.sun_ability) then
		caster.sun_ability = caster:FindAbilityByName("invoker_sun_strike_custom")
	end
	if not IsValid(caster.meteor_ability) then
		caster.meteor_ability = caster:FindAbilityByName("invoker_chaos_meteor_custom")
	end
	if not IsValid(caster.deafing_ability) then
		caster.deafing_ability = caster:FindAbilityByName("invoker_deafening_blast_custom")
	end

	local damage_inc = 1
	local radius_inc = 1

	if IsValid(caster.invoke_ability) then
		if caster.invoke_ability.talents.has_r1 == 1 then
			damage_inc = 1 + caster.invoke_ability.talents.r1_damage
		end
		if caster.invoke_ability.talents.has_r2 then
			radius_inc = 1 + caster.invoke_ability.talents.r2_radius
		end
	end

	if caster.snap_ability then
		caster.snap_ability:UpdateTalents()

		if IsServer() then
			if not caster.snap_ability:IsTrained() then
				caster.snap_ability:SetLevel(1)
			end
			caster.snap_ability.damage_trigger = caster.snap_ability:GetSpecialValueFor("damage_trigger")
			caster.snap_ability.freeze_duration = caster.snap_ability:GetSpecialValueFor("freeze_duration")
			caster.snap_ability.duration = caster:GetValueQuas(caster.snap_ability, "duration")
			caster.snap_ability.freeze_cooldown = caster:GetValueQuas(caster.snap_ability, "freeze_cooldown")
			caster.snap_ability.freeze_damage = caster:GetValueQuas(caster.snap_ability, "freeze_damage") * damage_inc
		end
	end

	if caster.wall_ability then
		caster.wall_ability:UpdateTalents()

		if IsServer() then
			if not caster.wall_ability:IsTrained() then
				caster.wall_ability:SetLevel(1)
			end
			caster.wall_ability.slow_duration = caster.wall_ability:GetSpecialValueFor("slow_duration")
			caster.wall_ability.wall_place_distance = caster.wall_ability:GetSpecialValueFor("wall_place_distance")
			caster.wall_ability.num_wall_elements = caster.wall_ability:GetSpecialValueFor("num_wall_elements")
			caster.wall_ability.wall_element_spacing = caster.wall_ability:GetSpecialValueFor("wall_element_spacing")
			caster.wall_ability.wall_element_radius = caster.wall_ability:GetSpecialValueFor("wall_element_radius")
				* radius_inc
			caster.wall_ability.creeps_damage = caster.wall_ability:GetSpecialValueFor("creeps_damage") / 100
			caster.wall_ability.duration = caster:GetValueQuas(caster.wall_ability, "duration")
			caster.wall_ability.slow = caster:GetValueQuas(caster.wall_ability, "slow")
			caster.wall_ability.damage_per_second = caster:GetValueExort(caster.wall_ability, "damage_per_second")
				* damage_inc
		end
	end

	if caster.ghost_ability then
		caster.ghost_ability:UpdateTalents()

		if IsServer() then
			if not caster.ghost_ability:IsTrained() then
				caster.ghost_ability:SetLevel(1)
			end
			caster.ghost_ability.aura_fade_time = caster.ghost_ability:GetSpecialValueFor("aura_fade_time")
			caster.ghost_ability.area_of_effect = caster.ghost_ability:GetSpecialValueFor("area_of_effect") * radius_inc
			caster.ghost_ability.duration = caster:GetValueWex(caster.ghost_ability, "duration")
		end
		caster.ghost_ability.enemy_slow = caster:GetValueQuas(caster.ghost_ability, "enemy_slow")
		caster.ghost_ability.self_slow = caster:GetValueWex(caster.ghost_ability, "self_slow")
		caster.ghost_ability.health_regen = caster:GetValueQuas(caster.ghost_ability, "health_regen")
		caster.ghost_ability.mana_regen = caster:GetValueWex(caster.ghost_ability, "mana_regen")
	end

	if caster.tornado_ability then
		caster.tornado_ability:UpdateTalents()

		if IsServer() then
			if not caster.tornado_ability:IsTrained() then
				caster.tornado_ability:SetLevel(1)
			end
			caster.tornado_ability.travel_speed = caster.tornado_ability:GetSpecialValueFor("travel_speed")
			caster.tornado_ability.vision_distance = caster.tornado_ability:GetSpecialValueFor("vision_distance")
			caster.tornado_ability.end_vision_duration =
				caster.tornado_ability:GetSpecialValueFor("end_vision_duration")
			caster.tornado_ability.base_damage = caster.tornado_ability:GetSpecialValueFor("base_damage")
			caster.tornado_ability.area_of_effect = caster.tornado_ability:GetSpecialValueFor("area_of_effect")
				* radius_inc
			caster.tornado_ability.lift_duration = caster:GetValueQuas(caster.tornado_ability, "lift_duration")
			caster.tornado_ability.wex_damage = caster:GetValueWex(caster.tornado_ability, "wex_damage") * damage_inc
			caster.tornado_ability.travel_distance = caster:GetValueWex(caster.tornado_ability, "travel_distance")
		end
	end

	if caster.emp_ability then
		caster.emp_ability:UpdateTalents()

		if IsServer() then
			if not caster.emp_ability:IsTrained() then
				caster.emp_ability:SetLevel(1)
			end
			caster.emp_ability.delay = caster.emp_ability:GetSpecialValueFor("delay")
			caster.emp_ability.self_mana = caster.emp_ability:GetSpecialValueFor("self_mana")
			caster.emp_ability.damage_per_mana_pct = caster.emp_ability:GetSpecialValueFor("damage_per_mana_pct")
				* damage_inc
			caster.emp_ability.mana_burned = caster:GetValueWex(caster.emp_ability, "mana_burned")
			caster.emp_ability.damage_creeps = caster:GetValueWex(caster.emp_ability, "damage_creeps") * damage_inc
		end
		caster.emp_ability.area_of_effect = caster.emp_ability:GetSpecialValueFor("area_of_effect") * radius_inc
	end

	if caster.alacrity_ability then
		caster.alacrity_ability:UpdateTalents()

		if IsServer() then
			if not caster.alacrity_ability:IsTrained() then
				caster.alacrity_ability:SetLevel(1)
			end
			caster.alacrity_ability.duration = caster.alacrity_ability:GetSpecialValueFor("duration")
		end
		caster.alacrity_ability.bonus_attack_speed = caster:GetValueWex(caster.alacrity_ability, "bonus_attack_speed")
		caster.alacrity_ability.bonus_damage = caster:GetValueExort(caster.alacrity_ability, "bonus_damage")
	end

	if caster.forge_ability then
		caster.forge_ability:UpdateTalents()

		if IsServer() then
			if not caster.forge_ability:IsTrained() then
				caster.forge_ability:SetLevel(1)
			end
			caster.forge_ability.spirit_duration = caster:GetValueQuas(caster.forge_ability, "spirit_duration")

			caster.forge_ability.spirit_count = 1
			local quas_count = caster:GetValueQuas(caster.forge_ability, "spirit_count_quas")
			local exort_count = caster:GetValueExort(caster.forge_ability, "spirit_count_exort")
			if exort_count > 0 and quas_count > 0 then
				caster.forge_ability.spirit_count = 2
			end
		end
		caster.forge_ability.spirit_damage = caster:GetValueExort(caster.forge_ability, "spirit_damage")
		caster.forge_ability.spirit_movespeed = caster:GetValueExort(caster.forge_ability, "spirit_movespeed")
		caster.forge_ability.spirit_armor = caster:GetValueExort(caster.forge_ability, "spirit_armor")
		caster.forge_ability.spirit_attack_range = caster:GetValueQuas(caster.forge_ability, "spirit_attack_range")
		caster.forge_ability.spirit_hp = caster:GetValueQuas(caster.forge_ability, "spirit_hp")
	end

	if caster.sun_ability then
		caster.sun_ability:UpdateTalents()

		if IsServer() then
			if not caster.sun_ability:IsTrained() then
				caster.sun_ability:SetLevel(1)
			end
			caster.sun_ability.delay = caster.sun_ability:GetSpecialValueFor("delay")
			caster.sun_ability.vision_distance = caster.sun_ability:GetSpecialValueFor("vision_distance")
			caster.sun_ability.vision_duration = caster.sun_ability:GetSpecialValueFor("vision_duration")
			caster.sun_ability.burn_duration = caster.sun_ability:GetSpecialValueFor("burn_duration")
			caster.sun_ability.burn_radius = caster.sun_ability:GetSpecialValueFor("burn_radius")
			caster.sun_ability.damage = caster:GetValueExort(caster.sun_ability, "damage") * damage_inc
			caster.sun_ability.burn_damage = caster:GetValueExort(caster.sun_ability, "burn_damage") * damage_inc
		end
		caster.sun_ability.area_of_effect = caster.sun_ability:GetSpecialValueFor("area_of_effect") * radius_inc
		caster.sun_ability.creep_radius = caster.sun_ability:GetSpecialValueFor("creep_radius")
	end

	if caster.meteor_ability then
		caster.meteor_ability:UpdateTalents()

		if IsServer() then
			if not caster.meteor_ability:IsTrained() then
				caster.meteor_ability:SetLevel(1)
			end
			caster.meteor_ability.land_time = caster.meteor_ability:GetSpecialValueFor("land_time")
			caster.meteor_ability.travel_speed = caster.meteor_ability:GetSpecialValueFor("travel_speed")
			caster.meteor_ability.damage_interval = caster.meteor_ability:GetSpecialValueFor("damage_interval")
			caster.meteor_ability.end_vision_duration = caster.meteor_ability:GetSpecialValueFor("end_vision_duration")
			caster.meteor_ability.burn_duration = caster.meteor_ability:GetSpecialValueFor("burn_duration")
			caster.meteor_ability.base_radius = caster.meteor_ability:GetSpecialValueFor("area_of_effect")
			caster.meteor_ability.vision_distance = caster.meteor_ability:GetSpecialValueFor("vision_distance")
			caster.meteor_ability.travel_distance = caster:GetValueWex(caster.meteor_ability, "travel_distance")
			caster.meteor_ability.main_damage = caster:GetValueExort(caster.meteor_ability, "main_damage") * damage_inc
			caster.meteor_ability.burn_dps = caster:GetValueExort(caster.meteor_ability, "burn_dps") * damage_inc
		end
		caster.meteor_ability.area_of_effect = caster.meteor_ability:GetSpecialValueFor("area_of_effect") * radius_inc
	end

	if caster.deafing_ability then
		caster.deafing_ability:UpdateTalents()

		if IsServer() then
			if not caster.deafing_ability:IsTrained() then
				caster.deafing_ability:SetLevel(1)
			end
			caster.deafing_ability.travel_speed = caster.deafing_ability:GetSpecialValueFor("travel_speed")
			caster.deafing_ability.end_vision_duration =
				caster.deafing_ability:GetSpecialValueFor("end_vision_duration")
			caster.deafing_ability.travel_distance = caster.deafing_ability:GetSpecialValueFor("travel_distance")
			caster.deafing_ability.knockback_speed = caster.deafing_ability:GetSpecialValueFor("knockback_speed")
			caster.deafing_ability.radius_start = caster.deafing_ability:GetSpecialValueFor("radius_start") * radius_inc
			caster.deafing_ability.radius_end = caster.deafing_ability:GetSpecialValueFor("radius_end") * radius_inc
			caster.deafing_ability.damage = caster:GetValueExort(caster.deafing_ability, "damage") * damage_inc
			caster.deafing_ability.knockback_duration =
				caster:GetValueQuas(caster.deafing_ability, "knockback_duration")
			caster.deafing_ability.disarm_duration = caster:GetValueWex(caster.deafing_ability, "disarm_duration")
		end
	end
end