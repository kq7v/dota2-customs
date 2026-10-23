--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_tower_heal_hero", "modifiers/main_mods/modifier_player_main_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_respawn_invun", "modifiers/main_mods/modifier_player_main_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_patrol_reward_damage",
	"modifiers/main_mods/modifier_player_main_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_player_main_custom_stats",
	"modifiers/main_mods/modifier_player_main_custom",
	LUA_MODIFIER_MOTION_NONE
)

modifier_player_main_custom = class(mod_hidden)
function modifier_player_main_custom:IsHidden()
	return (self:GetStackCount() - 1) <= 0
end
function modifier_player_main_custom:GetTexture()
	return "buffs/duel_win"
end
function modifier_player_main_custom:RemoveOnDeath()
	return false
end
function modifier_player_main_custom:OnCreated(params)
	self.parent = self:GetParent()

	self.agi = 0
	self.str = 0
	self.int = 0
	self.stats_key = ""
	self.NeedRefresh = false
	self.StackOnIllusion = true

	self.cdr_max = 20

	if not IsServer() then
		return
	end

	if self.parent:IsRealHero() and not self.parent:IsTempestDouble() then
		self.parent:AddDeathEvent(self, true)
		self.parent:AddRespawnEvent(self, true)
		self.parent:AddDamageEvent_inc(self, true)
		self.parent:AddDamageEvent_out(self, true)
	end

	self.rewards = {}
	self.reward_count = 0
	self.interval = 0.5
	self.parent:SetBaseMagicalResistanceValue(33)

	if self.parent:IsIllusion() or self.parent:IsTempestDouble() then
		self.interval = 1
	end
	local ability = self.parent:FindAbilityByName("custom_general_talents")
	if not ability then
		ability = self.parent:AddAbility("custom_general_talents")
		ability:SetLevel(1)
	end
	if ability then
		self.parent:AddNewModifier(self.parent, ability, "modifier_general_stats", {})
	end

	self:SetHasCustomTransmitterData(true)
	self:StartIntervalThink(0.1)
	self:UpdateProjectileAttack()
end

function modifier_player_main_custom:UpdateProjectileAttack()
	if not IsServer() then
		return
	end

	self.projectile = nil
	local custom_effect_data = shop:GetCurrentEffectData(self.parent:GetPlayerOwnerID(), "effect_attack")
	if custom_effect_data then
		self.projectile = custom_effect_data[1]
	end
end

function modifier_player_main_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_BASE_MRES_PER_INT_BONUS_PERCENTAGE,
	}
end

function modifier_player_main_custom:GetModifierBaseMagicResistPerIntBonusPercentage()
	return -23
end

function modifier_player_main_custom:GetPriority()
	if not self.projectile then
		return -1
	end
	return MODIFIER_PRIORITY_HIGH
end

function modifier_player_main_custom:GetModifierProjectileName()
	if not self.projectile then
		return
	end
	return self.projectile
end

function modifier_player_main_custom:GetModifierPercentageCooldown(params)
	if not self.parent.cdr_items then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	if
		self.parent:HasModifier("modifier_tinker_rearm_custom_tracker")
		and params.ability
		and params.ability:IsItem()
	then
		return
	end

	local bonus = 0
	for mod, cdr in pairs(self.parent.cdr_items) do
		if IsValid(mod) then
			bonus = bonus + cdr
		else
			self.parent.cdr_items[mod] = nil
		end
		if bonus >= self.cdr_max then
			break
		end
	end
	return math.min(bonus, self.cdr_max)
end

function modifier_player_main_custom:GetModifierIncomingDamage_Percentage(params)
	if not self.parent:IsRealHero() then
		return
	end
	local bonus = 0
	local attacker
	if
		params.attacker
		and players[params.attacker:GetId()]
		and params.attacker:GetTeamNumber() ~= self.parent:GetTeamNumber()
	then
		attacker = players[params.attacker:GetId()]
	end
	if self.parent.damage_penalty then
		bonus = bonus + self.parent.damage_penalty
	end
	if attacker and attacker.damage_penalty then
		bonus = bonus - attacker.damage_penalty
	end
	if not self.no_damage_bonus then
		local more_bonus = math.max(0, Player_damage_inc * (self:GetStackCount() - 1)) * -1
		if IsClient() then
			return more_bonus
		end
		if attacker then
			local attacker_mod = attacker:FindModifierByName(self:GetName())
			if attacker_mod then
				more_bonus = more_bonus + math.max(0, Player_damage_inc * (attacker_mod:GetStackCount() - 1))
			end
		end
		bonus = bonus + more_bonus
	end
	return bonus
end

function modifier_player_main_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		self.parent:IsRealHero()
		and self.reward_count > 0
		and not self.parent:HasModifier("modifier_end_choise")
		and #players[self.parent:GetId()].choise == 0
		and not self.parent:HasModifier("modifier_patrol_reward_damage")
		and self.parent:IsAlive()
	then
		if self.rewards[1] then
			upgrade:init_upgrade(self.parent, nil, nil, after_legen, nil, nil, self.rewards[1])
			table.remove(self.rewards, 1)
		end
		self.reward_count = #self.rewards
	end

	if
		(GameRules:GetDOTATime(false, false) >= Player_damage_time or self.no_damage_bonus)
		and self:GetStackCount() ~= 0
	then
		self:SetStackCount(0)
		self.no_damage_bonus = true
	end

	if self.parent.stat_mods then
		local str_k = 0
		local agi_k = 0
		local int_k = 0
		local empty = true

		for mod, data in pairs(self.parent.stat_mods) do
			if IsValid(mod) and self.parent:HasModifier(mod:GetName()) then
				empty = false
				str_k = str_k + data.str
				agi_k = agi_k + data.agi
				int_k = int_k + data.int
			else
				self.parent.stat_mods[mod] = nil
				self.NeedRefresh = true
			end
		end

		local prev_int = self.int
		local prev_str = self.str
		local prev_agi = self.agi

		if IsValid(self.stats_mod) then
			self.stats_mod.int = 0
			self.stats_mod.str = 0
			self.stats_mod.agi = 0
		end

		self.int = self.parent:GetIntellect(false, nil, true) * int_k
		self.str = self.parent:GetStrength(true) * str_k
		self.agi = self.parent:GetAgility(true) * agi_k
		self.int_k = int_k
		self.str_k = str_k
		self.agi_k = agi_k

		if self.int ~= prev_int or self.str ~= prev_str or self.agi ~= prev_agi then
			self.NeedRefresh = true
		end

		if empty then
			self.parent.stat_mods = nil
		end
	end

	local stats_key = (self.str ~= 0 and "str" or "")
		.. (self.agi ~= 0 and "agi" or "")
		.. (self.int ~= 0 and "int" or "")
	if stats_key ~= self.stats_key then
		self.stats_key = stats_key
		if IsValid(self.stats_mod) then
			self.stats_mod:Destroy()
		end
		self.stats_mod = stats_key ~= ""
				and self.parent:AddNewModifier(self.parent, nil, "modifier_player_main_custom_stats", {})
			or nil
	end

	if IsValid(self.stats_mod) then
		self.stats_mod.str = self.str
		self.stats_mod.agi = self.agi
		self.stats_mod.int = self.int
	end

	local cache = self.parent.stats_cache
	local stats = {
		str = math.floor(self.parent:GetStrength(true)),
		agi = math.floor(self.parent:GetAgility(true)),
		int = math.floor(self.parent:GetIntellect(false, nil, true)),
	}
	self.parent.stats_cache = stats

	if not cache or cache.str ~= stats.str or cache.agi ~= stats.agi or cache.int ~= stats.int then
		if cache then
			self.NeedRefresh = true
		end
		self:SendBuffRefreshToClients()
		self.stats_changed = true
	end

	if players[self.parent:GetId()] == self.parent then
		local cast_range = self.parent:GetCastRangeBonus()
		if cast_range ~= self.cast_range then
			self.cast_range = cast_range
			self.stats_changed = true
		end
	end

	if
		self.stats_changed
		and players[self.parent:GetId()] == self.parent
		and self.parent:CheckCd("player_stats", 4)
	then
		self.stats_changed = false
		dota1x6:SendPlayerStats(self.parent)
	end

	if self.NeedRefresh then
		self.NeedRefresh = false
		self.parent:CalculateStatBonus(true)
	end

	self:StartIntervalThink(self.interval)
end

function modifier_player_main_custom:SendRefresh()
	if not IsServer() then
		return
	end
	self.NeedRefresh = true
end

function modifier_player_main_custom:AddCustomTransmitterData()
	return self.parent.stats_cache
end

function modifier_player_main_custom:HandleCustomTransmitterData(data)
	if not data then
		return
	end
	if not data.str then
		return
	end
	self.parent = self:GetParent()
	self.parent.stats_cache = { str = data.str, agi = data.agi, int = data.int }
end

function modifier_player_main_custom:GetAbsoluteNoDamagePhysical(params)
	if not params.attacker then
		return
	end
	if params.attacker:GetUnitName() == "npc_towerdire" or params.attacker:GetUnitName() == "npc_towerradiant" then
		return 1
	end
	return 0
end

function modifier_player_main_custom:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not params.attacker then
		return
	end

	local unit = params.unit
	if unit == self.parent then
		if params.attacker:IsHero() and _G.added_shop_heroes[params.attacker:GetUnitName()] then
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
				"update_player_killer",
				{ hero_current = params.attacker:entindex() }
			)
		else
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
				"update_player_killer",
				{ hero_current = nil }
			)
		end
	end

	if unit:IsTempestDouble() or unit:IsCreepHero() then
		return
	end

	local player = players[self.parent:GetId()]

	if player then
		if
			params.attacker:GetTeamNumber() == self.parent:GetTeamNumber()
			and (unit:IsRealHero() and not unit:IsReincarnating())
			and unit ~= self.parent
		then
			local tower = towers[self.parent:GetTeamNumber()]
			if tower then
				tower:EmitSound("DOTA_Item.RepairKit.Target")
				tower:AddNewModifier(player, nil, "modifier_generic_repair", { duration = 10, tower_heal = 15 })
				self.parent:AddNewModifier(self.parent, nil, "modifier_tower_heal_hero", { duration = 10 })
			end
		end
	end

	if self.parent ~= unit then
		return
	end

	self.reinc = false
	if self.parent:IsReincarnating() then
		self.reinc = true
	end
end

function modifier_player_main_custom:RespawnEvent(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end

	self.parent.died_on_duel = nil

	self.parent:SetHealth(self.parent:GetMaxHealth())
	self.parent:SetMana(self.parent:GetMaxMana())

	self.parent:UpdateTalentsClient(true)

	if self.reinc == false then
		local mod = self.parent:FindModifierByName("modifier_voice_module")
		if mod then
			mod:RespawnEvent()
		end

		if towers[self.parent:GetTeamNumber()] then
			local respaw_pos = Entities:FindByName(nil, towers[self.parent:GetTeamNumber()]:GetName() .. "_respawn")
			if respaw_pos then
				self.parent:AddNewModifier(
					self.parent,
					nil,
					"modifier_respawn_invun",
					{ x = respaw_pos:GetAbsOrigin().x, y = respaw_pos:GetAbsOrigin().y }
				)
			end
		end

		self.parent:AddNewModifier(self.parent, nil, "modifier_invulnerable", { duration = 1 })
	end

	self.parent:RemoveModifierByName("modifier_fountain_invulnerability")

	self.reinc = false

	local parent_player = players[self.parent:GetId()]
	if parent_player == nil then
		return
	end

	if parent_player.respawn_mod ~= nil then
		self.parent:InitTalent(parent_player.respawn_mod)
		parent_player.respawn_mod = nil
	end
end

function modifier_player_main_custom:SetReward(name)
	if not IsServer() then
		return
	end
	table.insert(self.rewards, name)
	self.reward_count = #self.rewards

	self.parent:AddNewModifier(self.parent, nil, "modifier_patrol_reward_damage", { duration = 1 })
end

function modifier_player_main_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.reward_count <= 0 then
		return
	end

	local unit = params.unit
	local attacker = params.attacker

	if (attacker:GetAbsOrigin() - unit:GetAbsOrigin()):Length2D() > 1200 then
		return
	end
	if not attacker:IsAlive() then
		return
	end
	if attacker:GetTeamNumber() == unit:GetTeamNumber() then
		return
	end

	local unit_id = unit:GetId()
	if players[unit_id] then
		unit = players[unit_id]
	end

	if attacker.is_patrol_creep and self.parent == params.unit then
		self.parent:AddNewModifier(self.parent, nil, "modifier_patrol_reward_damage", { duration = 2 })
		return
	end

	if players[attacker:GetId()] and params.unit == self.parent then
		self.parent:AddNewModifier(self.parent, nil, "modifier_patrol_reward_damage", { duration = 4 })
		return
	end
end

function modifier_player_main_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.reward_count <= 0 then
		return
	end

	local unit = params.unit
	local attacker = params.attacker

	if (attacker:GetAbsOrigin() - unit:GetAbsOrigin()):Length2D() > 1200 then
		return
	end
	if not attacker:IsAlive() then
		return
	end
	if attacker:GetTeamNumber() == unit:GetTeamNumber() then
		return
	end

	local attacker_id = attacker:GetId()
	if players[attacker_id] then
		attacker = players[attacker_id]
	end

	if unit.is_patrol_creep and self.parent == attacker then
		self.parent:AddNewModifier(self.parent, nil, "modifier_patrol_reward_damage", { duration = 2 })
		return
	end

	if players[unit:GetId()] and params.attacker == self.parent then
		self.parent:AddNewModifier(self.parent, nil, "modifier_patrol_reward_damage", { duration = 4 })
		return
	end
end

modifier_player_main_custom_stats = class(mod_hidden)
modifier_player_main_custom_stats.functions = {
	str = MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	agi = MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
	int = MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
}
function modifier_player_main_custom_stats:RemoveOnDeath()
	return false
end
function modifier_player_main_custom_stats:OnCreated()
	self.str = 0
	self.agi = 0
	self.int = 0
end

function modifier_player_main_custom_stats:DeclareFunctions()
	local main = IsServer() and self:GetParent():FindModifierByName("modifier_player_main_custom")
	local key = main and main.stats_key or "stragiint"
	local list = {}
	for name, func in pairs(self.functions) do
		if key:find(name) then
			table.insert(list, func)
		end
	end
	return list
end

function modifier_player_main_custom_stats:GetModifierBonusStats_Strength()
	return self.str
end

function modifier_player_main_custom_stats:GetModifierBonusStats_Agility()
	return self.agi
end

function modifier_player_main_custom_stats:GetModifierBonusStats_Intellect()
	return self.int
end

modifier_patrol_reward_damage = class(mod_hidden)
function modifier_patrol_reward_damage:RemoveOnDeath()
	return false
end

modifier_tower_heal_hero = class(mod_visible)
function modifier_tower_heal_hero:RemoveOnDeath()
	return false
end
function modifier_tower_heal_hero:GetTexture()
	return "item_repair_kit"
end
function modifier_tower_heal_hero:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_tower_heal_hero:OnTooltip()
	return 10
end

modifier_respawn_invun = class(mod_hidden)
function modifier_respawn_invun:GetStatusEffectName()
	return "particles/status_fx/status_effect_dark_willow_shadow_realm.vpcf"
end
function modifier_respawn_invun:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_respawn_invun:OnCreated(params)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)
	self.radius = 250

	self.particle = ParticleManager:CreateParticle("particles/items_fx/glyph.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, self.point)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.radius * 1.4, 1, 1))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_respawn_invun:OnIntervalThink()
	if not IsServer() then
		return
	end

	local dist = (self.point - self.parent:GetAbsOrigin()):Length2D()
	if dist >= self.radius then
		self:Destroy()
		return
	end
end

function modifier_respawn_invun:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end