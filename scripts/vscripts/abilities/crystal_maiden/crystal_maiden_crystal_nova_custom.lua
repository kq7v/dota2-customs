--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_custom",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_legendary",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_legendary_visual",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_legendary_aura",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_maiden_crystal_7"
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_legendary_slide",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_tracker",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_stun",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_maiden_crystal_4"
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_stun_cd",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_crystal_nova_invun",
	"abilities/crystal_maiden/crystal_maiden_crystal_nova_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_maiden_hero_4"
)

crystal_maiden_crystal_nova_custom = class({})
crystal_maiden_crystal_nova_custom.talents = {}

function crystal_maiden_crystal_nova_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_crystalmaiden/maiden_crystal_nova.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_ice_rink.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_rink_glow.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/drow/drow_arcana/drow_arcana_rare_run_slide.vpcf", context)

	dota1x6:PrecacheShopItems("npc_dota_hero_crystal_maiden", context)
end

function crystal_maiden_crystal_nova_custom:UpdateTalents()
	local caster = self:GetCaster()

	if not self.init then
		self.init = true
		self.talents = {
			q1_damage = 0,
			q1_speed = 0,

			q2_cd = 0,

			h1_move_speed = 0,
			h1_cast_range = 0,

			has_q3 = 0,
			q3_damage = 0,
			q3_heal = 0,
			q3_chance = caster:GetTalentValue("modifier_maiden_crystal_3", "chance", true),
			q3_radius = caster:GetTalentValue("modifier_maiden_crystal_3", "radius", true),
			q3_duration = caster:GetTalentValue("modifier_maiden_crystal_3", "duration", true),

			has_q4 = 0,
			q4_cast = caster:GetTalentValue("modifier_maiden_crystal_4", "cast", true),
			q4_stun = caster:GetTalentValue("modifier_maiden_crystal_4", "stun", true),
			q4_talent_cd = caster:GetTalentValue("modifier_maiden_crystal_4", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_maiden_crystal_1") then
		self.talents.q1_damage = caster:GetTalentValue("modifier_maiden_crystal_1", "damage") / 100
		self.talents.q1_speed = caster:GetTalentValue("modifier_maiden_crystal_1", "speed")
	end

	if caster:HasTalent("modifier_maiden_crystal_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_maiden_crystal_2", "cd")
	end

	if caster:HasTalent("modifier_maiden_hero_1") then
		self.talents.h1_move_speed = caster:GetTalentValue("modifier_maiden_hero_1", "move_speed")
		self.talents.h1_cast_range = caster:GetTalentValue("modifier_maiden_hero_1", "cast_range")
	end

	if caster:HasTalent("modifier_maiden_crystal_3") then
		self.talents.has_q3 = 1
		self.talents.q3_damage = caster:GetTalentValue("modifier_maiden_crystal_3", "damage") / 100
		self.talents.q3_heal = caster:GetTalentValue("modifier_maiden_crystal_3", "heal") / 100
		caster:AddProc(self.tracker, { land = true })
		caster:AddLifesteal(self.tracker, {
			name = "modifier_maiden_crystal_3",
			value = function(params)
				if params.inflictor and params.inflictor ~= self then
					return 0
				end
				return self.talents.q3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_maiden_crystal_4") then
		self.talents.has_q4 = 1
	end
end

function crystal_maiden_crystal_nova_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "crystal_maiden_crystal_nova", self)
end

function crystal_maiden_crystal_nova_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_crystal_maiden_crystal_nova_tracker"
end

function crystal_maiden_crystal_nova_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end

function crystal_maiden_crystal_nova_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0)
end

function crystal_maiden_crystal_nova_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_q4 == 1 and self.talents.q4_cast or 0)
end

function crystal_maiden_crystal_nova_custom:GetRadius()
	return self.radius or 0
end

function crystal_maiden_crystal_nova_custom:GetAOERadius()
	return self:GetRadius()
end

function crystal_maiden_crystal_nova_custom:OnSpellStart(new_target, single_target)
	local point = self:GetCursorPosition()
	local damage_ability = nil
	local radius = self:GetRadius()
	local damage = self.nova_damage + self.caster:GetIntellect(false) * self.talents.q1_damage
	local duration = self.duration

	if new_target then
		damage_ability = "modifier_maiden_crystal_3"
		point = new_target:GetAbsOrigin()
		radius = self.talents.q3_radius
		duration = self.talents.q3_duration
		damage = damage * self.talents.q3_damage
	else
		AddFOWViewer(self.caster:GetTeamNumber(), point, 900, self.vision_duration, true)
	end

	local targets = self.caster:FindTargets(radius, point)
	if not new_target and IsValid(self.caster.arcane_aura_ability) then
		self.caster.arcane_aura_ability:SearchClones(radius, point)
	end

	local stunned = false
	local damageTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	local attacked_targets = {}

	for _, enemy in pairs(targets) do
		if not attacked_targets[enemy] and (not single_target or not new_target or enemy == new_target) then
			damageTable.victim = enemy
			attacked_targets[enemy] = true

			damageTable.damage = damage

			if
				self.talents.has_q4 == 1
				and not enemy:HasModifier("modifier_crystal_maiden_crystal_nova_stun_cd")
				and not enemy:IsDebuffImmune()
				and not new_target
			then
				stunned = true
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_crystal_maiden_crystal_nova_stun",
					{ duration = (1 - enemy:GetStatusResistance()) * self.talents.q4_stun }
				)
				enemy:AddNewModifier(
					self.caster,
					self,
					"modifier_crystal_maiden_crystal_nova_stun_cd",
					{ duration = self.talents.q4_talent_cd }
				)
			end

			DoDamage(damageTable, damage_ability)
			enemy:AddNewModifier(
				self.caster,
				self,
				"modifier_crystal_maiden_crystal_nova_custom",
				{ duration = duration }
			)
		end
	end

	if stunned == true then
		EmitSoundOnLocationWithCaster(point, "Maiden.Frostbite_stun", self.caster)
	end

	local particle_cast = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_crystalmaiden/maiden_crystal_nova.vpcf",
		self
	)
	local sound_cast = wearables_system:GetSoundReplacement(self.caster, "Hero_Crystal.CrystalNova", self)
	local speed = new_target and 200 or 1000

	if new_target then
		particle_cast = "particles/units/heroes/hero_crystalmaiden/maiden_crystal_nova.vpcf"
		sound_cast = "Hero_Crystal.CrystalNova"
	end

	local effect_cast = ParticleManager:CreateParticle(particle_cast, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_cast, 0, point)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(radius, 2, speed))

	Timers:CreateTimer(2, function()
		ParticleManager:DestroyParticle(effect_cast, false)
		ParticleManager:ReleaseParticleIndex(effect_cast)
	end)

	EmitSoundOnLocationWithCaster(point, sound_cast, self.caster)
end

modifier_crystal_maiden_crystal_nova_tracker = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("crystal_maiden_crystal_nova_custom_legendary")
	if IsValid(self.legendary_ability) then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.movespeed_slow = self.ability:GetSpecialValueFor("movespeed_slow")
	self.ability.attackspeed_slow = self.ability:GetSpecialValueFor("attackspeed_slow")
	self.ability.nova_damage = self.ability:GetSpecialValueFor("nova_damage")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.vision_duration = self.ability:GetSpecialValueFor("vision_duration")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_crystal_maiden_crystal_nova_tracker:OnRefresh()
	self.ability.movespeed_slow = self.ability:GetSpecialValueFor("movespeed_slow")
	self.ability.attackspeed_slow = self.ability:GetSpecialValueFor("attackspeed_slow")
	self.ability.nova_damage = self.ability:GetSpecialValueFor("nova_damage")
end

function modifier_crystal_maiden_crystal_nova_tracker:GetProcChance()
	return self.ability.talents.q3_chance
end

function modifier_crystal_maiden_crystal_nova_tracker:AttackProc(params)
	self.ability:OnSpellStart(params.target, params.no_attack_cooldown)
end

function modifier_crystal_maiden_crystal_nova_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_crystal_maiden_crystal_nova_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.q1_speed
end

function modifier_crystal_maiden_crystal_nova_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_cast_range
end

function modifier_crystal_maiden_crystal_nova_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h1_move_speed
end

modifier_crystal_maiden_crystal_nova_custom = class(mod_visible)
function modifier_crystal_maiden_crystal_nova_custom:IsPurgable()
	return true
end
function modifier_crystal_maiden_crystal_nova_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_crystal_maiden_crystal_nova_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_crystal_maiden_crystal_nova_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.as_slow = self.ability.attackspeed_slow
	self.ms_slow = self.ability.movespeed_slow

	if not IsServer() then
		return
	end

	self.interval = 0.2
	if self.caster:GetQuest() == "Maiden.Quest_5" and self.parent:IsRealHero() and not self.caster:QuestCompleted() then
		self:StartIntervalThink(self.interval)
	end
end

function modifier_crystal_maiden_crystal_nova_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateQuest(self.interval)
end

function modifier_crystal_maiden_crystal_nova_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_crystal_maiden_crystal_nova_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.ms_slow
end

function modifier_crystal_maiden_crystal_nova_custom:GetModifierAttackSpeedBonus_Constant()
	return self.as_slow
end

modifier_crystal_maiden_crystal_nova_stun = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_stun:IsStunDebuff()
	return true
end
function modifier_crystal_maiden_crystal_nova_stun:IsPurgeException()
	return true
end
function modifier_crystal_maiden_crystal_nova_stun:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_crystal_maiden_crystal_nova_stun:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_crystal_maiden_crystal_nova_stun:CheckState()
	return {
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_STUNNED] = true,
	}
end

modifier_crystal_maiden_crystal_nova_stun_cd = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_stun_cd:RemoveOnDeath()
	return false
end
function modifier_crystal_maiden_crystal_nova_stun_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_crystal_maiden_crystal_nova_invun = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_invun:GetStatusEffectName()
	return "particles/econ/items/effigies/status_fx_effigies/status_effect_effigy_frosty_dire.vpcf"
end
function modifier_crystal_maiden_crystal_nova_invun:StatusEffectPriority()
	return MODIFIER_PRIORITY_SUPER_ULTRA
end
function modifier_crystal_maiden_crystal_nova_invun:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

crystal_maiden_crystal_nova_custom_legendary = class({})
crystal_maiden_crystal_nova_custom_legendary.talents = {}

function crystal_maiden_crystal_nova_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()

	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			q7_radius = caster:GetTalentValue("modifier_maiden_crystal_7", "radius", true),
			q7_duration = caster:GetTalentValue("modifier_maiden_crystal_7", "duration", true),
			q7_talent_cd = caster:GetTalentValue("modifier_maiden_crystal_7", "talent_cd", true),
			q7_attack_range = caster:GetTalentValue("modifier_maiden_crystal_7", "attack_range", true),
		}
	end

	if caster:HasTalent("modifier_maiden_crystal_7") then
		self.talents.has_q7 = 1
	end
end

function crystal_maiden_crystal_nova_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:UpdateTalents()
end

function crystal_maiden_crystal_nova_custom_legendary:GetAOERadius()
	return self.talents.has_q7 == 1 and self.talents.q7_radius or 0
end

function crystal_maiden_crystal_nova_custom_legendary:GetCooldown(iLevel)
	return self.talents.has_q7 == 1 and self.talents.q7_talent_cd or 0
end

function crystal_maiden_crystal_nova_custom_legendary:OnSpellStart()
	local point = self:GetCursorPosition()
	local duration = self.talents.q7_duration

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_crystal_maiden_crystal_nova_legendary",
		{ duration = duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_crystal_maiden_crystal_nova_legendary_slide",
		{ duration = duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
	self.caster:EmitSound("Maiden.Crystal_rink_cast")
end

modifier_crystal_maiden_crystal_nova_legendary = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_legendary:IsAura()
	return true
end
function modifier_crystal_maiden_crystal_nova_legendary:GetAuraDuration()
	return 0
end
function modifier_crystal_maiden_crystal_nova_legendary:GetAuraRadius()
	return self.radius
end
function modifier_crystal_maiden_crystal_nova_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_crystal_maiden_crystal_nova_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_crystal_maiden_crystal_nova_legendary:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_crystal_maiden_crystal_nova_legendary:GetModifierAura()
	return "modifier_crystal_maiden_crystal_nova_legendary_aura"
end
function modifier_crystal_maiden_crystal_nova_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.ability:EndCd()

	self.radius = self.ability.talents.q7_radius
	self.duration = self.ability.talents.q7_duration

	self.parent:EmitSound("Maiden.Crystal_rink_loop")
	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), self.radius, self:GetRemainingTime(), false)

	self.effect_cast =
		ParticleManager:CreateParticle("particles/crystal_maiden/maiden_ice_rink.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.effect_cast, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(
		self.effect_cast,
		1,
		Vector(self.radius * 1.05, self.radius * 1.05, self.radius * 1.05)
	)
	ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self.duration, 0, 0))
	self:AddParticle(self.effect_cast, false, false, -1, false, false)

	self.particle =
		ParticleManager:CreateParticle("particles/crystal_maiden/maiden_rink_glow.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.duration + 0.5, self.radius, 0))
	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_crystal_maiden_crystal_nova_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:StopSound("Maiden.Crystal_rink_loop")
	self.parent:EmitSound("Lich.Spire_destroy")
end

function modifier_crystal_maiden_crystal_nova_legendary:GetAuraEntityReject(hEntity)
	if hEntity:IsFieldInvun(self.caster) then
		return true
	end
	if hEntity:IsInvulnerable() and hEntity ~= self.caster then
		return true
	end
	return not hEntity:IsUnit() or (hEntity:GetTeamNumber() == self.caster:GetTeamNumber() and hEntity ~= self.caster)
end

modifier_crystal_maiden_crystal_nova_legendary_aura = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_legendary_aura:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.attack_range = self.ability.talents.q7_attack_range
	self.parent:MoveToPosition(self.parent:GetAbsOrigin() + self.parent:GetForwardVector())

	self.parent:RemoveModifierByName("modifier_crystal_maiden_crystal_nova_legendary_visual")
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_crystal_maiden_crystal_nova_legendary_visual",
		{ duration = 2 }
	)

	if self.caster ~= self.parent then
		return
	end
	self:StartIntervalThink(0.1)
end

function modifier_crystal_maiden_crystal_nova_legendary_aura:OnIntervalThink()
	if not IsServer() then
		return
	end

	local radius = self.parent:Script_GetAttackRange() + self.attack_range
	local targets = self.caster:FindTargets(radius)
	local hit_type = 1
	for _, target in pairs(targets) do
		self.caster:PerformAttack(target, true, true, true, false, true, false, false)
		if target:IsRealHero() then
			hit_type = 2
		end
	end

	if #targets > 0 then
		local mod = self.parent:FindModifierByName("modifier_crystal_maiden_arcane_aura_custom_buff")
		if mod then
			mod:ReduceStack()
			mod:GetAbility():ProcEffects(hit_type)
		end
	end

	self:StartIntervalThink((1 / self.caster:GetAttacksPerSecond(true)))
end

function modifier_crystal_maiden_crystal_nova_legendary_aura:CheckState()
	if self.caster:GetTeamNumber() == self.parent:GetTeamNumber() then
		return {
			[MODIFIER_STATE_DISARMED] = true,
		}
	end
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_crystal_maiden_crystal_nova_legendary_visual = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_legendary_visual:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Maiden.Crystal_rink_slide")
	self.parent:GenericParticle("particles/econ/items/drow/drow_arcana/drow_arcana_rare_run_slide.vpcf")
end

function modifier_crystal_maiden_crystal_nova_legendary_visual:OnDestroy()
	if not IsServer() then
		return
	end

	if self.parent:HasModifier("modifier_crystal_maiden_crystal_nova_legendary_aura") then
		self.parent:AddNewModifier(self.parent, self.ability, self:GetName(), { duration = 2 })
	end
end

modifier_crystal_maiden_crystal_nova_legendary_slide = class(mod_hidden)
function modifier_crystal_maiden_crystal_nova_legendary_slide:IsAura()
	return true
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:GetAuraDuration()
	return 0
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:GetAuraRadius()
	return self.radius
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:GetModifierAura()
	return "modifier_ice_slide"
end
function modifier_crystal_maiden_crystal_nova_legendary_slide:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.radius = self.ability.talents.q7_radius
end

function modifier_crystal_maiden_crystal_nova_legendary_slide:GetAuraEntityReject(hEntity)
	if hEntity:IsFieldInvun(self.caster) then
		return true
	end
	local is_friend = self.caster:GetTeamNumber() == hEntity:GetTeamNumber()

	if not hEntity:IsUnit() then
		return true
	end
	if is_friend and self.caster ~= hEntity then
		return true
	end
	if not is_friend and hEntity:IsRooted() then
		return true
	end
	if
		is_friend
		and not self.caster:HasScepter()
		and self.caster:HasModifier("modifier_crystal_maiden_freezing_field_custom")
	then
		return true
	end
	if not is_friend and hEntity:IsDebuffImmune() then
		return true
	end
	if hEntity:HasModifier("modifier_crystal_maiden_crystal_nova_stun") then
		return true
	end
	if hEntity:IsInvulnerable() and not is_friend then
		return true
	end

	return false
end