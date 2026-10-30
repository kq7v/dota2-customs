--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "addon_game_mode"
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
		["26"] = 22,
		["27"] = 23,
		["28"] = 24,
		["29"] = 25,
		["30"] = 26,
		["33"] = 29,
		["34"] = 31,
		["35"] = 32,
		["36"] = 31,
		["37"] = 35,
		["38"] = 36,
		["39"] = 37,
		["40"] = 38,
		["41"] = 39,
		["43"] = 40,
		["44"] = 41,
		["46"] = 43,
		["47"] = 43,
		["48"] = 43,
		["49"] = 44,
		["50"] = 45,
		["51"] = 46,
		["53"] = 43,
		["54"] = 43,
		["58"] = 50,
		["59"] = 51,
		["62"] = 52,
		["63"] = 53,
		["64"] = 54,
		["65"] = 55,
		["67"] = 57,
		["68"] = 58,
		["69"] = 59,
		["70"] = 60,
		["72"] = 50,
		["73"] = 63,
		["74"] = 64,
		["75"] = 65,
		["76"] = 66,
		["77"] = 67,
		["78"] = 68,
		["83"] = 73,
		["84"] = 74,
		["85"] = 75,
		["86"] = 76,
		["87"] = 76,
		["88"] = 76,
		["89"] = 76,
		["91"] = 78,
		["92"] = 79,
		["93"] = 79,
		["94"] = 79,
		["95"] = 79,
		["98"] = 83,
		["99"] = 84,
		["100"] = 85,
		["103"] = 89,
		["104"] = 90,
		["105"] = 91,
		["106"] = 92,
		["107"] = 93,
		["108"] = 94,
		["109"] = 95,
		["114"] = 36,
		["115"] = 102,
		["116"] = 102,
		["117"] = 103,
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
	local g = e(f and f.source or "", "^@", "")
	g = string.gsub(g, "\\", "/")
	local h, i = string.match(g, "^(.*[/]game[/]dota_addons[/])([^/]+)[/]")
	if h == nil then
		h, i = string.match(g, "^(.*[/]game[/])([^/]+)[/]")
	end
	if h ~= nil and i ~= nil then
		local j = string.gsub(h, "/game/", "/content/")
		_G.GameDir = h
		_G.AddonName = i
		_G.ContentDir = j
	end
end
require("requires")
function Activate()
	CModule:initialize()
end
require("precache")
function Precache(k)
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
function SpawnGroupPrecache(v, k) end
require("reload")