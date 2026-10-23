--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_item_desolator_custom", "abilities/items/item_desolator_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_item_desolator_custom_debuff",
	"abilities/items/item_desolator_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_desolator_custom = class({})

function item_desolator_custom:GetIntrinsicModifierName()
	return "modifier_item_desolator_custom"
end

function item_desolator_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items_fx/desolator_projectile.vpcf", context)
end

function item_desolator_custom:Spawn()
	self.corruption_armor = self:GetSpecialValueFor("corruption_armor")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.corruption_duration = self:GetSpecialValueFor("corruption_duration")
end

modifier_item_desolator_custom = class(mod_hidden)
function modifier_item_desolator_custom:GetPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_item_desolator_custom:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.caster:AddProc(self, { land = true })

	self.armor_reduce = self.ability.corruption_armor
	self.damage = self.ability.bonus_damage

	self.bonus_damage = self.ability.bonus_damage
	self.corruption_duration = self.ability.corruption_duration
end

function modifier_item_desolator_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_item_desolator_custom:GetModifierPreAttack_BonusDamage()
	return self.bonus_damage
end

function modifier_item_desolator_custom:GetModifierProjectileName()
	return "particles/items_fx/desolator_projectile.vpcf"
end

function modifier_item_desolator_custom:GetProcChance()
	return 100
end

function modifier_item_desolator_custom:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end

	local target = params.target

	target:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_item_desolator_custom_debuff",
		{ duration = self.corruption_duration }
	)
	target:EmitSound("Item_Desolator.Target")
end

modifier_item_desolator_custom_debuff = class(mod_visible)
function modifier_item_desolator_custom_debuff:IsPurgable()
	return true
end
function modifier_item_desolator_custom_debuff:OnCreated()
	self.ability = self:GetAbility()

	self.corruption_armor = self.ability.corruption_armor
end

function modifier_item_desolator_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_item_desolator_custom_debuff:GetModifierPhysicalArmorBonus()
	return self.corruption_armor
end