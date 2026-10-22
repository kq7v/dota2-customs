--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/artifact/item_undead_contract"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_undead_contract"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	local l = self:GetSpecialValueFor("hp_cost")
	local m = self:GetSpecialValueFor("gold")
	k:Heal(-l, self)
	Player:ModifyGold(k:GetPlayerOwnerID(), m)
	k:RemoveItem(self)
	local n = ParticleManager:CreateParticle(
		"particles/econ/items/doom/doom_ti8_immortal_arms/doom_ti8_immortal_devour.vpcf",
		PATTACH_ABSORIGIN,
		k
	)
	ParticleManager:SetParticleControlEnt(n, 1, k, PATTACH_POINT_FOLLOW, "attach_hitloc", k:GetAbsOrigin(), true)
	ParticleManager:ReleaseParticleIndex(n)
	k:EmitSound("Hero_DoomBringer.Pick")
end
j = e({ i(nil) }, j)
return f