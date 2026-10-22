--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "override/CDOTA_Item"
local b = require("lualib_bundle")
local c = b.__TS__ArrayMap
local d = b.__TS__StringSplit
local e = b.__TS__ArrayFilter
if IsServer() then
	if CDOTA_Item.SetLevel_Engine == nil then
		CDOTA_Item.SetLevel_Engine = CDOTA_Item.SetLevel
	end
	CDOTA_Item.SetLevel = function(self, f, g)
		if g == nil then
			g = true
		end
		self:SetLevel_Engine(f)
		local h = self:GetCaster()
		if h.__items ~= nil then
			c(h.__items, function(i, j)
				if j.entIndex == self:entindex() then
					j.level = self:GetLevel()
				end
			end)
		end
		self:__OnRefresh()
		if g then
			self:UpdateRuntimeNetData()
		end
	end
	CDOTA_Item.GetAccess = function(self)
		local k = KeyValues.items[self:GetAbilityName()]
		if k ~= nil then
			k = k.Access
		end
		local l = k
		if l == nil then
			l = ""
		end
		return l
	end
	CDOTA_Item.GetSuits = function(self)
		local m = KeyValues.items[self:GetAbilityName()]
		if m ~= nil then
			m = m.Suit
		end
		local n = m
		if n == nil then
			n = ""
		end
		return e(d(n, "|"), function(i, o)
			return o ~= ""
		end)
	end
end