--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10212.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10212.lua",
	{
		["11"] = "1:1",
		["12"] = "1:10",
		["13"] = "3:1",
		["14"] = "3:10",
		["15"] = "4:1",
		["16"] = "4:10",
		["18"] = "7:1",
		["19"] = "8:14",
		["20"] = "7:1",
		["21"] = "8:38",
		["23"] = "8:46",
		["24"] = "9:5",
		["25"] = "7:1",
		["26"] = "13:5",
		["27"] = "14:9",
		["28"] = "13:5",
		["29"] = "17:5",
		["30"] = "18:14",
		["33"] = "19:9",
		["34"] = "20:9",
		["35"] = "17:5",
		["36"] = "23:5",
		["37"] = "24:14",
		["40"] = "25:14",
		["43"] = "27:27",
		["45"] = "27:50",
		["46"] = "27:50",
		["47"] = "27:50",
		["49"] = "27:27",
		["51"] = "28:29",
		["53"] = "28:54",
		["54"] = "28:54",
		["55"] = "28:54",
		["57"] = "28:29",
		["59"] = "26:9",
		["60"] = "30:9",
		["61"] = "23:5",
		["62"] = "33:5",
		["63"] = "34:14",
		["66"] = "35:9",
		["67"] = "36:9",
		["68"] = "33:5",
		["69"] = "40:5",
		["70"] = "41:21",
		["71"] = "41:33",
		["72"] = "41:44",
		["73"] = "41:44",
		["74"] = "41:44",
		["76"] = "41:44",
		["78"] = "41:44",
		["80"] = "41:15",
		["81"] = "41:30",
		["82"] = "41:33",
		["83"] = "41:21",
		["84"] = "42:15",
		["85"] = "43:9",
		["86"] = "44:17",
		["87"] = "45:17",
		["90"] = "48:9",
		["91"] = "40:5",
		["92"] = "51:5",
		["93"] = "52:9",
		["94"] = "53:17",
		["98"] = "55:9",
		["99"] = "55:9",
		["100"] = "56:9",
		["101"] = "57:15",
		["102"] = "58:13",
		["103"] = "59:13",
		["105"] = "51:5",
		["106"] = "64:5",
		["107"] = "65:9",
		["108"] = "66:9",
		["109"] = "64:5",
		["110"] = "69:5",
		["111"] = "70:15",
		["112"] = "71:14",
		["115"] = "72:9",
		["116"] = "73:17",
		["120"] = "75:15",
		["121"] = "79:13",
		["122"] = "80:13",
		["124"] = "69:5",
		["125"] = "84:5",
		["126"] = "85:15",
		["127"] = "86:14",
		["130"] = "87:9",
		["131"] = "88:13",
		["133"] = "84:5",
		["134"] = "92:5",
		["135"] = "93:9",
		["136"] = "94:26",
		["137"] = "94:26",
		["138"] = "94:26",
		["140"] = "94:26",
		["142"] = "94:26",
		["144"] = "94:15",
		["145"] = "95:9",
		["146"] = "95:48",
		["147"] = "95:58",
		["148"] = "96:18",
		["149"] = "96:33",
		["151"] = "97:13",
		["152"] = "98:13",
		["153"] = "95:58",
		["154"] = "95:29",
		["155"] = "92:5",
		["156"] = "102:5",
		["157"] = "103:13",
		["158"] = "104:13",
		["160"] = "106:9",
		["161"] = "102:5",
		["162"] = "109:5",
		["163"] = "110:13",
		["166"] = "111:15",
		["167"] = "112:15",
		["168"] = "113:9",
		["169"] = "114:15",
		["170"] = "115:14",
		["173"] = "116:9",
		["174"] = "117:17",
		["175"] = "118:17",
		["179"] = "109:5",
		["180"] = "8:14",
		["181"] = "7:2",
		["182"] = "7:2",
		["183"] = "7:19",
		["184"] = "7:2",
		["186"] = "7:2",
		["187"] = "8:14",
		["189"] = "8:14",
		["191"] = "126:1",
		["192"] = "127:14",
		["193"] = "126:1",
		["194"] = "127:43",
		["195"] = "128:5",
		["196"] = "129:9",
		["197"] = "128:5",
		["198"] = "132:5",
		["199"] = "133:9",
		["200"] = "132:5",
		["201"] = "136:5",
		["202"] = "137:9",
		["203"] = "136:5",
		["204"] = "140:5",
		["205"] = "141:9",
		["206"] = "140:5",
		["207"] = "144:5",
		["208"] = "145:9",
		["209"] = "144:5",
		["210"] = "148:5",
		["211"] = "127:51",
		["212"] = "150:14",
		["215"] = "151:9",
		["216"] = "151:28",
		["217"] = "151:28",
		["218"] = "151:28",
		["220"] = "151:28",
		["222"] = "151:28",
		["224"] = "151:9",
		["225"] = "148:5",
		["226"] = "154:5",
		["227"] = "155:16",
		["228"] = "155:16",
		["229"] = "155:16",
		["231"] = "155:16",
		["233"] = "155:16",
		["235"] = "155:9",
		["236"] = "154:5",
		["237"] = "158:5",
		["238"] = "159:9",
		["239"] = "158:5",
		["240"] = "162:5",
		["241"] = "163:9",
		["242"] = "162:5",
		["243"] = "127:14",
		["244"] = "126:2",
		["245"] = "126:2",
		["246"] = "126:19",
		["247"] = "126:2",
		["249"] = "126:2",
		["250"] = "127:14",
		["252"] = "127:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_simple = require("modifiers.game_modifiers.sl_modifier_simple")
local sl_modifier_transmitter_data = ____sl_modifier_simple.sl_modifier_transmitter_data
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
--- 不屈逻辑管理（隐藏）；数字展示走独立 mark Buff
____exports.sl_modifier_bless_10212 = __TS__Class()
local sl_modifier_bless_10212 = ____exports.sl_modifier_bless_10212
sl_modifier_bless_10212.name = "sl_modifier_bless_10212"
__TS__ClassExtends(sl_modifier_bless_10212, SLModifierBase)
function sl_modifier_bless_10212.prototype.____constructor(self, ...)
	SLModifierBase.prototype.____constructor(self, ...)
	self._numbers = {}
end
function sl_modifier_bless_10212.prototype.IsHidden(self)
	return true
end
function sl_modifier_bless_10212.prototype.OnCreated(self, params)
	if not IsServer() then
		return
	end
	self._params = params
	self:_StartClearLoop()
end
function sl_modifier_bless_10212.prototype.OnRefresh(self, params)
	if not IsServer() then
		return
	end
	if not params then
		return
	end
	local ____params_debuff_count_2 = params.debuff_count
	if ____params_debuff_count_2 == nil then
		local ____table__params_debuff_count_0 = self._params
		if ____table__params_debuff_count_0 ~= nil then
			____table__params_debuff_count_0 = ____table__params_debuff_count_0.debuff_count
		end
		____params_debuff_count_2 = ____table__params_debuff_count_0
	end
	local ____params_clear_interval_5 = params.clear_interval
	if ____params_clear_interval_5 == nil then
		local ____table__params_clear_interval_3 = self._params
		if ____table__params_clear_interval_3 ~= nil then
			____table__params_clear_interval_3 = ____table__params_clear_interval_3.clear_interval
		end
		____params_clear_interval_5 = ____table__params_clear_interval_3
	end
	self._params = { debuff_count = ____params_debuff_count_2, clear_interval = ____params_clear_interval_5 }
	self:_StartClearLoop()
end
function sl_modifier_bless_10212.prototype.OnDestroy(self)
	if not IsServer() then
		return
	end
	self:_StopClearLoop()
	self:_DestroyAllMarks()
end
function sl_modifier_bless_10212.prototype.TryRollLethalImmune(self)
	local ____math_max_10 = math.max
	local ____math_floor_9 = math.floor
	local ____table__params_debuff_count_6 = self._params
	if ____table__params_debuff_count_6 ~= nil then
		____table__params_debuff_count_6 = ____table__params_debuff_count_6.debuff_count
	end
	local ____table__params_debuff_count_6_8 = ____table__params_debuff_count_6
	if ____table__params_debuff_count_6_8 == nil then
		____table__params_debuff_count_6_8 = 1
	end
	local max = ____math_max_10(1, ____math_floor_9(____table__params_debuff_count_6_8))
	local num = RandomInt(1, max)
	for ____, exist in ipairs(self._numbers) do
		if exist == num then
			return { immune = false, number = num }
		end
	end
	return { immune = true, number = num }
end
function sl_modifier_bless_10212.prototype.CommitNumber(self, num)
	for ____, exist in ipairs(self._numbers) do
		if exist == num then
			return
		end
	end
	local ____self__numbers_11 = self._numbers
	____self__numbers_11[#____self__numbers_11 + 1] = num
	self:_AddMarkModifier(num)
	local parent = self:GetParent()
	if IsValid(parent) then
		EmitSoundOn("bless_10212", parent)
	end
end
function sl_modifier_bless_10212.prototype.ClearAllNumbers(self)
	self._numbers = {}
	self:_DestroyAllMarks()
end
function sl_modifier_bless_10212.prototype._AddMarkModifier(self, num)
	local parent = self:GetParent()
	if not IsValid(parent) then
		return
	end
	for ____, mod in ipairs(parent:FindAllSLModifiers(____exports.sl_modifier_bless_10212_mark, parent)) do
		if mod:GetMarkNumber() == num then
			return
		end
	end
	local mark = parent:AddSLModifier(
		____exports.sl_modifier_bless_10212_mark,
		{ caster = parent, modifierTable = { mark = num, update_data = 1 } }
	)
	if IsValid(mark) then
		mark:SetStackCount(num)
	end
end
function sl_modifier_bless_10212.prototype._DestroyAllMarks(self)
	local parent = self:GetParent()
	if not IsValid(parent) then
		return
	end
	for ____, mod in ipairs(parent:FindAllSLModifiers(____exports.sl_modifier_bless_10212_mark, parent)) do
		mod:Destroy()
	end
end
function sl_modifier_bless_10212.prototype._StartClearLoop(self)
	self:_StopClearLoop()
	local ____table__params_clear_interval_12 = self._params
	if ____table__params_clear_interval_12 ~= nil then
		____table__params_clear_interval_12 = ____table__params_clear_interval_12.clear_interval
	end
	local ____table__params_clear_interval_12_14 = ____table__params_clear_interval_12
	if ____table__params_clear_interval_12_14 == nil then
		____table__params_clear_interval_12_14 = 1
	end
	local interval = ____table__params_clear_interval_12_14
	self._clear_timer = Timers:CreateTimer(interval, function()
		if not IsValid(self) then
			return nil
		end
		self:_ClearOneNumber()
		return interval
	end)
end
function sl_modifier_bless_10212.prototype._StopClearLoop(self)
	if self._clear_timer and Timers:IsValid(self._clear_timer) then
		Timers:RemoveTimer(self._clear_timer)
	end
	self._clear_timer = nil
end
function sl_modifier_bless_10212.prototype._ClearOneNumber(self)
	if #self._numbers == 0 then
		return
	end
	local idx = RandomInt(0, #self._numbers - 1)
	local removed = self._numbers[idx + 1]
	__TS__ArraySplice(self._numbers, idx, 1)
	local parent = self:GetParent()
	if not IsValid(parent) then
		return
	end
	for ____, mod in ipairs(parent:FindAllSLModifiers(____exports.sl_modifier_bless_10212_mark, parent)) do
		if mod:GetMarkNumber() == removed then
			mod:Destroy()
			break
		end
	end
end
sl_modifier_bless_10212 = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10212", nil, getfenv()) },
	sl_modifier_bless_10212
)
____exports.sl_modifier_bless_10212 = sl_modifier_bless_10212
--- 单个不屈数字的独立显示 Buff
____exports.sl_modifier_bless_10212_mark = __TS__Class()
local sl_modifier_bless_10212_mark = ____exports.sl_modifier_bless_10212_mark
sl_modifier_bless_10212_mark.name = "sl_modifier_bless_10212_mark"
__TS__ClassExtends(sl_modifier_bless_10212_mark, sl_modifier_transmitter_data)
function sl_modifier_bless_10212_mark.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10212_mark.prototype.IsHidden(self)
	return false
end
function sl_modifier_bless_10212_mark.prototype.IsDebuff(self)
	return true
end
function sl_modifier_bless_10212_mark.prototype.RemoveOnDeath(self)
	return false
end
function sl_modifier_bless_10212_mark.prototype.GetTexture(self)
	return "buff/bless/10212"
end
function sl_modifier_bless_10212_mark.prototype.OnCreated(self, params)
	sl_modifier_transmitter_data.prototype.OnCreated(self, params)
	if not IsServer() then
		return
	end
	local ____self_SetStackCount_18 = self.SetStackCount
	local ____params_mark_15 = params
	if ____params_mark_15 ~= nil then
		____params_mark_15 = ____params_mark_15.mark
	end
	local ____params_mark_15_17 = ____params_mark_15
	if ____params_mark_15_17 == nil then
		____params_mark_15_17 = 0
	end
	____self_SetStackCount_18(self, ____params_mark_15_17)
end
function sl_modifier_bless_10212_mark.prototype.GetMarkNumber(self)
	local ____table__params_mark_19 = self._params
	if ____table__params_mark_19 ~= nil then
		____table__params_mark_19 = ____table__params_mark_19.mark
	end
	local ____table__params_mark_19_21 = ____table__params_mark_19
	if ____table__params_mark_19_21 == nil then
		____table__params_mark_19_21 = self:GetStackCount()
	end
	return ____table__params_mark_19_21
end
function sl_modifier_bless_10212_mark.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_TOOLTIP }
end
function sl_modifier_bless_10212_mark.prototype.OnTooltip(self)
	return self:GetMarkNumber()
end
sl_modifier_bless_10212_mark = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10212", nil, getfenv()) },
	sl_modifier_bless_10212_mark
)
____exports.sl_modifier_bless_10212_mark = sl_modifier_bless_10212_mark
return ____exports