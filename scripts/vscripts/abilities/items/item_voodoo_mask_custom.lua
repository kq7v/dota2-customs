--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_voodoo_mask_custom", "abilities/items/item_voodoo_mask_custom", LUA_MODIFIER_MOTION_NONE)

item_voodoo_mask_custom = class({})

function item_voodoo_mask_custom:GetIntrinsicModifierName()
	return "modifier_item_voodoo_mask_custom"
end

function item_voodoo_mask_custom:Spawn()
	self.spell_lifesteal = self:GetSpecialValueFor("spell_lifesteal") / 100
end

modifier_item_voodoo_mask_custom = class(mod_hidden)
function modifier_item_voodoo_mask_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_voodoo_mask_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { type = 1, value = self.ability.spell_lifesteal })
end