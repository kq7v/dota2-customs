--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_heal_shop"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_heal_shop"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	local l = self:GetSpecialValueFor("health_regen")
	k:Heal(l, self)
	local m = ParticleManager:CreateParticle("particles/items3_fx/fish_bones_active.vpcf", PATTACH_ABSORIGIN_FOLLOW, k)
	ParticleManager:ReleaseParticleIndex(m)
	k:EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0)
	Event:Fire("potion_heal", { caster = k, healAmount = l })
	k:RemoveItem(self)
end
j = e({ i(nil) }, j)
return f