--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "abilities/heroes/crystal_maiden"
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
		["18"] = 7,
		["19"] = 8,
		["20"] = 7,
		["21"] = 8,
		["22"] = 9,
		["23"] = 10,
		["24"] = 9,
		["25"] = 8,
		["26"] = 7,
		["27"] = 8,
		["29"] = 8,
		["30"] = 14,
		["31"] = 22,
		["32"] = 14,
		["33"] = 22,
		["35"] = 22,
		["36"] = 60,
		["37"] = 14,
		["38"] = 23,
		["39"] = 24,
		["40"] = 23,
		["41"] = 61,
		["42"] = 62,
		["43"] = 63,
		["44"] = 65,
		["45"] = 66,
		["46"] = 67,
		["47"] = 69,
		["48"] = 70,
		["49"] = 71,
		["50"] = 73,
		["51"] = 74,
		["52"] = 76,
		["53"] = 79,
		["54"] = 80,
		["55"] = 82,
		["56"] = 84,
		["57"] = 87,
		["58"] = 88,
		["59"] = 89,
		["60"] = 90,
		["61"] = 92,
		["62"] = 93,
		["63"] = 94,
		["64"] = 95,
		["65"] = 96,
		["66"] = 97,
		["67"] = 98,
		["69"] = 61,
		["70"] = 101,
		["71"] = 102,
		["72"] = 103,
		["73"] = 103,
		["74"] = 103,
		["75"] = 102,
		["76"] = 104,
		["77"] = 104,
		["78"] = 104,
		["79"] = 102,
		["80"] = 105,
		["81"] = 105,
		["82"] = 105,
		["83"] = 102,
		["84"] = 106,
		["85"] = 106,
		["86"] = 106,
		["87"] = 102,
		["88"] = 107,
		["89"] = 107,
		["90"] = 107,
		["91"] = 102,
		["92"] = 102,
		["93"] = 101,
		["94"] = 110,
		["95"] = 111,
		["96"] = 111,
		["97"] = 111,
		["98"] = 111,
		["99"] = 111,
		["100"] = 112,
		["103"] = 115,
		["104"] = 116,
		["105"] = 117,
		["106"] = 118,
		["107"] = 119,
		["108"] = 119,
		["109"] = 119,
		["110"] = 119,
		["111"] = 119,
		["112"] = 119,
		["114"] = 110,
		["115"] = 123,
		["116"] = 124,
		["119"] = 125,
		["120"] = 126,
		["121"] = 127,
		["122"] = 128,
		["124"] = 123,
		["125"] = 131,
		["126"] = 132,
		["127"] = 133,
		["128"] = 134,
		["129"] = 135,
		["130"] = 136,
		["131"] = 136,
		["132"] = 136,
		["133"] = 136,
		["134"] = 136,
		["135"] = 137,
		["136"] = 138,
		["137"] = 138,
		["138"] = 138,
		["139"] = 139,
		["140"] = 140,
		["141"] = 141,
		["142"] = 142,
		["143"] = 142,
		["144"] = 142,
		["145"] = 142,
		["146"] = 142,
		["147"] = 142,
		["148"] = 142,
		["149"] = 143,
		["150"] = 144,
		["152"] = 146,
		["153"] = 147,
		["154"] = 147,
		["155"] = 147,
		["156"] = 147,
		["157"] = 147,
		["158"] = 147,
		["160"] = 149,
		["161"] = 150,
		["162"] = 150,
		["163"] = 150,
		["164"] = 150,
		["165"] = 150,
		["166"] = 150,
		["169"] = 138,
		["170"] = 138,
		["171"] = 131,
		["172"] = 155,
		["173"] = 156,
		["174"] = 155,
		["175"] = 158,
		["176"] = 160,
		["177"] = 161,
		["178"] = 162,
		["179"] = 163,
		["180"] = 164,
		["181"] = 165,
		["182"] = 166,
		["183"] = 167,
		["184"] = 167,
		["185"] = 167,
		["186"] = 167,
		["187"] = 167,
		["188"] = 167,
		["192"] = 171,
		["195"] = 172,
		["196"] = 173,
		["198"] = 158,
		["199"] = 177,
		["200"] = 178,
		["201"] = 179,
		["202"] = 180,
		["203"] = 181,
		["204"] = 182,
		["205"] = 183,
		["206"] = 184,
		["207"] = 185,
		["211"] = 177,
		["212"] = 190,
		["213"] = 191,
		["214"] = 192,
		["215"] = 193,
		["217"] = 195,
		["218"] = 196,
		["220"] = 199,
		["221"] = 200,
		["222"] = 201,
		["223"] = 201,
		["224"] = 201,
		["225"] = 202,
		["226"] = 202,
		["227"] = 202,
		["228"] = 202,
		["229"] = 202,
		["230"] = 201,
		["231"] = 201,
		["233"] = 206,
		["234"] = 207,
		["235"] = 208,
		["238"] = 190,
		["239"] = 212,
		["240"] = 213,
		["241"] = 212,
		["242"] = 217,
		["243"] = 218,
		["244"] = 217,
		["245"] = 22,
		["246"] = 14,
		["247"] = 14,
		["248"] = 14,
		["249"] = 14,
		["250"] = 14,
		["251"] = 14,
		["252"] = 14,
		["253"] = 14,
		["254"] = 22,
		["256"] = 22,
		["258"] = 223,
		["259"] = 224,
		["260"] = 223,
		["261"] = 224,
		["262"] = 225,
		["263"] = 226,
		["264"] = 227,
		["265"] = 228,
		["266"] = 229,
		["269"] = 230,
		["270"] = 231,
		["271"] = 232,
		["272"] = 233,
		["273"] = 225,
		["274"] = 236,
		["275"] = 237,
		["276"] = 238,
		["277"] = 239,
		["278"] = 240,
		["279"] = 240,
		["280"] = 240,
		["281"] = 240,
		["282"] = 241,
		["283"] = 241,
		["284"] = 241,
		["285"] = 241,
		["286"] = 236,
		["287"] = 243,
		["288"] = 243,
		["289"] = 243,
		["291"] = 244,
		["292"] = 245,
		["293"] = 246,
		["296"] = 248,
		["297"] = 249,
		["298"] = 250,
		["299"] = 252,
		["300"] = 253,
		["301"] = 255,
		["302"] = 256,
		["303"] = 257,
		["304"] = 258,
		["305"] = 259,
		["306"] = 259,
		["307"] = 259,
		["308"] = 260,
		["309"] = 261,
		["310"] = 262,
		["311"] = 263,
		["312"] = 264,
		["313"] = 265,
		["314"] = 266,
		["316"] = 268,
		["318"] = 259,
		["319"] = 259,
		["320"] = 271,
		["321"] = 271,
		["322"] = 271,
		["323"] = 272,
		["324"] = 273,
		["325"] = 274,
		["326"] = 275,
		["327"] = 276,
		["329"] = 278,
		["330"] = 279,
		["331"] = 280,
		["334"] = 283,
		["335"] = 284,
		["336"] = 285,
		["337"] = 286,
		["339"] = 288,
		["341"] = 290,
		["343"] = 271,
		["344"] = 271,
		["345"] = 243,
		["346"] = 224,
		["347"] = 223,
		["348"] = 224,
		["350"] = 224,
		["352"] = 298,
		["353"] = 299,
		["354"] = 298,
		["355"] = 299,
		["356"] = 300,
		["357"] = 301,
		["358"] = 300,
		["359"] = 299,
		["360"] = 298,
		["361"] = 299,
		["363"] = 299,
		["364"] = 304,
		["365"] = 311,
		["366"] = 304,
		["367"] = 311,
		["368"] = 314,
		["369"] = 315,
		["370"] = 316,
		["371"] = 314,
		["372"] = 318,
		["373"] = 319,
		["374"] = 320,
		["375"] = 321,
		["376"] = 322,
		["377"] = 323,
		["378"] = 324,
		["379"] = 325,
		["380"] = 326,
		["383"] = 318,
		["384"] = 330,
		["385"] = 331,
		["386"] = 331,
		["387"] = 333,
		["388"] = 333,
		["389"] = 333,
		["390"] = 331,
		["391"] = 331,
		["392"] = 330,
		["393"] = 336,
		["394"] = 337,
		["395"] = 338,
		["397"] = 336,
		["398"] = 341,
		["399"] = 342,
		["400"] = 341,
		["401"] = 311,
		["402"] = 304,
		["403"] = 304,
		["404"] = 304,
		["405"] = 304,
		["406"] = 304,
		["407"] = 304,
		["408"] = 304,
		["409"] = 311,
		["411"] = 311,
		["413"] = 347,
		["414"] = 348,
		["415"] = 347,
		["416"] = 348,
		["417"] = 349,
		["418"] = 350,
		["419"] = 349,
		["420"] = 348,
		["421"] = 347,
		["422"] = 348,
		["424"] = 348,
		["425"] = 353,
		["426"] = 360,
		["427"] = 353,
		["428"] = 360,
		["429"] = 362,
		["430"] = 363,
		["431"] = 362,
		["432"] = 365,
		["433"] = 366,
		["434"] = 367,
		["435"] = 367,
		["436"] = 366,
		["437"] = 365,
		["438"] = 370,
		["439"] = 371,
		["440"] = 372,
		["441"] = 373,
		["442"] = 373,
		["443"] = 373,
		["444"] = 373,
		["445"] = 373,
		["446"] = 373,
		["447"] = 373,
		["448"] = 373,
		["449"] = 373,
		["450"] = 373,
		["452"] = 370,
		["453"] = 360,
		["454"] = 353,
		["455"] = 353,
		["456"] = 353,
		["457"] = 353,
		["458"] = 353,
		["459"] = 353,
		["460"] = 353,
		["461"] = 360,
		["463"] = 360,
		["465"] = 379,
		["466"] = 380,
		["467"] = 379,
		["468"] = 380,
		["469"] = 381,
		["470"] = 382,
		["471"] = 381,
		["472"] = 380,
		["473"] = 379,
		["474"] = 380,
		["476"] = 380,
		["477"] = 385,
		["478"] = 393,
		["479"] = 385,
		["480"] = 393,
		["481"] = 395,
		["482"] = 396,
		["483"] = 395,
		["484"] = 398,
		["485"] = 399,
		["486"] = 400,
		["488"] = 398,
		["489"] = 403,
		["490"] = 404,
		["491"] = 403,
		["492"] = 408,
		["493"] = 409,
		["494"] = 408,
		["495"] = 393,
		["496"] = 385,
		["497"] = 385,
		["498"] = 385,
		["499"] = 385,
		["500"] = 385,
		["501"] = 385,
		["502"] = 385,
		["503"] = 385,
		["504"] = 393,
		["506"] = 393,
		["508"] = 414,
		["509"] = 415,
		["510"] = 414,
		["511"] = 415,
		["512"] = 416,
		["513"] = 417,
		["514"] = 416,
		["515"] = 415,
		["516"] = 414,
		["517"] = 415,
		["519"] = 415,
		["520"] = 420,
		["521"] = 427,
		["522"] = 420,
		["523"] = 427,
		["524"] = 430,
		["525"] = 431,
		["526"] = 432,
		["527"] = 430,
		["528"] = 434,
		["529"] = 435,
		["530"] = 436,
		["531"] = 436,
		["532"] = 435,
		["533"] = 434,
		["534"] = 439,
		["535"] = 440,
		["536"] = 441,
		["537"] = 439,
		["538"] = 443,
		["539"] = 444,
		["540"] = 445,
		["541"] = 443,
		["542"] = 447,
		["543"] = 448,
		["544"] = 447,
		["545"] = 452,
		["546"] = 453,
		["547"] = 454,
		["549"] = 452,
		["550"] = 427,
		["551"] = 420,
		["552"] = 420,
		["553"] = 420,
		["554"] = 420,
		["555"] = 420,
		["556"] = 420,
		["557"] = 420,
		["558"] = 427,
		["560"] = 427,
		["562"] = 460,
		["563"] = 461,
		["564"] = 460,
		["565"] = 461,
		["566"] = 462,
		["567"] = 463,
		["568"] = 462,
		["569"] = 461,
		["570"] = 460,
		["571"] = 461,
		["573"] = 461,
		["574"] = 466,
		["575"] = 473,
		["576"] = 466,
		["577"] = 473,
		["578"] = 477,
		["579"] = 478,
		["580"] = 479,
		["581"] = 477,
		["582"] = 481,
		["583"] = 482,
		["584"] = 483,
		["585"] = 483,
		["586"] = 482,
		["587"] = 481,
		["588"] = 486,
		["589"] = 487,
		["590"] = 488,
		["591"] = 489,
		["592"] = 490,
		["594"] = 492,
		["595"] = 493,
		["597"] = 495,
		["600"] = 486,
		["601"] = 473,
		["602"] = 466,
		["603"] = 466,
		["604"] = 466,
		["605"] = 466,
		["606"] = 466,
		["607"] = 466,
		["608"] = 466,
		["609"] = 473,
		["611"] = 473,
		["612"] = 501,
		["613"] = 508,
		["614"] = 501,
		["615"] = 508,
		["616"] = 511,
		["617"] = 512,
		["618"] = 511,
		["619"] = 514,
		["620"] = 515,
		["621"] = 516,
		["622"] = 514,
		["623"] = 518,
		["624"] = 519,
		["625"] = 520,
		["627"] = 518,
		["628"] = 523,
		["629"] = 524,
		["630"] = 525,
		["631"] = 526,
		["632"] = 526,
		["633"] = 526,
		["634"] = 526,
		["636"] = 523,
		["637"] = 529,
		["638"] = 530,
		["639"] = 529,
		["640"] = 534,
		["641"] = 535,
		["642"] = 534,
		["643"] = 508,
		["644"] = 501,
		["645"] = 501,
		["646"] = 501,
		["647"] = 501,
		["648"] = 501,
		["649"] = 501,
		["650"] = 501,
		["651"] = 508,
		["653"] = 508,
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
g.crystal_maiden_talent = c()
local q = g.crystal_maiden_talent
q.name = "crystal_maiden_talent"
d(q, i)
function q.prototype.GetIntrinsicModifierName(self)
	return "modifier_crystal_maiden_talent"
end
q = e({ j(nil) }, q)
g.crystal_maiden_talent = q
g.modifier_crystal_maiden_talent = c()
local r = g.modifier_crystal_maiden_talent
r.name = "modifier_crystal_maiden_talent"
d(r, l)
function r.prototype.____constructor(self, ...)
	l.prototype.____constructor(self, ...)
	self.shard_next_explosion_time = 0
end
function r.prototype.GetTexture(self)
	return "modifier_crystal_maiden_talent"
end
function r.prototype.GetAbilitySpecialValue(self)
	self.chance = self:GetAbilitySpecialValueFor("chance")
		+ self:GetAbilityTalentValue("crystal_maiden_talent_4", "chance")
	self.mana = self:GetAbilitySpecialValueFor("mana")
		+ self:GetAbilityTalentValue("crystal_maiden_talent_12", "mana_regen")
	self.mana_reply = self:GetAbilitySpecialValueFor("mana_reply")
		- self:GetAbilityTalentValue("crystal_maiden_talent_15", "mana_reduce")
	self.ice_star_damage = self:GetAbilitySpecialValueFor("ice_star_damage")
	self.ice = self:GetAbilitySpecialValueFor("ice")
	self.wisp_heal = self:GetAbilityTalentValue("crystal_maiden_talent_7", "wisp_heal")
	self.talent_11_chance = self:GetAbilityTalentValue("crystal_maiden_talent_11", "talent_11_chance")
	self.talent_11_heal = self:GetAbilityTalentValue("crystal_maiden_talent_11", "talent_11_heal")
	self.tl5_stun_duration = self:GetAbilityTalentValue("crystal_maiden_talent_5", "stun_duration")
	self.tl5_ice_stack = self:GetAbilityTalentValue("crystal_maiden_talent_5", "ice_stack")
	self.tl13_damage_shield = self:GetAbilityTalentValue("crystal_maiden_talent_13", "damage_shield")
	self.tl14_ult_bonus = self:GetAbilityTalentValue("crystal_maiden_talent_14", "ult_bonus")
	self.tl14_max_stack = self:GetAbilityTalentValue("crystal_maiden_talent_14", "max_stack")
	self.tl15_stun_duration = self:GetAbilityTalentValue("crystal_maiden_talent_15", "stun_duration")
	self.tl16_chance = self:GetAbilityTalentValue("crystal_maiden_talent_16", "chance")
	self.s_attack_speed = self:GetAbilityTalentValue("crystal_maiden_shard", "attack_speed")
	self.s_attack_speed_max = self:GetAbilityTalentValue("crystal_maiden_shard", "attack_speed_max")
	self.s_chance = self:GetAbilityTalentValue("crystal_maiden_shard", "chance")
	self.shard_interval = self:GetAbilityTalentValue("crystal_maiden_shard", "interval")
	local s = IsServer() and PlayerData:getTraitAbility(self:GetParent():GetPlayerOwnerID()) or nil
	self.g_mana_cost = (s and s:GetAbilityName()) == "trait_189" and s:GetSpecialValueFor("mana_cost") or 0
	self.g_shield = (s and s:GetAbilityName()) == "trait_189" and s:GetSpecialValueFor("shield") or 0
	if IsServer() then
		self.tl5_record = 0
		self.g_mana_record = 0
		self.mana_reply_record = 0
	end
end
function r.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_ICE_GAINED] = { self:GetParent(), -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_LANDED] = { self:GetParent(), -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST] = { self:GetParent(), -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_RESTORE] = { self:GetParent(), -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_END] = { self:GetParent(), self:GetParent() },
	}
end
function r.prototype.OnCustomAbilityFullyCast(self, t)
	print(t.ability:GetManaCost(1), self.g_mana_cost, self.g_shield)
	if self.g_mana_cost <= 0 or self.g_shield <= 0 then
		return
	end
	self.g_mana_record = self.g_mana_record + t.ability:GetManaCost(1)
	if self.g_mana_record >= self.g_mana_cost then
		local u = math.floor(self.g_mana_record / self.g_mana_cost)
		self.g_mana_record = self.g_mana_record % self.g_mana_cost
		AddShield(self:GetParent(), u * self.g_shield, "greevil_effect_1", "Ability")
	end
end
function r.prototype.OnRestore(self, v)
	if self.mana_reply <= 0 then
		return
	end
	self.mana_reply_record = self.mana_reply_record + v.count
	if self.mana_reply_record >= self.mana_reply then
		self.mana_reply_record = self.mana_reply_record % self.mana_reply
		self:FrostNova()
	end
end
function r.prototype.FrostNova(self)
	local w = self:GetParent()
	local x = w:GetEnemy()
	EmitSoundOn("Hero_Crystal.CrystalNova", w)
	local y = ParticleManager:CreateParticle(
		"particles/econ/items/crystal_maiden/crystal_maiden_cowl_of_ice/maiden_crystal_nova_cowlofice.vpcf",
		PATTACH_ABSORIGIN,
		x,
		w
	)
	ParticleManager:SetParticleControl(y, 0, x:GetAbsOrigin())
	w:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	GameTimer(0.6, function()
		if IsInjurable(x, w) then
			local z = self.parent:FindAbilityByName("crystal_maiden_crystal_nova")
			w:DealDamage(x, z, self.ice_star_damage, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)
			AddIce(w, x, self.ice, "crystal_maiden_crystal_nova", "Ability")
			if self:HasTalent("crystal_maiden_talent_13") then
				AddShield(
					w,
					self.tl13_damage_shield * self.ice_star_damage * 0.01,
					"crystal_maiden_crystal_nova",
					"Ability"
				)
			end
			if self:HasTalent("crystal_maiden_talent_14") then
				w:AddNewModifier(w, self:GetAbility(), "modifier_crystal_maiden_talent_14_buff", {})
			end
			if self:HasTalent("crystal_maiden_talent_15") then
				AddStun(self.parent, self.parent:GetEnemy(), z, self.tl15_stun_duration)
			end
		end
	end)
end
function r.prototype.OnBattleEnd(self, v)
	self:GetParent():RemoveModifierByName("modifier_crystal_maiden_talent_14_buff")
end
function r.prototype.OnIceGained(self, v)
	if self.tl5_ice_stack > 0 then
		self.tl5_record = self.tl5_record + v.iStackCount
		if self.tl5_record >= self.tl5_ice_stack then
			local w = self:GetParent()
			local x = w:GetEnemy()
			self.tl5_record = 0
			if IsInjurable(x, w) then
				AddStun(w, x, self:GetAbility(), self.tl5_stun_duration)
			end
		end
	end
	if self:GetCaster():PassivesDisabled() then
		return
	end
	if self:PRD(self.chance) then
		self:BrillianceAura()
	end
end
function r.prototype.OnCustomAttackLanded(self, t)
	if self.s_chance > 0 and self:PRD(self.s_chance, "s_chance") then
		local z = self:GetParent():FindAbilityByName("crystal_maiden_ult")
		if IsValid(z) then
			z:FreezingFieldExplosion(1)
			local A = GameRules:GetGameTime()
			if A >= self.shard_next_explosion_time then
				self.shard_next_explosion_time = A + self.shard_interval
				z:FreezingFieldExplosion(z:GetExtraCount())
			end
		end
	end
end
function r.prototype.BrillianceAura(self)
	local w = self:GetParent()
	if self.s_attack_speed == 0 then
		Restore(w, self.mana)
	else
		local u = self:GetStackCount()
		self:SetStackCount(math.min(u + self.s_attack_speed, self.s_attack_speed_max))
	end
	local B = self.mana * self.wisp_heal * 0.01
	if self.wisp_heal > 0 then
		EachWisp(w, function(C)
			C:Heal(B, self:GetAbility(), true)
		end)
	end
	if self.talent_11_chance > 0 then
		if self:PRD(self.talent_11_chance, "talent_11") then
			Heal(w, self.talent_11_heal, "crystal_maiden_talent_11", "Ability")
		end
	end
end
function r.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACKSPEED_TOTAL_PERCENTAGE }
end
function r.prototype.EOM_GetModifierAttackSpeedTotalPercentage(self, v)
	return self:GetStackCount()
end
r = e(
	{
		m(
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
	r
)
g.modifier_crystal_maiden_talent = r
g.crystal_maiden_ult = c()
local D = g.crystal_maiden_ult
D.name = "crystal_maiden_ult"
d(D, o)
function D.prototype.OnSpellStart(self)
	local E = self:GetCaster()
	E:StartGesture(ACT_DOTA_CAST_ABILITY_1)
	local F = E:GetEnemy()
	if not IsValid(F) then
		return
	end
	local u = self:GetSpecialValueFor("count") + self:GetTalentValue("crystal_maiden_talent_10", "base_count")
	local G = u + self:GetExtraCount()
	self:FreezingFieldExplosion(G)
	E:EmitSound("hero_Crystal.freezingField.wind")
end
function D.prototype.GetExtraCount(self)
	local E = self:GetCaster()
	local F = E:GetEnemy()
	local H = self:GetSpecialValueFor("bonus_max") + self:GetTalentValue("crystal_maiden_talent_10", "extra_count")
	local I = math.max(
		1,
		self:GetSpecialValueFor("bonus_per_ice") - self:GetTalentValue("crystal_maiden_talent_10", "threshold_reduce")
	)
	return math.min(H, math.floor(GetIce(F) / I))
end
function D.prototype.FreezingFieldExplosion(self, G, J)
	if J == nil then
		J = 100
	end
	local E = self:GetCaster()
	local F = E:GetEnemy()
	if not IsValid(F) then
		return
	end
	local K = F:GetAbsOrigin()
	local L = (self:GetSpecialValueFor("damage") + self:GetTalentValue("crystal_maiden_talent_1", "damage_bonus"))
		* J
		* 0.01
	local M = self:GetSpecialValueFor("interval")
		* (1 - self:GetTalentValue("crystal_maiden_talent_2", "interval_reduce") * 0.01)
	local N = self:GetTalentValue("crystal_maiden_talent_3", "ice_damage")
	local O = self:GetTalentValue("crystal_maiden_talent_16", "chance")
	local P = self:GetSpecialValueFor("count")
	local Q = M * (1 - self:GetSpecialValueFor("default_interval_pct") * 0.01)
	local R = 0
	local S = 0
	self:GameTimer(0, function()
		if R < G and F:IsAlive() then
			R = R + 1
			local T = K + RandomVector(150)
			local U = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_crystalmaiden/maiden_freezing_field_explosion.vpcf",
				PATTACH_CUSTOMORIGIN,
				nil,
				E
			)
			ParticleManager:SetParticleControl(U, 0, T)
			if R <= P then
				return Q
			end
			return M
		end
	end)
	self:GameTimer(0.4, function()
		if S < G and F:IsAlive() then
			S = S + 1
			local V = L
			if N > 0 then
				V = V + GetIce(F) * N * 0.01
			end
			if O > 0 then
				if self:PRD(O) then
					E:FindModifierByName("modifier_crystal_maiden_talent"):FrostNova()
				end
			end
			E:DealDamage(F, self, V, EOM_DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL)
			E:EmitSound("n_creep_ice_shaman.IceBomb.Target")
			if S <= P then
				return Q
			end
			return M
		else
			E:StopSound("hero_Crystal.freezingField.wind")
		end
	end)
end
D = e({ p(nil) }, D)
g.crystal_maiden_ult = D
g.crystal_maiden_talent_3 = c()
local W = g.crystal_maiden_talent_3
W.name = "crystal_maiden_talent_3"
d(W, i)
function W.prototype.GetIntrinsicModifierName(self)
	return "modifier_crystal_maiden_talent_3"
end
W = e({ j(nil) }, W)
g.crystal_maiden_talent_3 = W
g.modifier_crystal_maiden_talent_3 = c()
local X = g.modifier_crystal_maiden_talent_3
X.name = "modifier_crystal_maiden_talent_3"
d(X, l)
function X.prototype.GetAbilitySpecialValue(self)
	self.wisp_interval = self:GetAbilitySpecialValueFor("wisp_interval")
	self.damage_pct = self:GetAbilitySpecialValueFor("damage_pct")
end
function X.prototype.OnIntervalThink(self)
	local w = self:GetParent()
	local Y = self:GetAbility()
	local Z = w:GetEnemy()
	local _ = w:FindModifierByName("modifier_sect_wisp")
	if IsValid(Z) and IsValid(_) and type(Y.FreezingFieldExplosion) == "function" then
		local a0 = _:GetStackCount()
		if a0 > 0 then
			Y:FreezingFieldExplosion(1, self.damage_pct)
		end
	end
end
function X.prototype.EDeclareEvents(self)
	return {
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_START] = { -1, -1 },
		[EOMModifierEvents.MODIFIER_EVENT_ON_BATTLE_END] = { self:GetParent(), self:GetParent() },
	}
end
function X.prototype.OnBattleStart(self, v)
	if self.wisp_interval > 0 then
		self:StartIntervalThink(self.wisp_interval)
	end
end
function X.prototype.OnBattleEnd(self, v)
	self:StartIntervalThink(-1)
end
X = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	X
)
g.modifier_crystal_maiden_talent_3 = X
g.crystal_maiden_talent_6 = c()
local a1 = g.crystal_maiden_talent_6
a1.name = "crystal_maiden_talent_6"
d(a1, i)
function a1.prototype.GetIntrinsicModifierName(self)
	return "modifier_crystal_maiden_talent_6"
end
a1 = e({ j(nil) }, a1)
g.crystal_maiden_talent_6 = a1
g.modifier_crystal_maiden_talent_6 = c()
local a2 = g.modifier_crystal_maiden_talent_6
a2.name = "modifier_crystal_maiden_talent_6"
d(a2, l)
function a2.prototype.GetAbilitySpecialValue(self)
	self.heal_ice_loss_pct = self:GetAbilitySpecialValueFor("heal_ice_loss_pct")
end
function a2.prototype.EDeclareEvents(self)
	return { [EOMModifierEvents.MODIFIER_EVENT_ON_ICE_LOSS] = { -1, self:GetParent() } }
end
function a2.prototype.OnIceLoss(self, v)
	local Y = self:GetAbility()
	if IsValid(Y) and Y:GetLevel() > 0 then
		local a3 = Heal
		local a4 = self:GetParent()
		local a5 = v.iCount * self.heal_ice_loss_pct * 0.01
		local a6 = self:GetAbility()
		a3(a4, a5, a6 and a6:GetAbilityName(), "Ability")
	end
end
a2 = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	a2
)
g.modifier_crystal_maiden_talent_6 = a2
g.crystal_maiden_talent_8 = c()
local a7 = g.crystal_maiden_talent_8
a7.name = "crystal_maiden_talent_8"
d(a7, i)
function a7.prototype.GetIntrinsicModifierName(self)
	return "modifier_crystal_maiden_talent_8"
end
a7 = e({ j(nil) }, a7)
g.crystal_maiden_talent_8 = a7
g.modifier_crystal_maiden_talent_8 = c()
local a8 = g.modifier_crystal_maiden_talent_8
a8.name = "modifier_crystal_maiden_talent_8"
d(a8, l)
function a8.prototype.GetAbilitySpecialValue(self)
	self.ulti_power_per_victory = self:GetAbilitySpecialValueFor("ulti_power_per_victory")
end
function a8.prototype.OnCreated(self, v)
	if IsServer() then
		self:SetStackCount(PlayerData:getTotalWin(self:GetParent():GetPlayerOwnerID()) * self.ulti_power_per_victory)
	end
end
function a8.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_ULTI_POWER }
end
function a8.prototype.EOM_GetModifierUltiPower(self)
	return self:GetStackCount()
end
a8 = e(
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
	a8
)
g.modifier_crystal_maiden_talent_8 = a8
g.crystal_maiden_talent_9 = c()
local a9 = g.crystal_maiden_talent_9
a9.name = "crystal_maiden_talent_9"
d(a9, i)
function a9.prototype.GetIntrinsicModifierName(self)
	return "modifier_crystal_maiden_talent_9"
end
a9 = e({ j(nil) }, a9)
g.crystal_maiden_talent_9 = a9
g.modifier_crystal_maiden_talent_9 = c()
local aa = g.modifier_crystal_maiden_talent_9
aa.name = "modifier_crystal_maiden_talent_9"
d(aa, l)
function aa.prototype.GetAbilitySpecialValue(self)
	self.fury_disrupt_chance = self:GetAbilitySpecialValueFor("fury_disrupt_chance")
	self.duration = self:GetAbilitySpecialValueFor("duration")
end
function aa.prototype.EDeclareEvents(self)
	return { [EOMModifierEvents.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST] = { self:GetParent(), -1 } }
end
function aa.prototype.OnCustomAbilityFullyCast(self, t)
	self:SetStackCount(1)
	self:StartIntervalThink(self.duration)
end
function aa.prototype.OnIntervalThink(self)
	self:SetStackCount(0)
	self:StartIntervalThink(-1)
end
function aa.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_IGNORE_FURY_PERCENTAGE }
end
function aa.prototype.EOM_GetModifierIgnoreFuryPercent(self, v)
	if self:GetStackCount() == 1 then
		return self.fury_disrupt_chance
	end
end
aa = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	aa
)
g.modifier_crystal_maiden_talent_9 = aa
g.crystal_maiden_talent_12 = c()
local ab = g.crystal_maiden_talent_12
ab.name = "crystal_maiden_talent_12"
d(ab, i)
function ab.prototype.GetIntrinsicModifierName(self)
	return "modifier_crystal_maiden_talent_12"
end
ab = e({ j(nil) }, ab)
g.crystal_maiden_talent_12 = ab
g.modifier_crystal_maiden_talent_12 = c()
local ac = g.modifier_crystal_maiden_talent_12
ac.name = "modifier_crystal_maiden_talent_12"
d(ac, l)
function ac.prototype.GetAbilitySpecialValue(self)
	self.talent_12_chance = self:GetAbilitySpecialValueFor("talent_12_chance")
	self.talent_12_wisp_health = self:GetAbilitySpecialValueFor("talent_12_wisp_health")
end
function ac.prototype.EDeclareEvents(self)
	return { [EOMModifierEvents.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST] = { self:GetParent(), -1 } }
end
function ac.prototype.OnCustomAbilityFullyCast(self, t)
	local w = self:GetParent()
	if self.talent_12_wisp_health > 0 and self:PRD(self.talent_12_chance) then
		if not w:HasAbility("sect_wisp") then
			w:AddAbility("sect_wisp")
		end
		if IsValid(self.wisp) and self.wisp:IsAlive() then
			self.wisp:SetHealth(self.wisp:GetMaxHealth())
		else
			self.wisp = SummonWisp(w, self.talent_12_wisp_health)
		end
	end
end
ac = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	ac
)
g.modifier_crystal_maiden_talent_12 = ac
g.modifier_crystal_maiden_talent_14_buff = c()
local ad = g.modifier_crystal_maiden_talent_14_buff
ad.name = "modifier_crystal_maiden_talent_14_buff"
d(ad, l)
function ad.prototype.GetTexture(self)
	return "crystal_maiden_crystal_nova"
end
function ad.prototype.GetAbilitySpecialValue(self)
	self.tl14_ult_bonus = self:GetAbilityTalentValue("crystal_maiden_talent_14", "ult_bonus")
	self.tl14_max_stack = self:GetAbilityTalentValue("crystal_maiden_talent_14", "max_stack")
end
function ad.prototype.OnCreated(self, v)
	if IsServer() then
		self:SetStackCount(self.tl14_ult_bonus)
	end
end
function ad.prototype.OnRefresh(self, v)
	if IsServer() then
		local ae = self.tl14_max_stack * self.tl14_ult_bonus
		self:SetStackCount(math.min(self:GetStackCount() + self.tl14_ult_bonus, ae))
	end
end
function ad.prototype.EDeclareFunctions(self)
	return { EOMModifierFunction.EOM_MODIFIER_PROPERTY_ULTI_POWER }
end
function ad.prototype.EOM_GetModifierUltiPower(self)
	return self:GetStackCount()
end
ad = e(
	{ m(
		a,
		{ IsHidden = true, IsDebuff = false, IsPurgable = false, IsPurgeException = false, AllowIllusionDuplicate = false }
	) },
	ad
)
g.modifier_crystal_maiden_talent_14_buff = ad
return g