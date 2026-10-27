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
	for i = 1, #self do
		if g(h, self[i], i - 1, self) then
			return true
		end
	end
	return false
end
local j = {}
local k = {}
local function l(m, n)
	if type(m) ~= "string" or m == "" then
		return
	end
	local o, p = string.match(m, "^([%w%.%-]+):(%d+)$")
	local q = tonumber(p)
	if not o or not q or q < 1 or q > 65535 or not f(a(n), function(r, e)
		return n[e] == m
	end) then
		return
	end
	return { address = o, port = q }
end
local function s(o, q, n)
	if type(o) ~= "string" or o == "" then
		return
	end
	local t = l(o, n)
	if t then
		return t
	end
	if type(q) ~= "number" or q % 1 ~= 0 then
		return
	end
	return l((o .. ":") .. tostring(q), n)
end
function j.RegisterPlatformRequests()
	local u
	local v
	ListenToGameEvent("server_spawn", function(w)
		if w.mapname == "platform_lobby" then
			u = { address = w.address, port = w.port }
		end
	end, nil)
	CustomGameEventManager:RegisterListener("platform_lobby_identity_query", function(x)
		local y = EntIndexToHScript(x)
		if not y or not y.GetPlayerID or PlayerResource:GetPlayer(y:GetPlayerID()) ~= y then
			return
		end
		local n = LoadKeyValues("scripts/platform_routing.txt") or {}
		local z = l
		local A = _G.PlatformLobbyConfig
		local B = z(A and A.lobbyAddress, n)
		if not B and u then
			B = s(u.address, u.port, n)
		end
		if not B and Convars.GetStr and Convars.GetInt then
			local q = Convars:GetInt("hostport")
			B = s(Convars:GetStr("net_public_adr"), q, n)
			if not B then
				B = s(Convars:GetStr("ip"), q, n)
			end
		end
		local C = B and (B.address .. ":") .. tostring(B.port) or ""
		if C ~= v then
			print(
				B and "[platform] Lobby identity endpoint: " .. C
					or "[platform] Lobby identity unavailable: set PlatformLobbyConfig.lobbyAddress to a configured public endpoint"
			)
			v = C
		end
		if B then
			CustomGameEventManager:Send_ServerToPlayer(y, "platform_lobby_identity", B)
		end
	end)
	CustomGameEventManager:RegisterListener("platform_request", function(x, w)
		local y = EntIndexToHScript(x)
		if y == nil or y.GetPlayerID == nil then
			return
		end
		local D = y:GetPlayerID()
		local E = PlayerResource:GetPlayer(D) ~= y
		if not E then
			local F = k[D]
			E = (F and F.player) == y
		end
		if E then
			return
		end
		if
			type(w.id) ~= "string"
			or #w.id > 32
			or type(w.path) ~= "string"
			or #w.path > 1024
			or type(w.body) ~= "string"
			or #w.body > 6000
		then
			return
		end
		local G = _G.PlatformLobbyConfig
		if G == nil and IsInToolsMode() and not IsDedicatedServer() then
			local H = LoadKeyValues("scripts/eom_platform.txt")
			if H and H.addon then
				G = { url = "http://127.0.0.1:28962/request", token = "tools-local", addon = H.addon }
			end
		end
		if G == nil then
			print("[platform] Request unavailable: PlatformLobbyConfig is missing")
			CustomGameEventManager:Send_ServerToPlayer(
				y,
				"platform_response",
				{ id = w.id, addon = "", status = 503, data = '{"error":"INVENTORY_UNAVAILABLE"}', step = 0, done = 1 }
			)
			return
		end
		local I = json.decode(w.body)
		if I == nil then
			return
		end
		local J = tostring(PlayerResource:GetSteamID(D))
		local K = { player = y }
		k[D] = K
		local L = CreateHTTPRequestScriptVM("POST", G.url)
		L:SetHTTPRequestHeaderValue("Authorization", "Bearer " .. G.token)
		L:SetHTTPRequestHeaderValue(
			"Accept-Language",
			w.language == "schinese" and "zh-Hans" or (w.language == "russian" and "ru" or "en")
		)
		L:SetHTTPRequestRawPostBody(
			"application/json",
			json.encode({ steamId = J, method = w.method, path = w.path, body = I })
		)
		L:SetHTTPRequestAbsoluteTimeoutMS(12000)
		L:Send(function(M)
			if k[D] == K then
				k[D] = nil
			end
			if PlayerResource:GetPlayer(D) ~= y or tostring(PlayerResource:GetSteamID(D)) ~= J then
				return
			end
			local N = IsInToolsMode()
					and (not M.StatusCode or M.StatusCode < 100)
					and '{"error":"TOOLS_BRIDGE_UNAVAILABLE"}'
				or '{"error":"ROOM_STATUS_UNKNOWN"}'
			local O = type(M.Body) == "string" and #M.Body > 0 and #M.Body <= 262144 and M.Body or N
			local P = 1
			local Q = 0
			GameRules:GetGameModeEntity()
				:SetContextThink((("platform_response_" .. tostring(D)) .. "_") .. w.id, function()
					if PlayerResource:GetPlayer(D) ~= y or tostring(PlayerResource:GetSteamID(D)) ~= J then
						return
					end
					local R = math.min(P + 3999, #O)
					while R < #O do
						local S = string.byte(O, R + 1)
						if S < 128 or S >= 192 then
							break
						end
						R = R - 1
					end
					local T = R >= #O and 1 or 0
					CustomGameEventManager:Send_ServerToPlayer(
						y,
						"platform_response",
						{ id = w.id, addon = G.addon, status = M.StatusCode or 503, data = string.sub(O, P, R), step = Q, done = T }
					)
					Q = Q + 1
					P = R + 1
					local U
					if T == 1 then
						U = nil
					else
						U = 0.03
					end
					return U
				end, 0)
		end)
	end)
end
return j