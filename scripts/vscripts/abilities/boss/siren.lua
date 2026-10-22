--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/boss/siren"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("lib.dota_ts_adapter")
local h = g.registerAbility
local i = require("modifiers.eom_modifier.eom_modifier")
local j = i.EOMModifier
local k = i.EOMModifierMotionHorizontal
local l = i.registerEOMModifier
local m = require("abilities.bt_ability_ai")
local n = m.EOMBTAbilityAI
local o = require("abilities.eom_ability")
local p = o.registerEOMAbility
local q = c()
q.name = "siren_1"
d(q, n)
function q.prototype.GetLinearStartWidth(self)
	return self:GetSpecialValueFor("width")
end
function q.prototype.OnAbilityPhaseStart(self)
	local r = self:GetCaster()
	local s = self:GetCursorPosition()
	local t = self:GetCastRange(vec3_zero, nil)
	local u = CalcDirection2D(s, r)
	local v = r:GetAbsOrigin()
	local w = v + u * t
	self:CreateLinerWarningParticle(v, w)
	return true
end
function q.prototype.OnAbilityPhaseInterrupted(self)
	self:DestroyWarningParticle(true)
end
function q.prototype.OnSpellStart(self)
	self:DestroyWarningParticle()
	local r = self:GetCaster()
	local s = self:GetCursorPosition()
	local u = CalcDirection2D(s, r)
	local t = self:GetCastRange(vec3_zero, nil)
	local x = self:GetSpecialValueFor("speed")
	local y = self:GetSpecialValueFor("width")
	local z = self:GetSpecialValueFor("damage")
	local v = r:GetAbsOrigin() + u * 100
	Bullet:CreateLinearBullet({
		caster = r,
		direction = u,
		distance = t,
		moveSpeed = x,
		radius = y,
		ability = self,
		spawnOrigin = v,
		reflectable = true,
		ParticleCreator = function(A)
			local B = ParticleManager:CreateParticle(
				"particles/abilities/libra_1_base_attack_fx.vpcf",
				PATTACH_CUSTOMORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(B, 0, v)
			ParticleManager:SetParticleControl(B, 1, v + u * t)
			ParticleManager:SetParticleControl(B, 2, Vector(x, 0, 0))
			return B
		end,
		OnBulletHit = function(C, s, A)
			r:DealDamage(C, self, z, EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL)
		end,
	})
	Bullet:CreateLinearBullet({
		caster = r,
		direction = u,
		distance = t,
		moveSpeed = x,
		radius = y,
		ability = self,
		reflectable = true,
		spawnOrigin = r:GetAttachmentPosition("attach_hitloc"),
		ParticleCreator = function(A)
			local B = ParticleManager:CreateParticle(
				"particles/abilities/libra_1_base_attack_magic_fx.vpcf",
				PATTACH_CUSTOMORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(B, 0, v)
			ParticleManager:SetParticleControl(B, 1, v + u * t)
			ParticleManager:SetParticleControl(B, 2, Vector(x, 0, 0))
			return B
		end,
		OnBulletHit = function(C, s, A)
			r:DealDamage(C, self, z, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)
		end,
	})
	r:EmitSound("Hero_MonkeyKing.Spring.Water")
	Event:Fire("ability_end", { caster = r, ability = self })
end
q = e({ p(nil) }, q)
local D = c()
D.name = "siren_2"
d(D, n)
function D.prototype.OnSpellStart(self)
	local r = self:GetCaster()
	r:AddNewModifier(r, self, "modifier_siren_2", nil)
	ParticleManager:CreateParticle(
		"particles/units/heroes/hero_siren/naga_siren_siren_song_end.vpcf",
		PATTACH_ABSORIGIN,
		r
	)
end
D = e({ p(nil) }, D)
local E = c()
E.name = "modifier_siren_2"
d(E, j)
function E.prototype.GetAbilitySpecialValue(self)
	self.distance = self:GetAbilitySpecialValueFor("distance")
	self.width = self:GetAbilitySpecialValueFor("width")
	self["repeat"] = self:GetAbilitySpecialValueFor("repeat")
	self.interval = self:GetAbilitySpecialValueFor("interval")
	self.castPoint = self:GetAbilitySpecialValueFor("cast_point")
	self.motionDuration = self:GetAbilitySpecialValueFor("motion_duration")
end
function E.prototype.OnCreated(self, F)
	if IsServer() then
		self:StartIntervalThink(self.interval)
		self:OnIntervalThink()
	else
		local B = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_siren/naga_siren_song_debuff.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			B,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(B, false, false, -1, false, false)
	end
end
function E.prototype.OnIntervalThink(self)
	if RollPercentage(50) then
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_3, 0.5)
	else
		self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, 0.5)
	end
	local v = self.parent:GetAbsOrigin()
	local G = FindEnemiesInRadius(self.parent, v, 2000)
	self.direction = IsValid(G[1]) and CalcDirection2D(G[1], v) or RandomVector(1)
	local H = VectorToAngles(self.direction)
	self.parent:SetLocalAngles(H.x, H.y, H.z)
	local B = ParticleManager:CreateParticle("particles/warning/linear.vpcf", PATTACH_CUSTOMORIGIN, nil)
	ParticleManager:SetParticleControl(B, 0, v)
	ParticleManager:SetParticleControl(B, 1, v + self.direction * self.distance)
	ParticleManager:SetParticleControl(B, 2, Vector(self.width, self.castPoint, 0))
	self.warnPid = B
	self:StartThink(self.castPoint)
end
function E.prototype.OnThink(self, I)
	if self.warnPid ~= nil then
		ParticleManager:DestroyParticle(self.warnPid, true)
		ParticleManager:ReleaseParticleIndex(self.warnPid)
	end
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_siren_2_motion",
		{ direction = VectorToString(self.direction), speed = self.distance / self.motionDuration, duration = self.motionDuration }
	)
	self.parent:EmitSound("Ability.GushImpact")
	self:IncrementStackCount()
	if self:GetStackCount() >= self["repeat"] then
		self:SetDuration(self.motionDuration, true)
	end
	return -1
end
function E.prototype.CheckState(self)
	return { [MODIFIER_STATE_ROOTED] = true, [MODIFIER_STATE_DISARMED] = true, [MODIFIER_STATE_SILENCED] = true }
end
function E.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_DISABLE_TURNING }
end
function E.prototype.GetModifierDisableTurning(self)
	return 1
end
function E.prototype.OnDestroy(self)
	if IsServer() then
		if self.warnPid ~= nil then
			ParticleManager:DestroyParticle(self.warnPid, true)
			ParticleManager:ReleaseParticleIndex(self.warnPid)
		end
	end
end
E = e(
	{
		l(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				IsStunDebuff = false,
				AllowIllusionDuplicate = false,
			}
		),
	},
	E
)
local J = c()
J.name = "modifier_siren_2_motion"
d(J, k)
function J.prototype.GetAbilitySpecialValue(self)
	self.width = self:GetAbilitySpecialValueFor("width")
	self.damage = self:GetAbilitySpecialValueFor("damage")
end
function J.prototype.OnCreated(self, F)
	if IsServer() then
		local K = self:GetParent()
		self.speed = F.speed
		self.direction = StringToVector(F.direction)
		self:ApplyHorizontalMotionController()
		self.bulletID = Bullet:CreateLinearBullet({
			caster = K,
			direction = self.direction,
			distance = self.speed * self:GetDuration(),
			moveSpeed = self.speed,
			radius = self.width,
			ability = self.ability,
			spawnOrigin = K:GetAbsOrigin(),
			effectName = "particles/units/heroes/hero_tidehunter/tidehunter_gush_upgrade.vpcf",
			OnBulletHit = function(C, s, A)
				if IsValid(K) then
					K:DealDamage(C, self:GetAbility(), self.damage, EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL)
				end
			end,
		})
	end
end
function J.prototype.OnDestroy(self)
	if IsServer() then
		self:GetParent():RemoveHorizontalMotionController(self)
		if self.bulletID ~= nil then
			Bullet:DestroyBulletByID(self.bulletID)
		end
		Event:Fire("ability_end", { caster = self:GetParent(), ability = self:GetAbility() })
	end
end
function J.prototype.UpdateHorizontalMotion(self, K, L)
	if not IsServer() or not IsValid(K) then
		return
	end
	local M = K:GetAbsOrigin() + self.direction * self.speed * L
	if not GridNav:IsTraversable(M) or GridNav:IsBlocked(M) then
		self:Destroy()
		return
	end
	K:SetAbsOrigin(M)
end
function J.prototype.OnHorizontalMotionInterrupted(self)
	if not IsServer() then
		return
	end
	self:Destroy()
end
J = e(
	{
		l(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				IsStunDebuff = false,
				AllowIllusionDuplicate = false,
			}
		),
	},
	J
)
local N = c()
N.name = "siren_3"
d(N, n)
function N.prototype.OnChannelFinish(self, O)
	local r = self:GetCaster()
	r:RemoveModifierByName("modifier_siren_3")
end
function N.prototype.OnSpellStart(self)
	local r = self:GetCaster()
	r:AddNewModifier(r, self, "modifier_siren_3", { duration = self:GetSpecialValueFor("duration") })
end
N = e({ h(nil) }, N)
local P = c()
P.name = "modifier_siren_3"
d(P, j)
function P.prototype.OnCreated(self, F)
	if IsServer() then
		local Q = self:GetAbilitySpecialValueFor("interval")
		self:StartIntervalThink(Q)
		self:OnIntervalThink()
	end
end
function P.prototype.OnIntervalThink(self)
	local K = self:GetParent()
	local R = self:GetAbility()
	if not IsValid(R) then
		return
	end
	local x = self:GetAbilitySpecialValueFor("speed")
	local z = self:GetAbilitySpecialValueFor("damage")
	local y = self:GetAbilitySpecialValueFor("width")
	local S = self:GetAbilitySpecialValueFor("radius")
	local t = self:GetAbilitySpecialValueFor("distance")
	local T = self:GetAbilitySpecialValueFor("warn_time")
	local U = t / 2
	local V = self:GetAbilitySpecialValueFor("count")
	local W = RandomInt(1, V - 2)
	local u = RandomVector(1)
	local X = K:GetAbsOrigin() + u * U
	local Y = RotatePosition(vec3_zero, QAngle(0, 90, 0), u)
	local v = X - Y * (y * V * 0.5 - y * 0.5)
	do
		local Z = 0
		while Z < V do
			if Z ~= W then
				local _ = v + Z * y * Y
				local B = ParticleManager:CreateParticle("particles/warning/linear.vpcf", PATTACH_CUSTOMORIGIN, nil)
				ParticleManager:SetParticleControl(B, 0, _)
				ParticleManager:SetParticleControl(B, 1, _ - u * t)
				ParticleManager:SetParticleControl(B, 2, Vector(S, T, 0))
				K:GameTimer(T, function()
					ParticleManager:DestroyParticle(B, true)
					ParticleManager:ReleaseParticleIndex(B)
					if not IsValid(K) then
						return
					end
					Bullet:CreateLinearBullet({
						caster = K,
						direction = -u,
						distance = t,
						moveSpeed = x,
						radius = S,
						ability = R,
						ignoreBlock = true,
						spawnOrigin = _,
						effectName = "particles/units/heroes/hero_kunkka/kunkka_shard_tidal_wave.vpcf",
						OnBulletHit = function(C, s, A)
							if IsValid(K) and IsValid(R) then
								K:DealDamage(C, R, z, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)
							end
						end,
					})
				end)
			end
			Z = Z + 1
		end
	end
end
function P.prototype.CheckState(self)
	return { [MODIFIER_STATE_ROOTED] = true, [MODIFIER_STATE_DISARMED] = true }
end
function P.prototype.OnDestroy(self)
	if IsServer() then
		Event:Fire("ability_end", { caster = self:GetParent(), ability = self:GetAbility() })
	end
end
P = e(
	{
		l(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				IsStunDebuff = false,
				AllowIllusionDuplicate = false,
			}
		),
	},
	P
)
return f