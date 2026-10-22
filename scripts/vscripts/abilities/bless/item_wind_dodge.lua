--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/bless/item_wind_dodge"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_wind_dodge"
d(j, h)
function j.prototype.EventListener(self)
	return {
		dash_end = function(k, l)
			if self:GetCaster() == l.caster then
				self:SetStackCount(1, false)
				self:StartThink(self:GetSpecialValueFor("duration"), "duration", function()
					self:SetStackCount(0, false)
					return -1
				end)
			end
		end,
		ability_cast_complete = function(k, l)
			if l.caster == self:GetCaster() and l.abilityTag == AbilityTag.Defense then
				self:SetStackCount(1, false)
				self:StartThink(self:GetSpecialValueFor("duration"), "duration", function()
					self:SetStackCount(0, false)
					return -1
				end)
			end
		end,
	}
end
function j.prototype.StaticProperty(self)
	return {
		[PropertyFunction.EVASION] = self:GetStackCount() * self:GetSpecialValueFor("evasion"),
		[PropertyFunction.MOVESPEED] = self:GetStackCount() * self:GetSpecialValueFor("movespeed"),
	}
end
j = e({ i(nil) }, j)
return f