--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_life_stealer_open_wounds_custom_tracker",
	"abilities/life_stealer/life_stealer_open_wounds_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_open_wounds_custom",
	"abilities/life_stealer/life_stealer_open_wounds_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_life_stealer_open_wounds_custom_legendary",
	"abilities/life_stealer/life_stealer_open_wounds_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_wounds_7"
)
LinkLuaModifier(
	"modifier_life_stealer_open_wounds_custom_burn",
	"abilities/life_stealer/life_stealer_open_wounds_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lifestealer_wounds_3"
)

life_stealer_open_wounds_custom = class({})
life_stealer_open_wounds_custom.active_mod = nil
life_stealer_open_wounds_custom.talents = {}

function life_stealer_open_wounds_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_life_stealer/life_stealer_open_wounds.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_life_stealer/life_stealer_open_wounds_impact.vpcf",
		context
	)
	PrecacheResource("particle", "particles/lifestealer/wounds_legendary_aoe.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/wounds_chains.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/sandking_caustic_finale_explode_custom.vpcf", context)
	PrecacheResource("particle", "particles/lifestealer/wounds_legendary_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodritual_impact.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/bloodrage_stack_main.vpcf", context)
end

function life_stealer_open_wounds_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_spell = 0,
			w1_damage = 0,

			w2_heal = 0,
			w2_cd = 0,

			has_w3 = 0,
			w3_base = 0,
			w3_damage = 0,
			w3_interval = caster:GetTalentValue("modifier_lifestealer_wounds_3", "interval", true),
			w3_heal = caster:GetTalentValue("modifier_lifestealer_wounds_3", "heal", true) / 100,
			w3_max = caster:GetTalentValue("modifier_lifestealer_wounds_3", "max", true),
			w3_damage_type = caster:GetTalentValue("modifier_lifestealer_wounds_3", "damage_type", true),
			w3_duration = caster:GetTalentValue("modifier_lifestealer_wounds_3", "duration", true),

			has_w4 = 0,
			w4_duration = caster:GetTalentValue("modifier_lifestealer_wounds_4", "duration", true),
			w4_slow = caster:GetTalentValue("modifier_lifestealer_wounds_4", "slow", true),

			has_h5 = 0,
			h5_max_distance = caster:GetTalentValue("modifier_lifestealer_hero_5", "max_distance", true),
			h5_silence = caster:GetTalentValue("modifier_lifestealer_hero_5", "silence", true),
			h5_min_distance = caster:GetTalentValue("modifier_lifestealer_hero_5", "min_distance", true),
			h5_pull_duration = caster:GetTalentValue("modifier_lifestealer_hero_5", "pull_duration", true),
			h5_range = caster:GetTalentValue("modifier_lifestealer_hero_5", "range", true),
			h5_attacks = caster:GetTalentValue("modifier_lifestealer_hero_5", "attacks", true),

			has_r3 = 0,
		}
	end

	if caster:HasTalent("modifier_lifestealer_wounds_1") then
		self.talents.has_w1 = 1
		self.talents.w1_spell = caster:GetTalentValue("modifier_lifestealer_wounds_1", "spell")
		self.talents.w1_damage = caster:GetTalentValue("modifier_lifestealer_wounds_1", "damage") / 100
	end

	if caster:HasTalent("modifier_lifestealer_wounds_2") then
		self.talents.w2_heal = caster:GetTalentValue("modifier_lifestealer_wounds_2", "heal") / 100
		self.talents.w2_cd = caster:GetTalentValue("modifier_lifestealer_wounds_2", "cd")
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_lifestealer_wounds_2", type = 1, value = self.talents.w2_heal }
		)
	end

	if caster:HasTalent("modifier_lifestealer_wounds_3") then
		self.talents.has_w3 = 1
		self.talents.w3_base = caster:GetTalentValue("modifier_lifestealer_wounds_3", "base")
		self.talents.w3_damage = caster:GetTalentValue("modifier_lifestealer_wounds_3", "damage") / 100
	end

	if caster:HasTalent("modifier_lifestealer_wounds_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_lifestealer_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_lifestealer_infest_3") then
		self.talents.has_r3 = 1
	end
end

function life_stealer_open_wounds_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "life_stealer_open_wounds", self)
end

function life_stealer_open_wounds_custom:CreateTalent()
	self:ToggleAutoCast()
end

function life_stealer_open_wounds_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() or self:GetCaster():IsCreepHero() then
		return
	end
	return "modifier_life_stealer_open_wounds_custom_tracker"
end

function life_stealer_open_wounds_custom:GetBehavior()
	local bonus = self.talents.has_h5 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + bonus
end

function life_stealer_open_wounds_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.w2_cd or 0)
end

function life_stealer_open_wounds_custom:OnSpellStart()
	local target = self:GetCursorTarget()
	self.caster:EmitSound("Hero_LifeStealer.OpenWounds.Cast")

	if target:TriggerSpellAbsorb(self) then
		return
	end

	if self.talents.has_h5 == 1 and self:GetAutoCastState() then
		self:PullTarget(target, self.talents.h5_min_distance)
	end

	local duration = self.duration * (1 - target:GetStatusResistance())
	if self.talents.has_w4 == 1 then
		duration = self.duration + self.talents.w4_duration
	end

	target:AddNewModifier(self.caster, self, "modifier_life_stealer_open_wounds_custom", { duration = duration })
end

function life_stealer_open_wounds_custom:PullTarget(target, min_distance)
	local caster_loc = self.caster:GetAbsOrigin()
	local pull_duration = self.talents.h5_pull_duration

	local chain_effect =
		ParticleManager:CreateParticle("particles/lifestealer/wounds_chains.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		chain_effect,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		chain_effect,
		3,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(chain_effect)

	target:EmitSound("Lifestealer.Wounds_chains")

	local dir = caster_loc - target:GetAbsOrigin()
	local point = caster_loc - dir:Normalized() * min_distance

	local distance = (point - target:GetAbsOrigin()):Length2D()

	if dir:Length2D() < min_distance then
		distance = 20
	end
	distance = math.min(self.talents.h5_max_distance, distance)

	point = target:GetAbsOrigin() + dir:Normalized() * distance

	target:AddNewModifier(self.caster, self, "modifier_generic_arc", {
		target_x = point.x,
		target_y = point.y,
		distance = distance,
		duration = pull_duration,
		height = 0,
		fix_end = false,
		isStun = false,
		activity = ACT_DOTA_FLAIL,
	})
end

modifier_life_stealer_open_wounds_custom = class(mod_visible)
function modifier_life_stealer_open_wounds_custom:IsPurgable()
	return self.ability.talents.has_w4 == 0
end
function modifier_life_stealer_open_wounds_custom:GetStatusEffectName()
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/status_fx/status_effect_life_stealer_open_wounds.vpcf",
		self
	)
end
function modifier_life_stealer_open_wounds_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_life_stealer_open_wounds_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow + (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_slow or 0)

	self.max_slow = self.slow
	self.min_slow = self.slow / 5
	self.max_ticks = 2
	self.min_ticks = 5
	self.ticks = 0
	self.damage_proc = false

	if not IsServer() then
		return
	end
	self.ability.active_mod = self
	self.ability:EndCd()
	self.parent:AddDamageEvent_inc(self)
	self.RemoveForDuel = true

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_life_stealer/life_stealer_open_wounds.vpcf",
		self
	)
	self.sound_name = wearables_system:GetSoundReplacement(self.caster, "Hero_LifeStealer.OpenWounds", self)

	self.parent:GenericParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_life_stealer/life_stealer_open_wounds_impact.vpcf",
			self
		)
	)
	self.parent:EmitSound(self.sound_name)
	self.parent:GenericParticle(pfx_name, self)

	self:SetHasCustomTransmitterData(true)

	self.interval = 0.98
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_open_wounds_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.ticks = self.ticks + 1
	if self.ticks > self.max_ticks then
		self.slow = self.max_slow - (self.min_slow * (self.ticks - self.max_ticks))
	end
	if self.ticks > self.min_ticks then
		self.slow = self.min_slow
	end

	self:SendBuffRefreshToClients()
end

function modifier_life_stealer_open_wounds_custom:AddCustomTransmitterData()
	return {
		slow = self.slow,
	}
end

function modifier_life_stealer_open_wounds_custom:HandleCustomTransmitterData(data)
	self.slow = data.slow
end

function modifier_life_stealer_open_wounds_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.active_mod = nil
	self.ability:StartCd()

	self.parent:StopSound(self.sound_name)
end

function modifier_life_stealer_open_wounds_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_life_stealer_open_wounds_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_life_stealer_open_wounds_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	local attacker = params.attacker

	if not attacker:IsUnit() then
		return
	end
	if attacker:GetTeamNumber() ~= self.caster:GetTeamNumber() then
		return
	end

	local caster_attacker = self.caster.infest_creep or self.caster

	if not params.inflictor and caster_attacker == attacker then
		if self.ability.talents.has_w3 == 1 then
			self.parent:AddNewModifier(
				caster_attacker,
				self.ability,
				"modifier_life_stealer_open_wounds_custom_burn",
				{ duration = self.ability.talents.w3_duration }
			)
		end

		if not self.damage_proc then
			self:IncrementStackCount()
			if self:GetStackCount() >= self.ability.attacks then
				self.damage_proc = true
				self:SetStackCount(0)
				self.parent:EmitSound("Lifestealer.Wounds_death")

				local effect_cast = ParticleManager:CreateParticle(
					"particles/sand_king/sandking_caustic_finale_explode_custom.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					effect_cast,
					0,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.parent:GetOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(effect_cast)

				local damage = self.ability.damage + caster_attacker:GetMaxHealth() * self.ability.talents.w1_damage
				local damageTable =
					{ attacker = caster_attacker, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
				for _, target in pairs(self.caster:FindTargets(self.ability.radius, self.parent:GetAbsOrigin())) do
					damageTable.damage = damage
					damageTable.victim = target
					DoDamage(damageTable)
				end

				if self.ability.talents.has_h5 == 1 then
					self.parent:AddNewModifier(
						self.caster,
						self.ability,
						"modifier_generic_silence",
						{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.h5_silence }
					)
					self.parent:EmitSound("Sf.Raze_Silence")
					self.parent:GenericParticle(
						"particles/units/heroes/hero_bloodseeker/bloodseeker_bloodritual_impact.vpcf"
					)
				end
			end
		end
	end

	local result = attacker:CheckLifesteal(params)
	if not result then
		return
	end

	local heal = params.damage * self.ability.heal_percent * result
	local heal_target = attacker.infest_creep or attacker
	local quest_heal = heal_target:GenericHeal(heal, self.ability, true)

	if not self.parent:IsRealHero() then
		return
	end
	if self.caster:GetQuest() ~= "Lifestealer.Quest_6" then
		return
	end
	if self.caster:QuestCompleted() then
		return
	end
	if self.caster ~= heal_target and not (heal_target.lifestealer_creep and heal_target.owner == self.caster) then
		return
	end

	self.caster:UpdateQuest(quest_heal)
end

modifier_life_stealer_open_wounds_custom_tracker = class(mod_hidden)
function modifier_life_stealer_open_wounds_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not self.ability.tracker then
		self.ability.tracker = self
	end

	self.ability:UpdateTalents()

	self.parent.wounds_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.heal_percent = self.ability:GetSpecialValueFor("heal_percent") / 100
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.attacks = self.ability:GetSpecialValueFor("attacks")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_life_stealer_open_wounds_custom_tracker:OnRefresh(table)
	self.ability.heal_percent = self.ability:GetSpecialValueFor("heal_percent") / 100
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_life_stealer_open_wounds_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_life_stealer_open_wounds_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell
end

function modifier_life_stealer_open_wounds_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_range
end

modifier_life_stealer_open_wounds_custom_burn = class(mod_visible)
function modifier_life_stealer_open_wounds_custom_burn:GetTexture()
	return "buffs/lifestealer/wounds_3"
end
function modifier_life_stealer_open_wounds_custom_burn:GetEffectName()
	return "particles/items2_fx/sange_maim.vpcf"
end
function modifier_life_stealer_open_wounds_custom_burn:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true

	self.max = self.ability.talents.w3_max
	self.interval = self.ability.talents.w3_interval

	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		victim = self.parent,
		damage_type = self.ability.talents.w3_damage_type,
	}
	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_open_wounds_custom_burn:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.parent:EmitSound("DOTA_Item.Maim")

	if self.ability.talents.has_r3 == 1 then
		return
	end

	if not self.effect_cast then
		self.effect_cast = self.parent:GenericParticle("particles/bloodseeker/bloodrage_stack_main.vpcf", self, true)
	end
	ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
end

function modifier_life_stealer_open_wounds_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = self.ability.talents.w3_base + self.ability.talents.w3_damage * self.caster:GetMaxHealth()
	self.damageTable.damage = (damage / self.max) * self:GetStackCount() * self.interval
	local real_damage = DoDamage(self.damageTable, "modifier_lifestealer_wounds_3")
	local result = self.caster:CanLifesteal(self.parent)
	if not result then
		return
	end

	self.caster:GenericHeal(
		real_damage * self.ability.talents.w3_heal * result,
		self.ability,
		true,
		"",
		"modifier_lifestealer_wounds_3"
	)
end

life_stealer_open_wounds_custom_legendary = class({})
life_stealer_open_wounds_custom_legendary.talents = {}

function life_stealer_open_wounds_custom_legendary:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	self:UpdateTalents()
end

function life_stealer_open_wounds_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_damage_type = caster:GetTalentValue("modifier_lifestealer_wounds_7", "damage_type", true),
			w7_damage = caster:GetTalentValue("modifier_lifestealer_wounds_7", "damage", true) / 100,
			w7_talent_cd = caster:GetTalentValue("modifier_lifestealer_wounds_7", "talent_cd", true),
			w7_stun = caster:GetTalentValue("modifier_lifestealer_wounds_7", "stun", true),
			w7_duration = caster:GetTalentValue("modifier_lifestealer_wounds_7", "duration", true),
			w7_radius = caster:GetTalentValue("modifier_lifestealer_wounds_7", "radius", true),
		}
	end
end

function life_stealer_open_wounds_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function life_stealer_open_wounds_custom_legendary:GetAbilityTextureName()
	return "open_wounds_legendary"
		.. (self.caster:HasModifier("modifier_life_stealer_open_wounds_custom_legendary") and "_end" or "")
end

function life_stealer_open_wounds_custom_legendary:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET
		+ (
			self.caster:HasModifier("modifier_life_stealer_open_wounds_custom_legendary")
				and DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			or 0
		)
end

function life_stealer_open_wounds_custom_legendary:GetCooldown()
	return self.talents.w7_talent_cd or 0
end

function life_stealer_open_wounds_custom_legendary:GetCastRange(vector, hTarget)
	return (self.talents.w7_radius or 0) - self.caster:GetCastRangeBonus()
end

function life_stealer_open_wounds_custom_legendary:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_life_stealer_open_wounds_custom_legendary")
	if mod then
		mod:Destroy()
		return
	end

	if not self.caster.wounds_ability then
		return
	end

	for _, target in pairs(self.caster:FindTargets(self.talents.w7_radius)) do
		self.caster.wounds_ability:PullTarget(target, 100)
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_life_stealer_open_wounds_custom_legendary",
		{ duration = self.talents.w7_duration }
	)
end

modifier_life_stealer_open_wounds_custom_legendary = class(mod_hidden)
function modifier_life_stealer_open_wounds_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_life_stealer_open_wounds.vpcf"
end
function modifier_life_stealer_open_wounds_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_life_stealer_open_wounds_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.w7_radius
	self.stun = self.ability.talents.w7_stun
	self.damage = self.ability.talents.w7_damage
	self.damage_type = self.ability.talents.w7_damage_type

	if not IsServer() then
		return
	end

	self.ability:EndCd(0.5)
	self.RemoveForDuel = true
	self.parent:EmitSound("Lifestealer.Wounds_legendary_start")
	self.parent:EmitSound("Lifestealer.Wounds_legendary_loop")
	self.parent:EmitSound("Lifestealer.Wounds_legendary_loop2")

	self.heal_target = self.parent
	local mod = self.parent:FindModifierByName("modifier_life_stealer_infest_custom")
	if mod and mod.target and mod.is_legendary == 1 then
		self.heal_target = mod.target
	end
	self.heal_target:AddHealEvent_inc(self, true)

	self.particle = self:DrawParticle(self.parent)
	self.end_target = self.parent

	self.max_time = self:GetRemainingTime()

	self.count = 0
	self.ended = false
	self.interval = 0.1
	self:StartIntervalThink(self.interval)
end

function modifier_life_stealer_open_wounds_custom_legendary:DrawParticle(target)
	if not IsServer() then
		return
	end
	local particle = ParticleManager:CreateParticle(
		"particles/lifestealer/wounds_legendary_aoe.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, self.radius, self.radius))
	self:AddParticle(particle, false, false, -1, false, false)
	return particle
end

function modifier_life_stealer_open_wounds_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_life_stealer_infest_custom")
	if mod and mod.target then
		self.end_target = mod.target
		if self.particle then
			ParticleManager:Delete(self.particle, 2)
			self.particle = nil
			self.infest_particle = self:DrawParticle(mod.target)
		end
	else
		self.end_target = self.parent
		if self.infest_particle then
			ParticleManager:Delete(self.infest_particle, 2)
			self.infest_particle = nil
			self.particle = self:DrawParticle(self.parent)
		end
	end

	if self.ended then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self.count,
		style = "LifestealerWounds",
	})
end

function modifier_life_stealer_open_wounds_custom_legendary:HealEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.heal_target ~= params.unit then
		return
	end
	self.count = self.count + params.gain * self.damage
end

function modifier_life_stealer_open_wounds_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()

	self.ended = true
	self.parent:StopSound("Lifestealer.Wounds_legendary_loop")
	self.parent:StopSound("Lifestealer.Wounds_legendary_loop2")
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "LifestealerWounds" })

	if not self.parent:IsAlive() then
		return
	end
	if self.count <= 0 then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/lifestealer/wounds_legendary_end.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.end_target
	)
	ParticleManager:SetParticleControl(particle, 0, self.end_target:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 2, Vector(self.radius, self.radius, self.radius))
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("Lifestealer.Wounds_legendary_end")
	self.parent:EmitSound("Lifestealer.Wounds_legendary_end2")

	local damageTable =
		{ attacker = self.parent, ability = self.ability, damage = self.count, damage_type = self.damage_type }

	for _, target in pairs(self.parent:FindTargets(self.radius)) do
		damageTable.victim = target
		local real_damage = DoDamage(damageTable, "modifier_lifestealer_wounds_7")
		target:SendNumber(6, real_damage)

		local effect_cast = ParticleManager:CreateParticle(
			"particles/sand_king/sandking_caustic_finale_explode_custom.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(effect_cast)

		target:AddNewModifier(self.parent, self.ability, "modifier_stunned", { duration = self.stun })
	end
end