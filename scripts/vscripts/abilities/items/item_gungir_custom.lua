--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_gungir_custom", "abilities/items/item_gungir_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_gungir_custom_root", "abilities/items/item_gungir_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_item_gungir_custom_speed", "abilities/items/item_gungir_custom", LUA_MODIFIER_MOTION_NONE)

item_gungir_custom = class({})

function item_gungir_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items3_fx/gleipnir_root.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/gleipnir_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_techies/techies_tazer.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_mjollnir_shield.vpcf", context)
end

function item_gungir_custom:GetIntrinsicModifierName()
	return "modifier_item_gungir_custom"
end

function item_gungir_custom:Spawn()
	self.radius = self:GetSpecialValueFor("radius")
	self.duration = self:GetSpecialValueFor("duration")
	self.ticks = self:GetSpecialValueFor("ticks")
	self.damage = self:GetSpecialValueFor("damage")
	self.projectile_speed = self:GetSpecialValueFor("projectile_speed")
	self.bonus_hp = self:GetSpecialValueFor("bonus_hp")
	self.bonus_intellect = self:GetSpecialValueFor("bonus_intellect")
	self.bonus_mana = self:GetSpecialValueFor("bonus_mana")
	self.cast_speed = self:GetSpecialValueFor("cast_speed")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.item_damage = self:GetSpecialValueFor("item_damage")
	self.movespeed = self:GetSpecialValueFor("movespeed")
end

function item_gungir_custom:GetAOERadius()
	return self.radius
end

function item_gungir_custom:OnSpellStart()
	local caster = self:GetCaster()
	caster:EmitSound("Item.Gleipnir.Cast")
	local aoe = self.radius
	local point = self:GetCursorPosition()

	local info = {
		Source = caster,
		Ability = self,
		EffectName = "particles/items3_fx/gleipnir_projectile.vpcf",
		iMoveSpeed = self.projectile_speed,
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = 30,
		iVisionTeamNumber = caster:GetTeamNumber(),
	}

	for _, target in pairs(caster:FindTargets(aoe, point)) do
		info.Target = target
		ProjectileManager:CreateTrackingProjectile(info)
	end

	local duration = self.duration
	AddFOWViewer(caster:GetTeamNumber(), point, aoe, duration * 2, false)
end

function item_gungir_custom:OnProjectileHit(target, vLocation)
	if target == nil then
		return
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local caster = self:GetCaster()
	target:EmitSound("Item.Gleipnir.Target")
	target:AddNewModifier(caster, self, "modifier_item_gungir_custom_root", { duration = self.duration })
end

modifier_item_gungir_custom_root = class(mod_hidden)
function modifier_item_gungir_custom_root:IsPurgable()
	return true
end
function modifier_item_gungir_custom_root:GetEffectName()
	return "particles/items3_fx/gleipnir_root.vpcf"
end
function modifier_item_gungir_custom_root:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.ticks = self.ability.ticks

	if not IsServer() then
		return
	end

	local damage = self.ability.damage

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage = damage / self.ticks,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}

	self.count = 0
	self.interval = self:GetRemainingTime() / self.ticks

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_item_gungir_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_item_gungir_custom_root:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.count = 0
end

function modifier_item_gungir_custom_root:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.count >= self.ticks then
		return
	end

	DoDamage(self.damageTable)
	self.count = self.count + 1
end

modifier_item_gungir_custom = class(mod_hidden)
function modifier_item_gungir_custom:RemoveOnDeath()
	return false
end
function modifier_item_gungir_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.health = self.ability.bonus_hp
	self.int = self.ability.bonus_intellect
	self.mana = self.ability.bonus_mana
	self.cast = self.ability.cast_speed
	self.bonus_damage = self.ability.bonus_damage
	self.item_damage = self.ability.item_damage
end

function modifier_item_gungir_custom:GetItemDamage()
	return self.item_damage
end

function modifier_item_gungir_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_MANA_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_item_gungir_custom:GetModifierSpellAmplify_Percentage()
	return self.bonus_damage
end

function modifier_item_gungir_custom:GetModifierHealthBonus()
	return self.health
end

function modifier_item_gungir_custom:GetModifierManaBonus()
	return self.mana
end

function modifier_item_gungir_custom:GetModifierBonusStats_Intellect()
	return self.int
end

modifier_item_gungir_custom_speed = class(mod_visible)
function modifier_item_gungir_custom_speed:IsPurgable()
	return true
end
function modifier_item_gungir_custom_speed:GetStatusEffectName()
	return "particles/status_fx/status_effect_mjollnir_shield.vpcf"
end
function modifier_item_gungir_custom_speed:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_item_gungir_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.movespeed = self.ability.movespeed
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_techies/techies_tazer.vpcf", self)
end

function modifier_item_gungir_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_item_gungir_custom_speed:GetModifierMoveSpeedBonus_Percentage()
	return self.movespeed
end