--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().boss_abilities = {
	"boss_hellfire_blast": {
		"Note": "冥火爆击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_hellfire_blast",
		"AbilityTextureName": "skeleton_king/blistering_shade/skeleton_king_hellfire_blast",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_4",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"turn_rate": "60 30",
			"count": "1 3",
			"speed": 1200,
			"movespeed_pct": 50,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_mortal_strike": {
		"Note": "本命一击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_mortal_strike",
		"AbilityTextureName": "skeleton_king/arcana/skeleton_king_mortal_strike_arcana",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 16,
		"AbilityStartCooldown": 11,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"raze_damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_shock_wave": {
		"Note": "震荡波",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_shock_wave",
		"AbilityTextureName": "magnataur_shockwave_alt",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_2",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.4,
		"AbilityCooldown": "12 20",
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"count": "1 3",
			"speed": 800,
			"movespeed_pct": 40,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_hellfire_ring": {
		"Note": "冥火环绕",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_hellfire_ring",
		"AbilityTextureName": "ogre_magi/antipodeanabilityicons/ogre_magi_ignite",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_12",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 16,
		"AbilityStartCooldown": 11,
		"AbilityValues": {
			"count": "2 4",
			"speed": 140,
			"movespeed_pct": 30,
			"duration": "4 8",
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"debuff_duration": 2
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_attack_combo1": {
		"Note": "攻击1",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_attack_combo1",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCastRange": 350,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"boss_attack_combo2": {
		"Note": "攻击2",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_attack_combo2",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_9",
		"AbilityCastRange": 350,
		"AbilityCastPoint": 0.4,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"boss_attack_combo3": {
		"Note": "攻击3",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_attack_combo3",
		"AbilityTextureName": "attr_damage",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_14",
		"AbilityCastRange": 900,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"radius": 350,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"boss_reincarnation": {
		"Note": "重生",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_reincarnation",
		"AbilityTextureName": "skeleton_king/arcana/skeleton_king_reincarnation_arcana",
		"MaxLevel": 3,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_16",
		"AbilityCastPoint": 1.15,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityValues": {
			"reincarnation_time": 4,
			"count": 9,
			"radius": 600,
			"movespeed_pct": 40,
			"damage": {
				"value": 0,
				"+attack": 3
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_summon_skeleton": {
		"Note": "召唤骷髅",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_summon_skeleton",
		"AbilityTextureName": "skeleton_king/arcana/skeleton_king_bone_guard_arcana",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2_ALLY",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.4,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"health_cost_pct": 30,
			"skeleton_count": 6,
			"elite_chance": 15,
			"radius": 1500
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"boss_spike": {
		"Note": "突刺",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_spike",
		"AbilityTextureName": "skeleton_king_spectral_blade",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_0",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"split_count": 5,
			"speed": 600,
			"stun_duration": 0.7,
			"movespeed_pct": 20,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_kick": {
		"Note": "踢击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_skeleton_king/boss_kick",
		"AbilityTextureName": "tusk_walrus_kick",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_6",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.53,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"split_count": 5,
			"speed": 800,
			"stun_duration": 0.7,
			"movespeed_pct": 20,
			"duration": 2
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_queen_passive": {
		"Note": "无双魅魔",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_passive",
		"AbilityTextureName": "chaos_knight_chaos_strike",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"threshold": "75 50 25",
			"duration": 3.5
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"boss_queen_blood_feather": {
		"Note": "痛苦飞羽",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_blood_feather",
		"AbilityTextureName": "queen_of_pain/arcana/queenofpain_shadow_strike_alt1",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"distance": 700,
			"damage_p1": 200,
			"deg_p1": 270,
			"speed_p2": 650,
			"lifetime_p2": 4,
			"damage_p2": 10,
			"damage_tick_p2": 10,
			"duration_p1": 5,
			"duration_p2": 5,
			"slow_p2": -40,
			"angular": 70
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_queen_whirling_death": {
		"Note": "死亡旋风",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_whirling_death",
		"AbilityTextureName": "juggernaut/bladekeeper/juggernaut_blade_fury",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityValues": {
			"distance": 1500,
			"width": 180,
			"damage": 60,
			"speed": 1800,
			"speed_alter": 600,
			"distance_alter": 15000,
			"angular": 30
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_queen_phantom": {
		"Note": "女王幻影",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_phantom",
		"AbilityTextureName": "spectre_haunt",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_SPAWN",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 60,
		"AbilityStartCooldown": 42,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"boss_queen_blink": {
		"Note": "闪烁",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_blink",
		"AbilityTextureName": "queen_of_pain/arcana/queenofpain_blink_alt1",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": ".",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityValues": {
			"max_distance": 2000
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"boss_queen_scream": {
		"Note": "痛苦尖叫",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_scream",
		"AbilityTextureName": "queen_of_pain/arcana/queenofpain_scream_of_pain_alt1",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_INVALID",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.2,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityValues": {
			"damage_p1": 60,
			"damage_p2": 25,
			"radius_p1": 550,
			"radius_p2": 225,
			"count": 5,
			"distance": 350,
			"interval": 1,
			"cast_poin_p2": 0.6
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_queen_chain": {
		"Note": "痛苦锁链",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_chain",
		"AbilityTextureName": "warlock_fatal_bonds",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 60,
		"AbilityStartCooldown": 42,
		"AbilityValues": {
			"max_distance": 600
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC"
	},
	"boss_queen_sonic_wave": {
		"Note": "超声波",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_queen_of_pain/boss_queen_sonic_wave",
		"AbilityTextureName": "queen_of_pain/arcana/queenofpain_sonic_wave_alt1",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1800,
		"AbilityCastPoint": 1.2,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityValues": {
			"start_width": 150,
			"end_width": 550,
			"distance": 1800,
			"damage": 60,
			"duration": 15,
			"knock_back_distance": 250,
			"speed": 1200
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_PURE"
	},
	"darkwillow_1": {
		"Note": "荆棘迷宫",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/darkwillow",
		"AbilityTextureName": "dark_willow_bramble_maze",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"root_duration": 1,
			"radius": 200,
			"duration": 6,
			"skill_interval": 1,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AnimationPlaybackRate": 1,
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE"
	},
	"darkwillow_2": {
		"Note": "诅咒王冠",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/darkwillow",
		"AbilityTextureName": "dark_willow_cursed_crown",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"stun_duration": 2,
			"speed": 200,
			"angular_speed": 360,
			"radius": 300,
			"duration": 4,
			"skill_interval": 1.5,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.5,
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE"
	},
	"darkwillow_3": {
		"Note": "恐吓",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/darkwillow",
		"AbilityTextureName": "dark_willow_terrorize",
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1.5,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityValues": {
			"radius": 500,
			"count": 4,
			"skill_interval": 1.5,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.75,
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"queenofpain_1": {
		"Note": "闪烁突袭",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queen_of_pain/arcana/queenofpain_blink_alt1",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"delay": 0.7,
			"radius": 300,
			"skill_interval": 2,
			"backswing": 0.8
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 1,
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"queenofpain_2": {
		"Note": "尖刀舞",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queenofpain_shadow_strike",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 2000,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 18,
		"AbilityStartCooldown": 12,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"count": 6,
			"angle": 15,
			"interval": 1.835,
			"speed": 800,
			"width": 100,
			"skill_interval": 2
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"queenofpain_3": {
		"Note": "痛苦尖叫",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queenofpain_scream_of_pain",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastRange": 1600,
		"AbilityCastPoint": 0.9,
		"AbilityCooldown": 9,
		"AbilityStartCooldown": 6,
		"AbilityValues": {
			"count": 3,
			"wave": 4,
			"speed": 800,
			"width": 100,
			"skill_interval": 1.5,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"queenofpain_4": {
		"Note": "直线冲刺",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queenofpain_sanguine_blink",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": "11 8",
		"AbilityStartCooldown": 7,
		"AbilityValues": {
			"width": "200 240",
			"speed": "2000 2300",
			"damage": {
				"value": 0,
				"+attack": "1 1.5"
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"queenofpain_5": {
		"Note": "普通攻击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queenofpain_sanguine_shadow_strike",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": "8 6",
		"AbilityStartCooldown": 5,
		"AbilityValues": {
			"turn_rate": 30,
			"count": "1 3",
			"speed": 1200,
			"movespeed_pct": 50,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"queenofpain_6": {
		"Note": "旋转弹幕",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queen_of_pain/arcana/queenofpain_sonic_wave_alt1",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_2",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 18,
		"AbilityStartCooldown": 12,
		"AbilityValues": {
			"turn_rate": "60 30",
			"count": "1 3",
			"speed": 800,
			"movespeed_pct": 40,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"queenofpain_7": {
		"Note": "随机爆炸",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queenofpain_sanguine_scream_of_pain",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_4",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 22,
		"AbilityStartCooldown": 15,
		"AbilityValues": {
			"count": 1,
			"radius": 300,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityChannelTime": 3.4
	},
	"queenofpain_8": {
		"Note": "三连闪烁",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queen_of_pain/ti8_immortal_weapon/queenofpain_shadow_strike_immortal",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 22,
		"AbilityStartCooldown": 15,
		"AbilityValues": {
			"count": 1,
			"radius": 300,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"queenofpain_9": {
		"Note": "环形超声波",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queenofpain_sonic_wave",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_8",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 2,
		"AbilityCooldown": 34,
		"AbilityStartCooldown": 23,
		"AbilityValues": {
			"count": 1,
			"radius": 300,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"queenofpain_10": {
		"Note": "抽鞭子",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/queenofpain",
		"AbilityTextureName": "queen_of_pain/ti8_immortal_weapon/queenofpain_shadow_strike_immortal_purple",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_11",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityValues": {
			"radius": 100,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"siren_1": {
		"Note": "双鱼斩",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/siren",
		"AbilityTextureName": "kez_echo_slash",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CANCEL_SIREN_SONG",
		"AbilityCastRange": 1800,
		"AbilityCastPoint": 0.94,
		"AbilityCooldown": 4,
		"AbilityStartCooldown": 2,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"skill_interval": 1,
			"width": 300,
			"speed": 1800
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.5,
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"siren_2": {
		"Note": "双鱼连击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/siren",
		"AbilityTextureName": "earthshaker/sltv__earthshaker_ability_icons/earthshaker_enchant_totem",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastPoint": 1.5,
		"AbilityCooldown": 4,
		"AbilityStartCooldown": 2,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"width": 200,
			"distance": 1000,
			"repeat": 2,
			"interval": 1.5,
			"cast_point": 1,
			"motion_duration": 0.2,
			"skill_interval": 1.5
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 1,
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"siren_3": {
		"Note": "潮汐波",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/siren",
		"AbilityTextureName": "earthshaker/deep_magma/deep_magma_10th/deep_magma_10th_fissure",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_GENERIC_CHANNEL_1",
		"AbilityCastRange": 1500,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityValues": {
			"count": 5,
			"speed": 1200,
			"width": 600,
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"radius": 350,
			"distance": 2400,
			"duration": 10,
			"warn_time": 1,
			"interval": 3,
			"skill_interval": 1.5
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 1,
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityChannelTime": 6
	},
	"magma_earthshaker_1": {
		"Note": "强化图腾",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "earthshaker_enchant_totem",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_4",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.17,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"stun_duration": 1.4,
			"radius": 450,
			"fissure_damage": {
				"value": 0,
				"+attack": 2
			},
			"fissure_width": 250,
			"fissure_totem_delay": 1,
			"fissure_totem_radius": 350,
			"fissure_totem_damage": {
				"value": 0,
				"+attack": 2
			},
			"fissure_limit_totem": 8,
			"totem_duration": 12,
			"skill_interval": 2
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"magma_earthshaker_2": {
		"Note": "打击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "earthshaker/sltv__earthshaker_ability_icons/earthshaker_enchant_totem",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_ATTACK_EVENT",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2.6
			},
			"width": 200,
			"move_duration": 0.5,
			"bounce": 4,
			"skill_interval": 1
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.5,
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"magma_earthshaker_3": {
		"Note": "裂地沟壑",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "earthshaker/deep_magma/deep_magma_10th/deep_magma_10th_fissure",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.5,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityValues": {
			"count": 4,
			"fissure_width": 250
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.5,
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"magma_earthshaker_4": {
		"Note": "落石",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "elder_titan_echo_stomp",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_TELEPORT",
		"AbilityCastRange": 1500,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityValues": {
			"radius": 250,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.67,
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityChannelTime": 8
	},
	"magma_earthshaker_5": {
		"Note": "杂技",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "earth_spirit/jade_reckoning/earth_spirit_rolling_boulder",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_TAUNT",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"magma_earthshaker_6": {
		"Note": "三连击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "earthshaker/earthshaker_arcana/earthshaker_enchant_totem_alt2",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"distance": 600
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"magma_earthshaker_7": {
		"Note": "召唤图腾",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/magma_earthshaker",
		"AbilityTextureName": "earth_spirit_stone_caller",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_6",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_bloodseeker_1": {
		"Note": "直线攻击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_bloodseeker/boss_bloodseeker_1",
		"AbilityTextureName": "bloodseeker_bloodrage",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_1",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 0.9,
		"AbilityCooldown": 10,
		"AbilityStartCooldown": 7,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"width": 150
		}
	},
	"boss_bloodseeker_2": {
		"Note": "血祭",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_bloodseeker/boss_bloodseeker_2",
		"AbilityTextureName": "bloodseeker_blood_bath",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_6",
		"AbilityCastRange": 1800,
		"AbilityCastPoint": 0.7,
		"AbilityCooldown": 22,
		"AbilityStartCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.2
			},
			"radius": 250,
			"count": 4
		}
	},
	"boss_bloodseeker_3": {
		"Note": "冲刺三连击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_bloodseeker/boss_bloodseeker_3",
		"AbilityTextureName": "bloodseeker_sanguivore",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 18,
		"AbilityStartCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.3
			},
			"width": 150,
			"distance": 250
		}
	},
	"boss_bloodseeker_4": {
		"Note": "血色风暴",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_bloodseeker/boss_bloodseeker_4",
		"AbilityTextureName": "juggernaut/bladekeeper/juggernaut_blade_fury",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_6",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 350,
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"duration": 4
		}
	},
	"boss_shredder_1": {
		"Note": "召唤树木",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_shredder/boss_shredder_1",
		"AbilityTextureName": "furion_sprout",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"tree_limit": 8,
			"treant_limit": 5
		}
	},
	"boss_shredder_2": {
		"Note": "发射钩爪",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_shredder/boss_shredder_2",
		"AbilityTextureName": "shredder_timber_chain",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.4,
		"AbilityCooldown": 4,
		"AbilityStartCooldown": 2,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"speed": 1400
		},
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_INVULNERABLE"
	},
	"boss_shredder_3": {
		"Note": "死亡旋风",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_shredder/boss_shredder_3",
		"AbilityTextureName": "shredder_whirling_death",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 400,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.2,
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"radius": 600
		}
	},
	"boss_shredder_4": {
		"Note": "飞锯",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_shredder/boss_shredder_4",
		"AbilityTextureName": "shredder_chakram",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_GENERIC_CHANNEL_1",
		"AbilityCastRange": 1800,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityChannelTime": 5.6,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"radius": 200,
			"distance": 1800
		}
	},
	"boss_shredder_5": {
		"Note": "喷火",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_shredder/boss_shredder_5",
		"AbilityTextureName": "shredder_flamethrower",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastRange": 1800,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AnimationPlaybackRate": 0.2,
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 0.6
			},
			"radius": 300,
			"duration": 5
		}
	},
	"boss_axe_1": {
		"Note": "反击螺旋",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_1",
		"AbilityTextureName": "axe_counter_helix",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_1",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 250,
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"speed": 900
		}
	},
	"boss_axe_2": {
		"Note": "攻击1",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_2",
		"AbilityTextureName": "axe_culling_blade",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_3",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"radius": 800
		}
	},
	"boss_axe_3": {
		"Note": "冲刺跳劈",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_3",
		"AbilityTextureName": "axe_berserkers_call",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.2,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"count": 1,
			"speed": 800,
			"movespeed_pct": 40,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		}
	},
	"boss_axe_4": {
		"Note": "连续跳劈",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_4",
		"AbilityTextureName": "axe_berserkers_call",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_5",
		"AbilityCastRange": 1000,
		"AbilityCastPoint": 0.6,
		"AbilityCooldown": 0,
		"AbilityStartCooldown": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"wave_damage": {
				"value": 0,
				"+attack": 1
			},
			"radius": 300
		}
	},
	"boss_grimstroke_1": {
		"Note": "右手弹幕",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_grimstroke/boss_grimstroke_1",
		"AbilityTextureName": "shadow_demon_shadow_poison",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_1",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.8,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"speed": 900
		}
	},
	"boss_grimstroke_2": {
		"Note": "散射弹幕",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_grimstroke/boss_grimstroke_2",
		"AbilityTextureName": "shadow_demon/immortal/shadow_demon_shadow_poison",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_3",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.7,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"speed": 900
		}
	},
	"boss_grimstroke_3": {
		"Note": "位移",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_grimstroke/boss_grimstroke_3",
		"AbilityTextureName": "grimstroke_ink_creature",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_5",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.2,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"speed": 900
		}
	},
	"boss_grimstroke_4": {
		"Note": "召唤墨魂",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_grimstroke/boss_grimstroke_4",
		"AbilityTextureName": "grimstroke_dark_portrait",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_6",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 0.3,
		"AbilityCooldown": 30,
		"AbilityStartCooldown": 21,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_grimstroke_5": {
		"Note": "持续轰炸",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_grimstroke/boss_grimstroke_5",
		"AbilityTextureName": "shadow_demon_menace",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 20,
		"AbilityStartCooldown": 14,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityChannelTime": 6,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"radius": 130,
			"speed": 900,
			"count": "2 3"
		}
	},
	"boss_grimstroke_6": {
		"Note": "绝笔",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_grimstroke/boss_grimstroke_6",
		"AbilityTextureName": "grimstroke_dark_artistry",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_8",
		"AbilityCastRange": 1800,
		"AbilityCastPoint": 0.9,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"speed": 1800,
			"radius": 150,
			"count": "1 2"
		}
	},
	"boss_lion_1": {
		"Note": "吸蓝",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_lion/boss_lion_1",
		"AbilityTextureName": "lion/demon_drain/lion_mana_drain",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 0.8,
		"AbilityValues": {
			"move_speed": 300,
			"turn_rate": 300,
			"duration": 5,
			"radius": 150,
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"mana": 6,
			"tick_interval": 0.5
		}
	},
	"boss_lion_2": {
		"Note": "地刺",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_lion/boss_lion_2",
		"AbilityTextureName": "lion_impale",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_11",
		"AbilityCooldown": 14,
		"AbilityStartCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastRange": 800,
		"AbilityCastPoint": 1,
		"AbilityValues": {
			"width": 125,
			"duration": 1.4,
			"count": "1 3",
			"speed": 1600,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		}
	},
	"boss_lion_3": {
		"Note": "三连击",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_lion/boss_lion_3",
		"AbilityTextureName": "lion_fist_of_death",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_13",
		"AbilityCastRange": 600,
		"AbilityCastPoint": 0.9,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"width": 150,
			"distance": 250
		}
	},
	"boss_lion_4": {
		"Note": "2连弹幕",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_lion/boss_lion_4",
		"AbilityTextureName": "skywrath_mage_arcane_bolt_alt1",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_17",
		"AbilityCastRange": 1600,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 10,
		"AbilityStartCooldown": 7,
		"AbilityValues": {
			"count": "5 7",
			"wave": 2,
			"speed": 600,
			"width": 75,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL"
	},
	"boss_lion_5": {
		"Note": "死亡一指",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_lion/boss_lion_5",
		"AbilityTextureName": "lion/dungeon_poacher/dungeon_poacher_finger_of_death",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_20",
		"AbilityCastRange": 1000,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 5,
		"AbilityStartCooldown": 3,
		"AbilityValues": {
			"width": 150,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityChannelTime": 2.8
	},
	"boss_treant_1": {
		"Note": "自然卷握",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_1",
		"AbilityTextureName": "treant_natures_grasp",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"duration": 4,
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"radius": 100
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.4,
		"AbilityCastRange": 1200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"boss_treant_2": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_2",
		"AbilityTextureName": "treant_living_armor",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1.5
			},
			"count": "2 3",
			"radius": 250,
			"radius2": 500,
			"radius3": 750,
			"treant_limit": 5
		},
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_1",
		"AbilityDamageType": "DAMAGE_TYPE_PHYSICAL",
		"AbilityCastPoint": 1,
		"AbilityCastRange": 300,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"boss_treant_3": {
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_3",
		"AbilityTextureName": "treant_overgrowth",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 16,
		"AbilityStartCooldown": 11,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"count": "2 3",
			"radius": 400,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AnimationPlaybackRate": 0.67,
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 0,
		"AbilityCastRange": 1500,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityChannelTime": 3
	},
	"boss_treant_4": {
		"Note": "树甲",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_4",
		"AbilityTextureName": "treant_eyes_in_the_forest",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_GENERIC_CHANNEL_1",
		"AbilityCastRange": 250,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 30,
		"AbilityStartCooldown": 21,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_INVULNERABLE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityChannelTime": 7.87,
		"AbilityValues": {
			"speed": 1400,
			"heal": {
				"value": 0,
				"+health": 0.007
			}
		}
	},
	"boss_treant_5": {
		"Note": "抓树投掷",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_5",
		"AbilityTextureName": "tiny_tree_grab",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_6",
		"AbilityCastRange": 250,
		"AbilityCastPoint": 0.6,
		"AbilityCooldown": 10,
		"AbilityStartCooldown": 7,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET|DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_INVULNERABLE",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"speed": 1400,
			"heal": {
				"value": 0,
				"+health": 0.007
			}
		}
	},
	"boss_treant_6": {
		"Note": "投掷",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_6",
		"AbilityTextureName": "tiny_toss_tree",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCastRange": 1600,
		"AbilityCastPoint": 0.5,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"radius": 300,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		}
	},
	"boss_treant_7": {
		"Note": "树木连掷",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_treant/boss_treant_7",
		"AbilityTextureName": "tiny_tree_channel",
		"MaxLevel": 3,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_DOTA_TELEPORT",
		"AbilityCastRange": 1600,
		"AbilityCastPoint": 0,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET|DOTA_ABILITY_BEHAVIOR_CHANNELLED",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityChannelTime": 3.73,
		"AbilityValues": {
			"width": 120,
			"speed": "900 1200 1500",
			"interval": "1 0.75 0.5",
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		}
	},
	"boss_gem_1": {
		"Note": "震荡波",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_gem/boss_gem_1",
		"AbilityTextureName": "magnataur_shockwave_alt",
		"MaxLevel": 2,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_2",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.4,
		"AbilityCooldown": "12 20",
		"AbilityStartCooldown": 8,
		"AbilityValues": {
			"count": "1 3",
			"speed": 800,
			"movespeed_pct": 40,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL"
	},
	"boss_gem_2": {
		"Note": "攻击1",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_2",
		"AbilityTextureName": "axe_culling_blade",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_3",
		"AbilityCastRange": 1200,
		"AbilityCastPoint": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"radius": 800
		}
	},
	"boss_gem_3": {
		"Note": "冲刺跳劈",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_3",
		"AbilityTextureName": "axe_berserkers_call",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_7",
		"AbilityCastRange": 1500,
		"AbilityCastPoint": 1.2,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"count": 1,
			"speed": 800,
			"movespeed_pct": 40,
			"duration": 2,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		}
	},
	"boss_gem_4": {
		"Note": "连续跳劈",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/boss/boss_axe/boss_axe_4",
		"AbilityTextureName": "axe_berserkers_call",
		"MaxLevel": 1,
		"AnimationIgnoresModelScale": 1,
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_5",
		"AbilityCastRange": 1000,
		"AbilityCastPoint": 0.6,
		"AbilityCooldown": 0,
		"AbilityStartCooldown": 0,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 2
			},
			"wave_damage": {
				"value": 0,
				"+attack": 1
			},
			"radius": 300
		}
	}
};