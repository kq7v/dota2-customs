--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "mechanics/arena_damage"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__Delete
local e = b.__TS__ArraySort
local f = b.__TS__New
local g = {}
g.ArenaDamageTracker = c()
local h = g.ArenaDamageTracker
h.name = "ArenaDamageTracker"
function h.prototype.____constructor(self)
	self.unitOwners = {}
	self.battles = {}
end
function h.prototype.RegisterUnit(self, i, j, k, l)
	if not IsValid(j) or k <= 0 then
		return
	end
	self.unitOwners[tostring(j:entindex())] = { sessionPlayerID = i, uid = k, heroName = l }
end
function h.prototype.UnregisterUnit(self, j)
	d(self.unitOwners, tostring(j:entindex()))
end
function h.prototype.StartBattle(self, i)
	local m = { active = true, players = {} }
	for n, o in pairs(self.unitOwners) do
		do
			if o.sessionPlayerID ~= i then
				goto p
			end
			local q = self:GetOrCreatePlayer(m, o.uid)
			self:GetOrCreateHero(q, o.heroName)
		end
		::p::
	end
	self.battles[i] = m
end
function h.prototype.EndBattle(self, i)
	local m = self.battles[i]
	if m ~= nil then
		m.active = false
	end
end
function h.prototype.ClearBattle(self, i)
	d(self.battles, i)
end
function h.prototype.RecordDamage(self, r)
	if r.damage <= 0 or not IsValid(r.attacker) or not IsValid(r.target) then
		return
	end
	local s = self.unitOwners[tostring(r.attacker:entindex())]
	local t = self.unitOwners[tostring(r.target:entindex())]
	if s == nil or t == nil or s.sessionPlayerID ~= t.sessionPlayerID or s.uid == t.uid then
		return
	end
	local m = self.battles[s.sessionPlayerID]
	if m == nil or not m.active then
		return
	end
	local u = self:GetOrCreatePlayer(m, s.uid)
	local v = self:GetOrCreatePlayer(m, t.uid)
	local w = self:GetOrCreateHero(u, s.heroName)
	local x = self:GetOrCreateHero(v, t.heroName)
	local y = self:GetDamageSourceKey(r)
	u.totalDamage = u.totalDamage + r.damage
	v.totalTaken = v.totalTaken + r.damage
	w.totalDamage = w.totalDamage + r.damage
	x.totalTaken = x.totalTaken + r.damage
	if y ~= nil then
		local z, A = w.abilities, y
		if z[A] == nil then
			z[A] = { totalDamage = 0 }
		end
		local B, C = w.abilities[y], "totalDamage"
		B[C] = B[C] + r.damage
	end
end
function h.prototype.GetSummary(self, i)
	local m = self.battles[i]
	if m == nil then
		return nil
	end
	local D = {}
	for n, E in pairs(m.players) do
		local F = {}
		for n, G in pairs(E.heroes) do
			local H = {}
			for y, I in pairs(G.abilities) do
				H[#H + 1] = {
					key = y,
					totalDamage = math.floor(I.totalDamage),
					ratio = G.totalDamage > 0 and I.totalDamage / G.totalDamage or 0,
				}
			end
			e(H, function(n, J, K)
				return K.totalDamage - J.totalDamage
			end)
			F[#F + 1] = {
				heroName = G.heroName,
				totalDamage = math.floor(G.totalDamage),
				totalTaken = math.floor(G.totalTaken),
				ratio = E.totalDamage > 0 and G.totalDamage / E.totalDamage or 0,
				takenRatio = E.totalTaken > 0 and G.totalTaken / E.totalTaken or 0,
				abilities = H,
			}
		end
		e(F, function(n, J, K)
			return K.totalDamage - J.totalDamage
		end)
		D[#D + 1] =
			{ uid = E.uid, totalDamage = math.floor(E.totalDamage), totalTaken = math.floor(E.totalTaken), heroes = F }
	end
	e(D, function(n, J, K)
		return J.uid - K.uid
	end)
	return { players = D }
end
function h.prototype.GetOrCreatePlayer(self, m, k)
	local y = tostring(k)
	local L, M = m.players, y
	if L[M] == nil then
		L[M] = { uid = k, totalDamage = 0, totalTaken = 0, heroes = {} }
	end
	return m.players[y]
end
function h.prototype.GetOrCreateHero(self, q, l)
	local y = l or "unknown"
	local N, O = q.heroes, y
	if N[O] == nil then
		N[O] = { heroName = y, totalDamage = 0, totalTaken = 0, abilities = {} }
	end
	return q.heroes[y]
end
function h.prototype.GetDamageSourceKey(self, r)
	if r.ability ~= nil and IsValid(r.ability) then
		local P, Q = pcall(function()
			return r.ability:GetAbilityName()
		end)
		if P and Q ~= "" then
			return Q
		end
	end
	return nil
end
g.ArenaDamage = f(g.ArenaDamageTracker)
return g