--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_night_stalker_innate_custom",
	"abilities/night_stalker/night_stalker_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_night_stalker_innate_custom_stats",
	"abilities/night_stalker/night_stalker_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)
LinkLuaModifier(
	"modifier_night_stalker_innate_custom_active",
	"abilities/night_stalker/night_stalker_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

night_stalker_innate_custom = class({})
night_stalker_innate_custom.talents = {}

function night_stalker_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_shard_hunter.vpcf", context)
	PrecacheResource("particle", "particles/night_stalker/scepter_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_night_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_night_stalker/nightstalker_change.vpcf", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_night_stalker.vsndevts", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_night_stalker", context)
end

function night_stalker_innate_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_h3 = 0,
			h3_max_move = 0,
			h3_move = 0,

			h6_shield_heal = caster:GetTalentValue("modifier_stalker_hero_6", "shield_heal", true) / 100,

			has_e1 = 0,
			e1_damage = 0,
			e1_speed = 0,

			has_e4 = 0,

			has_q7 = 0,

			has_e7 = 0,

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_stalker_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_move = caster:GetTalentValue("modifier_stalker_hero_3", "move")
		self.talents.h3_max_move = caster:GetTalentValue("modifier_stalker_hero_3", "max_move")
	end

	if caster:HasTalent("modifier_stalker_hero_6") then
		caster:AddLifesteal(
			self.tracker,
			{
				name = "modifier_stalker_hero_6",
				heal = false,
				proc = "LifestealShield",
				value = self.talents.h6_shield_heal,
			}
		)
	end

	if caster:HasTalent("modifier_stalker_hunter_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_stalker_hunter_1", "speed")
		self.talents.e1_damage = caster:GetTalentValue("modifier_stalker_hunter_1", "damage")
	end

	if caster:HasTalent("modifier_stalker_hunter_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_stalker_void_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_stalker_hunter_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_stalker_dark_7") then
		self.talents.has_r7 = 1
	end

	if not IsServer() then
		return
	end
	if
		name ~= "modifier_stalker_hunter_4"
		and name ~= "modifier_stalker_hunter_7"
		and name ~= "modifier_stalker_dark_7"
		and name ~= "modifier_stalker_void_7"
	then
		return
	end

	local dark_legendary = caster:FindAbilityByName("night_stalker_darkness_custom_legendary")
	local void_legendary = caster:FindAbilityByName("night_stalker_void_custom_legendary")
	local hunter_charge = caster:FindAbilityByName("night_stalker_midnight_feast_custom_charge")

	if not dark_legendary or not void_legendary or not hunter_charge then
		return
	end

	if self.talents.has_q7 == 1 and void_legendary:IsHidden() then
		local ability_5 = caster:GetAbilityByIndex(4)
		if ability_5 and ability_5 ~= void_legendary then
			caster:SwapAbilities(void_legendary:GetName(), ability_5:GetName(), true, false)
		end
	end

	if self.talents.has_r7 == 1 and self.talents.has_q7 == 0 then
		dark_legendary:SetHidden(false)
	end

	if self.talents.has_e4 == 1 then
		hunter_charge:SetHidden(false)
	end
end

function night_stalker_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_night_stalker_innate_custom"
end

function night_stalker_innate_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if self.scepter_init then
		return
	end
	if not self.caster:HasScepter() then
		return
	end
	if not self.tracker then
		return
	end
	if self:IsStolen() then
		return
	end

	self.scepter_init = true
	self.tracker:ScepterInit()
end

modifier_night_stalker_innate_custom = class(mod_hidden)
function modifier_night_stalker_innate_custom:IsHidden()
	return not self.parent:HasModifier("modifier_night_stalker_innate_custom_active")
end
function modifier_night_stalker_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.stalker_innate_ability = self.ability

	self.ability.night_timer = self.ability:GetSpecialValueFor("night_timer")
	self.ability.day_timer = self.ability:GetSpecialValueFor("day_timer")

	self.ability.movespeed_init = self.ability:GetSpecialValueFor("movespeed_init")
	self.ability.movespeed_inc = self.ability:GetSpecialValueFor("movespeed_inc")
	self.ability.attackspeed_init = self.ability:GetSpecialValueFor("attackspeed_init")
	self.ability.attackspeed_inc = self.ability:GetSpecialValueFor("attackspeed_inc")
	self.ability.level_max = self.ability:GetSpecialValueFor("level_max")

	self.ability.scepter_max = self.ability:GetSpecialValueFor("scepter_max")
	self.ability.scepter_radius = self.ability:GetSpecialValueFor("scepter_radius")
	self.ability.scepter_stats = self.ability:GetSpecialValueFor("scepter_stats")
	self.ability.scepter_stats_init = self.ability:GetSpecialValueFor("scepter_stats_init")
	self.ability.scepter_kill_radius = self.ability:GetSpecialValueFor("scepter_kill_radius")

	if not IsServer() then
		return
	end
	self.night_interval = 0.2
	self.interval = 0.5

	self.particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_night_stalker/nightstalker_night_buff.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	self:AddParticle(self.particle, false, false, -1, false, false)

	Timers:CreateTimer(1, function()
		if IsValid(self, self.ability) and not self.ability:IsStolen() then
			self:ScepterInit()
			dota1x6:NightStalkerInnate(self.parent)

			if self.parent:GetQuest() == "Stalker.Quest_7" then
				self.parent:AddDeathEvent(self, true)
			end
		end
	end)

	self:StartIntervalThink(self.interval)
end

function modifier_night_stalker_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local is_day = not self.parent:IsStalkerNight()

	if is_day and self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		if self.particle then
			ParticleManager:SetParticleControl(self.particle, 1, Vector(0, 0, 0))
		end
		self.parent:RemoveModifierByName("modifier_night_stalker_innate_custom_active")
	end

	if not is_day and not self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_night_stalker_innate_custom_active", {})
		if self.particle then
			ParticleManager:SetParticleControl(self.particle, 1, Vector(1, 0, 0))
		end
	end

	local interval = self.interval
	if not is_day then
		interval = self.night_interval
		if self.parent:HasScepter() and self.parent:IsAlive() then
			local min_dist = 999999
			local min_player = nil

			for _, player in pairs(players) do
				local dist = (player:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D()
				if
					player:IsAlive()
					and player:GetTeamNumber() ~= self.parent:GetTeamNumber()
					and dist <= self.ability.scepter_radius
					and min_dist > dist
				then
					min_dist = dist
					min_player = player
				end
			end

			if min_player then
				AddFOWViewer(self.parent:GetTeamNumber(), min_player:GetAbsOrigin(), 50, interval * 2, false)
			end
		end
	end

	self:StartIntervalThink(interval)
end

function modifier_night_stalker_innate_custom:ScepterInit()
	if not IsServer() then
		return
	end
	if self.scepter_init then
		return
	end
	if self.ability:IsStolen() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	self.scepter_init = true

	Timers:CreateTimer(1.5, function()
		CustomGameEventManager:Send_ServerToAllClients("NightStalker", { number = self.ability.scepter_max })
	end)

	self.parent:AddDeathEvent(self, true)
end

function modifier_night_stalker_innate_custom:DeathEvent(params)
	if not IsServer() then
		return
	end

	if self.parent == params.unit and not self.parent:IsReincarnating() then
		if self.parent:GetQuest() == "Stalker.Quest_7" and not self.parent:QuestCompleted() then
			self.parent:UpdateQuest(1, true)
		end
		return
	end

	if params.unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if params.unit == self.parent then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local target = params.unit

	if not target:IsValidKill(self.parent) then
		return
	end

	if
		self.parent == params.attacker
		or (self.parent:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() <= self.ability.scepter_kill_radius
	then
		if self.parent:GetQuest() == "Stalker.Quest_7" and not self.parent:QuestCompleted() then
			self.parent:UpdateQuest(1)
		end
		if self.parent:HasScepter() then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_night_stalker_innate_custom_stats",
				{ target = target:entindex() }
			)
		end
	end
end

function modifier_night_stalker_innate_custom:LifestealShield(params, shield)
	if not self.parent.dark_ability then
		return
	end
	if not IsValid(self.parent.dark_ability.shield_mod) then
		return
	end
	self.parent.dark_ability.shield_mod:AddShield(shield)
end

function modifier_night_stalker_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_STATS_INTELLECT_BONUS,
	}
end

function modifier_night_stalker_innate_custom:GetModifierBonusStats_Strength()
	if not self.parent:HasScepter() then
		return
	end
	return self.ability.scepter_stats_init
		+ self.parent:GetUpgradeStack("modifier_night_stalker_innate_custom_stats") * self.ability.scepter_stats
end

function modifier_night_stalker_innate_custom:GetModifierBonusStats_Agility()
	if not self.parent:HasScepter() then
		return
	end
	return self.ability.scepter_stats_init
		+ self.parent:GetUpgradeStack("modifier_night_stalker_innate_custom_stats") * self.ability.scepter_stats
end

function modifier_night_stalker_innate_custom:GetModifierBonusStats_Intellect()
	if not self.parent:HasScepter() then
		return
	end
	return self.ability.scepter_stats_init
		+ self.parent:GetUpgradeStack("modifier_night_stalker_innate_custom_stats") * self.ability.scepter_stats
end

function modifier_night_stalker_innate_custom:GetModifierIgnoreMovespeedLimit()
	return self.ability.talents.has_h3 == 1 and 1 or 0
end

function modifier_night_stalker_innate_custom:GetModifierMoveSpeed_Max()
	return self.ability.talents.has_h3 == 1 and self.ability.talents.h3_max_move or nil
end

function modifier_night_stalker_innate_custom:GetModifierMoveSpeed_Limit()
	return self.ability.talents.has_h3 == 1 and self.ability.talents.h3_max_move or nil
end

function modifier_night_stalker_innate_custom:GetModifierAttackSpeedBonus_Constant()
	if self.ability.talents.has_r7 == 1 then
		return
	end
	if not self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	return self.ability.attackspeed_init
		+ self.ability.attackspeed_inc * math.min(self.ability.level_max, self.parent:GetLevel())
		+ self.ability.talents.e1_speed
end

function modifier_night_stalker_innate_custom:GetModifierMoveSpeedBonus_Percentage()
	if not self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	return self.ability.movespeed_init
		+ self.ability.movespeed_inc * math.min(self.ability.level_max, self.parent:GetLevel())
		+ self.ability.talents.h3_move
end

function modifier_night_stalker_innate_custom:GetModifierPreAttack_BonusDamage()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.parent:HasModifier("modifier_night_stalker_innate_custom_active") then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	return self.ability.attackspeed_init
		+ self.ability.attackspeed_inc * math.min(self.ability.level_max, self.parent:GetLevel())
		+ self.ability.talents.e1_damage
end

modifier_night_stalker_innate_custom_stats = class(mod_visible)
function modifier_night_stalker_innate_custom_stats:RemoveOnDeath()
	return false
end
function modifier_night_stalker_innate_custom_stats:IsHidden()
	return self:GetStackCount() >= self.max
end
function modifier_night_stalker_innate_custom_stats:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.scepter_max
	self.stats = self.ability.scepter_stats
	self.stats_init = self.ability.scepter_stats_init

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_night_stalker_innate_custom_stats:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:GenericParticle("particles/night_stalker/scepter_stack.vpcf")
	self.parent:CalculateStatBonus(true)

	local target = EntIndexToHScript(table.target)
	if target then
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_5, 1.4)
		target:EmitSound("Hero_Nightstalker.Hunter.Target")
		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_night_stalker/nightstalker_shard_hunter.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControl(particle, 0, target:GetOrigin())
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			nil,
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if self:GetStackCount() < self.max then
		return
	end
	self.parent:EmitSound("BS.Thirst_legendary_active")

	Timers:CreateTimer(1, function()
		dota1x6.eternal_night = true
		GameRules:BeginNightstalkerNight(99999)
		CustomGameEventManager:Send_ServerToAllClients("NightStalker", {})
	end)
end

function modifier_night_stalker_innate_custom_stats:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_night_stalker_innate_custom_stats:OnTooltip()
	return self.stats_init + self:GetStackCount() * self.stats
end

modifier_night_stalker_innate_custom_active = class(mod_hidden)
function modifier_night_stalker_innate_custom_active:RemoveOnDeath()
	return false
end
function modifier_night_stalker_innate_custom_active:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end

	self.old_model = self.parent:GetModelName()

	if self.old_model == "models/heroes/nightstalker/nightstalker.vmdl" then
		wearables_system:AddItemForPlayer(self.parent, 337111112)
	end

	self.parent:GenericParticle("particles/units/heroes/hero_night_stalker/nightstalker_change.vpcf")
	self:StartIntervalThink(FrameTime())
end

function modifier_night_stalker_innate_custom_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:StartGesture(ACT_DOTA_NIGHTSTALKER_TRANSITION)
	self:StartIntervalThink(-1)
end

function modifier_night_stalker_innate_custom_active:OnDestroy()
	if not IsServer() then
		return
	end

	if self.old_model == "models/heroes/nightstalker/nightstalker.vmdl" then
		wearables_system:AddItemForPlayer(self.parent, 337111111)
	end

	self.parent:GenericParticle("particles/units/heroes/hero_night_stalker/nightstalker_change.vpcf")
end