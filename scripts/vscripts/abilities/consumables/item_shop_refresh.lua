--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_shop_refresh"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMItem
local i = g.registerEOMAbility
local j = c()
j.name = "item_shop_refresh"
d(j, h)
function j.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	local l = DungeonManager:GetCurrentRoom()
	if l ~= nil and l:GetRoomType() == RoomType.SHOP then
		l:RefreshShopItems()
	end
	local m = ParticleManager:CreateParticle("particles/items2_fx/refresher.vpcf", PATTACH_ABSORIGIN_FOLLOW, k)
	ParticleManager:ReleaseParticleIndex(m)
	k:EmitSound("DOTA_Item.Refresher.Activate")
	k:RemoveItem(self)
end
j = e({ i(nil) }, j)
return f