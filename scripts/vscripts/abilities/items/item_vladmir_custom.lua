--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_vladmir_custom", "abilities/items/item_vladmir_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_vladmir_custom_aura", "abilities/items/item_vladmir_custom", LUA_MODIFIER_MOTION_NONE)

item_vladmir_custom = class({})

function item_vladmir_custom:GetIntrinsicModifierName()
	return "modifier_item_vladmir_custom"
end

function item_vladmir_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/bristleback/armor_buff.vpcf", context)
end

function item_vladmir_custom:Spawn()
	self.armor = self:GetSpecialValueFor("armor")
	self.mana_regen = self:GetSpecialValueFor("mana_regen")
	self.armor_aura = self:GetSpecialValueFor("armor_aura")
	self.mana_regen_aura = self:GetSpecialValueFor("mana_regen_aura")
	self.lifesteal_aura = self:GetSpecialValueFor("lifesteal_aura") / 100
	self.damage_aura = self:GetSpecialValueFor("damage_aura")
	self.aura_radius = self:GetSpecialValueFor("aura_radius")
end

modifier_item_vladmir_custom = class(mod_hidden)
function modifier_item_vladmir_custom:RemoveOnDeath()
	return false
end
function modifier_item_vladmir_custom:GetAuraRadius()
	return self.ability.aura_radius
end
function modifier_item_vladmir_custom:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_item_vladmir_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_item_vladmir_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_item_vladmir_custom:GetModifierAura()
	return "modifier_item_vladmir_custom_aura"
end
function modifier_item_vladmir_custom:IsAura()
	return not self.parent:HasModifier("modifier_item_wraith_aura_custom")
end
function modifier_item_vladmir_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_item_vladmir_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_item_vladmir_custom:GetModifierPhysicalArmorBonus()
	return self.ability.armor
end

function modifier_item_vladmir_custom:GetModifierConstantManaRegen()
	return self.ability.mana_regen
end

modifier_item_vladmir_custom_aura = class(mod_visible)
function modifier_item_vladmir_custom_aura:OnCreated()
	self.caster = self:GetCaster()
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

function modifier_item_vladmir_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASEDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_item_vladmir_custom_aura:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_item_vladmir_custom_aura:GetModifierConstantManaRegen()
	return self.mana
end

function modifier_item_vladmir_custom_aura:GetModifierBaseDamageOutgoing_Percentage()
	return self.damage
end