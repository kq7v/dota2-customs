--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/consumables/item_regen_bottle"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("lib.dota_ts_adapter")
local h = g.registerAbility
local i = require("modifiers.eom_modifier.eom_modifier")
local j = i.EOMModifier
local k = i.registerEOMModifier
local l = require("abilities.eom_ability")
local m = l.EOMItem
local n = c()
n.name = "item_regen_bottle"
d(n, m)
function n.prototype.OnCreated(self)
	self:StartThink(0, function()
		self:OnSpellStart()
		return -1
	end)
end
function n.prototype.OnSpellStart(self)
	local o = self:GetCaster()
	Game:EachPlayer(function(p, q)
		local r = Player:GetHero(q)
		if IsValid(r) then
			r:AddNewModifier(r, self, "modifier_item_regen_bottle", { duration = 2 })
			local s = self:GetSpecialValueFor("regen_pct") * r:GetMaxHealth() * 0.01
			Event:Fire("potion_heal", { caster = r, healAmount = s })
		end
	end)
	o:RemoveItem(self)
end
n = e({ h(nil) }, n)
local t = c()
t.name = "modifier_item_regen_bottle"
d(t, j)
function t.prototype.____constructor(self, ...)
	j.prototype.____constructor(self, ...)
	self.regen_pct = 0
end
function t.prototype.GetAbilitySpecialValue(self)
	self.regen_pct = self:GetAbilitySpecialValueFor("regen_pct")
end
function t.prototype.OnCreated(self, u)
	if IsServer() then
		self.parent:EmitSound("Bottle.Drink")
		self:StartIntervalThink(0.1)
	else
		local v = ParticleManager:CreateParticle(
			"particles/econ/events/ti7/bottle_ti7.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self:GetParent()
		)
		self:AddParticle(v, false, false, -1, false, false)
	end
end
function t.prototype.OnIntervalThink(self)
	if IsServer() then
		local s = self.regen_pct * self.parent:GetMaxHealth() * 0.01 * 0.05
		self.parent:Heal(s, self:GetAbility())
	end
end
t = e(
	{
		k(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				IsStunDebuff = false,
				AllowIllusionDuplicate = false,
			}
		),
	},
	t
)
return f