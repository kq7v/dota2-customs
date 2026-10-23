--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().enemy_abilities = {
	"enemy_explosion": {
		"Note": "自爆",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_explosion",
		"AbilityTextureName": "pudge/ti7_pudge_immortal/pudge_rot_alt",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_BOTH",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"radius": 200,
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"delay": 1,
			"ally_damage": {
				"value": 0,
				"+health": 0.2
			}
		},
		"AbilityDamageType": "DAMAGE_TYPE_PURE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"enemy_self_explosion": {
		"Note": "自爆",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_self_explosion",
		"AbilityTextureName": "techies_suicide",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"radius": 200,
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"delay": 0.5
		},
		"AbilityDamageType": "DAMAGE_TYPE_PURE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"enemy_division": {
		"Note": "分裂",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_division",
		"AbilityTextureName": "mud_golem_rock_destroy",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"count": 2
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"enemy_charge_slash": {
		"Note": "冲锋",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_charge_slash",
		"AbilityTextureName": "juggernaut/bladekeeper/juggernaut_blade_dance",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"movespeed_min": 300,
			"movespeed_max": 1000,
			"duration": 2,
			"distance": 600,
			"width": 175,
			"speed": 1200,
			"damage": {
				"value": 0,
				"+attack": 0.5
			},
			"slash_count": 3,
			"slash_rate": 0.75,
			"slash_cast_point": 0.37
		},
		"AbilityCastRange": 1500,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE"
	},
	"enemy_charge_dismember": {
		"Note": "冲锋-肢解",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_charge_dismember",
		"AbilityTextureName": "pudge_dismember",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"movespeed": 700,
			"duration": 2,
			"dismember_duration": 3,
			"ticks": 6,
			"pull_distance_limit": 150,
			"animation_rate": 1.5,
			"pull_units_per_second": 75,
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"heal": 20
		},
		"AbilityCastRange": 1500,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE"
	},
	"enemy_split_attack": {
		"Note": "分裂箭",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_split_attack",
		"AbilityTextureName": "clinkz_strafe",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"split_count": 1
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"enemy_summon_archer": {
		"Note": "燃烧之军",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_summon_archer",
		"AbilityTextureName": "clinkz_burning_army",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"army_count": 2
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityCastPoint": 0.3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"enemy_split_attack_elite": {
		"Note": "精英分裂箭",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_split_attack_elite",
		"AbilityTextureName": "clinkz_strafe",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"split_count": 2
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"enemy_life_drain_elite": {
		"Note": "治疗",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_life_drain_elite",
		"AbilityTextureName": "pugna_life_drain",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"speed": 300,
			"angular_speed": 60,
			"split_count": 1,
			"heal": 30,
			"radius": 125
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_4",
		"AbilityChannelTime": 10,
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastRange": 1500,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT | DOTA_ABILITY_BEHAVIOR_CHANNELLED"
	},
	"enemy_tomb": {
		"Note": "墓碑",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_tomb",
		"AbilityTextureName": "undying_tombstone",
		"AnimationIgnoresModelScale": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"interval": 6
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"enemy_meat_hook": {
		"Note": "肉钩",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_meat_hook",
		"AbilityTextureName": "pudge_meat_hook",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"hook_speed": 1200,
			"hook_width": 100,
			"hook_distance": 800,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_22",
		"AbilityCastPoint": 0.9,
		"AbilityCastRange": 800,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_wave_motion": {
		"Note": "冲刺",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_wave_motion",
		"AbilityTextureName": "arc_warden/ti9_immortal_shoulders/arc_warden_spark_wraith_immortal",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 5,
		"AbilityStartCooldown": 3,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"speed": 1200,
			"width": 100,
			"duration": 1,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_SPAWN",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.2,
		"AbilityCastRange": 600,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_bomb": {
		"Note": "炸弹",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_bomb",
		"AbilityTextureName": "techies_sticky_bomb",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"duration": 2,
			"radius": 200,
			"speed": 500,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_6",
		"AbilityCastPoint": 0.2,
		"AnimationPlaybackRate": 1,
		"AbilityCastRange": 1000,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_suicide": {
		"Note": "起飞",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_suicide",
		"AbilityTextureName": "techies_suicide",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 7,
		"AbilityStartCooldown": 4,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"radius": 300,
			"speed": 1000,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 1,
		"AbilityCastRange": 1000,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_land_mines": {
		"Note": "地雷",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_land_mines",
		"AbilityTextureName": "techies_land_mines",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"radius": 280,
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"self_bomb_time": 10,
			"proximity_threshold": 1,
			"warning_time": 1
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AnimationPlaybackRate": 1,
		"AbilityCastRange": 400,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"enemy_onslaught": {
		"Note": "冲撞-突",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_onslaught",
		"AbilityTextureName": "arc_warden/ti9_immortal_shoulders/arc_warden_spark_wraith_immortal",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 4,
		"AbilityStartCooldown": 2,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"speed": 800,
			"width": 100,
			"duration": 1,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.2,
		"AbilityCastRange": 800,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_boss_earthshaker_aftershock": {
		"Note": "余震",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_boss_earthshaker_aftershock",
		"AbilityTextureName": "earthshaker_aftershock",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 2,
		"AbilityStartCooldown": 1,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"stagger_duration": 1
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_2",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.5,
		"AbilityCastRange": 400,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"enemy_boss_earthshaker_fissure": {
		"Note": "沟壑",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_boss_earthshaker_fissure",
		"AbilityTextureName": "earthshaker_fissure",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 6,
		"AbilityStartCooldown": 4,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"fissure_duration": 5,
			"fissure_radius": 150,
			"stun_duration": 1,
			"count": "1 3",
			"angle": 45,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.7,
		"AbilityCastRange": 1400,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_dragonfire": {
		"Note": "龙炎火球",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_dragonfire",
		"AbilityTextureName": "black_dragon_fireball",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 12,
		"AbilityStartCooldown": 8,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"duration": 7,
			"damage": {
				"value": 0,
				"+attack": 0.5
			},
			"radius": 300,
			"interval": 0.5,
			"debuff_duration": 1
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 1,
		"AbilityCastRange": 1000,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_frog_shield": {
		"Note": "青蛙护盾",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_frog_shield",
		"AbilityTextureName": "frogmen_water_bubble_large",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"shield": {
				"value": 0,
				"+health": 0.5
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 0.5,
		"AbilityCastRange": 600,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"
	},
	"enemy_natures_grasp": {
		"Note": "自然卷握",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_natures_grasp",
		"AbilityTextureName": "treant_natures_grasp",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 3,
		"AbilityStartCooldown": 2,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"duration": 7,
			"damage": {
				"value": 0,
				"+attack": 1
			},
			"radius": 100
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_3",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.4,
		"AbilityCastRange": 600,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_split_ice_bomb": {
		"Note": "分裂冰弹",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_split_ice_bomb",
		"AbilityTextureName": "ice_shaman_incendiary_bomb",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 5,
		"AbilityStartCooldown": 3,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"split": 3,
			"distance": 300,
			"duration": 1.5,
			"radius": 80
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityCastPoint": 0.3,
		"AnimationPlaybackRate": 1,
		"AbilityCastRange": 1200,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET | DOTA_ABILITY_BEHAVIOR_CHANNELLED"
	},
	"enemy_frost_shield": {
		"Note": "寒霜护盾",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_frost_shield",
		"AbilityTextureName": "frogmen_water_bubble_large",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 8,
		"AbilityStartCooldown": 5,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"shield": {
				"value": 0,
				"+health": 0.5
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_1",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 0.5,
		"AbilityCastRange": 600,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET"
	},
	"enemy_snow_pounce": {
		"Note": "北极狼扑咬",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_snow_pounce",
		"AbilityTextureName": "arc_warden/ti9_immortal_shoulders/arc_warden_spark_wraith_immortal",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 5,
		"AbilityStartCooldown": 3,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"speed": 1200,
			"width": 100,
			"duration": 1,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"AbilityCastAnimation": "ACT_DOTA_CAST_ABILITY_5",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.2,
		"AbilityCastRange": 600,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	},
	"enemy_scorpion_strike": {
		"Note": "蝎子尾刺",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/enemy_abilities/enemy_scorpion_strike",
		"AbilityTextureName": "treant_natures_grasp",
		"AnimationIgnoresModelScale": 1,
		"AbilityCooldown": 13,
		"AbilityStartCooldown": 9,
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityUnitTargetFlags": "DOTA_UNIT_TARGET_FLAG_NONE",
		"AbilityValues": {
			"width": 70,
			"duration": 0.25
		},
		"AbilityCastAnimation": "ACT_SCRIPT_CUSTOM_0",
		"AbilityDamageType": "DAMAGE_TYPE_MAGICAL",
		"AbilityCastPoint": 1,
		"AnimationPlaybackRate": 0.4,
		"AbilityCastRange": 500,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT"
	}
};