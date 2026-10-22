--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/privilege/privilege_suit_032"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("lib.tstl-utils")
local h = g.reloadable
local i = require("abilities.eom_privilege")
local j = i.EOMPrivilege
local k = i.RegisterPrivilege
local l = c()
l.name = "privilege_suit_032"
d(l, j)
function l.prototype.OnCreated(self)
	self.moveDistance = 0
	self:StartThink(0.2, "BleedShock")
end
function l.prototype.OnThink(self, m)
	if m ~= "BleedShock" then
		return -1
	end
	local n = self:GetSpecialValueFor("distance")
	local o = self:GetSpecialValueFor("radius")
	local p = self:GetSpecialValueFor("factor")
	local q = self:GetCaster()
	if not IsValid(q) then
		self.moveDistance = 0
		self.lastOrigin = nil
		return
	end
	local r = q:GetAbsOrigin()
	if self.lastOrigin ~= nil then
		self.moveDistance = self.moveDistance + CalcDistance(self.lastOrigin, r)
	end
	self.lastOrigin = r
	if self.moveDistance >= n and self:IsCooldownReady() then
		self.moveDistance = 0
		self:StartCooldown(self:GetSpecialValueFor("cd"))
		local s = FindEnemiesInRadius(q, r, o)
		for t, u in ipairs(s) do
			if u:IsBleed() then
				u:TriggerBleed(q, p * 0.01)
			end
		end
		local v =
			ParticleManager:CreateParticle("particles/items3_fx/blink_overwhelming_burst.vpcf", PATTACH_CUSTOMORIGIN, q)
		ParticleManager:SetParticleControl(v, 0, r)
		ParticleManager:SetParticleControl(v, 1, Vector(o, o, o))
		ParticleManager:ReleaseParticleIndex(v)
		q:EmitSound("Blink_Layer.Overwhelming")
	end
end
l = e({ h, k(nil) }, l)
return f