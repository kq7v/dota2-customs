--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


print("[platform probe] map=" .. tostring(GetMapName and GetMapName()))
print("[platform probe] before: init=" .. type(InitializeClientForMap) .. ", connect=" .. type(ConnectPlatformLobby))
local a, b = pcall(require, "addon_game_mode_client")
print("[platform probe] require=" .. tostring(a))
if not a then
	print("[platform probe] error=" .. tostring(b))
end
print("[platform probe] after: init=" .. type(InitializeClientForMap) .. ", connect=" .. type(ConnectPlatformLobby))