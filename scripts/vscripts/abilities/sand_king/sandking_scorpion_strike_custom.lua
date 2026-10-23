--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_damage",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_slow",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_attack",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_legendary_stack",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_attack_speed",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_perma",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_sand_king_finale_4"
)
LinkLuaModifier(
	"modifier_sandking_scorpion_strike_custom_stun_cd",
	"abilities/sand_king/sandking_scorpion_strike_custom",
	LUA_MODIFIER_MOTION_NONE
)

sandking_scorpion_strike_custom = class({})

function sandking_scorpion_strike_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_sandking/sandking_scorpion_strike_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sandking/sandking_scorpion_strike_hit.vpcf", context)
	PrecacheResource("particle", "particles/neutral_fx/gnoll_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/sandking_scorpion_strike_tell.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/stinger_stack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_dispose_debuff.vpcf", context)
	PrecacheResource("particle", "particles/sand_king/finale_double_hit.vpcf", context)
	PrecacheResource("particle", "particles/mars/mars_revenge_proc.vpcf", context)
end

function sandking_scorpion_strike_custom:GetAOERadius()
	return self:GetSpecialValueFor("radius")
end

function sandking_scorpion_strike_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_sandking_scorpion_strike_custom"
end

function sandking_scorpion_strike_custom:GetCastPoint()
	local bonus = 0
	if self:GetCaster():HasTalent("modifier_sand_king_finale_6") then
		bonus = self:GetCaster():GetTalentValue("modifier_sand_king_finale_6", "cast")
	end
	return self:GetSpecialValueFor("AbilityCastPoint") + bonus
end

function sandking_scorpion_strike_custom:GetManaCost(level)
	if self:GetCaster():HasTalent("modifier_sand_king_finale_6") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function sandking_scorpion_strike_custom:GetCooldown(level)
	local caster = self:GetCaster()
	local bonus = 0
	local k = 1
	if caster:HasModifier("modifier_sandking_epicenter_custom") and caster:HasScepter() then
		k = 1 + self:GetSpecialValueFor("scepter_cd") / 100
	end
	if caster:HasTalent("modifier_sand_king_finale_3") then
		bonus = caster:GetTalentValue("modifier_sand_king_finale_3", "cd")
	end
	return k * (self.BaseClass.GetCooldown(self, level) + bonus)
end

function sandking_scorpion_strike_custom:GetCastRange(vLocation, hTarget)
	local bonus = 0
	if self:GetCaster():HasTalent("modifier_sand_king_finale_3") then
		bonus = self:GetCaster():GetTalentValue("modifier_sand_king_finale_3", "range")
	end
	return self:GetSpecialValueFor("AbilityCastRange") + bonus
end

function sandking_scorpion_strike_custom:OnSpellStart()
	local caster = self:GetCaster()
	local radius = self:GetSpecialValueFor("radius")
	local inner = self:GetSpecialValueFor("inner_radius")
	local duration = self:GetSpecialValueFor("debuff_duration")
	local point = self:GetCursorPosition()

	local legendary_duration = caster:GetTalentValue("modifier_sand_king_finale_7", "duration", true)

	local targets = caster:FindTargets(radius, point)
	local caustic = caster:FindAbilityByName("sandking_caustic_finale_custom")
	local more_stack = self:GetSpecialValueFor("scepter_stack")

	local stun_cd = caster:GetTalentValue("modifier_sand_king_finale_6", "cd")
	local stun_duration = caster:GetTalentValue("modifier_sand_king_finale_6", "stun")

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_sandking/sandking_scorpion_strike_aoe.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, point)
	ParticleManager:SetParticleControl(particle, 1, Vector(radius * 1.1, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	EmitSoundOnLocationWithCaster(point, "Hero_Sandking.Stinger", caster)

	local mod = caster:AddNewModifier(caster, self, "modifier_sandking_scorpion_strike_custom_damage", {})
	local hit_center = false

	for _, target in pairs(targets) do
		local dist = (target:GetAbsOrigin() - point):Length2D()
		if mod then
			if dist <= inner then
				mod:SetStackCount(1)
				hit_center = true

				if target:IsRealHero() then
					caster:AddNewModifier(caster, self, "modifier_sandking_scorpion_strike_custom_perma", {})
					if caster:GetQuest() == "Sand.Quest_7" then
						caster:UpdateQuest(1)
					end
				end

				if caster:HasTalent("modifier_sand_king_finale_7") then
					target:AddNewModifier(
						caster,
						self,
						"modifier_sandking_scorpion_strike_custom_legendary_stack",
						{ duration = legendary_duration }
					)
				end

				if
					caster:HasTalent("modifier_sand_king_finale_6")
					and not target:HasModifier("modifier_sandking_scorpion_strike_custom_stun_cd")
				then
					target:AddNewModifier(
						caster,
						self,
						"modifier_sandking_scorpion_strike_custom_stun_cd",
						{ duration = stun_cd }
					)
					target:AddNewModifier(
						caster,
						self,
						"modifier_stunned",
						{ duration = (1 - target:GetStatusResistance()) * stun_duration }
					)
					target:EmitSound("SandKing.Stinger_stun")
				end

				if caster:HasScepter() and caustic then
					for i = 1, more_stack do
						caustic:ApplyEffect(target)
					end
				end
			else
				mod:SetStackCount(0)
			end
		end

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_sandking/sandking_scorpion_strike_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			caster
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			caster,
			PATTACH_POINT_FOLLOW,
			"attach_tail",
			caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			target,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			target:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		target:AddNewModifier(
			caster,
			self,
			"modifier_sandking_scorpion_strike_custom_slow",
			{ duration = (1 - target:GetStatusResistance()) * duration }
		)
		caster:PerformAttack(target, true, true, true, true, false, false, true)
	end

	local sand = caster:FindAbilityByName("sandking_sand_storm_custom")
	if sand and sand:IsTrained() and caster:HasTalent("modifier_sand_king_sand_7") then
		sand:ProcLegendary(point)
	end

	if hit_center then
		if caster:HasTalent("modifier_sand_king_finale_4") then
			caster:AddNewModifier(
				caster,
				self,
				"modifier_sandking_scorpion_strike_custom_attack_speed",
				{ duration = caster:GetTalentValue("modifier_sand_king_finale_4", "duration") }
			)
		end

		local ability = caster:FindAbilityByName("sandking_epicenter_custom")
		if ability and caster:HasScepter() then
			ability:Pulse(point, ability:GetSpecialValueFor("epicenter_radius_base"), false, false)
		end
	end

	if mod and not mod:IsNull() then
		mod:Destroy()
	end
end

modifier_sandking_scorpion_strike_custom_damage = class({})
function modifier_sandking_scorpion_strike_custom_damage:IsHidden()
	return true
end
function modifier_sandking_scorpion_strike_custom_damage:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability:GetSpecialValueFor("attack_damage")
	self.bonus = self.ability:GetSpecialValueFor("inner_radius_bonus_damage_pct")
		+ self.parent:GetTalentValue("modifier_sand_king_finale_1", "stinger_damage")
end

function modifier_sandking_scorpion_strike_custom_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_sandking_scorpion_strike_custom_damage:GetModifierProcAttack_BonusDamage_Physical()
	return self.damage
end

function modifier_sandking_scorpion_strike_custom_damage:GetModifierDamageOutgoing_Percentage()
	if self:GetStackCount() == 0 then
		return
	end
	return self.bonus
end

modifier_sandking_scorpion_strike_custom_slow = class({})
function modifier_sandking_scorpion_strike_custom_slow:IsHidden()
	return false
end
function modifier_sandking_scorpion_strike_custom_slow:IsPurgable()
	return true
end
function modifier_sandking_scorpion_strike_custom_slow:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.slow = self.ability:GetSpecialValueFor("strike_slow")
		+ self.caster:GetTalentValue("modifier_sand_king_finale_2", "slow")
	self.damage_reduce = self.caster:GetTalentValue("modifier_sand_king_finale_2", "damage_reduce")
end

function modifier_sandking_scorpion_strike_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_sandking_scorpion_strike_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_sandking_scorpion_strike_custom_slow:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_sandking_scorpion_strike_custom_slow:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce
end

function modifier_sandking_scorpion_strike_custom_slow:GetEffectName()
	return "particles/neutral_fx/gnoll_poison_debuff.vpcf"
end

modifier_sandking_scorpion_strike_custom = class({})
function modifier_sandking_scorpion_strike_custom:IsHidden()
	return true
end
function modifier_sandking_scorpion_strike_custom:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.attack_range = self.parent:GetTalentValue("modifier_sand_king_finale_7", "range", true)
	self.double_delay = self.parent:GetTalentValue("modifier_sand_king_finale_7", "delay", true)
	self.double_chance = self.parent:GetTalentValue("modifier_sand_king_finale_7", "chance", true)
	self.legendary_cd_inc = self.parent:GetTalentValue("modifier_sand_king_finale_7", "cd_inc", true)
	self.legendary_chance_inc = self.parent:GetTalentValue("modifier_sand_king_finale_7", "chance_inc", true)
	self.pull_distance = self.parent:GetTalentValue("modifier_sand_king_finale_7", "pull_distance", true)

	if not IsServer() then
		return
	end
	self:StartIntervalThink(0.2)
end

function modifier_sandking_scorpion_strike_custom:OnRefresh()
	self:OnCreated()
end

function modifier_sandking_scorpion_strike_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		self.ability:GetCooldownTimeRemaining() <= 0
		and not self.particle
		and not self.parent:HasModifier("modifier_sandking_burrowstrike_custom_legendary")
	then
		self.particle = ParticleManager:CreateParticle(
			"particles/sand_king/sandking_scorpion_strike_tell.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControlEnt(
			self.particle,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_tail",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(self.particle, false, false, -1, false, false)
	end

	if
		(
			self.ability:GetCooldownTimeRemaining() > 0
			or self.parent:HasModifier("modifier_sandking_burrowstrike_custom_legendary")
		) and self.particle
	then
		ParticleManager:DestroyParticle(self.particle, false)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end
end

function modifier_sandking_scorpion_strike_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_FEEDBACK,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_sandking_scorpion_strike_custom:GetModifierAttackRangeBonus()
	if not self.parent:HasTalent("modifier_sand_king_finale_7") then
		return
	end
	return self.attack_range
end

function modifier_sandking_scorpion_strike_custom:GetModifierProcAttack_Feedback(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local target = params.target

	if self.parent:HasTalent("modifier_sand_king_finale_7") and not params.no_attack_cooldown then
		local chance = self.double_chance

		local mod = target:FindModifierByName("modifier_sandking_scorpion_strike_custom_legendary_stack")
		if mod then
			chance = chance + mod:GetStackCount() * self.legendary_chance_inc
		end

		if RollPseudoRandomPercentage(chance, 1523, self.parent) then
			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_marci/marci_dispose_debuff.vpcf",
				PATTACH_POINT_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				Vector(0, 0, 0),
				true
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				Vector(0, 0, 0),
				true
			)
			ParticleManager:SetParticleControl(particle, 5, Vector(2, 0, 0))
			ParticleManager:DestroyParticle(particle, false)
			ParticleManager:ReleaseParticleIndex(particle)

			local target_loc = target:GetAbsOrigin()
			local vec = target_loc - self.parent:GetAbsOrigin()
			local dir = vec:Normalized()
			local max_point = self.parent:GetAbsOrigin() + dir * 100
			local distance = math.max(0, math.min(self.pull_distance, (target_loc - max_point):Length2D()))
			local point = target_loc - dir * distance

			local mod = target:AddNewModifier(self.parent, self.ability, "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = distance,
				duration = 0.2,
				height = 0,
				fix_end = false,
				isStun = false,
				activity = ACT_DOTA_FLAIL,
			})
			if mod then
				target:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", mod)
			end

			params.target:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_sandking_scorpion_strike_custom_attack",
				{ duration = self.double_delay }
			)
		end
	end
end

modifier_sandking_scorpion_strike_custom_attack = class({})
function modifier_sandking_scorpion_strike_custom_attack:IsHidden()
	return true
end
function modifier_sandking_scorpion_strike_custom_attack:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom_attack:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_sandking_scorpion_strike_custom_attack:OnCreated()
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2)

	local dir = (self.parent:GetOrigin() - self.caster:GetOrigin()):Normalized()

	self.caster:EmitSound("SandKing.Double_hit")

	local particle = ParticleManager:CreateParticle(
		"particles/sand_king/finale_double_hit.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.caster:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(particle, 1, dir)
	ParticleManager:SetParticleControl(particle, 2, Vector(1, 1, 1))
	ParticleManager:SetParticleControlForward(particle, 5, dir)
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_sandking_scorpion_strike_custom_attack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.caster:IsAlive() or self.caster:IsNull() then
		return
	end

	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, false)

	local hit_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)
end

modifier_sandking_scorpion_strike_custom_legendary_stack = class({})
function modifier_sandking_scorpion_strike_custom_legendary_stack:IsHidden()
	return true
end
function modifier_sandking_scorpion_strike_custom_legendary_stack:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.caster:GetTalentValue("modifier_sand_king_finale_7", "max")
	if not IsServer() then
		return
	end

	self.particle = self.parent:GenericParticle("particles/sand_king/stinger_stack.vpcf", self, true)
	self:SetStackCount(1)
end

function modifier_sandking_scorpion_strike_custom_legendary_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_sandking_scorpion_strike_custom_legendary_stack:OnStackCountChanged(iStackCount)
	if not IsServer() then
		return
	end
	if not self.particle then
		return
	end

	ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
end

modifier_sandking_scorpion_strike_custom_attack_speed = class({})
function modifier_sandking_scorpion_strike_custom_attack_speed:IsHidden()
	return false
end
function modifier_sandking_scorpion_strike_custom_attack_speed:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom_attack_speed:GetTexture()
	return "buffs/finale_resist"
end
function modifier_sandking_scorpion_strike_custom_attack_speed:OnCreated()
	self.parent = self:GetParent()
	self.speed = self.parent:GetTalentValue("modifier_sand_king_finale_4", "speed")
end

function modifier_sandking_scorpion_strike_custom_attack_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end
function modifier_sandking_scorpion_strike_custom_attack_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_sandking_scorpion_strike_custom_perma = class({})
function modifier_sandking_scorpion_strike_custom_perma:IsHidden()
	return not self:GetParent():HasTalent("modifier_sand_king_finale_4")
end
function modifier_sandking_scorpion_strike_custom_perma:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom_perma:RemoveOnDeath()
	return false
end
function modifier_sandking_scorpion_strike_custom_perma:GetTexture()
	return "buffs/finale_damage"
end
function modifier_sandking_scorpion_strike_custom_perma:OnCreated()
	self.caster = self:GetCaster()
	self.max = self.caster:GetTalentValue("modifier_sand_king_finale_4", "max", true)

	if not IsServer() then
		return
	end

	self:SetStackCount(1)
	self:StartIntervalThink(0.5)
end

function modifier_sandking_scorpion_strike_custom_perma:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
end

function modifier_sandking_scorpion_strike_custom_perma:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.caster:HasTalent("modifier_sand_king_finale_4") then
		return
	end

	if self:GetStackCount() >= self.max then
		self.caster:EmitSound("BS.Thirst_legendary_active")
		local particle_peffect = ParticleManager:CreateParticle(
			"particles/mars/mars_revenge_proc.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.caster
		)
		ParticleManager:SetParticleControl(particle_peffect, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle_peffect, 2, self.caster:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle_peffect)
		self:StartIntervalThink(-1)
	end
end

function modifier_sandking_scorpion_strike_custom_perma:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_sandking_scorpion_strike_custom_perma:GetModifierSpellAmplify_Percentage()
	if not self.caster:HasTalent("modifier_sand_king_finale_4") then
		return
	end
	return self:GetStackCount() * (self:GetCaster():GetTalentValue("modifier_sand_king_finale_4", "spell") / self.max)
end

modifier_sandking_scorpion_strike_custom_stun_cd = class({})
function modifier_sandking_scorpion_strike_custom_stun_cd:IsHidden()
	return true
end
function modifier_sandking_scorpion_strike_custom_stun_cd:IsPurgable()
	return false
end
function modifier_sandking_scorpion_strike_custom_stun_cd:RemoveOnDeath()
	return false
end
function modifier_sandking_scorpion_strike_custom_stun_cd:OnCreated()
	self.RemoveForDuel = true
end