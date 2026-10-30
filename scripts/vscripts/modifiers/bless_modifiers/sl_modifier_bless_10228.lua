--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10228.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10228.lua",
	{
		["10"] = "1:1",
		["11"] = "1:10",
		["12"] = "2:1",
		["13"] = "2:10",
		["15"] = "5:1",
		["16"] = "6:14",
		["17"] = "5:1",
		["18"] = "6:41",
		["19"] = "7:5",
		["20"] = "8:9",
		["21"] = "7:5",
		["22"] = "11:5",
		["23"] = "12:9",
		["24"] = "11:5",
		["25"] = "6:14",
		["26"] = "5:2",
		["27"] = "5:2",
		["28"] = "5:19",
		["29"] = "5:2",
		["31"] = "5:2",
		["32"] = "6:14",
		["34"] = "6:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
--- 剑来冷却提示，死亡保留，与福佑实例的冷却截止时间一致。
____exports.sl_modifier_bless_10228_cd = __TS__Class()
local sl_modifier_bless_10228_cd = ____exports.sl_modifier_bless_10228_cd
sl_modifier_bless_10228_cd.name = "sl_modifier_bless_10228_cd"
__TS__ClassExtends(sl_modifier_bless_10228_cd, SLModifierBase)
function sl_modifier_bless_10228_cd.prototype.IsHidden(self)
	return false
end
function sl_modifier_bless_10228_cd.prototype.GetTexture(self)
	return "buff/bless/10228"
end
sl_modifier_bless_10228_cd = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10228", nil, getfenv()) },
	sl_modifier_bless_10228_cd
)
____exports.sl_modifier_bless_10228_cd = sl_modifier_bless_10228_cd
return ____exports