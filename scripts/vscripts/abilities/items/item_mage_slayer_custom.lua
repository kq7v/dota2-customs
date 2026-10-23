--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_mage_slayer_custom", "abilities/items/item_mage_slayer_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_mage_slayer_custom_debuff",
	"abilities/items/item_mage_slayer_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_mage_slayer_custom = class({})

function item_mage_slayer_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_spell_amp_steal_debuff.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/status_effect_mage_slayer_debuff.vpcf", context)
end

function item_mage_slayer_custom:GetIntrinsicModifierName()
	return "modifier_item_mage_slayer_custom"
end

function item_mage_slayer_custom:Spawn()
	self.bonus_magical_armor = self:GetSpecialValueFor("bonus_magical_armor")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_health_regen = self:GetSpecialValueFor("bonus_health_regen")
	self.bonus_mana_regen = self:GetSpecialValueFor("bonus_mana_regen")
	self.dps = self:GetSpecialValueFor("dps")
	self.spell_amp_debuff = self:GetSpecialValueFor("spell_amp_debuff")
	self.duration = self:GetSpecialValueFor("duration")
	self.interval = self:GetSpecialValueFor("interval")
end

modifier_item_mage_slayer_custom = class(mod_hidden)
function modifier_item_mage_slayer_custom:RemoveOnDeath()
	return false
end
function modifier_item_mage_slayer_custom:GetUniqueStat()
	return self.resist
end
function modifier_item_mage_slayer_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.duration
	self.damage = self.ability.bonus_damage
	self.regen = self.ability.bonus_mana_regen
	self.health_regen = self.ability.bonus_health_regen
	self.resist = self.ability.bonus_magical_armor
	self.parent:AddUniqueStat(self, "magic_resist")

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true })
end

function modifier_item_mage_slayer_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_item_mage_slayer_custom:GetProcChance()
	return 100
end

function modifier_item_mage_slayer_custom:AttackProc(params)
	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_mage_slayer_custom_debuff",
		{ duration = self.duration }
	)
end

function modifier_item_mage_slayer_custom:GetModifierMagicalResistanceBonus()
	return self.parent:UniqueStat(self, "magic_resist")
end

function modifier_item_mage_slayer_custom:GetModifierConstantManaRegen()
	return self.regen
end

function modifier_item_mage_slayer_custom:GetModifierConstantHealthRegen()
	return self.health_regen
end

function modifier_item_mage_slayer_custom:GetModifierPreAttack_BonusDamage()
	return self.damage
end

modifier_item_mage_slayer_custom_debuff = class(mod_visible)
function modifier_item_mage_slayer_custom_debuff:IsPurgable()
	return true
end
function modifier_item_mage_slayer_custom_debuff:GetEffectName()
	return "particles/units/heroes/hero_muerta/muerta_spell_amp_steal_debuff.vpcf"
end
function modifier_item_mage_slayer_custom_debuff:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_item_mage_slayer_custom_debuff:GetStatusEffectName()
	return "particles/items3_fx/status_effect_mage_slayer_debuff.vpcf"
end
function modifier_item_mage_slayer_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_mage_slayer_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.interval = self.ability.interval
	self.amp = self.ability.spell_amp_debuff
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage = self.ability.dps * self.interval,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PHYSICAL,
	}

	if not IsServer() then
		return
	end
	self:StartIntervalThink(self.interval)
end

function modifier_item_mage_slayer_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_mage_slayer_custom_debuff:GetModifierSpellAmplify_Percentage()
	return self.amp
end

function modifier_item_mage_slayer_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster, self.ability) then
		return
	end
	DoDamage(self.damageTable)
end