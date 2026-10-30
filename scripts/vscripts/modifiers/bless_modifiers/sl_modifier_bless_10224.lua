--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10224.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10224.lua",
	{
		["10"] = "1:1",
		["11"] = "1:10",
		["12"] = "2:1",
		["13"] = "2:10",
		["14"] = "5:1",
		["15"] = "6:14",
		["16"] = "5:1",
		["17"] = "6:38",
		["19"] = "6:46",
		["20"] = "7:5",
		["21"] = "8:5",
		["22"] = "5:1",
		["23"] = "10:5",
		["24"] = "11:9",
		["25"] = "10:5",
		["26"] = "14:5",
		["27"] = "6:46",
		["28"] = "16:14",
		["31"] = "17:9",
		["32"] = "18:9",
		["33"] = "19:9",
		["34"] = "14:5",
		["35"] = "22:5",
		["36"] = "23:15",
		["37"] = "24:15",
		["38"] = "24:33",
		["39"] = "24:36",
		["40"] = "24:24",
		["41"] = "25:9",
		["42"] = "26:13",
		["43"] = "26:26",
		["45"] = "27:14",
		["46"] = "27:33",
		["47"] = "27:56",
		["48"] = "27:31",
		["50"] = "22:5",
		["51"] = "6:14",
		["52"] = "5:2",
		["53"] = "5:2",
		["54"] = "5:19",
		["55"] = "5:2",
		["57"] = "5:2",
		["58"] = "6:14",
		["60"] = "6:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_simple = require("modifiers.game_modifiers.sl_modifier_simple")
local sl_modifier_shield_all = ____sl_modifier_simple.sl_modifier_shield_all
____exports.sl_modifier_bless_10224 = __TS__Class()
local sl_modifier_bless_10224 = ____exports.sl_modifier_bless_10224
sl_modifier_bless_10224.name = "sl_modifier_bless_10224"
__TS__ClassExtends(sl_modifier_bless_10224, sl_modifier_shield_all)
function sl_modifier_bless_10224.prototype.____constructor(self, ...)
	sl_modifier_shield_all.prototype.____constructor(self, ...)
	self._decay_per_second = 0
	self._last_tick = 0
end
function sl_modifier_bless_10224.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10224.prototype.OnCreated(self, params)
	sl_modifier_shield_all.prototype.OnCreated(self, params)
	if not IsServer() then
		return
	end
	self._decay_per_second = params.shield_amount_max / params.decay_duration
	self._last_tick = GameRules:GetGameTime()
	self:StartIntervalThink(0.1)
end
function sl_modifier_bless_10224.prototype.OnIntervalThink(self)
	local now = GameRules:GetGameTime()
	local amount = math.max(0, self:GetCurrentShieldAmount() - self._decay_per_second * (now - self._last_tick))
	self._last_tick = now
	if amount <= 0 then
		self:Destroy()
	else
		self:_ApplyParam({
			shield_amount = amount,
			shield_amount_max = self:GetMaxShieldAmount(),
		})
	end
end
sl_modifier_bless_10224 = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10224", nil, getfenv()) },
	sl_modifier_bless_10224
)
____exports.sl_modifier_bless_10224 = sl_modifier_bless_10224
return ____exports