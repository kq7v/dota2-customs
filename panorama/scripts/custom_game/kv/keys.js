--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().keys = {
	"key_debuff_1": {
		"Note": "怪物迅速",
		"Description": "怪物攻速和移速提高%speed_pct%%",
		"AbilityValues": {
			"speed_pct": "5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100"
		}
	},
	"key_debuff_2": {
		"Note": "boss护盾",
		"Description": "BOSS获得生命值x%shield_pct%%的护盾",
		"AbilityValues": {
			"shield_pct": "5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100"
		}
	},
	"key_debuff_3": {
		"Note": "正面减伤",
		"Description": "怪物从正面%angle%度受到的所有伤害降低%reduce_damage_pct%",
		"AbilityValues": {
			"angle": 120,
			"reduce_damage_pct": "5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100"
		}
	},
	"key_debuff_4": {
		"Note": "怪物恢复",
		"Description": "怪物每%cd%秒恢复%heal_pct%%生命值",
		"AbilityValues": {
			"cd": 3,
			"heal_pct": "0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1 1.1 1.2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 2"
		}
	}
};