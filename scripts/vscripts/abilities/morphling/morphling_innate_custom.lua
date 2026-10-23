--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_morphling_innate_custom",
	"abilities/morphling/morphling_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	false
)
LinkLuaModifier(
	"modifier_morphling_innate_custom_buff",
	"abilities/morphling/morphling_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_innate_custom_slow",
	"abilities/morphling/morphling_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_morphling_hero_1"
)

morphling_innate_custom = class({})
morphling_innate_custom.talents = {}

function morphling_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("soundfile", "soundevents/vo_custom/morphling_vo_custom.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_morphling.vsndevts", context)
end

function morphling_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_h1 = 0,
			h1_slow = 0,
			h1_heal_reduce = 0,
			h1_duration = caster:GetTalentValue("modifier_morphling_hero_1", "duration", true),

			has_h2 = 0,
			h2_mana = 0,
			h2_speed = 0,

			has_h5 = 0,
			h5_str = caster:GetTalentValue("modifier_morphling_hero_5", "str", true),
			h5_int = caster:GetTalentValue("modifier_morphling_hero_5", "int", true),
			h5_max = caster:GetTalentValue("modifier_morphling_hero_5", "max", true),

			has_h6 = 0,
			h6_agi = caster:GetTalentValue("modifier_morphling_hero_6", "agi", true),
			h6_max_move_real = caster:GetTalentValue("modifier_morphling_hero_6", "max_move_real", true),
			h6_str = caster:GetTalentValue("modifier_morphling_hero_6", "str", true),
		}
	end

	if caster:HasTalent("modifier_morphling_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_morphling_hero_5") then
		self.talents.has_h5 = 1
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_morphling_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_slow = caster:GetTalentValue("modifier_morphling_hero_1", "slow")
		self.talents.h1_heal_reduce = caster:GetTalentValue("modifier_morphling_hero_1", "heal_reduce")
		caster:AddDamageEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_morphling_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_speed = caster:GetTalentValue("modifier_morphling_hero_2", "speed")
		self.talents.h2_mana = caster:GetTalentValue("modifier_morphling_hero_2", "mana")
	end
end

function morphling_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_morphling_innate_custom"
end

modifier_morphling_innate_custom = class(mod_hidden)
function modifier_morphling_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.bonus_stat = self.ability:GetSpecialValueFor("bonus_stat")
	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.radius = 700
	self.parent:AddDeathEvent(self, true)
end

function modifier_morphling_innate_custom:Proc()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_morphling_innate_custom_buff", {})
end

function modifier_morphling_innate_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h1 == 0 then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.inflictor and params.inflictor:IsItem() then
		return
	end

	local unit = params.unit
	if not unit:IsUnit() then
		return
	end

	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_morphling_innate_custom_slow",
		{ duration = self.ability.talents.h1_duration }
	)
end

function modifier_morphling_innate_custom:DeathEvent(params)
	if not IsServer() then
		return
	end
	local target = params.unit
	if self.parent:GetTeamNumber() == target:GetTeamNumber() then
		return
	end

	if
		target:IsValidKill(self.parent)
		and self.parent:IsAlive()
		and (self.parent == params.attacker or (self.parent:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() <= self.radius)
		and self:GetStackCount() < self.ability.max
	then
		dota1x6:CreateUpgradeOrb(self.parent, 1)
		self:IncrementStackCount()
		if self:GetStackCount() >= self.ability.max then
			self.parent:GenericParticle("particles/patrol/rare_orb_patrol.vpcf")
			self.parent:EmitSound("BS.Thirst_legendary_active")
		end
	end
end

function modifier_morphling_innate_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_morphling_innate_custom_buff")
end

function modifier_morphling_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
	}
end

function modifier_morphling_innate_custom:GetModifierPercentageCasttime()
	return self.ability.talents.h2_speed
end

function modifier_morphling_innate_custom:GetModifierPercentageManacostStacking()
	return self.ability.talents.h2_mana
end

function modifier_morphling_innate_custom:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.parent:GetAgility() / self.ability.talents.h6_agi
end

function modifier_morphling_innate_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.parent:GetStrength() / self.ability.talents.h6_str
end

function modifier_morphling_innate_custom:GetModifierIgnoreMovespeedLimit()
	if self.ability.talents.has_h6 == 0 then
		return 0
	end
	return 1
end

function modifier_morphling_innate_custom:GetModifierMoveSpeed_Max()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_max_move_real
end

function modifier_morphling_innate_custom:GetModifierMoveSpeed_Limit()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_max_move_real
end

modifier_morphling_innate_custom_buff = class(mod_visible)
function modifier_morphling_innate_custom_buff:RemoveOnDeath()
	return false
end
function modifier_morphling_innate_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.StackOnIllusion = true
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_morphling_innate_custom_buff:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self.parent:IsIllusion() then
		return
	end

	self.parent:SetBaseAgility(math.max(0, self.parent:GetBaseAgility() + self.ability.bonus_stat))
	self.parent:CalculateStatBonus(true)

	if self.parent.agi_ability then
		self.parent.agi_ability:SendJs()
	end
end

function modifier_morphling_innate_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_TOOLTIP2,
	}
end

function modifier_morphling_innate_custom_buff:GetModifierBonusStats_Strength()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return math.min(self:GetStackCount(), self.ability.talents.h5_max) * self.ability.talents.h5_str
end

function modifier_morphling_innate_custom_buff:GetModifierBonusStats_Intellect()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return math.min(self:GetStackCount(), self.ability.talents.h5_max) * self.ability.talents.h5_int
end

function modifier_morphling_innate_custom_buff:OnTooltip()
	return self:GetStackCount() * self.ability.bonus_stat
end

function modifier_morphling_innate_custom_buff:OnTooltip2()
	return self.parent:GetUpgradeStack("modifier_morphling_innate_custom")
end

modifier_morphling_innate_custom_slow = class(mod_hidden)
function modifier_morphling_innate_custom_slow:IsPurgable()
	return true
end
function modifier_morphling_innate_custom_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_morphling_innate_custom_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_morphling_innate_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.h1_slow
	self.heal_reduce = self.ability.talents.h1_heal_reduce
end

function modifier_morphling_innate_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_morphling_innate_custom_slow:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_morphling_innate_custom_slow:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

function modifier_morphling_innate_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end