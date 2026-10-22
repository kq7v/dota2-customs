--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_gold_pouch_single"
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
k.name = "item_gold_pouch_single"
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
	local n = self:GetSpecialValueFor("gold_amount") * (1 + GetGoldRoomAmount(m) * 0.01)
	Player:ModifyGold(m, n)
	local o = PlayerResource:GetSelectedHeroEntity(m)
	if IsValid(o) then
		SendOverheadEventMessage(PlayerResource:GetPlayer(m), OVERHEAD_ALERT_GOLD, o, n, o:GetPlayerOwner())
		o:EmitSoundParams("General.Coins", 0, 0.5, 0)
	end
	l:RemoveItem(self)
end
k = e({ h(nil) }, k)
return f