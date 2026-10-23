--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_slark_innate_custom", "abilities/slark/slark_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_slark_innate_custom_caster",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_slark_innate_custom_target",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_slark_innate_custom_perma",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	false
)
LinkLuaModifier("modifier_slark_innate_custom_double", "abilities/slark/slark_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_slark_innate_custom_double_attack",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_innate_custom_double_cd",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_essence_3"
)
LinkLuaModifier(
	"modifier_slark_innate_custom_double_slow",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_innate_custom_silence_cd",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_essence_4"
)
LinkLuaModifier(
	"modifier_slark_innate_custom_burn",
	"abilities/slark/slark_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_dance_3"
)

slark_innate_custom = class({})
slark_innate_custom.talents = {}

function slark_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_slark.vsndevts", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_regen.vpcf", context)
	PrecacheResource("particle", "particles/slark/dance_bleed.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_slark", context)
end

function slark_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w7 = 0,
			w7_spell = caster:GetTalentValue("modifier_slark_pounce_7", "spell", true),
			w7_pact = caster:GetTalentValue("modifier_slark_pounce_7", "pact", true),

			has_e1 = 0,
			e1_agi = 0,
			e1_range = 0,

			has_e2 = 0,
			e2_cleave = 0,

			has_e3 = 0,
			e3_attacks = 0,
			e3_damage = caster:GetTalentValue("modifier_slark_essence_3", "damage", true),
			e3_duration = caster:GetTalentValue("modifier_slark_essence_3", "duration", true),
			e3_slow = caster:GetTalentValue("modifier_slark_essence_3", "slow", true),
			e3_delay = caster:GetTalentValue("modifier_slark_essence_3", "delay", true),
			e3_cd = caster:GetTalentValue("modifier_slark_essence_3", "cd", true),

			has_e4 = 0,
			e4_silence = caster:GetTalentValue("modifier_slark_essence_4", "silence", true),
			e4_talent_cd = caster:GetTalentValue("modifier_slark_essence_4", "talent_cd", true),
			e4_max = caster:GetTalentValue("modifier_slark_essence_4", "max", true),
			e4_duration = caster:GetTalentValue("modifier_slark_essence_4", "duration", true),

			has_r1 = 0,
			r1_armor = 0,
			r1_max = caster:GetTalentValue("modifier_slark_dance_1", "max", true),

			has_r3 = 0,
			r3_burn = 0,
			r3_damage = 0,
			r3_interval = caster:GetTalentValue("modifier_slark_dance_3", "interval", true),
			r3_duration = caster:GetTalentValue("modifier_slark_dance_3", "duration", true),
			r3_bonus = caster:GetTalentValue("modifier_slark_dance_3", "bonus", true) / 100,
			r3_damage_type = caster:GetTalentValue("modifier_slark_dance_3", "damage_type", true),

			has_r4 = 0,

			has_h5 = 0,
			h5_bonus = caster:GetTalentValue("modifier_slark_hero_5", "bonus", true),
			h5_max = caster:GetTalentValue("modifier_slark_hero_5", "max", true),
			h5_status = caster:GetTalentValue("modifier_slark_hero_5", "status", true),
			h5_str = caster:GetTalentValue("modifier_slark_hero_5", "str", true),
		}
	end

	if caster:HasTalent("modifier_slark_pounce_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_slark_essence_1") then
		self.talents.has_e1 = 1
		self.talents.e1_agi = caster:GetTalentValue("modifier_slark_essence_1", "agi")
		self.talents.e1_range = caster:GetTalentValue("modifier_slark_essence_1", "range")
	end

	if caster:HasTalent("modifier_slark_essence_2") then
		self.talents.has_e2 = 1
		self.talents.e2_cleave = caster:GetTalentValue("modifier_slark_essence_2", "cleave")
	end

	if caster:HasTalent("modifier_slark_essence_3") then
		self.talents.has_e3 = 1
		self.talents.e3_attacks = caster:GetTalentValue("modifier_slark_essence_3", "attacks")
	end

	if caster:HasTalent("modifier_slark_essence_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_slark_dance_1") then
		self.talents.has_r1 = 1
		self.talents.r1_armor = caster:GetTalentValue("modifier_slark_dance_1", "armor") / self.talents.r1_max
	end

	if caster:HasTalent("modifier_slark_dance_3") then
		self.talents.has_r3 = 1
		self.talents.r3_burn = caster:GetTalentValue("modifier_slark_dance_3", "burn") / 100
		self.talents.r3_damage = caster:GetTalentValue("modifier_slark_dance_3", "damage")
	end

	if caster:HasTalent("modifier_slark_dance_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_slark_hero_5") then
		self.talents.has_h5 = 1
	end
end

function slark_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_slark_innate_custom"
end

function slark_innate_custom:AddStack(target)
	if not IsServer() then
		return
	end

	local duration = self.duration
	if self.talents.has_e4 == 1 then
		duration = duration + self.talents.e4_duration
	end
	if target:IsCreep() or target:IsIllusion() then
		duration = self.duration_creeps
	end

	if target:IsHero() then
		target:AddNewModifier(self.caster, self, "modifier_slark_innate_custom_target", { duration = duration })
	end

	local mod = self.caster:FindModifierByName("modifier_slark_innate_custom_caster")
	if mod and mod:GetRemainingTime() > duration then
		mod:AddStack(duration)
		return
	end
	self.caster:AddNewModifier(self.caster, self, "modifier_slark_innate_custom_caster", { duration = duration })
end

modifier_slark_innate_custom = class(mod_hidden)
function modifier_slark_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.essence_ability = self.ability

	self.ability.agi_gain = self.ability:GetSpecialValueFor("agi_gain")
	self.ability.stat_loss = self.ability:GetSpecialValueFor("stat_loss")
	self.ability.perma_agi = self.ability:GetSpecialValueFor("perma_agi")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.duration_creeps = self.ability:GetSpecialValueFor("duration_creeps")
	self.ability.steal_max = self.ability:GetSpecialValueFor("steal_max")

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true })
end

function modifier_slark_innate_custom:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_slark_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_slark_innate_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_status
		* (
			self.parent:GetUpgradeStack("modifier_slark_innate_custom_caster") >= self.ability.talents.h5_max
				and self.ability.talents.h5_bonus
			or 1
		)
end

function modifier_slark_innate_custom:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.r3_damage
end

function modifier_slark_innate_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.e1_range
end

function modifier_slark_innate_custom:GetProcChance()
	return 100
end

function modifier_slark_innate_custom:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_e2 == 1 then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			self.ability.talents.e2_cleave * params.damage / 100,
			150,
			360,
			650,
			"particles/slark/essence_cleave.vpcf"
		)
	end

	local mod = target:FindModifierByName("modifier_slark_saltwater_shiv_custom_legendary_target")
	if mod then
		mod:AddStack()
	end

	if
		not params.no_attack_cooldown
		and self.ability.talents.has_e3 == 1
		and not self.parent:HasModifier("modifier_slark_innate_custom_double_cd")
	then
		self.parent:AddNewModifier(
			self.parent,
			nil,
			"modifier_slark_innate_custom_double_cd",
			{ cd = self.ability.talents.e3_cd }
		)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_slark_innate_custom_double_slow",
			{ duration = self.ability.talents.e3_duration * (1 - target:GetStatusResistance()) }
		)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_slark_innate_custom_double",
			{ duration = self.ability.talents.e3_delay, stack = self.ability.talents.e3_attacks - 1 }
		)
	end

	if self.ability.talents.has_r3 == 1 then
		local damage = params.damage * self.ability.talents.r3_burn
		if self.parent:HasModifier("modifier_slark_shadow_dance_custom_effect") then
			damage = damage * (1 + self.ability.talents.r3_bonus)
		end
		target:AddNewModifier(self.parent, self.ability, "modifier_slark_innate_custom_burn", { damage = damage })
	end

	if self.ability.talents.has_r4 == 1 and self.parent:HasModifier("modifier_slark_shadow_dance_custom_effect") then
		local unit = self.parent
		local ulti = self.parent:FindModifierByName("modifier_slark_shadow_dance_custom")
		if ulti and ulti.dummy then
			unit = ulti.dummy
		end
		for i = 1, 2 do
			local particle = ParticleManager:CreateParticle(
				"particles/void_spirit/void_mark_hit.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				unit
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				1,
				params.target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				Vector(0, 0, 0),
				true
			)
			ParticleManager:DestroyParticle(particle, false)
			ParticleManager:ReleaseParticleIndex(particle)
		end
	end

	if target:IsIllusion() then
		return
	end
	if self.parent:PassivesDisabled() and self.ability.talents.has_e4 == 0 then
		return
	end

	local dance_mod = self.parent:FindModifierByName("modifier_slark_shadow_dance_custom")

	local pfx_particle = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_slark/slark_essence_shift.vpcf",
		self.ability,
		"slark_innate_custom"
	)
	local effect_cast = ParticleManager:CreateParticle(pfx_particle, PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)

	if params.no_attack_cooldown then
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
	else
		if dance_mod and dance_mod.dummy then
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				1,
				dance_mod.dummy,
				PATTACH_POINT_FOLLOW,
				nil,
				dance_mod.dummy:GetAbsOrigin(),
				true
			)
		else
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				1,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
		end
	end

	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.ability:AddStack(target)
end

function modifier_slark_innate_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_slark_innate_custom_perma")
end

modifier_slark_innate_custom_caster = class(mod_visible)
function modifier_slark_innate_custom_caster:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.agi = self.ability.agi_gain

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:AddStack(table.duration)
end

function modifier_slark_innate_custom_caster:AddStack(duration)
	if not IsServer() then
		return
	end

	Timers:CreateTimer(duration, function()
		if self and not self:IsNull() then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_innate_custom_caster:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.duration)
end

function modifier_slark_innate_custom_caster:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)

	if self.ability.talents.has_h5 == 0 then
		return
	end

	if self:GetStackCount() >= self.ability.talents.h5_max and not self.particle then
		self.particle = self.parent:GenericParticle("particles/slark/essence_resist.vpcf", self)
	end

	if self:GetStackCount() < self.ability.talents.h5_max and self.particle then
		ParticleManager:DestroyParticle(self.particle, false)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end
end

function modifier_slark_innate_custom_caster:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_innate_custom_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_slark_innate_custom_caster:GetModifierPhysicalArmorBonus()
	return self.ability.talents.r1_armor * math.min(self.ability.talents.r1_max, self:GetStackCount())
end

function modifier_slark_innate_custom_caster:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_w7 == 0 then
		return
	end
	return self.ability.talents.w7_spell * self:GetStackCount()
end

function modifier_slark_innate_custom_caster:OnTooltip()
	if self.ability.talents.has_w7 == 0 then
		return
	end
	return self.ability.talents.w7_pact * self:GetStackCount()
end

function modifier_slark_innate_custom_caster:GetModifierBonusStats_Agility()
	local bonus = self.agi
	if self.ability.talents.has_w7 == 1 then
		bonus = 0
	end
	return (bonus + self.ability.talents.e1_agi) * self:GetStackCount()
end

function modifier_slark_innate_custom_caster:GetModifierBonusStats_Strength()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_str * math.min(self.ability.talents.h5_max, self:GetStackCount())
end

modifier_slark_innate_custom_target = class(mod_visible)
function modifier_slark_innate_custom_target:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.stats = self.ability.stat_loss

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:AddStack(table.duration)
end

function modifier_slark_innate_custom_target:AddStack(duration)
	if not IsServer() then
		return
	end

	Timers:CreateTimer(duration, function()
		if self and not self:IsNull() then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self:IncrementStackCount()

	if
		self.ability.talents.has_e4 == 1
		and not self.parent:HasModifier("modifier_slark_innate_custom_silence_cd")
		and not self.parent:IsDebuffImmune()
		and self:GetStackCount() >= self.ability.talents.e4_max
	then
		self.parent:EmitSound("Slark.Essence_stun")
		self.parent:EmitSound("Slark.Essence_silence")
		local dir = (self.parent:GetAbsOrigin() - self.caster:GetAbsOrigin()):Normalized()
		dir.z = 0

		local effect_cast =
			ParticleManager:CreateParticle("particles/slark/essence_stun.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(effect_cast, 1, self.caster:GetOrigin() + Vector(0, 0, 64))
		ParticleManager:SetParticleControlForward(effect_cast, 3, dir)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		local mod = self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_generic_silence",
			{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.e4_silence }
		)
		if mod then
			self.parent:GenericParticle("particles/units/heroes/hero_slark/slark_fish_bait_slow.vpcf", mod)
		end
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_slark_innate_custom_silence_cd",
			{ duration = self.ability.talents.e4_talent_cd }
		)
	end

	self.parent:CalculateStatBonus(true)
end

function modifier_slark_innate_custom_target:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.duration)
end

function modifier_slark_innate_custom_target:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_innate_custom_target:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_slark_innate_custom_target:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_slark_innate_custom_target:GetModifierPhysicalArmorBonus()
	return -1 * self.ability.talents.r1_armor * math.min(self.ability.talents.r1_max, self:GetStackCount())
end

function modifier_slark_innate_custom_target:GetModifierBonusStats_Agility()
	return self.stats * self:GetStackCount()
end

function modifier_slark_innate_custom_target:GetModifierBonusStats_Strength()
	return self.stats * self:GetStackCount()
end

function modifier_slark_innate_custom_target:GetModifierBonusStats_Intellect()
	return self.stats * self:GetStackCount()
end

modifier_slark_innate_custom_perma = class(mod_visible)
function modifier_slark_innate_custom_perma:RemoveOnDeath()
	return false
end
function modifier_slark_innate_custom_perma:GetTexture()
	return "slark_essence_shift"
end
function modifier_slark_innate_custom_perma:OnCreated(table)
	self.parent = self:GetParent()

	self.ability = self.parent.essence_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.max = self.ability.steal_max
	self.agi = self.ability.perma_agi
	if not IsServer() then
		return
	end
	self:SetStackCount(1)
end

function modifier_slark_innate_custom_perma:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_slark_innate_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	}
end

function modifier_slark_innate_custom_perma:GetModifierBonusStats_Agility()
	return self.agi * self:GetStackCount()
end

modifier_slark_innate_custom_double = class(mod_hidden)
function modifier_slark_innate_custom_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_slark_innate_custom_double:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.stack = table.stack

	if not self.caster:HasModifier("modifier_slark_dark_pact_custom") then
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2)
	end

	local dir = (self.parent:GetOrigin() - self.caster:GetOrigin()):Normalized()

	self.caster:EmitSound("Slark.Essence_double")

	local particle =
		ParticleManager:CreateParticle("particles/slark/essence_double.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(particle, 1, dir)
	ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
	ParticleManager:SetParticleControlForward(particle, 5, dir)
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_slark_innate_custom_double:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster) then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_slark_innate_custom_double_attack",
		{ duration = FrameTime() }
	)
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, false)
	self.caster:RemoveModifierByName("modifier_slark_innate_custom_double_attack")

	local hit_effect =
		ParticleManager:CreateParticle("particles/slark/essence_double_hit.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)
	self.stack = self.stack - 1
	if self.stack <= 0 then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_slark_innate_custom_double",
		{ duration = self.ability.talents.e3_delay, stack = self.stack }
	)
end

modifier_slark_innate_custom_double_cd = class(mod_cd)
function modifier_slark_innate_custom_double_cd:GetTexture()
	return "buffs/slark/essence_3"
end
function modifier_slark_innate_custom_double_cd:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()

	self.RemoveForDuel = true
	self:SetStackCount(table.cd)
	self:StartIntervalThink(1)
end

function modifier_slark_innate_custom_double_cd:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:ReduceCd(1)
end

function modifier_slark_innate_custom_double_cd:ReduceCd(cd)
	if not IsServer() then
		return
	end

	for i = 1, cd do
		self:DecrementStackCount()
		if self:GetStackCount() <= 0 then
			self:Destroy()
			return
		end
	end
end

modifier_slark_innate_custom_double_slow = class(mod_hidden)
function modifier_slark_innate_custom_double_slow:IsPurgable()
	return true
end
function modifier_slark_innate_custom_double_slow:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.slow = self.ability.talents.e3_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", self, true)
end

function modifier_slark_innate_custom_double_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_slark_innate_custom_double_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_slark_innate_custom_double_attack = class(mod_hidden)
function modifier_slark_innate_custom_double_attack:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.e3_damage - 100
end

function modifier_slark_innate_custom_double_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_slark_innate_custom_double_attack:GetModifierDamageOutgoing_Percentage()
	return self.damage
end

modifier_slark_innate_custom_silence_cd = class(mod_hidden)
function modifier_slark_innate_custom_silence_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_slark_innate_custom_burn = class(mod_hidden)
function modifier_slark_innate_custom_burn:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.duration = self.ability.talents.r3_duration
	self.interval = self.ability.talents.r3_interval
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.r3_damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}

	self.effect =
		ParticleManager:CreateParticle("particles/slark/dance_bleed.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.RemoveForDuel = true
	self:AddStack(table.damage)
	self:StartIntervalThink(self.interval)
end

function modifier_slark_innate_custom_burn:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.damage)
end

function modifier_slark_innate_custom_burn:AddStack(damage)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration
	self.damageTable.damage = self.tick
	ParticleManager:SetParticleControl(self.effect, 2, Vector(self.tick, 0, 0))
end

function modifier_slark_innate_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_slark_dance_3")
	self.parent:SendNumber(101, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end