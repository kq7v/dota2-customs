--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_life_stealer_infest_custom_tracker",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_bonus",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_creep",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_creep_status",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_autocast",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_pick",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_pick_cd",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_saved",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_bonus",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_lifestealer_infest_3", "modifier_lifestealer_infest_7" }
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_legendary_creep_active",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_attack_damage",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_health_bonus",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_infest_2"
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_magic_reduce",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_infest_3"
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_health_reduce",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_infest_1"
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_root",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_infest_4"
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_armor",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_hero_1"
)
LinkLuaModifier(
	"modifier_life_stealer_infest_custom_regen",
	"abilities/life_stealer/life_stealer_infest_custom",
	LUA_MODIFIER_MOTION_NONE
)

life_stealer_infest_custom = class({})
life_stealer_infest_custom.talents = {}

function life_stealer_infest_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_life_stealer/life_stealer_infest_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_life_stealer/life_stealer_infested_unit.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_life_stealer/life_stealer_infest_emerge_bloody.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_vision.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pudge/pudge_fleshheap_status_effect.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/bloodrage_stack_main.vpcf", context)
	PrecacheResource("particle", "particles/queen_of_pain/blink_root.vpcf", context)
end

function life_stealer_infest_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_health_reduce = 0,
			r1_damage_creep = 0,
			r1_damage = 0,
			r1_cd_creep = 0,
			r1_duration = caster:GetTalentValue("modifier_lifestealer_infest_1", "duration", true),

			has_r2 = 0,
			r2_health = 0,
			r2_health_creep = 0,
			r2_heal = 0,
			r2_heal_creep = 0,
			r2_duration = caster:GetTalentValue("modifier_lifestealer_infest_2", "duration", true),

			has_r3 = 0,
			r3_cdr = 0,
			r3_damage_creep = 0,
			r3_magic = 0,
			r3_duration = caster:GetTalentValue("modifier_lifestealer_infest_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_lifestealer_infest_3", "max", true),
			r3_max_creep = caster:GetTalentValue("modifier_lifestealer_infest_3", "max_creep", true),

			has_r4 = 0,
			r4_duration = caster:GetTalentValue("modifier_lifestealer_infest_4", "duration", true),
			r4_heal_amp = caster:GetTalentValue("modifier_lifestealer_infest_4", "heal_amp", true),
			r4_root = caster:GetTalentValue("modifier_lifestealer_infest_4", "root", true),
			r4_heal_creep = caster:GetTalentValue("modifier_lifestealer_infest_4", "heal_creep", true) / 100,

			has_r7 = 0,
			r7_health_creep = caster:GetTalentValue("modifier_lifestealer_infest_7", "health_creep", true),
			r7_health = caster:GetTalentValue("modifier_lifestealer_infest_7", "health", true) / 100,

			has_h1 = 0,
			h1_cd = 0,
			h1_armor = 0,
			h1_duration = caster:GetTalentValue("modifier_lifestealer_hero_1", "duration", true),

			has_h6 = 0,
			h6_duration = caster:GetTalentValue("modifier_lifestealer_hero_6", "duration", true),
			h6_mana = caster:GetTalentValue("modifier_lifestealer_hero_6", "mana", true),
			h6_duration_creep = caster:GetTalentValue("modifier_lifestealer_hero_6", "duration_creep", true),
			h6_cd_items = caster:GetTalentValue("modifier_lifestealer_hero_6", "cd_items", true),
		}
	end

	if caster:HasTalent("modifier_lifestealer_infest_1") then
		self.talents.has_r1 = 1
		self.talents.r1_health_reduce = caster:GetTalentValue("modifier_lifestealer_infest_1", "health_reduce")
		self.talents.r1_damage_creep = caster:GetTalentValue("modifier_lifestealer_infest_1", "damage_creep")
		self.talents.r1_damage = caster:GetTalentValue("modifier_lifestealer_infest_1", "damage") / 100
		self.talents.r1_cd_creep = caster:GetTalentValue("modifier_lifestealer_infest_1", "cd_creep")
	end

	if caster:HasTalent("modifier_lifestealer_infest_2") then
		self.talents.has_r2 = 1
		self.talents.r2_health = caster:GetTalentValue("modifier_lifestealer_infest_2", "health") / 100
		self.talents.r2_health_creep = caster:GetTalentValue("modifier_lifestealer_infest_2", "health_creep") / 100
		self.talents.r2_heal = caster:GetTalentValue("modifier_lifestealer_infest_2", "heal")
		self.talents.r2_heal_creep = caster:GetTalentValue("modifier_lifestealer_infest_2", "heal_creep")
	end

	if caster:HasTalent("modifier_lifestealer_infest_3") then
		self.talents.has_r3 = 1
		self.talents.r3_cdr = caster:GetTalentValue("modifier_lifestealer_infest_3", "cdr")
		self.talents.r3_damage_creep = caster:GetTalentValue("modifier_lifestealer_infest_3", "damage_creep") / 100
		self.talents.r3_magic = caster:GetTalentValue("modifier_lifestealer_infest_3", "magic")
	end

	if caster:HasTalent("modifier_lifestealer_infest_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true, illusion = true })
	end

	if caster:HasTalent("modifier_lifestealer_infest_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_lifestealer_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_cd = caster:GetTalentValue("modifier_lifestealer_hero_1", "cd")
		self.talents.h1_armor = caster:GetTalentValue("modifier_lifestealer_hero_1", "armor")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_lifestealer_hero_6") then
		self.talents.has_h6 = 1
		caster:AddSpellEvent(self.tracker, true)
	end
end

function life_stealer_infest_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "life_stealer_infest", self)
end

function life_stealer_infest_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_life_stealer_infest_custom_tracker"
end

function life_stealer_infest_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.h1_cd or 0)
end

function life_stealer_infest_custom:CastFilterResultTarget(target)
	if not target then
		return
	end
	if target == self.caster then
		return UF_FAIL_OTHER
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() and not target:IsHero() then
		return UF_FAIL_CREEP
	end
	return UnitFilter(
		target,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		0,
		self.caster:GetTeamNumber()
	)
end

function life_stealer_infest_custom:OnAbilityPhaseStart()
	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_6)
	return true
end

function life_stealer_infest_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end
	if self.caster:GetUnitName() ~= "npc_dota_hero_life_stealer" then
		return
	end

	self.caster:RemoveGesture(ACT_DOTA_CAST_ABILITY_6)

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_life_stealer/life_stealer_infest_cast.vpcf",
		PATTACH_POINT,
		target
	)
	ParticleManager:SetParticleControl(effect, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	local is_creep = target:IsCreep()
		and not target:IsConsideredHero()
		and target:GetTeamNumber() == DOTA_TEAM_NEUTRALS
		and not target:IsAncient()
		and not target.is_patrol_creep
	local is_ally = target:GetTeamNumber() == self.caster:GetTeamNumber() and 1 or 0

	local duration
	if not is_creep then
		duration = self.infest_duration_enemy + (self.talents.has_h6 == 1 and self.talents.h6_duration or 0)
	else
		target:SetOwner(self.caster)
		target:SetTeam(self.caster:GetTeamNumber())
		target:SetControllableByPlayer(self.caster:GetPlayerOwnerID(), true)
		target.owner = self.caster
		target:AddNewModifier(self.caster, self, "modifier_life_stealer_infest_creep", {})
		target:AddNewModifier(self.caster, self, "modifier_life_stealer_infest_custom_bonus", {})
		target:RemoveModifierByName("modifier_neutral_cast")
		target:RemoveModifierByName("modifier_neutral_cast_cd")

		local abilities = {
			["neutral_centaur_stun"] = "neutral_centaur_stun_active",
			["neutral_bird_tornado"] = "neutral_bird_tornado_active",
			["neutral_cone_armor"] = "neutral_cone_armor_active",
			["neutral_harpy_strike"] = "neutral_harpy_strike_active",
			["neutral_ogre_armor"] = "neutral_ogre_armor_active",
			["neutral_satyr_purge"] = "neutral_satyr_purge_active",
			["neutral_satyr_shockwave"] = "neutral_satyr_shockwave_active",
			["neutral_ursa_clap"] = "neutral_ursa_clap_active",
			["neutral_troll_raise"] = "neutral_troll_root_active",
			["neutral_golem_stun"] = "neutral_golem_stun_active",
			["neutral_frog_water_bubble"] = "neutral_frog_water_bubble_active",
			["neutral_frog_water_bubble_2"] = "neutral_frog_water_bubble_2_active",
			["neutral_frog_water_bubble_3"] = "neutral_frog_water_bubble_3_active",
			["neutral_frog_tendrils"] = "neutral_frog_tendrils_active",
			["neutral_frog_tendrils_2"] = "neutral_frog_tendrils_2_active",
			["neutral_frog_tendrils_3"] = "neutral_frog_tendrils_3_active",
		}

		for name, new_name in pairs(abilities) do
			local old_ability = target:FindAbilityByName(name)
			if old_ability then
				local new_ability = target:AddAbility(new_name)
				new_ability:SetLevel(old_ability:GetLevel())
				target:SwapAbilities(name, new_name, false, true)
				target:RemoveAbility(name)
			end
		end

		if target:HasAbility("mud_golem_rock_destroy") then
			target:RemoveAbility("mud_golem_rock_destroy")
		end

		for i = 0, 4 do
			local creep_ability = target:GetAbilityByIndex(i)
			if not creep_ability then
				target:AddAbility("generic_hidden")
			end
		end
		local ability = target:AddAbility("life_stealer_consume_custom")
		ability:SetLevel(1)
		ability:SetHidden(false)
	end

	if is_ally == 1 then
		duration = nil
		target:AddNewModifier(self.caster, self, "modifier_life_stealer_infest_custom_bonus", {})
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_life_stealer_infest_custom",
		{ target = target:entindex(), is_creep = is_creep, is_ally = is_ally, duration = duration, is_legendary = false }
	)
end

function life_stealer_infest_custom:UpdateLevels()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster.infest_creep) then
		return
	end

	for i = 0, 2 do
		local creep_ability = self.caster.infest_creep:GetAbilityByIndex(i)
		if creep_ability then
			creep_ability:SetLevel(self:GetLevel())
		end
	end

	local abilities = {
		"life_stealer_rage_custom",
		"life_stealer_feast_custom",
		"life_stealer_innate_custom",
	}

	for _, name in pairs(abilities) do
		local hero_ability = self.caster:FindAbilityByName(name)
		if hero_ability and hero_ability:IsTrained() then
			if
				hero_ability:GetIntrinsicModifierName()
				and not self.caster.infest_creep:HasModifier(hero_ability:GetIntrinsicModifierName())
			then
				self.caster.infest_creep:AddNewModifier(
					self.caster,
					hero_ability,
					hero_ability:GetIntrinsicModifierName(),
					{}
				)
			end
		end
	end
end

modifier_life_stealer_infest_custom = class(mod_visible)
function modifier_life_stealer_infest_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.radius
	self.damage = self.ability.damage
	self.regen = self.ability.self_regen

	if not IsServer() then
		return
	end

	self.parent:AddOrderFilter(self)

	self.parent:RemoveModifierByName("modifier_item_echo_sabre_custom_speed")
	self.parent:RemoveModifierByName("modifier_item_harpoon_custom_speed")

	self.RemoveForDuel = true
	self.parent:NoDraw(self)

	self.target = EntIndexToHScript(table.target)
	self.target:EmitSound("Hero_LifeStealer.Infest")

	self.is_creep = table.is_creep
	self.is_legendary = table.is_legendary
	self.is_ally = table.is_ally

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_life_stealer/life_stealer_infested_unit.vpcf",
		self
	)

	if self.is_legendary == 1 then
		local mod = self.parent:FindModifierByName("modifier_life_stealer_feast_custom_tracker")
		if mod then
			mod:OnIntervalThink()
		end
		self.target:GenericParticle(
			"particles/units/heroes/hero_life_stealer/life_stealer_infested_unit.vpcf",
			self,
			true
		)
	elseif self.is_creep == 1 or self.is_ally == 1 then
		local effect = ParticleManager:CreateParticleForTeam(
			pfx_name,
			PATTACH_OVERHEAD_FOLLOW,
			self.target,
			self.parent:GetTeamNumber()
		)
		self:AddParticle(effect, false, false, -1, false, false)
	else
		self.target:GenericParticle(pfx_name, self, true)
	end

	local main_name = self.ability.talents.has_r7 == 1 and "life_stealer_infest_custom_legendary"
		or "life_stealer_infest_custom"
	self.parent:SwapAbilities(main_name, "life_stealer_consume_custom", false, true)
	local main_ability = self.parent:FindAbilityByName(main_name)
	if main_ability then
		main_ability:EndCd()
	end

	local ability = self.parent:FindAbilityByName("life_stealer_consume_custom")
	if ability then
		ability:StartCooldown(0.5)
	end

	self.interval = FrameTime()
	self.attack_timer = 0
	self.attack_interval = 1 - FrameTime()

	self.ui_timer = 0.2
	self.ui_count = 0
	self.player = PlayerResource:GetPlayer(self.parent:GetId())
	self.rage_ability = self.parent.rage_ability
	self.wounds_ability = self.parent.wounds_ability

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_infest_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.target) or not self.target:IsAlive() then
		self:Destroy()
		return
	end

	self.parent:SetOrigin(self.target:GetAbsOrigin())

	if self.is_legendary == 1 then
		self.ui_count = self.ui_count + self.interval
		if self.ui_count >= self.ui_timer then
			self.ui_count = 0
			local data = {}
			data.hide = 0
			data.rage_cd = self.rage_ability and self.rage_ability:GetCooldownTimeRemaining() or 0
			data.wounds_cd = self.wounds_ability and self.wounds_ability:GetCooldownTimeRemaining() or 0
			data.rage_active = (self.rage_ability and IsValid(self.rage_ability.active_mod)) and 1 or 0
			data.wounds_active = (self.wounds_ability and IsValid(self.wounds_ability.active_mod)) and 1 or 0

			CustomGameEventManager:Send_ServerToPlayer(self.player, "lifestealer_infest", data)
		end
	end

	if self.is_creep == 1 or self.is_ally == 1 then
		return
	end

	self.attack_timer = self.attack_timer + self.interval
	if self.attack_timer < self.attack_interval then
		return
	end

	self.attack_timer = 0

	self.parent:AddNewModifier(self.parent, self.ability, "modifier_life_stealer_infest_custom_attack_damage", {})
	self.parent:PerformAttack(self.target, true, true, true, true, false, false, true)
	self.parent:RemoveModifierByName("modifier_life_stealer_infest_custom_attack_damage")

	if self.ability.talents.has_r3 == 1 then
		self.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_magic_reduce",
			{ duration = self.ability.talents.r3_duration }
		)
	end

	if self.ability.talents.has_h6 == 1 then
		self.parent:CdItems(self.ability.talents.h6_cd_items, "modifier_lifestealer_hero_6")
	end
end

function modifier_life_stealer_infest_custom:OrderFilter(params)
	if self.is_legendary == 1 then
		return dota1x6:InfestOrderFilter(params, self.target)
	end

	if not params.teleport then
		return
	end
	return { no_teleport = true }
end

function modifier_life_stealer_infest_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
		MODIFIER_PROPERTY_MODEL_CHANGE,
	}
end

function modifier_life_stealer_infest_custom:GetModifierHealthRegenPercentage()
	return self.regen + (self.ability.talents.has_r7 == 0 and self.ability.talents.r2_heal or 0)
end

function modifier_life_stealer_infest_custom:GetModifierModelChange()
	return "models/development/invisiblebox.vmdl"
end

function modifier_life_stealer_infest_custom:CheckState()
	local result = {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}

	if self.is_legendary == 0 then
		result[MODIFIER_STATE_SILENCED] = true
		result[MODIFIER_STATE_MUTED] = true
	end

	return result
end

function modifier_life_stealer_infest_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveNoDraw()

	local main_name = self.ability.talents.has_r7 == 1 and "life_stealer_infest_custom_legendary"
		or "life_stealer_infest_custom"
	self.parent:SwapAbilities(main_name, "life_stealer_consume_custom", true, false)

	local ability = self.parent:FindAbilityByName(main_name)
	if ability then
		ability:StartCd()
	end

	self.parent:StartGesture(ACT_DOTA_LIFESTEALER_INFEST_END)

	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), true)
	local sound_name = wearables_system:GetSoundReplacement(self.parent, "Hero_LifeStealer.Consume", self)
	EmitSoundOnLocationWithCaster(self.parent:GetAbsOrigin(), sound_name, self.parent)

	self.parent:Purge(false, true, false, false, true)

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_life_stealer/life_stealer_infest_emerge_bloody.vpcf",
		self
	)
	self.parent:GenericParticle(pfx_name)

	if not IsValid(self.target) then
		return
	end
	self.target:RemoveModifierByName("modifier_life_stealer_infest_custom_health_reduce")

	local health = self.target:GetMaxHealth()
	local damage = self.damage + (self.ability.talents.has_r7 == 0 and health * self.ability.talents.r1_damage or 0)

	if self.ability.talents.has_r1 == 1 then
		self.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_health_reduce",
			{ duration = self.ability.talents.r1_duration }
		)
	end

	self.damageTable =
		{ attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL, damage = damage }
	for _, target in pairs(self.parent:FindTargets(self.radius)) do
		self.damageTable.victim = target
		DoDamage(self.damageTable)
	end

	if self.ability.talents.has_h1 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_armor",
			{ duration = self.ability.talents.h1_duration }
		)
	end

	if self.ability.talents.has_r2 == 1 and self.ability.talents.has_r7 == 0 then
		self.parent:RemoveModifierByName("modifier_life_stealer_infest_custom_health_bonus")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_health_bonus",
			{ duration = self.ability.talents.r2_duration, health = health * self.ability.talents.r2_health }
		)
	end

	if
		self.is_creep == 0
		and self.is_ally == 0
		and self.ability.talents.has_r4 == 1
		and self.ability.talents.has_r7 == 0
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_regen",
			{ duration = self.ability.talents.r4_duration }
		)
		self.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_root",
			{ duration = (1 - self.target:GetStatusResistance()) * self.ability.talents.r4_root }
		)
	end

	if self.is_legendary == 1 and self.target:GetHealthPercent() <= self.ability.talents.r7_health_creep then
		self.parent:SetHealth(
			math.max(1, self.parent:GetHealth() - self.parent:GetMaxHealth() * self.ability.talents.r7_health)
		)
	end

	if self.is_creep == 1 then
		self.target:Kill(self.ability, self.parent)
	end

	self.target:RemoveModifierByName("modifier_life_stealer_infest_custom_bonus")

	if self.is_legendary == 1 then
		local mod = self.parent:FindModifierByName("modifier_life_stealer_feast_custom_tracker")
		if mod then
			mod:OnIntervalThink()
		end
		CustomGameEventManager:Send_ServerToPlayer(self.player, "lifestealer_infest", { hide = 1 })
		CustomGameEventManager:Send_ServerToPlayer(
			self.player,
			"select_unit_custom",
			{ index = self.parent:entindex() }
		)
	end
end

modifier_life_stealer_infest_custom_bonus = class(mod_hidden)
function modifier_life_stealer_infest_custom_bonus:RemoveOnDeath()
	return false
end
function modifier_life_stealer_infest_custom_bonus:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.move_speed = self.ability.bonus_movement_speed
	self.health = self.ability.bonus_health

	if not IsServer() then
		return
	end

	if self.parent:IsCreep() then
		self.parent:SetBaseMaxHealth(self.parent:GetBaseMaxHealth() + self.health)

		local ability = self.parent:FindAbilityByName("life_stealer_consume")
		if ability then
			ability:SetHidden(true)
		end
		self:StartIntervalThink(0.1)
	end
end

function modifier_life_stealer_infest_custom_bonus:OnIntervalThink()
	if not IsServer() then
		return
	end
	local ability = self.parent:FindAbilityByName("life_stealer_consume")
	if ability then
		ability:SetHidden(true)
	end
	self:StartIntervalThink(-1)
end

function modifier_life_stealer_infest_custom_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_life_stealer_infest_custom_bonus:GetModifierHealthBonus()
	if not self.parent:IsHero() then
		return
	end
	return self.health
end

function modifier_life_stealer_infest_custom_bonus:GetModifierMoveSpeedBonus_Percentage()
	return self.move_speed
end

modifier_life_stealer_infest_custom_tracker = class(mod_hidden)
function modifier_life_stealer_infest_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.infest_ability = self.ability

	self.legendary_ability = self.parent:FindAbilityByName("life_stealer_infest_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
	self.ability.bonus_health = self.ability:GetSpecialValueFor("bonus_health")
	self.ability.creep_move = self.ability:GetSpecialValueFor("creep_move")
	self.ability.self_regen = self.ability:GetSpecialValueFor("self_regen")
	self.ability.infest_duration_enemy = self.ability:GetSpecialValueFor("infest_duration_enemy")
	self.ability.attacks = self.ability:GetSpecialValueFor("attacks")
	self.ability.attacks_damage = self.ability:GetSpecialValueFor("attacks_damage")

	self.root_mods = {
		"modifier_life_stealer_ursa_overpower",
		"modifier_life_stealer_centaur_retaliate",
		"modifier_life_stealer_dragon_flight",
	}
	self.ability:UpdateLevels()
end

function modifier_life_stealer_infest_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.self_regen = self.ability:GetSpecialValueFor("self_regen")
	self.ability.attacks_damage = self.ability:GetSpecialValueFor("attacks_damage")
	self.ability.bonus_health = self.ability:GetSpecialValueFor("bonus_health")
	self.ability:UpdateLevels()
end

function modifier_life_stealer_infest_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if params.unit ~= self.parent and params.unit ~= self.parent.infest_creep then
		return
	end

	if self.ability.talents.has_h1 == 1 then
		local unit = self.parent.infest_creep or self.parent
		unit:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_armor",
			{ duration = self.ability.talents.h1_duration }
		)
	end

	if self.ability.talents.has_h6 == 1 and self.ability.talents.has_r7 == 1 then
		self.parent:CdItems(self.ability.talents.h6_cd_items, "modifier_lifestealer_hero_6")
	end
end

function modifier_life_stealer_infest_custom_tracker:GetProcChance()
	return 100
end

function modifier_life_stealer_infest_custom_tracker:AttackProc(params, name)
	local attacker = params.attacker

	if attacker.owner ~= self.parent then
		return
	end
	if not attacker:HasModifier("modifier_life_stealer_infest_custom_legendary_creep") then
		return
	end

	for _, name in pairs(self.root_mods) do
		local mod = attacker:FindModifierByName(name)
		if mod and not mod.root_proc then
			mod.root_proc = true
			params.target:AddNewModifier(
				attacker,
				self.ability,
				"modifier_life_stealer_infest_custom_root",
				{ duration = (1 - params.target:GetStatusResistance()) * self.ability.talents.r4_root }
			)
			break
		end
	end
end

function modifier_life_stealer_infest_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_life_stealer_infest_custom_tracker:GetModifierPercentageCooldown()
	return self.ability.talents.r3_cdr
end

function modifier_life_stealer_infest_custom_tracker:GetModifierPercentageManacostStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_mana
end

function modifier_life_stealer_infest_custom_tracker:GetModifierHealChange()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_heal_amp
end

function modifier_life_stealer_infest_custom_tracker:GetModifierHPRegenAmplify_Percentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_heal_amp
end

modifier_life_stealer_infest_custom_attack_damage = class(mod_hidden)
function modifier_life_stealer_infest_custom_attack_damage:OnCreated()
	self.ability = self:GetAbility()
	self.attacks_damage = self.ability.attacks_damage - 100
end

function modifier_life_stealer_infest_custom_attack_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_life_stealer_infest_custom_attack_damage:GetModifierDamageOutgoing_Percentage()
	return self.attacks_damage
end

modifier_life_stealer_infest_custom_health_bonus = class(mod_visible)
function modifier_life_stealer_infest_custom_health_bonus:GetTexture()
	return "buffs/lifestealer/infest_2"
end
function modifier_life_stealer_infest_custom_health_bonus:OnCreated(table)
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent = self:GetParent()
	self:SetStackCount(table.health)
end

function modifier_life_stealer_infest_custom_health_bonus:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_life_stealer_infest_custom_health_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
	}
end

function modifier_life_stealer_infest_custom_health_bonus:GetModifierHealthBonus()
	return self:GetStackCount()
end

modifier_life_stealer_infest_custom_magic_reduce = class(mod_visible)
function modifier_life_stealer_infest_custom_magic_reduce:GetTexture()
	return "buffs/lifestealer/infest_3"
end
function modifier_life_stealer_infest_custom_magic_reduce:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_life_stealer_infest_custom_magic_reduce:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if not self.effect_cast then
		self.effect_cast = self.parent:GenericParticle("particles/bloodseeker/bloodrage_stack_main.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
end

function modifier_life_stealer_infest_custom_magic_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_life_stealer_infest_custom_magic_reduce:GetModifierMagicalResistanceBonus()
	return self.ability.talents.r3_magic * self:GetStackCount()
end

modifier_life_stealer_infest_custom_root = class(mod_hidden)
function modifier_life_stealer_infest_custom_root:IsPurgable()
	return true
end
function modifier_life_stealer_infest_custom_root:GetStatusEffectName()
	return "particles/status_fx/status_effect_life_stealer_open_wounds.vpcf"
end
function modifier_life_stealer_infest_custom_root:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_life_stealer_infest_custom_root:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	self.parent:GenericParticle("particles/queen_of_pain/blink_root.vpcf", self)
	self.parent:EmitSound("Lifestealer.Shard_target")
end

function modifier_life_stealer_infest_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_life_stealer_infest_custom_armor = class(mod_visible)
function modifier_life_stealer_infest_custom_armor:GetTexture()
	return "buffs/lifestealer/hero_1"
end
function modifier_life_stealer_infest_custom_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.talents.h1_armor
end

function modifier_life_stealer_infest_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_life_stealer_infest_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor
end

modifier_life_stealer_infest_custom_regen = class(mod_hidden)
function modifier_life_stealer_infest_custom_regen:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.regen = self.ability.self_regen + self.ability.talents.r2_heal
end

function modifier_life_stealer_infest_custom_regen:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_life_stealer_infest_custom_regen:GetModifierHealthRegenPercentage()
	return self.regen
end

modifier_life_stealer_infest_custom_health_reduce = class(mod_visible)
function modifier_life_stealer_infest_custom_health_reduce:GetTexture()
	return "buffs/lifestealer/infest_1"
end
function modifier_life_stealer_infest_custom_health_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_life_stealer_infest_custom_health_reduce:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsHero() then
		return
	end
	self.parent:CalculateStatBonus(true)
end

function modifier_life_stealer_infest_custom_health_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
	}
end

function modifier_life_stealer_infest_custom_health_reduce:GetModifierExtraHealthPercentage()
	return self.ability.talents.r1_health_reduce
end

life_stealer_consume_custom = class({})
function life_stealer_consume_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "life_stealer_consume", self)
end

function life_stealer_consume_custom:OnSpellStart()
	local caster = self.caster.owner or self.caster

	local mod = caster:FindModifierByName("modifier_life_stealer_infest_custom")
	if not mod then
		return
	end
	mod:Destroy()
end

life_stealer_infest_custom_legendary = class({})
life_stealer_infest_custom_legendary.talents = {}

function life_stealer_infest_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_damage_creep = 0,

			r2_health_creep = 0,
			r2_heal_creep = 0,

			r3_cdr = 0,

			has_r4 = 0,
			r4_heal_amp = caster:GetTalentValue("modifier_lifestealer_infest_4", "heal_amp", true),

			w2_heal = 0,

			has_h1 = 0,
			h1_cd = 0,

			has_h6 = 0,
			h6_mana = caster:GetTalentValue("modifier_lifestealer_hero_6", "mana", true),
		}
	end

	if caster:HasTalent("modifier_lifestealer_infest_1") then
		self.talents.r1_damage_creep = caster:GetTalentValue("modifier_lifestealer_infest_1", "damage_creep")
	end

	if caster:HasTalent("modifier_lifestealer_infest_2") then
		self.talents.r2_health_creep = caster:GetTalentValue("modifier_lifestealer_infest_2", "health_creep") / 100
		self.talents.r2_heal_creep = caster:GetTalentValue("modifier_lifestealer_infest_2", "heal_creep")
	end

	if caster:HasTalent("modifier_lifestealer_infest_3") then
		self.talents.r3_cdr = caster:GetTalentValue("modifier_lifestealer_infest_3", "cdr")
	end

	if caster:HasTalent("modifier_lifestealer_infest_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_lifestealer_wounds_2") then
		self.talents.w2_heal = caster:GetTalentValue("modifier_lifestealer_wounds_2", "heal") / 100
	end

	if caster:HasTalent("modifier_lifestealer_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_cd = caster:GetTalentValue("modifier_lifestealer_hero_1", "cd")
	end

	if caster:HasTalent("modifier_lifestealer_hero_6") then
		self.talents.has_h6 = 1
	end
end

function life_stealer_infest_custom_legendary:CreateTalent()
	local ability = self.caster:FindAbilityByName("life_stealer_infest_custom")
	if not ability then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_life_stealer_infest_custom_legendary_saved",
		{ name = "npc_lifestealer_infest_ursa" }
	)
	self.caster:SwapAbilities(self:GetName(), "life_stealer_infest_custom", not ability:IsHidden(), false)
end

function life_stealer_infest_custom_legendary:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.h1_cd or 0)
end

function life_stealer_infest_custom_legendary:CheckToggle()
	if self.caster:HasModifier("modifier_life_stealer_infest_custom_legendary_pick_cd") then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = "#midteleport_cd" }
		)
		return false
	end
	return true
end

function life_stealer_infest_custom_legendary:OnAbilityPhaseStart()
	self.caster:StartGesture(ACT_DOTA_LIFESTEALER_EJECT)
	return true
end

function life_stealer_infest_custom_legendary:OnSpellStart()
	local ability = self.caster.infest_ability

	local mod = self.caster:FindModifierByName("modifier_life_stealer_infest_custom_legendary_saved")
	if not mod or not mod.name then
		return
	end

	local creep = CreateUnitByName(
		mod.name,
		self.caster:GetAbsOrigin(),
		true,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	if not creep then
		return
	end

	self.caster:RemoveGesture(ACT_DOTA_LIFESTEALER_EJECT)
	creep.owner = self.caster
	creep.lifestealer_creep = true
	creep.IsRealHero = function()
		return true
	end
	creep.IsCreep = function()
		return false
	end
	creep.IsHero = function()
		return true
	end
	creep.CalculateStatBonus = function()
		return
	end
	creep:AddNewModifier(self.caster, self, "modifier_life_stealer_infest_custom_legendary_creep", {})
	creep:AddNewModifier(self.caster, self, "modifier_life_stealer_infest_custom_legendary_creep_active", {})

	local vec = self.caster:GetForwardVector()
	vec.z = 0

	creep:SetAngles(0, 0, 0)
	creep:FacePoint(creep:GetAbsOrigin() + vec * 10)

	creep:SetControllableByPlayer(self.caster:GetPlayerID(), true)
	creep:SetOwner(self.caster)

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_life_stealer/life_stealer_infest_cast.vpcf",
		PATTACH_POINT,
		creep
	)
	ParticleManager:SetParticleControl(effect, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		creep,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		creep:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	local effect2 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_life_stealer/life_stealer_infest_cast.vpcf",
		PATTACH_POINT,
		creep
	)
	ParticleManager:SetParticleControl(effect2, 0, creep:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		effect2,
		1,
		creep,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		creep:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect2)

	local consume = creep:FindAbilityByName("life_stealer_consume_custom")
	if consume then
		consume:SetLevel(1)
		consume:SetHidden(false)
		consume:StartCooldown(1)
	end

	local abilities = {
		"life_stealer_rage_custom",
		"life_stealer_feast_custom",
		"life_stealer_innate_custom",
	}

	for _, name in pairs(abilities) do
		local hero_ability = self.caster:FindAbilityByName(name)
		if hero_ability and hero_ability:IsTrained() then
			if hero_ability:GetIntrinsicModifierName() then
				creep:AddNewModifier(self.caster, hero_ability, hero_ability:GetIntrinsicModifierName(), {})
			end
		end
	end

	local tp_item = CreateItem("item_tpscroll_custom", self.caster, self.caster)
	creep:AddItem(tp_item)

	for i = 0, 2 do
		local creep_ability = creep:GetAbilityByIndex(i)
		if creep_ability then
			creep_ability:SetLevel(self:GetLevel())
		end
	end

	local shard_ability = creep:FindAbilityByName("life_stealer_unfettered_custom")
	if shard_ability and self.caster:HasShard() then
		shard_ability:SetHidden(false)
		shard_ability:SetLevel(1)
	end

	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.caster:GetId()),
		"select_unit_custom",
		{ index = creep:entindex() }
	)

	if IsValid(self.caster.frenzy_shield) then
		self.caster.frenzy_shield:Destroy()
	end

	self.caster:AddNewModifier(
		self.caster,
		ability,
		"modifier_life_stealer_infest_custom",
		{ target = creep:entindex(), is_creep = true, is_legendary = true }
	)
	creep:StartGesture(ACT_DOTA_CAST_ABILITY_1)
end

function life_stealer_infest_custom_legendary:OnInventoryContentsChanged()
	if not self.caster:HasShard() then
		return
	end

	local mod = self.caster:FindModifierByName("modifier_life_stealer_infest_custom")
	if not mod or not mod.target or mod.is_legendary ~= 1 then
		return
	end

	local ability = mod.target:FindAbilityByName("life_stealer_unfettered_custom")
	if ability and ability:IsHidden() then
		ability:SetHidden(false)
	end
end

modifier_life_stealer_infest_custom_legendary_creep_active = class(mod_hidden)
function modifier_life_stealer_infest_custom_legendary_creep_active:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.caster.infest_creep = self.parent
	self.parent.infest_owner = self.caster
	self.caster:AddOrderFilter(self)
end

function modifier_life_stealer_infest_custom_legendary_creep_active:OnDestroy()
	self.caster.infest_creep = nil
	self.parent.infest_owner = nil
end

function modifier_life_stealer_infest_custom_legendary_creep_active:OrderFilter(params)
	if params.order_type ~= DOTA_UNIT_ORDER_ATTACK_TARGET and params.order_type ~= DOTA_UNIT_ORDER_MOVE_TO_TARGET then
		return
	end
	if params.target ~= self.parent then
		return
	end

	return false
end

modifier_life_stealer_infest_custom_legendary_creep = class(mod_hidden)
function modifier_life_stealer_infest_custom_legendary_creep:RemoveOnDeath()
	return false
end
function modifier_life_stealer_infest_custom_legendary_creep:GetEffectName()
	return "particles/units/heroes/hero_bloodseeker/bloodseeker_vision.vpcf"
end
function modifier_life_stealer_infest_custom_legendary_creep:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.unit_name = self.parent:GetUnitName()

	self.health = 1
	self.damage = 1
	self.mana = 1
	self.speed = 1
	self.armor = self.ability:GetSpecialValueFor("armor") / 100
	self.magic = self.ability:GetSpecialValueFor("magic")
	self.move = self.ability:GetSpecialValueFor("move")
	self.regen = self.ability:GetSpecialValueFor("regen")
	self.bva = 1.7

	if self.unit_name == "npc_lifestealer_infest_centaur" then
		self.health = self.health + self.ability:GetSpecialValueFor("centaur_health") / 100
		self.bva = self.ability:GetSpecialValueFor("centaur_bva")
	end

	if self.unit_name == "npc_lifestealer_infest_ursa" then
		self.bva = self.ability:GetSpecialValueFor("ursa_bva")
	end

	self.infest_ability = self.caster.infest_ability
	self.parent.infest_ability = self.infest_ability

	if not IsServer() then
		return
	end

	local dragon_passive = self.parent:FindAbilityByName("life_stealer_dragon_arcane_power")
	if dragon_passive then
		self.damage = self.damage * (1 + dragon_passive:GetSpecialValueFor("dragon_damage") / 100)
	end

	self.health_bonus = self.ability.talents.r2_health_creep

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_life_stealer_infest_custom_legendary_creep_status",
		{}
	)

	self.spell_damage = self.caster:GetSpellAmplification(false) * 100

	self.creep_health = math.max(1, (self.health + self.health_bonus) * self.caster:GetMaxHealth())
	self.creep_damage = self.damage * self.caster:GetAverageTrueAttackDamage(nil)
	self.creep_armor = self.armor * self.caster:GetPhysicalArmorValue(false)
	self.creep_speed = self.speed * self.caster:GetDisplayAttackSpeed()
	self.creep_mana = self.mana * self.caster:GetMaxMana()

	self.parent:SetBaseMaxHealth(self.creep_health)
	self.parent:SetMaxHealth(self.creep_health)
	self.parent:SetHealth(self.creep_health)

	self.parent:SetBaseDamageMin(self.creep_damage)
	self.parent:SetBaseDamageMax(self.creep_damage)

	self.parent:SetPhysicalArmorBaseValue(self.creep_armor)

	self.parent:SetBaseMoveSpeed(self.move)
	self.parent:SetBaseMagicalResistanceValue(self.magic)

	self.parent:AddProc(self, { land = true, any = true })
	self.parent:AddAttackCreateEvent(self, true)
	self.parent:AddOrderFilter(self)
	self.parent:AddLifesteal(self, {
		name = "modifier_lifestealer_wounds_2",
		type = 1,
		value = function()
			return self.ability.talents.w2_heal
		end,
	})

	self.interval = 1
	self:StartIntervalThink(0.1)
	self:SetHasCustomTransmitterData(true)
end

function modifier_life_stealer_infest_custom_legendary_creep:OrderFilter(params)
	return dota1x6:ControlledCreepOrderFilter(params, self.parent)
end

function modifier_life_stealer_infest_custom_legendary_creep:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.init then
		self.parent:SetMana(self.creep_mana)
		self.init = true
	end

	local should_refresh = false

	self.health_bonus = self.ability.talents.r2_health_creep
	self.spell_damage = self.caster:GetSpellAmplification(false) * 100

	local caster_health = math.max(1, self.caster:GetMaxHealth() * (self.health + self.health_bonus))
	local caster_mana = self.caster:GetMaxMana() * self.mana
	local caster_damage = self.damage * self.caster:GetAverageTrueAttackDamage(nil)
	local caster_armor = self.caster:GetPhysicalArmorValue(false) * self.armor
	local caster_speed = self.caster:GetDisplayAttackSpeed() * self.speed

	if caster_speed ~= self.creep_speed then
		self.creep_speed = caster_speed
		should_refresh = true
	end

	if caster_mana ~= self.creep_mana then
		self.creep_mana = caster_mana
		should_refresh = true
	end

	if caster_health ~= self.creep_health then
		self.creep_health = caster_health
		self.parent:SetBaseMaxHealth(self.creep_health)
		self.parent:SetMaxHealth(self.creep_health)
	end

	if caster_armor ~= self.creep_armor then
		self.creep_armor = caster_armor
		self.parent:SetPhysicalArmorBaseValue(self.creep_armor)
	end

	if caster_damage ~= self.creep_damage then
		self.creep_damage = caster_damage
		self.parent:SetBaseDamageMin(self.creep_damage)
		self.parent:SetBaseDamageMax(self.creep_damage)
	end

	if should_refresh then
		self:SendBuffRefreshToClients()
	end

	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_infest_custom_legendary_creep:AddCustomTransmitterData()
	return {
		creep_speed = self.creep_speed,
		creep_mana = self.creep_mana,
	}
end

function modifier_life_stealer_infest_custom_legendary_creep:HandleCustomTransmitterData(data)
	self.creep_speed = data.creep_speed
	self.creep_mana = data.creep_mana
end

function modifier_life_stealer_infest_custom_legendary_creep:AttackCreateEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	self.parent:EmitSound("Lifestealer." .. self.unit_name .. "_attack_start")
end

function modifier_life_stealer_infest_custom_legendary_creep:GetProcChance()
	return 100
end

function modifier_life_stealer_infest_custom_legendary_creep:AttackProc(params, name)
	params.target:EmitSound("Lifestealer." .. self.unit_name .. "_attack_end")
end

function modifier_life_stealer_infest_custom_legendary_creep:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_MANA_BONUS,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierPercentageManacostStacking()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_mana
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.r1_damage_creep
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierPercentageCooldown(params)
	return self.ability.talents.r3_cdr
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierManaBonus()
	return self.creep_mana
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierConstantManaRegen()
	return self.regen * self.parent:GetMaxMana() / 100
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierHealthRegenPercentage()
	return self.regen + self.ability.talents.r2_heal_creep
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierAttackSpeedBonus_Constant()
	return self.creep_speed - 100
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierSpellAmplify_Percentage()
	return self.spell_damage + self.ability.talents.r1_damage_creep
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierHealChange()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_heal_amp
end

function modifier_life_stealer_infest_custom_legendary_creep:GetModifierHPRegenAmplify_Percentage()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_heal_amp
end

modifier_life_stealer_infest_custom_legendary_creep_status = class(mod_hidden)
function modifier_life_stealer_infest_custom_legendary_creep_status:RemoveOnDeath()
	return false
end
function modifier_life_stealer_infest_custom_legendary_creep_status:GetStatusEffectName()
	return "particles/units/heroes/hero_pudge/pudge_fleshheap_status_effect.vpcf"
end
function modifier_life_stealer_infest_custom_legendary_creep_status:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end

modifier_life_stealer_infest_custom_legendary_pick_cd = class(mod_hidden)

modifier_life_stealer_infest_custom_legendary_autocast = class(mod_hidden)
function modifier_life_stealer_infest_custom_legendary_autocast:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local mod = self.parent:FindModifierByName("modifier_life_stealer_infest_custom_legendary_pick")
	if mod then
		mod:Destroy()
	else
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_life_stealer_infest_custom_legendary_pick", {})
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_life_stealer_infest_custom_legendary_pick_cd",
		{ duration = 0.5 }
	)

	self.ability:ToggleAutoCast()
	self:Destroy()
end

modifier_life_stealer_infest_custom_legendary_pick = class(mod_hidden)
function modifier_life_stealer_infest_custom_legendary_pick:OnCreated()
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.targets = {}
	table.insert(self.targets, "npc_lifestealer_infest_ursa")
	table.insert(self.targets, "npc_lifestealer_infest_centaur")
	table.insert(self.targets, "npc_lifestealer_infest_dragon")

	self.targets["lifestealer_legendary"] = 1

	EmitAnnouncerSoundForPlayer("Lifestealer.Infest_pick", self.parent:GetPlayerOwnerID())

	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_life_stealer_infest_custom_legendary_pick:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = {}

	for i, name in pairs(self.targets) do
		if type(i) == "number" then
			targets[i] =
				{ image = "file://{images}/custom_game/icons/mini/npc_dota_hero_life_stealer/" .. name .. ".png" }
		end
	end

	self.parent:UpdateUIpick({ mod = self, text = "#pa_pick_hero", targets = targets })
end

function modifier_life_stealer_infest_custom_legendary_pick:EndPick(pick)
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	if self.targets[pick] then
		EmitAnnouncerSoundForPlayer("Lc.Duel_target_end", self.parent:GetPlayerOwnerID())
		self.parent:RemoveModifierByName("modifier_life_stealer_infest_custom_legendary_saved")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_life_stealer_infest_custom_legendary_saved",
			{ name = self.targets[pick] }
		)
	end

	self:Destroy()
end

function modifier_life_stealer_infest_custom_legendary_pick:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIpick({ hide = 1 })
end

modifier_life_stealer_infest_custom_legendary_saved = class(mod_visible)
function modifier_life_stealer_infest_custom_legendary_saved:IsHidden()
	return self.parent:HasModifier("modifier_life_stealer_infest_custom")
end
function modifier_life_stealer_infest_custom_legendary_saved:RemoveOnDeath()
	return false
end
function modifier_life_stealer_infest_custom_legendary_saved:GetTexture()
	return "buffs/lifestealer/" .. self.name
end
function modifier_life_stealer_infest_custom_legendary_saved:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.name = table.name

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_life_stealer_infest_custom_legendary_pick_cd",
		{ duration = 0.5 }
	)
	self:SetHasCustomTransmitterData(true)
end

function modifier_life_stealer_infest_custom_legendary_saved:AddCustomTransmitterData()
	return {
		name = self.name,
	}
end

function modifier_life_stealer_infest_custom_legendary_saved:HandleCustomTransmitterData(data)
	self.name = data.name
end

modifier_life_stealer_infest_custom_legendary_bonus = class(mod_visible)
function modifier_life_stealer_infest_custom_legendary_bonus:GetTexture()
	return "buffs/lifestealer/infest_3"
end
function modifier_life_stealer_infest_custom_legendary_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max_creep
	self.bonus = self.ability.talents.r3_damage_creep

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_life_stealer_infest_custom_legendary_bonus:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if not self.effect_cast then
		self.effect_cast = self.parent:GenericParticle("particles/bloodseeker/bloodrage_stack_main.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
end