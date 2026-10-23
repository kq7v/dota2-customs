--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().items = {
	"item_health_potion_1": {
		"Note": "小型治疗药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_health_potion_1",
		"AbilityTextureName": "item_elixer3",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCastRange": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health_regen": 10
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"AbilityName": "item_tombstone",
		"Model": "models/props_gameplay/bottle_rejuvenation.vmdl",
		"PingOverrideText": "DOTA_Chat_Tombstone_Pinged",
		"ItemCost": 2,
		"ItemQuality": "consumable",
		"ItemStackable": 1,
		"ItemShareability": "ITEM_FULLY_SHAREABLE",
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemCastOnPickup": 1
	},
	"item_health_potion_2": {
		"Note": "小型治疗药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_health_potion_2",
		"AbilityTextureName": "item_elixer2",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCastRange": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health_regen": 20
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"AbilityName": "item_tombstone",
		"Model": "models/props_gameplay/bottle_rejuvenation.vmdl",
		"PingOverrideText": "DOTA_Chat_Tombstone_Pinged",
		"ItemCost": 4,
		"ItemQuality": "consumable",
		"ItemStackable": 1,
		"ItemShareability": "ITEM_FULLY_SHAREABLE",
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemCastOnPickup": 1
	},
	"item_health_potion_3": {
		"Note": "小型治疗药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_health_potion_3",
		"AbilityTextureName": "item_elixer1",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCastRange": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"health_regen": 30
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"AbilityName": "item_tombstone",
		"Model": "models/props_gameplay/bottle_rejuvenation.vmdl",
		"PingOverrideText": "DOTA_Chat_Tombstone_Pinged",
		"ItemCost": 6,
		"ItemQuality": "consumable",
		"ItemStackable": 1,
		"ItemShareability": "ITEM_FULLY_SHAREABLE",
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemCastOnPickup": 1
	},
	"item_panning_sword": {
		"Note": "淘金剑",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_panning_sword",
		"AbilityTextureName": "item_radiance_inactive",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"gold": 1,
			"chance": 20
		},
		"ItemCost": 20
	},
	"item_faerie_fire_custom": {
		"Note": "仙灵之火",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_faerie_fire_custom",
		"AbilityTextureName": "item_faerie_fire",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 2,
			"health_regen": 40
		},
		"ItemCost": 5,
		"ItemPermanent": 0
	},
	"item_tome_of_knowledge_custom": {
		"Note": "知识之书",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_tome_of_knowledge_custom",
		"AbilityTextureName": "item_tome_of_knowledge",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"ItemCost": 10,
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemDisplayCharges": 0
	},
	"item_smoke_of_deceit_custom": {
		"Note": "诡计之雾",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_smoke_of_deceit_custom",
		"AbilityTextureName": "item_smoke_of_deceit",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"duration": 15,
			"radius": 900,
			"broke_radius": 450
		},
		"ItemCost": 5,
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemDisplayCharges": 0
	},
	"item_bottle_custom": {
		"Note": "魔瓶",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_bottle_custom",
		"AbilityTextureName": "item_bottle",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 1,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"health_regen_pct": 15,
			"count": 3,
			"restore_time": 2.5
		},
		"ItemCost": 10,
		"ItemStackable": 0,
		"ItemInitialCharges": 3,
		"ItemDisplayCharges": 0
	},
	"item_ring_of_regen_custom": {
		"Note": "回复戒指",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ring_of_regen_custom",
		"AbilityTextureName": "item_ring_of_regen",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 1.25
		},
		"ItemCost": 3
	},
	"item_sobi_mask_custom": {
		"Note": "艺人面罩",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_sobi_mask_custom",
		"AbilityTextureName": "item_sobi_mask",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana_regen": 0.7
		},
		"ItemCost": 3
	},
	"item_fluffy_hat_custom": {
		"Note": "毛毛帽",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_fluffy_hat_custom",
		"AbilityTextureName": "item_fluffy_hat",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 20
		},
		"ItemCost": 3
	},
	"item_wind_lace_custom": {
		"Note": "风灵之纹",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_wind_lace_custom",
		"AbilityTextureName": "item_wind_lace",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_movespeed": 20
		},
		"ItemCost": 4
	},
	"item_cloak_custom": {
		"Note": "抗魔斗篷",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_cloak_custom",
		"AbilityTextureName": "item_cloak",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_magic_resistance": 7
		},
		"ItemCost": 11
	},
	"item_boots_custom": {
		"Note": "速度之靴",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_boots_custom",
		"AbilityTextureName": "item_boots",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_movespeed": 45
		},
		"ItemCost": 10
	},
	"item_lifesteal_custom": {
		"Note": "吸血面具",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_lifesteal_custom",
		"AbilityTextureName": "item_lifesteal",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_lifesteal": 1
		},
		"ItemCost": 18
	},
	"item_ghost_custom": {
		"Note": "幽魂权杖",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_ghost_custom",
		"AbilityTextureName": "item_ghost",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"duration": 2,
			"auto_attribute": 7
		},
		"ItemCost": 30
	},
	"item_blink_custom": {
		"Note": "闪烁匕首",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_blink_custom",
		"AbilityTextureName": "item_blink",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"distance": 450
		},
		"ItemCost": 45
	},
	"item_quelling_blade_custom": {
		"Note": "伐木斧",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_quelling_blade_custom",
		"AbilityTextureName": "item_quelling_blade",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"threshold": 25,
			"attack": 30
		},
		"ItemCost": 3
	},
	"item_ring_of_protection_custom": {
		"Note": "守护指环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ring_of_protection_custom",
		"AbilityTextureName": "item_ring_of_protection",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 1
		},
		"ItemCost": 3
	},
	"item_infused_raindrop_custom": {
		"Note": "凝魂之露",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_infused_raindrop_custom",
		"AbilityTextureName": "item_infused_raindrop",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 3,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"threshold": 10,
			"count": 6,
			"block": 60
		},
		"ItemCost": 4,
		"ItemPermanent": 0,
		"ItemInitialCharges": 6
	},
	"item_orb_of_venom_custom": {
		"Note": "淬毒之珠",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_orb_of_venom_custom",
		"AbilityTextureName": "item_orb_of_venom",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_POISON",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage": 3,
			"duration": 5,
			"movespeed": 30
		},
		"ItemCost": 5
	},
	"item_blight_stone_custom": {
		"Note": "枯萎之石",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_blight_stone_custom",
		"AbilityTextureName": "item_blight_stone",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"armor": 2,
			"duration": 8
		},
		"ItemCost": 5
	},
	"item_blades_of_attack_custom": {
		"Note": "攻击之爪",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_blades_of_attack_custom",
		"AbilityTextureName": "item_blades_of_attack",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 4
		},
		"ItemCost": 9
	},
	"item_gloves_custom": {
		"Note": "加速手套",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_gloves_custom",
		"AbilityTextureName": "item_gloves",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attackspeed": 20
		},
		"ItemCost": 8
	},
	"item_chainmail_custom": {
		"Note": "锁子甲",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_chainmail_custom",
		"AbilityTextureName": "item_chainmail",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 2
		},
		"ItemCost": 11
	},
	"item_quarterstaff_custom": {
		"Note": "短棍",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_quarterstaff_custom",
		"AbilityTextureName": "item_quarterstaff",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 5,
			"auto_attackspeed": 5
		},
		"ItemCost": 18
	},
	"item_helm_of_iron_will_custom": {
		"Note": "铁意头盔",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_helm_of_iron_will_custom",
		"AbilityTextureName": "item_helm_of_iron_will",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 3
		},
		"ItemCost": 19
	},
	"item_broadsword_custom": {
		"Note": "阔剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_broadsword_custom",
		"AbilityTextureName": "item_broadsword",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 7
		},
		"ItemCost": 21
	},
	"item_javelin_custom": {
		"Note": "标枪",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_javelin_custom",
		"AbilityTextureName": "item_javelin",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"chance": 30,
			"damage": 25
		},
		"ItemCost": 22
	},
	"item_claymore_custom": {
		"Note": "大剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_claymore_custom",
		"AbilityTextureName": "item_claymore",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 10
		},
		"ItemCost": 27
	},
	"item_mithril_hammer_custom": {
		"Note": "秘银锤",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_mithril_hammer_custom",
		"AbilityTextureName": "item_mithril_hammer",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 12
		},
		"ItemCost": 32
	},
	"item_ring_of_health_custom": {
		"Note": "治疗指环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ring_of_health_custom",
		"AbilityTextureName": "item_ring_of_health",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 6.5
		},
		"ItemCost": 17
	},
	"item_void_stone_custom": {
		"Note": "虚无宝石",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_void_stone_custom",
		"AbilityTextureName": "item_void_stone",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana_regen": 2.25
		},
		"ItemCost": 17
	},
	"item_point_booster_custom": {
		"Note": "精气之球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_point_booster_custom",
		"AbilityTextureName": "item_point_booster",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 35,
			"auto_mana": 35
		},
		"ItemCost": 24
	},
	"item_vitality_booster_custom": {
		"Note": "活力之球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_vitality_booster_custom",
		"AbilityTextureName": "item_vitality_booster",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 50
		},
		"ItemCost": 20
	},
	"item_energy_booster_custom": {
		"Note": "能量之球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_energy_booster_custom",
		"AbilityTextureName": "item_energy_booster",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana": 50
		},
		"ItemCost": 16
	},
	"item_talisman_of_evasion_custom": {
		"Note": "闪避护符",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_talisman_of_evasion_custom",
		"AbilityTextureName": "item_talisman_of_evasion",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_evade": 15
		},
		"ItemCost": 29
	},
	"item_platemail_custom": {
		"Note": "板甲",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_platemail_custom",
		"AbilityTextureName": "item_platemail",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 10
		},
		"ItemCost": 28
	},
	"item_hyperstone_custom": {
		"Note": "振奋宝石",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_hyperstone_custom",
		"AbilityTextureName": "item_hyperstone",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attackspeed": 60
		},
		"ItemCost": 40
	},
	"item_demon_edge_custom": {
		"Note": "恶魔刀锋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_demon_edge_custom",
		"AbilityTextureName": "item_demon_edge",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 20
		},
		"ItemCost": 44
	},
	"item_eagle_custom": {
		"Note": "鹰歌弓",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_eagle_custom",
		"AbilityTextureName": "item_eagle",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_agility": 25
		},
		"ItemCost": 56
	},
	"item_reaver_custom": {
		"Note": "掠夺者之斧",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_reaver_custom",
		"AbilityTextureName": "item_reaver",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_strength": 25
		},
		"ItemCost": 56
	},
	"item_mystic_staff_custom": {
		"Note": "神秘法杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_mystic_staff_custom",
		"AbilityTextureName": "item_mystic_staff",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_intellect": 25
		},
		"ItemCost": 56
	},
	"item_relic_custom": {
		"Note": "圣者遗物",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_relic_custom",
		"AbilityTextureName": "item_relic",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_SECRET",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 30
		},
		"ItemCost": 76
	},
	"item_soul_ring_custom": {
		"Note": "灵魂之戒",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_soul_ring_custom",
		"AbilityTextureName": "item_soul_ring",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 16,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"health_cost": 50,
			"mana": 75,
			"auto_armor": 2,
			"duration": 8,
			"auto_strength": 6
		},
		"ItemCost": 14
	},
	"item_orb_of_corrosion_custom": {
		"Note": "腐蚀之球",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_orb_of_corrosion_custom",
		"AbilityTextureName": "item_orb_of_corrosion",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage": 3,
			"armor": 3,
			"movespeed": 50,
			"duration": 8
		},
		"ItemCost": 18
	},
	"item_falcon_blade_custom": {
		"Note": "猎鹰战刃",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_falcon_blade_custom",
		"AbilityTextureName": "item_falcon_blade",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 35,
			"auto_mana_regen": 1.8,
			"auto_attack": 5
		},
		"ItemCost": 22
	},
	"item_power_treads_custom": {
		"Note": "动力鞋",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_power_treads_custom",
		"AbilityTextureName": "item_power_treads",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_movespeed": 45,
			"auto_attackspeed": 25,
			"attribute": 10
		},
		"ItemCost": 28,
		"ItemHideCharges": 1
	},
	"item_phase_boots_custom": {
		"Note": "相位鞋",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_phase_boots_custom",
		"AbilityTextureName": "item_phase_boots",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_movespeed": 45,
			"auto_attack": 6,
			"auto_armor": 4,
			"movespeed": 120,
			"duration": 1.5
		},
		"ItemCost": 28
	},
	"item_oblivion_staff_custom": {
		"Note": "空明杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_oblivion_staff_custom",
		"AbilityTextureName": "item_oblivion_staff",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 7,
			"auto_attackspeed": 10,
			"auto_intellect": 10,
			"auto_mana_regen": 1.25
		},
		"ItemCost": 30
	},
	"item_pers_custom": {
		"Note": "坚韧球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_pers_custom",
		"AbilityTextureName": "item_pers",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 6.5,
			"auto_mana_regen": 2.25
		},
		"ItemCost": 33
	},
	"item_mask_of_madness_custom": {
		"Note": "疯狂面具",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_mask_of_madness_custom",
		"AbilityTextureName": "item_mask_of_madness",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 16,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_attack": 5,
			"auto_attackspeed": 10,
			"auto_lifesteal": 1,
			"attackspeed": 110,
			"movespeed": 30,
			"damage": 32,
			"duration": 6
		},
		"ItemCost": 36
	},
	"item_hand_of_midas_custom": {
		"Note": "迈达斯之手",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_hand_of_midas_custom",
		"AbilityTextureName": "item_hand_of_midas",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 60,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attackspeed": 40,
			"bonus_gold": 16,
			"xp_multiplier": 2.8
		},
		"ItemCost": 44
	},
	"item_helm_of_the_dominator_custom": {
		"Note": "支配头盔",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_helm_of_the_dominator_custom",
		"AbilityTextureName": "item_helm_of_the_dominator",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 6,
			"auto_health_regen": 6,
			"count": 1,
			"duration": 12,
			"auto_attribute": 6
		},
		"ItemCost": 47
	},
	"item_travel_boots_custom": {
		"Note": "远行鞋",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_travel_boots_custom",
		"AbilityTextureName": "item_travel_boots",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_movespeed": 100,
			"max_radius": 250
		},
		"ItemCost": 50
	},
	"item_moon_shard_custom": {
		"Note": "银月之晶",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_moon_shard_custom",
		"AbilityTextureName": "item_moon_shard",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_attackspeed": 140,
			"attackspeed_consume": 60,
			"consumed_vision": 450,
			"vision": 600
		},
		"ItemCost": 80,
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemHideCharges": 1
	},
	"item_veil_of_discord_custom": {
		"Note": "纷争面纱",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_veil_of_discord_custom",
		"AbilityTextureName": "item_veil_of_discord",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 22,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_health": 16,
			"auto_mana": 10,
			"aura_mana_regen": 1.75,
			"aura_radius": 1200,
			"auto_attribute": 4,
			"damage_pct": 18,
			"duration": 16,
			"radius": 600
		},
		"ItemCost": 31
	},
	"item_glimmer_cape_custom": {
		"Note": "微光披风",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_glimmer_cape_custom",
		"AbilityTextureName": "item_glimmer_cape",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 14,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_magic_resistance": 15,
			"delay": 0.6,
			"duration": 3,
			"magic_resistance": 45
		},
		"ItemCost": 39
	},
	"item_force_staff_custom": {
		"Note": "原力法杖",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_force_staff_custom",
		"AbilityTextureName": "item_force_staff",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_health": 30,
			"auto_intellect": 10,
			"distance": 450,
			"duration": 0.2
		},
		"ItemCost": 44
	},
	"item_aether_lens_custom": {
		"Note": "以太透镜",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_aether_lens_custom",
		"AbilityTextureName": "item_aether_lens",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana": 60,
			"auto_mana_regen": 3,
			"auto_cast_range": 225,
			"auto_projectile_range": 225
		},
		"ItemCost": 46
	},
	"item_witch_blade_custom": {
		"Note": "巫师之刃",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_witch_blade_custom",
		"AbilityTextureName": "item_witch_blade",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attackspeed": 35,
			"auto_intellect": 12,
			"auto_armor": 6,
			"auto_projectile_speed": 300,
			"damage": 24,
			"movespeed": 50,
			"duration": 3
		},
		"ItemCost": 52
	},
	"item_cyclone_custom": {
		"Note": "EUL的神圣法杖",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_cyclone_custom",
		"AbilityTextureName": "item_cyclone",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_intellect": 10,
			"auto_mana_regen": 3.5,
			"auto_movespeed": 25,
			"cyclone_duration": 1.5
		},
		"ItemCost": 55
	},
	"item_rod_of_atos_custom": {
		"Note": "阿托斯之棍",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_rod_of_atos_custom",
		"AbilityTextureName": "item_rod_of_atos",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 10,
			"auto_intellect": 10,
			"damage": 60,
			"duration": 2
		},
		"ItemCost": 55
	},
	"item_dagon_custom": {
		"Note": "达贡之神力",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_dagon_custom",
		"AbilityTextureName": "item_dagon",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"damage": "10 20 30 40 50",
			"combo_duration": 3,
			"distance": 900,
			"upgrade_count": 3,
			"bonus_attribute": "6 8 10 12 14",
			"bonus_intellect": 8
		},
		"ItemCost": 54
	},
	"item_orchid_custom": {
		"Note": "紫苑",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_orchid_custom",
		"AbilityTextureName": "item_orchid",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attackspeed": 25,
			"auto_mana_regen": 4,
			"auto_intellect": 20,
			"auto_attack": 30,
			"silence_duration": 5,
			"silence_damage_percent": 30
		},
		"ItemCost": 70
	},
	"item_solar_crest_custom": {
		"Note": "炎阳纹章",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_solar_crest_custom",
		"AbilityTextureName": "item_solar_crest",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_movespeed": 20,
			"auto_armor": 6,
			"auto_mana_regen": 1.75,
			"auto_attribute": 5,
			"radius": 175,
			"damage": 30,
			"duration": 6,
			"armor_reduce": 6
		},
		"ItemCost": 53
	},
	"item_ultimate_scepter_custom": {
		"Note": "阿哈利姆神杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ultimate_scepter_custom",
		"AbilityTextureName": "item_ultimate_scepter",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 35,
			"auto_mana": 35,
			"auto_attribute": 10
		},
		"ItemCost": 84
	},
	"item_refresher_custom": {
		"Note": "刷新球",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_refresher_custom",
		"AbilityTextureName": "item_refresher",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 16,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_health_regen": 13,
			"auto_mana_regen": 12
		},
		"ItemCost": 100
	},
	"item_octarine_core_custom": {
		"Note": "玲珑心",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_octarine_core_custom",
		"AbilityTextureName": "item_octarine_core",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 85,
			"auto_mana": 145,
			"auto_mana_regen": 3,
			"auto_cast_range": 225,
			"auto_cooldown_reduce": 25
		},
		"ItemCost": 106
	},
	"item_sheepstick_custom": {
		"Note": "邪恶镰刀",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_sheepstick_custom",
		"AbilityTextureName": "item_sheepstick",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_mana_regen": 9,
			"auto_attribute": 10,
			"auto_intellect": 25
		},
		"ItemCost": 114
	},
	"item_gungir_custom": {
		"Note": "缚灵索",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_gungir_custom",
		"AbilityTextureName": "item_gungir",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 30,
			"auto_attribute": 12,
			"auto_intellect": 8
		},
		"ItemCost": 123
	},
	"item_wind_waker_custom": {
		"Note": "风之杖",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_wind_waker_custom",
		"AbilityTextureName": "item_wind_waker",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_movespeed": 50,
			"auto_mana_regen": 6,
			"auto_intellect": 35,
			"cyclone_duration": 2.5,
			"tornado_speed": 360
		},
		"ItemCost": 143
	},
	"item_hood_of_defiance_custom": {
		"Note": "挑战头巾",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_hood_of_defiance_custom",
		"AbilityTextureName": "item_hood_of_defiance",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 8.5,
			"auto_magic_resistance": 20
		},
		"ItemCost": 30
	},
	"item_vanguard_custom": {
		"Note": "先锋盾",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_vanguard_custom",
		"AbilityTextureName": "item_vanguard",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 7,
			"auto_health": 50
		},
		"ItemCost": 37
	},
	"item_blade_mail_custom": {
		"Note": "刃甲",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_blade_mail_custom",
		"AbilityTextureName": "item_blade_mail",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 6,
			"auto_attack": 28
		},
		"ItemCost": 43
	},
	"item_aeon_disk_custom": {
		"Note": "永恒之盘",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_aeon_disk_custom",
		"AbilityTextureName": "item_aeon_disk",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 60,
			"auto_mana": 60,
			"surround_speed_pct": 80
		},
		"ItemCost": 60
	},
	"item_soul_booster_custom": {
		"Note": "镇魂石",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_soul_booster_custom",
		"AbilityTextureName": "item_soul_booster",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 85,
			"auto_mana": 85
		},
		"ItemCost": 60
	},
	"item_eternal_shroud_custom": {
		"Note": "永世法衣",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_eternal_shroud_custom",
		"AbilityTextureName": "item_eternal_shroud",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_health_regen": 8.5,
			"auto_magic_resistance": 20,
			"duration": 3,
			"radius": 450
		},
		"ItemCost": 66
	},
	"item_crimson_guard_custom": {
		"Note": "赤红甲",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_crimson_guard_custom",
		"AbilityTextureName": "item_crimson_guard",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 12,
			"auto_armor": 6,
			"auto_health": 50
		},
		"ItemCost": 74
	},
	"item_lotus_orb_custom": {
		"Note": "清莲宝珠",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_lotus_orb_custom",
		"AbilityTextureName": "item_lotus_orb",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 10,
			"auto_health_regen": 6.5,
			"auto_mana_regen": 4,
			"auto_mana": 50
		},
		"ItemCost": 77
	},
	"item_black_king_bar_custom": {
		"Note": "黑皇杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_black_king_bar_custom",
		"AbilityTextureName": "item_black_king_bar",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 24,
			"auto_strength": 10
		},
		"ItemCost": 81
	},
	"item_hurricane_pike_custom": {
		"Note": "飓风长戟",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_hurricane_pike_custom",
		"AbilityTextureName": "item_hurricane_pike",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityValues": {
			"auto_health": 40,
			"auto_attribute": 15,
			"auto_agility": 5,
			"auto_projectile_range": 600,
			"distance": 450,
			"duration": 0.2
		},
		"ItemCost": 91
	},
	"item_manta_custom": {
		"Note": "幻影斧",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_manta_custom",
		"AbilityTextureName": "item_manta",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_movespeed": 32,
			"auto_attackspeed": 12,
			"auto_attribute": 10,
			"auto_agility": 16
		},
		"ItemCost": 92
	},
	"item_sphere_custom": {
		"Note": "林肯法球",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_sphere_custom",
		"AbilityTextureName": "item_sphere",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_SURROUND",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 7,
			"auto_mana_regen": 5,
			"auto_attribute": 14,
			"surround_count": 3,
			"bonus_surround_count": 1,
			"block_cooldown": 3,
			"block_count": 3
		},
		"ItemCost": 92
	},
	"item_shivas_guard_custom": {
		"Note": "希瓦的守护",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_shivas_guard_custom",
		"AbilityTextureName": "item_shivas_guard",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 20,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_armor": 15,
			"auto_intellect": 30,
			"blast_damage": 60,
			"blast_movement_speed": 80,
			"blast_debuff_duration": 4,
			"aura_attack_speed": 45,
			"blast_radius": 900,
			"aura_radius": 1200,
			"blast_speed": 350
		},
		"ItemCost": 97
	},
	"item_heart_custom": {
		"Note": "恐鳌之心",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_heart_custom",
		"AbilityTextureName": "item_heart",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 40,
			"auto_health": 50,
			"auto_strength": 45
		},
		"ItemCost": 102
	},
	"item_assault_custom": {
		"Note": "强袭胸甲",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_assault_custom",
		"AbilityTextureName": "item_assault",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_armor": 10,
			"auto_attackspeed": 30,
			"aura_radius": 1200,
			"aura_attack_speed": 30,
			"aura_positive_armor": 5,
			"aura_negative_armor": 5
		},
		"ItemCost": 103
	},
	"item_bloodstone_custom": {
		"Note": "血精石",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_bloodstone_custom",
		"AbilityTextureName": "item_bloodstone",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 85,
			"auto_mana": 85
		},
		"ItemCost": 115
	},
	"item_lesser_crit_custom": {
		"Note": "水晶剑",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_lesser_crit_custom",
		"AbilityTextureName": "item_lesser_crit",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 32,
			"crit_chance": 30,
			"crit_multiplier": 160
		},
		"ItemCost": 39
	},
	"item_meteor_hammer_custom": {
		"Note": "陨星锤",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_meteor_hammer_custom",
		"AbilityTextureName": "item_meteor_hammer",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_health_regen": 6.5,
			"auto_mana_regen": 2.5,
			"auto_attribute": 8
		},
		"ItemCost": 47
	},
	"item_armlet_custom": {
		"Note": "莫尔迪基安的臂章",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_armlet_custom",
		"AbilityTextureName": "item_armlet",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_TOGGLE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityValues": {
			"auto_attackspeed": 25,
			"auto_armor": 6,
			"auto_health_regen": 5,
			"auto_attack": 15,
			"unholy_bonus_damage": 24,
			"unholy_bonus_health": 60,
			"unholy_bonus_armor": 6,
			"unholy_health_drain_per_second": 20
		},
		"ItemCost": 49,
		"ItemHideCharges": 1
	},
	"item_basher_custom": {
		"Note": "碎颅锤",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_basher_custom",
		"AbilityTextureName": "item_basher",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 25,
			"auto_strength": 10
		},
		"ItemCost": 59
	},
	"item_invis_sword_custom": {
		"Note": "影刃",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_invis_sword_custom",
		"AbilityTextureName": "item_invis_sword",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 7,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 25,
			"auto_attackspeed": 35,
			"windwalk_fade_time": 0.3,
			"windwalk_duration": 2,
			"windwalk_movement_speed": 100,
			"windwalk_bonus_damage": 30
		},
		"ItemCost": 60
	},
	"item_desolator_custom": {
		"Note": "黯灭",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_desolator_custom",
		"AbilityTextureName": "item_desolator",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 55,
			"armor": 6,
			"duration": 7
		},
		"ItemCost": 70
	},
	"item_bfury_custom": {
		"Note": "狂战斧",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_bfury_custom",
		"AbilityTextureName": "item_bfury",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 55,
			"auto_health_regen": 7.5,
			"auto_mana_regen": 2.75
		},
		"ItemCost": 83
	},
	"item_ethereal_blade_custom": {
		"Note": "虚灵之刃",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_ethereal_blade_custom",
		"AbilityTextureName": "item_ethereal_blade",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_POISON",
		"AbilityCooldown": 8,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attackspeed": 60,
			"auto_attack": 20,
			"poison_interval_pct": 30,
			"ethereal_poison_stack": 18,
			"auto_attribute": 10,
			"auto_agility": 30
		},
		"ItemCost": 86
	},
	"item_nullifier_custom": {
		"Note": "否决坠饰",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_nullifier_custom",
		"AbilityTextureName": "item_nullifier",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_SURROUND",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 80,
			"auto_armor": 8,
			"auto_health_regen": 6,
			"damage": 40,
			"slow_pct": 80,
			"slow_interval_duration": 0.5
		},
		"ItemCost": 95
	},
	"item_monkey_king_bar_custom": {
		"Note": "金箍棒",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_monkey_king_bar_custom",
		"AbilityTextureName": "item_monkey_king_bar",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 40,
			"auto_attackspeed": 35,
			"chance": 60,
			"damage": 25
		},
		"ItemCost": 100
	},
	"item_butterfly_custom": {
		"Note": "蝴蝶",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_butterfly_custom",
		"AbilityTextureName": "item_butterfly",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attackspeed": 30,
			"auto_attack": 25,
			"auto_agility": 30,
			"auto_evade": 35
		},
		"ItemCost": 100
	},
	"item_radiance_custom": {
		"Note": "辉耀",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_radiance_custom",
		"AbilityTextureName": "item_radiance",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 30,
			"aura_damage": 18,
			"aura_radius": 1200
		},
		"ItemCost": 103
	},
	"item_greater_crit_custom": {
		"Note": "代达罗斯之殇",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_greater_crit_custom",
		"AbilityTextureName": "item_greater_crit",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 88,
			"crit_chance": 30,
			"crit_multiplier": 225
		},
		"ItemCost": 103
	},
	"item_silver_edge_custom": {
		"Note": "白银之锋",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_silver_edge_custom",
		"AbilityTextureName": "item_silver_edge",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 40,
			"auto_attackspeed": 45,
			"auto_mana_regen": 4,
			"auto_intellect": 15,
			"windwalk_fade_time": 0.3,
			"windwalk_duration": 2,
			"windwalk_movement_speed": 100,
			"windwalk_bonus_damage": 30,
			"backstab_duration": 4
		},
		"ItemCost": 112
	},
	"item_rapier_custom": {
		"Note": "圣剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_rapier_custom",
		"AbilityTextureName": "item_rapier",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 350
		},
		"ItemCost": 120
	},
	"item_bloodthorn_custom": {
		"Note": "血棘",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_bloodthorn_custom",
		"AbilityTextureName": "item_bloodthorn",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 9,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 30,
			"auto_attackspeed": 90,
			"auto_mana_regen": 5.5,
			"auto_intellect": 25,
			"silence_duration": 5,
			"silence_damage_percent": 30,
			"tooltip_crit_chance": 100,
			"target_crit_multiplier": 130
		},
		"ItemCost": 125
	},
	"item_abyssal_blade_custom": {
		"Note": "深渊之刃",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_abyssal_blade_custom",
		"AbilityTextureName": "item_abyssal_blade",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 25,
			"auto_health": 50,
			"auto_health_regen": 10
		},
		"ItemCost": 127
	},
	"item_dragon_lance_custom": {
		"Note": "魔龙枪",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_dragon_lance_custom",
		"AbilityTextureName": "item_dragon_lance",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_strength": 12,
			"auto_agility": 16,
			"auto_projectile_range": 400
		},
		"ItemCost": 38
	},
	"item_sange_custom": {
		"Note": "散华",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_sange_custom",
		"AbilityTextureName": "item_sange",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_strength": 16,
			"radius": 200,
			"str_pct": 30,
			"movespeed": 60,
			"slow_duration": 1.5
		},
		"ItemCost": 41
	},
	"item_yasha_custom": {
		"Note": "夜叉",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_yasha_custom",
		"AbilityTextureName": "item_yasha",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_agility": 16,
			"movespeed": 160,
			"attackspeed": 120,
			"duration": 0.5
		},
		"ItemCost": 41
	},
	"item_kaya_custom": {
		"Note": "慧光",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_kaya_custom",
		"AbilityTextureName": "item_kaya",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_MAGIC_PROJECTILE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_intellect": 16,
			"damage_pct": 80
		},
		"ItemCost": 41
	},
	"item_echo_sabre_custom": {
		"Note": "回音战刃",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_echo_sabre_custom",
		"AbilityTextureName": "item_echo_sabre",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 15,
			"auto_attackspeed": 10,
			"auto_mana_regen": 2.25,
			"auto_strength": 15,
			"auto_intellect": 10
		},
		"ItemCost": 50
	},
	"item_maelstrom_custom": {
		"Note": "漩涡",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_maelstrom_custom",
		"AbilityTextureName": "item_maelstrom",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_ENERGY_STRIKE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attack": 24,
			"chain_chance": 30,
			"chain_radius": 650,
			"chain_strikes": 4,
			"chain_damage": 24,
			"jump_delay": 0.25
		},
		"ItemCost": 54
	},
	"item_diffusal_blade_custom": {
		"Note": "净魂之刃",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_diffusal_blade_custom",
		"AbilityTextureName": "item_diffusal_blade",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_agility": 24,
			"auto_intellect": 12
		},
		"ItemCost": 63
	},
	"item_mage_slayer_custom": {
		"Note": "法师克星",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_mage_slayer_custom",
		"AbilityTextureName": "item_mage_slayer",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 20,
			"auto_magic_resistance": 20,
			"auto_agility": 20
		},
		"ItemCost": 65
	},
	"item_heavens_halberd_custom": {
		"Note": "天堂之戟",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_heavens_halberd_custom",
		"AbilityTextureName": "item_heavens_halberd",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_strength": 20,
			"auto_evade": 20
		},
		"ItemCost": 71
	},
	"item_sange_and_yasha_custom": {
		"Note": "散夜对剑",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_sange_and_yasha_custom",
		"AbilityTextureName": "item_sange_and_yasha",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_strength": 16,
			"auto_agility": 16,
			"radius": 200,
			"str_pct": 30,
			"movespeed": 160,
			"slow_duration": 1.5,
			"attackspeed": 120,
			"duration": 0.5
		},
		"ItemCost": 82
	},
	"item_kaya_and_sange_custom": {
		"Note": "散慧对剑",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_kaya_and_sange_custom",
		"AbilityTextureName": "item_kaya_and_sange",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_strength": 16,
			"auto_intellect": 16,
			"radius": 200,
			"str_pct": 30,
			"movespeed": 60,
			"slow_duration": 1.5,
			"damage_pct": 80
		},
		"ItemCost": 82
	},
	"item_yasha_and_kaya_custom": {
		"Note": "慧夜对剑",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_yasha_and_kaya_custom",
		"AbilityTextureName": "item_yasha_and_kaya",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_intellect": 16,
			"auto_agility": 16,
			"auto_attackspeed": 12,
			"auto_movespeed": 40,
			"movespeed": 160,
			"attackspeed": 120,
			"duration": 0.5,
			"damage_pct": 80
		},
		"ItemCost": 82
	},
	"item_satanic_custom": {
		"Note": "撒旦之邪力",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_satanic_custom",
		"AbilityTextureName": "item_satanic",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 18,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityValues": {
			"auto_attack": 55,
			"auto_strength": 25,
			"auto_health": 60,
			"health_cost": 10,
			"mana_cost": 10,
			"damage": 65,
			"min_damage": 20,
			"duration": 6,
			"attackspeed": 15,
			"movespeed": 20,
			"max_stack": 10
		},
		"ItemCost": 101
	},
	"item_skadi_custom": {
		"Note": "斯嘉蒂之眼",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_skadi_custom",
		"AbilityTextureName": "item_skadi",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health": 40,
			"auto_mana": 40,
			"auto_attribute": 25
		},
		"ItemCost": 106
	},
	"item_mjollnir_custom": {
		"Note": "雷神之锤",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_mjollnir_custom",
		"AbilityTextureName": "item_mjollnir",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_SURROUND,CUSTOM_TYPE_ENERGY_STRIKE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_attackspeed": 65,
			"auto_attack": 24,
			"chain_chance": 30,
			"chain_radius": 650,
			"chain_strikes": 4,
			"chain_damage": 24,
			"jump_delay": 0.25,
			"surround_count": 3,
			"surround_damage": 15
		},
		"ItemCost": 112
	},
	"item_overwhelming_blink_custom": {
		"Note": "盛势闪光",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_overwhelming_blink_custom",
		"AbilityTextureName": "item_overwhelming_blink",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_strength": 25
		},
		"ItemCost": 136
	},
	"item_swift_blink_custom": {
		"Note": "迅疾闪光",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_swift_blink_custom",
		"AbilityTextureName": "item_swift_blink",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_agility": 25
		},
		"ItemCost": 136
	},
	"item_arcane_blink_custom": {
		"Note": "秘奥闪光",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_arcane_blink_custom",
		"AbilityTextureName": "item_arcane_blink",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_intellect": 25
		},
		"ItemCost": 136
	},
	"item_medallion_of_courage_custom": {
		"Note": "勇气勋章",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_medallion_of_courage_custom",
		"AbilityTextureName": "item_medallion_of_courage",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 5,
			"auto_mana_regen": 1.5,
			"armor": 12,
			"movespeed": 120,
			"duration": 12,
			"bonus_duration": 1
		},
		"ItemCost": 22
	},
	"item_ancient_janggo_custom": {
		"Note": "韧鼓",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_ancient_janggo_custom",
		"AbilityTextureName": "item_ancient_janggo",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 15,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_strength": 6,
			"auto_intellect": 6,
			"max_stack": 10,
			"attackspeed": 15,
			"movespeed": 15,
			"duration": 10,
			"radius": 1200
		},
		"ItemCost": 34
	},
	"item_vladmir_custom": {
		"Note": "弗拉迪米尔的祭品",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_vladmir_custom",
		"AbilityTextureName": "item_vladmir",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ItemCost": 54
	},
	"item_pipe_custom": {
		"Note": "洞察烟斗",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_pipe_custom",
		"AbilityTextureName": "item_pipe",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 12,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_health_regen": 8.5,
			"auto_magic_resistance": 30,
			"aura_radius": 1200,
			"magic_resistance_aura": 10,
			"barrier_block": 40,
			"barrier_duration": 12,
			"barrier_radius": 1200
		},
		"ItemCost": 70
	},
	"item_mekansm_custom": {
		"Note": "梅肯斯姆",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_mekansm_custom",
		"AbilityTextureName": "item_mekansm",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 4
		},
		"ItemCost": 38
	},
	"item_arcane_boots_custom": {
		"Note": "秘法鞋",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_arcane_boots_custom",
		"AbilityTextureName": "item_arcane_boots",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_movespeed": 45,
			"auto_mana": 50,
			"mana_regen": 50,
			"radius": 900
		},
		"ItemCost": 26
	},
	"item_guardian_greaves_custom": {
		"Note": "卫士胫甲",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_guardian_greaves_custom",
		"AbilityTextureName": "item_guardian_greaves",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_movespeed": 50,
			"auto_mana": 50,
			"auto_armor": 4
		},
		"ItemCost": 104
	},
	"item_headdress_custom": {
		"Note": "恢复头巾",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_headdress_custom",
		"AbilityTextureName": "item_headdress",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 0.5
		},
		"ItemCost": 7
	},
	"item_urn_of_shadows_custom": {
		"Note": "影之灵龛",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_urn_of_shadows_custom",
		"AbilityTextureName": "item_urn_of_shadows",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_armor": 2,
			"auto_mana_regen": 1.4,
			"auto_attribute": 2,
			"health": 1,
			"movespeed": 2,
			"damage": 10,
			"max_stack": 100
		},
		"ItemCost": 17
	},
	"item_spirit_vessel_custom": {
		"Note": "魂之灵瓮",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_spirit_vessel_custom",
		"AbilityTextureName": "item_spirit_vessel",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_armor": 2,
			"auto_mana_regen": 1.75,
			"auto_health": 50,
			"auto_attribute": 2,
			"health": 1,
			"movespeed": 2,
			"damage": 20,
			"max_stack": 100
		},
		"ItemCost": 57
	},
	"item_necronomicon_custom": {
		"Note": "死灵书1",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_necronomicon_custom",
		"AbilityTextureName": "item_necronomicon",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana_regen": 2,
			"summon_duration": 10,
			"warrior_health_tooltip": 200,
			"warrior_damage_tooltip": 15,
			"warrior_mana_break_tooltip": 5,
			"explosion": 150,
			"archer_health_tooltip": 125,
			"archer_damage_tooltip": 8
		},
		"ItemCost": 44
	},
	"item_necronomicon_2_custom": {
		"Note": "死灵书2",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_necronomicon_2_custom",
		"AbilityTextureName": "item_necronomicon_2",
		"Rarity": 4,
		"Effect": "particles/items_fx/general_item_drop_lvl_3.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana_regen": 3,
			"summon_duration": 10,
			"warrior_health_tooltip": 250,
			"warrior_damage_tooltip": 20,
			"warrior_mana_break_tooltip": 10,
			"explosion": 250,
			"archer_health_tooltip": 175,
			"archer_damage_tooltip": 14
		},
		"ItemCost": 68
	},
	"item_necronomicon_3_custom": {
		"Note": "死灵书3",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_necronomicon_3_custom",
		"AbilityTextureName": "item_necronomicon_3",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_mana_regen": 4,
			"summon_duration": 10,
			"warrior_health_tooltip": 300,
			"warrior_damage_tooltip": 25,
			"warrior_mana_break_tooltip": 15,
			"explosion": 350,
			"archer_health_tooltip": 225,
			"archer_damage_tooltip": 20
		},
		"ItemCost": 92
	},
	"item_branches_custom": {
		"Note": "树枝",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_branches_custom",
		"AbilityTextureName": "item_branches",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 1
		},
		"ItemCost": 1
	},
	"item_gauntlets_custom": {
		"Note": "力量手套",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_gauntlets_custom",
		"AbilityTextureName": "item_gauntlets",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_strength": 3
		},
		"ItemCost": 3
	},
	"item_slippers_custom": {
		"Note": "敏捷便鞋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_slippers_custom",
		"AbilityTextureName": "item_slippers",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_agility": 3
		},
		"ItemCost": 3
	},
	"item_mantle_custom": {
		"Note": "智力斗篷",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_mantle_custom",
		"AbilityTextureName": "item_mantle",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_intellect": 3
		},
		"ItemCost": 3
	},
	"item_circlet_custom": {
		"Note": "圆环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_circlet_custom",
		"AbilityTextureName": "item_circlet",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 2
		},
		"ItemCost": 4
	},
	"item_belt_of_strength_custom": {
		"Note": "力量腰带",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_belt_of_strength_custom",
		"AbilityTextureName": "item_belt_of_strength",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_strength": 6
		},
		"ItemCost": 9
	},
	"item_boots_of_elves_custom": {
		"Note": "精灵布袋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_boots_of_elves_custom",
		"AbilityTextureName": "item_boots_of_elves",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_agility": 6
		},
		"ItemCost": 9
	},
	"item_robe_custom": {
		"Note": "法师长袍",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_robe_custom",
		"AbilityTextureName": "item_robe",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_intellect": 6
		},
		"ItemCost": 9
	},
	"item_crown_custom": {
		"Note": "王冠",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_crown_custom",
		"AbilityTextureName": "item_crown",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 4
		},
		"ItemCost": 8
	},
	"item_ogre_axe_custom": {
		"Note": "食人魔之斧",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ogre_axe_custom",
		"AbilityTextureName": "item_ogre_axe",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_strength": 10
		},
		"ItemCost": 20
	},
	"item_blade_of_alacrity_custom": {
		"Note": "欢欣之刃",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_blade_of_alacrity_custom",
		"AbilityTextureName": "item_blade_of_alacrity",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_agility": 10
		},
		"ItemCost": 20
	},
	"item_staff_of_wizardry_custom": {
		"Note": "魔力法杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_staff_of_wizardry_custom",
		"AbilityTextureName": "item_staff_of_wizardry",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_intellect": 10
		},
		"ItemCost": 20
	},
	"item_null_talisman_custom": {
		"Note": "空灵挂件",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_null_talisman_custom",
		"AbilityTextureName": "item_null_talisman",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 2,
			"auto_intellect": 3,
			"auto_mana_regen": 0.6
		},
		"ItemCost": 11
	},
	"item_wraith_band_custom": {
		"Note": "怨灵细带",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_wraith_band_custom",
		"AbilityTextureName": "item_wraith_band",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 2,
			"auto_agility": 3,
			"auto_attackspeed": 5,
			"auto_armor": 1.5
		},
		"ItemCost": 11
	},
	"item_bracer_custom": {
		"Note": "护腕",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_bracer_custom",
		"AbilityTextureName": "item_bracer",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 2,
			"auto_strength": 3,
			"auto_attack": 3,
			"auto_health_regen": 1
		},
		"ItemCost": 11
	},
	"item_ultimate_orb_custom": {
		"Note": "极限法球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ultimate_orb_custom",
		"AbilityTextureName": "item_ultimate_orb",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 10
		},
		"ItemCost": 41
	},
	"item_helm_of_the_overlord_custom": {
		"Note": "统御头盔",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_helm_of_the_overlord_custom",
		"AbilityTextureName": "item_helm_of_the_overlord",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 20,
			"auto_health_regen": 8,
			"auto_armor": 8
		},
		"ItemCost": 120
	},
	"item_buckler_custom": {
		"Note": "玄冥盾牌",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_buckler_custom",
		"AbilityTextureName": "item_buckler_active",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_armor": 1,
			"aura_armor": 2,
			"aura_radius": 1200
		},
		"ItemCost": 10
	},
	"item_ring_of_basilius_custom": {
		"Note": "王者之戒",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_ring_of_basilius_custom",
		"AbilityTextureName": "item_ring_of_basilius_active",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"aura_mana_regen": 0.5,
			"aura_radius": 1200
		},
		"ItemCost": 10
	},
	"item_tranquil_boots_custom": {
		"Note": "静谧之鞋",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_tranquil_boots_custom",
		"AbilityTextureName": "item_tranquil_boots",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"movespeed": 65,
			"health_regen": 14,
			"broken_movement_speed": 30
		},
		"ItemCost": 18
	},
	"item_holy_locket_custom": {
		"Note": "圣洁吊坠",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_holy_locket_custom",
		"AbilityTextureName": "item_holy_locket",
		"Rarity": 3,
		"Effect": "particles/items_fx/general_item_drop_lvl_2.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attribute": 3,
			"auto_health": 50,
			"auto_mana": 50,
			"health_regen": 3,
			"mana_regen": 3,
			"max_charge": 20,
			"heal_increase": 35
		},
		"ItemCost": 48
	},
	"item_magic_stick_custom": {
		"Note": "魔棒",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_magic_stick_custom",
		"AbilityTextureName": "item_magic_stick",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityValues": {
			"health_regen": 3,
			"mana_regen": 3,
			"max_charge": 10
		},
		"ItemCost": 4
	},
	"item_magic_wand_custom": {
		"Note": "魔杖",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_magic_wand_custom",
		"AbilityTextureName": "item_magic_wand",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
		"AbilityValues": {
			"health_regen": 3,
			"mana_regen": 3,
			"max_charge": 17,
			"auto_attribute": 3
		},
		"ItemCost": 10
	},
	"item_ring_of_tarrasque_custom": {
		"Note": "恐鳌之戒",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_ring_of_tarrasque_custom",
		"AbilityTextureName": "item_ring_of_tarrasque",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_health_regen": 3.5,
			"auto_health": 30
		},
		"ItemCost": 14
	},
	"item_stout_shield_custom": {
		"Note": "小圆盾",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_stout_shield_custom",
		"AbilityTextureName": "item_stout_shield",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"block_chance": 50,
			"damage_block_melee": 5,
			"damage_block_ranged": 2
		},
		"ItemCost": 4
	},
	"item_poor_mans_shield_custom": {
		"Note": "穷鬼盾",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_poor_mans_shield_custom",
		"AbilityTextureName": "item_poor_mans_shield",
		"Rarity": 2,
		"Effect": "particles/items_fx/general_item_drop_lvl_1.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_block_melee": 10,
			"damage_block_ranged": 4,
			"auto_agility": 6
		},
		"ItemCost": 12
	},
	"item_bomb": {
		"Note": "炸弹",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_bomb",
		"AbilityTextureName": "item_bomb",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_POINT",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"damage": 100,
			"radius": 450
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"ItemCost": 12,
		"ItemStackable": 1,
		"ItemPermanent": 0,
		"ItemInitialCharges": 1
	},
	"item_rusty_axe": {
		"Note": "生锈的斧头",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/items/item_rusty_axe",
		"AbilityTextureName": "item_rusty_axe",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"auto_attack": 2
		}
	},
	"item_aegis_custom": {
		"Note": "埃癸斯之盾",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_aegis_custom",
		"AbilityTextureName": "item_aegis_custom",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCooldown": 6,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_health": 40,
			"auto_armor": 6,
			"auto_health_regen": 12,
			"auto_strength": 10,
			"radius": 500,
			"damage": 30,
			"duration": 1.5
		}
	},
	"item_mana_potion_1": {
		"Note": "小型回蓝药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_mana_potion_1",
		"AbilityTextureName": "item_elixer3",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCastRange": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"mana_regen": 10
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"AbilityName": "item_tombstone",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"PingOverrideText": "DOTA_Chat_Tombstone_Pinged",
		"ItemCost": 2,
		"ItemQuality": "consumable",
		"ItemStackable": 1,
		"ItemShareability": "ITEM_FULLY_SHAREABLE",
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemCastOnPickup": 1
	},
	"item_mana_potion_2": {
		"Note": "小型回蓝药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_mana_potion_2",
		"AbilityTextureName": "item_elixer2",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCastRange": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"mana_regen": 20
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"AbilityName": "item_tombstone",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"PingOverrideText": "DOTA_Chat_Tombstone_Pinged",
		"ItemCost": 4,
		"ItemQuality": "consumable",
		"ItemStackable": 1,
		"ItemShareability": "ITEM_FULLY_SHAREABLE",
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemCastOnPickup": 1
	},
	"item_mana_potion_3": {
		"Note": "小型回蓝药水",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_mana_potion_3",
		"AbilityTextureName": "item_elixer1",
		"Rarity": 1,
		"Effect": "particles/items_fx/general_item_drop_lvl_0.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"AbilityCastRange": 100,
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_NO_TARGET | DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO",
		"AbilityValues": {
			"mana_regen": 30
		},
		"ItemKillable": 0,
		"ItemPurchasable": 1,
		"AbilityName": "item_tombstone",
		"Model": "models/props_gameplay/bottle_mango001.vmdl",
		"PingOverrideText": "DOTA_Chat_Tombstone_Pinged",
		"ItemCost": 6,
		"ItemQuality": "consumable",
		"ItemStackable": 1,
		"ItemShareability": "ITEM_FULLY_SHAREABLE",
		"ItemPermanent": 0,
		"ItemInitialCharges": 1,
		"ItemCastOnPickup": 1
	},
	"item_last_prism": {
		"Note": "最终棱镜",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/items/item_last_prism",
		"AbilityTextureName": "item_seer_stone",
		"Rarity": 5,
		"Effect": "particles/items_fx/general_item_drop_lvl_4.vpcf",
		"ShopType": "SHOP_TYPE_NORMAL",
		"CustomAbilityType": "CUSTOM_TYPE_SURROUND,CUSTOM_TYPE_ENERGY_STRIKE",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityUnitTargetTeam": "DOTA_UNIT_TARGET_TEAM_ENEMY",
		"AbilityUnitTargetType": "DOTA_UNIT_TARGET_HERO | DOTA_UNIT_TARGET_BASIC",
		"AbilityValues": {
			"auto_intellect": 18,
			"auto_projectile_range": 600,
			"auto_cast_range": 350,
			"auto_mana_regen": 100,
			"vision_range": 350,
			"damage_pct": 300,
			"radius": 900,
			"damage_bonus": 60,
			"max_stack": 10,
			"duration": 3
		}
	}
};