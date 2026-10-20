--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "addon_game_mode"
local b = require("lualib_bundle")
local c = b.__TS__SourceMapTraceBack
c(
	debug.getinfo(1).short_src,
	{
		["4"] = 2,
		["5"] = 3,
		["7"] = 5,
		["9"] = 8,
		["10"] = 9,
		["11"] = 10,
		["13"] = 12,
		["15"] = 8,
		["16"] = 16,
		["17"] = 17,
		["18"] = 18,
		["20"] = 16,
		["21"] = 22,
		["22"] = 23,
		["23"] = 24,
		["25"] = 22,
	}
)
if GetMapName() == "platform_entry" or GetMapName() == "platform_lobby" then
	require("platform.bootstrap_server")
else
	require("addon_game_mode_battle")
end
function Activate()
	if GetMapName() == "platform_entry" or GetMapName() == "platform_lobby" then
		ActivatePlatform()
	else
		ActivateBattle()
	end
end
function Precache(d)
	if GetMapName() ~= "platform_entry" and GetMapName() ~= "platform_lobby" then
		PrecacheBattle(d)
	end
end
function SpawnGroupPrecache(e, d)
	if GetMapName() ~= "platform_entry" and GetMapName() ~= "platform_lobby" then
		SpawnGroupPrecacheBattle(e, d)
	end
end