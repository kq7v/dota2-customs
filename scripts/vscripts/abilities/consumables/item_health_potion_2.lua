--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_health_potion_2"
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
k.name = "item_health_potion_2"
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
			local p = self:GetSpecialValueFor("health_regen")
			o:Heal(p, self)
			local q = ParticleManager:CreateParticle(
				"particles/items3_fx/fish_bones_active.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				o
			)
			ParticleManager:ReleaseParticleIndex(q)
			o:EmitSoundParams("DOTA_Item.FaerieSpark.Activate", 0, 0.5, 0)
			Event:Fire("potion_heal", { caster = o, healAmount = p })
		end
	end)
	l:RemoveItem(self)
end
k = e({ h(nil) }, k)
return f