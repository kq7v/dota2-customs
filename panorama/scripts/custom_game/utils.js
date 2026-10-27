--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('utils', exports); const require = GameUI.__require;

function replaceBuffEnum(sStr) {
  const netEnum = CustomNetTables.GetTableValue("common", "constant");
  if (netEnum) {
    sStr = sStr.replace(/{Enum:(\w+?)}(%?)/g, (a, b, c) => {
      return "<font color='white'>" + Float(netEnum.BUFF_VALUE[b]) + c + "</font>";
    });
  }
  return sStr;
}
function getImagePath(relativePath) {
  if (typeof relativePath == "string") {
    return `url('file://{images}/custom_game/${relativePath}')`;
  } else {
    return `url('file://{images}/custom_game/${relativePath.join("/")}')`;
  }
}

exports.getImagePath = getImagePath;
exports.replaceBuffEnum = replaceBuffEnum;