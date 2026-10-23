--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_bloodstone_custom", "abilities/items/item_bloodstone_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_bloodstone_custom_buff",
	"abilities/items/item_bloodstone_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_bloodstone_custom_damage_inc",
	"abilities/items/item_bloodstone_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_bloodstone_custom = class({})

function item_bloodstone_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/bloodstone_heal.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/veil_of_discord_debuff.vpcf", context)
end

function item_bloodstone_custom:Spawn()
	self.buff_duration = self:GetSpecialValueFor("buff_duration")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.bonus_mana = self:GetSpecialValueFor("bonus_mana")
	self.spell_lifesteal = self:GetSpecialValueFor("spell_lifesteal") / 100
	self.bonus_int = self:GetSpecialValueFor("bonus_int")
	self.lifesteal_active = self:GetSpecialValueFor("lifesteal_active") / 100
	self.spell_amp = self:GetSpecialValueFor("spell_amp")
	self.aura_radius = self:GetSpecialValueFor("aura_radius")
end

function item_bloodstone_custom:OnSpellStart()
	local caster = self:GetCaster()
	caster:EmitSound("DOTA_Item.Bloodstone.Cast")

	local duration = self.buff_duration
	caster:AddNewModifier(caster, self, "modifier_item_bloodstone_custom_buff", { duration = duration })
end

function item_bloodstone_custom:GetIntrinsicModifierName()
	return "modifier_item_bloodstone_custom"
end

modifier_item_bloodstone_custom = class(mod_hidden)
function modifier_item_bloodstone_custom:GetAuraRadius()
	return self.ability.aura_radius
end
function modifier_item_bloodstone_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_item_bloodstone_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_bloodstone_custom:GetModifierAura()
	return "modifier_item_bloodstone_custom_damage_inc"
end
function modifier_item_bloodstone_custom:IsAura()
	return true
end
function modifier_item_bloodstone_custom:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.lifesteal = self.ability.spell_lifesteal
	self.lifesteal_active = self.ability.lifesteal_active

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, {
		type = 1,
		value = function(params)
			if params.unit and (params.unit:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > 2000 then
				return 0
			end
			if self.parent:HasModifier("modifier_item_bloodstone_custom_buff") then
				return self.lifesteal_active, nil, true
			end
			return self.lifesteal
		end,
	})
end

function modifier_item_bloodstone_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_MANA_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_item_bloodstone_custom:GetModifierHealthBonus()
	return self.ability.bonus_health
end

function modifier_item_bloodstone_custom:GetModifierManaBonus()
	return self.ability.bonus_mana
end

function modifier_item_bloodstone_custom:GetModifierBonusStats_Intellect()
	return self.ability.bonus_int
end

modifier_item_bloodstone_custom_buff = class(mod_visible)
function modifier_item_bloodstone_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	local particle =
		ParticleManager:CreateParticle("particles/items_fx/bloodstone_heal.vpcf", PATTACH_OVERHEAD_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
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
	ParticleManager:SetParticleControlEnt(
		particle,
		6,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(particle, false, false, -1, false, false)
end

modifier_item_bloodstone_custom_damage_inc = class(mod_visible)
function modifier_item_bloodstone_custom_damage_inc:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.damage = self.ability.spell_amp
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items2_fx/veil_of_discord_debuff.vpcf", self)
end

function modifier_item_bloodstone_custom_damage_inc:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_item_bloodstone_custom_damage_inc:GetModifierIncomingDamage_Percentage(params)
	if IsServer() and (not params.inflictor or Not_spell_damage[params.inflictor:GetName()]) then
		return
	end
	return self.damage
end