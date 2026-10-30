--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = (GetMapName() or ""):gsub("^maps/", ""):gsub("%.vpk$", "")
if a == "platform_entry" or a == "platform_lobby" then
	local b = require("eom_platform.server")
	function Activate()
		b.ActivatePlatform()
	end
	function Precache(c) end
	function SpawnGroupPrecache(d, c) end
else
	local e = require("__eom_original_server")
	local f, g, h = Activate, Precache, SpawnGroupPrecache
	function Activate(...)
		if f then
			return f(...)
		end
	end
	function Precache(...)
		if g then
			return g(...)
		end
	end
	function SpawnGroupPrecache(...)
		if h then
			return h(...)
		end
	end
	return e
end