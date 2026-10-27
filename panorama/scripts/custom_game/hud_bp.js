--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
require('./CosmeticCard.js');
require('./EOM_Label.js');
require('./EOMDesign.js');

$.Language().toLowerCase();
const [show, setShow] = libs.createSignal(false);
const [paymentOpen, setPaymentOpen] = libs.createSignal(false);
const [bpSeason, setBpSeason] = libs.createSignal({
  sid: 1,
  start_time: 1692349200,
  end_time: 1694361599
});
const [playerBPInfo, setPlayerBPInfo] = libs.createSignal({
  season: 1,
  level: 1,
  xp: 0,
  totalXp: 100,
  plus: 0
});
let jumpDone = false;
const [bpLevelExp, setBpLevelExp] = libs.createSignal([]);
const [rewardList, setRewardList] = libs.createSignal([]);
const [plusRewardList, setPlusRewardList] = libs.createSignal([]);
const [receivedList, setReceivedList] = libs.createSignal({});
libs.createEffect(() => {
  if (show() && !jumpDone) ;
});
libs.onMount(() => {
  const netID = [];
  const eventIDList = [];
  eventIDList.push(useToggleWindow("MenuButton_battlepass", show, setShow));
  eventIDList.push(useNetData("info_bp_level_exp", data => {
    let result = {};
    for (const iterator of data) {
      if (iterator.season == playerBPInfo().season) {
        result[iterator.level] = iterator.exp;
      }
    }
    setBpLevelExp(result);
  }));
  eventIDList.push(useNetData("info_bp_rewards", data => {
    const normalData = [];
    const plusData = [];
    for (const rewardData of data) {
      if (playerBPInfo().season == rewardData.season) {
        if (rewardData.plus == 0) {
          normalData[rewardData.level - 1] = rewardData;
        } else if (rewardData.plus == 1) {
          plusData[rewardData.level - 1] = rewardData;
        }
      }
    }
    setRewardList(normalData);
    setPlusRewardList(plusData);
  }));
  eventIDList.push(useNetData("info_bp_season", data => {
    for (const seasonData of data) {
      if (seasonData.sid == playerBPInfo().season) {
        setBpSeason(seasonData);
      }
    }
  }));
  eventIDList.push(useNetData("open_payment", data => {
    setPaymentOpen(data.open);
  }, Players.GetLocalPlayer()));
  eventIDList.push(useNetData("player_battle_passes", data => {
    for (const season in data) {
      if (data[season].season == playerBPInfo().season) {
        setPlayerBPInfo(data[season]);
      }
    }
  }, Players.GetLocalPlayer()));
  eventIDList.push(useNetData("player_bp_received", data => {
    setReceivedList(data);
  }, Players.GetLocalPlayer()));
  libs.onCleanup(() => {
    eventIDList.forEach(id => GameEvents.Unsubscribe(id));
    netID.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
  });
});