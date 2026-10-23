--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_life_stealer_feast_custom_tracker",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_legendary_poison",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_ghoul_7"
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_active",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_ghoul_7"
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_double",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_double_damage",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_double_chance",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_ghoul_3"
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_double_slow",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_speed_bonus",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_ghoul_1"
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_slow",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_hero_3"
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_damage_reduce",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_ghoul_4"
)
LinkLuaModifier(
	"modifier_life_stealer_feast_custom_scepter_unit",
	"abilities/life_stealer/life_stealer_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)

life_stealer_feast_custom = class({})
life_stealer_feast_custom.talents = {}

function life_stealer_feast_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/lifestealer/frenzy_legendary_attack_2.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/frenzy_legendary_attack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/viper/viper_ti7_immortal/viper_poison_attack_ti7_explosion.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/viper/viper_ti7_immortal/viper_poison_crimson_debuff_ti7.vpcf",
		context
	)
	PrecacheResource("particle", "particles/lifestealer/ghoul_legendary_head.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/ghoul_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/double_attack.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_vision.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		context
	)
	PrecacheResource("particle", "particles/lifestealer/heal_shield.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/heal_shield_creeps.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/double_attack_creep.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/rage_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/rage_legendary_attack_2.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_life_stealer/life_stealer_health_steal.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/scepter_blood.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/sandking_caustic_finale_explode_custom.vpcf", context)
end

function life_stealer_feast_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_max = caster:GetTalentValue("modifier_lifestealer_ghoul_1", "max", true),

			has_e2 = 0,
			e2_cleave = 0,
			e2_range = 0,

			has_e3 = 0,
			e3_attacks = 0,
			e3_chance = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "chance", true),
			e3_damage = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "damage", true),
			e3_bonus = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "bonus", true),
			e3_max = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "max", true),
			e3_delay = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "delay", true),
			e3_slow = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "slow", true),
			e3_slow_duration = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "slow_duration", true),

			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "duration", true),
			e4_max = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "max", true),
			e4_damage_reduce = caster:GetTalentValue("modifier_lifestealer_ghoul_4", "damage_reduce", true),

			has_e7 = 0,
			e7_duration = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "duration", true),
			e7_effect_duration = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "effect_duration", true),
			e7_damage_type = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "damage_type", true),
			e7_damage = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "damage", true),
			e7_attack_damage = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "attack_damage", true),
			e7_heal = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "heal", true) / 100,
			e7_talent_cd = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "talent_cd", true),
			e7_interval = caster:GetTalentValue("modifier_lifestealer_ghoul_7", "interval", true),

			h2_status = 0,
			h2_move = 0,

			has_h3 = 0,
			h3_heal_reduce = 0,
			h3_slow = 0,
			h3_max = caster:GetTalentValue("modifier_lifestealer_hero_3", "max", true),
			h3_duration = caster:GetTalentValue("modifier_lifestealer_hero_3", "duration", true),

			q1_damage_burn = 0,

			has_q7 = 0,
			q7_feast = caster:GetTalentValue("modifier_lifestealer_rage_7", "feast", true),
			q7_bonus = caster:GetTalentValue("modifier_lifestealer_rage_7", "bonus", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_1") then
		self.talents.has_e1 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_2") then
		self.talents.has_e2 = 1
		self.talents.e2_cleave = caster:GetTalentValue("modifier_lifestealer_ghoul_2", "cleave") / 100
		self.talents.e2_range = caster:GetTalentValue("modifier_lifestealer_ghoul_2", "range")
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_3") then
		self.talents.has_e3 = 1
		self.talents.e3_attacks = caster:GetTalentValue("modifier_lifestealer_ghoul_3", "attacks")
		caster:AddProc(self.tracker, { illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_ghoul_7") then
		self.talents.has_e7 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_hero_2") then
		self.talents.h2_status = caster:GetTalentValue("modifier_lifestealer_hero_2", "status")
		self.talents.h2_move = caster:GetTalentValue("modifier_lifestealer_hero_2", "move")
	end

	if caster:HasTalent("modifier_lifestealer_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_heal_reduce = caster:GetTalentValue("modifier_lifestealer_hero_3", "heal_reduce")
		self.talents.h3_slow = caster:GetTalentValue("modifier_lifestealer_hero_3", "slow")
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_rage_1") then
		self.talents.q1_damage_burn = caster:GetTalentValue("modifier_lifestealer_rage_1", "damage_burn")
	end

	if caster:HasTalent("modifier_lifestealer_rage_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_lifestealer_infest_7") then
		self.talents.has_r7 = 1
	end
end

function life_stealer_feast_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() or self:GetCaster():IsCreepHero() then
		return
	end
	return "modifier_life_stealer_feast_custom_tracker"
end

function life_stealer_feast_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function life_stealer_feast_custom:GetCooldown(level)
	return self.talents.has_e7 == 1 and self.talents.e7_talent_cd or 0
end

function life_stealer_feast_custom:OnSpellStart()
	local target = self.caster

	local mod = self.caster:FindModifierByName("modifier_life_stealer_infest_custom")
	if mod and mod.target and mod.is_legendary == 1 then
		target = mod.target
	end

	self.caster:StartGesture(ACT_DOTA_LIFESTEALER_RAGE)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_life_stealer_feast_custom_active",
		{ duration = self.talents.e7_duration }
	)
end

function life_stealer_feast_custom:GetDoubleChance(unit, target)
	if not self:IsTrained() then
		return 0
	end
	local chance = self.talents.e3_chance
	local mod = unit:FindModifierByName("modifier_life_stealer_feast_custom_double_chance")
	if not mod then
		return chance
	end
	if mod.target and target:entindex() ~= mod.target then
		mod:SetStackCount(0)
		mod.target = target:entindex()
	end
	return chance + mod:GetStackCount() * self.talents.e3_bonus
end

function life_stealer_feast_custom:ProcDouble(unit, target)
	if not self:IsTrained() then
		return
	end
	target:AddNewModifier(unit, self, "modifier_life_stealer_feast_custom_double", { attacker = unit:entindex() })
	unit:AddNewModifier(unit, self, "modifier_life_stealer_feast_custom_double_chance", { target = target:entindex() })
end

modifier_life_stealer_feast_custom_tracker = class(mod_hidden)
function modifier_life_stealer_feast_custom_tracker:IsHidden()
	return not self.parent:HasScepter()
end
function modifier_life_stealer_feast_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not self.ability.tracker then
		self.ability.tracker = self
	end

	self.ability:UpdateTalents()
	self.parent.feast_ability = self.ability

	self.interval = 0.1

	self.ursa_ability = self.parent:FindAbilityByName("life_stealer_ursa_crit")
	if self.ursa_ability then
		self.ursa_heal = self.ursa_ability:GetSpecialValueFor("heal") / 100
	end

	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
	self.ability.damage = self.ability:GetSpecialValueFor("damage") / 100
	self.ability.creeps_bonus = self.ability:GetSpecialValueFor("creeps_bonus")

	self.ability.health_init = self.ability:GetSpecialValueFor("health_init")
	self.ability.scepter_health_hero = self.ability:GetSpecialValueFor("scepter_health_hero")
	self.ability.feast_init = self.ability:GetSpecialValueFor("feast_init") / 100
	self.ability.feast_bonus = self.ability:GetSpecialValueFor("feast_bonus") / 100
	self.ability.scepter_max = self.ability:GetSpecialValueFor("scepter_max")
	self.ability.scepter_timer = self.ability:GetSpecialValueFor("scepter_timer") * 60

	if not IsServer() then
		return
	end
	if self.parent ~= self.caster then
		return
	end

	self.caster:AddProc(self, { name = "hit", land = true, illusion = true })
	self.parent:AddDeathEvent(self, true)

	if not self.parent.infest_ability then
		return
	end
	self.parent.infest_ability:UpdateLevels()
end

function modifier_life_stealer_feast_custom_tracker:OnRefresh(table)
	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
	self.ability.damage = self.ability:GetSpecialValueFor("damage") / 100
end

function modifier_life_stealer_feast_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end

	local infest_mod = self.parent:FindModifierByName("modifier_life_stealer_infest_custom")
	if infest_mod and infest_mod.is_legendary == 1 then
		self.parent:UpdateUIlong({ hide = 1, style = "LifestealerGhoul" })
		return
	end

	local mod
	local stack = 0
	local time = 0

	if IsValid(self.legendary_target) then
		mod = self.legendary_target:FindModifierByName("modifier_life_stealer_feast_custom_legendary_poison")
	end

	if mod then
		time = mod:GetRemainingTime()
		stack = mod:GetStackCount()
	end

	local active = (stack ~= 0 and self.parent:HasModifier("modifier_life_stealer_feast_custom_active")) and 1 or 0

	self.parent:UpdateUIlong({
		max = self.ability.talents.e7_effect_duration,
		stack = time,
		override_stack = stack,
		active = active,
		style = "LifestealerGhoul",
	})

	if stack == 0 then
		self.legendary_target = nil
		self:StartIntervalThink(-1)
	else
		self:StartIntervalThink(self.interval)
	end
end

function modifier_life_stealer_feast_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_life_stealer_feast_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if params.pre_attack_flag == "lifestealer_double" then
		return 0
	end
	if params.attacker ~= self.parent and not params.attacker.lifestealer_creep then
		return 0
	end
	return self.ability:GetDoubleChance(params.attacker, params.target)
end

function modifier_life_stealer_feast_custom_tracker:AttackProcStart(params)
	self.ability:ProcDouble(params.attacker, params.target)
end

function modifier_life_stealer_feast_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target
	local real_attacker = params.attacker
	local attacker = real_attacker.lifestealer_creep and real_attacker.owner or real_attacker

	if attacker ~= self.parent then
		return
	end

	if not real_attacker:PassivesDisabled() then
		local mod = real_attacker == self.parent and self or real_attacker:FindModifierByName(self:GetName())
		local heal = 0

		if mod then
			heal = mod:GetBonus(target)
			if mod.ursa_heal then
				heal = heal * (1 + mod.ursa_heal)
			end
		end

		if real_attacker:HasModifier("modifier_life_stealer_rage_custom") and self.ability.talents.has_q7 == 1 then
			target:SendNumber(6, heal)
			local vec = (target:GetAbsOrigin() - real_attacker:GetAbsOrigin()):Normalized()
			vec.z = 0

			local effect = RandomInt(1, 2) == 1 and "particles/lifestealer/rage_legendary_attack_2.vpcf"
				or "particles/lifestealer/rage_legendary_attack.vpcf"

			local rage_particle = ParticleManager:CreateParticle(effect, PATTACH_ABSORIGIN_FOLLOW, target)
			ParticleManager:SetParticleControl(rage_particle, 0, target:GetAbsOrigin())
			ParticleManager:SetParticleControlForward(rage_particle, 1, vec)
			ParticleManager:ReleaseParticleIndex(rage_particle)
			target:EmitSound("Lifestealer.Rage_legenary_attack")
		end

		if params.attack_flag == "lifestealer_double" then
			heal = heal * self.ability.talents.e3_damage / 100
		end

		if heal > 0 then
			real_attacker:GenericHeal(heal, self.ability, false)
		end
	end

	if self.ability.talents.has_e7 == 1 then
		self.legendary_target = target
		self:StartIntervalThink(self.interval)
	end

	if self.ability.talents.has_e1 == 1 then
		real_attacker:AddNewModifier(
			real_attacker,
			self.ability,
			"modifier_life_stealer_feast_custom_speed_bonus",
			{ target = target:entindex() }
		)
	end

	if self.ability.talents.has_h3 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_feast_custom_slow",
			{ duration = self.ability.talents.h3_duration }
		)
	end

	if self.ability.talents.has_e2 == 1 then
		DoCleaveAttack(
			real_attacker,
			target,
			self.ability,
			self.ability.talents.e2_cleave * params.damage,
			150,
			360,
			650,
			"particles/bloodseeker/thirst_cleave.vpcf"
		)
	end

	if self.ability.talents.has_e4 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_feast_custom_damage_reduce",
			{ duration = self.ability.talents.e4_duration }
		)
	end

	if real_attacker:HasModifier("modifier_life_stealer_feast_custom_active") then
		local vec = (target:GetAbsOrigin() - real_attacker:GetAbsOrigin()):Normalized()
		vec.z = 0

		local effect = RandomInt(1, 2) == 1 and "particles/lifestealer/frenzy_legendary_attack_2.vpcf"
			or "particles/lifestealer/frenzy_legendary_attack.vpcf"

		local rage_particle = ParticleManager:CreateParticle(effect, PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControl(rage_particle, 0, target:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(rage_particle, 1, vec)
		ParticleManager:ReleaseParticleIndex(rage_particle)

		local attack_particle = ParticleManager:CreateParticle(
			"particles/econ/items/viper/viper_ti7_immortal/viper_poison_attack_ti7_explosion.vpcf",
			PATTACH_POINT_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			attack_particle,
			3,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(attack_particle)

		target:EmitSound("Lifestealer.Frenzy_legendary_attack")
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_feast_custom_legendary_poison",
			{ duration = self.ability.talents.e7_effect_duration }
		)
		return
	end

	local mod = target:FindModifierByName("modifier_life_stealer_feast_custom_legendary_poison")
	if mod then
		mod:SetDuration(self.ability.talents.e7_effect_duration, true)
	end
end

function modifier_life_stealer_feast_custom_tracker:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) or self.ability:IsStolen() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if not players[self.parent:GetId()] then
		return
	end
	if not params.unit:IsRealHero() then
		return
	end
	if params.unit:IsReincarnating() then
		return
	end
	if params.unit:IsTempestDouble() then
		return
	end
	if params.unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if self:GetStackCount() >= self.ability.scepter_max then
		return
	end

	local point = params.unit:GetAbsOrigin()
	local unit = CreateUnitByName("npc_lifestealer_scepter_unit", point, true, nil, nil, DOTA_TEAM_NEUTRALS)
	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_life_stealer_feast_custom_scepter_unit",
		{ duration = self.ability.scepter_timer }
	)
end

function modifier_life_stealer_feast_custom_tracker:AddStack()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.scepter_max then
		return
	end

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)

	local effect = self.parent:GenericParticle(
		"particles/units/heroes/hero_life_stealer/life_stealer_health_steal.vpcf",
		self,
		true
	)
	ParticleManager:SetParticleControl(effect, 1, Vector(11, 0, 0))
	ParticleManager:Delete(effect)

	if self:GetStackCount() >= self.ability.scepter_max then
		self.parent:GenericParticle("particles/bristleback/brist_lowhp_.vpcf")
		self.parent:EmitSound("BS.Thirst_legendary_active")
	end
end

function modifier_life_stealer_feast_custom_tracker:GetModifierHealthBonus()
	if not self.parent:HasScepter() then
		return
	end
	if self.caster ~= self.parent then
		return
	end
	return self.ability.health_init + self.ability.scepter_health_hero * self:GetStackCount()
end

function modifier_life_stealer_feast_custom_tracker:OnTooltip()
	if not self.parent:HasScepter() then
		return
	end
	return (self.ability.feast_init + self.ability.feast_bonus * self:GetStackCount()) * 100
end

function modifier_life_stealer_feast_custom_tracker:GetBonus(target)
	if
		self.ability.talents.has_r7 == 1
		and not self.parent:HasModifier("modifier_life_stealer_infest_custom_legendary_creep")
	then
		return 0
	end

	local bonus = self.caster:HasScepter()
			and (self.ability.feast_init + self.caster:GetUpgradeStack(self:GetName()) * self.ability.feast_bonus)
		or 0
	local feast_k = self.ability.damage + bonus

	if self.ability.talents.has_q7 == 1 then
		local bonus = feast_k * (self.parent:GetMaxHealth() - self.parent:GetHealth()) * self.ability.talents.q7_feast
		if self.parent:HasModifier("modifier_life_stealer_rage_custom") then
			bonus = bonus * self.ability.talents.q7_bonus
		end
		return self.ability.damage_base + bonus
	end

	local result = self.ability.damage_base + target:GetMaxHealth() * feast_k
	if target:IsCreep() then
		result = self.ability.damage_base * self.ability.creeps_bonus
	end
	return result
end

function modifier_life_stealer_feast_custom_tracker:GetModifierPreAttack_BonusDamage(params)
	if self.parent:PassivesDisabled() then
		return
	end

	if self.ability.talents.has_q7 == 1 then
		return self:GetBonus()
	end

	if not IsServer() then
		return
	end
	if not IsValid(params.target) then
		return
	end
	return self:GetBonus(params.target)
end

function modifier_life_stealer_feast_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if self.parent:HasModifier("modifier_life_stealer_infest_custom") then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	return self.ability.talents.e7_attack_damage
end

function modifier_life_stealer_feast_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range
end

function modifier_life_stealer_feast_custom_tracker:GetModifierStatusResistanceStacking()
	return self.ability.talents.h2_status
end

function modifier_life_stealer_feast_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

modifier_life_stealer_feast_custom_legendary_poison = class(mod_visible)
function modifier_life_stealer_feast_custom_legendary_poison:GetStatusEffectName()
	return "particles/status_fx/status_effect_poison_venomancer.vpcf"
end
function modifier_life_stealer_feast_custom_legendary_poison:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_life_stealer_feast_custom_legendary_poison:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.interval = self.ability.talents.e7_interval
	self.heal = self.ability.talents.e7_heal
	self.damage = (self.ability.talents.e7_damage + self.ability.talents.q1_damage_burn) * self.interval

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.e7_damage_type,
	}
	self.RemoveForDuel = true

	self.parent:GenericParticle(
		"particles/econ/items/viper/viper_ti7_immortal/viper_poison_crimson_debuff_ti7.vpcf",
		self
	)
	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_feast_custom_legendary_poison:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

function modifier_life_stealer_feast_custom_legendary_poison:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damageTable.damage = self.damage * self:GetStackCount()
	local real_damage = DoDamage(self.damageTable, "modifier_lifestealer_ghoul_7")
	self.parent:SendNumber(OVERHEAD_ALERT_BONUS_POISON_DAMAGE, real_damage)

	local heal_target = self.caster

	local mod = self.caster:FindModifierByName("modifier_life_stealer_infest_custom")
	if mod and mod.target and mod.is_legendary == 1 then
		heal_target = mod.target
	end

	local result = heal_target:CanLifesteal(self.parent)
	if result then
		heal_target:GenericHeal(
			real_damage * self.heal * result,
			self.ability,
			true,
			"",
			"modifier_lifestealer_ghoul_7"
		)
	end
end

modifier_life_stealer_feast_custom_active = class(mod_visible)
function modifier_life_stealer_feast_custom_active:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:EmitSound("Lifestealer.Frenzy_legendary_start")
	self.parent:EmitSound("Lifestealer.Frenzy_legendary_start2")
	self.parent:GenericParticle("particles/lifestealer/ghoul_legendary_active.vpcf", self)
	self.parent:GenericParticle("particles/lifestealer/ghoul_legendary_head.vpcf", self, true)

	self.ability:EndCd()
end

function modifier_life_stealer_feast_custom_active:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

modifier_life_stealer_feast_custom_double = class(mod_hidden)
function modifier_life_stealer_feast_custom_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_life_stealer_feast_custom_double:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	self.delay = self.ability.talents.e3_delay
	self:SetStackCount(self.ability.talents.e3_attacks - 1)

	self.caster:EmitSound("Lifestealer.Frenzy_double_start")

	local name = self.caster.lifestealer_creep and "particles/lifestealer/double_attack_creep.vpcf"
		or "particles/lifestealer/double_attack.vpcf"
	local dir = (self.parent:GetOrigin() - self.caster:GetOrigin()):Normalized()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 3)
	local particle = ParticleManager:CreateParticle(name, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(particle, 1, dir)
	ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
	ParticleManager:SetParticleControlForward(particle, 5, dir)
	ParticleManager:ReleaseParticleIndex(particle)

	self:StartIntervalThink(self.delay)
end

function modifier_life_stealer_feast_custom_double:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster) or not self.caster:IsAlive() then
		self:Destroy()
		return
	end

	self.caster:AddNewModifier(self.caster, self.ability, "modifier_life_stealer_feast_custom_double_damage", {})
	self.caster:PerformAttack(
		self.parent,
		false,
		true,
		true,
		true,
		false,
		false,
		false,
		{ attack = "lifestealer_double", pre = "lifestealer_double" }
	)
	self.caster:RemoveModifierByName("modifier_life_stealer_feast_custom_double_damage")
	self.parent:EmitSound("Lifestealer.Frenzy_double_end")

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_life_stealer_feast_custom_double_slow",
		{ duration = self.ability.talents.e3_slow_duration }
	)

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end

	self.caster:EmitSound("Lifestealer.Frenzy_double_start")
end

modifier_life_stealer_feast_custom_double_damage = class(mod_hidden)
function modifier_life_stealer_feast_custom_double_damage:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.e3_damage - 100
end

function modifier_life_stealer_feast_custom_double_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_life_stealer_feast_custom_double_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_life_stealer_feast_custom_double_chance = class(mod_visible)
function modifier_life_stealer_feast_custom_double_chance:GetTexture()
	return "buffs/lifestealer/ghoul_3"
end
function modifier_life_stealer_feast_custom_double_chance:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.max = self.ability.talents.e3_max
	self.chance_bonus = self.ability.talents.e3_bonus
	self.chance = self.ability.talents.e3_chance
	self.RemoveForDuel = true

	if not IsServer() then
		return
	end
	self.target = table.target
	self:IncrementStackCount()
end

function modifier_life_stealer_feast_custom_double_chance:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_life_stealer_feast_custom_double_chance:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_life_stealer_feast_custom_double_chance:OnTooltip()
	return self.chance + self:GetStackCount() * self.chance_bonus
end

modifier_life_stealer_feast_custom_speed_bonus = class(mod_visible)
function modifier_life_stealer_feast_custom_speed_bonus:GetTexture()
	return "buffs/lifestealer/ghoul_1"
end
function modifier_life_stealer_feast_custom_speed_bonus:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	if not IsServer() then
		return
	end
	self.max = self.ability.talents.e1_max
	self.target = table.target
	self:IncrementStackCount()
end

function modifier_life_stealer_feast_custom_speed_bonus:OnRefresh(table)
	if not IsServer() then
		return
	end

	if table.target ~= self.target then
		self.target = table.target
		self:SetStackCount(0)
		return
	end

	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

modifier_life_stealer_feast_custom_slow = class(mod_visible)
function modifier_life_stealer_feast_custom_slow:IsPurgable()
	return true
end
function modifier_life_stealer_feast_custom_slow:GetTexture()
	return "buffs/lifestealer/hero_3"
end
function modifier_life_stealer_feast_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.h3_max
	self.slow = self.ability.talents.h3_slow / self.max
	self.heal_reduce = self.ability.talents.h3_heal_reduce / self.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_life_stealer_feast_custom_slow:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
		self.parent:EmitSound("Lifestealer.Frenzy_double_end")
	end
end

function modifier_life_stealer_feast_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_life_stealer_feast_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * self:GetStackCount()
end

function modifier_life_stealer_feast_custom_slow:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_life_stealer_feast_custom_slow:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

modifier_life_stealer_feast_custom_double_slow = class(mod_hidden)
function modifier_life_stealer_feast_custom_double_slow:IsPurgable()
	return true
end
function modifier_life_stealer_feast_custom_double_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.e3_slow
end

function modifier_life_stealer_feast_custom_double_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_life_stealer_feast_custom_double_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_life_stealer_feast_custom_damage_reduce = class(mod_visible)
function modifier_life_stealer_feast_custom_damage_reduce:GetTexture()
	return "buffs/lifestealer/ghoul_4"
end
function modifier_life_stealer_feast_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e4_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_life_stealer_feast_custom_damage_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_life_stealer_feast_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_life_stealer_feast_custom_damage_reduce:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.e4_damage_reduce * self:GetStackCount()
end

function modifier_life_stealer_feast_custom_damage_reduce:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.e4_damage_reduce * self:GetStackCount()
end

modifier_life_stealer_feast_custom_scepter_unit = class(mod_hidden)
function modifier_life_stealer_feast_custom_scepter_unit:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	self.collected = false
	self.timer = 0
	self.pos = GetGroundPosition(self.parent:GetAbsOrigin(), nil)
	self.radius = 150
	self.max_timer = 1

	local base_particle = ParticleManager:CreateParticleForPlayer(
		"particles/shrine/capture_point_ring_overthrow.vpcf",
		PATTACH_WORLDORIGIN,
		nil,
		PlayerResource:GetPlayer(self.caster:GetId())
	)
	ParticleManager:SetParticleControl(base_particle, 0, self.pos)
	ParticleManager:SetParticleControl(base_particle, 3, Vector(255, 70, 70))
	ParticleManager:SetParticleControl(base_particle, 9, Vector(self.radius, 0, 0))
	self:AddParticle(base_particle, false, false, -1, false, false)

	local particle =
		ParticleManager:CreateParticle("particles/lifestealer/scepter_blood.vpcf", PATTACH_WORLDORIGIN, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self:GetRemainingTime(), 0, 0))
	self:AddParticle(particle, false, false, -1, false, false)

	self.interval = FrameTime()
	self.parent:StartGesture(ACT_DOTA_DIE)

	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_feast_custom_scepter_unit:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_life_stealer_feast_custom_scepter_unit:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.timer > 0 and not self.part_particle then
		self.part_particle = ParticleManager:CreateParticleForPlayer(
			"particles/shrine/capture_point_ring_clock_overthrow.vpcf",
			PATTACH_WORLDORIGIN,
			nil,
			PlayerResource:GetPlayer(self.caster:GetId())
		)
		ParticleManager:SetParticleControl(self.part_particle, 0, self.pos + Vector(0, 0, 20))
		ParticleManager:SetParticleControl(self.part_particle, 11, Vector(0, 0, 1))
		self:AddParticle(self.part_particle, false, false, -1, false, false)
	end

	if self.part_particle then
		ParticleManager:SetParticleControl(self.part_particle, 3, Vector(255, 90, 90))
		ParticleManager:SetParticleControl(self.part_particle, 9, Vector(self.radius * 1.3, 0, 0))
		ParticleManager:SetParticleControl(self.part_particle, 17, Vector(self.timer / self.max_timer, 0, 0))
	end

	if (self.caster:GetAbsOrigin() - self.pos):Length2D() > self.radius then
		self.timer = 0
	else
		self.timer = self.timer + self.interval
		if self.timer >= self.max_timer then
			self.collected = true
			self:Destroy()
			return
		end
	end
end

function modifier_life_stealer_feast_custom_scepter_unit:OnDestroy()
	if not IsServer() then
		return
	end

	if self.collected then
		local visual_caster = self.caster
		local mod = visual_caster:FindModifierByName("modifier_life_stealer_infest_custom")
		if mod and mod.target then
			visual_caster = mod.target
		end

		self.parent:EmitSound("Lifestealer.Wounds_death")
		local tracker = self.caster:FindModifierByName("modifier_life_stealer_feast_custom_tracker")
		if tracker then
			tracker:AddStack()
		end

		if self.caster:GetQuest() == "Lifestealer.Quest_7" and not self.caster:QuestCompleted() then
			self.caster:UpdateQuest(1)
		end

		visual_caster:EmitSound("Lifestealer.Scepter_collect")
		visual_caster:GenericParticle("particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf")
		local effect_cast = ParticleManager:CreateParticle(
			"particles/sand_king/sandking_caustic_finale_explode_custom.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(effect_cast, 0, self.pos + Vector(0, 0, 30))
		ParticleManager:ReleaseParticleIndex(effect_cast)
	end

	UTIL_Remove(self.parent)
end

function modifier_life_stealer_feast_custom_scepter_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
	}
end

function modifier_life_stealer_feast_custom_scepter_unit:GetVisualZDelta()
	return 25
end

function modifier_life_stealer_feast_custom_scepter_unit:GetActivityTranslationModifiers()
	return "expired"
end