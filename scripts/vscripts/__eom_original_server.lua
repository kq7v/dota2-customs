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
	{ ["4"] = 2, ["5"] = 4, ["6"] = 5, ["7"] = 4, ["8"] = 8, ["9"] = 9, ["10"] = 8, ["11"] = 12, ["12"] = 13, ["13"] = 12 }
)
require("addon_game_mode_battle")
function Activate()
	ActivateBattle()
end
function Precache(d)
	PrecacheBattle(d)
end
function SpawnGroupPrecache(e, d)
	SpawnGroupPrecacheBattle(e, d)
end