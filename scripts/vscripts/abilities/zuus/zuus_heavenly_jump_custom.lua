--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_buff",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_debuff",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_passive",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_legendary",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_jump_7"
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_attack_speed_effect",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_illusion",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_invun",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_attacks",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_attacks_caster",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_stats",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_jump_3"
)
LinkLuaModifier(
	"modifier_zuus_heavenly_jump_custom_leash",
	"abilities/zuus/zuus_heavenly_jump_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_zuus_jump_4"
)

zuus_heavenly_jump_custom = class({})
zuus_heavenly_jump_custom.talents = {}

function zuus_heavenly_jump_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_glow.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_heal.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed_max.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_mjollnir_shield.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_stormspirit/stormspirit_static_remnant.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_timer.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_techies/techies_stasis_trap_explode.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard_head.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_lightning_bolt_aoe.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
end

function zuus_heavenly_jump_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_interval = caster:GetTalentValue("modifier_zuus_jump_1", "interval", true),
			e1_attacks = caster:GetTalentValue("modifier_zuus_jump_1", "attacks", true),

			has_e2 = 0,
			e2_heal = 0,
			e2_cd = 0,

			has_e3 = 0,
			e3_stats = 0,
			e3_damage = 0,
			e3_duration = caster:GetTalentValue("modifier_zuus_jump_3", "duration", true),
			e3_max = caster:GetTalentValue("modifier_zuus_jump_3", "max", true),
			e3_duration_creeps = caster:GetTalentValue("modifier_zuus_jump_3", "duration_creeps", true),

			has_e4 = 0,
			e4_slow = caster:GetTalentValue("modifier_zuus_jump_4", "slow", true),
			e4_radius = caster:GetTalentValue("modifier_zuus_jump_4", "radius", true),
			e4_delay = caster:GetTalentValue("modifier_zuus_jump_4", "delay", true),
			e4_stun = caster:GetTalentValue("modifier_zuus_jump_4", "stun", true),
			e4_leash = caster:GetTalentValue("modifier_zuus_jump_4", "leash", true),

			has_e7 = 0,
			e7_duration = caster:GetTalentValue("modifier_zuus_jump_7", "duration", true),
			e7_speed = caster:GetTalentValue("modifier_zuus_jump_7", "speed", true),
			e7_cd_inc = caster:GetTalentValue("modifier_zuus_jump_7", "cd_inc", true) / 100,
			e7_range = caster:GetTalentValue("modifier_zuus_jump_7", "range", true),
			e7_max = caster:GetTalentValue("modifier_zuus_jump_7", "max", true),
			e7_duration_creeps = caster:GetTalentValue("modifier_zuus_jump_7", "duration_creeps", true),

			h1_slow = 0,

			has_h4 = 0,
			h4_range = caster:GetTalentValue("modifier_zuus_hero_4", "range", true),
		}
	end

	if caster:HasTalent("modifier_zuus_jump_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_zuus_jump_1", "damage")
	end

	if caster:HasTalent("modifier_zuus_jump_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_zuus_jump_2", "heal")
		self.talents.e2_cd = caster:GetTalentValue("modifier_zuus_jump_2", "cd")
	end

	if caster:HasTalent("modifier_zuus_jump_3") then
		self.talents.has_e3 = 1
		self.talents.e3_stats = caster:GetTalentValue("modifier_zuus_jump_3", "stats")
		self.talents.e3_damage = caster:GetTalentValue("modifier_zuus_jump_3", "damage")
		caster:AddProc(self.tracker, { land = true, extra = false })
	end

	if caster:HasTalent("modifier_zuus_jump_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { land = true, extra = false })
	end

	if caster:HasTalent("modifier_zuus_jump_7") then
		self.talents.has_e7 = 1
		caster:AddProc(self.tracker, { land = true, extra = false })
		if name == "modifier_zuus_jump_7" then
			caster:UpdateUIlong({ max = self.talents.e7_duration, stack = 0, active = 0, style = "ZeusJump" })
		end
	end

	if caster:HasTalent("modifier_zuus_hero_1") then
		self.talents.h1_slow = caster:GetTalentValue("modifier_zuus_hero_1", "slow")
	end

	if caster:HasTalent("modifier_zuus_hero_4") then
		self.talents.has_h4 = 1
	end
end

function zuus_heavenly_jump_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_zuus_heavenly_jump_custom_passive"
end

function zuus_heavenly_jump_custom:GetBehavior()
	if self.talents.has_h4 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function zuus_heavenly_jump_custom:GetCastRange(vLocation, hTarget)
	if IsServer() and self.talents.has_h4 == 1 then
		return 999999
	end
	return self:GetRange() - self.caster:GetCastRangeBonus()
end

function zuus_heavenly_jump_custom:GetRange()
	return (self.hop_distance or 0) + (self.talents.has_h4 == 1 and self.talents.h4_range or 0)
end

function zuus_heavenly_jump_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e2_cd or 0)
end

function zuus_heavenly_jump_custom:OnSpellStart()
	local distance = self:GetRange()

	if self.caster.wrath_ability then
		self.caster.wrath_ability:CreateCloud(self.caster:GetAbsOrigin())
	end

	if self.talents.has_h4 == 1 then
		local point = self:GetCursorPosition()
		if point == self.caster:GetAbsOrigin() then
			point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
		end

		local vec = point - self.caster:GetAbsOrigin()
		local dir = vec:Normalized()
		dir.z = 0
		self.caster:FacePoint(self.caster:GetAbsOrigin() + dir * 10)
		if vec:Length2D() >= distance then
			point = self.caster:GetAbsOrigin() + dir * distance
		end
		distance = (point - self.caster:GetAbsOrigin()):Length2D()
		ProjectileManager:ProjectileDodge(self.caster)
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_zuus_heavenly_jump_custom_invun",
			{ duration = self.hop_duration + 0.1 }
		)
	end

	local direction = self.caster:GetForwardVector()
	self.caster:EmitSound("Hero_Zuus.StaticField")

	AddFOWViewer(
		self.caster:GetTeamNumber(),
		self.caster:GetAbsOrigin(),
		self.vision_radius,
		self.vision_duration,
		false
	)

	self.jump_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_arc", {
		dir_x = direction.x,
		dir_y = direction.y,
		duration = self.hop_duration,
		distance = distance,
		height = self.hop_height,
		fix_end = false,
		isStun = true,
		isForward = true,
		activity = ACT_DOTA_CAST_ABILITY_3,
	})

	self.caster:RemoveModifierByName("modifier_zuus_heavenly_jump_custom_buff")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_zuus_heavenly_jump_custom_buff",
		{ duration = self.speed_duration + self.hop_duration }
	)

	local units = {}
	local units_heroes = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.caster:GetAbsOrigin(),
		nil,
		self.range,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)
	local units_creeps = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.caster:GetAbsOrigin(),
		nil,
		self.range,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)

	if #units_heroes > 0 then
		for i = 1, #units_heroes do
			table.insert(units, units_heroes[i])
		end
	end
	if #units_creeps > 0 then
		for i = 1, #units_creeps do
			table.insert(units, units_creeps[i])
		end
	end

	if #units == 0 then
		return
	end

	local max_targets = math.min(self.max_targets, #units)

	local hit_hero = false

	for i = 1, max_targets do
		local unit = units[i]
		if IsValid(unit) then
			self:DealDamage(unit)
			if unit:IsRealHero() then
				hit_hero = true
			end
		end
	end

	self:LegendaryStack(hit_hero)
end

function zuus_heavenly_jump_custom:OnProjectileHit(target, location)
	if not target then
		return
	end
	target:EmitSound("Hero_Zuus.ProjectileImpact")
	target:EmitSound("Hero_Zuus.ArcLightning.Target")

	self.caster:AddNewModifier(self.caster, self, "modifier_zuus_heavenly_jump_custom_attacks_caster", {})
	self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_zuus_heavenly_jump_custom_attacks_caster")

	if self.caster.arc_ability then
		self.caster.arc_ability:ProcAttack(target)
	end
end

function zuus_heavenly_jump_custom:DealDamage(target)
	if not IsServer() then
		return
	end

	if self.talents.has_e1 == 1 then
		target:AddNewModifier(self.caster, self, "modifier_zuus_heavenly_jump_custom_attacks", {})
	end

	if self.caster.static_ability then
		self.caster.static_ability:DealDamage(target)
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_zuus_heavenly_jump_custom_debuff",
		{ duration = self.duration + self.talents.h1_slow }
	)
	target:EmitSound("Hero_Zuus.ArcLightning.Target")

	local thunder = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_zuus/zuus_shard_head.vpcf",
			self
		),
		PATTACH_ABSORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		thunder,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		thunder,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		thunder,
		2,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_origin",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(thunder)

	local self_particle = ParticleManager:CreateParticle("particles/zeus/zuus_glow.vpcf", PATTACH_POINT, self.caster)
	ParticleManager:SetParticleControlEnt(
		self_particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self_particle,
		2,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(self_particle)
end

function zuus_heavenly_jump_custom:LegendaryStack(hit_hero)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e7 == 0 then
		return
	end

	local duration = hit_hero and self.talents.e7_duration or self.talents.e7_duration_creeps
	local mod = self.caster:FindModifierByName("modifier_zuus_heavenly_jump_custom_legendary")
	if mod then
		duration = math.max(mod:GetRemainingTime(), duration)
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_zuus_heavenly_jump_custom_legendary",
		{ duration = duration }
	)
end

function zuus_heavenly_jump_custom:ProcEffects(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if self.talents.has_e7 == 1 then
		self.caster:CdAbility(self, nil, self.talents.e7_cd_inc, "modifier_zuus_jump_7")
	end

	if self.talents.has_e4 == 1 and not IsValid(self.jump_mod) then
		local mod = self.caster:FindModifierByName("modifier_zuus_heavenly_jump_custom_buff")
		if mod and not mod.leash_proc then
			mod.leash_proc = true
			target:RemoveModifierByName("modifier_zuus_heavenly_jump_custom_leash")
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_zuus_heavenly_jump_custom_leash",
				{ duration = (1 - target:GetStatusResistance()) * self.talents.e4_leash }
			)
		end
	end

	if self.talents.has_e3 == 0 then
		return
	end

	local duration = target:IsRealHero() and self.talents.e3_duration or self.talents.e3_duration_creeps
	local mod = self.caster:FindModifierByName("modifier_zuus_heavenly_jump_custom_stats")
	if mod then
		duration = math.max(mod:GetRemainingTime(), duration)
	end
	self.caster:AddNewModifier(self.caster, self, "modifier_zuus_heavenly_jump_custom_stats", { duration = duration })
end

modifier_zuus_heavenly_jump_custom_passive = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.jump_ability = self.ability

	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.speed_duration = self.ability:GetSpecialValueFor("speed_duration")
	self.ability.hop_distance = self.ability:GetSpecialValueFor("hop_distance")
	self.ability.hop_duration = self.ability:GetSpecialValueFor("hop_duration")
	self.ability.hop_height = self.ability:GetSpecialValueFor("hop_height")
	self.ability.range = self.ability:GetSpecialValueFor("range")
	self.ability.vision_duration = self.ability:GetSpecialValueFor("vision_duration")
	self.ability.vision_radius = self.ability:GetSpecialValueFor("vision_radius")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.move_slow = self.ability:GetSpecialValueFor("move_slow")
	self.ability.aspd_slow = self.ability:GetSpecialValueFor("aspd_slow")
	self.ability.max_targets = self.ability:GetSpecialValueFor("max_targets")
end

function modifier_zuus_heavenly_jump_custom_passive:OnRefresh()
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.hop_distance = self.ability:GetSpecialValueFor("hop_distance")
	self.ability.range = self.ability:GetSpecialValueFor("range")
end

function modifier_zuus_heavenly_jump_custom_passive:GetProcChance()
	return 100
end

function modifier_zuus_heavenly_jump_custom_passive:AttackProc(params, name)
	local target = params.target

	self.ability:ProcEffects(target)
end

function modifier_zuus_heavenly_jump_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_zuus_heavenly_jump_custom_passive:GetModifierAttackRangeBonus()
	if self.ability.talents.has_e7 == 0 then
		return
	end
	return self.ability.talents.e7_range
end

modifier_zuus_heavenly_jump_custom_debuff = class(mod_visible)
function modifier_zuus_heavenly_jump_custom_debuff:IsPurgable()
	return true
end
function modifier_zuus_heavenly_jump_custom_debuff:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.move_slow = self.ability.move_slow
	self.aspd_slow = self.ability.aspd_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf",
			self
		),
		self
	)
end

function modifier_zuus_heavenly_jump_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_zuus_heavenly_jump_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.move_slow
end

function modifier_zuus_heavenly_jump_custom_debuff:GetModifierAttackSpeedBonus_Constant()
	return self.aspd_slow
end

modifier_zuus_heavenly_jump_custom_legendary = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self:GetRemainingTime()
	self.speed = self.ability.talents.e7_speed
	self.max = self.ability.talents.e7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
	self:OnIntervalThink()
	self:StartIntervalThink(0.2)
end

function modifier_zuus_heavenly_jump_custom_legendary:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.duration = self:GetRemainingTime()

	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_zuus_heavenly_jump_custom_attack_speed_effect",
			{}
		)
	end
end

function modifier_zuus_heavenly_jump_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({
		max = self.duration,
		stack = self:GetRemainingTime(),
		override_stack = self:GetStackCount(),
		active = self:GetStackCount() >= self.max and 1 or 0,
		style = "ZeusJump",
	})
end

function modifier_zuus_heavenly_jump_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_zuus_heavenly_jump_custom_legendary:GetModifierAttackSpeedBonus_Constant(params)
	return self.speed * self:GetStackCount()
end

function modifier_zuus_heavenly_jump_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({ max = self.duration, stack = 0, active = 0, style = "ZeusJump" })
	self.parent:RemoveModifierByName("modifier_zuus_heavenly_jump_custom_attack_speed_effect")
end

modifier_zuus_heavenly_jump_custom_attack_speed_effect = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_attack_speed_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_mjollnir_shield.vpcf"
end
function modifier_zuus_heavenly_jump_custom_attack_speed_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_zuus_heavenly_jump_custom_attack_speed_effect:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:EmitSound("Zuus.Jump_speed")
	self.parent:EmitSound("Zuus.Jump_speed2")
	self.parent:GenericParticle("particles/zeus/zuus_speed_max.vpcf", self)
end

function modifier_zuus_heavenly_jump_custom_attack_speed_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_zuus_heavenly_jump_custom_attack_speed_effect:GetModifierModelScale()
	return 20
end

modifier_zuus_heavenly_jump_custom_illusion = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_illusion:GetStatusEffectName()
	return "particles/status_fx/status_effect_mjollnir_shield.vpcf"
end
function modifier_zuus_heavenly_jump_custom_illusion:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_zuus_heavenly_jump_custom_illusion:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.e4_radius
	self.stun = self.ability.talents.e4_stun

	self.parent:StartGesture(ACT_DOTA_GENERIC_CHANNEL_1)
	self.parent:GenericParticle("particles/units/heroes/hero_stormspirit/stormspirit_static_remnant.vpcf", self)
	self.parent:EmitSound("Zuus.Jump_remnant")

	self.t = -1
	self.timer = self.ability.talents.e4_delay * 2
	self:StartIntervalThink(0.5)
	self:OnIntervalThink()
end

function modifier_zuus_heavenly_jump_custom_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.t = self.t + 1

	local number = (self.timer - self.t) / 2
	local int = number

	if number % 1 ~= 0 then
		int = number - 0.5
	end

	local digits = math.floor(math.log10(number)) + 2
	local decimal = number % 1

	if decimal == 0.5 then
		decimal = 8
	else
		decimal = 1
	end

	local particle =
		ParticleManager:CreateParticle("particles/huskar/huskar_timer.vpcf", PATTACH_OVERHEAD_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(0, int, decimal))
	ParticleManager:SetParticleControl(particle, 2, Vector(digits, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_zuus_heavenly_jump_custom_illusion:OnDestroy()
	if not IsServer() then
		return
	end

	local particle_explode_fx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_techies/techies_stasis_trap_explode.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle_explode_fx, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle_explode_fx, 1, Vector(self.radius, 1, 1))
	ParticleManager:SetParticleControl(particle_explode_fx, 3, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle_explode_fx)

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_zuus/zuus_lightning_bolt_aoe.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("Zuus.Jump_illusion")

	for _, unit in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		unit:EmitSound("Zuus.Jump_stun")
		unit:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
		unit:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_stunned",
			{ duration = (1 - unit:GetStatusResistance()) * self.stun }
		)
	end
end

function modifier_zuus_heavenly_jump_custom_illusion:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
	}
end

function modifier_zuus_heavenly_jump_custom_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_zuus_heavenly_jump_custom_illusion:GetOverrideAnimation()
	return ACT_DOTA_GENERIC_CHANNEL_1
end

modifier_zuus_heavenly_jump_custom_invun = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

modifier_zuus_heavenly_jump_custom_attacks = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_attacks:OnCreated()
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self:SetStackCount(self.ability.talents.e1_attacks)

	self.info = {
		EffectName = "particles/units/heroes/hero_zuus/zuus_base_attack.vpcf",
		Ability = self.ability,
		iMoveSpeed = 1500,
		Source = self.caster,
		Target = self.parent,
		bDodgeable = true,
		bProvidesVision = true,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		iVisionRadius = 50,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	self:OnIntervalThink()
	self:StartIntervalThink(self.ability.talents.e1_interval)
end

function modifier_zuus_heavenly_jump_custom_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end

	ProjectileManager:CreateTrackingProjectile(self.info)

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
	end
end

modifier_zuus_heavenly_jump_custom_attacks_caster = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_attacks_caster:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.e1_damage - 100
end

function modifier_zuus_heavenly_jump_custom_attacks_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_zuus_heavenly_jump_custom_attacks_caster:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_zuus_heavenly_jump_custom_buff = class(mod_visible)
function modifier_zuus_heavenly_jump_custom_buff:IsPurgable()
	return true
end
function modifier_zuus_heavenly_jump_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.speed
	self.heal = 0
	if self.ability.talents.has_e2 == 1 then
		self.heal = self.ability.talents.e2_heal / self:GetRemainingTime()
		if IsServer() then
			self.parent:GenericParticle("particles/zeus/zuus_heal.vpcf", self)
		end
	end
end

function modifier_zuus_heavenly_jump_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_zuus_heavenly_jump_custom_buff:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e3_damage
end

function modifier_zuus_heavenly_jump_custom_buff:GetModifierHealthRegenPercentage()
	return self.heal
end

function modifier_zuus_heavenly_jump_custom_buff:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_zuus_heavenly_jump_custom_stats = class(mod_visible)
function modifier_zuus_heavenly_jump_custom_stats:GetTexture()
	return "buffs/zeus/jump_3"
end
function modifier_zuus_heavenly_jump_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.stats = self.ability.talents.e3_stats
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_zuus_heavenly_jump_custom_stats:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_zuus_heavenly_jump_custom_stats:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_zuus_heavenly_jump_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_zuus_heavenly_jump_custom_stats:GetModifierBonusStats_Strength()
	return self.stats * self:GetStackCount()
end

function modifier_zuus_heavenly_jump_custom_stats:GetModifierBonusStats_Agility()
	return self.stats * self:GetStackCount()
end

function modifier_zuus_heavenly_jump_custom_stats:GetModifierBonusStats_Intellect()
	return self.stats * self:GetStackCount()
end

modifier_zuus_heavenly_jump_custom_leash = class(mod_hidden)
function modifier_zuus_heavenly_jump_custom_leash:IsPurgable()
	return true
end
function modifier_zuus_heavenly_jump_custom_leash:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.e4_slow
	if not IsServer() then
		return
	end

	local illusion_self = CreateIllusions(self.caster, self.caster, {
		outgoing_damage = 0,
		duration = self.ability.talents.e4_delay,
	}, 1, 0, false, false)

	local point = self.parent:GetAbsOrigin() + RandomVector(150)
	for _, illusion in pairs(illusion_self) do
		illusion.owner = self.caster
		illusion:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_zuus_heavenly_jump_custom_illusion",
			{ duration = self.ability.talents.e4_delay }
		)
		illusion:SetOrigin(GetGroundPosition(point, nil))
	end

	self.parent:EmitSound("Hero_Zuus.ArcLightning.Target")

	local thunder = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_zuus/zuus_shard_head.vpcf",
			self.ability
		),
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		thunder,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		thunder,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		thunder,
		2,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_origin",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(thunder)

	self.parent:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
	self.parent:GenericParticle("particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", self)
end

function modifier_zuus_heavenly_jump_custom_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

function modifier_zuus_heavenly_jump_custom_leash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_zuus_heavenly_jump_custom_leash:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end