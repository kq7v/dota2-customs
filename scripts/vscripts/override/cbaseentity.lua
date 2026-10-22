--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "override/CBaseEntity"
BaseEntity = IsServer() and CBaseEntity or C_BaseEntity
BaseEntity.IsAbility = function(self)
	return false
end
BaseEntity.SaveData = function(self, b, c)
	if self._saveData_ == nil then
		self._saveData_ = {}
	end
	self._saveData_[b] = c
end
BaseEntity.LoadData = function(self, b, d)
	local e = self._saveData_
	local f = e and e[b]
	if f == nil then
		f = d
	end
	return f
end
BaseEntity.Timer = function(self, g, h, i)
	if i == nil then
		i = h
		h = g
		g = DoUniqueString("Timer")
	end
	return Timer:GameTimer(self, h, i)
end
BaseEntity.GameTimer = function(self, g, h, i)
	if i == nil then
		i = h
		h = g
		g = DoUniqueString("GameTimer")
	end
	return self:Timer(g, h, i)
end
BaseEntity.StopTimer = function(self, g)
	Timer:StopTimer(g)
end
if IsServer() then
	CBaseEntity.StartThink = function(self, j, k, l)
		if type(k) == "function" then
			l = k
			k = nil
		end
		local m = k
		if m == nil then
			m = DoUniqueString("StartThink")
		end
		local n = m
		if self._ThinkList == nil then
			self._ThinkList = {}
		end
		if j == -1 then
			if self._ThinkList[n] then
				Timer:StopTimer(self._ThinkList[n])
				self._ThinkList[n] = nil
			end
			return n
		end
		if self._ThinkList[n] ~= nil then
			Timer:StopTimer(self._ThinkList[n])
		end
		local o
		o = Timer:StartIntervalThink(self, j, function()
			local p
			if l ~= nil then
				p = l(self, n)
			elseif self.OnThink ~= nil then
				p = self:OnThink(n)
			end
			if self._ThinkList[n] ~= o then
				return -1
			end
			if p == -1 then
				Timer:StopTimer(self._ThinkList[n])
				self._ThinkList[n] = nil
			end
			return p
		end)
		self._ThinkList[n] = o
		return n
	end
end
if IsClient() then
	C_BaseEntity.GameTimer = function(self, g, h, i)
		if i == nil then
			i = h
			h = g
			g = DoUniqueString("GameTimer")
		end
		return self:Timer(g, h, i)
	end
	C_BaseEntity.StopTimer = function(self, g)
		self:SetContextThink(g, nil, -1)
	end
end