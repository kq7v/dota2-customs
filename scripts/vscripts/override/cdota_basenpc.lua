--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "override/CDOTA_BaseNPC"
local b = require("lualib_bundle")
local c = b.__TS__ArraySetLength
local d = b.__TS__ArraySplice
local e = b.__TS__ArrayIsArray
local f = b.__TS__ArrayFilter
local g = b.__TS__ArrayForEach
local h = b.__TS__ArrayMap
local i = b.__TS__ArraySome
local j = b.__TS__Delete
local k = b.__TS__SparseArrayNew
local l = b.__TS__SparseArrayPush
local m = b.__TS__SparseArraySpread
local n = b.__TS__ArraySlice
local o = b.__TS__ArrayIndexOf
local p = b.__TS__ArrayConcat
local q = b.__TS__StringIncludes
CONTROL_IMMUNE_MODIFIERS = {
	modifier_stunned = true,
	modifier_bashed = true,
	modifier_knockback = true,
	modifier_rooted = true,
	modifier_silence = true,
	modifier_disarmed = true,
	modifier_hexed = true,
	modifier_feared = true,
	modifier_taunt = true,
	modifier_eul_cyclone = true,
	modifier_wind_waker = true,
	modifier_freeze_debuff = true,
	modifier_knockback_custom = true,
	modifier_meat_hook_debuff = true,
	modifier_stagger = true,
	modifier_sleep = true,
	modifier_rune_weaken_slow = true,
}
lightningPresentation = {}
lightningPresentationLastTime = -1
function ShouldPlayLightningPresentation(r, s, t)
	if t < lightningPresentationLastTime then
		c(lightningPresentation, 0)
	end
	lightningPresentationLastTime = t
	local u = 0
	local v = false
	do
		local w = #lightningPresentation - 1
		while w >= 0 do
			do
				local x = lightningPresentation[w + 1]
				if t - x.time >= 0.1 then
					d(lightningPresentation, w, 1)
					goto y
				end
				u = u + x.cost
				local z = s.x - x.x
				local A = s.y - x.y
				if x.kind == r and z * z + A * A <= 300 * 300 then
					v = true
				end
			end
			::y::
			w = w - 1
		end
	end
	local B = r == "arc" and 3 or 2
	if v or u + B > 12 then
		return false
	end
	lightningPresentation[#lightningPresentation + 1] = { time = t, x = s.x, y = s.y, kind = r, cost = B }
	return true
end
KnockBackFlag = KnockBackFlag or {}
KnockBackFlag.IS_HIDDEN = 1
KnockBackFlag[KnockBackFlag.IS_HIDDEN] = "IS_HIDDEN"
KnockBackFlag.IS_BUFF = 2
KnockBackFlag[KnockBackFlag.IS_BUFF] = "IS_BUFF"
KnockBackFlag.IS_PURGABLE = 4
KnockBackFlag[KnockBackFlag.IS_PURGABLE] = "IS_PURGABLE"
KnockBackFlag.IS_NOT_PURGE_EXCEPTION = 8
KnockBackFlag[KnockBackFlag.IS_NOT_PURGE_EXCEPTION] = "IS_NOT_PURGE_EXCEPTION"
KnockBackFlag.NO_STUN = 16
KnockBackFlag[KnockBackFlag.NO_STUN] = "NO_STUN"
KnockBackFlag.IS_BLOCKABLE = 32
KnockBackFlag[KnockBackFlag.IS_BLOCKABLE] = "IS_BLOCKABLE"
KnockBackFlag.RETAIN_ON_DEATH = 64
KnockBackFlag[KnockBackFlag.RETAIN_ON_DEATH] = "RETAIN_ON_DEATH"
KnockBackFlag.DESTROY_TREES = 128
KnockBackFlag[KnockBackFlag.DESTROY_TREES] = "DESTROY_TREES"
KnockBackFlag.NO_STUN_PARTICLE = 256
KnockBackFlag[KnockBackFlag.NO_STUN_PARTICLE] = "NO_STUN_PARTICLE"
KnockBackFlag.IS_HORIZONTAL_FLAIL = 512
KnockBackFlag[KnockBackFlag.IS_HORIZONTAL_FLAIL] = "IS_HORIZONTAL_FLAIL"
BaseNPC = IsServer() and CDOTA_BaseNPC or C_DOTA_BaseNPC
MAX_LIGHTNING_STRIKE_SOUNDS_PER_WINDOW = 1
MAX_LIGHTNING_STRIKE_TARGET_HITS_PER_FRAME = 40
LIGHTNING_STRIKE_EFFECT_LIMIT_INTERVAL_SECONDS = 0.1
ARC_LIGHTNING_SOUND_COOLDOWN_SECONDS = 0.1
MAX_CALL_SWORD_GROUP_SIZE = 8
BaseNPC.IsFriendly = function(self, C)
	if IsValid(self) and IsValid(C) then
		return self:GetTeamNumber() == C:GetTeamNumber()
	end
	return false
end
BaseNPC.GetProperty = function(self, D)
	local E = PROPERTY_MAP_REVERSE[D]
	if E == nil then
		return 0
	end
	return PropertySystem:GetPropertyValueEx(E, self:GetPlayerOwnerID(), self:entindex())
end
BaseNPC.CanTriggerProc = function(self, F, G, t)
	if t == nil then
		t = GameRules:GetGameTime()
	end
	if self.__procLimitTimes == nil then
		self.__procLimitTimes = {}
	end
	local H = self.__procLimitTimes[F]
	if H ~= nil and t - H < G then
		return false
	end
	self.__procLimitTimes[F] = t
	return true
end
if BaseNPC.GetAttackDamage_Engine == nil then
	BaseNPC.GetAttackDamage_Engine = BaseNPC.GetAttackDamage
end
BaseNPC.GetAttackDamage = function(self)
	return (self:GetProperty(PropertyFunction.BASE_ATTACK) + self:GetProperty(PropertyFunction.ATTACK))
		* (1 + self:GetProperty(PropertyFunction.ATTACK_AMPLIFY) / 100)
end
if IsServer() then
	if CDOTA_BaseNPC.GetHealth_Engine == nil then
		CDOTA_BaseNPC.GetHealth_Engine = CDOTA_BaseNPC.GetHealth
	end
	if CDOTA_BaseNPC.SetHealth_Engine == nil then
		CDOTA_BaseNPC.SetHealth_Engine = CDOTA_BaseNPC.SetHealth
	end
	if CDOTA_BaseNPC.ModifyHealth_Engine == nil then
		CDOTA_BaseNPC.ModifyHealth_Engine = CDOTA_BaseNPC.ModifyHealth
	end
	if CDOTA_BaseNPC.SetMaxHealth_Engine == nil then
		CDOTA_BaseNPC.SetMaxHealth_Engine = CDOTA_BaseNPC.SetMaxHealth
	end
	if CDOTA_BaseNPC.SetBaseMaxHealth_Engine == nil then
		CDOTA_BaseNPC.SetBaseMaxHealth_Engine = CDOTA_BaseNPC.SetBaseMaxHealth
	end
	CDOTA_BaseNPC.GetHealth = function(self)
		return LargeNumberHealth:GetHealth(self) or self:GetHealth_Engine()
	end
	CDOTA_BaseNPC.SetHealth = function(self, I)
		if not LargeNumberHealth:SetHealth(self, I) then
			self:SetHealth_Engine(I)
		end
	end
	CDOTA_BaseNPC.ModifyHealth = function(self, I, J, K, L)
		if not LargeNumberHealth:ModifyHealth(self, I) then
			self:ModifyHealth_Engine(I, J, K, L)
		end
	end
end
if BaseNPC.Heal_Engine == nil then
	BaseNPC.Heal_Engine = BaseNPC.Heal
end
BaseNPC.Heal = function(self, M, J)
	local N = self:GetHealth()
	self:ModifyHealth(math.min(N + M, self:GetMaxHealth()), J, false, 0)
end
BaseNPC.HealthCost = function(self, M)
	local N = self:GetHealth()
	self:ModifyHealth(math.min(N + M, self:GetMaxHealth()), nil, false, 0)
end
if BaseNPC.GiveMana_Engine == nil then
	BaseNPC.GiveMana_Engine = BaseNPC.GiveMana
end
BaseNPC.GiveMana = function(self, O)
	O = O * GetFinalGainMultiplier(nil, self, "fury_reduction_mul")
	self:GiveMana_Engine(O)
	Event:Fire("give_mana", { unit = self, manaAmount = O })
end
function CalculateEquivalentDefenseIntensity(P)
	local Q = P:GetProperty(PropertyFunction.DEFENSE_INTENSITY)
		* (1 + P:GetProperty(PropertyFunction.DEFENSE_INTENSITY_BOOST) * 0.01)
	return (1000 + Q)
			* (1 + P:GetProperty(PropertyFunction.HERO_DEFENSE_BOOST) * 0.01)
			* (1 + P:GetProperty(PropertyFunction.FINAL_DEFENSE) * 0.01)
		- 1000
end
if BaseNPC.GetMaxHealth_Engine == nil then
	BaseNPC.GetMaxHealth_Engine = BaseNPC.GetMaxHealth
end
BaseNPC.GetMaxHealth = function(self)
	local R = CalculateEquivalentDefenseIntensity(self)
	return math.floor(
		(self:GetProperty(PropertyFunction.BASE_HEALTH) + self:GetProperty(PropertyFunction.HEALTH))
			* (1 + self:GetProperty(PropertyFunction.HEALTH_AMPLIFY) * 0.01)
			* (1 + R * INTENSITY_FACTOR * 0.01)
	)
end
if BaseNPC.GetHealthPercent_Engine == nil then
	BaseNPC.GetHealthPercent_Engine = BaseNPC.GetHealthPercent
end
BaseNPC.GetHealthPercent = function(self)
	return self:GetHealth() / self:GetMaxHealth() * 100
end
if BaseNPC.GetMaxMana_Engine == nil then
	BaseNPC.GetMaxMana_Engine = BaseNPC.GetMaxMana
end
BaseNPC.GetMaxMana = function(self)
	return math.floor(
		(self:GetProperty(PropertyFunction.BASE_MANA) + self:GetProperty(PropertyFunction.MANA))
			* (1 + self:GetProperty(PropertyFunction.MANA_AMPLIFY) * 0.01)
	)
end
BaseNPC.HasAbilityUpgrade = function(self, S)
	return AbilityUpgrade:HasAbilityUpgrade(self, S)
end
BaseNPC.GetShield = function(self, T)
	if IsServer() then
		local U = self:FindModifierByName("modifier_shield")
		if IsValid(U) then
			if T ~= nil then
				return U:GetShieldAmount(T)
			else
				return U:GetTotalShieldAmount(T)
			end
		end
	else
		return self:GetModifierStackCount("modifier_shield", self)
	end
	return 0
end
BaseNPC.GetShieldModifier = function(self)
	return self.__shield_modofier
end
BaseNPC.GetVulnerabilityModifierValue = function(self, V)
	local U = self.__VulnerabilityModifier
	if not IsValid(U) then
		return 0
	end
	local W = U:GetVulnerabilityValue(V)
	if W == nil then
		W = 0
	end
	return W
end
BaseNPC.HasState = function(self, X)
	if IsServer() then
		return StateSystem:GetStateValue(self:entindex(), X)
	else
		return StateSystem:GetStateValueFromNetTable(self:entindex(), X)
	end
end
BaseNPC.IsBreakable = function(self)
	return self:HasState(StateEnum.BREAKABLE)
end
if IsServer() then
	if CDOTA_BaseNPC.EmitSound_Engine == nil then
		CDOTA_BaseNPC.EmitSound_Engine = CDOTA_BaseNPC.EmitSound
	end
	CDOTA_BaseNPC.EmitSound = function(self, Y, s)
		if s then
			EmitSoundOnLocationWithCaster(s, Y, self)
		else
			self:EmitSound_Engine(Y)
		end
	end
	if CDOTA_BaseNPC.AddAbility_Engine == nil then
		CDOTA_BaseNPC.AddAbility_Engine = CDOTA_BaseNPC.AddAbility
	end
	CDOTA_BaseNPC.AddAbility = function(self, Z, _)
		local a0 = self:AddAbility_Engine(Z)
		if _ ~= nil and IsValid(a0) then
			a0:SetLevel(_)
		end
		a0:__OnCreated()
		self:UpdateAbilityNetData()
		return a0
	end
	if CDOTA_BaseNPC.RemoveAbility_Engine == nil then
		CDOTA_BaseNPC.RemoveAbility_Engine = CDOTA_BaseNPC.RemoveAbility
	end
	CDOTA_BaseNPC.RemoveAbility = function(self, Z)
		local a0 = self:FindAbilityByName(Z)
		if IsValid(a0) then
			self:RemoveAbilityByHandle(a0)
		end
	end
	if CDOTA_BaseNPC.RemoveAbilityByHandle_Engine == nil then
		CDOTA_BaseNPC.RemoveAbilityByHandle_Engine = CDOTA_BaseNPC.RemoveAbilityByHandle
	end
	CDOTA_BaseNPC.RemoveAbilityByHandle = function(self, a0)
		if IsValid(a0) then
			if a0.__OnDestroy ~= nil then
				a0:__OnDestroy()
			end
			self:RemoveAbilityByHandle_Engine(a0)
			self:UpdateAbilityNetData()
		end
	end
	CDOTA_BaseNPC.GetAttachmentPosition = function(self, a1)
		if not IsValid(self) then
			return vec3_zero
		end
		return self:GetAttachmentOrigin(self:ScriptLookupAttachment(a1))
	end
	if CDOTA_BaseNPC.RespawnUnit_Engine == nil then
		CDOTA_BaseNPC.RespawnUnit_Engine = CDOTA_BaseNPC.RespawnUnit
	end
	CDOTA_BaseNPC.RespawnUnit = function(self)
		if not self:UnitCanRespawn() then
			return
		end
		local a2 = self:FirstMoveChild()
		while a2 ~= nil do
			local a3 = a2:NextMovePeer()
			if a2 ~= nil and a2:GetClassname() ~= "" and a2:GetClassname() == "dota_item_wearable" then
				UTIL_Remove(a2)
			end
			a2 = a3
		end
		self:RespawnUnit_Engine()
	end
	if CDOTA_BaseNPC.SetUnitCanRespawn_Engine == nil then
		CDOTA_BaseNPC.SetUnitCanRespawn_Engine = CDOTA_BaseNPC.SetUnitCanRespawn
	end
	CDOTA_BaseNPC.SetUnitCanRespawn = function(self, a4)
		self.__unitCanRespawn_ = a4
		if a4 == true then
			self:StopTimer("RecyclingUnit")
		elseif not self:IsAlive() and not self:IsRealHero() then
			self:GameTimer("RecyclingUnit", 8, function()
				if self:IsAlive() then
					return
				end
				if self:IsRealHero() then
					return
				end
				if self:UnitCanRespawn() then
					return
				end
				self:SafeRemoveUnit()
			end)
		end
	end
	if CDOTA_BaseNPC.UnitCanRespawn_Engine == nil then
		CDOTA_BaseNPC.UnitCanRespawn_Engine = CDOTA_BaseNPC.UnitCanRespawn
	end
	CDOTA_BaseNPC.UnitCanRespawn = function(self)
		local a5 = self.__unitCanRespawn_
		if a5 == nil then
			a5 = false
		end
		return a5
	end
	if CDOTA_BaseNPC.AddNewModifier_Engine == nil then
		CDOTA_BaseNPC.AddNewModifier_Engine = CDOTA_BaseNPC.AddNewModifier
	end
	CDOTA_BaseNPC.AddNewModifier = function(self, a6, a0, a7, a8, a9)
		if CONTROL_IMMUNE_MODIFIERS[a7] and self:HasState(StateEnum.CONTROL_IMMUNE) then
			local aa = a7 == "modifier_stunned"
				and a6 == self
				and IsValid(a0)
				and a0:GetCaster() == self
				and a0:GetAbilityName() == "magma_earthshaker_5"
			if not aa then
				return
			end
		end
		local U = nil
		if a9 ~= nil then
			if IsValid(self) and bit.band(a9, AddModifierFlag.IGNORE_DEATH) == AddModifierFlag.IGNORE_DEATH then
				if self.__isRemoving then
					return
				end
				local ab = not self:IsAlive()
				if ab then
					self:SetHealth(1)
				end
				U = self:AddNewModifier_Engine(a6, a0, a7, a8)
				if ab then
					self:SetHealth(0)
				end
			end
		else
			U = self:AddNewModifier_Engine(a6, a0, a7, a8)
		end
		if IsValid(U) and IsValid(a6) then
			local ac = U:GetDuration()
			if ac > 0 then
				if U:IsDebuff() then
					U:SetDuration(ac * (1 + GetDebuffDuration(a6, nil) * 0.01), false)
				else
					U:SetDuration(ac * (1 + GetBuffDuration(a6, nil) * 0.01), false)
				end
			end
		end
		return U
	end
	CDOTA_BaseNPC.ExecuteOrder = function(self, ad, ...)
		local ae = { ... }
		local af
		local C
		local ag
		local ah = { DOTA_UNIT_ORDER_MOVE_TO_POSITION, DOTA_UNIT_ORDER_ATTACK_MOVE }
		local ai = { DOTA_UNIT_ORDER_MOVE_TO_TARGET, DOTA_UNIT_ORDER_ATTACK_TARGET }
		local aj = {
			DOTA_UNIT_ORDER_CAST_POSITION,
			DOTA_UNIT_ORDER_CAST_TARGET,
			DOTA_UNIT_ORDER_CAST_TARGET_TREE,
			DOTA_UNIT_ORDER_CAST_NO_TARGET,
			DOTA_UNIT_ORDER_CAST_TOGGLE,
		}
		if TableFindKey(ah, ad) ~= nil then
			ag = ae[1]
		elseif TableFindKey(ai, ad) ~= nil then
			C = ae[1]
		elseif TableFindKey(aj, ad) ~= nil then
			if ad == DOTA_UNIT_ORDER_CAST_POSITION then
				af = ae[1]
				ag = ae[2]
			elseif ad == DOTA_UNIT_ORDER_CAST_NO_TARGET or ad == DOTA_UNIT_ORDER_CAST_TOGGLE then
				af = ae[1]
			else
				af = ae[1]
				C = ae[2]
			end
		end
		ExecuteOrderFromTable({
			UnitIndex = self:entindex(),
			OrderType = ad,
			TargetIndex = IsValid(C) and C:entindex() or nil,
			AbilityIndex = IsValid(af) and af:entindex() or nil,
			Position = ag,
			Queue = false,
		})
	end
	CDOTA_BaseNPC.Dash = function(self, ak, al, am, ac, an)
		if not self:IsAlive() then
			return
		end
		local ao = GetDashDistance(self, nil)
		local ap = { direction = ak, dash_duration = ac, dash_distance = al + ao, dash_height = am }
		self:RemoveModifierByName("modifier_dash")
		local aq = self:AddNewModifier(self, nil, "modifier_dash", ap)
		if IsValid(aq) and an ~= nil then
			aq.callback = an
		end
	end
	CDOTA_BaseNPC.KnockBack = function(self, ak, al, am, ac, an)
		if not self:IsAlive() then
			return
		end
		if self:HasState(StateEnum.KNOCKBACK_IMMUNE) or self:HasState(StateEnum.CONTROL_IMMUNE) then
			return
		end
		local ap = { direction = ak, dash_duration = ac, dash_distance = al, dash_height = am }
		self:RemoveModifierByName("modifier_knockback_custom")
		local aq = self:AddNewModifier(self, nil, "modifier_knockback_custom", ap)
		if IsValid(aq) and an ~= nil then
			aq.callback = an
		end
	end
	CDOTA_BaseNPC.Stagger = function(self, ac, ar, as, at)
		if at == nil then
			at = false
		end
		if not self:IsAlive() then
			return
		end
		if not at and self:HasState(StateEnum.CONTROL_IMMUNE) then
			return
		end
		local ap = { duration = ac, animation = ar or ACT_DOTA_DISABLED, animation_rate = as or 1 }
		local a7 = at and "modifier_internal_stagger" or "modifier_stagger"
		self:RemoveModifierByName(a7)
		self:AddNewModifier(self, nil, a7, ap)
	end
	CDOTA_BaseNPC.Stun = function(self, a6, a0, ac)
		if not IsValid(self) then
			return
		end
		if ac <= 0 then
			return
		end
		if self:HasState(StateEnum.STUN_IMMUNE) or self:HasState(StateEnum.CONTROL_IMMUNE) then
			return
		end
		self:AddNewModifier(a6, a0, "modifier_stunned", { duration = ac })
	end
	CDOTA_BaseNPC.CanSummonUnit = function(self)
		return not self:HasState(StateEnum.SUMMON_DISABLED)
	end
	CDOTA_BaseNPC.SummonUnit = function(self, au, s, ac, av, aw)
		if aw == nil then
			aw = false
		end
		if aw and not self:CanSummonUnit() then
			return nil
		end
		local ax = self:GetForwardVector()
		local ay = {
			MapUnitName = au,
			angles = (((tostring(ax.x) .. " ") .. tostring(ax.y)) .. " ") .. tostring(ax.z),
			teamnumber = self:GetTeamNumber(),
			NeverMoveToClearSpace = false,
			IsSummoned = "1",
		}
		if av ~= nil then
			ay = TableOverride(ay, av)
		end
		local P = CreateUnitFromTable(ay, s)
		if not IsValid(P) then
			return nil
		end
		P.__Summoner = self
		if ac ~= nil and ac > 0 then
			P:AddNewModifier(self, nil, "modifier_kill", { duration = ac })
		end
		return P
	end
	CDOTA_BaseNPC.SafeRemoveUnit = function(self)
		if not IsValid(self) then
			return
		end
		if self.__isRemoving then
			return
		end
		self.__isRemoving = true
		self:RemoveAllModifiers(0, false, true, false)
		self:ForceKill(false)
		self:MakeIllusion()
		self:AddNoDraw()
		self:CallAbilityDestroy()
		if PropertySystem ~= nil then
			PropertySystem:CleanupUnitProperties(self)
		end
		Timer:GameTimer(0, function()
			if self:IsNull() then
				return
			end
			self:Remove()
		end)
	end
	CDOTA_BaseNPC.PassiveCast = function(self, a0, az, av, aA)
		if not IsValid(a0) then
			return
		end
		if av == nil then
			av = {}
		end
		local aB = av.castPoint or a0:GetCastPoint()
		local aC = av.castAnimation or a0:GetCastAnimation()
		local aD = av.sActivityModifier
		if av.sActivityModifier and type(av.sActivityModifier) == "table" then
			aD = json.encode(av.sActivityModifier)
		end
		local aE = aB
		local aF = aB
		local aG = aC
		local aH = az
		local aI = av.animationRate
		local aJ = av.position and VectorToString(av.position) or nil
		local aK = IsValid(av.target) and av.target:entindex() or nil
		local aL = av.bFadeAnimation
		local aM = av.fadeAnimationTime
		local aN = aD
		local aO = av.bIgnoreBackswing
		if aO == nil then
			aO = true
		end
		local aP = {
			duration = aE,
			castPoint = aF,
			castAnimation = aG,
			orderType = aH,
			animationRate = aI,
			position = aJ,
			targetIndex = aK,
			bFadeAnimation = aL,
			fadeAnimationTime = aM,
			activityModifier = aN,
			bIgnoreBackswing = aO,
			bUseCooldown = (av.bUseCooldown == nil or av.bUseCooldown == true) and 1 or 0,
			bUseMana = (av.bUseMana == nil or av.bUseMana == true) and 1 or 0,
		}
		a0.CustomAbilityPhaseStart = av.OnAbilityPhaseStart
		a0.CustomAbilityPhaseInterrupted = av.OnAbilityPhaseInterrupted
		local U = self:AddNewModifier(self, a0, "modifier_passive_cast", aP)
		if IsValid(U) then
			U.callback = aA
		end
	end
	if CDOTA_BaseNPC.AddActivityModifier_Engine == nil then
		CDOTA_BaseNPC.AddActivityModifier_Engine = CDOTA_BaseNPC.AddActivityModifier
	end
	CDOTA_BaseNPC.UpdateActivityModifier = function(self)
		if self.__activityModifiers == nil then
			self.__activityModifiers = {}
		end
		self:ClearActivityModifiers()
		for w = 0, #self.__activityModifiers - 1, 1 do
			self:AddActivityModifier_Engine(self.__activityModifiers[w + 1])
		end
	end
	CDOTA_BaseNPC.AddActivityModifier = function(self, aQ)
		if self.__activityModifiers == nil then
			self.__activityModifiers = {}
		end
		local aR = self.__activityModifiers
		aR[#aR + 1] = aQ
		self:UpdateActivityModifier()
	end
	CDOTA_BaseNPC.RemoveActivityModifier = function(self, aQ)
		if self.__activityModifiers == nil then
			self.__activityModifiers = {}
		end
		ArrayRemove(self.__activityModifiers, aQ)
		self:UpdateActivityModifier()
	end
	CDOTA_BaseNPC.DealDamage = function(self, aS, a0, aT, aU, aV)
		if not IsValid(self) or a0 ~= nil and not IsValid(a0) then
			return
		end
		local aW = DOTA_DAMAGE_CATEGORY_BARRIER
		if a0 ~= nil then
			if aU == nil then
				aU = a0:GetDamageType()
			end
			local aX = a0:GetAbilityTag()
			if
				aX == AbilityTag.Skill
				or aX == AbilityTag.Dodge
				or aX == AbilityTag.Defense
				or aX == AbilityTag.Ultimate
			then
				aW = DOTA_DAMAGE_CATEGORY_SPELL
			end
		end
		if e(aS) then
			for w, aY in ipairs(aS) do
				do
					if not IsValid(aY) then
						goto aZ
					end
					local a_ = DamageSystem:AcquireDamageInfo()
					a_.attacker = self
					a_.target = aY
					a_.ability = a0
					a_.damage = aT
					a_.damage_type = aU or EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE
					a_.damage_flags = aV
					a_.damage_category = aW
					DamageSystem:DealDamage(a_, true)
				end
				::aZ::
			end
		else
			if not IsValid(aS) then
				return
			end
			local a_ = DamageSystem:AcquireDamageInfo()
			a_.attacker = self
			a_.target = aS
			a_.ability = a0
			a_.damage = aT
			a_.damage_type = aU or EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE
			a_.damage_flags = aV
			a_.damage_category = aW
			DamageSystem:DealDamage(a_, true)
		end
	end
	CDOTA_BaseNPC.Attack = function(self, aS, a_)
		local b0 = a_ and a_.baseDamage or self:GetAttackDamage()
		local b1 = a_ and a_.damageAmplify or 0
		local b2 = a_ and a_.bonusDamage or 0
		local b3 = a_ and a_.damageType or EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL
		local b4 = DamageSystem:AcquireDamageInfo()
		b4.attacker = self
		b4.target = aS
		b4.ability = self:GetAbilityByTag(AbilityTag.Attack)
		b4.damage = (b0 + b2) * (1 + b1)
		b4.damage_category = DOTA_DAMAGE_CATEGORY_ATTACK
		b4.damage_type = b3
		b4.damage_flags = a_ and a_.flags or EOM_DAMAGE_FLAGS.NONE
		DamageSystem:DealDamage(b4, true)
	end
	CDOTA_BaseNPC.GetAbilityByTag = function(self, b5)
		if self:IsHero() then
			if b5 == AbilityTag.Skill then
				return self:GetAbilityByIndex(0)
			end
			if b5 == AbilityTag.Dodge then
				return self:GetAbilityByIndex(1)
			end
			if b5 == AbilityTag.Defense then
				return self:GetAbilityByIndex(2)
			end
			if b5 == AbilityTag.Ultimate then
				return self:GetAbilityByIndex(5)
			end
			if b5 == AbilityTag.Attack then
				return self:GetAbilityByIndex(3)
			end
			if b5 == AbilityTag.Interact then
				return self:GetAbilityByIndex(4)
			end
		else
			do
				local b6 = 0
				while b6 < self:GetAbilityCount() do
					local a0 = self:GetAbilityByIndex(b6)
					if IsValid(a0) and a0:GetAbilityTag() == b5 then
						return a0
					end
					b6 = b6 + 1
				end
			end
		end
	end
	CDOTA_BaseNPC.EachAbility = function(self, aA)
		local b7 = { AbilityTag.Attack, AbilityTag.Skill, AbilityTag.Dodge, AbilityTag.Defense, AbilityTag.Ultimate }
		for w = 0, #b7 - 1, 1 do
			local aX = b7[w + 1]
			local a0 = self:GetAbilityByTag(aX)
			if IsValid(a0) then
				aA(a0, aX)
			end
		end
	end
	if CDOTA_BaseNPC.AddItem_Engine == nil then
		CDOTA_BaseNPC.AddItem_Engine = CDOTA_BaseNPC.AddItem
	end
	if CDOTA_BaseNPC.AddItemByName_Engine == nil then
		CDOTA_BaseNPC.AddItemByName_Engine = CDOTA_BaseNPC.AddItemByName
	end
	if CDOTA_BaseNPC.RemoveItem_Engine == nil then
		CDOTA_BaseNPC.RemoveItem_Engine = CDOTA_BaseNPC.RemoveItem
	end
	CDOTA_BaseNPC.AddItem = function(self, b8, b9)
		if b9 == nil then
			b9 = true
		end
		if self.__items == nil then
			self.__items = {}
		end
		self:AddItem_Engine(b8)
		b8:__OnCreated()
		local ba = self.__items
		ba[#ba + 1] = {
			entIndex = b8:entindex(),
			itemName = b8:GetAbilityName(),
			level = b8:GetLevel(),
			stackCount = b8.__StackCount or 0,
			charge = b8.__Charge or 0,
			maxCharge = b8:GetMaxCharges(),
			chargeRestoreTime = b8.__ChargeRestoreTime or 0,
			isChargeCooldownFrozen = b8:IsChargeCooldownFrozen(),
			chargeFrozenCooldownRemaining = b8:GetChargeCooldownRemaining(),
		}
		self:TakeItem(b8)
		Event:Fire("item_added", { unit = self, item = b8 })
		if b9 then
			self:UpdateAbilityNetData()
		end
		return b8
	end
	CDOTA_BaseNPC.AddItemByName = function(self, bb, _, b9)
		if _ == nil then
			_ = 1
		end
		if b9 == nil then
			b9 = true
		end
		if self.__items == nil then
			self.__items = {}
		end
		local b8 = self:AddItemByName_Engine(bb)
		b8:__OnCreated()
		if _ > 1 then
			b8:SetLevel(_, false)
		end
		local bc = self.__items
		bc[#bc + 1] = {
			entIndex = b8:entindex(),
			itemName = b8:GetAbilityName(),
			level = b8:GetLevel(),
			stackCount = b8.__StackCount or 0,
			charge = b8.__Charge or 0,
			maxCharge = b8:GetMaxCharges(),
			chargeRestoreTime = b8.__ChargeRestoreTime or 0,
			isChargeCooldownFrozen = b8:IsChargeCooldownFrozen(),
			chargeFrozenCooldownRemaining = b8:GetChargeCooldownRemaining(),
		}
		self:TakeItem(b8)
		Event:Fire("item_added", { unit = self, item = b8 })
		if b9 then
			self:UpdateAbilityNetData()
		end
		return b8
	end
	CDOTA_BaseNPC.RemoveItem = function(self, b8)
		if self.__items == nil then
			self.__items = {}
		end
		if not IsValid(b8) then
			return
		end
		Event:Fire("item_consumed", { unit = self, item = b8 })
		b8:__OnDestroy()
		self.__items = f(self.__items, function(bd, aP)
			return aP.entIndex ~= b8:entindex()
		end)
		self:RemoveItem_Engine(b8)
		Event:Fire("item_removed", { unit = self, item = b8 })
		self:UpdateAbilityNetData()
	end
	CDOTA_BaseNPC.RemoveAllItem = function(self)
		if self.__items == nil then
			self.__items = {}
		end
		local be = self:GetAllItems()
		g(be, function(bd, b8)
			if IsValid(b8) then
				b8:__OnDestroy()
				self.__items = f(self.__items or {}, function(bd, aP)
					return aP.entIndex ~= b8:entindex()
				end)
				self:RemoveItem_Engine(b8)
				Event:Fire("item_removed", { unit = self, item = b8 })
			end
		end)
		self.__items = {}
		CustomNetTables:SetNetData("unit", tostring(self:entindex()), nil)
	end
	CDOTA_BaseNPC.GetAllItems = function(self)
		local bf = {}
		if self.__items == nil then
			self.__items = {}
		end
		g(self.__items, function(bd, aP)
			local b8 = EntIndexToHScript(aP.entIndex)
			if IsValid(b8) then
				bf[#bf + 1] = b8
			end
		end)
		return bf
	end
	CDOTA_BaseNPC.GetItemByName = function(self, bb)
		if self.__items == nil then
			self.__items = {}
		end
		local b8
		h(self.__items, function(bd, aP)
			if aP.itemName == bb then
				b8 = EntIndexToHScript(aP.entIndex)
			end
		end)
		return b8
	end
	CDOTA_BaseNPC.GetItemByNameAndLevel = function(self, bb, _)
		if self.__items == nil then
			self.__items = {}
		end
		local b8
		h(self.__items, function(bd, aP)
			if aP.itemName == bb and aP.level == _ then
				b8 = EntIndexToHScript(aP.entIndex)
			end
		end)
		return b8
	end
	CDOTA_BaseNPC.HasItem = function(self, bb)
		if self.__items == nil then
			self.__items = {}
		end
		return i(self.__items, function(bd, aP)
			return aP.itemName == bb
		end)
	end
	CDOTA_BaseNPC.GetItemCount = function(self, bb)
		if self.__items == nil then
			self.__items = {}
		end
		return #f(self.__items, function(bd, aP)
			return aP.itemName == bb
		end)
	end
	CDOTA_BaseNPC.UpdateAbilityNetData = function(self)
		if not self:IsRealHero() then
			return
		end
		if self.__items == nil then
			self.__items = {}
		end
		g(self.__items, function(bd, aP)
			local b8 = EntIndexToHScript(aP.entIndex)
			if IsValid(b8) then
				b8:UpdateRuntimeNetData()
			end
		end)
		local bg = {}
		local bh = self:GetAbilityByTag(AbilityTag.Attack)
		if bh then
			bg[#bg + 1] = bh
		end
		local bi = self:GetAbilityByTag(AbilityTag.Skill)
		if bi then
			bg[#bg + 1] = bi
		end
		local bj = self:GetAbilityByTag(AbilityTag.Dodge)
		if bj then
			bg[#bg + 1] = bj
		end
		local bk = self:GetAbilityByTag(AbilityTag.Defense)
		if bk then
			bg[#bg + 1] = bk
		end
		local bl = self:GetAbilityByTag(AbilityTag.Ultimate)
		if bl then
			bg[#bg + 1] = bl
		end
		g(bg, function(bd, a0)
			return a0:UpdateRuntimeNetData()
		end)
		CustomNetTables:SetNetData(
			"unit",
			tostring(self:entindex()),
			{
				items = h(self.__items, function(bd, b8)
					return { entIndex = b8.entIndex, itemName = b8.itemName }
				end),
				abilities = h(bg, function(bd, a0)
					return { entIndex = a0:entindex() or -1, abilityName = a0:GetAbilityName() }
				end),
			}
		)
	end
	CDOTA_BaseNPC.CallAbilityCreated = function(self)
		do
			local w = 0
			while w < self:GetAbilityCount() do
				local a0 = self:GetAbilityByIndex(w)
				if IsValid(a0) then
					a0:__OnCreated()
				end
				w = w + 1
			end
		end
	end
	CDOTA_BaseNPC.CallAbilityRefresh = function(self)
		do
			local w = 0
			while w < self:GetAbilityCount() do
				local a0 = self:GetAbilityByIndex(w)
				if IsValid(a0) then
					a0:__OnRefresh()
				end
				w = w + 1
			end
		end
	end
	CDOTA_BaseNPC.CallAbilityDestroy = function(self)
		do
			local w = 0
			while w < self:GetAbilityCount() do
				local a0 = self:GetAbilityByIndex(w)
				if IsValid(a0) then
					a0:__OnDestroy()
				end
				w = w + 1
			end
		end
		self:RemoveAllItem()
	end
	CDOTA_BaseNPC.ChangeWeapon = function(self, bm)
		if self.__weapon ~= nil then
			self.__weapon:RemoveSelf()
			self.__weapon = nil
		end
		local ap = KeyValues.weapon[bm]
		if ap == nil then
			return
		end
		self.__weapon = SpawnEntityFromTableSynchronous(
			"dota_prop_customtexture",
			{
				targetname = bm,
				model = ap.model,
				StartingAnim = "ACT_DOTA_IDLE",
				StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING",
			}
		)
		local bn = KeyValues.weapon_asset_modifier[bm]
		self.__weapon.__asset_modifier = {}
		if bn ~= nil then
			if bn.particle_color ~= nil then
				self.__weapon.__asset_modifier.particle_color = RGBStringToVector(bn.particle_color)
			end
		end
		self.__weapon:FollowEntity(self, true)
		self:CheckNoDraw(self.__weapon)
	end
	CDOTA_BaseNPC.SetWeaponVisible = function(self, bo)
		self.__weapon_hidden = not bo
		if IsValid(self.__weapon) then
			self:CheckNoDraw(self.__weapon)
		end
	end
	CDOTA_BaseNPC.EquipCosmetic = function(self, bp)
		bp = tostring(bp)
		local ap = KeyValues.info_item_cosmetic[bp]
		if ap == nil then
			return
		end
		local bq = tostring(ap.type)
		if self.__cosmetics == nil then
			self.__cosmetics = {}
		end
		if bq == "MISC" then
			local x = { id = bp }
			local br = self.__cosmetics[bq]
			if br ~= nil then
				br[#br + 1] = x
			else
				self.__cosmetics[bq] = { x }
			end
			self:AddActivityModifier(bp)
			Cosmetic:RegisterParticleReplacements(self, bq, bp)
			if ap.model == nil then
				return
			end
			local bs = SpawnEntityFromTableSynchronous(
				"dota_prop_customtexture",
				{
					targetname = bp,
					model = ap.model,
					StartingAnim = "ACT_DOTA_IDLE",
					StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING",
				}
			)
			bs:FollowEntity(self, true)
			x.entity = bs
			return
		end
		self:UnequipCosmeticByType(bq, nil, true)
		self.__cosmetics[bq] = { id = bp }
		self:AddActivityModifier(bp)
		Cosmetic:RegisterParticleReplacements(self, bq, bp)
		print(bq, "kv.particle", ap.particle)
		if ap.particle ~= nil then
			local bt = ParticleManager:CreateParticle(tostring(ap.particle), PATTACH_ABSORIGIN_FOLLOW, self)
			self.__cosmetics[bq].particleId = bt
			return
		end
		if ap.model == nil then
			return
		end
		local bs = SpawnEntityFromTableSynchronous(
			"dota_prop_customtexture",
			{
				targetname = bp,
				model = ap.model,
				StartingAnim = "ACT_DOTA_IDLE",
				StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING",
			}
		)
		bs:FollowEntity(self, true)
		self.__cosmetics[bq].entity = bs
	end
	CDOTA_BaseNPC.UnequipCosmeticByType = function(self, bq, bp, bu)
		if self.__cosmetics == nil then
			self.__cosmetics = {}
		end
		if bq == "MISC" then
			local bv = self.__cosmetics[bq]
			if bv == nil then
				return
			end
			if bp ~= nil then
				do
					local w = #bv - 1
					while w >= 0 do
						if bv[w + 1].id == bp then
							self:RemoveActivityModifier(bv[w + 1].id)
							Cosmetic:UnregisterParticleReplacements(self, bq)
							if bv[w + 1].entity ~= nil and IsValid(bv[w + 1].entity) then
								bv[w + 1].entity:RemoveSelf()
							end
							table.remove(bv, w)
							break
						end
						w = w - 1
					end
				end
				if #bv == 0 then
					j(self.__cosmetics, bq)
				end
			else
				do
					local w = #bv - 1
					while w >= 0 do
						self:RemoveActivityModifier(bv[w + 1].id)
						Cosmetic:UnregisterParticleReplacements(self, bq)
						if bv[w + 1].entity ~= nil and IsValid(bv[w + 1].entity) then
							bv[w + 1].entity:RemoveSelf()
						end
						w = w - 1
					end
				end
				j(self.__cosmetics, bq)
			end
			return
		end
		local bw = self.__cosmetics[bq]
		if bw == nil then
			return
		end
		self:RemoveActivityModifier(bw.id)
		Cosmetic:UnregisterParticleReplacements(self, bq)
		if bw.particleId ~= nil then
			ParticleManager:DestroyParticle(bw.particleId, true)
		end
		if bw.entity ~= nil and IsValid(bw.entity) then
			bw.entity:RemoveSelf()
		end
		j(self.__cosmetics, bq)
		if not bu then
			local bx = self:GetPlayerOwnerID()
			local by = tostring(PlayerResource:GetSelectedHeroID(bx))
			for bz, bA in pairs(KeyValues.info_item_cosmetic) do
				do
					local x = bA
					if tostring(x.type) ~= bq then
						goto bB
					end
					if tostring(x.default) ~= "1" then
						goto bB
					end
					local bC = x.hero_id ~= nil and tostring(x.hero_id) or nil
					if bC == nil or bC == by then
						self:EquipCosmetic(bz)
						break
					end
				end
				::bB::
			end
		end
	end
	CDOTA_BaseNPC.CheckNoDraw = function(self, bs)
		local bo = not self.__NODAW
		if self.__weapon_hidden then
			bo = false
		end
		if IsValid(bs) then
			if bo then
				bs:RemoveEffects(EF_NODRAW)
			else
				bs:AddEffects(EF_NODRAW)
			end
		end
	end
	if CDOTA_BaseNPC.AddNoDraw_Engine == nil then
		CDOTA_BaseNPC.AddNoDraw_Engine = CDOTA_BaseNPC.AddNoDraw
	end
	if CDOTA_BaseNPC.RemoveNoDraw_Engine == nil then
		CDOTA_BaseNPC.RemoveNoDraw_Engine = CDOTA_BaseNPC.RemoveNoDraw
	end
	CDOTA_BaseNPC.AddNoDraw = function(self)
		self.__NODAW = true
		self:CheckNoDraw(self.__weapon)
		self:AddNoDraw_Engine()
	end
	CDOTA_BaseNPC.RemoveNoDraw = function(self)
		self.__NODAW = false
		self:CheckNoDraw(self.__weapon)
		self:RemoveNoDraw_Engine()
	end
	CDOTA_BaseNPC.AddShield = function(self, bD, T, bE, bF)
		if bD <= 0 then
			return
		end
		local R = CalculateEquivalentDefenseIntensity(self)
		bD = bD
			* (1 + GetShieldAmplify(self) * 0.01)
			* (1 + R * INTENSITY_FACTOR * 0.01)
			* GetFinalGainMultiplier(nil, self, "shield_reduction_mul")
		if bD <= 0 then
			return
		end
		local bG = T or DoUniqueString("shield")
		local bH = bE or "override"
		local bI = bF or "normal"
		self:AddNewModifier(self, nil, "modifier_shield", { shield = bD, id = bG, method = bH, type = bI })
	end
	CDOTA_BaseNPC.RemoveShield = function(self, T)
		if T == nil then
			self:RemoveModifierByName("modifier_shield")
		else
			local U = self:FindModifierByName("modifier_shield")
			if IsValid(U) then
				U:RemoveShield(T)
			end
		end
	end
	CDOTA_BaseNPC.ReduceShield = function(self, M, T, bJ)
		if M <= 0 then
			return
		end
		local U = self:FindModifierByName("modifier_shield")
		if not IsValid(U) then
			return
		end
		U:ReduceShield(M, T, bJ)
	end
	CDOTA_BaseNPC.AddProperty = function(self, D, bK, bL)
		if bL == nil then
			bL = ""
		end
		local bM = PROPERTY_MAP_REVERSE[D]
		local bN = bM ~= nil
		if bN then
			local bO = PropertySystem
			local bP = PropertySystem.AddStaticProperty
			local bQ = k(self:entindex(), bM, DoUniqueString("static_property"), bK)
			local bR
			if bL == "" then
				bR = nil
			else
				bR = { source = bL }
			end
			l(bQ, bR)
			bN = bP(bO, m(bQ))
		end
		if bN then
			Event:Fire("property_added", { unit = self, property = D, value = bK, source = bL })
		end
	end
	CDOTA_BaseNPC.EnergyStrike = function(self, bS, bT, a0, bU, aT, an, av)
		av = av or {}
		local bL = av.source or self
		local bV = av.jumpDelay or 0
		local bW = av.jumpCount or 0
		local bX = av.jumpRadius or 600
		local a1 = av.attachName or "attach_attack1"
		local bY = av.soundName or "Hero_Zuus.ArcLightning.Cast"
		local function bZ(bL, aS, b_)
			self:DealDamage(aS, a0, aT)
			if type(an) == "function" then
				an(bL, aS, b_)
			else
				local bt = ParticleManager:CreateParticle(an, PATTACH_CUSTOMORIGIN, nil)
				ParticleManager:SetParticleControlEnt(
					bt,
					0,
					bL,
					PATTACH_POINT_FOLLOW,
					b_ and a1 or "attach_hitloc",
					bL:GetAbsOrigin(),
					false
				)
				ParticleManager:SetParticleControlEnt(
					bt,
					1,
					aS,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					aS:GetAbsOrigin(),
					false
				)
				ParticleManager:ReleaseParticleIndex(bt)
			end
			EmitSoundOnLocationWithCaster(bL:GetAbsOrigin(), bY, self)
		end
		local c0 = { bS }
		if bU > 0 then
			local c1 = FindUnitsInRadiusWithAbility(self, bS:GetAbsOrigin(), bT, a0)
			ArrayRemove(c1, bS)
			for c2, P in ipairs(c1) do
				table.insert(c0, P)
				bU = bU - 1
				if bU <= 0 then
					break
				end
			end
		end
		local c3 = {}
		local c4 = bW - 1
		for c2, P in ipairs(c0) do
			local c5 = P
			bZ(bL, c5, true)
			table.insert(c3, P)
			if c4 > 0 then
				c4 = c4 - 1
				self:GameTimer(bV, function()
					local c6 = FindUnitsInRadiusWithAbility(self, c5:GetAbsOrigin(), bX, a0, FIND_CLOSEST)
					for c2, c7 in ipairs(c3) do
						ArrayRemove(c6, c7)
					end
					local c8 = c6[1]
					if IsValid(c8) then
						bZ(c5, c8, false)
						table.insert(c3, c8)
						if c4 > 0 then
							c5 = c8
							return bV
						end
					end
				end)
			end
		end
	end
	CDOTA_BaseNPC.AddExpose = function(self, aS, c9)
		if c9 == nil then
			c9 = 1
		end
		local U = aS:AddNewModifier(self, nil, "modifier_expose", { stack = c9, duration = 3 })
		local ca = IsValid(U) and U:GetStackCount() or 0
		Event:Fire("expose_event", { target = aS, caster = self, addStack = c9, stack = ca })
	end
	CDOTA_BaseNPC.IsExpose = function(self)
		local U = self:FindModifierByName("modifier_expose")
		return IsValid(U)
	end
	CDOTA_BaseNPC.AddIceMark = function(self, aS, c9)
		if c9 == nil then
			c9 = 1
		end
		local U = aS:AddNewModifier(self, nil, "modifier_ice_mark", { stack = c9, duration = 3 })
		local cb = IsValid(U) and U:GetStackCount() or 0
		Event:Fire("ice_mark_event", { target = aS, caster = self, addStack = c9, stack = cb })
	end
	CDOTA_BaseNPC.IsIceMark = function(self)
		local U = self:FindModifierByName("modifier_ice_mark")
		return IsValid(U)
	end
	CDOTA_BaseNPC.ArcLightning = function(self, aS, aT, cc)
		if cc == nil then
			cc = false
		end
		local cd = BlessPerformance.Enabled
		local ce = GameRules:GetGameTime()
		if cd then
			BlessPerformance:Increment("arc_calls")
		end
		local c0 = FindUnitsInRadius(
			self:GetTeamNumber(),
			aS:GetAbsOrigin(),
			nil,
			900,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
			DOTA_UNIT_TARGET_FLAG_NONE,
			FIND_CLOSEST,
			false
		)
		ArrayRemove(c0, aS)
		table.insert(c0, 1, aS)
		local cf = self
		local cg = 3
		local ch = ShouldPlayLightningPresentation("arc", aS:GetAbsOrigin(), ce)
		if
			self.__arcLightningSoundTime == nil
			or ce - self.__arcLightningSoundTime >= ARC_LIGHTNING_SOUND_COOLDOWN_SECONDS
		then
			self.__arcLightningSoundTime = ce
			self:EmitSound("Bless.ArcLightning")
		end
		for w, aY in ipairs(c0) do
			if cd then
				BlessPerformance:Increment("arc_hits")
			end
			if ch then
				if cd then
					BlessPerformance:Increment("arc_particles")
				end
				local bt = ParticleManager:CreateParticle(
					"particles/units/benediction/zuus_arc_lightning.vpcf",
					PATTACH_CUSTOMORIGIN,
					self
				)
				if w == 0 then
					ParticleManager:SetParticleControlEnt(
						bt,
						0,
						cf,
						PATTACH_POINT_FOLLOW,
						"attach_attack1",
						cf:GetAbsOrigin(),
						false
					)
				else
					ParticleManager:SetParticleControlEnt(
						bt,
						0,
						cf,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						cf:GetAbsOrigin(),
						false
					)
				end
				ParticleManager:SetParticleControlEnt(
					bt,
					1,
					aY,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					aY:GetAbsOrigin(),
					false
				)
				ParticleManager:ReleaseParticleIndex(bt)
			end
			self:DealDamage(aY, nil, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE)
			if PRD(nil, self, GetLightningExposeChance(self), "ArcLightning") then
				self:AddExpose(aY)
			end
			cg = cg - 1
			if cg <= 0 then
				break
			end
			cf = aY
		end
		if not cc then
			local ci = GetLightningCount(self)
			if ci > 0 then
				local cj = FindUnitsInRadius(
					self:GetTeamNumber(),
					aS:GetAbsOrigin(),
					nil,
					900,
					DOTA_UNIT_TARGET_TEAM_ENEMY,
					DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
					DOTA_UNIT_TARGET_FLAG_NONE,
					FIND_ANY_ORDER,
					false
				)
				ArrayRemove(cj, aS)
				local ck = 0
				for c2, P in ipairs(cj) do
					self:ArcLightning(P, aT, true)
					ck = ck + 1
					if ck >= ci then
						break
					end
				end
			end
		end
	end
	CDOTA_BaseNPC.LightningStrike = function(self, aS, aT, L)
		if L == nil then
			L = EOM_DAMAGE_FLAGS.NONE
		end
		local cd = BlessPerformance.Enabled
		if cd then
			BlessPerformance:Increment("lightning_requests")
		end
		local ce = GameRules:GetGameTime()
		L = bit.bor(L, EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE)
		local cl = GetLightningRadius(self)
		local cm = aS:GetAbsOrigin()
		local c0 = {}
		if cl > 0 then
			c0 = FindEnemiesInRadius(self, cm, cl)
		else
			c0 = { aS }
		end
		if cl > 0 then
			local cn = ArrayRemove(c0, aS)
			if cn ~= nil then
				table.insert(c0, 1, cn)
			end
		end
		local co = self.__lightningStrikeHitTime == ce and (self.__lightningStrikeTargetHitCount or 0) or 0
		local cp = math.max(0, MAX_LIGHTNING_STRIKE_TARGET_HITS_PER_FRAME - co)
		if #c0 > cp then
			local cq = #c0 - cp
			if cd then
				BlessPerformance:Increment("lightning_dropped", cq)
			end
			c0 = n(c0, 0, cp)
		end
		if #c0 == 0 then
			return
		end
		self.__lightningStrikeHitTime = ce
		self.__lightningStrikeTargetHitCount = co + #c0
		if cd then
			BlessPerformance:Increment("lightning_aoe_hits", #c0)
		end
		for w, P in ipairs(c0) do
			if P == aS then
				self:DealDamage(P, nil, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, L)
			else
				self:DealDamage(P, nil, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, bit.bor(L, EOM_DAMAGE_FLAGS.NO_EXPOSE))
			end
		end
		if
			self.__lightningStrikeEffectWindowStart == nil
			or ce - self.__lightningStrikeEffectWindowStart >= LIGHTNING_STRIKE_EFFECT_LIMIT_INTERVAL_SECONDS
		then
			self.__lightningStrikeEffectWindowStart = ce
			self.__lightningStrikeSoundCount = 0
		end
		if (self.__lightningStrikeSoundCount or 0) < MAX_LIGHTNING_STRIKE_SOUNDS_PER_WINDOW then
			self.__lightningStrikeSoundCount = (self.__lightningStrikeSoundCount or 0) + 1
			self:EmitSound("Bless.LightningStrike", cm)
		end
		if ShouldPlayLightningPresentation("strike", cm, ce) then
			if cd then
				BlessPerformance:Increment("lightning_particles", 2)
			end
			local bt = ParticleManager:CreateParticle(
				"particles/units/benediction/zuus_lightning_bolt.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(bt, 0, cm + Vector(0, 0, 900))
			ParticleManager:SetParticleControl(bt, 1, cm)
			ParticleManager:ReleaseParticleIndex(bt)
			bt = ParticleManager:CreateParticle(
				"particles/units/benediction/zuus_lightning_bolt_aoe.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(bt, 0, cm)
			ParticleManager:SetParticleControl(bt, 1, Vector(cl, 0, 0))
			ParticleManager:ReleaseParticleIndex(bt)
		end
		local cr = GetLightningMultipleChance(self)
		if PRD(nil, self, cr, "LightningStrike") then
			self:StartThink(0.25, "LightningStrike", function()
				if IsValid(aS) then
					self:LightningStrike(aS, aT, L)
				end
				return -1
			end)
		end
		Event:Fire("lightning_strike", { caster = self, target = aS, damage = aT })
	end
	CDOTA_BaseNPC.LightningStorm = function(self, aS, aT)
		local s = aS:GetAbsOrigin()
		local bt = ParticleManager:CreateParticle(
			"particles/units/benediction/leshrac_lightning_bolt.vpcf",
			PATTACH_ABSORIGIN,
			self
		)
		ParticleManager:SetParticleControl(bt, 0, s + Vector(0, 0, 1000))
		ParticleManager:SetParticleControlEnt(bt, 1, aS, PATTACH_POINT_FOLLOW, "attach_hitloc", aS:GetAbsOrigin(), true)
		ParticleManager:ReleaseParticleIndex(bt)
		self:EmitSound("Hero_Leshrac.Lightning_Storm")
		self:DealDamage(
			aS,
			nil,
			aT,
			EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
			EOM_DAMAGE_FLAGS.LIGHTNING_DAMAGE + EOM_DAMAGE_FLAGS.NO_EXPOSE
		)
		Event:Fire("lightning_storm", { caster = self, target = aS, damage = aT })
	end
	CDOTA_BaseNPC.LightningCloud = function(self, ac)
		local cs = ac * (1 + GetLightningCloudDuration(self) * 0.01)
		self:AddNewModifier(self, nil, "modifier_lightning_cloud", { duration = cs })
	end
	CDOTA_BaseNPC.CallSword = function(self, cg, ct, cu, cv)
		if ct == nil then
			ct = 0
		end
		if cu == nil then
			cu = 0
		end
		if cv == nil then
			cv = false
		end
		if self.__swordGroup == nil then
			self.__swordGroup = {}
		end
		do
			local w = #self.__swordGroup - 1
			while w >= 0 do
				local cw = self.__swordGroup[w + 1]
				if Bullet:GetBulletData(cw) == nil then
					d(self.__swordGroup, w, 1)
				end
				w = w - 1
			end
		end
		cg = math.min(cg, MAX_CALL_SWORD_GROUP_SIZE - #self.__swordGroup)
		if cg <= 0 then
			return
		end
		local a6 = self
		local aT = SWORD_DAMAGE * (1 + ct * 0.01)
		local cx = Bullet:CreateGroupSurroundBullet(cg, {
			caster = a6,
			group = "CallSword" .. tostring(a6:entindex()),
			circleRadius = 120,
			angularVelocity = 180,
			offset = 128,
			lifeTime = 5,
			interval = 1,
			ParticleCreator = function(cy)
				local bt =
					ParticleManager:CreateParticle("particles/abilities/custom_sword.vpcf", PATTACH_CUSTOMORIGIN, nil)
				ParticleManager:SetParticleControlEnt(
					bt,
					0,
					cy.__thinker,
					PATTACH_ABSORIGIN_FOLLOW,
					nil,
					cy.__thinker:GetAbsOrigin(),
					true
				)
				ParticleManager:SetParticleControlEnt(bt, 1, a6, PATTACH_ABSORIGIN_FOLLOW, nil, a6:GetAbsOrigin(), true)
				return bt
			end,
			OnIntervalThink = function(cy)
				if not IsValid(a6) then
					return
				end
				local aS = FindEnemiesInRadius(a6, a6:GetAbsOrigin(), 1200)[1]
				if IsValid(aS) then
					local cz = cy.__position
					cz.z = a6:GetAbsOrigin().z + 128
					local cA = o(a6.__swordGroup, cy.__projIndex)
					Bullet:DestroyBulletByID(cy.__projIndex)
					local cB = Bullet:CreateGuidedBullet({
						caster = a6,
						target = aS,
						direction = CalcDirection2D(cz, a6),
						effectName = "particles/generic_gameplay/talent_sword_projectile.vpcf",
						spawnOrigin = cz,
						angularVelocity = 360,
						ignoreBlock = true,
						radius = 64,
						moveSpeed = 1500,
						teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
						typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
						OnBulletThink = function(s, cy)
							cy.angularVelocity = cy.angularVelocity + 20
							if IsValid(cy.target) and not cy.target:IsAlive() then
								cy.target = nil
							end
						end,
						OnBulletHit = function(P, s, cy)
							a6:DealDamage(
								P,
								nil,
								aT,
								EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
								EOM_DAMAGE_FLAGS.NO_CRIT + EOM_DAMAGE_FLAGS.SWORD
							)
							if cu > 0 then
								local cC = cy.__thinker:GetAbsOrigin()
								DoCleaveAction(
									a6,
									P,
									100,
									200,
									cu,
									function(cD)
										if cD == P then
											return
										end
										a6:DealDamage(
											cD,
											nil,
											aT,
											EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
											EOM_DAMAGE_FLAGS.NO_CRIT + EOM_DAMAGE_FLAGS.SWORD
										)
									end,
									DOTA_UNIT_TARGET_TEAM_ENEMY,
									DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_HERO,
									nil,
									cC
								)
								local cE = ParticleManager:CreateParticle(
									"particles/econ/items/sven/sven_ti7_sword/sven_ti7_sword_spell_great_cleave.vpcf",
									PATTACH_WORLDORIGIN,
									cy.__thinker
								)
								ParticleManager:SetParticleControl(cE, 0, cC)
								ParticleManager:SetParticleControlForward(cE, 0, P:GetAbsOrigin() - cC)
								ParticleManager:ReleaseParticleIndex(cE)
							end
							Bullet:DestroyBullet(cy)
						end,
					})
					if cA >= 0 then
						if cB ~= nil then
							a6.__swordGroup[cA + 1] = cB
						else
							d(a6.__swordGroup, cA, 1)
						end
					end
					self:EmitSound("Hero_Pangolier.PreAttack")
				end
				return 0.1
			end,
		})
		self.__swordGroup = p(self.__swordGroup, cx)
		Event:Fire("call_sword", { caster = self, extra = cv })
	end
	CDOTA_BaseNPC.SwordWave = function(self, cF, ak, aT, cG)
		if cG == nil then
			cG = 0
		end
		local a6 = self
		local cH = 1 + GetBladeSpeedAmplify(a6) * 0.01
		local cI = cH > 1 and 5 or 0
		local cJ = 1 + cG * SWORD_INTENT_PCT_PER_STACK * 0.01
		local al = 800 * cJ * cH + GetBulletRange(self)
		local cK = a6:HasItem("item_crit_blade")
		Bullet:CreateLinearBullet({
			caster = a6,
			spawnOrigin = cF,
			direction = ak,
			moveSpeed = 3000,
			distance = al,
			destroyOnBounce = true,
			bounce = cI,
			effectName = "particles/units/benediction/invoker_deafening_blast.vpcf",
			radius = 200,
			teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
			typeFilter = UNIT_AND_BUILDING,
			OnBulletBounceEnd = function(cy)
				ParticleManager:DestroyParticle(cy.__particleID, false)
				local bt = ParticleManager:CreateParticle(cy.effectName, PATTACH_CUSTOMORIGIN, cy.caster)
				ParticleManager:SetParticleControlTransformForward(bt, 0, cy.__position, cy.__velocity:Normalized())
				ParticleManager:SetParticleControl(bt, 1, cy.__velocity)
				cy.__particleID = bt
			end,
			OnBulletThink = function(s, cy)
				if cK then
					local cL = Bullet:GetBulletInLine(cy.__previous or cy.__position, cy.__position, 200)
					a6:ShootDown(cL)
				end
			end,
			OnBulletHit = function(aS)
				local cM = aT * cJ * cH
				local b4 = {
					attacker = a6,
					target = aS,
					damage = cM,
					damage_type = EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
					damage_flags = EOM_DAMAGE_FLAGS.BLADE,
					damage_category = DOTA_DAMAGE_CATEGORY_BARRIER,
				}
				a6:DealDamage(
					aS,
					nil,
					cM * (1 + GetBladeDamageAmplify(a6, b4) * 0.01),
					EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
					EOM_DAMAGE_FLAGS.BLADE
				)
			end,
		})
		a6:EmitSound("Hero_Kez.FalconRush.Sai.Target")
	end
	CDOTA_BaseNPC.SwordCircle = function(self, aT, cJ)
		if cJ == nil then
			cJ = 1
		end
		local a6 = self
		local cN = 300 * (1 + GetAoeAmplify(self) * 0.01)
		local cK = a6:HasItem("item_crit_blade")
		local cH = 1 + GetBladeSpeedAmplify(a6) * 0.01
		local cO = cN * cJ * cH
		local cM = aT * cJ * cH
		local c0 = FindEnemiesInRadius(a6, a6:GetAbsOrigin(), cO)
		for bd, aS in ipairs(c0) do
			local b4 = {
				attacker = a6,
				target = aS,
				damage = cM,
				damage_type = EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
				damage_flags = EOM_DAMAGE_FLAGS.BLADE,
				damage_category = DOTA_DAMAGE_CATEGORY_BARRIER,
			}
			a6:DealDamage(
				aS,
				nil,
				cM * (1 + GetBladeDamageAmplify(a6, b4) * 0.01),
				EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
				EOM_DAMAGE_FLAGS.BLADE
			)
		end
		if cK then
			local cL = Bullet:GetBulletInRadius(a6:GetAbsOrigin(), cO)
			a6:ShootDown(cL)
		end
		local bt = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_kez/kez_hungering_blades.vpcf",
			PATTACH_ABSORIGIN,
			a6
		)
		ParticleManager:SetParticleControl(bt, 2, Vector(cO, 0, 0))
		ParticleManager:ReleaseParticleIndex(bt)
		a6:EmitSound("Hero_Kez.RaptorDance.Katana.Slash")
	end
	CDOTA_BaseNPC.Frozen = function(self, aS, cP)
		if cP == nil then
			cP = 1
		end
		if cP == 0 then
			return
		end
		local U = aS:AddNewModifier(self, nil, "modifier_frozen_debuff", { stack = cP, entIndex = self:entindex() })
		local c9 = IsValid(U) and U:GetStackCount() or 0
		Event:Fire("frozen_event", { target = aS, caster = self, addStack = cP, stack = c9 })
	end
	CDOTA_BaseNPC.IsFrozen = function(self)
		return self:HasModifier("modifier_frozen_debuff")
	end
	CDOTA_BaseNPC.Freeze = function(self, aS, ac)
		if aS:IsBoss() or aS:HasState(StateEnum.CONTROL_IMMUNE) then
			return
		end
		aS:AddNewModifier(self, nil, "modifier_freeze_debuff", { duration = ac })
	end
	CDOTA_BaseNPC.IsFreeze = function(self)
		return self:HasModifier("modifier_freeze_debuff")
	end
	CDOTA_BaseNPC.TriggerDecayOnce = function(self)
		local U = self:FindModifierByName("modifier_frozen_debuff")
		if IsValid(U) then
			return U:TriggerDecayOnce()
		end
	end
	CDOTA_BaseNPC.GetFrozenStack = function(self, a6)
		local U = self:FindModifierByName("modifier_frozen_debuff")
		if IsValid(U) then
			return U:GetIceStack(a6:entindex())
		end
		return 0
	end
	CDOTA_BaseNPC.FrozenBurst = function(self, aT, cQ, s, cv)
		if cv == nil then
			cv = false
		end
		local c0 = FindUnitsInRadius(
			self:GetTeamNumber(),
			s,
			nil,
			200,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			UNIT_AND_BUILDING,
			DOTA_UNIT_TARGET_FLAG_NONE,
			FIND_ANY_ORDER,
			false
		)
		local cR = GetFrozenBurstStack(self)
		local cS = cQ + cR
		for w, P in ipairs(c0) do
			self:Frozen(P, cQ + cR)
			self:DealDamage(P, nil, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE)
		end
		local bt = ParticleManager:CreateParticle(
			"particles/units/benediction/lich_frost_nova.vpcf",
			PATTACH_CUSTOMORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(bt, 0, s)
		ParticleManager:SetParticleControl(bt, 1, Vector(200, 200, 200))
		ParticleManager:ReleaseParticleIndex(bt)
		Event:Fire(
			"frozen_burst",
			{ caster = self, position = s, base_frozen_stack = cQ, added_frozen = cS, targets = c0, extra = cv }
		)
	end
	CDOTA_BaseNPC.CreateIceVortex = function(self, s, aT, cQ, ac)
		local cT, cU = self, "__iceVortexThinkers"
		if cT[cU] == nil then
			cT[cU] = {}
		end
		local cV = self.__iceVortexThinkers
		local cW = {}
		do
			local b6 = #cV - 1
			while b6 >= 0 do
				do
					local cX = cV[b6 + 1]
					if not IsValid(cX) then
						d(cV, b6, 1)
						goto cY
					end
					local cZ = cX:FindModifierByName("modifier_ice_vortex_custom")
					if not IsValid(cZ) then
						d(cV, b6, 1)
						goto cY
					end
					if cZ:CanMerge(s) then
						cW[#cW + 1] = cZ
					end
				end
				::cY::
				b6 = b6 - 1
			end
		end
		if #cW > 0 then
			local c_ = cW[1]
			c_:Merge(s, aT, cQ, ac)
			do
				local b6 = 1
				while b6 < #cW do
					do
						local cZ = cW[b6 + 1]
						if not IsValid(cZ) then
							goto d0
						end
						local d1 = cZ
						c_:Merge(d1:GetParent():GetAbsOrigin(), d1.damage, d1.frozen, d1:GetRemainingTime(), d1.radius)
						d1:Destroy()
					end
					::d0::
					b6 = b6 + 1
				end
			end
			return
		end
		CreateModifierThinker(
			self,
			nil,
			"modifier_ice_vortex_custom",
			{ entIndex = self:entindex(), damage = aT, frozen = cQ, duration = ac, radius = 275 },
			s,
			self:GetTeamNumber(),
			false
		)
	end
	CDOTA_BaseNPC.ThrowBloodSpear = function(self, aS, a0, aT, cv)
		if cv == nil then
			cv = false
		end
		if not IsValid(aS) or not aS:IsAlive() then
			return
		end
		Bullet:CreateTrackingBullet({
			caster = self,
			target = aS,
			ability = a0,
			effectName = "particles/units/benediction/huskar_burning_spear.vpcf",
			moveSpeed = 900,
			spawnOrigin = self:GetAttachmentPosition("attach_hitloc"),
			OnBulletHit = function(d2)
				local cM = toFiniteNumber(aT)
				self:Bleed(d2, cM)
				if cM > 0 then
					self:DealDamage(d2, a0, cM, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE)
				end
				Event:Fire("blood_spear", { caster = self, target = d2 })
				self:EmitSound("Hero_BrewMaster.CinderBrew.Ignite", d2:GetAbsOrigin())
			end,
		})
	end
	CDOTA_BaseNPC.ThrowSnowball = function(self, aS, a0, cQ, aT, cv)
		if cv == nil then
			cv = false
		end
		if not IsValid(aS) or not aS:IsAlive() then
			return
		end
		local d3 = GetSnowballBounceCount(self)
		Bullet:CreateTrackingBullet({
			caster = self,
			target = aS,
			ability = nil,
			effectName = "particles/units/benediction/snowball_projectile.vpcf",
			moveSpeed = 900,
			spawnOrigin = self:GetAttachmentPosition("attach_hitloc"),
			OnBulletHit = function(aS, s, cy)
				self:Frozen(aS, cQ)
				local b0 = toFiniteNumber(aT)
				aT = b0 + GetSnowballDamage(self, { target = aS, damage = b0 })
				if aT > 0 then
					self:DealDamage(aS, a0, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE)
				end
				self:EmitSound("FrostivusConsumable.Snowball.Target", aS:GetAbsOrigin())
				if d3 > 0 then
					local c0 = FindEnemiesInRadius(self, s, 500, FIND_CLOSEST)
					ArrayRemove(c0, aS)
					if #c0 > 0 then
						cy.target = c0[1]
						if cy.__particleID ~= nil then
							ParticleManager:SetParticleControlTransformForward(
								cy.__particleID,
								0,
								s,
								cy.__velocity:Normalized()
							)
							ParticleManager:SetParticleControlEnt(
								cy.__particleID,
								1,
								cy.target,
								PATTACH_POINT_FOLLOW,
								"attach_hitloc",
								cy.target:GetAbsOrigin(),
								false
							)
						end
						d3 = d3 - 1
						return false
					end
				end
			end,
		})
		Event:Fire("throw_snowball", { caster = self, target = aS, extra = cv })
	end
	CDOTA_BaseNPC.IceStrike = function(self, aS, a0, aT, cv)
		if aT == nil then
			aT = 0
		end
		if cv == nil then
			cv = false
		end
		if not IsValid(aS) or not aS:IsAlive() then
			return
		end
		local d4 = IsValid(a0)
		if d4 then
			local d5 = KeyValues.items[a0:GetAbilityName()]
			if d5 ~= nil then
				d5 = d5.Access
			end
			d4 = d5 == "Bless"
		end
		if d4 and not self:CanTriggerProc("bless_ice_strike", 0.1) then
			return
		end
		local bt = ParticleManager:CreateParticleWithCaster(
			"particles/generic_gameplay/sect_ice_freezing_attack.vpcf",
			PATTACH_CUSTOMORIGIN,
			nil,
			self,
			ParticleEffectLevel.Low
		)
		if bt ~= -1 then
			ParticleManager:SetParticleControlEnt(bt, 0, aS, PATTACH_ABSORIGIN_FOLLOW, nil, aS:GetAbsOrigin(), false)
			ParticleManager:SetParticleControl(
				bt,
				1,
				aS:GetAbsOrigin() + RandomVector(RandomInt(0, 150)) + Vector(0, 0, 1200)
			)
			ParticleManager:ReleaseParticleIndex(bt)
		end
		self:StartThink(0.2, DoUniqueString("ice_delay"), function()
			if IsValid(aS) and IsValid(self) then
				local bx = self:GetPlayerOwnerID()
				if Privilege:HasPrivilege("privilege_myth_005", bx) then
					local bT = Privilege:GetPlayerDynamicValue("privilege_myth_005", bx, "value")
					local d6 = FindEnemiesInRadius(self, aS:GetAbsOrigin(), bT, FIND_CLOSEST)
					self:DealDamage(d6, a0, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE)
				else
					self:DealDamage(aS, a0, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, EOM_DAMAGE_FLAGS.FREEZE_DAMAGE)
				end
				self:EmitSound("Frostivus.Item.Snowball.Target", aS:GetAbsOrigin())
			end
			return -1
		end)
		Event:Fire("ice_strike", { caster = self, target = aS, extra = cv })
	end
	CDOTA_BaseNPC.Bleed = function(self, aS, c9)
		aS:AddNewModifier(self, nil, "modifier_bleed", { stack = c9, entIndex = self:entindex() })
	end
	CDOTA_BaseNPC.IsBleed = function(self)
		local U = self:FindModifierByName("modifier_bleed")
		return IsValid(U)
	end
	CDOTA_BaseNPC.GetBleedStack = function(self, a6)
		local U = self:FindModifierByName("modifier_bleed")
		if IsValid(U) then
			return U:GetBleedStack(a6:entindex())
		end
		return 0
	end
	CDOTA_BaseNPC.TriggerBleed = function(self, a6, cJ)
		if cJ == nil then
			cJ = 1
		end
		local U = self:FindModifierByName("modifier_bleed")
		if IsValid(U) then
			return U:TriggerBleed(a6, cJ)
		end
	end
	CDOTA_BaseNPC.Burning = function(self, aS, a0, c9)
		aS:AddNewModifier(
			self,
			a0,
			"modifier_burning",
			{ stack = math.floor(c9), entIndex = self:entindex(), duration = 5 }
		)
	end
	CDOTA_BaseNPC.IsBurning = function(self)
		local U = self:FindModifierByName("modifier_burning")
		return IsValid(U)
	end
	CDOTA_BaseNPC.GetBurningStack = function(self, a6)
		local U = self:FindModifierByName("modifier_burning")
		if IsValid(U) then
			return U:GetBurningStack(a6:entindex())
		end
		return 0
	end
	CDOTA_BaseNPC.TriggerBurning = function(self, a6)
		local U = self:FindModifierByName("modifier_burning")
		if IsValid(U) then
			return U:TriggerBurning(a6)
		end
	end
	CDOTA_BaseNPC.AddInvulnerable = function(self, ac)
		self:AddNewModifier(self, nil, "modifier_invulnerable_buff", { duration = ac })
	end
	CDOTA_BaseNPC.CreateWisp = function(self, au, a_)
		local U = self:AddNewModifier(self, nil, "modifier_wisps", { unit_name = au })
		if IsValid(U) then
			return U:CreateWisp(au, a_)
		end
	end
	CDOTA_BaseNPC.RemoveWisp = function(self, d7)
		local U = self:FindModifierByName("modifier_wisps")
		if IsValid(U) then
			U:RemoveWisp(d7)
		end
	end
	CDOTA_BaseNPC.ShootDown = function(self, d8, d9)
		if d9 == nil then
			d9 = self:HasItem("item_holy_reflect")
		end
		local aT = GetReflectDamage(self)
		for w, cy in ipairs(d8) do
			if IsValid(cy.caster) and Bullet:IsReflectable(cy) and not cy.caster:IsFriendly(self) then
				if Bullet:IsLinearBullet(cy) then
					if d9 then
						Bullet:CreateLinearBullet({
							caster = self,
							direction = -cy.direction:Normalized(),
							spawnOrigin = cy.__position,
							effectName = cy.effectName,
							moveSpeed = cy.moveSpeed * 3,
							radius = cy.radius,
							distance = cy.distance,
							teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
							typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
							OnBulletHit = function(aS, s, cy)
								self:DealDamage(
									aS,
									nil,
									aT,
									EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE,
									EOM_DAMAGE_FLAGS.REFLECT_DAMAGE
								)
							end,
							ParticleCreator = cy.ParticleCreator,
						})
					end
					Bullet:DestroyBulletByID(cy.__projIndex)
				elseif Bullet:IsGuidedBullet(cy) then
					if d9 then
						Bullet:CreateGuidedBullet({
							caster = self,
							direction = -cy.__velocity:Normalized(),
							effectName = cy.effectName,
							spawnOrigin = cy.__position,
							moveSpeed = cy.moveSpeed * 3,
							radius = cy.radius,
							lifeTime = cy.lifeTime,
							teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
							typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
							OnBulletHit = function(aS, s, cy)
								self:DealDamage(aS, nil, aT)
								return true
							end,
							ParticleCreator = cy.ParticleCreator,
						})
					end
					Bullet:DestroyBulletByID(cy.__projIndex)
				end
			end
		end
		if #d8 > 0 then
			Event:Fire("avoid_damage", { unit = self })
		end
	end
	CDOTA_BaseNPC.Weaken = function(self, aS, c9)
		if c9 == nil then
			c9 = 1
		end
		aS:AddNewModifier(self, nil, "modifier_weak_debuff", { stack = c9, duration = WEAK_DURATION })
	end
	CDOTA_BaseNPC.IsWeaken = function(self)
		local U = self:FindModifierByName("modifier_weak_debuff")
		return IsValid(U)
	end
	CDOTA_BaseNPC.GetWeakenStack = function(self, a6)
		local U = self:FindModifierByName("modifier_weak_debuff")
		if IsValid(U) then
			return U:GetWeakenStack(a6:entindex())
		end
		return 0
	end
	CDOTA_BaseNPC.AddExecuteThreshold = function(self, aS, c9)
		aS:AddNewModifier(self, nil, "modifier_execute_threshold", { stack = math.floor(c9), duration = 5 })
	end
	CDOTA_BaseNPC.IsBoss = function(self)
		return q(self:GetUnitLabel(), "boss")
	end
	CDOTA_BaseNPC.IsElite = function(self)
		return self:HasModifier("modifier_elite")
	end
	CDOTA_BaseNPC.IsCreep = function(self)
		return q(self:GetUnitLabel(), "creep")
	end
end
if IsServer() then
	CDOTA_BaseNPC.SimulateCast = function(self, da)
		self:RemoveModifierByName("modifier_simulate_cast")
		local aB = da.castPoint or 0
		local ac = math.max(da.duration or 0, aB or 0)
		local aP = {
			duration = ac,
			castPoint = aB,
			castAnimation = da.castAnimation,
			orderType = da.orderType,
			animationRate = da.animationRate or 1,
			animationFadeIn = da.animationFadeIn,
			animationFadeOut = da.animationFadeOut,
			position = da.position and VectorToString(da.position) or nil,
			targetIndex = IsValid(da.target) and da.target:entindex() or nil,
			activityModifier = da.activityModifier,
		}
		local U = self:AddNewModifier(self, nil, "modifier_simulate_cast", aP)
		if IsValid(U) then
			U.OnSpellStart = da.OnSpellStart
			U.OnFinish = da.OnFinish
		end
	end
end
if IsServer() then
	CDOTA_BaseNPC.PushOff = function(self, s)
		if self:HasState(StateEnum.KNOCKBACK_IMMUNE) or self:HasState(StateEnum.CONTROL_IMMUNE) then
			return
		end
		self:SetAbsOrigin(s)
		local db = self:GetHullRadius() + 50
		local dc = FindEnemiesInRadius(self, s, db)
		for bd, aS in ipairs(dc) do
			aS:KnockBack(CalcDirection2D(aS, s), db - CalcDistance(aS, s), 0, 0.06)
		end
		FindClearSpaceForUnit(self, s, true)
	end
end
if IsServer() then
	CDOTA_BaseNPC.IsCasting = function(self)
		return self:IsChanneling()
			or self:HasModifier("modifier_simulate_cast")
			or self:HasModifier("modifier_passive_cast")
			or self:GetCurrentActiveAbility() ~= nil
	end
end
BaseNPC.IsHealthy = function(self)
	return self:GetHealthPercent() >= HEALTHY_PCT
end
BaseNPC.IsLowHealth = function(self)
	return self:GetHealthPercent() <= LOW_HEALTH_PCT
end
BaseNPC.IsCloseRange = function(self, aS)
	return CalcDistance(self, aS) <= CLOSE_RANGE
end
BaseNPC.IsFarRange = function(self, aS)
	return CalcDistance(self, aS) >= FAR_RANGE
end
if IsServer() then
	CDOTA_BaseNPC.Poison = function(self, aS, c9)
		if c9 <= 0 then
			return
		end
		aS:AddNewModifier(self, nil, "modifier_poison_custom", { stack = c9, entIndex = self:entindex() })
		Event:Fire("poison_event", { target = aS, caster = self, addStack = c9, stack = aS:GetPoisonStack(self) })
	end
	CDOTA_BaseNPC.IsPoisoned = function(self)
		local U = self:FindModifierByName("modifier_poison_custom")
		return IsValid(U)
	end
	CDOTA_BaseNPC.GetPoisonStack = function(self, a6)
		local U = self:FindModifierByName("modifier_poison_custom")
		if IsValid(U) then
			return U:GetPoisonStack(a6:entindex())
		end
		return 0
	end
	CDOTA_BaseNPC.TriggerPoison = function(self, a6)
		local U = self:FindModifierByName("modifier_poison_custom")
		return U and U:TriggerPoison(a6)
	end
	CDOTA_BaseNPC.PoisionBottle = function(self, ac, dd, bT, de)
		if bT == nil then
			bT = 100
		end
		if de == nil then
			de = 180
		end
		if self.__poisonGroup == nil then
			self.__poisonGroup = {}
		end
		local bx = self:GetPlayerOwnerID()
		if Privilege:HasPrivilege("privilege_myth_024", bx) then
			local bK = Privilege:GetPrivilegeSpecialValue("privilege_myth_024", 1, "value", self)
			ac = ac * (1 + bK * 0.01)
			dd = dd * (1 + bK * 0.01)
		end
		do
			local w = #self.__poisonGroup - 1
			while w >= 0 do
				local df = self.__poisonGroup[w + 1]
				if Bullet:GetBulletData(df) == nil then
					d(self.__poisonGroup, w, 1)
				end
				w = w - 1
			end
		end
		while POISON_BOTTLE_MAX_COUNT > 0 and #self.__poisonGroup >= POISON_BOTTLE_MAX_COUNT do
			local dg = 0
			local dh = math.huge
			do
				local w = 0
				while w < #self.__poisonGroup do
					local cy = Bullet:GetBulletData(self.__poisonGroup[w + 1])
					local di = cy and cy.__lifeTimeRemaining
					if di == nil then
						di = 0
					end
					local dj = di
					if dj < dh then
						dh = dj
						dg = w
					end
					w = w + 1
				end
			end
			local df = self.__poisonGroup[dg + 1]
			d(self.__poisonGroup, dg, 1)
			Bullet:DestroyBulletByID(df)
		end
		local cx = Bullet:CreateGroupSurroundBullet(1, {
			caster = self,
			group = "PoisionBottle" .. tostring(self:entindex()),
			circleRadius = bT,
			angularVelocity = de,
			offset = 128,
			lifeTime = ac,
			effectName = "particles/abilities/dupingzi.vpcf",
			interval = 1,
			teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
			typeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
			radius = 100,
			OnBulletCreated = function(cy)
				cy.poisionStack = dd
			end,
			OnBulletThink = function(s, cy)
				if cy.circleRadius < bT then
					cy.circleRadius = cy.circleRadius + 1
				end
			end,
			OnBulletHit = function(aS, dk, cy)
				local dl = toFiniteNumber(cy.poisionStack)
				self:Poison(aS, dl)
				if Privilege:HasPrivilege("privilege_suit_026", self:GetPlayerOwnerID()) then
					cy.poisionStack = dl
						+ Privilege:GetPrivilegeSpecialValue("privilege_suit_026", 1, "extra_count", self)
				end
			end,
			OnBulletDestroy = function(cy)
				cy.poisionStack = nil
			end,
		})
		self.__poisonGroup = p(self.__poisonGroup, cx)
		return cx
	end
	CDOTA_BaseNPC.ThrowPoisonBottle = function(self, s, a0, dm, ac)
		local cF = self:GetAbsOrigin()
		local al = CalcDistance(s, cF)
		local dn = ac or al / 900
		local dp = dn > 0 and al / dn or 900
		Bullet:CreateLinearBullet({
			spawnOrigin = self:GetAbsOrigin(),
			moveSpeed = dp,
			direction = CalcDirection2D(s, self),
			distance = al,
			ParticleCreator = function()
				local bt = ParticleManager:CreateParticle(
					"particles/units/benediction/bottle_poison.vpcf",
					PATTACH_CUSTOMORIGIN,
					nil
				)
				ParticleManager:SetParticleControl(bt, 0, self:GetAbsOrigin())
				ParticleManager:SetParticleControl(bt, 1, s)
				ParticleManager:SetParticleControl(bt, 2, Vector(dp, 0, 0))
				return bt
			end,
			OnBulletDestroy = function(cy)
				self:PoisonPool(cy.__position, toFiniteNumber(dm))
			end,
		})
	end
	CDOTA_BaseNPC.PoisonPool = function(self, s, c9, bT)
		if bT == nil then
			bT = 200
		end
		CreateModifierThinker(
			self,
			nil,
			"modifier_poison_pool",
			{ entIndex = self:entindex(), duration = 3, radius = bT, stack = c9 },
			s,
			self:GetTeamNumber(),
			false
		)
		Event:Fire("poison_pool_event", { caster = self, position = s })
	end
end
if IsServer() then
	CDOTA_BaseNPC.Laser = function(self, ak, aT, L)
		if L == nil then
			L = EOM_DAMAGE_FLAGS.NONE
		end
		L = bit.bor(L, EOM_DAMAGE_FLAGS.SHIELD_DAMAGE)
		local al = LASER_LENGTH + GetBulletRange(self)
		local a6 = self
		local cI = GetLaserBounceCount(a6) + GetBounceCount(a6)
		local ac = 0.1
		local dq = a6:HasItem("item_holy_auto")
		local dr
		dr = function(ds, dt, du)
			Bullet:CreateLinearBullet({
				caster = a6,
				spawnOrigin = ds,
				direction = dt,
				radius = LASER_WIDTH,
				teamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY,
				typeFilter = UNIT_AND_BUILDING,
				flagFilter = DOTA_UNIT_TARGET_FLAG_NONE,
				moveSpeed = al / ac,
				distance = al,
				thinker = true,
				bounce = du,
				OnBulletHit = function(P)
					a6:DealDamage(P, nil, aT, EOM_DAMAGE_TYPES.DAMAGE_TYPE_NONE, L)
				end,
				OnBulletBounceEnd = function(cy)
					cy.__lifeTimeRemaining = ac
					local bt = ParticleManager:CreateParticle(
						"particles/units/benediction/holy_laser.vpcf",
						PATTACH_CUSTOMORIGIN,
						nil
					)
					ParticleManager:SetParticleControl(bt, 9, Bullet:GetData(cy.__projIndex, "bounce_position", ds))
					ParticleManager:SetParticleControl(bt, 1, cy.__position)
					Bullet:SaveData(cy.__projIndex, "bounce_position", cy.__position)
					print("OnBulletBounceEnd", du)
				end,
				OnBulletDestroy = function(cy)
					local bt = ParticleManager:CreateParticle(
						"particles/units/benediction/holy_laser.vpcf",
						PATTACH_CUSTOMORIGIN,
						nil
					)
					ParticleManager:SetParticleControl(bt, 9, Bullet:GetData(cy.__projIndex, "bounce_position", ds))
					ParticleManager:SetParticleControl(bt, 1, cy.__position)
					local dv = cy.bounce or 0
					if dv <= 0 then
						return
					end
					local dw = cy.__position
					local dx = dw + RandomVector(al)
					if dq then
						local c0 = FindEnemiesInRadius(a6, dw, al, FIND_ANY_ORDER)
						local aS = GetRandomElement(c0)
						if IsValid(aS) then
							dx = aS:GetAbsOrigin() + RandomVector(aS:GetHullRadius())
						end
					end
					dr(dw, CalcDirection2D(dx, dw), dv - 1)
				end,
			})
		end
		a6:EmitSound("Hero_Tinker.LaserImpact")
		dr(a6:GetAbsOrigin() + Vector(0, 0, 75), ak, cI)
	end
end