--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- modifiers/bless_modifiers/sl_modifier_bless_10236.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Decorate = ____lualib.__TS__Decorate
____debugRuntime.register(
	"modifiers/bless_modifiers/sl_modifier_bless_10236.lua",
	{
		["10"] = "2:1",
		["11"] = "2:10",
		["12"] = "3:1",
		["13"] = "3:10",
		["14"] = "3:26",
		["15"] = "3:49",
		["17"] = "6:1",
		["18"] = "7:14",
		["19"] = "6:1",
		["20"] = "7:45",
		["21"] = "10:5",
		["22"] = "11:9",
		["23"] = "10:5",
		["24"] = "14:5",
		["25"] = "15:9",
		["26"] = "14:5",
		["27"] = "18:5",
		["28"] = "19:9",
		["29"] = "18:5",
		["30"] = "22:5",
		["31"] = "23:9",
		["32"] = "22:5",
		["33"] = "26:5",
		["34"] = "27:9",
		["35"] = "26:5",
		["36"] = "30:5",
		["37"] = "31:13",
		["39"] = "31:112",
		["40"] = "31:112",
		["41"] = "31:112",
		["43"] = "31:13",
		["45"] = "31:13",
		["48"] = "32:13",
		["51"] = "33:9",
		["52"] = "30:5",
		["53"] = "7:14",
		["54"] = "6:2",
		["55"] = "6:2",
		["56"] = "6:19",
		["57"] = "6:2",
		["59"] = "6:2",
		["60"] = "7:14",
		["62"] = "7:14",
		["64"] = "38:1",
		["65"] = "39:14",
		["66"] = "38:1",
		["67"] = "39:43",
		["69"] = "39:51",
		["70"] = "44:5",
		["71"] = "45:5",
		["72"] = "46:5",
		["73"] = "47:5",
		["74"] = "38:1",
		["75"] = "50:5",
		["76"] = "51:9",
		["77"] = "50:5",
		["78"] = "64:5",
		["79"] = "65:9",
		["80"] = "66:9",
		["81"] = "67:9",
		["82"] = "68:9",
		["83"] = "69:9",
		["84"] = "70:14",
		["85"] = "71:13",
		["88"] = "74:9",
		["89"] = "64:5",
		["90"] = "77:5",
		["91"] = "78:9",
		["92"] = "77:5",
		["93"] = "81:5",
		["94"] = "82:9",
		["95"] = "81:5",
		["96"] = "85:5",
		["97"] = "86:9",
		["98"] = "85:5",
		["99"] = "89:5",
		["100"] = "90:14",
		["103"] = "91:14",
		["104"] = "91:14",
		["105"] = "91:14",
		["107"] = "91:14",
		["108"] = "92:13",
		["111"] = "95:15",
		["112"] = "96:13",
		["113"] = "97:13",
		["114"] = "98:15",
		["115"] = "100:16",
		["116"] = "101:19",
		["117"] = "102:19",
		["118"] = "102:44",
		["119"] = "102:89",
		["120"] = "102:26",
		["121"] = "103:17",
		["124"] = "104:13",
		["125"] = "105:13",
		["127"] = "107:13",
		["128"] = "108:13",
		["129"] = "109:13",
		["130"] = "110:18",
		["131"] = "111:17",
		["132"] = "112:17",
		["135"] = "115:13",
		["136"] = "115:55",
		["138"] = "89:5",
		["139"] = "118:5",
		["140"] = "119:13",
		["141"] = "119:25",
		["143"] = "118:5",
		["144"] = "122:5",
		["145"] = "123:14",
		["148"] = "124:15",
		["149"] = "125:13",
		["150"] = "126:13",
		["151"] = "127:17",
		["152"] = "127:30",
		["153"] = "127:52",
		["154"] = "127:60",
		["155"] = "127:83",
		["156"] = "127:30",
		["159"] = "129:13",
		["160"] = "129:43",
		["162"] = "130:9",
		["163"] = "130:9",
		["164"] = "130:9",
		["166"] = "122:5",
		["167"] = "39:14",
		["168"] = "38:2",
		["169"] = "38:2",
		["170"] = "38:19",
		["171"] = "38:2",
		["173"] = "38:2",
		["174"] = "39:14",
		["176"] = "39:14",
		["178"] = "136:1",
		["179"] = "137:14",
		["180"] = "136:1",
		["181"] = "137:43",
		["183"] = "137:51",
		["184"] = "140:5",
		["185"] = "141:5",
		["186"] = "142:5",
		["187"] = "136:1",
		["188"] = "144:5",
		["189"] = "145:13",
		["190"] = "145:25",
		["192"] = "144:5",
		["193"] = "148:5",
		["194"] = "149:9",
		["195"] = "150:9",
		["196"] = "151:33",
		["197"] = "151:33",
		["198"] = "151:71",
		["200"] = "151:115",
		["202"] = "151:9",
		["203"] = "152:9",
		["204"] = "153:9",
		["205"] = "148:5",
		["206"] = "156:5",
		["207"] = "157:9",
		["208"] = "156:5",
		["209"] = "160:5",
		["210"] = "161:9",
		["211"] = "160:5",
		["212"] = "164:5",
		["213"] = "165:9",
		["214"] = "164:5",
		["215"] = "169:5",
		["216"] = "170:9",
		["217"] = "169:5",
		["218"] = "173:5",
		["219"] = "174:13",
		["220"] = "174:25",
		["221"] = "174:25",
		["222"] = "174:25",
		["225"] = "173:5",
		["226"] = "180:5",
		["227"] = "181:9",
		["228"] = "180:5",
		["229"] = "184:5",
		["230"] = "185:9",
		["231"] = "184:5",
		["232"] = "188:5",
		["233"] = "189:9",
		["234"] = "188:5",
		["235"] = "192:5",
		["236"] = "193:9",
		["237"] = "192:5",
		["238"] = "196:5",
		["239"] = "197:9",
		["240"] = "198:9",
		["241"] = "199:9",
		["242"] = "196:5",
		["243"] = "137:14",
		["244"] = "136:2",
		["245"] = "136:2",
		["246"] = "136:19",
		["247"] = "136:2",
		["249"] = "136:2",
		["250"] = "137:14",
		["252"] = "137:14",
	}
)
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local registerModifier = ____dota_ts_adapter.registerModifier
local ____sl_modifier_base = require("modifiers.sl_modifier_base")
local SLModifierBase = ____sl_modifier_base.SLModifierBase
local SLModifierBase_Debuff = ____sl_modifier_base.SLModifierBase_Debuff
local SLModifierBase_MotionHorizontal = ____sl_modifier_base.SLModifierBase_MotionHorizontal
--- 在攻击指令被引擎接受时启动冲刺；自动攻击及 PerformAttack 不会生成此指令。
____exports.sl_modifier_bless_10236_orders = __TS__Class()
local sl_modifier_bless_10236_orders = ____exports.sl_modifier_bless_10236_orders
sl_modifier_bless_10236_orders.name = "sl_modifier_bless_10236_orders"
__TS__ClassExtends(sl_modifier_bless_10236_orders, SLModifierBase)
function sl_modifier_bless_10236_orders.prototype.SetSource(self, source)
	self._source = source
end
function sl_modifier_bless_10236_orders.prototype.IsHidden(self)
	return true
end
function sl_modifier_bless_10236_orders.prototype.IsPurgable(self)
	return false
end
function sl_modifier_bless_10236_orders.prototype.RemoveOnDeath(self)
	return false
end
function sl_modifier_bless_10236_orders.prototype.DeclareFunctions(self)
	return { MODIFIER_EVENT_ON_ORDER }
end
function sl_modifier_bless_10236_orders.prototype.OnOrder(self, event)
	local ____temp_2 = not IsServer()
		or event.unit ~= self:GetParent()
		or event.order_type ~= DOTA_UNIT_ORDER_ATTACK_TARGET
	if not ____temp_2 then
		local ____table__source_IsValid_result_0 = self._source
		if ____table__source_IsValid_result_0 ~= nil then
			____table__source_IsValid_result_0 = ____table__source_IsValid_result_0:IsValid()
		end
		____temp_2 = not ____table__source_IsValid_result_0
	end
	if ____temp_2 then
		return
	end
	if event.unit ~= self._source:GetAssignedHero() then
		return
	end
	self._source:OnAttackOrder(event.target)
end
sl_modifier_bless_10236_orders = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10236", nil, getfenv()) },
	sl_modifier_bless_10236_orders
)
____exports.sl_modifier_bless_10236_orders = sl_modifier_bless_10236_orders
--- 鲲鹏冲刺：直线逐段裁剪地形，实际位移后才施加减速和开始冷却。
____exports.sl_modifier_bless_10236_dash = __TS__Class()
local sl_modifier_bless_10236_dash = ____exports.sl_modifier_bless_10236_dash
sl_modifier_bless_10236_dash.name = "sl_modifier_bless_10236_dash"
__TS__ClassExtends(sl_modifier_bless_10236_dash, SLModifierBase_MotionHorizontal)
function sl_modifier_bless_10236_dash.prototype.____constructor(self, ...)
	SLModifierBase_MotionHorizontal.prototype.____constructor(self, ...)
	self._remaining = 0
	self._speed = 0
	self._controller_applied = false
	self._moved = false
end
function sl_modifier_bless_10236_dash.CanDash(self, unit)
	return IsValidAlive(unit)
		and not unit:IsOutOfGame()
		and not unit:IsStunned()
		and not unit:IsRooted()
		and not unit:IsHexed()
		and not unit:IsFeared()
		and not unit:IsFrozen()
		and not unit:IsTaunted()
		and not unit:IsCommandRestricted()
end
function sl_modifier_bless_10236_dash.prototype.Begin(self, source, target, direction, distance, speed)
	self._source = source
	self._target = target
	self._direction = direction
	self._remaining = distance
	self._speed = speed
	if
		not ____exports.sl_modifier_bless_10236_dash:CanDash(self:GetParent())
		or speed <= 0
		or not self:ApplyHorizontalMotionController()
	then
		self:Destroy()
		return
	end
	self._controller_applied = true
end
function sl_modifier_bless_10236_dash.prototype.IsHidden(self)
	return true
end
function sl_modifier_bless_10236_dash.prototype.IsPurgable(self)
	return false
end
function sl_modifier_bless_10236_dash.prototype.RemoveOnDeath(self)
	return true
end
function sl_modifier_bless_10236_dash.prototype.UpdateHorizontalMotion(self, parent, dt)
	if not IsServer() then
		return
	end
	local ____table__source_IsValid_result_3 = self._source
	if ____table__source_IsValid_result_3 ~= nil then
		____table__source_IsValid_result_3 = ____table__source_IsValid_result_3:IsValid()
	end
	if not ____table__source_IsValid_result_3 or not ____exports.sl_modifier_bless_10236_dash:CanDash(parent) then
		self:Destroy()
		return
	end
	local start = parent:GetAbsOrigin()
	local position = start
	local moved = 0
	local distance = math.min(self._remaining, self._speed * dt)
	while moved < distance do
		local step = math.min(16, distance - moved)
		local next = GetGroundPosition(position:__add(self._direction:__mul(step)), parent)
		if GridNav:IsBlocked(next) or not GridNav:IsTraversable(next) or math.abs(next.z - position.z) > 64 then
			break
		end
		position = next
		moved = moved + step
	end
	if moved > 0 then
		parent:SetAbsOrigin(position)
		self._remaining = self._remaining - moved
		if not self._moved then
			self._moved = true
			self._particle = self._source:OnDashMoved(self, self._target)
		end
	end
	if moved < distance or self._remaining <= 0 then
		self:Destroy()
	end
end
function sl_modifier_bless_10236_dash.prototype.OnHorizontalMotionInterrupted(self)
	if IsServer() then
		self:Destroy()
	end
end
function sl_modifier_bless_10236_dash.prototype.OnDestroy(self)
	if not IsServer() then
		return
	end
	local parent = self:GetParent()
	if IsValid(parent) and self._controller_applied then
		parent:RemoveHorizontalMotionController(self)
		if self._moved then
			FindClearSpaceForUnit(parent, parent:GetAbsOrigin(), false)
		end
	end
	if self._particle ~= nil then
		self:DestroyParticle(self._particle, true)
	end
	local ____table__source_OnDashFinished_result_5 = self._source
	if ____table__source_OnDashFinished_result_5 ~= nil then
		____table__source_OnDashFinished_result_5 = ____table__source_OnDashFinished_result_5:OnDashFinished(self)
	end
end
sl_modifier_bless_10236_dash = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10236", nil, getfenv()) },
	sl_modifier_bless_10236_dash
)
____exports.sl_modifier_bless_10236_dash = sl_modifier_bless_10236_dash
--- 鲲鹏减速和减疗共用一个实例，任务升级只修改属性及驱散资格，不延长剩余持续时间。
____exports.sl_modifier_bless_10236_slow = __TS__Class()
local sl_modifier_bless_10236_slow = ____exports.sl_modifier_bless_10236_slow
sl_modifier_bless_10236_slow.name = "sl_modifier_bless_10236_slow"
__TS__ClassExtends(sl_modifier_bless_10236_slow, SLModifierBase_Debuff)
function sl_modifier_bless_10236_slow.prototype.____constructor(self, ...)
	SLModifierBase_Debuff.prototype.____constructor(self, ...)
	self._slow_pct = 0
	self._heal_reduce_pct = 0
	self._unpurgable = false
end
function sl_modifier_bless_10236_slow.prototype.OnCreated(self)
	if IsServer() then
		self:SetHasCustomTransmitterData(true)
	end
end
function sl_modifier_bless_10236_slow.prototype.SetSource(self, source)
	self._source = source
	self._slow_pct = source:GetSpecialValue("slow_pct")
	local ____source_IsTaskActive_result_7
	if source:IsTaskActive("dash_attacks") then
		____source_IsTaskActive_result_7 = source:GetSpecialValue("heal_reduce_pct")
	else
		____source_IsTaskActive_result_7 = 0
	end
	self._heal_reduce_pct = ____source_IsTaskActive_result_7
	self._unpurgable = source:IsTaskActive("slow_kills")
	self:SendBuffRefreshToClients()
end
function sl_modifier_bless_10236_slow.prototype.GetAttributes(self)
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function sl_modifier_bless_10236_slow.prototype.IsPurgable(self)
	return not self._unpurgable
end
function sl_modifier_bless_10236_slow.prototype.IsPurgeException(self)
	return not self._unpurgable
end
function sl_modifier_bless_10236_slow.prototype.RemoveOnDeath(self)
	return false
end
function sl_modifier_bless_10236_slow.prototype.OnDestroy(self)
	if IsServer() then
		local ____table__source_OnSlowRemoved_result_8 = self._source
		if ____table__source_OnSlowRemoved_result_8 ~= nil then
			____table__source_OnSlowRemoved_result_8 = ____table__source_OnSlowRemoved_result_8:OnSlowRemoved(self)
		end
	end
end
function sl_modifier_bless_10236_slow.prototype.DeclareFunctions(self)
	return { MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE, MODIFIER_PROPERTY_HEAL_AMPLIFY_PERCENTAGE_TARGET }
end
function sl_modifier_bless_10236_slow.prototype.GetModifierMoveSpeedBonus_Percentage(self)
	return -self._slow_pct
end
function sl_modifier_bless_10236_slow.prototype.GetModifierHealAmplify_PercentageTarget(self)
	return -self._heal_reduce_pct
end
function sl_modifier_bless_10236_slow.prototype.AddCustomTransmitterData(self)
	return { slow = self._slow_pct, healing = self._heal_reduce_pct, unpurgable = self._unpurgable and 1 or 0 }
end
function sl_modifier_bless_10236_slow.prototype.HandleCustomTransmitterData(self, data)
	self._slow_pct = data.slow
	self._heal_reduce_pct = data.healing
	self._unpurgable = data.unpurgable == 1
end
sl_modifier_bless_10236_slow = __TS__Decorate(
	{ registerModifier(nil, "modifiers/bless_modifiers/sl_modifier_bless_10236", nil, getfenv()) },
	sl_modifier_bless_10236_slow
)
____exports.sl_modifier_bless_10236_slow = sl_modifier_bless_10236_slow
return ____exports