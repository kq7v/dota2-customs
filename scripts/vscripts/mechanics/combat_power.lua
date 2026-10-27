--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "mechanics/combat_power"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__ObjectKeys
local f = b.__TS__ObjectAssign
local g = b.__TS__ObjectValues
local h = b.__TS__DecorateLegacy
local i = b.__TS__New
local j = {}
local k = require("lib.tstl-utils")
local l = k.reloadable
local m = {
	attackCombatPowerPerDps = 1,
	skillCombatPowerPerDps = 1,
	ehpCombatPowerPerPoint = 1,
	balancedCombatPowerScale = 3,
	defenseIntensityBase = 1000,
	utilityCombatPowerPerPoint = 1,
	standardSkillDps = 20,
	standardSkillMana = 100,
	skillManaEfficiency = 0.05,
	cooldownReductionCap = 80,
	evasionCap = 0.75,
	conditionalCoverage = {
		boss_damage_boost = 0.3,
		elite_damage_boost = 0.4,
		minion_damage_boost = 0.8,
		execute_damage = 0.2,
		finisher_damage = 0.2,
		backstab_damage_boost = 0.35,
		barrier_damage_boost = 0.3,
		damage_vs_bleeding_targets = 0.6,
		damage_vs_frozen_targets = 0.6,
		damage_vs_shocked_targets = 0.6,
		damage_vs_poisoned_targets = 0.6,
		melee_damage_boost = 0.5,
		ranged_damage_boost = 0.5,
	},
}
local n = {
	"aoe_amplify",
	"attack_range",
	"attack_range_melee",
	"attack_range_ranger",
	"bullet_range",
	"split_count",
	"ability_charge_dodge",
	"ability_charge_defense",
	"movespeed_amplify",
	"buff_duration",
	"debuff_duration",
}
local o = c()
o.name = "CCombatPower"
d(o, CModule)
function o.prototype.init(self, p) end
function o.prototype.GetPrivilegeCombatPowerFactor(self, q)
	local r = 0
	for s, t in ipairs({ { "effects", q.effects }, { "myth", q.myth } }) do
		local u = t[1]
		local v = t[2]
		do
			if v == nil then
				goto w
			end
			for s, x in ipairs(e(v)) do
				do
					local y = toFiniteNumber(v[x], 0)
					if y == 0 then
						goto z
					end
					local A = toFiniteNumber
					local B = KeyValues.privilegeKv
					local C = B and B[x]
					if C ~= nil then
						C = C.CombatPowerFactor
					end
					local D = A(C, 0)
					r = r + D
				end
				::z::
			end
		end
		::w::
	end
	return r
end
function o.prototype.GetPropertyValue(self, E, F)
	return toFiniteNumber(E[F], 0)
end
function o.prototype.SumProperties(self, E, G)
	local H = 0
	for s, F in ipairs(G) do
		H = H + self:GetPropertyValue(E, F)
	end
	return H
end
function o.prototype.GetCritFactor(self, E, I)
	local J = Clamp(
		self:SumProperties(E, I and { "crit_chance", "spell_crit_chance" } or { "crit_chance", "attack_crit_chance" })
			* 0.01,
		0,
		1
	)
	local K =
		self:SumProperties(E, I and { "crit_damage", "spell_crit_damage" } or { "crit_damage", "attack_crit_damage" })
	local L = 1 + self:GetPropertyValue(E, "crit_damage_mult") * 0.01
	local M = (1 + self:GetPropertyValue(E, "crit_damage_amplify") * 0.01)
		* (1 + self:GetPropertyValue(E, I and "spell_crit_damage_boost" or "attack_crit_damage_boost") * 0.01)
	return 1 + J * (math.max(K * 0.01 * L * M, 1) - 1)
end
function o.prototype.GetCombatPowerFromResolved(self, N)
	local E = f({}, N.attributes or {})
	local O = (self:GetPropertyValue(E, "base_attack") + self:GetPropertyValue(E, "attack"))
		* (1 + self:GetPropertyValue(E, "attack_amplify") * 0.01)
	local P = INTENSITY_FACTOR
		* self:GetPropertyValue(E, "damage_intensity")
		* (1 + self:GetPropertyValue(E, "damage_intensity_boost") * 0.01)
	local Q = 1
		+ CompoundIncrease(
				CompoundIncrease(self:GetPropertyValue(E, "damage_boost"), self:GetPropertyValue(E, "damage_amplify")),
				P,
				self:GetPropertyValue(E, "hero_damage_boost"),
				self:GetPropertyValue(E, "damage_boost_mult"),
				self:GetPropertyValue(E, "final_damage"),
				self:GetPropertyValue(E, "final_damage_101"),
				self:GetPropertyValue(E, "final_damage_102"),
				self:GetPropertyValue(E, "final_damage_103")
			)
			* 0.01
	local R = 1
		+ CompoundIncrease(
				CompoundIncrease(
					self:GetPropertyValue(E, "attack_damage_boost"),
					self:GetPropertyValue(E, "attack_damage_amplify")
				)
			)
			* 0.01
	local S = CompoundIncrease(
		self:GetPropertyValue(E, "physical_damage_boost"),
		self:GetPropertyValue(E, "physical_damage_amplify")
	)
	local T = CompoundIncrease(
		self:GetPropertyValue(E, "magical_damage_boost"),
		self:GetPropertyValue(E, "magical_damage_amplify")
	)
	local U = 1 + (S * 0.5 + T * 0.5) * 0.01
	local V = 0
	for s, F in ipairs(e(m.conditionalCoverage)) do
		V = V + self:GetPropertyValue(E, F) * m.conditionalCoverage[F]
	end
	local W = 1 + V * 0.01
	local X = Q * U * W
	local Y = self:GetPropertyValue(E, "attackspeed")
		+ self:GetPropertyValue(E, "attack_speed_boost")
		- self:GetPropertyValue(E, "attackspeed_reduction")
	local Z = math.max(0.2, (100 + Y) * 0.01)
	local _ = O * self:GetCritFactor(E, false) * R * Z
	local a0 = self:GetPropertyValue(E, "base_mana")
	local a1 = self:GetPropertyValue(E, "mana")
	local a2 = self:GetPropertyValue(E, "mana_amplify")
	local a3 = a0 ~= 0 or a1 ~= 0 or a2 ~= 0
	local a4 = math.max(0, (a0 + a1) * (1 + a2 * 0.01))
	local a5 = math.max(0, a4 - m.standardSkillMana)
	local a6 = a3 and Clamp(1 + a5 / math.max(m.standardSkillMana, 1) * m.skillManaEfficiency, 0.95, 1.25) or 1
	local a7 = self:GetPropertyValue(E, "spell_damage_proc") + self:GetPropertyValue(E, "spell_damage_proc_target")
	local a8 = CompoundIncrease(
		self:GetPropertyValue(E, "spell_damage_boost"),
		self:GetPropertyValue(E, "spell_damage_amplify")
	)
	local a9 = (
		CompoundIncrease(
			self:GetPropertyValue(E, "skill_damage_boost"),
			self:GetPropertyValue(E, "skill_damage_amplify")
		)
		+ CompoundIncrease(
			self:GetPropertyValue(E, "dodge_damage_boost"),
			self:GetPropertyValue(E, "dodge_damage_amplify")
		)
		+ CompoundIncrease(
			self:GetPropertyValue(E, "defense_damage_boost"),
			self:GetPropertyValue(E, "defense_damage_amplify")
		)
		+ CompoundIncrease(
			self:GetPropertyValue(E, "ultimate_damage_boost"),
			self:GetPropertyValue(E, "ultimate_damage_amplify")
		)
	) * 0.25
	local aa = 1 + (a8 + a9) * 0.01
	local ab = Clamp(self:GetPropertyValue(E, "cooldown_reduction"), 0, m.cooldownReductionCap)
	local ac = 1 / math.max(1 - ab * 0.01, 0.05)
	local ad = (m.standardSkillDps * self:GetCritFactor(E, true) + a7) * aa * ac * a6
	local ae = self:GetPropertyValue(E, "defense_intensity")
		* (1 + self:GetPropertyValue(E, "defense_intensity_boost") * 0.01)
	local af = m.defenseIntensityBase
	local ag = (af + ae)
			* (1 + self:GetPropertyValue(E, "hero_defense_boost") * 0.01)
			* (1 + self:GetPropertyValue(E, "final_defense") * 0.01)
		- af
	local ah = (self:GetPropertyValue(E, "base_health") + self:GetPropertyValue(E, "health"))
		* (1 + self:GetPropertyValue(E, "health_amplify") * 0.01)
		* (1 + ag * INTENSITY_FACTOR * 0.01)
	local ai = math.max(
		1 + (self:GetPropertyValue(E, "incoming_damage_amplify") - self:GetPropertyValue(E, "damage_reduction")) * 0.01,
		0.05
	)
	local aj = Clamp(self:GetPropertyValue(E, "evasion") * 0.01, 0, m.evasionCap)
	local ak = ah * 1 / ai * 1 / math.max(1 - aj, 0.05) + (self:GetPropertyValue(E, "min_health") > 0 and 100 or 0)
	local al = self:SumProperties(E, n) + self:GetPropertyValue(E, "block") + self:GetPropertyValue(E, "avoid_damage")
	local am = (_ * m.attackCombatPowerPerDps + ad * m.skillCombatPowerPerDps) * X
	local an = ak * m.ehpCombatPowerPerPoint
	local ao = al * m.utilityCombatPowerPerPoint
	local ap = math.max(0, am)
	local aq = math.max(0, an)
	local ar = m.balancedCombatPowerScale * math.sqrt(ap) * math.sqrt(aq)
	local as = math.floor(math.max(0, ar + ao))
	local at = self:GetPrivilegeCombatPowerFactor(N)
	local au = math.floor(math.max(0, as * (1 + at)))
	local av = math.floor(math.max(0, am + an + ao))
	local aw = math.floor(math.max(0, av * (1 + at)))
	return {
		combatPower = au,
		legacyCombatPower = aw,
		offenseScore = ap,
		defenseScore = aq,
		privilegeFactor = at,
		attackDps = _,
		skillDps = ad,
		sharedDamageFactor = X,
		ehp = ak,
		utilityScore = al,
	}
end
function o.prototype.CreateCombatSnapshotWithSkillRunes(self, N, ax)
	local E = f({}, N.attributes or {})
	for s, ay in ipairs(g(ax)) do
		local az = ay.data
		local aA = az and az.hero_skill_rune
		for s, aB in ipairs(e(aA and aA.attributes or {})) do
			do
				local H = toFiniteNumber(ay.data.hero_skill_rune.attributes[aB], 0)
				if H == 0 then
					goto aC
				end
				local aD = E[aB]
				E[aB] = aD == nil and H or PropertySystem:AggregatePropertyValues(aB, aD, H)
			end
			::aC::
		end
	end
	return f({}, N, { attributes = E })
end
function o.prototype.GetCombatPowerFromSnapshot(self, N, ax)
	if ax == nil then
		ax = {}
	end
	return self:GetCombatPowerFromResolved(self:CreateCombatSnapshotWithSkillRunes(N, ax))
end
o = h({ l }, o)
if CombatPower == nil then
	CombatPower = i(o)
end
return j