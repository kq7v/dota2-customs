--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_drow_ranger_innate_custom",
	"abilities/drow_ranger/drow_ranger_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_drow_ranger_innate_custom_active",
	"abilities/drow_ranger/drow_ranger_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

drow_ranger_innate_custom = class({})
drow_ranger_innate_custom.talents = {}

function drow_ranger_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_drow/drow_marksmanship.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_drow/drow_marksmanship_start.vpcf", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/drow_ranger_vo_custom.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_drow_ranger.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_drow_ranger", context)
end

function drow_ranger_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			h2_evasion = 0,
			h2_move = 0,
			h2_bonus = caster:GetTalentValue("modifier_drow_hero_2", "bonus", true),

			h3_magic = 0,
			h3_status = 0,
			h3_bonus = caster:GetTalentValue("modifier_drow_hero_3", "bonus", true),

			has_q7 = 0,

			has_r4 = 0,
			r4_linger = caster:GetTalentValue("modifier_drow_marksman_4", "linger", true),
			r4_health = caster:GetTalentValue("modifier_drow_marksman_4", "health", true),
			r4_health_max = caster:GetTalentValue("modifier_drow_marksman_4", "health_max", true),
		}
	end

	if caster:HasTalent("modifier_drow_hero_2") then
		self.talents.h2_evasion = caster:GetTalentValue("modifier_drow_hero_2", "evasion")
		self.talents.h2_move = caster:GetTalentValue("modifier_drow_hero_2", "move")
	end

	if caster:HasTalent("modifier_drow_hero_3") then
		self.talents.h3_magic = caster:GetTalentValue("modifier_drow_hero_3", "magic")
		self.talents.h3_status = caster:GetTalentValue("modifier_drow_hero_3", "status")
	end

	if caster:HasTalent("modifier_drow_frost_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_drow_marksman_4") then
		self.talents.has_r4 = 1
	end
end

function drow_ranger_innate_custom:GetIntrinsicModifierName()
	return "modifier_drow_ranger_innate_custom"
end

modifier_drow_ranger_innate_custom = class(mod_hidden)
function modifier_drow_ranger_innate_custom:RemoveOnDeath()
	return false
end
function modifier_drow_ranger_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.agility = self.ability:GetSpecialValueFor("agility") / 100
	self.ability.reduce = self.ability:GetSpecialValueFor("reduce")

	self.bonus = 0
	self:SetHasCustomTransmitterData(true)

	if not IsServer() then
		return
	end
	self.interval = 0.2
	if self.parent:IsIllusion() then
		self.interval = 0.5
	end
	self.effect_mark = ""
	self:UpdateParticle()
	self:StartIntervalThink(0.1)
end

function modifier_drow_ranger_innate_custom:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	self.parent:RemoveModifierByName("modifier_drow_ranger_innate_custom_active")
end

function modifier_drow_ranger_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:IsIllusion() and not self.illusion_init and self.parent.owner then
		self.illusion_init = true
		local frost_ability = self.parent.owner:FindAbilityByName("drow_ranger_frost_arrows_custom")
		if IsValid(frost_ability) then
			self.parent:SetRangedProjectileName(frost_ability:GetProj())
		end
	end

	if self.ability:GetLevel() ~= self.level then
		self.level = self.ability:GetLevel()
		self.parent:RemoveModifierByName("modifier_drow_ranger_innate_custom_active")
	end

	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.ability.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_CLOSEST,
		false
	)
	local mod = self.parent:FindModifierByName("modifier_drow_ranger_innate_custom_active")
	local has_legendary = self.parent:HasModifier("modifier_drow_ranger_marksmanship_custom_legendary_active")

	local allow = #targets <= 0 or has_legendary
	local bonus_mod = self.parent:FindModifierByName("modifier_drow_ranger_marksmanship_custom_agi_bonus")
	local agi = self.ability.agility
	if bonus_mod and bonus_mod.bonus then
		agi = agi * (1 + bonus_mod.bonus * bonus_mod:GetStackCount() / 100)
	end

	if (self.parent:PassivesDisabled() and not has_legendary) or not self.parent:IsAlive() then
		if mod then
			mod:Destroy()
		end
		agi = 0
	else
		if mod and not allow then
			mod:ProcEnd()
		end

		if allow then
			if mod then
				if mod.ending == true then
					mod.ending = false
					mod:SetDuration(-1, true)
				end
			else
				mod = self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_drow_ranger_innate_custom_active",
					{}
				)
			end
		end

		if not mod then
			agi = agi / self.ability.reduce
		end
	end

	if self.ability.talents.has_q7 == 1 then
		if self.bonus ~= agi * 100 then
			self.bonus = agi * 100
			self:SendBuffRefreshToClients()
		end
		agi = 0
	end
	self.parent:AddPercentStat({ agi = agi }, self)
end

function modifier_drow_ranger_innate_custom:UpdateParticle()
	if not IsServer() then
		return
	end

	local particle_mark_start = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_drow/drow_marksmanship_start.vpcf",
		self
	)
	local effect_mark = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_drow/drow_marksmanship.vpcf",
		self
	)

	if self.effect_mark ~= effect_mark then
		self.effect_mark = effect_mark

		if self.particle then
			ParticleManager:DestroyParticle(self.particle, true)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end

		self.particle = self.parent:GenericParticle(self.effect_mark, self)
	end

	if self.parent:HasModifier("modifier_drow_ranger_innate_custom_active") then
		self.parent:GenericParticle(particle_mark_start)
		ParticleManager:SetParticleControl(self.particle, 2, Vector(2, 0, 0))
	else
		ParticleManager:SetParticleControl(self.particle, 2, Vector(1, 0, 0))
	end
end

function modifier_drow_ranger_innate_custom:AddCustomTransmitterData()
	return {
		bonus = self.bonus,
	}
end

function modifier_drow_ranger_innate_custom:HandleCustomTransmitterData(data)
	self.bonus = data.bonus
end

function modifier_drow_ranger_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_EVASION_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_drow_ranger_innate_custom:GetModifierStatusResistanceStacking()
	if not IsValid(self.parent) then
		return
	end
	return self.parent:HasModifier("modifier_drow_ranger_innate_custom_active")
			and self.ability.talents.h3_status * self.ability.talents.h3_bonus
		or self.ability.talents.h3_status
end

function modifier_drow_ranger_innate_custom:GetModifierMagicalResistanceBonus()
	if not IsValid(self.parent) then
		return
	end
	return self.parent:HasModifier("modifier_drow_ranger_innate_custom_active")
			and self.ability.talents.h3_magic * self.ability.talents.h3_bonus
		or self.ability.talents.h3_magic
end

function modifier_drow_ranger_innate_custom:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q7 == 0 then
		return
	end
	return self.bonus
end

function modifier_drow_ranger_innate_custom:GetModifierEvasion_Constant()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h2_evasion
		* (
			self.parent:HasModifier("modifier_drow_ranger_wave_of_silence_custom_speed")
				and self.ability.talents.h2_bonus
			or 1
		)
end

function modifier_drow_ranger_innate_custom:GetModifierMoveSpeedBonus_Constant()
	if not IsValid(self.parent) then
		return
	end
	return self.ability.talents.h2_move
		* (
			self.parent:HasModifier("modifier_drow_ranger_wave_of_silence_custom_speed")
				and self.ability.talents.h2_bonus
			or 1
		)
end

modifier_drow_ranger_innate_custom_active = class(mod_visible)
function modifier_drow_ranger_innate_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.linger_duration = self.ability.talents.r4_linger
	self.health = self.ability.talents.r4_health
	self.max = self.ability.talents.r4_health_max / self.health

	if not IsServer() then
		return
	end
	self.ending = false
	self.mod = self.ability.tracker

	if IsValid(self.mod) then
		self.mod:UpdateParticle()
	end

	self:StartIntervalThink(1)
end

function modifier_drow_ranger_innate_custom_active:OnRefresh()
	if not IsServer() then
		return
	end
	self.ending = false
end

function modifier_drow_ranger_innate_custom_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end

	if self:GetStackCount() < self.max then
		self:IncrementStackCount()
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_drow_ranger_innate_custom_active:ProcEnd()
	if not IsServer() then
		return
	end
	if self.ending == true then
		return
	end

	if self.ability.talents.has_r4 == 1 then
		self.ending = true
		self:SetDuration(self.linger_duration, true)
	else
		self:Destroy()
	end
end

function modifier_drow_ranger_innate_custom_active:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:CalculateStatBonus(true)

	if IsValid(self.mod) then
		self.mod:UpdateParticle()
	end
end

function modifier_drow_ranger_innate_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_drow_ranger_innate_custom_active:GetModifierExtraHealthPercentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.health * self:GetStackCount()
end