--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_tracker",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_legendary",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_borrowed_7"
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_legendary_caster",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_legendary_knock",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_aura",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_aura_armor",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_borrowed_1"
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_heal",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_proc",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_abaddon_borrowed_3" }
)
LinkLuaModifier(
	"modifier_abaddon_borrowed_time_custom_proc_count",
	"abilities/abaddon/abaddon_borrowed_time_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_borrowed_3"
)

abaddon_borrowed_time_custom = class({})
abaddon_borrowed_time_custom.talents = {}

function abaddon_borrowed_time_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_borrowed_time_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_borrowed_time.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_speed.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/curse_proc.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_abaddon_borrowed_time.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_attack.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_legendary_heal.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_legendary_link.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_legendary.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_legendary_head.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_legendary_proc.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_burn.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/ulti_heal.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf",
		context
	)
	PrecacheResource("particle", "particles/abaddon/borrowed_bkb.vpcf", context)
end

function abaddon_borrowed_time_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_armor = 0,
			r1_damage = 0,
			r1_radius = caster:GetTalentValue("modifier_abaddon_borrowed_1", "radius", true),
			r1_duration = caster:GetTalentValue("modifier_abaddon_borrowed_1", "duration", true),
			r1_max = caster:GetTalentValue("modifier_abaddon_borrowed_1", "max", true),

			r2_heal_inc = 0,
			r2_heal = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_heal = 0,
			r3_max = caster:GetTalentValue("modifier_abaddon_borrowed_3", "max", true),
			r3_cleave = caster:GetTalentValue("modifier_abaddon_borrowed_3", "cleave", true) / 100,
			r3_max_inc = caster:GetTalentValue("modifier_abaddon_borrowed_3", "max_inc", true),
			r3_duration = caster:GetTalentValue("modifier_abaddon_borrowed_3", "duration", true),

			has_r4 = 0,
			r4_cd_inc = caster:GetTalentValue("modifier_abaddon_borrowed_4", "cd_inc", true) / 100,
			r4_cd_inc_legendary = caster:GetTalentValue("modifier_abaddon_borrowed_4", "cd_inc_legendary", true) / 100,
			r4_taunt = caster:GetTalentValue("modifier_abaddon_borrowed_4", "taunt", true),
			r4_range = caster:GetTalentValue("modifier_abaddon_borrowed_4", "range", true),

			has_r7 = 0,
			r7_duration_inc = caster:GetTalentValue("modifier_abaddon_borrowed_7", "duration_inc", true) / 100,
			r7_heal = caster:GetTalentValue("modifier_abaddon_borrowed_7", "heal", true) / 100,

			has_h6 = 0,
			h6_status = caster:GetTalentValue("modifier_abaddon_hero_6", "status", true),
			h6_duration = caster:GetTalentValue("modifier_abaddon_hero_6", "duration", true),
		}
	end

	if caster:HasTalent("modifier_abaddon_borrowed_1") then
		self.talents.has_r1 = 1
		self.talents.r1_armor = caster:GetTalentValue("modifier_abaddon_borrowed_1", "armor")
		self.talents.r1_damage = caster:GetTalentValue("modifier_abaddon_borrowed_1", "damage")
	end

	if caster:HasTalent("modifier_abaddon_borrowed_2") then
		self.talents.r2_heal_inc = caster:GetTalentValue("modifier_abaddon_borrowed_2", "heal_inc")
		self.talents.r2_heal = caster:GetTalentValue("modifier_abaddon_borrowed_2", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_abaddon_borrowed_2", type = 2, value = self.talents.r2_heal }
		)
	end

	if caster:HasTalent("modifier_abaddon_borrowed_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_abaddon_borrowed_3", "damage")
		self.talents.r3_heal = caster:GetTalentValue("modifier_abaddon_borrowed_3", "heal") / 100
		caster:AddProc(self.tracker, { land = true })
		caster:AddLifesteal(self.tracker, {
			name = "modifier_abaddon_borrowed_3",
			text = true,
			proc = "LifestealRecord",
			value = function(params)
				if not params.record then
					return 0
				end
				if params.record ~= self.tracker.record then
					return 0
				end
				return self.talents.r3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_abaddon_borrowed_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_abaddon_borrowed_7") then
		self.talents.has_r7 = 1
		caster:AddLifesteal(self.tracker, {
			name = "modifier_abaddon_borrowed_7",
			type = 2,
			text = true,
			effect = false,
			proc = "LifestealBeam",
			value = function()
				return caster:HasModifier("modifier_abaddon_borrowed_time_custom") and self.talents.r7_heal or 0
			end,
		})
	end

	if caster:HasTalent("modifier_abaddon_hero_6") then
		self.talents.has_h6 = 1
	end
end

function abaddon_borrowed_time_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "abaddon_borrowed_time", self)
end

function abaddon_borrowed_time_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_abaddon_borrowed_time_custom_tracker"
end

function abaddon_borrowed_time_custom:GetProcMax()
	return self:GetCooldownTimeRemaining() > 0 and self.talents.r3_max_inc or self.talents.r3_max
end

function abaddon_borrowed_time_custom:OnSpellStart()
	local duration = self.duration + (self.talents.has_h6 == 1 and self.talents.h6_duration or 0)
	if self.talents.has_r7 == 1 then
		duration = duration * (1 + self.talents.r7_duration_inc)
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_abaddon_borrowed_time_custom", { duration = duration })
	self.caster:Purge(false, true, false, true, true)
end

modifier_abaddon_borrowed_time_custom = class(mod_visible)
function modifier_abaddon_borrowed_time_custom:GetEffectName()
	return "particles/units/heroes/hero_abaddon/abaddon_borrowed_time.vpcf"
end
function modifier_abaddon_borrowed_time_custom:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_abaddon_borrowed_time_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_abaddon_borrowed_time.vpcf"
end
function modifier_abaddon_borrowed_time_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_abaddon_borrowed_time_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	if not IsServer() then
		return
	end
	self.ability:EndCd()
	self.parent:EmitSound("Hero_Abaddon.BorrowedTime")

	if self.ability.talents.has_h6 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self:GetRemainingTime() }
		)
		self.parent:GenericParticle("particles/abaddon/borrowed_bkb.vpcf", self)
	end
end

function modifier_abaddon_borrowed_time_custom:DamageLogic(params)
	if not IsServer() then
		return
	end
	if
		self.parent:HasModifier("modifier_death")
		and not self.parent:HasModifier("modifier_axe_culling_blade_custom_aegis")
	then
		return 0
	end

	local attacker = params.attacker
	local damage = params.damage

	if not attacker then
		return 0
	end
	if damage <= 0 then
		return 0
	end

	if attacker:IsBuilding() then
		return 1
	end

	if
		self.parent:GetQuest() == "Abaddon.Quest_8"
		and not self.parent:QuestCompleted()
		and attacker:IsHero()
		and attacker ~= self.parent
	then
		self.parent:UpdateQuest(math.min(damage, (self.parent:GetMaxHealth() - self.parent:GetHealth())))
	end

	if self.ability.talents.has_r7 == 0 then
		local heal_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_abaddon/abaddon_borrowed_time_heal.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			heal_particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(heal_particle, 1, attacker:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(heal_particle)

		self.parent:GenericHeal(damage, self.ability, true, "")
	end
	return 1
end

function modifier_abaddon_borrowed_time_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_abaddon_borrowed_time_custom:GetModifierAttackRangeBonus()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_range
end

function modifier_abaddon_borrowed_time_custom:GetModifierHealChange()
	return self.ability.talents.r2_heal_inc
end

function modifier_abaddon_borrowed_time_custom:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.r2_heal_inc
end

function modifier_abaddon_borrowed_time_custom:GetAbsoluteNoDamagePhysical(params)
	return self:DamageLogic(params)
end

function modifier_abaddon_borrowed_time_custom:GetAbsoluteNoDamageMagical(params)
	return self:DamageLogic(params)
end

function modifier_abaddon_borrowed_time_custom:GetAbsoluteNoDamagePure(params)
	return self:DamageLogic(params)
end

function modifier_abaddon_borrowed_time_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if not self.parent:HasShard() then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_abaddon_borrowed_time_custom_heal",
		{ duration = self.ability.shard_duration }
	)
end

modifier_abaddon_borrowed_time_custom_tracker = class(mod_hidden)
function modifier_abaddon_borrowed_time_custom_tracker:IsAura()
	return IsServer() and self.parent:IsAlive() and self.ability.talents.has_r1 == 1
end
function modifier_abaddon_borrowed_time_custom_tracker:GetAuraRadius()
	return self.ability.talents.r1_radius
end
function modifier_abaddon_borrowed_time_custom_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_abaddon_borrowed_time_custom_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_abaddon_borrowed_time_custom_tracker:GetModifierAura()
	return "modifier_abaddon_borrowed_time_custom_aura"
end
function modifier_abaddon_borrowed_time_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.borrowed_time = self.ability
	self.parent.borrowed_legendary_ability = self.parent:FindAbilityByName("abaddon_borrowed_time_custom_legendary")

	if IsValid(self.parent.borrowed_legendary_ability) then
		if IsServer() and not self.parent.borrowed_legendary_ability:IsTrained() then
			self.parent.borrowed_legendary_ability:SetLevel(1)
		end
		self.parent.borrowed_legendary_ability:UpdateTalents()
	end

	self.ability.hp_threshold = self.ability:GetSpecialValueFor("hp_threshold")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.shard_heal = self.ability:GetSpecialValueFor("shard_heal")
	self.ability.shard_duration = self.ability:GetSpecialValueFor("shard_duration")

	self.record = nil
	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_abaddon_borrowed_time_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_abaddon_borrowed_time_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MIN_HEALTH,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_abaddon_borrowed_time_custom_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.r1_damage
end

function modifier_abaddon_borrowed_time_custom_tracker:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_status
end

function modifier_abaddon_borrowed_time_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if not IsValid(self.parent) then
		return
	end
	if not self.parent:HasModifier("modifier_abaddon_borrowed_time_custom_proc") then
		return
	end
	return self.ability.talents.r3_damage
end

function modifier_abaddon_borrowed_time_custom_tracker:CheckState()
	if not IsValid(self.parent) then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end
	if not self.parent:HasModifier("modifier_abaddon_borrowed_time_custom_proc") then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_abaddon_borrowed_time_custom_tracker:GetProcChance()
	return 100
end

function modifier_abaddon_borrowed_time_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_r4 == 1 then
		local mod = self.parent:FindModifierByName("modifier_abaddon_borrowed_time_custom")
		if mod and not mod.taunt_proc then
			mod.taunt_proc = true
			self.parent:GenericParticle("particles/abaddon/coil_legendary_cast.vpcf")
			local particle_2 =
				ParticleManager:CreateParticle("particles/abaddon/curse_proc.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
			ParticleManager:SetParticleControlEnt(
				particle_2,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				particle_2,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle_2)
			target:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(self.ability, true),
				"modifier_generic_taunt",
				{ duration = self.ability.talents.r4_taunt * (1 - target:GetStatusResistance()) }
			)
		end

		if self.ability:IsActivated() then
			local cd = self.ability.talents.has_r7 == 1 and self.ability.talents.r4_cd_inc_legendary
				or self.ability.talents.r4_cd_inc
			self.parent:CdAbility(self.ability, nil, cd, "modifier_abaddon_borrowed_4")
		end
	end

	if self.ability.talents.has_r3 == 0 then
		return
	end
	self.record = nil
	local mod = self.parent:FindModifierByName("modifier_abaddon_borrowed_time_custom_proc")

	if mod and not mod.proced then
		local effect_cast =
			ParticleManager:CreateParticle("particles/abaddon/ulti_attack.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControl(effect_cast, 0, target:GetAbsOrigin() + Vector(0, 0, 64))
		ParticleManager:SetParticleControl(effect_cast, 1, self.parent:GetOrigin() + Vector(0, 0, 64))
		ParticleManager:SetParticleControlForward(
			effect_cast,
			3,
			(target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		target:EmitSound("Abaddon.Borrowed_attack")
		target:EmitSound("Abaddon.Borrowed_attack2")

		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			self.ability.talents.r3_cleave * params.damage,
			150,
			360,
			450,
			""
		)
		self.record = params.record
		mod.proced = true
		Timers:CreateTimer(FrameTime(), function()
			if IsValid(mod) then
				mod:Destroy()
			end
		end)
	else
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_abaddon_borrowed_time_custom_proc_count",
			{ duration = self.ability.talents.r3_duration }
		)
	end
end

function modifier_abaddon_borrowed_time_custom_tracker:GetAccuracyChance()
	if self.ability.talents.has_r3 == 0 then
		return 0
	end
	return 100 / self.ability:GetProcMax()
end

function modifier_abaddon_borrowed_time_custom_tracker:LifestealRecord()
	self.record = nil
end

function modifier_abaddon_borrowed_time_custom_tracker:LifestealBeam(params)
	local heal_particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_abaddon/abaddon_borrowed_time_heal.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		heal_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(heal_particle, 1, params.unit:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(heal_particle)
end

function modifier_abaddon_borrowed_time_custom_tracker:GetMinHealth()
	if not self.parent:HasShard() then
		return
	end
	if not self.ability:IsFullyCastable() then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	return 1
end

function modifier_abaddon_borrowed_time_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not self.ability:IsFullyCastable() then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if not params.attacker then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:GetHealth() > self.ability.hp_threshold then
		return
	end
	if self.parent:PassivesDisabled() and not self.parent:HasShard() then
		return
	end

	self.ability:OnSpellStart()
	self.ability:UseResources(false, false, false, true)
end

modifier_abaddon_borrowed_time_custom_aura = class(mod_hidden)
function modifier_abaddon_borrowed_time_custom_aura:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self:StartIntervalThink(1)
end

function modifier_abaddon_borrowed_time_custom_aura:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_abaddon_borrowed_time_custom_aura_armor",
		{ duration = self.ability.talents.r1_duration }
	)
end

modifier_abaddon_borrowed_time_custom_aura_armor = class(mod_visible)
function modifier_abaddon_borrowed_time_custom_aura_armor:GetTexture()
	return "buffs/abaddon/borrowed_1"
end
function modifier_abaddon_borrowed_time_custom_aura_armor:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_abaddon_borrowed_time_custom_aura_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_abaddon_borrowed_time_custom_aura_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_abaddon_borrowed_time_custom_aura_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.ability.talents.r1_armor / self.max
end

modifier_abaddon_borrowed_time_custom_heal = class(mod_hidden)
function modifier_abaddon_borrowed_time_custom_heal:GetEffectName()
	return "particles/abaddon/ulti_heal.vpcf"
end
function modifier_abaddon_borrowed_time_custom_heal:GetStatusEffectName()
	return "particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf"
end
function modifier_abaddon_borrowed_time_custom_heal:StatusEffectPriority()
	return MODIFIER_PRIORITY_LOW
end
function modifier_abaddon_borrowed_time_custom_heal:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.heal = self.ability.shard_heal
	self.duration = self.ability.shard_duration
	self.regen = self.heal / self.duration

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Abaddon.Borrowed_heal")
end

function modifier_abaddon_borrowed_time_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_abaddon_borrowed_time_custom_heal:GetModifierHealthRegenPercentage()
	return self.regen
end

modifier_abaddon_borrowed_time_custom_proc = class(mod_visible)
function modifier_abaddon_borrowed_time_custom_proc:GetTexture()
	return "buffs/abaddon/borrowed_3"
end
function modifier_abaddon_borrowed_time_custom_proc:OnCreated()
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

modifier_abaddon_borrowed_time_custom_proc_count = class(mod_visible)
function modifier_abaddon_borrowed_time_custom_proc_count:GetTexture()
	return "buffs/abaddon/borrowed_3"
end
function modifier_abaddon_borrowed_time_custom_proc_count:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_abaddon_borrowed_time_custom_proc_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() < (self.ability:GetProcMax() - 1) then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_abaddon_borrowed_time_custom_proc",
		{ duration = self.ability.talents.r3_duration }
	)
	self:Destroy()
end

abaddon_borrowed_time_custom_legendary = class({})
abaddon_borrowed_time_custom_legendary.talents = {}

function abaddon_borrowed_time_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r7 = 0,
			r7_talent_cd = caster:GetTalentValue("modifier_abaddon_borrowed_7", "talent_cd", true),
			r7_radius = caster:GetTalentValue("modifier_abaddon_borrowed_7", "radius", true),
			r7_damage = caster:GetTalentValue("modifier_abaddon_borrowed_7", "damage", true) / 100,
			r7_duration = caster:GetTalentValue("modifier_abaddon_borrowed_7", "duration", true),
			r7_knock_dist = caster:GetTalentValue("modifier_abaddon_borrowed_7", "knock_dist", true),
			r7_knock_duration = caster:GetTalentValue("modifier_abaddon_borrowed_7", "knock_duration", true),
			r7_damage_type = caster:GetTalentValue("modifier_abaddon_borrowed_7", "damage_type", true),
		}
	end

	if caster:HasTalent("modifier_abaddon_borrowed_7") then
		self.talents.has_r7 = 1
	end
end

function abaddon_borrowed_time_custom_legendary:GetCooldown(iLevel)
	return self.talents.r7_talent_cd or 0
end

function abaddon_borrowed_time_custom_legendary:CastFilterResultTarget(target)
	if not IsServer() then
		return
	end
	if target.isboss then
		return UF_FAIL_OTHER
	end
	return UnitFilter(
		target,
		self:GetAbilityTargetTeam(),
		self:GetAbilityTargetType(),
		self:GetAbilityTargetFlags(),
		self.caster:GetTeamNumber()
	)
end

function abaddon_borrowed_time_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function abaddon_borrowed_time_custom_legendary:OnSpellStart()
	if self.talents.has_r7 == 0 then
		return
	end
	local target = self:GetCursorTarget()

	local particle = ParticleManager:CreateParticle(
		"particles/abaddon/ulti_legendary_cast.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
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
	ParticleManager:ReleaseParticleIndex(particle)

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local duration = self.talents.r7_duration

	target:EmitSound("Abaddon.Borrowed_legendary_cast")
	target:EmitSound("Abaddon.Borrowed_legendary_knock")
	self.caster:EmitSound("Abaddon.Borrowed_legendary_cast2")

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_abaddon_borrowed_time_custom_legendary_caster",
		{ duration = duration, target = target:entindex() }
	)
	target:AddNewModifier(self.caster, self, "modifier_abaddon_borrowed_time_custom_legendary", { duration = duration })
end

modifier_abaddon_borrowed_time_custom_legendary = class(mod_visible)
function modifier_abaddon_borrowed_time_custom_legendary:GetEffectName()
	return "particles/abaddon/ulti_legendary_head.vpcf"
end
function modifier_abaddon_borrowed_time_custom_legendary:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_abaddon_borrowed_time_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true

	self.radius = self.ability.talents.r7_radius
	self.knock_dist = self.ability.talents.r7_knock_dist
	self.knockback_duration = self.ability.talents.r7_knock_duration

	if not IsServer() then
		return
	end

	self.pfx = ParticleManager:CreateParticle(
		"particles/abaddon/ulti_legendary_link.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.pfx, false, false, -1, false, false)

	self.pfx2 =
		ParticleManager:CreateParticle("particles/abaddon/ulti_legendary.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.pfx2,
		2,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.pfx2, false, false, -1, false, false)

	self:StartIntervalThink(FrameTime())
end

function modifier_abaddon_borrowed_time_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	if
		not self.caster:HasModifier("modifier_abaddon_borrowed_time_custom_legendary_caster")
		or not self.parent:IsAlive()
	then
		self:Destroy()
		return
	end

	if self.parent:HasModifier("modifier_abaddon_borrowed_time_custom_legendary_knock") then
		return
	end
	if self.parent:IsInvulnerable() or self.parent:IsOutOfGame() then
		return
	end

	local center = self.caster:GetAbsOrigin()

	if (self.parent:GetAbsOrigin() - center):Length2D() <= self.radius then
		return
	end

	local vec = (self.parent:GetAbsOrigin() - center):Normalized()
	local knock_point = center + vec * self.knock_dist

	self.parent:EmitSound("Abaddon.Borrowed_legendary_knock")
	self.parent:EmitSound("Abaddon.Borrowed_legendary_knock2")

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_abaddon_borrowed_time_custom_legendary_knock",
		{ duration = self.knockback_duration, x = knock_point.x, y = knock_point.y }
	)
end

function modifier_abaddon_borrowed_time_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.caster:RemoveModifierByName("modifier_abaddon_borrowed_time_custom_legendary_caster")
end

function modifier_abaddon_borrowed_time_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_abaddon_borrowed_time_custom_legendary_knock = class(mod_hidden)
function modifier_abaddon_borrowed_time_custom_legendary_knock:OnCreated(params)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.parent:StartGesture(ACT_DOTA_FLAIL)

	self.knockback_duration = self:GetRemainingTime()
	self.position = GetGroundPosition(Vector(params.x, params.y, 0), nil)
	self.knockback_distance = (self.parent:GetAbsOrigin() - self.position):Length2D()

	self.knockback_speed = self.knockback_distance / self.knockback_duration

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
		return
	end
end

function modifier_abaddon_borrowed_time_custom_legendary_knock:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local distance = (self.position - me:GetOrigin()):Normalized()
	me:SetOrigin(me:GetOrigin() + distance * self.knockback_speed * dt)

	GridNav:DestroyTreesAroundPoint(self.parent:GetOrigin(), self.parent:GetHullRadius(), true)
end

function modifier_abaddon_borrowed_time_custom_legendary_knock:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_abaddon_borrowed_time_custom_legendary_knock:GetOverrideAnimation()
	return ACT_DOTA_FLAIL
end

function modifier_abaddon_borrowed_time_custom_legendary_knock:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveHorizontalMotionController(self)
	self.parent:FadeGesture(ACT_DOTA_FLAIL)
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), true)
end

modifier_abaddon_borrowed_time_custom_legendary_caster = class(mod_visible)
function modifier_abaddon_borrowed_time_custom_legendary_caster:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self.damage = self.ability.talents.r7_damage

	self.caster:AddHealEvent_inc(self, true)

	self.target = EntIndexToHScript(kv.target)
	self.ability:EndCd()
	self:StartIntervalThink(0.1)
end

function modifier_abaddon_borrowed_time_custom_legendary_caster:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

function modifier_abaddon_borrowed_time_custom_legendary_caster:OnIntervalThink()
	if not IsServer() then
		return
	end
	if IsValid(self.target) and self.target:IsAlive() then
		return
	end
	self:Destroy()
end

function modifier_abaddon_borrowed_time_custom_legendary_caster:HealEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.caster ~= params.unit then
		return
	end
	if not IsValid(self.target) or not self.target:IsAlive() then
		return
	end

	local gain = params.gain
	local damage = self.damage * gain

	if damage >= 100 then
		self.target:EmitSound("Abaddon.Borrowed_legendary_damage")
		local pfx = ParticleManager:CreateParticle(
			"particles/abaddon/ulti_legendary_proc.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.target
		)
		ParticleManager:SetParticleControlEnt(
			pfx,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			pfx,
			1,
			self.target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(pfx)
	end

	DoDamage(
		{
			victim = self.target,
			attacker = self.caster,
			ability = self.ability,
			damage = damage,
			damage_type = self.ability.talents.r7_damage_type,
			damage_flags = DOTA_DAMAGE_FLAG_REFLECTION,
		},
		"modifier_abaddon_borrowed_7"
	)
end