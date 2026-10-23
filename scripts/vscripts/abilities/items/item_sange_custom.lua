--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_sange_custom", "abilities/items/item_sange_custom", LUA_MODIFIER_MOTION_NONE)

item_sange_custom = class({})

function item_sange_custom:GetIntrinsicModifierName()
	return "modifier_item_sange_custom"
end

function item_sange_custom:Spawn()
	self.bonus_str = self:GetSpecialValueFor("bonus_str")
	self.heal_amp = self:GetSpecialValueFor("heal_amp")
	self.slow_resistance = self:GetSpecialValueFor("slow_resistance")
end

modifier_item_sange_custom = class(mod_hidden)
function modifier_item_sange_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_sange_custom:GetUniqueStat(name)
	return self[name]
end
function modifier_item_sange_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.str = self.ability.bonus_str
	self.heal_amp = self.ability.heal_amp
	self.slow_resistance = self.ability.slow_resistance
	self.parent:AddUniqueStat(self, "heal_amp", "slow_resistance")
end

function modifier_item_sange_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_item_sange_custom:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_item_sange_custom:GetModifierHealChange()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_sange_custom:GetModifierHPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_sange_custom:GetModifierSlowResistance_Stacking()
	return self.parent:UniqueStat(self, "slow_resistance")
end