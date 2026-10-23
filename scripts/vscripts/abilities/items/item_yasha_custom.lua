--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_yasha_custom", "abilities/items/item_yasha_custom", LUA_MODIFIER_MOTION_NONE)

item_yasha_custom = class({})

function item_yasha_custom:GetIntrinsicModifierName()
	return "modifier_item_yasha_custom"
end

function item_yasha_custom:Spawn()
	self.bonus_agility = self:GetSpecialValueFor("bonus_agility")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.movement_speed_percent_bonus = self:GetSpecialValueFor("movement_speed_percent_bonus")
end

modifier_item_yasha_custom = class(mod_hidden)
function modifier_item_yasha_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_yasha_custom:GetUniqueStat()
	return self.move
end
function modifier_item_yasha_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.agi = self.ability.bonus_agility
	self.attack_speed = self.ability.bonus_attack_speed
	self.move = self.ability.movement_speed_percent_bonus
	self.parent:AddUniqueStat(self, "move_bonus")
end

function modifier_item_yasha_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE_UNIQUE,
	}
end

function modifier_item_yasha_custom:GetModifierBonusStats_Agility()
	return self.agi
end

function modifier_item_yasha_custom:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed
end

function modifier_item_yasha_custom:GetModifierMoveSpeedBonus_Percentage_Unique()
	return self.parent:UniqueStat(self, "move_bonus")
end