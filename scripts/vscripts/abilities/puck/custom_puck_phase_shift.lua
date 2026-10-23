--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_puck_phase_shift",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_tracker",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_lethal",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_hero_5"
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_lethal_cd",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_armor",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_hero_2"
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_bonus",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_puck_shift_1", "modifier_puck_shift_2" }
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_stats",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_shift_3"
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_slow",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_shift_4"
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_speed",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_shift_4"
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_turn",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_autocast",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_puck_phase_shift_mark",
	"abilities/puck/custom_puck_phase_shift",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_shift_7"
)

custom_puck_phase_shift = class({})
custom_puck_phase_shift.talents = {}

function custom_puck_phase_shift:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/puck/puck_phase_shift.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_puck/puck_phase_shift.vpcf", context)
	PrecacheResource("particle", "particles/puck/puck_resist.vpcf", context)
	PrecacheResource("particle", "particles/puck/shift_shield.vpcf", context)
	PrecacheResource("particle", "particles/puck/shift_lethal.vpcf", context)
	PrecacheResource("particle", "particles/puck/shift_proj.vpcf", context)
	PrecacheResource("particle", "particles/puck/shift_proc.vpcf", context)
	PrecacheResource("particle", "particles/puck/shift_alert.vpcf", context)
	PrecacheResource("particle", "particles/puck/shift_max.vpcf", context)
	PrecacheResource("particle", "particles/puck/puck_orb_slow.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_magic_stack.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/puck/rift_blint_end.vpcf", context)
end

function custom_puck_phase_shift:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_damage_shift = 0,
			e1_mark_damage = 0,
			e1_mark_inc = 0,
			e1_duration = caster:GetTalentValue("modifier_puck_shift_1", "duration", true),
			e1_mark_max = caster:GetTalentValue("modifier_puck_shift_1", "mark_max", true),

			has_e2 = 0,
			e2_range = 0,
			e2_cd = 0,
			e2_duration = caster:GetTalentValue("modifier_puck_shift_2", "duration", true),

			has_e3 = 0,
			e3_stats = 0,
			e3_bva = 0,
			e3_bonus = caster:GetTalentValue("modifier_puck_shift_3", "bonus", true),
			e3_max = caster:GetTalentValue("modifier_puck_shift_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_puck_shift_3", "duration", true),
			e3_duration_creeps = caster:GetTalentValue("modifier_puck_shift_3", "duration_creeps", true),

			has_e4 = 0,
			e4_slow = caster:GetTalentValue("modifier_puck_shift_4", "slow", true),
			e4_move = caster:GetTalentValue("modifier_puck_shift_4", "move", true),
			e4_max = caster:GetTalentValue("modifier_puck_shift_4", "max", true),
			e4_range = caster:GetTalentValue("modifier_puck_shift_4", "range", true),
			e4_duration = caster:GetTalentValue("modifier_puck_shift_4", "duration", true),
			e4_legendary_duration = caster:GetTalentValue("modifier_puck_shift_4", "legendary_duration", true),

			has_e7 = 0,
			e7_damage_reduce = caster:GetTalentValue("modifier_puck_shift_7", "damage_reduce", true),
			e7_status = caster:GetTalentValue("modifier_puck_shift_7", "status", true),
			e7_attack = caster:GetTalentValue("modifier_puck_shift_7", "attack", true),
			e7_damage = caster:GetTalentValue("modifier_puck_shift_7", "damage", true),
			e7_int = caster:GetTalentValue("modifier_puck_shift_7", "int", true) / 100,
			e7_radius = caster:GetTalentValue("modifier_puck_shift_7", "radius", true),
			e7_heal = caster:GetTalentValue("modifier_puck_shift_7", "heal", true) / 100,
			e7_duration = caster:GetTalentValue("modifier_puck_shift_7", "duration", true),
			e7_slow = caster:GetTalentValue("modifier_puck_shift_7", "slow", true),

			r2_heal = 0,
			r2_bonus = caster:GetTalentValue("modifier_puck_coil_2", "bonus", true),

			has_r3 = 0,
			r3_crit = 0,
			r3_crit_chance = caster:GetTalentValue("modifier_puck_coil_3", "crit_chance", true),

			has_r7 = 0,

			has_h2 = 0,
			h2_armor = 0,

			has_h5 = 0,
			h5_shield = caster:GetTalentValue("modifier_puck_hero_5", "shield", true),
			h5_shield_max = caster:GetTalentValue("modifier_puck_hero_5", "shield_max", true) / 100,
			h5_duration = caster:GetTalentValue("modifier_puck_hero_5", "duration", true),
			h5_lethal_duration = caster:GetTalentValue("modifier_puck_hero_5", "lethal_duration", true),
			h5_lethal_shield = caster:GetTalentValue("modifier_puck_hero_5", "lethal_shield", true) / 100,
			h5_talent_cd = caster:GetTalentValue("modifier_puck_hero_5", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_puck_shift_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_puck_shift_1", "damage")
		self.talents.e1_damage_shift = caster:GetTalentValue("modifier_puck_shift_1", "damage_shift")
		self.talents.e1_mark_damage = caster:GetTalentValue("modifier_puck_shift_1", "mark_damage") / 100
		self.talents.e1_mark_inc = caster:GetTalentValue("modifier_puck_shift_1", "mark_inc") / 100
	end

	if caster:HasTalent("modifier_puck_shift_2") then
		self.talents.has_e2 = 1
		self.talents.e2_range = caster:GetTalentValue("modifier_puck_shift_2", "range")
		self.talents.e2_cd = caster:GetTalentValue("modifier_puck_shift_2", "cd")
	end

	if caster:HasTalent("modifier_puck_shift_3") then
		self.talents.has_e3 = 1
		self.talents.e3_stats = caster:GetTalentValue("modifier_puck_shift_3", "stats")
		self.talents.e3_bva = caster:GetTalentValue("modifier_puck_shift_3", "bva")
		caster:AddProc(self.tracker, { name = "hit", land = true })
	end

	if caster:HasTalent("modifier_puck_shift_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true })
		caster:AddOrderEvent(self.tracker)
	end

	if caster:HasTalent("modifier_puck_shift_7") then
		self.talents.has_e7 = 1
		caster:AddProc(self.tracker, { name = "mark" })
		caster:AddProc(self.tracker, { name = "boom" })
	end

	if caster:HasTalent("modifier_puck_coil_2") then
		self.talents.r2_heal = caster:GetTalentValue("modifier_puck_coil_2", "heal") / 100
	end

	if caster:HasTalent("modifier_puck_coil_3") then
		self.talents.has_r3 = 1
		self.talents.r3_crit = caster:GetTalentValue("modifier_puck_coil_3", "crit") / 100
	end

	if caster:HasTalent("modifier_puck_coil_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_puck_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_armor = caster:GetTalentValue("modifier_puck_hero_2", "armor")
	end

	if caster:HasTalent("modifier_puck_hero_5") then
		self.talents.has_h5 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	self.talents.e4_effect_duration = self.talents.has_r7 == 1 and self.talents.e4_legendary_duration
		or self.talents.e4_duration
end

function custom_puck_phase_shift:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_puck_phase_shift_tracker"
end

function custom_puck_phase_shift:CreateTalent()
	if self:GetAutoCastState() then
		return
	end

	self:ToggleAutoCast()
	self.caster:AddNewModifier(self.caster, self, "modifier_custom_puck_phase_shift_autocast", {})
end

function custom_puck_phase_shift:GetBehavior()
	local behavior = self.talents.has_e7 == 1 and DOTA_ABILITY_BEHAVIOR_IMMEDIATE or DOTA_ABILITY_BEHAVIOR_CHANNELLED
	if self.talents.has_e4 ~= 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + behavior
	end

	if self.caster:HasModifier("modifier_custom_puck_phase_shift_autocast") then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AUTOCAST + behavior
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_AUTOCAST + behavior
end

function custom_puck_phase_shift:GetCastRange(location, target)
	if self.talents.has_e4 == 1 then
		return IsClient() and self.talents.e4_range - self.caster:GetCastRangeBonus() or 99999
	end
	return self.BaseClass.GetCastRange(self, location, target)
end

function custom_puck_phase_shift:GetCooldown(iLevel)
	return (self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e2_cd or 0)) / self.caster:GetCooldownReduction()
end

function custom_puck_phase_shift:GetChannelTime()
	if self.talents.has_e7 == 1 then
		return 0
	end
	return self.duration or 0
end

function custom_puck_phase_shift:OnSpellStart()
	self.caster:RemoveModifierByName("modifier_custom_puck_phase_shift_turn")

	if self.caster:GetName() == "npc_dota_hero_puck" then
		self.caster:EmitSound("puck_puck_ability_phase_0" .. RandomInt(1, 7))
	end

	if
		self.talents.has_e4 == 1
		and self.caster:HasModifier("modifier_custom_puck_phase_shift_autocast")
		and self.caster:CanBlink()
	then
		local origin = self.caster:GetAbsOrigin()
		local vec = self:GetCursorPosition() - origin
		vec.z = 0
		self.caster:Teleport(
			origin + vec:Normalized() * math.min(vec:Length2D(), self.talents.e4_range),
			false,
			"particles/puck/rift_blink_start.vpcf",
			"particles/puck/rift_blint_end.vpcf",
			"Puck.Shift_blink"
		)
	end

	self.mark_series = (self.mark_series or 0) + 1
	self.shift_mod = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_puck_phase_shift",
		{ duration = self.duration + FrameTime() }
	)

	local enemies = self.caster:FindTargets(
		self.caster:Script_GetAttackRange() + self.attack_range,
		nil,
		nil,
		DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE
	)
	local hero = false

	for _, enemy in pairs(enemies) do
		hero = hero or enemy:IsHero()
		ProjectileManager:CreateTrackingProjectile({
			Target = enemy,
			Source = self.caster,
			Ability = self,
			EffectName = "particles/puck/shift_proj.vpcf",
			iMoveSpeed = self.caster:GetProjectileSpeed(),
			bDodgeable = true,
			bProvidesVision = false,
			iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		})
	end

	if #enemies == 0 then
		return
	end
	self:ProcAttack(hero, true)
end

function custom_puck_phase_shift:OnChannelFinish(interrupted)
	if not IsValid(self.shift_mod) then
		return
	end
	self.shift_mod:SetDuration(FrameTime(), true)
end

function custom_puck_phase_shift:OnProjectileHit(target, location)
	if not target then
		return
	end

	target:EmitSound("Puck.Coil_Attack_impact")
	self.caster.puck_shift_attack = true
	self.caster:PerformAttack(
		target,
		true,
		true,
		true,
		true,
		false,
		false,
		false,
		{ attack = "puck_shift", damage = "puck_shift", pre = "puck_shift" }
	)
	self.caster.puck_shift_attack = nil
end

function custom_puck_phase_shift:ProcAttack(hero, cd)
	if not self:IsTrained() then
		return
	end

	if cd and IsValid(self.caster.coil_ability) then
		self.caster.coil_ability:ProcCd()
	end

	if self.talents.has_e3 == 1 then
		local duration = hero and self.talents.e3_duration or self.talents.e3_duration_creeps
		if IsValid(self.stats_mod) then
			duration = math.max(duration, self.stats_mod:GetRemainingTime())
		end
		self.caster:AddNewModifier(self.caster, self, "modifier_custom_puck_phase_shift_stats", { duration = duration })
	end

	if self.talents.has_e4 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_puck_phase_shift_speed",
			{ duration = self.talents.e4_effect_duration }
		)
	end
end

function custom_puck_phase_shift:ShiftEffect(mod)
	self.caster:AddEffects(EF_NODRAW)
	self.caster:NoDraw(mod)

	local pos = self.caster:GetAbsOrigin()
	pos.z = pos.z + 120

	local effect_cast = ParticleManager:CreateParticle("particles/puck/puck_phase_shift.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, pos)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(35, 0, 0))
	mod:AddParticle(effect_cast, false, false, -1, false, false)
end

function custom_puck_phase_shift:ApplyShield(k, lethal)
	local max_shield = self.talents.h5_shield + self.talents.h5_shield_max * self.caster:GetMaxHealth()
	local shield = max_shield * k

	if lethal then
		max_shield = shield
	end

	if IsValid(self.shield_mod) then
		if self.shield_lethal and not lethal then
			self.shield_mod:AddShield(math.max(0, math.min(shield, max_shield - self.shield_mod.shield)))
		else
			self.shield_lethal = lethal
			self.shield_mod:AddShield(shield, max_shield)
		end

		self.shield_mod:SetDuration(self.talents.h5_duration, true)
		return
	end

	self.shield_lethal = lethal
	self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield_multiple", {
		duration = self.talents.h5_duration,
		max_shield = max_shield,
		shield_talent = "modifier_puck_hero_5",
	})

	if not self.shield_mod then
		return
	end
	self.shield_mod:AddShield(shield)
	self.shield_mod:SetReduceDamage(function(params)
		if self.talents.has_e7 == 1 and IsValid(self.shift_mod) then
			return 1 + self.talents.e7_damage_reduce / 100
		end
	end)

	local particle =
		ParticleManager:CreateParticle("particles/puck/shift_shield.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	self.shield_mod:AddParticle(particle, false, false, -1, false, false)
end

modifier_custom_puck_phase_shift_tracker = class(mod_hidden)
function modifier_custom_puck_phase_shift_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.shift_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_range = self.ability:GetSpecialValueFor("attack_range")
	self.ability.attack_damage = self.ability:GetSpecialValueFor("attack_damage")
end

function modifier_custom_puck_phase_shift_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_damage = self.ability:GetSpecialValueFor("attack_damage")
end

function modifier_custom_puck_phase_shift_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MIN_HEALTH,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_custom_puck_phase_shift_tracker:GetMinHealth()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_custom_puck_phase_shift_lethal_cd") then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	return 1
end

function modifier_custom_puck_phase_shift_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.puck_shift_attack then
		return
	end
	return self.ability.attack_damage - 100
end

function modifier_custom_puck_phase_shift_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	local shift = IsValid(self.ability.shift_mod) or params.pre_attack_flag == "puck_shift"

	if name == "mark" then
		return shift and 100 or 0
	end

	if shift then
		return 0
	end
	return params.target:HasModifier("modifier_custom_puck_phase_shift_mark") and 100 or 0
end

function modifier_custom_puck_phase_shift_tracker:AttackProc(params, name)
	local target = params.target

	if name == "hit" then
		if self.ability.talents.has_e4 == 1 then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_custom_puck_phase_shift_slow",
				{ duration = self.ability.talents.e4_effect_duration }
			)
		end
		if params.no_attack_cooldown then
			return
		end
		self.ability:ProcAttack(target:IsHero())
		return
	end

	if name == "mark" then
		if IsValid(self.ability.shift_mod) and not params.no_attack_cooldown then
			self.ability.shift_mod.attacks = (self.ability.shift_mod.attacks or 0) + 1
		end
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_puck_phase_shift_mark",
			{ duration = self.ability.talents.e7_duration }
		)
		return
	end

	local mark = target:FindModifierByName("modifier_custom_puck_phase_shift_mark")
	if not mark then
		return
	end

	if mark.series ~= self.ability.mark_series then
		mark.series = self.ability.mark_series
		mark.procs = 0
	end

	local origin = target:GetAbsOrigin()
	local crit = self.ability.talents.has_r3 == 1
		and RollPseudoRandomPercentage(self.ability.talents.r3_crit_chance, 7343, self.parent)
	local damageTable = {
		attacker = self.parent,
		damage = mark:GetDamage() * (crit and self.ability.talents.r3_crit or 1),
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
	}

	target:EmitSound("Puck.Shift_attack")
	if crit then
		target:EmitSound("DOTA_Item.Daedelus.Crit")
	end

	local effect = ParticleManager:CreateParticle("particles/puck/shift_proc.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, origin)
	ParticleManager:SetParticleControl(effect, 1, Vector(self.ability.talents.e7_radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect)

	for _, enemy in pairs(self.parent:FindTargets(self.ability.talents.e7_radius, origin)) do
		damageTable.victim = enemy
		local real_damage = DoDamage(damageTable, "modifier_puck_shift_7")

		if enemy == target then
			target:SendNumber(crit and 116 or 4, real_damage)
			local result = self.parent:CanLifesteal(target)
			if result then
				local heal = self.ability.talents.e7_heal
					+ self.ability.talents.r2_heal
						* (target:HasModifier("modifier_custom_puck_dream_coil_reduce") and self.ability.talents.r2_bonus or 1)
				self.parent:GenericHeal(
					real_damage * heal * result,
					self.ability,
					true,
					"particles/items3_fx/octarine_core_lifesteal.vpcf",
					"modifier_puck_shift_7"
				)
			end
		end
	end

	mark.procs = math.min(self.ability.talents.e1_mark_max, mark.procs + 1)

	if mark:GetStackCount() <= 1 then
		mark:Destroy()
		return
	end

	mark:DecrementStackCount()
	mark:UpdateParticle()
	mark:UpdateDamage()
end

function modifier_custom_puck_phase_shift_tracker:GetModifierPreAttack_BonusDamage()
	if self.ability.talents.has_e7 == 1 then
		return
	end
	return self.ability.talents.e1_damage
end

function modifier_custom_puck_phase_shift_tracker:GetModifierBonusStats_Strength()
	return self.ability.talents.e3_stats
end

function modifier_custom_puck_phase_shift_tracker:GetModifierBonusStats_Agility()
	return self.ability.talents.e3_stats
end

function modifier_custom_puck_phase_shift_tracker:GetModifierBonusStats_Intellect()
	return self.ability.talents.e3_stats
end

function modifier_custom_puck_phase_shift_tracker:OrderEvent(params)
	if not IsServer() then
		return
	end
	if self.parent:GetCurrentActiveAbility() == self.ability then
		return
	end

	self.parent:RemoveModifierByName("modifier_custom_puck_phase_shift_turn")

	if params.order_type ~= DOTA_UNIT_ORDER_CAST_POSITION then
		return
	end
	if params.ability ~= self.ability then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_custom_puck_phase_shift_turn", { duration = 1 })
end

function modifier_custom_puck_phase_shift_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not params.lethal_damage then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_custom_puck_phase_shift_lethal_cd") then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_puck_phase_shift_lethal_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_puck_phase_shift_lethal",
		{ duration = self.ability.talents.h5_lethal_duration }
	)
end

modifier_custom_puck_phase_shift = class(mod_visible)
function modifier_custom_puck_phase_shift:GetStatusEffectName()
	return "particles/status_fx/status_effect_dark_seer_illusion.vpcf"
end
function modifier_custom_puck_phase_shift:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_custom_puck_phase_shift:GetPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_custom_puck_phase_shift:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.legendary = self.ability.talents.has_e7 == 1

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.start_time = GameRules:GetGameTime()
	self.shield_time = self.start_time
	self.ability:EndCd()

	self.parent:EmitSound("Hero_Puck.Phase_Shift")
	ProjectileManager:ProjectileDodge(self.parent)

	if self.legendary then
		self.parent:GenericParticle("particles/puck/puck_resist.vpcf", self)
		self.parent:GenericParticle("particles/units/heroes/hero_puck/puck_phase_shift.vpcf", self)
		self.parent:GenericParticle("particles/puck/shift_alert.vpcf", self, true)
		self.max_time = self:GetRemainingTime()
	else
		self.ability:ShiftEffect(self)
	end

	self.bonus_duration = math.max(
		(self.ability.talents.has_e1 == 1 and not self.legendary) and self.ability.talents.e1_duration or 0,
		self.ability.talents.has_e2 == 1 and self.ability.talents.e2_duration or 0
	)
	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_custom_puck_phase_shift:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.legendary then
		self.parent:UpdateUIshort({
			max_time = self.max_time,
			time = self:GetRemainingTime(),
			stack = self:GetRemainingTime(),
			use_zero = 1,
			priority = 3,
			style = "PuckShift",
		})
	end

	if self.bonus_duration > 0 then
		self.bonus_mod = self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_puck_phase_shift_bonus",
			{ duration = self.bonus_duration }
		)
		self.bonus_mod:SetStackCount(self:GetBonusDamage())
	end

	if self.ability.talents.has_h5 == 0 then
		return
	end

	local time = GameRules:GetGameTime()
	if time - self.shield_time < self.interval then
		return
	end

	self.ability:ApplyShield((time - self.shield_time) / self.ability.duration)
	self.shield_time = time
end

function modifier_custom_puck_phase_shift:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveEffects(EF_NODRAW)
	self.parent:EndNoDraw(self)
	self.parent:StopSound("Hero_Puck.Phase_Shift")

	if self.legendary then
		self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 3, style = "PuckShift" })
		self.parent:LogProc("modifier_puck_shift_7", self.attacks or 0)
	end

	self.ability:StartCd()
	if not self.parent:IsAlive() then
		return
	end

	if self.parent:GetQuest() == "Puck.Quest_7" then
		self.parent:StartCd("puck_quest_7")
	end

	if self.ability.talents.has_h2 == 1 and self.ability:GetCooldownTimeRemaining() > 0 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_puck_phase_shift_armor",
			{ duration = self.ability:GetCooldownTimeRemaining() }
		)
	end

	if self.ability.talents.has_h5 == 1 then
		self.ability:ApplyShield((GameRules:GetGameTime() - self.shield_time) / self.ability.duration)
	end

	if IsValid(self.parent.innate_ability) then
		self.parent.innate_ability:ProcSpeed()
	end

	if not IsValid(self.bonus_mod) then
		return
	end
	self.bonus_mod:SetStackCount(self:GetBonusDamage())
end

function modifier_custom_puck_phase_shift:GetBonusDamage()
	if self.legendary then
		return 0
	end
	return math.floor(
		self.ability.talents.e1_damage_shift
				* math.min(1, (GameRules:GetGameTime() - self.start_time) / self.ability.duration)
			+ 0.5
	)
end

function modifier_custom_puck_phase_shift:CheckState()
	if self.legendary then
		return {
			[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		}
	end

	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_custom_puck_phase_shift:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_puck_phase_shift:GetModifierStatusResistanceStacking()
	if not self.legendary then
		return
	end
	return self.ability.talents.e7_status
end

function modifier_custom_puck_phase_shift:GetModifierIncomingDamage_Percentage()
	if not self.legendary then
		return
	end
	return self.ability.talents.e7_damage_reduce
end

function modifier_custom_puck_phase_shift:GetModifierDamageOutgoing_Percentage()
	if not self.legendary then
		return
	end
	if self.parent.puck_shift_attack then
		return
	end
	if self.parent.puck_coil_attack then
		return
	end
	return self.ability.talents.e7_attack - 100
end

function modifier_custom_puck_phase_shift:GetModifierProjectileName()
	if not self.legendary then
		return
	end
	return "particles/puck/shift_proj.vpcf"
end

function modifier_custom_puck_phase_shift:GetModifierMoveSpeedBonus_Percentage()
	if not self.legendary then
		return
	end
	return self.ability.talents.e7_slow
end

modifier_custom_puck_phase_shift_bonus = class(mod_visible)
function modifier_custom_puck_phase_shift_bonus:GetTexture()
	return self.texture
end
function modifier_custom_puck_phase_shift_bonus:OnCreated()
	self.ability = self:GetAbility()
	self.range = self.ability.talents.e2_range
	self.texture = (self.ability.talents.has_e1 == 1 and self.ability.talents.has_e7 == 0) and "buffs/puck/shift_1"
		or "buffs/puck/shift_2"

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_custom_puck_phase_shift_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_custom_puck_phase_shift_bonus:GetModifierPreAttack_BonusDamage()
	return self:GetStackCount()
end

function modifier_custom_puck_phase_shift_bonus:GetModifierAttackRangeBonus()
	return self.range
end

modifier_custom_puck_phase_shift_stats = class(mod_visible)
function modifier_custom_puck_phase_shift_stats:GetTexture()
	return "buffs/puck/shift_3"
end
function modifier_custom_puck_phase_shift_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.bva = self.ability.talents.has_r7 == 0 and self.parent:GetBaseAttackTime(false) + self.ability.talents.e3_bva
		or nil

	if IsServer() then
		self.RemoveForDuel = true
		self.ability.stats_mod = self
		self.start = GameRules:GetGameTime()
	end

	self:OnRefresh()
end

function modifier_custom_puck_phase_shift_stats:OnRefresh()
	self.stats_stack = self.ability.talents.e3_stats * (self.ability.talents.e3_bonus - 1) / self.max
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:EmitSound("Puck.Shift_max")
	self.parent:GenericParticle("particles/puck/shift_max.vpcf", self, false, { 1, 2 })
	self.parent:LogProc("modifier_puck_shift_3", GameRules:GetGameTime() - self.start)
end

function modifier_custom_puck_phase_shift_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_custom_puck_phase_shift_stats:GetModifierBonusStats_Strength()
	return self.stats_stack * self:GetStackCount()
end

function modifier_custom_puck_phase_shift_stats:GetModifierBonusStats_Agility()
	return self:GetModifierBonusStats_Strength()
end

function modifier_custom_puck_phase_shift_stats:GetModifierBonusStats_Intellect()
	return self:GetModifierBonusStats_Strength()
end

function modifier_custom_puck_phase_shift_stats:GetModifierBaseAttackTimeConstant()
	if not self.bva then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end
	return self.bva
end

modifier_custom_puck_phase_shift_slow = class(mod_hidden)
function modifier_custom_puck_phase_shift_slow:IsPurgable()
	return true
end
function modifier_custom_puck_phase_shift_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.e4_slow
	self.max = self.ability.talents.e4_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_custom_puck_phase_shift_slow:OnRefresh()
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

	self.parent:GenericParticle("particles/puck/puck_orb_slow.vpcf", self)
end

function modifier_custom_puck_phase_shift_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_puck_phase_shift_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * self:GetStackCount()
end

modifier_custom_puck_phase_shift_speed = class(mod_visible)
function modifier_custom_puck_phase_shift_speed:GetTexture()
	return "buffs/puck/shift_4"
end
function modifier_custom_puck_phase_shift_speed:OnCreated()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.e4_move
	self.max = self.ability.talents.e4_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_custom_puck_phase_shift_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_custom_puck_phase_shift_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_puck_phase_shift_speed:GetModifierMoveSpeedBonus_Constant()
	return self.move * self:GetStackCount()
end

modifier_custom_puck_phase_shift_turn = class(mod_hidden)
function modifier_custom_puck_phase_shift_turn:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_custom_puck_phase_shift_turn:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_custom_puck_phase_shift_turn:GetModifierDisableTurning()
	return 1
end

modifier_custom_puck_phase_shift_autocast = class(mod_hidden)
function modifier_custom_puck_phase_shift_autocast:RemoveOnDeath()
	return false
end

modifier_custom_puck_phase_shift_mark = class(mod_visible)
function modifier_custom_puck_phase_shift_mark:GetTexture()
	return "puck_phase_shift"
end
function modifier_custom_puck_phase_shift_mark:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:SetHasCustomTransmitterData(true)
	self.particle = self.parent:GenericParticle("particles/puck/rift_magic_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_custom_puck_phase_shift_mark:OnRefresh()
	if not IsServer() then
		return
	end
	self.procs = 0
	self.series = self.ability.mark_series
	self:IncrementStackCount()
	self:UpdateParticle()
	self:UpdateDamage()
end

function modifier_custom_puck_phase_shift_mark:UpdateParticle()
	local stack = self:GetStackCount()
	local double = math.floor(stack / 10)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, stack, stack - double * 10))
end

function modifier_custom_puck_phase_shift_mark:GetDamage()
	return (self.ability.talents.e7_damage + self.ability.talents.e7_int * self.caster:GetIntellect(false))
		* (
			1
			+ self.ability.talents.e1_mark_damage
			+ self.ability.talents.e1_mark_inc * self.procs / self.ability.talents.e1_mark_max
		)
end

function modifier_custom_puck_phase_shift_mark:UpdateDamage()
	self.damage = self:GetDamage()
	self:SendBuffRefreshToClients()
end

function modifier_custom_puck_phase_shift_mark:AddCustomTransmitterData()
	return {
		damage = self.damage,
	}
end

function modifier_custom_puck_phase_shift_mark:HandleCustomTransmitterData(data)
	self.damage = data.damage
end

function modifier_custom_puck_phase_shift_mark:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_custom_puck_phase_shift_mark:OnTooltip()
	return self.damage
end

modifier_custom_puck_phase_shift_lethal = class(mod_visible)
function modifier_custom_puck_phase_shift_lethal:GetTexture()
	return "buffs/puck/hero_5"
end
function modifier_custom_puck_phase_shift_lethal:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	if IsValid(self.ability.shift_mod) then
		self.ability.shift_mod:Destroy()
	end

	self.parent:EmitSound("Hero_Puck.Phase_Shift")
	ProjectileManager:ProjectileDodge(self.parent)
	self.ability:ShiftEffect(self)

	local effect = ParticleManager:CreateParticle("particles/puck/shift_lethal.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect, 1, Vector(130, 0, 0))
	self:AddParticle(effect, false, false, -1, false, false)
end

function modifier_custom_puck_phase_shift_lethal:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveEffects(EF_NODRAW)
	self.parent:EndNoDraw(self)
	self.parent:StopSound("Hero_Puck.Phase_Shift")

	if not self.parent:IsAlive() then
		return
	end
	self.ability:ApplyShield(self.ability.talents.h5_lethal_shield, true)
end

function modifier_custom_puck_phase_shift_lethal:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_custom_puck_phase_shift_lethal_cd = class(mod_cd)
function modifier_custom_puck_phase_shift_lethal_cd:GetTexture()
	return "buffs/puck/hero_5"
end

modifier_custom_puck_phase_shift_armor = class(mod_hidden)
function modifier_custom_puck_phase_shift_armor:OnCreated()
	self.ability = self:GetAbility()
	self.armor = self.ability.talents.h2_armor

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_custom_puck_phase_shift_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_custom_puck_phase_shift_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end