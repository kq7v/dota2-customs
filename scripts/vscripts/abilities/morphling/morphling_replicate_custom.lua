--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_morphling_replicate_custom_tracker",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_active",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_manager",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_quas",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_wex",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_exort",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_attack_proc_damage",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_armor_reduce",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_morphling_morph_1"
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_scepter_save",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_scepter_autocast",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_scepter_pick",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_scepter_cd",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_invun",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_morphling_replicate_custom_bkb_cd",
	"abilities/morphling/morphling_replicate_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_morphling_morph_4"
)

morphling_replicate_custom = class({})
morphling_replicate_custom.talents = {}

function morphling_replicate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_morphling/morphling_replicate.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_morphling/morphling_replicate_finish.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_morphling/morphling_replicate_buff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_morphling_morph_target.vpcf", context)
	PrecacheResource("particle", "particles/morphling/morph_attack_range.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_supercharge_buff.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/frost_heal.vpcf", context)
	PrecacheResource("particle", "particles/morphling/attribute_double.vpcf", context)
	PrecacheResource("particle", "particles/morphling/wave_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_morphling/morphling_base_attack.vpcf", context)
	PrecacheResource("particle", "particles/morphling/wave_health_reducea.vpcf", context)
	PrecacheResource("particle", "particles/morphling/lowhp_health.vpcf", context)
end

function morphling_replicate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_armor = 0,
			r1_armor_reduce = 0,
			r1_max = caster:GetTalentValue("modifier_morphling_morph_1", "max", true),
			r1_duration = caster:GetTalentValue("modifier_morphling_morph_1", "duration", true),
			r1_max_legendary = caster:GetTalentValue("modifier_morphling_morph_1", "max_legendary", true),

			r2_heal = 0,
			r2_bonus = caster:GetTalentValue("modifier_morphling_morph_2", "bonus", true),

			has_r3 = 0,
			r3_crit = 0,
			r3_damage = 0,
			r3_max = caster:GetTalentValue("modifier_morphling_morph_3", "max", true),
			r3_chance = caster:GetTalentValue("modifier_morphling_morph_3", "chance", true),

			has_r4 = 0,
			r4_bkb = caster:GetTalentValue("modifier_morphling_morph_4", "bkb", true),
			r4_duration = caster:GetTalentValue("modifier_morphling_morph_4", "duration", true),
			r4_talent_cd = caster:GetTalentValue("modifier_morphling_morph_4", "talent_cd", true),
			r4_duration_max = caster:GetTalentValue("modifier_morphling_morph_4", "duration_max", true),
			r4_duration_legendary = caster:GetTalentValue("modifier_morphling_morph_4", "duration_legendary", true),

			has_r7 = 0,
			r7_damage_base = caster:GetTalentValue("modifier_morphling_morph_7", "damage_base", true),
			r7_bva = caster:GetTalentValue("modifier_morphling_morph_7", "bva", true),
			r7_cdr = caster:GetTalentValue("modifier_morphling_morph_7", "cdr", true),
			r7_max = caster:GetTalentValue("modifier_morphling_morph_7", "max", true),
			r7_damage = caster:GetTalentValue("modifier_morphling_morph_7", "damage", true),
			r7_targets = caster:GetTalentValue("modifier_morphling_morph_7", "targets", true),
			r7_radius = caster:GetTalentValue("modifier_morphling_morph_7", "radius", true),
			r7_timer = caster:GetTalentValue("modifier_morphling_morph_7", "timer", true),
			r7_items_timer = caster:GetTalentValue("modifier_morphling_morph_7", "items_timer", true),

			has_h3 = 0,
			h3_health = 0,
			h3_magic = 0,

			has_h5 = 0,
			h5_heal = caster:GetTalentValue("modifier_morphling_hero_5", "heal", true) / 100,
			h5_invun = caster:GetTalentValue("modifier_morphling_hero_5", "invun", true),

			has_e3 = 0,
			e3_damage = 0,
			e3_max_legendary = caster:GetTalentValue("modifier_morphling_attribute_3", "max_legendary", true),

			has_e4 = 0,
			e4_range = caster:GetTalentValue("modifier_morphling_attribute_4", "range", true),

			has_e2 = 0,
			e2_range = 0,

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_morphling_morph_1") then
		self.talents.has_r1 = 1
		self.talents.r1_armor = caster:GetTalentValue("modifier_morphling_morph_1", "armor")
		self.talents.r1_armor_reduce = caster:GetTalentValue("modifier_morphling_morph_1", "armor_reduce")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_morphling_morph_2") then
		self.talents.r2_heal = caster:GetTalentValue("modifier_morphling_morph_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_morphling_morph_2",
			type = 2,
			value = function()
				return self.talents.r2_heal
					* (caster:HasModifier("modifier_morphling_replicate_custom") and self.talents.r2_bonus or 1)
			end,
		})
	end

	if caster:HasTalent("modifier_morphling_morph_3") then
		self.talents.has_r3 = 1
		self.talents.r3_crit = caster:GetTalentValue("modifier_morphling_morph_3", "crit")
		self.talents.r3_damage = caster:GetTalentValue("modifier_morphling_morph_3", "damage")
		caster:AddSpellEvent(self.tracker, true)
		caster:AddProc(self.tracker, { land = true })
		caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_morphling_morph_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true })
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_morphling_morph_7") then
		self.talents.has_r7 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_morphling_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_health = caster:GetTalentValue("modifier_morphling_hero_3", "health") / 100
		self.talents.h3_magic = caster:GetTalentValue("modifier_morphling_hero_3", "magic")
	end

	if caster:HasTalent("modifier_morphling_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_morphling_attribute_2") then
		self.talents.has_e2 = 1
		self.talents.e2_range = caster:GetTalentValue("modifier_morphling_attribute_2", "range")
	end

	if caster:HasTalent("modifier_morphling_attribute_3") then
		self.talents.has_e3 = 1
		self.talents.e3_damage = caster:GetTalentValue("modifier_morphling_attribute_3", "damage") / 100
	end

	if caster:HasTalent("modifier_morphling_attribute_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_morphling_attribute_7") then
		self.talents.has_e7 = 1
	end

	if not IsServer() then
		return
	end

	local morph_mod = caster:FindModifierByName("modifier_morphling_replicate_custom")
	if morph_mod then
		morph_mod:UpdateEvents()
	end
end

function morphling_replicate_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "morphling_replicate", self)
end

function morphling_replicate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_morphling_replicate_custom_tracker"
end

function morphling_replicate_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level)
end

function morphling_replicate_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
end

function morphling_replicate_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level)
end

function morphling_replicate_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self)
end

function morphling_replicate_custom:GetBehavior()
	if self.caster:HasScepter() then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
end

function morphling_replicate_custom:CastFilterResultTarget(target)
	if not IsServer() then
		return
	end
	if not target:IsHero() and not target.lifestealer_creep then
		return UF_FAIL_CREEP
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return UF_FAIL_FRIENDLY
	end
	if target:IsIllusion() then
		return UF_FAIL_ILLUSION
	end
	return UF_SUCCESS
end

function morphling_replicate_custom:OnSpellStart()
	local target = self:GetCursorTarget()
	if self.caster:GetUnitName() ~= "npc_dota_hero_morphling" then
		return
	end

	local duration = self.duration

	if not self.caster:HasScepter() then
		if target:TriggerSpellAbsorb(self) then
			return
		end
		if target.lifestealer_creep and target.owner then
			target = target.owner
		end
	else
		local mod = self.caster:FindModifierByName("modifier_morphling_replicate_custom_scepter_save")
		if not mod then
			return
		end
		target = EntIndexToHScript(mod.index)

		if not target or target:IsNull() then
			return
		end
		self.caster:RemoveModifierByName("modifier_morphling_replicate_custom_scepter_pick")
	end

	if not self.caster:HasModifier("modifier_morphling_replicate_custom_active") then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_morphling_replicate_custom_active",
			{ duration = duration, target = target:entindex() }
		)
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_morphling_replicate_custom_manager",
		{ target = target:entindex() }
	)
	self.caster:AddNewModifier(self.caster, self, "modifier_morphling_replicate_custom", {})
end

function morphling_replicate_custom:OnProjectileHit_ExtraData(target, location, table)
	if not target then
		return
	end

	target:EmitSound("Morph.Wave_legendary_attack")
	target:EmitSound("Hero_Morphling.attack")

	local hit_effect =
		ParticleManager:CreateParticle("particles/morphling/attribute_double.vpcf", PATTACH_CUSTOMORIGIN, target)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	local particle = ParticleManager:CreateParticle(
		"particles/morphling/wave_legendary_attack.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		target,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_morphling_replicate_custom_attack_proc_damage",
		{ damage = table.damage, double = table.double }
	)
	self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_morphling_replicate_custom_attack_proc_damage")
end

function morphling_replicate_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	if self.scepter_init then
		return
	end
	if not self.caster:HasScepter() then
		return
	end

	self.scepter_init = true

	local index = nil
	local mod = self.tracker
	if not mod or not mod.heroes_in_game then
		return
	end

	for id, target in pairs(mod.heroes_in_game) do
		if target and not target:IsNull() and target:GetTeamNumber() ~= self.caster:GetTeamNumber() then
			index = target:entindex()
			break
		end
	end

	if not index then
		return
	end
	self.caster:RemoveModifierByName("modifier_morphling_replicate_custom_scepter_save")
	self.caster:AddNewModifier(self.caster, self, "modifier_morphling_replicate_custom_scepter_save", { index = index })
end

function morphling_replicate_custom:CheckToggle()
	if self.caster:HasModifier("modifier_morphling_replicate_custom_scepter_cd") then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = "#midteleport_cd" }
		)
		return false
	end
	return true
end

modifier_morphling_replicate_custom_active = class(mod_visible)
function modifier_morphling_replicate_custom_active:GetTexture()
	return self.name
end
function modifier_morphling_replicate_custom_active:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	local target = EntIndexToHScript(params.target)

	self.RemoveForDuel = true
	self.health_bonus = target:GetMaxHealth() * self.ability.talents.h3_health

	self.name = target:GetUnitName()
	self.parent:SwapAbilities("morphling_replicate_custom", "morphling_morph_replicate_custom", false, true)
	self.ability:EndCd()

	self.more_time = 0
	self.damage_stack = 0

	local ability = self.parent:FindAbilityByName("morphling_morph_replicate_custom")
	if ability then
		ability:StartCd()
	end

	self.agi_evasion = 0
	self.str_status = 0
	self.int_spell = 0

	if self.parent:HasScepter() then
		local primary = target:GetPrimaryAttribute()
		if primary == DOTA_ATTRIBUTE_AGILITY then
			self.agi_evasion = self.ability.scepter_evasion
		elseif primary == DOTA_ATTRIBUTE_STRENGTH then
			self.str_status = self.ability.scepter_status
		elseif primary == DOTA_ATTRIBUTE_INTELLECT then
			self.int_spell = self.ability.scepter_spell
		elseif primary == DOTA_ATTRIBUTE_ALL then
			self.int_spell = self.ability.scepter_spell / 3
			self.str_status = self.ability.scepter_status / 3
			self.agi_evasion = self.ability.scepter_evasion / 3
		end
	end

	self:SetHasCustomTransmitterData(true)

	if self.ability.talents.has_r7 == 0 then
		return
	end

	self.max_time = self:GetRemainingTime()
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_morphling_replicate_custom_active:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = self.damage_stack * self.ability.talents.r7_damage
	self.parent:UpdateUIshort({
		max_time = self.max_time + self.more_time,
		time = self:GetRemainingTime(),
		stack = "+" .. damage .. "%",
		priority = 2,
		style = "MorphReplicate",
	})
end

function modifier_morphling_replicate_custom_active:AddCustomTransmitterData()
	return {
		name = self.name,
		health_bonus = self.health_bonus,
		str_status = self.str_status,
		int_spell = self.int_spell,
		agi_evasion = self.agi_evasion,
	}
end

function modifier_morphling_replicate_custom_active:HandleCustomTransmitterData(data)
	self.name = data.name
	self.health_bonus = data.health_bonus
	self.str_status = data.str_status
	self.int_spell = data.int_spell
	self.agi_evasion = data.agi_evasion
end

function modifier_morphling_replicate_custom_active:ExtendDuration()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if self.more_time >= self.ability.talents.r4_duration_max then
		return
	end

	local inc = self.ability.talents.has_r7 == 1 and self.ability.talents.r4_duration_legendary
		or self.ability.talents.r4_duration
	self.more_time = self.more_time + inc
	self:SetDuration(self:GetRemainingTime() + inc, true)
end

function modifier_morphling_replicate_custom_active:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "MorphReplicate" })

	self.parent:RemoveModifierByName("modifier_morphling_replicate_custom_manager")
	self.parent:SwapAbilities("morphling_morph_replicate_custom", "morphling_replicate_custom", false, true)
	self.ability:StartCd()
end

function modifier_morphling_replicate_custom_active:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_EVASION_CONSTANT,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_morphling_replicate_custom_active:GetModifierEvasion_Constant()
	return self.agi_evasion
end

function modifier_morphling_replicate_custom_active:GetModifierSpellAmplify_Percentage()
	return self.int_spell
end

function modifier_morphling_replicate_custom_active:GetModifierStatusResistanceStacking()
	return self.str_status
end

function modifier_morphling_replicate_custom_active:GetModifierPercentageCooldown(params)
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not params.ability or params.ability:IsItem() then
		return
	end
	return self.ability.talents.r7_cdr
end

function modifier_morphling_replicate_custom_active:GetModifierHealthBonus()
	return self.health_bonus
end

function modifier_morphling_replicate_custom_active:GetModifierDamageOutgoing_Percentage()
	return self:GetStackCount() * self.ability.talents.r3_damage
end

modifier_morphling_replicate_custom_manager = class(mod_hidden)
function modifier_morphling_replicate_custom_manager:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.target = EntIndexToHScript(params.target)

	self.name = self.target:GetUnitName()
	self.model = base_heroes_data[self.name] and base_heroes_data[self.name]["model"] or self.target:GetModelName()
	self.model_scale = self.target:GetModelScale()

	self.attack_type = self.target:GetAttackCapability()
	self.attack_range = self.target:GetBaseAttackRange()

	if players[self.target:GetId()] then
		self.attack_type = players[self.target:GetId()].base_attack_type
		self.model_scale = players[self.target:GetId()].base_model_scale
	end

	if self.ability.talents.has_e4 == 1 then
		self.attack_range = math.max(self.attack_range, self.ability.talents.e4_range)
	end

	self.target_abilities = {}

	local hero_name = self.target:GetUnitName()

	local mod = self.parent:FindModifierByName("modifier_morphling_replicate_custom_tracker")
	if not mod or not mod.heroes_data or not mod.heroes_data[hero_name] then
		return
	end

	local hero_table = mod.heroes_data[hero_name]

	if self.target:GetUnitName() == "npc_dota_hero_invoker" then
		local quas = self.target:FindAbilityByName("invoker_quas_custom")
		local wex = self.target:FindAbilityByName("invoker_wex_custom")
		local exort = self.target:FindAbilityByName("invoker_exort_custom")

		local quas_level = quas and quas:GetLevel() or 0
		local wex_level = wex and wex:GetLevel() or 0
		local exort_level = exort and exort:GetLevel() or 0

		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_morphling_replicate_custom_quas",
			{ level = quas_level }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_morphling_replicate_custom_wex",
			{ level = wex_level }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_morphling_replicate_custom_exort",
			{ level = exort_level }
		)
	end

	for id = 0, 5 do
		local ability_data = hero_table["Ability" .. (id + 1)]
		if id == 5 then
			ability_data = hero_table["innate"]
		end

		if ability_data then
			local ability = self.target:FindAbilityByName(ability_data)
			if ability then
				local is_hidden = true
				local behavior = ability:GetAbilityKeyValues()
				if behavior and behavior["AbilityBehavior"] then
					is_hidden = string.find(behavior["AbilityBehavior"], "DOTA_ABILITY_BEHAVIOR_HIDDEN")
				end

				self.target_abilities[id] = {}
				self.target_abilities[id].ability = ability
				self.target_abilities[id].was_visible = hero_name == "npc_dota_hero_invoker" or not is_hidden or id == 5
				self.target_abilities[id].level = ability:GetLevel()

				if hero_table["shard"] == ability:GetName() or hero_table["scepter"] == ability:GetName() then
					self.target_abilities[id].level = 1
				end

				if hero_table["shard"] == ability:GetName() then
					self.target_abilities[id].was_visible = self.parent:HasShard()
				end
				if hero_table["scepter"] == ability:GetName() then
					self.target_abilities[id].was_visible = self.parent:HasScepter()
				end
			end
		end
	end
end

function modifier_morphling_replicate_custom_manager:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_morphling_replicate_custom")
	self.parent:RemoveModifierByName("modifier_morphling_replicate_custom_quas")
	self.parent:RemoveModifierByName("modifier_morphling_replicate_custom_wex")
	self.parent:RemoveModifierByName("modifier_morphling_replicate_custom_exort")
end

modifier_morphling_replicate_custom = class(mod_hidden)
function modifier_morphling_replicate_custom:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_morphling_replicate_custom:GetEffectName()
	return "particles/units/heroes/hero_morphling/morphling_replicate_buff.vpcf"
end
function modifier_morphling_replicate_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_morphling_morph_target.vpcf"
end
function modifier_morphling_replicate_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_morphling_replicate_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.attack_type = self.parent:GetAttackCapability()
	self.model_scale = self.parent:GetModelScale()

	if players[self.parent:GetId()] then
		self.model_scale = players[self.parent:GetId()].base_model_scale
	end

	self.parent:EmitSound("Hero_Morphling.Replicate")
	self.parent:GenericParticle("particles/units/heroes/hero_morphling/morphling_replicate.vpcf")

	self.innate_ability = nil
	self.base_abilities = {}

	for id = 0, 4 do
		local ability = self.parent:GetAbilityByIndex(id)
		if ability then
			self.base_abilities[id] = {}
			self.base_abilities[id].ability = ability
			self.base_abilities[id].was_visible = not ability:IsHidden()

			ability:SetHidden(true)
			if ability:GetToggleState() then
				ability:ToggleAbility()
			end
		end
	end

	self:UpdateEvents()

	local manager = self.parent:FindModifierByName("modifier_morphling_replicate_custom_manager")
	if manager then
		self.model = manager.model
		self.attack_range = manager.attack_range
		self.target = manager.target
		self.parent:SetAttackCapability(manager.attack_type)
		self.parent:SetModelScale(manager.model_scale)

		for id, data in pairs(manager.target_abilities) do
			local ability = data.ability
			local ability_name = data.ability:GetName()
			local was_visible = data.was_visible
			local level = data.level

			if ability_name ~= "generic_hidden" then
				local new_ability
				local old_ability = self.parent:FindAbilityByName(ability_name)

				if self.parent.spell_steal_history[old_ability] then
					self.parent.spell_steal_history[old_ability] = nil
					new_ability = old_ability
				else
					new_ability = self.parent:AddAbility(ability_name)
					new_ability:SetRefCountsModifiers(true)
					new_ability:SetStolen(true)
				end

				if new_ability then
					new_ability:SetLevel(level)
					if id ~= 5 then
						self.parent:SwapAbilities(
							self.base_abilities[id].ability:GetName(),
							new_ability:GetName(),
							false,
							was_visible
						)
					else
						self.innate_ability = new_ability
					end
				end
			end
		end

		self.parent.morphling_ult_items = {}
		local name = manager.name

		if base_heroes_data[name] then
			local items_list = base_heroes_data[name]["items"] and base_heroes_data[name]["items"] or {}
			for item_model, _ in pairs(items_list) do
				local item_morph = wearables_system:CreateMorphTeamItem(self.parent, item_model)
				item_morph:AddNewModifier(
					self.parent,
					nil,
					"modifier_status_effect_thinker_custom",
					{
						name = "particles/status_fx/status_effect_morphling_morph_target.vpcf",
						priority = MODIFIER_PRIORITY_ILLUSION,
					}
				)
				table.insert(self.parent.morphling_ult_items, item_morph)
			end
			local mod = self.parent:FindModifierByName("modifier_hero_wearables_system")
			if mod then
				mod:StartMorph()
				mod:UpdatePlayerItems()
			end
			self.target_name = name
			self:StartIntervalThink(0.1)
		end
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetId()),
		"morph_stats_replicated",
		{ value = 1 }
	)

	self.parent:CalculateStatBonus(true)
	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()
end

function modifier_morphling_replicate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if base_heroes_data[self.target_name] and base_heroes_data[self.target_name]["effects"] then
		for effect_name, effect_data in pairs(base_heroes_data[self.target_name]["effects"]) do
			local attach = particle_attach[effect_data["attach_type"]] and particle_attach[effect_data["attach_type"]]
				or nil
			local particle = ParticleManager:CreateParticle(effect_name, attach, self.parent)
			local points_data = effect_data["control_points"]

			if effect_data["control_points"] then
				for _, point_data in pairs(effect_data["control_points"]) do
					local point = point_data["control_point_index"] and tonumber(point_data["control_point_index"]) or 0
					local point_attach = particle_attach[point_data["attach_type"]]
							and particle_attach[point_data["attach_type"]]
						or nil
					local attachment = point_data["attachment"]
					local pos = point_data["position"] and point_data["position"] or self.parent:GetAbsOrigin()
					ParticleManager:SetParticleControlEnt(
						particle,
						point,
						self.parent,
						point_attach,
						attachment,
						pos,
						true
					)
				end
			end
			self:AddParticle(particle, false, false, -1, false, false)
		end
	end

	self:StartIntervalThink(-1)
end

function modifier_morphling_replicate_custom:AddCustomTransmitterData()
	return {
		attack_range = self.attack_range,
		model = self.model,
	}
end

function modifier_morphling_replicate_custom:HandleCustomTransmitterData(data)
	self.attack_range = data.attack_range
	self.model = data.model
end

function modifier_morphling_replicate_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if self.parent.morphling_ult_items then
		for _, morph_model in pairs(self.parent.morphling_ult_items) do
			if morph_model and not morph_model:IsNull() then
				morph_model:AddEffects(EF_NODRAW)
				UTIL_Remove(morph_model)
			end
		end
		self.parent.morphling_ult_items = {}
		local mod = self.parent:FindModifierByName("modifier_hero_wearables_system")
		if mod then
			mod:UpdatePlayerItems()
			mod:EndMorph()
		end
	end

	self.parent:GenericParticle("particles/units/heroes/hero_morphling/morphling_replicate_finish.vpcf")
	self.parent:SetAttackCapability(self.attack_type)
	self.parent:SetModelScale(self.model_scale)

	self.parent:FadeGesture(ACT_DOTA_DISABLED)

	self.parent:EmitSound("Hero_Morphling.ReplicateEnd")

	for id, data in pairs(self.base_abilities) do
		local ability = data.ability
		local ability_in_slot = self.parent:GetAbilityByIndex(id)

		if ability_in_slot and ability_in_slot:GetName() ~= ability:GetName() then
			self.parent:SwapAbilities(ability_in_slot:GetName(), ability:GetName(), false, true)
			ability_in_slot:SetHidden(true)
			self.parent.spell_steal_history[ability_in_slot] = ability_in_slot:GetName()
		end

		local was_visible = ability:GetName() == "morphling_attribute_legendary_custom"
				and self.ability.talents.has_e7 == 1
			or data.was_visible

		ability:SetHidden(not was_visible)
	end

	if self.innate_ability then
		self.parent.spell_steal_history[self.innate_ability] = self.innate_ability:GetName()
	end

	local mod = self.parent:FindModifierByName("modifier_morphling_replicate_custom_tracker")
	if mod then
		mod:OnIntervalThink()
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetId()),
		"morph_stats_replicated",
		{ value = 0 }
	)
	self.parent:CalculateStatBonus(true)
end

function modifier_morphling_replicate_custom:UpdateEvents()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end

	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_morphling_replicate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_CHANGE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE,
		MODIFIER_PROPERTY_MIN_HEALTH,
	}
end

function modifier_morphling_replicate_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:GetHealth() > 5 then
		return
	end

	self.parent:GenericHeal(
		self.parent:GetMaxHealth() * self.ability.talents.h5_heal,
		self.ability,
		false,
		false,
		"modifier_morphling_hero_5"
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_morphling_replicate_custom_invun",
		{ duration = self.ability.talents.h5_invun }
	)
	self.parent:RemoveModifierByName("modifier_morphling_replicate_custom_active")
end

function modifier_morphling_replicate_custom:GetMinHealth()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:GetHealth() <= 0 then
		return
	end

	return 1
end

function modifier_morphling_replicate_custom:GetModifierModelChange()
	return self.model
end

function modifier_morphling_replicate_custom:GetModifierAttackRangeOverride()
	return self.attack_range
end

modifier_morphling_replicate_custom_tracker = class(mod_hidden)
function modifier_morphling_replicate_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.morph_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.scepter_spell = self.ability:GetSpecialValueFor("scepter_spell")
	self.ability.scepter_evasion = self.ability:GetSpecialValueFor("scepter_evasion")
	self.ability.scepter_status = self.ability:GetSpecialValueFor("scepter_status")

	self.swap_ability = self.parent:FindAbilityByName("morphling_morph_replicate_custom")
	if self.swap_ability then
		self.swap_ability:UpdateTalents()
	end

	self.records = {}
	self.spell_records = {}
	self.double_count = 0
	self.bva = self.parent:GetBaseAttackTime(false)

	if not IsServer() then
		return
	end
	self.interval = 0.5
	self.items_cd = 0

	self.parent.spell_steal_history = {}
	self:StartIntervalThink(self.interval)

	self.parent:AddActivityModifier("jog")
	self.parent:AddActivityModifier("trot")
	self.parent:AddActivityModifier("walk")
	self.parent:AddActivityModifier("attack_closest_range")
	self.parent:AddActivityModifier("attack_close_range")
	self.parent:AddActivityModifier("attack_medium_range")
	self.parent:AddActivityModifier("attack_long_range")
	self.parent:AddActivityModifier("fast")
	self.parent:AddActivityModifier("faster")
	self.parent:AddActivityModifier("fastest")
	self.parent:AddActivityModifier("super_fast")

	self.kv_exception = {
		["npc_dota_hero_antimage"] = "abilities_anti_mage",
		["npc_dota_hero_furion"] = "abilities_nature_prophet",
		["npc_dota_hero_nevermore"] = "abilities_shadow_fiend",
		["npc_dota_hero_zuus"] = "abilities_zeus",
		["npc_dota_hero_skeleton_king"] = "abilities_wraith_king",
		["npc_dota_hero_queenofpain"] = "abilities_queen_of_pain",
	}

	self.exception_skills = {
		["custom_ability_dust"] = true,
		["custom_ability_smoke"] = true,
		["custom_ability_sentry"] = true,
		["custom_ability_observer"] = true,
		["custom_legion_commander_duel_scepter"] = true,
		["monkey_king_innate_custom"] = true,
		["marci_innate_custom"] = true,
		["phantom_assassin_innate_custom"] = true,
	}

	self.invoker_skills = {
		["Ability1"] = "invoker_cold_snap_custom",
		["Ability2"] = "invoker_alacrity_custom",
		["Ability3"] = "invoker_tornado_custom",
		["Ability4"] = "invoker_deafening_blast_custom",
	}

	self.innate_exception = {
		["troll_warlord_berserkers_rage_custom"] = true,
		["monkey_king_innate_custom"] = true,
		["custom_huskar_innate"] = true,
		["bane_innate_custom"] = true,
		["void_spirit_innate_custom"] = true,
		["skeleton_king_innate_custom"] = true,
		["marci_innate_custom"] = true,
		["witch_doctor_innate_custom"] = true,
		["phantom_assassin_innate_custom"] = true,
	}

	self.heroes_kv = LoadKeyValues("scripts/npc/npc_heroes_custom.txt")
	self.heroes_data = {}

	self.heroes_in_game = {}
	for _, player in pairs(players) do
		self.heroes_in_game[player:GetUnitName()] = player
	end

	if self.heroes_kv then
		for hero_name, skills in pairs(self.heroes_kv) do
			if
				self.heroes_in_game[hero_name]
				and self.parent:GetUnitName() ~= hero_name
				and type(skills) == "table"
			then
				self.heroes_data[hero_name] = {}
				if hero_name == "npc_dota_hero_invoker" then
					skills = self.invoker_skills
				end

				local used_abilities = {}
				for slot_name, skill in pairs(skills) do
					if
						slot_name:match("Ability") ~= nil
						and skill ~= ""
						and not self.exception_skills[skill]
						and not used_abilities[skill]
					then
						self.heroes_data[hero_name][slot_name] = skill
						used_abilities[skill] = true
					end
				end

				local kv_name = self.kv_exception[hero_name] and self.kv_exception[hero_name]
					or hero_name:gsub("npc_dota_hero_", "abilities_")
				local ability_kv = LoadKeyValues("scripts/npc/heroes/" .. kv_name .. ".txt")
				if ability_kv then
					for name, data in pairs(ability_kv) do
						if data and type(data) == "table" then
							for data_name, ability_data in pairs(data) do
								if data_name == "IsGrantedByScepter" then
									self.heroes_data[hero_name]["scepter"] = name
								end
								if data_name == "IsGrantedByShard" then
									self.heroes_data[hero_name]["shard"] = name
								end
								if
									data_name == "Innate"
									and not self.innate_exception[name]
									and not used_abilities[name]
								then
									self.heroes_data[hero_name]["innate"] = name
								end
							end
						end
					end
				end
			end
		end
	end
end

function modifier_morphling_replicate_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_morphling_replicate_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_morphling_replicate_custom_tracker:GetModifierBaseAttackTimeConstant()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.bva then
		return
	end
	return self.ability.talents.r7_bva + self.bva
end

function modifier_morphling_replicate_custom_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h3_magic
end

function modifier_morphling_replicate_custom_tracker:GetModifierPhysicalArmorBonus()
	return self.ability.talents.r1_armor
end

function modifier_morphling_replicate_custom_tracker:GetCritChance()
	if self.ability.talents.has_r3 == 0 then
		return 0
	end
	return self.ability.talents.r3_chance
end

function modifier_morphling_replicate_custom_tracker:GetCritDamage()
	return self.ability.talents.r3_crit
end

function modifier_morphling_replicate_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end
	if not RollPseudoRandomPercentage(self:GetCritChance(), 9648, self.parent) then
		return
	end
	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_morphling_replicate_custom_tracker:RecordDestroyEvent(params)
	if not self.records[params.record] then
		return
	end
	self.records[params.record] = nil
end

function modifier_morphling_replicate_custom_tracker:GetProcChance()
	return 100
end

function modifier_morphling_replicate_custom_tracker:AttackProc(params, name)
	if self.records[params.record] then
		params.target:EmitSound("DOTA_Item.Daedelus.Crit")
	end

	if self.ability.talents.has_r4 == 1 and self.ability.talents.has_r7 == 0 then
		local mod_active = self.parent:FindModifierByName("modifier_morphling_replicate_custom")
		local mod = self.parent:FindModifierByName("modifier_morphling_replicate_custom_active")
		if mod and mod_active then
			mod:ExtendDuration()
		end
	end

	if self.ability.talents.has_e4 == 1 and not self.parent:IsRangedAttacker() and not params.no_attack_cooldown then
		local particle = ParticleManager:CreateParticle(
			"particles/morphling/morph_attack_range.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			params.target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			Vector(0, 0, 0),
			true
		)
		ParticleManager:DestroyParticle(particle, false)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if self.ability.talents.has_r1 == 0 then
		return
	end
	if not params.no_attack_cooldown and self.ability.talents.has_r7 == 1 then
		return
	end
	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_morphling_replicate_custom_armor_reduce",
		{ duration = self.ability.talents.r1_duration }
	)
end

function modifier_morphling_replicate_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	local mod_active = self.parent:FindModifierByName("modifier_morphling_replicate_custom")
	local mod = self.parent:FindModifierByName("modifier_morphling_replicate_custom_active")

	if self.ability.talents.has_r7 == 1 then
		self:LaunchAttacks(params.ability)
	end

	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_r4 == 1 and self.ability.talents.has_r7 == 1 then
		if mod and mod_active then
			mod:ExtendDuration()
		end
	end

	if
		self.ability.talents.has_r3 == 1
		and mod
		and mod:GetStackCount() < self.ability.talents.r3_max
		and self.ability ~= params.ability
	then
		mod:IncrementStackCount()
		if mod:GetStackCount() >= self.ability.talents.r3_max then
			self.parent:GenericParticle("particles/units/heroes/hero_lina/lina_supercharge_buff.vpcf", mod)
		end
	end

	if
		self.ability.talents.has_r4 == 1
		and mod_active
		and not self.parent:HasModifier("modifier_morphling_replicate_custom_bkb_cd")
		and self.ability ~= params.ability
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_morphling_replicate_custom_bkb_cd",
			{ duration = self.ability.talents.r4_talent_cd }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self.ability.talents.r4_bkb, effect = 2, sound = 1 }
		)
	end
end

function modifier_morphling_replicate_custom_tracker:LaunchAttacks(ability, is_double)
	if not IsServer() then
		return
	end
	if self.ability == ability then
		return
	end

	if not is_double then
		local time = GameRules:GetDOTATime(false, false)
		if ability:IsItem() then
			if (time - self.items_cd) <= self.ability.talents.r7_items_timer then
				return
			end
			self.items_cd = time
		else
			if
				self.spell_records[ability:GetName()]
				and (time - self.spell_records[ability:GetName()]) <= self.ability.talents.r7_timer
			then
				return
			end
			self.spell_records[ability:GetName()] = time
		end
	end

	local radius = self.ability.talents.r7_radius + self.ability.talents.e2_range
	local max = self.ability.talents.r7_targets
	local count = 0
	local mod = self.parent:FindModifierByName("modifier_morphling_replicate_custom_active")

	local double = 0
	local damage = self.ability.talents.r7_damage_base
	if mod then
		damage = damage + mod.damage_stack * self.ability.talents.r7_damage
	end
	if is_double then
		damage = damage * self.ability.talents.e3_damage
		double = 1
	end

	local info = {
		EffectName = "particles/units/heroes/hero_morphling/morphling_base_attack.vpcf",
		Ability = self.ability,
		iMoveSpeed = self.parent:GetProjectileSpeed(),
		Source = self.parent,
		bDodgeable = true,
		bProvidesVision = true,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
		iVisionRadius = 50,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		ExtraData = { damage = damage, double = double },
	}

	local targets = self.parent:FindTargets(radius, nil, nil, DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE)
	local heroes = {}
	local creeps = {}
	local hit_hero = false

	for _, target in pairs(targets) do
		if target:IsRealHero() then
			table.insert(heroes, target)
		else
			table.insert(creeps, target)
		end
	end

	for _, target in pairs(heroes) do
		info.Target = target
		hit_hero = true
		ProjectileManager:CreateTrackingProjectile(info)
		count = count + 1
		if count >= max then
			break
		end
	end

	if count < max then
		for _, target in pairs(creeps) do
			info.Target = target
			ProjectileManager:CreateTrackingProjectile(info)
			count = count + 1
			if count >= max then
				break
			end
		end
	end

	if count <= 0 then
		return
	end
	if is_double then
		return
	end
	self.parent:EmitSound("Morph.Double_attack")

	if hit_hero and not ability:IsItem() then
		if mod and mod.damage_stack < self.ability.talents.r7_max then
			mod.damage_stack = mod.damage_stack + 1
		end
	end

	if self.ability.talents.has_e3 == 1 then
		self.double_count = self.double_count + 1
		if self.double_count >= self.ability.talents.e3_max_legendary then
			self.double_count = 0
			Timers:CreateTimer(0.3, function()
				self:LaunchAttacks(ability, true)
			end)

			if self.parent.agi_ability and self.parent.agi_ability.tracker then
				self.parent.agi_ability.tracker:GiveStats(hit_hero)
			end
		end
	end
end

function modifier_morphling_replicate_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.ability:IsActivated() and not self.parent:HasModifier("modifier_morphling_replicate_custom_active") then
		self.ability:StartCd()
	end

	for hSpell, name in pairs(self.parent.spell_steal_history) do
		if hSpell and not hSpell:IsNull() then
			if hSpell:GetToggleState() then
				hSpell:ToggleAbility()
			end
			local intrinsic_mod = hSpell:GetIntrinsicModifierName()

			if intrinsic_mod then
				self.parent:RemoveModifierByName(intrinsic_mod)
			end

			if hSpell:NumModifiersUsingAbility() <= 0 and not hSpell:IsChanneling() then
				self.parent.spell_steal_history[hSpell] = nil

				self.parent:RemoveAbilityByHandle(hSpell)
				UTIL_Remove(hSpell)
				hSpell = nil
			end
		else
			self.parent.spell_steal_history[hSpell] = nil
		end
	end

	self:StartIntervalThink(self.interval)
end

modifier_morphling_replicate_custom_quas = class(mod_visible)
function modifier_morphling_replicate_custom_quas:GetTexture()
	return "invoker_quas"
end
function modifier_morphling_replicate_custom_quas:OnCreated(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.level)
end

modifier_morphling_replicate_custom_wex = class(mod_visible)
function modifier_morphling_replicate_custom_wex:GetTexture()
	return "invoker_wex"
end
function modifier_morphling_replicate_custom_wex:OnCreated(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.level)
end

modifier_morphling_replicate_custom_exort = class(mod_visible)
function modifier_morphling_replicate_custom_exort:GetTexture()
	return "invoker_exort"
end
function modifier_morphling_replicate_custom_exort:OnCreated(table)
	if not IsServer() then
		return
	end
	self:SetStackCount(table.level)
end

modifier_morphling_replicate_custom_attack_proc_damage = class(mod_hidden)
function modifier_morphling_replicate_custom_attack_proc_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.damage = table.damage - 100
	self.double = table.double
end

function modifier_morphling_replicate_custom_attack_proc_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_morphling_replicate_custom_attack_proc_damage:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_morphling_replicate_custom_armor_reduce = class(mod_hidden)
function modifier_morphling_replicate_custom_armor_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max
	if self.ability.talents.has_r7 == 1 then
		self.max = self.ability.talents.r1_max_legendary
	end
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_morphling_replicate_custom_armor_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Morph.Wave_armor")
		self.parent:GenericParticle("particles/morphling/wave_health_reducea.vpcf", self, true)
	end
end

function modifier_morphling_replicate_custom_armor_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_morphling_replicate_custom_armor_reduce:GetModifierPhysicalArmorBonus()
	return (self.ability.talents.r1_armor_reduce / self.max) * self:GetStackCount()
end

modifier_morphling_replicate_custom_invun = class(mod_hidden)
function modifier_morphling_replicate_custom_invun:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	local effect =
		ParticleManager:CreateParticle("particles/morphling/lowhp_health.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(effect, false, false, -1, false, false)

	self.parent:EmitSound("Morph.Lowhp_dispel")
	self.parent:EmitSound("Morph.Lowhp_dispel2")
end

function modifier_morphling_replicate_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

modifier_morphling_replicate_custom_scepter_pick = class(mod_hidden)
function modifier_morphling_replicate_custom_scepter_pick:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.targets = {}
	local mod = self.ability.tracker
	if not mod or not mod.heroes_in_game then
		return
	end

	for id, target in pairs(mod.heroes_in_game) do
		if target and not target:IsNull() and target:GetTeamNumber() ~= self.parent:GetTeamNumber() then
			local count = #self.targets + 1
			self.targets[count] = {}
			self.targets[count].target = target:GetUnitName()
			self.targets[count].index = target:entindex()
		end
	end

	if #self.targets == 0 then
		self:Destroy()
		return
	end

	EmitAnnouncerSoundForPlayer("Morph.Replicate_pick", self.parent:GetPlayerOwnerID())

	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_morphling_replicate_custom_scepter_pick:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = {}

	for i, data in pairs(self.targets) do
		targets[i] = { hero = data.target }
	end

	self.parent:UpdateUIpick({ mod = self, text = "#pa_pick_hero", targets = targets })
end

function modifier_morphling_replicate_custom_scepter_pick:EndPick(pick)
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	if self.targets[pick] and self.targets[pick].index then
		EmitAnnouncerSoundForPlayer("Lc.Duel_target_end", self.parent:GetPlayerOwnerID())
		self.parent:RemoveModifierByName("modifier_morphling_replicate_custom_scepter_save")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_morphling_replicate_custom_scepter_save",
			{ index = self.targets[pick].index }
		)
	end

	self:Destroy()
end

function modifier_morphling_replicate_custom_scepter_pick:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIpick({ hide = 1 })
end

modifier_morphling_replicate_custom_scepter_autocast = class(mod_hidden)
function modifier_morphling_replicate_custom_scepter_autocast:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local mod = self.parent:FindModifierByName("modifier_morphling_replicate_custom_scepter_pick")
	if mod then
		mod:Destroy()
	else
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_morphling_replicate_custom_scepter_pick", {})
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_morphling_replicate_custom_scepter_cd",
		{ duration = 0.5 }
	)

	self.ability:ToggleAutoCast()
	self:Destroy()
end

modifier_morphling_replicate_custom_scepter_cd = class(mod_hidden)

modifier_morphling_replicate_custom_scepter_save = class(mod_visible)
function modifier_morphling_replicate_custom_scepter_save:IsHidden()
	return self.parent:HasModifier("modifier_morphling_replicate_custom_manager")
end
function modifier_morphling_replicate_custom_scepter_save:RemoveOnDeath()
	return false
end
function modifier_morphling_replicate_custom_scepter_save:GetTexture()
	return self.name
end
function modifier_morphling_replicate_custom_scepter_save:OnCreated(table)
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.index = table.index

	self.unit = EntIndexToHScript(self.index)

	if not self.unit then
		self:Destroy()
		return
	end

	self.name = self.unit:GetUnitName()
	self:SetHasCustomTransmitterData(true)
end

function modifier_morphling_replicate_custom_scepter_save:AddCustomTransmitterData()
	return {
		name = self.name,
	}
end

function modifier_morphling_replicate_custom_scepter_save:HandleCustomTransmitterData(data)
	self.name = data.name
end

modifier_morphling_replicate_custom_bkb_cd = class(mod_cd)
function modifier_morphling_replicate_custom_bkb_cd:GetTexture()
	return "buffs/morphling/morph_4"
end

morphling_morph_replicate_custom = class({})
morphling_morph_replicate_custom.talents = {}

function morphling_morph_replicate_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "morphling_morph_replicate", self)
end

function morphling_morph_replicate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {}
	end
end

function morphling_morph_replicate_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT
		+ DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK
		+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
end

function morphling_morph_replicate_custom:OnSpellStart()
	if self.caster:HasModifier("modifier_morphling_replicate_custom") then
		self.caster:RemoveModifierByName("modifier_morphling_replicate_custom")
	else
		self.caster:AddNewModifier(self.caster, self.caster.morph_ability, "modifier_morphling_replicate_custom", {})
	end
end