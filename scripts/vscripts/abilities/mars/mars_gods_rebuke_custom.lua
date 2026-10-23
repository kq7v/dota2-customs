--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_mars_gods_rebuke_custom", "abilities/mars/mars_gods_rebuke_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_mars_gods_rebuke_custom_slow",
	"abilities/mars/mars_gods_rebuke_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_gods_rebuke_custom_charge",
	"abilities/mars/mars_gods_rebuke_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_mars_gods_rebuke_custom_tracker",
	"abilities/mars/mars_gods_rebuke_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_mars_gods_rebuke_custom_legendary",
	"abilities/mars/mars_gods_rebuke_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_rebuke_7"
)
LinkLuaModifier(
	"modifier_mars_gods_rebuke_custom_armor",
	"abilities/mars/mars_gods_rebuke_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_rebuke_1"
)
LinkLuaModifier(
	"modifier_mars_gods_rebuke_custom_perma",
	"abilities/mars/mars_gods_rebuke_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_mars_rebuke_3"
)

mars_gods_rebuke_custom = class({})
mars_gods_rebuke_custom.talents = {}

function mars_gods_rebuke_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_shield_bash.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_mars/mars_shield_bash_crit.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_brewmaster_thunder_clap.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_charge.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_shield_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_gods_strength.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/reinc_shield.vpcf", context)
	PrecacheResource("particle", "particles/mars/rebuke_legenadry_head.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
end

function mars_gods_rebuke_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_base = 0,
			w1_armor = 0,
			w1_creeps = 0,
			w1_duration = caster:GetTalentValue("modifier_mars_rebuke_1", "duration", true),

			has_w2 = 0,
			w2_cd = 0,
			w2_duration = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_crit = 0,
			w3_max = caster:GetTalentValue("modifier_mars_rebuke_3", "max", true),

			has_w4 = 0,
			w4_base = caster:GetTalentValue("modifier_mars_rebuke_4", "base", true),
			w4_duration = caster:GetTalentValue("modifier_mars_rebuke_4", "duration", true),
			w4_shield_reduce = caster:GetTalentValue("modifier_mars_rebuke_4", "shield_reduce", true) / 100,
			w4_min_distance = caster:GetTalentValue("modifier_mars_rebuke_4", "min_distance", true),
			w4_shield = caster:GetTalentValue("modifier_mars_rebuke_4", "shield", true) / 100,
			w4_knock = caster:GetTalentValue("modifier_mars_rebuke_4", "knock", true) / 100,

			has_w7 = 0,
			w7_damage_inc = caster:GetTalentValue("modifier_mars_rebuke_7", "damage_inc", true) / 100,
			w7_damage_reduce = caster:GetTalentValue("modifier_mars_rebuke_7", "damage_reduce", true) / 100,
			w7_cd_inc = caster:GetTalentValue("modifier_mars_rebuke_7", "cd_inc", true) / 100,
			w7_mana = caster:GetTalentValue("modifier_mars_rebuke_7", "mana", true) / 100,

			has_h5 = 0,
			h5_distance = caster:GetTalentValue("modifier_mars_hero_5", "distance", true),
			h5_speed = caster:GetTalentValue("modifier_mars_hero_5", "speed", true),
			h5_radius = caster:GetTalentValue("modifier_mars_hero_5", "radius", true),
			h5_cast = caster:GetTalentValue("modifier_mars_hero_5", "cast", true) / 100,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_mars_rebuke_1") then
		self.talents.has_w1 = 1
		self.talents.w1_base = caster:GetTalentValue("modifier_mars_rebuke_1", "base")
		self.talents.w1_creeps = caster:GetTalentValue("modifier_mars_rebuke_1", "creeps")
		self.talents.w1_armor = caster:GetTalentValue("modifier_mars_rebuke_1", "armor") / 100
	end

	if caster:HasTalent("modifier_mars_rebuke_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_mars_rebuke_2", "cd")
		self.talents.w2_duration = caster:GetTalentValue("modifier_mars_rebuke_2", "duration")
	end

	if caster:HasTalent("modifier_mars_rebuke_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_mars_rebuke_3", "damage")
		self.talents.w3_crit = caster:GetTalentValue("modifier_mars_rebuke_3", "crit")
	end

	if caster:HasTalent("modifier_mars_rebuke_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_mars_rebuke_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_mars_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_mars_bulwark_7") then
		self.talents.has_e7 = 1
	end
end

function mars_gods_rebuke_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "mars_gods_rebuke", self)
end

function mars_gods_rebuke_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_mars_gods_rebuke_custom_tracker"
end

function mars_gods_rebuke_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) * (1 + (self.talents.has_h5 == 1 and self.talents.h5_cast or 0))
end

function mars_gods_rebuke_custom:GetCooldown(iLevel)
	local k = 1
	if self.caster:HasModifier("modifier_mars_gods_rebuke_custom_legendary") then
		k = 1 + self.talents.w7_cd_inc
	end
	return (self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)) * k
end

function mars_gods_rebuke_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_mars_gods_rebuke_custom_legendary") then
		return self.talents.w7_mana
	end
	return self.BaseClass.GetManaCost(self, level)
end

function mars_gods_rebuke_custom:GetRadius()
	return (self.radius or 0) + (self.talents.has_h5 == 1 and self.talents.h5_radius or 0)
end

function mars_gods_rebuke_custom:GetAOERadius()
	if self.talents.has_h5 == 1 then
		return self:GetRadius()
	end
end

function mars_gods_rebuke_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + (self.talents.has_h5 == 1 and DOTA_ABILITY_BEHAVIOR_AOE or 0)
end

function mars_gods_rebuke_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_h5 == 1 and not self.caster:HasModifier("modifier_mars_spear_custom_legendary") then
		return IsClient() and self.talents.h5_distance or 99999
	end
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function mars_gods_rebuke_custom:OnSpellStart(skip_charge)
	local origin = self.caster:GetOrigin()
	local point = self:GetCursorPosition()

	if point == origin or self.caster:HasModifier("modifier_mars_spear_custom_legendary") or skip_charge then
		point = origin + self.caster:GetForwardVector() * 5
	end

	if self.talents.has_h5 == 1 and not skip_charge and not self.caster:IsLeashed() and not self.caster:IsRooted() then
		local dir = point - origin
		dir.z = 0

		local max = self.talents.h5_distance + self.caster:GetCastRangeBonus()
		if dir:Length2D() >= max then
			point = origin + dir:Normalized() * max
		end

		local dist = (point - origin):Length()
		local duration = dist / self.talents.h5_speed
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_mars_gods_rebuke_custom_charge",
			{ duration = duration, x = point.x, y = point.y }
		)
		return
	end

	if self.caster:HasModifier("modifier_mars_bulwark_custom_idle") then
		point = origin + self.caster:GetForwardVector() * 5
	end

	local cast_direction = (point - origin):Normalized()
	cast_direction.z = 0

	local caught = false
	local hit_hero = false
	local radius = self:GetRadius()
	local duration = self.knockback_duration
	local distance = self.knockback_distance * (1 + (self.talents.has_w4 == 1 and self.talents.w4_knock or 0))
	local slow_duration = self.knockback_slow_duration + self.talents.w2_duration

	local cast_angle = VectorToAngles(cast_direction).y

	self.caster:AddNewModifier(self.caster, self, "modifier_mars_gods_rebuke_custom", {})

	for _, enemy in pairs(self.caster:FindTargets(radius)) do
		if enemy:IsUnit() then
			local enemy_direction = (enemy:GetOrigin() - origin):Normalized()
			local enemy_angle = VectorToAngles(enemy_direction).y
			local angle_diff = math.abs(AngleDiff(cast_angle, enemy_angle))

			if self.talents.has_h5 == 1 or angle_diff <= self.angle / 2 then
				local effect_cast = ParticleManager:CreateParticle(
					"particles/units/heroes/hero_mars/mars_shield_bash_crit.vpcf",
					PATTACH_WORLDORIGIN,
					enemy
				)
				ParticleManager:SetParticleControl(effect_cast, 0, enemy:GetOrigin())
				ParticleManager:SetParticleControl(effect_cast, 1, enemy:GetOrigin())
				ParticleManager:SetParticleControlForward(effect_cast, 1, enemy_direction)
				ParticleManager:ReleaseParticleIndex(effect_cast)

				enemy:AddNewModifier(
					self.caster,
					self.caster:BkbAbility(self, self.talents.has_w4 == 1),
					"modifier_mars_gods_rebuke_custom_slow",
					{ duration = (1 - enemy:GetStatusResistance()) * slow_duration }
				)

				if not enemy:HasModifier("modifier_mars_spear_custom_debuff") then
					if self.talents.has_e7 == 1 and self.talents.has_w4 == 1 then
						local point = self.caster:GetAbsOrigin() + enemy_direction * self.talents.w4_min_distance
						distance = (point - enemy:GetAbsOrigin()):Length2D()
						if (origin - enemy:GetAbsOrigin()):Length2D() <= self.talents.w4_min_distance then
							distance = 0
						end
						enemy_direction = enemy_direction * -1
					end

					enemy:AddNewModifier(
						self.caster,
						self.caster:BkbAbility(self, self.talents.has_w4 == 1),
						"modifier_generic_knockback",
						{
							duration = duration,
							distance = distance,
							height = 0,
							direction_x = enemy_direction.x,
							direction_y = enemy_direction.y,
						}
					)
				end

				if self.talents.has_w1 == 1 then
					enemy:RemoveModifierByName("modifier_mars_gods_rebuke_custom_armor")
					enemy:AddNewModifier(
						self.caster,
						self.caster:BkbAbility(self, self.talents.has_w4 == 1),
						"modifier_mars_gods_rebuke_custom_armor",
						{ duration = self.talents.w1_duration }
					)
				end

				if IsValid(self.caster.bulwark_ability) then
					self.caster.bulwark_ability:ProcStun(enemy, "rebuke")
				end

				self.caster:PerformAttack(enemy, true, true, true, true, true, false, true)
				caught = true

				if enemy:IsRealHero() then
					self.caster:AddNewModifier(self.caster, self, "modifier_mars_gods_rebuke_custom_perma", {})

					local mod = self.caster:FindModifierByName("modifier_mars_gods_rebuke_custom_legendary")
					if not hit_hero and mod then
						hit_hero = true
						mod:AddStack()
					end
				end
				enemy:EmitSound("Hero_Mars.Shield.Crit")
			end
		end
	end

	self.caster:RemoveModifierByName("modifier_mars_gods_rebuke_custom")

	local sound_cast = "Hero_Mars.Shield.Cast.Small"
	if caught then
		local legendary = self.caster:FindModifierByName("modifier_mars_gods_rebuke_custom_legendary")
		if legendary then
			legendary:Extend(hit_hero, true)
		end

		if IsValid(self.caster.bulwark_ability) then
			self.caster.bulwark_ability:AddDamage(hit_hero, true)
			self.caster.bulwark_ability:ProcSoldier(nil, true)
		end

		sound_cast = "Hero_Mars.Shield.Cast"
		if self.talents.has_w4 == 1 then
			local shield = self.talents.w4_base + self.talents.w4_shield * self.caster:GetAverageTrueAttackDamage(nil)
			local k = 1
			if self.caster:HasModifier("modifier_mars_gods_rebuke_custom_legendary") then
				k = 1 + self.talents.w4_shield_reduce
			end

			if not IsValid(self.shield_mod) then
				self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield_multiple", {
					duration = self.talents.w4_duration,
					shield_talent = "modifier_mars_rebuke_4",
					max_shield = shield,
				})
				if self.shield_mod then
					self.particle = ParticleManager:CreateParticle(
						"particles/wraith_king/reinc_shield.vpcf",
						PATTACH_CUSTOMORIGIN_FOLLOW,
						self.caster
					)
					ParticleManager:SetParticleControlEnt(
						self.particle,
						0,
						self.caster,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						self.caster:GetAbsOrigin(),
						true
					)
					self.shield_mod:AddParticle(self.particle, false, false, -1, false, false)

					self.shield_mod:SetReduceDamage(function(params)
						local caster = params.caster
						local result = 1
						if IsValid(caster.bulwark_ability) then
							result = caster.bulwark_ability:GetReduction(params)
						end
						return 1 + result / 100
					end)
				end
			end

			if IsValid(self.shield_mod) then
				self.shield_mod:AddShield(shield * k, shield)
				self.shield_mod:SetDuration(self.talents.w4_duration, true)
			end
		end
	end

	local max = self.talents.has_h5 == 1 and 3 or 1
	local line_position = self.caster:GetAbsOrigin() + cast_direction * 10
	local qangle = QAngle(0, 360 / max, 0)

	for i = 1, max do
		local pfx = "particles/units/heroes/hero_mars/mars_shield_bash.vpcf"
		if i == 1 then
			pfx = wearables_system:GetParticleReplacementAbility(
				self.caster,
				"particles/units/heroes/hero_mars/mars_shield_bash.vpcf",
				self
			)
		end

		local dir = (line_position - self.caster:GetAbsOrigin()):Normalized()
		local effect_cast = ParticleManager:CreateParticle(pfx, PATTACH_WORLDORIGIN, self.caster)
		ParticleManager:SetParticleControl(effect_cast, 0, self.caster:GetOrigin())
		ParticleManager:SetParticleControlForward(effect_cast, 0, dir)
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, radius, radius))
		ParticleManager:SetParticleControl(effect_cast, 6, self.caster:GetOrigin())
		ParticleManager:SetParticleControlForward(effect_cast, 6, dir)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		line_position = RotatePosition(self.caster:GetAbsOrigin(), qangle, line_position)
	end

	EmitSoundOnLocationWithCaster(self.caster:GetOrigin(), sound_cast, self.caster)
end

modifier_mars_gods_rebuke_custom = class(mod_hidden)
function modifier_mars_gods_rebuke_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bonus_damage = self.ability.damage_bonus

	if not IsServer() then
		return
	end

	self.crit = self.ability.damage_crit + self.ability.talents.w3_crit

	local mod = self.parent:FindModifierByName("modifier_mars_gods_rebuke_custom_legendary")
	if mod then
		self.crit = 100 + (self.crit - 100) * (1 + self.ability.talents.w7_damage_inc * mod:GetStackCount())
	end

	if self.ability.talents.has_w7 == 1 then
		self.crit = self.crit * (1 + self.ability.talents.w7_damage_reduce)
	end
end

function modifier_mars_gods_rebuke_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_mars_gods_rebuke_custom:GetModifierPreAttack_BonusDamage(params)
	return self.bonus_damage
end

function modifier_mars_gods_rebuke_custom:GetModifierPreAttack_CriticalStrike(params)
	return self:GetCritDamage()
end

function modifier_mars_gods_rebuke_custom:GetCritDamage()
	return self.crit
end

modifier_mars_gods_rebuke_custom_slow = class(mod_hidden)
function modifier_mars_gods_rebuke_custom_slow:IsPurgable()
	return true
end
function modifier_mars_gods_rebuke_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_brewmaster_thunder_clap.vpcf"
end
function modifier_mars_gods_rebuke_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_mars_gods_rebuke_custom_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.rebuke_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.slow = self.ability.knockback_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_mars_gods_rebuke_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_mars_gods_rebuke_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_mars_gods_rebuke_custom_tracker = class(mod_hidden)
function modifier_mars_gods_rebuke_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("mars_avatar_custom")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.parent.rebuke_ability = self.ability

	self.ability.damage_crit = self.ability:GetSpecialValueFor("damage_crit")
	self.ability.damage_bonus = self.ability:GetSpecialValueFor("damage_bonus")
	self.ability.angle = self.ability:GetSpecialValueFor("angle")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.knockback_duration = self.ability:GetSpecialValueFor("knockback_duration")
	self.ability.knockback_distance = self.ability:GetSpecialValueFor("knockback_distance")
	self.ability.knockback_slow = self.ability:GetSpecialValueFor("knockback_slow")
	self.ability.knockback_slow_duration = self.ability:GetSpecialValueFor("knockback_slow_duration")
end

function modifier_mars_gods_rebuke_custom_tracker:OnRefresh()
	self.ability.damage_crit = self.ability:GetSpecialValueFor("damage_crit")
	self.ability.damage_bonus = self.ability:GetSpecialValueFor("damage_bonus")
end

modifier_mars_gods_rebuke_custom_armor = class(mod_hidden)
function modifier_mars_gods_rebuke_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.rebuke_ability
	if not self.ability then
		self:Destroy()
		return
	end

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)

	if self.parent:IsCreep() then
		return
	end

	self.armor = self.parent:GetArmor(self)
	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()
end

function modifier_mars_gods_rebuke_custom_armor:AddCustomTransmitterData()
	return {
		armor = self.armor,
	}
end

function modifier_mars_gods_rebuke_custom_armor:HandleCustomTransmitterData(data)
	self.armor = data.armor
end

function modifier_mars_gods_rebuke_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_mars_gods_rebuke_custom_armor:GetModifierPhysicalArmorBonus()
	if self.parent:IsCreep() then
		return self.ability.talents.w1_creeps
	end
	if not self.armor then
		return
	end
	return self.ability.talents.w1_base + self.ability.talents.w1_armor * self.armor
end

modifier_mars_gods_rebuke_custom_charge = class(mod_hidden)
function modifier_mars_gods_rebuke_custom_charge:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.h5_speed

	self.parent:GenericParticle("particles/legion_commander/lc_odd_charge.vpcf", self)
	self.parent:GenericParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		self
	)
	self.bkb = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_debuff_immune", {})

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.parent:FacePoint(self.point)

	self.anim = false
	self.parent:EmitSound("Mars.Rebuke_charge")

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_mars_gods_rebuke_custom_charge:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_mars_gods_rebuke_custom_charge:OnVerticalMotionInterrupted()
	self:Destroy()
end

function modifier_mars_gods_rebuke_custom_charge:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_mars_gods_rebuke_custom_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_mars_gods_rebuke_custom_charge:GetOverrideAnimation()
	return ACT_DOTA_RUN
end

function modifier_mars_gods_rebuke_custom_charge:GetModifierDisableTurning()
	return 1
end

function modifier_mars_gods_rebuke_custom_charge:GetActivityTranslationModifiers()
	return "spear_stun"
end

function modifier_mars_gods_rebuke_custom_charge:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end

	if self.parent:IsStunned() or self.parent:IsRooted() or self.parent:IsLeashed() then
		self:Destroy()
		return
	end

	local dir = (self.point - me:GetAbsOrigin()):Normalized()
	dir.z = 0

	me:SetAbsOrigin(me:GetAbsOrigin() + dir * dt * self.speed)
	GridNav:DestroyTreesAroundPoint(me:GetAbsOrigin(), 150, true)

	if self:GetRemainingTime() <= 0.2 and not self.anim then
		self.anim = true
		self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	end
end

function modifier_mars_gods_rebuke_custom_charge:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.bkb) then
		self.bkb:Destroy()
	end

	self.ability:OnSpellStart(true)
end

modifier_mars_gods_rebuke_custom_perma = class(mod_visible)
function modifier_mars_gods_rebuke_custom_perma:IsHidden()
	return self.ability.talents.has_w3 == 0 or self:GetStackCount() >= self.max
end
function modifier_mars_gods_rebuke_custom_perma:RemoveOnDeath()
	return false
end
function modifier_mars_gods_rebuke_custom_perma:GetTexture()
	return "buffs/mars/rebuke_3"
end
function modifier_mars_gods_rebuke_custom_perma:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w3_max

	if not IsServer() then
		return
	end
	self:OnRefresh()
	self:StartIntervalThink(2)
end

function modifier_mars_gods_rebuke_custom_perma:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_mars_gods_rebuke_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w3 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_mars_gods_rebuke_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_mars_gods_rebuke_custom_perma:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_w3 == 0 then
		return
	end
	return self:GetStackCount() * (self.ability.talents.w3_damage / self.max)
end

mars_avatar_custom = class({})
mars_avatar_custom.talents = {}

function mars_avatar_custom:CreateTalent()
	self.caster:SwapAbilities("mars_revenge_custom", self:GetName(), false, true)
end

function mars_avatar_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_duration = caster:GetTalentValue("modifier_mars_rebuke_7", "duration", true),
			w7_max = caster:GetTalentValue("modifier_mars_rebuke_7", "max", true),
			w7_talent_cd = caster:GetTalentValue("modifier_mars_rebuke_7", "talent_cd", true),
			w7_extend = caster:GetTalentValue("modifier_mars_rebuke_7", "extend", true) / 100,
			w7_extend_creeps = caster:GetTalentValue("modifier_mars_rebuke_7", "extend_creeps", true) / 100,
			w7_extend_rebuke = caster:GetTalentValue("modifier_mars_rebuke_7", "extend_rebuke", true) / 100,
		}
	end
end

function mars_avatar_custom:GetCooldown()
	return self.talents.w7_talent_cd or 0
end

function mars_avatar_custom:OnSpellStart()
	self.caster:EmitSound("Mars.Avatar_voice")
	self.caster:EmitSound("Mars.Avatar_cast")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_mars_gods_rebuke_custom_legendary",
		{ duration = self.talents.w7_duration }
	)

	self.caster:GenericParticle("particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf")
	self.caster:GenericParticle("particles/bristleback/brist_lowhp_.vpcf")
end

modifier_mars_gods_rebuke_custom_legendary = class(mod_hidden)
function modifier_mars_gods_rebuke_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_gods_strength.vpcf"
end
function modifier_mars_gods_rebuke_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_mars_gods_rebuke_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability:EndCd()

	self.parent:GenericParticle("particles/mars/rebuke_legenadry_head.vpcf", self, true)

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

	self.max_time = self.ability.talents.w7_duration

	self.interval = 0.1
	self.parent:AddProc(self, { land = true, extra = false })

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_mars_gods_rebuke_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetStackCount(),
		style = "MarsRebuke",
	})
end

function modifier_mars_gods_rebuke_custom_legendary:AddStack()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Mars.Rebuke_hit_voice")

	if self:GetStackCount() >= self.ability.talents.w7_max then
		return
	end
	self:IncrementStackCount()
end

function modifier_mars_gods_rebuke_custom_legendary:Extend(hero, rebuke)
	if not IsServer() then
		return
	end
	local extend = self.ability.talents.w7_extend_creeps

	if hero then
		extend = rebuke and self.ability.talents.w7_extend_rebuke or self.ability.talents.w7_extend
	end

	self:SetDuration(math.min(self:GetRemainingTime() + self.max_time * extend, self.max_time), true)
end

function modifier_mars_gods_rebuke_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "MarsRebuke" })
	self.ability:StartCd()
end

function modifier_mars_gods_rebuke_custom_legendary:GetProcChance()
	return 100
end

function modifier_mars_gods_rebuke_custom_legendary:AttackProc(params, name)
	self:Extend(params.target:IsRealHero())
end

function modifier_mars_gods_rebuke_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_mars_gods_rebuke_custom_legendary:GetModifierModelScale()
	return 30
end