--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "framework/timer"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__ObjectKeys
local f = b.__TS__Delete
local g = b.__TS__DecorateLegacy
local h = b.__TS__New
local i = {}
local j = require("lib.tstl-utils")
local k = j.reloadable
local l = c()
l.name = "CTimer"
d(l, CModule)
function l.prototype.____constructor(self, ...)
	CModule.prototype.____constructor(self, ...)
	self.index = 1
	self.timerList = {}
	self.activeTimerIds = {}
	self.removedTimerCount = 0
	self.record = 0
end
function l.prototype.EnsureTimerStorage(self)
	if self.timerList == nil then
		self.timerList = {}
	end
	if self.activeTimerIds == nil then
		self.activeTimerIds = {}
		for m, n in ipairs(e(self.timerList)) do
			if self.timerList[n] ~= nil then
				local o = self.activeTimerIds
				o[#o + 1] = n
			end
		end
	end
	if self.removedTimerCount == nil then
		self.removedTimerCount = 0
	end
end
function l.prototype.RemoveTimerById(self, n)
	if self.timerList[n] ~= nil then
		f(self.timerList, n)
		self.removedTimerCount = self.removedTimerCount + 1
	end
end
function l.prototype.CompactActiveTimerIds(self)
	if self.removedTimerCount <= 0 then
		return
	end
	if self.removedTimerCount < 64 and self.removedTimerCount * 2 < #self.activeTimerIds then
		return
	end
	local p = {}
	for m, n in ipairs(self.activeTimerIds) do
		if self.timerList[n] ~= nil then
			p[#p + 1] = n
		end
	end
	self.activeTimerIds = p
	self.removedTimerCount = 0
end
function l.prototype.Think(self)
	self:EnsureTimerStorage()
	self.record = self.record + 1
	local q = FrameTime()
	local r
	if IsServer() then
		r = GameRules:IsGamePaused()
	else
		r = false
	end
	local s = r
	for t = #self.activeTimerIds, 1, -1 do
		do
			local n = self.activeTimerIds[t]
			local u = self.timerList[n]
			if u == nil then
				goto v
			end
			if s and (u.type == "GameTimer" or u.type == "Modifier") then
				goto v
			end
			if u.entity ~= nil and not IsValid(u.entity) then
				self:RemoveTimerById(n)
				goto v
			end
			u.stack = u.stack + q
			if u.stack >= u.interval then
				local w, x = xpcall(u.callback, traceback, u.entity or self)
				if self.timerList[n] ~= u then
					goto v
				end
				if type(x) == "number" then
					u.stack = u.stack - u.interval
					u.interval = math.max(x, FrameTime())
				elseif u.type == "Modifier" then
					u.stack = u.stack - u.interval
				else
					self:RemoveTimerById(n)
				end
			end
		end
		::v::
	end
	self:CompactActiveTimerIds()
end
function l.prototype.init(self, y)
	if not y then
		if IsServer() then
			self.logicTimer = SpawnEntityFromTableSynchronous("logic_timer", { origin = "0 0 0", RefireTime = 0 })
			local z = self.logicTimer:GetOrCreatePrivateScriptScope()
			z.OnTimer = function()
				self:Think()
			end
			self.logicTimer:RedirectOutput("OnTimer", "OnTimer", self.logicTimer)
		end
		if IsClient() then
			SpawnEntityFromTableAsynchronous(
				"prop_dynamic",
				{ origin = "0 0 0", model = "models/development/invisiblebox.vmdl" },
				function(A)
					A:SetContextThink(DoUniqueString("Timer"), function()
						self:Think()
						return FrameTime()
					end, 0)
				end,
				nil
			)
		end
	end
end
function l.prototype.StartThink(self, B, C, D, E)
	self:EnsureTimerStorage()
	D = math.max(D, FrameTime())
	local n = tostring(self.index)
	self.timerList[n] = { interval = D, stack = 0, type = B, entity = C, callback = E }
	local F = self.activeTimerIds
	F[#F + 1] = n
	self.index = self.index + 1
	return n
end
function l.prototype.Timer(self, C, D, E)
	if E == nil then
		E = D
		D = C
		C = nil
	end
	return self:StartThink("Timer", C, D, E)
end
function l.prototype.GameTimer(self, C, D, E)
	if E == nil then
		E = D
		D = C
		C = nil
	end
	return self:StartThink("GameTimer", C, D, E)
end
function l.prototype.StartIntervalThink(self, C, x, G, H)
	local I = math.max(x, FrameTime())
	local n
	n = self:StartThink("GameTimer", C, I, function()
		if H ~= nil and not H() then
			self:StopTimer(n)
			return
		end
		local J = G()
		if J == -1 then
			self:StopTimer(n)
			return
		end
		if type(J) == "number" and J >= 0 then
			I = math.max(J, FrameTime())
		end
		return I
	end)
	return n
end
function l.prototype.StopTimer(self, K)
	self:EnsureTimerStorage()
	self:RemoveTimerById(tostring(K))
end
function l.prototype.RestartTimer(self, K)
	self:EnsureTimerStorage()
	local n = tostring(K)
	if self.timerList[n] then
		self.timerList[n].stack = 0
	end
end
l = g({ k }, l)
if Timer == nil then
	Timer = h(l)
end
return i