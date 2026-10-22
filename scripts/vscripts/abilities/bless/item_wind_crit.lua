--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/bless/item_wind_crit"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("lib.dota_ts_adapter")
local h = g.registerAbility
local i = require("abilities.eom_ability")
local j = i.EOMItem
local k = c()
k.name = "item_wind_crit"
d(k, j)
function k.prototype.EventListener(self)
	return {
		damage_event = function(l, m)
			if m.attacker == self:GetCaster() and not m.is_crit then
				self:IncrementStackCount()
			end
		end,
		crit_event = function(l, m)
			if m.attacker == self:GetCaster() then
				self:SetStackCount(0)
			end
		end,
	}
end
function k.prototype.StaticProperty(self)
	return { [PropertyFunction.CRIT_CHANCE] = self:GetStackCount() * self:GetSpecialValueFor("crit_chance") }
end
k = e({ h(nil) }, k)
return f