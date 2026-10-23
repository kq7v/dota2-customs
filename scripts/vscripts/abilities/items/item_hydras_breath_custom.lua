--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_item_hydras_breath_custom",
	"abilities/items/item_hydras_breath_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_item_hydras_breath_custom_burn",
	"abilities/items/item_hydras_breath_custom",
	LUA_MODIFIER_MOTION_NONE
)

item_hydras_breath_custom = class({})

function item_hydras_breath_custom:GetIntrinsicModifierName()
	return "modifier_item_hydras_breath_custom"
end

function item_hydras_breath_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/items8_fx/hydras_breath_endcap.vpcf", context)
	PrecacheResource("particle", "particles/items8_fx/hydras_breath_single_proc.vpcf", context)
	PrecacheResource("particle", "particles/items8_fx/hydras_breath_burn_debuff.vpcf", context)
end

function item_hydras_breath_custom:Spawn()
	self.agility = self:GetSpecialValueFor("agility")
	self.damage = self:GetSpecialValueFor("damage")
	self.spell_lifesteal = self:GetSpecialValueFor("spell_lifesteal") / 100
	self.count = self:GetSpecialValueFor("count")
	self.secondary_target_range_bonus = self:GetSpecialValueFor("secondary_target_range_bonus")
	self.secondary_target_angle = self:GetSpecialValueFor("secondary_target_angle")
	self.proc_chance = self:GetSpecialValueFor("proc_chance")
	self.proc_damage = self:GetSpecialValueFor("proc_damage")
	self.burn_base = self:GetSpecialValueFor("burn_base")
	self.burn_damage = self:GetSpecialValueFor("burn_damage") / 100
	self.burn_duration = self:GetSpecialValueFor("burn_duration")
	self.bonus_health = self:GetSpecialValueFor("bonus_health")
	self.cooldown = self:GetSpecialValueFor("AbilityCooldown")
end

function item_hydras_breath_custom:GetCooldown()
	return (self.cooldown and self.cooldown or 0) / self:GetCaster():GetCooldownReduction()
end

function item_hydras_breath_custom:OnProjectileHit(target, location)
	if not target then
		return
	end
	local caster = self:GetCaster()

	caster.is_item_attack = self
	caster:PerformAttack(target, true, false, true, true, false, false, true)
	caster.is_item_attack = false
	self:ProcEffect(target)
end

function item_hydras_breath_custom:ProcEffect(target)
	if not IsServer() then
		return
	end
	local caster = self:GetCaster()
	target:EmitSound("Item.Brooch.Attack")

	local mainParticle =
		ParticleManager:CreateParticle("particles/items8_fx/hydras_breath_endcap.vpcf", PATTACH_POINT_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		mainParticle,
		3,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(mainParticle)

	target:AddNewModifier(caster, self, "modifier_item_hydras_breath_custom_burn", {})
end

modifier_item_hydras_breath_custom = class(mod_hidden)
function modifier_item_hydras_breath_custom:RemoveOnDeath()
	return false
end
function modifier_item_hydras_breath_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:AddLifesteal(self, { type = 1, value = self.ability.spell_lifesteal })
	self.parent:AddProc(
		self,
		{ group = "brooch_hydra", priority = 1, target_cd = self.ability.cooldown, target_prd = true }
	)
end

function modifier_item_hydras_breath_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_STATS_AGILITY_BONUS,
		MODIFIER_PROPERTY_HEALTH_BONUS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_item_hydras_breath_custom:GetModifierPreAttack_BonusDamage()
	return self.ability.damage
end

function modifier_item_hydras_breath_custom:GetModifierHealthBonus()
	return self.ability.bonus_health
end

function modifier_item_hydras_breath_custom:GetModifierBonusStats_Agility()
	return self.ability.agility
end

function modifier_item_hydras_breath_custom:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if self.parent.is_item_attack ~= self.ability then
		return
	end
	return self.ability.proc_damage - 100
end

function modifier_item_hydras_breath_custom:GetProcChance()
	return self.ability.proc_chance
end

function modifier_item_hydras_breath_custom:AttackProcStart(params)
	if params.no_attack_cooldown then
		return
	end
	local target = params.target

	local count = 0
	local speed = 900
	local max = self.ability.count
	if self.parent:IsRangedAttacker() then
		speed = self.parent:GetProjectileSpeed()
	end

	local info = {
		EffectName = "particles/items8_fx/hydras_breath_single_proc.vpcf",
		Ability = self.ability,
		iMoveSpeed = speed,
		Source = self.parent,
		Target = self.parent,
		bDodgeable = true,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	local radius = self.parent:Script_GetAttackRange() + self.ability.secondary_target_range_bonus
	local cast_direction = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
	local cast_angle = VectorToAngles(cast_direction).y

	for _, aoe_target in pairs(self.parent:FindTargets(radius)) do
		if aoe_target ~= target then
			local enemy_direction = (aoe_target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
			local enemy_angle = VectorToAngles(enemy_direction).y
			local angle_diff = math.abs(AngleDiff(cast_angle, enemy_angle))

			if angle_diff <= self.ability.secondary_target_angle / 2 then
				info.Target = aoe_target
				ProjectileManager:CreateTrackingProjectile(info)
				count = count + 1
				if count >= max then
					break
				end
			end
		end
	end
end

function modifier_item_hydras_breath_custom:AttackProc(params)
	self.ability:ProcEffect(params.target)
end

modifier_item_hydras_breath_custom_burn = class(mod_visible)
function modifier_item_hydras_breath_custom_burn:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.duration = self.ability.burn_duration
	self.damage = self.ability.burn_damage
	self.base = self.ability.burn_base
	self.interval = 1
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self.parent:GenericParticle("particles/items8_fx/hydras_breath_burn_debuff.vpcf", self)

	self:AddStack()
	self:StartIntervalThink(self.interval)
end

function modifier_item_hydras_breath_custom_burn:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddStack()
end

function modifier_item_hydras_breath_custom_burn:AddStack(damage)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + self.base + self.caster:GetAverageTrueAttackDamage(nil) * self.damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration
	self.damageTable.damage = self.tick
end

function modifier_item_hydras_breath_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable)
	self.parent:SendNumber(4, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end