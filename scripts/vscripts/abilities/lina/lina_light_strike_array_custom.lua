--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_lina_light_strike_array_custom",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_tracker",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_cdr",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_hero_6"
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_root",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_array_4"
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_root_cd",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_array_4"
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_legendary_stack",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_array_7"
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_legendary",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_lina_array_7" }
)
LinkLuaModifier(
	"modifier_lina_light_strike_array_custom_double",
	"abilities/lina/lina_light_strike_array_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_array_3"
)

lina_light_strike_array_custom = class({})
lina_light_strike_array_custom.talents = {}

function lina_light_strike_array_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_spell_light_strike_array.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_lina/lina_spell_light_strike_array_ray_team.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/ember_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_phoenix/phoenix_icarus_dive_burn_debuff.vpcf", context)
	PrecacheResource("particle", "particles/lina/stun_clone.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_start.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_end.vpcf", context)
	PrecacheResource("particle", "particles/lina/array_shield.vpcf", context)
	PrecacheResource("particle", "particles/lina/stun_stack.vpcf", context)
	PrecacheResource("particle", "particles/lina/array_attac_proc.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/primal_beast/beast_root.vpcf", context)
	PrecacheResource("particle", "particles/lina/array_legendary_caster.vpcf", context)
	PrecacheResource("particle", "particles/lina/soul_attack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
end

function lina_light_strike_array_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w1 = 0,
			w1_int = 0,
			w1_damage = 0,
			w1_chance = caster:GetTalentValue("modifier_lina_array_1", "chance", true),
			w1_damage_type = caster:GetTalentValue("modifier_lina_array_1", "damage_type", true),
			w1_radius = caster:GetTalentValue("modifier_lina_array_1", "radius", true),

			has_w2 = 0,
			w2_range = 0,
			w2_heal = 0,

			has_w3 = 0,
			w3_cd = 0,
			w3_damage = 0,
			w3_max = caster:GetTalentValue("modifier_lina_array_3", "max", true),
			w3_duration = caster:GetTalentValue("modifier_lina_array_3", "duration", true),
			w3_interval = caster:GetTalentValue("modifier_lina_array_3", "interval", true),

			has_w4 = 0,
			w4_speed = caster:GetTalentValue("modifier_lina_array_4", "speed", true),
			w4_root = caster:GetTalentValue("modifier_lina_array_4", "root", true),
			w4_talent_cd = caster:GetTalentValue("modifier_lina_array_4", "talent_cd", true),
			w4_damage = caster:GetTalentValue("modifier_lina_array_4", "damage", true) / 100,
			w4_ticks = caster:GetTalentValue("modifier_lina_array_4", "ticks", true),
			w4_damage_type = caster:GetTalentValue("modifier_lina_array_4", "damage_type", true),

			has_w7 = 0,
			w7_effect_duration = caster:GetTalentValue("modifier_lina_array_7", "effect_duration", true),
			w7_max = caster:GetTalentValue("modifier_lina_array_7", "max", true),
			w7_cd_inc = caster:GetTalentValue("modifier_lina_array_7", "cd_inc", true) / 100,
			w7_duration = caster:GetTalentValue("modifier_lina_array_7", "duration", true),
			w7_range = caster:GetTalentValue("modifier_lina_array_7", "range", true),

			has_h6 = 0,
			h6_cdr = caster:GetTalentValue("modifier_lina_hero_6", "cdr", true),
			h6_max = caster:GetTalentValue("modifier_lina_hero_6", "max", true),
			h6_cast = caster:GetTalentValue("modifier_lina_hero_6", "cast", true),
			h6_radius = caster:GetTalentValue("modifier_lina_hero_6", "radius", true),
		}
	end

	if caster:HasTalent("modifier_lina_array_1") then
		self.talents.has_w1 = 1
		self.talents.w1_int = caster:GetTalentValue("modifier_lina_array_1", "int") / 100
		self.talents.w1_damage = caster:GetTalentValue("modifier_lina_array_1", "damage") / 100
		if IsServer() then
			caster:AddPercentStat({ int = self.talents.w1_int }, self.tracker)
			caster:AddProc(self.tracker, { name = "hit", land = true })
			caster:AddProc(self.tracker, { land = true })
		end
	end

	if caster:HasTalent("modifier_lina_array_2") then
		self.talents.has_w2 = 1
		self.talents.w2_range = caster:GetTalentValue("modifier_lina_array_2", "range")
		self.talents.w2_heal = caster:GetTalentValue("modifier_lina_array_2", "heal") / 100
		caster:AddProc(self.tracker, { name = "hit", land = true })
	end

	if caster:HasTalent("modifier_lina_array_3") then
		self.talents.has_w3 = 1
		self.talents.w3_cd = caster:GetTalentValue("modifier_lina_array_3", "cd")
		self.talents.w3_damage = caster:GetTalentValue("modifier_lina_array_3", "damage")
	end

	if caster:HasTalent("modifier_lina_array_4") then
		self.talents.has_w4 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true })
	end

	if caster:HasTalent("modifier_lina_array_7") then
		self.talents.has_w7 = 1
		self.tracker:UpdateUI()
		caster:AddAttackStartEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_lina_hero_6") then
		self.talents.has_h6 = 1
	end
end

function lina_light_strike_array_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "lina_light_strike_array", self)
end

function lina_light_strike_array_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_lina_light_strike_array_custom_tracker"
end

function lina_light_strike_array_custom:GetCooldown(iLevel)
	local k = 1
	if self.caster:HasModifier("modifier_lina_light_strike_array_custom_legendary") then
		k = 1 + self.talents.w7_cd_inc
	end
	return (self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w3_cd or 0)) * k
end

function lina_light_strike_array_custom:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.caster:HasModifier("modifier_lina_light_strike_array_custom_legendary") and self.talents.w7_range or 0)
end

function lina_light_strike_array_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h6 == 1 and self.talents.h6_cast or 0)
end

function lina_light_strike_array_custom:GetAOERadius()
	return (self.light_strike_array_aoe or 0) + (self.talents.has_h6 == 1 and self.talents.h6_radius or 0)
end

function lina_light_strike_array_custom:GetCastAnimation()
	if self.talents.has_h6 == 1 then
		return 0
	end
	return ACT_DOTA_CAST_ABILITY_2
end

function lina_light_strike_array_custom:OnAbilityPhaseStart()
	if self.talents.has_h6 == 1 then
		local cast = self.BaseClass.GetCastPoint(self)
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, cast / (self:GetCastPoint()) * 0.5)
	end
	return true
end

function lina_light_strike_array_custom:OnAbilityPhaseInterrupted()
	if self.talents.has_h6 == 0 then
		return
	end
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_2)
end

function lina_light_strike_array_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_lina_light_strike_array_custom",
		{ duration = self.light_strike_array_delay_time },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function lina_light_strike_array_custom:OnProjectileHit(target, vLocation)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	self.caster.lina_w3_attack = true
	self.caster:PerformAttack(target, true, true, true, true, false, false, false, { damage = "lina_w3" })
	self.caster.lina_w3_attack = false
	target:EmitSound("Lina.Soul_attack_end")
end

function lina_light_strike_array_custom:PlayEffect(point, radius)
	if not IsServer() then
		return
	end
	local particle_name_stun = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_lina/lina_spell_light_strike_array.vpcf",
		self
	)
	local particle_end = ParticleManager:CreateParticle(particle_name_stun, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle_end, 0, point)
	ParticleManager:SetParticleControl(particle_end, 1, Vector(radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(particle_end)

	EmitSoundOnLocationWithCaster(
		point,
		wearables_system:GetSoundReplacement(self.caster, "Ability.LightStrikeArray", self),
		self.caster
	)
end

modifier_lina_light_strike_array_custom = class(mod_hidden)
function modifier_lina_light_strike_array_custom:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.point = self.parent:GetAbsOrigin()

	self.radius = self.ability:GetAOERadius()
	self.damage = self.ability.light_strike_array_damage

	local particlename = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_lina/lina_spell_light_strike_array_ray_team.vpcf",
		self.ability
	)

	local particle = ParticleManager:CreateParticleForTeam(
		particlename,
		PATTACH_WORLDORIGIN,
		self.caster,
		self.caster:GetTeamNumber()
	)
	ParticleManager:SetParticleControl(particle, 0, self.point)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(particle)

	local cast_sound = wearables_system:GetSoundReplacement(self.caster, "Ability.PreLightStrikeArray", self.ability)
	EmitSoundOnLocationForAllies(self.point, cast_sound, self.caster)
end

function modifier_lina_light_strike_array_custom:OnDestroy()
	if not IsServer() then
		return
	end

	GridNav:DestroyTreesAroundPoint(self.parent:GetAbsOrigin(), self.radius, false)

	local enemies = self.caster:FindTargets(self.radius, self.point)
	for _, enemy in pairs(enemies) do
		if enemy:IsRealHero() then
			self.caster:AddNewModifier(self.caster, self.ability, "modifier_lina_light_strike_array_custom_cdr", {})
			if self.caster:GetQuest() == "Lina.Quest_6" then
				self.caster:UpdateQuest(1)
			end
		end
		if self.caster:GetQuest() == "Lina.Quest_7" and enemy:IsRealHero() and not self.caster:QuestCompleted() then
			enemy:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_lina_fiery_soul_custom_quest",
				{ duration = self.caster.quest.number }
			)
		end

		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_stunned",
			{ duration = self.ability.light_strike_array_stun_duration * (1 - enemy:GetStatusResistance()) }
		)
		DoDamage({
			victim = enemy,
			attacker = self.caster,
			damage = self.damage,
			damage_type = DAMAGE_TYPE_MAGICAL,
			ability = self.ability,
		})

		if IsValid(self.caster.lina_innate) then
			self.caster.lina_innate:ApplyBurn(enemy, self.damage)
		end
	end

	self.caster:RemoveModifierByName("modifier_lina_light_strike_array_custom_root_cd")
	self.caster:RemoveModifierByName("modifier_lina_light_strike_array_custom_double")

	if self.ability.talents.has_w3 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_lina_light_strike_array_custom_double",
			{ duration = self.ability.talents.w3_duration }
		)
	end

	self.ability:PlayEffect(self.point, self.radius)
	UTIL_Remove(self.parent)
end

modifier_lina_light_strike_array_custom_tracker = class(mod_hidden)
function modifier_lina_light_strike_array_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.array_ability = self.ability
	self.legendary_ability = self.parent:FindAbilityByName("lina_light_strike_array_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.ability.light_strike_array_aoe = self.ability:GetSpecialValueFor("light_strike_array_aoe")
	self.ability.light_strike_array_delay_time = self.ability:GetSpecialValueFor("light_strike_array_delay_time")
	self.ability.light_strike_array_stun_duration = self.ability:GetSpecialValueFor("light_strike_array_stun_duration")
	self.ability.light_strike_array_damage = self.ability:GetSpecialValueFor("light_strike_array_damage")

	if not IsServer() then
		return
	end
	self.damageTable =
		{ attacker = self.parent, ability = self.ability, damage_type = self.ability.talents.w1_damage_type }
end

function modifier_lina_light_strike_array_custom_tracker:OnRefresh()
	self.ability.light_strike_array_stun_duration = self.ability:GetSpecialValueFor("light_strike_array_stun_duration")
	self.ability.light_strike_array_damage = self.ability:GetSpecialValueFor("light_strike_array_damage")
end

function modifier_lina_light_strike_array_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	local target = params.target
	if not target:IsUnit() then
		return
	end

	if
		self.ability.talents.has_w7 == 1
		and not target:IsCreep()
		and not self.parent:HasModifier("modifier_lina_light_strike_array_custom_legendary")
		and self.legendary_ability
		and self.legendary_ability:GetCooldownTimeRemaining() <= 0
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_light_strike_array_custom_legendary_stack",
			{ duration = self.ability.talents.w7_effect_duration }
		)
	end
end

function modifier_lina_light_strike_array_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	return self.ability.talents.w1_chance
end

function modifier_lina_light_strike_array_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	local target = params.target

	if self.ability.talents.has_w2 == 1 then
		local result = self.parent:CanLifesteal(target)
		if result then
			self.parent:GenericHeal(
				self.parent:GetIntellect(false) * self.ability.talents.w2_heal * result,
				self.ability,
				true,
				"",
				"modifier_lina_array_2"
			)
		end
	end

	if
		self.ability.talents.has_w4 == 1
		and not self.parent:HasModifier("modifier_lina_light_strike_array_custom_root_cd")
		and not target:IsStunned()
		and target:IsHero()
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_light_strike_array_custom_root_cd",
			{ duration = self.ability.talents.w4_talent_cd }
		)
		target:RemoveModifierByName("modifier_lina_light_strike_array_custom_root")
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_light_strike_array_custom_root",
			{ duration = self.ability.talents.w4_root * (1 - target:GetStatusResistance()) }
		)
	end

	if not params.procs[self].default then
		return
	end

	target:EmitSound("Lina.Soul_slow")

	local hit_effect =
		ParticleManager:CreateParticle("particles/lina/array_attac_proc.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControl(hit_effect, 1, Vector(self.ability.talents.w1_radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(hit_effect)

	self.damageTable.damage = self.parent:GetIntellect(false) * self.ability.talents.w1_damage
	for _, enemy in pairs(self.parent:FindTargets(self.ability.talents.w1_radius, target:GetAbsOrigin())) do
		self.damageTable.victim = enemy
		DoDamage(self.damageTable, "modifier_lina_array_1")
	end
end

function modifier_lina_light_strike_array_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end

	local stack = 0
	local override = nil
	local zero = nil
	local active = 0
	local interval = -1
	local max = self.ability.talents.w7_max
	local mod = self.parent:FindModifierByName("modifier_lina_light_strike_array_custom_legendary_stack")
	local effect = self.parent:FindModifierByName("modifier_lina_light_strike_array_custom_legendary")

	if mod then
		stack = mod:GetStackCount()
	end

	if effect then
		active = 1
		zero = 1
		stack = effect:GetRemainingTime()
		override = effect:GetRemainingTime()
		max = self.ability.talents.w7_duration
	end

	if self.legendary_ability and self.legendary_ability:GetCooldownTimeRemaining() > 0 then
		override = self.legendary_ability:GetCooldownTimeRemaining()
		stack = 0
		interval = 1
	end

	self.parent:UpdateUIlong({
		stack = stack,
		max = max,
		override_stack = override,
		priority = 2,
		use_zero = zero,
		active = active,
		style = "LinaArray",
	})
	self:StartIntervalThink(interval)
end

function modifier_lina_light_strike_array_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:UpdateUI()
end

function modifier_lina_light_strike_array_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_PROJECTILE_SPEED_BONUS,
	}
end

function modifier_lina_light_strike_array_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if not IsServer() then
		return
	end
	if not self.parent.lina_w3_attack then
		return
	end
	return self.ability.talents.w3_damage - 100
end

function modifier_lina_light_strike_array_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.w2_range
end

function modifier_lina_light_strike_array_custom_tracker:GetModifierProjectileSpeedBonus()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_speed
end

modifier_lina_light_strike_array_custom_cdr = class(mod_hidden)
function modifier_lina_light_strike_array_custom_cdr:IsHidden()
	return self.ability.talents.has_h6 == 0 or self:GetStackCount() >= self.ability.talents.h6_max
end
function modifier_lina_light_strike_array_custom_cdr:RemoveOnDeath()
	return false
end
function modifier_lina_light_strike_array_custom_cdr:GetTexture()
	return "buffs/lina/hero_6"
end
function modifier_lina_light_strike_array_custom_cdr:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.h6_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:IncrementStackCount()
end

function modifier_lina_light_strike_array_custom_cdr:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_lina_light_strike_array_custom_cdr:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_lina_light_strike_array_custom_cdr:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_lina_light_strike_array_custom_cdr:GetModifierPercentageCooldown()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return (self.ability.talents.h6_cdr / self.max) * self:GetStackCount()
end

modifier_lina_light_strike_array_custom_root_cd = class(mod_cd)
function modifier_lina_light_strike_array_custom_root_cd:GetTexture()
	return "buffs/lina/array_4"
end

modifier_lina_light_strike_array_custom_root = class(mod_hidden)
function modifier_lina_light_strike_array_custom_root:IsPurgable()
	return true
end
function modifier_lina_light_strike_array_custom_root:GetEffectName()
	return "particles/units/heroes/hero_ember_spirit/ember_spirit_searing_chains_debuff.vpcf"
end
function modifier_lina_light_strike_array_custom_root:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_lina_light_strike_array_custom_root:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/primal_beast/beast_root.vpcf", self)

	self.max = self.ability.talents.w4_ticks
	self.interval = self:GetRemainingTime() / self.max

	local damage = self.ability.talents.w4_damage * self.caster:GetIntellect(false) / self.max
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.w4_damage_type,
		damage = damage,
	}

	self.parent:EmitSound("Lina.Array_root")
	self.parent:EmitSound("Lina.Array_root2")
	self.count = 0

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_lina_light_strike_array_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_lina_light_strike_array_custom_root:OnIntervalThink()
	if not IsServer() then
		return
	end

	DoDamage(self.damageTable, "modifier_lina_array_4")
	self.count = self.count + 1

	if self.count >= self.max then
		self:StartIntervalThink(-1)
	end
end

modifier_lina_light_strike_array_custom_legendary_stack = class(mod_hidden)
function modifier_lina_light_strike_array_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.max = self.ability.talents.w7_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_lina_light_strike_array_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
	self.ability.tracker:UpdateUI()
end

function modifier_lina_light_strike_array_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.tracker:UpdateUI()
end

modifier_lina_light_strike_array_custom_double = class(mod_visible)
function modifier_lina_light_strike_array_custom_double:GetTexture()
	return "buffs/lina/array_3"
end
function modifier_lina_light_strike_array_custom_double:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:SetStackCount(self.ability.talents.w3_max)
	self.parent:AddAttackStartEvent_out(self, true)
end

function modifier_lina_light_strike_array_custom_double:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	local target = params.target

	if not params.target:IsUnit() then
		return
	end

	Timers:CreateTimer(0.15, function()
		if IsValid(target) then
			local info = {
				EffectName = "particles/lina/soul_attack.vpcf",
				Ability = self.ability,
				iMoveSpeed = self.parent:GetProjectileSpeed(),
				Source = self.parent,
				Target = target,
				bDodgeable = false,
				bProvidesVision = false,
				iSourceAttachment = RandomInt(1, 2) == 1 and DOTA_PROJECTILE_ATTACHMENT_ATTACK_1
					or DOTA_PROJECTILE_ATTACHMENT_ATTACK_2,
			}
			self.parent:EmitSound("Lina.Soul_attack_start")
			ProjectileManager:CreateTrackingProjectile(info)

			if self.ability.tracker then
				self.ability.tracker:AttackStartEvent_out({ attacker = self.parent, target = target })
			end
		end
	end)

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
	end
end

lina_light_strike_array_custom_legendary = class({})
lina_light_strike_array_custom_legendary.talents = {}

function lina_light_strike_array_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_talent_cd = caster:GetTalentValue("modifier_lina_array_7", "talent_cd", true),
			w7_duration = caster:GetTalentValue("modifier_lina_array_7", "duration", true),
			w7_max = caster:GetTalentValue("modifier_lina_array_7", "max", true),
			w7_duration_k = caster:GetTalentValue("modifier_lina_array_7", "duration_k", true),
			w7_heal = caster:GetTalentValue("modifier_lina_array_7", "heal", true) / 100,
			w7_cd_inc = caster:GetTalentValue("modifier_lina_array_7", "cd_inc", true) / 100,
		}
	end
end

function lina_light_strike_array_custom_legendary:GetCooldown()
	return (self.talents.w7_talent_cd or 0)
end

function lina_light_strike_array_custom_legendary:OnAbilityPhaseStart()
	local mod = self.caster:FindModifierByName("modifier_lina_light_strike_array_custom_legendary_stack")
	if not mod or mod:GetStackCount() <= 0 then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetPlayerOwnerID()),
			"CreateIngameErrorMessage",
			{ message = "#dota_hud_error_no_charges" }
		)
		return false
	end
	return true
end

function lina_light_strike_array_custom_legendary:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_lina_light_strike_array_custom_legendary_stack")
	if not mod or mod:GetStackCount() <= 0 then
		return
	end

	local duration = self.talents.w7_duration
		* math.pow(mod:GetStackCount() / self.talents.w7_max, self.talents.w7_duration_k)
	self.caster:GenericHeal(
		self.caster:GetMaxHealth() * self.talents.w7_heal * mod:GetStackCount() / self.talents.w7_max,
		self,
		false,
		"",
		"modifier_lina_array_7"
	)

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_lina_light_strike_array_custom_legendary",
		{ duration = duration }
	)
	mod:Destroy()
end

function lina_light_strike_array_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

modifier_lina_light_strike_array_custom_legendary = class(mod_hidden)
function modifier_lina_light_strike_array_custom_legendary:GetEffectName()
	return "particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf"
end
function modifier_lina_light_strike_array_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_lina_flame_cloak.vpcf"
end
function modifier_lina_light_strike_array_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_lina_light_strike_array_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.array_ability = self.parent.array_ability
	self.ability:EndCd()

	if self.array_ability then
		local cd = self.array_ability:GetCooldownTimeRemaining()
		if cd > 0 then
			self.parent:CdAbility(self.array_ability, cd * self.ability.talents.w7_cd_inc, nil, "modifier_lina_array_7")
		end
	end

	self.parent:EmitSound("Lina.Array_legendary_start")
	self.parent:EmitSound("Lina.Array_legendary_start2")
	self.parent:EmitSound("Lina.Array_legendary_loop")

	local effect =
		ParticleManager:CreateParticle("particles/lina/array_legendary_caster.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	self:AddParticle(effect, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_lina_light_strike_array_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_FLYING] = true,
		[MODIFIER_STATE_FORCED_FLYING_VISION] = true,
	}
end

function modifier_lina_light_strike_array_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if IsValid(self.array_ability) and self.array_ability.tracker then
		self.array_ability.tracker:UpdateUI()
	end
end

function modifier_lina_light_strike_array_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if IsValid(self.array_ability) and self.array_ability.tracker then
		self.array_ability.tracker:UpdateUI()
	end
	self.parent:StopSound("Lina.Array_legendary_loop")
end

function modifier_lina_light_strike_array_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
	}
end

function modifier_lina_light_strike_array_custom_legendary:GetVisualZDelta()
	return math.min(100, self:GetElapsedTime() * 350)
end

function modifier_lina_light_strike_array_custom_legendary:GetModifierModelScale()
	return 25
end