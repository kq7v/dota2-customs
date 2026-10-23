--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_alchemist_gold_satanic",
	"abilities/items/item_alchemist_gold_satanic",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_alchemist_gold_satanic_active",
	"abilities/items/item_alchemist_gold_satanic",
	LUA_MODIFIER_MOTION_NONE
)

item_alchemist_gold_satanic = class({})

function item_alchemist_gold_satanic:GetIntrinsicModifierName()
	return "modifier_item_alchemist_gold_satanic"
end

function item_alchemist_gold_satanic:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items/bristle_cdr.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/mask_of_madness.vpcf", context)
end

function item_alchemist_gold_satanic:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.bonus_strength = self:GetSpecialValueFor("bonus_strength")
	self.bonus_damage = self:GetSpecialValueFor("bonus_damage")
	self.lifesteal = self:GetSpecialValueFor("lifesteal")
	self.lifesteal_active = self:GetSpecialValueFor("lifesteal_active")
	self.active_damage = self:GetSpecialValueFor("active_damage")
end

function item_alchemist_gold_satanic:OnSpellStart()
	local caster = self:GetCaster()
	local duration = self.duration

	caster:EmitSound("DOTA_Item.BlackKingBar.Activate")
	caster:EmitSound("DOTA_Item.Satanic.Activate")

	caster:Purge(false, true, false, true, true)
	caster:AddNewModifier(caster, self, "modifier_item_alchemist_gold_satanic_active", { duration = duration })
end

modifier_item_alchemist_gold_satanic = class(mod_hidden)
function modifier_item_alchemist_gold_satanic:RemoveOnDeath()
	return false
end
function modifier_item_alchemist_gold_satanic:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bonus_str = self.ability.bonus_strength
	self.bonus_damage = self.ability.bonus_damage
	self.lifesteal = self.ability.lifesteal / 100

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { type = 2, value = self.lifesteal })
end

function modifier_item_alchemist_gold_satanic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_item_alchemist_gold_satanic:GetModifierPreAttack_BonusDamage()
	return self.bonus_damage
end

function modifier_item_alchemist_gold_satanic:GetModifierBonusStats_Strength()
	return self.bonus_str
end

modifier_item_alchemist_gold_satanic_active = class(mod_visible)
function modifier_item_alchemist_gold_satanic_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bonus_damage = (1 - self.parent:GetHealthPercent() / 100) * self.ability.active_damage
	self:SetStackCount(self.bonus_damage)

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items2_fx/mask_of_madness.vpcf", self)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self:GetRemainingTime(), effect = 1 }
	)
	self.parent:AddLifesteal(
		self,
		{ type = 2, value = (self.ability.lifesteal_active - self.ability.lifesteal) / 100, text = true }
	)
end

function modifier_item_alchemist_gold_satanic_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_item_alchemist_gold_satanic_active:GetModifierPreAttack_BonusDamage()
	return self.bonus_damage
end

function modifier_item_alchemist_gold_satanic_active:GetModifierModelScale()
	return 20
end