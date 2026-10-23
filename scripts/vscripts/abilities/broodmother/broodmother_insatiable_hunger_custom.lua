--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom_tracker",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom_scepter",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom_buff",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_insatiable_3"
)
LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom_buff_cd",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_broodmother_insatiable_3" }
)
LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom_bkb_cd",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_insatiable_4"
)
LinkLuaModifier(
	"modifier_broodmother_insatiable_hunger_custom_rush_speed",
	"abilities/broodmother/broodmother_insatiable_hunger_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_insatiable_7"
)

broodmother_insatiable_hunger_custom = class({})
broodmother_insatiable_hunger_custom.talents = {}

function broodmother_insatiable_hunger_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "broodmother_insatiable_hunger", self)
end

function broodmother_insatiable_hunger_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_hunger_buff.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_proc.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_legendary.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/hunger_shield.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_dash.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_broodmother/broodmother_hunger_spiderlings_buff.vpcf",
		context
	)
end

function broodmother_insatiable_hunger_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_damage_inc = 0,
			q1_damage_aura = 0,
			q1_radius = caster:GetTalentValue("modifier_broodmother_insatiable_1", "radius", true),

			q2_duration_legendary = 0,
			q2_duration = 0,
			q2_cd = 0,

			has_q3 = 0,
			q3_agi = 0,
			q3_bva = 0,
			q3_cd = caster:GetTalentValue("modifier_broodmother_insatiable_3", "cd", true),
			q3_duration = caster:GetTalentValue("modifier_broodmother_insatiable_3", "duration", true),
			q3_radius = caster:GetTalentValue("modifier_broodmother_insatiable_3", "radius", true),

			has_q4 = 0,
			q4_status = caster:GetTalentValue("modifier_broodmother_insatiable_4", "status", true),
			q4_bkb = caster:GetTalentValue("modifier_broodmother_insatiable_4", "bkb", true),
			q4_talent_cd = caster:GetTalentValue("modifier_broodmother_insatiable_4", "talent_cd", true),
			q4_health = caster:GetTalentValue("modifier_broodmother_insatiable_4", "health", true),

			has_q7 = 0,
			q7_max = caster:GetTalentValue("modifier_broodmother_insatiable_7", "max", true),
			q7_duration = caster:GetTalentValue("modifier_broodmother_insatiable_7", "duration", true),
			q7_damage_inc = caster:GetTalentValue("modifier_broodmother_insatiable_7", "damage_inc", true),
			q7_heal_reduce = caster:GetTalentValue("modifier_broodmother_insatiable_7", "heal_reduce", true) / 100,
			q7_speed = caster:GetTalentValue("modifier_broodmother_insatiable_7", "speed", true),
			q7_range = caster:GetTalentValue("modifier_broodmother_insatiable_7", "range", true),
			q7_max_range = caster:GetTalentValue("modifier_broodmother_insatiable_7", "max_range", true),
			q7_min_range = caster:GetTalentValue("modifier_broodmother_insatiable_7", "min_range", true),
			q7_talent_cd = caster:GetTalentValue("modifier_broodmother_insatiable_7", "talent_cd", true),

			has_h5 = 0,
			h5_heal = caster:GetTalentValue("modifier_broodmother_hero_5", "heal", true) / 100,
			h5_shield = caster:GetTalentValue("modifier_broodmother_hero_5", "shield", true) / 100,
			h5_duration = caster:GetTalentValue("modifier_broodmother_hero_5", "duration", true),
			h5_base = caster:GetTalentValue("modifier_broodmother_hero_5", "base", true),
			h5_shield_heal = caster:GetTalentValue("modifier_broodmother_hero_5", "shield_heal", true) / 100,

			has_s7 = 0,
			s7_damage = caster:GetTalentValue("modifier_broodmother_scepter_7", "damage", true) / 100,
			s7_radius = caster:GetTalentValue("modifier_broodmother_scepter_7", "radius", true),
		}
	end

	if caster:HasTalent("modifier_broodmother_insatiable_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_broodmother_insatiable_1", "damage")
		self.talents.q1_damage_inc = caster:GetTalentValue("modifier_broodmother_insatiable_1", "damage_inc")
		self.talents.q1_damage_aura = caster:GetTalentValue("modifier_broodmother_insatiable_1", "damage_aura")
	end

	if caster:HasTalent("modifier_broodmother_insatiable_2") then
		self.talents.q2_duration_legendary =
			caster:GetTalentValue("modifier_broodmother_insatiable_2", "duration_legendary")
		self.talents.q2_duration = caster:GetTalentValue("modifier_broodmother_insatiable_2", "duration")
		self.talents.q2_cd = caster:GetTalentValue("modifier_broodmother_insatiable_2", "cd")
	end

	if caster:HasTalent("modifier_broodmother_insatiable_3") then
		self.talents.has_q3 = 1
		self.talents.q3_agi = caster:GetTalentValue("modifier_broodmother_insatiable_3", "agi") / 100
		self.talents.q3_bva = caster:GetTalentValue("modifier_broodmother_insatiable_3", "bva") / 100
		caster:AddPercentStat({ agi = self.talents.q3_agi }, self.tracker)
	end

	if caster:HasTalent("modifier_broodmother_insatiable_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_broodmother_insatiable_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_broodmother_hero_5") then
		self.talents.has_h5 = 1
		caster:AddHealEvent_inc(self.tracker, true)
		caster:AddLifesteal(self.tracker, { name = "modifier_broodmother_hero_5", value = self.talents.h5_heal })
	end

	if caster:HasTalent("modifier_broodmother_scepter_7") then
		self.talents.has_s7 = 1
	end
end

function broodmother_insatiable_hunger_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_broodmother_insatiable_hunger_custom_tracker"
end

function broodmother_insatiable_hunger_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
end

function broodmother_insatiable_hunger_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function broodmother_insatiable_hunger_custom:OnSpellStart()
	local duration = self.duration + self.talents.q2_duration
	if self.talents.has_q7 == 1 then
		duration = self.talents.q7_duration + self.talents.q2_duration_legendary
	end
	if self.talents.has_q4 == 1 then
		self.caster:Purge(false, true, false, true, true)
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_broodmother_insatiable_hunger_custom",
		{ duration = duration }
	)
end

modifier_broodmother_insatiable_hunger_custom_tracker = class(mod_hidden)
function modifier_broodmother_insatiable_hunger_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.insatiable_ability = self.ability

	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.cleave = self.ability:GetSpecialValueFor("cleave") / 100
	self.ability.lifesteal_pct = self.ability:GetSpecialValueFor("lifesteal_pct")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")

	self.parent:AddLifesteal(self, {
		value = function(params)
			if not self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom") then
				return 0
			end
			local heal = self.ability.lifesteal_pct / 100
			if self.ability.talents.has_q7 == 1 then
				heal = heal * (1 + self.ability.talents.q7_heal_reduce)
			end
			return heal, nil, not params.inflictor
		end,
	})
end

function modifier_broodmother_insatiable_hunger_custom_tracker:OnRefresh()
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.cleave = self.ability:GetSpecialValueFor("cleave") / 100
	self.ability.lifesteal_pct = self.ability:GetSpecialValueFor("lifesteal_pct")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_broodmother_insatiable_hunger_custom_tracker:HealEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if not params.inflictor then
		return
	end

	local final = params.prev_health + params.gain

	if final <= self.parent:GetMaxHealth() then
		return
	end

	local above = (final - self.parent:GetMaxHealth()) * self.ability.talents.h5_shield_heal
	local max = self.ability.talents.h5_base + self.ability.talents.h5_shield * self.parent:GetMaxHealth()

	if not IsValid(self.ability.shield_mod) then
		self.ability.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
			duration = self.ability.talents.h5_duration,
			max_shield = max,
			shield_talent = "modifier_broodmother_hero_5",
		})

		self.parent:GenericParticle("particles/broodmother/hunger_shield.vpcf", self.ability.shield_mod)
	end

	if IsValid(self.ability.shield_mod) then
		self.ability.shield_mod:AddShield(above)
		self.ability.shield_mod:SetDuration(self.ability.talents.h5_duration, true)
	end
end

modifier_broodmother_insatiable_hunger_custom = class(mod_visible)
function modifier_broodmother_insatiable_hunger_custom:IsAura()
	return IsServer()
		and self.parent:IsAlive()
		and ((self.ability.talents.has_s7 == 1 and self.parent:HasScepter()) or self.ability.talents.has_q1 == 1)
end
function modifier_broodmother_insatiable_hunger_custom:GetAuraDuration()
	return 0
end
function modifier_broodmother_insatiable_hunger_custom:GetAuraRadius()
	return (self.ability.talents.has_s7 == 1 and self.parent:HasScepter()) and self.ability.talents.s7_radius
		or self.ability.talents.q1_radius
end
function modifier_broodmother_insatiable_hunger_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_broodmother_insatiable_hunger_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC
end
function modifier_broodmother_insatiable_hunger_custom:GetModifierAura()
	return "modifier_broodmother_insatiable_hunger_custom_scepter"
end
function modifier_broodmother_insatiable_hunger_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.bonus_damage

	if self.ability.talents.has_q7 == 0 then
		self.damage = self.damage + self.ability.talents.q1_damage
	end

	if not IsServer() then
		return
	end
	self.duration = table.duration

	self.ability:EndCd()
	self.parent:EmitSound("Hero_Broodmother.InsatiableHunger")

	self.cast_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_broodmother/broodmother_hunger_buff.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.cast_effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_thorax",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.cast_effect, false, false, -1, false, false)

	if self.ability.talents.has_q3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_broodmother_insatiable_hunger_custom_buff",
			{ duration = self.ability.talents.q3_duration }
		)
	end

	if self.ability.talents.has_q4 == 1 then
		self:CheckBkb()
		self.parent:AddDamageEvent_inc(self, true)
	end

	if self.ability.talents.has_q7 == 1 then
		self.parent:AddAttackStartEvent_out(self, true)
		self.parent:AddProc(self, { land = true })
		self.interval = 0.05
		self:OnIntervalThink()
		self:StartIntervalThink(self.interval)
	end
end

function modifier_broodmother_insatiable_hunger_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local target = self.parent:GetAggroTarget()
	local max_range = self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom_rush_speed")
			and self.ability.talents.q7_max_range
		or self.ability.talents.q7_range
	local range = IsValid(target) and (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D()

	if range and not self.parent:GetAttackTarget() and range <= max_range then
		if
			range > self.ability.talents.q7_min_range
			and self.parent:CheckCd("brood_q7", self.ability.talents.q7_talent_cd)
		then
			self.parent:EmitSound("Brood.Hunger_rush")
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_broodmother_insatiable_hunger_custom_rush_speed",
				{ duration = 3 }
			)
		end
	else
		self.parent:RemoveModifierByName("modifier_broodmother_insatiable_hunger_custom_rush_speed")
	end

	local damage = math.floor(self:GetModifierDamageOutgoing_Percentage())
	self.parent:UpdateUIshort({
		max_time = self.duration,
		time = self:GetRemainingTime(),
		stack = "+" .. damage .. "%",
		style = "BroodHunger",
	})
end

function modifier_broodmother_insatiable_hunger_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:StopSound("Hero_Broodmother.InsatiableHunger")

	self.parent:RemoveModifierByName("modifier_broodmother_insatiable_hunger_custom_rush_speed")
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "BroodHunger" })
end

function modifier_broodmother_insatiable_hunger_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	self:CheckBkb()
end

function modifier_broodmother_insatiable_hunger_custom:CheckBkb()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q4 == 0 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.q4_health then
		return
	end
	if self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom_bkb_cd") then
		return
	end

	self.parent:EmitSound("Brood.Hunger_bkb")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_broodmother_insatiable_hunger_custom_bkb_cd",
		{ duration = self.ability.talents.q4_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self.ability.talents.q4_bkb, effect = 2 }
	)
end

function modifier_broodmother_insatiable_hunger_custom:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.target:IsAttackImmune() then
		return
	end

	self:SetDuration(self.duration, true)
end

function modifier_broodmother_insatiable_hunger_custom:GetProcChance()
	return 100
end

function modifier_broodmother_insatiable_hunger_custom:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_q7 == 1 and target:IsHero() and self:GetStackCount() < self.ability.talents.q7_max then
		self:IncrementStackCount()
	end
end

function modifier_broodmother_insatiable_hunger_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_broodmother_insatiable_hunger_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_status
end

function modifier_broodmother_insatiable_hunger_custom:GetModifierModelScale()
	if self.ability.talents.has_q7 == 0 then
		return
	end
	return self:GetStackCount()
end

function modifier_broodmother_insatiable_hunger_custom:GetModifierDamageOutgoing_Percentage()
	local damage = self.damage
	if self.ability.talents.has_q7 == 1 then
		damage = damage
			+ self:GetStackCount()
				* (self.ability.talents.q7_damage_inc + self.ability.talents.q1_damage_inc / self.ability.talents.q7_max)
	end
	return damage
end

function modifier_broodmother_insatiable_hunger_custom:OnTooltip()
	return self.ability.lifesteal_pct
end

function modifier_broodmother_insatiable_hunger_custom:GetAuraEntityReject(hEntity)
	return not hEntity.owner
		or self.parent ~= hEntity.owner
		or not hEntity:HasModifier("modifier_broodmother_spawn_spiderlings_custom_spider")
end

modifier_broodmother_insatiable_hunger_custom_scepter = class(mod_hidden)
function modifier_broodmother_insatiable_hunger_custom_scepter:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage = self.ability.bonus_damage
	self.is_scepter = self.ability.talents.has_s7 == 1 and self.caster:HasScepter()

	if self.ability.talents.has_q7 == 0 then
		self.damage = self.damage + self.ability.talents.q1_damage
	end
	if not IsServer() then
		return
	end
	self.parent:GenericParticle(
		"particles/units/heroes/hero_broodmother/broodmother_hunger_spiderlings_buff.vpcf",
		self
	)
end

function modifier_broodmother_insatiable_hunger_custom_scepter:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
	}
end

function modifier_broodmother_insatiable_hunger_custom_scepter:GetModifierBaseAttack_BonusDamage()
	return self.ability.talents.q1_damage_aura
end

function modifier_broodmother_insatiable_hunger_custom_scepter:GetModifierDamageOutgoing_Percentage()
	if not self.is_scepter then
		return
	end
	local damage = self.damage
	if self.ability.talents.has_q7 == 1 then
		damage = damage
			+ self.caster:GetUpgradeStack("modifier_broodmother_insatiable_hunger_custom")
				* (self.ability.talents.q7_damage_inc + self.ability.talents.q1_damage_inc / self.ability.talents.q7_max)
	end
	return damage * self.ability.talents.s7_damage
end

modifier_broodmother_insatiable_hunger_custom_buff = class(mod_hidden)
function modifier_broodmother_insatiable_hunger_custom_buff:GetStatusEffectName()
	return "particles/status_fx/status_effect_life_stealer_rage.vpcf"
end
function modifier_broodmother_insatiable_hunger_custom_buff:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_broodmother_insatiable_hunger_custom_buff:IsAura()
	return self.parent:IsRealHero()
end
function modifier_broodmother_insatiable_hunger_custom_buff:GetAuraDuration()
	return 0
end
function modifier_broodmother_insatiable_hunger_custom_buff:GetAuraRadius()
	return self.ability.talents.q3_radius
end
function modifier_broodmother_insatiable_hunger_custom_buff:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_broodmother_insatiable_hunger_custom_buff:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC
end
function modifier_broodmother_insatiable_hunger_custom_buff:GetModifierAura()
	return "modifier_broodmother_insatiable_hunger_custom_buff"
end
function modifier_broodmother_insatiable_hunger_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false) * (1 + self.ability.talents.q3_bva)

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		self.parent:GenericParticle(
			"particles/units/heroes/hero_broodmother/broodmother_hunger_spiderlings_buff.vpcf",
			self
		)
		return
	end

	self.parent:GenericParticle("particles/bristleback/brist_proc.vpcf")
	self.parent:EmitSound("Brood.Hunger_buff")
	self.parent:EmitSound("Brood.Hunger_buff2")

	self.legendary_particle =
		ParticleManager:CreateParticle("particles/bloodseeker/thirst_legendary.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
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
end

function modifier_broodmother_insatiable_hunger_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_broodmother_insatiable_hunger_custom_buff_cd",
		{ duration = self.ability.talents.q3_cd }
	)
end

function modifier_broodmother_insatiable_hunger_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_broodmother_insatiable_hunger_custom_buff:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_broodmother_insatiable_hunger_custom_buff:GetModifierModelScale()
	if self.parent:IsRealHero() then
		return
	end
	return 25
end

function modifier_broodmother_insatiable_hunger_custom_buff:GetAuraEntityReject(hEntity)
	return not hEntity.owner
		or self.parent ~= hEntity.owner
		or not hEntity:HasModifier("modifier_broodmother_spawn_spiderlings_custom_spider")
end

modifier_broodmother_insatiable_hunger_custom_buff_cd = class(mod_cd)
function modifier_broodmother_insatiable_hunger_custom_buff_cd:GetTexture()
	return "buffs/broodmother/insatiable_3"
end
function modifier_broodmother_insatiable_hunger_custom_buff_cd:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true
end

function modifier_broodmother_insatiable_hunger_custom_buff_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom") then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_broodmother_insatiable_hunger_custom_buff",
		{ duration = self.ability.talents.q3_duration }
	)
end

modifier_broodmother_insatiable_hunger_custom_bkb_cd = class(mod_cd)
function modifier_broodmother_insatiable_hunger_custom_bkb_cd:GetTexture()
	return "buffs/broodmother/hero_5"
end

modifier_broodmother_insatiable_hunger_custom_rush_speed = class(mod_hidden)
function modifier_broodmother_insatiable_hunger_custom_rush_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.q7_speed
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/bloodseeker/thirst_dash.vpcf", self)
end

function modifier_broodmother_insatiable_hunger_custom_rush_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_broodmother_insatiable_hunger_custom_rush_speed:GetActivityTranslationModifiers()
	return "chase"
end

function modifier_broodmother_insatiable_hunger_custom_rush_speed:GetModifierMoveSpeed_Absolute()
	return self.speed
end