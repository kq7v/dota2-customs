--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/bless/item_holy_courage"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_holy_courage"
d(j, h)
function j.prototype.EventListener(self)
	return {
		dungeon_room_start = function(k, l)
			if l.room:IsCombatRoom() then
				self:SetStackCount(1, false)
				if self.__ParticleIDs == nil or #self.__ParticleIDs <= 0 then
					local m = ParticleManager:CreateParticle(
						"particles/items2_fx/medallion_of_courage_friend.vpcf",
						PATTACH_OVERHEAD_FOLLOW,
						self:GetCaster()
					)
					self:AddParticle(m)
				end
			end
		end,
		damage_event = function(k, l)
			local n = self:GetCaster()
			if l.target == n and l.damage > 0 then
				self:DestroyParticles()
				self:SetStackCount(0, false)
			end
		end,
	}
end
function j.prototype.StaticProperty(self)
	return { [PropertyFunction.DAMAGE_AMPLIFY] = self:GetSpecialValueFor("damage_pct") * self:GetStackCount() }
end
j = e({ i(nil) }, j)
return f