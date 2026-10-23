--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_sange_and_yasha_custom",
	"abilities/items/item_sange_and_yasha_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_sange_and_yasha_custom = class({})

function item_sange_and_yasha_custom:GetIntrinsicModifierName()
	return "modifier_item_sange_and_yasha_custom"
end

function item_sange_and_yasha_custom:Spawn()
	self.bonus_str = self:GetSpecialValueFor("bonus_str")
	self.bonus_agi = self:GetSpecialValueFor("bonus_agi")
	self.status_bonus = self:GetSpecialValueFor("status_bonus")
	self.attack_speed = self:GetSpecialValueFor("attack_speed")
	self.move_bonus = self:GetSpecialValueFor("move_bonus")
	self.heal_amp = self:GetSpecialValueFor("heal_amp")
	self.damage_bonus = self:GetSpecialValueFor("damage_bonus")
	self.slow_resistance = self:GetSpecialValueFor("slow_resistance")
end

modifier_item_sange_and_yasha_custom = class(mod_hidden)
function modifier_item_sange_and_yasha_custom:GetUniqueStat(name)
	return self[name]
end
function modifier_item_sange_and_yasha_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.str = self.ability.bonus_str
	self.agi = self.ability.bonus_agi
	self.status_bonus = self.ability.status_bonus
	self.attack_speed = self.ability.attack_speed
	self.move_bonus = self.ability.move_bonus
	self.heal_amp = self.ability.heal_amp
	self.damage_bonus = self.ability.damage_bonus
	self.slow_resistance = self.ability.slow_resistance
	self.parent:AddUniqueStat(self, "status_bonus", "move_bonus", "heal_amp", "slow_resistance")
end

function modifier_item_sange_and_yasha_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_item_sange_and_yasha_custom:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_item_sange_and_yasha_custom:GetModifierBonusStats_Agility()
	return self.agi
end

function modifier_item_sange_and_yasha_custom:GetModifierStatusResistanceStacking()
	return self.parent:UniqueStat(self, "status_bonus")
end

function modifier_item_sange_and_yasha_custom:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed
end

function modifier_item_sange_and_yasha_custom:GetModifierBaseDamageOutgoing_Percentage()
	return self.damage_bonus
end

function modifier_item_sange_and_yasha_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.parent:UniqueStat(self, "move_bonus")
end

function modifier_item_sange_and_yasha_custom:GetModifierSlowResistance_Stacking()
	return self.parent:UniqueStat(self, "slow_resistance")
end

function modifier_item_sange_and_yasha_custom:GetModifierHealChange()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_sange_and_yasha_custom:GetModifierHPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "heal_amp")
end