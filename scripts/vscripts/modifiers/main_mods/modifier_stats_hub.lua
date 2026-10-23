--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


modifier_stats_hub = class(mod_hidden)
modifier_stats_hub.is_hub = true
function modifier_stats_hub:RemoveOnDeath()
	return false
end
function modifier_stats_hub:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.hub = {}
	for func in pairs(hub_functions) do
		self.hub[func] = {}
	end

	for mod, list in pairs(self.parent.hub_orphans or {}) do
		for _, func in pairs(list) do
			self.hub[func][mod] = true
		end
	end

	self.parent.hub_orphans = nil
	self.parent.stats_hub = self
	if self.parent:IsHero() then
		self.parent:CalculateStatBonus(true)
	end
end

function modifier_stats_hub:DeclareFunctions()
	local list = {}
	if not IsServer() then
		return list
	end
	local hero = self:GetParent():IsHero()
	for func in pairs(hub_functions) do
		if hero or hub_units[func] then
			table.insert(list, func)
		end
	end
	return list
end

function modifier_stats_hub:Sum(func, params)
	local name = hub_functions[func]
	local sum = 0
	for mod in pairs(self.hub[func]) do
		if IsValid(mod) then
			sum = sum + (mod[name] and mod[name](mod, params) or 0)
		else
			self.hub[func][mod] = nil
		end
	end
	return sum
end

function modifier_stats_hub:GetModifierBonusStats_Strength(params)
	return self:Sum(MODIFIER_PROPERTY_STATS_STRENGTH_BONUS, params)
end

function modifier_stats_hub:GetModifierBonusStats_Agility(params)
	return self:Sum(MODIFIER_PROPERTY_STATS_AGILITY_BONUS, params)
end

function modifier_stats_hub:GetModifierBonusStats_Intellect(params)
	return self:Sum(MODIFIER_PROPERTY_STATS_INTELLECT_BONUS, params)
end

function modifier_stats_hub:GetModifierAttackSpeedBonus_Constant(params)
	return self:Sum(MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT, params)
end

function modifier_stats_hub:GetModifierPreAttack_BonusDamage(params)
	return self:Sum(MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE, params)
end

function modifier_stats_hub:GetModifierPhysicalArmorBonus(params)
	return self:Sum(MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS, params)
end

function modifier_stats_hub:GetModifierMoveSpeedBonus_Constant(params)
	return self:Sum(MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT, params)
end

function modifier_stats_hub:GetModifierCastRangeBonusStacking(params)
	return self:Sum(MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING, params)
end