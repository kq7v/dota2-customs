--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/spawn/modifier_boss_earthshaker"
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
m.name = "modifier_spawn_boss_earthshaker"
d(m, k)
function m.prototype.OnCreated(self, n)
	if IsServer() then
		local o = self:GetParent()
		self:StartThink(0, function()
			o:SetForwardVector(vec3_bottom)
			return -1
		end)
		self:StartThink(1, function()
			EmitGlobalSound("EarthShaker.Spawn")
			o:StartGesture(ACT_SCRIPT_CUSTOM_7)
			return -1
		end)
		self:SetDuration(4, true)
	end
end
function m.prototype.OnDestroy(self)
	if IsServer() then
		local o = self:GetParent()
		o:RemoveGesture(ACT_SCRIPT_CUSTOM_7)
		o:AddNewModifier(o, nil, "modifier_boss_earthshaker", {})
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
local p = c()
p.name = "modifier_boss_earthshaker"
d(p, k)
function p.prototype.____constructor(self, ...)
	k.prototype.____constructor(self, ...)
	self.currentStage = 1
	self.changeAggroEnabled = false
	self.nextActionTime = 0
	self.nextMoveTime = 0
	self.phaseTwoTransitionPending = false
	self.phaseTwoTransitionDeadline = 0
end
function p.prototype.OnCreated(self, n)
	if IsServer() then
		local o = self:GetParent()
		self.center = o:GetAbsOrigin()
		self.magma_earthshaker_1 = o:FindAbilityByName("magma_earthshaker_1")
		self.magma_earthshaker_2 = o:FindAbilityByName("magma_earthshaker_2")
		self.magma_earthshaker_3 = o:FindAbilityByName("magma_earthshaker_3")
		self.magma_earthshaker_4 = o:FindAbilityByName("magma_earthshaker_4")
		self.magma_earthshaker_5 = o:FindAbilityByName("magma_earthshaker_5")
		self.magma_earthshaker_6 = o:FindAbilityByName("magma_earthshaker_6")
		self.magma_earthshaker_7 = o:FindAbilityByName("magma_earthshaker_7")
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
			local q = self:GetDesiredStage()
			if q ~= self.currentStage then
				self:OnStageChanged(q)
			end
			if self.currentStage == 1 then
				self:Stage1()
			else
				self:Stage2()
			end
			return 0
		end)
	end
end
function p.prototype.GetDesiredStage(self)
	if self:GetParent():GetHealthPercent() <= 75 then
		return 2
	end
	return 1
end
function p.prototype.OnStageChanged(self, r)
	self.currentStage = r
	local s = GameRules:GetGameTime()
	self.lastCastAbilityName = nil
	self.nextActionTime = s + 0.5
	self.nextMoveTime = s + 0.25
	if r == 2 then
		self.phaseTwoTransitionPending = true
		self.phaseTwoTransitionDeadline = s + 4
		self:GetParent():EmitSound("Hero_EarthShaker.EchoSlam")
	end
end
function p.prototype.Patrol(self)
	local o = self:GetParent()
	if self.target == nil and not o:IsRooted() and not o:IsMoving() and not o:IsCasting() then
		local t = self.center + RandomVector(RandomInt(0, o:GetAcquisitionRange()))
		o:ExecuteOrder(DOTA_UNIT_ORDER_MOVE_TO_POSITION, t)
	end
end
function p.prototype.FaceMove(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local u = math.max(260, o:Script_GetAttackRange())
		o:AddNewModifier(
			o,
			nil,
			"modifier_face_move",
			{ target = self.target:entindex(), moveType = "strafe", radius = u, duration = 0.45 }
		)
	end
end
function p.prototype.MoveToEnemy(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local v = CalcDistance(o, self.target)
		local w = math.max(350, o:Script_GetAttackRange())
		if v > w then
			local x = self.target:GetAbsOrigin()
			local y = CalcDirection(o, self.target)
			local z = x - y * w * 0.55
			o:MoveToPosition(z)
		end
	end
end
function p.prototype.HasValidTarget(self)
	if self.target == nil or not IsValid(self.target) or not self.target:IsAlive() then
		self.target = nil
		return false
	end
	return true
end
function p.prototype.CanExecuteStageAction(self)
	local o = self:GetParent()
	return self:HasValidTarget() and not o:IsCasting()
end
function p.prototype.GetDistanceToTarget(self)
	if not self:HasValidTarget() then
		return 99999
	end
	return CalcDistance(self:GetParent(), self.target)
end
function p.prototype.GetTotemModifier(self)
	return self:GetParent():FindModifierByName("modifier_magma_earthshaker_1")
end
function p.prototype.GetTotemCount(self)
	local A = self:GetTotemModifier()
	if not IsValid(A) then
		return 0
	end
	local B = A.totemList or {}
	local C = 0
	do
		local D = 0
		while D < #B do
			local E = B[D + 1]
			if IsValid(E) and E:IsAlive() then
				C = C + 1
			end
			D = D + 1
		end
	end
	return C
end
function p.prototype.GetTotemMaxCount(self)
	local A = self:GetTotemModifier()
	if not IsValid(A) then
		return 0
	end
	return A:GetAbilitySpecialValueFor("fissure_limit_totem") or 0
end
function p.prototype.HasFrontTotem(self)
	local A = self:GetTotemModifier()
	if not IsValid(A) or not self:HasValidTarget() then
		return false
	end
	local o = self:GetParent()
	local B = A.totemList or {}
	local F = self.target
	local G = CalcDirection2D(F, o)
	do
		local D = 0
		while D < #B do
			do
				local E = B[D + 1]
				if not IsValid(E) or not E:IsAlive() then
					goto H
				end
				if CalcDistance(o, E) > 600 then
					goto H
				end
				if E:IsCurrentlyHorizontalMotionControlled() or E:IsCurrentlyVerticalMotionControlled() then
					goto H
				end
				local I = E:GetAbsOrigin() - o:GetAbsOrigin()
				I.z = 0
				local J = AngleDiff(VectorToAngles(G).y, VectorToAngles(I).y)
				if math.abs(J) <= 140 then
					return true
				end
			end
			::H::
			D = D + 1
		end
	end
	return false
end
function p.prototype.ShouldRebuildTotems(self)
	local K = self:GetTotemMaxCount()
	if K <= 0 then
		return false
	end
	local C = self:GetTotemCount()
	if self.currentStage == 1 then
		return C <= 2
	end
	return C <= math.max(3, math.floor(K * 0.5))
end
function p.prototype.CanCastConditionalAbility(self, L)
	local M = L.funcCondition
	if M ~= nil and M(nil, L) ~= true then
		return false
	end
	return true
end
function p.prototype.CanSelectWeightedAbility(self, L, N)
	if N == nil then
		N = false
	end
	if not IsValid(L) or not L:IsAbilityReady() or not self:CanCastConditionalAbility(L) then
		return false
	end
	if N and self.lastCastAbilityName ~= nil and L:GetAbilityName() == self.lastCastAbilityName then
		return false
	end
	local v = self:GetDistanceToTarget()
	local w = math.max(350, self:GetParent():Script_GetAttackRange())
	if L == self.magma_earthshaker_2 and not self:HasFrontTotem() then
		return false
	end
	if L == self.magma_earthshaker_4 then
		if self.currentStage == 1 or v < 500 then
			return false
		end
	end
	if L == self.magma_earthshaker_5 then
		if self.currentStage == 1 or v < 450 then
			return false
		end
	end
	if L == self.magma_earthshaker_6 and v > w * 1.45 then
		return false
	end
	if L == self.magma_earthshaker_7 and not self:ShouldRebuildTotems() then
		return false
	end
	return true
end
function p.prototype.ExecuteGapMovement(self, s)
	if s < self.nextMoveTime or not self:HasValidTarget() or self:GetParent():IsCasting() then
		return
	end
	local o = self:GetParent()
	local v = self:GetDistanceToTarget()
	local w = math.max(360, o:Script_GetAttackRange())
	self.nextMoveTime = s + (self.currentStage == 1 and 0.35 or 0.22)
	if v <= w * 1.1 then
		self:FaceMove()
	else
		self:MoveToEnemy()
	end
end
function p.prototype.GetGapDuration(self, L)
	local O = L:GetCastPoint()
	if L == self.magma_earthshaker_1 then
		return self.currentStage == 1 and O + 2.6 or O + 1.9
	end
	if L == self.magma_earthshaker_2 then
		return self.currentStage == 1 and O + 1.4 or O + 1
	end
	if L == self.magma_earthshaker_3 then
		return self.currentStage == 1 and O + 2.1 or O + 1.5
	end
	if L == self.magma_earthshaker_4 then
		return L:GetChannelTime() + (self.currentStage == 1 and 1.2 or 0.8)
	end
	if L == self.magma_earthshaker_5 then
		return self.currentStage == 1 and O + 2.3 or O + 1.7
	end
	if L == self.magma_earthshaker_6 then
		return self.currentStage == 1 and O + 3 or O + 2.1
	end
	if L == self.magma_earthshaker_7 then
		return self.currentStage == 1 and O + 1.7 or O + 1.1
	end
	return O + 1.5
end
function p.prototype.GetBossGapMultiplier(self)
	return math.max(0.01, 1 + GetBossGapAmplify(self:GetParent()) / 100)
end
function p.prototype.TryCastAbility(self, L)
	if
		not self:CanExecuteStageAction()
		or not IsValid(L)
		or not L:IsAbilityReady()
		or not self:CanCastConditionalAbility(L)
	then
		return false
	end
	local o = self:GetParent()
	local F = self.target
	o:RemoveModifierByName("modifier_face_move")
	self.lastCastAbilityName = L:GetAbilityName()
	if L == self.magma_earthshaker_4 or L == self.magma_earthshaker_7 then
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_NO_TARGET, L)
	elseif L == self.magma_earthshaker_5 then
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_TARGET, L, F)
	else
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, L, F:GetAbsOrigin())
	end
	local s = GameRules:GetGameTime()
	self.nextActionTime = s + self:GetGapDuration(L) * self:GetBossGapMultiplier()
	self.nextMoveTime = s + (self.currentStage == 1 and 0.2 or 0.12)
	return true
end
function p.prototype.TryCastStage1PriorityAbility(self)
	local v = self:GetDistanceToTarget()
	local w = math.max(360, self:GetParent():Script_GetAttackRange())
	if self:ShouldRebuildTotems() and self:TryCastAbility(self.magma_earthshaker_7) then
		return true
	end
	if v <= w * 1.2 and self:TryCastAbility(self.magma_earthshaker_6) then
		return true
	end
	if v <= 1100 and self:HasFrontTotem() and self:TryCastAbility(self.magma_earthshaker_2) then
		return true
	end
	return false
end
function p.prototype.TryCastStage2PriorityAbility(self)
	local v = self:GetDistanceToTarget()
	local w = math.max(360, self:GetParent():Script_GetAttackRange())
	if self:ShouldRebuildTotems() and self:TryCastAbility(self.magma_earthshaker_7) then
		return true
	end
	if v <= 1200 and self:HasFrontTotem() and self:TryCastAbility(self.magma_earthshaker_2) then
		return true
	end
	if self:TryCastAbility(self.magma_earthshaker_5) then
		return true
	end
	if v <= w * 1.25 and self:TryCastAbility(self.magma_earthshaker_6) then
		return true
	end
	if v > 500 and self:TryCastAbility(self.magma_earthshaker_4) then
		return true
	end
	return false
end
function p.prototype.GetStage1WeightedAbility(self)
	local P = {
		magma_earthshaker_1 = 7,
		magma_earthshaker_2 = 4,
		magma_earthshaker_3 = 6,
		magma_earthshaker_4 = 1,
		magma_earthshaker_5 = 0,
		magma_earthshaker_6 = 3,
		magma_earthshaker_7 = 5,
	}
	local Q = f(i, P)
	Q:Each(function(R, S)
		local L = self[S]
		if not self:CanSelectWeightedAbility(L, true) then
			Q:Set(S, 0)
		end
	end)
	local S = Q:Random()
	if S ~= nil then
		return self[S]
	end
	return nil
end
function p.prototype.GetStage2WeightedAbility(self)
	local P = {
		magma_earthshaker_1 = 5,
		magma_earthshaker_2 = 7,
		magma_earthshaker_3 = 8,
		magma_earthshaker_4 = 4,
		magma_earthshaker_5 = 5,
		magma_earthshaker_6 = 4,
		magma_earthshaker_7 = 6,
	}
	local Q = f(i, P)
	Q:Each(function(R, S)
		local L = self[S]
		if not self:CanSelectWeightedAbility(L, true) then
			Q:Set(S, 0)
		end
	end)
	local S = Q:Random()
	if S ~= nil then
		return self[S]
	end
	return nil
end
function p.prototype.TryHandlePhaseTwoTransition(self)
	if not self.phaseTwoTransitionPending then
		return false
	end
	local s = GameRules:GetGameTime()
	if s > self.phaseTwoTransitionDeadline then
		self.phaseTwoTransitionPending = false
		return false
	end
	if not self:CanExecuteStageAction() then
		return true
	end
	local T = { self.magma_earthshaker_7, self.magma_earthshaker_3, self.magma_earthshaker_4 }
	do
		local D = 0
		while D < #T do
			local L = T[D + 1]
			if self:CanSelectWeightedAbility(L, false) and self:TryCastAbility(L) then
				self.phaseTwoTransitionPending = false
				return true
			end
			D = D + 1
		end
	end
	return true
end
function p.prototype.UpdateAggroTarget(self)
	local o = self:GetParent()
	local F = Player:FindNearestAliveEnemyHero(o:GetTeamNumber(), o:GetAbsOrigin(), o:GetAcquisitionRange())
	if F == nil then
		self.target = nil
		return
	end
	if self.target == nil then
		self.target = F
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
		return
	end
	if self.changeAggroEnabled then
		self.target = F
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
	end
end
function p.prototype.EventListener(self)
	return {
		entity_killed = function(R, U)
			if self.target ~= nil and U.victim == self.target then
				self.target = nil
				self:UpdateAggroTarget()
			end
		end,
	}
end
function p.prototype.Stage1(self)
	self.currentStage = 1
	local s = GameRules:GetGameTime()
	if not self:CanExecuteStageAction() then
		return
	end
	if s < self.nextActionTime then
		self:ExecuteGapMovement(s)
		return
	end
	if self:TryCastStage1PriorityAbility() then
		return
	end
	local L = self:GetStage1WeightedAbility()
	if L ~= nil and self:TryCastAbility(L) then
		return
	end
	self:ExecuteGapMovement(s)
end
function p.prototype.Stage2(self)
	self.currentStage = 2
	local s = GameRules:GetGameTime()
	if self:TryHandlePhaseTwoTransition() then
		return
	end
	if not self:CanExecuteStageAction() then
		return
	end
	if s < self.nextActionTime then
		self:ExecuteGapMovement(s)
		return
	end
	if self:TryCastStage2PriorityAbility() then
		return
	end
	local L = self:GetStage2WeightedAbility()
	if L ~= nil and self:TryCastAbility(L) then
		return
	end
	self:ExecuteGapMovement(s)
end
function p.prototype.DynamicProperty(self)
	return {
		[PropertyFunction.COOLDOWN_REDUCTION] = function()
			if self.currentStage == 2 then
				return 20
			end
			return 0
		end,
	}
end
p = e(
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
	p
)
return g