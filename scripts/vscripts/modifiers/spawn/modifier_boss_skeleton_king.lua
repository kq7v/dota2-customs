--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/spawn/modifier_boss_skeleton_king"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = b.__TS__New
local g = {}
local h = require("class.weight_pool")
local i = h.CWeightPool
local j = require("modifiers.eom_modifier.eom_modifier")
local k = j.EOMModifier
local l = j.registerEOMModifier
local m = c()
m.name = "modifier_spawn_boss_skeleton_king"
d(m, k)
function m.prototype.OnCreated(self, n)
	if IsServer() then
		local o = self:GetParent()
		self:StartThink(0, function()
			o:SetForwardVector(Rotation2D(vec3_bottom, 35, true))
			return -1
		end)
		self:StartThink(3.06, function()
			EmitGlobalSound("wraith_king_arcana_takeover_sfx")
			return -1
		end)
		self:StartThink(1.8, function()
			EmitGlobalSound("wraith_king_arcana_takeover_vo")
			return -1
		end)
		o:StartGesture(ACT_SCRIPT_CUSTOM_13)
		self:SetDuration(5.5, true)
		self:StartIntervalThink(5)
		local p = ParticleManager:CreateParticleForce(
			"particles/units/boss/boss_skeleton_king/skeleton_king_spawn.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			o
		)
	end
end
function m.prototype.OnDestroy(self)
	if IsServer() then
		StopGlobalSound("wraith_king_arcana_takeover_sfx")
		StopGlobalSound("wraith_king_arcana_takeover_vo")
		self:GetParent():AddNewModifier(self:GetParent(), nil, "modifier_boss_skeleton_king", {})
	end
end
function m.prototype.OnIntervalThink(self)
	if IsServer() then
		local o = self:GetParent()
		o:RemoveGesture(ACT_SCRIPT_CUSTOM_13)
		o:SetForwardVector(vec3_bottom)
		o:StartGesture(ACT_DOTA_TELEPORT_END)
		self:StartIntervalThink(-1)
	end
end
function m.prototype.StaticProperty(self)
	return { [PropertyFunction.AVOID_DAMAGE] = 1 }
end
function m.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true }
end
function m.prototype.CheckState(self)
	return { [MODIFIER_STATE_STUNNED] = true, [MODIFIER_STATE_INVULNERABLE] = true }
end
m = e(
	{
		l(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				RemoveOnDeath = true,
			}
		),
	},
	m
)
local q = c()
q.name = "modifier_boss_skeleton_king"
d(q, k)
function q.prototype.____constructor(self, ...)
	k.prototype.____constructor(self, ...)
	self.currentStage = 1
	self.changeAggroEnabled = false
	self.stage1SequenceIndex = 0
	self.stage1NextActionTime = 0
	self.stage1NextMoveTime = 0
end
function q.prototype.OnCreated(self, n)
	if IsServer() then
		local o = self:GetParent()
		self.center = o:GetAbsOrigin()
		self.boss_hellfire_blast = o:FindAbilityByName("boss_hellfire_blast")
		self.boss_mortal_strike = o:FindAbilityByName("boss_mortal_strike")
		self.boss_shock_wave = o:FindAbilityByName("boss_shock_wave")
		self.boss_summon_skeleton = o:FindAbilityByName("boss_summon_skeleton")
		self.boss_spike = o:FindAbilityByName("boss_spike")
		self.boss_kick = o:FindAbilityByName("boss_kick")
		self.boss_attack_combo1 = o:FindAbilityByName("boss_attack_combo1")
		self.boss_attack_combo2 = o:FindAbilityByName("boss_attack_combo2")
		self.boss_attack_combo3 = o:FindAbilityByName("boss_attack_combo3")
		self.boss_reincarnation = o:FindAbilityByName("boss_reincarnation")
		self.boss_hellfire_ring = o:FindAbilityByName("boss_hellfire_ring")
		self:StartThink(0.1, "UpdateAggroTarget", function()
			if o:HasState(StateEnum.AI_DISABLED) then
				return 1
			end
			self:UpdateAggroTarget()
			if self.target == nil then
				return 0.1
			end
			return 1
		end)
		self:StartThink(0.5, "Patrol", function()
			if o:HasState(StateEnum.AI_DISABLED) then
				return 1
			end
			self:Patrol()
			return 0.5
		end)
		self:StartThink(0, "StageThink", function()
			if o:HasState(StateEnum.AI_DISABLED) then
				return 1
			end
			if o:HasModifier("modifier_boss_reincarnation_buff") then
				self:Stage4()
			elseif o:GetHealthPercent() >= 70 then
				self:Stage1()
			elseif o:GetHealthPercent() >= 35 then
				self:Stage2()
			else
				self:Stage3()
			end
			return 0
		end)
	end
end
function q.prototype.Patrol(self)
	local o = self:GetParent()
	if self.target == nil and not o:IsRooted() and not o:IsMoving() and not o:IsCasting() then
		local r = self.center + RandomVector(RandomInt(0, o:GetAcquisitionRange()))
		o:ExecuteOrder(DOTA_UNIT_ORDER_MOVE_TO_POSITION, r)
	end
end
function q.prototype.FaceMove(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local s = o:Script_GetAttackRange()
		o:AddNewModifier(
			o,
			nil,
			"modifier_face_move",
			{ target = self.target:entindex(), moveType = "strafe", radius = s, duration = 0.5 }
		)
	end
end
function q.prototype.MoveToEnemy(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local t = CalcDistance(o, self.target)
		local u = o:Script_GetAttackRange()
		if t > u then
			local v = self.target:GetAbsOrigin()
			local w = CalcDirection(o, self.target)
			local x = v - w * u * 0.5
			o:MoveToPosition(x)
		end
	end
end
function q.prototype.HasValidTarget(self)
	if self.target == nil or not IsValid(self.target) or not self.target:IsAlive() then
		self.target = nil
		return false
	end
	return true
end
function q.prototype.CanExecuteStageAction(self)
	local o = self:GetParent()
	return self:HasValidTarget() and not o:IsCasting()
end
function q.prototype.GetStageTempoScale(self)
	return 0.68
end
function q.prototype.GetBossGapMultiplier(self)
	return math.max(0.01, 1 + GetBossGapAmplify(self:GetParent()) / 100)
end
function q.prototype.CanSelectWeightedAbility(self, y, z)
	if z == nil then
		z = false
	end
	if not IsValid(y) or not y:IsAbilityReady() or not self:CanCastConditionalAbility(y) then
		return false
	end
	if z and self.lastCastAbilityName ~= nil and y:GetAbilityName() == self.lastCastAbilityName then
		return false
	end
	return true
end
function q.prototype.CanCastConditionalAbility(self, y)
	local A = y.funcCondition
	if A ~= nil and A(nil, y) ~= true then
		return false
	end
	return true
end
function q.prototype.ExecuteStage1GapMovement(self, B)
	if B < self.stage1NextMoveTime or not self:HasValidTarget() or self:GetParent():IsCasting() then
		return
	end
	local o = self:GetParent()
	local t = CalcDistance(o, self.target)
	local u = o:Script_GetAttackRange()
	self.stage1NextMoveTime = B + 0.35 * self:GetStageTempoScale()
	if t <= u then
		self:FaceMove()
	else
		self:MoveToEnemy()
	end
end
function q.prototype.GetStage1GapDuration(self, y)
	if y == self.boss_attack_combo1 then
		return (y:GetCastPoint() + 6) * self:GetStageTempoScale()
	end
	return (y:GetCastPoint() + 3) * self:GetStageTempoScale()
end
function q.prototype.GetStage2GapDuration(self, y)
	if y == self.boss_attack_combo1 then
		return (y:GetCastPoint() + 4.5) * self:GetStageTempoScale()
	end
	if y == self.boss_summon_skeleton then
		return (y:GetCastPoint() + 2.5) * self:GetStageTempoScale()
	end
	if y == self.boss_kick then
		return (y:GetCastPoint() + 1.2) * self:GetStageTempoScale()
	end
	return (y:GetCastPoint() + 2.4) * self:GetStageTempoScale()
end
function q.prototype.GetStage3GapDuration(self, y)
	if y == self.boss_attack_combo1 then
		return (y:GetCastPoint() + 3.6) * self:GetStageTempoScale()
	end
	if y == self.boss_summon_skeleton then
		return (y:GetCastPoint() + 2.1) * self:GetStageTempoScale()
	end
	if y == self.boss_kick then
		return (y:GetCastPoint() + 0.9) * self:GetStageTempoScale()
	end
	if y == self.boss_spike then
		return (y:GetCastPoint() + 1.2) * self:GetStageTempoScale()
	end
	if y == self.boss_hellfire_ring then
		return (y:GetCastPoint() + 1.8) * self:GetStageTempoScale()
	end
	if y == self.boss_mortal_strike then
		return (y:GetCastPoint() + 3.6) * self:GetStageTempoScale()
	end
	return (y:GetCastPoint() + 1.9) * self:GetStageTempoScale()
end
function q.prototype.GetStage3WeightedAbility(self)
	local C = {
		boss_hellfire_blast = 5,
		boss_shock_wave = 5,
		boss_attack_combo3 = 5,
		boss_attack_combo1 = 8,
		boss_spike = 8,
		boss_hellfire_ring = 3,
	}
	local D = f(i, C)
	D:Each(function(E, F)
		local y = self[F]
		if not self:CanSelectWeightedAbility(y, true) then
			D:Set(F, 0)
		end
	end)
	local F = D:Random()
	if F ~= nil then
		return self[F]
	end
	return nil
end
function q.prototype.GetStage4WeightedAbility(self)
	local C = {
		boss_hellfire_blast = 5,
		boss_shock_wave = 5,
		boss_mortal_strike = 5,
		boss_attack_combo1 = 8,
		boss_spike = 8,
		boss_hellfire_ring = 5,
		boss_reincarnation = 5,
	}
	local D = f(i, C)
	D:Each(function(E, F)
		local y = self[F]
		if not self:CanSelectWeightedAbility(y, true) then
			D:Set(F, 0)
		end
	end)
	local F = D:Random()
	if F ~= nil then
		return self[F]
	end
	return nil
end
function q.prototype.TryCastHighPriorityAbility(self, B)
	local G = { self.boss_kick, self.boss_summon_skeleton }
	do
		local H = 0
		while H < #G do
			local y = G[H + 1]
			if self:TryCastStage1Ability(y) then
				self.stage1NextActionTime = B + self:GetStage2GapDuration(y) * self:GetBossGapMultiplier()
				self.stage1NextMoveTime = B + 0.15 * self:GetStageTempoScale()
				return true
			end
			H = H + 1
		end
	end
	return false
end
function q.prototype.TryCastStage1Ability(self, y)
	if
		not self:CanExecuteStageAction()
		or not IsValid(y)
		or not y:IsAbilityReady()
		or not self:CanCastConditionalAbility(y)
	then
		return false
	end
	local o = self:GetParent()
	local I = self.target
	o:RemoveModifierByName("modifier_face_move")
	o:RemoveGesture(ACT_DOTA_RUN)
	self.lastCastAbilityName = y:GetAbilityName()
	if
		y == self.boss_summon_skeleton
		or y == self.boss_kick
		or y == self.boss_hellfire_ring
		or y == self.boss_reincarnation
	then
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_NO_TARGET, y)
	else
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, y, I:GetAbsOrigin())
	end
	return true
end
function q.prototype.UpdateAggroTarget(self)
	local o = self:GetParent()
	local I = Player:FindNearestAliveEnemyHero(o:GetTeamNumber(), o:GetAbsOrigin(), o:GetAcquisitionRange())
	if self.target == nil then
		if I ~= nil then
			self.target = I
			self.changeAggroEnabled = false
			self:StartThink(10, "EnableAggroChange", function()
				self.changeAggroEnabled = true
				return -1
			end)
		end
	else
		if self.changeAggroEnabled then
			if I ~= nil then
				self.target = I
				self.changeAggroEnabled = false
				self:StartThink(10, "EnableAggroChange", function()
					self.changeAggroEnabled = true
					return -1
				end)
			end
		end
	end
end
function q.prototype.EventListener(self)
	return {
		entity_killed = function(E, J)
			if self.target ~= nil and J.victim == self.target then
				self.target = nil
				self:UpdateAggroTarget()
			end
		end,
	}
end
function q.prototype.Stage1(self)
	self.currentStage = 1
	local B = GameRules:GetGameTime()
	if not self:CanExecuteStageAction() then
		return
	end
	if B < self.stage1NextActionTime then
		self:ExecuteStage1GapMovement(B)
		return
	end
	local K = { self.boss_hellfire_blast, self.boss_shock_wave, self.boss_attack_combo3, self.boss_attack_combo1 }
	do
		local H = 0
		while H < #K do
			local L = (self.stage1SequenceIndex + H) % #K
			local y = K[L + 1]
			if self:TryCastStage1Ability(y) then
				self.stage1SequenceIndex = (L + 1) % #K
				self.stage1NextActionTime = B + self:GetStage1GapDuration(y) * self:GetBossGapMultiplier()
				self.stage1NextMoveTime = B + 0.15 * self:GetStageTempoScale()
				return
			end
			H = H + 1
		end
	end
	self:ExecuteStage1GapMovement(B)
end
function q.prototype.Stage2(self)
	self.currentStage = 2
	local B = GameRules:GetGameTime()
	if not self:CanExecuteStageAction() then
		return
	end
	if B < self.stage1NextActionTime then
		self:ExecuteStage1GapMovement(B)
		return
	end
	if self:TryCastHighPriorityAbility(B) then
		return
	end
	local K = { self.boss_hellfire_blast, self.boss_shock_wave, self.boss_attack_combo3, self.boss_attack_combo1 }
	do
		local H = 0
		while H < #K do
			local L = (self.stage1SequenceIndex + H) % #K
			local y = K[L + 1]
			if self:TryCastStage1Ability(y) then
				self.stage1SequenceIndex = (L + 1) % #K
				self.stage1NextActionTime = B + self:GetStage2GapDuration(y) * self:GetBossGapMultiplier()
				self.stage1NextMoveTime = B + 0.15 * self:GetStageTempoScale()
				return
			end
			H = H + 1
		end
	end
	self:ExecuteStage1GapMovement(B)
end
function q.prototype.Stage3(self)
	self.currentStage = 3
	local B = GameRules:GetGameTime()
	if not self:CanExecuteStageAction() then
		return
	end
	if B < self.stage1NextActionTime then
		self:ExecuteStage1GapMovement(B)
		return
	end
	if self:TryCastHighPriorityAbility(B) then
		return
	end
	local y = self:GetStage3WeightedAbility()
	if y ~= nil and self:TryCastStage1Ability(y) then
		self.stage1NextActionTime = B + self:GetStage3GapDuration(y) * self:GetBossGapMultiplier()
		self.stage1NextMoveTime = B + 0.15 * self:GetStageTempoScale()
		return
	end
	self:ExecuteStage1GapMovement(B)
end
function q.prototype.Stage4(self)
	self.currentStage = 4
	local B = GameRules:GetGameTime()
	if not self:CanExecuteStageAction() then
		return
	end
	if B < self.stage1NextActionTime then
		self:ExecuteStage1GapMovement(B)
		return
	end
	if self:TryCastHighPriorityAbility(B) then
		return
	end
	local y = self:GetStage4WeightedAbility()
	if y ~= nil and self:TryCastStage1Ability(y) then
		self.stage1NextActionTime = B + self:GetStage3GapDuration(y) * self:GetBossGapMultiplier()
		self.stage1NextMoveTime = B + 0.15 * self:GetStageTempoScale()
		return
	end
	self:ExecuteStage1GapMovement(B)
end
q = e(
	{
		l(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				RemoveOnDeath = true,
			}
		),
	},
	q
)
return g