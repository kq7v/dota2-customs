--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_tracker",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_thinker",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_fire",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_frost",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_root",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_macropyre_4"
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_cdr",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_hero_6"
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_slow",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_legendary_count",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_jakiro_macropyre_custom_legendary_damage",
	"abilities/jakiro/jakiro_macropyre_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_jakiro_macropyre_7"
)

jakiro_macropyre_custom = class({})
jakiro_macropyre_custom.talents = {}

function jakiro_macropyre_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_macropyre.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/ice_macropyre/ice_macropyre.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/ring_macropyre/jakiro_macropyre.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/ring_ice_macropyre/ice_macropyre.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/macropyre_custom_both.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_jakiro/jakiro_liquid_fire_debuff.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/path_legendary_caster_fire.vpcf", context)
	PrecacheResource("particle", "particles/jakiro/liquid_fire_legendary_timer.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/frost_heal.vpcf", context)
end

function jakiro_macropyre_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_spell = 0,
			r1_damage = 0,

			has_r2 = 0,
			r2_health = 0,
			r2_cd = 0,

			has_r4 = 0,
			r4_delay = caster:GetTalentValue("modifier_jakiro_macropyre_4", "delay", true),
			r4_talent_cd = caster:GetTalentValue("modifier_jakiro_macropyre_4", "talent_cd", true),
			r4_duration = caster:GetTalentValue("modifier_jakiro_macropyre_4", "duration", true),
			r4_radius = caster:GetTalentValue("modifier_jakiro_macropyre_4", "radius", true),
			r4_root = caster:GetTalentValue("modifier_jakiro_macropyre_4", "root", true),
			r4_radius_legendary = caster:GetTalentValue("modifier_jakiro_macropyre_4", "radius_legendary", true),

			r3_heal = 0,
			r3_slow = caster:GetTalentValue("modifier_jakiro_macropyre_3", "slow", true),

			has_r7 = 0,
			r7_max = caster:GetTalentValue("modifier_jakiro_macropyre_7", "max", true),
			r7_damage = caster:GetTalentValue("modifier_jakiro_macropyre_7", "damage", true) / 100,
			r7_duration = caster:GetTalentValue("modifier_jakiro_macropyre_7", "duration", true) / 100,
			r7_effect_duration = caster:GetTalentValue("modifier_jakiro_macropyre_7", "effect_duration", true),
			r7_charge = caster:GetTalentValue("modifier_jakiro_macropyre_7", "charge", true),
			r7_range = caster:GetTalentValue("modifier_jakiro_macropyre_7", "range", true),
			r7_radius = caster:GetTalentValue("modifier_jakiro_macropyre_7", "radius", true),
			r7_cd = caster:GetTalentValue("modifier_jakiro_macropyre_7", "cd", true),
			r7_mana = caster:GetTalentValue("modifier_jakiro_macropyre_7", "mana", true) / 100,
			r7_damage_k = caster:GetTalentValue("modifier_jakiro_macropyre_7", "damage_k", true),

			has_h6 = 0,
			h6_cdr = caster:GetTalentValue("modifier_jakiro_hero_6", "cdr", true),
			h6_duration = caster:GetTalentValue("modifier_jakiro_hero_6", "duration", true),
			h6_cast = caster:GetTalentValue("modifier_jakiro_hero_6", "cast", true),
			h6_max = caster:GetTalentValue("modifier_jakiro_hero_6", "max", true),
		}
	end

	if caster:HasTalent("modifier_jakiro_macropyre_1") then
		self.talents.has_r1 = 1
		self.talents.r1_spell = caster:GetTalentValue("modifier_jakiro_macropyre_1", "spell")
		self.talents.r1_damage = caster:GetTalentValue("modifier_jakiro_macropyre_1", "damage") / 100
	end

	if caster:HasTalent("modifier_jakiro_macropyre_2") then
		self.talents.has_r2 = 1
		self.talents.r2_health = caster:GetTalentValue("modifier_jakiro_macropyre_2", "health")
		self.talents.r2_cd = caster:GetTalentValue("modifier_jakiro_macropyre_2", "cd")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_jakiro_macropyre_3") then
		self.talents.r3_heal = caster:GetTalentValue("modifier_jakiro_macropyre_3", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_jakiro_macropyre_3",
			type = 1,
			value = function(params)
				if not params.unit then
					return 0
				end
				for mod in pairs(caster.jakiro_innate.ice_mods) do
					if params.unit:HasModifier(mod) then
						return self.talents.r3_heal
					end
				end
				return 0
			end,
		})
	end

	if caster:HasTalent("modifier_jakiro_macropyre_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_jakiro_macropyre_7") then
		self.talents.has_r7 = 1
		if IsServer() and not self.r7_init then
			self.r7_init = true
			self.ability:RefreshCharges()
		end
	end

	if caster:HasTalent("modifier_jakiro_hero_6") then
		self.talents.has_h6 = 1
	end
end

function jakiro_macropyre_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_jakiro_macropyre_custom_tracker"
end

function jakiro_macropyre_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") then
		return "jakiro_macropyre_both"
	end
	if self.caster:HasModifier("modifier_jakiro_innate_custom_active_frost") then
		return "jakiro_macropyre_ice"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "jakiro_macropyre", self)
end

function jakiro_macropyre_custom:GetCd()
	local base = self.AbilityChargeRestoreTime or 0
	if self.talents.has_r7 == 1 then
		base = base + self.talents.r7_cd
	end
	return base + (self.talents.r2_cd or 0)
end

function jakiro_macropyre_custom:GetAbilityChargeRestoreTime(iLevel)
	return self:GetCd()
end

function jakiro_macropyre_custom:GetDamage(target)
	local result = self.damage + self.caster:GetMaxHealth() * self.talents.r1_damage
	local mod = target:FindModifierByName("modifier_jakiro_macropyre_custom_legendary_damage")
	if mod then
		result = result
			* (
				1
				+ self.talents.r7_damage
					* math.pow(mod:GetStackCount() / self.talents.r7_max, self.talents.r7_damage_k)
			)
	end
	return result
end

function jakiro_macropyre_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_r7 == 1 and self.talents.r7_mana or 0))
end

function jakiro_macropyre_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_r7 == 1 then
		return self.talents.r7_range
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function jakiro_macropyre_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + (self.talents.has_r7 == 1 and DOTA_ABILITY_BEHAVIOR_AOE or 0)
end

function jakiro_macropyre_custom:GetAOERadius()
	return self:GetRadius()
end

function jakiro_macropyre_custom:GetRadius()
	return (self.talents.has_r7 == 1 and self.talents.r7_radius or 0)
		+ (self.talents.has_r4 == 1 and self.talents.r4_radius_legendary or 0)
end

function jakiro_macropyre_custom:OnSpellStart()
	local point = self.caster:CastPosition(self:GetCursorPosition())
	local cast_point = self.caster:GetAbsOrigin()
	local final_point
	local duration = self.duration + (self.talents.has_r4 == 1 and self.talents.r4_duration or 0)

	if self.talents.has_r7 == 0 then
		local vec = point - self.caster:GetAbsOrigin()
		vec.z = 0
		vec = vec:Normalized()

		final_point = self.caster:GetAbsOrigin() + vec * (self.AbilityCastRange + self.caster:GetCastRangeBonus())
	else
		cast_point = point
		final_point = point
		duration = duration * (1 + self.talents.r7_duration)
	end

	local both = self.caster:HasModifier("modifier_jakiro_liquid_fire_custom_legendary_acitve") and 1 or 0
	local is_ice = (self.caster:HasModifier("modifier_jakiro_innate_custom_active_frost") and both == 0) and 1 or 0

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate:SpellCast(self, is_ice)
	end

	CreateModifierThinker(
		self.caster,
		self.ability,
		"modifier_jakiro_macropyre_custom_thinker",
		{ duration = duration, x = final_point.x, y = final_point.y, is_ice = is_ice, both = both },
		cast_point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_jakiro_macropyre_custom_tracker = class(mod_hidden)
function modifier_jakiro_macropyre_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.macropyre_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.frost_damage = self.ability:GetSpecialValueFor("frost_damage") / 100
	self.ability.frost_heal = self.ability:GetSpecialValueFor("frost_heal") / 100
	self.ability.frost_slow = self.ability:GetSpecialValueFor("frost_slow")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.path_width = self.ability:GetSpecialValueFor("path_width")
	self.ability.burn_interval = self.ability:GetSpecialValueFor("burn_interval")
	self.ability.fire_duration = self.ability:GetSpecialValueFor("fire_duration")
	self.ability.frost_duration = self.ability:GetSpecialValueFor("frost_duration")
	self.ability.AbilityCastRange = self.ability:GetSpecialValueFor("AbilityCastRange")
	self.ability.AbilityChargeRestoreTime = self.ability:GetSpecialValueFor("AbilityChargeRestoreTime")

	self.parent:AddLifesteal(self, {
		value = function(params)
			if not params.unit then
				return 0
			end
			if not params.unit:HasModifier("modifier_jakiro_macropyre_custom_frost") then
				return 0
			end
			if self.parent:CheckCd("jakiro_visual", 0.5) then
				return self.ability.frost_heal, "particles/drow_ranger/frost_heal.vpcf"
			end
			return self.ability.frost_heal, false
		end,
	})
end

function modifier_jakiro_macropyre_custom_tracker:OnRefresh(table)
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.frost_heal = self.ability:GetSpecialValueFor("frost_heal") / 100
end

function modifier_jakiro_macropyre_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE,
	}
end

function modifier_jakiro_macropyre_custom_tracker:GetModifierOverrideAbilitySpecial(data)
	if data.ability ~= self.ability then
		return
	end
	if data.ability_special_value ~= "AbilityCharges" then
		return
	end
	if self.ability.talents.has_r7 ~= 1 then
		return
	end
	return 1
end

function modifier_jakiro_macropyre_custom_tracker:GetModifierOverrideAbilitySpecialValue(data)
	if data.ability ~= self.ability then
		return
	end
	if data.ability_special_value ~= "AbilityCharges" then
		return
	end
	if self.ability.talents.has_r7 ~= 1 then
		return
	end
	return self.ability.talents.r7_charge
end

function modifier_jakiro_macropyre_custom_tracker:GetModifierHealthBonus()
	return self.parent:GetIntellect(false) * self.ability.talents.r2_health
end

function modifier_jakiro_macropyre_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
end

function modifier_jakiro_macropyre_custom_tracker:GetModifierPercentageCasttime()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_cast
end

modifier_jakiro_macropyre_custom_thinker = class(mod_hidden)
function modifier_jakiro_macropyre_custom_thinker:IsAura()
	return self.ability.talents.has_r7 == 1
end
function modifier_jakiro_macropyre_custom_thinker:GetAuraDuration()
	return 0
end
function modifier_jakiro_macropyre_custom_thinker:GetAuraRadius()
	return self.width
end
function modifier_jakiro_macropyre_custom_thinker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_jakiro_macropyre_custom_thinker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_jakiro_macropyre_custom_thinker:GetModifierAura()
	return "modifier_jakiro_macropyre_custom_legendary_count"
end
function modifier_jakiro_macropyre_custom_thinker:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.origin = self.parent:GetAbsOrigin()
	self.final_point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.duration = table.duration

	self.width = (self.ability.path_width + (self.ability.talents.has_r4 == 1 and self.ability.talents.r4_radius or 0))
		/ 2
	self.visual_width = self.width

	self.fire_duration = self.ability.fire_duration
	self.is_ice = table.is_ice
	self.both = table.both
	self.bonus_duration = self.ability.talents.has_h6 == 1 and self.ability.talents.h6_duration or 0

	local effect = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_jakiro/jakiro_macropyre.vpcf",
		self.ability,
		"jakiro_macropyre_custom"
	)
	local sound = "Jakiro.Macropyre_fire"
	local sound_caster = "Hero_Jakiro.Macropyre.Cast"
	self.loop_sound = "hero_jakiro.macropyre"
	self.mod_name = "modifier_jakiro_macropyre_custom_fire"

	if self.is_ice == 1 then
		self.fire_duration = self.ability.frost_duration
		self.visual_width = self.visual_width * 0.9

		effect = "particles/jakiro/ice_macropyre/ice_macropyre.vpcf"
		sound = "Jakiro.Macropyre_ice"
		sound_caster = "Jakiro.Macropyre_ice_caster"
		self.loop_sound = "Jakiro.Macropyre_ice_loop"
		self.mod_name = "modifier_jakiro_macropyre_custom_frost"
	end

	if self.ability.talents.has_r7 == 1 then
		self.width = self.ability:GetRadius()
		self.final_point = self.caster:GetAbsOrigin()
		self.is_legendary = 1

		effect = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/jakiro/ring_macropyre/jakiro_macropyre.vpcf",
			self.ability,
			"jakiro_macropyre_custom"
		)
		if self.is_ice == 1 then
			effect = "particles/jakiro/ring_ice_macropyre/ice_macropyre.vpcf"
		end
	else
		if self.both == 1 then
			self:PlayEffect(
				wearables_system:GetParticleReplacementAbility(
					self.caster,
					"particles/jakiro/macropyre_custom_both.vpcf",
					self.ability,
					"jakiro_macropyre_custom"
				)
			)
		end
	end

	self.parent:EmitSound(sound)
	self.caster:EmitSound(sound_caster)

	self:PlayEffect(effect)

	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_jakiro_macropyre_custom_thinker:PlayEffect(name)
	if not IsServer() then
		return
	end

	local effect_cast = ParticleManager:CreateParticle(name, PATTACH_WORLDORIGIN, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 0, self.origin)
	local direction = (self.final_point - self.origin)
	direction.z = 0
	direction = direction:Normalized()
	ParticleManager:SetParticleControlForward(effect_cast, 0, direction)
	ParticleManager:SetParticleControl(effect_cast, 1, self.final_point)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(self.duration, 0, 0))
	ParticleManager:SetParticleControl(effect_cast, 4, Vector(self.visual_width, self.visual_width, self.visual_width))
	ParticleManager:SetParticleControl(effect_cast, 20, Vector(self.width, 0, 0))
	self:AddParticle(effect_cast, false, false, -1, false, false)
end

function modifier_jakiro_macropyre_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.sound then
		self.sound = true
		self.parent:EmitSound(self.loop_sound)
	end

	local targets
	if self.ability.talents.has_r7 == 1 then
		targets = self.caster:FindTargets(self.width, self.origin)
	else
		targets = FindUnitsInLine(
			self.caster:GetTeamNumber(),
			self.origin,
			self.final_point,
			nil,
			self.width,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			0
		)
	end

	for _, target in pairs(targets) do
		if
			self.ability.talents.has_r4 == 1
			and self:GetElapsedTime() >= self.ability.talents.r4_delay
			and target:CheckCd("jakiro_r4", self.ability.talents.r4_talent_cd)
		then
			target:EmitSound("Hero_Crystal.frostbite")
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_jakiro_macropyre_custom_root",
				{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.r4_root }
			)
		end

		local duration = self.fire_duration + self.bonus_duration
		local mod = target:FindModifierByName(self.mod_name)
		if mod then
			mod:SetDuration(duration, true)
		else
			target:AddNewModifier(self.caster, self.ability, self.mod_name, { duration = duration })
		end

		if self.both == 1 then
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_jakiro_macropyre_custom_frost",
				{ duration = self.ability.frost_duration + self.bonus_duration }
			)
		end
	end
end

function modifier_jakiro_macropyre_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound(self.loop_sound)
end

modifier_jakiro_macropyre_custom_fire = class(mod_visible)
function modifier_jakiro_macropyre_custom_fire:GetTexture()
	return "jakiro_macropyre"
end
function modifier_jakiro_macropyre_custom_fire:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.interval = self.ability.burn_interval
	self.parent:GenericParticle("particles/units/heroes/hero_jakiro/jakiro_liquid_fire_debuff.vpcf", self)

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self)
	end

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		custom_flag = "jakiro_fire",
	}
	self:StartIntervalThink(self.interval)
end

function modifier_jakiro_macropyre_custom_fire:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self, true)
	end
end

function modifier_jakiro_macropyre_custom_fire:OnIntervalThink()
	if not IsServer() then
		return
	end

	local damage = self.ability:GetDamage(self.parent) * self.interval
	self.damageTable.damage = damage
	DoDamage(self.damageTable)
end

modifier_jakiro_macropyre_custom_frost = class(mod_visible)
function modifier_jakiro_macropyre_custom_frost:GetTexture()
	return "jakiro_macropyre_ice"
end
function modifier_jakiro_macropyre_custom_frost:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_jakiro_macropyre_custom_frost:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_jakiro_macropyre_custom_frost:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.frost_slow

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.interval = self.ability.burn_interval
	self.damage = (1 + self.ability.frost_damage)

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self)
	end

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self:StartIntervalThink(self.interval)
end

function modifier_jakiro_macropyre_custom_frost:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.caster.jakiro_innate) then
		self.caster.jakiro_innate.tracker:UpdateMod(self, true)
	end
end

function modifier_jakiro_macropyre_custom_frost:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_jakiro_macropyre_custom_fire") then
		return
	end

	local damage = self.ability:GetDamage(self.parent) * self.damage * self.interval
	self.damageTable.damage = damage
	DoDamage(self.damageTable)
end

function modifier_jakiro_macropyre_custom_frost:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_jakiro_macropyre_custom_frost:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_jakiro_macropyre_custom_root = class(mod_hidden)
function modifier_jakiro_macropyre_custom_root:IsPurgable()
	return true
end
function modifier_jakiro_macropyre_custom_root:GetEffectName()
	return "particles/units/heroes/hero_crystalmaiden/maiden_frostbite_buff.vpcf"
end
function modifier_jakiro_macropyre_custom_root:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_jakiro_macropyre_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_jakiro_macropyre_custom_cdr = class(mod_hidden)
function modifier_jakiro_macropyre_custom_cdr:IsHidden()
	return self.ability.talents.has_h6 == 0 or self:GetStackCount() >= self.ability.talents.h6_max
end
function modifier_jakiro_macropyre_custom_cdr:RemoveOnDeath()
	return false
end
function modifier_jakiro_macropyre_custom_cdr:GetTexture()
	return "buffs/jakiro/hero_6"
end
function modifier_jakiro_macropyre_custom_cdr:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.h6_max
	self.cdr = self.ability.talents.h6_cdr / self.max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:IncrementStackCount()
end

function modifier_jakiro_macropyre_custom_cdr:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_jakiro_macropyre_custom_cdr:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/jakiro/path_legendary_caster_fire.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_jakiro_macropyre_custom_cdr:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_jakiro_macropyre_custom_cdr:GetModifierPercentageCooldown()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.cdr * self:GetStackCount()
end

modifier_jakiro_macropyre_custom_slow = class(mod_hidden)
function modifier_jakiro_macropyre_custom_slow:IsPurgable()
	return true
end
function modifier_jakiro_macropyre_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.r3_slow
end

function modifier_jakiro_macropyre_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_jakiro_macropyre_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_jakiro_macropyre_custom_legendary_count = class(mod_hidden)
function modifier_jakiro_macropyre_custom_legendary_count:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self:StartIntervalThink(1)
end

function modifier_jakiro_macropyre_custom_legendary_count:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_jakiro_macropyre_custom_legendary_damage",
		{ duration = self.ability.talents.r7_effect_duration }
	)
end

modifier_jakiro_macropyre_custom_legendary_damage = class(mod_visible)
function modifier_jakiro_macropyre_custom_legendary_damage:GetTexture()
	return "buffs/jakiro/macropyre_3"
end
function modifier_jakiro_macropyre_custom_legendary_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r7_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_jakiro_macropyre_custom_legendary_damage:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	if not self.particle then
		self.particle = self.parent:GenericParticle("particles/jakiro/liquid_fire_legendary_timer.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
end