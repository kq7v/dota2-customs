--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_leshrac_defilement_custom",
	"abilities/leshrac/leshrac_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)

leshrac_innate_custom = class({})
leshrac_innate_custom.talents = {}

function leshrac_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_leshrac.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_leshrac", context)
end

function leshrac_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_h3 = 0,
			h3_health = 0,
			h3_range = 0,
		}
	end

	if caster:HasTalent("modifier_leshrac_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_health = caster:GetTalentValue("modifier_leshrac_hero_3", "health") / 100
		self.talents.h3_range = caster:GetTalentValue("modifier_leshrac_hero_3", "range") / 100
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end
end

function leshrac_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_leshrac_defilement_custom"
end

function leshrac_innate_custom:GetRange()
	return self.parent:GetIntellect(false) * (self.radius or 0) * (1 + (self.talents.h3_range or 0))
end

modifier_leshrac_defilement_custom = class(mod_hidden)
function modifier_leshrac_defilement_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.leshrac_innate = self.ability

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
end

function modifier_leshrac_defilement_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_leshrac_defilement_custom:GetModifierHealthBonus()
	return self.ability.talents.h3_health * self.parent:GetMaxMana()
end

function modifier_leshrac_defilement_custom:GetModifierAttackRangeBonus()
	return self.ability:GetRange()
end

function modifier_leshrac_defilement_custom:GetModifierCastRangeBonusStacking()
	return self.ability:GetRange()
end