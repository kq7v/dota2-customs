--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("item_silver_edge_custom_surge", "abilities/items/item_silver_edge_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("item_silver_edge_custom_passive", "abilities/items/item_silver_edge_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("item_silver_edge_custom_break", "abilities/items/item_silver_edge_custom", LUA_MODIFIER_MOTION_NONE)

item_silver_edge_custom = class({})

function item_silver_edge_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/silver_edge_speed_.vpcf", context)
	PrecacheResource("particle", "particles/items/silver_edge_sword.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/silver_edge.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_break.vpcf", context)
end

function item_silver_edge_custom:GetIntrinsicModifierName()
	return "item_silver_edge_custom_passive"
end

function item_silver_edge_custom:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.movement_speed = self:GetSpecialValueFor("movement_speed")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.backstab_duration = self:GetSpecialValueFor("backstab_duration")
	self.windwalk_bonus_damage = self:GetSpecialValueFor("windwalk_bonus_damage")
	self.max_movement_speed = self:GetSpecialValueFor("max_movement_speed")
end

function item_silver_edge_custom:OnSpellStart()
	local caster = self:GetCaster()
	caster:EmitSound("DOTA_Item.InvisibilitySword.Activate")
	caster:AddNewModifier(caster, self, "item_silver_edge_custom_surge", { duration = self.duration })
end

item_silver_edge_custom_surge = class(mod_visible)
function item_silver_edge_custom_surge:GetEffectName()
	return "particles/items/silver_edge_speed_.vpcf"
end
function item_silver_edge_custom_surge:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.movement_speed

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items/silver_edge_sword.vpcf", self, true)
	self.ability.surge = self
	self.parent:AddProc(self, { once = true })
end

function item_silver_edge_custom_surge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function item_silver_edge_custom_surge:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function item_silver_edge_custom_surge:GetProcChance(params)
	if not params.target:IsRealHero() then
		return 0
	end
	return 100
end

function item_silver_edge_custom_surge:AttackProcStart(params)
	self:Destroy()
end

function item_silver_edge_custom_surge:GetModifierMoveSpeedBonus_Percentage()
	return self.speed
end

item_silver_edge_custom_passive = class(mod_hidden)
function item_silver_edge_custom_passive:RemoveOnDeath()
	return false
end
function item_silver_edge_custom_passive:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.damage = self.ability.bonus_damage
	self.speed = self.ability.bonus_attack_speed
	self.bonus_health = self.ability.bonus_health

	self.break_duration = self.ability.backstab_duration
	self.break_damage = self.ability.windwalk_bonus_damage
end

function item_silver_edge_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
	}
end

function item_silver_edge_custom_passive:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function item_silver_edge_custom_passive:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function item_silver_edge_custom_passive:GetModifierHealthBonus()
	return self.bonus_health
end

function item_silver_edge_custom_passive:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	if not self.parent:IsProc(self.ability.surge, params.record) then
		return
	end
	local target = params.target

	target:EmitSound("DOTA_Item.SilverEdge.Target")
	target:AddNewModifier(
		self.parent,
		self.ability,
		"item_silver_edge_custom_break",
		{ duration = (1 - target:GetStatusResistance()) * self.break_duration }
	)

	return self.break_damage
end

item_silver_edge_custom_break = class(mod_visible)
function item_silver_edge_custom_break:GetEffectName()
	return "particles/items3_fx/silver_edge.vpcf"
end
function item_silver_edge_custom_break:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max_movement_speed = self.ability.max_movement_speed
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic_gameplay/generic_break.vpcf", self, true)
end

function item_silver_edge_custom_break:CheckState()
	return {
		[MODIFIER_STATE_PASSIVES_DISABLED] = true,
	}
end

function item_silver_edge_custom_break:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX,
	}
end

function item_silver_edge_custom_break:GetModifierMoveSpeed_AbsoluteMax()
	return self.max_movement_speed
end