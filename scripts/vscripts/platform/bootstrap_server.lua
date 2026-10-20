--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "platform/bootstrap_server"
local b = require("lualib_bundle")
local c = b.__TS__SourceMapTraceBack
c(
	debug.getinfo(1).short_src,
	{
		["4"] = 22,
		["5"] = 23,
		["6"] = 23,
		["7"] = 23,
		["8"] = 24,
		["9"] = 25,
		["12"] = 26,
		["13"] = 27,
		["15"] = 27,
		["16"] = 27,
		["18"] = 27,
		["21"] = 28,
		["24"] = 29,
		["25"] = 30,
		["26"] = 31,
		["27"] = 32,
		["28"] = 32,
		["29"] = 32,
		["30"] = 32,
		["31"] = 32,
		["32"] = 32,
		["33"] = 32,
		["34"] = 32,
		["37"] = 35,
		["38"] = 36,
		["41"] = 37,
		["42"] = 38,
		["43"] = 39,
		["44"] = 40,
		["45"] = 41,
		["46"] = 42,
		["47"] = 43,
		["48"] = 43,
		["49"] = 43,
		["50"] = 43,
		["51"] = 44,
		["52"] = 45,
		["53"] = 46,
		["54"] = 46,
		["56"] = 47,
		["59"] = 48,
		["60"] = 49,
		["61"] = 50,
		["62"] = 51,
		["63"] = 52,
		["64"] = 52,
		["65"] = 52,
		["66"] = 53,
		["69"] = 54,
		["70"] = 55,
		["71"] = 56,
		["72"] = 57,
		["75"] = 58,
		["77"] = 60,
		["78"] = 61,
		["79"] = 61,
		["80"] = 61,
		["81"] = 61,
		["82"] = 61,
		["83"] = 61,
		["84"] = 61,
		["85"] = 61,
		["86"] = 61,
		["87"] = 61,
		["88"] = 61,
		["89"] = 61,
		["90"] = 62,
		["91"] = 63,
		["92"] = 64,
		["93"] = 64,
		["94"] = 64,
		["96"] = 64,
		["98"] = 64,
		["99"] = 52,
		["100"] = 52,
		["101"] = 52,
		["102"] = 45,
		["103"] = 23,
		["104"] = 23,
		["105"] = 22,
		["106"] = 2,
		["107"] = 3,
		["108"] = 4,
		["109"] = 6,
		["110"] = 7,
		["111"] = 8,
		["112"] = 8,
		["113"] = 8,
		["114"] = 8,
		["115"] = 9,
		["116"] = 10,
		["117"] = 11,
		["118"] = 12,
		["119"] = 13,
		["121"] = 15,
		["122"] = 16,
		["124"] = 6,
		["125"] = 20,
	}
)
function RegisterPlatformRequests()
	CustomGameEventManager:RegisterListener("platform_request", function(d, e)
		local f = EntIndexToHScript(d)
		if f == nil or f.GetPlayerID == nil then
			return
		end
		local g = f:GetPlayerID()
		local h = PlayerResource:GetPlayer(g) ~= f
		if not h then
			local i = platformPending[g]
			h = (i and i.player) == f
		end
		if h then
			return
		end
		if
			type(e.id) ~= "string"
			or #e.id > 32
			or type(e.path) ~= "string"
			or #e.path > 1024
			or type(e.body) ~= "string"
			or #e.body > 6000
		then
			return
		end
		local j = _G.PlatformLobbyConfig
		if j == nil then
			print("[platform] Request unavailable: PlatformLobbyConfig is missing")
			CustomGameEventManager:Send_ServerToPlayer(
				f,
				"platform_response",
				{ id = e.id, addon = "", status = 503, data = '{"error":"INVENTORY_UNAVAILABLE"}', step = 0, done = 1 }
			)
			return
		end
		local k = json.decode(e.body)
		if k == nil then
			return
		end
		local l = tostring(PlayerResource:GetSteamID(g))
		local m = { player = f }
		platformPending[g] = m
		local n = CreateHTTPRequestScriptVM("POST", j.url)
		n:SetHTTPRequestHeaderValue("Authorization", "Bearer " .. j.token)
		n:SetHTTPRequestHeaderValue(
			"Accept-Language",
			e.language == "english" and "en" or (e.language == "russian" and "ru" or "zh-Hans")
		)
		n:SetHTTPRequestRawPostBody(
			"application/json",
			json.encode({ steamId = l, method = e.method, path = e.path, body = k })
		)
		n:SetHTTPRequestAbsoluteTimeoutMS(12000)
		n:Send(function(o)
			if platformPending[g] == m then
				platformPending[g] = nil
			end
			if PlayerResource:GetPlayer(g) ~= f or tostring(PlayerResource:GetSteamID(g)) ~= l then
				return
			end
			local p = IsInToolsMode()
					and (not o.StatusCode or o.StatusCode < 100)
					and '{"error":"TOOLS_BRIDGE_UNAVAILABLE"}'
				or '{"error":"ROOM_STATUS_UNKNOWN"}'
			local q = type(o.Body) == "string" and #o.Body > 0 and #o.Body <= 262144 and o.Body or p
			local r = 1
			local s = 0
			GameRules:GetGameModeEntity()
				:SetContextThink((("platform_response_" .. tostring(g)) .. "_") .. e.id, function()
					if PlayerResource:GetPlayer(g) ~= f or tostring(PlayerResource:GetSteamID(g)) ~= l then
						return
					end
					local t = math.min(r + 3999, #q)
					while t < #q do
						local u = string.byte(q, t + 1)
						if u < 128 or u >= 192 then
							break
						end
						t = t - 1
					end
					local v = t >= #q and 1 or 0
					CustomGameEventManager:Send_ServerToPlayer(
						f,
						"platform_response",
						{ id = e.id, addon = j.addon, status = o.StatusCode or 503, data = string.sub(q, r, t), step = s, done = v }
					)
					s = s + 1
					r = t + 1
					local w
					if v == 1 then
						w = nil
					else
						w = 0.03
					end
					return w
				end, 0)
		end)
	end)
end
GameRules:SetCustomGameSetupAutoLaunchDelay(999)
GameRules:EnableCustomGameSetupAutoLaunch(false)
GameRules:SetCustomGameSetupTimeout(-1)
function ActivatePlatform()
	GameRules:SetCustomGameSetupRemainingTime(-1)
	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, GetMapName() == "platform_entry" and 1 or 24)
	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 0)
	if GetMapName() == "platform_lobby" and (IsDedicatedServer() or IsInToolsMode()) then
		if IsInToolsMode() and _G.PlatformLobbyConfig == nil then
			_G.PlatformLobbyConfig =
				{ url = "http://127.0.0.1:28962/request", token = "tools-local", addon = "2852945816" }
			print("[platform] Tools backend: http://127.0.0.1:28962/request")
		end
		RegisterPlatformRequests()
		print("[platform] Lobby requests registered")
	end
end
platformPending = {}