--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_tracker",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_attack",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_legendary_steal",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_essence_7"
)
LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_legendary_target",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_essence_7"
)
LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_effect",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_legendary_cd",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_slark_saltwater_shiv_custom_speed",
	"abilities/slark/slark_saltwater_shiv_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_slark_essence_2"
)

slark_saltwater_shiv_custom = class({})
slark_saltwater_shiv_custom.talents = {}

function slark_saltwater_shiv_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_essence_shift.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_legendary_cast_head.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_cast_chains.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_legendary_proc.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_double.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_double_hit.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_legendary_effect.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_fish_bait_slow.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_legendary_effect_start.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_legendary_proc_water.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_stun.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_cleave.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_resist.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_dredged_shiv_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_dredged_trident_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_slark/slark_dredged_trident_debuff.vpcf", context)
end

function slark_saltwater_shiv_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e2 = 0,
			e2_speed = 0,
			e2_duration = caster:GetTalentValue("modifier_slark_essence_2", "duration", true),

			has_e3 = 0,
			e3_cd_inc = caster:GetTalentValue("modifier_slark_essence_3", "cd_inc", true),

			has_e7 = 0,
			e7_talent_cd = caster:GetTalentValue("modifier_slark_essence_7", "talent_cd", true),
			e7_cdr = caster:GetTalentValue("modifier_slark_essence_7", "cdr", true),
			e7_duration = caster:GetTalentValue("modifier_slark_essence_7", "duration", true),
			e7_cast = caster:GetTalentValue("modifier_slark_essence_7", "cast", true),
			e7_range = caster:GetTalentValue("modifier_slark_essence_7", "range", true),
			e7_effect_duration = caster:GetTalentValue("modifier_slark_essence_7", "effect_duration", true) * 60,
			e7_attacks = caster:GetTalentValue("modifier_slark_essence_7", "attacks", true),
			e7_stun = caster:GetTalentValue("modifier_slark_essence_7", "stun", true),

			has_h2 = 0,
			h2_slow = 0,
			h2_move = 0,
		}
	end

	if caster:HasTalent("modifier_slark_essence_2") then
		self.talents.has_e2 = 1
		self.talents.e2_speed = caster:GetTalentValue("modifier_slark_essence_2", "speed")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_slark_essence_3") then
		self.talents.has_e3 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_slark_essence_7") then
		self.talents.has_e7 = 1
		if IsServer() and not self.legendary_init then
			caster:AddSpellEvent(self.tracker, true)
			caster:AddSpellStartEvent(self.tracker)
			self:ToggleAutoCast()
			self.tracker:StartIntervalThink(self.tracker.interval)
			self.legendary_init = true
			local ability = caster:FindAbilityByName("slark_empty_custom")
			if ability then
				ability:SetHidden(false)
			end
		end
	end

	if caster:HasTalent("modifier_slark_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_slow = caster:GetTalentValue("modifier_slark_hero_2", "slow")
		self.talents.h2_move = caster:GetTalentValue("modifier_slark_hero_2", "move")
	end
end

function slark_saltwater_shiv_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "slark_saltwater_shiv", self)
end

function slark_saltwater_shiv_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_slark_saltwater_shiv_custom_tracker"
end

function slark_saltwater_shiv_custom:GetCastRange(vLocation, hTarget)
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	return self.talents.e7_range
end

function slark_saltwater_shiv_custom:GetCooldown(level)
	if self.talents.has_e7 ~= 1 then
		return (self.AbilityCooldown or 0) + (self.caster:HasShard() and (self.shard_cd or 0) or 0)
	end
	return self.talents.e7_talent_cd
end

function slark_saltwater_shiv_custom:GetCastAnimation()
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_4
end

function slark_saltwater_shiv_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function slark_saltwater_shiv_custom:CastFilterResultTarget(target)
	if not IsServer() then
		return
	end

	if target:IsCreep() then
		return UF_FAIL_OTHER
	end

	return UnitFilter(
		target,
		self:GetAbilityTargetTeam(),
		self:GetAbilityTargetType(),
		self:GetAbilityTargetFlags(),
		self.caster:GetTeamNumber()
	)
end

function slark_saltwater_shiv_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_slark_saltwater_shiv_custom_legendary_target",
		{ duration = self.talents.e7_duration }
	)
end

function slark_saltwater_shiv_custom:SetCooldown()
	if not IsServer() then
		return
	end
	local cd = self.AbilityCooldown
	if self.caster:HasShard() then
		cd = cd + self.shard_cd
	end
	cd = cd * self.caster:GetCooldownReduction()
	if self.talents.has_e7 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_slark_saltwater_shiv_custom_legendary_cd",
			{ duration = cd }
		)
		return
	end

	self:StartCooldown(cd)
end

modifier_slark_saltwater_shiv_custom_tracker = class(mod_hidden)
function modifier_slark_saltwater_shiv_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.interval = 1

	self.ability:UpdateTalents()

	self.ability.AbilityCooldown = self.ability:GetSpecialValueFor("AbilityCooldown")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.health_rest_steal = self.ability:GetSpecialValueFor("health_rest_steal")
	self.ability.ms_steal = self.ability:GetSpecialValueFor("ms_steal")
	self.ability.creeps_attack = self.ability:GetSpecialValueFor("creeps_attack")
	self.ability.max = self.ability:GetSpecialValueFor("max")
	self.ability.shard_cd = self.ability:GetSpecialValueFor("shard_cd")

	self.parent:AddAttackRecordEvent_out(self)
	self.parent:AddProc(self, { land = true, sync = true })

	self.spells = {
		["custom_juggernaut_blade_dance"] = true,
		["custom_phantom_assassin_coup_de_grace"] = true,
		["custom_huskar_berserkers_blood"] = true,
		["nevermore_frenzy_custom"] = true,
		["custom_legion_commander_overwhelming_odds"] = true,
		["custom_queenofpain_blink"] = true,
		["custom_terrorblade_metamorphosis"] = true,
		["bristleback_viscous_nasal_goo_custom"] = true,
		["custom_puck_waning_rift"] = true,
		["void_spirit_aether_remnant_custom"] = true,
		["ember_spirit_searing_chains_custom"] = true,
		["custom_pudge_meat_hook"] = true,
		["hoodwink_scurry_custom"] = true,
		["skeleton_king_mortal_strike_custom"] = true,
		["lina_light_strike_array_custom"] = true,
		["troll_warlord_fervor_custom"] = true,
		["axe_berserkers_call_custom"] = true,
		["alchemist_unstable_concoction_custom"] = true,
		["ogre_magi_bloodlust_custom"] = true,
		["antimage_blink_custom"] = true,
		["primal_beast_uproar_custom"] = true,
		["marci_guardian_custom"] = true,
		["templar_assassin_refraction_custom"] = true,
		["bloodseeker_bloodrage_custom"] = true,
		["monkey_king_jingu_mastery_custom"] = true,
		["mars_gods_rebuke_custom"] = true,
		["zuus_heavenly_jump_custom"] = true,
		["leshrac_split_earth_custom"] = true,
		["crystal_maiden_frostbite_custom"] = true,
		["snapfire_lil_shredder_custom"] = true,
		["sven_storm_bolt_custom"] = true,
		["sniper_shrapnel_custom"] = true,
		["muerta_dead_shot_custom"] = true,
		["pangolier_swashbuckle_custom"] = true,
		["arc_warden_magnetic_field_custom"] = true,
		["invoker_alacrity_custom"] = true,
		["razor_static_link_custom"] = true,
		["sandking_burrowstrike_custom"] = true,
		["furion_teleportation_custom"] = true,
		["abaddon_death_coil_custom"] = true,
		["drow_ranger_frost_arrows_custom"] = true,
		["skywrath_mage_ancient_seal_custom"] = true,
		["centaur_hoof_stomp_custom"] = true,
		["enigma_malefice_custom"] = true,
		["bane_brain_sap_custom"] = true,
		["morphling_waveform_custom"] = true,
		["life_stealer_rage_custom"] = true,
		["tinker_laser_custom"] = true,
		["witch_doctor_paralyzing_cask_custom"] = true,
		["nyx_assassin_impale_custom"] = true,
		["broodmother_insatiable_hunger_custom"] = true,
		["night_stalker_crippling_fear_custom"] = true,
		["jakiro_ice_path_custom"] = true,
		["kunkka_tidebringer_custom"] = true,
	}

	self.current_spell = nil
	self.hidden_spell = nil
	self.timer = 0

	if not IsServer() then
		return
	end
	self:SetHasCustomTransmitterData(true)
end

function modifier_slark_saltwater_shiv_custom_tracker:OnRefresh()
	self.ability.AbilityCooldown = self.ability:GetSpecialValueFor("AbilityCooldown")
	self.ability.health_rest_steal = self.ability:GetSpecialValueFor("health_rest_steal")
	self.ability.ms_steal = self.ability:GetSpecialValueFor("ms_steal")
	self.ability.creeps_attack = self.ability:GetSpecialValueFor("creeps_attack")
end

function modifier_slark_saltwater_shiv_custom_tracker:ForceDelete(spell)
	if not IsServer() then
		return
	end

	local units = FindUnitsInRadius(
		DOTA_TEAM_NOTEAM,
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
		FIND_CLOSEST,
		false
	)
	for _, unit in pairs(units) do
		for _, mod in pairs(unit:FindAllModifiers()) do
			if mod:GetAbility() and mod:GetAbility() == spell then
				mod:Destroy()
			end
		end
	end
end

function modifier_slark_saltwater_shiv_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if not self.hidden_spell then
		return
	end

	self.timer = self.timer + self.interval
	if self.timer < 10 and self:CheckMods(self.hidden_spell) > 0 then
		return
	end

	if self.timer >= 10 then
		self:ForceDelete(self.hidden_spell)
	end

	self.parent:RemoveAbility(self.hidden_spell:GetName())
	self.hidden_spell = nil
	self.timer = 0
end

function modifier_slark_saltwater_shiv_custom_tracker:StealSpell(search_target)
	if self.hidden_spell then
		self:ForceDelete(self.hidden_spell)
		self.parent:RemoveAbility(self.hidden_spell:GetName())
		self.hidden_spell = nil
		self.timer = 0
	end

	self:ClearSpell()

	local new_ability = nil
	local possible_ability = {}
	local target = search_target
	if target.lifestealer_creep and target.owner then
		target = target.owner
	end

	local check_ability = function(current_ability)
		if current_ability then
			local type_ability = current_ability:GetAbilityType()
			local behavior = current_ability:GetBehaviorInt()

			if
				bit.band(behavior, DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE) == 0
				and (type_ability == 0 or type_ability == 1)
				and not current_ability:IsHidden()
				and current_ability:GetMaxLevel() >= 3
			then
				possible_ability[#possible_ability + 1] = current_ability:GetName()
			end
			if self.spells[current_ability:GetName()] == true then
				return current_ability:GetName()
			end
		end
		return
	end

	if target.base_abilities then
		for _, ability_name in pairs(target.base_abilities) do
			local current_ability = target:FindAbilityByName(ability_name)
			if current_ability then
				local result = check_ability(current_ability)
				if result then
					new_ability = result
					break
				end
			end
		end
	else
		for index = 0, 20 do
			local current_ability = target:GetAbilityByIndex(index)
			if current_ability then
				local result = check_ability(current_ability)
				if result then
					new_ability = result
					break
				end
			end
		end
	end

	if not new_ability then
		if #possible_ability > 0 then
			new_ability = possible_ability[RandomInt(1, #possible_ability)]
		else
			return
		end
	end

	if self.ability:IsHidden() then
		return
	end

	self.current_spell = self.parent:AddAbility(new_ability)
	if not self.current_spell then
		return
	end

	local level = self.current_spell:GetMaxLevel()
	local target_ability = target:FindAbilityByName(new_ability)
	if target_ability and target_ability:GetAbilityType() == 1 then
		level = target_ability:GetLevel()
	end

	self.current_spell:SetRefCountsModifiers(true)
	self.current_spell:SetStolen(true)
	self.current_spell:SetLevel(level)
	self.current_spell:EndCd(0)

	if bit.band(self.current_spell:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_AUTOCAST) ~= 0 then
		self.current_spell:ToggleAutoCast()
	end

	self.parent:SwapAbilities("slark_empty_custom", self.current_spell:GetName(), false, true)
	self:SendBuffRefreshToClients()

	return self.current_spell:entindex()
end

function modifier_slark_saltwater_shiv_custom_tracker:ClearSpell()
	if not self.current_spell then
		return
	end

	self.parent:SwapAbilities("slark_empty_custom", self.current_spell:GetName(), true, false)

	if
		self.current_spell:GetIntrinsicModifierName() ~= nil
		and self.parent:FindModifierByName(self.current_spell:GetIntrinsicModifierName())
	then
		self.parent:RemoveModifierByName(self.current_spell:GetIntrinsicModifierName())
	end

	if
		bit.band(self.current_spell:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_TOGGLE) ~= 0
		and self.current_spell:GetToggleState()
	then
		self.current_spell:ToggleAbility()
	end

	if self:CheckMods(self.current_spell) <= 0 then
		self.parent:RemoveAbility(self.current_spell:GetName())
	else
		self.hidden_spell = self.current_spell
	end

	self.current_spell = nil
end

function modifier_slark_saltwater_shiv_custom_tracker:CheckMods(ability)
	if not IsServer() then
		return
	end
	local count = 0

	if
		ability:GetIntrinsicModifierName() ~= nil and self.parent:FindModifierByName(ability:GetIntrinsicModifierName())
	then
		count = -1
	end
	count = count + ability:NumModifiersUsingAbility()
	return count
end

function modifier_slark_saltwater_shiv_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if params.target:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end

	if self:CheckCd() and params.target:IsUnit() and self.parent == params.attacker then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_slark_saltwater_shiv_custom_attack", {})
		self.parent:EmitSound("Hero_Slark.SaltwaterShiv.PreAttack")
	else
		self.parent:RemoveModifierByName("modifier_slark_saltwater_shiv_custom_attack")
	end
end

function modifier_slark_saltwater_shiv_custom_tracker:CheckCd()
	if self.ability.talents.has_e7 == 0 then
		return self.ability:IsFullyCastable()
	else
		return not self.parent:HasModifier("modifier_slark_saltwater_shiv_custom_legendary_cd")
	end
end

function modifier_slark_saltwater_shiv_custom_tracker:CheckAttack(params)
	return self.parent:HasModifier("modifier_slark_saltwater_shiv_custom_attack")
		or (params.no_attack_cooldown and self:CheckCd())
end

function modifier_slark_saltwater_shiv_custom_tracker:GetProcChance()
	return 100
end

function modifier_slark_saltwater_shiv_custom_tracker:AttackProc(params)
	local target = params.target

	if self:CheckAttack(params) then
		self.ability:SetCooldown()
		target:EmitSound("Hero_Slark.SaltwaterShiv.Target_shard")
		target:GenericParticle("particles/units/heroes/hero_slark/slark_dredged_shiv_impact.vpcf")
		if not target:IsCreep() then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_slark_saltwater_shiv_custom_effect",
				{ duration = self.ability.duration }
			)
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_slark_saltwater_shiv_custom_effect",
				{ duration = self.ability.duration }
			)
		end
	end

	if not params.no_attack_cooldown then
		self.parent:RemoveModifierByName("modifier_slark_saltwater_shiv_custom_attack")
	end
end

function modifier_slark_saltwater_shiv_custom_tracker:AddCustomTransmitterData()
	if not self.current_spell then
		return
	end
	return {
		current_spell = self.current_spell:entindex(),
	}
end

function modifier_slark_saltwater_shiv_custom_tracker:HandleCustomTransmitterData(data)
	if not data.current_spell then
		return
	end
	self.current_spell = EntIndexToHScript(data.current_spell)
end

function modifier_slark_saltwater_shiv_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
	}
end

function modifier_slark_saltwater_shiv_custom_tracker:GetActivityTranslationModifiers()
	if not self.parent:HasModifier("modifier_slark_saltwater_shiv_custom_attack") then
		return
	end
	return "shiv_attack"
end

function modifier_slark_saltwater_shiv_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

function modifier_slark_saltwater_shiv_custom_tracker:GetModifierPreAttack_BonusDamage(params)
	if not IsServer() then
		return
	end
	if not params.target or not params.target:IsCreep() then
		return
	end
	if not self:CheckAttack(params) then
		return
	end

	return self.ability.creeps_attack
end

function modifier_slark_saltwater_shiv_custom_tracker:SpellStartEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not self.current_spell or self.current_spell ~= params.ability then
		return
	end
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1)
end

function modifier_slark_saltwater_shiv_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_e2 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_slark_saltwater_shiv_custom_speed",
			{ duration = self.ability.talents.e2_duration }
		)
	end

	if self.ability.talents.has_e3 == 1 then
		local mod = self.parent:FindModifierByName("modifier_slark_innate_custom_double_cd")
		if mod then
			mod:ReduceCd(self.ability.talents.e3_cd_inc)
		end
	end

	if not self.current_spell or self.current_spell ~= params.ability then
		return
	end
	if bit.band(self.current_spell:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_IMMEDIATE) == 0 then
		return
	end

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1)
end

function modifier_slark_saltwater_shiv_custom_tracker:GetModifierPercentageCooldown(params)
	if not params.ability or not self.current_spell then
		return
	end
	if params.ability ~= self.current_spell then
		return
	end
	return self.ability.talents.e7_cdr
end

function modifier_slark_saltwater_shiv_custom_tracker:GetModifierPercentageManacostStacking(params)
	if not params.ability or not self.current_spell then
		return
	end
	if params.ability ~= self.current_spell then
		return
	end
	return 100
end

function modifier_slark_saltwater_shiv_custom_tracker:GetModifierPercentageCasttime(params)
	if not params.ability or not self.current_spell then
		return
	end
	if params.ability ~= self.current_spell then
		return
	end
	return self.ability.talents.e7_cast
end

function modifier_slark_saltwater_shiv_custom_tracker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_slark_saltwater_shiv_custom_attack")
end

modifier_slark_saltwater_shiv_custom_legendary_steal = class(mod_visible)
function modifier_slark_saltwater_shiv_custom_legendary_steal:GetTexture()
	return self.spell and self.spell:GetAbilityTextureName()
end
function modifier_slark_saltwater_shiv_custom_legendary_steal:IsDebuff()
	return true
end
function modifier_slark_saltwater_shiv_custom_legendary_steal:RemoveOnDeath()
	return false
end
function modifier_slark_saltwater_shiv_custom_legendary_steal:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.spell = nil
	self.target = EntIndexToHScript(table.target)
	self.max_timer = self:GetRemainingTime()

	if not IsValid(self.target) then
		self:Destroy()
		return
	end

	if IsValid(self.ability.tracker) then
		self.spell_index = self.ability.tracker:StealSpell(self.target)
	end

	if not self.spell_index then
		self:Destroy()
		return
	end

	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()

	self.effect_cast = self.parent:GenericParticle("particles/slark/essence_legendary_effect.vpcf", self)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		5,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_eyeR",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.effect_cast,
		6,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_eyeL",
		Vector(0, 0, 0),
		true
	)
	self:AddParticle(self.effect_cast, true, false, -1, false, false)

	self.parent:GenericParticle("particles/slark/essence_legendary_effect_start.vpcf")

	self:StartIntervalThink(6)
end

function modifier_slark_saltwater_shiv_custom_legendary_steal:OnIntervalThink()
	if not IsServer() then
		return
	end
	ParticleManager:DestroyParticle(self.effect_cast, false)
	ParticleManager:ReleaseParticleIndex(self.effect_cast)
	self.effect_cast = nil

	self:StartIntervalThink(-1)
end

function modifier_slark_saltwater_shiv_custom_legendary_steal:AddCustomTransmitterData()
	return {
		spell_index = self.spell_index,
	}
end

function modifier_slark_saltwater_shiv_custom_legendary_steal:HandleCustomTransmitterData(data)
	self.spell = EntIndexToHScript(data.spell_index)
end

function modifier_slark_saltwater_shiv_custom_legendary_steal:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.ability.tracker) then
		self.ability.tracker:ClearSpell()
	end
end

modifier_slark_saltwater_shiv_custom_legendary_target = class(mod_hidden)
function modifier_slark_saltwater_shiv_custom_legendary_target:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_attacks
	self.effect_duration = self.ability.talents.e7_effect_duration
	self.max_timer = self:GetRemainingTime()

	if not IsServer() then
		return
	end
	self.ability:EndCd()

	self.caster:PullTarget(self.parent, self.ability, 0.25)

	local effect_cast = ParticleManager:CreateParticle(
		"particles/slark/essence_legendary_cast.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		nil,
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(self.max_timer, 0, 0))
	self:AddParticle(effect_cast, true, false, -1, false, false)

	self.parent:GenericParticle("particles/slark/essence_legendary_cast_head.vpcf", self, true)

	self.chain_effect = ParticleManager:CreateParticle(
		"particles/slark/essence_cast_chains.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.chain_effect,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.chain_effect,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.chain_effect, true, false, -1, false, false)

	self.parent:EmitSound("Slark.Essence_legendary_cast1")
	self.parent:EmitSound("Slark.Essence_legendary_cast2")
	self.parent:EmitSound("Slark.Essence_legendary_cast3")

	self.RemoveForDuel = true
	self.interval = 0.1

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_slark_saltwater_shiv_custom_legendary_target:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self:GetElapsedTime() >= 2 and self.chain_effect then
		ParticleManager:DestroyParticle(self.chain_effect, false)
		ParticleManager:ReleaseParticleIndex(self.chain_effect)
		self.chain_effect = nil
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 300, self.interval * 2, false)
	self.caster:UpdateUIshort({
		max_time = self.max_timer,
		time = self:GetElapsedTime(),
		stack = self:GetStackCount(),
		style = "SlarkEssence",
	})
end

function modifier_slark_saltwater_shiv_custom_legendary_target:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:StopSound("Slark.Essence_legendary_cast3")

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Slark.essence_legendary_proc1")
		self.parent:EmitSound("Slark.essence_legendary_proc2")
		self.parent:EmitSound("Slark.essence_legendary_proc3")
		self.caster:EmitSound("Slark.essence_legendary_proc4")

		local effect_cast = ParticleManager:CreateParticle(
			"particles/slark/essence_legendary_proc.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControl(effect_cast, 2, Vector(350, 0, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast)

		local effect_cast2 = ParticleManager:CreateParticle(
			"particles/slark/essence_legendary_proc_water.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast2, 0, self.parent:GetOrigin())
		ParticleManager:SetParticleControl(effect_cast2, 2, Vector(250, 0, 0))
		ParticleManager:SetParticleControl(effect_cast2, 3, self.parent:GetOrigin())
		ParticleManager:ReleaseParticleIndex(effect_cast2)

		if self.ability:GetAutoCastState() then
			self.caster:RemoveModifierByName("modifier_slark_saltwater_shiv_custom_legendary_steal")
			self.caster:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_slark_saltwater_shiv_custom_legendary_steal",
				{ duration = self.effect_duration, target = self.parent:entindex() }
			)
		end

		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_bashed",
			{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.e7_stun }
		)
	end

	self.ability:StartCd()
	self.caster:UpdateUIshort({ hide = 1, style = "SlarkEssence" })
end

function modifier_slark_saltwater_shiv_custom_legendary_target:AddStack()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self:Destroy()
	end
end

modifier_slark_saltwater_shiv_custom_attack = class(mod_hidden)

modifier_slark_saltwater_shiv_custom_effect = class(mod_visible)
function modifier_slark_saltwater_shiv_custom_effect:IsPurgable()
	return not self.caster:HasShard()
end
function modifier_slark_saltwater_shiv_custom_effect:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.k = 1
	self.move = self.ability.ms_steal
	self.heal_reduce = self.ability.health_rest_steal
	self.max = self.ability.max

	local particle = "particles/units/heroes/hero_slark/slark_dredged_trident_buff.vpcf"
	if self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber() then
		self.k = -1
		particle = "particles/units/heroes/hero_slark/slark_dredged_trident_debuff.vpcf"
		self.move = self.move - self.ability.talents.h2_slow / self.max
	end

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle(particle, self)
	self:OnRefresh()
end

function modifier_slark_saltwater_shiv_custom_effect:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_slark_saltwater_shiv_custom_effect:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_slark_saltwater_shiv_custom_effect:GetModifierMoveSpeedBonus_Constant()
	return self.move * self:GetStackCount() * self.k
end

function modifier_slark_saltwater_shiv_custom_effect:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount() * self.k
end

function modifier_slark_saltwater_shiv_custom_effect:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount() * self.k
end

modifier_slark_saltwater_shiv_custom_legendary_cd = class(mod_cd)

modifier_slark_saltwater_shiv_custom_speed = class(mod_visible)
function modifier_slark_saltwater_shiv_custom_speed:GetTexture()
	return "buffs/slark/essence_2"
end
function modifier_slark_saltwater_shiv_custom_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability.talents.e2_speed
end

function modifier_slark_saltwater_shiv_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_slark_saltwater_shiv_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

slark_empty_custom = class({})