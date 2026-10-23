--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/vexis/vexis_3"
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
n.name = "vexis_3"
d(n, k)
function n.prototype.____constructor(self, ...)
	k.prototype.____constructor(self, ...)
	self.ballCount = 0
	self.spearCount = 0
end
function n.prototype.GetCastCooldown(self)
	return self:GetSpecialValueFor("duration")
end
function n.prototype.GetCooldown(self, o)
	return math.max(k.prototype.GetCooldown(self, o) - self:GetSpecialValueFor("cooldown_reduction"), 0)
end
function n.prototype.StaticProperty(self)
	return { [PropertyFunction.ABILITY_CHARGE_DEFENSE] = self:GetSpecialValueFor("charge") }
end
function n.prototype.OnCreated(self)
	self:StartThink(0.15, function()
		if self.ballCount > 0 then
			local p = self:GetCaster()
			local q = FindEnemiesInRadius(p, p:GetAbsOrigin(), 900)
			local r = GetRandomElement(q)
			if IsValid(r) and r:IsAlive() then
				p:ThrowSnowball(r, self, self:GetSpecialValueFor("snow_frozen"), self:GetSpecialValueFor("snow_damage"))
				self.ballCount = self.ballCount - 1
			end
		end
		if self.spearCount > 0 then
			local p = self:GetCaster()
			local q = FindEnemiesInRadius(p, p:GetAbsOrigin(), 900)
			local r = GetRandomElement(q)
			if IsValid(r) and r:IsAlive() then
				p:ThrowBloodSpear(r, self, self:GetSpecialValueFor("bleed_damage"))
				self.spearCount = self.spearCount - 1
			end
		end
	end)
end
function n.prototype.OnSpellStart(self)
	local p = self:GetCaster()
	local s = 12
	local t = self:GetSpecialValueFor("count")
	local u = self:GetSpecialValueFor("duration")
	local v = self:GetSpecialValueFor("distance")
	self.ballCount = self:GetSpecialValueFor("snow_count")
	self.spearCount = self:GetSpecialValueFor("bleed_count")
	local w = u / s
	local x = p:HasAbilityUpgrade("vexis_upgrade_30")
	local y = p:GetAbilityByTag(AbilityTag.Attack)
	local z = y.wisp
	local A = IsValid(z)
	local q = FindEnemiesInRadius(p, p:GetAbsOrigin(), v)
	local B = vec3_top
	p:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	Bullet:SplitAction(-p:GetForwardVector(), t, 360 / (s - 1), function(C, D, E)
		self:StartThink(w * E, DoUniqueString("vexis_3"), function()
			local F = E + 1 > s and "models/eom/hero/shooter_1/particles/shooter_1_defense_01_fx.vpcf"
				or "models/eom/hero/shooter_1/particles/shooter_1_defense_fx.vpcf"
			self:FireBullet(p:GetAttachmentPosition("attach_hitloc"), F, D)
			if p:HasAbilityUpgrade("vexis_upgrade_30") then
				if A then
					if IsValid(q[1]) then
						B = CalcDirection2D(q[1], z)
						z:SetLocalAngles(0, VectorToAngles(B).y, 0)
					else
						B = z:GetForwardVector()
					end
					self:FireBullet(z:GetAttachmentPosition("attach_attack1") + Vector(0, 0, 75), F, B)
				end
			end
			t = t - 1
			if t <= 0 then
				p:RemoveModifierByName("modifier_vexis_3")
			end
			return -1
		end)
	end)
	p:AddNewModifier(p, self, "modifier_vexis_3", {})
	if AbilityUpgrade:HasAbilityUpgrade(p, "vexis_upgrade_7") then
		local y = p:GetAbilityByTag(AbilityTag.Dodge)
		if IsValid(y) then
			y:EndCooldown()
			y:RestoreCharges()
		end
	end
end
function n.prototype.FireBullet(self, G, F, H)
	local p = self:GetCaster()
	local I = self:GetSpecialValueFor("bounce_count")
	local v = self:GetSpecialValueFor("distance")
	local J = self:GetSpecialValueFor("damage")
	local K = self:GetSpecialValueFor("bullet_knockback_distance")
	local L = p:GetProjectileSpeed()
	Bullet:CreateGuidedBullet({
		caster = p,
		effectName = F,
		spawnOrigin = G,
		direction = H,
		lifeTime = v / L,
		moveSpeed = L,
		radius = 64,
		bounce = I,
		teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
		typeFilter = UNIT_AND_BUILDING,
		flagFilter = DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE,
		OnBulletHit = function(r, M, N)
			if IsValid(p) then
				p:DealDamage(r, self, J)
				if K > 0 then
					r:KnockBack(N and N.direction or vec3_bottom, K, 0, 0.1)
				end
			end
		end,
		OnBulletThink = function(M, N)
			if p:HasAbilityUpgrade("vexis_upgrade_8") then
				local O = Bullet:GetBulletInRadius(N.__position, BULLET_WIDTH * 2)
				for P, Q in ipairs(O) do
					if IsValid(Q.caster) and not Q.caster:IsFriendly(p) then
						Bullet:DestroyBulletByID(Q.__projIndex)
					end
				end
			end
		end,
	})
	p:EmitSound("Hero_Sniper.attack")
end
function n.prototype.EventListener(self)
	return {
		ability_cast_complete = function(C, R)
			if
				R.caster == self:GetCaster()
				and R.abilityTag == AbilityTag.Skill
				and R.caster:HasAbilityUpgrade("vexis_upgrade_26")
				and (R and R.record) ~= "vexis_upgrade_13"
			then
				self:OnSpellStart()
				Event:Fire(
					"ability_cast_complete",
					{ ability = self, caster = R.caster, position = self:GetCursorPosition(), abilityTag = self:GetAbilityTag() }
				)
			end
		end,
	}
end
n = e(
	{
		m(nil, {
			funcCondition = function(C, y)
				if Demo.force_dash_auto_cast then
					return Demo:CanForceDefenseAutoCast(y)
				end
				local S = y:GetAutoCastState()
				if S then
					local T = GameModeManager
					local U = GameModeManager.IsAutoCastCombatActive
					local V = y:GetCaster()
					S = U(T, V and V:GetPlayerOwnerID())
				end
				return S
			end,
		}),
	},
	n
)
local W = c()
W.name = "modifier_vexis_3"
d(W, h)
function W.prototype.GetAbilitySpecialValue(self)
	self.movespeed = self:GetAbilitySpecialValueFor("movespeed")
end
function W.prototype.CheckState(self)
	return { [MODIFIER_STATE_DISARMED] = true, [MODIFIER_STATE_NO_UNIT_COLLISION] = true }
end
function W.prototype.StaticProperty(self)
	return { [PropertyFunction.MOVESPEED_NOT_CALCULATED] = 1200, [PropertyFunction.AVOID_DAMAGE] = 1 }
end
function W.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true, [StateEnum.STUN_IMMUNE] = true, [StateEnum.KNOCKBACK_IMMUNE] = true }
end
W = e(
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
			}
		),
	},
	W
)
return f