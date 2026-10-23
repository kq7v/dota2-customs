--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().artifact = {
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
	}
};