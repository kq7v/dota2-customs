--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_furion_teleportation_custom",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_double",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_double_attack",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_tracker",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_legendary",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_teleport_7"
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_legendary_damage",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_teleport_7"
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_slow",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_teleport_2"
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_armor",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_hero_1"
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_status",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_bkb_cd",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_hero_5"
)
LinkLuaModifier(
	"modifier_furion_teleportation_custom_quest",
	"abilities/furion/furion_teleportation_custom",
	LUA_MODIFIER_MOTION_NONE
)

furion_teleportation_custom = class({})
furion_teleportation_custom.talents = {}

function furion_teleportation_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/nature_prophet/teleport_knock.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_hit.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/furion_teleport_start_fast.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/furion_teleport_fast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_arboreal_might_buff.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/furion_teleport_statuc.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_timer.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_damage.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_damage_aoe.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_resist.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/double_attack.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_armor.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/scurry_shield.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_refresh.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_proc_aoe.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_sprout_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
end

function furion_teleportation_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_base = 0,
			w1_damage = 0,
			w1_speed = 0,
			w1_damage_type = caster:GetTalentValue("modifier_furion_teleport_1", "damage_type", true),
			w1_chance = caster:GetTalentValue("modifier_furion_teleport_1", "chance", true),
			w1_chance_ent = caster:GetTalentValue("modifier_furion_teleport_1", "chance_ent", true),
			w1_radius = caster:GetTalentValue("modifier_furion_teleport_1", "radius", true),

			has_w2 = 0,
			w2_slow = 0,
			w2_range = 0,
			w2_duration = caster:GetTalentValue("modifier_furion_teleport_2", "duration", true),

			has_w3 = 0,
			w3_attacks = 0,
			w3_stats = 0,
			w3_chance = caster:GetTalentValue("modifier_furion_teleport_3", "chance", true),
			w3_damage = caster:GetTalentValue("modifier_furion_teleport_3", "damage", true),
			w3_duration = caster:GetTalentValue("modifier_furion_teleport_3", "duration", true),
			w3_delay = caster:GetTalentValue("modifier_furion_teleport_3", "delay", true),

			has_w4 = 0,
			w4_cd_inc = caster:GetTalentValue("modifier_furion_teleport_4", "cd_inc", true) / 100,
			w4_shield = caster:GetTalentValue("modifier_furion_teleport_4", "shield", true) / 100,
			w4_status = caster:GetTalentValue("modifier_furion_teleport_4", "status", true),

			has_w7 = 0,
			w7_interval = caster:GetTalentValue("modifier_furion_teleport_7", "interval", true),
			w7_effect_duration = caster:GetTalentValue("modifier_furion_teleport_7", "effect_duration", true),
			w7_damage_type = caster:GetTalentValue("modifier_furion_teleport_7", "damage_type", true),
			w7_bva = caster:GetTalentValue("modifier_furion_teleport_7", "bva", true),
			w7_damage = caster:GetTalentValue("modifier_furion_teleport_7", "damage", true) / 100,
			w7_base = caster:GetTalentValue("modifier_furion_teleport_7", "base", true),
			w7_range = caster:GetTalentValue("modifier_furion_teleport_7", "range", true),
			w7_duration = caster:GetTalentValue("modifier_furion_teleport_7", "duration", true),
			w7_duration_min = caster:GetTalentValue("modifier_furion_teleport_7", "duration_min", true),
			w7_radius = caster:GetTalentValue("modifier_furion_teleport_7", "radius", true),

			has_h1 = 0,
			h1_armor = 0,
			h1_range = 0,
			h1_bonus = caster:GetTalentValue("modifier_furion_hero_1", "bonus", true),
			h1_duration = caster:GetTalentValue("modifier_furion_hero_1", "duration", true),

			has_h2 = 0,
			h2_shield = 0,
			h2_mana = 0,

			has_h5 = 0,
			h5_bkb = caster:GetTalentValue("modifier_furion_hero_5", "bkb", true),
			h5_talent_cd = caster:GetTalentValue("modifier_furion_hero_5", "talent_cd", true),
			h5_cast = caster:GetTalentValue("modifier_furion_hero_5", "cast", true) / 100,
			h5_health = caster:GetTalentValue("modifier_furion_hero_5", "health", true),
		}
	end

	if caster:HasTalent("modifier_furion_teleport_1") then
		self.talents.has_w1 = 1
		self.talents.w1_base = caster:GetTalentValue("modifier_furion_teleport_1", "base")
		self.talents.w1_damage = caster:GetTalentValue("modifier_furion_teleport_1", "damage") / 100
		self.talents.w1_speed = caster:GetTalentValue("modifier_furion_teleport_1", "speed")
		self.caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
		self.caster:AddProc(self.tracker, { name = "w1", illusion = true, prd_owner = true, land = true })
	end

	if caster:HasTalent("modifier_furion_teleport_2") then
		self.talents.has_w2 = 1
		self.talents.w2_slow = caster:GetTalentValue("modifier_furion_teleport_2", "slow")
		self.talents.w2_range = caster:GetTalentValue("modifier_furion_teleport_2", "range")
		self.caster:AddProc(self.tracker, { name = "hit", land = true, illusion = true })
	end

	if caster:HasTalent("modifier_furion_teleport_3") then
		self.talents.has_w3 = 1
		self.talents.w3_attacks = caster:GetTalentValue("modifier_furion_teleport_3", "attacks")
		self.talents.w3_stats = caster:GetTalentValue("modifier_furion_teleport_3", "stats") / 100
		if IsServer() then
			self.caster:AddSpellEvent(self.tracker, true)
			self.caster:AddProc(self.tracker, { extra = false })
			self.parent:AddPercentStat(
				{ agi = self.talents.w3_stats, int = self.talents.w3_stats, str = self.talents.w3_stats },
				self.tracker
			)
		end
	end

	if caster:HasTalent("modifier_furion_teleport_4") then
		self.talents.has_w4 = 1
		self.caster:AddAttackStartEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_furion_teleport_7") then
		self.talents.has_w7 = 1
		self.caster:AddAttackStartEvent_out(self.tracker, true)
		if IsServer() and not self.w7_init then
			self.w7_init = true
			self:ToggleAutoCast()
		end
	end

	if caster:HasTalent("modifier_furion_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_armor = caster:GetTalentValue("modifier_furion_hero_1", "armor")
		self.talents.h1_range = caster:GetTalentValue("modifier_furion_hero_1", "range")
		self.caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_furion_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_shield = caster:GetTalentValue("modifier_furion_hero_2", "shield") / 100
		self.talents.h2_mana = caster:GetTalentValue("modifier_furion_hero_2", "mana") / 100
	end

	if caster:HasTalent("modifier_furion_hero_5") then
		self.talents.has_h5 = 1
		self.caster:AddDamageEvent_inc(self.tracker, true)
	end
end

function furion_teleportation_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_furion_teleportation_custom_tracker"
end

function furion_teleportation_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_furion_teleportation_custom_legendary") then
		return "stop_icons/furion_teleportation"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "furion_teleportation", self)
end

function furion_teleportation_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_furion_teleportation_custom_legendary") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function furion_teleportation_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
end

function furion_teleportation_custom:GetBehavior()
	if self.caster:HasModifier("modifier_furion_teleportation_custom_legendary") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_POINT
		+ DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
		+ (self.talents.has_w7 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function furion_teleportation_custom:FastRange()
	return (self.fast_range or 0) + self.caster:GetCastRangeBonus()
end

function furion_teleportation_custom:CastFilterResultLocation(point)
	local dist = (point - self.caster:GetAbsOrigin()):Length2D()
	self.is_fast = false

	if dist <= self:FastRange() then
		self.is_fast = true
	end
	return UF_SUCCESS
end

function furion_teleportation_custom:GetCastAnimation()
	if self.is_fast then
		return ACT_DOTA_CAST_ABILITY_6
	end
	return ACT_DOTA_CAST_ABILITY_2
end

function furion_teleportation_custom:GetCastPoint()
	local base = self.BaseClass.GetCastPoint(self)
	if self.is_fast then
		base = self.fast_cast
	end
	return base * (1 + (self.talents.has_h5 == 1 and self.talents.h5_cast or 0))
end

function furion_teleportation_custom:GetCastRange(vLocation, hTarget)
	if IsClient() or self.caster:HasModifier("modifier_the_hunt_custom_hero") then
		return self:FastRange() - self.caster:GetCastRangeBonus()
	end

	if IsServer() then
		return 99999
	end
end

function furion_teleportation_custom:OnAbilityPhaseStart()
	self.targetPoint = self:GetCursorPosition()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_furion_teleportation_custom",
		{
			x = self.targetPoint.x,
			y = self.targetPoint.y,
			duration = self:GetCastPoint() * self.ability:GetCastPointModifier(),
		}
	)
	return true
end

function furion_teleportation_custom:OnAbilityPhaseInterrupted()
	self.caster:RemoveModifierByName("modifier_furion_teleportation_custom")
end

function furion_teleportation_custom:OnSpellStart()
	if self.parent:HasModifier("modifier_furion_teleportation_custom_legendary") then
		self.parent:RemoveModifierByName("modifier_furion_teleportation_custom_legendary")
		return
	end

	if not self.is_fast then
		self.caster:AddNewModifier(self.caster, self, "modifier_can_not_push", { duration = self.tower_duration })
	end

	if self.talents.has_w7 == 1 then
		local dist = (self.targetPoint - self.caster:GetAbsOrigin()):Length2D()
		local duration = self.talents.w7_duration_min
			+ (self.talents.w7_duration - self.talents.w7_duration_min) * (math.min(1, dist / self.talents.w7_range))

		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_teleportation_custom_legendary",
			{ duration = duration, is_fast = self.is_fast and 1 or 0 }
		)
	end

	EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Hero_Furion.Teleport_Disappear", self.caster)

	FindClearSpaceForUnit(self.caster, self.targetPoint, true)
	ProjectileManager:ProjectileDodge(self.caster)

	EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Hero_Furion.Teleport_Appear", self.caster)

	if self.caster:GetQuest() == "Furion.Quest_6" and not self.caster:QuestCompleted() then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_furion_teleportation_custom_quest",
			{ duration = self.caster.quest.number }
		)
	end

	if self.talents.has_w4 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_furion_teleportation_custom_status",
			{ duration = self.buff_duration }
		)
		for _, treant in pairs(self.caster:FindFriends(2000, self.targetPoint)) do
			if treant:FindOwner() == self.caster and treant.is_treant then
				self:AddShield(treant)
			end
		end
	end

	self:AddShield(self.caster)
end

function furion_teleportation_custom:OnProjectileHit_ExtraData(target, Location, table)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	target:EmitSound("Furion.Teleport_slow")

	self.caster.furion_w3 = true
	self.caster:PerformAttack(target, true, true, true, true, false, false, false, { damage = "furion_w3" })
	self.caster.furion_w3 = false
end

function furion_teleportation_custom:AddShield(target)
	if not IsServer() then
		return
	end

	if IsValid(target.furion_shield_mod) then
		target.furion_shield_mod:Destroy()
	end

	local shield = self.shield + self.caster:GetMaxHealth() * self.talents.h2_shield
	if target.is_treant then
		shield = shield * self.talents.w4_shield
	end

	target.furion_shield_mod = target:AddNewModifier(self.caster, self, "modifier_generic_shield", {
		duration = self.buff_duration,
		max_shield = shield,
		start_full = 1,
		buff_mod = "modifier_furion_teleportation_custom_status",
	})

	if target.furion_shield_mod and not target.is_treant then
		self.particle =
			ParticleManager:CreateParticle("particles/hoodwink/scurry_shield.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControlEnt(
			self.particle,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		target.furion_shield_mod:AddParticle(self.particle, false, false, -1, false, false)

		target.furion_shield_mod:SetHitFunction(function(damage)
			local mana = damage * self.talents.h2_mana
			self.parent:GiveMana(mana)
		end)
	end
end

modifier_furion_teleportation_custom = class(mod_visible)
function modifier_furion_teleportation_custom:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)

	self.teleport_center = CreateUnitByName("npc_dota_companion", self.point, false, nil, nil, 0)
	self.teleport_center:AddNewModifier(self.teleport_center, nil, "modifier_phased", {})
	self.teleport_center:AddNewModifier(self.teleport_center, nil, "modifier_invulnerable", {})
	self.teleport_center:SetAbsOrigin(self.point)

	local pfx_1 = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/nature_prophet/furion_teleport_start_fast.vpcf",
		self
	)
	local pfx_2 = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/nature_prophet/furion_teleport_fast.vpcf",
		self
	)

	self.particle_fx = ParticleManager:CreateParticle(pfx_1, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle_fx, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle_fx, 2, Vector(0, 0, 0))
	if pfx_1 == "particles/nature_prophet/furion_teleport_start_fast.vpcf" then
		ParticleManager:SetParticleControl(self.particle_fx, 3, Vector(self:GetRemainingTime(), 0, 0))
	else
		local frames = 28 * (3 / self:GetRemainingTime())
		ParticleManager:SetParticleControl(self.particle_fx, 25, Vector(self:GetRemainingTime(), 0, 0))
		ParticleManager:SetParticleControl(self.particle_fx, 26, Vector(frames, 0, 0))
	end
	self:AddParticle(self.particle_fx, false, false, -1, false, false)

	self.end_particle_fx = ParticleManager:CreateParticle(pfx_2, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.end_particle_fx, 1, self.point)
	ParticleManager:SetParticleControl(self.end_particle_fx, 2, Vector(0, 0, 0))
	if pfx_2 == "particles/nature_prophet/furion_teleport_fast.vpcf" then
		ParticleManager:SetParticleControl(self.end_particle_fx, 3, Vector(self:GetRemainingTime(), 0, 0))
	else
		local frames = 25 * (3 / self:GetRemainingTime())
		ParticleManager:SetParticleControl(self.end_particle_fx, 25, Vector(self:GetRemainingTime(), 0, 0))
		ParticleManager:SetParticleControl(self.end_particle_fx, 26, Vector(frames, 0, 0))
	end
	self:AddParticle(self.end_particle_fx, false, false, -1, false, false)

	self.vision_radius = 10

	AddFOWViewer(self.parent:GetTeamNumber(), self.point, self.vision_radius, 0.2, false)
	self.sound = false

	self:StartIntervalThink(0.1)
end

function modifier_furion_teleportation_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.parent:GetTeamNumber(), self.point, self.vision_radius, 0.2, false)

	if self.sound == false then
		self.sound = true

		self.parent:EmitSound("Hero_Furion.Teleport_Grow")

		if IsValid(self.teleport_center) then
			self.teleport_center:EmitSound("Hero_Furion.Teleport_Grow")
		end
	end
end

function modifier_furion_teleportation_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.teleport_center) then
		self.teleport_center:StopSound("Hero_Furion.Teleport_Grow")
		UTIL_Remove(self.teleport_center)
	end

	if self:GetRemainingTime() < 0.03 then
		if self.particle_fx then
			ParticleManager:SetParticleControl(self.particle_fx, 2, Vector(1, 0, 0))
		end
		if self.end_particle_fx then
			ParticleManager:SetParticleControl(self.end_particle_fx, 2, Vector(1, 0, 0))
		end
	end

	self.parent:Stop()
	self.parent:StopSound("Hero_Furion.Teleport_Grow")
end

modifier_furion_teleportation_custom_tracker = class(mod_hidden)
function modifier_furion_teleportation_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.teleport_ability = self.ability

	self.ability.fast_range = self.ability:GetSpecialValueFor("fast_range")
	self.ability.shield = self.ability:GetSpecialValueFor("shield")
	self.ability.fast_cast = self.ability:GetSpecialValueFor("fast_cast")
	self.ability.buff_duration = self.ability:GetSpecialValueFor("buff_duration")
	self.ability.tower_duration = self.ability:GetSpecialValueFor("tower_duration")

	if not IsServer() then
		return
	end
	self.damageTable =
		{ attacker = self.parent, ability = self.ability, damage_type = self.ability.talents.w1_damage_type }
end

function modifier_furion_teleportation_custom_tracker:OnRefresh()
	self.ability.fast_range = self.ability:GetSpecialValueFor("fast_range")
	self.ability.shield = self.ability:GetSpecialValueFor("shield")
end

function modifier_furion_teleportation_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_h1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_teleportation_custom_armor",
			{ duration = self.ability.talents.h1_duration }
		)
	end

	if self.ability.talents.has_w3 == 1 and self.ability.talents.has_w7 == 0 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_teleportation_custom_double",
			{ duration = self.ability.talents.w3_duration }
		)
	end
end

function modifier_furion_teleportation_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local attacker = params.attacker
	local target = params.target

	if self.parent ~= attacker and (attacker:FindOwner() ~= self.parent or not attacker.is_treant) then
		return
	end

	if self.ability.talents.has_w2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_teleportation_custom_slow",
			{ duration = self.ability.talents.w2_duration }
		)
	end

	if not params.procs or not params.procs[self] or not params.procs[self].w1 then
		return
	end

	target:EmitSound("Furion.Teleport_proc")
	local particle =
		ParticleManager:CreateParticle("particles/nature_prophet/teleport_proc_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
	ParticleManager:Delete(particle, 1)

	local hit_effect =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_hit.vpcf", PATTACH_CUSTOMORIGIN, target)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		target,
		PATTACH_POINT,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	self.damageTable.damage = self.ability.talents.w1_base + self.ability.talents.w1_damage * self.parent:GetAllStats()

	for _, aoe_target in pairs(self.parent:FindTargets(self.ability.talents.w1_radius, target:GetAbsOrigin())) do
		self.damageTable.victim = aoe_target

		local real_damage = DoDamage(self.damageTable, "modifier_furion_teleport_1")
		aoe_target:SendNumber(4, real_damage)
	end
end

function modifier_furion_teleportation_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if name == "w1" then
		if params.attacker == self.parent then
			return self.ability.talents.w1_chance
		end
		if params.attacker.is_treant then
			return self.ability.talents.w1_chance_ent
		end
		return 0
	end
	if self.parent:HasModifier("modifier_furion_teleportation_custom_double") then
		return 100
	end
	local legendary_mod = self.parent:FindModifierByName("modifier_furion_teleportation_custom_legendary")
	if not legendary_mod then
		return 0
	end
	if not legendary_mod.double_proc then
		return 100
	end
	return self.ability.talents.w3_chance
end

function modifier_furion_teleportation_custom_tracker:AttackProcStart(params, name)
	if name == "w1" then
		return
	end
	local legendary_mod = self.parent:FindModifierByName("modifier_furion_teleportation_custom_legendary")
	if self.parent:HasModifier("modifier_furion_teleportation_custom_double") then
		self.parent:RemoveModifierByName("modifier_furion_teleportation_custom_double")
	elseif legendary_mod then
		legendary_mod.double_proc = true
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_furion_teleportation_custom_double_attack",
		{ target = params.target:entindex() }
	)
end

function modifier_furion_teleportation_custom_tracker:AttackStartEvent_out(params)
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

	local legendary_mod = self.parent:FindModifierByName("modifier_furion_teleportation_custom_legendary")

	if
		self.ability.talents.has_w4 == 1
		and not self.parent:HasModifier("modifier_furion_teleportation_custom_legendary")
	then
		self.parent:CdAbility(self.ability, nil, self.ability.talents.w4_cd_inc, "modifier_furion_teleport_4")
	end

	if legendary_mod then
		legendary_mod.last_target = target
		legendary_mod.stack = legendary_mod.stack + 1
	end
end

function modifier_furion_teleportation_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.h5_health then
		return
	end
	if self.parent:HasModifier("modifier_furion_teleportation_custom_bkb_cd") then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_furion_teleportation_custom_legendary")
	if mod then
		mod.refresh = true
	else
		self.ability:EndCooldown()
	end

	self.parent:Purge(false, true, false, true, true)

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_furion_teleportation_custom_bkb_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self.ability.talents.h5_bkb, effect = 2, sound = 1 }
	)

	local particle = ParticleManager:CreateParticle(
		"particles/nature_prophet/teleport_refresh.vpcf",
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

	self.parent:EmitSound("Furion.Teleport_refresh")
end

function modifier_furion_teleportation_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_furion_teleportation_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.furion_w3 then
		return
	end
	return self.ability.talents.w3_damage - 100
end

function modifier_furion_teleportation_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.w2_range
end

function modifier_furion_teleportation_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_furion_teleportation_custom_tracker:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h1_armor
		* (self.parent:HasModifier("modifier_furion_teleportation_custom_armor") and self.ability.talents.h1_bonus or 1)
end

function modifier_furion_teleportation_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.w1_speed
end

modifier_furion_teleportation_custom_legendary = class(mod_hidden)
function modifier_furion_teleportation_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false)

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true

	self.radius = self.ability.talents.w7_radius
	self.point = self.parent:GetAbsOrigin()
	self.time = self:GetRemainingTime()
	self.ability:EndCd(0.5)
	self.is_fast = table.is_fast

	self.stack = 0

	if self.is_fast == 1 then
		self.static_fx = ParticleManager:CreateParticle(
			"particles/nature_prophet/furion_teleport_statuc.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(self.static_fx, 0, self.point)
		ParticleManager:SetParticleControl(self.static_fx, 1, self.point)
		ParticleManager:SetParticleControl(self.static_fx, 2, Vector(0, 0, 0))
		ParticleManager:SetParticleControl(self.static_fx, 3, Vector(self:GetRemainingTime(), 0, 0))
		self:AddParticle(self.static_fx, false, false, -1, false, false)
	end

	self.parent:GenericParticle("particles/nature_prophet/sprout_buff.vpcf", self)

	self.interval = FrameTime()

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_furion_teleportation_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.parent:GetTeamNumber(), self.point, 300, self.interval * 2, false)
	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), 1200, self.interval * 2, false)

	self.parent:UpdateUIshort({
		max_time = self.time,
		time = self:GetRemainingTime(),
		stack = self.stack,
		style = "FurionTeleport",
		priority = 1,
	})

	if self.is_fast == 0 then
		return
	end

	local remaining = self:GetRemainingTime()
	local seconds = math.ceil(remaining)
	local isHalf = (seconds - remaining) >= 0.5

	if isHalf then
		seconds = seconds - 1
	end

	if self.half == isHalf then
		return
	end
	self.half = isHalf
	local mid = 1

	if isHalf then
		mid = 8
	end
	local len = 2
	if seconds < 1 then
		len = 1
		if not isHalf then
			return
		end
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_timer.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(1, seconds, mid))
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(len, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_furion_teleportation_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_furion_teleportation_custom_legendary:GetModifierBaseAttackTimeConstant()
	if not self.bva then
		return
	end
	return self.bva + self.ability.talents.w7_bva
end

function modifier_furion_teleportation_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()

	if self.refresh then
		self.ability:EndCooldown()
	elseif self.ability.talents.has_w4 == 1 and self.stack > 0 then
		self.parent:CdAbility(
			self.ability,
			nil,
			self.ability.talents.w4_cd_inc * self.stack,
			"modifier_furion_teleport_4"
		)
	end

	self.ability:AddShield(self.parent)

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "FurionTeleport", priority = 1 })

	if self.stack ~= 0 then
		local targets = self.parent:FindTargets(self.radius)
		local hit_targets = {}
		if IsValid(self.last_target) then
			table.insert(targets, self.last_target)
		end

		for _, enemy in pairs(targets) do
			if not hit_targets[enemy] then
				hit_targets[enemy] = true
				enemy:RemoveModifierByName("modifier_furion_teleportation_custom_legendary_damage")
				enemy:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_furion_teleportation_custom_legendary_damage",
					{ stack = self.stack }
				)

				local wrath_particle = ParticleManager:CreateParticle(
					"particles/nature_prophet/teleport_damage.vpcf",
					PATTACH_CUSTOMORIGIN_FOLLOW,
					enemy
				)
				ParticleManager:SetParticleControlEnt(
					wrath_particle,
					0,
					enemy,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					enemy:GetAbsOrigin(),
					true
				)
				ParticleManager:SetParticleControl(wrath_particle, 1, self.parent:GetAbsOrigin() + Vector(0, 0, 100))
				ParticleManager:SetParticleControlEnt(
					wrath_particle,
					4,
					enemy,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					enemy:GetAbsOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(wrath_particle)
			end
		end
	end

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), self.radius, 3, false)
	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Hero_Furion.CurseOfTheForest.Cast", self.parent)

	local nFXIndex =
		ParticleManager:CreateParticle("particles/nature_prophet/teleport_damage_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(nFXIndex, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(nFXIndex, 1, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(nFXIndex)

	if
		not self.ability:GetAutoCastState()
		or self.parent:IsRooted()
		or self.parent:IsLeashed()
		or self.is_fast == 0
	then
		return
	end

	self.particle_fx = ParticleManager:CreateParticle(
		"particles/nature_prophet/furion_teleport_start_fast.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(self.particle_fx, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle_fx, 2, Vector(1, 0, 0))
	ParticleManager:SetParticleControl(self.particle_fx, 3, Vector(self:GetRemainingTime(), 0, 0))
	ParticleManager:DestroyParticle(self.particle_fx, false)
	ParticleManager:ReleaseParticleIndex(self.particle_fx)

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Hero_Furion.Teleport_Disappear", self.parent)

	FindClearSpaceForUnit(self.parent, self.point, true)

	if self.static_fx then
		ParticleManager:SetParticleControl(self.static_fx, 2, Vector(1, 0, 0))
	end

	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), "Hero_Furion.Teleport_Appear", self.parent)
end

modifier_furion_teleportation_custom_legendary_damage = class(mod_visible)
function modifier_furion_teleportation_custom_legendary_damage:GetEffectName()
	return "particles/units/heroes/hero_furion/furion_sprout_damage.vpcf"
end
function modifier_furion_teleportation_custom_legendary_damage:GetStatusEffectName()
	return "particles/status_fx/status_effect_natures_prophet_curse.vpcf"
end
function modifier_furion_teleportation_custom_legendary_damage:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_furion_teleportation_custom_legendary_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self:SetStackCount(table.stack)
	self.parent:EmitSound(self.parent:IsCreep() and "Furion.Teleport_damage_creeps" or "Furion.Teleport_damage")

	self.interval = self.ability.talents.w7_interval
	self.count = (self.ability.talents.w7_effect_duration + 1) / self.interval
	self.damage = self.ability.talents.w7_base + self.ability.talents.w7_damage * self.caster:GetAllStats()

	self.damageTable = {
		victim = self.parent,
		ability = self.ability,
		attacker = self.caster,
		damage = self.damage * table.stack / self.count,
		damage_type = self.ability.talents.w7_damage_type,
	}

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_furion_teleportation_custom_legendary_damage:OnIntervalThink()
	if not IsServer() then
		return
	end

	local hit_effect =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_hit.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_POINT,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_POINT,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	local real_damage = DoDamage(self.damageTable, "modifier_furion_teleport_7")
	self.parent:SendNumber(108, real_damage)

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_furion_teleportation_custom_double_attack = class(mod_hidden)
function modifier_furion_teleportation_custom_double_attack:RemoveOnDeath()
	return false
end
function modifier_furion_teleportation_custom_double_attack:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_furion_teleportation_custom_double_attack:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.count = self.ability.talents.w3_attacks - 1
	self.target = EntIndexToHScript(table.target)

	self.info = {
		Ability = self.ability,
		iMoveSpeed = self.parent:GetProjectileSpeed(),
		Source = self.parent,
		bDodgeable = true,
		Target = self.target,
		EffectName = "particles/nature_prophet/double_attack.vpcf",
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	self:StartIntervalThink(self.ability.talents.w3_delay)
end

function modifier_furion_teleportation_custom_double_attack:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.target) or self.count <= 0 then
		self:Destroy()
		return
	end

	self.parent:EmitSound("Furion.Teleport_double")
	ProjectileManager:CreateTrackingProjectile(self.info)

	self.count = self.count - 1
end

modifier_furion_teleportation_custom_slow = class(mod_hidden)
function modifier_furion_teleportation_custom_slow:IsPurgable()
	return true
end
function modifier_furion_teleportation_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_furion_teleportation_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_furion_teleportation_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_furion_teleportation_custom_status = class(mod_hidden)
function modifier_furion_teleportation_custom_status:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.status = self.ability.talents.w4_status
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/nature_prophet/teleport_resist.vpcf", self)
end

function modifier_furion_teleportation_custom_status:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_furion_teleportation_custom_status:GetModifierStatusResistanceStacking()
	return self.status
end

modifier_furion_teleportation_custom_bkb_cd = class(mod_cd)
function modifier_furion_teleportation_custom_bkb_cd:GetTexture()
	return "buffs/furion/hero_5"
end

modifier_furion_teleportation_custom_armor = class(mod_hidden)
modifier_furion_teleportation_custom_double = class(mod_hidden)
modifier_furion_teleportation_custom_quest = class(mod_hidden)