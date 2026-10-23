--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_up_debuff_max", "abilities/general_talents/custom_general_talents", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_up_aoe_damage_effect",
	"abilities/general_talents/custom_general_talents",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier("modifier_general_stats", "abilities/general_talents/custom_general_talents", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_general_stats_aura",
	"abilities/general_talents/custom_general_talents",
	LUA_MODIFIER_MOTION_NONE
)

custom_general_talents = class({})
custom_general_talents.talents = {}

custom_general_talents.damage_out_mods = {
	"modifier_up_damage",
	"modifier_up_aoe_damage",
}

custom_general_talents.stats_functions = {
	[MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT] = { "has_gray_speed" },
	[MODIFIER_PROPERTY_ATTACK_RANGE_BONUS] = { "has_gray_speed" },
	[MODIFIER_PROPERTY_STATS_STRENGTH_BONUS] = { "has_gray_stats" },
	[MODIFIER_PROPERTY_STATS_AGILITY_BONUS] = { "has_gray_stats" },
	[MODIFIER_PROPERTY_STATS_INTELLECT_BONUS] = { "has_gray_stats" },
	[MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT] = { "has_gray_movespeed" },
	[MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING] = { "has_gray_movespeed", "duo" },
	[MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE] = { "has_gray_spelldamage" },
	[MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS] = { "has_gray_armor" },
	[MODIFIER_PROPERTY_EVASION_CONSTANT] = { "has_gray_armor" },
	[MODIFIER_PROPERTY_MANA_BONUS] = { "has_gray_mana" },
	[MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE] = { "has_gray_mana" },
	[MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE] = { "has_gray_damage" },
	[MODIFIER_PROPERTY_HEALTH_BONUS] = { "has_gray_health" },
	[MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE] = { "has_gray_health", "duo" },
	[MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS] = { "has_gray_magicresist" },
	[MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE] = { "has_gray_magicresist", "has_gray_control_shield" },
	[MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE] = { "has_gray_lifesteal" },
	[MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING] = { "has_gray_spell_proc" },
}

function custom_general_talents:UpdateTalents()
	local caster = self:GetCaster()

	if not self.init then
		self.init = true
		self.talents = {
			has_gray_health = 0,
			gray_health = 0,
			gray_health_max = 0,

			has_gray_mana = 0,
			gray_mana = 0,
			gray_mana_max = 0,

			has_gray_damage = 0,
			gray_damage = 0,
			gray_damage_max = 0,
			gray_damage_max_duration = caster:GetTalentValue("modifier_up_damage", "max_duration", true),

			has_gray_debuff_max = 0,

			has_gray_armor = 0,
			gray_armor = 0,
			gray_armor_max = 0,

			has_gray_stats = 0,
			gray_stats = 0,
			gray_stats_max = 0,

			has_gray_spelldamage = 0,
			gray_spelldamage = 0,
			gray_spelldamage_max = 0,

			has_gray_movespeed = 0,
			gray_movespeed = 0,
			gray_movespeed_max = 0,

			has_gray_lifesteal = 0,
			gray_lifesteal = 0,
			gray_lifesteal_max = 0,

			has_gray_speed = 0,
			gray_speed = 0,
			gray_speed_max = 0,
			gray_speed_max_range = 0,

			has_gray_magicresist = 0,
			gray_magicresist = 0,
			gray_magicresist_max = 0,

			has_gray_income = 0,
			gray_income = 0,

			has_gray_aoe_damage = 0,
			gray_aoe_damage = 0,
			gray_aoe_damage_max = 0,
			gray_aoe_damage_radius = caster:GetTalentValue("modifier_up_aoe_damage", "radius", true),

			has_gray_javelin = 0,
			gray_javelin = 0,
			gray_javelin_max = 0,
			gray_javelin_chance = caster:GetTalentValue("modifier_up_javelin", "chance", true),
			gray_javelin_radius = caster:GetTalentValue("modifier_up_javelin", "radius", true),

			has_gray_control_shield = 0,
			gray_control_shield = 0,
			gray_control_shield_max = 0,
			gray_control_shield_cd = caster:GetTalentValue("modifier_up_control_shield", "talent_cd", true),
			gray_control_shield_duration = caster:GetTalentValue("modifier_up_control_shield", "duration", true),
			gray_control_shield_max_health = caster:GetTalentValue("modifier_up_control_shield", "max_health", true),

			has_gray_spell_proc = 0,
			gray_spell_proc = 0,
			gray_spell_proc_max = 0,
			gray_spell_proc_cd = caster:GetTalentValue("modifier_up_spell_proc", "talent_cd", true),
			gray_spell_proc_radius = caster:GetTalentValue("modifier_up_spell_proc", "radius", true),
		}
	end

	if caster:HasTalent("modifier_up_health") then
		self.talents.has_gray_health = 1
		self.talents.gray_health = caster:GetTalentValue("modifier_up_health", "general_bonus")
		self.talents.gray_health_max = caster:GetTalentValue("modifier_up_health", "max_bonus")
	end

	if caster:HasTalent("modifier_up_mana") then
		self.talents.has_gray_mana = 1
		self.talents.gray_mana = caster:GetTalentValue("modifier_up_mana", "general_bonus")
		self.talents.gray_mana_max = caster:GetTalentValue("modifier_up_mana", "max_bonus")
	end

	if caster:HasTalent("modifier_up_damage") then
		self.talents.has_gray_damage = 1
		self.talents.gray_damage = caster:GetTalentValue("modifier_up_damage", "general_bonus")
		self.talents.gray_damage_max = caster:GetTalentValue("modifier_up_damage", "max_bonus")
	end

	if caster:HasTalent("modifier_up_armor") then
		self.talents.has_gray_armor = 1
		self.talents.gray_armor = caster:GetTalentValue("modifier_up_armor", "general_bonus")
		self.talents.gray_armor_max = caster:GetTalentValue("modifier_up_armor", "max_bonus")
	end

	if caster:HasTalent("modifier_up_stats") then
		self.talents.has_gray_stats = 1
		self.talents.gray_stats = caster:GetTalentValue("modifier_up_stats", "general_bonus")
		self.talents.gray_stats_max = caster:GetTalentValue("modifier_up_stats", "max_bonus") / 100
	end

	if caster:HasTalent("modifier_up_spelldamage") then
		self.talents.has_gray_spelldamage = 1
		self.talents.gray_spelldamage = caster:GetTalentValue("modifier_up_spelldamage", "general_bonus")
		self.talents.gray_spelldamage_max = caster:GetTalentValue("modifier_up_spelldamage", "max_bonus")
	end

	if caster:HasTalent("modifier_up_movespeed") then
		self.talents.has_gray_movespeed = 1
		self.talents.gray_movespeed = caster:GetTalentValue("modifier_up_movespeed", "general_bonus")
		self.talents.gray_movespeed_max = caster:GetTalentValue("modifier_up_movespeed", "max_bonus")
	end

	if caster:HasTalent("modifier_up_lifesteal") then
		self.talents.has_gray_lifesteal = 1
		self.talents.gray_lifesteal = caster:GetTalentValue("modifier_up_lifesteal", "general_bonus") / 100
		self.talents.gray_lifesteal_max = caster:GetTalentValue("modifier_up_lifesteal", "max_bonus")
	end

	if caster:HasTalent("modifier_up_speed") then
		self.talents.has_gray_speed = 1
		self.talents.gray_speed = caster:GetTalentValue("modifier_up_speed", "general_bonus")
		self.talents.gray_speed_max = caster:GetTalentValue("modifier_up_speed", "max_bonus")
		self.talents.gray_speed_max_range = caster:GetTalentValue("modifier_up_speed", "max_bonus_range")
	end

	if caster:HasTalent("modifier_up_magicresist") then
		self.talents.has_gray_magicresist = 1
		self.talents.gray_magicresist = caster:GetTalentValue("modifier_up_magicresist", "general_bonus")
		self.talents.gray_magicresist_max = caster:GetTalentValue("modifier_up_magicresist", "max_bonus")
	end

	if caster:HasTalent("modifier_up_income") then
		self.talents.has_gray_income = 1
		self.talents.gray_income = caster:GetTalentValue("modifier_up_income", "general_bonus")
	end

	if caster:HasTalent("modifier_up_aoe_damage") then
		self.talents.has_gray_aoe_damage = 1
		self.talents.gray_aoe_damage = caster:GetTalentValue("modifier_up_aoe_damage", "general_bonus")
		self.talents.gray_aoe_damage_max = caster:GetTalentValue("modifier_up_aoe_damage", "max_bonus")
	end

	if caster:HasTalent("modifier_up_javelin") then
		self.talents.has_gray_javelin = 1
		self.talents.gray_javelin = caster:GetTalentValue("modifier_up_javelin", "general_bonus")
		self.talents.gray_javelin_max = caster:GetTalentValue("modifier_up_javelin", "max_bonus")
	end

	if caster:HasTalent("modifier_up_control_shield") then
		self.talents.has_gray_control_shield = 1
		self.talents.gray_control_shield = caster:GetTalentValue("modifier_up_control_shield", "general_bonus")
		self.talents.gray_control_shield_max = caster:GetTalentValue("modifier_up_control_shield", "max_bonus")
	end

	if caster:HasTalent("modifier_up_spell_proc") then
		self.talents.has_gray_spell_proc = 1
		self.talents.gray_spell_proc = caster:GetTalentValue("modifier_up_spell_proc", "general_bonus")
		self.talents.gray_spell_proc_max = caster:GetTalentValue("modifier_up_spell_proc", "max_bonus")
	end

	if self.talents.gray_damage_max ~= 0 or self.talents.gray_aoe_damage_max ~= 0 then
		self.talents.has_gray_debuff_max = 1
	else
		self.talents.has_gray_debuff_max = 0
	end

	if not IsServer() then
		return
	end

	local key = table.concat(self:GetStatsFunctions(), ",")
	if IsValid(self.tracker) and self.tracker.stats_key and self.tracker.stats_key ~= key then
		self.tracker.stats_key = key
		Timers:CreateTimer(FrameTime(), function()
			if not IsValid(self, caster) then
				return
			end
			if IsValid(self.tracker) then
				self.tracker:Destroy()
			end
			caster:AddNewModifier(caster, self, "modifier_general_stats", {})
		end)
	end

	if self.talents.gray_stats_max > 0 then
		caster:AddPercentStat(
			{ str = self.talents.gray_stats_max, agi = self.talents.gray_stats_max, int = self.talents.gray_stats_max },
			self.tracker
		)
	end

	if not caster:IsRealHero() then
		return
	end

	if self.talents.has_gray_aoe_damage == 1 then
		self.talents.aoe_damage_ability = caster:FindAbilityByName("generic_aoe_damage")
			or caster:AddAbility("generic_aoe_damage")
		if not caster:HasModifier("modifier_general_stats_aura") then
			caster:AddNewModifier(caster, self, "modifier_general_stats_aura", {})
		end
	else
		caster:RemoveModifierByName("modifier_general_stats_aura")
	end

	if self.talents.has_gray_lifesteal == 1 then
		caster:AddLifesteal(self.tracker, { name = "modifier_up_lifesteal", value = self.talents.gray_lifesteal })
	end

	for _, check_name in pairs(self.damage_out_mods) do
		if caster:HasTalent(check_name) then
			caster:AddDamageEvent_out(self.tracker, true)
		end
	end

	if self.talents.has_gray_javelin == 1 then
		caster:AddProc(self.tracker, { land = true })
	end

	if self.talents.has_gray_control_shield == 1 then
		caster:AddStateEvent(self.tracker, true)
	end

	if self.talents.has_gray_spell_proc == 1 then
		caster:AddSpellEvent(self.tracker, true)
	end

	caster:CalculateStatBonus(true)
end

function custom_general_talents:IsItem()
	return true
end

function custom_general_talents:GetStatsFunctions(all)
	local list = {}
	for func, names in pairs(self.stats_functions) do
		for _, name in pairs(names) do
			if all or self.talents[name] == 1 or (name == "duo" and not IsSoloMode()) then
				table.insert(list, func)
				break
			end
		end
	end
	table.sort(list)
	return list
end

modifier_general_stats = class(mod_hidden)
function modifier_general_stats:RemoveOnDeath()
	return false
end
function modifier_general_stats:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.parent.stats_tracker = self

	self.duo_status = 0
	self.duo_health = 0
	if not IsSoloMode() then
		self.duo_status = 10
		self.duo_health = 10
	end

	self.ability:UpdateTalents()

	if not IsServer() then
		return
	end

	self.is_illusion = (self.parent:IsIllusion() or self.parent:IsTempestDouble()) and 1 or 0
	self.interval = 1
	self.gold_bank = 0

	self:StartIntervalThink(self.interval)
end

function modifier_general_stats:OnRefresh()
	self:OnCreated()
end

function modifier_general_stats:OnIntervalThink()
	if not IsServer() then
		return
	end

	local show_reduce = self.ability.talents.gray_control_shield_max ~= 0
		and self.parent:IsAlive()
		and not self.parent:PassivesDisabled()
		and self.parent:GetHealthPercent() <= self.ability.talents.gray_control_shield_max_health

	if show_reduce and not self.damage_reduce_particle then
		self.damage_reduce_particle = self.parent:GenericParticle("particles/generic/common_damage_reduce.vpcf", self)
	elseif not show_reduce and self.damage_reduce_particle then
		ParticleManager:DestroyParticle(self.damage_reduce_particle, false)
		ParticleManager:ReleaseParticleIndex(self.damage_reduce_particle)
		self.damage_reduce_particle = nil
	end

	if self.is_illusion == 1 then
		return
	end

	if self.ability.talents.has_gray_income == 1 then
		self.gold_bank = self.gold_bank + self.ability.talents.gray_income * self.interval / 60
		local gold = math.floor(self.gold_bank)
		if gold > 0 then
			self.gold_bank = self.gold_bank - gold
			self.parent:GiveGold(gold, false, true, "modifier_up_income")
		end
	end
end

function modifier_general_stats:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	local unit = params.unit
	local attacker = params.attacker

	if self.parent ~= attacker or unit:GetTeamNumber() == attacker:GetTeamNumber() or not unit:IsUnit() then
		return
	end

	if self.ability.talents.has_gray_debuff_max == 1 and unit:CheckCd("up_debuff_max", 3) then
		unit:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_up_debuff_max",
			{ duration = self.ability.talents.gray_damage_max_duration }
		)
	end
end

function modifier_general_stats:GetProcChance()
	return self.ability.talents.gray_javelin_chance
end

function modifier_general_stats:AttackProc(params)
	for _, target in
		pairs(self.parent:FindTargets(self.ability.talents.gray_javelin_radius, params.target:GetAbsOrigin()))
	do
		local damage = DoDamage(
			{
				victim = target,
				damage = self.ability.talents.gray_javelin,
				attacker = self.parent,
				ability = self.ability,
				damage_type = DAMAGE_TYPE_MAGICAL,
			},
			"modifier_up_javelin"
		)
		target:SendNumber(4, damage)
	end

	params.target:EmitSound("General.Talent_proc")
	local mainParticle =
		ParticleManager:CreateParticle("particles/generic/common_proc.vpcf", PATTACH_POINT_FOLLOW, params.target)
	ParticleManager:SetParticleControlEnt(
		mainParticle,
		3,
		params.target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		params.target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(mainParticle)
end

function modifier_general_stats:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_gray_spell_proc == 0 then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if
		not params.target
		or not params.target:IsUnit()
		or params.target:GetTeamNumber() == self.parent:GetTeamNumber()
	then
		return
	end
	if not self.parent:CheckCd("up_spell_proc", self.ability.talents.gray_spell_proc_cd) then
		return
	end

	for _, target in
		pairs(self.parent:FindTargets(self.ability.talents.gray_spell_proc_radius, params.target:GetAbsOrigin()))
	do
		local damage = DoDamage(
			{
				victim = target,
				damage = self.ability.talents.gray_spell_proc,
				attacker = self.parent,
				ability = self.ability,
				damage_type = DAMAGE_TYPE_MAGICAL,
			},
			"modifier_up_spell_proc"
		)
		target:SendNumber(4, damage)
	end

	params.target:EmitSound("General.Talent_proc_magic")
	params.target:GenericParticle("particles/generic/talent_aoe_damage.vpcf")
end

function modifier_general_stats:CheckState()
	if not self.ability then
		return
	end
	if not self.ability.talents.gray_javelin_max or self.ability.talents.gray_javelin_max == 0 then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_general_stats:DeclareFunctions()
	local ability = self:GetAbility()
	if not IsServer() or not ability then
		return custom_general_talents:GetStatsFunctions(true)
	end

	local list = ability:GetStatsFunctions()
	self.stats_key = table.concat(list, ",")
	return list
end

function modifier_general_stats:GetModifierIncomingDamage_Percentage(params)
	local bonus = 0

	if self.parent:PassivesDisabled() then
		return bonus
	end

	if params and params.inflictor then
		bonus = bonus + self.ability.talents.gray_magicresist_max
	end

	if
		self.ability.talents.gray_control_shield_max ~= 0
		and self.parent:GetHealthPercent() <= self.ability.talents.gray_control_shield_max_health
	then
		bonus = bonus + self.ability.talents.gray_control_shield_max
	end

	return bonus
end

function modifier_general_stats:GetModifierExtraHealthPercentage()
	return self.duo_health + self.ability.talents.gray_health_max
end

function modifier_general_stats:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.gray_lifesteal_max
end

function modifier_general_stats:GetModifierHealChange()
	return self.ability.talents.gray_lifesteal_max
end

function modifier_general_stats:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.gray_spelldamage
end

function modifier_general_stats:GetModifierStatusResistanceStacking()
	return self.duo_status + self.ability.talents.gray_movespeed_max
end

function modifier_general_stats:GetModifierEvasion_Constant()
	return self.ability.talents.gray_armor_max
end

function modifier_general_stats:GetModifierBonusStats_Agility()
	return self.ability.talents.gray_stats
end

function modifier_general_stats:GetModifierBonusStats_Strength()
	return self.ability.talents.gray_stats
end

function modifier_general_stats:GetModifierBonusStats_Intellect()
	return self.ability.talents.gray_stats
end

function modifier_general_stats:GetModifierAttackRangeBonus()
	local bonus = self.parent:IsRangedAttacker() and self.ability.talents.gray_speed_max_range
		or self.ability.talents.gray_speed_max

	if not self.parent:IsRangedAttacker() and self.parent:HasModifier("modifier_item_monkey_king_bar_custom") then
		return bonus
	end
	if
		self.parent:IsRangedAttacker()
		and (
			self.parent:HasModifier("modifier_item_dragon_lance")
			or self.parent:HasModifier("modifier_item_hurricane_pike_custom")
		)
	then
		return bonus
	end

	return bonus
end

function modifier_general_stats:GetModifierPercentageCooldown()
	return self.ability.talents.gray_mana_max
end

function modifier_general_stats:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.gray_speed
end

function modifier_general_stats:GetModifierPhysicalArmorBonus()
	return self.ability.talents.gray_armor
end

function modifier_general_stats:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.gray_damage
end

function modifier_general_stats:GetModifierHealthBonus()
	return self.ability.talents.gray_health
end

function modifier_general_stats:GetModifierManaBonus()
	return self.ability.talents.gray_mana
end

function modifier_general_stats:GetModifierMagicalResistanceBonus()
	return self.ability.talents.gray_magicresist
end

function modifier_general_stats:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.gray_movespeed
end

function modifier_general_stats:GetModifierCastRangeBonusStacking()
	return self.ability.talents.gray_spell_proc_max
end

function modifier_general_stats:StateEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_gray_control_shield == 0 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:IsInvulnerable() then
		return
	end
	if not self.parent:IsStunned() and not self.parent:IsFeared() and not self.parent:GetForceAttackTarget() then
		return
	end
	if not self.parent:CheckCd("up_control_shield", self.ability.talents.gray_control_shield_cd) then
		return
	end

	local shield = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield_multiple", {
		duration = self.ability.talents.gray_control_shield_duration,
		max_shield = self.ability.talents.gray_control_shield,
		start_full = 1,
		shield_talent = "modifier_up_control_shield",
		is_hidden = 1,
	})

	if shield then
		self.parent:EmitSound("General.Talent_shield")
		self.parent:GenericParticle("particles/items7_fx/archimedes_satchel_speed.vpcf")
		self.parent:GenericParticle("particles/generic/common_shield.vpcf", shield)
	end
end

function modifier_general_stats:GetItemDamage()
	return self.ability.talents.gray_spelldamage_max
end

function modifier_general_stats:GiveItem(name)
	local item = CreateItem(name, self.parent, self.parent)

	if name == "item_patrol_necro" then
		self.parent:AddNewModifier(
			self.parent,
			nil,
			"modifier_item_patrol_necro_timer",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_necro", "timer") * 60, item = item:entindex() }
		)
	end

	if self.parent:GetNumItemsInInventory() < 10 then
		self.parent:AddItem(item)
	else
		CreateItemOnPositionSync(GetGroundPosition(self.parent:GetAbsOrigin(), self.parent), item)
	end
end

function modifier_general_stats:GeneralTrigger(name)
	if not IsServer() then
		return
	end

	if name == "modifier_up_gold" then
		self.parent:GiveGold(
			self.parent:GetTalentValue("modifier_up_gold", "gold", true),
			true,
			nil,
			"modifier_up_gold"
		)
		return
	end

	if name == "modifier_patrol_reward_shield" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_1_shield",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_shield", "duration") }
		)
		return
	end

	if name == "modifier_patrol_reward_ward" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_1_ward",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_ward", "duration") }
		)
		return
	end

	if name == "modifier_patrol_reward_contract" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_1_vision",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_contract", "duration") }
		)
		return
	end

	if name == "modifier_patrol_reward_gold" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_1_gold",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_gold", "duration") }
		)
		return
	end

	if name == "modifier_patrol_reward_orb" then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_patrol_reward_1_orb", {})
		return
	end

	if name == "modifier_patrol_reward_gem" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_2_gem",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_gem", "duration") }
		)
		return
	end

	if name == "modifier_patrol_reward_buff" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_2_buff",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_buff", "duration") }
		)
		return
	end

	if name == "modifier_patrol_reward_upgrade" then
		dota1x6:CreateUpgradeOrb(self.parent, 1)
		self.parent:AddPoints(
			"blue",
			self.parent:GetTalentValue("modifier_patrol_reward_upgrade", "blue"),
			"modifier_patrol_reward_upgrade"
		)
		return
	end

	if name == "modifier_patrol_reward_fortifier" then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_patrol_reward_2_fortifier", {})
		return
	end

	if name == "modifier_patrol_reward_necro" then
		self:GiveItem("item_patrol_necro")
		return
	end

	if name == "modifier_patrol_reward_portal" then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_patrol_reward_2_portal",
			{ duration = self.parent:GetTalentValue("modifier_patrol_reward_portal", "duration") }
		)
		return
	end

	if name == "modifier_recipe_gold_satanic" then
		self:GiveItem("item_recipe_alchemist_gold_satanic")
		return
	end

	if name == "modifier_recipe_gold_assault" then
		self:GiveItem("item_recipe_alchemist_gold_cuirass")
		return
	end

	if name == "modifier_recipe_gold_khanda" then
		self:GiveItem("item_recipe_alchemist_gold_khanda")
		return
	end

	if name == "modifier_recipe_gold_daedalus" then
		self:GiveItem("item_recipe_alchemist_gold_daedalus")
		return
	end

	if name == "modifier_recipe_gold_heart" then
		self:GiveItem("item_recipe_alchemist_gold_heart")
		return
	end

	if name == "modifier_recipe_gold_octarine" then
		self:GiveItem("item_recipe_alchemist_gold_octarine")
		return
	end

	if name == "modifier_recipe_gold_shiva" then
		self:GiveItem("item_recipe_alchemist_gold_shiva")
		return
	end

	if name == "modifier_recipe_gold_skadi" then
		self:GiveItem("item_recipe_alchemist_gold_skadi")
		return
	end
end

modifier_general_stats_aura = class(mod_hidden)
function modifier_general_stats_aura:RemoveOnDeath()
	return false
end
function modifier_general_stats_aura:IsAura()
	return true
end
function modifier_general_stats_aura:IsAuraActiveOnDeath()
	return false
end
function modifier_general_stats_aura:GetModifierAura()
	return "modifier_up_aoe_damage_effect"
end
function modifier_general_stats_aura:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_general_stats_aura:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_general_stats_aura:GetAuraRadius()
	return self.ability.talents.gray_aoe_damage_radius
end
function modifier_general_stats_aura:OnCreated()
	self.ability = self:GetAbility()
end

modifier_up_aoe_damage_effect = class(mod_hidden)
function modifier_up_aoe_damage_effect:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.interval = 1

	self.particle_index = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_brewmaster/brewmaster_fire_immolation_child.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle_index,
		1,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.particle_index, false, false, -1, false, false)

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability.talents.aoe_damage_ability,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}

	self:StartIntervalThink(self.interval)
end

function modifier_up_aoe_damage_effect:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.damageTable.damage = self.ability.talents.gray_aoe_damage * self.interval
	DoDamage(self.damageTable, "modifier_up_aoe_damage")
end

modifier_up_debuff_max = class(mod_hidden)
function modifier_up_debuff_max:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_up_debuff_max:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_up_debuff_max:GetModifierPhysicalArmorBonus()
	return self.ability.talents.gray_damage_max
end

function modifier_up_debuff_max:GetModifierMagicalResistanceBonus()
	return self.ability.talents.gray_aoe_damage_max
end