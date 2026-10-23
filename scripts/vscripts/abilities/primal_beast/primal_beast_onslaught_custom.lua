--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_tracker",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_cast",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL,
	true
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_thinker",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_stack",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_onslaught_7"
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_quake_slow",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_damage",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_onslaught_1"
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_slow",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_onslaught_2"
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_armor",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_onslaught_3"
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_count",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_onslaught_3"
)
LinkLuaModifier(
	"modifier_primal_beast_onslaught_custom_move",
	"abilities/primal_beast/primal_beast_onslaught_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_primal_beast_hero_1"
)

primal_beast_onslaught_custom = class({})
primal_beast_onslaught_custom.talents = {}

function primal_beast_onslaught_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_chargeup.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_onslaught_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_primal_beast/primal_beast_pulverize_hit.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/beast_quake.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/beast_quake_stack.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/onslaught_hit.vpcf", context)
	PrecacheResource("particle", "particles/lina/lina_attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/buckle_refresh.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf", context)
	PrecacheResource("particle", "particles/primal_beast/onslaught_shard.vpcf", context)
end

function primal_beast_onslaught_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_quake = 0,
			q1_attack = 0,
			q1_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_1", "duration", true),

			has_q2 = 0,
			q2_cd = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_2", "duration", true),

			has_q3 = 0,
			q3_base = 0,
			q3_armor = 0,
			q3_crit = 0,
			q3_max = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "max", true),
			q3_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "duration", true),
			q3_count = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "count", true),
			q3_count_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "count_duration", true),
			q3_heal = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "heal", true) / 100,

			has_q4 = 0,
			q4_speed = caster:GetTalentValue("modifier_primal_beast_onslaught_4", "speed", true) / 100,
			q4_cd = caster:GetTalentValue("modifier_primal_beast_onslaught_4", "cd", true) / 100,
			q4_stun = caster:GetTalentValue("modifier_primal_beast_onslaught_4", "stun", true) / 100,

			has_q7 = 0,
			q7_damage = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "damage", true),
			q7_damage_inc = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "damage_inc", true),
			q7_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "duration", true),
			q7_interval = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "interval", true),
			q7_radius = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "radius", true),
			q7_max = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "max", true),
			q7_stack_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "stack_duration", true),
			q7_slow = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "slow", true),
			q7_slow_duration = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "slow_duration", true),
			q7_mana = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "mana", true),
			q7_creeps = caster:GetTalentValue("modifier_primal_beast_onslaught_7", "creeps", true) / 100,

			e1_interval = 0,
			has_e4 = 0,
			e4_stun = caster:GetTalentValue("modifier_primal_beast_uproar_4", "stun", true),
			has_e7 = 0,

			has_r7 = 0,

			has_h1 = 0,
			h1_cast = 0,
			h1_duration = caster:GetTalentValue("modifier_primal_beast_hero_1", "duration", true),
		}
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_primal_beast_onslaught_1", "damage") / 100
		self.talents.q1_quake = caster:GetTalentValue("modifier_primal_beast_onslaught_1", "quake") / 100
		self.talents.q1_attack = caster:GetTalentValue("modifier_primal_beast_onslaught_1", "attack")
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_2") then
		self.talents.has_q2 = 1
		self.talents.q2_cd = caster:GetTalentValue("modifier_primal_beast_onslaught_2", "cd")
		self.talents.q2_slow = caster:GetTalentValue("modifier_primal_beast_onslaught_2", "slow")
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_3") then
		self.talents.has_q3 = 1
		self.talents.q3_base = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "base")
		self.talents.q3_armor = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "armor") / 100
		self.talents.q3_crit = caster:GetTalentValue("modifier_primal_beast_onslaught_3", "crit")
		caster:AddProc(self.tracker, { damage = true })
		caster:AddRecordDestroyEvent(self.tracker, true)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_primal_beast_onslaught_3",
			type = 2,
			text = true,
			value = function(params)
				if not self.tracker.records[params.record] then
					return 0
				end
				return self.talents.q3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_primal_beast_onslaught_7") then
		self.talents.has_q7 = 1
		self:UpdateUI()
	end

	if caster:HasTalent("modifier_primal_beast_uproar_1") then
		self.talents.e1_interval = caster:GetTalentValue("modifier_primal_beast_uproar_1", "interval") / 100
	end

	if caster:HasTalent("modifier_primal_beast_uproar_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_primal_beast_uproar_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_pulverize_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_primal_beast_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_cast = caster:GetTalentValue("modifier_primal_beast_hero_1", "cast")
	end
end

function primal_beast_onslaught_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_primal_beast_onslaught_custom_tracker"
end

function primal_beast_onslaught_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_primal_beast_onslaught_custom_cast") then
		return wearables_system:GetAbilityIconReplacement(self.caster, "primal_beast_onslaught_release", self)
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "primal_beast_onslaught", self)
end

function primal_beast_onslaught_custom:GetBehavior()
	if self.caster:HasModifier("modifier_primal_beast_onslaught_custom_cast") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function primal_beast_onslaught_custom:GetCastAnimation()
	if self.caster:HasModifier("modifier_primal_beast_onslaught_custom_cast") then
		return ACT_DOTA_CAST_ABILITY_7
	end
	return ACT_DOTA_CAST_ABILITY_2
end

function primal_beast_onslaught_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_primal_beast_onslaught_custom_cast") then
		return 0
	end
	if self.talents.has_q7 == 1 then
		return self.talents.q7_mana
	end
	return self.BaseClass.GetManaCost(self, level)
end

function primal_beast_onslaught_custom:GetCastRange(vLocation, hTarget)
	if IsServer() then
		return 999999
	end
	return self.max_distance or 0
end

function primal_beast_onslaught_custom:GetCooldown(iLevel)
	local cd = self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0)
	if
		self.talents.has_q4 == 1
		and self.talents.has_e7 == 1
		and self.caster:HasModifier("modifier_primal_beast_uproar_custom_buff")
	then
		return cd * (1 + self.talents.q4_cd)
	end
	return cd
end

function primal_beast_onslaught_custom:GetDamage()
	return self.knockback_damage
		+ self.caster:GetAverageTrueAttackDamage(nil)
			* (self.attack_damage + (self.talents.has_q7 == 0 and self.talents.q1_damage or 0))
end

function primal_beast_onslaught_custom:GetChargeTime()
	return self.chargeup_time + (self.talents.h1_cast or 0)
end

function primal_beast_onslaught_custom:GetChargeSpeed()
	return self.charge_speed * (1 + (self.talents.has_q4 == 1 and self.talents.q4_speed or 0))
end

function primal_beast_onslaught_custom:GetTurnRate()
	return self.turn_rate * (1 + (self.talents.has_q4 == 1 and self.talents.q4_speed or 0))
end

function primal_beast_onslaught_custom:GetKnockbackRadius()
	return self.knockback_radius * (1 + (self.talents.has_q4 == 1 and self.talents.q4_speed or 0))
end

function primal_beast_onslaught_custom:GetMaxDistance()
	return self.max_distance + self.caster:GetCastRangeBonus()
end

function primal_beast_onslaught_custom:GetQuakeInterval()
	if self.talents.has_e7 == 0 and self.caster:HasModifier("modifier_primal_beast_uproar_custom_buff") then
		return self.talents.q7_interval * (1 + self.talents.e1_interval)
	end
	return self.talents.q7_interval
end

function primal_beast_onslaught_custom:OnSpellStart()
	if self.caster:HasModifier("modifier_primal_beast_onslaught_custom_cast") then
		self:OnChargeFinish(false, false)
		return
	end

	local point = self:GetCursorPosition()
	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	self.caster:FacePoint(point)

	if IsValid(self.damage_mod) then
		self.damage_mod:Destroy()
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_onslaught_custom_cast",
		{ duration = self:GetChargeTime() }
	)
end

function primal_beast_onslaught_custom:OnChargeFinish(interrupt, max)
	if not IsServer() then
		return
	end

	local max_duration = self:GetChargeTime()
	local charge_duration = max_duration

	local mod = self.caster:FindModifierByName("modifier_primal_beast_onslaught_custom_cast")
	if mod then
		charge_duration = mod:GetElapsedTime()
		mod.charge_finish = true
		mod:Destroy()
	elseif not max then
		return
	end

	local k = charge_duration / max_duration
	local charge = math.floor(charge_duration / (max_duration / self.talents.q7_duration))

	if self.talents.has_q1 == 1 then
		self.damage_mod = self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_primal_beast_onslaught_custom_damage",
			{ duration = self.talents.q1_duration, stack = math.floor(self.talents.q1_attack * k) }
		)
	end

	if self.talents.has_q4 == 1 and self.talents.has_e7 == 0 and k >= 0.98 then
		self.caster:CdAbility(
			self,
			self:GetCooldownTimeRemaining() * self.talents.q4_cd,
			nil,
			"modifier_primal_beast_onslaught_4"
		)

		local particle =
			ParticleManager:CreateParticle("particles/pangolier/buckle_refresh.vpcf", PATTACH_CUSTOMORIGIN, self.caster)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
		self.caster:EmitSound("PBeast.Onslaught_refresh")
	end

	if interrupt then
		return
	end

	self.caster:LogProc("primal_beast_onslaught_custom", k * 100)

	local distance = self:GetMaxDistance() * k

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_onslaught_custom",
		{ charge = charge, duration = distance / self:GetChargeSpeed(), max = max }
	)
	self.caster:EmitSound("Hero_PrimalBeast.Onslaught")
end

function primal_beast_onslaught_custom:ProcSlow(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_q2 == 0 then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_primal_beast_onslaught_custom_slow",
		{ duration = self.talents.q2_duration }
	)
end

function primal_beast_onslaught_custom:ReduceCd()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_q4 == 0 then
		return
	end
	if self.talents.has_e7 == 0 then
		return
	end
	if self.caster:HasModifier("modifier_primal_beast_onslaught_custom_cast") then
		return
	end

	self.caster:CdAbility(
		self,
		self:GetCooldownTimeRemaining() * self.talents.q4_cd,
		nil,
		"modifier_primal_beast_onslaught_4"
	)
end

function primal_beast_onslaught_custom:UpdateUI()
	if not IsServer() then
		return
	end
	if self.talents.has_q7 ~= 1 then
		return
	end
	if self.talents.has_r7 == 1 then
		return
	end

	local stack = 0

	if IsValid(self.current_target) then
		local mod = self.current_target:FindModifierByName("modifier_primal_beast_onslaught_custom_stack")

		if mod then
			stack = mod:GetStackCount()
		end
	end

	self.caster:UpdateUIlong({ stack = stack, override_stack = stack, priority = 0, style = "BeastQuake" })
end

function primal_beast_onslaught_custom:HitEffect(target, origin, crit)
	local vec = target:GetAbsOrigin() - origin
	vec.z = 0
	vec = vec:Normalized()
	local particle =
		ParticleManager:CreateParticle("particles/primal_beast/onslaught_hit.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlForward(particle, 2, vec)
	ParticleManager:SetParticleControl(particle, 5, origin)
	ParticleManager:SetParticleControlForward(particle, 5, vec)
	if crit then
		ParticleManager:SetParticleControl(particle, 6, Vector(1, 0, 0))
	end
	ParticleManager:ReleaseParticleIndex(particle)
end

modifier_primal_beast_onslaught_custom_tracker = class(mod_hidden)
function modifier_primal_beast_onslaught_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.records = {}
	self.ability:UpdateTalents()

	self.parent.onslaught_ability = self.ability

	self.ability.charge_speed = self.ability:GetSpecialValueFor("charge_speed")
	self.ability.chargeup_time = self.ability:GetSpecialValueFor("chargeup_time")
	self.ability.knockback_radius = self.ability:GetSpecialValueFor("knockback_radius")
	self.ability.max_distance = self.ability:GetSpecialValueFor("max_distance")
	self.ability.vision_radius = self.ability:GetSpecialValueFor("vision_radius")
	self.ability.knockback_distance = self.ability:GetSpecialValueFor("knockback_distance")
	self.ability.knockback_damage = self.ability:GetSpecialValueFor("knockback_damage")
	self.ability.attack_damage = self.ability:GetSpecialValueFor("attack_damage") / 100
	self.ability.knockback_duration = self.ability:GetSpecialValueFor("knockback_duration")
	self.ability.turn_rate = self.ability:GetSpecialValueFor("turn_rate")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
	self.ability.shard_damage = self.ability:GetSpecialValueFor("shard_damage")
end

function modifier_primal_beast_onslaught_custom_tracker:OnRefresh()
	self.ability.knockback_damage = self.ability:GetSpecialValueFor("knockback_damage")
	self.ability.attack_damage = self.ability:GetSpecialValueFor("attack_damage") / 100
	self.ability.stun_duration = self.ability:GetSpecialValueFor("stun_duration")
end

function modifier_primal_beast_onslaught_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_primal_beast_onslaught_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.beast_q7 then
		return
	end
	if not params.target then
		return
	end
	return (
		self.ability.talents.q7_damage
		+ self.ability.talents.q7_damage_inc
			* params.target:GetModifierStackCount("modifier_primal_beast_onslaught_custom_stack", self.parent)
	)
			* (1 + self.ability.talents.q1_quake)
			* (1 + (params.target:IsCreep() and self.ability.talents.q7_creeps or 0))
		- 100
end

function modifier_primal_beast_onslaught_custom_tracker:GetCritChance()
	if self.ability.talents.has_q3 == 0 then
		return 0
	end
	if self.ability.talents.has_q7 == 1 then
		return 0
	end
	return 100 / self.ability.talents.q3_count
end

function modifier_primal_beast_onslaught_custom_tracker:GetCritDamage()
	if self.ability.talents.has_q3 == 0 then
		return
	end
	return self.ability.talents.q3_crit
end

function modifier_primal_beast_onslaught_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q3 == 0 then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if self.ability.talents.has_q7 == 1 and not self.parent.beast_q3 then
		return
	end
	if self.ability.talents.has_q7 == 0 and params.no_attack_cooldown then
		return
	end
	if
		self.ability.talents.has_q7 == 0
		and self.parent:GetModifierStackCount("modifier_primal_beast_onslaught_custom_count", self.parent)
			< self.ability.talents.q3_count - 1
	then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_primal_beast_onslaught_custom_tracker:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	if not self.records[params.record] then
		return
	end
	self.records[params.record] = nil
end

function modifier_primal_beast_onslaught_custom_tracker:GetProcChance()
	return 100
end

function modifier_primal_beast_onslaught_custom_tracker:DamageProc(params, name)
	local target = params.target

	if not self.records[params.record] then
		if self.ability.talents.has_q7 == 1 then
			return
		end
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_primal_beast_onslaught_custom_count",
			{ duration = self.ability.talents.q3_count_duration }
		)
		return
	end

	target:EmitSound("DOTA_Item.Daedelus.Crit")
	self.parent:RemoveModifierByName("modifier_primal_beast_onslaught_custom_count")
	self.parent:LogProc("modifier_primal_beast_onslaught_3", params.damage, target)

	if self.ability.talents.has_q7 == 0 then
		self.ability:HitEffect(
			target,
			self.parent:GetAttachmentOrigin(self.parent:ScriptLookupAttachment("attach_hitloc")),
			true
		)
	end
end

modifier_primal_beast_onslaught_custom_cast = class(mod_visible)
function modifier_primal_beast_onslaught_custom_cast:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.turn_speed = self.ability:GetTurnRate()
	self.max_time = self.ability:GetChargeTime()

	if not IsServer() then
		return
	end
	self.parent:AddOrderEvent(self)
	self.parent:AddOrderFilter(self)
	self.ability:EndCd(0.3)
	AddFOWViewer(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		self.ability.vision_radius,
		self.max_time,
		false
	)

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_primal_beast_onslaught",
		{ state = 1, range = self.ability:GetMaxDistance(), radius = self.ability:GetKnockbackRadius() / 1.4 }
	)

	self.anim_return = 0
	self.target_angle = self.parent:GetAnglesAsVector().y
	self.current_angle = self.target_angle
	self.face_target = true
	self.charge_finish = false
	self.shard = self.parent:HasShard()
	self.interval = FrameTime()

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)

	local effect_cast = ParticleManager:CreateParticle(
		wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_chargeup.vpcf",
			self.ability
		),
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	if self.shard then
		local particle = self.parent:GenericParticle("particles/primal_beast/onslaught_shard.vpcf", self)
		ParticleManager:SetParticleControl(particle, 5, Vector(self.parent:GetModelScale(), 0, 0))
	end

	self.parent:EmitSound("Hero_PrimalBeast.Onslaught.Channel")
end

function modifier_primal_beast_onslaught_custom_cast:OnDestroy()
	if not IsServer() then
		return
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_primal_beast_onslaught",
		{ state = 2 }
	)

	if self.ability.talents.has_q7 == 1 then
		self.parent:UpdateUIshort({
			hide = 1,
			dots = self.ability.talents.q7_duration,
			priority = 0,
			style = "BeastCharge",
		})
	end

	self.ability:StartCd()
	self.parent:StopSound("Hero_PrimalBeast.Onslaught.Channel")
	self.parent:RemoveGesture(ACT_DOTA_CAST_ABILITY_2)

	if self.charge_finish then
		return
	end
	self.ability:OnChargeFinish(false, self:GetRemainingTime() <= 0.03)
end

function modifier_primal_beast_onslaught_custom_cast:OrderEvent(params)
	if
		params.order_type == DOTA_UNIT_ORDER_MOVE_TO_POSITION
		or params.order_type == DOTA_UNIT_ORDER_MOVE_TO_DIRECTION
	then
		self:SetDirection(params.pos)
	elseif
		(params.order_type == DOTA_UNIT_ORDER_MOVE_TO_TARGET or params.order_type == DOTA_UNIT_ORDER_ATTACK_TARGET)
		and params.target
	then
		self:SetDirection(params.target:GetOrigin())
	elseif params.order_type == DOTA_UNIT_ORDER_STOP or params.order_type == DOTA_UNIT_ORDER_HOLD_POSITION then
		if not self.charge_finish then
			self.ability:OnChargeFinish(false, false)
		end
	end
end

function modifier_primal_beast_onslaught_custom_cast:OrderFilter(params)
	if
		params.order_type ~= DOTA_UNIT_ORDER_CAST_POSITION
		and params.order_type ~= DOTA_UNIT_ORDER_CAST_NO_TARGET
		and params.order_type ~= DOTA_UNIT_ORDER_CAST_TARGET
	then
		return
	end
	if not params.ability then
		return
	end
	if bit.band(params.ability:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES) == 0 then
		return
	end

	return false
end

function modifier_primal_beast_onslaught_custom_cast:SetDirection(location)
	local dir = ((location - self.parent:GetOrigin()) * Vector(1, 1, 0)):Normalized()
	self.target_angle = VectorToAngles(dir).y
	self.face_target = false
end

function modifier_primal_beast_onslaught_custom_cast:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_primal_beast_onslaught_custom_cast:GetModifierMoveSpeed_Limit()
	return 0.1
end

function modifier_primal_beast_onslaught_custom_cast:GetModifierDisableTurning()
	return 1
end

function modifier_primal_beast_onslaught_custom_cast:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_primal_beast_onslaught_custom_cast:GetModifierIncomingDamage_Percentage()
	if not self.shard then
		return
	end
	return self.ability.shard_damage
end

function modifier_primal_beast_onslaught_custom_cast:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_primal_beast_onslaught_custom_cast:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.anim_return = self.anim_return + self.interval
	if self.anim_return >= 1 then
		self.anim_return = 0
		self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	end

	if self.ability.talents.has_q7 == 1 and not self.charge_finish then
		self.parent:UpdateUIshort({
			max_time = self.max_time,
			time = self:GetElapsedTime(),
			dots = self.ability.talents.q7_duration,
			priority = 0,
			style = "BeastCharge",
		})
	end

	if
		not self.shard
		and (self.parent:IsRooted() or self.parent:IsStunned() or self.parent:IsHexed() or self.parent:IsLeashed())
		and not self.charge_finish
	then
		self.ability:OnChargeFinish(true, false)
	end

	if not self.face_target and not self.parent:IsStunned() and not self.parent:IsHexed() then
		local angle_diff = AngleDiff(self.current_angle, self.target_angle)
		local turn_speed = self.turn_speed * self.interval
		local sign = angle_diff < 0 and 1 or -1

		if math.abs(angle_diff) < 1.1 * turn_speed then
			self.current_angle = self.target_angle
			self.face_target = true
		else
			self.current_angle = self.current_angle + sign * turn_speed
		end

		local angles = self.parent:GetAnglesAsVector()
		self.parent:SetLocalAngles(angles.x, self.current_angle, angles.z)
	end
end

modifier_primal_beast_onslaught_custom = class(mod_hidden)
function modifier_primal_beast_onslaught_custom:GetEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		self.ability
	)
end
function modifier_primal_beast_onslaught_custom:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_primal_beast_onslaught_custom:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.turn_speed = self.ability:GetTurnRate()
	self.radius = self.ability:GetKnockbackRadius()
	self.tree_radius = 100

	if not IsServer() then
		return
	end
	self.parent:AddOrderEvent(self)

	self.speed = self.ability:GetChargeSpeed()
	self.max = params.max
	self.charge = math.min(self.ability.talents.q7_duration, math.max(0, params.charge))

	self.target_angle = self.parent:GetAnglesAsVector().y
	self.current_angle = self.target_angle
	self.face_target = true

	self.knockback_units = {}
	self.knockback_units[self.parent] = true

	self.damageTable = {
		attacker = self.parent,
		damage = self.ability:GetDamage(),
		damage_type = DAMAGE_TYPE_PHYSICAL,
		ability = self.ability,
	}

	self.shard = self.parent:HasShard()

	if self.shard then
		self.parent:Purge(false, true, false, true, true)
		self.immune_mod = self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self:GetDuration(), magic_damage = 0 }
		)
		self:SetPriority(DOTA_MOTION_CONTROLLER_PRIORITY_HIGHEST)
	end

	if self:ApplyHorizontalMotionController() then
		return
	end
	self:Destroy()
end

function modifier_primal_beast_onslaught_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self:ApplyHorizontalMotionController() then
		return
	end
	self:StartIntervalThink(-1)
end

function modifier_primal_beast_onslaught_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.immune_mod) then
		self.immune_mod:Destroy()
	end

	self.parent:RemoveHorizontalMotionController(self)
	self.parent:FacePoint()

	FindClearSpaceForUnit(self.parent, self.parent:GetOrigin(), false)

	if self.ability.talents.has_h1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_primal_beast_onslaught_custom_move",
			{ duration = self.ability.talents.h1_duration }
		)
	end

	self:CreateQuake(self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * 100)
end

function modifier_primal_beast_onslaught_custom:CreateQuake(point)
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.charge < 1 then
		return
	end
	if self.quake then
		return
	end

	self.quake = true
	self.parent:LogProc("modifier_primal_beast_onslaught_7", self.charge)
	CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_primal_beast_onslaught_custom_thinker",
		{ max = self.charge },
		point,
		self.parent:GetTeamNumber(),
		false
	)
end

function modifier_primal_beast_onslaught_custom:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_primal_beast_onslaught_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_primal_beast_onslaught_custom:GetModifierDisableTurning()
	return 1
end

function modifier_primal_beast_onslaught_custom:GetOverrideAnimation()
	return ACT_DOTA_RUN
end

function modifier_primal_beast_onslaught_custom:GetActivityTranslationModifiers()
	return "onslaught_movement"
end

function modifier_primal_beast_onslaught_custom:GetModifierIncomingDamage_Percentage()
	if not self.shard then
		return
	end
	return self.ability.shard_damage
end

function modifier_primal_beast_onslaught_custom:OrderEvent(params)
	if self:GetElapsedTime() <= 0.1 then
		return
	end

	if
		params.order_type == DOTA_UNIT_ORDER_MOVE_TO_POSITION
		or params.order_type == DOTA_UNIT_ORDER_MOVE_TO_DIRECTION
	then
		self:SetDirection(params.pos)
	elseif
		(params.order_type == DOTA_UNIT_ORDER_MOVE_TO_TARGET or params.order_type == DOTA_UNIT_ORDER_ATTACK_TARGET)
		and params.target
	then
		self:SetDirection(params.target:GetOrigin())
	elseif
		params.order_type == DOTA_UNIT_ORDER_STOP
		or params.order_type == DOTA_UNIT_ORDER_CAST_TARGET
		or params.order_type == DOTA_UNIT_ORDER_CAST_POSITION
		or params.order_type == DOTA_UNIT_ORDER_HOLD_POSITION
	then
		self:Destroy()
	end
end

function modifier_primal_beast_onslaught_custom:SetDirection(location)
	local dir = ((location - self.parent:GetOrigin()) * Vector(1, 1, 0)):Normalized()
	self.target_angle = VectorToAngles(dir).y
	self.face_target = false
end

function modifier_primal_beast_onslaught_custom:UpdateHorizontalMotion(me, dt)
	if self.parent:IsChanneling() or (not self.shard and (self.parent:IsStunned() or self.parent:IsHexed())) then
		self:Destroy()
		return
	end

	if not self.shard and (self.parent:IsRooted() or self.parent:IsLeashed()) then
		return
	end

	GridNav:DestroyTreesAroundPoint(self.parent:GetOrigin(), self.tree_radius, false)

	for _, unit in pairs(self.parent:FindTargets(self.radius)) do
		if not self.knockback_units[unit] then
			self.knockback_units[unit] = true
			self.damageTable.victim = unit

			if self.ability.talents.has_q7 == 1 and not self.hit and IsValid(self.parent.uproar_ability) then
				self.hit = true
				self.parent.uproar_ability:ProcStrength(true)
			end

			if unit:IsValidKill(self.parent) and self.max == 1 and self.parent:GetQuest() == "Beast.Quest_5" then
				self.parent:UpdateQuest(1)
			end

			DoDamage(self.damageTable)

			local stun = (
				self.ability.stun_duration + (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_stun or 0)
			) * (1 - unit:GetStatusResistance())
			if self.ability.talents.has_q4 == 1 and unit:IsDebuffImmune() then
				stun = stun * (1 + self.ability.talents.q4_stun)
			end
			unit:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(self.ability, self.ability.talents.has_q4 == 1),
				"modifier_generic_stun",
				{ duration = stun }
			)

			if self.ability.talents.has_q3 == 1 then
				unit:AddNewModifier(
					self.parent,
					self.parent:BkbAbility(self.ability, true),
					"modifier_primal_beast_onslaught_custom_armor",
					{ duration = self.ability.talents.q3_duration }
				)
			end

			self.ability:ProcSlow(unit)

			local point = unit:GetAbsOrigin()

			if not unit:IsCurrentlyHorizontalMotionControlled() and not unit:IsCurrentlyVerticalMotionControlled() then
				local origin = self.parent:GetOrigin()

				local knockback = unit:AddNewModifier(
					self.parent,
					self.parent:BkbAbility(self.ability, self.ability.talents.has_q4 == 1),
					"modifier_knockback",
					{
						center_x = origin.x,
						center_y = origin.y,
						center_z = origin.z,
						duration = self.ability.knockback_duration,
						knockback_duration = self.ability.knockback_duration,
						knockback_distance = self.ability.knockback_distance,
						knockback_height = 50,
					}
				)

				if IsValid(knockback) then
					point = GetGroundPosition(
						point + ((point - origin) * Vector(1, 1, 0)):Normalized() * self.ability.knockback_distance,
						nil
					)
				end
			end

			if unit:IsRealHero() then
				self:CreateQuake(point)
			end

			local effect_cast = ParticleManager:CreateParticle(
				wearables_system:GetParticleReplacementAbility(
					self.parent,
					"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_impact.vpcf",
					self.ability
				),
				PATTACH_ABSORIGIN_FOLLOW,
				unit
			)
			ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
			ParticleManager:ReleaseParticleIndex(effect_cast)
			unit:EmitSound("Hero_PrimalBeast.Onslaught.Hit")
		end
	end

	if not self.face_target then
		local angle_diff = AngleDiff(self.current_angle, self.target_angle)
		local turn_speed = self.turn_speed * dt
		local sign = angle_diff < 0 and 1 or -1

		if math.abs(angle_diff) < 1.1 * turn_speed then
			self.current_angle = self.target_angle
			self.face_target = true
		else
			self.current_angle = self.current_angle + sign * turn_speed
		end

		local angles = self.parent:GetAnglesAsVector()
		self.parent:SetLocalAngles(angles.x, self.current_angle, angles.z)
	end

	me:SetOrigin(me:GetOrigin() + me:GetForwardVector() * self.speed * dt)
end

function modifier_primal_beast_onslaught_custom:OnHorizontalMotionInterrupted()
	if not self.shard then
		self:Destroy()
		return
	end

	self:StartIntervalThink(FrameTime())
end

modifier_primal_beast_onslaught_custom_thinker = class(mod_hidden)
function modifier_primal_beast_onslaught_custom_thinker:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = params.max
	self.radius = self.ability.talents.q7_radius
	self.interval = self.ability:GetQuakeInterval()
	self.origin = self.parent:GetAbsOrigin()

	local effect_cast =
		ParticleManager:CreateParticle("particles/primal_beast/beast_quake.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.origin)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, 0, 0))
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self:Preview()
	self:StartIntervalThink(self.interval)
end

function modifier_primal_beast_onslaught_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	ParticleManager:DestroyParticle(self.preview, false)
	ParticleManager:ReleaseParticleIndex(self.preview)

	if not IsValid(self.caster) then
		self:Destroy()
		return
	end

	self:IncrementStackCount()

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_pulverize_hit.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.origin)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:DestroyParticle(effect_cast, false)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	EmitSoundOnLocationWithCaster(self.origin, "Hero_PrimalBeast.Pulverize.Impact", self.caster)

	self.caster.beast_q3 = self.ability.talents.has_q3 == 1
		and self:GetStackCount() % self.ability.talents.q3_count == 0

	local enemies = self.caster:FindTargets(self.radius, self.origin)
	for _, enemy in pairs(enemies) do
		self.caster.beast_q7 = true
		self.caster:PerformAttack(enemy, true, true, true, true, false, false, true, { damage = "beast_q7" }, true)
		self.caster.beast_q7 = false

		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_primal_beast_onslaught_custom_stack",
			{ duration = self.ability.talents.q7_stack_duration }
		)
		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_primal_beast_onslaught_custom_quake_slow",
			{ duration = self.ability.talents.q7_slow_duration }
		)

		if enemy:IsRealHero() then
			self.ability.current_target = enemy
		end

		self.ability:HitEffect(enemy, self.origin, self.caster.beast_q3)
	end

	self.caster.beast_q3 = false
	self.ability:UpdateUI()

	if #enemies > 0 and IsValid(self.caster.uproar_ability) then
		self.caster.uproar_ability:ProcStrength(true)
	end

	if self:GetStackCount() >= self.max then
		self:Destroy()
		return
	end

	self.interval = self.ability:GetQuakeInterval()
	self:Preview()
	self:StartIntervalThink(self.interval)
end

function modifier_primal_beast_onslaught_custom_thinker:Preview()
	self.preview = ParticleManager:CreateParticle("particles/generic/red_zone.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.preview, 0, self.origin)
	ParticleManager:SetParticleControl(self.preview, 1, Vector(self.radius, 0, -self.radius / self.interval))
	ParticleManager:SetParticleControl(self.preview, 2, Vector(self.interval, 0, 0))
	self:AddParticle(self.preview, false, false, -1, false, false)
end

modifier_primal_beast_onslaught_custom_stack = class(mod_visible)
function modifier_primal_beast_onslaught_custom_stack:GetTexture()
	return "primal_beast_onslaught"
end
function modifier_primal_beast_onslaught_custom_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.max = self.ability.talents.q7_max
	self.particle = self.parent:GenericParticle("particles/primal_beast/beast_quake_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_primal_beast_onslaught_custom_stack:OnRefresh()
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

	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
end

function modifier_primal_beast_onslaught_custom_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.current_target ~= self.parent then
		return
	end

	self.ability.current_target = nil
	self.ability:UpdateUI()
end

function modifier_primal_beast_onslaught_custom_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_primal_beast_onslaught_custom_stack:OnTooltip()
	return self.ability.talents.q7_damage_inc * self:GetStackCount()
end

modifier_primal_beast_onslaught_custom_quake_slow = class(mod_hidden)
function modifier_primal_beast_onslaught_custom_quake_slow:IsPurgable()
	return true
end
function modifier_primal_beast_onslaught_custom_quake_slow:GetEffectName()
	return "particles/lina/lina_attack_slow.vpcf"
end
function modifier_primal_beast_onslaught_custom_quake_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.q7_slow
end

function modifier_primal_beast_onslaught_custom_quake_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_primal_beast_onslaught_custom_quake_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_primal_beast_onslaught_custom_damage = class(mod_visible)
function modifier_primal_beast_onslaught_custom_damage:GetTexture()
	return "buffs/primal_beast/onslaught_1"
end
function modifier_primal_beast_onslaught_custom_damage:OnCreated(params)
	if IsServer() then
		self.RemoveForDuel = true
		self:SetStackCount(params.stack)
	end

	self.damage = self:GetStackCount()
end

function modifier_primal_beast_onslaught_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_primal_beast_onslaught_custom_damage:GetModifierPreAttack_BonusDamage()
	return self.damage
end

modifier_primal_beast_onslaught_custom_slow = class(mod_hidden)
function modifier_primal_beast_onslaught_custom_slow:IsPurgable()
	return true
end
function modifier_primal_beast_onslaught_custom_slow:GetEffectName()
	return "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf"
end
function modifier_primal_beast_onslaught_custom_slow:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_primal_beast_onslaught_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_snapfire_slow.vpcf"
end
function modifier_primal_beast_onslaught_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_primal_beast_onslaught_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.q2_slow
end

function modifier_primal_beast_onslaught_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_primal_beast_onslaught_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_primal_beast_onslaught_custom_armor = class(mod_visible)
function modifier_primal_beast_onslaught_custom_armor:GetTexture()
	return "buffs/primal_beast/onslaught_3"
end
function modifier_primal_beast_onslaught_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.onslaught_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.max = self.ability.talents.q3_max
	self.base = self.ability.talents.q3_base

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.armor = 0

	if not self.parent:IsCreep() then
		self.armor = self.parent:GetArmor(self) * self.ability.talents.q3_armor
	end

	self.caster:LogWatch("modifier_primal_beast_onslaught_3", self, "GetModifierPhysicalArmorBonus", self.parent)
	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()
	self:OnRefresh()
end

function modifier_primal_beast_onslaught_custom_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() < self.max then
		return
	end
	self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
	self.parent:EmitSound("PBeast.Onslaught_armor")
end

function modifier_primal_beast_onslaught_custom_armor:AddCustomTransmitterData()
	return {
		armor = self.armor,
	}
end

function modifier_primal_beast_onslaught_custom_armor:HandleCustomTransmitterData(data)
	self.armor = data.armor
end

function modifier_primal_beast_onslaught_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_primal_beast_onslaught_custom_armor:GetModifierPhysicalArmorBonus()
	if not self.armor then
		return
	end
	return (self.base + self.armor) * self:GetStackCount()
end

modifier_primal_beast_onslaught_custom_count = class(mod_visible)
function modifier_primal_beast_onslaught_custom_count:GetTexture()
	return "buffs/primal_beast/onslaught_3"
end
function modifier_primal_beast_onslaught_custom_count:OnCreated()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.q3_count

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_primal_beast_onslaught_custom_count:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_primal_beast_onslaught_custom_count:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_primal_beast_onslaught_custom_count:OnTooltip()
	return self.max
end

modifier_primal_beast_onslaught_custom_move = class(mod_hidden)
function modifier_primal_beast_onslaught_custom_move:GetEffectName()
	return "particles/generic_gameplay/rune_haste_owner.vpcf"
end
function modifier_primal_beast_onslaught_custom_move:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end