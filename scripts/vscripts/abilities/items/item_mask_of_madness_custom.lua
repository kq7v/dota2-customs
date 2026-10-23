--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_mask_of_madness_custom",
	"abilities/items/item_mask_of_madness_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_mask_of_madness_custom_speed",
	"abilities/items/item_mask_of_madness_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_mask_of_madness_custom = class({})

function item_mask_of_madness_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items2_fx/mask_of_madness.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_monkey_king_spring_slow.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/drow/drow_head_mania/mask_of_madness_mania.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/drow/drow_head_mania/mask_of_madness_active_mania.vpcf", context)
end

function item_mask_of_madness_custom:Spawn()
	self.bonus_speed = self:GetSpecialValueFor("bonus_speed")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.lifesteal_percent = self:GetSpecialValueFor("lifesteal_percent") / 100
	self.berserk_bonus_attack_speed = self:GetSpecialValueFor("berserk_bonus_attack_speed")
	self.berserk_bonus_movement_speed = self:GetSpecialValueFor("berserk_bonus_movement_speed")
	self.incoming_damage = self:GetSpecialValueFor("incoming_damage")
	self.berserk_duration = self:GetSpecialValueFor("berserk_duration")
	self.slow_resist = self:GetSpecialValueFor("slow_resist")
end

function item_mask_of_madness_custom:GetAbilityTextureName()
	if not self or not self:GetCaster() then
		return
	end
	if self:GetCaster():HasModifier("modifier_item_mask_of_madness_custom_speed") then
		return "items/mask_of_madness_active"
	end
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "item_mask_of_madness", self)
end

function item_mask_of_madness_custom:GetIntrinsicModifierName()
	return "modifier_item_mask_of_madness_custom"
end

function item_mask_of_madness_custom:OnSpellStart()
	local parent = self:GetParent()
	parent:EmitSound("DOTA_Item.MaskOfMadness.Activate")
	parent:AddNewModifier(
		parent,
		self,
		"modifier_item_mask_of_madness_custom_speed",
		{ duration = self.berserk_duration }
	)
end

modifier_item_mask_of_madness_custom = class(mod_hidden)
function modifier_item_mask_of_madness_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_item_mask_of_madness_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { type = 2, value = self.ability.lifesteal_percent })
end

function modifier_item_mask_of_madness_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_mask_of_madness_custom:GetModifierHealthBonus()
	return self.ability.bonus_health
end

function modifier_item_mask_of_madness_custom:GetModifierAttackSpeedBonus_Constant()
	return self.ability.bonus_speed
end

modifier_item_mask_of_madness_custom_speed = class(mod_visible)
function modifier_item_mask_of_madness_custom_speed:IsPurgable()
	return true
end
function modifier_item_mask_of_madness_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.incoming_damage = self.ability.incoming_damage
	self.attack_speed = self.ability.berserk_bonus_attack_speed
	self.movement_speed = self.ability.berserk_bonus_movement_speed
	self.slow_resist = self.ability.slow_resist

	if not IsServer() then
		return
	end

	local default_particle =
		wearables_system:GetParticleReplacementAbility(self.caster, "particles/items2_fx/mask_of_madness.vpcf", self)
	if default_particle == "particles/econ/items/drow/drow_head_mania/mask_of_madness_mania.vpcf" then
		local new_particle = ParticleManager:CreateParticle(
			"particles/econ/items/drow/drow_head_mania/mask_of_madness_active_mania.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			new_particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_mom_l",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			new_particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_mom_r",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(new_particle, false, false, -1, false, false)
	end

	self.parent:GenericParticle(default_particle, self)
end

function modifier_item_mask_of_madness_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_item_mask_of_madness_custom_speed:GetModifierIncomingDamage_Percentage()
	return self.incoming_damage
end

function modifier_item_mask_of_madness_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.attack_speed
end

function modifier_item_mask_of_madness_custom_speed:GetModifierMoveSpeedBonus_Constant()
	return self.movement_speed
end

function modifier_item_mask_of_madness_custom_speed:GetModifierSlowResistance_Stacking()
	return self.slow_resist
end