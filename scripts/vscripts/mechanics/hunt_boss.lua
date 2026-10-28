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
	local aw = ar:GetLevel()
	local ax = math.floor
	local ay = DamageCounter:GetPlayerDamageCount(ab)
	local az = {
		time = as,
		strength = au,
		hero_name = av,
		hero_level = aw,
		total_damage = ax(ay and ay.totalDamage or 0),
		blessings = Bless:GetPlayerBlessDetails(ab),
		artifacts = i(
			h(ar:GetAllItems(), function(L, aA)
				return IsValid(aA) and KeyValues.artifact[aA:GetAbilityName()] ~= nil
			end),
			function(L, aA)
				return { item_name = aA:GetAbilityName(), level = aA:GetLevel() }
			end
		),
		ability_upgrades = i(
			h(AbilityUpgrade:GetAbilityUpgrades(ar), function(L, aB)
				return not AbilityUpgrade:IsServiceUpgrade(aB.name)
			end),
			function(L, aB)
				return { name = aB.name, level = aB.level }
			end
		),
		attributes = HuntSaveArchive:GetAttributes(ab),
	}
	for L, aC in ipairs(Bless:DrawBless(ab, 3) or {}) do
		local aD = az.blessings
		aD[#aD + 1] = { name = aC.name, rarity = aC.rarity }
	end
	local aE = i(az.artifacts, function(L, aF)
		return aF.item_name
	end)
	for L, aF in ipairs(Artifact:DrawArtifact(ab, 3, aE) or {}) do
		local aG = az.artifacts
		aG[#aG + 1] = { item_name = aF.name, level = aF.rarity }
	end
	local aH = {}
	for aI, aJ in pairs(AbilityUpgrade.kv) do
		do
			if type(aJ) ~= "table" then
				goto aK
			end
			if toFiniteNumber(aJ.Hidden, 0) == 1 or AbilityUpgrade:IsServiceUpgrade(aI) then
				goto aK
			end
			if
				not AbilityUpgrade:CanApplyAbilityUpgrade(ar, aI)
				or j(az.ability_upgrades, function(L, aB)
					return aB.name == aI
				end)
			then
				goto aK
			end
			aH[#aH + 1] = aI
		end
		::aK::
	end
	do
		local a0 = 0
		while a0 < 3 and #aH > 0 do
			local aL = RandomInt(0, #aH - 1)
			local aM = az.ability_upgrades
			aM[#aM + 1] = { name = aH[aL + 1], level = 1 }
			k(aH, aL, 1)
			a0 = a0 + 1
		end
	end
	local aN = Match:GetMatchID()
	local function al()
		local aO = { match_id = aN, slot_id = a9, data = json.encode(az) }
		CommonService:CallAction("/v1/hunt/save_data", ab, aO, function(L, aP, aQ)
			if self.debugPrepareRequest ~= Z then
				return
			end
			if aQ.code ~= 0 and aQ.code ~= 200 then
				ap(nil, (("save_data code=" .. tostring(aQ.code)) .. " message=") .. (aQ.message or ""))
				return
			end
			CommonService:CommonCallback(ab, aQ, false)
			a6(nil, a9)
		end, false)
	end
	if (Z and Z.commonMatchID) == aN then
		al(nil)
		return
	end
	local aR = {}
	Game:EachPlayer(function(L, a2)
		aR[tostring(PlayerResource:GetSteamAccountID(a2))] = { hero_id = PlayerResource:GetSelectedHeroID(a2) }
	end)
	local aS = { diff = W }
	if (Z and Z.sourceKey) ~= nil then
		aS.key_id = Z.sourceKey.key
		aS.key_owner_uid = PlayerResource:GetSteamAccountID(Z.sourceKey.owner_id)
	end
	local aT = false
	Match:SendMatchBeginRequest(
		{ match_id = aN, match_type = "common", player_details = aR, common_match_detail = aS },
		function(L, aU, aV, aW)
			if aT or self.debugPrepareRequest ~= Z then
				return
			end
			aT = true
			if not aU then
				ap(nil, (("common match_begin code=" .. tostring(aV or "unknown")) .. " message=") .. (aW or ""))
				return
			end
			if Match:GetMatchID() ~= aN then
				ap(nil, "match_id changed while preparing the source match")
				return
			end
			if Z ~= nil then
				Z.commonMatchID = aN
			end
			al(nil)
		end
	)
end
function J.prototype.StartPreparedHuntBoss(self, ab, Q, aX)
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
		local aY = aX and aX[a2] or HuntSaveArchive:GetAutoSelectSlotID(a2, Q)
		if aY == nil then
			return { success = false, reason = ("Player " .. tostring(a2)) .. " hunt save is not ready." }
		end
		Y[a2] = aY
	end
	local aZ = GameModeManager:SelectMode(GameModeEnum.HuntBoss, ab)
	if not aZ.success then
		return l({}, aZ, { reason = "SelectMode: " .. (aZ.reason or "request rejected") })
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
	local a_ = GameModeManager:StartSelectedMode(0, { huntSlotIDs = Y })
	return a_.success and a_ or l({}, a_, { reason = "StartSelectedMode: " .. (a_.reason or "request rejected") })
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
	local b0, b1 = self, "runId"
	local b2 = b0[b1] + 1
	b0[b1] = b2
	local b3 = b2
	self.currentDifficulty = P.difficulty
	self:CaptureSaveKeyIntensities(P)
	self.isLoading = true
	self.phase = "loading"
	self.participantPlayerIds = m(P.participantPlayerIds)
	self.activeParticipantPlayerIds = m(P.participantPlayerIds)
	local b4 = Entities:FindByName(nil, C)
	if not IsValid(b4) then
		self:error(((self.logPrefix .. " load point '") .. C) .. "' not found")
		self:Stop("LoadPointMissing", true)
		return
	end
	DungeonManager:ShowLoadingScreen()
	local b5 = b4:GetAbsOrigin()
	self.spawnGroup = DOTA_SpawnMapAtPosition(B, b5, true, function(b6)
		if self:IsActiveRun(b3) then
			ManuallyTriggerSpawnGroupCompletion(b6)
		end
	end, function()
		if self:IsActiveRun(b3) then
			self:OnMapLoaded(b3)
			DungeonManager:HideLoadingScreen()
		end
	end, nil)
end
function J.prototype.OnMapLoaded(self, b3)
	local b7 = self:FindInfoTarget(D)
	if not IsValid(b7) then
		self:error(((self.logPrefix .. " prefab entry '") .. D) .. "' not found")
		self:Stop("EnterPointMissing", true)
		return
	end
	self.battleCenter = b7:GetAbsOrigin()
	self:CaptureEntryPositions()
	self:TeleportPlayers(self.battleCenter)
	self.fieldBuffManager:StartRun(self:GetParticipantHeroes(), self.battleCenter, function()
		return self.enemies
	end)
	self.isLoading = false
	self.isRunning = true
	self.phase = "battle"
	self:RegisterKillListener()
	self:StartLevel(b3, 1)
	if self.isRunning then
		self:StartBattleThink(b3)
	end
end
function J.prototype.StartLevel(self, b3, b8)
	local aJ = self.levelConfigByNumber[b8]
	if not self:IsActiveRun(b3) or not self.isRunning or aJ == nil then
		self:FinishBattle("LevelConfigMissing")
		return
	end
	self.phase = "battle"
	self.currentLevel = b8
	self.currentWave = 0
	if not self.fieldBuffManager:PrepareLevel(b8) then
		self:FinishBattle("FieldBuffConfigInvalid")
		return
	end
	self:SyncState()
	self:StartNextWave(b3, aJ)
end
function J.prototype.StartNextWave(self, b3, b9)
	local ba = b9.waves
	local bb, bc = self, "currentWave"
	local bd = bb[bc]
	bb[bc] = bd + 1
	local be = ba[bd + 1]
	if be == nil then
		self:OnLevelCleared(b3)
		return
	end
	if self.battleCenter == nil or be.enemyPoolWeights.ValidCount <= 0 then
		self:FinishBattle("WaveConfigInvalid")
		return
	end
	local bf = be.enemyPoolWeights:Random()
	local bg
	if bf == nil then
		bg = {}
	else
		local bh = self.enemyPools[bf]
		bg = bh and bh:MultipleRandomWithoutReplacement(be.enemyCount) or {}
	end
	local bi = bg
	if #bi ~= be.enemyCount then
		self:FinishBattle("EnemyPoolRollFailed")
		return
	end
	self.fieldBuffManager:StartOrResumeBattle()
	local bj, bk = self, "waveSpawnId"
	local bl = bj[bk] + 1
	bj[bk] = bl
	local bm = bl
	self.pendingEnemySpawnCount = be.enemyCount
	self.bossSlots = {}
	self:SyncState()
	do
		local a0 = 0
		while a0 < be.enemyCount do
			self:SpawnBoss(
				b3,
				bm,
				a0,
				bi[a0 + 1],
				self:GetBossSpawnPosition(self.battleCenter, a0, be.enemyCount),
				b9,
				be
			)
			a0 = a0 + 1
		end
	end
end
function J.prototype.SpawnBoss(self, b3, bm, aY, bn, bo, b9, be)
	CreateUnitByNameAsync(bn, bo, true, nil, nil, DOTA_TEAM_BADGUYS, function(bp)
		if IsValid(bp) then
			bp:AddNewModifier(bp, nil, "modifier_summon_disabled", {})
		end
		local bq = GameRules:GetGameTime() + 5
		Timer:GameTimer(0, function()
			if not self:IsActiveRun(b3) or not self.isRunning or self.waveSpawnId ~= bm then
				self:RemoveUnit(bp)
				return
			end
			if not IsValid(bp) then
				self:FinishBattle("BossSpawnFailed")
				return
			end
			if not bp.__isNotFirstSpawn or not bp:HasModifier("modifier_common") then
				if GameRules:GetGameTime() >= bq then
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
																		) .. bn
																	) .. " entIndex="
																) .. tostring(bp:entindex())
															) .. " alive="
														) .. tostring(bp:IsAlive())
													) .. " firstSpawn="
												) .. tostring(bp.__isNotFirstSpawn)
											) .. " common="
										) .. tostring(bp:HasModifier("modifier_common"))
									) .. " engineHealth="
								) .. tostring(bp:GetHealth_Engine())
							) .. " engineMaxHealth="
						) .. tostring(bp:GetMaxHealth_Engine())
					)
					self:RemoveUnit(bp)
					self:FinishBattle("BossInitializationFailed")
					return
				end
				return 0.03
			end
			self.pendingEnemySpawnCount = math.max(0, self.pendingEnemySpawnCount - 1)
			FindClearSpaceForUnit(bp, bo, true)
			bp:SetForwardVector(RandomVector(1))
			self:ApplyBossModifiers(bp, b9, be)
			do
				local a0 = 0
				while a0 < bp:GetAbilityCount() do
					do
						local br = bp:GetAbilityByIndex(a0)
						if not IsValid(br) then
							goto bs
						end
						br:EndCooldown()
						br:StartCooldown(1)
					end
					::bs::
					a0 = a0 + 1
				end
			end
			LargeNumberHealth:Refresh(bp)
			bp:SetHealth(bp:GetMaxHealth())
			local bt = self.enemies
			bt[#bt + 1] = bp
			self.bossSlots[aY + 1] = bp
			self:SyncState()
			self:TryCompleteCurrentWave(b3)
		end)
	end)
end
function J.prototype.TryCompleteCurrentWave(self, b3)
	if not self.isRunning or self.pendingEnemySpawnCount > 0 or #self.enemies > 0 then
		return
	end
	local b9 = self.levelConfigByNumber[self.currentLevel]
	if b9 == nil then
		self:FinishBattle("LevelConfigMissing")
	elseif self.currentWave < #b9.waves then
		self.fieldBuffManager:PauseBattle()
		self:StartNextWave(b3, b9)
	else
		self:OnLevelCleared(b3)
	end
end
function J.prototype.OnLevelCleared(self, b3)
	self.fieldBuffManager:EndLevel()
	Match:SettleHunt(self.currentLevel, self.activeParticipantPlayerIds)
	if self.currentLevel >= self.maxLevel then
		self:FinishBattle("Completed")
	else
		self:BeginIntermission(b3)
	end
end
function J.prototype.BeginIntermission(self, b3)
	if not self:IsActiveRun(b3) or not self.isRunning then
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
	self:ScheduleIntermissionTimer(b3)
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
	local bu = math.max(0, (self.intermissionEndTime or GameRules:GetGameTime()) - GameRules:GetGameTime())
	self.intermissionEndTime = GameRules:GetGameTime() + bu * 0.5
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
function J.prototype.ScheduleIntermissionTimer(self, b3)
	if self.intermissionTimerId ~= nil then
		Timer:StopTimer(self.intermissionTimerId)
	end
	local bv = math.max(0, (self.intermissionEndTime or GameRules:GetGameTime()) - GameRules:GetGameTime())
	self.intermissionTimerId = Timer:GameTimer(bv, function()
		self.intermissionTimerId = nil
		if not self:IsActiveRun(b3) or not self.isRunning or self.phase ~= "intermission" then
			return
		end
		for L, ab in ipairs(self.activeParticipantPlayerIds) do
			self.intermissionReadyPlayerIds[tostring(ab)] = true
		end
		self:StartNextLevel(b3)
	end)
end
function J.prototype.StartNextLevel(self, b3)
	if not self:IsActiveRun(b3) or not self.isRunning or self.phase ~= "intermission" then
		return
	end
	if self.intermissionTimerId ~= nil then
		Timer:StopTimer(self.intermissionTimerId)
		self.intermissionTimerId = nil
	end
	self.intermissionEndTime = nil
	self:StartLevel(b3, self.currentLevel + 1)
end
function J.prototype.ApplyBossModifiers(self, bp, b9, be)
	bp:AddNewModifier(bp, nil, "modifier_boss_custom", { control_immune = 1 })
	if self.difficultyCooldownReduction ~= 0 then
		bp:AddProperty(PropertyFunction.COOLDOWN_REDUCTION, self.difficultyCooldownReduction)
	end
	if self.difficultyBossGapAmplify ~= 0 then
		bp:AddProperty(PropertyFunction.BOSS_GAP_AMPLIFY, self.difficultyBossGapAmplify)
	end
	local bw = self.healthFactor * b9.healthFactor * be.healthFactor
	local bx = self.damageFactor * b9.damageFactor
	if bw ~= 1 then
		bp:AddProperty(PropertyFunction.HEALTH_AMPLIFY, (bw - 1) * 100)
	end
	if bx ~= 1 then
		bp:AddProperty(PropertyFunction.ATTACK_AMPLIFY, (bx - 1) * 100)
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
	for L, bp in ipairs(self.enemies) do
		self:RemoveUnit(bp)
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
	local by = EntIndexToHScript(P.entindex_killed)
	local a0 = IsValid(by) and n(self.enemies, by) or -1
	if a0 >= 0 then
		k(self.enemies, a0, 1)
		local aY = n(self.bossSlots, by)
		if aY >= 0 then
			self.bossSlots[aY + 1] = nil
		end
		self:SyncState()
		self:TryCompleteCurrentWave(self.runId)
	end
end
function J.prototype.LoadConfigs(self, Q, bz)
	self.enemyPools = {}
	self.levelConfigByNumber = {}
	if not self.fieldBuffManager:LoadConfigs(Q) then
		return false
	end
	local bA = KeyValues.hunt_enemy_pools
	local bB = bA.EnemyPools
	if bB == nil then
		self:error(self.logPrefix .. " hunt_enemy_pools missing")
		return false
	end
	for bf, bC in pairs(bB) do
		do
			local bD = e(w)
			if bC == nil then
				goto bE
			end
			for bn, bF in pairs(bC) do
				bD:Set(tostring(bn), toFiniteNumber(bF, 0))
			end
			if bD.ValidCount > 0 then
				self.enemyPools[tostring(bf)] = bD
			end
		end
		::bE::
	end
	local bG = KeyValues.hunt_levels
	if bG == nil then
		self:error(self.logPrefix .. " hunt_levels missing")
		return false
	end
	for bH, bI in pairs(bG) do
		do
			local ah = tostring(bH)
			if not q(ah, "level_") then
				goto bJ
			end
			local b8 = toFiniteNumber(r(ah, #"level_"), 0)
			local bK = {}
			if bI == nil then
				goto bJ
			end
			local bL = bI.WaveList
			do
				local bM = 1
				while (bL and bL[tostring(bM)]) ~= nil do
					do
						local bN = bL[tostring(bM)]
						if bN == nil then
							goto bO
						end
						local bP = e(w)
						for bf, bF in pairs(bN.EnemyPoolWeights or {}) do
							local aI = tostring(bf)
							if self.enemyPools[aI] == nil then
								self:error(
									(
										(
											(
												((self.logPrefix .. " invalid pool reference level=") .. tostring(b8))
												.. " wave="
											) .. tostring(bM)
										) .. " pool="
									) .. aI
								)
								return false
							end
							bP:Set(aI, toFiniteNumber(bF, 0))
						end
						local bQ = math.floor(toFiniteNumber(bN.EnemyCount, 0))
						if bP.ValidCount <= 0 or bQ <= 0 then
							self:error(
								(((self.logPrefix .. " invalid wave level=") .. tostring(b8)) .. " wave=")
									.. tostring(bM)
							)
							return false
						end
						bK[#bK + 1] = {
							enemyPoolWeights = bP,
							enemyCount = bQ,
							healthFactor = math.max(0.01, toFiniteNumber(bN.HealthFactor, 1)),
						}
					end
					::bO::
					bM = bM + 1
				end
			end
			if b8 >= 1 and #bK > 0 then
				self.levelConfigByNumber[b8] = {
					healthFactor = math.max(0.01, toFiniteNumber(bI.HealthFactor, 1)),
					damageFactor = math.max(0.01, toFiniteNumber(bI.DamageFactor, 1)),
					waves = bK,
				}
			end
		end
		::bJ::
	end
	local bR = KeyValues.hunt_difficulty
	local bS = bR and bR[tostring(Q)]
	if bS == nil then
		self:error((self.logPrefix .. " hunt_difficulty missing difficulty=") .. tostring(Q))
		return false
	end
	local bT = KeyValues.hunt_intelligence
	local bU = bT and bT[tostring(Q)]
	local bV = toFiniteNumber
	local bW
	if bU ~= nil then
		bW = bU.level_max
	end
	self.maxLevel = bV(bW, 0)
	if self.maxLevel <= 0 or self.maxLevel ~= math.floor(self.maxLevel) then
		self:error((self.logPrefix .. " hunt_intelligence invalid level_max difficulty=") .. tostring(Q))
		return false
	end
	do
		local b8 = 1
		while b8 <= self.maxLevel do
			if self.levelConfigByNumber[b8] == nil then
				self:error(
					(
						(
							(self.logPrefix .. " hunt_levels missing valid level configuration difficulty=")
							.. tostring(Q)
						) .. " level="
					) .. tostring(b8)
				)
				return false
			end
			b8 = b8 + 1
		end
	end
	local bX = math.min(math.max(bz, 1), 4)
	self.healthFactor = toFiniteNumber(bS.HealthFactor, 1)
		* (bX >= 2 and toFiniteNumber(bS[("Player" .. tostring(bX)) .. "HealthFactor"], 1) or 1)
	self.damageFactor = toFiniteNumber(bS.DamageFactor, 1)
		* (bX >= 2 and toFiniteNumber(bS[("Player" .. tostring(bX)) .. "DamageFactor"], 1) or 1)
	self.difficultyCooldownReduction = math.min(99, math.max(0, toFiniteNumber(bS.BossCooldownReduction, 0)))
	self.difficultyBossGapAmplify = -self.difficultyCooldownReduction
	return true
end
function J.prototype.GetBossSpawnPosition(self, bY, a0, bZ)
	return Vector(bY.x + (a0 - (bZ - 1) / 2) * 720, bY.y + 480, bY.z)
end
function J.prototype.Stop(self, O, N)
	local b_ = self.isLoading
	self.runId = self.runId + 1
	self.waveSpawnId = self.waveSpawnId + 1
	if self.killEventListenerId ~= nil then
		StopGameEvent(self.killEventListenerId)
		self.killEventListenerId = nil
	end
	for L, bp in ipairs(self.enemies) do
		self:RemoveUnit(bp)
	end
	if N and self.spawnGroup ~= nil then
		UnloadSpawnGroupByHandle(self.spawnGroup)
	end
	self:ClearRuntimeState()
	if b_ then
		DungeonManager:HideLoadingScreen()
	end
end
function J.prototype.TeleportPlayers(self, bo)
	local c0 = self:GetParticipantHeroes()
	do
		local c1 = 0
		while c1 < #c0 do
			local c2 = Vector(bo.x + (c1 - (#c0 - 1) / 2) * E, bo.y, bo.z)
			self:TeleportHero(c0[c1 + 1], c2)
			c1 = c1 + 1
		end
	end
end
function J.prototype.TeleportHero(self, ar, bo)
	FindClearSpaceForUnit(ar, bo, true)
	ar:SetForwardVector(vec3_top)
	Event:Fire("teleport", { caster = ar, target = "hunt_boss" })
end
function J.prototype.StartBattleThink(self, b3)
	self:StopBattleThink()
	local c3 = {}
	local c4 = GameRules:GetGameTime() + H
	self.battleThinkTimerId = Timer:GameTimer(G, function()
		local bY = self.battleCenter
		if
			not self:IsActiveRun(b3)
			or not self.isRunning
			or bY == nil
			or self.phase ~= "battle" and self.phase ~= "intermission"
		then
			return
		end
		self.fieldBuffManager:Update()
		local c5 = GameRules:GetGameTime()
		if c5 < c4 then
			return G
		end
		c4 = c5 + H
		for L, ar in ipairs(self:GetParticipantHeroes()) do
			do
				local ab = ar:GetPlayerOwnerID()
				local ah = tostring(ab)
				if not f(self.activeParticipantPlayerIds, ab) or not ar:IsAlive() or CalcDistance(ar, bY) <= I then
					o(c3, ah)
					goto c6
				end
				if c3[ah] and GridNav:IsValidPosition(bY) then
					self:TeleportHero(ar, bY)
					o(c3, ah)
				else
					c3[ah] = true
				end
			end
			::c6::
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
function J.prototype.ReturnPlayerToLobby(self, ab, c7)
	if c7 == nil then
		c7 = false
	end
	local ar = PlayerResource:GetSelectedHeroEntity(ab)
	if not IsValid(ar) then
		return false
	end
	local bo = self.entryPositionsByPlayerId[tostring(ab)]
	if bo == nil then
		return false
	end
	self.fieldBuffManager:RemoveHero(ar)
	ar:SetRespawnPosition(bo)
	Npc:SetPlayerArea(ab, "lobby")
	if c7 and not ar:IsAlive() then
		ar:RespawnHero(false, false)
	end
	FindClearSpaceForUnit(ar, bo, true)
	Event:Fire("teleport", { caster = ar, target = "lobby" })
	return true
end
function J.prototype.CaptureSaveKeyIntensities(self, P)
	self.keyIntensitiesByPlayerId = {}
	for L, ab in ipairs(P.participantPlayerIds) do
		do
			local c8 = P.huntSlotIDs
			local a9 = c8 and c8[ab]
			if a9 == nil then
				goto c9
			end
			local al = HuntSaveArchive:GetSelectedSave(ab, a9)
			if al == nil then
				goto c9
			end
			local ca = json.decode(al.data)
			local az = ca
			if (az and az.strength) == nil then
				goto c9
			end
			local cb = toFiniteNumber(az.strength, -1)
			if cb >= 0 then
				self.keyIntensitiesByPlayerId[tostring(ab)] = math.floor(cb)
			end
		end
		::c9::
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
	local cc = {}
	local cd = {}
	for L, ab in ipairs(self.activeParticipantPlayerIds) do
		cc[tostring(ab)] = self.intermissionReadyPlayerIds[tostring(ab)] == true
	end
	do
		local aY = 0
		while aY < #self.bossSlots do
			local ce = self.bossSlots[aY + 1]
			if ce ~= nil and IsValid(ce) then
				cd[#cd + 1] = { slot = aY, ent_index = ce:entindex() }
			end
			aY = aY + 1
		end
	end
	local cf = {
		phase = self.phase,
		finish_reason = self.finishReason,
		difficulty = self.currentDifficulty,
		key_intensities = self.keyIntensitiesByPlayerId,
		level = self.currentLevel,
		wave = self.currentWave,
		active_player_ids = self.activeParticipantPlayerIds,
		ready_player_ids = cc,
		intermission_end_time = self.intermissionEndTime or 0,
		intermission_duration = F,
		bosses = cd,
		fixed_buffs = self.fieldBuffManager:GetFixedBuffs(),
		current_level_buffs = self.fieldBuffManager:GetCurrentLevelBuffs(),
		next_level_buffs = self.phase == "intermission" and self.fieldBuffManager:GetNextLevelBuffs() or {},
	}
	CustomNetTables:SetNetData("hunt_boss", "state", cf)
end
function J.prototype.GetParticipantHeroes(self)
	local c0 = {}
	for L, cg in ipairs(self.participantPlayerIds) do
		local ar = PlayerResource:GetSelectedHeroEntity(cg)
		if IsValid(ar) and ar:IsRealHero() and ar:GetTeamNumber() == DOTA_TEAM_GOODGUYS then
			c0[#c0 + 1] = ar
		end
	end
	return c0
end
function J.prototype.FindInfoTarget(self, aI)
	if self.spawnGroup == nil then
		return nil
	end
	for L, ch in ipairs(Entities:FindAllByClassname("info_target")) do
		if ch:GetSpawnGroupHandle() == self.spawnGroup and s(ch:GetName(), aI) then
			return ch
		end
	end
	return nil
end
function J.prototype.IsActiveRun(self, b3)
	return self.runId == b3
end
function J.prototype.RemoveUnit(self, ci)
	if not IsValid(ci) then
		return
	end
	ci:ForceKill(false)
	ci:MakeIllusion()
	ci:AddNoDraw()
	ci:CallAbilityDestroy()
	UTIL_Remove(ci)
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