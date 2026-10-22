--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_mana_potion_3"
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
k.name = "item_mana_potion_3"
d(k, j)
function k.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function k.prototype.OnSpellStart(self)
	local l = self:GetCaster()
	Game:EachPlayer(function(m, n)
		local o = Player:GetHero(n)
		if IsValid(o) then
			o:GiveMana(self:GetSpecialValueFor("mana_regen"))
			local p =
				ParticleManager:CreateParticle("particles/items3_fx/fury_active.vpcf", PATTACH_ABSORIGIN_FOLLOW, o)
			ParticleManager:ReleaseParticleIndex(p)
			o:EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0)
		end
	end)
	l:RemoveItem(self)
end
k = e({ h(nil) }, k)
return f