--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_muerta_innate_custom_tracker",
	"abilities/muerta/muerta_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_innate_custom_dig_area",
	"abilities/muerta/muerta_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_innate_custom_dig_bounty",
	"abilities/muerta/muerta_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_innate_custom_creep",
	"abilities/muerta/muerta_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_innate_custom_creep_gospawn",
	"abilities/muerta/muerta_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_muerta_innate_custom_bonus_damage",
	"abilities/muerta/muerta_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)

muerta_innate_custom = class({})
muerta_innate_custom.talents = {}

function muerta_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("model", "models/muerta/muerta.vmdl", context)
	PrecacheResource("soundfile", "soundevents/npc_dota_hero_muerta.vsndevts", context)
	PrecacheResource("particle", "particles/muerta/muerta_dig_ground.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/ti9/muerta_dig_treasure.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_quest_kill.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_quest_item.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_muerta/muerta_ultimate_form_ethereal.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_muerta", context)
end

function muerta_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w2_health = 0,

			has_h3 = 0,
			h3_mana = 0,
			h3_cdr = 0,

			has_r2 = 0,
			r2_duration = caster:GetTalentValue("modifier_muerta_veil_2", "duration", true),

			r3_bva = 0,

			has_h2 = 0,
			h2_magic = 0,
			h2_move = 0,
			h2_bonus = caster:GetTalentValue("modifier_muerta_hero_2", "bonus", true),

			has_q7 = 0,
			q7_bva = caster:GetTalentValue("modifier_muerta_dead_7", "bva", true),

			has_w7 = 0,
			w7_bva = caster:GetTalentValue("modifier_muerta_calling_7", "bva", true),

			has_e7 = 0,

			has_r7 = 0,

			s1_radius = caster:GetTalentValue("modifier_muerta_quest_1", "radius", true),
			s1_max = caster:GetTalentValue("modifier_muerta_quest_1", "max", true),
			s2_max = caster:GetTalentValue("modifier_muerta_quest_2", "max", true),
			s3_max = caster:GetTalentValue("modifier_muerta_quest_3", "max", true),
		}
	end

	if caster:HasTalent("modifier_muerta_calling_2") then
		self.talents.w2_health = caster:GetTalentValue("modifier_muerta_calling_2", "health")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_muerta_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_magic = caster:GetTalentValue("modifier_muerta_hero_2", "magic")
		self.talents.h2_move = caster:GetTalentValue("modifier_muerta_hero_2", "move")
	end

	if caster:HasTalent("modifier_muerta_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_mana = caster:GetTalentValue("modifier_muerta_hero_3", "mana")
		self.talents.h3_cdr = caster:GetTalentValue("modifier_muerta_hero_3", "cdr")
	end

	if caster:HasTalent("modifier_muerta_veil_2") then
		self.talents.has_r2 = 1
		caster:AddDamageEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_muerta_veil_3") then
		self.talents.r3_bva = caster:GetTalentValue("modifier_muerta_veil_3", "bva")
	end

	if caster:HasTalent("modifier_muerta_dead_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_muerta_calling_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_muerta_gun_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_muerta_veil_7") then
		self.talents.has_r7 = 1
	end
end

function muerta_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_muerta_innate_custom_tracker"
end

function muerta_innate_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if not self.tracker then
		return
	end
	if not self.caster:HasScepter() then
		return
	end

	self.tracker:ScepterInit()
end

modifier_muerta_innate_custom_tracker = class(mod_visible)
function modifier_muerta_innate_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.muerta_innate = self.ability
	self.bva = self.parent:GetBaseAttackTime(false)

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.ability.waste = self.ability:GetSpecialValueFor("waste") / 100

	self.quest_dig_radius = self.ability.talents.s1_radius
	self.quest_dig_goal = self.ability.talents.s1_max
	self.quest_ghost_goal = self.ability.talents.s2_max
	self.quest_leash_goal = self.ability.talents.s3_max
	self.quest_duration = 120
	self.quest_cd = 30
	self.quest_max_start = 15
	self.quest_goal = 0

	if not IsServer() then
		return
	end

	self.quest_max = 0
	self.quest_creep_count = 1
	self.quest_creeps = { "npc_muerta_ogre", "npc_muerta_satyr", "npc_muerta_ursa", "npc_muerta_centaur" }

	self.quests_table = {
		["modifier_muerta_quest_1"] = 0,
		["modifier_muerta_quest_2"] = 0,
		["modifier_muerta_quest_3"] = 0,
		["modifier_muerta_quest_4"] = 0,
	}

	self.quest_phase = 0
	self.quest_timer = 0
	self.quest_object = nil

	self.parent:AddDeathEvent(self, true)
end

function modifier_muerta_innate_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.unit:IsUnit() then
		return
	end

	if
		self.ability.talents.has_r2 == 1
		and IsValid(self.parent.veil_ability)
		and params.inflictor
		and params.inflictor == self.parent.veil_ability
	then
		params.unit:AddNewModifier(
			self.parent,
			self.parent.veil_ability,
			"modifier_muerta_pierce_the_veil_custom_slow_bonus",
			{ duration = self.ability.talents.r2_duration }
		)
	end
end

function modifier_muerta_innate_custom_tracker:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.ability:IsStolen() then
		return
	end

	if self.parent == params.unit and not self.parent:IsReincarnating() then
		local mod = self.parent:FindModifierByName("modifier_muerta_innate_custom_bonus_damage")
		if mod and mod:GetStackCount() < self.ability.max then
			mod:SetStackCount(math.floor(mod:GetStackCount() * (1 + self.ability.waste)))
		end
		return
	end

	if not params.unit or not params.unit:IsValidKill(self.parent) then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local attacker = params.attacker:FindOwner()

	if
		self.parent == attacker
		or (self.parent:GetAbsOrigin() - params.unit:GetAbsOrigin()):Length2D() <= self.ability.radius
	then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_muerta_innate_custom_bonus_damage", {})
	end
end

function modifier_muerta_innate_custom_tracker:ChangeStack()
	if not IsServer() then
		return
	end

	local result = 0
	local mods = {
		"modifier_muerta_innate_custom_bonus_damage",
		"modifier_item_muerta_quest_item_stats",
		"modifier_muerta_shovel_custom_stats",
	}

	for _, name in pairs(mods) do
		local mod = self.parent:FindModifierByName(name)
		if mod then
			result = result + mod:GetStackCount()
		end
	end

	self:SetStackCount(result)
end

function modifier_muerta_innate_custom_tracker:ScepterInit()
	if not IsServer() then
		return
	end
	if self.ability:IsStolen() then
		return
	end
	if self.quest_init then
		return
	end

	local scepter = self.parent:FindItemInInventory("item_ultimate_scepter")
	if not scepter then
		return
	end

	UTIL_Remove(scepter)
	self.quest_init = true

	self.parent:EmitSound("Muerta.Quest_item2")

	local item = CreateItem("item_muerta_shovel_custom", self.parent, self.parent)
	self.parent:AddItem(item)

	self.quest_max = self.quest_max_start

	local count = RandomInt(1, 10)

	for i = 1, count do
		local random_1 = RandomInt(1, #self.quest_creeps)
		local random_2 = random_1

		repeat
			random_2 = RandomInt(1, #self.quest_creeps)
		until random_2 ~= random_1

		local buffer = self.quest_creeps[random_1]

		self.quest_creeps[random_1] = self.quest_creeps[random_2]
		self.quest_creeps[random_2] = buffer
	end

	self:MuertaQuestPhase()
	self:StartIntervalThink(1)
end

function modifier_muerta_innate_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	local time = math.max(0, (self.quest_max - self.quest_timer))
	local min = tostring(math.floor(time / 60))
	local sec = time - 60 * math.floor(time / 60)
	if sec < 10 then
		sec = "0" .. tostring(sec)
	else
		sec = tostring(sec)
	end

	local style
	local stack = 0
	local stack_icon = self.quest_phase ~= 3 and self.quest_count or -1
	local override_stack = min .. ":" .. sec
	local max = 1

	if self.quest_phase == 1 then
		style = "MuertaQuestDig"
	end

	if self.quest_phase == 2 then
		stack_icon = self.quest_count
		style = "MuertaQuestGhost"
	end

	if self.quest_phase == 3 then
		style = "MuertaQuestLeash"
		override_stack = nil
		stack = self.quest_count
		max = self.quest_goal
	elseif IsValid(self.quest_object) then
		stack = 1
	end

	if style ~= self.last_style or not style then
		self.parent:UpdateUIlong({ hide = 1, stack = 0, max = 1, style = self.last_style })
		self.last_style = style
	end

	if not style then
		return
	end
	self.parent:UpdateUIlong({
		override_stack = override_stack,
		no_min = 1,
		stack = stack,
		max = max,
		stack_icon = stack_icon,
		style = style,
	})
end

function modifier_muerta_innate_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.quest_phase > 2 or self.quest_ended then
		self:StartIntervalThink(-1)
		return
	end

	if not players[self.parent:GetId()] then
		return
	end

	self.quest_timer = self.quest_timer + 1

	if self.quest_timer >= self.quest_max then
		self.quest_timer = 0
		if IsValid(self.quest_object) then
			self:MuertaQuestReset()
		else
			if self.quest_phase == 1 then
				local spawners = Entities:FindAllByName("muerta_dig_area")

				if #spawners > 0 then
					local abs = spawners[RandomInt(1, #spawners)]:GetAbsOrigin()
					GameRules:ExecuteTeamPing(self.parent:GetTeamNumber(), abs.x, abs.y, self.parent, 0)

					self.quest_object =
						CreateUnitByName("npc_dota_companion", abs, false, nil, nil, self.parent:GetTeamNumber())
					self.quest_object:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_muerta_innate_custom_dig_area",
						{ radius = self.quest_dig_radius }
					)
				end
			end

			if self.quest_phase == 2 then
				local spawners = Entities:FindAllByName("muerta_creep_area")

				if #spawners > 0 then
					local abs = spawners[RandomInt(1, #spawners)]:GetAbsOrigin()
					GameRules:ExecuteTeamPing(self.parent:GetTeamNumber(), abs.x, abs.y, self.parent, 0)

					self.quest_object = CreateUnitByName(
						self.quest_creeps[self.quest_creep_count],
						abs,
						true,
						nil,
						nil,
						DOTA_TEAM_NEUTRALS
					)
					self.quest_object:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_muerta_innate_custom_creep",
						{}
					)
				end
				self.quest_creep_count = self.quest_creep_count + 1
				if self.quest_creep_count > #self.quest_creeps then
					self.quest_creep_count = 1
				end
			end

			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
				"muerta_quest_alert",
				{ type = self.spawn_alert }
			)
			self.quest_max = self.quest_duration
		end
	end

	self:UpdateUI()
end

function modifier_muerta_innate_custom_tracker:MuertaQuestPhase()
	if not IsServer() then
		return
	end
	if self.quest_ended or not self.quest_init then
		return
	end

	self.quest_phase = self.quest_phase + 1
	self.quest_count = 0

	if self.quest_phase == 1 then
		self.quest_goal = self.quest_dig_goal
		self.current_item = "item_muerta_shovel_custom"
		self.complete_alert = 3
		self.spawn_alert = 1
	end

	if self.quest_phase == 2 then
		self.quest_goal = self.quest_ghost_goal
		self.current_item = "item_muerta_mercy_custom"
		self.complete_alert = 5
		self.spawn_alert = 4
	end

	if self.quest_phase == 3 then
		self.quest_goal = self.quest_leash_goal
		self.current_item = "item_muerta_mercy_and_grace_custom"
		self.complete_alert = 6
	end

	if self.quest_phase == 4 then
		self.quest_ended = true
		self.quest_count = 1
		self.current_item = "item_muerta_mercy_and_grace_full_custom"
		self:SendTable()
	end
end

function modifier_muerta_innate_custom_tracker:MuertaQuestReset()
	if not IsServer() then
		return
	end

	if IsValid(self.quest_object) then
		if self.quest_object:HasModifier("modifier_muerta_innate_custom_dig_area") then
			self.quest_object:FindModifierByName("modifier_muerta_innate_custom_dig_area"):Destroy()
		elseif self.quest_object:HasModifier("modifier_muerta_innate_custom_creep") then
			self.quest_object:Kill(nil, nil)
		end
	end

	self.quest_object = nil
	self.quest_timer = 0
	self.quest_max = self.quest_cd

	self:UpdateUI()
end

function modifier_muerta_innate_custom_tracker:SendTable()
	if not IsServer() then
		return
	end
	local player_data = players[self.parent:GetId()].upgrades
	if player_data then
		player_data["modifier_muerta_quest_" .. tostring(self.quest_phase) .. "_data"] = self.quest_count
	end
	self.parent:UpdateCommonBonus()
end

function modifier_muerta_innate_custom_tracker:MuertaQuestProgress()
	if not IsServer() then
		return
	end
	if self.quest_ended or not self.quest_init then
		return
	end

	local item = self.parent:FindItemInInventory(self.current_item)
	if item then
		item:SetCurrentCharges(item:GetCurrentCharges() + 1)
	end

	local effect_cast =
		ParticleManager:CreateParticle("particles/muerta/muerta_quest_kill.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.parent:EmitSound("Muerta.Quest_hero_kill")

	self.quest_count = self.quest_count + 1
	self:SendTable()

	if self.quest_count >= self.quest_goal then
		self.parent:EmitSound("Muerta.Quest_item")
		self.parent:EmitSound("Muerta.Quest_item2")
		self.parent:GenericParticle("particles/muerta/muerta_quest_item.vpcf")
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
			"muerta_quest_alert",
			{ type = self.complete_alert }
		)

		if item then
			item:Destroy()
		end

		self:MuertaQuestPhase()

		local new_item = CreateItem(self.current_item, self.parent, self.parent)
		self.parent:AddItem(new_item)
	elseif self.quest_phase <= 2 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
			"muerta_quest_alert",
			{ type = 2, max = self.quest_goal, stack = self.quest_count }
		)
	end

	self:MuertaQuestReset()
end

function modifier_muerta_innate_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_muerta_innate_custom_tracker:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_e7 == 1 or self.ability.talents.has_r7 == 1 then
		return
	end
	return self:GetStackCount() * self.ability.damage
end

function modifier_muerta_innate_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_e7 == 0 and self.ability.talents.has_r7 == 0 then
		return
	end
	return self:GetStackCount() * self.ability.damage
end

function modifier_muerta_innate_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h2_magic
		* (self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom") and self.ability.talents.h2_bonus or 1)
end

function modifier_muerta_innate_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
		* (self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom") and self.ability.talents.h2_bonus or 1)
end

function modifier_muerta_innate_custom_tracker:GetModifierPercentageManacostStacking()
	return self.ability.talents.h3_mana
end

function modifier_muerta_innate_custom_tracker:GetModifierPercentageCooldown()
	return self.ability.talents.h3_cdr
end

function modifier_muerta_innate_custom_tracker:GetModifierExtraHealthPercentage()
	return self.ability.talents.w2_health
end

function modifier_muerta_innate_custom_tracker:GetModifierBaseAttackTimeConstant()
	local bva = 0
	if self.ability.talents.has_q7 == 1 then
		bva = self.ability.talents.q7_bva
	elseif self.ability.talents.has_w7 == 1 then
		bva = self.ability.talents.w7_bva
	end
	if self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom_bva") then
		bva = bva + self.ability.talents.r3_bva
	end
	if bva == 0 then
		return
	end
	return self.bva + bva
end

modifier_muerta_innate_custom_dig_area = class(mod_hidden)
function modifier_muerta_innate_custom_dig_area:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.center = self.parent:GetAbsOrigin()

	self.icon = CreateUnitByName("npc_muerta_dig_icon", self.center, false, nil, nil, self.caster:GetTeamNumber())
	self.icon:AddNewModifier(self.caster, nil, "modifier_unselect", {})

	self.radius = table.radius

	self.bounty = CreateUnitByName(
		"npc_dota_companion",
		self.center + RandomVector(RandomInt(100, self.radius - 50)),
		false,
		nil,
		nil,
		self.caster:GetTeamNumber()
	)
	self.bounty:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_muerta_innate_custom_dig_bounty",
		{ area = self.parent:entindex() }
	)

	local effect_cast = ParticleManager:CreateParticleForTeam(
		"particles/muerta/muerta_dig_ground.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(effect_cast, 0, self.center)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, 1, 1))
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(999999, 0, 0))
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self.interval = 1
	self:StartIntervalThink(self.interval)
end

function modifier_muerta_innate_custom_dig_area:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.center, self.radius * 1.5, self.interval + 0.2, false)
end

function modifier_muerta_innate_custom_dig_area:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.icon) then
		UTIL_Remove(self.icon)
	end

	if IsValid(self.bounty) then
		UTIL_Remove(self.bounty)
	end

	UTIL_Remove(self.parent)
end

function modifier_muerta_innate_custom_dig_area:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
	}
end

modifier_muerta_innate_custom_dig_bounty = class(mod_hidden)
function modifier_muerta_innate_custom_dig_bounty:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.point = self.parent:GetAbsOrigin()
	self.area = EntIndexToHScript(table.area)
end

function modifier_muerta_innate_custom_dig_bounty:OnDestroy()
	if not IsServer() then
		return
	end
	UTIL_Remove(self.parent)
end

function modifier_muerta_innate_custom_dig_bounty:Complete()
	if not IsServer() then
		return
	end

	if self.ability.tracker then
		self.ability.tracker:MuertaQuestProgress()
	end

	local effect_cast =
		ParticleManager:CreateParticle("particles/econ/events/ti9/muerta_dig_treasure.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, self.point)
	ParticleManager:SetParticleControl(effect_cast, 1, self.point)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	if IsValid(self.area) then
		self.area:RemoveModifierByName("modifier_muerta_innate_custom_dig_area")
	end
end

function modifier_muerta_innate_custom_dig_bounty:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
	}
end

modifier_muerta_innate_custom_creep = class(mod_hidden)
function modifier_muerta_innate_custom_creep:RemoveOnDeath()
	return false
end
function modifier_muerta_innate_custom_creep:GetStatusEffectName()
	return "particles/status_fx/status_effect_wraithking_ghosts.vpcf"
end
function modifier_muerta_innate_custom_creep:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_muerta_innate_custom_creep:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.parent:AddDeathEvent(self, true)

	self.parent:GenericParticle("particles/units/heroes/hero_muerta/muerta_ultimate_form_ethereal.vpcf", self)

	self.icon = CreateUnitByName(
		"npc_muerta_creep_icon",
		self.parent:GetAbsOrigin(),
		false,
		nil,
		nil,
		self.caster:GetTeamNumber()
	)
	self.icon:AddNewModifier(self.caster, nil, "modifier_unselect", {})

	self.interval = 0.5
	self.health = self.parent:GetBaseMaxHealth()
	self.damage = self.parent:GetBaseDamageMin()
	self.speed = 0

	self.change_health = 0
	self.change_damage = 0

	for i = 2, dota1x6.current_wave do
		self.up_health = 1.30
		self.up_damage = 1.23

		if i >= 10 then
			self.up_damage = 1.18
			self.up_health = 1.21
			self.speed = 20
		end
		if i >= 15 then
			self.up_damage = 1.17
			self.up_health = 1.20
			self.speed = 40
		end
		if i >= 20 then
			self.up_damage = 1.18
			self.up_health = 1.23
			self.speed = 80
		end

		self.health = self.health * self.up_health
		self.damage = self.damage * self.up_damage
	end

	self.health = self.health * 1.4
	self.damage = self.damage * 1.4

	self.change_health = self.health - self.parent:GetBaseMaxHealth()
	self.change_damage = self.damage - self.parent:GetBaseDamageMin()

	self:SetHasCustomTransmitterData(true)

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_muerta_innate_custom_creep:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.icon) then
		UTIL_Remove(self.icon)
	end
end

function modifier_muerta_innate_custom_creep:CheckState()
	return {
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
	}
end

function modifier_muerta_innate_custom_creep:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_BONUS,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_muerta_innate_custom_creep:DeathEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	self.parent:EmitSound("Muerta.Quest_ghost_death")

	local attacker = params.attacker:FindOwner()

	if attacker ~= self.caster then
		return
	end
	if not self.ability.tracker then
		return
	end

	self.ability.tracker:MuertaQuestProgress()
end

function modifier_muerta_innate_custom_creep:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 600, self.interval + 0.2, false)
end

function modifier_muerta_innate_custom_creep:AddCustomTransmitterData()
	return {
		change_damage = self.change_damage,
		change_health = self.change_health,
		speed = self.speed,
	}
end

function modifier_muerta_innate_custom_creep:HandleCustomTransmitterData(data)
	self.change_damage = data.change_damage
	self.change_health = data.change_health
	self.speed = data.speed
end

function modifier_muerta_innate_custom_creep:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

function modifier_muerta_innate_custom_creep:GetModifierBaseAttack_BonusDamage()
	return self.change_damage
end

function modifier_muerta_innate_custom_creep:GetModifierExtraHealthBonus()
	return self.change_health
end

modifier_muerta_innate_custom_creep_gospawn = class(mod_hidden)
function modifier_muerta_innate_custom_creep_gospawn:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_muerta_innate_custom_creep_gospawn:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_muerta_innate_custom_creep_gospawn:GetModifierMoveSpeedBonus_Percentage()
	return 50
end

modifier_muerta_innate_custom_bonus_damage = class(mod_hidden)
function modifier_muerta_innate_custom_bonus_damage:RemoveOnDeath()
	return false
end
function modifier_muerta_innate_custom_bonus_damage:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.max

	self:OnRefresh()
end

function modifier_muerta_innate_custom_bonus_damage:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	local effect_cast =
		ParticleManager:CreateParticle("particles/muerta/muerta_quest_kill.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)

	self.parent:EmitSound("Muerta.Quest_hero_kill")

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Muerta.Quest_item")
		self.parent:GenericParticle("particles/muerta/muerta_quest_item.vpcf")
	end
end

function modifier_muerta_innate_custom_bonus_damage:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	self.ability.tracker:ChangeStack()
end