--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_skeleton_king_innate_custom",
	"abilities/wraith_king/skeleton_king_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_innate_custom_ghost",
	"abilities/wraith_king/skeleton_king_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_skeleton_king_innate_custom_cd",
	"abilities/wraith_king/skeleton_king_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_innate_custom_aura",
	"abilities/wraith_king/skeleton_king_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

skeleton_king_innate_custom = class({})
skeleton_king_innate_custom.talents = {}

function skeleton_king_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/wraith_king_vampiric_aura_lifesteal.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_skeletonking/wraith_king_curse_overhead.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/scepter_skelet.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_skeletonking/wraith_king_ghosts_ambient.vpcf", context)

	PrecacheResource("soundfile", "soundevents/vo_custom/skeleton_king_vo_custom.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_skeleton_king.vsndevts", context)
end

function skeleton_king_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			h2_heal = 0,
			h2_heal_amp = 0,
		}
	end

	if caster:HasTalent("modifier_skeleton_hero_2") then
		self.talents.h2_heal = caster:GetTalentValue("modifier_skeleton_hero_2", "heal") / 100
		self.talents.h2_heal_amp = caster:GetTalentValue("modifier_skeleton_hero_2", "heal_amp")
	end
end

function skeleton_king_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_skeleton_king_innate_custom"
end

function skeleton_king_innate_custom:GetLifesteal()
	if self.caster:PassivesDisabled() then
		return 0
	end
	return self.heal + math.min(self.level_max, self.caster:GetLevel()) * self.heal_inc + self.talents.h2_heal
end

modifier_skeleton_king_innate_custom = class(mod_hidden)
function modifier_skeleton_king_innate_custom:RemoveOnDeath()
	return false
end
function modifier_skeleton_king_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.wk_innate = self.ability
	self.parent:AddDamageEvent_inc(self, true)
	self.parent:AddLifesteal(self, {
		effect = false,
		proc = "LifestealParticle",
		value = function()
			return self.ability:GetLifesteal()
		end,
	})

	self.ability.heal = self.ability:GetSpecialValueFor("heal") / 100
	self.ability.heal_inc = self.ability:GetSpecialValueFor("heal_inc") / 100
	self.ability.level_max = self.ability:GetSpecialValueFor("level_max")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.move = self.ability:GetSpecialValueFor("move")

	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")
	self.ability.scepter_damage = self.ability:GetSpecialValueFor("scepter_damage")
	self.ability.scepter_move = self.ability:GetSpecialValueFor("scepter_move")
	self.ability.scepter_radius = self.ability:GetSpecialValueFor("scepter_radius")
end

function modifier_skeleton_king_innate_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if not params.lethal_damage then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_skeleton_king_innate_custom_ghost") then
		return
	end
	if self.parent:HasModifier("modifier_skeleton_king_innate_custom_cd") then
		return
	end
	if not IsValid(params.attacker) then
		return
	end

	local duration = self.ability.duration
	if self.parent:HasScepter() then
		duration = duration + self.ability.scepter_duration
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ effect = 2, duration = duration, magic_damage = 0 }
		)
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_skeleton_king_innate_custom_ghost",
		{ duration = duration, attacker = params.attacker:entindex() }
	)
end

function modifier_skeleton_king_innate_custom:LifestealParticle(params, heal, target)
	if not IsServer() then
		return
	end
	if heal < 1 then
		return
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_skeletonking/wraith_king_vampiric_aura_lifesteal.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_skeleton_king_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MIN_HEALTH,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_skeleton_king_innate_custom:GetModifierHealChange()
	return self.ability.talents.h2_heal_amp
end

function modifier_skeleton_king_innate_custom:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.h2_heal_amp
end

function modifier_skeleton_king_innate_custom:GetMinHealth()
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_skeleton_king_innate_custom_cd") then
		return
	end
	return 1
end

modifier_skeleton_king_innate_custom_ghost = class(mod_visible)
function modifier_skeleton_king_innate_custom_ghost:GetStatusEffectName()
	return "particles/status_fx/status_effect_wraithking_ghosts.vpcf"
end
function modifier_skeleton_king_innate_custom_ghost:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_skeleton_king_innate_custom_ghost:GetAuraRadius()
	return self.radius
end
function modifier_skeleton_king_innate_custom_ghost:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_skeleton_king_innate_custom_ghost:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC
end
function modifier_skeleton_king_innate_custom_ghost:GetModifierAura()
	return "modifier_skeleton_king_innate_custom_aura"
end
function modifier_skeleton_king_innate_custom_ghost:IsAura()
	return IsServer() and self.parent:IsAlive() and self.parent:HasScepter()
end
function modifier_skeleton_king_innate_custom_ghost:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.speed = self.ability.speed
	self.move = self.ability.move

	self.scepter_damage = self.ability.scepter_damage
	self.scepter_move = self.ability.scepter_move
	self.radius = self.ability.scepter_radius

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:EmitSound("Hero_SkeletonKing.Reincarnate.Ghost")

	if table.attacker then
		self.attacker = EntIndexToHScript(table.attacker)
		if players[self.attacker:GetId()] then
			self.attacker = players[self.attacker:GetId()]
		end
	end
	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_skeletonking/wraith_king_ghosts_ambient.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self:StartIntervalThink(self:GetRemainingTime() - 3)
end

function modifier_skeleton_king_innate_custom_ghost:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_skeletonking/wraith_king_curse_overhead.vpcf", self, true)
	self:StartIntervalThink(-1)
end

function modifier_skeleton_king_innate_custom_ghost:OnDestroy()
	if not IsServer() then
		return
	end
	if self:GetRemainingTime() > 0.1 then
		return
	end
	if not IsValid(self.attacker) or not self.attacker:IsBaseNPC() then
		self.attacker = nil
	end

	self.parent:AddNewModifier(self.parent, nil, "modifier_skeleton_king_innate_custom_cd", { duration = 0.1 })
	self.parent:Kill(self.ability, self.attacker)
end

function modifier_skeleton_king_innate_custom_ghost:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_DISABLE_HEALING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_skeleton_king_innate_custom_ghost:GetModifierDamageOutgoing_Percentage()
	if not self.parent:HasScepter() then
		return
	end
	return self.scepter_damage
end

function modifier_skeleton_king_innate_custom_ghost:GetModifierSpellAmplify_Percentage()
	if not self.parent:HasScepter() then
		return
	end
	return self.scepter_damage
end

function modifier_skeleton_king_innate_custom_ghost:GetModifierMoveSpeed_Absolute()
	if not self.parent:HasScepter() then
		return
	end
	return self.scepter_move
end

function modifier_skeleton_king_innate_custom_ghost:GetModifierModelScale()
	return 25
end

function modifier_skeleton_king_innate_custom_ghost:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_skeleton_king_innate_custom_ghost:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function modifier_skeleton_king_innate_custom_ghost:GetDisableHealing()
	return 1
end

function modifier_skeleton_king_innate_custom_ghost:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_skeleton_king_innate_custom_ghost:GetAuraEntityReject(hEntity)
	if hEntity == self.parent or (hEntity.owner and hEntity.owner == self.parent) then
		return false
	end
	return true
end

modifier_skeleton_king_innate_custom_cd = class(mod_cd)

modifier_skeleton_king_innate_custom_aura = class(mod_hidden)
function modifier_skeleton_king_innate_custom_aura:GetStatusEffectName()
	return "particles/status_fx/status_effect_wraithking_ghosts.vpcf"
end
function modifier_skeleton_king_innate_custom_aura:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_skeleton_king_innate_custom_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.speed
	self.move = self.ability.move
	self.scepter_damage = self.ability.scepter_damage
	self.scepter_move = self.ability.scepter_move

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/wraith_king/scepter_skelet.vpcf", self)
end

function modifier_skeleton_king_innate_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_skeleton_king_innate_custom_aura:GetModifierDamageOutgoing_Percentage()
	return self.scepter_damage
end

function modifier_skeleton_king_innate_custom_aura:GetModifierSpellAmplify_Percentage()
	return self.scepter_damage
end

function modifier_skeleton_king_innate_custom_aura:GetModifierMoveSpeed_Absolute()
	return self.scepter_move
end

function modifier_skeleton_king_innate_custom_aura:GetModifierModelScale()
	return 25
end

function modifier_skeleton_king_innate_custom_aura:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_skeleton_king_innate_custom_aura:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function modifier_skeleton_king_innate_custom_aura:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_DEBUFF_IMMUNE] = true,
	}
end