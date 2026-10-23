--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_transform",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_transform_aura",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_fear_thinker",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_ring",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_fear_cd",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_slow",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_tracker",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_legendary_stack",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_terrorblade_demon_zeal_custom_buff",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_perma",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_terror_meta_4"
)
LinkLuaModifier(
	"modifier_custom_terrorblade_metamorphosis_portrait",
	"abilities/terrorblade/custom_terrorblade_metamorphosis",
	LUA_MODIFIER_MOTION_NONE
)

custom_terrorblade_metamorphosis = class({})
custom_terrorblade_metamorphosis.talents = {}

function custom_terrorblade_metamorphosis:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis_transform.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis_base_attack.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items_fx/phylactery_target.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/phylactery.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/field_blink_start.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/blink_dagger_start.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/blink_dagger_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_scepter.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_vengeful/vengeful_swap_buff_overhead.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/eternal_shroud.vpcf", context)
	PrecacheResource("particle", "particles/models/heroes/terrorblade/demon_zeal.vpcf", context)
	PrecacheResource("particle", "particles/terrorblade/tb_aoe.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_manaburn.vpcf", context)

	PrecacheResource("model", "models/terrorblade_custom/demon.vmdl", context)

	PrecacheResource(
		"particle",
		"particles/terrorblade/terrorblade_ti9_immortal_metamorphosis_base_attack_1.vpcf",
		context
	)
	PrecacheResource("particle", "particles/terrorblade/terrorblade_metamorphosis_base_attack_1.vpcf", context)

	PrecacheResource("particle", "particles/terrorblade/meta_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/slark/essence_cleave.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_dd.vpcf", context)
end

function custom_terrorblade_metamorphosis:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_chance = 0,
			e1_crit = caster:GetTalentValue("modifier_terror_meta_1", "crit", true),
			e1_slow = caster:GetTalentValue("modifier_terror_meta_1", "slow", true),
			e1_duration = caster:GetTalentValue("modifier_terror_meta_1", "duration", true),

			has_e2 = 0,
			e2_cleave = 0,
			e2_radius = caster:GetTalentValue("modifier_terror_meta_2", "radius", true),
			e2_bonus = caster:GetTalentValue("modifier_terror_meta_2", "bonus", true),

			e3_cd = 0,
			e3_duration = 0,
			e3_max = 0,

			has_e4 = 0,
			e4_heal = 0,
			e4_damage = 0,
			e4_creeps = caster:GetTalentValue("modifier_terror_meta_4", "creeps", true),
			e4_max = caster:GetTalentValue("modifier_terror_meta_4", "max", true),

			has_e5 = 0,
			e5_move = caster:GetTalentValue("modifier_terror_meta_5", "move", true),
			e5_duration = caster:GetTalentValue("modifier_terror_meta_5", "duration", true),

			has_e6 = 0,
			e6_range = caster:GetTalentValue("modifier_terror_meta_6", "range", true),
			e6_cd = caster:GetTalentValue("modifier_terror_meta_6", "cd", true),
			e6_fear = caster:GetTalentValue("modifier_terror_meta_6", "fear", true),

			has_e7 = 0,
			e7_delay = caster:GetTalentValue("modifier_terror_meta_7", "delay", true),
			e7_max = caster:GetTalentValue("modifier_terror_meta_7", "max", true),
		}
	end

	if caster:HasTalent("modifier_terror_meta_1") then
		self.talents.has_e1 = 1
		self.talents.e1_chance = caster:GetTalentValue("modifier_terror_meta_1", "chance")
	end

	if caster:HasTalent("modifier_terror_meta_2") then
		self.talents.has_e2 = 1
		self.talents.e2_cleave = caster:GetTalentValue("modifier_terror_meta_2", "cleave") / 100
	end

	if caster:HasTalent("modifier_terror_meta_3") then
		self.talents.e3_cd = caster:GetTalentValue("modifier_terror_meta_3", "cd")
		self.talents.e3_duration = caster:GetTalentValue("modifier_terror_meta_3", "duration")
		self.talents.e3_max = caster:GetTalentValue("modifier_terror_meta_3", "max")
	end

	if caster:HasTalent("modifier_terror_meta_4") then
		self.talents.has_e4 = 1
		self.talents.e4_heal = caster:GetTalentValue("modifier_terror_meta_4", "heal") / 100
		self.talents.e4_damage = caster:GetTalentValue("modifier_terror_meta_4", "damage")
	end

	if caster:HasTalent("modifier_terror_meta_5") then
		self.talents.has_e5 = 1
	end

	if caster:HasTalent("modifier_terror_meta_6") then
		self.talents.has_e6 = 1
	end

	if caster:HasTalent("modifier_terror_meta_7") then
		self.talents.has_e7 = 1
		caster:AddAttackStartEvent_out(self.tracker, true)
		caster:AddOrderFilter(self.tracker)
	end

	if not IsServer() then
		return
	end

	local meta_mod = caster:FindModifierByName("modifier_custom_terrorblade_metamorphosis")
	if meta_mod then
		meta_mod:UpdateEvents()
	end
end

function custom_terrorblade_metamorphosis:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "terrorblade_metamorphosis", self)
end

function custom_terrorblade_metamorphosis:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_terrorblade_metamorphosis_tracker"
end

function custom_terrorblade_metamorphosis:GetManaCost(level)
	if self.talents.has_e7 == 1 then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function custom_terrorblade_metamorphosis:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_PASSIVE
	end
	local bonus = 0
	if self.talents.has_e5 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + bonus
end

function custom_terrorblade_metamorphosis:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e3_cd or 0)
end

function custom_terrorblade_metamorphosis:OnSpellStart()
	if self.talents.has_e7 == 1 then
		return
	end

	local delay = self.transformation_time
	if self.talents.has_e5 == 1 then
		self.caster:Purge(false, true, false, true, true)
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_debuff_immune",
			{ duration = self.talents.e5_duration + delay, effect = 1 }
		)
		self.caster:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf")
		self.caster:EmitSound("TB.Meta_stack")
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_terrorblade_metamorphosis_transform",
		{ duration = delay }
	)
end

function custom_terrorblade_metamorphosis:OnUpgrade()
	local mod = self.caster:FindModifierByName("modifier_custom_terrorblade_metamorphosis")
	if not mod then
		return
	end

	self.caster:AddNewModifier(self.caster, self, mod:GetName(), { duration = mod:GetRemainingTime() })
end

function custom_terrorblade_metamorphosis:CreateTalent()
	self.caster:RemoveModifierByName("modifier_custom_terrorblade_metamorphosis")
	self.caster:RemoveModifierByName("modifier_custom_terrorblade_metamorphosis_transform")
	self:EndCd(0)
	self.caster:AddNewModifier(self.caster, self, "modifier_custom_terrorblade_metamorphosis_legendary_stack", {})
	local ability = self.caster:FindAbilityByName("terrorblade_demon_zeal_custom")
	if not ability then
		return
	end

	ability:SetHidden(false)
	ability:SetActivated(false)
end

modifier_custom_terrorblade_metamorphosis_transform = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_transform:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.duration = self.ability.duration + self.ability.talents.e3_duration

	local slark_mod = self.parent:FindModifierByName("modifier_slark_essence_shift_custom_legendary_steal")
	if slark_mod then
		self.duration = slark_mod:GetRemainingTime()
	end

	if self.parent:IsIllusion() or self.ability.talents.has_e7 == 1 then
		self.duration = nil
	end

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_3)
	self.parent:EmitSound("Hero_Terrorblade.Metamorphosis")

	local transform_particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis_transform.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	if self.caster.current_model == "models/heroes/terrorblade/terrorblade_arcana.vmdl" then
		local color = self.caster:GetTerrorbladeColor()
		ParticleManager:SetParticleControl(transform_particle, 15, color)
		ParticleManager:SetParticleControl(transform_particle, 16, Vector(1, 0, 0))
	end
	ParticleManager:ReleaseParticleIndex(transform_particle)
end

function modifier_custom_terrorblade_metamorphosis_transform:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self:GetRemainingTime() > 0.1 then
		return
	end

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_custom_terrorblade_metamorphosis",
		{ duration = self.duration }
	)
end

function modifier_custom_terrorblade_metamorphosis_transform:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

modifier_custom_terrorblade_metamorphosis = class(mod_visible)
function modifier_custom_terrorblade_metamorphosis:GetPriority()
	return MODIFIER_PRIORITY_LOW
end
function modifier_custom_terrorblade_metamorphosis:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	if self.caster.owner then
		self.caster = self.caster.owner
	end

	self.parent:AddAttackRecordEvent_out(self)
	self.ability = self:GetAbility()

	self:UpdateEvents()

	self.RemoveForDuel = true

	self.heal_creeps = self.ability.talents.e4_creeps

	self.crit_damage = self.ability.talents.e1_crit

	if not IsServer() then
		return
	end

	self.parent:NoDraw(self, true)
	self.records = {}
	self.parent.meta_records = self.records

	if self.ability.talents.has_e1 == 1 then
		self.crit_next = RollPseudoRandomPercentage(self:GetCritChance(), 1608, self.parent)
	end

	if self.parent:IsRealHero() and self.ability.talents.has_e7 == 0 then
		self.ability:EndCd()
	end

	self.material_group = "default"

	self.particle_ally_fx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle_ally_fx, 0, self.parent:GetAbsOrigin())
	if self.caster.current_model == "models/heroes/terrorblade/terrorblade_arcana.vmdl" then
		self.material_group = tostring(self.parent:GetTerrorbladeNumber())
		local color = self.caster:GetTerrorbladeColor()
		ParticleManager:SetParticleControl(self.particle_ally_fx, 15, color)
		ParticleManager:SetParticleControl(self.particle_ally_fx, 16, Vector(1, 1, 1))
	end
	self:AddParticle(self.particle_ally_fx, false, false, -1, false, false)

	self.model = "models/terrorblade_custom/demon.vmdl"
	local new_model = wearables_system:GetUnitModelReplacement(self.caster, "terrorblade_form")
	if new_model and string.find(new_model, ".vmdl") then
		self.model = new_model
	end

	Timers:CreateTimer(0.1, function()
		self.parent:SetMaterialGroup(self.material_group)
	end)

	self.previous_attack_cability = self.parent:GetAttackCapability()
	if players[self.parent:GetId()] then
		self.previous_attack_cability = players[self.parent:GetId()].base_attack_type
	end

	self.parent:SetAttackCapability(DOTA_UNIT_CAP_RANGED_ATTACK)

	if self.parent:IsRealHero() then
		CustomGameEventManager:Send_ServerToAllClients("dota1x6_update_terrorblade_form", {})
	end

	if self.ability:IsStolen() then
		self:StartIntervalThink(0.1)
	end
end

function modifier_custom_terrorblade_metamorphosis:UpdateEvents()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_e1 == 1 then
		self.parent:AddRecordDestroyEvent(self, true)
	end

	if self.ability.talents.has_e4 == 0 then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end

	self.parent:AddDamageEvent_out(self, true)
end

function modifier_custom_terrorblade_metamorphosis:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.ability:IsHidden() then
		return
	end

	self:Destroy()
end

function modifier_custom_terrorblade_metamorphosis:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	if not self.records[params.record] then
		return
	end
	self.records[params.record] = nil
end

function modifier_custom_terrorblade_metamorphosis:AttackRecordEvent_out(params)
	local attacker = params.attacker
	if attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		return
	end

	self.parent:EmitSound("Hero_Terrorblade_Morphed.preAttack")
end

function modifier_custom_terrorblade_metamorphosis:CheckState()
	if not self.crit_next then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_custom_terrorblade_metamorphosis:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:EndNoDraw(self)

	if self.parent:IsRealHero() and self.ability.talents.has_e7 == 0 then
		self.ability:StartCd()
	end

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_3_END)
	self.parent:SetAttackCapability(self.previous_attack_cability)
	if not self.parent:IsRealHero() then
		return
	end

	CustomGameEventManager:Send_ServerToAllClients("dota1x6_update_terrorblade_form", {})
end

function modifier_custom_terrorblade_metamorphosis:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end
	if not self.parent:CheckLifesteal(params, 2) then
		return
	end

	local heal = (1 - self.parent:GetHealthPercent() / 100) * self.ability.talents.e4_heal
	if params.unit:IsCreep() then
		heal = heal / self.heal_creeps
	end

	self.parent:GenericHeal(heal * params.damage, self.ability, true, "", "modifier_terror_meta_4")
end

function modifier_custom_terrorblade_metamorphosis:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_CHANGE,
		MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_terrorblade_metamorphosis:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_e5 == 0 then
		return
	end
	return self.ability.talents.e5_move
end

function modifier_custom_terrorblade_metamorphosis:GetCritChance()
	if self.ability.talents.has_e1 == 0 then
		return 0
	end
	return self.ability.talents.e1_chance
end

function modifier_custom_terrorblade_metamorphosis:GetCritDamage()
	if self.ability.talents.has_e1 == 0 then
		return
	end
	return self.crit_damage
end

function modifier_custom_terrorblade_metamorphosis:GetAccuracyChance()
	return self:GetCritChance()
end

function modifier_custom_terrorblade_metamorphosis:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e1 == 0 then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local crit = self.crit_next
	self.crit_next = RollPseudoRandomPercentage(self:GetCritChance(), 1608, self.parent)
	if not crit then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_custom_terrorblade_metamorphosis:GetModifierAttackRangeBonus()
	return self.ability.bonus_range
end

function modifier_custom_terrorblade_metamorphosis:GetModifierBaseAttack_BonusDamage()
	local bonus = 0
	if
		self.ability.talents.has_e4 == 1 and self.caster:HasModifier("modifier_custom_terrorblade_metamorphosis_perma")
	then
		bonus = self.caster:GetUpgradeStack("modifier_custom_terrorblade_metamorphosis_perma")
			* self.ability.talents.e4_damage
	end

	return self.ability.bonus_damage + bonus
end

function modifier_custom_terrorblade_metamorphosis:GetModifierModelScale()
	if self.model ~= "models/terrorblade_custom/terrorblade_ultimate_depravity_ability.vmdl" then
		return
	end
	return -10
end

function modifier_custom_terrorblade_metamorphosis:GetModifierProjectileName()
	local base_particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis_base_attack.vpcf",
		self
	)
	if self.caster.current_model == "models/heroes/terrorblade/terrorblade_arcana.vmdl" then
		local particle_name = "particles/terrorblade/terrorblade_metamorphosis_base_attack_"
		if
			base_particle
			== "particles/econ/items/terrorblade/terrorblade_ti9_immortal/terrorblade_ti9_immortal_metamorphosis_base_attack.vpcf"
		then
			particle_name = "particles/terrorblade/terrorblade_ti9_immortal_metamorphosis_base_attack_"
		end
		local id = self.caster:GetTerrorbladeNumber()
		if id then
			return particle_name .. id .. ".vpcf"
		end
		if
			base_particle
			== "particles/econ/items/terrorblade/terrorblade_ti9_immortal/terrorblade_ti9_immortal_metamorphosis_base_attack.vpcf"
		then
			return "particles/terrorblade/terrorblade_ti9_immortal_metamorphosis_base_attack_1.vpcf"
		end
		return "particles/terrorblade/terrorblade_metamorphosis_base_attack_1.vpcf"
	end
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_terrorblade/terrorblade_metamorphosis_base_attack.vpcf",
		self
	)
end

function modifier_custom_terrorblade_metamorphosis:GetModifierModelChange()
	return self.model or "models/terrorblade_custom/demon.vmdl"
end

function modifier_custom_terrorblade_metamorphosis:GetAttackSound()
	return "Hero_Terrorblade_Morphed.Attack"
end

modifier_custom_terrorblade_metamorphosis_tracker = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_tracker:IsAura()
	return self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis_transform")
		or self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis")
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetAuraEntityReject(hTarget)
	return not hTarget:IsIllusion()
		or not hTarget.owner
		or hTarget.owner ~= self.parent
		or hTarget:GetName() ~= self.parent:GetName()
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetAuraDuration()
	return 0.5
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetAuraRadius()
	return self.ability.metamorph_aura_tooltip
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_custom_terrorblade_metamorphosis_tracker:GetModifierAura()
	return "modifier_custom_terrorblade_metamorphosis_transform_aura"
end
function modifier_custom_terrorblade_metamorphosis_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	local zeal_ability = self.parent:FindAbilityByName("terrorblade_demon_zeal_custom")
	if zeal_ability then
		zeal_ability:UpdateTalents()
	end

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.transformation_time = self.ability:GetSpecialValueFor("transformation_time")
	self.ability.bonus_range = self.ability:GetSpecialValueFor("bonus_range")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.metamorph_aura_tooltip = self.ability:GetSpecialValueFor("metamorph_aura_tooltip")

	self.visual_max = 5

	self.parent:AddAttackEvent_out(self, true)

	if not IsServer() then
		return
	end
	self.player = PlayerResource:GetPlayer(self.parent:GetPlayerID())
	self:StartIntervalThink(1)
end

function modifier_custom_terrorblade_metamorphosis_tracker:OnRefresh()
	self.ability.bonus_range = self.ability:GetSpecialValueFor("bonus_range")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
end

function modifier_custom_terrorblade_metamorphosis_tracker:OrderFilter(params)
	if not params.ability then
		return
	end
	if params.ability:GetName() ~= "terrorblade_demon_zeal_custom" then
		return
	end
	if self.ability.talents.has_e5 == 1 then
		return
	end
	if not self.parent:IsStunned() and self.parent:GetForceAttackTarget() == nil then
		return
	end

	return false
end

function modifier_custom_terrorblade_metamorphosis_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ABSORB_SPELL,
	}
end

function modifier_custom_terrorblade_metamorphosis_tracker:GetAbsorbSpell(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e6 == 0 then
		return
	end
	if not self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis") then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not params.ability then
		return
	end

	local caster = params.ability:GetCaster()
	if not caster then
		return
	end
	if caster:HasModifier("modifier_custom_terrorblade_metamorphosis_fear_cd") then
		return
	end
	if caster:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if (caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.ability.talents.e6_range then
		return
	end

	local particle_2 =
		ParticleManager:CreateParticle("particles/items_fx/phylactery.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle_2,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle_2,
		1,
		caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle_2)

	caster:EmitSound("Generic.Fear")

	caster:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_nevermore_requiem_fear",
		{ duration = self.ability.talents.e6_fear * (1 - caster:GetStatusResistance()) }
	)
	caster:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_terrorblade_metamorphosis_fear_cd",
		{ duration = self.ability.talents.e6_cd }
	)
	return false
end

function modifier_custom_terrorblade_metamorphosis_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_e7 == 1 then
		if
			self.ability:IsFullyCastable()
			and self.parent:IsAlive()
			and not self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis_transform")
			and not self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis")
		then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_custom_terrorblade_metamorphosis_transform",
				{ duration = self.ability.transformation_time }
			)
		end

		self:UpdateUI()

		self:StartIntervalThink(0.2)
	else
		if
			not self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis") and not self.ability:IsActivated()
		then
			self.ability:StartCd()
		end
	end
end

function modifier_custom_terrorblade_metamorphosis_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	local stack_mod = self.parent:FindModifierByName("modifier_custom_terrorblade_metamorphosis_legendary_stack")

	if not stack_mod then
		return
	end

	local has_meta = self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis")
	local mod = self.parent:FindModifierByName("modifier_terrorblade_demon_zeal_custom_buff")
	local stack = stack_mod:GetStackCount()
	local active = 0
	local max = stack_mod:GetMax()
	local zero = nil
	local no_min = nil

	if has_meta then
		no_min = 1
	end

	if mod then
		active = 1
		stack = mod:GetRemainingTime()
		zero = 1
	end

	if mod or not has_meta then
		if self.particle then
			ParticleManager:DestroyParticle(self.particle, true)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
	else
		if not self.particle then
			self.particle = ParticleManager:CreateParticleForPlayer(
				"particles/terrorblade/meta_legendary_stack.vpcf",
				PATTACH_OVERHEAD_FOLLOW,
				self.parent,
				self.player
			)
			self:AddParticle(self.particle, false, false, -1, false, false)
		end

		for i = 1, self.visual_max do
			if i <= math.floor(stack / (max / self.visual_max)) then
				ParticleManager:SetParticleControl(self.particle, i, Vector(1, 0, 0))
			else
				ParticleManager:SetParticleControl(self.particle, i, Vector(0, 0, 0))
			end
		end
	end

	self.parent:UpdateUIlong({
		max = max,
		stack = stack,
		use_zero = zero,
		active = active,
		no_min = no_min,
		style = "TbMeta",
	})
end

function modifier_custom_terrorblade_metamorphosis_tracker:AttackStartEvent_out(params)
	local attacker = params.attacker
	if attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		return
	end
	if not attacker:HasModifier("modifier_custom_terrorblade_metamorphosis") then
		return
	end

	if self.ability.talents.has_e7 == 0 then
		return
	end
	if attacker ~= self.parent then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_custom_terrorblade_metamorphosis_legendary_stack")
	if not mod then
		return
	end

	mod:AddStack(params.target)
	self:UpdateUI()
end

function modifier_custom_terrorblade_metamorphosis_tracker:AttackEvent_out(params)
	if not IsServer() then
		return
	end
	if params.attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		return
	end

	local attacker = params.attacker
	local attacker_owner = attacker
	if attacker.owner then
		attacker_owner = attacker.owner
	end

	if attacker_owner ~= self.parent then
		return
	end

	local target = params.target
	local mod = attacker:FindModifierByName("modifier_custom_terrorblade_metamorphosis")
	local records = mod and mod.records or attacker.meta_records

	if mod then
		target:EmitSound("Hero_Terrorblade_Morphed.projectileImpact")
	end

	if not target:IsUnit() then
		return
	end

	if records and records[params.record] then
		EmitSoundOnLocationWithCaster(target:GetAbsOrigin(), "TB.Meta_crit", target)
		if attacker == self.parent then
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_custom_terrorblade_metamorphosis_slow",
				{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e1_duration }
			)
		end
	end

	if not mod then
		attacker.meta_records = nil
	end

	if attacker ~= self.parent then
		return
	end

	if mod and target:IsRealHero() then
		attacker:AddNewModifier(self.parent, self.ability, "modifier_custom_terrorblade_metamorphosis_perma", {})
	end

	if self.ability.talents.has_e2 == 0 then
		return
	end

	local damage = params.damage * self.ability.talents.e2_cleave

	if mod then
		damage = damage * self.ability.talents.e2_bonus

		local effect_cast =
			ParticleManager:CreateParticle("particles/terrorblade/tb_aoe.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
		ParticleManager:SetParticleControl(effect_cast, 0, target:GetAbsOrigin())
		ParticleManager:SetParticleControl(effect_cast, 1, target:GetAbsOrigin())
		ParticleManager:DestroyParticle(effect_cast, false)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		for _, aoe_target in pairs(self.parent:FindTargets(self.ability.talents.e2_radius, target:GetAbsOrigin())) do
			if target ~= aoe_target then
				DoDamage({
					victim = aoe_target,
					attacker = self.parent,
					damage = damage,
					ability = self.ability,
					damage_type = DAMAGE_TYPE_PHYSICAL,
					damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
				})
			end
		end
	else
		DoCleaveAttack(self.parent, target, self.ability, damage, 150, 360, 650, "particles/slark/essence_cleave.vpcf")
	end
end

modifier_custom_terrorblade_metamorphosis_transform_aura = class({})
function modifier_custom_terrorblade_metamorphosis_transform_aura:IsHidden()
	return true
end
function modifier_custom_terrorblade_metamorphosis_transform_aura:OnCreated()
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_custom_terrorblade_metamorphosis_transform",
		{ duration = self.ability.transformation_time }
	)
end

function modifier_custom_terrorblade_metamorphosis_transform_aura:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent or self.parent:IsNull() then
		return
	end

	self.parent:RemoveModifierByName("modifier_custom_terrorblade_metamorphosis_transform")
	self.parent:RemoveModifierByName("modifier_custom_terrorblade_metamorphosis")
end

modifier_custom_terrorblade_metamorphosis_perma = class(mod_visible)
function modifier_custom_terrorblade_metamorphosis_perma:IsHidden()
	return self.ability.talents.has_e4 ~= 1
end
function modifier_custom_terrorblade_metamorphosis_perma:RemoveOnDeath()
	return false
end
function modifier_custom_terrorblade_metamorphosis_perma:GetTexture()
	return "buffs/souls_tempo"
end
function modifier_custom_terrorblade_metamorphosis_perma:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.e4_max

	if not IsServer() then
		return
	end
	self:SetStackCount(1)
	self:StartIntervalThink(0.5)
end

function modifier_custom_terrorblade_metamorphosis_perma:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
end

function modifier_custom_terrorblade_metamorphosis_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end
	if self.ability.talents.has_e4 == 0 then
		return
	end

	self.parent:GenericParticle("particles/enigma/summon_perma.vpcf")

	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

modifier_custom_terrorblade_metamorphosis_fear_cd = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_fear_cd:RemoveOnDeath()
	return false
end

modifier_custom_terrorblade_metamorphosis_slow = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_slow:IsPurgable()
	return true
end
function modifier_custom_terrorblade_metamorphosis_slow:GetEffectName()
	return "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf"
end
function modifier_custom_terrorblade_metamorphosis_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.e1_slow
end

function modifier_custom_terrorblade_metamorphosis_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_custom_terrorblade_metamorphosis_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_custom_terrorblade_metamorphosis_legendary_stack = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_legendary_stack:RemoveOnDeath()
	return false
end
function modifier_custom_terrorblade_metamorphosis_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.e7_max
	self.delay = self.ability.talents.e7_delay

	self.interval = 0.2

	if not IsServer() then
		return
	end
	self:SetStackCount(0)
end

function modifier_custom_terrorblade_metamorphosis_legendary_stack:GetMax()
	return self.max + self.ability.talents.e3_max
end

function modifier_custom_terrorblade_metamorphosis_legendary_stack:AddStack(target)
	if not IsServer() then
		return
	end
	if self.parent:HasModifier("modifier_terrorblade_demon_zeal_custom_buff") then
		return
	end
	if self:GetStackCount() >= self:GetMax() then
		return
	end

	if target:IsHero() then
		self:IncrementStackCount()
	end

	if self:GetStackCount() >= self:GetMax() then
		self.ability:StartCd()
		self.parent:RemoveModifierByName("modifier_custom_terrorblade_metamorphosis")
		self.parent:RemoveModifierByName("modifier_custom_terrorblade_metamorphosis_transform")
		self:SetStackCount(0)
	end

	self:StartIntervalThink(self.delay)
end

function modifier_custom_terrorblade_metamorphosis_legendary_stack:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self:GetStackCount() > 0 then
		self:DecrementStackCount()
	end

	self:StartIntervalThink(self.interval)
end

function modifier_custom_terrorblade_metamorphosis_legendary_stack:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	local ability = self.parent:FindAbilityByName("terrorblade_demon_zeal_custom")
	if not ability then
		return
	end
	ability:SetActivated(self:GetStackCount() > 0)
end

modifier_custom_terrorblade_metamorphosis_portrait = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_portrait:GetEffectName()
	return "particles/ogre_magi/ogre_dd.vpcf"
end

terrorblade_demon_zeal_custom = class({})
terrorblade_demon_zeal_custom.talents = {}

function terrorblade_demon_zeal_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "terrorblade_demon_zeal", self)
end

function terrorblade_demon_zeal_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/models/heroes/terrorblade/demon_zeal.vpcf", context)
end

function terrorblade_demon_zeal_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e3_cd = 0,

			has_e5 = 0,
			e5_duration = caster:GetTalentValue("modifier_terror_meta_5", "duration", true),

			has_e7 = 0,
			e7_cd = caster:GetTalentValue("modifier_terror_meta_7", "cd", true),
			e7_duration = caster:GetTalentValue("modifier_terror_meta_7", "duration", true),
			e7_bva = caster:GetTalentValue("modifier_terror_meta_7", "bva", true),
		}
	end

	if caster:HasTalent("modifier_terror_meta_3") then
		self.talents.e3_cd = caster:GetTalentValue("modifier_terror_meta_3", "cd")
	end

	if caster:HasTalent("modifier_terror_meta_5") then
		self.talents.has_e5 = 1
	end

	if caster:HasTalent("modifier_terror_meta_7") then
		self.talents.has_e7 = 1
	end
end

function terrorblade_demon_zeal_custom:GetCooldown()
	return (self.talents.has_e7 == 1 and self.talents.e7_cd or 0) + (self.talents.e3_cd or 0)
end

function terrorblade_demon_zeal_custom:OnAbilityPhaseStart()
	local mod = self.caster:FindModifierByName("modifier_custom_terrorblade_metamorphosis_legendary_stack")
	return self.caster:HasModifier("modifier_custom_terrorblade_metamorphosis") and mod and mod:GetStackCount() > 0
end

function terrorblade_demon_zeal_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_custom_terrorblade_metamorphosis_legendary_stack")

	if not mod or mod:GetStackCount() <= 0 then
		return
	end

	if self.talents.has_e5 == 1 then
		self.caster:Purge(false, true, false, true, true)
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_debuff_immune",
			{ duration = self.talents.e5_duration, effect = 1 }
		)
		self.caster:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf")
	end

	local duration = mod:GetStackCount() * self.talents.e7_duration
	mod:SetStackCount(0)

	self.caster:EmitSound("Hero_Terrorblade.DemonZeal.Cast")
	self.caster:EmitSound("TB.Meta_stack")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_terrorblade_demon_zeal_custom_buff",
		{ duration = duration }
	)
end

modifier_terrorblade_demon_zeal_custom_buff = class(mod_hidden)
function modifier_terrorblade_demon_zeal_custom_buff:GetStatusEffectName()
	return "particles/status_fx/status_effect_dark_willow_shadow_realm.vpcf"
end
function modifier_terrorblade_demon_zeal_custom_buff:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_terrorblade_demon_zeal_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.ability.talents.e7_bva
	if not IsServer() then
		return
	end
	self.ability:EndCd()
	self.RemoveForDuel = true

	self.pfx = ParticleManager:CreateParticle(
		"particles/models/heroes/terrorblade/demon_zeal.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.pfx,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	if self.parent.current_model == "models/heroes/terrorblade/terrorblade_arcana.vmdl" then
		local color = self.parent:GetTerrorbladeColor()
		ParticleManager:SetParticleControl(self.pfx, 15, color)
		ParticleManager:SetParticleControl(self.pfx, 16, Vector(1, 0, 0))
	end
	self:AddParticle(self.pfx, false, false, -1, false, false)
end

function modifier_terrorblade_demon_zeal_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:UseResources(false, false, false, true)
end

function modifier_terrorblade_demon_zeal_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_terrorblade_demon_zeal_custom_buff:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_terrorblade_demon_zeal_custom_buff:GetModifierModelScale()
	return 20
end

custom_terrorblade_terror_wave = class({})

function custom_terrorblade_terror_wave:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self:GetCaster(), "terrorblade_terror_wave", self)
end

function custom_terrorblade_terror_wave:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.fear_duration = self:GetLevelSpecialValueFor("fear_duration", 1)
	self.scepter_radius = self:GetLevelSpecialValueFor("scepter_radius", 1)
	self.scepter_speed = self:GetLevelSpecialValueFor("scepter_speed", 1)
	self.scepter_spawn_delay = self:GetLevelSpecialValueFor("scepter_spawn_delay", 1)
	self.range = self:GetLevelSpecialValueFor("range", 1)
	self.radius = self:GetLevelSpecialValueFor("radius", 1)
	self.blink_radius = self:GetLevelSpecialValueFor("blink_radius", 1)
	self.damage = self:GetLevelSpecialValueFor("damage", 1)
end

function custom_terrorblade_terror_wave:GetCastRange(vLocation, hTarget)
	if IsClient() then
		return self.range or 0
	end
	return 99999
end

function custom_terrorblade_terror_wave:OnSpellStart(table)
	local point = self:GetCursorPosition()

	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	local vec = (point - self.caster:GetAbsOrigin())
	local max_range = self.range + self.caster:GetCastRangeBonus()
	local delay = self.scepter_spawn_delay

	if vec:Length2D() > max_range then
		point = self.caster:GetAbsOrigin() + vec:Normalized() * max_range
	end

	local units = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		self.caster:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_FRIENDLY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO
			+ DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED
			+ DOTA_UNIT_TARGET_FLAG_INVULNERABLE,
		FIND_ANY_ORDER,
		false
	)

	for _, unit in pairs(units) do
		if
			unit == self.caster
			or (unit.owner and unit.owner == self.caster and unit:IsIllusion())
				and not unit:HasModifier("modifier_custom_terrorblade_reflection_unit")
		then
			unit:AddNewModifier(
				self.caster,
				self,
				"modifier_custom_terrorblade_metamorphosis_fear_thinker",
				{ x = point.x, y = point.y, duration = delay }
			)
		end
	end
end

modifier_custom_terrorblade_metamorphosis_fear_thinker = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_fear_thinker:OnCreated(params)
	if not IsServer() then
		return
	end

	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.scepter_radius
	self.speed = self.ability.scepter_speed
	self.blink_radius = self.ability.blink_radius

	local start_point = self.parent:GetAbsOrigin()

	ProjectileManager:ProjectileDodge(self.parent)

	EmitSoundOnLocationWithCaster(start_point, "Hero_Antimage.Blink_out", self.parent)

	local effect =
		ParticleManager:CreateParticle("particles/arc_warden/field_blink_start.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, start_point)
	ParticleManager:ReleaseParticleIndex(effect)

	local effect2 =
		ParticleManager:CreateParticle("particles/items_fx/blink_dagger_start.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect2, 0, start_point)
	ParticleManager:ReleaseParticleIndex(effect2)

	self.parent:NoDraw(self)

	self.parent:AddNoDraw()
	self.point = GetGroundPosition(Vector(params.x, params.y, 0), nil)
	local vec = (self.point - self.parent:GetAbsOrigin()):Normalized()
	vec.z = 0
	self.parent:SetForwardVector(vec)
	self.parent:FaceTowards(self.point)
end

function modifier_custom_terrorblade_metamorphosis_fear_thinker:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:RemoveNoDraw()
	self.parent:Stop()

	local final_point = self.point + RandomVector(self.blink_radius)

	local effect = ParticleManager:CreateParticle("particles/items_fx/blink_dagger_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, final_point + Vector(0, 0, 100))
	ParticleManager:ReleaseParticleIndex(effect)

	self.parent:SetAbsOrigin(final_point)
	FindClearSpaceForUnit(self.parent, final_point, true)

	if self.caster ~= self.parent then
		return
	end

	self.caster:EmitSound("Hero_Terrorblade.Metamorphosis.Scepter")
	self.caster:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_terrorblade_metamorphosis_ring",
		{ duration = self.radius / self.speed }
	)
end

function modifier_custom_terrorblade_metamorphosis_fear_thinker:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

modifier_custom_terrorblade_metamorphosis_ring = class(mod_hidden)
function modifier_custom_terrorblade_metamorphosis_ring:RemoveOnDeath()
	return false
end
function modifier_custom_terrorblade_metamorphosis_ring:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_custom_terrorblade_metamorphosis_ring:OnCreated(kv)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.fear_duration = self.ability.fear_duration
	self.radius = self.ability.scepter_radius
	self.speed = self.ability.scepter_speed
	self.damage = self.ability.damage

	self.effect_cast = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_terrorblade/terrorblade_scepter.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(self.speed, self.speed, self.speed))

	if self.parent.current_model == "models/heroes/terrorblade/terrorblade_arcana.vmdl" then
		local color = self.parent:GetTerrorbladeColor()
		ParticleManager:SetParticleControl(self.effect_cast, 15, color)
		ParticleManager:SetParticleControl(self.effect_cast, 16, Vector(1, 0, 0))
	end

	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self.origin = self.parent:GetAbsOrigin()

	self.start_radius = 0
	self.end_radius = self.radius
	self.width = 100

	self.targets = {}

	self:StartIntervalThink(0.03)
	self:OnIntervalThink()
end

function modifier_custom_terrorblade_metamorphosis_ring:OnIntervalThink()
	local radius = self.start_radius + self.speed * self:GetElapsedTime()
	if radius > self.end_radius then
		self:Destroy()
		return
	end

	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.origin,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		0,
		0,
		false
	)

	for _, target in pairs(targets) do
		if not self.targets[target] and (target:GetOrigin() - self.origin):Length2D() > (radius - self.width) then
			self.targets[target] = true
			target:EmitSound("Sf.Aura_Fear")
			target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_terrorblade_fear",
				{ duration = self.fear_duration * (1 - target:GetStatusResistance()) }
			)
			DoDamage({
				victim = target,
				attacker = self.parent,
				ability = self.ability,
				damage = self.damage,
				damage_type = DAMAGE_TYPE_MAGICAL,
			})
		end
	end
end