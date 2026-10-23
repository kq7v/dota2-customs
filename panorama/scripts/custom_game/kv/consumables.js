--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().consumables = {
	"item_heal_shop": {
		"Note": "商人秘药",
		"Description": "回复英雄%health_regen%",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_heal_shop",
		"AbilityTextureName": "item_salve",
		"Rarity": 1,
		"Access": "Shop",
		"Model": "models/eom/props/potion_green/potion_green_01.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health_regen": {
				"value": 0,
				"*potion_heal_restore": 1,
				"*break_drop_profit_pct": 1,
				"+health": 0.3
			}
		}
	},
	"item_health_potion_1": {
		"Note": "小型治疗药水",
		"Description": "回复所有英雄%health_regen%生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_health_potion_1",
		"AbilityTextureName": "item_elixer3",
		"Rarity": 1,
		"Access": "Shop",
		"AbilityValues": {
			"health_regen": {
				"value": 0,
				"*potion_heal_restore": 1,
				"*break_drop_profit_pct": 1,
				"+health": 0.1
			}
		},
		"Model": "models/eom/props/potion_green/potion_green_01.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_health_potion_2": {
		"Note": "治疗药水",
		"Description": "回复所有英雄%health_regen%生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_health_potion_2",
		"AbilityTextureName": "item_elixer2",
		"Rarity": 1,
		"Access": "Shop",
		"AbilityValues": {
			"health_regen": {
				"value": 0,
				"*potion_heal_restore": 1,
				"*break_drop_profit_pct": 1,
				"+health": 0.2
			}
		},
		"Model": "models/eom/props/potion_green/potion_green_02.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_health_potion_3": {
		"Note": "强效治疗药水",
		"Description": "回复所有英雄%health_regen%生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_health_potion_3",
		"AbilityTextureName": "item_elixer1",
		"Rarity": 1,
		"Access": "Shop",
		"AbilityValues": {
			"health_regen": {
				"value": 0,
				"*potion_heal_restore": 1,
				"*break_drop_profit_pct": 1,
				"+health": 0.3
			}
		},
		"Model": "models/eom/props/potion_green/potion_green_03.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_mana_potion_1": {
		"Note": "小型怒气药水",
		"Description": "回复所有英雄%mana_regen%怒气值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_mana_potion_1",
		"AbilityTextureName": "item_elixer3",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"mana_regen": {
				"value": 10,
				"*break_drop_profit_pct": 1
			}
		},
		"Model": "models/eom/props/potion_green/potion_green_01.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"Skin": "red",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_mana_potion_2": {
		"Note": "怒气药水",
		"Description": "回复所有英雄%mana_regen%怒气值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_mana_potion_2",
		"AbilityTextureName": "item_elixer2",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"mana_regen": {
				"value": 20,
				"*break_drop_profit_pct": 1
			}
		},
		"Model": "models/eom/props/potion_green/potion_green_02.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"Skin": "red",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_mana_potion_3": {
		"Note": "强效怒气药水",
		"Description": "回复所有英雄%mana_regen%怒气值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_mana_potion_3",
		"AbilityTextureName": "item_elixer2",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"mana_regen": {
				"value": 30,
				"*break_drop_profit_pct": 1
			}
		},
		"Model": "models/eom/props/potion_green/potion_green_03.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"Skin": "red",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_regen_bottle": {
		"Note": "恢复魔瓶",
		"Description": "所有英雄回复 %regen_pct%% 最大生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_regen_bottle",
		"AbilityTextureName": "item_bottle_water",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"regen_pct": {
				"value": 50,
				"*break_drop_profit_pct": 1
			}
		},
		"Model": "models/props_gameplay/bottle_blue.vmdl",
		"Particle": "particles/generic_gameplay/items/items_dropped.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_ball_attack": {
		"Note": "大力菠菜",
		"Description": "所有英雄增加%value%攻击，%spell_damage%%技能伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_ball_attack",
		"AbilityTextureName": "item_tango",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"value": 3,
			"spell_damage": 15
		},
		"Particle": "particles/generic_gameplay/rune/ball_damage.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_ball_attack_single": {
		"Note": "大力菠菜(单人)",
		"Description": "增加%value%攻击，%spell_damage%%技能伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_ball_attack_single",
		"AbilityTextureName": "item_tango",
		"Rarity": 0,
		"Access": "Shop",
		"Particle": "particles/generic_gameplay/rune/ball_damage.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"value": 3,
			"spell_damage": 15
		}
	},
	"item_ball_health": {
		"Note": "蛋糕",
		"Description": "所有英雄增加%value%最大生命",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_ball_health",
		"AbilityTextureName": "cake",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"value": 20
		},
		"Particle": "particles/generic_gameplay/rune/ball_health.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_ball_health_single": {
		"Note": "蛋糕(单人)",
		"Description": "增加%value%最大生命",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_ball_health_single",
		"AbilityTextureName": "cake",
		"Rarity": 0,
		"Access": "Shop",
		"Particle": "particles/generic_gameplay/rune/ball_health.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"value": 20
		}
	},
	"item_ball_defense": {
		"Note": "防御球",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_ball_defense",
		"Rarity": 0,
		"Access": "Shop",
		"AbilityValues": {
			"value": 10
		},
		"Model": "models/props_gameplay/rune_shield01.vmdl",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_tome_of_prop": {
		"Note": "属性书",
		"Description": "所有英雄增加%attack%攻击，%health%最大生命，%spell_damage%%技能伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_tome_of_prop",
		"AbilityTextureName": "item_tome_of_aghanim",
		"Rarity": 0,
		"Access": "Shop",
		"Particle": "particles/generic_gameplay/rune/rune_property.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health": 20,
			"attack": 3,
			"spell_damage": 15
		}
	},
	"item_tome_of_prop_single": {
		"Note": "属性书(单人)",
		"Description": "增加%attack%攻击，%health%最大生命，%spell_damage%%技能伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_tome_of_prop_single",
		"AbilityTextureName": "item_tome_of_aghanim",
		"Rarity": 0,
		"Access": "Shop",
		"Particle": "particles/generic_gameplay/rune/rune_property.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health": 20,
			"attack": 3,
			"spell_damage": 15
		}
	},
	"item_gold_pouch": {
		"Note": "小型金币袋",
		"Description": "所有英雄获得%gold_amount%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_gold_pouch",
		"AbilityTextureName": "item_furion_gold_bag",
		"Rarity": 0,
		"Access": "Reward",
		"AbilityValues": {
			"gold_amount": {
				"value": 80,
				"*break_drop_profit_pct": 1
			}
		},
		"Particle": "particles/generic_gameplay/rune/rune_bounty_first.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_gold_pouch_single": {
		"Note": "小型金币袋(单人)",
		"Description": "获得%gold_amount%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_gold_pouch_single",
		"AbilityTextureName": "item_furion_gold_bag",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_bounty_first.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"gold_amount": {
				"value": 80,
				"*break_drop_profit_pct": 1
			}
		}
	},
	"item_coin_stack": {
		"Note": "金币堆",
		"Description": "获得随机金钱",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_coin_stack",
		"AbilityTextureName": "item_furion_gold_bag",
		"Rarity": 0,
		"Access": "Reward",
		"AutoPickUp": 1,
		"Particle": "particles/generic_gameplay/rune/coin_stack.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"gold_min": {
				"value": 2,
				"*break_drop_profit_pct": 1
			},
			"gold_max": {
				"value": 15,
				"*break_drop_profit_pct": 1
			}
		}
	},
	"item_boon_bless": {
		"Note": "神力法杖",
		"Description": "选择一项神力祝福",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_boon_bless",
		"AbilityTextureName": "item_ultimate_scepter",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_blessings.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_boon_bless_double": {
		"Note": "双重神力法杖",
		"Description": "选择两项神力祝福",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_boon_bless_double",
		"AbilityTextureName": "item_ultimate_scepter_2",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_blessings_double.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_hammer_weapon": {
		"Note": "技能升级",
		"Description": "选择强化技能效果",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_hammer_weapon",
		"AbilityTextureName": "item_aghanims_shard",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_experience.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_hammer_weapon_single": {
		"Note": "技能升级(单人)",
		"Description": "选择强化技能效果",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_hammer_weapon_single",
		"AbilityTextureName": "item_aghanims_shard",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_experience.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_treasure": {
		"Note": "遗物宝箱",
		"Description": "选择一个遗物",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_treasure",
		"AbilityTextureName": "artifact_treasure",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_treasure.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_treasure_secret": {
		"Note": "隐藏宝箱",
		"Description": "选择一个更稀有的遗物",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_treasure_secret",
		"AbilityTextureName": "chest_secret",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/rune/rune_treasure_secret.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_heart_custom": {
		"Note": "复活",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_heart_custom",
		"AbilityTextureName": "pangolier_heartpiercer",
		"Rarity": 0,
		"Access": "Reward",
		"Particle": "particles/generic_gameplay/items/item_heart_respawn.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_bless_upgrade": {
		"Note": "极限法球",
		"Description": "选择一项神力祝福提升稀有度",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_bless_upgrade",
		"AbilityTextureName": "item_ultimate_orb",
		"Rarity": 0,
		"Access": "Shop",
		"Particle": "particles/generic_gameplay/rune/bless_upgrade.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_shop_refresh": {
		"Note": "商店刷新",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_shop_refresh",
		"AbilityTextureName": "item_refresher_shard",
		"Rarity": 0,
		"Access": "Shop",
		"Particle": "particles/generic_gameplay/rune/bless_upgrade.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_boss_chest": {
		"Note": "boss宝箱",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/consumables/item_boss_chest",
		"AbilityTextureName": "item_divine_regalia",
		"Rarity": 0,
		"Access": "Shop",
		"Model": "models/eom/props/booty/chest.vmdl",
		"Particle": "particles/econ/treasures/aghanim_rectangle_2021_treasure/aghanim_rectangle_2021_treasure_ambient_bundle.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO"
	},
	"item_whisky": {
		"Note": "威士忌",
		"Description": "提升%move_speed%移动速度",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_whisky",
		"AbilityTextureName": "item_river_painter4",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"move_speed": {
				"value": "20 40",
				"*tavern_effect_amplify": 1
			}
		}
	},
	"item_beer": {
		"Note": "啤酒",
		"Description": "提升%damage%%攻击伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_beer",
		"AbilityTextureName": "item_river_painter3",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"damage": {
				"value": "10 20",
				"*tavern_effect_amplify": 1
			}
		}
	},
	"item_rum": {
		"Note": "朗姆酒",
		"Description": "提升%health%%生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_rum",
		"AbilityTextureName": "item_river_painter5",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health": {
				"value": "20 40",
				"*tavern_effect_amplify": 1
			}
		}
	},
	"item_tequila": {
		"Note": "龙舌兰",
		"Description": "提升%attack_speed%攻击速度",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_tequila",
		"AbilityTextureName": "item_river_painter6",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"attack_speed": {
				"value": "20 40",
				"*tavern_effect_amplify": 1
			}
		}
	},
	"item_champagne": {
		"Note": "香槟",
		"Description": "提升%damage%%技能伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_champagne",
		"AbilityTextureName": "item_river_painter7",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"damage": {
				"value": "10 20",
				"*tavern_effect_amplify": 1
			}
		}
	},
	"item_gin": {
		"Note": "金酒",
		"Description": "提升%attack_speed%召唤物攻击速度",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_gin",
		"AbilityTextureName": "item_river_painter",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"attack_speed": {
				"value": "20 40",
				"*tavern_effect_amplify": 1
			}
		}
	},
	"item_wine": {
		"Note": "葡萄酒",
		"Description": "提升%cooldown_reduction%%冷却缩减",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/consumables/item_wine",
		"AbilityTextureName": "item_river_painter2",
		"Rarity": 0,
		"Access": "Wine",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"Particle": "particles/generic_gameplay/rune/rune_tavern.vpcf",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"cooldown_reduction": {
				"value": "5 10",
				"*tavern_effect_amplify": 1
			}
		}
	}
};