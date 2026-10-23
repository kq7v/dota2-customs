--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_crit",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_legendary",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_legendary_caster",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_legendary_anim",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_tracker",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_armor",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_boundless_3"
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_damage_bonus",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_boundless_1"
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_slow",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_monkey_king_boundless_2"
)
LinkLuaModifier(
	"modifier_monkey_king_boundless_strike_custom_move",
	"abilities/monkey_king/monkey_king_boundless_strike_custom.lua",
	LUA_MODIFIER_MOTION_NONE
)

monkey_king_boundless_strike_custom = class({})
monkey_king_boundless_strike_custom.talents = {}

function monkey_king_boundless_strike_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_attack_05_blur.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_attack_06_blur.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_monkey_king/monkey_king_attack_06_near_blur_cud.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_monkey_king/monkey_king_attack_05_near_blur_cud.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_monkey_king/monkey_king_attack_01_near_blur_cud.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_monkey_king/monkey_king_attack_06_near_blur.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_monkey_king/monkey_king_attack_05_near_blur.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_strike_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_strike.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_strike_slow_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_jump_trail.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_monkey_king_fur_army.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_timer.vpcf",
		context
	)
	PrecacheResource("particle", "particles/monkey_king/mk_heal_red_1.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/buckle_refresh.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_huskar_lifebreak.vpcf", context)
	PrecacheResource("particle", "particles/generic/generic_armor_reduction.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/bush_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/strike_refresh.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_revenge_proc.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/strike_radius.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/command_buff.vpcf", context)
	PrecacheResource("particle", "particles/monkey_king/mk_buff_start.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/monkey_king/mk_ti9_immortal/status_effect_mk_ti9_immortal_army.vpcf",
		context
	)
end

function monkey_king_boundless_strike_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if caster.owner then
		caster = caster.owner
	end

	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_cleave = 0,
			q1_damage = 0,
			q1_duration = caster:GetTalentValue("modifier_monkey_king_boundless_1", "duration", true),

			has_q2 = 0,
			q2_cd = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_monkey_king_boundless_2", "duration", true),

			has_q3 = 0,
			q3_damage = 0,
			q3_base = 0,
			q3_armor = 0,
			q3_duration = caster:GetTalentValue("modifier_monkey_king_boundless_3", "duration", true),

			has_q4 = 0,
			q4_move = caster:GetTalentValue("modifier_monkey_king_boundless_4", "move", true),
			q4_cast = caster:GetTalentValue("modifier_monkey_king_boundless_4", "cast", true),
			q4_slow_resist = caster:GetTalentValue("modifier_monkey_king_boundless_4", "slow_resist", true),
			q4_cd_inc = caster:GetTalentValue("modifier_monkey_king_boundless_4", "cd_inc", true) / 100,
			q4_duration = caster:GetTalentValue("modifier_monkey_king_boundless_4", "duration", true),

			has_q7 = 0,
			q7_max = caster:GetTalentValue("modifier_monkey_king_boundless_7", "max", true),
			q7_damage = caster:GetTalentValue("modifier_monkey_king_boundless_7", "damage", true),
			q7_stun = caster:GetTalentValue("modifier_monkey_king_boundless_7", "stun", true) / 100,
			q7_range = caster:GetTalentValue("modifier_monkey_king_boundless_7", "range", true),
			q7_duration = caster:GetTalentValue("modifier_monkey_king_boundless_7", "duration", true),
			q7_damage_k = caster:GetTalentValue("modifier_monkey_king_boundless_7", "damage_k", true),
			q7_cd = caster:GetTalentValue("modifier_monkey_king_boundless_7", "cd", true),
			q7_bva = caster:GetTalentValue("modifier_monkey_king_boundless_7", "bva", true),
			q7_spell = caster:GetTalentValue("modifier_monkey_king_boundless_7", "spell", true),
			q7_mana = caster:GetTalentValue("modifier_monkey_king_boundless_7", "mana", true) / 100,

			has_h1 = 0,
			h1_range = 0,
			h1_stun = 0,
		}
	end

	if not self.caster:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier") then
		if caster:HasTalent("modifier_monkey_king_boundless_1") then
			self.talents.has_q1 = 1
			self.talents.q1_cleave = caster:GetTalentValue("modifier_monkey_king_boundless_1", "cleave") / 100
			self.talents.q1_damage = caster:GetTalentValue("modifier_monkey_king_boundless_1", "damage")
			caster:AddProc(self.tracker, { land = true })
		end

		if caster:HasTalent("modifier_monkey_king_boundless_2") then
			self.talents.has_q2 = 1
			self.talents.q2_cd = caster:GetTalentValue("modifier_monkey_king_boundless_2", "cd")
			self.talents.q2_slow = caster:GetTalentValue("modifier_monkey_king_boundless_2", "slow")
			caster:AddProc(self.tracker, { land = true })
		end

		if caster:HasTalent("modifier_monkey_king_boundless_3") then
			self.talents.has_q3 = 1
			self.talents.q3_damage = caster:GetTalentValue("modifier_monkey_king_boundless_3", "damage")
			self.talents.q3_base = caster:GetTalentValue("modifier_monkey_king_boundless_3", "base")
			self.talents.q3_armor = caster:GetTalentValue("modifier_monkey_king_boundless_3", "armor") / 100
		end

		if caster:HasTalent("modifier_monkey_king_boundless_4") then
			self.talents.has_q4 = 1
		end

		if caster:HasTalent("modifier_monkey_king_boundless_7") then
			self.talents.has_q7 = 1
		end
	end

	if caster:HasTalent("modifier_monkey_king_hero_1") then
		self.talents.has_h1 = 1
		self.talents.h1_range = caster:GetTalentValue("modifier_monkey_king_hero_1", "range")
		self.talents.h1_stun = caster:GetTalentValue("modifier_monkey_king_hero_1", "stun")
	end
end

function monkey_king_boundless_strike_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_monkey_king_boundless_strike_custom_legendary_caster") then
		return "monkey_king_boundless_strike_secondary"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "monkey_king_boundless_strike", self)
end

function monkey_king_boundless_strike_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_monkey_king_boundless_strike_custom_tracker"
end

function monkey_king_boundless_strike_custom:GetCastAnimation()
	return 0
end

function monkey_king_boundless_strike_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_monkey_king_boundless_strike_custom_legendary_caster") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_q7 == 1 and self.talents.q7_mana or 0))
end

function monkey_king_boundless_strike_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel)
		+ (self.talents.q2_cd or 0)
		+ (self.talents.has_q7 == 1 and self.talents.q7_cd or 0)
end

function monkey_king_boundless_strike_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_q4 == 1 and self.talents.q4_cast or 0)
end

function monkey_king_boundless_strike_custom:GetBehavior()
	local bonus = 0
	if self.caster:HasModifier("modifier_monkey_king_boundless_strike_custom_legendary_caster") then
		bonus = DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + bonus
end

function monkey_king_boundless_strike_custom:GetCastRange(vLocation, hTarget)
	if self.caster:HasModifier("modifier_monkey_king_boundless_strike_custom_legendary_caster") then
		return 99999
	end
	return self:GetRange()
end

function monkey_king_boundless_strike_custom:GetRange()
	return (self.strike_cast_range or 0)
end

function monkey_king_boundless_strike_custom:OnAbilityPhaseStart()
	self.caster:EmitSound("Hero_MonkeyKing.Strike.Cast")

	local anim_k = self.BaseClass.GetCastPoint(self)
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_MK_STRIKE, anim_k / self:GetCastPoint(self:GetLevel()))

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_strike_cast.vpcf",
		self
	)

	self.pre_particleID = ParticleManager:CreateParticle(particle_name, PATTACH_POINT_FOLLOW, self.caster)
	ParticleManager:SetParticleControl(self.pre_particleID, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.pre_particleID,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_bot",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.pre_particleID,
		2,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_top",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(self.pre_particleID)
	return true
end

function monkey_king_boundless_strike_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_MK_STRIKE)

	if not self.pre_particleID then
		return
	end
	ParticleManager:DestroyParticle(self.pre_particleID, true)
	ParticleManager:ReleaseParticleIndex(self.pre_particleID)
	self.pre_particleID = nil
end

function monkey_king_boundless_strike_custom:OnSpellStart()
	local point = self.caster:CastPosition(self:GetCursorPosition())

	if self.pre_particleID then
		ParticleManager:DestroyParticle(self.pre_particleID, false)
		ParticleManager:ReleaseParticleIndex(self.pre_particleID)
		self.pre_particleID = nil
	end

	local mod = self.caster:FindModifierByName("modifier_monkey_king_boundless_strike_custom_legendary_caster")
	if mod then
		if IsValid(mod.unit) then
			local unit_mod = mod.unit:FindModifierByName("modifier_monkey_king_boundless_strike_custom_legendary")
			if unit_mod then
				unit_mod.cast_point = point
				unit_mod:Activate_Strike()
			end
		end
		mod:Destroy()
		return
	end

	self:Strike(self.caster:GetAbsOrigin(), point)

	if self.talents.has_q7 == 0 then
		return
	end

	local spawn_point = self.caster:GetAbsOrigin()
		+ (point - self.caster:GetAbsOrigin()):Normalized() * self.talents.q7_range
	local duration = self.talents.q7_duration

	local illusion_self = CreateIllusions(self.caster, self.caster, {
		outgoing_damage = 0,
		duration = duration + 1,
	}, 1, 0, false, false, true)

	for _, illusion in pairs(illusion_self) do
		illusion.owner = self.caster

		illusion:SetOrigin(GetGroundPosition(spawn_point, nil))
		illusion:StartGesture(ACT_DOTA_VICTORY)

		illusion:AddNewModifier(self.caster, self, "modifier_monkey_king_boundless_strike_custom_legendary", {})
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_monkey_king_boundless_strike_custom_legendary_caster",
			{ duration = duration, unit = illusion:entindex() }
		)
	end
end

function monkey_king_boundless_strike_custom:Strike(start_point, end_point, more_crit)
	local strike_radius = self.strike_radius
	local strike_cast_range = self:GetRange() + self.caster:GetCastRangeBonus()
	local stun = self.stun + self.talents.h1_stun
	local crit = self.strike_crit_mult + self.talents.q3_damage
	local reduce_armor = false
	local armor_sound = true
	local flag_data = nil
	local full_charge = false
	local buff_mod = self.caster:FindModifierByName("modifier_monkey_king_jingu_mastery_custom_buff")

	if more_crit then
		crit = crit * more_crit
		stun = stun * (1 + self.talents.q7_stun)
		flag_data = { damage = "monkey_q7" }

		if more_crit >= self.talents.q7_damage then
			full_charge = true
		end
	elseif self.talents.has_q7 == 0 and buff_mod then
		full_charge = true
	end

	local vStartPosition = start_point
	local vTargetPosition = end_point

	local dir = vTargetPosition - vStartPosition
	dir.z = 0
	dir = dir:Normalized()

	vStartPosition = GetGroundPosition(vStartPosition + dir * (strike_radius / 2), nil)
	vTargetPosition = GetGroundPosition(vStartPosition + dir * (strike_cast_range - strike_radius / 2), nil)

	local sound_cast = wearables_system:GetSoundReplacement(self.caster, "Hero_MonkeyKing.Strike.Impact", self)
	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_strike.vpcf",
		self
	)

	EmitSoundOnLocationWithCaster(vStartPosition, sound_cast, self.caster)
	EmitSoundOnLocationWithCaster(vTargetPosition, "Hero_MonkeyKing.Strike.Impact.EndPos", self.caster)

	local particleID = ParticleManager:CreateParticle(particle_name, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particleID, 0, vStartPosition)
	ParticleManager:SetParticleControlForward(particleID, 0, dir)
	ParticleManager:SetParticleControl(particleID, 1, vTargetPosition)
	ParticleManager:ReleaseParticleIndex(particleID)

	if self.talents.has_q1 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_monkey_king_boundless_strike_custom_damage_bonus",
			{ duration = self.talents.q1_duration }
		)
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_monkey_king_boundless_strike_custom_crit", { crit = crit })
	self.caster.no_cleave = true
	self.caster.monkey_q = true

	local enemies = FindUnitsInLine(
		self.caster:GetTeamNumber(),
		vStartPosition,
		vTargetPosition,
		nil,
		strike_radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO,
		0
	)
	local scepter_target = nil

	for _, enemy in pairs(enemies) do
		local particleID = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_strike_slow_impact.vpcf",
			PATTACH_CUSTOMORIGIN,
			nil
		)
		ParticleManager:SetParticleControlEnt(
			particleID,
			0,
			enemy,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			enemy:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particleID)

		if self.talents.has_q3 == 1 and full_charge then
			enemy:AddNewModifier(
				self.caster,
				self.caster:BkbAbility(self, true),
				"modifier_monkey_king_boundless_strike_custom_armor",
				{ duration = self.talents.q3_duration }
			)
			if armor_sound then
				armor_sound = false
				enemy:EmitSound("MK.Strike_hit_2")
				enemy:EmitSound("MK.Strike_hit")
			end
		end

		if more_crit then
			if full_charge and self.caster.mastery_ability then
				self.caster.mastery_ability:ApplyHits(enemy)
			end
			enemy:EmitSound("MK.Strike_legendary_hit")
		end

		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = (1 - enemy:GetStatusResistance()) * stun }
		)
		self.caster:PerformAttack(enemy, true, true, true, true, false, false, true, flag_data, true)

		if not scepter_target or (scepter_target:IsCreep() and enemy:IsHero()) then
			scepter_target = enemy
		end
	end

	local scepter_owner = self.caster:FindOwner()
	if scepter_owner:HasScepter() and scepter_target and IsValid(scepter_owner.command_ability) then
		scepter_owner.command_ability:SpawnSoldier(scepter_target:GetAbsOrigin() + RandomVector(150))
	end

	if self.talents.has_q4 == 1 then
		self.caster:RemoveModifierByName("modifier_monkey_king_boundless_strike_custom_move")
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_monkey_king_boundless_strike_custom_move",
			{ duration = self.talents.q4_duration }
		)

		if full_charge then
			local particle = ParticleManager:CreateParticle(
				"particles/monkey_king/strike_refresh.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.caster
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				self.caster,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.caster:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)

			self.caster:EmitSound("MK.Strike_refresh")
			self.caster:CdAbility(self.ability, false, self.talents.q4_cd_inc, "modifier_monkey_king_boundless_4")
		end
	end

	if buff_mod then
		if buff_mod.is_magic then
			buff_mod:ProcDamage(enemies)
		else
			buff_mod:ReduceStack()
		end
	end

	self.caster:RemoveModifierByName("modifier_monkey_king_boundless_strike_custom_crit")
	self.caster.no_cleave = false
	self.caster.monkey_q = false
end

modifier_monkey_king_boundless_strike_custom_crit = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_crit:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.bonus_damage
	self.crit = table.crit
end

function modifier_monkey_king_boundless_strike_custom_crit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
	}
end

function modifier_monkey_king_boundless_strike_custom_crit:GetModifierProcAttack_BonusDamage_Physical()
	return self.damage
end

function modifier_monkey_king_boundless_strike_custom_crit:GetModifierPreAttack_CriticalStrike()
	return self.crit
end

function modifier_monkey_king_boundless_strike_custom_crit:GetCritDamage()
	return self.crit
end

modifier_monkey_king_boundless_strike_custom_legendary = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_legendary:GetStatusEffectName()
	return "particles/econ/items/monkey_king/mk_ti9_immortal/status_effect_mk_ti9_immortal_army.vpcf"
end
function modifier_monkey_king_boundless_strike_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_monkey_king_boundless_strike_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.cast_point = self.caster:GetAbsOrigin()
	self.duration = self.ability.talents.q7_duration
	self.max_damage = self.ability.talents.q7_damage - 1
	self.damage = 1
	self.max_time = self.ability.talents.q7_max
	self.start_time = GameRules:GetDOTATime(false, false)

	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), self.ability:GetRange(), self.duration, false)

	self.particle =
		ParticleManager:CreateParticle("particles/monkey_king/command_buff.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 2, self.parent:GetAbsOrigin())
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.radius_visual = ParticleManager:CreateParticleForPlayer(
		"particles/monkey_king/strike_radius.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(
		self.radius_visual,
		1,
		Vector(self.ability:GetRange() + self.caster:GetCastRangeBonus(), 0, 0)
	)
	self:AddParticle(self.radius_visual, false, false, -1, false, false)

	self.parent:GenericParticle("particles/monkey_king/mk_buff_start.vpcf")

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_monkey_king_boundless_strike_custom_legendary_anim",
		{}
	)
	self:StartIntervalThink(self.duration)
end

function modifier_monkey_king_boundless_strike_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.caster:RemoveModifierByName("modifier_monkey_king_boundless_strike_custom_legendary_caster")

	if self.pre_particleID then
		ParticleManager:DestroyParticle(self.pre_particleID, false)
		ParticleManager:ReleaseParticleIndex(self.pre_particleID)
		self.pre_particleID = nil
	end

	self.parent:Kill(nil, nil)
end

function modifier_monkey_king_boundless_strike_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.cast then
		self:Activate_Strike()
		return
	end

	if self.cast and self.caster:IsAlive() then
		self.cast = nil
		self.ended = true

		if self.radius_visual then
			ParticleManager:DestroyParticle(self.radius_visual, true)
			ParticleManager:ReleaseParticleIndex(self.radius_visual)
			self.radius_visual = nil
		end

		self.ability:Strike(self.parent:GetAbsOrigin(), self.cast_point, self.damage)
		self:StartIntervalThink(0.15)
		return
	end

	if self.ended then
		self:StartIntervalThink(-1)
		self:Destroy()
		return
	end
end

function modifier_monkey_king_boundless_strike_custom_legendary:Activate_Strike()
	if not IsServer() then
		return
	end
	if self.cast then
		return
	end
	if self.ended then
		return
	end

	self.caster:RemoveModifierByName("modifier_monkey_king_boundless_strike_custom_legendary_caster")

	self.parent:FacePoint(self.cast_point)
	self.parent:FadeGesture(ACT_DOTA_VICTORY)

	local anim_k = self.ability.BaseClass.GetCastPoint(self.ability)
	local cast = self.ability:GetCastPoint(self.ability:GetLevel())
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_MK_STRIKE, anim_k / cast)

	self.parent:RemoveModifierByName("modifier_monkey_king_boundless_strike_custom_legendary_anim")
	self.parent:EmitSound("Hero_MonkeyKing.Strike.Cast")

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_monkey_king/monkey_king_strike_cast.vpcf",
		self
	)

	self.pre_particleID = ParticleManager:CreateParticle(particle_name, PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.pre_particleID, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.pre_particleID,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_bot",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.pre_particleID,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_weapon_top",
		self.parent:GetAbsOrigin(),
		true
	)

	self:SetDuration(cast + 0.5, true)

	local time = GameRules:GetDOTATime(false, false) - self.start_time
	self.damage = self.damage
		+ self.max_damage * math.pow(math.min(1, time / self.max_time), self.ability.talents.q7_damage_k)

	self.cast = true
	self:StartIntervalThink(cast)
end

function modifier_monkey_king_boundless_strike_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
	}
end

function modifier_monkey_king_boundless_strike_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_monkey_king_boundless_strike_custom_legendary:GetOverrideAnimation()
	return ACT_DOTA_VICTORY
end

function modifier_monkey_king_boundless_strike_custom_legendary:GetModifierModelScale()
	return 25
end

modifier_monkey_king_boundless_strike_custom_legendary_anim = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_legendary_anim:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.count = -1
	self.timer = self.ability.talents.q7_duration * 2

	self:StartIntervalThink(0.5)
	self:OnIntervalThink()
end

function modifier_monkey_king_boundless_strike_custom_legendary_anim:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.count = self.count + 1

	local number = (self.timer - self.count) / 2
	local int = number

	if number % 1 ~= 0 then
		int = number - 0.5
	end

	local digits = math.floor(math.log10(number)) + 2
	local decimal = number % 1

	if decimal == 0.5 then
		decimal = 8
	else
		decimal = 1
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_alchemist/alchemist_unstable_concoction_timer.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(0, int, decimal))
	ParticleManager:SetParticleControl(particle, 2, Vector(digits, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)
end

modifier_monkey_king_boundless_strike_custom_legendary_caster = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_legendary_caster:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.unit = EntIndexToHScript(table.unit)

	self.max = self.ability.talents.q7_max
	self.duration = self.ability.talents.q7_duration
	self.damage = self.ability.talents.q7_damage - 1

	self.ability:EndCd(0.5)

	self.interval = 0.1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_monkey_king_boundless_strike_custom_legendary_caster:OnDestroy()
	if not IsServer() then
		return
	end

	if not self.parent:IsAlive() and IsValid(self.unit) and self.unit:IsAlive() then
		self.unit:RemoveModifierByName("modifier_monkey_king_boundless_strike_custom_legendary")
	end

	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, style = "MonkeyStrike" })
end

function modifier_monkey_king_boundless_strike_custom_legendary_caster:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.unit) or not self.unit:IsAlive() then
		self:Destroy()
		return
	end

	local result = 1
		+ self.damage * math.min(1, math.pow(self:GetElapsedTime() / self.max, self.ability.talents.q7_damage_k))
	self.parent:UpdateUIshort({
		max_time = self.max,
		time = self:GetElapsedTime(),
		stack = math.floor(result * 100) .. "%",
		style = "MonkeyStrike",
	})
end

modifier_monkey_king_boundless_strike_custom_damage_bonus = class(mod_visible)
function modifier_monkey_king_boundless_strike_custom_damage_bonus:GetTexture()
	return "buffs/monkey_king/boundless_1"
end
function modifier_monkey_king_boundless_strike_custom_damage_bonus:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.talents.q1_damage
end

function modifier_monkey_king_boundless_strike_custom_damage_bonus:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_monkey_king_boundless_strike_custom_damage_bonus:GetModifierPreAttack_BonusDamage()
	return self.damage
end

modifier_monkey_king_boundless_strike_custom_tracker = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.is_clone = self.parent:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")

	if not self.is_clone then
		self.parent.boundless_ability = self.ability
	end

	self.bva = self.parent:GetBaseAttackTime(false)

	self.ability.stun = self.ability:GetSpecialValueFor("stun")
	self.ability.strike_crit_mult = self.ability:GetSpecialValueFor("strike_crit_mult")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
	self.ability.strike_radius = self.ability:GetSpecialValueFor("strike_radius")
	self.ability.strike_cast_range = self.ability:GetSpecialValueFor("strike_cast_range")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_monkey_king_boundless_strike_custom_tracker:OnRefresh(table)
	self.ability.stun = self.ability:GetSpecialValueFor("stun")
	self.ability.strike_crit_mult = self.ability:GetSpecialValueFor("strike_crit_mult")
	self.ability.bonus_damage = self.ability:GetSpecialValueFor("bonus_damage")
end

function modifier_monkey_king_boundless_strike_custom_tracker:GetProcChance()
	return 100
end

function modifier_monkey_king_boundless_strike_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_q1 == 1 and not params.no_cleave_flag then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			params.damage * self.ability.talents.q1_cleave,
			150,
			360,
			650,
			"particles/bloodseeker/thirst_cleave.vpcf"
		)
	end

	if self.ability.talents.has_q2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_monkey_king_boundless_strike_custom_slow",
			{ duration = self.ability.talents.q2_duration }
		)
	end
end

function modifier_monkey_king_boundless_strike_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_monkey_king_boundless_strike_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_monkey_king_boundless_strike_custom_tracker:GetModifierBaseAttackTimeConstant()
	if not self.bva then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	return self.ability.talents.q7_bva + self.bva
end

function modifier_monkey_king_boundless_strike_custom_tracker:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q7 == 0 then
		return
	end
	return self.ability.talents.q7_spell
end

function modifier_monkey_king_boundless_strike_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if not self.parent.monkey_q then
		return
	end
	if params.inflictor then
		return
	end
	if not params.target or not params.target:IsCreep() then
		return
	end
	return self.ability.creeps_damage * 100
end

modifier_monkey_king_boundless_strike_custom_slow = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_slow:IsPurgable()
	return true
end
function modifier_monkey_king_boundless_strike_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.q2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_monkey_king_boundless_strike_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_monkey_king_boundless_strike_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_monkey_king_boundless_strike_custom_armor = class(mod_visible)
function modifier_monkey_king_boundless_strike_custom_armor:GetTexture()
	return "buffs/monkey_king/boundless_3"
end
function modifier_monkey_king_boundless_strike_custom_armor:GetStatusEffectName()
	return "particles/status_fx/status_effect_huskar_lifebreak.vpcf"
end
function modifier_monkey_king_boundless_strike_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.boundless_ability

	if not self.ability then
		self:Destroy()
		return
	end

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)

	if self.parent:IsHero() then
		self.base_armor = self.parent:GetArmor(self)
	end

	self:SetHasCustomTransmitterData(true)
	self:SendBuffRefreshToClients()
end

function modifier_monkey_king_boundless_strike_custom_armor:AddCustomTransmitterData()
	return {
		base_armor = self.base_armor,
	}
end

function modifier_monkey_king_boundless_strike_custom_armor:HandleCustomTransmitterData(data)
	self.base_armor = data.base_armor
end

function modifier_monkey_king_boundless_strike_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_monkey_king_boundless_strike_custom_armor:GetModifierPhysicalArmorBonus()
	local armor = self.ability.talents.q3_base
	if self.base_armor then
		armor = armor + self.base_armor * self.ability.talents.q3_armor
	end
	return armor
end

modifier_monkey_king_boundless_strike_custom_move = class(mod_hidden)
function modifier_monkey_king_boundless_strike_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", self)
end

function modifier_monkey_king_boundless_strike_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_monkey_king_boundless_strike_custom_move:GetModifierSlowResistance_Stacking()
	return self.ability.talents.q4_slow_resist
end

function modifier_monkey_king_boundless_strike_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.q4_move
end