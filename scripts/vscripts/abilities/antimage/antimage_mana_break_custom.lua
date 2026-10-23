--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_antimage_mana_break_custom",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_legendary",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_legendary_target",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_break_7"
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_target_effect",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_caster_effect",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_antimage_break_1", "modifier_antimage_break_3" }
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_stun_cd",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_break_4"
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_stats",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_hero_3"
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_haste",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_antimage_hero_6"
)
LinkLuaModifier(
	"modifier_antimage_mana_break_custom_haste_target",
	"abilities/antimage/antimage_mana_break_custom",
	LUA_MODIFIER_MOTION_NONE
)

antimage_mana_break_custom = class({})
antimage_mana_break_custom.talents = {}

function antimage_mana_break_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/antimage/am_no_mana.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/death_prophet/death_prophet_ti9/death_prophet_silence_custom_ti9_overhead_model.vpcf",
		context
	)
	PrecacheResource("particle", "particles/antimage/am_break_2.vpcf", context)
	PrecacheResource("particle", "particles/antimage/am_break_legendary.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/gleipnir_root.vpcf", context)
	PrecacheResource("particle", "particles/antimage/manabreak_cleave.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_manaburn.vpcf", context)
	PrecacheResource("particle", "particles/antimage/nomana_haste.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_keeper_of_the_light/keeper_of_the_light_mana_leak.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_keeper_of_the_light/keeper_mana_leak.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf", context)
	PrecacheResource("particle", "particles/antimage/am_mana_mark.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kez/status_effect_kez_afterimage_buff.vpcf", context)
end

function antimage_mana_break_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_armor = 0,
			q1_duration = caster:GetTalentValue("modifier_antimage_break_1", "duration", true),

			has_q2 = 0,
			q2_cleave = 0,
			q2_range = 0,

			has_q3 = 0,
			q3_speed = 0,
			q3_mana = 0,
			q3_duration = caster:GetTalentValue("modifier_antimage_break_3", "duration", true),

			has_q4 = 0,
			q4_stun = caster:GetTalentValue("modifier_antimage_break_4", "stun", true),
			q4_talent_cd = caster:GetTalentValue("modifier_antimage_break_4", "talent_cd", true),
			q4_heal_reduce = caster:GetTalentValue("modifier_antimage_break_4", "heal_reduce", true),
			q4_mana = caster:GetTalentValue("modifier_antimage_break_4", "mana", true),

			has_q7 = 0,
			q7_damage = caster:GetTalentValue("modifier_antimage_break_7", "damage", true),
			q7_duration = caster:GetTalentValue("modifier_antimage_break_7", "duration", true),
			q7_talent_cd = caster:GetTalentValue("modifier_antimage_break_7", "talent_cd", true),
			q7_status = caster:GetTalentValue("modifier_antimage_break_7", "status", true),

			h2_heal = 0,
			h2_bonus = caster:GetTalentValue("modifier_antimage_hero_2", "bonus", true),
			h2_mana = caster:GetTalentValue("modifier_antimage_hero_2", "mana", true) / 100,

			has_h3 = 0,
			h3_stats_init = 0,
			h3_stats_inc = caster:GetTalentValue("modifier_antimage_hero_3", "stats_inc", true),
			h3_max = caster:GetTalentValue("modifier_antimage_hero_3", "max", true),
			h3_duration = caster:GetTalentValue("modifier_antimage_hero_3", "duration", true),

			has_h6 = 0,
			h6_duration = caster:GetTalentValue("modifier_antimage_hero_6", "duration", true),
			h6_radius = caster:GetTalentValue("modifier_antimage_hero_6", "radius", true),
			h6_move = caster:GetTalentValue("modifier_antimage_hero_6", "move", true),
			h6_mana = caster:GetTalentValue("modifier_antimage_hero_6", "mana", true),

			has_w2 = 0,
			w2_evasion = 0,
			w2_move = 0,
			w2_bonus = caster:GetTalentValue("modifier_antimage_blink_2", "bonus", true),

			has_w1 = 0,
			w1_damage = 0,
		}
	end

	if caster:HasTalent("modifier_antimage_break_1") then
		self.talents.has_q1 = 1
		self.talents.q1_armor = caster:GetTalentValue("modifier_antimage_break_1", "armor")
		caster:AddAttackRecordEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_antimage_break_2") then
		self.talents.has_q2 = 1
		self.talents.q2_cleave = caster:GetTalentValue("modifier_antimage_break_2", "cleave") / 100
		self.talents.q2_range = caster:GetTalentValue("modifier_antimage_break_2", "range")
	end

	if caster:HasTalent("modifier_antimage_break_3") then
		self.talents.has_q3 = 1
		self.talents.q3_speed = caster:GetTalentValue("modifier_antimage_break_3", "speed")
		self.talents.q3_mana = caster:GetTalentValue("modifier_antimage_break_3", "mana")
		caster:AddAttackRecordEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_antimage_break_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_antimage_break_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_antimage_hero_2") then
		self.talents.h2_heal = caster:GetTalentValue("modifier_antimage_hero_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_antimage_hero_2",
			value = function(params)
				if params.unit and self:GetManaK(params.unit) <= self.talents.h2_mana then
					return self.talents.h2_heal * self.talents.h2_bonus
				end
				return self.talents.h2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_antimage_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_stats_init = caster:GetTalentValue("modifier_antimage_hero_3", "stats_init")
		caster:AddAttackEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_antimage_hero_6") then
		self.talents.has_h6 = 1
		if IsServer() then
			local interval = caster:IsRealHero() and 0.5 or 1
			self.tracker:OnIntervalThink()
			self.tracker:StartIntervalThink(interval)
		end
	end

	if caster:HasTalent("modifier_antimage_blink_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_antimage_blink_1", "damage")
	end

	if caster:HasTalent("modifier_antimage_blink_2") then
		self.talents.has_w2 = 1
		self.talents.w2_evasion = caster:GetTalentValue("modifier_antimage_blink_2", "evasion")
		self.talents.w2_move = caster:GetTalentValue("modifier_antimage_blink_2", "move")
	end
end

function antimage_mana_break_custom:GetIntrinsicModifierName()
	return "modifier_antimage_mana_break_custom"
end

function antimage_mana_break_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "antimage_mana_break", self)
end

function antimage_mana_break_custom:GetCooldown(iLevel)
	return self.talents.has_q7 == 1 and self.talents.q7_talent_cd or 0
end

function antimage_mana_break_custom:GetBehavior()
	if self.talents.has_q7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function antimage_mana_break_custom:OnAbilityPhaseStart()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, 1.3)
	return true
end

function antimage_mana_break_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_2)
end

function antimage_mana_break_custom:OnSpellStart()
	self.caster:EmitSound("Antimage.Break_legendary")
	local target = self:GetCursorTarget()
	local stack = self.talents.q7_damage * (1 - self:GetManaK(target))

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_antimage_mana_break_custom_legendary",
		{ duration = self.talents.q7_duration, stack = stack }
	)
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_antimage_mana_break_custom_legendary_target",
		{ duration = self.talents.q7_duration, stack = stack }
	)
end

function antimage_mana_break_custom:GetManaK(target)
	local max_mana = target:GetMaxMana()
	local min_mana = target:GetMana()

	if max_mana == 0 then
		max_mana = self.nomana_max
		min_mana = self.nomana_min
	end

	return min_mana / max_mana
end

modifier_antimage_mana_break_custom = class(mod_hidden)
function modifier_antimage_mana_break_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.manabreak_ability = self.ability

	self.ability.nomana_max = self.ability:GetSpecialValueFor("nomana_max")
	self.ability.nomana_min = self.ability:GetSpecialValueFor("nomana_min")
	self.ability.percent_damage_per_burn = self.ability:GetSpecialValueFor("percent_damage_per_burn")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.illusion_burn = self.ability:GetSpecialValueFor("illusion_burn")
	self.ability.mana_per_hit = self.ability:GetSpecialValueFor("mana_per_hit")
	self.ability.mana_per_hit_pct = self.ability:GetSpecialValueFor("mana_per_hit_pct")
end

function modifier_antimage_mana_break_custom:OnRefresh(kv)
	self.ability.mana_per_hit = self.ability:GetSpecialValueFor("mana_per_hit")
	self.ability.mana_per_hit_pct = self.ability:GetSpecialValueFor("mana_per_hit_pct")
end

function modifier_antimage_mana_break_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end

	for _, target in pairs(self.parent:FindTargets(self.ability.talents.h6_radius)) do
		if target:GetMaxMana() > 0 and target:GetManaPercent() <= self.ability.talents.h6_mana then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_antimage_mana_break_custom_haste",
				{ duration = self.ability.talents.h6_duration }
			)
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_antimage_mana_break_custom_haste_target",
				{ duration = self.ability.talents.h6_duration }
			)
		end
	end
end

function modifier_antimage_mana_break_custom:AttackEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if self.ability.talents.has_h3 == 0 then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_antimage_mana_break_custom_stats",
		{ duration = self.ability.talents.h3_duration }
	)
end

function modifier_antimage_mana_break_custom:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if self.ability.talents.has_q1 == 0 and self.ability.talents.has_q3 == 0 then
		return
	end

	local mana_k = self.ability:GetManaK(params.target)
	local duration = self.ability.talents.has_q3 == 1 and self.ability.talents.q3_duration
		or self.ability.talents.q1_duration

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_antimage_mana_break_custom_caster_effect",
		{ mana_k = mana_k, duration = duration }
	)
end

function modifier_antimage_mana_break_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_EVASION_CONSTANT,
	}
end

function modifier_antimage_mana_break_custom:GetModifierBaseAttack_BonusDamage()
	return self.ability.talents.w1_damage
end

function modifier_antimage_mana_break_custom:GetModifierMoveSpeedBonus_Constant()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.w2_move
		* (self.parent:HasModifier("modifier_antimage_blink_custom_move") and self.ability.talents.w2_bonus or 1)
end

function modifier_antimage_mana_break_custom:GetModifierEvasion_Constant()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.w2_evasion
		* (self.parent:HasModifier("modifier_antimage_blink_custom_move") and self.ability.talents.w2_bonus or 1)
end

function modifier_antimage_mana_break_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.q2_range
end

function modifier_antimage_mana_break_custom:GetModifierBonusStats_Strength()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h3_stats_init
		* (
			1
			+ (self.ability.talents.h3_stats_inc - 1)
				* self.parent:GetUpgradeStack("modifier_antimage_mana_break_custom_stats")
				/ self.ability.talents.h3_max
		)
end

function modifier_antimage_mana_break_custom:GetModifierBonusStats_Intellect()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h3_stats_init
		* (
			1
			+ (self.ability.talents.h3_stats_inc - 1)
				* self.parent:GetUpgradeStack("modifier_antimage_mana_break_custom_stats")
				/ self.ability.talents.h3_max
		)
end

function modifier_antimage_mana_break_custom:GetModifierBonusStats_Agility()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h3_stats_init
		* (
			1
			+ (self.ability.talents.h3_stats_inc - 1)
				* self.parent:GetUpgradeStack("modifier_antimage_mana_break_custom_stats")
				/ self.ability.talents.h3_max
		)
end

function modifier_antimage_mana_break_custom:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	local target = params.target

	if not target then
		return
	end
	if not target:IsUnit() then
		return
	end

	local mana_k = self.ability:GetManaK(target)

	if target:HasModifier("modifier_antimage_mana_break_custom_legendary_target") then
		target:EmitSound("Antimage.Break_legendary_hit")

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if self.parent:PassivesDisabled() then
		return
	end

	local legendary_mod = self.parent:FindModifierByName("modifier_antimage_mana_void_custom_illusion")
	local max_mana = target:GetMaxMana()
	local min_mana = target:GetMana()
	if max_mana == 0 then
		max_mana = self.ability.nomana_max
		min_mana = self.ability.nomana_min
	end

	local bkb_ability = self.parent:BkbAbility(self.ability, self.ability.talents.has_h6 == 1)

	local mana_burn = self.parent:IsIllusion() and self.ability.illusion_burn
		or (
			self.ability.mana_per_hit + (
				max_mana
				/ 100
				* (self.ability.mana_per_hit_pct + self.ability.talents.q3_mana)
			)
		)
	mana_burn = math.min(min_mana, mana_burn)

	if
		self.parent:GetQuest() == "Anti.Quest_5"
		and params.target:IsRealHero()
		and not self.parent:QuestCompleted()
		and not target:HasModifier("modifier_huskar_blood_magic")
	then
		self.parent:UpdateQuest(math.floor(mana_burn))
	end

	if not legendary_mod then
		local real_mana = target:Script_ReduceMana(mana_burn, bkb_ability)

		if self.parent:HasShard() and self.parent.counterspell_ability then
			self.parent.counterspell_ability:ShardMana(real_mana)
		end
	end

	self.particle_mana_burn = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/generic_gameplay/generic_manaburn.vpcf",
		self
	)
	target:GenericParticle(self.particle_mana_burn)

	if self.ability.talents.has_q1 == 1 or self.ability.talents.has_q4 == 1 then
		target:AddNewModifier(
			self.parent,
			bkb_ability,
			"modifier_antimage_mana_break_custom_target_effect",
			{ mana_k = mana_k, duration = self.ability.talents.q1_duration }
		)
	end

	if self.ability.talents.has_q2 == 1 then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			self.ability.talents.q2_cleave * params.damage,
			150,
			360,
			500,
			"particles/antimage/manabreak_cleave.vpcf"
		)
	end

	mana_k = self.ability:GetManaK(target)
	local sound = "Hero_Antimage.ManaBreak"
	if mana_k <= 0.5 and target:GetMaxMana() ~= 0 then
		sound = "Antimage.Low_mana"
	end

	if
		self.ability.talents.has_q4 == 1
		and mana_k <= self.ability.talents.q4_mana / 100
		and not target:HasModifier("modifier_antimage_mana_break_custom_stun_cd")
	then
		target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_bashed",
			{ duration = self.ability.talents.q4_stun * (1 - target:GetStatusResistance()) }
		)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_antimage_mana_break_custom_stun_cd",
			{ duration = self.ability.talents.q4_talent_cd }
		)

		target:EmitSound("Antimage.Break_stun")
		sound = "Antimage.Break_stun2"
		local immortal_particle =
			ParticleManager:CreateParticle("particles/antimage/am_no_mana.vpcf", PATTACH_OVERHEAD_FOLLOW, target)
		ParticleManager:SetParticleControl(immortal_particle, 0, target:GetAbsOrigin())
		ParticleManager:SetParticleControl(immortal_particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:Delete(immortal_particle, 1)
	end

	target:EmitSound(sound)

	if legendary_mod then
		legendary_mod:ManaBurn(target)
		return
	end

	if target:IsDebuffImmune() and self.ability.talents.has_h6 == 1 then
		return
	end

	local damage_bonus = target:IsCreep() and (1 + self.ability.creeps_damage) * self.ability.percent_damage_per_burn
		or self.ability.percent_damage_per_burn
	return mana_burn * damage_bonus
end

modifier_antimage_mana_break_custom_target_effect = class(mod_hidden)
function modifier_antimage_mana_break_custom_target_effect:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.manabreak_ability

	self.armor = self.ability.talents.q1_armor
	self.heal_mana = self.ability.talents.q4_mana
	self.heal_reduce = self.ability.talents.q4_heal_reduce

	if not IsServer() then
		return
	end
	self:SetStackCount(table.mana_k * 100)
end

function modifier_antimage_mana_break_custom_target_effect:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.mana_k * 100)
end

function modifier_antimage_mana_break_custom_target_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_antimage_mana_break_custom_target_effect:GetModifierPhysicalArmorBonus()
	return self.armor * (1 - self:GetStackCount() / 100)
end

function modifier_antimage_mana_break_custom_target_effect:GetModifierHealChange()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self:GetStackCount() <= self.heal_mana and self.heal_reduce or 0
end

function modifier_antimage_mana_break_custom_target_effect:GetModifierHPRegenAmplify_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self:GetStackCount() <= self.heal_mana and self.heal_reduce or 0
end

modifier_antimage_mana_break_custom_legendary = class(mod_hidden)
function modifier_antimage_mana_break_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/antimage/am_break_2.vpcf", self)
	self.parent:GenericParticle("particles/antimage/am_break_legendary.vpcf", self)
	self:SetStackCount(table.stack)

	self.max_time = self:GetRemainingTime()

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_antimage_mana_break_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = "+" .. self:GetStackCount() .. "%",
		priority = 2,
		style = "AntimageManabreak",
	})
end

function modifier_antimage_mana_break_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "AntimageManabreak" })
end

function modifier_antimage_mana_break_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_antimage_mana_break_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_antimage_mana_break_custom_legendary:GetModifierModelScale()
	return 15
end

function modifier_antimage_mana_break_custom_legendary:GetModifierStatusResistanceStacking()
	return self.ability.talents.q7_status
end

modifier_antimage_mana_break_custom_caster_effect = class(mod_visible)
function modifier_antimage_mana_break_custom_caster_effect:GetTexture()
	return "buffs/antimage/manabreak_3"
end
function modifier_antimage_mana_break_custom_caster_effect:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.q1_armor * -1
	self.speed = self.ability.talents.q3_speed

	if not IsServer() then
		return
	end
	self:SetStackCount(table.mana_k * 100)
end

function modifier_antimage_mana_break_custom_caster_effect:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.mana_k * 100)
end

function modifier_antimage_mana_break_custom_caster_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_antimage_mana_break_custom_caster_effect:GetModifierPhysicalArmorBonus()
	return self.armor * (1 - self:GetStackCount() / 100)
end

function modifier_antimage_mana_break_custom_caster_effect:GetModifierAttackSpeedBonus_Constant()
	return self.speed * (1 - self:GetStackCount() / 100)
end

modifier_antimage_mana_break_custom_stun_cd = class(mod_hidden)
function modifier_antimage_mana_break_custom_stun_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_antimage_mana_break_custom_stats = class(mod_visible)
function modifier_antimage_mana_break_custom_stats:GetTexture()
	return "buffs/antimage/hero_3"
end
function modifier_antimage_mana_break_custom_stats:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.h3_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_antimage_mana_break_custom_stats:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

modifier_antimage_mana_break_custom_haste = class(mod_visible)
function modifier_antimage_mana_break_custom_haste:GetTexture()
	return "buffs/antimage/hero_8"
end
function modifier_antimage_mana_break_custom_haste:GetStatusEffectName()
	return "particles/units/heroes/hero_kez/status_effect_kez_afterimage_buff.vpcf"
end
function modifier_antimage_mana_break_custom_haste:StatusEffectPriority()
	return IsValid(self.parent) and self.parent:IsIllusion() and MODIFIER_PRIORITY_ILLUSION or MODIFIER_PRIORITY_HIGH
end
function modifier_antimage_mana_break_custom_haste:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.move = self.ability.talents.h6_move

	if not IsServer() then
		return
	end
	if
		self.parent.current_model == "models/heroes/antimage_female/antimage_female.vmdl"
		or self.parent.current_model == "models/items/antimage_female/mh_antimage_kirin/antimage_female_kirin.vmdl"
		or self.parent.current_model
			== "models/items/antimage_female/mh_antimage_kirin/antimage_female_kirin_rainbow.vmdl"
	then
		self:SetStackCount(1)
	end
	self.parent:GenericParticle("particles/antimage/nomana_haste.vpcf", self)
end

function modifier_antimage_mana_break_custom_haste:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_antimage_mana_break_custom_haste:GetActivityTranslationModifiers()
	return self:GetStackCount() == 1 and "chase" or "haste"
end

function modifier_antimage_mana_break_custom_haste:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_antimage_mana_break_custom_haste:CheckState()
	return {
		[MODIFIER_STATE_UNSLOWABLE] = true,
	}
end

modifier_antimage_mana_break_custom_haste_target = class(mod_hidden)
function modifier_antimage_mana_break_custom_haste_target:GetEffectName()
	return "particles/units/heroes/hero_keeper_of_the_light/keeper_of_the_light_mana_leak.vpcf"
end
function modifier_antimage_mana_break_custom_haste_target:OnCreated()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(1)
end

function modifier_antimage_mana_break_custom_haste_target:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_keeper_of_the_light/keeper_mana_leak.vpcf")
end

modifier_antimage_mana_break_custom_legendary_target = class(mod_hidden)
function modifier_antimage_mana_break_custom_legendary_target:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability:EndCd()
	self:SetStackCount(table.stack)
	self.parent:GenericParticle("particles/antimage/am_mana_mark.vpcf", self, true)
end

function modifier_antimage_mana_break_custom_legendary_target:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.caster:RemoveModifierByName("modifier_antimage_mana_break_custom_legendary")
end

function modifier_antimage_mana_break_custom_legendary_target:CheckState()
	return {
		[MODIFIER_STATE_EVADE_DISABLED] = true,
	}
end

function modifier_antimage_mana_break_custom_legendary_target:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_antimage_mana_break_custom_legendary_target:GetModifierIncomingDamage_Percentage(params)
	if IsServer() and (not params.attacker or params.attacker:FindOwner() ~= self.caster) then
		return
	end
	if params.inflictor then
		return
	end
	return self:GetStackCount()
end