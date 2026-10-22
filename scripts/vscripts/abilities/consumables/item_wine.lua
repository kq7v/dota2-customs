--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_wine"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_wine"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	k:AddProperty(PropertyFunction.COOLDOWN_REDUCTION, self:GetSpecialValueFor("cooldown_reduction"), self:GetName())
	k:EmitSoundParams("Hero_Tusk.DrinkingBuddies.Cast", 0, 0.5, 0)
	k:RemoveItem(self)
end
j = e({ i(nil) }, j)
return f