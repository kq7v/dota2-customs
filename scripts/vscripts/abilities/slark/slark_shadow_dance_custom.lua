--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_slark_shadow_dance_custom",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_effect",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_dummy",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_legendary",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_tracker",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_heal_effect",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_creeps",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_shadow_dance_custom_legendary_cd",
	"abilities/slark/slark_shadow_dance_custom",
	LUA_MODIFIER_MOTION_NONE
)

slark_shadow_dance_custom = class({})
slark_shadow_dance_custom.talents = {}

function slark_shadow_dance_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_shadow_dance_dummy.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_shadow_dance.vpcf", context)
	PrecacheResource("particle", "particles/slark/dance_legendary.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_mark_hit.vpcf", context)
	PrecacheResource("particle", "particles/slark/dance_lifesteal.vpcf", context)
end

function slark_shadow_dance_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r2 = 0,
			r2_cd = 0,
			r2_duration = 0,

			has_r4 = 0,
			r4_range = caster:GetTalentValue("modifier_slark_dance_4", "range", true),
			r4_heal = caster:GetTalentValue("modifier_slark_dance_4", "heal", true) / 100,
			r4_bonus = caster:GetTalentValue("modifier_slark_dance_4", "bonus", true),

			has_r7 = 0,
			r7_bva_base = caster:GetTalentValue("modifier_slark_dance_7", "bva_base", true),
			r7_bva_bonus = caster:GetTalentValue("modifier_slark_dance_7", "bva_bonus", true),

			has_h3 = 0,
			h3_heal = 0,
			h3_magic = 0,

			has_h6 = 0,
			h6_radius = caster:GetTalentValue("modifier_slark_hero_6", "radius", true),
			h6_move = caster:GetTalentValue("modifier_slark_hero_6", "move", true),
			h6_max_move = caster:GetTalentValue("modifier_slark_hero_6", "max_move", true),
			h6_linger = caster:GetTalentValue("modifier_slark_hero_6", "linger", true),
		}
	end

	if caster:HasTalent("modifier_slark_dance_2") then
		self.talents.has_r2 = 1
		self.talents.r2_cd = caster:GetTalentValue("modifier_slark_dance_2", "cd")
		self.talents.r2_duration = caster:GetTalentValue("modifier_slark_dance_2", "duration")
	end

	if caster:HasTalent("modifier_slark_dance_4") then
		self.talents.has_r4 = 1
		caster:AddLifesteal(self.tracker, {
			name = "modifier_slark_dance_4",
			type = 2,
			value = function()
				if caster:HasModifier("modifier_slark_shadow_dance_custom_effect") then
					return self.talents.r4_heal * self.talents.r4_bonus, "particles/slark/dance_lifesteal.vpcf"
				end
				return self.talents.r4_heal
			end,
		})
	end

	if caster:HasTalent("modifier_slark_dance_7") then
		self.talents.has_r7 = 1
		caster:AddAttackRecordEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_slark_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_heal = caster:GetTalentValue("modifier_slark_hero_3", "heal")
		self.talents.h3_magic = caster:GetTalentValue("modifier_slark_hero_3", "magic")
	end

	if caster:HasTalent("modifier_slark_hero_6") then
		self.talents.has_h6 = 1
	end
end

function slark_shadow_dance_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "slark_shadow_dance", self)
end

function slark_shadow_dance_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_slark_shadow_dance_custom_tracker"
end

function slark_shadow_dance_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function slark_shadow_dance_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level)
end

function slark_shadow_dance_custom:OnSpellStart()
	local duration = self.duration + self.talents.r2_duration

	self.caster:RemoveModifierByName("modifier_slark_shadow_dance_custom_creeps")
	self.caster:AddNewModifier(self.caster, self, "modifier_slark_shadow_dance_custom", { duration = duration })
end

modifier_slark_shadow_dance_custom = class(mod_visible)
function modifier_slark_shadow_dance_custom:GetPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_slark_shadow_dance_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_slark_shadow_dance.vpcf"
end
function modifier_slark_shadow_dance_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_slark_shadow_dance_custom:IsAura()
	return true
end
function modifier_slark_shadow_dance_custom:GetAuraDuration()
	return 0
end
function modifier_slark_shadow_dance_custom:GetAuraRadius()
	return 200
end
function modifier_slark_shadow_dance_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_slark_shadow_dance_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_slark_shadow_dance_custom:GetModifierAura()
	return "modifier_slark_shadow_dance_custom_effect"
end
function modifier_slark_shadow_dance_custom:GetAuraEntityReject(hEntity)
	return hEntity ~= self.parent
end
function modifier_slark_shadow_dance_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Hero_Slark.ShadowDance")

	self.ability:EndCd()

	if self.parent:GetAttackTarget() ~= nil then
		self.parent:MoveToTargetToAttack(self.parent:GetAttackTarget())
	end

	self.dummy =
		CreateUnitByName("npc_dota_companion", self.parent:GetAbsOrigin(), false, nil, nil, self.parent:GetTeamNumber())
	self.dummy:AddNewModifier(self.dummy, self.ability, "modifier_slark_shadow_dance_custom_dummy", {})

	local shadow_dance_pfx = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_slark/slark_shadow_dance.vpcf",
		self.ability,
		"slark_shadow_dance_custom"
	)
	local effect_cast = ParticleManager:CreateParticleForTeam(
		shadow_dance_pfx,
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetTeamNumber()
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_eyeR",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		4,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_eyeL",
		Vector(0, 0, 0),
		true
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	local shadow_dance_dummy_pfx = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_slark/slark_shadow_dance_dummy.vpcf",
		self.ability,
		"slark_shadow_dance_custom"
	)
	self.effect_cast = ParticleManager:CreateParticle(shadow_dance_dummy_pfx, PATTACH_ABSORIGIN_FOLLOW, self.dummy)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		0,
		self.dummy,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.dummy:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		1,
		self.dummy,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.dummy:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self:StartIntervalThink(0.01)
end

function modifier_slark_shadow_dance_custom:OnDestroy(kv)
	if not IsServer() then
		return
	end
	if self.dummy and not self.dummy:IsNull() then
		UTIL_Remove(self.dummy)
	end

	self.ability:StartCd()
end

function modifier_slark_shadow_dance_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INVISIBILITY_LEVEL,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_slark_shadow_dance_custom:GetModifierInvisibilityLevel()
	return 1
end

function modifier_slark_shadow_dance_custom:GetActivityTranslationModifiers()
	return "shadow_dance"
end

function modifier_slark_shadow_dance_custom:CheckState()
	return {
		[MODIFIER_STATE_INVISIBLE] = true,
		[MODIFIER_STATE_TRUESIGHT_IMMUNE] = true,
	}
end

function modifier_slark_shadow_dance_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.dummy and not self.dummy:IsNull() then
		self.dummy:SetAbsOrigin(self.parent:GetAbsOrigin())
		self.dummy:FacePoint(self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * 10)
	end
end

modifier_slark_shadow_dance_custom_dummy = class(mod_hidden)
function modifier_slark_shadow_dance_custom_dummy:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
	}
end

modifier_slark_shadow_dance_custom_tracker = class(mod_hidden)
function modifier_slark_shadow_dance_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.dance_ability = self.ability
	self.parent.dance_legendary_ability = self.parent:FindAbilityByName("slark_shadow_dance_custom_legendary")
	if self.parent.dance_legendary_ability then
		self.parent.dance_legendary_ability:UpdateTalents()
	end

	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
	self.ability.bonus_regen = self.ability:GetSpecialValueFor("bonus_regen")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_duration = self.ability:GetSpecialValueFor("creeps_duration")

	if not IsServer() then
		return
	end
	self.parent:AddDamageEvent_inc(self, true)
	self:StartIntervalThink(0.2)
end

function modifier_slark_shadow_dance_custom_tracker:OnRefresh(table)
	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
	self.ability.bonus_regen = self.ability:GetSpecialValueFor("bonus_regen")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_slark_shadow_dance_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	local near = false
	for _, player in pairs(players) do
		if
			player:IsAlive()
			and player:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and (player:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= (self.ability.radius + (self.ability.talents.has_h6 == 1 and self.ability.talents.h6_radius or 0))
			and player:CanEntityBeSeenByMyTeam(self.parent)
		then
			near = true
			break
		end
	end

	local mod = self.parent:FindModifierByName("modifier_slark_shadow_dance_custom_heal_effect")
	if self.parent:HasModifier("modifier_slark_shadow_dance_custom_effect") then
		self:ApplyEffect()
	else
		if
			near == true
			or self.parent:HasModifier("modifier_slark_shadow_dance_custom_creeps")
			or self.parent:HasModifier("modifier_tower_incoming_speed")
		then
			if mod then
				mod:SetEnd()
			end
		else
			self:ApplyEffect()
		end
	end
end

function modifier_slark_shadow_dance_custom_tracker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_slark_shadow_dance_custom_heal_effect")
end

function modifier_slark_shadow_dance_custom_tracker:ApplyEffect()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_slark_shadow_dance_custom_heal_effect", {})
end

function modifier_slark_shadow_dance_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	if IsValid(self.parent.dance_legendary_ability) then
		self.parent.dance_legendary_ability:ProcEffect()
	end
end

function modifier_slark_shadow_dance_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not params.attacker:IsCreep() then
		return
	end
	if
		params.attacker:GetTeamNumber() ~= DOTA_TEAM_NEUTRALS
		and params.attacker:GetTeamNumber() ~= DOTA_TEAM_CUSTOM_5
	then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_slark_shadow_dance_custom_creeps",
		{ duration = self.ability.creeps_duration }
	)
end

function modifier_slark_shadow_dance_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_slark_shadow_dance_custom_tracker:GetModifierIgnoreMovespeedLimit()
	if self.ability.talents.has_h6 == 0 then
		return 0
	end
	return 1
end

function modifier_slark_shadow_dance_custom_tracker:GetModifierMoveSpeed_Max()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_max_move
end

function modifier_slark_shadow_dance_custom_tracker:GetModifierMoveSpeed_Limit()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_max_move
end

function modifier_slark_shadow_dance_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h3_magic
end

function modifier_slark_shadow_dance_custom_tracker:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	return self.parent:HasModifier("modifier_slark_shadow_dance_custom_effect") and self.ability.talents.r7_bva_bonus
		or self.ability.talents.r7_bva_base
end

modifier_slark_shadow_dance_custom_effect = class(mod_hidden)
function modifier_slark_shadow_dance_custom_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_void_spirit_pulse_buff.vpcf"
end
function modifier_slark_shadow_dance_custom_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_slark_shadow_dance_custom_effect:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_slark_shadow_dance_custom_effect:CheckState()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_slark_shadow_dance_custom_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_slark_shadow_dance_custom_effect:GetActivityTranslationModifiers()
	return "shadow_dance"
end

function modifier_slark_shadow_dance_custom_effect:GetModifierAttackRangeBonus()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_range
end

modifier_slark_shadow_dance_custom_creeps = class(mod_hidden)

modifier_slark_shadow_dance_custom_heal_effect = class(mod_visible)
function modifier_slark_shadow_dance_custom_heal_effect:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ending = false
	if not IsServer() then
		return
	end

	local particle = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_slark/slark_regen.vpcf",
		self.ability
	)
	self.particle = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_slark_shadow_dance_custom_heal_effect:SetEnd()
	if not IsServer() then
		return
	end
	if self.ending == true then
		return
	end

	if self.ability.talents.has_h6 == 0 then
		self:Destroy()
	else
		self:SetDuration(self.ability.talents.h6_linger, true)
		self.ending = true
	end
end

function modifier_slark_shadow_dance_custom_heal_effect:OnRefresh()
	self.ending = false
	if not IsServer() then
		return
	end
	self:SetDuration(-1, true)
end

function modifier_slark_shadow_dance_custom_heal_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_slark_shadow_dance_custom_heal_effect:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.bonus_movement_speed
end

function modifier_slark_shadow_dance_custom_heal_effect:GetModifierConstantHealthRegen()
	return self.ability.bonus_regen + self.ability.talents.h3_heal
end

slark_shadow_dance_custom_legendary = class({})
slark_shadow_dance_custom_legendary.talents = {}

function slark_shadow_dance_custom_legendary:CreateTalent()
	self:UpdateTalents()

	if self.talents.has_w7 == 0 then
		self.caster:SwapAbilities("slark_shadow_dance_custom_legendary", "slark_pounce_custom_legendary", true, false)
	end
end

function slark_shadow_dance_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r7 = 0,
			r7_cd = caster:GetTalentValue("modifier_slark_dance_7", "cd", true),
			r7_radius = caster:GetTalentValue("modifier_slark_dance_7", "radius", true),
			r7_duration = caster:GetTalentValue("modifier_slark_dance_7", "duration", true),

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_slark_dance_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_slark_pounce_7") then
		self.talents.has_w7 = 1
	end
end

function slark_shadow_dance_custom_legendary:GetCastRange(vLocation, hTarget)
	return self.talents.r7_radius or 0
end

function slark_shadow_dance_custom_legendary:GetCooldown()
	return self.talents.r7_cd or 0
end

function slark_shadow_dance_custom_legendary:ProcEffect()
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r7 ~= 1 then
		return
	end
	if not self:IsFullyCastable() then
		return
	end
	if not self:IsActivated() then
		return
	end
	if self.caster:HasModifier("modifier_slark_shadow_dance_custom") then
		return
	end
	if not IsValid(self.caster.dance_ability) then
		return
	end

	local point = self.caster:GetAbsOrigin()
	CreateModifierThinker(
		self.caster,
		self.caster.dance_ability,
		"modifier_slark_shadow_dance_custom_legendary",
		{ duration = self.talents.r7_duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_slark_shadow_dance_custom_legendary = class(mod_hidden)
function modifier_slark_shadow_dance_custom_legendary:IsAura()
	return true
end
function modifier_slark_shadow_dance_custom_legendary:GetAuraDuration()
	return 0
end
function modifier_slark_shadow_dance_custom_legendary:GetAuraRadius()
	return self.radius
end
function modifier_slark_shadow_dance_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_slark_shadow_dance_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_slark_shadow_dance_custom_legendary:GetModifierAura()
	return "modifier_slark_shadow_dance_custom_effect"
end
function modifier_slark_shadow_dance_custom_legendary:GetAuraEntityReject(hEntity)
	return hEntity ~= self.caster
end
function modifier_slark_shadow_dance_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.dance_legendary_ability
	if not IsValid(self.ability) then
		self:Destroy()
		return
	end

	self.point = self.parent:GetAbsOrigin()
	self.radius = self.ability.talents.r7_radius

	if not IsServer() then
		return
	end
	self.ability:EndCd()

	self.parent:EmitSound("Slark.Dance_legendary1")
	self.parent:EmitSound("Slark.Dance_legendary2")

	local particle = ParticleManager:CreateParticle("particles/slark/dance_legendary.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.point)
	ParticleManager:SetParticleControl(particle, 1, self.point)
	ParticleManager:SetParticleControl(particle, 2, self.point)
	ParticleManager:SetParticleControl(particle, 3, self.point)
	ParticleManager:SetParticleControl(particle, 4, Vector(self.radius, self:GetRemainingTime(), 0))
	self:AddParticle(particle, false, false, -1, false, false)
end

function modifier_slark_shadow_dance_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end

	self.ability:StartCd()

	if self.ability.talents.has_w7 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_slark_shadow_dance_custom_legendary_cd",
			{ duration = self.ability:GetCooldownTimeRemaining() }
		)
	end
end

modifier_slark_shadow_dance_custom_legendary_cd = class(mod_cd)