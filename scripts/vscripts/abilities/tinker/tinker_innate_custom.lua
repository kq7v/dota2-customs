--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_tinker_innate_custom", "abilities/tinker/tinker_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_tinker_innate_custom_move",
	"abilities/tinker/tinker_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_tinker_innate_custom_shield",
	"abilities/tinker/tinker_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_innate_custom_shield_cd",
	"abilities/tinker/tinker_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_tinker_innate_custom_shield_auto_cd",
	"abilities/tinker/tinker_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_tinker_hero_5"
)

tinker_innate_custom = class({})
tinker_innate_custom.talents = {}

function tinker_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_defense_matrix_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tinker/tinker_defense_matrix_pulse.vpcf", context)
	PrecacheResource("particle", "particles/tinker/scepter_proc.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_tinker.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_tinker", context)
end

function tinker_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_h1 = 0,
			h1_mana = 0,

			has_h2 = 0,
			h2_shield = 0,
			h2_status = 0,

			has_h3 = 0,
			h3_health = 0,
			h3_int = 0,

			has_h5 = 0,
			h5_health = caster:GetTalentValue("modifier_tinker_hero_5", "health", true),
			h5_talent_cd = caster:GetTalentValue("modifier_tinker_hero_5", "talent_cd", true),

			has_h6 = 0,
			h6_damage_reduce = caster:GetTalentValue("modifier_tinker_hero_6", "damage_reduce", true) / 100,
		}
	end

	if caster:HasTalent("modifier_tinker_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_mana = caster:GetTalentValue("modifier_tinker_hero_1", "mana")
	end

	if caster:HasTalent("modifier_tinker_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_shield = caster:GetTalentValue("modifier_tinker_hero_2", "shield") / 100
		self.talents.h2_status = caster:GetTalentValue("modifier_tinker_hero_2", "status")
	end

	if caster:HasTalent("modifier_tinker_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_health = caster:GetTalentValue("modifier_tinker_hero_3", "health")
		self.talents.h3_int = caster:GetTalentValue("modifier_tinker_hero_3", "int") / 100
		caster:AddPercentStat({ int = self.talents.h3_int }, self.tracker)
		if IsServer() then
			self.parent:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_tinker_hero_5") then
		self.talents.has_h5 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_tinker_hero_6") then
		self.talents.has_h6 = 1
	end
end

function tinker_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_tinker_innate_custom"
end

function tinker_innate_custom:ProcTeleport()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if not self.caster:HasScepter() then
		return
	end

	self.caster:RemoveModifierByName("modifier_tinker_innate_custom_move")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_tinker_innate_custom_move",
		{ duration = self.scepter_duration }
	)
end

modifier_tinker_innate_custom = class(mod_hidden)
function modifier_tinker_innate_custom:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.tinker_innate = self.ability

	self.ability.shield_start = self.ability:GetSpecialValueFor("shield_start") / 100
	self.ability.shield_timer = self.ability:GetSpecialValueFor("shield_timer")
	self.ability.shield_cd = self.ability:GetSpecialValueFor("shield_cd")
	self.ability.shield_base = self.ability:GetSpecialValueFor("shield_base")
	self.ability.shield_health = self.ability:GetSpecialValueFor("shield_health") / 100
	self.ability.status_bonus = self.ability:GetSpecialValueFor("status_bonus")

	self.ability.scepter_move = self.ability:GetSpecialValueFor("scepter_move")
	self.ability.scepter_duration = self.ability:GetSpecialValueFor("scepter_duration")

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
end

function modifier_tinker_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_tinker_innate_custom_shield") then
		return
	end
	if self.parent:HasModifier("modifier_tinker_innate_custom_shield_cd") then
		return
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_tinker_innate_custom_shield", { auto = 0 })
end

function modifier_tinker_innate_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_tinker_innate_custom_shield")
end

function modifier_tinker_innate_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_tinker_innate_custom_shield") then
		return
	end
	if params.damage <= 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.h5_health then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if self.parent:HasModifier("modifier_tinker_innate_custom_shield_auto_cd") then
		return
	end

	self.parent:GenericParticle("particles/tinker/scepter_proc.vpcf")
	self.parent:AddNewModifier(
		self.parent,
		nil,
		"modifier_tinker_innate_custom_shield_auto_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)

	self.parent:Purge(false, true, false, true, true)
	self.parent:RemoveModifierByName("modifier_tinker_innate_custom_shield")
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_tinker_innate_custom_shield", { auto = 1 })
	self.parent:RemoveModifierByName("modifier_tinker_innate_custom_shield_cd")
end

function modifier_tinker_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_tinker_innate_custom:GetModifierPercentageManacostStacking()
	return self.ability.talents.h1_mana
end

function modifier_tinker_innate_custom:GetModifierHealthBonus()
	return self.parent:GetIntellect(false) * self.ability.talents.h3_health
end

modifier_tinker_innate_custom_shield = class(mod_visible)
function modifier_tinker_innate_custom_shield:IsPurgable()
	return self.ability.talents.has_h5 == 0
end
function modifier_tinker_innate_custom_shield:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max_shield = math.floor(
		(self.ability.shield_base + self.ability.shield_health * self.parent:GetMaxHealth())
			* (1 + self.ability.talents.h2_shield)
	)
	self.interval = 0.1
	self.timer = self.ability.shield_timer
	self.shield_start = true
	self.shield_count = self.max_shield * self.ability.shield_start
	self.shield_add = math.floor(((self.max_shield - self.shield_count) / self.timer) * self.interval)

	if IsClient() then
		local particle2 = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_tinker/tinker_defense_matrix.vpcf",
			PATTACH_POINT_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle2,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(particle2, false, false, -1, false, false)
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.auto = params.auto
	if self.auto == 1 then
		self.shield_start = false
		self.shield_count = self.max_shield
	end

	self.shield = self.shield_count

	if self.ability.talents.has_h5 == 1 then
		self.parent:Purge(false, true, false, false, false)
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_tinker/tinker_defense_matrix_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:EmitSound("Hero_Tinker.DefensiveMatrix.Cast")
	self.parent:EmitSound("Hero_Tinker.DefensiveMatrix.Target")

	self:SetHasCustomTransmitterData(true)
	self:OnIntervalThink(true)
	self:StartIntervalThink(self.interval)
end

function modifier_tinker_innate_custom_shield:OnIntervalThink(first)
	if not IsServer() then
		return
	end

	if self.shield_start == true and not first then
		self.shield_count = self.shield_count + self.shield_add
		self.shield = math.min(self.max_shield, self.shield + self.shield_add)
		self:SendBuffRefreshToClients()
	end

	if self.shield_count >= self.max_shield then
		self.shield_start = false
	end
end

function modifier_tinker_innate_custom_shield:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Hero_Tinker.DefensiveMatrix.Target")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_tinker_innate_custom_shield_cd",
		{ duration = self.ability.shield_cd }
	)
end

function modifier_tinker_innate_custom_shield:AddCustomTransmitterData()
	return {
		shield = self.shield,
		max_shield = self.max_shield,
	}
end

function modifier_tinker_innate_custom_shield:HandleCustomTransmitterData(data)
	self.shield = data.shield
	self.max_shield = data.max_shield
end

function modifier_tinker_innate_custom_shield:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT,
	}
end

function modifier_tinker_innate_custom_shield:GetModifierStatusResistanceStacking()
	return self.ability.status_bonus + self.ability.talents.h2_status
end

function modifier_tinker_innate_custom_shield:GetModifierIncomingDamageConstant(params)
	if IsClient() then
		if params.report_max then
			return self.max_shield
		else
			return self.shield
		end
	end

	if not IsServer() then
		return
	end
	if params.attacker and params.attacker:IsBuilding() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_tinker/tinker_defense_matrix_pulse.vpcf",
		PATTACH_POINT_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	local k = 1
	if self.parent:HasModifier("modifier_tinker_rearm_custom") and self.ability.talents.has_h6 == 1 then
		k = (1 + self.ability.talents.h6_damage_reduce)
	end

	local damage = math.min(params.damage, self.shield / k)
	local shield_damage = damage * k

	self.shield = math.max(0, self.shield - shield_damage)

	if self.shield <= 0 then
		self:Destroy()
	end
	self:SendBuffRefreshToClients()

	self.parent:AddShieldInfo({ shield_mod = self, healing = damage, healing_type = "shield" })
	if
		params.attacker
		and players[params.attacker:GetId()]
		and self.parent:GetQuest() == "Tinker.Quest_7"
		and not self.parent:QuestCompleted()
	then
		self.parent:UpdateQuest(damage)
	end

	return -damage
end

modifier_tinker_innate_custom_move = class(mod_visible)
function modifier_tinker_innate_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.particle = self.parent:GenericParticle("particles/econ/events/ti10/phase_boots_ti10.vpcf", self)
end

function modifier_tinker_innate_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
	}
end

function modifier_tinker_innate_custom_move:GetModifierMoveSpeed_Absolute()
	return self.ability.scepter_move
end

modifier_tinker_innate_custom_shield_cd = class(mod_cd)
function modifier_tinker_innate_custom_shield_cd:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true
end

function modifier_tinker_innate_custom_shield_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability, self.ability.tracker) then
		return
	end
	self.ability.tracker:OnIntervalThink()
end

modifier_tinker_innate_custom_shield_auto_cd = class(mod_cd)
function modifier_tinker_innate_custom_shield_auto_cd:GetTexture()
	return "buffs/tinker/hero_5"
end