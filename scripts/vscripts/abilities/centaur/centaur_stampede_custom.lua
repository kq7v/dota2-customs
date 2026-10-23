--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_centaur_stampede_custom",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_slow",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_tracker",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_legendary_thinker",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_legendary_unit",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_legendary_stack",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_stampede_7"
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_legendary_damage",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_legendary_silence",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_stampede_7"
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_recast",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_hero_6"
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_crit_attack",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_centaur_stampede_3" }
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_crit_attack_cd",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_stampede_3"
)
LinkLuaModifier(
	"modifier_centaur_stampede_custom_damage_bonus",
	"abilities/centaur/centaur_stampede_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_stampede_1"
)

centaur_stampede_custom = class({})
centaur_stampede_custom.talents = {}

function centaur_stampede_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_stampede_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_stampede_overhead.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_stampede.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/leashed.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		context
	)
	PrecacheResource("particle", "particles/centaur/stampede_vector.vpcf", context)
	PrecacheResource("particle", "particles/centaur/stampede_legendary_start.vpcf", context)
	PrecacheResource("particle", "particles/centaur/stampede_legendary_end.vpcf", context)
	PrecacheResource("particle", "particles/centaur/stampede_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/drum_of_endurance_buff.vpcf", context)
	PrecacheResource("particle", "particles/centaur/stomp_attack.vpcf", context)
	PrecacheResource("particle", "particles/centaur/stomp_crit.vpcf", context)
	PrecacheResource("particle", "particles/centaur/stomp_crit_hit.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf",
		context
	)
end

function centaur_stampede_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_speed = 0,
			r1_duration = caster:GetTalentValue("modifier_centaur_stampede_1", "duration", true),
			r1_max = caster:GetTalentValue("modifier_centaur_stampede_1", "max", true),

			has_r2 = 0,
			r2_range = 0,
			r2_duration = 0,
			r2_bonus = caster:GetTalentValue("modifier_centaur_stampede_2", "bonus", true),

			has_r3 = 0,
			r3_cd = 0,
			r3_heal = caster:GetTalentValue("modifier_centaur_stampede_3", "heal", true) / 100,
			r3_legendary_stack = caster:GetTalentValue("modifier_centaur_stampede_3", "legendary_stack", true) - 1,
			r3_crit = caster:GetTalentValue("modifier_centaur_stampede_3", "crit", true),
			r3_cleave = caster:GetTalentValue("modifier_centaur_stampede_3", "cleave", true) / 100,
			r3_cd_inc = caster:GetTalentValue("modifier_centaur_stampede_3", "cd_inc", true),

			has_r4 = 0,
			r4_duration = caster:GetTalentValue("modifier_centaur_stampede_4", "duration", true),
			r4_cd_inc = caster:GetTalentValue("modifier_centaur_stampede_4", "cd_inc", true) / 100,

			has_h6 = 0,
			h6_bkb = caster:GetTalentValue("modifier_centaur_hero_6", "bkb", true),

			has_r7 = 0,
			r7_stack_duration = caster:GetTalentValue("modifier_centaur_stampede_7", "stack_duration", true),
			r7_stack_radius = caster:GetTalentValue("modifier_centaur_stampede_7", "stack_radius", true),
			r7_max = caster:GetTalentValue("modifier_centaur_stampede_7", "max", true),
		}
	end

	if caster:HasTalent("modifier_centaur_stampede_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_centaur_stampede_1", "damage")
		self.talents.r1_speed = caster:GetTalentValue("modifier_centaur_stampede_1", "speed")
		caster:AddProc(self.tracker, { land = true, extra = false })
	end

	if caster:HasTalent("modifier_centaur_stampede_2") then
		self.talents.has_r2 = 1
		self.talents.r2_range = caster:GetTalentValue("modifier_centaur_stampede_2", "range")
		self.talents.r2_duration = caster:GetTalentValue("modifier_centaur_stampede_2", "duration")
	end

	if caster:HasTalent("modifier_centaur_stampede_3") then
		self.talents.has_r3 = 1
		self.talents.r3_cd = caster:GetTalentValue("modifier_centaur_stampede_3", "cd")
		caster:AddProc(self.tracker, { name = "crit", damage = true })
		caster:AddLifesteal(self.tracker, {
			name = "modifier_centaur_stampede_3",
			type = 2,
			text = true,
			effect = "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf",
			proc = "LifestealRecord",
			value = function(params)
				if not params.record then
					return 0
				end
				if params.record ~= self.tracker.r3_record then
					return 0
				end
				return self.talents.r3_heal
			end,
		})
		if IsServer() then
			self.tracker:StartIntervalThink(1)
		end
	end

	if caster:HasTalent("modifier_centaur_stampede_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true, extra = false })
	end

	if caster:HasTalent("modifier_centaur_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_centaur_stampede_7") then
		self.talents.has_r7 = 1
		self.tracker:UpdateUI()
		caster:AddProc(self.tracker, { land = true, extra = false })
	end
end

function centaur_stampede_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_centaur_stampede_custom_recast") then
		return "stampede_recast"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "centaur_stampede", self)
end

function centaur_stampede_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_centaur_stampede_custom_tracker"
end

function centaur_stampede_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_h6 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + bonus
end

function centaur_stampede_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_centaur_stampede_custom_recast") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function centaur_stampede_custom:OnSpellStart()
	local duration = self.duration + self.talents.r2_duration
	local mod = self.caster:FindModifierByName("modifier_centaur_stampede_custom_recast")

	if mod then
		self.caster:EmitSound("Centaur.Stampede_bkb")
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_debuff_immune",
			{ duration = self.talents.h6_bkb, effect = 2 }
		)
		mod:Destroy()
		self:EndCd()
		return
	end

	local targets = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
		0,
		false
	)
	self.caster:EmitSound("Hero_Centaur.Stampede.Cast")
	self.caster:StartGesture(ACT_DOTA_CENTAUR_STAMPEDE)

	if self.talents.has_h6 == 1 then
		self.caster:Purge(false, true, false, true, true)
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_centaur_stampede_custom_recast",
			{ duration = duration }
		)
	end

	for _, target in pairs(targets) do
		target:AddNewModifier(self.caster, self, "modifier_centaur_stampede_custom", { duration = duration })
	end
end

modifier_centaur_stampede_custom = class(mod_visible)
function modifier_centaur_stampede_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = 100

	if self.caster:HasScepter() and self.caster == self.parent then
		self.speed = self.ability.scepter_stampede
	end

	if not IsServer() then
		return
	end

	self.cd_stack = 0

	local mod = self.parent:FindModifierByName("modifier_centaur_stampede_custom_crit_attack_cd")
	if mod then
		mod:SetDuration(mod:GetRemainingTime() / self.ability.talents.r3_cd_inc, true)
	end

	local pfx_list = {
		"particles/units/heroes/hero_centaur/centaur_stampede.vpcf",
		"particles/units/heroes/hero_centaur/centaur_stampede_overhead.vpcf",
		"particles/units/heroes/hero_centaur/centaur_stampede_cast.vpcf",
	}
	self.parent:EmitSound("Hero_Centaur.Stampede.Movement")
	self.over_head = self.parent:GenericParticle(
		wearables_system:GetParticleReplacementAbility(self.caster, pfx_list[2], self.ability),
		self,
		true
	)
	self.parent:GenericParticle(
		wearables_system:GetParticleReplacementAbility(self.caster, pfx_list[1], self.ability),
		self
	)
	self.parent:GenericParticle(wearables_system:GetParticleReplacementAbility(self.caster, pfx_list[3], self.ability))

	if self.parent ~= self.caster then
		return
	end

	self.ability:EndCd(self.ability.talents.has_h6 == 1 and 0.2 or nil)

	self.radius = self.ability.radius
	self.targets = {}

	self.interval_think = 0
	self:OnIntervalThink()
	self:StartIntervalThink(FrameTime())
end

function modifier_centaur_stampede_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	ParticleManager:SetParticleControlForward(self.over_head, 0, self.parent:GetForwardVector())
	ParticleManager:SetParticleControlForward(self.over_head, 1, self.parent:GetForwardVector())
	self.interval_think = self.interval_think + FrameTime()
	if self.interval_think >= 0.1 then
		self.interval_think = 0

		local targets = self.caster:FindTargets(self.radius)
		if #targets <= 0 then
			return
		end

		for _, target in pairs(targets) do
			if not self.targets[target:entindex()] then
				self.targets[target:entindex()] = true

				if IsValid(self.caster.stomp_ability) and not self.cd_proc then
					self.cd_proc = true
					self.caster.stomp_ability:ProcCd()
				end

				if IsValid(self.caster.stomp_ability) then
					self.caster.stomp_ability:ApplyReduce(target)
				end

				local slow_duration = self.ability.slow_duration
					+ (self.ability.talents.has_r4 == 1 and self.ability.talents.r4_duration or 0)
				target:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_centaur_stampede_custom_slow",
					{ duration = slow_duration * (1 - target:GetStatusResistance()) }
				)
				DoDamage({
					attacker = self.caster,
					ability = self.ability,
					damage_type = DAMAGE_TYPE_MAGICAL,
					damage = self.ability.strength_damage * self.caster:GetStrength(),
					victim = target,
				})
				target:EmitSound("Hero_Centaur.Stampede.Stun")
			end
		end
	end
end

function modifier_centaur_stampede_custom:CheckState()
	return {
		[MODIFIER_STATE_UNSLOWABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_centaur_stampede_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_centaur_stampede_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.speed
end

function modifier_centaur_stampede_custom:GetActivityTranslationModifiers()
	return "haste"
end

function modifier_centaur_stampede_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_Centaur.Stampede.Movement")
	self.parent:RemoveModifierByName("modifier_centaur_stampede_custom_recast")

	if self.parent == self.caster then
		self.ability:StartCd()

		if self.cd_stack > 0 then
			self.parent:CdAbility(
				self.ability,
				nil,
				self.cd_stack * self.ability.talents.r4_cd_inc,
				"modifier_centaur_stampede_4"
			)
		end
	end
end

modifier_centaur_stampede_custom_tracker = class(mod_hidden)
function modifier_centaur_stampede_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("centaur_stampede_custom_legendary")
	self.parent.stampede_legendary_ability = self.legendary_ability

	if IsValid(self.legendary_ability) then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
			self.legendary_ability:SetActivated(false)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.strength_damage = self.ability:GetSpecialValueFor("strength_damage")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.slow_movement_speed = self.ability:GetSpecialValueFor("slow_movement_speed")
	self.ability.scepter_stampede = self.ability:GetSpecialValueFor("scepter_stampede")
end

function modifier_centaur_stampede_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.strength_damage = self.ability:GetSpecialValueFor("strength_damage")
end

function modifier_centaur_stampede_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_centaur_stampede_custom_crit_attack") then
		return
	end
	if self.parent:HasModifier("modifier_centaur_stampede_custom_crit_attack_cd") then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_centaur_stampede_custom_crit_attack", {})
end

function modifier_centaur_stampede_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_centaur_stampede_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.r1_speed
end

function modifier_centaur_stampede_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.r2_range
		* (self.parent:HasModifier("modifier_centaur_stampede_custom") and self.ability.talents.r2_bonus or 1)
end

function modifier_centaur_stampede_custom_tracker:GetProcChance(params, name)
	if name ~= "crit" then
		return 100
	end
	local mod = self.parent:FindModifierByName("modifier_centaur_stampede_custom_crit_attack")
	if not mod or mod.record ~= params.record then
		return 0
	end
	return 100
end

function modifier_centaur_stampede_custom_tracker:AttackProc(params, name)
	local mod = self.parent:FindModifierByName("modifier_centaur_stampede_custom")
	if self.ability.talents.has_r1 == 1 and mod then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_centaur_stampede_custom_damage_bonus",
			{ duration = self.ability.talents.r1_duration }
		)
	end

	if self.ability.talents.has_r4 == 1 then
		if not mod then
			self.parent:CdAbility(self.ability, nil, self.ability.talents.r4_cd_inc, "modifier_centaur_stampede_4")
		else
			mod.cd_stack = mod.cd_stack + 1
		end
	end

	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.legendary_ability or self.legendary_ability:GetCooldownTimeRemaining() > 0 then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_centaur_stampede_custom_legendary_stack",
		{ duration = self.ability.talents.r7_stack_duration }
	)
end

function modifier_centaur_stampede_custom_tracker:LifestealRecord()
	self.r3_record = nil
end

function modifier_centaur_stampede_custom_tracker:DamageProc(params, name)
	local target = params.target
	local mod = self.parent:FindModifierByName("modifier_centaur_stampede_custom_crit_attack")
	if not mod then
		return
	end

	self.r3_record = params.record
	target:EmitSound("Centaur.Stomp_crit_attack1")
	target:EmitSound("Centaur.Stomp_crit_attack2")

	DoCleaveAttack(
		self.parent,
		target,
		self.ability,
		params.original_damage * self.ability.talents.r3_cleave,
		150,
		360,
		650,
		"particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave_gods_strength.vpcf"
	)

	local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()

	local coup_pfx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_crit_impact.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		coup_pfx,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(coup_pfx, 1, target:GetOrigin())
	ParticleManager:SetParticleControlForward(coup_pfx, 1, -vec)
	ParticleManager:ReleaseParticleIndex(coup_pfx)

	local particle_edge_fx =
		ParticleManager:CreateParticle("particles/centaur/stomp_crit.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		particle_edge_fx,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlForward(particle_edge_fx, 2, vec)
	ParticleManager:ReleaseParticleIndex(particle_edge_fx)

	self.parent:GenericParticle("particles/centaur/stomp_crit_hit.vpcf")

	if
		self.ability.talents.has_r7 == 1
		and self.legendary_ability
		and self.legendary_ability:GetCooldownTimeRemaining() <= 0
	then
		for i = 1, self.ability.talents.r3_legendary_stack do
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_centaur_stampede_custom_legendary_stack",
				{ duration = self.ability.talents.r7_stack_duration }
			)
		end
	end

	mod:Destroy()
end

function modifier_centaur_stampede_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end
	local stack = 0
	local mod = self.parent:FindModifierByName("modifier_centaur_stampede_custom_legendary_stack")

	if mod then
		stack = mod:GetStackCount()
		if self.legendary_ability then
			self.legendary_ability:SetActivated(true)
		end
	elseif self.legendary_ability then
		self.legendary_ability:SetActivated(false)
	end

	self.parent:UpdateUIlong({ stack = stack, max = self.ability.talents.r7_max, style = "CentaurStampede" })
end

modifier_centaur_stampede_custom_slow = class(mod_visible)
function modifier_centaur_stampede_custom_slow:IsPurgable()
	return self.ability.talents.has_r4 == 0
end
function modifier_centaur_stampede_custom_slow:GetTexture()
	return "centaur_stampede"
end
function modifier_centaur_stampede_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow_movement_speed
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items2_fx/leashed.vpcf", self)

	if not self.parent:IsRealHero() then
		return
	end
	if self.caster:GetQuest() ~= "Centaur.Quest_8" then
		return
	end
	if self.caster:QuestCompleted() then
		return
	end

	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_centaur_stampede_custom_slow:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateQuest(self.interval)
end

function modifier_centaur_stampede_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_centaur_stampede_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_centaur_stampede_custom_slow:CheckState()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_centaur_stampede_custom_legendary_stack = class(mod_hidden)
function modifier_centaur_stampede_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.r7_max
	self.radius = self.ability.talents.r7_stack_radius
	self.duration = self.ability.talents.r7_stack_duration

	if not IsServer() then
		return
	end
	self.mod = self.ability.tracker

	self:OnRefresh()
	self:StartIntervalThink(0.2)
end

function modifier_centaur_stampede_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.mod then
		self.mod:UpdateUI()
	end
end

function modifier_centaur_stampede_custom_legendary_stack:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	if #targets > 0 then
		self:SetDuration(self.duration, true)
	end
end

function modifier_centaur_stampede_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

modifier_centaur_stampede_custom_crit_attack = class(mod_visible)
function modifier_centaur_stampede_custom_crit_attack:GetTexture()
	return "buffs/centaur/stampede_3"
end
function modifier_centaur_stampede_custom_crit_attack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.record = nil

	self.crit = self.ability.talents.r3_crit
	if not IsServer() then
		return
	end
	self.particle = self.parent:GenericParticle("particles/centaur/stomp_attack.vpcf", self, true)
	self.parent:EmitSound("Centaur.Stomp_crit_ready")
	self:StartIntervalThink(3)
end

function modifier_centaur_stampede_custom_crit_attack:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.particle then
		ParticleManager:DestroyParticle(self.particle, false)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end

	self:StartIntervalThink(-1)
end

function modifier_centaur_stampede_custom_crit_attack:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_centaur_stampede_custom_crit_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_centaur_stampede_custom_crit_attack:GetModifierPreAttack_CriticalStrike(params)
	if self.parent:HasModifier("modifier_centaur_stampede_custom_legendary_damage") then
		return
	end
	self.record = params.record
	return self.crit
end

function modifier_centaur_stampede_custom_crit_attack:GetCritDamage()
	return self.crit
end

function modifier_centaur_stampede_custom_crit_attack:OnDestroy()
	if not IsServer() then
		return
	end
	local cd = self.ability.talents.r3_cd
		/ (self.parent:HasModifier("modifier_centaur_stampede_custom") and self.ability.talents.r3_cd_inc or 1)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_centaur_stampede_custom_crit_attack_cd",
		{ duration = cd }
	)
end

modifier_centaur_stampede_custom_crit_attack_cd = class(mod_cd)
function modifier_centaur_stampede_custom_crit_attack_cd:GetTexture()
	return "buffs/centaur/stampede_3"
end
function modifier_centaur_stampede_custom_crit_attack_cd:OnCreated()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true
end

function modifier_centaur_stampede_custom_crit_attack_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	self.ability.tracker:OnIntervalThink()
end

modifier_centaur_stampede_custom_damage_bonus = class(mod_visible)
function modifier_centaur_stampede_custom_damage_bonus:GetTexture()
	return "buffs/centaur/stampede_1"
end
function modifier_centaur_stampede_custom_damage_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_centaur_stampede_custom_damage_bonus:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_centaur_stampede_custom_damage_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_centaur_stampede_custom_damage_bonus:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.r1_damage * self:GetStackCount()
end

modifier_centaur_stampede_custom_recast = class(mod_hidden)

centaur_stampede_custom_legendary = class({})
centaur_stampede_custom_legendary.talents = {}

function centaur_stampede_custom_legendary:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.width = self:GetLevelSpecialValueFor("width", 1)
	self.interval = self:GetLevelSpecialValueFor("interval", 1)
	self.speed = self:GetLevelSpecialValueFor("speed", 1)
	self.hit_radius = self:GetLevelSpecialValueFor("hit_radius", 1)
	self.hit_stun = self:GetLevelSpecialValueFor("hit_stun", 1)
	self.hit_knock = self:GetLevelSpecialValueFor("hit_knock", 1)
	self.distance = self:GetLevelSpecialValueFor("distance", 1)
end

function centaur_stampede_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function centaur_stampede_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r7 = 0,
			r7_talent_cd = caster:GetTalentValue("modifier_centaur_stampede_7", "talent_cd", true),
			r7_duration = caster:GetTalentValue("modifier_centaur_stampede_7", "duration", true),
			r7_max = caster:GetTalentValue("modifier_centaur_stampede_7", "max", true),
			r7_silence = caster:GetTalentValue("modifier_centaur_stampede_7", "silence", true),
			r7_damage = caster:GetTalentValue("modifier_centaur_stampede_7", "damage", true),
			r7_slow = caster:GetTalentValue("modifier_centaur_stampede_7", "slow", true),
		}
	end

	if caster:HasTalent("modifier_centaur_stampede_7") then
		self.talents.has_r7 = 1
	end
end

function centaur_stampede_custom_legendary:GetCooldown()
	return self.talents.r7_talent_cd or 0
end

function centaur_stampede_custom_legendary:OnVectorCastStart(vStartLocation, vDirection)
	local mod = self.caster:FindModifierByName("modifier_centaur_stampede_custom_legendary_stack")
	if not mod then
		return
	end

	local stack = mod:GetStackCount()
	local duration = stack * self.talents.r7_duration + 0.2
	mod:Destroy()

	local point = vStartLocation
	local vec = vDirection

	if self:GetCursorPosition() == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
		vec = self.caster:GetForwardVector()
	end

	self.caster:EmitSound("Centaur.Stampede_legendary_cast1")

	local particle = ParticleManager:CreateParticle(
		"particles/centaur/stampede_legendary_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_head",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	particle = ParticleManager:CreateParticle(
		"particles/items_fx/drum_of_endurance_buff.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:DestroyParticle(particle, false)
	ParticleManager:ReleaseParticleIndex(particle)

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_centaur_stampede_custom_legendary_thinker",
		{ duration = duration, stack = stack, x = vec.x, y = vec.y },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_centaur_stampede_custom_legendary_thinker = class(mod_hidden)
function modifier_centaur_stampede_custom_legendary_thinker:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.distance_start = 100
	self.width = self.ability.width
	self.interval = self.ability.interval
	self.hit_radius = self.ability.hit_radius
	self.distance = self.ability.distance
	self.speed = self.ability.speed

	if not IsServer() then
		return
	end

	self.stack = table.stack

	if self.stack >= self.ability.talents.r7_max then
		self.caster:EmitSound("Centaur.Stampede_legendary_cast2")
	end

	self.vec = Vector(table.x, table.y, 0)
	self.center_point = self.parent:GetAbsOrigin() - self.distance_start * self.vec
	local line_pos = self.center_point + self.vec * self.width

	self.left = RotatePosition(self.center_point, QAngle(0, 90, 0), line_pos)
	self.right = RotatePosition(self.center_point, QAngle(0, -90, 0), line_pos)

	self.dir = (self.right - self.left)
	self.length = self.dir:Length2D()
	self.dir = self.dir:Normalized()

	self.last_left = 0
	self.last_right = 0

	self.parent:SetAbsOrigin(GetGroundPosition((self.parent:GetAbsOrigin() + self.vec * self.distance / 2), nil))
	self.parent:EmitSound("Centaur.Stampede_legendary_thinker")

	self.units = {}
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_centaur_stampede_custom_legendary_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Centaur.Stampede_legendary_thinker")
end

function modifier_centaur_stampede_custom_legendary_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end
	local length
	local count = 0

	repeat
		length = RandomInt(0, self.length / 2)
		count = count + 1
	until (math.abs(length - self.last_left) > self.hit_radius) or (count >= 20)

	count = 0

	local point = self.center_point + self.dir * length
	self.last_left = length
	self:SpawnUnit(point)

	repeat
		length = RandomInt(0, self.length / 2)
		count = count + 1
	until (
			(math.abs(length - self.last_right) > self.hit_radius)
			and (math.abs(length - self.last_left) > self.hit_radius)
		) or (count >= 20)

	point = self.center_point - self.dir * length
	self.last_right = length
	self:SpawnUnit(point)

	self:StartIntervalThink(self.interval)
end

function modifier_centaur_stampede_custom_legendary_thinker:SpawnUnit(point)
	if not IsServer() then
		return
	end
	local unit = CreateUnitByName(
		"custom_centaur_scepter_unit_" .. tostring(RandomInt(1, 2)),
		point,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	unit.owner = self.caster
	unit:FacePoint(unit:GetAbsOrigin() + self.vec * 5)
	unit:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_centaur_stampede_custom_legendary_unit",
		{ duration = self.distance / self.speed + 2, stack = self.stack, x = self.vec.x, y = self.vec.y }
	)
end

modifier_centaur_stampede_custom_legendary_unit = class(mod_hidden)
function modifier_centaur_stampede_custom_legendary_unit:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.distance = self.ability.distance
	self.hit_radius = self.ability.hit_radius
	self.hit_stun = self.ability.hit_stun
	self.hit_knock = self.ability.hit_knock
	self.silence = self.ability.talents.r7_silence
	self.speed = self.ability.speed
	self.max = self.ability.talents.r7_max

	if not IsServer() then
		return
	end
	self.stack = table.stack

	local pfx_list = {
		"particles/units/heroes/hero_centaur/centaur_stampede.vpcf",
		"particles/units/heroes/hero_centaur/centaur_stampede_overhead.vpcf",
		"particles/units/heroes/hero_centaur/centaur_stampede_cast.vpcf",
	}

	if self.stack >= self.max then
		self.stampede_particle = self.parent:GenericParticle(pfx_list[2], self, true)
		self.parent:GenericParticle(pfx_list[3])
	end

	self.parent:GenericParticle(pfx_list[1], self)
	self.parent:EmitSound("Hero_Centaur.Stampede.Movement")

	local effect = ParticleManager:CreateParticle(
		"particles/centaur/stampede_legendary_start.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	self.stampede_particle = nil
	self.targets = {}

	self.dir = Vector(table.x, table.y, 0)
	self.final_point = self.parent:GetAbsOrigin() + self.dir * self.distance

	self.pass = 0
	self.position = self.parent:GetAbsOrigin()

	self:OnIntervalThink()
	self:StartIntervalThink(0.2)
end

function modifier_centaur_stampede_custom_legendary_unit:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

function modifier_centaur_stampede_custom_legendary_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_centaur_stampede_custom_legendary_unit:GetActivityTranslationModifiers()
	return "haste"
end

function modifier_centaur_stampede_custom_legendary_unit:GetModifierMoveSpeed_Absolute()
	return self.speed
end

function modifier_centaur_stampede_custom_legendary_unit:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:MoveToPosition(self.final_point + self.dir * 500)

	local point = self.parent:GetAbsOrigin()
	self.pass = self.pass + (point - self.position):Length2D()
	self.position = point

	if self.pass >= self.distance then
		self:Destroy()
		return
	end

	for _, target in pairs(self.parent:FindTargets(self.hit_radius)) do
		if not self.targets[target:entindex()] then
			self.targets[target:entindex()] = true
			target:EmitSound("Hero_Centaur.Stampede.Stun")

			if self.stack >= self.max then
				target:AddNewModifier(
					self.caster,
					self.caster:BkbAbility(self.ability, true),
					"modifier_centaur_stampede_custom_legendary_silence",
					{ duration = (1 - target:GetStatusResistance()) * self.silence }
				)
			end

			self.caster:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_centaur_stampede_custom_legendary_damage",
				{ duration = 1 }
			)
			self.caster:PerformAttack(target, true, true, true, true, false, false, true)
			self.caster:RemoveModifierByName("modifier_centaur_stampede_custom_legendary_damage")

			local center = target:GetAbsOrigin() - self.dir * 10
			local knockbackProperties = {
				center_x = center.x,
				center_y = center.y,
				center_z = center.z,
				duration = self.hit_stun,
				knockback_duration = self.hit_stun,
				knockback_distance = self.hit_knock,
				knockback_height = 30,
				should_stun = 1,
			}
			target:AddNewModifier(
				self.caster,
				self.caster:BkbAbility(self.ability, true),
				"modifier_knockback",
				knockbackProperties
			)
		end
	end
end

function modifier_centaur_stampede_custom_legendary_unit:OnDestroy()
	if not IsServer() then
		return
	end
	local effect =
		ParticleManager:CreateParticle("particles/centaur/stampede_legendary_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	self.parent:StopSound("Hero_Centaur.Stampede.Movement")
	UTIL_Remove(self.parent)
end

modifier_centaur_stampede_custom_legendary_damage = class(mod_hidden)
function modifier_centaur_stampede_custom_legendary_damage:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.r7_damage - 100
end

function modifier_centaur_stampede_custom_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_centaur_stampede_custom_legendary_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_centaur_stampede_custom_legendary_silence = class(mod_hidden)
function modifier_centaur_stampede_custom_legendary_silence:IsPurgable()
	return true
end
function modifier_centaur_stampede_custom_legendary_silence:GetEffectName()
	return "particles/generic_gameplay/generic_silenced.vpcf"
end
function modifier_centaur_stampede_custom_legendary_silence:ShouldUseOverheadOffset()
	return true
end
function modifier_centaur_stampede_custom_legendary_silence:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_centaur_stampede_custom_legendary_silence:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self.caster.stampede_legendary_ability
	self.slow = IsValid(self.ability) and self.ability.talents.r7_slow or 0
end

function modifier_centaur_stampede_custom_legendary_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_centaur_stampede_custom_legendary_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_centaur_stampede_custom_legendary_silence:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end