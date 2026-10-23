--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_hoodwink_scurry_custom",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_buff",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_legendary",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_scurry_7"
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_cd",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_speed",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_scurry_1"
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_attacks",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_attack_thinker",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_scurry_custom_attack_mod",
	"abilities/hoodwink/hoodwink_scurry_custom",
	LUA_MODIFIER_MOTION_NONE
)

hoodwink_scurry_custom = class({})
hoodwink_scurry_custom.talents = {}

function hoodwink_scurry_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items3_fx/blink_swift_start.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_swift_end.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_scurry_passive.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_scurry_aura.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/hoodwink_head.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/scurry_proj.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/hoodwink_ground.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_slow.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/scurry_shield.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/acorn_refresh.vpcf", context)
end

function hoodwink_scurry_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_e1 = 0,
			e1_speed = 0,
			e1_agi = 0,
			e1_duration = caster:GetTalentValue("modifier_hoodwink_scurry_1", "duration", true),

			e2_move = 0,
			e2_duration = 0,

			has_e3 = 0,
			e3_range = 0,
			e3_attacks = 0,
			e3_duration = caster:GetTalentValue("modifier_hoodwink_scurry_3", "duration", true),

			has_e4 = 0,
			e4_range = caster:GetTalentValue("modifier_hoodwink_scurry_4", "range", true),
			e4_talent_cd = caster:GetTalentValue("modifier_hoodwink_scurry_4", "talent_cd", true),
			e4_chance = caster:GetTalentValue("modifier_hoodwink_scurry_4", "chance", true),
			e4_slow_resist = caster:GetTalentValue("modifier_hoodwink_scurry_4", "slow_resist", true),

			has_e7 = 0,
			e7_bva = caster:GetTalentValue("modifier_hoodwink_scurry_7", "bva", true),
			e7_heal = caster:GetTalentValue("modifier_hoodwink_scurry_7", "heal", true) / 100,
			e7_distance = caster:GetTalentValue("modifier_hoodwink_scurry_7", "distance", true),
			e7_duration = caster:GetTalentValue("modifier_hoodwink_scurry_7", "duration", true),
			e7_damage = caster:GetTalentValue("modifier_hoodwink_scurry_7", "damage", true),
			e7_damage_type = caster:GetTalentValue("modifier_hoodwink_scurry_7", "damage_type", true),
		}
	end

	if caster:HasTalent("modifier_hoodwink_scurry_1") then
		self.talents.has_e1 = 1
		self.talents.e1_speed = caster:GetTalentValue("modifier_hoodwink_scurry_1", "speed")
		self.talents.e1_agi = caster:GetTalentValue("modifier_hoodwink_scurry_1", "agi") / 100
		caster:AddPercentStat({ agi = self.talents.e1_agi }, self.tracker)
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_hoodwink_scurry_2") then
		self.talents.e2_move = caster:GetTalentValue("modifier_hoodwink_scurry_2", "move")
		self.talents.e2_duration = caster:GetTalentValue("modifier_hoodwink_scurry_2", "duration")
	end

	if caster:HasTalent("modifier_hoodwink_scurry_3") then
		self.talents.has_e3 = 1
		self.talents.e3_range = caster:GetTalentValue("modifier_hoodwink_scurry_3", "range")
		self.talents.e3_attacks = caster:GetTalentValue("modifier_hoodwink_scurry_3", "attacks")
	end

	if caster:HasTalent("modifier_hoodwink_scurry_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { cd = self.talents.e4_talent_cd, land = true })
	end

	if caster:HasTalent("modifier_hoodwink_scurry_7") then
		self.talents.has_e7 = 1
		if IsServer() and not self.tracker.legendary_init then
			self.tracker.legendary_init = true
			self.tracker.distance = 0
			self.tracker.interval = 0.1
			self.tracker.old_pos = caster:GetAbsOrigin()
			self.tracker:OnIntervalThink()
		end
	end
end

function hoodwink_scurry_custom:CreateTalent()
	self:ToggleAutoCast()
end

function hoodwink_scurry_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "hoodwink_scurry", self)
end

function hoodwink_scurry_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_hoodwink_scurry_custom"
end

function hoodwink_scurry_custom:GetBehavior()
	local toggle = 0
	if self.talents.has_e4 == 1 then
		toggle = DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE + toggle
end

function hoodwink_scurry_custom:GetAbilityChargeRestoreTime(level)
	return (self.AbilityChargeRestoreTime or 0)
end

function hoodwink_scurry_custom:OnSpellStart()
	self.caster:AddNewModifier(self.caster, self, "modifier_hoodwink_scurry_custom_cd", { duration = 1 })

	local duration = self.duration + self.talents.e2_duration

	if self.talents.has_e4 == 1 and self:GetAutoCastState() and self.caster:CanBlink() then
		self.caster:Teleport(
			self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * self.talents.e4_range,
			true,
			"particles/items3_fx/blink_swift_start.vpcf",
			"particles/items3_fx/blink_swift_end.vpcf"
		)
		self.caster:EmitSound("Hoodwink.Scurry_blink")
	end

	if self.talents.has_e3 == 1 then
		self.caster:AddNewModifier(self.caster, self, "modifier_hoodwink_scurry_custom_attacks", {})
	end

	self.caster:RemoveModifierByName("modifier_hoodwink_scurry_custom_buff")
	self.caster:AddNewModifier(self.caster, self, "modifier_hoodwink_scurry_custom_buff", { duration = duration })
end

function hoodwink_scurry_custom:OnProjectileHit(target, location)
	if not IsServer() then
		return
	end
	if not target or not target:IsUnit() then
		return
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_hoodwink_scurry_custom_attack_mod", { duration = 1 })
	self.caster:PerformAttack(target, true, true, true, true, false, false, false)
	self.caster:RemoveModifierByName("modifier_hoodwink_scurry_custom_attack_mod")
	target:EmitSound("Hoodwink.Scurry_attack")
end

modifier_hoodwink_scurry_custom = class(mod_hidden)
function modifier_hoodwink_scurry_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.scurry_ability = self.ability

	self.ability.movement_speed_pct = self.ability:GetSpecialValueFor("movement_speed_pct")
	self.ability.cast_range = self.ability:GetSpecialValueFor("cast_range")
	self.ability.attack_range = self.ability:GetSpecialValueFor("attack_range")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.AbilityChargeRestoreTime = self.ability:GetSpecialValueFor("AbilityChargeRestoreTime")

	if not IsServer() then
		return
	end
	self.distance = 0
	self.interval = 0.1
	self.old_pos = self.parent:GetAbsOrigin()
end

function modifier_hoodwink_scurry_custom:OnRefresh()
	self.ability.movement_speed_pct = self.ability:GetSpecialValueFor("movement_speed_pct")
	self.ability.cast_range = self.ability:GetSpecialValueFor("cast_range")
	self.ability.attack_range = self.ability:GetSpecialValueFor("attack_range")
end

function modifier_hoodwink_scurry_custom:GetProcChance()
	if self.ability:GetCurrentAbilityCharges() >= self.ability:GetMaxAbilityCharges(self.ability:GetLevel()) then
		return 0
	end
	return self.ability.talents.e4_chance
end

function modifier_hoodwink_scurry_custom:AttackProc(params)
	self.ability:AddCharge(1, "particles/hoodwink/acorn_refresh.vpcf", "Hoodwink.Scurry_refresh")
end

function modifier_hoodwink_scurry_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e1 == 0 then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_hoodwink_scurry_custom_speed",
		{ duration = self.ability.talents.e1_duration }
	)
end

function modifier_hoodwink_scurry_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local distance = (self.parent:GetAbsOrigin() - self.old_pos):Length2D()
	self.old_pos = self.parent:GetAbsOrigin()

	local mod = self.parent:FindModifierByName("modifier_hoodwink_scurry_custom_legendary")

	local max = self.ability.talents.e7_distance
	local stack = self.distance
	local override_stack = math.floor((self.distance / max) * 100) .. "%"
	local active = 0

	if mod then
		max = self.ability.talents.e7_duration
		stack = mod:GetRemainingTime()
		active = 1
		override_stack = nil
	end

	if not mod and self.parent:IsAlive() then
		self.distance = self.distance + distance
		if self.distance >= max then
			self.distance = 0
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_hoodwink_scurry_custom_legendary",
				{ duration = self.ability.talents.e7_duration }
			)
		end
	end

	self.parent:UpdateUIlong({
		max = max,
		stack = stack,
		override_stack = override_stack,
		active = active,
		use_zero = active,
		priority = 1,
		style = "HoodwinkScurry",
	})
	self:StartIntervalThink(self.interval)
end

function modifier_hoodwink_scurry_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_hoodwink_scurry_custom:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_slow_resist
end

function modifier_hoodwink_scurry_custom:GetModifierAttackRangeBonus()
	return self.ability.talents.e3_range
end

function modifier_hoodwink_scurry_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.e2_move
end

modifier_hoodwink_scurry_custom_buff = class(mod_visible)
function modifier_hoodwink_scurry_custom_buff:IsPurgable()
	return true
end
function modifier_hoodwink_scurry_custom_buff:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.movespeed = self.ability.movement_speed_pct
	self.attack_range = self.ability.attack_range
	self.spell_range = self.ability.cast_range

	if not IsServer() then
		return
	end

	self.parent:EmitSound("Hero_Hoodwink.Scurry.Cast")

	local pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_hoodwink/hoodwink_scurry_aura.vpcf",
		self
	)
	self.parent:GenericParticle(pfx, self)
end

function modifier_hoodwink_scurry_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Hero_Hoodwink.Scurry.End")
end

function modifier_hoodwink_scurry_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_hoodwink_scurry_custom_buff:GetModifierCastRangeBonusStacking()
	return self.spell_range
end

function modifier_hoodwink_scurry_custom_buff:GetModifierAttackRangeBonus()
	return self.attack_range
end

function modifier_hoodwink_scurry_custom_buff:GetModifierMoveSpeedBonus_Percentage()
	return self.movespeed
end

function modifier_hoodwink_scurry_custom_buff:GetActivityTranslationModifiers()
	return "scurry"
end

function modifier_hoodwink_scurry_custom_buff:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES] = true,
	}
end

modifier_hoodwink_scurry_custom_legendary = class(mod_hidden)
function modifier_hoodwink_scurry_custom_legendary:GetPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_hoodwink_scurry_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.bva = self.ability.talents.e7_bva
	self.heal = self.ability.talents.e7_heal

	if not IsServer() then
		return
	end

	self.damageTable = {
		attacker = self.parent,
		damage = self.ability.talents.e7_damage,
		damage_type = self.ability.talents.e7_damage_type,
		ability = self.ability,
	}
	self.parent:AddProc(self, { land = true })
	self.parent:AddAttackStartEvent_out(self, true)

	self.parent:EmitSound("Hoodwink.Scurry_legendary")
	self.head_particle =
		ParticleManager:CreateParticle("particles/hoodwink/hoodwink_head.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.head_particle,
		0,
		self.parent,
		PATTACH_OVERHEAD_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.head_particle,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.head_particle,
		5,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.head_particle, false, false, -1, true, false)

	self.ground_particle =
		ParticleManager:CreateParticle("particles/hoodwink/hoodwink_ground.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
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

function modifier_hoodwink_scurry_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
	}
end

function modifier_hoodwink_scurry_custom_legendary:GetModifierProjectileName()
	return "particles/hoodwink/scurry_proj.vpcf"
end

function modifier_hoodwink_scurry_custom_legendary:GetModifierBaseAttackTimeConstant()
	return self.bva
end

function modifier_hoodwink_scurry_custom_legendary:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	self.parent:GenericHeal(
		self.parent:GetMaxHealth() * self.heal,
		self.ability,
		false,
		nil,
		"modifier_hoodwink_scurry_7"
	)
end

function modifier_hoodwink_scurry_custom_legendary:GetProcChance()
	return 100
end

function modifier_hoodwink_scurry_custom_legendary:AttackProc(params, name)
	self.damageTable.victim = params.target
	DoDamage(self.damageTable, "modifier_hoodwink_scurry_7")
end

modifier_hoodwink_scurry_custom_cd = class(mod_hidden)
function modifier_hoodwink_scurry_custom_cd:OnCreated()
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.ability:SetActivated(false)
end

function modifier_hoodwink_scurry_custom_cd:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:SetActivated(true)
end

modifier_hoodwink_scurry_custom_speed = class(mod_visible)
function modifier_hoodwink_scurry_custom_speed:GetTexture()
	return "buffs/hoodwink/scurry_1"
end
function modifier_hoodwink_scurry_custom_speed:OnCreated()
	self.ability = self:GetAbility()
	self.speed = self.ability.talents.e1_speed
end

function modifier_hoodwink_scurry_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_hoodwink_scurry_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_hoodwink_scurry_custom_attacks = class(mod_hidden)
function modifier_hoodwink_scurry_custom_attacks:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.attacks = self.ability.talents.e3_attacks
	self.duration = self.ability.talents.e3_duration
	self.count = 0

	if not IsServer() then
		return
	end

	self.info = {
		EffectName = "particles/hoodwink/scurry_proj.vpcf",
		Ability = self.ability,
		iMoveSpeed = 1500,
		Source = self.parent,
		bDodgeable = true,
		bProvidesVision = true,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
		iVisionRadius = 50,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	self.interval = self.duration / self.attacks - FrameTime()
	self:StartIntervalThink(self.interval)
end

function modifier_hoodwink_scurry_custom_attacks:OnRefresh()
	if not IsServer() then
		return
	end
	self:OnCreated()
end

function modifier_hoodwink_scurry_custom_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.count = self.count + 1

	local target = self.parent:RandomTarget(self.parent:Script_GetAttackRange())
	local attack_target

	if target then
		attack_target = target
	else
		local point = self.parent:GetAbsOrigin()
			+ RandomVector(self.parent:Script_GetAttackRange() * RandomFloat(0.4, 0.7))
		attack_target = CreateModifierThinker(
			self.parent,
			self.ability,
			"modifier_hoodwink_scurry_custom_attack_thinker",
			{ duration = 1 },
			point,
			self.parent:GetTeamNumber(),
			false
		)
	end

	if attack_target then
		self.parent:EmitSound("Hoodwink.Knock_attack")
		self.info.Target = attack_target
		ProjectileManager:CreateTrackingProjectile(self.info)
	end

	if self.count >= self.attacks then
		self:Destroy()
		return
	end
end

modifier_hoodwink_scurry_custom_attack_mod = class(mod_hidden)

modifier_hoodwink_scurry_custom_attack_thinker = class(mod_hidden)