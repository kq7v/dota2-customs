--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/artifact/item_artifact_giant_killer_2"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_artifact_giant_killer_2"
d(j, h)
function j.prototype.DynamicProperty(self)
	return {
		[PropertyFunction.DAMAGE_AMPLIFY] = function(k, l)
			if IsValid(l and l.target) and l.target:IsHealthy() then
				return self:GetSpecialValueFor("damage_amp")
			end
			return 0
		end,
	}
end
j = e({ i(nil) }, j)
return f