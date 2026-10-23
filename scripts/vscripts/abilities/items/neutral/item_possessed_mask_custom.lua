--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_possessed_mask_custom",
	"abilities/items/neutral/item_possessed_mask_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_possessed_mask_custom_health",
	"abilities/items/neutral/item_possessed_mask_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_possessed_mask_custom = class({})

function item_possessed_mask_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_item_possessed_mask_custom"
end

function item_possessed_mask_custom:Spawn()
	self.duration = self:GetSpecialValueFor("duration")
	self.str = self:GetSpecialValueFor("str")
	self.max = self:GetSpecialValueFor("max")
end

modifier_item_possessed_mask_custom = class(mod_hidden)
function modifier_item_possessed_mask_custom:RemoveOnDeath()
	return false
end
function modifier_item_possessed_mask_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.duration
	self.parent:AddProc(self, { land = true })
end

function modifier_item_possessed_mask_custom:GetProcChance()
	return 100
end

function modifier_item_possessed_mask_custom:AttackProc(params, name)
	if not IsValid(self.ability) then
		return
	end

	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_possessed_mask_custom_health",
		{ duration = self.duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_item_possessed_mask_custom_health",
		{ duration = self.duration }
	)
end

modifier_item_possessed_mask_custom_health = class(mod_visible)
function modifier_item_possessed_mask_custom_health:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.str = self.ability.str
	if self.caster:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		self.str = self.str * -1
	end

	self.max = self.ability.max
	if not IsServer() then
		return
	end
	self:SetStackCount(1)
end

function modifier_item_possessed_mask_custom_health:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_item_possessed_mask_custom_health:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_item_possessed_mask_custom_health:OnDestroy()
	if not IsServer() then
		return
	end
	self:OnStackCountChanged()
end

function modifier_item_possessed_mask_custom_health:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_item_possessed_mask_custom_health:GetModifierBonusStats_Strength()
	return self:GetStackCount() * self.str
end