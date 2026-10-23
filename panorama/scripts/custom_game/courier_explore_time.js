--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('courier_explore_time', exports); const require = GameUI.__require;

function getCurrentServerTime() {
  return Math.floor(CustomUIConfig.GetServerTimeStamp());
}
const COURIER_EXPLORE_BASE_DURATION_HOURS = 24;
function getCourierExploreMaxDurationSeconds(extraDurationHours) {
  const parsedExtraDurationHours = Number(extraDurationHours ?? 0);
  const validExtraDurationHours = Number.isFinite(parsedExtraDurationHours) ? Math.max(0, parsedExtraDurationHours) : 0;
  return (COURIER_EXPLORE_BASE_DURATION_HOURS + validExtraDurationHours) * 60 * 60;
}
function formatCourierExploreDurationTime(durationSeconds) {
  const parsedDurationSeconds = Number(durationSeconds);
  const validDurationSeconds = Number.isFinite(parsedDurationSeconds) ? Math.max(0, parsedDurationSeconds) : 0;
  const durationMinutes = Math.floor(validDurationSeconds / 60);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}
function getCourierExploreElapsedSeconds(startTime, currentTime) {
  if (startTime === undefined || startTime <= 0) {
    return 0;
  }
  const now = currentTime ?? getCurrentServerTime();
  return Math.max(0, Math.floor(now - startTime));
}
function isCourierExploreDurationMaxed(startTime, currentTime, maxDurationSeconds = getCourierExploreMaxDurationSeconds()) {
  return getCourierExploreElapsedSeconds(startTime, currentTime) >= maxDurationSeconds;
}
function formatCourierExploreElapsedTime(startTime, currentTime, maxDurationSeconds = getCourierExploreMaxDurationSeconds()) {
  const elapsedSeconds = Math.min(getCourierExploreElapsedSeconds(startTime, currentTime), maxDurationSeconds);
  return formatCourierExploreDurationTime(elapsedSeconds);
}

exports.formatCourierExploreDurationTime = formatCourierExploreDurationTime;
exports.formatCourierExploreElapsedTime = formatCourierExploreElapsedTime;
exports.getCourierExploreMaxDurationSeconds = getCourierExploreMaxDurationSeconds;
exports.getCurrentServerTime = getCurrentServerTime;
exports.isCourierExploreDurationMaxed = isCourierExploreDurationMaxed;