--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_bloodseeker_sanguivore_custom",
	"abilities/bloodseeker/bloodseeker_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

bloodseeker_innate_custom = class({})
bloodseeker_innate_custom.talents = {}

function bloodseeker_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_bloodseeker.vsndevts", context)
	PrecacheResource("particle", "particles/bloodseeker/shard_shield.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_bloodseeker", context)
end

function bloodseeker_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_h2 = 0,
			h2_shield_max = 0,
			h2_shield = 0,

			h3_heal = 0,
			h3_health = caster:GetTalentValue("modifier_bloodseeker_hero_3", "health", true),
			h3_bonus = caster:GetTalentValue("modifier_bloodseeker_hero_3", "bonus", true),
		}
	end

	if caster:HasTalent("modifier_bloodseeker_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_shield_max = caster:GetTalentValue("modifier_bloodseeker_hero_2", "shield_max") / 100
		self.talents.h2_shield = caster:GetTalentValue("modifier_bloodseeker_hero_2", "shield") / 100
	end

	if caster:HasTalent("modifier_bloodseeker_hero_3") then
		self.talents.h3_heal = caster:GetTalentValue("modifier_bloodseeker_hero_3", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_bloodseeker_hero_3",
			value = function(params)
				if params.unit and params.unit:GetHealthPercent() <= self.talents.h3_health then
					return self.talents.h3_heal * self.talents.h3_bonus
				end
				return self.talents.h3_heal
			end,
		})
	end
end

function bloodseeker_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_bloodseeker_sanguivore_custom"
end

function bloodseeker_innate_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if IsValid(self.tracker) then
		self.tracker:InitScepter()
	end
end

modifier_bloodseeker_sanguivore_custom = class(mod_hidden)
function modifier_bloodseeker_sanguivore_custom:RemoveOnDeath()
	return false
end
function modifier_bloodseeker_sanguivore_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability.scepter_shield = self.ability:GetSpecialValueFor("scepter_shield") / 100
	self.ability.shield_max = self.ability:GetSpecialValueFor("shield_max") / 100
	self.ability.heal_pct = self.ability:GetSpecialValueFor("heal_pct") / 100

	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.sanguivore_ability = self.ability

	self.parent:AddDeathEvent(self, true)
	self:InitScepter()
end

function modifier_bloodseeker_sanguivore_custom:InitScepter()
	if not IsServer() then
		return
	end
	if self.init_scepter then
		return
	end
	if not self.parent:HasScepter() then
		return
	end

	self.init_scepter = true
	self.parent:AddLifesteal(self, {
		heal = false,
		proc = "LifestealShield",
		value = function(params)
			if not self.parent:HasScepter() then
				return 0
			end
			if not params.unit:HasModifier("modifier_bloodseeker_rupture_custom") then
				return 0
			end
			return self.ability.scepter_shield
		end,
	})
end

function modifier_bloodseeker_sanguivore_custom:LifestealShield(params, shield)
	self:AddShield(shield)
end

function modifier_bloodseeker_sanguivore_custom:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not params.attacker then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	if not params.unit:IsUnit() then
		return
	end
	if params.unit:IsIllusion() then
		return
	end

	local effect = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf",
		self,
		"bloodseeker_bloodrage_custom"
	)
	if effect == "particles/econ/items/bloodseeker/bloodseeker_eztzhok_weapon/bloodseeker_bloodbath_eztzhok.vpcf" then
		local particle = ParticleManager:CreateParticle(effect, PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			nil,
			self.parent:GetAbsOrigin(),
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
	end

	self:AddShield(params.unit:GetMaxHealth() * self.ability.heal_pct)
end

function modifier_bloodseeker_sanguivore_custom:AddShield(add_shield, is_bath)
	if not IsServer() then
		return
	end
	local max_shield = (self.parent:GetMaxHealth() * self.ability.shield_max) * (1 + self.ability.talents.h2_shield_max)
	local shield = add_shield
	if is_bath then
		shield = max_shield * self.ability.talents.h2_shield
	end

	if not IsValid(self.active_shield) then
		self.active_shield = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
			max_shield = max_shield,
		})
		if self.active_shield then
			self.active_shield.RemoveForDuel = nil
			self.parent:GenericParticle("particles/bloodseeker/shard_shield.vpcf", self.active_shield)
		end
	end

	if self.active_shield then
		self.active_shield:AddShield(shield, max_shield)
	end
end

function modifier_bloodseeker_sanguivore_custom:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.active_shield) then
		return
	end
	self.active_shield:Destroy()
end