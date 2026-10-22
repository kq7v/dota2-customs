--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/artifact/item_artifact_fortune_fruit"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_artifact_fortune_fruit"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	local l = k:GetPlayerOwnerID()
	local m = Bless:DrawBless(l, 1)
	if m ~= nil and m[1] then
		Bless:AddBless(k, m[1])
		Notification:CombatToPlayer(
			l,
			{ message = "Notify_item_get_item", item_name = self:GetAbilityName(), item_name2 = m[1].name }
		)
	end
	k:RemoveItem(self)
end
j = e({ i(nil) }, j)
return f