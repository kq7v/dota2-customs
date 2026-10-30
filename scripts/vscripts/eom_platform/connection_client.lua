--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local function a(b)
	local c = {}
	local d = 0
	for e in pairs(b) do
		d = d + 1
		c[d] = e
	end
	return c
end
local function f(self, g, h)
	local c = {}
	local d = 0
	for i = 1, #self do
		if g(h, self[i], i - 1, self) then
			d = d + 1
			c[d] = self[i]
		end
	end
	return c
end
local function j(self, k)
	if k ~= nil then
		table.sort(self, function(l, m)
			return k(nil, l, m) < 0
		end)
	else
		table.sort(self)
	end
	return self
end
local function n(self, o, h)
	for i = 1, #self do
		local p = self[i]
		if o(h, p, i - 1, self) then
			return p
		end
	end
	return nil
end
local q = {}
local r, s
function r()
	return _G.EOMPlatformConnection
end
function s()
	local t = r()
	if not t then
		return
	end
	FireGameEventLocal(
		"client_side_event",
		{
			event_name = "platform_connection_status",
			event_data = json.encode({
				map = t.map,
				phase = t.phase,
				mode = "auto",
				region = t.region,
				language = t.language,
				currentRegion = t.currentRegion,
				serverAddress = t.serverAddress,
			}),
		}
	)
end
function q.Exit()
	local t = r()
	if not t then
		return
	end
	t.phase = "exited"
	s()
	if t.listener ~= nil then
		StopListeningToGameEvent(t.listener)
	end
	if t.spawnListener ~= nil then
		StopListeningToGameEvent(t.spawnListener)
	end
	_G.EOMPlatformConnection = nil
end
local function u(v)
	if type(v) ~= "string" then
		return
	end
	local w, x = string.match(v, "^([%w%.%-]+):(%d+)$")
	local y = tonumber(x)
	if not w or not y or y < 1 or y > 65535 then
		return
	end
	return v
end
local function v(z)
	local A = LoadKeyValues("scripts/platform_routing.txt")
	local B = u(A and A[z])
	if B then
		return B
	end
	if z == "china" then
		return u(A and A.lobby_address)
	end
	if z == "overseas" then
		return u(A and A.overseas_lobby_address)
	end
	if z == "overseas2" then
		return u(A and A.overseas2_lobby_address)
	end
end
local function C()
	return LoadKeyValues("scripts/eom_platform.txt")
end
local function D()
	local A = LoadKeyValues("scripts/platform_routing.txt")
	return j(f(a(A or {}), function(E, e)
		return u(A[e]) ~= nil
	end))
end
local function F()
	local G = C()
	local H = G and G.connection_region
	return H and v(H) and H or (D()[1] or "china")
end
local function I(w, y)
	local t = r()
	if not t or t.map ~= "platform_lobby" or type(w) ~= "string" or type(y) ~= "number" or y % 1 ~= 0 then
		return
	end
	local J = u((w .. ":") .. tostring(y))
	if not J then
		return
	end
	t.serverAddress = J
	t.currentRegion = n(D(), function(E, z)
		return v(z) == J
	end)
	s()
end
local function K(J, L, M)
	if L == nil then
		L = ""
	end
	if M == nil then
		M = false
	end
	local t = r()
	if not t or not J then
		return
	end
	if t.phase == "submitted" and (not M or t.submittedAt ~= nil and Time() - t.submittedAt < 2) then
		return
	end
	t.phase = "submitted"
	t.submittedAt = Time()
	print((("[platform] Connection submitted: " .. t.map) .. " -> ") .. J)
	s()
	SendToConsole(L == "" and 'password ""' or "password " .. L)
	SendToConsole("connect " .. J)
end
local function N()
	local O = 2
	local P = GameRules and GameRules.State_Get and GameRules:State_Get() or nil
	return type(P) == "number" and P >= O
end
local function Q()
	local t = r()
	if not t or t.map ~= "platform_entry" or t.phase == "submitted" or not N() then
		return
	end
	local R = D()
	if #R ~= 1 and not t.language then
		return
	end
	local H = t.language == "schinese" and "china" or (t.language == "russian" and "overseas2" or "overseas")
	t.region = #R == 1 and R[1] or (v(H) and H or F())
	t.automatic = true
	K(v(t.region))
end
function q.Initialize(S)
	local t = r()
	if not t or t.map ~= S then
		q.Exit()
		t = { map = S, phase = "waiting", automatic = false, region = F() }
		_G.EOMPlatformConnection = t
		t.listener = ListenToGameEvent("client_side_event", function(T)
			local U = r()
			if not U then
				return
			end
			if T.event_name == "platform_connection_query" then
				s()
			elseif T.event_name == "platform_server_endpoint" and U.map == "platform_lobby" then
				local V, W = pcall(function()
					local X = json.decode(T.event_data)
					return X
				end)
				if V and type(W) == "table" then
					local Y = W
					if Y then
						I(Y.address, Y.port)
					end
				end
			elseif T.event_name == "platform_route_query" then
				FireGameEventLocal(
					"client_side_event",
					{ event_name = "platform_route_status", event_data = json.encode({ available = v(F()) ~= nil }) }
				)
			elseif T.event_name == "platform_client_language" and U.map == "platform_entry" then
				if
					type(T.event_data) ~= "string"
					or not string.match(T.event_data, "^[a-z]+$")
					or #T.event_data > 32
				then
					return
				end
				U.language = T.event_data
				Q()
				s()
			elseif T.event_name == "platform_region_select" and U.map == "platform_lobby" then
				if v(T.event_data) and v(T.event_data) ~= U.serverAddress then
					if U.phase == "submitted" and U.submittedAt ~= nil and Time() - U.submittedAt < 2 then
						return
					end
					U.region = T.event_data
					K(v(U.region), "", true)
				end
			elseif
				T.event_name == "platform_entry_retry"
				and U.map == "platform_entry"
				and U.phase == "submitted"
				and N()
			then
				K(v(U.region), "", true)
			elseif T.event_name == "platform_return" and U.map ~= "platform_entry" and U.map ~= "platform_lobby" then
				K(v(F()), "", true)
			elseif T.event_name == "platform_connect" and U.map == "platform_lobby" then
				local V, W = pcall(function()
					local X = json.decode(T.event_data)
					return X
				end)
				if not V then
					return
				end
				if type(W) ~= "table" then
					return
				end
				local Z = W
				if not Z or type(Z.password) ~= "string" or #Z.password > 128 then
					return
				end
				local L = string.match(Z.password, "^[%w]+$")
				if L then
					K(u(Z.address), L, true)
				end
			end
		end, nil)
		t.spawnListener = ListenToGameEvent("server_spawn", function(T)
			if T.mapname == "platform_lobby" then
				I(T.address, T.port)
			end
		end, nil)
	end
	if t.phase == "waiting" and N() then
		t.phase = "ready"
		s()
	end
	Q()
end
return q