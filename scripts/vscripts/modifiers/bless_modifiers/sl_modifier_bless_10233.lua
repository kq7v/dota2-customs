--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10233.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10233.lua",
	{
		["10"] = "1:1",
		["11"] = "1:10",
		["12"] = "2:1",
		["13"] = "2:10",
		["14"] = "4:1",
		["15"] = "5:14",
		["16"] = "4:1",
		["17"] = "5:48",
		["18"] = "6:5",
		["19"] = "7:9",
		["20"] = "6:5",
		["21"] = "10:5",
		["22"] = "11:9",
		["23"] = "10:5",
		["24"] = "14:5",
		["25"] = "15:9",
		["26"] = "14:5",
		["27"] = "18:5",
		["28"] = "19:9",
		["29"] = "18:5",
		["30"] = "5:14",
		["31"] = "4:2",
		["32"] = "4:2",
		["33"] = "4:19",
		["34"] = "4:2",
		["36"] = "4:2",
		["37"] = "5:14",
		["39"] = "5:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
____exports.sl_modifier_bless_10233_invisible = __TS__Class()
local sl_modifier_bless_10233_invisible = ____exports.sl_modifier_bless_10233_invisible
sl_modifier_bless_10233_invisible.name = "sl_modifier_bless_10233_invisible"
__TS__ClassExtends(sl_modifier_bless_10233_invisible, SLModifierBase)
function sl_modifier_bless_10233_invisible.prototype.RemoveOnDeath(self)
	return true
end
function sl_modifier_bless_10233_invisible.prototype.CheckState(self)
	return { [MODIFIER_STATE_INVISIBLE] = true }
end
function sl_modifier_bless_10233_invisible.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_INVISIBILITY_LEVEL }
end
function sl_modifier_bless_10233_invisible.prototype.GetModifierInvisibilityLevel(self)
	return 1
end
sl_modifier_bless_10233_invisible = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10233", nil, getfenv()) },
	sl_modifier_bless_10233_invisible
)
____exports.sl_modifier_bless_10233_invisible = sl_modifier_bless_10233_invisible
return ____exports