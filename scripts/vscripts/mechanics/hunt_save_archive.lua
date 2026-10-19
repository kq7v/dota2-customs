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
local j = b.__TS__NumberIsFinite
local k = b.__TS__ObjectAssign
local l = b.__TS__ArrayMap
local m = b.__TS__Delete
local n = b.__TS__ObjectRest
local o = b.__TS__DecorateLegacy
local p = {}
local q = require("lib.tstl-utils")
local r = q.reloadable
local s = d(c, { "item_poison_potion", "item_artifact_ghost_scepter", "item_dragon_egg", "item_dragon_baby" })
local t = c
local u = e(unpack(TAVERN_ITEMS))
f(
	u,
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
local v = d(t, { g(u) })
local w = h()
w.name = "CHuntSaveArchive"
i(w, CModule)
function w.prototype.____constructor(self, ...)
	CModule.prototype.____constructor(self, ...)
	self.playerStates = {}
	self.preparedSaves = {}
	self.playerAttributes = {}
	self.restoredSaves = {}
end
function w.prototype.init(self, x)
	if self.playerAttributes == nil then
		self.playerAttributes = {}
	end
	if self.restoredSaves == nil then
		self.restoredSaves = {}
	end
	if not x then
		self.playerStates = {}
		self.preparedSaves = {}
	end
	if self.propertyAddedEventID ~= nil then
		Event:Unregister(self.propertyAddedEventID)
	end
	self.propertyAddedEventID = Event:Register("property_added", self.OnPropertyAdded, self)
	CustomUIEvent("hunt_save_archive_save", function(y, z)
		self:SaveSnapshot(z.PlayerID, z.slot_id)
	end, self)
end
function w.prototype.OnPropertyAdded(self, A)
	local B
	local C
	local D
	local E
	E = A.unit
	D = A.property
	C = A.value
	B = A.source
	if not v:has(B) or not IsValid(E) or not j(C) then
		return
	end
	local F = PROPERTY_MAP_REVERSE[D]
	local G = E:GetPlayerOwnerID()
	if F == nil or PropertySystem:GetScopeOfProperty(F) ~= PropertyScope.UNIT or Player:GetHero(G) ~= E then
		return
	end
	if self.playerAttributes == nil then
		self.playerAttributes = {}
	end
	local H, I = self.playerAttributes, G
	if H[I] == nil then
		H[I] = { attributes = {} }
	end
	local J = self.playerAttributes[G]
	local K = J.attributes[F]
	J.attributes[F] = K == nil and C or PropertySystem:AggregatePropertyValues(F, K, C)
	self:print(
		(
			(
				(
					(
						(
							(
								(("[HuntSaveArchive] recorded permanent property player=" .. tostring(G)) .. " source=")
								.. B
							) .. " property="
						) .. F
					) .. " gain="
				) .. tostring(C)
			) .. " total="
		) .. tostring(J.attributes[F])
	)
end
function w.prototype.GetAttributes(self, G)
	local L = self.playerAttributes
	local J = L and L[G]
	return J == nil and {} or k({}, J.attributes)
end
function w.prototype.CreateSnapshot(self, G, E)
	if self.playerStates[G] ~= nil then
		self:Sync(G)
		return
	end
	local M = {}
	for y, N in ipairs(E:GetAllItems()) do
		do
			if not IsValid(N) or KeyValues.artifact[N:GetAbilityName()] == nil then
				goto O
			end
			M[#M + 1] = { item_name = N:GetAbilityName(), level = N:GetLevel(), run_state = {
				stack_count = N:GetStackCount(),
			} }
		end
		::O::
	end
	local P = l(Bless:GetPlayerBlessDetails(G), function(y, Q)
		local N = E:GetItemByName(Q.name)
		return k({}, Q, { run_state = IsValid(N) and { stack_count = N:GetStackCount() } or nil })
	end)
	local R = {}
	for y, S in ipairs(AbilityUpgrade:GetAbilityUpgrades(E)) do
		if not AbilityUpgrade:IsServiceUpgrade(S.name) then
			R[#R + 1] = { name = S.name, level = S.level }
		end
	end
	self.playerStates[G] = { hasSaved = false }
	local T = self.Sync
	local U = G
	local V = math.floor(Login:GetServiceTimestamp())
	local W = CustomNetTables:GetNetData("common", "difficulty_key")
	local X = W and W.key_data
	local Y = X and X.intensity
	local Z = E:GetUnitName()
	local _ = math.floor
	local a0 = DamageCounter:GetPlayerDamageCount(G)
	T(
		self,
		U,
		{
			time = V,
			strength = Y,
			hero_name = Z,
			total_damage = _(a0 and a0.totalDamage or 0),
			blessings = P,
			artifacts = M,
			ability_upgrades = R,
			attributes = self:GetAttributes(G),
		}
	)
end
function w.prototype.GetAutoSelectSlotID(self, G, a1)
	local E = Player:GetHero(G)
	if not IsValid(E) then
		return nil
	end
	local a2 = toFiniteNumber
	local a3 = KeyValues.hunt_intelligence
	local a4 = a3 and a3[tostring(a1)]
	if a4 ~= nil then
		a4 = a4.dungeon_diff
	end
	local a5 = a2(a4, 0)
	if a5 < 1 then
		return nil
	end
	local a6 = CommonService:GetPlayerServiceNetTable(G, "player_hunt_save_datas") or {}
	local a7
	local a8 = -1
	for a9, aa in pairs(a6) do
		do
			if aa.diff < a5 or aa.data == "" then
				goto ab
			end
			local ac = json.decode(aa.data)
			local ad = ac
			if (ad and ad.hero_name) ~= E:GetUnitName() then
				goto ab
			end
			local ae = toFiniteNumber(ad.total_damage, 0)
			if a7 == nil or ae > a8 or ae == a8 and aa.slot_id < a7 then
				a7 = aa.slot_id
				a8 = ae
			end
		end
		::ab::
	end
	return a7
end
function w.prototype.PrepareSelectedSave(self, G, af, ag)
	local ah = CommonService:GetPlayerServiceNetTable(G, "player_hunt_save_datas")
	local aa = ah and ah[tostring(af)]
	if aa == nil or aa.diff <= 0 or aa.data == "" then
		self:print(
			(
				(
					((("[HuntSaveArchive] prepare failed player=" .. tostring(G)) .. " slot=") .. tostring(af))
					.. " match="
				) .. tostring(ag)
			) .. " save missing"
		)
		return false
	end
	self.preparedSaves[G] = { matchID = ag, slotID = af, save = k({}, aa) }
	return true
end
function w.prototype.GetSelectedSave(self, G, af)
	local ai = self.preparedSaves[G]
	if (ai and ai.matchID) == Match:GetMatchID() and ai.slotID == af then
		return ai.save
	end
	local aj = CommonService:GetPlayerServiceNetTable(G, "player_hunt_save_datas")
	return aj and aj[tostring(af)]
end
function w.prototype.ClearPreparedSaves(self, ag)
	for G, ai in pairs(self.preparedSaves) do
		if (ai and ai.matchID) == ag then
			m(self.preparedSaves, G)
		end
	end
end
function w.prototype.reset(self)
	self.playerStates = {}
	self.preparedSaves = {}
	self.playerAttributes = {}
	self.restoredSaves = {}
	Game:EachPlayer(function(y, G)
		CustomNetTables:SetNetData("player_data", "hunt_save_snapshot", nil, G)
	end)
end
function w.prototype.ApplySelectedSave(self, G, E, af)
	if not IsValid(E) then
		return false
	end
	if self.restoredSaves == nil then
		self.restoredSaves = {}
	end
	local ak = self.restoredSaves[G]
	if (ak and ak.hero) == E and ak.matchID == Match:GetMatchID() then
		return ak.slotID == af
	end
	local al = self:GetSelectedSave(G, af)
	if al == nil or al.data == "" then
		self:print(
			((("[HuntSaveArchive] restore skipped player=" .. tostring(G)) .. " slot=") .. tostring(af))
				.. " save missing"
		)
		return false
	end
	local am = json.decode(al.data)
	local ad = am
	if ad == nil or ad.hero_name ~= E:GetUnitName() then
		self:print(
			(
				(
					(
						((("[HuntSaveArchive] restore skipped player=" .. tostring(G)) .. " slot=") .. tostring(af))
						.. " savedHero="
					) .. (ad and ad.hero_name or "")
				) .. " currentHero="
			) .. E:GetUnitName()
		)
		return false
	end
	local an = 0
	for y, Q in ipairs(ad.blessings or {}) do
		do
			if Q.name == "" or Q.rarity <= 0 then
				goto ao
			end
			local N = Bless:AddBless(E, { name = Q.name, rarity = math.floor(Q.rarity) })
			if N ~= nil and IsValid(N) then
				self:RestoreItemStackCount(N, Q.run_state)
				an = an + 1
			end
		end
		::ao::
	end
	local ap = 0
	for y, aq in ipairs(ad.artifacts or {}) do
		do
			if aq.item_name == "" or aq.level <= 0 or KeyValues.artifact[aq.item_name] == nil then
				goto ar
			end
			local N = E:AddItemByName(aq.item_name, math.floor(aq.level), false)
			if N ~= nil and IsValid(N) then
				self:RestoreItemStackCount(N, aq.run_state)
				ap = ap + 1
			end
		end
		::ar::
	end
	local as = 0
	for y, S in ipairs(ad.ability_upgrades or {}) do
		do
			if S.name == "" or S.level <= 0 then
				goto at
			end
			AbilityUpgrade:AddAbilityUpgrade(E, S.name, math.floor(S.level), "hunt_save_archive")
			as = as + 1
		end
		::at::
	end
	local au = 0
	for F, C in pairs(ad.attributes or {}) do
		do
			if PropertySystem:GetScopeOfProperty(F) ~= PropertyScope.UNIT or not j(C) then
				goto av
			end
			if PropertySystem:AddStaticProperty(E:entindex(), F, "hunt_save_archive_gain", C) then
				au = au + 1
				self:print(
					(
						(
							(
								(
									(
										("[HuntSaveArchive] restored permanent property player=" .. tostring(G))
										.. " slot="
									) .. tostring(af)
								) .. " property="
							) .. F
						) .. " value="
					) .. tostring(C)
				)
			end
		end
		::av::
	end
	self.restoredSaves[G] = { hero = E, matchID = Match:GetMatchID(), slotID = af }
	E:UpdateAbilityNetData()
	self:print(
		(
			(
				(
					(
						(
							(
								(
									(
										(("[HuntSaveArchive] restored player=" .. tostring(G)) .. " slot=")
										.. tostring(af)
									) .. " blessings="
								) .. tostring(an)
							) .. " artifacts="
						) .. tostring(ap)
					) .. " upgrades="
				) .. tostring(as)
			) .. " propertyGains="
		) .. tostring(au)
	)
	return true
end
function w.prototype.RestoreItemStackCount(self, N, aw)
	if not s:has(N:GetAbilityName()) or aw == nil or type(aw) ~= "table" then
		return
	end
	local ax = aw.stack_count
	if type(ax) ~= "number" or not j(ax) or ax < 0 or math.floor(ax) ~= ax then
		return
	end
	local ay = N:GetStackCount()
	N:SetStackCount(ax)
	self:print(
		(
			(
				(
					(
						(
							(
								(
									(
										"[HuntSaveArchive] restored item stack player="
										.. tostring(N:GetCaster():GetPlayerOwnerID())
									) .. " item="
								) .. N:GetAbilityName()
							) .. " entity="
						) .. tostring(N:entindex())
					) .. " before="
				) .. tostring(ay)
			) .. " after="
		) .. tostring(N:GetStackCount())
	)
end
function w.prototype.SaveSnapshot(self, G, af)
	local aw = self.playerStates[G]
	local ad = self:GetSnapshot(G)
	if aw == nil or aw.hasSaved or ad == nil then
		return
	end
	ad.time = math.floor(Login:GetServiceTimestamp())
	aw.hasSaved = true
	self:Sync(G, ad)
	CommonService:CallAction(
		"/v1/hunt/save_data",
		G,
		{ match_id = Match:GetMatchID(), slot_id = af, data = json.encode(ad) },
		function(y, az, aA)
			CommonService:CommonCallback(G, aA, false)
		end,
		false
	)
end
function w.prototype.GetSnapshot(self, G)
	local aB = CustomNetTables:GetNetData("player_data", "hunt_save_snapshot", G)
	if aB == nil then
		return nil
	end
	local aC = aB.has_saved
	local ad = n(aB, { has_saved = true })
	return ad
end
function w.prototype.Sync(self, G, ad)
	if ad == nil then
		ad = self:GetSnapshot(G)
	end
	local aw = self.playerStates[G]
	if aw == nil or ad == nil then
		return
	end
	CustomNetTables:SetNetData("player_data", "hunt_save_snapshot", k({}, ad, { has_saved = aw.hasSaved }), G)
end
w = o({ r }, w)
if HuntSaveArchive == nil then
	HuntSaveArchive = d(w)
end
return p