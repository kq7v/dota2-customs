--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('mining_activity_redpoints', exports); const require = GameUI.__require;

var dig_veins_logic = require('./dig_veins_logic.js');
var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

function defineRedPointRule(name, setup) {
  CustomUIConfig.__redPointRuleRegistry ??= {};
  if (CustomUIConfig.__redPointRuleRegistry[name] === true) {
    return;
  }
  CustomUIConfig.__redPointRuleRegistry[name] = true;
  setup();
}
function setRedPoint(path, value) {
  const [rootKey, ...keys] = path;
  CustomUIConfig.SetRedPoint(value, rootKey, ...keys.map(String));
}
function setRedPointBatch(updates) {
  for (const update of updates) {
    setRedPoint(update.path, update.value);
  }
}
function createRedPointServiceData(key, defaultVar) {
  return defaultVar == undefined ? solid_utils.createServiceNetData(key) : solid_utils.createServiceNetData(key, defaultVar);
}

const getDiceTaskState = task => {
  if (task.receive_progress == 1) return "Received";
  return task.progress >= task.target ? "Claimable" : "InProgress";
};
const isDiceTaskClaimable = task => getDiceTaskState(task) == "Claimable";
const isDiceTaskActive = (task, timestamp) => task.start_time <= timestamp && timestamp <= task.end_time;
const isDiceTask = task => {
  const config = KeyValues.task[task.task_id];
  return config != undefined && config.activity_id == dig_veins_logic.ACTIVITY_DICE_ID && (config.type == 6 || config.type == 7);
};
const hasClaimableDiceTask = (tasks, timestamp) => Object.values(tasks).some(task => isDiceTask(task) && isDiceTaskActive(task, timestamp) && isDiceTaskClaimable(task));
const getDiceMilestoneNodes = () => Object.values(KeyValues.activity_boardslot_node ?? {}).filter(node => node.activity_id == dig_veins_logic.ACTIVITY_DICE_ID && Number.isFinite(node.coin_num) && node.coin_num > 0).sort((a, b) => a.coin_num - b.coin_num || a.id - b.id);
const getDiceMilestoneProgress = tokens => {
  const coinID = KeyValues.activity_boardslot?.[dig_veins_logic.ACTIVITY_DICE_ID]?.coin_id;
  if (coinID == undefined) return 0;
  return Math.max(0, Number(tokens[coinID]?.amounts) || 0);
};
const getDiceReceivedMilestones = activity => new Set((activity?.received ?? []).map(reward => reward.reward_id));
const isDiceMilestoneClaimable = (node, progress, received) => progress >= node.coin_num && !received.has(node.coin_num);
const hasClaimableDiceMilestone = (activity, tokens) => {
  if (activity == undefined || activity.received == undefined) return false;
  const progress = getDiceMilestoneProgress(tokens);
  const received = getDiceReceivedMilestones(activity);
  return getDiceMilestoneNodes().some(node => isDiceMilestoneClaimable(node, progress, received));
};

function refreshMiningActivityRedPoint(tasks, timestamp) {
  setRedPoint(["activity", "mining", "veins_game"], dig_veins_logic.hasClaimableDigVeinsTask(tasks, timestamp));
}
function useMiningActivityRedPoints() {
  defineRedPointRule("activity_mining", () => {
    const playerActivityTasks = createRedPointServiceData("player_activity_tasks", {});
    libs.createEffect(() => {
      refreshMiningActivityRedPoint(playerActivityTasks(), Math.floor(CustomUIConfig.GetServerTimeStamp()));
    });
  });
}

exports.createRedPointServiceData = createRedPointServiceData;
exports.defineRedPointRule = defineRedPointRule;
exports.getDiceMilestoneNodes = getDiceMilestoneNodes;
exports.getDiceMilestoneProgress = getDiceMilestoneProgress;
exports.getDiceReceivedMilestones = getDiceReceivedMilestones;
exports.getDiceTaskState = getDiceTaskState;
exports.hasClaimableDiceMilestone = hasClaimableDiceMilestone;
exports.hasClaimableDiceTask = hasClaimableDiceTask;
exports.isDiceMilestoneClaimable = isDiceMilestoneClaimable;
exports.isDiceTask = isDiceTask;
exports.isDiceTaskActive = isDiceTaskActive;
exports.isDiceTaskClaimable = isDiceTaskClaimable;
exports.refreshMiningActivityRedPoint = refreshMiningActivityRedPoint;
exports.setRedPoint = setRedPoint;
exports.setRedPointBatch = setRedPointBatch;
exports.useMiningActivityRedPoints = useMiningActivityRedPoints;