--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ogre_magi_ignite_custom",
	"abilities/ogre_magi/ogre_magi_ignite",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_ogre_magi_ignite_custom_tracker",
	"abilities/ogre_magi/ogre_magi_ignite",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_ignite_custom_silence",
	"abilities/ogre_magi/ogre_magi_ignite",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_hero_5"
)
LinkLuaModifier(
	"modifier_ogre_magi_ignite_custom_slow",
	"abilities/ogre_magi/ogre_magi_ignite",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_ignite_custom_buff",
	"abilities/ogre_magi/ogre_magi_ignite",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ogremagi_ignite_3", "modifier_ogremagi_ignite_4", "modifier_ogremagi_ignite_7" }
)
LinkLuaModifier(
	"modifier_ogre_magi_ignite_custom_legendary_damage",
	"abilities/ogre_magi/ogre_magi_ignite",
	LUA_MODIFIER_MOTION_NONE
)

ogre_magi_ignite_custom = class({})
ogre_magi_ignite_custom.talents = {}

function ogre_magi_ignite_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_ignite.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_ignite_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ignite_aoe_proc.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/ogre_magi/ogre_magi_arcana/ogre_magi_arcana_fireblast.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/econ/items/ogre_magi/ogre_magi_arcana/ogre_magi_arcana_ignite_debuff_explosion.vpcf",
		context
	)
end

function ogre_magi_ignite_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_damage = 0,
			w1_bonus = 0,

			w2_cd = 0,
			w2_heal = 0,
			w2_bonus = caster:GetTalentValue("modifier_ogremagi_ignite_2", "bonus", true),

			has_w3 = 0,
			w3_bva = 0,
			w3_damage = 0,
			w3_slow = caster:GetTalentValue("modifier_ogremagi_ignite_3", "slow", true),
			w3_duration = caster:GetTalentValue("modifier_ogremagi_ignite_3", "duration", true),
			w3_radius = caster:GetTalentValue("modifier_ogremagi_ignite_3", "radius", true),
			w3_chance = caster:GetTalentValue("modifier_ogremagi_ignite_3", "chance", true),
			w3_slow_duration = caster:GetTalentValue("modifier_ogremagi_ignite_3", "slow_duration", true),
			w3_cd = caster:GetTalentValue("modifier_ogremagi_ignite_3", "cd", true),

			has_w4 = 0,
			w4_duration = caster:GetTalentValue("modifier_ogremagi_ignite_4", "duration", true),
			w4_range = caster:GetTalentValue("modifier_ogremagi_ignite_4", "range", true),
			w4_cd = caster:GetTalentValue("modifier_ogremagi_ignite_4", "cd", true),

			has_w7 = 0,
			w7_duration = caster:GetTalentValue("modifier_ogremagi_ignite_7", "duration", true),
			w7_damage = caster:GetTalentValue("modifier_ogremagi_ignite_7", "damage", true) / 100,
			w7_damage_reduce = caster:GetTalentValue("modifier_ogremagi_ignite_7", "damage_reduce", true) / 100,
			w7_chance = caster:GetTalentValue("modifier_ogremagi_ignite_7", "chance", true),
			w7_duration_inc = caster:GetTalentValue("modifier_ogremagi_ignite_7", "duration_inc", true),
			w7_cd = caster:GetTalentValue("modifier_ogremagi_ignite_7", "cd", true),

			has_h5 = 0,
			h5_talent_cd = caster:GetTalentValue("modifier_ogremagi_hero_5", "talent_cd", true),
			h5_slow = caster:GetTalentValue("modifier_ogremagi_hero_5", "slow", true),
			h5_silence = caster:GetTalentValue("modifier_ogremagi_hero_5", "silence", true),
			h5_cast = caster:GetTalentValue("modifier_ogremagi_hero_5", "cast", true),

			has_e3 = 0,
			e3_duration = caster:GetTalentValue("modifier_ogremagi_bloodlust_3", "duration", true),

			has_e7 = 0,
		}
	end

	if caster:HasTalent("modifier_ogremagi_ignite_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_ogremagi_ignite_1", "damage")
		self.talents.w1_bonus = caster:GetTalentValue("modifier_ogremagi_ignite_1", "bonus") / 100
	end

	if caster:HasTalent("modifier_ogremagi_ignite_2") then
		self.talents.w2_cd = caster:GetTalentValue("modifier_ogremagi_ignite_2", "cd")
		self.talents.w2_heal = caster:GetTalentValue("modifier_ogremagi_ignite_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_ogremagi_ignite_2",
			value = function(params)
				if not params.inflictor then
					return self.talents.w2_heal
				end
				if params.inflictor ~= self then
					return 0
				end
				return self.talents.w2_heal * self.talents.w2_bonus
			end,
		})
	end

	if caster:HasTalent("modifier_ogremagi_ignite_3") then
		self.talents.has_w3 = 1
		self.talents.w3_bva = caster:GetTalentValue("modifier_ogremagi_ignite_3", "bva")
		self.talents.w3_damage = caster:GetTalentValue("modifier_ogremagi_ignite_3", "damage") / 100
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_ogremagi_ignite_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_ogremagi_ignite_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_ogremagi_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_3") then
		self.talents.has_e3 = 1
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_7") then
		self.talents.has_e7 = 1
	end
end

function ogre_magi_ignite_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "ogre_magi_ignite", self)
end

function ogre_magi_ignite_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ogre_magi_ignite_custom_tracker"
end

function ogre_magi_ignite_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
		+ (self.talents.w2_cd or 0)
		+ (
			self.talents.has_w7 == 1 and self.talents.w7_cd
			or self.talents.has_w4 == 1 and self.talents.w4_cd
			or self.talents.has_w3 == 1 and self.talents.w3_cd
			or 0
		)
end

function ogre_magi_ignite_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_h5 == 1 and self.talents.h5_cast or 0)
end

function ogre_magi_ignite_custom:GetAOERadius()
	return self.aoe_radius or 0
end

function ogre_magi_ignite_custom:GetDamage(target, is_proc)
	local result = (self.burn_damage + self.caster:GetAverageTrueAttackDamage(nil) * self.talents.w1_bonus)
	if self.talents.has_w7 == 1 and not is_proc then
		result = result * (1 + self.talents.w7_damage_reduce)
	end
	return result
end

function ogre_magi_ignite_custom:OnSpellStart(new_target)
	local target = new_target or self:GetCursorTarget()
	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_ogre_magi/ogre_magi_ignite.vpcf",
		self
	)

	local is_cast = 1
	if new_target then
		is_cast = 0
	end

	local info = {
		Target = target,
		Source = self.caster,
		Ability = self,
		EffectName = particle_name,
		iMoveSpeed = self.projectile_speed,
		bDodgeable = true,
		ExtraData = {
			is_cast = is_cast,
		},
	}

	for _, enemy in pairs(self.caster:FindTargets(self.aoe_radius, target:GetAbsOrigin())) do
		info.Target = enemy
		ProjectileManager:CreateTrackingProjectile(info)
	end

	if (self.talents.has_w4 == 1 or self.talents.has_w7 == 1 or self.talents.has_w3 == 1) and not new_target then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_ogre_magi_ignite_custom_buff",
			{
				duration = self.talents.has_w7 == 1 and self.talents.w7_duration
					or self.talents.has_w4 == 1 and self.talents.w4_duration
					or self.talents.w3_duration,
			}
		)
	end

	if self.talents.has_e3 == 1 and self.talents.has_e7 == 0 and IsValid(self.caster.bloodlust_ability) then
		self.caster:AddNewModifier(
			self.caster,
			self.caster.bloodlust_ability,
			"modifier_ogre_magi_bloodlust_custom_str",
			{ duration = self.talents.e3_duration }
		)
	end

	self.caster:EmitSound("Hero_OgreMagi.Ignite.Cast")
end

function ogre_magi_ignite_custom:OnProjectileHit_ExtraData(target, location, data)
	if not IsServer() then
		return
	end
	if not target then
		return
	end
	if target:TriggerSpellAbsorb(self) then
		return
	end

	if data.is_cast == 1 and IsValid(self.caster.ogre_innate) then
		self.caster.ogre_innate:AbilityTarget(target, self)
	end

	local duration = self.duration + (self.talents.has_w7 == 1 and self.talents.w7_duration_inc or 0)

	self:ApplySilence(target, "ogre_h5_start")

	local mod = target:FindModifierByName("modifier_ogre_magi_ignite_custom")
	if mod and self.talents.has_w7 == 0 then
		mod:SetDuration(math.min(self.duration_max, mod:GetRemainingTime() + self.duration_inc), true)
	else
		target:AddNewModifier(self.caster, self, "modifier_ogre_magi_ignite_custom", { duration = duration })
	end

	target:EmitSound("Hero_OgreMagi.Ignite.Target")
end

function ogre_magi_ignite_custom:ApplySilence(target, type)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_h5 == 0 then
		return
	end
	if not target:CheckCd(type, self.talents.h5_talent_cd) then
		return
	end

	target:RemoveModifierByName("modifier_ogre_magi_ignite_custom_silence")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_ogre_magi_ignite_custom_silence",
		{ duration = (1 - target:GetStatusResistance()) * self.talents.h5_silence }
	)
end

modifier_ogre_magi_ignite_custom = class(mod_visible)
function modifier_ogre_magi_ignite_custom:IsPurgable()
	return true
end
function modifier_ogre_magi_ignite_custom:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.slow_movement_speed_pct

	if not IsServer() then
		return
	end

	local effect_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_ogre_magi/ogre_magi_ignite_debuff.vpcf",
		self
	)
	self.parent:GenericParticle(effect_name, self)

	self.duration = self:GetRemainingTime()
	self.interval = 0.5

	self:AddStack()

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self.ability }
	self:StartIntervalThink(self.interval)
end

function modifier_ogre_magi_ignite_custom:OnRefresh()
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_ogre_magi_ignite_custom:AddStack()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end

	self:IncrementStackCount()
	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
				return
			end
		end
	end)
end

function modifier_ogre_magi_ignite_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ogre_magi_ignite_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_ogre_magi_ignite_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local damage = self.ability:GetDamage(self.parent) * self.interval
	if self.ability.talents.has_w7 == 1 then
		damage = damage * self:GetStackCount()
	end
	self.damageTable.damage = damage
	DoDamage(self.damageTable)

	self.parent:EmitSound("Hero_OgreMagi.Ignite.Damage")
end

function modifier_ogre_magi_ignite_custom:OnDestroy()
	if not IsServer() then
		return
	end
	if self:GetRemainingTime() <= 0.1 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	self.ability:ApplySilence(self.parent, "ogre_h5_end")

	if self.ability.talents.has_w7 == 0 then
		return
	end

	local damage = self:GetStackCount()
		* self.ability:GetDamage(self.parent)
		* self:GetRemainingTime()
		* self.ability.talents.w7_damage
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_ogre_magi_ignite_custom_legendary_damage",
		{ damage = damage, caster = self.caster:entindex() }
	)
end

modifier_ogre_magi_ignite_custom_tracker = class(mod_hidden)
function modifier_ogre_magi_ignite_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.ignite_ability = self.ability

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.burn_damage = self.ability:GetSpecialValueFor("burn_damage")
	self.ability.slow_movement_speed_pct = self.ability:GetSpecialValueFor("slow_movement_speed_pct")
	self.ability.projectile_speed = self.ability:GetSpecialValueFor("projectile_speed")
	self.ability.multicast_delay = self.ability:GetSpecialValueFor("multicast_delay")
	self.ability.aoe_radius = self.ability:GetSpecialValueFor("aoe_radius")
	self.ability.duration_inc = self.ability:GetSpecialValueFor("duration_inc")
	self.ability.duration_max = self.ability:GetSpecialValueFor("duration_max")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.damageTable = { attacker = self.parent, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }
end

function modifier_ogre_magi_ignite_custom_tracker:OnRefresh()
	self.ability.burn_damage = self.ability:GetSpecialValueFor("burn_damage")
end

function modifier_ogre_magi_ignite_custom_tracker:GetProcChance()
	return self.ability.talents.w3_chance
end

function modifier_ogre_magi_ignite_custom_tracker:AttackProc(params)
	local target = params.target
	local point = target:GetAbsOrigin()

	local particle = ParticleManager:CreateParticle(
		"particles/econ/items/ogre_magi/ogre_magi_arcana/ogre_magi_arcana_ignite_debuff_explosion.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(particle, 0, target, PATTACH_POINT_FOLLOW, "attach_hitloc", point, true)
	ParticleManager:SetParticleControlEnt(particle, 3, target, PATTACH_POINT_FOLLOW, "attach_hitloc", point, true)
	ParticleManager:ReleaseParticleIndex(particle)

	local particle2 =
		ParticleManager:CreateParticle("particles/ogre_magi/ignite_aoe_proc.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle2, 0, point)
	ParticleManager:Delete(particle2, 1)

	for _, aoe_target in pairs(self.parent:FindTargets(self.ability.talents.w3_radius, point)) do
		self.damageTable.damage = self.ability:GetDamage(aoe_target, true) * self.ability.talents.w3_damage
		self.damageTable.victim = aoe_target
		DoDamage(self.damageTable, "modifier_ogremagi_ignite_3")

		aoe_target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_ogre_magi_ignite_custom_slow",
			{ duration = self.ability.talents.w3_slow_duration }
		)
	end

	target:EmitSound("Ogre.Ignite_hit")
end

function modifier_ogre_magi_ignite_custom_tracker:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if not params.ranged_attack then
		return
	end
	local target = params.target

	target:EmitSound("Ogre.Ingnite_ranged_target")
end

function modifier_ogre_magi_ignite_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
	}
end

function modifier_ogre_magi_ignite_custom_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.w1_damage
end

modifier_ogre_magi_ignite_custom_silence = class(mod_hidden)
function modifier_ogre_magi_ignite_custom_silence:IsPurgable()
	return true
end
function modifier_ogre_magi_ignite_custom_silence:GetEffectName()
	return "particles/generic_gameplay/generic_silenced.vpcf"
end
function modifier_ogre_magi_ignite_custom_silence:ShouldUseOverheadOffset()
	return true
end
function modifier_ogre_magi_ignite_custom_silence:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_ogre_magi_ignite_custom_silence:GetStatusEffectName()
	return "particles/status_fx/status_effect_huskar_lifebreak.vpcf"
end
function modifier_ogre_magi_ignite_custom_silence:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_ogre_magi_ignite_custom_silence:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.h5_slow
	if not IsServer() then
		return
	end
	self.parent:EmitSound("SF.Raze_silence")
end

function modifier_ogre_magi_ignite_custom_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_ogre_magi_ignite_custom_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ogre_magi_ignite_custom_silence:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_ogre_magi_ignite_custom_slow = class(mod_hidden)
function modifier_ogre_magi_ignite_custom_slow:IsPurgable()
	return true
end
function modifier_ogre_magi_ignite_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.w3_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", self, true)
end

function modifier_ogre_magi_ignite_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ogre_magi_ignite_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_ogre_magi_ignite_custom_buff = class(mod_hidden)
function modifier_ogre_magi_ignite_custom_buff:GetStatusEffectName()
	return "particles/status_fx/status_effect_lina_flame_cloak.vpcf"
end
function modifier_ogre_magi_ignite_custom_buff:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_ogre_magi_ignite_custom_buff:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.parent:GetBaseAttackTime(false) + self.ability.talents.w3_bva

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.ability:EndCd()
	self.parent:GenericParticle(
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		self
	)

	if self.ability.talents.has_w4 == 1 then
		self.parent:SetAttackCapability(DOTA_UNIT_CAP_RANGED_ATTACK)
	end

	if self.ability.talents.has_w7 == 1 then
		self.parent:AddProc(self, {})
	end

	self.parent:EmitSound("Ogre.Ignite_legendary_start")

	self.max_time = self:GetRemainingTime()
	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_ogre_magi_ignite_custom_buff:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		style = "OgreIgnite",
	})
end

function modifier_ogre_magi_ignite_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "OgreIgnite" })

	if self.ability.talents.has_w4 == 1 then
		self.parent:SetAttackCapability(DOTA_UNIT_CAP_MELEE_ATTACK)
	end
end

function modifier_ogre_magi_ignite_custom_buff:GetProcChance()
	return self.ability.talents.w7_chance
end

function modifier_ogre_magi_ignite_custom_buff:AttackProcStart(params)
	self.ability:OnSpellStart(params.target)
end

function modifier_ogre_magi_ignite_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BASE_OVERRIDE,
		MODIFIER_PROPERTY_TRANSLATE_ATTACK_SOUND,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_ogre_magi_ignite_custom_buff:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_ogre_magi_ignite_custom_buff:GetModifierModelScale()
	return 15
end

function modifier_ogre_magi_ignite_custom_buff:GetAttackSound()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return "Ogre.Ingnite_ranged_attack"
end

function modifier_ogre_magi_ignite_custom_buff:GetModifierAttackRangeOverride()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_range
end

modifier_ogre_magi_ignite_custom_legendary_damage = class(mod_hidden)
function modifier_ogre_magi_ignite_custom_legendary_damage:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_ogre_magi_ignite_custom_legendary_damage:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = EntIndexToHScript(table.caster)

	self.damage = table.damage

	self.damageTable = {
		attacker = self.caster,
		ability = self.ability,
		damage = self.damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
		victim = self.parent,
	}
	self:StartIntervalThink(FrameTime())
end

function modifier_ogre_magi_ignite_custom_legendary_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.parent:IsInvulnerable() or self.parent:IsOutOfGame() then
		return
	end

	self:Destroy()
end

function modifier_ogre_magi_ignite_custom_legendary_damage:OnDestroy()
	if not IsServer() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/econ/items/ogre_magi/ogre_magi_arcana/ogre_magi_arcana_fireblast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(particle)
	self.parent:EmitSound("Hero_OgreMagi.Fireblast.Target")

	local real_damage = DoDamage(self.damageTable, "modifier_ogremagi_ignite_7")
	self.parent:SendNumber(109, real_damage)
end