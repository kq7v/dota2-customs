--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_bristleback_viscous_nasal_goo_custom",
	"abilities/bristleback/bristleback_viscous_nasal_goo_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_bristleback_viscous_nasal_goo_tracker",
	"abilities/bristleback/bristleback_viscous_nasal_goo_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bristleback_viscous_nasal_goo_armor",
	"abilities/bristleback/bristleback_viscous_nasal_goo_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_goo_3"
)
LinkLuaModifier(
	"modifier_bristleback_viscous_nasal_goo_custom_silence_cd",
	"abilities/bristleback/bristleback_viscous_nasal_goo_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bristleback_viscous_nasal_goo_custom_legendary",
	"abilities/bristleback/bristleback_viscous_nasal_goo_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bristle_goo_7"
)
LinkLuaModifier(
	"modifier_bristleback_viscous_nasal_goo_custom_legendary_cd",
	"abilities/bristleback/bristleback_viscous_nasal_goo_custom",
	LUA_MODIFIER_MOTION_NONE
)

bristleback_viscous_nasal_goo_custom = class({})
bristleback_viscous_nasal_goo_custom.talents = {}

function bristleback_viscous_nasal_goo_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo_debuff.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_stack.vpcf",
		context
	)
	PrecacheResource("particle", "particles/bristleback/goo_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/goo_legendary_proc_2.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/alch_root.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/goo_legendary_active.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/goo_legendary_screen.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_proc.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_legendary.vpcf", context)
end

function bristleback_viscous_nasal_goo_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_speed = 0,
			q1_damage = 0,
			q1_interval = caster:GetTalentValue("modifier_bristle_goo_1", "interval", true),
			q1_damage_type = caster:GetTalentValue("modifier_bristle_goo_1", "damage_type", true),

			q2_cd = 0,
			q2_range = 0,

			has_q3 = 0,
			q3_slow = 0,
			q3_armor = 0,
			q3_duration = caster:GetTalentValue("modifier_bristle_goo_3", "duration", true),
			q3_max = caster:GetTalentValue("modifier_bristle_goo_3", "max", true),

			has_q4 = 0,
			q4_damage_reduce = caster:GetTalentValue("modifier_bristle_goo_4", "damage_reduce", true),
			q4_stack = caster:GetTalentValue("modifier_bristle_goo_4", "stack", true),
			q4_talent_cd = caster:GetTalentValue("modifier_bristle_goo_4", "talent_cd", true),
			q4_silence = caster:GetTalentValue("modifier_bristle_goo_4", "silence", true),
			q4_max = caster:GetTalentValue("modifier_bristle_goo_4", "max", true),

			has_q7 = 0,
			q7_stack = caster:GetTalentValue("modifier_bristle_goo_7", "stack", true),
			q7_stun_cd = caster:GetTalentValue("modifier_bristle_goo_7", "stun_cd", true),
			q7_stun = caster:GetTalentValue("modifier_bristle_goo_7", "stun", true),
			q7_chance = caster:GetTalentValue("modifier_bristle_goo_7", "chance", true),
			q7_duration = caster:GetTalentValue("modifier_bristle_goo_7", "duration", true),
			q7_status = caster:GetTalentValue("modifier_bristle_goo_7", "status", true),
			q7_bva = caster:GetTalentValue("modifier_bristle_goo_7", "bva", true),
			q7_talent_cd = caster:GetTalentValue("modifier_bristle_goo_7", "talent_cd", true),

			has_w7 = 0,
		}
	end

	if caster:HasTalent("modifier_bristle_goo_1") then
		self.talents.has_q1 = 1
		self.talents.q1_speed = caster:GetTalentValue("modifier_bristle_goo_1", "speed")
		self.talents.q1_damage = caster:GetTalentValue("modifier_bristle_goo_1", "damage") / 100
	end

	if caster:HasTalent("modifier_bristle_goo_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_bristle_goo_2", "cd")
		self.talents.q2_range = caster:GetTalentValue("modifier_bristle_goo_2", "range")
	end

	if caster:HasTalent("modifier_bristle_goo_3") then
		self.talents.has_q3 = 1
		self.talents.q3_slow = caster:GetTalentValue("modifier_bristle_goo_3", "slow")
		self.talents.q3_armor = caster:GetTalentValue("modifier_bristle_goo_3", "armor")
	end

	if caster:HasTalent("modifier_bristle_goo_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_bristle_goo_7") then
		self.talents.has_q7 = 1
		caster:AddAttackRecordEvent_out(self.tracker)
	end

	if caster:HasTalent("modifier_bristle_spray_7") then
		self.talents.has_w7 = 1
	end
end

function bristleback_viscous_nasal_goo_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "bristleback_viscous_nasal_goo", self)
end

function bristleback_viscous_nasal_goo_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_bristleback_viscous_nasal_goo_tracker"
end

function bristleback_viscous_nasal_goo_custom:GetBehavior()
	return (self.caster:HasScepter() and DOTA_ABILITY_BEHAVIOR_NO_TARGET or DOTA_ABILITY_BEHAVIOR_UNIT_TARGET)
		+ DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
end

function bristleback_viscous_nasal_goo_custom:GetCastRange(vLocation, hTarget)
	local result = self.cast_range or 0
	if self.caster:HasScepter() then
		result = result - self.caster:GetCastRangeBonus() + (self.talents.q2_range or 0)
	end
	return result
end

function bristleback_viscous_nasal_goo_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) + (self.caster:HasScepter() and (self.scepter_cast or 0) or 0)
end

function bristleback_viscous_nasal_goo_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function bristleback_viscous_nasal_goo_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	local sound_name = wearables_system:GetSoundReplacement(self.caster, "Hero_Bristleback.ViscousGoo.Cast", self)
	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo.vpcf",
		self
	)
	self.caster:EmitSound(sound_name)

	local projectile = {
		Source = self.caster,
		Ability = self,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_3,
		EffectName = pfx_name,
		iMoveSpeed = self.goo_speed,
		vSourceLoc = self.caster:GetAbsOrigin(),
		bDrawsOnMinimap = false,
		bDodgeable = true,
		bIsAttack = false,
		bVisibleToEnemies = true,
		bReplaceExisting = false,
		flExpireTime = GameRules:GetGameTime() + 10,
		bProvidesVision = false,
		ExtraData = {},
	}

	local hit_type = 0
	local radius = self.cast_range + self.talents.q2_range

	if self.caster:HasScepter() then
		for _, aoe_target in pairs(self.caster:FindTargets(radius, nil, nil, DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE)) do
			if aoe_target:IsHero() then
				hit_type = 2
			elseif hit_type == 0 then
				hit_type = 1
			end
			projectile.Target = aoe_target
			ProjectileManager:CreateTrackingProjectile(projectile)
		end
	else
		hit_type = target:IsHero() and 2 or 1
		projectile.Target = target
		ProjectileManager:CreateTrackingProjectile(projectile)
	end

	if hit_type ~= 0 and self.caster.warpath_ability and self.caster.warpath_ability.tracker then
		self.caster.warpath_ability.tracker:AddStack(hit_type == 2)
	end
end

function bristleback_viscous_nasal_goo_custom:OnProjectileHit_ExtraData(target, vLocation, ExtraData)
	if not target then
		return
	end
	if target:TriggerSpellAbsorb(self) then
		return
	end
	self:AddStack(target)
end

function bristleback_viscous_nasal_goo_custom:AddStack(target)
	if not IsServer() then
		return
	end
	if not IsValid(target) then
		return
	end

	if self.caster.bristleback_innate then
		self.caster.bristleback_innate:ProcHit(target)
	end

	if self.talents.has_q3 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_bristleback_viscous_nasal_goo_armor",
			{ duration = self.talents.q3_duration }
		)
	end

	target:EmitSound("Hero_Bristleback.ViscousGoo.Target")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_bristleback_viscous_nasal_goo_custom",
		{ duration = self.goo_duration }
	)
end

modifier_bristleback_viscous_nasal_goo_custom = class(mod_visible)
function modifier_bristleback_viscous_nasal_goo_custom:IsPurgable()
	return true
end
function modifier_bristleback_viscous_nasal_goo_custom:GetStatusEffectName()
	return "particles/status_fx/status_effect_goo.vpcf"
end
function modifier_bristleback_viscous_nasal_goo_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_bristleback_viscous_nasal_goo_custom:OnCreated()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.RemoveForDuel = true

	self.armor_per_stack = self.ability.armor_per_stack
	self.move_slow_per_stack = self.ability.move_slow_per_stack
	self.stack_limit = self.ability.stack_limit
		+ (self.ability.talents.has_q4 == 1 and self.ability.talents.q4_max or 0)
	self.magic_resist = self.ability.magic_resist

	if not IsServer() then
		return
	end
	local effect = self.ability.talents.has_q7 == 1 and "particles/bristleback/goo_legendary_stack.vpcf"
		or "particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_stack.vpcf"
	self.particle = self.parent:GenericParticle(effect, self, true)
	self.has_quest = self.caster:GetQuest() == "Brist.Quest_5"
		and self.caster:QuestCompleted() == false
		and self.parent:IsRealHero()

	self.interval = self.ability.talents.q1_interval

	self.damageTable = {
		victim = self.parent,
		damage_type = self.ability.talents.q1_damage_type,
		attacker = self.caster,
		ability = self.ability,
	}

	if self.has_quest or self.ability.talents.has_q1 == 1 then
		self:StartIntervalThink(self.interval)
	end

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo_debuff.vpcf",
		self
	)

	if pfx_name ~= "particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo_debuff.vpcf" then
		local particle = ParticleManager:CreateParticle(pfx_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControl(particle, 1, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(particle, false, false, -1, true, false)
	else
		self.parent:GenericParticle(pfx_name, self)
	end
	self:OnRefresh()
end

function modifier_bristleback_viscous_nasal_goo_custom:OnRefresh()
	if not IsServer() then
		return
	end

	if self:GetStackCount() < self.stack_limit then
		self:IncrementStackCount()
	end

	if self.particle then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end

	if
		self.ability.talents.has_q4 == 1
		and self:GetStackCount() >= self.ability.talents.q4_stack
		and not self.parent:HasModifier("modifier_bristleback_viscous_nasal_goo_custom_silence_cd")
	then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_generic_silence",
			{ duration = self.ability.talents.q4_silence * (1 - self.parent:GetStatusResistance()) }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bristleback_viscous_nasal_goo_custom_silence_cd",
			{ duration = self.ability.talents.q4_talent_cd }
		)
		self.parent:EmitSound("BB.Goo_silence")
	end
end

function modifier_bristleback_viscous_nasal_goo_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_q1 == 1 then
		self.damageTable.damage = self.caster:GetAverageTrueAttackDamage(nil)
			* self.ability.talents.q1_damage
			* self.interval
		DoDamage(self.damageTable, "modifier_bristle_goo_1")
	end

	if not self.has_quest or self:GetStackCount() < self.caster.quest.number then
		return
	end
	self.caster:UpdateQuest(self.interval)
end

function modifier_bristleback_viscous_nasal_goo_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_bristleback_viscous_nasal_goo_custom:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce * self:GetStackCount()
end

function modifier_bristleback_viscous_nasal_goo_custom:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce * self:GetStackCount()
end

function modifier_bristleback_viscous_nasal_goo_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.move_slow_per_stack * self:GetStackCount()
end

function modifier_bristleback_viscous_nasal_goo_custom:GetModifierPhysicalArmorBonus()
	if self.ability.talents.has_w7 == 1 then
		return
	end
	return self.armor_per_stack * self:GetStackCount()
end

function modifier_bristleback_viscous_nasal_goo_custom:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_w7 == 0 then
		return
	end
	return self.magic_resist * self:GetStackCount()
end

modifier_bristleback_viscous_nasal_goo_tracker = class(mod_hidden)
function modifier_bristleback_viscous_nasal_goo_tracker:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.goo_ability = self.ability
	self.parent.hairball_ability = self.parent:FindAbilityByName("bristleback_hairball_custom")

	self.ability.scepter_cast = self.ability:GetSpecialValueFor("scepter_cast")
	self.ability.goo_speed = self.ability:GetSpecialValueFor("goo_speed")
	self.ability.goo_duration = self.ability:GetSpecialValueFor("goo_duration")
	self.ability.armor_per_stack = self.ability:GetSpecialValueFor("armor_per_stack")
	self.ability.magic_resist = self.ability:GetSpecialValueFor("magic_resist")
	self.ability.move_slow_per_stack = self.ability:GetSpecialValueFor("move_slow_per_stack")
	self.ability.stack_limit = self.ability:GetSpecialValueFor("stack_limit")
	self.ability.cast_range = self.ability:GetSpecialValueFor("cast_range")
end

function modifier_bristleback_viscous_nasal_goo_tracker:OnRefresh()
	self.ability.magic_resist = self.ability:GetSpecialValueFor("magic_resist")
	self.ability.armor_per_stack = self.ability:GetSpecialValueFor("armor_per_stack")
	self.ability.move_slow_per_stack = self.ability:GetSpecialValueFor("move_slow_per_stack")
end

function modifier_bristleback_viscous_nasal_goo_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.parent:HasModifier("modifier_bristleback_viscous_nasal_goo_custom_legendary") then
		return
	end
	if self.parent:HasModifier("modifier_bristleback_viscous_nasal_goo_custom_legendary_cd") then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	local mod = params.target:FindModifierByName("modifier_bristleback_viscous_nasal_goo_custom")
	if not mod or mod:GetStackCount() < self.ability.talents.q7_stack then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bristleback_viscous_nasal_goo_custom_legendary",
		{ duration = self.ability.talents.q7_duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bristleback_viscous_nasal_goo_custom_legendary_cd",
		{ duration = self.ability.talents.q7_talent_cd }
	)
end

function modifier_bristleback_viscous_nasal_goo_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_bristleback_viscous_nasal_goo_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.q2_range
end

function modifier_bristleback_viscous_nasal_goo_tracker:GetModifierAttackSpeedBonus_Constant()
	return self.ability.talents.q1_speed
end

modifier_bristleback_viscous_nasal_goo_armor = class(mod_visible)
function modifier_bristleback_viscous_nasal_goo_armor:GetTexture()
	return "buffs/bristleback/goo_3"
end
function modifier_bristleback_viscous_nasal_goo_armor:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q3_max
	self.armor = self.ability.talents.q3_armor / self.max
	self.slow = self.ability.talents.q3_slow / self.max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_bristleback_viscous_nasal_goo_armor:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
		self.parent:EmitSound("BB.Goo_armor")
	end
end

function modifier_bristleback_viscous_nasal_goo_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_bristleback_viscous_nasal_goo_armor:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * self:GetStackCount()
end

function modifier_bristleback_viscous_nasal_goo_armor:GetModifierPhysicalArmorBonus()
	return self.armor * self:GetStackCount()
end

modifier_bristleback_viscous_nasal_goo_custom_silence_cd = class(mod_hidden)

modifier_bristleback_viscous_nasal_goo_custom_legendary = class(mod_hidden)
function modifier_bristleback_viscous_nasal_goo_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_legion_commander_duel.vpcf"
end
function modifier_bristleback_viscous_nasal_goo_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_bristleback_viscous_nasal_goo_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("BB.Back_legendary_active")
	self.parent:EmitSound("BB.Back_legendary_active2")
	self.parent:EmitSound("BB.Warpath_rampage")
	self.parent:GenericParticle("particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", self)

	self.particle = ParticleManager:CreateParticleForPlayer(
		"particles/bristleback/goo_legendary_screen.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID())
	)
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.RemoveForDuel = true
	self.max_duration = self:GetRemainingTime()

	self.parent:GenericParticle("particles/bristleback/goo_legendary_active.vpcf", self)
	self.parent:GenericParticle("particles/bristleback/brist_proc.vpcf")
	self.legendary_particle =
		ParticleManager:CreateParticle("particles/bloodseeker/thirst_legendary.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.legendary_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.legendary_particle, false, false, -1, false, false)

	self.parent:AddProc(self, { cd = self.ability.talents.q7_stun_cd, land = true })

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:GetProcChance()
	return self.ability.talents.q7_chance
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:AttackProc(params)
	local target = params.target

	local effect_cast = ParticleManager:CreateParticle(
		"particles/bristleback/goo_legendary_proc_2.vpcf",
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

	target:EmitSound("BB.Goo_bash")
	target:AddNewModifier(
		self.parent,
		self.parent:BkbAbility(self.ability, true),
		"modifier_bashed",
		{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.q7_stun }
	)
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:GetModifierModelScale()
	return 20
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:GetModifierBaseAttackTimeConstant()
	return self.ability.talents.q7_bva
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:GetModifierStatusResistanceStacking()
	return self.ability.talents.q7_status
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_duration,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		priority = 2,
		style = "BristGoo",
	})
end

function modifier_bristleback_viscous_nasal_goo_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({ hide = 1, style = "BristGoo" })
end

modifier_bristleback_viscous_nasal_goo_custom_legendary_cd = class(mod_cd)