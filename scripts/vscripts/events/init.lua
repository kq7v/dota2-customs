--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


Events = Events or {}

require("events/gamerules_state_changed")
require("events/item_picked_up")
require("events/npc_spawned")
require("events/entity_killed")
require("events/inventory_item_change")
require("events/ability_levelled")
require("events/hero_selected")

function Events:Init()
	-- ListenToGameEvent("dota_item_picked_up", Dynamic_Wrap(Events, "OnItemPickUp"), Events)
	ListenToGameEvent("game_rules_state_change", Dynamic_Wrap(Events, "OnGameRulesStateChange"), Events)
	ListenToGameEvent("npc_spawned", Dynamic_Wrap(Events, "OnNPCSpawned"), Events)
	ListenToGameEvent("entity_killed", Dynamic_Wrap(Events, "OnEntityKilled"), Events)
	-- ListenToGameEvent("dota_hero_inventory_item_change", Dynamic_Wrap(Events, "OnInventoryItemChange"), Events)
	ListenToGameEvent("dota_player_learned_ability", Dynamic_Wrap(Events, "OnAbilityLevelled"), Events)
	ListenToGameEvent("dota_player_pick_hero", Dynamic_Wrap(Events, "OnHeroPicked"), Events)
	ListenToGameEvent("hero_selected", Dynamic_Wrap(Events, "OnHeroSelected"), Events)
	ListenToGameEvent("dota_player_gained_level", Dynamic_Wrap(Events, "OnLevelGained"), Events)
end

function Events:OnHeroPicked(event)
	local hero = event.heroindex and EntIndexToHScript(event.heroindex) or nil

	if not hero then
		return
	end

	EventDriver:Dispatch("Events:hero_picked", {
		player_id = hero:GetPlayerOwnerID(),
		hero = hero,
	})
end

function Events:OnLevelGained(event)
	local hero = event.hero_entindex and EntIndexToHScript(event.hero_entindex) or nil

	if not IsValidEntity(hero) then
		return
	end

	EventDriver:Dispatch("Events:level_gained", {
		player_id = hero:GetPlayerOwnerID(),
		hero = hero,
		level = event.level or -1,
	})
end