--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "mechanics/hunt_field_buff"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ArrayMap
local e = b.__TS__ArraySlice
local f = b.__TS__New
local g = b.__TS__ArraySetLength
local h = b.__TS__ArraySort
local i = b.__TS__ArrayIncludes
local j = b.__TS__ArrayFilter
local k = b.__TS__ObjectValues
local l = b.__TS__ArraySplice
local m = b.__TS__ArrayFind
local n = b.__TS__ArrayEvery
local o = {}
local p = require("class.weight_pool")
local q = p.CWeightPool
local r = require("class.drop_item")
local s = r.DropItem
local t = require("mechanics.hunt_field_effects")
local u = t.CHuntFieldEffects
local v = require("mechanics.hunt_field_config")
local w = v.HUNT_FIXED_MODIFIERS
local x = v.GetHuntFieldBuffConfig
local y = v.GetHuntFieldEffectError
local z = v.ParseHuntFixedAffixes
local A = require("class.dungeon_helper")
local B = A.AnalyzeCenterPositions
o.CHuntBossFieldBuffManager = c()
local C = o.CHuntBossFieldBuffManager
C.name = "CHuntBossFieldBuffManager"
function C.prototype.____constructor(self)
	self.logPrefix = "[HuntBossFieldBuff]"
	self.buffConfigById = {}
	self.previousRandomAffixIds = {}
	self.currentFixedAffixIds = {}
	self.currentRandomAffixIds = {}
	self.isBattleActive = false
	self.fixedAffixHeroes = {}
	self.validGridPositions = {}
	self.getBattleEnemies = function()
		return {}
	end
end
function C.prototype.LoadConfigs(self, D)
	self:Reset()
	self.buffConfigById = self:ParseFieldBuffConfigs()
	local E = KeyValues.hunt_difficulty_affix
	if E ~= nil then
		E = E[tostring(D)]
	end
	local F = E
	if F == nil then
		self:Error("missing difficulty affix config difficulty=" .. tostring(D))
		return false
	end
	local G = z
	local H = tostring
	local I = F.FixedAffixes
	if I == nil then
		I = ""
	end
	local J = G(nil, H(I))
	if J == nil then
		self:Error("invalid or duplicate fixed affix levels difficulty=" .. tostring(D))
		return false
	end
	local K = d(J, function(L, M)
		return M.id
	end)
	for L, N in ipairs(J) do
		local O = N.id
		local P = N.level
		local Q = x(nil, O, P)
		local R = self.buffConfigById[O]
		if (R and R.type) ~= 1 or Q == nil or O ~= "potion" and w[O] == nil then
			self:Error(
				(((("invalid fixed affix difficulty=" .. tostring(D)) .. " id=") .. O) .. " level=") .. tostring(P)
			)
			return false
		end
		self.buffConfigById[O] = Q
	end
	local S = math.floor(toFiniteNumber(F.FieldBuffCount, -1))
	local T = self:GetRandomPool().ValidCount
	if S < 0 or S > T then
		self:Error(
			(
				((("invalid random affix count difficulty=" .. tostring(D)) .. " count=") .. tostring(S))
				.. " candidates="
			) .. tostring(T)
		)
		return false
	end
	if S > 0 and S == T then
		self:Error(
			(("random affix candidates permit only one combination difficulty=" .. tostring(D)) .. " count=")
				.. tostring(S)
		)
		return false
	end
	self.difficultyAffix = { fixedAffixIds = K, fieldBuffCount = S }
	return true
end
function C.prototype.PrepareNextLevel(self, P)
	local U = self.nextLevelSelection
	if (U and U.level) == P then
		return true
	end
	if self.difficultyAffix == nil then
		self:Error("PrepareNextLevel called before LoadConfigs")
		return false
	end
	local V = self:DrawRandomAffixes(self.difficultyAffix.fieldBuffCount)
	if V == nil then
		return false
	end
	self.nextLevelSelection = { level = P, ids = V }
	return true
end
function C.prototype.GetNextLevelBuffs(self)
	local W = self.GetBuffPreviews
	local X = self.nextLevelSelection
	return W(self, X and X.ids or {})
end
function C.prototype.GetFixedBuffs(self)
	local Y = self.GetBuffPreviews
	local Z = self.difficultyAffix
	return Y(self, Z and Z.fixedAffixIds or {})
end
function C.prototype.GetCurrentLevelBuffs(self)
	return self:GetBuffPreviews(self.currentRandomAffixIds)
end
function C.prototype.GetBuffPreviews(self, V)
	return d(V, function(L, O)
		local Q = self.buffConfigById[O]
		return { id = O, level = Q.level }
	end)
end
function C.prototype.PrepareLevel(self, P)
	if self.difficultyAffix == nil then
		self:Error("PrepareLevel called before LoadConfigs")
		return false
	end
	self:EndLevel()
	if not self:PrepareNextLevel(P) then
		return false
	end
	local _ = self.nextLevelSelection.ids
	self.nextLevelSelection = nil
	self.currentLevel = P
	self.currentFixedAffixIds = e(self.difficultyAffix.fixedAffixIds)
	self.currentRandomAffixIds = _
	self.previousRandomAffixIds = e(_)
	if self.battleCenter == nil then
		self:EndLevel()
		return false
	end
	self.fieldEffects = f(
		u,
		d(_, function(L, O)
			return self.buffConfigById[O]
		end),
		{
			center = self.battleCenter,
			validGridPositions = self.validGridPositions,
			heroes = function()
				return self.fixedAffixHeroes
			end,
			enemies = self.getBattleEnemies,
		}
	)
	if not self:CreatePotionEffect() then
		self:EndLevel()
		return false
	end
	self:Print(
		(
			(
				((("prepared level=" .. tostring(P)) .. " fixed=[") .. table.concat(self.currentFixedAffixIds, ","))
				.. "] random=["
			) .. table.concat(self.currentRandomAffixIds, ",")
		) .. "]"
	)
	return true
end
function C.prototype.StartRun(self, a0, a1, a2)
	self:RemoveFixedAffixModifiers()
	self.fixedAffixHeroes = e(a0)
	self.battleCenter = a1
	self.validGridPositions = B(nil, { center = a1, rings = 3, gridSize = GRID_SIZE })
	self:Print("grid analyzed count=" .. tostring(#self.validGridPositions))
	self.getBattleEnemies = a2
	local a3 = self.difficultyAffix
	for L, a4 in ipairs(a3 and a3.fixedAffixIds or {}) do
		do
			local Q = self.buffConfigById[a4]
			if Q == nil or Q.time > 0 then
				goto a5
			end
			for L, a6 in ipairs(self.fixedAffixHeroes) do
				do
					if not IsValid(a6) then
						goto a7
					end
					local a8 = w[a4]
					if a8 ~= nil then
						a6:AddNewModifier(
							a6,
							nil,
							a8,
							{ reducePct = Q.params.ReducePct or 0, freezePct = Q.params.FreezePct or 400 }
						)
					end
				end
				::a7::
			end
		end
		::a5::
	end
end
function C.prototype.StartOrResumeBattle(self)
	if self.currentLevel == nil or self.isBattleActive then
		return
	end
	self.isBattleActive = true
	local a9 = self.potion
	if a9 ~= nil then
		a9:SetPaused(false)
	end
	local aa = self.fieldEffects
	if aa ~= nil then
		aa:SetPaused(false)
	end
	self:Print("resumed level=" .. tostring(self.currentLevel))
end
function C.prototype.PauseBattle(self)
	if not self.isBattleActive then
		return
	end
	self.isBattleActive = false
	local ab = self.potion
	if ab ~= nil then
		ab:SetPaused(true)
	end
	local ac = self.fieldEffects
	if ac ~= nil then
		ac:SetPaused(true)
	end
	self:Print("paused level=" .. tostring(self.currentLevel))
end
function C.prototype.EndLevel(self)
	if self.currentLevel ~= nil then
		self:Print("cleared level=" .. tostring(self.currentLevel))
	end
	self.isBattleActive = false
	local ad = self.fieldEffects
	self.fieldEffects = nil
	if ad ~= nil then
		ad:Dispose()
	end
	local ae = self.potion
	if ae ~= nil then
		ae:SetPaused(true)
	end
	self.currentLevel = nil
	self.currentFixedAffixIds = {}
	self.currentRandomAffixIds = {}
end
function C.prototype.Reset(self)
	self:RemoveFixedAffixModifiers()
	self.difficultyAffix = nil
	self.buffConfigById = {}
	self.previousRandomAffixIds = {}
	self.nextLevelSelection = nil
	self.battleCenter = nil
	self.getBattleEnemies = function()
		return {}
	end
	self:EndLevel()
	local af = self.potion
	if af ~= nil then
		af:Dispose()
	end
	self.potion = nil
	g(self.validGridPositions, 0)
end
function C.prototype.GetCurrentFixedAffixIds(self)
	return self.currentFixedAffixIds
end
function C.prototype.Update(self)
	local ag = self.potion
	if ag ~= nil then
		ag:Update()
	end
end
function C.prototype.GetCurrentRandomAffixIds(self)
	return self.currentRandomAffixIds
end
function C.prototype.ParseFieldBuffConfigs(self)
	local ah = {}
	local ai = KeyValues.hunt_field_buff
	local aj = pairs
	local ak = ai
	if ak == nil then
		ak = {}
	end
	for al in aj(ak) do
		do
			local O = tostring(al)
			local Q = x(nil, O)
			if Q == nil then
				self:Error("invalid buff configuration id=" .. O)
				goto am
			end
			if Q.weight < 0 or Q.type == 1 and Q.weight ~= 0 then
				self:Error(
					(((("invalid buff weight id=" .. O) .. " type=") .. tostring(Q.type)) .. " weight=")
						.. tostring(Q.weight)
				)
				goto am
			end
			if Q.type == 2 and not self:ValidateRandomEffect(O, Q.params) then
				goto am
			end
			ah[O] = Q
		end
		::am::
	end
	return ah
end
function C.prototype.ValidateRandomEffect(self, O, an)
	local ao = y(nil, O, an)
	if not u:Supports(O) or ao ~= nil then
		self:Error((("invalid random effect parameters id=" .. O) .. ": ") .. (ao or "unsupported effect"))
		return false
	end
	return true
end
function C.prototype.GetRandomPool(self)
	local ap = f(q)
	for O, Q in pairs(self.buffConfigById) do
		if Q.type == 2 and Q.weight > 0 then
			ap:Set(O, Q.weight)
		end
	end
	return ap
end
function C.prototype.DrawRandomAffixes(self, aq)
	if aq == 0 then
		return {}
	end
	local ap = self:GetRandomPool()
	if ap.ValidCount < aq then
		self:Error(
			(("insufficient random candidates count=" .. tostring(aq)) .. " candidates=") .. tostring(ap.ValidCount)
		)
		return nil
	end
	local ar = #self.previousRandomAffixIds == aq
	do
		local as = 1
		while as <= 16 do
			local at = h(ap:MultipleRandomWithoutReplacement(aq))
			if not ar or not self:IsSameCombination(at, self.previousRandomAffixIds) then
				return at
			end
			as = as + 1
		end
	end
	self:Error("unable to draw a combination distinct from previous level")
	return nil
end
function C.prototype.IsSameCombination(self, au, av)
	if #au ~= #av then
		return false
	end
	do
		local aw = 0
		while aw < #au do
			if au[aw + 1] ~= av[aw + 1] then
				return false
			end
			aw = aw + 1
		end
	end
	return true
end
function C.prototype.CreatePotionEffect(self)
	if not i(self.currentFixedAffixIds, "potion") then
		return true
	end
	if self.potion ~= nil and not self.potion:IsDisposed() then
		return true
	end
	local Q = self.buffConfigById.potion
	if Q == nil or self.battleCenter == nil then
		self:Error("missing potion configuration")
		return false
	end
	self.potion = f(o.CHuntPotionSupply, Q, self.validGridPositions, function()
		return self.fixedAffixHeroes
	end)
	return not self.potion:IsDisposed()
end
function C.prototype.RemoveHero(self, a6)
	self.fixedAffixHeroes = j(self.fixedAffixHeroes, function(L, ax)
		return ax ~= a6
	end)
	if not IsValid(a6) then
		return
	end
	for L, a8 in ipairs(k(w)) do
		a6:RemoveModifierByName(a8)
	end
end
function C.prototype.RemoveFixedAffixModifiers(self)
	for L, a6 in ipairs(self.fixedAffixHeroes) do
		do
			if not IsValid(a6) then
				goto ay
			end
			for L, a8 in ipairs(k(w)) do
				a6:RemoveModifierByName(a8)
			end
		end
		::ay::
	end
	self.fixedAffixHeroes = {}
end
function C.prototype.Print(self, az)
	print((self.logPrefix .. " ") .. az)
end
function C.prototype.Error(self, az)
	print((self.logPrefix .. " ERROR ") .. az)
end
local aA = 200
local aB = 240
o.CHuntPotionSupply = c()
local aC = o.CHuntPotionSupply
aC.name = "CHuntPotionSupply"
function aC.prototype.____constructor(self, Q, aD, a0)
	self.paused = true
	self.stopped = false
	self.disposed = false
	self.elapsedTime = 0
	self.lastUpdateTime = GameRules:GetGameTime()
	self.nextRetryTime = 0
	self.pendingCount = 0
	self.itemPool = f(q)
	self.drops = {}
	self.positions = aD
	self.heroes = a0
	self.interval = Q.params.Interval or 0
	self.count = math.floor(Q.params.Count or 0)
	self.lifetime = Q.params.Lifetime or 0
	self.nextTriggerTime = Q.time
	for L, aE in ipairs({ "item_health_potion_1", "item_health_potion_2", "item_health_potion_3" }) do
		local aF = Q.params[aE] or 0
		if aF > 0 and KeyValues.items[aE] ~= nil then
			self.itemPool:Set(aE, aF)
		end
	end
	if self.interval <= 0 or self.count <= 0 or self.lifetime <= 0 or self.itemPool.ValidCount <= 0 then
		self:Dispose()
		return
	end
end
function aC.prototype.IsDisposed(self)
	return self.disposed
end
function aC.prototype.SetPaused(self, aG)
	self.paused = aG
	self.lastUpdateTime = GameRules:GetGameTime()
end
function aC.prototype.Stop(self)
	self.stopped = true
	self:SetPaused(false)
	if #self.drops == 0 then
		self:Dispose()
	end
end
function aC.prototype.Update(self)
	local aH = GameRules:GetGameTime()
	local aI = math.max(0, aH - self.lastUpdateTime)
	self.lastUpdateTime = aH
	if self.disposed or self.paused then
		return
	end
	self.elapsedTime = self.elapsedTime + aI
	if not self.stopped then
		while self.elapsedTime >= self.nextTriggerTime do
			self.pendingCount = self.pendingCount + self.count
			self.nextTriggerTime = self.nextTriggerTime + self.interval
		end
		if self.pendingCount > 0 and self.elapsedTime >= self.nextRetryTime then
			self:SpawnBatch()
			self.nextRetryTime = self.elapsedTime + 0.5
		end
	end
	local a0 = j(self:heroes(), function(L, a6)
		return IsValid(a6) and a6:IsAlive() and a6:IsRealHero()
	end)
	do
		local aw = #self.drops - 1
		while aw >= 0 do
			do
				local aJ = self.drops[aw + 1]
				local aK = aJ.dropItem
				if aK.isDispose or not IsValid(aK.entity) or self.elapsedTime >= aJ.expiresAt then
					aK:dispose()
					l(self.drops, aw, 1)
					goto aL
				end
				if not aK:IsLanded() then
					goto aL
				end
				local a6 = m(a0, function(L, a6)
					return CalcDistance(a6, aK.entity) <= aA
				end)
				if a6 == nil then
					goto aL
				end
				a6:AddItemByName(aK.itemName)
				if self.disposed then
					return
				end
				aK:dispose()
				l(self.drops, aw, 1)
			end
			::aL::
			aw = aw - 1
		end
	end
	if self.stopped and #self.drops == 0 then
		self:Dispose()
	end
end
function aC.prototype.Dispose(self)
	if self.disposed then
		return
	end
	self.disposed = true
	for L, aJ in ipairs(self.drops) do
		aJ.dropItem:dispose()
	end
	self.drops = {}
end
function aC.prototype.SpawnBatch(self)
	local a0 = j(self:heroes(), function(L, a6)
		return IsValid(a6) and a6:IsAlive()
	end)
	local aM = math.min(self.pendingCount, self.count)
	do
		local aw = 0
		while aw < aM do
			local aN = GetRandomElement(j(self.positions, function(L, aN)
				return GridNav:IsValidPosition(aN)
					and n(a0, function(L, a6)
						return CalcDistance(aN, a6) >= aB
					end)
					and n(self.drops, function(L, aJ)
						return aJ.dropItem.isDispose or CalcDistance(aN, aJ.dropItem.position) >= 96
					end)
			end))
			local aE = self.itemPool:Random()
			if aN == nil or aE == nil then
				break
			end
			local aO = GetGroundPosition(aN, nil)
			local aP = f(s, aE, aO)
			local aQ = self.drops
			aQ[#aQ + 1] = { dropItem = aP, expiresAt = self.elapsedTime + self.lifetime }
			self.pendingCount = self.pendingCount - 1
			aw = aw + 1
		end
	end
end
return o