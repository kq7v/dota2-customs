--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/vexis/vexis_4"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("modifiers.eom_modifier.eom_modifier")
local h = g.EOMModifier
local i = g.registerEOMModifier
local j = require("abilities.ability_ai")
local k = j.EOMAbilityAI
local l = require("abilities.eom_ability")
local m = l.registerEOMAbility
local n = c()
n.name = "vexis_4"
d(n, k)
function n.prototype.____constructor(self, ...)
	k.prototype.____constructor(self, ...)
	self.useHealth = false
end
function n.prototype.GetAICastRange(self)
	return self:GetSpecialValueFor("distance")
end
function n.prototype.GetCastCooldown(self)
	return 1
end
function n.prototype.OnAbilityPhaseStart(self)
	local o = self:GetCaster()
	if o:HasAbilityUpgrade("vexis_upgrade_21") and o:GetMana() < self:GetRealManaCost(self:GetLevel()) then
		self.useHealth = true
	end
	return true
end
function n.prototype.OnSpellStart(self)
	local o = self:GetCaster()
	if self.useHealth then
		self.useHealth = false
		local p = o:GetMana()
		local q = self:GetRealManaCost(self:GetLevel())
		local r = q - p
		local s = self:GetSpecialValueFor("health_cost") * r / self:GetSpecialValueFor("instead_fury")
		o:SetMana(0)
		o:Heal(-s, self)
	end
	local t = self:GetSupportCastPoint()
	local u = CalcDirection2D(t, o:GetAbsOrigin())
	local v = self:GetSpecialValueFor("effect_reduce")
	local w = self:GetSpecialValueFor("duration") * (1 - 0.01 * v)
	o:AddNewModifier(o, self, "modifier_vexis_4_buff", { direction = VectorToString(u), duration = w })
end
function n.prototype.AddStack(self, x)
	self:IncrementStackCount()
	local y = self:GetSpecialValueFor("attackspeed_duration")
	self:StartThink(y, x, function()
		self:SetStackCount(0)
		return -1
	end)
end
function n.prototype.StaticProperty(self)
	return { [PropertyFunction.ATTACKSPEED] = self:GetSpecialValueFor("attackspeed_per_hit") * self:GetStackCount() }
end
function n.prototype.GetRealManaCost(self, z)
	return (
		k.prototype.GetManaCost(self, z)
		- GetUltimateManaCostReduce(self:GetCaster())
		- self:GetSpecialValueFor("mana_reduce")
	) * (1 - 0.01 * self:GetSpecialValueFor("effect_reduce"))
end
function n.prototype.GetManaCost(self, z)
	local o = self:GetCaster()
	local q = self:GetRealManaCost(z)
	if
		o:HasAbilityUpgrade("vexis_upgrade_21")
		and o:GetMana() < q
		and o:GetHealth() >= self:GetSpecialValueFor("health_cost")
	then
		return 0
	end
	return q
end
function n.prototype.GetCooldown(self, z)
	return math.max(
		(k.prototype.GetCooldown(self, z) - self:GetSpecialValueFor("cooldown_reduction"))
			* (1 - 0.01 * self:GetSpecialValueFor("effect_reduce")),
		0
	)
end
n = e({ m(nil, {
	funcCondition = function(A, B)
		return B:GetAutoCastState()
	end,
}) }, n)
local C = c()
C.name = "modifier_vexis_4_buff"
d(C, h)
function C.prototype.____constructor(self, ...)
	h.prototype.____constructor(self, ...)
	self.attackBoolean = true
	self.hasUpgrade20 = false
	self.bulletStartTime = 0
	self.bulletsFired = 0
	self.bulletInterval = 0
	self.furyMode = false
	self.furyStartTime = 0
	self.furyTicksConsumed = 0
	self.movespeed_reduce_pct = 0
end
function C.prototype.GetAbilitySpecialValue(self)
	self.damage = self:GetAbilitySpecialValueFor("damage")
	self.damage_pct = self:GetAbilitySpecialValueFor("damage_pct")
	self.bounce_count = self:GetAbilitySpecialValueFor("bounce_count")
	self.distance = self:GetAbilitySpecialValueFor("distance")
	self.effect_reduce = self:GetAbilitySpecialValueFor("effect_reduce")
	self.bullet_per_attackspeed = self:GetAbilitySpecialValueFor("bullet_per_attackspeed")
	self.count = self:GetAbilitySpecialValueFor("count")
	self.angle_offset = self:GetAbilitySpecialValueFor("angle_offset")
	self.bullet_per_fury = self:GetAbilitySpecialValueFor("bullet_per_fury")
	self.splitCount = self:GetAbilitySpecialValueFor("split_count")
	self.bonusDamage = self:GetAbilitySpecialValueFor("bonus_damage")
	self.movespeed_reduce_pct = self:GetAbilitySpecialValueFor("movespeed_reduce_pct")
	local D = math.max(1 - 0.01 * self.effect_reduce, 0)
	self.count = math.max(math.floor(self.count * D), 1)
	self.hasUpgrade20 = self:GetParent():HasAbilityUpgrade("vexis_upgrade_20")
	if self.hasUpgrade20 then
		self.count = self.count * 2
	end
	if self.bullet_per_attackspeed > 0 then
		self.count = self.count + GetAttackspeed(self:GetParent()) / self.bullet_per_attackspeed
	end
end
function C.prototype.OnCreated(self, E)
	if IsServer() then
		self.duration = E.duration
		self.direction = StringToVector(E.direction):Normalized()
		self.yaw = VectorToAngles(self.direction).y
		self.bulletStartTime = GameRules:GetGameTime()
		self.bulletsFired = 0
		self.bulletInterval = self.duration / self.count
		self:StartThink(FrameTime(), function()
			if not self.furyMode then
				local F = GameRules:GetGameTime() - self.bulletStartTime
				local G = math.min(math.floor(F / self.bulletInterval), self.count)
				local H = G - self.bulletsFired
				do
					local I = 0
					while I < H do
						self:FireBullet()
						self.bulletsFired = self.bulletsFired + 1
						I = I + 1
					end
				end
				if self.bulletsFired >= self.count then
					if self.bullet_per_fury > 0 then
						self.furyMode = true
						self.furyStartTime = GameRules:GetGameTime()
						self.furyTicksConsumed = 0
					else
						self:Destroy()
						return -1
					end
				end
			else
				local F = GameRules:GetGameTime() - self.bulletStartTime
				local G = math.floor(F / self.bulletInterval)
				local H = G - self.bulletsFired
				do
					local I = 0
					while I < H do
						self:FireBullet()
						self.bulletsFired = self.bulletsFired + 1
						I = I + 1
					end
				end
				local J = GameRules:GetGameTime() - self.furyStartTime
				local K = math.floor(J / 0.1)
				local L = K - self.furyTicksConsumed
				local M = self:GetParent()
				do
					local I = 0
					while I < L do
						if M:GetMana() >= self.bullet_per_fury then
							M:SetMana(M:GetMana() - self.bullet_per_fury)
							self.furyTicksConsumed = self.furyTicksConsumed + 1
						else
							self:Destroy()
							return -1
						end
						I = I + 1
					end
				end
			end
		end)
	end
end
function C.prototype.FireBullet(self)
	local M = self:GetParent()
	local N = M:GetAttachmentPosition(self.attackBoolean and "attach_attack4" or "attach_attack5")
	local O = self.direction
	local P = FindEnemiesInRadius(M, M:GetAbsOrigin(), self.distance, FIND_CLOSEST)
	if IsValid(P[1]) then
		O = CalcDirection2D(P[1]:GetAbsOrigin(), N)
	end
	local Q = VectorToAngles(O).y
	self:CreateAttackLine(M, self:GetAbility(), O, N, self.splitCount)
	M:SetLocalAngles(0, Q, 0)
	M:EmitSound("Hero_Snapfire.ExplosiveShellsBuff.Attack")
	self.attackBoolean = not self.attackBoolean
end
function C.prototype.OnDestroy(self)
	if IsServer() then
		while self.bulletsFired < self.count do
			self:FireBullet()
			self.bulletsFired = self.bulletsFired + 1
		end
		local o = self:GetCaster()
		if IsValid(o) then
			if AbilityUpgrade:HasAbilityUpgrade(o, "vexis_upgrade_17") then
				local B = o:GetAbilityByTag(AbilityTag.Skill)
				if IsValid(B) then
					B:PowerShot(o:GetAttachmentPosition("attach_attack3"), self.direction, 1)
					Event:Fire(
						"ability_cast_complete",
						{ ability = B, caster = o, position = B:GetCursorPosition(), abilityTag = B:GetAbilityTag() }
					)
				end
			end
		end
	end
end
function C.prototype.DeclareFunctions(self)
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end
function C.prototype.GetActivityTranslationModifiers(self)
	return "walk"
end
function C.prototype.GetOverrideAnimation(self)
	return ACT_DOTA_CAST_ABILITY_5
end
function C.prototype.GetModifierDisableTurning(self)
	return 1
end
function C.prototype.StaticProperty(self)
	return { [PropertyFunction.MOVESPEED_AMPLIFY] = -self.movespeed_reduce_pct }
end
function C.prototype.CheckState(self)
	return { [MODIFIER_STATE_DISARMED] = true }
end
function C.prototype.CreateAttackLine(self, o, B, u, N, R)
	if R == nil then
		R = 0
	end
	local S = o:GetProjectileSpeed()
	local T = {
		caster = o,
		direction = u,
		effectName = "models/eom/hero/shooter_1/particles/shooter_1_unique_skill_fx.vpcf",
		spawnOrigin = N,
		moveSpeed = S,
		radius = BULLET_WIDTH,
		lifeTime = self.distance / S,
		bounce = self.bounce_count,
		teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
		typeFilter = UNIT_AND_BUILDING,
		flagFilter = DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE,
		OnBulletHit = function(U, t, V)
			local W = self.damage * (1 + self.damage_pct * 0.01)
			o:DealDamage(U, B, W)
			if AbilityUpgrade:HasAbilityUpgrade(o, "vexis_upgrade_6") then
				if B ~= nil then
					B:AddStack(DoUniqueString("vexis_upgrade_6"))
				end
			end
			if R > 0 then
				R = R - 1
				local P = FindEnemiesInRadius(o, t, 600, FIND_ANY_ORDER)
				ArrayRemove(P, U)
				if #P > 0 then
					self:CreateAttackTrack(o, B, t, P[1])
				end
			end
		end,
	}
	Bullet:CreateGuidedBullet(T)
end
function C.prototype.CreateAttackTrack(self, o, B, N, U)
	local X = o:GetProjectileSpeed()
	Bullet:CreateTrackingBullet({
		caster = o,
		ability = B,
		effectName = "models/eom/hero/shooter_1/particles/shooter_1_unique_skill_fx.vpcf",
		spawnOrigin = N,
		target = U,
		moveSpeed = X,
		OnBulletHit = function(U, t, V)
			o:DealDamage(U, B, self.damage * self.bonusDamage * 0.01)
		end,
	})
end
C = e(
	{
		i(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				IsStunDebuff = false,
				AllowIllusionDuplicate = false,
				GetAttributes = MODIFIER_ATTRIBUTE_MULTIPLE,
				DestroyOnExpire = false,
			}
		),
	},
	C
)
return f