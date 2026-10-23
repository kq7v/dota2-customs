--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().courier_abilities = {
	"courier_600001": {
		"Name": "生命",
		"Description": "生命值提升%health_pct%%",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600001",
		"AbilityTextureName": "dragon_knight_dragon_blood",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"health_pct": "0 10 15 20 25 30"
		}
	},
	"courier_600002": {
		"Name": "出击伤害",
		"Description": "对未受伤的单位造成的伤害提升%damage_pct%%[x]",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600002",
		"AbilityTextureName": "life_stealer/bloody_ripper_abilityicons/life_stealer_consume",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_pct": "5 10 15 20 25 30"
		}
	},
	"courier_600003": {
		"Name": "无伤增伤",
		"Description": "无伤完成遭遇战时提升%damage_up_pct%%[x]伤害",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600003",
		"AbilityTextureName": "earthshaker/earthshaker_arcana/earthshaker_echo_slam",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_up_pct": "0.2 0.4 0.6 0.8 1 1.2"
		}
	},
	"courier_600004": {
		"Name": "破坏物",
		"Description": "+%drop_chance%%破坏物的掉落率",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600004",
		"AbilityTextureName": "alchemist/midas_knuckles/alchemist_goblins_greed",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"drop_chance": "0.5 1 1.5 2 2.5 3"
		}
	},
	"courier_600013": {
		"Name": "移速狂飙",
		"Description": "每有%threshold%点移动速度使攻击和特技伤害总增%damage_pct%%[x]",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600013",
		"AbilityTextureName": "sven_storm_bolt",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"threshold": 100,
			"damage_pct": "1 1.5 2 2.5 3 3.5"
		}
	},
	"courier_600014": {
		"Name": "连击爆破",
		"Description": "连续攻击单个目标时，每%count%次攻击触发一次%blast_damage%的爆炸，触发间隔%cd%秒",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600014",
		"AbilityTextureName": "chaos_knight_reality_rift",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"count": 2,
			"blast_damage": {
				"value": 0,
				"+attack": "0.4 0.6 0.8 1 1.2 1.4"
			},
			"blast_radius": 375,
			"cd": 0.4
		}
	},
	"courier_600015": {
		"Name": "V2技能",
		"Description": "技能伤害将额外附加1次攻击，造成%bonus_spell_damage%自适应伤害，触发间隔%cd%秒",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600015",
		"AbilityTextureName": "largo_song_fight_song_rhythm",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"bonus_spell_damage": {
				"value": 0,
				"+attack": "0.1 0.2 0.3 0.4 0.5 0.6"
			},
			"cd": 0.5
		}
	},
	"courier_600016": {
		"Name": "兽兽盾牌",
		"Description": "所有情况下护盾削减时总降%shield_attenuation_reduction%%,每场遭遇战开始获得%shield%的护盾",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600016",
		"AbilityTextureName": "mars_gods_rebuke",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"shield": 100,
			"shield_attenuation_reduction": "4 8 12 16 20 24"
		}
	},
	"courier_600017": {
		"Name": "遗物宝盆",
		"Description": "每有1件遗物获得%bonus_attack%点攻击力和%bonus_health%点最大生命值提升",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600017",
		"AbilityTextureName": "brewmaster_primal_split_cancel",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"bonus_attack": "0.5 1 1.5 2 2.5 3",
			"bonus_health": "10 12 14 16 18 20"
		}
	},
	"courier_600018": {
		"Name": "闪避重击",
		"Description": "每次规避伤害使下一次攻击伤害提升%attack_damage_amp%%[x]",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600018",
		"AbilityTextureName": "marci_bodyguard",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attack_damage_amp": "30 40 50 60 70 80"
		}
	},
	"courier_600019": {
		"Name": "特技增伤",
		"Description": "利用<HotkeyOnly|Skill/>特技技能击中一个敌人都会提升自身%damage_up_pct%%所有伤害[x]，最多%max_stack%层。",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600019",
		"AbilityTextureName": "phantom_assassin/persona/phantom_assassin_phantom_strike_persona1",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_up_pct": "1 1.5 2 2.5 3 3.5",
			"max_stack": 10
		}
	},
	"courier_600020": {
		"Name": "暴击伤害",
		"Description": "+%crit_damage_pct%%暴击伤害[x]",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600020",
		"AbilityTextureName": "life_stealer_consume",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"crit_damage_pct": "20 25 30 35 40 45"
		}
	},
	"courier_600021": {
		"Name": "商店刷新",
		"Description": "自身刷新商店时，返还本次消耗金币的%refund_pct%%。",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600021",
		"AbilityTextureName": "ability_capture",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"refund_pct": "8 16 24 32 40 48"
		}
	},
	"courier_600022": {
		"Name": "冲刺增伤",
		"Description": "释放<HotkeyOnly|Dodge/>冲刺后+%damage_up_pct%%特技伤害，持续%duration%秒，重复触发刷新持续时间",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600022",
		"AbilityTextureName": "primal_beast_onslaught_release",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_up_pct": "15 30 45 60 75 90",
			"duration": 2
		}
	},
	"courier_600024": {
		"Name": "纯金贪魔",
		"Description": "每拥有1件遗物使魔法伤害提高%attribute_pct%%%[x]，最多累加10次。",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600024",
		"AbilityTextureName": "omni_knight/omni_fall20_immortal_ability_icon/omni_fall20_immortal_degen_aura",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attribute_pct": "1 2 3 4 5 6",
			"stack_max": 10
		}
	},
	"courier_600025": {
		"Name": "咬人箱",
		"Description": "每拥有1件遗物使物理伤害提高%attribute_pct%%%[x]，最多累加10次。",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600025",
		"AbilityTextureName": "omni_knight/omni_fall20_immortal_ability_icon/omni_fall20_immortal_crimson_degen_aura",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attribute_pct": "1 2 3 4 5 6",
			"stack_max": 10
		}
	},
	"courier_600026": {
		"Name": "大聪明",
		"Description": "攻击/技能暴击率提升%crit_chance_pct%%",
		"BaseClass": "ability_lua",
		"ScriptFile": "abilities/courier/courier_600026",
		"AbilityTextureName": "lycan_summon_wolves_critical_strike",
		"MaxLevel": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"crit_chance_pct": "2.5 5 7.5 10 12.5 15"
		}
	}
};