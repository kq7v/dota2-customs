--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('activity_menu', exports); const require = GameUI.__require;

var dig_veins_logic = require('./dig_veins_logic.js');

const ACTIVITY_LOGIN_ID = 101;
function isLoginActivityCompleted(context) {
  const rewardCount = Object.keys(KeyValues.activity_login[ACTIVITY_LOGIN_ID] ?? {}).length;
  const loginActivity = context.loginActivities[ACTIVITY_LOGIN_ID];
  return rewardCount > 0 && loginActivity != undefined && loginActivity.step >= rewardCount;
}
function isBeforeEndTime(now, endTime) {
  return endTime == 0 || now < endTime;
}
function isActivityInTimeRange(now, startTime, endTime) {
  return (startTime == 0 || startTime <= now) && (endTime == 0 || now <= endTime);
}
function getActiveStarseaActivityID(now) {
  const timestamp = Math.floor(now);
  const activities = Object.values(KeyValues.activity_data).filter(activity => activity.type == 2).sort((left, right) => left.activity_id - right.activity_id);
  let activeActivityID;
  for (const activity of activities) {
    const rewards = KeyValues.activity_starsea[activity.activity_id];
    if (rewards == undefined || Object.keys(rewards).length == 0) continue;
    if (!isActivityInTimeRange(timestamp, activity.start_time, activity.end_time)) continue;
    activeActivityID = activity.activity_id;
  }
  return activeActivityID;
}
function shouldShowPrimaryMenu(menu, config, context) {
  if (config.storeMenus.has(menu) && !context.openStore) {
    return false;
  }
  if (menu == "starsea") {
    return getActiveStarseaActivityID(context.now) != undefined;
  }
  if (menu == "seven_days") {
    return !isLoginActivityCompleted(context);
  }
  if (menu == "activity_moonstone") {
    const dataEndTime = KeyValues.activity_data[902]?.data_end_time ?? 0;
    return isBeforeEndTime(context.now, dataEndTime);
  }
  if (menu == "boardslot") {
    const dataEndTime = KeyValues.activity_data[dig_veins_logic.ACTIVITY_DICE_ID]?.data_end_time ?? 0;
    return isBeforeEndTime(context.now, dataEndTime);
  }
  if (menu == "mining") {
    const activity = KeyValues.activity_data[dig_veins_logic.ACTIVITY_MINING_ID];
    const startTime = activity?.start_time ?? 0;
    const dataEndTime = activity?.data_end_time ?? 0;
    return (startTime == 0 || startTime <= context.now) && isBeforeEndTime(context.now, dataEndTime);
  }
  return true;
}
function shouldShowSecondaryMenu(secondMenu, context) {
  const diceEndTime = KeyValues.activity_data[dig_veins_logic.ACTIVITY_DICE_ID]?.end_time ?? 0;
  if (secondMenu == "dice_gift") {
    return isBeforeEndTime(context.now, diceEndTime);
  }
  if (secondMenu == "dice_store") {
    return false;
  }
  return true;
}
function buildActivityMenuList(config, context) {
  const result = {};
  for (const menu in config.menuList) {
    if (!shouldShowPrimaryMenu(menu, config, context)) continue;
    const templateSecondMenus = config.menuList[menu];
    const secondMenus = templateSecondMenus.filter(secondMenu => shouldShowSecondaryMenu(secondMenu, context));
    if (templateSecondMenus.length > 0 && secondMenus.length == 0) continue;
    result[menu] = secondMenus;
  }
  return result;
}
function isActivityMenuVisible(menuList, menu, secondMenu) {
  const secondMenus = menuList[menu];
  if (secondMenus == undefined) return false;
  if (secondMenu == undefined) return true;
  return secondMenus.includes(secondMenu);
}
function getVisibleActivityRedPoint(menuList, menu, secondMenu) {
  if (menu == undefined) {
    return Object.keys(menuList).some(visibleMenu => getVisibleActivityRedPoint(menuList, visibleMenu));
  }
  const secondMenus = menuList[menu];
  if (secondMenus == undefined) return false;
  if (secondMenu != undefined) {
    return isActivityMenuVisible(menuList, menu, secondMenu) && CustomUIConfig.GetRedPoint("activity", menu, secondMenu);
  }
  if (secondMenus.length == 0) {
    return CustomUIConfig.GetRedPoint("activity", menu);
  }
  return secondMenus.some(visibleSecondMenu => CustomUIConfig.GetRedPoint("activity", menu, visibleSecondMenu));
}
function areActivityMenuListsEqual(left, right) {
  const leftMenus = Object.keys(left);
  const rightMenus = Object.keys(right);
  if (leftMenus.length != rightMenus.length) return false;
  return leftMenus.every((menu, index) => {
    if (menu != rightMenus[index]) return false;
    const leftSecondMenus = left[menu];
    const rightSecondMenus = right[menu];
    return leftSecondMenus.length == rightSecondMenus.length && leftSecondMenus.every((secondMenu, secondIndex) => secondMenu == rightSecondMenus[secondIndex]);
  });
}

exports.areActivityMenuListsEqual = areActivityMenuListsEqual;
exports.buildActivityMenuList = buildActivityMenuList;
exports.getActiveStarseaActivityID = getActiveStarseaActivityID;
exports.getVisibleActivityRedPoint = getVisibleActivityRedPoint;