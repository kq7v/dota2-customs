--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_kaya_and_sange_custom",
	"abilities/items/item_kaya_and_sange_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_kaya_and_sange_custom = class({})

function item_kaya_and_sange_custom:GetIntrinsicModifierName()
	return "modifier_item_kaya_and_sange_custom"
end

function item_kaya_and_sange_custom:Spawn()
	self.bonus_str = self:GetSpecialValueFor("bonus_str")
	self.bonus_int = self:GetSpecialValueFor("bonus_int")
	self.spell_damage = self:GetSpecialValueFor("spell_damage")
	self.health_bonus = self:GetSpecialValueFor("health_bonus")
	self.regen_amp = self:GetSpecialValueFor("regen_amp")
	self.heal_amp = self:GetSpecialValueFor("heal_amp")
	self.status_bonus = self:GetSpecialValueFor("status_bonus")
	self.slow_resistance = self:GetSpecialValueFor("slow_resistance")
end

modifier_item_kaya_and_sange_custom = class(mod_hidden)
function modifier_item_kaya_and_sange_custom:GetUniqueStat(name)
	return self[name]
end
function modifier_item_kaya_and_sange_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.str = self.ability.bonus_str
	self.int = self.ability.bonus_int
	self.heal_amp = self.ability.heal_amp
	self.status_bonus = self.ability.status_bonus
	self.slow_resistance = self.ability.slow_resistance

	self.spell_amp = self.ability.spell_damage
	self.mana_regen = self.ability.regen_amp
	self.mana_health = self.ability.health_bonus / 100
	self.parent:AddUniqueStat(
		self,
		"spell_amp",
		"mana_regen",
		"mana_health",
		"heal_amp",
		"status_bonus",
		"slow_resistance"
	)
end

function modifier_item_kaya_and_sange_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_item_kaya_and_sange_custom:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_item_kaya_and_sange_custom:GetModifierBonusStats_Intellect()
	return self.int
end

function modifier_item_kaya_and_sange_custom:GetModifierSpellAmplify_Percentage()
	return self.parent:UniqueStat(self, "spell_amp")
end

function modifier_item_kaya_and_sange_custom:GetModifierStatusResistanceStacking()
	return self.parent:UniqueStat(self, "status_bonus")
end

function modifier_item_kaya_and_sange_custom:GetModifierMPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "mana_regen")
end

function modifier_item_kaya_and_sange_custom:GetModifierHealthBonus()
	local bonus = self.parent:UniqueStat(self, "mana_health")
	if not bonus then
		return
	end
	return bonus * self.parent:GetMaxMana()
end

function modifier_item_kaya_and_sange_custom:GetModifierHealChange()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_kaya_and_sange_custom:GetModifierHPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "heal_amp")
end

function modifier_item_kaya_and_sange_custom:GetModifierSlowResistance_Stacking()
	return self.parent:UniqueStat(self, "slow_resistance")
end