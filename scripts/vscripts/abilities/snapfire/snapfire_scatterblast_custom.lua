--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_debuff",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_stack",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_disarm_cd",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_move",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_tracker",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_reverse",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_heal",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_snapfire_scatterblast_custom_damage_reduce",
	"abilities/snapfire/snapfire_scatterblast_custom",
	LUA_MODIFIER_MOTION_NONE
)

snapfire_scatterblast_custom = class({})

snapfire_scatterblast_custom.array = {}

function snapfire_scatterblast_custom:CreateTalent()
	self:ToggleAutoCast()
	local caster = self:GetCaster()
	caster:AddNewModifier(caster, self, "modifier_snapfire_scatterblast_custom_reverse", {})
end

function snapfire_scatterblast_custom:GetAbilityTextureName()
	if self:GetCaster():HasModifier("modifier_snapfire_scatterblast_custom_reverse") then
		return "scatterblast_range"
	end
	return "snapfire_scatterblast"
end

function snapfire_scatterblast_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shells_impact.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_pointblank_impact_sparks.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf", context)
	PrecacheResource("particle", "particles/snapfire/snapfire_scatter_stack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_range_finder_aoe.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_full_bore.vpcf", context)
	PrecacheResource("particle", "particles/snapfire/scatter_range.vpcf", context)
end

function snapfire_scatterblast_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_snapfire_scatterblast_custom_tracker"
end

function snapfire_scatterblast_custom:OnAbilityPhaseStart()
	self:GetCaster():EmitSound("Hero_Snapfire.Shotgun.Load")
	return true
end

function snapfire_scatterblast_custom:OnAbilityPhaseInterrupted()
	self:GetCaster():StopSound("Hero_Snapfire.Shotgun.Load")
end

function snapfire_scatterblast_custom:GetManaCost(iLevel)
	local bonus = 0
	if self:GetCaster():HasTalent("modifier_snapfire_scatter_2") then
		bonus = self:GetCaster():GetTalentValue("modifier_snapfire_scatter_2", "mana")
	end
	return self.BaseClass.GetManaCost(self, iLevel) + bonus
end

function snapfire_scatterblast_custom:GetBehavior()
	local bonus = 0
	if self:GetCaster():HasTalent("modifier_snapfire_scatter_5") then
		bonus = DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + bonus
end

function snapfire_scatterblast_custom:GetCooldown(iLevel)
	local bonus = 0
	local caster = self:GetCaster()
	if caster:HasModifier("modifier_snapfire_scatterblast_custom_stack") then
		bonus = (
			caster:GetTalentValue("modifier_snapfire_scatter_4", "cd")
			/ caster:GetTalentValue("modifier_snapfire_scatter_4", "max")
		) * caster:GetUpgradeStack("modifier_snapfire_scatterblast_custom_stack")
	end
	return (self.BaseClass.GetCooldown(self, iLevel) + bonus)
end

function snapfire_scatterblast_custom:GetCastPoint()
	local bonus = 0
	if self:GetCaster():HasTalent("modifier_snapfire_scatter_1") then
		bonus = self:GetCaster():GetTalentValue("modifier_snapfire_scatter_1", "cast")
	end
	return self.BaseClass.GetCastPoint(self) + bonus
end

function snapfire_scatterblast_custom:GetCastRange(vLocation, hTarget)
	local bonus = 1
	if self:GetCaster():HasModifier("modifier_snapfire_scatterblast_custom_reverse") then
		bonus = bonus + self:GetCaster():GetTalentValue("modifier_snapfire_scatter_5", "range") / 100
	end
	return self:GetSpecialValueFor("distance") * bonus
end

function snapfire_scatterblast_custom:OnSpellStart(new_point, forced_auto)
	local caster = self:GetCaster()
	local point = self:GetCursorPosition()

	if new_point then
		point = new_point
	end

	if point == caster:GetAbsOrigin() then
		point = point + caster:GetForwardVector()
	end

	local auto = 0
	if forced_auto then
		auto = 1
	end

	local distance = self:GetSpecialValueFor("distance")
	local blast_width_initial = self:GetSpecialValueFor("blast_width_initial") / 2
	local blast_width_end = self:GetSpecialValueFor("blast_width_end") / 2
	local blast_speed = self:GetSpecialValueFor("blast_speed")
	local particle = "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun.vpcf"
	local reverse = 0
	local sound = "Hero_Snapfire.Shotgun.Fire"

	if caster:HasModifier("modifier_snapfire_scatterblast_custom_reverse") then
		distance = distance * (1 + caster:GetTalentValue("modifier_snapfire_scatter_5", "range") / 100)
		blast_width_initial = caster:GetTalentValue("modifier_snapfire_scatter_5", "width_start")
		blast_width_end = caster:GetTalentValue("modifier_snapfire_scatter_5", "width_end")
		particle = "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_full_bore.vpcf"
		reverse = 1
		sound = "Snapfire.Scatter_reverse"
	end

	local direction = point - caster:GetAbsOrigin()
	direction.z = 0
	direction = direction:Normalized()

	local info = {
		Source = caster,
		Ability = self,
		vSpawnOrigin = caster:GetAbsOrigin(),
		bDeleteOnHit = false,
		iUnitTargetTeam = self:GetAbilityTargetTeam(),
		iUnitTargetFlags = self:GetAbilityTargetFlags(),
		iUnitTargetType = self:GetAbilityTargetType(),
		EffectName = particle,
		fDistance = distance,
		fStartRadius = blast_width_initial,
		fEndRadius = blast_width_end,
		vVelocity = direction * blast_speed,
		bProvidesVision = false,
		ExtraData = {
			x = caster:GetAbsOrigin().x,
			y = caster:GetAbsOrigin().y,
			auto = auto,
			reverse = reverse,
		},
	}

	self.array[#self.array + 1] = 0
	local proj = ProjectileManager:CreateLinearProjectile(info)
	caster:EmitSound(sound)
end

function snapfire_scatterblast_custom:OnProjectileHit_ExtraData(target, location, extraData)
	local caster = self:GetCaster()

	if not target then
		local mod = caster:FindModifierByName("modifier_snapfire_scatterblast_custom_stack")

		if mod then
			if self.array[#self.array] ~= 2 then
				if extraData.auto == 0 then
					mod:Destroy()
				end
			else
				mod:SetDuration(caster:GetTalentValue("modifier_snapfire_scatter_4", "duration"), true)
			end
		end

		self.array[#self.array] = nil
		return
	end

	local point_blank_range = self:GetSpecialValueFor("point_blank_range")
	local point_blank_dmg_bonus_pct = self:GetSpecialValueFor("point_blank_dmg_bonus_pct") / 100
	local bonus = self:GetSpecialValueFor("point_blank_dmg_bonus_pct") / 100
	local damage = self:GetSpecialValueFor("damage")

	if caster:HasTalent("modifier_snapfire_scatter_1") then
		caster:AddNewModifier(caster, self, "modifier_snapfire_innate_custom_nocount", { duration = FrameTime() })
		damage = damage
			+ caster:GetAverageTrueAttackDamage(nil)
				* caster:GetTalentValue("modifier_snapfire_scatter_1", "damage")
				/ 100
		caster:RemoveModifierByName("modifier_snapfire_innate_custom_nocount")
	end

	local debuff_duration = self:GetSpecialValueFor("debuff_duration")
		+ caster:GetTalentValue("modifier_snapfire_scatter_3", "slow")
	local do_bonus = 0

	local origin = Vector(extraData.x, extraData.y, 0)
	local length = (target:GetAbsOrigin() - origin):Length2D()
	local reverse = extraData.reverse

	if (length <= point_blank_range and reverse == 0) or (length >= point_blank_range and reverse == 1) then
		do_bonus = 1
		debuff_duration = debuff_duration * (1 + bonus)

		if self.array[#self.array] ~= 2 then
			if caster:HasTalent("modifier_snapfire_scatter_2") then
				caster:AddNewModifier(
					caster,
					self,
					"modifier_snapfire_scatterblast_custom_heal",
					{ duration = caster:GetTalentValue("modifier_snapfire_scatter_2", "duration") }
				)
			end

			if caster:HasTalent("modifier_snapfire_scatter_6") then
				caster:CdItems(
					caster:GetTalentValue("modifier_snapfire_scatter_6", "cd_items"),
					"modifier_snapfire_scatter_6"
				)
				caster:RemoveModifierByName("modifier_snapfire_scatterblast_custom_move")
				caster:AddNewModifier(
					caster,
					self,
					"modifier_snapfire_scatterblast_custom_move",
					{ duration = caster:GetTalentValue("modifier_snapfire_scatter_6", "duration") }
				)
			end

			if caster:HasTalent("modifier_snapfire_scatter_7") then
				caster:CdAbility(
					self,
					self:GetCooldownTimeRemaining() * caster:GetTalentValue("modifier_snapfire_scatter_7", "cd") / 100,
					nil,
					"modifier_snapfire_scatter_7"
				)
			end
		end

		self.array[#self.array] = 2

		if target:IsRealHero() and caster:GetQuest() == "Snapfire.Quest_5" then
			caster:UpdateQuest(1)
		end

		damage = damage + (point_blank_dmg_bonus_pct * damage)

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_snapfire/hero_snapfire_shells_impact.vpcf",
			PATTACH_POINT_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			3,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			Vector(0, 0, 0),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		local particle2 = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_pointblank_impact_sparks.vpcf",
			PATTACH_POINT_FOLLOW,
			target
		)
		ParticleManager:SetParticleControlEnt(
			particle2,
			4,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			Vector(0, 0, 0),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle2)

		if
			caster:HasTalent("modifier_snapfire_scatter_5")
			and not target:HasModifier("modifier_snapfire_scatterblast_custom_disarm_cd")
		then
			target:AddNewModifier(
				caster,
				self,
				"modifier_stunned",
				{
					duration = (1 - target:GetStatusResistance())
						* caster:GetTalentValue("modifier_snapfire_scatter_5", "stun"),
				}
			)
			target:AddNewModifier(
				caster,
				self,
				"modifier_snapfire_scatterblast_custom_disarm_cd",
				{ duration = caster:GetTalentValue("modifier_snapfire_scatter_5", "cd") }
			)
		end

		if caster:HasTalent("modifier_snapfire_scatter_3") then
			target:AddNewModifier(
				caster,
				self,
				"modifier_snapfire_scatterblast_custom_damage_reduce",
				{ duration = caster:GetTalentValue("modifier_snapfire_scatter_3", "duration") }
			)
		end
	else
		if self.array[#self.array] == 0 then
			self.array[#self.array] = 1
		end
	end

	DoDamage({
		victim = target,
		attacker = caster,
		damage = damage,
		damage_type = self:GetAbilityDamageType(),
		ability = self,
	})
	target:AddNewModifier(
		caster,
		self,
		"modifier_snapfire_scatterblast_custom_debuff",
		{ bonus = do_bonus, duration = debuff_duration * (1 - target:GetStatusResistance()) }
	)

	target:GenericParticle("particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_impact.vpcf")

	target:EmitSound("Hero_Snapfire.Shotgun.Target")
end

modifier_snapfire_scatterblast_custom_debuff = class({})
function modifier_snapfire_scatterblast_custom_debuff:IsHidden()
	return false
end
function modifier_snapfire_scatterblast_custom_debuff:IsPurgable()
	return true
end
function modifier_snapfire_scatterblast_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_snapfire_scatterblast_custom_debuff:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability:GetSpecialValueFor("movement_slow_pct")
	self.attack_slow = -1 * self.ability:GetSpecialValueFor("attack_slow_pct")
	self.bonus = self.ability:GetSpecialValueFor("point_blank_dmg_bonus_pct") / 100

	if not IsServer() then
		return
	end
	self:SetStackCount(table.bonus)
end

function modifier_snapfire_scatterblast_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow * (1 + self:GetStackCount() * self.bonus)
end
function modifier_snapfire_scatterblast_custom_debuff:GetModifierAttackSpeedBonus_Constant()
	return self.attack_slow * (1 + self:GetStackCount() * self.bonus)
end

function modifier_snapfire_scatterblast_custom_debuff:GetEffectName()
	return "particles/units/heroes/hero_snapfire/hero_snapfire_shotgun_debuff.vpcf"
end

function modifier_snapfire_scatterblast_custom_debuff:GetEffectAttachType()
	return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_snapfire_scatterblast_custom_debuff:GetStatusEffectName()
	return "particles/status_fx/status_effect_snapfire_slow.vpcf"
end

function modifier_snapfire_scatterblast_custom_debuff:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end

modifier_snapfire_scatterblast_custom_damage_reduce = class({})
function modifier_snapfire_scatterblast_custom_damage_reduce:IsHidden()
	return false
end
function modifier_snapfire_scatterblast_custom_damage_reduce:IsPurgable()
	return false
end
function modifier_snapfire_scatterblast_custom_damage_reduce:GetTexture()
	return "buffs/bush_slow"
end
function modifier_snapfire_scatterblast_custom_damage_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_snapfire_scatterblast_custom_damage_reduce:OnCreated(table)
	self.caster = self:GetCaster()
	self.damage_reduce = self.caster:GetTalentValue("modifier_snapfire_scatter_3", "damage_reduce")
end

function modifier_snapfire_scatterblast_custom_damage_reduce:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_snapfire_scatterblast_custom_damage_reduce:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce
end

modifier_snapfire_scatterblast_custom_stack = class({})
function modifier_snapfire_scatterblast_custom_stack:IsHidden()
	return true
end
function modifier_snapfire_scatterblast_custom_stack:IsPurgable()
	return false
end
function modifier_snapfire_scatterblast_custom_stack:GetTexture()
	return "buffs/scatter_damage"
end
function modifier_snapfire_scatterblast_custom_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.max = self.parent:GetTalentValue("modifier_snapfire_scatter_4", "max", true)
	self.damage = self.parent:GetTalentValue("modifier_snapfire_scatter_4", "damage") / self.max

	if not IsServer() then
		return
	end
	self.particle = self.parent:GenericParticle("particles/snapfire/snapfire_scatter_stack.vpcf", self, true)

	self.RemoveForDuel = true
	self:SetStackCount(1)
end

function modifier_snapfire_scatterblast_custom_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_snapfire_scatterblast_custom_stack:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end

	if self.particle then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end

	local mod = self.parent:FindModifierByName("modifier_snapfire_scatterblast_custom_tracker")
	if mod then
		mod:UpdateJs()
	end
end

function modifier_snapfire_scatterblast_custom_stack:OnDestroy()
	if not IsServer() then
		return
	end
	self:OnStackCountChanged()
end

function modifier_snapfire_scatterblast_custom_stack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_snapfire_scatterblast_custom_stack:GetModifierSpellAmplify_Percentage()
	return self:GetStackCount() * self.damage
end

modifier_snapfire_scatterblast_custom_disarm_cd = class({})
function modifier_snapfire_scatterblast_custom_disarm_cd:IsHidden()
	return true
end
function modifier_snapfire_scatterblast_custom_disarm_cd:IsPurgable()
	return false
end

modifier_snapfire_scatterblast_custom_tracker = class({})
function modifier_snapfire_scatterblast_custom_tracker:IsHidden()
	return true
end
function modifier_snapfire_scatterblast_custom_tracker:IsPurgable()
	return false
end
function modifier_snapfire_scatterblast_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.stack_duration = self.parent:GetTalentValue("modifier_snapfire_scatter_4", "duration", true)
	self.stack_max = self.parent:GetTalentValue("modifier_snapfire_scatter_4", "max", true)

	self.parent:AddAttackStartEvent_out(self)
	if not IsServer() then
		return
	end
	self:StartIntervalThink(1)
end

function modifier_snapfire_scatterblast_custom_tracker:OnRefresh()
	self:OnCreated()
end

function modifier_snapfire_scatterblast_custom_tracker:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasTalent("modifier_snapfire_scatter_4") then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_snapfire_scatterblast_custom_stack",
		{ duration = self.stack_duration }
	)
end

function modifier_snapfire_scatterblast_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:HasTalent("modifier_snapfire_scatter_4") then
		return
	end
	self:UpdateJs()
end

function modifier_snapfire_scatterblast_custom_tracker:UpdateJs()
	if not IsServer() then
		return
	end
	local mod = self.parent:FindModifierByName("modifier_snapfire_scatterblast_custom_stack")
	local stack = 0
	if mod then
		stack = mod:GetStackCount()
	end

	self.parent:UpdateUIlong({ max = self.stack_max, stack = stack, style = "SnapfireScatter" })
end

modifier_snapfire_scatterblast_custom_reverse = class({})
function modifier_snapfire_scatterblast_custom_reverse:IsHidden()
	return false
end
function modifier_snapfire_scatterblast_custom_reverse:IsPurgable()
	return false
end
function modifier_snapfire_scatterblast_custom_reverse:RemoveOnDeath()
	return false
end

modifier_snapfire_scatterblast_custom_move = class({})
function modifier_snapfire_scatterblast_custom_move:IsHidden()
	return false
end
function modifier_snapfire_scatterblast_custom_move:IsPurgable()
	return false
end
function modifier_snapfire_scatterblast_custom_move:GetTexture()
	return "buffs/shot_haste"
end
function modifier_snapfire_scatterblast_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.move = self.parent:GetTalentValue("modifier_snapfire_scatter_6", "speed")
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", self)
end

function modifier_snapfire_scatterblast_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_snapfire_scatterblast_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

modifier_snapfire_scatterblast_custom_heal = class({})
function modifier_snapfire_scatterblast_custom_heal:IsHidden()
	return true
end
function modifier_snapfire_scatterblast_custom_heal:IsPurgable()
	return false
end
function modifier_snapfire_scatterblast_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_snapfire_scatterblast_custom_heal:GetModifierHealthRegenPercentage()
	return self.heal
end

function modifier_snapfire_scatterblast_custom_heal:OnCreated()
	self.parent = self:GetParent()

	self.heal = self.parent:GetTalentValue("modifier_snapfire_scatter_2", "heal") / self:GetRemainingTime()
	if not IsServer() then
		return
	end
	self:StartIntervalThink(0.98)
end

function modifier_snapfire_scatterblast_custom_heal:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic_gameplay/generic_lifesteal.vpcf")
	self.parent:SendNumber(10, self.heal * self.parent:GetMaxHealth() / 100)
end