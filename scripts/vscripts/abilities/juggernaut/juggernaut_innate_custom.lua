--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_juggernaut_innate_custom",
	"abilities/juggernaut/juggernaut_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_juggernaut_innate_custom_stats",
	"abilities/juggernaut/juggernaut_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

juggernaut_innate_custom = class({})
juggernaut_innate_custom.talents = {}

function juggernaut_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/jugg_agility_boost.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_juggernaut.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/juggernaut_vo_custom.vsndevts", context)
end

function juggernaut_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			h1_health = 0,
			h1_stats = 0,
		}
	end

	if caster:HasTalent("modifier_juggernaut_hero_1") then
		self.talents.h1_health = caster:GetTalentValue("modifier_juggernaut_hero_1", "health")
		self.talents.h1_stats = caster:GetTalentValue("modifier_juggernaut_hero_1", "stats")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end
end

function juggernaut_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_juggernaut_innate_custom"
end

function juggernaut_innate_custom:AddStack(target, is_spell)
	if not IsServer() then
		return
	end
	local duration = target:IsCreep() and self.duration_creeps or self.duration
	local mod = self.caster:FindModifierByName("modifier_juggernaut_innate_custom_stats")
	if mod then
		duration = math.max(mod:GetRemainingTime(), duration)
	end

	local spell = 0
	if is_spell then
		spell = 1
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_juggernaut_innate_custom_stats",
		{ spell = spell, duration = duration }
	)
end

modifier_juggernaut_innate_custom = class(mod_hidden)
function modifier_juggernaut_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.bladeform_ability = self.ability

	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.ability.spells = self.ability:GetSpecialValueFor("spells")
	self.ability.stats = self.ability:GetSpecialValueFor("stats")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.duration_creeps = self.ability:GetSpecialValueFor("duration_creeps")

	self.parent:AddProc(self, { land = true })
end

function modifier_juggernaut_innate_custom:OnRefresh(table)
	self.ability.stats = self.ability:GetSpecialValueFor("stats")
end

function modifier_juggernaut_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_juggernaut_innate_custom:GetModifierExtraHealthPercentage()
	return self.ability.talents.h1_health
end

function modifier_juggernaut_innate_custom:GetProcChance()
	return 100
end

function modifier_juggernaut_innate_custom:AttackProc(params, name)
	self.ability:AddStack(params.target)
end

modifier_juggernaut_innate_custom_stats = class(mod_visible)
function modifier_juggernaut_innate_custom_stats:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.stats = (self.ability.stats + self.ability.talents.h1_stats) / self.ability.max
	self.count = 0
	self.max_count = 1 / self.ability.spells
	self.max = self.ability.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_juggernaut_innate_custom_stats:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	if table.spell == 1 then
		self.count = self.count + 1
		if self.count < self.max_count then
			return
		end
		self.count = 0
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/units/heroes/hero_juggernaut/jugg_agility_boost.vpcf", self)
	end
end

function modifier_juggernaut_innate_custom_stats:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_juggernaut_innate_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_juggernaut_innate_custom_stats:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.stats
end

function modifier_juggernaut_innate_custom_stats:GetModifierBonusStats_Agility()
	return self:GetStackCount() * self.stats
end