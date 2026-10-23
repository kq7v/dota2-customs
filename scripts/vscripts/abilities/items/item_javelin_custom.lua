--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_javelin_custom", "abilities/items/item_javelin_custom", LUA_MODIFIER_MOTION_NONE)

item_javelin_custom = class({})

function item_javelin_custom:GetIntrinsicModifierName()
	return "modifier_item_javelin_custom"
end

function item_javelin_custom:Spawn()
	self.bonus_chance = self:GetSpecialValueFor("bonus_chance")
	self.health_bonus = self:GetSpecialValueFor("health_bonus")
	self.bonus_chance_damage = self:GetSpecialValueFor("bonus_chance_damage")
end

modifier_item_javelin_custom = class(mod_hidden)
function modifier_item_javelin_custom:RemoveOnDeath()
	return false
end
function modifier_item_javelin_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddProc(self, { accuracy = true })
end

function modifier_item_javelin_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_item_javelin_custom:GetModifierHealthBonus()
	return self.ability.health_bonus
end

function modifier_item_javelin_custom:GetProcChance()
	return self.ability.bonus_chance
end

function modifier_item_javelin_custom:GetModifierProcAttack_BonusDamage_Magical(params)
	if not IsServer() then
		return
	end
	if not self.parent:IsProc(self, params.record) then
		return
	end

	params.target:SendNumber(4, self.ability.bonus_chance_damage)
	return self.ability.bonus_chance_damage
end