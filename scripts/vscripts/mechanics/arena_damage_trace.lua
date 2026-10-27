--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "mechanics/arena_damage_trace"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__ObjectValues
local f = b.__TS__ArraySome
local g = b.__TS__Delete
local h = b.__TS__ArrayIncludes
local i = b.__TS__DecorateLegacy
local j = b.__TS__New
local k = {}
local l = require("lib.tstl-utils")
local m = l.reloadable
local n = {
	npc_dota_hero_vespera = "维斯佩拉",
	npc_dota_hero_vexis = "维西斯",
	npc_dota_hero_solthra = "索尔莎",
	npc_dota_hero_seraphon = "朱迪卡尔",
}
local o = c()
o.name = "CArenaDamageTrace"
d(o, CModule)
function o.prototype.____constructor(self, ...)
	CModule.prototype.____constructor(self, ...)
	self.maxEntries = 2000
	self.units = {}
	self.battles = {}
	self.frames = {}
end
function o.prototype.init(self, p)
	self:RestoreWrappers()
	self.frames = {}
	for q, r in ipairs(self.listenerIDs or {}) do
		Event:Unregister(r)
	end
	self.listenerIDs = {}
	if not IsInToolsMode() then
		return
	end
	local s = self.listenerIDs
	s[#s + 1] = Event:Register("damage_event", function(q, t)
		return self:ObserveDamage(t)
	end, self)
	local u = self.listenerIDs
	u[#u + 1] = Event:Register("consume_shield", function(q, t)
		local v = self:FindFrame(t.damageEvent)
		if v ~= nil then
			local w, x = v.entry, "shieldAbsorbed"
			w[x] = w[x] + t.shield
		end
	end, self)
	local y = self.listenerIDs
	y[#y + 1] = Event:Register("avoid_damage", function(q, t)
		local v = self:FindTargetFrame(t.unit:entindex())
		if v ~= nil then
			v.entry.isAvoided = true
		end
	end, self)
	GameEvent("entity_killed", function(t)
		return self:RecordDeath(t.entindex_killed, t.entindex_attacker)
	end)
	Convars:RegisterCommand("arena_combat_log", function(z, A)
		self:PrintBattleLog(tonumber(A or "0") or 0)
	end, "输出最近一场竞技场逐击战报：arena_combat_log [playerID]，默认 0", 0)
	if f(e(self.battles), function(q, B)
		return B and B.active
	end) then
		self:InstallWrappers()
	end
end
function o.prototype.RegisterUnit(self, A, C, D, E)
	if not IsInToolsMode() or not IsValid(C) then
		return
	end
	self.units[tostring(C:entindex())] = { playerID = A, heroName = D, side = E }
end
function o.prototype.UnregisterUnit(self, C)
	g(self.units, tostring(C:entindex()))
end
function o.prototype.StartBattle(self, A)
	if not IsInToolsMode() then
		return
	end
	self.battles[A] = { active = true, startedAt = GameRules:GetGameTime(), log = {}, dropped = 0 }
	self:InstallWrappers()
end
function o.prototype.EndBattle(self, A)
	local B = self.battles[A]
	if B == nil then
		return
	end
	B.active = false
	self:RestoreIfIdle()
	self:PrintBattleLog(A)
end
function o.prototype.ClearBattle(self, A)
	g(self.battles, A)
	self:RestoreIfIdle()
end
function o.prototype.InstallWrappers(self)
	if self.wrappedDamage ~= nil then
		return
	end
	local F = self
	local G = DamageSystem.DealDamage
	self.originalDamage = G
	self.wrappedDamage = function(self, H, I)
		local J = F.TraceDamage
		local K = H
		local L = I
		if L == nil then
			L = false
		end
		J(F, self, G, K, L)
	end
	DamageSystem.DealDamage = self.wrappedDamage
	local M = SendOverheadEventMessage
	self.originalOverhead = M
	self.wrappedOverhead = function(N, O, P, Q, R)
		if O == OVERHEAD_ALERT_EVADE and IsValid(P) then
			local v = F:FindTargetFrame(P:entindex())
			if v ~= nil then
				v.entry.isEvaded = true
			end
		end
		return M(N, O, P, Q, R)
	end
	_G.SendOverheadEventMessage = self.wrappedOverhead
end
function o.prototype.RestoreWrappers(self)
	if self.wrappedDamage ~= nil and DamageSystem.DealDamage == self.wrappedDamage then
		DamageSystem.DealDamage = self.originalDamage
	end
	if self.wrappedOverhead ~= nil and SendOverheadEventMessage == self.wrappedOverhead then
		_G.SendOverheadEventMessage = self.originalOverhead
	end
	self.originalDamage = nil
	self.wrappedDamage = nil
	self.originalOverhead = nil
	self.wrappedOverhead = nil
end
function o.prototype.RestoreIfIdle(self)
	if not f(e(self.battles), function(q, B)
		return B and B.active
	end) then
		self:RestoreWrappers()
	end
end
function o.prototype.TraceDamage(self, S, T, H, I)
	local P = H.target
	local U = IsValid(P) and self.units[tostring(P:entindex())] or nil
	local V
	if U == nil then
		V = nil
	else
		V = self.battles[U.playerID]
	end
	local B = V
	if U == nil or B == nil or not B.active or not IsValid(H.attacker) or not P:IsAlive() or P:GetHealth() <= 0 then
		T(S, H, I)
		return
	end
	local W = self:ResolveOwner(H.attacker, U.playerID)
	local X
	if IsValid(H.ability) then
		local Y, Z = pcall(function()
			return H.ability:GetAbilityName()
		end)
		if Y then
			X = Z
		end
	end
	local v = {
		params = H,
		battle = B,
		targetIndex = P:entindex(),
		resolved = false,
		entry = {
			time = math.max(0, GameRules:GetGameTime() - B.startedAt),
			attacker = W == nil and ("[未知来源-" .. H.attacker:GetUnitName()) .. "]" or self:UnitName(W),
			target = self:UnitName(U),
			abilityName = X or "未知技能/普攻",
			inputDamage = H.damage,
			damage = 0,
			shieldAbsorbed = 0,
			healthBefore = P:GetHealth(),
			healthAfter = P:GetHealth(),
			isCrit = false,
			isEvaded = false,
			isAvoided = false,
			isDead = false,
			isImmune = P:IsInvulnerable()
				or H.damage_category == DOTA_DAMAGE_CATEGORY_ATTACK and P:HasState(StateEnum.ATTACK_IMMUNE),
		},
	}
	local _ = self.frames
	_[#_ + 1] = v
	local a0 = false
	do
		local a1, a2 = pcall(function()
			T(S, H, false)
			a0 = true
		end)
		do
			do
				local a1, a2 = pcall(function()
					local a3 = v.entry
					local a4 = H.is_crit
					if a4 == nil then
						a4 = false
					end
					a3.isCrit = a4
					v.entry.failed = not a0
					if not v.resolved then
						v.entry.healthAfter = IsValid(P) and P:GetHealth() or 0
						if v.entry.isDead then
							v.entry.damage = H.damage
						elseif not v.entry.isEvaded and not v.entry.isImmune then
							v.entry.unresolved = true
						end
					end
					table.remove(self.frames)
					self:AddEntry(B, v.entry)
				end)
				do
					if I then
						S:ReleaseDamageInfo(H)
					end
				end
				if not a1 then
					error(a2, 0)
				end
			end
		end
		if not a1 then
			error(a2, 0)
		end
	end
end
function o.prototype.FindFrame(self, H)
	do
		local a5 = #self.frames - 1
		while a5 >= 0 do
			if self.frames[a5 + 1].params == H then
				return self.frames[a5 + 1]
			end
			a5 = a5 - 1
		end
	end
	return nil
end
function o.prototype.FindTargetFrame(self, a6)
	do
		local a5 = #self.frames - 1
		while a5 >= 0 do
			if self.frames[a5 + 1].targetIndex == a6 then
				return self.frames[a5 + 1]
			end
			a5 = a5 - 1
		end
	end
	return nil
end
function o.prototype.ObserveDamage(self, t)
	local v = self:FindFrame(t)
	if v == nil then
		return
	end
	v.resolved = true
	v.entry.damage = t.damage
	v.entry.healthBefore = t.health_before_damage
	v.entry.healthAfter = IsValid(t.target) and t.target:GetHealth() or 0
end
function o.prototype.RecordDeath(self, a7, a8)
	local U = self.units[tostring(a7)]
	local a9
	if U == nil then
		a9 = nil
	else
		a9 = self.battles[U.playerID]
	end
	local B = a9
	if U == nil or B == nil or not B.active then
		return
	end
	local v = self:FindTargetFrame(a7)
	if v ~= nil and not v.resolved then
		v.entry.isDead = true
		return
	end
	local aa
	if a8 == nil then
		aa = nil
	else
		aa = self.units[tostring(a8)]
	end
	local W = aa
	self:AddEntry(
		B,
		{
			time = math.max(0, GameRules:GetGameTime() - B.startedAt),
			attacker = W == nil and "[未知来源]" or self:UnitName(W),
			target = self:UnitName(U),
			abilityName = "未捕获致死伤害",
			inputDamage = 0,
			damage = 0,
			shieldAbsorbed = 0,
			healthBefore = 0,
			healthAfter = 0,
			isCrit = false,
			isEvaded = false,
			isAvoided = false,
			isImmune = false,
			isDead = true,
			deathOnly = true,
		}
	)
end
function o.prototype.ResolveOwner(self, C, A)
	local R = C
	local ab = {}
	do
		local a5 = 0
		while a5 < 8 and IsValid(R) do
			local a6 = R:entindex()
			if h(ab, a6) then
				break
			end
			ab[#ab + 1] = a6
			local U = self.units[tostring(a6)]
			if (U and U.playerID) == A then
				return U
			end
			R = R:GetOwner()
			a5 = a5 + 1
		end
	end
	return nil
end
function o.prototype.UnitName(self, U)
	return ((("[" .. (U.side == "friendly" and "我方" or "敌方")) .. "-") .. (n[U.heroName] or U.heroName)) .. "]"
end
function o.prototype.AddEntry(self, B, ac)
	if #B.log >= self.maxEntries and not ac.isDead then
		B.dropped = B.dropped + 1
	else
		local ad = B.log
		ad[#ad + 1] = ac
	end
end
function o.prototype.GetBattleLog(self, A)
	local ae = self.battles[A]
	return ae and ae.log or {}
end
function o.prototype.PrintBattleLog(self, A)
	local B = self.battles[A]
	if B == nil then
		print(("[ArenaCombatLog] player=" .. tostring(A)) .. " 暂无战报")
		return
	end
	print("[ArenaCombatLog] BEGIN player=" .. tostring(A))
	for q, ac in ipairs(B.log) do
		print(self:FormatEntry(ac))
	end
	if B.dropped > 0 then
		print(("[ArenaCombatLog] 已省略 " .. tostring(B.dropped)) .. " 条普通记录，死亡记录保留")
	end
	print("[ArenaCombatLog] END player=" .. tostring(A))
end
function o.prototype.FormatEntry(self, ac)
	local af = string.format("%.3f", ac.time)
	if ac.deathOnly then
		return ((((("[ArenaCombatLog] (" .. af) .. "s) ") .. ac.target) .. " 死亡，来源 ") .. ac.attacker)
			.. "（未捕获致死伤害）"
	end
	local ag = {}
	if ac.isCrit then
		ag[#ag + 1] = "暴击"
	end
	if ac.isEvaded then
		ag[#ag + 1] = "闪避"
	end
	if ac.isAvoided then
		ag[#ag + 1] = "规避"
	end
	if ac.isImmune then
		ag[#ag + 1] = "免疫"
	end
	if ac.isDead then
		ag[#ag + 1] = "死亡"
	end
	if ac.unresolved then
		ag[#ag + 1] = "未捕获结算"
	end
	if ac.failed then
		ag[#ag + 1] = "结算异常"
	end
	local ah = math.max(0, ac.healthBefore - ac.healthAfter)
	local ai = ac.isDead and math.max(0, ac.damage - ac.healthBefore) or 0
	return (
		(
			(
				(
					(
						(
							(
								(
									(
										(((("[ArenaCombatLog] (" .. af) .. "s) ") .. ac.attacker) .. "使用 ")
										.. ac.abilityName
									) .. " 对"
								) .. ac.target
							) .. "造成 "
						) .. string.format("%.2f", ac.damage)
					) .. " 伤害"
				) .. (#ag > 0 and ("（" .. table.concat(ag, "/")) .. "）" or "")
			)
			.. (("；输入伤害 " .. string.format("%.2f", ac.inputDamage)) .. "，护盾吸收 ")
			.. string.format("%.2f", ac.shieldAbsorbed)
		)
		.. (((("，实际扣血 " .. string.format("%.2f", ah)) .. "，生命 ") .. string.format(
			"%.2f",
			ac.healthBefore
		)) .. " → ")
		.. string.format("%.2f", ac.healthAfter)
	) .. (ai > 0 and "，过量伤害 " .. string.format("%.2f", ai) or "")
end
o = i({ m }, o)
if ArenaDamageTrace == nil then
	ArenaDamageTrace = j(o)
end
return k