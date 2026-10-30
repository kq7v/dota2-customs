--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/skin/modifier_5100079"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = b.__TS__SourceMapTraceBack
f(
	debug.getinfo(1).short_src,
	{
		["8"] = 1,
		["9"] = 1,
		["10"] = 1,
		["11"] = 3,
		["12"] = 4,
		["13"] = 5,
		["14"] = 6,
		["15"] = 7,
		["16"] = 8,
		["20"] = 14,
		["21"] = 22,
		["22"] = 14,
		["23"] = 22,
		["24"] = 23,
		["25"] = 24,
		["26"] = 25,
		["27"] = 26,
		["28"] = 27,
		["29"] = 23,
		["30"] = 29,
		["31"] = 30,
		["32"] = 31,
		["33"] = 32,
		["34"] = 33,
		["35"] = 29,
		["36"] = 22,
		["37"] = 14,
		["38"] = 14,
		["39"] = 14,
		["40"] = 14,
		["41"] = 14,
		["42"] = 14,
		["43"] = 14,
		["44"] = 14,
		["45"] = 22,
		["47"] = 22,
	}
)
local g = {}
local h = require("modifiers.eom_modifier")
local i = h.EOMModifier
local j = h.registerEOMModifier
local k = "particles/units/heroes/hero_bristleback/bristleback_quill_spray.vpcf"
local l = "models/eom/hero/bristleback_1/particles/bristleback_1_back_skill_fx.vpcf"
local m = "particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo_debuff.vpcf"
local n = "models/eom/hero/bristleback_1/particles/bristleback_1_skill2_debuff_fx.vpcf"
local o = "particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo.vpcf"
local p = "models/eom/hero/bristleback_1/particles/bristleback_1_skill2_fx.vpcf"
g.modifier_5100079 = c()
local q = g.modifier_5100079
q.name = "modifier_5100079"
d(q, i)
function q.prototype.OnCreated(self, r)
	local s = self:GetParent()
	Wearable:registerParticleModifier(s, k, l)
	Wearable:registerParticleModifier(s, m, n)
	Wearable:registerParticleModifier(s, o, p)
end
function q.prototype.OnDestroy(self)
	local s = self:GetParent()
	Wearable:unregisterParticleModifier(s, k)
	Wearable:unregisterParticleModifier(s, m)
	Wearable:unregisterParticleModifier(s, o)
end
q = e(
	{
		j(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				RemoveOnDeath = false,
				AllowIllusionDuplicate = false,
			}
		),
	},
	q
)
g.modifier_5100079 = q
return g