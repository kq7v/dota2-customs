--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().interact = {
	"npc_portal": {
		"Name": "传送门",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_invulnerable",
		"Model": "models/props_gameplay/team_portal/team_portal.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"bonus_god_zues": {
		"Name": "雷神雕像",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_god_zues",
		"Model": "models/heroes/zeus/zeus_arcana.vmdl",
		"ModelScale": 3,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER",
		"Creature": {
			"AttachWearables": {
				"1": {
					"ItemDef": 9052
				},
				"2": {
					"ItemDef": 9037
				},
				"3": {
					"ItemDef": 9038
				},
				"4": {
					"ItemDef": 9039
				}
			}
		}
	},
	"bonus_god_ice": {
		"Name": "冰神雕像",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_god_ice",
		"Model": "models/heroes/crystal_maiden/crystal_maiden_arcana.vmdl",
		"ModelScale": 3,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER",
		"Creature": {
			"AttachWearables": {
				"1": {
					"ItemDef": 7385
				},
				"2": {
					"ItemDef": 13532
				},
				"3": {
					"ItemDef": 9205
				},
				"4": {
					"ItemDef": 6686
				}
			}
		}
	},
	"bonus_god_fire": {
		"Name": "火神雕像",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_god_fire",
		"Model": "models/heroes/lina/lina.vmdl",
		"ModelScale": 3,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER",
		"Creature": {
			"AttachWearables": {
				"1": {
					"ItemDef": 14247
				},
				"2": {
					"ItemDef": 14248
				},
				"3": {
					"ItemDef": 14250
				},
				"4": {
					"ItemDef": 14251
				}
			}
		}
	},
	"bonus_god_earth": {
		"Name": "大地神雕像",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_god_earth",
		"Model": "models/items/earthshaker/earthshaker_arcana/earthshaker_arcana.vmdl",
		"ModelScale": 3,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER",
		"Creature": {
			"AttachWearables": {
				"1": {
					"ItemDef": 7293
				},
				"2": {
					"ItemDef": 12969
				},
				"3": {
					"ItemDef": 12692
				}
			}
		}
	},
	"bonus_god_blade": {
		"Name": "剑神雕像",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_god_blade",
		"Model": "models/heroes/juggernaut/juggernaut_arcana.vmdl",
		"ModelScale": 3,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER",
		"Creature": {
			"AttachWearables": {
				"1": {
					"ItemDef": 14955
				},
				"2": {
					"ItemDef": 14956
				},
				"3": {
					"ItemDef": 14957
				},
				"4": {
					"ItemDef": 14958
				},
				"5": {
					"ItemDef": 14959
				}
			}
		}
	},
	"bonus_god_wind": {
		"Name": "风神雕像",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_god_wind",
		"Model": "models/items/windrunner/windrunner_arcana/wr_arcana_debut_style1.vmdl",
		"ModelScale": 3,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 2000,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"bonus_chest_normal": {
		"Name": "普通宝箱",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_chest_normal",
		"Model": "models/props_generic/chest_treasure_02.vmdl",
		"ModelScale": 1.5,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 2000,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_HUGE"
	},
	"bonus_chest_gold": {
		"Name": "黄金宝箱",
		"skin": 1,
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_chest_gold",
		"Model": "models/props_generic/chest_treasure_02.vmdl",
		"ModelScale": 2,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_HUGE"
	},
	"bonus_outpost": {
		"Name": "哨塔",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_outpost",
		"Model": "models/props_structures/outpost.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"bonus_chest_beetlejaws": {
		"Name": "咬人箱",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_chest_beetlejaws",
		"Model": "models/creeps/beetlejaws/mesh/beetlejaws.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_REGULAR"
	},
	"bonus_smithy": {
		"Name": "铁匠铺",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_bonus_smithy",
		"Model": "models/props_gameplay/shopkeeper_fountain/shopkeeper_fountain.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_REGULAR"
	},
	"interact_wishing_pool": {
		"Name": "许愿池",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_interact_wishing_pool",
		"Model": "models/props_gameplay/fountain_of_life/fountain_of_life.vmdl",
		"ModelScale": 0.8,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"interact_book": {
		"Name": "贤者之书",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_interact_book",
		"Model": "models/items/courier/bookwyrm/bookwyrm.vmdl",
		"ModelScale": 1.4,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"interact_regen_well": {
		"Name": "回复水井",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_interact_regen_well",
		"Model": "models/props_structures/old_well.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"interact_shop_refresh": {
		"Name": "商店刷新",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_no_health_bar",
		"Model": "models/eom/props/shop/refresh_sign.vmdl",
		"ModelScale": 1.5,
		"MovementCapabilities": "DOTA_UNIT_CAP_MOVE_GROUND",
		"StatusHealth": 100,
		"StatusHealthRegen": 0,
		"StatusMana": 100,
		"StatusManaRegen": 0,
		"AttackDamageMin": 0,
		"AttackDamageMax": 0,
		"AttackRate": 1.7,
		"AttackCapabilities": "DOTA_UNIT_CAP_NO_ATTACK",
		"BoundsHullName": "DOTA_HULL_SIZE_REGULAR"
	},
	"interact_blade_spirit": {
		"Name": "君王剑",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_spawn_interact_regen_well",
		"Model": "models/props_structures/old_well.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_TOWER"
	},
	"interact_meepo": {
		"Name": "游商",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_no_health_bar",
		"Model": "models/props_gameplay/npc/shopkeeper_the_lost_meepo/shopkeeper_the_lost_meepo.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_REGULAR"
	},
	"interact_smithy": {
		"Name": "铁匠铺",
		"BaseClass": "npc_dota_creature",
		"SpawnModifier": "modifier_no_health_bar",
		"Model": "models/props_gameplay/shopkeeper_fountain/shopkeeper_fountain.vmdl",
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
		"BoundsHullName": "DOTA_HULL_SIZE_REGULAR"
	}
};