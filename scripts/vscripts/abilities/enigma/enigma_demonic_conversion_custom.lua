--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_tracker",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_enigma_conversion_3", "modifier_enigma_conversion_7" }
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_aura",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_legendary_delay",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_legendary_caster",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_conversion_7"
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_legendary_creep",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_legendary_aura",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_perma",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_conversion_1"
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_invun",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_stun_cd",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_malefice_4"
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_teleport",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_enigma_demonic_conversion_custom_slow",
	"abilities/enigma/enigma_demonic_conversion_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_enigma_malefice_2"
)

enigma_demonic_conversion_custom = class({})
enigma_demonic_conversion_custom.spawned_units = {}
enigma_demonic_conversion_custom.talents = {}

function enigma_demonic_conversion_custom:CreateTalent()
	self:ToggleAutoCast()
	self.caster:AddNewModifier(self.caster, self, "modifier_enigma_demonic_conversion_custom_teleport", {})
end

function enigma_demonic_conversion_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_enigma/enigma_demonic_conversion.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_legendary_delay.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_legendary_creep_spawn.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_void_spirit/pulse/void_spirit_pulse_absorb.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_legendary_creep_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_enigma/enigma_eidolon_ambient.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_legendary_end.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_heal.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_spell_damage.vpcf", context)
	PrecacheResource("particle", "particles/enigma/empyreal_lens.vpcf", context)
	PrecacheResource("particle", "particles/enigma/eidolon_legendary_field.vpcf", context)
	PrecacheResource("particle", "particles/enigma/eidolon_legendary_effect.vpcf", context)
	PrecacheResource("particle", "particles/enigma/scepter_effect.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_astral_slow.vpcf", context)
	PrecacheResource("particle", "particles/enigma/black_hole_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/enigma/black_hole_blink_end.vpcf", context)
end

function enigma_demonic_conversion_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,
			w1_health = 0,
			w1_max = caster:GetTalentValue("modifier_enigma_conversion_1", "max", true),

			has_w2 = 0,
			w2_cd = 0,
			w2_heal = 0,

			has_w3 = 0,
			w3_speed = 0,
			w3_count = 0,
			w3_chance = caster:GetTalentValue("modifier_enigma_conversion_3", "chance", true),
			w3_bonus = caster:GetTalentValue("modifier_enigma_conversion_3", "bonus", true),
			w3_max = caster:GetTalentValue("modifier_enigma_conversion_3", "max", true),
			w3_duration = caster:GetTalentValue("modifier_enigma_conversion_3", "duration", true),
			w3_radius = caster:GetTalentValue("modifier_enigma_conversion_3", "radius", true),

			has_w4 = 0,
			w4_attacks = caster:GetTalentValue("modifier_enigma_conversion_4", "attacks", true),
			w4_duration = caster:GetTalentValue("modifier_enigma_conversion_4", "duration", true),
			w4_move = caster:GetTalentValue("modifier_enigma_conversion_4", "move", true),

			h1_heal = 0,

			h2_armor = 0,
			h2_move = 0,

			has_q2 = 0,
			q2_slow = 0,
			q2_attack_range = 0,
			q2_duration = caster:GetTalentValue("modifier_enigma_malefice_2", "duration", true),

			q3_damage = 0,

			has_q4 = 0,
			q4_talent_cd = caster:GetTalentValue("modifier_enigma_malefice_4", "talent_cd", true),
			q4_chance = caster:GetTalentValue("modifier_enigma_malefice_4", "chance", true),

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_enigma_conversion_7", "duration", true),

			has_r3 = 0,

			has_r4 = 0,
			r4_heal = caster:GetTalentValue("modifier_enigma_blackhole_4", "heal", true) / 100,

			has_h6 = 0,
			h6_range = caster:GetTalentValue("modifier_enigma_hero_6", "range", true),
			h6_status = caster:GetTalentValue("modifier_enigma_hero_6", "status", true),
		}
	end

	if caster:HasTalent("modifier_enigma_conversion_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_enigma_conversion_1", "damage") / self.talents.w1_max
		self.talents.w1_health = caster:GetTalentValue("modifier_enigma_conversion_1", "health") / 100
	end

	if caster:HasTalent("modifier_enigma_conversion_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_enigma_conversion_2", "cd")
		self.talents.w2_heal = caster:GetTalentValue("modifier_enigma_conversion_2", "heal") / 100
	end

	if caster:HasTalent("modifier_enigma_conversion_3") then
		self.talents.has_w3 = 1
		self.talents.w3_speed = caster:GetTalentValue("modifier_enigma_conversion_3", "speed")
		self.talents.w3_count = caster:GetTalentValue("modifier_enigma_conversion_3", "count")
		caster:AddProc(self.tracker, {})
	end

	if caster:HasTalent("modifier_enigma_conversion_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_enigma_conversion_7") then
		self.talents.has_w7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_enigma_malefice_2") then
		self.talents.has_q2 = 1
		self.talents.q2_attack_range = caster:GetTalentValue("modifier_enigma_malefice_2", "attack_range")
		self.talents.q2_slow = caster:GetTalentValue("modifier_enigma_malefice_2", "slow")
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_enigma_malefice_3") then
		self.talents.q3_damage = caster:GetTalentValue("modifier_enigma_malefice_3", "damage")
	end

	if caster:HasTalent("modifier_enigma_malefice_4") then
		self.talents.has_q4 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
		caster:AddProc(
			self.tracker,
			{ name = "malefice", group = "modifier_enigma_malefice_4", target_prd = true, illusion = true, land = true }
		)
	end

	if caster:HasTalent("modifier_enigma_hero_1") then
		self.talents.h1_heal = caster:GetTalentValue("modifier_enigma_hero_1", "heal") / 100
	end

	if caster:HasTalent("modifier_enigma_hero_2") then
		self.talents.h2_armor = caster:GetTalentValue("modifier_enigma_hero_2", "armor")
		self.talents.h2_move = caster:GetTalentValue("modifier_enigma_hero_2", "move")
	end

	if caster:HasTalent("modifier_enigma_blackhole_3") then
		self.talents.has_r3 = 1
	end

	if caster:HasTalent("modifier_enigma_blackhole_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_enigma_hero_6") then
		self.talents.has_h6 = 1
	end
end

function enigma_demonic_conversion_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_enigma_demonic_conversion_custom_teleport") then
		return "enigma_scepter_ability"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "enigma_demonic_conversion", self)
end

function enigma_demonic_conversion_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_enigma_demonic_conversion_custom_tracker"
end

function enigma_demonic_conversion_custom:GetBehavior()
	local bonus = self.talents.has_h6 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK + bonus
end

function enigma_demonic_conversion_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.w2_cd or 0)
end

function enigma_demonic_conversion_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.talents.has_h6 == 1 and self.talents.h6_range or 0)
end

function enigma_demonic_conversion_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self)
end

function enigma_demonic_conversion_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	if
		self.talents.has_h6 == 1
		and self.caster:CanBlink()
		and self.caster:HasModifier("modifier_enigma_demonic_conversion_custom_teleport")
	then
		local new_pos = point
		local old_pos = self.caster:GetAbsOrigin()

		self.caster:Teleport(
			new_pos,
			true,
			"particles/enigma/black_hole_blink_start.vpcf",
			"particles/enigma/black_hole_blink_end.vpcf",
			"Enigma.Blackhole_blink"
		)

		EmitSoundOnLocationWithCaster(old_pos, "Enigma.Scepter_blink", self)

		FindClearSpaceForUnit(self.caster, new_pos, false)
		self.caster:EmitSound("Enigma.Scepter_blink2")

		local effect = ParticleManager:CreateParticle("particles/enigma/scepter_effect.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect, 0, new_pos)
		ParticleManager:SetParticleControl(effect, 1, old_pos)
		ParticleManager:ReleaseParticleIndex(effect)

		local effect2 = ParticleManager:CreateParticle("particles/enigma/scepter_effect.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect2, 0, old_pos)
		ParticleManager:SetParticleControl(effect2, 1, new_pos)
		ParticleManager:ReleaseParticleIndex(effect2)

		local effect3 =
			ParticleManager:CreateParticle("particles/enigma/black_hole_blink_start.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect3, 0, new_pos)
		ParticleManager:ReleaseParticleIndex(effect3)
	end

	if self.talents.has_w4 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_enigma_demonic_conversion_custom_invun",
			{ duration = self.talents.w4_duration }
		)
	end

	EmitSoundOnLocationWithCaster(point, "Hero_Enigma.Demonic_Conversion", self.caster)

	for _, unit in pairs(self.spawned_units) do
		if unit and not unit:IsNull() and unit:IsAlive() then
			unit:Kill(nil, nil)
		end
	end

	self.spawned_units = {}

	local new_point = point + self.caster:GetForwardVector() * self.spawn_offset

	for i = 1, self.spawn_count do
		new_point = RotatePosition(point, QAngle(0, 360 / self.spawn_count, 0), new_point)
		self:SummonUnit(new_point, 1)
	end
end

function enigma_demonic_conversion_custom:SummonUnit(point, can_double, talent_name, new_duration)
	if not IsServer() then
		return
	end

	local damage = self.eidelon_base_damage
	local health = (self.eidelon_max_health + self.caster:GetMaxHealth() * self.health_pct)
		* (1 + self.talents.w1_health)
	local duration = self.AbilityDuration
	local magic_resist = self.eidolon_magic_resist
	local move_speed = self.eidelon_base_movespeed + self.talents.h2_move
	local base_armor = self.eidolon_armor + self.talents.h2_armor
	local name = "npc_dota_lesser_eidolon_custom"
	local is_auto = 0

	local mod = self.caster:FindModifierByName("modifier_enigma_demonic_conversion_custom_perma")
	if mod and self.talents.has_w1 == 1 then
		damage = damage + mod:GetStackCount() * self.talents.w1_damage
	end

	if self.talents.has_w2 == 1 then
		self.caster:GenericHeal(
			self.talents.w2_heal * self.caster:GetMaxHealth(),
			self,
			true,
			"particles/enigma/summon_heal.vpcf",
			"modifier_enigma_conversion_2"
		)
	end

	if talent_name and talent_name == "modifier_enigma_conversion_3" then
		is_auto = 1
		duration = self.talents.w3_duration
	end

	if talent_name and talent_name == "modifier_enigma_conversion_7" then
		duration = self.talents.w7_duration
		name = "npc_dota_eidolon_custom_legendary"
	end

	if new_duration then
		duration = new_duration
	end

	local new_eidolon = CreateUnitByName(name, point, true, self.caster, self.caster, self.caster:GetTeamNumber())
	new_eidolon:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })
	new_eidolon:AddNewModifier(
		self.caster,
		self,
		"modifier_enigma_demonic_conversion_custom",
		{ can_double = can_double, is_auto = is_auto, duration = duration }
	)

	if self.talents.has_w4 == 1 and talent_name ~= "modifier_enigma_conversion_7" then
		new_eidolon:AddNewModifier(
			self.caster,
			self,
			"modifier_enigma_demonic_conversion_custom_invun",
			{ duration = self.talents.w4_duration }
		)
	end

	local eidolon_model_name = nil
	local eidolon_model = wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_eidolon")
	if eidolon_model then
		eidolon_model_name = eidolon_model
	end

	if eidolon_model_name ~= nil then
		new_eidolon:SetModel(eidolon_model_name)
		new_eidolon:SetOriginalModel(eidolon_model_name)
	end

	local effect = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_enigma/enigma_demonic_conversion.vpcf",
			self
		),
		PATTACH_CUSTOMORIGIN,
		new_eidolon
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		new_eidolon,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		new_eidolon:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		new_eidolon,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		new_eidolon:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	local base_attack = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_enigma/enigma_base_attack_eidolon.vpcf",
		self
	)
	if base_attack ~= "particles/units/heroes/hero_enigma/enigma_base_attack_eidolon.vpcf" then
		new_eidolon:SetRangedProjectileName(base_attack)
	end

	new_eidolon.owner = self.caster

	if talent_name ~= "modifier_enigma_conversion_7" then
		new_eidolon:SetBaseMaxHealth(health)
		new_eidolon:SetMaxHealth(health)
		new_eidolon:SetHealth(health)
	end

	new_eidolon:SetBaseDamageMin(damage)
	new_eidolon:SetBaseDamageMax(damage)

	new_eidolon:SetPhysicalArmorBaseValue(base_armor)
	new_eidolon:SetBaseMoveSpeed(move_speed)
	new_eidolon:SetControllableByPlayer(self.caster:GetPlayerID(), true)

	new_eidolon:SetBaseMagicalResistanceValue(magic_resist)
	FindClearSpaceForUnit(new_eidolon, new_eidolon:GetOrigin(), false)
	new_eidolon:SetAngles(0, 0, 0)
	new_eidolon:SetForwardVector(self.caster:GetForwardVector())

	if can_double == 1 then
		self.spawned_units[#self.spawned_units + 1] = new_eidolon
	end

	return new_eidolon
end

modifier_enigma_demonic_conversion_custom_tracker = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_tracker:IsAura()
	return self.ability.talents.has_w7 == 1 or self.ability.talents.has_w3 == 1
end
function modifier_enigma_demonic_conversion_custom_tracker:GetAuraDuration()
	return 0.1
end
function modifier_enigma_demonic_conversion_custom_tracker:GetAuraRadius()
	return self.ability.talents.w3_radius
end
function modifier_enigma_demonic_conversion_custom_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_enigma_demonic_conversion_custom_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_enigma_demonic_conversion_custom_tracker:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_enigma_demonic_conversion_custom_tracker:GetModifierAura()
	return "modifier_enigma_demonic_conversion_custom_aura"
end
function modifier_enigma_demonic_conversion_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("enigma_demonic_conversion_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.auto_count = 0
	self.parent.summon_ability = self.ability

	self.ability.spawn_count = self.ability:GetSpecialValueFor("spawn_count")
	self.ability.spawn_offset = self.ability:GetSpecialValueFor("spawn_offset")
	self.ability.split_attack_count = self.ability:GetSpecialValueFor("split_attack_count")
	self.ability.eidelon_max_health = self.ability:GetSpecialValueFor("eidelon_max_health")
	self.ability.eidolon_magic_resist = self.ability:GetSpecialValueFor("eidolon_magic_resist")
	self.ability.eidelon_base_damage = self.ability:GetSpecialValueFor("eidelon_base_damage")
	self.ability.eidelon_base_movespeed = self.ability:GetSpecialValueFor("eidelon_base_movespeed")
	self.ability.eidolon_attack_range = self.ability:GetSpecialValueFor("eidolon_attack_range")
	self.ability.eidolon_armor = self.ability:GetSpecialValueFor("eidolon_armor")
	self.ability.health_pct = self.ability:GetSpecialValueFor("health_pct") / 100
	self.ability.AbilityDuration = self.ability:GetSpecialValueFor("AbilityDuration")

	if not IsServer() then
		return
	end

	self.near_eidolons = {}
	self.parent:AddAttackStartEvent_out(self, true)
end

function modifier_enigma_demonic_conversion_custom_tracker:OnRefresh(table)
	self.ability.eidelon_base_damage = self.ability:GetSpecialValueFor("eidelon_base_damage")
	self.ability.eidolon_armor = self.ability:GetSpecialValueFor("eidolon_armor")
	self.ability.health_pct = self.ability:GetSpecialValueFor("health_pct") / 100
end

function modifier_enigma_demonic_conversion_custom_tracker:IsHidden()
	if self.ability.talents.has_r3 == 0 then
		return self.ability.talents.has_w3 == 0 or self.ability.talents.has_w7 == 1
	end
	return self.ability.talents.has_w3 == 0 and self.ability.talents.has_w7 == 0
end

function modifier_enigma_demonic_conversion_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_enigma_demonic_conversion_custom_tracker:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_status
end

function modifier_enigma_demonic_conversion_custom_tracker:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.q3_damage
end

function modifier_enigma_demonic_conversion_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.q2_attack_range
end

function modifier_enigma_demonic_conversion_custom_tracker:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
end

function modifier_enigma_demonic_conversion_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

function modifier_enigma_demonic_conversion_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.w3_speed
		* (self:GetStackCount() >= self.ability.talents.w3_max and self.ability.talents.w3_bonus or 1)
end

function modifier_enigma_demonic_conversion_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target
	local attacker = params.attacker

	if
		attacker ~= self.parent
		and (
			not attacker.owner
			or attacker.owner ~= self.parent
			or not attacker:HasModifier("modifier_enigma_demonic_conversion_custom")
		)
	then
		return
	end

	if self.ability.talents.has_q2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_enigma_demonic_conversion_custom_slow",
			{ duration = self.ability.talents.q2_duration }
		)
	end

	if not params.procs or not params.procs[self] or not params.procs[self].malefice then
		return
	end
	if not IsValid(self.parent.malefice_ability) then
		return
	end
	if target:HasModifier("modifier_enigma_demonic_conversion_custom_stun_cd") then
		return
	end

	target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_enigma_demonic_conversion_custom_stun_cd",
		{ duration = self.ability.talents.q4_talent_cd }
	)
	self.parent.malefice_ability:ProcStun(target, true, "modifier_enigma_malefice_4")
end

function modifier_enigma_demonic_conversion_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if name == "malefice" then
		if
			params.attacker ~= self.parent
			and not params.attacker:HasModifier("modifier_enigma_demonic_conversion_custom")
		then
			return 0
		end
		if not IsValid(self.parent.malefice_ability) then
			return 0
		end
		if params.target:HasModifier("modifier_enigma_demonic_conversion_custom_stun_cd") then
			return 0
		end
		return self.ability.talents.q4_chance
	end
	if self.auto_count >= self.ability.talents.w3_count then
		return 0
	end
	return self.ability.talents.w3_chance
end

function modifier_enigma_demonic_conversion_custom_tracker:AttackProcStart(params, name)
	if name ~= "default" then
		return
	end
	if self.auto_count >= self.ability.talents.w3_count then
		return
	end

	local point = self.parent:GetAbsOrigin() + RandomVector(200)
	local unit = self.ability:SummonUnit(point, 0, "modifier_enigma_conversion_3")
	if not unit then
		return
	end

	local particle_2 =
		ParticleManager:CreateParticle("particles/enigma/empyreal_lens.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle_2,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle_2,
		1,
		unit,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		unit:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle_2)
end

function modifier_enigma_demonic_conversion_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	local attacker = params.attacker

	local target = params.target
	if attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		return
	end

	local mod = attacker:FindModifierByName("modifier_enigma_demonic_conversion_custom")
	if not mod then
		return
	end

	if target:IsRealHero() then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_enigma_demonic_conversion_custom_perma", {})
	end

	if mod:GetStackCount() == 0 then
		return
	end
	if self.parent:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_caster") then
		return
	end
	if self.parent:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_delay") then
		return
	end

	mod.count = mod.count + 1
	if mod.count >= mod.max_attacks then
		if params.target:IsRealHero() then
			if self.parent:GetQuest() == "Enigma.Quest_6" and not self.parent:QuestCompleted() then
				self.parent:UpdateQuest(1)
			end
		end
		mod:ProcDouble()
	end
end

function modifier_enigma_demonic_conversion_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end
	if self.ability.talents.has_r3 == 1 then
		return
	end

	self.parent:UpdateUIlong({ override_stack = self:GetStackCount(), no_min = 1, style = "EnigmaSummon" })
end

function modifier_enigma_demonic_conversion_custom_tracker:GetAuraEntityReject(hEntity)
	return not hEntity.owner
		or hEntity.owner ~= self.parent
		or not hEntity:HasModifier("modifier_enigma_demonic_conversion_custom")
end

modifier_enigma_demonic_conversion_custom_aura = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	if
		IsValid(self.ability.tracker)
		and not self.parent:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_creep")
	then
		self.ability.tracker.near_eidolons[self.parent] = true
		self.ability.tracker:IncrementStackCount()
		self.ability.tracker:UpdateUI()
	end
end

function modifier_enigma_demonic_conversion_custom_aura:OnDestroy()
	if not IsServer() then
		return
	end

	if
		IsValid(self.ability.tracker)
		and not self.parent:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_creep")
	then
		self.ability.tracker.near_eidolons[self.parent] = nil
		self.ability.tracker:DecrementStackCount()
		self.ability.tracker:UpdateUI()
	end
end

function modifier_enigma_demonic_conversion_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_enigma_demonic_conversion_custom_aura:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.w3_speed
		* (
			self.caster:GetUpgradeStack("modifier_enigma_demonic_conversion_custom_tracker")
					>= self.ability.talents.w3_max
				and self.ability.talents.w3_bonus
			or 1
		)
end

modifier_enigma_demonic_conversion_custom = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.range = self.ability.eidolon_attack_range + self.ability.talents.q2_attack_range
	self.count = 0
	self.max_attacks = self.ability.split_attack_count
	if not IsServer() then
		return
	end

	self.is_auto = table.is_auto
	if self.is_auto == 1 then
		self.ability.tracker.auto_count = self.ability.tracker.auto_count + 1
	end

	if self.ability.talents.has_w4 == 1 then
		self.max_attacks = self.max_attacks + self.ability.talents.w4_attacks
	end
	self.parent:GenericParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_enigma/enigma_eidolon_ambient.vpcf",
			self
		),
		self
	)
	self:SetStackCount(table.can_double)

	self.parent:AddLifesteal(self, {
		name = "modifier_enigma_hero_1",
		heal_unit = self.caster,
		value = function()
			return self.ability.talents.h1_heal
		end,
	})
	self.parent:AddLifesteal(self, {
		name = "modifier_enigma_blackhole_4",
		type = 1,
		heal_unit = self.caster,
		effect = "particles/enigma/summon_heal.vpcf",
		value = function(params)
			if self.ability.talents.has_r4 == 0 then
				return 0
			end
			if not params.unit then
				return 0
			end
			if not params.unit:HasModifier("modifier_enigma_black_hole_custom_debuff") then
				return 0
			end
			return self.ability.talents.r4_heal
		end,
	})
end

function modifier_enigma_demonic_conversion_custom:ProcDouble()
	if not IsServer() then
		return
	end

	self:SetStackCount(0)
	self.count = 0

	self.parent:SetHealth(self.parent:GetMaxHealth())
	self.ability:SummonUnit(self.parent:GetAbsOrigin(), 0, nil, self:GetRemainingTime())
end

function modifier_enigma_demonic_conversion_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if self.is_auto == 1 then
		self.ability.tracker.auto_count = math.max(0, self.ability.tracker.auto_count - 1)
	end
end

function modifier_enigma_demonic_conversion_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_enigma_demonic_conversion_custom:GetModifierAttackRangeBonus()
	return self.range
end

function modifier_enigma_demonic_conversion_custom:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.q3_damage
end

modifier_enigma_demonic_conversion_custom_perma = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_perma:IsHidden()
	return self.ability.talents.has_w1 == 0 or self:GetStackCount() >= self.max
end
function modifier_enigma_demonic_conversion_custom_perma:RemoveOnDeath()
	return false
end
function modifier_enigma_demonic_conversion_custom_perma:GetTexture()
	return "buffs/enigma/conversion_1"
end
function modifier_enigma_demonic_conversion_custom_perma:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w1_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(1)
	self:IncrementStackCount()
end

function modifier_enigma_demonic_conversion_custom_perma:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_enigma_demonic_conversion_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end
	if self.ability.talents.has_w1 == 0 then
		return
	end

	self.parent:GenericParticle("particles/enigma/summon_perma.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_enigma_demonic_conversion_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_enigma_demonic_conversion_custom_perma:OnTooltip()
	return self:GetStackCount() * self.ability.talents.w1_damage
end

modifier_enigma_demonic_conversion_custom_stun_cd = class(mod_hidden)

modifier_enigma_demonic_conversion_custom_teleport = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_teleport:RemoveOnDeath()
	return false
end

modifier_enigma_demonic_conversion_custom_invun = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_invun:GetStatusEffectName()
	return "particles/status_fx/status_effect_dark_seer_illusion.vpcf"
end
function modifier_enigma_demonic_conversion_custom_invun:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_enigma_demonic_conversion_custom_invun:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.w4_move
end

function modifier_enigma_demonic_conversion_custom_invun:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_enigma_demonic_conversion_custom_invun:GetModifierMoveSpeedBonus_Percentage()
	return self.speed
end

function modifier_enigma_demonic_conversion_custom_invun:GetActivityTranslationModifiers()
	return "haste"
end

function modifier_enigma_demonic_conversion_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_enigma_demonic_conversion_custom_slow = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_slow:IsPurgable()
	return true
end
function modifier_enigma_demonic_conversion_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.q2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/void_spirit/void_astral_slow.vpcf", self)
end

function modifier_enigma_demonic_conversion_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_enigma_demonic_conversion_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

enigma_demonic_conversion_custom_legendary = class({})
enigma_demonic_conversion_custom_legendary.talents = {}

function enigma_demonic_conversion_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function enigma_demonic_conversion_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_talent_cd = caster:GetTalentValue("modifier_enigma_conversion_7", "talent_cd", true),
			w7_health = caster:GetTalentValue("modifier_enigma_conversion_7", "health", true) / 100,
			w7_radius = caster:GetTalentValue("modifier_enigma_conversion_7", "radius", true),
			w7_aura_radius = caster:GetTalentValue("modifier_enigma_conversion_7", "aura_radius", true),
			w7_invun_duration = caster:GetTalentValue("modifier_enigma_conversion_7", "invun_duration", true),
			w7_duration = caster:GetTalentValue("modifier_enigma_conversion_7", "duration", true),
			w7_base_health = caster:GetTalentValue("modifier_enigma_conversion_7", "base_health", true),
			w7_damage_type = caster:GetTalentValue("modifier_enigma_conversion_7", "damage_type", true),
			w7_movespeed = caster:GetTalentValue("modifier_enigma_conversion_7", "movespeed", true),
			w7_damage = caster:GetTalentValue("modifier_enigma_conversion_7", "damage", true) / 100,
		}
	end

	if caster:HasTalent("modifier_enigma_conversion_7") then
		if IsServer() and not self:IsTrained() then
			self:SetLevel(1)
		end
	end
end

function enigma_demonic_conversion_custom_legendary:GetCooldown()
	return self.talents.w7_talent_cd or 0
end

function enigma_demonic_conversion_custom_legendary:GetBehavior()
	if self.caster:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_caster") then
		return DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
end

function enigma_demonic_conversion_custom_legendary:OnAbilityPhaseStart()
	return not self.caster:HasModifier("modifier_custom_pudge_dismember_devour")
end

function enigma_demonic_conversion_custom_legendary:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_enigma_demonic_conversion_custom_legendary_caster")
	if mod then
		mod:SetEnd()
		return
	end

	local count = 0

	for _, unit in
		pairs(
			self.caster:FindFriends(
				self.talents.w7_radius,
				nil,
				FIND_ANY_ORDER,
				DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
			)
		)
	do
		if
			not unit:IsNull()
			and unit:IsAlive()
			and unit:GetUnitName() == "npc_dota_lesser_eidolon_custom"
			and unit.owner
			and unit.owner == self.caster
		then
			count = count + 1

			local effect_cast = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_void_spirit/pulse/void_spirit_pulse_absorb.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.caster
			)
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				0,
				unit,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				unit:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				1,
				self.caster,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.caster:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(effect_cast)
		end
	end

	ProjectileManager:ProjectileDodge(self.caster)
	self.caster:Purge(false, true, false, true, true)
	self.caster:Stop()

	self.caster:EmitSound("Enigma.Summon_legendary_start")
	self.caster:EmitSound("Enigma.Summon_legendary_start2")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_enigma_demonic_conversion_custom_legendary_delay",
		{ duration = self.talents.w7_invun_duration + 0.2, count = count }
	)
end

modifier_enigma_demonic_conversion_custom_legendary_delay = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_legendary_delay:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.main_ability = self.parent.summon_ability
	self.invun = self.ability.talents.w7_invun_duration

	if not IsServer() then
		return
	end
	self.count = table.count

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_enigma/enigma_demonic_conversion.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	local effect2 = ParticleManager:CreateParticle(
		"particles/enigma/summon_legendary_delay.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect2,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect2,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(effect2, false, false, -1, false, false)

	self:StartIntervalThink(self.invun)
end

function modifier_enigma_demonic_conversion_custom_legendary_delay:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.main_ability) then
		return
	end
	local center = self.parent:GetAbsOrigin()

	local unit = self.main_ability:SummonUnit(center, 0, "modifier_enigma_conversion_7")
	unit:SetAbsOrigin(center)

	self.unit = unit

	unit:AddNewModifier(unit, self.ability, "modifier_stunned", { duration = self:GetRemainingTime() })
	unit:AddNewModifier(unit, self.ability, "modifier_invulnerable", { duration = self:GetRemainingTime() })
	unit:AddNewModifier(self.parent, self.ability, "modifier_enigma_demonic_conversion_custom_legendary_creep", {})

	local health = self.ability.talents.w7_base_health
		+ self.parent:GetMaxHealth() * self.count * self.ability.talents.w7_health

	unit:SetBaseMaxHealth(health)
	unit:SetMaxHealth(health)
	unit:SetHealth(health)

	local ability = unit:FindAbilityByName("enigma_demonic_conversion_custom_legendary_stop")
	if ability then
		ability:SetLevel(1)
	end

	self:StartIntervalThink(-1)
end

function modifier_enigma_demonic_conversion_custom_legendary_delay:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.unit) then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_enigma_demonic_conversion_custom_legendary_caster",
		{ target = self.unit:entindex() }
	)
end

function modifier_enigma_demonic_conversion_custom_legendary_delay:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_enigma_demonic_conversion_custom_legendary_caster = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_legendary_caster:IsAura()
	return true
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:GetAuraDuration()
	return 0.1
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:GetAuraRadius()
	return self.ability.talents.w7_aura_radius
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:GetModifierAura()
	return "modifier_enigma_demonic_conversion_custom_legendary_aura"
end
function modifier_enigma_demonic_conversion_custom_legendary_caster:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ended = false

	if not IsServer() then
		return
	end

	self.target = EntIndexToHScript(table.target)
	self.parent:AddOrderFilter(self)
	self.ability:EndCd(0.2)

	self.parent:NoDraw(self)
	self.RemoveForDuel = true

	self:StartIntervalThink(FrameTime())
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ended == true then
		return
	end

	if IsValid(self.target) and self.target:IsAlive() then
		local point = self.target:GetAbsOrigin()
		self.parent:SetAbsOrigin(point)
		self.parent:FacePoint(point + self.target:GetForwardVector() * 10)
	else
		self:SetEnd()
	end
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:OrderFilter(params)
	return dota1x6:InfestOrderFilter(params, self.target)
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:OnDestroy()
	if not IsServer() then
		return
	end

	self:SetEnd()
	self.parent:Stop()
	self.ability:StartCd()

	self.parent:StartGesture(ACT_DOTA_TELEPORT_END)
	self.parent:EmitSound("Enigma.Summon_legendary_hero_end")

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetId()),
		"select_unit_custom",
		{ index = self.parent:entindex() }
	)
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:SetEnd()
	if not IsServer() then
		return
	end
	if self.ended == true then
		return
	end

	self.ended = true

	if IsValid(self.target) then
		self.target:Kill(nil, nil)
	end

	local particle2 =
		ParticleManager:CreateParticle("particles/enigma/summon_legendary_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle2, 0, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(particle2)

	self:SetDuration(0.2, true)
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_CHANGE,
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL,
	}
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:GetModifierModelChange()
	return "models/development/invisiblebox.vmdl"
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:GetOverrideAttackMagical()
	return 1
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_enigma_demonic_conversion_custom_legendary_caster:GetAuraEntityReject(hEntity)
	return not hEntity.owner
		or hEntity.owner ~= self.parent
		or not hEntity:HasModifier("modifier_enigma_demonic_conversion_custom")
end

modifier_enigma_demonic_conversion_custom_legendary_creep = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_legendary_creep:RemoveOnDeath()
	return false
end
function modifier_enigma_demonic_conversion_custom_legendary_creep:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.caster.legendary_creep = self.parent

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Enigma.Summon_legendary_unit")

	local particle2 = ParticleManager:CreateParticle(
		"particles/enigma/summon_legendary_creep_spawn.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(particle2, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControlForward(particle2, 0, self.parent:GetForwardVector())
	ParticleManager:SetParticleControl(particle2, 2, Vector(0, 1, 0))
	ParticleManager:ReleaseParticleIndex(particle2)

	self.particle = ParticleManager:CreateParticle(
		"particles/enigma/eidolon_legendary_field.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.ability.talents.w7_aura_radius, 1, 1))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.parent:AddOrderFilter(self)
	self:StartIntervalThink(0.2)
end

function modifier_enigma_demonic_conversion_custom_legendary_creep:OrderFilter(params)
	return dota1x6:ControlledCreepOrderFilter(params, self.parent)
end

function modifier_enigma_demonic_conversion_custom_legendary_creep:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ended then
		self:StartIntervalThink(-1)
		return
	end

	if self.parent:IsAlive() then
		return
	end
	self:DeathEffect()
end

function modifier_enigma_demonic_conversion_custom_legendary_creep:DeathEffect()
	if not IsServer() then
		return
	end
	if self.ended then
		return
	end
	self.ended = true

	if self.particle then
		ParticleManager:DestroyParticle(self.particle, true)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end

	self.parent:EmitSound("Enigma.Summon_legendary_unit_end")

	local effect =
		ParticleManager:CreateParticle("particles/enigma/summon_legendary_creep_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	local particle2 =
		ParticleManager:CreateParticle("particles/enigma/summon_legendary_creep_spawn.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle2, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControlForward(particle2, 0, self.parent:GetForwardVector())
	ParticleManager:SetParticleControl(particle2, 2, Vector(1, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle2)

	self.parent:AddNoDraw()
end

modifier_enigma_demonic_conversion_custom_legendary_aura = class(mod_hidden)
function modifier_enigma_demonic_conversion_custom_legendary_aura:GetPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_enigma_demonic_conversion_custom_legendary_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.damageTable = {
		attacker = self.parent,
		damage_type = self.ability.talents.w7_damage_type,
		ability = self.ability,
		damage_flags = DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK,
	}

	self.parent:GenericParticle("particles/enigma/eidolon_legendary_effect.vpcf", self)
	if self.parent:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_creep") then
		return
	end
	self.interval = 0.5
	self.time = nil

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:OnIntervalThink()
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_kill")
	local mod_2 = self.parent:FindModifierByName("modifier_enigma_demonic_conversion_custom")
	if mod and mod_2 then
		if not self.time then
			self.time = mod:GetRemainingTime()
		end
		mod:SetDuration(self.time, true)
		mod_2:SetDuration(self.time, true)
	end
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.w7_movespeed
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return 0
	end
	if params.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK then
		return 0
	end
	if params.damage_type == DAMAGE_TYPE_MAGICAL then
		return 0
	end
	if not self.ability then
		return 0
	end

	self.damageTable.damage = params.original_damage * (1 + self.ability.talents.w7_damage)
	self.damageTable.victim = params.target

	DoDamage(self.damageTable, "modifier_enigma_conversion_7")

	params.target:EmitSound("Enigma.Summon_legendary_attack")
	return -200
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:GetModifierProjectileName()
	return "particles/enigma/summon_legendary_attack.vpcf"
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:GetOverrideAttackMagical()
	return 1
end

function modifier_enigma_demonic_conversion_custom_legendary_aura:CheckState()
	if self.parent:HasModifier("modifier_enigma_demonic_conversion_custom_legendary_creep") then
		return
	end
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

enigma_demonic_conversion_custom_legendary_stop = class({})
function enigma_demonic_conversion_custom_legendary_stop:OnSpellStart()
	local owner = self.caster.owner

	if not owner then
		return
	end
	local mod = owner:FindModifierByName("modifier_enigma_demonic_conversion_custom_legendary_caster")

	if mod then
		mod:SetEnd()
	end
end