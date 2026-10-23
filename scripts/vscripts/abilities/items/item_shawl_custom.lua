--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_shawl_custom", "abilities/items/item_shawl_custom", LUA_MODIFIER_MOTION_NONE)

item_shawl_custom = class({})

function item_shawl_custom:GetIntrinsicModifierName()
	return "modifier_item_shawl_custom"
end

function item_shawl_custom:Spawn()
	self.bonus_magical_armor = self:GetSpecialValueFor("bonus_magical_armor")
end

modifier_item_shawl_custom = class(mod_hidden)
function modifier_item_shawl_custom:RemoveOnDeath()
	return false
end
function modifier_item_shawl_custom:GetUniqueStat()
	return self.resist
end
function modifier_item_shawl_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.resist = self.ability.bonus_magical_armor
	self.parent:AddUniqueStat(self, "magic_resist")
end

function modifier_item_shawl_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_item_shawl_custom:GetModifierMagicalResistanceBonus()
	return self.parent:UniqueStat(self, "magic_resist")
end