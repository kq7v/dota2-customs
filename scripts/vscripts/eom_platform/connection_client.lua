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

local function __TS__ArrayFilter(self, callbackfn, thisArg)
	local result = {}
	local len = 0
	for i = 1, #self do
		if callbackfn(thisArg, self[i], i - 1, self) then
			len = len + 1
			result[len] = self[i]
		end
	end
	return result
end

local function __TS__ArraySort(self, compareFn)
	if compareFn ~= nil then
		table.sort(self, function(a, b)
			return compareFn(nil, a, b) < 0
		end)
	else
		table.sort(self)
	end
	return self
end

local function __TS__ArrayFind(self, predicate, thisArg)
	for i = 1, #self do
		local elem = self[i]
		if predicate(thisArg, elem, i - 1, self) then
			return elem
		end
	end
	return nil
end
-- End of Lua Library inline imports
local ____exports = {}
local state, publish
function state()
	return _G.EOMPlatformConnection
end
function publish()
	local current = state()
	if not current then
		return
	end
	FireGameEventLocal("client_side_event", {
		event_name = "platform_connection_status",
		event_data = json.encode({
			map = current.map,
			phase = current.phase,
			mode = "auto",
			region = current.region,
			language = current.language,
			currentRegion = current.currentRegion,
			serverAddress = current.serverAddress,
		}),
	})
end
function ____exports.Exit()
	local current = state()
	if not current then
		return
	end
	current.phase = "exited"
	publish()
	if current.listener ~= nil then
		StopListeningToGameEvent(current.listener)
	end
	if current.spawnListener ~= nil then
		StopListeningToGameEvent(current.spawnListener)
	end
	_G.EOMPlatformConnection = nil
end
local function validAddress(address)
	if type(address) ~= "string" then
		return
	end
	local host, portText = string.match(address, "^([%w%.%-]+):(%d+)$")
	local port = tonumber(portText)
	if not host or not port or port < 1 or port > 65535 then
		return
	end
	return address
end
local function address(region)
	local routing = LoadKeyValues("scripts/platform_routing.txt")
	local configured = validAddress(routing and routing[region])
	if configured then
		return configured
	end
	if region == "china" then
		return validAddress(routing and routing.lobby_address)
	end
	if region == "overseas" then
		return validAddress(routing and routing.overseas_lobby_address)
	end
	if region == "overseas2" then
		return validAddress(routing and routing.overseas2_lobby_address)
	end
end
local function settings()
	return LoadKeyValues("scripts/eom_platform.txt")
end
local function availableRegions()
	local routing = LoadKeyValues("scripts/platform_routing.txt")
	return __TS__ArraySort(__TS__ArrayFilter(__TS__ObjectKeys(routing or {}), function(____, key)
		return validAddress(routing[key]) ~= nil
	end))
end
local function defaultRegion()
	local ____opt_8 = settings()
	local preferred = ____opt_8 and ____opt_8.connection_region
	return preferred and address(preferred) and preferred or (availableRegions()[1] or "china")
end
local function recordServer(host, port)
	local current = state()
	if
		not current
		or current.map ~= "platform_lobby"
		or type(host) ~= "string"
		or type(port) ~= "number"
		or port % 1 ~= 0
	then
		return
	end
	local target = validAddress((host .. ":") .. tostring(port))
	if not target then
		return
	end
	current.serverAddress = target
	current.currentRegion = __TS__ArrayFind(availableRegions(), function(____, region)
		return address(region) == target
	end)
	publish()
end
local function submit(target, password, retry)
	if password == nil then
		password = ""
	end
	if retry == nil then
		retry = false
	end
	local current = state()
	if not current or not target then
		return
	end
	if
		current.phase == "submitted" and (not retry or current.submittedAt ~= nil and Time() - current.submittedAt < 2)
	then
		return
	end
	current.phase = "submitted"
	current.submittedAt = Time()
	print((("[platform] Connection submitted: " .. current.map) .. " -> ") .. target)
	publish()
	SendToConsole(password == "" and 'password ""' or "password " .. password)
	SendToConsole("connect " .. target)
end
local function ready()
	local customGameSetupPhase = 2
	local phase = GameRules and GameRules.State_Get and GameRules:State_Get() or nil
	return type(phase) == "number" and phase >= customGameSetupPhase
end
local function autoConnect()
	local current = state()
	if not current or current.map ~= "platform_entry" or current.phase == "submitted" or not ready() then
		return
	end
	local available = availableRegions()
	if #available ~= 1 and not current.language then
		return
	end
	local preferred = current.language == "schinese" and "china"
		or (current.language == "russian" and "overseas2" or "overseas")
	current.region = #available == 1 and available[1] or (address(preferred) and preferred or defaultRegion())
	current.automatic = true
	submit(address(current.region))
end
function ____exports.Initialize(map)
	local current = state()
	if not current or current.map ~= map then
		____exports.Exit()
		current = {
			map = map,
			phase = "waiting",
			automatic = false,
			region = defaultRegion(),
		}
		_G.EOMPlatformConnection = current
		current.listener = ListenToGameEvent("client_side_event", function(event)
			local active = state()
			if not active then
				return
			end
			if event.event_name == "platform_connection_query" then
				publish()
			elseif event.event_name == "platform_server_endpoint" and active.map == "platform_lobby" then
				local ok, decoded = pcall(function()
					local value = json.decode(event.event_data)
					return value
				end)
				if ok and type(decoded) == "table" then
					local endpoint = decoded
					if endpoint then
						recordServer(endpoint.address, endpoint.port)
					end
				end
			elseif event.event_name == "platform_route_query" then
				FireGameEventLocal("client_side_event", {
					event_name = "platform_route_status",
					event_data = json.encode({ available = address(defaultRegion()) ~= nil }),
				})
			elseif event.event_name == "platform_client_language" and active.map == "platform_entry" then
				if
					type(event.event_data) ~= "string"
					or not (string.match(event.event_data, "^[a-z]+$"))
					or #event.event_data > 32
				then
					return
				end
				active.language = event.event_data
				autoConnect()
				publish()
			elseif event.event_name == "platform_region_select" and active.map == "platform_lobby" then
				if address(event.event_data) and address(event.event_data) ~= active.serverAddress then
					if
						active.phase == "submitted"
						and active.submittedAt ~= nil
						and Time() - active.submittedAt < 2
					then
						return
					end
					active.region = event.event_data
					submit(address(active.region), "", true)
				end
			elseif
				event.event_name == "platform_entry_retry"
				and active.map == "platform_entry"
				and active.phase == "submitted"
				and ready()
			then
				submit(address(active.region), "", true)
			elseif
				event.event_name == "platform_return"
				and active.map ~= "platform_entry"
				and active.map ~= "platform_lobby"
			then
				submit(address(defaultRegion()), "", true)
			elseif event.event_name == "platform_connect" and active.map == "platform_lobby" then
				local ok, decoded = pcall(function()
					local value = json.decode(event.event_data)
					return value
				end)
				if not ok then
					return
				end
				if type(decoded) ~= "table" then
					return
				end
				local request = decoded
				if not request or type(request.password) ~= "string" or #request.password > 128 then
					return
				end
				local password = string.match(request.password, "^[%w]+$")
				if password then
					submit(validAddress(request.address), password, true)
				end
			end
		end, nil)
		current.spawnListener = ListenToGameEvent("server_spawn", function(event)
			if event.mapname == "platform_lobby" then
				recordServer(event.address, event.port)
			end
		end, nil)
	end
	if current.phase == "waiting" and ready() then
		current.phase = "ready"
		publish()
	end
	autoConnect()
end
return ____exports