--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_weighted_dice_custom",
	"abilities/items/neutral/item_weighted_dice_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_weighted_dice_custom = class({})

function item_weighted_dice_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_item_weighted_dice_custom"
end

function item_weighted_dice_custom:Spawn()
	self.chance = self:GetSpecialValueFor("chance")
	self.damage = self:GetSpecialValueFor("damage")
	self.gold = self:GetSpecialValueFor("gold")
end

modifier_item_weighted_dice_custom = class(mod_hidden)
function modifier_item_weighted_dice_custom:RemoveOnDeath()
	return false
end
function modifier_item_weighted_dice_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.chance = self.ability.chance
	self.damage = self.ability.damage
	self.gold = self.ability.gold

	self.parent:AddDeathEvent(self, true)

	if not IsServer() then
		return
	end
	self.parent:AddProc(self, { land = true, property = true })
end

function modifier_item_weighted_dice_custom:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not params.unit:IsCreep() then
		return
	end
	if params.unit:GetTeamNumber() ~= DOTA_TEAM_NEUTRALS then
		return
	end
	if self.parent ~= players[params.attacker:GetId()] then
		return
	end
	if not RollPseudoRandomPercentage(self.chance, 5234, self.parent) then
		return
	end

	self.parent:GiveGold(self.gold, nil, nil, self.ability)
end

function modifier_item_weighted_dice_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_MAGICAL,
	}
end

function modifier_item_weighted_dice_custom:GetProcChance()
	return self.chance
end

function modifier_item_weighted_dice_custom:GetModifierProcAttack_BonusDamage_Magical(params)
	if not IsServer() then
		return
	end
	self.parent:LandProcs(params, true)
	if not self.parent:IsProc(self, params.record) then
		return
	end

	params.target:SendNumber(4, self.damage)
	return self.damage
end