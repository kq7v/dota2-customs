--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("item_invis_sword_custom_surge", "abilities/items/item_invis_sword_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("item_invis_sword_custom_passive", "abilities/items/item_invis_sword_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"item_invis_sword_custom_damage_reduce",
	"abilities/items/item_invis_sword_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_invis_sword_custom = class({})

function item_invis_sword_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/silver_edge_speed_.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/silver_edge.vpcf", context)
end

function item_invis_sword_custom:GetIntrinsicModifierName()
	return "item_invis_sword_custom_passive"
end

function item_invis_sword_custom:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.damage_reduce_duration = self:GetSpecialValueFor("damage_reduce_duration")
	self.movement_speed = self:GetSpecialValueFor("movement_speed")
	self.windwalk_bonus_damage = self:GetSpecialValueFor("windwalk_bonus_damage")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.max_movement_speed = self:GetSpecialValueFor("max_movement_speed")
end

function item_invis_sword_custom:OnSpellStart()
	local caster = self:GetCaster()
	caster:EmitSound("DOTA_Item.InvisibilitySword.Activate")
	caster:AddNewModifier(caster, self, "item_invis_sword_custom_surge", { duration = self.duration })
end

item_invis_sword_custom_surge = class(mod_visible)
function item_invis_sword_custom_surge:GetEffectName()
	return "particles/items/silver_edge_speed_.vpcf"
end
function item_invis_sword_custom_surge:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.damage_reduce_duration
	self.speed = self.ability.movement_speed
	self.damage = self.ability.windwalk_bonus_damage

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true, property = true, any = true })
end

function item_invis_sword_custom_surge:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function item_invis_sword_custom_surge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
	}
end

function item_invis_sword_custom_surge:GetModifierMoveSpeedBonus_Percentage()
	return self.speed
end

function item_invis_sword_custom_surge:GetProcChance(params)
	if not params.target:IsRealHero() then
		return 0
	end
	return 100
end

function item_invis_sword_custom_surge:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	self.parent:LandProcs(params, true)
	if not self.parent:IsProc(self, params.record) then
		return
	end
	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"item_invis_sword_custom_damage_reduce",
		{ duration = self.duration }
	)
	self:Destroy()
	return self.damage
end

item_invis_sword_custom_passive = class(mod_hidden)
function item_invis_sword_custom_passive:RemoveOnDeath()
	return false
end
function item_invis_sword_custom_passive:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function item_invis_sword_custom_passive:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.bonus_damage
	self.speed = self.ability.bonus_attack_speed
	self.bonus_health = self.ability.bonus_health
end

function item_invis_sword_custom_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function item_invis_sword_custom_passive:GetModifierPreAttack_BonusDamage()
	return self.damage
end

function item_invis_sword_custom_passive:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function item_invis_sword_custom_passive:GetModifierHealthBonus()
	return self.bonus_health
end

item_invis_sword_custom_damage_reduce = class(mod_visible)
function item_invis_sword_custom_damage_reduce:GetEffectName()
	return "particles/items3_fx/silver_edge.vpcf"
end
function item_invis_sword_custom_damage_reduce:OnCreated(table)
	self.ability = self:GetAbility()

	self.max_movement_speed = self.ability.max_movement_speed
end

function item_invis_sword_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX,
	}
end

function item_invis_sword_custom_damage_reduce:GetModifierMoveSpeed_AbsoluteMax()
	return self.max_movement_speed
end