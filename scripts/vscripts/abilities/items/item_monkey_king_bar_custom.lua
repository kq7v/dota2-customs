--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_monkey_king_bar_custom",
	"abilities/items/item_monkey_king_bar_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_monkey_king_bar_custom = class({})

function item_monkey_king_bar_custom:GetIntrinsicModifierName()
	return "modifier_item_monkey_king_bar_custom"
end

function item_monkey_king_bar_custom:Spawn()
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.bonus_attack_speed = self:GetSpecialValueFor("bonus_attack_speed")
	self.bonus_chance = self:GetSpecialValueFor("bonus_chance")
	self.bonus_chance_damage = self:GetSpecialValueFor("bonus_chance_damage")
	self.bonus_chance_damage_creeps = self:GetSpecialValueFor("bonus_chance_damage_creeps")
	self.bonus_chance_damage_health = self:GetSpecialValueFor("bonus_chance_damage_health") / 100
	self.melee_attack_range = self:GetSpecialValueFor("melee_attack_range")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
end

modifier_item_monkey_king_bar_custom = class(mod_hidden)
function modifier_item_monkey_king_bar_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddProc(self, { land = true, property = true })
end

function modifier_item_monkey_king_bar_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_monkey_king_bar_custom:GetModifierAttackRangeBonus()
	if self.parent:IsRangedAttacker() then
		return
	end
	return self.ability.melee_attack_range
end

function modifier_item_monkey_king_bar_custom:GetModifierPreAttack_BonusDamage()
	return self.ability.bonus_damage
end

function modifier_item_monkey_king_bar_custom:GetModifierAttackSpeedBonus_Constant()
	return self.ability.bonus_attack_speed
end

function modifier_item_monkey_king_bar_custom:GetModifierHealthBonus()
	return self.ability.bonus_health
end

function modifier_item_monkey_king_bar_custom:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_item_monkey_king_bar_custom:GetProcChance()
	return self.ability.bonus_chance
end

function modifier_item_monkey_king_bar_custom:GetModifierProcAttack_BonusDamage_Magical(params)
	if not IsServer() then
		return
	end
	self.parent:LandProcs(params, true)
	if not self.parent:IsProc(self, params.record) then
		return
	end

	local target = params.target

	local damage = self.ability.bonus_chance_damage + target:GetMaxHealth() * self.ability.bonus_chance_damage_health
	if target:IsCreep() then
		damage = self.ability.bonus_chance_damage_creeps
	end

	target:EmitSound("DOTA_Item.MKB.melee")
	target:SendNumber(4, damage)
	return damage
end