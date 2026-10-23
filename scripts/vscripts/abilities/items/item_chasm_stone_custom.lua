--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_chasm_stone_custom", "abilities/items/item_chasm_stone_custom", LUA_MODIFIER_MOTION_NONE)

item_chasm_stone_custom = class({})

function item_chasm_stone_custom:GetIntrinsicModifierName()
	return "modifier_item_chasm_stone_custom"
end

function item_chasm_stone_custom:Spawn()
	self.cdr_bonus = self:GetSpecialValueFor("cdr_bonus")
end

modifier_item_chasm_stone_custom = class(mod_hidden)
function modifier_item_chasm_stone_custom:RemoveOnDeath()
	return false
end
function modifier_item_chasm_stone_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not self.parent.cdr_items then
		self.parent.cdr_items = {}
	end
	self.parent.cdr_items[self] = self.ability.cdr_bonus
end