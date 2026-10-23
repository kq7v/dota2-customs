--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_furion_force_of_nature_custom",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_tracker",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_call_3"
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_legendary",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_furion_call_7" }
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_legendary_active",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_call_7"
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_treant_auto",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_fear_speed",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_hero_6"
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_health",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_call_2"
)
LinkLuaModifier(
	"modifier_furion_force_of_nature_custom_armor",
	"abilities/furion/furion_force_of_nature_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_call_3"
)

furion_force_of_nature_custom = class({})
furion_force_of_nature_custom.talents = {}

function furion_force_of_nature_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_force_of_nature_cast.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/call_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/call_legendary_body.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_return_buff.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/call_legendary_link.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/call_legendary_hands.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/call_legendary_overhead.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_ransack.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_hit.vpcf", context)
end

function furion_force_of_nature_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_damage_ents = 0,
			e1_damage = 0,

			has_e2 = 0,
			e2_health = 0,
			e2_heal = 0,
			e2_max = caster:GetTalentValue("modifier_furion_call_2", "max", true),

			has_e3 = 0,
			e3_armor = 0,
			e3_speed = 0,
			e3_max = caster:GetTalentValue("modifier_furion_call_3", "max", true),
			e3_duration = caster:GetTalentValue("modifier_furion_call_3", "duration", true),
			e3_attacks = caster:GetTalentValue("modifier_furion_call_3", "attacks", true),
			e3_stack = caster:GetTalentValue("modifier_furion_call_3", "stack", true),

			has_e4 = 0,
			e4_duration = caster:GetTalentValue("modifier_furion_call_4", "duration", true),
			e4_stun = caster:GetTalentValue("modifier_furion_call_4", "stun", true),
			e4_status = caster:GetTalentValue("modifier_furion_call_4", "status", true),
			e4_slow_resist = caster:GetTalentValue("modifier_furion_call_4", "slow_resist", true),
			e4_chance = caster:GetTalentValue("modifier_furion_call_4", "chance", true),
			e4_talent_cd = caster:GetTalentValue("modifier_furion_call_4", "talent_cd", true),

			has_e7 = 0,
			e7_duration = caster:GetTalentValue("modifier_furion_call_7", "duration", true),
			e7_duration_k = caster:GetTalentValue("modifier_furion_call_7", "duration_k", true),
			e7_max = caster:GetTalentValue("modifier_furion_call_7", "max", true),
			e7_damage_reduce = caster:GetTalentValue("modifier_furion_call_7", "damage_reduce", true),
			e7_speed = caster:GetTalentValue("modifier_furion_call_7", "speed", true),
			e7_move = caster:GetTalentValue("modifier_furion_call_7", "move", true),
			e7_cast = caster:GetTalentValue("modifier_furion_call_7", "cast", true),
			e7_cd = caster:GetTalentValue("modifier_furion_call_7", "cd", true),
			e7_stack_duration = caster:GetTalentValue("modifier_furion_call_7", "stack_duration", true),
			e7_damage_reduce_hero = caster:GetTalentValue("modifier_furion_call_7", "damage_reduce_hero", true),

			has_h1 = 0,
			h1_armor = 0,
			h1_bonus = caster:GetTalentValue("modifier_furion_hero_1", "bonus", true),

			has_h3 = 0,
			h3_move = 0,
			h3_gold = 0,
			h3_chance = caster:GetTalentValue("modifier_furion_hero_3", "chance", true),

			has_h6 = 0,
			h6_fear = caster:GetTalentValue("modifier_furion_hero_6", "fear", true),
			h6_cd = caster:GetTalentValue("modifier_furion_hero_6", "cd", true),
			h6_speed = caster:GetTalentValue("modifier_furion_hero_6", "speed", true),
		}
	end

	if caster:HasTalent("modifier_furion_call_1") then
		self.talents.has_e1 = 1
		self.talents.e1_damage_ents = caster:GetTalentValue("modifier_furion_call_1", "damage_ents") / 100
		self.talents.e1_damage = caster:GetTalentValue("modifier_furion_call_1", "damage")
	end

	if caster:HasTalent("modifier_furion_call_2") then
		self.talents.has_e2 = 1
		self.talents.e2_health = caster:GetTalentValue("modifier_furion_call_2", "health")
		self.talents.e2_heal = caster:GetTalentValue("modifier_furion_call_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_furion_call_2", type = 2, value = self.talents.e2_heal })
	end

	if caster:HasTalent("modifier_furion_call_3") then
		self.talents.has_e3 = 1
		self.talents.e3_armor = caster:GetTalentValue("modifier_furion_call_3", "armor")
		self.talents.e3_speed = caster:GetTalentValue("modifier_furion_call_3", "speed")
	end

	if caster:HasTalent("modifier_furion_call_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { cd = self.talents.e4_talent_cd, land = true })
	end

	if caster:HasTalent("modifier_furion_call_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_furion_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_armor = caster:GetTalentValue("modifier_furion_hero_1", "armor")
	end

	if caster:HasTalent("modifier_furion_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_move = caster:GetTalentValue("modifier_furion_hero_3", "move")
		self.talents.h3_gold = caster:GetTalentValue("modifier_furion_hero_3", "gold")
	end

	if caster:HasTalent("modifier_furion_hero_6") then
		self.talents.has_h6 = 1
	end
end

function furion_force_of_nature_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_furion_force_of_nature_custom_tracker"
end

function furion_force_of_nature_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_furion_force_of_nature_custom_legendary") then
		return "furion_curse_of_the_forest"
	end
	return "furion_force_of_nature"
end

function furion_force_of_nature_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_furion_force_of_nature_custom_legendary") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function furion_force_of_nature_custom:GetBehavior()
	if self.caster:HasModifier("modifier_furion_force_of_nature_custom_legendary") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end

function furion_force_of_nature_custom:GetCastPoint()
	if self.caster:HasModifier("modifier_furion_force_of_nature_custom_legendary") then
		return self.talents.e7_cast
	end
	return self.BaseClass.GetCastPoint(self)
end

function furion_force_of_nature_custom:GetAOERadius()
	return self.area_of_effect or 0
end

function furion_force_of_nature_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.has_h6 == 1 and self.talents.h6_cd or 0)
end

function furion_force_of_nature_custom:OnAbilityPhaseStart()
	local mod = self.caster:FindModifierByName("modifier_furion_force_of_nature_custom_legendary")
	if mod then
		return mod.stack > 0
	end

	if
		self.talents.has_h6 == 1
		or #GridNav:GetAllTreesAroundPoint(self:GetCursorPosition(), self.area_of_effect, false) > 0
	then
		return true
	end

	self.caster:SendError("#no_trees")
	return false
end

function furion_force_of_nature_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_furion_force_of_nature_custom_legendary")
	if mod then
		mod.active = true
		mod:Destroy()
		return
	end

	local point = self:GetCursorPosition()
	local radius = self.area_of_effect

	if
		self.talents.has_e7 == 1
		and not self.caster:HasModifier("modifier_furion_force_of_nature_custom_legendary_active")
	then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_furion_force_of_nature_custom_legendary",
			{ duration = self.talents.e7_stack_duration }
		)
	end

	if self.talents.has_h6 == 0 then
		GridNav:DestroyTreesAroundPoint(point, radius * 0.8, true)
	else
		for _, target in pairs(self.caster:FindTargets(radius, point)) do
			target:EmitSound("Generic.Fear")
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_nevermore_requiem_fear",
				{ duration = self.talents.h6_fear * (1 - target:GetStatusResistance()) }
			)
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_furion_force_of_nature_custom_fear_speed",
				{ duration = self.talents.h6_fear * (1 - target:GetStatusResistance()) }
			)
		end
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_furion/furion_force_of_nature_cast.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 50)
	ParticleManager:SetParticleControl(particle, 1, point)
	ParticleManager:SetParticleControl(particle, 2, Vector(radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	EmitSoundOnLocationWithCaster(point, "Hero_Furion.ForceOfNature", self.caster)

	for i, treant in pairs(self.treants) do
		if IsValid(treant) then
			treant:AddNewModifier(treant, nil, "modifier_death", {})
			treant:Kill(nil, nil)
		end
		self.treants[i] = nil
	end

	for i = 1, self.max_treants do
		local treant = self:SpawnTreant(point)
		table.insert(self.treants, treant)
	end
end

function furion_force_of_nature_custom:SpawnTreant(point, is_auto)
	if not IsServer() then
		return
	end

	local health = self.treant_health
	local duration = is_auto and self.talents.e4_duration or self.treant_duration
	local mod = self.caster:FindModifierByName("modifier_furion_force_of_nature_custom_health")

	if mod and mod.OnTooltip then
		health = health + mod:OnTooltip()
	end

	local treant = CreateUnitByName(
		"npc_dota_furion_treant_custom",
		point,
		true,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	treant:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })
	treant.owner = self.caster
	treant.is_treant = treant

	if not is_auto then
		treant:SetControllableByPlayer(self.caster:GetPlayerID(), true)
	end

	treant:SetOwner(self.caster)
	treant:SetBaseMaxHealth(health)
	treant:SetMaxHealth(health)
	treant:SetHealth(health)

	local damage = self.treant_damage + self.caster:GetBaseDamageMax() * self.talents.e1_damage_ents

	treant:SetBaseDamageMin(damage)
	treant:SetBaseDamageMax(damage)
	treant:SetPhysicalArmorBaseValue(self.base_armor)
	treant:SetBaseMagicalResistanceValue(self.magic_resistance)
	treant:SetAngles(0, 0, 0)
	treant:SetForwardVector(self.caster:GetForwardVector())
	FindClearSpaceForUnit(treant, treant:GetAbsOrigin(), true)

	treant:AddNewModifier(self.caster, self, "modifier_furion_force_of_nature_custom", {})

	local new_model = wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_furion_treant", self)
	if new_model then
		treant:SetModel(new_model)
		treant:SetOriginalModel(new_model)
	end

	return treant
end

modifier_furion_force_of_nature_custom = class(mod_hidden)
function modifier_furion_force_of_nature_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.creeps = self.ability.creeps_damage * 100
	self.max_move = self.ability.max_move
	if not IsServer() then
		return
	end

	self.ability.all_treants[self.parent] = true
	self.parent:AddLifesteal(self, {
		name = "modifier_furion_call_2",
		type = 2,
		heal_unit = self.caster,
		value = function()
			return self.ability.talents.e2_heal
		end,
	})

	if self.ability.talents.has_e4 == 1 then
		self.parent.creep_status = self.ability.talents.e4_status
	end

	if self.ability.talents.has_e3 == 0 then
		return
	end
	if not self.ability.tracker then
		return
	end

	self.ability.tracker:IncrementStackCount()
end

function modifier_furion_force_of_nature_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Hero_Furion.TreantDeath")

	self.ability.all_treants[self.parent] = nil

	if self.ability.talents.has_e3 == 0 then
		return
	end
	if not self.ability.tracker then
		return
	end

	self.ability.tracker:DecrementStackCount()
end

function modifier_furion_force_of_nature_custom:CheckState()
	return {
		[MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES] = true,
	}
end

function modifier_furion_force_of_nature_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
	}
end

function modifier_furion_force_of_nature_custom:GetModifierIgnoreMovespeedLimit()
	return 1
end

function modifier_furion_force_of_nature_custom:GetModifierMoveSpeed_Max()
	return self.max_move
end

function modifier_furion_force_of_nature_custom:GetModifierMoveSpeed_Limit()
	return self.max_move
end

function modifier_furion_force_of_nature_custom:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h1_armor
		* (self.caster:HasModifier("modifier_furion_teleportation_custom_armor") and self.ability.talents.h1_bonus or 1)
end

function modifier_furion_force_of_nature_custom:GetModifierTotalDamageOutgoing_Percentage(params)
	if not params.target then
		return
	end
	if not params.target:IsCreep() then
		return
	end
	if params.inflictor then
		return
	end
	return self.creeps
end

function modifier_furion_force_of_nature_custom:GetModifierDamageOutgoing_Percentage()
	if not IsValid(self.caster.furion_innate) then
		return
	end
	return self.caster.furion_innate:GetBonus()
end

function modifier_furion_force_of_nature_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h3_move
end

function modifier_furion_force_of_nature_custom:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_slow_resist
end

modifier_furion_force_of_nature_custom_tracker = class(mod_hidden)
function modifier_furion_force_of_nature_custom_tracker:IsHidden()
	return self.ability.talents.has_e3 == 0
end
function modifier_furion_force_of_nature_custom_tracker:GetTexture()
	return "buffs/furion/nature_call_3"
end
function modifier_furion_force_of_nature_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.treants = {}
	self.ability.all_treants = {}

	self.ability.max_treants = self.ability:GetSpecialValueFor("max_treants")
	self.ability.treant_damage = self.ability:GetSpecialValueFor("treant_damage")
	self.ability.base_armor = self.ability:GetSpecialValueFor("base_armor")
	self.ability.area_of_effect = self.ability:GetSpecialValueFor("area_of_effect")
	self.ability.treant_duration = self.ability:GetSpecialValueFor("treant_duration")
	self.ability.treant_health = self.ability:GetSpecialValueFor("treant_health")
	self.ability.magic_resistance = self.ability:GetSpecialValueFor("magic_resistance")
	self.ability.max_move = self.ability:GetSpecialValueFor("max_move")
	self.ability.heal = self.ability:GetSpecialValueFor("heal") / 100
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.parent:AddDeathEvent(self, true)
	self.parent:AddProc(self, { name = "hit", land = true, illusion = true })
end

function modifier_furion_force_of_nature_custom_tracker:OnRefresh()
	self.ability.max_treants = self.ability:GetSpecialValueFor("max_treants")
	self.ability.treant_damage = self.ability:GetSpecialValueFor("treant_damage")
	self.ability.base_armor = self.ability:GetSpecialValueFor("base_armor")
end

function modifier_furion_force_of_nature_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.e4_chance
end

function modifier_furion_force_of_nature_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local attacker = params.attacker
	local target = params.target

	if self.parent ~= attacker and (attacker:FindOwner() ~= self.parent or not attacker.is_treant) then
		return
	end

	if attacker.is_treant then
		local effect_cast = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_meepo/meepo_ransack.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		self.parent:GenericHeal(self.parent:GetMaxHealth() * self.ability.heal, self.ability, true, "")
	end

	if self.ability.talents.has_e3 == 1 then
		local stack = attacker.is_treant and 1 or self.ability.talents.e3_stack
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_force_of_nature_custom_armor",
			{ duration = self.ability.talents.e3_duration, stack = stack }
		)
	end

	if params.procs[self].default then
		target:EmitSound("Furion.Call_bash")
		target:EmitSound("Furion.Call_bash2")
		target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_bashed",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e4_stun }
		)

		local hit_effect =
			ParticleManager:CreateParticle("particles/nature_prophet/sprout_hit.vpcf", PATTACH_CUSTOMORIGIN, target)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)

		local treant = self.ability:SpawnTreant(target:GetAbsOrigin() + RandomVector(100), true)
		if treant then
			treant:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_furion_force_of_nature_custom_treant_auto",
				{ target = target:entindex() }
			)
		end
	end
end

function modifier_furion_force_of_nature_custom_tracker:DeathEvent(params)
	if not IsServer() then
		return
	end

	local attacker = params.attacker:FindOwner()

	if attacker ~= self.parent then
		return
	end
	if not params.unit:IsCreep() then
		return
	end

	if
		self.ability.talents.has_h3 == 1
		and RollPseudoRandomPercentage(self.ability.talents.h3_chance, 5823, self.parent)
	then
		self.parent:GiveGold(self.ability.talents.h3_gold, nil, nil, "modifier_furion_hero_3")
	end

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_furion_force_of_nature_custom_health", {})
end

function modifier_furion_force_of_nature_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_furion_force_of_nature_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.e3_speed * math.min(self.ability.talents.e3_max, self:GetStackCount())
end

function modifier_furion_force_of_nature_custom_tracker:GetModifierBaseAttack_BonusDamage()
	return self.ability.talents.e1_damage
end

function modifier_furion_force_of_nature_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h3_move
end

modifier_furion_force_of_nature_custom_legendary = class(mod_hidden)
function modifier_furion_force_of_nature_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max_stack = self.ability.talents.e7_max
	self.time = self:GetRemainingTime()
	self.stack = 0

	self.RemoveForDuel = true

	self.ability:EndCd(1)
	self.parent:AddAttackStartEvent_out(self, true)

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_furion_force_of_nature_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({
		active = 0,
		max = self.time,
		stack = self:GetRemainingTime(),
		override_stack = tostring(self.stack) .. " / " .. tostring(self.max_stack),
		style = "FurionCall",
	})
end

function modifier_furion_force_of_nature_custom_legendary:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.stack >= self.max_stack then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if self.parent:HasModifier("modifier_furion_force_of_nature_custom_legendary_active") then
		return
	end

	local target = params.target
	if not target:IsUnit() or not target:IsHero() then
		return
	end

	self.stack = self.stack + 1
end

function modifier_furion_force_of_nature_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if not self.active then
		self.parent:UpdateUIlong({ hide = 1, style = "FurionCall" })
		self.parent:CdAbility(self.ability, self:GetElapsedTime(), nil, "modifier_furion_call_7")
	else
		self.parent:GenericParticle("particles/nature_prophet/call_legendary_cast.vpcf")
		self.parent:EmitSound("Furion.Call_legendary_cast")

		local duration = self.ability.talents.e7_duration
			* math.pow(self.stack / self.max_stack, self.ability.talents.e7_duration_k)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_furion_force_of_nature_custom_legendary_active",
			{ duration = duration }
		)
	end
end

modifier_furion_force_of_nature_custom_legendary_active = class(mod_hidden)
function modifier_furion_force_of_nature_custom_legendary_active:RemoveOnDeath()
	return not self.is_caster
end
function modifier_furion_force_of_nature_custom_legendary_active:GetEffectName()
	return "particles/nature_prophet/call_legendary_overhead.vpcf"
end
function modifier_furion_force_of_nature_custom_legendary_active:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_furion_force_of_nature_custom_legendary_active:GetStatusEffectName()
	return "particles/status_fx/status_effect_doom.vpcf"
end
function modifier_furion_force_of_nature_custom_legendary_active:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_furion_force_of_nature_custom_legendary_active:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e7_speed
	self.move = self.ability.talents.e7_move
	self.damage_reduce = self.ability.talents.e7_damage_reduce
	self.damage_reduce_hero = self.ability.talents.e7_damage_reduce_hero

	self.is_caster = self.parent == self.caster

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.ability:EndCd()
	self.time = self:GetRemainingTime()

	self.effect = ParticleManager:CreateParticle(
		"particles/nature_prophet/call_legendary_body.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		Vector(0, 0, 0),
		true
	)
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.parent:EmitSound("Furion.Call_legendary_buff")
	self.parent:EmitSound("Furion.Call_legendary_buff2")

	if self.is_caster then
		self.parent:GenericParticle("particles/units/heroes/hero_centaur/centaur_return_buff.vpcf", self)
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)
	else
		local mod = self.parent:FindModifierByName("modifier_kill")
		if mod then
			mod:SetDuration(999, true)
		end

		local pfx = ParticleManager:CreateParticle(
			"particles/nature_prophet/call_legendary_link.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			pfx,
			0,
			self.caster,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			pfx,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(pfx)

		self.parent:GenericParticle("particles/nature_prophet/call_legendary_hands.vpcf", self)
	end
end

function modifier_furion_force_of_nature_custom_legendary_active:OnIntervalThink()
	if not IsServer() then
		return
	end

	for treant, _ in pairs(self.ability.all_treants) do
		if IsValid(treant) then
			treant:AddNewModifier(self.parent, self.ability, self:GetName(), { duration = 1 })
		end
	end

	self.parent:UpdateUIlong({
		active = 1,
		max = self.time,
		stack = self:GetRemainingTime(),
		override_stack = self:GetRemainingTime(),
		use_zero = 1,
		style = "FurionCall",
	})
end

function modifier_furion_force_of_nature_custom_legendary_active:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()
	self.ability:EndCooldown()
	self.ability:StartCooldown(self.ability.talents.e7_cd)

	self.parent:StopSound("Furion.Call_legendary_buff2")

	if not self.is_caster then
		self.parent:Kill(nil, nil)
		return
	end

	for treant, _ in pairs(self.ability.all_treants) do
		if IsValid(treant) then
			treant:RemoveModifierByName(self:GetName())
		end
	end

	self.parent:UpdateUIlong({ active = 1, hide = 1, style = "FurionCall" })
end

function modifier_furion_force_of_nature_custom_legendary_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_furion_force_of_nature_custom_legendary_active:CheckState()
	if self.is_caster then
		return
	end
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_furion_force_of_nature_custom_legendary_active:GetModifierAttackSpeedBonus_Constant()
	if self.is_caster then
		return
	end
	return self.speed
end

function modifier_furion_force_of_nature_custom_legendary_active:GetModifierMoveSpeedBonus_Percentage()
	if self.is_caster then
		return
	end
	return self.move
end

function modifier_furion_force_of_nature_custom_legendary_active:GetModifierIncomingDamage_Percentage()
	if self.is_caster then
		return self.damage_reduce_hero
	end
	return self.damage_reduce
end

function modifier_furion_force_of_nature_custom_legendary_active:GetModifierModelScale()
	return 30
end

modifier_furion_force_of_nature_custom_treant_auto = class(mod_hidden)
function modifier_furion_force_of_nature_custom_treant_auto:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = 1000
	self.target = nil
	self.vec = RandomVector(200)

	if table.target then
		self:SetTarget(EntIndexToHScript(table.target))
	end

	self:OnIntervalThink()
	self:StartIntervalThink(0.3)
end

function modifier_furion_force_of_nature_custom_treant_auto:IsValidTarget(target)
	if not IsServer() then
		return
	end

	if
		not IsValid(target)
		or not target:IsAlive()
		or ((target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius)
		or not target:IsUnit()
	then
		return false
	end
	return true
end

function modifier_furion_force_of_nature_custom_treant_auto:SetTarget(target)
	if not IsServer() then
		return
	end
	if not self:IsValidTarget(target) then
		return
	end
	if self.target == target then
		return
	end

	self.target = target
	self.parent:MoveToPositionAggressive(self.target:GetAbsOrigin())
	self.parent:SetForceAttackTarget(self.target)
end

function modifier_furion_force_of_nature_custom_treant_auto:MoveToCaster()
	if not IsServer() then
		return
	end

	self.target = nil
	self.parent:SetForceAttackTarget(nil)

	local point = self.caster:GetAbsOrigin() + self.vec

	if (point - self.parent:GetAbsOrigin()):Length2D() > 50 then
		self.parent:MoveToPosition(self.caster:GetAbsOrigin() + self.vec)
	end
end

function modifier_furion_force_of_nature_custom_treant_auto:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:GetAggroTarget() then
		self.target = self.parent:GetAggroTarget()
	end

	if self:IsValidTarget(self.target) then
		self:SetTarget(self.target)
		return
	else
		for _, enemy in
			pairs(
				self.parent:FindTargets(
					self.radius,
					nil,
					nil,
					DOTA_UNIT_TARGET_FLAG_INVULNERABLE
						+ DOTA_UNIT_TARGET_FLAG_NO_INVIS
						+ DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE
				)
			)
		do
			if self:IsValidTarget(enemy) then
				self:SetTarget(enemy)
				break
			end
		end
	end

	if not self:IsValidTarget(self.target) then
		self:MoveToCaster()
	end
end

modifier_furion_force_of_nature_custom_fear_speed = class(mod_hidden)
function modifier_furion_force_of_nature_custom_fear_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_furion_force_of_nature_custom_fear_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MAX,
	}
end

function modifier_furion_force_of_nature_custom_fear_speed:GetModifierMoveSpeed_AbsoluteMax()
	return self.ability.talents.h6_speed
end

modifier_furion_force_of_nature_custom_health = class(mod_hidden)
function modifier_furion_force_of_nature_custom_health:IsHidden()
	return self.ability.talents.has_e2 == 0 or self:GetStackCount() >= self.max
end
function modifier_furion_force_of_nature_custom_health:RemoveOnDeath()
	return false
end
function modifier_furion_force_of_nature_custom_health:GetTexture()
	return "buffs/furion/nature_call_2"
end
function modifier_furion_force_of_nature_custom_health:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e2_max

	if not IsServer() then
		return
	end

	self:OnRefresh()
	self:StartIntervalThink(2)
end

function modifier_furion_force_of_nature_custom_health:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e2 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/generic/patrol_refresh.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")

	self:StartIntervalThink(-1)
end

function modifier_furion_force_of_nature_custom_health:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_furion_force_of_nature_custom_health:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_furion_force_of_nature_custom_health:OnTooltip()
	if self.ability.talents.has_e2 == 0 then
		return 0
	end
	return self:GetStackCount() * self.ability.talents.e2_health / self.max
end

modifier_furion_force_of_nature_custom_armor = class(mod_visible)
function modifier_furion_force_of_nature_custom_armor:GetTexture()
	return "buffs/furion/nature_call_3"
end
function modifier_furion_force_of_nature_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e3_attacks
	self.armor = self.ability.talents.e3_armor / self.max

	if not IsServer() then
		return
	end
	self:OnRefresh(table)
end

function modifier_furion_force_of_nature_custom_armor:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:SetStackCount(math.min(self.max, self:GetStackCount() + table.stack))

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Hoodwink.Acorn_armor")
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_furion_force_of_nature_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_furion_force_of_nature_custom_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.armor
end