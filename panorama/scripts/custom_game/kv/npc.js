--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().npc = {
	"npc_farmer": {
		"Name": "探险",
		"BaseClass": "npc_dota_creature",
		"Creature": {
			"AttachWearables": {
				"1": {
					"ItemDef": 14083
				},
				"2": {
					"ItemDef": 14110
				},
				"3": {
					"ItemDef": 14111
				},
				"4": {
					"ItemDef": 14112
				},
				"5": {
					"ItemDef": 14113
				},
				"6": {
					"ItemDef": 14114
				},
				"7": {
					"ItemDef": 14144
				}
			}
		},
		"Model": "models/heroes/furion/furion.vmdl",
		"ModelScale": 1,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALLEST"
	},
	"npc_crystal_gate": {
		"Name": "宝石副本-门",
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/props/crystal/crystal_gate/crystal_gate.vmdl",
		"ModelScale": 0.6,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALLEST"
	},
	"npc_hunt_save": {
		"Name": "保存情报",
		"BaseClass": "npc_dota_creature",
		"Model": "models/ui/treasure/mosterhunter_capsule/mosterhunter_capsule.vmdl",
		"ModelScale": 0.6,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_SMALLEST"
	}
};