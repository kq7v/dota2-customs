--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_abaddon_font_of_avernus_custom",
	"abilities/abaddon/abaddon_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_font_of_avernus_custom_heal_reduce",
	"abilities/abaddon/abaddon_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_abaddon_font_of_avernus_custom_regen",
	"abilities/abaddon/abaddon_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_hero_3"
)

abaddon_innate_custom = class({})
abaddon_innate_custom.talents = {}

function abaddon_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_withering_mist_debuff.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_abaddon.vsndevts", context)

	dota1x6:PrecacheShopItems("npc_dota_hero_abaddon", context)
end

function abaddon_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			h1_move = 0,

			has_h3 = 0,
			h3_heal = 0,
			h3_cdr = 0,
			h3_duration = caster:GetTalentValue("modifier_abaddon_hero_3", "duration", true),
		}
	end

	if caster:HasTalent("modifier_abaddon_hero_1") then
		self.talents.h1_move = caster:GetTalentValue("modifier_abaddon_hero_1", "move")
	end

	if caster:HasTalent("modifier_abaddon_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_cdr = caster:GetTalentValue("modifier_abaddon_hero_3", "cdr")
		self.talents.h3_heal = caster:GetTalentValue("modifier_abaddon_hero_3", "heal")
		caster:AddSpellEvent(self.tracker, true)
	end
end

function abaddon_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_abaddon_font_of_avernus_custom"
end

modifier_abaddon_font_of_avernus_custom = class(mod_hidden)
function modifier_abaddon_font_of_avernus_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.health = self.ability:GetSpecialValueFor("health")
	self.ability.heal_reduce = self.ability:GetSpecialValueFor("heal_reduce")
	self.ability.damage_reduction = self.ability:GetSpecialValueFor("damage_reduction")

	if not IsServer() then
		return
	end
	self.parent:AddDamageEvent_out(self, true)
end

function modifier_abaddon_font_of_avernus_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if self.ability.talents.has_h3 == 0 then
		return
	end
	if params.ability:IsItem() then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_abaddon_font_of_avernus_custom_regen",
		{ duration = self.ability.talents.h3_duration }
	)
end

function modifier_abaddon_font_of_avernus_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	local unit = params.unit

	if not unit:IsUnit() then
		return
	end
	if self.parent:GetTeamNumber() == unit:GetTeamNumber() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if unit:GetHealthPercent() > self.ability.health then
		return
	end
	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_abaddon_font_of_avernus_custom_heal_reduce",
		{ duration = self.ability.duration }
	)
end

function modifier_abaddon_font_of_avernus_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_abaddon_font_of_avernus_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h1_move
end

function modifier_abaddon_font_of_avernus_custom:GetModifierPercentageCooldown()
	return self.ability.talents.h3_cdr
end

modifier_abaddon_font_of_avernus_custom_heal_reduce = class(mod_hidden)
function modifier_abaddon_font_of_avernus_custom_heal_reduce:IsPurgable()
	return true
end
function modifier_abaddon_font_of_avernus_custom_heal_reduce:GetEffectName()
	return "particles/units/heroes/hero_abaddon/abaddon_withering_mist_debuff.vpcf"
end
function modifier_abaddon_font_of_avernus_custom_heal_reduce:OnCreated()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.heal_reduce
	self.damage_reduction = self.ability.damage_reduction
end

function modifier_abaddon_font_of_avernus_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_abaddon_font_of_avernus_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_abaddon_font_of_avernus_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

function modifier_abaddon_font_of_avernus_custom_heal_reduce:GetModifierSpellAmplify_Percentage()
	return self.damage_reduction
end

function modifier_abaddon_font_of_avernus_custom_heal_reduce:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduction
end

modifier_abaddon_font_of_avernus_custom_regen = class(mod_visible)
function modifier_abaddon_font_of_avernus_custom_regen:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.talents.h3_duration
	self.regen = self.ability.talents.h3_heal / self.duration
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_abaddon_font_of_avernus_custom_regen:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)
end

function modifier_abaddon_font_of_avernus_custom_regen:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_abaddon_font_of_avernus_custom_regen:GetModifierConstantHealthRegen()
	return self:GetStackCount() * self.regen
end