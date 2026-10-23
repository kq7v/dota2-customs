--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if shop == nil then
	shop = class({})
	shop.saved_players_chest_items = {}
	shop.HOW_MUCH_CHEST_RETURN_GOLD_PERCENT = 20
	shop.CHEST_GAMES_REQUIRED = 3
	shop.CHEST_DUPLICATE_REWARD_POOR = 100
	shop.CHEST_DUPLICATE_REWARD_RICH = 200
end

require("wearables_system/shop_configs")
require("wearables_system/chest_info")

CustomNetTables:SetTableValue("shop_items", "pets", pets_item_list)
CustomNetTables:SetTableValue("shop_items", "tips", tips_item_list)
CustomNetTables:SetTableValue("shop_items", "effects", shop_effects_list)
CustomNetTables:SetTableValue("shop_items", "high_five", high_five_item_list)
CustomNetTables:SetTableValue("shop_items", "chest", DOTA1X6_CHESTS_INFO)
CustomNetTables:SetTableValue("shop_items", "poor_chests", DOTA1X6_POOR_CHESTS)
CustomNetTables:SetTableValue("shop_items", "rich_chests", DOTA1X6_RICH_CHESTS)
CustomNetTables:SetTableValue("shop_items", "chest_config", { games_required = shop.CHEST_GAMES_REQUIRED })
CustomNetTables:SetTableValue("shop_items", "votes_cost", { cost = 100, hero_stat = 1 })

function HasDonateItem(id, item_id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if player_table then
		if player_table.items_ids then
			for _, item_id_data in pairs(player_table.items_ids) do
				if tostring(item_id_data) == tostring(item_id) then
					return true
				end
			end
		end
	end
	return false
end

function shop:IsItemHiddenFromShop(item_id)
	if shop.hidden_items_set == nil then
		shop.hidden_items_set = {}
		if wearables_system and wearables_system.ITEMS_DATA then
			for _, hero_items in pairs(wearables_system.ITEMS_DATA) do
				for _, item_info in pairs(hero_items) do
					if item_info["hide"] == 1 and item_info["item_id"] then
						shop.hidden_items_set[tonumber(item_info["item_id"])] = true
					end
				end
			end
		end
	end
	return shop.hidden_items_set[tonumber(item_id)] == true
end

function shop:MarkItemNew(player_table, item_id)
	if not player_table then
		return
	end
	if item_id == nil then
		return
	end
	if shop:IsChest(tonumber(item_id)) ~= false then
		return
	end
	if shop:IsItemHiddenFromShop(item_id) then
		return
	end
	local new_list = {}
	local exists = false
	if player_table.new_items then
		for _, v in pairs(player_table.new_items) do
			table.insert(new_list, v)
			if tostring(v) == tostring(item_id) then
				exists = true
			end
		end
	end
	if not exists then
		table.insert(new_list, item_id)
	end
	player_table.new_items = new_list
end

function shop:UnmarkItemNew(player_id, item_id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(player_id))
	if not player_table or not player_table.new_items then
		return
	end
	local new_list = {}
	local removed = false
	for _, v in pairs(player_table.new_items) do
		if tostring(v) == tostring(item_id) then
			removed = true
		else
			table.insert(new_list, v)
		end
	end
	if removed then
		player_table.new_items = new_list
		CustomNetTables:SetTableValue("sub_data", tostring(player_id), player_table)
	end
end

function shop:MarkItemSeen(data)
	if data.PlayerID == nil then
		return
	end
	if data.items ~= nil then
		local player_table = CustomNetTables:GetTableValue("sub_data", tostring(data.PlayerID))
		if not player_table or not player_table.new_items then
			return
		end
		local seen = {}
		for _, v in pairs(data.items) do
			seen[tostring(v)] = true
		end
		local new_list = {}
		local removed = false
		for _, v in pairs(player_table.new_items) do
			if seen[tostring(v)] then
				removed = true
			else
				table.insert(new_list, v)
			end
		end
		if removed then
			player_table.new_items = new_list
			CustomNetTables:SetTableValue("sub_data", tostring(data.PlayerID), player_table)
		end
		return
	end
	if data.item_id == nil then
		return
	end
	shop:UnmarkItemNew(data.PlayerID, data.item_id)
end

function shop:UnmarkNewBySelect(player_id, list, select_id)
	if not list or select_id == nil then
		return
	end
	for _, v in pairs(list) do
		if tostring(v[2]) == tostring(select_id) then
			shop:UnmarkItemNew(player_id, v[1])
			return
		end
	end
end

function shop:HasSelectItem(player_id, list, select_id)
	if not list or select_id == nil then
		return false
	end
	for _, v in pairs(list) do
		if tostring(v[2]) == tostring(select_id) then
			return HasDonateItem(player_id, v[1])
		end
	end
	return false
end

function shop:shop_buy_item_player(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local item_id = tonumber(data.item_id)
	local is_item_bundle = nil
	local cost = 0
	for _, chat_item in pairs(Sound_list.general_ru) do
		if chat_item[1] == item_id then
			cost = chat_item[3]
		end
	end
	if cost == 0 then
		for _, chat_item in pairs(Sound_list.general_eng) do
			if chat_item[1] == item_id then
				cost = chat_item[3]
			end
		end
	end
	if cost == 0 then
		for _, chat_item in pairs(Sound_list.general_other) do
			if chat_item[1] == item_id then
				cost = chat_item[3]
			end
		end
	end
	if cost == 0 then
		for _, pet_item in pairs(pets_item_list) do
			if pet_item[1] == item_id then
				cost = pet_item[4]
			end
		end
	end
	if cost == 0 then
		for _, tip_item in pairs(tips_item_list) do
			if tip_item[1] == item_id then
				cost = tip_item[4]
				if tip_item[7] then
					return
				end
			end
		end
	end
	if cost == 0 then
		for effect_type, effects_data in pairs(shop_effects_list) do
			for __, effect_item in pairs(effects_data) do
				if effect_item[1] == item_id then
					cost = effect_item[4]
					if effect_item[7] or effect_item[9] then
						return
					end
				end
			end
		end
	end
	if cost == 0 then
		for _, tip_item in pairs(high_five_item_list) do
			if tip_item[1] == item_id then
				cost = tip_item[4]
			end
		end
	end
	if cost == 0 then
		if data.hero ~= nil then
			if wearables_system.ITEMS_DATA[tostring(data.hero)] then
				for _, item_info in pairs(wearables_system.ITEMS_DATA[tostring(data.hero)]) do
					if item_info["item_id"] == item_id then
						if item_info["hide"] == 1 then
							return
						end
						cost = item_info["price"]

						if item_info["sale_price"] and item_info["sale_price"] > 0 then
							cost = item_info["sale_price"]
						end

						if item_info["OtherItemsBundle"] ~= nil then
							is_item_bundle = item_info["OtherItemsBundle"]
						end
						break
					end
				end
			end
		end
	end
	if cost == 0 and item_id == -1 then
		local votes = tonumber(data.votes)
		if not votes or votes < 1 or votes ~= math.floor(votes) then
			return
		end
		cost = CustomNetTables:GetTableValue("shop_items", "votes_cost").cost * votes
	end
	if cost == 0 then
		return
	end
	if item_id ~= -1 and HasDonateItem(id, item_id) then
		return
	end

	local player = PlayerResource:GetPlayer(id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	local player_items_table = {}

	if player_table then
		if player_table.points < cost then
			return
		end
		if player_table.items_ids then
			for k, v in pairs(player_table.items_ids) do
				table.insert(player_items_table, v)
			end
		end
		player_table.points = player_table.points - cost
		if data.item_id == -1 then
			player_table.votes_count = player_table.votes_count + data.votes
			HTTP.BuyItem(data.PlayerID, "vote", cost, data.votes)
		else
			table.insert(player_items_table, item_id)
			shop:MarkItemNew(player_table, item_id)
			print("Помечен новым предмет - ", item_id)
			if is_item_bundle ~= nil then
				for _, item_bundle in pairs(is_item_bundle) do
					if item_id ~= item_bundle[1] then
						table.insert(player_items_table, item_bundle[1])
					end
				end
			end
			if shop.ITEMS_BUNDDLE_LIST[item_id] then
				for _, item_id_in_bundle in pairs(shop.ITEMS_BUNDDLE_LIST[item_id]) do
					table.insert(player_items_table, item_id_in_bundle)
					HTTP.BuyItem(data.PlayerID, item_id_in_bundle, 0)
				end
			end
			player_table.items_ids = player_items_table
			HTTP.BuyItem(data.PlayerID, item_id, math.abs(cost))
		end
		CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
	end
end

function shop:AddCourierParticle(particle, pet)
	pet.particle = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, pet)
	if particle == "particles/econ/courier/courier_doomling/courier_doomling_ambient.vpcf" then
		ParticleManager:SetParticleControlEnt(
			pet.particle,
			0,
			pet,
			PATTACH_POINT_FOLLOW,
			"attach_weapon",
			pet:GetAbsOrigin(),
			true
		)
	end
	if particle == "particles/econ/courier/courier_faceless_rex/cour_rex_flying.vpcf" then
		ParticleManager:SetParticleControlEnt(
			pet.particle,
			0,
			pet,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			pet:GetAbsOrigin(),
			true
		)
	end
end

function shop:GetPetItemId(pet_id)
	if pet_id == nil then
		return nil
	end
	for _, pet_item in pairs(pets_item_list) do
		if tostring(pet_item[2]) == tostring(pet_id) then
			return pet_item[1]
		end
	end
	return nil
end

function shop:CanUsePet(id, pet_id)
	pet_id = tonumber(pet_id)
	if pet_id == nil then
		return false
	end
	if pet_id == 0 then
		return true
	end
	if not PETS_DATA_LIST[pet_id] then
		return false
	end
	local item_id = shop:GetPetItemId(pet_id)
	if item_id == nil then
		return false
	end
	return HasDonateItem(id, item_id)
end

function shop:ChangePetPremium(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local pet_id = tonumber(data.pet_id) or 0
	local delete_pet = data.delete_pet == 1 or data.delete_pet == true or data.delete_pet == "1"
	if pet_id == 0 then
		delete_pet = true
	end
	if delete_pet then
		pet_id = 0
	end
	if not shop:CanUsePet(id, pet_id) then
		return
	end
	local player = players[id]
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if player_table then
		player_table.pet_id = pet_id
		CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
	end
	if not delete_pet then
		shop:UnmarkNewBySelect(id, pets_item_list, pet_id)
	end
	if player then
		local hero = player
		if hero:GetUnitName() ~= "npc_dota_hero_wisp" then
			if player.pet and player.pet ~= nil and not delete_pet then
				player.pet:SetModel(PETS_DATA_LIST[pet_id].model)
				player.pet:SetOriginalModel(PETS_DATA_LIST[pet_id].model)
				player.pet:AddNewModifier(hero, nil, "modifier_donate_pet", { scale = PETS_DATA_LIST[pet_id].scale })
				if player.pet.particle then
					ParticleManager:DestroyParticle(player.pet.particle, true)
					player.pet.particle = nil
				end
				if PETS_DATA_LIST[pet_id].particle ~= nil then
					shop:AddCourierParticle(PETS_DATA_LIST[pet_id].particle, player.pet)
				end
				if PETS_DATA_LIST[pet_id].style ~= nil then
					player.pet:SetMaterialGroup(PETS_DATA_LIST[pet_id].style)
				else
					player.pet:SetMaterialGroup("default")
				end
			elseif player.pet and player.pet ~= nil and delete_pet then
				UTIL_Remove(player.pet)
				player.pet = nil
			elseif not delete_pet then
				player.pet = CreateUnitByName(
					"npc_dota_donate_pet",
					hero:GetAbsOrigin() + RandomVector(RandomFloat(0, 100)),
					true,
					hero,
					nil,
					hero:GetTeamNumber()
				)
				player.pet:SetOwner(hero)
				local ability = player.pet:FindAbilityByName("donate_pet_ability")
				if ability then
					ability:SetLevel(1)
				end
				player.pet:AddNewModifier(hero, nil, "modifier_donate_pet", { scale = PETS_DATA_LIST[pet_id].scale })
				player.pet:SetModel(PETS_DATA_LIST[pet_id].model)
				player.pet:SetOriginalModel(PETS_DATA_LIST[pet_id].model)
				if PETS_DATA_LIST[pet_id].particle ~= nil then
					shop:AddCourierParticle(PETS_DATA_LIST[pet_id].particle, player.pet)
				end
				if PETS_DATA_LIST[pet_id].style ~= nil then
					player.pet:SetMaterialGroup(PETS_DATA_LIST[pet_id].style)
				else
					player.pet:SetMaterialGroup("default")
				end
			end
		end
	end
end

-- Функция спавна курьера если у игрока в данных есть его айди сервера. Можно вызывать при спавне героя
function shop:AddPetFromStart(id)
	local pet_id = nil
	local player = players[id]
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if player_table and player_table.pet_id then
		pet_id = tonumber(player_table.pet_id)
	end
	if not shop:CanUsePet(id, pet_id) then
		return
	end
	if player then
		local hero = player
		if hero:GetUnitName() ~= "npc_dota_hero_wisp" and pet_id ~= 0 and pet_id ~= nil then
			player.pet = CreateUnitByName(
				"npc_dota_donate_pet",
				hero:GetAbsOrigin() + RandomVector(RandomFloat(0, 100)),
				true,
				hero,
				nil,
				hero:GetTeamNumber()
			)
			player.pet:SetOwner(hero)
			local ability = player.pet:FindAbilityByName("donate_pet_ability")
			if ability then
				ability:SetLevel(1)
			end
			player.pet:AddNewModifier(hero, nil, "modifier_donate_pet", { scale = PETS_DATA_LIST[pet_id].scale })
			player.pet:SetModel(PETS_DATA_LIST[pet_id].model)
			player.pet:SetOriginalModel(PETS_DATA_LIST[pet_id].model)
			if PETS_DATA_LIST[pet_id].particle ~= nil then
				shop:AddCourierParticle(PETS_DATA_LIST[pet_id].particle, player.pet)
			end
			if PETS_DATA_LIST[pet_id].style ~= nil then
				player.pet:SetMaterialGroup(PETS_DATA_LIST[pet_id].style)
			else
				player.pet:SetMaterialGroup("default")
			end
		end
	end
end

function shop:heroes_vote_change(kv)
	local player = PlayerResource:GetPlayer(kv.PlayerID)
	if not player then
		return
	end
	local vote_count = tonumber(kv.count)
	if not vote_count then
		return
	end
	if vote_count < 1 or vote_count ~= math.floor(vote_count) then
		return
	end
	if not kv.name then
		return
	end
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(kv.PlayerID))
	if not sub_data then
		return
	end
	if vote_count > sub_data.votes_count then
		return
	end
	local heroes_vote = CustomNetTables:GetTableValue("sub_data", "heroes_vote")
	for i = 1, 3 do
		if heroes_vote.vote_table[tostring(i)] then
			if heroes_vote.vote_table[tostring(i)]["1"] == kv.name then
				heroes_vote.vote_table[tostring(i)]["2"] = heroes_vote.vote_table[tostring(i)]["2"] + vote_count
				heroes_vote.vote_table[tostring(i)]["3"] = heroes_vote.vote_table[tostring(i)]["3"] + vote_count
			end
		end
	end
	CustomNetTables:SetTableValue("sub_data", "heroes_vote", heroes_vote)
	sub_data.votes_count = sub_data.votes_count - vote_count
	HTTP.Vote(kv.PlayerID, kv.name, vote_count)
	CustomNetTables:SetTableValue("sub_data", tostring(kv.PlayerID), sub_data)
end

function shop:heroes_vote_free(kv)
	local player = PlayerResource:GetPlayer(kv.PlayerID)
	if not player then
		return
	end
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(kv.PlayerID))
	if not sub_data or sub_data.subscribed == 0 then
		return
	end
	if sub_data.free_vote_cd > 0 then
		return
	end
	sub_data.votes_count = sub_data.votes_count + 1
	sub_data.free_vote_cd = shop_free_vote_cd
	HTTP.BonusVotes(kv.PlayerID, 1, sub_data.free_vote_cd * 1000)
	CustomNetTables:SetTableValue("sub_data", tostring(kv.PlayerID), sub_data)
end

function shop:get_bonus_shards(kv)
	local player = PlayerResource:GetPlayer(kv.PlayerID)
	if not player then
		return
	end
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(kv.PlayerID))
	if sub_data.bonus_shards_cd > 0 then
		return
	end
	local count = RandomInt(shop_daily_shards_min, shop_daily_shards_max)
	local limit = 0
	local change = count
	if sub_data.subscribed == 0 then
		if sub_points_max - sub_data.points <= count then
			limit = 1
		end
		change = math.min(math.max(sub_points_max - sub_data.points, 0), count)
		sub_data.points = sub_data.points + change
	else
		sub_data.points = sub_data.points + count
	end
	sub_data.bonus_shards_cd = shop_daily_shards_cd
	HTTP.BonusShards(kv.PlayerID, math.abs(change), sub_data.bonus_shards_cd * 1000)
	CustomNetTables:SetTableValue("sub_data", tostring(kv.PlayerID), sub_data)
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(kv.PlayerID),
		"give_bonus_shards",
		{ count = count, limit = limit }
	)
end

function shop:browser_subscribe(kv)
	if not IsServer() then
		return
	end
	local player = PlayerResource:GetPlayer(kv.PlayerID)
	if not player then
		return
	end
	HTTP.Login(kv.PlayerID, kv.item_name, kv.player_id)
end

function shop:SelectQuest(kv)
	if not IsServer() then
		return
	end
	local player = PlayerResource:GetPlayer(kv.PlayerID)
	if not player then
		return
	end
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(kv.PlayerID))
	if not sub_data or sub_data.subscribed == 0 then
		return
	end
	if SelectedQuests[kv.PlayerID] ~= nil then
		return
	end
	SelectedQuests[kv.PlayerID] = kv.name
end

-- Function Update Tip Wheel
function shop:update_tip_list(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local tip_id = tonumber(data.tip_id)
	local delete = data.delete
	if delete ~= 1 and not shop:HasSelectItem(id, tips_item_list, tip_id) then
		return
	end
	local player = PlayerResource:GetPlayer(id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if not player_table or not player_table.player_tips or not player_table.selected_tip then
		return
	end
	local selected = player_table.selected_tip
	local player_tips_wheel_change = {}
	for i, id in pairs(player_table.player_tips) do
		player_tips_wheel_change[tostring(i)] = id
	end
	local max = 0
	for i, id in pairs(player_tips_wheel_change) do
		if tonumber(i) >= max then
			max = tonumber(i)
		end
	end
	if delete == 1 then
		for i = 1, max do
			if player_tips_wheel_change[tostring(i)] == tip_id then
				player_tips_wheel_change[tostring(i)] = 0
				break
			end
		end
	else
		local has_null = false
		for i, id in pairs(player_tips_wheel_change) do
			if id == tip_id then
				return
			end
		end
		for i = 1, max do
			if player_tips_wheel_change[tostring(i)] == 0 then
				player_tips_wheel_change[tostring(i)] = tip_id
				selected = tostring(i)
				has_null = true
				break
			end
		end
		if not has_null then
			player_tips_wheel_change["1"] = tip_id
			selected = "1"
		end
		player_table.selected_tip = selected
	end
	for i, id in pairs(player_tips_wheel_change) do
		player_table.player_tips[tostring(i)] = id
	end
	if delete == 1 then
		if
			selected
			and selected ~= "0"
			and (not player_table.player_tips[selected] or player_table.player_tips[selected] == 0)
		then
			player_table.selected_tip = "0"
			for i = 1, max do
				if player_table.player_tips[tostring(i)] ~= 0 then
					player_table.selected_tip = tostring(i)
					break
				end
			end
		end
	end
	CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
	CustomGameEventManager:Send_ServerToPlayer(player, "shop_update_tips_and_fives", { sub_data = player_table })
	if delete ~= 1 then
		shop:UnmarkNewBySelect(data.PlayerID, tips_item_list, tonumber(data.tip_id))
	end
end

-- function Select Current Tip
function shop:select_current_tip(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local tip_id = tostring(data.tip_id)
	local player = PlayerResource:GetPlayer(id)
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if
		sub_data
		and sub_data.player_tips
		and ((sub_data.player_tips[tip_id] ~= nil and sub_data.player_tips[tip_id] ~= 0) or tip_id == "0")
	then
		sub_data.selected_tip = tip_id
		CustomNetTables:SetTableValue("sub_data", tostring(id), sub_data)
	end
	CustomGameEventManager:Send_ServerToPlayer(player, "shop_update_tips_and_fives", { sub_data = sub_data })
end

function shop:select_current_high_five(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local high_five_id = tonumber(data.high_five_id) or 0
	if high_five_id ~= 0 and not shop:HasSelectItem(id, high_five_item_list, high_five_id) then
		return
	end
	local player = PlayerResource:GetPlayer(id)
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if sub_data then
		sub_data.selected_high_five = high_five_id
		CustomNetTables:SetTableValue("sub_data", tostring(id), sub_data)
	end
	shop:UnmarkNewBySelect(id, high_five_item_list, high_five_id)
	CustomGameEventManager:Send_ServerToPlayer(player, "shop_update_tips_and_fives", { sub_data = sub_data })
end

function shop:select_current_emblem(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local emblem_id = tonumber(data.emblem_id) or 0
	if emblem_id ~= 0 and not shop:IsCustomEffectItem("emblems", emblem_id, id) then
		return
	end
	local player = PlayerResource:GetPlayer(id)
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if sub_data then
		sub_data.selected_emblem = emblem_id
		CustomNetTables:SetTableValue("sub_data", tostring(id), sub_data)
	end
	if _G.shop_effects_list then
		shop:UnmarkNewBySelect(id, _G.shop_effects_list["emblems"], emblem_id)
	end
	CustomGameEventManager:Send_ServerToPlayer(player, "shop_update_tips_and_fives", { sub_data = sub_data })
	local hero = PlayerResource:GetSelectedHeroEntity(id)
	if hero then
		shop:UpdateEmblemForHero(hero, id, emblem_id)
	end
end

function shop:IsCustomEffectItem(effect_type, effect_id, player_id)
	if not effect_type or not effect_id then
		return false
	end
	if not _G.shop_effects_list or not _G.shop_effects_list[effect_type] then
		return false
	end
	for _, effect_item in pairs(_G.shop_effects_list[effect_type]) do
		if tonumber(effect_item[2]) == tonumber(effect_id) then
			if player_id == nil then
				return true
			end
			return HasDonateItem(player_id, effect_item[1])
		end
	end
	return false
end

function shop:select_current_effect(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local effect_type = data.effect_type
	local effect_id = tonumber(data.effect_id) or 0
	if not effect_type or effect_type == "emblems" then
		return
	end
	local player = PlayerResource:GetPlayer(id)
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if sub_data then
		sub_data.selected_effects = sub_data.selected_effects or {}
		if effect_id == 0 then
			sub_data.selected_effects[effect_type] = 0
		elseif shop:IsCustomEffectItem(effect_type, effect_id, id) then
			sub_data.selected_effects[effect_type] = effect_id
		else
			return
		end
		CustomNetTables:SetTableValue("sub_data", tostring(id), sub_data)

		if effect_id ~= 0 and _G.shop_effects_list then
			shop:UnmarkNewBySelect(id, _G.shop_effects_list[effect_type], effect_id)
		end

		if effect_type == "effect_attack" then
			local hero = PlayerResource:GetSelectedHeroEntity(id)
			if hero and not hero:IsNull() then
				local main_mod = hero:FindModifierByName("modifier_player_main_custom")
				if main_mod and main_mod.UpdateProjectileAttack then
					main_mod:UpdateProjectileAttack()
				end
			end
		end
	end
	CustomGameEventManager:Send_ServerToPlayer(player, "shop_update_tips_and_fives", { sub_data = sub_data })
end

function shop:UpdateEmblemForHero(hero, player_id, emblem_id)
	if hero and IsValid(hero) and (hero:IsRealHero() or hero:IsIllusion()) then
		if hero:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier") then
			return
		end
		if not emblem_id then
			local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(player_id))
			if sub_data then
				emblem_id = sub_data.selected_emblem
			end
		end
		if hero.current_emblem and hero.current_emblem == emblem_id then
			return
		end
		if hero.emblem_pfx then
			ParticleManager:DestroyParticle(hero.emblem_pfx, true)
			ParticleManager:ReleaseParticleIndex(hero.emblem_pfx)
			hero.emblem_pfx = nil
			hero.current_emblem = nil
			if hero.reconnects_emblems then
				for _, pfx in pairs(hero.reconnects_emblems) do
					ParticleManager:DestroyParticle(pfx, true)
					ParticleManager:ReleaseParticleIndex(pfx)
				end
			end
		end
		if emblem_id and _G.EmblemsListPFX[emblem_id] and shop:IsCustomEffectItem("emblems", emblem_id, player_id) then
			hero.current_emblem = emblem_id
			hero.emblem_pfx =
				ParticleManager:CreateParticle(_G.EmblemsListPFX[emblem_id], PATTACH_ABSORIGIN_FOLLOW, hero)
		end
	end
end

function shop:GetHighFiveData(id)
	for _, data in pairs(high_five_item_list) do
		if data[2] == id then
			return { data[7], data[8], data[9] }
		end
	end
end

function shop:send_promo_code(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local text = data.text
	if not text or text == "" then
		return
	end
	local player = PlayerResource:GetPlayer(id)
	if not player then
		return
	end
	local player_table = players[id]
	if not player_table then
		return
	end
	if player_table.promo_cd > 0 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"panorama_cooldown_error",
			{ message = "#dota_item_change_error", time = player_table.promo_cd }
		)
		return
	end
	local send_data = {
		matchId = HTTP.GetMatchId(),
		matchKey = HTTP.MATCH_KEY,
		code = data.text,
		playerId = tostring(PlayerResource:GetSteamAccountID(id)),
	}

	HTTP.Request("/promo", send_data, function(data)
		local status = -1
		local eng = ""
		local ru = ""
		local amount = 0
		local name = ""
		if data then
			status = data.status
			ru = data.ruResponse
			eng = data.engResponse
			if data.awardsAmount then
				amount = data.awardsAmount
			end
			if data.awardsName then
				name = data.awardsName
			end
			if status == 0 then
				local steamIDs = {}
				table.insert(steamIDs, tostring(PlayerResource:GetSteamAccountID(id)))

				dota1x6:SendState(steamIDs)
			end
		end
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"answer_promo_code",
			{ status = status, ru = ru, eng = eng, amount = amount, name = name }
		)
	end, nil, false)

	player_table.promo_cd = 3
end

function shop:CheckGifts(for_id)
	if not IsServer() then
		return
	end
	local steamIDs = {}
	for id = 0, 24 do
		if ValidId(id) and (not for_id or for_id == id) then
			table.insert(steamIDs, tostring(PlayerResource:GetSteamAccountID(id)))
		end
	end

	HTTP.Request("/gifts", {
		Players = steamIDs,
	}, function(data)
		if not data then
			return
		end
		shop:UpdateGifts(data)
	end)
end

function shop:UpdateGifts(table)
	if not IsServer() then
		return
	end
	local new_data = {}
	for id = 0, 24 do
		if ValidId(id) then
			new_data[id] = {}
		end
	end
	for _, data in pairs(table) do
		if data.count and data.count > 0 and data.gifts and #data.gifts > 0 then
			local id = HTTP.GetPlayerBySteamID(data.playerId)
			new_data[id] = data.gifts
		end
	end
	for id, data in pairs(new_data) do
		CustomNetTables:SetTableValue("gifts_data", tostring(id), data)
		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "gift_alert", {})
	end
end

function shop:accept_gift(js_data)
	if js_data.PlayerID == nil then
		return
	end
	if js_data.giftId == nil then
		return
	end
	local id = js_data.PlayerID
	local giftId = js_data.giftId
	local gifts_data = CustomNetTables:GetTableValue("gifts_data", tostring(id))
	for _, data in pairs(gifts_data) do
		if data.giftId == giftId then
			HTTP.Request("/accept_gift", {
				matchId = HTTP.GetMatchId(),
				matchKey = HTTP.MATCH_KEY,
				playerId = tostring(PlayerResource:GetSteamAccountID(id)),
				giftId = giftId,
			}, function(data)
				if not data then
					return
				end
				local gifts_data = {}
				for _, player_data in pairs(data) do
					if player_data.gifts and #player_data.gifts > 0 then
						gifts_data = player_data.gifts
					end
					break
				end
				CustomNetTables:SetTableValue("gifts_data", tostring(id), gifts_data)
				CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "gift_alert", {})
				local steamIDs = {}
				table.insert(steamIDs, tostring(PlayerResource:GetSteamAccountID(id)))
				dota1x6:SendState(steamIDs)
			end)
		end
	end
end

function shop:shop_dota1x6_open_chest_get_items_list(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local chest_id = tonumber(data.chest_id)
	if DOTA1X6_CHESTS_INFO[chest_id] == nil then
		return
	end
	local chest_info = {
		["chest_name"] = DOTA1X6_CHESTS_INFO[chest_id].chest_name,
		["chest_items"] = DOTA1X6_CHESTS_INFO[chest_id].chest_items,
		["chest_id"] = chest_id,
		["chest_cost"] = DOTA1X6_CHESTS_INFO[chest_id].chest_cost,
		["chance"] = DOTA1X6_CHESTS_INFO[chest_id].chance,
		["is_no_buy"] = DOTA1X6_CHESTS_INFO[chest_id].is_no_buy,
		["is_only_one_open"] = DOTA1X6_CHESTS_INFO[chest_id].is_only_one_open,
		["is_reroll"] = DOTA1X6_CHESTS_INFO[chest_id].is_reroll,
		["chest_item_id"] = DOTA1X6_CHESTS_INFO[chest_id].chest_item_id,
	}
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(id),
		"shop_dota1x6_open_chest_information",
		{ chest_info = chest_info }
	)
end

function shop:shop_dota1x6_close_chest_checked_reward(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	if shop.saved_players_chest_items[id] == nil then
		return
	end
	local chest_id = shop.saved_players_chest_items[id].chest_id
	local cost = shop.saved_players_chest_items[id].cost
	local item_id = shop.saved_players_chest_items[id].item_id
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	local player_items_table = {}
	if player_table then
		if player_table.items_ids then
			for k, v in pairs(player_table.items_ids) do
				table.insert(player_items_table, v)
			end
		end
		player_table.points = player_table.points - cost
		table.insert(player_items_table, item_id)
		HTTP.BuyItem(id, item_id, math.abs(cost))
		if shop.ITEMS_BUNDDLE_LIST[item_id] then
			for _, item_id_in_bundle in pairs(shop.ITEMS_BUNDDLE_LIST[item_id]) do
				table.insert(player_items_table, item_id_in_bundle)
				HTTP.BuyItem(data.PlayerID, item_id_in_bundle, 0)
			end
		end
		player_table.items_ids = player_items_table
		CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
	end
	shop.saved_players_chest_items[id] = nil
end

function shop:shop_dota1x6_open_chest_get_reward(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local chest_id = tonumber(data.chest_id)
	local is_rerolled = data.rerolled
	local drop_id = nil
	if DOTA1X6_CHESTS_INFO[chest_id] == nil then
		return
	end
	local saved_chest = shop.saved_players_chest_items[id]
	if is_rerolled and not saved_chest then
		return
	end
	if is_rerolled and saved_chest.chest_id ~= chest_id then
		return
	end
	if not is_rerolled and saved_chest then
		return
	end
	if
		not is_rerolled
		and DOTA1X6_CHESTS_INFO[chest_id].is_no_buy
		and not HasDonateItem(id, DOTA1X6_CHESTS_INFO[chest_id].chest_item_id)
	then
		return
	end
	if not is_rerolled and DOTA1X6_CHESTS_INFO[chest_id].is_only_one_open and shop:IsChestOpened(id, chest_id) then
		return
	end
	local items_in_chest = DOTA1X6_CHESTS_INFO[chest_id].chest_items
	if shop.saved_players_chest_items[id] then
		drop_id = shop:GetRandomRewardFromChest(id, items_in_chest, shop.saved_players_chest_items[id].item_id)
	else
		drop_id = shop:GetRandomRewardFromChest(id, items_in_chest)
	end
	if is_rerolled and not shop.saved_players_chest_items[id] then
		return
	end
	shop.saved_players_chest_items[id] = nil
	if drop_id == nil then
		return
	end
	local is_retry_drop = false
	local shard_counter = 0
	local cost = DOTA1X6_CHESTS_INFO[chest_id].chest_cost
	local player = PlayerResource:GetPlayer(id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	local player_items_table = {}
	local is_reroll = false
	if player_table then
		if player_table.points < cost then
			return
		end
		if DOTA1X6_CHESTS_INFO[chest_id].is_only_one_open and not is_rerolled then
			local chest_opened_table = {}
			for k, v in pairs(player_table.chest_opened) do
				table.insert(chest_opened_table, v)
			end
			table.insert(chest_opened_table, chest_id)
			player_table.chest_opened = chest_opened_table

			HTTP.BuyItem(id, DOTA1X6_CHESTS_INFO[chest_id].chest_item_id, 0)
		end
		if player_table.items_ids then
			for k, v in pairs(player_table.items_ids) do
				table.insert(player_items_table, v)
			end
		end
		if HasDonateItem(id, drop_id.item_id) then
			player_table.points = player_table.points - (cost * (1 - shop.HOW_MUCH_CHEST_RETURN_GOLD_PERCENT / 100))
			is_retry_drop = true
			shard_counter = cost * (shop.HOW_MUCH_CHEST_RETURN_GOLD_PERCENT / 100)
			HTTP.BuyItem(id, drop_id.item_id, math.abs((cost * (1 - shop.HOW_MUCH_CHEST_RETURN_GOLD_PERCENT / 100))))
		else
			if DOTA1X6_CHESTS_INFO[chest_id].is_reroll and not is_rerolled then
				shop.saved_players_chest_items[id] = {
					["cost"] = cost,
					["item_id"] = drop_id.item_id,
					["chest_id"] = chest_id,
				}
				is_reroll = true
			else
				player_table.points = player_table.points - cost
				table.insert(player_items_table, drop_id.item_id)
				HTTP.BuyItem(id, drop_id.item_id, math.abs(cost))
				if shop.ITEMS_BUNDDLE_LIST[drop_id.item_id] then
					for _, item_id_in_bundle in pairs(shop.ITEMS_BUNDDLE_LIST[drop_id.item_id]) do
						table.insert(player_items_table, item_id_in_bundle)
						HTTP.BuyItem(data.PlayerID, item_id_in_bundle, 0)
					end
				end
				shop.saved_players_chest_items[id] = nil
			end
		end
		if is_rerolled then
			is_reroll = false
		end
		player_table.items_ids = player_items_table
		CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(id),
		"shop_dota1x6_open_chest_active",
		{
			drop_id = drop_id.item_id,
			items = items_in_chest,
			is_retry_drop = is_retry_drop,
			shard_counter = shard_counter,
			is_reroll = is_reroll,
		}
	)
end

function shop:GetRandomRewardFromChest(id, items_in_chest, remove_item_id)
	local get_drop = nil
	local has_items_with_chance = {}
	local no_items_list = {}
	local items_no_rare = {}
	for _, item in pairs(items_in_chest) do
		if not HasDonateItem(id, item.item_id) and item.chance ~= nil then
			table.insert(has_items_with_chance, item)
		end
		if not HasDonateItem(id, item.item_id) and item.chance == nil then
			table.insert(no_items_list, item)
		end
		if item.chance == nil then
			table.insert(items_no_rare, item)
		end
	end

	if remove_item_id ~= nil then
		if #has_items_with_chance > 1 then
			for i = #has_items_with_chance, 1, -1 do
				if
					has_items_with_chance[i]
					and tonumber(has_items_with_chance[i].item_id) == tonumber(remove_item_id)
				then
					table.remove(has_items_with_chance, i)
				end
			end
		end
		if #no_items_list > 1 then
			for i = #no_items_list, 1, -1 do
				if no_items_list[i] and tonumber(no_items_list[i].item_id) == tonumber(remove_item_id) then
					table.remove(no_items_list, i)
				end
			end
		end
		if #items_no_rare > 1 then
			for i = #items_no_rare, 1, -1 do
				if items_no_rare[i] and tonumber(items_no_rare[i].item_id) == tonumber(remove_item_id) then
					table.remove(items_no_rare, i)
				end
			end
		end
		print("Из сундука больше не выпадет", remove_item_id)
	end

	if #has_items_with_chance > 0 then
		for _, item in pairs(has_items_with_chance) do
			if RollPercentage(item.chance) then
				get_drop = item
				break
			end
		end
		if get_drop == nil then
			if #no_items_list <= 0 then
				return items_no_rare[RandomInt(1, #items_no_rare)]
			else
				repeat
					local random = RandomInt(1, #no_items_list)
					get_drop = no_items_list[random]
				until not HasDonateItem(id, get_drop.item_id)
			end
		end
	else
		if #no_items_list <= 0 then
			return
		end
		get_drop = no_items_list[RandomInt(1, #no_items_list)]
	end
	return get_drop
end

function shop:IsChestOpened(player_id, chest_id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(player_id))
	local chest_opened_table = {}
	for k, v in pairs(player_table.chest_opened) do
		chest_opened_table[tostring(v)] = true
	end
	if chest_opened_table[tostring(chest_id)] then
		return true
	end
	return false
end

function shop:GiveArcanaChestForPlayer(player_id)
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(player_id))
	local server_data = CustomNetTables:GetTableValue("server_data", tostring(player_id))
	if not server_data or not player_table then
		return -1
	end
	local game_count = server_data.total_games
	if player_table and player_table.subscribed == 1 and not HasDonateItem(player_id, 100000) then
		local player_items_table = {}
		if player_table.items_ids then
			for k, v in pairs(player_table.items_ids) do
				table.insert(player_items_table, v)
			end
		end
		table.insert(player_items_table, 100000)
		player_table.items_ids = player_items_table
		CustomNetTables:SetTableValue("sub_data", tostring(player_id), player_table)
	end
	local result = -1
	if not shop:IsChestOpened(player_id, 2) then
		result = 1
		if not HasDonateItem(player_id, 100000) then
			result = 0
			if game_count <= 5 then
				result = -1
			end
		end
	end
	return result
end

function shop:ParseMatchPlayedChest(player)
	local model = player.matchPlayedChest or player.MatchPlayedChest or player.matchPlayedChestModel
	if not model then
		return { playedCount = 0, cooldown = 0 }
	end

	local cd =
		math.max(0, shop_chest_cd - math.max(GetUnixTimestamp() - (tonumber(model.cooldown or model.Cooldown) or 0), 0))

	return {
		playedCount = tonumber(model.playedCount or model.PlayedCount) or 0,
		cooldown = cd,
		poorChestId = tonumber(model.poorChestId or model.PoorChestId),
		richChestId = tonumber(model.richChestId or model.RichChestId),
	}
end

function shop:GetChestTable(player_id)
	return CustomNetTables:GetTableValue("chest_data", tostring(player_id)) or {}
end

function shop:SetChestTable(player_id, chest_table)
	CustomNetTables:SetTableValue("chest_data", tostring(player_id), chest_table)
end

function shop:HasPendingChestPair(player_id)
	local chest_table = shop:GetChestTable(player_id)
	return chest_table.poor_id ~= nil or chest_table.rich_id ~= nil
end

function shop:IsRankedChestGame()
	if IsUnrankedMap() then
		return false
	end
	if not (HTTP.serverData.isStatsMatch or test) then
		return false
	end
	return true
end

function shop:RollChestPairIds()
	if #DOTA1X6_POOR_CHESTS <= 0 or #DOTA1X6_RICH_CHESTS <= 0 then
		return nil, nil
	end
	return RandomInt(1, #DOTA1X6_POOR_CHESTS), RandomInt(1, #DOTA1X6_RICH_CHESTS)
end

function shop:GrantChestPair(player_id)
	local poor_id, rich_id = shop:RollChestPairIds()
	if not poor_id then
		return nil, nil
	end
	local chest_table = shop:GetChestTable(player_id)
	chest_table.counter = 0
	chest_table.cd = GetUnixTimestamp()
	chest_table.poor_id = poor_id
	chest_table.rich_id = rich_id
	shop:SetChestTable(player_id, chest_table)
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(player_id),
		"chest_pair_granted",
		{ poor_id = poor_id, rich_id = rich_id }
	)
	return poor_id, rich_id
end

function shop:BuildChestEndModel(player_id, place)
	if not ValidId(player_id) then
		return nil
	end
	local chest_table = shop:GetChestTable(player_id)
	local counter = chest_table.counter or 0
	local model = { PlayedCount = counter }
	local not_last = place ~= nil and _G.max_teams ~= nil and (place < _G.max_teams or test)
	local cd_ready = (chest_table.cd or 0) <= 0

	if test then
		model.Cooldown = 0
	else
		if not (shop:IsRankedChestGame() and not_last and cd_ready) then
			return model
		end
	end
	counter = counter + 1
	if counter >= shop.CHEST_GAMES_REQUIRED then
		local poor_id, rich_id = shop:GrantChestPair(player_id)
		if poor_id then
			model.PlayedCount = 0
			model.Cooldown = GetUnixTimestamp()
			model.PoorChestId = poor_id
			model.RichChestId = rich_id
			return model
		end
	end
	chest_table.counter = counter
	shop:SetChestTable(player_id, chest_table)
	model.PlayedCount = counter
	return model
end

function shop:SendPendingChestInfo(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if not player_table then
		return
	end
	local chest_table = shop:GetChestTable(id)
	local poor_id = tonumber(chest_table.poor_id)
	local rich_id = tonumber(chest_table.rich_id)
	if poor_id == nil and rich_id == nil then
		return
	end
	local poor_chest = poor_id and DOTA1X6_POOR_CHESTS[poor_id] or nil
	local rich_chest = rich_id and DOTA1X6_RICH_CHESTS[rich_id] or nil
	local info = {
		["is_sub"] = player_table.subscribed == 1 and 1 or 0,
	}
	if poor_chest then
		info["poor"] = {
			["chest_name"] = poor_chest.chest_name,
			["chest_image"] = poor_chest.chest_image,
			["chest_items"] = poor_chest.chest_items,
			["id"] = chest_table.poor_id,
		}
	end
	if rich_chest then
		info["rich"] = {
			["chest_name"] = rich_chest.chest_name,
			["chest_image"] = rich_chest.chest_image,
			["chest_items"] = rich_chest.chest_items,
			["id"] = chest_table.rich_id,
		}
	end
	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "chest_pair_info", { chest_info = info })
end

function shop:RollPairReward(player_id, items_in_chest, duplicate_reward)
	local with_chance = {}
	local normal_items = {}
	for _, item in pairs(items_in_chest) do
		if item.chance ~= nil then
			table.insert(with_chance, item)
		else
			table.insert(normal_items, item)
		end
	end
	table.sort(with_chance, function(a, b)
		return a.chance < b.chance
	end)
	local drop = nil
	for _, item in pairs(with_chance) do
		if RollPercentage(item.chance) then
			drop = item
			break
		end
	end
	if drop == nil then
		if #normal_items > 0 then
			drop = normal_items[RandomInt(1, #normal_items)]
		elseif #with_chance > 0 then
			drop = with_chance[RandomInt(1, #with_chance)]
		end
	end
	if drop == nil then
		return nil, false, 0
	end
	local is_dup = HasDonateItem(player_id, drop.item_id)
	local shards = 0
	if is_dup then
		shards = duplicate_reward or shop.CHEST_DUPLICATE_REWARD_POOR
	end
	return drop, is_dup, shards
end

function shop:ApplyChestDrop(player_id, player_table, drop, is_dup, shards)
	if not player_table then
		return
	end
	if is_dup then
		player_table.points = (player_table.points or 0) + shards
		HTTP.AddShards(player_id, shards, "chestDuplicate")
	else
		local player_items_table = {}
		if player_table.items_ids then
			for k, v in pairs(player_table.items_ids) do
				table.insert(player_items_table, v)
			end
		end
		table.insert(player_items_table, drop.item_id)
		shop:MarkItemNew(player_table, drop.item_id)
		HTTP.BuyItem(player_id, drop.item_id, 0)
		if shop.ITEMS_BUNDDLE_LIST[drop.item_id] then
			for _, item_id_in_bundle in pairs(shop.ITEMS_BUNDDLE_LIST[drop.item_id]) do
				table.insert(player_items_table, item_id_in_bundle)
				HTTP.BuyItem(player_id, item_id_in_bundle, 0)
			end
		end
		player_table.items_ids = player_items_table
	end
end

function shop:OpenPendingChest(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local which = data.which
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if not player_table then
		return
	end
	local chest_table = shop:GetChestTable(id)
	local is_sub = player_table.subscribed == 1

	if which == "poor" then
		local poor_id = tonumber(chest_table.poor_id)
		if poor_id == nil then
			return
		end
		local chest = DOTA1X6_POOR_CHESTS[poor_id]
		if not chest then
			return
		end
		local drop, is_dup, shards = shop:RollPairReward(id, chest.chest_items, shop.CHEST_DUPLICATE_REWARD_POOR)
		if drop == nil then
			return
		end
		shop:ApplyChestDrop(id, player_table, drop, is_dup, shards)
		chest_table.poor_id = nil
		shop:SetChestTable(id, chest_table)
		CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
		HTTP.ConsumeMatchPlayedChest(id, 1)
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"chest_pair_roll_result",
			{ which = "poor", drop_id = drop.item_id, is_dup = is_dup and 1 or 0, shards = shards }
		)
	elseif which == "rich" then
		if not is_sub then
			return
		end
		local rich_id = tonumber(chest_table.rich_id)
		if rich_id == nil then
			return
		end
		local chest = DOTA1X6_RICH_CHESTS[rich_id]
		if not chest then
			return
		end
		local drop, is_dup, shards = shop:RollPairReward(id, chest.chest_items, shop.CHEST_DUPLICATE_REWARD_RICH)
		if drop == nil then
			return
		end
		shop:ApplyChestDrop(id, player_table, drop, is_dup, shards)
		chest_table.rich_id = nil
		shop:SetChestTable(id, chest_table)
		CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
		HTTP.ConsumeMatchPlayedChest(id, 2)
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(id),
			"chest_pair_roll_result",
			{ which = "rich", drop_id = drop.item_id, is_dup = is_dup and 1 or 0, shards = shards }
		)
	end

	if HTTP.leavedPlayers[id] then
		HTTP.leavedPlayers[id] = nil
		HTTP.PlayerLeave(id)
	end
end

function shop:IsChest(id)
	for chest_id, chest_data in pairs(DOTA1X6_CHESTS_INFO) do
		if chest_data.chest_item_id then
			if chest_data.chest_item_id == id then
				return chest_id
			end
		end
	end
	return false
end

shop.PET_NAME_MAX_CHARS = 15

function shop:DecodeUtf8(text)
	local codes = {}
	local len = #text
	local i = 1
	while i <= len do
		local byte = text:byte(i)
		local size, code
		if byte < 0x80 then
			size, code = 1, byte
		elseif byte >= 0xC2 and byte <= 0xDF then
			size, code = 2, byte - 0xC0
		elseif byte >= 0xE0 and byte <= 0xEF then
			size, code = 3, byte - 0xE0
		elseif byte >= 0xF0 and byte <= 0xF4 then
			size, code = 4, byte - 0xF0
		else
			return nil
		end
		if i + size - 1 > len then
			return nil
		end
		for j = 1, size - 1 do
			local cont = text:byte(i + j)
			if cont == nil or cont < 0x80 or cont > 0xBF then
				return nil
			end
			code = code * 64 + (cont - 0x80)
		end
		codes[#codes + 1] = code
		i = i + size
	end
	return codes
end

function shop:IsValidPetNameCode(code)
	if code >= 48 and code <= 57 then
		return true
	end
	if code >= 65 and code <= 90 then
		return true
	end
	if code >= 97 and code <= 122 then
		return true
	end
	if code >= 0x0400 and code <= 0x04FF then
		return true
	end
	if code == 32 then
		return true
	end
	return false
end

function shop:ValidatePetName(text)
	if type(text) ~= "string" then
		return nil
	end
	if #text > shop.PET_NAME_MAX_CHARS * 4 then
		return nil
	end
	text = text:gsub("^%s+", ""):gsub("%s+$", "")
	if text == "" then
		return ""
	end
	local codes = shop:DecodeUtf8(text)
	if codes == nil then
		return nil
	end
	if #codes > shop.PET_NAME_MAX_CHARS then
		return nil
	end
	for _, code in ipairs(codes) do
		if not shop:IsValidPetNameCode(code) then
			return nil
		end
	end
	return text
end

function shop:send_courier_name(data)
	if data.PlayerID == nil then
		return
	end
	local id = data.PlayerID
	local player = PlayerResource:GetPlayer(id)
	if not player then
		return
	end
	if not players[id] then
		return
	end
	local text = shop:ValidatePetName(data.text)
	if text == nil then
		return
	end
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(id))
	if not player_table then
		return
	end
	player_table.pet_overhead_name = text
	CustomNetTables:SetTableValue("sub_data", tostring(id), player_table)
end

function shop:GetEffectData(effect_type, effect_id)
	if not effect_type or not effect_id then
		return
	end
	if _G.CustomEffectsListPFX and _G.CustomEffectsListPFX[effect_type] then
		return _G.CustomEffectsListPFX[effect_type][tonumber(effect_id)]
	end
end

function shop:GetCurrentEffectData(player_id, effect_type)
	local sub_data = CustomNetTables:GetTableValue("sub_data", tostring(player_id))
	if not sub_data or not sub_data.selected_effects then
		return
	end
	local effect_id = sub_data.selected_effects[effect_type]
	if not effect_id or tonumber(effect_id) == 0 then
		return
	end
	if not shop:IsCustomEffectItem(effect_type, effect_id, player_id) then
		return
	end
	return shop:GetEffectData(effect_type, effect_id)
end