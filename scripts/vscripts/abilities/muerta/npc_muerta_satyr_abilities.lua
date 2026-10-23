--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_npc_muerta_satyr_bkb",
	"abilities/muerta/npc_muerta_satyr_abilities",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_npc_muerta_satyr_passive",
	"abilities/muerta/npc_muerta_satyr_abilities",
	LUA_MODIFIER_MOTION_NONE
)

npc_muerta_satyr_silence = class({})
function npc_muerta_satyr_silence:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/generic_gameplay/generic_has_quest.vpcf", context)
	PrecacheResource("particle", "particles/neutral_fx/satyr_hellcaller.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/black_king_bar_avatar.vpcf", context)
end

function npc_muerta_satyr_silence:Spawn()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.range = self:GetLevelSpecialValueFor("range", 1)
	self.speed = self:GetLevelSpecialValueFor("speed", 1)
	self.silence = self:GetLevelSpecialValueFor("silence", 1)
	self.damage = self:GetLevelSpecialValueFor("damage", 1) / 100
end

function npc_muerta_satyr_silence:OnAbilityPhaseStart()
	self.sign = ParticleManager:CreateParticle(
		"particles/generic_gameplay/generic_has_quest.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.caster
	)
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_1, 0.7)
	return true
end

function npc_muerta_satyr_silence:OnAbilityPhaseInterrupted()
	if self.sign then
		ParticleManager:DestroyParticle(self.sign, true)
		ParticleManager:ReleaseParticleIndex(self.sign)
		self.sign = nil
	end

	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
end

function npc_muerta_satyr_silence:OnSpellStart()
	if self.sign then
		ParticleManager:DestroyParticle(self.sign, true)
		ParticleManager:ReleaseParticleIndex(self.sign)
		self.sign = nil
	end

	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_1)

	self.caster:EmitSound("n_creep_SatyrHellcaller.Shockwave")

	local point = self.caster:CastPosition(self:GetCursorPosition())
	local vec = (point - self.caster:GetAbsOrigin())

	local info = {
		EffectName = "particles/neutral_fx/satyr_hellcaller.vpcf",
		Ability = self,
		vSpawnOrigin = self.caster:GetOrigin(),
		fStartRadius = 70,
		fEndRadius = 200,
		vVelocity = vec:Normalized() * self.speed,
		fDistance = self.range,
		Source = self.caster,
		bDeleteOnHit = false,
		fExpireTime = GameRules:GetGameTime() + 4,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
	}

	ProjectileManager:CreateLinearProjectile(info)
end

function npc_muerta_satyr_silence:OnProjectileHit(target, vLocation)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	local damage = self.damage * target:GetMaxHealth()
	target:SendNumber(6, damage)

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_generic_silence",
		{ duration = self.silence * (1 - target:GetStatusResistance()) }
	)

	DoDamage({
		victim = target,
		attacker = self.caster,
		damage = damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self,
	})
	target:EmitSound("n_creep_SatyrHellcaller.Shockwave.Damage")
end

npc_muerta_satyr_bkb = class({})
function npc_muerta_satyr_bkb:Spawn()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.health = self:GetLevelSpecialValueFor("health", 1)
	self.duration = self:GetLevelSpecialValueFor("duration", 1)
	self.lifesteal = self:GetLevelSpecialValueFor("lifesteal", 1) / 100
end

function npc_muerta_satyr_bkb:OnSpellStart()
	self.caster:AddNewModifier(self.caster, self, "modifier_npc_muerta_satyr_bkb", { duration = self.duration })
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_generic_debuff_immune",
		{ duration = self.duration, effect = 1, sound = 1 }
	)
end

modifier_npc_muerta_satyr_bkb = class(mod_hidden)
function modifier_npc_muerta_satyr_bkb:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.lifesteal = self.ability.lifesteal

	self.parent:AddLifesteal(self, { value = self.lifesteal, text = true })
end

npc_muerta_satyr_passive = class({})
function npc_muerta_satyr_passive:GetIntrinsicModifierName()
	return "modifier_npc_muerta_satyr_passive"
end

function npc_muerta_satyr_passive:Spawn()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.mana = self:GetLevelSpecialValueFor("mana", 1) / 100
	self.damage = self:GetLevelSpecialValueFor("damage", 1)
end

modifier_npc_muerta_satyr_passive = class(mod_hidden)
function modifier_npc_muerta_satyr_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.mana = self.ability.mana
	self.damage = self.ability.damage
end

function modifier_npc_muerta_satyr_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL,
	}
end

function modifier_npc_muerta_satyr_passive:GetModifierProcAttack_BonusDamage_Magical(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target

	local mana = target:GetMaxMana() * self.mana
	params.target:Script_ReduceMana(mana, self.ability)

	local damage = mana * self.damage
	target:SendNumber(4, damage)

	target:EmitSound("n_creep_SatyrSoulstealer.ManaBurn")
	return damage
end