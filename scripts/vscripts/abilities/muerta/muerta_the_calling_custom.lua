--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_muerta_the_calling_custom",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_revenant",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_BOTH
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_debuff",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_damage",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_shard",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_root",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_calling_4"
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_bink",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_tracker",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_magic_reduce",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_calling_3"
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_slow",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_teleport",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_the_calling_custom_legendary_stack",
	"abilities/muerta/muerta_the_calling_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_muerta_calling_7"
)

muerta_the_calling_custom = class({})
muerta_the_calling_custom.talents = {}

function muerta_the_calling_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/econ/events/ti7/blink_dagger_start_ti7.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_calling_reticule_2.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_calling_impact.vpcf", context)
	PrecacheResource("particle", "particles/muerta/calling_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_calling_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_calling.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_calling_target.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_calling_debuff_slow.vpcf", context)
	PrecacheResource("particle", "particles/muerta/calling_hero.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_calling_caster_start_2.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_calling_caster_end.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_calling_caster_start.vpcf", context)
	PrecacheResource("particle", "particles/muerta/calling_root.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti7/blink_dagger_end_ti7.vpcf", context)
	PrecacheResource("particle", "particles/muerta/resist_stackb.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_calling_revenant_custom.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_shield.vpcf", context)
end

function muerta_the_calling_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_cd = 0,
			w1_damage = 0,

			w2_heal = 0,

			has_w3 = 0,
			w3_magic_resist = 0,
			w3_count = 0,
			w3_damage = caster:GetTalentValue("modifier_muerta_calling_3", "damage", true) / 100,
			w3_radius = caster:GetTalentValue("modifier_muerta_calling_3", "radius", true),
			w3_slow_duration = caster:GetTalentValue("modifier_muerta_calling_3", "slow_duration", true),
			w3_range = caster:GetTalentValue("modifier_muerta_calling_3", "range", true),
			w3_interval = caster:GetTalentValue("modifier_muerta_calling_3", "interval", true),
			w3_duration = caster:GetTalentValue("modifier_muerta_calling_3", "duration", true),
			w3_slow = caster:GetTalentValue("modifier_muerta_calling_3", "slow", true),
			w3_max = caster:GetTalentValue("modifier_muerta_calling_3", "max", true),

			has_w4 = 0,
			w4_cd = caster:GetTalentValue("modifier_muerta_calling_4", "cd", true),
			w4_root = caster:GetTalentValue("modifier_muerta_calling_4", "root", true),
			w4_duration = caster:GetTalentValue("modifier_muerta_calling_4", "duration", true),
			w4_speed = caster:GetTalentValue("modifier_muerta_calling_4", "speed", true) / 100,

			has_w7 = 0,
			w7_radius = caster:GetTalentValue("modifier_muerta_calling_7", "radius", true),
			w7_fear = caster:GetTalentValue("modifier_muerta_calling_7", "fear", true),
			w7_damage = caster:GetTalentValue("modifier_muerta_calling_7", "damage", true) / 100,
			w7_small_radius = caster:GetTalentValue("modifier_muerta_calling_7", "small_radius", true),
			w7_big_radius = caster:GetTalentValue("modifier_muerta_calling_7", "big_radius", true),
			w7_fear_stack = caster:GetTalentValue("modifier_muerta_calling_7", "fear_stack", true),
			w7_max = caster:GetTalentValue("modifier_muerta_calling_7", "max", true),
			w7_count = caster:GetTalentValue("modifier_muerta_calling_7", "count", true),
			w7_range = caster:GetTalentValue("modifier_muerta_calling_7", "range", true),
			w7_cd = caster:GetTalentValue("modifier_muerta_calling_7", "cd", true),
			w7_base_damage = caster:GetTalentValue("modifier_muerta_calling_7", "base_damage", true) / 100,

			has_h1 = 0,
			h1_slow = 0,

			has_h5 = 0,
			h5_range = caster:GetTalentValue("modifier_muerta_hero_5", "range", true),
			h5_duration = caster:GetTalentValue("modifier_muerta_hero_5", "duration", true),
			h5_shield = caster:GetTalentValue("modifier_muerta_hero_5", "shield", true) / 100,
			h5_base = caster:GetTalentValue("modifier_muerta_hero_5", "base", true),
		}
	end

	if caster:HasTalent("modifier_muerta_calling_1") then
		self.talents.has_w1 = 1
		self.talents.w1_cd = caster:GetTalentValue("modifier_muerta_calling_1", "cd")
		self.talents.w1_damage = caster:GetTalentValue("modifier_muerta_calling_1", "damage") / 100
	end

	if caster:HasTalent("modifier_muerta_calling_2") then
		self.talents.w2_heal = caster:GetTalentValue("modifier_muerta_calling_2", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_muerta_calling_2", type = 1, value = self.talents.w2_heal }
		)
	end

	if caster:HasTalent("modifier_muerta_calling_3") then
		self.talents.has_w3 = 1
		self.talents.w3_magic_resist = caster:GetTalentValue("modifier_muerta_calling_3", "magic_resist")
		self.talents.w3_count = caster:GetTalentValue("modifier_muerta_calling_3", "count")
	end

	if caster:HasTalent("modifier_muerta_calling_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_muerta_calling_7") then
		self.talents.has_w7 = 1
		if IsServer() and not self.w7_init then
			self.w7_init = true
			if self.talents.has_h5 == 1 then
				self:ToggleAutoCast()
			end
		end
	end

	if caster:HasTalent("modifier_muerta_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_slow = caster:GetTalentValue("modifier_muerta_hero_1", "slow")
	end

	if caster:HasTalent("modifier_muerta_hero_5") then
		self.talents.has_h5 = 1
		if IsServer() and not self.h5_init then
			self.h5_init = true
			if self.talents.has_w7 == 1 then
				self:ToggleAutoCast()
			end
		end
	end
end

function muerta_the_calling_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_muerta_the_calling_custom_tracker"
end

function muerta_the_calling_custom:GetCastAnimation()
	if self.caster:HasModifier("modifier_muerta_the_calling_custom_legendary_stack") then
		return ACT_DOTA_CAST_ABILITY_6
	end
	return ACT_DOTA_CAST_ABILITY_2
end

function muerta_the_calling_custom:GetAbilityTextureName()
	if
		self.caster:HasModifier("modifier_muerta_the_calling_custom_teleport")
		or self.caster:HasModifier("modifier_muerta_the_calling_custom_legendary_stack")
	then
		return "muerta_supernatural"
	end
	return "muerta_the_calling"
end

function muerta_the_calling_custom:GetBehavior()
	if self.caster:HasModifier("modifier_muerta_the_calling_custom_legendary_stack") then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE
	end
	if self.caster:HasModifier("modifier_muerta_the_calling_custom_teleport") then
		return DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_AOE
		+ DOTA_ABILITY_BEHAVIOR_POINT
		+ ((self.talents.has_h5 == 1 and self.talents.has_w7 == 1) and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function muerta_the_calling_custom:GetManaCost(iLevel)
	if
		self.caster:HasModifier("modifier_muerta_the_calling_custom_teleport")
		or self.caster:HasModifier("modifier_muerta_the_calling_custom_legendary_stack")
	then
		return 0
	end
	return self.BaseClass.GetManaCost(self, iLevel)
end

function muerta_the_calling_custom:GetCastRange(location, target)
	if self.caster:HasModifier("modifier_muerta_the_calling_custom_legendary_stack") then
		return self.talents.w7_range
	end
	return self.BaseClass.GetCastRange(self, location, target)
		+ (self.talents.has_h5 == 1 and self.talents.h5_range or 0)
end

function muerta_the_calling_custom:GetAOERadius()
	if self.caster:HasModifier("modifier_muerta_the_calling_custom_legendary_stack") then
		return self.talents.w7_radius
	end
	return self.talents.has_w7 == 1 and self.talents.w7_big_radius or 0
end

function muerta_the_calling_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
		+ (self.talents.w1_cd or 0)
		+ (self.talents.has_w7 == 1 and self.talents.w7_cd or 0)
end

function muerta_the_calling_custom:GetDamage()
	return self.damage * (1 + (self.talents.has_w7 == 1 and self.talents.w7_base_damage or 0))
		+ self.caster:GetMaxHealth() * self.talents.w1_damage
end

function muerta_the_calling_custom:OnSpellStart()
	local legendary = self.caster:FindModifierByName("modifier_muerta_the_calling_custom_legendary_stack")
	if legendary then
		legendary.target = self:GetCursorTarget()
		legendary:Destroy()
		return
	end

	local mod = self.caster:FindModifierByName("modifier_muerta_the_calling_custom_teleport")
	if mod then
		self:Teleport()
		mod:Destroy()
		return
	end

	local point = self:GetCursorPosition()

	local duration = self.duration + (self.talents.has_w4 == 1 and self.talents.w4_duration or 0)
	self.caster:AddNewModifier(self.caster, self, "modifier_can_not_push", { duration = duration })

	self.calling_thinker = CreateModifierThinker(
		self.caster,
		self,
		"modifier_muerta_the_calling_custom",
		{ duration = duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
	EmitSoundOnLocationWithCaster(point, "Hero_Muerta.Revenants.Cast", self.caster)

	if self.talents.has_h5 == 0 then
		return
	end

	if self.talents.has_w7 == 1 then
		if self:GetAutoCastState() and not self.caster:IsLeashed() and not self.caster:IsRooted() then
			self:Teleport()
		end
	else
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_muerta_the_calling_custom_teleport",
			{ duration = duration }
		)
	end
end

function muerta_the_calling_custom:Teleport()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if not IsValid(self.calling_thinker) then
		return
	end

	local old_pos = self.caster:GetAbsOrigin()
	local point = self.calling_thinker:GetAbsOrigin()

	self.caster:EmitSound("Muerta.Calling_scepter_start")
	self.caster:AddNewModifier(self.caster, self, "modifier_muerta_the_calling_custom_bink", { duration = 0.1 })

	local effect = ParticleManager:CreateParticle(
		"particles/econ/events/ti7/blink_dagger_start_ti7.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(effect, 0, old_pos)
	ParticleManager:ReleaseParticleIndex(effect)

	ProjectileManager:ProjectileDodge(self.caster)

	self.caster:SetAbsOrigin(point)
	FindClearSpaceForUnit(self.caster, point, false)

	if IsValid(self.shield_mod) then
		self.shield_mod:Destroy()
	end

	self.shield_mod = self.caster:AddNewModifier(self.caster, self, "modifier_generic_shield", {
		max_shield = self.talents.h5_base + self.talents.h5_shield * self.caster:GetMaxHealth(),
		start_full = 1,
		shield_talent = "modifier_muerta_hero_5",
		duration = self.talents.h5_duration,
	})

	if self.shield_mod then
		self.particle = ParticleManager:CreateParticle(
			"particles/muerta/muerta_shield.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControlEnt(
			self.particle,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		self.shield_mod:AddParticle(self.particle, false, false, -1, false, false)
	end
end

function muerta_the_calling_custom:DealDamage(target, damage_ability, use_fear)
	if not IsServer() then
		return
	end

	local damage = self:GetDamage()
	local duration = target:IsCreep() and self.silence_creeps or self.silence_duration
	local sound = target:IsCreep() and "Hero_Muerta.Revenants.Damage.Creep" or "Hero_Muerta.Revenants.Damage.Hero"

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_muerta/muerta_calling_impact.vpcf",
		PATTACH_CUSTOMORIGIN,
		target
	)
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
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	if self.talents.has_w3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_muerta_the_calling_custom_magic_reduce",
			{ duration = self.talents.w3_duration }
		)
	end

	if damage_ability == "modifier_muerta_calling_3" then
		damage = damage * self.talents.w3_damage
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_muerta_the_calling_custom_slow",
			{ duration = self.talents.w3_slow_duration }
		)
	else
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_silence",
			{ duration = duration * (1 - target:GetStatusResistance()) }
		)
	end

	if damage_ability == "modifier_muerta_calling_7" then
		damage = damage * self.talents.w7_damage
		if use_fear and IsValid(self.caster.dead_ability) and target:CheckCd("muerta_w7", 5) then
			self.caster.dead_ability:ApplyFear(target, self.talents.w7_fear, nil, nil, true)
		end
	end

	if IsValid(self.caster.veil_ability) and target:IsRealHero() then
		self.caster.veil_ability:LegendaryStack()
	end

	DoDamage(
		{ victim = target, attacker = self.caster, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self },
		damage_ability
	)
	target:EmitSound("Hero_Muerta.Revenants.Silence")
	target:EmitSound(sound)

	if IsValid(self.caster.dead_ability) then
		self.caster.dead_ability:ApplyBurn(target, damage)
	end
end

modifier_muerta_the_calling_custom = class(mod_hidden)
function modifier_muerta_the_calling_custom:IsAura()
	return true
end
function modifier_muerta_the_calling_custom:GetModifierAura()
	return "modifier_muerta_the_calling_custom_debuff"
end
function modifier_muerta_the_calling_custom:GetAuraRadius()
	return self.aura_radius
end
function modifier_muerta_the_calling_custom:GetAuraDuration()
	return self.aura_linger
end
function modifier_muerta_the_calling_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_muerta_the_calling_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_muerta_the_calling_custom:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ability:EndCd()
	self.center = self.parent:GetAbsOrigin()

	self.parent:EmitSound("Hero_Muerta.Revenants")
	self.parent:EmitSound("Hero_Muerta.Revenants.Layer")

	self.hit_radius = self.ability.hit_radius
	self.radius = self.ability.radius
	self.aura_radius = self.radius
	self.aura_linger = self.ability.aura_linger
	self.num_revenants = self.ability.num_revenants
	self.duration = self:GetRemainingTime()

	local effect = "particles/units/heroes/hero_muerta/muerta_calling_aoe.vpcf"
	self.radius_2 = 0

	if self.ability.talents.has_w7 == 1 then
		effect = "particles/muerta/calling_aoe.vpcf"

		self.radius_2 = self.ability.talents.w7_big_radius
		self.radius = self.ability.talents.w7_small_radius
		self.num_revenants_2 = self.ability.talents.w7_count
		self.aura_radius = self.radius_2
	end

	self.legendary_stack = 0

	local particle = ParticleManager:CreateParticle(effect, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.aura_radius, self.aura_radius, self.aura_radius))
	ParticleManager:SetParticleControl(particle, 2, Vector(self.duration, self.duration, self.duration))
	self:AddParticle(particle, false, false, -1, false, false)

	self.wisps = {}

	for i = 1, self.num_revenants do
		local angel = (math.pi / 2 + 2 * math.pi / self.num_revenants * i)
		self:CreateWisp(angel, self.radius - self.hit_radius)
	end

	if self.ability.talents.has_w7 == 1 then
		for i = 1, self.num_revenants_2 do
			local angel = (math.pi / 2 + 2 * math.pi / self.num_revenants_2 * i)
			self:CreateWisp(angel, self.radius_2 - self.hit_radius)
		end
	end

	self.has_quest = self.caster:GetQuest() == "Muerta.Quest_6" and self.caster:QuestCompleted() == false

	if
		self.ability.talents.has_w7 == 0
		and self.ability.talents.has_w4 == 0
		and self.ability.talents.has_w3 == 0
		and not self.has_quest
	then
		return
	end

	self.auto_max = self.ability.talents.w3_count
	if self.auto_max > 0 then
		self.auto_interval = self.ability.duration / self.auto_max
	end
	self.auto_count = 0.5
	self.legendary_count = 0

	self.interval = FrameTime() * 3
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_muerta_the_calling_custom:CreateWisp(angel, radius)
	if not IsServer() then
		return
	end

	local abs = GetGroundPosition(self.center + Vector(math.cos(angel), math.sin(angel), 0) * radius, nil)
	local wisp = CreateUnitByName(
		"npc_dota_companion",
		abs,
		true,
		self.caster,
		self.caster:GetOwner(),
		self.caster:GetTeamNumber()
	)
	wisp:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_muerta_the_calling_custom_revenant",
		{
			angel = angel,
			radius = radius,
			thinker = self.parent:entindex(),
			speed_k = #self.wisps >= self.num_revenants and -1 or 1,
		}
	)

	table.insert(self.wisps, wisp)
end

function modifier_muerta_the_calling_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local hit_hero = false

	for _, target in pairs(self.caster:FindTargets(self.aura_radius, self.center)) do
		if target:IsRealHero() then
			hit_hero = true
		end
		if self.ability.talents.has_w4 == 1 and target:CheckCd("muerta_w4", self.ability.talents.w4_cd) then
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_muerta_the_calling_custom_root",
				{ duration = self.ability.talents.w4_root * (1 - target:GetStatusResistance()) }
			)
		end
	end

	if self.ability.talents.has_w3 == 1 and self.auto_interval and self.auto_max > 0 then
		self.auto_count = self.auto_count + self.interval

		if self.auto_count >= self.auto_interval then
			local auto_target = self.caster:RandomTarget(self.ability.talents.w3_range + self.aura_radius, self.center)

			if auto_target then
				self.auto_count = 0
				self.auto_max = self.auto_max - 1
				local wisp = CreateUnitByName(
					"npc_dota_companion",
					self.center,
					true,
					self.caster,
					self.caster:GetOwner(),
					self.caster:GetTeamNumber()
				)
				wisp:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_muerta_the_calling_custom_revenant",
					{ auto_target = auto_target:entindex() }
				)
			end
		end
	end

	if not hit_hero then
		return
	end
	if self.has_quest then
		self.caster:UpdateQuest(self.interval)
	end

	if self.ability.talents.has_w7 == 1 then
		self.legendary_count = self.legendary_count + self.interval
		if self.legendary_count >= 1 - FrameTime() then
			self.legendary_count = 0
			local mod = self.caster:FindModifierByName("modifier_muerta_the_calling_custom_legendary_stack")
			if not mod then
				mod = self.caster:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_muerta_the_calling_custom_legendary_stack",
					{ duration = self:GetRemainingTime() }
				)
			end
			mod:OnRefresh()
		end
	end
end

function modifier_muerta_the_calling_custom:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability.calling_thinker = nil
	self.ability:StartCd()
	self.caster:RemoveModifierByName("modifier_muerta_the_calling_custom_teleport")
	self.caster:RemoveModifierByName("modifier_muerta_the_calling_custom_legendary_stack")

	self.parent:StopSound("Hero_Muerta.Revenants")

	for i, wisp in pairs(self.wisps) do
		if IsValid(wisp) then
			local mod = i <= self.legendary_stack
				and IsValid(self.legendary_target)
				and wisp:FindModifierByName("modifier_muerta_the_calling_custom_revenant")
			if mod then
				mod:SetTarget(
					self.legendary_target,
					"modifier_muerta_calling_7",
					self.legendary_stack >= self.ability.talents.w7_fear_stack
				)
			else
				UTIL_Remove(wisp)
			end
		end
	end
end

modifier_muerta_the_calling_custom_revenant = class(mod_hidden)
function modifier_muerta_the_calling_custom_revenant:RemoveOnDeath()
	return false
end
function modifier_muerta_the_calling_custom_revenant:IsAura()
	return IsServer() and self.aura
end
function modifier_muerta_the_calling_custom_revenant:GetModifierAura()
	return "modifier_muerta_the_calling_custom_damage"
end
function modifier_muerta_the_calling_custom_revenant:GetAuraRadius()
	return self.hit_radius
end
function modifier_muerta_the_calling_custom_revenant:GetAuraDuration()
	return 0
end
function modifier_muerta_the_calling_custom_revenant:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_muerta_the_calling_custom_revenant:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_muerta_the_calling_custom_revenant:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.hit_radius = self.ability.hit_radius
	self.center = self.parent:GetAbsOrigin()

	self.height = 0
	self.max_height = 100
	self.aura = true
	self.parent:SetDayTimeVisionRange(400)
	self.parent:SetNightTimeVisionRange(400)
	local particle_name = "particles/units/heroes/hero_muerta/muerta_calling.vpcf"

	if table.thinker then
		self.thinker = EntIndexToHScript(table.thinker)
		self.center = self.thinker:GetAbsOrigin()
		self.angel = table.angel
		self.radius = table.radius
		self.speed_k = table.speed_k

		self.accel = self.ability.acceleration
		self.speed = self.ability.speed_initial
		self.max_speed = self.ability.speed_max
			* (1 + (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_speed or 0))
	end

	self.target_speed_initial = 1000
	if table.auto_target then
		self.target_speed_initial = 200
		self:SetTarget(EntIndexToHScript(table.auto_target), "modifier_muerta_calling_3")
		particle_name = "particles/muerta/muerta_calling_revenant_custom.vpcf"
	end

	self.particle = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.hit_radius, self.hit_radius, self.hit_radius))
	self:AddParticle(self.particle, false, false, -1, false, false)

	if self:ApplyHorizontalMotionController() == false or self:ApplyVerticalMotionController() == false then
		self:Destroy()
	end
end

function modifier_muerta_the_calling_custom_revenant:SetTarget(target, damage_ability, use_fear)
	if not IsServer() then
		return
	end

	self.aura = false
	self.auto_radius = damage_ability == "modifier_muerta_calling_3" and self.ability.talents.w3_radius
		or self.ability.talents.w7_radius
	self.target_max_speed = 1000
	self.target_speed = self.target_speed_initial
	self.speed_duration = 1
	self.height = self.max_height
	self.parent:EmitSound("Muerta.Calling_target_start")

	self.damage_ability = damage_ability
	self.auto_target = target
	self.use_fear = use_fear

	self:SetDuration(5, true)
end

function modifier_muerta_the_calling_custom_revenant:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end

	if self.auto_target then
		if not IsValid(self.auto_target) or not self.auto_target:IsAlive() then
			self:Destroy()
			return
		end

		self.target_speed = self.target_speed
			+ (self.target_max_speed - self.target_speed_initial) * dt / self.speed_duration
		local origin = me:GetAbsOrigin()
		local vec = (self.auto_target:GetAbsOrigin() - origin)
		vec.z = 0

		if vec:Length2D() <= 50 then
			self.parent:EmitSound("Muerta.Calling_target_end")
			self.parent:EmitSound("Hero_Muerta.Revenants.Damage.Hero")

			local effect_cast =
				ParticleManager:CreateParticle("particles/muerta/muerta_calling_target.vpcf", PATTACH_WORLDORIGIN, nil)
			ParticleManager:SetParticleControl(effect_cast, 0, GetGroundPosition(origin, nil))
			ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.auto_radius / 2, 0, 0))
			ParticleManager:ReleaseParticleIndex(effect_cast)

			for _, target in pairs(self.caster:FindTargets(self.auto_radius, origin)) do
				self.ability:DealDamage(target, self.damage_ability, self.use_fear)
			end

			self:Destroy()
		else
			self.point = GetGroundPosition(origin + vec:Normalized() * self.target_speed * dt, nil)
			me:SetAbsOrigin(self.point)
		end
		return
	end

	local current_angle = self.angel
	local current_speed = self.speed

	current_speed = math.min(current_speed + self.accel * dt, self.max_speed)
	current_angle = current_angle + current_speed * dt * self.speed_k

	if current_angle > 2 * math.pi then
		current_angle = current_angle - 2 * math.pi
	end

	self.angel = current_angle
	self.speed = current_speed
	self.point =
		GetGroundPosition(self.center + Vector(math.cos(current_angle), math.sin(current_angle), 0) * self.radius, nil)

	me:SetAbsOrigin(self.point)
end

function modifier_muerta_the_calling_custom_revenant:UpdateVerticalMotion(me, dt)
	if not IsServer() then
		return
	end
	self.height = math.min(self.max_height, self.height + dt * self.max_height * 0.5)
	me:SetAbsOrigin(self.point + Vector(0, 0, self.height))
end

function modifier_muerta_the_calling_custom_revenant:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_muerta_the_calling_custom_revenant:OnVerticalMotionInterrupted()
	self:Destroy()
end

function modifier_muerta_the_calling_custom_revenant:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	local parent = self.parent
	Timers:CreateTimer(FrameTime(), function()
		if IsValid(parent) then
			UTIL_Remove(parent)
		end
	end)
end

function modifier_muerta_the_calling_custom_revenant:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_muerta_the_calling_custom_damage = class(mod_hidden)
function modifier_muerta_the_calling_custom_damage:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability:DealDamage(self.parent)
end

modifier_muerta_the_calling_custom_debuff = class(mod_visible)
function modifier_muerta_the_calling_custom_debuff:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.move_slow = self.ability.aura_movespeed_slow + self.ability.talents.h1_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_muerta/muerta_calling_debuff_slow.vpcf", self)
end

function modifier_muerta_the_calling_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_muerta_the_calling_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.move_slow
end

modifier_muerta_the_calling_custom_root = class(mod_hidden)
function modifier_muerta_the_calling_custom_root:IsPurgable()
	return true
end
function modifier_muerta_the_calling_custom_root:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:GenericParticle("particles/muerta/calling_root.vpcf", self)
	self.parent:EmitSound("Muerta.Calling_root")
end

function modifier_muerta_the_calling_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_muerta_the_calling_custom_teleport = class(mod_hidden)
function modifier_muerta_the_calling_custom_teleport:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability:SetActivated(true)
end

function modifier_muerta_the_calling_custom_teleport:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability.calling_thinker) then
		return
	end
	self.ability:EndCd()
end

modifier_muerta_the_calling_custom_bink = class(mod_hidden)
function modifier_muerta_the_calling_custom_bink:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:GenericParticle("particles/muerta/muerta_calling_caster_start.vpcf", self)
	self.parent:NoDraw(self, true)
	self.parent:AddNoDraw()
end

function modifier_muerta_the_calling_custom_bink:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:RemoveNoDraw()
	self.parent:EndNoDraw(self)

	self.parent:EmitSound("Muerta.Calling_scepter_end")
	self.parent:GenericParticle("particles/muerta/muerta_calling_caster_end.vpcf")
	self.parent:GenericParticle("particles/econ/events/ti7/blink_dagger_end_ti7.vpcf")
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, 1.3)
end

function modifier_muerta_the_calling_custom_bink:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
	}
end

modifier_muerta_the_calling_custom_tracker = class(mod_hidden)
function modifier_muerta_the_calling_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.calling_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.silence_duration = self.ability:GetSpecialValueFor("silence_duration")
	self.ability.hit_radius = self.ability:GetSpecialValueFor("hit_radius")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.num_revenants = self.ability:GetSpecialValueFor("num_revenants")
	self.ability.speed_initial = self.ability:GetSpecialValueFor("speed_initial")
	self.ability.speed_max = self.ability:GetSpecialValueFor("speed_max")
	self.ability.acceleration = self.ability:GetSpecialValueFor("acceleration")
	self.ability.aura_movespeed_slow = self.ability:GetSpecialValueFor("aura_movespeed_slow")
	self.ability.silence_creeps = self.ability:GetSpecialValueFor("silence_creeps")
	self.ability.aura_linger = self.ability:GetSpecialValueFor("aura_linger")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_muerta_the_calling_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.silence_duration = self.ability:GetSpecialValueFor("silence_duration")
end

modifier_muerta_the_calling_custom_magic_reduce = class(mod_visible)
function modifier_muerta_the_calling_custom_magic_reduce:GetTexture()
	return "buffs/muerta/calling_3"
end
function modifier_muerta_the_calling_custom_magic_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w3_max
	self.magic = self.ability.talents.w3_magic_resist
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_muerta_the_calling_custom_magic_reduce:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Item.StarEmblem.Enemy")
		self.parent:GenericParticle("particles/muerta/resist_stackb.vpcf", self, true)
	end
end

function modifier_muerta_the_calling_custom_magic_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_muerta_the_calling_custom_magic_reduce:GetModifierMagicalResistanceBonus()
	return self.magic * self:GetStackCount()
end

modifier_muerta_the_calling_custom_slow = class(mod_hidden)
function modifier_muerta_the_calling_custom_slow:IsPurgable()
	return true
end
function modifier_muerta_the_calling_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w3_slow
end

function modifier_muerta_the_calling_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_muerta_the_calling_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_muerta_the_calling_custom_legendary_stack = class(mod_hidden)
function modifier_muerta_the_calling_custom_legendary_stack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w7_max
	self.max_time = self:GetRemainingTime()

	self.ability:SetActivated(true)

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_muerta_the_calling_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_muerta_the_calling_custom_legendary_stack:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetStackCount(),
		priority = 2,
		style = "MuertaCalling",
	})
end

function modifier_muerta_the_calling_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "MuertaCalling" })

	if not IsValid(self.ability.calling_thinker) then
		return
	end
	if not IsValid(self.target) then
		return
	end

	local mod = self.ability.calling_thinker:FindModifierByName("modifier_muerta_the_calling_custom")
	if not mod then
		return
	end

	mod.legendary_target = self.target
	mod.legendary_stack = self:GetStackCount()
	mod:Destroy()
end

muerta_the_calling_custom_shard = class({})
function muerta_the_calling_custom_shard:Spawn()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	self.duration = self:GetLevelSpecialValueFor("duration", 1)
	self.movespeed = self:GetLevelSpecialValueFor("movespeed", 1)
	self.hit_radius = self:GetLevelSpecialValueFor("hit_radius", 1)
end

function muerta_the_calling_custom_shard:OnSpellStart()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_muerta_the_calling_custom_shard",
		{ duration = self.duration }
	)
end

modifier_muerta_the_calling_custom_shard = class(mod_visible)
function modifier_muerta_the_calling_custom_shard:GetPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_muerta_the_calling_custom_shard:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.self_move = self.ability.movespeed
	self.hit_radius = self.ability.hit_radius

	if not IsServer() then
		return
	end

	self.parent:EmitSound("Muerta.Calling_caster_start")
	self.parent:GenericParticle("particles/muerta/muerta_calling_caster_start.vpcf", self)

	self.parent:StartGesture(ACT_DOTA_SPAWN)
	self.parent:SetModelScale(1.5)

	self.particle =
		ParticleManager:CreateParticle("particles/muerta/calling_hero.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(120, 120, 120))
	self:AddParticle(self.particle, false, false, -1, false, false)

	local particle =
		ParticleManager:CreateParticle("particles/muerta/muerta_calling_caster_start_2.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.targets = {}
	self:StartIntervalThink(0.1)
end

function modifier_muerta_the_calling_custom_shard:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent.calling_ability then
		return
	end

	for _, enemy in pairs(self.parent:FindTargets(self.hit_radius)) do
		if not self.targets[enemy:entindex()] then
			self.targets[enemy:entindex()] = true
			self.parent.calling_ability:DealDamage(enemy)
		end
	end
end

function modifier_muerta_the_calling_custom_shard:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:EmitSound("Muerta.Calling_caster_end")
	self.parent:GenericParticle("particles/muerta/muerta_calling_caster_end.vpcf")
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	self.parent:FadeGesture(ACT_DOTA_SPAWN)
	self.parent:RemoveGesture(ACT_DOTA_RUN)
	self.parent:SetModelScale(1)

	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), true)
end

function modifier_muerta_the_calling_custom_shard:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_muerta_the_calling_custom_shard:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_CHANGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
	}
end

function modifier_muerta_the_calling_custom_shard:GetModifierMoveSpeed_Absolute()
	return self.self_move
end

function modifier_muerta_the_calling_custom_shard:GetModifierModelChange()
	return "models/heroes/muerta/muerta_summon_model.vmdl"
end

function modifier_muerta_the_calling_custom_shard:GetVisualZDelta()
	return 100
end

function modifier_muerta_the_calling_custom_shard:GetOverrideAnimation()
	return ACT_DOTA_RUN
end