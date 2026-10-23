--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_huskar_life_break",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_custom_huskar_life_break_slow",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_life_delay_damage",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_life_break_tracker",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_life_taunt_cd",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_huskar_life_break_heal",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_hero_3"
)
LinkLuaModifier(
	"modifier_custom_huskar_life_break_aura_damage",
	"abilities/huskar/custom_huskar_life_break",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_huskar_leap_1"
)

custom_huskar_life_break = class({})
custom_huskar_life_break.talents = {}

function custom_huskar_life_break:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/huskar/huskar_life_break.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_life_break_spellstart.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_huskar/huskar_life_break_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_egg.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_tailthump_buff_streaks.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_purifyingflames.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_ultimate_calldown.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_earth_stack.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_fire.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_refresh.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		context
	)
end

function custom_huskar_life_break:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_damage_min = 0,
			r1_radius = caster:GetTalentValue("modifier_huskar_leap_1", "radius", true),
			r1_damage_type = caster:GetTalentValue("modifier_huskar_leap_1", "damage_type", true),
			r1_interval = caster:GetTalentValue("modifier_huskar_leap_1", "interval", true),

			r2_cd = 0,

			has_r3 = 0,
			r3_heal = 0,
			r3_damage = 0,
			r3_damage_type = caster:GetTalentValue("modifier_huskar_leap_3", "damage_type", true),
			r3_delay = caster:GetTalentValue("modifier_huskar_leap_3", "delay", true),

			has_r4 = 0,
			r4_health = caster:GetTalentValue("modifier_huskar_leap_4", "health", true),
			r4_cd_items = caster:GetTalentValue("modifier_huskar_leap_4", "cd_items", true),

			has_r7 = 0,
			r7_cost = caster:GetTalentValue("modifier_huskar_leap_7", "cost", true) / 100,
			r7_cd_inc = caster:GetTalentValue("modifier_huskar_leap_7", "cd_inc", true) / 100,
			r7_health = caster:GetTalentValue("modifier_huskar_leap_7", "health", true),
			r7_damage = caster:GetTalentValue("modifier_huskar_leap_7", "damage", true) / 100,
			r7_damage_type = caster:GetTalentValue("modifier_huskar_leap_7", "damage_type", true),

			has_h3 = 0,
			h3_heal = 0,
			h3_str = 0,
			h3_duration = caster:GetTalentValue("modifier_huskar_hero_3", "duration", true),

			has_h6 = 0,
			h6_taunt = caster:GetTalentValue("modifier_huskar_hero_6", "taunt", true),
			h6_health = caster:GetTalentValue("modifier_huskar_hero_6", "health", true),
			h6_cast = caster:GetTalentValue("modifier_huskar_hero_6", "cast", true),
			h6_talent_cd = caster:GetTalentValue("modifier_huskar_hero_6", "talent_cd", true),

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_huskar_leap_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage_min = caster:GetTalentValue("modifier_huskar_leap_1", "damage_min")
		self.talents.r1_damage = caster:GetTalentValue("modifier_huskar_leap_1", "damage") / 100
	end

	if caster:HasTalent("modifier_huskar_leap_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_huskar_leap_2", "cd")
	end

	if caster:HasTalent("modifier_huskar_leap_3") then
		self.talents.has_r3 = 1
		self.talents.r3_heal = caster:GetTalentValue("modifier_huskar_leap_3", "heal") / 100
		self.talents.r3_damage = caster:GetTalentValue("modifier_huskar_leap_3", "damage") / 100
		caster:AddDamageEvent_out(self.tracker, true)
		caster:AddLifesteal(self.tracker, { name = "modifier_huskar_leap_3", type = 1, value = self.talents.r3_heal })
	end

	if caster:HasTalent("modifier_huskar_leap_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_huskar_leap_7") then
		self.talents.has_r7 = 1
		if IsServer() then
			self.tracker.interval = 0.3
			self.tracker:StartIntervalThink(self.tracker.interval)
		end
	end

	if caster:HasTalent("modifier_huskar_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_heal = caster:GetTalentValue("modifier_huskar_hero_3", "heal")
		self.talents.h3_str = caster:GetTalentValue("modifier_huskar_hero_3", "str")
		if IsServer() then
			caster:AddPercentStat({ str = self.talents.h3_str / 100 }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_huskar_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_huskar_disarm_7") then
		self.talents.has_q7 = 1
	end
end

function custom_huskar_life_break:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "huskar_life_break", self)
end

function custom_huskar_life_break:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_huskar_life_break_tracker"
end

function custom_huskar_life_break:GetHealthCost()
	if IsServer() then
		return
	end
	if self.talents.has_r7 == 1 then
		return self.caster:GetMaxHealth() * self.talents.r7_cost
	end
end

function custom_huskar_life_break:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.r2_cd or 0)
end

function custom_huskar_life_break:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h6 == 1 and self.talents.h6_cast or 0)
end

function custom_huskar_life_break:GetBehavior()
	if self.caster:HasShard() then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE
end

function custom_huskar_life_break:GetAOERadius()
	return self.aoe_radius or 0
end

function custom_huskar_life_break:GetCastRange(vLocation, hTarget)
	if IsServer() and not hTarget and self.caster:HasShard() then
		return 99999
	end
	return (self.AbilityCastRange or 0) + (self.caster:HasShard() and (self.shard_range or 0) or 0)
end

function custom_huskar_life_break:OnSpellStart()
	local point = self:GetCursorPosition()
	local target = self:GetCursorTarget()
	self.caster:EmitSound("Hero_Huskar.Life_Break")

	if target and target:TriggerSpellAbsorb(self) then
		return
	end

	if not target then
		local vec = point - self.caster:GetAbsOrigin()
		local max_range = self.AbilityCastRange + self.shard_range + self.caster:GetCastRangeBonus()
		if vec:Length2D() > max_range then
			point = self.caster:GetAbsOrigin() + vec:Normalized() * max_range
		end
	end

	self.caster:Purge(false, true, false, false, false)
	if target then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_huskar_life_break",
			{ duration = 5, ent_index = target:entindex() }
		)
		if
			target:IsRealHero()
			and self.caster:GetQuest() == "Huskar.Quest_8"
			and not self.caster:QuestCompleted()
			and self.caster:GetHealthPercent() <= self.caster.quest.number
		then
			self.caster:UpdateQuest(1)
		end
	else
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_huskar_life_break",
			{ duration = 5, x = point.x, y = point.y }
		)
	end
end

function custom_huskar_life_break:ApplyDelay(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r3 == 0 then
		return
	end

	target:RemoveModifierByName("modifier_custom_huskar_life_delay_damage")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_huskar_life_delay_damage",
		{ duration = self.talents.r3_delay }
	)
end

modifier_custom_huskar_life_break = class(mod_hidden)
function modifier_custom_huskar_life_break:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.use_taunt = 0
	self.health_cost_percent = self.ability.health_cost_percent
	self.heroes_damage = self.ability.health_damage
	self.creeps_health = self.ability.creeps_health
	self.charge_speed = self.ability.charge_speed
	self.aoe_radius = self.ability.aoe_radius

	if self.ability.talents.has_h6 == 1 and self.parent:GetHealthPercent() <= self.ability.talents.h6_health then
		self.use_taunt = 1
	end

	if self.parent:HasShard() then
		self.charge_speed = self.charge_speed * (1 + self.ability.shard_speed)
	end

	if not IsServer() then
		return
	end
	self.bkb = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_debuff_immune", {})

	self.particle_name_end =
		wearables_system:GetParticleReplacementAbility(self.parent, "particles/huskar/huskar_life_break.vpcf", self)
	local particle_name_start = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_huskar/huskar_life_break_spellstart.vpcf",
		self
	)
	local particle_name_cast = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_huskar/huskar_life_break_cast.vpcf",
		self
	)

	self.parent:GenericParticle(particle_name_cast, self)

	local particle = ParticleManager:CreateParticle(particle_name_start, PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		5,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.min_range = 128
	self.break_range = 1450
	self.good_end = false

	if params.ent_index then
		self.target = EntIndexToHScript(params.ent_index)
	else
		self.min_range = 30
		self.break_range = 10000
		self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)
	end

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_custom_huskar_life_break:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	if self.target and not IsValid(self.target) then
		self:Destroy()
		return
	end

	local target
	if self.target then
		target = self.target:GetAbsOrigin()
	else
		target = self.point
	end

	self.parent:FaceTowards(target)

	local distance = (target - me:GetOrigin()):Normalized()
	me:SetOrigin(me:GetOrigin() + distance * self.charge_speed * dt)

	local dist = (self.parent:GetAbsOrigin() - target):Length2D()
	if dist > self.break_range or dist <= self.min_range or self.parent:IsStunned() then
		if dist <= self.min_range then
			self.good_end = true
		end
		self:Destroy()
	end
end

function modifier_custom_huskar_life_break:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_custom_huskar_life_break:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.bkb) then
		self.bkb:Destroy()
	end

	self.parent:RemoveHorizontalMotionController(self)

	if self.good_end then
		self.parent:StartGesture(ACT_DOTA_CAST_LIFE_BREAK_END)
		local point = self.parent:GetAbsOrigin()
		local targets = self.parent:FindTargets(self.aoe_radius, point)
		EmitSoundOnLocationWithCaster(point, "Hero_Huskar.Life_Break.Impact", self.parent)

		local damage = self.health_cost_percent * self.parent:GetHealth()
		local damage_type = DAMAGE_TYPE_MAGICAL
		if self.ability.talents.has_r7 == 1 then
			damage_type = DAMAGE_TYPE_PURE
			damage = self.ability.talents.r7_cost * self.parent:GetMaxHealth()
		end

		local damageTable_self = {
			victim = self.parent,
			attacker = self.parent,
			damage = damage,
			damage_type = damage_type,
			ability = self.ability,
			damage_flags = DOTA_DAMAGE_FLAG_NON_LETHAL + DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
		}
		DoDamage(damageTable_self)

		if self.target then
			self.parent:MoveToTargetToAttack(self.target)
		else
			self.parent:MoveToPositionAggressive(self.point)
		end

		if #targets <= 0 then
			local particle = ParticleManager:CreateParticle(self.particle_name_end, PATTACH_WORLDORIGIN, nil)
			ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
			ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
			ParticleManager:ReleaseParticleIndex(particle)
		else
			for _, unit in pairs(targets) do
				if self.ability.talents.has_q7 == 0 then
					self.ability:ApplyDelay(unit)
				end

				if IsValid(self.parent.inner_ability) then
					self.parent.inner_ability:ApplyBurn(unit)
				end

				local particle = ParticleManager:CreateParticle(self.particle_name_end, PATTACH_WORLDORIGIN, nil)
				ParticleManager:SetParticleControl(particle, 0, unit:GetAbsOrigin())
				ParticleManager:SetParticleControl(particle, 1, unit:GetAbsOrigin())
				ParticleManager:ReleaseParticleIndex(particle)

				unit:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_custom_huskar_life_break_slow",
					{ duration = self.ability.slow_durtion * (1 - unit:GetStatusResistance()) }
				)

				local unit_damage = self.heroes_damage * unit:GetHealth()
				local unit_damage_type = DAMAGE_TYPE_MAGICAL
				local source = nil
				if self.ability.talents.has_r7 == 1 then
					unit_damage_type = self.ability.talents.r7_damage_type
					unit_damage = self.ability.talents.r7_damage
						* (self.parent:GetMaxHealth() - self.parent:GetHealth())
					source = "modifier_huskar_leap_7"
				end
				if unit:IsCreep() then
					unit_damage = self.creeps_health * self.parent:GetMaxHealth()
					source = nil
				end

				if self.use_taunt == 1 and not unit:HasModifier("modifier_custom_huskar_life_taunt_cd") then
					unit:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_custom_huskar_life_taunt_cd",
						{ duration = self.ability.talents.h6_talent_cd }
					)
					unit:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_generic_taunt",
						{ duration = (1 - unit:GetStatusResistance()) * self.ability.talents.h6_taunt }
					)
				end

				DoDamage(
					{
						victim = unit,
						attacker = self.parent,
						damage = unit_damage,
						damage_type = unit_damage_type,
						ability = self.ability,
					},
					source
				)
			end
		end

		if self.ability.talents.has_h3 == 1 then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_custom_huskar_life_break_heal",
				{ duration = self.ability.talents.h3_duration }
			)
		end

		if self.ability.talents.has_r4 == 1 then
			local cd_items = math.min(
				1,
				1
					- (
						(self.parent:GetHealthPercent() - self.ability.talents.r4_health)
						/ (100 - self.ability.talents.r4_health)
					)
			) * self.ability.talents.r4_cd_items
			self.parent:CdItems(cd_items, "modifier_huskar_leap_4")
		end
	end
end

function modifier_custom_huskar_life_break:CheckState()
	local result = {
		[MODIFIER_STATE_DISARMED] = true,
	}
	if self.ability.talents.has_r4 == 1 then
		result[MODIFIER_STATE_INVULNERABLE] = true
		result[MODIFIER_STATE_NO_HEALTH_BAR] = true
	end
	return result
end

function modifier_custom_huskar_life_break:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_custom_huskar_life_break:GetOverrideAnimation()
	return ACT_DOTA_CAST_LIFE_BREAK_START
end

function modifier_custom_huskar_life_break:GetModifierDisableTurning()
	return 1
end

modifier_custom_huskar_life_break_slow = class(mod_visible)
function modifier_custom_huskar_life_break_slow:IsPurgable()
	return true
end
function modifier_custom_huskar_life_break_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_huskar_lifebreak.vpcf"
end
function modifier_custom_huskar_life_break_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_custom_huskar_life_break_slow:OnCreated()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	self.attackspeed = self.ability.attack_speed
	self.movespeed = self.ability.movespeed
end

function modifier_custom_huskar_life_break_slow:OnRefresh()
	self.attackspeed = self.ability.attack_speed
	self.movespeed = self.ability.movespeed
end

function modifier_custom_huskar_life_break_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_huskar_life_break_slow:GetModifierAttackSpeedBonus_Constant()
	return self.attackspeed
end

function modifier_custom_huskar_life_break_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.movespeed
end

modifier_custom_huskar_life_break_tracker = class(mod_hidden)
function modifier_custom_huskar_life_break_tracker:IsAura()
	return self.ability.talents.has_r1 == 1
end
function modifier_custom_huskar_life_break_tracker:GetAuraDuration()
	return 0.1
end
function modifier_custom_huskar_life_break_tracker:GetAuraRadius()
	return self.ability.talents.r1_radius
end
function modifier_custom_huskar_life_break_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_custom_huskar_life_break_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_custom_huskar_life_break_tracker:GetModifierAura()
	return "modifier_custom_huskar_life_break_aura_damage"
end
function modifier_custom_huskar_life_break_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.break_ability = self.ability

	self.ability.AbilityCastRange = self.ability:GetSpecialValueFor("AbilityCastRange")
	self.ability.charge_speed = self.ability:GetSpecialValueFor("charge_speed")
	self.ability.health_damage = self.ability:GetSpecialValueFor("health_damage") / 100
	self.ability.health_cost_percent = self.ability:GetSpecialValueFor("health_cost_percent") / 100
	self.ability.attack_speed = self.ability:GetSpecialValueFor("attack_speed")
	self.ability.slow_durtion = self.ability:GetSpecialValueFor("slow_durtion")
	self.ability.movespeed = self.ability:GetSpecialValueFor("movespeed")
	self.ability.creeps_health = self.ability:GetSpecialValueFor("creeps_health") / 100
	self.ability.aoe_radius = self.ability:GetSpecialValueFor("aoe_radius")
	self.ability.shard_speed = self.ability:GetSpecialValueFor("shard_speed") / 100
	self.ability.shard_range = self.ability:GetSpecialValueFor("shard_range")
end

function modifier_custom_huskar_life_break_tracker:OnRefresh()
	self.ability.health_damage = self.ability:GetSpecialValueFor("health_damage") / 100
	self.ability.health_cost_percent = self.ability:GetSpecialValueFor("health_cost_percent") / 100
	self.ability.attack_speed = self.ability:GetSpecialValueFor("attack_speed")
end

function modifier_custom_huskar_life_break_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	if self.ability.talents.has_r3 == 0 then
		return
	end

	local mod = params.unit:FindModifierByName("modifier_custom_huskar_life_delay_damage")
	if mod then
		mod.damage = mod.damage + params.original_damage * self.ability.talents.r3_damage
	end
end

function modifier_custom_huskar_life_break_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.interval then
		return
	end

	local stack = 0
	local override = (self.ability.talents.r7_damage * (self.parent:GetMaxHealth() - self.parent:GetHealth()))
		* (1 + self.parent:GetSpellAmplification(false))

	if self.parent:GetHealthPercent() <= self.ability.talents.r7_health then
		stack = 1
		if self.ability:GetCooldownTimeRemaining() > 0 then
			local cd = self.interval * self.ability.talents.r7_cd_inc
			self.parent:CdAbility(self.ability, cd, nil, "modifier_huskar_leap_7")
		end
	end

	self.parent:UpdateUIlong({ stack = stack, override_stack = math.floor(override), max = 1, style = "HuskarBreak" })
end

modifier_custom_huskar_life_break_aura_damage = class(mod_visible)
function modifier_custom_huskar_life_break_aura_damage:GetTexture()
	return "buffs/huskar/inner_fire_1"
end
function modifier_custom_huskar_life_break_aura_damage:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.talents.r1_interval
	self.damage = self.ability.talents.r1_damage
	self.min_damage = self.ability.talents.r1_damage_min

	if not IsServer() then
		return
	end

	self.particle_index = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle_index, false, false, -1, false, false)

	self.damageTable = {
		victim = self.parent,
		ability = self.ability,
		damage_type = self.ability.talents.r1_damage_type,
		attacker = self.caster,
	}
	self:StartIntervalThink(self.interval)
end

function modifier_custom_huskar_life_break_aura_damage:GetDamage()
	return self.min_damage + self.damage * (self.caster:GetMaxHealth() - self.caster:GetHealth())
end

function modifier_custom_huskar_life_break_aura_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.damageTable.damage = self:GetDamage() * self.interval
	DoDamage(self.damageTable, "modifier_huskar_leap_1")
end

function modifier_custom_huskar_life_break_aura_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_custom_huskar_life_break_aura_damage:OnTooltip()
	return self:GetDamage()
end

modifier_custom_huskar_life_delay_damage = class(mod_hidden)
function modifier_custom_huskar_life_delay_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage = 0
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.r3_damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
	}
	self.parent:GenericParticle("particles/huskar/huskar_fire.vpcf", self, true)
end

function modifier_custom_huskar_life_delay_damage:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() or not self.caster:IsAlive() then
		return
	end
	if self.damage <= 0 then
		return
	end

	self.damageTable.damage = self.damage
	DoDamage(self.damageTable, "modifier_huskar_leap_3")
	self.parent:EmitSound("Hero_Huskar.Life_Break.Impact")

	local particle = ParticleManager:CreateParticle("particles/huskar/huskar_life_break.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(particle)
end

modifier_custom_huskar_life_taunt_cd = class(mod_hidden)
function modifier_custom_huskar_life_taunt_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_custom_huskar_life_break_heal = class(mod_visible)
function modifier_custom_huskar_life_break_heal:GetTexture()
	return "buffs/huskar/hero_4"
end
function modifier_custom_huskar_life_break_heal:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.heal = self.ability.talents.h3_heal

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_custom_huskar_life_break_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_custom_huskar_life_break_heal:GetModifierConstantHealthRegen()
	return self.heal
end