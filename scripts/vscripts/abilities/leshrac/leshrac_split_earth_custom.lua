--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_leshrac_split_earth_custom",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_charge",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_hero_4"
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_tracker",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_stack",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_heal",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_hero_1"
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_slow",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_earth_2"
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_leash",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_armor",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_earth_1"
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_damage",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_earth_1"
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_legendary",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_earth_7"
)
LinkLuaModifier(
	"modifier_leshrac_split_earth_custom_damage_inc",
	"abilities/leshrac/leshrac_split_earth_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_leshrac_earth_3"
)

leshrac_split_earth_custom = class({})
leshrac_split_earth_custom.talents = {}

function leshrac_split_earth_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_split_earth_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_keeper_of_the_light/keeper_chakra_magic.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_split_earth.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_forcestaff.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/ogre_seal_totem_trail.vpcf", context)
	PrecacheResource("particle", "particles/items/falcon_blade_charge.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		context
	)
	PrecacheResource("particle", "particles/leshrac/leshrac_earth_legendary.vpcf", context)
	PrecacheResource("particle", "particles/leshrac/leshrac_earth_legendary_stun.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_purifyingflames.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_stunned.vpcf", context)
	PrecacheResource("particle", "particles/lina/lina_attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_enchantress_shard_debuff.vpcf", context)
	PrecacheResource("particle", "particles/lina/stun_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_leshrac/leshrac_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
end

function leshrac_split_earth_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_armor = 0,
			q1_max = caster:GetTalentValue("modifier_leshrac_earth_1", "max", true),
			q1_armor_duration = caster:GetTalentValue("modifier_leshrac_earth_1", "armor_duration", true),
			q1_damage_duration = caster:GetTalentValue("modifier_leshrac_earth_1", "damage_duration", true),

			has_q2 = 0,
			q2_cd = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_leshrac_earth_2", "duration", true),

			has_q3 = 0,
			q3_damage = 0,
			q3_heal = 0,
			q3_bonus = caster:GetTalentValue("modifier_leshrac_earth_3", "bonus", true),
			q3_duration = caster:GetTalentValue("modifier_leshrac_earth_3", "duration", true),

			has_q4 = 0,
			q4_delay = caster:GetTalentValue("modifier_leshrac_earth_4", "delay", true),
			q4_stun_inc = caster:GetTalentValue("modifier_leshrac_earth_4", "stun_inc", true),
			q4_radius = caster:GetTalentValue("modifier_leshrac_earth_4", "radius", true),
			q4_stun = caster:GetTalentValue("modifier_leshrac_earth_4", "stun", true),
			q4_chance = caster:GetTalentValue("modifier_leshrac_earth_4", "chance", true),
			q4_talent_cd = caster:GetTalentValue("modifier_leshrac_earth_4", "talent_cd", true),

			has_q7 = 0,
			q7_max = caster:GetTalentValue("modifier_leshrac_earth_7", "max", true),
			q7_damage = caster:GetTalentValue("modifier_leshrac_earth_7", "damage", true),
			q7_edict_reduce = caster:GetTalentValue("modifier_leshrac_earth_7", "edict_reduce", true),
			q7_chance_inc = caster:GetTalentValue("modifier_leshrac_earth_7", "chance_inc", true),
			q7_chance = caster:GetTalentValue("modifier_leshrac_earth_7", "chance", true),
			q7_duration = caster:GetTalentValue("modifier_leshrac_earth_7", "duration", true),
			q7_cd = caster:GetTalentValue("modifier_leshrac_earth_7", "cd", true) / 100,
			q7_stun = caster:GetTalentValue("modifier_leshrac_earth_7", "stun", true) / 100,

			has_h1 = 0,
			h1_cd_inc = 0,
			h1_mana_loss = 0,
			h1_mana = 0,
			h1_duration = caster:GetTalentValue("modifier_leshrac_hero_1", "duration", true),

			has_h4 = 0,
			h4_speed = caster:GetTalentValue("modifier_leshrac_hero_4", "speed", true),
			h4_cast = caster:GetTalentValue("modifier_leshrac_hero_4", "cast", true),

			has_e3 = 0,
			e3_cd = caster:GetTalentValue("modifier_leshrac_storm_3", "cd", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_leshrac_earth_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_leshrac_earth_1", "damage")
		self.talents.q1_armor = caster:GetTalentValue("modifier_leshrac_earth_1", "armor")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_leshrac_earth_2") then
		self.talents.has_q2 = 1
		self.talents.q2_cd = caster:GetTalentValue("modifier_leshrac_earth_2", "cd")
		self.talents.q2_slow = caster:GetTalentValue("modifier_leshrac_earth_2", "slow")
		caster:AddProc(self.tracker, { name = "hit", land = true })
	end

	if caster:HasTalent("modifier_leshrac_earth_3") then
		self.talents.has_q3 = 1
		self.talents.q3_damage = caster:GetTalentValue("modifier_leshrac_earth_3", "damage")
		self.talents.q3_heal = caster:GetTalentValue("modifier_leshrac_earth_3", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_leshrac_earth_3",
			type = 2,
			proc = "LifestealHit",
			value = function(params)
				if params.unit and params.unit:HasModifier("modifier_leshrac_split_earth_custom_damage_inc") then
					return self.talents.q3_heal * self.talents.q3_bonus, nil, true
				end
				return self.talents.q3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_leshrac_earth_4") then
		self.talents.has_q4 = 1
		caster:AddProc(self.tracker, { target_cd = self.talents.q4_talent_cd, target_prd = true, land = true })
	end

	if caster:HasTalent("modifier_leshrac_earth_7") then
		self.talents.has_q7 = 1
		caster:AddDamageEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_leshrac_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_cd_inc = caster:GetTalentValue("modifier_leshrac_hero_1", "cd_inc")
		self.talents.h1_mana_loss = caster:GetTalentValue("modifier_leshrac_hero_1", "mana_loss")
		self.talents.h1_mana = caster:GetTalentValue("modifier_leshrac_hero_1", "mana")
	end

	if caster:HasTalent("modifier_leshrac_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_leshrac_storm_3") then
		self.talents.has_e3 = 1
		caster:AddDamageEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_leshrac_nova_7") then
		self.talents.has_r7 = 1
	end
end

function leshrac_split_earth_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_leshrac_split_earth_custom_tracker"
end

function leshrac_split_earth_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "leshrac_split_earth", self)
end

function leshrac_split_earth_custom:GetCooldown(iLevel)
	return (self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0))
		* (1 + (self.talents.has_q7 == 1 and self.talents.q7_cd or 0))
end

function leshrac_split_earth_custom:GetAOERadius()
	return (self.radius or 0) + (IsValid(self.caster.leshrac_innate) and self.caster.leshrac_innate:GetRange() or 0)
end

function leshrac_split_earth_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_AOE
		+ DOTA_ABILITY_BEHAVIOR_POINT
		+ (self.talents.has_h4 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function leshrac_split_earth_custom:GetCastAnimation()
	if self.talents.has_h4 == 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_1
end

function leshrac_split_earth_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h4 == 1 and self.talents.h4_cast or 0)
end

function leshrac_split_earth_custom:CreateTalent()
	self:ToggleAutoCast()
end

function leshrac_split_earth_custom:OnAbilityPhaseStart()
	if self.talents.has_h4 == 1 then
		self.caster:StartGestureWithPlaybackRate(
			ACT_DOTA_CAST_ABILITY_1,
			self.AbilityCastPoint / (self.AbilityCastPoint + self.talents.h4_cast) * 0.9
		)
	end
	return true
end

function leshrac_split_earth_custom:OnAbilityPhaseInterrupted()
	if self.talents.has_h4 == 0 then
		return
	end
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
end

function leshrac_split_earth_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	local delay = self.delay

	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	local no_stun = 0
	if
		self.talents.has_h4 == 1
		and self:GetAutoCastState()
		and not self.caster:IsRooted()
		and not self.caster:IsLeashed()
	then
		self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_1)
		local distance = (point - self.caster:GetAbsOrigin()):Length2D()
		self.caster:EmitSound("Leshrac.Earth_run_start")

		self.caster:AddNewModifier(self.caster, self, "modifier_leshrac_split_earth_custom_charge", {})
		local arc = self.caster:AddNewModifier(self.caster, self, "modifier_generic_arc", {
			target_x = point.x,
			target_y = point.y,
			distance = distance,
			speed = self.talents.h4_speed,
			fix_end = false,
			isStun = true,
			activity = ACT_DOTA_RUN,
			end_anim = ACT_DOTA_CAST_ABILITY_4,
		})

		arc:SetEndCallback(function()
			self.caster:RemoveModifierByName("modifier_leshrac_split_earth_custom_charge")
		end)
		no_stun = 1
		delay = distance / self.talents.h4_speed
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_leshrac_split_earth_custom",
		{ active = 1, duration = delay, shard = 0, no_stun = no_stun },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function leshrac_split_earth_custom:OnProjectileHit(target, vLocation)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	self.caster:PerformAttack(target, true, true, true, true, false, false, false, { damage = "leshrac_q7" })
	target:EmitSound("Leshrac.Earth_legendary_attack_end")
end

function leshrac_split_earth_custom:ProcStun(target, is_auto, is_shard)
	if not IsServer() then
		return
	end
	local stun = self.stun + (self.talents.has_q4 == 1 and self.talents.q4_stun_inc or 0)
	local damage = self.damage
	if is_shard == 1 then
		damage = damage * self.shard_damage
		stun = self.shard_stun
	end

	if is_auto == 1 then
		stun = self.talents.q4_stun
	else
		if self.talents.has_q7 == 1 then
			stun = stun * (1 + self.talents.q7_stun)
		end
		if target:IsRealHero() and (self.caster:GetQuest() == "Leshrac.Quest_5") then
			self.caster:UpdateQuest(1)
		end
		DoDamage({
			attacker = self.caster,
			ability = self,
			damage_type = self.talents.has_q7 == 1 and DAMAGE_TYPE_PHYSICAL or DAMAGE_TYPE_MAGICAL,
			damage = damage,
			victim = target,
		})
	end

	local stun_duration = stun * (1 - target:GetStatusResistance())
	target:AddNewModifier(
		self.caster,
		is_auto == 1 and self.caster:BkbAbility(self, true) or self,
		"modifier_stunned",
		{ duration = stun_duration }
	)

	if is_auto == 1 or is_shard == 1 then
		return
	end

	if self.caster:HasShard() then
		local leash = self.shard_leash
		if self.talents.has_q7 == 1 then
			leash = leash * (1 + self.talents.q7_stun)
		end
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_leshrac_split_earth_custom_leash",
			{ duration = stun_duration + leash * (1 - target:GetStatusResistance()) }
		)
	end

	if self.talents.has_q1 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_leshrac_split_earth_custom_armor",
			{ duration = self.talents.q1_armor_duration }
		)
	end

	if self.talents.has_q7 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_leshrac_split_earth_custom_legendary",
			{ duration = self.talents.q7_duration }
		)
	end

	if self.talents.has_q3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_leshrac_split_earth_custom_damage_inc",
			{ duration = self.talents.q3_duration }
		)
	end
end

modifier_leshrac_split_earth_custom = class(mod_hidden)
function modifier_leshrac_split_earth_custom:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.origin = self.parent:GetAbsOrigin()
	self.radius = self.ability:GetAOERadius()
	self.shard = kv.shard

	if kv.radius then
		self.radius = kv.radius
	end

	self.active = kv.active
	self.is_auto = kv.is_auto
	self.no_stun = kv.no_stun

	if self.active == 0 then
		local effect_cast =
			ParticleManager:CreateParticle("particles/leshrac/leshrac_earth_legendary.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect_cast, 0, self.origin)
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, 0, 0))
		ParticleManager:SetParticleControl(effect_cast, 2, Vector(self:GetRemainingTime(), 0, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast)
	end
end

function modifier_leshrac_split_earth_custom:OnDestroy()
	if not IsServer() then
		return
	end

	local enemies = self.caster:FindTargets(self.radius, self.origin)

	local sound_cast = wearables_system:GetSoundReplacement(self.caster, "Hero_Leshrac.Split_Earth", self.ability)
	local particle_cast = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_leshrac/leshrac_split_earth.vpcf",
		self.ability,
		"leshrac_split_earth_custom"
	)
	if self.is_auto == 1 then
		particle_cast = "particles/leshrac/leshrac_earth_legendary_stun.vpcf"
		sound_cast = "Leshrac.Earth_legendary"
	end

	if self.no_stun ~= 1 then
		for _, enemy in pairs(enemies) do
			self.ability:ProcStun(enemy, self.is_auto, self.shard)
		end
	end

	if self.ability.talents.has_h1 == 1 and #enemies > 0 and self.active == 1 then
		if self.ability.talents.has_r7 == 1 then
			if self.caster.pulse_ability_legendary then
				self.caster:CdAbility(
					self.caster.pulse_ability_legendary,
					self.ability.talents.h1_cd_inc,
					nil,
					"modifier_leshrac_hero_1"
				)
			end
		else
			self.caster:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_leshrac_split_earth_custom_heal",
				{ duration = self.ability.talents.h1_duration }
			)
		end

		self.caster:EmitSound("Puck.Rift_Mana")

		local mana_particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_keeper_of_the_light/keeper_chakra_magic.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControl(mana_particle, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(mana_particle, 1, self.caster:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(mana_particle)
	end

	if self.caster:HasShard() and self.active == 1 then
		CreateModifierThinker(
			self.caster,
			self.ability,
			"modifier_leshrac_split_earth_custom",
			{ duration = self.ability.shard_delay, shard = 1, active = 0 },
			self.origin,
			self.caster:GetTeamNumber(),
			false
		)
	end

	GridNav:DestroyTreesAroundPoint(self.origin, self.radius, true)

	local effect_cast = ParticleManager:CreateParticle(particle_cast, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.origin)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	EmitSoundOnLocationWithCaster(self.origin, sound_cast, self.caster)
	UTIL_Remove(self.parent)
end

modifier_leshrac_split_earth_custom_charge = class(mod_hidden)
function modifier_leshrac_split_earth_custom_charge:GetStatusEffectName()
	return "particles/status_fx/status_effect_forcestaff.vpcf"
end
function modifier_leshrac_split_earth_custom_charge:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_leshrac_split_earth_custom_charge:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:GenericParticle("particles/items_fx/ogre_seal_totem_trail.vpcf", self)
	self.particle = self.parent:GenericParticle("particles/items/falcon_blade_charge.vpcf", self)
	self.parent:GenericParticle(
		"particles/units/heroes/hero_primal_beast/primal_beast_onslaught_charge_active.vpcf",
		self
	)

	self.bkb_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_debuff_immune", {})

	self.parent:EmitSound("Leshrac.Earth_run")
	self.targets = {}
	self:OnIntervalThink()
	self:StartIntervalThink(FrameTime() * 2)
end

function modifier_leshrac_split_earth_custom_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_leshrac_split_earth_custom_charge:GetActivityTranslationModifiers()
	return "staff_run_haste"
end

function modifier_leshrac_split_earth_custom_charge:OnIntervalThink(last)
	if not IsServer() then
		return
	end

	if self:GetElapsedTime() >= 0.35 and self.particle then
		ParticleManager:DestroyParticle(self.particle, false)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end

	local radius = last and self.ability:GetAOERadius() or 180
	for _, enemy in pairs(self.parent:FindTargets(radius)) do
		if not self.targets[enemy] and enemy:IsUnit() then
			self.targets[enemy] = true
			self.ability:ProcStun(enemy)

			if not last then
				local effect_cast = ParticleManager:CreateParticle(
					"particles/leshrac/leshrac_earth_legendary_stun.vpcf",
					PATTACH_WORLDORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(effect_cast, 0, enemy:GetAbsOrigin())
				ParticleManager:SetParticleControl(effect_cast, 1, Vector(150, 150, 150))
				ParticleManager:ReleaseParticleIndex(effect_cast)
			end
		end
	end
end

function modifier_leshrac_split_earth_custom_charge:OnDestroy()
	if not IsServer() then
		return
	end
	self:OnIntervalThink(true)
	if not IsValid(self.bkb_mod) then
		return
	end
	self.bkb_mod:Destroy()
end

modifier_leshrac_split_earth_custom_tracker = class(mod_hidden)
function modifier_leshrac_split_earth_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.stun = self.ability:GetSpecialValueFor("stun")
	self.ability.delay = self.ability:GetSpecialValueFor("delay")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.shard_delay = self.ability:GetSpecialValueFor("shard_delay")
	self.ability.shard_stun = self.ability:GetSpecialValueFor("shard_stun")
	self.ability.shard_leash = self.ability:GetSpecialValueFor("shard_leash")
	self.ability.shard_damage = self.ability:GetSpecialValueFor("shard_damage") / 100
	self.ability.AbilityCastPoint = self.ability:GetSpecialValueFor("AbilityCastPoint")
end

function modifier_leshrac_split_earth_custom_tracker:OnRefresh(table)
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.stun = self.ability:GetSpecialValueFor("stun")
end

function modifier_leshrac_split_earth_custom_tracker:LifestealHit(params)
	local target = params.unit
	if not target:HasModifier("modifier_leshrac_split_earth_custom_damage_inc") then
		return
	end

	target:EmitSound("Leshrac.Earth_attack_hit")
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
end

function modifier_leshrac_split_earth_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.q4_chance
end

function modifier_leshrac_split_earth_custom_tracker:AttackProc(params, name)
	if name == "hit" then
		local target = params.target
		if self.ability.talents.has_q2 == 1 then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_leshrac_split_earth_custom_slow",
				{ duration = self.ability.talents.q2_duration }
			)
		end
		return
	end

	params.target:EmitSound("Leshrac.Earth_legendary_pre")
	CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_leshrac_split_earth_custom",
		{ duration = self.ability.talents.q4_delay, radius = self.ability.talents.q4_radius, active = 0, is_auto = 1 },
		params.target:GetAbsOrigin(),
		self.parent:GetTeamNumber(),
		false
	)
end

function modifier_leshrac_split_earth_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q1 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_leshrac_split_earth_custom_damage",
		{ duration = self.ability.talents.q1_damage_duration }
	)
end

function modifier_leshrac_split_earth_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.inflictor then
		return
	end
	if params.inflictor:IsItem() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	local target = params.unit

	if not target:IsUnit() then
		return
	end

	if
		self.ability.talents.has_e3 == 1
		and IsValid(self.parent.storm_ability)
		and self.parent:CheckCd("leshrac_e3", self.ability.talents.e3_cd)
	then
		self.parent.storm_ability:ProcSpeed()
	end

	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.parent.edict_ability and params.inflictor == self.parent.edict_ability then
		if not target.edict_count then
			target.edict_count = 0
		end
		target.edict_count = target.edict_count + 1
		if target.edict_count < self.ability.talents.q7_edict_reduce then
			return
		end

		target.edict_count = 0
	end

	if not self.ability:IsTrained() then
		return
	end

	local chance = self.ability.talents.q7_chance
	local mod = target:FindModifierByName("modifier_leshrac_split_earth_custom_legendary")
	local index = 10430
	if mod then
		chance = chance + mod:GetStackCount() * self.ability.talents.q7_chance_inc
		index = index + mod:GetStackCount()
	end

	if not RollPseudoRandomPercentage(chance, index, self.parent) then
		return
	end

	local info = {
		EffectName = "particles/units/heroes/hero_leshrac/leshrac_base_attack.vpcf",
		Ability = self.ability,
		iMoveSpeed = self.parent:GetProjectileSpeed(),
		Source = self.parent,
		Target = target,
		bDodgeable = false,
		bProvidesVision = false,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_HITLOCATION,
	}
	self.parent:EmitSound("Leshrac.Earth_legendary_attack")
	ProjectileManager:CreateTrackingProjectile(info)
end

function modifier_leshrac_split_earth_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_leshrac_split_earth_custom_tracker:GetModifierPercentageManacostStacking(params)
	return -self.ability.talents.h1_mana_loss
end

function modifier_leshrac_split_earth_custom_tracker:GetModifierDamageOutgoing_Percentage(params)
	if not IsServer() then
		return
	end
	if not params.target then
		return
	end
	if not params.target:HasModifier("modifier_leshrac_split_earth_custom_damage_inc") then
		return
	end
	return self.ability.talents.q3_damage
end

modifier_leshrac_split_earth_custom_heal = class(mod_hidden)
function modifier_leshrac_split_earth_custom_heal:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.mana = self.ability.talents.h1_mana / self.ability.talents.h1_duration
end

function modifier_leshrac_split_earth_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE,
	}
end

function modifier_leshrac_split_earth_custom_heal:GetModifierTotalPercentageManaRegen()
	return self.mana
end

modifier_leshrac_split_earth_custom_slow = class(mod_hidden)
function modifier_leshrac_split_earth_custom_slow:IsPurgable()
	return true
end
function modifier_leshrac_split_earth_custom_slow:GetEffectName()
	return "particles/lina/lina_attack_slow.vpcf"
end
function modifier_leshrac_split_earth_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.q2_slow
end

function modifier_leshrac_split_earth_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_leshrac_split_earth_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_leshrac_split_earth_custom_leash = class(mod_hidden)
function modifier_leshrac_split_earth_custom_leash:IsPurgable()
	return true
end
function modifier_leshrac_split_earth_custom_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_leshrac_split_earth_custom_armor = class(mod_hidden)
function modifier_leshrac_split_earth_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.q1_armor
end

function modifier_leshrac_split_earth_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_leshrac_split_earth_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_leshrac_split_earth_custom_damage = class(mod_visible)
function modifier_leshrac_split_earth_custom_damage:GetTexture()
	return "buffs/leshrac/earth_1"
end
function modifier_leshrac_split_earth_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.talents.q1_damage
	self.max = self.ability.talents.q1_max
	self:OnRefresh()
end

function modifier_leshrac_split_earth_custom_damage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_leshrac_split_earth_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_leshrac_split_earth_custom_damage:GetModifierPreAttack_BonusDamage()
	return self:GetStackCount() * self.damage
end

modifier_leshrac_split_earth_custom_legendary = class(mod_visible)
function modifier_leshrac_split_earth_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max
	self:OnRefresh()
end

function modifier_leshrac_split_earth_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if not self.effect then
		self.effect = self.parent:GenericParticle("particles/lina/stun_stack.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.effect, 1, Vector(0, self:GetStackCount(), 0))
end

modifier_leshrac_split_earth_custom_damage_inc = class(mod_hidden)
function modifier_leshrac_split_earth_custom_damage_inc:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
end