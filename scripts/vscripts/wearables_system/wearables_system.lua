--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


if not wearables_system then
	_G.wearables_system = class({})

	wearables_system.ReplacementInfo = wearables_system.ReplacementInfo or {}
	wearables_system.ReplacementInfoAllList = wearables_system.ReplacementInfoAllList or {}
	wearables_system.ReplacementInfoEffects = wearables_system.ReplacementInfoEffects or {}

	wearables_system.ITEMS_DATA = {}
	wearables_system.DEFAULT_ITEMS_IDS = {}
	wearables_system.ITEMS_LIST = {}
	wearables_system.ITEMS_LIST_PFX = {}
	wearables_system.INIT_HEROES_ITEMS = {}
	wearables_system.INIT_PRECACHED_ITEMS = {}
	wearables_system.INIT_ENTITY_ITEMS = {}
	wearables_system.PRECACHED_HEROES = {}

	wearables_system.items_data_slots = {}
	wearables_system.items_data_info = {}
	wearables_system.full_slots_for_hero = {}

	wearables_system.items_hash_data = {}
	wearables_system.selection_data = {}
	wearables_system.is_hero_precached = {}

	wearables_system.item_styles_saved = {}

	wearables_system.items_applied_effects = {}
end

require("wearables_system/configs")
require("wearables_system/util")

if IsInToolsMode() then
	require("wearables_system/items_print")
end

-- Инит всех предметов
function wearables_system:AddPrecachedData(hero_name)
	wearables_system:InitHeroWerables(hero_name)
	if wearables_system.INIT_PRECACHED_ITEMS[hero_name] then
		return
	end
	if wearables_system.INIT_HEROES_ITEMS[hero_name] then
		return
	end
	wearables_system.INIT_PRECACHED_ITEMS[hero_name] = true
	wearables_system.ITEMS_LIST[hero_name] = require("wearables_system/items_list/" .. hero_name)
	wearables_system:UpdateItemsSlots(hero_name)
end

-- Обновление предмет - слот
function wearables_system:UpdateItemsSlots(hero_name)
	if wearables_system.ITEMS_LIST[hero_name] and not wearables_system.items_data_slots[hero_name] then
		wearables_system.items_data_slots[hero_name] = {}
		wearables_system.full_slots_for_hero[hero_name] = {}
		for _, v in pairs(wearables_system.ITEMS_LIST[hero_name]) do
			wearables_system.items_data_slots[hero_name][v.item_model] = v.item_slot
			if not wearables_system.items_data_info[v.item_model] then
				wearables_system.items_data_info[v.item_model] = { v.item_id }
				if v.visuals_list and v.visuals_list.secondary_items then
					wearables_system:AddSecondaryItems(v.visuals_list.secondary_items, hero_name, v.item_model)
				end
			end
			if not wearables_system.full_slots_for_hero[hero_name][v.item_slot] then
				wearables_system.full_slots_for_hero[hero_name][v.item_slot] = true
			end
		end
		for _, v in pairs(wearables_system.ITEMS_LIST[hero_name]) do
			if v.visuals_list and v.visuals_list.models_refit then
				wearables_system:UpdateItemsRefitsUpgr(v.visuals_list.models_refit, hero_name)
			end
		end
	end
end

function wearables_system:UpdateItemsRefitsUpgr(refit_data, hero_name)
	for _, refit_list in pairs(refit_data) do
		for model_original, model_refit in pairs(refit_list) do
			local data_model_original = wearables_system.items_data_info[model_original]
			if data_model_original then
				wearables_system.items_data_info[model_refit] = data_model_original
				wearables_system.items_data_slots[hero_name][model_refit] =
					wearables_system.items_data_slots[hero_name][model_original]
			end
		end
	end
end

function wearables_system:AddSecondaryItems(secondary_list, hero_name, model_original)
	for _, model_refit in pairs(secondary_list) do
		local data_model_original = wearables_system.items_data_info[model_original]
		if data_model_original then
			wearables_system.items_data_info[model_refit] = data_model_original
			wearables_system.items_data_slots[hero_name][model_refit] =
				wearables_system.items_data_slots[hero_name][model_original]
		end
	end
end

-- Сохранение обычных предметов игрока
function wearables_system:SaveDefaultItemsData(hero_name, slot, model_name, hash)
	if wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot] then
		return
	end
	if model_name == "models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon_blossom.vmdl" then
		model_name = "models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon.vmdl"
	end
	local material_group = "0"
	if hash and ITEMS_WEARABLES_HASH[tostring(hash)] then
		material_group = ITEMS_WEARABLES_HASH[tostring(hash)]
	end
	local accept_item = false
	local function GetItemId(data)
		return data.dota_id or data.item_id
	end

	for _, data in pairs(wearables_system.ITEMS_DATA[hero_name]) do
		local is_not_material_group = false
		if data.MaterialGroupItem == nil then
			is_not_material_group = true
		end
		if
			data
			and (data.MaterialGroupItem == material_group or ((material_group == "0" or material_group == "default") and is_not_material_group))
			and data.ItemModel == model_name
		then
			accept_item = true
			wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot] = GetItemId(data)
			break
		end
	end

	if not accept_item then
		for _, data in pairs(wearables_system.ITEMS_DATA[hero_name]) do
			if data and data.ItemModel == model_name then
				accept_item = true
				wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot] = GetItemId(data)
				break
			end
		end
	end

	if
		wearables_system.ITEMS_LIST[hero_name]
		and wearables_system.items_data_info[model_name]
		and not wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot]
	then
		wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot] = wearables_system.items_data_info[model_name][1]
	end

	-- Установка обычного предмета
	if wearables_system.ITEMS_LIST[hero_name] and not wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot] then
		for _, data in pairs(wearables_system.ITEMS_LIST[hero_name]) do
			if data.item_slot == slot and data.IsDefaultItem then
				wearables_system.DEFAULT_ITEMS_IDS[hero_name][slot] = data.item_id
			end
		end
	end
end

-- Инит игрока
function wearables_system:InitHeroWerables(hero_name)
	if wearables_system.INIT_HEROES_ITEMS[hero_name] then
		return
	end
	if hero_name == "npc_dota_hero_target_dummy" then
		return
	end
	wearables_system.INIT_HEROES_ITEMS[hero_name] = true

	wearables_system.ReplacementInfoEffects[hero_name] = {}
	wearables_system.ReplacementInfoEffects[hero_name].particle_replace = {}
	wearables_system.ReplacementInfoEffects[hero_name].sound_replace = {}
	wearables_system.ReplacementInfoEffects[hero_name].ability_icons = {}
	wearables_system.ReplacementInfoEffects[hero_name].models = {}

	wearables_system.ReplacementInfo[hero_name] = {}
	wearables_system.ReplacementInfo[hero_name].particle_replace = {}
	wearables_system.ReplacementInfo[hero_name].sound_replace = {}
	wearables_system.ReplacementInfo[hero_name].models = {}
	wearables_system.ReplacementInfo[hero_name].ability_icons = {}
	wearables_system.ReplacementInfo[hero_name].models_refits = {}

	wearables_system.ReplacementInfoAllList[hero_name] = {}
	wearables_system.ReplacementInfoAllList[hero_name].particle_replace = {}
	wearables_system.ReplacementInfoAllList[hero_name].sound_replace = {}
	wearables_system.ReplacementInfoAllList[hero_name].models = {}
	wearables_system.ReplacementInfoAllList[hero_name].ability_icons = {}
	wearables_system.ReplacementInfoAllList[hero_name].models_refits = {}

	wearables_system.DEFAULT_ITEMS_IDS[hero_name] = {}
	wearables_system.item_styles_saved[hero_name] = {}

	if not wearables_system.ITEMS_LIST[hero_name] and _G.added_shop_heroes[hero_name] then
		wearables_system.ITEMS_LIST[hero_name] = require("wearables_system/items_list/" .. hero_name)
		wearables_system:UpdateItemsSlots(hero_name)
	end

	if not wearables_system.ITEMS_LIST_PFX[hero_name] and _G.added_shop_heroes[hero_name] then
		wearables_system.ITEMS_LIST_PFX[hero_name] = require("wearables_system/items_list/" .. hero_name .. "_pfx")
	end

	FireGameEvent("event_init_unit", {
		hero_name = hero_name,
	})
end

-- Precache
function wearables_system:PrecacheHero(hero_name, context)
	if wearables_system.PRECACHED_HEROES[hero_name] then
		return
	end
	wearables_system.PRECACHED_HEROES[hero_name] = true
	local hero_items = wearables_system.ITEMS_LIST[hero_name]
	local precache_items_list = wearables_system.ITEMS_LIST[hero_name]
	local only_hero_items_equeped = nil

	if PlayerCount > 1 then
		precache_items_list = {}
		if wearables_system.selection_data then
			for pid, hero_table in pairs(wearables_system.selection_data) do
				for name, item_info in pairs(hero_table) do
					if hero_name == name then
						only_hero_items_equeped = {}
						local heroes_data_body = wearables_system.ITEMS_DATA[hero_name]
						for slot, item_id in pairs(item_info) do
							if
								heroes_data_body
								and heroes_data_body[item_id]
								and heroes_data_body[item_id]["dota_id"]
							then
								table.insert(
									only_hero_items_equeped,
									hero_items[tostring(heroes_data_body[item_id]["dota_id"])]
								)
							else
								table.insert(only_hero_items_equeped, hero_items[tostring(item_id)])
							end
						end
						break
					end
				end
			end
		end
		if wearables_system.items_applied_effects then
			for pid, hero_table in pairs(wearables_system.items_applied_effects) do
				for name, item_info in pairs(hero_table) do
					if hero_name == name then
						if not only_hero_items_equeped then
							only_hero_items_equeped = {}
						end
						local heroes_data_body = wearables_system.ITEMS_DATA[hero_name]
						for ability_name, item_id in pairs(item_info) do
							if
								heroes_data_body
								and heroes_data_body[item_id]
								and heroes_data_body[item_id]["dota_id"]
							then
								table.insert(
									only_hero_items_equeped,
									hero_items[tostring(heroes_data_body[item_id]["dota_id"])]
								)
							else
								table.insert(only_hero_items_equeped, hero_items[tostring(item_id)])
							end
						end
						break
					end
				end
			end
		end
		if hero_items then
			if not only_hero_items_equeped then
				only_hero_items_equeped = {}
			end
			for _, data in pairs(hero_items) do
				if
					data.IsDefaultItem
					or (data.item_slot and data.item_slot == "hero_base")
					or (data.item_slot and data.item_slot == "persona_selector")
				then
					table.insert(only_hero_items_equeped, data)
				end
			end
		end
	end

	if only_hero_items_equeped ~= nil then
		precache_items_list = only_hero_items_equeped
	end

	if precache_items_list then
		for item_id, item_info in pairs(precache_items_list) do
			if item_info["item_model"] and item_info["item_model"] ~= "" then
				PrecacheResource("model", item_info["item_model"], context)
			end
			if item_info["item_hero_model"] then
				PrecacheResource("model", item_info["item_hero_model"], context)
			end
			if item_info["visuals_list"]["models"] then
				for _, list in pairs(item_info["visuals_list"]["models"]) do
					for style, model in pairs(list) do
						PrecacheResource("model", model, context)
					end
				end
			end
			if item_info["visuals_list"]["models_refit"] then
				for _, list in pairs(item_info["visuals_list"]["models_refit"]) do
					for style, model in pairs(list) do
						PrecacheResource("model", model, context)
					end
				end
			end
			if item_info["visuals_list"]["particles_list"] then
				for _, list in pairs(item_info["visuals_list"]["particles_list"]) do
					for style, particle in pairs(list) do
						PrecacheResource("particle", particle, context)
					end
				end
			end
			if item_info["visuals_list"]["particles_list_loadout"] then
				for _, list in pairs(item_info["visuals_list"]["particles_list_loadout"]) do
					for style, particle in pairs(list) do
						PrecacheResource("particle", particle, context)
					end
				end
			end
			if item_info["visuals_list"]["particles_abilities"] then
				for _, list in pairs(item_info["visuals_list"]["particles_abilities"]) do
					for style, particle in pairs(list) do
						PrecacheResource("particle", particle, context)
					end
				end
			end
			if item_info["additional_wearable"] then
				for _, additional_data in pairs(item_info["additional_wearable"]) do
					if additional_data["item_model"] and additional_data["item_model"] ~= "" then
						PrecacheResource("model", additional_data["item_model"], context)
					end
					if additional_data["particle"] and additional_data["particle"] ~= "" then
						PrecacheResource("particle", additional_data["particle"], context)
					end
				end
			end
			if item_info and item_info["Modifier"] then
				LinkLuaModifier(
					item_info["Modifier"],
					"wearables_system/modifiers/" .. item_info["Modifier"],
					LUA_MODIFIER_MOTION_NONE
				)
				FireGameEvent(
					"client_modifier_linked",
					{ path = "wearables_system/modifiers/" .. item_info["Modifier"], name = item_info["Modifier"] }
				)
			end
		end
	end
	if _G.DEFAULT_MODELS_HEROES and _G.DEFAULT_MODELS_HEROES[hero_name] then
		PrecacheResource("model", _G.DEFAULT_MODELS_HEROES[hero_name], context)
	end
	if hero_name == "npc_dota_hero_terrorblade" then
		PrecacheResource("model", "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_manta.vmdl", context)
		PrecacheResource("model", "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_skadi.vmdl", context)
	end
	if hero_name == "npc_dota_hero_night_stalker" then
		PrecacheResource("model", "models/heroes/nightstalker/nightstalker_legarmor_night.vmdl", context)
		PrecacheResource("model", "models/heroes/nightstalker/nightstalker_tail_night.vmdl", context)
		PrecacheResource("model", "models/heroes/nightstalker/nightstalker_wings_night.vmdl", context)
		PrecacheResource("model", "models/items/nightstalker/black_nihility/black_nihility_night_back.vmdl", context)
		PrecacheResource(
			"model",
			"models/items/nightstalker/ns_ti10_immortal_arms/ns_ti10_immortal_arms_night.vmdl",
			context
		)
		PrecacheResource("model", "models/items/nightstalker/dusk_reaper_tail/dusk_reaper_tail_night.vmdl", context)
		PrecacheResource("model", "models/items/nightstalker/dusk_reaper_arms/dusk_reaper_arms_night.vmdl", context)
		PrecacheResource("model", "models/items/nightstalker/dusk_reaper_back/dusk_reaper_back_night.vmdl", context)
		PrecacheResource("model", "models/items/nightstalker/dusk_reaper_head/dusk_reaper_head_night.vmdl", context)
		PrecacheResource("model", "models/items/nightstalker/dusk_reaper_legs/dusk_reaper_legs_night.vmdl", context)
		PrecacheResource(
			"model",
			"models/items/nightstalker/noble_raiment_of_bloodlust_arms/noble_raiment_of_bloodlust_arms_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/noble_raiment_of_bloodlust_back/noble_raiment_of_bloodlust_back_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/noble_raiment_of_bloodlust_head/noble_raiment_of_bloodlust_head_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/noble_raiment_of_bloodlust_legs/noble_raiment_of_bloodlust_legs_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/noble_raiment_of_bloodlust_tail/noble_raiment_of_bloodlust_tail_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/endless_nightmare_arms_v2/endless_nightmare_arms_v2_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/endless_nightmare_back_v2/endless_nightmare_back_v2_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/endless_nightmare_head_v3/endless_nightmare_head_v3_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/endless_nightmare_legs_v2/endless_nightmare_legs_v2_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/endless_nightmare_tail/endless_nightmare_tail_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/nightstalker_night_slaughter_arms/nightstalker_night_slaughter_arms_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/nightstalker_night_slaughter_back/nightstalker_night_slaughter_back_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/nightstalker_night_slaughter_head/nightstalker_night_slaughter_head_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/nightstalker_night_slaughter_legs/nightstalker_night_slaughter_legs_night.vmdl",
			context
		)
		PrecacheResource(
			"model",
			"models/items/nightstalker/nightstalker_night_slaughter_tail/nightstalker_night_slaughter_tail_night.vmdl",
			context
		)
		PrecacheResource(
			"particle",
			"particles/econ/items/nightstalker/nightstalker_dusk_reaper/nightstalker_dusk_reaper_head_night.vpcf",
			context
		)
		PrecacheResource(
			"particle",
			"particles/econ/items/nightstalker/nightstalker_dusk_reaper/nightstalker_dusk_reaper_back_night.vpcf",
			context
		)
		PrecacheResource(
			"particle",
			"particles/econ/items/nightstalker/nightstalker_dusk_reaper/nightstalker_dusk_reaper_arms_night.vpcf",
			context
		)
	end
end

function wearables_system:HasItemAccess(PlayerID, hero_name, item_id)
	if HasDonateItem(PlayerID, item_id) then
		return true
	end
	if not wearables_system.ITEMS_DATA[hero_name] then
		return false
	end
	local item_info = wearables_system.ITEMS_DATA[hero_name][item_id]
	if not item_info or not item_info["OtherItemsBundle"] then
		return false
	end
	for _, bundle_item in pairs(item_info["OtherItemsBundle"]) do
		if HasDonateItem(PlayerID, bundle_item[1]) then
			return true
		end
	end
	return false
end

function wearables_system:PreSaveItemSelectionData(PlayerID, item_id, hero_name)
	if not wearables_system.ITEMS_DATA[hero_name] then
		return
	end
	local original_item_information = wearables_system.ITEMS_DATA[hero_name][item_id]
	if original_item_information == nil then
		return
	end
	if not wearables_system:HasItemAccess(PlayerID, hero_name, item_id) then
		return
	end
	local item_slot_type = original_item_information["SlotType"]
	if wearables_system.selection_data[PlayerID] == nil then
		wearables_system.selection_data[PlayerID] = {}
	end
	if wearables_system.selection_data[PlayerID][hero_name] == nil then
		wearables_system.selection_data[PlayerID][hero_name] = {}
	end
	wearables_system.selection_data[PlayerID][hero_name][item_slot_type] = item_id
end

function wearables_system:PreSaveItemSelectionEffectsData(PlayerID, item_id, hero_name)
	if not wearables_system.ITEMS_DATA[hero_name] then
		return
	end
	local original_item_information = wearables_system.ITEMS_DATA[hero_name][item_id]
	if original_item_information == nil then
		return
	end
	local item_slot_type = original_item_information["SlotType"]
	if wearables_system.items_applied_effects[PlayerID] == nil then
		wearables_system.items_applied_effects[PlayerID] = {}
	end
	if wearables_system.items_applied_effects[PlayerID][hero_name] == nil then
		wearables_system.items_applied_effects[PlayerID][hero_name] = {}
	end
	if not wearables_system.items_applied_effects[PlayerID][hero_name][item_slot_type] then
		wearables_system.items_applied_effects[PlayerID][hero_name][item_slot_type] = item_id
	end
end

-- Данные для магазина
function wearables_system:SendHeroItems(name)
	if not wearables_system.ITEMS_DATA[name] then
		return
	end

	local info = wearables_system.ITEMS_DATA[name]

	local hero_items_table_copy = wearables_system:CopyTable(info)

	for _, itm_info in pairs(hero_items_table_copy) do
		itm_info["RemoveDefaultItemsList"] = nil
		itm_info["Modifier"] = nil
		itm_info["ParticlesItems"] = nil
		itm_info["ParticlesHero"] = nil
		itm_info["SetItems"] = nil
		itm_info["HeroModel"] = nil
		itm_info["ArcanaAnim"] = nil
		itm_info["MaterialGroup"] = nil
	end

	CustomNetTables:SetTableValue("heroes_items_info", tostring(name), hero_items_table_copy)

	for _, info_item in pairs(info) do
		if info_item["Modifier"] ~= nil then
			LinkLuaModifier(
				info_item["Modifier"],
				"wearables_system/modifiers/" .. info_item["Modifier"],
				LUA_MODIFIER_MOTION_NONE
			)
			FireGameEvent(
				"client_modifier_linked",
				{ path = "wearables_system/modifiers/" .. info_item["Modifier"], name = info_item["Modifier"] }
			)
		end
	end
end

-- Инициализация героя при спавне
function wearables_system:InitPlayerWerable(hero)
	if hero == nil then
		return
	end
	if not hero:IsHero() then
		return
	end
	local hero_name = hero:GetUnitName()
	wearables_system:InitHeroWerables(hero_name)
	if hero.first_spawn_model then
		return
	end
	if hero:GetUnitName() == "npc_dota_hero_monkey_king" and hero:IsRealHero() then
		if wearables_system.IsMonkeyItemSpawned then
			return
		end
		wearables_system.IsMonkeyItemSpawned = true
	end
	wearables_system:InitHero(hero)
end

function wearables_system:InitHero(entity)
	local entity_index = entity:entindex()
	local entity_name = entity:GetUnitName()
	if not _G.added_shop_heroes[entity_name] then
		return
	end
	if wearables_system.INIT_ENTITY_ITEMS[entity_index] and not entity:IsIllusion() then
		if entity:GetUnitName() == "npc_dota_hero_arc_warden" then
			return
		end
		wearables_system:UpdatePlayerModel(entity)
		return
	end
	if not wearables_system.ITEMS_LIST[entity_name] then
		return
	end
	wearables_system.INIT_ENTITY_ITEMS[entity_index] = true
	local default_model = entity:GetModelName() --DEFAULT_MODELS_HEROES[entity_name]
	print("default_model", default_model)
	entity:RemoveAllDefaultItems()
	if not entity.items_list then
		entity.items_list = {}
	end
	if not entity.items_list_ids then
		entity.items_list_ids = {}
	end
	if entity:GetUnitName() == "npc_dota_hero_razor" and not entity:IsIllusion() then
		entity:SetModel("models/items/razor/razor_arcana/razor_arcana.vmdl")
		entity:SetOriginalModel("models/items/razor/razor_arcana/razor_arcana.vmdl")
	end
	Timers:CreateTimer(0, function()
		entity:ClearActivityModifiers()
		if default_model then
			entity.original_model = default_model
			entity.current_model = default_model
			entity.health_bar_offset = entity:GetBaseHealthBarOffset()
			entity.health_bar_offset_current = entity:GetBaseHealthBarOffset()
			entity.original_model_scale = entity:GetModelScale()
			entity.original_model_scale_current = entity:GetModelScale()
			entity.original_projectile_name = entity:GetRangedProjectileName()
			entity.attack_sounds = {}
			entity.new_attack_sound = nil
			wearables_system:UpdatePlayerModelStart(entity)
		end
	end)
	if entity:IsIllusion() then
		entity:AddNewModifier(entity, nil, "modifier_illusion_handler", {})
	end
	if entity:GetUnitName() == "npc_dota_hero_crystal_maiden" then
		entity:AddNewModifier(entity, nil, "modifier_crystal_maiden_death_custom", {})
	end
	entity:AddNewModifier(entity, nil, "modifier_hero_wearables_system", {})
end

function wearables_system:UpdatePlayerModelStart(entity)
	Timers:CreateTimer(0, function()
		local default_model = entity.current_model
		if default_model and default_model ~= "" then
			entity:SetModel(default_model)
			entity:SetOriginalModel(default_model)
		else
			wearables_system:InitHeroItems(entity)
			return
		end
		if entity:GetModelName() ~= default_model then
			return FrameTime()
		else
			wearables_system:InitHeroItems(entity)
		end
	end)
end

function wearables_system:InitHeroItems(entity)
	local hero_name = entity:GetUnitName()
	local player_id = entity:GetPlayerOwnerID()

	-- Копирование предметов для иллюзии с цели иллюзии
	if entity:IsIllusion() then
		player_id = entity:GetIllusionCopyData()
	end

	local original_entity = PlayerResource:GetSelectedHeroEntity(player_id)
	local update_data = false
	if entity:IsIllusion() then
		local items = {}
		if original_entity and original_entity.items_list_ids then
			for slot_name, item_id in pairs(original_entity.items_list_ids) do
				table.insert(items, tonumber(item_id))
			end
		end
		local index = 0
		Timers:CreateTimer(0, function()
			if not IsValid(entity) then
				return
			end
			local modifier_hero_wearables_system = entity:FindModifierByName("modifier_hero_wearables_system")
			index = index + 1
			if items[index] then
				wearables_system:AddItemForPlayer(entity, items[index])
				if
					modifier_hero_wearables_system
					and (modifier_hero_wearables_system.hide_state or modifier_hero_wearables_system.model_changed)
				then
					modifier_hero_wearables_system:HideItems()
				end
				return FrameTime()
			end
			if not modifier_hero_wearables_system then
				return
			end
			for _, mod in pairs(entity:FindAllModifiers()) do
				modifier_hero_wearables_system:UpdateEffectsList(mod)
			end
		end)
		return
	else
		if wearables_system.DEFAULT_ITEMS_IDS[hero_name] then
			local inited_slots = {}
			for slot_name, item_id in pairs(wearables_system.DEFAULT_ITEMS_IDS[hero_name]) do
				local player_has_item = wearables_system:GetPlayerItemInSlot(player_id, hero_name, slot_name)
				if player_has_item then
					wearables_system:AddItemForPlayer(entity, player_has_item)
				else
					wearables_system:AddItemForPlayer(entity, tonumber(item_id))
				end
				inited_slots[slot_name] = true
			end
			if wearables_system.selection_data[player_id] and wearables_system.selection_data[player_id][hero_name] then
				for slot_name, item_id in pairs(wearables_system.selection_data[player_id][hero_name]) do
					if not inited_slots[slot_name] then
						wearables_system:AddItemForPlayer(entity, tonumber(item_id))
					end
				end
			end
		end
	end

	if entity:IsRealHero() then
		local player_table = CustomNetTables:GetTableValue("sub_data", tostring(player_id))
		if player_table then
			for ability_name, v in pairs(player_table.player_items_onequip_effects[tostring(hero_name)]) do
				wearables_system:dota1x6_item_change_effects({
					item_id = v,
					current_hero = hero_name,
					PlayerID = player_id,
					ability_name = ability_name,
					remove = 0,
					setup = 1,
				})
			end
		end
	end

	if entity:IsRealHero() then
		CustomGameEventManager:Send_ServerToAllClients(
			"force_update_player_portrait",
			{ entindex = entity:entindex(), hero_name = hero_name }
		)
	end
end

function wearables_system:GetPlayerItemInSlot(player_id, hero_name, slot_name)
	if
		wearables_system.selection_data[player_id]
		and wearables_system.selection_data[player_id][hero_name]
		and wearables_system.selection_data[player_id][hero_name][slot_name]
	then
		return wearables_system.selection_data[player_id][hero_name][slot_name]
	end
	return nil
end

function wearables_system:AddItemForPlayer(
	entity,
	item_id,
	is_gem,
	is_hero_base,
	is_persona_selector,
	is_change_persona_items
)
	local entity_name = entity:GetUnitName()
	local player_id = entity:GetPlayerOwnerID()
	local item_style = "0"
	local item_id_original = item_id
	local material_group_item = nil
	local body_group_item = nil
	local is_activate_persona = false

	-- Копирование предметов для иллюзии с цели иллюзии
	if entity:IsIllusion() then
		player_id = entity:GetIllusionCopyData()
	end

	-- Перезначение предмета на дотовский айди, если айди различаются
	if
		wearables_system.ITEMS_DATA[entity_name][item_id]
		and wearables_system.ITEMS_DATA[entity_name][item_id]["dota_id"]
	then
		item_id = wearables_system.ITEMS_DATA[entity_name][item_id]["dota_id"]
	end

	local item_info = wearables_system.ITEMS_LIST[entity_name][tostring(item_id)]
	if is_gem then
		local old_item = entity.items_list["terrorblade_gem"]
		if old_item and IsValid(old_item) then
			old_item:Destroy()
		end
		entity.items_list["terrorblade_gem"] = nil
		entity.items_list_ids["terrorblade_gem"] = nil
		wearables_system:UpdateItemsRefit(entity)
		wearables_system:UpdateItemsPfx(entity, nil)
		if entity:IsRealHero() then
			CustomGameEventManager:Send_ServerToPlayer(
				entity:GetPlayerOwner(),
				"force_update_player_portrait",
				{ entindex = entity:entindex(), hero_name = entity_name }
			)
		end
		return
	end
	if is_hero_base and item_info == nil then
		item_info = { item_slot = "hero_base" }
	end
	if is_persona_selector and item_info == nil then
		item_info = { item_slot = "persona_selector" }
	end

	if item_info == nil then
		return
	end

	-- Смена стиля предмета
	if
		wearables_system.ITEMS_DATA[entity_name][item_id_original]
		and wearables_system.ITEMS_DATA[entity_name][item_id_original].ItemStyle
	then
		item_style = wearables_system.ITEMS_DATA[entity_name][item_id_original].ItemStyle
	end

	-- Смена стиля предмета если разные материалы?
	if
		wearables_system.ITEMS_DATA[entity_name][item_id_original]
		and wearables_system.ITEMS_DATA[entity_name][item_id_original].MaterialGroupItem
	then
		material_group_item = wearables_system.ITEMS_DATA[entity_name][item_id_original].MaterialGroupItem
	end

	-- Смена стиля предмета если разные боди группы?
	if
		wearables_system.ITEMS_DATA[entity_name][item_id_original]
		and wearables_system.ITEMS_DATA[entity_name][item_id_original].BodyGroup
	then
		body_group_item = {
			wearables_system.ITEMS_DATA[entity_name][item_id_original].BodyGroup,
			wearables_system.ITEMS_DATA[entity_name][item_id_original].BodyGroupStyle,
		}
	end

	local arcana_forced_weapon = wearables_system:GetArcanaForcedWeapon(entity, item_info, item_id)
	if arcana_forced_weapon then
		item_id = arcana_forced_weapon
		item_info = wearables_system.ITEMS_LIST[entity_name][tostring(item_id)]
		item_style = "0"
		material_group_item = nil
		body_group_item = nil
	end

	-- Снятие прошлого предмета и его данных у игрока
	local old_item = entity.items_list[item_info["item_slot"]]
	if old_item and IsValid(old_item) then
		local old_item_info = wearables_system.ITEMS_LIST[entity_name][tostring(old_item.item_id)]
		if old_item_info then
			if old_item.activity_list_modifiers and #old_item.activity_list_modifiers > 0 then
				for _, mod in pairs(old_item.activity_list_modifiers) do
					if mod and IsValid(mod) then
						mod:Destroy()
					end
				end
			end
			if old_item_info.visuals_list and entity:IsRealHero() then
				wearables_system:UnSetupVisualsList(entity, old_item_info.visuals_list, "default")
				wearables_system:UnSetupVisualsList(entity, old_item_info.visuals_list, old_item.style)
			end
			if old_item_info.item_hero_model then
				if not entity.items_list["persona_selector"] or item_info["item_slot"] == "persona_selector" then
					entity.current_model = entity.original_model
					wearables_system:UpdatePlayerModel(entity)
				end
			end
			if old_item_info.model_scale then
				entity.original_model_scale_current = entity.original_model_scale
				entity:SetModelScale(entity.original_model_scale_current)
			end
			if old_item_info.attack_sound then
				for i = #entity.attack_sounds, 1, -1 do
					if entity.attack_sounds[i] == old_item_info.attack_sound then
						table.remove(entity.attack_sounds, i)
						break
					end
				end
				if #entity.attack_sounds > 0 then
					entity.new_attack_sound = entity.attack_sounds[#entity.attack_sounds]
				else
					entity.new_attack_sound = nil
				end
			end
			if old_item_info.health_bar then
				entity.health_bar_offset_current = entity.health_bar_offset
				entity:SetHealthBarOffsetOverride(entity.health_bar_offset_current)
			end
		end
		if WEARABLES_ITEM_MODEL[tostring(old_item.item_id_original)] then
			entity:SetMaterialGroup("0")
			Timers:CreateTimer(FrameTime(), function()
				entity:SetMaterialGroup("default")
				if entity:GetModelName() == "models/items/pudge/arcana/pudge_arcana_base.vmdl" then
					entity:SetMaterialGroup("1")
				end
			end)
		end
		if WEARABLES_ITEM_BODY_GROUPS[tostring(old_item.item_id_original)] then
			entity:SetBodygroupByName(
				WEARABLES_ITEM_BODY_GROUPS[tostring(old_item.item_id_original)][1],
				WEARABLES_ITEM_BODY_GROUPS[tostring(old_item.item_id_original)][2] == 1 and 0 or 1
			)
		end
		if old_item.additional_models and #old_item.additional_models > 0 then
			for _, model in pairs(old_item.additional_models) do
				model:Destroy()
			end
		end
		if old_item.modifier_save then
			old_item.modifier_save:Destroy()
		end
		old_item:Destroy()
	end

	local item_wearable = nil
	local allow_create_item = true

	if entity.items_list_ids["persona_selector"] then
		if not string.find(item_info["item_slot"], "persona") then
			allow_create_item = false
		end
	else
		if string.find(item_info["item_slot"], "persona") and item_info["item_slot"] ~= "persona_selector" then
			allow_create_item = false
		end
	end

	-- Установка нового предмета
	if not is_hero_base and not is_persona_selector and allow_create_item then
		item_wearable = wearables_system:CreateWearable(entity, item_info["item_model"])
		if item_wearable and entity.items_list then
			item_wearable.activity_list_modifiers = {}
			item_wearable.item_id = item_id
			item_wearable.item_id_original = tostring(item_id_original)
			item_wearable.style = item_style
			item_wearable.slot_type = item_info["item_slot"]
			item_wearable.additional_models = {}
			entity.items_list[item_info["item_slot"]] = item_wearable
			entity.items_list_ids[item_info["item_slot"]] = tostring(item_id_original)
			if item_info["item_slot"] == "persona_selector" then
				is_activate_persona = true
			end

			if item_info["Modifier"] then
				item_wearable.modifier_save = entity:AddNewModifier(entity, nil, item_info["Modifier"], {})
			end

			if material_group_item then
				item_wearable:SetMaterialGroup(material_group_item)
			end

			if body_group_item then
				item_wearable:SetBodygroupByName(body_group_item[1], body_group_item[2])
			end

			if item_info["activity_list"] then
				for _, activity in pairs(item_info["activity_list"]) do
					if type(activity) == "table" then
						if _ == "default" or _ == tostring(item_style) then
							for __, activity_name in pairs(activity) do
								local modifier_activity = entity:AddNewModifier(
									entity,
									nil,
									"modifier_activity_animation_custom",
									{ activity = activity_name }
								)
								if modifier_activity then
									table.insert(item_wearable.activity_list_modifiers, modifier_activity)
								end
							end
						end
					else
						local modifier_activity = entity:AddNewModifier(
							entity,
							nil,
							"modifier_activity_animation_custom",
							{ activity = activity }
						)
						if modifier_activity then
							table.insert(item_wearable.activity_list_modifiers, modifier_activity)
						end
					end
				end
			end
			if item_info.visuals_list and entity:IsRealHero() then
				wearables_system:SetupVisualsList(entity, item_info.visuals_list, "default")
				wearables_system:SetupVisualsList(entity, item_info.visuals_list, item_style)
			end
			if item_info.item_hero_model then
				entity.current_model = item_info.item_hero_model
				wearables_system:UpdatePlayerModel(entity)
			end
			if item_info.model_scale then
				entity.original_model_scale_current = item_info.model_scale
				entity:SetModelScale(entity.original_model_scale_current)
				if not IsInToolsMode() then
					Timers:CreateTimer(1, function()
						entity:SetModelScale(entity.original_model_scale_current)
					end)
				end
			end
			if item_info.attack_sound then
				table.insert(entity.attack_sounds, item_info.attack_sound)
				entity.new_attack_sound = item_info.attack_sound
			end
			if item_info.health_bar then
				entity.health_bar_offset_current = item_info.health_bar
				entity:SetHealthBarOffsetOverride(entity.health_bar_offset_current)
			end
			item_wearable.particle_timer = Timers:CreateTimer(0.1, function()
				if IsValid(item_wearable) and item_info.visuals_list and item_info.visuals_list.particles_list then
					if item_wearable.particle_timer == nil then
						return
					end
					wearables_system:SetupParticles(
						entity,
						item_wearable,
						item_info.visuals_list.particles_list,
						item_info.visuals_list,
						item_info,
						"default"
					)
					wearables_system:SetupParticles(
						entity,
						item_wearable,
						item_info.visuals_list.particles_list,
						item_info.visuals_list,
						item_info,
						item_style
					)
					item_wearable.particle_timer = nil
				end
			end)
			if WEARABLES_ITEM_MODEL[tostring(item_id_original)] then
				Timers:CreateTimer(0.06, function()
					entity:SetMaterialGroup(WEARABLES_ITEM_MODEL[tostring(item_id_original)])
				end)
			end
			if WEARABLES_ITEM_BODY_GROUPS[tostring(item_id_original)] then
				entity:SetBodygroupByName(
					WEARABLES_ITEM_BODY_GROUPS[tostring(item_id_original)][1],
					WEARABLES_ITEM_BODY_GROUPS[tostring(item_id_original)][2]
				)
			end
			if item_info["additional_wearable"] then
				local additional_data = item_info["additional_wearable"]["default"]
				if item_info["additional_wearable"][tostring(item_style)] then
					additional_data = item_info["additional_wearable"][tostring(item_style)]
				end
				if additional_data then
					local item_wearable_add = wearables_system:CreateWearable(entity, additional_data["item_model"])
					if item_wearable_add then
						table.insert(item_wearable.additional_models, item_wearable_add)
						if additional_data["particle"] then
							local particle = ParticleManager:CreateParticle(
								additional_data["particle"],
								PATTACH_ABSORIGIN_FOLLOW,
								item_wearable_add
							)
							local modifier_donate_hero_illusion_item =
								item_wearable_add:FindModifierByName("modifier_donate_hero_illusion_item")
							if modifier_donate_hero_illusion_item then
								modifier_donate_hero_illusion_item.pfx_list = modifier_donate_hero_illusion_item.pfx_list
									or {}
								table.insert(modifier_donate_hero_illusion_item.pfx_list, particle)
								modifier_donate_hero_illusion_item:AddParticle(particle, true, false, -1, false, false)
							end
						end
						if additional_data["material_group"] then
							item_wearable_add:SetMaterialGroup(additional_data["material_group"])
						end
					end
				end
			end
		end
	else
		if is_persona_selector then
			entity.items_list["persona_selector"] = nil
			entity.items_list_ids["persona_selector"] = nil
		elseif is_hero_base then
			entity.items_list["hero_base"] = nil
			entity.items_list_ids["hero_base"] = nil
		elseif not allow_create_item then
			item_wearable = wearables_system:CreateWearable(entity, nil)
			item_wearable.hidden_item = true
			item_wearable.activity_list_modifiers = {}
			item_wearable.item_id = item_id
			item_wearable.item_id_original = tostring(item_id_original)
			item_wearable.style = item_style
			item_wearable.slot_type = item_info["item_slot"]
			item_wearable.additional_models = {}
			entity.items_list[item_info["item_slot"]] = item_wearable
		end
	end
	if entity:IsRealHero() then
		CustomNetTables:SetTableValue("local_items", entity:GetUnitName(), { item_list = entity.items_list_ids })
		wearables_system:UpdateClientData(player_id, entity)
	end
	wearables_system:UpdateItemsRefit(entity)
	wearables_system:UpdateItemsPfx(entity, item_wearable)
	if entity:IsRealHero() then
		CustomGameEventManager:Send_ServerToPlayer(
			entity:GetPlayerOwner(),
			"force_update_player_portrait",
			{ entindex = entity:entindex(), hero_name = entity:GetUnitName() }
		)
	end
	entity:SetRangedProjectileName(wearables_system:GetParticleReplacement(entity, entity.original_projectile_name))

	if not is_change_persona_items and (is_activate_persona or item_info["item_slot"] == "persona_selector") then
		for slot_checker, item_wearable_data in pairs(entity.items_list) do
			if slot_checker ~= "persona_selector" then
				wearables_system:AddItemForPlayer(
					entity,
					tonumber(item_wearable_data.item_id_original),
					nil,
					nil,
					nil,
					true
				)
			end
		end
	end

	if item_info["item_slot"] == "hero_base" and ARCANA_FORCED_WEAPON[entity_name] then
		local weapon = entity.items_list["weapon"]
		if weapon and IsValid(weapon) and weapon.item_id_original then
			wearables_system:AddItemForPlayer(entity, tonumber(weapon.item_id_original))
		end
	end

	return true
end

function wearables_system:UnSetupVisualsList(entity, visual_list, style)
	local entity_name = entity:GetUnitName()
	for visual_name, visual_data in pairs(visual_list) do
		if visual_data[style] then
			for asset, modifier in pairs(visual_data[style]) do
				if visual_name == "ability_icons" then
					wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset] = wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset]
						or {}
					wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset] = table.pop_back_item(
						wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset],
						modifier
					)
					wearables_system.ReplacementInfo[entity_name].ability_icons[asset] = wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset][#wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset]]
						or nil
					FireGameEvent("event_change_ability_icon", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						modifier = wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset][#wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset]]
							or nil,
					})
				elseif visual_name == "particles_abilities" then
					wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset] = wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset]
						or {}
					wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset] = table.pop_back_item(
						wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset],
						modifier
					)
					wearables_system.ReplacementInfo[entity_name].particle_replace[asset] = wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset][#wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset]]
						or nil
					FireGameEvent("event_change_ability_pfx", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						modifier = wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset][#wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset]]
							or nil,
					})
				elseif visual_name == "sound_replace" then
					wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset] = wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset]
						or {}
					wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset] = table.pop_back_item(
						wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset],
						modifier
					)
					wearables_system.ReplacementInfo[entity_name].sound_replace[asset] = wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset][#wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset]]
						or nil
				elseif visual_name == "models" then
					wearables_system.ReplacementInfoAllList[entity_name].models[asset] = wearables_system.ReplacementInfoAllList[entity_name].models[asset]
						or {}
					wearables_system.ReplacementInfoAllList[entity_name].models[asset] = table.pop_back_item(
						wearables_system.ReplacementInfoAllList[entity_name].models[asset],
						modifier
					)
					wearables_system.ReplacementInfo[entity_name].models[asset] = wearables_system.ReplacementInfoAllList[entity_name].models[asset][#wearables_system.ReplacementInfoAllList[entity_name].models[asset]]
						or nil
				elseif visual_name == "models_refit" then
					wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset] = wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset]
						or {}
					wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset] = table.pop_back_item(
						wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset],
						modifier
					)
					wearables_system.ReplacementInfo[entity_name].models_refits[asset] = wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset][#wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset]]
						or nil
				end
			end
		end
	end
end

function wearables_system:SetupVisualsList(entity, visual_list, style)
	local entity_name = entity:GetUnitName()
	for visual_name, visual_data in pairs(visual_list) do
		if visual_data[style] then
			for asset, modifier in pairs(visual_data[style]) do
				if visual_name == "ability_icons" then
					wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset] = wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset]
						or {}
					table.insert(wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset], modifier)
					wearables_system.ReplacementInfo[entity_name].ability_icons[asset] =
						wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset][#wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset]]
					FireGameEvent("event_change_ability_icon", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						modifier = wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset][#wearables_system.ReplacementInfoAllList[entity_name].ability_icons[asset]],
					})
				elseif visual_name == "particles_abilities" then
					wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset] = wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset]
						or {}
					table.insert(wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset], modifier)
					wearables_system.ReplacementInfo[entity_name].particle_replace[asset] =
						wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset][#wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset]]
					FireGameEvent("event_change_ability_pfx", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						modifier = wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset][#wearables_system.ReplacementInfoAllList[entity_name].particle_replace[asset]],
					})
				elseif visual_name == "sound_replace" then
					wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset] = wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset]
						or {}
					table.insert(wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset], modifier)
					wearables_system.ReplacementInfo[entity_name].sound_replace[asset] =
						wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset][#wearables_system.ReplacementInfoAllList[entity_name].sound_replace[asset]]
				elseif visual_name == "models" then
					wearables_system.ReplacementInfoAllList[entity_name].models[asset] = wearables_system.ReplacementInfoAllList[entity_name].models[asset]
						or {}
					table.insert(wearables_system.ReplacementInfoAllList[entity_name].models[asset], modifier)
					wearables_system.ReplacementInfo[entity_name].models[asset] =
						wearables_system.ReplacementInfoAllList[entity_name].models[asset][#wearables_system.ReplacementInfoAllList[entity_name].models[asset]]
				elseif visual_name == "models_refit" then
					wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset] = wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset]
						or {}
					table.insert(wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset], modifier)
					wearables_system.ReplacementInfo[entity_name].models_refits[asset] =
						wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset][#wearables_system.ReplacementInfoAllList[entity_name].models_refits[asset]]
				end
			end
		end
	end
end

function wearables_system:SetupParticles(
	entity,
	item_wearable,
	particles_list,
	visual_list,
	item_info,
	style,
	reconnect_owner
)
	local entity_name = entity:GetUnitName()
	if IsValid(item_wearable) and visual_list and particles_list then
		if particles_list[style] then
			for _, pfx_name_original in pairs(particles_list[style]) do
				local particle_another_data = wearables_system.ITEMS_LIST_PFX[entity_name][pfx_name_original]
				local pfx_name = wearables_system:GetParticleReplacement(entity, pfx_name_original)
				if
					pfx_name == "particles/econ/items/wraith_king/wraith_king_arcana/wk_arc_style_ambient.vpcf"
					or pfx_name == "particles/econ/items/wraith_king/wraith_king_arcana/wk_arc_ambient.vpcf"
				then
					particle_another_data = nil
				end
				if particle_another_data then
					local default_attachment = PATTACH_ABSORIGIN_FOLLOW
					local target_attachment = item_wearable
					local parent_pfx = item_wearable
					if
						string.find(item_info["item_slot"], "ambient_effects")
						and (
							entity:GetUnitName() ~= "npc_dota_hero_morphling"
							and entity:GetUnitName() ~= "npc_dota_hero_enigma"
						)
					then
						parent_pfx = entity
					end
					if particle_another_data.attach_entity == "parent" then
						target_attachment = entity
					end
					if particle_another_data.mega_attach == "parent" then
						parent_pfx = entity
					end
					if particle_another_data.attach_type == "customorigin_follow" then
						default_attachment = PATTACH_CUSTOMORIGIN_FOLLOW
					end
					if particle_another_data.attach_type == "customorigin" then
						default_attachment = PATTACH_CUSTOMORIGIN
					end
					local particle
					if reconnect_owner then
						particle = ParticleManager:CreateParticleForPlayer(
							pfx_name,
							default_attachment,
							parent_pfx,
							PlayerResource:GetPlayer(reconnect_owner)
						)
					else
						particle = ParticleManager:CreateParticle(pfx_name, default_attachment, parent_pfx)
					end
					if particle_another_data.control_points and #particle_another_data.control_points > 0 then
						for att_id, attach_data in pairs(particle_another_data.control_points) do
							local default_attachment_ent = PATTACH_ABSORIGIN_FOLLOW
							if particle_another_data.attach_type == "point_follow" then
								default_attachment = PATTACH_POINT_FOLLOW
							end
							ParticleManager:SetParticleControlEnt(
								particle,
								tonumber(attach_data.control_point_index),
								target_attachment,
								PATTACH_POINT_FOLLOW,
								attach_data.attachment,
								target_attachment:GetAbsOrigin(),
								false
							)
						end
					end
					if item_wearable.item_id_original == "14966" then
						ParticleManager:SetParticleControl(particle, 1, Vector(1, 1, 0))
					end
					if item_wearable.item_id_original == "4560" then
						ParticleManager:SetParticleControl(particle, 26, Vector(40, 0, 0))
					end
					if item_wearable.item_id_original == "4561" then
						ParticleManager:SetParticleControl(particle, 26, Vector(100, 0, 0))
					end
					if item_wearable.item_id_original == "14296" then
						ParticleManager:SetParticleControl(particle, 1, Vector(14, 123, 239))
					end
					if item_wearable.item_id_original == "7818" then
						ParticleManager:SetParticleControl(particle, 1, Vector(14, 123, 239))
					end
					if entity:GetUnitName() == "npc_dota_hero_terrorblade" then
						local terrorblade_color = entity:GetTerrorbladeColor()
						if terrorblade_color then
							ParticleManager:SetParticleControl(particle, 16, Vector(1, 1, 1))
							ParticleManager:SetParticleControl(particle, 15, terrorblade_color)
						end
					end
					local modifier_donate_hero_illusion_item =
						item_wearable:FindModifierByName("modifier_donate_hero_illusion_item")
					if modifier_donate_hero_illusion_item then
						modifier_donate_hero_illusion_item.pfx_list = modifier_donate_hero_illusion_item.pfx_list or {}
						table.insert(modifier_donate_hero_illusion_item.pfx_list, particle)
						modifier_donate_hero_illusion_item:AddParticle(particle, true, false, -1, false, false)
					end
				else
					local target_attachment = item_wearable
					if item_info["item_model"] == "" or item_info["item_model"] == " " then
						target_attachment = entity
					end
					local particle
					if reconnect_owner then
						particle = ParticleManager:CreateParticleForPlayer(
							pfx_name,
							PATTACH_INVALID,
							target_attachment,
							PlayerResource:GetPlayer(reconnect_owner)
						)
					else
						particle = ParticleManager:CreateParticle(pfx_name, PATTACH_INVALID, target_attachment)
					end
					if item_wearable.item_id_original == "4560" then
						ParticleManager:SetParticleControl(particle, 26, Vector(40, 0, 0))
					end
					if item_wearable.item_id_original == "4561" then
						ParticleManager:SetParticleControl(particle, 26, Vector(100, 0, 0))
					end
					if item_wearable.item_id_original == "13546" then
						ParticleManager:SetParticleControlEnt(
							particle,
							2,
							entity,
							PATTACH_POINT_FOLLOW,
							"attach_attack1",
							entity:GetAbsOrigin(),
							false
						)
						ParticleManager:SetParticleControlEnt(
							particle,
							3,
							entity,
							PATTACH_POINT_FOLLOW,
							"attach_attack1",
							entity:GetAbsOrigin(),
							false
						)
					end
					if item_wearable.item_id_original == "14296" then
						ParticleManager:SetParticleControl(particle, 1, Vector(14, 123, 239))
					end
					if item_wearable.item_id_original == "7818" then
						ParticleManager:SetParticleControl(particle, 1, Vector(14, 123, 239))
					end
					if entity:GetUnitName() == "npc_dota_hero_terrorblade" then
						local terrorblade_color = entity:GetTerrorbladeColor()
						if terrorblade_color then
							ParticleManager:SetParticleControl(particle, 16, Vector(1, 1, 1))
							ParticleManager:SetParticleControl(particle, 15, terrorblade_color)
						end
					end
					local modifier_donate_hero_illusion_item =
						item_wearable:FindModifierByName("modifier_donate_hero_illusion_item")
					if modifier_donate_hero_illusion_item then
						modifier_donate_hero_illusion_item.pfx_list = modifier_donate_hero_illusion_item.pfx_list or {}
						table.insert(modifier_donate_hero_illusion_item.pfx_list, particle)
						modifier_donate_hero_illusion_item:AddParticle(particle, true, false, -1, false, false)
					end
				end
			end
		end
	end
end

function wearables_system:UpdateItemsPfx(entity, locked_wearable)
	local all_items = entity:GetPlayerWearables()
	local entity_name = entity:GetUnitName()
	for _, item_handle in pairs(all_items) do
		local accept_change = true
		if locked_wearable and item_handle == locked_wearable then
			accept_change = false
		end
		if item_handle.hidden_item then
			accept_change = false
		end
		if accept_change then
			local modifier_donate_hero_illusion_item =
				item_handle:FindModifierByName("modifier_donate_hero_illusion_item")
			if modifier_donate_hero_illusion_item then
				if modifier_donate_hero_illusion_item.pfx_list then
					for _, pfx in pairs(modifier_donate_hero_illusion_item.pfx_list) do
						ParticleManager:DestroyParticle(pfx, true)
						ParticleManager:ReleaseParticleIndex(pfx)
					end
				end
			end
			if item_handle.particle_timer then
				Timers:RemoveTimer(item_handle.particle_timer)
				item_handle.particle_timer = nil
			end
			local item_info = wearables_system.ITEMS_LIST[entity_name][tostring(item_handle.item_id)]
			item_handle.particle_timer = Timers:CreateTimer(0.1, function()
				if IsValid(item_handle) and item_info.visuals_list and item_info.visuals_list.particles_list then
					if item_handle.particle_timer == nil then
						return
					end
					wearables_system:SetupParticles(
						entity,
						item_handle,
						item_info.visuals_list.particles_list,
						item_info.visuals_list,
						item_info,
						"default"
					)
					wearables_system:SetupParticles(
						entity,
						item_handle,
						item_info.visuals_list.particles_list,
						item_info.visuals_list,
						item_info,
						item_handle.style
					)
					item_handle.particle_timer = nil
				end
			end)
		end
	end
end

function wearables_system:UpdateItemsRefit(entity)
	local all_items = entity:GetPlayerWearables()
	for _, item_handle in pairs(all_items) do
		if not item_handle.hidden_item then
			local new_model = wearables_system:GetModelRefitsReplacement(entity, item_handle.original_model)
			if new_model ~= item_handle:GetModelName() then
				item_handle:SetOriginalModel(new_model)
				item_handle:SetModel(new_model)
			end
			if entity:GetUnitName() == "npc_dota_hero_night_stalker" then
				if entity:HasUnequipItem(13776) then
					item_handle:SetMaterialGroup("ns_ti10_immortal_arms")
					if entity:HasUnequipItem(337111112) then
						item_handle:SetMaterialGroup("ns_ti10_immortal_arms_night")
					end
				end
				if entity:HasUnequipItem(13813) then
					item_handle:SetMaterialGroup("ns_ti10_immortal_arms_gold")
					if entity:HasUnequipItem(337111112) then
						item_handle:SetMaterialGroup("ns_ti10_immortal_arms_gold_night")
					end
				end
				if entity:HasUnequipItem(32606) then
					item_handle:SetMaterialGroup("ns_ti10_immortal_arms_crimson")
					if entity:HasUnequipItem(337111112) then
						item_handle:SetMaterialGroup("ns_ti10_immortal_arms_crimson_night")
					end
				end
			end
			if entity:GetUnitName() == "npc_dota_hero_monkey_king" then
				if entity:HasUnequipItem(905001) then
					item_handle:SetBodygroupByName("arcana", 1)
				elseif entity:HasUnequipItem(905002) then
					item_handle:SetBodygroupByName("arcana", 2)
				elseif entity:HasUnequipItem(905003) then
					item_handle:SetBodygroupByName("arcana", 3)
				elseif entity:HasUnequipItem(905004) then
					item_handle:SetBodygroupByName("arcana", 4)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end
			if entity:GetUnitName() == "npc_dota_hero_juggernaut" then
				if entity:HasUnequipItem(2068) then
					item_handle:SetBodygroupByName("arcana", 2)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end
			if
				entity:GetUnitName() == "npc_dota_hero_ogre_magi"
				and (
					item_handle:GetModelName() == "models/items/ogre_magi/ogre_arcana/ogre_magi_arcana_head.vmdl"
					or item_handle:GetModelName()
						== "models/items/ogre_magi/ogre_cosmic/ogre_cosmic_head_arcana_refit.vmdl"
				)
			then
				if entity:HasUnequipItem(136701) then
					item_handle:SetBodygroupByName("arcana", 2)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end
			if
				entity:GetUnitName() == "npc_dota_hero_queenofpain"
				and (
					item_handle:GetModelName()
						== "models/items/queenofpain/queenofpain_arcana/queenofpain_arcana_head.vmdl"
					or item_handle:GetModelName() == "models/items/queenofpain/queenofpain_arcana/queenofpain_arcana_armor.vmdl"
					or item_handle:GetModelName() == "models/items/queenofpain/queenofpain_arcana/queenofpain_arcana_dagger.vmdl"
					or item_handle:GetModelName()
						== "models/items/queenofpain/queenofpain_arcana/queenofpain_arcana_armor_legacy.vmdl"
				)
			then
				if entity:HasUnequipItem(1293001) then
					item_handle:SetMaterialGroup("1")
				else
					item_handle:SetMaterialGroup("0")
					item_handle:SetMaterialGroup("default")
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_pudge"
				and (
					item_handle:GetModelName() == "models/items/pudge/arcana/pudge_arcana_back.vmdl"
					or item_handle:GetModelName()
						== "models/items/pudge/aberrant_observer_arcana/aberrant_observer_arcana_back.vmdl"
				)
			then
				if entity:HasUnequipItem(77561) then
					item_handle:SetBodygroupByName("arcana", 2)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_hoodwink"
				and (
					item_handle:GetModelName()
						== "models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon.vmdl"
					or item_handle:GetModelName()
						== "models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon_blossom.vmdl"
				)
			then
				if entity:HasUnequipItem(236271) then
					item_handle:SetModel(
						"models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon_blossom.vmdl"
					)
					item_handle:SetOriginalModel(
						"models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon_blossom.vmdl"
					)
				else
					item_handle:SetModel(
						"models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon.vmdl"
					)
					item_handle:SetOriginalModel(
						"models/items/hoodwink/hood_2022_immortal_weapon/hood_2022_immortal_weapon.vmdl"
					)
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_terrorblade"
				and (
					item_handle:GetModelName() == "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon.vmdl"
					or item_handle:GetModelName() == "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_manta.vmdl"
					or item_handle:GetModelName()
						== "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_skadi.vmdl"
				)
			then
				local dreadhunt_weapon_model = "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon.vmdl"
				if entity:HasUnequipItem(314121) then
					dreadhunt_weapon_model = "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_manta.vmdl"
				elseif entity:HasUnequipItem(314122) then
					dreadhunt_weapon_model = "models/items/terrorblade/dreadhunt_weapon/dreadhunt_weapon_skadi.vmdl"
				end
				item_handle:SetModel(dreadhunt_weapon_model)
				item_handle:SetOriginalModel(dreadhunt_weapon_model)
			end

			if
				entity:GetUnitName() == "npc_dota_hero_centaur"
				and (
					item_handle:GetModelName()
						== "models/items/centaur/centaur_crownfall_belt/centaur_crownfall_belt_style1.vmdl"
					or item_handle:GetModelName()
						== "models/items/centaur/centaur_crownfall_belt/centaur_crownfall_belt_style2.vmdl"
				)
			then
				if entity:HasUnequipItem(29668) then
					item_handle:SetModel(
						"models/items/centaur/centaur_crownfall_belt/centaur_crownfall_belt_style2.vmdl"
					)
					item_handle:SetOriginalModel(
						"models/items/centaur/centaur_crownfall_belt/centaur_crownfall_belt_style2.vmdl"
					)
				else
					item_handle:SetModel(
						"models/items/centaur/centaur_crownfall_belt/centaur_crownfall_belt_style1.vmdl"
					)
					item_handle:SetOriginalModel(
						"models/items/centaur/centaur_crownfall_belt/centaur_crownfall_belt_style1.vmdl"
					)
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_drow_ranger"
				and (
					item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_back.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_head.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_arms.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_legs.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_quiver.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_shoulder.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_monster_arcana/drow_monster_arcana_back.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_monster_arcana/drow_monster_arcana_head.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_monster_arcana/drow_monster_arcana_arms.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_monster_arcana/drow_monster_arcana_legs.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_monster_arcana/drow_monster_arcana_quiver.vmdl"
					or item_handle:GetModelName() == "models/items/drow/drow_monster_arcana/drow_monster_arcana_shoulder.vmdl"
					or item_handle:GetModelName()
						== "models/items/drow/drow_monster_arcana/drow_monster_arcana_weapon.vmdl"
				)
			then
				if entity:HasUnequipItem(190901) then
					item_handle:SetBodygroupByName("arcana", 2)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_drow_ranger"
				and item_handle:GetModelName() == "models/items/drow/drow_arcana/drow_arcana_weapon.vmdl"
			then
				if entity:HasUnequipItem(190901) then
					item_handle:SetMaterialGroup("1")
				else
					item_handle:SetMaterialGroup("default")
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_razor"
				and (
					item_handle:GetModelName() == "models/items/razor/razor_arcana/razor_arcana_head.vmdl"
					or item_handle:GetModelName() == "models/items/razor/razor_arcana/razor_arcana_arms.vmdl"
					or item_handle:GetModelName() == "models/items/razor/razor_arcana/razor_arcana_belt.vmdl"
					or item_handle:GetModelName() == "models/items/razor/razor_arcana/razor_arcana_armor.vmdl"
				)
			then
				if entity:HasUnequipItem(2309599) then
					item_handle:SetBodygroupByName("arcana", 2)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end

			if
				entity:GetUnitName() == "npc_dota_hero_skywrath_mage"
				and (
					item_handle:GetModelName()
						== "models/items/skywrath_mage/skywrath_arcana/skywrath_mage_arcana_weapon.vmdl"
					or item_handle:GetModelName() == "models/items/skywrath_mage/skywrath_arcana/skywrath_mage_arcana_belt_refit.vmdl"
					or item_handle:GetModelName() == "models/items/skywrath_mage/skywrath_arcana/skywrath_mage_arcana_shoulder.vmdl"
					or item_handle:GetModelName() == "models/items/skywrath_mage/skywrath_arcana/skywrath_mage_arcana_arms.vmdl"
					or item_handle:GetModelName()
						== "models/items/skywrath_mage/skywrath_arcana/skywrath_mage_arcana_head.vmdl"
				)
			then
				if entity:HasUnequipItem(185391) then
					item_handle:SetBodygroupByName("arcana", 2)
				else
					item_handle:SetBodygroupByName("arcana", 0)
				end
			end
		end
	end
	Timers:CreateTimer(0.06, function()
		if entity:GetUnitName() == "npc_dota_hero_ogre_magi" then
			if
				entity:HasUnequipItem(31207)
				and entity:GetModelName() == "models/items/ogre_magi/ogre_arcana/ogre_magi_arcana.vmdl"
			then
				entity:SetBodygroupByName("mount", 1)
				entity:SetBodygroupByName("heads", 1)
			else
				if entity:HasUnequipItem(31207) then
					entity:SetBodygroupByName("heads", 1)
				end
				entity:SetBodygroupByName("mount", 0)
			end
		end
	end)
end

function wearables_system:CreateWearable(hero, item_model)
	if item_model == "" or item_model == nil then
		item_model = "models/development/invisiblebox.vmdl"
	end
	local item_wearable =
		CreateUnitByName("npc_dota_donate_item_illusion", hero:GetAbsOrigin(), false, nil, nil, hero:GetTeamNumber())
	item_wearable:AddNewModifier(hero, nil, "modifier_donate_hero_illusion_item", {})
	item_wearable:SetModel(item_model)
	item_wearable:SetOriginalModel(item_model)
	item_wearable.original_model = item_model
	item_wearable:SetTeam(hero:GetTeamNumber())
	item_wearable:SetOwner(hero)
	item_wearable:FollowEntity(hero, true)
	if hero:IsIllusion() then
		item_wearable:AddNewModifier(item_wearable, nil, "modifier_illusion_custom", {})
	end
	return item_wearable
end

function wearables_system:CreateMorphTeamItem(hero, item_model)
	local item_model_entity = wearables_system:CreateWearable(hero, item_model)
	if item_model == "models/heroes/huskar/huskar_spear.vmdl" then
		item_model_entity:SetBodygroupByName("spear", 1)
	end
	return item_model_entity
end

function wearables_system:UpdatePlayerModel(entity)
	Timers:CreateTimer(0, function()
		local default_model = entity.current_model
		entity:SetModel(entity.current_model)
		entity:SetOriginalModel(entity.current_model)
		entity:ManageModelChanges()
		if entity:GetModelName() ~= entity.current_model then
			return FrameTime()
		end
		if IsValid(dota1x6.event_thinker_mod) then
			dota1x6.event_thinker_mod:OnModelChanged({ attacker = entity })
		end
	end)
end

-- Вызов функции на снятие или надевания предмета на героев
function wearables_system:dota1x6_item_change(data)
	if data.PlayerID == nil then
		return
	end
	local item_id = data.item_id
	local current_hero = data.current_hero
	local remove = data.remove
	local player_id = data.PlayerID
	if not wearables_system.ITEMS_DATA[current_hero] then
		return
	end
	if remove == 1 then
		wearables_system:RemoveDonateItemToHero(current_hero, player_id, item_id)
	else
		if not wearables_system:HasItemAccess(player_id, current_hero, item_id) then
			return
		end
		wearables_system:AddedDonateItemToHero(current_hero, player_id, item_id)
		shop:UnmarkItemNew(player_id, item_id)
	end
end

--- Функция добавления предмета игроку ( Из ивента )
function wearables_system:AddedDonateItemToHero(hero_name, PlayerID, item_id)
	local player = PlayerResource:GetPlayer(PlayerID)
	if player == nil then
		return
	end
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(PlayerID))
	if player_table == nil then
		return
	end
	local hero = PlayerResource:GetSelectedHeroEntity(PlayerID)
	local original_item_information = wearables_system.ITEMS_DATA[hero_name][item_id]
	if original_item_information == nil then
		return
	end
	local item_slot_type = original_item_information["SlotType"]

	if hero_select:GetState() ~= "PICK_STATE_PICK_END" or PlayerCount <= 1 then
		if wearables_system.selection_data[PlayerID] == nil then
			wearables_system.selection_data[PlayerID] = {}
		end
		if wearables_system.selection_data[PlayerID][hero_name] == nil then
			wearables_system.selection_data[PlayerID][hero_name] = {}
		end
		if
			wearables_system.selection_data[PlayerID][hero_name]
			and wearables_system.selection_data[PlayerID][hero_name][item_slot_type] ~= nil
		then
			local old_id = wearables_system.selection_data[PlayerID][hero_name][item_slot_type]
			wearables_system:RemoveDonateItemToHero(hero_name, PlayerID, old_id)
		end
		player_table = CustomNetTables:GetTableValue("sub_data", tostring(PlayerID))
		local player_items_table = {}
		for k, v in pairs(player_table.player_items_onequip[tostring(hero_name)]) do
			table.insert(player_items_table, v)
		end
		table.insert(player_items_table, item_id)
		player_table.player_items_onequip[tostring(hero_name)] = player_items_table
		CustomNetTables:SetTableValue("sub_data", tostring(PlayerID), player_table)
		wearables_system.selection_data[PlayerID][hero_name][item_slot_type] = item_id
		if hero_select:GetState() ~= "PICK_STATE_PICK_END" then
			return
		end
	end

	if hero == nil then
		return
	end
	-- Если текущий герой == выбранному меняем слоты в игре
	if hero_name == hero:GetUnitName() then
		wearables_system:AddItemForPlayer(hero, item_id)
	end
end

-- Функция удаления предмета игроку ( Из ивента )
function wearables_system:RemoveDonateItemToHero(hero_name, PlayerID, item_id)
	local player = PlayerResource:GetPlayer(PlayerID)
	if player == nil then
		return
	end
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(PlayerID))
	if player_table == nil then
		return
	end
	local hero = PlayerResource:GetSelectedHeroEntity(PlayerID)
	local original_item_information = wearables_system.ITEMS_DATA[hero_name][item_id]
	if original_item_information == nil then
		return
	end
	local item_slot_type = original_item_information["SlotType"]
	if hero_select:GetState() ~= "PICK_STATE_PICK_END" or PlayerCount <= 1 then
		if wearables_system.selection_data[PlayerID] == nil then
			wearables_system.selection_data[PlayerID] = {}
		end
		if wearables_system.selection_data[PlayerID][hero_name] == nil then
			wearables_system.selection_data[PlayerID][hero_name] = {}
		end
		if wearables_system.selection_data[PlayerID][hero_name][item_slot_type] ~= nil then
			wearables_system.selection_data[PlayerID][hero_name][item_slot_type] = nil
		end
		local player_items_table = {}
		for k, v in pairs(player_table.player_items_onequip[tostring(hero_name)]) do
			table.insert(player_items_table, v)
		end
		wearables_system.remove_item(player_items_table, item_id)
		player_table.player_items_onequip[tostring(hero_name)] = player_items_table
		CustomNetTables:SetTableValue("sub_data", tostring(PlayerID), player_table)
		if hero_select:GetState() ~= "PICK_STATE_PICK_END" then
			return
		end
	end

	if hero == nil then
		return
	end

	-- Если текущий герой, это тот на которого надеваем слоты
	if hero_name == hero:GetUnitName() then
		wearables_system:AddItemForPlayer(
			hero,
			wearables_system.DEFAULT_ITEMS_IDS[hero_name][item_slot_type],
			TERRORBLADE_COLORS_IDS[tostring(item_id)],
			item_slot_type == "hero_base",
			item_slot_type == "persona_selector"
		)
	end
end

function wearables_system:UpdateClientData(player_id, hero)
	if not player_id and not hero then
		for _, player in pairs(players) do
			wearables_system:UpdateClientData(player:GetId(), player)
		end
		return
	end
	local entity_name = hero:GetUnitName()
	local items_list = {}
	local styles_list = {}
	local is_persona = false
	if wearables_system.ITEMS_LIST[entity_name] and hero.items_list_ids then
		if
			hero:HasUnequipItem(4480)
			or hero:HasUnequipItem(999251)
			or hero:HasUnequipItem(26559)
			or hero:HasUnequipItem(13783)
			or hero:HasUnequipItem(13042)
			or hero:HasUnequipItem(31367)
			or hero:HasUnequipItem(36191)
			or hero:HasUnequipItem(36193)
			or hero:HasUnequipItem(36214)
		then
			is_persona = true
		end
		for _, id in pairs(hero.items_list_ids) do
			local allow_added = true
			id = tonumber(id)
			local item_id = id
			if
				wearables_system.ITEMS_DATA[entity_name][id] and wearables_system.ITEMS_DATA[entity_name][id].dota_id
			then
				item_id = wearables_system.ITEMS_DATA[entity_name][id].dota_id
			end
			if
				wearables_system.ITEMS_DATA[entity_name][id] and wearables_system.ITEMS_DATA[entity_name][id].ItemStyle
			then
				styles_list[item_id] = wearables_system.ITEMS_DATA[entity_name][id].ItemStyle
			end
			if is_persona then
				if
					wearables_system.ITEMS_LIST[entity_name]
					and wearables_system.ITEMS_LIST[entity_name][tostring(item_id)]
					and wearables_system.ITEMS_LIST[entity_name][tostring(item_id)].item_slot
				then
					if
						not string.find(
							wearables_system.ITEMS_LIST[entity_name][tostring(item_id)].item_slot,
							"persona"
						)
					then
						allow_added = false
					end
				end
			else
				if
					wearables_system.ITEMS_LIST[entity_name]
					and wearables_system.ITEMS_LIST[entity_name][tostring(item_id)]
					and wearables_system.ITEMS_LIST[entity_name][tostring(item_id)].item_slot
				then
					if
						string.find(wearables_system.ITEMS_LIST[entity_name][tostring(item_id)].item_slot, "persona")
					then
						allow_added = false
					end
				end
			end
			if allow_added then
				table.insert(items_list, tostring(item_id))
			end
		end
		wearables_system.item_styles_saved[hero:GetUnitName()] = styles_list
		local encoded = json.encode(items_list)
		local encoded_styles = json.encode(styles_list)
		FireGameEvent("send_items_data", { items_data = encoded, player_id = player_id, styles_list = encoded_styles })
	end
end

function wearables_system:UpdateFullParticleForPlayer(player_id_owner, entity, recconect_id)
	local entity_name = entity:GetUnitName()
	local all_items = entity:GetPlayerWearables()
	for _, item_handle in pairs(all_items) do
		local accept_change = true
		if item_handle.hidden_item then
			accept_change = false
		end
		if accept_change then
			local item_info = wearables_system.ITEMS_LIST[entity_name][tostring(item_handle.item_id)]
			if item_info then
				Timers:CreateTimer(0.1, function()
					if IsValid(item_handle) and item_info.visuals_list and item_info.visuals_list.particles_list then
						wearables_system:SetupParticles(
							entity,
							item_handle,
							item_info.visuals_list.particles_list,
							item_info.visuals_list,
							item_info,
							"default",
							recconect_id
						)
						wearables_system:SetupParticles(
							entity,
							item_handle,
							item_info.visuals_list.particles_list,
							item_info.visuals_list,
							item_info,
							item_handle.style,
							recconect_id
						)
					end
				end)
			end
		end
	end
	if wearables_system.ReplacementInfo[entity_name] then
		for asset, modifier in pairs(wearables_system.ReplacementInfo[entity_name].ability_icons) do
			FireGameEvent("event_change_ability_icon", {
				entindex = entity:GetEntityIndex(),
				asset = asset,
				modifier = modifier,
			})
		end
		for asset, modifier in pairs(wearables_system.ReplacementInfo[entity_name].particle_replace) do
			FireGameEvent("event_change_ability_pfx", {
				entindex = entity:GetEntityIndex(),
				asset = asset,
				modifier = modifier,
			})
		end
	end
	if wearables_system.ReplacementInfoEffects[entity_name] then
		for ability_name, data in pairs(wearables_system.ReplacementInfoEffects[entity_name].ability_icons) do
			for asset, modifier in pairs(data) do
				FireGameEvent("event_change_ability_icon", {
					entindex = entity:GetEntityIndex(),
					asset = asset,
					ability_name = ability_name,
					modifier = modifier,
				})
			end
		end

		for ability_name, data in pairs(wearables_system.ReplacementInfoEffects[entity_name].particle_replace) do
			for asset, modifier in pairs(data) do
				FireGameEvent("event_change_ability_pfx", {
					entindex = entity:GetEntityIndex(),
					asset = asset,
					ability_name = ability_name,
					modifier = modifier,
				})
			end
		end
	end
end

function wearables_system:dota1x6_item_change_effects(data)
	if data.PlayerID == nil then
		return
	end
	local PlayerID = data.PlayerID
	local player = PlayerResource:GetPlayer(PlayerID)
	if player == nil then
		return
	end
	local player_table = CustomNetTables:GetTableValue("sub_data", tostring(PlayerID))
	if player_table == nil then
		return
	end
	local hero = PlayerResource:GetSelectedHeroEntity(PlayerID)
	local item_id = data.item_id
	local current_hero = data.current_hero
	local remove = data.remove
	local player_id = data.PlayerID
	local original_item_information = wearables_system.ITEMS_DATA[current_hero][item_id]
	if original_item_information == nil then
		return
	end
	local item_slot_type = original_item_information["SlotType"]
	local ability_name = data.ability_name
	if not HasDonateItem(player_id, item_id) then
		return
	end

	if wearables_system.items_applied_effects[PlayerID] == nil then
		wearables_system.items_applied_effects[PlayerID] = {}
	end

	if wearables_system.items_applied_effects[PlayerID][current_hero] == nil then
		wearables_system.items_applied_effects[PlayerID][current_hero] = {}
	end

	local player_items_table = {}

	for ability_name, v in pairs(player_table.player_items_onequip_effects[tostring(current_hero)]) do
		player_items_table[ability_name] = v
	end

	local old_effect_id = wearables_system.items_applied_effects[PlayerID][current_hero][ability_name]
	if old_effect_id and hero then
		local old_custom_info = wearables_system.ITEMS_DATA[current_hero][old_effect_id]
		local old_style = "0"
		if old_custom_info and old_custom_info["dota_id"] then
			old_effect_id = old_custom_info["dota_id"]
		end
		if old_custom_info and old_custom_info.ItemStyle then
			old_style = old_custom_info.ItemStyle
		end
		local item_info_old = wearables_system.ITEMS_LIST[current_hero][tostring(old_effect_id)]
		if item_info_old then
			wearables_system:UnSetupVisualsListEffects(ability_name, hero, item_info_old.visuals_list, "default")
			wearables_system:UnSetupVisualsListEffects(ability_name, hero, item_info_old.visuals_list, old_style)
		end
	end

	if remove == 1 then
		player_items_table[ability_name] = nil
		wearables_system.items_applied_effects[PlayerID][current_hero][ability_name] = nil
	else
		wearables_system.items_applied_effects[PlayerID][current_hero][ability_name] = item_id
		player_items_table[ability_name] = item_id
		if hero then
			local style = "0"
			if original_item_information and original_item_information["dota_id"] then
				item_id = original_item_information["dota_id"]
			end
			if original_item_information and original_item_information.ItemStyle then
				style = original_item_information.ItemStyle
			end
			local item_info = wearables_system.ITEMS_LIST[current_hero][tostring(item_id)]
			if item_info then
				wearables_system:SetupVisualsListEffects(ability_name, hero, item_info.visuals_list, "default")
				wearables_system:SetupVisualsListEffects(ability_name, hero, item_info.visuals_list, style)
			end
		end
	end

	if not data.setup then
		player_table.player_items_onequip_effects[tostring(current_hero)] = player_items_table
		CustomNetTables:SetTableValue("sub_data", tostring(PlayerID), player_table)
	end

	if remove ~= 1 and not data.setup and shop and shop.UnmarkItemNew then
		shop:UnmarkItemNew(PlayerID, data.item_id)
	end
end

function wearables_system:UnSetupVisualsListEffects(ability_name, entity, visual_list, style)
	local hero_name = entity:GetUnitName()
	for visual_name, visual_data in pairs(visual_list) do
		if visual_data[style] then
			for asset, modifier in pairs(visual_data[style]) do
				if visual_name == "ability_icons" then
					wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name][asset] = nil
					FireGameEvent("event_change_ability_icon", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						ability_name = ability_name,
						modifier = wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name][asset],
					})
				elseif visual_name == "particles_abilities" then
					wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name][asset] = nil
					FireGameEvent("event_change_ability_pfx", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						ability_name = ability_name,
						modifier = wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name][asset],
					})
				elseif visual_name == "sound_replace" then
					wearables_system.ReplacementInfoEffects[hero_name].sound_replace[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].sound_replace[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].sound_replace[ability_name][asset] = nil
				elseif visual_name == "models" then
					wearables_system.ReplacementInfoEffects[hero_name].models[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].models[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].models[ability_name][asset] = nil
				end
			end
		end
	end
end

function wearables_system:SetupVisualsListEffects(ability_name, entity, visual_list, style)
	local hero_name = entity:GetUnitName()
	for visual_name, visual_data in pairs(visual_list) do
		if visual_data[style] then
			for asset, modifier in pairs(visual_data[style]) do
				if visual_name == "ability_icons" then
					wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name][asset] = modifier
					FireGameEvent("event_change_ability_icon", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						ability_name = ability_name,
						modifier = wearables_system.ReplacementInfoEffects[hero_name].ability_icons[ability_name][asset],
					})
				elseif visual_name == "particles_abilities" then
					wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name][asset] = modifier
					FireGameEvent("event_change_ability_pfx", {
						entindex = entity:GetEntityIndex(),
						asset = asset,
						ability_name = ability_name,
						modifier = wearables_system.ReplacementInfoEffects[hero_name].particle_replace[ability_name][asset],
					})
				elseif visual_name == "sound_replace" then
					wearables_system.ReplacementInfoEffects[hero_name].sound_replace[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].sound_replace[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].sound_replace[ability_name][asset] = modifier
				elseif visual_name == "models" then
					wearables_system.ReplacementInfoEffects[hero_name].models[ability_name] = wearables_system.ReplacementInfoEffects[hero_name].models[ability_name]
						or {}
					wearables_system.ReplacementInfoEffects[hero_name].models[ability_name][asset] = modifier
				end
			end
		end
	end
end