--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/spawn/modifier_boss_shredder"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("modifiers.eom_modifier.eom_modifier")
local h = g.EOMModifier
local i = g.registerEOMModifier
local j = c()
j.name = "modifier_spawn_boss_shredder"
d(j, h)
function j.prototype.OnCreated(self, k)
	if IsServer() then
		local l = self:GetParent()
		self:StartThink(0, function()
			l:SetForwardVector(vec3_bottom)
			return -1
		end)
		self:StartThink(1, function()
			EmitGlobalSound("Shredder.Spawn")
			l:StartGesture(ACT_DOTA_LOADOUT_RARE)
			return -1
		end)
		self:SetDuration(4, true)
	end
end
function j.prototype.OnDestroy(self)
	if IsServer() then
		local l = self:GetParent()
		l:RemoveGesture(ACT_DOTA_LOADOUT_RARE)
		l:AddNewModifier(l, nil, "modifier_boss_shredder", {})
	end
end
function j.prototype.StaticProperty(self)
	return { [PropertyFunction.AVOID_DAMAGE] = 1 }
end
function j.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true }
end
function j.prototype.CheckState(self)
	return { [MODIFIER_STATE_STUNNED] = true, [MODIFIER_STATE_INVULNERABLE] = true }
end
j = e(
	{
		i(
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
	j
)
local m = c()
m.name = "modifier_boss_shredder"
d(m, h)
function m.prototype.____constructor(self, ...)
	h.prototype.____constructor(self, ...)
	self.changeAggroEnabled = false
	self.nextActionTime = 0
	self.nextMoveTime = 0
	self.pendingAOEAfterHook = false
end
function m.prototype.OnCreated(self, k)
	if IsServer() then
		local l = self:GetParent()
		self.center = l:GetAbsOrigin()
		self.boss_shredder_1 = l:FindAbilityByName("boss_shredder_1")
		self.boss_shredder_2 = l:FindAbilityByName("boss_shredder_2")
		self.boss_shredder_3 = l:FindAbilityByName("boss_shredder_3")
		self.boss_shredder_4 = l:FindAbilityByName("boss_shredder_4")
		self.boss_shredder_5 = l:FindAbilityByName("boss_shredder_5")
		self:StartThink(0.1, "UpdateAggroTarget", function()
			if l:HasState(StateEnum.AI_DISABLED) then
				return 1
			end
			self:UpdateAggroTarget()
			return self.target ~= nil and 1 or 0.1
		end)
		self:StartThink(0.5, "Patrol", function()
			if l:HasState(StateEnum.AI_DISABLED) then
				return 0.5
			end
			self:Patrol()
			return 0.5
		end)
		self:StartThink(0, "StageThink", function()
			if l:HasState(StateEnum.AI_DISABLED) then
				return 0.1
			end
			if l:GetHealthPercent() <= 60 then
				self:Stage2()
			else
				self:Stage1()
			end
			return 0
		end)
	end
end
function m.prototype.HasValidTarget(self)
	if self.target == nil or not IsValid(self.target) or not self.target:IsAlive() then
		self.target = nil
		return false
	end
	return true
end
function m.prototype.CanExecuteAction(self)
	return self:HasValidTarget() and not self:GetParent():IsCasting()
end
function m.prototype.CanCastAbility(self, n)
	if not IsValid(n) or not n:IsAbilityReady() then
		return false
	end
	local o = n.funcCondition
	if o ~= nil and o(nil, n) ~= true then
		return false
	end
	return true
end
function m.prototype.GetDistanceToTarget(self)
	if not self:HasValidTarget() then
		return 99999
	end
	return CalcDistance(self:GetParent(), self.target)
end
function m.prototype.GetFarthestTree(self)
	if not IsValid(self.boss_shredder_1) then
		return nil
	end
	local p = self.boss_shredder_1
	local q = p.treeList or {}
	local l = self:GetParent()
	local r
	local s = 0
	do
		local t = 0
		while t < #q do
			do
				local u = q[t + 1]
				if not IsValid(u) or not u:IsAlive() then
					goto v
				end
				local w = CalcDistance(l, u)
				if w > s then
					s = w
					r = u
				end
			end
			::v::
			t = t + 1
		end
	end
	return r
end
function m.prototype.GetGapDuration(self, n)
	if n == self.boss_shredder_2 then
		return n:GetCastPoint() + 2.5
	end
	if n == self.boss_shredder_4 then
		return n:GetChannelTime() + 1
	end
	if n == self.boss_shredder_5 then
		return n:GetSpecialValueFor("duration") + 0.5
	end
	return n:GetCastPoint() + 1.5
end
function m.prototype.GetBossGapMultiplier(self)
	return math.max(0.01, 1 + GetBossGapAmplify(self:GetParent()) / 100)
end
function m.prototype.TryCastAbility(self, n, x)
	if not self:CanExecuteAction() or not self:CanCastAbility(n) then
		return false
	end
	local l = self:GetParent()
	l:RemoveModifierByName("modifier_face_move")
	if n == self.boss_shredder_4 and self:HasValidTarget() then
		l:SetForwardVector(CalcDirection(l, self.target))
	end
	if n == self.boss_shredder_1 or n == self.boss_shredder_3 or n == self.boss_shredder_4 then
		l:ExecuteOrder(DOTA_UNIT_ORDER_CAST_NO_TARGET, n)
	else
		local y = x or self.target
		l:ExecuteOrder(DOTA_UNIT_ORDER_CAST_TARGET, n, y)
	end
	local z = GameRules:GetGameTime()
	self.nextActionTime = z + self:GetGapDuration(n) * self:GetBossGapMultiplier()
	self.nextMoveTime = z + 0.2
	return true
end
function m.prototype.MoveToEnemy(self)
	if not self:HasValidTarget() then
		return
	end
	local l = self:GetParent()
	local A = self.target
	local B = math.max(350, l:Script_GetAttackRange())
	if self:GetDistanceToTarget() > B then
		local C = CalcDirection(l, A)
		local D = A:GetAbsOrigin() - C * B * 0.5
		l:MoveToPosition(D)
	end
end
function m.prototype.FaceMove(self)
	if not self:HasValidTarget() then
		return
	end
	local l = self:GetParent()
	local E = math.max(260, l:Script_GetAttackRange())
	l:AddNewModifier(
		l,
		nil,
		"modifier_face_move",
		{ target = self.target:entindex(), moveType = "strafe", radius = E, duration = 0.45 }
	)
end
function m.prototype.ExecuteGapMovement(self, z)
	if z < self.nextMoveTime or not self:HasValidTarget() or self:GetParent():IsCasting() then
		return
	end
	self.nextMoveTime = z + 0.3
	local F = self:GetDistanceToTarget()
	local B = math.max(350, self:GetParent():Script_GetAttackRange())
	if F <= B * 1.1 then
		self:FaceMove()
	else
		self:MoveToEnemy()
	end
end
function m.prototype.Patrol(self)
	local l = self:GetParent()
	if self.target == nil and not l:IsRooted() and not l:IsMoving() and not l:IsCasting() then
		local G = self.center + RandomVector(RandomInt(0, l:GetAcquisitionRange()))
		l:ExecuteOrder(DOTA_UNIT_ORDER_MOVE_TO_POSITION, G)
	end
end
function m.prototype.UpdateAggroTarget(self)
	local l = self:GetParent()
	local A = Player:FindNearestAliveEnemyHero(l:GetTeamNumber(), l:GetAbsOrigin(), l:GetAcquisitionRange())
	if A == nil then
		self.target = nil
		return
	end
	if self.target == nil then
		self.target = A
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
		return
	end
	if self.changeAggroEnabled then
		self.target = A
		self.changeAggroEnabled = false
		self:StartThink(10, "EnableAggroChange", function()
			self.changeAggroEnabled = true
			return -1
		end)
	end
end
function m.prototype.EventListener(self)
	return {
		entity_killed = function(H, I)
			if self.target ~= nil and I.victim == self.target then
				self.target = nil
				self:UpdateAggroTarget()
			end
		end,
	}
end
function m.prototype.Stage1(self)
	local z = GameRules:GetGameTime()
	if not self:CanExecuteAction() then
		return
	end
	if z < self.nextActionTime then
		self:ExecuteGapMovement(z)
		return
	end
	if self:TryCastAbility(self.boss_shredder_1) then
		return
	end
	if self.pendingAOEAfterHook then
		if self:TryCastAbility(self.boss_shredder_3) then
			self.pendingAOEAfterHook = false
			return
		end
		self:ExecuteGapMovement(z)
		return
	end
	if self:TryCastAbility(self.boss_shredder_4) then
		return
	end
	local u = self:GetFarthestTree()
	if u ~= nil and self:TryCastAbility(self.boss_shredder_2, u) then
		self.pendingAOEAfterHook = true
		return
	end
	if self:TryCastAbility(self.boss_shredder_3) then
		return
	end
	self:ExecuteGapMovement(z)
end
function m.prototype.Stage2(self)
	local z = GameRules:GetGameTime()
	if not self:CanExecuteAction() then
		return
	end
	if z < self.nextActionTime then
		self:ExecuteGapMovement(z)
		return
	end
	if self:TryCastAbility(self.boss_shredder_1) then
		return
	end
	if self.pendingAOEAfterHook then
		if self:TryCastAbility(self.boss_shredder_3) then
			self.pendingAOEAfterHook = false
			return
		end
		self:ExecuteGapMovement(z)
		return
	end
	if self:TryCastAbility(self.boss_shredder_5) then
		return
	end
	if self:TryCastAbility(self.boss_shredder_4) then
		return
	end
	local u = self:GetFarthestTree()
	if u ~= nil and self:TryCastAbility(self.boss_shredder_2, u) then
		self.pendingAOEAfterHook = true
		return
	end
	if self:TryCastAbility(self.boss_shredder_3) then
		return
	end
	self:ExecuteGapMovement(z)
end
m = e(
	{
		i(
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
return f