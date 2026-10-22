--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/privilege/privilege_weapon_027"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__ArraySplice
local f = b.__TS__DecorateLegacy
local g = {}
local h = require("abilities.eom_privilege")
local i = h.EOMPrivilege
local j = h.RegisterPrivilege
local k = c()
k.name = "privilege_weapon_027"
d(k, i)
function k.prototype.____constructor(self, ...)
	i.prototype.____constructor(self, ...)
	self.stackExpireTimes = {}
	self.maxStacks = 4
	self.stackDuration = 12
end
function k.prototype.OnCreated(self)
	self.maxStacks = self:GetSpecialValueFor("max_stack")
	self.stackDuration = self:GetSpecialValueFor("duration")
end
function k.prototype.OnRefresh(self)
	self.maxStacks = self:GetSpecialValueFor("max_stack")
	self.stackDuration = self:GetSpecialValueFor("duration")
end
function k.prototype.EventListener(self)
	return {
		ability_cast_complete = function(l, m)
			if m.abilityTag ~= AbilityTag.Attack and m.caster == self:GetCaster() then
				self:TryAddStack()
			end
		end,
	}
end
function k.prototype.StaticProperty(self)
	return { [PropertyFunction.CRIT_DAMAGE] = self:GetStackCount() * self:GetSpecialValueFor("crit_damage") }
end
function k.prototype.TryAddStack(self)
	if self:GetStackCount() >= self.maxStacks then
		return
	end
	self:IncrementStackCount()
	local n = self.stackExpireTimes
	n[#n + 1] = GameRules:GetGameTime() + self.stackDuration
	if self._ThinkList.expire_check == nil then
		self:StartThink(0.3, "expire_check")
	end
end
function k.prototype.OnThink(self, o)
	if o ~= "expire_check" then
		return -1
	end
	local p = GameRules:GetGameTime()
	local q = false
	do
		local r = #self.stackExpireTimes - 1
		while r >= 0 do
			if p >= self.stackExpireTimes[r + 1] then
				e(self.stackExpireTimes, r, 1)
				self:DecrementStackCount()
				q = true
			end
			r = r - 1
		end
	end
	if q then
		self:RefreshStaticProperty()
	end
	if #self.stackExpireTimes == 0 then
		return -1
	end
end
k = f({ j(nil) }, k)
return g