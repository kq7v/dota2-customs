--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/game_modifiers/_loader.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
____debugRuntime.register(
	"modifiers/game_modifiers/_loader.lua",
	{
		["7"] = "1:8",
		["8"] = "2:8",
		["9"] = "3:8",
		["10"] = "4:8",
		["11"] = "5:8",
		["12"] = "6:8",
		["13"] = "7:8",
		["14"] = "8:8",
		["15"] = "9:8",
		["16"] = "10:8",
		["17"] = "11:8",
	}
)
local ____exports = {}
require("modifiers.game_modifiers.sl_modifier_mid_mode")
require("modifiers.game_modifiers.sl_modifier_game_over")
require("modifiers.game_modifiers.sl_modifier_ability_amp")
require("modifiers.game_modifiers.sl_modifier_global_thinker")
require("modifiers.game_modifiers.sl_modifier_custom_immune_death")
require("modifiers.game_modifiers.sl_modifier_custom_attr")
require("modifiers.game_modifiers.sl_modifier_override_attack")
require("modifiers.game_modifiers.sl_modifier_simple")
require("modifiers.game_modifiers.sl_modifier_fountain_hurt")
require("modifiers.game_modifiers.sl_modifier_original_ability_map_modify")
require("modifiers.game_modifiers.sl_modifier_custom_knockback")
return ____exports