--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "class/dungeon_room"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__New
local e = b.__TS__ArrayForEach
local f = b.__TS__Delete
local g = b.__TS__StringSplit
local h = b.__TS__ArraySort
local i = b.__TS__ArrayUnshift
local j = b.__TS__ArrayMap
local k = b.__TS__ArrayFilter
local l = b.__TS__ArraySlice
local m = b.__TS__StringTrim
local n = b.__TS__ObjectAssign
local o = b.__TS__ArrayIncludes
local p = b.__TS__SparseArrayNew
local q = b.__TS__SparseArrayPush
local r = b.__TS__SparseArraySpread
local s = b.__TS__ArrayPushArray
local t = b.__TS__StringEndsWith
local u = b.Set
local v = b.__TS__StringStartsWith
local w = b.__TS__ArrayFind
local x = b.__TS__ArrayFrom
local y = b.__TS__NumberToFixed
local z = {}
local A = require("class.client_item")
local B = A.ClientItem
local C = require("framework.native_gridnav_obstruction")
local D = C.NativeGridNavObstruction
local E = require("data.dungeon_gridnav.reader")
local F = E.gridNavReader
local G = require("class.dungeon_trap")
local H = G.DungeonTrap
local I = require("class.drop_item")
local J = I.DropItem
local K = require("class.shop_item")
local L = K.ShopItem
local M = require("class.weight_pool")
local N = M.CWeightPool
local O = {
	[RoomType.BOSS] = "particles/generic_gameplay/rune/rune_boss.vpcf",
	[RoomType.SHOP] = "particles/generic_gameplay/rune/rune_store.vpcf",
	[RoomType.TAVERN] = "particles/generic_gameplay/rune/rune_tavern.vpcf",
	[RoomType.STAIR] = "particles/generic_gameplay/rune/rune_stair_exit.vpcf",
	[RoomType.INVALID] = "particles/generic_gameplay/rune/rune_stair_exit.vpcf",
}
local P = {
	WishingPool = "particles/generic_gameplay/rune/wishing_pool_exit.vpcf",
	RegenWell = "particles/generic_gameplay/rune/regen_well_exit.vpcf",
	Book = "particles/generic_gameplay/rune/book_exit.vpcf",
	Smithy = "particles/generic_gameplay/rune/smithy_exit.vpcf",
}
local Q = "TravelingMerchant"
local R = 320
local S = 15
local T = 5
local U = {
	[RoomRewardType.BOON] = "particles/generic_gameplay/rune/rune_blessings.vpcf",
	[RoomRewardType.DOUBLE_BOON] = "particles/generic_gameplay/rune/rune_blessings.vpcf",
	[RoomRewardType.HERO_UPGRADE] = "particles/generic_gameplay/rune/rune_experience.vpcf",
	[RoomRewardType.POM] = "particles/generic_gameplay/rune/rune_property.vpcf",
	[RoomRewardType.GOLD] = "particles/generic_gameplay/rune/rune_bounty_first.vpcf",
	[RoomRewardType.TREASURE] = "particles/generic_gameplay/rune/rune_treasure.vpcf",
}
z.DungeonRoom = c()
local V = z.DungeonRoom
V.name = "DungeonRoom"
function V.prototype.____constructor(self, W, X, Y, Z, _, a0, a1, a2, a3, a4, a5, a6)
	self.validGridPositions = {}
	self.enemySpawnGatePositions = {}
	self.occupiedPositions = {}
	self.breakables = {}
	self.items = {}
	self.shopItems = {}
	self.dropItems = {}
	self.clientItems = {}
	self.pendingChestRewardNotices = {}
	self.previewRewardDrops = {}
	self.npcs = {}
	self.enemies = {}
	self.simulateEnemies = {}
	self.aliveEnemyCount = 0
	self.playerKilledEnemyCount = 0
	self.hasReportedUnitManagerGuard = false
	self.currentWave = 0
	self.gatesOpened = false
	self.isSpawnComplete = false
	self.isPrepare = false
	self.isActived = false
	self.isComplete = false
	self.isCombatEnd = false
	self.isDispose = false
	self.previewRewardSlots = {}
	self.enemyPreviewRewards = {}
	self.previewRewardAssignedEnemyCount = 0
	self.itemNameByItemID = {}
	self.droppedPreviewRewards = {}
	self.stairChestPlayers = {}
	self.stairChestCompletedPlayers = {}
	self.stairChestAutoClaimingPlayers = {}
	self.stairChestOpeningPlayers = {}
	self.stairChestIgnoredPlayers = {}
	self.entrancePrefix = ""
	self.exitInfos = {}
	self.registeredInteracts = {}
	self.travelingMerchantForward = vec3_bottom
	self.travelingMerchantAngles = "0 -90 0"
	self.difficultyHealthAmplify = 0
	self.difficultyDamageAmplify = 0
	self.difficultyCooldownReduction = 0
	self.difficultyBossGapAmplify = 0
	self.difficultyBossDamageAmplify = 0
	self.wishingPoolCount = 1
	self.shopRefreshCount = 0
	self.isSecretRoomCreated = false
	self.zoneID = W
	self.terrainThemeKey = a2
	self.roomID = X
	self.mapName = Y
	self.rewardType = _
	self.roomType = Z
	self.position = a0
	self.bossName = a3
	self.shopRarityPoolName = a5 or ""
	self.specialKind = a6
	self.spawnInfo = self:CreateSpawnInfo(a1, a2)
	self.guaranteedDrops = {}
	self:CalculateDifficultyModifiers()
	if a4 ~= nil then
		local a7 = d(N)
		if a4.ItemList ~= nil then
			for a8, a9 in pairs(a4.ItemList) do
				a7:Add(tostring(a8), toFiniteNumber(a9))
			end
		end
		self.dropPool = { dropChance = toFiniteNumber(a4.DropChance), itemPool = a7 }
	end
	self.spawnGroup = DOTA_SpawnMapAtPosition(Y, a0, true, function(aa)
		if self.isDispose then
			UnloadSpawnGroupByHandle(aa)
			return
		end
		print(((("[DungeonRoom " .. tostring(self.roomID)) .. "-") .. a1) .. "] onReadyToSpawn")
		ManuallyTriggerSpawnGroupCompletion(aa)
	end, function()
		print(((("[DungeonRoom " .. tostring(self.roomID)) .. "-") .. a1) .. "] onSpawnComplete")
		if self.isDispose then
			return
		end
		local ab = d(D, self.mapName, self.position, self:GetNativeNavigationProtectedAreas(self.spawnGroup))
		self.nativeNavigation = ab
		ab:Start(function()
			if not self.isDispose and self.nativeNavigation == ab then
				self.isSpawnComplete = true
			end
		end)
	end, nil)
	self.dungeonTrap = d(H, {
		getRoomID = function()
			return self.roomID
		end,
		getSpawnGroup = function()
			return self.spawnGroup
		end,
		getPosition = function()
			return self:GetPosition()
		end,
		getTerrainThemeKey = function()
			return self.terrainThemeKey
		end,
		isDisposed = function()
			return self.isDispose
		end,
		isCombatEnd = function()
			return self.isCombatEnd
		end,
		isCombatRoom = function()
			return self:IsCombatRoom()
		end,
		isBossRoom = function()
			return self:IsBossRoom()
		end,
		getRandomValidGridPosition = function()
			return self:GetRandomValidGridPosition()
		end,
		removeUnit = function(ac, ad)
			return self:RemoveUnit(ad)
		end,
	})
end
function V.prototype.RollShopRarity(self)
	if self.shopRarityPoolName == nil or self.shopRarityPoolName == "" then
		return 1
	end
	local ae = DrawPool:Draw(self.shopRarityPoolName)
	if ae == nil then
		return 1
	end
	local af = 0
	Game:EachPlayer(function(ac, ag)
		af = af + GetShopItemRarity(ag) + GetArtifactItemRarity(ag)
	end)
	local ah = math.floor(af / 100)
	if math.random(1, 100) <= af % 100 then
		ah = ah + 1
	end
	local ai = toFiniteNumber(ae, 1) + ah
	if ai < 1 then
		return 1
	end
	if ai > 5 then
		return 5
	end
	return ai
end
function V.prototype.dispose(self)
	if self.isDispose then
		return
	end
	self.isDispose = true
	local aj = self.nativeNavigation
	if aj ~= nil then
		aj:Dispose()
	end
	self.nativeNavigation = nil
	self.previewRewardSlots = {}
	self.enemyPreviewRewards = {}
	self.previewRewardAssignedEnemyCount = 0
	self.previewRewardDrops = {}
	self.droppedPreviewRewards = {}
	self:StopStairChestStateWatcher()
	self:StopUnitManagerGuardTimer()
	self.stairChestPlayers = {}
	self.stairChestCompletedPlayers = {}
	self.stairChestAutoClaimingPlayers = {}
	self.stairChestOpeningPlayers = {}
	self.stairChestIgnoredPlayers = {}
	self.stairChestItemPos = nil
	self.aliveEnemyCount = 0
	e(self.breakables, function(ac, ak)
		self:RemoveUnit(ak)
	end)
	e(self.npcs, function(ac, ak)
		if IsValid(ak) then
			Npc:RemoveNpc(ak:entindex())
		end
		self:RemoveUnit(ak)
	end)
	e(self.enemies, function(ac, ak)
		self:RemoveUnit(ak)
	end)
	e(self.simulateEnemies, function(ac, ak)
		ak:dispose()
	end)
	e(self.items, function(ac, ak)
		if IsValid(ak) then
			local al = ak:GetContainedItem()
			if IsValid(al) then
				UTIL_Remove(al)
			end
			UTIL_Remove(ak)
		end
	end)
	e(self.dropItems, function(ac, ak)
		ak:dispose()
	end)
	e(self.clientItems, function(ac, ak)
		ak:dispose()
	end)
	e(self.shopItems, function(ac, ak)
		ak:dispose()
	end)
	for ac, am in ipairs(self.exitInfos) do
		if am.rewardParticleID ~= nil then
			ParticleManager:DestroyParticle(am.rewardParticleID, true)
			ParticleManager:ReleaseParticleIndex(am.rewardParticleID)
		end
		if am.eliteParticleID ~= nil then
			ParticleManager:DestroyParticle(am.eliteParticleID, true)
			ParticleManager:ReleaseParticleIndex(am.eliteParticleID)
		end
	end
	self.exitInfos = {}
	self:ClearFirstRoomRewardGuide()
	if self.timerID ~= nil then
		Timer:StopTimer(self.timerID)
		self.timerID = nil
	end
	if self.eventListenerID ~= nil then
		StopGameEvent(self.eventListenerID)
		self.eventListenerID = nil
	end
	self.dungeonTrap:Dispose()
	if IsValid(self.travelingMerchantPlaceholder) then
		self.travelingMerchantPlaceholder:RemoveSelf()
		self.travelingMerchantPlaceholder = nil
	end
	do
		local an = 0
		while an < #self.registeredInteracts do
			Interaction:UnregisterInteractable(self.registeredInteracts[an + 1])
			an = an + 1
		end
	end
	self.registeredInteracts = {}
	self.breakables = {}
	self.npcs = {}
	self.enemies = {}
	self.simulateEnemies = {}
	self.items = {}
	self.dropItems = {}
	self.clientItems = {}
	self.pendingChestRewardNotices = {}
	self:RemovePrefabNavigationUnits()
	if self.secretRoomSpawnGroup ~= nil then
		UnloadSpawnGroupByHandle(self.secretRoomSpawnGroup)
		self.secretRoomSpawnGroup = nil
	end
	if self.secretRoomGate ~= nil and IsValid(self.secretRoomGate) then
		self:RemoveUnit(self.secretRoomGate)
		self.secretRoomGate = nil
	end
	self.secretRoomPrefix = nil
	self.secretRoomDoorPosition = nil
	self.secretRoomDoorDirection = nil
	self.isSecretRoomCreated = false
	UnloadSpawnGroupByHandle(self.spawnGroup)
end
function V.prototype.SetRewardType(self, _)
	self.rewardType = _
end
function V.prototype.SetSpecialKind(self, a6)
	self.specialKind = a6
end
function V.prototype.Prepare(self)
	if self.isPrepare then
		return
	end
	print(
		(
			(
				(
					(
						(
							(
								(("[DungeonRoom " .. tostring(self.roomID)) .. "] Prepare: type=")
								.. RoomType[self.roomType]
							) .. " reward="
						) .. RoomRewardType[self.rewardType]
					) .. " special="
				) .. (self.specialKind or "-")
			) .. " map="
		) .. self.mapName
	)
	if self:IsCombatRoom() then
		self:InitializePreviewRoomRewards()
	end
	self:AnalyzeGrid()
	self:CreateEntrance()
	self:CreateExit()
	self:ResolveTravelingMerchantSpawnData()
	self:CreateTravelingMerchantPlaceholder()
	self.dungeonTrap:Prepare()
	self:CreateBreakable()
	if self.roomType == RoomType.SHOP then
		self:CreateShopItem(false)
	end
	if self.roomType == RoomType.TAVERN then
		self:CreateTavernItems()
	end
	if self.roomType == RoomType.STAIR then
		self:CreateStairItem()
	end
	if self.roomType == RoomType.SPECIAL then
		self:CreateSpecialRoom()
	end
	if self.specialKind == Q and self.roomType == RoomType.STAIR then
		if self.zoneID < 3 then
			self:CreateInteractiveTravelingMerchant()
		end
	end
	if self:IsCombatRoom() and not self:IsBossRoom() then
		if self.spawnInfo.isDeploy then
			self:CreateWaveEnemy()
		end
	end
	self.isPrepare = true
	self.eventListenerID = GameEvent("entity_killed", function(self, ...)
		return self:OnEntityKilled(...)
	end, self)
end
function V.prototype.InitializePreviewRoomRewards(self)
	self.previewRewardSlots = {}
	self.enemyPreviewRewards = {}
	self.previewRewardAssignedEnemyCount = 0
	local ao = self:IsBossRoom() and 1 or math.max(1, self.spawnInfo.totalCount)
	do
		local an = 0
		while an < ao do
			local ap = self.previewRewardSlots
			ap[#ap + 1] = {}
			an = an + 1
		end
	end
	local aq = 0
	Game:EachPlayer(function(ac, ar)
		local as = CommonService:GetPlayerServiceNetTable(ar, "player_room_rewards_preview")
		local at = as and as[self.roomID]
		if at == nil then
			return
		end
		if toFiniteNumber(at.receive_times, 0) > 0 then
			return
		end
		local au = at.rewards
		if au == nil or #au <= 0 then
			return
		end
		do
			local an = 0
			while an < #au do
				do
					local av = au[an + 1]
					local aw = toFiniteNumber(av.item_id, 0)
					local ax = toFiniteNumber(av.amounts, 0)
					if aw <= 0 or ax <= 0 then
						goto ay
					end
					local a8 = self:ResolvePreviewRewardItemName(aw)
					if a8 == nil then
						print(
							((("[DungeonRoom " .. tostring(self.roomID)) .. "] 预览奖励 item_id=") .. tostring(aw))
								.. " 未找到对应 itemName，已跳过"
						)
						goto ay
					end
					local az = RandomInt(0, ao - 1)
					local aA = self.previewRewardSlots[az + 1]
					aA[#aA + 1] = { playerID = ar, itemID = aw, amounts = ax, itemName = a8 }
					aq = aq + 1
				end
				::ay::
				an = an + 1
			end
		end
	end)
	if aq > 0 then
		print(
			(
				((("[DungeonRoom " .. tostring(self.roomID)) .. "] 预览奖励已预分配到 ") .. tostring(ao))
				.. " 个怪物槽位，奖励条目数="
			) .. tostring(aq)
		)
	end
end
function V.prototype.ResolvePreviewRewardItemName(self, aw)
	if aw <= 0 then
		return nil
	end
	local aB = self.itemNameByItemID[aw]
	if aB ~= nil then
		return aB
	end
	for a8, aC in pairs(KeyValues.items) do
		local aD = toFiniteNumber
		local aE = aC.ItemID
		if aE == nil then
			aE = aC.item_id
		end
		local aF = aE
		if aF == nil then
			aF = aC.id
		end
		local aG = aF
		if aG == nil then
			aG = aC.ID
		end
		local aH = aG
		if aH == nil then
			aH = aC.ServiceItemID
		end
		local aI = aD(aH, -1)
		if aI == aw then
			self.itemNameByItemID[aw] = a8
			return a8
		end
	end
	if KeyValues.items.item_health_potion_1 ~= nil then
		self.itemNameByItemID[aw] = "item_health_potion_1"
		print(
			((("[DungeonRoom " .. tostring(self.roomID)) .. "] 预览奖励 item_id=") .. tostring(aw))
				.. " 未找到精确映射，使用调试占位物 item_health_potion_1"
		)
		return "item_health_potion_1"
	end
	return nil
end
function V.prototype.AssignPreviewRewardsToEnemy(self, aJ)
	local aK = self.previewRewardSlots[self.previewRewardAssignedEnemyCount + 1] or {}
	if #aK > 0 then
		local aL = aJ:GetEntityIndex()
		self.enemyPreviewRewards[aL] = {}
		do
			local an = 0
			while an < #aK do
				local aM = self.enemyPreviewRewards[aL]
				aM[#aM + 1] = aK[an + 1]
				an = an + 1
			end
		end
		print(
			(
				(((("[DungeonRoom " .. tostring(self.roomID)) .. "] 怪物 ") .. aJ:GetUnitName()) .. " 分配到 ")
				.. tostring(#aK)
			) .. " 条预览奖励"
		)
	end
	self.previewRewardAssignedEnemyCount = self.previewRewardAssignedEnemyCount + 1
end
function V.prototype.DropPreviewRewardsFromEnemy(self, ad)
	local aL = ad:GetEntityIndex()
	local au = self.enemyPreviewRewards[aL]
	if au == nil or #au <= 0 then
		return
	end
	f(self.enemyPreviewRewards, aL)
	local aN = GetGroundPosition(ad:GetAbsOrigin(), ad)
	Interaction:BeginSyncBatch()
	do
		local an = 0
		while an < #au do
			do
				local av = au[an + 1]
				if KeyValues.items[av.itemName] == nil then
					goto aO
				end
				self:AddDroppedPreviewReward(av.playerID, av.itemID, av.amounts)
				local aP = d(B, av.playerID, av.itemID, aN)
				local aQ = self.clientItems
				aQ[#aQ + 1] = aP
				local aR = { clientItem = aP, reward = av }
				local aS = self.previewRewardDrops
				aS[#aS + 1] = aR
				local aT = Interaction:RegisterInteract(aP.entity, InteractType.Consumables, 200, function(ac, aU, ar)
					return self:PickupPreviewRewardDrop(aU, aR, ar)
				end, 1, av.playerID)
				if aT ~= -1 then
					aR.interactIndex = aT
					local aV = self.registeredInteracts
					aV[#aV + 1] = aT
				end
				Match:AddPlayerRoundRewards(
					av.playerID,
					{ { item_id = av.itemID, amounts = av.amounts, item_rarity = GetPropRarity(av.itemID) } }
				)
			end
			::aO::
			an = an + 1
		end
	end
	Interaction:EndSyncBatch()
end
function V.prototype.PickupPreviewRewardDrop(self, aU, aR, ar)
	if not IsValid(aU) or not aU:IsRealHero() or not aU:IsAlive() then
		return false
	end
	local aP = aR.clientItem
	if aP.isDispose or not aP:IsLanded() or not IsValid(aP.entity) then
		return false
	end
	local aW = ar or aU:GetPlayerOwnerID()
	if aW ~= aR.reward.playerID then
		return false
	end
	local aX = aP:GetLandedPosition()
	print(
		(
			(
				(
					(
						(
							(
								(
									(
										(("[DungeonRoom " .. tostring(self.roomID)) .. "] 预览奖励拾取 player=")
										.. tostring(aW)
									) .. " owner="
								) .. tostring(aR.reward.playerID)
							) .. " item_id="
						) .. tostring(aR.reward.itemID)
					) .. " item_name="
				) .. aR.reward.itemName
			) .. " amounts="
		) .. tostring(aR.reward.amounts)
	)
	CommonService:SendReceiveRewards(aW, { { item_id = aR.reward.itemID, amounts = aR.reward.amounts } })
	Event:Fire("client_item_pickup", { playerID = aW, item_id = aR.reward.itemID })
	self:CreateClientItemPickupParticle(aX, aU)
	if aR.interactIndex ~= nil then
		Interaction:UnregisterInteractable(aR.interactIndex)
		ArrayRemove(self.registeredInteracts, aR.interactIndex)
		aR.interactIndex = nil
	end
	ArrayRemove(self.previewRewardDrops, aR)
	ArrayRemove(self.clientItems, aP)
	aP:dispose()
	return true
end
function V.prototype.TryAutoPickupPreviewReward(self, aU)
	if not IsValid(aU) or not aU:IsRealHero() or not aU:IsAlive() then
		return false
	end
	local aW = aU:GetPlayerOwnerID()
	local aY = aU:GetAbsOrigin()
	local aZ
	local a_ = 200
	do
		local an = 0
		while an < #self.previewRewardDrops do
			do
				local aR = self.previewRewardDrops[an + 1]
				if aR == nil then
					goto b0
				end
				local aP = aR.clientItem
				if aR.reward.playerID ~= aW or aP.isDispose or not aP:IsLanded() or not IsValid(aP.entity) then
					goto b0
				end
				local b1 = aP.entity:GetAbsOrigin()
				local b2 = (aY - b1):Length2D()
				if b2 <= a_ then
					a_ = b2
					aZ = aR
				end
			end
			::b0::
			an = an + 1
		end
	end
	if aZ == nil then
		return false
	end
	return self:PickupPreviewRewardDrop(aU, aZ, aW)
end
function V.prototype.CanAutoPickupDropItem(self, b3, b4)
	local b5 = b4
	if not b5 then
		local b6 = KeyValues.items[b3.itemName]
		if b6 ~= nil then
			b6 = b6.AutoPickUp
		end
		b5 = b6 == 1
	end
	return b5
end
function V.prototype.RegisterDropItemForAutoPickup(self, b3, b7)
	local b8 = self.dropItems
	b8[#b8 + 1] = b3
	if b7 ~= -1 then
		local b9 = self.registeredInteracts
		b9[#b9 + 1] = b7
	end
end
function V.prototype.UnregisterDropItemForAutoPickup(self, b3, b7)
	ArrayRemove(self.dropItems, b3)
	if b7 ~= -1 then
		ArrayRemove(self.registeredInteracts, b7)
	end
end
function V.prototype.TryAutoPickupDropItem(self, aU, b4)
	if b4 == nil then
		b4 = false
	end
	if not IsValid(aU) or not aU:IsRealHero() or not aU:IsAlive() then
		return false
	end
	local aW = aU:GetPlayerOwnerID()
	local aY = aU:GetAbsOrigin()
	local ba
	local bb
	local a_ = 200
	do
		local an = 0
		while an < #self.dropItems do
			do
				local b3 = self.dropItems[an + 1]
				if
					b3 == nil
					or b3.isDispose
					or not b3:IsLanded()
					or not IsValid(b3.entity)
					or not self:CanAutoPickupDropItem(b3, b4)
				then
					goto bc
				end
				if b3.playerID ~= nil and b3.playerID ~= aW then
					goto bc
				end
				local aL = b3:GetEntityIndex()
				if aL == -1 then
					goto bc
				end
				local b1 = b3.entity:GetAbsOrigin()
				local b2 = (aY - b1):Length2D()
				if b2 <= a_ then
					a_ = b2
					ba = b3
					bb = aL
				end
			end
			::bc::
			an = an + 1
		end
	end
	if ba == nil or bb == nil then
		return false
	end
	local aX = ba.entity:GetAbsOrigin()
	local bd = Interaction:ExecutePrimaryCallback(bb, aU, aW)
	if not bd then
		return false
	end
	self:CreateClientItemPickupParticle(aX, aU)
	Interaction:UnregisterInteractable(bb)
	ArrayRemove(self.registeredInteracts, bb)
	ArrayRemove(self.dropItems, ba)
	return true
end
function V.prototype.AddDroppedPreviewReward(self, ar, aw, ax)
	if ax <= 0 then
		return
	end
	local be = tostring(ar)
	local bf = tostring(aw)
	local bg, bh = self.droppedPreviewRewards, be
	if bg[bh] == nil then
		bg[bh] = {}
	end
	self.droppedPreviewRewards[be][bf] = (self.droppedPreviewRewards[be][bf] or 0) + ax
end
function V.prototype.GetDroppedPreviewRewards(self, ar)
	local bi = self.droppedPreviewRewards[tostring(ar)]
	if bi == nil then
		return {}
	end
	local bj = {}
	for aw, ax in pairs(bi) do
		bj[tostring(aw)] = toFiniteNumber(ax, 0)
	end
	return bj
end
function V.prototype.Activate(self)
	if self.isDispose then
		return
	end
	if self.isActived then
		return
	end
	if not self.isPrepare then
		self:Prepare()
	end
	self.isActived = true
	print(
		(
			(
				(
					((("[DungeonRoom " .. tostring(self.roomID)) .. "] Activate: type=") .. RoomType[self.roomType])
					.. " reward="
				) .. RoomRewardType[self.rewardType]
			) .. " special="
		) .. (self.specialKind or "-")
	)
	if self.roomType == RoomType.STAIR and not DungeonManager:IsTutorial() then
		local bk = DungeonManager:GetRoomIndex() + 1
		Game:EachPlayer(function(ac, ar)
			Service:ReportClick(ar, "dungeon", "reward_room|enter|room_" .. tostring(bk))
		end)
	end
	self.currentWave = 0
	Event:Fire("dungeon_room_start", { room = self })
	self.dungeonTrap:Activate()
	if self:IsCombatRoom() then
		self:LockGate()
		self:StartUnitManagerGuardTimer()
		if self:IsBossRoom() then
			self:CreateBoss()
		else
			if self.spawnInfo.isDeploy then
				for an, ad in ipairs(self.enemies) do
					ad:RemoveModifierByName("modifier_sleep")
				end
			end
			self.timerID = Timer:GameTimer(self.spawnInfo.isDeploy and self.spawnInfo.spawnInterval or 0, function()
				self:CreateWaveEnemy()
				if self.spawnInfo.totalCount > 0 then
					return self.spawnInfo.spawnInterval
				end
			end)
		end
	else
		if DungeonManager:IsTutorial() then
			self:LockGate()
			return
		end
		if self.roomType == RoomType.STAIR then
			self:StartStairChestStateWatcher()
			self:RefreshStairChestPlayerStates()
		else
			self:OpenGates()
		end
	end
end
function V.prototype.Complete(self, bl)
	if self.isComplete then
		return
	end
	self.isComplete = true
	self:StopStairChestStateWatcher()
	self.dungeonTrap:Complete()
	self:StopUnitManagerGuardTimer()
	if self.timerID ~= nil then
		Timer:StopTimer(self.timerID)
		self.timerID = nil
	end
	if self.eventListenerID ~= nil then
		StopGameEvent(self.eventListenerID)
		self.eventListenerID = nil
	end
	e(self.items, function(ac, ak)
		if IsValid(ak) then
			local al = ak:GetContainedItem()
			if IsValid(al) then
				UTIL_Remove(al)
			end
			UTIL_Remove(ak)
		end
	end)
	e(self.dropItems, function(ac, ak)
		ak:dispose()
	end)
	e(self.clientItems, function(ac, ak)
		ak:dispose()
	end)
	e(self.shopItems, function(ac, ak)
		print(ak.itemName, "dispose")
		ak:dispose()
	end)
	self.items = {}
	self.dropItems = {}
	self.clientItems = {}
	self.shopItems = {}
	self.pendingChestRewardNotices = {}
	do
		local an = 0
		while an < #self.registeredInteracts do
			Interaction:UnregisterInteractable(self.registeredInteracts[an + 1])
			an = an + 1
		end
	end
	self.registeredInteracts = {}
	for ac, am in ipairs(self.exitInfos) do
		if am.rewardParticleID ~= nil then
			ParticleManager:DestroyParticle(am.rewardParticleID, true)
			ParticleManager:ReleaseParticleIndex(am.rewardParticleID)
		end
		if am.eliteParticleID ~= nil then
			ParticleManager:DestroyParticle(am.eliteParticleID, true)
			ParticleManager:ReleaseParticleIndex(am.eliteParticleID)
		end
	end
	local bm = self.exitInfos[bl + 1]
	if bm ~= nil then
		print(
			(
				(
					(
						((("[DungeonRoom " .. tostring(self.roomID)) .. "] 玩家选择出口 ") .. tostring(bl))
						.. "，进入下个房间，房间奖励: "
					) .. tostring(bm.rewardType)
				) .. " special="
			) .. (bm.specialKind or "")
		)
		DungeonManager:SetSelectedNextRoomRoute(bm.rewardType, bm.specialKind)
	end
	Event:Fire("dungeon_room_complete", { room = self })
end
function V.prototype.LockGate(self)
	local bn = self:FindEntities("prop_dynamic", "prop_gate")
	for ac, bo in ipairs(bn) do
		local bp = bo:GetName()
		local bq = g(bp, "_")[1]
		if bq == self.entrancePrefix then
			bo:FireOutput("OnUser1", nil, nil, nil, 0)
		end
	end
end
function V.prototype.OpenGates(self)
	if self.gatesOpened then
		return
	end
	self.gatesOpened = true
	local bn = self:FindEntities("prop_dynamic", "prop_gate")
	print(
		(
			((("[DungeonRoom " .. tostring(self.roomID)) .. "] OpenGates - 找到 ") .. tostring(#bn))
			.. " 个门，出口数量: "
		) .. tostring(#self.exitInfos)
	)
	local br = {}
	for ac, bo in ipairs(bn) do
		local bp = bo:GetName()
		local bq = g(bp, "_")[1]
		if not br[bq] then
			br[bq] = {}
		end
		local bs = br[bq]
		bs[#bs + 1] = bo
	end
	do
		local an = 0
		while an < #self.exitInfos do
			do
				local am = self.exitInfos[an + 1]
				if am == nil then
					goto bt
				end
				local bl = an
				local bu = self:GetExitTooltip(am)
				local bv = br[am.prefix]
				if bv == nil or #bv == 0 then
					print(
						((("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ 未找到前缀为 ") .. am.prefix)
							.. " 的门"
					)
					goto bt
				end
				local bw = P[am.specialKind or ""] or O[am.roomType] or U[am.rewardType]
				print(
					(
						(
							(
								(
									(((("[DungeonRoom " .. tostring(self.roomID)) .. "] ") .. tostring(bl)) .. " ")
									.. RoomType[am.roomType]
								) .. " "
							) .. RoomRewardType[am.rewardType]
						) .. " 创建粒子效果: "
					) .. tostring(bw)
				)
				if bw ~= nil and am.rewardParticleID == nil then
					local bx = bv[1]:GetAbsOrigin()
					local by = ParticleManager:CreateParticleForce(bw, PATTACH_CUSTOMORIGIN, nil)
					ParticleManager:SetParticleControl(by, 0, bx)
					am.rewardParticleID = by
				end
				if am.roomType == RoomType.ELITE and am.eliteParticleID == nil then
					local bx = bv[1]:GetAbsOrigin()
					local bz = ParticleManager:CreateParticleForce(
						"particles/generic_gameplay/rune/rune_elite.vpcf",
						PATTACH_CUSTOMORIGIN,
						nil
					)
					ParticleManager:SetParticleControl(bz, 0, bx)
					am.eliteParticleID = bz
				end
				for ac, bo in ipairs(bv) do
					local bp = bo:GetName()
					bo:FireOutput("OnUser1", nil, nil, nil, 0)
					if self:IsFirstRoomRewardGuideEnabled() then
						self:ShowFirstRoomRewardGuide(bo:GetEntityIndex())
					end
					local aT = Interaction:RegisterInteract(bo, InteractType.Portal, 200, function(ac, aU)
						self:ClearFirstRoomRewardGuide()
						aU:AddNewModifier(
							aU,
							nil,
							"modifier_enter_gate",
							{ position = VectorToString(bo:GetAbsOrigin() + am.direction * 600), duration = 1 }
						)
						DungeonManager:ShowLoadingScreen()
						if self:IsFirstRoomRewardGuideEnabled() then
							self:ShowFirstRoomRewardGuide(bo:GetEntityIndex())
						end
						aU:GameTimer(1, function()
							self:Complete(bl)
						end)
					end)
					Interaction:UpdateInteract(aT, { tooltip = bu })
					if aT ~= -1 then
						local bA = self.registeredInteracts
						bA[#bA + 1] = aT
					end
				end
			end
			::bt::
			an = an + 1
		end
	end
	Event:Fire("dungeon_room_open_gates", { room = self })
end
function V.prototype.CreateTreasure(self, a0)
	if self:IsBossRoom() then
		self:SpawnBossCoinStacks(a0)
		self:OpenGates()
		return
	end
	print("创建奖励:", self.roomID, RoomRewardType[self.rewardType])
	local a8
	repeat
		local bB = self.rewardType
		local bC = bB == RoomRewardType.POM
		if bC then
			a8 = "item_tome_of_prop"
			break
		end
		bC = bC or bB == RoomRewardType.BOON
		if bC then
			a8 = "item_boon_bless"
			break
		end
		bC = bC or bB == RoomRewardType.DOUBLE_BOON
		if bC then
			a8 = "item_boon_bless_double"
			break
		end
		bC = bC or bB == RoomRewardType.HERO_UPGRADE
		if bC then
			a8 = "item_hammer_weapon"
			break
		end
		bC = bC or bB == RoomRewardType.TREASURE
		if bC then
			a8 = "item_treasure"
			break
		end
		bC = bC or bB == RoomRewardType.GOLD
		do
			a8 = "item_gold_pouch"
			break
		end
	until true
	if a8 == nil then
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 警告：无法获取奖励物品")
		self:OpenGates()
		return
	end
	local b3 = d(J, a8, a0)
	local bD = b3.particleIDs
	bD[#bD + 1] = ParticleManager:CreateParticleForce(
		"particles/generic_gameplay/rune/rube_drop_items_fx.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		b3.entity
	)
	local bE = self.dropItems
	bE[#bE + 1] = b3
	if self:IsFirstRoomRewardGuideEnabled() then
		self:ShowFirstRoomRewardGuide(b3.entity:GetEntityIndex())
	end
	local aT = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 150, function(ac, aU, ar)
		if not b3:IsLanded() then
			return false
		end
		aU:AddItemByName(a8)
		if not DungeonManager:IsTutorial() then
			local bk = DungeonManager:GetRoomIndex() + 1
			Service:ReportClick(ar, "dungeon", "room_reward|pickup|room_" .. tostring(bk))
		end
		if self.rewardType == RoomRewardType.BOON or self.rewardType == RoomRewardType.DOUBLE_BOON then
			local bF = self.rewardType == RoomRewardType.DOUBLE_BOON
			Game:EachPlayer(function(ac, bG)
				Event:Fire("bless_room_reward_claimed", { playerID = bG, isDouble = bF })
			end)
		end
		b3:dispose()
		self:ClearFirstRoomRewardGuide()
		self:OpenGates()
	end, nil, nil, a8)
	if aT ~= -1 then
		local bH = self.registeredInteracts
		bH[#bH + 1] = aT
	end
end
function V.prototype.IsFirstRoomRewardGuideEnabled(self)
	return GameRules:GetCustomGameDifficulty() <= 2 and self.roomID == 0
end
function V.prototype.ShowFirstRoomRewardGuide(self, bI)
	Game:EachPlayer(function(ac, ar)
		local aU = PlayerResource:GetSelectedHeroEntity(ar)
		if IsValid(aU) and aU:IsRealHero() then
			aU:AddNewModifier(aU, nil, "modifier_first_dungeon_guide", { targetEntIndex = bI })
		end
	end)
end
function V.prototype.ClearFirstRoomRewardGuide(self)
	if not self:IsFirstRoomRewardGuideEnabled() then
		return
	end
	Game:EachPlayer(function(ac, ar)
		local aU = PlayerResource:GetSelectedHeroEntity(ar)
		if IsValid(aU) then
			aU:RemoveAllModifiersOfName("modifier_first_dungeon_guide")
		end
	end)
end
function V.prototype.SpawnBossCoinStacks(self, bJ)
	local bK = RandomInt(8, 15)
	local bL = 480
	local bM = 10
	Interaction:BeginSyncBatch()
	do
		local an = 0
		while an < bK do
			local bN
			do
				local bO = 0
				while bO < bM do
					local bP = RandomFloat(0, 360)
					local b2 = RandomFloat(0, bL)
					local bQ = Vector(math.cos(bP * math.pi / 180) * b2, math.sin(bP * math.pi / 180) * b2, 0)
					local bR = bJ:__add(bQ)
					if GridNav:IsValidPosition(bR) then
						bN = bR
						break
					end
					bO = bO + 1
				end
			end
			if bN == nil then
				bN = self:GetNearestValidGridPosition(bJ) or bJ
			end
			local b3 = d(J, "item_coin_stack", bN)
			local bS = self.dropItems
			bS[#bS + 1] = b3
			local aT = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 200, function(ac, aU)
				aU:AddItemByName("item_coin_stack")
				b3:dispose()
			end, nil, nil, "item_coin_stack")
			if aT ~= -1 then
				local bT = self.registeredInteracts
				bT[#bT + 1] = aT
			end
			an = an + 1
		end
	end
	Interaction:EndSyncBatch()
	print(((("[DungeonRoom " .. tostring(self.roomID)) .. "] Boss房掉落 ") .. tostring(bK)) .. " 个金币堆")
end
function V.prototype.NormalizeGridPhaseFromCenter(self, bQ)
	local bU = GRID_SIZE * 0.5
	local bV = math.abs(bQ % GRID_SIZE)
	local bW = math.min(bV, math.abs(GRID_SIZE - bV))
	local bX = math.abs(bV - bU)
	return bX < bW and bU or 0
end
function V.prototype.ResolveGridAnalysisOrigin(self)
	local bv = self:FindEntities("prop_dynamic", "prop_gate")
	if #bv <= 0 then
		return self.position
	end
	local bY = 0
	local bZ = 0
	local b_ = 0
	local bU = GRID_SIZE * 0.5
	do
		local an = 0
		while an < #bv do
			local bo = bv[an + 1]
			local c0 = bo:GetAbsOrigin()
			local c1 = c0.x - self.position.x
			local c2 = c0.y - self.position.y
			local c3 = c0.x
			local c4 = c0.y
			if math.abs(c1) > math.abs(c2) then
				c3 = c0.x - (c1 > 0 and bU or -bU)
			else
				c4 = c0.y - (c2 > 0 and bU or -bU)
			end
			if self:NormalizeGridPhaseFromCenter(c3 - self.position.x) >= bU then
				bZ = bZ + 1
			end
			if self:NormalizeGridPhaseFromCenter(c4 - self.position.y) >= bU then
				b_ = b_ + 1
			end
			bY = bY + 1
			an = an + 1
		end
	end
	local c5 = bZ * 2 > bY and bU or 0
	local c6 = b_ * 2 > bY and bU or 0
	return Vector(self.position.x + c5, self.position.y + c6, self.position.z)
end
function V.prototype.IsInsideEnemySpawnGates(self, a0)
	local c7 = 32
	for ac, bo in ipairs(self.enemySpawnGatePositions) do
		local c1 = bo.x - self.position.x
		local c2 = bo.y - self.position.y
		if math.abs(c1) > math.abs(c2) then
			if c1 > 0 and a0.x >= bo.x - c7 then
				return false
			end
			if c1 < 0 and a0.x <= bo.x + c7 then
				return false
			end
		else
			if c2 > 0 and a0.y >= bo.y - c7 then
				return false
			end
			if c2 < 0 and a0.y <= bo.y + c7 then
				return false
			end
		end
	end
	return true
end
function V.prototype.IsCurrentRoomSpawnCell(self, a0)
	if self.isDispose or not self:IsInsideEnemySpawnGates(a0) then
		return false
	end
	local c8 = F:GetCode(self.mapName, a0, self.position)
	return c8 == 1 and GridNav:IsValidPosition(a0)
end
function V.prototype.GetEnemySpawnReference(self)
	local c9
	if self.isActived then
		Game:EachPlayer(function(ac, ar)
			local aU = PlayerResource:GetSelectedHeroEntity(ar)
			if c9 == nil and IsValid(aU) and aU:IsAlive() and self:IsCurrentRoomSpawnCell(aU:GetAbsOrigin()) then
				c9 = aU:GetAbsOrigin()
			end
		end)
	end
	if c9 ~= nil then
		return c9
	end
	if self:IsCurrentRoomSpawnCell(self.position) then
		return self.position
	end
	local a_ = math.huge
	for ac, bR in ipairs(self.validGridPositions) do
		do
			if not self:IsCurrentRoomSpawnCell(bR) then
				goto ca
			end
			local b2 = CalcDistance(bR, self.position)
			if b2 < a_ then
				a_ = b2
				c9 = bR
			end
		end
		::ca::
	end
	return c9
end
function V.prototype.IsEnemySpawnPositionValid(self, a0, c9)
	return c9 ~= nil and self:IsCurrentRoomSpawnCell(a0) and GridNav:CanFindPath(c9, a0)
end
function V.prototype.PlaceEnemyAtValidPosition(self, aJ, cb)
	local c9 = self:GetEnemySpawnReference()
	local cc = h({ unpack(self.validGridPositions) }, function(ac, cd, ce)
		return CalcDistance(cd, cb) - CalcDistance(ce, cb)
	end)
	i(cc, cb)
	local cf
	local cg = 0
	for ac, bR in ipairs(cc) do
		do
			if not self:IsEnemySpawnPositionValid(bR, c9) then
				goto ch
			end
			if cf == nil then
				cf = bR
			end
			FindClearSpaceForUnit(aJ, bR, true)
			if self:IsEnemySpawnPositionValid(aJ:GetAbsOrigin(), c9) then
				return true
			end
			cg = cg + 1
			if cg >= 8 then
				break
			end
		end
		::ch::
	end
	if cf == nil or not self:IsEnemySpawnPositionValid(cf, c9) then
		return false
	end
	local ci = aJ:GetAbsOrigin()
	aJ:SetAbsOrigin(GetGroundPosition(cf, aJ))
	local cj = self:IsEnemySpawnPositionValid(aJ:GetAbsOrigin(), c9)
	print(
		(
			(
				(
					(
						(
							(
								(
									(
										(("[DungeonRoom " .. tostring(self.roomID)) .. "] 修正刷怪落点 map=")
										.. self.mapName
									) .. " unit="
								) .. aJ:GetUnitName()
							) .. " from="
						) .. VectorToString(ci)
					) .. " to="
				) .. VectorToString(aJ:GetAbsOrigin())
			) .. " valid="
		) .. tostring(cj)
	)
	return cj
end
function V.prototype.AnalyzeGrid(self)
	local bJ = self:ResolveGridAnalysisOrigin()
	local ck = 5
	local cl = 20
	self.validGridPositions = {}
	self.enemySpawnGatePositions = j(self:FindEntities("prop_dynamic", "prop_gate"), function(ac, bo)
		return bo:GetAbsOrigin()
	end)
	local cm, cn = F:GetMap(self.mapName)
	if cm == nil then
		print(
			(
				((("[DungeonRoom " .. tostring(self.roomID)) .. "] 无有效刷怪模板 map=") .. self.mapName)
				.. " reason="
			) .. tostring(cn)
		)
		return
	end
	local co = bJ.y - GRID_SIZE * 2
	do
		local cp = 0
		while cp <= cl do
			local cq = false
			do
				local cr = -cp
				while cr <= cp do
					do
						local cs = -cp
						while cs <= cp do
							if math.abs(cr) == cp or math.abs(cs) == cp then
								local ct = Vector(bJ.x + cr * GRID_SIZE, bJ.y + cs * GRID_SIZE, bJ.z)
								if ct.y > co and self:IsCurrentRoomSpawnCell(ct) then
									cq = true
									local cu = self.validGridPositions
									cu[#cu + 1] = ct
								else
								end
							end
							cs = cs + 1
						end
					end
					cr = cr + 1
				end
			end
			if not cq and cp >= ck then
				break
			end
			cp = cp + 1
		end
	end
	local c9 = self:GetEnemySpawnReference()
	self.validGridPositions = k(self.validGridPositions, function(ac, a0)
		return self:IsEnemySpawnPositionValid(a0, c9)
	end)
end
function V.prototype.CreateBreakable(self)
	if #self.validGridPositions == 0 then
		return
	end
	local cv = RandomInt(0, 3)
	local cw = math.floor(#self.validGridPositions / 20)
	local cx = cv + cw
	if cx == 0 then
		return
	end
	local bJ = self.position
	local cy = h({ unpack(self.validGridPositions) }, function(ac, cd, ce)
		local cz = cd:__sub(bJ):Length2D()
		local cA = ce:__sub(bJ):Length2D()
		return cA - cz
	end)
	local cB = l(cy, 0, math.ceil(#cy * 0.7))
	local cC = {}
	do
		local an = 0
		while an < #cB do
			local cD = cB[an + 1]
			if not self:IsTravelingMerchantNear(cD, GRID_SIZE * 1.5) then
				cC[#cC + 1] = cD
			end
			an = an + 1
		end
	end
	local cE = #cC > 0 and cC or cB
	do
		local an = #cE - 1
		while an > 0 do
			local cF = RandomInt(0, an)
			local cG = { cE[cF + 1], cE[an + 1] }
			cE[an + 1] = cG[1]
			cE[cF + 1] = cG[2]
			an = an - 1
		end
	end
	local cH = math.max(1, math.floor(#cE / (cx + 1)))
	do
		local an = 0
		while an < cx do
			local cI = RandomInt(2, 4)
			local cJ = an * cH
			if cJ >= #cE then
				break
			end
			local cK = cE[cJ + 1]
			do
				local cF = 0
				while cF < cI do
					local bP = RandomFloat(0, 360)
					local b2 = RandomFloat(50, 150)
					local bQ = Vector(math.cos(bP * math.pi / 180) * b2, math.sin(bP * math.pi / 180) * b2, 0)
					local cL = cK:__add(bQ)
					CreateUnitByNameAsync(
						DrawPool:Draw(self.terrainThemeKey ~= "ice" and "breakable" or "breakable_ice")
							or "npc_dungeon_crate_1",
						cL,
						true,
						nil,
						nil,
						DOTA_TEAM_BADGUYS,
						function(cM)
							if self.isDispose then
								cM:SafeRemoveUnit()
							else
								cM:SetForwardVector(RandomVector(1))
								cM:SetModelScale(RandomFloat(0.8, 1))
								local cN = self.breakables
								cN[#cN + 1] = cM
								self.occupiedPositions[cJ] = true
							end
						end
					)
					cF = cF + 1
				end
			end
			an = an + 1
		end
	end
end
function V.prototype.CreateSpawnInfo(self, cO, a2)
	if cO == "" or cO == nil then
		return {
			totalCount = 0,
			countPerRound = { 0, 0 },
			isDeploy = false,
			eliteChance = 0,
			spawnInterval = 0,
			captainName = "",
			bossName = "",
			healthFactor = 1,
			damageFactor = 1,
			enemyPool = d(N),
		}
	end
	local cP = KeyValues.spawn_info
	local cQ = KeyValues["spawn_info_" .. a2]
	local cR
	if cQ ~= nil then
		cR = cQ[cO]
	else
		cR = nil
	end
	local cS = cR
	local cT
	if cP ~= nil then
		cT = cP[cO]
	else
		cT = nil
	end
	local cU = cT
	if cS == nil and cU == nil then
		print(
			((("[DungeonRoom] 警告：刷怪配置 '" .. cO) .. "' 在默认和主题'") .. a2) .. "'中均未找到"
		)
		return {
			totalCount = 0,
			countPerRound = { 0, 0 },
			isDeploy = false,
			eliteChance = 0,
			spawnInterval = 0,
			captainName = "",
			bossName = "",
			healthFactor = 1,
			damageFactor = 1,
			enemyPool = d(N),
		}
	end
	local function cV(ac, cW)
		if cS ~= nil and cS[cW] ~= nil then
			return cS[cW]
		end
		if cU ~= nil and cU[cW] ~= nil then
			return cU[cW]
		end
		return nil
	end
	local cX = j(g(m(tostring(cV(nil, "EnemyCount"))), "|"), function(ac, ak)
		return toFiniteNumber(ak, 0)
	end)
	local cY = j(g(m(tostring(cV(nil, "CountPerRound"))), "|"), function(ac, ak)
		return toFiniteNumber(ak, 0)
	end)
	if cY[2] == nil then
		cY[2] = cY[1]
	end
	local cZ = RollPercentage(toFiniteNumber(cV(nil, "CaptainRoomChance")))
	local c_ = RollPercentage(toFiniteNumber(cV(nil, "EliteRoomChance")))
	local d0 = c_ and toFiniteNumber(cV(nil, "OverrideEliteChance")) or toFiniteNumber(cV(nil, "EliteChance"))
	local d1 = cV(nil, "EnemyList")
	local d2 = d(N)
	if d1 ~= nil then
		for d3, ak in pairs(d1) do
			d2:Set(d3, toFiniteNumber(ak, 0))
		end
	end
	local d4 = RandomInt(cX[1], cX[2])
	local d5 = RollPercentage(toFiniteNumber(cV(nil, "DeployChance")))
	local d6 = toFiniteNumber(cV(nil, "SpawnInterval"))
	local d7
	if cZ then
		d7 = cV(nil, "CaptainName")
	else
		d7 = ""
	end
	return {
		totalCount = d4,
		countPerRound = cY,
		isDeploy = d5,
		eliteChance = d0,
		spawnInterval = d6,
		captainName = d7,
		bossName = cV(nil, "BossName"),
		healthFactor = toFiniteNumber(cV(nil, "HealthFactor"), 1),
		damageFactor = toFiniteNumber(cV(nil, "DamageFactor"), 1),
		enemyPool = d2,
	}
end
function V.prototype.CreateEnemyForTutorial(self, d8, d9, da, db)
	local dc = {}
	local dd = self:GetGridsAroundPosition(da, 300)
	if #dd < d9 then
		dd = self:GetGridsAroundPosition(da, 600)
	end
	if #dd < d9 then
		dd = self:GetGridsAroundPosition(da, 1200)
	end
	if #dd == 0 then
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ 没有可用生成位置")
		return {}
	end
	do
		local an = #dd - 1
		while an > 0 do
			local cF = RandomInt(0, an)
			local de = { dd[cF + 1], dd[an + 1] }
			dd[an + 1] = de[1]
			dd[cF + 1] = de[2]
			an = an - 1
		end
	end
	do
		local an = 0
		while an < d9 and an < #dd do
			do
				local cL = dd[an + 1]
				if not self:IsEnemySpawnPositionValid(cL, self:GetEnemySpawnReference()) then
					goto df
				end
				if d8 ~= nil and KeyValues.units[d8] ~= nil then
					if SimulateUnitManager:IsSimulateUnit(d8) then
						local aJ = SimulateUnitManager:CreateCustomUnit(d8, cL, DOTA_TEAM_BADGUYS)
						aJ:SetForwardVector(RandomVector(1))
						local dg = self.simulateEnemies
						dg[#dg + 1] = aJ
						self:AssignPreviewRewardsToEnemy(aJ)
					else
						local aJ = CreateUnitByName(d8, cL, true, nil, nil, DOTA_TEAM_BADGUYS)
						if not IsValid(aJ) then
							goto df
						end
						if not self:PlaceEnemyAtValidPosition(aJ, cL) then
							aJ:SafeRemoveUnit()
							goto df
						end
						self:ApplyDifficultyModifiers(aJ)
						dc[#dc + 1] = aJ
						if db then
							aJ:AddNewModifier(aJ, nil, "modifier_elite", {})
						end
					end
				else
					print(
						((("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️警告：单位 '") .. d8)
							.. "' 无法创建（可能未在KV中定义）"
					)
				end
			end
			::df::
			an = an + 1
		end
	end
	return dc
end
function V.prototype.CreateWaveEnemy(self)
	local dh =
		math.min(self.spawnInfo.totalCount, RandomInt(self.spawnInfo.countPerRound[1], self.spawnInfo.countPerRound[2]))
	if dh <= 0 then
		print(
			(
				(
					(("[DungeonRoom " .. tostring(self.roomID)) .. "] 本波刷怪数量为0，剩余待刷=")
					.. tostring(self.spawnInfo.totalCount)
				) .. "，存活="
			) .. tostring(self.aliveEnemyCount)
		)
		if self.spawnInfo.totalCount > 0 then
			print(
				("[DungeonRoom " .. tostring(self.roomID))
					.. "] ⚠️ CountPerRound配置异常，清空剩余待刷数量以避免卡关"
			)
			self.spawnInfo.totalCount = 0
		end
		self:TryFinishCombatWhenNoEnemies(self.position)
		return
	end
	self.occupiedPositions = {}
	local bJ = self.position
	local dd
	if self.currentWave == 0 then
		dd = self:GetAvailablePositionIndices(bJ.y - 400, bJ.y)
		if #dd < dh then
			dd = self:GetAvailablePositionIndices()
		end
	else
		dd = self:GetAvailablePositionIndices(bJ.y, bJ.y + 600)
		if #dd < dh then
			dd = self:GetAvailablePositionIndices()
		end
	end
	if #dd == 0 then
		print(
			(
				(
					(("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ 没有可用生成位置，跳过本波 ")
					.. tostring(dh)
				) .. " 只怪，剩余待刷="
			) .. tostring(self.spawnInfo.totalCount)
		)
		local di, dj = self.spawnInfo, "totalCount"
		di[dj] = di[dj] - dh
		self.spawnInfo.totalCount = math.max(0, self.spawnInfo.totalCount)
		self:TryFinishCombatWhenNoEnemies(self.position)
		return
	end
	local dk = math.min(dh, #dd)
	local dl, dm = self.spawnInfo, "totalCount"
	dl[dm] = dl[dm] - dk
	if dk < dh then
		print(
			(
				(
					(("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ 可用生成位置不足，计划=")
					.. tostring(dh)
				) .. "，实际尝试="
			) .. tostring(dk)
		)
	end
	self.currentWave = self.currentWave + 1
	do
		local an = #dd - 1
		while an > 0 do
			local cF = RandomInt(0, an)
			local dn = { dd[cF + 1], dd[an + 1] }
			dd[an + 1] = dn[1]
			dd[cF + 1] = dn[2]
			an = an - 1
		end
	end
	local dp = 0
	do
		local an = 0
		while an < dk and an < #dd do
			do
				local dq = dd[an + 1]
				local cL = self.validGridPositions[dq + 1]
				if not self:IsEnemySpawnPositionValid(cL, self:GetEnemySpawnReference()) then
					local dr, ds = self.spawnInfo, "totalCount"
					dr[ds] = dr[ds] + 1
					goto dt
				end
				local d8 = self.spawnInfo.enemyPool:Random()
				if d8 ~= nil and KeyValues.units[d8] ~= nil then
					local d0 = self.spawnInfo.eliteChance
					local db = RollPercentage(d0)
					self.aliveEnemyCount = self.aliveEnemyCount + 1
					dp = dp + 1
					if SimulateUnitManager:IsSimulateUnit(d8) then
						local aJ = SimulateUnitManager:CreateCustomUnit(d8, cL, DOTA_TEAM_BADGUYS)
						aJ:SetForwardVector(RandomVector(1))
						local du = self.simulateEnemies
						du[#du + 1] = aJ
						self:AssignPreviewRewardsToEnemy(aJ)
					else
						CreateUnitByNameAsync(d8, cL, true, nil, nil, DOTA_TEAM_BADGUYS, function(aJ)
							if not IsValid(aJ) then
								print(
									(
										(("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ 单位创建失败: ")
										.. d8
									) .. "，回退计数器"
								)
								self.aliveEnemyCount = self.aliveEnemyCount - 1
								self.aliveEnemyCount = math.max(0, self.aliveEnemyCount)
								return
							end
							if self.isDispose then
								aJ:SafeRemoveUnit()
							else
								if not self:PlaceEnemyAtValidPosition(aJ, cL) then
									print(
										(
											(
												(
													("[DungeonRoom " .. tostring(self.roomID))
													.. "] 无安全刷怪落点 map="
												) .. self.mapName
											) .. " unit="
										) .. d8
									)
									aJ:SafeRemoveUnit()
									self.aliveEnemyCount = math.max(0, self.aliveEnemyCount - 1)
									self:TryFinishCombatWhenNoEnemies(self.position)
									return
								end
								aJ:SetForwardVector(RandomVector(1))
								local dv = self.enemies
								dv[#dv + 1] = aJ
								self:AssignPreviewRewardsToEnemy(aJ)
								if not self.isActived then
									aJ:AddNewModifier(aJ, nil, "modifier_sleep", {})
								end
								self:ApplyDifficultyModifiers(aJ)
								if db then
									aJ:AddNewModifier(aJ, nil, "modifier_elite", {})
								end
							end
						end)
					end
					self.occupiedPositions[dq] = true
				else
					print(
						((("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️警告：单位 '") .. tostring(d8))
							.. "' 无法创建（可能未在KV中定义）"
					)
				end
			end
			::dt::
			an = an + 1
		end
	end
	if dp <= 0 then
		print(
			(
				(
					(
						("[DungeonRoom " .. tostring(self.roomID))
						.. "] ⚠️ 本波没有成功创建任何怪物，剩余待刷="
					) .. tostring(self.spawnInfo.totalCount)
				) .. "，存活="
			) .. tostring(self.aliveEnemyCount)
		)
		self:TryFinishCombatWhenNoEnemies(self.position)
	end
end
function V.prototype.TryFinishCombatWhenNoEnemies(self, a0)
	if self.isCombatEnd or self.isDispose then
		return
	end
	if self:IsBossRoom() then
		return
	end
	if DungeonManager:IsTutorial() then
		return
	end
	if self.aliveEnemyCount > 0 or self.spawnInfo.totalCount > 0 then
		return
	end
	local dw = GetGroundPosition(a0, nil)
	if not GridNav:IsValidPosition(dw) then
		dw = self:GetNearestValidGridPosition(dw) or self.position
	end
	print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 无剩余有效怪物，执行战斗房兜底清场")
	self:FinishCombat(dw)
end
function V.prototype.FinishCombat(self, a0)
	if self.isCombatEnd or self.isDispose then
		return
	end
	self.dungeonTrap:StopCombat()
	self:CreateTreasure(a0)
	self:CreateInteractiveTravelingMerchant()
	self.isCombatEnd = true
	self:StopUnitManagerGuardTimer()
	Event:Fire("dungeon_room_clear", { room = self, position = a0, trapOnlyClear = self.playerKilledEnemyCount == 0 })
end
function V.prototype.CreateBoss(self)
	if self.bossName == nil or self.bossName == "" then
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] Boss房缺少Boss名称配置")
		return
	end
	local a3 = self.bossName
	if KeyValues.units[a3] == nil then
		print(
			((("[DungeonRoom " .. tostring(self.roomID)) .. "] 警告：Boss单位 '") .. a3) .. "' 未在KV中定义"
		)
		return
	end
	local dx = self:FindInfoTarget("info_boss_spawn")
	local dy = dx and dx:GetAbsOrigin() or self.position
	local dz = self:IsEnemySpawnPositionValid(dy, self:GetEnemySpawnReference()) and dy
		or self:GetNearestValidGridPosition(dy)
	if dz == nil then
		print(
			(
				((("[DungeonRoom " .. tostring(self.roomID)) .. "] Boss无安全刷怪点 map=") .. self.mapName)
				.. " unit="
			) .. a3
		)
		return
	end
	print(
		(
			(
				(
					(((("[DungeonRoom " .. tostring(self.roomID)) .. "] 生成Boss: ") .. a3) .. " at (")
					.. tostring(dz.x)
				) .. ", "
			) .. tostring(dz.y)
		) .. ")"
	)
	self.aliveEnemyCount = self.aliveEnemyCount + 1
	CreateUnitByNameAsync(a3, dz, true, nil, nil, DOTA_TEAM_BADGUYS, function(dA)
		if not IsValid(dA) then
			print(
				((("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ Boss创建失败: ") .. a3)
					.. "，回退计数器"
			)
			self.aliveEnemyCount = self.aliveEnemyCount - 1
			self.aliveEnemyCount = math.max(0, self.aliveEnemyCount)
			return
		end
		if self.isDispose then
			dA:SafeRemoveUnit()
		else
			if not self:PlaceEnemyAtValidPosition(dA, dz) then
				dA:SafeRemoveUnit()
				self.aliveEnemyCount = math.max(0, self.aliveEnemyCount - 1)
				print(
					(
						((("[DungeonRoom " .. tostring(self.roomID)) .. "] Boss无安全落点 map=") .. self.mapName)
						.. " unit="
					) .. a3
				)
				return
			end
			dA:SetForwardVector(vec3_bottom)
			local dB = KeyValues.units[a3]
			local dC = math.max(0.1, toFiniteNumber(dB.IntroDuration, 4))
			local dD = toFiniteNumber(dB.IntroFocusDistance, 520)
			local dE = toFiniteNumber(dB.IntroHeightOffset, 160)
			local dF = GameRules:GetGameTime()
			local dG = dA:GetForwardVector()
			local dH = {
				targetEntIndex = dA:GetEntityIndex(),
				targetX = dz.x,
				targetY = dz.y,
				targetZ = dz.z,
				forwardX = dG.x,
				forwardY = dG.y,
				forwardZ = dG.z,
				duration = dC,
				focusDistance = dD,
				heightOffset = dE,
				restoreDuration = 1,
				startTime = dF,
				endTime = dF + dC,
				sequence = dF,
			}
			CustomNetTables:SetNetData("common", "boss_intro", { state = true })
			CustomNetTables:SetNetData("common", "boss_intro_camera", n({ state = true }, dH))
			CustomGameEventManager:Send_ServerToAllClients("boss_camera_intro", dH)
			Timer:GameTimer(dC, function()
				CustomNetTables:SetNetData("common", "boss_intro", { state = false })
				CustomNetTables:SetNetData("common", "boss_intro_camera", { state = false })
				self.dungeonTrap:AddBossShrink()
			end)
			Game:EachPlayer(function(ac, ar)
				local aU = PlayerResource:GetSelectedHeroEntity(ar)
				if IsValid(aU) then
					aU:AddNewModifier(aU, nil, "modifier_stunned", { duration = dC })
				end
			end)
			DungeonManager:MarkBossSpawned(a3)
			local dI = self.enemies
			dI[#dI + 1] = dA
			self:AssignPreviewRewardsToEnemy(dA)
			dA:AddNewModifier(dA, nil, "modifier_boss_custom", {})
			self:ApplyDifficultyModifiers(dA)
			if self.difficultyCooldownReduction ~= 0 then
				dA:AddProperty(PropertyFunction.COOLDOWN_REDUCTION, self.difficultyCooldownReduction)
			end
			if self.difficultyBossGapAmplify ~= 0 then
				dA:AddProperty(PropertyFunction.BOSS_GAP_AMPLIFY, self.difficultyBossGapAmplify)
			end
			if self.difficultyBossDamageAmplify ~= 0 then
				dA:AddProperty(PropertyFunction.FINAL_DAMAGE, self.difficultyBossDamageAmplify)
			end
			print(
				(
					(
						(
							(
								(
									(
										(("[DungeonRoom " .. tostring(self.roomID)) .. "] Boss已生成: ")
										.. dA:GetUnitName()
									) .. "， health:"
								) .. tostring(dA:GetMaxHealth())
							) .. " attack:"
						) .. tostring(dA:GetAttackDamage())
					) .. "当前计数="
				) .. tostring(self.aliveEnemyCount)
			)
		end
	end)
end
function V.prototype.CreateShopItem(self, dJ)
	local dK = {}
	local dL = self:GetSinglePlayerShopFilterHero()
	if dL ~= nil then
		self:AppendShopExcludedForHero(dK, dL)
	end
	local dM = self:FindInfoTarget("info_shop_heal")
	if IsValid(dM) then
		self:SpawnShopItemAtPosition("item_heal_shop", 1, dM:GetAbsOrigin(), "heal")
		dK[#dK + 1] = "item_heal_shop"
	end
	local dN = self:FindInfoTarget("info_shop_upgrade")
	if IsValid(dN) then
		self:SpawnShopItemAtPosition("item_bless_upgrade", 1, dN:GetAbsOrigin(), "upgrade")
		dK[#dK + 1] = "item_bless_upgrade"
	end
	local dO = self:FindInfoTarget("info_shop_refresh")
	if IsValid(dO) then
		self:ClearShopRefreshInteract()
		local ad = CreateUnitByName("interact_shop_refresh", dO:GetAbsOrigin(), false, nil, nil, DOTA_TEAM_GOODGUYS)
		ad:SetForwardVector(vec3_bottom)
		local aT = Interaction:RegisterInteract(ad, InteractType.Refresh, 200, function(ac, aU, ar)
			local dP = SHOP_REFRESH_BASE_COST + self.shopRefreshCount * SHOP_REFRESH_COST_INCREMENT
			if Player:GetGold(ar) < dP then
				return false
			end
			Player:ModifyGold(ar, -dP)
			local dQ = math.max(0, math.min(100, GetShopRefreshRefund(aU)))
			if dQ > 0 then
				local dR = dP * dQ * 0.01
				Player:ModifyGold(ar, dR, true, true, false)
			end
			self.shopRefreshCount = self.shopRefreshCount + 1
			self:RefreshShopItems()
			EmitSoundOnLocationForPlayer("General.Buy", aU:GetAbsOrigin(), ar)
			Event:Fire("shop_refresh_purchased", { playerID = ar, cost = dP })
			return true
		end, 999999)
		if aT ~= -1 then
			Interaction:UpdateInteract(
				aT,
				{
					costInfo = {
						costType = "gold",
						cost = SHOP_REFRESH_BASE_COST + self.shopRefreshCount * SHOP_REFRESH_COST_INCREMENT,
					},
				}
			)
			local dS = self.registeredInteracts
			dS[#dS + 1] = aT
			self.shopRefreshInteractIndex = aT
		end
		self.shopRefreshUnit = ad
		local dT = self.npcs
		dT[#dT + 1] = ad
	end
	local dU = self:FindInfoTarget("info_shop_item")
	if not IsValid(dU) then
		print(
			("[DungeonRoom " .. tostring(self.roomID))
				.. "] ⚠️ 未找到 info_shop_item，跳过常规商店商品生成"
		)
		return
	end
	local dV = self:GetSymmetricShopPositions(dU:GetAbsOrigin(), SHOP_ITEM_COUNT)
	do
		local dW = 0
		while dW < #dV do
			do
				local ai = 1
				local a8
				do
					local dX = 0
					while dX < 10 do
						ai = self:RollShopRarity()
						a8 = DrawPool:PickShopItemNameByRarity(ai, dK)
						if a8 ~= nil then
							break
						end
						dX = dX + 1
					end
				end
				if a8 == nil then
					a8 = DrawPool:Draw("items", dK)
					ai = 1
				end
				if a8 == nil then
					goto dY
				end
				self:AppendShopGeneratedExcluded(dK, a8)
				self:SpawnShopItemAtPosition(a8, ai, dV[dW + 1], "item_" .. tostring(dW + 1))
			end
			::dY::
			dW = dW + 1
		end
	end
	if not dJ then
		local dZ = Vector(dU:GetAbsOrigin().x, dU:GetAbsOrigin().y - 300, dU:GetAbsOrigin().z)
		Game:EachPlayer(function(ac, ar)
			if Privilege:HasPrivilege("privilege_bless_003", ar) then
				self:CreateFreeShopItem(ar, dZ, dK)
			end
		end)
	end
end
function V.prototype.CreateFreeShopItem(self, ar, a0, dK)
	local d_ = { unpack(dK) }
	local aU = self:GetShopFilterHero(ar)
	if aU ~= nil then
		self:AppendShopExcludedForHero(d_, aU)
	end
	local a8
	local ai = 1
	local e0 = ShuffledList({ 3, 4, 5 })
	do
		local an = 0
		while an < #e0 do
			local e1 = e0[an + 1]
			a8 = DrawPool:PickShopItemNameByRarity(e1, d_)
			if a8 ~= nil then
				ai = e1
				break
			end
			an = an + 1
		end
	end
	if a8 == nil then
		a8 = DrawPool:Draw("items", d_)
		ai = 1
	end
	if a8 ~= nil then
		self:AppendShopGeneratedExcluded(dK, a8)
		self:SpawnShopItemAtPosition(a8, ai, a0, "free_item_" .. tostring(ar), true, ar)
		print(
			(
				(
					(
						(
							((("[DungeonRoom " .. tostring(self.roomID)) .. "] 玩家") .. tostring(ar))
							.. "专属免费商品: "
						) .. a8
					) .. " (稀有度"
				) .. tostring(ai)
			) .. ")"
		)
	end
	return a8
end
function V.prototype.GetShopFilterHero(self, ar)
	if ar ~= nil then
		local aU = PlayerResource:GetSelectedHeroEntity(ar)
		return IsValid(aU) and aU or nil
	end
	local bj
	Game:EachPlayer(function(ac, e2)
		if bj ~= nil then
			return
		end
		local aU = PlayerResource:GetSelectedHeroEntity(e2)
		if IsValid(aU) then
			bj = aU
		end
	end)
	return bj
end
function V.prototype.GetSinglePlayerShopFilterHero(self)
	if Game:GetPlayerCount() ~= 1 then
		return nil
	end
	return self:GetShopFilterHero()
end
function V.prototype.AppendShopExcludedForHero(self, dK, aU)
	local e3 = {}
	local e4 = aU:GetAllItems()
	do
		local an = 0
		while an < #e4 do
			do
				local al = e4[an + 1]
				if not IsValid(al) then
					goto e5
				end
				local a8 = al:GetAbilityName()
				local e6 = KeyValues.items[a8]
				if e6 == nil then
					goto e5
				end
				local e7 = toFiniteNumber(e6.Quantitylimit, 0)
				if e7 > 0 and aU:GetItemCount(a8) >= e7 then
					self:AppendShopExcludedItem(dK, a8)
				end
				local e8 = self:GetArtifactUpgradeGroup(a8)
				local e9 = self:GetArtifactUpgradeRank(a8)
				if e8 ~= "" and e9 > (e3[e8] or 0) then
					e3[e8] = e9
				end
			end
			::e5::
			an = an + 1
		end
	end
	for a8, aC in pairs(KeyValues.items) do
		do
			local ea = tostring
			local eb = aC.UpgradeGroup
			if eb == nil then
				eb = ""
			end
			local e8 = ea(eb)
			if e8 == "" then
				goto ec
			end
			local ed = e3[e8]
			if ed == nil then
				goto ec
			end
			local e9 = toFiniteNumber(aC.UpgradeRank, 0)
			if e9 > 0 and e9 <= ed then
				self:AppendShopExcludedItem(dK, a8)
			end
		end
		::ec::
	end
end
function V.prototype.AppendShopGeneratedExcluded(self, dK, a8)
	self:AppendShopExcludedItem(dK, a8)
	local e8 = self:GetArtifactUpgradeGroup(a8)
	local e9 = self:GetArtifactUpgradeRank(a8)
	if e8 == "" or e9 <= 0 then
		return
	end
	for ee, aC in pairs(KeyValues.items) do
		do
			local ef = tostring
			local eg = aC.UpgradeGroup
			if eg == nil then
				eg = ""
			end
			if ef(eg) ~= e8 then
				goto eh
			end
			local ei = toFiniteNumber(aC.UpgradeRank, 0)
			if ei > 0 and ei <= e9 then
				self:AppendShopExcludedItem(dK, ee)
			end
		end
		::eh::
	end
end
function V.prototype.AppendShopExcludedItem(self, dK, a8)
	if not o(dK, a8) then
		dK[#dK + 1] = a8
	end
end
function V.prototype.GetArtifactUpgradeGroup(self, a8)
	local ej = tostring
	local ek = KeyValues.items[a8]
	if ek ~= nil then
		ek = ek.UpgradeGroup
	end
	local el = ek
	if el == nil then
		el = ""
	end
	return ej(el)
end
function V.prototype.GetArtifactUpgradeRank(self, a8)
	local em = toFiniteNumber
	local en = KeyValues.items[a8]
	if en ~= nil then
		en = en.UpgradeRank
	end
	return em(en, 0)
end
function V.prototype.SpawnShopItemAtPosition(self, a8, ai, a0, eo, ep, eq, er)
	if ep == nil then
		ep = false
	end
	if er == nil then
		er = "Default"
	end
	print(
		(
			(
				(
					((((("[DungeonRoom " .. tostring(self.roomID)) .. "] Shop item slot=") .. eo) .. " item=") .. a8)
					.. " rarity="
				) .. tostring(ai)
			) .. " free="
		) .. tostring(ep)
	)
	local b3 = d(L, a8, ai, a0, ep, eq, er)
	Interaction:RegisterShopItemInteract(b3)
	local es = self.registeredInteracts
	es[#es + 1] = b3:GetEntityIndex()
	local et = self.shopItems
	et[#et + 1] = b3
end
function V.prototype.GetSymmetricShopPositions(self, bJ, d9)
	local dV = {}
	local eu = 256 - (d9 - 2) * 32
	local ev = -((d9 - 1) * eu) * 0.5
	do
		local dW = 0
		while dW < d9 do
			local c5 = ev + dW * eu
			dV[#dV + 1] = Vector(bJ.x + c5, bJ.y, bJ.z)
			dW = dW + 1
		end
	end
	return dV
end
function V.prototype.ClearShopRefreshInteract(self)
	if self.shopRefreshInteractIndex ~= nil then
		Interaction:UnregisterInteractable(self.shopRefreshInteractIndex)
		local ew = {}
		do
			local an = 0
			while an < #self.registeredInteracts do
				local aL = self.registeredInteracts[an + 1]
				if aL ~= self.shopRefreshInteractIndex then
					ew[#ew + 1] = aL
				end
				an = an + 1
			end
		end
		self.registeredInteracts = ew
		self.shopRefreshInteractIndex = nil
	end
	if self.shopRefreshUnit ~= nil then
		ArrayRemove(self.npcs, self.shopRefreshUnit)
		self:RemoveUnit(self.shopRefreshUnit)
		self.shopRefreshUnit = nil
	end
end
function V.prototype.RefreshShopItems(self)
	if self.roomType ~= RoomType.SHOP then
		return
	end
	print(("[DungeonRoom " .. tostring(self.roomID)) .. "] RefreshShopItems")
	Interaction:BeginSyncBatch()
	local ex = {}
	do
		local an = 0
		while an < #self.shopItems do
			do
				local ey = self.shopItems[an + 1]
				if ey == nil then
					goto ez
				end
				local aL = ey:GetEntityIndex()
				if aL == -1 then
					goto ez
				end
				Interaction:UnregisterInteractable(aL)
				ex[aL] = true
				ey:dispose()
			end
			::ez::
			an = an + 1
		end
	end
	self.shopItems = {}
	local ew = {}
	do
		local an = 0
		while an < #self.registeredInteracts do
			local aL = self.registeredInteracts[an + 1]
			if ex[aL] ~= true then
				ew[#ew + 1] = aL
			end
			an = an + 1
		end
	end
	self.registeredInteracts = ew
	self:ClearShopRefreshInteract()
	self:CreateShopItem(true)
	Interaction:EndSyncBatch()
end
function V.prototype.CreateStairItem(self)
	local eA = GetGroundPosition(self.position, nil)
	self.stairChestPlayers = {}
	self.stairChestCompletedPlayers = {}
	self.stairChestAutoClaimingPlayers = {}
	self.stairChestOpeningPlayers = {}
	self.stairChestIgnoredPlayers = {}
	self.stairChestItemPos = eA
	local eB = DungeonManager:IsTutorial()
	Game:EachPlayer(function(ac, ar)
		self.stairChestPlayers[ar] = true
		local aP = d(B, ar, "9900000", eA, { 0, 0 })
		local eC = self.clientItems
		eC[#eC + 1] = aP
		local aT
		aT = Interaction:RegisterInteract(aP.entity, InteractType.BossChest, 200, function(ac, aU)
			if not self:CanOpenStairChest(ar) then
				return false
			end
			if self:IsEquipmentCapacityFull(ar) then
				self:ShowEquipmentCapacityDialog(ar, true)
				return false
			end
			self.stairChestOpeningPlayers[ar] = true
			self:RequestStairChestRewards(ar, 1, false, eA, function(ac, eD, eE)
				self.stairChestOpeningPlayers[ar] = false
				if not eD or self.isDispose or self.stairChestIgnoredPlayers[ar] == true then
					if DungeonManager:IsTutorial() then
						self:CompleteManualStairChestOpen(ar, aT, aP, eA, false, false)
						self:OpenGates()
						return
					end
					self:TryOpenStairGatesByChestState()
					return
				end
				self:CompleteManualStairChestOpen(ar, aT, aP, eA, false, false, eE)
			end, true)
			return false
		end, nil, ar)
		if not eB then
			Interaction:SetSecondaryInteraction(aT, function(ac, aU)
				if not self:CanOpenStairChest(ar) then
					return false
				end
				if self:IsEquipmentCapacityFull(ar) then
					self:ShowEquipmentCapacityDialog(ar, true)
					return false
				end
				local eF = Privilege:HasPrivilege("privilege_bless_001", ar)
				local eG = eF and Privilege:GetPrivilegeSpecialValue("privilege_bless_001", 1, "free_count", aU) or 0
				local eH = CommonService:GetPlayerServiceNetTable(ar, "player_counters") or {}
				local eI = eH.daily_free_boss_rewards
				local eJ = eI and eI.count or 0
				local eK = eJ < eG
				print(
					(
						(
							(
								(
									(
										((("[DungeonRoom " .. tostring(self.roomID)) .. "] Player ") .. tostring(ar))
										.. " Open Boss Chest Rewards isUseFreeCount="
									) .. tostring(eK)
								) .. " usedFreeCount="
							) .. tostring(eJ)
						) .. " freeCount="
					) .. tostring(eG)
				)
				if not eK then
					local eL = CommonService:GetPlayerServiceNetTable(ar, "player_tokens") or {}
					local eM = eL["110006"]
					if (eM and eM.amounts or 0) < 1 then
						ErrorMessage("error_token_no_enough", ar)
						return false
					end
				end
				self.stairChestOpeningPlayers[ar] = true
				self:RequestStairChestRewards(ar, 2, eK, eA, function(ac, eD, eE)
					self.stairChestOpeningPlayers[ar] = false
					if not eD or self.isDispose or self.stairChestIgnoredPlayers[ar] == true then
						self:TryOpenStairGatesByChestState()
						return
					end
					self:CompleteManualStairChestOpen(ar, aT, aP, eA, true, eK, eE)
				end, true)
				return false
			end)
			local aU = PlayerResource:GetSelectedHeroEntity(ar)
			local eF = Privilege:HasPrivilege("privilege_bless_001", ar)
			local eG = eF and Privilege:GetPrivilegeSpecialValue("privilege_bless_001", 1, "free_count", aU) or 0
			local eH = CommonService:GetPlayerServiceNetTable(ar, "player_counters") or {}
			local eN = eH.daily_free_boss_rewards
			local eJ = eN and eN.count or 0
			Interaction:UpdateSecondaryInteract(
				aT,
				{ tooltip = "DoubleBossChest", costInfo = {
					cost = 1,
					costType = "110006",
					costSource = "tokens",
					freeCount = eG - eJ,
				} }
			)
		end
		if aT ~= -1 then
			local eO = self.registeredInteracts
			eO[#eO + 1] = aT
		end
	end)
	local ad = CreateUnitByName(
		"interact_regen_well",
		self.position + Vector(500, 700, 0),
		false,
		nil,
		nil,
		DOTA_TEAM_GOODGUYS
	)
	local aT = Interaction:RegisterInteract(ad, InteractType.RegenWell, 200, function(ac, aU, ar)
		local eP = ad:FindModifierByName("modifier_spawn_interact_regen_well")
		if eP ~= nil then
			eP:Activity()
		end
	end, 1)
	if aT ~= -1 then
		local eQ = self.registeredInteracts
		eQ[#eQ + 1] = aT
	end
	local eR = self.npcs
	eR[#eR + 1] = ad
	if DungeonManager:IsFinalZone(self.zoneID) then
		DungeonAdventure:OpenAdventure(self.zoneID, self.roomType, self.position)
		self:CreateHuntSaveNPC()
	end
end
function V.prototype.CreateHuntSaveNPC(self)
	local eS = tonumber
	local eT = KeyValues.hunt_intelligence["1"]
	if eT ~= nil then
		eT = eT.dungeon_diff
	end
	local eU = eS(eT)
	if eU == nil or GameRules:GetCustomGameDifficulty() < eU then
		return
	end
	local eV =
		CreateUnitByName("npc_hunt_save", self.position + Vector(500, -500, 0), false, nil, nil, DOTA_TEAM_GOODGUYS)
	eV:SetForwardVector(vec3_bottom)
	eV:AddNewModifier(nil, nil, "modifier_no_health_bar", {})
	local eW = Interaction:RegisterInteract(eV, InteractType.NPC, 200, function(ac, eX, ar)
		local eY = PlayerResource:GetPlayer(ar)
		local eZ = PlayerResource:GetSelectedHeroEntity(ar)
		if eY == nil or not IsValid(eZ) then
			return false
		end
		HuntSaveArchive:CreateSnapshot(ar, eZ)
		CustomGameEventManager:Send_ServerToPlayer(
			eY,
			"client_side_event",
			{
				event_name = "show_popup",
				event_data = json.encode({ popupName = "HuntSaveArchive", PopupID = "hunt_save_archive_"
					.. tostring(ar) }),
			}
		)
		return false
	end, 9999)
	if eW ~= -1 then
		Interaction:UpdateInteract(eW, { tooltip = "hunt_save" })
		local e_ = self.registeredInteracts
		e_[#e_ + 1] = eW
	end
	local f0 = self.npcs
	f0[#f0 + 1] = eV
end
function V.prototype.CompleteManualStairChestOpen(self, ar, aT, aP, eA, bF, eK, eE)
	if eE == nil then
		eE = false
	end
	Interaction:UnregisterInteractable(aT)
	ArrayRemove(self.registeredInteracts, aT)
	self:MarkStairChestCompleted(ar)
	if eE then
		e(aP.particleIDs, function(ac, f1)
			ParticleManager:DestroyParticle(f1, false)
		end)
		aP.particleIDs = {}
		local eY = PlayerResource:GetPlayer(ar)
		if eY ~= nil then
			local f2 = ParticleManager:CreateParticleForPlayer(
				"particles/generic_gameplay/boss_chest_open.vpcf",
				PATTACH_CUSTOMORIGIN,
				nil,
				eY
			)
			ParticleManager:SetParticleControl(f2, 0, aP.entity:GetAbsOrigin())
			local f3 = aP.particleIDs
			f3[#f3 + 1] = f2
		end
		return
	end
	if not DungeonManager:IsTutorial() then
		local bk = DungeonManager:GetRoomIndex() + 1
		Service:ReportClick(ar, "dungeon", "reward_room|open_chest|room_" .. tostring(bk))
	end
	EmitSoundOnLocationForPlayer(bF and "Chess.LongOpen" or "Chess.Open", eA, ar)
	if eK then
		Notification:CombatToPlayer(ar, { message = "Notify_FreeOpenBossRewards" })
	end
	e(aP.particleIDs, function(ac, f1)
		ParticleManager:DestroyParticle(f1, false)
	end)
	aP.particleIDs = {}
	local eY = PlayerResource:GetPlayer(ar)
	if eY == nil then
		return
	end
	local f4 = ParticleManager:CreateParticleForPlayer(
		"particles/generic_gameplay/boss_chest_opening.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		aP.entity,
		eY
	)
	ParticleManager:SetParticleControlEnt(f4, 1, aP.entity, PATTACH_INVALID, nil, aP.entity:GetAbsOrigin(), true)
	local f5 = aP.particleIDs
	f5[#f5 + 1] = f4
	Timer:GameTimer(0.8, function()
		if self.isDispose or aP.isDispose then
			return
		end
		e(aP.particleIDs, function(ac, f1)
			ParticleManager:DestroyParticle(f1, false)
		end)
		aP.particleIDs = {}
		local f6 = ParticleManager:CreateParticleForPlayer(
			"particles/generic_gameplay/treasure_box/treasure_box_open_fx.vpcf",
			PATTACH_CUSTOMORIGIN,
			nil,
			eY
		)
		ParticleManager:SetParticleControl(f6, 0, aP.entity:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(f6)
		local f2 = ParticleManager:CreateParticleForPlayer(
			"particles/generic_gameplay/boss_chest_open.vpcf",
			PATTACH_CUSTOMORIGIN,
			nil,
			eY
		)
		ParticleManager:SetParticleControl(f2, 0, aP.entity:GetAbsOrigin())
		local f7 = aP.particleIDs
		f7[#f7 + 1] = f2
	end)
end
function V.prototype.CanOpenStairChest(self, ar)
	if self.roomType ~= RoomType.STAIR then
		return true
	end
	return self.stairChestCompletedPlayers[ar] ~= true
		and self.stairChestAutoClaimingPlayers[ar] ~= true
		and self.stairChestOpeningPlayers[ar] ~= true
		and self.stairChestIgnoredPlayers[ar] ~= true
end
function V.prototype.MarkStairChestCompleted(self, ar)
	if self.roomType ~= RoomType.STAIR then
		return
	end
	if self.stairChestCompletedPlayers[ar] == true then
		return
	end
	self.stairChestCompletedPlayers[ar] = true
	self.stairChestAutoClaimingPlayers[ar] = false
	self.stairChestOpeningPlayers[ar] = false
	print((("[DungeonRoom " .. tostring(self.roomID)) .. "] 楼梯房宝箱完成 player=") .. tostring(ar))
	self:TryOpenStairGatesByChestState()
end
function V.prototype.StartStairChestStateWatcher(self)
	if
		self.roomType ~= RoomType.STAIR
		or self.stairChestStateTimerID ~= nil
		or self.isDispose
		or self.isComplete
		or self.gatesOpened
	then
		return
	end
	self.stairChestStateTimerID = Timer:GameTimer(1, function()
		self.stairChestStateTimerID = nil
		if self.isDispose or self.isComplete or self.gatesOpened or self.roomType ~= RoomType.STAIR then
			return
		end
		self:RefreshStairChestPlayerStates()
		if not self.gatesOpened then
			self:StartStairChestStateWatcher()
		end
	end)
end
function V.prototype.StopStairChestStateWatcher(self)
	if self.stairChestStateTimerID == nil then
		return
	end
	Timer:StopTimer(self.stairChestStateTimerID)
	self.stairChestStateTimerID = nil
end
function V.prototype.StartUnitManagerGuardTimer(self)
	if
		not self:IsCombatRoom()
		or self.unitManagerGuardTimerID ~= nil
		or self.isDispose
		or self.isComplete
		or self.isCombatEnd
	then
		return
	end
	self.unitManagerGuardTimerID = Timer:GameTimer(5, function()
		if self.isDispose or self.isComplete or self.isCombatEnd or not self:IsCombatRoom() then
			self.unitManagerGuardTimerID = nil
			return
		end
		self:CheckUnitManagerGuard()
		return 5
	end)
end
function V.prototype.StopUnitManagerGuardTimer(self)
	if self.unitManagerGuardTimerID == nil then
		return
	end
	Timer:StopTimer(self.unitManagerGuardTimerID)
	self.unitManagerGuardTimerID = nil
end
function V.prototype.CheckUnitManagerGuard(self)
	if UnitManager == nil or not UnitManager:IsReady() then
		return
	end
	local f8 = self:GetAliveManagedEnemies()
	if #f8 >= 5 then
		return
	end
	local f9 = {}
	for ac, aJ in ipairs(f8) do
		if not UnitManager:IsUnitIndexValid(aJ) then
			UnitManager:RepairUnitIndex(aJ)
			f9[#f9 + 1] = aJ
		end
	end
	if #f9 <= 0 or self.hasReportedUnitManagerGuard then
		return
	end
	self.hasReportedUnitManagerGuard = true
	self:ReportUnitManagerGuard(f9, #f8)
end
function V.prototype.GetAliveManagedEnemies(self)
	local f8 = {}
	do
		local an = 0
		while an < #self.enemies do
			local aJ = self.enemies[an + 1]
			if IsValid(aJ) and aJ:IsAlive() then
				f8[#f8 + 1] = aJ
			end
			an = an + 1
		end
	end
	return f8
end
function V.prototype.ReportUnitManagerGuard(self, f9, fa)
	if CommonService == nil then
		return
	end
	CommonService:CallAction(
		"/v1/log/report",
		0,
		{
			level = "Server",
			message = "[DungeonRoom] UnitManager guard repaired enemy indexes " .. json.encode({
				roomID = self.roomID,
				roomKey = self:GetRoomKey(),
				roomType = RoomType[self.roomType],
				mapName = self.mapName,
				aliveEnemyCount = fa,
				trackedEnemyCount = #self.enemies,
				pendingAliveEnemyCount = self.aliveEnemyCount,
				remainingSpawnCount = self.spawnInfo.totalCount,
				repairedEnemies = j(f9, function(ac, aJ)
					return self:GetUnitManagerGuardUnitReport(aJ)
				end),
			}),
		}
	)
end
function V.prototype.GetUnitManagerGuardUnitReport(self, ad)
	return UnitManager and UnitManager:GetUnitIndexReport(ad) or { valid = false }
end
function V.prototype.GetStairChestPlayerCount(self)
	local d9 = 0
	for fb in pairs(self.stairChestPlayers) do
		d9 = d9 + 1
	end
	return d9
end
function V.prototype.RefreshStairChestPlayerStates(self)
	if self.roomType ~= RoomType.STAIR or self.isDispose or self.isComplete or self.gatesOpened then
		return
	end
	for fc in pairs(self.stairChestPlayers) do
		do
			local ar = tonumber(fc)
			if
				ar == nil
				or self.stairChestCompletedPlayers[ar] == true
				or self.stairChestIgnoredPlayers[ar] == true
			then
				goto fd
			end
			local fe = PlayerResource:GetConnectionState(ar)
			if fe == DOTA_CONNECTION_STATE_CONNECTED then
				goto fd
			end
			if fe == DOTA_CONNECTION_STATE_ABANDONED then
				self.stairChestIgnoredPlayers[ar] = true
				self.stairChestAutoClaimingPlayers[ar] = false
				self.stairChestOpeningPlayers[ar] = false
				print(
					(
						("[DungeonRoom " .. tostring(self.roomID))
						.. "] 楼梯房玩家已放弃，跳过宝箱并不再等待 player="
					) .. tostring(ar)
				)
				goto fd
			end
			self:AutoClaimStairChest(ar)
		end
		::fd::
	end
	self:TryOpenStairGatesByChestState()
end
function V.prototype.AutoClaimStairChest(self, ar)
	if
		self.stairChestCompletedPlayers[ar] == true
		or self.stairChestIgnoredPlayers[ar] == true
		or self.stairChestAutoClaimingPlayers[ar] == true
		or self.stairChestOpeningPlayers[ar] == true
	then
		return
	end
	if self.stairChestItemPos == nil then
		return
	end
	self.stairChestAutoClaimingPlayers[ar] = true
	print(
		(("[DungeonRoom " .. tostring(self.roomID)) .. "] 楼梯房玩家断线，自动普通开箱 player=")
			.. tostring(ar)
	)
	self:RequestStairChestRewards(ar, 1, false, self.stairChestItemPos, function(ac, eD)
		self.stairChestAutoClaimingPlayers[ar] = false
		if not eD then
			self:TryOpenStairGatesByChestState()
			return
		end
		if self.isDispose or self.isComplete or self.stairChestIgnoredPlayers[ar] == true then
			self:TryOpenStairGatesByChestState()
			return
		end
		self:MarkStairChestCompleted(ar)
	end)
end
function V.prototype.TryOpenStairGatesByChestState(self)
	if self.roomType ~= RoomType.STAIR or self.isDispose or self.isComplete or self.gatesOpened then
		return
	end
	local ff = 0
	local fg = 0
	local fh = 0
	local fi = 0
	for fc in pairs(self.stairChestPlayers) do
		do
			local ar = tonumber(fc)
			if ar == nil then
				goto fj
			end
			ff = ff + 1
			if self.stairChestIgnoredPlayers[ar] == true then
				fh = fh + 1
				goto fj
			end
			if self.stairChestCompletedPlayers[ar] == true then
				fg = fg + 1
				goto fj
			end
			fi = fi + 1
		end
		::fj::
	end
	local fk = DungeonAdventure:AreOpenedAdventuresCompleted()
	local fl = ff <= 0 or fi <= 0
	print(
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
													("[DungeonRoom " .. tostring(self.roomID))
													.. "] 楼梯房离开进度 chestCompleted="
												) .. tostring(fl)
											) .. " completed="
										) .. tostring(fg)
									) .. " ignored="
								) .. tostring(fh)
							) .. " waiting="
						) .. tostring(fi)
					) .. " total="
				) .. tostring(ff)
			) .. " adventuresCompleted="
		) .. tostring(fk)
	)
	if fl and fk then
		self:StopStairChestStateWatcher()
		self:OpenGates()
	end
end
function V.prototype.RequestBossChestRewards(self, ar, fm, fn, eA, fo, fp)
	if fp == nil then
		fp = false
	end
	if fp and self:IsEquipmentCapacityFull(ar) then
		self:ShowEquipmentCapacityDialog(ar, true)
		if fo ~= nil then
			fo(nil, false)
		end
		return
	end
	local fq = false
	CommonService:RepeatCallAction(
		"/v1/settle/receive_boss_rewards",
		ar,
		{
			match_id = Match:GetMatchID(),
			round = DungeonManager:GetZoneIndex(),
			room_step = DungeonManager:GetRoomIndex(),
			open_times = fm,
			use_daily_free_open_times = fn,
		},
		function(ac, fr, fs)
			if fq then
				return
			end
			fq = true
			if fs.code == 2 and fs.message == "rewards received" then
				ErrorMessage("error_boss_rewards_already_received")
				if fo ~= nil then
					fo(nil, true, true)
				end
				return
			end
			CommonService:CommonCallback(ar, fs)
			self:HandleBossChestRewardsResponse(fr, fs, eA, fo)
		end,
		false
	)
end
function V.prototype.RequestStairChestRewards(self, ar, fm, fn, eA, fo, fp)
	if fp == nil then
		fp = false
	end
	if DungeonManager:IsTutorial() then
		if fp and self:IsEquipmentCapacityFull(ar) then
			self:ShowEquipmentCapacityDialog(ar, true)
			if fo ~= nil then
				fo(nil, false)
			end
			return
		end
		CommonService:RepeatCallAction("/v1/player/receive_teach_rewards", ar, {}, function(ac, fr, fs)
			if fs.code == 0 or fs.code == 200 then
				CommonService:CommonCallback(ar, fs, false)
			else
				ErrorMessage("Tutorial's reward has been received", ar)
				if fo ~= nil then
					fo(nil, false)
				end
				return
			end
			self:HandleBossChestRewardsResponse(fr, fs, eA, fo)
		end, false)
		return
	end
	self:RequestBossChestRewards(ar, fm, fn, eA, fo, fp)
end
function V.prototype.HandleBossChestRewardsResponse(self, ar, fs, eA, fo)
	if fs.code ~= 0 and fs.code ~= 200 then
		if fo ~= nil then
			fo(nil, false)
		end
		return
	end
	local ft
	if fs ~= nil then
		ft = fs.data
	end
	local fu
	if ft ~= nil then
		fu = ft.add_items
	end
	local fv = fu
	local fw
	if fv ~= nil then
		fw = fv.other
	end
	local fx = fw
	local fy
	if fs ~= nil then
		fy = fs.data
	end
	local fz
	if fy ~= nil then
		fz = fy.player_equipments
	end
	local fA = fz
	local fB
	if fs ~= nil then
		fB = fs.data
	end
	local fC
	if fB ~= nil then
		fC = fB.player_drawings
	end
	local fD = fC
	local fE
	if fs ~= nil then
		fE = fs.data
	end
	local fF
	if fE ~= nil then
		fF = fE.player_keys
	end
	local fG = fF
	local fH
	if fs ~= nil then
		fH = fs.data
	end
	local fI
	if fH ~= nil then
		fI = fH.player_notices
	end
	local fJ = fI
	if fJ == nil then
		fJ = {}
	end
	local fK = fJ
	local fL = fK[1]
	local fM = (fL and fL.key) == "BossRewards3TimesDrop"
	if fM then
		Notification:CombatToPlayer(ar, { message = "Notify_BossRewards3TimesDrop" })
	end
	if not fx and not fA and not fD and not fG then
		if fo ~= nil then
			fo(nil, true)
		end
		self:ScheduleEquipmentCapacityDialog(ar)
		return
	end
	if fo ~= nil then
		fo(nil, true)
	end
	self:ScheduleEquipmentCapacityDialog(ar)
	Timer:GameTimer(0.8, function()
		if self.isDispose then
			return
		end
		EmitSoundOnLocationForPlayer("Chess.Finish", eA, ar)
		local fN = {}
		if fx then
			for ac, av in ipairs(fx) do
				do
					local fO = tonumber(GetItemPropType(av.item_id))
					if fO == 9 or fO == 19 or fO == 20 then
						goto fP
					end
					fN[#fN + 1] =
						{ item_id = av.item_id, amounts = av.amounts, item_rarity = GetPropRarity(av.item_id) }
				end
				::fP::
			end
		end
		if fA then
			for ac, fQ in ipairs(fA) do
				fN[#fN + 1] = { item_id = fQ.equipment_item_id, amounts = 1, item_rarity = fQ.rarity, uid = fQ.id }
			end
		end
		if fD then
			for ac, fR in ipairs(fD) do
				fN[#fN + 1] = { item_id = fR.drawing_item_id, amounts = 1, item_rarity = fR.rarity, uid = fR.id }
			end
		end
		if fG then
			for ac, fS in ipairs(fG) do
				fN[#fN + 1] = { item_id = fS.key_item_id, amounts = 1, item_rarity = fS.rarity, uid = fS.id }
			end
		end
		local fT = {}
		local fU = {}
		for ac, av in ipairs(fN) do
			local fV
			if av.uid == nil then
				fV = fU[av.item_id]
			else
				fV = nil
			end
			local fW = fV
			if fW ~= nil then
				fW.amounts = fW.amounts + av.amounts
			else
				fT[#fT + 1] = av
				if av.uid == nil then
					fU[av.item_id] = av
				end
			end
		end
		if #fT > 0 then
			Match:AddPlayerRoundRewards(ar, fT)
		end
		local fX = Service:GetPlayerSetting(ar, "setting_switch_chest_high_quality_only", true)
		local fY = fX and k(fT, function(ac, av)
			return tonumber(GetItemPropType(av.item_id)) ~= 1
		end) or fT
		if fX and #fY > S then
			local function fZ(ac, av)
				return tonumber(GetItemPropType(av.item_id)) == 9 and av.item_rarity > T
			end
			local f_ = k(fY, fZ)
			local fx = h(
				k(fY, function(ac, av)
					return not fZ(nil, av)
				end),
				function(ac, cd, ce)
					return ce.item_rarity - cd.item_rarity
				end
			)
			local g0 = math.max(0, S - #f_)
			local g1 = p(unpack(f_))
			q(g1, unpack(l(fx, 0, g0)))
			fY = { r(g1) }
		end
		local g2 = k(fT, function(ac, av)
			return not o(fY, av)
		end)
		if #g2 > 0 then
			local g3, g4 = self.pendingChestRewardNotices, ar
			if g3[g4] == nil then
				g3[g4] = {}
			end
			s(self.pendingChestRewardNotices[ar], g2)
			if #fY == 0 then
				self:NotifyBossChestRewards(ar, {})
			end
		end
		for an, av in ipairs(fY) do
			Timer:GameTimer(0.1 * an, function()
				if self.isDispose then
					return
				end
				local g5 = d(B, ar, av.item_id, eA, { 200, 300 })
				local g6 = self.clientItems
				g6[#g6 + 1] = g5
				local aT = Interaction:RegisterInteract(g5.entity, InteractType.Consumables, 200, function(ac, aU, bG)
					if g5.isDispose or bG ~= ar then
						return
					end
					self:NotifyBossChestRewards(bG, { av })
					g5:dispose()
					Event:Fire("client_item_pickup", { playerID = ar, item_id = av.item_id })
				end, 1, ar)
				Interaction:UpdateInteract(aT, { position = g5:GetLandedPosition() })
				Interaction:SetSecondaryInteraction(aT, function(ac, aU, ar)
					local aW = aU:GetPlayerOwnerID()
					local g7 = {}
					do
						local an = 0
						while an < #self.clientItems do
							do
								local aP = self.clientItems[an + 1]
								if aP == nil or aP.isDispose or not aP:IsLanded() or not IsValid(aP.entity) then
									goto g8
								end
								if aP.playerID ~= aW then
									goto g8
								end
								local aL = aP:GetEntityIndex()
								if aL == -1 then
									goto g8
								end
								g7[#g7 + 1] = { entityIndex = aL, position = aP:GetLandedPosition() }
							end
							::g8::
							an = an + 1
						end
					end
					local g9 = { playerID = aW, rewards = {} }
					self.chestRewardNoticeBatch = g9
					do
						local ga, gb = pcall(function()
							do
								local an = 0
								while an < #g7 do
									local gc = g7[an + 1]
									self:CreateClientItemPickupParticle(gc.position, aU)
									Interaction:ExecutePrimaryCallback(gc.entityIndex, aU, ar)
									Interaction:UnregisterInteractable(gc.entityIndex)
									ArrayRemove(self.registeredInteracts, gc.entityIndex)
									an = an + 1
								end
							end
						end)
						do
							self.chestRewardNoticeBatch = nil
							self:SendBossChestRewardSummary(aW, g9.rewards)
						end
						if not ga then
							error(gb, 0)
						end
					end
					self.clientItems = k(self.clientItems, function(ac, ak)
						return not ak.isDispose
					end)
				end)
				Interaction:UpdateSecondaryInteract(aT, { tooltip = "DoubleConsumables" })
				if aT ~= -1 then
					local gd = self.registeredInteracts
					gd[#gd + 1] = aT
				end
			end)
		end
	end)
end
function V.prototype.NotifyBossChestRewards(self, ar, au)
	local ge = self.pendingChestRewardNotices[ar] or {}
	f(self.pendingChestRewardNotices, ar)
	local gf = p(unpack(ge))
	q(gf, unpack(au))
	local fK = { r(gf) }
	local gg = self.chestRewardNoticeBatch
	if (gg and gg.playerID) == ar then
		s(self.chestRewardNoticeBatch.rewards, fK)
	else
		self:SendBossChestRewardSummary(ar, fK)
	end
end
function V.prototype.SendBossChestRewardSummary(self, ar, au)
	local gh = {}
	local gi = {}
	for ac, av in ipairs(au) do
		local fS = (tostring(av.item_id) .. ":") .. tostring(av.item_rarity)
		local gj = gi[fS]
		if gj ~= nil then
			gj.amounts = gj.amounts + av.amounts
			gj.uid = nil
		else
			local gk = n({}, av)
			gi[fS] = gk
			gh[#gh + 1] = gk
		end
	end
	if #gh > 0 then
		CommonService:SendReceiveRewards(ar, gh)
	end
end
function V.prototype.GetEquipmentCount(self, ar)
	return Equipment:GetCapacityCount(ar, "equipment")
end
function V.prototype.IsEquipmentCapacityFull(self, ar)
	return Equipment:IsCapacityFull(ar, "equipment")
end
function V.prototype.ScheduleEquipmentCapacityDialog(self, ar)
	Timer:GameTimer(0.8, function()
		local d9 = self:GetEquipmentCount(ar)
		if d9 >= R then
			self:ShowEquipmentCapacityDialog(ar, d9 >= Equipment:GetCapacityLimit("equipment"))
		end
	end)
end
function V.prototype.ShowEquipmentCapacityDialog(self, ar, gl)
	Equipment:ShowCapacityDialog(ar, "equipment", gl)
end
function V.prototype.CreateSpecialRoom(self)
	if self.roomType == RoomType.SPECIAL then
		local bj = self.specialKind
		if bj == nil or bj == "" then
			local gm = "special_room_zone" .. tostring(self.zoneID)
			bj = DrawPool:Draw(gm)
			print(
				(((("[DungeonRoom " .. tostring(self.roomID)) .. "] SpecialRoom fallback draw from ") .. gm) .. ": ")
					.. (bj or "-")
			)
		end
		print((("[DungeonRoom " .. tostring(self.roomID)) .. "] SpecialRoom resolved: ") .. (bj or "-"))
		if bj ~= nil and type(self["Create" .. bj]) == "function" then
			self["Create" .. bj](self)
		end
	end
end
function V.prototype.CreateWishingPool(self)
	local ad = CreateUnitByName("interact_wishing_pool", self.position, false, nil, nil, DOTA_TEAM_GOODGUYS)
	local aT
	aT = Interaction:RegisterInteract(ad, InteractType.Pool, 380, function(ac, aU, ar)
		local gn = self.wishingPoolCount * WISHING_POOL_COST
		local eG = Privilege:GetPlayerDynamicValue("privilege_bless_012", ar, "free_count") or 0
		local dP = eG > 0 and 0 or gn
		if eG > 0 then
			Privilege:SetPlayerDynamicValue("privilege_bless_012", ar, "free_count", eG - 1)
		end
		if dP > 0 then
			if Player:GetGold(ar) < dP then
				EmitAnnouncerSoundForPlayer("General.Cancel", ar)
				return false
			end
			Player:ModifyGold(ar, -dP, true, true)
		end
		self.wishingPoolCount = self.wishingPoolCount + 1
		Interaction:UpdateInteract(
			aT,
			{ costInfo = { cost = self.wishingPoolCount * WISHING_POOL_COST, costType = "gold" } }
		)
		local av = DrawPool:Draw("wish_pool_zone" .. tostring(self.zoneID))
		if av ~= nil then
			local go = CalcDirection2D(aU, self.position)
			local gp = self.position + go * RandomInt(400, 500)
			gp.z = aU:GetAbsOrigin().z
			local b3 = d(J, av, gp)
			local gq = self.dropItems
			gq[#gq + 1] = b3
			local gr = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 200, function(ac, aU, ar)
				if not b3:IsLanded() then
					return false
				end
				if aU ~= nil then
					aU:AddItemByName(av, nil, false)
				end
				b3:dispose()
			end, nil, nil, av)
			if gr ~= -1 then
				local gs = self.registeredInteracts
				gs[#gs + 1] = gr
			end
		end
		Event:Fire("wishing_pool_reward", { playerID = ar, cost = dP })
	end, 99999999)
	if aT ~= -1 then
		Interaction:UpdateInteract(
			aT,
			{ costInfo = { cost = self.wishingPoolCount * WISHING_POOL_COST, costType = "gold" } }
		)
		local gt = self.registeredInteracts
		gt[#gt + 1] = aT
	end
	local gu = self.npcs
	gu[#gu + 1] = ad
end
function V.prototype.CreateRegenWell(self)
	local ad = CreateUnitByName("interact_regen_well", self.position, false, nil, nil, DOTA_TEAM_GOODGUYS)
	local aT = Interaction:RegisterInteract(ad, InteractType.RegenWell, 200, function(ac, aU, ar)
		local gv = ad:FindModifierByName("modifier_spawn_interact_regen_well")
		if gv ~= nil then
			gv:Activity()
		end
	end, 1)
	if aT ~= -1 then
		local gw = self.registeredInteracts
		gw[#gw + 1] = aT
	end
	local gx = self.npcs
	gx[#gx + 1] = ad
end
function V.prototype.CreateBook(self)
	local ad = CreateUnitByName("interact_book", self.position, false, nil, nil, DOTA_TEAM_GOODGUYS)
	local aT = Interaction:RegisterInteract(ad, InteractType.Book, 200, function(ac, aU, ar)
		Game:EachPlayer(function(ac, ar)
			BlessUpgrade:RequestEnqueueBlessUpgrade(ar, 3)
		end)
		ad:EmitSoundParams("ui.badge_levelup", 0, 0.5, 0)
	end, 1)
	if aT ~= -1 then
		local gy = self.registeredInteracts
		gy[#gy + 1] = aT
	end
	local gz = self.npcs
	gz[#gz + 1] = ad
end
function V.prototype.CreateSmithy(self)
	local ad = CreateUnitByName("interact_smithy", self.position, false, nil, nil, DOTA_TEAM_GOODGUYS)
	ad:SetForwardVector(vec3_bottom)
	local aT = Interaction:RegisterInteract(ad, InteractType.Smithy, 200, function(ac, eX, fb)
		Game:EachPlayer(function(ac, ar)
			local bj = ArtifactUpgrade:RequestEnqueueArtifactUpgrade(ar, 3)
			if not bj then
				ErrorMessage("#error_no_artifact_upgrade", ar)
				Artifact:RequestEnqueueArtifactSelection(ar, 3, { [2] = 7, [3] = 3 })
			end
		end)
		ad:EmitSoundParams("ui.badge_levelup", 0, 0.5, 0)
	end, 1)
	if aT ~= -1 then
		local gA = self.registeredInteracts
		gA[#gA + 1] = aT
	end
	local gB = self.npcs
	gB[#gB + 1] = ad
end
function V.prototype.HasTravelingMerchant(self)
	return self.specialKind == Q
end
function V.prototype.IsTravelingMerchantNear(self, a0, gC)
	if self.travelingMerchantPosition == nil then
		return false
	end
	return CalcDistance(a0, self.travelingMerchantPosition) <= gC
end
function V.prototype.GetTravelingMerchantTrapPositions(self)
	local gD = {}
	local gE = Entities:FindAllByClassname("prop_dynamic")
	do
		local an = 0
		while an < #gE do
			local gF = gE[an + 1]
			if gF:GetSpawnGroupHandle() == self.spawnGroup and t(gF:GetName(), "trap_fire_model") then
				gD[#gD + 1] = gF:GetAbsOrigin()
			end
			an = an + 1
		end
	end
	return gD
end
function V.prototype.GetTravelingMerchantExitInfos(self)
	local gG = {}
	do
		local an = 0
		while an < #self.exitInfos do
			do
				local am = self.exitInfos[an + 1]
				if am == nil then
					goto gH
				end
				gG[#gG + 1] = { position = am.position, direction = am.direction }
			end
			::gH::
			an = an + 1
		end
	end
	return gG
end
function V.prototype.IsTravelingMerchantBlockedByExit(self, a0)
	local gG = self:GetTravelingMerchantExitInfos()
	local gI = GRID_SIZE * 2
	local gJ = GRID_SIZE * 0.75
	do
		local an = 0
		while an < #gG do
			local am = gG[an + 1]
			local gK = a0:__sub(am.position)
			local gL = gK.x * am.direction.x + gK.y * am.direction.y
			local gM = -gL
			local gN = math.abs(gK.x * -am.direction.y + gK.y * am.direction.x)
			if gM >= 0 and gM <= gI and gN <= gJ then
				return true
			end
			an = an + 1
		end
	end
	return false
end
function V.prototype.ResolveTravelingMerchantForward(self, a0)
	local c1 = a0.x - self.position.x
	local c2 = a0.y - self.position.y
	if math.abs(c1) > math.abs(c2) then
		return c1 > 0 and vec3_left or vec3_right
	end
	return vec3_bottom
end
function V.prototype.IsTravelingMerchantGridPositionValid(self, a0)
	do
		local an = 0
		while an < #self.validGridPositions do
			local gO = self.validGridPositions[an + 1]
			if gO ~= nil and CalcDistance(gO, a0) <= GRID_SIZE * 0.25 then
				return true
			end
			an = an + 1
		end
	end
	return false
end
function V.prototype.CanPlaceTravelingMerchantAt(self, a0, gP)
	if not self:IsTravelingMerchantGridPositionValid(a0) then
		return false
	end
	local gQ = a0:__add(gP:__mul(GRID_SIZE))
	local gR = Vector(-gP.y, gP.x, 0)
	local gS = a0:__add(gR:__mul(GRID_SIZE))
	local gT = a0:__sub(gR:__mul(GRID_SIZE))
	return self:IsTravelingMerchantGridPositionValid(gQ)
		and self:IsTravelingMerchantGridPositionValid(gS)
		and self:IsTravelingMerchantGridPositionValid(gT)
end
function V.prototype.GetTravelingMerchantDirectionCandidates(self, a0)
	local gU = self:ResolveTravelingMerchantForward(a0)
	local gV = { gU }
	local gW = { vec3_bottom, vec3_left, vec3_right }
	do
		local an = 0
		while an < #gW do
			local go = gW[an + 1]
			if go ~= gU then
				gV[#gV + 1] = go
			end
			an = an + 1
		end
	end
	return gV
end
function V.prototype.ResolveTravelingMerchantAngles(self, go)
	if go == vec3_left then
		return "0 180 0"
	end
	if go == vec3_right then
		return "0 0 0"
	end
	return "0 -90 0"
end
function V.prototype.ResolveTravelingMerchantAdjustedPosition(self, a0, gP)
	local gX = a0
	local gY = gP:__mul(-1)
	local gZ = GRID_SIZE * 0.1
	local g_ = GRID_SIZE * 0.5
	local h0 = 10
	do
		local h1 = 0
		while h1 <= h0 do
			local h2 = g_ + gZ * h1
			local cD = a0:__add(gY:__mul(h2))
			if not self:IsPositionInside(cD) or not GridNav:IsValidPosition(cD) then
				break
			end
			gX = cD
			h1 = h1 + 1
		end
	end
	return gX
end
function V.prototype.ResolveTravelingMerchantSpawnData(self)
	self.travelingMerchantPosition = nil
	self.travelingMerchantForward = vec3_bottom
	self.travelingMerchantAngles = "0 -90 0"
	if not self:HasTravelingMerchant() then
		return
	end
	if #self.validGridPositions <= 0 then
		return
	end
	local h3 = math.huge
	local h4 = -math.huge
	local h5 = -math.huge
	do
		local an = 0
		while an < #self.validGridPositions do
			do
				local gO = self.validGridPositions[an + 1]
				if gO == nil then
					goto h6
				end
				h3 = math.min(h3, gO.x)
				h4 = math.max(h4, gO.x)
				h5 = math.max(h5, gO.y)
			end
			::h6::
			an = an + 1
		end
	end
	local gD = self:GetTravelingMerchantTrapPositions()
	local h7 = GRID_SIZE * 1.25
	local h8 = nil
	local h9 = nil
	local ha = math.huge
	local hb = -math.huge
	do
		local an = 0
		while an < #self.validGridPositions do
			do
				local gO = self.validGridPositions[an + 1]
				if gO == nil then
					goto hc
				end
				if self:IsTravelingMerchantBlockedByExit(gO) then
					goto hc
				end
				local hd = false
				do
					local he = 0
					while he < #gD do
						if CalcDistance(gO, gD[he + 1]) <= h7 then
							hd = true
							break
						end
						he = he + 1
					end
				end
				if hd then
					goto hc
				end
				local gV = self:GetTravelingMerchantDirectionCandidates(gO)
				local hf = nil
				do
					local hg = 0
					while hg < #gV do
						local go = gV[hg + 1]
						if self:CanPlaceTravelingMerchantAt(gO, go) then
							hf = go
							break
						end
						hg = hg + 1
					end
				end
				if hf == nil then
					goto hc
				end
				local hh = math.min(math.abs(gO.x - h3), math.abs(h4 - gO.x), math.abs(h5 - gO.y))
				local hi = CalcDistance(gO, self.position)
				if hh < ha or hh == ha and hi > hb then
					h8 = gO
					h9 = hf
					ha = hh
					hb = hi
				end
			end
			::hc::
			an = an + 1
		end
	end
	if h8 == nil or h9 == nil then
		print(
			("[DungeonRoom " .. tostring(self.roomID))
				.. "] TravelingMerchant 未找到满足前方和两侧相邻网格条件的站位，跳过创建"
		)
		return
	end
	local gX = self:ResolveTravelingMerchantAdjustedPosition(h8, h9)
	self.travelingMerchantPosition = GetGroundPosition(gX, nil)
	self.travelingMerchantForward = h9
	self.travelingMerchantAngles = self:ResolveTravelingMerchantAngles(self.travelingMerchantForward)
	print(
		(
			(
				(
					(
						(
							(
								(("[DungeonRoom " .. tostring(self.roomID)) .. "] TravelingMerchant spawn=(")
								.. tostring(self.travelingMerchantPosition.x)
							) .. ", "
						) .. tostring(self.travelingMerchantPosition.y)
					) .. ", "
				) .. tostring(self.travelingMerchantPosition.z)
			) .. ") angles="
		) .. self.travelingMerchantAngles
	)
end
function V.prototype.CreateTravelingMerchantPlaceholder(self)
	if
		not self:HasTravelingMerchant()
		or self.travelingMerchantPosition == nil
		or IsValid(self.travelingMerchantPlaceholder)
	then
		return
	end
	self.travelingMerchantPlaceholder = SpawnEntityFromTableSynchronous(
		"dota_prop_customtexture",
		{
			angles = self.travelingMerchantAngles,
			model = "models/props_structures/secretshop_dire001.vmdl",
			origin = self.travelingMerchantPosition,
			skin = "default",
			targetname = "traveling_merchant_placeholder",
			StartingAnim = "ACT_DOTA_IDLE",
			StartingAnimationLoopMode = "ANIM_LOOP_MODE_LOOPING",
		}
	)
end
function V.prototype.GetTravelingMerchantArtifactPool(self)
	local hj = {}
	for a8, aC in pairs(KeyValues.artifact) do
		local hk = tostring
		local hl = aC.Access
		if hl == nil then
			hl = ""
		end
		if hk(hl) == "Meepo" then
			hj[#hj + 1] = tostring(a8)
		end
	end
	return hj
end
function V.prototype.GetTravelingMerchantItemRarity(self, a8)
	return self:RollTavernItemRarity(a8)
end
function V.prototype.CreateTravelingMerchantShopItems(self)
	if self.travelingMerchantPosition == nil then
		return
	end
	local a7 = self:GetTravelingMerchantArtifactPool()
	if #a7 <= 0 then
		print(
			("[DungeonRoom " .. tostring(self.roomID))
				.. "] TravelingMerchant 未找到 Access=Meepo 的 artifact 商品"
		)
		return
	end
	local dK = {}
	local dL = self:GetSinglePlayerShopFilterHero()
	if dL ~= nil then
		self:AppendShopExcludedForHero(dK, dL)
	end
	local hm = self.travelingMerchantForward:__mul(128)
	local hn = self.travelingMerchantPosition:__add(hm)
	local gR = Vector(-self.travelingMerchantForward.y, self.travelingMerchantForward.x, 0)
	local ho = { -128, 0, 128 }
	local hp = {}
	local hq = ShuffledList(a7)
	do
		local an = 0
		while an < #hq and #hp < 3 do
			do
				local a8 = hq[an + 1]
				if a8 == nil or a8 == "" or o(dK, a8) then
					goto hr
				end
				hp[#hp + 1] = a8
				self:AppendShopGeneratedExcluded(dK, a8)
			end
			::hr::
			an = an + 1
		end
	end
	do
		local an = 0
		while an < #hp do
			do
				local a8 = hp[an + 1]
				if a8 == nil or a8 == "" then
					goto hs
				end
				local aX = hn:__add(gR:__mul(ho[an + 1] or 0))
				local ai = self:GetTravelingMerchantItemRarity(a8)
				self:SpawnShopItemAtPosition(
					a8,
					ai,
					aX,
					"traveling_merchant_" .. tostring(an + 1),
					false,
					nil,
					"TravelingMerchant"
				)
			end
			::hs::
			an = an + 1
		end
	end
	local dZ = hn:__add(hm)
	Game:EachPlayer(function(ac, ar)
		if Privilege:HasPrivilege("privilege_041", ar) then
			self:CreateFreeTravelingMerchantItem(ar, dZ, a7, dK)
		end
	end)
end
function V.prototype.CreateFreeTravelingMerchantItem(self, ar, a0, a7, dK)
	local d_ = { unpack(dK) }
	local ht = {}
	local aU = self:GetShopFilterHero(ar)
	if aU ~= nil then
		self:AppendShopExcludedForHero(d_, aU)
		self:AppendShopExcludedForHero(ht, aU)
	end
	local a8
	local hq = ShuffledList(a7)
	do
		local an = 0
		while an < #hq do
			local bR = hq[an + 1]
			if bR ~= nil and bR ~= "" and not o(d_, bR) then
				a8 = bR
				break
			end
			an = an + 1
		end
	end
	if a8 == nil then
		do
			local an = 0
			while an < #hq do
				local bR = hq[an + 1]
				if bR ~= nil and bR ~= "" and not o(ht, bR) then
					a8 = bR
					break
				end
				an = an + 1
			end
		end
	end
	if a8 == nil then
		return
	end
	self:AppendShopGeneratedExcluded(dK, a8)
	local ai = self:GetTravelingMerchantItemRarity(a8)
	self:SpawnShopItemAtPosition(a8, ai, a0, "traveling_merchant_free_" .. tostring(ar), true, ar, "TravelingMerchant")
end
function V.prototype.CreateInteractiveTravelingMerchant(self)
	if
		not self:HasTravelingMerchant()
		or self.travelingMerchantPosition == nil
		or IsValid(self.travelingMerchantUnit)
	then
		return
	end
	local ad = CreateUnitByName("interact_meepo", self.travelingMerchantPosition, false, nil, nil, DOTA_TEAM_GOODGUYS)
	ad:SetForwardVector(Rotation2D(self.travelingMerchantForward, 135, true))
	self.travelingMerchantUnit = ad
	local hu = self.npcs
	hu[#hu + 1] = ad
	self:CreateTravelingMerchantShopItems()
end
function V.prototype.RollTavernItemRarity(self, a8)
	local aC = KeyValues.items[a8]
	local hv = aC and aC.RarityRange
	if hv == nil or m(tostring(hv)) == "" then
		local hw = aC and aC.Rarity
		if hw ~= nil and m(tostring(hw)) ~= "" then
			return toFiniteNumber(hw, 1)
		end
		return 1
	end
	local hx = k(
		j(g(tostring(hv), "|"), function(ac, ak)
			return toFiniteNumber(ak, 0)
		end),
		function(ac, ak)
			return ak > 0
		end
	)
	if #hx == 0 then
		return 1
	end
	local hy = { [1] = 50, [2] = 30, [3] = 15, [4] = 4, [5] = 1 }
	local hz = d(N)
	do
		local an = 0
		while an < #hx do
			local ai = hx[an + 1]
			hz:Set(ai, hy[ai] or 1)
			an = an + 1
		end
	end
	return hz:Random() or hx[1]
end
function V.prototype.CreateTavernItems(self)
	local hA = PickList(TAVERN_ITEMS, 4)
	local hB = { 1, 1, 1, 1 }
	local dU = self:FindInfoTarget("info_shop_item")
	if not IsValid(dU) then
		print(
			("[DungeonRoom " .. tostring(self.roomID)) .. "] ⚠️ 未找到 info_shop_item，跳过酒馆商品生成"
		)
		return
	end
	local hC = dU:GetAbsOrigin()
	local dV = self:GetSymmetricShopPositions(hC, #hA)
	print((("[DungeonRoom " .. tostring(self.roomID)) .. "] CreateTavernItems: slots=") .. tostring(#dV))
	do
		local dW = 0
		while dW < #dV do
			do
				local a8 = hA[dW + 1]
				local ai = hB[dW + 1] or 1
				if a8 == nil or a8 == "" then
					goto hD
				end
				print(
					(
						(
							(
								((("[DungeonRoom " .. tostring(self.roomID)) .. "] Tavern item slot=") .. tostring(dW))
								.. " item="
							) .. a8
						) .. " rarity="
					) .. tostring(ai)
				)
				self:SpawnShopItemAtPosition(a8, ai, dV[dW + 1], "tavern_" .. tostring(dW + 1))
			end
			::hD::
			dW = dW + 1
		end
	end
	local hE = k(TAVERN_ITEMS, function(ac, a8)
		return not o(hA, a8)
	end)
	local dZ = Vector(hC.x, hC.y - 300, hC.z)
	Game:EachPlayer(function(ac, ar)
		if not Privilege:HasPrivilege("privilege_042", ar) then
			return
		end
		local hF = PickList(#hE > 0 and hE or TAVERN_ITEMS, 1)
		local a8 = hF[1]
		if a8 == nil or a8 == "" then
			return
		end
		local ai = hB[1] or 1
		self:SpawnShopItemAtPosition(a8, ai, dZ, "tavern_free_" .. tostring(ar), true, ar)
	end)
end
function V.prototype.CreateFaith(self)
	local hG = DrawPool:Draw("faith")
	if hG then
		local ad = CreateUnitByName(hG, self.position, false, nil, nil, DOTA_TEAM_GOODGUYS)
		local aT = Interaction:RegisterInteract(ad, InteractType.ShopItem, 200, function(ac, aU, ar)
			local al = DrawPool:Draw(hG)
			if al ~= nil then
				aU:AddItemByName(al)
			end
		end)
		if aT ~= -1 then
			local hH = self.registeredInteracts
			hH[#hH + 1] = aT
		end
		local hI = self.npcs
		hI[#hI + 1] = ad
	end
end
function V.prototype.CreateOutpost(self)
	local ad = CreateUnitByName("bonus_outpost", self.position, false, nil, nil, DOTA_TEAM_GOODGUYS)
	local hJ = self.npcs
	hJ[#hJ + 1] = ad
end
function V.prototype.ShouldCreateSecretRoom(self)
	if not DungeonManager:HasSecretRoomPrefabs() then
		print(
			("[DungeonRoom " .. tostring(self.roomID)) .. "] 当前地形未配置隐藏房间预制体，跳过创建"
		)
		return false
	end
	local hK = DungeonManager:GetSecretRoomChance()
	local hL = RollPercentage(hK)
	print(
		(
			((("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间判定 chance=") .. tostring(hK))
			.. "% result="
		) .. tostring(hL)
	)
	return hL
end
function V.prototype.TryCreateSecretGate(self, hM, hN, hO)
	if self.secretRoomPrefix ~= nil then
		return
	end
	if not self:ShouldCreateSecretRoom() then
		return
	end
	local hP = d(u, hN)
	hP:add(self.entrancePrefix)
	local hQ = {}
	do
		local an = 0
		while an < #hM do
			local bq = hM[an + 1]
			if bq ~= nil and not hP:has(bq) then
				hQ[#hQ + 1] = bq
			end
			an = an + 1
		end
	end
	if #hQ == 0 then
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 没有未使用的出口可用于隐藏房间")
		return
	end
	local hR = GetRandomElement(hQ)
	if hR == nil then
		return
	end
	local hS = w(hO, function(ac, hT)
		return v(hT:GetName(), hR .. "_")
	end)
	if not IsValid(hS) then
		print((("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间出口实体无效: ") .. hR)
		return
	end
	local hU = hS:GetAbsOrigin()
	local bJ = self.position
	local c1 = hU.x - bJ.x
	local c2 = hU.y - bJ.y
	local go
	if math.abs(c2) > math.abs(c1) then
		go = vec3_top
	else
		go = c1 > 0 and vec3_right or vec3_left
	end
	local c0 = hU:__add(go:__mul(-128))
	self.secretRoomPrefix = hR
	self.secretRoomDoorPosition = hU
	self.secretRoomDoorDirection = go
	CreateUnitByNameAsync("npc_dungeon_secret_gate", c0, true, nil, nil, DOTA_TEAM_BADGUYS, function(bo)
		if not IsValid(bo) then
			print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间门创建失败")
			self.secretRoomPrefix = nil
			self.secretRoomDoorPosition = nil
			self.secretRoomDoorDirection = nil
			return
		end
		if self.isDispose then
			bo:SafeRemoveUnit()
			return
		end
		bo:SetAbsOrigin(c0)
		bo:SetForwardVector(Rotation2D(go, 180, true))
		self.secretRoomGate = bo
		local hV = self.enemies
		hV[#hV + 1] = bo
		print(
			(
				(
					(
						(
							(
								(("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间门已创建: prefix=")
								.. hR
							) .. " pos=("
						) .. tostring(c0.x)
					) .. ", "
				) .. tostring(c0.y)
			) .. ")"
		)
	end)
end
function V.prototype.CreateSecretRoom(self, hW, go)
	local hX = DungeonManager:GetSecretRoomPrefab(go)
	if hX == nil then
		print(
			("[DungeonRoom " .. tostring(self.roomID))
				.. "] 隐藏房间未配置当前方向的预制体，跳过创建"
		)
		return
	end
	local function hY(ac, hZ, h_)
		if hZ % 64 == 0 then
			return hZ
		end
		if h_ > 0 then
			return math.ceil(hZ / 64) * 64
		end
		if h_ < 0 then
			return math.floor(hZ / 64) * 64
		end
		return math.floor(hZ / 64 + 0.5) * 64
	end
	local gp = Vector(hY(nil, hW.x, go.x), hY(nil, hW.y, go.y), hW.z)
	print(
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
															(
																("[DungeonRoom " .. tostring(self.roomID))
																.. "] 创建隐藏房间: prefix="
															) .. tostring(self.secretRoomPrefix)
														) .. " prefab="
													) .. hX
												) .. " door=("
											) .. tostring(hW.x)
										) .. ", "
									) .. tostring(hW.y)
								) .. ") spawn=("
							) .. tostring(gp.x)
						) .. ", "
					) .. tostring(gp.y)
				) .. ", "
			) .. tostring(gp.z)
		) .. ")"
	)
	self.isSecretRoomCreated = true
	self.secretRoomSpawnGroup = DOTA_SpawnMapAtPosition(hX, gp, true, function(aa)
		if self.isDispose then
			UnloadSpawnGroupByHandle(aa)
			return
		end
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间 onReadyToSpawn")
		ManuallyTriggerSpawnGroupCompletion(aa)
	end, function()
		if self.isDispose or self.secretRoomSpawnGroup == nil then
			return
		end
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间 onSpawnComplete")
		local function i0()
			if self.isDispose then
				return
			end
			self:RevealSecretRoomGates()
			self:OnSecretRoomContentReady(gp, go)
		end
		if self.nativeNavigation ~= nil then
			self.nativeNavigation:AddTerrain(
				hX,
				gp,
				self:GetNativeNavigationProtectedAreas(self.secretRoomSpawnGroup),
				i0
			)
		else
			i0(nil)
		end
	end, nil)
end
function V.prototype.OnSecretRoomContentReady(self, gp, go)
	local i1 = Entities:FindAllByClassname("info_target")
	local i2 = {}
	for ac, i3 in ipairs(i1) do
		if i3:GetSpawnGroupHandle() == self.secretRoomSpawnGroup and t(i3:GetName(), "info_waard") then
			i2[#i2 + 1] = i3:GetAbsOrigin()
		end
	end
	if #i2 == 0 then
		print(
			("[DungeonRoom " .. tostring(self.roomID))
				.. "] 隐藏房间内未找到 info_waard 实体，使用推算中心位置"
		)
		i2[#i2 + 1] = gp:__add(go:__mul(960))
	end
	Interaction:BeginSyncBatch()
	do
		local i4 = 0
		while i4 < #i2 do
			local i5 = i2[i4 + 1]
			if RollPercentage(50) then
				local bK = RandomInt(8, 15)
				local bL = 480
				do
					local an = 0
					while an < bK do
						local bP = RandomFloat(0, 360)
						local b2 = RandomFloat(0, bL)
						local bQ = Vector(math.cos(bP * math.pi / 180) * b2, math.sin(bP * math.pi / 180) * b2, 0)
						local bN = i5:__add(bQ)
						local b3 = d(J, "item_coin_stack", bN)
						local i6 = self.dropItems
						i6[#i6 + 1] = b3
						local aT = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 200, function(ac, aU)
							aU:AddItemByName("item_coin_stack")
							b3:dispose()
						end, nil, nil, "item_coin_stack")
						if aT ~= -1 then
							local i7 = self.registeredInteracts
							i7[#i7 + 1] = aT
						end
						an = an + 1
					end
				end
				print(
					(
						(
							(
								(("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间内容就绪，在 ward[")
								.. tostring(i4)
							) .. "] 周围生成 "
						) .. tostring(bK)
					) .. " 个金币堆"
				)
			else
				local b3 = d(J, "item_treasure_secret", i5)
				local i8 = self.dropItems
				i8[#i8 + 1] = b3
				local aT = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 200, function(ac, aU)
					aU:AddItemByName("item_treasure_secret")
					b3:dispose()
				end, nil, nil, "item_treasure_secret")
				if aT ~= -1 then
					local i9 = self.registeredInteracts
					i9[#i9 + 1] = aT
				end
			end
			i4 = i4 + 1
		end
	end
	Interaction:EndSyncBatch()
end
function V.prototype.RevealSecretRoomGates(self)
	if self.secretRoomPrefix == nil then
		return
	end
	local ia = self:FindEntities("prop_dynamic", "prop_wall")
	local bn = self:FindEntities("prop_dynamic", "prop_gate")
	local ib = self:FindEntities("prop_dynamic", "prop_gate_decorate")
	for ac, ic in ipairs(ia) do
		local bq = g(ic:GetName(), "_")[1]
		if bq == self.secretRoomPrefix then
			ic:AddEffects(EF_NODRAW)
		end
	end
	for ac, bo in ipairs(bn) do
		local bq = g(bo:GetName(), "_")[1]
		if bq == self.secretRoomPrefix then
			bo:AddEffects(EF_NODRAW)
		end
	end
	for ac, bo in ipairs(ib) do
		local bq = g(bo:GetName(), "_")[1]
		if bq == self.secretRoomPrefix then
			bo:AddEffects(EF_NODRAW)
		end
	end
	print(
		(("[DungeonRoom " .. tostring(self.roomID)) .. "] 隐藏房间门已揭示: prefix=") .. self.secretRoomPrefix
	)
end
function V.prototype.CreateEntrance(self)
	local hO = self:FindInfoTargets("info_room_start")
	if #hO == 0 then
		self.entrancePos = GetRandomElement(self.validGridPositions) or vec3_zero
		return
	end
	local id = d(u)
	for ac, i3 in ipairs(hO) do
		local bp = i3:GetName()
		local bq = g(bp, "_")[1]
		if bq ~= nil and bq ~= "" then
			id:add(bq)
		end
	end
	local ie = x(id)
	if #ie == 0 then
		self.entrancePos = GetRandomElement(self.validGridPositions) or vec3_zero
		return
	end
	self.entrancePrefix = GetRandomElement(ie) or ""
	local ig = w(hO, function(ac, hT)
		return v(hT:GetName(), self.entrancePrefix .. "_")
	end)
	self.entrancePos = IsValid(ig) and ig:GetAbsOrigin() or (GetRandomElement(self.validGridPositions) or vec3_zero)
end
function V.prototype.CreateExit(self)
	local hO = self:FindInfoTargets("info_room_exit")
	print(
		((("[DungeonRoom " .. tostring(self.roomID)) .. "] CreateExit - 找到 ") .. tostring(#hO))
			.. " 个 info_room_exit"
	)
	if #hO == 0 then
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] CreateExit - 无出口实体，使用默认配置")
		return
	end
	local id = d(u)
	for ac, i3 in ipairs(hO) do
		local bp = i3:GetName()
		local bq = g(bp, "_")[1]
		if bq ~= nil and bq ~= "" then
			id:add(bq)
		end
	end
	local ie = x(id)
	if #ie == 0 then
		print(("[DungeonRoom " .. tostring(self.roomID)) .. "] CreateExit - 无有效前缀")
		return
	end
	local ih = DungeonManager:GetExitCountOverrideByIndex(self.roomID) or 1
	local ii = self.roomID + 1
	local ij = DungeonManager:GetRoomTypeByIndex(ii)
	local ik = DungeonManager:GetRewardTypeByIndex(ii)
	local il = DungeonManager:GetRewardOptionsByIndex(ii)
	local im = DungeonManager:GetSpecialOptionsByIndex(ii)
	if #im > 0 then
		ih = #im
	elseif #il > 1 then
		ih = #il
	end
	ih = math.min(#ie, ih)
	local hN = PickList(ie, ih)
	local io = {}
	local ip = {}
	if #im > 0 then
		local iq = { unpack(im) }
		do
			local an = #iq - 1
			while an > 0 do
				local cF = RandomInt(0, an)
				local ir = { iq[cF + 1], iq[an + 1] }
				iq[an + 1] = ir[1]
				iq[cF + 1] = ir[2]
				an = an - 1
			end
		end
		do
			local an = 0
			while an < ih do
				io[#io + 1] = ik
				ip[#ip + 1] = iq[an + 1] or iq[1] or ""
				an = an + 1
			end
		end
	elseif #il > 0 then
		if ih <= 1 then
			io = { ik }
		else
			do
				local an = 0
				while an < ih do
					io[#io + 1] = il[an + 1] or ik
					an = an + 1
				end
			end
		end
	else
		io = { ik }
	end
	self.exitInfos = {}
	local bJ = self.position
	do
		local an = 0
		while an < #hN do
			do
				local bq = hN[an + 1]
				if bq == nil then
					goto is
				end
				local hS = w(hO, function(ac, hT)
					return v(hT:GetName(), bq .. "_")
				end)
				local hU = IsValid(hS) and hS:GetAbsOrigin() or (GetRandomElement(self.validGridPositions) or vec3_zero)
				local c1 = hU.x - bJ.x
				local c2 = hU.y - bJ.y
				local go
				if math.abs(c2) > math.abs(c1) then
					go = vec3_top
				else
					go = c1 > 0 and vec3_right or vec3_left
				end
				local it = self.exitInfos
				it[#it + 1] = {
					prefix = bq,
					position = hU,
					direction = go,
					roomType = ij,
					rewardType = io[an + 1] or ik,
					specialKind = ip[an + 1],
				}
				print(
					(
						(
							(
								(
									(
										(
											(
												(
													(("[DungeonRoom " .. tostring(self.roomID)) .. "] Exit ")
													.. tostring(an)
												) .. ": prefix="
											) .. bq
										) .. " nextType="
									) .. RoomType[ij]
								) .. " reward="
							) .. RoomRewardType[io[an + 1] or ik]
						) .. " special="
					) .. (ip[an + 1] or "-")
				)
			end
			::is::
			an = an + 1
		end
	end
	self:TryCreateSecretGate(ie, hN, hO)
	self:UpdateGateVisibility()
	print(
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
															(
																(("[DungeonRoom " .. tostring(self.roomID)) .. "-")
																.. RoomType[self.roomType]
															) .. "-"
														) .. RoomRewardType[self.rewardType]
													) .. "] 出口数量："
												) .. tostring(ih)
											) .. "，next:"
										) .. RoomType[ij]
									) .. "-"
								) .. RoomRewardType[ik]
							) .. " 前缀: "
						) .. table.concat(hN, ", ")
					) .. "，奖励："
				) .. table.concat(io, ", ")
			) .. " special="
		) .. table.concat(ip, ", ")
	)
end
function V.prototype.GetExitTooltip(self, am)
	if am.roomType == RoomType.SPECIAL then
		if am.specialKind == "WishingPool" then
			return "WishingPool"
		end
		if am.specialKind == "RegenWell" then
			return "RegenWell"
		end
		if am.specialKind == "Book" then
			return "Book"
		end
		if am.specialKind == "Smithy" then
			return "Smithy"
		end
	end
	if
		am.roomType == RoomType.SHOP
		or am.roomType == RoomType.BOSS
		or am.roomType == RoomType.STARTING
		or am.roomType == RoomType.TAVERN
	then
		return RoomType[am.roomType]
	end
	if am.rewardType ~= RoomRewardType.NONE then
		return RoomRewardType[am.rewardType]
	end
	return RoomType[am.roomType]
end
function V.prototype.UpdateGateVisibility(self)
	local ia = self:FindEntities("prop_dynamic", "prop_wall")
	local bn = self:FindEntities("prop_dynamic", "prop_gate")
	local ib = self:FindEntities("prop_dynamic", "prop_gate_decorate")
	local iu = d(u)
	iu:add(self.entrancePrefix)
	do
		local an = 0
		while an < #self.exitInfos do
			local am = self.exitInfos[an + 1]
			if am ~= nil then
				iu:add(am.prefix)
			end
			an = an + 1
		end
	end
	for ac, ic in ipairs(ia) do
		local bp = ic:GetName()
		local bq = g(bp, "_")[1]
		if iu:has(bq) then
			ic:AddEffects(EF_NODRAW)
		else
			ic:RemoveEffects(EF_NODRAW)
		end
	end
	for ac, bo in ipairs(bn) do
		local bp = bo:GetName()
		local bq = g(bp, "_")[1]
		if iu:has(bq) then
			bo:RemoveEffects(EF_NODRAW)
		else
			UTIL_Remove(bo)
		end
	end
	for ac, bo in ipairs(ib) do
		local bp = bo:GetName()
		local bq = g(bp, "_")[1]
		if iu:has(bq) then
			bo:RemoveEffects(EF_NODRAW)
		else
			UTIL_Remove(bo)
		end
	end
end
function V.prototype.DebugCheckEnemySpawnPositions(self, iv)
	if iv == nil then
		iv = 20
	end
	if not IsInToolsMode() or self.isDispose then
		return nil
	end
	iv = math.max(1, math.min(60, toFiniteNumber(iv, 20)))
	local c9 = self:GetEnemySpawnReference()
	local iw = {
		mapName = self.mapName,
		gridCount = #self.validGridPositions,
		invalidGridCount = 0,
		enemyCount = 0,
		invalidEnemyCount = 0,
		duration = iv,
	}
	local function ix(ac, a0, iy, iz)
		local c8, cn = F:GetCode(self.mapName, a0, self.position)
		local iA = self:IsInsideEnemySpawnGates(a0)
		local iB = GridNav:IsTraversable(a0)
		local iC = GridNav:IsBlocked(a0)
		local iD = c9 ~= nil and GridNav:CanFindPath(c9, a0)
		local cj = c8 == 1 and iA and iB and not iC and iD
		local iE = cj and (iz and Vector(0, 255, 255) or Vector(0, 255, 0)) or Vector(255, 0, 0)
		local iF = GetGroundPosition(a0, nil)
		local gC = iz and 64 or 32
		local iG = {
			Vector(iF.x - gC, iF.y - gC, iF.z + 64),
			Vector(iF.x + gC, iF.y - gC, iF.z + 64),
			Vector(iF.x + gC, iF.y + gC, iF.z + 64),
			Vector(iF.x - gC, iF.y + gC, iF.z + 64),
		}
		do
			local an = 0
			while an < #iG do
				DebugDrawLineColor(iG[an + 1], iG[(an + 1) % #iG + 1], iE, false, iv)
				an = an + 1
			end
		end
		if iz or not cj then
			print(
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
																	(
																		(
																			(
																				(
																					(
																						(
																							(
																								(
																									(
																										"[SpawnCheck] map="
																										.. self.mapName
																									)
																									.. " source="
																								)
																								.. iy
																							)
																							.. " world="
																						)
																						.. VectorToString(a0)
																					) .. " local="
																				)
																				.. tostring(a0.x - self.position.x)
																			) .. ","
																		)
																		.. tostring(a0.y - self.position.y)
																	) .. " code="
																) .. tostring(c8 or "unknown")
															) .. " insideGates="
														) .. tostring(iA)
													) .. " traversable="
												) .. tostring(iB)
											) .. " blocked="
										) .. tostring(iC)
									) .. " reachable="
								) .. tostring(iD)
							) .. " valid="
						) .. tostring(cj)
					) .. " reason="
				) .. (cn or "-")
			)
		end
		return cj
	end
	do
		local an = 0
		while an < #self.validGridPositions do
			if not ix(nil, self.validGridPositions[an + 1], "grid:" .. tostring(an), false) then
				iw.invalidGridCount = iw.invalidGridCount + 1
			end
			an = an + 1
		end
	end
	for ac, aJ in ipairs(self.enemies) do
		do
			if not IsValid(aJ) or not aJ:IsAlive() or aJ == self.secretRoomGate then
				goto iH
			end
			iw.enemyCount = iw.enemyCount + 1
			if not ix(nil, aJ:GetAbsOrigin(), aJ:GetUnitName(), true) then
				iw.invalidEnemyCount = iw.invalidEnemyCount + 1
			end
		end
		::iH::
	end
	do
		local an = 0
		while an < #self.simulateEnemies do
			do
				local aJ = self.simulateEnemies[an + 1]
				if aJ.isDispose or not IsValid(aJ.entity) then
					goto iI
				end
				iw.enemyCount = iw.enemyCount + 1
				if not ix(nil, aJ:GetAbsOrigin(), "simulate:" .. tostring(an), true) then
					iw.invalidEnemyCount = iw.invalidEnemyCount + 1
				end
			end
			::iI::
			an = an + 1
		end
	end
	print(
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
												(("[SpawnCheck] room=" .. tostring(self.roomID)) .. " map=")
												.. self.mapName
											) .. " reference="
										) .. (c9 == nil and "none" or VectorToString(c9))
									) .. " grids="
								) .. tostring(iw.gridCount)
							) .. " invalidGrids="
						) .. tostring(iw.invalidGridCount)
					) .. " enemies="
				) .. tostring(iw.enemyCount)
			) .. " invalidEnemies="
		) .. tostring(iw.invalidEnemyCount)
	)
	return iw
end
function V.prototype.GetAvailablePositionIndices(self, iJ, h5)
	local bj = {}
	local c9 = self:GetEnemySpawnReference()
	do
		local an = 0
		while an < #self.validGridPositions do
			do
				if self.occupiedPositions[an] ~= true then
					local iK = self.validGridPositions[an + 1]
					if not self:IsEnemySpawnPositionValid(iK, c9) then
						goto iL
					end
					if (iJ == nil or iK.y >= iJ) and (h5 == nil or iK.y <= h5) then
						bj[#bj + 1] = an
					end
				end
			end
			::iL::
			an = an + 1
		end
	end
	return bj
end
function V.prototype.GetGridsAroundPosition(self, bJ, gC, iM)
	if iM == nil then
		iM = 0
	end
	local dV = {}
	for ac, iN in ipairs(self:GetAvailablePositionIndices()) do
		do
			local a0 = self.validGridPositions[iN + 1]
			if a0 == nil then
				goto iO
			end
			local b2 = CalcDistance(a0, bJ)
			if iM > 0 then
				if b2 < gC + iM and b2 > gC - iM then
					dV[#dV + 1] = a0
				end
			else
				if b2 < gC then
					dV[#dV + 1] = a0
				end
			end
		end
		::iO::
	end
	return dV
end
function V.prototype.GetNearestValidGridPosition(self, iP)
	if #self.validGridPositions == 0 then
		self:AnalyzeGrid()
	end
	local iQ = nil
	local a_ = math.huge
	local c9 = self:GetEnemySpawnReference()
	do
		local an = 0
		while an < #self.validGridPositions do
			do
				local a0 = self.validGridPositions[an + 1]
				if a0 == nil or not self:IsEnemySpawnPositionValid(a0, c9) then
					goto iR
				end
				local b2 = CalcDistance(a0, iP)
				if b2 < a_ then
					a_ = b2
					iQ = a0
				end
			end
			::iR::
			an = an + 1
		end
	end
	return iQ
end
function V.prototype.IsPositionInside(self, a0)
	if #self.validGridPositions == 0 then
		self:AnalyzeGrid()
	end
	local h3 = math.huge
	local h4 = -math.huge
	local iJ = math.huge
	local h5 = -math.huge
	for ac, ct in ipairs(self.validGridPositions) do
		if ct ~= nil then
			h3 = math.min(h3, ct.x)
			h4 = math.max(h4, ct.x)
			iJ = math.min(iJ, ct.y)
			h5 = math.max(h5, ct.y)
		end
	end
	if h3 == math.huge then
		return false
	end
	local iS = GRID_SIZE * 0.5
	return a0.x >= h3 - iS and a0.x <= h4 + iS and a0.y >= iJ - iS and a0.y <= h5 + iS
end
function V.prototype.GetRandomValidGridPosition(self)
	if #self.validGridPositions == 0 then
		self:AnalyzeGrid()
	end
	if #self.validGridPositions == 0 then
		return nil
	end
	local c9 = self:GetEnemySpawnReference()
	local dV = k(self.validGridPositions, function(ac, a0)
		return self:IsEnemySpawnPositionValid(a0, c9)
	end)
	return #dV > 0 and dV[RandomInt(0, #dV - 1) + 1] or nil
end
function V.prototype.FindEntities(self, iT, iU)
	local iV = Entities:FindAllByClassname(iT)
	local bj = {}
	for ac, i3 in ipairs(iV) do
		if i3:GetSpawnGroupHandle() == self.spawnGroup and t(i3:GetName(), iU) then
			bj[#bj + 1] = i3
		end
	end
	return bj
end
function V.prototype.FindInfoTargets(self, iU)
	local iV = Entities:FindAllByClassname("info_target")
	local bj = {}
	for ac, i3 in ipairs(iV) do
		if i3:GetSpawnGroupHandle() == self.spawnGroup and t(i3:GetName(), iU) then
			bj[#bj + 1] = i3
		end
	end
	return bj
end
function V.prototype.FindInfoTarget(self, iU)
	local iV = Entities:FindAllByClassname("info_target")
	for ac, i3 in ipairs(iV) do
		if i3:GetSpawnGroupHandle() == self.spawnGroup and t(i3:GetName(), iU) then
			return i3
		end
	end
end
function V.prototype.RemoveUnit(self, ad)
	if IsValid(ad) then
		if BehaviorTree ~= nil then
			BehaviorTree:UnregisterUnit(ad)
		end
		if PropertySystem ~= nil then
			PropertySystem:CleanupUnitProperties(ad)
		end
		if StateSystem ~= nil then
			StateSystem:CleanupUnitStates(ad)
		end
		ad:RemoveAllModifiers(0, false, true, false)
		ad:ForceKill(false)
		ad:MakeIllusion()
		ad:AddNoDraw()
		ad:CallAbilityDestroy()
		UTIL_Remove(ad)
	end
end
function V.prototype.CreateClientItemPickupParticle(self, aX, aU)
	local iW =
		ParticleManager:CreateParticleForce("particles/generic_gameplay/drop_item_pick.vpcf", PATTACH_CUSTOMORIGIN, nil)
	ParticleManager:SetParticleControl(iW, 0, aX)
	ParticleManager:SetParticleControlEnt(iW, 1, aU, PATTACH_POINT_FOLLOW, "attach_hitloc", aU:GetAbsOrigin(), true)
	ParticleManager:ReleaseParticleIndex(iW)
end
function V.prototype.DropItemFromEnemy(self, ad, iX)
	local a8
	if self.guaranteedDrops ~= nil then
		for iY, iZ in pairs(self.guaranteedDrops) do
			if iZ > 0 then
				a8 = iY
				self.guaranteedDrops[iY] = iZ - 1
				if self.guaranteedDrops[iY] <= 0 then
					f(self.guaranteedDrops, iY)
				end
				break
			end
		end
	end
	local ar = iX:GetPlayerOwnerID()
	if a8 == nil then
		if self.dropPool == nil then
			return
		end
		local i_ = Privilege:GetPlayerDynamicValue("privilege_bless_009", ar, "FirstDropCount") or 0
		if i_ < 1 and not RollPercentage(self.dropPool.dropChance + GetBreakDropChance(iX)) then
			return
		end
		Privilege:SetPlayerDynamicValue("privilege_bless_009", ar, "FirstDropCount", i_ - 1)
		a8 = self.dropPool.itemPool:Random(nil)
	end
	if a8 == nil then
		return
	end
	local aN = ad:GetAbsOrigin()
	local b3 = d(J, a8, aN)
	local j0 = self.dropItems
	j0[#j0 + 1] = b3
	local aT = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 200, function(ac, aU)
		aU:AddItemByName(a8)
		b3:dispose()
	end, nil, nil, a8)
	if aT ~= -1 then
		local j1 = self.registeredInteracts
		j1[#j1 + 1] = aT
	end
	Event:Fire("break_drop", { itemName = a8, drop_item = b3 })
end
function V.prototype.CalculateDifficultyModifiers(self)
	local j2 = GameRules:GetCustomGameDifficulty()
	local j3 = KeyValues.difficulty[tostring(j2)]
	if j3 == nil then
		print(("[DungeonRoom] 警告：难度配置 " .. tostring(j2)) .. " 未找到")
		self.difficultyHealthAmplify = 0
		self.difficultyDamageAmplify = 0
		return
	end
	local j4 = toFiniteNumber(j3.HealthFactor, 1)
	local j5 = toFiniteNumber(j3.DamageFactor, 1)
	local j6 = DungeonManager:GetZoneIndex()
	if j6 == 1 then
		j4 = j4 * toFiniteNumber(j3.Chapter1HealthFactor, 1)
		j5 = j5 * toFiniteNumber(j3.Chapter1DamageFactor, 1)
	elseif j6 == 2 then
		j4 = j4 * toFiniteNumber(j3.Chapter2HealthFactor, 1)
		j5 = j5 * toFiniteNumber(j3.Chapter2DamageFactor, 1)
	elseif j6 == 3 then
		j4 = j4 * toFiniteNumber(j3.Chapter3HealthFactor, 1)
		j5 = j5 * toFiniteNumber(j3.Chapter3DamageFactor, 1)
	end
	local j7 = Game:GetPlayerCount()
	if j7 == 2 then
		j4 = j4 * toFiniteNumber(j3.Player2HealthFactor, 1)
		j5 = j5 * toFiniteNumber(j3.Player2DamageFactor, 1)
	elseif j7 == 3 then
		j4 = j4 * toFiniteNumber(j3.Player3HealthFactor, 1)
		j5 = j5 * toFiniteNumber(j3.Player3DamageFactor, 1)
	elseif j7 >= 4 then
		j4 = j4 * toFiniteNumber(j3.Player4HealthFactor, 1)
		j5 = j5 * toFiniteNumber(j3.Player4DamageFactor, 1)
	end
	self.difficultyHealthAmplify = (j4 - 1) * 100
	self.difficultyDamageAmplify = (j5 - 1) * 100
	self.difficultyCooldownReduction = DIFFICULTY_COOLDOWN_REDUCTION[j2] or 0
	self.difficultyBossGapAmplify = DIFFICULTY_BOSS_GAP_AMPLIFY[j2] or 0
	self.difficultyBossDamageAmplify = DIFFICULTY_BOSS_DAMAGE_AMPLIFY[j2] or 0
	print(
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
															(
																(
																	(
																		(
																			(
																				(
																					"[DungeonRoom "
																					.. tostring(self.roomID)
																				)
																				.. "] 难度系数已计算 - 难度:"
																			) .. tostring(j2)
																		) .. " 玩家:"
																	) .. tostring(j7)
																) .. " 血量:"
															) .. y(j4, 2)
														) .. "x("
													) .. y(self.difficultyHealthAmplify, 1)
												) .. "%) 伤害:"
											) .. y(j5, 2)
										) .. "x("
									) .. y(self.difficultyDamageAmplify, 1)
								) .. "%) 冷却缩减:"
							) .. tostring(self.difficultyCooldownReduction)
						) .. "% Boss间隔增幅:"
					) .. tostring(self.difficultyBossGapAmplify)
				) .. "% Boss最终伤害:"
			) .. tostring(self.difficultyBossDamageAmplify)
		) .. "%"
	)
end
function V.prototype.ApplyDifficultyModifiers(self, aJ)
	local j4 = self.spawnInfo.healthFactor or 1
	local j5 = self.spawnInfo.damageFactor or 1
	local j8 = DungeonManager:GetDifficultyKeyHealthFactor()
	local j9 = DungeonManager:GetDifficultyKeyDamageFactor()
	local ja = (1 + self.difficultyHealthAmplify / 100) * j4 * j8
	local jb = (1 + self.difficultyDamageAmplify / 100) * j5 * j9
	local jc = (ja - 1) * 100
	local jd = (jb - 1) * 100
	print("ApplyDifficultyModifiers", j4, j5)
	if jc ~= 0 then
		aJ:AddProperty(PropertyFunction.HEALTH_AMPLIFY, jc)
	end
	if jd ~= 0 then
		aJ:AddProperty(PropertyFunction.ATTACK_AMPLIFY, jd)
	end
	DungeonManager:ApplyDifficultyKeyDebuffs(aJ)
end
function V.prototype.DropPomReward(self, a0)
	local a8 = DrawPool:Draw("pom_reward")
	if a8 ~= nil then
		local b3 = d(J, a8, a0)
		local je = self.dropItems
		je[#je + 1] = b3
		local aT = Interaction:RegisterInteract(b3.entity, InteractType.Chest, 200, function(ac, aU)
			aU:AddItemByName(a8)
			b3:dispose()
		end)
		if aT ~= -1 then
			local jf = self.registeredInteracts
			jf[#jf + 1] = aT
		end
	end
end
function V.prototype.GetRoomKey(self)
	return (tostring(self.zoneID) .. "-") .. tostring(self.roomID)
end
function V.prototype.GetRoomType(self)
	return self.roomType
end
function V.prototype.GetRewardType(self)
	return self.rewardType
end
function V.prototype.GetPosition(self)
	return Vector(self.position.x, self.position.y, self.position.z)
end
function V.prototype.GetEntrancePosition(self)
	return self.entrancePos + CalcDirection2D(self.position, self.entrancePos):__mul(100)
end
function V.prototype.IsCombatRoom(self)
	return self.roomType == RoomType.ENEMY
		or self.roomType == RoomType.ELITE
		or self.roomType == RoomType.MINI_BOSS
		or self.roomType == RoomType.BOSS
end
function V.prototype.IsBossRoom(self)
	return self.roomType == RoomType.BOSS
end
function V.prototype.GetBossName(self)
	return self.bossName
end
function V.prototype.GetNativeNavigationProtectedAreas(self, aa)
	local bj = {}
	local i3 = Entities:First()
	while i3 ~= nil do
		if i3:GetSpawnGroupHandle() == aa then
			local bp = i3:GetName()
			if t(bp, "prop_gate") or t(bp, "prop_wall") or i3:IsNPC() and not i3:HasMovementCapability() then
				bj[#bj + 1] = i3:GetAbsOrigin()
			end
		end
		i3 = Entities:Next(i3)
	end
	return bj
end
function V.prototype.RemovePrefabNavigationUnits(self)
	local jg = self.secretRoomSpawnGroup == nil and { self.spawnGroup } or {
			self.spawnGroup,
			self.secretRoomSpawnGroup,
		}
	local jh = {}
	local i3 = Entities:First()
	while i3 ~= nil do
		if i3:IsNPC() and o(jg, i3:GetSpawnGroupHandle()) then
			jh[#jh + 1] = i3
		end
		i3 = Entities:Next(i3)
	end
	for ac, ad in ipairs(jh) do
		self:RemoveUnit(ad)
	end
end
function V.prototype.IsSpawnComplete(self)
	return self.isSpawnComplete
end
function V.prototype.AddGuaranteedDropCount(self, a8, ji)
	local jj = self.guaranteedDrops[a8] or 0
	local jk = jj + ji
	if jk <= 0 then
		f(self.guaranteedDrops, a8)
		print((("[DungeonRoom " .. tostring(self.roomID)) .. "] 移除必掉物品: ") .. a8)
	else
		self.guaranteedDrops[a8] = jk
		print(
			(
				(
					(((("[DungeonRoom " .. tostring(self.roomID)) .. "] 增加 ") .. a8) .. " 掉落次数: ")
					.. tostring(jj)
				) .. " -> "
			) .. tostring(jk)
		)
	end
end
function V.prototype.IsCompleted(self)
	return self.isComplete
end
function V.prototype.IsCombatEnd(self)
	return self:IsCombatRoom() and self.isCombatEnd
end
function V.prototype.ClearGuaranteedDropItems(self)
	self.guaranteedDrops = {}
end
function V.prototype.GetExitInfo(self)
	return self.exitInfos
end
function V.prototype.GetTrapList(self)
	return self.dungeonTrap:GetTrapList()
end
function V.prototype.GetNpcs(self)
	return self.npcs
end
function V.prototype.GetShopItems(self)
	return self.shopItems
end
function V.prototype.GetSpawnGroup(self)
	return self.spawnGroup
end
function V.prototype.OnEntityKilled(self, jl)
	if self.isDispose then
		return
	end
	local jm = EntIndexToHScript(jl.entindex_killed)
	if not IsValid(jm) then
		return
	end
	if self.secretRoomGate ~= nil and jm == self.secretRoomGate then
		self.secretRoomGate = nil
		ArrayRemove(self.enemies, jm)
		if self.secretRoomDoorPosition ~= nil and self.secretRoomDoorDirection ~= nil then
			self:CreateSecretRoom(self.secretRoomDoorPosition, self.secretRoomDoorDirection)
		end
		return
	end
	if o(self.enemies, jm) then
		local iX = EntIndexToHScript(jl.entindex_attacker)
		if IsValid(iX) and iX:IsRealHero() then
			self.playerKilledEnemyCount = self.playerKilledEnemyCount + 1
		end
		self:DropPreviewRewardsFromEnemy(jm)
		ArrayRemove(self.enemies, jm)
		self.aliveEnemyCount = self.aliveEnemyCount - 1
		self.aliveEnemyCount = math.max(0, self.aliveEnemyCount)
		print(
			(
				(
					(
						(
							(("[DungeonRoom " .. tostring(self.roomID)) .. "] 敌人死亡，剩余=")
							.. tostring(self.aliveEnemyCount)
						) .. "，数组长度="
					) .. tostring(#self.enemies)
				) .. "，totalCount="
			) .. tostring(self.spawnInfo.totalCount)
		)
		if self.aliveEnemyCount <= 0 then
			if self.spawnInfo.totalCount > 0 then
				print(
					((("[DungeonRoom " .. tostring(self.roomID)) .. "] 还有") .. tostring(self.spawnInfo.totalCount))
						.. "只怪待刷新，创建新的一波"
				)
				self:CreateWaveEnemy()
				if self.timerID ~= nil then
					Timer:RestartTimer(self.timerID)
				end
			else
				print(("[DungeonRoom " .. tostring(self.roomID)) .. "] 所有敌人已清除，生成宝箱")
				local a0 = GetGroundPosition(jm:GetAbsOrigin(), jm)
				if not GridNav:IsValidPosition(a0) then
					a0 = self:GetNearestValidGridPosition(a0) or a0
				end
				self:FinishCombat(a0)
			end
		end
	end
	if o(self.breakables, jm) then
		local iX = EntIndexToHScript(jl.entindex_attacker)
		self:DropItemFromEnemy(jm, iX)
		return
	end
end
return z