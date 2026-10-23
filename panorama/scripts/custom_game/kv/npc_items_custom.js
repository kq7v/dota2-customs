--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().npc_items_custom = {
	"item_vip_card_1": {
		"Note": "会员卡",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_vip_card_1",
		"AbilityTextureName": "vip_card_1",
		"RarityRange": 1,
		"UpgradeGroup": "vip_card",
		"UpgradeRank": 1,
		"Upgrade": "item_vip_card_2",
		"AbilityValues": {
			"item_shop_discount": 10
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_vip_card_2": {
		"Note": "白银会员卡",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_vip_card_2",
		"AbilityTextureName": "vip_card_2",
		"RarityRange": 2,
		"UpgradeGroup": "vip_card",
		"UpgradeRank": 2,
		"Upgrade": "item_vip_card_3",
		"AbilityValues": {
			"item_shop_discount": 15
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_vip_card_3": {
		"Note": "黄金会员卡",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_vip_card_3",
		"AbilityTextureName": "vip_card_3",
		"RarityRange": 3,
		"UpgradeGroup": "vip_card",
		"UpgradeRank": 3,
		"Upgrade": "item_vip_card_4",
		"AbilityValues": {
			"item_shop_discount": 20
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_vip_card_4": {
		"Note": "钻石会员卡",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_vip_card_4",
		"AbilityTextureName": "vip_card_4",
		"RarityRange": 4,
		"UpgradeGroup": "vip_card",
		"UpgradeRank": 4,
		"AbilityValues": {
			"item_shop_discount": 30
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_blood_donation": {
		"Note": "红酒杯",
		"Description": "<Hurt:受伤/>时每损失1%血量获得%gold%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_blood_donation",
		"AbilityTextureName": "kobold_taskmaster_speed_aura",
		"RarityRange": "2|3",
		"Quantitylimit": 1,
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"gold": "0 1 2"
		},
		"ExcludeGameMode": "Abyssal"
	},
	"item_panning_sword": {
		"Note": "淘金剑",
		"Description": "击杀单位时有%chance%%%几率额外获得%gold%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_panning_sword",
		"AbilityTextureName": "item_radiance_inactive",
		"RarityRange": "1|2",
		"Quantitylimit": 1,
		"AbilityValues": {
			"gold": "1 2",
			"chance": 20
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_hand_of_midas_custom": {
		"Note": "迈达斯之手",
		"Description": "对满血的普通敌人造成伤害有%chance%%概率秒杀并获得%gold%金币(对宝石遗迹副本怪物不生效）",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_hand_of_midas_custom",
		"AbilityTextureName": "item_hand_of_midas",
		"RarityRange": "2|3",
		"Quantitylimit": 1,
		"AbilityValues": {
			"gold": "0 10 20",
			"chance": 10
		},
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_bottle_lightning": {
		"Note": "雷电瓶",
		"Description": "每%interval%秒朝敌人投掷%count%个雷电瓶，命中后召唤<Mark|雷击/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_bottle_lightning",
		"AbilityTextureName": "bottle_thunder",
		"RarityRange": "1|2|3",
		"AbilityValues": {
			"interval": 3,
			"damage": {
				"value": 6,
				"+lightning_damage": 1
			},
			"count": "1 2 3"
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_bottle_poison": {
		"Note": "剧毒瓶",
		"Description": "每%interval%秒朝敌人投掷%count%个<Mark|毒瓶/>，落地后生成<Mark|毒池/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_bottle_poison",
		"AbilityTextureName": "bottle_poison",
		"RarityRange": "1|2|3",
		"AbilityValues": {
			"interval": 3,
			"poison": {
				"value": 3,
				"+lightning_damage": 1
			},
			"count": "1 2 3"
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_bottle_ice": {
		"Note": "冰雪瓶",
		"Description": "每%interval%秒朝敌人投掷%count%个剧毒瓶，命中后生成<Mark|毒池/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_bottle_ice",
		"AbilityTextureName": "bottle_ice",
		"RarityRange": "1|2|3",
		"AbilityValues": {
			"interval": 3,
			"damage": {
				"value": 6,
				"+lightning_damage": 1
			},
			"count": "1 2 3"
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_regen_ring": {
		"Note": "恢复戒指",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_regen_ring",
		"AbilityTextureName": "item_essence_ring",
		"RarityRange": "1|2|3",
		"AbilityValues": {
			"item_heal_amplify": "20 40 60"
		},
		"Access": "Shop",
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_gloves_custom": {
		"Note": "加速手套",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_gloves_custom",
		"AbilityTextureName": "item_gloves",
		"RarityRange": "1|2",
		"Upgrade": "item_hyperstone_custom",
		"AbilityValues": {
			"item_attackspeed": "20 40"
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_hyperstone_custom": {
		"Note": "振奋宝石",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_hyperstone_custom",
		"AbilityTextureName": "item_hyperstone",
		"RarityRange": 3,
		"Upgrade": "item_moon_shard_custom",
		"AbilityValues": {
			"item_attackspeed": 60
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_moon_shard_custom": {
		"Note": "银月之晶",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_moon_shard_custom",
		"AbilityTextureName": "item_moon_shard",
		"RarityRange": 5,
		"AbilityValues": {
			"item_attackspeed": 120
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_mask_of_madness_custom": {
		"Note": "疯狂面具",
		"Description": "消耗%fury_cost%<Fury:怒气/>在%duration%秒内提升%attackspeed%攻击速度",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_mask_of_madness_custom",
		"AbilityTextureName": "item_mask_of_madness",
		"RarityRange": "2|3",
		"Quantitylimit": 1,
		"Access": "Shop",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"attackspeed": "0 60 100",
			"duration": 10,
			"fury_cost": 30
		},
		"AbilityCooldown": 16
	},
	"item_blades_of_attack_custom": {
		"Note": "攻击之爪",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_blades_of_attack_custom",
		"AbilityTextureName": "item_blades_of_attack",
		"RarityRange": 1,
		"Upgrade": "item_broadsword_custom",
		"AbilityValues": {
			"item_attack_amplify": 10
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_broadsword_custom": {
		"Note": "阔剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_broadsword_custom",
		"AbilityTextureName": "item_broadsword",
		"RarityRange": 2,
		"Upgrade": "item_claymore_custom",
		"AbilityValues": {
			"item_attack_amplify": 15
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_claymore_custom": {
		"Note": "大剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_claymore_custom",
		"AbilityTextureName": "item_claymore",
		"RarityRange": 3,
		"Upgrade": "item_demon_edge_custom",
		"AbilityValues": {
			"item_attack_amplify": 20
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_demon_edge_custom": {
		"Note": "恶魔刀锋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_demon_edge_custom",
		"AbilityTextureName": "item_demon_edge",
		"RarityRange": 4,
		"Upgrade": "item_rapier_custom",
		"AbilityValues": {
			"item_attack_amplify": 30
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_rapier_custom": {
		"Note": "圣剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_rapier_custom",
		"AbilityTextureName": "item_rapier",
		"RarityRange": 5,
		"AbilityValues": {
			"item_attack_amplify": 50
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_armlet_custom": {
		"Note": "尸鬼臂章",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_armlet_custom",
		"AbilityTextureName": "item_armlet",
		"RarityRange": 2,
		"Upgrade": "item_armlet_active_custom",
		"AbilityValues": {
			"item_attack_amplify": 20,
			"item_health_cost_room_start": -5
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_armlet_active_custom": {
		"Note": "鬼王臂章",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_armlet_active_custom",
		"AbilityTextureName": "item_armlet_active",
		"RarityRange": 3,
		"AbilityValues": {
			"item_attack_amplify": 40,
			"item_health_cost_room_start": -10
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_mantle_custom": {
		"Note": "智力斗篷",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_mantle_custom",
		"AbilityTextureName": "item_mantle",
		"RarityRange": 1,
		"Upgrade": "item_robe_custom",
		"AbilityValues": {
			"item_spell_damage_amplify": 10
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_robe_custom": {
		"Note": "法师长袍",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_robe_custom",
		"AbilityTextureName": "item_robe",
		"RarityRange": 2,
		"Upgrade": "item_staff_of_wizardry_custom",
		"AbilityValues": {
			"item_spell_damage_amplify": 15
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_staff_of_wizardry_custom": {
		"Note": "魔力法杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_staff_of_wizardry_custom",
		"AbilityTextureName": "item_staff_of_wizardry",
		"RarityRange": 3,
		"Upgrade": "item_mystic_staff_custom",
		"AbilityValues": {
			"item_spell_damage_amplify": 20
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_mystic_staff_custom": {
		"Note": "神秘法杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_mystic_staff_custom",
		"AbilityTextureName": "item_mystic_staff",
		"RarityRange": 4,
		"Upgrade": "item_rapier_alt_custom",
		"AbilityValues": {
			"item_spell_damage_amplify": 30
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_rapier_alt_custom": {
		"Note": "圣剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_rapier_alt_custom",
		"AbilityTextureName": "item_rapier_alt",
		"RarityRange": 5,
		"AbilityValues": {
			"item_spell_damage_amplify": 50
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_blight_stone_custom": {
		"Note": "腐蚀之球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_blight_stone_custom",
		"AbilityTextureName": "item_blight_stone",
		"RarityRange": 1,
		"Upgrade": "item_orb_of_destruction_custom",
		"AbilityValues": {
			"item_barrier_damage_amplify": 20
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_orb_of_destruction_custom": {
		"Note": "毁灭灵珠",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_orb_of_destruction_custom",
		"AbilityTextureName": "item_orb_of_destruction",
		"RarityRange": 2,
		"Upgrade": "item_desolator_custom",
		"AbilityValues": {
			"item_barrier_damage_amplify": 40
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_desolator_custom": {
		"Note": "暗灭",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_desolator_custom",
		"AbilityTextureName": "item_desolator",
		"RarityRange": 3,
		"Upgrade": "item_desolator_custom_2",
		"AbilityValues": {
			"item_barrier_damage_amplify": 60
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_desolator_custom_2": {
		"Note": "黯灭",
		"Description": "+ %barrier_damage_amplify%% 对护盾伤害<br>攻击没有护盾的单位提升%damage_amplify%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_desolator_custom_2",
		"AbilityTextureName": "desolator_custom_2",
		"RarityRange": 4,
		"Upgrade": "item_desolator_custom_3",
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"barrier_damage_amplify": 80,
			"damage_amplify": 20
		}
	},
	"item_desolator_custom_3": {
		"Note": "寂灭",
		"Description": "+ %barrier_damage_amplify%% 对护盾伤害<br>攻击没有护盾的单位提升%damage_amplify%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_desolator_custom_3",
		"AbilityTextureName": "item_desolator_2",
		"RarityRange": 5,
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"barrier_damage_amplify": 100,
			"damage_amplify": 50
		}
	},
	"item_item_talisman_of_evasion_custom": {
		"Note": "闪避护符",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_item_talisman_of_evasion_custom",
		"AbilityTextureName": "item_talisman_of_evasion",
		"RarityRange": 2,
		"Quantitylimit": 1,
		"Upgrade": "item_sisters_shroud_custom",
		"AbilityValues": {
			"item_evasion": 5
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_sisters_shroud_custom": {
		"Note": "魅影之纱",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_sisters_shroud_custom",
		"AbilityTextureName": "item_sisters_shroud",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"item_evasion": 10
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_chipped_vest_custom": {
		"Note": "破碎鳞甲",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，造成%damage%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_chipped_vest_custom",
		"AbilityTextureName": "item_chipped_vest",
		"RarityRange": 1,
		"Upgrade": "item_blade_mail_custom",
		"AbilityValues": {
			"damage": {
				"value": 10,
				"*retaliated_damage_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_blade_mail_custom": {
		"Note": "刃甲",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，造成%damage%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_blade_mail_custom",
		"AbilityTextureName": "item_blade_mail",
		"RarityRange": 2,
		"Upgrade": "item_blade_mail_alt1",
		"AbilityValues": {
			"damage": {
				"value": 20,
				"*retaliated_damage_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_blade_mail_alt1": {
		"Note": "诅咒铠甲",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，造成%damage%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_blade_mail_alt1",
		"AbilityTextureName": "item_blade_mail_spectre_arcana_alt1",
		"RarityRange": 3,
		"Upgrade": "item_blade_mail_alt2",
		"AbilityValues": {
			"damage": {
				"value": 30,
				"*retaliated_damage_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_blade_mail_alt2": {
		"Note": "烈烬铠甲",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，造成%damage%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_blade_mail_alt2",
		"AbilityTextureName": "item_blade_mail_axe_pw",
		"RarityRange": 4,
		"AbilityValues": {
			"damage": {
				"value": 40,
				"*retaliated_damage_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_black_powder_bag_custom": {
		"Note": "雷火弹",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，造成范围伤害并击退敌人",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_black_powder_bag_custom",
		"AbilityTextureName": "item_black_powder_bag",
		"RarityRange": "2|3",
		"Quantitylimit": 1,
		"AbilityValues": {
			"damage": {
				"value": "0 10 20",
				"*retaliated_damage_amplify": 1
			},
			"distance": 300
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityCooldown": 2
	},
	"item_poison_spores": {
		"Note": "剧毒孢子",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，生成毒池",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_poison_spores",
		"AbilityTextureName": "item_foragers_health",
		"RarityRange": "2|3",
		"Quantitylimit": 1,
		"AbilityValues": {
			"poison": {
				"value": "0 4 8",
				"*retaliated_damage_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityCooldown": 2
	},
	"item_pyrrhic_cloak_custom": {
		"Note": "刀阵披风",
		"Description": "<Hit:受击/>时进行<Counter:反击/>，发射刀阵旋风",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_pyrrhic_cloak_custom",
		"AbilityTextureName": "item_pyrrhic_cloak",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"damage": {
				"value": "10 20",
				"*retaliated_damage_amplify": 1
			},
			"dagger_count": 6,
			"dagger_speed": 1400,
			"dagger_distance": {
				"value": 450,
				"+bullet_range": 1
			},
			"dagger_width": 125,
			"dagger_damage": {
				"value": 0,
				"+attack": 0.3
			}
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityCooldown": 3
	},
	"item_nemesis_curse_custom": {
		"Note": "诅咒项链",
		"Description": "下一次<Backstab:背刺/>伤害提升%damage_pct%%",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_nemesis_curse_custom",
		"AbilityTextureName": "item_nemesis_curse",
		"RarityRange": 1,
		"Quantitylimit": 1,
		"AbilityValues": {
			"damage_pct": 75
		},
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityCooldown": 5
	},
	"item_wind_lace_custom": {
		"Note": "风灵之纹",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_wind_lace_custom",
		"AbilityTextureName": "item_wind_lace",
		"RarityRange": 1,
		"Upgrade": "item_boots_custom",
		"AbilityValues": {
			"item_movespeed": 30
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_boots_custom": {
		"Note": "草鞋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_boots_custom",
		"AbilityTextureName": "item_boots",
		"RarityRange": 2,
		"Upgrade": "item_phase_boots_custom",
		"AbilityValues": {
			"item_movespeed": 60
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_phase_boots_custom": {
		"Note": "相位鞋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_phase_boots_custom",
		"AbilityTextureName": "item_phase_boots",
		"RarityRange": 3,
		"Upgrade": "item_travel_boots_custom",
		"AbilityValues": {
			"item_movespeed": 90
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_travel_boots_custom": {
		"Note": "飞鞋",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_travel_boots_custom",
		"AbilityTextureName": "item_travel_boots",
		"RarityRange": 4,
		"AbilityValues": {
			"item_movespeed": 120
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_lance_custom_1": {
		"Note": "追击之矛",
		"Description": "每移动%distance%距离，下次攻击额外追击一次",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_lance_custom_1",
		"AbilityTextureName": "lance_of_pursuit_1",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"Upgrade": "item_lance_custom_2",
		"AbilityValues": {
			"distance": {
				"value": 900,
				"/move_distance_efficiency": 1
			}
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_lance_custom_2": {
		"Note": "追击之矛",
		"Description": "每移动%distance%距离，下次攻击额外追击一次",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_lance_custom_2",
		"AbilityTextureName": "lance_of_pursuit_2",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"distance": {
				"value": 450,
				"/move_distance_efficiency": 1
			}
		},
		"Access": "Shop",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_yashatry_custom": {
		"Note": "夜叉",
		"Description": "每%threshold%移动速度提升%damage_pct%%攻击力",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_yashatry_custom",
		"AbilityTextureName": "item_yasha",
		"RarityRange": 3,
		"AbilityValues": {
			"threshold": 100,
			"damage_pct": 6
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_octarine_core_custom": {
		"Note": "玲珑心",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_octarine_core_custom",
		"AbilityTextureName": "item_octarine_core",
		"RarityRange": 4,
		"AbilityValues": {
			"item_cooldown_reduction": 25
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_dragon_egg": {
		"Note": "龙蛋",
		"Description": "击杀%kill%个敌人后孵化",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_dragon_egg",
		"AbilityTextureName": "item_precious_egg",
		"RarityRange": 2,
		"Upgrade": "item_dragon_baby",
		"AbilityValues": {
			"kill": 40
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_dragon_baby": {
		"Note": "宝贝龙",
		"Description": "龙可是帝王之征啊",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_dragon_baby",
		"AbilityTextureName": "invoker_forge_spirit_persona1",
		"RarityRange": 4,
		"Upgrade": "item_super_dragon_baby",
		"AbilityValues": {
			"kill": 80
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_super_dragon_baby": {
		"Note": "超级宝贝龙",
		"Description": "龙可是帝王之征啊",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_super_dragon_baby",
		"AbilityTextureName": "invoker_forge_spirit_persona1",
		"RarityRange": 5,
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_wisp_sword_1": {
		"Note": "九天玄剑",
		"Description": "每%interval%秒生成%count%把<Mark|飞剑/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_wisp_sword_1",
		"AbilityTextureName": "skywrath_mage_staff_of_the_scion",
		"RarityRange": 3,
		"Upgrade": "item_wisp_sword_2",
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"interval": 12,
			"count": 9
		}
	},
	"item_wisp_sword_2": {
		"Note": "九天玄剑",
		"Description": "每%interval%秒生成%count%把<Mark|飞剑/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_wisp_sword_2",
		"AbilityTextureName": "skywrath_mage_shield_of_the_scion_alt2",
		"RarityRange": 4,
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"interval": 6,
			"count": 9
		}
	},
	"item_specialists_array_custom": {
		"Note": "行家阵列",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_specialists_array_custom",
		"AbilityTextureName": "item_specialists_array",
		"RarityRange": 2,
		"UpgradeGroup": "crossbow_split",
		"UpgradeRank": 1,
		"Upgrade": "item_double_crossbow",
		"AbilityValues": {
			"item_split_count": 1
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_double_crossbow": {
		"Note": "连发弩箭",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_double_crossbow",
		"AbilityTextureName": "double_crossbow",
		"RarityRange": 3,
		"UpgradeGroup": "crossbow_split",
		"UpgradeRank": 2,
		"Upgrade": "item_triple_crossbow",
		"AbilityValues": {
			"item_split_count": 2
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_triple_crossbow": {
		"Note": "水晶弩炮",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_triple_crossbow",
		"AbilityTextureName": "triple_crossbow",
		"RarityRange": 4,
		"UpgradeGroup": "crossbow_split",
		"UpgradeRank": 3,
		"Upgrade": "item_four_crossbow",
		"AbilityValues": {
			"item_split_count": 3
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_four_crossbow": {
		"Note": "代达罗斯弩炮",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_four_crossbow",
		"AbilityTextureName": "four_crossbow",
		"RarityRange": 5,
		"UpgradeGroup": "crossbow_split",
		"UpgradeRank": 4,
		"AbilityValues": {
			"item_split_count": 4
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_item_keen_optic_custom": {
		"Note": "基恩镜片",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_item_keen_optic_custom",
		"AbilityTextureName": "item_keen_optic",
		"RarityRange": 1,
		"Upgrade": "item_spy_gadget_custom",
		"AbilityValues": {
			"item_bullet_range": 100
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_spy_gadget_custom": {
		"Note": "望远镜",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_spy_gadget_custom",
		"AbilityTextureName": "item_spy_gadget",
		"RarityRange": 2,
		"Upgrade": "item_aether_lens_custom",
		"AbilityValues": {
			"item_bullet_range": 200
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_aether_lens_custom": {
		"Note": "以太透镜",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_aether_lens_custom",
		"AbilityTextureName": "item_aether_lens",
		"RarityRange": 3,
		"Upgrade": "item_star_lens",
		"AbilityValues": {
			"item_bullet_range": 300
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_star_lens": {
		"Note": "群星透镜",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_star_lens",
		"AbilityTextureName": "star_lens",
		"RarityRange": 4,
		"AbilityValues": {
			"item_bullet_range": 400
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_arcane_sigil": {
		"Note": "秘技纹章",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_arcane_sigil",
		"AbilityTextureName": "arcane_sigil",
		"RarityRange": 3,
		"AbilityValues": {
			"item_ability_charge_skill": 1
		},
		"Access": "Shop",
		"Suit": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_gale_sigil": {
		"Note": "疾风纹章",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_gale_sigil",
		"AbilityTextureName": "gale_sigil",
		"RarityRange": 3,
		"AbilityValues": {
			"item_ability_charge_dodge": 1
		},
		"Access": "Shop",
		"Suit": "Dodge",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_indomitable_sigil": {
		"Note": "不屈纹章",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_indomitable_sigil",
		"AbilityTextureName": "indomitable_sigil",
		"RarityRange": 3,
		"AbilityValues": {
			"item_ability_charge_defense": 1
		},
		"Access": "Shop",
		"Suit": "Defense",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_apocalypse_sigil": {
		"Note": "天启纹章",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_apocalypse_sigil",
		"AbilityTextureName": "apocalypse_sigil",
		"RarityRange": 3,
		"AbilityValues": {
			"item_ability_charge_ultimate": 1
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_ice_ring": {
		"Note": "冰环",
		"Description": "召唤两个冰元素球<Ring:环绕物/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_ice_ring",
		"AbilityTextureName": "invoker_quas",
		"RarityRange": 4,
		"AbilityValues": {
			"count": {
				"value": 2,
				"+ring_count": 1
			},
			"damage": {
				"value": 15,
				"*ring_damage_amplify": 1
			},
			"speed": {
				"value": 180,
				"*ring_speed_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_fire_ring": {
		"Note": "火环",
		"Description": "召唤两个火元素球<Ring:环绕物/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_fire_ring",
		"AbilityTextureName": "invoker_exort",
		"RarityRange": 4,
		"AbilityValues": {
			"count": {
				"value": 2,
				"+ring_count": 1
			},
			"damage": {
				"value": 15,
				"*ring_damage_amplify": 1
			},
			"speed": {
				"value": 180,
				"*ring_speed_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_wex_ring": {
		"Note": "雷环",
		"Description": "召唤两个雷元素球<Ring:环绕物/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_wex_ring",
		"AbilityTextureName": "invoker_wex",
		"RarityRange": 4,
		"AbilityValues": {
			"count": {
				"value": 2,
				"+ring_count": 1
			},
			"damage": 15,
			"speed": {
				"value": 180,
				"*ring_speed_amplify": 1
			}
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_boundary_breaker": {
		"Note": "破界星环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_boundary_breaker",
		"AbilityTextureName": "abaddon_aphotic_shield_alliance",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"item_ring_count": 1
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_magnetiz": {
		"Note": "磁石",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_magnetiz",
		"AbilityTextureName": "earth_spirit_magnetize",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"item_ring_speed_amplify": 50
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_force_boots_custom": {
		"Note": "原力鞋",
		"Description": "<Dodge:冲刺/>时提升%ring_speed_amplify%%<Ring:环绕物/>速度",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_force_boots_custom",
		"AbilityTextureName": "item_force_boots",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"ring_speed_amplify": 100
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_black_hole": {
		"Note": "黑洞",
		"Description": "每个<Ring:环绕物/>增加%damage_per_ring%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_black_hole",
		"AbilityTextureName": "enigma_black_hole",
		"RarityRange": 3,
		"AbilityValues": {
			"damage_per_ring": 5
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_open_birdcage": {
		"Note": "打开的鸟笼",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_open_birdcage",
		"AbilityTextureName": "open_birdcage",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"item_ring_track_radius": 200
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_dark_orb": {
		"Note": "暗蚀灵珠",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_dark_orb",
		"AbilityTextureName": "spectre_dispersion",
		"RarityRange": 3,
		"AbilityValues": {
			"item_ring_damage_amplify": 35
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_fluffy_hat_custom": {
		"Note": "毛毛帽",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_fluffy_hat_custom",
		"AbilityTextureName": "item_fluffy_hat",
		"RarityRange": 1,
		"Upgrade": "item_vitality_booster_custom",
		"AbilityValues": {
			"item_health": 30
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_vitality_booster_custom": {
		"Note": "活力之球",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_vitality_booster_custom",
		"AbilityTextureName": "item_vitality_booster",
		"RarityRange": 2,
		"Upgrade": "item_dragon_heart_custom",
		"AbilityValues": {
			"item_health": 60
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_dragon_heart_custom": {
		"Note": "龙心",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_dragon_heart_custom",
		"AbilityTextureName": "item_heart",
		"RarityRange": 3,
		"AbilityValues": {
			"item_health": 90,
			"item_heal_room_start": 5
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_soul_ring_custom": {
		"Note": "灵魂之戒",
		"Description": "<Hit:受击/>时积累%mana_regen%<Fury:怒气/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_soul_ring_custom",
		"AbilityTextureName": "item_soul_ring",
		"RarityRange": 2,
		"AbilityValues": {
			"mana_regen": 30
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityCooldown": 6
	},
	"item_fury_helmet_1": {
		"Note": "变节头环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_fury_helmet_1",
		"AbilityTextureName": "fury_bracelet_1",
		"RarityRange": 1,
		"Upgrade": "item_fury_helmet_2",
		"AbilityValues": {
			"item_mana": 25
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_fury_helmet_2": {
		"Note": "失节贵族头环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_fury_helmet_2",
		"AbilityTextureName": "fury_bracelet_2",
		"RarityRange": 2,
		"Upgrade": "item_fury_helmet_3",
		"AbilityValues": {
			"item_mana": 50
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_fury_helmet_3": {
		"Note": "猩红战盔",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_fury_helmet_3",
		"AbilityTextureName": "fury_helmet_2",
		"RarityRange": 3,
		"Upgrade": "item_fury_helmet_4",
		"AbilityValues": {
			"item_mana": 75
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_fury_helmet_4": {
		"Note": "地狱狂怒头盔",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_fury_helmet_4",
		"AbilityTextureName": "fury_helmet_3",
		"RarityRange": 4,
		"AbilityValues": {
			"item_mana": 100
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_ring_of_regen_custom": {
		"Note": "回怒戒指",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_ring_of_regen_custom",
		"AbilityTextureName": "item_ring_of_regen",
		"RarityRange": 1,
		"Upgrade": "item_ring_of_health_custom",
		"AbilityValues": {
			"item_fury_regen": 2
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_ring_of_health_custom": {
		"Note": "怒气指环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_ring_of_health_custom",
		"AbilityTextureName": "item_ring_of_health",
		"RarityRange": 2,
		"Upgrade": "item_ring_of_tarrasque_custom",
		"AbilityValues": {
			"item_fury_regen": 4
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_ring_of_tarrasque_custom": {
		"Note": "恐鳌之戒",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_ring_of_tarrasque_custom",
		"AbilityTextureName": "item_ring_of_tarrasque",
		"RarityRange": 3,
		"Upgrade": "item_giants_ring_custom",
		"AbilityValues": {
			"item_fury_regen": 6
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_giants_ring_custom": {
		"Note": "巨人之戒",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_giants_ring_custom",
		"AbilityTextureName": "item_giants_ring",
		"RarityRange": 4,
		"AbilityValues": {
			"item_fury_regen": 8
		},
		"Access": "Shop",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_blazescale_bracers": {
		"Note": "烈鳞护腕",
		"Description": "遭遇战开始时，获得%shield_amount%<StrongShield:强效护盾/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_blazescale_bracers",
		"AbilityTextureName": "item_vambrace",
		"RarityRange": "3|4",
		"AbilityValues": {
			"shield_amount": "0 0 40 60"
		},
		"Access": "Shop",
		"Suit": "Shield",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_ghost_scepter": {
		"Note": "幽魂权杖",
		"Description": "无法暴击，持续%duration_rooms%场遭遇战，之后获得%crit_damage%%暴击伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_ghost_scepter",
		"AbilityTextureName": "item_ghost",
		"RarityRange": "3|4|5",
		"AbilityValues": {
			"duration_rooms": 3,
			"crit_damage": "0 0 50 100 150"
		},
		"Suit": "Crit",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_tranquility_pill": {
		"Note": "静心丸",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_tranquility_pill",
		"AbilityTextureName": "item_ocean_heart",
		"RarityRange": 3,
		"AbilityValues": {
			"item_fury_amplify": -80,
			"item_attack_damage_amplify": 40
		},
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_bloodpact_blade": {
		"Note": "血契之刃",
		"Description": "每次击杀敌人回复2点生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_bloodpact_blade",
		"AbilityTextureName": "item_dagger_of_ristul",
		"RarityRange": "1|2|3",
		"Quantitylimit": 1,
		"AbilityValues": {
			"heal_per_kill": "2 3 4"
		},
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_true_king_crown": {
		"Note": "真王之冠",
		"Description": "复活次数+1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_true_king_crown",
		"AbilityTextureName": "item_helm_of_the_undying",
		"RarityRange": "4|5",
		"AbilityValues": {
			"respawn_count": "1 2"
		},
		"Suit": "Survive",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_fate_coin": {
		"Note": "双面币",
		"Description": "让神决定你的命运",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_fate_coin",
		"AbilityTextureName": "item_doubloon",
		"RarityRange": 1,
		"AbilityValues": {
			"chance_low": 49,
			"hp_low_pct": 25,
			"hp_high_pct": 95
		},
		"Suit": "Gamble",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_void_hammer_1": {
		"Note": "超维战棍",
		"Description": "<Hotkey|Attack/>有%chance%%概率造成%damage%伤害和短暂<Mark|晕眩/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_void_hammer_1",
		"AbilityTextureName": "void_hammer_1",
		"RarityRange": 2,
		"Quantitylimit": 1,
		"Upgrade": "item_artifact_void_hammer_2",
		"AbilityValues": {
			"stun_duration": 0.3,
			"chance": 24,
			"damage": {
				"value": 0,
				"+attack": 1
			}
		},
		"Access": "Shop",
		"Suit": "Control",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_void_hammer_2": {
		"Note": "超维战棍",
		"Description": "<Hotkey|Attack/>有%chance%%概率造成%damage%伤害和短暂<Mark|晕眩/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_void_hammer_2",
		"AbilityTextureName": "void_hammer_2",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"Upgrade": "item_artifact_void_hammer_3",
		"AbilityValues": {
			"stun_duration": 0.3,
			"chance": 24,
			"damage": {
				"value": 0,
				"+attack": 1.5
			}
		},
		"Access": "Shop",
		"Suit": "Control",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_void_hammer_3": {
		"Note": "超维战棍",
		"Description": "<Hotkey|Attack/>有%chance%%概率造成%damage%伤害和短暂<Mark|晕眩/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_void_hammer_3",
		"AbilityTextureName": "void_hammer_3",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"stun_duration": 0.3,
			"chance": 24,
			"damage": {
				"value": 0,
				"+attack": 2
			}
		},
		"Access": "Shop",
		"Suit": "Control",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_substitute_doll": {
		"Note": "替死玩偶",
		"Description": "免疫一次死亡，只能生效一次",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_substitute_doll",
		"AbilityTextureName": "item_unstable_wand",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"teleport_radius": 400,
			"heal_pct": 35,
			"trigger_count": 1
		},
		"Access": "Shop",
		"Suit": "Survive",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_indomitable_badge": {
		"Note": "不屈徽章",
		"Description": "复活后增加伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_indomitable_badge",
		"AbilityTextureName": "item_unrelenting_eye",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"damage_amplify": 30,
			"duration": 10
		},
		"Access": "Shop",
		"Suit": "Survive",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_steelflame_armor": {
		"Note": "至刚炎铠",
		"Description": "释放绝招后，5秒内持续造成伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_steelflame_armor",
		"AbilityTextureName": "item_cloak_of_flames",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"radius": 400,
			"damage": 10,
			"duration": 5,
			"interval": 1
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_giant_sword": {
		"Note": "巨人之剑",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_giant_sword",
		"AbilityTextureName": "item_disperser",
		"RarityRange": 4,
		"AbilityValues": {
			"item_attackspeed": -70,
			"item_attack": 12
		},
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_crimson_ring": {
		"Note": "猩红之环",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_crimson_ring",
		"AbilityTextureName": "item_ring_of_tarrasque",
		"RarityRange": "1|2|3",
		"AbilityValues": {
			"item_skill_fury_amplify": "40 60 80"
		},
		"Suit": "Fury",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_demonkin_pauldrons": {
		"Note": "魔裔护肩",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_demonkin_pauldrons",
		"AbilityTextureName": "item_blade_mail_spectre_arcana_alt1",
		"RarityRange": 3,
		"AbilityValues": {
			"item_shield_no_attenuation_chance": 30
		},
		"Suit": "Shield",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_tears_crown": {
		"Note": "泪水之冠",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_tears_crown",
		"AbilityTextureName": "morphling_adaptive_strike_agi_ethereal_blade",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"item_health_amplify": -40,
			"item_attack": 13
		},
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_void_gate": {
		"Note": "虚无之扉",
		"Description": "3个房间内不会死亡，之后扣除1点复活次数",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_void_gate",
		"AbilityTextureName": "abyssal_underlord_dark_rift",
		"RarityRange": 2,
		"Quantitylimit": 1,
		"AbilityValues": {
			"duration_rooms": 3
		},
		"Suit": "Survive",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_life_insurance": {
		"Note": "人寿保险",
		"Description": "当队伍有人死亡时，获得死亡玩家等级*10的金币奖励",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_life_insurance",
		"AbilityTextureName": "item_ofrenda_12",
		"RarityRange": 3,
		"Quantitylimit": 1,
		"AbilityValues": {
			"gold_per_level": 10
		},
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_flying_lion_blade": {
		"Note": "飞狮之刃",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_flying_lion_blade",
		"AbilityTextureName": "item_echo_sabre",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_skill_damage_amplify": "20 40 60 80 100"
		},
		"Access": "Shop",
		"Suit": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_cube_staff": {
		"Note": "魔方之杖",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_cube_staff",
		"AbilityTextureName": "rubick/arcana/rubick_arcane_supremacy_arcana",
		"RarityRange": "1|2|3|4",
		"AbilityValues": {
			"item_ultimate_damage_amplify": "20 40 60 80 100"
		},
		"Access": "Shop",
		"Suit": "Ultimate",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_broom_handle_custom": {
		"Note": "扫帚",
		"Description": "攻击对%distance%范围内的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_broom_handle_custom",
		"AbilityTextureName": "item_broom_handle",
		"RarityRange": "1|2",
		"Upgrade": "item_bfury_custom",
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_amp": "15 25",
			"distance": 250
		}
	},
	"item_bfury_custom": {
		"Note": "狂战斧",
		"Description": "攻击对%distance%范围内的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_bfury_custom",
		"AbilityTextureName": "item_bfury",
		"RarityRange": "3|4",
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_amp": "0 0 35 45",
			"distance": 250
		}
	},
	"item_dragon_lance_custom": {
		"Note": "魔龙枪",
		"Description": "攻击对%distance%范围外的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_dragon_lance_custom",
		"AbilityTextureName": "item_dragon_lance",
		"RarityRange": "1|2",
		"Upgrade": "item_hurricane_pike_custom",
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_amp": "15 25",
			"distance": 500
		}
	},
	"item_hurricane_pike_custom": {
		"Note": "飓风长戟",
		"Description": "攻击对%distance%范围外的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_hurricane_pike_custom",
		"AbilityTextureName": "item_hurricane_pike",
		"RarityRange": "3|4",
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"damage_amp": "0 0 35 45",
			"distance": 500
		}
	},
	"item_artifact_oppressor_blade_1": {
		"Note": "弃誓之刃",
		"Description": "对<LowHealth:危血/>的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_oppressor_blade_1",
		"AbilityTextureName": "sven_great_cleave",
		"RarityRange": 1,
		"Upgrade": "item_artifact_oppressor_blade_2",
		"AbilityValues": {
			"damage_amp": 50
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_oppressor_blade_2": {
		"Note": "弃誓之刃",
		"Description": "对<LowHealth:危血/>的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_oppressor_blade_2",
		"AbilityTextureName": "sven/fiend_cleaver_icons/sven_great_cleave",
		"RarityRange": 2,
		"Upgrade": "item_artifact_oppressor_blade_3",
		"AbilityValues": {
			"damage_amp": 100
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_oppressor_blade_3": {
		"Note": "弃誓之刃",
		"Description": "对<LowHealth:危血/>的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_oppressor_blade_3",
		"AbilityTextureName": "sven/cyclopean_marauder_ability_icons/sven_great_cleave",
		"RarityRange": 3,
		"AbilityValues": {
			"damage_amp": 150
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_giant_killer_1": {
		"Note": "巨人杀手",
		"Description": "对<Healthy:健康/>的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_giant_killer_1",
		"AbilityTextureName": "giant_killer_1",
		"RarityRange": 1,
		"Upgrade": "item_artifact_giant_killer_2",
		"AbilityValues": {
			"damage_amp": 50
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_giant_killer_2": {
		"Note": "巨人杀手",
		"Description": "对<Healthy:健康/>的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_giant_killer_2",
		"AbilityTextureName": "giant_killer_2",
		"RarityRange": 2,
		"Upgrade": "item_artifact_giant_killer_3",
		"AbilityValues": {
			"damage_amp": 100
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_giant_killer_3": {
		"Note": "巨人杀手",
		"Description": "对<Healthy:健康/>的敌人额外造成%damage_amp%%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_giant_killer_3",
		"AbilityTextureName": "giant_killer_3",
		"RarityRange": 3,
		"AbilityValues": {
			"damage_amp": 150
		},
		"Access": "Shop",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_reclamation_breaker": {
		"Note": "开垦破坏者",
		"Description": "使用特技会投掷炸弹",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_reclamation_breaker",
		"AbilityTextureName": "techies_sticky_bomb",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"throw_range": 400,
			"delay": 3,
			"radius": 300,
			"damage_mult_attack": 3
		},
		"Suit": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_reverse_bayonet": {
		"Note": "反转刺刀",
		"Description": "攻击有%chance%%概率对前方造成%damage%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_reverse_bayonet",
		"AbilityTextureName": "item_echo_stone",
		"RarityRange": 4,
		"Quantitylimit": 1,
		"AbilityValues": {
			"chance": 20,
			"angle": 90,
			"range": 400,
			"damage": 15
		},
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_healing_potion": {
		"Note": "治疗药剂",
		"Description": "立即回复%heal_amount%点生命值",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_healing_potion",
		"AbilityTextureName": "item_flask2",
		"RarityRange": "1|2|3",
		"AbilityValues": {
			"heal_amount": "60 80 100"
		},
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"item_artifact_trick_sapper_bomb": {
		"Note": "奇技工兵炸弹",
		"Description": "每个环绕物每秒有%chance%%概率对%radius%范围造成%damage%伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_trick_sapper_bomb",
		"AbilityTextureName": "techies_remote_mines",
		"RarityRange": "4|5",
		"Quantitylimit": 1,
		"AbilityValues": {
			"chance": 20,
			"radius": 200,
			"damage": "8 16",
			"interval": 1
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_wyrm_crown": {
		"Note": "邪龙之冠",
		"Description": "环绕物造成伤害时有%chance%%概率使目标结算一次中毒伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_wyrm_crown",
		"AbilityTextureName": "dragon_knight_corrosive",
		"RarityRange": 5,
		"Quantitylimit": 1,
		"AbilityValues": {
			"chance": 50
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_demonblood_heart": {
		"Note": "魔血之心",
		"Description": "环绕物造成伤害时有%chance%%概率使目标结算一次流血伤害",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_demonblood_heart",
		"AbilityTextureName": "dragon_knight_splash",
		"RarityRange": 5,
		"Quantitylimit": 1,
		"AbilityValues": {
			"chance": 50
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_frost_essence": {
		"Note": "寒冰菁华",
		"Description": "环绕物造成伤害时有%chance%%概率给目标施加1层冰冻",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_frost_essence",
		"AbilityTextureName": "dragon_knight_frost",
		"RarityRange": 5,
		"Quantitylimit": 1,
		"AbilityValues": {
			"chance": 50
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_decision_whip": {
		"Note": "决断之鞭",
		"Description": "每%interval%秒在环绕物周围召唤雷击",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_decision_whip",
		"AbilityTextureName": "razor_static_link_alt",
		"RarityRange": 5,
		"Quantitylimit": 1,
		"AbilityValues": {
			"interval": 2,
			"damage": 45,
			"radius": 300
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_hope_hammer": {
		"Note": "希望之锤",
		"Description": "环绕物造成伤害时有%chance%%概率添加%shield%护盾",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_hope_hammer",
		"AbilityTextureName": "dawnbreaker_celestial_hammer",
		"RarityRange": 5,
		"Quantitylimit": 1,
		"AbilityValues": {
			"chance": 15,
			"shield": {
				"value": 0,
				"+health": 0.05
			}
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_simple_knife": {
		"Note": "朴素小刀",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_simple_knife",
		"AbilityTextureName": "item_blade_of_alacrity",
		"RarityRange": "1|2|3|4|5",
		"AbilityValues": {
			"item_attack": "2 4 6 8 12"
		},
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_heavenreach_pauldrons": {
		"Note": "通天肩铠",
		"BaseClass": "item_datadriven",
		"ScriptFile": "abilities/artifact/item_artifact_heavenreach_pauldrons",
		"AbilityTextureName": "item_crimson_robe",
		"RarityRange": "3|4|5",
		"AbilityValues": {
			"item_ring_fury_amplify": "0 0 50 75 100"
		},
		"Suit": "Ring",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_berserker_helm": {
		"Note": "狂暴头盔",
		"Description": "你总是以%fury_pct%%的<Fury:怒气值/>进入接下来的%duration_rooms%个遭遇战房间",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_berserker_helm",
		"AbilityTextureName": "item_helm_of_the_overlord",
		"RarityRange": 2,
		"Quantitylimit": 1,
		"AbilityValues": {
			"duration_rooms": 3,
			"fury_pct": 100
		},
		"Suit": "Fury",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_fortune_fruit": {
		"Note": "气运之果",
		"Description": "获得随机祝福",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_fortune_fruit",
		"AbilityTextureName": "item_enchanted_mango",
		"RarityRange": 2,
		"GoldCost": 60,
		"Access": "Meepo",
		"Suit": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_dragon_treasure": {
		"Note": "巨龙宝物",
		"Description": "获得一个稀有度最少为紫色的祝福",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_dragon_treasure",
		"AbilityTextureName": "item_ambient_sorcery",
		"RarityRange": 3,
		"GoldCost": 150,
		"AbilityValues": {
			"min_RarityRange": 4,
			"count": 1
		},
		"Access": "Meepo",
		"Suit": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_sprite_bottle": {
		"Note": "精怪玻瓶",
		"Description": "随机%bless_rarity_bonus%个祝福的稀有度提升为紫色",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_sprite_bottle",
		"AbilityTextureName": "item_bottle_xp",
		"RarityRange": "2|3",
		"GoldCost": "30 30 60",
		"AbilityValues": {
			"bless_rarity_bonus": "0 1 2"
		},
		"Suit": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_artifact_kredan_rose": {
		"Note": "克瑞丹玫瑰",
		"Description": "无伤下%duration_rooms%次遭遇战，则获得%gold%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_kredan_rose",
		"AbilityTextureName": "item_searing_signet",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration_rooms": 3,
			"gold": "70 140 210"
		},
		"Access": "Meepo",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"ExcludeGameMode": "Abyssal"
	},
	"item_artifact_fury_potion": {
		"Note": "怒气药剂",
		"Description": "使用<Hotkey|Ultimate/>后积累%fury%<Fury:怒气/>",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_artifact_fury_potion",
		"AbilityTextureName": "item_flayers_bota",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"fury": "10 20 30",
			"duration": 4
		},
		"Access": "Meepo",
		"Suit": "Fury",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"item_bone_rending_nail": {
		"Note": "裂骨符钉",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_bone_rending_nail",
		"AbilityTextureName": "bone_rending_nail",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": 4,
			"item_attack_damage_amplify": "20 40 60"
		},
		"Access": "Meepo",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_black_candle_ash": {
		"Note": "黑烛之灰",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_black_candle_ash",
		"AbilityTextureName": "black_candle_ash",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": 4,
			"item_skill_damage_amplify": "20 40 60"
		},
		"Access": "Meepo",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_blood_feast_beads": {
		"Note": "血宴念珠",
		"Description": "击杀敌人有%chance%%%概率掉落治疗物",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_blood_feast_beads",
		"AbilityTextureName": "blood_feast_beads",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": 4,
			"chance": 15
		},
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_shadow_stitch_dagger": {
		"Note": "影缝匕首",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_shadow_stitch_dagger",
		"AbilityTextureName": "shadow_stitch_dagger",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": 4,
			"item_backstab_damage_amplify": "30 60 90"
		},
		"Access": "Meepo",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_armor_breaker_wedge": {
		"Note": "碎甲楔钉",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_armor_breaker_wedge",
		"AbilityTextureName": "armor_breaker_wedge",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": 4,
			"item_barrier_damage_amplify": "20 40 60"
		},
		"Access": "Meepo",
		"Suit": "Damage",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_plague_blood": {
		"Note": "恶疫之血",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_plague_blood",
		"AbilityTextureName": "plague_blood",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": "3 4 5",
			"item_movespeed_amplify": 10
		},
		"Access": "Meepo",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_iron_maiden_shard": {
		"Note": "铁处女残片",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_iron_maiden_shard",
		"AbilityTextureName": "iron_maiden_shard",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"duration": "3 4 5",
			"item_trap_damage_amplify": 200
		},
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_soul_split_stone": {
		"Note": "暗影裂魂石",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_soul_split_stone",
		"AbilityTextureName": "soul_split_stone",
		"RarityRange": 3,
		"GoldCost": 60,
		"AbilityValues": {
			"duration": 4,
			"item_ability_charge_skill": 1
		},
		"Access": "Meepo",
		"Suit": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_soul_split_stone2": {
		"Note": "疾风裂魂石",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_soul_split_stone2",
		"AbilityTextureName": "soul_split_stone2",
		"RarityRange": 3,
		"GoldCost": 60,
		"Access": "Meepo",
		"Suit": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"duration": 4,
			"item_ability_charge_dodge": 1
		}
	},
	"item_soul_split_stone3": {
		"Note": "铁壁裂魂石",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_soul_split_stone3",
		"AbilityTextureName": "soul_split_stone3",
		"RarityRange": 3,
		"GoldCost": 60,
		"Access": "Meepo",
		"Suit": "Skill",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"duration": 4,
			"item_ability_charge_defense": 1
		}
	},
	"item_healing_bandage": {
		"Note": "疗愈绷带",
		"Description": "回复%heal_amount%生命",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_healing_bandage",
		"AbilityTextureName": "healing_bandage",
		"RarityRange": "1|2",
		"GoldCost": "30 60",
		"AbilityValues": {
			"heal_amount": {
				"value": 0,
				"+health": "0.15 0.3"
			}
		},
		"Access": "Meepo",
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"item_regen_moss_medicine": {
		"Note": "再生苔药",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_regen_moss_medicine",
		"AbilityTextureName": "regen_moss_medicine",
		"RarityRange": "1|2|3",
		"GoldCost": "20 40 60",
		"AbilityValues": {
			"item_heal_room_start": 10,
			"duration": "3 4 5"
		},
		"Access": "Meepo",
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_ofrenda_shovel_custom": {
		"Note": "洛阳铲",
		"Description": "进入房间时随机获得%gold_min%~%gold_max%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_ofrenda_shovel_custom",
		"AbilityTextureName": "item_ofrenda_shovel",
		"RarityRange": "1|2|3",
		"GoldCost": "30 50 70",
		"Access": "Meepo",
		"Suit": "Healing",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE",
		"AbilityValues": {
			"gold_min": "5 10 15",
			"duration": 5,
			"gold_max": "40 50 60"
		}
	},
	"item_ancient_beast_heart": {
		"Note": "古兽心脏",
		"Description": "最大生命值提高%health%，但不恢复当前生命",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_ancient_beast_heart",
		"AbilityTextureName": "ancient_beast_heart",
		"RarityRange": "3|4",
		"GoldCost": "0 0 40 80",
		"AbilityValues": {
			"health": "0 0 30 60"
		},
		"Access": "Meepo",
		"Suit": "Stats",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
	"item_soul_kindling": {
		"Note": "回魂火种",
		"Description": "补充%revive_count%次复活次数",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_soul_kindling",
		"AbilityTextureName": "soul_kindling",
		"RarityRange": 4,
		"GoldCost": 150,
		"AbilityValues": {
			"revive_count": 1
		},
		"Access": "Meepo",
		"Suit": "Survive",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"item_undead_contract": {
		"Note": "不死者契书",
		"Description": "消耗%hp_cost%%生命，获得%gold%金币",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_undead_contract",
		"AbilityTextureName": "undead_contract",
		"RarityRange": "1|2|3|4|5",
		"GoldCost": 0,
		"AbilityValues": {
			"hp_cost": {
				"value": 0,
				"+health": "0.2 0.4 0.6 0.8 0.99"
			},
			"gold": "50 100 150 200 300"
		},
		"Access": "Meepo",
		"Suit": "Economy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_IMMEDIATE | DOTA_ABILITY_BEHAVIOR_NO_TARGET"
	},
	"item_fate_red_thread": {
		"Note": "命运红线",
		"Description": "下一个祝福稀有度提升",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/artifact/item_fate_red_thread",
		"AbilityTextureName": "fate_red_thread",
		"RarityRange": "2|3",
		"Quantitylimit": 1,
		"Suit": "Bless",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
	},
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
	},
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
	},
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
	},
	"item_suit_zeus": {
		"Note": "$zeus",
		"Suit": "Zeus",
		"AbilityTextureName": "zuus_static_field_alt1",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_zeus",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_lightning_damage_amplify": {
				"value": "15 30 45 60",
				"*zeus_suit_effect_boost": 1
			}
		}
	},
	"item_suit_crit": {
		"Note": "$crit",
		"Suit": "Crit",
		"AbilityTextureName": "juggernaut/bladekeeper/juggernaut_healing_ward",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_crit",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_crit_chance": {
				"value": "2 3 4 5",
				"*crit_suit_effect_boost": 1
			},
			"item_crit_damage": {
				"value": "20 30 40 50",
				"*crit_suit_effect_boost": 1
			}
		}
	},
	"item_suit_holy": {
		"Note": "$holy",
		"Suit": "Holy",
		"AbilityTextureName": "ringmaster_spotlight",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_holy",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_damage_reduction": {
				"value": "5 10 15 20",
				"*holy_suit_effect_boost": 1
			}
		}
	},
	"item_suit_poison": {
		"Note": "$poison",
		"Suit": "Poison",
		"AbilityTextureName": "venomancer_poison_nova",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_poison",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_poison_damage_amplify": {
				"value": "25 50 75 100",
				"*poison_suit_effect_boost": 1
			}
		}
	},
	"item_suit_ice": {
		"Note": "$ice",
		"Suit": "Ice",
		"AbilityTextureName": "crystal_maiden_brilliance_aura_persona",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_ice",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_health_amplify": {
				"value": "20 40 60 80",
				"*ice_suit_effect_boost": 1
			}
		}
	},
	"item_suit_bleed": {
		"Note": "$bleed",
		"Suit": "Bleed",
		"AbilityTextureName": "grimstroke_ink_creature",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_bleed",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_bleed_damage_amplify": {
				"value": "20 40 60 80",
				"*bleed_suit_effect_boost": 1
			}
		}
	},
	"item_suit_wind": {
		"Note": "$wind",
		"Suit": "Wind",
		"AbilityTextureName": "brewmaster_storm_wind_walk",
		"BaseClass": "item_lua",
		"ScriptFile": "abilities/bless_set_bonus/item_suit_wind",
		"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_HIDDEN",
		"Access": "BlessSuit",
		"AbilityValues": {
			"item_movespeed": {
				"value": "20 40 60 80",
				"*wind_suit_effect_boost": 1
			}
		}
	},
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