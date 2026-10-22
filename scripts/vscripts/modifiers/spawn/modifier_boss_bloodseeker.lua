--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/spawn/modifier_boss_bloodseeker"
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
m.name = "modifier_spawn_boss_bloodseeker"
d(m, k)
function m.prototype.OnCreated(self, n)
	if IsServer() then
		local o = self:GetParent()
		self:StartThink(0, function()
			o:SetForwardVector(vec3_bottom)
			return -1
		end)
		self:StartThink(1, function()
			EmitGlobalSound("BloodSeeker.Spawn")
			o:StartGesture(ACT_DOTA_CAST_ABILITY_6)
			return -1
		end)
		self:SetDuration(4, true)
	end
end
function m.prototype.OnDestroy(self)
	if IsServer() then
		local o = self:GetParent()
		o:RemoveGesture(ACT_SCRIPT_CUSTOM_7)
		o:AddNewModifier(o, nil, "modifier_boss_bloodseeker", {})
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
p.name = "modifier_boss_bloodseeker"
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
		self.boss_bloodseeker_1 = o:FindAbilityByName("boss_bloodseeker_1")
		self.boss_bloodseeker_2 = o:FindAbilityByName("boss_bloodseeker_2")
		self.boss_bloodseeker_3 = o:FindAbilityByName("boss_bloodseeker_3")
		self.boss_bloodseeker_4 = o:FindAbilityByName("boss_bloodseeker_4")
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
	if self:GetParent():GetHealthPercent() <= 60 then
		return 2
	end
	return 1
end
function p.prototype.OnStageChanged(self, r)
	self.currentStage = r
	local s = GameRules:GetGameTime()
	self.lastCastAbilityName = nil
	self.nextActionTime = s + 0.45
	self.nextMoveTime = s + 0.2
	if r == 2 then
		self.phaseTwoTransitionPending = true
		self.phaseTwoTransitionDeadline = s + 5
		self:GetParent():EmitSound("hero_bloodseeker.rupture.cast")
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
		local u = math.max(220, o:Script_GetAttackRange())
		o:AddNewModifier(
			o,
			nil,
			"modifier_face_move",
			{ target = self.target:entindex(), moveType = "strafe", radius = u, duration = 0.4 }
		)
	end
end
function p.prototype.MoveToEnemy(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local v = CalcDistance(o, self.target)
		local w = math.max(220, o:Script_GetAttackRange())
		if v > w then
			local x = self.target:GetAbsOrigin()
			local y = CalcDirection(o, self.target)
			local z = x - y * w * 0.45
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
function p.prototype.HasBloodStormActive(self)
	return self:GetParent():HasModifier("modifier_boss_bloodseeker_4")
end
function p.prototype.CanCastConditionalAbility(self, A)
	local B = A.funcCondition
	if B ~= nil and B(nil, A) ~= true then
		return false
	end
	return true
end
function p.prototype.CanSelectWeightedAbility(self, A, C)
	if C == nil then
		C = false
	end
	if not IsValid(A) or not A:IsAbilityReady() or not self:CanCastConditionalAbility(A) then
		return false
	end
	if C and self.lastCastAbilityName ~= nil and A:GetAbilityName() == self.lastCastAbilityName then
		return false
	end
	local v = self:GetDistanceToTarget()
	if A == self.boss_bloodseeker_1 then
		if v < 250 or v > 1100 then
			return false
		end
	end
	if A == self.boss_bloodseeker_2 then
		if v > A:GetCastRange(vec3_zero, nil) then
			return false
		end
	end
	if A == self.boss_bloodseeker_3 then
		if v < 200 or v > A:GetCastRange(vec3_zero, nil) then
			return false
		end
	end
	if A == self.boss_bloodseeker_4 then
		if self.currentStage == 1 or self:HasBloodStormActive() then
			return false
		end
	end
	return true
end
function p.prototype.ExecuteGapMovement(self, s)
	if s < self.nextMoveTime or not self:HasValidTarget() or self:GetParent():IsCasting() then
		return
	end
	local o = self:GetParent()
	local v = self:GetDistanceToTarget()
	local w = math.max(220, o:Script_GetAttackRange())
	self.nextMoveTime = s + (self.currentStage == 1 and 0.3 or 0.2)
	if v <= w * 1.1 then
		self:FaceMove()
	else
		self:MoveToEnemy()
	end
end
function p.prototype.GetGapDuration(self, A)
	local D = A:GetCastPoint()
	if A == self.boss_bloodseeker_1 then
		return self.currentStage == 1 and D + 1 or D + 0.8
	end
	if A == self.boss_bloodseeker_2 then
		return self.currentStage == 1 and D + 1.6 or D + 1.25
	end
	if A == self.boss_bloodseeker_3 then
		return self.currentStage == 1 and D + 2.5 or D + 2.1
	end
	if A == self.boss_bloodseeker_4 then
		return D + 1.2
	end
	return D + 1.5
end
function p.prototype.GetBossGapMultiplier(self)
	return math.max(0.01, 1 + GetBossGapAmplify(self:GetParent()) / 100)
end
function p.prototype.TryCastAbility(self, A)
	if
		not self:CanExecuteStageAction()
		or not IsValid(A)
		or not A:IsAbilityReady()
		or not self:CanCastConditionalAbility(A)
	then
		return false
	end
	local o = self:GetParent()
	local E = self.target
	o:RemoveModifierByName("modifier_face_move")
	self.lastCastAbilityName = A:GetAbilityName()
	if A == self.boss_bloodseeker_4 then
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_NO_TARGET, A)
	elseif A == self.boss_bloodseeker_2 or A == self.boss_bloodseeker_3 then
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_TARGET, A, E)
	else
		o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, A, E:GetAbsOrigin())
	end
	local s = GameRules:GetGameTime()
	self.nextActionTime = s + self:GetGapDuration(A) * self:GetBossGapMultiplier()
	self.nextMoveTime = s + (self.currentStage == 1 and 0.18 or 0.12)
	return true
end
function p.prototype.TryCastStage1PriorityAbility(self)
	local v = self:GetDistanceToTarget()
	if v > 850 and self:TryCastAbility(self.boss_bloodseeker_3) then
		return true
	end
	if v >= 350 and v <= 1050 and self:TryCastAbility(self.boss_bloodseeker_1) then
		return true
	end
	return false
end
function p.prototype.TryCastStage2PriorityAbility(self)
	local v = self:GetDistanceToTarget()
	if not self:HasBloodStormActive() and self:TryCastAbility(self.boss_bloodseeker_4) then
		return true
	end
	if v > 800 and self:TryCastAbility(self.boss_bloodseeker_3) then
		return true
	end
	if v >= 300 and v <= 1050 and self:TryCastAbility(self.boss_bloodseeker_1) then
		return true
	end
	return false
end
function p.prototype.GetStage1WeightedAbility(self)
	local F = { boss_bloodseeker_1 = 4, boss_bloodseeker_2 = 7, boss_bloodseeker_3 = 8, boss_bloodseeker_4 = 0 }
	local G = f(i, F)
	G:Each(function(H, I)
		local A = self[I]
		if not self:CanSelectWeightedAbility(A, true) then
			G:Set(I, 0)
		end
	end)
	local I = G:Random()
	if I ~= nil then
		return self[I]
	end
	return nil
end
function p.prototype.GetStage2WeightedAbility(self)
	local F = { boss_bloodseeker_1 = 5, boss_bloodseeker_2 = 7, boss_bloodseeker_3 = 7, boss_bloodseeker_4 = 9 }
	local G = f(i, F)
	G:Each(function(H, I)
		local A = self[I]
		if not self:CanSelectWeightedAbility(A, true) then
			G:Set(I, 0)
		end
	end)
	local I = G:Random()
	if I ~= nil then
		return self[I]
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
	if
		self:CanSelectWeightedAbility(self.boss_bloodseeker_4, false) and self:TryCastAbility(self.boss_bloodseeker_4)
	then
		self.phaseTwoTransitionPending = false
		return true
	end
	return false
end
function p.prototype.UpdateAggroTarget(self)
	local o = self:GetParent()
	local E = Player:FindNearestAliveEnemyHero(o:GetTeamNumber(), o:GetAbsOrigin(), o:GetAcquisitionRange())
	if E == nil then
		self.target = nil
		return
	end
	if self.target == nil then
		self.target = E
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
		return
	end
	if self.changeAggroEnabled then
		self.target = E
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
	end
end
function p.prototype.EventListener(self)
	return {
		entity_killed = function(H, J)
			if self.target ~= nil and J.victim == self.target then
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
	local A = self:GetStage1WeightedAbility()
	if A ~= nil and self:TryCastAbility(A) then
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
	local A = self:GetStage2WeightedAbility()
	if A ~= nil and self:TryCastAbility(A) then
		return
	end
	self:ExecuteGapMovement(s)
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