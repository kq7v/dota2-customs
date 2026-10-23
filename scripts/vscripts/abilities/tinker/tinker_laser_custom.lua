--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_tinker_laser_custom_tracker",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_tinker_laser_custom_blind", "abilities/tinker/tinker_laser_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_tinker_laser_custom_legendary",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_laser_custom_slow",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_laser_2"
)
LinkLuaModifier(
	"modifier_tinker_laser_custom_health_reduce",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_laser_3"
)
LinkLuaModifier(
	"modifier_tinker_laser_custom_legendary_stack",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_laser_7"
)
LinkLuaModifier(
	"modifier_tinker_laser_custom_stun_cd",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_hero_4"
)
LinkLuaModifier(
	"modifier_tinker_laser_custom_reduce",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_tinker_laser_3", "modifier_tinker_laser_4" }
)
LinkLuaModifier(
	"modifier_tinker_laser_custom_legendary_root",
	"abilities/tinker/tinker_laser_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_tinker_laser_7" }
)

tinker_laser_custom = class({})
tinker_laser_custom.talents = {}

function tinker_laser_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_laser.vpcf", context)
	PrecacheResource("particle", "particles/tinker/laser_legendary_radius.vpcf", context)
	PrecacheResource("particle", "amir4an/particles/heroes/tinker/amir4an_1x6/amir4an_1x6_tinker_laser.vpcf", context)
	PrecacheResource("particle", "particles/tinker/laser_legendary_hit.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/tinker/laser_stun.vpcf", context)
	PrecacheResource("particle", "particles/tinker/stun_stack.vpcf", context)
	PrecacheResource("particle", "particles/tinker/laser_mark.vpcf", context)
	PrecacheResource("particle", "particles/tinker/laser_proc_damage.vpcf", context)
	PrecacheResource("particle", "particles/tinker/matrix_legendary_laser.vpcf", context)
	PrecacheResource("particle", "particles/zeus/bolt_disarm.vpcf", context)
end

function tinker_laser_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_base = 0,
			q1_damage = 0,

			has_q2 = 0,
			q2_range_laser = 0,
			q2_range = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_tinker_laser_2", "duration", true),

			has_q3 = 0,
			q3_health_reduce = 0,
			q3_magic = 0,
			q3_max = caster:GetTalentValue("modifier_tinker_laser_3", "max", true),
			q3_effect_duration = caster:GetTalentValue("modifier_tinker_laser_3", "effect_duration", true),
			q3_duration = caster:GetTalentValue("modifier_tinker_laser_3", "duration", true),

			has_q4 = 0,
			q4_heal = caster:GetTalentValue("modifier_tinker_laser_4", "heal", true) / 100,
			q4_health = caster:GetTalentValue("modifier_tinker_laser_4", "health", true),
			q4_bonus = caster:GetTalentValue("modifier_tinker_laser_4", "bonus", true),
			q4_duration = caster:GetTalentValue("modifier_tinker_laser_4", "duration", true),
			q4_damage_reduce = caster:GetTalentValue("modifier_tinker_laser_4", "damage_reduce", true),

			has_q7 = 0,
			q7_interval = caster:GetTalentValue("modifier_tinker_laser_7", "interval", true),
			q7_max = caster:GetTalentValue("modifier_tinker_laser_7", "max", true),
			q7_damage_inc = caster:GetTalentValue("modifier_tinker_laser_7", "damage_inc", true) / 100,
			q7_range = caster:GetTalentValue("modifier_tinker_laser_7", "range", true),
			q7_duration = caster:GetTalentValue("modifier_tinker_laser_7", "duration", true),
			q7_heal_reduce = caster:GetTalentValue("modifier_tinker_laser_7", "heal_reduce", true),
			q7_damage = caster:GetTalentValue("modifier_tinker_laser_7", "damage", true) / 100,
			q7_range_bonus = caster:GetTalentValue("modifier_tinker_laser_7", "range_bonus", true),
			q7_root = caster:GetTalentValue("modifier_tinker_laser_7", "root", true),
			q7_effect_duration = caster:GetTalentValue("modifier_tinker_laser_7", "effect_duration", true),

			has_h4 = 0,
			h4_talent_cd = caster:GetTalentValue("modifier_tinker_hero_4", "talent_cd", true),
			h4_cast = caster:GetTalentValue("modifier_tinker_hero_4", "cast", true),
			h4_duration = caster:GetTalentValue("modifier_tinker_hero_4", "duration", true),
			h4_stun = caster:GetTalentValue("modifier_tinker_hero_4", "stun", true),

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_tinker_laser_1") then
		self.talents.has_q1 = 1
		self.talents.q1_base = caster:GetTalentValue("modifier_tinker_laser_1", "base")
		self.talents.q1_damage = caster:GetTalentValue("modifier_tinker_laser_1", "damage") / 100
	end

	if caster:HasTalent("modifier_tinker_laser_2") then
		self.talents.has_q2 = 1
		self.talents.q2_range_laser = caster:GetTalentValue("modifier_tinker_laser_2", "range_laser")
		self.talents.q2_range = caster:GetTalentValue("modifier_tinker_laser_2", "range")
		self.talents.q2_slow = caster:GetTalentValue("modifier_tinker_laser_2", "slow")
	end

	if caster:HasTalent("modifier_tinker_laser_3") then
		self.talents.has_q3 = 1
		self.talents.q3_health_reduce = caster:GetTalentValue("modifier_tinker_laser_3", "health_reduce")
		self.talents.q3_magic = caster:GetTalentValue("modifier_tinker_laser_3", "magic")
	end

	if caster:HasTalent("modifier_tinker_laser_4") then
		self.talents.has_q4 = 1
		caster:AddLifesteal(self.tracker, {
			name = "modifier_tinker_laser_4",
			type = 1,
			value = function()
				return self.talents.q4_heal
					* (caster:GetHealthPercent() <= self.talents.q4_health and self.talents.q4_bonus or 1)
			end,
		})
	end

	if caster:HasTalent("modifier_tinker_laser_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_tinker_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_tinker_matrix_7") then
		self.talents.has_e7 = 1
	end
end

function tinker_laser_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "tinker_laser", self)
end

function tinker_laser_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_tinker_laser_custom_tracker"
end

function tinker_laser_custom:GetAOERadius()
	return (self.aoe_radius or 0)
end

function tinker_laser_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h4 == 1 and self.talents.h4_cast or 0)
end

function tinker_laser_custom:GetRange()
	return self.talents.q7_range + self.talents.q2_range_laser
end

function tinker_laser_custom:GetDamage()
	return self.laser_damage + self.talents.q1_base + self.talents.q1_damage * self.caster:GetMaxHealth()
end

function tinker_laser_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_q7 == 1 then
		return self:GetRange() - self.caster:GetCastRangeBonus()
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function tinker_laser_custom:OnAbilityPhaseStart()
	local laser_weapon = self.caster:GetItemWearableHandle("weapon")
	if laser_weapon then
		laser_weapon:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	end
	return true
end

function tinker_laser_custom:OnAbilityPhaseInterrupted()
	local laser_weapon = self.caster:GetItemWearableHandle("weapon")
	if laser_weapon then
		laser_weapon:RemoveGesture(ACT_DOTA_CAST_ABILITY_1)
	end
end

function tinker_laser_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end
	local point = target:GetAbsOrigin()

	local attachment = (self.caster:ScriptLookupAttachment("attach_attack2") ~= 0 and self.talents.has_q7 == 0)
			and "attach_attack2"
		or "attach_attack1"
	local radius = self.aoe_radius
	local duration = self.blind_duration

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_tinker/tinker_laser.vpcf",
		self
	)
	local sound_start = "Hero_Tinker.Laser"
	local sound_impact = "Hero_Tinker.LaserImpact"

	local particle = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		9,
		self.caster,
		PATTACH_POINT_FOLLOW,
		attachment,
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:EmitSound(sound_start)
	target:EmitSound(sound_impact)
	local damage = self:GetDamage()

	for _, enemy in pairs(self.caster:FindTargets(radius, point)) do
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_laser_custom_blind",
			{ duration = (1 - enemy:GetStatusResistance()) * duration }
		)

		if self.talents.has_h4 == 1 then
			if not self.caster:HasModifier("modifier_tinker_laser_custom_stun_cd") then
				local mod = enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_stunned",
					{ duration = (1 - enemy:GetStatusResistance()) * self.talents.h4_stun }
				)
				enemy:EmitSound("Tinker.Laser_stun")
				if mod then
					enemy:GenericParticle("particles/tinker/laser_stun.vpcf", mod)
				end
				self.caster:AddNewModifier(
					self.caster,
					self,
					"modifier_tinker_laser_custom_stun_cd",
					{ duration = self.talents.h4_talent_cd }
				)
			end

			if enemy:IsRealHero() then
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_generic_vision",
					{ duration = self.talents.h4_duration }
				)
			end
		end

		if self.talents.has_q2 == 1 then
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_tinker_laser_custom_slow",
				{ duration = self.talents.q2_duration }
			)
		end

		if self.talents.has_q3 == 1 then
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_tinker_laser_custom_health_reduce",
				{ duration = self.talents.q3_effect_duration }
			)
		end

		if self.talents.has_q3 == 1 or self.talents.has_q4 == 1 then
			local reduce_duration = self.talents.has_q3 == 1 and self.talents.q3_duration or self.talents.q4_duration
			enemy:RemoveModifierByName("modifier_tinker_laser_custom_reduce")
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_tinker_laser_custom_reduce",
				{ duration = reduce_duration }
			)
		end

		local damageTable = {
			attacker = self.caster,
			damage = damage,
			victim = enemy,
			damage_type = DAMAGE_TYPE_MAGICAL,
			ability = self,
		}
		Timers:CreateTimer(0.1, function()
			DoDamage(damageTable)
		end)
	end

	if self.talents.has_q7 == 1 then
		self.caster:RemoveModifierByName("modifier_tinker_laser_custom_legendary")
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_tinker_laser_custom_legendary",
			{ target = target:entindex() }
		)
	end
end

modifier_tinker_laser_custom_blind = class(mod_visible)
function modifier_tinker_laser_custom_blind:IsPurgable()
	return true
end
function modifier_tinker_laser_custom_blind:OnCreated(params)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.miss_chance = self.parent:IsCreep() and self.ability.miss_rate_creeps or self.ability.miss_rate
end

function modifier_tinker_laser_custom_blind:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MISS_PERCENTAGE,
	}
end

function modifier_tinker_laser_custom_blind:GetModifierMiss_Percentage(params)
	if params.target and params.target:IsBuilding() then
		return
	end
	return self.miss_chance
end

modifier_tinker_laser_custom_tracker = class(mod_hidden)
function modifier_tinker_laser_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.blind_duration = self.ability:GetSpecialValueFor("duration")
	self.ability.laser_damage = self.ability:GetSpecialValueFor("laser_damage")
	self.ability.aoe_radius = self.ability:GetSpecialValueFor("radius")
	self.ability.miss_rate = self.ability:GetSpecialValueFor("miss_rate")
	self.ability.miss_rate_creeps = self.ability:GetSpecialValueFor("miss_rate_creeps")
end

function modifier_tinker_laser_custom_tracker:OnRefresh(table)
	self.ability.laser_damage = self.ability:GetSpecialValueFor("laser_damage")
	self.ability.blind_duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_tinker_laser_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_tinker_laser_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_q7 == 1 then
		return
	end
	return self.ability.talents.q2_range
end

modifier_tinker_laser_custom_legendary = class(mod_hidden)
function modifier_tinker_laser_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.range = self.ability:GetRange() + self.ability.talents.q7_range_bonus
	self.radius = self.ability.aoe_radius
	self.duration = self.ability.talents.q7_duration

	self.target = EntIndexToHScript(table.target)
	self.ability:SetActivated(false)

	self.damage_interval = self.ability.talents.q7_interval
	self.max = self.duration / self.damage_interval

	self.damage_k = self.ability.talents.q7_damage
	local mod = self.target:FindModifierByName("modifier_tinker_laser_custom_legendary_stack")
	if mod then
		self.damage_k = self.damage_k + mod:GetStackCount() * self.ability.talents.q7_damage_inc
		if mod:GetRemainingTime() <= self.duration then
			mod:SetDuration(self.duration + 0.5, true)
		end
	end
	self.damage = (self.ability:GetDamage() * self.damage_k) / self.duration
	self.damageTable = {
		ability = self.ability,
		attacker = self.parent,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.damage * self.damage_interval,
	}

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/tinker/matrix_legendary_laser.vpcf",
		self,
		"tinker_laser_custom"
	)
	local particle = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		9,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(particle, false, false, -1, false, false)

	self.radius_visual = ParticleManager:CreateParticleForPlayer(
		"particles/tinker/laser_legendary_radius.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.range, 0, 0))
	self:AddParticle(self.radius_visual, false, false, -1, false, false)

	self.interval = 0.05
	self.count = -self.interval
	self.damage_count = 0
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_tinker_laser_custom_legendary:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if
		not IsValid(self.target)
		or not self.target:IsAlive()
		or (self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() >= self.range
	then
		self.interrupted = true
		self:Destroy()
		return
	end

	if not first and not self.sound_init then
		self.sound_init = true
		self.parent:EmitSound("Tinker.Laser_legendary_cast")
		self.target:EmitSound("Tinker.Laser_legendary_cast2")
	end

	AddFOWViewer(self.target:GetTeamNumber(), self.parent:GetAbsOrigin(), 10, self.interval * 2, false)
	AddFOWViewer(self.parent:GetTeamNumber(), self.target:GetAbsOrigin(), 10, self.interval * 2, false)
	self.count = self.count + self.interval

	self.parent:UpdateUIshort({
		max_time = self.duration,
		time = self.duration - self:GetElapsedTime(),
		stack = (self.damage_k * 100) .. "%",
		priority = 1,
		style = "TinkerLaser",
	})

	if self.count < self.damage_interval then
		return
	end
	self.count = 0

	for _, enemy in pairs(self.parent:FindTargets(self.radius, self.target:GetAbsOrigin())) do
		self.damageTable.victim = enemy
		DoDamage(self.damageTable, "modifier_tinker_laser_7")
		local particle = ParticleManager:CreateParticle(
			"particles/tinker/laser_legendary_hit.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			enemy
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			enemy,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			Vector(0, 0, 0),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
		enemy:EmitSound("Tinker.Laser_legendary_hit")
	end

	self.damage_count = self.damage_count + 1

	if self.damage_count >= self.max then
		self:SetDuration(0.2, true)
		self:StartIntervalThink(-1)
		return
	end
end

function modifier_tinker_laser_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:SetActivated(true)

	if IsValid(self.target) and not self.interrupted then
		self.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_tinker_laser_custom_legendary_root",
			{ duration = (1 - self.target:GetStatusResistance()) * self.ability.talents.q7_root }
		)
		self.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_tinker_laser_custom_legendary_stack",
			{ duration = self.ability.talents.q7_effect_duration }
		)
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 1, style = "TinkerLaser" })

	self.parent:StopSound("Tinker.Laser_legendary_cast")
	if IsValid(self.target) then
		self.target:StopSound("Tinker.Laser_legendary_cast2")
	end
end

modifier_tinker_laser_custom_slow = class(mod_hidden)
function modifier_tinker_laser_custom_slow:IsPurgable()
	return true
end
function modifier_tinker_laser_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.slow = self.ability.talents.q2_slow
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", self)
end

function modifier_tinker_laser_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_tinker_laser_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_tinker_laser_custom_health_reduce = class(mod_visible)
function modifier_tinker_laser_custom_health_reduce:GetTexture()
	return "buffs/tinker/laser_3"
end
function modifier_tinker_laser_custom_health_reduce:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.max = self.ability.talents.q3_max
	self.health_reduce = self.ability.talents.q3_health_reduce / self.max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_tinker_laser_custom_health_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/items4_fx/spirit_vessel_damage.vpcf", self)
	end
end

function modifier_tinker_laser_custom_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end

	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_tinker_laser_custom_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_tinker_laser_custom_health_reduce:GetModifierExtraHealthPercentage()
	return self.health_reduce * self:GetStackCount()
end

modifier_tinker_laser_custom_legendary_stack = class(mod_visible)
function modifier_tinker_laser_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.talents.q7_heal_reduce

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if self.ability.talents.has_e7 == 0 then
		self.particle = self.parent:GenericParticle("particles/tinker/stun_stack.vpcf", self, true)
	end
	self:OnRefresh()
end

function modifier_tinker_laser_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.talents.q7_max then
		return
	end
	self:IncrementStackCount()

	if self.particle then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end
end

function modifier_tinker_laser_custom_legendary_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_tinker_laser_custom_legendary_stack:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_tinker_laser_custom_legendary_stack:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

modifier_tinker_laser_custom_stun_cd = class(mod_cd)
function modifier_tinker_laser_custom_stun_cd:GetTexture()
	return "buffs/tinker/hero_4"
end

modifier_tinker_laser_custom_reduce = class(mod_hidden)
function modifier_tinker_laser_custom_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.q3_magic
	self.damage_reduce = self.ability.talents.q4_damage_reduce
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q4 == 0 then
		return
	end
	self:SetStackCount(1)

	if self.caster:GetHealthPercent() <= self.ability.talents.q4_health then
		self:SetStackCount(self.ability.talents.q4_bonus)
	end
	self.particle = self.parent:GenericParticle("particles/zeus/bolt_disarm.vpcf", self, true)
end

function modifier_tinker_laser_custom_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_tinker_laser_custom_reduce:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_q3 == 0 then
		return
	end
	return self.magic
end

function modifier_tinker_laser_custom_reduce:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.damage_reduce * self:GetStackCount()
end

function modifier_tinker_laser_custom_reduce:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.damage_reduce * self:GetStackCount()
end

modifier_tinker_laser_custom_legendary_root = class(mod_hidden)
function modifier_tinker_laser_custom_legendary_root:IsPurgable()
	return true
end
function modifier_tinker_laser_custom_legendary_root:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.particle = self.parent:GenericParticle("particles/tinker/laser_stun.vpcf", self)
end

function modifier_tinker_laser_custom_legendary_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end