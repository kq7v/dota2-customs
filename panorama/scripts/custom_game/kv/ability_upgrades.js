--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().ability_upgrades = {
	"vespera_upgrade_1": {
		"Note": "多重飞镖",
		"Description": "升级为<Split:散射/>：额外投掷%suriken_count%枚飞镖，额外飞镖伤害会降低",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityValues": {
			"suriken_count": {
				"value": 2,
				"+split_count": 1
			},
			"damage_reduce": 30
		},
		"AbilityTextureName": "vespera_upgrade_1"
	},
	"vespera_upgrade_1_1": {
		"Note": "多重飞镖",
		"Description": "+%suriken_count%<HotkeyOnly|Skill/><Ability|vespera_1/>数量",
		"ability_name": "vespera_1",
		"RequireUpgrades": "vespera_upgrade_1",
		"max": 2,
		"AbilityValues": {
			"suriken_count": "1 2"
		},
		"AbilityTextureName": "vespera_upgrade_1"
	},
	"vespera_upgrade_1_2": {
		"Note": "精准飞镖",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>伤害额外提高%suriken_damage_multiplier%%",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityValues": {
			"suriken_damage_multiplier": 40
		},
		"AbilityTextureName": "vespera_upgrade_1_2"
	},
	"vespera_upgrade_1_2_1": {
		"Note": "巨型飞镖",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>保留<Split:散射/>，但将所有飞镖合并为1枚巨型飞镖。每额外有1枚飞镖，体型+%giant_scale_per_suriken%%，伤害+%giant_damage_per_suriken%%",
		"ability_name": "vespera_1",
		"RequireUpgrades": "vespera_upgrade_1",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_28",
		"AbilityValues": {
			"giant_scale_per_suriken": 50,
			"giant_damage_per_suriken": 140
		}
	},
	"vespera_upgrade_2": {
		"Note": "袖里飞镖",
		"Description": "<HotkeyOnly|Attack/><Ability|vespera_attack/>的最后一击会向前方施放<HotkeyOnly|Skill/><Ability|vespera_1/>，有%passive_cd%秒冷却",
		"ability_name": "vespera_attack",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_2",
		"AbilityValues": {
			"passive_cd": 0.2
		}
	},
	"vespera_upgrade_3": {
		"Note": "急袭",
		"Description": "<HotkeyOnly|Dodge/><Ability|vespera_2/>增加攻速%attackspeed%，持续%attackspeed_duration%秒",
		"ability_name": "vespera_2",
		"max": 1,
		"AbilityValues": {
			"attackspeed": 160,
			"attackspeed_duration": 2
		},
		"AbilityTextureName": "vespera_upgrade_3"
	},
	"vespera_upgrade_4": {
		"Note": "刀阵旋风",
		"Description": "<HotkeyOnly|Dodge/><Ability|vespera_2/>向周围发射%dagger_count%飞刀[<Split:散射/>]，每枚飞刀造成%dagger_damage%点伤害",
		"ability_name": "vespera_2",
		"max": 1,
		"AbilityValues": {
			"dagger_count": {
				"value": 6,
				"+split_count": 1
			},
			"dagger_speed": 1400,
			"dagger_distance": {
				"value": 450,
				"+bullet_range": 1
			},
			"dagger_width": 125,
			"dagger_damage": 8
		},
		"AbilityTextureName": "vespera_upgrade_4"
	},
	"vespera_upgrade_5": {
		"Note": "见切",
		"Description": "<HotkeyOnly|Defense/><Ability|vespera_3/>时发动<Mark|切割风暴/>",
		"ability_name": "vespera_3",
		"RequireUpgrades": "vespera_upgrade_11",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_5"
	},
	"vespera_upgrade_7": {
		"Note": "蓄势突袭",
		"Description": "<HotkeyOnly|Dodge/><Ability|vespera_2/>下次攻击视为<HotkeyOnly|Attack/><Ability|vespera_attack/>的最后一击",
		"ability_name": "vespera_2",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_7"
	},
	"vespera_upgrade_8": {
		"Note": "杀阵·模糊",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vespera_4/>自动施放<HotkeyOnly|Defense/><Ability|vespera_3/>",
		"ability_name": "vespera_4",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_8"
	},
	"vespera_upgrade_9": {
		"Note": "远程致伤",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>的距离提升，距离越远伤害越高",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityValues": {
			"distance": 200,
			"damage_per_distance": 0.1
		},
		"AbilityTextureName": "vespera_upgrade_9"
	},
	"vespera_upgrade_10": {
		"Note": "暗地伤人",
		"Description": "<Backstab:背刺/>造成额外%backstab_damage%%伤害",
		"ability_name": "vespera_attack",
		"max": 2,
		"AbilityValues": {
			"backstab_damage": "60 120"
		},
		"AbilityTextureName": "vespera_upgrade_10"
	},
	"vespera_upgrade_11": {
		"Note": "切割风暴",
		"Description": "攻击有%aoe_chance%%概率进行大范围的<Mark|切割/>，造成%aoe_damage%伤害",
		"ability_name": "vespera_attack",
		"max": 1,
		"AbilityValues": {
			"aoe_chance": 35,
			"aoe_radius": {
				"value": 200,
				"*aoe_amplify": 1
			},
			"aoe_damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"AbilityTextureName": "vespera_upgrade_11"
	},
	"vespera_upgrade_11_1": {
		"Note": "鲜血风暴",
		"Description": "<Mark|切割风暴/>还会结算目标的<Bleed:流血/>效果",
		"ability_name": "vespera_attack",
		"RequireUpgrades": "vespera_upgrade_11",
		"RequireBless1": "item_bleed_attack|item_bleed_skill|item_bleed_move|item_bleed_ultimate|item_bleed_shoot|item_bleed_bath",
		"max": 1,
		"AbilityValues": {
			"aoe_bleed_factor": 1
		},
		"AbilityTextureName": "vespera_upgrade_11_1"
	},
	"vespera_upgrade_11_2": {
		"Note": "阵风",
		"Description": "飞镖悬停时发动一次小型的<Mark|切割风暴/>",
		"ability_name": "vespera_1",
		"RequireUpgrades": "vespera_upgrade_11",
		"max": 1,
		"AbilityValues": {
			"aoe_static_factor": 0.5
		},
		"AbilityTextureName": "vespera_upgrade_11_2"
	},
	"vespera_upgrade_11_3": {
		"Note": "大型风暴",
		"Description": "提升<Mark|切割风暴/>的范围%aoe_radius%",
		"ability_name": "vespera_attack",
		"RequireUpgrades": "vespera_upgrade_11",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_11",
		"AbilityValues": {
			"aoe_radius": 200
		}
	},
	"vespera_upgrade_11_4": {
		"Note": "飓风眼",
		"Description": "飞镖回收时发动一次<Mark|切割风暴/>",
		"ability_name": "vespera_1",
		"RequireUpgrades": "vespera_upgrade_11_2",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_11_2",
		"AbilityValues": {
			"aoe_return_factor": 1
		}
	},
	"vespera_upgrade_12": {
		"Note": "背刺突袭",
		"Description": "<HotkeyOnly|Dodge/><Ability|vespera_2/>朝身后发动<HotkeyOnly|Attack/><Ability|vespera_attack/>的最后一击，造成<Backstab:背刺/>伤害",
		"ability_name": "vespera_2",
		"max": 1,
		"AbilityValues": {
			"dash_width": 80,
			"aoe_damage": 30
		},
		"AbilityTextureName": "vespera_upgrade_12"
	},
	"vespera_upgrade_13": {
		"Note": "杀阵·环绕",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vespera_4/>飞镖回归时变为<Ring:环绕物/>",
		"ability_name": "vespera_4",
		"max": 1,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"*ring_damage_amplify": 0.6
			},
			"speed": {
				"value": 360,
				"*ring_speed_amplify": 1
			},
			"suriken_count": {
				"value": 0,
				"+ring_count": 1
			}
		},
		"AbilityTextureName": "vespera_upgrade_13"
	},
	"vespera_upgrade_14": {
		"Note": "提前折返",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>立即回归，回归后减少%reduce_cd%的冷却时间",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityValues": {
			"delay": -0.3,
			"reduce_cd": 0.5
		},
		"AbilityTextureName": "vespera_upgrade_14"
	},
	"vespera_upgrade_15": {
		"Note": "续幕",
		"Description": "<HotkeyOnly|Defense/><Ability|vespera_3/>结束后获得%shield%<Shield:护盾/>",
		"ability_name": "vespera_3",
		"max": 1,
		"AbilityValues": {
			"shield": 50
		},
		"AbilityTextureName": "vespera_upgrade_15"
	},
	"vespera_upgrade_16": {
		"Note": "极速砍杀",
		"Description": "攻击速度提升%attack_speed%",
		"ability_name": "vespera_attack",
		"max": 1,
		"AbilityValues": {
			"attack_speed": 130
		},
		"AbilityTextureName": "vespera_upgrade_16"
	},
	"vespera_upgrade_17": {
		"Note": "暗器",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>也能享受<Backstab:背刺/>伤害加成",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_17"
	},
	"vespera_upgrade_18": {
		"Note": "杀阵·绞杀",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vespera_4/>飞镖悬停时也会造成一次伤害",
		"ability_name": "vespera_4",
		"max": 1,
		"AbilityValues": {
			"static_damage_interval": 0.25,
			"static_damage_pct": 50
		},
		"AbilityTextureName": "vespera_upgrade_18"
	},
	"vespera_upgrade_19": {
		"Note": "精密计算",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>可以<Bounce:反弹/>%bounce%次",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityValues": {
			"bounce": {
				"value": 1,
				"+bounce_count": 1
			}
		},
		"AbilityTextureName": "vespera_upgrade_19"
	},
	"vespera_upgrade_20": {
		"Note": "疾步",
		"Description": "<HotkeyOnly|Dodge/><Ability|vespera_2/>冷却减少%cooldown_pct%%",
		"ability_name": "vespera_2",
		"max": 1,
		"AbilityValues": {
			"cooldown_pct": 35
		},
		"AbilityTextureName": "vespera_upgrade_20"
	},
	"vespera_upgrade_21": {
		"Note": "快速投掷",
		"Description": "移除<HotkeyOnly|Skill/><Ability|vespera_1/>的施法前摇",
		"ability_name": "vespera_1",
		"max": 1,
		"AbilityValues": {
			"cast_point": 0.2
		},
		"AbilityTextureName": "vespera_upgrade_21"
	},
	"vespera_upgrade_22": {
		"Note": "高速移动",
		"Description": "提升%movespeed_duration%秒<HotkeyOnly|Defense/><Ability|vespera_3/>的提速持续时间并获得%evade%%闪避",
		"ability_name": "vespera_3",
		"max": 1,
		"AbilityValues": {
			"evade": 20,
			"movespeed_duration": 1
		},
		"AbilityTextureName": "vespera_upgrade_22"
	},
	"vespera_upgrade_23": {
		"Note": "烟雾弹",
		"Description": "<HotkeyOnly|Dodge/><Ability|vespera_2/>留下一片烟雾，短时间内<Blind:致盲/>敌人，有%blind_cd%秒的冷却",
		"ability_name": "vespera_2",
		"max": 1,
		"AbilityValues": {
			"smoke_radius": 300,
			"smoke_duration": 1,
			"blind_cd": 5
		},
		"AbilityTextureName": "vespera_upgrade_23"
	},
	"vespera_upgrade_24": {
		"Note": "残影",
		"Description": "<HotkeyOnly|Defense/><Ability|vespera_3/>留下一个残影，吸引敌人的仇恨",
		"ability_name": "vespera_3",
		"max": 1,
		"AbilityValues": {
			"image_duration": 1
		},
		"AbilityTextureName": "vespera_upgrade_24"
	},
	"vespera_upgrade_25": {
		"Note": "残影风暴",
		"Description": "残影消失时发动一次<Mark|切割风暴/>",
		"ability_name": "vespera_3",
		"RequireUpgrades": "vespera_upgrade_11|vespera_upgrade_24",
		"max": 1,
		"AbilityValues": {
			"aoe_image_factor": 1
		},
		"AbilityTextureName": "vespera_upgrade_25"
	},
	"vespera_upgrade_26": {
		"Note": "动作模仿",
		"Description": "<HotkeyOnly|Defense/><Ability|vespera_3/>的移动速度持续时间内，每隔%suriken_interval%秒释放1次<HotkeyOnly|Skill/><Ability|vespera_1/>",
		"ability_name": "vespera_3",
		"max": 1,
		"AbilityValues": {
			"suriken_interval": 0.5
		},
		"AbilityTextureName": "vespera_upgrade_26"
	},
	"vespera_upgrade_27": {
		"Note": "隐匿之纱",
		"Description": "未攻击%sleep%秒后，进入隐匿状态，提升%sleep_movespeed%%移速与%sleep_attack%下次攻击伤害",
		"ability_name": "vespera_attack",
		"Hidden": 1,
		"max": 1,
		"AbilityValues": {
			"sleep": 2,
			"sleep_movespeed": 20,
			"sleep_attack": 50
		},
		"AbilityTextureName": "vespera_upgrade_27"
	},
	"vespera_upgrade_28": {
		"Note": "隐匿突袭",
		"Description": "隐匿状态下，下次攻击视为<HotkeyOnly|Attack/><Ability|vespera_attack/>的最后一击",
		"ability_name": "vespera_attack",
		"Hidden": 1,
		"RequireUpgrades": "vespera_upgrade_27",
		"max": 1,
		"AbilityTextureName": "vespera_upgrade_28"
	},
	"vespera_upgrade_poison_1": {
		"Note": "淬毒飞镖",
		"Description": "<HotkeyOnly|Skill/><Ability|vespera_1/>施加%poison%层<Poison:中毒/>",
		"ability_name": "vespera_1",
		"Hidden": 1,
		"RequireBless1": "item_poison_attack|item_poison_bleed|item_poison_dodge|item_poison_return|item_poison_skill",
		"max": 1,
		"AbilityValues": {
			"poison": 2
		},
		"AbilityTextureName": "vespera_upgrade_poison_1"
	},
	"vespera_upgrade_crit_1": {
		"Note": "三刀流",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vespera_4/>会释放%blade_wave_count%次<BladeWave:圆形剑气/>",
		"ability_name": "vespera_4",
		"Hidden": 1,
		"RequireBless1": "item_crit_jianqi|item_crit_return",
		"max": 1,
		"AbilityValues": {
			"blade_wave_count": 3,
			"blade_wave_damage": {
				"value": 15
			}
		},
		"AbilityTextureName": "vespera_upgrade_crit_1"
	},
	"vespera_upgrade_ice_1": {
		"Note": "雪球杂技",
		"Description": "<HotkeyOnly|Defense/><Ability|vespera_3/>期间持续发射<Mark|雪球/>",
		"ability_name": "vespera_3",
		"Hidden": 1,
		"RequireBless1": "item_crit_jianqi|item_crit_return",
		"max": 1,
		"AbilityValues": {
			"snow_ball_interval": 0.15,
			"snow_ball_damage": {
				"value": 6,
				"*frozen_damage_amplify": 1
			},
			"snow_ball_frozen": 6
		},
		"AbilityTextureName": "vespera_upgrade_ice_1"
	},
	"vespera_upgrade_zeus_1": {
		"Note": "雷霆一击",
		"Description": "<HotkeyOnly|Attack/><Ability|vespera_attack/>有%lightning_chance%%概率召唤%lightning_damage%伤害的<Mark|雷击/>",
		"ability_name": "vespera_attack",
		"Hidden": 1,
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"max": 1,
		"AbilityValues": {
			"lightning_damage": {
				"value": 30,
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			},
			"lightning_chance": 25
		},
		"AbilityTextureName": "vespera_upgrade_zeus_1"
	},
	"vexis_upgrade_1": {
		"Note": "华丽谢幕",
		"Description": "<HotkeyOnly|Defense/><Ability|vexis_3/>结束时会再发射一圈弹幕",
		"ability_name": "vexis_3",
		"max": 1,
		"AbilityValues": {
			"count": 4
		},
		"AbilityTextureName": "vexis_upgrade_1"
	},
	"vexis_upgrade_2": {
		"Note": "快速祷告",
		"Description": "移除<HotkeyOnly|Skill/><Ability|vexis_1/>的蓄力时间",
		"ability_name": "vexis_1",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_2"
	},
	"vexis_upgrade_3": {
		"Note": "回音连弹",
		"Description": "<HotkeyOnly|Attack/><Ability|vexis_attack/>减少<HotkeyOnly|Dodge/><Ability|vexis_2/>%dash_cd_reduce%秒冷却时间",
		"ability_name": "vexis_attack",
		"max": 1,
		"AbilityValues": {
			"dash_cd_reduce": 0.5
		},
		"AbilityTextureName": "vexis_upgrade_3"
	},
	"vexis_upgrade_4": {
		"Note": "贴耳低语",
		"Description": "<HotkeyOnly|Skill/><Ability|vexis_1/>所有伤害视为近距离，始终享受近距离伤害增幅",
		"ability_name": "vexis_1",
		"max": 1,
		"AbilityValues": {
			"always_melee_damage": 1
		},
		"AbilityTextureName": "vexis_upgrade_4_whisper"
	},
	"vexis_upgrade_4_1": {
		"Note": "遥寄祷言",
		"Description": "<HotkeyOnly|Skill/><Ability|vexis_1/>所有伤害视为远距离，始终享受远距离伤害增幅",
		"ability_name": "vexis_1",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_4_1_prayer",
		"AbilityValues": {
			"always_ranged_damage": 1
		}
	},
	"vexis_upgrade_4_2": {
		"Note": "虔诚一击",
		"Description": "<HotkeyOnly|Skill/><Ability|vexis_1/>伤害额外提高%prayer_damage_boost%%",
		"ability_name": "vexis_1",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_4_2_devotion",
		"AbilityValues": {
			"prayer_damage_boost": 25
		}
	},
	"vexis_upgrade_5": {
		"Note": "枪斗术",
		"Description": "攻击和技能子弹能<Bounce:反弹/>一次",
		"ability_name": "vexis_attack",
		"max": 1,
		"AbilityValues": {
			"bounce": 1
		},
		"AbilityTextureName": "vexis_upgrade_5"
	},
	"vexis_upgrade_6": {
		"Note": "枪管预热",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>每颗子弹命中提升%attackspeed_per_hit%攻击速度，持续%attackspeed_duration%秒",
		"ability_name": "vexis_4",
		"max": 1,
		"AbilityValues": {
			"attackspeed_per_hit": 10,
			"attackspeed_duration": 6
		},
		"AbilityTextureName": "vexis_upgrade_6"
	},
	"vexis_upgrade_7": {
		"Note": "华丽变奏",
		"Description": "<HotkeyOnly|Defense/><Ability|vexis_3/>后重新填充<HotkeyOnly|Dodge/><Ability|vexis_2/>",
		"ability_name": "vexis_3",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_7"
	},
	"vexis_upgrade_8": {
		"Note": "安全撤离",
		"Description": "<HotkeyOnly|Defense/><Ability|vexis_3/>击落敌方弹幕",
		"ability_name": "vexis_3",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_8"
	},
	"vexis_upgrade_9": {
		"Note": "狂暴射击",
		"Description": "每%bullet_per_attackspeed%攻击速度提升<HotkeyOnly|Ultimate/><Ability|vexis_4/>发射子弹数量",
		"ability_name": "vexis_4",
		"max": 1,
		"AbilityValues": {
			"bullet_per_attackspeed": 40
		},
		"AbilityTextureName": "vexis_upgrade_9"
	},
	"vexis_upgrade_10": {
		"Note": "无情洗礼",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>伤害提升%damage_pct%%",
		"ability_name": "vexis_4",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_10",
		"AbilityValues": {
			"damage_pct": 50
		}
	},
	"vexis_upgrade_11": {
		"Note": "远程狙击",
		"Description": "提升%distance%<HotkeyOnly|Skill/><Ability|vexis_1/>的距离",
		"ability_name": "vexis_1",
		"max": 2,
		"AbilityValues": {
			"distance": "800 1600"
		},
		"AbilityTextureName": "vexis_upgrade_11"
	},
	"vexis_upgrade_12": {
		"Note": "手感极佳",
		"Description": "<HotkeyOnly|Dodge/><Ability|vexis_2/>后获得%attackspeed_bonus%攻击速度，持续%attackspeed_duration%秒",
		"ability_name": "vexis_2",
		"max": 2,
		"AbilityValues": {
			"attackspeed_bonus": "80 160",
			"attackspeed_duration": 2
		},
		"AbilityTextureName": "vexis_upgrade_12"
	},
	"vexis_upgrade_13": {
		"Note": "回马枪",
		"Description": "<HotkeyOnly|Dodge/><Ability|vexis_2/>结束时会自动向身后发动<HotkeyOnly|Skill/><Ability|vexis_1/>",
		"ability_name": "vexis_2",
		"max": 1,
		"AbilityValues": {
			"power_shot_charge_reduce": 0.5,
			"power_shot_distance": 400,
			"buff_duration": 5
		},
		"AbilityTextureName": "vexis_upgrade_13"
	},
	"vexis_upgrade_14": {
		"Note": "霰弹枪",
		"Description": "升级为<Split:散射/>：<HotkeyOnly|Skill/><Ability|vexis_1/>变为%arrow_count_tooltip%发，但是距离降低",
		"ability_name": "vexis_1",
		"max": 1,
		"AbilityValues": {
			"arrow_count": {
				"value": 2,
				"+split_count": 1
			},
			"distance_pct": 50,
			"damage": -8,
			"arrow_count_tooltip": 3
		},
		"AbilityTextureName": "vexis_upgrade_14"
	},
	"vexis_upgrade_14_1": {
		"Note": "霰弹枪",
		"Description": "<HotkeyOnly|Skill/><Ability|vexis_1/>变为%arrow_count_tooltip%发",
		"ability_name": "vexis_1",
		"RequireUpgrades": "vexis_upgrade_14",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_14_1",
		"AbilityValues": {
			"arrow_count": 3,
			"arrow_count_tooltip": 6
		}
	},
	"vexis_upgrade_14_1_1": {
		"Note": "巨型弹药",
		"Description": "<HotkeyOnly|Skill/><Ability|vexis_1/>保留<Split:散射/>，但将所有子弹合并为1枚巨型弹药。每额外有1枚子弹，体型+%giant_scale_per_arrow%%，伤害+%giant_damage_per_arrow%%",
		"ability_name": "vexis_1",
		"RequireUpgrades": "vexis_upgrade_14",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_holy_1",
		"AbilityValues": {
			"giant_scale_per_arrow": 50,
			"giant_damage_per_arrow": 120
		}
	},
	"vexis_upgrade_15": {
		"Note": "点射",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>的怒气消耗和冷却降低%effect_reduce%%，但是持续时间也会减少%effect_reduce%%",
		"ability_name": "vexis_4",
		"max": 1,
		"AbilityValues": {
			"effect_reduce": 50
		},
		"AbilityTextureName": "vexis_upgrade_15"
	},
	"vexis_upgrade_16": {
		"Note": "扫射",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>持续时间提升%duration%秒",
		"ability_name": "vexis_4",
		"max": 1,
		"AbilityValues": {
			"duration": 1,
			"count": 5
		},
		"AbilityTextureName": "vexis_upgrade_16"
	},
	"vexis_upgrade_17": {
		"Note": "临别一枪",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>结束时发动一次<HotkeyOnly|Skill/><Ability|vexis_1/>",
		"ability_name": "vexis_4",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_17"
	},
	"vexis_upgrade_18": {
		"Note": "溃败旋律",
		"Description": "提升<HotkeyOnly|Defense/><Ability|vexis_3/>%damage%点伤害且能击退敌人",
		"ability_name": "vexis_3",
		"max": 1,
		"AbilityValues": {
			"bullet_knockback_distance": 100,
			"damage": 10
		},
		"AbilityTextureName": "vexis_upgrade_18"
	},
	"vexis_upgrade_19": {
		"Note": "狂乱扫射",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>的子弹数量增加%count%，但是子弹会射偏",
		"ability_name": "vexis_4",
		"max": 2,
		"AbilityValues": {
			"count": "5 10",
			"angle_offset": 20
		},
		"AbilityTextureName": "vexis_upgrade_19"
	},
	"vexis_upgrade_20": {
		"Note": "午夜狂欢",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>的子弹数量翻倍，但是期间移动速度减少%movespeed_reduce_pct%%",
		"ability_name": "vexis_4",
		"RequireUpgrades": "vexis_upgrade_19",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_20",
		"AbilityValues": {
			"movespeed_reduce_pct": 60
		}
	},
	"vexis_upgrade_21": {
		"Note": "恶魔交易",
		"Description": "可以消耗%health_cost%%代替%instead_fury%点怒气释放<HotkeyOnly|Ultimate/><Ability|vexis_4/>",
		"ability_name": "vexis_4",
		"Hidden": 1,
		"max": 1,
		"AbilityValues": {
			"health_cost": {
				"value": 0,
				"+health": 0.01
			},
			"instead_fury": 20
		},
		"AbilityTextureName": "vexis_upgrade_21"
	},
	"vexis_upgrade_22": {
		"Note": "绕梁三日",
		"Description": "<HotkeyOnly|Ultimate/><Ability|vexis_4/>子弹发射完后，会持续消耗剩余怒气继续发射",
		"ability_name": "vexis_4",
		"RequireUpgrades": "vexis_upgrade_21",
		"max": 1,
		"AbilityValues": {
			"bullet_per_fury": 10
		},
		"AbilityTextureName": "vexis_upgrade_22"
	},
	"vexis_upgrade_23": {
		"Note": "次强音",
		"Description": "攻击有%attack_chance%%概率发动<HotkeyOnly|Attack/><Ability|vexis_attack/>",
		"ability_name": "vexis_attack",
		"max": 2,
		"AbilityValues": {
			"attack_chance": "15 30"
		},
		"AbilityTextureName": "vexis_upgrade_23"
	},
	"vexis_upgrade_24": {
		"Note": "银质弹头",
		"Description": "<HotkeyOnly|Attack/><Ability|vexis_attack/>伤害提升%bonus_damage%点",
		"ability_name": "vexis_attack",
		"max": 2,
		"AbilityValues": {
			"bonus_damage": "5 10"
		},
		"AbilityTextureName": "vexis_upgrade_24"
	},
	"vexis_upgrade_25": {
		"Note": "幕后准备",
		"Description": "<HotkeyOnly|Defense/><Ability|vexis_3/>获得1点充能",
		"ability_name": "vexis_3",
		"max": 1,
		"AbilityValues": {
			"charge": 1
		},
		"AbilityTextureName": "vexis_upgrade_25"
	},
	"vexis_upgrade_26": {
		"Note": "一击脱离",
		"Description": "<HotkeyOnly|Skill/><Ability|vexis_1/>后发动<HotkeyOnly|Defense/><Ability|vexis_3/>",
		"ability_name": "vexis_3",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_26"
	},
	"vexis_upgrade_27": {
		"Note": "续弹连奏",
		"Description": "<HotkeyOnly|Attack/><Ability|vexis_attack/>可以充能%max_stack_tooltip%次",
		"ability_name": "vexis_attack",
		"max": 1,
		"AbilityValues": {
			"max_stack": 1,
			"max_stack_tooltip": 2
		},
		"AbilityTextureName": "vexis_upgrade_27"
	},
	"vexis_upgrade_28": {
		"Note": "浮游炮",
		"Description": "<Summon:召唤/>浮游炮协同作战，自动进行攻击",
		"ability_name": "vexis_attack",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_28",
		"AbilityValues": {
			"wisp_attack": {
				"value": 0,
				"+attack": 1.5
			}
		}
	},
	"vexis_upgrade_29": {
		"Note": "辅助祷告",
		"Description": "浮游炮也会一起使用<HotkeyOnly|Skill/><Ability|vexis_1/>",
		"ability_name": "vexis_attack",
		"RequireUpgrades": "vexis_upgrade_28",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_28"
	},
	"vexis_upgrade_30": {
		"Note": "华丽机炮",
		"Description": "浮游炮也会发射<HotkeyOnly|Defense/><Ability|vexis_3/>的子弹",
		"ability_name": "vexis_attack",
		"RequireUpgrades": "vexis_upgrade_28",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_28"
	},
	"vexis_upgrade_zeus_1": {
		"Note": "雷霆连弹",
		"Description": "<HotkeyOnly|Attack/><Ability|vexis_attack/>召唤伤害%lightning_damage%的<Mark|雷击/>",
		"ability_name": "vexis_attack",
		"Hidden": 1,
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"max": 1,
		"AbilityValues": {
			"lightning_damage": {
				"value": 12,
				"+lightning_damage": 1,
				"*lightning_damage_amplify": 1
			}
		},
		"AbilityTextureName": "vexis_upgrade_zeus_1"
	},
	"vexis_upgrade_poison_1": {
		"Note": "毒药之赠",
		"Description": "<HotkeyOnly|Dodge/><Ability|vexis_2/>在原地留下<Mark|毒瓶/>，命中后生成<Mark|毒池/>",
		"ability_name": "vexis_2",
		"Hidden": 1,
		"RequireBless1": "item_poison_attack|item_poison_bleed|item_poison_dodge|item_poison_return|item_poison_skill",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_poison_1"
	},
	"vexis_upgrade_ice_1": {
		"Note": "雪球杂技",
		"Description": "<HotkeyOnly|Defense/><Ability|vexis_3/>向周围发射<Mark|雪球/>施加<Frozen:冰冻/>",
		"ability_name": "vexis_3",
		"Hidden": 1,
		"RequireBless1": "item_ice_attack|item_ice_skill|item_ice_dodge|item_ice_dash|item_ice_ultimate|item_ice_return",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_ice_1",
		"AbilityValues": {
			"snow_frozen": 4,
			"snow_damage": {
				"value": 4,
				"*frozen_damage_amplify": 1
			},
			"snow_count": 6
		}
	},
	"vexis_upgrade_bleed_1": {
		"Note": "投矛杂技",
		"Description": "<HotkeyOnly|Defense/><Ability|vexis_3/>向周围发射<Mark|血矛/>施加<Bleed:流血/>",
		"ability_name": "vexis_3",
		"Hidden": 1,
		"RequireBless1": "item_bleed_attack|item_bleed_skill|item_bleed_move|item_bleed_ultimate|item_bleed_shoot|item_bleed_bath",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_bleed_1",
		"AbilityValues": {
			"bleed_damage": 4,
			"bleed_count": 6
		}
	},
	"vexis_upgrade_crit_1": {
		"Note": "剑锋回声",
		"Description": "<HotkeyOnly|Attack/><Ability|vexis_attack/>召唤<Mark|飞剑/>",
		"ability_name": "vexis_attack",
		"Hidden": 1,
		"RequireBless1": "item_crit_attack|item_crit_skill|item_crit_dodge|item_crit_chance|item_crit_damage",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_crit_1",
		"AbilityValues": {
			"blade_count": 1
		}
	},
	"vexis_upgrade_holy_1": {
		"Note": "激光枪",
		"Description": "<HotkeyOnly|Dodge/><Ability|vexis_2/>发射<Mark|激光/>",
		"ability_name": "vexis_2",
		"Hidden": 1,
		"RequireBless1": "item_holy_attack|item_holy_skill|item_holy_return|item_holy_move",
		"max": 1,
		"AbilityTextureName": "vexis_upgrade_holy_1",
		"AbilityValues": {
			"laser_damage": {
				"value": 15,
				"*shield_damage_amplify": 1,
				"*laser_damage_amplify": 1
			}
		}
	},
	"solthra_upgrade_1": {
		"Note": "炎爆齐射",
		"Description": "<Split:散射/>：<HotkeyOnly|Attack/><Ability|solthra_attack/>额外发射%count%颗火球",
		"ability_name": "solthra_attack",
		"max": 1,
		"AbilityValues": {
			"count": {
				"value": 2,
				"+split_count": 1
			}
		},
		"AbilityTextureName": "solthra_upgrade_1"
	},
	"solthra_upgrade_2": {
		"Note": "灼烧印记",
		"Description": "<HotkeyOnly|Attack/><Ability|solthra_attack/>施加<Burning:燃烧/>效果",
		"ability_name": "solthra_attack",
		"max": 1,
		"AbilityValues": {
			"burning_damage": 18
		},
		"AbilityTextureName": "solthra_upgrade_2"
	},
	"solthra_upgrade_3": {
		"Note": "控球大师",
		"Description": "<HotkeyOnly|Skill/><Ability|solthra_1/>具有追踪效果，自动锁定附近敌人",
		"ability_name": "solthra_1",
		"max": 1,
		"AbilityValues": {
			"angular_velocity": {
				"value": 80,
				"*angular_velocity_amplify": 1
			}
		},
		"AbilityTextureName": "solthra_upgrade_3"
	},
	"solthra_upgrade_4": {
		"Note": "集中火力",
		"Description": "<HotkeyOnly|Skill/><Ability|solthra_1/>伤害提升%fire_ball_damage_amplify%%",
		"ability_name": "solthra_1",
		"max": 1,
		"AbilityValues": {
			"fire_ball_damage_amplify": 50
		},
		"AbilityTextureName": "solthra_upgrade_4"
	},
	"solthra_upgrade_5": {
		"Note": "烈焰连击",
		"Description": "<HotkeyOnly|Skill/><Ability|solthra_1/>连续命中同一目标时，伤害逐次提升%combo_damage_pct%%",
		"ability_name": "solthra_1",
		"max": 2,
		"AbilityValues": {
			"combo_damage_pct": "50 100"
		},
		"AbilityTextureName": "solthra_upgrade_5"
	},
	"solthra_upgrade_6": {
		"Note": "热力四射",
		"Description": "每移动%move_distance%距离自动释放一次<HotkeyOnly|Skill/><Ability|solthra_1/>",
		"ability_name": "solthra_1",
		"max": 1,
		"AbilityValues": {
			"move_distance": 1800
		},
		"AbilityTextureName": "solthra_upgrade_6"
	},
	"solthra_upgrade_7": {
		"Note": "火焰充能",
		"Description": "<HotkeyOnly|Dodge/><Ability|solthra_2/>后%bouns_duration%秒内<Split:散射/>数量加%bouns_count%",
		"ability_name": "solthra_2",
		"max": 1,
		"AbilityValues": {
			"bouns_duration": 3,
			"bouns_count": 2
		},
		"AbilityTextureName": "solthra_upgrade_7"
	},
	"solthra_upgrade_8": {
		"Note": "炎之轨迹",
		"Description": "<HotkeyOnly|Dodge/><Ability|solthra_2/>留下燃烧路径，持续施加<Burning:燃烧/>效果",
		"ability_name": "solthra_2",
		"max": 1,
		"AbilityValues": {
			"burn_path_duration": 3,
			"burn_path_damage": 18
		},
		"AbilityTextureName": "solthra_upgrade_8"
	},
	"solthra_upgrade_9": {
		"Note": "疾速突袭",
		"Description": "<HotkeyOnly|Dodge/><Ability|solthra_2/>获得1点充能",
		"ability_name": "solthra_2",
		"max": 1,
		"AbilityValues": {
			"charge": 1
		},
		"AbilityTextureName": "solthra_upgrade_9"
	},
	"solthra_upgrade_10": {
		"Note": "魔力涌动",
		"Description": "所有技能增加%cooldown_reduction%%冷却缩减",
		"ability_name": "solthra_attack",
		"max": 2,
		"AbilityValues": {
			"cooldown_reduction": "15 30"
		},
		"AbilityTextureName": "solthra_upgrade_10"
	},
	"solthra_upgrade_11": {
		"Note": "永恒火盾",
		"Description": "<HotkeyOnly|Defense/><Ability|solthra_3/>期间护盾自然衰减速度变慢，提升%shield_pct%%护盾值",
		"ability_name": "solthra_3",
		"max": 1,
		"AbilityValues": {
			"shield_pct": 20,
			"shield_attenuation_reduction": 40
		},
		"AbilityTextureName": "solthra_upgrade_11"
	},
	"solthra_upgrade_12": {
		"Note": "持久灼烧",
		"Description": "<HotkeyOnly|Defense/><Ability|solthra_3/>持续时间增加%duration%秒",
		"ability_name": "solthra_3",
		"max": 1,
		"AbilityValues": {
			"duration": 1.5
		},
		"AbilityTextureName": "solthra_upgrade_12"
	},
	"solthra_upgrade_13": {
		"Note": "炽烈光环",
		"Description": "<HotkeyOnly|Defense/><Ability|solthra_3/>激活期间，技能伤害提升%spell_amp%%并每秒恢复%mana_regen%<Fury:怒气值/>",
		"ability_name": "solthra_3",
		"max": 1,
		"AbilityValues": {
			"spell_amp": 25,
			"mana_regen": 3
		},
		"AbilityTextureName": "solthra_upgrade_13"
	},
	"solthra_upgrade_14": {
		"Note": "火焰精灵",
		"Description": "<Summon:召唤/>火焰精灵协同作战，自动进行攻击",
		"ability_name": "solthra_attack",
		"max": 1,
		"AbilityValues": {
			"wisp_attack": {
				"value": 0,
				"+attack": 2
			}
		},
		"AbilityTextureName": "solthra_upgrade_14"
	},
	"solthra_upgrade_15": {
		"Note": "末日重启",
		"Description": "释放<HotkeyOnly|Ultimate/><Ability|solthra_4/>后刷新其他技能冷却时间",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_15"
	},
	"solthra_upgrade_16": {
		"Note": "陨石风暴",
		"Description": "<Fury:怒气值/>上限提升%mana_bonus%，施放<HotkeyOnly|Ultimate/><Ability|solthra_4/>会消耗所有<Fury:怒气值/>召唤额外陨石",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityValues": {
			"mana_bonus": 100
		},
		"AbilityTextureName": "solthra_upgrade_16"
	},
	"solthra_upgrade_17": {
		"Note": "毁灭滚石",
		"Description": "<HotkeyOnly|Ultimate/><Ability|solthra_4/>落地后继续翻滚%roll_distance%距离，每次翻滚造成%roll_damage%%伤害",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityValues": {
			"roll_distance": 800,
			"roll_damage": 30,
			"roll_interval": 0.5
		},
		"AbilityTextureName": "solthra_upgrade_17"
	},
	"solthra_upgrade_18": {
		"Note": "火球术精通",
		"Description": "提升%pulse_count%个<HotkeyOnly|Skill/><Ability|solthra_1/>数量",
		"ability_name": "solthra_1",
		"max": 2,
		"AbilityTextureName": "solthra_upgrade_18",
		"AbilityValues": {
			"pulse_count": "2 4"
		}
	},
	"solthra_upgrade_19": {
		"Note": "火星飞溅",
		"Description": "<HotkeyOnly|Defense/><Ability|solthra_3/>激活期间，每隔%attack_interval%秒发射<HotkeyOnly|Attack/><Ability|solthra_attack/>",
		"ability_name": "solthra_3",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_19",
		"AbilityValues": {
			"attack_interval": 0.75
		}
	},
	"solthra_upgrade_20": {
		"Note": "急可不耐",
		"Description": "<HotkeyOnly|Dodge/><Ability|solthra_2/>获得%fury_gain%<Fury:怒气/>",
		"ability_name": "solthra_2",
		"max": 2,
		"AbilityTextureName": "solthra_upgrade_20",
		"AbilityValues": {
			"fury_gain": "20 40"
		}
	},
	"solthra_upgrade_21": {
		"Note": "暴躁精灵",
		"Description": "提升%summon_attackspeed%<Summon:召唤物/>的攻击速度",
		"ability_name": "solthra_attack",
		"RequireUpgrades": "solthra_upgrade_14",
		"max": 2,
		"AbilityTextureName": "solthra_upgrade_21",
		"AbilityValues": {
			"summon_attackspeed": "100 200"
		}
	},
	"solthra_upgrade_22": {
		"Note": "陨石冲击",
		"Description": "提升<HotkeyOnly|Ultimate/><Ability|solthra_4/>%damage%点伤害并增加击晕效果",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_22",
		"AbilityValues": {
			"stun_duration": 1,
			"damage": 40
		}
	},
	"solthra_upgrade_23": {
		"Note": "毁灭滚石",
		"Description": "提升<HotkeyOnly|Ultimate/><Ability|solthra_4/>%damage%点伤害且翻滚增加击退效果",
		"ability_name": "solthra_4",
		"RequireUpgrades": "solthra_upgrade_17",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_23",
		"AbilityValues": {
			"roll_knockback": 50,
			"damage": 30
		}
	},
	"solthra_upgrade_24": {
		"Note": "护甲融化",
		"Description": "提升<HotkeyOnly|Defense/><Ability|solthra_3/>%damage%点伤害并造成%shield_pct%%护盾削减",
		"ability_name": "solthra_3",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_24",
		"AbilityValues": {
			"shield_pct": 5,
			"damage": 10
		}
	},
	"solthra_upgrade_25": {
		"Note": "火焰精通",
		"Description": "移除<HotkeyOnly|Attack/><Ability|solthra_attack/>的攻击前摇且有%passive_chance%%的概率无视间隔直接发动",
		"ability_name": "solthra_attack",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_25",
		"AbilityValues": {
			"passive_chance": 30
		}
	},
	"solthra_upgrade_26": {
		"Note": "极速陨石",
		"Description": "提升<HotkeyOnly|Ultimate/><Ability|solthra_4/>%damage%点伤害并大幅降低落地时间",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_26",
		"AbilityValues": {
			"delay": -0.5,
			"damage": 30
		}
	},
	"solthra_upgrade_27": {
		"Note": "火山喷发",
		"Description": "<HotkeyOnly|Ultimate/><Ability|solthra_4/>在落点发动<HotkeyOnly|Skill/><Ability|solthra_1/>",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_27"
	},
	"solthra_upgrade_28": {
		"Note": "环绕火球",
		"Description": "<HotkeyOnly|Skill/><Ability|solthra_1/>额外召唤%ring_count%个火球<Ring:环绕物/>",
		"ability_name": "solthra_1",
		"max": 2,
		"AbilityTextureName": "solthra_upgrade_28",
		"AbilityValues": {
			"ring_count": {
				"value": "2 4",
				"+ring_count": 1
			},
			"ring_duration": 4,
			"ring_speed": {
				"value": 100,
				"*ring_speed_amplify": 1
			}
		}
	},
	"solthra_upgrade_29": {
		"Note": "腾焰之舞",
		"Description": "<HotkeyOnly|Defense/><Ability|solthra_3/>激活期间，提升<Ring:环绕物/>速度",
		"ability_name": "solthra_3",
		"RequireUpgrades": "solthra_upgrade_28",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_29",
		"AbilityValues": {
			"ring_speed_amplify": 100
		}
	},
	"solthra_upgrade_30": {
		"Note": "余温",
		"Description": "提升火球<Ring:环绕物/>%ring_duration%秒持续时间",
		"ability_name": "solthra_1",
		"RequireUpgrades": "solthra_upgrade_28",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_30",
		"AbilityValues": {
			"ring_duration": 3
		}
	},
	"solthra_upgrade_31": {
		"Note": "三伏天",
		"Description": "每隔%firestorm_interval%秒降下一波火雨",
		"ability_name": "solthra_4",
		"RequireUpgrades": "solthra_upgrade_32",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_31",
		"AbilityValues": {
			"firestorm_interval": 2
		}
	},
	"solthra_upgrade_32": {
		"Note": "混沌火雨",
		"Description": "<HotkeyOnly|Ultimate/><Ability|solthra_4/>后降下%firestorm_wave%波火雨，造成%firestorm_damage%%伤害",
		"ability_name": "solthra_4",
		"max": 1,
		"AbilityTextureName": "solthra_upgrade_32",
		"AbilityValues": {
			"firestorm_wave": 3,
			"firestorm_radius": {
				"value": 300,
				"*aoe_amplify": 1
			},
			"firestorm_damage": 30
		}
	},
	"seraphon_upgrade_1": {
		"AbilityTextureName": "seraphon_upgrade_1",
		"Note": "裁决印记",
		"Description": "攻击会叠加%attackspeed_per_stack%点攻击速度，最多叠加%attackspeed_max_stack%次",
		"ability_name": "seraphon_attack",
		"max": 1,
		"AbilityValues": {
			"attackspeed_per_stack": 15,
			"attackspeed_max_stack": 8,
			"attackspeed_duration": 3
		}
	},
	"seraphon_upgrade_2": {
		"AbilityTextureName": "seraphon_upgrade_2",
		"Note": "天罚圣槌",
		"Description": "触发<HotkeyOnly|Attack/><Ability|seraphon_attack/>时，刷新<HotkeyOnly|Dodge/><Ability|seraphon_2/>的冷却时间",
		"ability_name": "seraphon_attack",
		"max": 1
	},
	"seraphon_upgrade_3": {
		"AbilityTextureName": "seraphon_upgrade_3",
		"Note": "群星护佑",
		"Description": "触发<HotkeyOnly|Attack/><Ability|seraphon_attack/>时，为所有友军施加%shield%<Shield:护盾/>",
		"ability_name": "seraphon_attack",
		"max": 1,
		"AbilityValues": {
			"shield": 20
		}
	},
	"seraphon_upgrade_4": {
		"AbilityTextureName": "seraphon_upgrade_4",
		"Note": "回响圣槌",
		"Description": "提升<HotkeyOnly|Skill/><Ability|seraphon_1/>投掷速度",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"speed": 800,
			"drop_time": -0.5
		}
	},
	"seraphon_upgrade_5": {
		"AbilityTextureName": "seraphon_upgrade_5",
		"Note": "重锤审判",
		"Description": "攻击变为%attackrange%范围<Mark|震击/>，攻速降低%attackspeed_reduce_pct%%并提升%attack_pct%%攻击力",
		"ability_name": "seraphon_attack",
		"max": 1,
		"AbilityValues": {
			"attackspeed_reduce_pct": 30,
			"attackrange": 300,
			"attack_pct": 45
		}
	},
	"seraphon_upgrade_6": {
		"AbilityTextureName": "seraphon_upgrade_6",
		"Note": "圣槌洗礼",
		"Description": "拾取圣槌时接受<Mark|洗礼/>，对周围造成伤害",
		"ability_name": "seraphon_1",
		"max": 1
	},
	"seraphon_upgrade_7": {
		"AbilityTextureName": "seraphon_upgrade_7",
		"Note": "自返弹射",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>没有弹射目标时，会以自身为目标继续弹射",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"bounce_to_self_when_no_target": 1
		}
	},
	"seraphon_upgrade_8": {
		"AbilityTextureName": "seraphon_upgrade_8",
		"Note": "神锤追击",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>命中对目标降下<Punishment:天罚/>",
		"ability_name": "seraphon_1",
		"max": 1
	},
	"seraphon_upgrade_9": {
		"AbilityTextureName": "seraphon_upgrade_9",
		"Note": "天赐回收",
		"Description": "圣槌会向使用者的位置掉落",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"auto_retrieve_after_duration": 1
		}
	},
	"seraphon_upgrade_10": {
		"AbilityTextureName": "seraphon_upgrade_10",
		"Note": "连锁审判",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>弹射次数增加%count%次",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"count": 2
		}
	},
	"seraphon_upgrade_11": {
		"AbilityTextureName": "seraphon_upgrade_11",
		"Note": "壁垒冲击",
		"Description": "<HotkeyOnly|Dodge/><Ability|seraphon_2/>额外造成自身%damage%伤害",
		"ability_name": "seraphon_2",
		"max": 1,
		"AbilityValues": {
			"damage": {
				"value": 0,
				"+shield": 0.25
			}
		}
	},
	"seraphon_upgrade_12": {
		"AbilityTextureName": "seraphon_upgrade_12",
		"Note": "破阵余势",
		"Description": "<HotkeyOnly|Dodge/><Ability|seraphon_2/>撞击敌人后不再停止，仍会继续前进",
		"ability_name": "seraphon_2",
		"max": 1
	},
	"seraphon_upgrade_13": {
		"AbilityTextureName": "seraphon_upgrade_13",
		"Note": "反击圣焰",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>期间每次<Hit:受击/>都会<Counter:反击/>降下<Punishment:天罚/>",
		"ability_name": "seraphon_3",
		"max": 1
	},
	"seraphon_upgrade_14": {
		"AbilityTextureName": "seraphon_upgrade_14",
		"Note": "守护反击",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>期间召唤%ring_count%个圣槌<Ring:环绕物/>",
		"ability_name": "seraphon_3",
		"RequireUpgrades": "seraphon_upgrade_20",
		"max": 1,
		"AbilityValues": {
			"ring_count": {
				"value": 4,
				"+ring_count": 1
			}
		}
	},
	"seraphon_upgrade_15": {
		"AbilityTextureName": "seraphon_upgrade_15",
		"Note": "不朽誓约",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>成功防御后永久提升%hp_pct_per_stack%%最大生命值，最多%hp_max_stack%次",
		"ability_name": "seraphon_3",
		"max": 1,
		"AbilityValues": {
			"hp_pct_per_stack": 1,
			"hp_max_stack": 80
		}
	},
	"seraphon_upgrade_16": {
		"AbilityTextureName": "seraphon_upgrade_16",
		"Note": "急速圣辉",
		"Description": "<HotkeyOnly|Ultimate/><Ability|seraphon_4/>增加%ult_attack_speed_bonus%攻击速度，并减少%require_count_reduce%次<HotkeyOnly|Attack/><Ability|seraphon_attack/>触发所需次数",
		"ability_name": "seraphon_4",
		"max": 1,
		"AbilityValues": {
			"ult_attack_speed_bonus": 80,
			"require_count_reduce": 1
		}
	},
	"seraphon_upgrade_17": {
		"AbilityTextureName": "seraphon_upgrade_17",
		"Note": "延光圣域",
		"Description": "<HotkeyOnly|Ultimate/><Ability|seraphon_4/>持续时间增加%duration%秒",
		"ability_name": "seraphon_4",
		"max": 1,
		"AbilityValues": {
			"duration": 2
		}
	},
	"seraphon_upgrade_18": {
		"AbilityTextureName": "seraphon_upgrade_18",
		"Note": "曜光广照",
		"Description": "<HotkeyOnly|Ultimate/><Ability|seraphon_4/>作用范围增加%radius%",
		"ability_name": "seraphon_4",
		"max": 1,
		"AbilityValues": {
			"radius": 200
		}
	},
	"seraphon_upgrade_19": {
		"AbilityTextureName": "seraphon_upgrade_19",
		"Note": "落槌圣坛",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>坠地点会生成一个小型<HotkeyOnly|Ultimate/><Ability|seraphon_4/>",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"radius_pct": 40,
			"duration_pct": 50
		}
	},
	"seraphon_upgrade_20": {
		"AbilityTextureName": "seraphon_upgrade_20",
		"Note": "环绕圣槌",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>额外召唤%ring_count%个圣槌<Ring:环绕物/>",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"ring_count": {
				"value": 1,
				"+ring_count": 1
			},
			"ring_duration": 4,
			"ring_speed": {
				"value": 180,
				"*ring_speed_amplify": 1
			}
		}
	},
	"seraphon_upgrade_21": {
		"AbilityTextureName": "seraphon_upgrade_21",
		"Note": "永恒信仰",
		"Description": "提升圣槌<Ring:环绕物/>%ring_duration%秒持续时间",
		"ability_name": "seraphon_1",
		"RequireUpgrades": "seraphon_upgrade_14|seraphon_upgrade_20",
		"max": 1,
		"AbilityValues": {
			"ring_duration": 4
		}
	},
	"seraphon_upgrade_22": {
		"AbilityTextureName": "seraphon_upgrade_22",
		"Note": "圣盾洗礼",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>结束时接受<Mark|洗礼/>，对周围造成伤害",
		"ability_name": "seraphon_3",
		"max": 1
	},
	"seraphon_upgrade_23": {
		"AbilityTextureName": "seraphon_upgrade_23",
		"Note": "圣恩洗礼",
		"Description": "<Mark|洗礼/>还会提供%purify_shield%<StrongShield:强效护盾/>",
		"ability_name": "seraphon_3",
		"RequireUpgrades": "seraphon_upgrade_6|seraphon_upgrade_22",
		"max": 1,
		"AbilityValues": {
			"purify_shield": 20
		}
	},
	"seraphon_upgrade_24": {
		"AbilityTextureName": "seraphon_upgrade_24",
		"Note": "神眷之雨",
		"Description": "<HotkeyOnly|Ultimate/><Ability|seraphon_4/>期间持续降下<Punishment:天罚/>",
		"ability_name": "seraphon_4",
		"max": 1
	},
	"seraphon_upgrade_25": {
		"AbilityTextureName": "seraphon_upgrade_25",
		"Note": "赎罪",
		"Description": "提升<Punishment:天罚/>%punishment_damage%点伤害并能击晕目标",
		"ability_name": "seraphon_4",
		"RequireUpgrades": "seraphon_upgrade_24|seraphon_upgrade_13|seraphon_upgrade_28",
		"max": 1,
		"AbilityValues": {
			"punishment_stun": 1,
			"punishment_damage": 10
		}
	},
	"seraphon_upgrade_26": {
		"AbilityTextureName": "seraphon_upgrade_26",
		"Note": "裁决圣槌",
		"Description": "攻击有%punishment_chance%%概率对目标降下<Punishment:天罚/>",
		"ability_name": "seraphon_4",
		"max": 1,
		"AbilityValues": {
			"punishment_chance": 35
		}
	},
	"seraphon_upgrade_27": {
		"AbilityTextureName": "seraphon_upgrade_27",
		"Note": "重锤回响",
		"Description": "<Mark|震击/>会向前蔓延%aoe_count%次",
		"ability_name": "seraphon_attack",
		"RequireUpgrades": "seraphon_upgrade_5",
		"max": 1,
		"AbilityValues": {
			"aoe_count": 2,
			"aoe_reduce_pct": 0
		}
	},
	"seraphon_upgrade_28": {
		"AbilityTextureName": "seraphon_upgrade_28",
		"Note": "天罚降临",
		"Description": "每隔%punishment_interval%秒降下<Punishment:天罚/>",
		"ability_name": "seraphon_4",
		"max": 1,
		"AbilityValues": {
			"punishment_interval": 1.5
		}
	},
	"seraphon_upgrade_29": {
		"AbilityTextureName": "seraphon_upgrade_29",
		"Note": "圣槌引力",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>伤害提升%damage%点并且落地时会小范围牵引周围的敌人",
		"ability_name": "seraphon_1",
		"max": 1,
		"AbilityValues": {
			"pull_radius": 280,
			"damage": 9
		}
	},
	"seraphon_upgrade_30": {
		"AbilityTextureName": "seraphon_upgrade_30",
		"Note": "圣槌超度",
		"Description": "<HotkeyOnly|Skill/><Ability|seraphon_1/>命中<LowHealth:危血/>单位不消耗弹射次数",
		"ability_name": "seraphon_1",
		"max": 1
	},
	"seraphon_upgrade_31": {
		"AbilityTextureName": "seraphon_upgrade_31",
		"Note": "守护壁垒",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>的持续时间提升%duration%秒",
		"ability_name": "seraphon_3",
		"max": 1,
		"AbilityValues": {
			"duration": 1.2
		}
	},
	"seraphon_upgrade_32": {
		"AbilityTextureName": "seraphon_upgrade_32",
		"Note": "荣耀震壁",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>伤害提升%damage%点并且升级为圆形范围",
		"ability_name": "seraphon_3",
		"max": 1,
		"AbilityValues": {
			"damage": 18
		}
	},
	"seraphon_upgrade_33": {
		"AbilityTextureName": "seraphon_upgrade_33",
		"Note": "雷电天罚",
		"Description": "<Punishment:天罚/>还会召唤等量伤害的<Mark|雷击/>",
		"ability_name": "seraphon_4",
		"RequireUpgrades": "seraphon_upgrade_24|seraphon_upgrade_13|seraphon_upgrade_28",
		"RequireBless1": "item_zeus_skill|item_zeus_dodge|item_zeus_return|item_zeus_consume",
		"max": 1
	},
	"seraphon_upgrade_34": {
		"AbilityTextureName": "seraphon_upgrade_34",
		"Note": "坚强后盾",
		"Description": "<HotkeyOnly|Defense/><Ability|seraphon_3/>期间每%interval%秒发动<Counter:反击/>效果",
		"ability_name": "seraphon_3",
		"max": 1,
		"AbilityValues": {
			"interval": 0.3
		}
	}
};