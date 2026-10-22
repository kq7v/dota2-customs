--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_ball_attack_single"
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
k.name = "item_ball_attack_single"
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
	local n = Player:GetHero(m)
	if IsValid(n) then
		n:AddProperty(PropertyFunction.ATTACK, self:GetSpecialValueFor("value"), self:GetName())
		n:AddProperty(PropertyFunction.SPELL_DAMAGE_AMPLIFY, self:GetSpecialValueFor("spell_damage"), self:GetName())
		local o = ParticleManager:CreateParticle(
			"particles/items3_fx/blink_overwhelming_start.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			n
		)
		ParticleManager:ReleaseParticleIndex(o)
		n:EmitSoundParams("Item.TomeOfKnowledge", 0, 0.5, 0)
	end
	l:RemoveItem(self)
end
k = e({ h(nil) }, k)
return f