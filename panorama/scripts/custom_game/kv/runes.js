--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().runes = {
	"item_rune_charge": {
		"Note": "充能",
		"Description": "每释放一次该技能后，根据技能类型获得<chargepoints:充能点数/>，攻击%attack_charge%点，特技、冲刺、防御%ability1_charge%点，绝招%ability4_charge%点，触发间隔%charge_interval%秒，最大储存%charge_max%点充能",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_charge",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"attack_charge": 1,
			"ability1_charge": 6,
			"ability2_charge": 6,
			"ability3_charge": 6,
			"ability4_charge": 12,
			"charge_interval": 1,
			"charge_max": 100
		}
	},
	"item_rune_charge_upgrade1": {
		"Note": "充能2",
		"Description": "该技能获得充能时，有%double_charge_prop%%概率获得双倍充能",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_charge",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"double_charge_prop": 50
		}
	},
	"item_rune_charge_active": {
		"Note": "释放",
		"Description": "拥有充能且释放该技能时，消耗%charge_consume%点充能，使该技能释放时额外+%damage_boost%%伤害",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_charge_active",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"charge_consume": 20,
			"damage_boost": 60
		}
	},
	"item_rune_charge_active_upgrade1": {
		"Note": "释放2",
		"Description": "该技能消耗充能时有%reset_cd_prop%%概率返还消耗值",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_charge_active",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"reset_cd_prop": 50
		}
	},
	"item_rune_substitute": {
		"Note": "痛击",
		"Description": "每释放一次该技能后，为该技能储存%charge_count%点痛击点数，达到%charge_count_max%点时，消耗全部点数，使该技能下次造成双倍伤害",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_substitute",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"charge_count": 1,
			"charge_count_max": 6,
			"damage_boost": 100
		}
	},
	"item_rune_substitute_upgrade1": {
		"Note": "痛击2",
		"Description": "该技能获得痛击点数时，有%double_charge_prop%%概率获得双倍痛击点数",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_substitute",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"double_charge_prop": 50
		}
	},
	"item_rune_vulnerable": {
		"Note": "易伤",
		"Description": "该技能命中敌人时，施加1层持续%buff_duration%秒的<vulnerablepoints:易伤状态/>，每层使其受到自身造成的所有伤害+%effect_per_stack%%，自身对单个单位最大叠加%max_stack_count%层",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_vulnerable",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"apply_count": 1,
			"buff_duration": 10,
			"effect_per_stack": 1,
			"max_stack_count": 10
		}
	},
	"item_rune_vulnerable_upgrade1": {
		"Note": "易伤2",
		"Description": "自身对单个单位最大叠加层数+%max_stack_count%，且修改为受到自身及友军的所有伤害增加",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_vulnerable",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"max_stack_count": 6
		}
	},
	"item_rune_weaken": {
		"Note": "削弱",
		"Description": "该技能命中敌人时，附带1层持续%buff_duration%秒的迟缓，每层使其攻击速度和移动速度降低%effect_per_stack%%，所有友军对单个单位最大叠加%stack_max%层",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_weaken",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"apply_count": 1,
			"buff_duration": 10,
			"effect_per_stack": 1,
			"stack_max": 25
		}
	},
	"item_rune_weaken_upgrade1": {
		"Note": "削弱2",
		"Description": "该技能命中敌人时，附带1层持续%weaken_buff_duration%秒的虚弱，每层使其造成的伤害降低%weaken_per_stack%%，所有友军对单个单位最大叠加%weaken_stack_max%层",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_weaken",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"weaken_apply_count": 1,
			"weaken_buff_duration": 10,
			"weaken_per_stack": 1,
			"weaken_stack_max": 25
		}
	},
	"item_rune_celerity": {
		"Note": "迅捷",
		"Description": "每释放一次该技能后，使自身获得1层持续%buff_duration%秒的迅捷，每层使攻击和移动速度+%effect_per_stack%%，自身获得的迅捷最大叠加%max_stack_count%层",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_celerity",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"apply_count": 1,
			"buff_duration": 10,
			"effect_per_stack": 3,
			"max_stack_count": 10
		}
	},
	"item_rune_celerity_upgrade1": {
		"Note": "迅捷2",
		"Description": "迅捷达到最大层数时，清空所有层数，使该技能下一次释放后冷却时间减少%cd_reduce%%，且使自身获得持续%plus_duration%秒的爆发，使攻击和移动速度+%plus_effect%%",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_celerity",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"cd_reduce": 30,
			"plus_duration": 5,
			"plus_effect": 50
		}
	},
	"item_rune_shield": {
		"Note": "护盾",
		"Description": "每释放一次该技能后，获得%shield_value%点护盾，触发间隔%shield_interval%秒",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_shield",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"shield_value": 8,
			"shield_interval": 1
		}
	},
	"item_rune_shield_upgrade1": {
		"Note": "护盾2",
		"Description": "该技能触发时有%share_prop%%概率使随机友军获得%share_shield%点护盾",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_shield",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"share_prop": 60,
			"share_shield": 6
		}
	},
	"item_rune_circle": {
		"Note": "阵法",
		"Description": "每释放一次该技能后，储存1点<circlepoints:阵法点数/>，达到%trigger_charge%点时，消耗全部点数，以自身为中心生成持续%duration%秒的%range%码的阵法，使自身及队友造成的所有伤害+%damage_boost%%",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_circle",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"charge_count": 1,
			"trigger_charge": 5,
			"duration": 6,
			"range": 300,
			"damage_boost": 10
		}
	},
	"item_rune_circle_upgrade1": {
		"Note": "阵法2",
		"Description": "该技能触发阵法后，使自身获得1层持续%plus_duration%秒的精通，每层使自身阵法效果+%damage_boost%%，阵法范围+%range%%，自身获得的精通最大叠加%plus_stack_max%层",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/rune/item_rune_circle",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "RuneBuild",
		"AbilityValues": {
			"charge_count": 1,
			"plus_duration": 10,
			"damage_boost": 15,
			"range": 20,
			"plus_stack_max": 10
		}
	}
};