--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_ethereal_blade_custom",
	"abilities/items/item_ethereal_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_ethereal_blade_custom_active_slow",
	"abilities/items/item_ethereal_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_ethereal_blade_custom = class({})
item_ethereal_blade_custom.start_index = 0
item_ethereal_blade_custom.end_index = 0
item_ethereal_blade_custom.damage_table = {}

function item_ethereal_blade_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/ethereal_blade.vpcf", context)
end

function item_ethereal_blade_custom:GetIntrinsicModifierName()
	return "modifier_item_ethereal_blade_custom"
end

function item_ethereal_blade_custom:Spawn()
	self.bonus_stats = self:GetSpecialValueFor("bonus_stats")
	self.cast_speed = self:GetSpecialValueFor("cast_speed")
	self.blast_movement_slow = self:GetSpecialValueFor("blast_movement_slow")
	self.duration = self:GetSpecialValueFor("duration")
	self.blast_stat_multiplier = self:GetSpecialValueFor("blast_stat_multiplier") / 100
	self.blast_damage_base = self:GetSpecialValueFor("blast_damage_base")
	self.duration_ally = self:GetSpecialValueFor("duration_ally")
	self.extra_spell_damage_percent = self:GetSpecialValueFor("extra_spell_damage_percent")
	self.enemy_cd = self:GetSpecialValueFor("enemy_cd") / 100
	self.projectile_speed = self:GetSpecialValueFor("projectile_speed")
end

function item_ethereal_blade_custom:OnSpellStart()
	local caster = self:GetCaster()
	local target = self:GetCursorTarget()
	caster:EmitSound("DOTA_Item.EtherealBlade.Activate")

	if target:GetTeamNumber() ~= caster:GetTeamNumber() then
		caster:CdAbility(self, nil, self.enemy_cd, "item_ethereal_blade_custom")
	end

	self.start_index = self.start_index + 1
	if self.start_index > 10 then
		self.start_index = 1
	end
	self.damage_table[self.start_index] = self.multicast_k or 1

	local info = {
		Target = target,
		Source = caster,
		Ability = self,
		EffectName = "particles/items_fx/ethereal_blade.vpcf",
		iMoveSpeed = self.projectile_speed,
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = 30,
		iVisionTeamNumber = caster:GetTeamNumber(),
	}
	ProjectileManager:CreateTrackingProjectile(info)
end

function item_ethereal_blade_custom:OnProjectileHit(target, vLocation)
	if not IsServer() then
		return
	end

	local damage_k = 1
	self.end_index = self.end_index + 1
	if self.end_index > 10 then
		self.end_index = 1
	end
	if self.damage_table[self.end_index] then
		damage_k = self.damage_table[self.end_index]
	end
	self.damage_table[self.end_index] = nil

	if not target then
		return
	end
	if target:IsInvulnerable() then
		return
	end
	if not IsValid(self) then
		return
	end
	if target:TriggerSpellAbsorb(self) then
		return
	end

	local caster = self:GetCaster()
	local duration = self.duration_ally
	if target:GetTeamNumber() ~= caster:GetTeamNumber() then
		duration = self.duration * (1 - target:GetStatusResistance())
		target:AddNewModifier(caster, self, "modifier_item_ethereal_blade_custom_active_slow", { duration = duration })
	end

	target:AddNewModifier(caster, self, "modifier_ghost_state", { duration = duration })
	target:EmitSound("DOTA_Item.EtherealBlade.Target")

	if target:GetTeamNumber() == caster:GetTeamNumber() then
		return
	end

	local damage = self.blast_damage_base
		+ self.blast_stat_multiplier * (caster:GetIntellect(false) + caster:GetStrength() + caster:GetAgility())
	DoDamage({
		victim = target,
		attacker = caster,
		ability = self,
		damage_type = DAMAGE_TYPE_MAGICAL,
		damage = damage * damage_k,
	})
end

modifier_item_ethereal_blade_custom_active_slow = class(mod_hidden)
function modifier_item_ethereal_blade_custom_active_slow:IsPurgable()
	return true
end
function modifier_item_ethereal_blade_custom_active_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.blast_movement_slow
end

function modifier_item_ethereal_blade_custom_active_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_ethereal_blade_custom_active_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_item_ethereal_blade_custom = class(mod_hidden)
function modifier_item_ethereal_blade_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_item_ethereal_blade_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
	}
end

function modifier_item_ethereal_blade_custom:GetModifierPercentageCasttime()
	return self.ability.cast_speed
end

function modifier_item_ethereal_blade_custom:GetModifierBonusStats_Agility()
	return self.ability.bonus_stats
end

function modifier_item_ethereal_blade_custom:GetModifierBonusStats_Strength()
	return self.ability.bonus_stats
end

function modifier_item_ethereal_blade_custom:GetModifierBonusStats_Intellect()
	return self.ability.bonus_stats
end