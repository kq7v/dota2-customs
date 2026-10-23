--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_enhancement_feverish_custom",
	"abilities/items/neutral/item_enhancement_feverish_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_enhancement_feverish_custom = class({})

function item_enhancement_feverish_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_item_enhancement_feverish_custom"
end

modifier_item_enhancement_feverish_custom = class(mod_hidden)
function modifier_item_enhancement_feverish_custom:RemoveOnDeath()
	return false
end
function modifier_item_enhancement_feverish_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self:OnRefresh()
end

function modifier_item_enhancement_feverish_custom:OnRefresh()
	self.lifesteal = self.ability:GetSpecialValueFor("lifesteal") / 100
	self.heal_bonus = self.ability:GetSpecialValueFor("heal_bonus")

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { value = self.lifesteal })
end

function modifier_item_enhancement_feverish_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_enhancement_feverish_custom:GetModifierLifestealRegenAmplify_Percentage()
	return self.heal_bonus
end

function modifier_item_enhancement_feverish_custom:GetModifierHealChange()
	return self.heal_bonus
end

function modifier_item_enhancement_feverish_custom:GetModifierHPRegenAmplify_Percentage()
	return self.heal_bonus
end