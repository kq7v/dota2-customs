--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/eom_ability"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = {}
local f = require("lib.dota_ts_adapter")
local g = f.BaseAbility
local h = f.BaseItem
local i = f.toDotaClassInstance
local function j(self, k, l)
	if l == "item_holy_courage" or l == "item_poison_heal" or l == "item_wind_crit" then
		return false
	end
	return k == "damage_event"
		or k == "crit_event"
		or k == "attack_event"
		or k == "poison_event"
		or k == "poison_pool_event"
		or k == "expose_effect"
		or k == "expose_event"
		or k == "ice_mark_effect"
		or k == "ice_mark_event"
		or k == "frozen_event"
		or k == "frozen_attenation"
		or k == "lightning_strike"
		or k == "ice_strike"
		or k == "throw_snowball"
		or k == "blood_spear"
end
local m = {}
local function n(self, o, p, q)
	local r = o.name or tostring(o)
	local s = m[r]
	if s == nil then
		s = {}
		m[r] = s
	end
	local t = -1
	do
		local u = 0
		while u < #s do
			if s[u + 1].propertyKey == p then
				t = u
				break
			end
			u = u + 1
		end
	end
	if t ~= -1 then
		s[t + 1].specialValueKey = q
	else
		s[#s + 1] = { propertyKey = p, specialValueKey = q }
	end
end
function e.collectAbilityValueEntries(self, o)
	local v = {}
	local w = o
	while w ~= nil do
		local r = w.name or tostring(w)
		local s = m[r]
		if s ~= nil then
			do
				local u = 0
				while u < #s do
					local x = s[u + 1]
					local y = false
					do
						local z = 0
						while z < #v do
							if v[z + 1].propertyKey == x.propertyKey then
								y = true
								break
							end
							z = z + 1
						end
					end
					if not y then
						v[#v + 1] = x
					end
					u = u + 1
				end
			end
		end
		w = w.____super
	end
	return v
end
function e.AbilityValue(self, q)
	return function(A, B, p)
		local C = p
		local D = q or C
		local o = B.constructor
		if o ~= nil then
			n(nil, o, C, D)
		end
	end
end
e.registerEOMAbility = function(A, E)
	local F = E and E.name
	return function(A, G)
		if F ~= nil then
			G.name = F
		else
			F = G.name
		end
		local H = _G
		H[F] = {}
		i(nil, H[F], G)
		local I = e.collectAbilityValueEntries(nil, G)
		local J = H[F].Spawn
		H[F].Spawn = function(self)
			self.__AbilityValueEntries = I
			self.behavior = E and E.behavior
			self.searchBehavior = E and E.searchBehavior or AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE
			self.aoeRadius = E and E.aoeRadius
			self.startWidth = E and E.startWidth
			self.endWidth = E and E.endWidth
			self.targetTeam = E and E.targetTeam
			self.targetType = E and E.targetType
			self.targetFlags = E and E.targetFlags
			self.funcSortFunction = E and E.funcSortFunction
			self.funcCondition = E and E.funcCondition
			self.funcUnitsCallback = E and E.funcUnitsCallback
			self.isNotPassive = E and E.isNotPassive
			self.orderType = E and E.orderType or FIND_ANY_ORDER
			EntityConstructor(self)
			self.__AbilityValueEntries = I
			if self.__AbilityValueEntries ~= nil then
				do
					local u = 0
					while u < #self.__AbilityValueEntries do
						local x = self.__AbilityValueEntries[u + 1]
						self[x.propertyKey] = self:GetSpecialValueFor(x.specialValueKey)
						u = u + 1
					end
				end
			end
			if IsServer() then
				if (E and E.startLevel) ~= nil then
					if type(E.startLevel) == "function" then
						self:SetLevel(E:startLevel(self))
					else
						self:SetLevel(E.startLevel)
					end
				end
				if (E and E.startCooldown) ~= nil then
					if type(E.startCooldown) == "function" then
						self:StartCooldown(E:startCooldown(self))
					else
						self:StartCooldown(E.startCooldown)
					end
				else
					local K = KeyValues.abilities[self:GetAbilityName()]
					local L
					if K ~= nil then
						L = K.AbilityStartCooldown
					end
					if L ~= nil then
						self:StartCooldown(toFiniteNumber(K.AbilityStartCooldown, 1))
					end
				end
			end
			self:____constructor()
			if J then
				J(self)
			end
		end
		local M = H[F].OnUpgrade
		H[F].OnUpgrade = function(self)
			self.__AbilityValueEntries = I
			if self.__AbilityValueEntries ~= nil then
				do
					local u = 0
					while u < #self.__AbilityValueEntries do
						local x = self.__AbilityValueEntries[u + 1]
						self[x.propertyKey] = self:GetSpecialValueFor(x.specialValueKey)
						u = u + 1
					end
				end
			end
			if M ~= nil then
				M(self)
			end
			if IsServer() and not self:IsItem() then
				self:UpdateRuntimeNetData()
			end
		end
		local N = H[F].OnSpellStart
		H[F].OnSpellStart = function(self)
			self.__AbilityValueEntries = I
			if self.__AbilityValueEntries ~= nil then
				do
					local u = 0
					while u < #self.__AbilityValueEntries do
						local x = self.__AbilityValueEntries[u + 1]
						self[x.propertyKey] = self:GetSpecialValueFor(x.specialValueKey)
						u = u + 1
					end
				end
			end
			if N ~= nil then
				N(self)
			end
		end
	end
end
e.EOMAbility = c()
local O = e.EOMAbility
O.name = "EOMAbility"
d(O, g)
e.EOMItem = c()
local P = e.EOMItem
P.name = "EOMItem"
d(P, h)
function P.prototype.GetEventRegisterOptions(self, k)
	local l = self:GetAbilityName()
	local Q = KeyValues.items[l]
	if Q ~= nil then
		Q = Q.Access
	end
	if Q == "Bless" and j(nil, k, l) then
		return { ownerFilter = true, cooldown = 0.1, allowNested = false }
	end
	return nil
end
return e