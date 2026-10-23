--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_life_stealer_centaur_bash",
	"abilities/life_stealer/infest_creeps_centaur",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_centaur_retaliate",
	"abilities/life_stealer/infest_creeps_centaur",
	LUA_MODIFIER_MOTION_NONE
)

life_stealer_centaur_stun = class({})
function life_stealer_centaur_stun:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
end

function life_stealer_centaur_stun:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.stun = self:GetLevelSpecialValueFor("stun", 1)
	self.aoe = self:GetLevelSpecialValueFor("aoe", 1)
end

function life_stealer_centaur_stun:GetCastRange(vector, hTarget)
	return self.aoe or 0
end

function life_stealer_centaur_stun:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level)
		+ (self.caster.infest_ability and self.caster.infest_ability.talents.r1_cd_creep or 0)
end

function life_stealer_centaur_stun:OnAbilityPhaseStart()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_1, 1.3)
	self.caster:EmitSound("n_creep_Centaur.Stomp")
	return true
end

function life_stealer_centaur_stun:OnAbilityPhaseInterrupted()
	self.caster:StopSound("n_creep_Centaur.Stomp")
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
end

function life_stealer_centaur_stun:OnSpellStart()
	local damage = self:GetSpecialValueFor("damage_base")
		+ self:GetSpecialValueFor("damage") * self.caster:GetMaxHealth() / 100

	local trail_pfx = ParticleManager:CreateParticle(
		"particles/neutral_fx/neutral_centaur_khan_war_stomp.vpcf",
		PATTACH_ABSORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(trail_pfx, 1, Vector(self.aoe, self.aoe, self.aoe))
	ParticleManager:ReleaseParticleIndex(trail_pfx)

	local damageTable = { attacker = self.caster, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }

	for _, target in pairs(self.caster:FindTargets(self.aoe)) do
		damageTable.victim = target
		local target_damage = damage

		local mod = target:FindModifierByName("modifier_life_stealer_infest_custom_legendary_bonus")
		if mod then
			target_damage = target_damage * (1 + mod.bonus * mod:GetStackCount())
		end

		damageTable.damage = target_damage
		local real_damage = DoDamage(damageTable)
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = self.stun * (1 - target:GetStatusResistance()) }
		)
		target:SendNumber(6, real_damage)

		if self.caster.infest_ability and self.caster.infest_ability.talents.has_r3 == 1 then
			target:AddNewModifier(
				self.caster,
				self.caster.infest_ability,
				"modifier_life_stealer_infest_custom_legendary_bonus",
				{ duration = self.caster.infest_ability.talents.r3_duration }
			)
		end
	end
end

life_stealer_centaur_retaliate = class({})
function life_stealer_centaur_retaliate:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/troll_warlord/rage_unslow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_return.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/blademail.vpcf", context)
end

function life_stealer_centaur_retaliate:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.duration = self:GetLevelSpecialValueFor("duration", 1)
end

function life_stealer_centaur_retaliate:OnSpellStart()
	local duration = self.duration

	if self.caster.infest_ability and self.caster.infest_ability.talents.has_h6 == 1 then
		duration = duration + self.caster.infest_ability.talents.h6_duration_creep
	end

	if self.caster.infest_ability and self.caster.infest_ability.talents.has_r4 == 1 then
		self.caster:GenericHeal(
			self.caster.infest_ability.talents.r4_heal_creep * self.caster:GetMaxHealth(),
			self.caster.infest_ability,
			nil,
			nil,
			"modifier_lifestealer_infest_4"
		)
	end

	self.caster:EmitSound("DOTA_Item.BladeMail.Activate")
	self.caster:RemoveModifierByName("modifier_life_stealer_centaur_retaliate")
	self.caster:AddNewModifier(self.caster, self, "modifier_life_stealer_centaur_retaliate", { duration = duration })
end

modifier_life_stealer_centaur_retaliate = class(mod_visible)
function modifier_life_stealer_centaur_retaliate:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability:GetSpecialValueFor("damage_reduce")
	self.damage_return = self.ability:GetSpecialValueFor("damage_return") / 100

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items_fx/blademail.vpcf", self)
	self.parent:GenericParticle("particles/troll_warlord/rage_unslow.vpcf", self)

	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_life_stealer_centaur_retaliate:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_life_stealer_centaur_retaliate:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end

function modifier_life_stealer_centaur_retaliate:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.attacker == self.parent then
		return
	end
	if bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION then
		return
	end
	if params.attacker:IsBuilding() then
		return
	end

	local target = params.attacker
	target:EmitSound("DOTA_Item.BladeMail.Damage")
	local damage_return = self.damage_return * params.original_damage
	DoDamage({
		victim = target,
		attacker = self.parent,
		damage = damage_return,
		damage_type = params.damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_REFLECTION + DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
		ability = self.ability,
	})

	local caster_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_centaur/centaur_return.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		caster_pfx,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		caster_pfx,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(caster_pfx)
end

life_stealer_centaur_bash = class({})
function life_stealer_centaur_bash:GetIntrinsicModifierName()
	return "modifier_life_stealer_centaur_bash"
end

modifier_life_stealer_centaur_bash = class(mod_hidden)
function modifier_life_stealer_centaur_bash:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.stun = self.ability:GetSpecialValueFor("stun")
	self.damage = self.ability:GetSpecialValueFor("damage")
	self.range = self.ability:GetSpecialValueFor("range")
	self.base = self.ability:GetSpecialValueFor("damage_base")

	if not IsServer() then
		return
	end
	self:StartIntervalThink(0.1)
end

function modifier_life_stealer_centaur_bash:OnRefresh()
	self.stun = self.ability:GetSpecialValueFor("stun")
	self.base = self.ability:GetSpecialValueFor("damage_base")
	self.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_life_stealer_centaur_bash:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent.owner) then
		return
	end

	self.parent:AddProc(self, { current = true, accuracy = true, cd = true, strike = true })
	self:StartIntervalThink(-1)
end

function modifier_life_stealer_centaur_bash:CheckState()
	if not self.ability:IsFullyCastable() then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_life_stealer_centaur_bash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_life_stealer_centaur_bash:GetModifierAttackRangeBonus()
	if not IsServer() then
		return
	end
	if not self.ability:IsFullyCastable() then
		return
	end
	return self.range
end

function modifier_life_stealer_centaur_bash:GetProcChance()
	if self.parent:PassivesDisabled() then
		return 0
	end
	return 100
end

function modifier_life_stealer_centaur_bash:AttackProc(params, name)
	local real_damage = DoDamage({
		victim = params.target,
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.base + self.parent:GetMaxHealth() * self.damage / 100,
	})
	params.target:SendNumber(6, real_damage)

	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bashed",
		{ duration = (1 - params.target:GetStatusResistance()) * self.stun }
	)
	params.target:EmitSound("Lifestealer.Frenzy_bash")
end