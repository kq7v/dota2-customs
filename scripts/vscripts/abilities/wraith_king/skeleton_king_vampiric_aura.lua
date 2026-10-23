--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_skeleton_ai",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skelet_reincarnation",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_legendary",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_vampiric_7"
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_armor",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_vampiric_3"
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_path",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_totem",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_totem_aura",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_vampiric_4"
)
LinkLuaModifier(
	"modifier_skeleton_king_vampiric_aura_custom_slow",
	"abilities/wraith_king/skeleton_king_vampiric_aura.lua",
	LUA_MODIFIER_MOTION_NONE
)

skeleton_king_vampiric_aura_custom = class({})
skeleton_king_vampiric_aura_custom.talents = {}
skeleton_king_vampiric_aura_custom.active_skelets = {}
skeleton_king_vampiric_aura_custom.active_totem = nil

function skeleton_king_vampiric_aura_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/neutral_fx/skeleton_spawn.vpcf", context)
	PrecacheResource("particle", "particles/wk_arc_minion_ambient.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/wraith_king/wraith_king_ti8/wk_ti8_creep_ambient.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/wraith_king/wraith_king_ti8/wk_ti8_creep_crimson_ambient.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/wraith_king_vampiric_aura_lifesteal.vpcf",
		context
	)
	PrecacheResource("particle", "particles/sand_king/sandking_caustic_finale_explode_custom.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_drow_frost_arrow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_shield_rune.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_hands_glow.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items5_fx/wraith_pact_ambient.vpcf", context)
	PrecacheResource("particle", "particles/items5_fx/wraith_pact_pulses_target.vpcf", context)
	PrecacheResource("particle", "particles/centaur/return_legendary_pulses.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/totem_dispell.vpcf", context)

	PrecacheUnitByNameSync("npc_dota_wraith_king_skeleton_totem_custom", context, -1)
	PrecacheUnitByNameSync("npc_dota_wraith_king_skeleton_ghost_custom", context, -1)
	PrecacheUnitByNameSync("npc_dota_wraith_king_skeleton_warrior_custom", context, -1)
end

function skeleton_king_vampiric_aura_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_cd = 0,
			w1_shield = 0,

			has_w2 = 0,
			w2_damage = 0,
			w2_attack = 0,
			w2_damage_type = caster:GetTalentValue("modifier_skeleton_vampiric_2", "damage_type", true),
			w2_radius = caster:GetTalentValue("modifier_skeleton_vampiric_2", "radius", true),

			has_w3 = 0,
			w3_armor = 0,
			w3_duration = caster:GetTalentValue("modifier_skeleton_vampiric_3", "duration", true),
			w3_max = caster:GetTalentValue("modifier_skeleton_vampiric_3", "max", true),
			w3_crit = caster:GetTalentValue("modifier_skeleton_vampiric_3", "crit", true),

			has_w4 = 0,
			w4_slow_resist = caster:GetTalentValue("modifier_skeleton_vampiric_4", "slow_resist", true),
			w4_move = caster:GetTalentValue("modifier_skeleton_vampiric_4", "move", true),
			w4_damage_reduce = caster:GetTalentValue("modifier_skeleton_vampiric_4", "damage_reduce", true),
			w4_health = caster:GetTalentValue("modifier_skeleton_vampiric_4", "health", true) / 100,
			w4_radius = caster:GetTalentValue("modifier_skeleton_vampiric_4", "radius", true),

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_skeleton_vampiric_7", "duration", true),
			w7_damage = caster:GetTalentValue("modifier_skeleton_vampiric_7", "damage", true),
			w7_count = caster:GetTalentValue("modifier_skeleton_vampiric_7", "count", true),
			w7_stack_init = caster:GetTalentValue("modifier_skeleton_vampiric_7", "stack_init", true),
			w7_max = caster:GetTalentValue("modifier_skeleton_vampiric_7", "max", true),

			has_e2 = 0,
			e2_range_skelet = 0,
			e2_slow = 0,
			e2_duration = caster:GetTalentValue("modifier_skeleton_strike_2", "duration", true),
		}
	end

	if caster:HasTalent("modifier_skeleton_vampiric_1") then
		self.talents.has_w1 = 1
		self.talents.w1_cd = caster:GetTalentValue("modifier_skeleton_vampiric_1", "cd")
		self.talents.w1_shield = caster:GetTalentValue("modifier_skeleton_vampiric_1", "shield") / 100
	end

	if caster:HasTalent("modifier_skeleton_vampiric_2") then
		self.talents.has_w2 = 1
		self.talents.w2_damage = caster:GetTalentValue("modifier_skeleton_vampiric_2", "damage") / 100
		self.talents.w2_attack = caster:GetTalentValue("modifier_skeleton_vampiric_2", "attack")
	end

	if caster:HasTalent("modifier_skeleton_vampiric_3") then
		self.talents.has_w3 = 1
		self.talents.w3_armor = caster:GetTalentValue("modifier_skeleton_vampiric_3", "armor")
		caster:AddProc(self.tracker, { land = true, illusion = true })
	end

	if caster:HasTalent("modifier_skeleton_vampiric_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_skeleton_vampiric_7") then
		self.talents.has_w7 = 1
		caster:AddProc(self.tracker, { land = true, illusion = true })
		if IsServer() and name == "modifier_skeleton_vampiric_7" and dota1x6.current_wave >= upgrade_orange then
			local mod = caster:AddNewModifier(caster, self, "modifier_skeleton_king_vampiric_aura_custom_legendary", {})
			if mod then
				mod:SetStackCount(self.talents.w7_stack_init)
			end
		end
	end

	if caster:HasTalent("modifier_skeleton_strike_2") then
		self.talents.has_e2 = 1
		self.talents.e2_range_skelet = caster:GetTalentValue("modifier_skeleton_strike_2", "range_skelet")
		self.talents.e2_slow = caster:GetTalentValue("modifier_skeleton_strike_2", "slow")
		caster:AddProc(self.tracker, { land = true, illusion = true })
	end
end

function skeleton_king_vampiric_aura_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "skeleton_king_bone_guard", self)
end

function skeleton_king_vampiric_aura_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_skeleton_king_vampiric_aura_custom"
end

function skeleton_king_vampiric_aura_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.w1_cd or 0)
end

function skeleton_king_vampiric_aura_custom:OnSpellStart()
	if self.talents.has_w4 == 1 then
		if IsValid(self.active_totem) then
			self.active_totem:Kill(nil, nil)
		end
		local totem = CreateUnitByName(
			"npc_dota_wraith_king_skeleton_totem_custom",
			self.caster:GetAbsOrigin() + RandomVector(150),
			true,
			self.caster,
			self.caster,
			self.caster:GetTeamNumber()
		)
		self.active_totem = totem
		totem.owner = self.caster
		totem:SetOwner(self.caster)
		totem:AddNewModifier(self.caster, self, "modifier_kill", { duration = self.skelet_duration })
		totem:AddNewModifier(self.caster, self, "modifier_skeleton_king_vampiric_aura_custom_totem", {})
	end

	self.caster:EmitSound("Hero_SkeletonKing.MortalStrike.Cast")

	for skelet, _ in pairs(self.active_skelets) do
		if IsValid(skelet) then
			skelet:RemoveModifierByName("modifier_skelet_reincarnation")
			skelet:Kill(nil, nil)
		else
			self.active_skelets[skelet] = nil
		end
	end

	for i = 0, (self.max_skeleton_charges - 1) do
		Timers:CreateTimer(self.skelet_interval * i, function()
			local skelet = self:CreateSkeleton(self.caster:GetOrigin() + RandomVector(300), nil, true, nil, nil)
			if skelet then
				self.active_skelets[skelet] = true
			end
		end)
	end
end

function skeleton_king_vampiric_aura_custom:CreateSkeleton(
	origin,
	duration_custom,
	reincarnation,
	legendary_spawn,
	new_name
)
	if not IsServer() then
		return
	end
	if not self.caster or not players[self.caster:GetId()] then
		return
	end

	local name = "npc_dota_wraith_king_skeleton_warrior_custom"

	if self.talents.has_w7 == 1 and not new_name then
		self.skelet_count = self.skelet_count + 1

		if self.skelet_count >= self.talents.w7_count then
			self.skelet_count = 0
			name = "npc_dota_wraith_king_skeleton_ghost_custom"

			if legendary_spawn then
				origin = self.caster:GetAbsOrigin() - self.caster:GetForwardVector() * 400
			end
		else
			if legendary_spawn then
				origin = origin + RandomVector(120)
			end
		end
	end

	if new_name then
		name = new_name
	end

	local duration = duration_custom or self.skelet_duration

	local spawn_particle = "particles/neutral_fx/skeleton_spawn.vpcf"
	if
		self.caster:HasModifier("modifier_wraith_king_arcana_custom_v1")
		or self.caster:HasModifier("modifier_wraith_king_arcana_custom_v2")
	then
		spawn_particle = "particles/wk_arc_minion_ambient.vpcf"
	end

	local skelet = CreateUnitByName(name, origin, true, self.caster, self.caster, self.caster:GetTeamNumber())
	skelet.owner = self.caster
	skelet.is_wk_skelet = true
	skelet.skelet = true
	skelet:GenericParticle(spawn_particle)
	skelet:SetOwner(self.caster)

	local new_model =
		wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_wraith_king_skeleton_warrior", self)
	if name == "npc_dota_wraith_king_skeleton_warrior_custom" then
		if new_model then
			skelet:SetModel(new_model)
			skelet:SetOriginalModel(new_model)
		end
	else
		skelet.is_wk_ghost = true
	end

	local modifier_kill_skelet = skelet:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })
	skelet:AddNewModifier(self.caster, self, "modifier_skeleton_king_vampiric_aura_custom_skeleton_ai", {})

	local innate = self.caster.wk_innate
	if IsValid(innate) and IsValid(innate.tracker) then
		local value = function()
			if not self.caster:IsAlive() then
				return 0
			end
			return innate:GetLifesteal()
		end
		skelet:AddLifesteal(innate.tracker, { effect = false, proc = "LifestealParticle", value = value })
		skelet:AddLifesteal(
			innate.tracker,
			{ heal_unit = self.caster, effect = false, proc = "LifestealParticle", value = value }
		)
	end

	if new_model == "models/items/wraith_king/arcana/wk_arcana_skeleton.vmdl" and self.caster:HasUnequipItem(12424) then
		skelet:GenericParticle(
			"particles/econ/items/wraith_king/wraith_king_ti8/wk_ti8_creep_ambient.vpcf",
			modifier_kill_skelet
		)
	elseif new_model == "models/items/wraith_king/arcana/wk_arcana_skeleton.vmdl" then
		skelet:GenericParticle(
			"particles/econ/items/wraith_king/wraith_king_ti8/wk_ti8_creep_crimson_ambient.vpcf",
			modifier_kill_skelet
		)
	end

	if not legendary_spawn then
		skelet:AddNewModifier(self.caster, self, "modifier_skeleton_king_vampiric_aura_custom_path", { duration = 2 })
	end
	if reincarnation then
		skelet:AddNewModifier(self.caster, self, "modifier_skelet_reincarnation", { duration = duration })
	end

	if self.talents.has_w1 == 1 then
		local shield_mod = skelet:AddNewModifier(self.caster, self, "modifier_generic_shield", {
			start_full = 1,
			max_shield = self.talents.w1_shield * self.caster:GetMaxHealth(),
		})

		if shield_mod then
			shield_mod:SetReduceDamage(function(params)
				if params.caster:HasModifier("modifier_skeleton_king_vampiric_aura_custom_totem_aura") then
					return 1 + self.talents.w4_damage_reduce / 100
				end
			end)
		end
	end

	skelet:EmitSound("n_creep_Skeleton.Spawn")
	skelet:EmitSound("n_creep_TrollWarlord.RaiseDead")

	return skelet
end

function skeleton_king_vampiric_aura_custom:ProcArmor(target, is_crit)
	if not IsServer() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	local stack = is_crit and (self.talents.w3_crit - 1) or 1
	if not target:IsCreep() then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_skeleton_king_vampiric_aura_custom_armor",
			{ duration = self.talents.w3_duration, stack = stack }
		)
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_skeleton_king_vampiric_aura_custom_armor",
		{ duration = self.talents.w3_duration, stack = stack }
	)
end

modifier_skeleton_king_vampiric_aura_custom = class(mod_hidden)
function modifier_skeleton_king_vampiric_aura_custom:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.bone_ability = self.ability

	self.ability.skelet_count = 0
	self.ability.skelet_health = self.ability:GetSpecialValueFor("health")
	self.ability.skelet_armor = self.ability:GetSpecialValueFor("armor")
	self.ability.skelet_damage = self.ability:GetSpecialValueFor("damage")
	self.ability.skelet_move = self.ability:GetSpecialValueFor("move_speed")
	self.ability.skelet_duration = self.ability:GetSpecialValueFor("skeleton_duration")
	self.ability.skelet_interval = self.ability:GetSpecialValueFor("spawn_interval")
	self.ability.max_skeleton_charges = self.ability:GetSpecialValueFor("max_skeleton_charges")
	self.ability.respawn_delay = self.ability:GetSpecialValueFor("respawn_delay")

	self.parent:AddDeathEvent(self, true)
	self.damageTable = {
		attacker = self.parent,
		ability = self.ability,
		damage_type = self.ability.talents.w2_damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}
end

function modifier_skeleton_king_vampiric_aura_custom:OnRefresh()
	self.ability.max_skeleton_charges = self.ability:GetSpecialValueFor("max_skeleton_charges")
	self.ability.skelet_damage = self.ability:GetSpecialValueFor("damage")
	self.ability.skelet_health = self.ability:GetSpecialValueFor("health")
	self.ability.skelet_armor = self.ability:GetSpecialValueFor("armor")
end

function modifier_skeleton_king_vampiric_aura_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_skeleton_king_vampiric_aura_custom:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.w2_attack
end

function modifier_skeleton_king_vampiric_aura_custom:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_slow_resist
end

function modifier_skeleton_king_vampiric_aura_custom:GetProcChance()
	return 100
end

function modifier_skeleton_king_vampiric_aura_custom:AttackProc(params, name)
	local target = params.target
	local attacker = params.attacker
	if attacker.owner and attacker.is_wk_skelet then
		attacker = attacker.owner
	end
	if attacker ~= self.parent then
		return
	end

	if params.attacker.is_wk_ghost and target:IsRealHero() then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_skeleton_king_vampiric_aura_custom_legendary",
			{}
		)
	end

	if self.ability.talents.has_e2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_skeleton_king_vampiric_aura_custom_slow",
			{ duration = self.ability.talents.e2_duration }
		)
	end

	self.ability:ProcArmor(target)
end

function modifier_skeleton_king_vampiric_aura_custom:DeathEvent(params)
	if not IsServer() then
		return
	end
	local unit = params.unit
	if not unit.is_wk_skelet then
		return
	end
	if unit.owner ~= self.parent then
		return
	end

	if self.ability.talents.has_w2 == 1 then
		unit:EmitSound("WK.skelet_expolsion")

		local effect_cast = ParticleManager:CreateParticle(
			"particles/sand_king/sandking_caustic_finale_explode_custom.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			unit
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			unit,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			unit:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		self.damageTable.damage = self.parent:GetAverageTrueAttackDamage(nil) * self.ability.talents.w2_damage
		for _, target in pairs(self.parent:FindTargets(self.ability.talents.w2_radius, unit:GetAbsOrigin())) do
			self.damageTable.victim = target
			DoDamage(self.damageTable, "modifier_skeleton_vampiric_2")
		end
	end

	local modifier_kill = unit:FindModifierByName("modifier_skelet_reincarnation")
	if not modifier_kill then
		return
	end

	local duration = modifier_kill:GetRemainingTime()
	local name = unit:GetUnitName()
	local point = unit:GetAbsOrigin()
	local is_base = self.ability.active_skelets[unit] and 1 or 0

	modifier_kill:SetDuration(self.ability.respawn_delay + 3, false)

	Timers:CreateTimer(self.ability.respawn_delay, function()
		if
			IsValid(self.parent, unit)
			and players[self.parent:GetId()]
			and unit:HasModifier("modifier_skelet_reincarnation")
		then
			unit:RemoveModifierByName("modifier_skelet_reincarnation")
			local skelet = self.ability:CreateSkeleton(point, duration, false, false, name)
			if skelet and is_base == 1 then
				self.ability.active_skelets[skelet] = true
			end
		end
	end)
end

modifier_skeleton_king_vampiric_aura_custom_skeleton_ai = class(mod_hidden)
function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.base_health = self.ability.skelet_health
	self.base_armor = self.ability.skelet_armor
	self.base_damage = self.ability.skelet_damage
	self.move_speed = self.ability.skelet_move

	local mod = self.caster:FindModifierByName("modifier_skeleton_king_vampiric_aura_custom_legendary")
	if mod then
		self.base_damage = self.base_damage + (mod:GetStackCount() / mod.max) * mod.damage
	end

	self.parent:SetPhysicalArmorBaseValue(self.base_armor)
	self.parent:SetBaseDamageMin(self.base_damage)
	self.parent:SetBaseDamageMax(self.base_damage)
	self.parent:SetBaseMaxHealth(self.base_health)
	self.parent:SetBaseMoveSpeed(self.move_speed)
	self.parent:SetHealth(self.parent:GetMaxHealth())

	self.vec = RandomVector(200)
	self.radius = 1200
	self.target = nil

	if table.target ~= nil then
		self:SetTarget(EntIndexToHScript(table.target))
	end

	self:OnIntervalThink()
	self:StartIntervalThink(0.3)
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_slow_resist
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:GetModifierAttackRangeBonus()
	return self.ability.talents.e2_range_skelet
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:IsValidTarget(target)
	if not IsServer() then
		return
	end

	if
		not target
		or target:IsNull()
		or not target:IsAlive()
		or not target:IsUnit()
		or target:IsCourier()
		or ((target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius)
		or target:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
	then
		return false
	end

	return true
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:SetTarget(target)
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
	self.parent:MoveToTargetToAttack(self.target)
	self.parent:SetForceAttackTarget(self.target)
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:CheckState()
	local state = {}
	if self.ability:GetAutoCastState() then
		state[MODIFIER_STATE_DISARMED] = true
		state[MODIFIER_STATE_NO_UNIT_COLLISION] = true
	end
	if self.parent.is_wk_ghost then
		state[MODIFIER_STATE_CANNOT_MISS] = true
	end
	return state
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:MoveToCaster()
	if not IsServer() then
		return
	end

	self.target = nil
	self.parent:SetForceAttackTarget(nil)

	local point = self.caster:GetAbsOrigin() + self.vec

	if (point - self.parent:GetAbsOrigin()):Length2D() > 50 then
		self.parent:MoveToPosition(point)
	end
end

function modifier_skeleton_king_vampiric_aura_custom_skeleton_ai:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		self:StartIntervalThink(-1)
		return
	end

	if self.ability:GetAutoCastState() == true then
		self:MoveToCaster()
		return
	end

	if self.parent:GetAggroTarget() then
		self.target = self.parent:GetAggroTarget()
	end

	if self:IsValidTarget(self.target) and self.target:IsHero() then
		self:SetTarget(self.target)
		return
	end

	local heroes = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)
	local creeps = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_NO_INVIS + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	for _, hero in pairs(heroes) do
		if self:IsValidTarget(hero) then
			self:SetTarget(hero)
			break
		end
	end

	if not self:IsValidTarget(self.target) then
		for _, creep in pairs(creeps) do
			if self:IsValidTarget(creep) then
				self:SetTarget(creep)
				break
			end
		end
	end

	if not self:IsValidTarget(self.target) then
		self:MoveToCaster()
	end
end

modifier_skelet_reincarnation = class(mod_hidden)
function modifier_skelet_reincarnation:RemoveOnDeath()
	return false
end

modifier_skeleton_king_vampiric_aura_custom_legendary = class(mod_visible)
function modifier_skeleton_king_vampiric_aura_custom_legendary:RemoveOnDeath()
	return false
end
function modifier_skeleton_king_vampiric_aura_custom_legendary:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.max = self.ability.talents.w7_max
	self.damage = self.ability.talents.w7_damage

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_skeleton_king_vampiric_aura_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
end

function modifier_skeleton_king_vampiric_aura_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_skeleton_king_vampiric_aura_custom_legendary:OnTooltip()
	return (self:GetStackCount() / self.max) * self.damage
end

modifier_skeleton_king_vampiric_aura_custom_path = class(mod_hidden)
function modifier_skeleton_king_vampiric_aura_custom_path:CheckState()
	return {
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

modifier_skeleton_king_vampiric_aura_custom_totem = class(mod_hidden)
function modifier_skeleton_king_vampiric_aura_custom_totem:IsAura()
	return true
end
function modifier_skeleton_king_vampiric_aura_custom_totem:GetAuraRadius()
	return self.radius
end
function modifier_skeleton_king_vampiric_aura_custom_totem:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_skeleton_king_vampiric_aura_custom_totem:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_skeleton_king_vampiric_aura_custom_totem:GetModifierAura()
	return "modifier_skeleton_king_vampiric_aura_custom_totem_aura"
end
function modifier_skeleton_king_vampiric_aura_custom_totem:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.w4_radius

	if not IsServer() then
		return
	end

	self.base_armor = self.ability.skelet_armor
	self.move_speed = self.ability.skelet_move
	self.health = self.caster:GetMaxHealth() * self.ability.talents.w4_health

	self.parent:SetBaseMaxHealth(self.health)
	self.parent:SetPhysicalArmorBaseValue(self.base_armor)
	self.parent:SetBaseMoveSpeed(self.move_speed)

	local particle = ParticleManager:CreateParticle(
		"particles/items5_fx/wraith_pact_ambient.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 1, 1))
	self:AddParticle(particle, false, false, -1, false, false)

	self.interval = 0.25
	self.max = 3
	self.count = self.max

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_skeleton_king_vampiric_aura_custom_totem:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_skeleton_king_vampiric_aura_custom_totem:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local point = self.caster:GetAbsOrigin() - self.caster:GetForwardVector() * 150
	if (point - self.parent:GetAbsOrigin()):Length2D() > 50 then
		self.parent:MoveToPosition(point)
	end

	self.count = self.count + self.interval
	if self.count < self.max - FrameTime() then
		return
	end
	self.count = 0
	self.parent:EmitSound("WK.Totem_spawn")

	local effect_cast = ParticleManager:CreateParticle(
		"particles/centaur/return_legendary_pulses.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(effect_cast, 0, self.parent, PATTACH_ABSORIGIN_FOLLOW, nil, point, true)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, self.radius, self.radius))
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_skull",
		point,
		true
	)
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function modifier_skeleton_king_vampiric_aura_custom_totem:GetAuraEntityReject(hEntity)
	if hEntity == self.caster or (hEntity.owner and hEntity.owner == self.caster) then
		return false
	end
	return true
end

modifier_skeleton_king_vampiric_aura_custom_totem_aura = class(mod_visible)
function modifier_skeleton_king_vampiric_aura_custom_totem_aura:GetTexture()
	return "buffs/wraith_king/vampiric_4"
end
function modifier_skeleton_king_vampiric_aura_custom_totem_aura:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
end

function modifier_skeleton_king_vampiric_aura_custom_totem_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_skeleton_king_vampiric_aura_custom_totem_aura:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_damage_reduce
end

function modifier_skeleton_king_vampiric_aura_custom_totem_aura:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_move
end

modifier_skeleton_king_vampiric_aura_custom_armor = class(mod_visible)
function modifier_skeleton_king_vampiric_aura_custom_armor:GetTexture()
	return "buffs/wraith_king/vampiric_3"
end
function modifier_skeleton_king_vampiric_aura_custom_armor:RemoveOnDeath()
	return self.is_enemy
end
function modifier_skeleton_king_vampiric_aura_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w3_max
	self.armor = self.ability.talents.w3_armor / self.max
	self.is_enemy = self.parent ~= self.caster

	if not self.is_enemy then
		self.armor = self.armor * -1
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh(table)
end

function modifier_skeleton_king_vampiric_aura_custom_armor:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:SetStackCount(math.min(self.max, self:GetStackCount() + table.stack))

	if self:GetStackCount() >= self.max and self.is_enemy then
		self.parent:EmitSound("WK.skelet_armor")
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_skeleton_king_vampiric_aura_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_skeleton_king_vampiric_aura_custom_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.armor
end

modifier_skeleton_king_vampiric_aura_custom_slow = class(mod_hidden)
function modifier_skeleton_king_vampiric_aura_custom_slow:IsPurgable()
	return true
end
function modifier_skeleton_king_vampiric_aura_custom_slow:GetEffectName()
	return "particles/items2_fx/sange_maim.vpcf"
end
function modifier_skeleton_king_vampiric_aura_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.e2_slow
end

function modifier_skeleton_king_vampiric_aura_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_skeleton_king_vampiric_aura_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end