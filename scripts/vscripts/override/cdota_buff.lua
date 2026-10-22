--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "override/CDOTA_Buff"
CDOTA_Buff.GetAbilitySpecialValueFor = function(self, b, c)
	if not IsValid(self) then
		return 0
	end
	local d = self.ability or self:GetAbility()
	if not IsValid(d) then
		local e = self[b]
		if e == nil then
			e = 0
		end
		return e
	end
	local f = d:GetLevel() - 1
	if f == -1 then
		return 0
	end
	local g = c or d:GetCaster()
	if not IsValid(g) then
		g = self:GetCaster()
	end
	if not IsValid(g) then
		return 0
	end
	return d:GetSpecialValueFor(b, g)
end
CDOTA_Buff.GetAbilityLevelSpecialValueFor = function(self, b, h)
	if not IsValid(self) then
		return 0
	end
	local d = self.ability or self:GetAbility()
	if not IsValid(d) then
		local i = self[b]
		if i == nil then
			i = 0
		end
		return i
	end
	return d:GetLevelSpecialValueFor(b, h)
end
CDOTA_Buff.PRD = function(self, j, k)
	return PRD(nil, self:GetCaster(), j, k or self:GetName())
end
if CDOTA_Buff.IncrementStackCount_Engine == nil then
	CDOTA_Buff.IncrementStackCount_Engine = CDOTA_Buff.IncrementStackCount
end
CDOTA_Buff.IncrementStackCount = function(self, l)
	if l == nil then
		self:IncrementStackCount_Engine()
	else
		self:SetStackCount(self:GetStackCount() + l)
	end
end
if CDOTA_Buff.DecrementStackCount_Engine == nil then
	CDOTA_Buff.DecrementStackCount_Engine = CDOTA_Buff.DecrementStackCount
end
CDOTA_Buff.DecrementStackCount = function(self, l)
	if l == nil then
		self:DecrementStackCount_Engine()
	else
		self:SetStackCount(self:GetStackCount() - l)
	end
end
CDOTA_Buff.StartThink = function(self, m, n, o)
	if IsServer() then
		if type(n) == "function" and o == nil then
			o = n
			n = nil
		end
		local p = n
		if p == nil then
			p = DoUniqueString("StartThink")
		end
		local q = p
		if self._ThinkList == nil then
			self._ThinkList = {}
		end
		if m == -1 then
			if self._ThinkList[q] then
				Timer:StopTimer(self._ThinkList[q])
				self._ThinkList[q] = nil
			end
			return
		end
		if self._ThinkList[q] ~= nil then
			Timer:StopTimer(self._ThinkList[q])
		end
		local r
		r = Timer:StartIntervalThink(self, m, function()
			local s
			if o ~= nil then
				s = o(self, q)
			elseif self.OnThink ~= nil then
				s = self:OnThink(q)
			end
			if self._ThinkList[q] ~= r then
				return -1
			end
			if s == -1 then
				Timer:StopTimer(self._ThinkList[q])
				self._ThinkList[q] = nil
			end
			return s
		end)
		self._ThinkList[q] = r
	end
end
CDOTA_Buff.AddStackCountDuration = function(self, l, t, u, o)
	if u == nil then
		u = -1
	end
	if type(l) ~= "number" then
		return
	end
	if l <= 0 then
		return
	end
	if t <= 0 then
		return
	end
	if self.__dynamicStack == nil then
		self.__dynamicStack = 0
	end
	if self.__dynamicStackData == nil then
		self.__dynamicStackData = {}
	end
	if u > 0 then
		l = math.min(l, u)
	end
	local v = self:GetStackCount() - self.__dynamicStack
	local w = self.__dynamicStack + l
	if u > 0 and w > u then
		local x = w - u
		while #self.__dynamicStackData > 0 do
			local y = self.__dynamicStackData[1]
			if x > y.StackCount then
				w = w - y.StackCount
				x = x - y.StackCount
				if y.callback ~= nil then
					y:callback(y.StackCount)
				end
				table.remove(self.__dynamicStackData, 1)
			else
				w = w - x
				y.StackCount = y.StackCount - x
				if y.callback ~= nil then
					y:callback(x)
				end
				if y.StackCount == 0 then
					table.remove(self.__dynamicStackData, 1)
				end
				break
			end
		end
	end
	self.__dynamicStack = w
	local z = v + self.__dynamicStack
	if self:GetStackCount() ~= z then
		self:SetStackCount(z)
	end
	local A = GameRules:GetGameTime() + t
	local r = #self.__dynamicStackData + 1
	for B = #self.__dynamicStackData, 1, -1 do
		if A >= self.__dynamicStackData[B].DieTime then
			break
		end
		r = B
	end
	table.insert(self.__dynamicStackData, r, { DieTime = A, StackCount = l, callback = o })
	if #self.__dynamicStackData == 1 then
		self:GetParent():GameTimer(self:GetName() .. "_StackCountTimer", t, function()
			if not IsValid(self) then
				return
			end
			local C = GameRules:GetGameTime()
			while #self.__dynamicStackData > 0 and C >= self.__dynamicStackData[1].DieTime do
				local v = self:GetStackCount() - self.__dynamicStack
				self.__dynamicStack = self.__dynamicStack - self.__dynamicStackData[1].StackCount
				if self.__dynamicStackData[1].callback ~= nil then
					self.__dynamicStackData[1]:callback(self.__dynamicStackData[1].StackCount)
				end
				self:SetStackCount(v + self.__dynamicStack)
				table.remove(self.__dynamicStackData, 1)
			end
			if #self.__dynamicStackData > 0 then
				return self.__dynamicStackData[1].DieTime - C
			end
		end)
	end
end
CDOTA_Buff.RemoveStackCountDuration = function(self, l)
	if l <= 0 then
		return
	end
	if self.__dynamicStackData == nil then
		return
	end
	local D = 0
	local E
	local C = GameRules:GetGameTime()
	while #self.__dynamicStackData > 0 and l > 0 do
		local y = self.__dynamicStackData[1]
		if y.StackCount > l then
			y.StackCount = y.StackCount - l
			D = D + l
			l = 0
			if y.callback ~= nil then
				y:callback(l)
			end
		else
			D = D + y.StackCount
			l = l - y.StackCount
			if y.callback ~= nil then
				y:callback(y.StackCount)
			end
			table.remove(self.__dynamicStackData, 1)
			if #self.__dynamicStackData > 0 then
				E = self.__dynamicStackData[1].DieTime - C
			else
				E = -1
			end
		end
	end
	if E ~= nil then
		if E > 0 then
			self:GetParent():GameTimer(self:GetName() .. "_StackCountTimer", E, function()
				if not IsValid(self) then
					return
				end
				local C = GameRules:GetGameTime()
				while #self.__dynamicStackData > 0 and C >= self.__dynamicStackData[1].DieTime do
					local v = self:GetStackCount() - self.__dynamicStack
					self.__dynamicStack = self.__dynamicStack - self.__dynamicStackData[1].StackCount
					if self.__dynamicStackData[1].callback ~= nil then
						self.__dynamicStackData[1]:callback(self.__dynamicStackData[1].StackCount)
					end
					self:SetStackCount(v + self.__dynamicStack)
					table.remove(self.__dynamicStackData, 1)
				end
				if #self.__dynamicStackData > 0 then
					return self.__dynamicStackData[1].DieTime - C
				end
			end)
		else
			self:GetParent():StopTimer(self:GetName() .. "_StackCountTimer")
		end
	end
	if D > 0 then
		local v = self:GetStackCount() - self.__dynamicStack
		self.__dynamicStack = self.__dynamicStack - D
		self:SetStackCount(v + self.__dynamicStack)
	end
end