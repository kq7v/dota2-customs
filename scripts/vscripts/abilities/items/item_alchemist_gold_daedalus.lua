--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_alchemist_gold_daedalus",
	"abilities/items/item_alchemist_gold_daedalus",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_alchemist_gold_daedalus_debuff",
	"abilities/items/item_alchemist_gold_daedalus",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_alchemist_gold_daedalus_bonus",
	"abilities/items/item_alchemist_gold_daedalus",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_alchemist_gold_daedalus_leash",
	"abilities/items/item_alchemist_gold_daedalus",
	LUA_MODIFIER_MOTION_NONE
)

item_alchemist_gold_daedalus = class({})

function item_alchemist_gold_daedalus:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/celestial_spear_proj.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/dragon_knight/dk_persona/dk_persona_dragon_tail_dragon_form_proj_impact.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_disarm_coil.vpcf", context)
	PrecacheResource("particle", "particles/items/celestial_spear_leash.vpcf", context)
end

function item_alchemist_gold_daedalus:GetIntrinsicModifierName()
	return "modifier_item_alchemist_gold_daedalus"
end

function item_alchemist_gold_daedalus:Spawn()
	self.projectile_speed = self:GetSpecialValueFor("projectile_speed")
	self.bonus_duration = self:GetSpecialValueFor("bonus_duration")
	self.leash_duration = self:GetSpecialValueFor("leash_duration")
	self.bonus_speed = self:GetSpecialValueFor("bonus_speed")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.crit_chance = self:GetSpecialValueFor("crit_chance")
	self.chance_bonus = self:GetSpecialValueFor("chance_bonus")
	self.crit_multiplier = self:GetSpecialValueFor("crit_multiplier")
	self.corruption_duration = self:GetSpecialValueFor("corruption_duration")
	self.corruption_armor = self:GetSpecialValueFor("corruption_armor")
	self.crit_armor = self:GetSpecialValueFor("crit_armor")
	self.break_radius = self:GetSpecialValueFor("break_radius")
end

function item_alchemist_gold_daedalus:OnSpellStart()
	local caster = self:GetCaster()
	local target = self:GetCursorTarget()

	local projectile = {
		Target = target,
		Source = caster,
		Ability = self,
		EffectName = "particles/items/celestial_spear_proj.vpcf",
		iMoveSpeed = self.projectile_speed,
		vSourceLoc = caster:GetAbsOrigin(),
		bDodgeable = true,
		bProvidesVision = false,
	}

	caster:AddNewModifier(
		caster,
		self,
		"modifier_item_alchemist_gold_daedalus_bonus",
		{ duration = self.bonus_duration }
	)

	local hProjectile = ProjectileManager:CreateTrackingProjectile(projectile)
	caster:EmitSound("Celestial_spear.Cast")
end

function item_alchemist_gold_daedalus:OnProjectileHit(hTarget, vLocation)
	if not hTarget then
		return
	end
	if not IsServer() then
		return
	end
	if hTarget:TriggerSpellAbsorb(self) then
		return
	end
	local caster = self:GetCaster()

	local hit_effect = ParticleManager:CreateParticle(
		"particles/econ/items/dragon_knight/dk_persona/dk_persona_dragon_tail_dragon_form_proj_impact.vpcf",
		PATTACH_CUSTOMORIGIN,
		hTarget
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		hTarget,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		hTarget:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		hTarget,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		hTarget:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		3,
		hTarget,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		hTarget:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
		hTarget
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		hTarget,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		hTarget:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		hTarget,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		hTarget:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	hTarget:EmitSound("Items.Spear_hit")
	hTarget:EmitSound("Item.StarEmblem.Enemy")

	hTarget:AddNewModifier(
		caster,
		self,
		"modifier_item_alchemist_gold_daedalus_leash",
		{ duration = self.leash_duration * (1 - hTarget:GetStatusResistance()) }
	)
end

modifier_item_alchemist_gold_daedalus = class(mod_hidden)
function modifier_item_alchemist_gold_daedalus:RemoveOnDeath()
	return false
end
function modifier_item_alchemist_gold_daedalus:GetCritDamage()
	return self.crit_multiplier
end
function modifier_item_alchemist_gold_daedalus:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.bonus_speed = self.ability.bonus_speed
	self.bonus_damage = self.ability.bonus_damage
	self.bonus_health = self.ability.bonus_health

	self.crit_chance = self.ability.crit_chance
	self.bonus_chance = self.ability.chance_bonus
	self.crit_multiplier = self.ability.crit_multiplier
	self.corruption_duration = self.ability.corruption_duration
	self.record = nil
end

function modifier_item_alchemist_gold_daedalus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_item_alchemist_gold_daedalus:GetModifierHealthBonus()
	return self.bonus_health
end

function modifier_item_alchemist_gold_daedalus:GetModifierAttackSpeedBonus_Constant()
	return self.bonus_speed
end

function modifier_item_alchemist_gold_daedalus:GetModifierPreAttack_BonusDamage()
	return self.bonus_damage
end

function modifier_item_alchemist_gold_daedalus:GetModifierProcAttack_Feedback(params)
	if params.attacker ~= self.parent then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if
		self.parent:HasModifier("modifier_item_celestial_spear_custom")
		or self.parent:HasModifier("modifier_item_desolator_custom")
	then
		return
	end

	local target = params.target

	target:AddNewModifier(
		self.parent,
		self.parent:BkbAbility(self.ability, true),
		"modifier_item_alchemist_gold_daedalus_debuff",
		{ duration = self.corruption_duration }
	)
	target:EmitSound("Item_Desolator.Target")

	local mod = target:FindModifierByName("modifier_item_alchemist_gold_daedalus_debuff")
	if not mod then
		return
	end
	if params.record ~= self.record then
		return
	end
	target:EmitSound("DOTA_Item.Daedelus.Crit")
	mod:IncrementStackCount()
end

function modifier_item_alchemist_gold_daedalus:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end

	local random = RollPseudoRandomPercentage(self:GetCritChance(), 109, self.parent)
	if not random then
		return
	end

	self.record = params.record
	return self:GetCritDamage()
end

function modifier_item_alchemist_gold_daedalus:GetCritChance()
	return self.crit_chance
		+ (self.parent:HasModifier("modifier_item_alchemist_gold_daedalus_bonus") and self.bonus_chance or 0)
end

modifier_item_alchemist_gold_daedalus_debuff = class(mod_visible)
function modifier_item_alchemist_gold_daedalus_debuff:GetTexture()
	return "items/gold_crit"
end
function modifier_item_alchemist_gold_daedalus_debuff:OnCreated()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	self.ability = self.caster:FindItemInInventory("item_alchemist_gold_daedalus")
	if not self.ability or self.ability:IsNull() then
		return
	end

	self.corruption_armor = self.ability.corruption_armor
	self.crit_armor = self.ability.crit_armor

	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()
end

function modifier_item_alchemist_gold_daedalus_debuff:AddCustomTransmitterData()
	return {
		corruption_armor = self.corruption_armor,
		crit_armor = self.crit_armor,
	}
end

function modifier_item_alchemist_gold_daedalus_debuff:HandleCustomTransmitterData(data)
	self.corruption_armor = data.corruption_armor
	self.crit_armor = data.crit_armor
end

function modifier_item_alchemist_gold_daedalus_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_item_alchemist_gold_daedalus_debuff:GetModifierPhysicalArmorBonus()
	return (self.corruption_armor + self:GetStackCount() * self.crit_armor) * -1
end

modifier_item_alchemist_gold_daedalus_leash = class(mod_hidden)
function modifier_item_alchemist_gold_daedalus_leash:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.RemoveForDuel = true
	self.center = self.parent:GetAbsOrigin()
		- (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized() * 60

	self.effect_cast =
		ParticleManager:CreateParticle("particles/huskar/huskar_disarm_coil.vpcf", PATTACH_WORLDORIGIN, self.parent)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.center)
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self.break_radius = self.ability.break_radius

	local effect_cast_2 =
		ParticleManager:CreateParticle("particles/items/celestial_spear_leash.vpcf", PATTACH_ABSORIGIN, self.parent)
	ParticleManager:SetParticleControl(effect_cast_2, 0, self.center)
	ParticleManager:SetParticleControlEnt(
		effect_cast_2,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(effect_cast_2, false, false, -1, false, false)

	self:StartIntervalThink(FrameTime())
end

function modifier_item_alchemist_gold_daedalus_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

function modifier_item_alchemist_gold_daedalus_leash:OnIntervalThink()
	if not IsServer() then
		return
	end
	if (self.parent:GetAbsOrigin() - self.center):Length2D() <= self.break_radius then
		return
	end

	local direction = self.parent:GetOrigin() - self.center
	direction.z = 0
	direction = direction:Normalized()

	local center = self.parent:GetAbsOrigin() + direction * 10

	local knockbackProperties = {
		center_x = center.x,
		center_y = center.y,
		center_z = center.z,
		duration = 0.2,
		knockback_duration = 0.2,
		knockback_distance = (self.parent:GetOrigin() - self.center):Length2D(),
		knockback_height = 0,
		isStun = true,
	}
	self.parent:AddNewModifier(self.caster, self.ability, "modifier_knockback", knockbackProperties)

	self.parent:EmitSound("Celestial_spear.Break")
	self:Destroy()
end

modifier_item_alchemist_gold_daedalus_bonus = class(mod_visible)