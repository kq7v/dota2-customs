--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_slow",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_legendary",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_legendary_count",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_storm_7"
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_legendary_speed",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_leshrac_storm_7" }
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_tracker",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_speed",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_storm_3"
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_silence_cd",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_storm_4"
)
LinkLuaModifier(
	"modifier_leshrac_lightning_storm_custom_root",
	"abilities/leshrac/leshrac_lightning_storm_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_storm_7"
)

leshrac_lightning_storm_custom = class({})
leshrac_lightning_storm_custom.talents = {}

function leshrac_lightning_storm_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/leshrac/storm_refresh.vpcf", context)
	PrecacheResource("particle", "particles/leshrac/leshrac_storm.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_lightning_bolt.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_lightning_slow.vpcf", context)
	PrecacheResource("particle", "particles/leshrac/lesh_charges.vpcf", context)
	PrecacheResource("particle", "particles/leshrac/storm_max.vpcf", context)
	PrecacheResource("particle", "particles/templar_assassin/ta_shield_roots.vpcf", context)
end

function leshrac_lightning_storm_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_damage_earth = 0,
			e1_int = 0,

			has_e2 = 0,
			e2_heal = 0,
			e2_cd = 0,

			has_e3 = 0,
			e3_damage = 0,
			e3_speed = 0,
			e3_max = caster:GetTalentValue("modifier_leshrac_storm_3", "max", true),
			e3_slow = caster:GetTalentValue("modifier_leshrac_storm_3", "slow", true),
			e3_chance = caster:GetTalentValue("modifier_leshrac_storm_3", "chance", true),
			e3_count = caster:GetTalentValue("modifier_leshrac_storm_3", "count", true),
			e3_duration = caster:GetTalentValue("modifier_leshrac_storm_3", "duration", true),

			has_e4 = 0,
			e4_talent_cd = caster:GetTalentValue("modifier_leshrac_storm_4", "talent_cd", true),
			e4_cast = caster:GetTalentValue("modifier_leshrac_storm_4", "cast", true),
			e4_distance_min = caster:GetTalentValue("modifier_leshrac_storm_4", "distance_min", true),
			e4_silence = caster:GetTalentValue("modifier_leshrac_storm_4", "silence", true),
			e4_slow = caster:GetTalentValue("modifier_leshrac_storm_4", "slow", true),
			e4_distance_max = caster:GetTalentValue("modifier_leshrac_storm_4", "distance_max", true),
			e4_duration = caster:GetTalentValue("modifier_leshrac_storm_4", "duration", true),

			has_e7 = 0,
			e7_damage = caster:GetTalentValue("modifier_leshrac_storm_7", "damage", true) / 100,
			e7_interval = caster:GetTalentValue("modifier_leshrac_storm_7", "interval", true),
			e7_effect_duration = caster:GetTalentValue("modifier_leshrac_storm_7", "effect_duration", true),
			e7_max = caster:GetTalentValue("modifier_leshrac_storm_7", "max", true),
			e7_bva = caster:GetTalentValue("modifier_leshrac_storm_7", "bva", true),
			e7_radius = caster:GetTalentValue("modifier_leshrac_storm_7", "radius", true),
			e7_duration = caster:GetTalentValue("modifier_leshrac_storm_7", "duration", true),
			e7_duration_hero = caster:GetTalentValue("modifier_leshrac_storm_7", "duration_hero", true),
			e7_root = caster:GetTalentValue("modifier_leshrac_storm_7", "root", true),
			e7_visual_max = 4,

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_leshrac_storm_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_leshrac_storm_1", "damage") / 100
		self.talents.e1_damage_earth = caster:GetTalentValue("modifier_leshrac_storm_1", "damage_earth") / 100
		self.talents.e1_int = caster:GetTalentValue("modifier_leshrac_storm_1", "int") / 100
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_leshrac_storm_2") then
		self.talents.has_e2 = 1
		self.talents.e2_heal = caster:GetTalentValue("modifier_leshrac_storm_2", "heal") / 100
		self.talents.e2_cd = caster:GetTalentValue("modifier_leshrac_storm_2", "cd")
		caster:AddAttackStartEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_leshrac_storm_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_leshrac_storm_3", "damage") / 100
		self.talents.e3_speed = caster:GetTalentValue("modifier_leshrac_storm_3", "speed")
		caster:AddProc(self.tracker, { name = "hit", land = true })
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_leshrac_storm_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true })
	end

	if caster:HasTalent("modifier_leshrac_storm_7") then
		self.talents.has_e7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
			caster:AddAttackStartEvent_out(self.tracker, true)
		end
	end

	if caster:HasTalent("modifier_leshrac_earth_7") then
		self.talents.has_q7 = 1
	end
end

function leshrac_lightning_storm_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_leshrac_lightning_storm_custom_tracker"
end

function leshrac_lightning_storm_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e2_cd or 0)
end

function leshrac_lightning_storm_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
end

function leshrac_lightning_storm_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_e4 == 1 and self.talents.e4_cast or 0)
end

function leshrac_lightning_storm_custom:GetAOERadius()
	if self.talents.has_e7 == 1 then
		return self.talents.e7_radius
			+ (IsValid(self.caster.leshrac_innate) and self.caster.leshrac_innate:GetRange() or 0)
	end
	return 0
end

function leshrac_lightning_storm_custom:OnSpellStart()
	if self.talents.has_e7 == 1 then
		local point = self:GetCursorPosition()
		local mod = self.caster:FindModifierByName("modifier_leshrac_lightning_storm_custom_legendary_count")
		local count = 0
		if mod then
			count = mod:GetStackCount()
			mod:Destroy()
			self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_leshrac_lightning_storm_custom_legendary_speed",
				{ duration = self.talents.e7_effect_duration, count = count }
			)
		end
		CreateModifierThinker(
			self.caster,
			self,
			"modifier_leshrac_lightning_storm_custom_legendary",
			{ count = count },
			point,
			self.caster:GetTeamNumber(),
			false
		)
		return
	end

	local target = self:GetCursorTarget()
	if target:TriggerSpellAbsorb(self) then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_leshrac_lightning_storm_custom",
		{ target = target:entindex() }
	)
end

function leshrac_lightning_storm_custom:DealDamage(target, ability)
	if not IsServer() then
		return
	end
	if not target:IsUnit() then
		return
	end

	local damage = self.damage + self.talents.e1_damage * self.caster:GetIntellect(false)
	if self.talents.has_q7 == 1 then
		damage = self.damage + self.talents.e1_damage_earth * self.caster:GetAverageTrueAttackDamage(nil)
	end

	local new_duration

	if ability and ability == "modifier_leshrac_storm_3" then
		damage = damage * self.talents.e3_damage
		new_duration = self.talents.e3_slow
	end

	if ability and ability == "modifier_leshrac_storm_7" then
		damage = damage * (self.talents.e7_damage / self.talents.e7_max)
	else
		self:ApplySlow(target, new_duration)
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_leshrac/leshrac_lightning_bolt.vpcf",
		PATTACH_CUSTOMORIGIN,
		target
	)
	ParticleManager:SetParticleControl(effect_cast, 0, target:GetAbsOrigin() + Vector(0, 0, 1500))
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	target:EmitSound("Hero_Leshrac.Lightning_Storm")

	DoDamage(
		{
			victim = target,
			damage = damage,
			damage_type = self.talents.has_q7 == 1 and DAMAGE_TYPE_PHYSICAL or DAMAGE_TYPE_MAGICAL,
			attacker = self.caster,
			ability = self,
		},
		ability
	)
end

function leshrac_lightning_storm_custom:ApplySlow(target, new_duration)
	if not IsServer() then
		return
	end
	local duration = self.slow_duration + (self.talents.has_e4 == 1 and self.talents.e4_slow or 0)
	if new_duration then
		duration = new_duration
	end
	duration = duration * (1 - target:GetStatusResistance())

	local mod = target:FindModifierByName("modifier_leshrac_lightning_storm_custom_slow")
	if mod then
		duration = math.max(mod:GetRemainingTime(), duration)
	end
	target:AddNewModifier(self.caster, self, "modifier_leshrac_lightning_storm_custom_slow", { duration = duration })
end

function leshrac_lightning_storm_custom:ProcSpeed()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self,
		"modifier_leshrac_lightning_storm_custom_speed",
		{ duration = self.talents.e3_duration }
	)
end

modifier_leshrac_lightning_storm_custom = class(mod_hidden)
function modifier_leshrac_lightning_storm_custom:RemoveOnDeath()
	return false
end
function modifier_leshrac_lightning_storm_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_leshrac_lightning_storm_custom:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.jump_delay = self.ability.jump_delay
	self.radius = self.ability.radius

	self.jump_count = self.ability.jump_count
	self.damage_ability = params.damage_ability
	self.units_affected = {}

	if self.damage_ability and self.damage_ability == "modifier_leshrac_storm_3" then
		self.jump_count = self.ability.talents.e3_count
	end

	self.unit_counter = 0

	self:DoDamage(EntIndexToHScript(params.target))
	self:StartIntervalThink(self.jump_delay)
end

function modifier_leshrac_lightning_storm_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.current_unit) then
		self:Destroy()
		return
	end

	self.zapped = false

	local enemies = self.parent:FindTargets(
		self.radius,
		self.current_unit:GetAbsOrigin(),
		nil,
		DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS
	)
	for _, enemy in pairs(enemies) do
		if not self.units_affected[enemy] and enemy:IsUnit() then
			self.unit_counter = self.unit_counter + 1
			self.zapped = true
			self:DoDamage(enemy)
			break
		end
	end

	if self.unit_counter >= self.jump_count or not self.zapped then
		self:StartIntervalThink(-1)
		self:Destroy()
	end
end

function modifier_leshrac_lightning_storm_custom:DoDamage(target)
	if not IsServer() then
		return
	end
	if not IsValid(target) then
		self:Destroy()
		return
	end

	self.units_affected[target] = true
	self.current_unit = target

	self.ability:DealDamage(target, self.damage_ability)
end

modifier_leshrac_lightning_storm_custom_legendary = class(mod_hidden)
function modifier_leshrac_lightning_storm_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.origin = self.parent:GetAbsOrigin()

	self.radius = self.ability:GetAOERadius()
	self.count = 1 + table.count
	self.root = (table.count >= self.ability.talents.e7_max)

	EmitSoundOnLocationWithCaster(self.origin, "Leshrac.Storm_legendary_start", self.caster)

	self.particle =
		ParticleManager:CreateParticle("particles/leshrac/leshrac_storm.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.particle, 0, self.origin)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.radius, 0, 0))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.interval = self.ability.talents.e7_interval

	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_leshrac_lightning_storm_custom_legendary:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.origin, self.radius, self.interval * 2, false)

	local damage_ability = "modifier_leshrac_storm_7"
	if first then
		damage_ability = nil
	end

	local enemies = self.caster:FindTargets(self.radius, self.origin)
	for _, target in pairs(enemies) do
		self.ability:DealDamage(target, damage_ability)
		if first and self.root then
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_leshrac_lightning_storm_custom_root",
				{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e7_root }
			)
		end
	end

	if #enemies <= 0 then
		local point = self.origin + RandomVector(RandomInt(50, self.radius * 0.8))
		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_leshrac/leshrac_lightning_bolt.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(effect_cast, 0, point + Vector(0, 0, 1500))
		ParticleManager:SetParticleControl(effect_cast, 1, point)
		ParticleManager:ReleaseParticleIndex(effect_cast)
		EmitSoundOnLocationWithCaster(point, "Hero_Leshrac.Lightning_Storm", self.caster)
	end

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_leshrac_lightning_storm_custom_slow = class(mod_hidden)
function modifier_leshrac_lightning_storm_custom_slow:IsPurgable()
	return true
end
function modifier_leshrac_lightning_storm_custom_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.slow = self.ability.slow_movement_speed

	if not IsServer() then
		return
	end

	self.particle_index = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_leshrac/leshrac_lightning_slow.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle_index, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle_index, 1, self.parent:GetAbsOrigin())
	self:AddParticle(self.particle_index, false, false, -1, false, false)
end

function modifier_leshrac_lightning_storm_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_leshrac_lightning_storm_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_leshrac_lightning_storm_custom_legendary_count = class(mod_hidden)
function modifier_leshrac_lightning_storm_custom_legendary_count:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_max
	self.visual_max = self.ability.talents.e7_visual_max
	self.particle = self.parent:GenericParticle("particles/leshrac/lesh_charges.vpcf", self, true)
	self:OnRefresh()
end

function modifier_leshrac_lightning_storm_custom_legendary_count:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.ability.tracker then
		self.ability.tracker:UpdateUI()
	end

	if not self.particle then
		return
	end

	for i = 1, self.visual_max do
		if i <= math.floor(self:GetStackCount() / (self.max / self.visual_max)) then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end
end

function modifier_leshrac_lightning_storm_custom_legendary_count:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.tracker then
		self.ability.tracker:UpdateUI()
	end
end

modifier_leshrac_lightning_storm_custom_legendary_speed = class(mod_visible)
function modifier_leshrac_lightning_storm_custom_legendary_speed:GetStatusEffectName()
	return "particles/status_fx/status_effect_mjollnir_shield.vpcf"
end
function modifier_leshrac_lightning_storm_custom_legendary_speed:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_leshrac_lightning_storm_custom_legendary_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false)

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Leshrac.Edict_damage")

	self.max_particle =
		ParticleManager:CreateParticle("particles/leshrac/storm_max.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.max_particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.max_particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.max_particle, 2, self.parent:GetAbsOrigin())
	self:AddParticle(self.max_particle, false, false, 0, true, false)

	self:SetStackCount(table.count)
end

function modifier_leshrac_lightning_storm_custom_legendary_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_leshrac_lightning_storm_custom_legendary_speed:GetModifierBaseAttackTimeConstant()
	if not self.bva then
		return
	end
	return self.bva + self.ability.talents.e7_bva * (self:GetStackCount() / self.ability.talents.e7_max)
end

modifier_leshrac_lightning_storm_custom_tracker = class(mod_hidden)
function modifier_leshrac_lightning_storm_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.storm_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.jump_count = self.ability:GetSpecialValueFor("jump_count")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.jump_delay = self.ability:GetSpecialValueFor("jump_delay")
	self.ability.slow_movement_speed = self.ability:GetSpecialValueFor("slow_movement_speed")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_leshrac_lightning_storm_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.jump_count = self.ability:GetSpecialValueFor("jump_count")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
end

function modifier_leshrac_lightning_storm_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end

	local stack = 0
	local active = 0
	local zero = false
	local override_stack = nil
	local max = self.ability.talents.e7_max

	local mod = self.parent:FindModifierByName("modifier_leshrac_lightning_storm_custom_legendary_count")

	if mod then
		stack = mod:GetStackCount()
		if mod:GetStackCount() >= max then
			active = 1
		end
		if self.particle then
			ParticleManager:DestroyParticle(self.particle, true)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
	else
		if not self.particle then
			self.particle = self.parent:GenericParticle("particles/leshrac/lesh_charges.vpcf", self, true)
			for i = 1, self.ability.talents.e7_visual_max do
				ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
			end
		end
	end

	if self.ability:GetCooldownTimeRemaining() > 0 then
		active = 0
		stack = 0
		override_stack = self.ability:GetCooldownTimeRemaining()
		zero = true
		self:StartIntervalThink(0.1)
	else
		self:StartIntervalThink(-1)
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = max,
		override_stack = override_stack,
		active = active,
		use_zero = zero,
		style = "LeshracStorm",
	})
end

function modifier_leshrac_lightning_storm_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

function modifier_leshrac_lightning_storm_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	if self.ability.talents.has_e2 == 1 then
		local result = self.parent:CanLifesteal(params.target)
		if result then
			self.parent:GenericHeal(
				self.parent:GetIntellect(false) * self.ability.talents.e2_heal * result,
				self.ability,
				true,
				"",
				"modifier_leshrac_storm_2"
			)
		end
	end

	if self.ability.talents.has_e7 == 0 then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	if self.ability:GetCooldownTimeRemaining() > 0 then
		return
	end

	local duration = params.target:IsCreep() and self.ability.talents.e7_duration
		or self.ability.talents.e7_duration_hero
	local mod = self.parent:FindModifierByName("modifier_leshrac_lightning_storm_custom_legendary_count")
	if mod then
		duration = math.max(mod:GetRemainingTime(), duration)
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_leshrac_lightning_storm_custom_legendary_count",
		{ duration = duration }
	)
end

function modifier_leshrac_lightning_storm_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.e3_chance
end

function modifier_leshrac_lightning_storm_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local target = params.target

	if
		self.ability.talents.has_e4 == 1
		and target:IsHero()
		and not target:IsDebuffImmune()
		and not self.parent:HasModifier("modifier_leshrac_lightning_storm_custom_silence_cd")
		and not params.no_attack_cooldown
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_leshrac_lightning_storm_custom_silence_cd",
			{ duration = self.ability.talents.e4_talent_cd }
		)
		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin())
		vec.z = 0

		local distance = vec:Length2D()
		vec = vec:Normalized()

		local dist_k = math.max(0, math.min(1, 1 - distance / 800))
		distance = self.ability.talents.e4_distance_min
			+ dist_k * (self.ability.talents.e4_distance_max - self.ability.talents.e4_distance_min)

		target:AddNewModifier(self.parent, self.ability, "modifier_generic_knockback", {
			direction_x = vec.x,
			direction_y = vec.y,
			distance = distance,
			height = 0,
			duration = self.ability.talents.e4_duration,
			IsStun = false,
			IsFlail = true,
		})

		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_leshrac/leshrac_lightning_bolt.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		target:EmitSound("Hero_Leshrac.Lightning_Storm")
		target:EmitSound("Sf.Raze_silence")
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_silence",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e4_silence }
		)
		self.ability:ApplySlow(target)
	end

	if not params.procs[self].default then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_leshrac_lightning_storm_custom", {
		target = target:entindex(),
		damage_ability = "modifier_leshrac_storm_3",
	})
end

function modifier_leshrac_lightning_storm_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_leshrac_lightning_storm_custom_tracker:GetModifierBonusStats_Intellect()
	return self.ability.talents.e1_int * (self.parent:GetStrength() + self.parent:GetAgility())
end

modifier_leshrac_lightning_storm_custom_speed = class(mod_visible)
function modifier_leshrac_lightning_storm_custom_speed:GetTexture()
	return "buffs/leshrac/storm_3"
end
function modifier_leshrac_lightning_storm_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_leshrac_lightning_storm_custom_speed:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_leshrac_lightning_storm_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_leshrac_lightning_storm_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self:GetStackCount() * self.ability.talents.e3_speed
end

modifier_leshrac_lightning_storm_custom_silence_cd = class(mod_cd)
function modifier_leshrac_lightning_storm_custom_silence_cd:GetTexture()
	return "buffs/leshrac/storm_4"
end

modifier_leshrac_lightning_storm_custom_root = class(mod_hidden)
function modifier_leshrac_lightning_storm_custom_root:IsPurgable()
	return true
end
function modifier_leshrac_lightning_storm_custom_root:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/templar_assassin/ta_shield_roots.vpcf", self)
end

function modifier_leshrac_lightning_storm_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end