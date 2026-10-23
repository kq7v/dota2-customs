--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().potion = {
	"item_potion_fury": {
		"Note": "怒气药水",
		"Description": "释放绝招后回复怒气",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_fury",
		"AbilityTextureName": "item_flayers_bota",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL"
	},
	"item_potion_vitality": {
		"Note": "活力药水",
		"Description": "遭遇战开始时回复生命",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_vitality",
		"AbilityTextureName": "item_flayers_bota",
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		}
	},
	"item_potion_gold": {
		"Note": "淘金药水",
		"Description": "遭遇战开始时发现金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_gold",
		"AbilityTextureName": "item_flayers_bota",
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		}
	},
	"item_potion_drop_heal": {
		"Note": "搜刮药水",
		"Description": "敌人会掉落治疗药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_drop_heal",
		"AbilityTextureName": "item_flayers_bota",
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		}
	},
	"item_potion_haste": {
		"Note": "极速药水",
		"Description": "移动速度提升",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_haste",
		"AbilityTextureName": "item_flayers_bota",
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		}
	},
	"item_potion_rage": {
		"Note": "狂暴药水",
		"Description": "攻击速度提升",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_rage",
		"AbilityTextureName": "item_flayers_bota",
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		}
	},
	"item_potion_calming": {
		"Note": "宁静药水",
		"Description": "冷却缩减提升",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/potion/item_potion_calming",
		"AbilityTextureName": "item_flayers_bota",
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"charge": 6,
			"value": 10
		}
	}
};