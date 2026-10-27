--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


pcall(require, "encrypt")

require("precache")
require("precache_default")

-- Precache = require "Precache"
function Precache(context)
	-- PrecacheResource("particle", "particles/units/heroes/hero_rubick/rubick_attack_blur_left_to_right_01.vpcf", context)
	-- PrecacheResource("particle", "particles/units/heroes/hero_rubick/rubick_attack_blur_right_to_left_01.vpcf", context)
	-- PrecacheResource("particle", "particles/units/heroes/hero_rubick/rubick_attack_blur_right_to_left_02.vpcf", context)
	-- PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_elder_titan.vsndevts", context)
	-- PrecacheResource("model", "models/heroes/lycan/summon_wolves.vmdl", context)
	for k, v in pairs(tPrecacheList) do
		for _, vv in ipairs(v) do
			PrecacheResource(k, vv, context)
		end
	end
	for k, v in pairs(tDefaultPrecacheList) do
		for _, vv in ipairs(v) do
			PrecacheResource(k, vv, context)
		end
	end
	_G.tPrecacheList = nil
	_G.tDefaultPrecacheList = nil
end

function Activate()
	ServerGameMode.Activate()
end

if IsServer() then
	require("server_game_mode")
end