--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_hammer_weapon_single"
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
k.name = "item_hammer_weapon_single"
d(k, j)
function k.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function k.prototype.OnSpellStart(self)
	local l = self:GetCaster()
	local m = l:GetPlayerOwnerID()
	SkillUpgrade:RequestEnqueueSkillUpgrade(m)
	l:EmitSound("General.LevelUp.Bonus")
	l:RemoveItem(self)
end
k = e({ h(nil) }, k)
return f