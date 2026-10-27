--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ObjectKeys(obj)
	local result = {}
	local len = 0
	for key in pairs(obj) do
		len = len + 1
		result[len] = key
	end
	return result
end

local function __TS__ArraySome(self, callbackfn, thisArg)
	for i = 1, #self do
		if callbackfn(thisArg, self[i], i - 1, self) then
			return true
		end
	end
	return false
end
-- End of Lua Library inline imports
local ____exports = {}
---
-- @noSelfInFile *
local platformPending = {}
local function configuredEndpoint(value, routing)
	if type(value) ~= "string" or value == "" then
		return
	end
	local host, portText = string.match(value, "^([%w%.%-]+):(%d+)$")
	local port = tonumber(portText)
	if
		not host
		or not port
		or port < 1
		or port > 65535
		or not __TS__ArraySome(__TS__ObjectKeys(routing), function(____, key)
			return routing[key] == value
		end)
	then
		return
	end
	return { address = host, port = port }
end
local function engineEndpoint(host, port, routing)
	if type(host) ~= "string" or host == "" then
		return
	end
	local complete = configuredEndpoint(host, routing)
	if complete then
		return complete
	end
	if type(port) ~= "number" or port % 1 ~= 0 then
		return
	end
	return configuredEndpoint((host .. ":") .. tostring(port), routing)
end
function ____exports.RegisterPlatformRequests()
	local endpoint
	local lastIdentity
	ListenToGameEvent("server_spawn", function(event)
		if event.mapname == "platform_lobby" then
			endpoint = { address = event.address, port = event.port }
		end
	end, nil)
	CustomGameEventManager:RegisterListener("platform_lobby_identity_query", function(source)
		local player = EntIndexToHScript(source)
		if not player or not player.GetPlayerID or PlayerResource:GetPlayer(player:GetPlayerID()) ~= player then
			return
		end
		local routing = LoadKeyValues("scripts/platform_routing.txt") or {}
		local ____configuredEndpoint_2 = configuredEndpoint
		local ____opt_0 = _G.PlatformLobbyConfig
		local actual = ____configuredEndpoint_2(____opt_0 and ____opt_0.lobbyAddress, routing)
		if not actual and endpoint then
			actual = engineEndpoint(endpoint.address, endpoint.port, routing)
		end
		if not actual and Convars.GetStr and Convars.GetInt then
			local port = Convars:GetInt("hostport")
			actual = engineEndpoint(Convars:GetStr("net_public_adr"), port, routing)
			if not actual then
				actual = engineEndpoint(Convars:GetStr("ip"), port, routing)
			end
		end
		local identity = actual and (actual.address .. ":") .. tostring(actual.port) or ""
		if identity ~= lastIdentity then
			print(
				actual and "[platform] Lobby identity endpoint: " .. identity
					or "[platform] Lobby identity unavailable: set PlatformLobbyConfig.lobbyAddress to a configured public endpoint"
			)
			lastIdentity = identity
		end
		if actual then
			CustomGameEventManager:Send_ServerToPlayer(player, "platform_lobby_identity", actual)
		end
	end)
	CustomGameEventManager:RegisterListener("platform_request", function(source, event)
		local player = EntIndexToHScript(source)
		if player == nil or player.GetPlayerID == nil then
			return
		end
		local playerID = player:GetPlayerID()
		local ____temp_5 = PlayerResource:GetPlayer(playerID) ~= player
		if not ____temp_5 then
			local ____opt_3 = platformPending[playerID]
			____temp_5 = (____opt_3 and ____opt_3.player) == player
		end
		if ____temp_5 then
			return
		end
		if
			type(event.id) ~= "string"
			or #event.id > 32
			or type(event.path) ~= "string"
			or #event.path > 1024
			or type(event.body) ~= "string"
			or #event.body > 6000
		then
			return
		end
		local config = _G.PlatformLobbyConfig
		if config == nil and IsInToolsMode() and not IsDedicatedServer() then
			local settings = LoadKeyValues("scripts/eom_platform.txt")
			if settings and settings.addon then
				config = { url = "http://127.0.0.1:28962/request", token = "tools-local", addon = settings.addon }
			end
		end
		if config == nil then
			print("[platform] Request unavailable: PlatformLobbyConfig is missing")
			CustomGameEventManager:Send_ServerToPlayer(player, "platform_response", {
				id = event.id,
				addon = "",
				status = 503,
				data = '{"error":"INVENTORY_UNAVAILABLE"}',
				step = 0,
				done = 1,
			})
			return
		end
		local body = json.decode(event.body)
		if body == nil then
			return
		end
		local steamID = tostring(PlayerResource:GetSteamID(playerID))
		local pending = { player = player }
		platformPending[playerID] = pending
		local request = CreateHTTPRequestScriptVM("POST", config.url)
		request:SetHTTPRequestHeaderValue("Authorization", "Bearer " .. config.token)
		request:SetHTTPRequestHeaderValue(
			"Accept-Language",
			event.language == "schinese" and "zh-Hans" or (event.language == "russian" and "ru" or "en")
		)
		request:SetHTTPRequestRawPostBody(
			"application/json",
			json.encode({ steamId = steamID, method = event.method, path = event.path, body = body })
		)
		request:SetHTTPRequestAbsoluteTimeoutMS(12000)
		request:Send(function(response)
			if platformPending[playerID] == pending then
				platformPending[playerID] = nil
			end
			if
				PlayerResource:GetPlayer(playerID) ~= player
				or tostring(PlayerResource:GetSteamID(playerID)) ~= steamID
			then
				return
			end
			local fallback = IsInToolsMode()
					and (not response.StatusCode or response.StatusCode < 100)
					and '{"error":"TOOLS_BRIDGE_UNAVAILABLE"}'
				or '{"error":"ROOM_STATUS_UNKNOWN"}'
			local raw = type(response.Body) == "string"
					and #response.Body > 0
					and #response.Body <= 262144
					and response.Body
				or fallback
			local offset = 1
			local step = 0
			GameRules:GetGameModeEntity()
				:SetContextThink((("platform_response_" .. tostring(playerID)) .. "_") .. event.id, function()
					if
						PlayerResource:GetPlayer(playerID) ~= player
						or tostring(PlayerResource:GetSteamID(playerID)) ~= steamID
					then
						return
					end
					local ____end = math.min(offset + 3999, #raw)
					while ____end < #raw do
						local nextByte = string.byte(raw, ____end + 1)
						if nextByte < 128 or nextByte >= 192 then
							break
						end
						____end = ____end - 1
					end
					local done = ____end >= #raw and 1 or 0
					CustomGameEventManager:Send_ServerToPlayer(player, "platform_response", {
						id = event.id,
						addon = config.addon,
						status = response.StatusCode or 503,
						data = string.sub(raw, offset, ____end),
						step = step,
						done = done,
					})
					step = step + 1
					offset = ____end + 1
					local ____temp_8
					if done == 1 then
						____temp_8 = nil
					else
						____temp_8 = 0.03
					end
					return ____temp_8
				end, 0)
		end)
	end)
end
return ____exports