--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_skadi_custom", "abilities/items/item_skadi_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_skadi_custom_debuff", "abilities/items/item_skadi_custom", LUA_MODIFIER_MOTION_NONE)

item_skadi_custom = class({})

function item_skadi_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "item_skadi", self)
end

function item_skadi_custom:GetIntrinsicModifierName()
	return "modifier_item_skadi_custom"
end

function item_skadi_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/status_fx/status_effect_frost_lich.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/skadi_projectile.vpcf", context)
end

function item_skadi_custom:Spawn()
	self.bonus_all_stats = self:GetSpecialValueFor("bonus_all_stats")
	self.cold_duration = self:GetSpecialValueFor("cold_duration")
	self.cold_attack_slow = self:GetSpecialValueFor("cold_attack_slow")
	self.cold_slow_ranged = self:GetSpecialValueFor("cold_slow_ranged")
	self.cold_slow_melee = self:GetSpecialValueFor("cold_slow_melee")
	self.heal_reduction = self:GetSpecialValueFor("heal_reduction")
end

modifier_item_skadi_custom = class(mod_hidden)
function modifier_item_skadi_custom:RemoveOnDeath()
	return false
end
function modifier_item_skadi_custom:GetPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_skadi_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.bonus_strength = self.ability.bonus_all_stats
	self.bonus_agility = self.ability.bonus_all_stats
	self.bonus_intellect = self.ability.bonus_all_stats
	self.cold_duration = self.ability.cold_duration

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddProc(self, { land = true })
end

function modifier_item_skadi_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
	}
end

function modifier_item_skadi_custom:GetModifierProjectileName()
	return wearables_system:GetParticleReplacement(self.parent, "particles/items2_fx/skadi_projectile.vpcf")
end

function modifier_item_skadi_custom:GetModifierBonusStats_Strength()
	return self.bonus_strength
end

function modifier_item_skadi_custom:GetModifierBonusStats_Agility()
	return self.bonus_agility
end

function modifier_item_skadi_custom:GetModifierBonusStats_Intellect()
	return self.bonus_intellect
end

function modifier_item_skadi_custom:GetProcChance()
	return 100
end

function modifier_item_skadi_custom:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end

	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_skadi_custom_debuff",
		{ duration = self.cold_duration }
	)
end

modifier_item_skadi_custom_debuff = class(mod_visible)
function modifier_item_skadi_custom_debuff:IsPurgable()
	return true
end
function modifier_item_skadi_custom_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost_lich.vpcf"
end
function modifier_item_skadi_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_skadi_custom_debuff:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.attack_slow = self.ability.cold_attack_slow
	self.cold_slow_ranged = self.ability.cold_slow_ranged
	self.cold_slow_melee = self.ability.cold_slow_melee
	self.heal_reduction = self.ability.heal_reduction
end

function modifier_item_skadi_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_PERCENTAGE,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_skadi_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.parent:IsRangedAttacker() and self.cold_slow_ranged or self.cold_slow_melee
end

function modifier_item_skadi_custom_debuff:GetModifierAttackSpeedPercentage()
	return self.attack_slow
end

function modifier_item_skadi_custom_debuff:GetModifierHealChange()
	return self.heal_reduction
end

function modifier_item_skadi_custom_debuff:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduction
end