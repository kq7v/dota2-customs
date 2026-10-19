--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if not IsDedicatedServer() and not IsInToolsMode() then
	return
end
_G.GameMode = GameMode or {}

require("core_declarations")
require("precache")

require("extensions/init")
require("utils/init")
require("libraries/init")
require("filters/init")
require("events/init")
require("game/init")
require("modifiers/init")
require("anti_feed/anti_feed")

function Activate()
	GameMode:Init()
end

function Precache(context)
	print("[GameMode] Precache started")
	PrecacheManager:Run(context)
	print("[GameMode] Precache finished")
end

function GameMode:Init()
	print("[GameMode] Init started")

	local seed = string.gsub(string.gsub(GetSystemTime(), ":", ""), "0", "")
	math.randomseed(tonumber(seed))

	local game_mode_entity = GameRules:GetGameModeEntity()
	game_mode_entity.GameMode = self

	GameLoop:Init()
	Events:Init()
	EventProxy:Init()

	GameMode:SetTeams()
	Filters:Init()
	CustomChat:Init()
	AntiFeed:Init()
	DPS_Counter:Init()

	GameRules:SetUseUniversalShopMode(true)
	GameRules:SetGoldPerTick(0) -- any gold other than 0 creates lag
	GameRules:SetShowcaseTime(0.0)
	GameRules:SetPreGameTime(PREGAME_TIME)
	GameRules:LockCustomGameSetupTeamAssignment(false)
	GameRules:SetCustomGameSetupAutoLaunchDelay(3)
	GameRules:SetIgnoreLobbyTeamsInCustomGame(false)
	--GameRules:SetFilterMoreGold(true)

	game_mode_entity:SetLoseGoldOnDeath(true)
	--game_mode_entity:SetFreeCourierModeEnabled(true)
	game_mode_entity:SetPauseEnabled(IsInToolsMode())
	game_mode_entity:SetUseDefaultDOTARuneSpawnLogic(true)
	game_mode_entity:SetTowerBackdoorProtectionEnabled(true)

	game_mode_entity:SetRespawnTimeScale(RESPAWN_TIME_SCALE)

	if IsInToolsMode() then
		-- game_mode_entity:SetFixedRespawnTime(1)
		game_mode_entity:SetDraftingBanningTimeOverride(0)
		GameRules:SetCustomGameSetupAutoLaunchDelay(3)
	end

	GameRules:SetTimeOfDay(0.25)

	if IsInToolsMode() or GetMapName() == "ot3_demo" then
		OT3Demo:Init(game_mode_entity)
	end

	EventDriver:Dispatch("GameMode:init_finished", {})

	print("[GameMode] Init finished")
	CustomNetTables:SetTableValue("game_options", "dedicated", { state = IsDedicatedServer() })
end

function GameMode:IsDeveloper(player_id)
	local steam_id = tostring(PlayerResource:GetSteamID(player_id))

	return DEVELOPERS[steam_id] == true
end

function GameMode:SetTeams()
	--for team = 0, DOTA_TEAM_COUNT - 1 do
	--	local color = TEAM_COLORS[team]
	--	if color then
	--		SetTeamCustomHealthbarColor(team, color[1], color[2], color[3])
	--	end
	--end

	local teams_layout = TEAMS_LAYOUTS[GetMapName()]

	for _, team in pairs(teams_layout.teamlist) do
		local player_count = GetMapName() == "ot3_demo" and 99 or teams_layout.player_count
		GameRules:SetCustomGameTeamMaxPlayers(team, player_count)
	end

	GameRules:SetCustomGameBansPerTeam(teams_layout.player_count)

	if DEV_ENABLE_SPECTATOR_TEAM == true then
		GameRules:SetCustomGameTeamMaxPlayers(1, 1)
		CustomNetTables:SetTableValue("game_options", "spectator_slots", { DEV_ENABLE_SPECTATOR_TEAM })
	end
end

function GameMode:IsTournamentMode()
	return false
end

function GameMode:HasAbandoned(player_id)
	return PlayerResource:GetConnectionState(player_id) == DOTA_CONNECTION_STATE_ABANDONED
end