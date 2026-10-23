--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_spell_breaker", "abilities/items/item_spell_breaker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_spell_breaker_shield", "abilities/items/item_spell_breaker", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_spell_breaker_passive", "abilities/items/item_spell_breaker", LUA_MODIFIER_MOTION_NONE)

item_spell_breaker = class({})

function item_spell_breaker:GetIntrinsicModifierName()
	return "modifier_item_spell_breaker"
end

function item_spell_breaker:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/active_breaker.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_spell_amp_steal_debuff.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/status_effect_mage_slayer_debuff.vpcf", context)
end

function item_spell_breaker:Spawn()
	self.duration_active = self:GetSpecialValueFor("duration_active")
	self.duration = self:GetSpecialValueFor("duration")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_mana_regen = self:GetSpecialValueFor("bonus_mana_regen")
	self.bonus_health_regen = self:GetSpecialValueFor("bonus_health_regen")
	self.bonus_magical_armor = self:GetSpecialValueFor("bonus_magical_armor")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.resist_active = self:GetSpecialValueFor("resist_active")
	self.dps = self:GetSpecialValueFor("dps")
	self.interval = self:GetSpecialValueFor("interval")
	self.spell_amp_debuff = self:GetSpecialValueFor("spell_amp_debuff")
end

function item_spell_breaker:OnSpellStart()
	local caster = self:GetCaster()
	caster:EmitSound("Items.Spell_breaker")
	caster:AddNewModifier(caster, self, "modifier_item_spell_breaker_shield", { duration = self.duration_active })
end

modifier_item_spell_breaker = class(mod_hidden)
function modifier_item_spell_breaker:GetUniqueStat()
	return self.resist
end
function modifier_item_spell_breaker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.parent:AddProc(self, { land = true })

	self.duration = self.ability.duration
	self.damage = self.ability.bonus_damage
	self.regen = self.ability.bonus_mana_regen
	self.health_regen = self.ability.bonus_health_regen
	self.resist = self.ability.bonus_magical_armor
	self.health = self.ability.bonus_health
	self.parent:AddUniqueStat(self, "magic_resist")
end

function modifier_item_spell_breaker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_item_spell_breaker:GetProcChance()
	return 100
end

function modifier_item_spell_breaker:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end
	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_spell_breaker_passive",
		{ duration = self.duration }
	)
end

function modifier_item_spell_breaker:GetModifierMagicalResistanceBonus()
	return self.parent:UniqueStat(self, "magic_resist")
end

function modifier_item_spell_breaker:GetModifierHealthBonus()
	return self.health
end

function modifier_item_spell_breaker:GetModifierConstantManaRegen()
	return self.regen
end

function modifier_item_spell_breaker:GetModifierConstantHealthRegen()
	return self.health_regen
end

function modifier_item_spell_breaker:GetModifierPreAttack_BonusDamage()
	return self.damage
end

modifier_item_spell_breaker_shield = class(mod_visible)
function modifier_item_spell_breaker_shield:IsPurgable()
	return true
end
function modifier_item_spell_breaker_shield:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.resist_active * -1
	if not IsServer() then
		return
	end

	local particle =
		ParticleManager:CreateParticle("particles/items/active_breaker.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(particle, 1, Vector(100, 1, 1))
	self:AddParticle(particle, false, false, -1, false, false)
end

function modifier_item_spell_breaker_shield:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_item_spell_breaker_shield:GetModifierIncomingDamage_Percentage(params)
	if params.inflictor == nil then
		return
	end

	if Not_spell_damage[params.inflictor:GetName()] then
		return
	end

	return self.damage
end

function modifier_item_spell_breaker_shield:OnTooltip()
	return self.damage
end

modifier_item_spell_breaker_passive = class(mod_visible)
function modifier_item_spell_breaker_passive:GetEffectName()
	return "particles/units/heroes/hero_muerta/muerta_spell_amp_steal_debuff.vpcf"
end
function modifier_item_spell_breaker_passive:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_item_spell_breaker_passive:GetStatusEffectName()
	return "particles/items3_fx/status_effect_mage_slayer_debuff.vpcf"
end
function modifier_item_spell_breaker_passive:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_spell_breaker_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.dps = self.ability.dps
	self.interval = self.ability.interval
	self.amp = self.ability.spell_amp_debuff
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage = self.dps * self.interval,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PHYSICAL,
	}

	if not IsServer() then
		return
	end

	self:StartIntervalThink(self.interval)
end

function modifier_item_spell_breaker_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_spell_breaker_passive:GetModifierSpellAmplify_Percentage()
	if self.parent:HasModifier("modifier_item_mage_slayer_custom_debuff") then
		return
	end
	return self.amp
end

function modifier_item_spell_breaker_passive:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.caster or self.caster:IsNull() then
		return
	end
	if not self.ability or self.ability:IsNull() then
		return
	end
	DoDamage(self.damageTable)
end