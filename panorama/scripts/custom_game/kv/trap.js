--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().trap = {
	"laser_unit": {
		"BaseClass": "npc_dota_creature",
		"Model": "models/development/invisiblebox.vmdl",
		"ModelScale": 1,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 380,
		"MovementTurnRate": 1,
		"RingRadius": 0,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"StatusHealth": 1,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"VisionDaytimeRange": 0,
		"VisionNighttimeRange": 0,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL"
	},
	"cutter_saw": {
		"BaseClass": "npc_dota_creature",
		"Model": "models/eom/props/sm_trap/trap_cutter_saw.vmdl",
		"ModelScale": 1,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"MovementSpeed": 150,
		"MovementTurnRate": 1,
		"RingRadius": 0,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"StatusHealth": 1,
		"StatusHealthRegen": 0,
		"StatusMana": 0,
		"StatusManaRegen": 0,
		"VisionDaytimeRange": 0,
		"VisionNighttimeRange": 0,
		"BoundsHullName": "DOTA_HULL_SIZE_SMALL"
	}
};