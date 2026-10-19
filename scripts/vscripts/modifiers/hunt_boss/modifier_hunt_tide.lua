--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "modifiers/hunt_boss/modifier_hunt_tide"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__StringSplit
local f = b.__TS__ArrayFilter
local g = b.__TS__ArrayMap
local h = b.__TS__ArrayIncludes
local i = b.__TS__DecorateLegacy
local j = {}
local k = require("modifiers.eom_modifier.eom_modifier")
local l = k.EOMModifier
local m = k.registerEOMModifier
local n = "particles/warning/linear.vpcf"
local o = "particles/units/heroes/hero_kunkka/kunkka_shard_tidal_wave.vpcf"
local p = c()
p.name = "modifier_hunt_tide"
d(p, l)
function p.prototype.____constructor(self, ...)
	l.prototype.____constructor(self, ...)
	self.lanes = {}
	self.gapIndices = {}
	self.spacing = 0
	self.radius = 0
	self.distance = 0
	self.speed = 0
	self.actualSpeed = 0
	self.remaining = 0
	self.damagePct = 0
	self.heroIndices = {}
	self.generation = 0
	self.phase = "warning"
	self.active = false
	self.ended = false
	self.warnings = {}
	self.bullets = {}
	self.hitHeroes = {}
end
function p.prototype.OnCreated(self, q)
	if not IsServer() then
		return
	end
	self.direction = RandomVector(1)
	self.spacing = q.lane_width
	self.radius = q.wave_radius
	self.speed = q.speed
	self.remaining = q.warning_time
	self.damagePct = q.damage_pct
	self.heroIndices = g(
		f(e(q.hero_entindices, ","), function(r, s)
			return s ~= ""
		end),
		function(r, s)
			return toFiniteNumber(s, -1)
		end
	)
	local t = self:GetParent():GetAbsOrigin()
	local u = self.direction
	local v = math.abs(u.x) * q.field_half_width + math.abs(u.y) * q.field_half_height
	local w = math.abs(u.y) * q.field_half_width + math.abs(u.x) * q.field_half_height
	self.distance = math.max(q.distance, 2 * (v + self.radius))
	local x = math.max(q.lane_count, math.ceil(2 * w / self.spacing) + 1)
	do
		local s = 0
		while s < x do
			local y = (s - (x - 1) / 2) * self.spacing
			local z = t + Vector(-u.y * y, u.x * y, 0)
			local A = self.lanes
			A[#A + 1] = {
				start = z + Vector(-u.x * self.distance / 2, -u.y * self.distance / 2, 0),
				["end"] = z + Vector(u.x * self.distance / 2, u.y * self.distance / 2, 0),
			}
			s = s + 1
		end
	end
	local B = f(
		g(self.lanes, function(r, C, s)
			return s
		end),
		function(r, s)
			return s > 0 and s < x - 1
		end
	)
	local D = GetRandomElement(B)
	local E = GetRandomElement(f(B, function(r, s)
		return math.abs(s - D) > 1
	end))
	self.gapIndices = { D, E }
	self:SetStackCount(1)
	self.active = true
	self:ShowWaves()
	self:StartIntervalThink(0.1)
end
function p.prototype.OnRefresh(self, q)
	if not IsServer() or self.ended then
		return
	end
	self.heroIndices = g(
		f(e(q.hero_entindices, ","), function(r, s)
			return s ~= ""
		end),
		function(r, s)
			return toFiniteNumber(s, -1)
		end
	)
end
function p.prototype.OnStackCountChanged(self)
	if not IsServer() or self.ended then
		return
	end
	self.active = self:GetStackCount() > 0
	if not self.active then
		self:ClearWarnings()
		self:StopBullets()
	end
end
function p.prototype.OnIntervalThink(self)
	if not IsServer() or self.ended or self:GetStackCount() == 0 then
		return
	end
	self.remaining = math.max(0, self.remaining - 0.1)
	if self.phase == "warning" and self.remaining <= 0.0001 then
		self:ClearWarnings()
		self.phase = "wave"
		self.actualSpeed = self.speed * math.max(0.01, Bullet.slowFactor)
		self.remaining = self.distance / self.actualSpeed
	end
	if self.phase == "wave" and self.remaining <= 0.0001 then
		self:Destroy()
		return
	end
	self:ShowWaves()
end
function p.prototype.ShowWaves(self)
	if self.phase == "warning" then
		if #self.warnings > 0 then
			return
		end
		do
			local s = 0
			while s < #self.lanes do
				do
					if h(self.gapIndices, s) then
						goto F
					end
					local G = self.lanes[s + 1]
					local H = ParticleManager:CreateParticle(n, PATTACH_WORLDORIGIN, self:GetParent())
					ParticleManager:SetParticleControl(H, 0, G.start)
					ParticleManager:SetParticleControl(H, 1, G["end"])
					ParticleManager:SetParticleControl(H, 2, Vector(self.radius, self.remaining, 0))
					local I = self.warnings
					I[#I + 1] = H
				end
				::F::
				s = s + 1
			end
		end
		return
	end
	if #self.bullets > 0 then
		return
	end
	local J = self.generation
	local u = self.direction
	local K = math.min(self.distance, self.remaining * self.actualSpeed)
	do
		local s = 0
		while s < #self.lanes do
			do
				if h(self.gapIndices, s) then
					goto L
				end
				local G = self.lanes[s + 1]
				local M = G["end"] + Vector(-u.x * K, -u.y * K, 0)
				local N = Bullet:CreateLinearBullet({
					caster = self:GetParent(),
					spawnOrigin = M,
					direction = u,
					distance = K,
					moveSpeed = self.actualSpeed / math.max(0.01, Bullet.slowFactor),
					radius = self.radius,
					ignoreBlock = true,
					effectName = o,
					teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
					typeFilter = DOTA_UNIT_TARGET_HERO,
					OnBulletHit = function(O)
						if
							self.ended
							or not self.active
							or J ~= self.generation
							or not IsValid(O)
							or not O:IsAlive()
							or not h(self.heroIndices, O:entindex())
							or self.hitHeroes[O:entindex()]
						then
							return
						end
						self.hitHeroes[O:entindex()] = true
						self:GetParent():DealDamage(
							O,
							nil,
							O:GetMaxHealth() * self.damagePct * 0.01,
							EOM_DAMAGE_TYPES.DAMAGE_TYPE_PURE,
							EOM_DAMAGE_FLAGS.NO_CRIT
								+ EOM_DAMAGE_FLAGS.NO_DAMAGE_AMPLIFY
								+ EOM_DAMAGE_FLAGS.NO_MANA_REGEN
								+ EOM_DAMAGE_FLAGS.NO_INCOMING_AMPLIFY
								+ EOM_DAMAGE_FLAGS.NO_INCOMING_ADJUST
						)
					end,
				})
				if N ~= nil then
					local P = self.bullets
					P[#P + 1] = N
				end
			end
			::L::
			s = s + 1
		end
	end
end
function p.prototype.OnDestroy(self)
	if not IsServer() or self.ended then
		return
	end
	self.ended = true
	self:ClearWarnings()
	self:StopBullets()
	self.active = false
	self.heroIndices = {}
	local Q = self:GetParent()
	if IsValid(Q) then
		Timer:Timer(0, function()
			if IsValid(Q) then
				UTIL_Remove(Q)
			end
		end)
	end
end
function p.prototype.ClearWarnings(self)
	for r, H in ipairs(self.warnings) do
		ParticleManager:DestroyParticle(H, true)
		ParticleManager:ReleaseParticleIndex(H)
	end
	self.warnings = {}
end
function p.prototype.StopBullets(self)
	self.generation = self.generation + 1
	local R = self.bullets
	self.bullets = {}
	for r, N in ipairs(R) do
		Bullet:DestroyBulletByID(N)
	end
end
function p.prototype.CheckState(self)
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end
p = i(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	p
)
return j