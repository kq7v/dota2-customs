--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().hunt_field = {
	"npc_hunt_effect_test_target": {
		"BaseClass": "npc_dota_creature",
		"Model": "models/props_gameplay/dummy/dummy_large.vmdl",
		"StatusHealth": 10000,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 0,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"BountyXP": 0,
		"UnitLabel": "HuntEffectTestTarget"
	},
	"npc_hunt_field_totem": {
		"BaseClass": "npc_dota_creature",
		"Model": "models/heroes/juggernaut/jugg_healing_ward.vmdl",
		"ModelScale": 1.5,
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 0,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"HealthBarOffset": 150,
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"BountyXP": 0,
		"SpawnModifier": "modifier_hunt_field_unit",
		"UnitLabel": "HuntFieldAuxiliary"
	},
	"npc_hunt_field_hunter": {
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/enemy/pudge/pudge.vmdl",
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 47
				},
				"2": {
					"ItemDef": 260
				},
				"3": {
					"ItemDef": 7373
				},
				"4": {
					"ItemDef": 8343
				},
				"5": {
					"ItemDef": 258
				}
			}
		},
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 100,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"BountyGoldMin": 0,
		"BountyGoldMax": 0,
		"BountyXP": 0,
		"SpawnModifier": "modifier_hunt_field_unit",
		"UnitLabel": "HuntFieldAuxiliary"
	},
	"npc_hunt_field_auxiliary": {
		"Name": "棒子",
		"Creature": {
			"DisableClumpingBehavior": 1,
			"AttachWearables": {
				"1": {
					"ItemDef": 8627
				}
			}
		},
		"BountyXP": 15,
		"BountyGoldMin": 1,
		"BountyGoldMax": 3,
		"IsAncient": 0,
		"BaseClass": "npc_dota_creature",
		"Model": "models/items/pugna/ward/nether_heart/nether_heart.vmdl",
		"ModelScale": 1.2,
		"SoundSet": "Hero_Clinkz",
		"HealthBarOffset": 200,
		"MovementSpeed": 270,
		"MovementTurnRate": 0.5,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_NONE",
		"ArmorPhysical": 0,
		"MagicalResistance": 0,
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"VisionDaytimeRange": 1800,
		"VisionNighttimeRange": 1800,
		"AttackDamageMin": 22,
		"AttackDamageMax": 22,
		"AttackRate": 5,
		"AttackAnimationPoint": 0.5,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"AttackRange": 600,
		"AttackAcquisitionRange": 1200,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL",
		"HasInventory": 0,
		"RingRadius": 60,
		"CombatClassAttack": "DOTA_COMBAT_CLASS_ATTACK_HERO",
		"CombatClassDefend": "DOTA_COMBAT_CLASS_DEFEND_HERO",
		"BehaviorTree": "range_attack"
	}
};