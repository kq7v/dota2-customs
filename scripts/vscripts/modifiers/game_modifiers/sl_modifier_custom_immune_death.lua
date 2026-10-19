--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/game_modifiers/sl_modifier_custom_immune_death.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/game_modifiers/sl_modifier_custom_immune_death.lua",
	{
		["10"] = "1:1",
		["11"] = "1:10",
		["12"] = "2:1",
		["13"] = "2:10",
		["15"] = "5:1",
		["16"] = "6:14",
		["17"] = "5:1",
		["18"] = "6:46",
		["19"] = "7:5",
		["20"] = "8:9",
		["21"] = "7:5",
		["22"] = "12:5",
		["23"] = "13:14",
		["24"] = "13:26",
		["26"] = "14:15",
		["27"] = "15:14",
		["28"] = "15:73",
		["30"] = "16:14",
		["31"] = "16:85",
		["33"] = "17:9",
		["34"] = "18:13",
		["35"] = "19:13",
		["36"] = "20:13",
		["37"] = "21:13",
		["38"] = "22:13",
		["39"] = "17:56",
		["40"] = "12:5",
		["41"] = "26:5",
		["42"] = "27:14",
		["43"] = "27:26",
		["45"] = "28:15",
		["46"] = "29:14",
		["47"] = "29:63",
		["49"] = "30:14",
		["50"] = "30:85",
		["52"] = "31:9",
		["53"] = "32:13",
		["54"] = "33:13",
		["55"] = "34:13",
		["56"] = "35:13",
		["57"] = "36:13",
		["58"] = "31:61",
		["59"] = "26:5",
		["60"] = "6:14",
		["61"] = "5:2",
		["62"] = "5:2",
		["63"] = "5:19",
		["64"] = "5:2",
		["66"] = "5:2",
		["67"] = "6:14",
		["69"] = "6:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
--- 神杖保护下依次限伤、免死，再交给原生幽魂；保护离开后保留，避免光环反复进出时重复挂载。
____exports.sl_modifier_custom_immune_death = __TS__Class()
local sl_modifier_custom_immune_death = ____exports.sl_modifier_custom_immune_death
sl_modifier_custom_immune_death.name = "sl_modifier_custom_immune_death"
__TS__ClassExtends(sl_modifier_custom_immune_death, SLModifierBase)
function sl_modifier_custom_immune_death.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT, MODIFIER_PROPERTY_AVOID_DAMAGE_AFTER_REDUCTIONS }
end
function sl_modifier_custom_immune_death.prototype.GetModifierIncomingDamageConstant(self, event)
	if not IsServer() then
		return 0
	end
	local parent = self:GetParent()
	if not event or not IsValidAlive(parent) or event.target ~= parent then
		return 0
	end
	if not parent:HasModifier("modifier_skeleton_king_reincarnation_scepter") then
		return 0
	end
	return -SLModules.Filters:GetCustomBlockDamage({
		attacker = event.attacker,
		target = parent,
		damage = event.damage,
		damage_type = event.damage_type,
		inflictor = event.inflictor,
	})
end
function sl_modifier_custom_immune_death.prototype.GetModifierAvoidDamageAfterReductions(self, event)
	if not IsServer() then
		return 0
	end
	local parent = self:GetParent()
	if not IsValidAlive(parent) or event.target ~= parent then
		return 0
	end
	if not parent:HasModifier("modifier_skeleton_king_reincarnation_scepter") then
		return 0
	end
	return SLModules.Filters:TryCustomImmuneDeathDamage({
		attacker = event.attacker,
		target = parent,
		damage = event.damage,
		damage_type = event.damage_type,
		inflictor = event.inflictor,
	}) and 1 or 0
end
sl_modifier_custom_immune_death = __TS__Decorate(
	{ registerModifier(nil, "modifiers/game_modifiers/sl_modifier_custom_immune_death", nil, getfenv()) },
	sl_modifier_custom_immune_death
)
____exports.sl_modifier_custom_immune_death = sl_modifier_custom_immune_death
return ____exports