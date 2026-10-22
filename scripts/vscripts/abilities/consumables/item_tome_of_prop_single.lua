--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_tome_of_prop_single"
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
k.name = "item_tome_of_prop_single"
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
		local o = {
			unit = l,
			hero = n,
			item = self,
			gains = {
				{ property = PropertyFunction.ATTACK, value = self:GetSpecialValueFor("attack"), source = self:GetName() },
				{ property = PropertyFunction.HEALTH, value = self:GetSpecialValueFor("health"), source = self:GetName() },
				{
					property = PropertyFunction.SPELL_DAMAGE_AMPLIFY,
					value = self:GetSpecialValueFor("spell_damage"),
					source = self:GetName(),
				},
			},
			multipliers = {},
		}
		Event:Fire("tome_property_reward", o)
		local p = 1
		for q, r in ipairs(o.multipliers) do
			p = p * r
		end
		for q, s in ipairs(o.gains) do
			local t = s.value * p
			n:AddProperty(s.property, t, s.source or self:GetName())
			local u = s.onApplied
			if u ~= nil then
				u(s, t)
			end
		end
		local v =
			ParticleManager:CreateParticle("particles/items3_fx/warmage_recipient.vpcf", PATTACH_ABSORIGIN_FOLLOW, n)
		ParticleManager:ReleaseParticleIndex(v)
		n:EmitSoundParams("Item.TomeOfKnowledge", 0, 0.5, 0)
	end
	l:RemoveItem(self)
end
k = e({ h(nil) }, k)
return f