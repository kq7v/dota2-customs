--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_soldier_active",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_thinker",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_soldier",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_soldier_legendary",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_buff",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_effect",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_tracker",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_slow",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_command_4"
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_inactive",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_nodraw",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_leash",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_burn",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_burn_count",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_command_1"
)
LinkLuaModifier(
	"modifier_monkey_king_wukongs_command_custom_magic",
	"abilities/monkey_king/monkey_king_wukongs_command_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_command_3"
)

monkey_king_wukongs_command_custom = class({})
monkey_king_wukongs_command_custom.talents = {}
monkey_king_wukongs_command_custom.soldiers_max = 8
monkey_king_wukongs_command_custom.soldiers = {}
monkey_king_wukongs_command_custom.legendary_soldier = nil

function monkey_king_wukongs_command_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_fur_army_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_fur_army_positions.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_fur_army_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_furarmy_ring.vpcf", context)
	PrecacheResource("particle", "particles/huskar/huskar_disarm_coil.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_monkey_king_fur_army.vpcf", context)
	PrecacheResource("particle", "particles/items/celestial_spear_leash.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/command_buff.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/monkey_king/mk_ti9_immortal/status_effect_mk_ti9_immortal_army.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_overhead.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_start.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_tap_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
end

function monkey_king_wukongs_command_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_heal = 0,
			r1_max = caster:GetTalentValue("modifier_monkey_king_command_1", "max", true),
			r1_damage_type = caster:GetTalentValue("modifier_monkey_king_command_1", "damage_type", true),
			r1_radius = caster:GetTalentValue("modifier_monkey_king_command_1", "radius", true),

			has_r2 = 0,
			r2_cd = 0,
			r2_duration = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_magic = 0,
			r3_duration = caster:GetTalentValue("modifier_monkey_king_command_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_monkey_king_command_3", "max", true),
			r3_damage_type = caster:GetTalentValue("modifier_monkey_king_command_3", "damage_type", true),
			r3_chance = caster:GetTalentValue("modifier_monkey_king_command_3", "chance", true),

			has_r4 = 0,
			r4_damage = caster:GetTalentValue("modifier_monkey_king_command_4", "damage", true) / 100,
			r4_cd_items = caster:GetTalentValue("modifier_monkey_king_command_4", "cd_items", true) / 100,
			r4_duration = caster:GetTalentValue("modifier_monkey_king_command_4", "duration", true),
			r4_slow = caster:GetTalentValue("modifier_monkey_king_command_4", "slow", true),

			has_r7 = 0,
			r7_delay = caster:GetTalentValue("modifier_monkey_king_command_7", "delay", true),
			r7_range = caster:GetTalentValue("modifier_monkey_king_command_7", "range", true),
			r7_spell = caster:GetTalentValue("modifier_monkey_king_command_7", "spell", true),
			r7_heal = caster:GetTalentValue("modifier_monkey_king_command_7", "heal", true) / 100,
			r7_delay_spring = caster:GetTalentValue("modifier_monkey_king_command_7", "delay_spring", true),
			r7_duration = caster:GetTalentValue("modifier_monkey_king_command_7", "duration", true),
			r7_cd = caster:GetTalentValue("modifier_monkey_king_command_7", "cd", true),
			r7_cdr = caster:GetTalentValue("modifier_monkey_king_command_7", "cdr", true),

			has_h6 = 0,
			h6_cast = caster:GetTalentValue("modifier_monkey_king_hero_6", "cast", true),
			h6_bkb = caster:GetTalentValue("modifier_monkey_king_hero_6", "bkb", true),
		}
	end

	if caster:HasTalent("modifier_monkey_king_command_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_monkey_king_command_1", "damage")
		self.talents.r1_heal = caster:GetTalentValue("modifier_monkey_king_command_1", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_monkey_king_command_1", type = 1, value = self.talents.r1_heal }
		)
	end

	if caster:HasTalent("modifier_monkey_king_command_2") then
		self.talents.has_r2 = 1
		self.talents.r2_cd = caster:GetTalentValue("modifier_monkey_king_command_2", "cd")
		self.talents.r2_duration = caster:GetTalentValue("modifier_monkey_king_command_2", "duration")
	end

	if caster:HasTalent("modifier_monkey_king_command_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_monkey_king_command_3", "damage")
		self.talents.r3_magic = caster:GetTalentValue("modifier_monkey_king_command_3", "magic")
	end

	if caster:HasTalent("modifier_monkey_king_command_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_monkey_king_command_7") then
		self.talents.has_r7 = 1
		if IsServer() and not self.r7_init then
			self.r7_init = true
			self:CreateSoldier(true)
		end
	end

	if caster:HasTalent("modifier_monkey_king_hero_6") then
		self.talents.has_h6 = 1
	end
end

function monkey_king_wukongs_command_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_monkey_king_wukongs_command_custom_buff") then
		return "stop_icons/monkey_king_wukongs_command"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "monkey_king_wukongs_command", self)
end

function monkey_king_wukongs_command_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_monkey_king_wukongs_command_custom_tracker"
end

function monkey_king_wukongs_command_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_monkey_king_wukongs_command_custom_buff") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function monkey_king_wukongs_command_custom:GetBehavior()
	if self.caster:HasModifier("modifier_monkey_king_wukongs_command_custom_buff") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end

function monkey_king_wukongs_command_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
		+ (self.talents.r2_cd or 0)
		+ (self.talents.has_r7 == 1 and self.talents.r7_cd or 0)
end

function monkey_king_wukongs_command_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h6 == 1 and self.talents.h6_cast or 0)
end

function monkey_king_wukongs_command_custom:GetCastAnimation()
	return ACT_DOTA_MK_FUR_ARMY
end

function monkey_king_wukongs_command_custom:GetAOERadius()
	return self.second_radius or 0
end

function monkey_king_wukongs_command_custom:OnAbilityPhaseStart()
	self.caster:EmitSound("Hero_MonkeyKing.FurArmy.Channel")

	local max = self.num_first_soldiers + self.num_second_soldiers

	if #self.soldiers < max then
		for i = 1, self.soldiers_max do
			self:CreateSoldier()
		end
	end

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_fur_army_cast.vpcf",
		self
	)
	self.cast_particle = ParticleManager:CreateParticle(particle_name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.cast_particle, 0, self.caster:GetAbsOrigin())
	return true
end

function monkey_king_wukongs_command_custom:OnAbilityPhaseInterrupted()
	self.caster:StopSound("Hero_MonkeyKing.FurArmy.Channel")

	if not self.cast_particle then
		return
	end
	ParticleManager:DestroyParticle(self.cast_particle, true)
	ParticleManager:ReleaseParticleIndex(self.cast_particle)
	self.cast_particle = nil
end

function monkey_king_wukongs_command_custom:OnSpellStart()
	if IsValid(self.thinker) then
		self.thinker:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_thinker")
		return
	end

	if self.cast_particle then
		ParticleManager:DestroyParticle(self.cast_particle, false)
		ParticleManager:ReleaseParticleIndex(self.cast_particle)
		self.cast_particle = nil
	end

	self.caster:RemoveModifierByName("modifier_monkey_king_tree_dance_custom")
	FindClearSpaceForUnit(self.caster, self.caster:GetAbsOrigin(), false)

	local duration = self.duration
		+ self.talents.r2_duration
		+ (self.talents.has_r7 == 1 and self.talents.r7_duration or 0)
	self.thinker = CreateModifierThinker(
		self.caster,
		self,
		"modifier_monkey_king_wukongs_command_custom_thinker",
		{ duration = duration + 0.2 },
		self:GetCursorPosition(),
		self.caster:GetTeamNumber(),
		false
	)
end

function monkey_king_wukongs_command_custom:GetFreeSoldier()
	local new_monkey = nil
	local max_time = 0
	local max_i = 0

	for i, soldier in pairs(self.soldiers) do
		local mod = soldier:FindModifierByName("modifier_monkey_king_wukongs_command_custom_soldier_active")
		if not mod then
			new_monkey = soldier
			break
		end
		if mod and mod:GetElapsedTime() > max_time then
			max_time = mod:GetElapsedTime()
			max_i = i
		end
	end

	if not new_monkey then
		new_monkey = self.soldiers[max_i]
	end
	return new_monkey
end

function monkey_king_wukongs_command_custom:CreateSoldiers()
	self.soldiers = {}
	self.caster.command_ability = self

	self.damage = self:GetLevelSpecialValueFor("damage", 1)
	self.attack_speed = self:GetLevelSpecialValueFor("attack_speed", 1)
	self.move_speed = self:GetLevelSpecialValueFor("move_speed", 1)
	self.shard_range = self:GetLevelSpecialValueFor("shard_range", 1)
	self.scepter_interval = self:GetLevelSpecialValueFor("scepter_interval", 1)
	self.scepter_duration = self:GetLevelSpecialValueFor("scepter_duration", 1)

	for i = 1, self.soldiers_max do
		Timers:CreateTimer("mk" .. i, {
			useGameTime = false,
			endTime = 0.5 * i,
			callback = function()
				self:CreateSoldier()
			end,
		})
	end
end

function monkey_king_wukongs_command_custom:CreateSoldier(is_legendary)
	if not IsServer() then
		return
	end
	if #self.soldiers >= self.soldiers_max and not is_legendary then
		return
	end

	local soldier = CreateUnitByName(
		self.caster:GetUnitName(),
		self.caster:GetAbsOrigin(),
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)

	if not soldier then
		return
	end

	for i = 0, 24 do
		local current_ability = soldier:GetAbilityByIndex(i)
		if current_ability then
			soldier:RemoveAbility(current_ability:GetName())
		end
	end

	soldier.owner = self.caster
	soldier.is_monkey_soldier = true
	soldier:AddNewModifier(self.caster, self, "modifier_monkey_king_wukongs_command_custom_soldier", {})

	if is_legendary then
		self.legendary_soldier = soldier
		soldier.is_monkey_soldier_legendary = true
		soldier:AddNewModifier(self.caster, self, "modifier_monkey_king_wukongs_command_custom_soldier_legendary", {})
	else
		table.insert(self.soldiers, soldier)
	end
end

function monkey_king_wukongs_command_custom:SpawnSoldier(point, new_duration, run)
	if not IsServer() then
		return
	end

	local soldier = self:GetFreeSoldier()
	if not IsValid(soldier) then
		return
	end

	local duration = new_duration and new_duration or self.scepter_duration
	soldier:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_soldier_active")
	soldier:AddNewModifier(
		self.caster,
		self,
		"modifier_monkey_king_wukongs_command_custom_soldier_active",
		{ origin_x = point.x, origin_y = point.y, run = run and 1 or 0, duration = duration }
	)

	return soldier
end

modifier_monkey_king_wukongs_command_custom_thinker = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_thinker:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.center = self.parent:GetAbsOrigin()

	self.num_first_soldiers = self.ability.num_first_soldiers
	self.num_second_soldiers = self.ability.num_second_soldiers
	self.radius = self.ability.second_radius
	self.first_radius = self.ability.first_radius

	self.interval = 0.05
	self.ability:EndCd(1)

	if self.ability.talents.has_h6 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self.ability.talents.h6_bkb, effect = 2, sound = 1 }
		)
	end

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_monkey_king_wukongs_command_custom_buff",
		{ duration = self:GetRemainingTime() }
	)

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_furarmy_ring.vpcf",
		self
	)
	local particleID = ParticleManager:CreateParticle(particle_name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particleID, 0, self.center)
	ParticleManager:SetParticleControl(particleID, 1, Vector(self.radius, self.radius, self.radius))
	self:AddParticle(particleID, false, false, -1, false, false)

	self.parent:EmitSound("Hero_MonkeyKing.FurArmy")

	self.leash_targets = {}

	if self.caster:HasShard() then
		self.parent:GenericParticle("particles/huskar/huskar_disarm_coil.vpcf", self)
	end

	self.soldier_count = 0
	self.stage = 0
	self.max = self.num_second_soldiers

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_monkey_king_wukongs_command_custom_thinker:OnIntervalThink()
	if not IsServer() then
		return
	end

	self:CheckLeash()

	if self.stage == 0 or self.stage == 1 then
		local soldier = self.ability:GetFreeSoldier()
		self.soldier_count = self.soldier_count + 1

		local vTargetPosition
		if self.stage == 0 then
			vTargetPosition = self.center
				+ self.radius * self:Rotation2D(Vector(0, 1, 0), math.rad((self.soldier_count - 0.25) * 360 / self.max))
		else
			vTargetPosition = self.center
				+ self.first_radius
					* self:Rotation2D(Vector(0, 1, 0), math.rad((self.soldier_count - 0.5) * 360 / self.max))
		end

		if self.stage == 1 and self.ability.talents.has_r7 == 1 and self.ability.legendary_soldier then
			soldier = self.ability.legendary_soldier
			vTargetPosition = self.center
		end

		if IsValid(soldier) then
			soldier:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_soldier_active")
			soldier:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_monkey_king_wukongs_command_custom_soldier_active",
				{ origin_x = vTargetPosition.x, origin_y = vTargetPosition.y, run = 1, ultimate = 1 }
			)
		end

		if self.soldier_count >= self.max then
			self.soldier_count = 0
			self.max = self.num_first_soldiers
			self.stage = self.stage + 1

			if self.stage == 1 and self.ability.talents.has_r7 == 1 then
				self.max = 1
			end
		end
		return
	end

	self:StartIntervalThink(0.2)
end

function modifier_monkey_king_wukongs_command_custom_thinker:Rotation2D(vVector, radian)
	local fLength2D = vVector:Length2D()
	local vUnitVector2D = vVector / fLength2D
	local fCos = math.cos(radian)
	local fSin = math.sin(radian)
	return Vector(
		vUnitVector2D.x * fCos - vUnitVector2D.y * fSin,
		vUnitVector2D.x * fSin + vUnitVector2D.y * fCos,
		vUnitVector2D.z
	) * fLength2D
end

function modifier_monkey_king_wukongs_command_custom_thinker:CheckLeash()
	if not IsServer() then
		return
	end
	if not self.caster:HasShard() then
		return
	end

	for _, target in pairs(self.caster:FindTargets(self.radius, self.center)) do
		if target:IsRealHero() and not self.leash_targets[target:entindex()] then
			self.leash_targets[target:entindex()] = true
			target:AddNewModifier(
				self.caster,
				self.caster:BkbAbility(self.ability, true),
				"modifier_monkey_king_wukongs_command_custom_leash",
				{ thinker = self.parent:entindex(), duration = self:GetRemainingTime() }
			)
		end
	end
end

function modifier_monkey_king_wukongs_command_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()

	for _, soldier in pairs(self.ability.soldiers) do
		local mod = soldier:FindModifierByName("modifier_monkey_king_wukongs_command_custom_soldier_active")
		if mod and mod.ultimate == 1 then
			soldier:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_soldier_active")
		end
	end

	if self.ability.legendary_soldier then
		self.ability.legendary_soldier:RemoveModifierByName(
			"modifier_monkey_king_wukongs_command_custom_soldier_active"
		)
	end

	self.caster:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_buff")
	self.parent:StopSound("Hero_MonkeyKing.FurArmy")

	EmitSoundOnLocationWithCaster(self.center, "Hero_MonkeyKing.FurArmy.End", self.caster)
	UTIL_Remove(self.parent)
end

modifier_monkey_king_wukongs_command_custom_tracker = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_tracker:IsAura()
	return IsServer() and self.parent:IsAlive() and self.ability.talents.has_r1 == 1
end
function modifier_monkey_king_wukongs_command_custom_tracker:GetAuraRadius()
	return self.ability.talents.r1_radius
end
function modifier_monkey_king_wukongs_command_custom_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_monkey_king_wukongs_command_custom_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_monkey_king_wukongs_command_custom_tracker:GetModifierAura()
	return "modifier_monkey_king_wukongs_command_custom_burn"
end
function modifier_monkey_king_wukongs_command_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.command_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.attack_speed = self.ability:GetSpecialValueFor("attack_speed")
	self.ability.move_speed = self.ability:GetSpecialValueFor("move_speed")
	self.ability.shard_range = self.ability:GetSpecialValueFor("shard_range")
	self.ability.scepter_interval = self.ability:GetSpecialValueFor("scepter_interval")
	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")

	self.ability.bonus_armor = self.ability:GetSpecialValueFor("bonus_armor")
	self.ability.first_radius = self.ability:GetSpecialValueFor("first_radius")
	self.ability.second_radius = self.ability:GetSpecialValueFor("second_radius")
	self.ability.num_first_soldiers = self.ability:GetSpecialValueFor("num_first_soldiers")
	self.ability.num_second_soldiers = self.ability:GetSpecialValueFor("num_second_soldiers")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.shard_knock_duration = self.ability:GetSpecialValueFor("shard_knock_duration")
	self.ability.shard_knock_range = self.ability:GetSpecialValueFor("shard_knock_range")
	self.ability.shard_radius = self.ability:GetSpecialValueFor("shard_radius")
end

function modifier_monkey_king_wukongs_command_custom_tracker:OnRefresh(table)
	self.ability.bonus_armor = self.ability:GetSpecialValueFor("bonus_armor")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_monkey_king_wukongs_command_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_monkey_king_wukongs_command_custom_tracker:GetModifierAttackRangeBonus()
	if not self.parent:HasShard() then
		return
	end
	return self.ability.shard_range
end

modifier_monkey_king_wukongs_command_custom_soldier_active = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_soldier_active:IsAura()
	return IsServer() and self.parent:IsAlive() and self.ability.talents.has_r1 == 1
end
function modifier_monkey_king_wukongs_command_custom_soldier_active:GetAuraRadius()
	return self.ability.talents.r1_radius
end
function modifier_monkey_king_wukongs_command_custom_soldier_active:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_monkey_king_wukongs_command_custom_soldier_active:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_monkey_king_wukongs_command_custom_soldier_active:GetModifierAura()
	return "modifier_monkey_king_wukongs_command_custom_burn"
end
function modifier_monkey_king_wukongs_command_custom_soldier_active:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.attack_speed = self.ability.attack_speed
	self.move_speed = self.ability.move_speed

	if not IsServer() then
		return
	end
	self.damage = self.ability.damage - 100
	self.attack_range = self.parent:Script_GetAttackRange()

	self.parent:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_inactive")

	for i = 0, 5 do
		local item = self.caster:GetItemInSlot(i)
		if item then
			local new_item = CreateItem(item:GetName(), nil, nil)
			if IsValid(new_item) then
				local soldier_item = self.parent:AddItem(new_item)
				if IsValid(soldier_item) then
					soldier_item:SetPurchaser(nil)
					if item:GetCurrentCharges() > 0 then
						soldier_item:SetCurrentCharges(item:GetCurrentCharges())
					end
					self.parent:SwapItems(soldier_item:GetItemSlot(), i)
				end
			end
		end
	end

	for level = 1, self.caster:GetLevel() do
		if self.parent:GetLevel() < self.caster:GetLevel() then
			self.parent:HeroLevelUp(false)
		end
	end

	for _, mod in pairs(self.caster:FindAllModifiers()) do
		if
			mod.StackOnIllusion
			or mod:GetName() == "modifier_item_ultimate_scepter_consumed"
			or mod:GetName() == "modifier_item_aghanims_shard"
		then
			local old_mod = self.parent:FindModifierByName(mod:GetName())
			if not old_mod then
				old_mod = self.parent:AddNewModifier(self.parent, nil, mod:GetName(), {})
			end
			old_mod:SetStackCount(mod:GetStackCount())
		end
	end

	if IsValid(self.parent.stats_tracker) then
		self.parent:AddNewModifier(self.parent, self.parent.stats_tracker.ability, "modifier_general_stats", {})
	end

	self.search_radius = self.attack_range + self.parent:GetHullRadius()
	self.attack_target = nil
	self.radius = self.ability.second_radius

	self.target = nil
	self.ultimate = params.ultimate

	self.origin = self.caster:GetAbsOrigin()
	if params.origin_x then
		self.origin = GetGroundPosition(Vector(params.origin_x, params.origin_y, 0), nil)
	end

	self.interval = 0.1
	self.target_position = self.origin
	if params.run == 1 then
		self.parent:SetAbsOrigin(self.caster:GetAbsOrigin())
		self.parent:MoveToPosition(self.target_position)
		self.stage = 0
	else
		self.stage = 1
		self.parent:SetAbsOrigin(self.origin)
	end

	if not self.parent.is_monkey_soldier_legendary then
		self.parent:AddNewModifier(self.caster, self.ability, "modifier_monkey_king_wukongs_command_custom_effect", nil)
	else
		local abilities = {
			"monkey_king_boundless_strike_custom",
			"monkey_king_primal_spring_custom",
		}

		for _, ability in pairs(abilities) do
			local clone_ability = self.parent:FindAbilityByName(ability)
			local caster_ability = self.caster:FindAbilityByName(ability)
			if not clone_ability then
				clone_ability = self.parent:AddAbility(ability)
			end
			if clone_ability and caster_ability and caster_ability:IsTrained() then
				clone_ability:SetLevel(caster_ability:GetLevel())
				clone_ability:UpdateTalents()
			end
		end

		self.cast_data = {}
		self.interval = FrameTime() * 2
		self.parent:AddSpellEvent(self, true)
		self.parent:AddLifesteal(
			self,
			{
				name = "modifier_monkey_king_command_7",
				heal_unit = self.caster,
				illusion = true,
				value = self.ability.talents.r7_heal,
			}
		)

		self.parent:GenericParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_overhead.vpcf",
			self,
			true
		)
		self.parent:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_start.vpcf")

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_tap_buff.vpcf",
			PATTACH_ABSORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_weapon_top",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			2,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_weapon_top",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			3,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_weapon_bot",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(particle, true, false, 0, false, false)
	end

	self.particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_fur_army_positions.vpcf",
		self
	)

	self.particleID = ParticleManager:CreateParticle(self.particle_name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particleID, 0, self.target_position)
	self:AddParticle(self.particleID, false, false, -1, false, false)

	self.flags = DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS
	if self.ability.talents.has_r4 == 0 then
		self.flags = self.flags + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE
	end

	self.damageTable = {
		attacker = self.parent,
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
		damage_flags = DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK,
	}

	self:StartIntervalThink(self.interval)
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:SpellEvent(params)
	if not IsServer() then
		return
	end
	if not self.parent.is_monkey_soldier_legendary then
		return
	end
	if params.unit ~= self.caster then
		return
	end

	local target = params.target
	if target and target:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if params.ability:GetName() == "monkey_king_primal_spring_custom" and not params.spring_charge then
		return
	end

	local new_data = {
		ability = params.ability,
		point = params.point,
		target = params.target,
		not_target = bit.band(params.ability:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_NO_TARGET) ~= 0,
		time = GameRules:GetDOTATime(false, false)
			+ (params.spring_charge and self.ability.talents.r7_delay_spring or self.ability.talents.r7_delay),
		ended = false,
		spring_charge = params.spring_charge,
	}

	table.insert(self.cast_data, new_data)
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.stage == 0 then
		if (self.parent:GetAbsOrigin() - self.target_position):Length2D() <= 10 then
			self.stage = 1
			FindClearSpaceForUnit(self.parent, self.target_position, false)
		end
		return
	end

	if self.parent.is_monkey_soldier_legendary then
		if not self.parent:IsStunned() and not self.parent:GetCurrentActiveAbility() then
			for i, data in ipairs(self.cast_data) do
				if not data.ended and GameRules:GetDOTATime(false, false) >= data.time then
					local ability = data.ability
					local not_target = data.not_target
					local point = data.point
					local target = data.target

					local self_ability
					if ability:IsItem() then
						self_ability = self.parent:FindItemInInventory(ability:GetName())
					else
						self_ability = self.parent:FindAbilityByName(ability:GetName())
					end

					if self_ability then
						self_ability:EndCooldown()
						if self_ability:GetMaxAbilityCharges(self_ability:GetLevel()) > 0 then
							self_ability:RefreshCharges()
						end
						local range = self_ability:GetEffectiveCastRange(Vector(0, 0, 0), nil)
						local cast = false

						if not_target then
							self.parent:CastAbilityNoTarget(self_ability, 1)
							cast = true
						elseif IsValid(target) then
							if
								not target:IsInvulnerable()
								and self.parent:CanEntityBeSeenByMyTeam(target)
								and (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= range
							then
								self.parent:CastAbilityOnTarget(target, self_ability, 1)
								cast = true
							end
						elseif point then
							local cast_point = self.parent:CastPosition(point)
							local dir = cast_point - self.parent:GetAbsOrigin()
							if dir:Length2D() >= range then
								cast_point = self.parent:GetAbsOrigin() + dir:Normalized() * (range - 10)
							end
							if data.spring_charge then
								self.parent.spring_charge = data.spring_charge
							end
							self.parent:CastAbilityOnPosition(cast_point, self_ability, 1)
							cast = true
						end
						if cast then
							data.ended = true
							break
						end
					end
				end
			end
		end
		return
	end

	if not self:CheckTarget() then
		self:FindTarget()
	else
		if self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_effect") and self.ultimate == 1 then
			self.parent:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_effect")
			self.parent:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_fur_army_attack.vpcf")
		end
	end

	self:StartIntervalThink(self.interval * 2)
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:FindTarget()
	if not IsServer() then
		return
	end

	local targets = self.parent:FindTargets(self.search_radius, self.parent:GetAbsOrigin(), FIND_CLOSEST, self.flags)

	local target = targets[1]
	if IsValid(target) and target:IsUnit() then
		self.attack_target = target
		self.parent:SetForceAttackTarget(self.attack_target)
		self.parent:MoveToTargetToAttack(self.attack_target)
	end
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:CheckTarget()
	if not IsServer() then
		return
	end

	if
		not IsValid(self.attack_target)
		or not self.attack_target:IsAlive()
		or ((self.attack_target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > (35 + self.search_radius))
	then
		if self.parent:GetForceAttackTarget() then
			self.parent:Stop()
			self.parent:SetForceAttackTarget(nil)
		end
		if not self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_effect") then
			self.parent:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_monkey_king_wukongs_command_custom_effect",
				nil
			)
		end
		return false
	end

	self.parent:SetForceAttackTarget(self.attack_target)
	self.parent:MoveToTargetToAttack(self.attack_target)
	return true
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:OnDestroy()
	if not IsServer() then
		return
	end

	if self.particleID then
		ParticleManager:SetParticleControl(self.particleID, 0, self.parent:GetAbsOrigin())
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_monkey_king_wukongs_command_custom_inactive", {})
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:CheckState()
	if self.stage == 1 and not self.parent.is_monkey_soldier_legendary then
		return {
			[MODIFIER_STATE_ROOTED] = true,
		}
	end
	return
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_FIXED_ATTACK_RATE,
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_MAGICAL,
	}
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:GetOverrideAttackMagical()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return 1
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if params.damage_category ~= DOTA_DAMAGE_CATEGORY_ATTACK then
		return
	end
	if params.damage_type == DAMAGE_TYPE_MAGICAL then
		return
	end

	local target = params.target
	if target and target:IsAttackImmune() and self.ability.talents.has_r4 == 1 then
		self.damageTable.damage = params.original_damage
			* (1 + self.damage / 100)
			* (1 + self.ability.talents.r4_damage)
		self.damageTable.victim = target

		DoDamage(self.damageTable, "modifier_monkey_king_command_4")
		return -200
	end

	return self.damage
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:GetModifierFixedAttackRate()
	return self.attack_speed + (self.caster:HasScepter() and self.ability.scepter_interval or 0)
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:GetModifierMoveSpeed_Absolute()
	if not IsServer() then
		return
	end
	if self.stage == 1 then
		return 1
	end
	return self.move_speed
end

function modifier_monkey_king_wukongs_command_custom_soldier_active:GetActivityTranslationModifiers()
	return "run_fast"
end

modifier_monkey_king_wukongs_command_custom_soldier = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_soldier:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.damageTable =
		{ attacker = self.parent, ability = self.ability, damage_type = self.ability.talents.r3_damage_type }

	self.parent:AddNewModifier(self.parent, nil, "modifier_monkey_king_wukongs_command_custom_inactive", {})
	self.parent:AddProc(self, { name = "hit", land = true })
	self.parent:AddProc(self, { name = "r3", prd_owner = true, land = true })
	self.parent:AddProc(self, { name = "w7", prd_owner = true, land = true })
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if name == "r3" then
		if self.ability.talents.has_r3 == 0 then
			return 0
		end
		return self.ability.talents.r3_chance
	end
	local mod = self.caster:FindModifierByName("modifier_monkey_king_primal_spring_custom_legendary")
	if not mod then
		return 0
	end
	return mod:GetRefreshChance()
end

function modifier_monkey_king_wukongs_command_custom_soldier:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	local target = params.target
	local procs = params.procs and params.procs[self]

	if self.caster.mastery_ability and IsValid(self.caster.mastery_ability.tracker) then
		self.caster.mastery_ability.tracker:AttackProc(params)
	end

	if procs and procs.w7 then
		local mod = self.caster:FindModifierByName("modifier_monkey_king_primal_spring_custom_legendary")
		if mod then
			mod:ChargeRefresh()
		end
	end

	if IsValid(self.caster.mastery_buff) and self.caster.mastery_buff.is_magic then
		self.caster.mastery_buff:ProcDamage({ target })
	end

	if procs and procs.r3 then
		target:EmitSound("MK.Arena_proc")

		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)

		target:GenericParticle("particles/units/heroes/hero_monkey_king/monkey_king_fur_army_attack.vpcf")

		self.damageTable.victim = target
		self.damageTable.damage = self.ability.talents.r3_damage

		DoDamage(self.damageTable, "modifier_monkey_king_command_3")
		target:SendNumber(4, self.ability.talents.r3_damage)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_monkey_king_wukongs_command_custom_magic",
			{ duration = self.ability.talents.r3_duration }
		)
	end

	if self.ability.talents.has_r4 == 1 then
		target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_monkey_king_wukongs_command_custom_slow",
			{ duration = self.ability.talents.r4_duration }
		)
	end
end

function modifier_monkey_king_wukongs_command_custom_soldier:CheckState()
	local result = {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_UNSLOWABLE] = true,
		[MODIFIER_STATE_DEBUFF_IMMUNE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
	if not self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier_legendary") then
		result[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true
	end
	if
		not self.parent:HasModifier("modifier_monkey_king_innate_custom_clone")
		or self.parent:HasModifier("modifier_monkey_king_mischief_invun")
	then
		result[MODIFIER_STATE_INVULNERABLE] = true
		result[MODIFIER_STATE_OUT_OF_GAME] = true
		result[MODIFIER_STATE_UNSELECTABLE] = true
		result[MODIFIER_STATE_UNTARGETABLE] = true
	end
	return result
end

function modifier_monkey_king_wukongs_command_custom_soldier:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_AUTOATTACK,
		MODIFIER_PROPERTY_TEMPEST_DOUBLE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetModifierAttackRangeBonus()
	if not self.caster:HasShard() then
		return
	end
	return self.ability.shard_range
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetModifierTempestDouble()
	return 1
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetAbsoluteNoDamagePhysical()
	return 1
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetAbsoluteNoDamagePure()
	return 1
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetAbsoluteNoDamageMagical()
	return 1
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetActivityTranslationModifiers()
	return "fur_army_soldier"
end

function modifier_monkey_king_wukongs_command_custom_soldier:GetDisableAutoAttack()
	return 1
end

modifier_monkey_king_wukongs_command_custom_soldier_legendary = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_soldier_legendary:GetStatusEffectName()
	return "particles/econ/items/monkey_king/mk_ti9_immortal/status_effect_mk_ti9_immortal_army.vpcf"
end
function modifier_monkey_king_wukongs_command_custom_soldier_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_monkey_king_wukongs_command_custom_soldier_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.range = self.ability.talents.r7_range
	self.spell = self.ability.talents.r7_spell
end

function modifier_monkey_king_wukongs_command_custom_soldier_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_monkey_king_wukongs_command_custom_soldier_legendary:GetModifierModelScale()
	return 40
end

function modifier_monkey_king_wukongs_command_custom_soldier_legendary:GetModifierCastRangeBonusStacking()
	return self.range
end

function modifier_monkey_king_wukongs_command_custom_soldier_legendary:GetModifierSpellAmplify_Percentage()
	return self.spell
end

function modifier_monkey_king_wukongs_command_custom_soldier_legendary:GetModifierDamageOutgoing_Percentage()
	return self:GetModifierSpellAmplify_Percentage()
end

modifier_monkey_king_wukongs_command_custom_inactive = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_inactive:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	for i = 0, 18 do
		local item = self.parent:GetItemInSlot(i)
		if item then
			item:Destroy()
		end
	end

	ProjectileManager:ProjectileDodge(self.parent)

	self.mod = self.parent:AddNewModifier(self.parent, nil, "modifier_monkey_king_wukongs_command_custom_nodraw", {})
	self.parent:SetDayTimeVisionRange(0)
	self.parent:SetNightTimeVisionRange(0)
	self.parent:Stop()
	self.parent:SetForceAttackTarget(nil)
	self.parent:SetOrigin(Vector(-7500.25, 7594.84, 15))
end

function modifier_monkey_king_wukongs_command_custom_inactive:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:SetDayTimeVisionRange(600)
	self.parent:SetNightTimeVisionRange(600)

	if IsValid(self.mod) then
		self.mod:SetDuration(0.1, false)
	end
end

function modifier_monkey_king_wukongs_command_custom_inactive:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

modifier_monkey_king_wukongs_command_custom_nodraw = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_nodraw:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:AddNoDraw()
	self.parent:NoDraw(self, true)
end

function modifier_monkey_king_wukongs_command_custom_nodraw:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EndNoDraw(self)
	self.parent:RemoveNoDraw()
end

modifier_monkey_king_wukongs_command_custom_buff = class(mod_visible)
function modifier_monkey_king_wukongs_command_custom_buff:RemoveOnDeath()
	return false
end
function modifier_monkey_king_wukongs_command_custom_buff:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.bonus_armor

	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	self.interval = 1
	self:StartIntervalThink(self.interval - FrameTime())
end

function modifier_monkey_king_wukongs_command_custom_buff:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:CdItems(self.ability.talents.r4_cd_items * self.interval, "modifier_monkey_king_command_4")
end

function modifier_monkey_king_wukongs_command_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_monkey_king_wukongs_command_custom_buff:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_monkey_king_wukongs_command_custom_buff:GetModifierPercentageCooldown(params)
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if params.ability and params.ability == self.ability then
		return
	end
	return self.ability.talents.r7_cdr
end

modifier_monkey_king_wukongs_command_custom_effect = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_effect:GetStatusEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/status_fx/status_effect_monkey_king_fur_army.vpcf",
		self
	)
end
function modifier_monkey_king_wukongs_command_custom_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_monkey_king_wukongs_command_custom_effect:OnCreated()
	self.caster = self:GetCaster()
end

modifier_monkey_king_wukongs_command_custom_leash = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_leash:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.command_ability
	if not self.ability then
		self:Destroy()
		return
	end

	self.thinker = EntIndexToHScript(table.thinker)
	self.RemoveForDuel = true

	self.radius = self.ability.second_radius + self.ability.shard_radius
	self.knock_dist = self.ability.shard_knock_range
	self.knockback_duration = self.ability.shard_knock_duration

	self.parent:EmitSound("MK.Arena_leash")

	local effect_cast_2 =
		ParticleManager:CreateParticle("particles/items/celestial_spear_leash.vpcf", PATTACH_ABSORIGIN, self.parent)
	ParticleManager:SetParticleControl(effect_cast_2, 0, self.thinker:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		effect_cast_2,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(effect_cast_2, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(0.2)
end

function modifier_monkey_king_wukongs_command_custom_leash:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.thinker) then
		self:Destroy()
		return
	end

	local abs = self.parent:GetAbsOrigin()

	if
		(abs - self.thinker:GetAbsOrigin()):Length2D() > self.radius
		and not self.parent:IsInvulnerable()
		and not self.parent:IsOutOfGame()
	then
		local vec = (self.thinker:GetAbsOrigin() - abs):Normalized()
		local knock_point = self.thinker:GetAbsOrigin() - vec * self.knock_dist

		self.parent:EmitSound("Mk.Arena_knock")
		self.parent:AddNewModifier(
			self.caster,
			self.caster:BkbAbility(self.ability, true),
			"modifier_generic_knockback",
			{
				duration = self.knockback_duration,
				distance = (abs - knock_point):Length2D(),
				height = 0,
				direction_x = vec.x,
				direction_y = vec.y,
			}
		)
		self:Destroy()
	end
end

function modifier_monkey_king_wukongs_command_custom_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_monkey_king_wukongs_command_custom_slow = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_slow:IsPurgable()
	return true
end
function modifier_monkey_king_wukongs_command_custom_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.r4_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_monkey_king_wukongs_command_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_monkey_king_wukongs_command_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_monkey_king_wukongs_command_custom_burn = class(mod_hidden)
function modifier_monkey_king_wukongs_command_custom_burn:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_monkey_king_wukongs_command_custom_burn:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster():FindOwner()

	self.parent:AddNewModifier(self.caster, self.ability, "modifier_monkey_king_wukongs_command_custom_burn_count", {})
end

function modifier_monkey_king_wukongs_command_custom_burn:OnDestroy()
	if not IsServer() then
		return
	end
	local mod = self.parent:FindModifierByName("modifier_monkey_king_wukongs_command_custom_burn_count")
	if mod then
		mod:DecrementStackCount()
		if mod:GetStackCount() <= 0 then
			mod:Destroy()
			return
		end
	end
end

modifier_monkey_king_wukongs_command_custom_burn_count = class(mod_visible)
function modifier_monkey_king_wukongs_command_custom_burn_count:GetTexture()
	return "buffs/monkey_king/command_1"
end
function modifier_monkey_king_wukongs_command_custom_burn_count:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = 0.5
	self.damage = self.ability.talents.r1_damage * self.interval
	self.max = self.ability.talents.r1_max

	if not IsServer() then
		return
	end
	self.particle_index = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle_index, false, false, -1, false, false)

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.r1_damage_type,
	}

	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_monkey_king_wukongs_command_custom_burn_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

function modifier_monkey_king_wukongs_command_custom_burn_count:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damageTable.damage = math.min(self:GetStackCount(), self.max) * self.damage
	DoDamage(self.damageTable, "modifier_monkey_king_command_1")
end

modifier_monkey_king_wukongs_command_custom_magic = class(mod_visible)
function modifier_monkey_king_wukongs_command_custom_magic:GetTexture()
	return "buffs/monkey_king/command_3"
end
function modifier_monkey_king_wukongs_command_custom_magic:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.magic_reduce = self.ability.talents.r3_magic

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_monkey_king_wukongs_command_custom_magic:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("MK.Command_resist")
		self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
	end
end

function modifier_monkey_king_wukongs_command_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_monkey_king_wukongs_command_custom_magic:GetModifierMagicalResistanceBonus()
	return self:GetStackCount() * self.magic_reduce
end