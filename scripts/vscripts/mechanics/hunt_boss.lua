--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "mechanics/hunt_boss"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__New
local f = b.__TS__ArrayIncludes
local g = b.__TS__NumberIsFinite
local h = b.__TS__ArrayFilter
local i = b.__TS__ArrayMap
local j = b.__TS__ArraySome
local k = b.__TS__ArraySplice
local l = b.__TS__ObjectAssign
local m = b.__TS__ArraySlice
local n = b.__TS__ArrayIndexOf
local o = b.__TS__Delete
local p = b.__TS__ArrayEvery
local q = b.__TS__StringStartsWith
local r = b.__TS__StringSubstring
local s = b.__TS__StringEndsWith
local t = b.__TS__DecorateLegacy
local u = {}
local v = require("class.weight_pool")
local w = v.CWeightPool
local x = require("lib.tstl-utils")
local y = x.reloadable
local z = require("mechanics.hunt_field_buff")
local A = z.CHuntBossFieldBuffManager
local B = "prefabs/gem_dungeon"
local C = "abyss"
local D = "gem_dungeon_enter"
local E = 64
local F = 30
local G = 0.1
local H = 1
local I = 4096
local J = c()
J.name = "CHuntBossBattle"
d(J, CModule)
function J.prototype.____constructor(self, ...)
	CModule.prototype.____constructor(self, ...)
	self.logPrefix = "[HuntBossBattle]"
	self.runId = 0
	self.waveSpawnId = 0
	self.isLoading = false
	self.isRunning = false
	self.isFinished = false
	self.phase = "inactive"
	self.participantPlayerIds = {}
	self.activeParticipantPlayerIds = {}
	self.entryPositionsByPlayerId = {}
	self.intermissionReadyPlayerIds = {}
	self.enemyPools = {}
	self.levelConfigByNumber = {}
	self.healthFactor = 1
	self.damageFactor = 1
	self.difficultyCooldownReduction = 0
	self.difficultyBossGapAmplify = 0
	self.currentDifficulty = 0
	self.keyIntensitiesByPlayerId = {}
	self.currentLevel = 1
	self.currentWave = 0
	self.maxLevel = 1
	self.pendingEnemySpawnCount = 0
	self.enemies = {}
	self.bossSlots = {}
	self.fieldBuffManager = e(A)
end
function J.prototype.init(self, K)
	self:UnregisterEvents()
	self.startEventId = Event:Register("hunt_boss_start", self.Start, self)
	self.stopEventId = Event:Register("hunt_boss_stop", function(L, M)
		local N
		local O
		O = M.reason
		N = M.unloadScene
		return self:Stop(O, N ~= false)
	end, self)
	self.playerReviveFailedEventId = Event:Register("hunt_boss_player_revive_failed", function(L, P)
		return self:OnPlayerReviveFailed(P.playerID)
	end, self)
	self.intermissionReadyEventId = CustomUIEvent("hunt_boss_intermission_ready", function(P)
		return self:OnIntermissionReady(P.PlayerID)
	end)
	self.intermissionRetreatEventId = CustomUIEvent("hunt_boss_intermission_retreat", function(P)
		return self:OnIntermissionRetreat(P.PlayerID)
	end)
	if not K then
		self:ClearRuntimeState()
	end
end
function J.prototype.DebugStartHuntBoss(self, Q)
	if not IsInToolsMode() then
		return
	end
	local R = GameModeManager:GetModeDifficultyProfile(GameModeEnum.HuntBoss)
	local S = R and R.configuredDifficulties
	if not (S and f(R and R.configuredDifficulties, Q)) then
		self:error((self.logPrefix .. " invalid hunt difficulty=") .. tostring(Q))
		return
	end
	local T = toFiniteNumber
	local U = KeyValues.hunt_intelligence
	local V = U and U[tostring(Q)]
	if V ~= nil then
		V = V.dungeon_diff
	end
	local W = T(V, 0)
	self:DebugPrepareHuntSave(W, function(L, X, Y)
		local Z = {}
		self.debugPrepareRequest = Z
		local _
		_ = function(L, a0)
			if self.debugPrepareRequest ~= Z then
				return
			end
			if a0 >= #X then
				self.debugPrepareRequest = nil
				local a1 = self:StartPreparedHuntBoss(X[1], Q, Y)
				if not a1.success then
					self:error(
						(
							(
								(((self.logPrefix .. " debug start difficulty=") .. tostring(Q)) .. " code=")
								.. tostring(a1.code or "none")
							) .. " reason="
						) .. (a1.reason or "none")
					)
				end
				return
			end
			local a2 = X[a0 + 1]
			local a3 = math.max(0, 100 - PlayerData:GetServiceItemCount(a2, "110025"))
			if a3 == 0 then
				_(nil, a0 + 1)
				return
			end
			CommonService:CallAction(
				"/v1/gm/add_item",
				a2,
				{ add_items = { { item_id = 110025, amounts = a3 } } },
				function(L, a4, a5)
					if self.debugPrepareRequest ~= Z then
						return
					end
					if a5.code ~= 0 and a5.code ~= 200 then
						self.debugPrepareRequest = nil
						self:error(
							(
								(
									(
										((self.logPrefix .. " debug intelligence failed player=") .. tostring(a2))
										.. " code="
									) .. tostring(a5.code)
								) .. " message="
							) .. (a5.message or "")
						)
						ErrorMessage("DemoHuntBoss_AddIntelligenceFailed", a2)
						return
					end
					CommonService:CommonCallback(a2, a5, false)
					_(nil, a0 + 1)
				end,
				false
			)
		end
		_(nil, 0)
	end, Q)
end
function J.prototype.DebugPrepareHuntSave(self, W, a6, a7)
	if not IsInToolsMode() or self.debugPrepareRequest ~= nil then
		return
	end
	if GameModeManager:IsModeRunning() or GameModeManager:IsModeStarting() then
		self:error(self.logPrefix .. " finish the current game mode before preparing debug hunt saves")
		return
	end
	if not g(W) or W ~= math.floor(W) or W < 1 or W > MAX_DIFFICULTY or KeyValues.difficulty[tostring(W)] == nil then
		self:error((self.logPrefix .. " invalid common difficulty=") .. tostring(W))
		return
	end
	local X = {}
	Game:EachPlayer(function(L, a2)
		X[#X + 1] = a2
	end)
	if #X == 0 then
		return
	end
	local Z = { sourceKey = self:SelectDebugSourceKey() }
	self.debugPrepareRequest = Z
	local Y = {}
	local _
	_ = function(L, a0)
		if self.debugPrepareRequest ~= Z then
			return
		end
		if a0 >= #X then
			local function a8()
				self.debugPrepareRequest = nil
				if a6 ~= nil then
					a6(nil, X, Y)
				end
			end
			if Z.commonMatchID ~= nil then
				self:PrepareDebugMatchID(a8)
			else
				a8(nil)
			end
			return
		end
		local a2 = X[a0 + 1]
		self:EnsureDebugHuntSave(a2, W, function(L, a9)
			if self.debugPrepareRequest ~= Z then
				return
			end
			if a9 == nil then
				self.debugPrepareRequest = nil
				return
			end
			Y[a2] = a9
			_(nil, a0 + 1)
		end, a7)
	end
	self:PrepareDebugMatchID(function()
		return _(nil, 0)
	end)
end
function J.prototype.PrepareDebugMatchID(self, a6)
	local Z = self.debugPrepareRequest
	if not IsInToolsMode() or Z == nil then
		return
	end
	if Match:AdvanceMatchID() == nil then
		self.debugPrepareRequest = nil
		self:error(self.logPrefix .. " debug match ID sequence allocation failed")
		return
	end
	a6(nil)
end
function J.prototype.SelectDebugSourceKey(self)
	local aa = {}
	Game:EachPlayer(function(L, ab)
		local ac = CommonService:GetPlayerServiceNetTable(ab, "player_keys") or {}
		for ad, ae in pairs(ac) do
			do
				if ae.id <= 0 then
					goto af
				end
				aa[#aa + 1] = { key = ae.id, owner_id = ab, key_data = ae }
			end
			::af::
		end
	end)
	local ag = h(aa, function(L, ah)
		return ah.key_data.intensity >= 1 and ah.key_data.intensity <= 3
	end)
	local ai = #ag > 0 and ag or aa
	return #ai > 0 and ai[RandomInt(0, #ai - 1) + 1] or nil
end
function J.prototype.GetPlayerHuntSaves(self, ab)
	local aj = CommonService:GetPlayerServiceNetTable(ab, "player_hunt_save_datas") or {}
	local ak = {}
	for ad, al in pairs(aj) do
		do
			if al.diff <= 0 or al.data == "" then
				goto am
			end
			ak[tostring(al.slot_id)] = al
		end
		::am::
	end
	return ak
end
function J.prototype.EnsureDebugHuntSave(self, ab, W, a6, a7)
	local Z = self.debugPrepareRequest
	local an
	if a7 ~= nil then
		an = HuntSaveArchive:GetAutoSelectSlotID(ab, a7)
	else
		an = nil
	end
	local ao = an
	if ao ~= nil then
		a6(nil, ao)
		return
	end
	local function ap(L, O, aq)
		if aq == nil then
			aq = "DemoHuntBoss_SaveFailed"
		end
		self:error((((self.logPrefix .. " debug save player=") .. tostring(ab)) .. " failed: ") .. O)
		ErrorMessage(aq, ab)
		a6(nil)
	end
	local ak = self:GetPlayerHuntSaves(ab)
	local a9 = 1
	while a9 <= 5 and ak[tostring(a9)] ~= nil do
		a9 = a9 + 1
	end
	if a9 > 5 then
		ap(nil, "all five save slots are occupied", "DemoHuntBoss_SaveSlotsFull")
		return
	end
	local ar = Player:GetHero(ab)
	if not IsValid(ar) then
		ap(nil, "hero is not selected")
		return
	end
	local as = math.floor(Login:GetServiceTimestamp())
	local at = Z and Z.sourceKey
	local au = at and at.key_data.intensity or 0
	local av = ar:GetUnitName()
	local aw = math.floor
	local ax = DamageCounter:GetPlayerDamageCount(ab)
	local ay = {
		time = as,
		strength = au,
		hero_name = av,
		total_damage = aw(ax and ax.totalDamage or 0),
		blessings = Bless:GetPlayerBlessDetails(ab),
		artifacts = i(
			h(ar:GetAllItems(), function(L, az)
				return IsValid(az) and KeyValues.artifact[az:GetAbilityName()] ~= nil
			end),
			function(L, az)
				return { item_name = az:GetAbilityName(), level = az:GetLevel() }
			end
		),
		ability_upgrades = i(
			h(AbilityUpgrade:GetAbilityUpgrades(ar), function(L, aA)
				return not AbilityUpgrade:IsServiceUpgrade(aA.name)
			end),
			function(L, aA)
				return { name = aA.name, level = aA.level }
			end
		),
		attributes = HuntSaveArchive:GetAttributes(ab),
	}
	for L, aB in ipairs(Bless:DrawBless(ab, 3) or {}) do
		local aC = ay.blessings
		aC[#aC + 1] = { name = aB.name, rarity = aB.rarity }
	end
	local aD = i(ay.artifacts, function(L, aE)
		return aE.item_name
	end)
	for L, aE in ipairs(Artifact:DrawArtifact(ab, 3, aD) or {}) do
		local aF = ay.artifacts
		aF[#aF + 1] = { item_name = aE.name, level = aE.rarity }
	end
	local aG = {}
	for aH, aI in pairs(AbilityUpgrade.kv) do
		do
			if type(aI) ~= "table" then
				goto aJ
			end
			if toFiniteNumber(aI.Hidden, 0) == 1 or AbilityUpgrade:IsServiceUpgrade(aH) then
				goto aJ
			end
			if
				not AbilityUpgrade:CanApplyAbilityUpgrade(ar, aH)
				or j(ay.ability_upgrades, function(L, aA)
					return aA.name == aH
				end)
			then
				goto aJ
			end
			aG[#aG + 1] = aH
		end
		::aJ::
	end
	do
		local a0 = 0
		while a0 < 3 and #aG > 0 do
			local aK = RandomInt(0, #aG - 1)
			local aL = ay.ability_upgrades
			aL[#aL + 1] = { name = aG[aK + 1], level = 1 }
			k(aG, aK, 1)
			a0 = a0 + 1
		end
	end
	local aM = Match:GetMatchID()
	local function al()
		local aN = { match_id = aM, slot_id = a9, data = json.encode(ay) }
		CommonService:CallAction("/v1/hunt/save_data", ab, aN, function(L, aO, aP)
			if self.debugPrepareRequest ~= Z then
				return
			end
			if aP.code ~= 0 and aP.code ~= 200 then
				ap(nil, (("save_data code=" .. tostring(aP.code)) .. " message=") .. (aP.message or ""))
				return
			end
			CommonService:CommonCallback(ab, aP, false)
			a6(nil, a9)
		end, false)
	end
	if (Z and Z.commonMatchID) == aM then
		al(nil)
		return
	end
	local aQ = {}
	Game:EachPlayer(function(L, a2)
		aQ[tostring(PlayerResource:GetSteamAccountID(a2))] = { hero_id = PlayerResource:GetSelectedHeroID(a2) }
	end)
	local aR = { diff = W }
	if (Z and Z.sourceKey) ~= nil then
		aR.key_id = Z.sourceKey.key
		aR.key_owner_uid = PlayerResource:GetSteamAccountID(Z.sourceKey.owner_id)
	end
	local aS = false
	Match:SendMatchBeginRequest(
		{ match_id = aM, match_type = "common", player_details = aQ, common_match_detail = aR },
		function(L, aT, aU, aV)
			if aS or self.debugPrepareRequest ~= Z then
				return
			end
			aS = true
			if not aT then
				ap(nil, (("common match_begin code=" .. tostring(aU or "unknown")) .. " message=") .. (aV or ""))
				return
			end
			if Match:GetMatchID() ~= aM then
				ap(nil, "match_id changed while preparing the source match")
				return
			end
			if Z ~= nil then
				Z.commonMatchID = aM
			end
			al(nil)
		end
	)
end
function J.prototype.StartPreparedHuntBoss(self, ab, Q, aW)
	if not IsInToolsMode() then
		return { success = false, reason = "Hunt debug start requires tools mode." }
	end
	local X = {}
	Game:EachPlayer(function(L, a2)
		X[#X + 1] = a2
	end)
	if not f(X, ab) then
		return {
			success = false,
			reason = ((("Initiator " .. tostring(ab)) .. " is no longer online; players=[") .. table.concat(X, ","))
				.. "].",
		}
	end
	if GameModeManager:IsModeRunning() or GameModeManager:IsModeStarting() then
		return { success = false, reason = "Finish the current game mode before starting a debug hunt." }
	end
	local Y = {}
	for L, a2 in ipairs(X) do
		local ar = Player:GetHero(a2)
		if not IsValid(ar) then
			return { success = false, reason = ("Player " .. tostring(a2)) .. " must select a hero first." }
		end
		local aX = aW and aW[a2] or HuntSaveArchive:GetAutoSelectSlotID(a2, Q)
		if aX == nil then
			return { success = false, reason = ("Player " .. tostring(a2)) .. " hunt save is not ready." }
		end
		Y[a2] = aX
	end
	local aY = GameModeManager:SelectMode(GameModeEnum.HuntBoss, ab)
	if not aY.success then
		return l({}, aY, { reason = "SelectMode: " .. (aY.reason or "request rejected") })
	end
	for L, a2 in ipairs(X) do
		local a1 = GameModeManager:SelectDifficulty(a2, Q)
		if not a1.success then
			return l(
				{},
				a1,
				{ reason = (("SelectDifficulty player=" .. tostring(a2)) .. ": ") .. (a1.reason or "request rejected") }
			)
		end
	end
	local aZ = GameModeManager:StartSelectedMode(0, { huntSlotIDs = Y })
	return aZ.success and aZ or l({}, aZ, { reason = "StartSelectedMode: " .. (aZ.reason or "request rejected") })
end
function J.prototype.reset(self)
	self.debugPrepareRequest = nil
	self:Stop("Reset", true)
end
function J.prototype.IsPlayerInCombat(self, ab)
	return self.isRunning and self.phase == "battle" and f(self.activeParticipantPlayerIds, ab)
end
function J.prototype.Start(self, P)
	self:Stop("Restart", true)
	if not self:LoadConfigs(P.difficulty, #P.participantPlayerIds) then
		return
	end
	local a_, b0 = self, "runId"
	local b1 = a_[b0] + 1
	a_[b0] = b1
	local b2 = b1
	self.currentDifficulty = P.difficulty
	self:CaptureSaveKeyIntensities(P)
	self.isLoading = true
	self.phase = "loading"
	self.participantPlayerIds = m(P.participantPlayerIds)
	self.activeParticipantPlayerIds = m(P.participantPlayerIds)
	local b3 = Entities:FindByName(nil, C)
	if not IsValid(b3) then
		self:error(((self.logPrefix .. " load point '") .. C) .. "' not found")
		self:Stop("LoadPointMissing", true)
		return
	end
	DungeonManager:ShowLoadingScreen()
	local b4 = b3:GetAbsOrigin()
	self.spawnGroup = DOTA_SpawnMapAtPosition(B, b4, true, function(b5)
		if self:IsActiveRun(b2) then
			ManuallyTriggerSpawnGroupCompletion(b5)
		end
	end, function()
		if self:IsActiveRun(b2) then
			self:OnMapLoaded(b2)
			DungeonManager:HideLoadingScreen()
		end
	end, nil)
end
function J.prototype.OnMapLoaded(self, b2)
	local b6 = self:FindInfoTarget(D)
	if not IsValid(b6) then
		self:error(((self.logPrefix .. " prefab entry '") .. D) .. "' not found")
		self:Stop("EnterPointMissing", true)
		return
	end
	self.battleCenter = b6:GetAbsOrigin()
	self:CaptureEntryPositions()
	self:TeleportPlayers(self.battleCenter)
	self.fieldBuffManager:StartRun(self:GetParticipantHeroes(), self.battleCenter, function()
		return self.enemies
	end)
	self.isLoading = false
	self.isRunning = true
	self.phase = "battle"
	self:RegisterKillListener()
	self:StartLevel(b2, 1)
	if self.isRunning then
		self:StartBattleThink(b2)
	end
end
function J.prototype.StartLevel(self, b2, b7)
	local aI = self.levelConfigByNumber[b7]
	if not self:IsActiveRun(b2) or not self.isRunning or aI == nil then
		self:FinishBattle("LevelConfigMissing")
		return
	end
	self.phase = "battle"
	self.currentLevel = b7
	self.currentWave = 0
	if not self.fieldBuffManager:PrepareLevel(b7) then
		self:FinishBattle("FieldBuffConfigInvalid")
		return
	end
	self:SyncState()
	self:StartNextWave(b2, aI)
end
function J.prototype.StartNextWave(self, b2, b8)
	local b9 = b8.waves
	local ba, bb = self, "currentWave"
	local bc = ba[bb]
	ba[bb] = bc + 1
	local bd = b9[bc + 1]
	if bd == nil then
		self:OnLevelCleared(b2)
		return
	end
	if self.battleCenter == nil or bd.enemyPoolWeights.ValidCount <= 0 then
		self:FinishBattle("WaveConfigInvalid")
		return
	end
	local be = bd.enemyPoolWeights:Random()
	local bf
	if be == nil then
		bf = {}
	else
		local bg = self.enemyPools[be]
		bf = bg and bg:MultipleRandomWithoutReplacement(bd.enemyCount) or {}
	end
	local bh = bf
	if #bh ~= bd.enemyCount then
		self:FinishBattle("EnemyPoolRollFailed")
		return
	end
	self.fieldBuffManager:StartOrResumeBattle()
	local bi, bj = self, "waveSpawnId"
	local bk = bi[bj] + 1
	bi[bj] = bk
	local bl = bk
	self.pendingEnemySpawnCount = bd.enemyCount
	self.bossSlots = {}
	self:SyncState()
	do
		local a0 = 0
		while a0 < bd.enemyCount do
			self:SpawnBoss(
				b2,
				bl,
				a0,
				bh[a0 + 1],
				self:GetBossSpawnPosition(self.battleCenter, a0, bd.enemyCount),
				b8,
				bd
			)
			a0 = a0 + 1
		end
	end
end
function J.prototype.SpawnBoss(self, b2, bl, aX, bm, bn, b8, bd)
	CreateUnitByNameAsync(bm, bn, true, nil, nil, DOTA_TEAM_BADGUYS, function(bo)
		if IsValid(bo) then
			bo:AddNewModifier(bo, nil, "modifier_summon_disabled", {})
		end
		local bp = GameRules:GetGameTime() + 5
		Timer:GameTimer(0, function()
			if not self:IsActiveRun(b2) or not self.isRunning or self.waveSpawnId ~= bl then
				self:RemoveUnit(bo)
				return
			end
			if not IsValid(bo) then
				self:FinishBattle("BossSpawnFailed")
				return
			end
			if not bo.__isNotFirstSpawn or not bo:HasModifier("modifier_common") then
				if GameRules:GetGameTime() >= bp then
					self:error(
						(
							(
								(
									(
										(
											(
												(
													(
														(
															(
																(
																	(
																		(
																			self.logPrefix
																			.. " boss initialization timed out unit="
																		) .. bm
																	) .. " entIndex="
																) .. tostring(bo:entindex())
															) .. " alive="
														) .. tostring(bo:IsAlive())
													) .. " firstSpawn="
												) .. tostring(bo.__isNotFirstSpawn)
											) .. " common="
										) .. tostring(bo:HasModifier("modifier_common"))
									) .. " engineHealth="
								) .. tostring(bo:GetHealth_Engine())
							) .. " engineMaxHealth="
						) .. tostring(bo:GetMaxHealth_Engine())
					)
					self:RemoveUnit(bo)
					self:FinishBattle("BossInitializationFailed")
					return
				end
				return 0.03
			end
			self.pendingEnemySpawnCount = math.max(0, self.pendingEnemySpawnCount - 1)
			FindClearSpaceForUnit(bo, bn, true)
			bo:SetForwardVector(RandomVector(1))
			self:ApplyBossModifiers(bo, b8, bd)
			do
				local a0 = 0
				while a0 < bo:GetAbilityCount() do
					do
						local bq = bo:GetAbilityByIndex(a0)
						if not IsValid(bq) then
							goto br
						end
						bq:EndCooldown()
						bq:StartCooldown(1)
					end
					::br::
					a0 = a0 + 1
				end
			end
			LargeNumberHealth:Refresh(bo)
			bo:SetHealth(bo:GetMaxHealth())
			local bs = self.enemies
			bs[#bs + 1] = bo
			self.bossSlots[aX + 1] = bo
			self:SyncState()
			self:TryCompleteCurrentWave(b2)
		end)
	end)
end
function J.prototype.TryCompleteCurrentWave(self, b2)
	if not self.isRunning or self.pendingEnemySpawnCount > 0 or #self.enemies > 0 then
		return
	end
	local b8 = self.levelConfigByNumber[self.currentLevel]
	if b8 == nil then
		self:FinishBattle("LevelConfigMissing")
	elseif self.currentWave < #b8.waves then
		self.fieldBuffManager:PauseBattle()
		self:StartNextWave(b2, b8)
	else
		self:OnLevelCleared(b2)
	end
end
function J.prototype.OnLevelCleared(self, b2)
	self.fieldBuffManager:EndLevel()
	Match:SettleHunt(self.currentLevel, self.activeParticipantPlayerIds)
	if self.currentLevel >= self.maxLevel then
		self:FinishBattle("Completed")
	else
		self:BeginIntermission(b2)
	end
end
function J.prototype.BeginIntermission(self, b2)
	if not self:IsActiveRun(b2) or not self.isRunning then
		return
	end
	if #self.activeParticipantPlayerIds <= 0 then
		self:FinishBattle("AllPlayersRetreated")
		return
	end
	if not self.fieldBuffManager:PrepareNextLevel(self.currentLevel + 1) then
		self:FinishBattle("FieldBuffConfigInvalid")
		return
	end
	self.phase = "intermission"
	self.intermissionReadyPlayerIds = {}
	self.intermissionEndTime = GameRules:GetGameTime() + F
	self:ScheduleIntermissionTimer(b2)
	self:SyncState()
end
function J.prototype.OnIntermissionReady(self, ab)
	if
		not self.isRunning
		or self.phase ~= "intermission"
		or not f(self.activeParticipantPlayerIds, ab)
		or self.intermissionReadyPlayerIds[tostring(ab)]
	then
		return
	end
	self.intermissionReadyPlayerIds[tostring(ab)] = true
	local bt = math.max(0, (self.intermissionEndTime or GameRules:GetGameTime()) - GameRules:GetGameTime())
	self.intermissionEndTime = GameRules:GetGameTime() + bt * 0.5
	if self:AreAllActivePlayersReady() then
		self:StartNextLevel(self.runId)
		return
	end
	self:ScheduleIntermissionTimer(self.runId)
	self:SyncState()
end
function J.prototype.OnIntermissionRetreat(self, ab)
	if not self.isRunning or self.phase ~= "intermission" or not f(self.activeParticipantPlayerIds, ab) then
		return
	end
	if not self:ReturnPlayerToLobby(ab) then
		self:error(((self.logPrefix .. " retreat failed player=") .. tostring(ab)) .. ": lobby position unavailable")
		return
	end
	k(self.activeParticipantPlayerIds, n(self.activeParticipantPlayerIds, ab), 1)
	o(self.intermissionReadyPlayerIds, tostring(ab))
	Event:Fire("hunt_boss_player_retreated", { playerID = ab, level = self.currentLevel })
	if #self.activeParticipantPlayerIds <= 0 then
		self:FinishBattle("AllPlayersRetreated")
		return
	end
	if self:AreAllActivePlayersReady() then
		self:StartNextLevel(self.runId)
		return
	end
	self:SyncState()
end
function J.prototype.OnPlayerReviveFailed(self, ab)
	if
		not self.isRunning
		or self.phase ~= "battle" and self.phase ~= "intermission"
		or not f(self.activeParticipantPlayerIds, ab)
		or not GameModeHuntBoss:IsParticipantActive(ab)
	then
		return
	end
	k(self.activeParticipantPlayerIds, n(self.activeParticipantPlayerIds, ab), 1)
	o(self.intermissionReadyPlayerIds, tostring(ab))
	Event:Fire("hunt_boss_player_failed", { playerID = ab, level = self.currentLevel })
	if not self:ReturnPlayerToLobby(ab, true) then
		self:error((self.logPrefix .. " failed player return to lobby unavailable player=") .. tostring(ab))
	end
	if #self.activeParticipantPlayerIds <= 0 then
		self:FinishBattle("AllPlayersDead")
		return
	end
	if self.phase == "intermission" and self:AreAllActivePlayersReady() then
		self:StartNextLevel(self.runId)
		return
	end
	self:SyncState()
end
function J.prototype.AreAllActivePlayersReady(self)
	return p(self.activeParticipantPlayerIds, function(L, ab)
		return self.intermissionReadyPlayerIds[tostring(ab)] == true
	end)
end
function J.prototype.ScheduleIntermissionTimer(self, b2)
	if self.intermissionTimerId ~= nil then
		Timer:StopTimer(self.intermissionTimerId)
	end
	local bu = math.max(0, (self.intermissionEndTime or GameRules:GetGameTime()) - GameRules:GetGameTime())
	self.intermissionTimerId = Timer:GameTimer(bu, function()
		self.intermissionTimerId = nil
		if not self:IsActiveRun(b2) or not self.isRunning or self.phase ~= "intermission" then
			return
		end
		for L, ab in ipairs(self.activeParticipantPlayerIds) do
			self.intermissionReadyPlayerIds[tostring(ab)] = true
		end
		self:StartNextLevel(b2)
	end)
end
function J.prototype.StartNextLevel(self, b2)
	if not self:IsActiveRun(b2) or not self.isRunning or self.phase ~= "intermission" then
		return
	end
	if self.intermissionTimerId ~= nil then
		Timer:StopTimer(self.intermissionTimerId)
		self.intermissionTimerId = nil
	end
	self.intermissionEndTime = nil
	self:StartLevel(b2, self.currentLevel + 1)
end
function J.prototype.ApplyBossModifiers(self, bo, b8, bd)
	bo:AddNewModifier(bo, nil, "modifier_boss_custom", { control_immune = 1 })
	if self.difficultyCooldownReduction ~= 0 then
		bo:AddProperty(PropertyFunction.COOLDOWN_REDUCTION, self.difficultyCooldownReduction)
	end
	if self.difficultyBossGapAmplify ~= 0 then
		bo:AddProperty(PropertyFunction.BOSS_GAP_AMPLIFY, self.difficultyBossGapAmplify)
	end
	local bv = self.healthFactor * b8.healthFactor * bd.healthFactor
	local bw = self.damageFactor * b8.damageFactor
	if bv ~= 1 then
		bo:AddProperty(PropertyFunction.HEALTH_AMPLIFY, (bv - 1) * 100)
	end
	if bw ~= 1 then
		bo:AddProperty(PropertyFunction.ATTACK_AMPLIFY, (bw - 1) * 100)
	end
end
function J.prototype.FinishBattle(self, O)
	if self.isFinished then
		return
	end
	self.isFinished = true
	self.isRunning = false
	self.phase = "finished"
	self:StopBattleThink()
	self.finishReason = O
	self.waveSpawnId = self.waveSpawnId + 1
	if self.intermissionTimerId ~= nil then
		Timer:StopTimer(self.intermissionTimerId)
		self.intermissionTimerId = nil
	end
	self.intermissionEndTime = nil
	for L, bo in ipairs(self.enemies) do
		self:RemoveUnit(bo)
	end
	self.enemies = {}
	self.bossSlots = {}
	self.fieldBuffManager:Reset()
	self:SyncState()
	Event:Fire("hunt_boss_battle_finished", { reason = O, level = self.currentLevel })
end
function J.prototype.RegisterKillListener(self)
	if self.killEventListenerId ~= nil then
		StopGameEvent(self.killEventListenerId)
	end
	self.killEventListenerId = GameEvent("entity_killed", function(self, ...)
		return self:OnEntityKilled(...)
	end, self)
end
function J.prototype.OnEntityKilled(self, P)
	if not self.isRunning then
		return
	end
	local bx = EntIndexToHScript(P.entindex_killed)
	local a0 = IsValid(bx) and n(self.enemies, bx) or -1
	if a0 >= 0 then
		k(self.enemies, a0, 1)
		local aX = n(self.bossSlots, bx)
		if aX >= 0 then
			self.bossSlots[aX + 1] = nil
		end
		self:SyncState()
		self:TryCompleteCurrentWave(self.runId)
	end
end
function J.prototype.LoadConfigs(self, Q, by)
	self.enemyPools = {}
	self.levelConfigByNumber = {}
	if not self.fieldBuffManager:LoadConfigs(Q) then
		return false
	end
	local bz = KeyValues.hunt_enemy_pools
	local bA = bz.EnemyPools
	if bA == nil then
		self:error(self.logPrefix .. " hunt_enemy_pools missing")
		return false
	end
	for be, bB in pairs(bA) do
		do
			local bC = e(w)
			if bB == nil then
				goto bD
			end
			for bm, bE in pairs(bB) do
				bC:Set(tostring(bm), toFiniteNumber(bE, 0))
			end
			if bC.ValidCount > 0 then
				self.enemyPools[tostring(be)] = bC
			end
		end
		::bD::
	end
	local bF = KeyValues.hunt_levels
	if bF == nil then
		self:error(self.logPrefix .. " hunt_levels missing")
		return false
	end
	for bG, bH in pairs(bF) do
		do
			local ah = tostring(bG)
			if not q(ah, "level_") then
				goto bI
			end
			local b7 = toFiniteNumber(r(ah, #"level_"), 0)
			local bJ = {}
			if bH == nil then
				goto bI
			end
			local bK = bH.WaveList
			do
				local bL = 1
				while (bK and bK[tostring(bL)]) ~= nil do
					do
						local bM = bK[tostring(bL)]
						if bM == nil then
							goto bN
						end
						local bO = e(w)
						for be, bE in pairs(bM.EnemyPoolWeights or {}) do
							local aH = tostring(be)
							if self.enemyPools[aH] == nil then
								self:error(
									(
										(
											(
												((self.logPrefix .. " invalid pool reference level=") .. tostring(b7))
												.. " wave="
											) .. tostring(bL)
										) .. " pool="
									) .. aH
								)
								return false
							end
							bO:Set(aH, toFiniteNumber(bE, 0))
						end
						local bP = math.floor(toFiniteNumber(bM.EnemyCount, 0))
						if bO.ValidCount <= 0 or bP <= 0 then
							self:error(
								(((self.logPrefix .. " invalid wave level=") .. tostring(b7)) .. " wave=")
									.. tostring(bL)
							)
							return false
						end
						bJ[#bJ + 1] = {
							enemyPoolWeights = bO,
							enemyCount = bP,
							healthFactor = math.max(0.01, toFiniteNumber(bM.HealthFactor, 1)),
						}
					end
					::bN::
					bL = bL + 1
				end
			end
			if b7 >= 1 and #bJ > 0 then
				self.levelConfigByNumber[b7] = {
					healthFactor = math.max(0.01, toFiniteNumber(bH.HealthFactor, 1)),
					damageFactor = math.max(0.01, toFiniteNumber(bH.DamageFactor, 1)),
					waves = bJ,
				}
			end
		end
		::bI::
	end
	local bQ = KeyValues.hunt_difficulty
	local bR = bQ and bQ[tostring(Q)]
	if bR == nil then
		self:error((self.logPrefix .. " hunt_difficulty missing difficulty=") .. tostring(Q))
		return false
	end
	local bS = KeyValues.hunt_intelligence
	local bT = bS and bS[tostring(Q)]
	local bU = toFiniteNumber
	local bV
	if bT ~= nil then
		bV = bT.level_max
	end
	self.maxLevel = bU(bV, 0)
	if self.maxLevel <= 0 or self.maxLevel ~= math.floor(self.maxLevel) then
		self:error((self.logPrefix .. " hunt_intelligence invalid level_max difficulty=") .. tostring(Q))
		return false
	end
	do
		local b7 = 1
		while b7 <= self.maxLevel do
			if self.levelConfigByNumber[b7] == nil then
				self:error(
					(
						(
							(self.logPrefix .. " hunt_levels missing valid level configuration difficulty=")
							.. tostring(Q)
						) .. " level="
					) .. tostring(b7)
				)
				return false
			end
			b7 = b7 + 1
		end
	end
	local bW = math.min(math.max(by, 1), 4)
	self.healthFactor = toFiniteNumber(bR.HealthFactor, 1)
		* (bW >= 2 and toFiniteNumber(bR[("Player" .. tostring(bW)) .. "HealthFactor"], 1) or 1)
	self.damageFactor = toFiniteNumber(bR.DamageFactor, 1)
		* (bW >= 2 and toFiniteNumber(bR[("Player" .. tostring(bW)) .. "DamageFactor"], 1) or 1)
	self.difficultyCooldownReduction = math.min(99, math.max(0, toFiniteNumber(bR.BossCooldownReduction, 0)))
	self.difficultyBossGapAmplify = -self.difficultyCooldownReduction
	return true
end
function J.prototype.GetBossSpawnPosition(self, bX, a0, bY)
	return Vector(bX.x + (a0 - (bY - 1) / 2) * 720, bX.y + 480, bX.z)
end
function J.prototype.Stop(self, O, N)
	local bZ = self.isLoading
	self.runId = self.runId + 1
	self.waveSpawnId = self.waveSpawnId + 1
	if self.killEventListenerId ~= nil then
		StopGameEvent(self.killEventListenerId)
		self.killEventListenerId = nil
	end
	for L, bo in ipairs(self.enemies) do
		self:RemoveUnit(bo)
	end
	if N and self.spawnGroup ~= nil then
		UnloadSpawnGroupByHandle(self.spawnGroup)
	end
	self:ClearRuntimeState()
	if bZ then
		DungeonManager:HideLoadingScreen()
	end
end
function J.prototype.TeleportPlayers(self, bn)
	local b_ = self:GetParticipantHeroes()
	do
		local c0 = 0
		while c0 < #b_ do
			local c1 = Vector(bn.x + (c0 - (#b_ - 1) / 2) * E, bn.y, bn.z)
			self:TeleportHero(b_[c0 + 1], c1)
			c0 = c0 + 1
		end
	end
end
function J.prototype.TeleportHero(self, ar, bn)
	FindClearSpaceForUnit(ar, bn, true)
	ar:SetForwardVector(vec3_top)
	Event:Fire("teleport", { caster = ar, target = "hunt_boss" })
end
function J.prototype.StartBattleThink(self, b2)
	self:StopBattleThink()
	local c2 = {}
	local c3 = GameRules:GetGameTime() + H
	self.battleThinkTimerId = Timer:GameTimer(G, function()
		local bX = self.battleCenter
		if
			not self:IsActiveRun(b2)
			or not self.isRunning
			or bX == nil
			or self.phase ~= "battle" and self.phase ~= "intermission"
		then
			return
		end
		self.fieldBuffManager:Update()
		local c4 = GameRules:GetGameTime()
		if c4 < c3 then
			return G
		end
		c3 = c4 + H
		for L, ar in ipairs(self:GetParticipantHeroes()) do
			do
				local ab = ar:GetPlayerOwnerID()
				local ah = tostring(ab)
				if not f(self.activeParticipantPlayerIds, ab) or not ar:IsAlive() or CalcDistance(ar, bX) <= I then
					o(c2, ah)
					goto c5
				end
				if c2[ah] and GridNav:IsValidPosition(bX) then
					self:TeleportHero(ar, bX)
					o(c2, ah)
				else
					c2[ah] = true
				end
			end
			::c5::
		end
		return G
	end)
end
function J.prototype.StopBattleThink(self)
	if self.battleThinkTimerId == nil then
		return
	end
	Timer:StopTimer(self.battleThinkTimerId)
	self.battleThinkTimerId = nil
end
function J.prototype.ReturnPlayerToLobby(self, ab, c6)
	if c6 == nil then
		c6 = false
	end
	local ar = PlayerResource:GetSelectedHeroEntity(ab)
	if not IsValid(ar) then
		return false
	end
	local bn = self.entryPositionsByPlayerId[tostring(ab)]
	if bn == nil then
		return false
	end
	self.fieldBuffManager:RemoveHero(ar)
	ar:SetRespawnPosition(bn)
	Npc:SetPlayerArea(ab, "lobby")
	if c6 and not ar:IsAlive() then
		ar:RespawnHero(false, false)
	end
	FindClearSpaceForUnit(ar, bn, true)
	Event:Fire("teleport", { caster = ar, target = "lobby" })
	return true
end
function J.prototype.CaptureSaveKeyIntensities(self, P)
	self.keyIntensitiesByPlayerId = {}
	for L, ab in ipairs(P.participantPlayerIds) do
		do
			local c7 = P.huntSlotIDs
			local a9 = c7 and c7[ab]
			if a9 == nil then
				goto c8
			end
			local al = HuntSaveArchive:GetSelectedSave(ab, a9)
			if al == nil then
				goto c8
			end
			local c9 = json.decode(al.data)
			local ay = c9
			if (ay and ay.strength) == nil then
				goto c8
			end
			local ca = toFiniteNumber(ay.strength, -1)
			if ca >= 0 then
				self.keyIntensitiesByPlayerId[tostring(ab)] = math.floor(ca)
			end
		end
		::c8::
	end
end
function J.prototype.CaptureEntryPositions(self)
	self.entryPositionsByPlayerId = {}
	for L, ab in ipairs(self.participantPlayerIds) do
		local ar = PlayerResource:GetSelectedHeroEntity(ab)
		if IsValid(ar) then
			self.entryPositionsByPlayerId[tostring(ab)] = ar:GetAbsOrigin()
		end
	end
end
function J.prototype.SyncState(self)
	local cb = {}
	local cc = {}
	for L, ab in ipairs(self.activeParticipantPlayerIds) do
		cb[tostring(ab)] = self.intermissionReadyPlayerIds[tostring(ab)] == true
	end
	do
		local aX = 0
		while aX < #self.bossSlots do
			local cd = self.bossSlots[aX + 1]
			if cd ~= nil and IsValid(cd) then
				cc[#cc + 1] = { slot = aX, ent_index = cd:entindex() }
			end
			aX = aX + 1
		end
	end
	local ce = {
		phase = self.phase,
		finish_reason = self.finishReason,
		difficulty = self.currentDifficulty,
		key_intensities = self.keyIntensitiesByPlayerId,
		level = self.currentLevel,
		wave = self.currentWave,
		active_player_ids = self.activeParticipantPlayerIds,
		ready_player_ids = cb,
		intermission_end_time = self.intermissionEndTime or 0,
		intermission_duration = F,
		bosses = cc,
		fixed_buffs = self.fieldBuffManager:GetFixedBuffs(),
		current_level_buffs = self.fieldBuffManager:GetCurrentLevelBuffs(),
		next_level_buffs = self.phase == "intermission" and self.fieldBuffManager:GetNextLevelBuffs() or {},
	}
	CustomNetTables:SetNetData("hunt_boss", "state", ce)
end
function J.prototype.GetParticipantHeroes(self)
	local b_ = {}
	for L, cf in ipairs(self.participantPlayerIds) do
		local ar = PlayerResource:GetSelectedHeroEntity(cf)
		if IsValid(ar) and ar:IsRealHero() and ar:GetTeamNumber() == DOTA_TEAM_GOODGUYS then
			b_[#b_ + 1] = ar
		end
	end
	return b_
end
function J.prototype.FindInfoTarget(self, aH)
	if self.spawnGroup == nil then
		return nil
	end
	for L, cg in ipairs(Entities:FindAllByClassname("info_target")) do
		if cg:GetSpawnGroupHandle() == self.spawnGroup and s(cg:GetName(), aH) then
			return cg
		end
	end
	return nil
end
function J.prototype.IsActiveRun(self, b2)
	return self.runId == b2
end
function J.prototype.RemoveUnit(self, ch)
	if not IsValid(ch) then
		return
	end
	ch:ForceKill(false)
	ch:MakeIllusion()
	ch:AddNoDraw()
	ch:CallAbilityDestroy()
	UTIL_Remove(ch)
end
function J.prototype.ClearRuntimeState(self)
	self:StopBattleThink()
	self.fieldBuffManager:Reset()
	if self.intermissionTimerId ~= nil then
		Timer:StopTimer(self.intermissionTimerId)
		self.intermissionTimerId = nil
	end
	self.isLoading = false
	self.isRunning = false
	self.isFinished = false
	self.phase = "inactive"
	self.finishReason = nil
	self.participantPlayerIds = {}
	self.activeParticipantPlayerIds = {}
	self.entryPositionsByPlayerId = {}
	self.intermissionReadyPlayerIds = {}
	self.intermissionEndTime = nil
	self.enemyPools = {}
	self.levelConfigByNumber = {}
	self.healthFactor = 1
	self.damageFactor = 1
	self.difficultyCooldownReduction = 0
	self.difficultyBossGapAmplify = 0
	self.currentDifficulty = 0
	self.keyIntensitiesByPlayerId = {}
	self.currentLevel = 1
	self.currentWave = 0
	self.maxLevel = 1
	self.pendingEnemySpawnCount = 0
	self.enemies = {}
	self.bossSlots = {}
	self.battleCenter = nil
	self.spawnGroup = nil
	self:SyncState()
end
function J.prototype.UnregisterEvents(self)
	if self.startEventId ~= nil then
		Event:Unregister(self.startEventId)
	end
	if self.stopEventId ~= nil then
		Event:Unregister(self.stopEventId)
	end
	if self.playerReviveFailedEventId ~= nil then
		Event:Unregister(self.playerReviveFailedEventId)
	end
	if self.intermissionReadyEventId ~= nil then
		StopCustomUIEvent(self.intermissionReadyEventId)
	end
	if self.intermissionRetreatEventId ~= nil then
		StopCustomUIEvent(self.intermissionRetreatEventId)
	end
	self.startEventId = nil
	self.stopEventId = nil
	self.playerReviveFailedEventId = nil
	self.intermissionReadyEventId = nil
	self.intermissionRetreatEventId = nil
end
J = t({ y }, J)
if HuntBossBattle == nil then
	HuntBossBattle = e(J)
end
return u