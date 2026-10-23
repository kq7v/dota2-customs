--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_thinker",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_legendary_thinker",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_legendary_stack",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_spark_7"
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_slow",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_legendary",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_tracker",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_str",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_hero_3"
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_move",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_spark_4"
)
LinkLuaModifier(
	"modifier_arc_warden_spark_wraith_custom_unslow",
	"abilities/arc_warden/arc_warden_spark_wraith_custom",
	LUA_MODIFIER_MOTION_NONE
)

arc_warden_spark_wraith_custom = class({})
arc_warden_spark_wraith_custom.talents = {}

function arc_warden_spark_wraith_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_wraith_cast.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/spark_heall.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/spark_hero.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_wraith_prj.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2021/phase_boots_fall_2021_lvl2.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/spark_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/blue_zone.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/spark_stacks.vpcf", context)
end

function arc_warden_spark_wraith_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage = 0,
			e1_delay = 0,

			has_e2 = 0,
			e2_cd = 0,
			e2_cast = 0,

			has_e3 = 0,
			e3_chance = 0,
			e3_heal = 0,
			e3_damage = caster:GetTalentValue("modifier_arc_warden_spark_3", "damage", true) / 100,
			e3_radius = caster:GetTalentValue("modifier_arc_warden_spark_3", "radius", true),

			has_e4 = 0,
			e4_move = caster:GetTalentValue("modifier_arc_warden_spark_4", "move", true),
			e4_cd_items = caster:GetTalentValue("modifier_arc_warden_spark_4", "cd_items", true),
			e4_duration = caster:GetTalentValue("modifier_arc_warden_spark_4", "duration", true),
			e4_slow_resist = caster:GetTalentValue("modifier_arc_warden_spark_4", "slow_resist", true),

			has_e7 = 0,
			e7_talent_cd = caster:GetTalentValue("modifier_arc_warden_spark_7", "talent_cd", true),
			e7_duration = caster:GetTalentValue("modifier_arc_warden_spark_7", "duration", true),
			e7_stun = caster:GetTalentValue("modifier_arc_warden_spark_7", "stun", true),
			e7_radius = caster:GetTalentValue("modifier_arc_warden_spark_7", "radius", true),
			e7_max = caster:GetTalentValue("modifier_arc_warden_spark_7", "max", true),
			e7_cast = caster:GetTalentValue("modifier_arc_warden_spark_7", "cast", true),

			has_h3 = 0,
			h3_mana = 0,
			h3_str = 0,
			h3_max = caster:GetTalentValue("modifier_arc_warden_hero_3", "max", true),
			h3_duration = caster:GetTalentValue("modifier_arc_warden_hero_3", "duration", true),

			has_q3 = 0,
			q3_stack = caster:GetTalentValue("modifier_arc_warden_flux_3", "stack", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_spark_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage = caster:GetTalentValue("modifier_arc_warden_spark_1", "damage") / 100
		self.talents.e1_delay = caster:GetTalentValue("modifier_arc_warden_spark_1", "delay") / 100
	end

	if caster:HasTalent("modifier_arc_warden_spark_2") then
		self.talents.has_e2 = 1
		self.talents.e2_cd = caster:GetTalentValue("modifier_arc_warden_spark_2", "cd")
		self.talents.e2_cast = caster:GetTalentValue("modifier_arc_warden_spark_2", "cast")
	end

	if caster:HasTalent("modifier_arc_warden_spark_3") then
		self.talents.has_e3 = 1
		self.talents.e3_chance = caster:GetTalentValue("modifier_arc_warden_spark_3", "chance")
		self.talents.e3_heal = caster:GetTalentValue("modifier_arc_warden_spark_3", "heal") / 100
		caster:AddSpellEvent(self.tracker, true)
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_arc_warden_spark_3", type = 1, value = self.talents.e3_heal }
		)
	end

	if caster:HasTalent("modifier_arc_warden_spark_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_arc_warden_spark_7") then
		self.talents.has_e7 = 1
		if IsServer() and name == "modifier_arc_warden_spark_7" then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_arc_warden_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_mana = caster:GetTalentValue("modifier_arc_warden_hero_3", "mana")
		self.talents.h3_str = caster:GetTalentValue("modifier_arc_warden_hero_3", "str")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_arc_warden_flux_3") then
		self.talents.has_q3 = 1
	end
end

function arc_warden_spark_wraith_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_arc_warden_spark_wraith_custom_tracker"
end

function arc_warden_spark_wraith_custom:GetAOERadius()
	return self.radius or 0
end

function arc_warden_spark_wraith_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.e2_cast or 0)
end

function arc_warden_spark_wraith_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.e2_cd or 0)
end

function arc_warden_spark_wraith_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_arc_warden_tempest_double") then
		return wearables_system:GetAbilityIconReplacement(self.caster, "arc_warden_spark_wraith_tempest", self)
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "arc_warden_spark_wraith", self)
end

function arc_warden_spark_wraith_custom:GetDamage()
	return (self.spark_damage_base or 0) + (self.talents.e1_damage or 0) * self.caster:GetIntellect(false)
end

function arc_warden_spark_wraith_custom:OnAbilityPhaseStart()
	self.caster:EmitSound("Hero_ArcWarden.SparkWraith.Cast")
	return true
end

function arc_warden_spark_wraith_custom:OnSpellStart()
	local cast_point = self:GetCursorPosition()

	local particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_arc_warden/arc_warden_wraith_cast.vpcf",
		self
	)

	local cast_particle = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControl(
		cast_particle,
		1,
		self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 110
	)
	ParticleManager:ReleaseParticleIndex(cast_particle)

	if self.caster:IsTempestDouble() then
		self.caster:MoveToPositionAggressive(self.caster:GetAbsOrigin())
	end

	EmitSoundOnLocationWithCaster(cast_point, "Hero_ArcWarden.SparkWraith.Appear", self.caster)

	local duration = self.duration

	for _, tower in pairs(towers) do
		if (tower:GetAbsOrigin() - cast_point):Length2D() <= self.tower_radius then
			duration = self.tower_duration
		end
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_arc_warden_spark_wraith_custom_thinker",
		{ duration = duration },
		cast_point + Vector(0, 0, 10),
		self.caster:GetTeamNumber(),
		false
	)
end

function arc_warden_spark_wraith_custom:DealDamage(target, not_main, damage_ability)
	if not IsServer() then
		return
	end
	local damage = self:GetDamage()
	local slow_duration = self.ministun_duration

	local k = 1
	if not_main then
		k = self.damage_near
	end

	local hero = self.caster
	if hero:IsTempestDouble() and hero.owner then
		hero = hero.owner
	end
	if hero:GetQuest() == "Arc.Quest_7" and target:IsRealHero() and not hero:QuestCompleted() then
		hero:UpdateQuest(1)
	end
	if damage_ability and damage_ability == "modifier_arc_warden_spark_3" then
		damage = damage * self.talents.e3_damage
	end

	target:EmitSound("Hero_ArcWarden.SparkWraith.Damage")

	DoDamage(
		{ victim = target, damage = damage * k, damage_type = DAMAGE_TYPE_MAGICAL, attacker = self.caster, ability = self },
		damage_ability
	)

	if self.talents.has_q3 == 1 and IsValid(self.caster.flux_ability) then
		self.caster.flux_ability:ApplyResist(target, self.talents.q3_stack)
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_arc_warden_spark_wraith_custom_slow",
		{ duration = slow_duration * (1 - target:GetStatusResistance()) }
	)
end

function arc_warden_spark_wraith_custom:LaunchSpark(target, source, damage_ability)
	if not IsServer() then
		return
	end
	local speed = self.wraith_speed_base
	local wraith_vision_radius = self.wraith_vision_radius
	local origin = source:GetAbsOrigin()

	if not damage_ability then
		self:ApplySpeed()
		if self.caster.flux_ability then
			self.caster.flux_ability:ApplyHeal(self.caster, true)
			local target = self.caster:GetTempest()
			if target then
				self.caster.flux_ability:ApplyHeal(target, true)
			end
		end
	end

	if damage_ability == "modifier_arc_warden_spark_3" then
		speed = speed * 1.5
	end

	source:EmitSound("Hero_ArcWarden.SparkWraith.Activate")

	local proj_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_arc_warden/arc_warden_wraith_prj.vpcf",
		self
	)

	ProjectileManager:CreateTrackingProjectile({
		EffectName = proj_pfx,
		Ability = self,
		Source = source,
		vSourceLoc = origin,
		Target = target,
		iMoveSpeed = speed,
		bDodgeable = false,
		bVisibleToEnemies = true,
		bProvidesVision = true,
		iVisionRadius = wraith_vision_radius,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		ExtraData = {
			damage_ability = damage_ability,
		},
	})
end

function arc_warden_spark_wraith_custom:OnProjectileHit_ExtraData(target, location, ExtraData)
	if not target then
		return
	end
	local damage_ability = ExtraData.damage_ability
	local damage_radius = self.damage_radius

	AddFOWViewer(self.caster:GetTeamNumber(), location, self.wraith_vision_radius, self.wraith_vision_duration, true)

	if self.talents.has_e7 == 1 and target:IsRealHero() then
		local mod_owner = self.caster.owner and self.caster.owner or self.caster
		local ability = mod_owner:FindAbilityByName("arc_warden_spark_wraith_custom_legendary")
		if ability and ability:GetCooldownTimeRemaining() <= 0 then
			mod_owner:AddNewModifier(
				mod_owner,
				self,
				"modifier_arc_warden_spark_wraith_custom_legendary_stack",
				{ duration = self.talents.e7_duration }
			)
		end
	end

	for _, unit in pairs(self.caster:FindTargets(damage_radius, target:GetAbsOrigin())) do
		self:DealDamage(unit, unit ~= target, damage_ability)
	end

	return true
end

function arc_warden_spark_wraith_custom:ApplySpeed(is_flux)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e4 == 0 then
		return
	end

	local targets = { self.caster }
	local cd_target = self.caster:GetTempest()
	if cd_target then
		table.insert(targets, cd_target)
	end

	for _, target in pairs(targets) do
		if target then
			if is_flux then
				target:AddNewModifier(
					target,
					self,
					"modifier_arc_warden_spark_wraith_custom_unslow",
					{ duration = self.talents.e4_duration }
				)
			else
				target:CdItems(self.talents.e4_cd_items, "modifier_arc_warden_spark_4")
			end
			target:RemoveModifierByName("modifier_arc_warden_spark_wraith_custom_move")
			target:AddNewModifier(
				target,
				self,
				"modifier_arc_warden_spark_wraith_custom_move",
				{ duration = self.talents.e4_duration }
			)
		end
	end
end

modifier_arc_warden_spark_wraith_custom_thinker = class(mod_hidden)
function modifier_arc_warden_spark_wraith_custom_thinker:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.radius = self.ability.radius
	self.activation_delay = self.ability.base_activation_delay * (1 + self.ability.talents.e1_delay)
	self.think_interval = self.ability.think_interval
	self.wraith_vision_radius = self.ability.wraith_vision_radius

	if not IsServer() then
		return
	end

	self.parent:EmitSound("Hero_ArcWarden.SparkWraith.Loop")

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/arc_warden/spark_hero.vpcf",
		self.ability
	)

	self.wraith_particle = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.wraith_particle, 1, Vector(self.radius, 1, 1))
	self:AddParticle(self.wraith_particle, false, false, -1, false, false)

	self.origin = self.parent:GetAbsOrigin()

	AddFOWViewer(self.caster:GetTeamNumber(), self.origin, self.wraith_vision_radius, self.activation_delay, false)
	self:StartIntervalThink(self.activation_delay)
end

function modifier_arc_warden_spark_wraith_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.origin, self.wraith_vision_radius, self.think_interval, false)

	for _, enemy in pairs(self.caster:FindTargets(self.radius, self.origin)) do
		self.ability:LaunchSpark(enemy, self.parent)
		self:Destroy()
		return
	end

	self:StartIntervalThink(self.think_interval)
end

function modifier_arc_warden_spark_wraith_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_ArcWarden.SparkWraith.Loop")
end

modifier_arc_warden_spark_wraith_custom_slow = class(mod_visible)
function modifier_arc_warden_spark_wraith_custom_slow:IsPurgable()
	return true
end
function modifier_arc_warden_spark_wraith_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.move_speed_slow_pct = self.ability.move_speed_slow_pct
end

function modifier_arc_warden_spark_wraith_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_arc_warden_spark_wraith_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.move_speed_slow_pct
end

modifier_arc_warden_spark_wraith_custom_move = class(mod_visible)
function modifier_arc_warden_spark_wraith_custom_move:GetTexture()
	return "buffs/arc_warden/spark_4"
end
function modifier_arc_warden_spark_wraith_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.move = self.ability.talents.e4_move
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/zeus/zuus_speed.vpcf", self)
end

function modifier_arc_warden_spark_wraith_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_arc_warden_spark_wraith_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

modifier_arc_warden_spark_wraith_custom_tracker = class(mod_hidden)
function modifier_arc_warden_spark_wraith_custom_tracker:RemoveOnDeath()
	return false
end
function modifier_arc_warden_spark_wraith_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.spark_ability = self.ability

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.spark_damage_base = self.ability:GetSpecialValueFor("spark_damage_base")
	self.ability.base_activation_delay = self.ability:GetSpecialValueFor("base_activation_delay")
	self.ability.wraith_speed_base = self.ability:GetSpecialValueFor("wraith_speed_base")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.think_interval = self.ability:GetSpecialValueFor("think_interval")
	self.ability.wraith_vision_radius = self.ability:GetSpecialValueFor("wraith_vision_radius")
	self.ability.wraith_vision_duration = self.ability:GetSpecialValueFor("wraith_vision_duration")
	self.ability.ministun_duration = self.ability:GetSpecialValueFor("ministun_duration")
	self.ability.move_speed_slow_pct = self.ability:GetSpecialValueFor("move_speed_slow_pct")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.damage_near = self.ability:GetSpecialValueFor("damage_near") / 100
	self.ability.tower_duration = self.ability:GetSpecialValueFor("tower_duration")
	self.ability.tower_radius = self.ability:GetSpecialValueFor("tower_radius")
	self.ability.damage_radius = self.ability:GetSpecialValueFor("damage_radius")

	self.legendary_ability = self.parent:FindAbilityByName("arc_warden_spark_wraith_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.visual_max = 6
end

function modifier_arc_warden_spark_wraith_custom_tracker:OnRefresh(table)
	self.ability.spark_damage_base = self.ability:GetSpecialValueFor("spark_damage_base")
	self.ability.ministun_duration = self.ability:GetSpecialValueFor("ministun_duration")
end

function modifier_arc_warden_spark_wraith_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
	}
end

function modifier_arc_warden_spark_wraith_custom_tracker:GetModifierPercentageManacostStacking()
	return self.ability.talents.h3_mana
end

function modifier_arc_warden_spark_wraith_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	local unit = params.unit

	if not unit:IsRealHero() then
		return
	end
	if unit ~= self.parent then
		return
	end

	if
		self.ability.talents.has_e3 == 1
		and RollPseudoRandomPercentage(self.ability.talents.e3_chance, 839, self.parent)
	then
		local target = params.target
		if not target or target:GetTeamNumber() == self.parent:GetTeamNumber() then
			target = self.parent:RandomTarget(self.ability.talents.e3_radius)
		end
		if target then
			self.ability:LaunchSpark(target, self.parent, "modifier_arc_warden_spark_3")
		end
	end

	if self.ability.talents.has_h3 == 0 then
		return
	end
	if params.ability:IsItem() then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_arc_warden_spark_wraith_custom_str",
		{ duration = self.ability.talents.h3_duration }
	)
	local str_target = self.parent:GetTempest()
	if str_target then
		str_target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_arc_warden_spark_wraith_custom_str",
			{ duration = self.ability.talents.h3_duration }
		)
	end
end

function modifier_arc_warden_spark_wraith_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if self.parent:IsTempestDouble() then
		return
	end

	local stack = 0
	local override = nil
	local interval = -1
	local mod = self.parent:FindModifierByName("modifier_arc_warden_spark_wraith_custom_legendary_stack")

	if mod then
		stack = mod:GetStackCount()
		if self.particle then
			ParticleManager:DestroyParticle(self.particle, true)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
	else
		if not self.particle then
			self.particle = self.parent:GenericParticle("particles/arc_warden/spark_stacks.vpcf", self, true)
			for i = 1, self.visual_max do
				ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
			end
		end
	end

	if self.legendary_ability and self.legendary_ability:GetCooldownTimeRemaining() > 0 then
		override = self.legendary_ability:GetCooldownTimeRemaining()
		interval = 1
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = self.ability.talents.e7_max,
		override_stack = override,
		style = "ArcSparks",
	})
	self:StartIntervalThink(interval)
end

function modifier_arc_warden_spark_wraith_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

modifier_arc_warden_spark_wraith_custom_str = class(mod_visible)
function modifier_arc_warden_spark_wraith_custom_str:GetTexture()
	return "buffs/arc_warden/hero_3"
end
function modifier_arc_warden_spark_wraith_custom_str:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.str = self.ability.talents.h3_str
	self.max = self.ability.talents.h3_max
	if not IsServer() then
		return
	end
	self.StackOnIllusion = true
	self:OnRefresh()
end

function modifier_arc_warden_spark_wraith_custom_str:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_arc_warden_spark_wraith_custom_str:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_arc_warden_spark_wraith_custom_str:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_arc_warden_spark_wraith_custom_str:GetModifierBonusStats_Strength()
	return self.str * self:GetStackCount()
end

modifier_arc_warden_spark_wraith_custom_legendary_stack = class(mod_hidden)
function modifier_arc_warden_spark_wraith_custom_legendary_stack:RemoveOnDeath()
	return false
end
function modifier_arc_warden_spark_wraith_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_max
	self.radius = self.ability.talents.e7_radius
	self.duration = self.ability.talents.e7_duration
	if not IsServer() then
		return
	end
	self.mod = self.parent:FindModifierByName("modifier_arc_warden_spark_wraith_custom_tracker")

	self.visual_max = 6
	self.particle = self.parent:GenericParticle("particles/arc_warden/spark_stacks.vpcf", self, true)

	self:OnRefresh()
	self:StartIntervalThink(0.2)
end

function modifier_arc_warden_spark_wraith_custom_legendary_stack:OnIntervalThink()
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

function modifier_arc_warden_spark_wraith_custom_legendary_stack:OnRefresh()
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

	if not self.particle then
		return
	end

	for i = 1, self.visual_max do
		if i <= math.floor(self:GetStackCount() / (self.max / self.visual_max)) then
			ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
		else
			ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
		end
	end
end

function modifier_arc_warden_spark_wraith_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.mod then
		return
	end
	self.mod:UpdateUI()
end

modifier_arc_warden_spark_wraith_custom_unslow = class(mod_hidden)
function modifier_arc_warden_spark_wraith_custom_unslow:GetEffectName()
	return "particles/econ/events/fall_2021/phase_boots_fall_2021_lvl2.vpcf"
end
function modifier_arc_warden_spark_wraith_custom_unslow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/zeus/zuus_speed.vpcf", self)
	self.parent:EmitSound("Arc.Spark_haste")
end

function modifier_arc_warden_spark_wraith_custom_unslow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_arc_warden_spark_wraith_custom_unslow:GetModifierSlowResistance_Stacking()
	return self.ability.talents.e4_slow_resist
end

arc_warden_spark_wraith_custom_legendary = class({})
arc_warden_spark_wraith_custom_legendary.talents = {}
function arc_warden_spark_wraith_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function arc_warden_spark_wraith_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e7 = 0,
			e7_damage = caster:GetTalentValue("modifier_arc_warden_spark_7", "damage", true) / 100,
			e7_damage_k = caster:GetTalentValue("modifier_arc_warden_spark_7", "damage_k", true),
			e7_talent_cd = caster:GetTalentValue("modifier_arc_warden_spark_7", "talent_cd", true),
			e7_duration = caster:GetTalentValue("modifier_arc_warden_spark_7", "duration", true),
			e7_stun = caster:GetTalentValue("modifier_arc_warden_spark_7", "stun", true),
			e7_radius = caster:GetTalentValue("modifier_arc_warden_spark_7", "radius", true),
			e7_max = caster:GetTalentValue("modifier_arc_warden_spark_7", "max", true),
			e7_cast = caster:GetTalentValue("modifier_arc_warden_spark_7", "cast", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_spark_7") then
		self.talents.has_e7 = 1
	end
end

function arc_warden_spark_wraith_custom_legendary:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.aoe_radius = self:GetLevelSpecialValueFor("aoe_radius", 1)
	self.ticks = self:GetLevelSpecialValueFor("ticks", 1)
end

function arc_warden_spark_wraith_custom_legendary:GetChannelTime()
	return self.talents.e7_cast or 0
end

function arc_warden_spark_wraith_custom_legendary:GetAOERadius()
	return self.aoe_radius or 0
end

function arc_warden_spark_wraith_custom_legendary:GetCooldown(iLevel)
	return self.talents.e7_talent_cd or 0
end

function arc_warden_spark_wraith_custom_legendary:OnAbilityPhaseStart()
	local caster_owner = self.caster.owner and self.caster.owner or self.caster
	local mod = caster_owner:FindModifierByName("modifier_arc_warden_spark_wraith_custom_legendary_stack")
	if not mod or mod:GetStackCount() <= 0 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = "#arc_no_charges" }
		)
		return false
	end

	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_3, 1.3)
	return true
end

function arc_warden_spark_wraith_custom_legendary:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_3)
end

function arc_warden_spark_wraith_custom_legendary:OnSpellStart()
	local target = self:GetCursorTarget()
	local tempest = self.caster:GetTempest()
	if tempest then
		local ability = tempest:FindAbilityByName(self:GetName())
		if ability then
			ability:StartCd()
		end
	end

	local caster_owner = self.caster.owner and self.caster.owner or self.caster
	local mod = caster_owner:FindModifierByName("modifier_arc_warden_spark_wraith_custom_legendary_stack")
	if not mod or mod:GetStackCount() <= 0 then
		return
	end

	local stack = mod:GetStackCount()
	mod:Destroy()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_arc_warden_spark_wraith_custom_legendary",
		{ stack = stack, target = target:entindex() }
	)
end

function arc_warden_spark_wraith_custom_legendary:OnChannelFinish(bInterrupted)
	self.caster:RemoveModifierByName("modifier_arc_warden_spark_wraith_custom_legendary")
end

modifier_arc_warden_spark_wraith_custom_legendary = class(mod_hidden)
function modifier_arc_warden_spark_wraith_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.target = EntIndexToHScript(table.target)

	self.particle_ally_fx =
		ParticleManager:CreateParticle("particles/arc_warden/spark_cast.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.particle_ally_fx, 0, self.parent:GetAbsOrigin())
	self:AddParticle(self.particle_ally_fx, false, false, -1, false, false)

	self.main_ability = self.parent.spark_ability

	if not self.main_ability then
		self:Destroy()
		return
	end

	self.max = self.ability.talents.e7_max
	self.stack = table.stack
	if self.stack >= self.max then
		self.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_stunned",
			{ duration = self.ability.talents.e7_stun }
		)
	end

	self.ticks = self.ability.ticks
	self.damage_k = self.ability.talents.e7_damage * math.pow(table.stack / self.max, self.ability.talents.e7_damage_k)

	self.damage = self.main_ability:GetDamage() * self.damage_k / self.ticks
	self.damage_table = {
		victim = self.target,
		damage = self.damage,
		attacker = self.parent,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}

	self.interval = 0.05
	self.count = 0.05
	self.launch_part = false
	self.launch_anim = false

	self.visual_timer = 0.2
	self.visual_count = 0

	self.radius = self.ability.aoe_radius
	self.effect_cast =
		ParticleManager:CreateParticle("particles/arc_warden/blue_zone.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.target)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.target:GetOrigin())
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.radius, 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_arc_warden_spark_wraith_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.target) or not self.target:IsAlive() then
		self:Destroy()
		return
	end

	self.count = self.count + self.interval
	self.visual_count = self.visual_count + self.interval

	if self.visual_count >= self.visual_timer then
		self.visual_count = 0

		local origin = self.target:GetAbsOrigin() + RandomVector(RandomInt(150, 300))
		CreateModifierThinker(
			self.parent,
			self.ability,
			"modifier_arc_warden_spark_wraith_custom_legendary_thinker",
			{ target = self.target:entindex(), duration = 3 },
			origin,
			self.parent:GetTeamNumber(),
			false
		)
	end

	if self.count >= 0.1 and self.launch_part == false then
		self.launch_part = true

		self.target:EmitSound("Arc.Spark_legendary")
		self.target:EmitSound("Arc.Spark_legendary2")

		for _, target in pairs(self.parent:FindTargets(self.radius, self.target:GetAbsOrigin())) do
			self.damage_table.victim = target
			DoDamage(self.damage_table, "modifier_arc_warden_spark_7")
		end

		for i = 1, 3 do
			local cast_particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				cast_particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				cast_particle,
				1,
				self.target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.target:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				cast_particle,
				2,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(cast_particle)
		end

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		local target_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.target
		)
		ParticleManager:SetParticleControlEnt(
			target_particle,
			0,
			self.target,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(target_particle)

		local cast_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_arc_warden/arc_warden_wraith_cast.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			cast_particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(cast_particle)
	end

	if self.count >= 0.45 and self.launch_anim == false then
		self.launch_anim = true
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_3, 1.2)
	end

	if self.count >= 0.7 then
		self.count = 0
		self.launch_part = false
		self.launch_anim = false
	end
end

function modifier_arc_warden_spark_wraith_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:Stop()
end

modifier_arc_warden_spark_wraith_custom_legendary_thinker = class(mod_hidden)
function modifier_arc_warden_spark_wraith_custom_legendary_thinker:OnCreated(table)
	if not IsServer() then
		return
	end
	self.target = EntIndexToHScript(table.target)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	local proj_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_arc_warden/arc_warden_wraith_prj.vpcf",
		self.ability
	)
	ProjectileManager:CreateTrackingProjectile({
		EffectName = proj_pfx,
		Ability = self.ability,
		vSourceLoc = self.parent:GetAbsOrigin(),
		Target = self.target,
		iMoveSpeed = 900,
		bDodgeable = false,
		bVisibleToEnemies = true,
		bProvidesVision = false,
	})

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Hero_ArcWarden.SparkWraith.Activate", self.caster)
end