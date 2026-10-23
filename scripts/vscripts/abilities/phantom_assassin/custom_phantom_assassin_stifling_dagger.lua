--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_phantom_assassin_stifling_dagger_slow",
	"abilities/phantom_assassin/custom_phantom_assassin_stifling_dagger",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_phantom_assassin_stifling_dagger_tracker",
	"abilities/phantom_assassin/custom_phantom_assassin_stifling_dagger",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_phantom_assassin_stifling_legendary_cast",
	"abilities/phantom_assassin/custom_phantom_assassin_stifling_dagger",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_phantom_assassin_stifling_dagger_stack",
	"abilities/phantom_assassin/custom_phantom_assassin_stifling_dagger",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_dagger_7"
)
LinkLuaModifier(
	"modifier_custom_phantom_assassin_stifling_dagger_root",
	"abilities/phantom_assassin/custom_phantom_assassin_stifling_dagger",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_hero_4"
)
LinkLuaModifier(
	"modifier_custom_phantom_assassin_stifling_dagger_poison",
	"abilities/phantom_assassin/custom_phantom_assassin_stifling_dagger",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_dagger_3"
)

custom_phantom_assassin_stifling_dagger = class({})
custom_phantom_assassin_stifling_dagger.talents = {}
custom_phantom_assassin_stifling_dagger.legendary_proj = {}

function custom_phantom_assassin_stifling_dagger:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_stifling_dagger.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_stifling_dagger_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_shard_fan_of_knives.vpcf",
		context
	)
	PrecacheResource("particle", "particles/generic_gameplay/generic_sleep.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_centaur/centaur_shard_buff_strength_counter_stack.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items_fx/force_staff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_forcestaff.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/dagger_linear.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/dagger_poison.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/dagger_root.vpcf", context)

	dota1x6:PrecacheShopItems("npc_dota_hero_phantom_assassin", context)
end

function custom_phantom_assassin_stifling_dagger:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_spell = 0,
			q1_damage = 0,
			q1_int = 0,

			q2_range = 0,
			q2_cd = 0,

			w2_cast = 0,

			has_q3 = 0,
			q3_damage = 0,
			q3_heal = 0,
			q3_range = caster:GetTalentValue("modifier_phantom_assassin_dagger_3", "range", true),
			q3_duration = caster:GetTalentValue("modifier_phantom_assassin_dagger_3", "duration", true),
			q3_damage_type = caster:GetTalentValue("modifier_phantom_assassin_dagger_3", "damage_type", true),

			has_q4 = 0,
			q4_cd_items = caster:GetTalentValue("modifier_phantom_assassin_dagger_4", "cd_items", true),
			q4_cd_items_legendary = caster:GetTalentValue(
				"modifier_phantom_assassin_dagger_4",
				"cd_items_legendary",
				true
			),
			q4_chance = caster:GetTalentValue("modifier_phantom_assassin_dagger_4", "chance", true),
			q4_mana = caster:GetTalentValue("modifier_phantom_assassin_dagger_4", "mana", true),
			q4_damage = caster:GetTalentValue("modifier_phantom_assassin_dagger_4", "damage", true) / 100,
			q4_slow_duration = caster:GetTalentValue("modifier_phantom_assassin_dagger_4", "slow_duration", true),

			has_h4 = 0,
			h4_speed = caster:GetTalentValue("modifier_phantom_assassin_hero_4", "speed", true) / 100,
			h4_vision = caster:GetTalentValue("modifier_phantom_assassin_hero_4", "vision", true),
			h4_range = caster:GetTalentValue("modifier_phantom_assassin_hero_4", "range", true),
			h4_root = caster:GetTalentValue("modifier_phantom_assassin_hero_4", "root", true),
			h4_talent_cd = caster:GetTalentValue("modifier_phantom_assassin_hero_4", "talent_cd", true),

			has_q7 = 0,
			q7_stack_max = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "stack_max", true),
			q7_timer = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "timer", true),
			q7_stun = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "stun", true),
			q7_creeps = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "creeps", true) / 100,
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_1") then
		self.talents.q1_spell = caster:GetTalentValue("modifier_phantom_assassin_dagger_1", "spell")
		self.talents.q1_damage = caster:GetTalentValue("modifier_phantom_assassin_dagger_1", "damage")
		self.talents.q1_int = caster:GetTalentValue("modifier_phantom_assassin_dagger_1", "int") / 100
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_3") then
		self.talents.has_q3 = 1
		self.talents.q3_damage = caster:GetTalentValue("modifier_phantom_assassin_dagger_3", "damage") / 100
		self.talents.q3_heal = caster:GetTalentValue("modifier_phantom_assassin_dagger_3", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_phantom_assassin_dagger_3", type = 1, value = self.talents.q3_heal }
		)
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_4") then
		self.talents.has_q4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_2") then
		self.talents.q2_range = caster:GetTalentValue("modifier_phantom_assassin_dagger_2", "range")
		self.talents.q2_cd = caster:GetTalentValue("modifier_phantom_assassin_dagger_2", "cd")
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_2") then
		self.talents.w2_cast = caster:GetTalentValue("modifier_phantom_assassin_blink_2", "cast") / 100
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_7") then
		self.talents.has_q7 = 1
		self.tracker:UpdateUI()
	end
end

function custom_phantom_assassin_stifling_dagger:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "phantom_assassin_stifling_dagger", self)
end

function custom_phantom_assassin_stifling_dagger:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_phantom_assassin_stifling_dagger_tracker"
end

function custom_phantom_assassin_stifling_dagger:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE
end

function custom_phantom_assassin_stifling_dagger:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0)
end

function custom_phantom_assassin_stifling_dagger:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) * (1 + (self.talents.w2_cast or 0))
end

function custom_phantom_assassin_stifling_dagger:GetAOERadius()
	return self.radius or 0
end

function custom_phantom_assassin_stifling_dagger:OnSpellStart(new_target)
	local target = new_target or self:GetCursorTarget()
	local crit = self.caster.crit_ability and self.caster.crit_ability:UseFocus(self.caster, true, target)
	local hero = target:IsRealHero()

	self:Throw(target, nil, crit, 1)

	local targets = self.caster:RandomTarget(self.radius, target:GetAbsOrigin(), nil, self.targets, target)

	if targets then
		for _, unit in pairs(targets) do
			if unit ~= target then
				self:Throw(unit, nil, crit)
				hero = hero or unit:IsRealHero()
			end
		end
	end

	if hero then
		self:AddCharge()
	end

	self.caster:EmitSound("Hero_PhantomAssassin.Dagger.Cast")
end

function custom_phantom_assassin_stifling_dagger:OnProjectileHit_ExtraData(hTarget, vLocation, table)
	if not hTarget then
		self:DestroyProj(table.legendary_index)
		return
	end

	if not table.legendary_index and hTarget:TriggerSpellAbsorb(self) then
		return
	end

	if table.legendary_index then
		self.caster:LogProc("modifier_phantom_assassin_dagger_7", table.bonus and 1 or 0, hTarget)
	end

	if table.bonus then
		hTarget:AddNewModifier(self.caster, self, "modifier_stunned", { duration = self.talents.q7_stun })
	end

	if table.legendary_index and self.talents.has_q4 == 1 then
		self.caster:CdItems(self.talents.q4_cd_items_legendary, "modifier_phantom_assassin_dagger_4")
	end

	local distance = table.distance or (hTarget:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()
	local slow_duration = (
		table.source == "modifier_phantom_assassin_dagger_4" and self.talents.q4_slow_duration or self.duration
	) * (1 - hTarget:GetStatusResistance())
	local slow_mod =
		hTarget:FindModifierByNameAndCaster("modifier_custom_phantom_assassin_stifling_dagger_slow", self.caster)
	if slow_mod then
		slow_duration = math.max(slow_mod:GetRemainingTime(), slow_duration)
	end

	hTarget:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_phantom_assassin_stifling_dagger_slow",
		{ duration = slow_duration }
	)

	if
		self.talents.has_h4 == 1
		and (not table.source or table.source == "modifier_phantom_assassin_dagger_7")
		and distance >= self.talents.h4_range
		and hTarget:CheckCd("phantom_assassin_h4", self.talents.h4_talent_cd)
	then
		hTarget:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_phantom_assassin_stifling_dagger_root",
			{ duration = self.talents.h4_root * (1 - hTarget:GetStatusResistance()) }
		)
		self.caster:LogProc("modifier_phantom_assassin_hero_4", distance, hTarget)
	end

	if self.caster.blink_ability then
		self.caster.blink_ability:ProcMark(hTarget)
	end

	if
		self.caster:GetQuest() == "Phantom.Quest_5"
		and hTarget:IsRealHero()
		and (hTarget:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D() >= self.caster.quest.number
	then
		self.caster:UpdateQuest(1)
	end

	self.caster.pa_q = true
	self.caster.pa_focus = table.crit
	self.caster.pa_source = table.source
	self.caster.pa_distance = distance
	self.caster.pa_damage = table.damage

	self.caster:PerformAttack(hTarget, true, true, true, false, false, false, true, { damage = "pa_q" })

	self.caster.pa_q = nil
	self.caster.pa_focus = nil
	self.caster.pa_source = nil
	self.caster.pa_distance = nil
	self.caster.pa_damage = nil

	if table.main and not table.source and self.caster.blur_ability then
		self.caster.blur_ability:ProcDouble(hTarget)
	end

	hTarget:EmitSound("Hero_PhantomAssassin.Dagger.Target")

	self:DestroyProj(table.legendary_index)
end

function custom_phantom_assassin_stifling_dagger:ProcPoison(target, damage, distance)
	if not IsServer() then
		return
	end
	if self.talents.has_q3 ~= 1 then
		return
	end
	self.caster:LogProc("modifier_phantom_assassin_dagger_3", distance >= self.talents.q3_range and 1 or 0, target)
	if distance < self.talents.q3_range then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_phantom_assassin_stifling_dagger_poison",
		{ damage = damage * self.talents.q3_damage }
	)
	target:EmitSound("Phantom_Assassin.PoisonImpact")

	local effect = ParticleManager:CreateParticle(
		"particles/phantom_assassin/dagger_poison.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		3,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)
end

function custom_phantom_assassin_stifling_dagger:AddCharge()
	if not IsServer() then
		return
	end
	if self.talents.has_q7 ~= 1 then
		return
	end
	if self.caster.dagger_legendary_ability and not self.caster.dagger_legendary_ability:IsCooldownReady() then
		return
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_custom_phantom_assassin_stifling_dagger_stack", {})
end

function custom_phantom_assassin_stifling_dagger:DestroyProj(index)
	if not index or not self.legendary_proj[index] then
		return
	end

	ProjectileManager:DestroyLinearProjectile(self.legendary_proj[index])
	self.legendary_proj[index] = nil
end

function custom_phantom_assassin_stifling_dagger:Throw(target, source, crit, main)
	local projectile_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_stifling_dagger.vpcf",
		self
	)
	local start_abs = self.caster:GetAbsOrigin()

	local info = {
		Target = target,
		Source = self.caster,
		Ability = self,
		EffectName = projectile_name,
		iMoveSpeed = self.speed * (1 + (self.talents.has_h4 == 1 and self.talents.h4_speed or 0)),
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = 450,
		bDodgeable = true,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		ExtraData = {
			crit = crit,
			source = source,
			main = main,
			distance = (target:GetAbsOrigin() - start_abs):Length2D(),
		},
	}
	ProjectileManager:CreateTrackingProjectile(info)

	if not target:IsRealHero() then
		return
	end

	if self.talents.has_h4 == 1 and not source then
		target:AddNewModifier(self.caster, self, "modifier_generic_vision", { duration = self.talents.h4_vision })
	end

	if self.talents.has_q4 ~= 1 then
		return
	end
	if not source and not main then
		return
	end

	self.caster:CdItems(self.talents.q4_cd_items, "modifier_phantom_assassin_dagger_4")
end

modifier_custom_phantom_assassin_stifling_dagger_tracker = class(mod_hidden)
function modifier_custom_phantom_assassin_stifling_dagger_tracker:DestroyOnExpire()
	return false
end
function modifier_custom_phantom_assassin_stifling_dagger_tracker:RemoveOnDeath()
	return false
end
function modifier_custom_phantom_assassin_stifling_dagger_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.targets = self.ability:GetSpecialValueFor("targets")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.move_slow = self.ability:GetSpecialValueFor("move_slow")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.base_damage = self.ability:GetSpecialValueFor("base_damage")
	self.ability.damage_attack = self.ability:GetSpecialValueFor("damage_attack") / 100
	self.ability.cast_range = self.ability:GetSpecialValueFor("AbilityCastRange")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.damageTable = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage_flags = DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK,
	}

	self.parent.dagger_ability = self.ability
	self.parent.dagger_legendary_ability =
		self.parent:FindAbilityByName("custom_phantom_assassin_stifling_dagger_legendary")

	if self.parent.dagger_legendary_ability then
		self.parent.dagger_legendary_ability:UpdateTalents()
	end
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.base_damage = self.ability:GetSpecialValueFor("base_damage")
	self.ability.damage_attack = self.ability:GetSpecialValueFor("damage_attack") / 100
	self.ability.cast_range = self.ability:GetSpecialValueFor("AbilityCastRange")
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
	}
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:GetModifierPercentageManacostStacking()
	if self.ability.talents.has_q4 ~= 1 then
		return
	end

	return self.ability.talents.q4_mana
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.q1_spell or 0
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.q2_range
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:GetModifierOverrideAttackDamage()
	if not IsServer() then
		return
	end
	if not self.parent.pa_q then
		return
	end

	return self.ability.base_damage
		+ self.parent:GetAverageTrueAttackDamage(nil) * self.ability.damage_attack
		+ self.ability.talents.q1_damage
		+ self.parent:GetIntellect(false) * self.ability.talents.q1_int
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if not IsServer() then
		return 0
	end
	if not self.parent.pa_q then
		return 0
	end
	if params.inflictor then
		return 0
	end
	if params.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK then
		return 0
	end
	if params.damage_type == DAMAGE_TYPE_MAGICAL then
		return 0
	end

	self.damageTable.damage = params.original_damage
	self.damageTable.victim = params.target

	if self.parent.pa_source == "modifier_phantom_assassin_dagger_4" then
		self.damageTable.damage = self.damageTable.damage * self.ability.talents.q4_damage
	end

	if self.parent.pa_damage then
		self.damageTable.damage = self.damageTable.damage * self.parent.pa_damage
	end

	if self.parent.pa_source == "modifier_phantom_assassin_dagger_7" and params.target:IsCreep() then
		self.damageTable.damage = self.damageTable.damage * (1 + self.ability.talents.q7_creeps)
	end

	DoDamage(self.damageTable, self.parent.pa_source)

	self.ability:ProcPoison(params.target, self.damageTable.damage, self.parent.pa_distance)

	if self.parent.pa_focus and self.parent.crit_ability then
		self.parent.crit_ability:ApplyBleed(
			self.parent,
			params.target,
			self.damageTable.damage * self.ability:GetCreepsMult(params.target)
		)
	end

	return -200
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q4 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	local roll = RollPseudoRandomPercentage(self.ability.talents.q4_chance, 1224, self.parent)

	if not roll then
		return
	end

	local target = params.ability == self.ability and params.target or nil

	Timers:CreateTimer(target and 0.25 or 0, function()
		if not IsValid(self) then
			return
		end

		if not IsValid(target) or not target:IsAlive() then
			target = self.parent:RandomTarget(self.ability.cast_range + self.parent:GetCastRangeBonus())
		end

		if not target then
			return
		end

		self.ability:Throw(target, "modifier_phantom_assassin_dagger_4")
		self.parent:LogProc("modifier_phantom_assassin_dagger_4", target:IsRealHero() and 1 or 0)

		if target:IsRealHero() then
			self.ability:AddCharge()
		end

		self.parent:EmitSound("Hero_PhantomAssassin.Dagger.Cast")
	end)
end

function modifier_custom_phantom_assassin_stifling_dagger_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 ~= 1 then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_custom_phantom_assassin_stifling_dagger_stack")

	self.parent:UpdateUIlong({
		stack = mod and mod:GetStackCount() or 0,
		max = self.ability.talents.q7_stack_max,
		style = "PhantomDaggers",
	})
end

modifier_custom_phantom_assassin_stifling_dagger_stack = class(mod_hidden)
function modifier_custom_phantom_assassin_stifling_dagger_stack:RemoveOnDeath()
	return false
end
function modifier_custom_phantom_assassin_stifling_dagger_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self:OnRefresh()
end

function modifier_custom_phantom_assassin_stifling_dagger_stack:OnRefresh()
	if not IsServer() then
		return
	end

	self:SetDuration(self.ability.talents.q7_timer, true)

	if self:GetStackCount() >= self.ability.talents.q7_stack_max then
		return
	end

	self:IncrementStackCount()
	self.ability.tracker:UpdateUI()
end

function modifier_custom_phantom_assassin_stifling_dagger_stack:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability.tracker:UpdateUI()
end

modifier_custom_phantom_assassin_stifling_dagger_root = class(mod_hidden)
function modifier_custom_phantom_assassin_stifling_dagger_root:IsPurgable()
	return true
end
function modifier_custom_phantom_assassin_stifling_dagger_root:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()

	self.parent:EmitSound("PA.Dagger_root")
	self.parent:GenericParticle("particles/phantom_assassin/dagger_root.vpcf", self)
end

function modifier_custom_phantom_assassin_stifling_dagger_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_custom_phantom_assassin_stifling_dagger_slow = class(mod_visible)
function modifier_custom_phantom_assassin_stifling_dagger_slow:IsPurgable()
	return true
end
function modifier_custom_phantom_assassin_stifling_dagger_slow:GetTexture()
	return "phantom_assassin_stifling_dagger"
end
function modifier_custom_phantom_assassin_stifling_dagger_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_stifling_dagger_debuff.vpcf",
		self
	)

	self.parent:GenericParticle(particle_name, self)
	self:StartIntervalThink(FrameTime())
end

function modifier_custom_phantom_assassin_stifling_dagger_slow:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 10, FrameTime(), false)
end

function modifier_custom_phantom_assassin_stifling_dagger_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_phantom_assassin_stifling_dagger_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.move_slow or 0
end

modifier_custom_phantom_assassin_stifling_dagger_poison = class(mod_visible)
function modifier_custom_phantom_assassin_stifling_dagger_poison:GetTexture()
	return "buffs/phantom_assassin/stifling_3"
end
function modifier_custom_phantom_assassin_stifling_dagger_poison:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ticks = self.ability.talents.q3_duration
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.q3_damage_type,
	}

	for i = 1, 2 do
		self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", self)
	end

	self.RemoveForDuel = true
	self:AddStack(table.damage)
	self:StartIntervalThink(1)
end

function modifier_custom_phantom_assassin_stifling_dagger_poison:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack(table.damage)
end

function modifier_custom_phantom_assassin_stifling_dagger_poison:AddStack(damage)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + damage
	self.tick = self.total_damage / self.ticks
	self.count = self.ticks
	self.damageTable.damage = self.tick
end

function modifier_custom_phantom_assassin_stifling_dagger_poison:OnIntervalThink()
	if not IsServer() then
		return
	end

	local real_damage = DoDamage(self.damageTable, "modifier_phantom_assassin_dagger_3")
	self.parent:SendNumber(9, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1

	if self.count <= 0 then
		self:Destroy()
	end
end

custom_phantom_assassin_stifling_dagger_legendary = class({})
custom_phantom_assassin_stifling_dagger_legendary.talents = {}

function custom_phantom_assassin_stifling_dagger_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			q7_talent_cd = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "talent_cd", true),
			q7_cast = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "cast", true),
			q7_cast_min = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "cast_min", true),
			q7_stack_max = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "stack_max", true),
			q7_max = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "max", true),
			q7_width = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "width", true),
			q7_random_dist = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "random_dist", true),
			q7_speed = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "speed", true) / 100,
			q7_damage = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "damage", true) / 100,
			q7_damage_inc = caster:GetTalentValue("modifier_phantom_assassin_dagger_7", "damage_inc", true) / 100,
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_dagger_7") then
		self.talents.has_q7 = 1
	end
end

function custom_phantom_assassin_stifling_dagger_legendary:GetCooldown()
	return self.talents.has_q7 == 1 and self.talents.q7_talent_cd or 0
end

function custom_phantom_assassin_stifling_dagger_legendary:GetCastRange(vLocation, hTarget)
	return self.caster.dagger_ability and self.caster.dagger_ability.cast_range or 0
end

function custom_phantom_assassin_stifling_dagger_legendary:GetChannelTime()
	return self:GetDuration() + FrameTime() * 2
end

function custom_phantom_assassin_stifling_dagger_legendary:GetCastAnimation()
	return 0
end

function custom_phantom_assassin_stifling_dagger_legendary:GetDuration()
	if self.talents.has_q7 ~= 1 then
		return 0
	end

	return self.talents.q7_cast
		- (self.talents.q7_cast - self.talents.q7_cast_min)
			* self.caster:GetUpgradeStack("modifier_custom_phantom_assassin_stifling_dagger_stack")
			/ self.talents.q7_stack_max
end

function custom_phantom_assassin_stifling_dagger_legendary:OnSpellStart()
	local point = self:GetCursorPosition()

	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	local dir = (point - self.caster:GetAbsOrigin()):Normalized()
	dir.z = 0

	self.caster:FacePoint(self.caster:GetAbsOrigin() + dir * 10)

	self.caster:AddNewModifier(self.caster, self, "modifier_custom_phantom_assassin_stifling_legendary_cast", {})
end

function custom_phantom_assassin_stifling_dagger_legendary:OnChannelFinish(bInterrupted)
	self.caster:RemoveModifierByName("modifier_custom_phantom_assassin_stifling_dagger_stack")

	if not bInterrupted then
		return
	end

	self.caster:RemoveModifierByName("modifier_custom_phantom_assassin_stifling_legendary_cast")
end

function custom_phantom_assassin_stifling_dagger_legendary:CreateTalent()
	self:SetHidden(false)
	self:UpdateTalents()
end

modifier_custom_phantom_assassin_stifling_legendary_cast = class(mod_hidden)
function modifier_custom_phantom_assassin_stifling_legendary_cast:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.dagger = self.parent.dagger_ability

	if not self.dagger then
		self:Destroy()
		self.parent:Interrupt()
		return
	end

	if not IsServer() then
		return
	end

	self.speed = self.dagger.speed * (1 + self.ability.talents.q7_speed)
	self.width = self.ability.talents.q7_width
	self.random_dist = self.ability.talents.q7_random_dist
	self.distance = self.dagger.cast_range + self.parent:GetCastRangeBonus()

	self.max = self.ability.talents.q7_max
	self.max_duration = self.ability:GetDuration()

	local stack = self.parent:GetUpgradeStack("modifier_custom_phantom_assassin_stifling_dagger_stack")
	self.parent:LogProc("modifier_phantom_assassin_dagger_7_cast", stack)
	self.bonus = stack >= self.ability.talents.q7_stack_max and 1 or nil
	self.damage = self.ability.talents.q7_damage + self.ability.talents.q7_damage_inc * stack

	self.interval = self.max_duration / self.max
	self.anim_rate = math.min(0.35 / self.interval, 1.4)
	self.no_anim = false

	if self.max_duration <= 1.1 then
		self.no_anim = true
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_4, 0.8)
	else
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_1, self.anim_rate)
	end

	self:SetStackCount(self.max)
	self:StartIntervalThink(self.interval)
end

function modifier_custom_phantom_assassin_stifling_legendary_cast:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.dagger then
		self:Destroy()
		self.parent:Interrupt()
		return
	end

	if not self.no_anim then
		self.parent:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_1, self.anim_rate)
	end

	local start_abs = self.parent:GetAbsOrigin()
	local index = #self.dagger.legendary_proj + 1
	local point = start_abs
		+ self.parent:GetForwardVector() * self.distance
		+ RandomVector(RandomInt(1, self.random_dist))
	local crit = self.parent.crit_ability and self.parent.crit_ability:UseFocus(self.parent, true)

	local projectile = {
		EffectName = "particles/phantom_assassin/dagger_linear.vpcf",
		Ability = self.dagger,
		vSpawnOrigin = start_abs + Vector(0, 0, 130),
		fStartRadius = self.width,
		fEndRadius = self.width,
		vVelocity = (point - start_abs):Normalized() * self.speed,
		fDistance = self.distance,
		Source = self.parent,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,
		bProvidesVision = true,
		bDeleteOnHit = true,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
		iVisionRadius = self.width * 2,
		ExtraData = {
			legendary_index = index,
			crit = crit,
			bonus = self.bonus,
			damage = self.damage,
			source = "modifier_phantom_assassin_dagger_7",
		},
	}

	self.parent:EmitSound("Hero_PhantomAssassin.Dagger.Cast")
	self.dagger.legendary_proj[index] = ProjectileManager:CreateLinearProjectile(projectile)
	self.parent:LogProc("modifier_phantom_assassin_dagger_7_throw")

	self:DecrementStackCount()

	if self:GetStackCount() > 0 then
		return
	end

	self:Destroy()
	self.parent:Interrupt()
end

function modifier_custom_phantom_assassin_stifling_legendary_cast:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
end