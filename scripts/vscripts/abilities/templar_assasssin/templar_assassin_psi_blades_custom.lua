--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_speed",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_slow",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_legendary",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_crystal",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_crystal_cd",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_illusion",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_invun",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_invun_cd",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_root",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_templar_assassin_psi_blades_custom_root_cd",
	"abilities/templar_assasssin/templar_assassin_psi_blades_custom",
	LUA_MODIFIER_MOTION_NONE
)

templar_assassin_psi_blades_custom = class({})

function templar_assassin_psi_blades_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/templar_assassin/ta_crystall_spawn.vpcf", context)
	PrecacheResource("particle", "particles/templar_assassin/ta_crystal_end.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_templar_assassin/templar_assassin_psi_blade.vpcf",
		context
	)
	PrecacheResource("particle", "particles/templar_assassin/ta_psi_speed.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/void_astral_slow.vpcf", context)
	PrecacheResource("particle", "particles/templar_assassin/ta_crystal_end.vpcf", context)
end

function templar_assassin_psi_blades_custom:GetIntrinsicModifierName()
	return "modifier_templar_assassin_psi_blades_custom"
end

function templar_assassin_psi_blades_custom:GetCooldown(iLevel)
	if not self:GetCaster():HasTalent("modifier_templar_assassin_psiblades_7") then
		return
	end
	return self:GetCaster():GetTalentValue("modifier_templar_assassin_psiblades_7", "cd")
end

function templar_assassin_psi_blades_custom:GetCastRange(vLocation, hTarget)
	if not self:GetCaster():HasTalent("modifier_templar_assassin_psiblades_7") then
		return
	end
	return self:GetCaster():GetTalentValue("modifier_templar_assassin_psiblades_7", "castrange")
end

function templar_assassin_psi_blades_custom:GetBehavior()
	if self:GetCaster():HasTalent("modifier_templar_assassin_psiblades_7") then
		return DOTA_ABILITY_BEHAVIOR_POINT
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function templar_assassin_psi_blades_custom:ApplyRoot(target, new_center)
	if target:GetUnitName() == "npc_psi_blades_crystal" or target:GetUnitName() == "npc_psi_blades_crystal_mini" then
		return
	end

	local caster = self:GetCaster()
	if target:GetTeamNumber() == caster:GetTeamNumber() then
		return
	end
	if target:HasModifier("modifier_templar_assassin_psi_blades_custom_root_cd") then
		return
	end

	target:AddNewModifier(
		caster,
		self,
		"modifier_templar_assassin_psi_blades_custom_root_cd",
		{ duration = caster:GetTalentValue("modifier_templar_assassin_psiblades_6", "cd") }
	)
	target:EmitSound("TA.Psibaldes_knockback")

	local root = caster:GetTalentValue("modifier_templar_assassin_psiblades_6", "root")
	local knock_duration = caster:GetTalentValue("modifier_templar_assassin_psiblades_6", "knock_duration")
	local knock_distance = caster:GetTalentValue("modifier_templar_assassin_psiblades_6", "range_knock", true)
	local knock_max_dist = caster:GetTalentValue("modifier_templar_assassin_psiblades_6", "distance_max", true)

	local point = caster:GetAbsOrigin()
	local length = (point - target:GetAbsOrigin()):Length2D()
	local distance = knock_distance
	distance = math.max(20, (1 - length / knock_max_dist) * distance)

	local knockback = {
		should_stun = 0,
		knockback_duration = knock_duration,
		duration = knock_duration,
		knockback_distance = distance,
		knockback_height = 0,
		center_x = point.x,
		center_y = point.y,
		center_z = point.z,
	}

	if target:IsCreep() or new_center then
		knock_duration = 0
	else
		target:AddNewModifier(caster, self, "modifier_knockback", knockback)
	end
	target:AddNewModifier(
		caster,
		self,
		"modifier_templar_assassin_psi_blades_custom_root",
		{ delay = knock_duration, duration = knock_duration + (1 - target:GetStatusResistance()) * root }
	)
end

function templar_assassin_psi_blades_custom:OnSpellStart()
	local caster = self:GetCaster()
	local pos = self:GetCursorPosition()
	local attacks = caster:GetTalentValue("modifier_templar_assassin_psiblades_7", "attacks")

	local crystal = CreateUnitByName("npc_psi_blades_crystal", pos, true, nil, nil, caster:GetTeamNumber())

	crystal.player_unit = true
	crystal.is_crystal = true

	crystal:EmitSound("Lina.Array_triple")
	local particle_peffect = ParticleManager:CreateParticle(
		"particles/templar_assassin/ta_crystall_spawn.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		crystal
	)
	ParticleManager:SetParticleControl(particle_peffect, 0, crystal:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle_peffect, 2, crystal:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle_peffect)

	crystal:AddNewModifier(caster, self, "modifier_templar_assassin_psi_blades_custom_legendary", {})
	crystal:AddNewModifier(
		caster,
		self,
		"modifier_kill",
		{ duration = caster:GetTalentValue("modifier_templar_assassin_psiblades_7", "duration") }
	)

	crystal:SetBaseMaxHealth(attacks)
	crystal:SetHealth(attacks)
end

modifier_templar_assassin_psi_blades_custom = class({})
function modifier_templar_assassin_psi_blades_custom:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_templar_assassin_psi_blades_custom:GetCritChance()
	if not self.parent:HasTalent("modifier_templar_assassin_psiblades_3") then
		return 0
	end
	return self.crit_chance
end

function modifier_templar_assassin_psi_blades_custom:GetCritDamage()
	if not self.parent:HasTalent("modifier_templar_assassin_psiblades_3") then
		return
	end
	return self.parent:GetTalentValue("modifier_templar_assassin_psiblades_3", "damage")
end

function modifier_templar_assassin_psi_blades_custom:GetModifierPreAttack_CriticalStrike(params)
	if not self.parent:HasTalent("modifier_templar_assassin_psiblades_3") then
		return
	end
	if not RollPseudoRandomPercentage(self:GetCritChance(), 2742, self.parent) then
		return
	end

	self.records[params.record] = true

	return self:GetCritDamage()
end

function modifier_templar_assassin_psi_blades_custom:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end

	if self.records[params.record] then
		self.records[params.record] = nil
	end
end

function modifier_templar_assassin_psi_blades_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.range = self.ability:GetSpecialValueFor("bonus_attack_range")
	self.distance = self.ability:GetSpecialValueFor("attack_spill_range")
	self.width = self.ability:GetSpecialValueFor("attack_spill_width")
	self.damage_pct = self.ability:GetSpecialValueFor("attack_spill_pct") / 100

	self.evasion_duration = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_2", "duration", true)

	self.crit_chance = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_3", "chance", true)
	self.attack_slow_duration = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_3", "duration", true)

	self.illusion_health = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_5", "health", true)
	self.illusion_invun = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_5", "invun", true)
	self.illusion_cd = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_5", "cd", true)
	self.illusion_heal = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_5", "heal", true) / 100

	self.vision_duration = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_6", "vision_duration", true)
	self.min_knock_range = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_6", "min_distance", true)

	self.crystal_duration = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_4", "duration", true)
	self.crystal_radius = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_4", "radius", true)
	self.crystal_cd = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_4", "cd", true)

	self.legendary_heal = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_7", "heal", true) / 100
	self.legendary_radius = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_7", "radius", true)
	self.legendary_stun = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_7", "stun", true)

	self.records = {}

	if self.parent:IsRealHero() then
		self.parent:AddRecordDestroyEvent(self)
		self.parent:AddDamageEvent_out(self)
		self.parent:AddDamageEvent_inc(self)
		self.parent:AddAttackEvent_out(self)
		self.parent:AddAttackStartEvent_out(self)
	end
end

function modifier_templar_assassin_psi_blades_custom:OnRefresh()
	self.range = self.ability:GetSpecialValueFor("bonus_attack_range")
	self.distance = self.ability:GetSpecialValueFor("attack_spill_range")
	self.width = self.ability:GetSpecialValueFor("attack_spill_width")
	self.damage_pct = self.ability:GetSpecialValueFor("attack_spill_pct") / 100
end

function modifier_templar_assassin_psi_blades_custom:GetModifierAttackRangeBonus()
	local bonus = self.range
	if self.parent:HasTalent("modifier_templar_assassin_psiblades_1") then
		bonus = bonus + self.parent:GetTalentValue("modifier_templar_assassin_psiblades_1", "range")
	end
	return bonus
end

function modifier_templar_assassin_psi_blades_custom:GetModifierDamageOutgoing_Percentage()
	if not self.parent:HasTalent("modifier_templar_assassin_psiblades_1") then
		return
	end
	return self.parent:GetTalentValue("modifier_templar_assassin_psiblades_1", "damage")
end

function modifier_templar_assassin_psi_blades_custom:AttackEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local attacker = params.attacker

	if
		attacker:IsIllusion()
		and attacker:HasModifier("modifier_templar_assassin_psi_blades_custom_illusion")
		and attacker.owner
		and attacker.owner == self.parent
	then
		local heal = self.parent:GetMaxHealth() * self.illusion_heal
		attacker:GenericHeal(heal, self.ability, true)
		self.parent:GenericHeal(heal, self.ability, true, nil, "modifier_templar_assassin_psiblades_5")
	end

	if self.parent ~= params.attacker then
		return
	end

	if self.parent:HasTalent("modifier_templar_assassin_psiblades_6") then
		if params.target:IsHero() then
			params.target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_generic_vision",
				{ duration = self.vision_duration }
			)
		end
		if (self.parent:GetAbsOrigin() - params.target:GetAbsOrigin()):Length2D() <= self.min_knock_range then
			self.ability:ApplyRoot(params.target)
		end
	end

	if self.parent:HasTalent("modifier_templar_assassin_psiblades_2") then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_templar_assassin_psi_blades_custom_speed",
			{ duration = self.evasion_duration }
		)
	end
end

function modifier_templar_assassin_psi_blades_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	local unit = params.unit

	if
		self.parent:HasTalent("modifier_templar_assassin_psiblades_5")
		and not self.parent:PassivesDisabled()
		and self.parent == unit
		and not self.parent:HasModifier("modifier_death")
		and self.parent:GetHealthPercent() <= self.illusion_health
		and not self.parent:HasModifier("modifier_templar_assassin_psi_blades_custom_invun_cd")
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_templar_assassin_psi_blades_custom_invun_cd",
			{ duration = self.illusion_cd }
		)

		local attacker = nil
		if params.attacker and params.attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
			attacker = params.attacker:entindex()
		end

		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_templar_assassin_psi_blades_custom_invun",
			{ attacker = attacker, duration = self.illusion_invun }
		)
	end
end

function modifier_templar_assassin_psi_blades_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	local unit = params.unit

	if params.attacker ~= self.parent then
		return
	end
	if not unit:IsUnit() then
		return
	end
	if params.inflictor then
		return
	end

	local attack_slow = false
	local move_slow = false
	local legendary_mod = unit:FindModifierByName("modifier_templar_assassin_psi_blades_custom_legendary")

	if params.record and self.records[params.record] then
		attack_slow = true
		if self.parent:HasTalent("modifier_templar_assassin_psiblades_3") then
			unit:EmitSound("TA.Psibaldes_crit")
			unit:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_templar_assassin_psi_blades_custom_slow",
				{ duration = self.attack_slow_duration }
			)
		end
	end

	unit:EmitSound("Hero_TemplarAssassin.PsiBlade")

	local direction = unit:GetAbsOrigin() - self.parent:GetAbsOrigin()
	direction.z = 0
	direction = direction:Normalized()

	local distance = self.distance + self.parent:GetTalentValue("modifier_templar_assassin_psiblades_1", "range")
	local damage = params.damage

	if legendary_mod then
		damage = params.original_damage
		self.parent:GenericHeal(damage * self.legendary_heal, self.ability)
	end

	local trap_mod = unit:FindModifierByName("modifier_templar_assassin_psionic_trap_custom_trap")
	if trap_mod then
		damage = params.original_damage
		trap_mod:AttackEvent_inc(params, true)
	end

	local enemies

	if unit:HasModifier("modifier_templar_assassin_psi_blades_custom_crystal") then
		enemies = FindUnitsInRadius(
			self.parent:GetTeamNumber(),
			unit:GetAbsOrigin(),
			nil,
			self.crystal_radius,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
			FIND_ANY_ORDER,
			false
		)
		damage = params.original_damage
			* self.parent:GetTalentValue("modifier_templar_assassin_psiblades_4", "damage")
			/ 100
		unit:FindModifierByName("modifier_templar_assassin_psi_blades_custom_crystal"):DealDamage(params)
	else
		enemies = FindUnitsInLine(
			self.parent:GetTeamNumber(),
			unit:GetAbsOrigin() + direction * distance,
			unit:GetAbsOrigin() + direction * self.width,
			self.parent,
			self.width,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
		)
	end

	local hit_units = {}

	damage = damage * self.damage_pct

	local hit = false
	for _, enemy in pairs(enemies) do
		if enemy ~= unit and enemy:IsAlive() and not enemy.is_crystal then
			hit = true
			self:DealDamage(damage, enemy, unit, attack_slow)

			hit_units[enemy:entindex()] = true
		end
	end

	if legendary_mod then
		local more_targets = FindUnitsInRadius(
			self.parent:GetTeamNumber(),
			unit:GetAbsOrigin(),
			nil,
			self.legendary_radius,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
			FIND_ANY_ORDER,
			false
		)

		for _, enemy in pairs(more_targets) do
			if enemy ~= unit and enemy:IsAlive() and not hit_units[enemy:entindex()] and not enemy.is_crystal then
				hit = true
				self:DealDamage(damage, enemy, unit, attack_slow)

				hit_units[enemy:entindex()] = true
			end
		end
		legendary_mod:DealDamage(params)
	end
end

function modifier_templar_assassin_psi_blades_custom:DealDamage(damage, enemy, unit, attack_slow)
	if not IsServer() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end

	if attack_slow == true and self.parent:HasTalent("modifier_templar_assassin_psiblades_3") then
		enemy:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_templar_assassin_psi_blades_custom_slow",
			{ duration = self.attack_slow_duration }
		)
	end

	if self.parent:HasTalent("modifier_templar_assassin_psiblades_6") then
		if enemy:IsHero() then
			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_generic_vision",
				{ duration = self.vision_duration }
			)
		end
		self.ability:ApplyRoot(enemy, unit:GetAbsOrigin())
	end

	local damage_ability = nil

	if unit:GetUnitName() == "npc_psi_blades_crystal_mini" then
		damage_ability = "modifier_templar_assassin_psiblades_4"
		enemy:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_stunned",
			{
				duration = (1 - enemy:GetStatusResistance())
					* self.parent:GetTalentValue("modifier_templar_assassin_psiblades_4", "stun"),
			}
		)
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_templar_assassin/templar_assassin_psi_blade.vpcf",
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		unit,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		unit:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		enemy,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		enemy:GetAbsOrigin(),
		true
	)
	ParticleManager:DestroyParticle(particle, false)
	ParticleManager:ReleaseParticleIndex(particle)

	if self.parent:GetQuest() == "Templar.Quest_7" and enemy:IsRealHero() and not self.parent:QuestCompleted() then
		self.parent:UpdateQuest(1)
	end

	DoDamage(
		{
			victim = enemy,
			attacker = self.parent,
			damage = damage,
			damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
			damage_type = DAMAGE_TYPE_PURE,
			ability = self.ability,
		},
		damage_ability
	)

	if unit:GetUnitName() == "npc_psi_blades_crystal" then
		enemy:EmitSound("TA.Psibaldes_crystall_attack")
		enemy:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_stunned",
			{ duration = self.legendary_stun * (1 - enemy:GetStatusResistance()) }
		)
	end
end

function modifier_templar_assassin_psi_blades_custom:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	if
		self.parent:HasTalent("modifier_templar_assassin_psiblades_4")
		and not self.parent:HasModifier("modifier_templar_assassin_psi_blades_custom_crystal_cd")
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_templar_assassin_psi_blades_custom_crystal_cd",
			{ duration = self.crystal_cd }
		)

		local dir = self.parent:GetForwardVector()
		local pos = self.parent:GetAbsOrigin() + dir * 250

		local point = RotatePosition(self.parent:GetAbsOrigin(), QAngle(0, -70 + RandomInt(0, 140), 0), pos)

		local crystal =
			CreateUnitByName("npc_psi_blades_crystal_mini", point, true, nil, nil, self.parent:GetTeamNumber())

		crystal.player_unit = true
		crystal.is_crystal = true

		--crystal:EmitSound("Lina.Array_triple")
		local particle_peffect = ParticleManager:CreateParticle(
			"particles/templar_assassin/ta_crystall_spawn.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			crystal
		)
		ParticleManager:SetParticleControl(particle_peffect, 0, crystal:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle_peffect, 2, crystal:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle_peffect)

		crystal:AddNewModifier(self.parent, self.ability, "modifier_templar_assassin_psi_blades_custom_crystal", {})
		crystal:AddNewModifier(self.parent, self.ability, "modifier_kill", { duration = self.crystal_duration })

		crystal:SetBaseMaxHealth(1)
		crystal:SetHealth(1)
	end
end

modifier_templar_assassin_psi_blades_custom_speed = class({})
function modifier_templar_assassin_psi_blades_custom_speed:IsHidden()
	return false
end
function modifier_templar_assassin_psi_blades_custom_speed:IsPurgable()
	return true
end
function modifier_templar_assassin_psi_blades_custom_speed:GetTexture()
	return "buffs/psiblades_evasion"
end
function modifier_templar_assassin_psi_blades_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_EVASION_CONSTANT,
	}
end

function modifier_templar_assassin_psi_blades_custom_speed:GetModifierEvasion_Constant()
	return self:GetStackCount() * self.evasion
end
function modifier_templar_assassin_psi_blades_custom_speed:GetModifierMoveSpeedBonus_Percentage()
	return self:GetStackCount() * self.move
end

function modifier_templar_assassin_psi_blades_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.max = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_2", "max", true)
	self.evasion = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_2", "evasion") / self.max
	self.move = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_2", "move") / self.max

	if not IsServer() then
		return
	end
	self:SetStackCount(1)
end

function modifier_templar_assassin_psi_blades_custom_speed:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/templar_assassin/ta_psi_speed.vpcf", self)
	end
end

modifier_templar_assassin_psi_blades_custom_slow = class({})
function modifier_templar_assassin_psi_blades_custom_slow:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_slow:IsPurgable()
	return true
end
function modifier_templar_assassin_psi_blades_custom_slow:GetTexture()
	return "buffs/psiblades_slow"
end

function modifier_templar_assassin_psi_blades_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_templar_assassin_psi_blades_custom_slow:GetModifierAttackSpeedBonus_Constant()
	return self.attack
end

function modifier_templar_assassin_psi_blades_custom_slow:OnCreated()
	self.attack = self:GetCaster():GetTalentValue("modifier_templar_assassin_psiblades_3", "speed")
end

modifier_templar_assassin_psi_blades_custom_crystal = class({})
function modifier_templar_assassin_psi_blades_custom_crystal:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_crystal:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_crystal:OnCreated(table)
	if not IsServer() then
		return
	end
	self.hits = 1
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.interval = 0.5

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_templar_assassin_psi_blades_custom_crystal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
	}
end

function modifier_templar_assassin_psi_blades_custom_crystal:CheckState()
	return {
		[MODIFIER_STATE_MAGIC_IMMUNE] = true,
		[MODIFIER_STATE_SPECIALLY_DENIABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
	}
end

function modifier_templar_assassin_psi_blades_custom_crystal:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 10, self.interval, false)
end

function modifier_templar_assassin_psi_blades_custom_crystal:GetAbsoluteNoDamagePhysical()
	return 1
end
function modifier_templar_assassin_psi_blades_custom_crystal:GetAbsoluteNoDamageMagical()
	return 1
end
function modifier_templar_assassin_psi_blades_custom_crystal:GetAbsoluteNoDamagePure()
	return 1
end
function modifier_templar_assassin_psi_blades_custom_crystal:GetModifierIncomingDamage_Percentage()
	return -100
end

function modifier_templar_assassin_psi_blades_custom_crystal:DealDamage(params)
	if not IsServer() then
		return
	end
	if params.inflictor ~= nil then
		return
	end

	local attacker = params.attacker
	if attacker.owner then
		attacker = attacker.owner
	end

	if attacker ~= self.caster then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	self.hits = self.hits - 1
	self.parent:EmitSound("TA.Psibaldes_crystall_attack")
	if self.hits <= 0 then
		self.stun = true
		self.parent:Kill(nil, attacker)
	else
		self.parent:SetHealth(self.hits)
	end
end

function modifier_templar_assassin_psi_blades_custom_crystal:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:AddNoDraw()
	self.parent:EmitSound("TA.Psibaldes_crystall_end_stun")

	local explode_particle =
		ParticleManager:CreateParticle("particles/templar_assassin/ta_crystal_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(explode_particle, 0, self:GetParent():GetAbsOrigin())
	ParticleManager:SetParticleControl(explode_particle, 60, Vector(12, 198, 255))
	ParticleManager:SetParticleControl(explode_particle, 61, Vector(1, 0, 0))
	ParticleManager:ReleaseParticleIndex(explode_particle)
end

modifier_templar_assassin_psi_blades_custom_legendary = class({})
function modifier_templar_assassin_psi_blades_custom_legendary:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_legendary:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.hits = self.caster:GetTalentValue("modifier_templar_assassin_psiblades_7", "attacks")
	self.interval = 0.5

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_templar_assassin_psi_blades_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
	}
end

function modifier_templar_assassin_psi_blades_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 10, self.interval, false)
end

function modifier_templar_assassin_psi_blades_custom_legendary:GetAbsoluteNoDamagePhysical()
	return 1
end
function modifier_templar_assassin_psi_blades_custom_legendary:GetAbsoluteNoDamageMagical()
	return 1
end
function modifier_templar_assassin_psi_blades_custom_legendary:GetAbsoluteNoDamagePure()
	return 1
end
function modifier_templar_assassin_psi_blades_custom_legendary:GetModifierIncomingDamage_Percentage()
	return -100
end

function modifier_templar_assassin_psi_blades_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_MAGIC_IMMUNE] = true,
		[MODIFIER_STATE_SPECIALLY_DENIABLE] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR_FOR_ENEMIES] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
	}
end

function modifier_templar_assassin_psi_blades_custom_legendary:DealDamage(params)
	if not IsServer() then
		return
	end
	if params.inflictor ~= nil then
		return
	end

	local attacker = params.attacker
	if attacker.owner then
		attacker = attacker.owner
	end

	if attacker ~= self.caster then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	self.hits = self.hits - 1
	self.parent:EmitSound("TA.Psibaldes_crystall_attack")
	if self.hits <= 0 then
		self.stun = true
		self.parent:Kill(nil, attacker)
	else
		self.parent:SetHealth(self.hits)
	end
end

function modifier_templar_assassin_psi_blades_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:AddNoDraw()
	self.parent:EmitSound("TA.Psibaldes_crystall_end_stun")
	self.parent:EmitSound("TA.Psibaldes_crystall_end")

	local explode_particle =
		ParticleManager:CreateParticle("particles/templar_assassin/ta_crystal_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(explode_particle, 0, self:GetParent():GetAbsOrigin())
	ParticleManager:SetParticleControl(explode_particle, 60, Vector(12, 198, 255))
	ParticleManager:SetParticleControl(explode_particle, 61, Vector(1, 0, 0))
	ParticleManager:ReleaseParticleIndex(explode_particle)
end

modifier_templar_assassin_psi_blades_custom_invun = class({})

function modifier_templar_assassin_psi_blades_custom_invun:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_invun:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_invun:GetEffectName()
	return "particles/items2_fx/manta_phase.vpcf"
end

function modifier_templar_assassin_psi_blades_custom_invun:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.attacker = nil

	if table.attacker then
		self.attacker = table.attacker
	end

	self.parent:EmitSound("TA.Psibaldes_illusion")
	self.parent:EmitSound("TA.Psibaldes_illusion2")
end

function modifier_templar_assassin_psi_blades_custom_invun:OnDestroy()
	if not IsServer() then
		return
	end

	if not self.parent or self.parent:IsNull() or not self.parent:IsAlive() then
		return
	end

	local incoming = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_5", "incoming") - 100
	local duration = self.parent:GetTalentValue("modifier_templar_assassin_psiblades_5", "duration")

	local vec = RandomVector(100)
	local origin = self.parent:GetAbsOrigin()

	local new_pos = origin + vec
	local illusion_pos = origin - vec

	local illusions = CreateIllusions(
		self.parent,
		self.parent,
		{ duration = duration, outgoing_damage = -100, incoming_damage = incoming },
		1,
		1,
		false,
		true
	)
	for _, illusion in pairs(illusions) do
		illusion:SetAbsOrigin(illusion_pos)
		FindClearSpaceForUnit(illusion, illusion_pos, true)

		illusion.owner = self.parent

		for _, mod in pairs(self.parent:FindAllModifiers()) do
			if mod.StackOnIllusion ~= nil and mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount())
			end
		end

		local mod = self.parent:FindModifierByName("modifier_templar_assassin_refraction_custom_absorb")
		if mod then
			local illusion_mod = illusion:AddNewModifier(self.parent, mod:GetAbility(), mod:GetName(), {})
			if illusion_mod then
				illusion_mod:SetStackCount(mod:GetStackCount())
			end
		end

		self.parent.templar_illusion = illusion:entindex()
		illusion:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_templar_assassin_psi_blades_custom_illusion",
			{ target = self.attacker, duration = duration }
		)
	end

	self.parent:SetAbsOrigin(new_pos)
	FindClearSpaceForUnit(self.parent, new_pos, true)
end

function modifier_templar_assassin_psi_blades_custom_invun:CheckState()
	local state = {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
	if not self.parent:IsChanneling() then
		state[MODIFIER_STATE_STUNNED] = true
	end

	return state
end

modifier_templar_assassin_psi_blades_custom_illusion = class({})
function modifier_templar_assassin_psi_blades_custom_illusion:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_illusion:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_illusion:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if table.target then
		self.target = EntIndexToHScript(table.target)

		if (self.parent:GetAbsOrigin() - self.target:GetAbsOrigin()):Length2D() < 1500 then
			self.parent:SetForceAttackTarget(self.target)
		end
	end

	self:StartIntervalThink(0.1)
end

function modifier_templar_assassin_psi_blades_custom_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.target == nil or self.target:IsNull() or not self.target:IsAlive() then
		self.target = nil
		self.parent:SetForceAttackTarget(nil)
	end
end

function modifier_templar_assassin_psi_blades_custom_illusion:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent.templar_illusion = nil

	if self.mod and not self.mod:IsNull() then
		self.mod:Destroy()
	end
end

function modifier_templar_assassin_psi_blades_custom_illusion:CheckState()
	return {
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
	}
end

modifier_templar_assassin_psi_blades_custom_invun_cd = class({})
function modifier_templar_assassin_psi_blades_custom_invun_cd:IsHidden()
	return false
end
function modifier_templar_assassin_psi_blades_custom_invun_cd:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_invun_cd:RemoveOnDeath()
	return false
end
function modifier_templar_assassin_psi_blades_custom_invun_cd:IsDebuff()
	return true
end
function modifier_templar_assassin_psi_blades_custom_invun_cd:GetTexture()
	return "buffs/psiblades_speed"
end
function modifier_templar_assassin_psi_blades_custom_invun_cd:OnCreated(table)
	self.RemoveForDuel = true
end

modifier_templar_assassin_psi_blades_custom_crystal_cd = class({})
function modifier_templar_assassin_psi_blades_custom_crystal_cd:IsHidden()
	return false
end
function modifier_templar_assassin_psi_blades_custom_crystal_cd:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_crystal_cd:IsDebuff()
	return true
end
function modifier_templar_assassin_psi_blades_custom_crystal_cd:RemoveOnDeath()
	return false
end

modifier_templar_assassin_psi_blades_custom_root = class({})
function modifier_templar_assassin_psi_blades_custom_root:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_root:IsPurgable()
	return true
end
function modifier_templar_assassin_psi_blades_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_templar_assassin_psi_blades_custom_root:OnCreated(table)
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end

	local duration = table.delay
	self:StartIntervalThink(duration + 0.1)
end

function modifier_templar_assassin_psi_blades_custom_root:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:EmitSound("TA.Shield_root")
	self.parent:GenericParticle("particles/templar_assassin/ta_shield_roots.vpcf", self)
	self:StartIntervalThink(-1)
end

modifier_templar_assassin_psi_blades_custom_root_cd = class({})
function modifier_templar_assassin_psi_blades_custom_root_cd:IsHidden()
	return true
end
function modifier_templar_assassin_psi_blades_custom_root_cd:IsPurgable()
	return false
end
function modifier_templar_assassin_psi_blades_custom_root_cd:RemoveOnDeath()
	return false
end