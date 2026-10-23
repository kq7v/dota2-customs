--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_lifesteal_custom", "abilities/items/item_lifesteal_custom", LUA_MODIFIER_MOTION_NONE)

item_lifesteal_custom = class({})

function item_lifesteal_custom:GetIntrinsicModifierName()
	return "modifier_item_lifesteal_custom"
end

function item_lifesteal_custom:Spawn()
	self.lifesteal_percent = self:GetSpecialValueFor("lifesteal_percent") / 100
end

modifier_item_lifesteal_custom = class(mod_hidden)
function modifier_item_lifesteal_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_lifesteal_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { type = 2, value = self.ability.lifesteal_percent })
end