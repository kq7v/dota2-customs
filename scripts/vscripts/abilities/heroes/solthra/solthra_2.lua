--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/solthra/solthra_2"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = {}
local g = require("modifiers.eom_modifier.eom_modifier")
local h = g.EOMModifier
local i = g.registerEOMModifier
local j = require("abilities.eom_ability")
local k = j.EOMAbility
local l = j.registerEOMAbility
local m = c()
m.name = "solthra_2"
d(m, k)
function m.prototype.OnCreated(self)
	local n = self:GetCaster()
	self:StartThink(0, function()
		if
			self:IsCooldownReady()
			and (
				Demo.force_dash_auto_cast
				or self:GetAutoCastState() and GameModeManager:IsAutoCastCombatActive(n:GetPlayerOwnerID())
			)
		then
			if Demo.force_dash_auto_cast and not Demo:CanForceDashAutoCast(n) then
				return
			end
			local o = Demo.force_dash_auto_cast and Demo:GetForceDashDirection(n, self)
				or Controller:GetInputDirection(n)
			if VectorIsZero(o) then
				o = n:GetForwardVector()
			end
			self:OnController(n:GetAbsOrigin() + o * self:GetSpecialValueFor("distance"), o)
			if Demo.force_dash_auto_cast then
				Demo:MarkForceDashAutoCast(n)
			end
		end
	end)
end
function m.prototype.OnController(self, p, o)
	local n = self:GetCaster()
	if p == nil then
		p = n:GetAbsOrigin() + o * self:GetSpecialValueFor("distance")
	end
	n:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, self, p)
end
function m.prototype.GetCooldown(self, q)
	return math.max(k.prototype.GetCooldown(self, q) - self:GetSpecialValueFor("cooldown_reduction"), 0)
end
function m.prototype.GetCastCooldown(self)
	return self:GetSpecialValueFor("distance") / self:GetSpecialValueFor("speed")
end
function m.prototype.StaticProperty(self)
	return {
		[PropertyFunction.ATTACKSPEED] = self:GetStackCount() * self:GetSpecialValueFor("attackspeed_bonus"),
		[PropertyFunction.ABILITY_CHARGE_DODGE] = self:GetSpecialValueFor("charge"),
	}
end
function m.prototype.EventListener(self)
	return {
		dash_end = function(r, s)
			local n = self:GetCaster()
			if s.caster == n and n:HasAbilityUpgrade("solthra_upgrade_8") then
				local t = self:GetSpecialValueFor("burn_path_duration")
				local u = self:GetSpecialValueFor("burn_path_damage")
				local v = CalcDistance(s.start, s["end"])
				local w = CalcDirection2D(s["end"], s.start)
				local x = math.floor(v / 128)
				do
					local y = 0
					while y <= x do
						local z = s.start + w * y * 128
						local A = s.start + w * math.min((y + 1) * 128, v)
						local B = ParticleManager:CreateParticle(
							"particles/units/heroes/hero_mars/mars_spear_burning_trail.vpcf",
							PATTACH_CUSTOMORIGIN,
							nil
						)
						ParticleManager:SetParticleControl(B, 0, z)
						ParticleManager:SetParticleControl(B, 1, A)
						ParticleManager:SetParticleControl(B, 2, Vector(t, 0, 0))
						ParticleManager:ReleaseParticleIndex(B)
						y = y + 1
					end
				end
				self:StartThink(0, DoUniqueString("solthra_upgrade_8"), function()
					if t > 0 then
						local C = FindEnemiesInLine(n, s.start, s["end"], 160)
						for y, D in ipairs(C) do
							n:Burning(D, self, u)
						end
						t = t - 0.1
						return 0.1
					end
					return -1
				end)
			end
		end,
	}
end
function m.prototype.OnSpellStart(self)
	local n = self:GetCaster()
	local p = self:GetCursorPosition()
	n:FadeGesture(ACT_DOTA_ATTACK_EVENT)
	local o = CalcDirection2D(p, n:GetAbsOrigin())
	n:SetForwardVector(o)
	local E = math.min(self:GetSpecialValueFor("distance"), CalcDistance(p, n))
	local F = self:GetSpecialValueFor("speed")
	local G = E / F
	local H = 0
	n:AddNewModifier(n, self, "modifier_solthra_2_dash", { duration = G })
	local I = self:GetSpecialValueFor("bouns_duration")
	if I > 0 then
		n:AddNewModifier(n, self, "modifier_solthra_2_upgrade_7", { duration = I })
	end
	n:Dash(o, E, H, G)
	n:EmitSound("Hero_EmberSpirit.FireRemnant.Create")
	local J = self:GetSpecialValueFor("fury_gain")
	if J > 0 then
		n:GiveMana(J)
	end
end
m = e({ l(nil) }, m)
local K = c()
K.name = "modifier_solthra_2_dash"
d(K, h)
function K.prototype.GetAbilitySpecialValue(self)
	self.damage = self:GetAbilitySpecialValueFor("damage")
end
function K.prototype.OnCreated(self, L)
	local M = self:GetParent()
	if IsServer() then
		local N = self:GetAbility()
		Bullet:CreateCustomBullet({
			caster = M,
			spawnOrigin = M:GetAbsOrigin(),
			teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
			typeFilter = UNIT_AND_BUILDING,
			radius = 160,
			lifeTime = self:GetDuration(),
			PathFunction = function(p, O)
				return M:GetAbsOrigin()
			end,
			FuncUnitFinder = function(P, p, Q, O)
				return FindUnitsInRadius(
					M:GetTeamNumber(),
					p,
					nil,
					Q,
					DOTA_UNIT_TARGET_TEAM_ENEMY,
					UNIT_AND_BUILDING,
					DOTA_UNIT_TARGET_FLAG_NONE,
					FIND_ANY_ORDER,
					false
				)
			end,
			OnBulletHit = function(R, S, T)
				M:DealDamage(R, N, self.damage)
			end,
		})
	else
		local B = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_ember_spirit/ember_spirit_remnant_dash.vpcf",
			PATTACH_CUSTOMORIGIN,
			M
		)
		ParticleManager:SetParticleControlEnt(B, 0, M, PATTACH_POINT_FOLLOW, "attach_hitloc", M:GetAbsOrigin(), true)
		ParticleManager:SetParticleControlEnt(B, 1, M, PATTACH_POINT_FOLLOW, "attach_hitloc", M:GetAbsOrigin(), true)
		self:AddParticle(B, false, false, -1, false, false)
	end
end
function K.prototype.StaticProperty(self)
	return { [PropertyFunction.AVOID_DAMAGE] = 1 }
end
function K.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true, [StateEnum.STUN_IMMUNE] = true, [StateEnum.KNOCKBACK_IMMUNE] = true }
end
K = e(
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
	K
)
local U = c()
U.name = "modifier_solthra_2_upgrade_7"
d(U, h)
function U.prototype.GetAbilitySpecialValue(self)
	self.bouns_count = self:GetAbilitySpecialValueFor("bouns_count")
	self.bouns_duration = self:GetAbilitySpecialValueFor("bouns_duration")
end
function U.prototype.OnCreated(self, L)
	if IsServer() then
		self:AddStackCountDuration(1, self.bouns_duration)
	end
end
function U.prototype.OnRefresh(self, L)
	if IsServer() then
		self:AddStackCountDuration(1, self.bouns_duration)
	end
end
function U.prototype.StaticProperty(self)
	return { [PropertyFunction.SPLIT_COUNT] = self.bouns_count * self:GetStackCount() }
end
U = e(
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
	U
)
return f