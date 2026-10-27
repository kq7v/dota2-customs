--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/privilege/privilege_myth_012"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_privilege")
local h = g.EOMPrivilege
local i = g.PrivilegeValue
local j = g.RegisterPrivilege
local k = c()
k.name = "privilege_myth_012"
d(k, h)
function k.prototype.OnCreated(self)
	self.nextTime = 0
	self.interval = self:GetSpecialValueFor("interval")
end
function k.prototype.EventListener(self)
	return {
		consume_shield = function(l, m)
			local n = GameRules:GetGameTime()
			local o = self:GetCaster()
			if
				IsValid(o)
				and m.damageEvent.target == o
				and IsValid(m.damageEvent.attacker)
				and n >= self.nextTime
				and self:PRD(self.value, k.name)
				and m.shield > 0
			then
				self.nextTime = n + self.interval
				o:LightningStorm(m.damageEvent.attacker, self:GetSpecialValueFor("damage"))
			end
		end,
	}
end
e({ i(nil) }, k.prototype, "value", nil)
k = e({ j(nil) }, k)
return f