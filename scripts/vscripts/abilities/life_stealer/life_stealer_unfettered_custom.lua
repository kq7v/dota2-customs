--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_life_stealer_unfettered_custom",
	"abilities/life_stealer/life_stealer_unfettered_custom",
	LUA_MODIFIER_MOTION_NONE
)

life_stealer_unfettered_custom = class({})
function life_stealer_unfettered_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/econ/items/bloodseeker/bloodseeker_ti7/bloodseeker_ti7_thirst_owner.vpcf",
		context
	)
	PrecacheResource("particle", "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		context
	)
end

function life_stealer_unfettered_custom:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.min_dist = self:GetLevelSpecialValueFor("min_dist", 1)
end

function life_stealer_unfettered_custom:OnAbilityPhaseStart()
	local target = self:GetCursorTarget()
	if (self.caster:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() <= self.min_dist then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = "#close_dist" }
		)
		return false
	end
	return true
end

function life_stealer_unfettered_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:TriggerSpellAbsorb(self) then
		return
	end

	self.caster:EmitSound("Lifestealer.Shard_cast")
	self.caster:EmitSound("Lifestealer.Shard_cast2")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_life_stealer_unfettered_custom",
		{ target = target:entindex() }
	)
end

modifier_life_stealer_unfettered_custom = class(mod_hidden)
function modifier_life_stealer_unfettered_custom:GetStatusEffectName()
	return "particles/econ/items/invoker/invoker_ti7/status_effect_alacrity_ti7.vpcf"
end
function modifier_life_stealer_unfettered_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_life_stealer_unfettered_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.speed = self.ability:GetSpecialValueFor("speed")
	self.stun_duration = self.ability:GetSpecialValueFor("stun")

	if not IsServer() then
		return
	end
	self.target = EntIndexToHScript(table.target)
	self.parent:GenericParticle(
		"particles/econ/items/bloodseeker/bloodseeker_ti7/bloodseeker_ti7_thirst_owner.vpcf",
		self
	)
	self.parent:AddOrderFilter(self)

	if self.parent:HasModifier("modifier_life_stealer_infest_custom_legendary_creep") then
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_RUN, 2)
	end

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_life_stealer_unfettered_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.target) or not self.target:IsAlive() then
		self:Destroy()
		return
	end

	self.parent:MoveToPositionAggressive(self.target:GetAbsOrigin())
	self.parent:MoveToPosition(self.target:GetAbsOrigin())

	if
		self.parent:IsHexed()
		or self.parent:IsStunned()
		or self.parent:IsFeared()
		or self.parent:IsRooted()
		or (self.parent:IsInvulnerable() and not self.parent:HasModifier(
			"modifier_life_stealer_rage_custom_dispel_invun"
		))
		or self.parent:IsCurrentlyHorizontalMotionControlled()
		or self.parent:IsCurrentlyVerticalMotionControlled()
	then
		self:Destroy()
		return
	end

	local length = (self.parent:GetAbsOrigin() - self.target:GetAbsOrigin()):Length2D()

	if length > 2000 then
		self:Destroy()
		return
	end

	if length <= 200 then
		self.parent:MoveToTargetToAttack(self.target)
		self.proc_root = true
		self:Destroy()
		return
	end
end

function modifier_life_stealer_unfettered_custom:OrderFilter(params)
	if params.order_type ~= DOTA_UNIT_ORDER_STOP and params.order_type ~= DOTA_UNIT_ORDER_HOLD_POSITION then
		return
	end
	self:Destroy()
end

function modifier_life_stealer_unfettered_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_CASTTIME_PERCENTAGE,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
	}
end

function modifier_life_stealer_unfettered_custom:GetModifierPercentageCasttime()
	return 100
end

function modifier_life_stealer_unfettered_custom:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_life_stealer_unfettered_custom:GetModifierMoveSpeed_Absolute()
	return self.speed
end

function modifier_life_stealer_unfettered_custom:GetActivityTranslationModifiers()
	return "haste"
end

function modifier_life_stealer_unfettered_custom:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS] = true,
	}
end

function modifier_life_stealer_unfettered_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveGesture(ACT_DOTA_RUN)

	if not IsValid(self.target) or not self.target:IsAlive() then
		return
	end
	if not self.proc_root then
		return
	end

	self.target:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_bashed",
		{ duration = (1 - self.target:GetStatusResistance()) * self.stun_duration }
	)

	local immortal_particle = ParticleManager:CreateParticle(
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		PATTACH_OVERHEAD_FOLLOW,
		self.target
	)
	ParticleManager:SetParticleControl(immortal_particle, 0, self.target:GetAbsOrigin())
	ParticleManager:SetParticleControl(immortal_particle, 1, self.parent:GetAbsOrigin())
	ParticleManager:Delete(immortal_particle, 1)
	self.target:EmitSound("Lifestealer.Frenzy_bash")
end