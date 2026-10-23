--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().bless_excludefromrandom_readme = {
	"Note": "BOSS奖励祝福",
	"Description": "击败特定BOSS后获得的特殊祝福",
	"AbilityTextureName": "example_texture",
	"Suit": "Special",
	"RarityRange": "1|2|3|4",
	"AbilityValues": {
		"damage": "10 20 30 40"
	},
	"ScriptFile": "abilities/bless/item_special_boss_reward",
	"BaseClass": "item_lua",
	"GlobalUnique": 0,
	"ExcludeFromRandom": 1,
	"Access": "Bless",
	"AbilityBehavior": "DOTA_ABILITY_BEHAVIOR_PASSIVE"
};