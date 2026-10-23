--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_legion_commander_innate_custom",
	"abilities/legion_commander/legion_commander_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_legion_commander_innate_custom_bonus",
	"abilities/legion_commander/legion_commander_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_legion_commander_innate_custom_armor",
	"abilities/legion_commander/legion_commander_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_legion_hero_1"
)

legion_commander_innate_custom = class({})
legion_commander_innate_custom.talents = {}

function legion_commander_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("soundfile", "soundevents/npc_dota_hero_legion_commander.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/legion_commander_vo_custom.vsndevts", context)
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/jugg_agility_boost.vpcf", context)
end

function legion_commander_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_legion_moment_4", "duration", true),

			r3_str = 0,

			has_h1 = 0,
			h1_status = 0,
			h1_armor = 0,
			h1_duration = caster:GetTalentValue("modifier_legion_hero_1", "duration", true),

			h2_move = 0,
			h2_slow_resist = 0,
		}
	end

	if caster:HasTalent("modifier_legion_press_3") then
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_legion_moment_4") then
		self.talents.has_e4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_legion_duel_3") then
		self.talents.r3_str = caster:GetTalentValue("modifier_legion_duel_3", "str")
	end

	if caster:HasTalent("modifier_legion_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_status = caster:GetTalentValue("modifier_legion_hero_1", "status")
		self.talents.h1_armor = caster:GetTalentValue("modifier_legion_hero_1", "armor")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_legion_hero_2") then
		self.talents.h2_move = caster:GetTalentValue("modifier_legion_hero_2", "move")
		self.talents.h2_slow_resist = caster:GetTalentValue("modifier_legion_hero_2", "slow_resist")
	end
end

function legion_commander_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_legion_commander_innate_custom"
end

modifier_legion_commander_innate_custom = class(mod_hidden)
function modifier_legion_commander_innate_custom:IsHidden()
	return self:GetStackCount() <= 0
end
function modifier_legion_commander_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.legion_innate_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.str = self.ability:GetSpecialValueFor("str")
	self.ability.str_max = self.ability:GetSpecialValueFor("str_max")
	self.ability.bonus = self.ability:GetSpecialValueFor("bonus")
	self.ability.linger = self.ability:GetSpecialValueFor("linger")

	self.damage_count = 0

	self.parent:AddDamageEvent_out(self, true)
end

function modifier_legion_commander_innate_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	if IsValid(self.parent.press_ability) and params.target then
		self.parent.press_ability:ProcDamage(params.target)
	end

	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_e4 == 1 and IsValid(self.parent.moment_ability) then
		self.parent:AddNewModifier(
			self.parent,
			self.parent.moment_ability,
			"modifier_moment_of_courage_custom_spell",
			{ duration = self.ability.talents.e4_duration }
		)
	end

	if self.ability.talents.has_h1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_legion_commander_innate_custom_armor",
			{ duration = self.ability.talents.h1_duration }
		)
	end
end

function modifier_legion_commander_innate_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self:GetMax() then
		return
	end
	if not params.unit:IsRealHero() then
		return
	end
	if params.damage <= 0 then
		return
	end

	local final = self.damage_count + params.damage
	if final >= self.ability.damage then
		local delta = math.floor(final / self.ability.damage)
		self:SetStackCount(math.min(self:GetMax(), self:GetStackCount() + delta))
		self.parent:CalculateStatBonus(true)
		self.damage_count = final - delta * self.ability.damage
	else
		self.damage_count = final
	end
end

function modifier_legion_commander_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_legion_commander_innate_custom:GetModifierSlowResistance_Stacking()
	return self.ability.talents.h2_slow_resist
end

function modifier_legion_commander_innate_custom:GetModifierStatusResistanceStacking()
	return self.ability.talents.h1_status
end

function modifier_legion_commander_innate_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

function modifier_legion_commander_innate_custom:GetModifierBonusStats_Strength()
	local bonus = 1
	if
		self.parent:HasModifier("modifier_legion_commander_innate_custom_bonus")
		or self.parent:HasModifier("modifier_duel_hero_thinker")
	then
		bonus = self.ability.bonus
	end
	return self:GetStackCount() * self.ability.str * bonus
end

function modifier_legion_commander_innate_custom:GetMax()
	return self.ability.str_max + self.ability.talents.r3_str
end

modifier_legion_commander_innate_custom_bonus = class(mod_hidden)
function modifier_legion_commander_innate_custom_bonus:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:CalculateStatBonus(true)
end

function modifier_legion_commander_innate_custom_bonus:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

modifier_legion_commander_innate_custom_armor = class(mod_hidden)
function modifier_legion_commander_innate_custom_armor:OnCreated()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_legion_commander_innate_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_legion_commander_innate_custom_armor:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h1_armor
end