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
		local hud_created = false
		local last_state = nil

		local function notify_clients()
			if GameRules:State_Get() ~= DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
				return
			end
			if not hud_created then
				CustomUI:DynamicHud_Create(-1, HUD_ID, HUD_LAYOUT, {})
				hud_created = true
				print("[CustomServerGate] IN_PROGRESS: showing notice")
			end
			CustomGameEventManager:Send_ServerToAllClients(EVENT_NAME, {})
		end

		local function advance_to_game()
			local state = GameRules:State_Get()
			if state ~= last_state then
				last_state = state
				print("[CustomServerGate] Native state: " .. tostring(state))
			end
			if state == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
				-- 阻断分支没有业务分队逻辑，替未分队的本地主机完成分队。
				local has_player = false
				local teams_ready = true
				for player_id = 0, DOTA_MAX_TEAM_PLAYERS - 1 do
					if PlayerResource:IsValidPlayerID(player_id) and PlayerResource:GetPlayer(player_id) ~= nil then
						local team = PlayerResource:GetTeam(player_id)
						if team ~= DOTA_TEAM_SPECTATOR then
							has_player = true
							if team ~= DOTA_TEAM_GOODGUYS and team ~= DOTA_TEAM_BADGUYS then
								PlayerResource:SetCustomTeamAssignment(player_id, DOTA_TEAM_GOODGUYS)
								if PlayerResource:GetTeam(player_id) ~= DOTA_TEAM_GOODGUYS then
									teams_ready = false
								end
							end
						end
					end
				end
				if has_player and teams_ready then
					GameRules:SetCustomGameSetupRemainingTime(0)
					GameRules:FinishCustomGameSetup()
				end
			end
			notify_clients()
		end

		function Activate()
			print("[CustomServerGate] Activate blocked: missing scripts_dedicated/xiuxian_server_key.kv")
			-- 无需玩家操作原生选队、选人或等待赛前倒计时。
			-- 由下方 think 完成分队后结束设置，避免与原生自动开局同时推进。
			GameRules:EnableCustomGameSetupAutoLaunch(false)
			GameRules:SetCustomGameSetupAutoLaunchDelay(0)
			GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, DOTA_MAX_TEAM_PLAYERS)
			GameRules:SetHeroSelectionTime(0)
			GameRules:SetHeroSelectPenaltyTime(0)
			GameRules:SetSameHeroSelectionEnabled(true)
			GameRules:SetStrategyTime(0)
			GameRules:SetShowcaseTime(0)
			GameRules:SetPreGameTime(0)

			local mode = GameRules:GetGameModeEntity()
			if mode ~= nil then
				if GameRules:State_Get() < DOTA_GAMERULES_STATE_HERO_SELECTION then
					mode:SetCustomGameForceHero("npc_dota_hero_axe")
				end
				mode:SetContextThink(THINK_NAME, function()
					-- 不在状态事件内嵌套切换阶段；PRE_GAME 由引擎按零秒配置自然结束。
					advance_to_game()
					local state = GameRules:State_Get()
					if state > DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
						return nil
					end
					return state == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS and 2.0 or 0.25
				end, 0.25)
			end
			-- 首次、重连与迟到客户端均由 think 处理，不依赖客户端收到首次通知。
		end

		function Precache(context) end
	end
else
	local loader, err = loadstring(
		[=[_G.ONLINE_TEST_MODE = false; _G.PUBLISH_TIMESTAMP = "2026-10-30 17:3"; print('loading addon dota_super_mid compiled@2026-10-30 17:3:28'); -- addon_game_mode.lua
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