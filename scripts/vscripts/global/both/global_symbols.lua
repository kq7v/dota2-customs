--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


-- global/both/global_symbols.lua
local ____debugRuntime = require("utils.debug_runtime")
local debug = ____debugRuntime.safe_debug
local ____lualib = require("lualib_bundle")
local __TS__Symbol = ____lualib.__TS__Symbol
local Symbol = ____lualib.Symbol
____debugRuntime.register(
	"global/both/global_symbols.lua",
	{
		["8"] = "1:11",
		["10"] = "3:49",
		["12"] = "3:49",
		["15"] = "1:11",
		["16"] = "5:50",
		["18"] = "5:50",
		["21"] = "1:11",
		["22"] = "7:48",
		["24"] = "7:48",
		["27"] = "1:11",
		["28"] = "9:54",
		["30"] = "9:54",
		["33"] = "1:11",
		["34"] = "11:50",
		["36"] = "11:50",
		["39"] = "1:11",
		["40"] = "13:53",
		["42"] = "13:53",
		["45"] = "1:11",
		["46"] = "15:54",
		["48"] = "15:54",
		["51"] = "1:11",
		["52"] = "17:59",
		["54"] = "17:59",
		["57"] = "1:11",
		["58"] = "19:53",
		["60"] = "19:53",
		["63"] = "1:11",
		["64"] = "21:56",
		["66"] = "21:56",
		["69"] = "1:11",
		["71"] = "23:11",
		["73"] = "27:56",
		["75"] = "27:56",
		["78"] = "23:11",
		["80"] = "34:11",
		["82"] = "36:52",
		["84"] = "36:52",
		["87"] = "34:11",
		["88"] = "39:9",
		["90"] = "39:9",
		["93"] = "34:11",
		["94"] = "42:9",
		["96"] = "42:9",
		["99"] = "34:11",
		["100"] = "44:59",
		["102"] = "44:59",
		["105"] = "34:11",
		["106"] = "46:58",
		["108"] = "46:58",
		["111"] = "34:11",
		["112"] = "48:53",
		["114"] = "48:53",
		["117"] = "34:11",
		["118"] = "50:58",
		["120"] = "50:58",
		["123"] = "34:11",
		["124"] = "52:54",
		["126"] = "52:54",
		["129"] = "34:11",
		["130"] = "54:59",
		["132"] = "54:59",
		["135"] = "34:11",
		["136"] = "56:9",
		["138"] = "56:9",
		["140"] = "34:11",
		["141"] = "58:64",
		["143"] = "58:64",
		["146"] = "34:11",
		["147"] = "61:9",
		["149"] = "61:9",
		["152"] = "34:11",
		["153"] = "64:9",
		["155"] = "64:9",
		["158"] = "34:11",
		["160"] = "67:11",
		["162"] = "69:53",
		["164"] = "69:53",
		["167"] = "67:11",
		["168"] = "71:48",
		["170"] = "71:48",
		["173"] = "67:11",
		["174"] = "73:58",
		["176"] = "73:58",
		["179"] = "67:11",
	}
)
HeroSymbols = HeroSymbols or {}
do
	local ____HeroSymbols_MidDeathState_0 = HeroSymbols.MidDeathState
	if ____HeroSymbols_MidDeathState_0 == nil then
		____HeroSymbols_MidDeathState_0 = __TS__Symbol("MidDeathState")
	end
	--- 本条生命的死亡处理与幽魂监控状态，由 MidMap 管理。
	HeroSymbols.MidDeathState = ____HeroSymbols_MidDeathState_0
	local ____HeroSymbols_IsAssignedHero_1 = HeroSymbols.IsAssignedHero
	if ____HeroSymbols_IsAssignedHero_1 == nil then
		____HeroSymbols_IsAssignedHero_1 = __TS__Symbol("IsAssignedHero")
	end
	--- 是否是注册的英雄 boolean
	HeroSymbols.IsAssignedHero = ____HeroSymbols_IsAssignedHero_1
	local ____HeroSymbols_IsMonkeyArmy_2 = HeroSymbols.IsMonkeyArmy
	if ____HeroSymbols_IsMonkeyArmy_2 == nil then
		____HeroSymbols_IsMonkeyArmy_2 = __TS__Symbol("IsMonkeyArmy")
	end
	--- 是否是猴子猴孙标识 boolean
	HeroSymbols.IsMonkeyArmy = ____HeroSymbols_IsMonkeyArmy_2
	local ____HeroSymbols_AllowIllusionBuffs_3 = HeroSymbols.AllowIllusionBuffs
	if ____HeroSymbols_AllowIllusionBuffs_3 == nil then
		____HeroSymbols_AllowIllusionBuffs_3 = __TS__Symbol("HeroAllowIllusionBuffs")
	end
	--- 英雄身上能被幻象继承的buff LuaTable<CDOTA_Buff, boolean>
	HeroSymbols.AllowIllusionBuffs = ____HeroSymbols_AllowIllusionBuffs_3
	local ____HeroSymbols_ChildIllusions_4 = HeroSymbols.ChildIllusions
	if ____HeroSymbols_ChildIllusions_4 == nil then
		____HeroSymbols_ChildIllusions_4 = __TS__Symbol("HeroChildIllusions")
	end
	--- 英雄直属子幻想（作为caster）LuaTable<CDOTA_BaseNPC_Hero,boolean>
	HeroSymbols.ChildIllusions = ____HeroSymbols_ChildIllusions_4
	local ____HeroSymbols_ChildIllusionsAll_5 = HeroSymbols.ChildIllusionsAll
	if ____HeroSymbols_ChildIllusionsAll_5 == nil then
		____HeroSymbols_ChildIllusionsAll_5 = __TS__Symbol("HeroChildIllusionsAll")
	end
	--- 英雄所有的子幻想，包括子幻想的子幻象 LuaTable<CDOTA_BaseNPC_Hero,boolean>
	HeroSymbols.ChildIllusionsAll = ____HeroSymbols_ChildIllusionsAll_5
	local ____HeroSymbols_IllusionSourceHero_6 = HeroSymbols.IllusionSourceHero
	if ____HeroSymbols_IllusionSourceHero_6 == nil then
		____HeroSymbols_IllusionSourceHero_6 = __TS__Symbol("IllusionParentHero")
	end
	--- 幻象的直属来源英雄 CDOTA_BaseNPC_Hero
	HeroSymbols.IllusionSourceHero = ____HeroSymbols_IllusionSourceHero_6
	local ____HeroSymbols_IllusionSourceHeroTrace_7 = HeroSymbols.IllusionSourceHeroTrace
	if ____HeroSymbols_IllusionSourceHeroTrace_7 == nil then
		____HeroSymbols_IllusionSourceHeroTrace_7 = __TS__Symbol("IllusionParentHeroTrace")
	end
	--- 幻象的最终来源英雄，一定是真英雄 CDOTA_BaseNPC_Hero
	HeroSymbols.IllusionSourceHeroTrace = ____HeroSymbols_IllusionSourceHeroTrace_7
	local ____HeroSymbols_IllusionLifeTimer_8 = HeroSymbols.IllusionLifeTimer
	if ____HeroSymbols_IllusionLifeTimer_8 == nil then
		____HeroSymbols_IllusionLifeTimer_8 = __TS__Symbol("HeroIllusionLifeTimer")
	end
	--- 幻象的生命周期计时器
	HeroSymbols.IllusionLifeTimer = ____HeroSymbols_IllusionLifeTimer_8
	local ____HeroSymbols_IllusionDestroyTimer_9 = HeroSymbols.IllusionDestroyTimer
	if ____HeroSymbols_IllusionDestroyTimer_9 == nil then
		____HeroSymbols_IllusionDestroyTimer_9 = __TS__Symbol("HeroIllusionDestroyTimer")
	end
	--- 幻象的删除计时器
	HeroSymbols.IllusionDestroyTimer = ____HeroSymbols_IllusionDestroyTimer_9
end
PlayerSymbols = PlayerSymbols or {}
do
	local ____PlayerSymbols_DebugIsReplacingHero_10 = PlayerSymbols.DebugIsReplacingHero
	if ____PlayerSymbols_DebugIsReplacingHero_10 == nil then
		____PlayerSymbols_DebugIsReplacingHero_10 = __TS__Symbol("PlayerReplacingHero")
	end
	--- 玩家正在替换英雄的标记 boolean
	PlayerSymbols.DebugIsReplacingHero = ____PlayerSymbols_DebugIsReplacingHero_10
end
UnitSymbols = UnitSymbols or {}
do
	local ____UnitSymbols_ZombieRemoveFlag_11 = UnitSymbols.ZombieRemoveFlag
	if ____UnitSymbols_ZombieRemoveFlag_11 == nil then
		____UnitSymbols_ZombieRemoveFlag_11 = __TS__Symbol("ZombieRemoveFlag")
	end
	--- boolean 小僵尸移除标记 boolean
	UnitSymbols.ZombieRemoveFlag = ____UnitSymbols_ZombieRemoveFlag_11
	local ____UnitSymbols_IsInAttackStartToLaunchFlow_12 = UnitSymbols.IsInAttackStartToLaunchFlow
	if ____UnitSymbols_IsInAttackStartToLaunchFlow_12 == nil then
		____UnitSymbols_IsInAttackStartToLaunchFlow_12 = __TS__Symbol("IsInAttackStartToLaunchFlow")
	end
	--- 单位是否在进入了攻击前摇的攻击流程中 boolean
	UnitSymbols.IsInAttackStartToLaunchFlow = ____UnitSymbols_IsInAttackStartToLaunchFlow_12
	local ____UnitSymbols_AttackStartToLaunchFlowRecord_13 = UnitSymbols.AttackStartToLaunchFlowRecord
	if ____UnitSymbols_AttackStartToLaunchFlowRecord_13 == nil then
		____UnitSymbols_AttackStartToLaunchFlowRecord_13 = __TS__Symbol("AttackStartToLaunchFlowRecord")
	end
	--- 单位进入了攻击前摇的攻击流程中的攻击记录 number
	UnitSymbols.AttackStartToLaunchFlowRecord = ____UnitSymbols_AttackStartToLaunchFlowRecord_13
	local ____UnitSymbols_OriginalBaseAttackRange_14 = UnitSymbols.OriginalBaseAttackRange
	if ____UnitSymbols_OriginalBaseAttackRange_14 == nil then
		____UnitSymbols_OriginalBaseAttackRange_14 = __TS__Symbol("UnitOriginalBaseAttackRange")
	end
	--- 单位原始攻击距离 number
	UnitSymbols.OriginalBaseAttackRange = ____UnitSymbols_OriginalBaseAttackRange_14
	local ____UnitSymbols_OriginalProjectileName_15 = UnitSymbols.OriginalProjectileName
	if ____UnitSymbols_OriginalProjectileName_15 == nil then
		____UnitSymbols_OriginalProjectileName_15 = __TS__Symbol("HeroOriginalProjectileName")
	end
	--- 单位原始攻击弹道名 string
	UnitSymbols.OriginalProjectileName = ____UnitSymbols_OriginalProjectileName_15
	local ____UnitSymbols_OriginalModelName_16 = UnitSymbols.OriginalModelName
	if ____UnitSymbols_OriginalModelName_16 == nil then
		____UnitSymbols_OriginalModelName_16 = __TS__Symbol("OriginalModelName")
	end
	--- 单位原始模型
	UnitSymbols.OriginalModelName = ____UnitSymbols_OriginalModelName_16
	local ____UnitSymbols_OriginalBaseAttackTime_17 = UnitSymbols.OriginalBaseAttackTime
	if ____UnitSymbols_OriginalBaseAttackTime_17 == nil then
		____UnitSymbols_OriginalBaseAttackTime_17 = __TS__Symbol("UnitOriginalBaseAttackTime")
	end
	--- 单位原始攻击间隔 number
	UnitSymbols.OriginalBaseAttackTime = ____UnitSymbols_OriginalBaseAttackTime_17
	local ____UnitSymbols_IsPreventForceKill_18 = UnitSymbols.IsPreventForceKill
	if ____UnitSymbols_IsPreventForceKill_18 == nil then
		____UnitSymbols_IsPreventForceKill_18 = __TS__Symbol("IsPreventForceKill")
	end
	--- 是否阻止强制击杀（失败冷却） boolean
	UnitSymbols.IsPreventForceKill = ____UnitSymbols_IsPreventForceKill_18
	local ____UnitSymbols_IsInCustomForceKillFlow_19 = UnitSymbols.IsInCustomForceKillFlow
	if ____UnitSymbols_IsInCustomForceKillFlow_19 == nil then
		____UnitSymbols_IsInCustomForceKillFlow_19 = __TS__Symbol("IsInCustomForceKillFlow")
	end
	--- 是否正处于自定义强制击杀流程（同步重入保护） boolean
	UnitSymbols.IsInCustomForceKillFlow = ____UnitSymbols_IsInCustomForceKillFlow_19
	local ____UnitSymbols_StrikeCritAttack_AttackRecordOnLanded_20 = UnitSymbols.StrikeCritAttack_AttackRecordOnLanded
	if ____UnitSymbols_StrikeCritAttack_AttackRecordOnLanded_20 == nil then
		____UnitSymbols_StrikeCritAttack_AttackRecordOnLanded_20 = __TS__Symbol("StrikeCritAttack_AttackRecordOnLanded")
	end
	UnitSymbols.StrikeCritAttack_AttackRecordOnLanded = ____UnitSymbols_StrikeCritAttack_AttackRecordOnLanded_20
	local ____UnitSymbols_StrikeCritAttackDamageRecord_21 = UnitSymbols.StrikeCritAttackDamageRecord
	if ____UnitSymbols_StrikeCritAttackDamageRecord_21 == nil then
		____UnitSymbols_StrikeCritAttackDamageRecord_21 = __TS__Symbol("StrikeCritAttackRecord")
	end
	--- 攻击会心一击记录
	UnitSymbols.StrikeCritAttackDamageRecord = ____UnitSymbols_StrikeCritAttackDamageRecord_21
	local ____UnitSymbols_IsForbidCustomImmuneDeathDamage_22 = UnitSymbols.IsForbidCustomImmuneDeathDamage
	if ____UnitSymbols_IsForbidCustomImmuneDeathDamage_22 == nil then
		____UnitSymbols_IsForbidCustomImmuneDeathDamage_22 = __TS__Symbol("IsForbidCustomImmuneDeathDamage")
	end
	--- 是否处于禁用自定义免疫致死伤害的状态 boolean
	UnitSymbols.IsForbidCustomImmuneDeathDamage = ____UnitSymbols_IsForbidCustomImmuneDeathDamage_22
	local ____UnitSymbols_CustomImmuneDeathTriggeredCount_23 = UnitSymbols.CustomImmuneDeathTriggeredCount
	if ____UnitSymbols_CustomImmuneDeathTriggeredCount_23 == nil then
		____UnitSymbols_CustomImmuneDeathTriggeredCount_23 = __TS__Symbol("CustomImmuneDeathTriggeredCount")
	end
	--- 自定义免疫致死伤害的累计触发次数（单调递增，用于同步判断某次击杀是否被免疫致死拦截） number
	UnitSymbols.CustomImmuneDeathTriggeredCount = ____UnitSymbols_CustomImmuneDeathTriggeredCount_23
end
AbilitySymbols = AbilitySymbols or {}
do
	local ____AbilitySymbols_CustomCursorPoint_24 = AbilitySymbols.CustomCursorPoint
	if ____AbilitySymbols_CustomCursorPoint_24 == nil then
		____AbilitySymbols_CustomCursorPoint_24 = __TS__Symbol("AbilityCustomCursorPoint")
	end
	--- 技能自定义坐标记录 Vector
	AbilitySymbols.CustomCursorPoint = ____AbilitySymbols_CustomCursorPoint_24
	local ____AbilitySymbols_CustomRecord_25 = AbilitySymbols.CustomRecord
	if ____AbilitySymbols_CustomRecord_25 == nil then
		____AbilitySymbols_CustomRecord_25 = __TS__Symbol("AbilityCustomRecord")
	end
	--- 技能自定义记录
	AbilitySymbols.CustomRecord = ____AbilitySymbols_CustomRecord_25
	local ____AbilitySymbols_Bless10204RedirectCast_26 = AbilitySymbols.Bless10204RedirectCast
	if ____AbilitySymbols_Bless10204RedirectCast_26 == nil then
		____AbilitySymbols_Bless10204RedirectCast_26 = __TS__Symbol("AbilityBless10204RedirectCast")
	end
	--- 福佑 10204 流离：技能处于转向强制施法中 boolean
	AbilitySymbols.Bless10204RedirectCast = ____AbilitySymbols_Bless10204RedirectCast_26
end