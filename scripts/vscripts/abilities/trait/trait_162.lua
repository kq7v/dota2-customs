--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/trait/trait_162"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = b.__TS__ArraySlice
local g = b.__TS__ArrayIncludes
local h = b.__TS__ObjectKeys
local i = b.__TS__ArrayFilter
local j = b.__TS__ArraySome
local k = b.__TS__SourceMapTraceBack
k(
	debug.getinfo(1).short_src,
	{
		["13"] = 1,
		["14"] = 1,
		["15"] = 1,
		["16"] = 2,
		["17"] = 2,
		["18"] = 2,
		["19"] = 4,
		["20"] = 5,
		["21"] = 6,
		["22"] = 8,
		["23"] = 10,
		["24"] = 11,
		["25"] = 12,
		["26"] = 8,
		["27"] = 15,
		["28"] = 16,
		["29"] = 15,
		["30"] = 16,
		["31"] = 17,
		["32"] = 18,
		["33"] = 17,
		["34"] = 16,
		["35"] = 15,
		["36"] = 16,
		["38"] = 16,
		["39"] = 22,
		["40"] = 29,
		["41"] = 22,
		["42"] = 29,
		["43"] = 36,
		["44"] = 37,
		["45"] = 38,
		["46"] = 39,
		["47"] = 40,
		["48"] = 41,
		["49"] = 42,
		["50"] = 36,
		["51"] = 45,
		["52"] = 46,
		["53"] = 46,
		["54"] = 46,
		["55"] = 46,
		["56"] = 46,
		["58"] = 45,
		["59"] = 49,
		["60"] = 50,
		["61"] = 51,
		["62"] = 51,
		["63"] = 51,
		["64"] = 50,
		["65"] = 53,
		["66"] = 53,
		["67"] = 53,
		["68"] = 50,
		["69"] = 50,
		["70"] = 49,
		["71"] = 57,
		["72"] = 58,
		["73"] = 57,
		["74"] = 61,
		["75"] = 62,
		["76"] = 61,
		["77"] = 65,
		["78"] = 66,
		["81"] = 69,
		["82"] = 70,
		["83"] = 71,
		["86"] = 74,
		["87"] = 75,
		["88"] = 76,
		["89"] = 76,
		["90"] = 76,
		["92"] = 76,
		["93"] = 77,
		["94"] = 77,
		["95"] = 77,
		["97"] = 77,
		["98"] = 78,
		["99"] = 79,
		["100"] = 80,
		["101"] = 80,
		["102"] = 80,
		["103"] = 80,
		["104"] = 81,
		["107"] = 82,
		["108"] = 83,
		["109"] = 84,
		["111"] = 86,
		["112"] = 87,
		["113"] = 65,
		["114"] = 90,
		["115"] = 91,
		["116"] = 91,
		["117"] = 91,
		["119"] = 91,
		["120"] = 92,
		["121"] = 92,
		["122"] = 92,
		["123"] = 92,
		["126"] = 94,
		["127"] = 94,
		["128"] = 94,
		["129"] = 94,
		["130"] = 94,
		["131"] = 96,
		["132"] = 97,
		["133"] = 97,
		["135"] = 98,
		["136"] = 99,
		["137"] = 99,
		["138"] = 99,
		["140"] = 99,
		["141"] = 100,
		["142"] = 100,
		["143"] = 100,
		["144"] = 100,
		["145"] = 100,
		["146"] = 101,
		["147"] = 101,
		["148"] = 101,
		["149"] = 101,
		["150"] = 101,
		["151"] = 101,
		["152"] = 101,
		["153"] = 102,
		["154"] = 94,
		["155"] = 94,
		["156"] = 90,
		["157"] = 106,
		["158"] = 107,
		["159"] = 108,
		["162"] = 109,
		["163"] = 110,
		["164"] = 111,
		["165"] = 111,
		["166"] = 111,
		["167"] = 111,
		["168"] = 111,
		["169"] = 111,
		["170"] = 111,
		["171"] = 111,
		["174"] = 118,
		["175"] = 119,
		["176"] = 120,
		["179"] = 121,
		["180"] = 122,
		["181"] = 123,
		["182"] = 124,
		["183"] = 125,
		["184"] = 125,
		["185"] = 125,
		["186"] = 125,
		["187"] = 125,
		["188"] = 125,
		["189"] = 125,
		["191"] = 127,
		["192"] = 127,
		["193"] = 127,
		["194"] = 127,
		["195"] = 127,
		["196"] = 127,
		["197"] = 127,
		["198"] = 127,
		["201"] = 134,
		["202"] = 135,
		["203"] = 136,
		["206"] = 137,
		["208"] = 138,
		["209"] = 138,
		["210"] = 139,
		["211"] = 143,
		["212"] = 144,
		["215"] = 145,
		["216"] = 146,
		["217"] = 147,
		["218"] = 147,
		["219"] = 147,
		["220"] = 147,
		["221"] = 147,
		["222"] = 147,
		["223"] = 147,
		["224"] = 147,
		["225"] = 138,
		["229"] = 106,
		["230"] = 156,
		["231"] = 156,
		["232"] = 29,
		["233"] = 22,
		["234"] = 22,
		["235"] = 22,
		["236"] = 22,
		["237"] = 22,
		["238"] = 22,
		["239"] = 22,
		["240"] = 29,
		["242"] = 29,
	}
)
local l = {}
local m = require("lib.dota_ts_adapter")
local n = m.BaseAbility
local o = m.registerAbility
local p = require("modifiers.eom_modifier")
local q = p.EOMModifier
local r = p.registerEOMModifier
local s = { "trait_162_gold", "trait_162_health", "trait_162_abilities" }
local t = "trait_162_reward_level"
local u = "trait_162_pending_reward_count"
local function v(self, w)
	local x = PlayerResource:GetSelectedHeroEntity(w)
	local y = x and x:FindModifierByName("modifier_trait_162")
	return IsValid(y) and y or nil
end
l.trait_162 = c()
local z = l.trait_162
z.name = "trait_162"
d(z, n)
function z.prototype.GetIntrinsicModifierName(self)
	return "modifier_trait_162"
end
z = e({ o(nil) }, z)
l.trait_162 = z
l.modifier_trait_162 = c()
local A = l.modifier_trait_162
A.name = "modifier_trait_162"
d(A, q)
function A.prototype.GetAbilitySpecialValue(self)
	self.sectCount = self:GetAbilitySpecialValueFor("sect_count")
	self.maxRewardLevel = self:GetAbilitySpecialValueFor("max_reward_level")
	self.gold = self:GetAbilitySpecialValueFor("gold")
	self.health = self:GetAbilitySpecialValueFor("health")
	local B = self:GetAbilitySpecialValueFor("ability_count")
	self.abilityCount = B > 0 and B or 7
end
function A.prototype.OnCreated(self)
	if IsServer() then
		GameTimer(0, function()
			return self:CheckProgress()
		end)
	end
end
function A.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_SECT_LEVEL_UP] = { self:GetParent(), -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_ABILITY_LEARN] = { self:GetParent(), -1 },
	}
end
function A.prototype.OnSectLevelUp(self)
	self:CheckProgress()
end
function A.prototype.OnAbilityLearn(self)
	self:CheckProgress()
end
function A.prototype.CheckProgress(self)
	if not IsServer() or not IsValid(self) then
		return
	end
	local w = self:GetParent():GetPlayerOwnerID()
	local C = PlayerData:getHero(w)
	if not C then
		return
	end
	local D = f(AbilityShop.banList)
	local E = C:getAbilityData()
	local F = PlayerData:loadData(w, t)
	if F == nil then
		F = 0
	end
	local G = F
	local H = PlayerData:loadData(w, u)
	if H == nil then
		H = 0
	end
	local I = H
	while G < self.maxRewardLevel do
		local J = G + 1
		local K = #i(h(E), function(L, M)
			return not g(D, M) and E[M].level >= J
		end)
		if K < self.sectCount then
			break
		end
		G = J
		PlayerData:saveData(w, t, G)
		I = I + 1
	end
	PlayerData:saveData(w, u, I)
	self:TryShowRewardSelection(w)
end
function A.prototype.TryShowRewardSelection(self, w)
	local N = PlayerData:loadData(w, u)
	if N == nil then
		N = 0
	end
	local I = N
	if I <= 0 or j(Selection:GetSelectionData(w), function(L, E)
		return E.type == "trait_reward"
	end) then
		return
	end
	Selection:AddSpecialSelection(w, "trait_reward", s, function(L, O)
		local y = v(nil, w)
		if not y then
			return false
		end
		y:GiveReward(w, O)
		local P = PlayerData:loadData(w, u)
		if P == nil then
			P = 0
		end
		local Q = P
		PlayerData:saveData(w, u, math.max(0, Q - 1))
		GameTimer(0, function()
			local R = v(nil, w)
			return R and R:TryShowRewardSelection(w)
		end)
		return true
	end)
end
function A.prototype.GiveReward(self, w, O)
	local S = self:GetAbility()
	if not S then
		return
	end
	if O == "trait_162_gold" then
		PlayerData:modifyGold(w, self.gold)
		Notification:combatToPlayer(
			w,
			{
				message = "notify_bonus_gold",
				string_itemname_artifact = "DOTA_Tooltip_ability_" .. S:GetAbilityName(),
				int_gold = self.gold,
			}
		)
		return
	end
	if O == "trait_162_health" then
		local T = PlayerData:getplayerData(w)
		if not T then
			return
		end
		local U = T.health
		PlayerData:modifyHealth(w, self.health, true)
		local V = T.health - U
		if V > 0 then
			SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, self:GetParent(), V, self:GetParent():GetPlayerOwner())
		end
		Notification:combatToPlayer(
			w,
			{ message = "notify_bonus_hp", string_itemname_artifact = "DOTA_Tooltip_ability_" .. S:GetAbilityName(), int_hp = V }
		)
		return
	end
	if O == "trait_162_abilities" then
		local C = PlayerData:getHero(w)
		if not C then
			return
		end
		local W = {}
		do
			local X = 0
			while X < self.abilityCount do
				local Y = AbilityShop:getRandomAbility(w, 1, { isAbilityShop = false, excludedAbility = W })
				local E = Y[1]
				if not E then
					break
				end
				W[#W + 1] = E.aid
				C:learnAbility(E.aid, true)
				Notification:combatToPlayer(
					w,
					{
						message = "notify_artifact_ability_" .. E.rarity,
						string_itemname_artifact = "DOTA_Tooltip_ability_" .. S:GetAbilityName(),
						string_ability_name = "DOTA_Tooltip_ability_mechanics_" .. E.aid,
					}
				)
				X = X + 1
			end
		end
	end
end
function A.prototype.OnDestroy(self) end
A = e(
	{ r(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	A
)
l.modifier_trait_162 = A
return l