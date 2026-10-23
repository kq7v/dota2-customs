--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_marci_unleash_custom", "abilities/marci/marci_unleash_custom", LUA_MODIFIER_MOTION_NONE, true)
LinkLuaModifier("modifier_marci_unleash_custom_fury", "abilities/marci/marci_unleash_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_marci_unleash_custom_debuff",
	"abilities/marci/marci_unleash_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_unleash_custom_recovery",
	"abilities/marci/marci_unleash_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_unleash_custom_tracker",
	"abilities/marci/marci_unleash_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_marci_unleash_custom_stack",
	"abilities/marci/marci_unleash_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_unleash_3"
)
LinkLuaModifier(
	"modifier_marci_unleash_custom_stats",
	"abilities/marci/marci_unleash_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_marci_unleash_1"
)
LinkLuaModifier("modifier_marci_unleash_custom_invun", "abilities/marci/marci_unleash_custom", LUA_MODIFIER_MOTION_NONE)

marci_unleash_custom = class({})
marci_unleash_custom.talents = {}

function marci_unleash_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_pulse.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_pulse_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_buff.vpcf", context)
	PrecacheResource("particle", "particles/marci/unleash_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_attack.vpcf", context)
	PrecacheResource("particle", "particles/marci/marci_count.vpcf", context)
	PrecacheResource("particle", "particles/marci/unleash_spell_caster.vpcf", context)
	PrecacheResource("particle", "particles/marci/unleash_spell_start.vpcf", context)
	PrecacheResource("particle", "particles/marci/unleash_stack_spell.vpcf", context)
	PrecacheResource("particle", "particles/marci/marci_wave.vpcf", context)
	PrecacheResource("particle", "particles/marci/marci_heal.vpcf", context)
end

function marci_unleash_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_stats_inc = 0,
			r1_max = caster:GetTalentValue("modifier_marci_unleash_1", "max", true),
			r1_duration = caster:GetTalentValue("modifier_marci_unleash_1", "duration", true),
			r1_duration_creeps = caster:GetTalentValue("modifier_marci_unleash_1", "duration_creeps", true),

			r2_slow = 0,
			r2_speed = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_damage_inc = 0,
			r3_duration = caster:GetTalentValue("modifier_marci_unleash_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_marci_unleash_3", "max", true),
			r3_radius = caster:GetTalentValue("modifier_marci_unleash_3", "radius", true),
			r3_chance = caster:GetTalentValue("modifier_marci_unleash_3", "chance", true),

			has_r4 = 0,
			r4_stun = caster:GetTalentValue("modifier_marci_unleash_4", "stun", true),
			r4_heal = caster:GetTalentValue("modifier_marci_unleash_4", "heal", true) / 100,
			r4_range = caster:GetTalentValue("modifier_marci_unleash_4", "range", true),
			r4_talent_cd = caster:GetTalentValue("modifier_marci_unleash_4", "talent_cd", true),

			has_r7 = 0,
			r7_stack_init = caster:GetTalentValue("modifier_marci_unleash_7", "stack_init", true),
			r7_speed = caster:GetTalentValue("modifier_marci_unleash_7", "speed", true),
			r7_stack_max = caster:GetTalentValue("modifier_marci_unleash_7", "stack_max", true),
			r7_cd_inc = caster:GetTalentValue("modifier_marci_unleash_7", "cd_inc", true),

			h3_cd = 0,

			has_h6 = 0,
			h6_bkb = caster:GetTalentValue("modifier_marci_hero_6", "bkb", true),
			h6_cd = caster:GetTalentValue("modifier_marci_hero_6", "cd", true),

			has_q7 = 0,

			has_w7 = 0,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_marci_unleash_1") then
		self.talents.has_r1 = 1
		self.talents.r1_stats_inc = caster:GetTalentValue("modifier_marci_unleash_1", "stats_inc")
		if IsServer() then
			caster:AddProc(self.tracker, { name = "hit", land = true })
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_marci_unleash_2") then
		self.talents.r2_slow = caster:GetTalentValue("modifier_marci_unleash_2", "slow")
		self.talents.r2_speed = caster:GetTalentValue("modifier_marci_unleash_2", "speed")
	end

	if caster:HasTalent("modifier_marci_unleash_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_marci_unleash_3", "damage") / 100
		self.talents.r3_damage_inc = caster:GetTalentValue("modifier_marci_unleash_3", "damage_inc")
		caster:AddProc(self.tracker, { name = "hit", land = true })
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_marci_unleash_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_marci_unleash_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_marci_hero_3") then
		self.talents.h3_cd = caster:GetTalentValue("modifier_marci_hero_3", "cd")
	end

	if caster:HasTalent("modifier_marci_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_marci_dispose_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_marci_rebound_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_marci_sidekick_7") then
		self.talents.has_e7 = 1
	end
end

function marci_unleash_custom:GetAbilityTextureName()
	if self.talents.has_q7 == 1 or self.talents.has_w7 == 1 then
		return "unleash_spell"
	end
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "marci_unleash", self)
end

function marci_unleash_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_marci_unleash_custom_tracker"
end

function marci_unleash_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.h3_cd or 0)
end

function marci_unleash_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_h6 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + bonus
end

function marci_unleash_custom:OnSpellStart()
	local duration = self.duration

	if self.talents.has_h6 == 1 then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	end

	if self.talents.has_q7 == 1 or self.talents.has_w7 == 1 then
		for i = 0, 6 do
			local current_ability = self.parent:GetAbilityByIndex(i)
			if current_ability and current_ability ~= self.ability then
				self.parent:CdAbility(current_ability, nil, self.cdr_bonus / 100, "marci_unleash_custom")
			end
		end
		self:Pulse(self.caster:GetAbsOrigin())
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_marci_unleash_custom", { duration = duration })
end

function marci_unleash_custom:Pulse(center, from_ability, ability)
	if not IsServer() then
		return
	end
	if from_ability then
		if not self.parent:HasModifier("modifier_marci_unleash_custom") then
			return
		end
		if self.talents.has_q7 == 0 and self.talents.has_w7 == 0 then
			return
		end
	end

	local radius = self.pulse_radius
	local damage_k = 1

	if ability == "modifier_marci_unleash_3" then
		damage_k = self.talents.r3_damage
		radius = self.talents.r3_radius
	end

	local damageTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }

	for _, enemy in pairs(self.caster:FindTargets(radius, center)) do
		local damage = self.pulse_damage
		local mod = enemy:FindModifierByName("modifier_marci_unleash_custom_stack")
		if mod then
			damage = damage + mod:GetStackCount() * self.talents.r3_damage_inc
		end

		damageTable.victim = enemy
		damageTable.damage = damage * damage_k
		DoDamage(damageTable, ability)

		if ability == "modifier_marci_unleash_3" then
			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_marci_unleash_custom_stack",
				{ duration = self.talents.r3_duration }
			)
		end

		if self.talents.has_q7 == 1 or self.talents.has_w7 == 1 then
			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_marci_unleash_custom_debuff",
				{ duration = self.pulse_debuff_duration }
			)
		end
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_unleash_pulse.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, center)
	ParticleManager:SetParticleControl(particle, 1, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(particle)

	EmitSoundOnLocationWithCaster(center, "Hero_Marci.Unleash.Pulse", self.caster)
end

modifier_marci_unleash_custom = class(mod_visible)
function modifier_marci_unleash_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.max_time = self:GetRemainingTime()
	self.bonus_ms = self.ability.bonus_movespeed
	self.damage_reduction = self.ability.damage_reduction
	self.cdr_bonus = self.ability.cdr_bonus
	self.more_time = 0

	if not IsServer() then
		return
	end

	self.parent:EmitSound("Hero_Marci.Unleash.Cast")

	self.legendary_stack = self.ability.talents.r7_stack_init
	self.interval = 0.1
	self.RemoveForDuel = true
	self.ability:EndCd()
	self.parent:RemoveCd("marci_h6")

	if self.ability.talents.has_w7 == 0 and self.ability.talents.has_q7 == 0 then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_marci_unleash_custom_fury", {})
		self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_unleash_cast.vpcf")
	else
		local particle = ParticleManager:CreateParticle(
			"particles/marci/unleash_spell_caster.vpcf",
			PATTACH_POINT_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"eye_l",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			2,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"eye_r",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			3,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			4,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack2",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			5,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			6,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack2",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(particle, false, false, -1, false, false)

		self.parent:GenericParticle("particles/marci/unleash_spell_start.vpcf")
		self.number = -1
	end

	if
		self.ability.talents.has_w7 == 1
		or self.ability.talents.has_q7 == 1
		or self.ability.talents.has_h6 == 1
		or self.ability.talents.has_r7 == 1
	then
		self:OnIntervalThink(true)
		self:StartIntervalThink(self.interval)
	end

	if self.parent:HasScepter() then
		self.parent:AddSpellEvent(self, true)
		self.parent:AddDamageEvent_inc(self, true)
	end
end

function modifier_marci_unleash_custom:OnIntervalThink(init)
	if not IsServer() then
		return
	end

	if self.ability.talents.has_r7 == 1 then
		self.parent:UpdateUIshort({
			max_time = self.max_time + self.more_time,
			time = self:GetRemainingTime(),
			stack = self.legendary_stack,
			style = "MarciUnleash",
		})
	end

	if self.ability.talents.has_h6 == 1 and self.parent:CheckCd("marci_h6", self.ability.talents.h6_cd) then
		self.parent:Purge(false, true, false, true, true)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ effect = 2, sound = 1, duration = self.ability.talents.h6_bkb }
		)
	end

	if self.ability.talents.has_w7 == 1 or self.ability.talents.has_q7 == 1 then
		local number = math.floor(self:GetRemainingTime())
		if self.number ~= number and not init then
			self.number = number

			local number_1 = number + 1
			local double = math.floor(number_1 / 10)
			local number_2 = number_1 - double * 10

			if not self.particle then
				self.particle = self.parent:GenericParticle("particles/marci/unleash_stack_spell.vpcf", self, true)
			end
			ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
		end
	end
end

function modifier_marci_unleash_custom:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "MarciUnleash" })

	self.ability:StartCd()
	self.parent:RemoveModifierByName("modifier_marci_unleash_custom_fury")
	self.parent:RemoveModifierByName("modifier_marci_unleash_custom_recovery")
end

function modifier_marci_unleash_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if params.ability == self.ability then
		return
	end
	if self.more_time >= self.ability.scepter_linger_max then
		return
	end

	local inc = self.ability.scepter_linger
	self.more_time = self.more_time + inc
	self:SetDuration(self:GetRemainingTime() + inc, true)
end

function modifier_marci_unleash_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealth() > 5 then
		return
	end
	if self.proced then
		return
	end

	self.proced = true

	self.parent:EmitSound("Marci.Dispose_damage")
	self.parent:EmitSound("Marci.Dispose_heal")

	self.parent:GenericParticle("particles/marci/marci_wave.vpcf")
	local particle =
		ParticleManager:CreateParticle("particles/marci/marci_heal.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:GenericHeal(
		self.parent:GetMaxHealth() * self.ability.scepter_heal,
		self.ability,
		false,
		false,
		"Scepter"
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_marci_unleash_custom_invun",
		{ duration = self.ability.scepter_invun }
	)
end

function modifier_marci_unleash_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_MIN_HEALTH,
	}
end

function modifier_marci_unleash_custom:GetModifierPercentageCooldown(params)
	if not params.ability then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if self.ability.talents.has_w7 == 0 and self.ability.talents.has_q7 == 0 then
		return
	end
	return self.cdr_bonus
end

function modifier_marci_unleash_custom:GetModifierTotalDamageOutgoing_Percentage(params)
	if self.ability.talents.has_w7 == 1 or self.ability.talents.has_q7 == 1 then
		return
	end
	if params.inflictor then
		return
	end
	if self.parent.marci_e7_attack then
		return
	end
	return self.damage_reduction
end

function modifier_marci_unleash_custom:GetModifierAttackRangeBonus()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_range
end

function modifier_marci_unleash_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.bonus_ms
end

function modifier_marci_unleash_custom:GetActivityTranslationModifiers()
	return "unleash"
end

function modifier_marci_unleash_custom:GetMinHealth()
	if not IsServer() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if self.proced then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealth() <= 0 then
		return
	end

	return 1
end

modifier_marci_unleash_custom_recovery = class(mod_visible)
function modifier_marci_unleash_custom_recovery:IsDebuff()
	return true
end
function modifier_marci_unleash_custom_recovery:GetTexture()
	return "marci_unleash_flurry"
end
function modifier_marci_unleash_custom_recovery:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.rate = self.ability.recovery_fixed_attack_rate
end

function modifier_marci_unleash_custom_recovery:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_marci_unleash_custom") then
		return
	end
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_marci_unleash_custom_fury", {})
end

function modifier_marci_unleash_custom_recovery:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_FIXED_ATTACK_RATE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_marci_unleash_custom_recovery:GetActivityTranslationModifiers()
	return "unleash_recharge"
end

function modifier_marci_unleash_custom_recovery:GetModifierFixedAttackRate(params)
	return self.rate
end

modifier_marci_unleash_custom_fury = class(mod_visible)
function modifier_marci_unleash_custom_fury:GetTexture()
	return "marci_unleash_flurry"
end
function modifier_marci_unleash_custom_fury:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bonus_as = self.ability.flurry_bonus_attack_speed
	self.recovery = self.ability.time_between_flurries
	self.charges = self.ability.charges_per_flurry
	self.timer = self.ability.max_time_window_per_hit

	if not IsServer() then
		return
	end
	self.parent:AddAttackStartEvent_out(self)

	local mod = self.parent:FindModifierByName("modifier_marci_unleash_custom")
	if mod and self.ability.talents.has_r7 == 1 then
		self.charges = mod.legendary_stack
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_unleash_buff.vpcf",
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"eye_l",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"eye_r",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		4,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		5,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		6,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(particle, false, false, -1, false, false)

	self.particle = self.parent:GenericParticle("particles/marci/unleash_stack.vpcf", self, true)
	self:SetStackCount(self.charges)

	self.parent:EmitSound("Hero_Marci.Unleash.Charged")
	EmitSoundOnClient("Hero_Marci.Unleash.Charged.2D", self.parent:GetPlayerOwner())
end

function modifier_marci_unleash_custom_fury:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:Destroy()
end

function modifier_marci_unleash_custom_fury:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_marci_unleash_custom") then
		return
	end

	local cd = self.recovery
	if self.ability.talents.has_r7 == 1 then
		self.parent.check_r7 = true
		cd = cd + (self.parent:GetDisplayAttackSpeed() / self.ability.talents.r7_speed) * self.ability.talents.r7_cd_inc
		self.parent.check_r7 = false
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_marci_unleash_custom_recovery", { duration = cd })
end

function modifier_marci_unleash_custom_fury:OnStackCountChanged()
	if not IsServer() then
		return
	end
	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
end

function modifier_marci_unleash_custom_fury:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	local target = params.target

	if not target:IsUnit() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	self:StartIntervalThink(self.timer)
	self:DecrementStackCount()

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_marci/marci_unleash_attack.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
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
	ParticleManager:ReleaseParticleIndex(particle)

	if self:GetStackCount() > 0 then
		return
	end

	if
		params.target:IsRealHero()
		and self.parent:GetQuest() == "Marci.Quest_8"
		and not self.parent:QuestCompleted()
	then
		self.parent:UpdateQuest(1)
	end

	if IsValid(self.parent.bodyguard_ability) then
		self.parent.bodyguard_ability:ProcCd(1)
	end

	if self.ability.talents.has_r4 == 1 then
		if self.parent:CheckCd("marci_r4", self.ability.talents.r4_talent_cd) then
			target:EmitSound("DOTA_Item.SkullBasher")
			target:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(self.ability, true),
				"modifier_bashed",
				{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.r4_stun }
			)
		end
		self.parent:GenericHeal(
			self.parent:GetMaxHealth() * self.ability.talents.r4_heal,
			self.ability,
			false,
			"",
			"modifier_marci_unleash_4"
		)
	end

	local mod = self.parent:FindModifierByName("modifier_marci_unleash_custom")
	if mod and self.ability.talents.has_r7 == 1 and mod.legendary_stack < self.ability.talents.r7_stack_max then
		mod.legendary_stack = mod.legendary_stack + 1
	end

	self.ability:Pulse(target:GetAbsOrigin())
	self:Destroy()
end

function modifier_marci_unleash_custom_fury:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_IGNORE_ATTACKSPEED_LIMIT,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_marci_unleash_custom_fury:GetModifierAttackSpeedBonus_Constant()
	if self.parent.check_r7 then
		return
	end
	return self.bonus_as
end

function modifier_marci_unleash_custom_fury:GetModifierAttackSpeed_Limit()
	if self.parent.check_r7 then
		return
	end
	return 1
end

function modifier_marci_unleash_custom_fury:GetActivityTranslationModifiers()
	if self:GetStackCount() == 1 then
		return "flurry_pulse_attack"
	end
	if self:GetStackCount() % 2 == 0 then
		return "flurry_attack_b"
	end
	return "flurry_attack_a"
end

modifier_marci_unleash_custom_debuff = class(mod_visible)
function modifier_marci_unleash_custom_debuff:IsPurgable()
	return true
end
function modifier_marci_unleash_custom_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_snapfire_slow.vpcf"
end
function modifier_marci_unleash_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_marci_unleash_custom_debuff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.as_slow = self.ability.pulse_attack_slow_pct
	self.ms_slow = self.ability.pulse_move_slow_pct + self.ability.talents.r2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_unleash_pulse_debuff.vpcf", self)
end

function modifier_marci_unleash_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_marci_unleash_custom_debuff:GetModifierAttackSpeedBonus_Constant()
	return self.as_slow
end

function modifier_marci_unleash_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.ms_slow
end

modifier_marci_unleash_custom_tracker = class(mod_hidden)
function modifier_marci_unleash_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.unleash_ability = self.ability

	self.ability.pulse_damage = self.ability:GetSpecialValueFor("pulse_damage")
	self.ability.pulse_attack_slow_pct = self.ability:GetSpecialValueFor("pulse_attack_slow_pct")
	self.ability.flurry_bonus_attack_speed = self.ability:GetSpecialValueFor("flurry_bonus_attack_speed")
	self.ability.cdr_bonus = self.ability:GetSpecialValueFor("cdr_bonus")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.charges_per_flurry = self.ability:GetSpecialValueFor("charges_per_flurry")
	self.ability.time_between_flurries = self.ability:GetSpecialValueFor("time_between_flurries")
	self.ability.pulse_radius = self.ability:GetSpecialValueFor("pulse_radius")
	self.ability.pulse_debuff_duration = self.ability:GetSpecialValueFor("pulse_debuff_duration")
	self.ability.pulse_move_slow_pct = self.ability:GetSpecialValueFor("pulse_move_slow_pct")
	self.ability.max_time_window_per_hit = self.ability:GetSpecialValueFor("max_time_window_per_hit")
	self.ability.bonus_movespeed = self.ability:GetSpecialValueFor("bonus_movespeed")
	self.ability.recovery_fixed_attack_rate = self.ability:GetSpecialValueFor("recovery_fixed_attack_rate")
	self.ability.damage_reduction = self.ability:GetSpecialValueFor("damage_reduction")
	self.ability.scepter_linger = self.ability:GetSpecialValueFor("scepter_linger")
	self.ability.scepter_linger_max = self.ability:GetSpecialValueFor("scepter_linger_max")
	self.ability.scepter_invun = self.ability:GetSpecialValueFor("scepter_invun")
	self.ability.scepter_heal = self.ability:GetSpecialValueFor("scepter_heal") / 100
end

function modifier_marci_unleash_custom_tracker:OnRefresh()
	self.ability.pulse_damage = self.ability:GetSpecialValueFor("pulse_damage")
	self.ability.pulse_attack_slow_pct = self.ability:GetSpecialValueFor("pulse_attack_slow_pct")
	self.ability.flurry_bonus_attack_speed = self.ability:GetSpecialValueFor("flurry_bonus_attack_speed")
	self.ability.cdr_bonus = self.ability:GetSpecialValueFor("cdr_bonus")
end

function modifier_marci_unleash_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.r3_chance
end

function modifier_marci_unleash_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	local target = params.target

	if self.ability.talents.has_r1 == 1 then
		local duration = target:IsCreep() and self.ability.talents.r1_duration_creeps
			or self.ability.talents.r1_duration
		local mod = self.parent:FindModifierByName("modifier_marci_unleash_custom_stats")
		if mod then
			duration = math.max(mod:GetRemainingTime(), duration)
		end
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_marci_unleash_custom_stats",
			{ duration = duration }
		)
	end

	if params.procs[self].default then
		self.ability:Pulse(target:GetAbsOrigin(), false, "modifier_marci_unleash_3")
	end
end

function modifier_marci_unleash_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_marci_unleash_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	if self.ability.talents.has_e7 == 1 then
		return
	end
	return self.ability.talents.r2_speed
end

function modifier_marci_unleash_custom_tracker:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 1 or self.ability.talents.has_q7 == 1 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	local target = params.target

	if not target:IsUnit() then
		return
	end

	if self.parent:HasModifier("modifier_marci_unleash_custom") then
		if not params.no_attack_cooldown then
			target:EmitSound("Hero_Marci.Flurry.Attack")
		end
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_marci_unleash_custom_debuff",
			{ duration = self.ability.pulse_debuff_duration }
		)
	end
end

modifier_marci_unleash_custom_stats = class(mod_visible)
function modifier_marci_unleash_custom_stats:GetTexture()
	return "buffs/marci/unleash_1"
end
function modifier_marci_unleash_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max
	self.stats = self.ability.talents.r1_stats_inc / self.max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_marci_unleash_custom_stats:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_marci_unleash_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_marci_unleash_custom_stats:GetModifierBonusStats_Agility()
	return self:GetStackCount() * self.stats
end

function modifier_marci_unleash_custom_stats:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.stats
end

function modifier_marci_unleash_custom_stats:GetModifierBonusStats_Intellect()
	return self:GetStackCount() * self.stats
end

modifier_marci_unleash_custom_stack = class(mod_visible)
function modifier_marci_unleash_custom_stack:GetTexture()
	return "buffs/marci/unleash_3"
end
function modifier_marci_unleash_custom_stack:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.max = self.ability.talents.r3_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.particle = self.parent:GenericParticle("particles/marci/marci_count.vpcf", self, true)

	self:OnRefresh()
end

function modifier_marci_unleash_custom_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
end

modifier_marci_unleash_custom_invun = class(mod_hidden)
function modifier_marci_unleash_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end