--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10232.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10232.lua",
	{
		["10"] = "2:1",
		["11"] = "2:10",
		["12"] = "3:1",
		["13"] = "3:10",
		["14"] = "5:1",
		["15"] = "5:10",
		["16"] = "7:1",
		["17"] = "8:14",
		["18"] = "7:1",
		["19"] = "8:45",
		["20"] = "11:5",
		["21"] = "12:9",
		["22"] = "11:5",
		["23"] = "15:5",
		["24"] = "16:9",
		["25"] = "15:5",
		["26"] = "19:5",
		["27"] = "20:13",
		["29"] = "20:39",
		["30"] = "20:39",
		["31"] = "20:39",
		["33"] = "20:13",
		["35"] = "20:13",
		["36"] = "20:90",
		["38"] = "21:9",
		["39"] = "19:5",
		["40"] = "8:14",
		["41"] = "7:2",
		["42"] = "7:2",
		["43"] = "7:19",
		["44"] = "7:2",
		["46"] = "7:2",
		["47"] = "8:14",
		["49"] = "8:14",
		["50"] = "25:1",
		["51"] = "26:14",
		["52"] = "25:1",
		["53"] = "26:49",
		["54"] = "27:5",
		["55"] = "28:9",
		["56"] = "27:5",
		["57"] = "31:5",
		["58"] = "32:9",
		["59"] = "31:5",
		["60"] = "35:5",
		["61"] = "36:9",
		["62"] = "35:5",
		["63"] = "39:5",
		["64"] = "40:9",
		["65"] = "39:5",
		["66"] = "43:5",
		["67"] = "44:9",
		["68"] = "43:5",
		["69"] = "47:5",
		["70"] = "48:16",
		["71"] = "48:16",
		["72"] = "48:16",
		["74"] = "48:16",
		["76"] = "48:16",
		["78"] = "48:9",
		["79"] = "47:5",
		["80"] = "51:5",
		["81"] = "52:18",
		["82"] = "52:18",
		["83"] = "52:18",
		["85"] = "52:18",
		["87"] = "52:18",
		["89"] = "52:9",
		["90"] = "51:5",
		["91"] = "26:14",
		["92"] = "25:2",
		["93"] = "25:2",
		["94"] = "25:19",
		["95"] = "25:2",
		["97"] = "25:2",
		["98"] = "26:14",
		["100"] = "26:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_simple = require("modifiers.game_modifiers.sl_modifier_simple")
local sl_modifier_transmitter_data_debuff = ____sl_modifier_simple.sl_modifier_transmitter_data_debuff
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
____exports.sl_modifier_bless_10232_damage = __TS__Class()
local sl_modifier_bless_10232_damage = ____exports.sl_modifier_bless_10232_damage
sl_modifier_bless_10232_damage.name = "sl_modifier_bless_10232_damage"
__TS__ClassExtends(sl_modifier_bless_10232_damage, SLModifierBase)
function sl_modifier_bless_10232_damage.prototype.SetSource(self, source)
	self._source = source
end
function sl_modifier_bless_10232_damage.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE }
end
function sl_modifier_bless_10232_damage.prototype.GetModifierTotalDamageOutgoing_Percentage(self, event)
	local ____temp_2 = not IsServer() or not event
	if not ____temp_2 then
		local ____table__source_IsValid_result_0 = self._source
		if ____table__source_IsValid_result_0 ~= nil then
			____table__source_IsValid_result_0 = ____table__source_IsValid_result_0:IsValid()
		end
		____temp_2 = not ____table__source_IsValid_result_0
	end
	if ____temp_2 or not IsValid(event.target) then
		return 0
	end
	return self._source:GetControlledDamagePct(event.target)
end
sl_modifier_bless_10232_damage = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10232", nil, getfenv()) },
	sl_modifier_bless_10232_damage
)
____exports.sl_modifier_bless_10232_damage = sl_modifier_bless_10232_damage
____exports.sl_modifier_bless_10232_resistance = __TS__Class()
local sl_modifier_bless_10232_resistance = ____exports.sl_modifier_bless_10232_resistance
sl_modifier_bless_10232_resistance.name = "sl_modifier_bless_10232_resistance"
__TS__ClassExtends(sl_modifier_bless_10232_resistance, sl_modifier_transmitter_data_debuff)
function sl_modifier_bless_10232_resistance.prototype.IsHidden(self)
	return false
end
function sl_modifier_bless_10232_resistance.prototype.GetTexture(self)
	return "buff/bless/10232"
end
function sl_modifier_bless_10232_resistance.prototype.IsPurgable(self)
	return false
end
function sl_modifier_bless_10232_resistance.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10232_resistance.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING, MODIFIER_PROPERTY_TOOLTIP }
end
function sl_modifier_bless_10232_resistance.prototype.OnTooltip(self)
	local ____table__params_pct_3 = self._params
	if ____table__params_pct_3 ~= nil then
		____table__params_pct_3 = ____table__params_pct_3.pct
	end
	local ____table__params_pct_3_5 = ____table__params_pct_3
	if ____table__params_pct_3_5 == nil then
		____table__params_pct_3_5 = 0
	end
	return ____table__params_pct_3_5
end
function sl_modifier_bless_10232_resistance.prototype.GetModifierStatusResistanceStacking(self)
	local ____table__params_pct_6 = self._params
	if ____table__params_pct_6 ~= nil then
		____table__params_pct_6 = ____table__params_pct_6.pct
	end
	local ____table__params_pct_6_8 = ____table__params_pct_6
	if ____table__params_pct_6_8 == nil then
		____table__params_pct_6_8 = 0
	end
	return -____table__params_pct_6_8
end
sl_modifier_bless_10232_resistance = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10232", nil, getfenv()) },
	sl_modifier_bless_10232_resistance
)
____exports.sl_modifier_bless_10232_resistance = sl_modifier_bless_10232_resistance
return ____exports