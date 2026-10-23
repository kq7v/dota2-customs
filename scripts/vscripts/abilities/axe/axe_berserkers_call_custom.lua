--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_buff",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_debuff",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_tracker",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_auto_cd",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_axe_hero_4"
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_legendary",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_axe_call_7"
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_legendary_attack",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_legendary_target",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_shard_charge",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_heal_change",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_damage_reduce",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_speed",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_berserkers_call_custom_armor",
	"abilities/axe/axe_berserkers_call_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_axe_call_3"
)

axe_berserkers_call_custom = class({})
axe_berserkers_call_custom.talents = {}

function axe_berserkers_call_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_beserkers_call_owner.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/ascetic_cap.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_beserkers_call.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/axe/axe_ti9_immortal/axe_ti9_call.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_beserkers_call.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_purifyingflames.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2022/radiance/radiance_owner_fall2022.vpcf", context)
	PrecacheResource("particle", "particles/econ/events/fall_2022/radiance_target_fall2022.vpcf", context)
	PrecacheResource("particle", "particles/axe/call_legendary_aoe.vpcf", context)
	PrecacheResource("particle", "particles/axe/calling_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_return.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_armor.vpcf", context)
	PrecacheResource("particle", "particles/axe/call_shields.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_crit.vpcf", context)
	PrecacheResource("particle", "particles/axe/axe_charge.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_axe", context)
end

function axe_berserkers_call_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_speed = 0,
			q1_duration = caster:GetTalentValue("modifier_axe_call_1", "duration", true),
			q1_bonus = caster:GetTalentValue("modifier_axe_call_1", "bonus", true),

			has_q2 = 0,
			q2_duration = 0,
			q2_range = 0,

			has_q3 = 0,
			q3_crit = 0,
			q3_armor = 0,
			q3_chance = caster:GetTalentValue("modifier_axe_call_3", "chance", true),
			q3_max = caster:GetTalentValue("modifier_axe_call_3", "max", true),
			q3_duration = caster:GetTalentValue("modifier_axe_call_3", "duration", true),

			has_q4 = 0,
			q4_cd_inc = caster:GetTalentValue("modifier_axe_call_4", "cd_inc", true) / 100,
			q4_mana = caster:GetTalentValue("modifier_axe_call_4", "mana", true),
			q4_cast = caster:GetTalentValue("modifier_axe_call_4", "cast", true),

			has_h1 = 0,
			h1_heal_reduce = 0,
			h1_heal_inc = 0,
			h1_duration = caster:GetTalentValue("modifier_axe_hero_1", "duration", true),

			has_h4 = 0,
			h4_radius = caster:GetTalentValue("modifier_axe_hero_4", "radius", true),
			h4_duration = caster:GetTalentValue("modifier_axe_hero_4", "duration", true),
			h4_damage_reduce = caster:GetTalentValue("modifier_axe_hero_4", "damage_reduce", true),
			h4_talent_cd = caster:GetTalentValue("modifier_axe_hero_4", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_axe_call_1") then
		self.talents.has_q1 = 1
		self.talents.q1_speed = caster:GetTalentValue("modifier_axe_call_1", "speed")
	end

	if caster:HasTalent("modifier_axe_call_2") then
		self.talents.has_q2 = 1
		self.talents.q2_duration = caster:GetTalentValue("modifier_axe_call_2", "duration")
		self.talents.q2_range = caster:GetTalentValue("modifier_axe_call_2", "range")
	end

	if caster:HasTalent("modifier_axe_call_3") then
		self.talents.has_q3 = 1
		self.talents.q3_crit = caster:GetTalentValue("modifier_axe_call_3", "crit")
		self.talents.q3_armor = caster:GetTalentValue("modifier_axe_call_3", "armor")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_axe_call_4") then
		self.talents.has_q4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_axe_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_heal_reduce = caster:GetTalentValue("modifier_axe_hero_1", "heal_reduce")
		self.talents.h1_heal_inc = caster:GetTalentValue("modifier_axe_hero_1", "heal_inc")
	end

	if caster:HasTalent("modifier_axe_hero_4") then
		self.talents.has_h4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end
end

function axe_berserkers_call_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "axe_berserkers_call", self)
end

function axe_berserkers_call_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_axe_berserkers_call_custom_tracker"
end

function axe_berserkers_call_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_q4 == 1 and self.talents.q4_cast or 0)
end

function axe_berserkers_call_custom:GetManaCost(level)
	if self.talents.has_q4 == 1 then
		return self.talents.q4_mana
	end
	return self.BaseClass.GetManaCost(self, level)
end

function axe_berserkers_call_custom:GetBehavior()
	local base = self.caster:HasShard()
			and (DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET)
		or DOTA_ABILITY_BEHAVIOR_NO_TARGET
	return base + DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT
end

function axe_berserkers_call_custom:GetRadius()
	return (self.radius or 0) + (self.talents.q2_range or 0)
end

function axe_berserkers_call_custom:GetCastRange(vLocation, hTarget)
	if self.caster:HasShard() then
		return IsServer() and 99999 or (self.shard_range or 0)
	end
	return self:GetRadius()
end

function axe_berserkers_call_custom:GetAOERadius()
	return self:GetRadius()
end

function axe_berserkers_call_custom:OnAbilityPhaseStart()
	self.sound_start = wearables_system:GetSoundReplacement(self.caster, "Hero_Axe.BerserkersCall.Start", self)
	self.caster:EmitSound(self.sound_start)
	return true
end

function axe_berserkers_call_custom:OnAbilityPhaseInterrupted()
	self.caster:StopSound(self.sound_start)
end

function axe_berserkers_call_custom:OnSpellStart()
	local duration = self.duration + self.talents.q2_duration

	local radius = self:GetRadius()
	local target = self:GetCursorTarget()

	if
		self.caster:HasShard()
		and not self.caster:IsRooted()
		and not self.caster:IsLeashed()
		and (not target or target ~= self.caster)
	then
		local point = self:GetCursorPosition()
		if target then
			point = target:GetAbsOrigin()
		end
		local origin = self.caster:GetAbsOrigin()

		if point == origin then
			point = origin + self.caster:GetForwardVector() * 10
		end
		local max_range = self.shard_range + self.caster:GetCastRangeBonus()
		local vec = point - self.caster:GetAbsOrigin()
		if vec:Length2D() >= max_range then
			point = origin + vec:Normalized() * max_range
		end

		local charge_duration = ((point - origin):Length2D()) / self.shard_speed
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_axe_berserkers_call_custom_shard_charge",
			{ duration = charge_duration, x = point.x, y = point.y }
		)
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_axe_berserkers_call_custom_buff", { duration = duration })
	if self.talents.has_q1 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_axe_berserkers_call_custom_speed",
			{ duration = duration + self.talents.q1_duration }
		)
	end

	self.caster:EmitSound("Hero_Axe.Berserkers_Call")
	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_axe/axe_beserkers_call_owner.vpcf",
		self
	)
	local effect_cast = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_mouth",
		Vector(0, 0, 0),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 2, Vector(radius, radius, radius))
	ParticleManager:ReleaseParticleIndex(effect_cast)
end

function axe_berserkers_call_custom:ProcCd()
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_q4 == 0 then
		return
	end

	self.caster:CdAbility(self, nil, self.talents.q4_cd_inc, "modifier_axe_call_4")
end

modifier_axe_berserkers_call_custom_buff = class(mod_visible)
function modifier_axe_berserkers_call_custom_buff:GetEffectName()
	return "particles/units/heroes/hero_axe/axe_beserkers_call.vpcf"
end
function modifier_axe_berserkers_call_custom_buff:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_axe_berserkers_call_custom_buff:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor = self.ability.bonus_armor
	self.radius = self.ability:GetRadius()

	if not IsServer() then
		return
	end
	self.ability:EndCd()
	self.targets = {}
	self:Taunt(true)

	if self.ability.talents.has_h4 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_axe_berserkers_call_custom_damage_reduce",
			{ duration = self:GetRemainingTime() }
		)
	end
end

function modifier_axe_berserkers_call_custom_buff:Taunt(first)
	if not IsServer() then
		return
	end
	local duration = self:GetRemainingTime()
	for _, enemy in pairs(self.parent:FindTargets(self.radius)) do
		if not self.targets[enemy] then
			enemy:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_axe_berserkers_call_custom_debuff",
				{ duration = duration * (1 - enemy:GetStatusResistance()) }
			)

			if self.ability.talents.has_q3 == 1 then
				enemy:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_axe_berserkers_call_custom_armor",
					{ duration = self.ability.talents.q3_duration }
				)
			end

			if self.ability.talents.has_h1 == 1 then
				enemy:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_axe_berserkers_call_custom_heal_change",
					{ duration = self.ability.talents.h1_duration }
				)
			end

			if not first then
				enemy:EmitSound("Hero_Axe.Berserkers_Call")
			end
			self.targets[enemy] = true
		end
	end
end

function modifier_axe_berserkers_call_custom_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_axe_berserkers_call_custom_buff:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_axe_berserkers_call_custom_buff:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

modifier_axe_berserkers_call_custom_debuff = class(mod_visible)
function modifier_axe_berserkers_call_custom_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_beserkers_call.vpcf"
end
function modifier_axe_berserkers_call_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_axe_berserkers_call_custom_debuff:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	if self.parent:IsHero() or self.parent.owner ~= nil then
		self.parent:SetForceAttackTarget(self.caster)
		self.parent:MoveToTargetToAttack(self.caster)
	end

	self:StartIntervalThink(0.1)
end

function modifier_axe_berserkers_call_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.caster:IsAlive() then
		return
	end
	self:Destroy()
end

function modifier_axe_berserkers_call_custom_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if self.parent:IsHero() or self.parent.owner ~= nil then
		self.parent:SetForceAttackTarget(nil)
	end
end

function modifier_axe_berserkers_call_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_TAUNTED] = true,
	}
end

modifier_axe_berserkers_call_custom_tracker = class(mod_hidden)
function modifier_axe_berserkers_call_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.call_ability = self.ability

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.bonus_armor = self.ability:GetSpecialValueFor("bonus_armor")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.shard_range = self.ability:GetSpecialValueFor("shard_range")
	self.ability.shard_speed = self.ability:GetSpecialValueFor("shard_speed")

	self.legendary_ability = self.parent:FindAbilityByName("axe_berserkers_call_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end
	self.record = true
end

function modifier_axe_berserkers_call_custom_tracker:OnRefresh(table)
	self.ability.bonus_armor = self.ability:GetSpecialValueFor("bonus_armor")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
end

function modifier_axe_berserkers_call_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_axe_berserkers_call_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.q2_range
end

function modifier_axe_berserkers_call_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.q1_speed
		* (self.parent:HasModifier("modifier_axe_berserkers_call_custom_speed") and self.ability.talents.q1_bonus or 1)
end

function modifier_axe_berserkers_call_custom_tracker:GetModifierHealChange()
	return self.ability.talents.h1_heal_inc
end

function modifier_axe_berserkers_call_custom_tracker:GetModifierHPRegenAmplify_Percentage()
	return self.ability.talents.h1_heal_inc
end

function modifier_axe_berserkers_call_custom_tracker:GetCritChance()
	if self.ability.talents.has_q3 == 0 then
		return 0
	end
	return self.ability.talents.q3_chance
end

function modifier_axe_berserkers_call_custom_tracker:GetCritDamage()
	if self.ability.talents.has_q3 == 0 then
		return
	end
	return self.ability.talents.q3_crit
end

function modifier_axe_berserkers_call_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q3 == 0 then
		return
	end
	self.record = nil

	if not RollPseudoRandomPercentage(self:GetCritChance(), 4452, self.parent) then
		return
	end
	self.record = params.record
	return self:GetCritDamage()
end

function modifier_axe_berserkers_call_custom_tracker:GetProcChance()
	return 100
end

function modifier_axe_berserkers_call_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.record and params.record == self.record then
		target:EmitSound("DOTA_Item.Daedelus.Crit")

		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		vec.z = 0
		local particle_edge_fx = ParticleManager:CreateParticle(
			"particles/bloodseeker/thirst_crit.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle_edge_fx,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle_edge_fx,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlForward(particle_edge_fx, 2, vec)
		ParticleManager:SetParticleControl(
			particle_edge_fx,
			5,
			self.parent:GetAttachmentOrigin(self.parent:ScriptLookupAttachment("attach_hitloc"))
		)
		ParticleManager:SetParticleControlForward(particle_edge_fx, 5, vec)
		ParticleManager:ReleaseParticleIndex(particle_edge_fx)
		self.record = nil
	end

	if self.ability.talents.has_q4 == 0 then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	self.ability:ProcCd()
end

function modifier_axe_berserkers_call_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h4 == 0 then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local unit = params.unit
	if unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if unit:IsDebuffImmune() then
		return
	end
	if (unit:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.ability.talents.h4_radius then
		return
	end
	if unit:HasModifier("modifier_axe_berserkers_call_custom_auto_cd") then
		return
	end

	unit:EmitSound("Hero_Axe.Berserkers_Call")
	self.parent:EmitSound("Hero_Axe.BerserkersCall.Start")

	for i = 1, 3 do
		local caster_pfx = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_centaur/centaur_return.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			caster_pfx,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			caster_pfx,
			1,
			unit,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			unit:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(caster_pfx)
	end

	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_axe_berserkers_call_custom_debuff",
		{ duration = self.ability.talents.h4_duration * (1 - unit:GetStatusResistance()) }
	)
	unit:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_axe_berserkers_call_custom_auto_cd",
		{ duration = self.ability.talents.h4_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_axe_berserkers_call_custom_damage_reduce",
		{ duration = self.ability.talents.h4_duration }
	)
end

modifier_axe_berserkers_call_custom_auto_cd = class(mod_hidden)
function modifier_axe_berserkers_call_custom_auto_cd:RemoveOnDeath()
	return false
end
function modifier_axe_berserkers_call_custom_auto_cd:OnCreated(table)
	self.RemoveForDuel = true
end

modifier_axe_berserkers_call_custom_shard_charge = class(mod_hidden)
function modifier_axe_berserkers_call_custom_shard_charge:GetEffectName()
	return "particles/axe/axe_charge.vpcf"
end
function modifier_axe_berserkers_call_custom_shard_charge:GetStatusEffectName()
	return "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf"
end
function modifier_axe_berserkers_call_custom_shard_charge:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_axe_berserkers_call_custom_shard_charge:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.caster:StartGesture(ACT_DOTA_RUN)

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)

	self.bkb = self.caster:AddNewModifier(self.caster, self.ability, "modifier_generic_debuff_immune", {})

	local vec = self.point - self.caster:GetAbsOrigin()
	self.angle = vec:Normalized()

	self.caster:FacePoint(self.point)
	self.distance = vec:Length2D() / (self:GetDuration() / FrameTime())

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_axe_berserkers_call_custom_shard_charge:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_axe_berserkers_call_custom_shard_charge:GetActivityTranslationModifiers()
	return "haste"
end

function modifier_axe_berserkers_call_custom_shard_charge:GetModifierDisableTurning()
	return 1
end

function modifier_axe_berserkers_call_custom_shard_charge:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.bkb) then
		self.bkb:Destroy()
	end

	self.caster:InterruptMotionControllers(true)
	self.caster:FadeGesture(ACT_DOTA_RUN)

	ResolveNPCPositions(self.caster:GetAbsOrigin(), 128)

	self.caster:FacePoint()
end

function modifier_axe_berserkers_call_custom_shard_charge:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local pos = self.caster:GetAbsOrigin()
	local pos_p = self.angle * self.distance
	local next_pos = GetGroundPosition(pos + pos_p, self.caster)
	self.caster:SetAbsOrigin(next_pos)

	GridNav:DestroyTreesAroundPoint(pos, 120, false)

	local mod = self.caster:FindModifierByName("modifier_axe_berserkers_call_custom_buff")
	if mod then
		mod:Taunt()
	end
end

function modifier_axe_berserkers_call_custom_shard_charge:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_axe_berserkers_call_custom_shard_charge:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
	}
end

modifier_axe_berserkers_call_custom_heal_change = class(mod_hidden)
function modifier_axe_berserkers_call_custom_heal_change:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.heal_reduce = self.ability.talents.h1_heal_reduce

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
end

function modifier_axe_berserkers_call_custom_heal_change:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_axe_berserkers_call_custom_heal_change:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_axe_berserkers_call_custom_heal_change:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

modifier_axe_berserkers_call_custom_damage_reduce = class(mod_hidden)
function modifier_axe_berserkers_call_custom_damage_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.talents.h4_damage_reduce
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/axe/call_shields.vpcf", self)
end

function modifier_axe_berserkers_call_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_axe_berserkers_call_custom_damage_reduce:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end

modifier_axe_berserkers_call_custom_speed = class(mod_hidden)

modifier_axe_berserkers_call_custom_armor = class(mod_visible)
function modifier_axe_berserkers_call_custom_armor:GetTexture()
	return "buffs/axe/call_3"
end
function modifier_axe_berserkers_call_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q3_max
	self.armor = self.ability.talents.q3_armor

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_axe_berserkers_call_custom_armor:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	end
end

function modifier_axe_berserkers_call_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_axe_berserkers_call_custom_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.armor
end

axe_berserkers_call_custom_legendary = class({})
axe_berserkers_call_custom_legendary.talents = {}

function axe_berserkers_call_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function axe_berserkers_call_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q7_radius = caster:GetTalentValue("modifier_axe_call_7", "radius", true),
			q7_interval = caster:GetTalentValue("modifier_axe_call_7", "interval", true),
			q7_cost = caster:GetTalentValue("modifier_axe_call_7", "cost", true) / 100,
			q7_damage = caster:GetTalentValue("modifier_axe_call_7", "damage", true),
			q7_talent_cd = caster:GetTalentValue("modifier_axe_call_7", "talent_cd", true),
			q7_heal = caster:GetTalentValue("modifier_axe_call_7", "heal", true) / 100,
			q7_move = caster:GetTalentValue("modifier_axe_call_7", "move", true),
		}
	end
end

function axe_berserkers_call_custom_legendary:GetCooldown()
	return self.talents.q7_talent_cd or 0
end

function axe_berserkers_call_custom_legendary:GetCastAnimation()
	if self.caster:HasModifier("modifier_axe_berserkers_call_custom_legendary") then
		return 0
	end
	return ACT_DOTA_OVERRIDE_ABILITY_1
end

function axe_berserkers_call_custom_legendary:GetBehavior()
	local bonus = 0
	if self.caster:HasModifier("modifier_axe_berserkers_call_custom_legendary") then
		bonus = DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_NO_TARGET + bonus
end

function axe_berserkers_call_custom_legendary:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_axe_berserkers_call_custom_legendary")
	if mod then
		mod:Destroy()
		return
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_axe_berserkers_call_custom_legendary", {})
end

modifier_axe_berserkers_call_custom_legendary = class(mod_hidden)
function modifier_axe_berserkers_call_custom_legendary:GetStatusEffectName()
	return "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf"
end
function modifier_axe_berserkers_call_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_axe_berserkers_call_custom_legendary:IsAura()
	return IsServer() and self.parent:IsAlive()
end
function modifier_axe_berserkers_call_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_axe_berserkers_call_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_axe_berserkers_call_custom_legendary:GetModifierAura()
	return "modifier_axe_berserkers_call_custom_legendary_target"
end
function modifier_axe_berserkers_call_custom_legendary:GetAuraRadius()
	return self.radius
end
function modifier_axe_berserkers_call_custom_legendary:GetAuraDuration()
	return 0.1
end
function modifier_axe_berserkers_call_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.q7_radius

	if IsClient() then
		self.effect_cast = ParticleManager:CreateParticle(
			"particles/axe/call_legendary_aoe.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			self.effect_cast,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_mouth",
			Vector(0, 0, 0),
			true
		)
		ParticleManager:SetParticleControl(self.effect_cast, 2, Vector(self.radius, self.radius, self.radius))
		self:AddParticle(self.effect_cast, true, false, -1, false, false)
	end

	if not IsServer() then
		return
	end
	self.ability:EndCd(0.5)

	self.parent:EmitSound("Axe.Calling_legendary")
	self.parent:EmitSound("Axe.Calling_legendary2")
	self.parent:EmitSound("Axe.Calling_legendary_vo")
	self.parent:GenericParticle("particles/econ/events/fall_2022/radiance/radiance_owner_fall2022.vpcf", self)
	self.parent:GenericParticle("particles/axe/calling_legendary_cast.vpcf")

	self.parent:AddLifesteal(self, {
		name = "modifier_axe_call_7",
		type = 2,
		text = true,
		value = function()
			return self.parent:HasModifier("modifier_axe_berserkers_call_custom_buff") and self.ability.talents.q7_heal
				or 0
		end,
	})

	self:OnIntervalThink()
	self:StartIntervalThink(self.ability.talents.q7_interval)
end

function modifier_axe_berserkers_call_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:SetHealth(
		math.max(1, self.parent:GetHealth() - self.parent:GetMaxHealth() * self.ability.talents.q7_cost)
	)
	self.parent:AddNewModifier(self.parent, self.ability, "modifier_axe_berserkers_call_custom_legendary_attack", {})

	local hit = false
	for _, target in pairs(self.parent:FindTargets(self.radius)) do
		self.parent:PerformAttack(target, true, true, true, true, false, false, false)
		hit = true
		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			target
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:Delete(hit_effect, 1)
	end

	if hit and self.parent.call_ability then
		self.parent.call_ability:ProcCd()
	end
	self.parent:RemoveModifierByName("modifier_axe_berserkers_call_custom_legendary_attack")
end

function modifier_axe_berserkers_call_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

function modifier_axe_berserkers_call_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_axe_berserkers_call_custom_legendary:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.q7_move
end

modifier_axe_berserkers_call_custom_legendary_attack = class(mod_hidden)
function modifier_axe_berserkers_call_custom_legendary_attack:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.q7_damage - 100
end

function modifier_axe_berserkers_call_custom_legendary_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_axe_berserkers_call_custom_legendary_attack:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_axe_berserkers_call_custom_legendary_target = class(mod_hidden)
function modifier_axe_berserkers_call_custom_legendary_target:GetStatusEffectName()
	return "particles/status_fx/status_effect_burn.vpcf"
end
function modifier_axe_berserkers_call_custom_legendary_target:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_axe_berserkers_call_custom_legendary_target:OnCreated()
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.particle_index = ParticleManager:CreateParticle(
		"particles/econ/events/fall_2022/radiance_target_fall2022.vpcf",
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
end