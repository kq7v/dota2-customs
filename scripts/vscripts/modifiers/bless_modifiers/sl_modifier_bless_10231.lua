--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10231.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10231.lua",
	{
		["10"] = "2:1",
		["11"] = "2:10",
		["12"] = "3:1",
		["13"] = "3:10",
		["15"] = "6:1",
		["16"] = "7:14",
		["17"] = "6:1",
		["18"] = "7:43",
		["20"] = "7:51",
		["21"] = "10:5",
		["22"] = "11:5",
		["23"] = "12:5",
		["24"] = "6:1",
		["25"] = "14:5",
		["26"] = "15:9",
		["27"] = "16:9",
		["28"] = "17:9",
		["29"] = "18:9",
		["30"] = "19:9",
		["31"] = "20:9",
		["32"] = "14:5",
		["33"] = "23:5",
		["34"] = "24:9",
		["35"] = "25:9",
		["36"] = "23:5",
		["37"] = "28:5",
		["38"] = "29:14",
		["41"] = "30:14",
		["42"] = "30:14",
		["43"] = "30:14",
		["45"] = "30:14",
		["46"] = "31:13",
		["49"] = "34:15",
		["50"] = "35:9",
		["51"] = "35:20",
		["52"] = "35:20",
		["53"] = "35:32",
		["55"] = "35:50",
		["57"] = "35:9",
		["58"] = "36:13",
		["59"] = "36:48",
		["61"] = "37:14",
		["63"] = "28:5",
		["64"] = "40:5",
		["65"] = "41:13",
		["68"] = "42:15",
		["69"] = "43:15",
		["70"] = "44:15",
		["71"] = "45:9",
		["72"] = "46:9",
		["73"] = "46:20",
		["74"] = "46:28",
		["75"] = "46:36",
		["76"] = "46:9",
		["77"] = "47:9",
		["78"] = "48:9",
		["79"] = "48:9",
		["80"] = "48:9",
		["81"] = "48:37",
		["82"] = "48:46",
		["83"] = "48:49",
		["84"] = "48:37",
		["85"] = "48:79",
		["86"] = "48:9",
		["88"] = "40:5",
		["89"] = "51:5",
		["90"] = "52:14",
		["93"] = "54:13",
		["95"] = "54:58",
		["96"] = "54:58",
		["97"] = "54:58",
		["99"] = "54:13",
		["101"] = "54:13",
		["102"] = "54:117",
		["104"] = "55:9",
		["105"] = "55:9",
		["106"] = "55:9",
		["108"] = "51:5",
		["109"] = "60:5",
		["110"] = "61:9",
		["111"] = "60:5",
		["112"] = "64:5",
		["113"] = "65:9",
		["114"] = "64:5",
		["115"] = "68:5",
		["116"] = "69:9",
		["117"] = "68:5",
		["118"] = "72:5",
		["119"] = "73:9",
		["120"] = "72:5",
		["121"] = "76:5",
		["122"] = "77:9",
		["123"] = "76:5",
		["124"] = "80:5",
		["125"] = "81:9",
		["126"] = "80:5",
		["127"] = "84:5",
		["128"] = "85:9",
		["129"] = "84:5",
		["130"] = "7:14",
		["131"] = "6:2",
		["132"] = "6:2",
		["133"] = "6:19",
		["134"] = "6:2",
		["136"] = "6:2",
		["137"] = "7:14",
		["139"] = "7:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
--- 独立治疗预算；0.5 秒一次，层数为尚未结算的基础治疗量，实际治疗比例回报给福佑任务。
____exports.sl_modifier_bless_10231_heal = __TS__Class()
local sl_modifier_bless_10231_heal = ____exports.sl_modifier_bless_10231_heal
sl_modifier_bless_10231_heal.name = "sl_modifier_bless_10231_heal"
__TS__ClassExtends(sl_modifier_bless_10231_heal, SLModifierBase)
function sl_modifier_bless_10231_heal.prototype.____constructor(self, ...)
	SLModifierBase.prototype.____constructor(self, ...)
	self._remaining = 0
	self._per_tick = 0
	self._end_time = 0
end
function sl_modifier_bless_10231_heal.prototype.Begin(self, source, total, duration)
	self._source = source
	self._remaining = math.max(0, total)
	self._per_tick = self._remaining * 0.5 / duration
	self._end_time = GameRules:GetGameTime() + duration
	self:SetStackCount(math.ceil(self._remaining))
	self:StartIntervalThink(math.min(0.5, duration))
end
function sl_modifier_bless_10231_heal.prototype.Cancel(self)
	self._remaining = 0
	self:Destroy()
end
function sl_modifier_bless_10231_heal.prototype.OnIntervalThink(self)
	if not IsServer() then
		return
	end
	local ____table__source_IsValid_result_0 = self._source
	if ____table__source_IsValid_result_0 ~= nil then
		____table__source_IsValid_result_0 = ____table__source_IsValid_result_0:IsValid()
	end
	if not ____table__source_IsValid_result_0 or not IsValidAlive(self:GetParent()) then
		self:Destroy()
		return
	end
	local left = self._end_time - GameRules:GetGameTime()
	local ____self__Heal_3 = self._Heal
	local ____temp_2
	if left <= 0 then
		____temp_2 = self._remaining
	else
		____temp_2 = math.min(self._remaining, self._per_tick)
	end
	____self__Heal_3(self, ____temp_2)
	if self._remaining <= 0 or left <= 0 then
		self:Destroy()
	else
		self:StartIntervalThink(math.min(0.5, left))
	end
end
function sl_modifier_bless_10231_heal.prototype._Heal(self, amount)
	if amount <= 0 then
		return
	end
	local parent = self:GetParent()
	local before = parent:GetHealth()
	local max_health = parent:GetMaxHealth()
	self._remaining = math.max(0, self._remaining - amount)
	CustomHeal(parent, amount, { source = self:GetCaster() })
	self:SetStackCount(math.ceil(math.max(0, self._remaining - 0.0001)))
	local ____table__source_OnHealApplied_result_4 = self._source
	if ____table__source_OnHealApplied_result_4 ~= nil then
		____table__source_OnHealApplied_result_4 =
			____table__source_OnHealApplied_result_4:OnHealApplied(math.max(0, parent:GetHealth() - before), max_health)
	end
end
function sl_modifier_bless_10231_heal.prototype.OnDestroy(self)
	if not IsServer() then
		return
	end
	local ____temp_8 = GameRules:GetGameTime() >= self._end_time
	if ____temp_8 then
		local ____table__source_IsValid_result_6 = self._source
		if ____table__source_IsValid_result_6 ~= nil then
			____table__source_IsValid_result_6 = ____table__source_IsValid_result_6:IsValid()
		end
		____temp_8 = ____table__source_IsValid_result_6
	end
	if ____temp_8 and IsValidAlive(self:GetParent()) then
		self:_Heal(self._remaining)
	end
	local ____table__source_OnHealEnded_result_9 = self._source
	if ____table__source_OnHealEnded_result_9 ~= nil then
		____table__source_OnHealEnded_result_9 = ____table__source_OnHealEnded_result_9:OnHealEnded(self)
	end
end
function sl_modifier_bless_10231_heal.prototype.IsHidden(self)
	return false
end
function sl_modifier_bless_10231_heal.prototype.RemoveOnDeath(self)
	return true
end
function sl_modifier_bless_10231_heal.prototype.IsPermanent(self)
	return false
end
function sl_modifier_bless_10231_heal.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10231_heal.prototype.GetTexture(self)
	return "buff/bless/10231"
end
function sl_modifier_bless_10231_heal.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_TOOLTIP }
end
function sl_modifier_bless_10231_heal.prototype.OnTooltip(self)
	return self:GetStackCount()
end
sl_modifier_bless_10231_heal = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10231", nil, getfenv()) },
	sl_modifier_bless_10231_heal
)
____exports.sl_modifier_bless_10231_heal = sl_modifier_bless_10231_heal
return ____exports