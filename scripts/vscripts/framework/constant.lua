--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


local a = "framework/constant"
local b = require("lualib_bundle")
local c = b.__TS__ObjectAssign
vec3_zero = Vector(0, 0, 0)
vec3_left = Vector(-1, 0, 0)
vec3_right = Vector(1, 0, 0)
vec3_top = Vector(0, 1, 0)
vec3_bottom = Vector(0, -1, 0)
vec3_invalid = Vector(3.402823466e+38, 3.402823466e+38, 3.402823466e+38)
AI_TIMER_TICK_TIME = 0.15
CUSTOM_PAUSE_CD = 60
GRID_SIZE = 384
MINIMUM_ATTACK_SPEED = 20
MAXIMUM_ATTACK_SPEED = 600
BULLET_WIDTH = 32
INTERACT_RADIUS = 200
HERO_MAX_LEVEL = 30
HERO_XP_PER_LEVEL_TABLE = {}
do
	local d = 0
	while d < 30 do
		HERO_XP_PER_LEVEL_TABLE[#HERO_XP_PER_LEVEL_TABLE + 1] = 75 * d + 50 * d * d
		d = d + 1
	end
end
HERO_RESPAWN_COUNT = 0
TAVERN_ITEMS = { "item_whisky", "item_beer", "item_rum", "item_tequila", "item_champagne", "item_gin", "item_wine" }
MAX_BLESS_TYPE_COUNT = 3
BLESS_RARITY_WEIGHT = { [1] = 60, [2] = 25, [3] = 10, [4] = 5 }
SHOP_RARITY_COST = { [1] = 50, [2] = 100, [3] = 150, [4] = 200, [5] = 250 }
SUIT_EXP = { [1] = 4, [2] = 8, [3] = 16, [4] = 32 }
ARTIFACT_RARITY_WEIGHT = { [1] = 60, [2] = 25, [3] = 10, [4] = 5, [5] = 1 }
BASE_BACKSTAB_DAMAGE = 25
TRAP_DAMAGE_FACTOR = 0.2
INTENSITY_FACTOR = 0.1
DIFFICULTY_KEY_HEALTH_FACTOR_PER_INTENSITY = 0.052
DIFFICULTY_KEY_DAMAGE_FACTOR_PER_INTENSITY = 0.005
COOLDOWN_REDUCTION_RATE = 0.005
COOLDOWN_REDUCTION_CAP = 0.8
DIFFICULTY_COOLDOWN_REDUCTION = { [1] = -60, [2] = -50, [3] = -40, [4] = -30, [5] = -20, [6] = -10 }
DIFFICULTY_BOSS_GAP_AMPLIFY = {}
DIFFICULTY_BOSS_DAMAGE_AMPLIFY = {}
DIFFICULTY_TRAP_DAMAGE_REDUCTION = { [1] = -90, [2] = -80, [3] = -70, [4] = -60, [5] = -40, [6] = -20 }
EXPOSE_DAMAGE_PCT = 25
SWORD_DAMAGE = 24
SWORD_INTENT_PCT_PER_STACK = 20
SWORD_INTENT_MAX_STACK = 5
SHIELD_DECAY_RATE = 30
SHIELD_DECAY_MIN = 0.05
SHIELD_DECAY_INTERVAL = 1
POISON_DECAY_RATE = 30
POISON_DECAY_INTERVAL = 1
FROZEN_DECAY_RATE = 30
FROZEN_DECAY_INTERVAL = 2
FROZEN_DAMAGE_AMPLIFY_MAX = 30
FROZEN_DAMAGE_AMPLIFY_HALF_STACK = 50
POISON_BOTTLE_MAX_COUNT = 5
WEAK_REDUCE_DAMAGE_PCT = 1
WEAK_MAX_STACK = 25
WEAK_DURATION = 5
EXECUTE_THRESHOLD_MAX_HEALTH = 20
BLEED_DAMAGE_COUNT = 2
BLEED_DAMAGE_INTERVAL = 1
BLEED_MOVE_DAMAGE_DISTANCE_THRESHOLD = 100
BLEED_MOVE_DAMAGE_COOLDOWN = 0.25
BLEED_MOVE_DAMAGE_PCT = 40
COUNTER_CD = 0.3
CRIT_CALL_BLADE_CD = 0.3
HEALTHY_PCT = 80
LOW_HEALTH_PCT = 20
CLOSE_RANGE = 250
FAR_RANGE = 850
LASER_LENGTH = 600
LASER_WIDTH = 100
PUNISHMENT_DAMAGE = 30
PURIFY_DAMAGE = 48
PURIFY_RADIUS = 300
ICE_MARK_DAMAGE = 24
WISHING_POOL_COST = 10
SHOP_REFRESH_BASE_COST = 50
SHOP_REFRESH_COST_INCREMENT = 10
BLESS_GIVEUP_REWARD = 10
BLESS_GIVEUP_RARITY_REWARD = 5
SELECTION_KEY_FUNCTIONS = { KeyFunction.Option1, KeyFunction.Option2, KeyFunction.Option3 }
DEFAULT_KEYBOARD_BINDINGS = {
	[KeyFunction.Up] = "W",
	[KeyFunction.Down] = "S",
	[KeyFunction.Left] = "A",
	[KeyFunction.Right] = "D",
	[KeyFunction.Skill] = "MOUSE1",
	[KeyFunction.Dodge] = "SPACE",
	[KeyFunction.Defense] = "SHIFT",
	[KeyFunction.Ultimate] = "R",
	[KeyFunction.Attack] = "MOUSE0",
	[KeyFunction.Interact] = "E",
	[KeyFunction.Attribute] = "`",
	[KeyFunction.Upgrade] = "Q",
	[KeyFunction.Option1] = "scancode30",
	[KeyFunction.Option2] = "scancode31",
	[KeyFunction.Option3] = "scancode32",
}
DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK = c(
	{},
	DEFAULT_KEYBOARD_BINDINGS,
	{
		[KeyFunction.Skill] = "Q",
		[KeyFunction.Dodge] = "W",
		[KeyFunction.Defense] = "E",
		[KeyFunction.Ultimate] = "R",
		[KeyFunction.Attack] = "MOUSE1",
		[KeyFunction.Interact] = "F",
	}
)
DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK = c({}, DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK, { [KeyFunction.Attack] = "MOUSE0" })
MOVE_MODE_KEYBOARD = "keyboard"
MOVE_MODE_LEFT_CLICK = "left_click"
MOVE_MODE_RIGHT_CLICK = "right_click"
DEFAULT_MOVE_MODE = MOVE_MODE_RIGHT_CLICK
MOVE_MODE_DEFAULTS = {
	[MOVE_MODE_KEYBOARD] = DEFAULT_KEYBOARD_BINDINGS,
	[MOVE_MODE_LEFT_CLICK] = DEFAULT_KEYBOARD_BINDINGS_LEFT_CLICK,
	[MOVE_MODE_RIGHT_CLICK] = DEFAULT_KEYBOARD_BINDINGS_RIGHT_CLICK,
}
CLICK_MOVE_MODE_CLICK = "click"
CLICK_MOVE_MODE_HOLD = "hold"
CLICK_MOVE_MODE_FOLLOW = "follow"
DEFAULT_CLICK_MOVE_MODE = CLICK_MOVE_MODE_HOLD
DEFAULT_CAMERA_FOLLOW_MODE = "free"
DEFAULT_GAMEPAD_BINDINGS = {
	[KeyFunction.Up] = "y_axis_neg",
	[KeyFunction.Down] = "y_axis_pos",
	[KeyFunction.Left] = "x_axis_neg",
	[KeyFunction.Right] = "x_axis_pos",
	[KeyFunction.Skill] = "v_axis_pos",
	[KeyFunction.Dodge] = "joy1",
	[KeyFunction.Defense] = "joy4",
	[KeyFunction.Ultimate] = "joy2",
	[KeyFunction.Attack] = "joy3",
	[KeyFunction.Interact] = "joy5",
	[KeyFunction.Upgrade] = "joy7",
	[KeyFunction.OptionUp] = "pov_up",
	[KeyFunction.OptionDown] = "pov_down",
	[KeyFunction.OptionConfirm] = "joy10",
	[KeyFunction.ToggleAutoCast] = "joy9",
}
SERVICE_TASK_TYPE = SERVICE_TASK_TYPE or {}
SERVICE_TASK_TYPE.TrapClearEnemy = 1
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.TrapClearEnemy] = "TrapClearEnemy"
SERVICE_TASK_TYPE.Fishing = 2
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.Fishing] = "Fishing"
SERVICE_TASK_TYPE.ActivateAllBlessings = 3
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.ActivateAllBlessings] = "ActivateAllBlessings"
SERVICE_TASK_TYPE.KillEnemy = 4
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.KillEnemy] = "KillEnemy"
SERVICE_TASK_TYPE.ShopItemPurchase = 5
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.ShopItemPurchase] = "ShopItemPurchase"
SERVICE_TASK_TYPE.AddItem = 6
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.AddItem] = "AddItem"
SERVICE_TASK_TYPE.Die = 7
SERVICE_TASK_TYPE[SERVICE_TASK_TYPE.Die] = "Die"
ABYSS_CONFIG = {
	base = {
		NeedDungeonDiff = 5,
		timeLimit = 600,
		initialEnemyCount = 5,
		flashEnemyHealthPct = 400,
		flashEnemyAttackPct = 30,
		flashEnemyModelScale = 100,
		autoPickupRadius = 1000,
	},
	spawn = { maxAliveEnemyCount = 30, maxNearbyEnemyCount = 12, minDistanceFromPlayer = 10, maxDistanceFromPlayer = 1500 },
	event = { initialTriggerCount = 20, triggerCountIncrease = 5, maxTriggerCount = 60 },
	kill = { baseScore = 1 },
	ui = { devourUnlock = 1 },
}
COMBO_CONFIG = {
	initialMultiplier = 1,
	minMultiplier = 1,
	maxMultiplier = 10,
	multiplierIncreaseEveryCount = 2,
	multiplierIncreaseValue = 0.1,
	multiplierDecreaseValue = 0.1,
	comboCountdownDuration = 10,
	scoreRoundingMode = "floor",
}
BOSS_MAX_TIME = 300
BOSS_SHRINK_START_RADIUS = 3000
BOSS_SHRINK_RADIUS_PER_SECOND = 60
BOSS_SHRINK_OUTSIDE_DAMAGE_PCT = 5
BOSS_SHRINK_TICK_INTERVAL = 1
MAX_DIFFICULTY = 19
EQUIP_MAX_COUNT = 400
SHOP_ITEM_COUNT = 5