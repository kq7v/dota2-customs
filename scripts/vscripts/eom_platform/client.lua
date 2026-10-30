--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = {}
local b = require("eom_platform/connection_client")
function a.NormalizeMap(c)
	if not c then
		return
	end
	local d = string.gsub(c, "^maps/", "")
	local e = string.gsub(d, "%.vpk$", "")
	if e == "" or e == "dota" or e == "<empty>" then
		return
	end
	return e
end
local function f(g)
	return g ~= nil and (not g.IsNull or not g:IsNull()) and g.SetContextThink ~= nil
end
local function h(g)
	if f(g) then
		g:SetContextThink("eom_platform_client", nil, 0)
	end
end
function a.Initialize(i)
	local j = _G.EOMPlatformClientRuntime
	if j then
		if i then
			j.battle = i
		end
		if i and j.loaded and j.map == a.NormalizeMap(GetMapName()) then
			j.result = require(i)
		end
		return j.result
	end
	local k
	k = {
		battle = i,
		listeners = {},
		dispose = function()
			for l, m in ipairs(k.listeners) do
				StopListeningToGameEvent(m)
			end
			h(k.entity)
			b.Exit()
			_G.EOMPlatformClientRuntime = nil
		end,
	}
	_G.EOMPlatformClientRuntime = k
	local function n()
		local e = a.NormalizeMap(GetMapName())
		if k.map ~= e then
			b.Exit()
			k.map = e
			k.loaded = nil
			k.result = nil
			if e then
				print("[platform] Client initialized for map: " .. e)
			end
		end
		if not e then
			return
		end
		b.Initialize(e)
		if e ~= "platform_entry" and e ~= "platform_lobby" and k.loaded ~= e then
			if _G.EOMPlatformEncryptionReady and not _G.EOMPlatformEncryptionReady() then
				return
			end
			local o = LoadKeyValues("scripts/eom_platform.txt")
			local p = k.battle or o and o.battle_client
			if p then
				k.result = require(p)
			end
			k.loaded = e
		end
	end
	local q = k.listeners
	q[#q + 1] = ListenToGameEvent("game_rules_state_change", n, nil)
	local r = k.listeners
	r[#r + 1] = ListenToGameEvent("client_disconnect", k.dispose, nil)
	local function s()
		if _G.EOMPlatformClientRuntime ~= k then
			return
		end
		n()
		return 0.1
	end
	local function t()
		if f(k.entity) then
			return
		end
		local g = Entities and Entities.First and Entities:First() or nil
		while g and not f(g) do
			g = Entities.Next and Entities:Next(g) or nil
		end
		if g and g ~= k.entity then
			h(k.entity)
			k.entity = g
			g:SetContextThink("eom_platform_client", s, 0)
		end
	end
	local u = k.listeners
	u[#u + 1] = ListenToGameEvent("game_rules_state_change", t, nil)
	local v = k.listeners
	v[#v + 1] = ListenToGameEvent("game_newmap", function()
		n()
		t()
	end, nil)
	local w = k.listeners
	w[#w + 1] = ListenToGameEvent("player_connect_full", t, nil)
	n()
	t()
	return k.result
end
local x = LoadKeyValues("scripts/eom_platform.txt")
if tostring(x and x.managed_client or "") ~= "1" then
	a.Initialize()
end
return a