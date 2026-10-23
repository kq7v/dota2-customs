--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_yasha_and_kaya_custom",
	"abilities/items/item_yasha_and_kaya_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_yasha_and_kaya_custom = class({})

function item_yasha_and_kaya_custom:GetIntrinsicModifierName()
	return "modifier_item_yasha_and_kaya_custom"
end

function item_yasha_and_kaya_custom:Spawn()
	self.bonus_agility = self:GetSpecialValueFor("bonus_agility")
	self.bonus_intellect = self:GetSpecialValueFor("bonus_intellect")
	self.spell_amp = self:GetSpecialValueFor("spell_amp")
	self.movement_speed_percent_bonus = self:GetSpecialValueFor("movement_speed_percent_bonus")
	self.mana_regen_multiplier = self:GetSpecialValueFor("mana_regen_multiplier")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.magic_damage = self:GetSpecialValueFor("magic_damage")
	self.health_bonus = self:GetSpecialValueFor("health_bonus")
end

modifier_item_yasha_and_kaya_custom = class(mod_hidden)
function modifier_item_yasha_and_kaya_custom:GetUniqueStat(name)
	return self[name]
end
function modifier_item_yasha_and_kaya_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.agi = self.ability.bonus_agility
	self.int = self.ability.bonus_intellect
	self.move_bonus = self.ability.movement_speed_percent_bonus
	self.bonus_attack_speed = self.ability.bonus_attack_speed
	self.magic_damage = self.ability.magic_damage

	self.spell_amp = self.ability.spell_amp
	self.mana_regen = self.ability.mana_regen_multiplier
	self.mana_health = self.ability.health_bonus / 100
	self.parent:AddUniqueStat(self, "spell_amp", "mana_regen", "mana_health", "move_bonus")
end

function modifier_item_yasha_and_kaya_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_yasha_and_kaya_custom:GetModifierBonusStats_Agility()
	return self.agi
end

function modifier_item_yasha_and_kaya_custom:GetModifierBonusStats_Intellect()
	return self.int
end

function modifier_item_yasha_and_kaya_custom:GetModifierAttackSpeedBonus_Constant()
	return self.bonus_attack_speed
end

function modifier_item_yasha_and_kaya_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.parent:UniqueStat(self, "move_bonus")
end

function modifier_item_yasha_and_kaya_custom:GetModifierHealthBonus()
	local bonus = self.parent:UniqueStat(self, "mana_health")
	if not bonus then
		return
	end
	return bonus * self.parent:GetMaxMana()
end

function modifier_item_yasha_and_kaya_custom:GetModifierSpellAmplify_Percentage()
	return self.parent:UniqueStat(self, "spell_amp")
end

function modifier_item_yasha_and_kaya_custom:GetModifierMPRegenAmplify_Percentage()
	return self.parent:UniqueStat(self, "mana_regen")
end

function modifier_item_yasha_and_kaya_custom:GetModifierProcAttack_BonusDamage_Magical(params)
	if not self.parent:IsRealHero() then
		return
	end
	if not params.target or not params.target:IsUnit() then
		return
	end
	return self.magic_damage
end