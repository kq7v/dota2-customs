--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_debuff",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_illusion",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_damage",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_damage_burn",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_skeleton_blast_3"
)
LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_stun",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_tracker",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_skeleton_king_hellfire_blast_custom_quest",
	"abilities/wraith_king/skeleton_king_hellfire_blast.lua",
	LUA_MODIFIER_MOTION_NONE
)

skeleton_king_hellfire_blast_custom = class({})
skeleton_king_hellfire_blast_custom.talents = {}

function skeleton_king_hellfire_blast_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/skeleton_king_weapon_blur_critical.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_skeletonking/skeleton_king_weapon_blur.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/skeleton_king_weapon_blur_reverse.vpcf",
		context
	)

	PrecacheResource("particle", "particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_explosion.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_warmup.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items4_fx/spirit_vessel_damage.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_wraithking_ghosts.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_ward_damage.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/wk_stun_legen.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/blast_radius.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/blast_delay_damage.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/blast_delay_damage_2.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_treant_death.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/blast_delay_damage_arcana.vpcf", context)
	PrecacheResource("particle", "particles/muerta/muerta_attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/wk_burn.vpcf", context)

	dota1x6:PrecacheShopItems("npc_dota_hero_skeleton_king", context)
end

function skeleton_king_hellfire_blast_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_damage = 0,
			q1_spell = 0,

			q2_cd = 0,
			q2_cast = 0,

			has_q3 = 0,
			q3_damage = 0,
			q3_damage_type = caster:GetTalentValue("modifier_skeleton_blast_3", "damage_type", true),
			q3_heal = caster:GetTalentValue("modifier_skeleton_blast_3", "heal", true) / 100,
			q3_duration = caster:GetTalentValue("modifier_skeleton_blast_3", "duration", true),
			q3_interval = caster:GetTalentValue("modifier_skeleton_blast_3", "interval", true),
			q3_burn_duration = caster:GetTalentValue("modifier_skeleton_blast_3", "burn_duration", true),
			q3_max = caster:GetTalentValue("modifier_skeleton_blast_3", "max", true) / 100,

			has_q4 = 0,
			q4_max_dist = caster:GetTalentValue("modifier_skeleton_blast_4", "max_dist", true),
			q4_duration = caster:GetTalentValue("modifier_skeleton_blast_4", "duration", true),
			q4_silence = caster:GetTalentValue("modifier_skeleton_blast_4", "silence", true),

			h1_range = 0,
			h1_stun = 0,

			has_h4 = 0,
			h4_heal_reduce = caster:GetTalentValue("modifier_skeleton_hero_4", "heal_reduce", true),
			h4_damage_reduce = caster:GetTalentValue("modifier_skeleton_hero_4", "damage_reduce", true),

			has_r3 = 0,
			r3_duration = caster:GetTalentValue("modifier_skeleton_reincarnation_3", "duration", true),
			r3_stun = caster:GetTalentValue("modifier_skeleton_reincarnation_3", "stun", true),
		}
	end

	if caster:HasTalent("modifier_skeleton_blast_1") then
		self.talents.q1_damage = caster:GetTalentValue("modifier_skeleton_blast_1", "damage")
		self.talents.q1_spell = caster:GetTalentValue("modifier_skeleton_blast_1", "spell")
	end

	if caster:HasTalent("modifier_skeleton_blast_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_skeleton_blast_2", "cd")
		self.talents.q2_cast = caster:GetTalentValue("modifier_skeleton_blast_2", "cast")
	end

	if caster:HasTalent("modifier_skeleton_blast_3") then
		self.talents.has_q3 = 1
		self.talents.q3_damage = caster:GetTalentValue("modifier_skeleton_blast_3", "damage") / 100
	end

	if caster:HasTalent("modifier_skeleton_blast_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_skeleton_hero_1") then
		self.talents.h1_range = caster:GetTalentValue("modifier_skeleton_hero_1", "range")
		self.talents.h1_stun = caster:GetTalentValue("modifier_skeleton_hero_1", "stun")
	end

	if caster:HasTalent("modifier_skeleton_hero_4") then
		self.talents.has_h4 = 1
		caster:AddProc(self.tracker, { land = true, illusion = true })
	end

	if caster:HasTalent("modifier_skeleton_reincarnation_3") then
		self.talents.has_r3 = 1
	end
end

function skeleton_king_hellfire_blast_custom:CreateTalent()
	self:ToggleAutoCast()
end

function skeleton_king_hellfire_blast_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "skeleton_king_hellfire_blast", self)
end

function skeleton_king_hellfire_blast_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_skeleton_king_hellfire_blast_custom_tracker"
end

function skeleton_king_hellfire_blast_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_q4 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE + bonus
end

function skeleton_king_hellfire_blast_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function skeleton_king_hellfire_blast_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.talents.q2_cast or 0)
end

function skeleton_king_hellfire_blast_custom:GetAOERadius()
	return self.radius or 0
end

function skeleton_king_hellfire_blast_custom:OnAbilityPhaseStart()
	local part_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_warmup.vpcf",
		self
	)
	local particle = ParticleManager:CreateParticle(part_name, PATTACH_CUSTOMORIGIN_FOLLOW, self.caster)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)
	return true
end

function skeleton_king_hellfire_blast_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	local speed = self.proj_speed

	local mod = target:FindModifierByName("modifier_skeleton_king_hellfire_blast_custom_illusion")
	if mod and IsValid(mod.target) and mod.target:IsAlive() and not mod.target:IsInvulnerable() then
		target = mod.target
		speed = speed * 1.7
	end

	local proj_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast.vpcf",
		self
	)

	local info = {
		EffectName = proj_name,
		Ability = self,
		iMoveSpeed = speed,
		Source = self.caster,
		Target = target,
		bDodgeable = self.talents.has_q4 == 0,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_2,
		ExtraData = {},
	}
	ProjectileManager:CreateTrackingProjectile(info)
	self.caster:EmitSound("Hero_SkeletonKing.Hellfire_Blast")
end

function skeleton_king_hellfire_blast_custom:OnProjectileHit_ExtraData(target, vLocation, table)
	if not IsServer() then
		return
	end
	if not target then
		return
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	if
		self.talents.has_q4 == 1
		and self:GetAutoCastState()
		and not target:HasModifier("modifier_skeleton_king_hellfire_blast_custom_illusion")
	then
		local dir = (self.caster:GetAbsOrigin() - target:GetAbsOrigin())
		local min_dist = 125
		local point = target:GetAbsOrigin()
		local distance = 0
		local duration = self.talents.q4_duration
		local max_dist = self.talents.q4_max_dist

		if dir:Length2D() > min_dist then
			point = self.caster:GetAbsOrigin() - dir:Normalized() * min_dist
			distance = (point - target:GetAbsOrigin()):Length2D()

			distance = math.min(max_dist, math.max(40, distance))
			point = target:GetAbsOrigin() + dir:Normalized() * distance
		end

		local mod = target:AddNewModifier(self.caster, self, "modifier_generic_arc", {
			target_x = point.x,
			target_y = point.y,
			distance = distance,
			duration = duration,
			height = 0,
			fix_end = false,
			isStun = false,
			activity = ACT_DOTA_FLAIL,
		})

		if mod then
			target:GenericParticle("particles/muerta/muerta_attack_slow.vpcf", mod)
		end
	end

	local stun_duration = self.stun_duration + self.talents.h1_stun
	local stun_damage = self.base_damage + self.talents.q1_damage

	target:EmitSound("Hero_SkeletonKing.Hellfire_BlastImpact")
	if self.talents.has_q3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_skeleton_king_hellfire_blast_custom_damage",
			{ duration = self.talents.q3_duration }
		)
	end

	if self.caster:GetQuest() == "Wraith.Quest_5" and target:IsRealHero() then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_skeleton_king_hellfire_blast_custom_quest",
			{ duration = self.caster.quest.number }
		)
	end

	if self.talents.has_r3 == 1 and IsValid(self.caster.reincarnate_ability) then
		local ability = self.caster.reincarnate_ability
		target:AddNewModifier(
			self.caster,
			ability,
			"modifier_skeleton_king_reincarnation_custom_magic",
			{ duration = self.talents.r3_duration, stack = self.talents.r3_stun }
		)
		if target:IsRealHero() then
			self.caster:AddNewModifier(
				self.caster,
				ability,
				"modifier_skeleton_king_reincarnation_custom_aura_str",
				{ duration = self.talents.r3_duration, stack = self.talents.r3_stun }
			)
		end
	end

	local aoe_effect = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/wraith_king/blast_delay_damage.vpcf",
		self
	)
	local particle = ParticleManager:CreateParticle(aoe_effect, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	local damageTable = { attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	for _, aoe_target in pairs(self.caster:FindTargets(self.radius, target:GetAbsOrigin())) do
		damageTable.victim = aoe_target
		damageTable.damage = stun_damage
		DoDamage(damageTable)
		aoe_target:AddNewModifier(
			self.caster,
			self,
			"modifier_skeleton_king_hellfire_blast_custom_stun",
			{ duration = stun_duration * (1 - aoe_target:GetStatusResistance()) }
		)
	end
end

modifier_skeleton_king_hellfire_blast_custom_damage = class(mod_hidden)
function modifier_skeleton_king_hellfire_blast_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage = self.ability.talents.q3_damage
	self.max_time = self.ability.talents.q3_duration
	self.max = self.ability.talents.q3_max

	if not IsServer() then
		return
	end
	self.parent:AddDamageEvent_inc(self, true)
	self.stack = 0

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_skeleton_king_hellfire_blast_custom_damage:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.caster:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self.stack,
		style = "WraithBlast",
	})
end

function modifier_skeleton_king_hellfire_blast_custom_damage:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.ended then
		return
	end

	local attacker = params.attacker
	if attacker.owner then
		attacker = attacker.owner
	end

	if self.caster ~= attacker then
		return
	end
	self.stack = math.min(self.parent:GetMaxHealth() * self.max, self.stack + params.original_damage * self.damage)
end

function modifier_skeleton_king_hellfire_blast_custom_damage:OnDestroy()
	if not IsServer() then
		return
	end

	self.ended = true

	if not self.parent:HasModifier("modifier_skeleton_king_hellfire_blast_custom_illusion") then
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "WraithBlast" })
	end

	if self.stack <= 0 then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_skeleton_king_hellfire_blast_custom_damage_burn",
		{ duration = self.ability.talents.q3_burn_duration + 0.2, stack = self.stack }
	)
end

modifier_skeleton_king_hellfire_blast_custom_damage_burn = class(mod_visible)
function modifier_skeleton_king_hellfire_blast_custom_damage_burn:GetTexture()
	return "buffs/wraith_king/blast_3"
end
function modifier_skeleton_king_hellfire_blast_custom_damage_burn:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.parent:GenericParticle("particles/wraith_king/blast_delay_damage_2.vpcf")
	self.parent:EmitSound("WK.Stun_blast")
	self.parent:EmitSound("WK.Stun_blast2")

	self.parent:GenericParticle("particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_debuff.vpcf", self)
	self.parent:GenericParticle("particles/wraith_king/wk_burn.vpcf", self)

	self.interval = self.ability.talents.q3_interval
	self.damage_type = self.ability.talents.q3_damage_type
	self.heal = self.ability.talents.q3_heal
	self.damage = table.stack
	self.max = (self.ability.talents.q3_burn_duration + 1) / self.interval
	self.damage_tick = self.damage / self.max

	self.damageTable = {
		attacker = self.caster,
		damage = self.damage_tick,
		victim = self.parent,
		ability = self.ability,
		damage_type = self.damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
	}

	self.count = self.max
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_skeleton_king_hellfire_blast_custom_damage_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_skeleton_blast_3")
	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(real_damage * result * self.heal, self.ability, nil, nil, "modifier_skeleton_blast_3")
	end
	self.parent:SendNumber(9, real_damage)

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_skeleton_king_hellfire_blast_custom_stun = class(mod_hidden)
function modifier_skeleton_king_hellfire_blast_custom_stun:IsStunDebuff()
	return true
end
function modifier_skeleton_king_hellfire_blast_custom_stun:IsPurgeException()
	return true
end
function modifier_skeleton_king_hellfire_blast_custom_stun:GetEffectName()
	return "particles/generic_gameplay/generic_stunned.vpcf"
end
function modifier_skeleton_king_hellfire_blast_custom_stun:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_skeleton_king_hellfire_blast_custom_stun:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow_duration = self.ability.slow_duration
end

function modifier_skeleton_king_hellfire_blast_custom_stun:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_skeleton_king_hellfire_blast_custom_debuff",
		{ duration = self.slow_duration }
	)

	if self.ability.talents.has_q4 == 1 then
		self.parent:EmitSound("SF.Raze_silence")
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_generic_silence",
			{ duration = self.ability.talents.q4_silence * (1 - self.parent:GetStatusResistance()) }
		)
	end
end

function modifier_skeleton_king_hellfire_blast_custom_stun:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_skeleton_king_hellfire_blast_custom_stun:GetOverrideAnimation()
	return ACT_DOTA_DISABLED
end

function modifier_skeleton_king_hellfire_blast_custom_stun:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

modifier_skeleton_king_hellfire_blast_custom_debuff = class(mod_visible)
function modifier_skeleton_king_hellfire_blast_custom_debuff:IsPurgable()
	return true
end
function modifier_skeleton_king_hellfire_blast_custom_debuff:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.per_damage = self.ability.dot_damage
	self.move_slow = self.ability.dot_slow
	self.count = self.ability.slow_duration

	if not IsServer() then
		return
	end
	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage = self.per_damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
	}

	local particle_name_debuff = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_debuff.vpcf",
		self
	)
	self.parent:GenericParticle(particle_name_debuff, self)

	self.interval = 1
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:GetModifierHealChange()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_heal_reduce
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:GetModifierHPRegenAmplify_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_heal_reduce
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_damage_reduce
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_damage_reduce
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.move_slow
end

function modifier_skeleton_king_hellfire_blast_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.count < 1 and self.ability.talents.has_h4 == 0 then
		return
	end

	self.count = self.count - 1
	DoDamage(self.damageTable)
end

modifier_skeleton_king_hellfire_blast_custom_tracker = class(mod_hidden)
function modifier_skeleton_king_hellfire_blast_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("skeleton_king_hellfire_blast_custom_legendary")
	if IsValid(self.legendary_ability) then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.ability.stun_duration = self.ability:GetSpecialValueFor("blast_stun_duration")
	self.ability.base_damage = self.ability:GetSpecialValueFor("blast_damage")
	self.ability.proj_speed = self.ability:GetSpecialValueFor("blast_speed")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.ability.dot_damage = self.ability:GetSpecialValueFor("blast_dot_damage")
	self.ability.dot_slow = self.ability:GetSpecialValueFor("blast_slow")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("blast_dot_duration")
end

function modifier_skeleton_king_hellfire_blast_custom_tracker:OnRefresh()
	self.ability.base_damage = self.ability:GetSpecialValueFor("blast_damage")
	self.ability.stun_duration = self.ability:GetSpecialValueFor("blast_stun_duration")
	self.ability.dot_damage = self.ability:GetSpecialValueFor("blast_dot_damage")
end

function modifier_skeleton_king_hellfire_blast_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_skeleton_king_hellfire_blast_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_skeleton_king_hellfire_blast_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.q1_spell
end

function modifier_skeleton_king_hellfire_blast_custom_tracker:GetProcChance()
	return 100
end

function modifier_skeleton_king_hellfire_blast_custom_tracker:AttackProc(params, name)
	local attacker = params.attacker

	if
		attacker ~= self.parent
		and (
			not attacker.owner
			or attacker.owner ~= self.parent
			or not attacker:HasModifier("modifier_skeleton_king_vampiric_aura_custom_skeleton_ai")
		)
	then
		return
	end

	params.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_skeleton_king_hellfire_blast_custom_debuff",
		{ duration = self.ability.slow_duration }
	)

	local mod = params.target:FindModifierByName("modifier_skeleton_king_hellfire_blast_custom_illusion")
	if not mod or not mod.target or mod.target:IsNull() or not mod.target:IsAlive() then
		return
	end

	mod.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_skeleton_king_hellfire_blast_custom_debuff",
		{ duration = self.ability.slow_duration }
	)
end

modifier_skeleton_king_hellfire_blast_custom_quest = class(mod_visible)

skeleton_king_hellfire_blast_custom_legendary = class({})
skeleton_king_hellfire_blast_custom_legendary.talents = {}

function skeleton_king_hellfire_blast_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			q7_talent_cd = caster:GetTalentValue("modifier_skeleton_blast_7", "talent_cd", true),
			q7_duration = caster:GetTalentValue("modifier_skeleton_blast_7", "duration", true),
			q7_damage = caster:GetTalentValue("modifier_skeleton_blast_7", "damage", true) / 100,
		}
	end

	if caster:HasTalent("modifier_skeleton_blast_7") then
		self.talents.has_q7 = 1
	end
end

function skeleton_king_hellfire_blast_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function skeleton_king_hellfire_blast_custom_legendary:GetCooldown()
	return self.talents.has_q7 == 1 and self.talents.q7_talent_cd or 0
end

function skeleton_king_hellfire_blast_custom_legendary:CastFilterResultTarget(target)
	if not IsServer() then
		return
	end

	if target:IsCreep() then
		return UF_FAIL_CREEP
	end

	return UnitFilter(
		target,
		self:GetAbilityTargetTeam(),
		self:GetAbilityTargetType(),
		self:GetAbilityTargetFlags(),
		self.caster:GetTeamNumber()
	)
end

function skeleton_king_hellfire_blast_custom_legendary:OnAbilityPhaseStart()
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_skeletonking/skeletonking_hellfireblast_warmup.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)
	return true
end

function skeleton_king_hellfire_blast_custom_legendary:OnSpellStart()
	local target = self:GetCursorTarget()

	if not target:IsHero() then
		return
	end

	self.caster:EmitSound("WK.Stun_legendary")
	self.caster:EmitSound("WK.Stun_legendary2")

	local duration = self.talents.q7_duration
	local illusion_target = target
	if illusion_target.lifestealer_creep and illusion_target.owner then
		illusion_target = illusion_target.owner
	end

	local illusion_self = CreateIllusions(illusion_target, illusion_target, {
		outgoing_damage = 0,
		incoming_damage = 0,
		duration = duration,
	}, 1, 0, false, false)

	for _, illusion in pairs(illusion_self) do
		illusion:SetHealth(illusion:GetMaxHealth())
		illusion.owner = target

		illusion:AddNewModifier(
			illusion,
			self,
			"modifier_skeleton_king_hellfire_blast_custom_illusion",
			{ duration = duration, caster = self.caster:entindex(), target = target:entindex() }
		)
		illusion:AddNewModifier(illusion, self, "modifier_chaos_knight_phantasm_illusion", {})
		FindClearSpaceForUnit(illusion, self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 200, false)

		local particle = ParticleManager:CreateParticle(
			"particles/wraith_king/wk_stun_legen.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			illusion,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			illusion:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

modifier_skeleton_king_hellfire_blast_custom_illusion = class(mod_hidden)
function modifier_skeleton_king_hellfire_blast_custom_illusion:GetStatusEffectName()
	return "particles/status_fx/status_effect_wraithking_ghosts.vpcf"
end
function modifier_skeleton_king_hellfire_blast_custom_illusion:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_skeleton_king_hellfire_blast_custom_illusion:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.caster = EntIndexToHScript(table.caster)
	self.target = EntIndexToHScript(table.target)
	self.ability = self:GetAbility()

	self.ability:EndCd()

	self.damage = self.ability.talents.q7_damage

	self.parent:AddDamageEvent_inc(self, true)
	self.caster:AddSpellEvent(self)

	self.damageTable =
		{ victim = self.target, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL, ability = self.ability }

	self.parent:StartGesture(ACT_DOTA_DISABLED)

	self.interval = 0.2
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.target or self.target:IsNull() or not self.target:IsAlive() then
		return
	end

	AddFOWViewer(self.caster:GetTeamNumber(), self.target:GetAbsOrigin(), 10, self.interval + 0.1, false)
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_ABSORB_SPELL,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:GetOverrideAnimation()
	return ACT_DOTA_DISABLED
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:GetModifierModelScale()
	return 20
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.caster ~= params.unit then
		return
	end
	local ability = params.ability

	if not IsValid(self.target) or not self.target:IsAlive() then
		return
	end
	if not ability or not params.target or params.target ~= self.parent then
		return
	end
	if not ability:IsItem() then
		return
	end

	self:PlayEffect()

	Timers:CreateTimer(FrameTime(), function()
		if IsValid(self.caster) then
			self.caster:SetCursorCastTarget(self.target)
			ability:OnSpellStart()
		end
	end)
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:GetAbsorbSpell(params)
	if not IsServer() then
		return
	end
	local ability = params.ability
	if not ability then
		return
	end

	local caster = params.ability:GetCaster()
	if not caster or caster ~= self.caster then
		return
	end

	return 1
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:PlayEffect()
	if not IsServer() then
		return
	end
	self.target:EmitSound("WK.Stun_legendary_damage")
	self.parent:EmitSound("WK.Stun_legendary_damage")

	local particle =
		ParticleManager:CreateParticle("particles/juggernaut/jugg_ward_damage.vpcf", PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end

	local attacker = params.attacker

	if attacker ~= self.caster and (not attacker.owner or attacker.owner ~= self.caster) then
		return
	end
	if not self.target or self.target:IsNull() or not self.target:IsAlive() then
		return
	end
	if params.original_damage < 0 then
		return
	end

	self:PlayEffect()

	self.damageTable.damage = params.original_damage * self.damage
	DoDamage(self.damageTable, "modifier_skeleton_blast_7")
end

function modifier_skeleton_king_hellfire_blast_custom_illusion:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	local particle =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_treant_death.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin() + Vector(0, 0, 40))
	ParticleManager:ReleaseParticleIndex(particle)
end