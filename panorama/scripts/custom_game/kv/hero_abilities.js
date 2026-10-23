--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().hero_abilities = {
	"vespera_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vespera/vespera_attack",
		"AbilityTextureName": "vespera_attack",
		"MaxLevel": 1,
		"AbilityTag": "Attack",
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityValues": {
			"last_hit_damage": 200,
			"combo_count": 3
		}
	},
	"vespera_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vespera/vespera_1",
		"AbilityTextureName": "vespera_1",
		"MaxLevel": 1,
		"AbilityTag": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 1.6,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityValues": {
			"damage": 20,
			"suriken_count": 1,
			"distance": {
				"value": 600,
				"+bullet_range": 1
			},
			"width": 100,
			"out_duration": 0.3,
			"return_duration": 0.2,
			"angle_per_suriken": 15,
			"reduce_move_speed": 200,
			"reduce_duration": 0.5,
			"delay": 0.3
		}
	},
	"vespera_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vespera/vespera_2",
		"AbilityTextureName": "vespera_2",
		"MaxLevel": 1,
		"AbilityTag": "Dodge",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityCooldown": 1.4,
		"AbilityValues": {
			"distance": 300,
			"duration": 0.15
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"vespera_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vespera/vespera_3",
		"AbilityTextureName": "vespera_3",
		"MaxLevel": 1,
		"AbilityTag": "Defense",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityCooldown": 3,
		"AbilityValues": {
			"reduce_damage": 70,
			"duration": 0.5,
			"movespeed": 250,
			"movespeed_duration": 1
		},
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"vespera_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vespera/vespera_4",
		"AbilityTextureName": "vespera_4",
		"MaxLevel": 1,
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"AbilityTag": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityCastPoint": 0.12,
		"AbilityCooldown": 6,
		"AbilityManaCost": 100,
		"AbilityValues": {
			"suriken_count": {
				"value": 8,
				"_split_count": 1
			},
			"delay": 1
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4"
	},
	"vexis_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vexis/vexis_1",
		"AbilityTextureName": "vexis_1",
		"MaxLevel": 1,
		"CustomAbilityType": "CUSTOM_TYPE_SPLIT",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING | DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityCastPoint": 0.4,
		"AbilityCooldown": 2,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityValues": {
			"damage": 40,
			"arrow_count": 1,
			"distance": {
				"value": 800,
				"+bullet_range": 1
			},
			"width": 125,
			"speed": 3000,
			"angle": 100,
			"min_factor": 0.1,
			"channel_duration": 0.2,
			"bounce_count": {
				"value": 0,
				"+bounce_count": 1
			}
		},
		"AbilityTag": "Skill"
	},
	"vexis_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vexis/vexis_2",
		"AbilityTextureName": "vexis_2",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IMMEDIATE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityCooldown": 3,
		"AbilityValues": {
			"distance": 300,
			"speed": 2100
		},
		"AbilityTag": "Dodge",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"vexis_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vexis/vexis_3",
		"AbilityTextureName": "vexis_3",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityCooldown": 4,
		"AbilityValues": {
			"movespeed": 400,
			"damage": 16,
			"distance": {
				"value": 800,
				"+bullet_range": 1
			},
			"duration": 0.24,
			"count": 6,
			"bounce_count": {
				"value": 0,
				"+bounce_count": 1
			}
		},
		"AbilityTag": "Defense",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"vexis_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vexis/vexis_4",
		"AbilityTextureName": "vexis_4",
		"MaxLevel": 1,
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityCooldown": 6,
		"AbilityManaCost": 100,
		"AbilityValues": {
			"damage": 20,
			"distance": {
				"value": 1000,
				"+bullet_range": 1
			},
			"bounce_count": {
				"value": 0,
				"+bounce_count": 1
			},
			"count": 8,
			"duration": 1
		},
		"AbilityTag": "Ultimate"
	},
	"vexis_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/vexis/vexis_attack",
		"AbilityTextureName": "vexis_attack",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityTag": "Attack",
		"AbilityValues": {
			"bounce_count": {
				"value": 0,
				"+bounce_count": 1
			},
			"bonus_damage": 0,
			"damage_amplify": -30,
			"max_stack": 1
		}
	},
	"solthra_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/solthra/solthra_1",
		"AbilityTextureName": "solthra_1",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCooldown": 3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityValues": {
			"damage": 12,
			"speed": 500,
			"distance": {
				"value": 1000,
				"+bullet_range": 1
			},
			"pulse_count": {
				"value": 4,
				"+split_count": 1
			},
			"width": 100,
			"angle": 60
		},
		"AbilityTag": "Skill"
	},
	"solthra_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/solthra/solthra_2",
		"AbilityTextureName": "solthra_2",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_IMMEDIATE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCooldown": 4,
		"AbilityValues": {
			"damage": 24,
			"distance": 600,
			"speed": 1800
		},
		"AbilityTag": "Dodge"
	},
	"solthra_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/solthra/solthra_3",
		"AbilityTextureName": "solthra_3",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_IMMEDIATE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": 10,
			"aura_radius": {
				"value": 600,
				"*aoe_amplify": 1
			},
			"interval": 0.5,
			"duration": 3,
			"shield": 60
		},
		"AbilityTag": "Defense",
		"AbilityCooldown": 6
	},
	"solthra_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/solthra/solthra_4",
		"AbilityTextureName": "solthra_4",
		"MaxLevel": 1,
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastRange": 900,
		"AbilityCooldown": 7,
		"AbilityManaCost": 100,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityValues": {
			"damage": 100,
			"radius": 400,
			"delay": 0.6
		},
		"AbilityTag": "Ultimate"
	},
	"solthra_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/solthra/solthra_attack",
		"AbilityTextureName": "solthra_attack",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityTag": "Attack",
		"AbilityValues": {
			"radius": 200,
			"damage": 24,
			"count": 1,
			"interval": 3
		}
	},
	"seraphon_1": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/seraphon/seraphon_1",
		"AbilityTextureName": "seraphon_1",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_NONE",
		"AbilityCastRange": 900,
		"AbilityCooldown": 5,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityValues": {
			"damage": 18,
			"speed": 1200,
			"radius": 600,
			"drop_time": 0.7,
			"count": {
				"value": 2,
				"+bounce_count": 1
			}
		},
		"AbilityTag": "Skill",
		"AbilityCastPoint": 0.15
	},
	"seraphon_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/seraphon/seraphon_2",
		"AbilityTextureName": "seraphon_2",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT|DOTA_ABILITY_BEHAVIOR_IMMEDIATE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityCooldown": 3,
		"AbilityValues": {
			"distance": 600,
			"shield": 30,
			"damage": 16,
			"knockback": 150,
			"duration": 0.2
		},
		"AbilityTag": "Dodge",
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityDamageType": "DAMAGE_TYPE_NONE"
	},
	"seraphon_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/seraphon/seraphon_3",
		"AbilityTextureName": "seraphon_3",
		"MaxLevel": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityCooldown": 5,
		"AbilityValues": {
			"damage": 18,
			"knockback": 150,
			"reduce_damage": 40,
			"shield": 50,
			"duration": 1.5
		},
		"AbilityTag": "Defense",
		"AbilityDamageType": "DAMAGE_TYPE_NONE"
	},
	"seraphon_4": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/seraphon/seraphon_4",
		"AbilityTextureName": "seraphon_4",
		"MaxLevel": 1,
		"AbilityType": "DOTA_ABILITY_TYPE_ULTIMATE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_NONE",
		"AbilityCastRange": 900,
		"AbilityCooldown": 13,
		"AbilityManaCost": 100,
		"AbilityValues": {
			"damage": 24,
			"shield": 12,
			"radius": {
				"value": 450,
				"*aoe_amplify": 1
			},
			"interval": 0.5,
			"duration": 3
		},
		"AbilityTag": "Ultimate",
		"AbilityCastPoint": 0.3,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4"
	},
	"seraphon_attack": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/heroes/seraphon/seraphon_attack",
		"AbilityTextureName": "seraphon_attack",
		"MaxLevel": 1,
		"AbilityCooldown": 0.1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE|DOTA_ABILITY_BEHAVIOR_AUTOCAST",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_BUILDING|DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityDamageType": "DAMAGE_TYPE_NONE",
		"AbilityTag": "Attack",
		"AbilityValues": {
			"require_count": 3,
			"last_hit_damage": 150
		}
	}
};