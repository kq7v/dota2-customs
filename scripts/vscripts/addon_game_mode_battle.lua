--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "addon_game_mode_battle"
local b = require("lualib_bundle")
local c = b.__TS__ArrayForEach
local d = b.__TS__SourceMapTraceBack
d(
	debug.getinfo(1).short_src,
	{
		["5"] = 2,
		["6"] = 4,
		["8"] = 6,
		["9"] = 7,
		["11"] = 9,
		["12"] = 10,
		["14"] = 12,
		["15"] = 13,
		["17"] = 15,
		["18"] = 16,
		["19"] = 16,
		["20"] = 16,
		["21"] = 17,
		["22"] = 18,
		["23"] = 19,
		["24"] = 20,
		["25"] = 21,
		["26"] = 22,
		["29"] = 25,
		["30"] = 27,
		["31"] = 28,
		["32"] = 27,
		["33"] = 31,
		["34"] = 32,
		["35"] = 33,
		["36"] = 34,
		["37"] = 35,
		["39"] = 36,
		["40"] = 37,
		["42"] = 39,
		["43"] = 39,
		["44"] = 39,
		["45"] = 40,
		["46"] = 41,
		["47"] = 42,
		["49"] = 39,
		["50"] = 39,
		["54"] = 46,
		["55"] = 47,
		["58"] = 48,
		["59"] = 49,
		["60"] = 50,
		["61"] = 51,
		["63"] = 53,
		["64"] = 54,
		["65"] = 55,
		["66"] = 56,
		["68"] = 46,
		["69"] = 59,
		["70"] = 60,
		["71"] = 61,
		["72"] = 62,
		["73"] = 63,
		["74"] = 64,
		["79"] = 69,
		["80"] = 70,
		["81"] = 71,
		["82"] = 72,
		["83"] = 72,
		["84"] = 72,
		["85"] = 72,
		["87"] = 74,
		["88"] = 75,
		["89"] = 75,
		["90"] = 75,
		["91"] = 75,
		["94"] = 79,
		["95"] = 80,
		["96"] = 81,
		["99"] = 85,
		["100"] = 86,
		["101"] = 87,
		["102"] = 88,
		["103"] = 89,
		["104"] = 90,
		["105"] = 91,
		["110"] = 32,
		["111"] = 98,
		["112"] = 98,
		["113"] = 99,
	}
)
if _G.debug == nil then
	_G.debug = {}
end
if _G.debug.traceback == nil then
	_G.debug.traceback = function(...)
		return ""
	end
end
if _G.debug.getinfo == nil then
	_G.debug.getinfo = function(...)
		return { source = "", what = "", short_src = "" }
	end
end
if GetMapName() == "help_map" then
	GameRules:SetCustomGameSetupAutoLaunchDelay(999)
end
if IsInToolsMode() then
	local e = string.gsub
	local f = debug.getinfo(1)
	local g = e(f and f.source or "", "\\", "/")
	local h, i = string.match(g, "^@?(.*dota 2 beta/game/dota_addons/)([^/]+)/")
	if h ~= nil and i ~= nil then
		local j = string.gsub(h, "/game/dota_addons/", "/content/dota_addons/")
		_G.GameDir = h
		_G.AddonName = i
		_G.ContentDir = j
	end
end
require("requires")
function ActivateBattle()
	CModule:initialize()
end
require("precache")
function PrecacheBattle(k)
	local l = {}
	local m = false
	for n in pairs(tPrecacheList) do
		do
			if not m and n == "particle" then
				goto o
			end
			c(tPrecacheList[n], function(p, q)
				if not l[q] then
					l[q] = true
					PrecacheResource(n, q, k)
				end
			end)
		end
		::o::
	end
	local function r(q, k)
		if l[q] then
			return
		end
		l[q] = true
		if (string.find(q, ".vpcf", nil, true) or 0) - 1 ~= -1 then
			if m then
				PrecacheResource("particle", q, k)
			end
		elseif (string.find(q, ".vsndevts", nil, true) or 0) - 1 ~= -1 then
			PrecacheResource("soundfile", q, k)
		elseif (string.find(q, ".vmdl", nil, true) or 0) - 1 ~= -1 then
			PrecacheResource("model", q, k)
		end
	end
	for s in pairs(KeyValues.AbilitiesKv) do
		if s ~= "Version" then
			local t = KeyValues.AbilitiesKv[s]
			if type(t.PrecacheResource) == "table" then
				for u, q in pairs(t.PrecacheResource) do
					r(q, k)
				end
			end
		end
	end
	for s in pairs(KeyValues.CosmeticsKV) do
		local t = KeyValues.CosmeticsKV[s]
		if t.resource then
			r(tostring(t.resource), k)
		end
		if t.extra_resource then
			r(tostring(t.extra_resource), k)
		end
	end
	for s in pairs(KeyValues.UnitsKv) do
		if s ~= "Version" then
			PrecacheUnitByNameSync(s, k)
		end
	end
	for s in pairs(KeyValues.ItemsKv) do
		if s ~= "Version" then
			PrecacheItemByNameSync(s, k)
			local t = KeyValues.ItemsKv[s]
			if type(t.PrecacheResource) == "table" then
				for u, q in pairs(t.PrecacheResource) do
					r(q, k)
				end
			end
		end
	end
end
function SpawnGroupPrecacheBattle(v, k) end
require("reload")