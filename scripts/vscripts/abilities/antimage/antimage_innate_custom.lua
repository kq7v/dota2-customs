--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_antimage_innate_custom",
	"abilities/antimage/antimage_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_antimage_innate_custom_slow",
	"abilities/antimage/antimage_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

antimage_innate_custom = class({})
antimage_innate_custom.talents = {}

function antimage_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_antimage.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/antimage_vo_custom.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_antimage", context)
end

function antimage_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_h1 = 0,
			h1_slow = 0,
			h1_damage_reduce = 0,

			has_h6 = 0,
		}
	end

	if caster:HasTalent("modifier_antimage_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_slow = caster:GetTalentValue("modifier_antimage_hero_1", "slow")
		self.talents.h1_damage_reduce = caster:GetTalentValue("modifier_antimage_hero_1", "damage_reduce")
	end

	if caster:HasTalent("modifier_antimage_hero_6") then
		self.talents.has_h6 = 1
	end
end

function antimage_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_antimage_innate_custom"
end

modifier_antimage_innate_custom = class(mod_hidden)
function modifier_antimage_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.antimage_innate = self.ability
	self.ability.slow_max = self.ability:GetSpecialValueFor("slow_max")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")

	self.parent:AddProc(self, { land = true, illusion = true })
end

function modifier_antimage_innate_custom:GetProcChance()
	return 100
end

function modifier_antimage_innate_custom:AttackProc(params, name)
	if self.parent:PassivesDisabled() then
		return
	end
	if not IsValid(self.ability) then
		return
	end

	local attacker = params.attacker
	if attacker.owner then
		attacker = attacker.owner
	end

	if self.parent ~= attacker then
		return
	end
	if not attacker:HasAbility(self.ability:GetName()) then
		return
	end

	local target = params.target
	target:AddNewModifier(
		self.parent,
		self.parent:BkbAbility(self.ability, self.ability.talents.has_h6 == 1),
		"modifier_antimage_innate_custom_slow",
		{ duration = self.ability.duration }
	)
end

modifier_antimage_innate_custom_slow = class(mod_hidden)
function modifier_antimage_innate_custom_slow:IsPurgable()
	return true
end
function modifier_antimage_innate_custom_slow:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self.caster.antimage_innate

	self.slow_max = self.ability.slow_max + self.ability.talents.h1_slow
	self.damage = self.ability.talents.h1_damage_reduce

	if not IsServer() then
		return
	end
	self:UpdateSlow()
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_antimage/antimage_manabreak_slow.vpcf",
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
end

function modifier_antimage_innate_custom_slow:OnRefresh()
	self:UpdateSlow()
end

function modifier_antimage_innate_custom_slow:UpdateSlow()
	if not IsServer() then
		return
	end
	local mana_perc = self.parent:GetMaxMana() <= 0 and 50 or self.parent:GetManaPercent()
	self:SetStackCount(self.slow_max * (1 - mana_perc / 100))
end

function modifier_antimage_innate_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_antimage_innate_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self:GetStackCount() * -1
end

function modifier_antimage_innate_custom_slow:GetModifierDamageOutgoing_Percentage()
	return self.damage * (self:GetStackCount() / self.slow_max)
end

function modifier_antimage_innate_custom_slow:GetModifierSpellAmplify_Percentage()
	return self.damage * (self:GetStackCount() / self.slow_max)
end