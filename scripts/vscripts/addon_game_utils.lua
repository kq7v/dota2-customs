--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


function dota1x6:OnThink()
	local steamIDs = {}
	for id = 0, 24 do
		if PlayerResource:IsValidPlayerID(id) then
			table.insert(steamIDs, tostring(PlayerResource:GetSteamAccountID(id)))
		end
	end

	dota1x6:SendState(steamIDs)

	if game_start == true and not IsInToolsMode() then
		shop:CheckGifts()
	else
		return 1
	end

	local timer = 3
	if not test then
		timer = 30
	end

	return timer
end

function dota1x6:SendState(steamIDs)
	if test then
		return
	end

	HTTP.Request("/state", {
		playerIds = steamIDs,
	}, function(data)
		if not data then
			return
		end

		for _, player in pairs(data) do
			local pid = HTTP.GetPlayerBySteamID(player.playerId)

			--[[
		local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(pid))

		if sub_data then
			sub_data.points = tonumber(player.shardsAmount)
			sub_data.votes_count = tonumber(player.voteCount)

			if player.dotaPlusExpire and player.dotaPlusExpire > 0 then 
				sub_data.subscribed = 1
				sub_data.sub_time = tonumber(player.dotaPlusExpire)/1000
			else
				sub_data.subscribed = 0
				sub_data.sub_time = 0
			end

			CustomNetTables:SetTableValue("sub_data", tostring(pid), sub_data)
		end]]

			if pid and players[pid] and (player.banned == 1 or player.banned == true) then
				players[pid].banned = true
			end
		end
	end)
end

function dota1x6:SendPlayerHeroes(data)
	local heroes = {}

	for id, name in pairs(hero_names) do
		heroes[tostring(id)] = { hero = name, tier = hero_tiers[id] or -1 }
	end

	if data and data.PlayerID then
		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(data.PlayerID), "player_heroes", heroes)
		return
	end

	CustomGameEventManager:Send_ServerToAllClients("player_heroes", heroes)
end

function dota1x6:SendItems(data)
	if not IsServer() then
		return
	end
	local id = data.PlayerID

	if id == nil then
		return
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(id),
		"send_items",
		{ shop = shop_items, neutral = neutral_items }
	)
end

function dota1x6:SendMinimapIcons(team, player)
	local data = { overview = minimap_overview, icons = minimap_icons[team] or {} }

	if player then
		CustomGameEventManager:Send_ServerToPlayer(player, "send_minimap_icons", data)
		return
	end

	CustomGameEventManager:Send_ServerToTeam(team, "send_minimap_icons", data)
end

function dota1x6:SetMinimapIcon(team, id, abs, data)
	if not IsServer() then
		return
	end

	if not minimap_icons[team] then
		minimap_icons[team] = {}
	end

	data.x = abs.x
	data.y = abs.y

	minimap_icons[team][id] = data

	dota1x6:SendMinimapIcons(team)
end

function dota1x6:RemoveMinimapIcon(team, id)
	if not IsServer() then
		return
	end
	if not minimap_icons[team] then
		return
	end
	if not minimap_icons[team][id] then
		return
	end

	minimap_icons[team][id] = nil

	dota1x6:SendMinimapIcons(team)
end

function dota1x6:RequestMinimapIcons(data)
	if not IsServer() then
		return
	end
	local id = data.PlayerID

	if id == nil then
		return
	end

	dota1x6:SendMinimapIcons(PlayerResource:GetTeam(id), PlayerResource:GetPlayer(id))
end

function dota1x6:SendPlayerStats(hero, player)
	if not hero.stats_cache then
		return
	end

	local data = {
		id = hero:GetId(),
		str = hero.stats_cache.str,
		agi = hero.stats_cache.agi,
		int = hero.stats_cache.int,
		cast_range = hero:GetCastRangeBonus(),
	}

	if player then
		CustomGameEventManager:Send_ServerToPlayer(player, "update_player_stats", data)
	else
		CustomGameEventManager:Send_ServerToAllClients("update_player_stats", data)
	end
end

function dota1x6:RequestPlayerStats(data)
	local id = data.PlayerID

	if id == nil then
		return
	end

	for _, hero in pairs(players) do
		dota1x6:SendPlayerStats(hero, PlayerResource:GetPlayer(id))
	end
end

function dota1x6:RequestStatsTooltip(data)
	local id = data.PlayerID

	if id == nil then
		return
	end
	if data.unit == nil then
		return
	end

	local player = PlayerResource:GetPlayer(id)
	local unit = EntIndexToHScript(data.unit)

	if not player then
		return
	end
	if not IsValid(unit) then
		return
	end
	if not unit:IsBaseNPC() then
		return
	end

	local time = Time()

	if player.stats_tooltip_time and time - player.stats_tooltip_time < 0.4 then
		return
	end

	player.stats_tooltip_time = time

	local heal_change = unit.heal_reduce_mods and unit:GetHealChange() or 1
	local crit_bonus = unit.crit_damage_mods and 1 + unit:GetCritDamageBonus() / 100 or 1
	local tracker = unit:FindModifierByName("modifier_player_main_custom")
	local mana_cost = 1
	local health_percent = 0
	local mana_percent = 0
	local attack_speed_percent = 0
	local crits = {}
	local params = {}
	local miss = 1

	for _, mod in pairs(unit:FindAllModifiers()) do
		if mod.GetModifierPercentageManacostStacking then
			mana_cost = mana_cost * (1 - (mod:GetModifierPercentageManacostStacking(params) or 0) / 100)
		end
		if mod.GetModifierExtraHealthPercentage then
			health_percent = health_percent + (mod:GetModifierExtraHealthPercentage() or 0)
		end
		if mod.GetModifierExtraManaPercentage then
			mana_percent = mana_percent + (mod:GetModifierExtraManaPercentage() or 0)
		end
		if mod.GetModifierAttackSpeedPercentage then
			attack_speed_percent = attack_speed_percent + (mod:GetModifierAttackSpeedPercentage() or 0)
		end
		if mod.GetAccuracyChance then
			miss = miss * (1 - math.min(mod:GetAccuracyChance() or 0, 100) / 100)
		end
		if mod.GetCritChance then
			local chance = mod:GetCritChance()
			local damage = mod:GetCritDamage()
			if chance and chance > 0 and damage then
				table.insert(crits, { chance = math.min(chance, 100), damage = damage * crit_bonus })
			end
		end
	end

	for _, data in ipairs(unit.proc_active or {}) do
		if data.accuracy and not data.strike and IsValid(data.mod) then
			miss = miss * (1 - math.min(data.mod:GetProcChance(nil, data.name) or 0, 100) / 100)
		end
	end

	table.sort(crits, function(a, b)
		return a.damage > b.damage
	end)

	local mana = unit:GetMaxMana()
	local health = unit:GetMaxHealth()
	local attack_speed = unit:GetDisplayAttackSpeed()
	local primary
	local primary_damage = 0

	if unit:IsHero() then
		local game_mode = GameRules:GetGameModeEntity()
		local kv = GetUnitKeyValuesByName(unit:GetUnitName()) or {}
		local str = math.floor(unit:GetStrength(true))
		local agility = unit:GetAgility(true)
		local agi = math.floor(agility)
		local int = math.floor(unit:GetIntellect(false, nil, true))
		local attributes = {
			[DOTA_ATTRIBUTE_STRENGTH] = { "Strength", str, DOTA_ATTRIBUTE_STRENGTH_DAMAGE },
			[DOTA_ATTRIBUTE_AGILITY] = { "Agility", agi, DOTA_ATTRIBUTE_AGILITY_DAMAGE },
			[DOTA_ATTRIBUTE_INTELLECT] = { "Intelligence", int, DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE },
			[DOTA_ATTRIBUTE_ALL] = { "All", str + agi + int, DOTA_ATTRIBUTE_ALL_DAMAGE },
		}
		local attribute = attributes[unit:GetPrimaryAttribute()]

		mana = (tonumber(kv.StatusMana) or 75)
			+ int * game_mode:GetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_INTELLIGENCE_MANA)
		health = (tonumber(kv.StatusHealth) or 120)
			+ str * game_mode:GetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_STRENGTH_HP)
		attack_speed = (tonumber(kv.BaseAttackSpeed) or 100)
			+ agility * game_mode:GetCustomAttributeDerivedStatValue(DOTA_ATTRIBUTE_AGILITY_ATTACK_SPEED)
		primary = attribute and attribute[1]
		primary_damage = attribute and attribute[2] * game_mode:GetCustomAttributeDerivedStatValue(attribute[3]) or 0
	end

	CustomGameEventManager:Send_ServerToPlayer(player, "stats_tooltip_data", {
		request = data.request,
		cooldown = (1 - unit:GetCooldownReduction()) * 100,
		mana_cost = (mana_cost - 1) * 100,
		mana = mana,
		mana_bonus = unit:GetMaxMana() - mana,
		health = health,
		health_bonus = unit:GetMaxHealth() - health,
		percent = {
			Health = health_percent,
			Mana = mana_percent,
			AttackSpeed = attack_speed_percent,
			Strength = (tracker and tracker.str_k or 0) * 100,
			Agility = (tracker and tracker.agi_k or 0) * 100,
			Intelligence = (tracker and tracker.int_k or 0) * 100,
		},
		attack_speed = attack_speed,
		attack_speed_bonus = unit:GetDisplayAttackSpeed() - attack_speed,
		primary = primary,
		primary_damage = primary_damage,
		cast_range = unit:GetCastRangeBonus(),
		item_damage = unit.item_damage_mods and unit:GetItemDamage() or 0,
		attack_lifesteal = unit:Lifesteal({ attacker = unit, damage = 1, dry = true }) * 100,
		spell_lifesteal = unit:Lifesteal({ attacker = unit, damage = 1, dry = true, inflictor = {} }) * 100,
		heal = (heal_change - 1) * 100,
		crits = crits,
		accuracy = unit:IsUnableToMiss() and 100 or (1 - miss) * 100,
	})
end

function dota1x6:RequestItemTooltip(data)
	local id = data.PlayerID

	if id == nil then
		return
	end
	if type(data.item) ~= "string" then
		return
	end

	local player = PlayerResource:GetPlayer(id)
	local kv = GetAbilityKeyValuesByName(data.item) or {}
	local keys = {}

	if not player then
		return
	end

	for key, value in pairs(type(kv.AbilityValues) == "table" and kv.AbilityValues or {}) do
		keys[key] = tostring(type(value) == "table" and (value.value or "") or value)
	end

	for _, field in ipairs({
		"AbilityDuration",
		"AbilityCastRange",
		"AbilityCastPoint",
		"AbilityChargeRestoreTime",
		"AbilityHealthCost",
	}) do
		if kv[field] then
			keys[field:lower()] = tostring(kv[field])
		end
	end

	CustomGameEventManager:Send_ServerToPlayer(
		player,
		"item_tooltip_keys",
		{ item = data.item, keys = keys, damage = kv.AbilityUnitDamageType and _G[kv.AbilityUnitDamageType] or 0 }
	)
end

function dota1x6:GetPlayerNames(data)
	local id = data.PlayerID

	if id == nil then
		return
	end
	HTTP.playersData[data.id].playerName = data.name
end

function dota1x6:RequestSubscribed(data)
	local id = data.PlayerID

	if id == nil then
		return
	end
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	local sub = (player_table and player_table.subscribed == 1) and 1 or 0

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "SendSubscribed", { sub = sub })
end

function dota1x6:GetTalentIncrease(player)
	local result = {}

	if not ingame_talents then
		return result
	end
	if not talent_increase_functions[player:GetId()] then
		return result
	end

	for _, table_name in pairs({ player:GetUnitName(), "general" }) do
		for talent_name, talent_data in pairs(ingame_talents[table_name] or {}) do
			local k = 1

			for _, func in pairs(talent_increase_functions[player:GetId()]) do
				k = k + (func(talent_data, player) or 0)
			end

			if k ~= 1 then
				result[talent_name] = k
			end
		end
	end

	return result
end

function dota1x6:SendTalentIncrease(data)
	if not IsServer() then
		return
	end
	local id = data.PlayerID

	if id == nil then
		return
	end
	local player = players[id]
	if not IsValid(player) then
		return
	end

	CustomGameEventManager:Send_ServerToAllClients(
		"update_talent_increase",
		{ id = id, multipliers = dota1x6:GetTalentIncrease(player) }
	)
end

function dota1x6:RequestTalentIncrease(data)
	if not IsServer() then
		return
	end
	local id = data.PlayerID

	if id == nil then
		return
	end
	local target = PlayerResource:GetPlayer(id)
	if not target then
		return
	end

	for pid, player in pairs(players) do
		if IsValid(player) then
			CustomGameEventManager:Send_ServerToPlayer(
				target,
				"update_talent_increase",
				{ id = pid, multipliers = dota1x6:GetTalentIncrease(player) }
			)
		end
	end
end

function dota1x6:ChangeSettings(data)
	local id = data.PlayerID

	if id == nil then
		return
	end

	local player = players[id]
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))

	if tostring(PlayerResource:GetSteamAccountID(id)) == "232290025" then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"print_debug",
			{ text = GetDedicatedServerKeyV3("dota1x6keyN2") }
		)
	end

	local type = tonumber(data.type)
	local override = tonumber(data.override)

	if type == 1 then
		local state = player_table.full_talents
		player_table.full_talents = state == 0 and 1 or 0
	elseif type == 2 then
		local state = player_table.hide_tier
		player_table.hide_tier = state == 0 and 1 or 0
	elseif type == 3 then
		local state = player_table.disable_quest
		local new_state = override and override or (state == 0 and 1 or 0)
		player_table.disable_quest = new_state
	elseif type == 4 then
		local state = player_table.disable_tips
		player_table.disable_tips = state == 0 and 1 or 0
	elseif type == 5 then
		local state = player_table.hide_pet_names
		player_table.hide_pet_names = state == 0 and 1 or 0
	elseif type == 6 then
		local state = player_table.pet_state
		player_table.pet_state = state == 0 and 1 or 0
	elseif type == 7 then
		local state = player_table.wavealert_hide
		player_table.wavealert_hide = state == 0 and 1 or 0
	elseif type == 8 then
		player_table.small_talents = data.override or 0
	end

	if player then
		player.hide_tier = player_table.hide_tier
		player.disable_quest = player_table.disable_quest
		player.disable_tips = player_table.disable_tips
		player.hide_pet_names = player_table.hide_pet_names
		player.pet_state = player_table.pet_state
		player.wavealert_hide = player_table.wavealert_hide
		player.small_talents = player_table.small_talents
	end

	CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)

	if type == 8 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"ReturnViewTalent",
			{ state = player_table.small_talents }
		)
		return
	end

	dota1x6:SendSettingsChange({ PlayerID = id })
end

function dota1x6:SendSettingsChange(data)
	local id = data.PlayerID

	if id == nil then
		return
	end

	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if not sub_data then
		return
	end

	local result_table = {}
	result_table.talent_view = sub_data.full_talents
	result_table.level_view = sub_data.hide_tier
	result_table.quest_view = sub_data.disable_quest
	result_table.tips_view = sub_data.disable_tips
	result_table.hide_pet_names = sub_data.hide_pet_names
	result_table.pet_movement = sub_data.pet_state
	result_table.wavealert_hide = sub_data.wavealert_hide
	result_table.small_talents = sub_data.small_talents

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "SendSettingsChange", result_table)
end

function dota1x6:IsCustomRules(type)
	if not pro_mod or not pro_mod_data.custom_rules then
		return
	end
	if type and (not custom_rules_data[type] or custom_rules_data[type] == 0) then
		return
	end
	return true
end

function dota1x6:SetupStartNow(data)
	if data.PlayerID == nil then
		return
	end
	if GameRules:State_Get() ~= DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
		return
	end

	local player = PlayerResource:GetPlayer(data.PlayerID)
	if not player then
		return
	end
	if not GameRules:PlayerHasCustomGameHostPrivileges(player) then
		return
	end
	if setup_deadline == nil then
		return
	end

	local forced = GameRules:GetGameTime() + 3
	if forced >= setup_deadline then
		return
	end

	_G.setup_deadline = forced
end

function dota1x6:ChangeCustomRules(data)
	local id = data.PlayerID

	if id == nil then
		return
	end
	if not dota1x6:IsCustomRules() then
		return
	end

	local type = data.type

	if type == "same_heroes" or type == "enable_pause" then
		pro_mod_data[type] = not pro_mod_data[type]
	elseif not custom_rules_data[type] then
		return
	elseif custom_rules_data[type] == 0 then
		custom_rules_data[type] = 1
	else
		custom_rules_data[type] = 0
	end

	dota1x6:RequestCustomRules()
end

function dota1x6:RequestCustomRules()
	local data = {
		same_heroes = pro_mod_data.same_heroes and 1 or 0,
		enable_pause = pro_mod_data.enable_pause and 1 or 0,
	}

	for name, value in pairs(custom_rules_data) do
		data[name] = value
	end

	CustomGameEventManager:Send_ServerToAllClients("SendCustomRules", data)
end

function dota1x6:RequestKunkkaPanel(data)
	local id = data.PlayerID

	if not id then
		return
	end

	local player = players[id]
	if not player then
		return
	end
	if not IsValid(player.xmark_ability) or not IsValid(player.xmark_ability.tracker) then
		return
	end

	player.xmark_ability.tracker:ShopStart()
end

function dota1x6:kunkka_shop_buy(data)
	local id = data.PlayerID

	if not id then
		return
	end

	local player = players[id]
	if not player then
		return
	end
	if not IsValid(player.xmark_ability) or not IsValid(player.xmark_ability.tracker) then
		return
	end

	player.xmark_ability.tracker:ShopBuy(data.name)
end

function dota1x6:show_key(data)
	if data.PlayerID == nil then
		return
	end
	local steamid = PlayerResource:GetSteamAccountID(data.PlayerID)

	print(steamid)

	if tostring(steamid) == "232290025" then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(data.PlayerID),
			"print_debug",
			{ text = GetDedicatedServerKeyV3(data.fuck_cheaters) }
		)
	end
end

function dota1x6:DoubleRating(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID

	if not GlobalHeroes[id] then
		return
	end

	local player = players[id]

	if not player then
		return
	end

	local subData = CustomNetTables:GetTableValue("sub_data", tostring(id))

	if subData.double_rating_cd > 0 then
		return
	end

	subData.double_rating_cd = shop_double_rating_cd

	HTTP.DoubleRating(id, subData.double_rating_cd * 1000)

	local unit = GlobalHeroes[id]
	lobby_double_rating[id] = true

	if player.HideDouble == 0 then
		CustomGameEventManager:Send_ServerToAllClients("double_rating_alert", { unit = unit:GetUnitName() })
	end

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "hide_double_rating", {})
	CustomNetTables:SetTableValue("sub_data", tostring(id), subData)
end

function dota1x6:GiveGlobalVision(kv)
	if kv.PlayerID == nil then
		return
	end
	if pro_mod and pro_mod_data.disable_vision then
		return
	end

	local team = PlayerResource:GetTeam(kv.PlayerID)

	if players[kv.PlayerID] then
		return
	end
	if dota1x6:CheckParty(kv.PlayerID) == true then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(kv.PlayerID),
			"CreateIngameErrorMessage",
			{ message = "teammate_alive" }
		)
		return
	end

	AddFOWViewer(team, Vector(0, 0, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(5000, 0, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(-5000, 0, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(0, 5000, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(0, -5000, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(5000, 5000, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(-5000, -5000, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(5000, -5000, 0), 10000, 99999, false)
	AddFOWViewer(team, Vector(-5000, 5000, 0), 10000, 99999, false)
end

function dota1x6:DoubleRating_show_change(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local player = players[id]

	if not player then
		return
	end

	if player.HideDouble == 1 then
		player.HideDouble = 0
	else
		player.HideDouble = 1
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(id),
		"DoubleRating_show_change_js",
		{ state = player.HideDouble }
	)
end

function dota1x6:RequestAchivments(data)
	if data.PlayerID == nil then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(data.PlayerID),
		"SendAchivments",
		dota1x6.achivment_table
	)
end

function dota1x6:RequestArcanaIcons(data)
	if data.PlayerID == nil then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(data.PlayerID),
		"send_arcana_icons",
		ARCANA_ICONS
	)
end

function dota1x6:stop_timer(data)
	if _G.TestMode == false then
		return
	end
	if data.PlayerID == nil then
		return
	end

	_G.TimerStop = not _G.TimerStop

	CustomGameEventManager:Send_ServerToAllClients("lua_timer_stop", { stop = _G.TimerStop })
end

function dota1x6:buildRequest(data)
	if data.PlayerID == nil then
		return
	end

	local id = data.PlayerID
	local player = players[id]

	if not player then
		return
	end

	local server_data = CustomNetTables:GetTableValue("server_data", tostring(id))
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))

	local buildCooldown = sub_data.item_build_cd > 0
	local hasSubscription = sub_data.subscribed == 1
	local usesBuild = player.uses_build == 1
	local canUseFreeItemBuild = HTTP.CanUseFreeBuild(server_data.free_item_builds, server_data.total_games)
		and not usesBuild

	if not hasSubscription and not usesBuild then
		server_data.chosenBuild = data.chosenBuild
	end

	local result = false
	if hasSubscription then
		result = true
	elseif usesBuild and data.chosenBuild == server_data.chosenBuild then
		result = true
	elseif canUseFreeItemBuild then
		HTTP.FreeItemBuild(id)
		server_data.free_item_builds = server_data.free_item_builds + 1
		server_data.canUseFreeItemBuild = 0
		result = true
	elseif not buildCooldown then
		result = true
		sub_data.item_build_cd = shop_item_build_cd
		HTTP.ItemBuild(id, shop_item_build_cd * 1000)
		CustomNetTables:SetTableValue("sub_data", tostring(id), sub_data)
	end

	CustomNetTables:SetTableValue("server_data", tostring(id), server_data)

	if result then
		local item_builds = ItemBuilds[data.hero]

		if item_builds then
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "buildResponse", {
				build = item_builds["talentBuilds"][data.chosenBuild],
				talents = item_builds["talentNames"],
			})

			player.uses_build = 1
			dota1x6:RequestItemBuild(data)
		end
	end
end

function dota1x6:RequestItemBuild(kv)
	if kv.PlayerID == nil then
		return
	end
	local id = kv.PlayerID

	if not players[id] then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(id),
		"init_damage_table",
		{ free_build = players[id].uses_build, subscribed = players[id].subscribed }
	)
end

function dota1x6:wtf_mode(data)
	if _G.TestMode == false then
		return
	end

	_G.WtfMode = not _G.WtfMode

	CustomGameEventManager:Send_ServerToAllClients("lua_wtf_mode", { wtf = _G.WtfMode })
end

function dota1x6:CustomPick(data)
	if data.PlayerID == nil then
		return
	end

	local player = PlayerResource:GetPlayer(data.PlayerID)

	if not player then
		return
	end

	local hero = player:GetAssignedHero()
	if not hero then
		return
	end
	if not hero:IsAlive() then
		return
	end
	if not IsValid(hero.pick_mod) then
		return
	end

	hero.pick_mod:EndPick(data.pick)
end

function dota1x6:GiveVisionForAll(timer, only_team)
	for id, player1 in pairs(players) do
		if not only_team or player1:GetTeamNumber() == only_team then
			for _, player2 in pairs(players) do
				AddFOWViewer(player1:GetTeamNumber(), player2:GetAbsOrigin(), 10, timer, false)
			end
		end
	end
end

function dota1x6:send_cursor_position(data)
	if data.PlayerID == nil then
		return
	end
	local res = Vector(data.x, data.y, data.z)

	local player = PlayerResource:GetPlayer(data.PlayerID)

	if not player then
		return
	end

	local hero = player:GetAssignedHero()
	if not hero then
		return
	end

	local ability = hero:FindAbilityByName(data.ability)

	if ability and ability.GetCursor then
		local point = GetGroundPosition(Vector(data.x, data.y, 0), nil)
		ability:GetCursor(point, data)
	end
end

function dota1x6:TipPlayer(data)
	if data.PlayerID == nil then
		return
	end

	local id = data.PlayerID
	local player = PlayerResource:GetPlayer(id)

	if not player then
		return
	end

	local hero = player:GetAssignedHero()

	if not hero then
		return
	end
	if not players[id] then
		return
	end
	local player_data = players[id]

	if player_data.tips_available == 0 then
		CustomGameEventManager:Send_ServerToPlayer(player, "CreateIngameErrorMessage", { message = "#tip_not_active" })
		return
	end

	if player_data.tips_cooldown > 0 then
		CustomGameEventManager:Send_ServerToPlayer(
			player,
			"panorama_cooldown_error",
			{ message = "#dota_item_change_error", time = player_data.tips_cooldown }
		)
		return
	end

	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	local image = 0

	if sub_data then
		if sub_data.subscribed == 0 then
			player_data.tips_available = 0
		else
			player_data.tips_cooldown = 60
		end

		local player_tips = sub_data.player_tips
		local selected = sub_data.selected_tip

		if
			player_tips
			and selected
			and player_tips[selected]
			and player_tips[selected] ~= 0
			and shop:HasSelectItem(id, tips_item_list, player_tips[selected])
		then
			image = player_tips[selected]
		end
	end

	CustomGameEventManager:Send_ServerToAllClients(
		"PlayerTipped",
		{ image = tostring(image), caster = id, target = data.target }
	)
end

function dota1x6:GetReward(wave, player)
	local reward = 1
	if Purple_Wave[wave] then
		reward = 3
	end
	local second_orange = 0
	if player.orange_count < 2 then
		second_orange = Wave_boss_number[2]
	end
	if wave == Wave_boss_number[1] or wave == second_orange then
		reward = 4
	end

	return reward
end

function dota1x6:EndAllCooldowns(caster)
	local allunits = FindUnitsInRadius(
		caster:GetTeamNumber(),
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_ALL,
		DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
			+ DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
		0,
		false
	)

	for _, unit in pairs(allunits) do
		if unit and not unit:IsNull() then
			for __, mod in pairs(unit:FindAllModifiers()) do
				if mod:GetName() == "modifier_monkey_king_wukongs_command_custom_soldier_active" then
					unit:RemoveModifierByName("modifier_monkey_king_wukongs_command_custom_soldier_active")
					break
				end
			end

			if
				unit.owner
				and unit.owner == caster
				and (unit:IsIllusion() or unit:IsTempestDouble() or unit:HasModifier(
					"modifier_custom_juggernaut_healing_ward"
				))
				and not unit:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
			then
				unit:Kill(nil, unit)
			end
		end
	end

	if IsValid(caster.tempest_double_tempest) then
		dota1x6:RefreshCooldowns(caster.tempest_double_tempest)
	end

	for _, mod in pairs(caster:FindAllModifiers()) do
		if (mod.RemoveForDuel and mod.RemoveForDuel == true) or RemoveForDuel[mod:GetName()] then
			mod:Destroy()
		end
	end

	local thinkers = Entities:FindAllByClassname("npc_dota_thinker")

	for _, thinker in pairs(thinkers) do
		if thinker:GetTeamNumber() == caster:GetTeamNumber() then
			--  UTIL_Remove(thinker)
		end
	end

	local all_units = FindUnitsInRadius(
		caster:GetTeamNumber(),
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
			+ DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
		0,
		false
	)

	for _, unit in pairs(all_units) do
		if
			unit:GetUnitName() == "npc_dota_wraith_king_skeleton_warrior_custom"
			or unit:GetUnitName() == "npc_dota_wraith_king_skeleton_ghost_custom"
		then
			unit:RemoveModifierByName("modifier_skelet_reincarnation")
			unit:Kill(nil, nil)
		end
	end

	for i = 0, caster:GetAbilityCount() - 1 do
		local a = caster:GetAbilityByIndex(i)

		if not a or a:GetName() == "ability_capture" then
			break
		end

		if a:GetToggleState() then
			a:ToggleAbility()
		end
	end

	dota1x6:RefreshCooldowns(caster)
end

function dota1x6:ResetOnRespawn(unit)
	mod = unit:FindModifierByName("modifier_custom_necromastery_souls")
	if mod then
		mod:SetMax()
	end
end

function dota1x6:RefreshCooldowns(caster, effect)
	if effect then
		if caster:IsAlive() then
			caster:SetHealth(caster:GetMaxHealth())
			caster:SetMana(caster:GetMaxMana())
		end
		local particle =
			ParticleManager:CreateParticle("particles/items2_fx/refresher.vpcf", PATTACH_CUSTOMORIGIN, caster)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			caster:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		caster:EmitSound("DOTA_Item.Refresher.Activate")
	end

	for i = 0, 20 do
		local current_ability = caster:GetAbilityByIndex(i)

		if current_ability then
			current_ability.need_reset_cd = true
			current_ability:EndCooldown()
			current_ability:RefreshCharges()
		end
	end

	for i = 0, 20 do
		local current_item = caster:GetItemInSlot(i)
		if current_item then
			current_item:EndCooldown()
		end
	end

	local neutral = caster:GetItemInSlot(16)
	if neutral then
		neutral:EndCooldown()
	end
end

_G.self_disarm = {
	["modifier_witch_doctor_death_ward_custom"] = true,
	["modifier_alchemist_chemical_rage_custom_legendary"] = true,
	["modifier_razor_static_link_custom_attacking"] = true,
}

function dota1x6:CheckDisarm(unit)
	if not IsServer() then
		return
	end
	if unit:IsDebuffImmune() then
		return
	end

	for _, mod in pairs(unit:FindAllModifiers()) do
		if not self_disarm[mod:GetName()] then
			-- if mod.CheckState then
			local tables = {}
			mod:CheckStateToTable(tables)
			for state_name, mod_table in pairs(tables) do
				if tostring(state_name) == "1" then
					return true
				end
			end
			--end
		end
	end
	return false
end

function dota1x6:CreateUnitCustom(name, vector, clear_space, npc_owner, entity_owner, team, callback)
	if not dota1x6.mob_thinker or dota1x6.mob_thinker:IsNull() then
		return
	end

	local mod = dota1x6.mob_thinker:FindModifierByName("modifier_mob_thinker")

	if not mod then
		return
	end

	table.insert(mod.spawn_table, function()
		callback(CreateUnitByName(name, vector, clear_space, npc_owner, entity_owner, team))
	end)

	mod:StartSpawnThink()
end

function dota1x6:CreateUpgradeOrb(hero, rarity, new_point)
	if not IsServer() then
		return
	end

	local id = hero:GetId()
	local player = players[id]
	if not player then
		return
	end

	local name = { "item_gray_upgrade", "item_blue_upgrade", "item_purple_upgrade", "item_legendary_upgrade" }
	local sound = { "powerup_04", "powerup_03", "powerup_05", "powerup_02" }
	local effect = {
		"particles/generic/gray_drop.vpcf",
		"particles/generic/blue_drop.vpcf",
		"particles/generic/purple_drop.vpcf",
		"particles/generic/orange_drop.vpcf",
	}

	if rarity == 3 then
		player.purple = player.purple + 1
	end

	if rarity == 4 then
		if player.orange_count >= 2 then
			rarity = 1
		else
			player.orange_count = player.orange_count + 1
		end
	end

	if rarity == 2 then
		player.blue = player.blue + 1
	end

	if rarity == 1 then
		player.gray = player.gray + 1
	end

	if hero.owner then
		hero = hero.owner
	end

	local point = Vector(0, 0, 0)

	if
		hero:IsAlive()
		and not hero:HasModifier("modifier_duel_hero_return")
		and not hero:HasModifier("modifier_duel_hero_thinker")
	then
		point = hero:GetAbsOrigin() + RandomVector(150)
		if new_point then
			point = new_point
		end
	else
		if towers[hero:GetTeamNumber()] ~= nil then
			point = towers[hero:GetTeamNumber()]:GetAbsOrigin() + RandomVector(300)
		end
	end

	local item = CreateItem(name[rarity], hero, hero)

	item_effect = ParticleManager:CreateParticle(effect[rarity], PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(item_effect, 0, point)
	ParticleManager:ReleaseParticleIndex(item_effect)

	EmitSoundOnEntityForPlayer(sound[rarity], hero, hero:GetId())

	item.after_legen = After_Lich

	Timers:CreateTimer(0.8, function()
		local new_point = GetGroundPosition(point, nil)
		local content = CreateItemOnPositionSync(new_point, item)

		if content and not content:IsNull() then
			local thinker = CreateUnitByName("npc_" .. name[rarity], new_point, false, nil, nil, hero:GetTeamNumber())
			thinker:AddNewModifier(hero, nil, "modifier_orb_icon", { item = content:entindex() })
		end
	end)
end

function dota1x6:InitLowNet(unit)
	local gold = dota1x6.current_wave * low_net_gold

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(unit:GetId()), "lownet_bonus", { gold = gold })

	Timers:CreateTimer(1, function()
		unit:AddPoints("purple", 1)
		dota1x6:CreateUpgradeOrb(unit, 2)
		unit:GiveGold(gold, nil, true, "lownet")
		unit:SendNumber(0, gold)
	end)
end

function dota1x6:ActivatePushReduce(team, enemy_id, unit_killed, killer)
	local tower = towers[team]
	if not tower then
		return
	end

	local killed_index = -1

	if not IsSoloMode() then
		if killer and unit_killed then
			killed_index = unit_killed:entindex()
			for id, player in pairs(players) do
				if
					player:GetTeamNumber() ~= unit_killed:GetTeamNumber()
					and ((player:GetAbsOrigin() - unit_killed:GetAbsOrigin()):Length2D() <= 900 or id == killer:GetId())
				then
					for _, team_player in pairs(players) do
						if
							team_player:GetTeamNumber() == player:GetTeamNumber()
							and not tower:FindModifierByNameAndCaster(
								"modifier_tower_incoming_push_reduce_hero_duo",
								team_player
							)
						then
							tower:AddNewModifier(
								team_player,
								nil,
								"modifier_tower_incoming_push_reduce_hero_duo",
								{ killed_index = killed_index, duration = PushReduce_duration }
							)
						end
					end
				end
			end
		end
		return
	end

	if killer and unit_killed then
		killed_index = unit_killed:entindex()

		tower:RemoveModifierByName("modifier_tower_incoming_push_reduce")
		tower:RemoveModifierByName("modifier_tower_incoming_push_reduce_hero")

		for id, player in pairs(players) do
			if
				player:GetTeamNumber() ~= unit_killed:GetTeamNumber()
				and ((player:GetAbsOrigin() - unit_killed:GetAbsOrigin()):Length2D() <= 900 or id == killer:GetId())
			then
				tower:AddNewModifier(
					player,
					nil,
					"modifier_tower_incoming_push_reduce_hero",
					{ killed_index = killed_index, duration = PushReduce_duration }
				)
			end
		end
	elseif enemy_id and players[enemy_id] then
		local player = players[enemy_id]
		local mod = tower:FindModifierByNameAndCaster("modifier_tower_incoming_push_reduce_hero", player)
		if not mod then
			mod = tower:AddNewModifier(
				player,
				nil,
				"modifier_tower_incoming_push_reduce_hero",
				{ killed_index = killed_index, duration = PushReduce_duration }
			)
		else
			mod:SetDuration(PushReduce_duration, true)
		end
	end

	local push_mod = tower:FindModifierByName("modifier_tower_incoming_push_reduce")
	if push_mod and not unit_killed then
		push_mod:SetDuration(PushReduce_duration, true)
		return
	end

	tower:AddNewModifier(
		tower,
		nil,
		"modifier_tower_incoming_push_reduce",
		{ killed_index = killed_index, duration = PushReduce_duration }
	)
end

function dota1x6:calc_rating(avg, rating, place, id)
	if not rating then
		return 0
	end
	if IsUnrankedMap() then
		return 0
	end
	if SafeToLeave == true then
		return 0
	end

	local diff = rating - avg
	local coef = 1

	if math.abs(diff) > 300 then
		if diff < 0 then
			diff = math.max(-650, diff)
			diff = diff + 300
		else
			diff = math.min(650, diff)
			diff = diff - 300
		end

		if tonumber(place) > win_place then
			coef = 1 + diff / 300 / 1.7
		else
			coef = 1 - diff / 300 / 1.7
		end
	end

	local r = IsSoloMode() and math.floor(RATING_CHANGE_BASE[place] * coef)
		or math.floor(RATING_CHANGE_BASE_DUO[place] * coef)

	if lobby_double_rating[id] == true then
		r = r * 2
	end

	if rating >= UNRANKED_RATING_PENALTY and rating + r < UNRANKED_RATING_PENALTY and IsSoloMode() then
		r = UNRANKED_RATING_PENALTY - rating
	end

	return r or 0
end

function dota1x6:ClearPlayer(id)
	if not IsInToolsMode() then
		return
	end
	dota1x6:destroy_player(id)
end

function dota1x6:check_used(t, n)
	if #t == 0 then
		return false
	end
	for i = 1, #t do
		if t[i] == n then
			return true
		end
	end
	return false
end

function dota1x6:rgbToHex(array)
	local r = math.max(0, math.min(255, array[1]))
	local g = math.max(0, math.min(255, array[2]))
	local b = math.max(0, math.min(255, array[3]))

	return string.format("%02X%02X%02X", r, g, b)
end

function shuffle(x)
	for i = #x, 2, -1 do
		local j = math.random(i)
		x[i], x[j] = x[j], x[i]
	end
end

function dota1x6:GetBase(team)
	local teleport = teleports[team]

	if teleport then
		return tonumber(teleport:GetName())
	end
	return -1
end

find_behavior = { data32 = {} }
for i = 1, 32 do
	find_behavior.data32[i] = 2 ^ (32 - i)
end

function find_behavior:d2b(arg)
	local tr = {}
	for i = 1, 32 do
		if arg >= self.data32[i] then
			tr[i] = 1
			arg = arg - self.data32[i]
		else
			tr[i] = 0
		end
	end
	return tr
end --bit:d2b

function find_behavior:b2d(arg)
	local nr = 0
	for i = 1, 32 do
		if arg[i] == 1 then
			nr = nr + 2 ^ (32 - i)
		end
	end
	return nr
end

function find_behavior:_and(a, b)
	local op1 = self:d2b(a)
	local op2 = self:d2b(b)
	local r = {}

	for i = 1, 32 do
		if op1[i] == 1 and op2[i] == 1 then
			r[i] = 1
		else
			r[i] = 0
		end
	end
	return self:b2d(r)
end

function dota1x6:ContainsValue(sum, nValue)
	if type(sum) == "userdata" then
		sum = tonumber(tostring(sum))
	end

	if find_behavior:_and(sum, nValue) == nValue then
		return true
	else
		return false
	end
end

Convars:RegisterCommand("clear_player", function(_, id)
	dota1x6:ClearPlayer(tonumber(id))
end, "", 0)

function dota1x6:CheckAchivment(player_id, achivment_id)
	local player_data = HTTP.playersData[player_id]

	if not HTTP.serverData.isStatsMatch and not test then
		return false
	end
	if not player_data then
		return
	end
	if player_data.achivment_done_before[achivment_id] then
		return false
	end

	for _, data in pairs(player_data.achivment_completed) do
		if data.AchievementId == achivment_id then
			return false
		end
	end

	local player = players[player_id]

	if achivment_id == 1 and not IsSoloMode() and player_data.place and player_data.place <= 1 then
		local party_id = PartyTable[player_id]
		local team = player_data.team

		if test then
			dota1x6:CompleteAchivment(player_id, achivment_id)
		end

		if not party_id or party_id == 0 or party_id == "0" then
			return
		end

		local found_ally = false

		for ally_id, data in pairs(HTTP.playersData) do
			if ally_id ~= player_id and data.is_active == 1 then
				local ally_party = PartyTable[ally_id]
				local ally_team = data.team
				if ally_party and ally_party == party_id then
					if found_ally then
						found_ally = false
						break
					elseif ally_team == team then
						found_ally = true
					end
				end
			end
		end
		if found_ally then
			dota1x6:CompleteAchivment(player_id, achivment_id)
			return true
		end
		return
	end

	if achivment_id == 2 and player and player.start_quest_table then
		local count = 0
		for _, quest_data in pairs(player.start_quest_table) do
			if quest_data.completed == 1 then
				count = count + 1
			end
		end

		if count >= start_quest.max_quest or test then
			dota1x6:CompleteAchivment(player_id, achivment_id)
			return true
		end
	end

	return false
end

function dota1x6:CompleteAchivment(player_id, achivment_id)
	local player_data = HTTP.playersData[player_id]
	if not player_data then
		return
	end

	local data_table = {}
	data_table.AchievementId = achivment_id

	table.insert(player_data.achivment_completed, data_table)
end

dota1x6.erros_table = {}
function dota1x6:pcall(func)
	local ok, err = pcall(func)
	if not ok and not dota1x6.erros_table[err] then
		dota1x6.erros_table[err] = true
		if test then
			print(err)
		end
		HTTP.Request("/http-errors", {
			StatusCode = 600,
			Url = "/lua-errors",
			RequestBody = err,
			ResponseMessage = err,
		}, function(data) end)
	end

	return ok
end

function dota1x6:UpdateDamageStats(kv)
	if kv.PlayerID == nil then
		return
	end
	local id = kv.PlayerID
	if not players[id] then
		return
	end

	local result = {}
	result.outgoing = players[id].damage_out
	result.incoming = players[id].damage_inc
	result.healing = players[id].healing_inc
	result.resource = players[id].resource
	result.temp = players[id].temp_damage_stat
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "send_damage_stats", result)
end

function dota1x6:UpdateDamageBar(kv)
	if kv.PlayerID == nil then
		return
	end
	local id = kv.PlayerID

	if not players[id] then
		return
	end
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "send_damage_bar", players[id].damage_inc)
end

function dota1x6:GetHeroIcon(id)
	if not IsServer() then
		return
	end
	local hero = players[id]
	if not hero then
		return
	end

	local result = hero:GetUnitName()

	if hero.items_list_ids then
		for _, id in pairs(hero.items_list_ids) do
			if ARCANA_ICONS[tostring(id)] then
				result = ARCANA_ICONS[tostring(id)]
				break
			end
		end
	end

	return result
end

function dota1x6:GetPatrolPosition(kv)
	if kv.PlayerID == nil then
		return
	end
	local player = players[kv.PlayerID]
	if not player then
		return
	end
	if not towers[player:GetTeamNumber()] then
		return
	end
	if not IsSoloMode() then
		return
	end

	local tower = towers[player:GetTeamNumber()]
	if tower.active_patrol then
		local point = nil
		for creep, _ in pairs(tower.active_patrol) do
			if IsValid(creep) and creep:IsAlive() then
				point = creep:GetAbsOrigin()
			end
		end
		if point then
			GameRules:ExecuteTeamPing(player:GetTeamNumber(), point.x, point.y, player, 0)
			return
		end
	end

	local patrol_index = -1
	local count = 0
	for _, tower in pairs(towers) do
		count = count + 1
	end

	local FindIndex = function(check_team)
		local result = -1
		for index, data in pairs(dota1x6.patrol_data) do
			if data.teams then
				for _, team in pairs(data.teams) do
					if team == check_team then
						result = index
						break
					end
				end
			end
		end
		return result
	end

	if count <= 3 then
		patrol_index = "mid"
	else
		patrol_index = FindIndex(tower.map_team)

		if count < 5 then
			new_index = "mid"
			for _, check_tower in pairs(towers) do
				if check_tower ~= tower then
					local check_index = FindIndex(check_tower.map_team)
					if check_index == patrol_index then
						new_index = check_index
					end
				end
			end
			patrol_index = new_index
		end
	end

	if dota1x6:IsCustomRules("patrol_center") then
		patrol_index = "mid"
	end

	if patrol_index == -1 then
		return
	end

	local unit = Entities:FindByName(nil, "patrol_portal_" .. patrol_index)
	if unit then
		GameRules:ExecuteTeamPing(player:GetTeamNumber(), unit:GetAbsOrigin().x, unit:GetAbsOrigin().y, player, 0)
	end
end