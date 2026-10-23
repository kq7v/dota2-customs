--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_aura",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_damage_reduce",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_hero_2"
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_silence",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_health_reduce",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_fear_3"
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_health_inc",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_fear_3"
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_legendary_stack",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_fear_7"
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_legendary_wave",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_pull_leash",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_stalker_fear_4" }
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_regen",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_hero_1"
)
LinkLuaModifier(
	"modifier_night_stalker_crippling_fear_custom_fear",
	"abilities/night_stalker/night_stalker_crippling_fear_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_fear_4"
)

night_stalker_crippling_fear_custom = class({})
night_stalker_crippling_fear_custom.talents = {}

function night_stalker_crippling_fear_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_crippling_fear.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_night_stalker/nightstalker_crippling_fear_aura.vpcf",
		context
	)
	PrecacheResource("particle", "particles/night_stalker/fear_stack.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_wave.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_legendary_hit.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_legendary_start.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_health_steal.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_pull.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_pull_leash.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_slow.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_damage_reduce.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lone_druid/lone_druid_savage_roar_debuff.vpcf", context)
end

function night_stalker_crippling_fear_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,
			w1_radius = 0,

			has_w2 = 0,
			w2_cd = 0,
			w2_duration = 0,

			has_w3 = 0,
			w3_health = 0,
			w3_heal = 0,
			w3_duration = caster:GetTalentValue("modifier_stalker_fear_3", "duration", true),
			w3_max = caster:GetTalentValue("modifier_stalker_fear_3", "max", true),

			has_w4 = 0,
			w4_move = caster:GetTalentValue("modifier_stalker_fear_4", "move", true),
			w4_timer = caster:GetTalentValue("modifier_stalker_fear_4", "timer", true),
			w4_range = caster:GetTalentValue("modifier_stalker_fear_4", "range", true),
			w4_fear = caster:GetTalentValue("modifier_stalker_fear_4", "fear", true),
			w4_radius = caster:GetTalentValue("modifier_stalker_fear_4", "radius", true),
			w4_knock_distance = caster:GetTalentValue("modifier_stalker_fear_4", "knock_distance", true),
			w4_knock_duration = caster:GetTalentValue("modifier_stalker_fear_4", "knock_duration", true),

			has_w7 = 0,
			w7_cd_inc = caster:GetTalentValue("modifier_stalker_fear_7", "cd_inc", true),
			w7_heal = caster:GetTalentValue("modifier_stalker_fear_7", "heal", true) / 100,
			w7_cd = caster:GetTalentValue("modifier_stalker_fear_7", "cd", true),
			w7_speed = caster:GetTalentValue("modifier_stalker_fear_7", "speed", true),
			w7_radius = caster:GetTalentValue("modifier_stalker_fear_7", "radius", true),
			w7_stun = caster:GetTalentValue("modifier_stalker_fear_7", "stun", true),
			w7_damage = caster:GetTalentValue("modifier_stalker_fear_7", "damage", true) / 100,
			w7_duration = caster:GetTalentValue("modifier_stalker_fear_7", "duration", true),
			w7_knock_distance = caster:GetTalentValue("modifier_stalker_fear_7", "knock_distance", true),

			has_q3 = 0,
			q3_duration = caster:GetTalentValue("modifier_stalker_void_3", "duration", true),

			has_q4 = 0,
			q4_cd_items_fear = caster:GetTalentValue("modifier_stalker_void_4", "cd_items_fear", true),

			has_h1 = 0,
			h1_cdr = 0,
			h1_mana = 0,

			has_h2 = 0,
			h2_armor = 0,
			h2_damage_reduce = 0,
		}
	end

	if caster:HasTalent("modifier_stalker_fear_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_stalker_fear_1", "damage") / 100
		self.talents.w1_radius = caster:GetTalentValue("modifier_stalker_fear_1", "radius")
	end

	if caster:HasTalent("modifier_stalker_fear_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_stalker_fear_2", "cd")
		self.talents.w2_duration = caster:GetTalentValue("modifier_stalker_fear_2", "duration")
	end

	if caster:HasTalent("modifier_stalker_fear_3") then
		self.talents.has_w3 = 1
		self.talents.w3_health = caster:GetTalentValue("modifier_stalker_fear_3", "health")
		self.talents.w3_heal = caster:GetTalentValue("modifier_stalker_fear_3", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_stalker_fear_3", type = 1, value = self.talents.w3_heal })
	end

	if caster:HasTalent("modifier_stalker_fear_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_stalker_fear_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_stalker_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_cdr = caster:GetTalentValue("modifier_stalker_hero_1", "cdr")
		self.talents.h1_mana = caster:GetTalentValue("modifier_stalker_hero_1", "mana")
	end

	if caster:HasTalent("modifier_stalker_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_armor = caster:GetTalentValue("modifier_stalker_hero_2", "armor")
		self.talents.h2_damage_reduce = caster:GetTalentValue("modifier_stalker_hero_2", "damage_reduce")
	end

	if caster:HasTalent("modifier_stalker_void_3") then
		self.talents.has_q3 = 1
	end

	if caster:HasTalent("modifier_stalker_void_4") then
		self.talents.has_q4 = 1
	end
end

function night_stalker_crippling_fear_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "night_stalker_crippling_fear", self)
end

function night_stalker_crippling_fear_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_night_stalker_crippling_fear_custom"
end

function night_stalker_crippling_fear_custom:GetBehavior()
	if self.talents.has_w4 == 1 and not self.aura_mod then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
end

function night_stalker_crippling_fear_custom:GetAOERadius()
	return self:GetRadius()
end

function night_stalker_crippling_fear_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.w2_cd or 0)
end

function night_stalker_crippling_fear_custom:GetManaCost(level)
	if self.aura_mod then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function night_stalker_crippling_fear_custom:GetRadius()
	return (self.radius or 0) + (self.talents.has_w1 == 1 and self.talents.w1_radius or 0)
end

function night_stalker_crippling_fear_custom:GetDamage()
	return self.dps + self.caster:GetMaxHealth() * self.talents.w1_damage
end

function night_stalker_crippling_fear_custom:GetCastRange(loc, hTarget)
	if self.talents.has_w4 == 1 then
		return self.talents.w4_range
	end
	return self:GetRadius() - self.caster:GetCastRangeBonus()
end

function night_stalker_crippling_fear_custom:OnSpellStart()
	if IsValid(self.aura_mod) and self.talents.has_w7 == 1 then
		self.aura_mod:Destroy()
		return
	end

	local point = nil
	local target = self.caster
	if self.talents.has_w4 == 1 then
		local cursor = self:GetCursorTarget()
		if cursor and cursor == self.caster then
			target = cursor
		else
			point = self:GetCursorPosition()
		end
	end

	if self.talents.has_w4 == 1 then
		local radius = self.talents.w4_radius
		local pull_duration = self.talents.w4_knock_duration
		local min_distance = self.talents.w4_knock_distance
		local pull_point = point or target:GetAbsOrigin()

		local effect_cast =
			ParticleManager:CreateParticle("particles/night_stalker/fear_pull.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect_cast, 0, pull_point)
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, radius, radius))
		ParticleManager:ReleaseParticleIndex(effect_cast)

		for _, unit in pairs(self.caster:FindTargets(radius, pull_point)) do
			local dir = (unit:GetAbsOrigin() - pull_point):Normalized()
			local point = pull_point + dir * min_distance

			local distance = (point - unit:GetAbsOrigin()):Length2D()
			if distance < min_distance then
				distance = 0
			end

			unit:AddNewModifier(
				self.caster,
				self,
				"modifier_night_stalker_crippling_fear_custom_pull_leash",
				{ duration = 1.5, x = pull_point.x, y = pull_point.y }
			)
			unit:AddNewModifier(self.caster, self, "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = distance,
				duration = pull_duration,
				fix_end = false,
				isStun = true,
				activity = ACT_DOTA_FLAIL,
			})
		end
	end

	local duration = (self.caster:IsStalkerNight() and self.duration_night or self.duration_day)
		+ self.talents.w2_duration

	if point then
		CreateModifierThinker(
			self.caster,
			self,
			"modifier_night_stalker_crippling_fear_custom_aura",
			{ duration = duration },
			point,
			self.caster:GetTeamNumber(),
			false
		)
	else
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_night_stalker_crippling_fear_custom_aura",
			{ duration = duration }
		)
	end
end

function night_stalker_crippling_fear_custom:CheckRegen(mod, is_remove)
	if not self:IsTrained() then
		return
	end
	if self.talents.has_h1 == 0 then
		return
	end
	if is_remove then
		self.regen_mods[mod] = nil
	else
		self.regen_mods[mod] = true
	end

	local need_regen = false
	for mod, _ in pairs(self.regen_mods) do
		if IsValid(mod) then
			need_regen = true
		else
			self.regen_mods[mod] = nil
		end
	end

	if need_regen then
		if not self.caster:HasModifier("modifier_night_stalker_crippling_fear_custom_regen") then
			self.caster:AddNewModifier(self.caster, self, "modifier_night_stalker_crippling_fear_custom_regen", {})
		end
	else
		self.caster:RemoveModifierByName("modifier_night_stalker_crippling_fear_custom_regen")
	end
end

modifier_night_stalker_crippling_fear_custom = class(mod_hidden)
function modifier_night_stalker_crippling_fear_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.regen_mods = {}
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.fear_ability = self.ability

	self.silence_mods = {}
	self.silence_active = false
	self.interval = 0.5

	self.ability.duration_day = self.ability:GetSpecialValueFor("duration_day")
	self.ability.duration_night = self.ability:GetSpecialValueFor("duration_night")
	self.ability.dps = self.ability:GetSpecialValueFor("dps")
	self.ability.tick_rate = self.ability:GetSpecialValueFor("tick_rate")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_night_stalker_crippling_fear_custom:OnRefresh(table)
	self.ability.duration_night = self.ability:GetSpecialValueFor("duration_night")
	self.ability.dps = self.ability:GetSpecialValueFor("dps")
end

function modifier_night_stalker_crippling_fear_custom:CheckSilence(mod, is_remove)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q4 == 0 then
		return
	end

	if is_remove then
		self.silence_mods[mod] = nil
	else
		self.silence_mods[mod] = true
	end

	local active = false
	for mod, _ in pairs(self.silence_mods) do
		if IsValid(mod) then
			active = true
		else
			self.silence_mods[mod] = nil
		end
	end

	if active and not self.silence_active then
		self.silence_active = true
		self:StartIntervalThink(self.interval)
	end

	if not active and self.silence_active then
		self.silence_active = false
		self:StartIntervalThink(-1)
	end
end

function modifier_night_stalker_crippling_fear_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:CdItems(self.ability.talents.q4_cd_items_fear * self.interval, "modifier_stalker_void_4")
end

function modifier_night_stalker_crippling_fear_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_night_stalker_crippling_fear_custom:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
end

function modifier_night_stalker_crippling_fear_custom:GetModifierPercentageCooldown()
	return self.ability.talents.h1_cdr
end

modifier_night_stalker_crippling_fear_custom_aura = class(mod_visible)
function modifier_night_stalker_crippling_fear_custom_aura:IsAura()
	return true
end
function modifier_night_stalker_crippling_fear_custom_aura:GetAuraDuration()
	return 0.5
end
function modifier_night_stalker_crippling_fear_custom_aura:GetAuraRadius()
	return self.radius
end
function modifier_night_stalker_crippling_fear_custom_aura:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_night_stalker_crippling_fear_custom_aura:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_night_stalker_crippling_fear_custom_aura:GetModifierAura()
	return "modifier_night_stalker_crippling_fear_custom_silence"
end
function modifier_night_stalker_crippling_fear_custom_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability:GetRadius()
	self.ability.aura_mod = self

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Hero_Nightstalker.Trickling_Fear")
	EmitSoundOn("Hero_Nightstalker.Trickling_Fear_lp", self.parent)

	self.RemoveForDuel = true

	local new_cd = nil
	self.pull_targets = {}
	self.fear_targets = {}

	if self.ability.talents.has_w7 == 1 then
		new_cd = 0.5
		self.max_time = self:GetRemainingTime()
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)
	end
	self.ability:EndCd(new_cd)

	if self.ability.talents.has_h2 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_night_stalker_crippling_fear_custom_damage_reduce",
			{ duration = self:GetRemainingTime() }
		)
	end

	local pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_night_stalker/nightstalker_crippling_fear_aura.vpcf",
		self
	)

	self.effect_cast = ParticleManager:CreateParticle(pfx, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self.radius, self.radius, self.radius))
	ParticleManager:SetParticleControl(self.effect_cast, 3, self.parent:GetAbsOrigin())
	self:AddParticle(self.effect_cast, false, false, -1, false, false)
end

function modifier_night_stalker_crippling_fear_custom_aura:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end
	self.caster:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		priority = 1,
		style = "StalkerFear",
	})
end

function modifier_night_stalker_crippling_fear_custom_aura:OnDestroy()
	self.ability.aura_mod = nil

	if not IsServer() then
		return
	end
	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, priority = 1, style = "StalkerFear" })

	self.ability:StartCd()
	self.parent:EmitSound("Hero_Nightstalker.Trickling_Fear_end")
	StopSoundOn("Hero_Nightstalker.Trickling_Fear_lp", self.parent)

	self.caster:RemoveModifierByName("modifier_night_stalker_crippling_fear_custom_damage_reduce")

	if self.ability.talents.has_w7 == 0 then
		return
	end

	if self.caster == self.parent then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_night_stalker_crippling_fear_custom_legendary_wave",
			{}
		)
	else
		CreateModifierThinker(
			self.caster,
			self.ability,
			"modifier_night_stalker_crippling_fear_custom_legendary_wave",
			{},
			self.parent:GetAbsOrigin(),
			self.caster:GetTeamNumber(),
			false
		)
	end
end

modifier_night_stalker_crippling_fear_custom_silence = class(mod_visible)
function modifier_night_stalker_crippling_fear_custom_silence:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	if self.ability.talents.has_w7 == 0 then
		self.silence_effect = self.parent:GenericParticle(
			"particles/units/heroes/hero_night_stalker/nightstalker_crippling_fear.vpcf",
			self,
			true
		)
	end

	self.ability:CheckRegen(self)
	self.ability.tracker:CheckSilence(self)

	if self.ability.talents.has_w3 == 1 and self.parent:IsRealHero() then
		self.pfx = ParticleManager:CreateParticle(
			"particles/night_stalker/fear_health_steal.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(self.pfx, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			self.pfx,
			1,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetOrigin(),
			true
		)
		self:AddParticle(self.pfx, false, false, -1, false, false)
	end

	self.fear_stack = 0
	self.fear_visual = 0
	self.interval = 0.25

	self.legendary_stack = 0

	self.damage_count = 0
	self.damage_interval = self.ability.tick_rate
	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.void_ability = self.caster.void_ability

	self.count = 0
	self:StartIntervalThink(self.interval - 0.01)
end

function modifier_night_stalker_crippling_fear_custom_silence:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		self.parent:IsRealHero()
		and self.caster:GetQuest() == "Stalker.Quest_6"
		and not self.caster:QuestCompleted()
	then
		self.caster:UpdateQuest(self.interval)
	end

	if self.caster:HasShard() then
		if not self.slow_effect and self.caster:HasModifier("modifier_night_stalker_darkness_custom_active") then
			self.slow_effect = self.parent:GenericParticle("particles/night_stalker/fear_slow.vpcf", self)
		end
		if self.slow_effect and not self.caster:HasModifier("modifier_night_stalker_darkness_custom_active") then
			ParticleManager:DestroyParticle(self.slow_effect, false)
			ParticleManager:ReleaseParticleIndex(self.slow_effect)
			self.slow_effect = nil
		end
	end

	if self.ability.talents.has_w7 == 1 and IsValid(self.ability.aura_mod) then
		local inc = self.ability.talents.w7_cd * self.interval
		local vector = (self.ability.aura_mod.parent:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		local center_angle = VectorToAngles(vector).y
		local facing_angle = VectorToAngles(self.parent:GetForwardVector()).y
		local facing = (math.abs(AngleDiff(center_angle, facing_angle)) > 85) and 1 or 0
		if facing == 1 then
			inc = inc * (self.ability.talents.w7_cd / self.ability.talents.w7_cd_inc)
		end
		self.legendary_stack = self.legendary_stack + inc
		if self.legendary_stack >= 1 then
			self.legendary_stack = 0
			self.parent:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_night_stalker_crippling_fear_custom_legendary_stack",
				{ duration = self.ability.aura_mod:GetRemainingTime() + self.ability.talents.w7_duration }
			)
		end
	end

	self.count = self.count + self.interval
	if self.count >= 1 then
		self.count = 0
		if self.ability.talents.has_w3 == 1 and self.parent:IsRealHero() then
			self.parent:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_night_stalker_crippling_fear_custom_health_reduce",
				{ duration = self.ability.talents.w3_duration }
			)
		end
	end

	self:FearStack()

	self.damage_count = self.damage_count + self.interval

	if self.damage_count < self.damage_interval then
		return
	end
	self.damage_count = 0

	local damage = self.ability:GetDamage() * self.damage_interval

	self.damageTable.damage = damage

	if self.ability.talents.has_q3 == 1 and IsValid(self.void_ability) then
		self.parent:AddNewModifier(
			self.caster,
			self.void_ability,
			"modifier_night_stalker_void_custom_damage_stack",
			{ duration = self.ability.talents.q3_duration, damage = damage }
		)
	end

	DoDamage(self.damageTable)
end

function modifier_night_stalker_crippling_fear_custom_silence:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:CheckRegen(self, true)
	self.ability.tracker:CheckSilence(self, true)
end

function modifier_night_stalker_crippling_fear_custom_silence:FearStack()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w4 == 0 then
		return
	end
	if not IsValid(self.ability.aura_mod) then
		return
	end
	if self.ability.aura_mod.fear_targets[self.parent] then
		return
	end

	self.fear_stack = self.fear_stack + self.interval

	if not self.particle and self.ability.talents.has_w7 == 0 then
		self.particle = self.parent:GenericParticle("particles/night_stalker/fear_stack.vpcf", self, true)
		if self.silence_effect then
			ParticleManager:DestroyParticle(self.silence_effect, false)
			ParticleManager:ReleaseParticleIndex(self.silence_effect)
			self.silence_effect = nil
		end
	end

	local visual = math.floor(self.fear_stack)

	if self.fear_visual ~= visual and self.particle then
		self.fear_visual = visual
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self.fear_stack, 0))
	end

	if self.fear_stack < self.ability.talents.w4_timer then
		return
	end

	local point = self.ability.aura_mod.parent:GetAbsOrigin()

	self.ability.aura_mod.fear_targets[self.parent] = true
	local duration = self.ability.talents.w4_fear * (1 - self.parent:GetStatusResistance())
	self.parent:EmitSound("Generic.Fear")
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_night_stalker_crippling_fear_custom_fear",
		{ duration = duration, x = point.x, y = point.y }
	)

	if self.ability.talents.has_w7 == 0 then
		if self.particle then
			ParticleManager:DestroyParticle(self.particle, false)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
		if not self.silence_effect then
			self.silence_effect = self.parent:GenericParticle(
				"particles/units/heroes/hero_night_stalker/nightstalker_crippling_fear.vpcf",
				self,
				true
			)
		end
	end
end

function modifier_night_stalker_crippling_fear_custom_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_night_stalker_crippling_fear_custom_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_night_stalker_crippling_fear_custom_silence:GetModifierTurnRate_Percentage()
	if not self.caster:HasShard() then
		return
	end
	if not self.caster.dark_ability then
		return
	end
	if not self.caster:HasModifier("modifier_night_stalker_darkness_custom_active") then
		return
	end
	return self.caster.dark_ability.shard_slow_turn
end

function modifier_night_stalker_crippling_fear_custom_silence:GetModifierMoveSpeedBonus_Percentage()
	if not self.caster:HasShard() then
		return
	end
	if not self.caster.dark_ability then
		return
	end
	if not self.caster:HasModifier("modifier_night_stalker_darkness_custom_active") then
		return
	end
	return self.caster.dark_ability.shard_slow
end

modifier_night_stalker_crippling_fear_custom_health_reduce = class(mod_visible)
function modifier_night_stalker_crippling_fear_custom_health_reduce:GetTexture()
	return "buffs/night_stalker/fear_3"
end
function modifier_night_stalker_crippling_fear_custom_health_reduce:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max_health = self.parent:GetMaxHealth()
	self.max = self.ability.talents.w3_max
	self.health = self.ability.talents.w3_health

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.duration = self:GetRemainingTime()

	self:OnRefresh(table)
end

function modifier_night_stalker_crippling_fear_custom_health_reduce:OnRefresh(table)
	if not IsServer() then
		return
	end

	if self:GetStackCount() < self.max then
		local stack = table.stack or 1
		self:SetStackCount(math.min(self.max, self:GetStackCount() + stack))
		if self.parent:IsHero() then
			self.parent:CalculateStatBonus(true)
		end
	end

	self:SendHealth()
end

function modifier_night_stalker_crippling_fear_custom_health_reduce:SendHealth()
	if not IsServer() then
		return
	end

	local health = self.max_health * self.health * self:GetStackCount() / 100

	if not IsValid(self.health_mod) then
		self.health_mod = self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_night_stalker_crippling_fear_custom_health_inc",
			{ duration = self.duration, health = health }
		)
	else
		self.health_mod:SetDuration(self.duration, true)
		self.health_mod:AddHealth({ health = health })
	end
end

function modifier_night_stalker_crippling_fear_custom_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end
	if IsValid(self.health_mod) then
		self.health_mod:Destroy()
	end

	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_night_stalker_crippling_fear_custom_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_night_stalker_crippling_fear_custom_health_reduce:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount() * -1
end

modifier_night_stalker_crippling_fear_custom_health_inc = class(mod_visible)
function modifier_night_stalker_crippling_fear_custom_health_inc:GetTexture()
	return "buffs/night_stalker/fear_3"
end
function modifier_night_stalker_crippling_fear_custom_health_inc:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_night_stalker_crippling_fear_custom_health_inc:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self:AddHealth(table)
end

function modifier_night_stalker_crippling_fear_custom_health_inc:AddHealth(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.health)
	self.parent:CalculateStatBonus(true)
end

function modifier_night_stalker_crippling_fear_custom_health_inc:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_night_stalker_crippling_fear_custom_health_inc:GetModifierHealthBonus()
	return self:GetStackCount()
end

modifier_night_stalker_crippling_fear_custom_legendary_stack = class(mod_hidden)
function modifier_night_stalker_crippling_fear_custom_legendary_stack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.particle = self.parent:GenericParticle("particles/night_stalker/fear_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_night_stalker_crippling_fear_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
end

modifier_night_stalker_crippling_fear_custom_legendary_wave = class(mod_hidden)
function modifier_night_stalker_crippling_fear_custom_legendary_wave:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.origin = self.parent:GetAbsOrigin()
	self.speed = self.ability.talents.w7_speed
	self.radius = self.ability.talents.w7_radius
	self.max = self.radius / self.speed

	self.effect_cast =
		ParticleManager:CreateParticle("particles/night_stalker/fear_wave.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.origin)
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.speed, self.radius, self.max))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	local particle =
		ParticleManager:CreateParticle("particles/night_stalker/fear_legendary_start.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.void_ability = self.caster.void_ability

	self.parent:EmitSound("Stalker.Fear_legendary_start")
	self.parent:EmitSound("Stalker.Fear_legendary_start2")

	self.knockback_distance = self.ability.talents.w7_knock_distance
	self.knockback_duration = self.ability.talents.w7_stun
	self.targets = {}
	self.current_radius = self.radius * 0.1
	self.interval = 0.1

	self.caster:AddNewModifier(self.caster, self.ability, "modifier_night_stalker_void_custom_legendary_cast", {})
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_1, 1.3)
	self.caster:RemoveModifierByName("modifier_night_stalker_void_custom_legendary_cast")

	self.damageTable = { attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self:StartIntervalThink(self.interval)
end

function modifier_night_stalker_crippling_fear_custom_legendary_wave:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.current_radius = self.current_radius + self.speed * self.interval

	for _, target in pairs(self.caster:FindTargets(self.current_radius, self.origin)) do
		if not self.targets[target] then
			self.targets[target] = true
			local direction = (target:GetAbsOrigin() - self.origin)
			direction.z = 0

			local point = target:GetAbsOrigin() + direction:Normalized() * 10
			local knockback = target:AddNewModifier(self.caster, self.ability, "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = (1 - direction:Length2D() / self.radius) * self.knockback_distance,
				duration = self.knockback_duration,
				height = 0,
				fix_end = true,
				isStun = true,
				activity = ACT_DOTA_FLAIL,
			})
			target:EmitSound("Stalker.Fear_legendary_hit")

			if target:HasModifier("modifier_night_stalker_crippling_fear_custom_legendary_stack") then
				local mod = target:FindModifierByName("modifier_night_stalker_crippling_fear_custom_legendary_stack")
				local damage = mod:GetStackCount() * self.ability.talents.w7_damage * self.ability:GetDamage()
				self.damageTable.damage = damage
				self.damageTable.victim = target

				if self.ability.talents.has_q3 == 1 and IsValid(self.void_ability) then
					target:AddNewModifier(
						self.caster,
						self.void_ability,
						"modifier_night_stalker_void_custom_damage_stack",
						{ duration = self.ability.talents.q3_duration, damage = damage }
					)
				end

				local real_damage = DoDamage(self.damageTable, "modifier_stalker_fear_7")
				target:GenericParticle("particles/night_stalker/fear_legendary_hit.vpcf")
				target:SendNumber(102, real_damage)

				mod:Destroy()
				local result = self.caster:CanLifesteal(target)
				if result then
					self.caster:GenericHeal(
						result * real_damage * self.ability.talents.w7_heal,
						self.ability,
						true,
						"",
						"modifier_stalker_fear_7"
					)
				end
			end
		end
	end

	if self.current_radius >= self.radius then
		self:Destroy()
		return
	end
end

modifier_night_stalker_crippling_fear_custom_pull_leash = class(mod_hidden)
function modifier_night_stalker_crippling_fear_custom_pull_leash:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end

	local point = GetGroundPosition(Vector(table.x, table.y, 0), nil)

	self.particle =
		ParticleManager:CreateParticle("particles/night_stalker/fear_pull_leash.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, point)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)
end

modifier_night_stalker_crippling_fear_custom_regen = class(mod_visible)
function modifier_night_stalker_crippling_fear_custom_regen:GetTexture()
	return "buffs/night_stalker/hero_1"
end
function modifier_night_stalker_crippling_fear_custom_regen:RemoveOnDeath()
	return false
end
function modifier_night_stalker_crippling_fear_custom_regen:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.mana = self.ability.talents.h1_mana
end

function modifier_night_stalker_crippling_fear_custom_regen:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE,
	}
end

function modifier_night_stalker_crippling_fear_custom_regen:GetModifierTotalPercentageManaRegen()
	return self.mana
end

modifier_night_stalker_crippling_fear_custom_fear = class(mod_hidden)
function modifier_night_stalker_crippling_fear_custom_fear:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_night_stalker_crippling_fear_custom_fear:GetStatusEffectName()
	return "particles/status_fx/status_effect_lone_druid_savage_roar.vpcf"
end
function modifier_night_stalker_crippling_fear_custom_fear:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end

	local source_point = self.caster:GetAbsOrigin()
	if table.x and table.y then
		source_point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	end

	local vec = (self.parent:GetAbsOrigin() - source_point):Normalized()
	self.position = GetGroundPosition(self.parent:GetAbsOrigin() + vec * 500, nil)

	if not self.parent:IsDebuffImmune() then
		self.parent:MoveToPosition(self.position)
	end

	self.parent:GenericParticle("particles/units/heroes/hero_lone_druid/lone_druid_savage_roar_debuff.vpcf", self)
end

function modifier_night_stalker_crippling_fear_custom_fear:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:OnCreated(table)
end

function modifier_night_stalker_crippling_fear_custom_fear:CheckState()
	return {
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_FEARED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_UNSLOWABLE] = true,
	}
end

function modifier_night_stalker_crippling_fear_custom_fear:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX,
	}
end

function modifier_night_stalker_crippling_fear_custom_fear:GetModifierMoveSpeed_AbsoluteMax()
	return self.ability.talents.w4_move
end

function modifier_night_stalker_crippling_fear_custom_fear:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsDebuffImmune() then
		return
	end
	self.parent:Stop()
end

modifier_night_stalker_crippling_fear_custom_damage_reduce = class(mod_hidden)
function modifier_night_stalker_crippling_fear_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.talents.h2_damage_reduce
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/night_stalker/fear_damage_reduce.vpcf", self)
end

function modifier_night_stalker_crippling_fear_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_night_stalker_crippling_fear_custom_damage_reduce:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end