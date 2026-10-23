--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_wraith_aura_custom", "abilities/items/item_wraith_aura_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_wraith_aura_custom_aura",
	"abilities/items/item_wraith_aura_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_wraith_aura_custom_active",
	"abilities/items/item_wraith_aura_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_wraith_aura_custom_active_aura",
	"abilities/items/item_wraith_aura_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_wraith_aura_custom = class({})
function item_wraith_aura_custom:GetIntrinsicModifierName()
	return "modifier_item_wraith_aura_custom"
end

function item_wraith_aura_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/wraith_king_vampiric_aura_lifesteal.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items/wraith_pact_head.vpcf", context)
	PrecacheResource("particle", "particles/items/wraith_pact_active.vpcf", context)
	PrecacheResource("particle", "particles/centaur/return_legendary_pulses.vpcf", context)
	PrecacheResource("particle", "particles/items/wraith_pact_shield.vpcf", context)
end

function item_wraith_aura_custom:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.damage_reduce = self:GetSpecialValueFor("damage_reduce")
	self.caster_heal = self:GetSpecialValueFor("caster_heal") / 100
	self.armor_aura = self:GetSpecialValueFor("armor_aura")
	self.mana_regen_aura = self:GetSpecialValueFor("mana_regen_aura")
	self.lifesteal_aura = self:GetSpecialValueFor("lifesteal_aura") / 100
	self.damage_aura = self:GetSpecialValueFor("damage_aura")
	self.aura_radius = self:GetSpecialValueFor("aura_radius")
	self.all_stats = self:GetSpecialValueFor("all_stats")
end

function item_wraith_aura_custom:OnSpellStart()
	local caster = self:GetCaster()

	caster:AddNewModifier(caster, self, "modifier_item_wraith_aura_custom_active", { duration = self.duration })
end

modifier_item_wraith_aura_custom_active = class(mod_visible)
function modifier_item_wraith_aura_custom_active:GetAuraRadius()
	return self.ability.aura_radius
end
function modifier_item_wraith_aura_custom_active:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
end
function modifier_item_wraith_aura_custom_active:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_item_wraith_aura_custom_active:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_wraith_aura_custom_active:GetModifierAura()
	return "modifier_item_wraith_aura_custom_active_aura"
end
function modifier_item_wraith_aura_custom_active:IsAura()
	return true
end
function modifier_item_wraith_aura_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.heal = self.ability.caster_heal
	self.parent:GenericParticle("particles/items/wraith_pact_head.vpcf", self, true)
	self.parent:GenericParticle("particles/items/wraith_pact_active.vpcf", self)
	self.parent:EmitSound("Items.Wraith_pact_active")
	self.parent:EmitSound("Items.Wraith_pact_active2")

	local effect_cast = ParticleManager:CreateParticle(
		"particles/centaur/return_legendary_pulses.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		nil,
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(
		effect_cast,
		1,
		Vector(self.ability.aura_radius, self.ability.aura_radius, self.ability.aura_radius)
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_item_wraith_aura_custom_active:GetAuraEntityReject(hEntity)
	return not hEntity.owner or hEntity.owner ~= self.parent
end

modifier_item_wraith_aura_custom_active_aura = class(mod_hidden)
function modifier_item_wraith_aura_custom_active_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.damage_reduce
	if not IsServer() then
		return
	end

	local effect_cast = ParticleManager:CreateParticle(
		"particles/items/wraith_pact_shield.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self.parent:AddLifesteal(self, {
		type = 2,
		heal_unit = self.caster,
		illusion = true,
		effect = false,
		proc = "LifestealParticle",
		value = function()
			return self.parent:HasModifier("modifier_item_wraith_aura_custom_aura") and self.ability.caster_heal or 0
		end,
	})
end

function modifier_item_wraith_aura_custom_active_aura:LifestealParticle(params, heal)
	if not IsServer() then
		return
	end
	local effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_skeletonking/wraith_king_vampiric_aura_lifesteal.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_item_wraith_aura_custom_active_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_item_wraith_aura_custom_active_aura:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end

modifier_item_wraith_aura_custom = class(mod_hidden)
function modifier_item_wraith_aura_custom:RemoveOnDeath()
	return false
end
function modifier_item_wraith_aura_custom:GetAuraRadius()
	return self.ability.aura_radius
end
function modifier_item_wraith_aura_custom:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_item_wraith_aura_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_item_wraith_aura_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_wraith_aura_custom:GetModifierAura()
	return "modifier_item_wraith_aura_custom_aura"
end
function modifier_item_wraith_aura_custom:IsAura()
	return IsServer()
		and IsValid(self.parent)
		and self.parent:IsAlive()
		and self.parent:IsRealHero()
		and not self.parent:IsTempestDouble()
end
function modifier_item_wraith_aura_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_item_wraith_aura_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_item_wraith_aura_custom:GetModifierBonusStats_Strength()
	return self.ability.all_stats
end

function modifier_item_wraith_aura_custom:GetModifierBonusStats_Agility()
	return self.ability.all_stats
end

function modifier_item_wraith_aura_custom:GetModifierBonusStats_Intellect()
	return self.ability.all_stats
end

modifier_item_wraith_aura_custom_aura = class(mod_visible)
function modifier_item_wraith_aura_custom_aura:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.damage = self.ability.damage_aura
	self.armor = self.ability.armor_aura
	self.mana = self.ability.mana_regen_aura
	self.heal = self.ability.lifesteal_aura

	if not IsServer() then
		return
	end
	self.parent:AddLifesteal(self, { type = 2, value = self.heal, illusion = true })
end

function modifier_item_wraith_aura_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_item_wraith_aura_custom_aura:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_item_wraith_aura_custom_aura:GetModifierConstantManaRegen()
	return self.mana
end

function modifier_item_wraith_aura_custom_aura:GetModifierBaseDamageOutgoing_Percentage()
	return self.damage
end