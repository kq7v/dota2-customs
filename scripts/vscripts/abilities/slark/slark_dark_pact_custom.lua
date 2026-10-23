--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_slark_dark_pact_custom_delay",
	"abilities/slark/slark_dark_pact_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_slark_dark_pact_custom", "abilities/slark/slark_dark_pact_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_slark_dark_pact_custom_legendary",
	"abilities/slark/slark_dark_pact_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_slark_pact_7" }
)
LinkLuaModifier(
	"modifier_slark_dark_pact_custom_legendary_stack",
	"abilities/slark/slark_dark_pact_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_pact_7"
)
LinkLuaModifier(
	"modifier_slark_dark_pact_custom_tracker",
	"abilities/slark/slark_dark_pact_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_dark_pact_custom_speed",
	"abilities/slark/slark_dark_pact_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_pounce_4"
)
LinkLuaModifier(
	"modifier_slark_dark_pact_custom_health_bonus",
	"abilities/slark/slark_dark_pact_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_pact_3"
)

slark_dark_pact_custom = class({})
slark_dark_pact_custom.talents = {}

function slark_dark_pact_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_dark_pact_start.vpcf", context)
	PrecacheResource("particle", "particles/slark/pact_pulses.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_dark_pact_pulses_body.vpcf", context)
	PrecacheResource("particle", "particles/slark/pact_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/slark/pact_move.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/slark/pounce_legendary_water.vpcf", context)
	PrecacheResource("particle", "particles/slark/pact_legendary_heal.vpcf", context)
	PrecacheResource("particle", "particles/slark/pact_shield.vpcf", context)
	PrecacheResource("particle", "particles/slark/pact_legendary_radius.vpcf", context)
	PrecacheResource("particle", "particles/slark/dance_lifesteal.vpcf", context)
end

function slark_dark_pact_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_base = 0,
			q1_damage = 0,

			q2_heal = 0,
			q2_mana = caster:GetTalentValue("modifier_slark_pact_2", "mana", true) / 100,
			q2_bonus = caster:GetTalentValue("modifier_slark_pact_2", "bonus", true),

			has_q3 = 0,
			q3_bonus_inc = 0,
			q3_bonus = 0,
			q3_max = caster:GetTalentValue("modifier_slark_pact_3", "max", true),
			q3_duration_creeps = caster:GetTalentValue("modifier_slark_pact_3", "duration_creeps", true),
			q3_duration = caster:GetTalentValue("modifier_slark_pact_3", "duration", true),

			has_q4 = 0,
			q4_damage_reduce = caster:GetTalentValue("modifier_slark_pact_4", "damage_reduce", true),
			q4_base = caster:GetTalentValue("modifier_slark_pact_4", "base", true),
			q4_duration = caster:GetTalentValue("modifier_slark_pact_4", "duration", true),
			q4_shield = caster:GetTalentValue("modifier_slark_pact_4", "shield", true) / 100,
			q4_max = caster:GetTalentValue("modifier_slark_pact_4", "max", true),
			q4_shield_duration = caster:GetTalentValue("modifier_slark_pact_4", "shield_duration", true),

			has_q7 = 0,
			q7_cost = caster:GetTalentValue("modifier_slark_pact_7", "cost", true) / 100,
			q7_duration = caster:GetTalentValue("modifier_slark_pact_7", "duration", true),
			q7_max = caster:GetTalentValue("modifier_slark_pact_7", "max", true),
			q7_heal = caster:GetTalentValue("modifier_slark_pact_7", "heal", true) / 100,
			q7_damage = caster:GetTalentValue("modifier_slark_pact_7", "damage", true) / 100,
			q7_radius = caster:GetTalentValue("modifier_slark_pact_7", "radius", true),
			q7_knock_duration = caster:GetTalentValue("modifier_slark_pact_7", "knock_duration", true),

			has_w2 = 0,
			w2_cd = 0,

			has_w4 = 0,
			w4_cd_items = caster:GetTalentValue("modifier_slark_pounce_4", "cd_items", true),
			w4_move = caster:GetTalentValue("modifier_slark_pounce_4", "move", true),
			w4_cd_items_legendary = caster:GetTalentValue("modifier_slark_pounce_4", "cd_items_legendary", true),
			w4_duration = caster:GetTalentValue("modifier_slark_pounce_4", "duration", true),

			has_w7 = 0,
			w7_pact = caster:GetTalentValue("modifier_slark_pounce_7", "pact", true) / 100,
		}
	end

	if caster:HasTalent("modifier_slark_pact_1") then
		self.talents.has_q1 = 1
		self.talents.q1_base = caster:GetTalentValue("modifier_slark_pact_1", "base")
		self.talents.q1_damage = caster:GetTalentValue("modifier_slark_pact_1", "damage") / 100
	end

	if caster:HasTalent("modifier_slark_pact_2") then
		self.talents.q2_heal = caster:GetTalentValue("modifier_slark_pact_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_slark_pact_2",
			type = 1,
			proc = "LifestealMana",
			value = function(params)
				return self.talents.q2_heal * (params.inflictor == self and self.talents.q2_bonus or 1)
			end,
		})
	end

	if caster:HasTalent("modifier_slark_pact_3") then
		self.talents.has_q3 = 1
		self.talents.q3_bonus_inc = caster:GetTalentValue("modifier_slark_pact_3", "bonus_inc")
		self.talents.q3_bonus = caster:GetTalentValue("modifier_slark_pact_3", "bonus")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_slark_pact_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_slark_pact_7") then
		self.talents.has_q7 = 1
		if IsServer() then
			self.tracker:UpdateJs()
		end
	end

	if caster:HasTalent("modifier_slark_pounce_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_slark_pounce_2", "cd")
	end

	if caster:HasTalent("modifier_slark_pounce_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_slark_pounce_7") then
		self.talents.has_w7 = 1
	end
end

function slark_dark_pact_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "slark_dark_pact", self)
end

function slark_dark_pact_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_slark_dark_pact_custom_tracker"
end

function slark_dark_pact_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level)
end

function slark_dark_pact_custom:GetCastRange(vLocation, hTarget)
	return self:GetRadius()
end

function slark_dark_pact_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_NO_TARGET
end

function slark_dark_pact_custom:GetRadius()
	return (self.radius or 0)
end

function slark_dark_pact_custom:GetHealthCost(level)
	if self.talents.has_q7 == 1 and IsClient() then
		return self.caster:GetMaxHealth() * self.talents.q7_cost
	end
end

function slark_dark_pact_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function slark_dark_pact_custom:OnSpellStart()
	local legendary_mod = self.caster:FindModifierByName("modifier_slark_dark_pact_custom_legendary")
	if legendary_mod then
		legendary_mod.early = true
		legendary_mod:Destroy()
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_slark_dark_pact_custom_delay", { duration = self.delay })
end

function slark_dark_pact_custom:AddStack(hit_hero, is_legendary)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	if self.talents.has_q4 == 1 then
		local shield = self.talents.q4_base + self.talents.q4_shield * self.parent:GetMaxHealth()
		local max = shield * self.talents.q4_max

		if not IsValid(self.shield_mod) then
			self.shield_mod = self.parent:AddNewModifier(self.parent, self, "modifier_generic_shield", {
				duration = self.talents.q4_shield_duration,
				max_shield = max,
				shield_talent = "modifier_slark_pact_4",
			})

			if self.shield_mod then
				self.shield_mod:SetFilterFunction(function(params)
					if params.attacker and params.attacker:GetTeamNumber() == self.parent:GetTeamNumber() then
						return false
					end
					return true
				end)

				self.shield_mod:SetReduceDamage(function(params)
					if params.caster:HasModifier("modifier_slark_dark_pact_custom") then
						return (1 - (self.talents.q4_damage_reduce * -1) / 100)
					end
				end)

				local cast_effect = ParticleManager:CreateParticle(
					"particles/slark/pact_shield.vpcf",
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
				self.shield_mod:AddParticle(cast_effect, false, false, -1, false, false)
			end
		end

		if self.shield_mod then
			self.shield_mod:AddShield(shield, max)
			self.shield_mod:SetDuration(self.talents.q4_shield_duration, true)
		end
	end

	if self.talents.has_w4 == 1 then
		local cd_items = is_legendary and self.talents.w4_cd_items_legendary or self.talents.w4_cd_items
		self.parent:CdItems(cd_items, "modifier_slark_pounce_4")
		self.parent:AddNewModifier(
			self.parent,
			self,
			"modifier_slark_dark_pact_custom_speed",
			{ duration = self.talents.w4_duration }
		)
	end

	if self.talents.has_q3 == 0 then
		return
	end
	local duration = hit_hero and self.talents.q3_duration or self.talents.q3_duration_creeps
	self.parent:AddNewModifier(
		self.parent,
		self,
		"modifier_slark_dark_pact_custom_health_bonus",
		{ duration = duration }
	)
end

function slark_dark_pact_custom:GetDamage()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	local damage = self.total_damage + self.talents.q1_base + self.talents.q1_damage * self.parent:GetMaxHealth()
	if self.talents.has_w7 == 1 then
		local mod = self.parent:FindModifierByName("modifier_slark_innate_custom_caster")
		if mod then
			damage = damage * (1 + mod:GetStackCount() * self.talents.w7_pact)
		end
	end
	return damage
end

modifier_slark_dark_pact_custom_delay = class(mod_hidden)
function modifier_slark_dark_pact_custom_delay:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.duration = self.ability.pulse_duration

	if not IsServer() then
		return
	end

	self.ability:EndCd()

	local effect_cast = ParticleManager:CreateParticleForTeam(
		wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_slark/slark_dark_pact_start.vpcf",
			self.ability,
			"slark_dark_pact_custom"
		),
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent,
		self.parent:GetTeamNumber()
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		nil,
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	if self.ability.talents.has_q7 == 1 then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_slark_dark_pact_custom_legendary_stack", {})
	end

	self.legendary_stack = self.parent:FindModifierByName("modifier_slark_dark_pact_custom_legendary_stack")
	if self.legendary_stack and self.legendary_stack:GetStackCount() >= self.ability.talents.q7_max then
		self.ability.tracker:UpdateEffect(true)
	end
	local sound = wearables_system:GetSoundReplacement(
		self.parent,
		"Hero_Slark.DarkPact.PreCast",
		self.ability,
		"slark_dark_pact_custom"
	)
	EmitSoundOnLocationForAllies(self.parent:GetAbsOrigin(), sound, self.parent)
end

function modifier_slark_dark_pact_custom_delay:OnDestroy()
	if not IsServer() then
		return
	end
	local mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_slark_dark_pact_custom", {})

	if mod then
		return
	end
	self.ability:StartCd()
	self.ability.tracker:UpdateEffect()
end

modifier_slark_dark_pact_custom = class(mod_hidden)
function modifier_slark_dark_pact_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.max = self.ability.total_pulses
	self.duration = self.ability.pulse_duration
		+ (self.ability.talents.has_q4 == 1 and self.ability.talents.q4_duration or 0)
	self.interval = self.duration / self.max
	self.radius = self.ability:GetRadius()
	self.damage = self.ability:GetDamage()
	self.self_damage = self.ability.total_damage * self.ability.self_damage_pct / 100

	self.damage = self.damage / self.max
	self.self_damage = self.self_damage / self.max

	self.legendary_stack = self.parent:FindModifierByName("modifier_slark_dark_pact_custom_legendary_stack")

	self.is_legendary = 0
	if self.legendary_stack and self.legendary_stack:GetStackCount() >= self.ability.talents.q7_max then
		self.damage = self.damage * self.ability.talents.q7_damage
		self.parent:EmitSound("Slark.Pact_legendary_damage")
		self.damage_ability = "modifier_slark_pact_7"
		self.radius = self.radius + self.ability.talents.q7_radius
		self.is_legendary = 1
	end

	self.damageTable =
		{ attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL, damage = self.damage }
	self.selfTable = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = self.self_damage,
		victim = self.parent,
		damage_flags = DOTA_DAMAGE_FLAG_NON_LETHAL,
	}

	if self.ability.talents.has_q7 == 1 then
		self.selfTable.damage_type = DAMAGE_TYPE_PURE
		self.selfTable.damage_flags = DOTA_DAMAGE_FLAG_NON_LETHAL
			+ DOTA_DAMAGE_FLAG_HPLOSS
			+ DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION
			+ DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS
		self.selfTable.damage = self.parent:GetMaxHealth() * self.ability.talents.q7_cost / self.max
	end

	self.hit_creeps = false
	self.hit_hero = false

	self.targets = {}
	self.legendary_active = false

	local anim_k = 1 / self.duration
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_1, anim_k)
	local sound = wearables_system:GetSoundReplacement(
		self.parent,
		"Hero_Slark.DarkPact.Cast",
		self.ability,
		"slark_dark_pact_custom"
	)
	self.parent:EmitSound(sound)

	local effect_body = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_slark/slark_dark_pact_pulses_body.vpcf",
			self.ability,
			"slark_dark_pact_custom"
		),
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_body,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_body)

	local dance_mod = self.parent:FindModifierByName("modifier_slark_shadow_dance_custom")
	local unit = self.parent
	local point = "attach_hitloc"

	if dance_mod and dance_mod.dummy then
		point = nil
		unit = dance_mod.dummy
	end

	local effect_cast = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/slark/pact_pulses.vpcf",
			self.ability,
			"slark_dark_pact_custom"
		),
		PATTACH_ABSORIGIN_FOLLOW,
		unit
	)
	ParticleManager:SetParticleControlEnt(effect_cast, 0, unit, PATTACH_POINT_FOLLOW, point, unit:GetOrigin(), true)
	ParticleManager:SetParticleControlEnt(effect_cast, 1, unit, PATTACH_ABSORIGIN_FOLLOW, point, unit:GetOrigin(), true)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(self.radius, self.duration, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	if IsValid(self.parent.pounce_ability) then
		self.parent.pounce_ability:CreateArea(self.parent:GetAbsOrigin())
	end

	self:SetStackCount(self.max)
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_slark_dark_pact_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_slark_dark_pact_custom:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce
end

function modifier_slark_dark_pact_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	for _, target in pairs(self.parent:FindTargets(self.radius)) do
		if target:IsRealHero() then
			self.hit_hero = true
		else
			self.hit_creeps = true
		end

		if self.ability.talents.has_q7 == 1 and self.is_legendary == 1 then
			if not self.targets[target:entindex()] then
				self.targets[target:entindex()] = true
				self.parent:PullTarget(target, self.ability, self.ability.talents.q7_knock_duration)
			end
		end
		self.damageTable.damage = self.damage
		self.damageTable.victim = target
		DoDamage(self.damageTable, self.damage_ability)
	end

	DoDamage(self.selfTable)
	self.parent:Purge(false, true, false, true, true)

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
	end
end

function modifier_slark_dark_pact_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if self.hit_hero or self.hit_creeps then
		self.ability:AddStack(self.hit_hero)
	end

	if self.ability.talents.has_q7 == 1 then
		if IsValid(self.legendary_stack) and self.legendary_stack:GetStackCount() >= self.ability.talents.q7_max then
			local effect_body = ParticleManager:CreateParticle(
				"particles/slark/pact_legendary_heal.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				effect_body,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(effect_body)

			self.parent:EmitSound("Slark.Pact_legendary_heal")
			self.parent:GenericHeal(
				self.parent:GetMaxHealth() * self.ability.talents.q7_heal,
				self.ability,
				false,
				"particles/slark/dance_lifesteal.vpcf",
				"modifier_slark_pact_7"
			)

			self.legendary_stack:Destroy()
			self.ability.tracker:UpdateEffect()
		else
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_slark_dark_pact_custom_legendary",
				{ duration = self.ability.talents.q7_duration }
			)
		end
	end
end

modifier_slark_dark_pact_custom_tracker = class(mod_hidden)
function modifier_slark_dark_pact_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.pact_ability = self.ability

	self.ability.delay = self.ability:GetSpecialValueFor("delay")
	self.ability.pulse_duration = self.ability:GetSpecialValueFor("pulse_duration")
	self.ability.total_damage = self.ability:GetSpecialValueFor("total_damage")
	self.ability.total_pulses = self.ability:GetSpecialValueFor("total_pulses")
	self.ability.pulse_interval = self.ability:GetSpecialValueFor("pulse_interval")
	self.ability.self_damage_pct = self.ability:GetSpecialValueFor("self_damage_pct")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_slark_dark_pact_custom_tracker:OnRefresh()
	self.ability.total_damage = self.ability:GetSpecialValueFor("total_damage")
end

function modifier_slark_dark_pact_custom_tracker:LifestealMana(params, heal)
	if params.inflictor ~= self.ability then
		return
	end
	self.parent:GiveMana(heal * self.ability.talents.q2_mana)
end

function modifier_slark_dark_pact_custom_tracker:UpdateJs()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end

	local max = self.ability.talents.q7_max
	local stack = max
	local interval = -1
	local zero = nil
	local override = nil

	local mod = self.parent:FindModifierByName("modifier_slark_dark_pact_custom_legendary_stack")
	if mod then
		stack = stack - mod:GetStackCount()
	end

	if self.ability:GetCooldownTimeRemaining() > 0 then
		zero = 1
		stack = 0
		override = self.ability:GetCooldownTimeRemaining()
		interval = 0.1
	end

	self.parent:UpdateUIlong({
		max = max,
		stack = stack,
		use_zero = zero,
		override_stack = override,
		style = "SlarkPact",
	})
	self:StartIntervalThink(interval)
end

function modifier_slark_dark_pact_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateJs()
end

function modifier_slark_dark_pact_custom_tracker:UpdateEffect(create)
	if not IsServer() then
		return
	end

	if create and not self.legendary_radius then
		self.legendary_radius = ParticleManager:CreateParticle(
			"particles/slark/pact_legendary_radius.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(self.legendary_radius, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(
			self.legendary_radius,
			1,
			Vector(self.ability:GetRadius() + self.ability.talents.q7_radius, 0, 0)
		)
		self:AddParticle(self.legendary_radius, false, false, -1, false, false)
	end

	if not create and self.legendary_radius then
		ParticleManager:DestroyParticle(self.legendary_radius, false)
		ParticleManager:ReleaseParticleIndex(self.legendary_radius)
		self.legendary_radius = nil
	end
end

function modifier_slark_dark_pact_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_slark_dark_pact_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.q3_bonus
		+ self.parent:GetUpgradeStack("modifier_slark_dark_pact_custom_health_bonus")
			* self.ability.talents.q3_bonus_inc
end

function modifier_slark_dark_pact_custom_tracker:GetModifierExtraHealthPercentage()
	return self.ability.talents.q3_bonus
		+ self.parent:GetUpgradeStack("modifier_slark_dark_pact_custom_health_bonus")
			* self.ability.talents.q3_bonus_inc
end

modifier_slark_dark_pact_custom_legendary = class(mod_visible)
function modifier_slark_dark_pact_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max_time = self:GetRemainingTime()

	if not IsServer() then
		return
	end
	self.early = false
	self.ability:EndCd(0)
end

function modifier_slark_dark_pact_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	if self.early == true then
		return
	end
	self.ability:StartCd()
	self.parent:CdAbility(self.ability, self.max_time, nil, "modifier_slark_pact_7")
	self.parent:RemoveModifierByName("modifier_slark_dark_pact_custom_legendary_stack")
end

modifier_slark_dark_pact_custom_legendary_stack = class(mod_hidden)
function modifier_slark_dark_pact_custom_legendary_stack:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.max = self.ability.talents.q7_max

	if not IsServer() then
		return
	end
	self.particle = self.parent:GenericParticle("particles/slark/pact_legendary_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_slark_dark_pact_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.ability.tracker then
		self.ability.tracker:UpdateJs()
	end

	if not self.particle then
		return
	end
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
end

function modifier_slark_dark_pact_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.tracker then
		self.ability.tracker:UpdateJs()
	end
end

modifier_slark_dark_pact_custom_health_bonus = class(mod_visible)
function modifier_slark_dark_pact_custom_health_bonus:GetTexture()
	return "buffs/slark/pact_3"
end
function modifier_slark_dark_pact_custom_health_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q3_max
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_slark_dark_pact_custom_health_bonus:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_dark_pact_custom_health_bonus:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_dark_pact_custom_health_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_slark_dark_pact_custom_health_bonus:OnTooltip()
	return self.ability.talents.q3_bonus + self:GetStackCount() * self.ability.talents.q3_bonus_inc
end

function modifier_slark_dark_pact_custom_health_bonus:GetModifierModelScale()
	return 4 * self:GetStackCount()
end

modifier_slark_dark_pact_custom_speed = class(mod_hidden)
function modifier_slark_dark_pact_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.w4_move
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/slark/pact_move.vpcf", self)
end

function modifier_slark_dark_pact_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_slark_dark_pact_custom_speed:GetModifierMoveSpeedBonus_Percentage()
	return self.speed
end