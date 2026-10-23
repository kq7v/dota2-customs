--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/seraphon/seraphon_2"
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
m.name = "seraphon_2"
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
	return self:GetSpecialValueFor("duration")
end
function m.prototype.OnSpellStart(self)
	local n = self:GetCaster()
	local p = self:GetCursorPosition()
	if not n:HasModifier("modifier_seraphon_3") then
		n:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_2, 1)
	end
	local o = CalcDirection2D(p, n:GetAbsOrigin())
	n:SetForwardVector(o)
	local r = math.min(self:GetSpecialValueFor("distance"), CalcDistance(p, n))
	local s = self:GetSpecialValueFor("duration")
	local t = 0
	n:AddNewModifier(n, self, "modifier_seraphon_2_dash", { duration = s })
	n:Dash(o, r, t, s)
end
m = e({ l(nil) }, m)
local u = c()
u.name = "modifier_seraphon_2_dash"
d(u, h)
function u.prototype.GetAbilitySpecialValue(self)
	self.distance = self:GetAbilitySpecialValueFor("distance")
	self.knockback = self:GetAbilitySpecialValueFor("knockback")
	self.damage = self:GetAbilitySpecialValueFor("damage")
end
function u.prototype.OnCreated(self, v)
	local w = self:GetParent()
	if IsServer() then
		local x = self:GetAbility()
		w:EmitSound("Hero_DragonKnight.ElderDragonShoot3.Attack")
		Bullet:CreateCustomBullet({
			caster = w,
			spawnOrigin = w:GetAbsOrigin(),
			teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
			typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
			radius = 120,
			lifeTime = self:GetDuration(),
			PathFunction = function(p, y)
				return w:GetAbsOrigin()
			end,
			ParticleCreator = function(y)
				local z = ParticleManager:CreateParticle(
					"particles/mushi_fx/mushi_fx_chongci_01.vpcf",
					PATTACH_CUSTOMORIGIN,
					w
				)
				ParticleManager:SetParticleControl(z, 0, w:GetAttachmentPosition("attach_hitloc"))
				ParticleManager:SetParticleControl(z, 1, w:GetAttachmentPosition("attach_hitloc"))
				ParticleManager:SetParticleControlEnt(
					z,
					1,
					w,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					w:GetAbsOrigin(),
					true
				)
				ParticleManager:SetParticleControl(z, 2, Vector(2000, 0, 0))
				return z
			end,
			FuncUnitFinder = function(A, p, B, y)
				return Bullet:FindUnitInLine(y.__teamNumber, A, p, B, B, y.teamFilter, y.typeFilter, y.flagFilter)
			end,
			OnBulletHit = function(C, D, y)
				local E = w:GetForwardVector()
				local F = AbilityUpgrade:HasAbilityUpgrade(w, "seraphon_upgrade_12")
				w:EmitSound("Hero_DragonKnight.DragonTail.DragonFormCast")
				w:DealDamage(C, x, self.damage)
				C:KnockBack(E, not F and self.knockback or self.distance * y.__lifeTimeRemaining / y.lifeTime, 100, 0.3)
				if not F and IsValid(self) then
					self:Destroy()
				end
				if not F then
					w:RemoveModifierByName("modifier_dash")
				end
			end,
		})
	else
	end
end
function u.prototype.StaticProperty(self)
	return { [PropertyFunction.AVOID_DAMAGE] = 1 }
end
function u.prototype.StaticState(self)
	return { [StateEnum.NO_HEALTH_BAR] = true, [StateEnum.STUN_IMMUNE] = true, [StateEnum.KNOCKBACK_IMMUNE] = true }
end
u = e(
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
	u
)
return f