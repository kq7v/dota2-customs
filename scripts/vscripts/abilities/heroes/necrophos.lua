--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/necrophos"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = b.__TS__SourceMapTraceBack
f(
	debug.getinfo(1).short_src,
	{
		["8"] = 1,
		["9"] = 1,
		["10"] = 1,
		["11"] = 2,
		["12"] = 2,
		["13"] = 2,
		["14"] = 3,
		["15"] = 3,
		["16"] = 3,
		["17"] = 5,
		["18"] = 6,
		["19"] = 5,
		["20"] = 6,
		["21"] = 7,
		["22"] = 8,
		["23"] = 7,
		["24"] = 6,
		["25"] = 5,
		["26"] = 6,
		["28"] = 6,
		["29"] = 12,
		["30"] = 20,
		["31"] = 12,
		["32"] = 20,
		["34"] = 20,
		["35"] = 24,
		["36"] = 12,
		["37"] = 27,
		["38"] = 28,
		["39"] = 29,
		["40"] = 30,
		["41"] = 31,
		["42"] = 33,
		["43"] = 27,
		["44"] = 35,
		["45"] = 36,
		["46"] = 37,
		["47"] = 37,
		["48"] = 37,
		["49"] = 36,
		["50"] = 36,
		["51"] = 36,
		["52"] = 35,
		["53"] = 41,
		["54"] = 42,
		["55"] = 43,
		["56"] = 44,
		["58"] = 41,
		["59"] = 47,
		["60"] = 48,
		["63"] = 51,
		["66"] = 52,
		["67"] = 53,
		["68"] = 54,
		["69"] = 55,
		["70"] = 56,
		["72"] = 58,
		["73"] = 59,
		["74"] = 59,
		["75"] = 59,
		["76"] = 59,
		["77"] = 59,
		["78"] = 59,
		["79"] = 60,
		["80"] = 61,
		["81"] = 61,
		["82"] = 61,
		["83"] = 61,
		["84"] = 61,
		["85"] = 61,
		["86"] = 61,
		["87"] = 61,
		["88"] = 61,
		["90"] = 47,
		["91"] = 20,
		["92"] = 12,
		["93"] = 12,
		["94"] = 12,
		["95"] = 12,
		["96"] = 12,
		["97"] = 12,
		["98"] = 12,
		["99"] = 12,
		["100"] = 20,
		["102"] = 20,
		["104"] = 67,
		["105"] = 74,
		["106"] = 67,
		["107"] = 74,
		["108"] = 75,
		["109"] = 76,
		["110"] = 77,
		["111"] = 77,
		["112"] = 77,
		["113"] = 77,
		["114"] = 77,
		["115"] = 77,
		["116"] = 77,
		["118"] = 75,
		["119"] = 80,
		["120"] = 81,
		["121"] = 82,
		["122"] = 82,
		["123"] = 82,
		["124"] = 82,
		["125"] = 82,
		["126"] = 82,
		["127"] = 82,
		["129"] = 80,
		["130"] = 85,
		["131"] = 86,
		["132"] = 85,
		["133"] = 90,
		["134"] = 91,
		["135"] = 90,
		["136"] = 74,
		["137"] = 67,
		["138"] = 67,
		["139"] = 67,
		["140"] = 67,
		["141"] = 67,
		["142"] = 67,
		["143"] = 67,
		["144"] = 74,
		["146"] = 74,
		["148"] = 96,
		["149"] = 103,
		["150"] = 96,
		["151"] = 103,
		["152"] = 105,
		["153"] = 105,
		["154"] = 107,
		["155"] = 108,
		["156"] = 109,
		["157"] = 109,
		["158"] = 109,
		["159"] = 109,
		["160"] = 109,
		["161"] = 109,
		["162"] = 109,
		["164"] = 107,
		["165"] = 112,
		["166"] = 113,
		["167"] = 114,
		["168"] = 114,
		["169"] = 114,
		["170"] = 114,
		["171"] = 114,
		["172"] = 114,
		["173"] = 114,
		["175"] = 112,
		["176"] = 117,
		["177"] = 118,
		["178"] = 117,
		["179"] = 122,
		["180"] = 123,
		["181"] = 122,
		["182"] = 103,
		["183"] = 96,
		["184"] = 96,
		["185"] = 96,
		["186"] = 96,
		["187"] = 96,
		["188"] = 96,
		["189"] = 96,
		["190"] = 103,
		["192"] = 103,
		["193"] = 128,
		["194"] = 129,
		["195"] = 128,
		["196"] = 129,
		["197"] = 130,
		["198"] = 131,
		["199"] = 132,
		["200"] = 133,
		["203"] = 134,
		["204"] = 135,
		["205"] = 137,
		["206"] = 138,
		["207"] = 138,
		["208"] = 138,
		["209"] = 138,
		["210"] = 138,
		["211"] = 138,
		["212"] = 138,
		["213"] = 138,
		["214"] = 138,
		["215"] = 140,
		["216"] = 141,
		["217"] = 141,
		["218"] = 141,
		["219"] = 141,
		["220"] = 141,
		["221"] = 142,
		["222"] = 142,
		["223"] = 142,
		["224"] = 142,
		["225"] = 142,
		["226"] = 143,
		["227"] = 143,
		["228"] = 143,
		["229"] = 143,
		["230"] = 143,
		["231"] = 144,
		["232"] = 144,
		["233"] = 144,
		["234"] = 144,
		["235"] = 144,
		["236"] = 146,
		["237"] = 147,
		["238"] = 130,
		["239"] = 129,
		["240"] = 128,
		["241"] = 129,
		["243"] = 129,
		["245"] = 153,
		["246"] = 161,
		["247"] = 153,
		["248"] = 161,
		["249"] = 166,
		["250"] = 167,
		["251"] = 168,
		["252"] = 169,
		["253"] = 166,
		["254"] = 171,
		["255"] = 172,
		["256"] = 173,
		["257"] = 174,
		["259"] = 171,
		["260"] = 177,
		["261"] = 178,
		["262"] = 179,
		["263"] = 180,
		["264"] = 181,
		["265"] = 182,
		["266"] = 183,
		["268"] = 185,
		["269"] = 186,
		["270"] = 187,
		["271"] = 188,
		["272"] = 188,
		["273"] = 188,
		["274"] = 188,
		["275"] = 188,
		["276"] = 188,
		["278"] = 190,
		["279"] = 177,
		["280"] = 192,
		["281"] = 193,
		["282"] = 194,
		["283"] = 194,
		["284"] = 194,
		["285"] = 193,
		["286"] = 195,
		["287"] = 195,
		["288"] = 195,
		["289"] = 193,
		["290"] = 193,
		["291"] = 192,
		["292"] = 198,
		["293"] = 199,
		["294"] = 200,
		["295"] = 200,
		["296"] = 200,
		["297"] = 200,
		["298"] = 200,
		["299"] = 200,
		["300"] = 200,
		["301"] = 200,
		["302"] = 200,
		["303"] = 200,
		["304"] = 201,
		["306"] = 198,
		["307"] = 204,
		["308"] = 205,
		["309"] = 204,
		["310"] = 207,
		["311"] = 208,
		["312"] = 207,
		["313"] = 161,
		["314"] = 153,
		["315"] = 153,
		["316"] = 153,
		["317"] = 153,
		["318"] = 153,
		["319"] = 153,
		["320"] = 153,
		["321"] = 153,
		["322"] = 161,
		["324"] = 161,
		["326"] = 219,
		["327"] = 220,
		["328"] = 219,
		["329"] = 220,
		["330"] = 221,
		["331"] = 222,
		["332"] = 221,
		["333"] = 220,
		["334"] = 219,
		["335"] = 220,
		["337"] = 220,
		["338"] = 225,
		["339"] = 232,
		["340"] = 225,
		["341"] = 232,
		["342"] = 234,
		["343"] = 235,
		["344"] = 234,
		["345"] = 237,
		["346"] = 238,
		["347"] = 238,
		["348"] = 240,
		["349"] = 240,
		["350"] = 240,
		["351"] = 238,
		["352"] = 238,
		["353"] = 237,
		["354"] = 243,
		["355"] = 244,
		["356"] = 243,
		["357"] = 249,
		["358"] = 250,
		["359"] = 251,
		["360"] = 251,
		["361"] = 251,
		["363"] = 251,
		["364"] = 249,
		["365"] = 254,
		["366"] = 255,
		["367"] = 256,
		["368"] = 257,
		["369"] = 258,
		["370"] = 260,
		["371"] = 260,
		["374"] = 263,
		["375"] = 264,
		["376"] = 265,
		["377"] = 265,
		["378"] = 265,
		["379"] = 265,
		["380"] = 265,
		["381"] = 265,
		["382"] = 265,
		["384"] = 254,
		["385"] = 269,
		["386"] = 270,
		["387"] = 271,
		["389"] = 269,
		["390"] = 275,
		["391"] = 276,
		["392"] = 277,
		["394"] = 275,
		["395"] = 281,
		["396"] = 282,
		["397"] = 283,
		["399"] = 281,
		["400"] = 287,
		["401"] = 288,
		["404"] = 291,
		["407"] = 294,
		["408"] = 295,
		["409"] = 297,
		["410"] = 297,
		["413"] = 302,
		["414"] = 304,
		["415"] = 305,
		["416"] = 306,
		["417"] = 307,
		["418"] = 308,
		["420"] = 287,
		["421"] = 316,
		["422"] = 317,
		["423"] = 316,
		["424"] = 232,
		["425"] = 225,
		["426"] = 225,
		["427"] = 225,
		["428"] = 225,
		["429"] = 225,
		["430"] = 225,
		["431"] = 225,
		["432"] = 232,
		["434"] = 232,
		["436"] = 322,
		["437"] = 323,
		["438"] = 322,
		["439"] = 323,
		["440"] = 324,
		["441"] = 325,
		["442"] = 324,
		["443"] = 323,
		["444"] = 322,
		["445"] = 323,
		["447"] = 323,
		["448"] = 328,
		["449"] = 335,
		["450"] = 328,
		["451"] = 335,
		["452"] = 337,
		["453"] = 338,
		["454"] = 337,
		["455"] = 340,
		["456"] = 341,
		["457"] = 340,
		["458"] = 345,
		["459"] = 346,
		["460"] = 345,
		["461"] = 335,
		["462"] = 328,
		["463"] = 328,
		["464"] = 328,
		["465"] = 328,
		["466"] = 328,
		["467"] = 328,
		["468"] = 328,
		["469"] = 335,
		["471"] = 335,
	}
)
local g = {}
local h = require("lib.dota_ts_adapter")
local i = h.BaseAbility
local j = h.registerAbility
local k = require("modifiers.eom_modifier")
local l = k.EOMModifier
local m = k.registerEOMModifier
local n = require("abilities.ability_ai")
local o = n.BaseAbilityAI
local p = n.registerAbilityAI
g.necrophos_talent = c()
local q = g.necrophos_talent
q.name = "necrophos_talent"
d(q, i)
function q.prototype.GetIntrinsicModifierName(self)
	return "modifier_necrophos_talent"
end
q = e({ j(nil) }, q)
g.necrophos_talent = q
g.modifier_necrophos_talent = c()
local r = g.modifier_necrophos_talent
r.name = "modifier_necrophos_talent"
d(r, l)
function r.prototype.____constructor(self, ...)
	l.prototype.____constructor(self, ...)
	self.max_stacks = 0
end
function r.prototype.GetAbilitySpecialValue(self)
	self.health_reduce = self:GetAbilitySpecialValueFor("health_reduce")
	self.max_health_reduce_pct = self:GetAbilitySpecialValueFor("max_health_reduce_pct")
		+ self:GetAbilityTalentValue("necrophos_talent_3", "max_bonus")
	self.min_health_reduce = self:GetAbilitySpecialValueFor("min_health_reduce")
	self.talent_6_maxhealth_bonus_pct = self:GetAbilityTalentValue("necrophos_talent_6", "maxhealth_bonus_pct")
	self.s_count = self:GetAbilityTalentValue("necrophos_shard", "count")
end
function r.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE] = { self:GetParent(), -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_START_BEFORE] = { -1, -1 },
	}
end
function r.prototype.OnBattleStartBefore(self, s)
	local t = self:GetParent():GetEnemy()
	if IsValid(t) then
		self.max_stacks = math.floor(t:GetMaxHealth() * self.max_health_reduce_pct * 0.01)
	end
end
function r.prototype.OnCustomTakeDamage(self, s)
	if s.attacker == s.target then
		return
	end
	if self:GetCaster():PassivesDisabled() then
		return
	end
	local u = self:GetCaster()
	local v = math.max(s.damage, 0)
	local w = self.max_stacks
	if self.s_count > 0 then
		w = w + self.s_count * GetHealBonus(u)
	end
	local x = math.floor(Clamp(v * self.health_reduce * 0.01, self.min_health_reduce, w))
	s.target:AddNewModifier(
		s.attacker,
		self:GetAbility(),
		"modifier_necrophos_talent_debuff",
		{ iStackCount = x, iMax = w }
	)
	if self:HasTalent("necrophos_talent_6") then
		self:GetParent():AddNewModifier(
			u,
			self:GetAbility(),
			"modifier_necrophos_talent_6",
			{
				iStackCount = math.floor(x * self.talent_6_maxhealth_bonus_pct * 0.01),
				iMax = math.floor(w * self.talent_6_maxhealth_bonus_pct * 0.01),
			}
		)
	end
end
r = e(
	{
		m(
			a,
			{
				IsHidden = true,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				GetPriority = MODIFIER_PRIORITY_LOW,
			}
		),
	},
	r
)
g.modifier_necrophos_talent = r
g.modifier_necrophos_talent_debuff = c()
local y = g.modifier_necrophos_talent_debuff
y.name = "modifier_necrophos_talent_debuff"
d(y, l)
function y.prototype.OnCreated(self, s)
	if IsServer() then
		self:SetStackCount(math.max(0, math.min(s.iStackCount + self:GetStackCount(), s.iMax)))
	end
end
function y.prototype.OnRefresh(self, s)
	if IsServer() then
		self:SetStackCount(math.max(0, math.min(s.iStackCount + self:GetStackCount(), s.iMax)))
	end
end
function y.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH_BONUS }
end
function y.prototype.EOM_GetModifierHealthBonus(self)
	return -self:GetStackCount()
end
y = e(
	{ m(
		a,
		{ IsHidden = false, IsDebuff = true, IsPurgable = false, IsPurgeException = true, AllowIllusionDuplicate = false }
	) },
	y
)
g.modifier_necrophos_talent_debuff = y
g.modifier_necrophos_talent_6 = c()
local z = g.modifier_necrophos_talent_6
z.name = "modifier_necrophos_talent_6"
d(z, l)
function z.prototype.GetAbilitySpecialValue(self) end
function z.prototype.OnCreated(self, s)
	if IsServer() then
		self:SetStackCount(math.max(0, math.min(s.iStackCount + self:GetStackCount(), s.iMax)))
	end
end
function z.prototype.OnRefresh(self, s)
	if IsServer() then
		self:SetStackCount(math.max(0, math.min(s.iStackCount + self:GetStackCount(), s.iMax)))
	end
end
function z.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH_BONUS }
end
function z.prototype.EOM_GetModifierHealthBonus(self)
	return self:GetStackCount()
end
z = e(
	{ m(
		a,
		{ IsHidden = false, IsDebuff = false, IsPurgable = false, IsPurgeException = true, AllowIllusionDuplicate = false }
	) },
	z
)
g.modifier_necrophos_talent_6 = z
g.necrophos_ult = c()
local A = g.necrophos_ult
A.name = "necrophos_ult"
d(A, o)
function A.prototype.OnSpellStart(self)
	local B = self:GetCaster()
	local C = B:GetEnemy()
	if not IsInjurable(B, C) then
		return
	end
	B:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	C:AddNewModifier(B, self, "modifier_necrophos_ult_debuff", {})
	local D = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_necrolyte/necrolyte_scythe.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil,
		B
	)
	ParticleManager:SetParticleControlEnt(D, 0, C, PATTACH_POINT_FOLLOW, "attach_hitloc", Vector(0, 0, 0), true)
	D = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_necrolyte/necrolyte_scythe_start.vpcf",
		PATTACH_WORLDORIGIN,
		nil,
		B
	)
	ParticleManager:SetParticleControl(D, 0, B:GetAbsOrigin())
	ParticleManager:SetParticleControl(D, 1, C:GetAbsOrigin())
	ParticleManager:SetParticleControlForward(D, 0, (C:GetAbsOrigin() - B:GetAbsOrigin()):Normalized())
	ParticleManager:SetParticleControlForward(D, 1, (C:GetAbsOrigin() - B:GetAbsOrigin()):Normalized())
	B:EmitSound("Hero_Necrolyte.ReapersScythe.Cast")
	C:EmitSound("Hero_Necrolyte.ReapersScythe.Target")
end
A = e({ p(nil) }, A)
g.necrophos_ult = A
g.modifier_necrophos_ult_debuff = c()
local E = g.modifier_necrophos_ult_debuff
E.name = "modifier_necrophos_ult_debuff"
d(E, l)
function E.prototype.GetAbilitySpecialValue(self)
	self.damage = self:GetAbilitySpecialValueFor("damage") + self:GetAbilityTalentValue("necrophos_talent_1", "damage")
	self.health_damage = self:GetAbilitySpecialValueFor("health_damage")
		+ self:GetAbilityTalentValue("necrophos_talent_5", "damage_pct")
	self.duration = self:GetAbilitySpecialValueFor("duration")
end
function E.prototype.OnCreated(self, s)
	if IsServer() then
		self:StartIntervalThink(self.duration)
		self:SetDuration(self.duration + 0.1, false)
	end
end
function E.prototype.OnIntervalThink(self)
	local B = self:GetCaster()
	local F = self:GetParent()
	local G = F:FindModifierByName("modifier_necrophos_talent_debuff")
	local H = 0
	if IsValid(G) then
		H = G:GetStackCount()
	end
	if IsInjurable(F) and IsInjurable(B) then
		self.damaged = true
		local v = self.damage + self.health_damage * H * 0.01
		B:DealDamage(F, self:GetAbility(), v, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)
	end
	self:StartIntervalThink(-1)
end
function E.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE] = { -1, self:GetParent() },
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_END] = { self:GetParent(), self:GetParent() },
	}
end
function E.prototype.OnCustomTakeDamage(self, I)
	if I.ability and IsValid(I.ability) and I.ability:GetAbilityName() == "necrophos_ult" and self.damaged then
		local J = Heal
		local K = I.attacker
		local L = I.damage
		local M = self:GetAbility()
		J(K, L, M and M:GetAbilityName(), "Ability")
		self:Destroy()
	end
end
function E.prototype.OnBattleEnd(self, s)
	self:Destroy()
end
function E.prototype.CheckState(self)
	return {}
end
E = e(
	{
		m(
			a,
			{
				IsHidden = true,
				IsDebuff = true,
				IsPurgable = false,
				IsPurgeException = true,
				AllowIllusionDuplicate = false,
				GetAttributes = MODIFIER_ATTRIBUTE_MULTIPLE,
			}
		),
	},
	E
)
g.modifier_necrophos_ult_debuff = E
g.necrophos_talent_2 = c()
local N = g.necrophos_talent_2
N.name = "necrophos_talent_2"
d(N, i)
function N.prototype.GetIntrinsicModifierName(self)
	return "modifier_necrophos_talent_2"
end
N = e({ j(nil) }, N)
g.necrophos_talent_2 = N
g.modifier_necrophos_talent_2 = c()
local O = g.modifier_necrophos_talent_2
O.name = "modifier_necrophos_talent_2"
d(O, l)
function O.prototype.GetAbilitySpecialValue(self)
	self.health_regen = self:GetAbilitySpecialValueFor("health_regen")
end
function O.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_START_BEFORE] = {},
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_END] = { self:GetParent(), self:GetParent() },
	}
end
function O.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEAL_BONUS }
end
function O.prototype.LoadStack(self)
	local P = self:GetParent():GetPlayerOwnerID()
	local Q = PlayerData:loadData(P, "necrophos_talent_2")
	if Q == nil then
		Q = 0
	end
	return Q
end
function O.prototype.SyncStack(self)
	local R = self:GetParent()
	local P = R:GetPlayerOwnerID()
	local S = self:LoadStack()
	self:SetStackCount(S)
	local T = PlayerData:getHero(P)
	if R ~= (T and T.hero) then
		return
	end
	local U = PlayerData:getplayerData(P)
	if U then
		U:modifyHeroAbilityExtraData("necrophos_talent", "DOTA_Tooltip_ability_necrophos_talent_2", S, true, true)
	end
end
function O.prototype.OnCreated(self)
	if IsServer() then
		self:SyncStack()
	end
end
function O.prototype.OnRefresh(self)
	if IsServer() then
		self:SyncStack()
	end
end
function O.prototype.OnBattleStartBefore(self)
	if IsServer() then
		self:SyncStack()
	end
end
function O.prototype.OnBattleEnd(self, s)
	if not IsServer() then
		return
	end
	if s.isNeutral ~= nil then
		return
	end
	local R = self:GetParent()
	local P = R:GetPlayerOwnerID()
	local V = PlayerData:getHero(P)
	if R ~= (V and V.hero) or s.illusionPlayerID == P then
		return
	end
	if s.winPlayerID == P and self.health_regen > 0 then
		local W = self:LoadStack()
		local X = W + 1
		PlayerData:saveData(P, "necrophos_talent_2", X)
		self:SyncStack()
		print(string.format("[NecrophosTalent2] Player %d gained a victory stack: %d -> %d", P, W, X))
	end
end
function O.prototype.EOM_GetModifierHeal_Bonus(self, s)
	return self:GetStackCount() * self.health_regen
end
O = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	O
)
g.modifier_necrophos_talent_2 = O
g.necrophos_talent_4 = c()
local Y = g.necrophos_talent_4
Y.name = "necrophos_talent_4"
d(Y, i)
function Y.prototype.GetIntrinsicModifierName(self)
	return "modifier_necrophos_talent_4"
end
Y = e({ j(nil) }, Y)
g.necrophos_talent_4 = Y
g.modifier_necrophos_talent_4 = c()
local Z = g.modifier_necrophos_talent_4
Z.name = "modifier_necrophos_talent_4"
d(Z, l)
function Z.prototype.GetAbilitySpecialValue(self)
	self.mana_regen = self:GetAbilitySpecialValueFor("mana_regen")
end
function Z.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_MANA_REGEN_BONUS }
end
function Z.prototype.EOM_GetModifierManaRegenBonus(self, s)
	return self.mana_regen
end
Z = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	Z
)
g.modifier_necrophos_talent_4 = Z
return g