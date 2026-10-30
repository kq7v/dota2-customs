--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/bristleback"
local b = require("lualib_bundle")
local c = b.__TS__Class
local d = b.__TS__ClassExtends
local e = b.__TS__DecorateLegacy
local f = b.__TS__ArrayForEach
local g = b.__TS__SourceMapTraceBack
g(
	debug.getinfo(1).short_src,
	{
		["9"] = 1,
		["10"] = 1,
		["11"] = 1,
		["12"] = 2,
		["13"] = 2,
		["14"] = 2,
		["15"] = 3,
		["16"] = 3,
		["17"] = 3,
		["18"] = 3,
		["19"] = 3,
		["21"] = 6,
		["22"] = 7,
		["23"] = 6,
		["24"] = 7,
		["25"] = 8,
		["26"] = 9,
		["27"] = 8,
		["28"] = 7,
		["29"] = 6,
		["30"] = 7,
		["32"] = 7,
		["33"] = 12,
		["34"] = 20,
		["35"] = 12,
		["36"] = 20,
		["38"] = 20,
		["39"] = 25,
		["40"] = 12,
		["41"] = 26,
		["42"] = 27,
		["43"] = 26,
		["44"] = 29,
		["45"] = 30,
		["46"] = 35,
		["47"] = 29,
		["48"] = 37,
		["49"] = 38,
		["50"] = 39,
		["51"] = 40,
		["52"] = 40,
		["53"] = 40,
		["54"] = 40,
		["55"] = 40,
		["56"] = 40,
		["58"] = 37,
		["59"] = 43,
		["60"] = 44,
		["61"] = 45,
		["62"] = 46,
		["63"] = 47,
		["64"] = 48,
		["65"] = 48,
		["66"] = 48,
		["67"] = 48,
		["68"] = 48,
		["69"] = 48,
		["70"] = 48,
		["71"] = 48,
		["72"] = 48,
		["73"] = 49,
		["74"] = 49,
		["75"] = 49,
		["76"] = 49,
		["77"] = 49,
		["78"] = 49,
		["79"] = 49,
		["80"] = 49,
		["81"] = 49,
		["82"] = 50,
		["83"] = 50,
		["84"] = 51,
		["85"] = 51,
		["86"] = 52,
		["87"] = 52,
		["90"] = 43,
		["91"] = 56,
		["92"] = 57,
		["93"] = 58,
		["94"] = 59,
		["95"] = 59,
		["96"] = 59,
		["97"] = 59,
		["100"] = 56,
		["101"] = 63,
		["102"] = 64,
		["103"] = 63,
		["104"] = 68,
		["105"] = 69,
		["106"] = 70,
		["107"] = 70,
		["108"] = 70,
		["109"] = 70,
		["111"] = 72,
		["112"] = 73,
		["113"] = 74,
		["114"] = 75,
		["115"] = 76,
		["116"] = 77,
		["118"] = 79,
		["119"] = 80,
		["120"] = 82,
		["123"] = 85,
		["124"] = 68,
		["125"] = 88,
		["126"] = 89,
		["127"] = 88,
		["128"] = 96,
		["129"] = 97,
		["130"] = 96,
		["131"] = 100,
		["132"] = 101,
		["133"] = 102,
		["134"] = 103,
		["135"] = 103,
		["136"] = 103,
		["137"] = 103,
		["138"] = 103,
		["139"] = 103,
		["141"] = 100,
		["142"] = 115,
		["143"] = 116,
		["144"] = 115,
		["145"] = 20,
		["146"] = 12,
		["147"] = 12,
		["148"] = 12,
		["149"] = 12,
		["150"] = 12,
		["151"] = 12,
		["152"] = 12,
		["153"] = 12,
		["154"] = 20,
		["156"] = 20,
		["157"] = 120,
		["158"] = 129,
		["159"] = 120,
		["160"] = 129,
		["161"] = 133,
		["162"] = 134,
		["163"] = 133,
		["164"] = 136,
		["165"] = 137,
		["166"] = 138,
		["167"] = 140,
		["168"] = 136,
		["169"] = 142,
		["170"] = 143,
		["171"] = 144,
		["173"] = 142,
		["174"] = 147,
		["175"] = 148,
		["176"] = 149,
		["178"] = 147,
		["179"] = 152,
		["180"] = 153,
		["181"] = 152,
		["182"] = 159,
		["183"] = 160,
		["186"] = 161,
		["187"] = 159,
		["188"] = 163,
		["189"] = 164,
		["192"] = 165,
		["193"] = 163,
		["194"] = 129,
		["195"] = 120,
		["196"] = 120,
		["197"] = 120,
		["198"] = 120,
		["199"] = 120,
		["200"] = 120,
		["201"] = 120,
		["202"] = 120,
		["203"] = 120,
		["204"] = 129,
		["206"] = 129,
		["207"] = 171,
		["208"] = 172,
		["209"] = 171,
		["210"] = 172,
		["211"] = 173,
		["212"] = 174,
		["213"] = 175,
		["214"] = 176,
		["215"] = 177,
		["216"] = 177,
		["217"] = 177,
		["218"] = 178,
		["219"] = 179,
		["220"] = 181,
		["221"] = 182,
		["222"] = 183,
		["223"] = 184,
		["226"] = 187,
		["227"] = 188,
		["228"] = 189,
		["230"] = 191,
		["231"] = 191,
		["232"] = 191,
		["233"] = 191,
		["234"] = 191,
		["235"] = 191,
		["236"] = 197,
		["237"] = 198,
		["238"] = 199,
		["239"] = 200,
		["240"] = 200,
		["241"] = 200,
		["242"] = 200,
		["243"] = 200,
		["244"] = 200,
		["246"] = 191,
		["247"] = 191,
		["249"] = 177,
		["250"] = 177,
		["251"] = 173,
		["252"] = 172,
		["253"] = 171,
		["254"] = 172,
		["256"] = 172,
		["257"] = 210,
		["258"] = 219,
		["259"] = 210,
		["260"] = 219,
		["261"] = 222,
		["262"] = 223,
		["263"] = 222,
		["264"] = 225,
		["265"] = 226,
		["266"] = 227,
		["267"] = 229,
		["268"] = 230,
		["269"] = 231,
		["270"] = 232,
		["271"] = 233,
		["273"] = 235,
		["274"] = 225,
		["275"] = 237,
		["276"] = 238,
		["277"] = 239,
		["279"] = 241,
		["280"] = 241,
		["281"] = 241,
		["282"] = 241,
		["283"] = 241,
		["284"] = 241,
		["285"] = 242,
		["286"] = 242,
		["287"] = 242,
		["288"] = 242,
		["289"] = 242,
		["290"] = 242,
		["291"] = 242,
		["292"] = 242,
		["294"] = 237,
		["295"] = 245,
		["296"] = 246,
		["297"] = 247,
		["299"] = 245,
		["300"] = 250,
		["301"] = 251,
		["302"] = 250,
		["303"] = 256,
		["304"] = 257,
		["305"] = 256,
		["306"] = 259,
		["307"] = 260,
		["308"] = 259,
		["309"] = 219,
		["310"] = 210,
		["311"] = 210,
		["312"] = 210,
		["313"] = 210,
		["314"] = 210,
		["315"] = 210,
		["316"] = 210,
		["317"] = 210,
		["318"] = 210,
		["319"] = 219,
		["321"] = 219,
		["323"] = 266,
		["324"] = 267,
		["325"] = 266,
		["326"] = 267,
		["327"] = 268,
		["328"] = 269,
		["329"] = 268,
		["330"] = 267,
		["331"] = 266,
		["332"] = 267,
		["334"] = 267,
		["335"] = 272,
		["336"] = 280,
		["337"] = 272,
		["338"] = 280,
		["339"] = 281,
		["340"] = 282,
		["341"] = 281,
		["342"] = 286,
		["343"] = 287,
		["344"] = 288,
		["345"] = 288,
		["346"] = 288,
		["347"] = 288,
		["348"] = 288,
		["349"] = 288,
		["351"] = 286,
		["352"] = 291,
		["353"] = 292,
		["354"] = 291,
		["355"] = 280,
		["356"] = 272,
		["357"] = 272,
		["358"] = 272,
		["359"] = 272,
		["360"] = 272,
		["361"] = 272,
		["362"] = 272,
		["363"] = 272,
		["364"] = 280,
		["366"] = 280,
		["367"] = 296,
		["368"] = 304,
		["369"] = 296,
		["370"] = 304,
		["372"] = 304,
		["373"] = 307,
		["374"] = 308,
		["375"] = 309,
		["376"] = 296,
		["377"] = 310,
		["378"] = 311,
		["379"] = 313,
		["380"] = 310,
		["381"] = 315,
		["382"] = 316,
		["383"] = 317,
		["384"] = 318,
		["385"] = 319,
		["387"] = 315,
		["388"] = 322,
		["389"] = 323,
		["390"] = 324,
		["392"] = 322,
		["393"] = 327,
		["394"] = 328,
		["395"] = 329,
		["396"] = 329,
		["397"] = 329,
		["398"] = 328,
		["399"] = 330,
		["400"] = 330,
		["401"] = 330,
		["402"] = 328,
		["403"] = 328,
		["404"] = 327,
		["405"] = 333,
		["406"] = 335,
		["407"] = 336,
		["408"] = 337,
		["409"] = 337,
		["410"] = 337,
		["411"] = 337,
		["412"] = 337,
		["413"] = 338,
		["414"] = 338,
		["415"] = 338,
		["416"] = 338,
		["417"] = 338,
		["418"] = 338,
		["419"] = 339,
		["420"] = 339,
		["421"] = 339,
		["422"] = 339,
		["423"] = 339,
		["424"] = 339,
		["425"] = 339,
		["426"] = 339,
		["427"] = 339,
		["428"] = 340,
		["430"] = 342,
		["431"] = 343,
		["432"] = 344,
		["433"] = 345,
		["436"] = 346,
		["437"] = 347,
		["438"] = 348,
		["441"] = 333,
		["442"] = 352,
		["443"] = 353,
		["444"] = 352,
		["445"] = 355,
		["446"] = 356,
		["447"] = 355,
		["448"] = 304,
		["449"] = 296,
		["450"] = 296,
		["451"] = 296,
		["452"] = 296,
		["453"] = 296,
		["454"] = 296,
		["455"] = 296,
		["456"] = 296,
		["457"] = 304,
		["459"] = 304,
		["460"] = 363,
		["461"] = 364,
		["462"] = 363,
		["463"] = 364,
		["464"] = 365,
		["465"] = 366,
		["466"] = 367,
		["467"] = 368,
		["470"] = 371,
		["471"] = 373,
		["472"] = 374,
		["473"] = 375,
		["474"] = 376,
		["475"] = 377,
		["476"] = 378,
		["477"] = 378,
		["478"] = 378,
		["479"] = 378,
		["480"] = 379,
		["481"] = 380,
		["482"] = 381,
		["483"] = 382,
		["484"] = 383,
		["485"] = 384,
		["486"] = 385,
		["488"] = 378,
		["489"] = 378,
		["490"] = 365,
		["491"] = 390,
		["492"] = 391,
		["493"] = 392,
		["494"] = 393,
		["495"] = 394,
		["496"] = 395,
		["497"] = 396,
		["498"] = 397,
		["499"] = 398,
		["500"] = 398,
		["501"] = 398,
		["502"] = 399,
		["503"] = 400,
		["505"] = 398,
		["506"] = 398,
		["507"] = 403,
		["508"] = 404,
		["509"] = 404,
		["510"] = 404,
		["511"] = 405,
		["512"] = 406,
		["514"] = 404,
		["515"] = 404,
		["519"] = 390,
		["520"] = 364,
		["521"] = 363,
		["522"] = 364,
		["524"] = 364,
		["525"] = 414,
		["526"] = 424,
		["527"] = 414,
		["528"] = 424,
		["529"] = 425,
		["530"] = 426,
		["531"] = 425,
		["532"] = 428,
		["533"] = 429,
		["534"] = 430,
		["536"] = 428,
		["537"] = 433,
		["538"] = 434,
		["539"] = 435,
		["541"] = 433,
		["542"] = 424,
		["543"] = 414,
		["544"] = 414,
		["545"] = 414,
		["546"] = 414,
		["547"] = 414,
		["548"] = 414,
		["549"] = 414,
		["550"] = 414,
		["551"] = 414,
		["552"] = 414,
		["553"] = 424,
		["555"] = 424,
		["556"] = 442,
		["557"] = 451,
		["558"] = 442,
		["559"] = 451,
		["560"] = 452,
		["561"] = 453,
		["562"] = 454,
		["563"] = 455,
		["564"] = 456,
		["565"] = 457,
		["566"] = 458,
		["567"] = 459,
		["569"] = 461,
		["572"] = 452,
		["573"] = 451,
		["574"] = 442,
		["575"] = 442,
		["576"] = 442,
		["577"] = 442,
		["578"] = 442,
		["579"] = 442,
		["580"] = 442,
		["581"] = 442,
		["582"] = 451,
		["584"] = 451,
		["585"] = 466,
		["586"] = 474,
		["587"] = 466,
		["588"] = 474,
		["590"] = 474,
		["591"] = 475,
		["592"] = 466,
		["593"] = 477,
		["594"] = 478,
		["595"] = 479,
		["596"] = 480,
		["598"] = 477,
		["599"] = 483,
		["600"] = 484,
		["601"] = 483,
		["602"] = 489,
		["603"] = 490,
		["604"] = 491,
		["605"] = 492,
		["606"] = 493,
		["607"] = 494,
		["609"] = 496,
		["611"] = 489,
		["612"] = 499,
		["613"] = 500,
		["614"] = 501,
		["615"] = 503,
		["617"] = 499,
		["618"] = 506,
		["619"] = 507,
		["622"] = 508,
		["623"] = 509,
		["624"] = 510,
		["627"] = 511,
		["628"] = 512,
		["629"] = 513,
		["630"] = 514,
		["631"] = 515,
		["632"] = 516,
		["633"] = 517,
		["634"] = 506,
		["635"] = 519,
		["636"] = 520,
		["637"] = 519,
		["638"] = 527,
		["639"] = 528,
		["640"] = 527,
		["641"] = 530,
		["642"] = 531,
		["643"] = 530,
		["644"] = 533,
		["645"] = 534,
		["646"] = 535,
		["648"] = 533,
		["649"] = 538,
		["650"] = 539,
		["651"] = 540,
		["653"] = 538,
		["654"] = 543,
		["655"] = 544,
		["656"] = 543,
		["657"] = 474,
		["658"] = 466,
		["659"] = 466,
		["660"] = 466,
		["661"] = 466,
		["662"] = 466,
		["663"] = 466,
		["664"] = 466,
		["665"] = 466,
		["666"] = 474,
		["668"] = 474,
		["669"] = 549,
		["670"] = 557,
		["671"] = 549,
		["672"] = 557,
		["673"] = 560,
		["674"] = 561,
		["675"] = 561,
		["676"] = 561,
		["677"] = 561,
		["678"] = 562,
		["679"] = 563,
		["680"] = 560,
		["681"] = 565,
		["682"] = 566,
		["683"] = 565,
		["684"] = 570,
		["685"] = 571,
		["686"] = 570,
		["687"] = 574,
		["688"] = 575,
		["689"] = 574,
		["690"] = 579,
		["691"] = 580,
		["692"] = 579,
		["693"] = 557,
		["694"] = 549,
		["695"] = 549,
		["696"] = 549,
		["697"] = 549,
		["698"] = 549,
		["699"] = 549,
		["700"] = 549,
		["701"] = 549,
		["702"] = 557,
		["704"] = 557,
		["706"] = 586,
		["707"] = 587,
		["708"] = 586,
		["709"] = 587,
		["710"] = 588,
		["711"] = 589,
		["712"] = 588,
		["713"] = 587,
		["714"] = 586,
		["715"] = 587,
		["717"] = 587,
		["718"] = 601,
		["719"] = 609,
		["720"] = 601,
		["721"] = 609,
		["722"] = 612,
		["723"] = 613,
		["724"] = 612,
		["725"] = 616,
		["726"] = 617,
		["727"] = 616,
		["728"] = 622,
		["729"] = 623,
		["730"] = 622,
		["731"] = 609,
		["732"] = 601,
		["733"] = 601,
		["734"] = 601,
		["735"] = 601,
		["736"] = 601,
		["737"] = 601,
		["738"] = 601,
		["739"] = 601,
		["740"] = 609,
		["742"] = 609,
	}
)
local h = {}
local i = require("lib.dota_ts_adapter")
local j = i.BaseAbility
local k = i.registerAbility
local l = require("modifiers.eom_modifier")
local m = l.EOMModifier
local n = l.registerEOMModifier
local o = require("abilities.interact_ability")
local p = o.InteractAbility
local q = o.InteractBaseAbility
local r = o.registerInteractAbility
local s = o.registerInteractBaseAbility
h.bristleback_talent = c()
local t = h.bristleback_talent
t.name = "bristleback_talent"
d(t, q)
function t.prototype.GetIntrinsicModifierName(self)
	return "modifier_bristleback_talent"
end
t = e({ s(nil) }, t)
h.bristleback_talent = t
h.modifier_bristleback_talent = c()
local u = h.modifier_bristleback_talent
u.name = "modifier_bristleback_talent"
d(u, m)
function u.prototype.____constructor(self, ...)
	m.prototype.____constructor(self, ...)
	self.warpath_ptcl = {}
end
function u.prototype.GetTexture(self)
	return "bristleback_warpath"
end
function u.prototype.GetAbilitySpecialValue(self)
	self.duration = self:GetAbilitySpecialValueFor("duration")
	self.s_enable = self:HasTalent("bristleback_shard")
end
function u.prototype.OnCreated(self, v)
	if IsServer() then
		local w = self:GetParent()
		w:AddNewModifier(w, self:GetAbility(), "modifier_bristleback_talent_buff", { duration = self.duration })
	end
end
function u.prototype.OnStackCountChanged(self, x)
	if IsServer() then
		if #self.warpath_ptcl == 0 and self:GetStackCount() > 0 then
			local y = self:GetParent()
			local z = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_bristleback/bristleback_warpath.vpcf",
				PATTACH_CUSTOMORIGIN,
				y
			)
			ParticleManager:SetParticleControlEnt(z, 3, y, PATTACH_POINT_FOLLOW, "attach_attack2", vec3_zero, true)
			ParticleManager:SetParticleControlEnt(z, 4, y, PATTACH_POINT_FOLLOW, "attach_attack1", vec3_zero, true)
			local A = self.warpath_ptcl
			A[#A + 1] = z
			local B = self.warpath_ptcl
			B[#B + 1] = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_bristleback/bristleback_warpath_active.vpcf",
				PATTACH_CUSTOMORIGIN,
				y
			)
			local C = self.warpath_ptcl
			C[#C + 1] = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_bristleback/bristleback_warpath_dust.vpcf",
				PATTACH_CUSTOMORIGIN,
				y
			)
		end
	end
end
function u.prototype.OnDestroy(self)
	if IsServer() then
		if #self.warpath_ptcl > 0 then
			f(self.warpath_ptcl, function(D, E)
				return ParticleManager:DestroyParticle(E, false)
			end)
		end
	end
end
function u.prototype.EDeclareEvents(self)
	return { [EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_START_BEFORE] = { -1, -1 } }
end
function u.prototype.OnBattleStartBefore(self, v)
	if #self.warpath_ptcl > 0 then
		f(self.warpath_ptcl, function(D, E)
			return ParticleManager:DestroyParticle(E, false)
		end)
	end
	self.warpath_ptcl = {}
	if self.s_enable then
		local y = self:GetParent()
		local F = y:FindAbilityByName("bristleback_ult")
		if IsValid(F) then
			F:OnSpellStart()
		end
		local G = y:FindAbilityByName("bristleback_ult_s")
		if IsValid(G) then
			G:OnSpellStart(true)
		end
	end
	self:SetStackCount(0)
end
function u.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_MANA_LOSS_PERCENTAGE }
end
function u.prototype.EOM_GetModifierManaLossPercentage(self, v)
	return 0
end
function u.prototype.AddPassiveStack(self)
	if self:IsActivated() then
		local w = self:GetParent()
		w:AddNewModifier(w, self:GetAbility(), "modifier_bristleback_talent_buff", { duration = self.duration })
	end
end
function u.prototype.IsActivated(self)
	return self:GetAbility():GetToggleState()
end
u = e(
	{
		n(
			a,
			{
				IsHidden = false,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				GetPriority = MODIFIER_PRIORITY_LOW,
			}
		),
	},
	u
)
h.modifier_bristleback_talent = u
h.modifier_bristleback_talent_buff = c()
local H = h.modifier_bristleback_talent_buff
H.name = "modifier_bristleback_talent_buff"
d(H, m)
function H.prototype.GetTexture(self)
	return "bristleback_warpath"
end
function H.prototype.GetAbilitySpecialValue(self)
	self.max_stack = self:GetAbilitySpecialValueFor("max_stack")
	self.attack_bonus = self:GetAbilitySpecialValueFor("attack_bonus")
		+ self:GetAbilityTalentValue("bristleback_talent_3", "bonus_attack")
	self.tl3_bonus_as = self:GetAbilityTalentValue("bristleback_talent_3", "bonus_as")
end
function H.prototype.OnCreated(self, v)
	if IsServer() then
		self:IncrementStackCount()
	end
end
function H.prototype.OnRefresh(self, v)
	if IsServer() and self:GetStackCount() < self.max_stack then
		self:IncrementStackCount()
	end
end
function H.prototype.EDeclareFunctions(self)
	return {
		EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK_DAMAGE_BONUS,
		EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACKSPEED_BONUS,
	}
end
function H.prototype.EOM_GetModifierAttackDamageBonus(self)
	if self:GetParent():PassivesDisabled() then
		return
	end
	return self:GetStackCount() * self.attack_bonus
end
function H.prototype.EOM_GetModifierAttackSpeedBonus(self, v)
	if self:GetParent():PassivesDisabled() then
		return
	end
	return self:GetStackCount() * self.tl3_bonus_as
end
H = e(
	{
		n(
			a,
			{
				IsHidden = false,
				IsDebuff = false,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				GetPriority = MODIFIER_PRIORITY_LOW,
				IsIndependent = true,
			}
		),
	},
	H
)
h.modifier_bristleback_talent_buff = H
h.bristleback_ult = c()
local I = h.bristleback_ult
I.name = "bristleback_ult"
d(I, q)
function I.prototype.OnSpellStart(self)
	local w = self:GetCaster()
	local J = w:GetEnemy()
	w:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	self:GameTimer(0.3, function()
		if IsInjurable(w, J) then
			w:EmitSound("Hero_Bristleback.ViscousGoo.Cast")
			if self:HasTalent("bristleback_talent_5") then
				local K = w:FindAbilityByName("bristleback_ult_s")
				if IsValid(K) then
					K:OnSpellStart()
				end
			end
			local L = w:FindModifierByName("modifier_bristleback_talent")
			if IsValid(L) then
				L:AddPassiveStack()
			end
			Projectile:CreateTrackingProjectile({
				EffectName = "particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo.vpcf",
				hCaster = w,
				vSpawnOrigin = w:GetAttachmentPosition("attach_attack3"),
				hTarget = J,
				iMoveSpeed = PROJECTILE_SPEED_NORMAL,
				OnProjectileHit = function(M, N, O)
					if IsInjurable(w, J) and IsValid(self) then
						J:EmitSound("Hero_Bristleback.ViscousGoo.Target")
						J:AddNewModifier(
							w,
							self,
							"modifier_bristleback_ult",
							{ duration = self:GetSpecialValueFor("duration") }
						)
					end
				end,
			})
		end
	end)
end
I = e({ s(nil) }, I)
h.bristleback_ult = I
h.modifier_bristleback_ult = c()
local P = h.modifier_bristleback_ult
P.name = "modifier_bristleback_ult"
d(P, m)
function P.prototype.GetTexture(self)
	return "bristleback_viscous_nasal_goo"
end
function P.prototype.GetAbilitySpecialValue(self)
	self.injury_count = self:GetAbilitySpecialValueFor("injury_count")
	self.as_pct_reduce = self:GetAbilitySpecialValueFor("as_pct_reduce")
	local Q = self:GetAbilityTalentValue("bristleback_talent_1", "injury_count")
	local R = self:GetAbilityTalentValue("bristleback_talent_1", "bonus_pct")
	if R > 0 then
		self.injury_count = self.injury_count * (1 + R * 0.01)
		self.as_pct_reduce = self.as_pct_reduce * (1 + R * 0.01)
	end
	self.injury_count = self.injury_count + Q
end
function P.prototype.OnCreated(self, v)
	if IsServer() then
		self:IncrementStackCount()
	else
		local S = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_bristleback/bristleback_viscous_nasal_goo_debuff.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self:GetParent(),
			self:GetCaster()
		)
		self:AddParticle(S, false, false, -1, false, false)
	end
end
function P.prototype.OnRefresh(self, v)
	if IsServer() then
		self:IncrementStackCount()
	end
end
function P.prototype.EDeclareFunctions(self)
	return {
		EOMModifierFunction.EOM_MODIFIER_PROPERTY_INJURY_PERMANENT,
		EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACKSPEED_TOTAL_PERCENTAGE,
	}
end
function P.prototype.EOM_GetModifierInjuryPermanent(self, v)
	return self.injury_count * self:GetStackCount()
end
function P.prototype.EOM_GetModifierAttackSpeedTotalPercentage(self, v)
	return -self.as_pct_reduce * self:GetStackCount()
end
P = e(
	{
		n(
			a,
			{
				IsHidden = false,
				IsDebuff = true,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				GetPriority = MODIFIER_PRIORITY_LOW,
				IsIndependent = true,
			}
		),
	},
	P
)
h.modifier_bristleback_ult = P
h.bristleback_talent_s = c()
local T = h.bristleback_talent_s
T.name = "bristleback_talent_s"
d(T, q)
function T.prototype.GetIntrinsicModifierName(self)
	return "modifier_bristleback_talent_s"
end
T = e({ s(nil) }, T)
h.bristleback_talent_s = T
h.modifier_bristleback_talent_s = c()
local U = h.modifier_bristleback_talent_s
U.name = "modifier_bristleback_talent_s"
d(U, m)
function U.prototype.EDeclareEvents(self)
	return { [EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_START_BEFORE] = { -1, -1 } }
end
function U.prototype.OnBattleStartBefore(self, v)
	if self:IsActivated() then
		self:GetParent()
			:AddNewModifier(self:GetParent(), self:GetAbility(), "modifier_bristleback_talent_s_effect", nil)
	end
end
function U.prototype.IsActivated(self)
	return self:GetAbility():GetToggleState()
end
U = e(
	{
		n(
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
	U
)
h.modifier_bristleback_talent_s = U
h.modifier_bristleback_talent_s_effect = c()
local V = h.modifier_bristleback_talent_s_effect
V.name = "modifier_bristleback_talent_s_effect"
d(V, m)
function V.prototype.____constructor(self, ...)
	m.prototype.____constructor(self, ...)
	self.record = 0
	self.cal_threshold = 0
	self.ptclTimer = 0
end
function V.prototype.GetAbilitySpecialValue(self)
	self.damage_reduce = self:GetAbilitySpecialValueFor("damage_reduce")
	self.threshold = self:GetAbilitySpecialValueFor("threshold")
		- self:GetAbilityTalentValue("bristleback_talent_4", "threshold_reduce")
end
function V.prototype.OnCreated(self, v)
	if IsServer() then
		self.record = 0
		self:OnIntervalThink()
		self:StartIntervalThink(1)
	end
end
function V.prototype.OnIntervalThink(self)
	if IsServer() then
		self.cal_threshold = self:GetParent():GetMaxHealth() * self.threshold * 0.01
	end
end
function V.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE] = { -1, self:GetParent() },
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_END] = { self:GetParent(), self:GetParent() },
	}
end
function V.prototype.OnCustomTakeDamage(self, W)
	self.record = self.record + W.damage
	if GameRules:GetGameTime() - self.ptclTimer >= 0.2 then
		local S = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_bristleback/bristleback_back_dmg.vpcf",
			PATTACH_CUSTOMORIGIN,
			self:GetParent()
		)
		ParticleManager:SetParticleControlTransform(
			S,
			0,
			self:GetParent():GetAbsOrigin(),
			VectorAngles(self:GetParent():GetForwardVector() * -1)
		)
		ParticleManager:SetParticleControlEnt(
			S,
			1,
			self:GetParent(),
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self:GetParent():GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(S)
	end
	W.target:EmitSound("Hero_Bristleback.Bristleback")
	if self.record >= self.cal_threshold then
		self.record = self.record - self.cal_threshold
		if self:GetParent():PassivesDisabled() then
			return
		end
		local X = self:GetParent():FindAbilityByName("bristleback_ult_s")
		if IsValid(X) then
			X:OnSpellStart()
		end
	end
end
function V.prototype.OnBattleEnd(self, v)
	self:Destroy()
end
function V.prototype.EFunctionValues(self)
	return {
		[EOMModifierFunction.EOM_MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE] = self:GetParent():PassivesDisabled()
				and 0
			or -self.damage_reduce,
	}
end
V = e(
	{
		n(
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
	V
)
h.modifier_bristleback_talent_s_effect = V
h.bristleback_ult_s = c()
local Y = h.bristleback_ult_s
Y.name = "bristleback_ult_s"
d(Y, q)
function Y.prototype.OnSpellStart(self, Z)
	local w = self:GetCaster()
	local J = w:GetEnemy()
	if not IsInjurable(w, J) then
		return
	end
	local _ = 1
	self:Talent6Effect(Z)
	w:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	local a0 = self:GetSpecialValueFor("bonus_damage")
	local a1 = self:GetSpecialValueFor("damage")
	w:EmitSound("Hero_Bristleback.QuillSpray.Cast")
	ForWithInterval(0.1, _, function()
		if IsInjurable(w, J) then
			J:EmitSound("Hero_Bristleback.QuillSpray.Target")
			local S = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_bristleback/bristleback_quill_spray.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				w
			)
			ParticleManager:ReleaseParticleIndex(S)
			local a2 = a1 + J:GetModifierStackCount("modifier_bristleback_ult_s_debuff", w) * a0
			w:DealDamage(J, self, a2, EOM_DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL)
			J:AddNewModifier(w, self, "modifier_bristleback_ult_s_debuff", nil)
		end
	end)
end
function Y.prototype.Talent6Effect(self, Z)
	if not Z then
		local a3 = self:GetTalentValue("bristleback_talent_6", "sect_level")
		local a4 = self:GetTalentValue("bristleback_talent_6", "extra_trigger_pct")
		if a3 > 0 then
			local a5 = AbilityShop.pickList
			local a6 = 0
			local a7 = PlayerData:getHero(self:GetCaster():GetPlayerOwnerID())
			f(a5, function(D, a8)
				if a7:GetSectLevel(a8) >= a3 then
					a6 = a6 + 1
				end
			end)
			if self:PRD(a4 * a6, "extra_trigger_pct") then
				GameTimer(0.5, function()
					if self then
						self:OnSpellStart(true)
					end
				end)
			end
		end
	end
end
Y = e({ s(nil) }, Y)
h.bristleback_ult_s = Y
h.modifier_bristleback_ult_s_debuff = c()
local a9 = h.modifier_bristleback_ult_s_debuff
a9.name = "modifier_bristleback_ult_s_debuff"
d(a9, m)
function a9.prototype.GetTexture(self)
	return "bristleback_quill_spray"
end
function a9.prototype.OnCreated(self, v)
	if IsServer() then
		self:IncrementStackCount()
	end
end
function a9.prototype.OnRefresh(self, v)
	if IsServer() then
		self:IncrementStackCount()
	end
end
a9 = e(
	{
		n(
			a,
			{
				IsHidden = false,
				IsDebuff = true,
				IsPurgable = false,
				IsPurgeException = false,
				AllowIllusionDuplicate = false,
				GetPriority = MODIFIER_PRIORITY_LOW,
				GetEffectName = "particles/units/heroes/hero_bristleback/bristleback_quill_spray_hit_creep.vpcf",
				GetEffectAttachType = PATTACH_ABSORIGIN_FOLLOW,
			}
		),
	},
	a9
)
h.modifier_bristleback_ult_s_debuff = a9
h.bristleback_interact = c()
local aa = h.bristleback_interact
aa.name = "bristleback_interact"
d(aa, p)
function aa.prototype.OnToggle(self)
	if IsServer() then
		local w = self:GetCaster()
		local ab = self:GetToggleState()
		w:RemoveModifierByName("modifier_bristleback_interact_inactive")
		w:RemoveModifierByName("modifier_bristleback_interact_active")
		if ab then
			w:AddNewModifier(w, self, "modifier_bristleback_interact_active", nil)
		else
			w:AddNewModifier(w, self, "modifier_bristleback_interact_inactive", nil)
		end
	end
end
aa = e(
	{
		r(
			nil,
			{
				ActiveTextureName = "bristleback/bb_2022_immortal_ability_icon/bb_2022_immortal_warpath",
				InactiveTextureName = "bristleback/bb_2022_immortal_ability_icon/bb_2022_immortal_bristleback",
				talent_ability1 = "bristleback_talent",
				talent_ability2 = "bristleback_talent_s",
				ult_ability1 = "bristleback_ult",
				ult_ability2 = "bristleback_ult_s",
			}
		),
	},
	aa
)
h.bristleback_interact = aa
h.modifier_bristleback_interact_active = c()
local ac = h.modifier_bristleback_interact_active
ac.name = "modifier_bristleback_interact_active"
d(ac, m)
function ac.prototype.____constructor(self, ...)
	m.prototype.____constructor(self, ...)
	self.state = false
end
function ac.prototype.OnIntervalThink(self)
	if IsServer() then
		self:StartIntervalThink(-1)
		self:TurnBack()
	end
end
function ac.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_CONFIRM_BATTLE] = { -1, -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_START_BEFORE] = { -1, -1 },
	}
end
function ac.prototype.OnConfirmBattle(self, v)
	local ad = GameState:getStateStartEndGameTime()[2]
	local ae = 0.5
	local af = ad - GameRules:GetGameTime()
	if af > ae then
		self:StartIntervalThink(af - ae)
	else
		self:TurnBack()
	end
end
function ac.prototype.OnBattleStartBefore(self, v)
	self:SetStackCount(1)
	if self.targetPos then
		self:GetParent():SetAbsOrigin(self.targetPos)
	end
end
function ac.prototype.TurnBack(self)
	if self.state then
		return
	end
	local y = self:GetParent()
	local J = y:GetEnemy()
	if not IsInjurable(y, J) then
		return
	end
	local ag = y:GetAbsOrigin() - J:GetAbsOrigin()
	ag.z = 0
	ag = ag:Normalized()
	y:EmitSound("Hero_Bristleback.Bristleback.Active")
	y:StartGesture(ACT_DOTA_CAST_ABILITY_3)
	self.targetPos = y:GetAbsOrigin()
	y:MoveToPosition(self.targetPos + ag)
end
function ac.prototype.DeclareFunctions(self)
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE,
	}
end
function ac.prototype.GetModifierDisableTurning(self)
	return self:GetStackCount()
end
function ac.prototype.GetModifierIgnoreCastAngle(self)
	return self:GetStackCount()
end
function ac.prototype.GetActivityTranslationModifiers(self)
	if self:GetStackCount() > 0 then
		return "bristleback"
	end
end
function ac.prototype.GetModifierTurnRate_Percentage(self)
	if self:GetStackCount() > 0 then
		return -100
	end
end
function ac.prototype.CheckState(self)
	return { [MODIFIER_STATE_DISARMED] = true }
end
ac = e(
	{
		n(
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
	ac
)
h.modifier_bristleback_interact_active = ac
h.modifier_bristleback_interact_inactive = c()
local ah = h.modifier_bristleback_interact_inactive
ah.name = "modifier_bristleback_interact_inactive"
d(ah, m)
function ah.prototype.GetAbilitySpecialValue(self)
	self.mana = math.max(10, self:GetAbilitySpecialValueFor("mana"))
	self.loss_mana_pct = self:GetAbilitySpecialValueFor("loss_mana_pct")
	self.mana = self.mana - 100
end
function ah.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_MANA_BONUS }
end
function ah.prototype.GetModifierManaBonus(self)
	return self.mana
end
function ah.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_MANA_GAIN_BONUS_PERCENTAGE }
end
function ah.prototype.EOM_GetModifierManaGainBonusPercentage(self, v)
	return -self.loss_mana_pct
end
ah = e(
	{
		n(
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
	ah
)
h.modifier_bristleback_interact_inactive = ah
h.bristleback_talent_2 = c()
local ai = h.bristleback_talent_2
ai.name = "bristleback_talent_2"
d(ai, j)
function ai.prototype.GetIntrinsicModifierName(self)
	return "modifier_bristleback_talent_2"
end
ai = e({ k(nil) }, ai)
h.bristleback_talent_2 = ai
h.modifier_bristleback_talent_2 = c()
local aj = h.modifier_bristleback_talent_2
aj.name = "modifier_bristleback_talent_2"
d(aj, m)
function aj.prototype.GetAbilitySpecialValue(self)
	self.heal_pct = self:GetAbilitySpecialValueFor("heal_pct")
end
function aj.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_ABILITY_LIFESTEAL }
end
function aj.prototype.EOM_GetModifierAbilityLifesteal(self, v)
	return self.heal_pct
end
aj = e(
	{
		n(
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
	aj
)
h.modifier_bristleback_talent_2 = aj
return h