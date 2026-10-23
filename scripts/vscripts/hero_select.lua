--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


require("events_protector")

hero_select = class({})

PICK_STATE_PLAYERS_LOADED = "PICK_STATE_PLAYERS_LOADED"
PICK_STATE_PICK_BANNED = "PICK_STATE_PICK_BANNED"
PICK_STATE_SELECT_HERO = "PICK_STATE_SELECT_HERO"
PICK_STATE_SELECT_BASE = "PICK_STATE_SELECT_BASE"
PICK_STATE_PICK_END = "PICK_STATE_PICK_END"
PICK_STATE = PICK_STATE_PLAYERS_LOADED
BAN_TIME = 15
TIME_OF_STATE = { 10, 75, 60, 0 }
MATCH_START_WAIT = 3
LOBBY_PLAYERS = {}
LOBBY_PLAYERS_MAX = 0
HEROES_FOR_PICK = {}
BASE_FOR_PICK = { 2, 7, 6, 3, 12, 9 }

if not IsSoloMode() then
	BASE_FOR_PICK = { 2, 3, 6, 7 }
end

PICKED_HEROES = {}
PICKED_BASES = {}
PICK_ORDER = 0
_G.IN_STATE = false
BAN_HEROES_VOTE = {}
_G.BANNED_HEROES = {}
MAX_BANNED = 4
MAX_BANNED_TOTAL = 6

-- Duo
LOBBY_TEAMS_COUNTER = 0
LOBBY_TEAMS_INFO = {}
PLAYERS_PRE_SELECT_BASE = {}
DUO_BANNED = {
	"npc_dota_hero_terrorblade",
}
--

NO_BANNED_HEROES = {
	"npc_dota_hero_kunkka",
	"npc_dota_hero_puck",
}

DONATE_HEROES = {
	["npc_dota_hero_kunkka"] = true,
	["npc_dota_hero_puck"] = true,
}
NEW_SYSTEM_HEROES = {
	[""] = true,
}

--[[PRO_MOD_ALLOWED =
{
    ["npc_dota_hero_alchemist"] = {3, 4},
    ["npc_dota_hero_bristleback"] = {1, 3, 4},
    ["npc_dota_hero_centaur"] = {1, 3},
    ["npc_dota_hero_legion_commander"] = {3, 4},
    ["npc_dota_hero_mars"] = {2, 3},
    ["npc_dota_hero_skeleton_king"] = {2, 3},
    ["npc_dota_hero_sven"] = {3, 4},
    ["npc_dota_hero_antimage"] = {1, 2},
    ["npc_dota_hero_bloodseeker"] = {1, 3},
    ["npc_dota_hero_juggernaut"] = {2, 3},
    ["npc_dota_hero_monkey_king"] = {1, 3},
    ["npc_dota_hero_phantom_assassin"] = {3, 4},
    ["npc_dota_hero_slark"] = {3, 4},
    ["npc_dota_hero_troll_warlord"] = {3},
    ["npc_dota_hero_marci"] = {1, 4},
    ["npc_dota_hero_pangolier"] = {3, 4},
}
]]

function hero_select:IsHeroDonate(hero, id)
	local subData = CustomNetTables:GetTableValue("sub_data", tostring(id))

	if subData and subData.subscribed == 0 then
		if DONATE_HEROES[hero] or NEW_SYSTEM_HEROES[hero] then
			return true
		end
	end
	return false
end

function hero_select:RandomHero(id)
	local hero

	if false then
		local player_id = PlayerResource:GetSteamAccountID(id)
		if
			(player_id == "172784619" or player_id == 172784619)
			and not dota1x6:check_used(PICKED_HEROES, "npc_dota_hero_bane")
			and not dota1x6:check_used(BANNED_HEROES, "npc_dota_hero_bane")
		then
			return "npc_dota_hero_bane"
		end
	end

	repeat
		local random = RandomInt(1, #HEROES_FOR_PICK)
		hero = HEROES_FOR_PICK[random]
	until not dota1x6:check_used(PICKED_HEROES, hero) and not hero_select:IsHeroDonate(hero, id)

	return hero
end

function hero_select:RandomBase()
	local base
	repeat
		base = RandomInt(1, #BASE_FOR_PICK)
	until not dota1x6:check_used(PICKED_BASES, base)
	return base
end

hero_select.ensure_hero = {}

function hero_select:EnsureBase(id)
	if not IsSoloMode() then
		local player_info = LOBBY_PLAYERS[id]
		if player_info then
			for _, pid in pairs(hero_select:GetPlayersInTeam(player_info.player_team)) do
				if SelectedBases[pid] then
					return SelectedBases[pid]
				end
			end
		end
	end

	local free = {}
	for number = 1, #BASE_FOR_PICK do
		if not dota1x6:check_used(PICKED_BASES, number) then
			table.insert(free, number)
		end
	end

	if #free > 0 then
		return free[RandomInt(1, #free)]
	end

	return RandomInt(1, #BASE_FOR_PICK)
end

function hero_select:IsCancelled()
	return SafeToLeave and PICK_STATE ~= PICK_STATE_SELECT_BASE and PICK_STATE ~= PICK_STATE_PICK_END
end

function hero_select:EnsureHero(id)
	if not ValidId(id) then
		return
	end
	if LOBBY_TEAMS_COUNTER == 0 then
		return
	end
	if hero_select:IsCancelled() then
		return
	end
	if GlobalHeroes[id] then
		return
	end
	if PlayerResource:GetSelectedHeroName(id) ~= "" then
		return
	end

	if not SelectedHeroes[id] or not SelectedHeroes[id].hero then
		if not LOBBY_PLAYERS[id] then
			return
		end
		hero_select:PickHero(id, hero_select:RandomHero(id), 1)
	end

	if not SelectedHeroes[id] or not SelectedHeroes[id].hero then
		return
	end

	if SelectedBases[id] == nil and LOBBY_PLAYERS[id] and PICK_STATE == PICK_STATE_PICK_END then
		hero_select:PickBase(LOBBY_PLAYERS[id].player_team, hero_select:EnsureBase(id))
		return
	end

	local player = PlayerResource:GetPlayer(id)
	if player then
		player:SetSelectedHero(SelectedHeroes[id].hero)
		return
	end

	if hero_select.ensure_hero[id] then
		return
	end

	hero_select.ensure_hero[id] = true

	Timers:CreateTimer("hero_select_ensure_" .. id, {
		useGameTime = false,
		endTime = 0.5,
		callback = function()
			hero_select.ensure_hero[id] = nil
			hero_select:EnsureHero(id)
		end,
	})
end

function hero_select:PickBase(team, number)
	local picked = {}

	for _, id in pairs(hero_select:GetPlayersInTeam(team)) do
		if SelectedBases[id] == nil then
			local player_info = LOBBY_PLAYERS[id]

			player_info.select_base = number
			PLAYERS_PRE_SELECT_BASE[id] = number
			SelectedBases[id] = number

			if HTTP.playersData[id] then
				HTTP.playersData[id].base = number
			end

			CustomGameEventManager:Send_ServerToAllClients(
				"pick_select_base",
				{ number = number, hero = player_info.picked_hero, id = id }
			)

			table.insert(picked, id)
		end
	end

	if #picked == 0 then
		return
	end

	if not dota1x6:check_used(PICKED_BASES, number) then
		table.insert(PICKED_BASES, number)
	end

	CustomNetTables:SetTableValue("custom_pick", "base_list", {
		picked_bases = PICKED_BASES,
		picked_bases_length = #PICKED_BASES,
	})

	for _, id in pairs(picked) do
		if PlayerResource:GetSelectedHeroName(id) ~= "" then
			if GlobalHeroes[id] and towers[GlobalHeroes[id]:GetTeamNumber()] == nil then
				dota1x6:PlaceHero(id)
			end
		else
			hero_select:EnsureHero(id)
		end
	end

	hero_select:check_picked_bases()

	CustomGameEventManager:Send_ServerToAllClients("update_pre_select_base", { info = PLAYERS_PRE_SELECT_BASE })
end

function hero_select:ChoseBase(params)
	if params.PlayerID == nil then
		return
	end

	if not params.number then
		return
	end
	params.number = math.floor(tonumber(params.number) or 0)
	if params.number < 1 or params.number > #BASE_FOR_PICK then
		return
	end
	if PICK_STATE ~= PICK_STATE_SELECT_BASE then
		return
	end
	local player_info = LOBBY_PLAYERS[params.PlayerID]
	if player_info == nil then
		return
	end
	if player_info.select_base ~= nil or hero_select:check_picked_base_number(params.number) then
		return
	end

	local team_info = LOBBY_TEAMS_INFO[player_info.player_team]
	if not team_info or team_info.pick_order ~= PICK_ORDER then
		return
	end

	hero_select:PickBaseForTeam(params.PlayerID, params.number)
end

function hero_select:PickBaseForTeam(PlayerID, number)
	PLAYERS_PRE_SELECT_BASE[PlayerID] = number
	local current_team = LOBBY_PLAYERS[PlayerID].player_team
	local players_in_team = hero_select:GetPlayersInTeam(current_team)
	CustomGameEventManager:Send_ServerToAllClients("update_pre_select_base", { info = PLAYERS_PRE_SELECT_BASE })
	CustomNetTables:SetTableValue("custom_pick", "pre_select_base", PLAYERS_PRE_SELECT_BASE)
	local next_stage = true
	for _, pid in pairs(players_in_team) do
		if pid ~= PlayerID and PLAYERS_PRE_SELECT_BASE[pid] ~= number then
			next_stage = false
		end
	end
	-- if IsInToolsMode() and PlayerID == 0 then
	--     Timers:CreateTimer(2, function()
	--         hero_select:PickBaseForTeam(1, number)
	--     end)
	-- end
	if next_stage then
		hero_select:PickBase(current_team, number)
	end
end

function hero_select:PickHero(id, name, random)
	local player_info = LOBBY_PLAYERS[id]
	local player = PlayerResource:GetPlayer(id)

	player_info.picked_hero = name

	start_quest:HeroPickEvent(id)
	HTTP.GetItemBuild(name, PlayerResource:GetPlayer(id))

	FireGameEvent("save_talents", {
		hero_name = name,
	})

	if added_shop_heroes[name] then
		if PlayerCount > TestMode_players then
			wearables_system:AddPrecachedData(name)
			wearables_system.ITEMS_DATA[name] = require("wearables_system/donate_items/" .. name)
			wearables_system:SendHeroItems(name)
		end

		local subData = CustomNetTables:GetTableValue("sub_data", tostring(id))

		if subData and subData.player_items_onequip and subData.player_items_onequip[name] then
			for _, item in pairs(subData.player_items_onequip[name]) do
				wearables_system:PreSaveItemSelectionData(id, item, name)
			end
		end
		if subData and subData.player_items_onequip_effects and subData.player_items_onequip_effects[name] then
			for _, item in pairs(subData.player_items_onequip_effects[name]) do
				wearables_system:PreSaveItemSelectionEffectsData(id, item, name)
			end
		end
	end

	table.insert(PICKED_HEROES, name)

	CustomNetTables:SetTableValue("custom_pick", "player_list", {
		picked_heroes = PICKED_HEROES,
		picked_heroes_length = #PICKED_HEROES,
	})

	CustomNetTables:SetTableValue("custom_pick", "player_lobby", {
		lobby_players = LOBBY_PLAYERS,
		lobby_players_length = LOBBY_PLAYERS_MAX,
	})

	if player then
		CustomGameEventManager:Send_ServerToPlayer(player, "pick_update_selection_button", {})
	end

	SelectedHeroes[id] = {}
	SelectedHeroes[id].hero = name
	SelectedHeroes[id].random = random

	local rand = random
	if pro_mod and pro_mod_data.show_random then
		rand = 1
	end

	CustomNetTables:SetTableValue("players_heroes", tostring(id), { hero = name, id = id, random = rand })
	--CustomGameEventManager:Send_ServerToAllClients("pick_select_hero", {hero = name, id = id, random = rand, pro_mod = pro_mod})

	hero_select:check_picked_players()
end

function hero_select:ChoseHero(params)
	if params.PlayerID == nil then
		return
	end
	if not params.hero then
		return
	end
	if PICK_STATE ~= PICK_STATE_SELECT_HERO then
		return
	end
	if hero_select:IsCancelled() then
		return
	end

	if not LOBBY_PLAYERS[params.PlayerID] then
		return
	end

	local player_info = LOBBY_PLAYERS[params.PlayerID]

	local team_info = LOBBY_TEAMS_INFO[player_info.player_team]
	if not team_info or team_info.pick_order ~= PICK_ORDER then
		return
	end

	if params.random then
		local random_hero = hero_select:RandomHero(params.PlayerID)

		LOBBY_PLAYERS[params.PlayerID].randomed = true

		if player_info.picked_hero ~= nil or hero_select:check_picked(random_hero) then
			return
		end
		hero_select:PickHero(params.PlayerID, random_hero, 1)
		return
	end

	if player_info.picked_hero ~= nil or hero_select:check_picked(params.hero) then
		return
	end

	LOBBY_PLAYERS[params.PlayerID].randomed = false
	hero_select:PickHero(params.PlayerID, params.hero, 0)
end

function hero_select:EndPickHeroes()
	if PICK_STATE ~= PICK_STATE_SELECT_HERO then
		return
	end

	CustomNetTables:SetTableValue("custom_pick", "player_lobby", {
		lobby_players = LOBBY_PLAYERS,
		lobby_players_length = LOBBY_PLAYERS_MAX,
	})
	PICK_ORDER = 0

	CustomGameEventManager:Send_ServerToAllClients("start_base_pick", {})
	PICK_STATE = PICK_STATE_SELECT_BASE

	HTTP.GetTalentsBuild()

	Timers:CreateTimer("hero_select_start_base_order", {
		useGameTime = false,
		endTime = 1,
		callback = function()
			hero_select:StartOrderPickBase()
		end,
	})
end

function hero_select:OnDisconnect(params)
	if GAME_STARTED == false then
		return
	end
	if not params.PlayerID then
		return
	end
	local id = params.PlayerID

	hero_select:EnsureHero(id)
end

function hero_select:EndPick(source)
	if PICK_STATE == PICK_STATE_PICK_END then
		return
	end

	for id = 0, 24 do
		if
			ValidId(id)
			and SelectedHeroes[id]
			and SelectedHeroes[id].hero
			and SelectedBases[id] == nil
			and LOBBY_PLAYERS[id]
		then
			hero_select:PickBase(LOBBY_PLAYERS[id].player_team, hero_select:EnsureBase(id))
		end
	end

	PICK_STATE = PICK_STATE_PICK_END
	CustomGameEventManager:Send_ServerToAllClients("pick_base_end", {})
	CustomGameEventManager:Send_ServerToAllClients("HideQuestAlert", {})

	--CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "pick_base_end", {})

	Timers:CreateTimer(0.4, function()
		_G.IN_STATE = false
		dota1x6:EndPickStage()
	end)

	CustomNetTables:SetTableValue("custom_pick", "pick_state", { in_progress = false, player_count = PlayerCount })
end

function hero_select:check_banned_players()
	for _, i in pairs(LOBBY_PLAYERS) do
		if i.ban_hero == nil then
			return false
		end
	end
	CustomGameEventManager:Send_ServerToAllClients("EndBanStage", { no_ban_hero = NO_BANNED_HEROES })
	CustomNetTables:SetTableValue("custom_pick", "ban_stage_check", { state = false })
	hero_select:BanHero()
	hero_select:StartSelectionStage()
end

function hero_select:check_picked_players()
	for _, i in pairs(LOBBY_PLAYERS) do
		if i.picked_hero == nil then
			return false
		end
	end

	if dont_end_pick_hero == false then
		hero_select:EndPickHeroes()
	end
end

function hero_select:check_picked_bases()
	for _, i in pairs(LOBBY_PLAYERS) do
		if i.select_base == nil then
			return false
		end
	end
	hero_select:EndPick()
end

function hero_select:check_picked(hero)
	for _, i in pairs(BANNED_HEROES) do
		if i == hero then
			return true
		end
	end

	if pro_mod and pro_mod_data.same_heroes then
		return false
	end

	for _, i in pairs(PICKED_HEROES) do
		if i == hero then
			return true
		end
	end

	return false
end

function hero_select:check_picked_base_number(number)
	for _, i in pairs(PICKED_BASES) do
		if i == number then
			return true
		end
	end
	return false
end

function hero_select:UpdatePlayersTeams()
	for i = 0, 24 do
		if ValidId(i) and PlayerResource:GetTeam(i) == DOTA_TEAM_NOTEAM then
			LOBBY_PLAYERS[i] = nil
		elseif ValidId(i) and PlayerResource:GetTeam(i) ~= 1 then
			local player_team = PlayerResource:GetTeam(i)
			if LOBBY_PLAYERS[i] then
				LOBBY_PLAYERS[i].player_team = player_team
				LOBBY_PLAYERS_MAX = LOBBY_PLAYERS_MAX + 1
				if LOBBY_TEAMS_INFO[player_team] == nil then
					LOBBY_TEAMS_INFO[player_team] = {}
					LOBBY_TEAMS_COUNTER = LOBBY_TEAMS_COUNTER + 1
				end
			end
		else
			if PlayerResource:GetTeam(i) == 1 then
				if LOBBY_PLAYERS and LOBBY_PLAYERS[i] then
					LOBBY_PLAYERS[i] = nil
				end
				_G.PlayerCount = _G.PlayerCount - 1
			end
		end
	end

	if IsInToolsMode() and test_pick_stage and LOBBY_PLAYERS_MAX <= 1 then
		local team_list = { 2, 3, 6, 7 }
		if max_teams == 6 then
			team_list = { 2, 3, 6, 7, 12, 9 }
		end

		local id = 0

		for _, team in pairs(team_list) do
			local count = #hero_select:GetPlayersInTeam(team)

			if LOBBY_TEAMS_INFO[team] == nil then
				LOBBY_TEAMS_INFO[team] = {}
				LOBBY_TEAMS_COUNTER = LOBBY_TEAMS_COUNTER + 1
			end

			while count < players_in_team do
				while LOBBY_PLAYERS[id] do
					id = id + 1
				end

				LOBBY_PLAYERS[id] = {
					bRegistred = false,
					bLoaded = false,
					steamid = PlayerResource:GetSteamAccountID(0),
					picked_hero = nil,
					select_base = nil,
					pick_order = nil,
					ban_hero = nil,
					player_team = team,
				}

				LOBBY_PLAYERS_MAX = LOBBY_PLAYERS_MAX + 1
				count = count + 1
			end
		end
	end
end

function hero_select:RegisterPlayerInfo(pid)
	if PlayerResource:GetSteamAccountID(pid) == 0 then
		return
	end
	local pinfo = LOBBY_PLAYERS[pid]
	if pinfo == nil then
		local player_team = PlayerResource:GetTeam(pid)
		pinfo = {
			bRegistred = false,
			bLoaded = false,
			steamid = PlayerResource:GetSteamAccountID(pid),
			picked_hero = nil,
			select_base = nil,
			pick_order = nil,
			ban_hero = nil,
			player_team = player_team,
		}
	end
	LOBBY_PLAYERS[pid] = pinfo
	return pinfo
end

function hero_select:DecreasePlayerCount()
	LOBBY_PLAYERS_MAX = LOBBY_PLAYERS_MAX - 1
end

function hero_select:CheckReadyPlayers(attempt)
	if PICK_STATE ~= PICK_STATE_PLAYERS_LOADED then
		return
	end

	attempt = attempt or 0
	dota1x6:AssignTeams()

	local bAllReady = true
	for pid = 0, 24 do
		if ValidId(pid) and not bots_ids[pid] and PlayerResource:GetTeam(pid) ~= 1 then
			local state = PlayerResource:GetConnectionState(pid)
			local pinfo = LOBBY_PLAYERS[pid]
			if
				state ~= DOTA_CONNECTION_STATE_ABANDONED
				and (
					state ~= DOTA_CONNECTION_STATE_CONNECTED
					or not pinfo
					or not pinfo.bLoaded
					or PlayerResource:GetTeam(pid) == DOTA_TEAM_NOTEAM
				)
			then
				bAllReady = false
			end
		end
	end

	local bMatchStart = IsInToolsMode() or HTTP.match_start_received or attempt >= MATCH_START_WAIT

	if not (bAllReady and bMatchStart) and attempt < TIME_OF_STATE[1] then
		CustomNetTables:SetTableValue("custom_pick", "loading_stage", { time = math.ceil(TIME_OF_STATE[1] - attempt) })

		local check_interval = 0.5
		Timers:CreateTimer("hero_select_check_ready", {
			useGameTime = false,
			endTime = check_interval,
			callback = function()
				hero_select:CheckReadyPlayers(attempt + check_interval)
			end,
		})
		return
	end

	for pid = 0, 24 do
		if ValidId(pid) and not bots_ids[pid] then
			local state = PlayerResource:GetConnectionState(pid)
			local team = PlayerResource:GetTeam(pid)
			if team ~= 1 and (state ~= DOTA_CONNECTION_STATE_CONNECTED or team == DOTA_TEAM_NOTEAM) then
				print("PICK LOADING NOT READY", pid, state, team)

				local data = CustomNetTables:GetTableValue("server_data", tostring(pid))
				if data and not data.block then
					data.block = { name = "player_left" }
					CustomNetTables:SetTableValue("server_data", tostring(pid), data)
				end

				if SafeToLeave == false then
					_G.SafeToLeave = true
					SafeToLeave_reason = 1
				end
			end
		end
	end

	print("PICK LOADING END", attempt, bAllReady, bMatchStart, HTTP.match_start_received)
	hero_select:Start()
end

function hero_select:PlayerConnected(kv)
	if kv.PlayerID == nil then
		return
	end
	if LOBBY_TEAMS_COUNTER > 0 and not LOBBY_PLAYERS[kv.PlayerID] then
		return
	end
	local pinfo = hero_select:RegisterPlayerInfo(kv.PlayerID)
	pinfo.bRegistred = true
end

function hero_select:PlayerLoaded(player, pid)
	if PlayerResource:GetTeam(pid) == 1 then
		return
	end

	if not LOBBY_PLAYERS[pid] then
		CustomGameEventManager:Send_ServerToPlayer(player, "pick_end", {})
		return
	end

	LOBBY_PLAYERS[pid].bLoaded = true

	local team = PlayerResource:GetTeam(pid)
	local hero = GlobalHeroes[pid]
	if hero ~= nil then
		hero:SetOwner(player)
		hero:SetControllableByPlayer(pid, true)
		player:SetAssignedHeroEntity(hero)
	end

	if not IN_STATE then
		print("2")
		dota1x6:ReconnectFilter(pid)
		return
	end

	if PICK_STATE ~= PICK_STATE_PLAYERS_LOADED then
		hero_select:DrawPickScreenForPlayer(pid)

		if PICK_STATE == PICK_STATE_PICK_BANNED then
			CustomGameEventManager:Send_ServerToPlayer(player, "reload_pick_heroes", {
				lobby_players = LOBBY_PLAYERS,
			})

			for _, banned_hero in pairs(BAN_HEROES_VOTE) do
				CustomGameEventManager:Send_ServerToPlayer(player, "ban_hero_vote", { hero = banned_hero })
			end
		elseif PICK_STATE == PICK_STATE_SELECT_HERO then
			CustomGameEventManager:Send_ServerToPlayer(player, "reload_pick_heroes", {
				lobby_players = LOBBY_PLAYERS,
			})
			for _, banned_hero in pairs(BAN_HEROES_VOTE) do
				CustomGameEventManager:Send_ServerToPlayer(player, "ban_hero_vote", { hero = banned_hero })
			end
			for _, banned_hero in pairs(BANNED_HEROES) do
				CustomGameEventManager:Send_ServerToPlayer(player, "ban_hero", { hero = banned_hero })
			end
		elseif PICK_STATE == PICK_STATE_SELECT_BASE then
			for current, pinfo in pairs(LOBBY_PLAYERS) do
				if pinfo.pick_order == PICK_ORDER then
					CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(pid), "pick_start_time_base", {
						order = PICK_ORDER,
						max = LOBBY_PLAYERS_MAX,
						id = current,
						current_team = pinfo.player_team,
						time = -1,
						picked_bases = PICKED_BASES,
						picked_bases_length = #PICKED_BASES,
					})
					break
				end
			end

			CustomGameEventManager:Send_ServerToPlayer(player, "reload_pick_bases", {
				lobby_players = LOBBY_PLAYERS,
			})
		elseif PICK_STATE == PICK_STATE_PICK_END then
			print("3")
			CustomGameEventManager:Send_ServerToPlayer(player, "pick_end", {})
		end
	end
end

function hero_select:Start()
	self:UpdatePlayersTeams()
	local r = 0
	local used_numbers = {}

	for team_id, team_inf in pairs(LOBBY_TEAMS_INFO) do
		repeat
			r = RandomInt(0, LOBBY_TEAMS_COUNTER - 1)
		until not dota1x6:check_used(used_numbers, r)
		used_numbers[#used_numbers + 1] = r
		team_inf.pick_order = r
	end
	if IsSoloMode() then
		local place_admin = 0
		local place_normal = 1
		local first_pick_id = {

			-- ['244395427'] = true, -- паша фп
			["232290025"] = not test,
			["411040863"] = true,
			["850354778"] = true, -- вокид
			["1674997262"] = true, -- ден
			--['418896247'] = true,-- колян мейн
			["1727917408"] = true, -- колян акк для фп
			["149889029"] = true,
			--  ['143696994'] = true, -- амели
			-- ['216015457'] = true, -- мяу
			--   ['1046015320'] = true, -- ашаф
			--  ['1027532545'] = true, -- сахарок

			--  ['122413750'] = true,
			-- ['1442764865'] = true, -- рейз фейк
			--['111393624'] = true, -- серега
			--['154672909'] = true, -- боря
			--['122413750'] = true, --
			--['883703644'] = true,
			--362469930--
		}
		if LOBBY_TEAMS_COUNTER > 1 then
			for team_id, team_inf in pairs(LOBBY_TEAMS_INFO) do
				if team_inf.pick_order == 0 then
					place_normal = team_id
				end
			end
			for i, player in pairs(LOBBY_PLAYERS) do
				local team_inf = LOBBY_TEAMS_INFO[player.player_team]
				if first_pick_id[tostring(player.steamid)] == true and team_inf then
					place_admin = team_inf.pick_order

					team_inf.pick_order = 0
					LOBBY_TEAMS_INFO[place_normal].pick_order = place_admin
					break
				end
			end
		end
	end

	for id, player in pairs(LOBBY_PLAYERS) do
		local team_inf = LOBBY_TEAMS_INFO[player.player_team]
		if team_inf and team_inf.pick_order then
			player.pick_order = team_inf.pick_order
			if HTTP.playersData[id] then
				HTTP.playersData[id].pickOrder = team_inf.pick_order
			end
		end
	end
	CustomNetTables:SetTableValue("custom_pick", "player_lobby", {
		lobby_players = LOBBY_PLAYERS,
		lobby_players_length = LOBBY_PLAYERS_MAX,
	})
	CustomNetTables:SetTableValue("custom_pick", "teams_lobby", {
		lobby_teams = LOBBY_TEAMS_INFO,
		lobby_teams_length = LOBBY_TEAMS_COUNTER,
	})

	for pid, pinfo in pairs(LOBBY_PLAYERS) do
		if pinfo.bLoaded then
			hero_select:DrawPickScreenForPlayer(pid)
		end
	end

	if hero_test then
		hero_select:PickHero(0, hero_test_name, 0)
		hero_select:PickBase(LOBBY_PLAYERS[0].player_team, hero_test_base)
		return
	end

	if LOBBY_PLAYERS_MAX <= 2 and (pro_mod == false or PRO_MOD_ALLOWED) then
		hero_select:StartSelectionStage(test and 1 or 0.1)
	else
		hero_select:StartBanStage()
	end
end

function hero_select:StartBanStage()
	PICK_STATE = PICK_STATE_PICK_BANNED
	local time_ban_stage = BAN_TIME

	CustomGameEventManager:Send_ServerToAllClients(
		"StartBanStage",
		{ time = time_ban_stage, no_ban_hero = NO_BANNED_HEROES }
	)

	CustomNetTables:SetTableValue("custom_pick", "ban_stage_check", { state = true })
	Timers:CreateTimer("hero_select_ban_stage", {
		useGameTime = false,
		endTime = 1,
		callback = function()
			if PICK_STATE ~= PICK_STATE_PICK_BANNED then
				return
			end
			if hero_select:IsCancelled() then
				return 1
			end

			time_ban_stage = time_ban_stage - 1
			CustomGameEventManager:Send_ServerToAllClients(
				"TimeBanStage",
				{ time = time_ban_stage, no_ban_hero = NO_BANNED_HEROES }
			)
			if time_ban_stage <= 0 then
				CustomNetTables:SetTableValue("custom_pick", "ban_stage_check", { state = false })
				hero_select:BanHero()
				hero_select:StartSelectionStage()
				return
			end
			return 1
		end,
	})
end

function hero_select:BanHero()
	if pro_mod then
		if #BAN_HEROES_VOTE <= 0 then
			return
		end

		for i = 1, #BAN_HEROES_VOTE do
			table.insert(BANNED_HEROES, BAN_HEROES_VOTE[i])

			for id, hero in pairs(HEROES_FOR_PICK) do
				if hero == BAN_HEROES_VOTE[i] then
					table.remove(HEROES_FOR_PICK, id)
					break
				end
			end

			CustomGameEventManager:Send_ServerToAllClients(
				"ban_hero",
				{ hero = BAN_HEROES_VOTE[i], table_votes = BAN_HEROES_VOTE }
			)
		end
	else
		if #BAN_HEROES_VOTE < MAX_BANNED_TOTAL then
			for i = 1, (MAX_BANNED_TOTAL - #BAN_HEROES_VOTE) do
				local hero
				repeat
					hero = HEROES_FOR_PICK[RandomInt(1, #HEROES_FOR_PICK)]
				until not dota1x6:check_used(BAN_HEROES_VOTE, hero) and not dota1x6:check_used(NO_BANNED_HEROES, hero)

				table.insert(BAN_HEROES_VOTE, hero)
			end
		end

		if #BAN_HEROES_VOTE <= 0 then
			return
		end

		for ban_count = 1, MAX_BANNED do
			local random_hero = RandomInt(1, #BAN_HEROES_VOTE)

			if BAN_HEROES_VOTE[random_hero] then
				table.insert(BANNED_HEROES, BAN_HEROES_VOTE[random_hero])

				for id, hero in pairs(HEROES_FOR_PICK) do
					if hero == BAN_HEROES_VOTE[random_hero] then
						table.remove(HEROES_FOR_PICK, id)
						break
					end
				end

				CustomGameEventManager:Send_ServerToAllClients(
					"ban_hero",
					{ hero = BAN_HEROES_VOTE[random_hero], table_votes = BAN_HEROES_VOTE }
				)

				table.remove(BAN_HEROES_VOTE, random_hero)
			end
		end
	end

	if #BAN_HEROES_VOTE <= 0 then
		return
	end

	for i = 1, #BAN_HEROES_VOTE do
		CustomGameEventManager:Send_ServerToAllClients("clear_ban_hero", { hero = BAN_HEROES_VOTE[i] })
	end
end

function hero_select:BanVoteHero(params)
	if params.PlayerID == nil then
		return
	end

	if hero_select:IsCancelled() then
		return
	end
	if not LOBBY_PLAYERS[params.PlayerID] then
		return
	end

	if LOBBY_PLAYERS[params.PlayerID].ban_hero == nil then
		for _, no_ban_hero in pairs(NO_BANNED_HEROES) do
			if no_ban_hero == params.hero then
				return
			end
		end

		for _, banned_hero in pairs(BAN_HEROES_VOTE) do
			if banned_hero == params.hero then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(params.PlayerID),
					"CreateIngameErrorMessage",
					{ message = "#wrong_ban" }
				)
				return
			end
		end

		HTTP.playersData[params.PlayerID].bannedHero = params.hero
		LOBBY_PLAYERS[params.PlayerID].ban_hero = params.hero

		table.insert(BAN_HEROES_VOTE, params.hero)
		CustomGameEventManager:Send_ServerToAllClients("ban_hero_vote", { hero = params.hero, votes = 1 })

		hero_select:check_banned_players()
	end
end

function hero_select:StartSelectionStage(new_timer)
	PICK_STATE = PICK_STATE_SELECT_HERO
	local timer = 1
	if new_timer then
		timer = new_timer
	end
	CustomGameEventManager:Send_ServerToAllClients("EndBanStage", { no_ban_hero = NO_BANNED_HEROES })
	Timers:CreateTimer("hero_select_selection_stage", {
		useGameTime = false,
		endTime = timer,
		callback = function()
			hero_select:StartOrderPick()
		end,
	})
end

function hero_select:StartOrderPick()
	local time = Time_to_pick_Hero
	local current_team = 2
	local id = 0
	for team_id, team_info in pairs(LOBBY_TEAMS_INFO) do
		if team_info.pick_order == PICK_ORDER then
			current_team = team_id
			id = hero_select:GetPlayersInTeam(current_team)[1] or 0
			CustomGameEventManager:Send_ServerToAllClients(
				"pick_start_time",
				{ id = id, current_team = current_team, time = time }
			)
			CustomNetTables:SetTableValue("custom_pick", "active_player", { id = id, current_team = current_team })
			break
		end
	end

	Timers:CreateTimer("hero_select_order_pick", {
		useGameTime = false,
		endTime = 1,
		callback = function()
			if hero_select:IsCancelled() then
				return 1
			end
			if LOBBY_PLAYERS_MAX ~= 1 and not SafeToLeave then
				time = time - 1
			end
			if time == 20 then
				--hero_select:OnDisconnect({PlayerID = id})
			end
			CustomGameEventManager:Send_ServerToAllClients(
				"change_time",
				{ time = time, id = id, current_team = current_team }
			)
			local players_in_team = hero_select:GetPlayersInTeam(current_team)
			local next_stage = true
			for _, pid in pairs(players_in_team) do
				local server_player = HTTP.GetPlayerData(pid)
				if server_player ~= nil then
					if server_player.lowPriorityRemaining > 0 then
						if LOBBY_PLAYERS[pid].picked_hero == nil then
							hero_select:PickHero(pid, hero_select:RandomHero(pid), 1)
						end
					end
				end
				if LOBBY_PLAYERS[pid].picked_hero == nil then
					next_stage = false
				end
			end
			if time <= 0 or next_stage then
				for _, pid in pairs(players_in_team) do
					if LOBBY_PLAYERS[pid].picked_hero == nil then
						hero_select:PickHero(pid, hero_select:RandomHero(pid), 1)
					end
				end
				if PICK_STATE ~= PICK_STATE_SELECT_HERO then
					return
				end
				PICK_ORDER = PICK_ORDER + 1
				if PICK_ORDER < LOBBY_TEAMS_COUNTER + 1 then
					hero_select:StartOrderPick()
				end
				return
			end
			return 1
		end,
	})
end

function hero_select:StartOrderPickBase()
	if PICK_STATE == PICK_STATE_PICK_END then
		return
	end
	local time = Time_to_pick_Base
	local current_team = 2
	local id = 0
	for team_id, team_info in pairs(LOBBY_TEAMS_INFO) do
		if team_info.pick_order == PICK_ORDER then
			current_team = team_id
			id = hero_select:GetPlayersInTeam(current_team)[1] or 0
			CustomNetTables:SetTableValue("custom_pick", "active_player", {
				id = id,
				current_team = current_team,
			})
			CustomGameEventManager:Send_ServerToAllClients("pick_start_time_base", {
				order = PICK_ORDER,
				max = LOBBY_PLAYERS_MAX,
				id = id,
				current_team = current_team,
				time = time,
				picked_bases = PICKED_BASES,
				picked_bases_length = #PICKED_BASES,
			})
		end
	end

	Timers:CreateTimer("hero_select_order_pick_base", {
		useGameTime = false,
		endTime = 1,
		callback = function()
			if LOBBY_PLAYERS_MAX ~= 1 then
				time = time - 1
			end
			CustomGameEventManager:Send_ServerToAllClients(
				"change_time_base",
				{ time = time, id = id, current_team = current_team }
			)
			local next_stage = true
			local players_in_team = hero_select:GetPlayersInTeam(current_team)
			local player_choose_team = nil

			for _, pid in pairs(players_in_team) do
				if PLAYERS_PRE_SELECT_BASE[pid] == nil then
					next_stage = false
				end
				if player_choose_team then
					if PLAYERS_PRE_SELECT_BASE[pid] ~= player_choose_team then
						next_stage = false
					end
				else
					if PLAYERS_PRE_SELECT_BASE[pid] ~= nil then
						player_choose_team = PLAYERS_PRE_SELECT_BASE[pid]
					end
				end
			end

			if time <= 0 or next_stage then
				PICK_ORDER = PICK_ORDER + 1
				if time <= 0 then
					local random_base_list = {}
					for _, pid in pairs(players_in_team) do
						if PLAYERS_PRE_SELECT_BASE[pid] ~= nil then
							table.insert(random_base_list, PLAYERS_PRE_SELECT_BASE[pid])
						end
					end
					local get_base_counter = nil
					if #random_base_list > 0 then
						get_base_counter = random_base_list[RandomInt(1, #random_base_list)]
					else
						get_base_counter = hero_select:RandomBase()
					end
					hero_select:PickBase(current_team, get_base_counter)
				end
				if PICK_ORDER < LOBBY_TEAMS_COUNTER + 1 then
					hero_select:StartOrderPickBase()
				end
				return
			end
			return 1
		end,
	})
end

function hero_select:GetPlayersInTeam(team_id)
	local players = {}
	for pid, info in pairs(LOBBY_PLAYERS) do
		if info.player_team == team_id then
			table.insert(players, pid)
		end
	end
	return players
end

function hero_select:DrawPickScreenForPlayer(pid)
	if not ValidId(pid) then
		return
	end
	--    CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(pid), "pick_start", {})
end

function hero_select:init()
	_G.IN_STATE = true

	print("PICK START INIT")

	RegisterLoadListener(function(player, playerID)
		hero_select:PlayerLoaded(player, playerID)
	end)

	if not IsSoloMode() then
		for _, hero_name in pairs(DUO_BANNED) do
			table.insert(BANNED_HEROES, hero_name)

			for id, hero in pairs(HEROES_FOR_PICK) do
				if hero == hero_name then
					table.remove(HEROES_FOR_PICK, id)
					break
				end
			end
			CustomGameEventManager:Send_ServerToAllClients(
				"ban_hero",
				{ hero = hero_name, table_votes = BAN_HEROES_VOTE, no_sound = 1 }
			)
		end
	end

	CustomGameEventManager:RegisterListener("chose_hero", Dynamic_Wrap(self, "ChoseHero"))
	CustomGameEventManager:RegisterListener("chose_base", Dynamic_Wrap(self, "ChoseBase"))
	CustomGameEventManager:RegisterListener("BanVoteHero", Dynamic_Wrap(self, "BanVoteHero"))
	CustomGameEventManager:RegisterListener("SetClickHero", Dynamic_Wrap(self, "SetClickHero"))

	for i = 0, DOTA_MAX_TEAM_PLAYERS - 1 do
		if PlayerResource:IsValidTeamPlayerID(i) and PlayerResource:GetTeam(i) ~= 1 then
			self:RegisterPlayerInfo(i)
		end
	end

	self:CheckReadyPlayers()
end

function hero_select:SetClickHero(params)
	if not params.PlayerID then
		return
	end
	local player_info = LOBBY_PLAYERS[params.PlayerID]

	if not player_info then
		return
	end
	if player_info.picked_hero then
		return
	end

	local team = PlayerResource:GetTeam(params.PlayerID)
	local ids = hero_select:GetPlayersInTeam(team)

	for _, id in pairs(ids) do
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"ReturnClickHero",
			{ hero = params.hero, id = params.PlayerID }
		)
	end
end

function hero_select:RegisterHeroes()
	local enable_heroes = {}
	local hero_list = {}
	local anime = {}
	local all = {}
	local heroes = LoadKeyValues("scripts/npc/activelist.txt")
	local h = LoadKeyValues("scripts/npc/npc_heroes_custom.txt")
	local abilki = LoadKeyValues("scripts/npc/npc_abilities_custom.txt")

	--

	local adapted = {}

	for _, name in pairs(all_heroes) do
		adapted[name] = true
	end

	for k, v in pairs(heroes) do
		if v == 1 and adapted[k] then
			local allow = true
			if pro_mod then
				if PRO_MOD_ALLOWED and not PRO_MOD_ALLOWED[k] then
					allow = false
				end
				if pro_mod_data.new_system and not new_talent_system[k] then
					allow = false
				end
				if pro_mod_data.disable_heroes[k] then
					allow = false
				end
			end
			if allow then
				table.insert(enable_heroes, k)
			end
		end
	end

	for c = 1, #enable_heroes do
		local inf = h[enable_heroes[c]]
		local ability = {}
		local heroid = {}
		if inf then
			for ab = 1, 9 do
				if
					inf["Ability" .. ab] ~= nil
					and inf["Ability" .. ab] ~= ""
					and inf["Ability" .. ab] ~= "generic_hidden"
				then
					if abilki[inf["Ability" .. ab]] then
						behavior = abilki[inf["Ability" .. ab]].AbilityBehavior
					end
					if behavior and not behavior:find("DOTA_ABILITY_BEHAVIOR_HIDDEN") then
						table.insert(ability, inf["Ability" .. ab])
					end
				end
			end
			CustomNetTables:SetTableValue("custom_pick", tostring(enable_heroes[c]), ability)
		end
	end

	HEROES_FOR_PICK = enable_heroes

	for _, hero in pairs(enable_heroes) do
		if h[hero].AttributePrimary == "DOTA_ATTRIBUTE_STRENGTH" then
			hero_list[hero] = 0
		elseif h[hero].AttributePrimary == "DOTA_ATTRIBUTE_AGILITY" then
			hero_list[hero] = 1
		elseif h[hero].AttributePrimary == "DOTA_ATTRIBUTE_INTELLECT" then
			hero_list[hero] = 2
		elseif h[hero].AttributePrimary == "DOTA_ATTRIBUTE_ALL" then
			hero_list[hero] = 3
		end
	end

	local hero_list_extra = {}
	local base_heroes = LoadKeyValues("scripts/npc/npc_heroes.txt")

	for k, v in pairs(heroes) do
		if v == 1 and not adapted[k] and k ~= "npc_dota_hero_target_dummy" then
			local attribute = base_heroes and base_heroes[k] and base_heroes[k].AttributePrimary

			if attribute == "DOTA_ATTRIBUTE_STRENGTH" then
				hero_list_extra[k] = 0
			elseif attribute == "DOTA_ATTRIBUTE_AGILITY" then
				hero_list_extra[k] = 1
			elseif attribute == "DOTA_ATTRIBUTE_INTELLECT" then
				hero_list_extra[k] = 2
			else
				hero_list_extra[k] = 3
			end
		end
	end

	CustomNetTables:SetTableValue("custom_pick", "hero_list", hero_list)
	CustomNetTables:SetTableValue("custom_pick", "hero_list_extra", hero_list_extra)
	CustomNetTables:SetTableValue("custom_pick", "hero_changes", hero_changes)
	CustomNetTables:SetTableValue("custom_pick", "donate_heroes", DONATE_HEROES)
	CustomNetTables:SetTableValue("custom_pick", "new_system_heroes", NEW_SYSTEM_HEROES)
end

function hero_select:GetState()
	return PICK_STATE
end