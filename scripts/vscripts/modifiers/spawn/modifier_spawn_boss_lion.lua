--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/spawn/modifier_spawn_boss_lion"
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
m.name = "modifier_spawn_boss_lion"
d(m, k)
function m.prototype.OnCreated(self, n)
	if IsServer() then
		local o = self:GetParent()
		self:StartThink(0, function()
			o:SetForwardVector(vec3_bottom)
			return -1
		end)
		self:StartThink(1, function()
			EmitGlobalSound("Lion.Spawn")
			o:StartGesture(ACT_DOTA_SHRUG)
			return -1
		end)
		self:SetDuration(4, true)
	end
end
function m.prototype.OnDestroy(self)
	if IsServer() then
		local o = self:GetParent()
		o:RemoveGesture(ACT_DOTA_SHRUG)
		o:AddNewModifier(o, nil, "modifier_boss_lion", {})
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
p.name = "modifier_boss_lion"
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
		self.boss_lion_1 = o:FindAbilityByName("boss_lion_1")
		self.boss_lion_2 = o:FindAbilityByName("boss_lion_2")
		self.boss_lion_3 = o:FindAbilityByName("boss_lion_3")
		self.boss_lion_4 = o:FindAbilityByName("boss_lion_4")
		self.boss_lion_5 = o:FindAbilityByName("boss_lion_5")
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
			elseif self.currentStage == 2 then
				self:Stage2()
			end
			return 0
		end)
		local r = ParticleManager:CreateParticleForce(
			"particles/econ/items/lion/dungeon_poacher/dungeon_poacher_arms_ambient.vpcf",
			PATTACH_POINT_FOLLOW,
			o
		)
		ParticleManager:SetParticleControlEnt(r, 0, o, PATTACH_POINT_FOLLOW, "attach_attack2", o:GetAbsOrigin(), true)
		self:AddParticle(r, false, false, -1, false, false)
	end
end
function p.prototype.GetDesiredStage(self)
	if self:GetParent():GetHealthPercent() <= 60 then
		return 2
	end
	return 1
end
function p.prototype.OnStageChanged(self, s)
	self.currentStage = s
	local t = GameRules:GetGameTime()
	self.lastCastAbilityName = nil
	self.nextActionTime = t + 0.45
	self.nextMoveTime = t + 0.2
	if s == 2 then
		self.phaseTwoTransitionPending = true
		self.phaseTwoTransitionDeadline = t + 5
		local o = self:GetParent()
		if IsValid(self.boss_lion_2) then
			self.boss_lion_2:SetLevel(2)
		end
		if IsValid(self.boss_lion_3) then
			self.boss_lion_3:SetLevel(2)
		end
		if IsValid(self.boss_lion_4) then
			self.boss_lion_4:SetLevel(2)
		end
		o:EmitSound("hero_lion.rupture.cast")
		print("[Boss Lion] 进入阶段2！战斗变得更激烈了！")
	end
end
function p.prototype.Stage1(self)
	self.currentStage = 1
	local t = GameRules:GetGameTime()
	if not self:CanExecuteStageAction() then
		return
	end
	if t < self.nextActionTime then
		self:ExecuteGapMovement(t)
		return
	end
	if self.lastCastAbilityName ~= "boss_lion_3" and self:TryCastCloseRangeAbility(self.boss_lion_3) then
		return
	end
	if self:TryCastAbility(self.boss_lion_4) then
		return
	end
	local u = self:GetStage1WeightedAbility()
	if u and self:TryCastAbility(u) then
		return
	end
	self:ExecuteGapMovement(t)
end
function p.prototype.Stage2(self)
	self.currentStage = 2
	local t = GameRules:GetGameTime()
	if self:TryHandlePhaseTwoTransition() then
		return
	end
	if not self:CanExecuteStageAction() then
		return
	end
	if t < self.nextActionTime then
		self:ExecuteGapMovement(t)
		return
	end
	if self.lastCastAbilityName ~= "boss_lion_3" and self:TryCastCloseRangeAbility(self.boss_lion_3) then
		return
	end
	local u = self:GetStage2WeightedAbility()
	if u and self:TryCastAbility(u) then
		return
	end
	self:ExecuteGapMovement(t)
end
function p.prototype.TryHandlePhaseTwoTransition(self)
	if not self.phaseTwoTransitionPending then
		return false
	end
	local t = GameRules:GetGameTime()
	if t > self.phaseTwoTransitionDeadline then
		self.phaseTwoTransitionPending = false
		return false
	end
	if not self:CanExecuteStageAction() then
		return true
	end
	if self:CanSelectWeightedAbility(self.boss_lion_5, false) and self:TryCastAbility(self.boss_lion_5) then
		self.phaseTwoTransitionPending = false
		print("[Boss Lion] 阶段2过渡技能：Finger of Death！")
		return true
	end
	local v = { self.boss_lion_4, self.boss_lion_2 }
	do
		local w = 0
		while w < #v do
			local u = v[w + 1]
			if self:CanSelectWeightedAbility(u, false) and self:TryCastAbility(u) then
				self.phaseTwoTransitionPending = false
				return true
			end
			w = w + 1
		end
	end
	return true
end
function p.prototype.GetStage1WeightedAbility(self)
	local x = { boss_lion_1 = 6, boss_lion_2 = 6, boss_lion_3 = 4, boss_lion_4 = 4 }
	local y = f(i, x)
	y:Each(function(z, A)
		local u = self[A]
		if not self:CanSelectWeightedAbility(u, true) then
			y:Set(A, 0)
		end
	end)
	local A = y:Random()
	if A ~= nil then
		return self[A]
	end
	return nil
end
function p.prototype.GetStage2WeightedAbility(self)
	local x = { boss_lion_1 = 1, boss_lion_2 = 6, boss_lion_3 = 4, boss_lion_4 = 8, boss_lion_5 = 8 }
	local y = f(i, x)
	y:Each(function(z, A)
		local u = self[A]
		if not self:CanSelectWeightedAbility(u, true) then
			y:Set(A, 0)
		end
	end)
	local A = y:Random()
	if A ~= nil then
		return self[A]
	end
	return nil
end
function p.prototype.CanSelectWeightedAbility(self, u, B)
	if B == nil then
		B = false
	end
	if not IsValid(u) or not u:IsAbilityReady() or not self:CanCastConditionalAbility(u) then
		return false
	end
	if B and self.lastCastAbilityName ~= nil and u:GetAbilityName() == self.lastCastAbilityName then
		return false
	end
	local C = self:GetDistanceToTarget()
	if u == self.boss_lion_1 then
		if C > 1100 then
			return false
		end
	end
	if u == self.boss_lion_2 then
		if C > u:GetCastRange(vec3_zero, nil) then
			return false
		end
	end
	if u == self.boss_lion_3 then
		local D = self:GetParent():Script_GetAttackRange()
		if C > D * 1.2 then
			return false
		end
	end
	if u == self.boss_lion_4 then
		local E = u:GetCastRange(vec3_zero, nil)
		if C > E then
			return false
		end
	end
	if u == self.boss_lion_5 then
		if C < 400 or C > u:GetCastRange(vec3_zero, nil) then
			return false
		end
	end
	return true
end
function p.prototype.CanCastConditionalAbility(self, u)
	local F = u.funcCondition
	if F ~= nil and F(nil, u) ~= true then
		return false
	end
	return true
end
function p.prototype.TryCastCloseRangeAbility(self, u, G)
	if G == nil then
		G = 1.2
	end
	if not IsValid(u) or not u:IsAbilityReady() or not self:CanCastConditionalAbility(u) then
		return false
	end
	local C = self:GetDistanceToTarget()
	local D = self:GetParent():Script_GetAttackRange()
	if C > D * G then
		return false
	end
	return self:TryCastAbility(u)
end
function p.prototype.TryCastAbility(self, u)
	if
		not self:CanExecuteStageAction()
		or not IsValid(u)
		or not u:IsAbilityReady()
		or not self:CanCastConditionalAbility(u)
	then
		return false
	end
	local o = self:GetParent()
	local H = self.target
	o:RemoveModifierByName("modifier_face_move")
	self.lastCastAbilityName = u:GetAbilityName()
	o:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, u, H:GetAbsOrigin())
	local t = GameRules:GetGameTime()
	self.nextActionTime = t + self:GetGapDuration(u) * self:GetBossGapMultiplier()
	self.nextMoveTime = t + (self.currentStage == 1 and 0.18 or 0.12)
	return true
end
function p.prototype.GetGapDuration(self, u)
	local I = u:GetCastPoint()
	local J = self.currentStage == 1 and 0.5 or 0.3
	if u == self.boss_lion_1 then
		local K = 5
		return I + K + J
	end
	if u == self.boss_lion_2 then
		return self.currentStage == 1 and I + 2.1 or I + 1.5
	end
	if u == self.boss_lion_3 then
		local K = 4.34
		return I + K + J
	end
	if u == self.boss_lion_4 then
		local K = 2.4
		return I + K + J
	end
	if u == self.boss_lion_5 then
		return self.currentStage == 1 and I + 2.5 or I + 2
	end
	return I + 1.5
end
function p.prototype.GetBossGapMultiplier(self)
	return math.max(0.01, 1 + GetBossGapAmplify(self:GetParent()) / 100)
end
function p.prototype.UpdateAggroTarget(self)
	local o = self:GetParent()
	local H = Player:FindNearestAliveEnemyHero(o:GetTeamNumber(), o:GetAbsOrigin(), o:GetAcquisitionRange())
	if H == nil then
		self.target = nil
		return
	end
	if self.target == nil then
		self.target = H
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
		return
	end
	if self.changeAggroEnabled then
		self.target = H
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
	end
end
function p.prototype.Patrol(self)
	local o = self:GetParent()
	if self.target == nil and not o:IsRooted() and not o:IsMoving() and not o:IsCasting() then
		local L = self.center + RandomVector(RandomInt(0, o:GetAcquisitionRange()))
		o:ExecuteOrder(DOTA_UNIT_ORDER_MOVE_TO_POSITION, L)
	end
end
function p.prototype.CanExecuteStageAction(self)
	local o = self:GetParent()
	return self:HasValidTarget() and not o:IsCasting()
end
function p.prototype.HasValidTarget(self)
	if self.target == nil or not IsValid(self.target) or not self.target:IsAlive() then
		self.target = nil
		return false
	end
	return true
end
function p.prototype.ExecuteGapMovement(self, t)
	if t < self.nextMoveTime or not self:HasValidTarget() or self:GetParent():IsCasting() then
		return
	end
	local o = self:GetParent()
	local C = self:GetDistanceToTarget()
	local D = math.max(220, o:Script_GetAttackRange())
	self.nextMoveTime = t + (self.currentStage == 1 and 0.3 or 0.2)
	if C <= D * 1.1 then
		self:FaceMove()
	else
		self:MoveToEnemy()
	end
end
function p.prototype.GetDistanceToTarget(self)
	if not self:HasValidTarget() then
		return 99999
	end
	return CalcDistance(self:GetParent(), self.target)
end
function p.prototype.FaceMove(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local M = o:Script_GetAttackRange()
		o:AddNewModifier(
			o,
			nil,
			"modifier_face_move",
			{ target = self.target:entindex(), moveType = "strafe", radius = M, duration = 0.5 }
		)
	end
end
function p.prototype.MoveToEnemy(self)
	if IsValid(self.target) then
		local o = self:GetParent()
		local C = CalcDistance(o, self.target)
		local D = o:Script_GetAttackRange()
		if C > D then
			local N = self.target:GetAbsOrigin()
			local O = CalcDirection(o, self.target)
			local P = N - O * D * 0.5
			o:MoveToPosition(P)
		end
	end
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