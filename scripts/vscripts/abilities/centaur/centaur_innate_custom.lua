--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_centaur_innate_custom",
	"abilities/centaur/centaur_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_centaur_innate_custom_shield_cd",
	"abilities/centaur/centaur_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_edge_4"
)

centaur_innate_custom = class({})
centaur_innate_custom.talents = {}

function centaur_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_centaur.vsndevts", context)
	PrecacheResource("particle", "particles/centaur/edge_shield.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_centaur", context)
end

function centaur_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w4 = 0,
			w4_duration = caster:GetTalentValue("modifier_centaur_edge_4", "duration", true),
			w4_resist = caster:GetTalentValue("modifier_centaur_edge_4", "resist", true),
			w4_talent_cd = caster:GetTalentValue("modifier_centaur_edge_4", "talent_cd", true),
			w4_max_shield = caster:GetTalentValue("modifier_centaur_edge_4", "max_shield", true) / 100,
			w4_shield = caster:GetTalentValue("modifier_centaur_edge_4", "shield", true) / 100,
			w4_health = caster:GetTalentValue("modifier_centaur_edge_4", "health", true),
		}
	end

	if caster:HasTalent("modifier_centaur_edge_4") then
		self.talents.has_w4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
		caster:AddLifesteal(
			self.tracker,
			{
				name = "modifier_centaur_edge_4",
				type = 1,
				heal = false,
				proc = "LifestealShield",
				value = self.talents.w4_shield,
			}
		)
	end
end

function centaur_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_centaur_innate_custom"
end

function centaur_innate_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if not self.tracker then
		return
	end
	if not self.caster:HasScepter() then
		return
	end

	self.tracker:ScepterInit()
end

modifier_centaur_innate_custom = class(mod_visible)
function modifier_centaur_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.move = self.ability:GetSpecialValueFor("move") / 100
	self.ability.move_max = self.ability:GetSpecialValueFor("move_max")
	self.ability.scepter_rate = self.ability:GetSpecialValueFor("scepter_rate")
	self.ability.scepter_str = self.ability:GetSpecialValueFor("scepter_str")

	if not IsServer() then
		return
	end
	self:ScepterInit()
end

function modifier_centaur_innate_custom:ScepterInit()
	if not IsServer() then
		return
	end
	if self.scepter_init then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if self.ability:IsStolen() then
		return
	end

	self.scepter_init = true
	self:StartIntervalThink(self.ability.scepter_rate)
end

function modifier_centaur_innate_custom:LifestealShield(params, shield)
	self:AddShield(shield)
end

function modifier_centaur_innate_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if params.attacker == params.unit then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.ability.talents.has_w4 == 0 then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.w4_health then
		return
	end
	if self.parent:HasModifier("modifier_centaur_innate_custom_shield_cd") then
		return
	end

	self.parent:EmitSound("Centaur.Edge_shield")
	self:AddShield(0, true)
	self.parent:AddNewModifier(
		self.parent,
		nil,
		"modifier_centaur_innate_custom_shield_cd",
		{ duration = self.ability.talents.w4_talent_cd }
	)
end

function modifier_centaur_innate_custom:AddShield(shield, max_shield)
	if not IsServer() then
		return
	end
	local add_shield = shield
	local max = self.parent:GetMaxHealth() * self.ability.talents.w4_max_shield
	if max_shield then
		add_shield = max
	end

	if not IsValid(self.shield_mod) then
		self.shield_mod = self.parent:AddNewModifier(self.parent, nil, "modifier_generic_shield", {
			duration = self.ability.talents.w4_duration,
			shield_talent = "modifier_centaur_edge_4",
			max_shield = max,
		})
		if self.shield_mod then
			self.parent:GenericParticle("particles/centaur/edge_shield.vpcf", self.shield_mod)
			self.shield_mod:SetFilterFunction(function(params)
				if params.attacker and params.attacker:GetTeamNumber() == self.parent:GetTeamNumber() then
					return false
				end
				return true
			end)
		end
	end

	if self.shield_mod then
		self.shield_mod:SetDuration(self.ability.talents.w4_duration, true)
		self.shield_mod:AddShield(add_shield, max)
	end
end

function modifier_centaur_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	self:IncrementStackCount()
	self.parent:CalculateStatBonus(true)
end

function modifier_centaur_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_centaur_innate_custom:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_resist
end

function modifier_centaur_innate_custom:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.ability.scepter_str
end

function modifier_centaur_innate_custom:GetModifierMoveSpeedBonus_Special_Boots()
	return self.ability.move * self.parent:GetStrength()
end

function modifier_centaur_innate_custom:GetModifierMoveSpeed_Max(params)
	if self.parent:HasModifier("modifier_centaur_stampede_custom") and self.parent:HasScepter() then
		return 999999
	end
	return self.ability.move_max
end

function modifier_centaur_innate_custom:GetModifierMoveSpeed_Limit(params)
	if self.parent:HasModifier("modifier_centaur_stampede_custom") and self.parent:HasScepter() then
		return 999999
	end
	return self.ability.move_max
end

function modifier_centaur_innate_custom:GetModifierIgnoreMovespeedLimit(params)
	return 1
end

modifier_centaur_innate_custom_shield_cd = class(mod_cd)
function modifier_centaur_innate_custom_shield_cd:GetTexture()
	return "buffs/centaur/hero_6"
end