--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/index"
for b, c in ipairs({ "modifier_ai_common" }) do
	require("modifiers.ai." .. c)
end
for b, c in ipairs({
	"modifier_bleed",
	"modifier_burning",
	"modifier_execute_threshold",
	"modifier_expose",
	"modifier_freeze_debuff",
	"modifier_frozen_debuff",
	"modifier_ice_mark",
	"modifier_ice_vortex_custom",
	"modifier_invulnerable_buff",
	"modifier_lightning_cloud",
	"modifier_poison_custom",
	"modifier_poison_pool",
	"modifier_weak_debuff",
	"modifier_wisps",
}) do
	require("modifiers.buff." .. c)
end
for b, c in ipairs({
	"modifier_abyssal_attack_teleport",
	"modifier_abyssal_knock",
	"modifier_abyssal_recovery",
	"modifier_cdreduce",
}) do
	require("modifiers.combo_events." .. c)
end
for b, c in ipairs({
	"modifier_abyss_auto_pickup",
	"modifier_abyss_event_target_indicator",
	"modifier_abyss_flash",
	"modifier_activity_modifiers",
	"modifier_ai_disabled",
	"modifier_arrow_target",
	"modifier_boss_custom",
	"modifier_breakable_building",
	"modifier_common",
	"modifier_courier",
	"modifier_custom_thinker",
	"modifier_dash",
	"modifier_demo_dummy",
	"modifier_dungeon_cutter_saw_unit",
	"modifier_dungeon_sand_tornado",
	"modifier_elite",
	"modifier_enter_gate",
	"modifier_events",
	"modifier_face_move",
	"modifier_face_retreat",
	"modifier_first_dungeon_guide",
	"modifier_fishing",
	"modifier_hero",
	"modifier_hero_npc",
	"modifier_huge_damage",
	"modifier_knockback_custom",
	"modifier_loading_screen",
	"modifier_mirror_spawn",
	"modifier_move_to_attack_position",
	"modifier_no_health_bar",
	"modifier_passive_cast",
	"modifier_respawn",
	"modifier_shield",
	"modifier_simulate_cast",
	"modifier_summon_disabled",
	"modifier_tracing_support",
	"modifier_trap_thinker",
	"modifier_tutorial_stun",
}) do
	require("modifiers.framework." .. c)
end
for b, c in ipairs({
	"modifier_hunt_calm",
	"modifier_hunt_energy_orb",
	"modifier_hunt_field_unit",
	"modifier_hunt_freeze",
	"modifier_hunt_heavy",
	"modifier_hunt_lightning_zone",
	"modifier_hunt_tide",
}) do
	require("modifiers.hunt_boss." .. c)
end
for b, c in ipairs({ "modifier_debuff_1", "modifier_debuff_2", "modifier_debuff_3", "modifier_debuff_4" }) do
	require("modifiers.key." .. c)
end
for b, c in ipairs({
	"modifier_boss_axe",
	"modifier_boss_bloodseeker",
	"modifier_boss_earthshaker",
	"modifier_boss_grimstroke",
	"modifier_boss_jakiro",
	"modifier_boss_shredder",
	"modifier_boss_skeleton_king",
	"modifier_boss_treant",
	"modifier_breakable",
	"modifier_secret_gate",
	"modifier_spawn_bonus_book",
	"modifier_spawn_bonus_chest_gold",
	"modifier_spawn_bonus_chest_normal",
	"modifier_spawn_bonus_god_blade",
	"modifier_spawn_bonus_god_earth",
	"modifier_spawn_bonus_god_fire",
	"modifier_spawn_bonus_god_ice",
	"modifier_spawn_bonus_god_wind",
	"modifier_spawn_bonus_god_zues",
	"modifier_spawn_bonus_outpost",
	"modifier_spawn_bonus_smithy",
	"modifier_spawn_boss_lion",
	"modifier_spawn_boss_queen_of_pain",
	"modifier_spawn_interact_book",
	"modifier_spawn_interact_regen_well",
	"modifier_spawn_interact_wishing_pool",
	"modifier_spawn_skeleton",
}) do
	require("modifiers.spawn." .. c)
end
for b, c in ipairs({
	"modifier_arena_ai",
	"modifier_arena_free_hero",
	"modifier_arena_player_lock",
	"modifier_boss_shrink",
	"modifier_courier_explore_ui_lock",
	"modifier_fake_preview",
	"modifier_ignore_smoke",
	"modifier_sleep",
	"modifier_stagger",
}) do
	require("modifiers.utils." .. c)
end