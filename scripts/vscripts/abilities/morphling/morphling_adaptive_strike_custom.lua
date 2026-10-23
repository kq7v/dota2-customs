--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_morphling_adaptive_strike_custom_tracker",
	"abilities/morphling/morphling_adaptive_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_adaptive_strike_custom_legendary_aoe",
	"abilities/morphling/morphling_adaptive_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_adaptive_strike_custom_auto_delay",
	"abilities/morphling/morphling_adaptive_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_adaptive_strike_custom_shield_stack",
	"abilities/morphling/morphling_adaptive_strike_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_morphling_adaptive_4"
)

morphling_adaptive_strike_custom = class({})
morphling_adaptive_strike_custom.talents = {}

function morphling_adaptive_strike_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_morphling/morphling_adaptive_strike_agi_proj.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_morphling/morphling_adaptive_strike_str_proj.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_morphling/morphling_adaptive_strike.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_morphling/morphling_adaptive_strike_str.vpcf", context)
	PrecacheResource("particle", "particles/morphling/adaptive_aoe.vpcf", context)
	PrecacheResource("particle", "particles/morphling/adaptive_aoe_zone.vpcf", context)
	PrecacheResource("particle", "particles/morphling/adaptive_refresh.vpcf", context)
	PrecacheResource("particle", "particles/morphling/adaptive_shield.vpcf", context)
end

function morphling_adaptive_strike_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,

			has_w2 = 0,
			w2_stun = 0,
			w2_cd = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_cdr = 0,
			w3_delay = caster:GetTalentValue("modifier_morphling_adaptive_3", "delay", true),
			w3_delay_wave = caster:GetTalentValue("modifier_morphling_adaptive_3", "delay_wave", true),
			w3_chance = caster:GetTalentValue("modifier_morphling_adaptive_3", "chance", true),

			has_w4 = 0,
			w4_heal = caster:GetTalentValue("modifier_morphling_adaptive_4", "heal", true) / 100,
			w4_duration = caster:GetTalentValue("modifier_morphling_adaptive_4", "duration", true),
			w4_max = caster:GetTalentValue("modifier_morphling_adaptive_4", "max", true),
			w4_timer = caster:GetTalentValue("modifier_morphling_adaptive_4", "timer", true),
			w4_base = caster:GetTalentValue("modifier_morphling_adaptive_4", "base", true),
			w4_shield = caster:GetTalentValue("modifier_morphling_adaptive_4", "shield", true) / 100,

			has_w7 = 0,
			w7_attack = caster:GetTalentValue("modifier_morphling_adaptive_7", "attack", true),
			w7_speed = caster:GetTalentValue("modifier_morphling_adaptive_7", "speed", true),
			w7_range = caster:GetTalentValue("modifier_morphling_adaptive_7", "range", true),
			w7_damage = caster:GetTalentValue("modifier_morphling_adaptive_7", "damage", true) / 100,
			w7_stun = caster:GetTalentValue("modifier_morphling_adaptive_7", "stun", true),
			w7_radius = caster:GetTalentValue("modifier_morphling_adaptive_7", "radius", true),
			w7_base = caster:GetTalentValue("modifier_morphling_adaptive_7", "base", true),
			w7_inner_radius = caster:GetTalentValue("modifier_morphling_adaptive_7", "inner_radius", true),
			w7_cd_inc = caster:GetTalentValue("modifier_morphling_adaptive_7", "cd_inc", true),
		}
	end

	if caster:HasTalent("modifier_morphling_adaptive_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_morphling_adaptive_1", "damage") / 100
	end

	if caster:HasTalent("modifier_morphling_adaptive_2") then
		self.talents.has_w2 = 1
		self.talents.w2_stun = caster:GetTalentValue("modifier_morphling_adaptive_2", "stun")
		self.talents.w2_cd = caster:GetTalentValue("modifier_morphling_adaptive_2", "cd")
	end

	if caster:HasTalent("modifier_morphling_adaptive_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_morphling_adaptive_3", "damage") / 100
		self.talents.w3_cdr = caster:GetTalentValue("modifier_morphling_adaptive_3", "cdr")
	end

	if caster:HasTalent("modifier_morphling_adaptive_4") then
		self.talents.has_w4 = 1
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_morphling_adaptive_4", type = 1, value = self.talents.w4_heal }
		)
	end

	if caster:HasTalent("modifier_morphling_adaptive_7") then
		self.talents.has_w7 = 1
	end
end

function morphling_adaptive_strike_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_morphling_morph_custom_legendary") then
		return wearables_system:GetAbilityIconReplacement(self.caster, "morphling_adaptive_strike_str", self)
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "morphling_adaptive_strike_agi", self)
end

function morphling_adaptive_strike_custom:GetIntrinsicModifierName()
	return "modifier_morphling_adaptive_strike_custom_tracker"
end

function morphling_adaptive_strike_custom:GetBehavior()
	if self.talents.has_w7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE
end

function morphling_adaptive_strike_custom:GetAOERadius()
	return self.talents.has_w7 == 1 and self.talents.w7_radius or (self.radius or 0)
end

function morphling_adaptive_strike_custom:GetCooldown(level)
	local k = (
		(self.caster:HasModifier("modifier_morphling_morph_custom_legendary") and self.caster.attribute_legendary)
			and (1 + (self.caster.attribute_legendary.strike_cd or 0))
		or 1
	)
	return (self.BaseClass.GetCooldown(self, level) + (self.talents.w2_cd or 0)) * k
end

function morphling_adaptive_strike_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self)
end

function morphling_adaptive_strike_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.talents.has_w7 == 1 and self.talents.w7_range or 0)
end

function morphling_adaptive_strike_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level)
end

function morphling_adaptive_strike_custom:OnSpellStart()
	local target = self:GetCursorTarget()
	local attribute_legendary = self.caster:HasModifier("modifier_morphling_morph_custom_legendary")
	local sound = attribute_legendary and "Hero_Morphling.AdaptiveStrikeStr.Cast"
		or "Hero_Morphling.AdaptiveStrikeAgi.Cast"

	local speed = self.projectile_speed
	local extra_data = {
		is_attribute_legendary = attribute_legendary,
	}

	if self.talents.has_w7 == 1 then
		local point = self:GetCursorPosition()
		local origin = self.caster:GetAbsOrigin()
		if origin == point then
			point = origin + self.caster:GetForwardVector() * 10
		end

		local dir = (point - origin)

		speed = self.talents.w7_speed
		target = CreateModifierThinker(
			self.caster,
			self,
			"modifier_morphling_adaptive_strike_custom_legendary_aoe",
			{ duration = dir:Length2D() / speed },
			GetGroundPosition(point, nil),
			self.caster:GetTeamNumber(),
			false
		)
	end

	local info = {
		EffectName = attribute_legendary
				and "particles/units/heroes/hero_morphling/morphling_adaptive_strike_str_proj.vpcf"
			or "particles/units/heroes/hero_morphling/morphling_adaptive_strike_agi_proj.vpcf",
		Ability = self,
		iMoveSpeed = speed,
		Source = self.caster,
		Target = target,
		bDodgeable = true,
		bProvidesVision = true,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		iVisionRadius = 100,
		ExtraData = extra_data,
	}
	ProjectileManager:CreateTrackingProjectile(info)

	if attribute_legendary and self.caster.attribute_legendary then
		self.caster:AddNewModifier(
			self.caster,
			self.caster.attribute_legendary,
			"modifier_morphling_morph_custom_legendary_attack",
			{ duration = self.caster.attribute_legendary.strike_duration }
		)
	end

	self.caster:EmitSound(sound)
end

function morphling_adaptive_strike_custom:OnProjectileHit_ExtraData(target, location, table)
	local agility = self.caster:GetAgility()
	local strength = self.caster:GetStrength()
	local point = GetGroundPosition(location, nil)

	local ratio = agility / strength
	local sound = agility >= strength and "Hero_Morphling.AdaptiveStrikeAgi.Target"
		or "Hero_Morphling.AdaptiveStrikeStr.Target"

	local radius = self.radius

	local stats_max = 1 + self.stats_max / 100

	local knockback_min = self.knockback_min
	local knockback_max = self.knockback_max
	local stun_min = self.stun_min
	local stun_max = self.stun_max
	local knockback_speed = knockback_max / self.knockback_duration

	local knock_distance

	if ratio <= 1 / stats_max then
		knock_distance = knockback_max
	elseif ratio >= stats_max then
		knock_distance = knockback_min
	else
		knock_distance = knockback_min + (knockback_max - knockback_min) * ((strength / agility) / stats_max)
	end

	local min_ratio = 0.5
	local max_ratio = 1.5

	local stun_clamped = math.min(math.max(1 / ratio, min_ratio), max_ratio)
	local stun_t = (stun_clamped - min_ratio) / (max_ratio - min_ratio)
	local stun_duration = stun_min + (stun_max - stun_min) * stun_t

	if self.talents.has_w7 == 1 then
		stun_duration = self.talents.w7_stun
	end
	if IsValid(self.caster.attribute_legendary) and table.is_attribute_legendary == 1 then
		stun_duration = self.caster.attribute_legendary.strike_stun
	end

	stun_duration = stun_duration + self.talents.w2_stun
	local damage = self:GetDamage()
	local hit = false

	if self.talents.has_w7 == 1 then
		radius = self.talents.w7_radius
		sound = "Hero_Morphling.AdaptiveStrikeAgi.Target"
		local inner_radius = self.talents.w7_inner_radius
		local aoe_effect =
			wearables_system:GetParticleReplacementAbility(self.caster, "particles/morphling/adaptive_aoe.vpcf", self)

		local effect2 = ParticleManager:CreateParticle(aoe_effect, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect2, 0, point)
		ParticleManager:SetParticleControl(effect2, 1, point)
		ParticleManager:SetParticleControl(effect2, 2, Vector(radius, radius, radius))
		ParticleManager:SetParticleControl(effect2, 7, self.caster:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(effect2)

		local near_hit = false

		for _, unit in pairs(self.caster:FindTargets(radius, point)) do
			local vec = (unit:GetAbsOrigin() - point)
			local stun = nil
			if vec:Length2D() <= inner_radius then
				near_hit = true
				stun = stun_duration
				sound = "Hero_Morphling.AdaptiveStrikeStr.Target"
			end
			hit = true
			self:DealDamage(unit, damage, stun)
		end

		if near_hit then
			self.caster:CdAbility(
				self,
				self:GetCooldownTimeRemaining() * self.talents.w7_cd_inc / 100,
				nil,
				"modifier_morphling_adaptive_7"
			)

			local effect = ParticleManager:CreateParticle(
				"particles/morphling/adaptive_refresh.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.caster
			)
			ParticleManager:SetParticleControlEnt(
				effect,
				0,
				self.caster,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.caster:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(effect)

			self.caster:EmitSound("Morph.Adaptive_refresh")
		end
	else
		if target:TriggerSpellAbsorb(self) then
			return
		end

		for _, unit in pairs(self.caster:FindTargets(radius, point)) do
			local knock_center = self.caster:GetAbsOrigin()
			if table.is_attribute_legendary == 1 then
				local vec = (unit:GetAbsOrigin() - knock_center)

				knock_center = unit:GetAbsOrigin() + vec:Normalized() * 100
				knock_distance = math.min(vec:Length2D() - 180, knockback_max)
			end

			local knockbackProperties = {
				center_x = knock_center.x,
				center_y = knock_center.y,
				center_z = knock_center.z,
				duration = knock_distance / knockback_speed,
				knockback_duration = knock_distance / knockback_speed,
				knockback_distance = knock_distance,
				knockback_height = 0,
				should_stun = 0,
			}
			unit:AddNewModifier(self.caster, self, "modifier_knockback", knockbackProperties)

			hit = true
			self:DealDamage(unit, damage, stun_duration)
		end

		if table.is_attribute_legendary == 0 then
			local effect_point = point
			local adaptiva_fx_name = wearables_system:GetParticleReplacementAbility(
				self.caster,
				"particles/units/heroes/hero_morphling/morphling_adaptive_strike.vpcf",
				self
			)
			if
				adaptiva_fx_name
				== "particles/econ/items/morphling/morphling_ethereal/morphling_adaptive_strike_ethereal.vpcf"
			then
				effect_point = self.caster:GetAbsOrigin()
			end
			local particle = agility >= strength and adaptiva_fx_name
				or "particles/units/heroes/hero_morphling/morphling_adaptive_strike_str.vpcf"

			local effect = ParticleManager:CreateParticle(particle, PATTACH_WORLDORIGIN, nil)
			ParticleManager:SetParticleControl(effect, 0, effect_point)
			ParticleManager:SetParticleControl(effect, 1, point)
			ParticleManager:ReleaseParticleIndex(effect)
		end
	end

	if hit then
		self:AbilityHit()
	end

	EmitSoundOnLocationWithCaster(point, sound, self.caster)
end

function morphling_adaptive_strike_custom:GetDamage()
	if not IsServer() then
		return 0
	end
	local agility = self.caster:GetAgility()
	local strength = self.caster:GetStrength()
	local ratio = agility / strength
	local base_damage = self.damage_base

	local min_damage = self.damage_min
	local max_damage = self.damage_max

	local min_ratio = 0.5
	local max_ratio = 1.5

	local clamped = math.min(math.max(ratio, min_ratio), max_ratio)
	local t = (clamped - min_ratio) / (max_ratio - min_ratio)
	local multiplier = min_damage + (max_damage - min_damage) * t

	if self.caster:HasModifier("modifier_morphling_morph_custom_legendary") then
		multiplier = max_damage
	end
	local damage = base_damage + agility * multiplier

	if self.talents.has_w7 == 1 then
		damage = self.talents.w7_base
			+ (self.caster:GetStrength() + self.caster:GetAgility() + self.caster:GetIntellect(false))
				* self.talents.w7_damage
	end
	damage = damage * (1 + self.talents.w1_damage)

	return damage
end

function morphling_adaptive_strike_custom:DealDamage(target, damage, stun_duration)
	if IsValid(self.caster.wave_ability) then
		self.caster.wave_ability:ApplyResist(target)
	end

	DoDamage({
		victim = target,
		attacker = self.caster,
		ability = self,
		damage = damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
	})

	if stun_duration then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = (1 - target:GetStatusResistance()) * stun_duration }
		)
	end

	self:ProcAuto(target)
end

function morphling_adaptive_strike_custom:ProcAuto(target, wave)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end
	if not RollPseudoRandomPercentage(self.talents.w3_chance, 1450, self.caster) then
		return
	end

	local duration = wave and self.talents.w3_delay_wave or self.talents.w3_delay
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_morphling_adaptive_strike_custom_auto_delay",
		{ duration = duration }
	)
end

function morphling_adaptive_strike_custom:AbilityHit()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w4 == 0 then
		return
	end
	if IsValid(self.shield_mod) then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_morphling_adaptive_strike_custom_shield_stack",
		{ duration = self.talents.w4_duration }
	)
end

modifier_morphling_adaptive_strike_custom_tracker = class(mod_hidden)
function modifier_morphling_adaptive_strike_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.adaptive_ability = self.ability

	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
	self.ability.damage_min = self.ability:GetSpecialValueFor("damage_min")
	self.ability.damage_max = self.ability:GetSpecialValueFor("damage_max")
	self.ability.stun_min = self.ability:GetSpecialValueFor("stun_min")
	self.ability.stun_max = self.ability:GetSpecialValueFor("stun_max")
	self.ability.stats_max = self.ability:GetSpecialValueFor("stats_max")
	self.ability.knockback_min = self.ability:GetSpecialValueFor("knockback_min")
	self.ability.knockback_max = self.ability:GetSpecialValueFor("knockback_max")
	self.ability.knockback_duration = self.ability:GetSpecialValueFor("knockback_duration")
	self.ability.projectile_speed = self.ability:GetSpecialValueFor("projectile_speed")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_morphling_adaptive_strike_custom_tracker:OnRefresh()
	self.ability.damage_max = self.ability:GetSpecialValueFor("damage_max")
	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
end

function modifier_morphling_adaptive_strike_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_morphling_adaptive_strike_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_w7 == 0 then
		return
	end
	return self.ability.talents.w7_attack
end

function modifier_morphling_adaptive_strike_custom_tracker:GetModifierPercentageCooldown()
	return self.ability.talents.w3_cdr
end

modifier_morphling_adaptive_strike_custom_legendary_aoe = class(mod_hidden)
function modifier_morphling_adaptive_strike_custom_legendary_aoe:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.w7_radius
	self.time = self:GetRemainingTime()

	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), self.radius, self.time + 3, false)
	self.effect_cast = ParticleManager:CreateParticleForTeam(
		"particles/morphling/adaptive_aoe_zone.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.caster,
		self.caster:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.radius, 0, -(self.radius / self.time)))
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self.time, 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

modifier_morphling_adaptive_strike_custom_auto_delay = class(mod_hidden)
function modifier_morphling_adaptive_strike_custom_auto_delay:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_morphling_adaptive_strike_custom_auto_delay:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
end

function modifier_morphling_adaptive_strike_custom_auto_delay:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	self.parent:EmitSound("Morph.Adaptive_auto")
	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_morphling/morphling_adaptive_strike.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect, 1, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	local damage = self.ability:GetDamage() * self.ability.talents.w3_damage
	DoDamage(
		{
			victim = self.parent,
			attacker = self.caster,
			ability = self.ability,
			damage_type = DAMAGE_TYPE_MAGICAL,
			damage = damage,
		},
		"modifier_morphling_adaptive_3"
	)
end

modifier_morphling_adaptive_strike_custom_shield_stack = class(mod_visible)
function modifier_morphling_adaptive_strike_custom_shield_stack:GetTexture()
	return "buffs/morphling/adaptive_4"
end
function modifier_morphling_adaptive_strike_custom_shield_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w4_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_morphling_adaptive_strike_custom_shield_stack:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() < self.max then
		return
	end

	local max = self.ability.talents.w4_base + self.parent:GetAllStats() * self.ability.talents.w4_shield

	if not IsValid(self.ability.shield_mod) then
		self.ability.shield_mod = self.parent:AddNewModifier(self.parent, nil, "modifier_generic_shield", {
			shield_talent = "modifier_morphling_adaptive_4",
			max_shield = max,
			start_full = 1,
			refresh_timer = self.ability.talents.w4_timer,
		})

		local cast_effect = ParticleManager:CreateParticle(
			"particles/morphling/adaptive_shield.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			cast_effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(cast_effect, 1, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			cast_effect,
			2,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		self.ability.shield_mod:AddParticle(cast_effect, false, false, -1, false, false)
	end

	self:Destroy()
end