--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_active",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_legendary",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_legendary_aura",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_legendary_caster",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_hunter_7"
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_damage",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_stalker_hunter_3"
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_charge",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_double",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_midnight_feast_custom_double_damage",
	"abilities/night_stalker/night_stalker_midnight_feast_custom",
	LUA_MODIFIER_MOTION_NONE
)

night_stalker_midnight_feast_custom = class({})
night_stalker_midnight_feast_custom.talents = {}

function night_stalker_midnight_feast_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_change.vpcf", context)
	PrecacheResource("model", "models/heroes/nightstalker/nightstalker_night.vmdl", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_icon.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_screen.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_head.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_target.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_start.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_stun.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_caster.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_hit.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_hit_2.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_legendary_proc.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/nightstalker/nightstalker_black_nihility/nightstalker_black_nihility_void.vpcf",
		context
	)
	PrecacheResource("particle", "particles/antimage/manabreak_cleave.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_charge.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_charge_effect.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_night_buff.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/hunter_double_attack.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/fear_legendary_hit.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/void_delay_damage.vpcf", context)
end

function night_stalker_midnight_feast_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_range = 0,

			has_e2 = 0,
			e2_duration = 0,
			e2_damage = 0,

			has_e3 = 0,
			e3_damage = 0,
			e3_chance = 0,
			e3_double_damage = caster:GetTalentValue("modifier_stalker_hunter_3", "double_damage", true),
			e3_max = caster:GetTalentValue("modifier_stalker_hunter_3", "max", true),
			e3_dark_max = caster:GetTalentValue("modifier_stalker_hunter_3", "dark_max", true),

			has_e4 = 0,
			e4_speed = caster:GetTalentValue("modifier_stalker_hunter_4", "speed", true),
			e4_cd_inc = caster:GetTalentValue("modifier_stalker_hunter_4", "cd_inc", true),
			e4_legendary_cd = caster:GetTalentValue("modifier_stalker_hunter_4", "legendary_cd", true),
			e4_distance = caster:GetTalentValue("modifier_stalker_hunter_4", "distance", true),

			has_e7 = 0,
			e7_attacks = caster:GetTalentValue("modifier_stalker_hunter_7", "attacks", true),
			e7_blind_duration = caster:GetTalentValue("modifier_stalker_hunter_7", "blind_duration", true),
			e7_stun = caster:GetTalentValue("modifier_stalker_hunter_7", "stun", true),
			e7_effect_duration = caster:GetTalentValue("modifier_stalker_hunter_7", "effect_duration", true),
			e7_bva = caster:GetTalentValue("modifier_stalker_hunter_7", "bva", true),
			e7_status = caster:GetTalentValue("modifier_stalker_hunter_7", "status", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_stalker_hunter_1") then
		self.talents.has_e1 = 1
		self.talents.e1_range = caster:GetTalentValue("modifier_stalker_hunter_1", "range")
	end

	if caster:HasTalent("modifier_stalker_hunter_2") then
		self.talents.has_e2 = 1
		self.talents.e2_duration = caster:GetTalentValue("modifier_stalker_hunter_2", "duration")
		self.talents.e2_damage = caster:GetTalentValue("modifier_stalker_hunter_2", "damage") / 100
	end

	if caster:HasTalent("modifier_stalker_hunter_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_stalker_hunter_3", "damage")
		self.talents.e3_chance = caster:GetTalentValue("modifier_stalker_hunter_3", "chance")
		caster:AddProc(self.tracker, { group = "modifier_stalker_hunter_3", extra = false, land = true })
	end

	if caster:HasTalent("modifier_stalker_hunter_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_stalker_hunter_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_stalker_dark_7") then
		self.talents.has_r7 = 1
	end
end

function night_stalker_midnight_feast_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_night_stalker_midnight_feast_custom"
end

function night_stalker_midnight_feast_custom:CastFilterResultTarget(target)
	if not IsServer() then
		return
	end
	if not target:IsHero() and not target.lifestealer_creep then
		return UF_FAIL_CREEP
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return UF_FAIL_FRIENDLY
	end
	if target:IsIllusion() then
		return UF_FAIL_ILLUSION
	end
	return UF_SUCCESS
end

function night_stalker_midnight_feast_custom:OnSpellStart()
	local target = self:GetCursorTarget()
	self.caster:GenericParticle("particles/night_stalker/hunter_legendary_start.vpcf")
	self.caster:GenericParticle("particles/night_stalker/fear_legendary_hit.vpcf")

	local duration = self.duration + self.talents.e2_duration
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_night_stalker_midnight_feast_custom_active",
		{ duration = duration }
	)
end

function night_stalker_midnight_feast_custom:ProcCd(is_dash)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_e4 == 0 then
		return
	end
	if self.talents.has_r7 == 1 and not is_dash then
		return
	end

	local ability = self.caster.charge_ability
	if not ability then
		return
	end
	self.caster:CdAbility(
		ability,
		self.talents.has_r7 == 1 and self.talents.e4_legendary_cd or self.talents.e4_cd_inc,
		nil,
		"modifier_stalker_hunter_4"
	)
end

modifier_night_stalker_midnight_feast_custom = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.charge_ability = self.parent:FindAbilityByName("night_stalker_midnight_feast_custom_charge")
	if self.parent.charge_ability then
		self.parent.charge_ability:UpdateTalents()
	end

	self.parent.midnight_ability = self.ability

	self.ability.cleave = self.ability:GetSpecialValueFor("cleave") / 100
	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
	self.ability.damage_health = self.ability:GetSpecialValueFor("damage_health") / 100
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.legendary_attacks = self.ability:GetSpecialValueFor("legendary_attacks")

	self.parent:AddProc(self, { name = "hit", land = true })
end

function modifier_night_stalker_midnight_feast_custom:OnRefresh(table)
	self.ability.cleave = self.ability:GetSpecialValueFor("cleave") / 100
	self.ability.damage_base = self.ability:GetSpecialValueFor("damage_base")
	self.ability.damage_health = self.ability:GetSpecialValueFor("damage_health") / 100
end

function modifier_night_stalker_midnight_feast_custom:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.e3_chance
end

function modifier_night_stalker_midnight_feast_custom:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	local target = params.target

	if not params.no_attack_cooldown then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			self.ability.cleave * params.damage,
			150,
			360,
			500,
			"particles/antimage/manabreak_cleave.vpcf"
		)

		self.ability:ProcCd()

		local mod = target:FindModifierByName("modifier_night_stalker_midnight_feast_custom_active")
		if mod then
			mod:ProcDamage()
		end
	end

	if self.ability.talents.has_e3 == 1 then
		if target:IsRealHero() and self.ability.talents.has_r7 == 0 then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_night_stalker_midnight_feast_custom_damage",
				{}
			)
		end

		if params.procs and params.procs[self] and params.procs[self].default then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_night_stalker_midnight_feast_custom_double",
				{ duration = 0.15 }
			)
		end
	end

	if self.parent:HasModifier("modifier_night_stalker_midnight_feast_custom_legendary_caster") then
		local name = RandomInt(1, 2) == 1 and "particles/night_stalker/hunter_legendary_hit_2.vpcf"
			or "particles/night_stalker/hunter_legendary_hit.vpcf"
		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		vec.z = 0

		local particle = ParticleManager:CreateParticle(name, PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(particle, 1, vec)
		ParticleManager:SetParticleShouldCheckFoW(particle, false)
		ParticleManager:ReleaseParticleIndex(particle)

		target:EmitSound("Stalker.Hunter_legendary_hit")
	end
end

function modifier_night_stalker_midnight_feast_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_night_stalker_midnight_feast_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.e1_range
end

modifier_night_stalker_midnight_feast_custom_active = class(mod_visible)
function modifier_night_stalker_midnight_feast_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.ability:EndCd()

	self.max_time = self:GetRemainingTime()
	self.head_effect = self.parent:GenericParticle("particles/night_stalker/hunter_legendary_head.vpcf", self, true)
	self.parent:GenericParticle("particles/night_stalker/hunter_legendary_target.vpcf", self)
	self.parent:GenericParticle("particles/night_stalker/void_delay_damage.vpcf")

	self.caster:EmitSound("Stalker.Hunter_legendary_caster")
	self.parent:EmitSound("Stalker.Hunter_legendary_target")
	self.parent:EmitSound("Stalker.Hunter_legendary_target2")

	self.damageTable =
		{ attacker = self.caster, ability = self.ability, victim = self.parent, damage_type = DAMAGE_TYPE_MAGICAL }

	if self.ability.talents.has_e7 == 1 then
		self.caster:EmitSound("Stalker.Hunter_legendary_vo")
	end

	if IsValid(self.caster.fear_ability) then
		self.caster.fear_ability:CheckRegen(self)
	end

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_night_stalker_midnight_feast_custom_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 50, self.interval * 2, false)

	if self.ability.talents.has_e7 == 0 then
		return
	end

	if self.parent:HasModifier("modifier_night_stalker_midnight_feast_custom_legendary") and self.head_effect then
		ParticleManager:DestroyParticle(self.head_effect, true)
		ParticleManager:ReleaseParticleIndex(self.head_effect)
		self.head_effect = nil
	end

	if
		not self.parent:HasModifier("modifier_night_stalker_midnight_feast_custom_legendary") and not self.head_effect
	then
		self.head_effect = self.parent:GenericParticle("particles/night_stalker/hunter_legendary_head.vpcf", self, true)
	end

	self.caster:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self.completed and self:GetRemainingTime() or self:GetStackCount(),
		priority = 3,
		active = self.completed and 1 or 0,
		use_zero = self.completed and 1 or 0,
		style = "StalkerHunter",
	})
end

function modifier_night_stalker_midnight_feast_custom_active:ProcDamage(is_legendary)
	if not IsServer() then
		return
	end

	local attacks = is_legendary and self.ability.legendary_attacks or 1
	local damage = (self.ability.damage_base + self.ability.damage_health * self.parent:GetMaxHealth())
		* (1 + self.ability.talents.e2_damage)
		* attacks

	self.caster:GenericHeal(damage, self.ability, false, false)
	self.damageTable.damage = damage
	DoDamage(self.damageTable)
	self.parent:SendNumber(4, damage)

	if self.ability.talents.has_e7 == 0 then
		return
	end
	if self.completed then
		return
	end

	self:SetStackCount(self:GetStackCount() + attacks)
	if self:GetStackCount() < self.ability.talents.e7_attacks then
		return
	end
	self.completed = true

	local target = self.parent
	if target.owner and target.lifestealer_creep then
		target = target.owner
	end

	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_night_stalker_midnight_feast_custom_legendary_caster",
		{ duration = self.ability.talents.e7_effect_duration }
	)

	local mod = target:FindModifierByName("modifier_night_stalker_midnight_feast_custom_legendary")
	if mod then
		mod:SetDuration(mod:GetRemainingTime() + self.ability.talents.e7_blind_duration, true)
	else
		target:AddNewModifier(
			target,
			self.ability,
			"modifier_night_stalker_midnight_feast_custom_legendary",
			{ duration = self.ability.talents.e7_blind_duration }
		)
	end

	self:SetDuration(self.max_time, true)
end

function modifier_night_stalker_midnight_feast_custom_active:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()
	self.parent:StopSound("Stalker.Hunter_legendary_target")

	if IsValid(self.caster.fear_ability) then
		self.caster.fear_ability:CheckRegen(self, true)
	end

	if self.ability.talents.has_e7 == 0 then
		return
	end
	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, priority = 3, style = "StalkerHunter" })

	if not self.parent:IsAlive() then
		return
	end
	if self.completed then
		return
	end

	self.caster:EmitSound("Stalker.Hunter_legendary_stun")
	self.caster:EmitSound("Stalker.Hunter_legendary_stun_vo")

	self.caster:GenericParticle("particles/night_stalker/fear_legendary_hit.vpcf")

	local particle = ParticleManager:CreateParticle(
		"particles/night_stalker/hunter_legendary_stun.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:AddNewModifier(
		self.caster,
		self.caster:BkbAbility(self.ability, true),
		"modifier_stunned",
		{ duration = self.ability.talents.e7_stun }
	)
end

modifier_night_stalker_midnight_feast_custom_legendary = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom_legendary:IsAura()
	return IsServer() and self.parent:IsAlive()
end
function modifier_night_stalker_midnight_feast_custom_legendary:GetAuraDuration()
	return 0
end
function modifier_night_stalker_midnight_feast_custom_legendary:GetAuraRadius()
	return FIND_UNITS_EVERYWHERE
end
function modifier_night_stalker_midnight_feast_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_night_stalker_midnight_feast_custom_legendary:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
end
function modifier_night_stalker_midnight_feast_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_ALL
end
function modifier_night_stalker_midnight_feast_custom_legendary:GetModifierAura()
	return "modifier_night_stalker_midnight_feast_custom_legendary_aura"
end
function modifier_night_stalker_midnight_feast_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.radius = 3000

	if not IsServer() then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"generic_sound",
		{ sound = "Stalker.Hunter_legendary_blind" }
	)
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"generic_sound",
		{ sound = "Stalker.Hunter_legendary_blind2" }
	)

	self.parent:GenericParticle("particles/night_stalker/fear_legendary_hit.vpcf")

	local particle = ParticleManager:CreateParticle(
		"particles/night_stalker/hunter_legendary_stun.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
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
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.particle_icon = ParticleManager:CreateParticle(
		"particles/night_stalker/hunter_legendary_icon.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleShouldCheckFoW(self.particle_icon, false)
	self:AddParticle(self.particle_icon, false, false, -1, false, false)

	self.particle2 = ParticleManager:CreateParticle(
		"particles/econ/items/nightstalker/nightstalker_black_nihility/nightstalker_black_nihility_void.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleShouldCheckFoW(self.particle2, false)
	self:AddParticle(self.particle2, false, false, -1, false, false)

	self.particle = ParticleManager:CreateParticleForPlayer(
		"particles/night_stalker/hunter_legendary_screen.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID())
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	dota1x6.NO_FOW_TEAMS[self.parent:GetTeamNumber()] = true
	self.mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_bristleback_warpath_active", {})
end

function modifier_night_stalker_midnight_feast_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	if IsValid(self.mod) then
		self.mod:Destroy()
	end
	dota1x6.NO_FOW_TEAMS[self.parent:GetTeamNumber()] = false
end

function modifier_night_stalker_midnight_feast_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_BLIND] = true,
	}
end

function modifier_night_stalker_midnight_feast_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER,
	}
end

function modifier_night_stalker_midnight_feast_custom_legendary:GetModifierNoVisionOfAttacker()
	return 1
end

function modifier_night_stalker_midnight_feast_custom_legendary:GetAuraEntityReject(hEntity)
	if hEntity.owner and hEntity.owner == self.parent then
		return false
	end
	if
		hEntity:GetUnitName() == "npc_dota_observer_wards"
		or hEntity:GetUnitName() == "npc_dota_sentry_wards"
		or hEntity:IsCourier()
	then
		return false
	end
	return true
end

modifier_night_stalker_midnight_feast_custom_legendary_aura = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom_legendary_aura:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	if not IsServer() then
		return
	end
	self.mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_bristleback_warpath_active", {})
end

function modifier_night_stalker_midnight_feast_custom_legendary_aura:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.mod) then
		return
	end
	self.mod:Destroy()
end

function modifier_night_stalker_midnight_feast_custom_legendary_aura:CheckState()
	return {
		[MODIFIER_STATE_BLIND] = true,
	}
end

function modifier_night_stalker_midnight_feast_custom_legendary_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER,
	}
end

function modifier_night_stalker_midnight_feast_custom_legendary_aura:GetModifierNoVisionOfAttacker()
	return 1
end

modifier_night_stalker_midnight_feast_custom_legendary_caster = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom_legendary_caster:GetStatusEffectName()
	return "particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf"
end
function modifier_night_stalker_midnight_feast_custom_legendary_caster:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_night_stalker_midnight_feast_custom_legendary_caster:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false) + self.ability.talents.e7_bva
	self.status = self.ability.talents.e7_status

	if not IsServer() then
		return
	end
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_5, 1.3)
	self.parent:EmitSound("Stalker.Hunter_legendary_active")
	self.parent:EmitSound("Stalker.Hunter_legendary_active2")

	self.parent:GenericParticle("particles/night_stalker/hunter_legendary_proc.vpcf")

	self.legendary_particle = ParticleManager:CreateParticle(
		"particles/night_stalker/hunter_legendary_caster.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.legendary_particle, false, false, -1, false, false)
end

function modifier_night_stalker_midnight_feast_custom_legendary_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_night_stalker_midnight_feast_custom_legendary_caster:GetModifierModelScale()
	return 25
end

function modifier_night_stalker_midnight_feast_custom_legendary_caster:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_night_stalker_midnight_feast_custom_legendary_caster:GetModifierStatusResistanceStacking()
	return self.status
end

modifier_night_stalker_midnight_feast_custom_damage = class(mod_visible)
function modifier_night_stalker_midnight_feast_custom_damage:GetTexture()
	return "buffs/night_stalker/hunter_3"
end
function modifier_night_stalker_midnight_feast_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_max
	self.dark_max = self.ability.talents.e3_dark_max

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_night_stalker_midnight_feast_custom_damage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	local inc = 1
	if self.ability.talents.has_r7 == 1 then
		inc = self.max / self.dark_max
	end

	self:SetStackCount(math.min(self.max, self:GetStackCount() + inc))

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/enigma/summon_perma.vpcf")
		self.parent:EmitSound("BS.Thirst_legendary_active")
	end
end

function modifier_night_stalker_midnight_feast_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_night_stalker_midnight_feast_custom_damage:GetModifierDamageOutgoing_Percentage()
	return (self.ability.talents.e3_damage / self.max) * self:GetStackCount()
end

modifier_night_stalker_midnight_feast_custom_double = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom_double:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_night_stalker_midnight_feast_custom_double:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.attack_damage = 0
	if table.attack_damage then
		self.attack_damage = table.attack_damage
	end
	self.caster:EmitSound("Stalker.Hunter_double_start")

	if not self.caster:HasModifier("modifier_night_stalker_darkness_custom_legendary_dash") then
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2)
		local vec = Vector(1, 0, 0)
		if self.caster:HasModifier("modifier_night_stalker_innate_custom_active") then
			vec = Vector(0, 1, 0)
			if
				self.caster:HasModifier("modifier_night_stalker_darkness_custom_active")
				or self.caster:HasModifier("modifier_night_stalker_darkness_custom_blind_flight")
			then
				vec = Vector(0, 0, 1)
			end
		end

		local dir = (self.parent:GetOrigin() - self.caster:GetOrigin()):Normalized()
		local particle = ParticleManager:CreateParticle(
			"particles/night_stalker/hunter_double_attack.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle, 1, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(particle, 1, dir)
		ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
		ParticleManager:SetParticleControl(particle, 3, vec)
		ParticleManager:SetParticleControlForward(particle, 5, dir)
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

function modifier_night_stalker_midnight_feast_custom_double:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster) then
		return
	end

	local name = RandomInt(1, 2) == 1 and "particles/night_stalker/hunter_legendary_hit_2.vpcf"
		or "particles/night_stalker/hunter_legendary_hit.vpcf"
	local vec = (self.parent:GetAbsOrigin() - self.caster:GetAbsOrigin()):Normalized()
	vec.z = 0

	local particle = ParticleManager:CreateParticle(name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(particle, 1, vec)
	ParticleManager:SetParticleShouldCheckFoW(particle, false)
	ParticleManager:ReleaseParticleIndex(particle)

	self.ability:ProcCd()

	self.parent:EmitSound("Stalker.Hunter_double_hit")
	self.caster:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_night_stalker_midnight_feast_custom_double_damage",
		{ attack_damage = self.attack_damage, duration = FrameTime() }
	)
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_night_stalker_midnight_feast_custom_double_damage")

	local mod = self.parent:FindModifierByName("modifier_night_stalker_midnight_feast_custom_active")
	if mod then
		mod:ProcDamage()
	end
end

modifier_night_stalker_midnight_feast_custom_double_damage = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom_double_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()

	self.attack_damage = table.attack_damage
	self.damage = self.ability.talents.e3_double_damage - 100
end

function modifier_night_stalker_midnight_feast_custom_double_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_night_stalker_midnight_feast_custom_double_damage:GetModifierDamageOutgoing_Percentage()
	if not IsServer() then
		return
	end
	return self.attack_damage
end

function modifier_night_stalker_midnight_feast_custom_double_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

night_stalker_midnight_feast_custom_charge = class({})
night_stalker_midnight_feast_custom_charge.talents = {}

function night_stalker_midnight_feast_custom_charge:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e4_distance = caster:GetTalentValue("modifier_stalker_hunter_4", "distance", true),
			e4_talent_cd = caster:GetTalentValue("modifier_stalker_hunter_4", "talent_cd", true),
		}
	end
end

function night_stalker_midnight_feast_custom_charge:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	if IsServer() then
		self:SetLevel(1)
	end
end

function night_stalker_midnight_feast_custom_charge:GetCooldown()
	return self.talents.e4_talent_cd or 0
end

function night_stalker_midnight_feast_custom_charge:GetCastRange()
	return IsClient() and ((self.talents.e4_distance or 0) - self.caster:GetCastRangeBonus()) or 999999
end

function night_stalker_midnight_feast_custom_charge:OnSpellStart()
	if not self.caster.midnight_ability then
		return
	end
	local point = self:GetCursorPosition()
	self.caster:AddNewModifier(
		self.caster,
		self.caster.midnight_ability,
		"modifier_night_stalker_midnight_feast_custom_charge",
		{ x = point.x, y = point.y }
	)
end

modifier_night_stalker_midnight_feast_custom_charge = class(mod_hidden)
function modifier_night_stalker_midnight_feast_custom_charge:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_night_stalker_midnight_feast_custom_charge:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Stalker.Hunter_charge")
	self.parent:EmitSound("Stalker.Hunter_charge2")

	local offset = -10
	if self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		offset = 50
	end

	self.particle = ParticleManager:CreateParticle(
		"particles/night_stalker/hunter_charge.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, 0, offset))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.parent:GenericParticle("particles/night_stalker/hunter_charge_effect.vpcf")

	ProjectileManager:ProjectileDodge(self.parent)

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	if self.point == self.parent:GetAbsOrigin() then
		self.point = self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * 10
	end

	self.dir = self.point - self.parent:GetAbsOrigin()
	self.dir.z = 0

	self.speed = self.ability.talents.e4_speed
	self.distance = self.ability.talents.e4_distance
	self.point = self.parent:GetAbsOrigin() + self.dir:Normalized() * self.distance

	self.dir = self.point - self.parent:GetAbsOrigin()
	self.pass = 0

	self.parent:FacePoint(self.point)

	self:SetDuration(self.dir:Length2D() / self.speed, false)
	self.parent:StartGesture(ACT_DOTA_RUN)

	if not self:ApplyHorizontalMotionController() then
		self:Destroy()
		return
	end
end

function modifier_night_stalker_midnight_feast_custom_charge:UpdateHorizontalMotion(me, dt)
	if self.parent:IsStunned() or self.parent:IsHexed() or self.parent:IsRooted() or self.parent:IsLeashed() then
		self:Destroy()
		return
	end

	self.pass = self.pass + self.speed * dt

	local nextpos = me:GetOrigin() + self.dir:Normalized() * self.speed * dt
	local new_point = GetGroundPosition(nextpos, nil)
	me:SetOrigin(new_point)

	if self.pass >= self.distance then
		self:Destroy()
		return
	end
end

function modifier_night_stalker_midnight_feast_custom_charge:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_night_stalker_midnight_feast_custom_charge:GetStatusEffectName()
	if self.parent:HasModifier("modifier_night_stalker_midnight_feast_custom_legendary_caster") then
		return
	end
	return "particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf"
end

function modifier_night_stalker_midnight_feast_custom_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_night_stalker_midnight_feast_custom_charge:GetActivityTranslationModifiers()
	local activity = "haste"
	if self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		activity = "hunter_night"
	end
	return activity
end

function modifier_night_stalker_midnight_feast_custom_charge:GetModifierDisableTurning()
	return 1
end

function modifier_night_stalker_midnight_feast_custom_charge:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
	}
end

function modifier_night_stalker_midnight_feast_custom_charge:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveHorizontalMotionController(self)

	self.parent:FacePoint()
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)

	self.parent:FadeGesture(ACT_DOTA_RUN)
end