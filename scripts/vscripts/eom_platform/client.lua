--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
---
-- @noSelfInFile *
local connection = require("eom_platform/connection_client")
function ____exports.NormalizeMap(raw)
	if not raw then
		return
	end
	local withoutDirectory = string.gsub(raw, "^maps/", "")
	local map = string.gsub(withoutDirectory, "%.vpk$", "")
	if map == "" or map == "dota" or map == "<empty>" then
		return
	end
	return map
end
local function usable(entity)
	return entity ~= nil and (not entity.IsNull or not entity:IsNull()) and entity.SetContextThink ~= nil
end
local function cancelThink(entity)
	if usable(entity) then
		entity:SetContextThink("eom_platform_client", nil, 0)
	end
end
function ____exports.Initialize(battleModule)
	local existing = _G.EOMPlatformClientRuntime
	if existing then
		if battleModule then
			existing.battle = battleModule
		end
		if battleModule and existing.loaded and existing.map == ____exports.NormalizeMap(GetMapName()) then
			existing.result = require(battleModule)
		end
		return existing.result
	end
	local runtime
	runtime = {
		battle = battleModule,
		listeners = {},
		dispose = function()
			for ____, listener in ipairs(runtime.listeners) do
				StopListeningToGameEvent(listener)
			end
			cancelThink(runtime.entity)
			connection.Exit()
			_G.EOMPlatformClientRuntime = nil
		end,
	}
	_G.EOMPlatformClientRuntime = runtime
	local function check()
		local map = ____exports.NormalizeMap(GetMapName())
		if runtime.map ~= map then
			connection.Exit()
			runtime.map = map
			runtime.loaded = nil
			runtime.result = nil
			if map then
				print("[platform] Client initialized for map: " .. map)
			end
		end
		if not map then
			return
		end
		connection.Initialize(map)
		if map ~= "platform_entry" and map ~= "platform_lobby" and runtime.loaded ~= map then
			if _G.EOMPlatformEncryptionReady and not _G.EOMPlatformEncryptionReady() then
				return
			end
			local config = LoadKeyValues("scripts/eom_platform.txt")
			local battle = runtime.battle or config and config.battle_client
			if battle then
				runtime.result = require(battle)
			end
			runtime.loaded = map
		end
	end
	local ____runtime_listeners_2 = runtime.listeners
	____runtime_listeners_2[#____runtime_listeners_2 + 1] = ListenToGameEvent("game_rules_state_change", check, nil)
	local ____runtime_listeners_3 = runtime.listeners
	____runtime_listeners_3[#____runtime_listeners_3 + 1] = ListenToGameEvent("client_disconnect", runtime.dispose, nil)
	local function tick()
		if _G.EOMPlatformClientRuntime ~= runtime then
			return
		end
		check()
		return 0.1
	end
	local function attach()
		if usable(runtime.entity) then
			return
		end
		local entity = Entities and Entities.First and Entities:First() or nil
		while entity and not usable(entity) do
			entity = Entities.Next and Entities:Next(entity) or nil
		end
		if entity and entity ~= runtime.entity then
			cancelThink(runtime.entity)
			runtime.entity = entity
			entity:SetContextThink("eom_platform_client", tick, 0)
		end
	end
	local ____runtime_listeners_6 = runtime.listeners
	____runtime_listeners_6[#____runtime_listeners_6 + 1] = ListenToGameEvent("game_rules_state_change", attach, nil)
	local ____runtime_listeners_7 = runtime.listeners
	____runtime_listeners_7[#____runtime_listeners_7 + 1] = ListenToGameEvent("game_newmap", function()
		check()
		attach()
	end, nil)
	local ____runtime_listeners_8 = runtime.listeners
	____runtime_listeners_8[#____runtime_listeners_8 + 1] = ListenToGameEvent("player_connect_full", attach, nil)
	check()
	attach()
	return runtime.result
end
local startup = LoadKeyValues("scripts/eom_platform.txt")
if tostring(startup and startup.managed_client or "") ~= "1" then
	____exports.Initialize()
end
return ____exports