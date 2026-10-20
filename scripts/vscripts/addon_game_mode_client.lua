--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "addon_game_mode_client"
local b = require("lualib_bundle")
local c = b.__TS__SourceMapTraceBack
c(
	debug.getinfo(1).short_src,
	{
		["4"] = 3,
		["5"] = 4,
		["6"] = 5,
		["9"] = 6,
		["10"] = 7,
		["11"] = 8,
		["14"] = 9,
		["17"] = 10,
		["18"] = 11,
		["19"] = 12,
		["20"] = 13,
		["22"] = 15,
		["23"] = 16,
		["25"] = 3,
		["26"] = 19,
		["27"] = 19,
		["28"] = 19,
		["29"] = 19,
		["30"] = 19,
		["31"] = 20,
		["32"] = 20,
		["33"] = 20,
		["34"] = 21,
		["37"] = 22,
		["40"] = 23,
		["41"] = 20,
		["42"] = 20,
		["43"] = 20,
		["44"] = 25,
	}
)
function InitializeClientForMap(d)
	local e = d or GetMapName()
	if e == nil then
		return
	end
	local f = string.gsub(e, "^maps/", "")
	local g = string.gsub(f, "%.vpk$", "")
	if g == "" or g == "dota" then
		return
	end
	if platformClientInitializedMap == g then
		return
	end
	platformClientInitializedMap = g
	print("[platform] Client initialized for map: " .. g)
	if g == "platform_entry" or g == "platform_lobby" then
		require("platform.bootstrap_client")
	else
		require("addon_game_mode_battle_client")
		require("platform.connection_client")
	end
end
ListenToGameEvent("game_rules_state_change", function()
	return InitializeClientForMap()
end, nil)
ListenToGameEvent("client_side_event", function(h)
	if h.event_name ~= "platform_client_ready" then
		return
	end
	if h.event_data ~= "platform_entry" and h.event_data ~= "platform_lobby" then
		return
	end
	InitializeClientForMap(h.event_data)
end, nil)
InitializeClientForMap()