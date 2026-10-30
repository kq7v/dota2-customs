--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- abilities/items/item_super_giant_ring.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"abilities/items/item_super_giant_ring.lua",
	{
		["11"] = "62:7",
		["12"] = "1:1",
		["13"] = "1:10",
		["14"] = "1:52",
		["15"] = "2:1",
		["16"] = "2:10",
		["17"] = "2:27",
		["18"] = "3:1",
		["19"] = "3:10",
		["22"] = "10:1",
		["23"] = "11:14",
		["24"] = "10:1",
		["25"] = "11:36",
		["27"] = "11:44",
		["28"] = "46:5",
		["29"] = "10:1",
		["30"] = "13:5",
		["31"] = "14:15",
		["32"] = "15:14",
		["35"] = "16:15",
		["36"] = "17:13",
		["39"] = "18:14",
		["40"] = "18:14",
		["41"] = "18:77",
		["42"] = "18:14",
		["45"] = "19:15",
		["46"] = "19:52",
		["47"] = "19:79",
		["48"] = "19:23",
		["49"] = "20:16",
		["50"] = "20:16",
		["51"] = "20:16",
		["52"] = "20:16",
		["54"] = "20:16",
		["55"] = "20:73",
		["57"] = "20:81",
		["59"] = "20:9",
		["60"] = "13:5",
		["61"] = "23:5",
		["62"] = "23:34",
		["63"] = "23:34",
		["65"] = "24:15",
		["66"] = "25:16",
		["67"] = "25:16",
		["68"] = "25:16",
		["70"] = "25:16",
		["72"] = "25:16",
		["74"] = "25:9",
		["75"] = "23:5",
		["76"] = "28:5",
		["77"] = "28:34",
		["78"] = "28:34",
		["80"] = "29:15",
		["81"] = "30:16",
		["82"] = "30:16",
		["83"] = "30:16",
		["85"] = "30:16",
		["87"] = "30:16",
		["89"] = "30:9",
		["90"] = "28:5",
		["91"] = "33:5",
		["92"] = "33:36",
		["93"] = "33:36",
		["95"] = "34:16",
		["96"] = "34:16",
		["97"] = "34:16",
		["99"] = "34:16",
		["101"] = "34:16",
		["103"] = "34:9",
		["104"] = "33:5",
		["105"] = "38:5",
		["106"] = "39:9",
		["107"] = "38:5",
		["108"] = "42:5",
		["109"] = "43:9",
		["110"] = "42:5",
		["111"] = "48:5",
		["112"] = "49:9",
		["113"] = "50:9",
		["114"] = "48:5",
		["115"] = "53:5",
		["116"] = "54:13",
		["117"] = "55:13",
		["119"] = "57:9",
		["120"] = "53:5",
		["121"] = "11:14",
		["122"] = "10:2",
		["123"] = "10:2",
		["124"] = "10:2",
		["126"] = "10:2",
		["127"] = "11:14",
		["129"] = "11:14",
		["130"] = "62:7",
		["131"] = "61:1",
		["132"] = "62:41",
		["133"] = "63:5",
		["134"] = "64:9",
		["135"] = "63:5",
		["136"] = "70:5",
		["137"] = "71:9",
		["138"] = "72:9",
		["139"] = "73:9",
		["140"] = "75:9",
		["141"] = "70:5",
		["142"] = "80:5",
		["143"] = "81:15",
		["144"] = "82:15",
		["145"] = "83:9",
		["146"] = "80:5",
		["147"] = "86:5",
		["148"] = "87:9",
		["149"] = "86:5",
		["150"] = "90:5",
		["151"] = "91:9",
		["152"] = "90:5",
		["153"] = "94:5",
		["154"] = "95:15",
		["155"] = "96:13",
		["156"] = "97:13",
		["157"] = "98:13",
		["159"] = "100:9",
		["160"] = "94:5",
		["161"] = "103:5",
		["162"] = "104:9",
		["163"] = "103:5",
		["164"] = "107:5",
		["165"] = "108:9",
		["166"] = "107:5",
		["167"] = "111:5",
		["168"] = "112:9",
		["169"] = "111:5",
		["170"] = "115:5",
		["171"] = "116:9",
		["172"] = "115:5",
		["173"] = "119:5",
		["174"] = "120:9",
		["175"] = "119:5",
		["176"] = "123:5",
		["177"] = "124:9",
		["178"] = "123:5",
		["179"] = "127:5",
		["180"] = "128:9",
		["181"] = "127:5",
		["182"] = "131:5",
		["183"] = "132:9",
		["184"] = "131:5",
		["185"] = "135:5",
		["186"] = "136:14",
		["187"] = "136:37",
		["189"] = "138:14",
		["190"] = "138:60",
		["192"] = "140:15",
		["193"] = "141:13",
		["194"] = "141:34",
		["196"] = "142:15",
		["197"] = "143:13",
		["198"] = "143:37",
		["200"] = "144:15",
		["201"] = "145:13",
		["202"] = "145:39",
		["204"] = "146:9",
		["205"] = "135:5",
		["206"] = "62:7",
		["207"] = "61:2",
		["208"] = "61:2",
		["209"] = "61:19",
		["210"] = "61:2",
		["212"] = "61:2",
		["213"] = "62:7",
		["216"] = "154:7",
		["217"] = "153:1",
		["218"] = "154:59",
		["220"] = "154:67",
		["221"] = "189:5",
		["222"] = "190:5",
		["223"] = "244:5",
		["224"] = "153:1",
		["225"] = "155:5",
		["226"] = "156:9",
		["227"] = "155:5",
		["228"] = "159:5",
		["229"] = "160:9",
		["230"] = "159:5",
		["231"] = "163:5",
		["232"] = "164:9",
		["233"] = "163:5",
		["234"] = "167:5",
		["235"] = "168:9",
		["236"] = "167:5",
		["237"] = "171:5",
		["238"] = "172:9",
		["239"] = "171:5",
		["240"] = "178:5",
		["241"] = "179:14",
		["244"] = "180:9",
		["245"] = "181:9",
		["246"] = "182:9",
		["247"] = "183:9",
		["248"] = "178:5",
		["249"] = "192:5",
		["250"] = "193:14",
		["253"] = "195:15",
		["254"] = "197:15",
		["255"] = "198:15",
		["256"] = "199:9",
		["257"] = "202:15",
		["258"] = "203:15",
		["259"] = "204:13",
		["260"] = "205:13",
		["263"] = "208:9",
		["264"] = "209:15",
		["265"] = "211:15",
		["266"] = "213:13",
		["267"] = "214:13",
		["268"] = "215:19",
		["269"] = "216:19",
		["270"] = "217:13",
		["272"] = "220:13",
		["273"] = "222:17",
		["274"] = "223:17",
		["275"] = "223:38",
		["276"] = "223:87",
		["277"] = "224:21",
		["278"] = "225:21",
		["279"] = "226:21",
		["280"] = "227:21",
		["281"] = "223:87",
		["282"] = "223:17",
		["284"] = "231:13",
		["285"] = "233:13",
		["287"] = "235:13",
		["289"] = "192:5",
		["290"] = "239:5",
		["291"] = "240:9",
		["292"] = "239:5",
		["293"] = "246:5",
		["294"] = "247:15",
		["295"] = "248:15",
		["296"] = "249:14",
		["297"] = "250:13",
		["298"] = "251:17",
		["299"] = "250:34",
		["300"] = "253:17",
		["301"] = "254:17",
		["302"] = "250:34",
		["303"] = "256:13",
		["304"] = "256:40",
		["305"] = "256:60",
		["306"] = "256:63",
		["307"] = "256:13",
		["308"] = "256:108",
		["309"] = "256:13",
		["310"] = "257:13",
		["311"] = "257:37",
		["312"] = "257:57",
		["313"] = "257:60",
		["314"] = "257:13",
		["316"] = "260:13",
		["317"] = "261:13",
		["318"] = "262:13",
		["319"] = "262:37",
		["320"] = "262:57",
		["321"] = "262:60",
		["322"] = "262:13",
		["324"] = "265:13",
		["325"] = "266:13",
		["326"] = "267:19",
		["327"] = "268:13",
		["328"] = "268:37",
		["329"] = "268:57",
		["330"] = "268:60",
		["331"] = "268:13",
		["333"] = "246:5",
		["334"] = "272:5",
		["335"] = "273:13",
		["336"] = "274:13",
		["337"] = "275:13",
		["339"] = "272:5",
		["340"] = "154:7",
		["341"] = "153:2",
		["342"] = "153:2",
		["343"] = "153:19",
		["344"] = "153:2",
		["346"] = "153:2",
		["347"] = "154:7",
		["350"] = "284:7",
		["351"] = "283:1",
		["352"] = "284:55",
		["353"] = "285:5",
		["354"] = "286:9",
		["355"] = "285:5",
		["356"] = "289:5",
		["357"] = "290:9",
		["358"] = "289:5",
		["359"] = "293:5",
		["360"] = "294:9",
		["361"] = "293:5",
		["362"] = "297:5",
		["363"] = "298:9",
		["364"] = "297:5",
		["365"] = "301:5",
		["366"] = "302:9",
		["367"] = "301:5",
		["368"] = "305:5",
		["369"] = "306:9",
		["370"] = "305:5",
		["371"] = "309:5",
		["372"] = "310:14",
		["375"] = "311:15",
		["376"] = "312:15",
		["377"] = "313:15",
		["378"] = "314:13",
		["379"] = "313:21",
		["380"] = "316:13",
		["381"] = "317:13",
		["382"] = "313:21",
		["383"] = "319:9",
		["384"] = "319:33",
		["385"] = "319:38",
		["386"] = "319:41",
		["387"] = "319:9",
		["388"] = "320:9",
		["389"] = "320:33",
		["390"] = "320:38",
		["391"] = "320:41",
		["392"] = "320:9",
		["393"] = "321:9",
		["394"] = "321:33",
		["395"] = "321:38",
		["396"] = "321:41",
		["397"] = "321:9",
		["398"] = "322:9",
		["399"] = "322:36",
		["400"] = "322:41",
		["401"] = "322:44",
		["402"] = "322:9",
		["403"] = "322:89",
		["404"] = "322:9",
		["405"] = "323:9",
		["406"] = "323:26",
		["407"] = "323:31",
		["408"] = "323:38",
		["409"] = "323:45",
		["410"] = "323:48",
		["411"] = "323:55",
		["412"] = "323:9",
		["413"] = "309:5",
		["414"] = "326:5",
		["415"] = "327:14",
		["418"] = "328:38",
		["419"] = "328:17",
		["420"] = "328:27",
		["421"] = "329:14",
		["424"] = "330:15",
		["425"] = "331:15",
		["426"] = "332:13",
		["427"] = "334:19",
		["428"] = "335:19",
		["429"] = "336:19",
		["430"] = "337:19",
		["431"] = "338:19",
		["432"] = "339:19",
		["433"] = "340:19",
		["434"] = "342:34",
		["435"] = "342:34",
		["436"] = "342:56",
		["437"] = "342:56",
		["438"] = "342:56",
		["440"] = "342:19",
		["441"] = "343:32",
		["443"] = "343:32",
		["445"] = "343:19",
		["446"] = "344:19",
		["447"] = "345:13",
		["448"] = "346:14",
		["449"] = "347:19",
		["450"] = "349:19",
		["451"] = "350:13",
		["452"] = "350:40",
		["453"] = "350:54",
		["454"] = "350:57",
		["455"] = "350:13",
		["456"] = "350:98",
		["457"] = "350:13",
		["458"] = "351:13",
		["459"] = "351:40",
		["460"] = "351:54",
		["461"] = "351:57",
		["462"] = "351:13",
		["463"] = "351:102",
		["464"] = "351:13",
		["465"] = "353:13",
		["466"] = "355:13",
		["467"] = "355:34",
		["468"] = "355:92",
		["469"] = "356:17",
		["470"] = "357:17",
		["471"] = "358:17",
		["472"] = "359:17",
		["473"] = "355:92",
		["474"] = "355:13",
		["475"] = "362:43",
		["476"] = "362:43",
		["481"] = "362:19",
		["482"] = "363:13",
		["483"] = "364:17",
		["484"] = "366:17",
		["485"] = "367:17",
		["486"] = "368:17",
		["487"] = "369:17",
		["488"] = "363:25",
		["489"] = "372:13",
		["491"] = "326:5",
		["492"] = "284:7",
		["493"] = "283:2",
		["494"] = "283:2",
		["495"] = "283:19",
		["496"] = "283:2",
		["498"] = "283:2",
		["499"] = "284:7",
		["502"] = "381:7",
		["503"] = "380:1",
		["504"] = "381:64",
		["505"] = "382:5",
		["506"] = "383:9",
		["507"] = "382:5",
		["508"] = "386:5",
		["509"] = "387:9",
		["510"] = "386:5",
		["511"] = "390:5",
		["512"] = "391:9",
		["513"] = "390:5",
		["514"] = "394:5",
		["515"] = "395:9",
		["516"] = "394:5",
		["517"] = "398:5",
		["518"] = "399:9",
		["519"] = "398:5",
		["520"] = "402:5",
		["521"] = "403:9",
		["522"] = "402:5",
		["523"] = "406:5",
		["524"] = "407:9",
		["525"] = "406:5",
		["526"] = "381:7",
		["527"] = "380:2",
		["528"] = "380:2",
		["529"] = "380:19",
		["530"] = "380:2",
		["532"] = "380:2",
		["533"] = "381:7",
	}
)
local ____exports = {}
local sl_modifier_item_super_giant_ring, sl_modifier_item_super_giant_ring_aura_check_debuff, sl_modifier_item_super_giant_ring_strike_debuff, sl_modifier_item_super_giant_ring_strike_cooldown_debuff
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifier_ItemIntrinsic = ____sl_modifier_base.SLModifier_ItemIntrinsic
local SLModifierBase_Debuff = ____sl_modifier_base.SLModifierBase_Debuff
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerAbility = ____dota_ts_adapter.registerAbility
local registerModifier = ____dota_ts_adapter.registerModifier
local _____sl_item_base = require("abilities.items._sl_item_base")
local SLItemBase = _____sl_item_base.SLItemBase
--- 巨人刚戒
-- <h1>被动：巨人行猎</h1>当一个敌方英雄在你的行猎范围内停留时间达到%stay_time%秒时，你会盯上他。%strike_debuff_dur%秒内，你的下一次攻击会对目标造成一次%strike_dmg%+%strike_dmg_hp_pct%%%装备者最大生命值的魔法伤害，并将这次伤害（原始伤害）的%dmg_to_hp_pct%%%转化为该装备的永久生命值，可无限叠加。<br><br>当目标脱离你的行猎范围时，你有%stay_stick_time%秒的时间重新靠近他。<br><br>对同一个目标在%strike_cooldown%秒内只能触发一次。<br><br>行猎范围：%radius%\n\n<h1>被动：巨人身躯</h1>你的最大生命值越高，体型越大。每%scale_hp_per_stack%生命值提升%scale_bonus%%%体型，最大提升%scald_bonus_max%%%
____exports.item_super_giant_ring = __TS__Class()
local item_super_giant_ring = ____exports.item_super_giant_ring
item_super_giant_ring.name = "item_super_giant_ring"
__TS__ClassExtends(item_super_giant_ring, SLItemBase)
function item_super_giant_ring.prototype.____constructor(self, ...)
	SLItemBase.prototype.____constructor(self, ...)
	self._manual_toggle_state = false
end
function item_super_giant_ring.prototype._GetGiantBless(self, source)
	local caster = self:GetCaster()
	if not IsValid(caster) or caster ~= source then
		return
	end
	local is_copy = caster:IsIllusion() or caster:IsClone()
	if is_copy or not caster:IsRealHero() then
		return
	end
	if not __TS__ArrayIncludes(caster:FindAllItemsBySlotType(2), self) then
		return
	end
	local bless = SLModules.Bless:GetBlessById(caster:GetPlayerOwnerID(), "10237")
	local ____temp_2
	local ____bless_IsValid_result_0 = bless
	if ____bless_IsValid_result_0 ~= nil then
		____bless_IsValid_result_0 = ____bless_IsValid_result_0:IsValid()
	end
	if ____bless_IsValid_result_0 and bless:GetAssignedHero() == caster then
		____temp_2 = bless
	else
		____temp_2 = nil
	end
	return ____temp_2
end
function item_super_giant_ring.prototype.GetHuntChargeDuration(self, source)
	if source == nil then
		source = self:GetCaster()
	end
	local base = self:GetSpecialValueFor("stay_time")
	local ____table__GetGiantBless_result_GetChargeDuration_result_3 = self:_GetGiantBless(source)
	if ____table__GetGiantBless_result_GetChargeDuration_result_3 ~= nil then
		____table__GetGiantBless_result_GetChargeDuration_result_3 =
			____table__GetGiantBless_result_GetChargeDuration_result_3:GetChargeDuration(base)
	end
	local ____table__GetGiantBless_result_GetChargeDuration_result_3_5 =
		____table__GetGiantBless_result_GetChargeDuration_result_3
	if ____table__GetGiantBless_result_GetChargeDuration_result_3_5 == nil then
		____table__GetGiantBless_result_GetChargeDuration_result_3_5 = base
	end
	return ____table__GetGiantBless_result_GetChargeDuration_result_3_5
end
function item_super_giant_ring.prototype.GetHuntStrikeCooldown(self, source)
	if source == nil then
		source = self:GetCaster()
	end
	local base = self:GetSpecialValueFor("strike_cooldown")
	local ____table__GetGiantBless_result_GetStrikeCooldown_result_6 = self:_GetGiantBless(source)
	if ____table__GetGiantBless_result_GetStrikeCooldown_result_6 ~= nil then
		____table__GetGiantBless_result_GetStrikeCooldown_result_6 =
			____table__GetGiantBless_result_GetStrikeCooldown_result_6:GetStrikeCooldown(base)
	end
	local ____table__GetGiantBless_result_GetStrikeCooldown_result_6_8 =
		____table__GetGiantBless_result_GetStrikeCooldown_result_6
	if ____table__GetGiantBless_result_GetStrikeCooldown_result_6_8 == nil then
		____table__GetGiantBless_result_GetStrikeCooldown_result_6_8 = base
	end
	return ____table__GetGiantBless_result_GetStrikeCooldown_result_6_8
end
function item_super_giant_ring.prototype.GetHuntDamageMultiplier(self, source)
	if source == nil then
		source = self:GetCaster()
	end
	local ____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9 = self:_GetGiantBless(source)
	if ____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9 ~= nil then
		____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9 =
			____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9:GetStrikeDamageMultiplier()
	end
	local ____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9_11 =
		____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9
	if ____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9_11 == nil then
		____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9_11 = 1
	end
	return ____table__GetGiantBless_result_GetStrikeDamageMultiplier_result_9_11
end
function item_super_giant_ring.prototype.GetIntrinsicModifierName(self)
	return sl_modifier_item_super_giant_ring.name
end
function item_super_giant_ring.prototype.GetAOERadius(self)
	return self:GetSpecialValueFor("radius")
end
function item_super_giant_ring.prototype.OnSpellStart(self)
	self._manual_toggle_state = not self._manual_toggle_state
	self:SetSecondaryCharges(self._manual_toggle_state and 1 or 0)
end
function item_super_giant_ring.prototype.GetAbilityTextureName(self)
	if self:GetSecondaryCharges() == 1 then
		return "item_super_giant_ring_magic"
	end
	return "item_super_giant_ring"
end
item_super_giant_ring = __TS__Decorate({ registerAbility(nil, nil, getfenv()) }, item_super_giant_ring)
____exports.item_super_giant_ring = item_super_giant_ring
sl_modifier_item_super_giant_ring = __TS__Class()
sl_modifier_item_super_giant_ring.name = "sl_modifier_item_super_giant_ring"
__TS__ClassExtends(sl_modifier_item_super_giant_ring, SLModifier_ItemIntrinsic)
function sl_modifier_item_super_giant_ring.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_STATS_STRENGTH_BONUS, MODIFIER_PROPERTY_HEALTH_BONUS, MODIFIER_PROPERTY_MODEL_SCALE }
end
function sl_modifier_item_super_giant_ring.prototype.OnCreated(self, params)
	self._scale_hp_per_stack = self:GetAbilitySpecialValueFor("scale_hp_per_stack")
	self._scale_bonus = self:GetAbilitySpecialValueFor("scale_bonus")
	self._scald_bonus_max = self:GetAbilitySpecialValueFor("scald_bonus_max")
	self:StartIntervalThink(1)
end
function sl_modifier_item_super_giant_ring.prototype.OnIntervalThink(self)
	local parent = self:GetParent()
	local health = parent:GetMaxHealth()
	self._scale = math.min(health / self._scale_hp_per_stack * self._scale_bonus, self._scald_bonus_max)
end
function sl_modifier_item_super_giant_ring.prototype.GetModifierModelScale(self)
	return self._scale
end
function sl_modifier_item_super_giant_ring.prototype.GetModifierBonusStats_Strength(self)
	return self:GetAbilitySpecialValueFor("bonus_strength")
end
function sl_modifier_item_super_giant_ring.prototype.GetModifierHealthBonus(self)
	local ability = self:GetAbility()
	local base = ability:GetSpecialValueFor("bonus_hp")
	if ability:IsItem() then
		base = base + ability:GetCurrentCharges()
	end
	return base
end
function sl_modifier_item_super_giant_ring.prototype.IsAura(self)
	return true
end
function sl_modifier_item_super_giant_ring.prototype.GetAuraRadius(self)
	return self:GetAbilitySpecialValueFor("radius")
end
function sl_modifier_item_super_giant_ring.prototype.GetAuraDuration(self)
	return self:GetAbilitySpecialValueFor("stay_stick_time")
end
function sl_modifier_item_super_giant_ring.prototype.GetAuraSearchFlags(self)
	return DOTA_UNIT_TARGET_FLAG_NONE + DOTA_UNIT_TARGET_FLAG_NO_INVIS
end
function sl_modifier_item_super_giant_ring.prototype.GetAuraSearchTeam(self)
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function sl_modifier_item_super_giant_ring.prototype.GetAuraSearchType(self)
	return DOTA_UNIT_TARGET_HERO
end
function sl_modifier_item_super_giant_ring.prototype.GetModifierAura(self)
	return sl_modifier_item_super_giant_ring_aura_check_debuff.name
end
function sl_modifier_item_super_giant_ring.prototype.IsAuraActiveOnDeath(self)
	return false
end
function sl_modifier_item_super_giant_ring.prototype.GetAuraEntityReject(self, entity)
	if not self:IsLatestSource() then
		return true
	end
	if not IsValidAlive(entity) or not entity:IsRealHero() then
		return true
	end
	local caster = self:GetCaster()
	if caster:IsIllusion() then
		return true
	end
	local strike_debuff = entity:FindSLModifier(sl_modifier_item_super_giant_ring_strike_debuff, caster)
	if IsValid(strike_debuff) then
		return true
	end
	local cooldown_debuff = entity:FindSLModifier(sl_modifier_item_super_giant_ring_strike_cooldown_debuff, caster)
	if IsValid(cooldown_debuff) then
		return true
	end
	return false
end
sl_modifier_item_super_giant_ring = __TS__Decorate(
	{ registerModifier(nil, "abilities/items/item_super_giant_ring", nil, getfenv()) },
	sl_modifier_item_super_giant_ring
)
--- 巨人刚戒检测光环debuff
sl_modifier_item_super_giant_ring_aura_check_debuff = __TS__Class()
sl_modifier_item_super_giant_ring_aura_check_debuff.name = "sl_modifier_item_super_giant_ring_aura_check_debuff"
__TS__ClassExtends(sl_modifier_item_super_giant_ring_aura_check_debuff, SLModifierBase_Debuff)
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.____constructor(self, ...)
	SLModifierBase_Debuff.prototype.____constructor(self, ...)
	self._progress_sound_steps = 4
	self._progress_sound_steps_record = {}
	self._pid_progress = 0
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.IsHidden(self)
	return false
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.GetTexture(self)
	return self:GetCaster():GetName()
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.IsPurgable(self)
	return false
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.IsPurgeException(self)
	return false
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.OnCreated(self, params)
	if not IsServer() then
		return
	end
	self._interval = 0.33
	self._time_count = 0
	self._last_remain_time = self:GetRemainingTime()
	self:StartIntervalThink(self._interval)
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.OnIntervalThink(self)
	if not IsValid(self:GetAbility()) then
		return
	end
	local parent = self:GetParent()
	local remain_time = self:GetRemainingTime()
	local last_remain_time = self._last_remain_time
	self._last_remain_time = remain_time
	local strike_debuff_need = self:GetAbility():GetHuntChargeDuration(self:GetCaster())
	local progress_before = 100 - (strike_debuff_need - self._time_count) / strike_debuff_need * 100
	if remain_time < last_remain_time then
		self:_UpdateProgressParticle(progress_before, true)
		return
	end
	self._time_count = self._time_count + self._interval
	local progress_after = 100 - (strike_debuff_need - self._time_count) / strike_debuff_need * 100
	local sound_step = math.floor(self._progress_sound_steps * progress_after / 100)
	if sound_step > 0 and not self._progress_sound_steps_record[sound_step] then
		self._progress_sound_steps_record[sound_step] = true
		local volume = 1.25 + sound_step * 1.75
		local pitch = sound_step >= self._progress_sound_steps and 3 or 1
		parent:EmitSoundParams("item_super_giant_ring.step", pitch, volume, 0)
	end
	if self._time_count >= strike_debuff_need then
		if IsValidAlive(parent) then
			parent:AddSLModifier(sl_modifier_item_super_giant_ring_strike_debuff, {
				ability = self:GetAbility(),
				caster = self:GetCaster(),
				duration = self:GetAbilitySpecialValueFor("strike_debuff_dur"),
				no_error = true,
			})
		end
		self:StartIntervalThink(-1)
		self:Destroy()
	else
		self:_UpdateProgressParticle(progress_after, false)
	end
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype.OnDestroy(self)
	self:_RemoveProgressParticle()
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype._UpdateProgressParticle(self, progress, out)
	local caster = self:GetCaster()
	local parent = self:GetParent()
	if not self._progress_pid then
		self._progress_pid = self:CreateParticleForPlayer(
			ITEM_PARTICLES.item_hunter_marklink,
			PATTACH_ABSORIGIN_FOLLOW,
			caster,
			caster:GetFixedPlayerOwner()
		)
		self:SetParticleControlEnt(self._progress_pid, 7, parent, PATTACH_ABSORIGIN_FOLLOW, nil)
		self:SetParticleControl(self._progress_pid, 4, Vector(0, 0, 0))
	end
	if self._pid_progress ~= progress then
		self._pid_progress = progress
		self:SetParticleControl(self._progress_pid, 2, Vector(self._pid_progress, 0, 0))
	end
	if self._is_out == nil or out ~= nil and out ~= self._is_out then
		self._is_out = out
		local set_out_value = out and 1 or 0
		self:SetParticleControl(self._progress_pid, 3, Vector(set_out_value, 0, 0))
	end
end
function sl_modifier_item_super_giant_ring_aura_check_debuff.prototype._RemoveProgressParticle(self)
	if self._progress_pid then
		self:DestroyParticle(self._progress_pid, true)
		self._progress_pid = nil
	end
end
sl_modifier_item_super_giant_ring_aura_check_debuff = __TS__Decorate(
	{ registerModifier(nil, "abilities/items/item_super_giant_ring", nil, getfenv()) },
	sl_modifier_item_super_giant_ring_aura_check_debuff
)
--- 巨人刚戒额外伤害debuff
sl_modifier_item_super_giant_ring_strike_debuff = __TS__Class()
sl_modifier_item_super_giant_ring_strike_debuff.name = "sl_modifier_item_super_giant_ring_strike_debuff"
__TS__ClassExtends(sl_modifier_item_super_giant_ring_strike_debuff, SLModifierBase_Debuff)
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.IsPurgable(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.IsPurgeException(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.IsHidden(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.GetTexture(self)
	return self:GetCaster():GetName()
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.DeclareFunctions(self)
	return { MODIFIER_EVENT_ON_ATTACK_LANDED }
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.OnCreated(self, params)
	if not IsServer() then
		return
	end
	local caster = self:GetCaster()
	local parent = self:GetParent()
	local pid = self:CreateParticleForPlayer(
		ITEM_PARTICLES.item_hunter_marklink,
		PATTACH_ABSORIGIN_FOLLOW,
		caster,
		caster:GetFixedPlayerOwner()
	)
	self:SetParticleControl(pid, 2, Vector(100, 0, 0))
	self:SetParticleControl(pid, 3, Vector(1, 0, 0))
	self:SetParticleControl(pid, 4, Vector(1, 0, 0))
	self:SetParticleControlEnt(pid, 7, parent, PATTACH_ABSORIGIN_FOLLOW, nil)
	self:AddParticle(pid, false, false, 1, false, false)
end
function sl_modifier_item_super_giant_ring_strike_debuff.prototype.OnAttackLanded(self, event)
	if not IsServer() then
		return
	end
	local ____event_12 = event
	local attacker = ____event_12.attacker
	local target = ____event_12.target
	if not IsValidAlive(attacker) or not IsValidAlive(target) then
		return
	end
	local parent = self:GetParent()
	local caster = self:GetCaster()
	if target == parent and attacker == caster then
		local strike_dmg = self:GetAbilitySpecialValueFor("strike_dmg")
		local strike_dmg_hp_pct = self:GetAbilitySpecialValueFor("strike_dmg_hp_pct")
		local caster_hp_max = caster:GetMaxHealth()
		local total_dmg = strike_dmg + caster_hp_max * strike_dmg_hp_pct * 0.01
		local item = self:GetAbility()
		local dmg_to_hp_pct = self:GetAbilitySpecialValueFor("dmg_to_hp_pct")
		local bonus_hp = math.floor(total_dmg * dmg_to_hp_pct * 0.01)
		local ____GlobalAttrManager_15 = GlobalAttrManager
		local ____GlobalAttrManager_Get_16 = GlobalAttrManager.Get
		local ____item_GetCaster_result_GetPlayerOwnerID_result_13 = item:GetCaster()
		if ____item_GetCaster_result_GetPlayerOwnerID_result_13 ~= nil then
			____item_GetCaster_result_GetPlayerOwnerID_result_13 =
				____item_GetCaster_result_GetPlayerOwnerID_result_13:GetPlayerOwnerID()
		end
		local attr_manager =
			____GlobalAttrManager_Get_16(____GlobalAttrManager_15, ____item_GetCaster_result_GetPlayerOwnerID_result_13)
		local ____temp_17 = attr_manager and attr_manager:GetAttr("gangpct")
		if ____temp_17 == nil then
			____temp_17 = 0
		end
		local extra_pct = ____temp_17
		local bonus_chargets = bonus_hp * (1 + extra_pct / 100)
		item:SetCurrentCharges(item:GetCurrentCharges() + bonus_chargets)
		caster:CalculateStatBonus(true)
		local particle_path = item:GetSecondaryCharges() == 1 and ITEM_PARTICLES.item_hunter_hit_magic
			or ITEM_PARTICLES.item_hunter_hit
		local hit_particle = self:CreateParticle(particle_path, PATTACH_CUSTOMORIGIN, nil)
		self:SetParticleControlEnt(hit_particle, 0, parent, PATTACH_POINT_FOLLOW, "attach_hitloc")
		self:SetParticleControlEnt(hit_particle, 1, caster, PATTACH_ABSORIGIN_FOLLOW, nil)
		target:EmitSound("item_super_giant_ring.hit")
		parent:AddSLModifier(sl_modifier_item_super_giant_ring_strike_cooldown_debuff, {
			ability = item,
			caster = caster,
			duration = item:GetHuntStrikeCooldown(caster),
			no_error = true,
		})
		local ____temp_18
		if item:GetSecondaryCharges() == 1 then
			____temp_18 = DAMAGE_TYPE_MAGICAL
		else
			____temp_18 = DAMAGE_TYPE_PHYSICAL
		end
		local dmg_type = ____temp_18
		ApplyDamage({
			attacker = caster,
			damage = total_dmg * item:GetHuntDamageMultiplier(caster),
			damage_type = dmg_type,
			victim = parent,
			ability = item,
		})
		self:Destroy()
	end
end
sl_modifier_item_super_giant_ring_strike_debuff = __TS__Decorate(
	{ registerModifier(nil, "abilities/items/item_super_giant_ring", nil, getfenv()) },
	sl_modifier_item_super_giant_ring_strike_debuff
)
--- 巨人刚戒冷却时间debuff
sl_modifier_item_super_giant_ring_strike_cooldown_debuff = __TS__Class()
sl_modifier_item_super_giant_ring_strike_cooldown_debuff.name =
	"sl_modifier_item_super_giant_ring_strike_cooldown_debuff"
__TS__ClassExtends(sl_modifier_item_super_giant_ring_strike_cooldown_debuff, SLModifierBase_Debuff)
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.IsPurgable(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.IsPurgeException(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.RemoveOnDeath(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.IsPermanent(self)
	return true
end
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.IsHidden(self)
	return false
end
function sl_modifier_item_super_giant_ring_strike_cooldown_debuff.prototype.GetTexture(self)
	return self:GetCaster():GetName()
end
sl_modifier_item_super_giant_ring_strike_cooldown_debuff = __TS__Decorate(
	{ registerModifier(nil, "abilities/items/item_super_giant_ring", nil, getfenv()) },
	sl_modifier_item_super_giant_ring_strike_cooldown_debuff
)
return ____exports