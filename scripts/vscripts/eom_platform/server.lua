--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
if GetMapName() == "platform_entry" then
	Convars:SetFloat("dota_wait_for_players_completed_delay", 0)
end
GameRules:SetCustomGameSetupAutoLaunchDelay(999)
GameRules:EnableCustomGameSetupAutoLaunch(false)
GameRules:SetCustomGameSetupTimeout(-1)
function ____exports.ActivatePlatform()
	GameRules:SetCustomGameSetupRemainingTime(-1)
	print("[platform] Custom game setup locked: " .. GetMapName())
	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, GetMapName() == "platform_entry" and 1 or 64)
	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 0)
	if GetMapName() == "platform_lobby" and (IsDedicatedServer() or IsInToolsMode()) then
		local lobby = require("eom_platform/lobby_server")
		lobby.RegisterPlatformRequests()
		print("[platform] Lobby requests registered")
	end
end
return ____exports