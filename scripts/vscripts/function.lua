--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


require("debug_")

function CDOTA_BaseNPC:IsValidKill(killer)
	if killer:GetTeamNumber() == self:GetTeamNumber() then
		return false
	end
	if not self:IsRealHero() or self:IsTempestDouble() or self:IsCreepHero() then
		return false
	end
	if self:IsReincarnating() then
		return false
	end

	return true
end

function CDOTA_BaseNPC:IsTree()
	return false
end

function CDOTA_MapTree:IsTree()
	return true
end

function CDOTA_MapTree:IsUnit()
	return false
end

function CBaseAnimatingActivity:IsUnit()
	return false
end

function CDOTA_BaseNPC:IsCreepHero()
	return self:HasModifier("modifier_life_stealer_infest_custom_legendary_creep")
		or (self:IsCreep() and self:IsConsideredHero())
end

function CDOTA_BaseNPC:HasBasher()
	return self:HasModifier("modifier_item_basher_custom") or self:HasModifier("modifier_item_abyssal_blade_custom")
end

function CDOTA_BaseNPC:InitTalent(skill_name)
	local playerID = self:GetId()

	local skill_data = nil
	local group = nil

	for group_name, skills_group in pairs(ingame_talents) do
		for name, data in pairs(skills_group) do
			if name == skill_name then
				group = group_name
				skill_data = data
				break
			end
		end
	end

	if skill_data == nil then
		return
	end

	local max = upgrade:GetMaxLevel(skill_data)

	local type_name = skill_data["rarity"]

	if group == "patrol" or group == "alchemist_items" then
		max = 999999
	end

	if type_name == "gray" then
		start_quest:CheckQuest({ id = playerID, quest_name = "Quest_2" })
	end

	if type_name == "blue" then
		start_quest:CheckQuest({ id = playerID, quest_name = "Quest_4" })
	end

	if type_name == "purple" then
		start_quest:CheckQuest({ id = playerID, quest_name = "Quest_5" })
	end

	if type_name == "orange" then
		max = 1
		start_quest:CheckQuest({ id = playerID, quest_name = "Quest_6" })
	end

	if group == "patrol" then
		start_quest:CheckQuest({ id = playerID, quest_name = "Quest_7" })
	end

	local talent_level = self:TalentLevel(skill_name)

	if talent_level >= max then
		return
	end

	if group == "kunkka_shop" then
		self:AddTalent(skill_name)
		return
	end

	if type_name == "orange" and not self.is_bot then
		if HTTP.playersData[playerID].firstOrangeTalent then
			if HTTP.playersData[playerID].SecondMainTalent == "" then
				HTTP.playersData[playerID].SecondMainTalent = skill_data["skill_icon"]
			end
		else
			HTTP.playersData[playerID].firstOrangeTalent = skill_data["skill_icon"]
		end
	end

	local player_table = players[self:GetId()]

	if (type_name == "orange") and (player_table.chosen_skill == 0) then
		player_table.chosen_skill = skill_data["skill_number"]
		player_table.chosen_skill_name = skill_data["skill_icon"]
		player_table.legendary_talent = skill_name
		player_table.legendary_skill_name = self:GetTalentValue(skill_name, "skill_name", true)

		if active_talents[playerID] then
			local result_table = {}
			for talent, data in pairs(active_talents[playerID]) do
				for _, key in pairs({ "alt_talent", "alt_talent2" }) do
					local alt_talent = self:GetTalentValue(talent, key, true)
					if alt_talent ~= 0 then
						local alt_table = {}
						if type(alt_talent) == "table" then
							alt_table = alt_talent
						else
							table.insert(alt_table, alt_talent)
						end
						for _, check_talent in pairs(alt_table) do
							if check_talent == skill_name then
								table.insert(result_table, talent)
							end
						end
					end
				end
			end
			if #result_table > 0 then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(playerID),
					"ShowAltTalents",
					{ talent = skill_name, alt_talents = result_table }
				)
			end
		end

		dota1x6:UpdatePlayersTable(self:GetTeamNumber())
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self:GetId()),
			"UpdateInnatePanel",
			{
				legendary = skill_data["skill_icon"],
				legendary_talent = skill_name,
				legendary_skill_name = player_table.legendary_skill_name,
			}
		)
	end

	if self:IsAlive() then
		if group == "alchemist_items" then
			if IsValid(self.stats_tracker) then
				self.stats_tracker:GeneralTrigger(skill_name)
			end
		else
			self:AddTalent(skill_name)
		end
	else
		player_table.respawn_mod = skill_name
		return
	end

	if
		(type_name == "orange" or type_name == "purple")
		and group ~= "patrol"
		and group ~= "alchemist_items"
		and group ~= "broodmother_spiders"
	then
		CustomGameEventManager:Send_ServerToAllClients(
			"show_skill_event",
			{ hero = self:GetUnitName(), skill = skill_name, id = playerID, level = talent_level + 1 }
		)
	end
end

function CDOTA_BaseNPC:UpdateTalentsClient(skip_reconect)
	for _, player in pairs(players) do
		if not skip_reconect then
			for i = 0, 20 do
				local current_ability = player:GetAbilityByIndex(i)

				if
					current_ability
					and current_ability:GetLevel() > 0
					and current_ability:GetIntrinsicModifierName()
					and current_ability:GetIntrinsicModifierName() ~= ""
				then
					player:AddNewModifier(player, current_ability, current_ability:GetIntrinsicModifierName(), {})
				end
			end

			--player:AddNewModifier(player, nil, "modifier_general_stats", {})
		end

		local player_id = player:GetId()

		if active_talents[player_id] then
			for name, data in pairs(active_talents[player_id]) do
				FireGameEvent("talent_added", {
					ent_index = player:entindex(),
					talent = name,
					level = data.level,
				})
			end
		end
	end
end

function CDOTA_BaseNPC:AddTalent(talent)
	local player_id = self:GetId()

	if not active_talents[player_id] then
		active_talents[player_id] = {}
	end

	if not active_talents[player_id][talent] then
		active_talents[player_id][talent] = {}
		active_talents[player_id][talent].level = 1

		if self:GetTalentValue(talent, "allow_illusion") ~= 0 then
			active_talents[player_id][talent].allow_illusion = self:GetTalentValue(talent, "allow_illusion")
		end
	else
		active_talents[player_id][talent].level = active_talents[player_id][talent].level + 1
	end

	local level = active_talents[player_id][talent].level

	FireGameEvent("talent_added", {
		ent_index = self:entindex(),
		talent = talent,
		level = level,
	})

	if self:GetTalentValue(talent, "no_level", true) ~= 1 then
		players[self:GetId()].upgrades[talent] = level
	end
	self:UpdateCommonBonus()

	local is_talent_upgrade = self:GetTalentValue(talent, "is_talent_upgrade", true)
	if is_talent_upgrade and is_talent_upgrade == 1 then
		local func = self:GetTalentValue(talent, "talent_upgrade_func", true)
		if func then
			self:AddTalentIncreaseFunction(talent, func)
		end
	end

	self:TalentQuests(talent)
	self:ProcTrigger(talent)

	local general_data = ingame_talents["general"][talent]
	if general_data and level >= upgrade:GetMaxLevel(general_data) then
		self:GenericParticle("particles/generic/common_talent_max.vpcf")
		self:EmitSound("BS.Thirst_legendary_active")
	end
end

function CDOTA_BaseNPC:UpdateCommonBonus()
	if not players[self:GetId()] then
		return
	end

	CustomNetTables:SetTableValue("upgrades_player", tostring(self:GetId()), {
		upgrades = players[self:GetId()].upgrades,
		priority = players[self:GetId()].priority_talent,
	})
end

function CDOTA_BaseNPC:RemoveTalent(talent)
	local player_id = self:GetId()

	if not active_talents[player_id] then
		return
	end
	if not active_talents[player_id][talent] then
		return
	end

	local player_table = players[player_id]

	active_talents[player_id][talent] = nil

	if talent_increase_functions[player_id] then
		talent_increase_functions[player_id][talent] = nil
	end

	if self.lifesteal_mods then
		for _, list in pairs(self.lifesteal_mods) do
			list[talent] = nil
		end
	end

	if self:HasModifier(talent) then
		self:RemoveModifierByName(talent)
	end

	if player_table then
		player_table.upgrades[talent] = nil

		if player_table.legendary_talent == talent then
			player_table.chosen_skill = 0
			player_table.chosen_skill_name = 0
			player_table.legendary_talent = nil
			player_table.legendary_skill_name = nil

			dota1x6:UpdatePlayersTable(self:GetTeamNumber())
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(player_id),
				"UpdateInnatePanel",
				{ legendary = 0, legendary_talent = "", legendary_skill_name = "" }
			)
		end
	end

	if self:GetTalentValue(talent, "is_basher", true) == 1 then
		self.has_basher_talent = nil
	end

	local banned_talent = self:GetTalentValue(talent, "banned_talent", true)

	if self.banned_talents and banned_talent ~= 0 then
		if type(banned_talent) == "table" then
			for _, name in pairs(banned_talent) do
				self.banned_talents[name] = nil
			end
		else
			self.banned_talents[banned_talent] = nil
		end
	end

	local ability_name = self:GetTalentValue(talent, "trigger_ability", true)

	if ability_name ~= 0 then
		local ability = self:FindAbilityByName(ability_name)
		if ability and not ability:IsHidden() then
			ability:SetHidden(true)
		end
	end

	FireGameEvent("talent_added", {
		ent_index = self:entindex(),
		talent = talent,
		level = 0,
	})

	self:ResetTalentValues(talent)
	self:UpdateCommonBonus()
	self:RefreshTalentIncrease()
end

function CDOTA_BaseNPC:RefreshTalentValues(talent)
	if not self.base_abilities then
		return
	end

	for _, name in pairs(self.base_abilities) do
		local ability = self:FindAbilityByName(name)
		if ability and ability.UpdateTalents and ability:IsTrained() then
			ability:UpdateTalents(talent)
		end
	end
end

function CDOTA_BaseNPC:ResetTalentValues(talent)
	if not self.base_abilities then
		return
	end

	for _, name in pairs(self.base_abilities) do
		local ability = self:FindAbilityByName(name)
		if ability and ability.UpdateTalents then
			ability.init = nil
			if ability:IsTrained() then
				ability:UpdateTalents(talent)
			end
		end
	end
end

function CDOTA_BaseNPC:ProcTrigger(talent)
	local update_mod = self:GetTalentValue(talent, "update_mod")
	local ability_name = self:GetTalentValue(talent, "trigger_ability")

	self:RefreshTalentValues(talent)

	local general_trigger = self:GetTalentValue(talent, "general_trigger")
	local is_basher = self:GetTalentValue(talent, "is_basher")
	local banned_talent = self:GetTalentValue(talent, "banned_talent", true)

	if is_basher and is_basher == 1 then
		self.has_basher_talent = 1
	end

	if banned_talent and banned_talent ~= 0 then
		if not self.banned_talents then
			self.banned_talents = {}
		end
		if type(banned_talent) == "table" then
			for _, talent in pairs(banned_talent) do
				self.banned_talents[talent] = true
			end
		else
			self.banned_talents[banned_talent] = true
		end
	end

	if update_mod and update_mod ~= 0 then
		local mods = {}
		if type(update_mod) ~= "table" then
			table.insert(mods, update_mod)
		else
			mods = update_mod
		end
		for _, name in pairs(mods) do
			local mod = self:FindModifierByName(name)
			if mod and mod.UpdateTalent ~= nil then
				mod:UpdateTalent(talent)
			end
		end
	end

	if ability_name and ability_name ~= 0 then
		local ability = self:FindAbilityByName(ability_name)
		if ability and ability.CreateTalent ~= nil then
			ability:CreateTalent(talent)
		end
	end

	if (general_trigger and general_trigger == 1) or ingame_talents["patrol"][talent] then
		if IsValid(self.stats_tracker) then
			self.stats_tracker:GeneralTrigger(talent)
		end
	end
end

function CDOTA_BaseNPC:TalentQuests(talent)
	local skill_data = nil
	for _, skills_group in pairs(ingame_talents) do
		for name, data in pairs(skills_group) do
			if name == talent then
				skill_data = data
				break
			end
		end
	end

	if skill_data == nil then
		return
	end

	local morphling_innate = self:FindModifierByName("modifier_morphling_innate_custom")

	if morphling_innate and skill_data["rarity"] == "gray" then
		morphling_innate:Proc()
	end

	if (self:GetQuest() == "General.Quest_7") and not self:QuestCompleted() then
		local max = 0
		for name, skill in pairs(ingame_talents["general"]) do
			if self:TalentLevel(name) >= max and skill["rarity"] == "gray" and skill["no_level"] ~= 1 then
				max = self:TalentLevel(name)
			end
		end

		self:UpdateQuest(max - self.quest.progress)
	end

	if (self:GetQuest() == "General.Quest_8") and not self:QuestCompleted() and skill_data["rarity"] == "blue" then
		if self:TalentLevel(talent) >= upgrade:GetMaxLevel(skill_data) then
			self:UpdateQuest(1)
		end
	end

	if (self:GetQuest() == "General.Quest_9") and not self:QuestCompleted() and skill_data["rarity"] == "purple" then
		self:UpdateQuest(1)
	end
end

function CDOTA_BaseNPC:TalentLevel(talent)
	local player_id = self:GetId()

	if not active_talents[player_id] then
		return 0
	end
	if not active_talents[player_id][talent] then
		return 0
	end

	return active_talents[player_id][talent].level
end

function CDOTA_BaseNPC:HasTalent(talent)
	if not self or self:IsNull() then
		return false
	end

	local player_id = self:GetId()

	if not active_talents[player_id] or not active_talents[player_id][talent] then
		return false
	end

	if
		(self:IsIllusion() or self:IsTempestDouble())
		and (
			not active_talents[player_id][talent].allow_illusion
			or active_talents[player_id][talent].allow_illusion ~= 1
		)
	then
		return false
	end

	return true
end

function CDOTA_BaseNPC:AddTalentIncreaseFunction(name, func)
	local player_id = self:GetId()

	if not talent_increase_functions[player_id] then
		talent_increase_functions[player_id] = {}
	end

	if not talent_increase_functions[player_id][name] then
		talent_increase_functions[player_id][name] = func
	end

	if self:IsIllusion() or self:IsTempestDouble() then
		return
	end

	dota1x6:SendTalentIncrease({ PlayerID = self:GetId() })
end

function CDOTA_BaseNPC:RefreshTalentIncrease()
	if IsValid(self.stats_tracker) then
		self.stats_tracker.ability:UpdateTalents()
	end

	dota1x6:SendTalentIncrease({ PlayerID = self:GetId() })
end

function CDOTA_BaseNPC:GetTalentValue(name, property, ignore_level)
	if not self.unit_name then
		self.unit_name = self:GetUnitName()
	end

	local hero_table = nil

	if ingame_talents[self.unit_name] and ingame_talents[self.unit_name][name] then
		hero_table = ingame_talents[self.unit_name]
	elseif ingame_talents["general"][name] then
		hero_table = ingame_talents["general"]
	elseif ingame_talents["patrol"][name] then
		hero_table = ingame_talents["patrol"]
	elseif ingame_talents["broodmother_spiders"] and ingame_talents["broodmother_spiders"][name] then
		hero_table = ingame_talents["broodmother_spiders"]
	elseif ingame_talents["invoker_spells"] and ingame_talents["invoker_spells"][name] then
		hero_table = ingame_talents["invoker_spells"]
	elseif talents_heroes[name] and ingame_talents[talents_heroes[name]] then
		hero_table = ingame_talents[talents_heroes[name]]
	end

	if not hero_table then
		return 0
	end

	local talent_table = hero_table[name]

	if not talent_table then
		return 0
	end

	local value = talent_table[property]

	if not value then
		return 0
	end

	if
		ignore_level
		and ignore_level == true
		and (
			type(value) ~= "table"
			or property == "banned_talent"
			or property == "alt_talent"
			or property == "alt_talent2"
		)
	then
		return value
	end

	if not self:HasTalent(name) then
		return 0
	end
	if property == "update_mod" then
		return value
	end

	local level = self:TalentLevel(name)

	if level == 0 then
		return 0
	end

	if type(value) == "table" then
		local k = 1
		if talent_increase_functions[self:GetId()] then
			for func_name, func in pairs(talent_increase_functions[self:GetId()]) do
				local result = func(talent_table, self)
				k = k + (result or 0)
			end
		end
		return value[level] * k
	else
		if property == "general_bonus" then
			return value * level
		else
			return value
		end
	end

	return 0
end

function CDOTA_BaseNPC:LethalDisabled()
	if self:HasModifier("modifier_death") then
		return true
	end
	if self:HasModifier("modifier_bane_nightmare_custom_legendary") then
		return true
	end

	return false
end

function CDOTA_BaseNPC:CheckCastMods(ability)
	for _, unit in pairs(self:FindTargets(1000)) do
		for _, mod in pairs(unit:FindAllModifiers()) do
			if mod.OnAbilityFullyCast ~= nil then
				local params = {
					ability = ability,
					unit = self,
				}
				mod:OnAbilityFullyCast(params)
			end
		end
	end
end

function CDOTA_BaseNPC:SendError(text)
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self:GetId()),
		"CreateIngameErrorMessage",
		{ message = text }
	)
end

function CDOTA_BaseNPC:GiveKillExp(target)
	local target_team = target:GetTeamNumber()
	local self_team = self:GetTeamNumber()
	local target_exp = 0
	local self_exp = 0

	local heroes = {}

	for _, player in pairs(players) do
		if player:GetTeamNumber() == target_team then
			target_exp = target_exp + player:GetCurrentXP()
		elseif player:GetTeamNumber() == self_team then
			if player == self or (player:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() <= 1000 then
				heroes[#heroes + 1] = player
			end
			self_exp = self_exp + player:GetCurrentXP()
		end
	end

	if #heroes == 0 then
		return
	end

	local diff = math.max(0, (target_exp - self_exp))
	local exp = (100 + 0.04 * target_exp + diff * 0.2) / #heroes

	for _, player in pairs(heroes) do
		player:AddExperience(exp, 0, false, false)
	end
end

function CDOTA_BaseNPC:IsFieldInvun(caster)
	if
		self.field_invun_mod
		and IsValid(self.field_invun_mod)
		and self.field_invun_mod.NoDamage
		and caster
		and self.field_invun_mod:NoDamage(caster) == 1
	then
		return true
	end
	return false
end

function CDOTA_Modifier_Lua:GetAuraEntityReject(target)
	return target:IsFieldInvun(self:GetCaster())
end

function CDOTA_Ability_Lua:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self
	self.parent = self:GetCaster()
end

CDOTA_BaseNPC.AddNewModifier_old = CDOTA_BaseNPC.AddNewModifier
function CDOTA_BaseNPC:AddNewModifier(caster, ability, name, data)
	if self:IsFieldInvun(caster) then
		return
	end
	return self:AddNewModifier_old(caster, ability, name, data)
end

CDOTA_BaseNPC.GiveMana_old = CDOTA_BaseNPC.GiveMana
function CDOTA_BaseNPC:GiveMana(mana)
	if IsValid(self.pulse_ability) and self.pulse_ability.talents.has_r7 == 1 then
		return false
	end
	return self:GiveMana_old(mana)
end

function CDOTA_BaseNPC:IsFeared_old()
	if not IsServer() then
		return
	end

	for _, mod in pairs(self:FindAllModifiers()) do
		local tables = {}
		mod:CheckStateToTable(tables)
		local bkb_allowed = true

		if mod:GetAbility() then
			local behavior = mod:GetAbility():GetAbilityTargetFlags()

			if bit.band(behavior, DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES) == 0 and self:IsDebuffImmune() then
				bkb_allowed = false
			end
		end

		if bkb_allowed == true then
			for state_name, mod_table in pairs(tables) do
				if tostring(state_name) == "47" then
					return true
				end
			end
		end
	end
	return false
end

function CDOTA_BaseNPC:IsLeashed()
	if not IsServer() then
		return
	end

	local debuff_immune = nil

	for _, mod in pairs(self:FindAllModifiers()) do
		local states = {}
		mod:CheckStateToTable(states)
		if states[MODIFIER_STATE_TETHERED] ~= nil or states[tostring(MODIFIER_STATE_TETHERED)] ~= nil then
			local ability = mod:GetAbility()
			if not ability then
				return true
			end
			if debuff_immune == nil then
				debuff_immune = self:IsDebuffImmune()
			end
			if
				not debuff_immune
				or bit.band(ability:GetAbilityTargetFlags(), DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES) ~= 0
			then
				return true
			end
		end
	end

	return false
end

function CDOTA_BaseNPC:GetPathPoint(get_dist)
	if not self.start_abs or not self.tower_location then
		return
	end

	local point = self:GetAbsOrigin()
	local start_loc = self.start_abs
	local end_loc = self.tower_location
	point.z = 0
	end_loc.z = 0
	start_loc.z = 0

	local function dot(v1, v2)
		return v1.x * v2.x + v1.y * v2.y
	end

	local start_to_end = Vector(end_loc.x - start_loc.x, end_loc.y - start_loc.y, 0)
	local start_to_point = Vector(point.x - start_loc.x, point.y - start_loc.y, 0)
	local result_point

	local segment_length_squared = dot(start_to_end, start_to_end)
	if segment_length_squared == 0 then
		result_point = start_loc
	end

	local t = dot(start_to_point, start_to_end) / segment_length_squared
	t = math.max(0, math.min(1, t))

	result_point = GetGroundPosition((start_loc + start_to_end * t), nil)
	if get_dist then
		return (self:GetAbsOrigin() - result_point):Length2D()
	else
		return result_point
	end
end

function CDOTA_BaseNPC:WallKnock(center, radius, height, inside, extra_dist, no_path)
	if IsValid(self.wall_knock_mod) then
		return
	end

	local ship_mod = self:FindModifierByName("modifier_kunkka_ghostship_custom_ship_mod")
	if not ship_mod then
		local sail_mod = self:FindModifierByName("modifier_kunkka_ghostship_custom_legendary_sail")
		if sail_mod and IsValid(sail_mod.ship) then
			ship_mod = sail_mod.ship:FindModifierByName("modifier_kunkka_ghostship_custom_ship_mod")
		end
	end

	if ship_mod then
		ship_mod:Crash()
		return
	end

	local new_point = nil
	local unit_pos = self:GetAbsOrigin()
	local vec = (unit_pos - center):Normalized()
	if unit_pos == center then
		vec = unit:GetForwardVector()
	end
	vec.z = 0

	local function Check(point)
		return (center - point):Length2D() <= radius and GetGroundHeight(point, nil) >= height
	end

	local dist = 100
	for i = 1, 300 do
		if inside then
			local check_point = GetGroundPosition((unit_pos - vec * i * dist), nil)
			if Check(check_point) then
				new_point = check_point
			end
		else
			local check_point = GetGroundPosition((center + vec * i * dist), nil)
			if not Check(check_point) then
				new_point = check_point
			end
		end
		if new_point then
			break
		end
	end

	if not new_point then
		return
	end
	local dir = (new_point - unit_pos)
	dir.z = 0

	local more_dist = 50
	if extra_dist then
		more_dist = more_dist + extra_dist
	end
	new_point = new_point + dir:Normalized() * more_dist

	local distance = (new_point - unit_pos):Length2D()

	self:Stop()
	self:InterruptMotionControllers(false)
	if not no_path then
		self:AddNewModifier(self, nil, "modifier_generic_path", { duration = 2 })
	end

	self:EmitSound("UI.Walls_hit")
	local attack_particle =
		ParticleManager:CreateParticle("particles/generic/duel_stun.vpcf", PATTACH_ABSORIGIN_FOLLOW, self)
	ParticleManager:SetParticleControlEnt(
		attack_particle,
		1,
		self,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		attack_particle,
		0,
		self,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(attack_particle, 60, Vector(31, 82, 167))
	ParticleManager:SetParticleControl(attack_particle, 61, Vector(1, 0, 0))
	ParticleManager:ReleaseParticleIndex(attack_particle)

	local mod = self:FindModifierByName("modifier_pangolier_gyroshell_custom")
	if mod and self:CheckCd("pangolier_crash", 1) then
		mod:Crash()
		return
	end

	self:AddNewModifier(nil, nil, "modifier_stunned", { duration = field_stun })

	if distance > 400 or self:IsDebuffImmune() then
		FindClearSpaceForUnit(self, new_point, true)
		return
	end

	local knockbackProperties = {
		target_x = new_point.x,
		target_y = new_point.y,
		distance = distance,
		speed = distance / 0.2,
		height = 0,
		fix_end = true,
		activity = ACT_DOTA_FLAIL,
	}
	self.wall_knock_mod = self:AddNewModifier(nil, nil, "modifier_generic_arc", knockbackProperties)
end

function CDOTA_BaseNPC:IgnoredByCreeps()
	if
		self:IsCourier()
		or self:GetUnitName() == "npc_teleport"
		or self:GetUnitName() == "npc_dota_donate_item_illusion"
	then
		return true
	end

	local mods = {
		["modifier_monkey_king_wukongs_command_custom_soldier"] = true,
		["modifier_monkey_king_innate_custom"] = true,
		["modifier_donate_pet"] = true,
		["modifier_orb_icon"] = true,
		["modifier_arc_warden_tempest_double_custom_far"] = true,
		["modifier_slark_pounce_custom_legendary_fish"] = true,
	}

	for mod, _ in pairs(mods) do
		if self:HasModifier(mod) then
			return true
		end
	end
	return false
end

function CDOTA_BaseNPC:CheckOwner()
	if self.owner then
		return self.owner
	else
		return self
	end
end

function CDOTA_BaseNPC:CanBlink()
	if self:IsRooted() then
		return false
	end
	if self:IsLeashed() then
		return false
	end

	return true
end

function CDOTA_BaseNPC:TeleportThink()
	if IsValid(self.tinker_innate) and self:HasScepter() and self:IsSilenced() then
		return false
	end

	if
		self:IsRooted()
		or self:IsHexed()
		or self:HasModifier("modifier_custom_puck_phase_shift")
		or self:IsLeashed()
	then
		return false
	end

	return true
end

function CDOTA_BaseNPC:GetValueQuas(ability, value)
	local quas = self:FindAbilityByName("invoker_quas_custom")
	local level = 0

	if quas then
		level = quas:GetLevel() - 1
		if self.invoke_ability and self.invoke_ability.talents.has_r4 == 1 then
			level = level + self.invoke_ability.talents.r4_level
		end
	else
		local quas_mod = self:GetUpgradeStack("modifier_morphling_replicate_custom_quas")
		if quas_mod then
			level = math.max(0, quas_mod - 1)
		end
	end
	if self:HasTalent("modifier_slark_essence_7") or self:HasTalent("modifier_terror_reflection_7") then
		level = 7
	end
	return ability:GetLevelSpecialValueFor(value, level)
end

function CDOTA_BaseNPC:GetValueWex(ability, value)
	local wex = self:FindAbilityByName("invoker_wex_custom")
	local level = 0
	if wex then
		level = wex:GetLevel() - 1
		if self.invoke_ability and self.invoke_ability.talents.has_r4 == 1 then
			level = level + self.invoke_ability.talents.r4_level
		end
	else
		local wex_mod = self:GetUpgradeStack("modifier_morphling_replicate_custom_wex")
		if wex_mod then
			level = math.max(0, wex_mod - 1)
		end
	end
	if self:HasTalent("modifier_slark_essence_7") then
		level = 7
	end
	return ability:GetLevelSpecialValueFor(value, level)
end

function CDOTA_BaseNPC:GetValueExort(ability, value)
	local exort = self:FindAbilityByName("invoker_exort_custom")
	local level = 0

	if exort then
		level = exort:GetLevel() - 1
		if self.invoke_ability and self.invoke_ability.talents.has_r4 == 1 then
			level = level + self.invoke_ability.talents.r4_level
		end
	else
		local exort_mod = self:GetUpgradeStack("modifier_morphling_replicate_custom_exort")
		if exort_mod then
			level = math.max(0, exort_mod - 1)
		end
	end
	if self:HasTalent("modifier_slark_essence_7") then
		level = 7
	end
	return ability:GetLevelSpecialValueFor(value, level)
end

function CDOTA_BaseNPC:GetQuasHeal(new_stack)
	local ability = self:FindAbilityByName("invoker_quas_custom")
	if not ability then
		return 0
	end

	local stack = 0
	local k = 1

	if self:HasShard() then
		stack = 3
		k = k + ability:GetSpecialValueFor("shard_bonus") / 100
	else
		if self:HasModifier("modifier_invoker_quas_custom_passive") then
			stack = self:GetUpgradeStack("modifier_invoker_quas_custom_passive")
		end
	end

	local heal = ability:GetSpecialValueFor("heal") * k
	return heal * stack
end

function CDOTA_BaseNPC:GetExortDamage()
	local ability = self:FindAbilityByName("invoker_exort_custom")
	if not ability then
		return 0
	end

	local stack = 0
	local k = 1

	if self:HasShard() then
		stack = 3
		k = k + ability:GetSpecialValueFor("shard_bonus") / 100
	else
		if self:HasModifier("modifier_invoker_exort_custom_passive") then
			stack = self:GetUpgradeStack("modifier_invoker_exort_custom_passive")
		end
	end

	local damage = ability:GetSpecialValueFor("damage") * k
	return damage * stack
end

function CDOTA_BaseNPC:IsTalentIllusion()
	return self:HasModifier("modifier_skeleton_king_hellfire_blast_custom_illusion")
		or self:HasModifier("modifier_razor_plasma_field_custom_legendary")
		or self:HasModifier("modifier_bane_fiends_grip_custom_legendary_illusion")
end

function CDOTA_BaseNPC:GetUpgradeStack(mod)
	if IsValid(self) and self:HasModifier(mod) then
		return self:GetModifierStackCount(mod, self)
	end
	return 0
end

function CDOTA_BaseNPC:HasShard()
	return self:HasModifier("modifier_item_aghanims_shard")
end

function CDOTA_BaseNPC:UpgradeIllusion(mod, stack, modifier)
	local ability = nil

	if modifier then
		ability = modifier:GetAbility()
	end

	local i = self:AddNewModifier(self, ability, mod, {})
	i:SetStackCount(stack)
end

function CDOTA_BaseNPC:GetTempest()
	local target = nil
	if IsValid(self.tempest_double_tempest) then
		target = self.tempest_double_tempest
	elseif IsValid(self.owner) then
		target = self.owner
	end
	return target
end

function CDOTA_BaseNPC:GiveGold(gold, sound, no_effect, source)
	if sound then
		EmitSoundOnEntityForPlayer("UI.Tip_Player", self, self:GetId())
	end

	self:ModifyGoldFiltered(gold, true, DOTA_ModifyGold_Unspecified)
	self:AddResourceInfo("gold", source, math.floor(gold))

	if no_effect then
		return
	end

	local effect_cast = ParticleManager:CreateParticleForPlayer(
		"particles/units/heroes/hero_alchemist/alchemist_lasthit_coins.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self,
		self:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(effect_cast, 1, self:GetOrigin())
	ParticleManager:ReleaseParticleIndex(effect_cast)

	local digit = string.len(tostring(math.floor(gold))) + 1
	local effect_cast_2 = ParticleManager:CreateParticleForPlayer(
		"particles/units/heroes/hero_alchemist/alchemist_lasthit_msg_gold.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self,
		self:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(effect_cast_2, 1, Vector(0, gold, 0))
	ParticleManager:SetParticleControl(effect_cast_2, 2, Vector(1, digit, 0))
	ParticleManager:SetParticleControl(effect_cast_2, 3, Vector(255, 255, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast_2)
end

function CDOTA_BaseNPC:AddPoints(points_type, points, source, for_kill)
	if not IsServer() then
		return
	end

	local player = players[self:GetId()]
	if not player then
		return
	end

	local types_data = {
		blue = { points = "bluepoints", max = "bluemax", plus = PlusBlue, rarity = 2, resource = "blue_points" },
		purple = { points = "purplepoints", max = "purplemax", plus = PlusPurple, rarity = 3 },
		white = { points = "whitepoints", max = "whitemax", plus = PlusWhite, rarity = 1, resource = "gray_points" },
	}

	local data = types_data[points_type]
	local add_points = points
	player:AddResourceInfo(data.resource, source, points)

	if for_kill then
		local bfury_mod = player:FindModifierByName("modifier_item_bfury_custom")
		if bfury_mod then
			add_points = add_points + points * bfury_mod.blue_bonus
			player:AddResourceInfo(data.resource, bfury_mod:GetAbility(), points * bfury_mod.blue_bonus)
		end

		local hat_mod = player:FindModifierByName("modifier_item_pirate_hat_custom")
		if hat_mod then
			add_points = add_points + points * hat_mod.blue_bonus
			player:AddResourceInfo(data.resource, hat_mod:GetAbility(), points * hat_mod.blue_bonus)
		end
	end

	player[data.points] = player[data.points] + add_points

	if player[data.points] < math.floor(player[data.max]) then
		player:UpdateVisualPoints()
		return
	end

	player:UpdateVisualPoints(points_type)

	while player[data.points] >= math.floor(player[data.max]) do
		local plus = data.plus
		if points_type == "purple" and player.purplemax >= PlusPurpleThrash then
			plus = PlusPurpleMore
		end

		player[data.points] = player[data.points] - math.floor(player[data.max])
		player[data.max] = player[data.max] + plus
		dota1x6:CreateUpgradeOrb(self, data.rarity)
	end

	Timers:CreateTimer(0.5, function()
		if not IsValid(player) then
			return
		end
		player:UpdateVisualPoints()
	end)
end

function CDOTA_BaseNPC:UpdateVisualPoints(full_type)
	if not IsServer() then
		return
	end

	local id = self:GetId()
	local data = {
		blue = full_type == "blue" and math.floor(self.bluemax) or math.floor(self.bluepoints),
		purple = full_type == "purple" and math.floor(self.purplemax) or math.floor(self.purplepoints),
		white = full_type == "white" and math.floor(self.whitemax) or math.floor(self.whitepoints),
		max = math.floor(self.bluemax),
		max_p = math.floor(self.purplemax),
		max_w = math.floor(self.whitemax),
	}

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(id), "kill_progress", data)
	CustomNetTables:SetTableValue("spectator_points", tostring(id), data)
end

function CDOTA_BaseNPC:FindIllusions(new_radius)
	local radius = FIND_UNITS_EVERYWHERE
	if new_radius then
		radius = new_radius
	end

	local all_units = FindUnitsInRadius(
		self:GetTeamNumber(),
		self:GetAbsOrigin(),
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
		FIND_CLOSEST,
		false
	)
	local units = {}

	for _, unit in pairs(all_units) do
		if unit:IsIllusion() and unit.owner and unit.owner == self then
			table.insert(units, unit)
		end
	end

	return units
end

function CScriptParticleManager:Delete(particle, destroy)
	if not particle then
		return
	end

	if destroy and destroy > 0 then
		ParticleManager:DestroyParticle(particle, destroy == 2)
	end
	ParticleManager:ReleaseParticleIndex(particle)
end

function CDOTA_BaseNPC:FindTargets(radius, point, order, more_flags)
	local search_point = point and point or self:GetAbsOrigin()
	local search_order = order and order or FIND_CLOSEST
	local search_flags = more_flags and more_flags or DOTA_UNIT_TARGET_FLAG_NONE

	return FindUnitsInRadius(
		self:GetTeamNumber(),
		search_point,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
		search_flags,
		search_order,
		false
	)
end

function CDOTA_BaseNPC:FindFriends(radius, point, order, more_flags)
	local search_point = point and point or self:GetAbsOrigin()
	local search_order = order and order or FIND_CLOSEST
	local search_flags = more_flags and more_flags or DOTA_UNIT_TARGET_FLAG_NONE

	return FindUnitsInRadius(
		self:GetTeamNumber(),
		search_point,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
		search_flags,
		search_order,
		false
	)
end

function CDOTA_BaseNPC:PrintModifiers()
	print("-------- ", self:GetUnitName(), " ----------")

	for _, mod in pairs(self:FindAllModifiers()) do
		print(mod:GetName())
	end

	print("-------------------------")
end

function CDOTA_BaseNPC:RemoveCd(name)
	if not self.cd_manager then
		return
	end
	self.cd_manager[name] = nil
end

function CDOTA_BaseNPC:HasCd(name, cd)
	return self.cd_manager
		and self.cd_manager[name]
		and (GameRules:GetDOTATime(false, false) - self.cd_manager[name]) < cd
end

function CDOTA_BaseNPC:StartCd(name, cd)
	if not self.cd_manager then
		self.cd_manager = {}
	end
	self.cd_manager[name] = GameRules:GetDOTATime(false, false)
end

function CDOTA_BaseNPC:CheckCd(name, cd, chance, index)
	if not self.cd_manager then
		self.cd_manager = {}
	end

	if self:HasCd(name, cd) then
		return false
	end

	if chance and chance < 100 and index then
		if not RollPseudoRandomPercentage(chance, index, self) then
			return false
		end
	end

	self.cd_manager[name] = GameRules:GetDOTATime(false, false)
	return true
end

function CDOTA_BaseNPC:IsUnit()
	return not self:IsNull()
		and (self:IsHero() or self:IsCreep() or self.is_crystal or self.is_wd_ward)
		and self:GetUnitName() ~= "npc_teleport"
		and not self.crystal_clone
		and self:GetUnitName() ~= "npc_dota_donate_item_illusion"
		and not self:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
end

function CDOTA_BaseNPC:GetArmor(check_mod)
	local result = self:GetPhysicalArmorBaseValue()
	for _, mod in pairs(self:FindAllModifiers()) do
		if mod ~= check_mod and not mod.is_hub and mod.GetModifierPhysicalArmorBonus then
			local armor = mod:GetModifierPhysicalArmorBonus()
			if armor and armor > 0 then
				result = result + armor
			end
		end
	end
	return math.max(0, result)
end

function CDOTA_BaseNPC:FindOwner()
	local unit = self
	if unit.owner then
		for i = 1, 10 do
			if unit.owner then
				unit = unit.owner
			else
				break
			end
		end
	end
	return unit
end

function CDOTA_BaseNPC:CastPosition(point)
	local result = point
	if result == self:GetAbsOrigin() then
		result = self:GetAbsOrigin() + Vector(1, 0, 0) * 10
	end
	return result
end

function CDOTA_BaseNPC:FacePoint(point)
	local forward = self:GetForwardVector()
	forward.z = 0

	local new_point = self:GetAbsOrigin() + forward * 10
	if point then
		new_point = point
	end
	local dir = (new_point - self:GetAbsOrigin()):Normalized()
	dir.z = 0

	self:FaceTowards(new_point)
	self:SetForwardVector(dir)
end

function CDOTA_BaseNPC:DuelRestrict(target)
	local tower = towers[self:GetTeamNumber()]
	local enemy_tower = towers[target:GetTeamNumber()]
	if not tower or not enemy_tower then
		return
	end
	if not tower.duel_data or not enemy_tower.duel_data then
		return
	end
	if tower.duel_data == enemy_tower.duel_data then
		return
	end

	if
		duel_data[enemy_tower.duel_data]
		and duel_data[enemy_tower.duel_data].finished ~= 1
		and duel_data[enemy_tower.duel_data].stage == 2
	then
		return true
	end
	if
		duel_data[tower.duel_data]
		and duel_data[tower.duel_data].finished ~= 1
		and duel_data[tower.duel_data].stage == 2
	then
		return true
	end

	return false
end

function CDOTA_BaseNPC:IsOnDuel()
	local tower = towers[self:GetTeamNumber()]
	if not tower then
		return
	end
	if not tower.duel_data then
		return false
	end
	if not duel_data[tower.duel_data] then
		return false
	end

	if duel_data[tower.duel_data].stage ~= 2 then
		return false
	end

	return true
end

function CDOTA_BaseNPC:RandomTarget(radius, point, new_flags, count, ignore_target)
	local search_point = point and point or self:GetAbsOrigin()
	local flags = new_flags and new_flags or DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE
	local enemies = FindUnitsInRadius(
		self:GetTeamNumber(),
		search_point,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		flags,
		FIND_CLOSEST,
		false
	)
	local creeps = FindUnitsInRadius(
		self:GetTeamNumber(),
		search_point,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		flags,
		FIND_CLOSEST,
		false
	)
	local result = nil

	if count and count > 1 then
		if ignore_target then
			result = {}
			table.insert(result, ignore_target)
		end

		local search = function(search_table)
			for _, target in pairs(search_table) do
				if target ~= ignore_target then
					if not result then
						result = {}
					end
					table.insert(result, target)
					if #result >= count then
						break
					end
				end
			end
		end
		search(enemies)
		if not result or #result < count then
			search(creeps)
		end
	else
		if #enemies > 0 then
			result = enemies[1]
		else
			if #creeps > 0 then
				result = creeps[1]
			end
		end
	end

	return result
end

function CDOTA_BaseNPC:Teleport(point, dodge, particle_start, particle_end, sound_start)
	if sound_start then
		EmitSoundOnLocationWithCaster(self:GetAbsOrigin(), sound_start, self)
	end

	if particle_start then
		local effect = ParticleManager:CreateParticle(particle_start, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(effect, 0, self:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(effect)
	end

	FindClearSpaceForUnit(self, point, true)
	local vec = self:GetForwardVector()
	vec.z = 0
	self:FaceTowards(self:GetAbsOrigin() + vec * 10)
	self:SetForwardVector(vec)

	if dodge then
		ProjectileManager:ProjectileDodge(self)
	end

	if particle_end then
		self:GenericParticle(particle_end)
	end
end

function CDOTA_BaseNPC:CanLifesteal(target)
	if not self:IsAlive() then
		return
	end
	if not target:IsUnit() then
		return
	end
	if target:IsIllusion() then
		return
	end

	local result = target:IsCreep() and LIFESTEAL_CREEPS_CUSTOM or 1
	return result
end

function CDOTA_BaseNPC:CheckLifesteal(params, type, ignore_attacker, ignore_alive)
	if params.attacker ~= self and not ignore_attacker then
		return false
	end
	if self == params.unit then
		return
	end
	if not ignore_alive and (not self:IsAlive() or self:GetHealth() <= 0.5) then
		return
	end
	if not params.unit:IsUnit() or params.unit:IsIllusion() then
		return false
	end
	if params.unit:GetTeamNumber() == self:GetTeamNumber() then
		return false
	end
	if
		params.damage <= 0
		or bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION
	then
		return false
	end

	local inflictor = params.inflictor

	if type then
		if type == 1 and not inflictor then
			return false
		end
		if type == 2 and inflictor and not inflictor.attack_lifesteal then
			return false
		end
	end

	local result = params.unit:IsCreep() and LIFESTEAL_CREEPS_CUSTOM or 1
	return result
end

function CDOTA_BaseNPC:AddLifesteal(mod, data)
	if not IsValid(mod) then
		return
	end
	if self:IsIllusion() and not data.illusion then
		return
	end
	if not self.lifesteal_mods then
		self.lifesteal_mods = {}
		self.lifesteal_groups = { {}, {} }
	end
	if not self.lifesteal_mods[mod] then
		self.lifesteal_mods[mod] = {}
	end

	data.ability = data.ability or mod:GetAbility()
	data.amount = 0
	self.lifesteal_mods[mod][data.name or data.heal_unit or ""] = data
end

function CDOTA_BaseNPC:Lifesteal(params)
	if not self.lifesteal_mods then
		return 0
	end

	local result = 1
	if not params.dry then
		result = self:CheckLifesteal(params, nil, true, true)
		if not result then
			return
		end
	end

	local inflictor = params.inflictor
	local attack = not inflictor or inflictor.attack_lifesteal

	for _, group in pairs(self.lifesteal_groups) do
		group.unit = nil
		group.total = 0
		group.ability = nil
		group.text = false
		group.effect = false
		group.custom = nil
		group.custom_amount = 0
	end

	for mod, list in pairs(self.lifesteal_mods) do
		if IsValid(mod) then
			for name, data in pairs(list) do
				data.amount = 0
				if data.delete and data.delete() then
					list[name] = nil
				elseif
					(not params.dry or data.heal ~= false)
					and (not data.type or (data.type == 1 and inflictor) or (data.type == 2 and attack))
				then
					local value = data.value
					local hit_effect = nil
					local hit_text = nil
					if type(value) == "function" then
						value, hit_effect, hit_text = value(params)
					end
					if hit_effect == nil then
						hit_effect = data.effect
					end
					if hit_text == nil then
						hit_text = data.text
					end
					data.amount = value * result
					if data.amount > 0 then
						local group = self.lifesteal_groups[data.heal_unit and 2 or 1]
						group.unit = data.heal_unit or self
						if data.heal ~= false then
							group.total = group.total + data.amount
							group.ability = group.ability or data.ability
							group.text = group.text or hit_text == true
							group.effect = group.effect or hit_effect ~= false
							if type(hit_effect) == "string" and data.amount > group.custom_amount then
								group.custom = hit_effect
								group.custom_amount = data.amount
							end
						end
					end
				end
			end
		else
			self.lifesteal_mods[mod] = nil
		end
	end

	if not next(self.lifesteal_mods) then
		self.lifesteal_mods = nil
		return 0
	end

	if params.dry then
		return self.lifesteal_groups[1].total
	end

	for _, group in pairs(self.lifesteal_groups) do
		group.alive = IsValid(group.unit) and group.unit:IsAlive() and group.unit:GetHealth() > 0.5
		group.real_heal = 0
		if group.alive and group.total > 0 then
			local particle = ""
			if group.custom then
				particle = group.custom
			elseif group.effect then
				particle = inflictor and "particles/items3_fx/octarine_core_lifesteal.vpcf"
					or "particles/generic_gameplay/generic_lifesteal.vpcf"
			end
			group.real_heal =
				group.unit:GenericHeal(params.damage * group.total, group.ability, not group.text, particle, nil, true)
		end
		group.stats = group.real_heal >= 1
			and group.unit:IsRealHero()
			and not group.unit:IsTempestDouble()
			and IsValid(dota1x6.event_thinker_mod)
	end

	for mod, list in pairs(self.lifesteal_mods) do
		for _, data in pairs(list) do
			if data.amount > 0 then
				local group = self.lifesteal_groups[data.heal_unit and 2 or 1]
				local amount = 0
				if data.heal ~= false then
					amount = math.floor(group.real_heal * data.amount / group.total)
				end
				if group.alive and data.proc then
					mod[data.proc](mod, params, params.damage * data.amount, group.unit, amount, result)
				end
				if group.stats and amount >= 1 then
					dota1x6.event_thinker_mod:HealingTableCount(group.unit, amount, data.name, data.ability, "healing")
				end
			end
		end
	end
end

function CDOTA_BaseNPC:CanTeleport()
	if IsValid(self.tinker_innate) and self:HasScepter() and self:IsSilenced() then
		return false
	end

	local mods = {
		"modifier_custom_pudge_dismember_devour",
		"modifier_snapfire_mortimer_kisses_custom_gobble_caster",
		"modifier_custom_puck_phase_shift",
		--"modifier_pangolier_gyroshell_custom",
		"modifier_sniper_headshot_custom_legendary",
		"modifier_custom_void_dissimilate",
		"modifier_bane_nightmare_custom_legendary",
		"modifier_abaddon_borrowed_time_custom_legendary_caster",
	}

	if self:HasModifier("modifier_wind_waker") then
		return false
	end

	for _, name in pairs(mods) do
		if self:HasModifier(name) then
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(self:GetId()),
				"CreateIngameErrorMessage",
				{ message = "#cant_tp" }
			)
			return false
		end
	end

	return true
end

function CDOTA_BaseNPC:GetAllItems()
	local items = {}

	for i = 0, 20 do
		local current_item = self:GetItemInSlot(i)
		if (i <= 5 or i == 16) and current_item then
			table.insert(items, current_item)
		end
	end

	return items
end

function CDOTA_BaseNPC:GetId()
	local id = self:GetPlayerOwnerID()
	if self.owner then
		id = self.owner:GetPlayerOwnerID()
	end
	return id
end

function CDOTA_BaseNPC:CdItems(amount, talent)
	local removed = 0

	for i = 0, 8 do
		local current_item = self:GetItemInSlot(i)

		if current_item and not NoCdItems[current_item:GetName()] then
			local cd = current_item:GetCooldownTimeRemaining()
			removed = removed + math.min(cd, math.abs(amount))

			if test then
				print("before:", cd)
			end

			current_item:EndCooldown()

			if cd > math.abs(amount) then
				current_item:StartCooldown(cd - math.abs(amount))
			end

			if test then
				print("after:", current_item:GetCooldownTimeRemaining())
			end

			if test then
				print("------")
			end
		end
	end

	if talent and removed > 0 then
		match_log:Call("Proc", self, "cd", talent, removed)
	end
end

function CDOTA_BaseNPC:CdAbility(ability, amount, percent_cd, talent)
	local cd = ability:GetCooldownTime()
	if cd <= 0 then
		return
	end

	if percent_cd then
		local level = ability:IsItem() and 1 or ability:GetLevel()
		amount = ability:GetEffectiveCooldown(level) * percent_cd
	end

	local reduce_cd = math.abs(amount)

	if test then
		print("-----", ability:GetName())
		print(ability:GetCooldownTime())
	end

	ability:EndCooldown()
	if cd > reduce_cd then
		ability:StartCooldown(cd - reduce_cd)
	end

	if talent then
		match_log:Call("Proc", self, "cd", talent, math.min(cd, reduce_cd))
	end

	if test then
		print(ability:GetCooldownTime())
		print("-----")
	end

	return ability:GetCooldownTime() <= 0.1
end

function CDOTA_BaseNPC:IsStalkerNight()
	return not GameRules:IsDaytime()
		or self:HasModifier("modifier_night_stalker_darkness_custom_active")
		or self:HasModifier("modifier_night_stalker_darkness_custom_blind_flight")
end

function CDOTA_BaseNPC:BkbAbility(ability, pierce_bkb)
	if not IsServer() then
		return
	end

	local new_ability = ability
	if pierce_bkb and self:HasAbility("custom_bkb_effects") then
		new_ability = self:FindAbilityByName("custom_bkb_effects")
	end

	return new_ability
end

function CDOTA_BaseNPC:ApplyStun(ability, pierce_bkb, caster, duration)
	if not IsServer() then
		return
	end

	local stun_ability = ability
	if pierce_bkb and caster:HasAbility("custom_bkb_effects") then
		stun_ability = caster:FindAbilityByName("custom_bkb_effects")
	end

	self:AddNewModifier(
		caster,
		stun_ability,
		"modifier_stunned",
		{ duration = duration * (1 - self:GetStatusResistance()) }
	)
end

function CDOTA_BaseNPC:GetAllStats()
	return self:GetStrength() + self:GetAgility() + self:GetIntellect(false)
end

function CDOTA_BaseNPC:SendNumber(type, number)
	local real_number = math.floor(number)
	if real_number <= 0 then
		return
	end

	local custom_effect = nil
	local player = nil
	if type == 0 then
		player = PlayerResource:GetPlayer(self:GetId())
	end

	local type_table = {
		[100] = "particles/units/heroes/hero_kez/kez_damage_numbers.vpcf",
		[101] = "particles/slark/dance_bleed_number.vpcf",
		[102] = "particles/night_stalker/void_legendary_number.vpcf",
		[103] = "particles/night_stalker/dark_bleed_number.vpcf",
		[104] = "particles/leshrac/nova_legendary_number.vpcf",
		[105] = "particles/lina/lina_laguna_number.vpcf",
		[106] = "particles/mars/spear_delay_number.vpcf",
		[107] = "particles/muerta/shot_legendary_damage.vpcf",
		[108] = "particles/nature_prophet/teleport_legendary_number.vpcf",
		[109] = "particles/ogre_magi/fireblast_number.vpcf",
		[110] = "particles/pangolier/swashbuckle_bleed_number.vpcf",
		[111] = "particles/kunkka/xmark_bleed_number.vpcf",
		[112] = "particles/phantom_assassin/crit_bleed.vpcf",
		[113] = "particles/phantom_assassin/phantom_proc_number.vpcf",
		[114] = "particles/primal_beast/trample_crit_number.vpcf",
		[115] = "particles/items4_fx/serrated_shiv_numbers.vpcf",
		[116] = "particles/puck/orb_legendary_number.vpcf",
	}

	if type_table[type] then
		local count = #tostring(real_number) + 1
		local effect = ParticleManager:CreateParticle(type_table[type], PATTACH_CUSTOMORIGIN_FOLLOW, self)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			self,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControl(effect, 1, Vector(0, real_number, 4))
		ParticleManager:SetParticleControl(effect, 2, Vector(1, count, 0))
		ParticleManager:ReleaseParticleIndex(effect)
		return
	end

	SendOverheadEventMessage(player, type, self, real_number, nil)
end

function CDOTA_BaseNPC:GetHealChange()
	local heal_change = 1
	for mod, bkb in pairs(self.heal_reduce_mods) do
		if IsValid(mod) and mod.GetModifierHealChange then
			local result = mod:GetModifierHealChange()
			if result and (bkb == 1 or not self:IsDebuffImmune() or result > 0) then
				heal_change = heal_change * (1 + result / 100)
			end
		else
			self.heal_reduce_mods[mod] = nil
		end
	end

	return heal_change
end

function CDOTA_BaseNPC:GetItemDamage()
	local item_damage = 0
	for mod in pairs(self.item_damage_mods) do
		if IsValid(mod) then
			item_damage = item_damage + (mod:GetItemDamage() or 0)
		else
			self.item_damage_mods[mod] = nil
		end
	end

	return item_damage
end

function CDOTA_BaseNPC:GetCritDamageBonus()
	local crit_bonus = 0
	for mod in pairs(self.crit_damage_mods) do
		if IsValid(mod) then
			crit_bonus = math.max(crit_bonus, mod:GetCritDamageBonus() or 0)
		else
			self.crit_damage_mods[mod] = nil
		end
	end

	return crit_bonus
end

function CDOTA_BaseNPC:AddUniqueStat(mod, ...)
	if not self.unique_stats then
		self.unique_stats = {}
	end
	for _, name in pairs({ ... }) do
		if not self.unique_stats[name] then
			self.unique_stats[name] = {}
		end
		self.unique_stats[name][mod] = true
	end
end

function CDOTA_BaseNPC:UniqueStat(mod, name)
	local best
	local best_value = 0
	for item_mod in pairs(self.unique_stats[name]) do
		if IsValid(item_mod) then
			local value = item_mod:GetUniqueStat(name) or 0
			if value > best_value then
				best = item_mod
				best_value = value
			end
		else
			self.unique_stats[name][item_mod] = nil
		end
	end

	if best ~= mod then
		return
	end
	return best_value
end

function CDOTA_BaseNPC:GenericHeal(heal, ability, no_text, effect, talent_name, no_info)
	if not IsServer() then
		return
	end

	local health_before = self:GetHealth()

	if
		self:IsRealHero()
		and self.heal_reduce_mods
		and (not self.heal_check_timer or (GameRules:GetDOTATime(false, false) - self.heal_check_timer) > 1)
	then
		self.heal_check_timer = GameRules:GetDOTATime(false, false)
		self.heal_change = self:GetHealChange()
	end

	self:Heal(heal * (self.heal_change and self.heal_change or 1), ability)
	local real_heal = self:GetHealth() - health_before

	if ability and real_heal >= 1 and not no_info then
		self:AddHealingInfo({ healing = math.floor(real_heal), inflictor = ability, name = talent_name })
	end

	local part = "particles/generic_gameplay/generic_lifesteal.vpcf"

	if effect then
		part = effect
	end

	local particle = ParticleManager:CreateParticle(part, PATTACH_ABSORIGIN_FOLLOW, self)
	ParticleManager:ReleaseParticleIndex(particle)

	if not no_text or no_text == false then
		SendOverheadEventMessage(self, 10, self, real_heal, nil)
	end

	return real_heal
end

function CDOTA_BaseNPC:AddShieldInfo(params)
	if not self:IsRealHero() or self:IsTempestDouble() then
		return
	end

	local shield_mod = params.shield_mod
	local inflictor = shield_mod:GetAbility()
	local new_name = shield_mod.shield_talent and shield_mod.shield_talent or nil

	if not IsValid(dota1x6.event_thinker_mod) then
		return
	end

	local callback = function()
		if IsValid(self) then
			dota1x6.event_thinker_mod:HealingTableCount(self, params.healing, new_name, inflictor, "shield")
		end
	end
	dota1x6.event_thinker_mod:StartThink(callback, dota1x6.event_thinker_mod, "HealingTableCount")
end

function CDOTA_BaseNPC:AddHealingInfo(params)
	if not self:IsRealHero() or self:IsTempestDouble() then
		return
	end
	if not IsValid(dota1x6.event_thinker_mod) then
		return
	end

	local callback = function()
		if IsValid(self) then
			dota1x6.event_thinker_mod:HealingTableCount(self, params.healing, params.name, params.inflictor, "healing")
		end
	end
	dota1x6.event_thinker_mod:StartThink(callback, dota1x6.event_thinker_mod, "HealingTableCount")
end

function CDOTA_BaseNPC:AddResourceInfo(resource_type, source, amount)
	if not resource_type then
		return
	end
	if not source then
		return
	end
	if not IsValid(dota1x6.event_thinker_mod) then
		return
	end

	local callback = function()
		if IsValid(self) then
			dota1x6.event_thinker_mod:ResourceTableCount(self, resource_type, source, amount)
		end
	end
	dota1x6.event_thinker_mod:StartThink(callback, dota1x6.event_thinker_mod, "ResourceTableCount")
end

function CDOTA_BaseNPC:SetQuest(table)
	self.quest = {}
	self.quest.name = table.name and table.name or ""
	self.quest.exp = table.exp and table.exp or 0
	self.quest.shards = table.shards and table.shards or 0
	self.quest.icon = table.icon and table.icon or ""
	self.quest.goal = table.goal and table.goal or 0
	self.quest.number = table.number and table.number or 0
	self.quest.legendary = table.legendary
	self.quest.progress = 0
	self.quest.completed = 0

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "hero_quest_init", {
		name = self.quest.name,
		exp = self.quest.exp,
		shards = self.quest.shards,
		icon = self.quest.icon,
		goal = self.quest.goal,
		legendary = self.quest.legendary,
	})

	self:AddNewModifier(self, nil, "modifier_quest_logic", {})
end

function CDOTA_BaseNPC:UpdateQuest(inc, reset)
	if not self.quest then
		return
	end
	if inc == nil then
		return
	end

	if self.quest.completed == 1 then
		return
	end

	self.quest.progress = math.min(self.quest.goal, (self.quest.progress + inc))
	if reset then
		self.quest.progress = 0
	end

	if self.quest.progress >= self.quest.goal then
		self.quest.completed = 1
		self:RemoveModifierByName("modifier_quest_logic")

		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "hero_quest_complete", {})
	else
		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "hero_quest_update", {
			goal = self.quest.goal,
			progress = self.quest.progress,
			icon = self.quest.icon,
			inc = inc,
		})
	end
end

function CDOTA_BaseNPC:QuestCompleted()
	local complete = false

	if self.quest and self.quest.completed == 1 then
		complete = true
	end

	return complete
end

function CDOTA_BaseNPC:GetQuest()
	local name = nil

	if self.quest and self.quest.name then
		name = self.quest.name
	end

	return name
end

function CDOTA_BaseNPC:IsControlled()
	return self:IsCurrentlyHorizontalMotionControlled() or self:IsCurrentlyVerticalMotionControlled()
end

function CDOTA_BaseNPC:IsPatrolCreep()
	if
		self:GetUnitName() == "patrol_melee_good"
		or self:GetUnitName() == "patrol_range_good"
		or self:GetUnitName() == "patrol_melee_bad"
		or self:GetUnitName() == "patrol_range_bad"
	then
		return true
	end

	return false
end

function CDOTA_Ability_Lua:AddCharge(count, particle, sound)
	local charges = self:GetCurrentAbilityCharges()
	local max_charges = self:GetMaxAbilityCharges(self:GetLevel())
	local caster = self:GetCaster()

	if charges >= max_charges then
		return false
	end

	if particle then
		local effect = ParticleManager:CreateParticle(particle, PATTACH_CUSTOMORIGIN, caster)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			caster:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect)
	end

	if sound then
		caster:EmitSound(sound)
	end

	for i = 1, count do
		local current = self:GetCurrentAbilityCharges()

		if current < max_charges - 1 then
			self:SetCurrentAbilityCharges(current + 1)
		else
			self:RefreshCharges()
			break
		end
	end

	return true
end

function CDOTA_Item:EndCd(new_cd)
	self.need_reset_cd = false
	self:EndCooldown()

	if new_cd then
		self:StartCooldown(new_cd)
	else
		self:SetActivated(false)
	end
end

function CDOTABaseAbility:EndCd(new_cd)
	self.need_reset_cd = false
	self:EndCooldown()

	if new_cd then
		self:StartCooldown(new_cd)
	else
		self:SetActivated(false)
	end
end

function CDOTA_Ability_Lua:EndCd(new_cd)
	self.need_reset_cd = false
	self:EndCooldown()

	if new_cd then
		self:StartCooldown(new_cd)
	else
		self:SetActivated(false)
	end
end

function CDOTA_Ability_Lua:StartCd()
	self:SetActivated(true)

	if self.need_reset_cd then
		self.need_reset_cd = false
		return
	end
	self:UseResources(false, false, false, true)
	match_log:Call("Proc", self:GetCaster(), "cds", self:GetAbilityName(), self:GetCooldownTimeRemaining())
end

function CDOTA_Item:StartCd()
	self:SetActivated(true)

	if self.need_reset_cd then
		self.need_reset_cd = false
		return
	end
	self:UseResources(false, false, false, true)
end

function CDOTA_BaseNPC:GenericParticle(name, mod, head, points)
	local pattach = PATTACH_ABSORIGIN_FOLLOW
	if head then
		pattach = PATTACH_OVERHEAD_FOLLOW
	end

	local particle = ParticleManager:CreateParticle(name, pattach, self)
	ParticleManager:SetParticleControl(particle, 0, self:GetAbsOrigin())

	if points then
		for _, point in pairs(points) do
			ParticleManager:SetParticleControl(particle, point, self:GetAbsOrigin())
		end
	end

	if not mod then
		--ParticleManager:DestroyParticle( particle, false )
		ParticleManager:ReleaseParticleIndex(particle)
	else
		mod:AddParticle(particle, false, false, -1, false, false)
	end

	return particle
end

function CDOTA_BaseNPC:NearTower(point)
	local search_point = self:GetAbsOrigin()
	if point then
		search_point = point
	end

	local towers = FindUnitsInRadius(
		self:GetTeamNumber(),
		search_point,
		nil,
		1000,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BUILDING,
		DOTA_UNIT_TARGET_FLAG_NONE,
		FIND_CLOSEST,
		false
	)

	for _, tower in pairs(towers) do
		if tower:GetUnitName() == "npc_towerdire" or tower:GetUnitName() == "npc_towerradiant" then
			return true
		end
	end
	return false
end

function CDOTA_BaseNPC:PullTarget(target, ability, duration, is_stun, fix_dist, no_anim, min_dist)
	local origin = self:GetAbsOrigin()
	local target_loc = target:GetAbsOrigin()
	local dir = (origin - target_loc):Normalized()
	local min = 200
	local activity = ACT_DOTA_FLAIL
	if no_anim then
		activity = nil
	end

	local point = origin - dir:Normalized() * min
	if fix_dist then
		point = target_loc + dir:Normalized() * fix_dist
	end

	local distance = (point - target_loc):Length2D()

	if min_dist and distance > min_dist then
		point = target_loc + dir:Normalized() * min_dist
		distance = min_dist
	end

	if (target_loc - origin):Length2D() <= min then
		point = target_loc
		distance = 0
	end

	local mod = target:AddNewModifier(self, ability, "modifier_generic_arc", {
		target_x = point.x,
		target_y = point.y,
		distance = distance,
		duration = duration,
		height = 0,
		fix_end = false,
		isStun = is_stun,
		activity = activity,
	})
end

function CDOTA_BaseNPC:CheckBlink(params, ability)
	if not ability.break_duration then
		return
	end
	if self ~= params.unit then
		return
	end
	if bit.band(params.damage_flags, DOTA_DAMAGE_FLAG_REFLECTION) == DOTA_DAMAGE_FLAG_REFLECTION then
		return
	end

	local attacker = params.attacker

	if self:GetTeamNumber() == attacker:GetTeamNumber() then
		return
	end
	if not players[attacker:GetId()] and not attacker:IsBuilding() then
		return
	end

	--if params.damage < 5 then return end
	self:AddNewModifier(self, nil, "modifier_blink_break_custom", { duration = ability.break_duration })
end

function CDOTA_BaseNPC:UpdateUIshort(params)
	match_log:Call("Bar", self, params)

	local hide = params.hide and params.hide or 0
	local style = params.style and params.style or ""
	local priority = params.priority and params.priority or 0

	if self.current_ui_short == nil then
		self.current_ui_short = {}
	else
		if self.current_ui_short.style ~= style and self.current_ui_short.priority >= priority then
			return
		end
	end
	self.current_ui_short.style = style
	self.current_ui_short.priority = priority

	if hide == 1 then
		self.current_ui_short = nil
	end

	local time = params.time and params.time or 0
	local max_time = params.max_time and params.max_time or 1
	local stack = params.stack and params.stack or -1
	local hide_full = params.hide_full and params.hide_full or 0
	local active = params.active and params.active or 0
	local use_zero = params.use_zero and params.use_zero or 0
	local stack_icon_zero = params.stack_icon_zero and params.stack_icon_zero or 0
	local stack_icon = params.stack_icon and params.stack_icon or -1
	local dots = params.dots and params.dots or -1
	local override_ability = params.override_ability and params.override_ability or -1
	local top_text = params.top_text and params.top_text or -1
	local glow = params.glow and params.glow or 0

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "talent_ui_short", {
		hide = hide,
		dots = dots,
		stack_icon = stack_icon,
		stack_icon_zero = stack_icon_zero,
		use_zero = use_zero,
		active = active,
		hide_full = hide_full,
		max_time = max_time,
		time = time,
		stack = stack,
		override_ability = override_ability,
		style = style,
		top_text = top_text,
		glow = glow,
	})
end

function CDOTA_BaseNPC:UpdateUIlong(params)
	match_log:Call("Bar", self, params)

	if params.special_event then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self:GetId()),
			params.special_event,
			params.special_data
		)
		return
	end

	local style = params.style and params.style or ""
	local priority = params.priority and params.priority or 0
	local max = params.max and params.max or 1
	local stack = params.stack and params.stack or 0
	local no_min = params.no_min and params.no_min or false
	local override_stack = params.override_stack and params.override_stack or -1
	local hide_number = params.hide_number and params.hide_number or false
	local stack_icon = params.stack_icon and params.stack_icon or -1
	local active = params.active and params.active or -1
	local hide = params.hide and params.hide or 0
	local use_zero = params.use_zero and params.use_zero or 0
	local glow = params.glow and params.glow or false

	if self.current_ui_long == nil then
		self.current_ui_long = {}
	elseif self.current_ui_long.style ~= style and self.current_ui_long.priority > priority then
		return
	end
	self.current_ui_long.style = style
	self.current_ui_long.priority = priority

	if hide == 1 then
		self.current_ui_long = nil
	end

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "talent_ui_long", {
		style = style,
		use_zero = use_zero,
		hide = hide,
		active = active,
		stack = stack,
		max = max,
		hide_number = hide_number,
		no_min = no_min,
		override_stack = override_stack,
		glow = glow,
		stack_icon = stack_icon,
		special_data = special_data,
	})
end

function CDOTA_BaseNPC:UpdateUIpick(params)
	if params.hide == 1 then
		self.pick_mod = nil
		CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "pick_ui", { hide = 1 })
		return
	end

	self.pick_mod = params.mod

	local targets = {}

	for i, data in pairs(params.targets) do
		targets[i] = {
			image = data.image and data.image or ("file://{images}/heroes/" .. data.hero .. ".png"),
			killed = data.killed and 1 or 0,
			gold = data.gold and math.floor(data.gold) or 0,
		}
	end

	CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(self:GetId()), "pick_ui", {
		hide = 0,
		text = params.text and params.text or "#pick_ui_text",
		targets = targets,
	})
end

function CDOTA_BaseNPC:AddOrderEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() or self:IsTempestDouble() then
		return
	end
	if not self.order_mods then
		self.order_mods = {}
	else
		for mod, _ in pairs(self.order_mods) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.order_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddOrderFilter(new_mod)
	if not IsValid(new_mod) then
		return
	end
	if not self.order_filters then
		self.order_filters = {}
	end
	self.order_filters[new_mod] = true
end

function CDOTA_BaseNPC:AddSpellStartEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end

	for mod, _ in pairs(spell_start_mods) do
		if mod and not mod:IsNull() and mod == new_mod then
			return
		end
	end
	spell_start_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddSpellEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end

	for mod, _ in pairs(spell_cast_mods) do
		if mod and not mod:IsNull() and mod == new_mod then
			return
		end
	end
	spell_cast_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddRespawnEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end

	if not self.respawn_event_mods then
		self.respawn_event_mods = {}
	else
		for mod, _ in pairs(self.respawn_event_mods) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.respawn_event_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddStateEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end

	if not self.state_event_mods then
		self.state_event_mods = {}
	else
		for mod, _ in pairs(self.state_event_mods) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.state_event_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddModelEvent(new_mod)
	if not IsValid(new_mod) then
		return
	end
	if not self.model_event_mods then
		self.model_event_mods = {}
	end
	self.model_event_mods[new_mod] = true
end

function CDOTA_BaseNPC:AddDeathEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end

	for mod, _ in pairs(death_mods) do
		if mod and not mod:IsNull() and mod == new_mod then
			return
		end
	end
	death_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackEvent_out(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end
	if not self.attack_landed_mods_out then
		self.attack_landed_mods_out = {}
	else
		for mod, _ in pairs(self.attack_landed_mods_out) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_landed_mods_out[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackEvent_inc(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end

	if not self.attack_landed_mods_inc then
		self.attack_landed_mods_inc = {}
	else
		for mod, _ in pairs(self.attack_landed_mods_inc) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_landed_mods_inc[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackRecordEvent_out(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.attack_record_mods_out then
		self.attack_record_mods_out = {}
	else
		for mod, _ in pairs(self.attack_record_mods_out) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_record_mods_out[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackFailEvent_out(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.attack_fail_mods_out then
		self.attack_fail_mods_out = {}
	else
		for mod, _ in pairs(self.attack_fail_mods_out) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_fail_mods_out[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackFailEvent_inc(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.attack_fail_mods_inc then
		self.attack_fail_mods_inc = {}
	else
		for mod, _ in pairs(self.attack_fail_mods_inc) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_fail_mods_inc[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackRecordEvent_inc(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.attack_record_mods_inc then
		self.attack_record_mods_inc = {}
	else
		for mod, _ in pairs(self.attack_record_mods_inc) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_record_mods_inc[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackCreateEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.attack_create_mods then
		self.attack_create_mods = {}
	else
		for mod, _ in pairs(self.attack_create_mods) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_create_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddRecordDestroyEvent(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.record_destroy_mods then
		self.record_destroy_mods = {}
	else
		for mod, _ in pairs(self.record_destroy_mods) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.record_destroy_mods[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackStartEvent_out(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end
	if not self.attack_start_mods_out then
		self.attack_start_mods_out = {}
	else
		for mod, _ in pairs(self.attack_start_mods_out) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_start_mods_out[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddAttackStartEvent_inc(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.attack_start_mods_inc then
		self.attack_start_mods_inc = {}
	else
		for mod, _ in pairs(self.attack_start_mods_inc) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.attack_start_mods_inc[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddProc(mod, data, inherited)
	if not IsValid(mod) then
		return
	end
	if self:IsIllusion() and not inherited then
		return
	end
	if not self.proc_mods then
		self.proc_mods = {}
		self.proc_records = {}
		self.proc_landed = {}
		self.proc_landed_property = {}
		self.proc_damaged = {}
	end

	data.mod = mod
	data.group = data.group or mod:GetName() .. (data.name and "_" .. data.name or "")
	data.name = data.name or "default"
	data.cd_name = data.cd_name or "proc_" .. mod:GetName() .. "_" .. data.name
	data.priority = data.priority or 0
	self.proc_mods[mod] = self.proc_mods[mod] or {}
	self.proc_mods[mod][data.name] = data
	if data.illusion then
		self.proc_version = (self.proc_version or 0) + 1
	end

	local meta = getmetatable(mod)
	local class = type(meta) == "table" and rawget(meta, "__index")
	if type(class) == "table" and not rawget(class, "proc_wrapped") then
		rawset(class, "proc_wrapped", true)
		local destroy = class.OnDestroy
		rawset(class, "OnDestroy", function(obj, ...)
			local parent = obj:GetParent()
			if parent and parent.proc_mods and parent.proc_mods[obj] then
				parent.proc_mods[obj] = nil
				parent:UpdateProcs(true)
			end
			if destroy then
				return destroy(obj, ...)
			end
		end)
	end

	if not inherited then
		self:UpdateProcs()
	end
	return data
end

function CDOTA_BaseNPC:InheritProcs()
	local owner = self.owner
	if not owner.proc_version then
		return
	end
	if self.is_arc_tempest or self.is_monkey_soldier then
		return
	end
	if self.proc_owner_version == owner.proc_version then
		return
	end

	self.proc_owner_version = owner.proc_version
	for mod, list in pairs(owner.proc_mods) do
		for _, data in pairs(list) do
			if data.illusion and IsValid(mod) then
				local copy = {}
				for key, value in pairs(data) do
					copy[key] = value
				end
				copy.armed = nil
				copy.armed_until = nil
				self:AddProc(mod, copy, true)
			end
		end
	end

	if self.proc_mods then
		self:UpdateProcs()
	end
end

function CDOTA_BaseNPC:IsProc(mod, record, name)
	local procs = self.proc_records and self.proc_records[record]
	return procs ~= nil and procs[mod] ~= nil and procs[mod][name or "default"] == true
end

function CDOTA_BaseNPC:RollAttackProc(data, params)
	if data.cd == true and params and not data.mod:GetAbility():IsFullyCastable() then
		return false
	end
	if type(data.cd) == "number" and self:HasCd(data.cd_name, data.cd) then
		return false
	end
	if data.target_cd and params and params.target:HasCd(data.cd_name, data.target_cd) then
		return false
	end
	local chance = data.mod:GetProcChance(params, data.name)
	if not chance or chance <= 0 then
		return false
	end
	if chance >= 100 then
		return true
	end

	local unit = self
	if data.target_prd then
		unit = params.target
	elseif data.prd_owner and IsValid(self.owner) then
		unit = self.owner
	end
	return RollPseudoRandomPercentage(chance, data.group, unit)
end

function CDOTA_BaseNPC:ArmProc(data)
	data.armed = self:RollAttackProc(data)
	data.armed_until = GameRules:GetDOTATime(false, false) + 3
end

function CDOTA_BaseNPC:UpdateUnmiss()
	self.proc_unmiss = 0
	for _, data in ipairs(self.proc_active) do
		if data.accuracy and not data.current and data.armed then
			self.proc_unmiss = math.max(self.proc_unmiss, data.armed_until)
		end
	end
end

function CDOTA_BaseNPC:UseAttackProc(data, procs, params)
	if not procs then
		procs = self.proc_records[params.record] or {}
		self.proc_records[params.record] = procs
	end
	procs[data.mod] = procs[data.mod] or {}
	procs[data.mod][data.name] = true
	if data.cd == true then
		for mod, list in pairs(self.proc_mods) do
			if
				IsValid(mod)
				and list[data.name]
				and list[data.name].cd == true
				and mod:GetName() == data.mod:GetName()
			then
				mod:GetAbility():StartCd()
			end
		end
	elseif data.cd then
		self:StartCd(data.cd_name)
	end
	if data.target_cd then
		params.target:StartCd(data.cd_name)
	end
	if data.once then
		self.proc_mods[data.mod][data.name] = nil
		self.proc_dirty = true
	end
	return procs
end

function CDOTA_BaseNPC:UpdateProcs(removing)
	self.proc_dirty = nil

	local best = {}
	for mod, list in pairs(self.proc_mods) do
		if not IsValid(mod) then
			self.proc_mods[mod] = nil
		else
			for _, data in pairs(list) do
				if not best[data.group] or best[data.group].priority < data.priority then
					best[data.group] = data
				end
			end
		end
	end

	local accuracy = false
	self.proc_current = false
	self.proc_strike = false
	self.proc_ally = false
	self.proc_land = false
	self.proc_launch = false
	self.proc_damage = false
	self.proc_active = {}
	for _, data in pairs(best) do
		table.insert(self.proc_active, data)
		if data.ally then
			self.proc_ally = true
		end
		if data.current then
			self.proc_current = true
			self.proc_launch = true
			if data.strike then
				self.proc_strike = true
			end
		elseif data.damage then
			self.proc_damage = true
		elseif data.land then
			self.proc_land = true
		else
			self.proc_launch = true
			if data.accuracy then
				accuracy = true
				if data.armed == nil then
					self:ArmProc(data)
				end
			end
		end
	end
	self.proc_has_accuracy = accuracy
	self:UpdateUnmiss()

	if accuracy and not removing and not IsValid(self.proc_accuracy) then
		self.proc_accuracy = self:AddNewModifier(self, nil, "modifier_proc_accuracy", {})
	elseif not accuracy and IsValid(self.proc_accuracy) then
		self.proc_accuracy:Destroy()
	end

	if not self.proc_current and IsValid(self.proc_swing) then
		self.proc_swing:Destroy()
	end
end

function CDOTA_BaseNPC:AttackSwingProcs(params)
	self.proc_perform = nil
	if self.proc_dirty then
		self:UpdateProcs()
	end
	local ally = params.target:GetTeamNumber() == self:GetTeamNumber()
	if ally and not self.proc_ally then
		return
	end

	local unit = params.target:IsUnit()
	local unmiss = false
	for _, data in ipairs(self.proc_active) do
		if data.current and IsValid(data.mod) then
			if (data.any or unit) and (not ally or data.ally) then
				data.armed = self:RollAttackProc(data, params)
			end
			unmiss = unmiss or (data.accuracy and data.armed)
		end
	end

	if unmiss and not IsValid(self.proc_swing) then
		self.proc_swing = self:AddNewModifier(self, nil, "modifier_proc_accuracy_swing", {})
	elseif not unmiss and IsValid(self.proc_swing) then
		self.proc_swing:Destroy()
	end
end

function CDOTA_BaseNPC:StrikeReady(target)
	local ally = target:GetTeamNumber() == self:GetTeamNumber()
	if ally and not self.proc_ally then
		return false
	end
	local unit = target:IsUnit()
	for _, data in ipairs(self.proc_active) do
		if
			data.strike
			and IsValid(data.mod)
			and (data.any or unit)
			and (not ally or data.ally)
			and self:RollAttackProc(data, { target = target })
		then
			return true
		end
	end
	return false
end

function CDOTA_BaseNPC:EndProcSwing()
	if self.proc_perform then
		return
	end
	if not IsValid(self.proc_swing) then
		return
	end
	for _, data in ipairs(self.proc_active) do
		if data.current and data.accuracy and data.armed and IsValid(data.mod) then
			return
		end
	end
	self.proc_swing:Destroy()
end

function CDOTA_BaseNPC:AttackProcs(params)
	if self.proc_dirty then
		self:UpdateProcs()
	end
	if not self.proc_launch then
		return
	end

	local ally = params.target:GetTeamNumber() == self:GetTeamNumber()
	if ally and not self.proc_ally then
		return
	end
	local unit = params.target:IsUnit()
	local now = GameRules:GetDOTATime(false, false)
	local procs = nil
	for _, data in ipairs(self.proc_active) do
		if not IsValid(data.mod) then
			self.proc_dirty = true
		elseif data.current then
			if (data.any or unit) and (not ally or data.ally) then
				if data.strike and (params.no_attack_cooldown or self.proc_perform) then
					if self:RollAttackProc(data, params) then
						procs = self:UseAttackProc(data, procs, params)
					end
					data.armed = false
				elseif data.extra or not params.no_attack_cooldown then
					if data.armed and (not data.strike or self:RollAttackProc(data, params)) then
						procs = self:UseAttackProc(data, procs, params)
					end
					data.armed = false
				end
			end
		elseif
			(data.extra ~= false or not params.no_attack_cooldown)
			and (data.any or unit)
			and (not ally or data.ally)
		then
			if data.accuracy then
				if
					data.armed
					and now < data.armed_until
					and (data.cd ~= true or data.mod:GetAbility():IsFullyCastable())
				then
					procs = self:UseAttackProc(data, procs, params)
				end
				self:ArmProc(data)
			elseif not data.land and not data.damage and self:RollAttackProc(data, params) then
				procs = self:UseAttackProc(data, procs, params)
			end
		end
	end
	if self.proc_has_accuracy then
		self:UpdateUnmiss()
	end
	self:EndProcSwing()

	return procs
end

function CDOTA_BaseNPC:LandProcs(params, property)
	if not self.proc_land then
		return
	end
	local ally = params.target:GetTeamNumber() == self:GetTeamNumber()
	if ally and not self.proc_ally then
		return
	end
	local landed = property and self.proc_landed_property or self.proc_landed
	if landed[params.record] then
		return
	end
	landed[params.record] = true
	if self.proc_dirty then
		self:UpdateProcs()
	end

	local unit = params.target:IsUnit()
	local procs = nil
	for _, data in ipairs(self.proc_active) do
		if
			data.land
			and (data.property == true) == (property == true)
			and IsValid(data.mod)
			and (data.extra ~= false or not params.no_attack_cooldown)
			and (data.any or unit)
			and (not ally or data.ally)
			and self:RollAttackProc(data, params)
		then
			procs = self:UseAttackProc(data, procs, params)
		end
	end
end

function CDOTA_BaseNPC:DamageProcs(params)
	if params.inflictor then
		return
	end
	if not params.record then
		return
	end
	local target = params.unit
	local ally = target:GetTeamNumber() == self:GetTeamNumber()
	if ally and not self.proc_ally then
		return
	end
	if self.proc_damaged[params.record] then
		return
	end
	self.proc_damaged[params.record] = true
	if self.proc_dirty then
		self:UpdateProcs()
	end

	params.target = target
	local unit = target:IsUnit()
	local procs = nil
	local fired = nil
	for _, data in ipairs(self.proc_active) do
		if
			data.damage
			and IsValid(data.mod)
			and (data.any or unit)
			and (not ally or data.ally)
			and self:RollAttackProc(data, params)
		then
			procs = self:UseAttackProc(data, procs or {}, params)
			fired = fired or {}
			table.insert(fired, data)
		end
	end
	return procs, fired
end

function CDOTA_BaseNPC:AddDamageEvent_out(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if self:IsIllusion() then
		return
	end
	if not self.take_damage_mods_out then
		self.take_damage_mods_out = {}
	else
		for mod, _ in pairs(self.take_damage_mods_out) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.take_damage_mods_out[new_mod] = sync and 2 or 1
end

function CDOTA_BaseNPC:AddDamageEvent_inc(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.take_damage_mods_inc then
		self.take_damage_mods_inc = {}
	else
		for mod, _ in pairs(self.take_damage_mods_inc) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.take_damage_mods_inc[new_mod] = sync and 2 or 1
end

_G.heal_event_mods = heal_event_mods or {}

function CDOTA_BaseNPC:AddHealEvent_inc(new_mod, sync)
	if not IsValid(new_mod) then
		return
	end
	if not self.heal_mods_inc then
		self.heal_mods_inc = {}
	else
		for mod, _ in pairs(self.heal_mods_inc) do
			if mod and not mod:IsNull() and mod == new_mod then
				return
			end
		end
	end
	self.heal_mods_inc[new_mod] = sync and 2 or 1
	heal_event_mods[new_mod] = true

	if IsValid(dota1x6.event_thinker) and not dota1x6.event_thinker:HasModifier("modifier_event_thinker_heal") then
		dota1x6.event_thinker:AddNewModifier(dota1x6.event_thinker, nil, "modifier_event_thinker_heal", {})
	end
end

function CDOTA_BaseNPC:AddPercentStat(stats, mod)
	if not IsValid(mod) then
		return
	end
	local tracker = self:FindModifierByName("modifier_player_main_custom")
	if not tracker then
		return
	end

	local data = { int = 0, agi = 0, str = 0 }
	if self.stat_mods and self.stat_mods[mod] then
		data = self.stat_mods[mod]
	end
	local update = false
	if stats.agi and stats.agi ~= data.agi then
		data.agi = stats.agi
		update = true
	end
	if stats.str and stats.str ~= data.str then
		data.str = stats.str
		update = true
	end
	if stats.int and stats.int ~= data.int then
		data.int = stats.int
		update = true
	end

	if not update then
		return
	end

	if not self.stat_mods then
		self.stat_mods = {}
	end

	self.stat_mods[mod] = data
	tracker:OnIntervalThink()
end

function CDOTA_BaseNPC:AbilityAttack(attack_flag)
	local ability = nil
	local attacker = self
	if self.owner and self.owner:IsRealHero() then
		attacker = self.owner
	end

	if attack_flag and attack_mods[attacker:GetUnitName()] and attack_mods[attacker:GetUnitName()][attack_flag] then
		return attack_mods[attacker:GetUnitName()][attack_flag]
	end

	for name, talent in pairs(attack_mods["general"]) do
		if self:HasModifier(name) then
			local mod = self:FindModifierByName(name)
			if IsValid(mod) and IsValid(mod:GetAbility()) then
				ability = mod:GetAbility():GetName()
			end
			break
		end
	end

	if ability == nil and attack_mods[attacker:GetUnitName()] then
		for name, talent in pairs(attack_mods[attacker:GetUnitName()]) do
			if self:HasModifier(name) then
				local mod = self:FindModifierByName(name)
				if IsValid(mod, mod:GetAbility()) then
					ability = mod:GetAbility():GetName()
					local new_talent

					if name == "modifier_custom_terrorblade_reflection_unit" then
						local mod = self:FindModifierByName("modifier_custom_terrorblade_reflection_unit")
						if mod.double and mod.double == 1 then
							ability = "modifier_terror_reflection_4"
						end
					elseif
						name == "modifier_conjure_image_custom_illusion_basic"
						and self:HasModifier("modifier_conjure_image_custom_legendary_illusion_mod")
					then
						ability = "modifier_terror_illusion_7"
					elseif
						name == "modifier_arc_warden_tempest_double_custom"
						and self:HasModifier("modifier_arc_warden_tempest_double_custom_auto_damage")
					then
						ability = "modifier_arc_warden_double_3"
					elseif name == "modifier_witch_doctor_death_ward_custom_unit" then
						if mod.is_wd_ward_auto then
							ability = "modifier_witch_doctor_deathward_3"
						elseif mod.is_wd_ward_shard then
							ability = "shard"
						end
					elseif name == "modifier_hoodwink_acorn_shot_custom" then
						if mod.is_auto == 1 then
							ability = "modifier_hoodwink_acorn_3"
						end
						if mod.is_scepter == 1 then
							ability = "scepter"
						end
					elseif name == "modifier_custom_juggernaut_omnislash_attack" then
						if mod.is_auto then
							ability = "modifier_juggernaut_omnislash_3"
						end
					elseif name == "modifier_zuus_arc_lightning_custom_legendary_damage" and mod.damage_ability then
						ability = mod.damage_ability
					elseif name == "modifier_morphling_replicate_custom_attack_proc_damage" and mod.double == 1 then
						new_talent = true
						ability = "modifier_morphling_attribute_3"
					end

					if talent ~= "" and not new_talent then
						ability = talent
					end
				end
				break
			end
		end
	end

	return ability
end

function CDOTA_BaseNPC:NoDraw(mod, add_exception)
	mod.NoDraw = true
	local hex_checking = self:FindModifierByName("modifier_hero_wearables_system")
	if hex_checking then
		hex_checking:AddNoDrawMod(mod, add_exception)
	end
end

function CDOTA_BaseNPC:EndNoDraw(mod)
	mod.NoDraw = false
	local hex_checking = self:FindModifierByName("modifier_hero_wearables_system")
	if hex_checking then
		hex_checking:RemoveException(mod)
	end
end

function DoCleaveAttack(
	attacker,
	target,
	ability,
	damage,
	start_width,
	end_width,
	cleave_radius,
	effect,
	sound,
	more_targets
)
	local caster_pos = attacker:GetAbsOrigin()
	local direction = target:GetAbsOrigin() - caster_pos
	direction.z = 0

	if direction:Length2D() == 0 then
		direction = attacker:GetForwardVector()
		direction.z = 0
	end

	direction = direction:Normalized()

	local particle = nil

	if effect and effect ~= "" then
		particle = ParticleManager:CreateParticle(effect, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, caster_pos)
		ParticleManager:SetParticleControlForward(particle, 0, direction)
	end

	if sound then
		target:EmitSound(sound)
	end

	local damageTable = {
		damage_type = DAMAGE_TYPE_PHYSICAL,
		attacker = attacker,
		ability = ability,
		damage = damage,
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
	}
	local targets = {}
	local hit = { [target] = true }
	local forced = {}
	local units = attacker:FindTargets(cleave_radius)

	for _, unit in pairs(more_targets or {}) do
		forced[unit] = true
		table.insert(units, unit)
	end

	for _, unit in pairs(units) do
		local v_to_unit = unit:GetAbsOrigin() - caster_pos
		v_to_unit.z = 0

		local dist_along_cone = v_to_unit:Dot(direction)
		local width = start_width + (end_width - start_width) * dist_along_cone / cleave_radius
		local in_cone = dist_along_cone > 0
			and dist_along_cone <= cleave_radius
			and (v_to_unit - direction * dist_along_cone):Length2D() <= width

		if not hit[unit] and (forced[unit] or in_cone) then
			hit[unit] = true
			damageTable.victim = unit
			DoDamage(damageTable)
			table.insert(targets, unit)

			if sound then
				unit:EmitSound(sound)
			end
			if particle and #targets <= 16 then
				ParticleManager:SetParticleControl(particle, #targets + 1, unit:GetAbsOrigin() + Vector(0, 0, 80))
			end
		end
	end

	if particle then
		ParticleManager:SetParticleControl(particle, 1, Vector(0, 0, math.min(#targets, 16)))
		ParticleManager:ReleaseParticleIndex(particle)
	end

	return targets
end

CDOTA_BaseNPC_Hero.GetStrength_old = CDOTA_BaseNPC_Hero.GetStrength
function CDOTA_BaseNPC_Hero:GetStrength(real)
	if not real and self.stats_cache then
		return self.stats_cache.str
	end
	return self:GetStrength_old()
end

CDOTA_BaseNPC_Hero.GetAgility_old = CDOTA_BaseNPC_Hero.GetAgility
function CDOTA_BaseNPC_Hero:GetAgility(real)
	if not real and self.stats_cache then
		return self.stats_cache.agi
	end
	return self:GetAgility_old()
end

CDOTA_BaseNPC_Hero.GetIntellect_old = CDOTA_BaseNPC_Hero.GetIntellect
function CDOTA_BaseNPC_Hero:GetIntellect(arg, is_ogre, real)
	if IsValid(self.ogre_innate) and not is_ogre then
		return self:GetStrength(real)
	end
	if not real and not is_ogre and self.stats_cache then
		return self.stats_cache.int
	end
	return self:GetIntellect_old(arg)
end

CDOTA_BaseNPC.GetStatusResistance_old = CDOTA_BaseNPC.GetStatusResistance
function CDOTA_BaseNPC:GetStatusResistance()
	local status = 0
	if self:HasModifier("modifier_life_stealer_infest_custom_legendary_creep") then
		for _, mod in pairs(self:FindAllModifiers()) do
			if mod.GetModifierStatusResistanceStacking and mod:GetModifierStatusResistanceStacking() then
				status = status + (mod:GetModifierStatusResistanceStacking() / 100) * (1 - status)
			end
		end
	elseif self.creep_status then
		status = self.creep_status / 100
	else
		status = self:GetStatusResistance_old()
	end
	return status
end

CreateIllusions_old = CreateIllusions
CreateIllusions = function(caster, unit, data, count, range, scramble, clear_space, hide_particle)
	local illusions = CreateIllusions_old(caster, unit, data, count, range, scramble, clear_space)

	for _, illusion in pairs(illusions) do
		--if data.outgoing_damage then
		--illusion.illusion_outgoing_damage = (100 + data.outgoing_damage)/100
		--end
		for _, name in pairs(DeleteAbilities) do
			if illusion:HasAbility(name) then
				illusion:RemoveAbility(name)
			end
		end
	end

	if not hide_particle then
		local effect =
			ParticleManager:CreateParticle("particles/generic/illusion_created.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, unit)
		ParticleManager:SetParticleControlEnt(
			effect,
			0,
			unit,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			unit:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect)
	end

	return illusions
end

function DoDamage(data, replace_damage)
	local attacker = data.attacker
	if attacker then
		if data.custom_flag then
			if data.custom_flag ~= "ignore_flag" then
				attacker.custom_flag = data.custom_flag
			end
		else
			attacker.custom_flag = nil
		end
	end

	local ability = data.ability
	local damage = data.damage

	if ability and ability.creeps_damage and not data.no_creeps_bonus then
		data.damage = damage * ability:GetCreepsMult(data.victim)
	end

	if ability and attacker and attacker.item_damage_mods and ability:IsItem() then
		data.damage = data.damage * (1 + attacker:GetItemDamage() / 100)
	end

	local result = ApplyDamage(data)
	data.damage = damage

	if data.victim:IsRealHero() and data.ability and dota1x6.event_thinker_mod and IsValid(attacker) then
		dota1x6.event_thinker_mod:CheckDamageData({
			unit = data.victim,
			damage = result,
			attacker = attacker,
			inflictor = data.ability,
			damage_type = data.damage_type,
			new_name = replace_damage,
		})
	end

	return result
end

function CDOTABaseAbility:GetCreepsMult(target)
	return target:IsCreep() and 1 + (self.creeps_damage or 0) or 1
end

CDOTA_BaseNPC.PerformAttack_old = CDOTA_BaseNPC.PerformAttack
function CDOTA_BaseNPC:PerformAttack(
	hTarget,
	bUseCastAttackOrb,
	bProcessProcs,
	bSkipCooldown,
	bIgnoreInvis,
	bUseProjectile,
	bFakeAttack,
	bNeverMiss,
	flag_data,
	no_cleave_flag
)
	self.attack_flag = nil
	self.pre_attack_flag = nil
	self.attack_damage_flag = nil

	if flag_data then
		self.attack_flag = flag_data.attack
		self.pre_attack_flag = flag_data.pre
		self.attack_damage_flag = flag_data.damage
	end

	if no_cleave_flag then
		self.no_cleave_flag = no_cleave_flag
	end

	local strike = false
	local perform = self.proc_perform
	if self.proc_mods and not bNeverMiss and hTarget then
		if self.proc_dirty then
			self:UpdateProcs()
		end
		if self.proc_strike and self:StrikeReady(hTarget) then
			strike = true
			self.proc_perform = true
			if not IsValid(self.proc_swing) then
				self.proc_swing = self:AddNewModifier(self, nil, "modifier_proc_accuracy_swing", {})
			end
		end
	end

	local result = self:PerformAttack_old(
		hTarget,
		bUseCastAttackOrb,
		bProcessProcs,
		bSkipCooldown,
		bIgnoreInvis,
		bUseProjectile,
		bFakeAttack,
		bNeverMiss
	)

	if strike then
		self.proc_perform = perform
		self:EndProcSwing()
	end

	if not bUseProjectile then
		self.attack_flag = nil
		self.pre_attack_flag = nil
		self.attack_damage_flag = nil
	end

	return result
end

function CDOTABaseAbility:GetState()
	return self:GetAutoCastState()
end

CDOTA_Ability_Lua.GetCastRangeBonus = function(self, hTarget)
	if not self or self:IsNull() then
		return 0
	end

	local caster = self:GetCaster()
	if not caster or caster:IsNull() then
		return 0
	end

	return caster:GetCastRangeBonus()
end

CDOTABaseAbility.GetCastRangeBonus = function(self, hTarget)
	if not self or self:IsNull() then
		return 0
	end

	local caster = self:GetCaster()
	if not caster or caster:IsNull() then
		return 0
	end

	return caster:GetCastRangeBonus()
end

function GetUnixTimestamp()
	local dateStr = GetSystemDate() -- Формат "MM/DD/YY"
	local timeStr = GetSystemTime() -- Формат "HH:MM:SS"

	local month, day, yearShort = dateStr:match("(%d+)/(%d+)/(%d+)")
	local hour, min, sec = timeStr:match("(%d+):(%d+):(%d+)")

	local year = 2000 + tonumber(yearShort)
	month = tonumber(month)
	day = tonumber(day)
	hour = tonumber(hour)
	min = tonumber(min)
	sec = tonumber(sec)

	-- Дней в каждом месяце
	local daysInMonths = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }

	-- Учитываем високосный год
	if (year % 4 == 0 and year % 100 ~= 0) or (year % 400 == 0) then
		daysInMonths[2] = 29
	end

	-- Считаем общее число дней с 1970 года
	local totalDays = (year - 1970) * 365 + math.floor((year - 1969) / 4)
	for i = 1, month - 1 do
		totalDays = totalDays + daysInMonths[i]
	end
	totalDays = totalDays + (day - 1)

	-- Переводим всё в секунды
	return totalDays * 86400 + hour * 3600 + min * 60 + sec
end