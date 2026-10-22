--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().boss = {
	"boss_skeleton_king": {
		"Name": "骷髅王",
		"Filter": "skeleton",
		"BaseClass": "npc_dota_creature",
		"Model": "models/skeleton_king.vmdl",
		"ModelScale": 1.75,
		"SoundSet": "Hero_SkeletonKing",
		"BGM": "SkeletonKing.Battle",
		"GameSoundsFile": "soundevents/game_sounds_heroes/game_sounds_skeletonking.vsndevts",
		"VoiceFile": "soundevents/voscripts/game_sounds_vo_skeleton_king.vsndevts",
		"Ability1": "boss_hellfire_blast",
		"Ability2": "boss_mortal_strike",
		"Ability3": "boss_shock_wave",
		"Ability4": "boss_summon_skeleton",
		"Ability5": "boss_spike",
		"Ability6": "boss_kick",
		"Ability7": "boss_attack_combo1",
		"Ability8": "boss_attack_combo2",
		"Ability9": "boss_attack_combo3",
		"Ability10": "boss_reincarnation",
		"Ability11": "boss_hellfire_ring",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 300,
		"StatusHealth": 3000,
		"StatusHealthRegen": 0,
		"StatusMana": 1000,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 2,
		"AttackAnimationPoint": 0.56,
		"AttackCapabilities": "DOTA_UNIT_CAP_MELEE_ATTACK",
		"AttackRange": 700,
		"IntroDuration": 5.5,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_skeleton_king",
		"BoundsHullName": "DOTA_HULL_SIZE_FILLER",
		"BoundsHullRadius": 96,
		"RingRadius": 90,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "boss",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 13456
				},
				"2": {
					"ItemDef": 13473
				},
				"3": {
					"ItemDef": 13569
				},
				"4": {
					"ItemDef": 13571
				},
				"5": {
					"ItemDef": 13743
				},
				"6": {
					"ItemDef": 13760
				}
			}
		}
	},
	"boss_darkwillow": {
		"Name": "邪影芳灵",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/dark_willow/dark_willow.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Dawnbreaker",
		"Ability1": "darkwillow_1",
		"Ability2": "darkwillow_2",
		"Ability3": "darkwillow_3",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 150,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.39,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 600,
		"BoundsHullName": "DOTA_HULL_SIZE_HUGE",
		"BehaviorTree": "boss_ability",
		"RingRadius": 60,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 12467
				},
				"2": {
					"ItemDef": 12468
				},
				"3": {
					"ItemDef": 12469
				},
				"4": {
					"ItemDef": 12470
				},
				"5": {
					"ItemDef": 12471
				}
			}
		}
	},
	"boss_queenofpain": {
		"Name": "痛苦女王",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_queenofpain/queenofpain_arcana.vmdl",
		"ModelScale": 1.4,
		"SoundSet": "Hero_QueenOfPain",
		"Ability1": "queenofpain_1",
		"Ability2": "queenofpain_2",
		"Ability3": "queenofpain_3",
		"Ability4": "queenofpain_4",
		"Ability5": "queenofpain_5",
		"Ability6": "queenofpain_6",
		"Ability7": "queenofpain_7",
		"Ability8": "queenofpain_8",
		"Ability9": "queenofpain_9",
		"Ability10": "queenofpain_10",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 200,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 600,
		"ProjectileModel": "particles/econ/items/queen_of_pain/qop_ti8_immortal/queen_ti8_shadow_strike.vpcf",
		"ProjectileSpeed": 1300,
		"IntroDuration": 5.5,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_queenofpain",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "boss",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 12930
				},
				"2": {
					"ItemDef": 13768
				},
				"3": {
					"ItemDef": 13769
				},
				"4": {
					"ItemDef": 13770
				}
			}
		}
	},
	"boss_siren": {
		"Name": "娜迦",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/siren/siren.vmdl",
		"ModelScale": 2.2,
		"SoundSet": "Hero_NagaSiren",
		"Ability1": "siren_1",
		"Ability2": "siren_2",
		"Ability3": "siren_3",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 300,
		"ProjectileModel": "particles/econ/items/queen_of_pain/qop_ti8_immortal/queen_ti8_shadow_strike.vpcf",
		"ProjectileSpeed": 1300,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"BehaviorTree": "boss_ability",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "ti8",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 9637
				},
				"2": {
					"ItemDef": 13790
				},
				"3": {
					"ItemDef": 22796
				},
				"4": {
					"ItemDef": 9486
				},
				"5": {
					"ItemDef": 9488
				}
			}
		}
	},
	"boss_1_dawnbreaker": {
		"Name": "破晓",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/dawnbreaker/dawnbreaker.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Dawnbreaker",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 150,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 250,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.39,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 90,
		"BoundsHullName": "DOTA_HULL_SIZE_HUGE",
		"BehaviorTree": "boss_dawnbreaker",
		"RingRadius": 60,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 25714
				},
				"2": {
					"ItemDef": 25715
				},
				"3": {
					"ItemDef": 25716
				},
				"4": {
					"ItemDef": 25717
				},
				"5": {
					"ItemDef": 25718
				}
			}
		},
		"AttackRangeActivityModifiers": {
			"attack_short_range": 0,
			"attack_long_range": 80
		},
		"MovementSpeedActivityModifiers": {
			"walk": 0,
			"run": 350,
			"run_fast": 440
		},
		"AttackSpeedActivityModifiers": {
			"fast": 180
		},
		"animation_transitions": {
			"ACT_DOTA_RUN": {
				"regular": 0.3
			},
			"ACT_DOTA_IDLE": {
				"regular": 0.4
			}
		}
	},
	"boss_skeleton_mage": {
		"Name": "BOSS-骷髅法师",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/pugna/pugna.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Pugna",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 260,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 3,
		"AttackAnimationPoint": 0.5,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 1000,
		"ProjectileModel": "particles/units/heroes/hero_pugna/pugna_base_attack.vpcf",
		"ProjectileSpeed": 600,
		"ProjectileType": "PROJECTILE_TYPE_LINEAR",
		"SpawnModifier": "modifier_spawn_skeleton",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"BehaviorTree": "boss_pugna",
		"RingRadius": 90,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 5992
				},
				"2": {
					"ItemDef": 5994
				},
				"3": {
					"ItemDef": 5996
				},
				"4": {
					"ItemDef": 5997
				},
				"5": {
					"ItemDef": 6000
				},
				"6": {
					"ItemDef": 6001
				}
			}
		}
	},
	"boss_earthshaker": {
		"Name": "BOSS-撼地者",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/earthshaker/earthshaker.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Earthshaker",
		"Ability1": "enemy_boss_earthshaker_aftershock",
		"Ability2": "enemy_boss_earthshaker_fissure",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 260,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.8,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 60,
		"ProjectileType": "PROJECTILE_TYPE_LINEAR",
		"SpawnModifier": "modifier_spawn_skeleton",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"BehaviorTree": "boss_earthshaker",
		"RingRadius": 90,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 18244
				},
				"2": {
					"ItemDef": 18246
				},
				"3": {
					"ItemDef": 18247
				},
				"4": {
					"ItemDef": 18249
				}
			}
		}
	},
	"boss_deep_magma_earthshaker": {
		"Name": "BOSS-深渊撼地者",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_earth_shaker/boss_earth_shaker.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Earthshaker",
		"BGM": "EarthShaker.Battle",
		"Ability1": "magma_earthshaker_1",
		"Ability2": "magma_earthshaker_2",
		"Ability3": "magma_earthshaker_3",
		"Ability4": "magma_earthshaker_4",
		"Ability5": "magma_earthshaker_5",
		"Ability6": "magma_earthshaker_6",
		"Ability7": "magma_earthshaker_7",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 260,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.8,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileType": "PROJECTILE_TYPE_LINEAR",
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_earthshaker",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 90,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "totem_roll_gesture",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 27158
				},
				"2": {
					"ItemDef": 27159
				},
				"3": {
					"ItemDef": 27161
				},
				"4": {
					"ItemDef": 29936
				}
			}
		}
	},
	"boss_jakiro": {
		"Name": "双头龙",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_jakiro/boss_jakiro.vmdl",
		"ModelScale": 1.4,
		"SoundSet": "Hero_Jakiro",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 260,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 3,
		"AttackAnimationPoint": 0.5,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 1000,
		"ProjectileModel": "particles/units/heroes/hero_jakiro/jakiro_base_attack.vpcf",
		"ProjectileSpeed": 600,
		"ProjectileType": "PROJECTILE_TYPE_LINEAR",
		"SpawnModifier": "modifier_boss_jakiro",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 180,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 28227
				},
				"2": {
					"ItemDef": 28228
				},
				"3": {
					"ItemDef": 14949
				},
				"4": {
					"ItemDef": 28230
				}
			}
		}
	},
	"boss_bloodseeker": {
		"Name": "血魔",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_bloodseeker/boss_bloodseeker.vmdl",
		"ModelScale": 2.2,
		"SoundSet": "Hero_BloodSeeker",
		"BGM": "BloodSeeker.Battle",
		"Ability1": "boss_bloodseeker_1",
		"Ability2": "boss_bloodseeker_2",
		"Ability3": "boss_bloodseeker_3",
		"Ability4": "boss_bloodseeker_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_bloodseeker",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 5505
				},
				"2": {
					"ItemDef": 5506
				},
				"3": {
					"ItemDef": 5508
				},
				"4": {
					"ItemDef": 5509
				},
				"5": {
					"ItemDef": 5510
				},
				"6": {
					"ItemDef": 5511
				},
				"7": {
					"ItemDef": 5512
				}
			}
		}
	},
	"boss_shredder": {
		"Name": "伐木机",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/shredder/shredder.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Shredder",
		"BGM": "Shredder.Battle",
		"Ability1": "boss_shredder_1",
		"Ability2": "boss_shredder_2",
		"Ability3": "boss_shredder_3",
		"Ability4": "boss_shredder_4",
		"Ability5": "boss_shredder_5",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 400,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_shredder",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 7430
				},
				"2": {
					"ItemDef": 7431
				},
				"3": {
					"ItemDef": 7744
				},
				"4": {
					"ItemDef": 8018
				},
				"5": {
					"ItemDef": 8019
				},
				"6": {
					"ItemDef": 8020
				}
			}
		}
	},
	"boss_axe": {
		"Name": "斧王",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_axe/boss_axe.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Axe",
		"BGM": "Axe.Battle",
		"Ability1": "boss_axe_1",
		"Ability2": "boss_axe_2",
		"Ability3": "boss_axe_3",
		"Ability4": "boss_axe_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_axe",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 36136
				},
				"2": {
					"ItemDef": 36137
				},
				"3": {
					"ItemDef": 36138
				},
				"4": {
					"ItemDef": 36139
				},
				"5": {
					"ItemDef": 36140
				}
			}
		}
	},
	"boss_grimstroke": {
		"Name": "黑暗风鸢",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_grimstroke/boss_grimstroke.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Grimstroke",
		"BGM": "Grimstroke.Battle",
		"Ability1": "boss_grimstroke_1",
		"Ability2": "boss_grimstroke_2",
		"Ability3": "boss_grimstroke_3",
		"Ability4": "boss_grimstroke_4",
		"Ability5": "boss_grimstroke_5",
		"Ability6": "boss_grimstroke_6",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 350,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_grimstroke",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 13900
				},
				"2": {
					"ItemDef": 13901
				},
				"3": {
					"ItemDef": 13902
				},
				"4": {
					"ItemDef": 13903
				}
			}
		}
	},
	"boss_lion": {
		"Name": "Lion",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_lion/boss_lion.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Lion",
		"BGM": "Lion.Battle",
		"Ability1": "boss_lion_1",
		"Ability2": "boss_lion_2",
		"Ability3": "boss_lion_3",
		"Ability4": "boss_lion_4",
		"Ability5": "boss_lion_5",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_lion",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 25680
				},
				"2": {
					"ItemDef": 25681
				},
				"3": {
					"ItemDef": 25700
				},
				"4": {
					"ItemDef": 25701
				},
				"5": {
					"ItemDef": 25703
				}
			}
		}
	},
	"boss_treant": {
		"Name": "树精",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/treant_protector/treant_protector.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Treant",
		"BGM": "Axe.Battle",
		"Ability1": "boss_treant_1",
		"Ability2": "boss_treant_2",
		"Ability3": "boss_treant_3",
		"Ability4": "boss_treant_4",
		"Ability5": "boss_treant_5",
		"Ability6": "boss_treant_6",
		"Ability7": "boss_treant_7",
		"Ability8": "boss_shredder_1",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 200,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_treant",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "boss_treant",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 9901
				},
				"2": {
					"ItemDef": 19317
				},
				"3": {
					"ItemDef": 19318
				},
				"4": {
					"ItemDef": 19319
				}
			}
		}
	},
	"boss_gem": {
		"Name": "宝石守卫",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_golem/boss_golem.vmdl",
		"ModelScale": 1,
		"SoundSet": "Hero_Axe",
		"BGM": "Axe.Battle",
		"Ability1": "boss_gem_1",
		"Ability2": "boss_gem_2",
		"Ability3": "boss_gem_3",
		"Ability4": "boss_gem_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_spawn_boss_axe",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1
		}
	},
	"boss_gem_1": {
		"Name": "痛苦女王",
		"SpawnModifier": "modifier_boss_queenofpain",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_queenofpain/queenofpain_arcana.vmdl",
		"ModelScale": 1.4,
		"SoundSet": "Hero_QueenOfPain",
		"Ability1": "queenofpain_1",
		"Ability2": "queenofpain_2",
		"Ability3": "queenofpain_3",
		"Ability4": "queenofpain_4",
		"Ability5": "queenofpain_5",
		"Ability6": "queenofpain_6",
		"Ability7": "queenofpain_7",
		"Ability8": "queenofpain_8",
		"Ability9": "queenofpain_9",
		"Ability10": "queenofpain_10",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 200,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 600,
		"ProjectileModel": "particles/econ/items/queen_of_pain/qop_ti8_immortal/queen_ti8_shadow_strike.vpcf",
		"ProjectileSpeed": 1300,
		"IntroDuration": 5.5,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "boss",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 12930
				},
				"2": {
					"ItemDef": 13768
				},
				"3": {
					"ItemDef": 13769
				},
				"4": {
					"ItemDef": 13770
				}
			}
		}
	},
	"boss_gem_2": {
		"Name": "BOSS-深渊撼地者",
		"SpawnModifier": "modifier_boss_earthshaker",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_earth_shaker/boss_earth_shaker.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Earthshaker",
		"BGM": "EarthShaker.Battle",
		"Ability1": "magma_earthshaker_1",
		"Ability2": "magma_earthshaker_2",
		"Ability3": "magma_earthshaker_3",
		"Ability4": "magma_earthshaker_4",
		"Ability5": "magma_earthshaker_5",
		"Ability6": "magma_earthshaker_6",
		"Ability7": "magma_earthshaker_7",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 260,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.8,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileType": "PROJECTILE_TYPE_LINEAR",
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 90,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "totem_roll_gesture",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 27158
				},
				"2": {
					"ItemDef": 27159
				},
				"3": {
					"ItemDef": 27161
				},
				"4": {
					"ItemDef": 29936
				}
			}
		}
	},
	"boss_gem_3": {
		"Name": "斧王",
		"SpawnModifier": "modifier_boss_axe",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_axe/boss_axe.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Axe",
		"BGM": "Axe.Battle",
		"Ability1": "boss_axe_1",
		"Ability2": "boss_axe_2",
		"Ability3": "boss_axe_3",
		"Ability4": "boss_axe_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 36136
				},
				"2": {
					"ItemDef": 36137
				},
				"3": {
					"ItemDef": 36138
				},
				"4": {
					"ItemDef": 36139
				},
				"5": {
					"ItemDef": 36140
				}
			}
		}
	},
	"boss_gem_4": {
		"Name": "血魔",
		"SpawnModifier": "modifier_boss_bloodseeker",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_bloodseeker/boss_bloodseeker.vmdl",
		"ModelScale": 2.2,
		"SoundSet": "Hero_BloodSeeker",
		"BGM": "BloodSeeker.Battle",
		"Ability1": "boss_bloodseeker_1",
		"Ability2": "boss_bloodseeker_2",
		"Ability3": "boss_bloodseeker_3",
		"Ability4": "boss_bloodseeker_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 5505
				},
				"2": {
					"ItemDef": 5506
				},
				"3": {
					"ItemDef": 5508
				},
				"4": {
					"ItemDef": 5509
				},
				"5": {
					"ItemDef": 5510
				},
				"6": {
					"ItemDef": 5511
				},
				"7": {
					"ItemDef": 5512
				}
			}
		}
	},
	"boss_gem_5": {
		"Name": "伐木机",
		"SpawnModifier": "modifier_boss_shredder",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/shredder/shredder.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Shredder",
		"BGM": "Shredder.Battle",
		"Ability1": "boss_shredder_1",
		"Ability2": "boss_shredder_2",
		"Ability3": "boss_shredder_3",
		"Ability4": "boss_shredder_4",
		"Ability5": "boss_shredder_5",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 400,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 7430
				},
				"2": {
					"ItemDef": 7431
				},
				"3": {
					"ItemDef": 7744
				},
				"4": {
					"ItemDef": 8018
				},
				"5": {
					"ItemDef": 8019
				},
				"6": {
					"ItemDef": 8020
				}
			}
		}
	},
	"boss_gem_6": {
		"Name": "黑暗风鸢",
		"SpawnModifier": "modifier_boss_grimstroke",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_grimstroke/boss_grimstroke.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Grimstroke",
		"BGM": "Grimstroke.Battle",
		"Ability1": "boss_grimstroke_1",
		"Ability2": "boss_grimstroke_2",
		"Ability3": "boss_grimstroke_3",
		"Ability4": "boss_grimstroke_4",
		"Ability5": "boss_grimstroke_5",
		"Ability6": "boss_grimstroke_6",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 350,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 13900
				},
				"2": {
					"ItemDef": 13901
				},
				"3": {
					"ItemDef": 13902
				},
				"4": {
					"ItemDef": 13903
				}
			}
		}
	},
	"boss_gem_7": {
		"Name": "Lion",
		"SpawnModifier": "modifier_boss_lion",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_lion/boss_lion.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Lion",
		"BGM": "Lion.Battle",
		"Ability1": "boss_lion_1",
		"Ability2": "boss_lion_2",
		"Ability3": "boss_lion_3",
		"Ability4": "boss_lion_4",
		"Ability5": "boss_lion_5",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 25680
				},
				"2": {
					"ItemDef": 25681
				},
				"3": {
					"ItemDef": 25700
				},
				"4": {
					"ItemDef": 25701
				},
				"5": {
					"ItemDef": 25703
				}
			}
		}
	},
	"boss_gem_8": {
		"Name": "树精",
		"SpawnModifier": "modifier_boss_treant",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/treant_protector/treant_protector.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Treant",
		"BGM": "Axe.Battle",
		"Ability1": "boss_treant_1",
		"Ability2": "boss_treant_2",
		"Ability3": "boss_treant_3",
		"Ability4": "boss_treant_4",
		"Ability5": "boss_treant_5",
		"Ability6": "boss_treant_6",
		"Ability7": "boss_treant_7",
		"Ability8": "boss_shredder_1",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 200,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 3600,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 11,
		"AttackDamageMax": 11,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "boss_treant",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 9901
				},
				"2": {
					"ItemDef": 19317
				},
				"3": {
					"ItemDef": 19318
				},
				"4": {
					"ItemDef": 19319
				}
			}
		}
	},
	"hunt_boss_deep_magma_earthshaker": {
		"Name": "BOSS-深渊撼地者",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_earth_shaker/boss_earth_shaker.vmdl",
		"ModelScale": 1.8,
		"SoundSet": "Hero_Earthshaker",
		"BGM": "EarthShaker.Battle",
		"Ability1": "magma_earthshaker_1",
		"Ability2": "magma_earthshaker_2",
		"Ability3": "magma_earthshaker_3",
		"Ability4": "magma_earthshaker_4",
		"Ability5": "magma_earthshaker_5",
		"Ability6": "magma_earthshaker_6",
		"Ability7": "magma_earthshaker_7",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 260,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.8,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileType": "PROJECTILE_TYPE_LINEAR",
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_earthshaker",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 90,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "totem_roll_gesture",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 27158
				},
				"2": {
					"ItemDef": 27159
				},
				"3": {
					"ItemDef": 27161
				},
				"4": {
					"ItemDef": 29936
				}
			}
		}
	},
	"hunt_boss_axe": {
		"Name": "斧王",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_axe/boss_axe.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Axe",
		"BGM": "Axe.Battle",
		"Ability1": "boss_axe_1",
		"Ability2": "boss_axe_2",
		"Ability3": "boss_axe_3",
		"Ability4": "boss_axe_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_axe",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 36136
				},
				"2": {
					"ItemDef": 36137
				},
				"3": {
					"ItemDef": 36138
				},
				"4": {
					"ItemDef": 36139
				},
				"5": {
					"ItemDef": 36140
				}
			}
		}
	},
	"hunt_boss_lion": {
		"Name": "Lion",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_lion/boss_lion.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Lion",
		"BGM": "Lion.Battle",
		"Ability1": "boss_lion_1",
		"Ability2": "boss_lion_2",
		"Ability3": "boss_lion_3",
		"Ability4": "boss_lion_4",
		"Ability5": "boss_lion_5",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 300,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_lion",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 25680
				},
				"2": {
					"ItemDef": 25681
				},
				"3": {
					"ItemDef": 25700
				},
				"4": {
					"ItemDef": 25701
				},
				"5": {
					"ItemDef": 25703
				}
			}
		}
	},
	"hunt_boss_bloodseeker": {
		"Name": "血魔",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_bloodseeker/boss_bloodseeker.vmdl",
		"ModelScale": 2.2,
		"SoundSet": "Hero_BloodSeeker",
		"BGM": "BloodSeeker.Battle",
		"Ability1": "boss_bloodseeker_1",
		"Ability2": "boss_bloodseeker_2",
		"Ability3": "boss_bloodseeker_3",
		"Ability4": "boss_bloodseeker_4",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_bloodseeker",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 5505
				},
				"2": {
					"ItemDef": 5506
				},
				"3": {
					"ItemDef": 5508
				},
				"4": {
					"ItemDef": 5509
				},
				"5": {
					"ItemDef": 5510
				},
				"6": {
					"ItemDef": 5511
				},
				"7": {
					"ItemDef": 5512
				}
			}
		}
	},
	"hunt_boss_shredder": {
		"Name": "伐木机",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/shredder/shredder.vmdl",
		"ModelScale": 1.5,
		"SoundSet": "Hero_Shredder",
		"BGM": "Shredder.Battle",
		"Ability1": "boss_shredder_1",
		"Ability2": "boss_shredder_2",
		"Ability3": "boss_shredder_3",
		"Ability4": "boss_shredder_4",
		"Ability5": "boss_shredder_5",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 400,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_shredder",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 7430
				},
				"2": {
					"ItemDef": 7431
				},
				"3": {
					"ItemDef": 7744
				},
				"4": {
					"ItemDef": 8018
				},
				"5": {
					"ItemDef": 8019
				},
				"6": {
					"ItemDef": 8020
				}
			}
		}
	},
	"hunt_boss_grimstroke": {
		"Name": "黑暗风鸢",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_grimstroke/boss_grimstroke.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Grimstroke",
		"BGM": "Grimstroke.Battle",
		"Ability1": "boss_grimstroke_1",
		"Ability2": "boss_grimstroke_2",
		"Ability3": "boss_grimstroke_3",
		"Ability4": "boss_grimstroke_5",
		"Ability5": "boss_grimstroke_6",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 350,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 400,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_grimstroke",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 13900
				},
				"2": {
					"ItemDef": 13901
				},
				"3": {
					"ItemDef": 13902
				},
				"4": {
					"ItemDef": 13903
				}
			}
		}
	},
	"hunt_boss_treant": {
		"Name": "树精",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/treant_protector/treant_protector.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Treant",
		"BGM": "Axe.Battle",
		"Ability1": "boss_treant_1",
		"Ability2": "boss_treant_2",
		"Ability3": "boss_treant_3",
		"Ability4": "boss_treant_4",
		"Ability5": "boss_treant_5",
		"Ability6": "boss_treant_6",
		"Ability7": "boss_treant_7",
		"Ability8": "boss_shredder_1",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 200,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 400,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 500,
		"ProjectileSpeed": 1300,
		"IntroDuration": 4,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_treant",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "hunt_boss_treant",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 9901
				},
				"2": {
					"ItemDef": 19317
				},
				"3": {
					"ItemDef": 19318
				},
				"4": {
					"ItemDef": 19319
				}
			}
		}
	},
	"hunt_boss_queenofpain": {
		"Name": "痛苦女王",
		"Filter": "boss",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/boss_queenofpain/queenofpain_arcana.vmdl",
		"ModelScale": 1.4,
		"SoundSet": "Hero_QueenOfPain",
		"Ability1": "queenofpain_1",
		"Ability2": "queenofpain_2",
		"Ability3": "queenofpain_3",
		"Ability4": "queenofpain_4",
		"Ability5": "queenofpain_5",
		"Ability6": "queenofpain_6",
		"Ability7": "queenofpain_7",
		"Ability8": "queenofpain_8",
		"Ability9": "queenofpain_9",
		"Ability10": "queenofpain_10",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 420,
		"MovementTurnRate": 0.5,
		"HealthBarOffset": 200,
		"StatusHealth": 1000000,
		"LogicalStatusHealth": 1767502839824,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackDamageMin": 700,
		"AttackDamageMax": 700,
		"AttackRate": 1.7,
		"AttackAnimationPoint": 0.36,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 600,
		"ProjectileModel": "particles/econ/items/queen_of_pain/qop_ti8_immortal/queen_ti8_shadow_strike.vpcf",
		"ProjectileSpeed": 1300,
		"IntroDuration": 5.5,
		"IntroFocusDistance": 520,
		"IntroHeightOffset": 160,
		"SpawnModifier": "modifier_boss_queenofpain",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"RingRadius": 40,
		"UnitLabel": "boss",
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"AnimationModifier": "boss",
		"HasInventory": 0,
		"BountyXP": 0,
		"IsAncient": 0,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"AttackAcquisitionRange": 3000,
		"VisionDaytimeRange": 3000,
		"VisionNighttimeRange": 3000,
		"DisableClumpingBehavior": 1,
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 12930
				},
				"2": {
					"ItemDef": 13768
				},
				"3": {
					"ItemDef": 13769
				},
				"4": {
					"ItemDef": 13770
				}
			}
		}
	}
};