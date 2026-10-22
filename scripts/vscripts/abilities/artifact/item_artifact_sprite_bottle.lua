--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/artifact/item_artifact_sprite_bottle"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__ArrayFilter
local f = b.__TS__ArrayForEach
local g = b.__TS__DecorateLegacy
local h = {}
local i = require("abilities.eom_ability")
local j = i.EOMItem
local k = i.registerEOMAbility
local l = c()
l.name = "item_artifact_sprite_bottle"
d(l, j)
function l.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function l.prototype.OnSpellStart(self)
	local m = self:GetCaster()
	local n = m:GetPlayerOwnerID()
	local o = e(m:GetAllItems(), function(p, q)
		return q:GetLevel() < 4
	end)
	local r = self:GetSpecialValueFor("bless_rarity_bonus")
	local s = PickList(o, r)
	if #s == 0 then
		Notification:CombatToPlayer(n, { message = "Notify_item_artifact_sprite_bottle_empty" })
		return
	end
	f(s, function(p, q)
		q:SetLevel(4)
		Notification:CombatToPlayer(
			n,
			{
				message = "Notify_item_artifact_sprite_bottle",
				item_name = self:GetAbilityName(),
				item_name2 = q:GetAbilityName(),
			}
		)
	end)
	m:RemoveItem(self)
end
function l.prototype.EventListener(self)
	return {
		dungeon_room_start = function()
			self:OnSpellStart()
		end,
	}
end
l = g({ k(nil) }, l)
return h