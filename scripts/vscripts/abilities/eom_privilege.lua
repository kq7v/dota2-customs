--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/eom_privilege"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ArrayIncludes
local e = b.__TS__Delete
local f = b.__TS__New
local g = b.__TS__ObjectKeys
local h = {}
local i, j
function i(self, k, l)
	if j[k] then
	end
	j[k] = l
end
local m = {}
local function n(self, o, p, q)
	local r = o.name or tostring(o)
	local s = m[r]
	if s == nil then
		s = {}
		m[r] = s
	end
	local t = -1
	do
		local u = 0
		while u < #s do
			if s[u + 1].propertyKey == p then
				t = u
				break
			end
			u = u + 1
		end
	end
	if t ~= -1 then
		s[t + 1].specialValueKey = q
	else
		s[#s + 1] = { propertyKey = p, specialValueKey = q }
	end
end
function h.collectPrivilegeValueEntries(self, o)
	local v = {}
	local w = o
	while w ~= nil do
		local r = w.name or tostring(w)
		local s = m[r]
		if s ~= nil then
			do
				local u = 0
				while u < #s do
					local x = s[u + 1]
					local y = false
					do
						local z = 0
						while z < #v do
							if v[z + 1].propertyKey == x.propertyKey then
								y = true
								break
							end
							z = z + 1
						end
					end
					if not y then
						v[#v + 1] = x
					end
					u = u + 1
				end
			end
		end
		w = w.____super
	end
	return v
end
function h.PrivilegeValue(self, q)
	return function(A, B, p)
		local C = p
		local D = q or C
		local o = B.constructor
		if o ~= nil then
			n(nil, o, C, D)
		end
	end
end
h.EOMPrivilege = c()
local E = h.EOMPrivilege
E.name = "EOMPrivilege"
function E.prototype.____constructor(self, F, G, H, I, J)
	self.lastUseTime = 0
	self._bAlreadyDestroyed = false
	self._timerInterval = -1
	self._ThinkList = {}
	self.privilegeName = F
	self.playerID = H
	self.level = G
	self.caster = I
	self.specialValueOverrides = J
	self.__PrivilegeValueEntries = h.collectPrivilegeValueEntries(nil, self.constructor)
	local K = self:GetCaster()
	if IsServer() then
		if self.EventListener ~= nil then
			if self.__EventIDList == nil then
				self.__EventIDList = {}
			end
			for L, M in pairs(self:EventListener()) do
				local N = self.__EventIDList
				N[#N + 1] = Event:RegisterWithPriority(L, M, self:GetPriority())
			end
		end
		if K and self.StaticProperty ~= nil then
			for O, P in pairs(self:StaticProperty()) do
				if PROPERTY_MAP_REVERSE[O] then
					PropertySystem:AddStaticProperty(K:entindex(), PROPERTY_MAP_REVERSE[O], self.privilegeName, P)
				end
			end
		end
		if K and self.DynamicProperty ~= nil then
			for O, Q in pairs(self:DynamicProperty()) do
				if PROPERTY_MAP_REVERSE[O] then
					PropertySystem:RegisterDynamicProperty(K:entindex(), PROPERTY_MAP_REVERSE[O], self.privilegeName, Q)
				end
			end
		end
	end
	self:RefreshPrivilegeValues()
end
function E.prototype.OnCreated(self) end
function E.prototype.OnRefresh(self)
	self:RefreshPrivilegeValues()
end
function E.prototype.RefreshPrivilegeValues(self)
	if self.__PrivilegeValueEntries ~= nil then
		for A, x in ipairs(self.__PrivilegeValueEntries) do
			self[x.propertyKey] = self:GetSpecialValueFor(x.specialValueKey)
		end
	end
end
function E.prototype.OnDestroy(self)
	local I = self:GetCaster()
	if I then
		PropertySystem:RemoveStaticProperty(I:entindex(), self.privilegeName)
		PropertySystem:UnregisterDynamicProperty(I:entindex(), self.privilegeName)
	end
	if self.__EventIDList ~= nil then
		for u, R in ipairs(self.__EventIDList) do
			Event:Unregister(R)
		end
		self.__EventIDList = nil
	end
	self:StopAllThinks()
	self._bAlreadyDestroyed = true
end
function E.prototype.StartCooldown(self, S)
	self.lastUseTime = GameRules:GetGameTime() + S
end
function E.prototype.IsCooldownReady(self)
	if self.lastUseTime == 0 then
		return true
	end
	return GameRules:GetGameTime() >= self.lastUseTime
end
function E.prototype.GetCooldownTimeRemaining(self)
	if self.lastUseTime == 0 then
		return 0
	end
	local T = GameRules:GetGameTime()
	local U = self.lastUseTime - T
	return math.max(0, U)
end
function E.prototype.ResetCooldown(self)
	self.lastUseTime = 0
end
function E.prototype.IncrementStackCount(self, V, W)
	if self.__StackCount == nil then
		self.__StackCount = 0
	end
	self.__StackCount = self.__StackCount + (V or 1)
	self:RefreshStaticProperty()
end
function E.prototype.DecrementStackCount(self, V, W)
	if self.__StackCount == nil then
		self.__StackCount = 0
	end
	self.__StackCount = self.__StackCount - (V or 1)
	self:RefreshStaticProperty()
end
function E.prototype.SetStackCount(self, X, W)
	self.__StackCount = X
	self:RefreshStaticProperty()
end
function E.prototype.GetStackCount(self)
	return self.__StackCount or 0
end
function E.prototype.PRD(self, Y, Z)
	return PRD(nil, self, Y, Z or self.privilegeName)
end
function E.prototype.RefreshStaticProperty(self)
	local I = self:GetCaster()
	if not I then
		return
	end
	if self.StaticProperty ~= nil then
		for O, P in pairs(self:StaticProperty()) do
			if PROPERTY_MAP_REVERSE[O] then
				PropertySystem:AddStaticProperty(I:entindex(), PROPERTY_MAP_REVERSE[O], self.privilegeName, P)
			end
		end
	end
end
function E.prototype.GetCaster(self)
	if self.caster ~= nil and IsValid(self.caster) then
		return self.caster
	end
	return PlayerResource:GetSelectedHeroEntity(self.playerID)
end
function E.prototype.GetPlayerID(self)
	return self.playerID
end
function E.prototype.SetLevel(self, _)
	self.level = _
	self:OnRefresh()
end
function E.prototype.GetSpecialValueFor(self, a0)
	local a1 = self.specialValueOverrides
	local a2 = a1 and a1[a0]
	if a2 ~= nil then
		return a2
	end
	return Privilege:GetPrivilegeSpecialValue(self.privilegeName, self.level, a0, self:GetCaster())
end
function E.prototype.IsValidPrivilege(self)
	if self._bAlreadyDestroyed then
		return false
	end
	return true
end
function E.prototype.GetPriority(self)
	local a3 = toFiniteNumber
	local a4 = KeyValues.privilegeKv[self.privilegeName]
	if a4 ~= nil then
		a4 = a4.Priority
	end
	return a3(a4, 100)
end
function E.prototype.GetUnavailableArtifactNames(self)
	local a5 = self:GetCaster()
	if not IsValid(a5) then
		return {}
	end
	local a6 = {}
	for a7, a8 in pairs(KeyValues.items) do
		local a9 = toFiniteNumber(a8.Quantitylimit, 0)
		if a9 > 0 and a5:GetItemCount(a7) >= a9 then
			self:AppendExcludedArtifact(a6, a7)
		end
	end
	local aa = a5:GetAllItems()
	do
		local u = 0
		while u < #aa do
			do
				local ab = aa[u + 1]
				if not IsValid(ab) then
					goto ac
				end
				self:AppendUpgradeGroupArtifacts(a6, ab:GetAbilityName())
			end
			::ac::
			u = u + 1
		end
	end
	return a6
end
function E.prototype.AppendUpgradeGroupArtifacts(self, a6, a7)
	local ad = tostring
	local ae = KeyValues.items[a7]
	if ae ~= nil then
		ae = ae.UpgradeGroup
	end
	local af = ae
	if af == nil then
		af = ""
	end
	local ag = ad(af)
	if ag == "" then
		return
	end
	for ah, ai in pairs(KeyValues.items) do
		local aj = tostring
		local ak = ai.UpgradeGroup
		if ak == nil then
			ak = ""
		end
		if aj(ak) == ag then
			self:AppendExcludedArtifact(a6, ah)
		end
	end
end
function E.prototype.AppendExcludedArtifact(self, a6, a7)
	if not d(a6, a7) then
		a6[#a6 + 1] = a7
	end
end
function E.prototype.StartThink(self, al, am, an)
	if type(am) == "function" then
		an = am
		am = nil
	end
	local ao = am or DoUniqueString("PrivilegeThink")
	if not IsServer() then
		return ao
	end
	local ap = self._ThinkList[ao]
	if ap ~= nil then
		Timer:StopTimer(ap)
		e(self._ThinkList, ao)
	end
	if al == -1 then
		return ao
	end
	local aq
	aq = Timer:StartIntervalThink(nil, al, function()
		if not self:IsValidPrivilege() then
			if self._ThinkList[ao] == aq then
				e(self._ThinkList, ao)
			end
			return -1
		end
		local ar
		if an ~= nil then
			ar = an(nil, self, ao)
		else
			ar = self:OnThink(ao)
		end
		local as = ar
		if self._ThinkList[ao] ~= aq then
			return -1
		end
		if as == -1 then
			e(self._ThinkList, ao)
		end
		return as
	end)
	self._ThinkList[ao] = aq
	return ao
end
function E.prototype.OnThink(self, am) end
function E.prototype.StopAllThinks(self)
	for am, at in pairs(self._ThinkList) do
		Timer:StopTimer(at)
	end
	self._ThinkList = {}
end
h.RegisterPrivilege = function(A, k)
	return function(self, l)
		local am = k or l.name
		i(nil, am, l)
		return l
	end
end
j = {}
function h.CreatePrivilegeInstance(self, k, F, G, H, I, J)
	local au = j[k]
	if not au then
		print("[PrivilegeDecorator] Class not found: " .. k)
		return nil
	end
	local av = f(au, F, G, H, I, J)
	return av
end
function h.GetAllRegisteredPrivilegeNames(self)
	return g(j)
end
return h