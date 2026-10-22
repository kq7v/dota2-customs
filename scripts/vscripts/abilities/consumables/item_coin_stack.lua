--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_coin_stack"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_coin_stack"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	local l = RandomInt(self:GetSpecialValueFor("gold_min"), self:GetSpecialValueFor("gold_max"))
	Game:EachPlayer(function(m, n)
		Player:ModifyGold(n, l)
		local o = PlayerResource:GetSelectedHeroEntity(n)
		if IsValid(o) then
			SendOverheadEventMessage(PlayerResource:GetPlayer(n), OVERHEAD_ALERT_GOLD, o, l, o:GetPlayerOwner())
			o:EmitSoundParams("General.Coins", 0, 0.5, 0)
		end
	end)
	k:RemoveItem(self)
end
j = e({ i(nil) }, j)
return f