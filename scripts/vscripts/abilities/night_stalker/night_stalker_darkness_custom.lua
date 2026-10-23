--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_night_stalker_darkness_custom",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_active",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_armor",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_dark_3"
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_vision",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_legendary_prep",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_legendary_dash",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_burn",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_burn_cd",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_dark_1"
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_bkb_cd",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_dark_4"
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_blind_cd",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_stalker_hero_5" }
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_blind_flight",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_hero_5"
)
LinkLuaModifier(
	"modifier_night_stalker_darkness_custom_blind_status",
	"abilities/night_stalker/night_stalker_darkness_custom",
	LUA_MODIFIER_MOTION_NONE
)

night_stalker_darkness_custom = class({})
night_stalker_darkness_custom.talents = {}

function night_stalker_darkness_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_ulti.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_dark_buff.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_legedary_vector.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_legendary_charge.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_legendary_charge_2.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_legendary_prep.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_legendary_hit.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_bleed.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_armor.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/flight_blind.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/dark_shield.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_charge_effect.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_caster.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_hit.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_hit_2.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/void_magic.vpcf", context)
end

function night_stalker_darkness_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_talent_cd = caster:GetTalentValue("modifier_stalker_dark_1", "talent_cd", true),
			r1_interval = caster:GetTalentValue("modifier_stalker_dark_1", "interval", true),
			r1_duration = caster:GetTalentValue("modifier_stalker_dark_1", "duration", true),
			r1_damage_type = caster:GetTalentValue("modifier_stalker_dark_1", "damage_type", true),
			r1_cd_min = caster:GetTalentValue("modifier_stalker_dark_1", "cd_min", true),

			r2_cd = 0,
			r2_heal = 0,
			r2_bonus = caster:GetTalentValue("modifier_stalker_dark_2", "bonus", true),

			has_r3 = 0,
			r3_heal_reduce = 0,
			r3_armor = 0,
			r3_base = 0,
			r3_duration = caster:GetTalentValue("modifier_stalker_dark_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_stalker_dark_3", "max", true),

			has_r4 = 0,
			r4_duration_legendary = caster:GetTalentValue("modifier_stalker_dark_4", "duration_legendary", true),
			r4_talent_cd = caster:GetTalentValue("modifier_stalker_dark_4", "talent_cd", true),
			r4_bkb = caster:GetTalentValue("modifier_stalker_dark_4", "bkb", true),
			r4_duration = caster:GetTalentValue("modifier_stalker_dark_4", "duration", true),
			r4_max = caster:GetTalentValue("modifier_stalker_dark_4", "max", true),

			has_r7 = 0,
			r7_cd_inc = caster:GetTalentValue("modifier_stalker_dark_7", "cd_inc", true),

			has_h5 = 0,
			h5_talent_cd = caster:GetTalentValue("modifier_stalker_hero_5", "talent_cd", true),
			h5_health = caster:GetTalentValue("modifier_stalker_hero_5", "health", true),
			h5_blind = caster:GetTalentValue("modifier_stalker_hero_5", "blind", true),
			h5_magic = caster:GetTalentValue("modifier_stalker_hero_5", "magic", true),
			h5_radius = caster:GetTalentValue("modifier_stalker_hero_5", "radius", true),
			h5_duration = caster:GetTalentValue("modifier_stalker_hero_5", "duration", true),

			has_h6 = 0,
			h6_shield = caster:GetTalentValue("modifier_stalker_hero_6", "shield", true) / 100,
			h6_status = caster:GetTalentValue("modifier_stalker_hero_6", "status", true),
			h6_base = caster:GetTalentValue("modifier_stalker_hero_6", "base", true),
		}
	end

	if caster:HasTalent("modifier_stalker_dark_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_stalker_dark_1", "damage") / 100
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_stalker_dark_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_stalker_dark_2", "cd")
		self.talents.r2_heal = caster:GetTalentValue("modifier_stalker_dark_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_stalker_dark_2",
			type = 2,
			value = function()
				if caster:HasModifier("modifier_night_stalker_darkness_custom_active") then
					return self.talents.r2_heal * self.talents.r2_bonus
				end
				return self.talents.r2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_stalker_dark_3") then
		self.talents.has_r3 = 1
		self.talents.r3_heal_reduce = caster:GetTalentValue("modifier_stalker_dark_3", "heal_reduce")
		self.talents.r3_base = caster:GetTalentValue("modifier_stalker_dark_3", "base")
		self.talents.r3_armor = caster:GetTalentValue("modifier_stalker_dark_3", "armor") / 100
	end

	if caster:HasTalent("modifier_stalker_dark_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_stalker_dark_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_stalker_hero_5") then
		self.talents.has_h5 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_stalker_hero_6") then
		self.talents.has_h6 = 1
	end
end

function night_stalker_darkness_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_night_stalker_darkness_custom"
end

function night_stalker_darkness_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.r2_cd or 0)
end

function night_stalker_darkness_custom:OnSpellStart()
	EmitSoundOn("Hero_Nightstalker.Darkness", self.caster)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_night_stalker_darkness_custom_active",
		{ duration = self.duration }
	)
end

function night_stalker_darkness_custom:ProcBkb()
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r4 == 0 then
		return
	end
	if self.caster:HasModifier("modifier_night_stalker_darkness_custom_bkb_cd") then
		return
	end
	if not self.caster:HasModifier("modifier_night_stalker_darkness_custom_active") then
		return
	end

	self.caster:EmitSound("Stalker.Dark_bkb")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_generic_debuff_immune",
		{ duration = self.talents.r4_bkb, effect = 2 }
	)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_night_stalker_darkness_custom_bkb_cd",
		{ duration = self.talents.r4_talent_cd }
	)
end

modifier_night_stalker_darkness_custom = class(mod_hidden)
function modifier_night_stalker_darkness_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.dark_legendary_ability = self.parent:FindAbilityByName("night_stalker_darkness_custom_legendary")
	if self.parent.dark_legendary_ability then
		self.parent.dark_legendary_ability:UpdateTalents()
	end

	self.parent.dark_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.bonus_day_vision = self.ability:GetSpecialValueFor("bonus_day_vision")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.vision_reduce = self.ability:GetSpecialValueFor("vision_reduce")

	self.ability.shard_slow = self.ability:GetSpecialValueFor("shard_slow")
	self.ability.shard_slow_turn = self.ability:GetSpecialValueFor("shard_slow_turn")
	self.ability.shard_cd = self.ability:GetSpecialValueFor("shard_cd") / 100
	self.ability.shard_chance = self.ability:GetSpecialValueFor("shard_chance")
	self.ability.shard_crit = self.ability:GetSpecialValueFor("shard_crit")
end

function modifier_night_stalker_darkness_custom:OnRefresh(table)
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_night_stalker_darkness_custom:GetProcChance()
	return 100
end

function modifier_night_stalker_darkness_custom:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_r7 == 0 and target:IsRealHero() then
		local mod = self.parent:FindModifierByName("modifier_night_stalker_darkness_custom_active")
		if mod then
			mod:ExtendDuration()
		end
		self.ability:ProcBkb()
	end

	if
		self.ability.talents.has_r1 == 1 and not target:HasModifier("modifier_night_stalker_darkness_custom_burn_cd")
	then
		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		vec.z = 0
		local particle_edge_fx = ParticleManager:CreateParticle(
			"particles/night_stalker/dark_legendary_hit.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle_edge_fx,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle_edge_fx,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlForward(particle_edge_fx, 2, vec)
		ParticleManager:SetParticleControl(
			particle_edge_fx,
			5,
			self.parent:GetAttachmentOrigin(self.parent:ScriptLookupAttachment("attach_hitloc"))
		)
		ParticleManager:SetParticleControlForward(particle_edge_fx, 5, vec)
		ParticleManager:ReleaseParticleIndex(particle_edge_fx)

		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_night_stalker_darkness_custom_burn_cd",
			{ duration = self.ability.talents.r1_talent_cd }
		)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_night_stalker_darkness_custom_burn",
			{ damage = params.damage * self.ability.talents.r1_damage }
		)
	end
end

function modifier_night_stalker_darkness_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_night_stalker_darkness_custom_blind_cd") then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.h5_health then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end

	self.parent:Purge(false, true, false, true, true)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_night_stalker_darkness_custom_blind_flight",
		{ duration = self.ability.talents.h5_duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_night_stalker_darkness_custom_blind_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
end

function modifier_night_stalker_darkness_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_night_stalker_darkness_custom:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_magic
end

modifier_night_stalker_darkness_custom_active = class(mod_visible)
function modifier_night_stalker_darkness_custom_active:IsAura()
	return IsServer() and self.parent:IsAlive()
end
function modifier_night_stalker_darkness_custom_active:GetAuraDuration()
	return 0
end
function modifier_night_stalker_darkness_custom_active:GetAuraRadius()
	return self.radius
end
function modifier_night_stalker_darkness_custom_active:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_night_stalker_darkness_custom_active:GetAuraSearchType()
	return DOTA_UNIT_TARGET_ALL
end
function modifier_night_stalker_darkness_custom_active:GetModifierAura()
	return "modifier_night_stalker_darkness_custom_vision"
end
function modifier_night_stalker_darkness_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.bonus_damage
	self.radius = self.ability.radius
	self.bonus_vision = self.ability.bonus_day_vision

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if IsValid(self.parent.stalker_innate_ability) and self.parent.stalker_innate_ability.tracker then
		self.parent.stalker_innate_ability.tracker:OnIntervalThink()
	end

	self.parent:Stop()
	if
		self.parent.dark_legendary_ability
		and self.ability.talents.has_r7 == 1
		and self.parent.dark_legendary_ability:GetCooldownTimeRemaining() > self.ability.talents.r7_cd_inc
	then
		self.parent.dark_legendary_ability:EndCooldown()
		self.parent.dark_legendary_ability:StartCooldown(self.ability.talents.r7_cd_inc)
	end

	self.parent:GenericParticle("particles/units/heroes/hero_night_stalker/nightstalker_ulti.vpcf")
	self.parent:GenericParticle("particles/units/heroes/hero_night_stalker/nightstalker_dark_buff.vpcf", self)

	self.ability:EndCd()

	if not self.ability:IsStolen() then
		dota1x6.NIGHT_STALKER_TEAM = self.parent:GetTeamNumber()
	end

	if self.ability.talents.has_h6 == 1 then
		self.ability.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
			start_full = 1,
			max_shield = self.ability.talents.h6_base + self.parent:GetMaxHealth() * self.ability.talents.h6_shield,
			shield_talent = "modifier_stalker_hero_6",
			dont_destroy = 1,
		})
		if self.ability.shield_mod then
			self.particle = ParticleManager:CreateParticle(
				"particles/night_stalker/dark_shield.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				self.particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			self.ability.shield_mod:AddParticle(self.particle, false, false, -1, false, false)
		end
	end

	self.more_time = 0
	self.max_time = self:GetRemainingTime()

	if self.ability.talents.has_r7 == 0 then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_night_stalker_darkness_custom_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time + self.more_time,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		priority = 2,
		style = "StalkerDark",
	})
end

function modifier_night_stalker_darkness_custom_active:OnDestroy()
	if not IsServer() then
		return
	end

	if not self.parent:HasModifier("modifier_night_stalker_darkness_custom_blind_flight") then
		self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_3_END)
	end

	if IsValid(self.ability.shield_mod) then
		self.ability.shield_mod:Destroy()
	end

	if not self.ability:IsStolen() then
		dota1x6.NIGHT_STALKER_TEAM = nil
	end

	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "StalkerDark" })
end

function modifier_night_stalker_darkness_custom_active:ExtendDuration()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if self.more_time >= self.ability.talents.r4_max then
		return
	end

	local inc = self.ability.talents.has_r7 == 1 and self.ability.talents.r4_duration_legendary
		or self.ability.talents.r4_duration
	self.more_time = self.more_time + inc
	self:SetDuration(self:GetRemainingTime() + inc, true)
end

function modifier_night_stalker_darkness_custom_active:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_FORCED_FLYING_VISION] = true,
	}
end

function modifier_night_stalker_darkness_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BONUS_DAY_VISION,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_night_stalker_darkness_custom_active:GetCritChance()
	if not self.parent:HasShard() then
		return 0
	end
	return self.ability.shard_chance
end

function modifier_night_stalker_darkness_custom_active:GetCritDamage()
	if not self.parent:HasShard() then
		return
	end
	return self.ability.shard_crit
end

function modifier_night_stalker_darkness_custom_active:GetModifierPreAttack_CriticalStrike()
	if not IsServer() then
		return
	end
	if not self.parent:HasShard() then
		return
	end
	if not RollPseudoRandomPercentage(self:GetCritChance(), 1295, self.parent) then
		return
	end

	return self:GetCritDamage()
end

function modifier_night_stalker_darkness_custom_active:GetVisualZDelta()
	return 60
end

function modifier_night_stalker_darkness_custom_active:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_status
end

function modifier_night_stalker_darkness_custom_active:GetBonusDayVision()
	return self.bonus_vision
end

function modifier_night_stalker_darkness_custom_active:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function modifier_night_stalker_darkness_custom_active:GetActivityTranslationModifiers()
	return "hunter_night"
end

function modifier_night_stalker_darkness_custom_active:GetAuraEntityReject(hEntity)
	if hEntity:IsFieldInvun(self.parent) then
		return true
	end
	if
		hEntity:GetUnitName() == "npc_dota_observer_wards"
		or hEntity:GetUnitName() == "npc_dota_sentry_wards"
		or hEntity:IsUnit()
	then
		return false
	end
	return true
end

modifier_night_stalker_darkness_custom_vision = class(mod_visible)
function modifier_night_stalker_darkness_custom_vision:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.is_ward = self.parent:GetUnitName() == "npc_dota_observer_wards"
		or self.parent:GetUnitName() == "npc_dota_sentry_wards"
	self.vision = self.ability.vision_reduce

	if not IsServer() then
		return
	end

	if not self.is_ward and IsValid(self.caster.fear_ability) then
		self.caster.fear_ability:CheckRegen(self)
	end

	if self.is_ward then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end
	self:StartIntervalThink(1)
end

function modifier_night_stalker_darkness_custom_vision:OnDestroy()
	if not IsServer() then
		return
	end

	if not self.is_ward and IsValid(self.caster.fear_ability) then
		self.caster.fear_ability:CheckRegen(self, true)
	end
end

function modifier_night_stalker_darkness_custom_vision:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsHero() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_night_stalker_darkness_custom_armor",
		{ duration = self.ability.talents.r3_duration }
	)
end

function modifier_night_stalker_darkness_custom_vision:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_FIXED_DAY_VISION,
		MODIFIER_PROPERTY_FIXED_NIGHT_VISION,
	}
end

function modifier_night_stalker_darkness_custom_vision:CheckState()
	if not self.is_ward then
		return
	end
	return {
		[MODIFIER_STATE_BLIND] = true,
	}
end

function modifier_night_stalker_darkness_custom_vision:GetFixedNightVision()
	return self.vision
end

function modifier_night_stalker_darkness_custom_vision:GetFixedDayVision()
	return self.vision
end

modifier_night_stalker_darkness_custom_burn = class(mod_hidden)
function modifier_night_stalker_darkness_custom_burn:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.duration = self.ability.talents.r1_duration
	self.interval = self.ability.talents.r1_interval
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.r1_damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}

	self.effect = ParticleManager:CreateParticle(
		"particles/night_stalker/dark_bleed.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.RemoveForDuel = true
	self:AddStack(table.damage)
	self:StartIntervalThink(self.interval)
end

function modifier_night_stalker_darkness_custom_burn:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.damage)
end

function modifier_night_stalker_darkness_custom_burn:AddStack(damage)
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Stalker.Dark_burn")

	self.total_damage = self.total_damage + damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration
	self.damageTable.damage = self.tick
	ParticleManager:SetParticleControl(self.effect, 2, Vector(self.tick, 0, 0))
end

function modifier_night_stalker_darkness_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_stalker_dark_1")
	self.parent:SendNumber(103, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_night_stalker_darkness_custom_burn_cd = class(mod_hidden)
function modifier_night_stalker_darkness_custom_burn_cd:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not self.parent:IsRealHero() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(0.2)
end

function modifier_night_stalker_darkness_custom_burn_cd:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:CanEntityBeSeenByMyTeam(self.caster) then
		return
	end

	local duration = math.max(0, self.ability.talents.r1_cd_min - self:GetElapsedTime())
	self:SetDuration(duration, true)
	self:StartIntervalThink(-1)
end

modifier_night_stalker_darkness_custom_armor = class(mod_visible)
function modifier_night_stalker_darkness_custom_armor:GetTexture()
	return "buffs/night_stalker/dark_3"
end
function modifier_night_stalker_darkness_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.armor = self.ability.talents.r3_armor / self.max
	self.heal_reduce = self.ability.talents.r3_heal_reduce / self.max
	self.base_reduce = self.ability.talents.r3_base / self.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:SetHasCustomTransmitterData(true)
	self:OnRefresh()
end

function modifier_night_stalker_darkness_custom_armor:OnRefresh()
	if not IsServer() then
		return
	end
	self.base_armor = self.parent:GetArmor(self)
	self:SendBuffRefreshToClients()

	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= 8 and not self.effect then
		self.parent:EmitSound("Stalker.Dark_armor")
		self.effect = self.parent:GenericParticle("particles/night_stalker/dark_armor.vpcf", self, true)
		self.parent:GenericParticle("particles/night_stalker/void_magic.vpcf", self)
	end
end

function modifier_night_stalker_darkness_custom_armor:AddCustomTransmitterData()
	return {
		base_armor = self.base_armor,
	}
end

function modifier_night_stalker_darkness_custom_armor:HandleCustomTransmitterData(data)
	self.base_armor = data.base_armor
end

function modifier_night_stalker_darkness_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_night_stalker_darkness_custom_armor:GetModifierPhysicalArmorBonus()
	if not self.base_armor then
		return
	end
	return (self.base_reduce + self.base_armor * self.armor) * self:GetStackCount()
end

function modifier_night_stalker_darkness_custom_armor:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_night_stalker_darkness_custom_armor:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

modifier_night_stalker_darkness_custom_bkb_cd = class(mod_cd)
function modifier_night_stalker_darkness_custom_bkb_cd:GetTexture()
	return "buffs/night_stalker/dark_4"
end

modifier_night_stalker_darkness_custom_blind_cd = class(mod_cd)
function modifier_night_stalker_darkness_custom_blind_cd:GetTexture()
	return "buffs/night_stalker/hero_5"
end

modifier_night_stalker_darkness_custom_blind_flight = class(mod_visible)
function modifier_night_stalker_darkness_custom_blind_flight:GetTexture()
	return "buffs/night_stalker/hero_5"
end
function modifier_night_stalker_darkness_custom_blind_flight:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end

	if IsValid(self.parent.stalker_innate_ability) and self.parent.stalker_innate_ability.tracker then
		self.parent.stalker_innate_ability.tracker:OnIntervalThink()
	end

	self.parent:EmitSound("Stalker.Flight_lowhp")
	self.parent:EmitSound("Stalker.Flight_lowhp2")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_night_stalker_darkness_custom_blind_status",
		{ duration = 1 }
	)
	self.parent:StartGesture(ACT_DOTA_NIGHTSTALKER_TRANSITION)

	if not self.parent:IsChanneling() then
		self.parent:Stop()
	end

	self.origin = self.parent:GetAbsOrigin()
	self.radius = self.ability.talents.h5_radius
	self.speed = 1500
	local duration = self.radius / self.speed

	self.effect_cast =
		ParticleManager:CreateParticle("particles/night_stalker/flight_blind.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.origin)
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.speed, self.radius, duration))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self.targets = {}
	self.current_radius = self.radius * 0.1
	self.interval = 0.1

	self.midnight_ability = self.parent.midnight_ability

	if not IsValid(self.midnight_ability) then
		return
	end
	self:StartIntervalThink(self.interval)
end

function modifier_night_stalker_darkness_custom_blind_flight:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.current_radius = self.current_radius + self.speed * self.interval

	for _, target in pairs(self.parent:FindTargets(self.current_radius, self.origin)) do
		if not self.targets[target] and target:IsRealHero() then
			self.targets[target] = true
			target:EmitSound("Stalker.Flight_lowhp_hit")
			local mod = target:FindModifierByName("modifier_night_stalker_midnight_feast_custom_legendary")
			if mod then
				mod:SetDuration(mod:GetRemainingTime() + self.ability.talents.h5_blind, true)
			else
				target:AddNewModifier(
					target,
					self.midnight_ability,
					"modifier_night_stalker_midnight_feast_custom_legendary",
					{ duration = self.ability.talents.h5_blind }
				)
			end
		end
	end

	if self.current_radius >= self.radius then
		self:StartIntervalThink(-1)
		return
	end
end

function modifier_night_stalker_darkness_custom_blind_flight:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_night_stalker_darkness_custom_active") then
		return
	end
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_3_END)
end

function modifier_night_stalker_darkness_custom_blind_flight:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_FORCED_FLYING_VISION] = true,
	}
end

function modifier_night_stalker_darkness_custom_blind_flight:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_night_stalker_darkness_custom_blind_flight:GetVisualZDelta()
	return 60
end

function modifier_night_stalker_darkness_custom_blind_flight:GetActivityTranslationModifiers()
	return "hunter_night"
end

modifier_night_stalker_darkness_custom_blind_status = class(mod_hidden)
function modifier_night_stalker_darkness_custom_blind_status:GetStatusEffectName()
	return "particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf"
end
function modifier_night_stalker_darkness_custom_blind_status:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end

night_stalker_darkness_custom_legendary = class({})
night_stalker_darkness_custom_legendary.talents = {}

function night_stalker_darkness_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_cd_inc = caster:GetTalentValue("modifier_stalker_dark_7", "cd_inc", true),
			r7_charge = caster:GetTalentValue("modifier_stalker_dark_7", "charge", true),
			r7_talent_cd = caster:GetTalentValue("modifier_stalker_dark_7", "talent_cd", true),
			r7_speed = caster:GetTalentValue("modifier_stalker_dark_7", "speed", true),
			r7_width = caster:GetTalentValue("modifier_stalker_dark_7", "width", true),
			r7_damage = caster:GetTalentValue("modifier_stalker_dark_7", "damage", true),
			r7_range = caster:GetTalentValue("modifier_stalker_dark_7", "range", true),
			r7_stun = caster:GetTalentValue("modifier_stalker_dark_7", "stun", true),

			has_e3 = 0,
			e3_chance = 0,
		}
	end

	if caster:HasTalent("modifier_stalker_hunter_3") then
		self.talents.has_e3 = 1
		self.talents.e3_chance = caster:GetTalentValue("modifier_stalker_hunter_3", "chance")
	end
end

function night_stalker_darkness_custom_legendary:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	if IsServer() then
		self:SetLevel(1)
	end
end

function night_stalker_darkness_custom_legendary:GetCastRange(vector, hTarget)
	return IsClient() and ((self.talents.r7_range or 0) - self.caster:GetCastRangeBonus()) or 99999
end

function night_stalker_darkness_custom_legendary:GetCooldown()
	return self.caster:HasModifier("modifier_night_stalker_darkness_custom_active") and (self.talents.r7_cd_inc or 0)
		or (self.talents.r7_talent_cd or 0)
end

function night_stalker_darkness_custom_legendary:OnSpellStart()
	local point = self:GetCursorPosition()
	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	self.caster:FacePoint(point)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_night_stalker_darkness_custom_legendary_prep",
		{ duration = self.talents.r7_charge }
	)
end

modifier_night_stalker_darkness_custom_legendary_prep = class(mod_visible)
function modifier_night_stalker_darkness_custom_legendary_prep:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.anim = ACT_DOTA_TELEPORT
	if self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		self.anim = ACT_DOTA_VICTORY
	end

	if not IsServer() then
		return
	end
	self.ability:EndCd()

	if self.parent.dark_ability then
		self.parent.dark_ability:ProcBkb()
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_stalker_dark",
		{ state = 1 }
	)

	local particle =
		ParticleManager:CreateParticle("particles/night_stalker/dark_legendary_prep.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, GetGroundPosition(self.parent:GetAbsOrigin(), nil))
	self:AddParticle(particle, false, false, -1, false, false)

	EmitSoundOn("Stalker.Dark_legendary_prep", self.parent)
	EmitSoundOn("Stalker.Dark_legendary_prep2", self.parent)

	self.turn_speed = 150
	self.range = self.ability.talents.r7_range

	self.parent:AddOrderEvent(self)

	self.target_angle = self.parent:GetAnglesAsVector().y
	self.current_angle = self.target_angle
	self.face_target = true

	self.interval = 0.03
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_night_stalker_darkness_custom_legendary_prep:OnDestroy()
	if not IsServer() then
		return
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_stalker_dark",
		{ state = 2 }
	)

	self.ability:StartCd()
	self.parent:FadeGesture(ACT_DOTA_TELEPORT)
	self.parent:FadeGesture(ACT_DOTA_VICTORY)
	StopSoundOn("Stalker.Dark_legendary_prep", self.parent)
	StopSoundOn("Stalker.Dark_legendary_prep2", self.parent)

	if self:GetRemainingTime() > 0.1 then
		self.ability:EndCd(0.3)
		return
	end
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_night_stalker_darkness_custom_legendary_dash", {})
end

function modifier_night_stalker_darkness_custom_legendary_prep:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_night_stalker_darkness_custom_legendary_prep:GetOverrideAnimationRate()
	return 1.3
end

function modifier_night_stalker_darkness_custom_legendary_prep:GetOverrideAnimation()
	return self.anim
end

function modifier_night_stalker_darkness_custom_legendary_prep:GetModifierDisableTurning()
	return 1
end

function modifier_night_stalker_darkness_custom_legendary_prep:OrderEvent(params)
	if
		params.order_type == DOTA_UNIT_ORDER_MOVE_TO_POSITION
		or params.order_type == DOTA_UNIT_ORDER_MOVE_TO_DIRECTION
	then
		self:SetDirection(params.pos)
	elseif
		(params.order_type == DOTA_UNIT_ORDER_MOVE_TO_TARGET or params.order_type == DOTA_UNIT_ORDER_ATTACK_TARGET)
		and params.target
	then
		self:SetDirection(params.target:GetOrigin())
	elseif params.order_type == DOTA_UNIT_ORDER_STOP or params.order_type == DOTA_UNIT_ORDER_HOLD_POSITION then
		self:Destroy()
	end
end

function modifier_night_stalker_darkness_custom_legendary_prep:SetDirection(location)
	local dir = ((location - self.parent:GetOrigin()) * Vector(1, 1, 0)):Normalized()
	self.target_angle = VectorToAngles(dir).y
	self.face_target = false
end

function modifier_night_stalker_darkness_custom_legendary_prep:GetModifierMoveSpeed_Limit()
	return 0.1
end

function modifier_night_stalker_darkness_custom_legendary_prep:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_night_stalker_darkness_custom_legendary_prep:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if
		self.parent:IsStunned()
		or self.parent:IsFeared()
		or self.parent:IsSilenced()
		or self.parent:GetForceAttackTarget()
		or self.parent:IsHexed()
	then
		self:Destroy()
		return
	end

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), self.range, self.interval * 3, false)

	if self.face_target then
		return
	end

	local angle_diff = AngleDiff(self.current_angle, self.target_angle)
	local turn_speed = self.turn_speed * self.interval

	local sign = -1
	if angle_diff < 0 then
		sign = 1
	end

	if math.abs(angle_diff) < 1.1 * turn_speed then
		self.current_angle = self.target_angle
		self.face_target = true
	else
		self.current_angle = self.current_angle + sign * turn_speed
	end

	local angles = self.parent:GetAnglesAsVector()
	self.parent:SetLocalAngles(angles.x, self.current_angle, angles.z)
end

modifier_night_stalker_darkness_custom_legendary_dash = class(mod_hidden)
function modifier_night_stalker_darkness_custom_legendary_dash:GetStatusEffectName()
	return "particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf"
end
function modifier_night_stalker_darkness_custom_legendary_dash:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_night_stalker_darkness_custom_legendary_dash:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.talents.r7_damage - 100
	if not IsServer() then
		return
	end
	EmitSoundOn("Stalker.Dark_legendary_charge", self.parent)
	EmitSoundOn("Stalker.Dark_legendary_charge2", self.parent)

	self.parent:GenericParticle("particles/night_stalker/dark_legendary_charge_2.vpcf", self)

	local offset = -10
	if self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		offset = 50
	end

	self.parent:GenericParticle("particles/night_stalker/hunter_charge_effect.vpcf")

	self.particle = ParticleManager:CreateParticle(
		"particles/night_stalker/dark_legendary_charge.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, 0, offset))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.legendary_particle = ParticleManager:CreateParticle(
		"particles/night_stalker/hunter_legendary_caster.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.legendary_particle, false, false, -1, false, false)

	ProjectileManager:ProjectileDodge(self.parent)

	self.width = self.ability.talents.r7_width
	self.speed = self.ability.talents.r7_speed
	self.distance = self.ability.talents.r7_range
	self.pass = 0

	self.targets = {}
	self.point = self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * self.distance
	self.dir = self.point - self.parent:GetAbsOrigin()
	self.dir.z = 0

	self.midnight_ability = self.parent.midnight_ability

	self.parent:FacePoint(self.point)

	self:SetDuration(self.dir:Length2D() / self.speed, false)
	self.parent:StartGesture(ACT_DOTA_RUN)

	if not self:ApplyHorizontalMotionController() then
		self:Destroy()
		return
	end
end

function modifier_night_stalker_darkness_custom_legendary_dash:UpdateHorizontalMotion(me, dt)
	if self.parent:IsStunned() or self.parent:IsHexed() or self.parent:IsRooted() or self.parent:IsLeashed() then
		self:Destroy()
		return
	end

	self.pass = self.pass + self.speed * dt

	local nextpos = me:GetOrigin() + self.dir:Normalized() * self.speed * dt
	local new_point = GetGroundPosition(nextpos, nil)
	me:SetOrigin(new_point)

	for _, target in pairs(self.parent:FindTargets(self.width)) do
		if not self.targets[target] then
			self.targets[target] = true
			self.parent:PerformAttack(target, true, true, true, true, false, false, true)
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_bashed",
				{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.r7_stun }
			)

			local name = RandomInt(1, 2) == 1 and "particles/night_stalker/hunter_legendary_hit_2.vpcf"
				or "particles/night_stalker/hunter_legendary_hit.vpcf"
			local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
			vec.z = 0

			local particle = ParticleManager:CreateParticle(name, PATTACH_ABSORIGIN_FOLLOW, target)
			ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
			ParticleManager:SetParticleControlForward(particle, 1, vec)
			ParticleManager:SetParticleShouldCheckFoW(particle, false)
			ParticleManager:ReleaseParticleIndex(particle)

			target:EmitSound("Stalker.Dark_legendary_hit")

			local mod = target:FindModifierByName("modifier_night_stalker_midnight_feast_custom_active")
			if mod then
				mod:ProcDamage(true)
			end

			if
				self.ability.talents.has_e3 == 1
				and IsValid(self.midnight_ability)
				and RollPseudoRandomPercentage(self.ability.talents.e3_chance, "modifier_stalker_hunter_3", self.parent)
			then
				target:AddNewModifier(
					self.parent,
					self.midnight_ability,
					"modifier_night_stalker_midnight_feast_custom_double",
					{ attack_damage = self.damage, duration = 0.2 }
				)
			end

			if not self.proc_cd and IsValid(self.midnight_ability) then
				self.proc_cd = true
				self.midnight_ability:ProcCd(true)
			end

			if target:IsRealHero() then
				if self.ability.talents.has_e3 == 1 and IsValid(self.midnight_ability) then
					self.parent:AddNewModifier(
						self.parent,
						self.midnight_ability,
						"modifier_night_stalker_midnight_feast_custom_damage",
						{}
					)
				end
				local mod = self.parent:FindModifierByName("modifier_night_stalker_darkness_custom_active")
				if mod then
					mod:ExtendDuration()
				end
			end
		end
	end

	if self.pass >= self.distance then
		self:Destroy()
		return
	end
end

function modifier_night_stalker_darkness_custom_legendary_dash:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_night_stalker_darkness_custom_legendary_dash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_night_stalker_darkness_custom_legendary_dash:GetModifierModelScale()
	return 15
end

function modifier_night_stalker_darkness_custom_legendary_dash:GetModifierDamageOutgoing_Percentage()
	if self.parent:HasModifier("modifier_night_stalker_midnight_feast_custom_double_damage") then
		return
	end
	return self.damage
end

function modifier_night_stalker_darkness_custom_legendary_dash:GetActivityTranslationModifiers()
	local activity = "haste"
	if self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		activity = "hunter_night"
	end
	return activity
end

function modifier_night_stalker_darkness_custom_legendary_dash:GetModifierDisableTurning()
	return 1
end

function modifier_night_stalker_darkness_custom_legendary_dash:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

function modifier_night_stalker_darkness_custom_legendary_dash:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveHorizontalMotionController(self)

	self.parent:FacePoint()
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)

	self.parent:FadeGesture(ACT_DOTA_RUN)
end