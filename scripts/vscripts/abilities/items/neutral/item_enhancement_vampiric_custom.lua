--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_enhancement_vampiric_custom",
	"abilities/items/neutral/item_enhancement_vampiric_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_enhancement_vampiric_custom = class({})

function item_enhancement_vampiric_custom:GetIntrinsicModifierName()
	return "modifier_item_enhancement_vampiric_custom"
end

modifier_item_enhancement_vampiric_custom = class(mod_hidden)
function modifier_item_enhancement_vampiric_custom:RemoveOnDeath()
	return false
end
function modifier_item_enhancement_vampiric_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self:OnRefresh()
end

function modifier_item_enhancement_vampiric_custom:OnRefresh()
	self.health_regen = self.ability:GetSpecialValueFor("health_regen")
	self.lifesteal = self.ability:GetSpecialValueFor("lifesteal") / 100

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { value = self.lifesteal })
end

function modifier_item_enhancement_vampiric_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_item_enhancement_vampiric_custom:GetModifierConstantHealthRegen()
	return self.health_regen
end