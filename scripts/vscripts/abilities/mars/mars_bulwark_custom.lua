--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_mars_bulwark_custom",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_bulwark_3"
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_idle",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_damage",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_bulwark_1"
)
LinkLuaModifier("modifier_mars_bulwark_custom_unit", "abilities/mars/mars_bulwark_custom", LUA_MODIFIER_MOTION_BOTH)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_unit_passive",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_BOTH
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_unit_attack",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_unit_tempo",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_unit_active",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_unit_legendary",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_bulwark_custom_legendary",
	"abilities/mars/mars_bulwark_custom",
	LUA_MODIFIER_MOTION_NONE
)

mars_bulwark_custom = class({})
mars_bulwark_custom.talents = {}

function mars_bulwark_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/mars/bulwark_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_shield_of_mars.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_shield_of_mars_small.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_revenge_proc.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_lowhp.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_pulse_debuff.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/vendetta_bash.vpcf", context)
	PrecacheResource("particle", "particles/mars/bulwark_legendary_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_shield_legendary.vpcf", context)
end

function mars_bulwark_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_speed = 0,
			e1_duration_creeps = caster:GetTalentValue("modifier_mars_bulwark_1", "duration_creeps", true),
			e1_duration = caster:GetTalentValue("modifier_mars_bulwark_1", "duration", true),
			e1_max = caster:GetTalentValue("modifier_mars_bulwark_1", "max", true),
			e1_stack = caster:GetTalentValue("modifier_mars_bulwark_1", "stack", true),

			e2_heal = 0,
			e2_bonus = caster:GetTalentValue("modifier_mars_bulwark_2", "bonus", true),

			has_e3 = 0,
			e3_damage = 0,
			e3_heal = 0,
			e3_chance = caster:GetTalentValue("modifier_mars_bulwark_3", "chance", true),
			e3_duration = caster:GetTalentValue("modifier_mars_bulwark_3", "duration", true),
			e3_max = caster:GetTalentValue("modifier_mars_bulwark_3", "max", true),
			e3_move = caster:GetTalentValue("modifier_mars_bulwark_3", "move", true),

			has_e4 = 0,
			e4_chance = caster:GetTalentValue("modifier_mars_bulwark_4", "chance", true),
			e4_stun = caster:GetTalentValue("modifier_mars_bulwark_4", "stun", true),
			e4_range = caster:GetTalentValue("modifier_mars_bulwark_4", "range", true),
			e4_talent_cd = caster:GetTalentValue("modifier_mars_bulwark_4", "talent_cd", true),

			has_e7 = 0,
			e7_duration_inc = caster:GetTalentValue("modifier_mars_bulwark_7", "duration_inc", true),
			e7_duration_max = caster:GetTalentValue("modifier_mars_bulwark_7", "duration_max", true),
			e7_damage_reduce = caster:GetTalentValue("modifier_mars_bulwark_7", "damage_reduce", true) / 100,
			e7_talent_cd = caster:GetTalentValue("modifier_mars_bulwark_7", "talent_cd", true),
			e7_duration = caster:GetTalentValue("modifier_mars_bulwark_7", "duration", true),
			e7_max = caster:GetTalentValue("modifier_mars_bulwark_7", "max", true),
			e7_speed = caster:GetTalentValue("modifier_mars_bulwark_7", "speed", true) / 100,

			has_h6 = 0,
			h6_break_effect = caster:GetTalentValue("modifier_mars_hero_6", "break_effect", true) / 100,
			h6_damage_reduce = caster:GetTalentValue("modifier_mars_hero_6", "damage_reduce", true),
			h6_heal = caster:GetTalentValue("modifier_mars_hero_6", "heal", true) / 100,
		}
	end

	if caster:HasTalent("modifier_mars_bulwark_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_mars_bulwark_1", "damage")
		self.talents.e1_speed = caster:GetTalentValue("modifier_mars_bulwark_1", "speed")
		caster:AddProc(self.tracker, { name = "hit", illusion = true, land = true })
	end

	if caster:HasTalent("modifier_mars_bulwark_2") then
		self.talents.e2_heal = caster:GetTalentValue("modifier_mars_bulwark_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_mars_bulwark_2",
			type = 2,
			value = function()
				return self.talents.e2_heal
					* (caster:HasModifier("modifier_mars_innate_custom_effect") and self.talents.e2_bonus or 1)
			end,
		})
	end

	if caster:HasTalent("modifier_mars_bulwark_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_mars_bulwark_3", "damage")
		self.talents.e3_heal = caster:GetTalentValue("modifier_mars_bulwark_3", "heal") / 100
		caster:AddProc(self.tracker, { name = "hit", illusion = true, land = true })
		caster:AddLifesteal(self.tracker, {
			name = "modifier_mars_bulwark_3",
			type = 2,
			value = function(params)
				return params.attack_damage_flag == "mars_e3" and self.talents.e3_heal or 0
			end,
		})
		caster:AddProc(self.tracker, { group = "modifier_mars_bulwark_3", extra = false, land = true })
	end

	if caster:HasTalent("modifier_mars_bulwark_4") then
		self.talents.has_e4 = 1
		caster:AddProc(
			self.tracker,
			{ name = "stun", group = "modifier_mars_bulwark_4", target_prd = true, illusion = true, land = true }
		)
	end

	if caster:HasTalent("modifier_mars_bulwark_7") then
		self.talents.has_e7 = 1
		caster:AddProc(self.tracker, { name = "hit", illusion = true, land = true })
	end

	if caster:HasTalent("modifier_mars_hero_6") then
		self.talents.has_h6 = 1
	end
end

function mars_bulwark_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_mars_bulwark_custom"
end

function mars_bulwark_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_mars_bulwark_custom_idle") then
		return "stop_icons/mars_bulwark"
	end
	return "mars_bulwark"
end

function mars_bulwark_custom:GetCooldown(iLevel)
	if self.talents.has_e7 == 1 then
		return self.talents.e7_talent_cd
	end
	return self.BaseClass.GetCooldown(self, iLevel)
end

function mars_bulwark_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
		+ (
			self.caster:HasModifier("modifier_mars_bulwark_custom_idle") and DOTA_ABILITY_BEHAVIOR_NO_TARGET
			or DOTA_ABILITY_BEHAVIOR_POINT
		)
end

function mars_bulwark_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_mars_bulwark_custom_idle")
	if mod then
		mod:Destroy()
		return
	end

	local duration
	if self.talents.has_e7 == 1 then
		duration = self.talents.e7_duration
		self.caster:AddNewModifier(self.caster, self, "modifier_mars_bulwark_custom_legendary", { duration = duration })
	end

	local point = self.caster:CastPosition(self:GetCursorPosition())
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_mars_bulwark_custom_idle",
		{ x = point.x, y = point.y, duration = duration }
	)
end

function mars_bulwark_custom:GetReduction(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.caster.mars_innate) then
		return 0
	end

	local result = self.caster.mars_innate:CheckAngle(params.attacker)

	if result == 0 then
		return 0
	end

	local break_effect = 1
	if self.caster:PassivesDisabled() then
		if self.talents.has_h6 == 1 then
			break_effect = 1 + self.talents.h6_break_effect
		else
			return 0
		end
	end

	local reduction = self.physical_damage_reduction
	local reduction_side = self.physical_damage_reduction_side
	local k = reduction_side / reduction

	if params.inflictor then
		if self.talents.has_h6 == 1 then
			reduction = self.talents.h6_damage_reduce
			reduction_side = reduction * k
		else
			return 0
		end
	end

	if result == 1 then
		return reduction * break_effect
	elseif result == 2 then
		return reduction_side * break_effect
	end
end

function mars_bulwark_custom:AddDamage(is_hero, more_stack)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e1 == 0 then
		return
	end

	local stack = more_stack and self.talents.e1_stack or 1
	local duration = is_hero and self.talents.e1_duration or self.talents.e1_duration_creeps
	local mod = self.caster:FindModifierByName("modifier_mars_bulwark_custom_damage")
	if mod then
		duration = math.max(duration, mod:GetRemainingTime())
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_mars_bulwark_custom_damage",
		{ duration = duration, stack = stack }
	)
end

function mars_bulwark_custom:ProcStun(target, source)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e4 == 0 then
		return
	end

	local chance = nil
	if not source then
		chance = self.talents.e4_chance
	end

	if not target:CheckCd("mars_e4", self.talents.e4_talent_cd, chance, "modifier_mars_bulwark_4") then
		return
	end

	if source ~= "rebuke" then
		target:EmitSound("Mars.Bulwark_bash")
	end

	local effect =
		ParticleManager:CreateParticle("particles/nyx_assassin/vendetta_bash.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(effect)

	target:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self, true),
		"modifier_bashed",
		{ duration = self.talents.e4_stun * (1 - target:GetStatusResistance()) }
	)
end

function mars_bulwark_custom:ProcSoldier(new_point, is_proc)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e3 == 0 then
		return
	end
	if not IsValid(self.tracker) then
		return
	end
	if self.tracker:GetStackCount() >= self.talents.e3_max then
		return
	end

	if not is_proc then
		if not RollPseudoRandomPercentage(self.talents.e3_chance, "modifier_mars_bulwark_3", self.caster) then
			return
		end
	end

	local point = new_point and new_point or (self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 150)
	local unit = self:CreateSoldier(point)

	unit:AddNewModifier(self.caster, self, "modifier_kill", { duration = self.talents.e3_duration })
	unit:AddNewModifier(self.caster, self, "modifier_mars_bulwark_custom_unit_tempo", {})
	unit:AddNewModifier(self.caster, self, "modifier_mars_bulwark_custom_unit_active", {})
end

function mars_bulwark_custom:CreateSoldier(point)
	if not IsServer() then
		return
	end
	local unit = CreateUnitByName("mars_arena_soldier_custom", point, false, nil, nil, self.caster:GetTeamNumber())

	unit.owner = self.caster
	unit:EmitSound("Mars.Bulwark_spawn")
	unit:RemoveGesture(ACT_DOTA_SPAWN)
	unit.ignore_assault = true
	unit:AddNewModifier(self.caster, self, "modifier_mars_bulwark_custom_unit_passive", {})

	return unit
end

modifier_mars_bulwark_custom_idle = class(mod_hidden)
function modifier_mars_bulwark_custom_idle:OnCreated(data)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.ability:EndCd(self.ability.talents.has_e7 == 1 and 0 or 0.5)

	self.parent:EmitSound("Mars.Bulwark_spawn")
	self.parent:EmitSound("Hero_Mars.Shield.Block")
	self.parent:GenericParticle("particles/units/heroes/hero_mars/mars_shield_of_mars.vpcf")

	self.soldier_attack_range = self.ability.soldier_range
		+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_range or 0)
	self.units = {}
	self.count = self.ability.talents.has_e7 == 1 and self.ability.talents.e7_max or self.ability.soldier_count
	self.dist = self.ability.soldier_dist

	for i = 1, self.count do
		local unit = self.ability:CreateSoldier(self.parent:GetAbsOrigin())

		unit:AddNewModifier(self.parent, self.ability, "modifier_mars_bulwark_custom_unit", { unit_id = i })
		unit:StartGesture(ACT_DOTA_IDLE)
		table.insert(self.units, unit)
	end

	self.mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_mars_bulwark_active", {})

	local point = self.parent:CastPosition(Vector(data.x, data.y, 0))
	self.parent:FacePoint(point)

	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_mars_bulwark_custom_idle:IsUnitInFrontRectangle(target)
	local parentPos = self.parent:GetAbsOrigin()
	local targetPos = target:GetAbsOrigin()

	local vDiff = targetPos - parentPos

	local vForward = self.parent:GetForwardVector()
	local vRight = self.parent:GetRightVector()

	local fDist = vDiff.x * vForward.x + vDiff.y * vForward.y
	local rDist = vDiff.x * vRight.x + vDiff.y * vRight.y

	if fDist >= 0 and fDist <= self.soldier_attack_range and math.abs(rDist) <= self.dist * (self.count / 2 + 1) then
		return true
	end

	return false
end

function modifier_mars_bulwark_custom_idle:OnIntervalThink()
	if not IsServer() then
		return
	end

	local interval = self.interval
	local origin = self.parent:GetAbsOrigin()
	local targets = self.parent:FindTargets(self.soldier_attack_range * 1.5)

	local count = 0
	local hit_hero = false
	local attack_interval = self:GetInterval()

	local attack_targets = {}

	for _, target in pairs(targets) do
		if count >= self.count then
			break
		elseif
			target:IsRealHero()
			and not target:IsAttackImmune()
			and not target:IsInvisible()
			and self:IsUnitInFrontRectangle(target)
		then
			table.insert(attack_targets, target)
			count = count + 1
		end
	end

	for _, target in pairs(targets) do
		if count >= self.count then
			break
		elseif
			not target:IsRealHero()
			and not target:IsAttackImmune()
			and not target:IsInvisible()
			and self:IsUnitInFrontRectangle(target)
		then
			table.insert(attack_targets, target)
			count = count + 1
		end
	end

	for _, target in ipairs(attack_targets) do
		interval = attack_interval
		local anim_duration = attack_interval + 0.1
		local attack_target = target

		if target:IsHero() then
			hit_hero = true
		end

		AddFOWViewer(self.parent:GetTeamNumber(), target:GetAbsOrigin(), 50, 1.5, false)

		for _, unit in pairs(self.units) do
			unit:RemoveModifierByName("modifier_mars_bulwark_custom_unit_attack")
			unit:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_mars_bulwark_custom_unit_attack",
				{ duration = anim_duration }
			)
		end
		Timers:CreateTimer(0.2, function()
			if IsValid(attack_target) then
				local abs = attack_target:GetAbsOrigin() - self.parent:GetForwardVector() * 150
				local particle = ParticleManager:CreateParticle(
					"particles/mars/bulwark_legendary_attack.vpcf",
					PATTACH_WORLDORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(particle, 0, abs)
				ParticleManager:SetParticleControlForward(particle, 0, self.parent:GetForwardVector())
				ParticleManager:ReleaseParticleIndex(particle)

				self.ability:ProcStun(attack_target)

				self.parent.mars_e = true
				self.parent:PerformAttack(attack_target, true, true, true, true, false, false, true)
				self.parent.mars_e = false
			end
		end)
	end

	if count > 0 then
		self.ability:AddDamage(hit_hero)
		self.ability:ProcSoldier()

		if self.ability.talents.has_e7 == 1 then
			self:IncrementStackCount()
		end
	end

	self:StartIntervalThink(interval)
end

function modifier_mars_bulwark_custom_idle:GetInterval()
	local result = self.ability.soldier_min_speed
	if IsValid(self.units[1]) then
		result = 1 / self.units[1]:GetAttacksPerSecond(true)
	end
	return math.min(self.ability.soldier_min_speed, result)
end

function modifier_mars_bulwark_custom_idle:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.mod) then
		self.mod:Destroy()
	end

	self.ability:StartCd()

	local duration =
		math.min(self.ability.talents.e7_duration_max, self:GetStackCount() * self.ability.talents.e7_duration_inc)
	if duration > 0 then
		self.parent:EmitSound("Mars.Legendary_start")
		self.parent:EmitSound("Mars.Legendary_start2")
		self.parent:EmitSound("Mars.Legendary_start_vo")
		self.parent:GenericParticle("particles/mars/bulwark_legendary_start.vpcf")
		self.parent:GenericParticle("particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf")
	end

	for _, unit in pairs(self.units) do
		if duration <= 0 then
			UTIL_Remove(unit)
		else
			unit:RemoveModifierByName("modifier_mars_bulwark_custom_unit")
			unit:RemoveModifierByName("modifier_mars_bulwark_custom_unit_attack")
			unit:AddNewModifier(self.parent, self.ability, "modifier_mars_bulwark_custom_unit_active", {})
			unit:AddNewModifier(self.parent, self.ability, "modifier_mars_bulwark_custom_unit_legendary", {})
			unit:AddNewModifier(self.parent, self.ability, "modifier_kill", { duration = duration })
		end
	end

	self.parent:RemoveModifierByName("modifier_mars_bulwark_custom_legendary")
end

function modifier_mars_bulwark_custom_idle:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_mars_bulwark_custom_idle:GetActivityTranslationModifiers()
	return "bulwark"
end

function modifier_mars_bulwark_custom_idle:GetModifierDisableTurning()
	return 1
end

function modifier_mars_bulwark_custom_idle:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_mars_bulwark_custom_idle:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

modifier_mars_bulwark_custom_unit_passive = class(mod_hidden)
function modifier_mars_bulwark_custom_unit_passive:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.base_speed = self.ability.soldier_speed
end

function modifier_mars_bulwark_custom_unit_passive:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

function modifier_mars_bulwark_custom_unit_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_mars_bulwark_custom_unit_passive:GetModifierAttackRangeBonus()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_range
end

function modifier_mars_bulwark_custom_unit_passive:GetModifierMoveSpeed_Absolute()
	return self.ability.talents.e3_move
end

function modifier_mars_bulwark_custom_unit_passive:GetModifierAttackSpeedBonus_Constant()
	if not IsServer() then
		return
	end
	local result = math.max(
		0,
		(self.caster:GetDisplayAttackSpeed() - 100)
			* (
				self.parent:HasModifier("modifier_mars_bulwark_custom_unit_legendary")
					and self.ability.talents.e7_speed
				or self.base_speed
			)
	)
	return result
end

modifier_mars_bulwark_custom_unit_legendary = class(mod_hidden)
function modifier_mars_bulwark_custom_unit_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.effect_cast =
		ParticleManager:CreateParticle("particles/mars/mars_shield_legendary.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_shield",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_weapon",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

function modifier_mars_bulwark_custom_unit_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_mars_bulwark_custom_unit_legendary:GetModifierModelScale()
	return 20
end

modifier_mars_bulwark_custom_unit_active = class(mod_hidden)
function modifier_mars_bulwark_custom_unit_active:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.vec = RandomVector(200)
	self.radius = 1000

	self:OnIntervalThink()
	self:StartIntervalThink(1)
end

function modifier_mars_bulwark_custom_unit_active:IsValidTarget(target)
	if not IsServer() then
		return
	end

	if
		not IsValid(target)
		or not target:IsAlive()
		or not target:IsUnit()
		or target:IsCourier()
		or ((target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius)
		or target:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
	then
		return false
	end

	return true
end

function modifier_mars_bulwark_custom_unit_active:SetTarget(target)
	if not IsServer() then
		return
	end
	if not self:IsValidTarget(target) then
		return
	end
	if self.target == target then
		return
	end

	self.target = target
	self.parent:MoveToTargetToAttack(self.target)
	self.parent:SetForceAttackTarget(self.target)
end

function modifier_mars_bulwark_custom_unit_active:MoveToCaster()
	if not IsServer() then
		return
	end

	self.target = nil
	self.parent:SetForceAttackTarget(nil)

	local point = self.caster:GetAbsOrigin() + self.vec

	if (point - self.parent:GetAbsOrigin()):Length2D() > 50 then
		self.parent:MoveToPosition(self.caster:GetAbsOrigin() + self.vec)
	end
end

function modifier_mars_bulwark_custom_unit_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self:StartIntervalThink(-1)
		return
	end

	local heroes = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)
	local creeps = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	if self:IsValidTarget(self.target) and self.target:IsHero() then
		self:SetTarget(self.target)
		return
	end

	if (not self:IsValidTarget(self.target) or not self.target:IsHero()) and #heroes > 0 then
		for _, hero in pairs(heroes) do
			if self:IsValidTarget(hero) then
				self:SetTarget(hero)
				break
			end
		end
	end

	if not self:IsValidTarget(self.target) and #creeps > 0 then
		for _, creep in pairs(creeps) do
			if self:IsValidTarget(creep) then
				self:SetTarget(creep)
				break
			end
		end
	end

	if not self:IsValidTarget(self.target) then
		self:MoveToCaster()
	end
end

modifier_mars_bulwark_custom_unit = class(mod_hidden)
function modifier_mars_bulwark_custom_unit:OnCreated(data)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.unit_id = tonumber(data.unit_id)

	self.distance = self.ability.soldier_dist

	self.parent:RemoveGesture(ACT_DOTA_IDLE)
	self:OnIntervalThink(true)
	self:StartIntervalThink(0.1)
end

function modifier_mars_bulwark_custom_unit:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	self:ApplyHorizontalMotionController()
end

function modifier_mars_bulwark_custom_unit:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_mars_bulwark_custom_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_mars_bulwark_custom_unit:GetActivityTranslationModifiers()
	return "bulwark"
end

function modifier_mars_bulwark_custom_unit:UpdateHorizontalMotion(me, dt)
	local poses = {
		[1] = self.caster:GetAbsOrigin() + self.caster:GetRightVector() * self.distance,
		[2] = self.caster:GetAbsOrigin() + self.caster:GetLeftVector() * self.distance,
		[3] = self.caster:GetAbsOrigin() + self.caster:GetRightVector() * self.distance * 2,
		[4] = self.caster:GetAbsOrigin() + self.caster:GetLeftVector() * self.distance * 2,
	}

	local main_angles = self.caster:GetAngles()
	local fPitch, fYaw, fRoll = main_angles.x, main_angles.y, main_angles.z

	local point = me:GetAbsOrigin()
	local target_point = poses[self.unit_id]
	local dir = target_point - point
	dir.z = 0

	local length = dir:Length2D()
	dir = dir:Normalized()

	me:SetAbsOrigin(target_point)
	me:SetAbsAngles(fPitch, fYaw, fRoll)

	if self.parent:HasModifier("modifier_mars_bulwark_custom_unit_attack") then
		return
	end

	if self.caster:IsMoving() or self.caster:HasModifier("modifier_mars_gods_rebuke_custom_charge") then
		self.parent:RemoveGesture(ACT_DOTA_IDLE)
		self.parent:StartGesture(ACT_DOTA_RUN)
	else
		self.parent:FadeGesture(ACT_DOTA_RUN)
		self.parent:StartGesture(ACT_DOTA_IDLE)
	end
end

function modifier_mars_bulwark_custom_unit:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	self.parent:FadeGesture(ACT_DOTA_RUN)
	self.parent:FadeGesture(ACT_DOTA_IDLE)
end

modifier_mars_bulwark_custom_unit_attack = class(mod_hidden)
function modifier_mars_bulwark_custom_unit_attack:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.parent:RemoveGesture(ACT_DOTA_IDLE)
	self.parent:RemoveGesture(ACT_DOTA_RUN)
	self.anim = ACT_DOTA_ATTACK
	if self.caster:IsMoving() then
		self.anim = ACT_DOTA_ATTACK2
	end

	self.parent:StartGestureWithPlaybackRate(self.anim, 1 / params.duration)
end

function modifier_mars_bulwark_custom_unit_attack:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent) then
		return
	end

	self.parent:FadeGesture(self.anim)
end

modifier_mars_bulwark_custom_unit_tempo = class(mod_hidden)
function modifier_mars_bulwark_custom_unit_tempo:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.ability.tracker:IncrementStackCount()
end

function modifier_mars_bulwark_custom_unit_tempo:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability.tracker) then
		return
	end
	self.ability.tracker:DecrementStackCount()
end

modifier_mars_bulwark_custom = class(mod_hidden)
function modifier_mars_bulwark_custom:IsHidden()
	return self.ability.talents.has_e3 == 0
end
function modifier_mars_bulwark_custom:GetTexture()
	return "buffs/mars/bulwark_3"
end
function modifier_mars_bulwark_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.bulwark_ability = self.ability

	self.ability.physical_damage_reduction = self.ability:GetSpecialValueFor("physical_damage_reduction")
	self.ability.physical_damage_reduction_side = self.ability:GetSpecialValueFor("physical_damage_reduction_side")
	self.ability.soldier_damage = self.ability:GetSpecialValueFor("soldier_damage")
	self.ability.soldier_count = self.ability:GetSpecialValueFor("soldier_count")
	self.ability.soldier_dist = self.ability:GetSpecialValueFor("soldier_dist")
	self.ability.soldier_range = self.ability:GetSpecialValueFor("soldier_range")
	self.ability.soldier_speed = self.ability:GetSpecialValueFor("soldier_speed") / 100
	self.ability.soldier_min_speed = self.ability:GetSpecialValueFor("soldier_min_speed")
end

function modifier_mars_bulwark_custom:OnRefresh()
	self.ability.physical_damage_reduction = self.ability:GetSpecialValueFor("physical_damage_reduction")
	self.ability.physical_damage_reduction_side = self.ability:GetSpecialValueFor("physical_damage_reduction_side")
	self.ability.soldier_damage = self.ability:GetSpecialValueFor("soldier_damage")
end

function modifier_mars_bulwark_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_mars_bulwark_custom_idle")
end

function modifier_mars_bulwark_custom:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if name == "stun" then
		if not params.attacker:HasModifier("modifier_mars_bulwark_custom_unit_passive") then
			return 0
		end
		if params.target:HasCd("mars_e4", self.ability.talents.e4_talent_cd) then
			return 0
		end
		return self.ability.talents.e4_chance
	end
	if self:GetStackCount() >= self.ability.talents.e3_max then
		return 0
	end
	return self.ability.talents.e3_chance
end

function modifier_mars_bulwark_custom:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	local target = params.target
	local attacker = params.attacker

	if
		attacker:HasModifier("modifier_mars_bulwark_custom_unit_passive")
		and attacker.owner
		and attacker.owner == self.parent
	then
		local flag = nil
		if attacker:HasModifier("modifier_mars_bulwark_custom_unit_tempo") then
			flag = "mars_e3"
			self.parent.mars_e3 = true
		elseif attacker:HasModifier("modifier_mars_bulwark_custom_unit_legendary") then
			flag = "mars_e7"
			self.parent.mars_e7 = true
		end

		self.parent:PerformAttack(target, true, true, true, true, false, false, true, { damage = flag, attack = flag })

		if flag == "mars_e3" then
			self.parent.mars_e3 = false
		elseif flag == "mars_e7" then
			self.parent.mars_e7 = false
			self.ability:ProcSoldier(target:GetAbsOrigin() + RandomVector(180))
		end

		self.ability:AddDamage(target:IsHero())
		if params.procs and params.procs[self] and params.procs[self].stun then
			self.ability:ProcStun(target, "proc")
		end
	end

	if self.parent ~= attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	self.ability:AddDamage(target:IsHero())

	if params.procs and params.procs[self] and params.procs[self].default then
		self.ability:ProcSoldier(target:GetAbsOrigin() + RandomVector(180), true)
	end
end

function modifier_mars_bulwark_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_mars_bulwark_custom:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end

	if self.parent.mars_e3 then
		return self.ability.talents.e3_damage - 100
	end

	if self.parent.mars_e7 then
		return self.ability.soldier_damage * (1 + self.ability.talents.e7_damage_reduce) - 100
	end

	if self.parent.mars_e then
		return self.ability.soldier_damage - 100
	end
end

function modifier_mars_bulwark_custom:GetModifierAttackRangeBonus()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_range
end

function modifier_mars_bulwark_custom:GetModifierConstantHealthRegen()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	local result = (self.parent:GetMaxHealth() - self.parent:GetHealth()) * self.ability.talents.h6_heal
	return result * (1 + (self.parent:PassivesDisabled() and self.ability.talents.h6_break_effect or 0))
end

function modifier_mars_bulwark_custom:GetModifierIncomingDamage_Percentage(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.parent.mars_innate) then
		return
	end

	local attacker = params.attacker
	local damage = params.damage
	local result = self.parent.mars_innate:CheckAngle(attacker)
	if result == 0 then
		return
	end

	local reduction = self.ability:GetReduction(params)
	if reduction >= 0 then
		return
	end

	local sound = "Hero_Mars.Shield.Block"
	local effect = "particles/units/heroes/hero_mars/mars_shield_of_mars.vpcf"

	if result == 2 or attacker:IsCreep() or params.inflictor or self.parent:PassivesDisabled() then
		sound = "Hero_Mars.Shield.BlockSmall"
		effect = "particles/units/heroes/hero_mars/mars_shield_of_mars_small.vpcf"
	end

	self.parent:EmitSound(sound)
	self.parent:GenericParticle(effect)
	self.parent:StartGesture(ACT_DOTA_OVERRIDE_ABILITY_2)

	self.parent:SendNumber(8, -1 * damage * reduction / 100)

	if
		self.parent:GetQuest() == "Mars.Quest_7"
		and params.attacker:IsRealHero()
		and not self.parent:QuestCompleted()
	then
		self.parent:UpdateQuest(math.floor(-1 * damage * reduction / 100))
	end

	return reduction
end

modifier_mars_bulwark_custom_damage = class(mod_visible)
function modifier_mars_bulwark_custom_damage:GetTexture()
	return "buffs/mars/bulwark_1"
end
function modifier_mars_bulwark_custom_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e1_max

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_mars_bulwark_custom_damage:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:SetStackCount(math.min(self.max, self:GetStackCount() + table.stack))
end

function modifier_mars_bulwark_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_mars_bulwark_custom_damage:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.e1_damage * self:GetStackCount() / self.max
end

function modifier_mars_bulwark_custom_damage:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.e1_speed * self:GetStackCount() / self.max
end

modifier_mars_bulwark_custom_legendary = class(mod_hidden)
function modifier_mars_bulwark_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max_time = self:GetRemainingTime()
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_mars_bulwark_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.mod) then
		self.mod = self.parent:FindModifierByName("modifier_mars_bulwark_custom_idle")
	end
	local stack = IsValid(self.mod) and self.mod:GetStackCount() or 0
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = stack,
		priority = 2,
		style = "MarsBulwark",
	})
end

function modifier_mars_bulwark_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "MarsBulwark" })
end