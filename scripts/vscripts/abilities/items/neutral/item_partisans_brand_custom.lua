--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_partisans_brand_custom",
	"abilities/items/neutral/item_partisans_brand_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_partisans_brand_custom = class({})

function item_partisans_brand_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_item_partisans_brand_custom"
end

function item_partisans_brand_custom:Spawn()
	self.bonus_damage_pct = self:GetSpecialValueFor("bonus_damage_pct")
end

modifier_item_partisans_brand_custom = class(mod_hidden)
function modifier_item_partisans_brand_custom:RemoveOnDeath()
	return false
end
function modifier_item_partisans_brand_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bonus_damage = self.ability.bonus_damage_pct
end

function modifier_item_partisans_brand_custom:GetItemDamage()
	return self.bonus_damage
end