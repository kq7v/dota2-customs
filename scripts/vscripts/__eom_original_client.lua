--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "addon_game_mode_client"
local b = require("lualib_bundle")
local c = b.__TS__Number
local d = b.__TS__NumberIsFinite
local e = b.__TS__Class
local f = b.__TS__ClassExtends
local g = b.__TS__Delete
local h = b.__TS__DecorateLegacy
local i = b.__TS__New
local j = b.__TS__SourceMapTraceBack
j(
	debug.getinfo(1).short_src,
	{
		["12"] = 12,
		["13"] = 12,
		["14"] = 2,
		["15"] = 4,
		["17"] = 6,
		["18"] = 7,
		["20"] = 9,
		["21"] = 10,
		["23"] = 14,
		["24"] = 15,
		["26"] = 20,
		["27"] = 21,
		["28"] = 22,
		["29"] = 23,
		["30"] = 24,
		["32"] = 26,
		["33"] = 20,
		["34"] = 29,
		["35"] = 29,
		["36"] = 30,
		["37"] = 34,
		["38"] = 35,
		["39"] = 36,
		["40"] = 37,
		["42"] = 60,
		["43"] = 61,
		["44"] = 62,
		["45"] = 62,
		["46"] = 64,
		["47"] = 65,
		["48"] = 62,
		["49"] = 62,
		["50"] = 62,
		["51"] = 69,
		["52"] = 69,
		["53"] = 71,
		["54"] = 72,
		["55"] = 73,
		["58"] = 77,
		["59"] = 78,
		["62"] = 82,
		["63"] = 83,
		["64"] = 84,
		["65"] = 85,
		["67"] = 87,
		["69"] = 89,
		["70"] = 90,
		["71"] = 90,
		["72"] = 90,
		["73"] = 90,
		["74"] = 90,
		["75"] = 91,
		["77"] = 69,
		["78"] = 69,
		["79"] = 69,
		["80"] = 96,
		["81"] = 96,
		["82"] = 98,
		["83"] = 99,
		["84"] = 96,
		["85"] = 96,
		["86"] = 96,
		["87"] = 103,
		["88"] = 103,
		["89"] = 105,
		["90"] = 106,
		["91"] = 103,
		["92"] = 103,
		["93"] = 103,
		["94"] = 110,
		["95"] = 110,
		["96"] = 112,
		["97"] = 113,
		["98"] = 110,
		["99"] = 110,
		["100"] = 110,
		["101"] = 117,
		["102"] = 117,
		["103"] = 119,
		["104"] = 120,
		["105"] = 117,
		["106"] = 117,
		["107"] = 117,
		["108"] = 124,
		["109"] = 124,
		["110"] = 126,
		["111"] = 127,
		["112"] = 124,
		["113"] = 124,
		["114"] = 124,
		["115"] = 131,
		["116"] = 131,
		["117"] = 133,
		["118"] = 134,
		["119"] = 131,
		["120"] = 131,
		["121"] = 131,
		["122"] = 138,
		["123"] = 138,
		["124"] = 140,
		["125"] = 141,
		["126"] = 138,
		["127"] = 138,
		["128"] = 138,
		["129"] = 145,
		["130"] = 145,
		["131"] = 147,
		["132"] = 148,
		["133"] = 145,
		["134"] = 145,
		["135"] = 145,
		["136"] = 152,
		["137"] = 152,
		["138"] = 154,
		["139"] = 155,
		["140"] = 152,
		["141"] = 152,
		["142"] = 152,
		["143"] = 159,
		["144"] = 159,
		["145"] = 161,
		["146"] = 162,
		["147"] = 163,
		["148"] = 163,
		["149"] = 163,
		["150"] = 163,
		["151"] = 163,
		["152"] = 163,
		["153"] = 163,
		["154"] = 163,
		["155"] = 163,
		["156"] = 163,
		["157"] = 163,
		["158"] = 163,
		["159"] = 163,
		["160"] = 163,
		["161"] = 163,
		["162"] = 163,
		["163"] = 163,
		["164"] = 163,
		["165"] = 163,
		["166"] = 163,
		["167"] = 163,
		["168"] = 163,
		["169"] = 163,
		["170"] = 163,
		["171"] = 163,
		["172"] = 163,
		["173"] = 193,
		["174"] = 194,
		["175"] = 194,
		["176"] = 194,
		["177"] = 194,
		["178"] = 196,
		["179"] = 196,
		["180"] = 196,
		["181"] = 196,
		["182"] = 197,
		["183"] = 197,
		["184"] = 197,
		["185"] = 197,
		["186"] = 199,
		["187"] = 199,
		["188"] = 199,
		["189"] = 199,
		["190"] = 200,
		["191"] = 200,
		["192"] = 200,
		["193"] = 200,
		["194"] = 202,
		["195"] = 202,
		["196"] = 202,
		["197"] = 202,
		["198"] = 203,
		["199"] = 203,
		["200"] = 203,
		["201"] = 203,
		["202"] = 204,
		["203"] = 204,
		["204"] = 204,
		["205"] = 204,
		["206"] = 205,
		["207"] = 205,
		["208"] = 205,
		["209"] = 205,
		["210"] = 206,
		["211"] = 206,
		["212"] = 206,
		["213"] = 206,
		["214"] = 207,
		["215"] = 207,
		["216"] = 207,
		["217"] = 207,
		["218"] = 208,
		["219"] = 208,
		["220"] = 208,
		["221"] = 208,
		["222"] = 209,
		["223"] = 209,
		["224"] = 209,
		["225"] = 209,
		["226"] = 210,
		["227"] = 210,
		["228"] = 210,
		["229"] = 210,
		["230"] = 211,
		["231"] = 211,
		["232"] = 211,
		["233"] = 211,
		["234"] = 212,
		["235"] = 212,
		["236"] = 212,
		["237"] = 212,
		["238"] = 213,
		["239"] = 213,
		["240"] = 213,
		["241"] = 213,
		["242"] = 214,
		["243"] = 214,
		["244"] = 214,
		["245"] = 214,
		["246"] = 215,
		["247"] = 215,
		["248"] = 215,
		["249"] = 215,
		["250"] = 216,
		["251"] = 216,
		["252"] = 216,
		["253"] = 216,
		["254"] = 217,
		["255"] = 217,
		["256"] = 217,
		["257"] = 217,
		["258"] = 218,
		["259"] = 218,
		["260"] = 218,
		["261"] = 218,
		["262"] = 219,
		["263"] = 219,
		["264"] = 219,
		["265"] = 219,
		["266"] = 220,
		["267"] = 220,
		["268"] = 220,
		["269"] = 220,
		["271"] = 222,
		["272"] = 159,
		["273"] = 159,
		["274"] = 159,
		["275"] = 226,
		["276"] = 226,
		["277"] = 228,
		["278"] = 229,
		["279"] = 226,
		["280"] = 226,
		["281"] = 226,
		["282"] = 233,
		["283"] = 233,
		["284"] = 235,
		["285"] = 236,
		["286"] = 237,
		["288"] = 233,
		["289"] = 233,
		["290"] = 233,
		["291"] = 34,
		["292"] = 269,
		["293"] = 270,
		["294"] = 271,
		["295"] = 272,
		["296"] = 269,
		["297"] = 274,
		["298"] = 275,
		["299"] = 276,
		["300"] = 274,
		["301"] = 278,
		["302"] = 279,
		["303"] = 280,
		["304"] = 278,
		["305"] = 282,
		["306"] = 283,
		["307"] = 284,
		["308"] = 285,
		["310"] = 286,
		["311"] = 287,
		["313"] = 288,
		["316"] = 290,
		["318"] = 291,
		["319"] = 292,
		["321"] = 294,
		["325"] = 297,
		["327"] = 298,
		["328"] = 299,
		["337"] = 282,
		["338"] = 307,
		["339"] = 308,
		["340"] = 309,
		["341"] = 310,
		["342"] = 311,
		["343"] = 307,
		["344"] = 314,
		["345"] = 315,
		["346"] = 316,
		["347"] = 317,
		["348"] = 318,
		["349"] = 319,
		["350"] = 320,
		["352"] = 322,
		["353"] = 314,
		["354"] = 325,
		["355"] = 326,
		["356"] = 327,
		["358"] = 329,
		["359"] = 330,
		["360"] = 331,
		["363"] = 334,
		["364"] = 334,
		["365"] = 334,
		["366"] = 334,
		["367"] = 334,
		["368"] = 334,
		["369"] = 334,
		["370"] = 325,
		["371"] = 341,
		["372"] = 342,
		["373"] = 341,
		["374"] = 350,
		["375"] = 351,
		["376"] = 352,
		["377"] = 353,
		["378"] = 354,
		["379"] = 355,
		["381"] = 357,
		["383"] = 359,
		["384"] = 360,
		["387"] = 350,
		["388"] = 370,
		["389"] = 371,
		["390"] = 372,
		["391"] = 373,
		["392"] = 374,
		["393"] = 375,
		["394"] = 376,
		["398"] = 370,
		["399"] = 382,
		["400"] = 383,
		["401"] = 384,
		["402"] = 385,
		["403"] = 386,
		["404"] = 386,
		["405"] = 386,
		["406"] = 386,
		["407"] = 387,
		["408"] = 388,
		["409"] = 389,
		["412"] = 382,
		["413"] = 29,
		["414"] = 419,
		["415"] = 420,
		["417"] = 422,
		["418"] = 423,
		["420"] = 425,
		["421"] = 426,
		["422"] = 426,
		["423"] = 426,
		["424"] = 426,
		["425"] = 426,
		["426"] = 426,
		["427"] = 426,
		["428"] = 426,
		["429"] = 426,
		["430"] = 426,
		["432"] = 437,
		["433"] = 438,
		["435"] = 440,
		["436"] = 441,
		["438"] = 444,
	}
)
local k = {}
local l = require("lib.tstl-utils")
local m = l.reloadable
if _G.debug == nil then
	_G.debug = {}
end
if _G.debug.traceback == nil then
	_G.debug.traceback = function(...)
		return ""
	end
end
if _G.debug.getinfo == nil then
	_G.debug.getinfo = function(...)
		return { source = "", what = "", short_src = "" }
	end
end
require("requires")
require("precache")
local function n(o, p)
	local q, r = xpcall(p, debug.traceback)
	if not q then
		print(("[get_unit_stats_data] " .. o) .. " failed:", r)
		return 0
	end
	return type(r) == "number" and d(c(r)) and r or 0
end
local s = e()
s.name = "CClient"
f(s, CModule)
function s.prototype.init(self, t)
	if not t then
		self.tAbilityKeyEvent = {}
		self.tLocalConsoleMessageEvent = {}
	end
	SendToConsole('bind ENTER ""')
	SendToConsole('bind KP_ENTER ""')
	GameEvent("client_reload_game_keyvalues", function()
		require("addon_game_mode_client")
	end, nil)
	GameEvent("client_request_event", function(u)
		local v = tRequestEvents[u.event]
		if v == nil then
			return
		end
		local w = json.decode(u.data)
		if w == nil then
			return
		end
		local x
		local y = v.callback
		if v.context ~= nil then
			x = y(v.context, w)
		else
			x = y(w)
		end
		if u._IsFire ~= true and type(x) == "table" then
			local z = unpack(json.encode(x), 1, 1)
			_G.ClientRequestEventResult = z
		end
	end, nil)
	GameEvent("custom_local_console_message", function(self, ...)
		return self:OnRegisterLocalConsoleMessage(...)
	end, self)
	GameEvent("custom_get_ability_special_value", function(self, ...)
		return self:OnGetAbilitySpecialValue(...)
	end, self)
	GameEvent("custom_get_unit_data", function(self, ...)
		return self:OnGetUnitData(...)
	end, self)
	GameEvent("custom_get_player_data", function(self, ...)
		return self:OnGetPlayerData(...)
	end, self)
	GameEvent("custom_ability_key_event", function(self, ...)
		return self:OnAbilityKeyEvent(...)
	end, self)
	GameEvent("custom_update_portrait_name", function(self, ...)
		return self:OnCustomUpdatePortraitName(...)
	end, self)
	GameEvent("custom_update_preview_attacker_model", function(self, ...)
		return self:OnCustomUpdatePreviewAttackerModel(...)
	end, self)
	RequestEvent("register_ability_key_event", function(self, ...)
		return self:OnRegisterAbilityKeyEvent(...)
	end, self)
	RequestEvent("unregister_ability_key_event", function(self, ...)
		return self:OnUnregisterAbilityKeyEvent(...)
	end, self)
	RequestEvent("get_unit_stats_data", function(self, A)
		local B = EntIndexToHScript(A.unit)
		local x = {
			Attack = 0,
			Critical = 0,
			CriticalDamage = 0,
			Evasion = 0,
			EvasionReduce = 0,
			Power = 0,
			PhysicalReduce = 0,
			MagicalReduce = 0,
			PhysicalDamage = 0,
			MagicalDamage = 0,
			StateResistance = 0,
			ManaRegen = 0,
			Shield = 0,
			Injury = 0,
			Fury = 0,
			Ice = 0,
			Poison = 0,
			FuryPct = 0,
			IcePct = 0,
			Regen = 0,
			RegenPct = 0,
			WispInterval = 0,
			ChaosDamage = 0,
			Chaos = 0,
		}
		if B ~= nil and IsValid(B) then
			x.Attack = n("Attack", function()
				return GetAttackDamage(B)
			end)
			x.Critical = n("Critical", function()
				return GetPhysicalCriticalChance(B)
			end)
			x.CriticalDamage = n("CriticalDamage", function()
				return GetPhysicalCriticalDamage(B)
			end)
			x.Evasion = n("Evasion", function()
				return GetEvasion(B)
			end)
			x.EvasionReduce = n("EvasionReduce", function()
				return GetEvasionIncomingDamageReducePercentage(B)
			end)
			x.Power = n("Power", function()
				return GetUltiPower(B)
			end)
			x.PhysicalReduce = n("PhysicalReduce", function()
				return GetIncomingPhysicalDamagePercent(B)
			end)
			x.MagicalReduce = n("MagicalReduce", function()
				return GetIncomingMagicalDamagePercent(B)
			end)
			x.PhysicalDamage = n("PhysicalDamage", function()
				return GetOutgoingPhysicalDamagePercent(B)
			end)
			x.MagicalDamage = n("MagicalDamage", function()
				return GetOutgoingMagicalDamagePercent(B)
			end)
			x.StateResistance = n("StateResistance", function()
				return GetStateResistance(B)
			end)
			x.ManaRegen = n("ManaRegen", function()
				return GetManaRegen(B)
			end)
			x.Shield = n("Shield", function()
				return GetShieldBonus(B)
			end)
			x.Injury = n("Injury", function()
				return GetInjuryBonus(B)
			end)
			x.Fury = n("Fury", function()
				return GetFuryBonus(B)
			end)
			x.Ice = n("Ice", function()
				return GetIceBonus(B)
			end)
			x.Poison = n("Poison", function()
				return GetPoisonBonus(B)
			end)
			x.FuryPct = n("FuryPct", function()
				return GetFuryBonusPct(B)
			end)
			x.IcePct = n("IcePct", function()
				return GetIceBonusPct(B)
			end)
			x.Regen = n("Regen", function()
				return GetHealBonus(B)
			end)
			x.RegenPct = n("RegenPct", function()
				return GetHealAmplify(B)
			end)
			x.WispInterval = n("WispInterval", function()
				return GetWispInterval(B)
			end)
			x.ChaosDamage = n("ChaosDamage", function()
				return GetChaosDamageBonus(B)
			end)
			x.Chaos = n("Chaos", function()
				return GetChaosBonus(B)
			end)
		end
		return x
	end, self)
	GameEvent("date_now", function(self, C)
		_G.date_now = C.date
	end, self)
	GameEvent("client_side_event", function(self, C)
		if C.event_name == "cosmetics_update" then
			self.tCurrentCosmetics = json.decode(C.event_data)
		end
	end, self)
end
function s.prototype.OnGetAbilitySpecialValue(self, C)
	_G.GetAbilitySpecialValue_AbilityEntIndex = C.ability_ent_index
	_G.GetAbilitySpecialValue_Level = C.level
	_G.GetAbilitySpecialValue_KeyName = C.key_name
end
function s.prototype.OnGetUnitData(self, C)
	_G.GetUnitData_UnitEntIndex = C.unit_ent_index
	_G.GetUnitData_FunctionName = C.function_name
end
function s.prototype.OnGetPlayerData(self, C)
	_G.GetPlayerData_PlayerID = C.player_id
	_G.GetPlayerData_FunctionName = C.function_name
end
function s.prototype.OnAbilityKeyEvent(self, C)
	local D = self.tAbilityKeyEvent[C.event_name]
	if D then
		local E = D.slot
		repeat
			local F = C.phase
			local G = F == 0
			if G then
				SendToConsole("dota_ability_autocast " .. tostring(E))
				break
			end
			G = G or F == 1
			if G then
				if D.quick_cast then
					SendToConsole(("dota_ability_quickcast " .. tostring(E)) .. " 1")
				else
					SendToConsole("dota_ability_execute " .. tostring(E))
				end
				break
			end
			G = G or F == 2
			if G then
				if D.quick_cast then
					SendToConsole(("dota_ability_quickcast " .. tostring(E)) .. " 0")
				end
				break
			end
			do
				break
			end
		until true
	end
end
function s.prototype.OnRegisterAbilityKeyEvent(self, C)
	local H = DoUniqueString(C.key_name)
	SendToConsole((("bind " .. C.key_name) .. " +") .. H)
	self.tAbilityKeyEvent[H] = { slot = C.slot, key_name = C.key_name, quick_cast = C.quick_cast }
	return { event_name = H }
end
function s.prototype.OnUnregisterAbilityKeyEvent(self, C)
	local D = self.tAbilityKeyEvent[C.event_name]
	local I = false
	if D ~= nil then
		I = true
		g(self.tAbilityKeyEvent, C.event_name)
		SendToConsole((("unbind " .. D.key_name) .. " +") .. C.event_name)
	end
	return { success = I }
end
function s.prototype.OnCustomUpdatePortraitName(self, C)
	if _G._tPortraitList == nil then
		_G._tPortraitList = {}
	end
	for J = #_G._tPortraitList, 1, -1 do
		if _G._tPortraitList[J].time <= GameRules:GetGameTime() - 1 then
			table.remove(_G._tPortraitList, J)
		end
	end
	table.insert(_G._tPortraitList, { name = C.name, time = GameRules:GetGameTime() })
end
function s.prototype.OnCustomUpdatePreviewAttackerModel(self, C)
	attackerModel = C.model
end
function s.prototype.OnRegisterLocalConsoleMessage(self, C)
	local K = C.event
	local L = C.key
	if C.enable == 1 then
		if self.tLocalConsoleMessageEvent[K] == nil then
			self.tLocalConsoleMessageEvent[K] = {}
		end
		self.tLocalConsoleMessageEvent[K][L] = true
	else
		if self.tLocalConsoleMessageEvent[K] then
			self.tLocalConsoleMessageEvent[K][L] = nil
		end
	end
end
function s.prototype.SendLocalConsoleMessage(self, M, w)
	if self.tLocalConsoleMessageEvent[M] then
		local N = json.encode(w)
		N = url_encode_unicode(nil, N)
		for O, P in pairs(self.tLocalConsoleMessageEvent[M]) do
			if P then
				SendToConsole(((M .. O) .. " ") .. N)
			end
		end
	end
end
function s.prototype.GetPlayerPortraitData(self, Q)
	local R = CustomNetTables:GetTableValue("player_extra_data", "player_data_index")
	if R and R[tostring(Q)] then
		local S = R[tostring(Q)]
		local T = CustomNetTables:GetTableValue("player_data", tostring(S))
		if T then
			local U = Wearable:getWearableID(T.heroName, S)
			return { playerID = S, unit_name = U or T.heroName or "" }
		end
	end
end
s = h({ m }, s)
if _G.Client == nil then
	_G.Client = i(s)
end
if _G.cosmeticPreviewLiveState == nil then
	_G.cosmeticPreviewLiveState = false
end
if _G.PlayerHomePos == nil then
	PlayerHomePos = {
		Vector(-11264, -11264, 0),
		Vector(0, -11264, 0),
		Vector(11264, -11264, 0),
		Vector(-11264, 0, 0),
		Vector(11264, 0, 0),
		Vector(-11264, 11264, 0),
		Vector(0, 11264, 0),
		Vector(11264, 11264, 0),
	}
end
if _G.HeroPortraitDataQueue == nil then
	_G.HeroPortraitDataQueue = {}
end
if not Activated then
	CModule:initialize()
end
require("reload")
return k