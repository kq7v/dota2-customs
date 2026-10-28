--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "mechanics/hunt_save_archive"
local b = require("lualib_bundle")
local c = b.Set
local d = b.__TS__New
local e = b.__TS__SparseArrayNew
local f = b.__TS__SparseArrayPush
local g = b.__TS__SparseArraySpread
local h = b.__TS__Class
local i = b.__TS__ClassExtends
local j = b.__TS__StringStartsWith
local k = b.__TS__NumberIsFinite
local l = b.__TS__ObjectAssign
local m = b.__TS__ArrayMap
local n = b.__TS__Delete
local o = b.__TS__ObjectRest
local p = b.__TS__DecorateLegacy
local q = {}
local r = require("lib.tstl-utils")
local s = r.reloadable
local t = d(c, { "item_poison_potion", "item_artifact_ghost_scepter", "item_dragon_egg", "item_dragon_baby" })
local u = c
local v = e(unpack(TAVERN_ITEMS))
f(
	v,
	"item_tome_of_prop_single",
	"item_ball_attack_single",
	"item_ball_health_single",
	"privilege_019",
	"privilege_023",
	"privilege_weapon_030",
	"privilege_weapon_041",
	"privilege_weapon_038",
	"privilege_weapon_039",
	"privilege_weapon_040",
	"privilege_weapon_046",
	"privilege_weapon_047",
	"privilege_weapon_049"
)
local w = d(u, { g(v) })
local x = h()
x.name = "CHuntSaveArchive"
i(x, CModule)
function x.prototype.____constructor(self, ...)
	CModule.prototype.____constructor(self, ...)
	self.playerStates = {}
	self.preparedSaves = {}
	self.playerAttributes = {}
	self.restoredSaves = {}
end
function x.prototype.init(self, y)
	if self.playerAttributes == nil then
		self.playerAttributes = {}
	end
	if self.restoredSaves == nil then
		self.restoredSaves = {}
	end
	if not y then
		self.playerStates = {}
		self.preparedSaves = {}
	end
	if self.propertyAddedEventID ~= nil then
		Event:Unregister(self.propertyAddedEventID)
	end
	self.propertyAddedEventID = Event:Register("property_added", self.OnPropertyAdded, self)
	CustomUIEvent("hunt_save_archive_save", function(z, A)
		self:SaveSnapshot(A.PlayerID, A.slot_id)
	end, self)
end
function x.prototype.OnPropertyAdded(self, B)
	local C
	local D
	local E
	local F
	F = B.unit
	E = B.property
	D = B.value
	C = B.source
	if not w:has(C) and not j(C, "hero_level_up_") and not j(C, "dungeon_room_complete_") then
		return
	end
	local G = PROPERTY_MAP_REVERSE[E]
	if G ~= nil then
		self:RecordAttributeGain(F, G, D)
	end
end
function x.prototype.RecordAttributeGain(self, F, G, D)
	if not IsValid(F) or not k(D) or PropertySystem:GetScopeOfProperty(G) ~= PropertyScope.UNIT then
		return
	end
	local H = F:GetPlayerOwnerID()
	if Player:GetHero(H) ~= F then
		return
	end
	if self.playerAttributes == nil then
		self.playerAttributes = {}
	end
	local I, J = self.playerAttributes, H
	if I[J] == nil then
		I[J] = { attributes = {} }
	end
	local K = self.playerAttributes[H]
	local L = K.attributes[G]
	K.attributes[G] = L == nil and D or PropertySystem:AggregatePropertyValues(G, L, D)
end
function x.prototype.GetAttributes(self, H)
	local M = self.playerAttributes
	local K = M and M[H]
	return K == nil and {} or l({}, K.attributes)
end
function x.prototype.CreateSnapshot(self, H, F)
	if self.playerStates[H] ~= nil then
		self:Sync(H)
		return
	end
	local N = {}
	for z, O in ipairs(F:GetAllItems()) do
		do
			if not IsValid(O) or KeyValues.artifact[O:GetAbilityName()] == nil then
				goto P
			end
			N[#N + 1] = { item_name = O:GetAbilityName(), level = O:GetLevel(), run_state = {
				stack_count = O:GetStackCount(),
			} }
		end
		::P::
	end
	local Q = m(Bless:GetPlayerBlessDetails(H), function(z, R)
		local O = F:GetItemByName(R.name)
		return l({}, R, { run_state = IsValid(O) and { stack_count = O:GetStackCount() } or nil })
	end)
	local S = {}
	for z, T in ipairs(AbilityUpgrade:GetAbilityUpgrades(F)) do
		if not AbilityUpgrade:IsServiceUpgrade(T.name) then
			S[#S + 1] = { name = T.name, level = T.level }
		end
	end
	self.playerStates[H] = { hasSaved = false }
	local U = self.Sync
	local V = H
	local W = math.floor(Login:GetServiceTimestamp())
	local X = CustomNetTables:GetNetData("common", "difficulty_key")
	local Y = X and X.key_data
	local Z = Y and Y.intensity
	local _ = F:GetUnitName()
	local a0 = F:GetLevel()
	local a1 = math.floor
	local a2 = DamageCounter:GetPlayerDamageCount(H)
	U(
		self,
		V,
		{
			time = W,
			strength = Z,
			hero_name = _,
			hero_level = a0,
			total_damage = a1(a2 and a2.totalDamage or 0),
			blessings = Q,
			artifacts = N,
			ability_upgrades = S,
			attributes = self:GetAttributes(H),
		}
	)
end
function x.prototype.GetAutoSelectSlotID(self, H, a3)
	local F = Player:GetHero(H)
	if not IsValid(F) then
		return nil
	end
	local a4 = toFiniteNumber
	local a5 = KeyValues.hunt_intelligence
	local a6 = a5 and a5[tostring(a3)]
	if a6 ~= nil then
		a6 = a6.dungeon_diff
	end
	local a7 = a4(a6, 0)
	if a7 < 1 then
		return nil
	end
	local a8 = CommonService:GetPlayerServiceNetTable(H, "player_hunt_save_datas") or {}
	local a9
	local aa = -1
	for ab, ac in pairs(a8) do
		do
			if ac.diff < a7 or ac.data == "" then
				goto ad
			end
			local ae = json.decode(ac.data)
			local af = ae
			if (af and af.hero_name) ~= F:GetUnitName() then
				goto ad
			end
			local ag = toFiniteNumber(af.total_damage, 0)
			if a9 == nil or ag > aa or ag == aa and ac.slot_id < a9 then
				a9 = ac.slot_id
				aa = ag
			end
		end
		::ad::
	end
	return a9
end
function x.prototype.PrepareSelectedSave(self, H, ah, ai)
	local aj = CommonService:GetPlayerServiceNetTable(H, "player_hunt_save_datas")
	local ac = aj and aj[tostring(ah)]
	if ac == nil or ac.diff <= 0 or ac.data == "" then
		self:print(
			(
				(
					((("[HuntSaveArchive] prepare failed player=" .. tostring(H)) .. " slot=") .. tostring(ah))
					.. " match="
				) .. tostring(ai)
			) .. " save missing"
		)
		return false
	end
	self.preparedSaves[H] = { matchID = ai, slotID = ah, save = l({}, ac) }
	return true
end
function x.prototype.GetSelectedSave(self, H, ah)
	local ak = self.preparedSaves[H]
	if (ak and ak.matchID) == Match:GetMatchID() and ak.slotID == ah then
		return ak.save
	end
	local al = CommonService:GetPlayerServiceNetTable(H, "player_hunt_save_datas")
	return al and al[tostring(ah)]
end
function x.prototype.ClearPreparedSaves(self, ai)
	for H, ak in pairs(self.preparedSaves) do
		if (ak and ak.matchID) == ai then
			n(self.preparedSaves, H)
		end
	end
end
function x.prototype.reset(self)
	self.playerStates = {}
	self.preparedSaves = {}
	self.playerAttributes = {}
	self.restoredSaves = {}
	Game:EachPlayer(function(z, H)
		CustomNetTables:SetNetData("player_data", "hunt_save_snapshot", nil, H)
	end)
end
function x.prototype.ApplySelectedSave(self, H, F, ah)
	if not IsValid(F) then
		return false
	end
	if self.restoredSaves == nil then
		self.restoredSaves = {}
	end
	local am = self.restoredSaves[H]
	if (am and am.hero) == F and am.matchID == Match:GetMatchID() then
		return am.slotID == ah
	end
	local an = self:GetSelectedSave(H, ah)
	if an == nil or an.data == "" then
		self:print(
			((("[HuntSaveArchive] restore skipped player=" .. tostring(H)) .. " slot=") .. tostring(ah))
				.. " save missing"
		)
		return false
	end
	local ao = json.decode(an.data)
	local af = ao
	if af == nil or af.hero_name ~= F:GetUnitName() then
		self:print(
			(
				(
					(
						((("[HuntSaveArchive] restore skipped player=" .. tostring(H)) .. " slot=") .. tostring(ah))
						.. " savedHero="
					) .. (af and af.hero_name or "")
				) .. " currentHero="
			) .. F:GetUnitName()
		)
		return false
	end
	self:RestoreHeroLevel(F, af.hero_level)
	local ap = 0
	for z, R in ipairs(af.blessings or {}) do
		do
			if R.name == "" or R.rarity <= 0 then
				goto aq
			end
			local O = Bless:AddBless(F, { name = R.name, rarity = math.floor(R.rarity) })
			if O ~= nil and IsValid(O) then
				self:RestoreItemStackCount(O, R.run_state)
				ap = ap + 1
			end
		end
		::aq::
	end
	local ar = 0
	for z, as in ipairs(af.artifacts or {}) do
		do
			if as.item_name == "" or as.level <= 0 or KeyValues.artifact[as.item_name] == nil then
				goto at
			end
			local O = F:AddItemByName(as.item_name, math.floor(as.level), false)
			if O ~= nil and IsValid(O) then
				self:RestoreItemStackCount(O, as.run_state)
				ar = ar + 1
			end
		end
		::at::
	end
	local au = 0
	local av = {}
	for z, T in ipairs(af.ability_upgrades or {}) do
		do
			if T.name == "" or T.level <= 0 then
				goto aw
			end
			if AbilityUpgrade:AddAbilityUpgrade(F, T.name, math.floor(T.level), "hunt_save_archive") then
				av[#av + 1] = T.name
				au = au + 1
			end
		end
		::aw::
	end
	CustomNetTables:SetNetData("common", "upgrade_list", { upgrades = av }, H)
	local ax = 0
	for G, D in pairs(af.attributes or {}) do
		do
			if PropertySystem:GetScopeOfProperty(G) ~= PropertyScope.UNIT or not k(D) then
				goto ay
			end
			if PropertySystem:AddStaticProperty(F:entindex(), G, "hunt_save_archive_gain", D) then
				ax = ax + 1
				self:print(
					(
						(
							(
								(
									(
										("[HuntSaveArchive] restored permanent property player=" .. tostring(H))
										.. " slot="
									) .. tostring(ah)
								) .. " property="
							) .. G
						) .. " value="
					) .. tostring(D)
				)
			end
		end
		::ay::
	end
	self.restoredSaves[H] = { hero = F, matchID = Match:GetMatchID(), slotID = ah }
	F:UpdateAbilityNetData()
	return true
end
function x.prototype.RestoreHeroLevel(self, F, az)
	if type(az) ~= "number" or not k(az) or az < 1 then
		return
	end
	local aA = math.min(HERO_MAX_LEVEL, math.floor(az))
	if aA <= F:GetLevel() then
		return
	end
	do
		local aB = F:GetLevel()
		while aB < aA do
			F:HeroLevelUp(false)
			aB = aB + 1
		end
	end
end
function x.prototype.RestoreItemStackCount(self, O, aC)
	if not t:has(O:GetAbilityName()) or aC == nil or type(aC) ~= "table" then
		return
	end
	local aD = aC.stack_count
	if type(aD) ~= "number" or not k(aD) or aD < 0 or math.floor(aD) ~= aD then
		return
	end
	local aE = O:GetStackCount()
	O:SetStackCount(aD)
end
function x.prototype.SaveSnapshot(self, H, ah)
	local aC = self.playerStates[H]
	local af = self:GetSnapshot(H)
	if aC == nil or aC.hasSaved or af == nil then
		return
	end
	af.time = math.floor(Login:GetServiceTimestamp())
	aC.hasSaved = true
	self:Sync(H, af)
	CommonService:CallAction(
		"/v1/hunt/save_data",
		H,
		{ match_id = Match:GetMatchID(), slot_id = ah, data = json.encode(af) },
		function(z, aF, aG)
			CommonService:CommonCallback(H, aG, false)
		end,
		false
	)
end
function x.prototype.GetSnapshot(self, H)
	local aH = CustomNetTables:GetNetData("player_data", "hunt_save_snapshot", H)
	if aH == nil then
		return nil
	end
	local aI = aH.has_saved
	local af = o(aH, { has_saved = true })
	return af
end
function x.prototype.Sync(self, H, af)
	if af == nil then
		af = self:GetSnapshot(H)
	end
	local aC = self.playerStates[H]
	if aC == nil or af == nil then
		return
	end
	CustomNetTables:SetNetData("player_data", "hunt_save_snapshot", l({}, af, { has_saved = aC.hasSaved }), H)
end
x = p({ s }, x)
if HuntSaveArchive == nil then
	HuntSaveArchive = d(x)
end
return q