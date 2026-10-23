--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_tracker",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_slow",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_muerta_veil_2" }
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_slow_bonus",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_veil_2"
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_bva",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_veil_3"
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_attack_cd",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_veil_1"
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_burn",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_legendary_stack",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_veil_7"
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_legendary_magic",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_veil_7"
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_aura",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_pierce_the_veil_custom_aura_effect",
	"abilities/muerta/muerta_pierce_the_veil_custom",
	LUA_MODIFIER_MOTION_NONE
)

muerta_pierce_the_veil_custom = class({})
muerta_pierce_the_veil_custom.talents = {}
muerta_pierce_the_veil_custom.attack_lifesteal = true

function muerta_pierce_the_veil_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/sand_king/sand_pull.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_muerta/muerta_pierce_the_veil_spell_amp_bonus.vpcf",
		context
	)
	PrecacheResource("particle", "particles/muerta/muerta_quest_item.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_parting_shot_tether.vpcf", context)
	PrecacheResource("particle", "particles/muerta/veil_radius.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/wk_burn.vpcf", context)
	PrecacheResource("particle", "particles/muerta/magic_hit.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_item_active.vpcf", context)
	PrecacheResource("particle", "particles/muerta/resist_stackb.vpcf", context)
end

function muerta_pierce_the_veil_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_base = 0,
			r1_interval = caster:GetTalentValue("modifier_muerta_veil_1", "interval", true),
			r1_damage_type = caster:GetTalentValue("modifier_muerta_veil_1", "damage_type", true),
			r1_talent_cd = caster:GetTalentValue("modifier_muerta_veil_1", "talent_cd", true),
			r1_duration = caster:GetTalentValue("modifier_muerta_veil_1", "duration", true),
			r1_cd_inc = caster:GetTalentValue("modifier_muerta_veil_1", "cd_inc", true),
			r1_radius = caster:GetTalentValue("modifier_muerta_veil_1", "radius", true),

			has_r2 = 0,
			r2_range = 0,
			r2_slow = 0,
			r2_duration = caster:GetTalentValue("modifier_muerta_veil_2", "duration", true),
			r2_bonus = caster:GetTalentValue("modifier_muerta_veil_2", "bonus", true),

			has_r3 = 0,
			r3_duration_legendary = 0,
			r3_duration = 0,
			r3_effect_duration = caster:GetTalentValue("modifier_muerta_veil_3", "effect_duration", true),

			has_r4 = 0,
			r4_cd_inc_legendary = caster:GetTalentValue("modifier_muerta_veil_4", "cd_inc_legendary", true) / 100,

			has_r7 = 0,
			r7_fear = caster:GetTalentValue("modifier_muerta_veil_7", "fear", true),
			r7_duration_reduce = caster:GetTalentValue("modifier_muerta_veil_7", "duration_reduce", true),
			r7_max_magic = caster:GetTalentValue("modifier_muerta_veil_7", "max_magic", true),
			r7_shot_stack = caster:GetTalentValue("modifier_muerta_veil_7", "shot_stack", true),
			r7_duration = caster:GetTalentValue("modifier_muerta_veil_7", "duration", true),
			r7_stack_duration = caster:GetTalentValue("modifier_muerta_veil_7", "stack_duration", true),
			r7_pull_distance = caster:GetTalentValue("modifier_muerta_veil_7", "pull_distance", true),
			r7_pull_duration = caster:GetTalentValue("modifier_muerta_veil_7", "pull_duration", true),
			r7_magic = caster:GetTalentValue("modifier_muerta_veil_7", "magic", true),
			r7_radius = caster:GetTalentValue("modifier_muerta_veil_7", "radius", true),
			r7_max = caster:GetTalentValue("modifier_muerta_veil_7", "max", true),

			has_h6 = 0,
			h6_heal = caster:GetTalentValue("modifier_muerta_hero_6", "heal", true) / 100,
			h6_bonus = caster:GetTalentValue("modifier_muerta_hero_6", "bonus", true),
			h6_status = caster:GetTalentValue("modifier_muerta_hero_6", "status", true),

			has_e7 = 0,
			e7_damage_reduce = caster:GetTalentValue("modifier_muerta_gun_7", "damage_reduce", true) / 100,

			has_q7 = 0,

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_muerta_veil_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_muerta_veil_1", "damage") / 100
		self.talents.r1_base = caster:GetTalentValue("modifier_muerta_veil_1", "base")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_muerta_veil_2") then
		self.talents.has_r2 = 1
		self.talents.r2_range = caster:GetTalentValue("modifier_muerta_veil_2", "range")
		self.talents.r2_slow = caster:GetTalentValue("modifier_muerta_veil_2", "slow")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_muerta_veil_3") then
		self.talents.has_r3 = 1
		self.talents.r3_duration_legendary = caster:GetTalentValue("modifier_muerta_veil_3", "duration_legendary")
		self.talents.r3_duration = caster:GetTalentValue("modifier_muerta_veil_3", "duration")
	end

	if caster:HasTalent("modifier_muerta_veil_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_muerta_veil_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_muerta_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_muerta_gun_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_muerta_dead_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_muerta_calling_7") then
		self.talents.has_w7 = 1
	end
end

function muerta_pierce_the_veil_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_muerta_pierce_the_veil_custom_tracker"
end

function muerta_pierce_the_veil_custom:GetCastAnimation()
	return ACT_DOTA_CAST_ABILITY_4
end

function muerta_pierce_the_veil_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ (
			self.talents.has_h6 == 1
				and (DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE)
			or 0
		)
end

function muerta_pierce_the_veil_custom:OnSpellStart()
	local duration = self.duration
	local transform_duration = self.transform_duration
	local stack = 0

	if self.talents.has_r7 == 1 then
		local mod = self.caster:FindModifierByName("modifier_muerta_pierce_the_veil_custom_legendary_stack")
		if mod then
			local max_duration = self.talents.r7_max * self.talents.r7_duration + self.talents.r3_duration_legendary
			duration = duration + max_duration * (mod:GetStackCount() / self.talents.r7_max)
			stack = mod:GetStackCount()
			mod:Destroy()
		end
	else
		duration = duration + self.talents.r3_duration
	end

	self.caster:Purge(false, true, false, false, false)
	ProjectileManager:ProjectileDodge(self.caster)

	if self.talents.has_h6 == 1 then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)
		self.caster:GenericHeal(
			self.caster:GetMaxHealth() * self.talents.h6_heal,
			self,
			true,
			"",
			"modifier_muerta_hero_6"
		)
	end

	if stack >= self.talents.r7_max then
		local radius = self.talents.r7_radius
		local pull_duration = self.talents.r7_pull_duration

		local effect_cast =
			ParticleManager:CreateParticle("particles/sand_king/sand_pull.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect_cast, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, radius, radius))
		ParticleManager:ReleaseParticleIndex(effect_cast)

		for _, unit in pairs(self.caster:FindTargets(radius)) do
			local dir = (self.caster:GetAbsOrigin() - unit:GetAbsOrigin()):Normalized()
			local point = self.caster:GetAbsOrigin() - dir * 100

			local distance = (point - unit:GetAbsOrigin()):Length2D()
			distance = math.max(100, distance)
			point = unit:GetAbsOrigin() + dir * distance

			local mod = unit:AddNewModifier(self.caster, self, "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = distance,
				duration = pull_duration,
				height = 0,
				fix_end = false,
				isStun = true,
				activity = ACT_DOTA_FLAIL,
			})
			if mod then
				local particle = ParticleManager:CreateParticle(
					"particles/units/heroes/hero_muerta/muerta_parting_shot_tether.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					self.caster
				)
				ParticleManager:SetParticleControlEnt(
					particle,
					0,
					self.caster,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.caster:GetOrigin(),
					true
				)
				ParticleManager:SetParticleControlEnt(
					particle,
					1,
					unit,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					unit:GetOrigin(),
					true
				)
				mod:AddParticle(particle, false, false, -1, false, false)

				if IsValid(self.caster.dead_ability) then
					self.caster.dead_ability:ApplyFear(unit, self.talents.r7_fear, nil, nil, true)
				end
			end
		end
	end

	self.caster:RemoveModifierByName("modifier_muerta_pierce_the_veil_custom_attack_cd")

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_muerta_pierce_the_veil_buff",
		{ duration = duration + transform_duration }
	)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_muerta_pierce_the_veil_custom",
		{ duration = duration + transform_duration, stack = stack }
	)
	self.caster:EmitSound("Hero_Muerta.PierceTheVeil.Cast")
end

function muerta_pierce_the_veil_custom:LegendaryStack(is_shot)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r7 == 0 then
		return
	end
	if self:GetCooldownTimeRemaining() > 0 then
		return
	end
	if self.caster:HasModifier("modifier_muerta_pierce_the_veil_custom") then
		return
	end

	local stack = is_shot and self.talents.r7_shot_stack or 1
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_muerta_pierce_the_veil_custom_legendary_stack",
		{ duration = self.talents.r7_stack_duration, stack = stack }
	)
end

modifier_muerta_pierce_the_veil_custom = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom:GetPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_muerta_pierce_the_veil_custom:IsAura()
	return IsServer() and self.parent:IsAlive() and self:GetStackCount() >= self.ability.talents.r7_max_magic
end
function modifier_muerta_pierce_the_veil_custom:GetModifierAura()
	return "modifier_muerta_pierce_the_veil_custom_legendary_magic"
end
function modifier_muerta_pierce_the_veil_custom:GetAuraRadius()
	return self.ability.talents.r7_radius
end
function modifier_muerta_pierce_the_veil_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_muerta_pierce_the_veil_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_muerta_pierce_the_veil_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local slow_form = self.ability.talents.has_q7 == 1 or self.ability.talents.has_w7 == 1
	self.attack_speed = slow_form and 0 or self.ability.bonus_speed

	if not IsServer() then
		return
	end

	self.ability:EndCd()

	if slow_form then
		self.aura =
			self.parent:AddNewModifier(self.parent, self.ability, "modifier_muerta_pierce_the_veil_custom_aura", {})
	end

	self:SetStackCount(table.stack)

	if
		self.ability.talents.has_r3 == 1
		and (self.ability.talents.has_r7 == 0 or self:GetStackCount() >= self.ability.talents.r7_max)
	then
		self.bva =
			self.parent:AddNewModifier(self.parent, self.ability, "modifier_muerta_pierce_the_veil_custom_bva", {})
	end

	local new_model = wearables_system:GetUnitModelReplacement(self.parent, "ultimate", self.ability)
	if new_model then
		self.model_custom = new_model
	end

	self.max_time = self:GetRemainingTime()
	self.interval = 0.1
	self:StartIntervalThink(self.ability.transform_duration)
end

function modifier_muerta_pierce_the_veil_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_r7 == 1 then
		self.parent:UpdateUIshort({
			max_time = self.max_time,
			time = self:GetRemainingTime(),
			stack = self:GetRemainingTime(),
			use_zero = 1,
			active = 1,
			priority = 3,
			style = "MuertaVeil",
		})
	end

	if self.ability.talents.has_r4 == 1 then
		AddFOWViewer(
			self.parent:GetTeamNumber(),
			self.parent:GetAbsOrigin(),
			self.parent:GetDayTimeVisionRange(),
			self.interval,
			false
		)
	end

	self:StartIntervalThink(self.interval)
end

function modifier_muerta_pierce_the_veil_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.aura) then
		self.aura:Destroy()
	end

	if IsValid(self.bva) then
		if self.ability.talents.has_r7 == 1 then
			self.bva:Destroy()
		else
			self.bva:SetDuration(self.ability.talents.r3_effect_duration, true)
		end
	end

	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 3, style = "MuertaVeil" })

	if self.ability.talents.has_r4 == 1 and self:GetStackCount() > 0 then
		self.parent:CdAbility(
			self.ability,
			nil,
			self:GetStackCount() * self.ability.talents.r4_cd_inc_legendary,
			"modifier_muerta_veil_4"
		)
	end
end

function modifier_muerta_pierce_the_veil_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MODEL_CHANGE,
	}
end

function modifier_muerta_pierce_the_veil_custom:GetModifierModelChange()
	if self.model_custom then
		return self.model_custom
	end
end

function modifier_muerta_pierce_the_veil_custom:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed
end

function modifier_muerta_pierce_the_veil_custom:GetVisualZDelta()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return 50
end

function modifier_muerta_pierce_the_veil_custom:CheckState()
	local result = {}
	if self:GetElapsedTime() < self.ability.transform_duration then
		result[MODIFIER_STATE_STUNNED] = true
	end
	if self.ability.talents.has_r4 == 1 then
		result[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true
		result[MODIFIER_STATE_UNSLOWABLE] = true
	end
	return result
end

modifier_muerta_pierce_the_veil_custom_tracker = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_tracker:IsAura()
	return true
end
function modifier_muerta_pierce_the_veil_custom_tracker:GetModifierAura()
	return "modifier_muerta_pierce_the_veil"
end
function modifier_muerta_pierce_the_veil_custom_tracker:GetAuraRadius()
	return 50
end
function modifier_muerta_pierce_the_veil_custom_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_muerta_pierce_the_veil_custom_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_muerta_pierce_the_veil_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.veil_ability = self.ability

	self.ability.bonus_speed = self.ability:GetSpecialValueFor("bonus_speed")
	self.ability.aura_slow = self.ability:GetSpecialValueFor("aura_slow")
	self.ability.aura_health = self.ability:GetSpecialValueFor("aura_health")
	self.ability.aura_radius = self.ability:GetSpecialValueFor("aura_radius")
	self.ability.aura_linger = self.ability:GetSpecialValueFor("aura_linger")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.transform_duration = self.ability:GetSpecialValueFor("transform_duration")
	self.ability.damage_reduce = self.ability:GetSpecialValueFor("damage_reduce")
	self.ability.modelscale = self.ability:GetSpecialValueFor("modelscale")
end

function modifier_muerta_pierce_the_veil_custom_tracker:OnRefresh()
	self.ability.bonus_speed = self.ability:GetSpecialValueFor("bonus_speed")
	self.ability.aura_slow = self.ability:GetSpecialValueFor("aura_slow")
	self.ability.aura_health = self.ability:GetSpecialValueFor("aura_health")
end

function modifier_muerta_pierce_the_veil_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_muerta_pierce_the_veil_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if not params.inflictor or params.inflictor ~= self.ability then
		return
	end
	return (
		self.ability.damage_reduce
		* (1 + (self.ability.talents.has_e7 == 1 and self.ability.talents.e7_damage_reduce or 0))
	) - 100
end

function modifier_muerta_pierce_the_veil_custom_tracker:GetModifierAttackRangeBonus(params)
	local bonus = 1
	if
		(self.parent:IsAttackImmune() or (params.target and params.target:IsAttackImmune()))
		and IsValid(self.parent.veil_ability)
	then
		bonus = self.ability.talents.r2_bonus
	end
	return self.ability.talents.r2_range * bonus
end

function modifier_muerta_pierce_the_veil_custom_tracker:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_status
		* (self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom") and self.ability.talents.h6_bonus or 1)
end

function modifier_muerta_pierce_the_veil_custom_tracker:GetProcChance()
	return 100
end

function modifier_muerta_pierce_the_veil_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_r2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_muerta_pierce_the_veil_custom_slow",
			{ duration = self.ability.talents.r2_duration }
		)
	end

	if
		self.ability.talents.has_r1 == 1
		and not self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom_attack_cd")
	then
		local cd = self.ability.talents.r1_talent_cd
			/ (
				self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom") and self.ability.talents.r1_cd_inc or 1
			)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_muerta_pierce_the_veil_custom_attack_cd",
			{ duration = cd }
		)

		local particle = ParticleManager:CreateParticle("particles/muerta/magic_hit.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)

		local damage = self.parent:GetIntellect(false) * self.ability.talents.r1_damage + self.ability.talents.r1_base
		for _, unit in pairs(self.parent:FindTargets(self.ability.talents.r1_radius, target:GetAbsOrigin())) do
			unit:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_muerta_pierce_the_veil_custom_burn",
				{ damage = damage }
			)
		end
	end
end

function modifier_muerta_pierce_the_veil_custom_tracker:GetAuraEntityReject(hEntity)
	return hEntity ~= self.parent
end

modifier_muerta_pierce_the_veil_custom_slow = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_slow:IsPurgable()
	return true
end
function modifier_muerta_pierce_the_veil_custom_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.r2_slow
	self.bonus = self.ability.talents.r2_bonus
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/muerta/muerta_attack_slow.vpcf", self)
end

function modifier_muerta_pierce_the_veil_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_muerta_pierce_the_veil_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
		* (self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom_slow_bonus") and self.bonus or 1)
end

modifier_muerta_pierce_the_veil_custom_slow_bonus = class(mod_visible)
function modifier_muerta_pierce_the_veil_custom_slow_bonus:IsPurgable()
	return true
end
function modifier_muerta_pierce_the_veil_custom_slow_bonus:GetTexture()
	return "buffs/muerta/veil_2"
end

modifier_muerta_pierce_the_veil_custom_attack_cd = class(mod_cd)
function modifier_muerta_pierce_the_veil_custom_attack_cd:GetTexture()
	return "buffs/muerta/veil_1"
end

modifier_muerta_pierce_the_veil_custom_bva = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_bva:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:EmitSound("Muerta.Item_activate")
	self.parent:EmitSound("Muerta.Item_activate2")
	self.parent:GenericParticle("particles/muerta/muerta_item_active.vpcf", self)
end

modifier_muerta_pierce_the_veil_custom_burn = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_burn:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = 1
	self.duration = self.ability.talents.r1_duration

	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage_type = self.ability.talents.r1_damage_type,
		ability = self.caster.muerta_innate,
	}
	if not IsServer() then
		return
	end

	self.parent:GenericParticle("particles/wraith_king/wk_burn.vpcf", self)

	self:OnRefresh(table)
	self:StartIntervalThink(self.interval)
end

function modifier_muerta_pierce_the_veil_custom_burn:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + table.damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration / self.interval
	self.damageTable.damage = self.tick
end

function modifier_muerta_pierce_the_veil_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end

	local real_damage = DoDamage(self.damageTable, "modifier_muerta_veil_1")
	self.parent:SendNumber(9, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1

	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_muerta_pierce_the_veil_custom_legendary_stack = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_legendary_stack:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r7_max

	self:OnRefresh(table)
	self.interval = 0.1
	self.max_time = self:GetRemainingTime()

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_muerta_pierce_the_veil_custom_legendary_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:SetStackCount(math.min(self.max, self:GetStackCount() + table.stack))

	if self:GetStackCount() >= self.max then
		self.radius_visual = ParticleManager:CreateParticleForPlayer(
			"particles/muerta/veil_radius.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent,
			self.parent:GetPlayerOwner()
		)
		ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.ability.talents.r7_radius, 0, 0))
		self:AddParticle(self.radius_visual, false, false, -1, false, false)
	end
end

function modifier_muerta_pierce_the_veil_custom_legendary_stack:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetStackCount(),
		priority = 3,
		active = 0,
		style = "MuertaVeil",
	})
end

function modifier_muerta_pierce_the_veil_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom") then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 3, style = "MuertaVeil" })
end

modifier_muerta_pierce_the_veil_custom_legendary_magic = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_legendary_magic:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.r7_magic
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/muerta/resist_stackb.vpcf", self, true)
end

function modifier_muerta_pierce_the_veil_custom_legendary_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_muerta_pierce_the_veil_custom_legendary_magic:GetModifierMagicalResistanceBonus()
	return self.magic
end

modifier_muerta_pierce_the_veil_custom_aura = class(mod_hidden)
function modifier_muerta_pierce_the_veil_custom_aura:IsAura()
	return true
end
function modifier_muerta_pierce_the_veil_custom_aura:GetModifierAura()
	return "modifier_muerta_pierce_the_veil_custom_aura_effect"
end
function modifier_muerta_pierce_the_veil_custom_aura:GetAuraRadius()
	return self.ability.aura_radius
end
function modifier_muerta_pierce_the_veil_custom_aura:GetAuraDuration()
	return self.ability.aura_linger
end
function modifier_muerta_pierce_the_veil_custom_aura:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_muerta_pierce_the_veil_custom_aura:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_muerta_pierce_the_veil_custom_aura:OnCreated()
	self.ability = self:GetAbility()
end

modifier_muerta_pierce_the_veil_custom_aura_effect = class(mod_visible)
function modifier_muerta_pierce_the_veil_custom_aura_effect:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.aura_slow
	self.health = self.ability.aura_health

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/muerta/muerta_attack_slow.vpcf", self)

	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_muerta_pierce_the_veil_custom_aura_effect:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_muerta_pierce_the_veil_custom_aura_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_muerta_pierce_the_veil_custom_aura_effect:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_muerta_pierce_the_veil_custom_aura_effect:GetModifierExtraHealthPercentage()
	return self.health
end