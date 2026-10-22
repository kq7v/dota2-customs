--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/bless/item_holy_attack"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_holy_attack"
d(j, h)
function j.prototype.____constructor(self, ...)
	h.prototype.____constructor(self, ...)
	self.enable = true
end
function j.prototype.EventListener(self)
	return {
		damage_event = function(k, l)
			local m = self:GetCaster()
			if self.enable and m == l.attacker and l.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK then
				m:AddShield(self:GetSpecialValueFor("shield"))
				self.enable = false
				self:StartThink(0, function()
					self.enable = true
					return -1
				end)
			end
		end,
	}
end
j = e({ i(nil) }, j)
return f