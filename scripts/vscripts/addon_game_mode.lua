--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- EOM SDK managed entry v1
local map = (GetMapName() or ""):gsub("^maps/", ""):gsub("%.vpk$", "")
if map == "platform_entry" or map == "platform_lobby" then
	local sdk = require("eom_platform.server")
	function Activate()
		sdk.ActivatePlatform()
	end
	function Precache(context) end
	function SpawnGroupPrecache(group, context) end
else
	local result = require("__eom_original_server")
	local activate, precache, spawnGroupPrecache = Activate, Precache, SpawnGroupPrecache
	function Activate(...)
		if activate then
			return activate(...)
		end
	end
	function Precache(...)
		if precache then
			return precache(...)
		end
	end
	function SpawnGroupPrecache(...)
		if spawnGroupPrecache then
			return spawnGroupPrecache(...)
		end
	end
	return result
end