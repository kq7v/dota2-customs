--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if Activated == nil then
	_G.Activated = false
	_G.GameEventListenerIDs = {}
	_G.tAbilityKeyEvents = {}
else
	_G.Activated = true
end
_G.tRequestEvents = {}
function GameEvent(eventName, func, context)
	local iListenerID = ListenToGameEvent(eventName, func, context)
	table.insert(GameEventListenerIDs, iListenerID)
	return iListenerID
end
---停止监听
function StopGameEvent(iListenerID)
	ArrayRemove(GameEventListenerIDs, iListenerID)
	StopListeningToGameEvent(iListenerID)
end

function RegisterClientEvent(sEvent, func, context)
	tRequestEvents[sEvent] = { callback = func, context = context }
end

function init(bReload)
	print("N2O", "enter_init")
	_G.json = require("game/dkjson")
	require("utils/utility_functions")
	require("kv")
	require("utils/client_utils")
	require("hero_builder_modifiers")
	require("Wearable_System.main") --新增的外观系统，用于替换身心

	print("N2O", "after_require")

	if not bReload then
		_G.ProfileSkinID = ""
	end

	-- local t = {
	-- -- "client/init",
	-- -- "mechanics/ability_upgrades",
	-- }
	-- for k, v in pairs(t) do
	-- 	local t = require(v)
	-- 	if t ~= nil and type(t) == "table" then
	-- 		_G[k] = t
	-- 		if t.init ~= nil then
	-- 			t:init(bReload)
	-- 		end
	-- 	end
	-- end

	GameEvent("client_reload_game_keyvalues", function()
		require("addon_game_mode_client")
	end)

	GameEvent("client_request_event", function(tData)
		local tEventTable = tRequestEvents[tData.event]
		if tEventTable == nil then
			return
		end

		local data = json.decode(tData.data)
		if data == nil then
			return
		end

		local result
		local func = tEventTable.callback
		if tEventTable.context ~= nil then
			result = func(tEventTable.context, data)
		else
			result = func(data)
		end
		if tData._IsFire ~= true and type(result) == "table" then
			local json_str = json.encode(result)
			_G.ClientRequestEventResult = json_str
		end
	end)

	GameEvent("custom_ability_key_event", function(tEvents)
		local tAbilityKeyEvent = tAbilityKeyEvents[tEvents.event_name]
		if tAbilityKeyEvent ~= nil then
			local iSlot = tAbilityKeyEvent.slot
			if tEvents.phase == 0 then
				SendToConsole(string.format("dota_ability_autocast %d", iSlot))
			elseif tEvents.phase == 1 then
				if tAbilityKeyEvent.quick_cast == true then
					SendToConsole(string.format("dota_ability_quickcast %d 1", iSlot))
				else
					SendToConsole(string.format("dota_ability_execute %d 1", iSlot))
				end
			elseif tEvents.phase == 2 then
				if tAbilityKeyEvent.quick_cast == true then
					SendToConsole(string.format("dota_ability_quickcast %d 0", iSlot))
				end
			end
		end
	end)
	GameEvent("change_profile_skin", function(tEvents)
		_G.ProfileSkinID = tEvents.skin_id
		-- print( "change_profile_skin", tEvents.skin_id)
	end)

	RegisterClientEvent("register_ability_key_event", function(tEvents)
		local sEventName = DoUniqueString(tEvents.key_name)
		SendToConsole(string.format("bind %s +%s", tEvents.key_name, sEventName))
		tAbilityKeyEvents[sEventName] =
			{ slot = tEvents.slot, key_name = tEvents.key_name, quick_cast = tEvents.quick_cast }
		return { event_name = sEventName }
	end)
	RegisterClientEvent("unregister_ability_key_event", function(tEvents)
		local tAbilityKeyEvent = tAbilityKeyEvents[tEvents.event_name]
		local bSuccess = false
		if tAbilityKeyEvent ~= nil then
			bSuccess = true
			tAbilityKeyEvents[tEvents.event_name] = nil
			SendToConsole(string.format("unbind %s +%s", tAbilityKeyEvent.key_name, tEvents.event_name))
		end
		return { success = bSuccess }
	end)
	RegisterClientEvent("get_ability_key_values", function(tEvents)
		local sAbilityName = tEvents.ability_name
		if
			type(sAbilityName) ~= "string"
			or #sAbilityName == 0
			or #sAbilityName > 128
			or string.match(sAbilityName, "^[%w_]+$") == nil
		then
			return { ability_key_values = {} }
		end
		local tAbilityKeyValues = GetAbilityKeyValuesByName(sAbilityName)
		return { ability_key_values = type(tAbilityKeyValues) == "table" and tAbilityKeyValues or {} }
	end)
end

print("addon_game_mode_client Activated:", Activated)
if Activated == true then
	print("N2O", "Activated == true")
	for i = #GameEventListenerIDs, 1, -1 do
		StopListeningToGameEvent(GameEventListenerIDs[i])
	end
	_G.GameEventListenerIDs = {}
	init(true)
else
	print("N2O", "Activated ~= true")
	init(false)
end