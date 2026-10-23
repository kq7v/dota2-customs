--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().bless = {
	"item_zeus_attack": {
		"Note": "闪电攻击",
		"Description": "<Hotkey|Attack/>释放<Mark|连环闪电/>",
		"AbilityTextureName": "zuus_arc_lightning",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "3 6 9 12",
				"*lightning_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_attack",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_skill": {
		"Note": "雷霆万钧",
		"Description": "使用<Hotkey|Skill/>召唤<Mark|雷击/>",
		"AbilityTextureName": "zuus_lightning_bolt",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "9 18 27 36",
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_skill",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_dodge": {
		"Note": "神圣一跃",
		"Description": "使用<Hotkey|Dodge/>召唤<Mark|雷击/>",
		"AbilityTextureName": "zuus_heavenly_jump",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "6 12 18 24",
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_defense": {
		"Note": "静电场",
		"Description": "使用技能后使周围敌人<Electric:触电/>",
		"AbilityTextureName": "zuus_static_field",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"stack": "1 2 3 4"
		},
		"ScriptFile": "abilities/bless/item_zeus_defense",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_ultimate": {
		"Note": "雷霆之力",
		"Description": "使用<Hotkey|Ultimate/>后提升伤害，持续%duration%秒",
		"AbilityTextureName": "zuus_thundergods_wrath",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage_pct": "15 30 45 60",
			"duration": 5
		},
		"ScriptFile": "abilities/bless/item_zeus_ultimate",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_return": {
		"Note": "雷电奉还",
		"Description": "<Hit:受击/>时召唤<Mark|雷击/>进行<Counter:反击/>",
		"AbilityTextureName": "zeus/ti8_immortal_arms/zeus_arc_lightning_immortal",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "25 50 75 100",
				"*retaliated_damage_amplify": 1,
				"*lightning_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_return",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_expose": {
		"Note": "链式触电",
		"Description": "<Mark|连环闪电/>有概率施加<Electric:触电/>",
		"AbilityTextureName": "disruptor_electromagnetic_repulsion",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"chance": "20 25 30 35"
		},
		"ScriptFile": "abilities/bless/item_zeus_expose",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_attack",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_double": {
		"Note": "双重雷击",
		"Description": "召唤<Mark|雷击/>时有概率额外召唤一次",
		"AbilityTextureName": "lina/lina_ti6_immortal/lina_laguna_blade",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"chance": "20 25 30 35"
		},
		"ScriptFile": "abilities/bless/item_zeus_double",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_split": {
		"Note": "闪电裂变",
		"Description": "<Split:散射/>：增加<Mark|连环闪电/>数量",
		"AbilityTextureName": "disruptor_thunder_strike",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": {
				"value": "1 2 3 4",
				"+split_count": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_split",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_attack",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_move": {
		"Note": "静电之触",
		"Description": "每移动%distance%距离使周围的敌人<Electric:触电/>",
		"AbilityTextureName": "razor_unstable_current",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_zeus_move",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"distance": {
				"value": 2200,
				"/move_distance_efficiency": 1
			},
			"stack": "2 4 6 8"
		}
	},
	"item_zeus_consume": {
		"Note": "引雷针",
		"Description": "<Electric:触电/>消耗时有%chance%%概率召唤<Mark|雷击/>",
		"AbilityTextureName": "razor_static_link",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_zeus_consume",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_expose|item_zeus_defense|item_zeus_move",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": {
				"value": "6 12 18 24",
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			},
			"chance": 30
		}
	},
	"item_zeus_aoe": {
		"Note": "欢声雷动",
		"Description": "<Mark|雷击/>变为范围伤害",
		"AbilityTextureName": "zuus_lightning_bolt_immortal",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_lightning_radius": {
				"value": "60 120 180 240",
				"*aoe_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_aoe",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_ice": {
		"Note": "破冰行动",
		"Description": "<Mark|雷击/>对<Frozen:冰冻/>单位造成额外伤害并触发衰减",
		"AbilityTextureName": "ancient_apparition_ice_blast",
		"Suit": "Zeus|Ice",
		"RarityRange": 5,
		"AbilityValues": {
			"item_lightning_damage": {
				"value": 15,
				"*lightning_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_ice",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"RequireBless2": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_poison": {
		"Note": "毒性风暴",
		"Description": "造成<Poison:中毒伤害/>时有%chance%%概率召唤<Mark|雷击/>",
		"AbilityTextureName": "abyssal_underlord_dark_rift",
		"Suit": "Zeus|Poison",
		"RarityRange": 5,
		"AbilityValues": {
			"damage": {
				"value": 30,
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			},
			"chance": 20
		},
		"ScriptFile": "abilities/bless/item_zeus_poison",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"RequireBless2": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_bleed": {
		"Note": "冷酷聚变",
		"Description": "<Electric:触电/>状态触发后有概率不会消耗",
		"AbilityTextureName": "disruptor_glimpse",
		"Suit": "Zeus|Bleed",
		"RarityRange": 5,
		"AbilityValues": {
			"chance": 50
		},
		"ScriptFile": "abilities/bless/item_zeus_bleed",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_expose|item_zeus_defense|item_zeus_move",
		"RequireBless2": "item_bleed_return|item_bleed_counter|item_bleed_fury|item_bleed_kill|item_bleed_boiling|item_bleed_start",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_crit": {
		"Note": "雷暴",
		"Description": "<Crit:暴击/>时召唤<Mark|雷击/>",
		"AbilityTextureName": "lina_laguna_blade",
		"Suit": "Zeus|Crit",
		"RarityRange": 5,
		"AbilityValues": {
			"damage": {
				"value": 30,
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_zeus_crit",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"RequireBless2": "item_crit_attack|item_crit_skill|item_crit_dodge|item_crit_chance|item_crit_damage",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_fury": {
		"Note": "闪电充能",
		"Description": "召唤<Mark|雷击/>时累积<Fury:怒气/>",
		"AbilityTextureName": "zuus_lightning_hands",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"fury": "1 2 3 4"
		},
		"ScriptFile": "abilities/bless/item_zeus_fury",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_zeus_holy": {
		"Note": "等离子场",
		"Description": "每%interval%秒释放等离子场<ShootDown:击落/>弹道并造成雷系伤害",
		"AbilityTextureName": "razor_plasma_field",
		"Suit": "Zeus|Holy",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_zeus_holy",
		"BaseClass": "item_lua",
		"RequireBless1": "item_zeus_attack|item_zeus_skill|item_zeus_dodge|item_zeus_defense|item_zeus_ultimate|item_zeus_return|item_zeus_move",
		"RequireBless2": "item_holy_attack|item_holy_skill|item_holy_dodge|item_holy_ultimate|item_holy_return|item_holy_armor|item_holy_move",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"interval": 6,
			"damage": {
				"value": 75,
				"*lightning_damage_amplify": 1
			},
			"radius": 900
		}
	},
	"item_crit_attack": {
		"Note": "水晶剑",
		"Description": "提升攻击<Crit:暴击率/>",
		"AbilityTextureName": "item_lesser_crit",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_attack_crit_chance": "5 7 9 12"
		},
		"ScriptFile": "abilities/bless/item_crit_attack",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_jianqi": {
		"Note": "气贯长虹",
		"Description": "发动<Hotkey|Attack/>时释放<BladeWave:直线剑气/>",
		"AbilityTextureName": "kez_echo_slash",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "6 12 18 24"
			}
		},
		"ScriptFile": "abilities/bless/item_crit_jianqi",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_skill": {
		"Note": "亲王短刃",
		"Description": "提升技能<Crit:暴击率/>",
		"AbilityTextureName": "item_princes_knife",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_spell_crit_chance": "4 6 8 10"
		},
		"ScriptFile": "abilities/bless/item_crit_skill",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_dodge": {
		"Note": "魔童之爪",
		"Description": "<Dodge:冲刺/>后提升暴击率，持续%duration%秒",
		"AbilityTextureName": "item_imp_claw",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"crit_chance": "3 6 9 12",
			"duration": 2
		},
		"ScriptFile": "abilities/bless/item_crit_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_ultimate": {
		"Note": "大庚剑阵",
		"Description": "使用<Hotkey|Ultimate/>后召唤<Mark|飞剑/>",
		"AbilityTextureName": "crit_ultimate",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": "3 4 5 6"
		},
		"ScriptFile": "abilities/bless/item_crit_ultimate",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_return": {
		"Note": "反击风暴",
		"Description": "<Hit:受击/>时释放<BladeWave:圆形剑气/>进行<Counter:反击/>",
		"AbilityTextureName": "kez_raptor_dance",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "25 50 75 100",
				"*retaliated_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_crit_return",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_speed": {
		"Note": "剑气纵横",
		"Description": "提升<BladeWave:剑气/>的伤害和距离且能反弹",
		"AbilityTextureName": "juggernaut/bladekeeper/juggernaut_omni_slash",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_crit_speed",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_crit_jianqi|item_crit_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"item_blade_speed_amplify": "20 30 40 50"
		}
	},
	"item_crit_blade": {
		"Note": "剑势如虹",
		"Description": "提升<BladeWave:剑气/>伤害且能<ShootDown:击落/>弹道",
		"AbilityTextureName": "crit_blade",
		"Suit": "Crit",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_crit_blade",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_crit_jianqi|item_crit_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"item_blade_damage_amplify": 80
		}
	},
	"item_crit_chance": {
		"Note": "剑舞",
		"Description": "所有伤害都有概率<Crit:暴击/>",
		"AbilityTextureName": "juggernaut_blade_dance",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_crit_chance": "2 4 6 8"
		},
		"ScriptFile": "abilities/bless/item_crit_chance",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_damage": {
		"Note": "干净利落",
		"Description": "提升<Crit:暴击伤害/>",
		"AbilityTextureName": "centaur_double_edge",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_crit_damage": "20 30 40 50"
		},
		"ScriptFile": "abilities/bless/item_crit_damage",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_summon": {
		"Note": "畅快淋漓",
		"Description": "<Crit:暴击/>时有概率召唤<Mark|飞剑/>",
		"AbilityTextureName": "crit_summon",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"chance": "40 60 80 100",
			"count": 1
		},
		"ScriptFile": "abilities/bless/item_crit_summon",
		"BaseClass": "item_lua",
		"RequireBless1": "item_crit_attack|item_crit_skill|item_crit_chance|item_crit_ultimate",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_armor": {
		"Note": "腐蚀兵刃",
		"Description": "<Crit:暴击/>对<Shield:护盾/>造成更高伤害",
		"AbilityTextureName": "alchemist_corrosive_weaponry",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_barrier_crit_damage": "20 40 60 80"
		},
		"ScriptFile": "abilities/bless/item_crit_armor",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_crit_attack|item_crit_skill|item_crit_chance|item_crit_damage",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_fury": {
		"Note": "狂战士之怒",
		"Description": "造成<Crit:暴击/>时累积更多<Fury:怒气/>",
		"AbilityTextureName": "troll_warlord_berserkers_rage_active",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_crit_fury_amplify": "25 50 75 100"
		},
		"ScriptFile": "abilities/bless/item_crit_fury",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_crit_attack|item_crit_skill|item_crit_chance|item_crit_damage",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_move": {
		"Note": "疾风剑诀",
		"Description": "每移动%distance%距离召唤<Mark|飞剑/>",
		"AbilityTextureName": "juggernaut_swift_slash",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_crit_move",
		"BaseClass": "item_lua",
		"RequireBless1": "item_crit_attack|item_crit_skill|item_crit_chance|item_crit_damage",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"count": "2 3 4 5",
			"distance": {
				"value": 2200,
				"/move_distance_efficiency": 1
			}
		}
	},
	"item_crit_ice": {
		"Note": "霜冻之剑",
		"Description": "施加<Frozen:冰冻/>时有概率召唤<Mark|飞剑/>",
		"AbilityTextureName": "drow_ranger_frost_arrow_arcana",
		"Suit": "Crit|Ice",
		"RarityRange": 5,
		"AbilityValues": {
			"chance": 60
		},
		"ScriptFile": "abilities/bless/item_crit_ice",
		"BaseClass": "item_lua",
		"RequireBless1": "item_crit_ultimate|item_crit_summon|item_crit_move",
		"RequireBless2": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_holy": {
		"Note": "游刃有余",
		"Description": "拥有<Shield:护盾/>时每秒生成<Mark|飞剑/>造成飞剑伤害",
		"AbilityTextureName": "phantom_lancer_sunwarrior_spirit_lance",
		"Suit": "Crit|Holy",
		"RarityRange": 5,
		"AbilityValues": {
			"interval": 1,
			"count": 3
		},
		"ScriptFile": "abilities/bless/item_crit_holy",
		"BaseClass": "item_lua",
		"RequireBless1": "item_crit_ultimate|item_crit_summon|item_crit_move",
		"RequireBless2": "item_holy_attack|item_holy_skill|item_holy_return|item_holy_move",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_bleed": {
		"Note": "撕裂伤口",
		"Description": "<Bleed:流血/>单位受到更高<Crit:暴击伤害/>",
		"AbilityTextureName": "life_stealer_open_wounds_ti9_gold",
		"Suit": "Crit|Bleed",
		"RarityRange": 5,
		"AbilityValues": {
			"item_bleed_crit_damage": 100
		},
		"ScriptFile": "abilities/bless/item_crit_bleed",
		"BaseClass": "item_lua",
		"RequireBless1": "item_crit_attack|item_crit_skill|item_crit_dodge|item_crit_chance|item_crit_damage",
		"RequireBless2": "item_bleed_attack|item_bleed_skill|item_bleed_move|item_bleed_ultimate|item_bleed_shoot|item_bleed_bath",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_poison": {
		"Note": "淬毒飞剑",
		"Description": "<Mark|飞剑/>施加<Poison:中毒/>",
		"AbilityTextureName": "item_ethereal_blade",
		"Suit": "Crit|Poison",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_crit_poison",
		"BaseClass": "item_lua",
		"RequireBless1": "item_crit_ultimate|item_crit_summon|item_crit_move",
		"RequireBless2": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"poison": 18
		}
	},
	"item_holy_attack": {
		"Note": "圣洁之锤",
		"Description": "<Hotkey|Attack/>获得<Shield:护盾/>",
		"AbilityTextureName": "omniknight_hammer_of_purity",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"shield": {
				"value": "4 6 8 10",
				"*shield_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_holy_attack",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_skill2": {
		"Note": "圣光脉冲",
		"Description": "使用<Hotkey|Skill/>发射<Mark|激光/>",
		"AbilityTextureName": "brewmaster_fire_pull",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_holy_skill2",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": {
				"value": "9 18 27 36",
				"*shield_damage_amplify": 1,
				"*laser_damage_amplify": 1
			}
		}
	},
	"item_holy_laser_ref": {
		"Note": "折跃耀光",
		"Description": "增加<Mark|激光/>弹射次数",
		"AbilityTextureName": "tinker_warp_grenade",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_holy_laser_ref",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_holy_skill2|item_holy_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"item_laser_bounce_count": "1 2 3 4"
		}
	},
	"item_holy_auto": {
		"Note": "雷达脉冲",
		"Description": "提升<Mark|激光/>伤害且能自动索敌",
		"AbilityTextureName": "tinker/tinker_ti10_immortal_ability_icons/tinker_laser_ti10",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_holy_auto",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_holy_laser_ref",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"item_laser_damage_amplify": "20 30 40 50"
		}
	},
	"item_holy_skill": {
		"Note": "神之庇佑",
		"Description": "使用技能后获得<Shield:护盾/>",
		"AbilityTextureName": "omniknight_martyr",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"shield": {
				"value": "4 6 8 10",
				"*shield_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_holy_skill",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_dodge": {
		"Note": "神圣冲刺",
		"Description": "使用<Hotkey|Dodge/>召唤<Ring:环绕护盾/>，造成伤害并<ShootDown:击落/>弹道",
		"AbilityTextureName": "furbolg_enrage_damage",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": {
				"value": 4,
				"+ring_count": 1
			},
			"speed": {
				"value": 480,
				"*ring_speed_amplify": 1
			},
			"damage": "15 30 45 60"
		},
		"ScriptFile": "abilities/bless/item_holy_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_reflect": {
		"Note": "以牙还牙",
		"Description": "<ShootDown:击落/>效果升级为<Reflect:反弹/>",
		"AbilityTextureName": "marci_companion_run",
		"Suit": "Holy",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_holy_reflect",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_holy_dodge",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"item_reflect_damage": {
				"value": 60,
				"*retaliated_damage_amplify": 1
			}
		}
	},
	"item_holy_ultimate": {
		"Note": "守护天使",
		"Description": "使用<Hotkey|Ultimate/>后可以格挡伤害，持续%duration%秒",
		"AbilityTextureName": "omniknight_guardian_angel",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": "1 2 3 4",
			"duration": 3
		},
		"ScriptFile": "abilities/bless/item_holy_ultimate",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_return": {
		"Note": "能量外泄",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，发射<Mark|激光/>造成伤害",
		"AbilityTextureName": "shredder_reactive_armor",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "30 60 90 120",
				"*retaliated_damage_amplify": 1,
				"*shield_damage_amplify": 1,
				"*laser_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_holy_return",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_armor": {
		"Note": "神圣护甲",
		"Description": "降低受到的伤害",
		"AbilityTextureName": "miniboss_unyielding_shield",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_damage_reduction": "5 10 15 20"
		},
		"ScriptFile": "abilities/bless/item_holy_armor",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_respawn": {
		"Note": "凤凰余烬",
		"Description": "复活后获得无敌时间并补充一次复活次数",
		"AbilityTextureName": "item_phoenix_ash",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"duration": "2 3 4 5"
		},
		"ScriptFile": "abilities/bless/item_holy_respawn",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_courage": {
		"Note": "勇敢的心",
		"Description": "遭遇战开始时获得伤害提升，<Hurt:受伤/>后消失",
		"AbilityTextureName": "necrolyte/necro_2022_immortal/necro_2022_immortal_heartstopper_aura_gold",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage_pct": "10 20 30 40"
		},
		"ScriptFile": "abilities/bless/item_holy_courage",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"ExcludeGameMode": "Abyssal"
	},
	"item_holy_move": {
		"Note": "大步流星",
		"Description": "每移动%distance%距离发射<Mark|激光/>",
		"AbilityTextureName": "magnataur_shockwave_alt",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"distance": {
				"value": 2200,
				"/move_distance_efficiency": 1
			},
			"damage": {
				"value": "30 45 60 75",
				"*shield_damage_amplify": 1,
				"*laser_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_holy_move",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_counter_elite": {
		"Note": "反击精英",
		"Description": "<Counter:反击/>造成的效果提升",
		"AbilityTextureName": "centaur/centaur_crownfall_belt/centaur_retaliate",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_retaliated_damage_amplify": "15 30 45 50"
		},
		"ScriptFile": "abilities/bless/item_holy_counter_elite",
		"BaseClass": "item_datadriven",
		"RequireBless1": "item_holy_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_cheese": {
		"Note": "肥皂",
		"Description": "每隔一段时间生成泡泡抵挡一次伤害",
		"AbilityTextureName": "item_royale_with_cheese",
		"Suit": "Holy",
		"RarityRange": 5,
		"AbilityValues": {
			"cooldown": 15
		},
		"ScriptFile": "abilities/bless/item_holy_cheese",
		"BaseClass": "item_lua",
		"RequireBless1": "item_holy_ultimate|item_holy_return|item_holy_armor",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_ice": {
		"Note": "神圣领域",
		"Description": "全队唯一：敌人弹幕速度减慢",
		"AbilityTextureName": "skywrath_mage_ancient_seal_alt2",
		"Suit": "Holy|Ice",
		"RarityRange": 5,
		"AbilityValues": {
			"reduce_pct": 40
		},
		"ScriptFile": "abilities/bless/item_holy_ice",
		"BaseClass": "item_lua",
		"RequireBless1": "item_holy_attack|item_holy_skill|item_holy_dodge|item_holy_ultimate|item_holy_return|item_holy_armor|item_holy_move",
		"RequireBless2": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"GlobalUnique": 1,
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_bleed": {
		"Note": "神之谴戒",
		"Description": "<Shield:护盾/>抵挡伤害时造成盾击",
		"AbilityTextureName": "mars_gods_rebuke",
		"Suit": "Holy|Bleed",
		"RarityRange": 5,
		"AbilityValues": {
			"damage": {
				"value": 30,
				"*shield_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_holy_bleed",
		"BaseClass": "item_lua",
		"RequireBless1": "item_holy_attack|item_holy_skill|item_holy_return|item_holy_move",
		"RequireBless2": "item_bleed_attack|item_bleed_skill|item_bleed_move|item_bleed_ultimate|item_bleed_shoot|item_bleed_bath",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_poison": {
		"Note": "腐蚀兵刃",
		"Description": "施加<Poison:中毒/>时造成毒系伤害并施加<Weak:虚弱/>",
		"AbilityTextureName": "alchemist_corrosive_weaponry",
		"Suit": "Holy|Poison",
		"RarityRange": 5,
		"AbilityValues": {
			"poison": 25
		},
		"ScriptFile": "abilities/bless/item_holy_poison",
		"BaseClass": "item_lua",
		"RequireBless1": "item_holy_attack|item_holy_skill|item_holy_return|item_holy_move",
		"RequireBless2": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_attack": {
		"Note": "毒性攻击",
		"Description": "<Hotkey|Attack/>施加<Poison:中毒/>",
		"AbilityTextureName": "viper_poison_attack",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": "3 6 9 12"
		},
		"ScriptFile": "abilities/bless/item_poison_attack",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_skill": {
		"Note": "死亡脉冲",
		"Description": "使用<Hotkey|Skill/>发射死亡脉冲，施加<Poison:中毒/>",
		"AbilityTextureName": "necrolyte_death_pulse",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"pulse_count": {
				"value": 3,
				"+split_count": 1
			},
			"distance": 1200,
			"speed": 600,
			"angular_velocity": 30,
			"poison": "6 9 12 15"
		},
		"ScriptFile": "abilities/bless/item_poison_skill",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_dodge": {
		"Note": "拖泥带水",
		"Description": "使用<Hotkey|Dodge/>结束时对周围施加<Poison:中毒/>",
		"AbilityTextureName": "viper_nose_dive",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": "6 12 18 24",
			"radius": {
				"value": 400,
				"*aoe_amplify": 1
			},
			"duration": 1
		},
		"ScriptFile": "abilities/bless/item_poison_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_ultimate": {
		"Note": "幽冥剧毒",
		"Description": "使用<Hotkey|Ultimate/>释放<Mark|毒池/>，每秒施加<Poison:中毒/>",
		"AbilityTextureName": "viper_nethertoxin",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": "12 24 36 48",
			"radius": {
				"value": 400,
				"*aoe_amplify": 1
			},
			"duration": 3
		},
		"ScriptFile": "abilities/bless/item_poison_ultimate",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_potion": {
		"Note": "药剂专家",
		"Description": "每次拾取恢复药水永久提升伤害，最多%max_count%次",
		"AbilityTextureName": "alchemist_unstable_concoction",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage_pct": "1 2 3 4",
			"max_count": 20
		},
		"ScriptFile": "abilities/bless/item_poison_potion",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_return": {
		"Note": "腐蚀皮肤",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，释放<Mark|毒池/>，每秒施加<Poison:中毒/>",
		"AbilityTextureName": "viper_corrosive_skin",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": {
				"value": "12 24 36 48",
				"*retaliated_damage_amplify": 1
			},
			"radius": {
				"value": 300,
				"*aoe_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_poison_return",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_heal": {
		"Note": "肾上腺素",
		"Description": "每场遭遇战累计受到%threshold%伤害后获得一次治疗",
		"AbilityTextureName": "venomancer/mechamancer/venomancer_ability_icon_venomous_gale",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"heal": {
				"value": 0,
				"+health": "0.25 0.3 0.35 0.4"
			},
			"threshold": {
				"value": 0,
				"+health": 0.4
			}
		},
		"ScriptFile": "abilities/bless/item_poison_heal",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"ExcludeGameMode": "Abyssal"
	},
	"item_poison_armor": {
		"Note": "酸性喷雾",
		"Description": "每隔%interval%秒生成<Mark|毒池/>，每秒施加<Poison:中毒/>",
		"AbilityTextureName": "alchemist_acid_spray",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": "12 24 36 48",
			"radius": {
				"value": 400,
				"*aoe_amplify": 1
			},
			"duration": 3,
			"interval": 6
		},
		"ScriptFile": "abilities/bless/item_poison_armor",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_plague": {
		"Note": "瘟疫",
		"Description": "每移动%distance%距离向周围敌人施加<Poison:中毒/>",
		"AbilityTextureName": "venomancer_poison_nova",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": "12 24 36 48",
			"radius": {
				"value": 600,
				"*aoe_amplify": 1
			},
			"distance": {
				"value": 2200,
				"/move_distance_efficiency": 1
			}
		},
		"ScriptFile": "abilities/bless/item_poison_plague",
		"BaseClass": "item_lua",
		"RequireBless1": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_summon": {
		"Note": "瘟疫飞虫",
		"Description": "<Summon:召唤/>瘟疫飞虫自动攻击周围敌人",
		"AbilityTextureName": "venomancer_latent_poison",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"poison": "6 12 18 24"
		},
		"ScriptFile": "abilities/bless/item_poison_summon",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_dart": {
		"Note": "瘟疫守卫",
		"Description": "生成<Mark|毒池/>时还会<Summon:召唤/>持续%duration%秒的瘟疫守卫",
		"AbilityTextureName": "venomancer_plague_ward",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_poison_dart",
		"BaseClass": "item_lua",
		"RequireBless1": "item_poison_ultimate|item_poison_return|item_poison_armor",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"duration": 4,
			"speed": 600,
			"poison": "6 12 18 24",
			"interval": 1
		}
	},
	"item_poison_summon_speed": {
		"Note": "化学狂暴",
		"Description": "增加<Summon:召唤物/>攻击速度",
		"AbilityTextureName": "venomancer/veno_2021_immortal_arms_ability_icon/veno_2021_immortal_poison_sting",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_poison_summon_speed",
		"BaseClass": "item_lua",
		"RequireBless1": "item_poison_summon|item_poison_dart",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"attack_speed": "25 50 75 100"
		}
	},
	"item_poison_kill": {
		"Note": "腐尸毒",
		"Description": "<Poison:中毒/>敌人死亡时爆炸并<Infect:传染/>给周围敌人",
		"AbilityTextureName": "sandking_caustic_finale",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_poison_kill",
		"BaseClass": "item_lua",
		"RequireBless1": "item_poison_attack|item_poison_skill|item_poison_dodge|item_poison_ultimate|item_poison_return|item_poison_plague|item_poison_summon",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": "6 12 18 24",
			"radius": {
				"value": 300,
				"*aoe_amplify": 1
			}
		},
		"ExcludeGameMode": "Abyssal"
	},
	"item_poison_ice": {
		"Note": "病入膏肓",
		"Description": "<Frozen:冰冻/>状态减少目标<Poison:中毒/>衰减幅度",
		"AbilityTextureName": "necrolyte_heartstopper_aura",
		"Suit": "Poison|Ice",
		"RarityRange": 5,
		"AbilityValues": {
			"pct": 50
		},
		"ScriptFile": "abilities/bless/item_poison_ice",
		"BaseClass": "item_lua",
		"RequireBless1": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"RequireBless2": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_poison_bleed": {
		"Note": "血毒",
		"Description": "<Mark|血矛/>有%chance%%概率施加<Poison:中毒/>",
		"AbilityTextureName": "greevil_bloodlust",
		"Suit": "Poison|Bleed",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_poison_bleed",
		"BaseClass": "item_lua",
		"RequireBless1": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"RequireBless2": "item_bleed_skill|item_bleed_move|item_bleed_shoot",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"poison": 30,
			"chance": 20
		}
	},
	"item_ice_attack": {
		"Note": "冰霜之击",
		"Description": "<Hotkey|Attack/>施加<Frozen:冰冻/>",
		"AbilityTextureName": "drow_ranger_frost_arrows",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"frozen": "2 4 6 8",
			"damage": {
				"value": "3 6 9 12",
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_attack",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_skill": {
		"Note": "雪球杂技",
		"Description": "使用<Hotkey|Skill/>发射%count%个<Mark|雪球/>施加<Frozen:冰冻/>",
		"AbilityTextureName": "frostivus2018_throw_snowball",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": 3,
			"frozen": "3 6 9 12",
			"damage": {
				"value": "3 6 9 12",
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_skill",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_dodge": {
		"Note": "寒霜之足",
		"Description": "使用<Hotkey|Dodge/>后召唤<Mark|寒霜爆发/>施加<Frozen:冰冻/>",
		"AbilityTextureName": "ancient_apparition_cold_feet",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"radius": {
				"value": 200,
				"*aoe_amplify": 1
			},
			"frozen": "6 12 18 24",
			"damage": {
				"value": "6 12 18 24",
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_dash": {
		"Note": "花样滑冰",
		"Description": "<Hotkey|Dodge/>期间对经过的敌人施加<Frozen:冰冻/>",
		"AbilityTextureName": "crystal_maiden_crystal_clone",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_ice_dash",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"frozen": "3 6 9 12",
			"damage": {
				"value": "3 6 9 12",
				"*frozen_damage_amplify": 1
			}
		}
	},
	"item_ice_ultimate": {
		"Note": "连环霜冻",
		"Description": "使用<Hotkey|Ultimate/>在周围敌人位置召唤<Mark|寒霜爆发/>施加<Frozen:冰冻/>",
		"AbilityTextureName": "lich_frost_nova",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"radius": {
				"value": 200,
				"*aoe_amplify": 1
			},
			"frozen": "15 30 45 60",
			"damage": {
				"value": "15 30 45 60",
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_ultimate",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_return": {
		"Note": "冰霜护盾",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，召唤<Mark|寒霜爆发/>施加<Frozen:冰冻/>",
		"AbilityTextureName": "lich_frost_shield",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"radius": {
				"value": 200,
				"*aoe_amplify": 1
			},
			"frozen": "15 30 45 60",
			"damage": {
				"value": "15 30 45 60",
				"*retaliated_damage_amplify": 1,
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_return",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_deep": {
		"Note": "寒意渐增",
		"Description": "每%interval%秒对周围敌人施加<Frozen:冰冻/>",
		"AbilityTextureName": "arc_warden_magnetic_field_frostivus",
		"Suit": "Ice",
		"RarityRange": 5,
		"AbilityValues": {
			"frozen": 15,
			"radius": {
				"value": 600,
				"*aoe_amplify": 1
			},
			"interval": 2,
			"damage": {
				"value": 15,
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_deep",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_mark": {
		"Note": "霜冻印记",
		"Description": "使用技能后对周围敌人施加<IceMark:霜冻印记/>",
		"AbilityTextureName": "tusk_frozen_sigil",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_ice_mark",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"stack": "1 2 3 4"
		}
	},
	"item_ice_frostmourne": {
		"Note": "魔霭诅咒",
		"Description": "<Frozen:冰冻/>层数衰减时召唤<Mark|冰刃/>造成伤害",
		"AbilityTextureName": "spectre/spectre_arcana/spectre_desolate_arcana",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_ice_frostmourne",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": {
				"value": "40 80 120 160",
				"*frozen_damage_amplify": 1
			}
		}
	},
	"item_ice_vortex": {
		"Note": "冰霜旋涡",
		"Description": "<Mark|寒霜爆发/>留下<Mark|冰霜旋涡/>，持续%duration%秒",
		"AbilityTextureName": "ancient_apparition_ice_vortex",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"duration": 2,
			"damage": {
				"value": "3 6 9 12",
				"*frozen_damage_amplify": 1
			},
			"frozen": "3 6 9 12"
		},
		"ScriptFile": "abilities/bless/item_ice_vortex",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_ultimate|item_ice_return|item_ice_dodge",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_summon": {
		"Note": "冰晶爆轰",
		"Description": "施加<Frozen:冰冻/>时有概率降下<Mark|冰雹/>",
		"AbilityTextureName": "crystal_maiden_freezing_field_persona",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"chance": "12 24 36 48",
			"damage": {
				"value": 30,
				"*frozen_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_summon",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_thaw": {
		"Note": "解冻",
		"Description": "<Frozen:冰冻/>衰减时降下<Mark|冰雹/>",
		"AbilityTextureName": "crystal_maiden_frostbite",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_ice_thaw",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": {
				"value": "30 60 90 120",
				"*frozen_damage_amplify": 1
			},
			"count": 1
		}
	},
	"item_ice_curse": {
		"Note": "寒霜诅咒",
		"Description": "秒杀低于%threshold%%生命值的敌人召唤冰霜新星",
		"AbilityTextureName": "winter_wyvern_winters_curse",
		"Suit": "Ice",
		"RarityRange": 5,
		"AbilityValues": {
			"threshold": 10,
			"damage": {
				"value": 15,
				"*frozen_damage_amplify": 1
			},
			"radius": {
				"value": 500,
				"*aoe_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_curse",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"ExcludeGameMode": "Abyssal"
	},
	"item_ice_bleed": {
		"Note": "极寒之拥",
		"Description": "每场遭遇战免疫一次伤害并回复生命值",
		"AbilityTextureName": "winter_wyvern_cold_embrace",
		"Suit": "Ice|Bleed",
		"RarityRange": 5,
		"AbilityValues": {
			"heal": {
				"value": 0,
				"+health": 0.1
			}
		},
		"ScriptFile": "abilities/bless/item_ice_bleed",
		"BaseClass": "item_lua",
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"RequireBless2": "item_bleed_return|item_bleed_counter|item_bleed_fury|item_bleed_kill|item_bleed_boiling|item_bleed_start",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"ExcludeGameMode": "Abyssal"
	},
	"item_bleed_attack": {
		"Note": "割裂",
		"Description": "<Hotkey|Attack/>施加<Bleed:流血/>",
		"AbilityTextureName": "bloodseeker_bloodrage",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": "2 4 6 8"
		},
		"ScriptFile": "abilities/bless/item_bleed_attack",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_skill": {
		"Note": "沸血之矛",
		"Description": "使用<Hotkey|Skill/>发射%count%个<Mark|血矛/>施加<Bleed:流血/>",
		"AbilityTextureName": "huskar_burning_spear",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": 3,
			"damage": "3 6 9 12"
		},
		"ScriptFile": "abilities/bless/item_bleed_skill",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_dodge": {
		"Note": "死亡旋风",
		"Description": "<Hotkey|Dodge/>会结算目标的<Bleed:流血/>效果",
		"AbilityTextureName": "shredder_whirling_death",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"count": "1 2 3 4",
			"radius": {
				"value": 325,
				"*aoe_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_bleed_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"RequireBless1": "item_bleed_attack|item_bleed_skill|item_bleed_move|item_bleed_ultimate|item_bleed_shoot|item_bleed_bath"
	},
	"item_bleed_raze": {
		"Note": "毁灭阴影",
		"Description": "<Hotkey|Dodge/>将牵引周围敌人并造成伤害",
		"AbilityTextureName": "nevermore_shadowraze2_demon",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_bleed_raze",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": "15 30 45 60",
			"radius": {
				"value": 325,
				"*aoe_amplify": 1
			}
		}
	},
	"item_bleed_move": {
		"Note": "大步流星",
		"Description": "每移动%distance%距离发射%count%个<Mark|血矛/>施加<Bleed:流血/>",
		"AbilityTextureName": "huskar/husk_2022_immortal/husk_2022_immortal_life_break",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_bleed_move",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": "3 6 9 12",
			"count": 3,
			"distance": {
				"value": 2200,
				"/move_distance_efficiency": 1
			}
		}
	},
	"item_bleed_ultimate": {
		"Note": "心炎",
		"Description": "使用<Hotkey|Ultimate/>施加<Bleed:流血/>并击退敌人",
		"AbilityTextureName": "huskar_inner_fire",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": "6 12 18 24",
			"radius": {
				"value": 450,
				"*aoe_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_bleed_ultimate",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_shoot": {
		"Note": "热力四射",
		"Description": "使用<Hotkey|Ultimate/>发射%count%个<Mark|血矛/>施加<Bleed:流血/>",
		"AbilityTextureName": "phoenix/phoenix_ti10_immortal_ability_icon/phoenix_ti10_immortal_fire_spirit",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_bleed_shoot",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": "9 18 27 36",
			"count": 6
		}
	},
	"item_bleed_return": {
		"Note": "激怒",
		"Description": "<Hit:受击/>时积累<Fury:怒气/>",
		"AbilityTextureName": "ursa_enrage",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"fury": {
				"value": "4 8 12 16",
				"*retaliated_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_bleed_return",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_counter": {
		"Note": "反击螺旋",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，造成伤害并击退敌人",
		"AbilityTextureName": "axe_counter_helix_unleashed",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage": {
				"value": "25 50 75 100",
				"*retaliated_damage_amplify": 1
			},
			"distance": 300
		},
		"ScriptFile": "abilities/bless/item_bleed_counter",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_kill": {
		"Note": "灵魂收集",
		"Description": "击杀敌人在%duration%秒内提升伤害，可叠加；深渊模式下每次击杀叠加2层",
		"AbilityTextureName": "nevermore_dark_lord",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage_pct": "5 10 15 20",
			"duration": 8
		},
		"ScriptFile": "abilities/bless/item_bleed_kill",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_fury": {
		"Note": "沸腾之血",
		"Description": "缓慢获得<Fury:怒气/>",
		"AbilityTextureName": "witch_doctor/ti10_immortal_weapon/witch_doctor_crimson_voodoo_restoration_immortal_ti10",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_fury_regen": "2 4 6 8"
		},
		"ScriptFile": "abilities/bless/item_bleed_fury",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_boiling": {
		"Note": "狂战士之血",
		"Description": "使用<Hotkey|Ultimate/>后立即获得<Fury:怒气/>",
		"AbilityTextureName": "huskar_berserkers_blood",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"fury": "10 15 20 25"
		},
		"ScriptFile": "abilities/bless/item_bleed_boiling",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_bleed_start": {
		"Note": "下马威",
		"Description": "每场遭遇战开始时获得一次<Fury:怒气/>",
		"AbilityTextureName": "centaur_work_horse",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_bleed_start",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"fury": "40 60 80 100"
		},
		"ExcludeGameMode": "Abyssal"
	},
	"item_bleed_bath": {
		"Note": "血雾",
		"Description": "使用<Hotkey|Ultimate/>后在%duration%秒内产生血雾，持续施加<Bleed:流血/>",
		"AbilityTextureName": "bloodseeker_blood_mist",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_bleed_bath",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": "3 6 9 12",
			"duration": 3,
			"radius": {
				"value": 600,
				"*aoe_amplify": 1
			}
		}
	},
	"item_wind_dodge": {
		"Note": "灵巧步伐",
		"Description": "使用<Hotkey|Dodge/>或<Hotkey|Defense/>后获得移速和闪避，持续%duration%秒",
		"AbilityTextureName": "enchantress_bunny_hop",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"duration": 0.5,
			"evasion": "10 15 20 25",
			"movespeed": 300
		},
		"ScriptFile": "abilities/bless/item_wind_dodge",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_wind_speed": {
		"Note": "密林奔走",
		"Description": "每%threshold%移动速度提升伤害",
		"AbilityTextureName": "hoodwink_scurry",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"damage_pct": "2 4 6 8",
			"threshold": 100
		},
		"ScriptFile": "abilities/bless/item_wind_speed",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_wind_evasion": {
		"Note": "闪转腾挪",
		"Description": "增加闪避几率",
		"AbilityTextureName": "antimage_mana_thirst",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_evasion": "10 12 14 16"
		},
		"ScriptFile": "abilities/bless/item_wind_evasion",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_wind_attack": {
		"Note": "迅捷攻击",
		"Description": "增加攻击速度",
		"AbilityTextureName": "windrunner_focusfire",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_attackspeed": "40 60 80 100"
		},
		"ScriptFile": "abilities/bless/item_wind_attack",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_wind_skill": {
		"Note": "迅捷施法",
		"Description": "增加冷却缩减",
		"AbilityTextureName": "faceless_void_time_zone",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_cooldown_reduction": "10 12 14 16"
		},
		"ScriptFile": "abilities/bless/item_wind_skill",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_wind_movespeed": {
		"Note": "健步如飞",
		"Description": "增加移动速度",
		"AbilityTextureName": "windrunner_windrun",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_movespeed": "50 70 90 130"
		},
		"ScriptFile": "abilities/bless/item_wind_movespeed",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_wind_regen": {
		"Note": "治愈之风",
		"Description": "遭遇战后恢复生命值",
		"AbilityTextureName": "windrunner_gale_force",
		"Suit": "Wind",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"health_regen_pct": "4 6 8 10"
		},
		"ScriptFile": "abilities/bless/item_wind_regen",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"ExcludeGameMode": "Abyssal"
	},
	"item_wind_gold": {
		"Note": "翻箱倒柜",
		"Description": "<Breakable:可破坏物/>有概率掉落金币",
		"AbilityTextureName": "bounty_hunter_jinada_ti9",
		"Suit": "Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_gold",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen",
		"ExcludeGameMode": "Abyssal",
		"AbilityValues": {
			"chance": 25
		}
	},
	"item_wind_zeus": {
		"Note": "风雷之击",
		"Description": "每%interval%秒召唤<Mark|雷击/>",
		"AbilityTextureName": "disruptor/ti8_immortal_weapon/disruptor_thunder_strike_immortal",
		"Suit": "Zeus|Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_zeus",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage": {
				"value": 90,
				"+lightning_damage": 1
			},
			"interval": 2,
			"radius": {
				"value": 900,
				"*aoe_amplify": 1
			}
		},
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen",
		"RequireBless2": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume"
	},
	"item_wind_ice": {
		"Note": "刺骨严寒",
		"Description": "提升<Frozen:冰冻/>造成的伤害",
		"AbilityTextureName": "ancient_apparition/aa_2021_immortal_ability_icon/aa_2021_immortal_chilling_touch",
		"Suit": "Ice|Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_ice",
		"BaseClass": "item_datadriven",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"item_frozen_damage_amplify": 100
		},
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen",
		"RequireBless2": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return"
	},
	"item_wind_crit": {
		"Note": "疾风之刃",
		"Description": "每次伤害未暴击后提升暴击率，暴击后重置",
		"AbilityTextureName": "item_falcon_blade",
		"Suit": "Crit|Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_crit",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"crit_chance": 2
		},
		"RequireBless2": "item_crit_attack|item_crit_skill|item_crit_dodge|item_crit_chance|item_crit_damage",
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen"
	},
	"item_wind_holy": {
		"Note": "蒲公英护符",
		"Description": "每隔%interval%秒生成<StrongShield:强效护盾/>",
		"AbilityTextureName": "item_dandelion_amulet",
		"Suit": "Holy|Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_holy",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"shield": {
				"value": 30,
				"*shield_amplify": 1
			},
			"interval": 15
		},
		"RequireBless2": "item_holy_attack|item_holy_skill|item_holy_return|item_holy_move",
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen"
	},
	"item_wind_poison": {
		"Note": "酸雨",
		"Description": "每隔%interval%秒降下一波酸雨施加<Poison:中毒/>",
		"AbilityTextureName": "abyssal_underlord_firestorm",
		"Suit": "Poison|Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_poison",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"poison": 30,
			"interval": 3,
			"radius": {
				"value": 350,
				"*aoe_amplify": 1
			}
		},
		"RequireBless2": "item_poison_attack|item_poison_dodge|item_poison_return|item_poison_skill",
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen"
	},
	"item_wind_bleed": {
		"Note": "燃烧之军",
		"Description": "<Summon:召唤/>%count%个弓手自动发射血矛施加<Bleed:流血/>",
		"AbilityTextureName": "clinkz/ti9_immortal_bow/clinkz_burning_army_immortal",
		"Suit": "Bleed|Wind",
		"RarityRange": 5,
		"ScriptFile": "abilities/bless/item_wind_bleed",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"bleed": 6,
			"count": 3
		},
		"RequireBless2": "item_bleed_attack|item_bleed_skill|item_bleed_move|item_bleed_ultimate|item_bleed_shoot|item_bleed_bath",
		"RequireBless1": "item_wind_dodge|item_wind_speed|item_wind_evasion|item_wind_attack|item_wind_skill|item_wind_movespeed|item_wind_regen"
	},
	"item_crit_room_sword": {
		"Note": "入房飞剑",
		"Description": "每进入一个新房间召唤%sword_count%把<Mark|飞剑/>",
		"AbilityTextureName": "phantom_assassin_stifling_dagger",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"sword_count": 5
		},
		"ScriptFile": "abilities/bless/item_crit_room_sword",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"ExcludeFromRandom": 1
	},
	"item_zeus_expose_crit": {
		"Note": "触电暴击",
		"Description": "对<Electric:触电/>目标造成攻击暴击几率翻倍",
		"AbilityTextureName": "satyr_trickster_purge",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_zeus_expose_crit",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"ExcludeFromRandom": 1
	},
	"item_ice_frozen_crit": {
		"Note": "冻结暴击",
		"Description": "攻击处于<Freeze:冻结/>目标的敌人时必定暴击",
		"AbilityTextureName": "techies_reactive_tazer_stop",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_ice_frozen_crit",
		"BaseClass": "item_lua",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_sword_damage": {
		"Note": "剑意",
		"Description": "<BladeWave:剑气/>造成的暴击伤害提高%crit_damage_bonus%%",
		"AbilityTextureName": "crit_sword_damage",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"crit_damage_bonus": 20
		},
		"ScriptFile": "abilities/bless/item_crit_sword_damage",
		"BaseClass": "item_lua",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_ice_snowball_bounce": {
		"Note": "雪球弹射",
		"Description": "发射的所有雪球能够弹射%bounce_count%次",
		"AbilityTextureName": "tusk_snowball",
		"Suit": "Ice",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"bounce_count": 1
		},
		"ScriptFile": "abilities/bless/item_ice_snowball_bounce",
		"BaseClass": "item_lua",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_holy_shield_retaliate": {
		"Note": "生物装甲",
		"Description": "<Shield:护盾/>每抵挡%trigger_count%次伤害立刻进行<Counter:反击/>",
		"AbilityTextureName": "tidehunter_kraken_shell",
		"Suit": "Holy",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"trigger_count": 3,
			"damage": {
				"value": 150,
				"*retaliated_damage_amplify": 1
			}
		},
		"ScriptFile": "abilities/bless/item_holy_shield_retaliate",
		"BaseClass": "item_lua",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_fury_damage": {
		"Note": "怒气伤害",
		"Description": "<Fury:怒气/>超过上限%mana_threshold_pct%%时提升伤害",
		"AbilityTextureName": "riki/ti8_immortal_head/riki_smoke_screen_immortal_crimson",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"mana_threshold_pct": 50,
			"damage_bonus_pct": 30
		},
		"ScriptFile": "abilities/bless/item_fury_damage",
		"BaseClass": "item_lua",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS"
	},
	"item_crit_dmg_bonus": {
		"Note": "生锈的剑",
		"Description": "提升暴击率",
		"AbilityTextureName": "phantom_assassin/ravening_ability_icons/phantom_assassin_stifling_dagger",
		"Suit": "Crit",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_crit_dmg_bonus",
		"BaseClass": "item_datadriven",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityValues": {
			"item_crit_chance": 8
		}
	},
	"item_poison_room": {
		"Note": "环绕毒瓶",
		"Description": "每40秒获得持续90秒的剧毒药瓶，对触碰敌人施加%poison_stack%层<Poison:中毒/>",
		"AbilityTextureName": "rubick_curiosity",
		"Suit": "Poison",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_poison_room",
		"BaseClass": "item_lua",
		"ExcludeFromRandom": 1,
		"Access": "Bless",
		"AbilityValues": {
			"intarval": 40,
			"duration": 90,
			"poison_stack": 10,
			"radius": 250,
			"speed": {
				"value": 180,
				"*ring_speed_amplify": 1
			}
		}
	},
	"item_zeus_thunder_blessing": {
		"Note": "超导体",
		"Description": "受击时，使周围%radius%范围内的敌人<Electric:触电/>（%expose_stack%层）",
		"AbilityTextureName": "zuus_lightning_bolt",
		"Suit": "Zeus",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_zeus_thunder_blessing",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"radius": 500,
			"expose_stack": 2,
			"cd": 1
		},
		"ExcludeFromRandom": 1
	},
	"item_bleed_fury_blessing": {
		"Note": "狂暴祝福",
		"Description": "使下一次攻击施加%damage_pct%%攻击力的<Bleed:流血/>效果，间隔%cd%秒",
		"AbilityTextureName": "bloodseeker_bloodrage",
		"Suit": "Bleed",
		"RarityRange": "1|2|3|4",
		"ScriptFile": "abilities/bless/item_bleed_fury_blessing",
		"BaseClass": "item_lua",
		"Access": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HEROES_AND_CREEPS",
		"AbilityValues": {
			"damage_pct": 20,
			"cd": 5
		},
		"ExcludeFromRandom": 1
	}
};