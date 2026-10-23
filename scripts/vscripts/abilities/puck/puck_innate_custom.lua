--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_puck_innate_custom", "abilities/puck/puck_innate_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_puck_innate_custom_heal_reduce",
	"abilities/puck/puck_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_hero_3"
)
LinkLuaModifier(
	"modifier_puck_innate_custom_move",
	"abilities/puck/puck_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_puck_hero_4"
)

puck_innate_custom = class({})
puck_innate_custom.talents = {}

function puck_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_keeper_of_the_light/keeper_chakra_magic.vpcf", context)
	PrecacheResource("particle", "particles/puck/puck_orb_speed.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_puck.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_puck", context)
end

function puck_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			h1_cdr = 0,
			h1_regen = 0,

			h2_status = 0,

			has_h3 = 0,
			h3_heal_reduce = 0,
			h3_effect_duration = caster:GetTalentValue("modifier_puck_hero_3", "effect_duration", true),

			has_h4 = 0,
			h4_move = caster:GetTalentValue("modifier_puck_hero_4", "move", true),
			h4_duration = caster:GetTalentValue("modifier_puck_hero_4", "duration", true),
		}
	end

	if caster:HasTalent("modifier_puck_hero_1") then
		self.talents.h1_cdr = caster:GetTalentValue("modifier_puck_hero_1", "cdr")
		self.talents.h1_regen = caster:GetTalentValue("modifier_puck_hero_1", "regen") / 100
	end

	if caster:HasTalent("modifier_puck_hero_2") then
		self.talents.h2_status = caster:GetTalentValue("modifier_puck_hero_2", "status")
	end

	if caster:HasTalent("modifier_puck_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_heal_reduce = caster:GetTalentValue("modifier_puck_hero_3", "heal_reduce")
	end

	if caster:HasTalent("modifier_puck_hero_4") then
		self.talents.has_h4 = 1
	end
end

function puck_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_puck_innate_custom"
end

function puck_innate_custom:ProcSpeed()
	if not self:IsTrained() then
		return
	end
	if self.talents.has_h4 == 0 then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_puck_innate_custom_move",
		{ duration = self.talents.h4_duration }
	)
end

function puck_innate_custom:ProcHealReduce(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_h3 == 0 then
		return
	end
	if not target:IsRealHero() then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_puck_innate_custom_heal_reduce",
		{ duration = self.talents.h3_effect_duration }
	)
end

modifier_puck_innate_custom = class(mod_hidden)
function modifier_puck_innate_custom:RemoveOnDeath()
	return false
end
function modifier_puck_innate_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.innate_ability = self.ability

	self.chance = self.ability:GetSpecialValueFor("chance")
	self.mana = self.ability:GetSpecialValueFor("mana")
	self.mana_max = self.ability:GetSpecialValueFor("mana_max") / 100
	self.heal = self.ability:GetSpecialValueFor("heal")
	self.heal_max = self.ability:GetSpecialValueFor("heal_max") / 100

	if not IsServer() then
		return
	end
	self.parent:AddSpellEvent(self, true)
end

function modifier_puck_innate_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if params.ability ~= self.parent.shift_ability and params.ability ~= self.parent.rift_ability then
		self.ability:ProcSpeed()
	end

	if self.parent:PassivesDisabled() then
		return
	end
	if not RollPseudoRandomPercentage(self.chance, 1223, self.parent) then
		return
	end

	local bonus = 1 + self.ability.talents.h1_regen
	local mana = (self.mana + self.mana_max * self.parent:GetMaxMana()) * bonus
	local heal = (self.heal + self.heal_max * self.parent:GetMaxHealth()) * bonus

	self.parent:GenericParticle(
		"particles/units/heroes/hero_keeper_of_the_light/keeper_chakra_magic.vpcf",
		nil,
		false,
		{ 1 }
	)
	self.parent:EmitSound("Puck.Rift_Mana")

	self.parent:GenericHeal(heal, self.ability)
	self.parent:GiveMana(mana)
	self.parent:SendNumber(OVERHEAD_ALERT_MANA_ADD, mana)
end

function modifier_puck_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_puck_innate_custom:GetModifierPercentageCooldown()
	return self.ability.talents.h1_cdr
end

function modifier_puck_innate_custom:GetModifierIgnoreCastAngle()
	return self.ability.talents.has_h4 == 1 and 1 or 0
end

function modifier_puck_innate_custom:GetModifierPercentageCasttime()
	return self.ability.talents.has_h4 == 1 and 100 or 0
end

function modifier_puck_innate_custom:GetModifierStatusResistanceStacking()
	return self.ability.talents.h2_status
end

modifier_puck_innate_custom_move = class(mod_hidden)
function modifier_puck_innate_custom_move:GetEffectName()
	return "particles/puck/puck_orb_speed.vpcf"
end
function modifier_puck_innate_custom_move:OnCreated()
	self.ability = self:GetAbility()
	self.move = self.ability.talents.h4_move
end

function modifier_puck_innate_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_puck_innate_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_puck_innate_custom_move:GetModifierSlowResistance_Stacking()
	return self:GetModifierMoveSpeedBonus_Percentage()
end

modifier_puck_innate_custom_heal_reduce = class(mod_hidden)
function modifier_puck_innate_custom_heal_reduce:OnCreated()
	self.ability = self:GetAbility()
	self.heal_reduce = self.ability.talents.h3_heal_reduce

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
end

function modifier_puck_innate_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_puck_innate_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_puck_innate_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end