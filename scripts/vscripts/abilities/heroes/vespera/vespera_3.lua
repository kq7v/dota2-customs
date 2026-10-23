--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/vespera/vespera_3"
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
local m = l.AbilityValue
local n = l.registerEOMAbility
local o = c()
o.name = "vespera_3"
d(o, k)
function o.prototype.GetCastCooldown(self)
	return self:GetSpecialValueFor("duration")
end
function o.prototype.OnSpellStart(self)
	local p = self:GetCaster()
	p:EmitSound("Hero_TemplarAssassin.Meld")
	local q = self:GetSpecialValueFor("duration")
	p:AddNewModifier(p, self, "modifier_vespera_3_buff", { duration = q })
	local r = p:AddNewModifier(
		p,
		self,
		"modifier_vespera_3_movespeed",
		{ duration = self:GetSpecialValueFor("movespeed_duration") }
	)
	if IsValid(r) then
		self:SetFrozenCooldown(true, r:GetRemainingTime())
	end
	local s = self:GetSpecialValueFor("image_duration")
	if s > 0 then
		local t = p:SummonUnit("vespera_dummy", p:GetAbsOrigin(), s)
		if t ~= nil then
			t:AddNewModifier(p, self, "modifier_vespera_upgrade_24", { duration = s })
		end
		local u = FindEnemiesInRadius(p, p:GetAbsOrigin(), 900)
		for v, w in ipairs(u) do
			if BehaviorTree:GetTarget(w) == p then
				BehaviorTree:ClearTarget(w)
				w:Stop()
			end
		end
	end
end
o = e(
	{
		n(nil, {
			funcCondition = function(x, y)
				if Demo.force_dash_auto_cast then
					return Demo:CanForceDefenseAutoCast(y)
				end
				local z = y:GetAutoCastState()
				if z then
					local A = GameModeManager
					local B = GameModeManager.IsAutoCastCombatActive
					local C = y:GetCaster()
					z = B(A, C and C:GetPlayerOwnerID())
				end
				return z
			end,
		}),
	},
	o
)
local D = c()
D.name = "modifier_vespera_3_buff"
d(D, h)
function D.prototype.OnCreated(self, E)
	if IsClient() then
		local F = self:GetParent()
		local G = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_phantom_assassin/phantom_assassin_2_fx_shanbi_01.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			F
		)
		ParticleManager:SetParticleControlEnt(G, 1, F, PATTACH_ABSORIGIN, nil, F:GetAbsOrigin(), true)
		self:AddParticle(G, false, false, -1, false, false)
		local H = ParticleManager:CreateParticle(
			"particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf",
			PATTACH_INVALID,
			F
		)
		self:AddParticle(H, false, true, -1, false, false)
	end
end
function D.prototype.OnDestroy(self)
	if IsServer() then
		self:GetParent():AddShield(self:GetAbilitySpecialValueFor("shield"), "vespera_upgrade_15")
	end
end
function D.prototype.CheckState(self)
	return { [MODIFIER_STATE_NO_UNIT_COLLISION] = true }
end
function D.prototype.StaticProperty(self)
	return { [PropertyFunction.AVOID_DAMAGE] = 1, [PropertyFunction.ATTACK] = self.effect_attack }
end
function D.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true, [StateEnum.STUN_IMMUNE] = true, [StateEnum.KNOCKBACK_IMMUNE] = true }
end
e({ m(nil) }, D.prototype, "effect_attack", nil)
e({ m(nil) }, D.prototype, "reduce_damage", nil)
D = e(
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
	D
)
local I = c()
I.name = "modifier_vespera_3_movespeed"
d(I, h)
function I.prototype.GetAbilitySpecialValue(self)
	self.movespeed = self:GetAbilitySpecialValueFor("movespeed")
	self.evade = self:GetAbilitySpecialValueFor("evade")
	self.snow_ball_interval = self:GetAbilitySpecialValueFor("snow_ball_interval")
	self.snow_ball_frozen = self:GetAbilitySpecialValueFor("snow_ball_frozen")
	self.snow_ball_damage = self:GetAbilitySpecialValueFor("snow_ball_damage")
end
function I.prototype.OnCreated(self, E)
	if IsServer() then
		self:IncrementStackCount()
		local F = self:GetParent()
		if F:HasAbilityUpgrade("vespera_upgrade_5") then
			local y = F:GetAbilityByTag(AbilityTag.Attack)
			y:CuttingStorm(F, 1)
		end
		if F:HasAbilityUpgrade("vespera_upgrade_26") then
			local J = self:GetAbilitySpecialValueFor("suriken_interval")
			if J > 0 then
				self:ThrowSuriken(F)
				self:StartThink(J, "vespera_upgrade_26", function()
					self:ThrowSuriken(F)
				end)
			end
		end
		if self.snow_ball_interval > 0 then
			self:StartIntervalThink(self.snow_ball_interval)
		end
	end
end
function I.prototype.ThrowSuriken(self, F)
	local y = F:GetAbilityByTag(AbilityTag.Skill)
	if not IsValid(y) then
		return
	end
	local u = FindEnemiesInRadius(F, F:GetAbsOrigin(), y:GetSpecialValueFor("distance"), FIND_CLOSEST)
	local K = u[1]
	local L = IsValid(K) and K:GetAbsOrigin() or F:GetAbsOrigin() + F:GetForwardVector() * 100
	y:SurikenToss({ castPosition = L })
	Event:Fire("ability_cast_complete", { ability = y, caster = F, position = L, abilityTag = y:GetAbilityTag() })
end
function I.prototype.OnIntervalThink(self)
	local F = self:GetParent()
	local u = FindEnemiesInRadius(F, F:GetAbsOrigin(), 900)
	local K = GetRandomElement(u)
	if IsValid(K) then
		F:ThrowSnowball(K, nil, self.snow_ball_frozen, self.snow_ball_damage)
	end
end
function I.prototype.DeclareFunctions(self)
	return {}
end
function I.prototype.GetActivityTranslationModifiers(self)
	return "haste"
end
function I.prototype.StaticProperty(self)
	return { [PropertyFunction.EVASION] = self.evade, [PropertyFunction.MOVESPEED] = self.movespeed }
end
function I.prototype.DynamicProperty(self)
	return {
		[PropertyFunction.ATTACK] = function()
			return self:GetAbilitySpecialValueFor("attack_bonus")
		end,
	}
end
I = e(
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
	I
)
local M = c()
M.name = "modifier_vespera_upgrade_24"
d(M, h)
function M.prototype.GetAbilitySpecialValue(self) end
function M.prototype.OnCreated(self, E)
	local p = self:GetCaster()
	if IsClient() then
		local N = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_phantom_assassin/remnant_dummy.vpcf",
			PATTACH_ABSORIGIN,
			p
		)
		self:AddParticle(N, false, false, -1, false, false)
	end
end
function M.prototype.CheckState(self)
	return { [MODIFIER_STATE_NO_UNIT_COLLISION] = true }
end
function M.prototype.StaticProperty(self)
	return { [PropertyFunction.AVOID_DAMAGE] = 1 }
end
function M.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true }
end
function M.prototype.OnDestroy(self)
	if IsServer() then
		local p = self:GetCaster()
		local F = self:GetParent()
		if IsValid(p) then
			local y = p:GetAbilityByTag(AbilityTag.Attack)
			if IsValid(y) then
				y:CuttingStorm(F:GetAbsOrigin() + Vector(0, 0, 100), self:GetAbilitySpecialValueFor("aoe_image_factor"))
			end
		end
		F:RemoveSelf()
	end
end
M = e(
	{ i(
		a,
		{ IsHidden = false, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	M
)
return f