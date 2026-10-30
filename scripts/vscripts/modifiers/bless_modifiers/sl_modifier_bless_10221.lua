--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10221.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10221.lua",
	{
		["10"] = "2:1",
		["11"] = "2:10",
		["12"] = "3:1",
		["13"] = "3:10",
		["14"] = "5:1",
		["15"] = "6:14",
		["16"] = "5:1",
		["17"] = "6:38",
		["18"] = "9:5",
		["19"] = "10:9",
		["20"] = "9:5",
		["21"] = "13:5",
		["22"] = "14:9",
		["23"] = "13:5",
		["24"] = "17:5",
		["25"] = "18:14",
		["28"] = "19:9",
		["29"] = "20:15",
		["30"] = "20:65",
		["31"] = "20:26",
		["32"] = "20:131",
		["33"] = "20:26",
		["34"] = "21:9",
		["35"] = "21:26",
		["36"] = "21:36",
		["37"] = "21:43",
		["38"] = "21:51",
		["39"] = "21:54",
		["40"] = "21:61",
		["41"] = "21:9",
		["42"] = "17:5",
		["43"] = "24:5",
		["44"] = "25:9",
		["45"] = "24:5",
		["46"] = "28:5",
		["47"] = "29:14",
		["50"] = "30:15",
		["51"] = "31:15",
		["52"] = "32:14",
		["53"] = "32:14",
		["54"] = "32:14",
		["56"] = "32:14",
		["59"] = "33:15",
		["60"] = "34:9",
		["61"] = "35:9",
		["62"] = "28:5",
		["63"] = "38:5",
		["64"] = "39:13",
		["65"] = "39:25",
		["66"] = "39:25",
		["67"] = "39:25",
		["70"] = "38:5",
		["71"] = "6:14",
		["72"] = "5:2",
		["73"] = "5:2",
		["74"] = "5:19",
		["75"] = "5:2",
		["77"] = "5:2",
		["78"] = "6:14",
		["80"] = "6:14",
		["82"] = "44:1",
		["83"] = "45:14",
		["84"] = "44:1",
		["85"] = "45:46",
		["87"] = "45:54",
		["88"] = "46:5",
		["89"] = "44:1",
		["90"] = "48:5",
		["91"] = "49:9",
		["92"] = "48:5",
		["93"] = "52:5",
		["94"] = "53:9",
		["95"] = "52:5",
		["96"] = "56:5",
		["97"] = "57:9",
		["98"] = "56:5",
		["99"] = "60:5",
		["100"] = "61:13",
		["101"] = "61:25",
		["103"] = "60:5",
		["104"] = "64:5",
		["105"] = "65:9",
		["106"] = "66:9",
		["107"] = "67:9",
		["108"] = "68:9",
		["109"] = "64:5",
		["110"] = "71:5",
		["111"] = "72:9",
		["112"] = "71:5",
		["113"] = "75:5",
		["114"] = "76:9",
		["115"] = "75:5",
		["116"] = "79:5",
		["117"] = "80:9",
		["118"] = "79:5",
		["119"] = "83:5",
		["120"] = "84:9",
		["121"] = "83:5",
		["122"] = "45:14",
		["123"] = "44:2",
		["124"] = "44:2",
		["125"] = "44:19",
		["126"] = "44:2",
		["128"] = "44:2",
		["129"] = "45:14",
		["131"] = "45:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase_Debuff = ____sl_modifier_base.SLModifierBase_Debuff
____exports.sl_modifier_bless_10221 = __TS__Class()
local sl_modifier_bless_10221 = ____exports.sl_modifier_bless_10221
sl_modifier_bless_10221.name = "sl_modifier_bless_10221"
__TS__ClassExtends(sl_modifier_bless_10221, SLModifierBase_Debuff)
function sl_modifier_bless_10221.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10221.prototype.GetTexture(self)
	return "buff/bless/10221"
end
function sl_modifier_bless_10221.prototype.OnCreated(self)
	if not IsServer() then
		return
	end
	self:StartIntervalThink(1)
	local particle =
		SParticleManager:CreateGenericParticle(BLESS_PARTICLES.bless_10073, PATTACH_ABSORIGIN_FOLLOW, self:GetParent())
	self:AddParticle(particle, false, false, -1, false, false)
end
function sl_modifier_bless_10221.prototype.SetSource(self, source)
	self._source = source
end
function sl_modifier_bless_10221.prototype.OnIntervalThink(self)
	if not IsServer() then
		return
	end
	local parent = self:GetParent()
	local caster = self:GetCaster()
	local ____table__source_IsValid_result_0 = self._source
	if ____table__source_IsValid_result_0 ~= nil then
		____table__source_IsValid_result_0 = ____table__source_IsValid_result_0:IsValid()
	end
	if not ____table__source_IsValid_result_0 or not IsValidAlive(parent) or not IsValid(caster) then
		return
	end
	local damage = self._source:GetBurnDamage(parent)
	self._source:ApplyDamage({ attacker = caster, victim = parent, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL })
	SLModules.ClientData:PushNumberData(parent, damage, 6)
end
function sl_modifier_bless_10221.prototype.OnDestroy(self)
	if IsServer() then
		local ____table__source_EndBurn_result_2 = self._source
		if ____table__source_EndBurn_result_2 ~= nil then
			____table__source_EndBurn_result_2 = ____table__source_EndBurn_result_2:EndBurn(self)
		end
	end
end
sl_modifier_bless_10221 = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10221", nil, getfenv()) },
	sl_modifier_bless_10221
)
____exports.sl_modifier_bless_10221 = sl_modifier_bless_10221
--- 同一施加者的独立灼烧层汇总显示；实际伤害和驱散仍由各层负责。
____exports.sl_modifier_bless_10221_display = __TS__Class()
local sl_modifier_bless_10221_display = ____exports.sl_modifier_bless_10221_display
sl_modifier_bless_10221_display.name = "sl_modifier_bless_10221_display"
__TS__ClassExtends(sl_modifier_bless_10221_display, SLModifierBase_Debuff)
function sl_modifier_bless_10221_display.prototype.____constructor(self, ...)
	SLModifierBase_Debuff.prototype.____constructor(self, ...)
	self._damage_pct = 0
end
function sl_modifier_bless_10221_display.prototype.IsHidden(self)
	return false
end
function sl_modifier_bless_10221_display.prototype.GetTexture(self)
	return "buff/bless/10221"
end
function sl_modifier_bless_10221_display.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10221_display.prototype.OnCreated(self)
	if IsServer() then
		self:SetHasCustomTransmitterData(true)
	end
end
function sl_modifier_bless_10221_display.prototype.UpdateBurns(self, count, damage_pct, duration)
	self:SetStackCount(count)
	self:SetDuration(duration, true)
	self._damage_pct = damage_pct
	self:SendBuffRefreshToClients()
end
function sl_modifier_bless_10221_display.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_TOOLTIP }
end
function sl_modifier_bless_10221_display.prototype.OnTooltip(self)
	return self._damage_pct
end
function sl_modifier_bless_10221_display.prototype.AddCustomTransmitterData(self)
	return { damage_pct = self._damage_pct }
end
function sl_modifier_bless_10221_display.prototype.HandleCustomTransmitterData(self, data)
	self._damage_pct = data.damage_pct
end
sl_modifier_bless_10221_display = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10221", nil, getfenv()) },
	sl_modifier_bless_10221_display
)
____exports.sl_modifier_bless_10221_display = sl_modifier_bless_10221_display
return ____exports