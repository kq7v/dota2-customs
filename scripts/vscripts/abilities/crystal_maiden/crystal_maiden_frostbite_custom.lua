--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_tracker",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_legendary_slow",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_maiden_frostbite_7"
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_max_slow",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_resist",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_maiden_frostbite_1", "modifier_maiden_freezing_1" }
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_lowhp",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_maiden_hero_5"
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_lowhp_cd",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_maiden_hero_5" }
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_area",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_area_effect",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_regen",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_maiden_hero_2", "modifier_maiden_hero_3" }
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_spell",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_maiden_frostbite_3"
)
LinkLuaModifier(
	"modifier_crystal_maiden_frostbite_custom_spell_count",
	"abilities/crystal_maiden/crystal_maiden_frostbite_custom",
	LUA_MODIFIER_MOTION_NONE
)

crystal_maiden_frostbite_custom = class({})
crystal_maiden_frostbite_custom.talents = {}

function crystal_maiden_frostbite_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_crystalmaiden/maiden_frostbite.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/generic_silenced.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_ground.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_crystalmaiden/maiden_frostbite_buff.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_radius.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_snow.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/frostbite_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_mark.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_frostbite_slow.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/winter_wyvern/winter_wyvern_ti7/wyvern_cold_embrace_ti7buff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_frostbite_area.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lich/lich_ice_age_debuff.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_area_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_crystalmaiden/maiden_death.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_death.vpcf", context)
end

function crystal_maiden_frostbite_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_damage = 0,
			w1_resist = 0,
			w1_duration = caster:GetTalentValue("modifier_maiden_frostbite_1", "duration", true),

			w2_heal = 0,
			w2_bonus = caster:GetTalentValue("modifier_maiden_frostbite_2", "bonus", true),

			has_h2 = 0,
			h2_health = 0,
			h2_armor = 0,
			h2_duration = caster:GetTalentValue("modifier_maiden_hero_2", "duration", true),

			has_h3 = 0,
			h3_mana = 0,
			h3_duration = caster:GetTalentValue("modifier_maiden_hero_3", "duration", true),

			has_w3 = 0,
			w3_spell = 0,
			w3_damage = 0,
			w3_effect_duration = caster:GetTalentValue("modifier_maiden_frostbite_3", "effect_duration", true),
			w3_damage_type = caster:GetTalentValue("modifier_maiden_frostbite_3", "damage_type", true),
			w3_interval = caster:GetTalentValue("modifier_maiden_frostbite_3", "interval", true),
			w3_duration = caster:GetTalentValue("modifier_maiden_frostbite_3", "duration", true),
			w3_max = caster:GetTalentValue("modifier_maiden_frostbite_3", "max", true),
			w3_radius = caster:GetTalentValue("modifier_maiden_frostbite_3", "radius", true),

			has_w4 = 0,
			w4_cd = caster:GetTalentValue("modifier_maiden_frostbite_4", "cd", true),
			w4_cd_items = caster:GetTalentValue("modifier_maiden_frostbite_4", "cd_items", true),

			has_h5 = 0,
			h5_heal_inc = caster:GetTalentValue("modifier_maiden_hero_5", "heal_inc", true),
			h5_heal = caster:GetTalentValue("modifier_maiden_hero_5", "heal", true) / 100,
			h5_duration = caster:GetTalentValue("modifier_maiden_hero_5", "duration", true),
			h5_talent_cd = caster:GetTalentValue("modifier_maiden_hero_5", "talent_cd", true),

			has_w7 = 0,
			w7_radius = caster:GetTalentValue("modifier_maiden_frostbite_7", "radius", true),
			w7_slow = caster:GetTalentValue("modifier_maiden_frostbite_7", "slow", true),
			w7_damage = caster:GetTalentValue("modifier_maiden_frostbite_7", "damage", true),
			w7_max = caster:GetTalentValue("modifier_maiden_frostbite_7", "max", true),
			w7_duration = caster:GetTalentValue("modifier_maiden_frostbite_7", "duration", true),

			has_e7 = 0,

			has_r1 = 0,
			r1_heal_reduce = 0,
			r1_duration = caster:GetTalentValue("modifier_maiden_freezing_1", "duration", true),
		}
	end

	if caster:HasTalent("modifier_maiden_frostbite_1") then
		self.talents.has_w1 = 1
		self.talents.w1_damage = caster:GetTalentValue("modifier_maiden_frostbite_1", "damage")
		self.talents.w1_resist = caster:GetTalentValue("modifier_maiden_frostbite_1", "resist")
	end

	if caster:HasTalent("modifier_maiden_frostbite_2") then
		self.talents.w2_heal = caster:GetTalentValue("modifier_maiden_frostbite_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_maiden_frostbite_2",
			type = 1,
			value = function(params)
				if params.inflictor == caster.freezing_field_ability then
					return self.talents.w2_heal * self.talents.w2_bonus
				end
				return self.talents.w2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_maiden_frostbite_3") then
		self.talents.has_w3 = 1
		self.talents.w3_spell = caster:GetTalentValue("modifier_maiden_frostbite_3", "spell")
		self.talents.w3_damage = caster:GetTalentValue("modifier_maiden_frostbite_3", "damage")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_maiden_frostbite_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_maiden_hero_5") then
		self.talents.has_h5 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_maiden_frostbite_7") then
		self.talents.has_w7 = 1
		if IsServer() then
			self.tracker:OnIntervalThink()
		end
	end

	if caster:HasTalent("modifier_maiden_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_health = caster:GetTalentValue("modifier_maiden_hero_2", "health")
		self.talents.h2_armor = caster:GetTalentValue("modifier_maiden_hero_2", "armor")
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_maiden_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_mana = caster:GetTalentValue("modifier_maiden_hero_3", "mana") / 100
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_maiden_arcane_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_maiden_freezing_1") then
		self.talents.has_r1 = 1
		self.talents.r1_heal_reduce = caster:GetTalentValue("modifier_maiden_freezing_1", "heal_reduce")
	end
end

function crystal_maiden_frostbite_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "crystal_maiden_frostbite", self)
end

function crystal_maiden_frostbite_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_crystal_maiden_frostbite_custom_tracker"
end

function crystal_maiden_frostbite_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.has_w4 == 1 and self.talents.w4_cd or 0)
end

function crystal_maiden_frostbite_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end

	if self.talents.has_w1 == 1 or self.talents.has_r1 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_crystal_maiden_frostbite_custom_resist",
			{ duration = self.talents.has_w1 == 1 and self.talents.w1_duration or self.talents.r1_duration }
		)
	end

	if self.talents.has_w4 == 1 then
		self.caster:CdItems(self.talents.w4_cd_items, "modifier_maiden_frostbite_4")
	end

	self:ApplyEffect(target, self.duration)

	local info = {
		Target = target,
		Source = self.caster,
		Ability = self,
		EffectName = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_crystalmaiden/maiden_frostbite.vpcf",
			self
		),
		iMoveSpeed = 1000,
		vSourceLoc = self.caster:GetAbsOrigin(),
		bDodgeable = false,
	}
	ProjectileManager:CreateTrackingProjectile(info)
end

function crystal_maiden_frostbite_custom:ApplyEffect(target, new_duration)
	if not IsServer() then
		return
	end
	local duration = new_duration * (1 - target:GetStatusResistance())
	local mod = target:FindModifierByName("modifier_crystal_maiden_frostbite_custom_legendary_slow")
	if mod and mod:GetStackCount() >= self.talents.w7_max then
		duration = new_duration
	end

	target:AddNewModifier(self.caster, self, "modifier_crystal_maiden_frostbite_custom", { duration = duration })
end

modifier_crystal_maiden_frostbite_custom = class(mod_visible)
function modifier_crystal_maiden_frostbite_custom:IsPurgable()
	return true
end
function modifier_crystal_maiden_frostbite_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_crystal_maiden_frostbite_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_crystal_maiden_frostbite_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.tick_interval
	self.damage = self.interval * (self.ability.damage_per_second + self.ability.talents.w1_damage)

	if not IsServer() then
		return
	end
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage = self.damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
	}

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_crystalmaiden/maiden_frostbite_buff.vpcf",
		self
	)
	self.parent:GenericParticle(particle_name, self)

	local mod = self.parent:FindModifierByName("modifier_crystal_maiden_frostbite_custom_legendary_slow")
	if mod and mod:GetStackCount() >= self.ability.talents.w7_max then
		self:SetStackCount(1)
		self.parent:EmitSound("Maiden.Arcane_frostbite")
		self.parent:EmitSound("Maiden.Frostbite_stun")
		self.ground_particle = ParticleManager:CreateParticle(
			"particles/crystal_maiden/maiden_ground.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.ground_particle,
			0,
			self.parent,
			PATTACH_OVERHEAD_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.ground_particle,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.ground_particle,
			5,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(self.ground_particle, false, false, -1, true, false)
	end

	self.parent:EmitSound("hero_Crystal.frostbite")
	self:StartIntervalThink(self.interval - FrameTime())
end

function modifier_crystal_maiden_frostbite_custom:OnRefresh(table)
	self:OnCreated(table)
end

function modifier_crystal_maiden_frostbite_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	DoDamage(self.damageTable)
end

function modifier_crystal_maiden_frostbite_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("hero_Crystal.frostbite")
end

function modifier_crystal_maiden_frostbite_custom:CheckState()
	if self:GetStackCount() == 1 then
		return {
			[MODIFIER_STATE_FROZEN] = true,
			[MODIFIER_STATE_STUNNED] = true,
		}
	end

	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_crystal_maiden_frostbite_custom_tracker = class(mod_hidden)
function modifier_crystal_maiden_frostbite_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.frostbite_ability = self.ability

	self.ability.damage_per_second = self.ability:GetSpecialValueFor("damage_per_second")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.tick_interval = self.ability:GetSpecialValueFor("tick_interval")
end

function modifier_crystal_maiden_frostbite_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_crystal_maiden_frostbite_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MIN_HEALTH,
	}
end

function modifier_crystal_maiden_frostbite_custom_tracker:GetModifierHealthBonus()
	return self.parent:GetIntellect(false) * self.ability.talents.h2_health
end

function modifier_crystal_maiden_frostbite_custom_tracker:GetModifierHealChange()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_heal_inc
end

function modifier_crystal_maiden_frostbite_custom_tracker:GetModifierHPRegenAmplify_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return self.ability.talents.h5_heal_inc
end

function modifier_crystal_maiden_frostbite_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self.parent:GetHealth() > 1 then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if self.parent:HasModifier("modifier_crystal_maiden_frostbite_custom_lowhp_cd") then
		return
	end

	self.parent:Purge(false, true, false, true, true)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_crystal_maiden_frostbite_custom_lowhp",
		{ duration = self.ability.talents.h5_duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_crystal_maiden_frostbite_custom_lowhp_cd",
		{ duration = self.ability.talents.h5_talent_cd }
	)
end

function modifier_crystal_maiden_frostbite_custom_tracker:GetMinHealth()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:LethalDisabled() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if
		self.parent:HasModifier("modifier_crystal_maiden_frostbite_custom_lowhp_cd")
		and not self.parent:HasModifier("modifier_crystal_maiden_frostbite_custom_lowhp")
	then
		return
	end

	return 1
end

function modifier_crystal_maiden_frostbite_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_h2 == 1 or self.ability.talents.has_h3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_crystal_maiden_frostbite_custom_regen",
			{
				duration = self.ability.talents.has_h3 == 1 and self.ability.talents.h3_duration
					or self.ability.talents.h2_duration,
			}
		)
	end

	if self.ability.talents.has_w3 == 0 then
		return
	end
	if params.ability:GetName() == "crystal_maiden_arcane_aura_custom" then
		return
	end

	local point = self.parent:GetAbsOrigin()
	if params.target then
		point = params.target:GetAbsOrigin()
	elseif params.point then
		point = params.point
	end

	self:CreateArea(point)
end

function modifier_crystal_maiden_frostbite_custom_tracker:CreateArea(point)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w3 == 0 then
		return
	end

	CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_crystal_maiden_frostbite_custom_area",
		{ duration = self.ability.talents.w3_duration },
		point,
		self.parent:GetTeamNumber(),
		false
	)
end

function modifier_crystal_maiden_frostbite_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end
	local radius = self.ability.talents.w7_radius

	local enemies = self.parent:FindTargets(radius)

	if #enemies > 0 and not self.ring and self.parent:IsAlive() then
		self.ring = ParticleManager:CreateParticle(
			"particles/crystal_maiden/maiden_radius.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.ring,
			0,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.ring,
			1,
			self.parent,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(self.ring, 2, Vector(radius, radius, radius))
		self:AddParticle(self.ring, false, false, -1, false, false)

		self.effect_cast = ParticleManager:CreateParticle(
			"particles/crystal_maiden/maiden_snow.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(radius, radius, 1))
		self:AddParticle(self.effect_cast, false, false, -1, false, false)

		self.parent:EmitSound("Maiden.Frostbite_snow")
	end

	if (#enemies == 0 or not self.parent:IsAlive()) and self.ring then
		ParticleManager:DestroyParticle(self.ring, false)
		ParticleManager:ReleaseParticleIndex(self.ring)

		ParticleManager:DestroyParticle(self.effect_cast, false)
		ParticleManager:ReleaseParticleIndex(self.effect_cast)

		self.ring = nil
		self.effect_cast = nil
		self.parent:StopSound("Maiden.Frostbite_snow")
	end

	if not self.parent:IsAlive() then
		return
	end

	for _, enemy in pairs(enemies) do
		enemy:AddNewModifier(self.parent, self.ability, "modifier_crystal_maiden_frostbite_custom_legendary_slow", {})
	end

	self:StartIntervalThink(0.2)
end

modifier_crystal_maiden_frostbite_custom_legendary_slow = class(mod_visible)
function modifier_crystal_maiden_frostbite_custom_legendary_slow:GetTexture()
	return "buffs/crystal_maiden/frostbite_legendary"
end
function modifier_crystal_maiden_frostbite_custom_legendary_slow:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w7_max
	self.slow = self.ability.talents.w7_slow / self.max
	self.damage = self.ability.talents.w7_damage / self.max
	self.radius = self.ability.talents.w7_radius
	self.duration = self.ability.talents.w7_duration

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.end_timer = self.duration
	self.start_timer = 1

	self:OnIntervalThink()
	self:StartIntervalThink(1)
end

function modifier_crystal_maiden_frostbite_custom_legendary_slow:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		(self.parent:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D() <= self.radius and self.caster:IsAlive()
	then
		self.end_timer = self.duration
		if self.start_timer > 0 then
			self.start_timer = self.start_timer - 1
		elseif self:GetStackCount() < self.max then
			self:IncrementStackCount()
		end
	else
		self.start_timer = 1
		if self.end_timer > 0 then
			self.end_timer = self.end_timer - 1
		else
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end
end

function modifier_crystal_maiden_frostbite_custom_legendary_slow:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end

	if self:GetStackCount() < self.max then
		if not self.effect_cast then
			self.effect_cast =
				self.parent:GenericParticle("particles/crystal_maiden/frostbite_legendary_stack.vpcf", self, true)
		end
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
		if self.mark then
			ParticleManager:DestroyParticle(self.mark, false)
			ParticleManager:ReleaseParticleIndex(self.mark)
			self.mark = nil
		end
		self.parent:RemoveModifierByName("modifier_crystal_maiden_frostbite_custom_max_slow")
	else
		if not self.mark then
			self.mark = self.parent:GenericParticle("particles/crystal_maiden/maiden_mark.vpcf", self, true)
		end
		if self.effect_cast then
			ParticleManager:DestroyParticle(self.effect_cast, false)
			ParticleManager:ReleaseParticleIndex(self.effect_cast)
			self.effect_cast = nil
		end
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_crystal_maiden_frostbite_custom_max_slow", {})
	end
end

function modifier_crystal_maiden_frostbite_custom_legendary_slow:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_crystal_maiden_frostbite_custom_max_slow")
end

function modifier_crystal_maiden_frostbite_custom_legendary_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_crystal_maiden_frostbite_custom_legendary_slow:GetModifierIncomingDamage_Percentage(params)
	if IsServer() and (not params.attacker or params.attacker:FindOwner() ~= self.caster) then
		return
	end
	if not params.inflictor then
		return
	end
	return self.damage * self:GetStackCount()
end

function modifier_crystal_maiden_frostbite_custom_legendary_slow:GetModifierMoveSpeedBonus_Percentage()
	return self:GetStackCount() * self.slow
end

modifier_crystal_maiden_frostbite_custom_max_slow = class(mod_hidden)
function modifier_crystal_maiden_frostbite_custom_max_slow:GetStatusEffectName()
	return "particles/status_fx/status_effect_frost.vpcf"
end
function modifier_crystal_maiden_frostbite_custom_max_slow:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_crystal_maiden_frostbite_custom_max_slow:GetEffectName()
	return "particles/crystal_maiden/maiden_frostbite_slow.vpcf"
end
function modifier_crystal_maiden_frostbite_custom_max_slow:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:EmitSound("Maiden.Frostbite_max_slow")
end

modifier_crystal_maiden_frostbite_custom_resist = class(mod_visible)
function modifier_crystal_maiden_frostbite_custom_resist:GetTexture()
	return "buffs/crystal_maiden/frostbite_1"
end
function modifier_crystal_maiden_frostbite_custom_resist:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
end

function modifier_crystal_maiden_frostbite_custom_resist:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_crystal_maiden_frostbite_custom_resist:GetModifierMagicalResistanceBonus()
	return self.ability.talents.w1_resist
end

function modifier_crystal_maiden_frostbite_custom_resist:GetModifierHealChange()
	return self.ability.talents.r1_heal_reduce
end

function modifier_crystal_maiden_frostbite_custom_resist:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.r1_heal_reduce
end

modifier_crystal_maiden_frostbite_custom_lowhp = class(mod_visible)
function modifier_crystal_maiden_frostbite_custom_lowhp:GetTexture()
	return "buffs/crystal_maiden/hero_6"
end
function modifier_crystal_maiden_frostbite_custom_lowhp:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.heal = self.ability.talents.h5_heal * self.parent:GetMaxHealth() / self:GetRemainingTime()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Creep.Wyvern_heal")
	self.shallow_grave_particle = ParticleManager:CreateParticle(
		"particles/econ/items/winter_wyvern/winter_wyvern_ti7/wyvern_cold_embrace_ti7buff.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.shallow_grave_particle, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(self.shallow_grave_particle, 1, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(self.shallow_grave_particle, 2, self.parent:GetOrigin())
	self:AddParticle(self.shallow_grave_particle, false, false, -1, false, false)

	self.interval = 0.5
	self:StartIntervalThink(self.interval)
end

function modifier_crystal_maiden_frostbite_custom_lowhp:OnIntervalThink()
	if not IsServer() then
		return
	end
	SendOverheadEventMessage(self.parent, 10, self.parent, self.interval * self.heal, nil)
end

function modifier_crystal_maiden_frostbite_custom_lowhp:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_crystal_maiden_frostbite_custom_lowhp:GetModifierConstantHealthRegen()
	return self.heal
end

function modifier_crystal_maiden_frostbite_custom_lowhp:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

modifier_crystal_maiden_frostbite_custom_lowhp_cd = class(mod_cd)
function modifier_crystal_maiden_frostbite_custom_lowhp_cd:GetTexture()
	return "buffs/crystal_maiden/hero_6"
end

modifier_crystal_maiden_frostbite_custom_area = class(mod_hidden)
function modifier_crystal_maiden_frostbite_custom_area:IsAura()
	return true
end
function modifier_crystal_maiden_frostbite_custom_area:GetAuraDuration()
	return 0
end
function modifier_crystal_maiden_frostbite_custom_area:GetAuraRadius()
	return self.radius
end
function modifier_crystal_maiden_frostbite_custom_area:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_crystal_maiden_frostbite_custom_area:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_crystal_maiden_frostbite_custom_area:GetModifierAura()
	return "modifier_crystal_maiden_frostbite_custom_area_effect"
end
function modifier_crystal_maiden_frostbite_custom_area:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.w3_radius
	self.interval = self.ability.talents.w3_interval

	self.origin = self.parent:GetAbsOrigin()

	self.aoe_efx = ParticleManager:CreateParticle(
		"particles/crystal_maiden/maiden_frostbite_area.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.aoe_efx, 1, Vector(0, 0, 100))
	ParticleManager:SetParticleControl(self.aoe_efx, 5, Vector(self.radius, self.radius, self.radius))
	self:AddParticle(self.aoe_efx, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval - FrameTime())
end

function modifier_crystal_maiden_frostbite_custom_area:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Maiden.Frostbite_aoe")

	local damage_ring = ParticleManager:CreateParticle(
		"particles/crystal_maiden/maiden_area_damage.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(damage_ring, 0, self.origin)
	ParticleManager:SetParticleControl(damage_ring, 1, self.origin)
	ParticleManager:SetParticleControl(damage_ring, 2, Vector(150, 150, 150))
	ParticleManager:ReleaseParticleIndex(damage_ring)
end

modifier_crystal_maiden_frostbite_custom_area_effect = class(mod_hidden)
function modifier_crystal_maiden_frostbite_custom_area_effect:IsAura()
	return IsServer() and self.parent:IsRealHero() and self.parent:IsAlive()
end
function modifier_crystal_maiden_frostbite_custom_area_effect:GetAuraDuration()
	return 0
end
function modifier_crystal_maiden_frostbite_custom_area_effect:GetAuraRadius()
	return self.radius
end
function modifier_crystal_maiden_frostbite_custom_area_effect:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_crystal_maiden_frostbite_custom_area_effect:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_crystal_maiden_frostbite_custom_area_effect:GetModifierAura()
	return "modifier_crystal_maiden_frostbite_custom_spell_count"
end
function modifier_crystal_maiden_frostbite_custom_area_effect:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = 1200
	self.interval = self.ability.talents.w3_interval
	self.damage = self.ability.talents.w3_damage * self.interval

	self.damageTable = {
		victim = self.parent,
		damage = self.damage,
		attacker = self.caster,
		damage_type = self.ability.talents.w3_damage_type,
		ability = self.ability,
	}
	self:StartIntervalThink(self.interval - FrameTime())
end

function modifier_crystal_maiden_frostbite_custom_area_effect:OnIntervalThink()
	if not IsServer() then
		return
	end

	local real_damage = DoDamage(self.damageTable, "modifier_maiden_frostbite_3")
	self.parent:SendNumber(4, real_damage)

	self.parent:EmitSound("Hero_Lich.IceAge.Damage")
	self.parent:GenericParticle("particles/units/heroes/hero_lich/lich_ice_age_debuff.vpcf")
end

function modifier_crystal_maiden_frostbite_custom_area_effect:GetAuraEntityReject(hEntity)
	return hEntity ~= self.caster
end

modifier_crystal_maiden_frostbite_custom_spell_count = class(mod_hidden)
function modifier_crystal_maiden_frostbite_custom_spell_count:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self:StartIntervalThink(1)
end

function modifier_crystal_maiden_frostbite_custom_spell_count:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_crystal_maiden_frostbite_custom_spell",
		{ duration = self.ability.talents.w3_effect_duration }
	)
end

modifier_crystal_maiden_frostbite_custom_regen = class(mod_visible)
function modifier_crystal_maiden_frostbite_custom_regen:GetTexture()
	return "buffs/crystal_maiden/hero_3"
end
function modifier_crystal_maiden_frostbite_custom_regen:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.regen = (self.ability.talents.h3_mana * self.parent:GetMaxMana()) / self.ability.talents.h3_duration
end

function modifier_crystal_maiden_frostbite_custom_regen:OnRefresh()
	self:OnCreated()
end

function modifier_crystal_maiden_frostbite_custom_regen:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_crystal_maiden_frostbite_custom_regen:GetModifierPhysicalArmorBonus()
	return self.ability.talents.h2_armor
end

function modifier_crystal_maiden_frostbite_custom_regen:GetModifierConstantHealthRegen()
	return self.regen
end

function modifier_crystal_maiden_frostbite_custom_regen:GetModifierConstantManaRegen()
	return self.regen
end

modifier_crystal_maiden_frostbite_custom_spell = class(mod_visible)
function modifier_crystal_maiden_frostbite_custom_spell:GetTexture()
	return "buffs/crystal_maiden/frostbite_3"
end
function modifier_crystal_maiden_frostbite_custom_spell:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w3_max
	self.damage = self.ability.talents.w3_spell

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
	self:StartIntervalThink(0.2)
	self:OnIntervalThink()
end

function modifier_crystal_maiden_frostbite_custom_spell:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_crystal_maiden_frostbite_custom_spell:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end
	self.parent:UpdateUIlong({
		max = self.max,
		stack = self:GetStackCount(),
		override_stack = self:GetStackCount(),
		style = "MaidenFrostbite",
	})
end

function modifier_crystal_maiden_frostbite_custom_spell:OnDestroy()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end
	self.parent:UpdateUIlong({ max = self.max, stack = 0, style = "MaidenFrostbite" })
end

function modifier_crystal_maiden_frostbite_custom_spell:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_crystal_maiden_frostbite_custom_spell:GetModifierSpellAmplify_Percentage()
	return self:GetStackCount() * self.damage
end