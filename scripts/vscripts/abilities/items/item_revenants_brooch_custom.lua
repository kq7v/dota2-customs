--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_revenants_brooch_custom",
	"abilities/items/item_revenants_brooch_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_revenants_brooch_custom = class({})

function item_revenants_brooch_custom:GetIntrinsicModifierName()
	return "modifier_item_revenants_brooch_custom"
end

function item_revenants_brooch_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/revenant_brooch_projectile.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/revenant_brooch_projectile_explosion.vpcf", context)
end

function item_revenants_brooch_custom:Spawn()
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.crit_chance = self:GetSpecialValueFor("crit_chance")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.crit_base = self:GetSpecialValueFor("crit_base")
	self.crit_damage = self:GetSpecialValueFor("crit_damage")
	self.spell_lifesteal = self:GetSpecialValueFor("spell_lifesteal")
	self.cooldown = self:GetSpecialValueFor("AbilityCooldown")
end

function item_revenants_brooch_custom:GetCooldown()
	return (self.cooldown and self.cooldown or 0) / self:GetCaster():GetCooldownReduction()
end

modifier_item_revenants_brooch_custom = class(mod_hidden)
function modifier_item_revenants_brooch_custom:RemoveOnDeath()
	return false
end
function modifier_item_revenants_brooch_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.bonus_damage = self.ability.bonus_damage
	self.crit_chance = self.ability.crit_chance
	self.bonus_health = self.ability.bonus_health
	self.crit_base = self.ability.crit_base
	self.crit_damage = self.ability.crit_damage / 100
	self.spell_lifesteal = self.ability.spell_lifesteal / 100

	if not IsServer() then
		return
	end
	self.damageTable = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
	self.parent:AddLifesteal(self, { type = 1, value = self.spell_lifesteal })
	self.parent:AddProc(
		self,
		{ group = "brooch_hydra", target_cd = self.ability.cooldown, target_prd = true, land = true }
	)
end

function modifier_item_revenants_brooch_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_revenants_brooch_custom:GetModifierPreAttack_BonusDamage()
	return self.bonus_damage
end

function modifier_item_revenants_brooch_custom:GetModifierHealthBonus()
	return self.bonus_health
end

function modifier_item_revenants_brooch_custom:GetProcChance()
	return self.crit_chance
end

function modifier_item_revenants_brooch_custom:AttackProc(params)
	local target = params.target
	self.damageTable.victim = target
	self.damageTable.damage = self.crit_base + self.parent:GetAverageTrueAttackDamage(nil) * self.crit_damage
	local real_damage = DoDamage(self.damageTable)
	target:SendNumber(4, real_damage)

	local mainParticle = ParticleManager:CreateParticle(
		"particles/items_fx/revenant_brooch_projectile_explosion.vpcf",
		PATTACH_POINT_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		mainParticle,
		3,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(mainParticle)

	target:EmitSound("Item.Brooch.Attack")
end