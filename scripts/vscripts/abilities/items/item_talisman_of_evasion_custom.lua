--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_talisman_of_evasion_custom_passive",
	"abilities/items/item_talisman_of_evasion_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_talisman_of_evasion_custom = class({})

function item_talisman_of_evasion_custom:GetIntrinsicModifierName()
	return "modifier_item_talisman_of_evasion_custom_passive"
end

function item_talisman_of_evasion_custom:Spawn()
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.bonus_evasion = self:GetSpecialValueFor("bonus_evasion")
end

modifier_item_talisman_of_evasion_custom_passive = class(mod_hidden)
function modifier_item_talisman_of_evasion_custom_passive:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_talisman_of_evasion_custom_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_item_talisman_of_evasion_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EVASION_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_talisman_of_evasion_custom_passive:GetModifierEvasion_Constant()
	return self.ability.bonus_evasion
end

function modifier_item_talisman_of_evasion_custom_passive:GetModifierHealthBonus()
	return self.ability.bonus_health
end