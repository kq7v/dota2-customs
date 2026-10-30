--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "units/global_timer"
local b = require("lualib_bundle")
local c = b.__TS__SourceMapTraceBack
c(debug.getinfo(1).short_src, { ["4"] = 2, ["5"] = 3, ["6"] = 4, ["8"] = 2 })
function OnTimer(self)
	if TimerManager ~= nil then
		TimerManager:Think()
	end
end