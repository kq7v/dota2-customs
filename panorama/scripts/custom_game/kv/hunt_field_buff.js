--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


GameUI.CustomUIConfig().hunt_field_buff = {
	"heavy": {
		"Type": 1,
		"Note": "沉重",
		"Description": "玩家最终移动速度降低%ReducePct%%。",
		"Weight": 0,
		"Time": 0,
		"EffectParams": "ReducePct:30 40 50 60",
		"AbilityTextureName": "ancient_apparition_cold_feet"
	},
	"freeze": {
		"Type": 1,
		"Note": "冻结",
		"Description": "释放技能后该技能被冻结，冻结时间为最终冷却时间的%FreezePct%%；冻结结束后正常计时。",
		"Weight": 0,
		"Time": 0,
		"EffectParams": "FreezePct:100 150 200 300",
		"AbilityTextureName": "faceless_void_time_dilation"
	},
	"calm": {
		"Type": 1,
		"Note": "冷静",
		"Description": "玩家护盾量及怒气获取总降%ReducePct%%。",
		"Weight": 0,
		"Time": 0,
		"EffectParams": "ReducePct:40 50 60 70",
		"AbilityTextureName": "skywrath_mage_ancient_seal"
	},
	"potion": {
		"Type": 1,
		"Note": "药水补给",
		"Description": "每隔%Interval%秒，在随机位置生成%Count%瓶群体治疗药水，持续%Lifetime%秒未拾取后消失。",
		"Weight": 0,
		"Time": 10,
		"EffectParams": "Interval:4 8 10 12|Count:1|Lifetime:15|item_health_potion_1:0|item_health_potion_2:0|item_health_potion_3:40",
		"AbilityTextureName": "forest_troll_high_priest_heal_amp_aura"
	},
	"immortal_totem": {
		"Type": 2,
		"Note": "轰炸",
		"Description": "每隔%Interval%秒，开始连续轰炸，持续投放%Duration%秒，每%BombInterval%秒在随机位置生成%Radius%的轰炸圈。每个圈预警%WarningTime%秒后爆炸，造成最大生命%DamagePct%%的纯粹伤害。",
		"Weight": 20,
		"Time": 15,
		"EffectParams": "Interval:13|Duration:3|BombInterval:0.3|WarningTime:1.5|Radius:350|DamagePct:15",
		"AbilityTextureName": "gyrocopter/gyro_ti10_immortal_ability_icon/gyro_ti10_immortal_missile_crimson"
	},
	"healing_totem": {
		"Type": 2,
		"Note": "潮汐",
		"Description": "每隔%Interval%秒，场地划分为最多%LaneCount%条通道，预警%WarningTime%秒后，潮汐波以%Speed%速度沿其余通道横穿场地，命中造成最大生命%DamagePct%%的纯粹伤害。",
		"Weight": 20,
		"Time": 7,
		"EffectParams": "Interval:12|WarningTime:1.5|LaneCount:6|LaneWidth:384|WaveRadius:192|Distance:2400|Speed:1200|DamagePct:20",
		"AbilityTextureName": "tidehunter_gush"
	},
	"hunter": {
		"Type": 2,
		"Note": "猎手",
		"Description": "每隔%Interval%秒，随机位置生成持续%Lifetime%秒的无敌猎手，持续追踪一名玩家，移动速度%MoveSpeed%。靠近目标%TriggerDistance%距离后停下，预警%WarningTime%秒并自爆，对%BlastRadius%范围内造成其最大生命%DamagePct%%的纯粹伤害。",
		"Weight": 20,
		"Time": 11,
		"EffectParams": "Interval:12|Lifetime:15|MoveSpeed:300|TriggerDistance:100|WarningTime:1.5|BlastRadius:500|DamagePct:20",
		"AbilityTextureName": "grimstroke_ink_creature"
	},
	"siphon": {
		"Type": 2,
		"Note": "汲取",
		"Description": "每隔%Interval%秒，随机位置生成持续%Duration%秒的汲取点，随机连线%TargetRange%范围内一名玩家。每%TickInterval%秒造成其最大生命%DamagePct%%的纯粹伤害，并为所有怪物恢复%HealPct%%生命值。玩家远离汲取点至%BreakDistance%距离即可断线。",
		"Weight": 20,
		"Time": 8,
		"EffectParams": "Interval:12|WarningTime:0.8|Duration:6|TargetRange:400|TickInterval:0.2|DamagePct:1|HealPct:0.05|BreakDistance:1000",
		"AbilityTextureName": "pugna_life_drain"
	},
	"energy_orb": {
		"Type": 2,
		"Note": "夺能",
		"Description": "每隔%Interval%秒，随机位置生成能量球。玩家靠近至%PickupRadius%距离可消除；%Countdown%秒内未被消除，能量球消失并释放冲击波对全场玩家造成其最大生命%DamagePct%%的纯粹伤害。",
		"Weight": 20,
		"Time": 9,
		"EffectParams": "Interval:13|PickupRadius:250|Countdown:6|DamagePct:20",
		"AbilityTextureName": "shadow_demon_disruption"
	},
	"lightning": {
		"Type": 2,
		"Note": "引雷",
		"Description": "每隔%Interval%秒，标记所有存活玩家，预警%TrackTime%秒后生成%Radius%范围落雷预警圈；再过%WarningTime%秒落雷，对圈内玩家造成其最大生命%DamagePct%%的纯粹伤害，并留下持续%Duration%秒的雷区，雷区每%TickInterval%秒造成最大生命%TickDamagePct%%的纯粹伤害。",
		"Weight": 20,
		"Time": 3,
		"EffectParams": "Interval:7|TrackTime:1|Radius:400|WarningTime:1.5|DamagePct:20|Duration:5|TickInterval:0.1|TickDamagePct:1",
		"AbilityTextureName": "zuus_cloud"
	}
};