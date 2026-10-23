--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_eternal_shroud_custom",
	"abilities/items/item_eternal_shroud_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_eternal_shroud_custom_active",
	"abilities/items/item_eternal_shroud_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_eternal_shroud_custom_active_count",
	"abilities/items/item_eternal_shroud_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_eternal_shroud_custom = class({})

function item_eternal_shroud_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items2_fx/eternal_shroud_launch.vpcf", context)
end

function item_eternal_shroud_custom:GetIntrinsicModifierName()
	return "modifier_item_eternal_shroud_custom"
end

function item_eternal_shroud_custom:Spawn()
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.bonus_stats = self:GetSpecialValueFor("bonus_stats")
	self.bonus_spell_resist = self:GetSpecialValueFor("bonus_spell_resist")
	self.spell_resist_increase = self:GetSpecialValueFor("spell_resist_increase")
	self.spell_damage_thresh = self:GetSpecialValueFor("spell_damage_thresh")
	self.spell_damage_duration = self:GetSpecialValueFor("spell_damage_duration")
	self.spell_damage_increase = self:GetSpecialValueFor("spell_damage_increase")
	self.spell_damage_max = self:GetSpecialValueFor("spell_damage_max")
end

modifier_item_eternal_shroud_custom = class(mod_hidden)
function modifier_item_eternal_shroud_custom:RemoveOnDeath()
	return false
end
function modifier_item_eternal_shroud_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if self.parent:IsRealHero() then
		self.parent:AddDamageEvent_inc(self, true)
	end

	self.health = self.ability.bonus_health
	self.stats = self.ability.bonus_stats
	self.resist = self.ability.bonus_spell_resist
	self.resist_bonus = self.ability.spell_resist_increase

	self.damage_thresh = self.ability.spell_damage_thresh
	self.duration = self.ability.spell_damage_duration

	self.damage_count = 0
	self.parent:AddUniqueStat(self, "magic_resist")
end

function modifier_item_eternal_shroud_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_item_eternal_shroud_custom:GetModifierMagicalResistanceBonus()
	return self.parent:UniqueStat(self, "magic_resist")
end

function modifier_item_eternal_shroud_custom:GetUniqueStat()
	local bonus = 0
	if self.parent:HasModifier("modifier_item_eternal_shroud_custom_active") then
		bonus = self.parent:GetUpgradeStack("modifier_item_eternal_shroud_custom_active") * self.resist_bonus
	end
	return self.resist + bonus
end

function modifier_item_eternal_shroud_custom:GetModifierHealthBonus()
	return self.health
end

function modifier_item_eternal_shroud_custom:GetModifierBonusStats_Strength()
	return self.stats
end

function modifier_item_eternal_shroud_custom:GetModifierBonusStats_Agility()
	return self.stats
end

function modifier_item_eternal_shroud_custom:GetModifierBonusStats_Intellect()
	return self.stats
end

function modifier_item_eternal_shroud_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent == params.attacker then
		return
	end
	if not params.inflictor then
		return
	end
	if not params.attacker:IsUnit() then
		return
	end

	local final = self.damage_count + params.original_damage

	if final >= self.damage_thresh then
		local delta = math.floor(final / self.damage_thresh)
		for i = 1, delta do
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_item_eternal_shroud_custom_active",
				{ duration = self.duration }
			)
		end
		self.damage_count = final - delta * self.damage_thresh
	else
		self.damage_count = final
	end
end

modifier_item_eternal_shroud_custom_active = class(mod_visible)
function modifier_item_eternal_shroud_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.spell_damage_increase
	self.resist = self.ability.spell_resist_increase
	self.max = self.ability.spell_damage_max
	if not IsServer() then
		return
	end
	self:SetStackCount(1)
end

function modifier_item_eternal_shroud_custom_active:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
end

function modifier_item_eternal_shroud_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_item_eternal_shroud_custom_active:GetModifierSpellAmplify_Percentage()
	return self:GetStackCount() * self.damage
end

function modifier_item_eternal_shroud_custom_active:OnTooltip()
	return self:GetStackCount() * self.resist
end