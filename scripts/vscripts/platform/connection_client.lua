--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "platform/connection_client"
local b = require("lualib_bundle")
local c = b.__TS__SourceMapTraceBack
c(
	debug.getinfo(1).short_src,
	{
		["6"] = 2,
		["7"] = 4,
		["8"] = 5,
		["11"] = 6,
		["12"] = 7,
		["13"] = 8,
		["16"] = 9,
		["17"] = 4,
		["18"] = 12,
		["19"] = 12,
		["20"] = 12,
		["22"] = 13,
		["23"] = 13,
		["25"] = 14,
		["26"] = 12,
		["27"] = 17,
		["28"] = 17,
		["29"] = 17,
		["31"] = 18,
		["32"] = 19,
		["33"] = 20,
		["36"] = 23,
		["37"] = 24,
		["38"] = 17,
		["39"] = 27,
		["40"] = 27,
		["41"] = 27,
		["42"] = 28,
		["43"] = 29,
		["44"] = 29,
		["46"] = 30,
		["47"] = 31,
		["48"] = 32,
		["49"] = 33,
		["50"] = 33,
		["51"] = 33,
		["52"] = 33,
		["53"] = 33,
		["54"] = 33,
		["55"] = 33,
		["56"] = 34,
		["57"] = 35,
		["58"] = 36,
		["59"] = 37,
		["62"] = 38,
		["63"] = 39,
		["64"] = 40,
		["67"] = 41,
		["68"] = 42,
		["70"] = 27,
		["71"] = 27,
		["72"] = 27,
	}
)
platformRouting = LoadKeyValues("scripts/platform_routing.txt")
function ValidPlatformAddress(d)
	if type(d) ~= "string" then
		return
	end
	local e, f = string.match(d, "^([%w%.%-]+:(%d+))$")
	local g = tonumber(f)
	if e == nil or g == nil or g < 1 or g > 65535 then
		return
	end
	return d
end
function PlatformLobbyAddress(h)
	if h == nil then
		h = "china"
	end
	if h == "overseas2" then
		return ValidPlatformAddress(platformRouting and platformRouting.overseas2_lobby_address)
	end
	return ValidPlatformAddress(
		h == "overseas"
				and (platformRouting and platformRouting.overseas_lobby_address or platformRouting and platformRouting.lobby_address)
			or platformRouting and platformRouting.lobby_address
	)
end
function ConnectPlatformLobby(h)
	if h == nil then
		h = "china"
	end
	local d = PlatformLobbyAddress(h)
	if d == nil then
		print("[platform] Missing or invalid lobby_address in scripts/platform_routing.txt")
		return
	end
	SendToConsole('password ""')
	SendToConsole("connect " .. d)
end
ListenToGameEvent("client_side_event", function(i)
	if i.event_name == "platform_entry_select" then
		if i.event_data == "china" or i.event_data == "overseas" or i.event_data == "overseas2" then
			ConnectPlatformLobby(i.event_data)
		end
	elseif i.event_name == "platform_return" then
		ConnectPlatformLobby()
	elseif i.event_name == "platform_route_query" then
		FireGameEventLocal(
			"client_side_event",
			{ event_name = "platform_route_status", event_data = json.encode({ available = PlatformLobbyAddress()
				~= nil }) }
		)
	elseif
		i.event_name == "platform_connect" and (
			GetMapName() == "platform_lobby" or GetMapName() == "maps/platform_lobby.vpk"
		)
	then
		local j = json.decode(i.event_data)
		local k = j
		if k == nil or type(k.address) ~= "string" or type(k.password) ~= "string" then
			return
		end
		local d = ValidPlatformAddress(k.address)
		local l = string.match(k.password, "^[%w]+$")
		if d == nil or l == nil or #k.password > 128 then
			return
		end
		SendToConsole("password " .. k.password)
		SendToConsole("connect " .. k.address)
	end
end, nil)