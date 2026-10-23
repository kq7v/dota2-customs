--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().attack_abilities = {
	"skeleton_spear_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/attack/skeleton_spear_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_17",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityTag": "Ultimate"
	},
	"skeleton_hammer_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/attack/skeleton_hammer_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCastAnimation": "ACT_DOTA_GENERIC_CHANNEL_1_START",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityTag": "Ultimate"
	},
	"custom_hammer_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/attack/custom_hammer_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityTag": "Ultimate"
	},
	"custom_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/custom_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN | DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityTag": "Ultimate",
		"IsCastableWhileHidden": 1
	},
	"custom_aoe_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/attack/custom_aoe_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityTag": "Ultimate"
	},
	"custom_cleave_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/attack/custom_cleave_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_20",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityTag": "Ultimate"
	},
	"custom_summon_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/custom_summon_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityTag": "Ultimate"
	},
	"solthra_wisp_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/solthra/solthra_wisp_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityTag": "Ultimate"
	},
	"vexis_wisp_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vexis/vexis_wisp_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityTag": "Ultimate"
	},
	"baby_dragon_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/baby_dragon_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityTag": "Ultimate"
	},
	"super_baby_dragon_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/common/super_baby_dragon_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityTag": "Ultimate"
	},
	"skeleton_undying_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/attack/skeleton_undying_attack",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_20",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityTag": "Ultimate"
	}
};