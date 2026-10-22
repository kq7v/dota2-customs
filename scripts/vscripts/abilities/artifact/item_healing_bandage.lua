--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/artifact/item_healing_bandage"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_healing_bandage"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	k:Heal(self:GetSpecialValueFor("heal_amount"), self)
	k:RemoveItem(self)
	local l = ParticleManager:CreateParticle(
		"particles/econ/events/seasonal_reward_line_summer_2026/radiant_fountain_regen_summerrewardline_2026_health_initial_cough.vpcf",
		PATTACH_ABSORIGIN,
		k
	)
	ParticleManager:ReleaseParticleIndex(l)
	k:EmitSound("Hero_Oracle.FalsePromise.Healed")
end
j = e({ i(nil) }, j)
return f