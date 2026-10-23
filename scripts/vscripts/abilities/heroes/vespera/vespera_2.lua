--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/vespera/vespera_2"
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
m.name = "vespera_2"
d(m, k)
function m.prototype.____constructor(self, ...)
	k.prototype.____constructor(self, ...)
	self.vespera_upgrade_23_enable = true
end
function m.prototype.OnController(self, n, o)
	local p = self:GetCaster()
	if n == nil then
		n = p:GetAbsOrigin() + o * self:GetSpecialValueFor("distance")
	end
	p:ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, self, n)
end
function m.prototype.OnCreated(self)
	local p = self:GetCaster()
	self:StartThink(0, function()
		if
			self:IsCooldownReady()
			and (
				Demo.force_dash_auto_cast
				or self:GetAutoCastState() and GameModeManager:IsAutoCastCombatActive(p:GetPlayerOwnerID())
			)
		then
			if Demo.force_dash_auto_cast and not Demo:CanForceDashAutoCast(p) then
				return
			end
			local o = Demo.force_dash_auto_cast and Demo:GetForceDashDirection(p, self)
				or Controller:GetInputDirection(p)
			if VectorIsZero(o) then
				o = p:GetForwardVector()
			end
			self:OnController(p:GetAbsOrigin() + o * self:GetSpecialValueFor("distance"), o)
			if Demo.force_dash_auto_cast then
				Demo:MarkForceDashAutoCast(p)
			end
		end
	end)
end
function m.prototype.CreateDashDamageBullet(self, q, r)
	if r == nil then
		r = EOM_DAMAGE_FLAGS.NONE
	end
	if q <= 0 then
		return
	end
	local p = self:GetCaster()
	local s = Bullet:CreateCustomBullet({
		caster = p,
		spawnOrigin = p:GetAbsOrigin(),
		teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
		typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
		radius = self:GetSpecialValueFor("dash_width"),
		lifeTime = 2,
		PathFunction = function(n, t)
			return p:GetAbsOrigin()
		end,
		FuncUnitFinder = function(u, n, v, t)
			return FindUnitsInRadius(
				p:GetTeamNumber(),
				n,
				nil,
				v,
				DOTA_UNIT_TARGET_TEAM_ENEMY,
				DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
				DOTA_UNIT_TARGET_FLAG_NONE,
				FIND_ANY_ORDER,
				false
			)
		end,
		OnBulletHit = function(w, x, y)
			p:DealDamage(w, self, q, EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL, r)
		end,
	})
	if s ~= nil then
		if self.bulletID == nil then
			self.bulletID = {}
		end
		local z = self.bulletID
		z[#z + 1] = s
	end
end
function m.prototype.EventListener(self)
	return {
		dash_start = function(A, B)
			local p = self:GetCaster()
			if B.caster ~= p then
				return
			end
			local C = self:GetSpecialValueFor("dash_damage")
			self:CreateDashDamageBullet(C)
			if AbilityUpgrade:HasAbilityUpgrade(p, "vespera_upgrade_12") then
				p:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT_BASH, 2)
			end
		end,
		dash_end = function(A, B)
			local p = self:GetCaster()
			if B.caster ~= p then
				return
			end
			if AbilityUpgrade:HasAbilityUpgrade(p, "vespera_upgrade_12") then
				local D = p:GetAbilityByTag(AbilityTag.Attack)
				if IsValid(D) then
					local E = -p:GetForwardVector()
					local F = p:Script_GetAttackRange()
					p:SetForwardVector(E)
					p:SetCursorPosition(p:GetAbsOrigin() + E * F)
					p:AddNewModifier(
						p,
						D,
						"modifier_vespera_combo_final",
						{ duration = p:GetSecondsPerAttack(false) + 60 }
					)
					p:AddNewModifier(p, D, "modifier_vespera_upgrade_12_backstab", { duration = 1 })
					D:Attack(B.start, B["end"])
					p:RemoveModifierByName("modifier_vespera_upgrade_12_backstab")
				end
			end
			if AbilityUpgrade:HasAbilityUpgrade(p, "vespera_upgrade_7") then
				if p:HasAbilityUpgrade("vespera_upgrade_7") then
					local G = p:GetAbilityByTag(AbilityTag.Attack)
					p:AddNewModifier(
						p,
						G,
						"modifier_vespera_combo_final",
						{ duration = p:GetSecondsPerAttack(false) + 60 }
					)
				end
			end
			if self.bulletID ~= nil then
				for A, s in ipairs(self.bulletID) do
					Bullet:DestroyBulletByID(s)
				end
			end
		end,
	}
end
function m.prototype.GetCastCooldown(self)
	return self:GetSpecialValueFor("duration")
end
function m.prototype.GetCooldown(self, H)
	return math.max(
		(k.prototype.GetCooldown(self, H) - self:GetSpecialValueFor("cooldown_reduction"))
			* (1 - self:GetSpecialValueFor("cooldown_pct") * 0.01),
		0
	)
end
function m.prototype.OnSpellStart(self)
	local p = self:GetCaster()
	local I = p:GetAbsOrigin()
	p:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, 1)
	local n = self:GetCursorPosition()
	n.z = I.z
	local o = CalcDirection2D(n, p)
	local J = math.min(self:GetSpecialValueFor("distance"), CalcDistance(n, p))
	local K = self:GetSpecialValueFor("duration")
	local L = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_fx_chongci_01.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		p
	)
	ParticleManager:SetParticleControlTransformForward(L, 0, p:GetAbsOrigin(), o)
	p:Dash(o, J, 0, K)
	p:EmitSound("Hero_PhantomAssassin.Strike.End")
	if AbilityUpgrade:HasAbilityUpgrade(p, "vespera_upgrade_3") then
		p:AddNewModifier(
			p,
			self,
			"modifier_vespera_2_attackspeed",
			{ duration = self:GetSpecialValueFor("attackspeed_duration") }
		)
	end
	if AbilityUpgrade:HasAbilityUpgrade(p, "vespera_upgrade_4") then
		self:FanOfKnives()
	end
	if p:HasAbilityUpgrade("vespera_upgrade_23") and self.vespera_upgrade_23_enable then
		self.vespera_upgrade_23_enable = false
		self:StartThink(self:GetSpecialValueFor("blind_cd"), "vespera_upgrade_23_enable", function()
			self.vespera_upgrade_23_enable = true
			return -1
		end)
		local M = self:GetSpecialValueFor("smoke_duration")
		CreateModifierThinker(p, self, "modifier_vespera_upgrade_23", { duration = M }, I, p:GetTeamNumber(), false)
		p:EmitSound("Hero_Riki.Smoke_Screen")
	end
end
function m.prototype.FanOfKnives(self)
	local p = self:GetCaster()
	local N = self:GetSpecialValueFor("dagger_count")
	local J = self:GetSpecialValueFor("dagger_distance")
	local O = self:GetSpecialValueFor("dagger_width")
	local P = self:GetSpecialValueFor("dagger_speed")
	local q = self:GetSpecialValueFor("dagger_damage")
	local o = self:GetForwardVector()
	Bullet:SplitAction(o, N, 360 / N, function(A, Q)
		Bullet:CreateLinearBullet({
			ability = self,
			caster = p,
			effectName = "particles/units/heroes/hero_phantom_assassin/phantom_assassin_2_dagger.vpcf",
			spawnOrigin = p:GetAttachmentPosition("attach_hitloc"),
			direction = Q,
			moveSpeed = P,
			distance = J,
			radius = O,
			teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
			typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
			OnBulletHit = function(w, x, y)
				p:DealDamage(w, self, q, EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL)
			end,
		})
	end)
end
m = e({ l(nil) }, m)
local R = c()
R.name = "modifier_vespera_2_attackspeed"
d(R, h)
function R.prototype.StaticProperty(self)
	return { [PropertyFunction.ATTACKSPEED] = self:GetAbilitySpecialValueFor("attackspeed") }
end
R = e(
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
	R
)
local S = c()
S.name = "modifier_vespera_2_upgrade_7"
d(S, h)
function S.prototype.DynamicProperty(self)
	return {
		[PropertyFunction.ATTACK_DAMAGE_PROC] = function()
			self:Destroy()
			return self:GetAbilitySpecialValueFor("bonus_attack_damage")
		end,
	}
end
S = e(
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
	S
)
local T = c()
T.name = "modifier_vespera_upgrade_23"
d(T, h)
function T.prototype.____constructor(self, ...)
	h.prototype.____constructor(self, ...)
	self.smoke_radius = 0
end
function T.prototype.GetAbilitySpecialValue(self)
	self.smoke_radius = self:GetAbilitySpecialValueFor("smoke_radius")
end
function T.prototype.OnCreated(self, U)
	local V = self:GetParent()
	if IsServer() then
		local W = FindEnemiesInRadius(V, V:GetAbsOrigin(), self.smoke_radius)
		for X, w in ipairs(W) do
			w:AddNewModifier(V, nil, "modifier_vespera_upgrade_23_blind", { duration = self:GetDuration() })
			w:Stop()
		end
	else
		local L = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_riki/riki_smokebomb.vpcf",
			PATTACH_CUSTOMORIGIN,
			V
		)
		ParticleManager:SetParticleControl(L, 0, V:GetAbsOrigin())
		ParticleManager:SetParticleControl(L, 1, Vector(self.smoke_radius, self.smoke_radius, self.smoke_radius))
		self:AddParticle(L, false, false, -1, false, false)
	end
end
function T.prototype.OnDestroy(self)
	if IsServer() then
		self:GetParent():RemoveSelf()
	end
end
T = e(
	{ i(
		a,
		{ IsHidden = false, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	T
)
local Y = c()
Y.name = "modifier_vespera_upgrade_23_blind"
d(Y, h)
function Y.prototype.StaticState(self)
	return { [StateEnum.BLIND] = true }
end
Y = e(
	{ i(
		a,
		{ IsHidden = false, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	Y
)
return f