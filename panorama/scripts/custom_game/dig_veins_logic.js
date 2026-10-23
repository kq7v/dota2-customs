--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('dig_veins_logic', exports); const require = GameUI.__require;

const ACTIVITY_DICE_ID = 802;

const ACTIVITY_MINING_ID = 1002;
const DIG_VEINS_DEPTH_DISPLAY_SCALE = 10;
const getDigVeinsDisplayDepth = depth => depth * DIG_VEINS_DEPTH_DISPLAY_SCALE;
const getDigVeinsTaskState = task => {
  if (task.receive_progress == 1) {
    return "Received";
  }
  if (task.progress >= task.target) {
    return "Claimable";
  }
  return "InProgress";
};
const isDigVeinsTaskClaimable = task => getDigVeinsTaskState(task) == "Claimable";
const isDigVeinsTaskActive = (task, timestamp) => {
  return task.start_time <= timestamp && timestamp <= task.end_time;
};
const isDigVeinsTask = task => {
  const taskConfig = KeyValues.task[task.task_id];
  return taskConfig != undefined && taskConfig.activity_id == ACTIVITY_MINING_ID && (taskConfig.type == 6 || taskConfig.type == 7);
};
const hasClaimableDigVeinsTask = (tasks, timestamp) => Object.values(tasks).some(task => {
  return isDigVeinsTask(task) && isDigVeinsTaskActive(task, timestamp) && isDigVeinsTaskClaimable(task);
});

exports.ACTIVITY_DICE_ID = ACTIVITY_DICE_ID;
exports.ACTIVITY_MINING_ID = ACTIVITY_MINING_ID;
exports.getDigVeinsDisplayDepth = getDigVeinsDisplayDepth;
exports.getDigVeinsTaskState = getDigVeinsTaskState;
exports.hasClaimableDigVeinsTask = hasClaimableDigVeinsTask;
exports.isDigVeinsTask = isDigVeinsTask;
exports.isDigVeinsTaskActive = isDigVeinsTaskActive;
exports.isDigVeinsTaskClaimable = isDigVeinsTaskClaimable;