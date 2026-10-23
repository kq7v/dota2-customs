--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_hit",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_tracker",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_buff",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_arc",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_BOTH
)
LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_slow",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_agility",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_mastery_7"
)
LinkLuaModifier(
	"modifier_monkey_king_jingu_mastery_custom_attacks",
	"abilities/monkey_king/monkey_king_jingu_mastery_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)

monkey_king_jingu_mastery_custom = class({})
monkey_king_jingu_mastery_custom.talents = {}

function monkey_king_jingu_mastery_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_overhead.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_tap_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_jump_trail.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/mk_mastery_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_strike_slow_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_snapfire_slow.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/mastery_attack.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/mastery_attack2.vpcf", context)
end

function monkey_king_jingu_mastery_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_speed = 0,

			has_e2 = 0,
			e2_heal = 0,
			e2_health = 0,

			has_e3 = 0,
			e3_attacks = 0,
			e3_agi = 0,
			e3_damage_legendary = caster:GetTalentValue("modifier_monkey_king_mastery_3", "damage_legendary", true),
			e3_damage = caster:GetTalentValue("modifier_monkey_king_mastery_3", "damage", true),
			e3_interval = caster:GetTalentValue("modifier_monkey_king_mastery_3", "interval", true),

			has_e4 = 0,
			e4_damage_reduce = caster:GetTalentValue("modifier_monkey_king_mastery_4", "damage_reduce", true),
			e4_count = caster:GetTalentValue("modifier_monkey_king_mastery_4", "count", true),
			e4_status = caster:GetTalentValue("modifier_monkey_king_mastery_4", "status", true),
			e4_health = caster:GetTalentValue("modifier_monkey_king_mastery_4", "health", true),
			e4_attack = caster:GetTalentValue("modifier_monkey_king_mastery_4", "attack", true),

			has_e7 = 0,
			e7_back = caster:GetTalentValue("modifier_monkey_king_mastery_7", "back", true),
			e7_turn_slow = caster:GetTalentValue("modifier_monkey_king_mastery_7", "turn_slow", true),
			e7_slow_duration = caster:GetTalentValue("modifier_monkey_king_mastery_7", "slow_duration", true),
			e7_agi = caster:GetTalentValue("modifier_monkey_king_mastery_7", "agi", true),
			e7_cd = caster:GetTalentValue("modifier_monkey_king_mastery_7", "cd", true),
			e7_duration = caster:GetTalentValue("modifier_monkey_king_mastery_7", "duration", true),
			e7_talent_cd = caster:GetTalentValue("modifier_monkey_king_mastery_7", "talent_cd", true),
			e7_cd_inc = caster:GetTalentValue("modifier_monkey_king_mastery_7", "cd_inc", true),
			e7_range = caster:GetTalentValue("modifier_monkey_king_mastery_7", "range", true),
			e7_move_slow = caster:GetTalentValue("modifier_monkey_king_mastery_7", "move_slow", true),
			e7_speed = caster:GetTalentValue("modifier_monkey_king_mastery_7", "speed", true),

			has_h3 = 0,
			h3_mana = 0,
			h3_magic = 0,

			has_q7 = 0,

			has_w7 = 0,

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_monkey_king_mastery_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_monkey_king_mastery_1", "damage") / 100
		self.talents.e1_speed = caster:GetTalentValue("modifier_monkey_king_mastery_1", "speed")
	end

	if caster:HasTalent("modifier_monkey_king_mastery_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_monkey_king_mastery_2", "heal") / 100
		self.talents.e2_health = caster:GetTalentValue("modifier_monkey_king_mastery_2", "health")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_monkey_king_mastery_3") then
		self.talents.has_e3 = 1
		self.talents.e3_attacks = caster:GetTalentValue("modifier_monkey_king_mastery_3", "attacks")
		self.talents.e3_agi = caster:GetTalentValue("modifier_monkey_king_mastery_3", "agi") / 100
		if IsServer() then
			self.parent:AddPercentStat({ agi = self.talents.e3_agi }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_monkey_king_mastery_4") then
		self.talents.has_e4 = 1
		if IsServer() and not self.e4_init then
			self.e4_init = true
			self.tracker:StartIntervalThink(0.5)
		end
	end

	if caster:HasTalent("modifier_monkey_king_mastery_7") then
		self.talents.has_e7 = 1
		if IsServer() and not self.e7_init then
			self.e7_init = true
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_monkey_king_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_mana = caster:GetTalentValue("modifier_monkey_king_hero_3", "mana") / 100
		self.talents.h3_magic = caster:GetTalentValue("modifier_monkey_king_hero_3", "magic")
	end

	if caster:HasTalent("modifier_monkey_king_boundless_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_monkey_king_command_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_monkey_king_tree_7") then
		self.talents.has_w7 = 1
	end
end

function monkey_king_jingu_mastery_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_monkey_king_jingu_mastery_custom_tracker"
end

function monkey_king_jingu_mastery_custom:GetAbilityTextureName()
	if self.talents.has_w7 == 1 or self.talents.has_r7 == 1 then
		return "jingu_mastery_magic"
	end
	return "monkey_king_jingu_mastery"
end

function monkey_king_jingu_mastery_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function monkey_king_jingu_mastery_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_range
	end
	return 0
end

function monkey_king_jingu_mastery_custom:GetCooldown(iLevel)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	end
	return 0
end

function monkey_king_jingu_mastery_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	self.caster:RemoveModifierByName("modifier_monkey_king_tree_dance_custom")
	FindClearSpaceForUnit(self.caster, self.caster:GetAbsOrigin(), false)

	self.caster:EmitSound("MK.Mastery_legendary")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_monkey_king_jingu_mastery_custom_arc",
		{ target = target:entindex() }
	)
end

function monkey_king_jingu_mastery_custom:ApplyHits(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end

	target:RemoveModifierByName("modifier_monkey_king_jingu_mastery_custom_attacks")
	target:AddNewModifier(self.caster, self, "modifier_monkey_king_jingu_mastery_custom_attacks", {})
end

modifier_monkey_king_jingu_mastery_custom_tracker = class(mod_hidden)
function modifier_monkey_king_jingu_mastery_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.mastery_ability = self.ability

	self.ability.required_hits = self.ability:GetSpecialValueFor("required_hits")
	self.ability.counter_duration = self.ability:GetSpecialValueFor("counter_duration")
	self.ability.charges = self.ability:GetSpecialValueFor("charges")
	self.ability.bonus_attack = self.ability:GetSpecialValueFor("bonus_attack")
	self.ability.lifesteal = self.ability:GetSpecialValueFor("lifesteal") / 100
	self.ability.magic_damage = self.ability:GetSpecialValueFor("magic_damage")
	self.ability.buff_duration = self.ability:GetSpecialValueFor("buff_duration")
	self.ability.buff_duration_creeps = self.ability:GetSpecialValueFor("buff_duration_creeps")
	self.ability.cd = self.ability:GetSpecialValueFor("cd")

	self.records = {}

	self.parent:AddProc(self, { land = true })
	self.parent:AddRecordDestroyEvent(self, true)
	self.parent:AddLifesteal(self, {
		type = 2,
		text = true,
		proc = "LifestealQuest",
		value = function(params)
			if not self.records[params.record] then
				return 0
			end
			return self.ability.lifesteal + self.ability.talents.e2_heal
		end,
	})
end

function modifier_monkey_king_jingu_mastery_custom_tracker:OnRefresh()
	self.ability.bonus_attack = self.ability:GetSpecialValueFor("bonus_attack")
	self.ability.lifesteal = self.ability:GetSpecialValueFor("lifesteal") / 100
	self.ability.magic_damage = self.ability:GetSpecialValueFor("magic_damage")
end

function modifier_monkey_king_jingu_mastery_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end

	local stack = 0
	local max_timer = 1
	local timer = 0

	local mod = self.parent:FindModifierByName("modifier_monkey_king_jingu_mastery_custom_agility")
	if mod then
		timer = mod:GetRemainingTime()
		stack = "+" .. (mod:GetStackCount() * self.ability.talents.e7_agi)
		max_timer = self.ability.talents.e7_duration
	end

	self.parent:UpdateUIlong({ override_stack = stack, max = max_timer, stack = timer, style = "MonkeyMastery" })
end

function modifier_monkey_king_jingu_mastery_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end

	if
		not self.parent:PassivesDisabled()
		and self.parent:GetHealthPercent() <= self.ability.talents.e4_health
		and not self.particle
	then
		self.parent:EmitSound("MK.Mastery_shield")

		self.particle = ParticleManager:CreateParticle(
			"particles/generic/generic_shields.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.particle,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			nil,
			self.parent:GetAbsOrigin(),
			false
		)
		self:AddParticle(self.particle, false, false, -1, true, false)
	end

	if
		(self.parent:PassivesDisabled() or self.parent:GetHealthPercent() > self.ability.talents.e4_health + 3)
		and self.particle
	then
		ParticleManager:DestroyParticle(self.particle, false)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetProcChance()
	return 100
end

function modifier_monkey_king_jingu_mastery_custom_tracker:AttackProc(params, name)
	if self.parent:HasModifier("modifier_monkey_king_jingu_mastery_custom_buff") then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.records[params.record] then
		return
	end
	if self.parent:HasCd("monkey_e_cd", 0.1) then
		return
	end

	local target = params.target
	local attacker = params.attacker
	if
		attacker ~= self.parent
		and (not attacker.owner or attacker.owner ~= self.parent or not attacker.is_monkey_soldier)
	then
		return
	end

	target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_monkey_king_jingu_mastery_custom_hit",
		{ duration = self.ability.counter_duration }
	)
end

function modifier_monkey_king_jingu_mastery_custom_tracker:RecordDestroyEvent(params)
	self.records[params.record] = nil
end

function modifier_monkey_king_jingu_mastery_custom_tracker:LifestealQuest(params, heal, target, real_heal)
	if self.parent:GetQuest() ~= "Monkey.Quest_7" then
		return
	end
	if not params.unit:IsRealHero() then
		return
	end
	if self.parent:QuestCompleted() then
		return
	end
	self.parent:UpdateQuest(real_heal)
end

function modifier_monkey_king_jingu_mastery_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.monkey_e3 then
		return
	end
	return (
		self.ability.talents.has_q7 == 1 and self.ability.talents.e3_damage_legendary or self.ability.talents.e3_damage
	) - 100
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetModifierHealthBonus()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.e2_health * self.parent:GetAgility()
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.e1_speed
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h3_magic
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.e4_health then
		return
	end
	return self.ability.talents.e4_damage_reduce
end

function modifier_monkey_king_jingu_mastery_custom_tracker:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.e4_health then
		return
	end
	return self.ability.talents.e4_status
end

modifier_monkey_king_jingu_mastery_custom_hit = class(mod_visible)
function modifier_monkey_king_jingu_mastery_custom_hit:RemoveOnDeath()
	return false
end
function modifier_monkey_king_jingu_mastery_custom_hit:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max_stack = self.ability.required_hits
		+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_attack or 0)
	self.duration = self.parent:IsCreep() and self.ability.buff_duration_creeps or self.ability.buff_duration

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:AddDeathEvent(self, true)
	self.effect = self.parent:GenericParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_stack.vpcf",
		self,
		true
	)
	self:OnRefresh()
end

function modifier_monkey_king_jingu_mastery_custom_hit:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end
	self:IncrementStackCount()

	ParticleManager:SetParticleControl(self.effect, 1, Vector(1, self:GetStackCount(), 1))

	if self:GetStackCount() < self.max_stack then
		return
	end

	if self.ability.talents.has_q7 == 0 then
		self.ability:ApplyHits(self.parent)
	end

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_monkey_king_jingu_mastery_custom_buff",
		{ duration = self.duration }
	)
	self:Destroy()
end

function modifier_monkey_king_jingu_mastery_custom_hit:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	self:Destroy()
end

modifier_monkey_king_jingu_mastery_custom_buff = class(mod_visible)
function modifier_monkey_king_jingu_mastery_custom_buff:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local bonus_damage = self.ability.talents.e1_damage * self.parent:GetAgility()
	self.damage = self.ability.bonus_attack + bonus_damage
	self.max_hits = self.ability.charges + (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_count or 0)
	self.magic_damage = self.ability.magic_damage

	self.is_magic = self.ability.talents.has_w7 == 1 or self.ability.talents.has_r7 == 1
	self.parent.mastery_buff = self

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.parent:GenericParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_overhead.vpcf",
		self,
		true
	)
	self.parent:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_start.vpcf")

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_tap_buff.vpcf",
		PATTACH_ABSORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_top",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_top",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_bot",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(particle, true, false, 0, false, false)

	self.parent:EmitSound("Hero_MonkeyKing.IronCudgel")

	self.damageTable = {
		attacker = self.parent,
		ability = self.ability,
		damage = self.magic_damage + bonus_damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}

	self.records = {}
	self:SetStackCount(self.max_hits)
end

function modifier_monkey_king_jingu_mastery_custom_buff:ReduceStack()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_e7 == 1 then
		self.parent:CdAbility(self.ability, self.ability.talents.e7_cd_inc, nil, "modifier_monkey_king_mastery_7")
	end

	if self.ability.talents.has_h3 == 1 then
		self.parent:GiveMana(self.parent:GetMaxMana() * self.ability.talents.h3_mana)
	end

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end
end

function modifier_monkey_king_jingu_mastery_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CheckCd("monkey_e_cd", 0.1)
end

function modifier_monkey_king_jingu_mastery_custom_buff:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	if self.is_magic then
		self:ProcDamage({ params.target })
		return
	end

	if not self.records[params.record] then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
		target
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	self:ReduceStack()
end

function modifier_monkey_king_jingu_mastery_custom_buff:ProcDamage(targets)
	if not IsServer() then
		return
	end
	if not self.parent:CheckCd("monkey_e", self.ability.cd) then
		return
	end

	for _, target in pairs(targets) do
		self.damageTable.victim = target
		local real_damage = DoDamage(self.damageTable)
		target:SendNumber(4, real_damage)

		target:EmitSound("MK.Mastery_magic_proc")

		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)

		target:GenericParticle(
			"particles/monkey_king/mastery_attack" .. ((RandomInt(0, 1)) == 0 and "" or "2") .. ".vpcf"
		)

		local result = self.parent:CanLifesteal(target)
		if result then
			self.parent:GenericHeal(
				self.magic_damage * result * (1 + self.ability.talents.e2_heal),
				self.ability,
				false,
				false
			)
		end
	end

	self:ReduceStack()
end

function modifier_monkey_king_jingu_mastery_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
	}
end

function modifier_monkey_king_jingu_mastery_custom_buff:GetModifierPreAttack_BonusDamage(params)
	if self.is_magic then
		return
	end

	if IsServer() and params.target then
		if IsValid(self.ability.tracker) then
			self.ability.tracker.records[params.record] = true
		end
		self.records[params.record] = true
	end
	return self.damage
end

function modifier_monkey_king_jingu_mastery_custom_buff:GetActivityTranslationModifiers()
	return "iron_cudgel_charged_attack"
end

modifier_monkey_king_jingu_mastery_custom_arc = class(mod_hidden)
function modifier_monkey_king_jingu_mastery_custom_arc:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.target = EntIndexToHScript(kv.target)
	self.max_distance = 1300
	self.attacked = false
	self.legendary_back = self.ability.talents.e7_back

	self.init_dir = (self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
	self.end_pos_init = self.target:GetAbsOrigin() + self.init_dir * self.legendary_back
	self.start_pos = self.parent:GetAbsOrigin()

	self.direction = self.init_dir
	self.speed = self.ability.talents.e7_speed

	self.distance = (self.end_pos_init - self.parent:GetAbsOrigin()):Length2D()
	self.duration = self.distance / self.speed
	self.height = math.min(110, self.distance / 4)

	local pos_start = self.parent:GetOrigin()
	local pos_end = pos_start + self.direction * self.distance
	local height_start = GetGroundHeight(pos_start, self.parent)
	local height_end = GetGroundHeight(pos_end, self.parent)

	local tempmin, tempmax = height_start, height_end
	if tempmin > tempmax then
		tempmin, tempmax = tempmax, tempmin
	end
	local delta = (tempmax - tempmin) * 2 / 3
	local height_max = tempmin + delta + self.height

	self:InitVerticalArc(height_start, height_max, height_end, self.duration)

	if not self:ApplyHorizontalMotionController() or not self:ApplyVerticalMotionController() then
		self:Destroy()
		return
	end

	self.parent:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_jump_trail.vpcf", self)
end

function modifier_monkey_king_jingu_mastery_custom_arc:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveHorizontalMotionController(self)
	self.parent:RemoveVerticalMotionController(self)

	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_MK_SPRING_END, 1.2)
	if not IsValid(self.target) then
		return
	end

	self.parent:FacePoint(self.target:GetAbsOrigin())
	self.parent:MoveToTargetToAttack(self.target)
end

function modifier_monkey_king_jingu_mastery_custom_arc:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_monkey_king_jingu_mastery_custom_arc:GetModifierDisableTurning()
	return 1
end

function modifier_monkey_king_jingu_mastery_custom_arc:GetOverrideAnimation()
	return ACT_DOTA_MK_SPRING_SOAR
end

function modifier_monkey_king_jingu_mastery_custom_arc:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_monkey_king_jingu_mastery_custom_arc:UpdateHorizontalMotion(me, dt)
	if not IsValid(self.target) or (self.start_pos - self.parent:GetAbsOrigin()):Length2D() > self.max_distance then
		self:Destroy()
		return
	end

	local end_pos = self.target:GetAbsOrigin() + self.init_dir * self.legendary_back
	local direction = (end_pos - self.parent:GetAbsOrigin()):Normalized()
	local pos = me:GetOrigin() + direction * self.speed * dt

	me:SetOrigin(pos)

	if
		(self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= 50
		and self.attacked == false
		and self.target:IsAlive()
	then
		self.attacked = true
		self.parent:PerformAttack(self.target, true, true, true, false, false, false, false, { damage = "monkey_e7" })
		self.target:GenericParticle(
			"particles/monkey_king/mastery_attack" .. ((RandomInt(0, 1)) == 0 and "" or "2") .. ".vpcf"
		)

		local startPfx = ParticleManager:CreateParticle(
			"particles/monkey_king/mk_mastery_legendary.vpcf",
			PATTACH_ABSORIGIN,
			self.target
		)
		ParticleManager:SetParticleControl(startPfx, 0, self.target:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(startPfx)

		self.target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_monkey_king_jingu_mastery_custom_slow",
			{ duration = self.ability.talents.e7_slow_duration }
		)

		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.target
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			self.target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			self.target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)

		if self.target:IsRealHero() then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_monkey_king_jingu_mastery_custom_agility",
				{ duration = self.ability.talents.e7_duration }
			)
		end

		local mod = self.parent:FindModifierByName("modifier_monkey_king_jingu_mastery_custom_buff")
		if mod then
			mod:ReduceStack()
		end
	end

	if (end_pos - self.parent:GetAbsOrigin()):Length2D() < self.speed * dt then
		self:Destroy()
	end
end

function modifier_monkey_king_jingu_mastery_custom_arc:UpdateVerticalMotion(me, dt)
	local pos = me:GetOrigin()
	local time = self:GetElapsedTime()
	if time > self.duration then
		return
	end

	local height = pos.z
	local speed = self:GetVerticalSpeed(time)
	pos.z = height + speed * dt
	me:SetOrigin(pos)
end

function modifier_monkey_king_jingu_mastery_custom_arc:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_monkey_king_jingu_mastery_custom_arc:OnVerticalMotionInterrupted()
	self:Destroy()
end

function modifier_monkey_king_jingu_mastery_custom_arc:InitVerticalArc(height_start, height_max, height_end, duration)
	local height_end = height_end - height_start
	local height_max = height_max - height_start

	if height_max < height_end then
		height_max = height_end + 0.01
	end

	if height_max <= 0 then
		height_max = 0.01
	end

	local duration_end = (1 + math.sqrt(1 - height_end / height_max)) / 2
	self.const1 = 4 * height_max * duration_end / duration
	self.const2 = 4 * height_max * duration_end * duration_end / (duration * duration)
end

function modifier_monkey_king_jingu_mastery_custom_arc:GetVerticalPos(time)
	return self.const1 * time - self.const2 * time * time
end

function modifier_monkey_king_jingu_mastery_custom_arc:GetVerticalSpeed(time)
	return self.const1 - 2 * self.const2 * time
end

function modifier_monkey_king_jingu_mastery_custom_arc:SetEndCallback(func)
	self.endCallback = func
end

modifier_monkey_king_jingu_mastery_custom_slow = class(mod_hidden)
function modifier_monkey_king_jingu_mastery_custom_slow:IsPurgable()
	return true
end
function modifier_monkey_king_jingu_mastery_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_snapfire_slow.vpcf"
end
function modifier_monkey_king_jingu_mastery_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_monkey_king_jingu_mastery_custom_slow:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.mastery_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.ms_slow = self.ability.talents.e7_move_slow
	self.turn_slow = self.ability.talents.e7_turn_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", self, true)
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", self)
end

function modifier_monkey_king_jingu_mastery_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE,
	}
end

function modifier_monkey_king_jingu_mastery_custom_slow:GetModifierTurnRate_Percentage()
	return self.turn_slow
end

function modifier_monkey_king_jingu_mastery_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.ms_slow
end

modifier_monkey_king_jingu_mastery_custom_agility = class(mod_hidden)
function modifier_monkey_king_jingu_mastery_custom_agility:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()

	self:StartIntervalThink(0.1)
end

function modifier_monkey_king_jingu_mastery_custom_agility:OnRefresh(table)
	if not IsServer() then
		return
	end

	Timers:CreateTimer(self.ability.talents.e7_duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_monkey_king_jingu_mastery_custom_agility:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	self.ability.tracker:UpdateUI()
end

function modifier_monkey_king_jingu_mastery_custom_agility:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)

	if not self.ability.tracker then
		return
	end
	self.ability.tracker:UpdateUI()
end

function modifier_monkey_king_jingu_mastery_custom_agility:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_monkey_king_jingu_mastery_custom_agility:GetModifierBonusStats_Agility()
	return self.ability.talents.e7_agi * self:GetStackCount()
end

modifier_monkey_king_jingu_mastery_custom_attacks = class(mod_hidden)
function modifier_monkey_king_jingu_mastery_custom_attacks:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.count = self.ability.talents.e3_attacks

	self:StartIntervalThink(self.ability.talents.e3_interval)
end

function modifier_monkey_king_jingu_mastery_custom_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.caster.monkey_e3 = true
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true, { damage = "monkey_e3" })
	self.caster.monkey_e3 = nil

	self.parent:GenericParticle(
		"particles/monkey_king/mastery_attack" .. ((self.count % 2) == 0 and "" or "2") .. ".vpcf"
	)

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end