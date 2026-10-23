--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_kaya_custom", "abilities/items/item_kaya_custom", LUA_MODIFIER_MOTION_NONE)

item_kaya_custom = class({})

function item_kaya_custom:GetIntrinsicModifierName()
	return "modifier_item_kaya_custom"
end

function item_kaya_custom:Spawn()
	self.bonus_intellect = self:GetSpecialValueFor("bonus_intellect")
	self.spell_amp = self:GetSpecialValueFor("spell_amp")
	self.mana_regen_multiplier = self:GetSpecialValueFor("mana_regen_multiplier")
	self.health_bonus = self:GetSpecialValueFor("health_bonus") / 100
end

modifier_item_kaya_custom = class(mod_hidden)
function modifier_item_kaya_custom:GetUniqueStat(name)
	return self[name]
end
function modifier_item_kaya_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.spell_amp = self.ability.spell_amp
	self.mana_regen = self.ability.mana_regen_multiplier
	self.mana_health = self.ability.health_bonus
	self.parent:AddUniqueStat(self, "spell_amp", "mana_regen", "mana_health")
end

function modifier_item_kaya_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_kaya_custom:GetModifierBonusStats_Intellect()
	return self.ability.bonus_intellect
end

function modifier_item_kaya_custom:GetModifierSpellAmplify_Percentage()
	return self.parent:UniqueStat(self, "spell_amp")
end

function modifier_item_kaya_custom:GetModifierMPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "mana_regen")
end

function modifier_item_kaya_custom:GetModifierHealthBonus()
	local bonus = self.parent:UniqueStat(self, "mana_health")
	if not bonus then
		return
	end
	return bonus * self.parent:GetMaxMana()
end