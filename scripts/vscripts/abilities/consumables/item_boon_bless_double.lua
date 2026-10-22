--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_boon_bless_double"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_boon_bless_double"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	Game:EachPlayer(function(l, m)
		Bless:DrawBlessSelection(m, 3)
		Bless:DrawBlessSelection(m, 3)
		local n = PlayerResource:GetSelectedHeroEntity(m)
		if IsValid(n) then
			n:EmitSoundParams("ui.badge_levelup", 0, 0.5, 0)
		end
	end)
	k:RemoveItem(self)
end
j = e({ i(nil) }, j)
return f