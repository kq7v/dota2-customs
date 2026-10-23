--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().bless_set_bonus = {
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
	}
};