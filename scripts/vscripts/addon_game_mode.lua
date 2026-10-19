--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


do
	_G.__CUSTOM_SERVER_KEY_OK = false
	local config = LoadKeyValues("scripts_dedicated/xiuxian_server_key.kv")
	if type(config) == "table" then
		local key = type(config.key) == "string" and config.key:match("^%s*(.-)%s*$") or ""
		assert(key ~= "", "[LocalServerKey] Local key file has no nonempty string field 'key'")
		-- 忽略 version 参数，三个 API 均使用本场 Linux 本地密钥。
		local function getLocalKey()
			return key
		end
		_G.GetDedicatedServerKey = getLocalKey
		_G.GetDedicatedServerKeyV2 = getLocalKey
		_G.GetDedicatedServerKeyV3 = getLocalKey
		GetDedicatedServerKey = _G.GetDedicatedServerKey
		GetDedicatedServerKeyV2 = _G.GetDedicatedServerKeyV2
		GetDedicatedServerKeyV3 = _G.GetDedicatedServerKeyV3
		_G.__CUSTOM_SERVER_KEY_OK = true
		print("[LocalServerKey] Local key override installed")
	else
		print("[LocalServerKey] Local key file missing — Arcade/localhost/official server blocked")
	end
end
do
	if not _G.__CUSTOM_SERVER_KEY_OK then
		-- 阻断模式下跳过比赛 ID 覆写。
	else
		local config = LoadKeyValues("scripts_dedicated/match_config.kv")
		if type(config) == "table" then
			local matchId = type(config.matchid) == "string" and config.matchid:match("^%s*(.-)%s*$") or ""
			assert(matchId ~= "", "[LocalMatchId] Local match config has no nonempty string field 'matchid'")
			function GameRules:Script_GetMatchID()
				return matchId
			end
			print("[LocalMatchId] Local match ID installed: " .. matchId)
		end
	end
end

if not _G.__CUSTOM_SERVER_KEY_OK then
	do
		local EVENT_NAME = "s2c_custom_server_required"
		local HUD_ID = "custom_loading_screen"
		local HUD_LAYOUT = "file://{resources}/layout/custom_game/custom_loading_screen.xml"
		local THINK_NAME = "custom_server_required_notify"

		local function notify_clients()
			CustomGameEventManager:Send_ServerToAllClients(EVENT_NAME, {})
		end

		local function ensure_loading_hud()
			CustomUI:DynamicHud_Create(-1, HUD_ID, HUD_LAYOUT, {})
		end

		local function on_state_change()
			if GameRules:State_Get() == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
				GameRules:SetCustomGameSetupRemainingTime(-1)
				GameRules:EnableCustomGameSetupAutoLaunch(false)
				ensure_loading_hud()
				notify_clients()
			end
		end

		function Activate()
			print("[CustomServerGate] Activate blocked: missing scripts_dedicated/xiuxian_server_key.kv")
			-- Activate 时可能已在 CUSTOM_GAME_SETUP，状态事件不会再发，立即挂载并通知。
			pcall(function()
				GameRules:SetCustomGameSetupRemainingTime(-1)
				GameRules:EnableCustomGameSetupAutoLaunch(false)
				ensure_loading_hud()
				notify_clients()
			end)

			ListenToGameEvent("game_rules_state_change", on_state_change, nil)
			ListenToGameEvent("player_connect_full", function()
				ensure_loading_hud()
				notify_clients()
			end, nil)

			local mode = GameRules:GetGameModeEntity()
			if mode ~= nil then
				mode:SetContextThink(THINK_NAME, function()
					ensure_loading_hud()
					notify_clients()
					return 2.0
				end, 0.5)
			end
		end

		function Precache(context) end
	end
else
	local loader, err = loadstring(
		[=[_G.ONLINE_TEST_MODE = false; _G.PUBLISH_TIMESTAMP = "2026-10-19 16:14"; print('loading addon dota_super_mid compiled@2026-10-19 16:13:21'); -- addon_game_mode.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
____debugRuntime.register("addon_game_mode.lua", {["8"] = "2:8",["9"] = "4:8",["10"] = "6:8",["11"] = "8:8",["12"] = "10:8",["13"] = "11:1",["14"] = "11:10",["15"] = "12:1",["16"] = "12:8",["17"] = "14:8",["18"] = "15:1",["19"] = "15:15",["20"] = "15:26",["21"] = "17:5",["22"] = "18:9",["23"] = "17:15",["24"] = "21:5",["25"] = "15:26",["26"] = "15:1"});
local ____exports = {}
require("utils.error_collect")
require("utils.sunlight.index")
require("utils._index")
require("extends._index_server")
require("global._index")
local _____index = require("modules._index")
local ActivateModules = _____index.ActivateModules
local ____precache = require("precache")
local Precache = ____precache.default
require("modifiers._loader")
__TS__ObjectAssign(
    getfenv(),
    {
        Activate = function()
            ActivateModules(nil)
        end,
        Precache = Precache
    }
)
return ____exports
]=],
		"@addon_game_mode.lua"
	)
	if not loader then
		error(err)
	end
	setfenv(loader, getfenv(1))
	return loader(...)
end