--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_tracker",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_damage_count",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_legendary_toggle",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_legendary_mana",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_mind_7"
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_slow",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_mind_2"
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_shield_cd",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_hero_5"
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_silence",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_nyx_mind_4"
)
LinkLuaModifier(
	"modifier_nyx_assassin_jolt_custom_silence_cd",
	"abilities/nyx_assassin/nyx_assassin_jolt_custom",
	LUA_MODIFIER_MOTION_NONE
)

nyx_assassin_jolt_custom = class({})
nyx_assassin_jolt_custom.talents = {}

function nyx_assassin_jolt_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_mana_burn_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_mana_burn.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_nyx_assassin/nyx_assassin_jolt.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/mind_mana_burn.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/mind_shield.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/mind_silence.vpcf", context)
	PrecacheResource("particle", "particles/nyx_assassin/mind_refresh.vpcf", context)
end

function nyx_assassin_jolt_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_damage = 0,

			has_w2 = 0,
			w2_range = 0,
			w2_slow = 0,
			w2_duration = caster:GetTalentValue("modifier_nyx_mind_2", "duration", true),

			h1_mana = 0,

			has_w3 = 0,
			w3_heal = 0,
			w3_cd = 0,

			has_w4 = 0,
			w4_silence = caster:GetTalentValue("modifier_nyx_mind_4", "silence", true),
			w4_thresh = caster:GetTalentValue("modifier_nyx_mind_4", "thresh", true),
			w4_mana = caster:GetTalentValue("modifier_nyx_mind_4", "mana", true) / 100,
			w4_speed = caster:GetTalentValue("modifier_nyx_mind_4", "speed", true),
			w4_talent_cd = caster:GetTalentValue("modifier_nyx_mind_4", "talent_cd", true),

			has_h5 = 0,
			h5_magic = caster:GetTalentValue("modifier_nyx_hero_5", "magic", true),
			h5_talent_cd = caster:GetTalentValue("modifier_nyx_hero_5", "talent_cd", true),
			h5_duration = caster:GetTalentValue("modifier_nyx_hero_5", "duration", true),
			h5_shield = caster:GetTalentValue("modifier_nyx_hero_5", "shield", true) / 100,
			h5_no_mana = caster:GetTalentValue("modifier_nyx_hero_5", "no_mana", true),

			has_w7 = 0,
			w7_damage_min = caster:GetTalentValue("modifier_nyx_mind_7", "damage_min", true) / 100,
			w7_damage_max = caster:GetTalentValue("modifier_nyx_mind_7", "damage_max", true) / 100,
			w7_mana = caster:GetTalentValue("modifier_nyx_mind_7", "mana", true) / 100,
			w7_mana_damage = caster:GetTalentValue("modifier_nyx_mind_7", "mana_damage", true) / 100,
			w7_duration = caster:GetTalentValue("modifier_nyx_mind_7", "duration", true),
		}
	end

	if caster:HasTalent("modifier_nyx_mind_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_nyx_mind_1", "damage") / 100
	end

	if caster:HasTalent("modifier_nyx_mind_2") then
		self.talents.has_w2 = 1
		self.talents.w2_range = caster:GetTalentValue("modifier_nyx_mind_2", "range")
		self.talents.w2_slow = caster:GetTalentValue("modifier_nyx_mind_2", "slow")
	end

	if caster:HasTalent("modifier_nyx_hero_1") then
		self.talents.h1_mana = caster:GetTalentValue("modifier_nyx_hero_1", "mana") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_nyx_hero_1", heal = false, proc = "LifestealMana", value = self.talents.h1_mana }
		)
		if IsServer() then
			local stats = caster:GetTalentValue("modifier_nyx_hero_1", "stats") / 100
			caster:AddPercentStat({ agi = stats, str = stats, int = stats }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_nyx_mind_3") then
		self.talents.has_w3 = 1
		self.talents.w3_heal = caster:GetTalentValue("modifier_nyx_mind_3", "heal") / 100
		self.talents.w3_cd = caster:GetTalentValue("modifier_nyx_mind_3", "cd") / 100
		caster:AddSpellEvent(self.tracker, true)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_nyx_mind_3",
			type = 1,
			effect = "particles/generic/lifesteal_blue.vpcf",
			value = function(params)
				return params.inflictor == self and self.talents.w3_heal or 0
			end,
		})
	end

	if caster:HasTalent("modifier_nyx_mind_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_nyx_hero_5") then
		self.talents.has_h5 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_nyx_mind_7") then
		self.talents.has_w7 = 1
	end
end

function nyx_assassin_jolt_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_nyx_assassin_jolt_custom_tracker"
end

function nyx_assassin_jolt_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "nyx_assassin_jolt", self)
end

function nyx_assassin_jolt_custom:GetBehavior()
	local bonus = self.talents.has_w7 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
		+ bonus
end

function nyx_assassin_jolt_custom:GetCd(level)
	return self.BaseClass.GetCooldown(self, level)
end

function nyx_assassin_jolt_custom:GetCooldown(level)
	return self:GetCd(level)
end

function nyx_assassin_jolt_custom:GetAOERadius()
	return self.radius or 0
end

function nyx_assassin_jolt_custom:OnSpellStart(new_target)
	local target = self:GetCursorTarget()
	if new_target then
		target = new_target
	end

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_mana_burn_start.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_mouth",
		self.caster:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	if not new_target then
		local beam_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_nyx_assassin/nyx_assassin_jolt.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			beam_effect,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_mouth",
			self.caster:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			beam_effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(beam_effect)

		self.cd_used = false
		self.caster:EmitSound("Hero_NyxAssassin.Jolt.Cast")
		target:EmitSound("Hero_NyxAssassin.Jolt.Target")
	else
		self.caster:EmitSound("Hero_NyxAssassin.ManaBurn.Cast")
		target:EmitSound("Hero_NyxAssassin.ManaBurn.Target")
		target:EmitSound("Nyx.Mind_legendary_mana")
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local damage = 0
	local no_mana = target:IsCreep() or target:GetMaxMana() <= 0

	local damage_mod = target:FindModifierByName("modifier_nyx_assassin_jolt_custom_damage_count")
	if damage_mod and damage_mod.damage_stack then
		damage = damage + damage_mod.damage_stack
		damage_mod:Destroy()
	end

	if no_mana then
		damage = damage + self.damage_creeps
	else
		damage = damage + target:GetMaxMana() * self.max_mana_as_damage_pct
	end

	if self.talents.has_w7 == 1 and not no_mana then
		damage = (
			self.talents.w7_damage_min
			+ (self.talents.w7_damage_max - self.talents.w7_damage_min) * (1 - target:GetManaPercent() / 100)
		) * target:GetMaxHealth()
	end

	damage = damage * (1 + self.talents.w1_damage)

	local damageTable = { attacker = self.caster, damage = damage, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }

	for _, aoe_target in pairs(self.caster:FindTargets(self.radius, target:GetAbsOrigin())) do
		aoe_target:GenericParticle("particles/units/heroes/hero_nyx_assassin/nyx_assassin_mana_burn.vpcf")
		damageTable.victim = aoe_target

		if not new_target then
			local real_damage = DoDamage(damageTable)
			if self.talents.has_w7 == 1 then
				aoe_target:SendNumber(6, real_damage)
			end
		else
			aoe_target:AddNewModifier(
				self.caster,
				self,
				"modifier_nyx_assassin_jolt_custom_legendary_mana",
				{ duration = self.talents.w7_duration + 0.1 }
			)
		end

		if IsValid(self.caster.impale_ability) then
			self.caster.impale_ability:AbilityHit(aoe_target)
		end

		if self.talents.has_w2 == 1 then
			aoe_target:AddNewModifier(
				self.caster,
				self,
				"modifier_nyx_assassin_jolt_custom_slow",
				{ duration = self.talents.w2_duration }
			)
		end
	end

	if IsValid(self.caster.impale_ability) then
		self.caster.impale_ability:ProcCd()
	end

	if IsValid(self.caster.carapace_ability) then
		self.caster.carapace_ability:SpeedStack()
	end
end

modifier_nyx_assassin_jolt_custom_tracker = class(mod_hidden)
function modifier_nyx_assassin_jolt_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.mind_ability = self.ability
	self.legendary_ability = self.parent:FindAbilityByName("nyx_assassin_jolt_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.ability.max_mana_as_damage_pct = self.ability:GetSpecialValueFor("max_mana_as_damage_pct") / 100
	self.ability.damage_echo_duration = self.ability:GetSpecialValueFor("damage_echo_duration")
	self.ability.damage_echo_pct = self.ability:GetSpecialValueFor("damage_echo_pct") / 100
	self.ability.no_max_mana = self.ability:GetSpecialValueFor("no_max_mana")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.damage_creeps = self.ability:GetSpecialValueFor("damage_creeps")

	self.parent:AddDamageEvent_out(self, true)
end

function modifier_nyx_assassin_jolt_custom_tracker:OnRefresh()
	self.ability.max_mana_as_damage_pct = self.ability:GetSpecialValueFor("max_mana_as_damage_pct") / 100
	self.ability.damage_creeps = self.ability:GetSpecialValueFor("damage_creeps")
end

function modifier_nyx_assassin_jolt_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_nyx_assassin_jolt_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.w2_range
end

function modifier_nyx_assassin_jolt_custom_tracker:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_magic
end

function modifier_nyx_assassin_jolt_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.unit:IsUnit() then
		return
	end

	local unit = params.unit
	local attacker_owner = params.attacker:FindOwner()
	if attacker_owner ~= self.parent then
		return
	end

	if self.ability.talents.has_w4 == 1 then
		local mana_burn = params.damage * self.ability.talents.w4_mana

		if unit:GetMaxMana() ~= 0 then
			if not params.inflictor or not params.inflictor:IsItem() then
				unit:GenericParticle("particles/generic_gameplay/generic_manaburn.vpcf")
			end
			unit:Script_ReduceMana(mana_burn, self.ability)
		end
		if
			unit:GetManaPercent() <= self.ability.talents.w4_thresh
			and not unit:HasModifier("modifier_nyx_assassin_jolt_custom_silence_cd")
			and params.inflictor
			and params.inflictor == self.ability
		then
			unit:EmitSound("Nyx.Mind_silence")
			unit:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_nyx_assassin_jolt_custom_silence_cd",
				{ duration = self.ability.talents.w4_talent_cd }
			)
			unit:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_nyx_assassin_jolt_custom_silence",
				{ duration = self.ability.talents.w4_silence * (1 - unit:GetStatusResistance()) }
			)
		end
	end

	local damage = math.floor(params.damage * self.ability.damage_echo_pct)
	if damage <= 0 then
		return
	end

	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nyx_assassin_jolt_custom_damage_count",
		{ duration = self.ability.damage_echo_duration, damage = damage }
	)
end

function modifier_nyx_assassin_jolt_custom_tracker:LifestealMana(params, mana)
	self.parent:GiveMana(mana)
end

function modifier_nyx_assassin_jolt_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end

	if
		self.ability.talents.has_w3 == 1
		and self.parent == params.unit
		and params.ability ~= self.legendary_ability
		and not self.ability.cd_used
		and params.ability ~= self.ability
		and self.ability:GetCooldownTimeRemaining() > 0
	then
		self.parent:CdAbility(self.ability, nil, self.ability.talents.w3_cd, "modifier_nyx_mind_3")
		self.ability.cd_used = true
		local particle = ParticleManager:CreateParticle(
			"particles/nyx_assassin/mind_refresh.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if self.ability.talents.has_h5 == 0 then
		return
	end

	local unit = params.unit
	if unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if unit:IsCreep() then
		return
	end

	if not params.target or self.parent ~= params.target then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_nyx_assassin_jolt_custom_shield_cd") then
		return
	end

	local shield = unit:GetMaxMana() > 0 and unit:GetMaxMana() * self.ability.talents.h5_shield
		or self.ability.talents.h5_no_mana

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nyx_assassin_jolt_custom_shield_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
	local mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
		max_shield = shield,
		start_full = 1,
		duration = self.ability.talents.h5_duration,
		shield_talent = "modifier_nyx_hero_5",
	})

	if mod then
		self.parent:EmitSound("Nyx.Mind_shield")
		self.cast_effect = ParticleManager:CreateParticle(
			"particles/nyx_assassin/mind_shield.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.cast_effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(self.cast_effect, 1, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			self.cast_effect,
			2,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		mod:AddParticle(self.cast_effect, false, false, -1, false, false)

		mod:SetHitFunction(function(damage)
			local real_heal = self.parent:GenericHeal(
				damage,
				self.ability,
				true,
				"particles/generic/lifesteal_blue.vpcf",
				"modifier_nyx_hero_5"
			)
			self.parent:SendNumber(11, real_heal)
		end)
	end

	local beam_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_nyx_assassin/nyx_assassin_jolt.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		unit
	)
	ParticleManager:SetParticleControlEnt(
		beam_effect,
		0,
		unit,
		PATTACH_POINT_FOLLOW,
		"attach_mouth",
		unit:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		beam_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(beam_effect)

	self.parent:EmitSound("Nyx.Mind_shield_burn")
	self.parent:GenericParticle("particles/units/heroes/hero_nyx_assassin/nyx_assassin_mana_burn.vpcf")
end

modifier_nyx_assassin_jolt_custom_damage_count = class(mod_hidden)
function modifier_nyx_assassin_jolt_custom_damage_count:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.duration = self.ability.damage_echo_duration
	self.damage_stack = 0

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_nyx_assassin_jolt_custom_damage_count:OnRefresh(table)
	if not IsServer() then
		return
	end
	local stack = table.damage
	self.damage_stack = self.damage_stack + stack

	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self.damage_stack = self.damage_stack - stack
		end
	end)
end

modifier_nyx_assassin_jolt_custom_legendary_toggle = class(mod_hidden)
function modifier_nyx_assassin_jolt_custom_legendary_toggle:RemoveOnDeath()
	return false
end
function modifier_nyx_assassin_jolt_custom_legendary_toggle:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if self.ability:GetName() == "nyx_assassin_jolt_custom_legendary" and not self.ability:IsHidden() then
		self.parent:SwapAbilities("nyx_assassin_jolt_custom_legendary", "nyx_assassin_jolt_custom", false, true)
	end

	if self.ability:GetName() == "nyx_assassin_jolt_custom" and not self.ability:IsHidden() then
		self.parent:SwapAbilities("nyx_assassin_jolt_custom", "nyx_assassin_jolt_custom_legendary", false, true)
	end

	self:Destroy()
end

modifier_nyx_assassin_jolt_custom_legendary_mana = class(mod_visible)
function modifier_nyx_assassin_jolt_custom_legendary_mana:GetTexture()
	return "nyx_assassin_mana_burn"
end
function modifier_nyx_assassin_jolt_custom_legendary_mana:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w7_duration + 1
	self.mana = self.ability.talents.w7_mana / self.max
	self.mana_damage = self.ability.talents.w7_mana_damage

	if not IsServer() then
		return
	end
	self.count = 0
	self.parent:GenericParticle("particles/nyx_assassin/mind_mana_burn.vpcf", self)

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self:OnIntervalThink()
	self:StartIntervalThink(1)
end

function modifier_nyx_assassin_jolt_custom_legendary_mana:OnRefresh()
	if not IsServer() then
		return
	end
	self.count = 0
end

function modifier_nyx_assassin_jolt_custom_legendary_mana:OnIntervalThink()
	if not IsServer() then
		return
	end

	local mana = self.mana * self.parent:GetMaxMana()
	local real_mana = self.parent:Script_ReduceMana(mana, self.ability)

	if self.ability.talents.has_w4 == 0 then
		self.parent:GenericParticle("particles/generic_gameplay/generic_manaburn.vpcf")
	end

	if real_mana > 0 then
		self.damageTable.damage = real_mana * self.mana_damage * (1 + self.ability.talents.w1_damage)
		DoDamage(self.damageTable, "modifier_nyx_mind_7")
	end

	self.count = self.count + 1
	if self.count >= self.max then
		self:Destroy()
		return
	end
end

modifier_nyx_assassin_jolt_custom_slow = class(mod_hidden)
function modifier_nyx_assassin_jolt_custom_slow:IsPurgable()
	return true
end
function modifier_nyx_assassin_jolt_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w2_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", self)
end

function modifier_nyx_assassin_jolt_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_nyx_assassin_jolt_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_nyx_assassin_jolt_custom_silence = class(mod_hidden)
function modifier_nyx_assassin_jolt_custom_silence:IsPurgable()
	return true
end
function modifier_nyx_assassin_jolt_custom_silence:GetEffectName()
	return "particles/generic_gameplay/generic_silenced.vpcf"
end
function modifier_nyx_assassin_jolt_custom_silence:ShouldUseOverheadOffset()
	return true
end
function modifier_nyx_assassin_jolt_custom_silence:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_nyx_assassin_jolt_custom_silence:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.w4_speed

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/nyx_assassin/mind_silence.vpcf", self)
end

function modifier_nyx_assassin_jolt_custom_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_nyx_assassin_jolt_custom_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_nyx_assassin_jolt_custom_silence:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_nyx_assassin_jolt_custom_shield_cd = class(mod_cd)
function modifier_nyx_assassin_jolt_custom_shield_cd:GetTexture()
	return "buffs/nyx_assassin/hero_6"
end

modifier_nyx_assassin_jolt_custom_silence_cd = class(mod_hidden)

nyx_assassin_jolt_custom_legendary = class({})
nyx_assassin_jolt_custom_legendary.talents = {}

function nyx_assassin_jolt_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_cd = caster:GetTalentValue("modifier_nyx_mind_7", "cd", true),
		}
	end
end

function nyx_assassin_jolt_custom_legendary:GetCooldown()
	return (self.talents.w7_cd or 0) / self.caster:GetCooldownReduction()
end

function nyx_assassin_jolt_custom_legendary:GetAOERadius()
	if not self.caster.mind_ability then
		return 0
	end
	return self.caster.mind_ability.radius or 0
end

function nyx_assassin_jolt_custom_legendary:OnSpellStart()
	if self.caster.mind_ability then
		self.caster.mind_ability:OnSpellStart(self:GetCursorTarget())
	end
	self:EndCd(self.talents.w7_cd)
end