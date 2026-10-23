--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_phantom_assassin_innate_custom",
	"abilities/phantom_assassin/phantom_assassin_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_phantom_assassin_innate_custom_illusion",
	"abilities/phantom_assassin/phantom_assassin_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_innate_custom_choosing",
	"abilities/phantom_assassin/phantom_assassin_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_innate_custom_hunt",
	"abilities/phantom_assassin/phantom_assassin_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

phantom_assassin_innate_custom = class({})
phantom_assassin_innate_custom.talents = {}
phantom_assassin_innate_custom.all_targets = {}
phantom_assassin_innate_custom.current_targets = {}
phantom_assassin_innate_custom.last_target = nil
phantom_assassin_innate_custom.contracts = 0

function phantom_assassin_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/phantom_assassin/pa_cry.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/bounty_hunter/bounty_hunter_hunters_hoard/bounty_hunter_hoard_track_trail.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/alchemist/alchemist_midas_knuckles/alch_hand_of_midas.vpcf",
		context
	)
	PrecacheResource("particle", "particles/phantom_assassin/pa_vendetta.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/hunt_complete.vpcf", context)
	PrecacheResource("soundfile", "soundevents/vo_custom/phantom_assassin_vo_custom.vsndevts", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_phantom_assassin.vsndevts", context)
end

function phantom_assassin_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r2_range = 0,

			has_h1 = 0,
			h1_move = 0,
			h1_magic = 0,
			h1_bonus = caster:GetTalentValue("modifier_phantom_assassin_hero_1", "bonus", true),

			h2_stats = 0,
			h2_stats_hunt = 0,

			has_h6 = 0,
			h6_health = caster:GetTalentValue("modifier_phantom_assassin_hero_6", "health", true),
			h6_gold = caster:GetTalentValue("modifier_phantom_assassin_hero_6", "gold", true),
			h6_cdr = caster:GetTalentValue("modifier_phantom_assassin_hero_6", "cdr", true),
			h6_max = caster:GetTalentValue("modifier_phantom_assassin_hero_6", "max", true),
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_crit_2") then
		self.talents.r2_range = caster:GetTalentValue("modifier_phantom_assassin_crit_2", "range")
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_move = caster:GetTalentValue("modifier_phantom_assassin_hero_1", "move")
		self.talents.h1_magic = caster:GetTalentValue("modifier_phantom_assassin_hero_1", "magic")
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_2") then
		self.talents.h2_stats = caster:GetTalentValue("modifier_phantom_assassin_hero_2", "stats")
		self.talents.h2_stats_hunt = caster:GetTalentValue("modifier_phantom_assassin_hero_2", "stats_hunt")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_phantom_assassin_hero_6") then
		self.talents.has_h6 = 1
	end
end

function phantom_assassin_innate_custom:GetIntrinsicModifierName()
	return "modifier_phantom_assassin_innate_custom"
end

function phantom_assassin_innate_custom:GetUltimate()
	if not IsValid(self.ultimate) then
		self.ultimate = self.caster:FindAbilityByName("custom_phantom_assassin_coup_de_grace")
	end

	return self.ultimate
end

function phantom_assassin_innate_custom:GetStats()
	if not self.tracker then
		return
	end
	return self.talents.h2_stats + self.tracker:GetStackCount() * self.talents.h2_stats_hunt
end

function phantom_assassin_innate_custom:GetMove()
	if not self.tracker then
		return
	end
	return self.talents.h1_move * self.tracker:GetBonus()
end

function phantom_assassin_innate_custom:GetMagic()
	if not self.tracker then
		return
	end
	return self.talents.h1_magic * self.tracker:GetBonus()
end

function phantom_assassin_innate_custom:UpdateContracts()
	if not IsServer() then
		return
	end

	local stack = math.min(self.contracts, self.max)

	if stack >= self.max and self.tracker:GetStackCount() < self.max then
		self.parent:GenericParticle("particles/phantom_assassin/hunt_complete.vpcf")
		self.parent:EmitSound("BS.Thirst_legendary_active")
	end

	self.tracker:SetStackCount(stack)

	self.caster:CalculateStatBonus(true)
end

function phantom_assassin_innate_custom:GetGold(target)
	local gold = self.gold

	if self.talents.has_h6 == 1 and self.tracker:GetStackCount() < self.talents.h6_max then
		gold = gold + self.talents.h6_gold
	end

	if not target or target:IsNull() then
		return gold
	end

	return gold + target.networth * self.gold_worth
end

function phantom_assassin_innate_custom:GetContractDamage(magic)
	return self.tracker:GetStackCount() * (magic and self.damage_spell or self.damage_crit)
end

function phantom_assassin_innate_custom:GetContractReward(magic)
	if self.tracker:GetStackCount() >= self.max then
		return 0
	end

	return magic and self.damage_spell or self.damage_crit
end

function phantom_assassin_innate_custom:SetTarget(index)
	local hero = EntIndexToHScript(index)

	if not hero or hero:IsNull() or not players[hero:GetId()] then
		self:GetUltimate():StartCd()
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_innate_custom_hunt",
		{ target = index, duration = self.duration }
	)
end

function phantom_assassin_innate_custom:StartHunt()
	local all_targets = {}
	local targets_alive = 0

	for _, target_table in pairs(self.all_targets) do
		local target = EntIndexToHScript(target_table.target)

		if target and not target:IsNull() then
			local count = #all_targets + 1
			all_targets[count] = {}
			all_targets[count].target = target_table.target

			if target_table.killed == true or not players[target_table.id] then
				all_targets[count].killed = true
			else
				all_targets[count].killed = false
				targets_alive = targets_alive + 1
			end
		end
	end

	self.current_targets = all_targets

	if targets_alive > 0 then
		self.caster:AddNewModifier(self.caster, self, "modifier_phantom_assassin_innate_custom_choosing", {})
		return
	end

	local heroes = {}

	for _, player in pairs(players) do
		if player:GetTeamNumber() ~= self.caster:GetTeamNumber() then
			heroes[#heroes + 1] = player
		end
	end

	if #heroes == 0 then
		return
	end

	local target = heroes[RandomInt(1, #heroes)]

	if #heroes > 1 and self.last_target ~= nil then
		repeat
			target = heroes[RandomInt(1, #heroes)]
		until self.last_target ~= target
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_innate_custom_hunt",
		{ target = target:entindex(), duration = self.duration }
	)
end

modifier_phantom_assassin_innate_custom = class(mod_visible)
function modifier_phantom_assassin_innate_custom:RemoveOnDeath()
	return false
end
function modifier_phantom_assassin_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self

	if self.parent:IsIllusion() then
		self:StartIntervalThink(0.2)
		return
	end

	self.ability:UpdateTalents()

	self.parent.hunt_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.delay = self.ability:GetSpecialValueFor("delay")
	self.ability.range = self.ability:GetSpecialValueFor("range")
	self.ability.gold = self.ability:GetSpecialValueFor("gold")
	self.ability.gold_worth = self.ability:GetSpecialValueFor("gold_worth") / 100
	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.ability.damage_crit = self.ability:GetSpecialValueFor("damage_crit")
	self.ability.damage_spell = self.ability:GetSpecialValueFor("damage_spell")

	self.save_gold = 0

	if not IsServer() then
		return
	end

	self:StartIntervalThink(0.2)
	self:OnIntervalThink()

	self:UpdateTargets()
end

function modifier_phantom_assassin_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:IsIllusion() then
		local owner = self.parent.owner

		if IsValid(owner) and IsValid(owner.hunt_ability) then
			self.parent:AddNewModifier(
				owner,
				owner.hunt_ability,
				"modifier_phantom_assassin_innate_custom_illusion",
				{}
			)
			self:Destroy()
		end
		return
	end

	local ultimate = self.ability:GetUltimate()

	if not IsValid(ultimate) then
		return
	end

	if ultimate:GetLevel() == 0 then
		ultimate:SetLevel(1)
	end

	if self.ability.talents.has_h6 ~= 1 then
		self:StartIntervalThink(2)
		return
	end

	if self.save_gold > 0 then
		self.parent:GiveGold(self.save_gold, true, nil, self.ability)
		self.save_gold = 0
	end

	if self:GetStackCount() < self.ability.talents.h6_max then
		self:StartIntervalThink(2)
		return
	end

	self:StartIntervalThink(-1)
end

function modifier_phantom_assassin_innate_custom:UpdateTargets()
	if not IsServer() then
		return
	end

	local targets = {}
	local used = {}

	for _, data in pairs(self.ability.all_targets) do
		if players[data.id] then
			used[data.id] = true
			targets[#targets + 1] = data
		end
	end

	local new_ids = {}

	for id, player in pairs(players) do
		if not used[id] and player:GetTeamNumber() ~= self.parent:GetTeamNumber() then
			new_ids[#new_ids + 1] = id
		end
	end

	while #targets < self.ability.max and #new_ids > 0 do
		local id = table.remove(new_ids, RandomInt(1, #new_ids))
		targets[#targets + 1] = { target = players[id]:entindex(), killed = false, id = id }
	end

	self.ability.all_targets = targets

	self.ability:UpdateContracts()
end

function modifier_phantom_assassin_innate_custom:GetBonus()
	if self.parent:HasModifier("modifier_phantom_assassin_phantom_smoke") then
		return self.ability.talents.h1_bonus
	end
	if self.parent:HasModifier("modifier_phantom_assassin_phantom_blur_innate") then
		return self.ability.talents.h1_bonus
	end

	return 1
end

function modifier_phantom_assassin_innate_custom:DeclareFunctions()
	if self:GetParent():IsIllusion() then
		return {}
	end

	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_TOOLTIP2,
	}
end

function modifier_phantom_assassin_innate_custom:GetModifierPercentageCooldown()
	if self.ability.talents.has_h6 ~= 1 then
		return
	end

	return self.ability.talents.h6_cdr * math.min(self:GetStackCount(), self.ability.talents.h6_max)
end

function modifier_phantom_assassin_innate_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability:GetMove()
end

function modifier_phantom_assassin_innate_custom:GetModifierMagicalResistanceBonus()
	return self.ability:GetMagic()
end

function modifier_phantom_assassin_innate_custom:GetModifierBonusStats_Strength()
	return self.ability:GetStats()
end

function modifier_phantom_assassin_innate_custom:GetModifierBonusStats_Agility()
	return self.ability:GetStats()
end

function modifier_phantom_assassin_innate_custom:GetModifierBonusStats_Intellect()
	return self.ability:GetStats()
end

function modifier_phantom_assassin_innate_custom:OnTooltip()
	if not self.parent.crit_ability then
		return
	end

	return self.parent.crit_ability:GetCritBonus()
end

function modifier_phantom_assassin_innate_custom:OnTooltip2()
	if not self.parent.crit_ability then
		return
	end

	return self.parent.crit_ability:GetBleedDamage() * 100
end

modifier_phantom_assassin_innate_custom_illusion = class(mod_hidden)
function modifier_phantom_assassin_innate_custom_illusion:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_phantom_assassin_innate_custom_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_phantom_assassin_innate_custom_illusion:GetModifierMoveSpeedBonus_Constant()
	return self.ability:GetMove()
end

function modifier_phantom_assassin_innate_custom_illusion:GetModifierMagicalResistanceBonus()
	return self.ability:GetMagic()
end

function modifier_phantom_assassin_innate_custom_illusion:GetModifierAttackRangeBonus()
	return self.ability.talents.r2_range
end

function modifier_phantom_assassin_innate_custom_illusion:GetModifierBonusStats_Strength()
	return self.ability:GetStats()
end

function modifier_phantom_assassin_innate_custom_illusion:GetModifierBonusStats_Agility()
	return self.ability:GetStats()
end

function modifier_phantom_assassin_innate_custom_illusion:GetModifierBonusStats_Intellect()
	return self.ability:GetStats()
end

modifier_phantom_assassin_innate_custom_choosing = class(mod_hidden)
function modifier_phantom_assassin_innate_custom_choosing:RemoveOnDeath()
	return false
end
function modifier_phantom_assassin_innate_custom_choosing:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.targets = {}
	local alive = 0

	for _, data in pairs(self.ability.current_targets) do
		local count = #self.targets + 1
		local target = EntIndexToHScript(data.target)
		if target and not target:IsNull() then
			self.targets[count] = {}
			self.targets[count].hero = target:GetUnitName()
			self.targets[count].killed = data.killed
			self.targets[count].index = data.target
			self.targets[count].gold = self.ability:GetGold(target)
		end

		if data.killed == false then
			alive = alive + 1
		end
	end

	if #self.targets == 0 or alive == 0 then
		self:Destroy()
		return
	end

	self.picked = false
	self.ability:GetUltimate():EndCd()
	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_phantom_assassin_innate_custom_choosing:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIpick({ mod = self, text = "#pa_pick_hero", targets = self.targets })
end

function modifier_phantom_assassin_innate_custom_choosing:EndPick(pick)
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	if self.targets[pick] and self.targets[pick].index and not self.targets[pick].killed then
		self.ability:SetTarget(self.targets[pick].index)
		self.picked = true
	end
	self:Destroy()
end

function modifier_phantom_assassin_innate_custom_choosing:OnDestroy()
	if not IsServer() then
		return
	end
	if self.picked == false then
		self.ability:GetUltimate():StartCd()
	end
	self.parent:UpdateUIpick({ hide = 1 })
end

modifier_phantom_assassin_innate_custom_hunt = class(mod_hidden)
function modifier_phantom_assassin_innate_custom_hunt:RemoveOnDeath()
	return false
end
function modifier_phantom_assassin_innate_custom_hunt:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:AddDeathEvent(self, true)

	self.ability = self:GetAbility()
	self.target = EntIndexToHScript(table.target)
	self.ability.last_target = self.target
	self.ability:GetUltimate():EndCd()

	self.target_id = self.target:GetId()

	self.range = self.ability.range
	self.delay_end = GameRules:GetDOTATime(false, false) + self.ability.delay

	self.RemoveForDuel = true

	EmitAnnouncerSoundForPlayer("PA.Hunt_start", self.parent:GetPlayerOwnerID())
	EmitAnnouncerSoundForPlayer("PA.Hunt_start2", self.parent:GetPlayerOwnerID())

	self.particle_trail_fx = ParticleManager:CreateParticleForTeam(
		"particles/econ/items/bounty_hunter/bounty_hunter_hunters_hoard/bounty_hunter_hoard_track_trail.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.target,
		self.parent:GetTeamNumber()
	)
	self:AddParticle(self.particle_trail_fx, false, false, -1, false, false)

	self.interval = 0.1
	self.health = 0
	self:SetHasCustomTransmitterData(true)
	self:StartIntervalThink(self.interval)
end

function modifier_phantom_assassin_innate_custom_hunt:GetDelay()
	return math.max(math.ceil(self.delay_end - GameRules:GetDOTATime(false, false)), 0)
end

function modifier_phantom_assassin_innate_custom_hunt:AddCustomTransmitterData()
	return {
		health = self.health,
	}
end

function modifier_phantom_assassin_innate_custom_hunt:HandleCustomTransmitterData(data)
	self.health = data.health
end

function modifier_phantom_assassin_innate_custom_hunt:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_phantom_assassin_innate_custom_hunt:GetModifierHealthBonus()
	return self.health or 0
end

function modifier_phantom_assassin_innate_custom_hunt:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.target or self.target:IsNull() or not players[self.target_id] then
		self:Destroy()
		return
	end

	if self.target:IsAlive() then
		AddFOWViewer(self.parent:GetTeamNumber(), self.target:GetAbsOrigin(), 10, self.interval * 2, true)
	end

	local health = (
		self.ability.talents.has_h6 == 1
		and (self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.range
	)
			and self.ability.talents.h6_health
		or 0

	if health ~= self.health then
		self.health = health
		self.parent:CalculateStatBonus(true)
		self:SendBuffRefreshToClients()
	end

	local magic = self.parent.crit_ability and self.parent.crit_ability:IsMagic()
	local reward = self.ability:GetContractReward(magic)

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"pa_hunt_think",
		{
			hero = self.target:GetUnitName(),
			player_id = self.target_id,
			timer = math.floor(self:GetRemainingTime()),
			gold = math.floor(self.ability:GetGold(self.target)),
			damage = reward,
			magic = magic and 1 or 0,
			delay = self:GetDelay(),
		}
	)
end

function modifier_phantom_assassin_innate_custom_hunt:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.target ~= params.unit then
		return
	end
	if self.target:IsReincarnating() then
		return
	end
	if self:GetDelay() > 0 then
		return
	end

	local attacker = params.attacker

	if attacker and attacker.owner then
		attacker = attacker.owner
	end

	if
		self.parent ~= attacker
		and (self.target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.range
	then
		return
	end

	self.kill_done = true
	self:Destroy()
end

function modifier_phantom_assassin_innate_custom_hunt:OnDestroy()
	if not IsServer() then
		return
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"pa_hunt_end",
		{}
	)

	self.ability:GetUltimate():StartCd()

	if not self.kill_done then
		EmitAnnouncerSoundForPlayer("PA.Hunt_fail", self.parent:GetPlayerOwnerID())
		return
	end

	self.parent:GiveGold(math.floor(self.ability:GetGold(self.target)), true, nil, self.ability)

	Timers:CreateTimer(0.5, function()
		EmitAnnouncerSoundForPlayer("PA.Hunt_kill", self.parent:GetPlayerOwnerID())
	end)

	local item_effect = ParticleManager:CreateParticle(
		"particles/econ/items/alchemist/alchemist_midas_knuckles/alch_hand_of_midas.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.target
	)
	ParticleManager:SetParticleControl(item_effect, 0, self.target:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		item_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(item_effect)

	if self.ability.talents.has_h6 ~= 1 and self.ability.tracker:GetStackCount() < self.ability.talents.h6_max then
		self.ability.tracker.save_gold = self.ability.tracker.save_gold + self.ability.talents.h6_gold
	end

	self.ability.contracts = self.ability.contracts + 1

	if self.parent:GetQuest() == "Phantom.Quest_8" then
		self.parent:UpdateQuest(1)
	end

	for _, data in pairs(self.ability.all_targets) do
		if data.target == self.target:entindex() then
			data.killed = true
		end
	end

	self.ability:UpdateContracts()
end