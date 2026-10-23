--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/vexis/vexis_2"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("abilities.eom_ability")
local h = g.EOMAbility
local i = g.registerEOMAbility
local j = c()
j.name = "vexis_2"
d(j, h)
function j.prototype.OnCreated(self)
	local k = self:GetCaster()
	self:StartThink(0, function()
		if
			self:IsCooldownReady()
			and (
				Demo.force_dash_auto_cast
				or self:GetAutoCastState() and GameModeManager:IsAutoCastCombatActive(k:GetPlayerOwnerID())
			)
		then
			if Demo.force_dash_auto_cast and not Demo:CanForceDashAutoCast(k) then
				return
			end
			local l = Demo.force_dash_auto_cast and Demo:GetForceDashDirection(k, self)
				or Controller:GetInputDirection(k)
			if VectorIsZero(l) then
				l = k:GetForwardVector()
			end
			self:OnController(k:GetAbsOrigin() + l * self:GetSpecialValueFor("distance"), l)
			if Demo.force_dash_auto_cast then
				Demo:MarkForceDashAutoCast(k)
			end
		end
	end)
end
function j.prototype.OnController(self, m, l)
	local k = self:GetCaster()
	if m == nil then
		m = k:GetAbsOrigin() + l * self:GetSpecialValueFor("distance")
	end
	k:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, self, m)
end
function j.prototype.GetCastCooldown(self)
	return self:GetSpecialValueFor("distance") / self:GetSpecialValueFor("speed")
end
function j.prototype.GetCooldown(self, n)
	return math.max(h.prototype.GetCooldown(self, n) - self:GetSpecialValueFor("cooldown_reduction"), 0)
end
function j.prototype.StaticProperty(self)
	return { [PropertyFunction.ATTACKSPEED] = self:GetStackCount() * self:GetSpecialValueFor("attackspeed_bonus") }
end
function j.prototype.EventListener(self)
	return {
		dash_start = function(o, p)
			local k = self:GetCaster()
			if p.caster ~= k then
				return
			end
			local q = self:GetSpecialValueFor("dash_damage")
			if q > 0 then
				self.bulletID = Bullet:CreateCustomBullet({
					caster = k,
					spawnOrigin = k:GetAbsOrigin(),
					teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
					typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
					radius = self:GetSpecialValueFor("dash_width"),
					lifeTime = 2,
					PathFunction = function(m, r)
						return k:GetAbsOrigin()
					end,
					FuncUnitFinder = function(s, m, t, r)
						return FindUnitsInRadius(
							k:GetTeamNumber(),
							m,
							nil,
							t,
							DOTA_UNIT_TARGET_TEAM_ENEMY,
							DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
							DOTA_UNIT_TARGET_FLAG_NONE,
							FIND_ANY_ORDER,
							false
						)
					end,
					OnBulletHit = function(u, v, w)
						k:DealDamage(u, self, q, EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL)
					end,
				})
			end
			if k:HasAbilityUpgrade("vexis_upgrade_holy_1") then
				local x = LASER_LENGTH + GetBulletRange(k)
				local y = FindUnitsInRadiusWithAbility(k, k:GetAbsOrigin(), x, self)
				local u = GetRandomElement(y)
				local m = IsValid(u) and u:GetAbsOrigin() or k:GetAbsOrigin() + RandomVector(300)
				k:Laser(CalcDirection2D(m, k), self:GetSpecialValueFor("laser_damage"))
			end
		end,
		dash_end = function(o, p)
			local k = self:GetCaster()
			if k == p.caster then
				if AbilityUpgrade:HasAbilityUpgrade(k, "vexis_upgrade_13") then
					local z = k:GetAbilityByTag(AbilityTag.Skill)
					if IsValid(z) then
						z:PowerShot(k:GetAttachmentPosition("attach_attack3"), CalcDirection2D(p.start, p["end"]), 1)
						Event:Fire(
							"ability_cast_complete",
							{
								ability = z,
								caster = k,
								position = z:GetCursorPosition(),
								abilityTag = z:GetAbilityTag(),
								record = "vexis_upgrade_13",
							}
						)
					end
				end
				if k:HasAbilityUpgrade("vexis_upgrade_poison_1") then
					local A = 1
					do
						local B = 0
						while B < A do
							local C = 0.5 + B * 0.15
							local m = B == 0 and p.start or p.start + RandomVector(150)
							k:ThrowPoisonBottle(m, self, 2, C)
							B = B + 1
						end
					end
				end
				if self.bulletID ~= nil then
					Bullet:DestroyBulletByID(self.bulletID)
				end
				self:SetStackCount(1, false)
				self:StartThink(self:GetSpecialValueFor("attackspeed_duration"), "attackspeed_duration", function()
					self:SetStackCount(0, false)
					return -1
				end)
			end
		end,
	}
end
function j.prototype.OnSpellStart(self)
	local k = self:GetCaster()
	local m = self:GetCursorPosition()
	k:StartGesture(ACT_DOTA_CAST_ABILITY_3)
	local l = CalcDirection2D(m, k:GetAbsOrigin())
	k:SetForwardVector(l)
	local D = ParticleManager:CreateParticle(
		"models/eom/hero/shooter_1/particles/shooter_1_elude_fx.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		k
	)
	ParticleManager:SetParticleControlTransformForward(D, 1, k:GetAbsOrigin(), l)
	local x = math.min(self:GetSpecialValueFor("distance"), CalcDistance(m, k))
	local E = self:GetSpecialValueFor("speed")
	local C = x / E
	local F = 0
	k:Dash(l, x, F, C)
	k:EmitSound("Hero_QueenOfPain.Blink_in.Layer")
end
j = e({ i(nil) }, j)
return f