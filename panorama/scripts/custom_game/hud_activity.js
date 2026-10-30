--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var CosmeticCard = require('./CosmeticCard.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var GenericPanel = require('./GenericPanel.js');
var ProductImage = require('./ProductImage.js');
var netdata_utils = require('./netdata_utils.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Label = require('./EOM_Label.js');
var InfoButton = require('./InfoButton.js');
var MenuMarkIcon = require('./MenuMarkIcon.js');
var Player = require('./Player.js');
var EOM_Loading = require('./EOM_Loading.js');
var CosmeticPreview = require('./CosmeticPreview.js');
var EOM_Separator = require('./EOM_Separator.js');
var ExchangeItem = require('./ExchangeItem.js');
var ProductItem = require('./ProductItem.js');
var EOM_PortraitFullBody = require('./EOM_PortraitFullBody.js');
var StoreItem = require('./StoreItem.js');
var RankTierIcon = require('./RankTierIcon.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
var red_point_utils = require('./red_point_utils.js');
var EOM_DropDown = require('./EOM_DropDown.js');
require('./CourierTitle.js');
require('./WinStreak.js');
require('./Heroes.js');
require('./profile_info.js');
require('./StoreItemImage.js');
require('./game_utils.js');

const language$g = $.Language().toLowerCase();
const turntable_id = 1008;
const turntable_token = 1100129;
const Activity_26WuYiTurntable = props => {
  const activityID = props.activity_id;
  const localPlayerID = Players.GetLocalPlayer();
  const [endtime, setEndtime] = libs.createSignal(1785427200);
  const [progress, setProgress] = libs.createSignal(0);
  const [stage, setStage] = libs.createSignal(1);
  const [nowProgressReward, setNowProgressReward] = libs.createSignal();
  const [activityToken, setActivityToken] = libs.createSignal(1100129);
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [progressRewardsState, setProgressRewardsState] = libs.createSignal({});
  const [taskData, setTaskData] = libs.createSignal([]);
  const [taskProgress, setTaskProgress] = libs.createSignal({});
  const [stageProgress, setStageProgress] = libs.createSignal({
    pct: 0,
    now: 0,
    max: 500
  });
  const [multi10] = libs.createSignal(false);
  libs.createEffect(() => {
    const reward_info_list = rewardInfoList();
    const progress_rewards_state = progressRewardsState();
    const now_progress = progress();
    let _stage = 1;
    let nowReward;
    let enable = false;
    let _stageProgress = {
      pct: 0,
      now: 0,
      max: 500
    };
    let lastProgress = 0;
    if (reward_info_list.length > 0 && Object.keys(progress_rewards_state).length > 0) {
      enable = Object.values(progress_rewards_state).some(v => v == 0);
      for (let i = 0; i < reward_info_list.length; i++) {
        const element = reward_info_list[i];
        if (now_progress >= element.threshold) {
          nowReward = {
            item_id: element.rewards?.[0]?.item_id,
            amounts: element.rewards?.[0]?.amounts,
            received: progress_rewards_state[element.reward_id] == 1
          };
          _stageProgress = {
            now: now_progress - lastProgress,
            max: element.threshold - lastProgress,
            pct: 100
          };
          _stage = element.reward_id;
        } else {
          nowReward = {
            item_id: element.rewards?.[0]?.item_id,
            amounts: element.rewards?.[0]?.amounts,
            received: false
          };
          _stageProgress = {
            now: now_progress - lastProgress,
            max: element.threshold - lastProgress,
            pct: Clamp((now_progress - lastProgress) / (element.threshold - lastProgress) * 100, 0, 100)
          };
          _stage = element.reward_id;
          break;
        }
        lastProgress = element.threshold;
      }
    }
    if (nowReward) {
      setNowProgressReward({
        item_id: nowReward.item_id,
        amounts: nowReward.amounts,
        enable: enable,
        received: nowReward.received
      });
    }
    setStage(_stage);
    setStageProgress(_stageProgress);
  });
  const [turntableData, setTurntableData] = libs.createSignal({
    turntable_id: 1007,
    cost_token: 1100126,
    cost_amounts: 10,
    exchange_currency_id: 0,
    name: "幸运转盘",
    start_time: 0,
    end_time: 1785427200
  });
  const [turntableContent, setTurntableContent] = libs.createSignal({});
  let requesting = false;
  const receiveTaskReward = (task_id, addProgress, unique_task_id) => {
    if (unique_task_id != undefined && !requesting) {
      requesting = true;
      serverRequest("activity_task_reward", {
        task_id: task_id,
        unique_task_id: unique_task_id
      }, ({
        status
      }) => {
        requesting = false;
        if (status == 0) {
          callAction("activity_data", {
            activity_id: activityID
          });
        }
      });
    }
  };
  const [turntableTokenAmounts, setTurntableTokenAmounts] = libs.createSignal(0);
  const [fucardDropAmount, setFucardDropAmount] = libs.createSignal(0);
  libs.onMount(() => {
    let gameEventIDList = [];
    callAction("activity_task_progress", {
      task_type: 2,
      sid: 0,
      aid: activityID
    });
    gameEventIDList.push(useNetData("red_envelope_count", data => {
      if (data) {
        Object.keys(data.idKv).forEach(key => {
          const numberKey = Number(key);
          if (numberKey == turntable_token) {
            setFucardDropAmount(data.idKv[numberKey]);
          }
        });
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("activity_task_progresses", data => {
      if (data) {
        const output = {};
        for (const unique_task_id in data) {
          const element = data[unique_task_id];
          output[element.task_id] = {
            progress: element.progress ?? 0,
            unique_task_id: element.unique_task_id,
            receive_progress: element.receive_progress ?? 0
          };
        }
        setTaskProgress(output);
      }
    }, localPlayerID));
    gameEventIDList.push(useNetData("player_token", data => {
      setTurntableTokenAmounts(data[turntable_token.toString()]?.num ?? 0);
    }, localPlayerID));
    gameEventIDList.push(useNetData("task_activity_data", data => {
      if (data?.[activityID]) {
        if (turntableState() == "idle" || turntableState() == "stop") {
          setProgressRewardsState(data[activityID].rewards);
          setProgress(data[activityID].progress ?? 0);
        }
      }
    }, localPlayerID));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID) {
          const reward = JSON.parseSafe(activityInfo.extra_information);
          let reawrd_list = reward.rewards;
          if (reawrd_list) {
            reawrd_list = reawrd_list.map((v, i) => {
              if (reawrd_list?.[i - 1]?.threshold != undefined) v.last_threshold = reawrd_list[i - 1].threshold;
              return v;
            });
          }
          setActivityToken(reward.activity_token);
          setRewardInfoList(reawrd_list);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_turntable_data", data => {
      let v = data.find(v => v.turntable_id == turntable_id);
      if (v) {
        setTurntableData(v);
      }
    }));
    gameEventIDList.push(useNetData("info_turntable_content", data => {
      if (data?.[turntable_id.toString()]) {
        let reconstruct = {};
        data[turntable_id.toString()].forEach(v => {
          let items = JSON.parseSafe(v.items);
          reconstruct[v.reward_id] = items;
        });
        setTurntableContent(reconstruct);
      }
    }));
    gameEventIDList.push(useNetData("info_activity_task", data => {
      if (data) {
        const task = [];
        for (const task_id in data) {
          if (data[task_id].activity_id == activityID) task.push(data[task_id]);
        }
        setTaskData(task.sort((a, b) => a.task_id - b.task_id));
      }
    }));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  const OnDraw = count => {
    let cost = turntableData().cost_amounts * count;
    if (turntableTokenAmounts() >= cost) {
      serverRequest("open_turntable", {
        turntable_id: turntableData().turntable_id,
        open_count: count,
        activity_id: activityID
      }, data => {
        if (data.status == 0 && data?.data?.open_turntable_result) {
          setTurntableRewards(data?.data.rewards);
          onGetRollResult(data?.data.open_turntable_result);
        }
      });
    } else {
      ErrorMessage("#Activity_26WuYiTurntable_NotEnough");
    }
  };
  const IDLE_ROTATION_SPEED = 3;
  const ROLL_SPEED_CONFIG = {
    max_speed: 720,
    duration: 3
  };
  const STOP_DEG_OFFSET = 3;
  const TURNTABLE_DEG_CONFIG = {
    [1]: {
      min: -30,
      max: 30
    },
    [2]: {
      min: 270,
      max: 330
    },
    [3]: {
      min: 210,
      max: 270
    },
    [4]: {
      min: 150,
      max: 210
    },
    [5]: {
      min: 90,
      max: 150
    },
    [6]: {
      min: 30,
      max: 90
    }
  };
  const [turntableState, setTurntableState] = libs.createSignal("idle");
  const [turntableRewards, setTurntableRewards] = libs.createSignal([]);
  let refTurntable;
  let turntableRotateDeg = 0;
  let RollingData = {
    startDeg: 0,
    EndDeg: 0,
    acceleration: 0,
    startSpeed: 0,
    startTime: 0,
    EndTime: 0
  };
  libs.createEffect(libs.on(() => {
    return {
      show: props.show,
      selected: props.selected
    };
  }, () => {
    if (props.show && props.selected) ; else {
      if (turntableState() == "roll") {
        onStopRoll();
      }
    }
  }));
  const onGetRollResult = rewward_id => {
    let resultID = TURNTABLE_ID_MAP.indexOf(rewward_id) + 1;
    let deg_config = TURNTABLE_DEG_CONFIG[resultID];
    let willStopDeg = deg_config.min + Math.random() * (60 - STOP_DEG_OFFSET * 2) + STOP_DEG_OFFSET;
    if (willStopDeg < 0) {
      willStopDeg = 360 + willStopDeg;
    }
    let dx = willStopDeg - turntableRotateDeg;
    if (dx <= 0) {
      dx += 360;
    }
    let a = ROLL_SPEED_CONFIG.max_speed * ROLL_SPEED_CONFIG.max_speed * 0.5 / dx;
    let endTime = ROLL_SPEED_CONFIG.max_speed / a;
    for (let i = 0; i < 10; i++) {
      dx += 360;
      let temp_a = ROLL_SPEED_CONFIG.max_speed * ROLL_SPEED_CONFIG.max_speed * 0.5 / dx;
      let t1 = ROLL_SPEED_CONFIG.max_speed / a;
      let t2 = ROLL_SPEED_CONFIG.max_speed / temp_a;
      if (a > 0 && Math.abs(t2 - ROLL_SPEED_CONFIG.duration) >= Math.abs(t1 - ROLL_SPEED_CONFIG.duration)) {
        break;
      }
      a = temp_a;
      endTime = t2;
    }
    RollingData = {
      startDeg: turntableRotateDeg,
      EndDeg: willStopDeg,
      acceleration: a,
      startSpeed: ROLL_SPEED_CONFIG.max_speed,
      startTime: Game.Time(),
      EndTime: Game.Time() + endTime
    };
    setTurntableState("roll");
  };
  let idleTimer;
  const onStopRoll = () => {
    setTurntableState("stop");
    if (turntableRewards()) {
      let list = turntableRewards().map(v => {
        return {
          itemId: v.itemId.toString(),
          amounts: v.amounts
        };
      });
      addItemMessage(list);
      const data = getNetDataCache("task_activity_data", localPlayerID);
      if (data?.[activityID]) {
        setProgressRewardsState(data[activityID].rewards);
        setProgress(data[activityID].progress ?? 0);
      }
      if (idleTimer) {
        $.CancelScheduled(idleTimer);
      }
      idleTimer = $.Schedule(0.5, () => {
        idleTimer = undefined;
        setTurntableState("idle");
      });
    }
  };
  let lastTime = Game.Time();
  let turnTimer = setInterval(() => {
    if (refTurntable?.IsValid()) {
      let degNow = turntableRotateDeg;
      if (props.show && props.selected) {
        switch (turntableState()) {
          case "idle":
            {
              degNow += (Game.Time() - lastTime) * IDLE_ROTATION_SPEED;
            }
            break;
          case "roll":
            {
              let timeNow = Game.Time();
              if (timeNow >= RollingData.EndTime) {
                degNow = RollingData.EndDeg;
                onStopRoll();
              }
              let dt = timeNow - RollingData.startTime;
              degNow = RollingData.startDeg + RollingData.startSpeed * dt - 0.5 * RollingData.acceleration * dt * dt;
            }
            break;
          case "stop":
            {
              degNow = RollingData.EndDeg;
            }
            break;
        }
      } else {
        if (turntableState() == "roll") {
          degNow = RollingData.EndDeg;
          onStopRoll();
        }
      }
      if (degNow > 360) {
        degNow = degNow - 360;
      }
      lastTime = Game.Time();
      turntableRotateDeg = degNow;
      refTurntable.style.preTransformRotate2d = `${turntableRotateDeg}deg`;
    }
  }, 0);
  libs.onCleanup(() => {
    clearInterval(turnTimer);
    if (idleTimer != undefined) {
      $.CancelScheduled(idleTimer);
    }
  });
  const TURNTABLE_ID_MAP = [1, 3, 2, 4, 6, 5];
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_26WuYiTurntable",
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: turntable_token
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BGLayer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityDrop",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                text: "#Activity_26WuYiTurntable_DropCount",
                get dialogVariables() {
                  return {
                    count: fucardDropAmount(),
                    target: 600
                  };
                }
              });
            }
          }), libs.createComponent(EOM_Image.EOM_Image, {
            id: "ActivityTitle",
            className: language$g,
            hittest: false
          }), libs.createComponent(InfoButton.InfoButton, {
            className: language$g,
            id: "ActivityInfo",
            info: "#SnowballInfo",
            tooltip: "#Activity_26WuYiTurntable_infodesc"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityCountdown",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                align: "center center",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "timeIcon"
                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return endtime();
                    },
                    text: "#countdown_time"
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ProgressStage",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                align: "center center",
                flowChildren: "down",
                marginTop: "20px",
                get children() {
                  return [libs.createElement("Label", {
                    text: "#Activity_26WuYiTurntable_stage"
                  }, null), libs.createComponent(EOM_Label.EOM_Label, {
                    get text() {
                      return `${stage()}/35`;
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ProgressBG"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ProgressContainer",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ProgressBar",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "ProgressBar_Up",
                    get style() {
                      return {
                        clip: `rect(0%, ${stageProgress().pct}%, 100%, 0%)`
                      };
                    }
                  }), libs.createComponent(EOM_Label.EOM_Label, {
                    id: "ProgressLabel",
                    get text() {
                      return `${stageProgress().now}/${stageProgress().max}`;
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            get className() {
              return libs.classNames("ProgressReward", {
                Received: nowProgressReward()?.received,
                CanReceived: nowProgressReward()?.enable
              });
            },
            onactivate: () => {
              showPopup("TurntableReward", {
                activity_id: activityID
              });
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TurntableRewardBG"
              }), libs.createComponent(libs.Show, {
                get when() {
                  return nowProgressReward() != undefined;
                },
                get children() {
                  return [libs.createComponent(ProductImage.ProductImage, {
                    get itemid() {
                      return nowProgressReward().item_id;
                    },
                    marginTop: "20px"
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "RewardCount",
                    get text() {
                      return `${nowProgressReward().amounts}`;
                    },
                    hittest: false
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Light",
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ReceivedCheck",
                hittest: false
              }), libs.createComponent(libs.Show, {
                get when() {
                  return nowProgressReward()?.enable;
                },
                get children() {
                  return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                    hittest: false
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "TurntableContainer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TurntableBorder",
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TurntableBg",
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TurntableCenter",
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            ref(r$) {
              const _ref$ = refTurntable;
              typeof _ref$ === "function" ? _ref$(r$) : refTurntable = r$;
            },
            id: "TurntableMain",
            hittest: false,
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return Object.keys(turntableContent()).length > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "CenterBlock",
                    get children() {
                      return TURNTABLE_ID_MAP.map((reward_id, index) => libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "ChildBlock",
                        id: "ChildBlock" + (index + 1),
                        hittest: false,
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "Block",
                            hittest: false,
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "BlockRewards",
                                hittest: false,
                                get children() {
                                  return libs.createComponent(libs.Index, {
                                    get each() {
                                      return Object.keys(turntableContent()[reward_id]).sort((a, b) => turntableContent()[reward_id][b] - turntableContent()[reward_id][a]);
                                    },
                                    children: (item, i) => libs.createComponent(EOM_Panel.EOM_Panel, {
                                      get className() {
                                        return libs.classNames("BlockReward", {
                                          Draw10: multi10()
                                        });
                                      },
                                      hittest: false,
                                      get children() {
                                        return [libs.createComponent(ProductImage.ProductImage, {
                                          get itemid() {
                                            return item();
                                          },
                                          hidetooltip: true
                                        }), libs.createComponent(EOM_Label.EOM_Label, {
                                          id: "amounts",
                                          get text() {
                                            return `x${turntableContent()[reward_id][item()] * (multi10() ? 10 : 1)}`;
                                          },
                                          hittest: false
                                        })];
                                      }
                                    })
                                  });
                                }
                              });
                            }
                          });
                        }
                      }));
                    }
                  });
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "TurntableDrawButton",
        get enabled() {
          return turntableState() == "idle";
        },
        onactivate: self => {
          OnDraw(1);
        },
        get children() {
          return [libs.createComponent(EOM_Label.EOM_Label, {
            id: "DrawLabel",
            text: "#Activity_26WuYiTurntable_draw" + 1
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawCost",
            get children() {
              return [libs.createComponent(EOM_Icon.EOM_Icon, {
                size: "32",
                get src() {
                  return getTokenSrcPath(turntable_token);
                }
              }), libs.createComponent(EOM_Label.EOM_Label, {
                get text() {
                  return `${turntableData().cost_amounts}`;
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "TurntableDrawButton10",
        get enabled() {
          return turntableState() == "idle";
        },
        onactivate: self => {
          OnDraw(10);
        },
        get children() {
          return [libs.createComponent(EOM_Label.EOM_Label, {
            id: "DrawLabel",
            text: "#Activity_26WuYiTurntable_draw" + 10
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawCost",
            get children() {
              return [libs.createComponent(EOM_Icon.EOM_Icon, {
                size: "32",
                get src() {
                  return getTokenSrcPath(turntable_token);
                }
              }), libs.createComponent(EOM_Label.EOM_Label, {
                get text() {
                  return `${turntableData().cost_amounts * 10}`;
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "TaskContainer",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TaskList",
            scroll: "y",
            get children() {
              return libs.createComponent(libs.Index, {
                get each() {
                  return taskData();
                },
                children: (data, index) => {
                  const rewards = libs.createMemo(() => {
                    const output = JSON.parseSafe(data().reward);
                    if (typeof output == "object" && Object.keys(output).length > 0) {
                      return Object.keys(output[0]).sort((a, b) => (a == activityToken().toString() ? 1 : 0) - (b == activityToken().toString() ? 1 : 0)).map((id, index) => {
                        return {
                          itemId: id,
                          amounts: output[0][id] ?? 0
                        };
                      });
                    }
                    return [];
                  });
                  const task_data = () => {
                    if (taskProgress()[data().task_id]) {
                      return taskProgress()[data().task_id];
                    }
                  };
                  const progress = () => Math.min(finiteNumber(Number(data().target)), task_data()?.progress ?? 0);
                  const state = () => {
                    if (progress() >= finiteNumber(Number(data().target))) {
                      if (task_data()?.receive_progress == 1) {
                        return 1;
                      }
                      return 0;
                    }
                    return 2;
                  };
                  return [libs.createComponent(libs.Show, {
                    when: index != 0,
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "Line"
                      });
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    get className() {
                      return libs.classNames("ActivityTaskRow");
                    },
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "Rewards",
                        get children() {
                          return libs.createComponent(libs.Index, {
                            get each() {
                              return rewards();
                            },
                            children: (reward, i) => {
                              const reward_id = () => Number(reward().itemId);
                              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                className: "ElvesTaskRewardButton",
                                get enabled() {
                                  return state() == 0;
                                },
                                onactivate: () => {
                                  receiveTaskReward(data().task_id, 0, task_data()?.unique_task_id);
                                },
                                get children() {
                                  return libs.createComponent(TaskReward, {
                                    get reawrd_info() {
                                      return {
                                        item_id: reward_id(),
                                        rarity: -1,
                                        amounts: reward().amounts
                                      };
                                    },
                                    get state() {
                                      return state();
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "TaskInfo",
                        get children() {
                          return [libs.createComponent(GenericPanel.CLabel, {
                            id: "title",
                            get text() {
                              return `#${data().task_id}`;
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "progress",
                            get text() {
                              return `(${progress()} / ${data().target})`;
                            }
                          })];
                        }
                      })];
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100px",
            verticalAlign: "bottom",
            get children() {
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                id: "RewardProgressButton",
                onactivate: () => {
                  showPopup("TurntableReward", {
                    activity_id: activityID
                  });
                  nowProgressReward()?.enable;
                },
                get children() {
                  return [libs.createComponent(EOM_Label.EOM_Label, {
                    text: "#Activity_LuckyTurntable_rewardprogress"
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return nowProgressReward()?.enable;
                    },
                    get children() {
                      return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                        type: "default",
                        hittest: false
                      });
                    }
                  })];
                }
              });
            }
          })];
        }
      })];
    }
  });
};
const TaskReward = props => {
  const rarity = () => {
    return props.reawrd_info?.rarity ?? 0;
  };
  const item_id = () => {
    return props.reawrd_info?.item_id ?? -1;
  };
  const amounts = () => {
    return props.reawrd_info?.amounts ?? 1;
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("TaskReward", "Rarity" + rarity(), "State" + props.state);
    },
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BG",
        get children() {
          return [libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return item_id();
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            id: "RewardCount",
            get text() {
              return `${amounts()}`;
            },
            hittest: false
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Light",
        hittest: false
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "ElvesActivityCheck",
        hittest: false
      })];
    }
  });
};

const language$f = $.Language().toLowerCase();
const Activity_arena = props => {
  const activityID = props.activity_id;
  const [ticketToken, setTicketToken] = libs.createSignal(1000001);
  const [ticketPrice, setTicketPrice] = libs.createSignal(80);
  const [moonstone, setMoonstone] = libs.createSignal(0);
  const costEnough = () => moonstone() >= ticketPrice();
  const [arenaData, setArenaData] = libs.createSignal();
  let [countdownType, setCountdownType] = libs.createSignal(3);
  let [activityCountdown, setActivityCountdown] = libs.createSignal(0);
  const received = () => arenaData()?.received ?? false;
  const activated = () => arenaData()?.active ?? false;
  const taskProgress = () => arenaData()?.progress ?? 0;
  const failProgress = () => arenaData()?.fail_progress ?? 0;
  const [rewardList, setRewardList] = libs.createSignal([]);
  const previewRewardList = libs.createMemo(() => {
    if (rewardList().length > 0) {
      return rewardList()[rewardList().length - 1]?.rewards ?? [];
    }
    return [];
  });
  let [tokenUseEnable, setTokenUseEnable] = libs.createSignal(false);
  let [buttonCooldown, setButtonCooldown] = libs.createSignal(false);
  let [taskTimeOut, setTaskTimeOut] = libs.createSignal(false);
  let [activityNotStart, setActivityNotStart] = libs.createSignal(false);
  const missionActivated = () => {
    return activated() && !activityNotStart();
  };
  const taskActivated = () => {
    if (activated()) {
      return true;
    } else {
      return taskTimeOut() && !received();
    }
  };
  const receivedStage = libs.createMemo(() => {
    let stage = -1;
    if (arenaData()) {
      if (arenaData().active && arenaData().received) {
        stage = arenaData().progress;
      }
    }
    return stage;
  });
  const rewardEnable = () => {
    let _d = arenaData();
    if (_d) {
      if (!_d.received) {
        if (taskTimeOut()) {
          return true;
        }
        if (_d.progress >= _d.target) {
          return true;
        }
        if (_d.fail_progress >= _d.fail_target) {
          return true;
        }
      }
    }
    return false;
  };
  libs.createEffect(() => {
    if (taskActivated() && rewardEnable()) {
      $.Schedule(3, () => {
        GameEvents.SendEventClientSide("custom_ui_exclamation", {
          name: "activity"
        });
        GameEvents.SendEventClientSide("custom_ui_exclamation", {
          name: "Activity_arena"
        });
      });
    }
  });
  let timer;
  const checkCountdown = arenaTime => {
    let t = ServerTimestamp();
    let _d = arenaData();
    if (_d && _d.task_end_time > 0 && t > _d.task_end_time) {
      setTaskTimeOut(true);
    } else {
      setTaskTimeOut(false);
    }
    if (_d && _d.active && !_d.received) {
      setCountdownType(3);
      setActivityCountdown(_d.task_end_time);
    } else if (t > arenaTime.start_time) {
      setCountdownType(2);
      setActivityCountdown(arenaTime.end_time);
    } else {
      setCountdownType(1);
      setActivityCountdown(arenaTime.start_time);
    }
    setTokenUseEnable(t >= arenaTime.token_time && t < arenaTime.end_time);
    if (t < arenaTime.start_time) {
      if (_d && _d.task_start_time >= arenaTime.token_time) {
        setActivityNotStart(true);
      } else {
        setActivityNotStart(false);
      }
    } else {
      setActivityNotStart(false);
    }
  };
  libs.createEffect(libs.on(() => {
    return [props.selected, props.show];
  }, () => {
    if (props.selected && props.show) {
      let time = getArenaActivityTime();
      checkCountdown(time);
      timer = setInterval(() => {
        checkCountdown(time);
      }, 1000);
    } else {
      if (timer != undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    }
  }));
  libs.onMount(() => {
    let gameEventIDList = [];
    let NetTableIDList = [];
    gameEventIDList.push(useNetData("player_wallet", data => {
      setMoonstone(data.moonstone);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("arene_settlement", data => {
      if (data.reward.length > 0 && !data.state) {
        showPopup("ArenaSettlement", {});
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      if (data) {
        let activity_data = data.find(v => v.activity_id == activityID);
        if (activity_data) {
          let extra_information = JSON.parseSafe(activity_data.extra_information);
          if (Object.keys(extra_information).length > 0) {
            setTicketToken(extra_information.arena_ticket_token);
            setTicketPrice(extra_information.arena_ticket_price);
            setRewardList(extra_information.rewards.sort((a, b) => a.reward_id - b.reward_id));
          }
        }
      }
    }));
    gameEventIDList.push(useNetData("arena_activity_data", data => {
      if (data?.[activityID.toString()]) {
        let _data = data[activityID.toString()];
        setArenaData(_data);
      }
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
      if (timer != undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    });
  });
  const FAKE_TOKEN_STORE_DATA = () => {
    let data = {
      limit_count: 1,
      tag: "arena",
      overseas_real_price: 0,
      russia_origin_price: 0,
      russia_real_price: 0,
      is_first: 0,
      items: [{
        amounts: 1,
        status: 1,
        item_id: 1900001,
        pid: 9750001,
        orderby: 1
      }],
      title: "1",
      overseas_origin_price: 0,
      pay_type: ticketToken(),
      start_time: 0,
      end_time: 0,
      id: 9750001,
      origin_price: ticketPrice(),
      real_price: ticketPrice(),
      discount: 0,
      vip: 0,
      img: "",
      order_by: 1,
      status: 1,
      limit_type: 0
    };
    return data;
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !props.selected
      });
    },
    id: "Activity_arena",
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return libs.createComponent(Player.PlayerCurrency, {
            type: "moonstone"
          });
        }
      }), libs.createComponent(EOM_Label.EOM_Label, {
        id: "ActivitySidebarTitle",
        text: "#Activity_arena_sidebar_title"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ActivitySidebar",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "BGStar",
            hittest: false
          }), libs.createComponent(EOM_Label.EOM_Label, {
            id: "RewardTip",
            text: "#Activity_arena_1"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardPreviewList",
            scroll: "y",
            get children() {
              return libs.createComponent(libs.Index, {
                get each() {
                  return previewRewardList();
                },
                children: (item, i) => libs.createComponent(EOM_Panel.EOM_Panel, {
                  className: "RewardPreview",
                  get children() {
                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "RewardPreviewImage",
                      get children() {
                        return libs.createComponent(ProductImage.ProductImage, {
                          get itemid() {
                            return item().item_id;
                          }
                        });
                      }
                    }), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "RewardPreviewContent",
                      get children() {
                        return [libs.createComponent(EOM_Label.EOM_Label, {
                          get text() {
                            return `#${item().item_id}`;
                          }
                        }), libs.createComponent(EOM_Label.EOM_Label, {
                          get text() {
                            return `x${item().amounts}`;
                          }
                        })];
                      }
                    })];
                  }
                })
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TokenAccessButtons",
            get children() {
              return libs.createComponent(libs.Switch, {
                get fallback() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    flowChildren: "right",
                    horizontalAlign: "center",
                    get tooltip_text() {
                      return $.Localize("#" + ticketToken()) + " x" + ticketPrice();
                    },
                    get children() {
                      return [libs.createComponent(EOM_Icon.EOM_Icon, {
                        size: "24",
                        verticalAlign: "center",
                        get src() {
                          return getTokenSrcPath(ticketToken());
                        }
                      }), libs.createComponent(EOM_Label.EOM_Label, {
                        verticalAlign: "center",
                        y: "-2px",
                        get text() {
                          return ` x${ticketPrice()}`;
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Button.EOM_Button, {
                    id: "TokenAccessButton",
                    get enabled() {
                      return !buttonCooldown();
                    },
                    get color() {
                      return tokenUseEnable() ? "Gold" : "Red";
                    },
                    text: "#Activity_arena_tokenaccess",
                    onactivate: () => {
                      if (!tokenUseEnable()) {
                        showPopup("ErrorMessage", {
                          msg: "#activity_invalid_time"
                        });
                        return;
                      }
                      setButtonCooldown(true);
                      $.Schedule(0.5, () => {
                        if (setButtonCooldown != undefined) {
                          setButtonCooldown(false);
                        }
                      });
                      if (costEnough()) {
                        showPopup("StoreBuyItem", {
                          itemData: FAKE_TOKEN_STORE_DATA(),
                          group: "StoreBuyItem",
                          custom_buy_callback: () => {
                            callAction("start_arena", {
                              activity_id: activityID
                            });
                          }
                        });
                      } else {
                        showPopup("StoreBuyItem", {
                          itemData: FAKE_TOKEN_STORE_DATA(),
                          group: "StoreBuyItem",
                          custom_buy_callback: () => {
                            showPopup("StoreBuyItemResult", {
                              result: "failure",
                              reason: "no_enough_moon",
                              group: String(FAKE_TOKEN_STORE_DATA().id)
                            });
                          }
                        });
                      }
                    }
                  })];
                },
                get children() {
                  return [libs.createComponent(libs.Match, {
                    get when() {
                      return libs.memo(() => !!activated())() && received();
                    },
                    get children() {
                      return libs.createComponent(EOM_Button.EOM_Button, {
                        id: "TokenAccessButton",
                        className: "Received",
                        enabled: false,
                        color: "Gold",
                        text: "#activity_receive"
                      });
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return taskActivated();
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        horizontalAlign: "center",
                        get children() {
                          return [libs.createComponent(EOM_Button.EOM_Button, {
                            id: "TokenAccessButton",
                            get enabled() {
                              return libs.memo(() => !!!buttonCooldown())() && rewardEnable();
                            },
                            color: "Green",
                            text: "#mail_action_receive",
                            onactivate: () => {
                              GameEvents.SendCustomEventToServer("receive_arena_reward", {});
                              setButtonCooldown(true);
                              $.Schedule(0.5, () => {
                                if (setButtonCooldown != undefined) {
                                  setButtonCooldown(false);
                                }
                              });
                            }
                          }), libs.createComponent(libs.Show, {
                            get when() {
                              return rewardEnable();
                            },
                            get children() {
                              return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                hittest: false
                              });
                            }
                          })];
                        }
                      });
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("ActivityCountdown", "Type" + countdownType());
            },
            get children() {
              return [libs.createComponent(EOM_Label.EOM_Label, {
                id: "ActivityCountdownTitle",
                get text() {
                  return $.Localize("#Activity_arena_countdown" + countdownType());
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "right",
                horizontalAlign: "center",
                get children() {
                  return [libs.createComponent(EOM_Icon.EOM_Icon, {
                    id: "ActivityCountdownIcon"
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return countdownType() == 1;
                    },
                    get fallback() {
                      return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return activityCountdown();
                        },
                        text: "#countdown_hour",
                        server_time: true
                      });
                    },
                    get children() {
                      return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return activityCountdown();
                        },
                        text: "#countdown_time",
                        server_time: true,
                        short: true
                      });
                    }
                  })];
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MissionWrap",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "MissionTitle",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                text: "#Activity_arena_tasktitle"
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "MissionList",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                get className() {
                  return libs.classNames("Mission", {
                    UnLocked: missionActivated() && taskProgress() == 0,
                    Complete: taskProgress() > 0,
                    NotActivted: !missionActivated(),
                    invalid: taskProgress() > 1 || taskProgress() == 0 && failProgress() == 3
                  });
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "StatePoint"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MissionContent",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        id: "main",
                        text: "#Activity_arena_task1"
                      }), libs.createComponent(EOM_Label.EOM_Label, {
                        id: "progress",
                        get text() {
                          return `(${taskProgress() > 0 ? 1 : 0}/1)`;
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MissionReward",
                    get children() {
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return rewardList()[1] != undefined;
                        },
                        get children() {
                          return libs.createComponent(libs.Index, {
                            get each() {
                              return rewardList()[1].rewards;
                            },
                            children: (reward, i) => libs.createComponent(EOM_Panel.EOM_Panel, {
                              get className() {
                                return libs.classNames("RewardBlock", "Rarity" + reward().rarity);
                              },
                              get children() {
                                return [libs.createComponent(ProductImage.ProductImage, {
                                  get itemid() {
                                    return reward().item_id;
                                  },
                                  get count() {
                                    return reward().amounts;
                                  }
                                }), libs.createComponent(libs.Show, {
                                  get when() {
                                    return receivedStage() == 1;
                                  },
                                  get children() {
                                    return libs.createComponent(EOM_Icon.EOM_Icon, {
                                      width: "36px",
                                      height: "36px",
                                      align: "center center",
                                      opacity: ".98",
                                      get src() {
                                        return getSrcPath("icon/selected.png");
                                      },
                                      hittest: false
                                    });
                                  }
                                })];
                              }
                            })
                          });
                        }
                      });
                    }
                  }), libs.createComponent(EOM_Label.EOM_Label, {
                    id: "condition",
                    text: "#Activity_arena_task_condition"
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "MissionSeparator"
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                get className() {
                  return libs.classNames("Mission", {
                    UnLocked: missionActivated() && taskProgress() == 1,
                    Complete: taskProgress() > 1,
                    NotActivted: !missionActivated(),
                    invalid: taskProgress() > 2
                  });
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "StatePoint"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MissionContent",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        id: "main",
                        text: "#Activity_arena_task2"
                      }), libs.createComponent(EOM_Label.EOM_Label, {
                        id: "progress",
                        get text() {
                          return `(${taskProgress() > 1 ? 1 : 0}/1)`;
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MissionReward",
                    get children() {
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return rewardList()[2] != undefined;
                        },
                        get children() {
                          return libs.createComponent(libs.Index, {
                            get each() {
                              return rewardList()[2].rewards;
                            },
                            children: (reward, i) => libs.createComponent(EOM_Panel.EOM_Panel, {
                              get className() {
                                return libs.classNames("RewardBlock", "Rarity" + reward().rarity);
                              },
                              get children() {
                                return [libs.createComponent(ProductImage.ProductImage, {
                                  get itemid() {
                                    return reward().item_id;
                                  },
                                  get count() {
                                    return reward().amounts;
                                  }
                                }), libs.createComponent(libs.Show, {
                                  get when() {
                                    return receivedStage() == 2;
                                  },
                                  get children() {
                                    return libs.createComponent(EOM_Icon.EOM_Icon, {
                                      width: "36px",
                                      height: "36px",
                                      align: "center center",
                                      opacity: ".98",
                                      get src() {
                                        return getSrcPath("icon/selected.png");
                                      },
                                      hittest: false
                                    });
                                  }
                                })];
                              }
                            })
                          });
                        }
                      });
                    }
                  }), libs.createComponent(EOM_Label.EOM_Label, {
                    id: "condition",
                    text: "#Activity_arena_task_condition"
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "MissionSeparator"
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                get className() {
                  return libs.classNames("Mission", {
                    UnLocked: missionActivated() && taskProgress() == 2,
                    Complete: taskProgress() > 2,
                    NotActivted: !missionActivated(),
                    invalid: taskProgress() > 3
                  });
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "StatePoint"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MissionContent",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        id: "main",
                        text: "#Activity_arena_task3"
                      }), libs.createComponent(EOM_Label.EOM_Label, {
                        id: "progress",
                        get text() {
                          return `(${taskProgress() > 2 ? 1 : 0}/1)`;
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MissionReward",
                    get children() {
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return rewardList()[3] != undefined;
                        },
                        get children() {
                          return libs.createComponent(libs.Index, {
                            get each() {
                              return rewardList()[3].rewards;
                            },
                            children: (reward, i) => libs.createComponent(EOM_Panel.EOM_Panel, {
                              get className() {
                                return libs.classNames("RewardBlock", "Rarity" + reward().rarity);
                              },
                              get children() {
                                return [libs.createComponent(ProductImage.ProductImage, {
                                  get itemid() {
                                    return reward().item_id;
                                  },
                                  get count() {
                                    return reward().amounts;
                                  }
                                }), libs.createComponent(libs.Show, {
                                  get when() {
                                    return receivedStage() == 3;
                                  },
                                  get children() {
                                    return libs.createComponent(EOM_Icon.EOM_Icon, {
                                      width: "36px",
                                      height: "36px",
                                      align: "center center",
                                      opacity: ".98",
                                      get src() {
                                        return getSrcPath("icon/selected.png");
                                      },
                                      hittest: false
                                    });
                                  }
                                })];
                              }
                            })
                          });
                        }
                      });
                    }
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("FailureMission", {
                NotActivted: !missionActivated(),
                invalid: taskProgress() > 0
              });
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "FailureCondition",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    text: "#Activity_arena_task0"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "LifeCounts",
                get children() {
                  return [...Array(3)].map((_, index) => libs.createComponent(EOM_Image.EOM_Image, {
                    get className() {
                      return libs.classNames("LifeImage", {
                        Alive: index < 3 - failProgress()
                      });
                    }
                  }));
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "FailureReward",
                get children() {
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return rewardList()[0] != undefined;
                    },
                    get children() {
                      return libs.createComponent(libs.Index, {
                        get each() {
                          return rewardList()[0].rewards;
                        },
                        children: (reward, i) => libs.createComponent(EOM_Panel.EOM_Panel, {
                          get className() {
                            return libs.classNames("RewardBlock", "Rarity" + reward().rarity);
                          },
                          get children() {
                            return [libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return reward().item_id;
                              },
                              get count() {
                                return reward().amounts;
                              }
                            }), libs.createComponent(libs.Show, {
                              get when() {
                                return receivedStage() == 0;
                              },
                              get children() {
                                return libs.createComponent(EOM_Icon.EOM_Icon, {
                                  width: "36px",
                                  height: "36px",
                                  align: "center center",
                                  opacity: ".98",
                                  get src() {
                                    return getSrcPath("icon/selected.png");
                                  },
                                  hittest: false
                                });
                              }
                            })];
                          }
                        })
                      });
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "MissionNotActivted",
            get visible() {
              return !missionActivated();
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                get text() {
                  return activated() && activityNotStart() ? "#Activity_arena_not_activated2" : "#Activity_arena_not_activated";
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ActivityDescription",
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            align: "center center",
            scroll: "y",
            margin: "36px 40px 36px 50px",
            paddingRight: "10px",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: language$f,
                text: "#Activity_arena_infodesc",
                html: true
              });
            }
          });
        }
      }), libs.createComponent(ArenaRank, {
        activity_id: activityID
      })];
    }
  });
};
const ArenaRank = props => {
  const activityID = props.activity_id;
  function getDefaultRankInfo() {
    return {
      rank: -1,
      uid: Number(getPlayerData(Players.GetLocalPlayer()).steamID ?? 1),
      value: 0,
      extra: {
        win_percent: 0.5,
        main_heroes: []
      },
      ban: {}
    };
  }
  const [selfRank8, setSelfRank8] = libs.createSignal(getDefaultRankInfo());
  const [leaderboard8, setLeaderBoard8] = libs.createSignal({});
  const [page8, setPage8] = libs.createSignal(1);
  const [loading8, setLoading8] = libs.createSignal(false);
  let rankList8;
  const leaderboardList8 = libs.createMemo(() => {
    const page = page8();
    const leaderboard = leaderboard8();
    if (Object.keys(leaderboard).length > 0) {
      return Object.keys(leaderboard).filter(rank => Number(rank) > (page - 1) * 50 && Number(rank) <= page * 50);
    }
    return [];
  });
  let cooldowning = false;
  let cdTimer = -1;
  let leaderRefresh = {};
  const startCooldown = () => {
    if (!cooldowning) {
      cooldowning = true;
      cdTimer = $.Schedule(300, () => {
        leaderRefresh = {};
        cdTimer = -1;
      });
    }
  };
  const requestLeaderData = ({
    callback,
    leaderboard_id,
    page,
    season_id,
    extra
  }) => {
    let request = false;
    if (leaderRefresh[leaderboard_id] == undefined) {
      leaderRefresh[leaderboard_id] = [];
    }
    if (!leaderRefresh[leaderboard_id][page]) {
      request = true;
      leaderRefresh[leaderboard_id][page] = true;
    }
    if (request) {
      callback();
      startCooldown();
      GameEvents.SendCustomEventToServer("request_leaderboard_data", {
        leaderboard_id,
        begin_rank: (page - 1) * 50 + 1,
        end_rank: page * 50,
        season_id,
        extra
      });
    }
  };
  libs.onMount(() => {
    const netTableListenerIDs = [];
    let gameEventListeners = [];
    gameEventListeners.push(useNetData("leaderboard_data_8", data => {
      setLoading8(false);
      setLeaderBoard8(data.leaderboard);
      setSelfRank8({
        rank: data.self_rank ?? -1,
        uid: Number(getPlayerData(Players.GetLocalPlayer()).steamID ?? 1),
        value: data.self_value ?? 0,
        extra: data.extra,
        ban: {}
      });
    }, Players.GetLocalPlayer()));
    gameEventListeners.push(useNetData("arene_settlement", data => {
      if (data.reward.length > 0 && !data.state) {
        leaderRefresh = {};
        if (cdTimer != -1) {
          $.CancelScheduled(cdTimer);
        }
        requestLeaderData({
          leaderboard_id: 8,
          page: page8(),
          callback: () => {
            setLoading8(true);
          },
          extra: activityID.toString(),
          season_id: 0
        });
        if (rankList8 != undefined) {
          rankList8.ScrollToTop();
        }
      }
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventListeners.forEach(id => GameEvents.Unsubscribe(id));
      netTableListenerIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
      if (cdTimer != -1) {
        $.CancelScheduled(cdTimer);
      }
    });
  });
  libs.createEffect(() => {
    requestLeaderData({
      leaderboard_id: 8,
      page: page8(),
      callback: () => {
        setLoading8(true);
      },
      extra: activityID.toString(),
      season_id: 0
    });
    if (rankList8 != undefined) {
      rankList8.ScrollToTop();
    }
  });
  return [libs.createComponent(EOM_Label.EOM_Label, {
    id: "RankWrapTitle",
    text: "#Activity_arena_rank_title"
  }), libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "RankWrap",
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RankWrapBG"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RankWrapMain",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RankTitle",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "rank1",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    text: "#BattleRecords_Rank"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "rank2",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    text: "#Rank_info"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "rank3",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    text: "#Activity_arena_rank_progress"
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RankList",
            scroll: "y",
            ref(r$) {
              const _ref$ = rankList8;
              typeof _ref$ === "function" ? _ref$(r$) : rankList8 = r$;
            },
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return libs.memo(() => !!!loading8())() && leaderboard8() != undefined;
                },
                get fallback() {
                  return libs.createComponent(EOM_Loading.EOM_Loading, {
                    marginTop: "320px",
                    horizontalAlign: "center",
                    type: "PointSpin"
                  });
                },
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return leaderboardList8();
                    },
                    children: (rank, index) => {
                      const rankData = () => leaderboard8()[Number(rank())];
                      return libs.createComponent(RankRowMedal, {
                        get rankData() {
                          return rankData();
                        },
                        index: index
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "SelfRank",
            get children() {
              return libs.createComponent(RankRowMedal, {
                get rankData() {
                  return selfRank8();
                },
                self: true
              });
            }
          })];
        }
      })];
    }
  }), libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "RankPages",
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        flowChildren: "right",
        align: "center center",
        get children() {
          return [libs.createComponent(EOM_Button.EOM_BaseButton, {
            get enabled() {
              return page8() != 1;
            },
            onactivate: () => setPage8(page8() - 1),
            className: "PageButton PageLeft",
            get children() {
              return [(() => {
                const _el$ = libs.createElement("Image", {}, null);
                libs.setProp(_el$, "className", "BG");
                return _el$;
              })(), (() => {
                const _el$2 = libs.createElement("Image", {}, null);
                libs.setProp(_el$2, "className", "PageArrow");
                return _el$2;
              })()];
            }
          }), libs.createComponent(libs.For, {
            each: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            children: i => {
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                onactivate: () => setPage8(i),
                get className() {
                  return libs.classNames("PageButton", {
                    Selected: page8() == i
                  });
                },
                get children() {
                  return [(() => {
                    const _el$5 = libs.createElement("Image", {}, null);
                    libs.setProp(_el$5, "className", "BG");
                    return _el$5;
                  })(), libs.createComponent(GenericPanel.CLabel, {
                    text: i
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            get enabled() {
              return page8() != 10;
            },
            onactivate: () => setPage8(page8() + 1),
            className: "PageButton PageRight",
            get children() {
              return [(() => {
                const _el$3 = libs.createElement("Image", {}, null);
                libs.setProp(_el$3, "className", "BG");
                return _el$3;
              })(), (() => {
                const _el$4 = libs.createElement("Image", {}, null);
                libs.setProp(_el$4, "className", "PageArrow");
                return _el$4;
              })()];
            }
          })];
        }
      });
    }
  })];
};
const RankRowMedal = props => {
  const avatarBorder = () => {
    if (props.self) return;
    return props.rankData.oid ?? 5710000;
  };
  const avatarBG = () => {
    if (props.self) return;
    return props.rankData.oid2 ?? 5720000;
  };
  const avatarDecoration = () => {
    if (props.self) return;
    return props.rankData.oid3 ?? 5730000;
  };
  return (() => {
    const _el$6 = libs.createElement("Panel", {}, null),
      _el$7 = libs.createElement("Image", {}, _el$6),
      _el$8 = libs.createElement("Image", {}, _el$6),
      _el$9 = libs.createElement("Image", {}, _el$6);
    libs.setProp(_el$7, "className", "RankBGLeft");
    libs.setProp(_el$8, "className", "RankBGRight");
    libs.setProp(_el$9, "className", "RankBG");
    libs.insert(_el$6, libs.createComponent(EOM_Panel.EOM_Panel, {
      flowChildren: "right",
      width: "100%",
      height: "100%",
      get children() {
        return [(() => {
          const _el$0 = libs.createElement("Panel", {
            id: "Tab_Rank"
          }, null);
          libs.setProp(_el$0, "className", "RankRowTab");
          libs.insert(_el$0, libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return props.rankData.rank == -1;
                },
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    className: "NoRank",
                    text: "#SnowRankLabel1"
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return props.rankData.rank <= 3;
                },
                get children() {
                  const _el$1 = libs.createElement("Image", {}, null);
                  libs.effect(_$p => libs.setProp(_el$1, "className", "RankIcon Rank" + props.rankData.rank, _$p));
                  return _el$1;
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return props.rankData.rank > 3;
                },
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return props.rankData.rank;
                    }
                  });
                }
              })];
            }
          }));
          return _el$0;
        })(), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "Tab_Info",
          className: "RankRowTab",
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              flowChildren: "right",
              get customTooltip() {
                return {
                  name: "ladder_player_profile",
                  steamID: props.rankData.uid,
                  avatarBorder: avatarBorder(),
                  avatarBG: avatarBG(),
                  avatarDecoration: avatarDecoration(),
                  ban: props.rankData.ban?.name ? 1 : 0
                };
              },
              onactivate: () => {
                showPopup("PlayerProfile", {
                  uid: props.rankData.uid,
                  ornament_equipted: {
                    [OrnamentType.AVATAR_BORDER]: avatarBorder(),
                    [OrnamentType.AVATAR_BACKGROUND]: avatarBG(),
                    [OrnamentType.AVATAR_DECORATION]: avatarDecoration()
                  },
                  ban: props.rankData.ban?.name
                });
              },
              get children() {
                return [libs.createComponent(Player.PlayerAvatar, {
                  get steamID() {
                    return props.rankData.uid.toString();
                  },
                  get ban() {
                    return props.rankData.ban?.name == true;
                  },
                  get playerID() {
                    return Players.GetLocalPlayer();
                  },
                  get avatar_border() {
                    return avatarBorder();
                  }
                }), libs.createComponent(Player.PlayerName, {
                  get steamID() {
                    return props.rankData.uid.toString();
                  },
                  get ban() {
                    return props.rankData.ban?.name == true;
                  }
                })];
              }
            });
          }
        }), (() => {
          const _el$10 = libs.createElement("Panel", {
            id: "Tab_Value"
          }, null);
          libs.setProp(_el$10, "className", "RankRowTab");
          libs.insert(_el$10, libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return props.rankData.value ?? 0;
            }
          }));
          return _el$10;
        })()];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$6, "className", libs.classNames("RankRow", "Rank" + props.rankData.rank, "Index" + (props.index ?? 0) % 2, {
      Self: props.self
    }), _$p));
    return _el$6;
  })();
};

let fFlipTime$5 = 0.5;
const language$e = $.Language().toLowerCase();
const [singleCost$4] = libs.createSignal(6);
const [rewardShow$5, setRewardShow$5] = libs.createSignal(false);
const [rewardList$5, setRewardList$5] = libs.createSignal([]);
const [drawButtonEnable$5, setDrawButtonEnable$5] = libs.createSignal(true);
const [info_box_content$5, setInfoBoxContent$5] = libs.createSignal();
const [drawSuccess$5, setDrawSuccess$5] = libs.createSignal(false);
const [drawEnd$5, setDrawEnd$5] = libs.createSignal(false);
const [drawSoundIndex$5, setDrawSoundIndex$5] = libs.createSignal(-1);
libs.createEffect(libs.on(rewardList$5, _rewardList => {
  if (_rewardList.length == 0 && rewardShow$5()) {
    setRewardShow$5(false);
  }
}));
const getRarity$5 = (itemID, amount) => {
  let rarity = 0;
  let gotten = false;
  let type = Number(itemID.toString().slice(0, 3));
  let content = info_box_content$5();
  if (content) {
    for (const v of content) {
      if (v.item_id == itemID) {
        if (type == 110) {
          if (amount >= v.amount_min && amount <= v.amount_max) {
            if (v.rarity == "n") {
              rarity = 0;
              gotten = true;
            } else if (v.rarity == "r") {
              rarity = 1;
              gotten = true;
            } else if (v.rarity == "sr") {
              rarity = 2;
              gotten = true;
            } else if (v.rarity == "ssr") {
              rarity = 3;
              gotten = true;
            }
          }
        } else {
          if (v.rarity == "n") {
            rarity = 0;
            gotten = true;
          } else if (v.rarity == "r") {
            rarity = 1;
            gotten = true;
          } else if (v.rarity == "sr") {
            rarity = 2;
            gotten = true;
          } else if (v.rarity == "ssr") {
            rarity = 3;
            gotten = true;
          }
        }
        if (gotten) break;
      }
    }
  }
  return rarity;
};
const Activity_tutu1 = props => {
  const activityPool = 92000008;
  const activityID = props.activity_id;
  const show = () => props.show;
  const [activityCollection, setActivityCollection] = libs.createSignal({});
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [endtime, setEndtime] = libs.createSignal(1714924800);
  const activityToken = 1100011;
  const [token_1100011, setToken_1100011] = libs.createSignal(0);
  const [token_1100099, setToken_1100099] = libs.createSignal(0);
  const [progress, setProgress] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const nextRewardData = libs.createMemo(() => {
    let data;
    let canReceive = false;
    const current_rewardInfoList = rewardInfoList();
    const current_activityCollection = Object.keys(activityCollection()).length > 0 ? activityCollection() : {
      "1": 2
    };
    if (Object.keys(current_activityCollection).length > 0) {
      for (let index = 0; index < current_rewardInfoList.length; index++) {
        const info = current_rewardInfoList[index];
        if (data == undefined) {
          if (index == current_rewardInfoList.length - 1) {
            data = info;
          }
          if (current_activityCollection[info.reward_id.toString()] == 0) {
            canReceive = true;
          } else if (current_activityCollection[info.reward_id.toString()] == 2) {
            data = info;
          }
        }
      }
    }
    return {
      canReceive,
      data
    };
  });
  const CHANCE_UP_LIST = [15, 30, 50, 120, 180, 300, 450, 750, 1000];
  const nextUpNeedCount = () => {
    let count;
    for (let index = 0; index < CHANCE_UP_LIST.length; index++) {
      if (progress() < CHANCE_UP_LIST[index]) {
        count = CHANCE_UP_LIST[index] - progress();
        break;
      }
    }
    return count;
  };
  const nextRewardsCount = () => {
    let count = -1;
    if (nextRewardData().data && nextRewardData().data?.threshold) {
      count = nextRewardData().data?.threshold - progress();
    }
    return count;
  };
  const updateBoxContent = () => {
    const info_box_pool_data = getNetDataCache("info_box_pool_data");
    const info_box_content = getNetDataCache("info_box_content");
    if (info_box_pool_data && info_box_content) {
      const dropName = info_box_pool_data.find(v => v.pool == activityPool)?.drop_content;
      if (dropName && info_box_content[dropName]) {
        setInfoBoxContent$5(info_box_content[dropName]);
      }
    }
  };
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useNetData("open_box_activity_data", data => {
      if (data[activityID]) {
        if (data[activityID]?.rewards != undefined) {
          setActivityCollection(data[activityID].rewards);
        }
        setProgress(data[activityID]?.progress ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID) {
          const reward = JSON.parse(activityInfo.extra_information);
          setRewardInfoList(reward.rewards);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_box_content", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("info_box_pool_data", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("player_token", data => {
      setToken_1100011(data["1100011"]?.num ?? 0);
      setToken_1100099(data["1100099"]?.num ?? 0);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["TutuRedeem"] ?? [];
      result.sort((a, b) => {
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  const [willSkip, setWillSkip] = libs.createSignal(false);
  let pDrawWindow;
  let BGButtonLists;
  let BGLayer;
  let BG2;
  let Content1;
  let Content2;
  let Content3;
  let Content4;
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList$5();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        if (itemID == 9300006) {
          rarity = 2;
        } else {
          rarity = getRarity$5(itemID, data.amounts);
        }
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  libs.createEffect(libs.on(show, showed => {
    if (showed && !rewardShow$5() && handledRewardData().list.length > 0) {
      showDrawRewards(handledRewardData().list);
    }
  }));
  const _addHidden = p => {
    if (p?.IsValid()) {
      p.AddClass("Hidden");
    }
  };
  const _removeHidden = p => {
    if (p?.IsValid()) {
      p.RemoveClass("Hidden");
    }
  };
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex$5()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex$5(-1);
    }
    if (show()) {
      let p1 = $("#Tutu1DrawPortal");
      let p2 = $("#Tutu1DrawPortalGold");
      let p3 = $("#Tutu1DrawPortalRed");
      if (p1?.IsValid()) {
        p1.StopParticlesWithEndcaps();
        p1.style.opacity = "1";
      }
      if (p2?.IsValid()) {
        p2.StopParticlesWithEndcaps();
        p2.style.opacity = "0";
      }
      if (p3?.IsValid()) {
        p3.StopParticlesWithEndcaps();
        p3.style.opacity = "0";
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow$5()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess$5()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd$5(false);
    setDrawButtonEnable$5(false);
    setRewardList$5([]);
    let seq = new RunSequentialActions();
    if (rewardShow$5()) {
      setRewardShow$5(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        _addHidden(BGLayer);
        _addHidden(BG2);
        _addHidden(Content1);
        _addHidden(Content2);
        _addHidden(Content3);
        _addHidden(Content4);
        _addHidden($("#SkipButton"));
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        $("#Tutu1DrawPortal").StartParticles();
        $("#Tutu1DrawPortalGold").StartParticles();
        $("#Tutu1DrawPortalRed").StartParticles();
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex$5(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$5()) return true;
        if (handledRewardData().list.length > 0 || drawEnd$5()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$5()) return false;
        if (handledRewardData().list.length > 0 || drawEnd$5()) {
          if (handledRewardData().resultType != 0) {
            $("#Tutu1DrawPortal").style.opacity = "0.01";
            if (handledRewardData().resultType == 2) {
              $("#Tutu1DrawPortalRed").style.opacity = "1";
            } else {
              $("#Tutu1DrawPortalGold").style.opacity = "1";
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: 2000099,
      pool: activityPool,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        setRewardList$5(data.data.map(v => {
          if (v.orderby == undefined) {
            v.orderby = Round(Math.random() * 100);
          }
          return v;
        }).sort((a, b) => a.orderby - b.orderby));
        setDrawSuccess$5(true);
      } else {
        setDrawSuccess$5(false);
      }
      setDrawEnd$5(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("RewardList");
      let seq = new RunSequentialActions();
      seq.actions.push(new RunFunctionAction(() => {
        setRewardShow$5(true);
        pRewardList.RemoveAndDeleteChildren();
        const count = items.length;
        for (let i = 0; i < count; i++) {
          const data = items[i];
          let itemID = data.origin_item_id ?? data.itemId;
          let rarity = data.rarity;
          let p = $.CreatePanel("Panel", pRewardList, "");
          p.AddClass("AwardItem");
          if (count == 1) {
            p.AddClass("Single");
          } else {
            p.AddClass("Multi" + (i + 1));
          }
          p.AddClass("Rarity" + rarity);
          SaveData(p, "iRarity", rarity);
          libs.render(() => (() => {
            const _el$ = libs.createElement("Panel", {
                id: "AwardItemContainer"
              }, null),
              _el$2 = libs.createElement("Panel", {}, _el$),
              _el$3 = libs.createElement("Panel", {}, _el$),
              _el$4 = libs.createElement("Panel", {}, _el$),
              _el$1 = libs.createElement("Panel", {}, _el$);
            libs.setProp(_el$2, "className", "AwardBG");
            libs.setProp(_el$3, "className", "New");
            libs.setProp(_el$4, "className", "Mask");
            libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "MaskMain",
              get children() {
                return [libs.createComponent(ProductItem.ProductItem, {
                  id: "StoreItemImage",
                  itemid: itemID,
                  rarity: rarity,
                  get count() {
                    return data.origin_item_id == undefined ? data.amounts : 1;
                  }
                }), libs.createComponent(CosmeticCard.CosmeticImage, {
                  hittest: false,
                  width: "200px",
                  height: "200px",
                  y: "-10px",
                  align: "center center",
                  get itemid() {
                    return itemID.toString();
                  }
                }), libs.createComponent(libs.Switch, {
                  get children() {
                    return [libs.createComponent(libs.Match, {
                      when: rarity == 3,
                      get children() {
                        return [(() => {
                          const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                            squarePixels: true,
                            particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                            lookAt: "0 0 0",
                            cameraOrigin: "0 0 200",
                            fov: 30
                          }, null);
                          libs.setProp(_el$5, "style", {
                            width: "260px",
                            height: "260px",
                            align: "center center"
                          });
                          return _el$5;
                        })(), libs.createElement("DOTAParticleScenePanel", {
                          id: "GoldParticle",
                          squarePixels: true,
                          particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                          lookAt: "0 0 0",
                          cameraOrigin: "250 0 0",
                          fov: 18
                        }, null), libs.createElement("DOTAParticleScenePanel", {
                          id: "GoldParticle2",
                          squarePixels: true,
                          particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                          lookAt: "0 0 0",
                          cameraOrigin: "400 0 0",
                          fov: 16
                        }, null)];
                      }
                    }), libs.createComponent(libs.Match, {
                      when: rarity == 4,
                      get children() {
                        return [libs.createElement("DOTAParticleScenePanel", {
                          id: "RedParticle3",
                          squarePixels: true,
                          particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                          lookAt: "0 0 0",
                          cameraOrigin: "0 0 200",
                          fov: 30
                        }, null), libs.createElement("DOTAParticleScenePanel", {
                          id: "RedParticle",
                          squarePixels: true,
                          particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                          lookAt: "0 0 0",
                          cameraOrigin: "250 0 0",
                          fov: 18
                        }, null), libs.createElement("DOTAParticleScenePanel", {
                          id: "RedParticle2",
                          squarePixels: true,
                          particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                          lookAt: "0 0 0",
                          cameraOrigin: "400 0 0",
                          fov: 16
                        }, null)];
                      }
                    })];
                  }
                })];
              }
            }));
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return data.origin_item_id != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "Conversion",
                  get children() {
                    return [libs.createElement("Image", {
                      id: "ConversionBG"
                    }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ConversionInfo",
                      get children() {
                        return [libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return $.Localize("#Conversion");
                          }
                        }), libs.createComponent(EOM_Image.EOM_Image, {
                          id: "TokenIcon",
                          get src() {
                            return getPayTypeIconPath(data.itemId);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return "×" + data.amounts;
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
              IsNew: true
            }), _$p));
            return _el$;
          })(), p);
        }
      }));
      seq.actions.push(new WaitAction(0.5));
      seq.actions.push(new RunFunctionAction(() => {
        if (pRewardList) {
          let flipSeqList = new RunStaggeredActions(fFlipTime$5 / 2);
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p) {
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                GoldParticle.StopParticlesWithEndcaps();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StopParticlesWithEndcaps();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                RedParticle.StopParticlesWithEndcaps();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StopParticlesWithEndcaps();
              }
              p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime$5 + "s";
              let flipSeq = new RunSequentialActions();
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid()) {
                  if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                    p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                  }
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$5 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                  p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                }
              }));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  Game.EmitSound("playercard.flip");
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$5 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  SaveData(p, "Flipped", "1");
                  if (GoldParticle && GoldParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle.StartParticles();
                  }
                  if (GoldParticle2 && GoldParticle2.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle2.StartParticles();
                  }
                }
                if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                  setDrawButtonEnable$5(true);
                }
              }));
              flipSeqList.actions.push(flipSeq);
            }
          }
          RunSingleAction(flipSeqList);
        }
      }));
      RunSingleAction(seq);
    }
  };
  const funcRewardShowContinue = () => {
    let bBack = true;
    setDrawButtonEnable$5(true);
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("RewardList");
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow$5(false);
        setRewardList$5([]);
        _removeHidden(BGButtonLists);
        _removeHidden(BGLayer);
        _removeHidden(BG2);
        _removeHidden(Content1);
        _removeHidden(Content2);
        _removeHidden(Content3);
        _removeHidden(Content4);
        _removeHidden($("#SkipButton"));
      }
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  libs.createEffect(libs.on(exchangeShow, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "TutuActivityMain1",
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        hittest: false,
        id: "Portal",
        particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal.vpcf",
        cameraOrigin: "0 0 900",
        lookAt: "0 0 0",
        fov: 40.5,
        particleonly: true
      }, null), libs.createElement("DOTAParticleScenePanel", {
        hittest: false,
        id: "Tutu1DrawPortal",
        startActive: false,
        squarePixels: true,
        light: "light",
        camera: "camera_top",
        map: "scene/draw_open",
        renderdeferred: false,
        deferredalpha: true,
        particleonly: false,
        particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
        fov: 45,
        cameraOrigin: "0 0 900",
        lookAt: "0 0 0"
      }, null), libs.createElement("DOTAParticleScenePanel", {
        hittest: false,
        id: "Tutu1DrawPortalGold",
        startActive: false,
        light: "light",
        camera: "camera_top",
        map: "scene/draw_open",
        squarePixels: true,
        renderdeferred: false,
        deferredalpha: true,
        particleonly: false,
        particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
        fov: 45,
        cameraOrigin: "0 0 900",
        lookAt: "0 0 0"
      }, null), libs.createElement("DOTAParticleScenePanel", {
        hittest: false,
        id: "Tutu1DrawPortalRed",
        startActive: false,
        squarePixels: true,
        light: "light",
        camera: "camera_top",
        map: "scene/draw_open",
        renderdeferred: false,
        deferredalpha: true,
        particleonly: false,
        particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
        fov: 45,
        cameraOrigin: "0 0 900",
        lookAt: "0 0 0"
      }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BG2",
        ref(r$) {
          const _ref$ = BG2;
          typeof _ref$ === "function" ? _ref$(r$) : BG2 = r$;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return [libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: activityToken
          }), libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: 1100013
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainContainer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            ref(r$) {
              const _ref$2 = BGLayer;
              typeof _ref$2 === "function" ? _ref$2(r$) : BGLayer = r$;
            },
            hittest: false,
            get children() {
              return [libs.createComponent(InfoButton.InfoButton, {
                className: language$e,
                id: "MillionInfoButton",
                info: "#SnowballInfo",
                tooltip: "#Activity_tutu1_infodesc"
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language$e,
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityCountdown",
                className: language$e,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    align: "center center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "timeIcon",
                        get backgroundImage() {
                          return getImagePath("activity/tutu/t3_time_icon.png");
                        }
                      }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return endtime();
                        },
                        text: "#countdown_time"
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PoolInfoIcon",
                className: language$e,
                size: "24",
                get src() {
                  return getSrcPath("icon/c_info.png");
                },
                customTooltip: {
                  name: "custom_text",
                  text: "#Activity_Tutu_poolchance"
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "BunnyGirls",
                hittest: false,
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "BunnyGirl",
                    id: "BunnyGirl1"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "BunnyGirl",
                    id: "BunnyGirl2"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "BunnyGirl",
                    id: "BunnyGirl3"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "BunnyGirl",
                    id: "BunnyGirl4"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "BunnyGirl",
                    id: "BunnyGirl5"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "GoldenGirlSlogen",
                    get children() {
                      return [libs.createComponent(EOM_Icon.EOM_Icon, {
                        get src() {
                          return getSrcPath("activity/tutu/t3_icon_02.png");
                        }
                      }), libs.createComponent(GenericPanel.CLabel, {
                        text: "#5310001"
                      })];
                    }
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DiscountTokens",
            ref(r$) {
              const _ref$3 = Content1;
              typeof _ref$3 === "function" ? _ref$3(r$) : Content1 = r$;
            },
            get children() {
              return [libs.createComponent(EOM_Icon.EOM_Icon, {
                width: "40px",
                height: "40px",
                get src() {
                  return getSrcPath("tokens/" + 1100099 + ".png");
                }
              }), libs.createComponent(GenericPanel.CLabel, {
                text: "#Activity_Tutu_discountToken",
                get dialogVariables() {
                  return {
                    count: token_1100099()
                  };
                }
              })];
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            className: "DrawStackCount",
            ref(r$) {
              const _ref$4 = Content2;
              typeof _ref$4 === "function" ? _ref$4(r$) : Content2 = r$;
            },
            onactivate: self => {
              showPopup("ActivityTutu", {
                activity_id: activityID,
                title: "Activity_tutu1"
              });
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "CurrentStackCount",
                onactivate: self => {},
                get children() {
                  return [libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return progress();
                    }
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return nextRewardData().canReceive;
                    },
                    get children() {
                      return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                        type: "default"
                      });
                    }
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "CurrentStackCountTitle",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    text: "#Activity_Tutu_stackcount"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "CurrentStackMiddle",
                className: language$e,
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return nextRewardsCount() >= 0 ? "#Activity_Tutu_stackunlock" : "#activity_completed";
                    },
                    get dialogVariables() {
                      return {
                        count: nextRewardsCount()
                      };
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "CurrentStackNextReward",
                get children() {
                  return (() => {
                    const rewardInfo = () => {
                      const current_data = nextRewardData().data;
                      if (current_data?.rewards != undefined) {
                        return current_data.rewards[0];
                      }
                      return;
                    };
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return rewardInfo() != undefined;
                      },
                      get children() {
                        return [libs.createComponent(GenericPanel.CImage, {
                          get src() {
                            return getSrcPath("store_items/" + rewardInfo().item_id + ".png");
                          },
                          onmouseover: self => {
                            $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + rewardInfo().item_id, "#" + rewardInfo().item_id + "_description");
                          },
                          onmouseout: self => {
                            $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          get text() {
                            return "" + (rewardInfo().amounts > 1 ? rewardInfo().amounts : "");
                          }
                        })];
                      }
                    });
                  })();
                }
              })];
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "ExchangeButton",
            ref(r$) {
              const _ref$5 = Content4;
              typeof _ref$5 === "function" ? _ref$5(r$) : Content4 = r$;
            },
            get className() {
              return $.Language().toLowerCase();
            },
            text: `#Store_Exchange_Button`,
            onactivate: () => setExchangeShow(true)
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return nextUpNeedCount() != undefined;
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "Banner",
            ref(r$) {
              const _ref$6 = Content3;
              typeof _ref$6 === "function" ? _ref$6(r$) : Content3 = r$;
            },
            get children() {
              return libs.createComponent(GenericPanel.CLabel, {
                text: "#Activity_Tutu_chanceup",
                get dialogVariables() {
                  return {
                    count: nextUpNeedCount()
                  };
                }
              });
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        ref(r$) {
          const _ref$7 = BGButtonLists;
          typeof _ref$7 === "function" ? _ref$7(r$) : BGButtonLists = r$;
        },
        id: "DrawButtonList",
        get children() {
          return [libs.createComponent(DrawButton$5, {
            get enable() {
              return drawButtonEnable$5();
            },
            get ticket() {
              return token_1100011();
            },
            get discountToken() {
              return token_1100099();
            },
            count: 1,
            drawCallback: Draw
          }), libs.createComponent(DrawButton$5, {
            get enable() {
              return drawButtonEnable$5();
            },
            get ticket() {
              return token_1100011();
            },
            get discountToken() {
              return token_1100099();
            },
            count: 10,
            drawCallback: Draw
          })];
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "SkipButton",
        get ["class"]() {
          return libs.classNames("SkipButton", {
            Active: willSkip()
          });
        },
        onactivate: () => setWillSkip(v => !v),
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Square",
            get src() {
              return getSrcPath("draw/c_square.png");
            }
          }), libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Hook",
            get src() {
              return getSrcPath("draw/c_hook.png");
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            text: "#Skip_Button"
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("DrawCardResultWindow", {
            Show: rewardShow$5()
          });
        },
        ref(r$) {
          const _ref$8 = pDrawWindow;
          typeof _ref$8 === "function" ? _ref$8(r$) : pDrawWindow = r$;
        },
        acceptsfocus: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ResultContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RewardList"
              }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                id: "RewardClose",
                onactivate: () => funcRewardShowContinue()
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Currencies",
                get children() {
                  return [libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: activityToken
                  }), libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: 1100013
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton$5, {
                get enable() {
                  return drawButtonEnable$5();
                },
                get ticket() {
                  return token_1100011();
                },
                get discountToken() {
                  return token_1100099();
                },
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton$5, {
                get enable() {
                  return drawButtonEnable$5();
                },
                get ticket() {
                  return token_1100011();
                },
                get discountToken() {
                  return token_1100099();
                },
                count: 10,
                drawCallback: Draw
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangePanel",
        get className() {
          return libs.classNames({
            Show: exchangeShow()
          });
        },
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$15 = libs.createElement("Panel", {
              id: "TopBarBG"
            }, null);
            libs.insert(_el$15, libs.createComponent(Player.CurrencyGroup, {
              tokens: [1100013]
            }));
            return _el$15;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeContainer",
            onactivate: () => setExchangeShow(false),
            get children() {
              return [(() => {
                const _el$16 = libs.createElement("Panel", {
                  id: "ExchangeList"
                }, null);
                libs.setProp(_el$16, "onactivate", () => {});
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeListTitle",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "ExchangeListTitleLabel",
                      text: `#${activityPool}_exchange`
                    }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                      onactivate: () => {
                        setExchangeShow(false);
                      }
                    })];
                  }
                }), null);
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeItemList",
                  flowChildren: "right-wrap",
                  scroll: "y",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return exchangeShow();
                      },
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return storeItemData();
                          },
                          children: (storeItem, index) => libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                            storeItem: storeItem(),
                            purchased_product: purchased_product(),
                            player_hero: playerHero(),
                            player_ornament: playerOrnament(),
                            previewing_id: previewInfo().cid,
                            onPreview: (cosmetic_id, exchange_id) => {
                              previewTimer = $.Schedule(0.3, () => {
                                previewTimer = -1;
                                if (previewInfo().eid != exchange_id) {
                                  setPreviewInfo({
                                    cid: cosmetic_id,
                                    eid: exchange_id
                                  });
                                }
                              });
                            },
                            onCancelPreview: () => {
                              if (previewTimer != -1) {
                                $.CancelScheduled(previewTimer);
                                previewTimer = -1;
                              }
                            }
                          })))
                        });
                      }
                    });
                  }
                }), null);
                return _el$16;
              })(), (() => {
                const _el$17 = libs.createElement("Panel", {
                  id: "ExchangePreview"
                }, null);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid != -1;
                  },
                  get children() {
                    return [libs.createComponent(CosmeticPreview.CosmeticPreview, {
                      get cosmetic_id() {
                        return previewInfo().cid;
                      }
                    }), (() => {
                      const _el$18 = libs.createElement("Panel", {
                        id: "CosmeticDesc"
                      }, null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticName",
                        get text() {
                          return '#' + previewInfo().cid;
                        }
                      }), null);
                      libs.insert(_el$18, libs.createComponent(EOM_Separator.EOM_Separator, {
                        size: "short"
                      }), null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticAccess",
                        get text() {
                          return GetCosmeticAccessDescription(previewInfo().cid);
                        }
                      }), null);
                      return _el$18;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return previewInfo().cid.toString().slice(0, 3) == "531";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          text: "#CosmeticToEquip",
                          align: "center bottom",
                          color: "Blue",
                          marginBottom: "68px",
                          x: "175px",
                          onactivate: () => {
                            ToggleWindows('MenuButton_cosmetics', true);
                            clientSideEvent("jump_to_bunny_cosmetic", {});
                          }
                        });
                      }
                    })];
                  }
                }));
                return _el$17;
              })()];
            }
          })];
        }
      })];
    }
  });
};
const DrawButton$5 = props => {
  const costInfo = libs.createMemo(() => {
    const single = singleCost$4();
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("TutuDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900220,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + 1100011 + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return [libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return costInfo().discount;
                },
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    className: "TicketLabelDiscount",
                    verticalAlign: "center",
                    get text() {
                      return ` ${costInfo().origin_cost} `;
                    }
                  });
                }
              })];
            }
          })];
        }
      })];
    }
  });
};

const taskRewards$2 = {
  "4001": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4002": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4003": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4004": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4005": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4006": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4007": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4008": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4009": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  },
  "4010": {
    "1100125": {
      "amounts": 5,
      "rarity": 2
    }
  }
};
let previewTimer$2 = -1;
const C4C1Reward = prop => {
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("C4C1Reward", "Rarity" + prop.reward_info.rarity, "State" + prop.state);
    },
    onmouseover: self => {
      prop.onMouseOver(prop.reward_info.item_id);
    },
    onmouseout: self => {
      if (previewTimer$2 != -1) {
        $.CancelScheduled(previewTimer$2);
        previewTimer$2 = -1;
      }
    },
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4C1RewardBG",
        get children() {
          return [libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return prop.reward_info.item_id;
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            id: "RewardCount",
            get text() {
              return `${prop.reward_info.amounts}`;
            },
            hittest: false
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Light",
        hittest: false
      }), libs.createComponent(libs.Show, {
        get when() {
          return prop.state == 1;
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "C4C1ActivityCheck",
            hittest: false
          });
        }
      })];
    }
  });
};
const Activity_C4C1 = props => {
  const activityID = props.activity_id;
  const [endTime, setEndTime] = libs.createSignal(0);
  const [previewID, setPreviewID] = libs.createSignal(2000002);
  const language = $.Language().toLowerCase();
  const localPlayerID = Players.GetLocalPlayer();
  const [progress, setProgress] = libs.createSignal(0);
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  libs.createSignal([]);
  const [progressRewardsState, setProgressRewardsState] = libs.createSignal({});
  const [activityToken, setActivityTokenID] = libs.createSignal(-1);
  callAction("common_task_progress", {
    project: "c4"
  });
  const tasks = netdata_utils.createPlayerNetData("linkage_activity_data", Players.GetLocalPlayer(), {});
  netdata_utils.createNetDataEffect("info_activity_data", data => {
    for (const activityInfo of data) {
      if (activityInfo.activity_id == activityID) {
        const infomation = JSON.parse(activityInfo.extra_information);
        setActivityTokenID(infomation.activity_token);
        setRewardInfoList(infomation.rewards);
        setEndTime(infomation.activity_end_time ?? activityInfo.end_time);
      }
    }
  });
  libs.createEffect(libs.on(progress, v => {
    callAction("activity_data", {
      activity_id: activityID
    });
  }, {
    defer: true
  }));
  netdata_utils.createNetDataEffect("player_token", data => {
    setProgress(data?.["1100125"]?.num ?? 0);
  }, localPlayerID);
  netdata_utils.createNetDataEffect("task_activity_data", data => {
    if (data?.[activityID]) {
      setProgressRewardsState(data[activityID].rewards);
    }
  }, localPlayerID);
  const progressBarPct = () => {
    const progressRewards = rewardInfoList();
    const length = progressRewards.length;
    const stages = [21, 47, 73, 100];
    const progressa = progress();
    let pct = 100;
    for (let i = length - 1; i >= 0; i--) {
      const stageValue = stages[i];
      const threshold = progressRewards[i]?.threshold;
      if (progressa <= threshold) {
        pct = Math.min(100, progressa / (threshold ?? 100) * stageValue);
      }
    }
    return pct;
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_C4C1",
    overflow: "noclip",
    get children() {
      return [libs.createElement("DOTAScenePanel", {
        id: "ActivityPortrait",
        allowrotation: false,
        map: "scene/c4c1.vmap",
        camera: "preview_camera",
        light: "preview_light",
        particleonly: false,
        deferredalpha: true,
        antialias: true
      }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4Log"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "XLog"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4C1Log"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4C1Title",
        className: language,
        hittest: false
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4C1_Countdown",
        align: "center center",
        flowChildren: "right",
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "C4C1_Countdown_Icon",
            width: "14px",
            height: "20px"
          }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
            get endTime() {
              return endTime();
            },
            text: "#countdown_time",
            id: "C4C1_Countdown_Text"
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Warning"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "WarningText",
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            text: "#C4C1WarningText"
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4C1RuleBtn",
        onmouseover: self => {
          if (language != "schinese") {
            ShowCustomTooltip(self, "long_text", {
              text: "#Activity_C4C1_description"
            });
          } else {
            $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_C4C1_description");
          }
        },
        onmouseout: self => {
          if (language != "schinese") {
            HideCustomTooltip(self, "long_text");
          } else {
            $.DispatchEvent("DOTAHideTextTooltip", self);
          }
        }
      }), libs.createComponent(EOM_Button.EOM_Button, {
        id: "ToC1Btn",
        className: language,
        text: "#ToC1BtnText",
        onactivate: () => {
          $.DispatchEvent('DOTAShowCustomGamePage', 2331812965);
          $.DispatchEvent('DOTASubscribeToCustomGame', 2331812965);
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ToC1Tip",
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            text: "#ToC1TipText"
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "C4C1Task",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "C4C1TaskProgress",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "C4C1TaskHeadItme",
                get children() {
                  return libs.createComponent(ProductImage.ProductImage, {
                    itemid: 1100125
                  });
                }
              }), libs.createComponent(EOM_Label.EOM_Label, {
                id: "C4C1TaskProgressText",
                get text() {
                  return progress().toString();
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ProgressBarBg",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "ProgressBar",
                    get width() {
                      return `${progressBarPct()}%`;
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ProgressRewardList",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return rewardInfoList();
                    },
                    children: (data, index) => {
                      const rewardID = () => data().reward_id;
                      const state = () => progressRewardsState()?.[rewardID()] ?? 2;
                      const rewardInfo = () => data().rewards[0];
                      const x = () => `${15 + 19.5 * index}%`;
                      return libs.createComponent(EOM_Button.EOM_BaseButton, {
                        get className() {
                          return libs.classNames("C4C1ExchangeRewardButton", {});
                        },
                        get x() {
                          return x();
                        },
                        get enabled() {
                          return state() == 0;
                        },
                        onactivate: self => {
                          callAction("activity_receive", {
                            activity_id: activityID,
                            reward_id: rewardID()
                          });
                        },
                        get children() {
                          return [libs.createComponent(libs.Show, {
                            get when() {
                              return rewardInfoList().length == index + 1;
                            },
                            fallback: () => libs.createComponent(C4C1Reward, {
                              get reward_info() {
                                return rewardInfo();
                              },
                              get state() {
                                return state();
                              },
                              onMouseOver: id => {
                                previewTimer$2 = $.Schedule(0.3, () => {
                                  previewTimer$2 = -1;
                                  if (previewID() != id) {
                                    setPreviewID(id);
                                  }
                                });
                              }
                            }),
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {});
                            }
                          }), libs.createComponent(libs.Show, {
                            get when() {
                              return rewardInfoList().length == index + 1;
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "ShanXiaYin",
                                get classList() {
                                  return {
                                    Received: state() == 1
                                  };
                                },
                                onmouseover: self => {
                                  $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + "5100071", "#" + "5100071" + "_description");
                                },
                                onmouseout: self => {
                                  $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                                },
                                get children() {
                                  return libs.createComponent(libs.Show, {
                                    get when() {
                                      return state() == 1;
                                    },
                                    get children() {
                                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                                        className: "C4C1ActivityCheck",
                                        id: "ShanXiaYinCheck"
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "threshold",
                            "text-aglin": "center",
                            get text() {
                              return `${data().threshold}`;
                            }
                          })];
                        }
                      });
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "C4C1TaskList",
            scroll: "y",
            get children() {
              return libs.createComponent(libs.Index, {
                get each() {
                  return Object.values(tasks());
                },
                children: (data, index) => {
                  const progressPct = () => Math.min(data().Progress / data().Total * 100, 100);
                  const progressText = () => Math.min(data().Progress, data().Total).toString() + "/" + data().Total.toString();
                  const received = () => data().Received;
                  const y = () => `${90 / Math.max(1, Object.values(tasks()).length) * (index + 1)}%`;
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "C4C1Task2",
                    get y() {
                      return y();
                    },
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "C4C1TaskProgressBg2",
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "C4C1TaskProgress2",
                            get width() {
                              return `${progressPct()}%`;
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "C4C1TaskProgressText2Pos",
                        get children() {
                          return libs.createComponent(GenericPanel.CLabel, {
                            id: "C4C1TaskProgressText2 ",
                            get text() {
                              return progressText();
                            }
                          });
                        }
                      }), libs.createComponent(GenericPanel.CLabel, {
                        id: "C4C1TaskText",
                        get text() {
                          return "#ActivityTask" + `${data().TaskId}`;
                        }
                      }), libs.createComponent(EOM_Image.EOM_Image, {
                        id: "C4C1TaskLineDivider"
                      }), libs.createComponent(libs.Index, {
                        get each() {
                          return Object.keys(taskRewards$2[data().TaskId.toString()]);
                        },
                        children: (data2, index) => {
                          const rewardID = () => data2();
                          const rewardValue = () => taskRewards$2[data().TaskId.toString()][rewardID()];
                          const state = () => {
                            if (received()) {
                              return 1;
                            } else if (progressPct() >= 100) {
                              return 0;
                            } else {
                              return 2;
                            }
                          };
                          const c4C1RewardProps = () => {
                            let c4C1RewardProps = {
                              reward_info: {
                                item_id: Number(rewardID()),
                                amounts: rewardValue().amounts,
                                rarity: rewardValue().rarity
                              },
                              state: state(),
                              onMouseOver: id => {}
                            };
                            return c4C1RewardProps;
                          };
                          const rewardInfo = () => c4C1RewardProps().reward_info;
                          const x = () => `${105 - 14 * (index + 1)}%`;
                          return libs.createComponent(EOM_Button.EOM_BaseButton, {
                            get className() {
                              return libs.classNames("C4C1ExchangeRewardButton", {});
                            },
                            get x() {
                              return x();
                            },
                            get enabled() {
                              return state() == 0;
                            },
                            y: "-10%",
                            onactivate: () => {
                              callAction("common_task_receive", {
                                project: "c4",
                                task_id: data().TaskId
                              });
                            },
                            get children() {
                              return libs.createComponent(libs.Show, {
                                get when() {
                                  return Object.values(tasks()).length == index;
                                },
                                fallback: () => libs.createComponent(C4C1Reward, {
                                  get reward_info() {
                                    return rewardInfo();
                                  },
                                  get state() {
                                    return state();
                                  },
                                  onMouseOver: id => {
                                    if (previewID() != id) {
                                      previewTimer$2 = $.Schedule(0.3, () => {
                                        previewTimer$2 = -1;
                                        if (previewID() != id) {
                                          setPreviewID(id);
                                        }
                                      });
                                    }
                                  }
                                }),
                                get children() {
                                  return libs.createComponent(EOM_Panel.EOM_Panel, {});
                                }
                              });
                            }
                          });
                        }
                      })];
                    }
                  });
                }
              });
            }
          })];
        }
      })];
    }
  });
};

const PAGE_SIZE = 7;
const REWARD_COUNT = 14;
const language$d = $.Language().toLowerCase();
const Activity_Carnival = props => {
  const activityID = props.activity_id;
  const localPlayerID = Players.GetLocalPlayer();
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [rewardStateList, setRewardStateList] = libs.createSignal({});
  const [endTime, setEndTime] = libs.createSignal(0);
  const [page, setPage] = libs.createSignal(0);
  const [pageAnimation, setPageAnimation] = libs.createSignal();
  const [pageTransitioning, setPageTransitioning] = libs.createSignal(false);
  const pageCount = libs.createMemo(() => Math.max(1, Math.ceil(rewardInfoList().length / PAGE_SIZE)));
  const pageRewardList = libs.createMemo(() => rewardInfoList().slice(page() * PAGE_SIZE, (page() + 1) * PAGE_SIZE));
  let pageSwitchTimer = -1;
  let pageAnimationTimer = -1;
  libs.onMount(() => {
    const gameEventIDList = [];
    gameEventIDList.push(useNetData("info_activity_data", data => {
      const activityInfo = data?.find(value => value.activity_id == activityID);
      if (!activityInfo) return;
      setEndTime(activityInfo.end_time);
      const extraInfo = JSON.parseSafe(activityInfo.extra_information);
      const rewards = Array.isArray(extraInfo?.rewards) ? extraInfo.rewards : Object.values(extraInfo?.rewards ?? {});
      setRewardInfoList(rewards.filter(reward => reward?.rewards?.[0]).sort((a, b) => (a.threshold ?? a.reward_id) - (b.threshold ?? b.reward_id)).slice(0, REWARD_COUNT));
      setPage(0);
    }));
    gameEventIDList.push(useNetData("login_activity_data", data => {
      setRewardStateList(data?.[activityID]?.rewards ?? {});
    }, localPlayerID));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      if (pageSwitchTimer != -1) $.CancelScheduled(pageSwitchTimer);
      if (pageAnimationTimer != -1) $.CancelScheduled(pageAnimationTimer);
    });
  });
  let cooldown = false;
  const changePage = nextPage => {
    if (pageTransitioning() || nextPage < 0 || nextPage >= pageCount() || nextPage == page()) return;
    const moveForward = nextPage > page();
    setPageTransitioning(true);
    setPageAnimation(moveForward ? "ExitLeft" : "ExitRight");
    Game.EmitSound("ui_generic_button_click");
    pageSwitchTimer = $.Schedule(0.14, () => {
      setPage(nextPage);
      setPageAnimation(moveForward ? "EnterRight" : "EnterLeft");
      pageSwitchTimer = -1;
      pageAnimationTimer = $.Schedule(0.18, () => {
        setPageAnimation();
        setPageTransitioning(false);
        pageAnimationTimer = -1;
      });
    });
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !props.selected
      });
    },
    id: "Activity_Carnival",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BGLayer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "ActivityTitle",
            className: language$d,
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityCountdown",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                align: "center center",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "timeIcon"
                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return endTime();
                    },
                    text: "#countdown_time"
                  })];
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Day14Preview",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "PreviewBubble"
          }), libs.createComponent(EOM_PortraitFullBody.EOM_PortraitFullBody, {
            id: "Hero3D",
            hittest: false,
            showPedestal: false,
            unitname: "carnival_5203059",
            allowrotation: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "PreviewTextBoard",
            className: language$d
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardPager",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardList",
            get className() {
              return pageAnimation();
            },
            get children() {
              return libs.createComponent(libs.For, {
                get each() {
                  return pageRewardList();
                },
                children: (data, pageIndex) => {
                  const day = () => page() * PAGE_SIZE + pageIndex() + 1;
                  return libs.createComponent(CarnivalItem, {
                    get rarity() {
                      return data.rewards[0].rarity;
                    },
                    get item_id() {
                      return data.rewards[0].item_id;
                    },
                    get amounts() {
                      return data.rewards[0].amounts;
                    },
                    get canReceive() {
                      return rewardStateList()[data.reward_id.toString()] == 0;
                    },
                    get received() {
                      return rewardStateList()[data.reward_id.toString()] == 1;
                    },
                    get day() {
                      return day();
                    },
                    onReceive: () => {
                      if (cooldown) return;
                      cooldown = true;
                      $.Schedule(0.1, () => cooldown = false);
                      callAction("activity_receive", {
                        activity_id: activityID,
                        reward_id: data.reward_id
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("PageArrow", "Left", {
                Enabled: page() > 0,
                Disabled: page() == 0
              });
            },
            get hittest() {
              return page() > 0;
            },
            onactivate: () => changePage(page() - 1),
            get children() {
              return libs.createComponent(EOM_Image.EOM_Image, {});
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("PageArrow", "Right", {
                Enabled: page() < pageCount() - 1,
                Disabled: page() == pageCount() - 1
              });
            },
            get hittest() {
              return page() < pageCount() - 1;
            },
            onactivate: () => changePage(page() + 1),
            get children() {
              return libs.createComponent(EOM_Image.EOM_Image, {});
            }
          })];
        }
      })];
    }
  });
};
const CarnivalItem = props => {
  const rarity = () => finiteNumber(Number(props.rarity), 0);
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("CarnivalItem", {
        down: props.day % 2 == 0
      });
    },
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("GiftPackBG", `Rarity${rarity()}`);
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "GiftPackMain",
        get children() {
          return [libs.createComponent(EOM_Label.EOM_Label, {
            id: "ItemName",
            text: "#login7day_title",
            get dialogVariables() {
              return {
                day: props.day
              };
            }
          }), libs.createComponent(EOM_Image.EOM_Image, {
            id: "RewardItem",
            get src() {
              return getSrcPath(`store_items/${props.item_id}.png`);
            },
            onmouseover: self => $.DispatchEvent("DOTAShowTitleTextTooltip", self, `#${props.item_id}`, `#${props.item_id}_description`),
            onmouseout: self => $.DispatchEvent("DOTAHideTitleTextTooltip", self)
          }), libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return props.received;
                },
                get children() {
                  return libs.createComponent(EOM_Icon.EOM_Icon, {
                    id: "ReceivedIcon"
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return props.canReceive;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    className: "ReceiveButton",
                    color: "Green",
                    text: "#activity_action_receive",
                    get onactivate() {
                      return props.onReceive;
                    }
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(GenericPanel.CLabel, {
        className: "ItemCount",
        get text() {
          return `×${props.amounts}`;
        }
      })];
    }
  });
};

let fFlipTime$4 = 0.5;
const language$c = $.Language().toLowerCase();
const [rewardShow$4, setRewardShow$4] = libs.createSignal(false);
const [rewardList$4, setRewardList$4] = libs.createSignal([]);
const [drawButtonEnable$4, setDrawButtonEnable$4] = libs.createSignal(true);
const [info_box_content$4, setInfoBoxContent$4] = libs.createSignal();
const [drawSuccess$4, setDrawSuccess$4] = libs.createSignal(false);
const [drawEnd$4, setDrawEnd$4] = libs.createSignal(false);
const [drawSoundIndex$4, setDrawSoundIndex$4] = libs.createSignal(-1);
libs.createEffect(libs.on(rewardList$4, _rewardList => {
  if (_rewardList.length == 0 && rewardShow$4()) {
    setRewardShow$4(false);
  }
}));
const getRarity$4 = (itemID, amount) => {
  let rarity = 0;
  let gotten = false;
  let type = Number(itemID.toString().slice(0, 3));
  let content = info_box_content$4();
  if (content) {
    for (const v of content) {
      if (v.item_id == itemID) {
        if (type == 110) {
          if (amount >= v.amount_min && amount <= v.amount_max) {
            if (v.rarity == "n") {
              rarity = 0;
              gotten = true;
            } else if (v.rarity == "r") {
              rarity = 1;
              gotten = true;
            } else if (v.rarity == "sr") {
              rarity = 2;
              gotten = true;
            } else if (v.rarity == "ssr") {
              rarity = 3;
              gotten = true;
            }
          }
        } else {
          if (v.rarity == "n") {
            rarity = 0;
            gotten = true;
          } else if (v.rarity == "r") {
            rarity = 1;
            gotten = true;
          } else if (v.rarity == "sr") {
            rarity = 2;
            gotten = true;
          } else if (v.rarity == "ssr") {
            rarity = 3;
            gotten = true;
          }
        }
        if (gotten) break;
      }
    }
  }
  return rarity;
};
const activityPool$4 = 99100012;
const boxID$4 = 2000095;
const exchangeTokenID$4 = 1100064;
const GuaranteedAmount = 180;
const customBoxID = 9314007;
const Activity_Dai = props => {
  const show = () => props.show;
  const activityToken = boxID$4;
  const activityID = props.activity_id;
  const [boxAmounts, setBoxAmounts] = libs.createSignal(0);
  netdata_utils.createNetDataEffect("player_props_amounts", v => setBoxAmounts(v[customBoxID] ?? 0), Players.GetLocalPlayer());
  const [endtime, setEndtime] = libs.createSignal(1753286400);
  const [boxToken, setBoxToken] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const updateBoxContent = () => {
    const info_box_pool_data = getNetDataCache("info_box_pool_data");
    const info_box_content = getNetDataCache("info_box_content");
    if (info_box_pool_data && info_box_content) {
      const dropName = info_box_pool_data.find(v => v.pool == activityPool$4)?.drop_content;
      if (dropName && info_box_content[dropName]) {
        setInfoBoxContent$4(info_box_content[dropName]);
      }
    }
  };
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  const [luck, setLuck] = libs.createSignal(0);
  const nextUpNeedCount = libs.createMemo(() => {
    if (luck() == 0) {
      return GuaranteedAmount;
    }
    return Math.max(1, GuaranteedAmount - luck() + 1);
  });
  libs.onMount(() => {
    callAction("box_luck", {
      bid: boxID$4,
      pool: activityPool$4
    });
    let gameEventIDList = [];
    let NetTableIDList = [];
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    gameEventIDList.push(useNetData("player_box_luck", data => {
      if (data && data[activityPool$4]) {
        setLuck(data[activityPool$4].luck);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID && activityInfo.extra_information) {
          const reward = JSON.parse(activityInfo.extra_information);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_box_content", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("info_box_pool_data", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("player_boxes", data => {
      setBoxToken(data[boxID$4]?.amounts ?? 0);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["dai"] ?? [];
      result.sort((a, b) => {
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const [willSkip, setWillSkip] = libs.createSignal(false);
  let pDrawWindow;
  let BGButtonLists;
  let BGLayer;
  let BG2;
  let Content1;
  let Content3;
  let Content4;
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList$4();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (itemID.toString().startsWith("931") && KeyValues.BackpackKv[itemID]) {
        rarity = KeyValues.BackpackKv[itemID].quality;
      } else if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        rarity = getRarity$4(itemID, data.amounts);
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  libs.createEffect(libs.on(() => ({
    _show: show(),
    _selected: props.selected
  }), v => {
    if (v._show && !rewardShow$4() && handledRewardData().list.length > 0) {
      showDrawRewards(handledRewardData().list);
    }
  }));
  const _addHidden = p => {
    if (p?.IsValid()) {
      p.AddClass("Hidden");
    }
  };
  const _removeHidden = p => {
    if (p?.IsValid()) {
      p.RemoveClass("Hidden");
    }
  };
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex$4()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex$4(-1);
    }
    if (show()) {
      let p1 = $("#DaiDrawPortal");
      let p2 = $("#DaiDrawPortalGold");
      let p3 = $("#DaiDrawPortalRed");
      if (p1?.IsValid()) {
        p1.StopParticlesImmediately(false);
        p1.style.opacity = "1";
      }
      if (p2?.IsValid()) {
        p2.StopParticlesImmediately(false);
        p2.style.opacity = "0";
      }
      if (p3?.IsValid()) {
        p3.StopParticlesImmediately(false);
        p3.style.opacity = "0";
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow$4()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess$4()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd$4(false);
    setDrawButtonEnable$4(false);
    setRewardList$4([]);
    let seq = new RunSequentialActions();
    if (rewardShow$4()) {
      setRewardShow$4(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        _addHidden(BGLayer);
        _addHidden(BG2);
        _addHidden(Content1);
        _addHidden(Content3);
        _addHidden(Content4);
        _addHidden($("#DaiSkipButton"));
        _addHidden($("#JianHaoExchangeRewardTooltip"));
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        $("#DaiDrawPortal")?.StartParticles();
        $("#DaiDrawPortalRed")?.StartParticles();
        $("#DaiDrawPortalGold")?.StartParticles();
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex$4(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$4()) return true;
        if (handledRewardData().list.length > 0 || drawEnd$4()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$4()) return false;
        if (handledRewardData().list.length > 0 || drawEnd$4()) {
          if (handledRewardData().resultType != 0) {
            if ($("#DaiDrawPortal")?.IsValid()) {
              $("#DaiDrawPortal").style.opacity = "0";
            }
            if (handledRewardData().resultType == 2) {
              if ($("#DaiDrawPortalRed")?.IsValid()) {
                $("#DaiDrawPortalRed").style.opacity = "1";
              }
            } else {
              if ($("#DaiDrawPortalGold")?.IsValid()) {
                $("#DaiDrawPortalGold").style.opacity = "1";
              }
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: boxID$4,
      pool: activityPool$4,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        setRewardList$4(data.data.map(v => {
          if (v.orderby == undefined) {
            v.orderby = Round(Math.random() * 100);
          }
          return v;
        }).sort((a, b) => a.orderby - b.orderby));
        setDrawSuccess$4(true);
      } else {
        setDrawSuccess$4(false);
      }
      setDrawEnd$4(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("JianHaoRewardList");
      let seq = new RunSequentialActions();
      seq.actions.push(new RunFunctionAction(() => {
        setRewardShow$4(true);
        pRewardList.RemoveAndDeleteChildren();
        const count = items.length;
        for (let i = 0; i < count; i++) {
          const data = items[i];
          let itemID = data.origin_item_id ?? data.itemId;
          let rarity = data.rarity;
          let p = $.CreatePanel("Panel", pRewardList, "");
          p.AddClass("AwardItem");
          if (count == 1) {
            p.AddClass("Single");
          } else {
            p.AddClass("Multi" + (i + 1));
          }
          p.AddClass("Rarity" + rarity);
          SaveData(p, "iRarity", rarity);
          libs.render(() => (() => {
            const _el$ = libs.createElement("Panel", {
                id: "AwardItemContainer"
              }, null),
              _el$2 = libs.createElement("Panel", {}, _el$),
              _el$3 = libs.createElement("Panel", {}, _el$),
              _el$4 = libs.createElement("Panel", {}, _el$),
              _el$1 = libs.createElement("Panel", {}, _el$);
            libs.setProp(_el$2, "className", "AwardBG");
            libs.setProp(_el$3, "className", "New");
            libs.setProp(_el$4, "className", "Mask");
            libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "MaskMain",
              get children() {
                return [libs.createComponent(ProductItem.ProductItem, {
                  id: "StoreItemImage",
                  itemid: itemID,
                  rarity: rarity,
                  get count() {
                    return data.origin_item_id == undefined ? data.amounts : 1;
                  }
                }), libs.createComponent(CosmeticCard.CosmeticImage, {
                  hittest: false,
                  width: "200px",
                  height: "200px",
                  y: "-10px",
                  align: "center center",
                  get itemid() {
                    return itemID.toString();
                  }
                })];
              }
            }), null);
            libs.insert(_el$4, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  when: rarity == 3,
                  get children() {
                    return [(() => {
                      const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                        squarePixels: true,
                        particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "0 0 200",
                        fov: 30
                      }, null);
                      libs.setProp(_el$5, "style", {
                        width: "260px",
                        height: "260px",
                        align: "center center"
                      });
                      return _el$5;
                    })(), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 30
                    }, null)];
                  }
                }), libs.createComponent(libs.Match, {
                  when: rarity == 4,
                  get children() {
                    return [libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle3",
                      squarePixels: true,
                      particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "0 0 200",
                      fov: 30
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 30
                    }, null)];
                  }
                })];
              }
            }), null);
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return data.origin_item_id != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "Conversion",
                  get children() {
                    return [libs.createElement("Image", {
                      id: "ConversionBG"
                    }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ConversionInfo",
                      get children() {
                        return [libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return $.Localize("#Conversion");
                          }
                        }), libs.createComponent(EOM_Image.EOM_Image, {
                          id: "TokenIcon",
                          get src() {
                            return getPayTypeIconPath(data.itemId);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return "×" + data.amounts;
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
              IsNew: true
            }), _$p));
            return _el$;
          })(), p);
        }
      }));
      seq.actions.push(new WaitAction(0.5));
      seq.actions.push(new RunFunctionAction(() => {
        if (pRewardList) {
          let flipSeqList = new RunStaggeredActions(fFlipTime$4 / 2);
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p && LoadData(p, "Flipped") != "1") {
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                GoldParticle.StopParticlesWithEndcaps();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StopParticlesWithEndcaps();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                RedParticle.StopParticlesWithEndcaps();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StopParticlesWithEndcaps();
              }
              p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime$4 + "s";
              let flipSeq = new RunSequentialActions();
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid()) {
                  if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                    p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                  }
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$4 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                  p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                }
              }));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  Game.EmitSound("playercard.flip");
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$4 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  SaveData(p, "Flipped", "1");
                  if (GoldParticle && GoldParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle.StartParticles();
                  }
                  if (GoldParticle2 && GoldParticle2.IsValid()) {
                    GoldParticle2.StartParticles();
                  }
                  if (RedParticle && RedParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    RedParticle.StartParticles();
                  }
                  if (RedParticle2 && RedParticle2.IsValid()) {
                    RedParticle2.StartParticles();
                  }
                }
                if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                  setDrawButtonEnable$4(true);
                }
              }));
              flipSeqList.actions.push(flipSeq);
            }
          }
          RunSingleAction(flipSeqList);
        }
      }));
      RunSingleAction(seq);
    }
  };
  const funcRewardShowContinue = () => {
    let bBack = true;
    setDrawButtonEnable$4(true);
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("JianHaoRewardList");
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow$4(false);
        setRewardList$4([]);
        _removeHidden(BGButtonLists);
        _removeHidden(BGLayer);
        _removeHidden(BG2);
        _removeHidden(Content1);
        _removeHidden(Content3);
        _removeHidden(Content4);
        _removeHidden($("#DaiSkipButton"));
        _removeHidden($("#JianHaoExchangeRewardTooltip"));
      }
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  libs.createEffect(libs.on(exchangeShow, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_Dai",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return [libs.createComponent(Player.PlayerCurrency, {
            type: "boxes",
            tokenID: activityToken
          }), libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: exchangeTokenID$4
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainContainer",
        hittest: false,
        get children() {
          return [libs.createComponent(libs.Show, {
            get when() {
              return props.show;
            },
            get children() {
              return [libs.createElement("DOTAParticleScenePanel", {
                hittest: false,
                id: "DaiDrawPortalGold",
                startActive: false,
                light: "light",
                camera: "camera_top",
                map: "scene/draw_open",
                renderdeferred: false,
                deferredalpha: true,
                particleonly: false,
                squarePixels: true,
                particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
                fov: 80,
                cameraOrigin: "0 0 900",
                lookAt: "0 0 0"
              }, null), libs.createElement("DOTAParticleScenePanel", {
                hittest: false,
                id: "DaiDrawPortal",
                startActive: false,
                light: "light",
                camera: "camera_top",
                map: "scene/draw_open",
                particleonly: false,
                squarePixels: true,
                particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
                fov: 80,
                cameraOrigin: "0 0 900",
                lookAt: "0 0 0"
              }, null), libs.createElement("DOTAParticleScenePanel", {
                hittest: false,
                id: "DaiDrawPortalRed",
                startActive: false,
                light: "light",
                camera: "camera_top",
                map: "scene/draw_open",
                renderdeferred: false,
                deferredalpha: true,
                particleonly: false,
                squarePixels: true,
                particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
                fov: 80,
                cameraOrigin: "0 0 900",
                lookAt: "0 0 0"
              }, null)];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            ref(r$) {
              const _ref$ = BGLayer;
              typeof _ref$ === "function" ? _ref$(r$) : BGLayer = r$;
            },
            hittest: false,
            get children() {
              return [libs.createElement("DOTAScenePanel", {
                hittest: false,
                id: "ActivityPreview",
                particleonly: false,
                allowrotation: false,
                light: "preview_light",
                camera: "preview_camera",
                map: "scene/dai_activity_hero",
                renderwaterreflections: true,
                deferredalpha: true,
                renderdeferred: true,
                rendershadows: true,
                allowsuspendrepaint: true
              }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityInfoButton",
                onmouseover: self => {
                  if (language$c != "schinese") {
                    ShowCustomTooltip(self, "long_text", {
                      text: "#Activity_dai_infodesc"
                    });
                  } else {
                    $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_dai_infodesc");
                  }
                },
                onmouseout: self => {
                  if (language$c != "schinese") {
                    HideCustomTooltip(self, "long_text");
                  } else {
                    $.DispatchEvent("DOTAHideTextTooltip", self);
                  }
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language$c,
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityCountdown",
                className: language$c,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    align: "center center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "timeIcon"
                      }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return endtime();
                        },
                        text: "#countdown_time"
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PoolInfoIcon",
                className: language$c,
                size: "24",
                get src() {
                  return getSrcPath("icon/c_info.png");
                },
                customTooltip: {
                  name: "custom_text",
                  text: "#Activity_dai_poolchance"
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return nextUpNeedCount() != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "DropBanner",
                    hittest: false,
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        text: "#Activity_nezha51_chanceup",
                        get dialogVariables() {
                          return {
                            count: nextUpNeedCount()
                          };
                        },
                        html: true
                      });
                    }
                  });
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return boxAmounts() > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "CustomBoxFastAccess",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "CustomBoxImage",
                        get children() {
                          return [libs.createComponent(ProductImage.ProductImage, {
                            itemid: customBoxID
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x ${boxAmounts()}`;
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Button.EOM_Button, {
                        color: "Gold",
                        text: "#UseSelfPickBox",
                        onactivate: () => {
                          showPopup("BackpackItemUse", {
                            id: customBoxID
                          });
                        }
                      })];
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "ExchangeButton",
            ref(r$) {
              const _ref$2 = Content4;
              typeof _ref$2 === "function" ? _ref$2(r$) : Content4 = r$;
            },
            get className() {
              return $.Language().toLowerCase();
            },
            text: `#Store_Exchange_Button`,
            onactivate: () => setExchangeShow(true)
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        ref(r$) {
          const _ref$3 = BGButtonLists;
          typeof _ref$3 === "function" ? _ref$3(r$) : BGButtonLists = r$;
        },
        id: "DrawButtonList",
        get children() {
          return [libs.createComponent(DrawButton$4, {
            get enable() {
              return drawButtonEnable$4();
            },
            get ticket() {
              return boxToken();
            },
            discountToken: 0,
            count: 1,
            drawCallback: Draw
          }), libs.createComponent(DrawButton$4, {
            get enable() {
              return drawButtonEnable$4();
            },
            get ticket() {
              return boxToken();
            },
            discountToken: 0,
            count: 10,
            drawCallback: Draw
          })];
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "DaiSkipButton",
        get ["class"]() {
          return libs.classNames("SkipButton", {
            Active: willSkip()
          });
        },
        onactivate: () => setWillSkip(v => !v),
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Square",
            get src() {
              return getSrcPath("draw/c_square.png");
            }
          }), libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Hook",
            get src() {
              return getSrcPath("draw/c_hook.png");
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            text: "#Skip_Button"
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("DrawCardResultWindow", {
            Show: rewardShow$4()
          });
        },
        ref(r$) {
          const _ref$4 = pDrawWindow;
          typeof _ref$4 === "function" ? _ref$4(r$) : pDrawWindow = r$;
        },
        acceptsfocus: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ResultContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "JianHaoRewardList",
                hittest: false
              }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                id: "RewardClose",
                onactivate: () => funcRewardShowContinue()
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Currencies",
                get children() {
                  return [libs.createComponent(Player.PlayerCurrency, {
                    type: "boxes",
                    tokenID: activityToken
                  }), libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: exchangeTokenID$4
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton$4, {
                get enable() {
                  return drawButtonEnable$4();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton$4, {
                get enable() {
                  return drawButtonEnable$4();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangePanel",
        get className() {
          return libs.classNames({
            Show: exchangeShow()
          });
        },
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$15 = libs.createElement("Panel", {
              id: "TopBarBG"
            }, null);
            libs.insert(_el$15, libs.createComponent(Player.CurrencyGroup, {
              tokens: [exchangeTokenID$4]
            }));
            return _el$15;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeContainer",
            onactivate: () => setExchangeShow(false),
            get children() {
              return [(() => {
                const _el$16 = libs.createElement("Panel", {
                  id: "ExchangeList"
                }, null);
                libs.setProp(_el$16, "onactivate", () => {});
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeListTitle",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "ExchangeListTitleLabel",
                      text: `#${activityPool$4}_exchange`
                    }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                      onactivate: () => {
                        setExchangeShow(false);
                      }
                    })];
                  }
                }), null);
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeItemList",
                  flowChildren: "right-wrap",
                  scroll: "y",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return exchangeShow();
                      },
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return storeItemData();
                          },
                          children: (storeItem, index) => libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                            storeItem: storeItem(),
                            purchased_product: purchased_product(),
                            player_hero: playerHero(),
                            player_ornament: playerOrnament(),
                            previewing_id: previewInfo().cid,
                            onPreview: (cosmetic_id, exchange_id) => {
                              previewTimer = $.Schedule(0.3, () => {
                                previewTimer = -1;
                                if (previewInfo().eid != exchange_id) {
                                  setPreviewInfo({
                                    cid: cosmetic_id,
                                    eid: exchange_id
                                  });
                                }
                              });
                            },
                            onCancelPreview: () => {
                              if (previewTimer != -1) {
                                $.CancelScheduled(previewTimer);
                                previewTimer = -1;
                              }
                            }
                          })))
                        });
                      }
                    });
                  }
                }), null);
                return _el$16;
              })(), (() => {
                const _el$17 = libs.createElement("Panel", {
                  id: "ExchangePreview"
                }, null);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid != -1;
                  },
                  get children() {
                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ExchangePreviewMain",
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return KeyValues.CosmeticsKv[previewInfo().cid];
                          },
                          get fallback() {
                            return libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return previewInfo().cid;
                              }
                            });
                          },
                          get children() {
                            return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                              get cosmetic_id() {
                                return previewInfo().cid;
                              }
                            });
                          }
                        });
                      }
                    }), (() => {
                      const _el$18 = libs.createElement("Panel", {
                        id: "CosmeticDesc"
                      }, null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticName",
                        get text() {
                          return '#' + previewInfo().cid;
                        }
                      }), null);
                      libs.insert(_el$18, libs.createComponent(EOM_Separator.EOM_Separator, {
                        size: "short"
                      }), null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticAccess",
                        get text() {
                          return GetCosmeticAccessDescription(previewInfo().cid);
                        }
                      }), null);
                      return _el$18;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return previewInfo().cid.toString().slice(0, 3) == "531";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          text: "#CosmeticToEquip",
                          align: "center bottom",
                          color: "Blue",
                          marginBottom: "68px",
                          x: "175px",
                          onactivate: () => {
                            ToggleWindows('MenuButton_cosmetics', true);
                            clientSideEvent("jump_to_bunny_cosmetic", {});
                          }
                        });
                      }
                    })];
                  }
                }));
                return _el$17;
              })()];
            }
          })];
        }
      })];
    }
  });
};
const DrawButton$4 = props => {
  const costInfo = libs.createMemo(() => {
    const single = 1;
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("DaiDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900280,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + boxID$4 + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              });
            }
          })];
        }
      })];
    }
  });
};

let dataSyncTimer$1;
const startDataTimer$1 = (tick, activityID) => {
  if (dataSyncTimer$1 != undefined) {
    callAction("activity_data", {
      activity_id: activityID
    });
    clearInterval(dataSyncTimer$1);
    dataSyncTimer$1 = undefined;
  }
  if (tick == -1) {
    return;
  }
  dataSyncTimer$1 = setInterval(() => {
    callAction("activity_data", {
      activity_id: activityID
    });
  }, tick * 1000);
};
const Activity_DragonBoat = props => {
  const activityID = props.activity_id;
  let token_id = 9310018;
  const language = $.Language().toLowerCase();
  const localPlayerID = Players.GetLocalPlayer();
  const [endTime, setEndTime] = libs.createSignal(1782403200);
  const [activityTokenCnt, setActivityTokenCnt] = libs.createSignal(0);
  const [price, setPrice] = libs.createSignal(1);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const [playerDatas, setPlayerDatas] = libs.createSignal([]);
  const [state, setState] = libs.createSignal(0);
  const [startTime, setStartTime] = libs.createSignal(0);
  const [dateNow, setDateNow] = libs.createSignal(ServerTimestamp());
  let JoinCD = false;
  let adjustMatchTime = false;
  const JoinDragonBoat = () => {
    if (activityTokenCnt() < price()) {
      ErrorMessage("#Activity_DragonBoat_NotEnough");
      return;
    }
    if (JoinCD) {
      return;
    }
    JoinCD = true;
    adjustMatchTime = true;
    $.Schedule(1, () => {
      JoinCD = false;
    });
    if (state() == 0) {
      setStartTime(Math.floor(Date.now() / 1000));
      callAction("join_dragonboat", {
        activity_id: activityID
      });
    }
  };
  netdata_utils.createNetDataEffect("player_props_amounts", data => {
    setActivityTokenCnt(data[token_id] ?? 0);
  }, localPlayerID);
  netdata_utils.createNetDataEffect("info_activity_data", data => {
    const v = data.find(info => info.activity_id == activityID);
    if (v) {
      setEndTime(v.end_time);
      const reward = JSON.parseSafe(v.extra_information);
      if (reward) {
        setRewardList(reward.rewards);
        if (reward.dragonboat_ticket_price !== undefined) {
          setPrice(reward.dragonboat_ticket_price);
        }
      }
    }
  });
  netdata_utils.createNetDataEffect("dragonboat_activity_data", v => {
    if (v && v[activityID]) {
      let data = v[activityID];
      libs.batch(() => {
        const lastState = state();
        checkState(lastState, data.state);
        setState(data.state);
        if (data.state != 0) {
          if (!(data.state == 1 && adjustMatchTime)) {
            setStartTime(data.start_time);
          }
        }
        if (data?.state == 2 || data?.state == 3) {
          if (data?.state == 3) {
            let self_data = data.player_datas.find(v => v.uid.toString() == steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
            let self_progress = self_data?.progress ?? 0;
            if (self_progress == 0) {
              setMatchNotExit(true);
              callAction("activity_receive", {
                activity_id: activityID,
                reward_id: 0
              });
            }
          }
          setPlayerDatas(data.player_datas);
        }
      });
    }
  }, localPlayerID);
  const [matchRemainMin, setRemainMin] = libs.createSignal("0");
  const [matchRemainSec, setRemainSec] = libs.createSignal("00");
  libs.createEffect(libs.on(startTime, v => {
    let start = startTime();
    if (state() == 1 || state() == 0 && start != 0) {
      const now = new Date(start * 1000);
      let curMin = now.getMinutes();
      let nextFiveMin = Math.ceil(curMin / 5) * 5;
      let curSec = now.getSeconds();
      let remainingSeconds = (nextFiveMin - curMin) * 60 - curSec;
      if (remainingSeconds < 0) {
        remainingSeconds += 5 * 60;
      }
      remainingSeconds += 10 + Round(Math.random() * 30);
      let finalMin = Math.floor(remainingSeconds / 60);
      let finalSec = remainingSeconds % 60;
      setRemainMin(finalMin.toString());
      setRemainSec((finalSec < 10 ? "0" : "") + finalSec.toString());
    }
  }));
  const [matchSuccess, setMatchSuccess] = libs.createSignal(false);
  const checkState = (lastState, nowState) => {
    if (nowState == 2) {
      startDataTimer$1(60 * 5, activityID);
    } else if (nowState == 1) {
      startDataTimer$1(10, activityID);
    } else {
      startDataTimer$1(-1, activityID);
    }
    setMatchSuccess(lastState == 1 && nowState == 2);
    if (lastState == 3 && nowState == 0) {
      setMatchNotExit(true);
    }
    lastState = nowState;
  };
  const showBoatList = () => matchNotExit() || (state() == 2 || state() == 3) && !matchSuccess();
  libs.onMount(() => {
    let t = setInterval(() => {
      setDateNow(ServerTimestamp());
    }, 1000);
    libs.onCleanup(() => {
      clearInterval(t);
    });
  });
  const matchOver = () => dateNow() >= startTime() + 60 * 60 * 3 || matchNotExit() || state() == 3;
  const [matchNotExit, setMatchNotExit] = libs.createSignal(false);
  const rewardReceived = () => matchNotExit();
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "Activity_DragonBoat",
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "CurrencyTopBar",
        hittest: false,
        get children() {
          return libs.createComponent(Player.CurrencyGroup, {
            tokens: [9310018]
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ActivityMainContent",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityTitle",
            get className() {
              return libs.classNames(language);
            },
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TimeBG",
            flowChildren: "right",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TimeIcon"
              }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                id: "TimeText",
                get endTime() {
                  return endTime();
                },
                text: "#countdown_time"
              })];
            }
          }), libs.createComponent(InfoButton.InfoButton, {
            info: "#ActivityRule",
            customTooltip: {
              name: "long_text",
              title: "#SnowballInfo",
              text: "#Activity_DragonBoat_infodesc"
            }
          }), libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => !!!matchNotExit())() && state() == 0;
                },
                get children() {
                  return [libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "JoinButton",
                    onactivate: () => {
                      JoinDragonBoat();
                    },
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        id: "TextJoin",
                        text: "#DragonBoatJoin"
                      });
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "TextBG",
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        flowChildren: "right",
                        align: "center center",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            verticalAlign: "center",
                            id: "JoinText",
                            get text() {
                              return $.Localize("#DragonBoatJoinText") + " x1";
                            }
                          }), libs.createComponent(EOM_Icon.EOM_Icon, {
                            size: "32",
                            verticalAlign: "center",
                            get src() {
                              return getTokenSrcPath(token_id);
                            }
                          })];
                        }
                      });
                    }
                  })];
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return !showBoatList();
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MatchingContent",
                    hittest: false,
                    get children() {
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return matchSuccess();
                        },
                        get fallback() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "MatchingIcon Loading"
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "LoadingText",
                            text: "#DragonBoatMatchTime",
                            get dialogVariables() {
                              return {
                                min: matchRemainMin(),
                                sec: matchRemainSec()
                              };
                            }
                          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                            id: "WaitBG",
                            enabled: false,
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                align: "center center",
                                flowChildren: "down",
                                get children() {
                                  return [libs.createComponent(GenericPanel.CLabel, {
                                    id: "WaitText",
                                    text: "#LoadingText"
                                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                    id: "WaitTime",
                                    onlyCoundown: false,
                                    get endTime() {
                                      return startTime();
                                    },
                                    text: "#dragonboat_loading_time"
                                  })];
                                }
                              });
                            }
                          })];
                        },
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "MatchingIcon Checked"
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "LoadingText",
                            text: "#DragonBoatJoinSuccess"
                          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                            id: "WaitBG",
                            "class": "Success",
                            onactivate: () => {
                              setMatchSuccess(false);
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                align: "center center",
                                flowChildren: "down",
                                get children() {
                                  return libs.createComponent(GenericPanel.CLabel, {
                                    id: "WaitText",
                                    text: "#Popup_Button_Confirm"
                                  });
                                }
                              });
                            }
                          })];
                        }
                      });
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return showBoatList();
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    get classList() {
                      return {
                        BeginBoat: true,
                        Show: state() == 2 || state() == 3
                      };
                    },
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        text: "#BeginBoat"
                      });
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "CompetitionScene",
                    hittest: false,
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "BoatPosition",
                        hittest: false,
                        get children() {
                          return [libs.createComponent(libs.Index, {
                            get each() {
                              return playerDatas();
                            },
                            children: (player, i) => {
                              libs.createEffect(libs.on(() => player().progress, () => {
                                if (props.show && props.selected) {
                                  checkProgress();
                                }
                              }));
                              let timer;
                              let previousProgress = 0;
                              const [uiProgress, setUIProgress] = libs.createSignal(previousProgress);
                              libs.createEffect(libs.on(() => ({
                                show: props.show,
                                selected: props.selected
                              }), () => {
                                if (props.show && props.selected) {
                                  checkProgress();
                                }
                              }));
                              const checkProgress = () => {
                                if (previousProgress == player().progress) {
                                  return;
                                }
                                if (timer != undefined) {
                                  clearInterval(timer);
                                }
                                let startProgress = uiProgress();
                                let targetProgress = player().progress;
                                previousProgress = targetProgress;
                                let duration = 500;
                                let tick = 30;
                                timer = setInterval(() => {
                                  duration -= tick;
                                  if (duration <= 0) {
                                    setUIProgress(player().progress);
                                    clearInterval(timer);
                                    return;
                                  }
                                  let newProgress = startProgress + (targetProgress - startProgress) * (1 - duration / 500);
                                  setUIProgress(newProgress);
                                }, tick);
                              };
                              const progress = () => {
                                return Clamp(uiProgress() / 32 * 100, 0, 100);
                              };
                              const steamid = () => (player().is_robot ? player().uid + 1 : player().uid).toString();
                              const reward_list = () => {
                                return rewardList().find(reward => reward.reward_id == player().rank)?.rewards ?? [];
                              };
                              libs.onCleanup(() => {
                                if (timer != undefined) {
                                  clearInterval(timer);
                                }
                              });
                              const [hover, setHover] = libs.createSignal(false);
                              const is_self = libs.createMemo(() => player().uid.toString() == steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
                              let clickCD = false;
                              const rewardEnable = () => !rewardReceived() && matchOver() && is_self();
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "PlayerRoad",
                                get className() {
                                  return libs.classNames("Index_" + i);
                                },
                                hittest: false,
                                get children() {
                                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "PlayerBG",
                                    get classList() {
                                      return {
                                        self: is_self()
                                      };
                                    },
                                    get children() {
                                      return [libs.createComponent(Player.EOM_Avatar, {
                                        id: "Avatar",
                                        get accountid() {
                                          return steamid();
                                        },
                                        hittest: false,
                                        hittestchildren: false
                                      }), libs.createComponent(Player.PlayerName, {
                                        id: "PlayerName",
                                        get steamID() {
                                          return player().uid.toString();
                                        }
                                      })];
                                    }
                                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "Road",
                                    hittest: false,
                                    get children() {
                                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "UpRope",
                                        hittest: false
                                      });
                                    }
                                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "BoatContainer",
                                    get classList() {
                                      return {
                                        Hover: hover()
                                      };
                                    },
                                    get style() {
                                      return {
                                        transform: `translateX(${progress() * 0.01 * (1034 - 120)}px)`
                                      };
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "Boat",
                                        get classList() {
                                          return {
                                            self: is_self()
                                          };
                                        },
                                        hittest: false,
                                        get children() {
                                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                                            id: "BoatTooltipBox",
                                            get dialogVariables() {
                                              return {
                                                value: player().game_count
                                              };
                                            },
                                            onmouseover: self => {
                                              setHover(true);
                                              $.DispatchEvent("DOTAShowTextTooltip", self, $.Localize("#Activity_DragonBoat_progress", self));
                                            },
                                            onmouseout: self => {
                                              setHover(false);
                                              $.DispatchEvent("DOTAHideTextTooltip", self);
                                            }
                                          });
                                        }
                                      }), libs.createComponent(EOM_Image.EOM_Image, {
                                        id: "RankInfo",
                                        hittest: false,
                                        get classList() {
                                          return {
                                            self: is_self()
                                          };
                                        },
                                        get children() {
                                          return libs.createComponent(GenericPanel.CLabel, {
                                            get text() {
                                              return Round(uiProgress());
                                            }
                                          });
                                        }
                                      }), libs.createComponent(EOM_Image.EOM_Image, {
                                        id: "Wave",
                                        hittest: false
                                      })];
                                    }
                                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "Rank",
                                    get ["class"]() {
                                      return "Rank" + player().rank;
                                    },
                                    get opacity() {
                                      return state() == 2 || player().progress > 0 ? "1" : "0";
                                    }
                                  }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                                    id: "RewardButton",
                                    get className() {
                                      return libs.classNames("Reward" + player().rank, {
                                        Received: rewardReceived() && is_self()
                                      });
                                    },
                                    get opacity() {
                                      return state() == 2 || player().progress > 0 ? "1" : "0";
                                    },
                                    get enabled() {
                                      return rewardEnable();
                                    },
                                    onactivate: () => {
                                      if (clickCD) {
                                        return;
                                      }
                                      clickCD = true;
                                      $.Schedule(1, () => {
                                        clickCD = false;
                                      });
                                      callAction("activity_receive", {
                                        activity_id: activityID,
                                        reward_id: 0
                                      });
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "RewardBox",
                                        get customTooltip() {
                                          return {
                                            name: "reward_tooltip",
                                            reward_list: JSON.stringify(reward_list())
                                          };
                                        }
                                      }), libs.createComponent(EOM_Icon.EOM_Icon, {
                                        id: "Checked",
                                        hittest: false
                                      }), libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                        type: "default",
                                        get visible() {
                                          return rewardEnable();
                                        },
                                        hittest: false
                                      })];
                                    }
                                  })];
                                }
                              });
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "LastUpRope"
                          })];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "FinishLine"
                      })];
                    }
                  }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "MatchCountDown",
                    get enabled() {
                      return rewardReceived();
                    },
                    onactivate: () => {
                      setMatchNotExit(false);
                      setState(0);
                      setPlayerDatas([]);
                    },
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "MatchCountdownBG"
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "MatchCountdownMain",
                        align: "center center",
                        flowChildren: "down",
                        hittest: false,
                        get children() {
                          return libs.createComponent(libs.Show, {
                            get when() {
                              return !matchOver();
                            },
                            get fallback() {
                              return (() => {
                                const _el$ = libs.createElement("Label", {
                                  id: "EndCountDownLabel2",
                                  get text() {
                                    return rewardReceived() ? "#Activity_DragonBoat_Exit" : "#Activity_Dianfengsai_21";
                                  }
                                }, null);
                                libs.effect(_$p => libs.setProp(_el$, "text", rewardReceived() ? "#Activity_DragonBoat_Exit" : "#Activity_Dianfengsai_21", _$p));
                                return _el$;
                              })();
                            },
                            get children() {
                              return [libs.createComponent(GenericPanel.CLabel, {
                                id: "EndCountDownLabel",
                                text: "#Activity_DragonBoat_Countdown"
                              }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                get endTime() {
                                  return startTime() + 60 * 60 * 3;
                                },
                                text: "{hour}:{min}:{sec}"
                              })];
                            }
                          });
                        }
                      })];
                    }
                  })];
                }
              })];
            }
          })];
        }
      })];
    }
  });
};

let dataSyncTimer;
const startDataTimer = (tick, activityID) => {
  if (dataSyncTimer != undefined) {
    callAction("activity_data", {
      activity_id: activityID
    });
    clearInterval(dataSyncTimer);
    dataSyncTimer = undefined;
  }
  if (tick == -1) {
    return;
  }
  dataSyncTimer = setInterval(() => {
    callAction("activity_data", {
      activity_id: activityID
    });
  }, tick * 1000);
};
const [state, setState] = libs.createSignal(0);
const Activity_Football = props => {
  const activityID = props.activity_id;
  let token_id = 9310019;
  const language = $.Language().toLowerCase();
  const localPlayerID = Players.GetLocalPlayer();
  const [endTime, setEndTime] = libs.createSignal(1785340800);
  const [activityTokenCnt, setActivityTokenCnt] = libs.createSignal(0);
  const [price, setPrice] = libs.createSignal(1);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const [playerDatas, setPlayerDatas] = libs.createSignal([]);
  const [startTime, setStartTime] = libs.createSignal(0);
  const [dateNow, setDateNow] = libs.createSignal(ServerTimestamp());
  let JoinCD = false;
  let adjustMatchTime = false;
  const JoinDragonBoat = () => {
    if (activityTokenCnt() < price()) {
      ErrorMessage("#Activity_Football_NotEnough");
      return;
    }
    if (JoinCD) {
      return;
    }
    JoinCD = true;
    adjustMatchTime = true;
    $.Schedule(1, () => {
      JoinCD = false;
    });
    if (state() == 0) {
      setStartTime(Math.floor(Date.now() / 1000));
      callAction("join_dragonboat", {
        activity_id: activityID
      });
    }
  };
  netdata_utils.createNetDataEffect("player_props_amounts", data => {
    setActivityTokenCnt(data[token_id] ?? 0);
  }, localPlayerID);
  netdata_utils.createNetDataEffect("info_activity_data", data => {
    const v = data.find(info => info.activity_id == activityID);
    if (v) {
      setEndTime(v.end_time);
      const reward = JSON.parseSafe(v.extra_information);
      if (reward) {
        setRewardList(reward.rewards);
        if (reward.dragonboat_ticket_price !== undefined) {
          setPrice(reward.dragonboat_ticket_price);
        }
      }
    }
  });
  netdata_utils.createNetDataEffect("dragonboat_activity_data", v => {
    if (v && v[activityID]) {
      let data = v[activityID];
      libs.batch(() => {
        const lastState = state();
        checkState(lastState, data.state);
        setState(data.state);
        if (data.state != 0) {
          if (!(data.state == 1 && adjustMatchTime)) {
            setStartTime(data.start_time);
          }
        }
        if (data?.state == 2 || data?.state == 3) {
          if (data?.state == 3) {
            let self_data = data.player_datas.find(v => v.uid.toString() == steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
            let self_progress = self_data?.progress ?? 0;
            if (self_progress == 0) {
              setMatchNotExit(true);
              callAction("activity_receive", {
                activity_id: activityID,
                reward_id: 0
              });
            }
          }
          setPlayerDatas(data.player_datas);
        }
      });
    }
  }, localPlayerID);
  const [matchRemainMin, setRemainMin] = libs.createSignal("0");
  const [matchRemainSec, setRemainSec] = libs.createSignal("00");
  libs.createEffect(libs.on(startTime, v => {
    let start = startTime();
    if (state() == 1 || state() == 0 && start != 0) {
      const now = new Date(start * 1000);
      let curMin = now.getMinutes();
      let nextFiveMin = Math.ceil(curMin / 5) * 5;
      let curSec = now.getSeconds();
      let remainingSeconds = (nextFiveMin - curMin) * 60 - curSec;
      if (remainingSeconds < 0) {
        remainingSeconds += 5 * 60;
      }
      remainingSeconds += 10 + Round(Math.random() * 30);
      let finalMin = Math.floor(remainingSeconds / 60);
      let finalSec = remainingSeconds % 60;
      setRemainMin(finalMin.toString());
      setRemainSec((finalSec < 10 ? "0" : "") + finalSec.toString());
    }
  }));
  const [matchSuccess, setMatchSuccess] = libs.createSignal(false);
  const checkState = (lastState, nowState) => {
    if (nowState == 2) {
      startDataTimer(60 * 5, activityID);
    } else if (nowState == 1) {
      startDataTimer(10, activityID);
    } else {
      startDataTimer(-1, activityID);
    }
    setMatchSuccess(lastState == 1 && nowState == 2);
    if (lastState == 3 && nowState == 0) {
      setMatchNotExit(true);
    }
    lastState = nowState;
  };
  const showBoatList = () => matchNotExit() || (state() == 2 || state() == 3) && !matchSuccess();
  libs.onMount(() => {
    let t = setInterval(() => {
      setDateNow(ServerTimestamp());
    }, 1000);
    libs.onCleanup(() => {
      clearInterval(t);
    });
  });
  const matchOver = () => dateNow() >= startTime() + 60 * 60 * 3 || matchNotExit() || state() == 3;
  const [matchNotExit, setMatchNotExit] = libs.createSignal(false);
  const rewardReceived = () => matchNotExit();
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "Activity_Football",
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "CurrencyTopBar",
        hittest: false,
        get children() {
          return libs.createComponent(Player.CurrencyGroup, {
            tokens: [9310019]
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ActivityMainContent",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityTitle",
            get className() {
              return libs.classNames(language);
            },
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TimeBG",
            flowChildren: "right",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TimeIcon"
              }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                id: "TimeText",
                get endTime() {
                  return endTime();
                },
                text: "#countdown_time"
              })];
            }
          }), libs.createComponent(InfoButton.InfoButton, {
            info: "#ActivityRule",
            customTooltip: {
              name: "long_text",
              title: "#SnowballInfo",
              text: "#Activity_Football_infodesc"
            }
          }), libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => !!!matchNotExit())() && state() == 0;
                },
                get children() {
                  return [libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "JoinButton",
                    onactivate: () => {
                      JoinDragonBoat();
                    },
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        id: "TextJoin",
                        text: "#DragonBoatJoin"
                      });
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "TextBG",
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        flowChildren: "right",
                        align: "center center",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            verticalAlign: "center",
                            id: "JoinText",
                            get text() {
                              return $.Localize("#DragonBoatJoinText") + " x1";
                            }
                          }), libs.createComponent(EOM_Icon.EOM_Icon, {
                            size: "32",
                            verticalAlign: "center",
                            get src() {
                              return getTokenSrcPath(token_id);
                            }
                          })];
                        }
                      });
                    }
                  })];
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return !showBoatList();
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "MatchingContent",
                    hittest: false,
                    get children() {
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return matchSuccess();
                        },
                        get fallback() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "MatchingIcon Loading"
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "LoadingText",
                            text: "#DragonBoatMatchTime",
                            get dialogVariables() {
                              return {
                                min: matchRemainMin(),
                                sec: matchRemainSec()
                              };
                            }
                          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                            id: "WaitBG",
                            enabled: false,
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                align: "center center",
                                flowChildren: "down",
                                get children() {
                                  return [libs.createComponent(GenericPanel.CLabel, {
                                    id: "WaitText",
                                    text: "#LoadingText"
                                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                    id: "WaitTime",
                                    onlyCoundown: false,
                                    get endTime() {
                                      return startTime();
                                    },
                                    text: "#dragonboat_loading_time"
                                  })];
                                }
                              });
                            }
                          })];
                        },
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "MatchingIcon Checked"
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "LoadingText",
                            text: "#DragonBoatJoinSuccess"
                          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                            id: "WaitBG",
                            "class": "Success",
                            onactivate: () => {
                              setMatchSuccess(false);
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                align: "center center",
                                flowChildren: "down",
                                get children() {
                                  return libs.createComponent(GenericPanel.CLabel, {
                                    id: "WaitText",
                                    text: "#Popup_Button_Confirm"
                                  });
                                }
                              });
                            }
                          })];
                        }
                      });
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return showBoatList();
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "CompetitionScene",
                    hittest: false,
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "BoatPosition",
                        hittest: false,
                        get children() {
                          return libs.createComponent(libs.Index, {
                            get each() {
                              return playerDatas();
                            },
                            children: (player, i) => {
                              libs.createEffect(libs.on(() => player().progress, () => {
                                if (props.show && props.selected) {
                                  checkProgress();
                                }
                              }));
                              let timer;
                              let previousProgress = 0;
                              const [uiProgress, setUIProgress] = libs.createSignal(previousProgress);
                              libs.createEffect(libs.on(() => ({
                                show: props.show,
                                selected: props.selected
                              }), () => {
                                if (props.show && props.selected) {
                                  checkProgress();
                                }
                              }));
                              const checkProgress = () => {
                                if (previousProgress == player().progress) {
                                  return;
                                }
                                if (timer != undefined) {
                                  clearInterval(timer);
                                }
                                let startProgress = uiProgress();
                                let targetProgress = player().progress;
                                previousProgress = targetProgress;
                                let duration = 500;
                                let tick = 30;
                                timer = setInterval(() => {
                                  duration -= tick;
                                  if (duration <= 0) {
                                    setUIProgress(player().progress);
                                    clearInterval(timer);
                                    return;
                                  }
                                  let newProgress = startProgress + (targetProgress - startProgress) * (1 - duration / 500);
                                  setUIProgress(newProgress);
                                }, tick);
                              };
                              const progress = () => {
                                return Clamp(uiProgress() / 32 * 100, 0, 100);
                              };
                              const steamid = () => (player().is_robot ? player().uid + 1 : player().uid).toString();
                              const reward_list = () => {
                                return rewardList().find(reward => reward.reward_id == player().rank)?.rewards ?? [];
                              };
                              libs.onCleanup(() => {
                                if (timer != undefined) {
                                  clearInterval(timer);
                                }
                              });
                              const [hover, setHover] = libs.createSignal(false);
                              const is_self = libs.createMemo(() => player().uid.toString() == steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
                              let clickCD = false;
                              const rewardEnable = () => !rewardReceived() && matchOver() && is_self();
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "PlayerRoad",
                                get className() {
                                  return libs.classNames("Index_" + i);
                                },
                                hittest: false,
                                get children() {
                                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "PlayerBG",
                                    get classList() {
                                      return {
                                        self: is_self()
                                      };
                                    },
                                    get children() {
                                      return [libs.createComponent(Player.EOM_Avatar, {
                                        id: "Avatar",
                                        get accountid() {
                                          return steamid();
                                        },
                                        hittest: false,
                                        hittestchildren: false
                                      }), libs.createComponent(Player.PlayerName, {
                                        id: "PlayerName",
                                        get steamID() {
                                          return player().uid.toString();
                                        }
                                      })];
                                    }
                                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "Road",
                                    hittest: false,
                                    get children() {
                                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "UpRope",
                                        hittest: false
                                      });
                                    }
                                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                    id: "BoatContainer",
                                    get classList() {
                                      return {
                                        Hover: hover()
                                      };
                                    },
                                    get style() {
                                      return {
                                        transform: `translateX(${progress() * 0.01 * (1054 - 120)}px)`
                                      };
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "Boat",
                                        get ["class"]() {
                                          return "img" + Math.min(i + 1, 4);
                                        },
                                        hittest: false,
                                        get children() {
                                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                                            id: "BoatTooltipBox",
                                            get dialogVariables() {
                                              return {
                                                value: player().game_count
                                              };
                                            },
                                            onmouseover: self => {
                                              setHover(true);
                                              $.DispatchEvent("DOTAShowTextTooltip", self, $.Localize("#Activity_DragonBoat_progress", self));
                                            },
                                            onmouseout: self => {
                                              setHover(false);
                                              $.DispatchEvent("DOTAHideTextTooltip", self);
                                            }
                                          });
                                        }
                                      }), libs.createComponent(EOM_Image.EOM_Image, {
                                        id: "RankInfo",
                                        hittest: false,
                                        get classList() {
                                          return {
                                            self: is_self()
                                          };
                                        },
                                        get children() {
                                          return libs.createComponent(GenericPanel.CLabel, {
                                            get text() {
                                              return Round(uiProgress());
                                            }
                                          });
                                        }
                                      })];
                                    }
                                  }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                                    id: "RewardButton",
                                    get className() {
                                      return libs.classNames("Reward" + player().rank, {
                                        Received: rewardReceived() && is_self()
                                      });
                                    },
                                    get opacity() {
                                      return state() == 2 || player().progress > 0 ? "1" : "0";
                                    },
                                    get enabled() {
                                      return rewardEnable();
                                    },
                                    onactivate: () => {
                                      if (clickCD) {
                                        return;
                                      }
                                      clickCD = true;
                                      $.Schedule(1, () => {
                                        clickCD = false;
                                      });
                                      callAction("activity_receive", {
                                        activity_id: activityID,
                                        reward_id: 0
                                      });
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "RewardBox",
                                        get customTooltip() {
                                          return {
                                            name: "reward_tooltip",
                                            reward_list: JSON.stringify(reward_list())
                                          };
                                        }
                                      }), libs.createComponent(EOM_Icon.EOM_Icon, {
                                        id: "Checked",
                                        hittest: false
                                      }), libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                        type: "default",
                                        get visible() {
                                          return rewardEnable();
                                        },
                                        hittest: false
                                      })];
                                    }
                                  })];
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "MatchCountDown",
                    get enabled() {
                      return rewardReceived();
                    },
                    onactivate: () => {
                      setMatchNotExit(false);
                      setState(0);
                      setPlayerDatas([]);
                    },
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "MatchCountdownBG"
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "MatchCountdownMain",
                        align: "center center",
                        flowChildren: "down",
                        hittest: false,
                        get children() {
                          return libs.createComponent(libs.Show, {
                            get when() {
                              return !matchOver();
                            },
                            get fallback() {
                              return (() => {
                                const _el$ = libs.createElement("Label", {
                                  id: "EndCountDownLabel2",
                                  get text() {
                                    return rewardReceived() ? "#Activity_DragonBoat_Exit" : "#Activity_Dianfengsai_21";
                                  }
                                }, null);
                                libs.effect(_$p => libs.setProp(_el$, "text", rewardReceived() ? "#Activity_DragonBoat_Exit" : "#Activity_Dianfengsai_21", _$p));
                                return _el$;
                              })();
                            },
                            get children() {
                              return [libs.createComponent(GenericPanel.CLabel, {
                                id: "EndCountDownLabel",
                                text: "#Activity_DragonBoat_Countdown"
                              }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                get endTime() {
                                  return startTime() + 60 * 60 * 3;
                                },
                                text: "{hour}:{min}:{sec}"
                              })];
                            }
                          });
                        }
                      })];
                    }
                  })];
                }
              })];
            }
          })];
        }
      })];
    }
  });
};

let fFlipTime$3 = 0.5;
const language$b = $.Language().toLowerCase();
const [singleCost$3] = libs.createSignal(1);
const [rewardShow$3, setRewardShow$3] = libs.createSignal(false);
const [rewardList$3, setRewardList$3] = libs.createSignal([]);
const [drawButtonEnable$3, setDrawButtonEnable$3] = libs.createSignal(true);
const [info_box_content$3, setInfoBoxContent$3] = libs.createSignal();
const [drawSuccess$3, setDrawSuccess$3] = libs.createSignal(false);
const [drawEnd$3, setDrawEnd$3] = libs.createSignal(false);
const [drawSoundIndex$3, setDrawSoundIndex$3] = libs.createSignal(-1);
libs.createEffect(libs.on(rewardList$3, _rewardList => {
  if (_rewardList.length == 0 && rewardShow$3()) {
    setRewardShow$3(false);
  }
}));
const getRarity$3 = (itemID, amount) => {
  let rarity = 0;
  let gotten = false;
  let type = Number(itemID.toString().slice(0, 3));
  let content = info_box_content$3();
  if (content) {
    for (const v of content) {
      if (v.item_id == itemID) {
        if (type == 110) {
          if (amount >= v.amount_min && amount <= v.amount_max) {
            if (v.rarity == "n") {
              rarity = 0;
              gotten = true;
            } else if (v.rarity == "r") {
              rarity = 1;
              gotten = true;
            } else if (v.rarity == "sr") {
              rarity = 2;
              gotten = true;
            } else if (v.rarity == "ssr") {
              rarity = 3;
              gotten = true;
            }
          }
        } else {
          if (v.rarity == "n") {
            rarity = 0;
            gotten = true;
          } else if (v.rarity == "r") {
            rarity = 1;
            gotten = true;
          } else if (v.rarity == "sr") {
            rarity = 2;
            gotten = true;
          } else if (v.rarity == "ssr") {
            rarity = 3;
            gotten = true;
          }
        }
        if (gotten) break;
      }
    }
    return rarity;
  }
};
const activityPool$3 = 99100009;
const boxID$3 = 2000095;
const exchangeTokenID$3 = 1100064;
const Activity_emo = props => {
  const show = () => props.show;
  const activityToken = boxID$3;
  const activityID = props.activity_id;
  const [activityCollection, setActivityCollection] = libs.createSignal({});
  const [endtime, setEndtime] = libs.createSignal(1787846400);
  const [boxToken, setBoxToken] = libs.createSignal(0);
  const [progress, setProgress] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const [willHeroTooltip] = libs.createSignal(false);
  const [showHeroTooltip] = libs.createSignal(true);
  libs.createEffect(() => {
    if (showHeroTooltip() && willHeroTooltip()) {
      showHeroInfo();
    } else {
      hideHeroInfo();
    }
  });
  const updateBoxContent = () => {
    const info_box_pool_data = getNetDataCache("info_box_pool_data");
    const info_box_content = getNetDataCache("info_box_content");
    if (info_box_pool_data && info_box_content) {
      const dropName = info_box_pool_data.find(v => v.pool == activityPool$3)?.drop_content;
      if (dropName && info_box_content[dropName]) {
        setInfoBoxContent$3(info_box_content[dropName]);
      }
    }
  };
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  const [luck, setLuck] = libs.createSignal(0);
  const nextUpNeedCount = libs.createMemo(() => {
    if (luck() == 0) {
      return 180;
    }
    return Math.max(1, 180 - luck() + 1);
  });
  const [boxAmounts, setBoxAmounts] = libs.createSignal(0);
  libs.onMount(() => {
    callAction("box_luck", {
      bid: boxID$3,
      pool: activityPool$3
    });
    let gameEventIDList = [];
    let NetTableIDList = [];
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    gameEventIDList.push(useNetData("player_box_luck", data => {
      if (data && data[activityPool$3]) {
        setLuck(data[activityPool$3].luck);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("open_box_activity_data", data => {
      if (data[activityID]) {
        if (data[activityID]?.rewards != undefined) {
          setActivityCollection(data[activityID].rewards);
        }
        setProgress(data[activityID]?.progress ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("player_props", data => {
      if (data) {
        setBoxAmounts(Object.values(data).find(v => v.prop_id == 9314005 && v.amounts > 0)?.amounts ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID && activityInfo.extra_information) {
          const reward = JSON.parse(activityInfo.extra_information);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_box_content", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("info_box_pool_data", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("player_boxes", data => {
      setBoxToken(data[boxID$3]?.amounts ?? 0);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["emo"] ?? [];
      result.sort((a, b) => {
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const [willSkip, setWillSkip] = libs.createSignal(false);
  let pDrawWindow;
  let BGButtonLists;
  let BGLayer;
  let BG2;
  let Hero;
  let Content1;
  let Content2;
  let Content3;
  let Content4;
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList$3();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (itemID.toString().startsWith("931") && KeyValues.BackpackKv[itemID]) {
        rarity = KeyValues.BackpackKv[itemID].quality;
      } else if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        rarity = getRarity$3(itemID, data.amounts);
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  libs.createEffect(libs.on(() => ({
    _show: show(),
    _selected: props.selected
  }), v => {
    if (v._show && !rewardShow$3() && handledRewardData().list.length > 0) {
      showDrawRewards(handledRewardData().list);
    }
    if (v._selected && v._show) {
      if (willHeroTooltip() && showHeroTooltip()) {
        $.Schedule(0.4, () => {
          showHeroInfo();
        });
      }
    } else {
      hideHeroInfo();
    }
  }));
  const showHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      ShowCustomTooltip(self, "cosmetic_tooltip", {
        cosmeticID: 3000062,
        text: "#3000062",
        showPreview: 0
      });
    }
  };
  const hideHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      HideCustomTooltip(self, "cosmetic_tooltip");
    }
  };
  const _addHidden = p => {
    if (p?.IsValid()) {
      p.AddClass("Hidden");
    }
  };
  const _removeHidden = p => {
    if (p?.IsValid()) {
      p.RemoveClass("Hidden");
    }
  };
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex$3()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex$3(-1);
    }
    if (show()) {
      let p1 = $("#EmoDrawPortal");
      let p2 = $("#EmoDrawPortalGold");
      let p3 = $("#EmoDrawPortalRed");
      if (p1?.IsValid()) {
        p1.StopParticlesImmediately(false);
        p1.style.opacity = "1";
      }
      if (p2?.IsValid()) {
        p2.StopParticlesImmediately(false);
        p2.style.opacity = "0";
      }
      if (p3?.IsValid()) {
        p3.StopParticlesImmediately(false);
        p3.style.opacity = "0";
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow$3()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess$3()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd$3(false);
    setDrawButtonEnable$3(false);
    setRewardList$3([]);
    let seq = new RunSequentialActions();
    if (rewardShow$3()) {
      setRewardShow$3(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        _addHidden(BGLayer);
        _addHidden(BG2);
        _addHidden(Hero);
        _addHidden(Content1);
        _addHidden(Content2);
        _addHidden(Content3);
        _addHidden(Content4);
        _addHidden($("#EmoSkipButton"));
        _addHidden($("#NewYearExchangeRewardTooltip"));
        _addHidden($("#PortalCircle"));
        _addHidden($("#ButtonDecoration"));
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        $("#EmoDrawPortal").StartParticles();
        $("#EmoDrawPortalRed").StartParticles();
        $("#EmoDrawPortalGold").StartParticles();
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex$3(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$3()) return true;
        if (handledRewardData().list.length > 0 || drawEnd$3()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$3()) return false;
        if (handledRewardData().list.length > 0 || drawEnd$3()) {
          if (handledRewardData().resultType != 0) {
            $("#EmoDrawPortal").style.opacity = "0";
            if (handledRewardData().resultType == 2) {
              $("#EmoDrawPortalRed").style.opacity = "1";
            } else {
              $("#EmoDrawPortalGold").style.opacity = "1";
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: boxID$3,
      pool: activityPool$3,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        setRewardList$3(data.data.map(v => {
          if (v.orderby == undefined) {
            v.orderby = Round(Math.random() * 100);
          }
          return v;
        }).sort((a, b) => a.orderby - b.orderby));
        setDrawSuccess$3(true);
      } else {
        setDrawSuccess$3(false);
      }
      setDrawEnd$3(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      let seq = new RunSequentialActions();
      seq.actions.push(new RunFunctionAction(() => {
        setRewardShow$3(true);
        pRewardList.RemoveAndDeleteChildren();
        const count = items.length;
        for (let i = 0; i < count; i++) {
          const data = items[i];
          let itemID = data.origin_item_id ?? data.itemId;
          let rarity = data.rarity;
          let p = $.CreatePanel("Panel", pRewardList, "");
          p.AddClass("AwardItem");
          if (count == 1) {
            p.AddClass("Single");
          } else {
            p.AddClass("Multi" + (i + 1));
          }
          p.AddClass("Rarity" + rarity);
          SaveData(p, "iRarity", rarity);
          libs.render(() => (() => {
            const _el$ = libs.createElement("Panel", {
                id: "AwardItemContainer"
              }, null),
              _el$2 = libs.createElement("Panel", {}, _el$),
              _el$3 = libs.createElement("Panel", {}, _el$),
              _el$4 = libs.createElement("Panel", {}, _el$),
              _el$1 = libs.createElement("Panel", {}, _el$);
            libs.setProp(_el$2, "className", "AwardBG");
            libs.setProp(_el$3, "className", "New");
            libs.setProp(_el$4, "className", "Mask");
            libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "MaskMain",
              get children() {
                return [libs.createComponent(ProductItem.ProductItem, {
                  id: "StoreItemImage",
                  itemid: itemID,
                  rarity: rarity,
                  get count() {
                    return data.origin_item_id == undefined ? data.amounts : 1;
                  }
                }), libs.createComponent(CosmeticCard.CosmeticImage, {
                  hittest: false,
                  width: "200px",
                  height: "200px",
                  y: "-10px",
                  align: "center center",
                  get itemid() {
                    return itemID.toString();
                  }
                })];
              }
            }), null);
            libs.insert(_el$4, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  when: rarity == 3,
                  get children() {
                    return [(() => {
                      const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                        squarePixels: true,
                        particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "0 0 200",
                        fov: 30
                      }, null);
                      libs.setProp(_el$5, "style", {
                        width: "260px",
                        height: "260px",
                        align: "center center"
                      });
                      return _el$5;
                    })(), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                }), libs.createComponent(libs.Match, {
                  when: rarity == 4,
                  get children() {
                    return [libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle3",
                      squarePixels: true,
                      particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "0 0 200",
                      fov: 30
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                })];
              }
            }), null);
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return data.origin_item_id != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "Conversion",
                  get children() {
                    return [libs.createElement("Image", {
                      id: "ConversionBG"
                    }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ConversionInfo",
                      get children() {
                        return [libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return $.Localize("#Conversion");
                          }
                        }), libs.createComponent(EOM_Image.EOM_Image, {
                          id: "TokenIcon",
                          get src() {
                            return getPayTypeIconPath(data.itemId);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return "×" + data.amounts;
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
              IsNew: true
            }), _$p));
            return _el$;
          })(), p);
        }
      }));
      seq.actions.push(new WaitAction(0.5));
      seq.actions.push(new RunFunctionAction(() => {
        if (pRewardList) {
          let flipSeqList = new RunStaggeredActions(fFlipTime$3 / 2);
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p && LoadData(p, "Flipped") != "1") {
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                GoldParticle.StopParticlesWithEndcaps();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StopParticlesWithEndcaps();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                RedParticle.StopParticlesWithEndcaps();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StopParticlesWithEndcaps();
              }
              p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime$3 + "s";
              let flipSeq = new RunSequentialActions();
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid()) {
                  if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                    p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                  }
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$3 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                  p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                }
              }));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  Game.EmitSound("playercard.flip");
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$3 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  SaveData(p, "Flipped", "1");
                  if (GoldParticle && GoldParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle.StartParticles();
                  }
                  if (GoldParticle2 && GoldParticle2.IsValid()) {
                    GoldParticle2.StartParticles();
                  }
                  if (RedParticle && RedParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    RedParticle.StartParticles();
                  }
                  if (RedParticle2 && RedParticle2.IsValid()) {
                    RedParticle2.StartParticles();
                  }
                }
                if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                  setDrawButtonEnable$3(true);
                }
              }));
              flipSeqList.actions.push(flipSeq);
            }
          }
          RunSingleAction(flipSeqList);
        }
      }));
      RunSingleAction(seq);
    }
  };
  const funcRewardShowContinue = () => {
    let bBack = true;
    setDrawButtonEnable$3(true);
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow$3(false);
        setRewardList$3([]);
        _removeHidden(BGButtonLists);
        _removeHidden(BGLayer);
        _removeHidden(BG2);
        _removeHidden(Hero);
        _removeHidden(Content1);
        _removeHidden(Content2);
        _removeHidden(Content3);
        _removeHidden(Content4);
        _removeHidden($("#EmoSkipButton"));
        _removeHidden($("#NewYearExchangeRewardTooltip"));
        _removeHidden($("#PortalCircle"));
        _removeHidden($("#ButtonDecoration"));
      }
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  libs.createEffect(libs.on(exchangeShow, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_emo",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return [libs.createComponent(Player.PlayerCurrency, {
            type: "boxes",
            tokenID: activityToken
          }), libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: exchangeTokenID$3
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainContainer",
        hittest: false,
        get children() {
          return [libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "EmoDrawPortalGold",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
            fov: 120,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "EmoDrawPortal",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "EmoDrawPortalRed",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "Hero3D",
            ref(r$) {
              const _ref$ = Hero;
              typeof _ref$ === "function" ? _ref$(r$) : Hero = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              const _el$14 = libs.createElement("DOTAScenePanel", {
                allowrotation: false,
                map: "scene/emo_activity.vmap",
                camera: "preview_camera",
                light: "preview_light",
                particleonly: false,
                deferredalpha: true,
                antialias: true
              }, null);
              libs.setProp(_el$14, "style", {
                width: "100%",
                height: "100%"
              });
              return _el$14;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            ref(r$) {
              const _ref$2 = BGLayer;
              typeof _ref$2 === "function" ? _ref$2(r$) : BGLayer = r$;
            },
            hittest: false,
            get children() {
              return [libs.createComponent(InfoButton.InfoButton, {
                className: language$b,
                id: "ActivityInfoButton",
                info: "#SnowballInfo",
                onmouseover: self => {
                  if (language$b != "schinese") {
                    ShowCustomTooltip(self, "long_text", {
                      text: "#Activity_emo_infodesc"
                    });
                  } else {
                    $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_emo_infodesc");
                  }
                },
                onmouseout: self => {
                  if (language$b != "schinese") {
                    HideCustomTooltip(self, "long_text");
                  } else {
                    $.DispatchEvent("DOTAHideTextTooltip", self);
                  }
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language$b,
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityCountdown",
                className: language$b,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    align: "right center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "timeIcon"
                      }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return endtime();
                        },
                        text: "#countdown_time"
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PoolInfoIcon",
                className: language$b,
                size: "24",
                get src() {
                  return getSrcPath("icon/c_info.png");
                },
                customTooltip: {
                  name: "custom_text",
                  text: "#Activity_emo_poolchance"
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return boxAmounts() > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "NewYearBoxFastAccess",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "NewYearBoxImage",
                        get children() {
                          return [libs.createComponent(ProductImage.ProductImage, {
                            itemid: 9314005
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x ${boxAmounts()}`;
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Button.EOM_Button, {
                        color: "Gold",
                        text: "#UseSelfPickBox",
                        onactivate: () => {
                          showPopup("BackpackItemUse", {
                            id: 9314005
                          });
                        }
                      })];
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CenterCircle",
            ref(r$) {
              const _ref$3 = BG2;
              typeof _ref$3 === "function" ? _ref$3(r$) : BG2 = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return nextUpNeedCount() != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "DropBanner",
                    hittest: false,
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        text: "#Activity_emo_chanceup",
                        get dialogVariables() {
                          return {
                            count: nextUpNeedCount()
                          };
                        },
                        html: true
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "ExchangeButton",
            ref(r$) {
              const _ref$4 = Content4;
              typeof _ref$4 === "function" ? _ref$4(r$) : Content4 = r$;
            },
            get className() {
              return $.Language().toLowerCase();
            },
            text: `#Store_Exchange_Button`,
            onactivate: () => setExchangeShow(true)
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            ref(r$) {
              const _ref$5 = BGButtonLists;
              typeof _ref$5 === "function" ? _ref$5(r$) : BGButtonLists = r$;
            },
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton$3, {
                get enable() {
                  return drawButtonEnable$3();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton$3, {
                get enable() {
                  return drawButtonEnable$3();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "EmoSkipButton",
            get ["class"]() {
              return libs.classNames("SkipButton", {
                Active: willSkip()
              });
            },
            onactivate: () => setWillSkip(v => !v),
            get children() {
              return [libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "Square",
                get src() {
                  return getSrcPath("draw/c_square.png");
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "Hook",
                get src() {
                  return getSrcPath("draw/c_hook.png");
                }
              }), libs.createComponent(GenericPanel.CLabel, {
                text: "#Skip_Button"
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("DrawCardResultWindow", {
            Show: rewardShow$3()
          });
        },
        ref(r$) {
          const _ref$6 = pDrawWindow;
          typeof _ref$6 === "function" ? _ref$6(r$) : pDrawWindow = r$;
        },
        acceptsfocus: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ResultContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "NewYearRewardList",
                hittest: false
              }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                id: "RewardClose",
                onactivate: () => funcRewardShowContinue()
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Currencies",
                get children() {
                  return [libs.createComponent(Player.PlayerCurrency, {
                    type: "boxes",
                    tokenID: activityToken
                  }), libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: exchangeTokenID$3
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton$3, {
                get enable() {
                  return drawButtonEnable$3();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton$3, {
                get enable() {
                  return drawButtonEnable$3();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangePanel",
        get className() {
          return libs.classNames({
            Show: exchangeShow()
          });
        },
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$15 = libs.createElement("Panel", {
              id: "TopBarBG"
            }, null);
            libs.insert(_el$15, libs.createComponent(Player.CurrencyGroup, {
              tokens: [exchangeTokenID$3]
            }));
            return _el$15;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeContainer",
            onactivate: () => setExchangeShow(false),
            get children() {
              return [(() => {
                const _el$16 = libs.createElement("Panel", {
                  id: "ExchangeList"
                }, null);
                libs.setProp(_el$16, "onactivate", () => {});
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeListTitle",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "ExchangeListTitleLabel",
                      text: `#${activityPool$3}_exchange`
                    }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                      onactivate: () => {
                        setExchangeShow(false);
                      }
                    })];
                  }
                }), null);
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeItemList",
                  flowChildren: "right-wrap",
                  scroll: "y",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return exchangeShow();
                      },
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return storeItemData();
                          },
                          children: (storeItem, index) => {
                            return libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                              storeItem: storeItem(),
                              purchased_product: purchased_product(),
                              player_hero: playerHero(),
                              player_ornament: playerOrnament(),
                              previewing_id: previewInfo().cid,
                              onPreview: (cosmetic_id, exchange_id) => {
                                previewTimer = $.Schedule(0.3, () => {
                                  previewTimer = -1;
                                  if (previewInfo().eid != exchange_id) {
                                    setPreviewInfo({
                                      cid: cosmetic_id,
                                      eid: exchange_id
                                    });
                                  }
                                });
                              },
                              onCancelPreview: () => {
                                if (previewTimer != -1) {
                                  $.CancelScheduled(previewTimer);
                                  previewTimer = -1;
                                }
                              }
                            })));
                          }
                        });
                      }
                    });
                  }
                }), null);
                return _el$16;
              })(), (() => {
                const _el$17 = libs.createElement("Panel", {
                  id: "ExchangePreview"
                }, null);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid != -1;
                  },
                  get children() {
                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ExchangePreviewMain",
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return KeyValues.CosmeticsKv[previewInfo().cid];
                          },
                          get fallback() {
                            return libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return previewInfo().cid;
                              }
                            });
                          },
                          get children() {
                            return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                              get cosmetic_id() {
                                return previewInfo().cid;
                              }
                            });
                          }
                        });
                      }
                    }), (() => {
                      const _el$18 = libs.createElement("Panel", {
                        id: "CosmeticDesc"
                      }, null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticName",
                        get text() {
                          return '#' + previewInfo().cid;
                        }
                      }), null);
                      libs.insert(_el$18, libs.createComponent(EOM_Separator.EOM_Separator, {
                        size: "short"
                      }), null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticAccess",
                        get text() {
                          return GetCosmeticAccessDescription(previewInfo().cid);
                        }
                      }), null);
                      return _el$18;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return previewInfo().cid.toString().slice(0, 3) == "531";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          text: "#CosmeticToEquip",
                          align: "center bottom",
                          color: "Blue",
                          marginBottom: "68px",
                          x: "175px",
                          onactivate: () => {
                            ToggleWindows('MenuButton_cosmetics', true);
                            clientSideEvent("jump_to_bunny_cosmetic", {});
                          }
                        });
                      }
                    })];
                  }
                }));
                return _el$17;
              })()];
            }
          })];
        }
      })];
    }
  });
};
const DrawButton$3 = props => {
  const costInfo = libs.createMemo(() => {
    const single = singleCost$3();
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("EmoDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900280,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + boxID$3 + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              });
            }
          })];
        }
      })];
    }
  });
};

const language$a = $.Language().toLowerCase();
const Activity_GiftPack = prop => {
  const info_shop_product_group_by_tag = netdata_utils.createNetData("info_shop_product_group_by_tag");
  const player_purchased_products = netdata_utils.createPlayerNetData("player_purchased_products", Players.GetLocalPlayer());
  const purchased_product = libs.createMemo(() => player_purchased_products()?.["purchased_products"]);
  const playerOrnament = netdata_utils.createPlayerNetData("player_ornament", Players.GetLocalPlayer());
  const player_hero = netdata_utils.createPlayerNetData("player_hero", Players.GetLocalPlayer());
  const items = libs.createMemo(() => {
    return info_shop_product_group_by_tag()?.["NewUserShop"] ?? [];
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !prop.selected
      });
    },
    id: "Activity_GiftPack",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "GiftPackTitle",
        "class": language$a
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "GiftPackList",
        flowChildren: "right",
        get children() {
          return libs.createComponent(libs.Show, {
            get when() {
              return prop.selected;
            },
            get children() {
              return libs.createComponent(libs.Index, {
                get each() {
                  return items();
                },
                children: (item, index) => libs.createComponent(Item, libs.mergeProps({
                  className: index % 2 == 0 ? "up" : "down"
                }, () => StoreItem.getStoreItemProps({
                  itemData: item(),
                  purchased_num: purchased_product()?.[item().id],
                  playerOrnament: playerOrnament(),
                  playerHeroes: player_hero()
                })))
              });
            }
          });
        }
      })];
    }
  });
};
const Item = props => {
  const {
    local,
    others,
    discount} = StoreItem.useStoreItem(props);
  const limitInfo = () => local.labels?.filter(label => label.type == "limit")?.[0];
  const rarity = () => {
    return finiteNumber(Number(local.rarity), 0);
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
    className: "GiftPack"
  }), {
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("GiftPackBG", "Rarity" + rarity());
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "discont",
        get ["class"]() {
          return `discont${discount()}`;
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        className: "GiftPackMain",
        get enabled() {
          return !local.owned;
        },
        onactivate: () => {
          if (local.onBuyItem) {
            local.onBuyItem();
          }
        },
        get children() {
          return [libs.createComponent(EOM_Label.EOM_Label, {
            id: "ItemName",
            get text() {
              return local.itemName;
            }
          }), libs.createComponent(EOM_Image.EOM_Image, {
            marginTop: "120px",
            horizontalAlign: "center",
            width: "192px",
            height: "192px",
            get src() {
              return local.itemImage;
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return limitInfo() != undefined;
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "GiftLimit",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    get className() {
                      return libs.classNames("LimitLabel", language$a);
                    },
                    get text() {
                      return $.Localize("#LimitLabel") + " " + limitInfo()?.label;
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("button", {
                "owned": local.owned
              });
            },
            get children() {
              return [libs.createComponent(libs.Show, {
                get when() {
                  return !local.owned;
                },
                get children() {
                  return [libs.memo(() => local.button?.icon), libs.createComponent(EOM_Label.EOM_Label, {
                    horizontalAlign: "center",
                    id: "RealPrice",
                    get text() {
                      return local.button?.text;
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    horizontalAlign: "right",
                    marginRight: "10px",
                    id: "PriceBeforeDiscount",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        verticalAlign: "center",
                        get text() {
                          return local.orgin_price ?? "";
                        }
                      }), libs.createElement("Panel", {
                        id: "div"
                      }, null)];
                    }
                  })];
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return local.owned;
                },
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    text: "#purchased"
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.itemId == 9801801;
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("DoubleMark", language$a);
            }
          });
        }
      }), libs.createComponent(GenericPanel.CLabel, {
        className: "ItemCount",
        get text() {
          return "×" + local.itemCount;
        }
      })];
    }
  }));
};

let fFlipTime$2 = 0.5;
const language$9 = $.Language().toLowerCase();
const [singleCost$2] = libs.createSignal(1);
const [rewardShow$2, setRewardShow$2] = libs.createSignal(false);
const [rewardList$2, setRewardList$2] = libs.createSignal([]);
const [drawButtonEnable$2, setDrawButtonEnable$2] = libs.createSignal(true);
const [info_box_content$2, setInfoBoxContent$2] = libs.createSignal();
const [drawSuccess$2, setDrawSuccess$2] = libs.createSignal(false);
const [drawEnd$2, setDrawEnd$2] = libs.createSignal(false);
const [drawSoundIndex$2, setDrawSoundIndex$2] = libs.createSignal(-1);
libs.createEffect(libs.on(rewardList$2, _rewardList => {
  if (_rewardList.length == 0 && rewardShow$2()) {
    setRewardShow$2(false);
  }
}));
const getRarity$2 = (itemID, amount) => {
  let rarity = 0;
  let gotten = false;
  let type = Number(itemID.toString().slice(0, 3));
  let content = info_box_content$2();
  if (content) {
    for (const v of content) {
      if (v.item_id == itemID) {
        if (type == 110) {
          if (amount >= v.amount_min && amount <= v.amount_max) {
            if (v.rarity == "n") {
              rarity = 0;
              gotten = true;
            } else if (v.rarity == "r") {
              rarity = 1;
              gotten = true;
            } else if (v.rarity == "sr") {
              rarity = 2;
              gotten = true;
            } else if (v.rarity == "ssr") {
              rarity = 3;
              gotten = true;
            }
          }
        } else {
          if (v.rarity == "n") {
            rarity = 0;
            gotten = true;
          } else if (v.rarity == "r") {
            rarity = 1;
            gotten = true;
          } else if (v.rarity == "sr") {
            rarity = 2;
            gotten = true;
          } else if (v.rarity == "ssr") {
            rarity = 3;
            gotten = true;
          }
        }
        if (gotten) break;
      }
    }
  }
  return rarity;
};
const activityPool$2 = 99100011;
const boxID$2 = 2000095;
const exchangeTokenID$2 = 1100064;
const Activity_kuangtu = props => {
  const show = () => props.show;
  const activityToken = boxID$2;
  const activityID = props.activity_id;
  const [activityCollection, setActivityCollection] = libs.createSignal({});
  const [endtime, setEndtime] = libs.createSignal(1772121600);
  const [boxToken, setBoxToken] = libs.createSignal(0);
  const [progress, setProgress] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const [willHeroTooltip] = libs.createSignal(false);
  const [showHeroTooltip] = libs.createSignal(true);
  libs.createEffect(() => {
    if (showHeroTooltip() && willHeroTooltip()) {
      showHeroInfo();
    } else {
      hideHeroInfo();
    }
  });
  const updateBoxContent = () => {
    const info_box_pool_data = getNetDataCache("info_box_pool_data");
    const info_box_content = getNetDataCache("info_box_content");
    if (info_box_pool_data && info_box_content) {
      const dropName = info_box_pool_data.find(v => v.pool == activityPool$2)?.drop_content;
      if (dropName && info_box_content[dropName]) {
        setInfoBoxContent$2(info_box_content[dropName]);
      }
    }
  };
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  const [luck, setLuck] = libs.createSignal(0);
  const nextUpNeedCount = libs.createMemo(() => {
    if (luck() == 0) {
      return 180;
    }
    return Math.max(1, 180 - luck() + 1);
  });
  const [boxAmounts, setBoxAmounts] = libs.createSignal(0);
  libs.onMount(() => {
    callAction("box_luck", {
      bid: boxID$2,
      pool: activityPool$2
    });
    let gameEventIDList = [];
    let NetTableIDList = [];
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    gameEventIDList.push(useNetData("player_box_luck", data => {
      if (data && data[activityPool$2]) {
        setLuck(data[activityPool$2].luck);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("open_box_activity_data", data => {
      if (data[activityID]) {
        if (data[activityID]?.rewards != undefined) {
          setActivityCollection(data[activityID].rewards);
        }
        setProgress(data[activityID]?.progress ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("player_props", data => {
      if (data) {
        setBoxAmounts(Object.values(data).find(v => v.prop_id == 9314005 && v.amounts > 0)?.amounts ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID && activityInfo.extra_information) {
          const reward = JSON.parse(activityInfo.extra_information);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_box_content", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("info_box_pool_data", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("player_boxes", data => {
      setBoxToken(data[boxID$2]?.amounts ?? 0);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["kuangtu"] ?? [];
      result.sort((a, b) => {
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const [willSkip, setWillSkip] = libs.createSignal(false);
  let pDrawWindow;
  let BGButtonLists;
  let BGLayer;
  let BG2;
  let Hero;
  let Content1;
  let Content2;
  let Content3;
  let Content4;
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList$2();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (itemID.toString().startsWith("931") && KeyValues.BackpackKv[itemID]) {
        rarity = KeyValues.BackpackKv[itemID].quality;
      } else if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        rarity = getRarity$2(itemID, data.amounts);
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  libs.createEffect(libs.on(() => ({
    _show: show(),
    _selected: props.selected
  }), v => {
    if (v._show && !rewardShow$2() && handledRewardData().list.length > 0) {
      showDrawRewards(handledRewardData().list);
    }
    if (v._selected && v._show) {
      if (willHeroTooltip() && showHeroTooltip()) {
        $.Schedule(0.4, () => {
          showHeroInfo();
        });
      }
    } else {
      hideHeroInfo();
    }
  }));
  const showHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      ShowCustomTooltip(self, "cosmetic_tooltip", {
        cosmeticID: 3000062,
        text: "#3000062",
        showPreview: 0
      });
    }
  };
  const hideHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      HideCustomTooltip(self, "cosmetic_tooltip");
    }
  };
  const _addHidden = p => {
    if (p?.IsValid()) {
      p.AddClass("Hidden");
    }
  };
  const _removeHidden = p => {
    if (p?.IsValid()) {
      p.RemoveClass("Hidden");
    }
  };
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex$2()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex$2(-1);
    }
    if (show()) {
      let p1 = $("#KuangTuDrawPortal");
      let p2 = $("#KuangTuDrawPortalGold");
      let p3 = $("#KuangTuDrawPortalRed");
      if (p1?.IsValid()) {
        p1.StopParticlesImmediately(false);
        p1.style.opacity = "1";
      }
      if (p2?.IsValid()) {
        p2.StopParticlesImmediately(false);
        p2.style.opacity = "0";
      }
      if (p3?.IsValid()) {
        p3.StopParticlesImmediately(false);
        p3.style.opacity = "0";
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow$2()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess$2()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd$2(false);
    setDrawButtonEnable$2(false);
    setRewardList$2([]);
    let seq = new RunSequentialActions();
    if (rewardShow$2()) {
      setRewardShow$2(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        _addHidden(BGLayer);
        _addHidden(BG2);
        _addHidden(Hero);
        _addHidden(Content1);
        _addHidden(Content2);
        _addHidden(Content3);
        _addHidden(Content4);
        _addHidden($("#KuangTuSkipButton"));
        _addHidden($("#NewYearExchangeRewardTooltip"));
        _addHidden($("#PortalCircle"));
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        $("#KuangTuDrawPortal").StartParticles();
        $("#KuangTuDrawPortalRed").StartParticles();
        $("#KuangTuDrawPortalGold").StartParticles();
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex$2(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$2()) return true;
        if (handledRewardData().list.length > 0 || drawEnd$2()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$2()) return false;
        if (handledRewardData().list.length > 0 || drawEnd$2()) {
          if (handledRewardData().resultType != 0) {
            $("#KuangTuDrawPortal").style.opacity = "0";
            if (handledRewardData().resultType == 2) {
              $("#KuangTuDrawPortalRed").style.opacity = "1";
            } else {
              $("#KuangTuDrawPortalGold").style.opacity = "1";
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: boxID$2,
      pool: activityPool$2,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        setRewardList$2(data.data.map(v => {
          if (v.orderby == undefined) {
            v.orderby = Round(Math.random() * 100);
          }
          return v;
        }).sort((a, b) => a.orderby - b.orderby));
        setDrawSuccess$2(true);
      } else {
        setDrawSuccess$2(false);
      }
      setDrawEnd$2(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      let seq = new RunSequentialActions();
      seq.actions.push(new RunFunctionAction(() => {
        setRewardShow$2(true);
        pRewardList.RemoveAndDeleteChildren();
        const count = items.length;
        for (let i = 0; i < count; i++) {
          const data = items[i];
          let itemID = data.origin_item_id ?? data.itemId;
          let rarity = data.rarity;
          let p = $.CreatePanel("Panel", pRewardList, "");
          p.AddClass("AwardItem");
          if (count == 1) {
            p.AddClass("Single");
          } else {
            p.AddClass("Multi" + (i + 1));
          }
          p.AddClass("Rarity" + rarity);
          SaveData(p, "iRarity", rarity);
          libs.render(() => (() => {
            const _el$ = libs.createElement("Panel", {
                id: "AwardItemContainer"
              }, null),
              _el$2 = libs.createElement("Panel", {}, _el$),
              _el$3 = libs.createElement("Panel", {}, _el$),
              _el$4 = libs.createElement("Panel", {}, _el$),
              _el$1 = libs.createElement("Panel", {}, _el$);
            libs.setProp(_el$2, "className", "AwardBG");
            libs.setProp(_el$3, "className", "New");
            libs.setProp(_el$4, "className", "Mask");
            libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "MaskMain",
              get children() {
                return [libs.createComponent(ProductItem.ProductItem, {
                  id: "StoreItemImage",
                  itemid: itemID,
                  rarity: rarity,
                  get count() {
                    return data.origin_item_id == undefined ? data.amounts : 1;
                  }
                }), libs.createComponent(CosmeticCard.CosmeticImage, {
                  hittest: false,
                  width: "200px",
                  height: "200px",
                  y: "-10px",
                  align: "center center",
                  get itemid() {
                    return itemID.toString();
                  }
                })];
              }
            }), null);
            libs.insert(_el$4, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  when: rarity == 3,
                  get children() {
                    return [(() => {
                      const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                        squarePixels: true,
                        particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "0 0 200",
                        fov: 30
                      }, null);
                      libs.setProp(_el$5, "style", {
                        width: "260px",
                        height: "260px",
                        align: "center center"
                      });
                      return _el$5;
                    })(), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                }), libs.createComponent(libs.Match, {
                  when: rarity == 4,
                  get children() {
                    return [libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle3",
                      squarePixels: true,
                      particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "0 0 200",
                      fov: 30
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                })];
              }
            }), null);
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return data.origin_item_id != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "Conversion",
                  get children() {
                    return [libs.createElement("Image", {
                      id: "ConversionBG"
                    }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ConversionInfo",
                      get children() {
                        return [libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return $.Localize("#Conversion");
                          }
                        }), libs.createComponent(EOM_Image.EOM_Image, {
                          id: "TokenIcon",
                          get src() {
                            return getPayTypeIconPath(data.itemId);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return "×" + data.amounts;
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
              IsNew: true
            }), _$p));
            return _el$;
          })(), p);
        }
      }));
      seq.actions.push(new WaitAction(0.5));
      seq.actions.push(new RunFunctionAction(() => {
        if (pRewardList) {
          let flipSeqList = new RunStaggeredActions(fFlipTime$2 / 2);
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p && LoadData(p, "Flipped") != "1") {
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                GoldParticle.StopParticlesWithEndcaps();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StopParticlesWithEndcaps();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                RedParticle.StopParticlesWithEndcaps();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StopParticlesWithEndcaps();
              }
              p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime$2 + "s";
              let flipSeq = new RunSequentialActions();
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid()) {
                  if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                    p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                  }
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$2 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                  p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                }
              }));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  Game.EmitSound("playercard.flip");
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$2 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  SaveData(p, "Flipped", "1");
                  if (GoldParticle && GoldParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle.StartParticles();
                  }
                  if (GoldParticle2 && GoldParticle2.IsValid()) {
                    GoldParticle2.StartParticles();
                  }
                  if (RedParticle && RedParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    RedParticle.StartParticles();
                  }
                  if (RedParticle2 && RedParticle2.IsValid()) {
                    RedParticle2.StartParticles();
                  }
                }
                if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                  setDrawButtonEnable$2(true);
                }
              }));
              flipSeqList.actions.push(flipSeq);
            }
          }
          RunSingleAction(flipSeqList);
        }
      }));
      RunSingleAction(seq);
    }
  };
  const funcRewardShowContinue = () => {
    let bBack = true;
    setDrawButtonEnable$2(true);
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow$2(false);
        setRewardList$2([]);
        _removeHidden(BGButtonLists);
        _removeHidden(BGLayer);
        _removeHidden(BG2);
        _removeHidden(Hero);
        _removeHidden(Content1);
        _removeHidden(Content2);
        _removeHidden(Content3);
        _removeHidden(Content4);
        _removeHidden($("#KuangTuSkipButton"));
        _removeHidden($("#NewYearExchangeRewardTooltip"));
        _removeHidden($("#PortalCircle"));
      }
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  libs.createEffect(libs.on(exchangeShow, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_kuangtu",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return [libs.createComponent(Player.PlayerCurrency, {
            type: "boxes",
            tokenID: activityToken
          }), libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: exchangeTokenID$2
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainContainer",
        hittest: false,
        get children() {
          return [libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "KuangTuDrawPortalGold",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
            fov: 120,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "KuangTuDrawPortal",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "KuangTuDrawPortalRed",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "Hero3D",
            ref(r$) {
              const _ref$ = Hero;
              typeof _ref$ === "function" ? _ref$(r$) : Hero = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              const _el$14 = libs.createElement("DOTAScenePanel", {
                allowrotation: false,
                map: "scene/kuangtu_activity.vmap",
                camera: "preview_camera",
                light: "preview_light",
                particleonly: false,
                deferredalpha: true,
                antialias: true
              }, null);
              libs.setProp(_el$14, "style", {
                width: "100%",
                height: "100%"
              });
              return _el$14;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            ref(r$) {
              const _ref$2 = BGLayer;
              typeof _ref$2 === "function" ? _ref$2(r$) : BGLayer = r$;
            },
            hittest: false,
            get children() {
              return [libs.createComponent(InfoButton.InfoButton, {
                className: language$9,
                id: "ActivityInfoButton",
                info: "#SnowballInfo",
                onmouseover: self => {
                  if (language$9 != "schinese") {
                    ShowCustomTooltip(self, "long_text", {
                      text: "#Activity_kuangtu_infodesc"
                    });
                  } else {
                    $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_kuangtu_infodesc");
                  }
                },
                onmouseout: self => {
                  if (language$9 != "schinese") {
                    HideCustomTooltip(self, "long_text");
                  } else {
                    $.DispatchEvent("DOTAHideTextTooltip", self);
                  }
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language$9,
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityCountdown",
                className: language$9,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    align: "right center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "timeIcon"
                      }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return endtime();
                        },
                        text: "#countdown_time"
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PoolInfoIcon",
                className: language$9,
                size: "24",
                get src() {
                  return getSrcPath("icon/c_info.png");
                },
                customTooltip: {
                  name: "custom_text",
                  text: "#Activity_kuangtu_poolchance"
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return boxAmounts() > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "NewYearBoxFastAccess",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "NewYearBoxImage",
                        get children() {
                          return [libs.createComponent(ProductImage.ProductImage, {
                            itemid: 9314005
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x ${boxAmounts()}`;
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Button.EOM_Button, {
                        color: "Gold",
                        text: "#UseSelfPickBox",
                        onactivate: () => {
                          showPopup("BackpackItemUse", {
                            id: 9314005
                          });
                        }
                      })];
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CenterCircle",
            ref(r$) {
              const _ref$3 = BG2;
              typeof _ref$3 === "function" ? _ref$3(r$) : BG2 = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return nextUpNeedCount() != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "DropBanner",
                    hittest: false,
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        text: "#Activity_kuangtu_chanceup",
                        get dialogVariables() {
                          return {
                            count: nextUpNeedCount()
                          };
                        },
                        html: true
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "ExchangeButton",
            ref(r$) {
              const _ref$4 = Content4;
              typeof _ref$4 === "function" ? _ref$4(r$) : Content4 = r$;
            },
            get className() {
              return $.Language().toLowerCase();
            },
            text: `#Store_Exchange_Button`,
            onactivate: () => setExchangeShow(true)
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        ref(r$) {
          const _ref$5 = BGButtonLists;
          typeof _ref$5 === "function" ? _ref$5(r$) : BGButtonLists = r$;
        },
        id: "DrawButtonList",
        get children() {
          return [libs.createComponent(DrawButton$2, {
            get enable() {
              return drawButtonEnable$2();
            },
            get ticket() {
              return boxToken();
            },
            discountToken: 0,
            count: 1,
            drawCallback: Draw
          }), libs.createComponent(DrawButton$2, {
            get enable() {
              return drawButtonEnable$2();
            },
            get ticket() {
              return boxToken();
            },
            discountToken: 0,
            count: 10,
            drawCallback: Draw
          })];
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "KuangTuSkipButton",
        get ["class"]() {
          return libs.classNames("SkipButton", {
            Active: willSkip()
          });
        },
        onactivate: () => setWillSkip(v => !v),
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Square",
            get src() {
              return getSrcPath("draw/c_square.png");
            }
          }), libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Hook",
            get src() {
              return getSrcPath("draw/c_hook.png");
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            text: "#Skip_Button"
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("DrawCardResultWindow", {
            Show: rewardShow$2()
          });
        },
        ref(r$) {
          const _ref$6 = pDrawWindow;
          typeof _ref$6 === "function" ? _ref$6(r$) : pDrawWindow = r$;
        },
        acceptsfocus: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ResultContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "NewYearRewardList",
                hittest: false
              }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                id: "RewardClose",
                onactivate: () => funcRewardShowContinue()
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Currencies",
                get children() {
                  return [libs.createComponent(Player.PlayerCurrency, {
                    type: "boxes",
                    tokenID: activityToken
                  }), libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: exchangeTokenID$2
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton$2, {
                get enable() {
                  return drawButtonEnable$2();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton$2, {
                get enable() {
                  return drawButtonEnable$2();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangePanel",
        get className() {
          return libs.classNames({
            Show: exchangeShow()
          });
        },
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$15 = libs.createElement("Panel", {
              id: "TopBarBG"
            }, null);
            libs.insert(_el$15, libs.createComponent(Player.CurrencyGroup, {
              tokens: [exchangeTokenID$2]
            }));
            return _el$15;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeContainer",
            onactivate: () => setExchangeShow(false),
            get children() {
              return [(() => {
                const _el$16 = libs.createElement("Panel", {
                  id: "ExchangeList"
                }, null);
                libs.setProp(_el$16, "onactivate", () => {});
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeListTitle",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "ExchangeListTitleLabel",
                      text: `#${activityPool$2}_exchange`
                    }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                      onactivate: () => {
                        setExchangeShow(false);
                      }
                    })];
                  }
                }), null);
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeItemList",
                  flowChildren: "right-wrap",
                  scroll: "y",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return exchangeShow();
                      },
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return storeItemData();
                          },
                          children: (storeItem, index) => {
                            return libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                              storeItem: storeItem(),
                              purchased_product: purchased_product(),
                              player_hero: playerHero(),
                              player_ornament: playerOrnament(),
                              previewing_id: previewInfo().cid,
                              onPreview: (cosmetic_id, exchange_id) => {
                                previewTimer = $.Schedule(0.3, () => {
                                  previewTimer = -1;
                                  if (previewInfo().eid != exchange_id) {
                                    setPreviewInfo({
                                      cid: cosmetic_id,
                                      eid: exchange_id
                                    });
                                  }
                                });
                              },
                              onCancelPreview: () => {
                                if (previewTimer != -1) {
                                  $.CancelScheduled(previewTimer);
                                  previewTimer = -1;
                                }
                              }
                            })));
                          }
                        });
                      }
                    });
                  }
                }), null);
                return _el$16;
              })(), (() => {
                const _el$17 = libs.createElement("Panel", {
                  id: "ExchangePreview"
                }, null);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid != -1;
                  },
                  get children() {
                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ExchangePreviewMain",
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return KeyValues.CosmeticsKv[previewInfo().cid];
                          },
                          get fallback() {
                            return libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return previewInfo().cid;
                              }
                            });
                          },
                          get children() {
                            return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                              get cosmetic_id() {
                                return previewInfo().cid;
                              }
                            });
                          }
                        });
                      }
                    }), (() => {
                      const _el$18 = libs.createElement("Panel", {
                        id: "CosmeticDesc"
                      }, null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticName",
                        get text() {
                          return '#' + previewInfo().cid;
                        }
                      }), null);
                      libs.insert(_el$18, libs.createComponent(EOM_Separator.EOM_Separator, {
                        size: "short"
                      }), null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticAccess",
                        get text() {
                          return GetCosmeticAccessDescription(previewInfo().cid);
                        }
                      }), null);
                      return _el$18;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return previewInfo().cid.toString().slice(0, 3) == "531";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          text: "#CosmeticToEquip",
                          align: "center bottom",
                          color: "Blue",
                          marginBottom: "68px",
                          x: "175px",
                          onactivate: () => {
                            ToggleWindows('MenuButton_cosmetics', true);
                            clientSideEvent("jump_to_bunny_cosmetic", {});
                          }
                        });
                      }
                    })];
                  }
                }));
                return _el$17;
              })()];
            }
          })];
        }
      })];
    }
  });
};
const DrawButton$2 = props => {
  const costInfo = libs.createMemo(() => {
    const single = singleCost$2();
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("KuangTuDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900280,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + boxID$2 + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              });
            }
          })];
        }
      })];
    }
  });
};

const language$8 = $.Language().toLowerCase();
let previewTimer$1 = -1;
const Activity_LuckCheck = props => {
  const [previewID, setPreviewID] = libs.createSignal(2000002);
  const localPlayerID = Players.GetLocalPlayer();
  const activityID = props.activity_id;
  const merged = libs.mergeProps$1({}, props);
  const [local, others] = libs.splitProps(merged, ["selected"]);
  const [endtime, setEndtime] = libs.createSignal(1753891200);
  const [progress, setProgress] = libs.createSignal(0);
  const [activityTokenID, setActivityTokenID] = libs.createSignal(-1);
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [progressRewardsState, setProgressRewardsState] = libs.createSignal({});
  const [taskData, setTaskData] = libs.createSignal([]);
  const [taskProgress, setTaskProgress] = libs.createSignal({});
  const progressPercentage = () => {
    const rewards = rewardInfoList();
    if (rewards.length == 0) return 0;
    for (let index = 0; index < rewards.length; index++) {
      const previousThreshold = rewards[index - 1]?.threshold ?? 0;
      const threshold = rewards[index].threshold;
      if (progress() <= threshold) {
        const segmentProgress = Clamp((progress() - previousThreshold) / Math.max(1, threshold - previousThreshold), 0, 1);
        return (index + segmentProgress) / rewards.length * 100;
      }
    }
    return 100;
  };
  netdata_utils.createNetDataEffect("info_activity_task", data => {
    if (data) {
      const task = [];
      for (const task_id in data) {
        if (data[task_id].activity_id == activityID) task.push(data[task_id]);
      }
      setTaskData(task.sort((a, b) => a.task_id - b.task_id));
    }
  });
  netdata_utils.createNetDataEffect("info_activity_data", data => {
    for (const activityInfo of data) {
      if (activityInfo.activity_id == activityID) {
        const reward = JSON.parse(activityInfo.extra_information);
        let reawrd_list = reward.rewards;
        if (reawrd_list) {
          reawrd_list = reawrd_list.map((v, i) => {
            if (reawrd_list?.[i - 1]?.threshold != undefined) v.last_threshold = reawrd_list[i - 1].threshold;
            return v;
          });
        }
        setRewardInfoList(reawrd_list);
        setEndtime(reward.activity_end_time);
        setActivityTokenID(reward.activity_token);
      }
    }
  });
  netdata_utils.createNetDataEffect("task_activity_data", data => {
    if (data?.[activityID]) {
      setProgressRewardsState(data[activityID].rewards);
      setProgress(data[activityID].progress ?? 0);
    }
  }, localPlayerID);
  netdata_utils.createNetDataEffect("activity_task_progresses", data => {
    if (data) {
      const output = {};
      for (const unique_task_id in data) {
        const element = data[unique_task_id];
        output[element.task_id] = {
          progress: element.progress ?? 0,
          unique_task_id: element.unique_task_id,
          receive_progress: element.receive_progress ?? 0
        };
      }
      setTaskProgress(output);
    }
  }, localPlayerID);
  let requesting = false;
  const receiveTaskReward = (task_id, addProgress, unique_task_id) => {
    if (unique_task_id != undefined && !requesting) {
      requesting = true;
      serverRequest("activity_task_reward", {
        task_id: task_id,
        unique_task_id: unique_task_id
      }, ({
        status
      }) => {
        requesting = false;
        if (status == 0) {
          callAction("activity_data", {
            activity_id: activityID
          });
        }
      });
    }
  };
  callAction("activity_task_progress", {
    task_type: 2,
    sid: 0,
    aid: activityID
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ActivityMain", "Season" + props.season, {
        Hidden: !local.selected
      });
    },
    id: "Activity_LuckCheck",
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BGLayer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "ActivityTitle",
            className: language$8,
            hittest: false
          }), libs.createComponent(InfoButton.InfoButton, {
            className: language$8,
            id: "MillionInfoButton",
            info: "#SnowballInfo",
            tooltip: "#luckcheck_activity_infodesc"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityCountdown",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                align: "center center",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "timeIcon",
                    get backgroundImage() {
                      return getImagePath("activity/luck_check_halloween/h7_icon_01.png");
                    }
                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return endtime();
                    },
                    text: "#countdown_time"
                  })];
                }
              });
            }
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return previewID() != undefined;
        },
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "PreviewMain",
            hittest: false,
            get children() {
              return libs.createComponent(libs.Switch, {
                get children() {
                  return [libs.createComponent(libs.Match, {
                    get when() {
                      return KeyValues.CosmeticsKv[previewID()] != undefined;
                    },
                    get children() {
                      return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                        get cosmetic_id() {
                          return previewID();
                        },
                        showPedestal: false,
                        showCourierPedestal: false
                      });
                    }
                  }), libs.createComponent(libs.Match, {
                    get when() {
                      return KeyValues.CosmeticsKv[previewID()] == undefined;
                    },
                    get children() {
                      return [libs.createComponent(CosmeticCard.CosmeticImage, {
                        className: "PreviewImage",
                        get itemid() {
                          return previewID().toString();
                        }
                      }), libs.createComponent(ProductImage.ProductImage, {
                        className: "PreviewImage",
                        get itemid() {
                          return previewID();
                        }
                      })];
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "PreviewDetail",
            hittest: false,
            get children() {
              return [libs.createComponent(GenericPanel.CLabel, {
                id: "title",
                get text() {
                  return `#${previewID()}`;
                }
              }), libs.createComponent(EOM_Separator.EOM_Separator, {
                size: "short"
              }), libs.createComponent(GenericPanel.CLabel, {
                id: "desc",
                get text() {
                  return `#${previewID()}_description`;
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardsContainer",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardsTitle",
            get children() {
              return libs.createComponent(GenericPanel.CLabel, {
                text: "#PointExchange"
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RewardExchangeRow",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "PointCount",
                    get children() {
                      return [libs.createComponent(GenericPanel.CImage, {
                        className: "ActivityRewardImage",
                        get src() {
                          return getTokenSrcPath(activityTokenID());
                        },
                        onmouseover: self => {
                          $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + activityTokenID(), "#" + activityTokenID() + "_description");
                        },
                        onmouseout: self => {
                          $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                        }
                      }), libs.createComponent(GenericPanel.CLabel, {
                        get text() {
                          return progress();
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "ProgressContainer",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "NewProgressBars",
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "ProgressClip",
                            get width() {
                              return `${progressPercentage()}%`;
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "Progress"
                              });
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        hittest: false,
                        id: "ProgressRewards",
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            width: "100%",
                            hittest: false,
                            overflow: "noclip",
                            get children() {
                              return libs.createComponent(libs.Index, {
                                get each() {
                                  return rewardInfoList();
                                },
                                children: (data, index) => {
                                  const rewardID = () => data().reward_id;
                                  const state = () => progressRewardsState()?.[rewardID()] ?? 2;
                                  const rewardInfo = () => data().rewards?.[0];
                                  const x = () => `${100 / Math.max(1, rewardInfoList().length) * (index + 1)}%`;
                                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                    get className() {
                                      return libs.classNames("ElvesExchangeRewardButton", {});
                                    },
                                    get x() {
                                      return x();
                                    },
                                    get enabled() {
                                      return state() == 0;
                                    },
                                    onactivate: self => {
                                      callAction("activity_receive", {
                                        activity_id: activityID,
                                        reward_id: rewardID()
                                      });
                                    },
                                    get children() {
                                      return [libs.createComponent(libs.Show, {
                                        get when() {
                                          return rewardInfoList().length == index;
                                        },
                                        fallback: () => libs.createComponent(ElvesReward$1, {
                                          get reawrd_info() {
                                            return rewardInfo();
                                          },
                                          get state() {
                                            return state();
                                          },
                                          onPreview: id => {
                                            previewTimer$1 = $.Schedule(0.3, () => {
                                              previewTimer$1 = -1;
                                              if (previewID() != id) {
                                                setPreviewID(id);
                                              }
                                            });
                                          }
                                        }),
                                        get children() {
                                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                                            get className() {
                                              return libs.classNames("ElvesRewardCourier", "State" + state());
                                            },
                                            onmouseover: self => {
                                              previewTimer$1 = $.Schedule(0.3, () => {
                                                previewTimer$1 = -1;
                                                if (previewID() != rewardInfo().item_id) {
                                                  setPreviewID(rewardInfo().item_id);
                                                }
                                              });
                                              $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + rewardInfo().item_id, "#" + rewardInfo().item_id + "_description");
                                            },
                                            onmouseout: self => {
                                              if (previewTimer$1 != -1) {
                                                $.CancelScheduled(previewTimer$1);
                                                previewTimer$1 = -1;
                                              }
                                              $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                                            },
                                            get children() {
                                              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                                id: "BG"
                                              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                                id: "Light"
                                              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                                className: "ElvesActivityCheck"
                                              })];
                                            }
                                          });
                                        }
                                      }), libs.createComponent(GenericPanel.CLabel, {
                                        id: "threshold",
                                        get text() {
                                          return `${data().threshold}`;
                                        }
                                      }), libs.createComponent(libs.Show, {
                                        get when() {
                                          return state() == 0;
                                        },
                                        get children() {
                                          return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                            className: "LuckCheckRewardMark",
                                            hittest: false
                                          });
                                        }
                                      })];
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      })];
                    }
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TaskList",
                scroll: "y",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return taskData();
                    },
                    children: (data, index) => {
                      const rewards = libs.createMemo(() => {
                        const output = JSON.parseSafe(data().reward);
                        if (typeof output == "object" && Object.keys(output).length > 0) {
                          let sID = activityTokenID().toString();
                          return Object.keys(output[0]).sort((a, b) => (a == sID ? 1 : 0) - (b == sID ? 1 : 0)).map((id, index) => {
                            return {
                              itemId: id,
                              amounts: output[0][id] ?? 0
                            };
                          });
                        }
                        return [];
                      });
                      const task_data = () => {
                        if (taskProgress()[data().task_id]) {
                          return taskProgress()[data().task_id];
                        }
                      };
                      const progress = () => Math.min(finiteNumber(Number(data().target)), task_data()?.progress ?? 0);
                      const state = () => {
                        if (progress() >= finiteNumber(Number(data().target))) {
                          if (task_data()?.receive_progress == 1) {
                            return 1;
                          }
                          return 0;
                        }
                        return 2;
                      };
                      return [libs.createComponent(libs.Show, {
                        when: index != 0,
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "TaskUnderline"
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "ActivityTaskRow",
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "Rewards",
                            get children() {
                              return libs.createComponent(libs.Index, {
                                get each() {
                                  return rewards();
                                },
                                children: (reward, i) => {
                                  const reward_id = () => Number(reward().itemId);
                                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                    className: "ElvesTaskRewardButton",
                                    get enabled() {
                                      return state() == 0;
                                    },
                                    onactivate: () => {
                                      receiveTaskReward(data().task_id, 0, task_data()?.unique_task_id);
                                    },
                                    get children() {
                                      return [libs.createComponent(ElvesReward$1, {
                                        get reawrd_info() {
                                          return {
                                            item_id: reward_id(),
                                            rarity: -1,
                                            amounts: reward().amounts
                                          };
                                        },
                                        get state() {
                                          return state();
                                        },
                                        onPreview: id => {
                                          previewTimer$1 = $.Schedule(0.3, () => {
                                            previewTimer$1 = -1;
                                            if (previewID() != id) {
                                              setPreviewID(id);
                                            }
                                          });
                                        }
                                      }), libs.createComponent(libs.Show, {
                                        get when() {
                                          return state() == 0;
                                        },
                                        get children() {
                                          return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                            className: "LuckCheckRewardMark",
                                            hittest: false
                                          });
                                        }
                                      })];
                                    }
                                  });
                                }
                              });
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "TaskInfo",
                            get children() {
                              return [libs.createComponent(GenericPanel.CLabel, {
                                id: "title",
                                get text() {
                                  return `#${data().task_id}`;
                                }
                              }), libs.createComponent(GenericPanel.CLabel, {
                                id: "progress",
                                get text() {
                                  return `(${progress()} / ${data().target})`;
                                }
                              })];
                            }
                          })];
                        }
                      })];
                    }
                  });
                }
              })];
            }
          })];
        }
      })];
    }
  });
};
const ElvesReward$1 = props => {
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ElvesReward", "Rarity" + props.reawrd_info.rarity, "State" + props.state);
    },
    onmouseover: self => {
      props.onPreview(props.reawrd_info.item_id);
    },
    onmouseout: self => {
      if (previewTimer$1 != -1) {
        $.CancelScheduled(previewTimer$1);
        previewTimer$1 = -1;
      }
    },
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BG",
        get children() {
          return [libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return props.reawrd_info.item_id;
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            id: "RewardCount",
            get text() {
              return `${props.reawrd_info.amounts}`;
            },
            hittest: false
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Light",
        hittest: false
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "ElvesActivityCheck",
        hittest: false
      })];
    }
  });
};

let fFlipTime$1 = 0.5;
const language$7 = $.Language().toLowerCase();
const [singleCost$1] = libs.createSignal(1);
const [rewardShow$1, setRewardShow$1] = libs.createSignal(false);
const [rewardList$1, setRewardList$1] = libs.createSignal([]);
const [drawButtonEnable$1, setDrawButtonEnable$1] = libs.createSignal(true);
const [info_box_content$1, setInfoBoxContent$1] = libs.createSignal();
const [drawSuccess$1, setDrawSuccess$1] = libs.createSignal(false);
const [drawEnd$1, setDrawEnd$1] = libs.createSignal(false);
const [drawSoundIndex$1, setDrawSoundIndex$1] = libs.createSignal(-1);
libs.createEffect(libs.on(rewardList$1, _rewardList => {
  if (_rewardList.length == 0 && rewardShow$1()) {
    setRewardShow$1(false);
  }
}));
const getRarity$1 = (itemID, amount) => {
  let rarity = 0;
  let gotten = false;
  let type = Number(itemID.toString().slice(0, 3));
  let content = info_box_content$1();
  if (content) {
    for (const v of content) {
      if (v.item_id == itemID) {
        if (type == 110) {
          if (amount >= v.amount_min && amount <= v.amount_max) {
            if (v.rarity == "n") {
              rarity = 0;
              gotten = true;
            } else if (v.rarity == "r") {
              rarity = 1;
              gotten = true;
            } else if (v.rarity == "sr") {
              rarity = 2;
              gotten = true;
            } else if (v.rarity == "ssr") {
              rarity = 3;
              gotten = true;
            }
          }
        } else {
          if (v.rarity == "n") {
            rarity = 0;
            gotten = true;
          } else if (v.rarity == "r") {
            rarity = 1;
            gotten = true;
          } else if (v.rarity == "sr") {
            rarity = 2;
            gotten = true;
          } else if (v.rarity == "ssr") {
            rarity = 3;
            gotten = true;
          }
        }
        if (gotten) break;
      }
    }
  }
  return rarity;
};
const activityPool$1 = 99100008;
const boxID$1 = 2000095;
const exchangeTokenID$1 = 1100064;
const Activity_miao = props => {
  const show = () => props.show;
  const activityToken = boxID$1;
  const activityID = props.activity_id;
  const [activityCollection, setActivityCollection] = libs.createSignal({});
  const [endtime, setEndtime] = libs.createSignal(1772121600);
  const [boxToken, setBoxToken] = libs.createSignal(0);
  const [progress, setProgress] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const [willHeroTooltip] = libs.createSignal(false);
  const [showHeroTooltip] = libs.createSignal(true);
  libs.createEffect(() => {
    if (showHeroTooltip() && willHeroTooltip()) {
      showHeroInfo();
    } else {
      hideHeroInfo();
    }
  });
  const updateBoxContent = () => {
    const info_box_pool_data = getNetDataCache("info_box_pool_data");
    const info_box_content = getNetDataCache("info_box_content");
    if (info_box_pool_data && info_box_content) {
      const dropName = info_box_pool_data.find(v => v.pool == activityPool$1)?.drop_content;
      if (dropName && info_box_content[dropName]) {
        setInfoBoxContent$1(info_box_content[dropName]);
      }
    }
  };
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  const [luck, setLuck] = libs.createSignal(0);
  const nextUpNeedCount = libs.createMemo(() => {
    if (luck() == 0) {
      return 180;
    }
    return Math.max(1, 180 - luck() + 1);
  });
  const [boxAmounts, setBoxAmounts] = libs.createSignal(0);
  libs.onMount(() => {
    callAction("box_luck", {
      bid: boxID$1,
      pool: activityPool$1
    });
    let gameEventIDList = [];
    let NetTableIDList = [];
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    gameEventIDList.push(useNetData("player_box_luck", data => {
      if (data && data[activityPool$1]) {
        setLuck(data[activityPool$1].luck);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("open_box_activity_data", data => {
      if (data[activityID]) {
        if (data[activityID]?.rewards != undefined) {
          setActivityCollection(data[activityID].rewards);
        }
        setProgress(data[activityID]?.progress ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("player_props", data => {
      if (data) {
        setBoxAmounts(Object.values(data).find(v => v.prop_id == 9314005 && v.amounts > 0)?.amounts ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID && activityInfo.extra_information) {
          const reward = JSON.parse(activityInfo.extra_information);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_box_content", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("info_box_pool_data", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("player_boxes", data => {
      setBoxToken(data[boxID$1]?.amounts ?? 0);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["miao"] ?? [];
      result.sort((a, b) => {
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const [willSkip, setWillSkip] = libs.createSignal(false);
  let pDrawWindow;
  let BGButtonLists;
  let BGLayer;
  let BG2;
  let Hero;
  let Content1;
  let Content2;
  let Content3;
  let Content4;
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList$1();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (itemID.toString().startsWith("931") && KeyValues.BackpackKv[itemID]) {
        rarity = KeyValues.BackpackKv[itemID].quality;
      } else if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        rarity = getRarity$1(itemID, data.amounts);
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  libs.createEffect(libs.on(() => ({
    _show: show(),
    _selected: props.selected
  }), v => {
    if (v._show && !rewardShow$1() && handledRewardData().list.length > 0) {
      showDrawRewards(handledRewardData().list);
    }
    if (v._selected && v._show) {
      if (willHeroTooltip() && showHeroTooltip()) {
        $.Schedule(0.4, () => {
          showHeroInfo();
        });
      }
    } else {
      hideHeroInfo();
    }
  }));
  const showHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      ShowCustomTooltip(self, "cosmetic_tooltip", {
        cosmeticID: 3000062,
        text: "#3000062",
        showPreview: 0
      });
    }
  };
  const hideHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      HideCustomTooltip(self, "cosmetic_tooltip");
    }
  };
  const _addHidden = p => {
    if (p?.IsValid()) {
      p.AddClass("Hidden");
    }
  };
  const _removeHidden = p => {
    if (p?.IsValid()) {
      p.RemoveClass("Hidden");
    }
  };
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex$1()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex$1(-1);
    }
    if (show()) {
      let p1 = $("#MiaoDrawPortal");
      let p2 = $("#MiaoDrawPortalGold");
      let p3 = $("#MiaoDrawPortalRed");
      if (p1?.IsValid()) {
        p1.StopParticlesImmediately(false);
        p1.style.opacity = "1";
      }
      if (p2?.IsValid()) {
        p2.StopParticlesImmediately(false);
        p2.style.opacity = "0";
      }
      if (p3?.IsValid()) {
        p3.StopParticlesImmediately(false);
        p3.style.opacity = "0";
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow$1()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess$1()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd$1(false);
    setDrawButtonEnable$1(false);
    setRewardList$1([]);
    let seq = new RunSequentialActions();
    if (rewardShow$1()) {
      setRewardShow$1(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        _addHidden(BGLayer);
        _addHidden(BG2);
        _addHidden(Hero);
        _addHidden(Content1);
        _addHidden(Content2);
        _addHidden(Content3);
        _addHidden(Content4);
        _addHidden($("#MiaoSkipButton"));
        _addHidden($("#NewYearExchangeRewardTooltip"));
        _addHidden($("#PortalCircle"));
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        $("#MiaoDrawPortal").StartParticles();
        $("#MiaoDrawPortalRed").StartParticles();
        $("#MiaoDrawPortalGold").StartParticles();
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex$1(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$1()) return true;
        if (handledRewardData().list.length > 0 || drawEnd$1()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex$1()) return false;
        if (handledRewardData().list.length > 0 || drawEnd$1()) {
          if (handledRewardData().resultType != 0) {
            $("#MiaoDrawPortal").style.opacity = "0";
            if (handledRewardData().resultType == 2) {
              $("#MiaoDrawPortalRed").style.opacity = "1";
            } else {
              $("#MiaoDrawPortalGold").style.opacity = "1";
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: boxID$1,
      pool: activityPool$1,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        setRewardList$1(data.data.map(v => {
          if (v.orderby == undefined) {
            v.orderby = Round(Math.random() * 100);
          }
          return v;
        }).sort((a, b) => a.orderby - b.orderby));
        setDrawSuccess$1(true);
      } else {
        setDrawSuccess$1(false);
      }
      setDrawEnd$1(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      let seq = new RunSequentialActions();
      seq.actions.push(new RunFunctionAction(() => {
        setRewardShow$1(true);
        pRewardList.RemoveAndDeleteChildren();
        const count = items.length;
        for (let i = 0; i < count; i++) {
          const data = items[i];
          let itemID = data.origin_item_id ?? data.itemId;
          let rarity = data.rarity;
          let p = $.CreatePanel("Panel", pRewardList, "");
          p.AddClass("AwardItem");
          if (count == 1) {
            p.AddClass("Single");
          } else {
            p.AddClass("Multi" + (i + 1));
          }
          p.AddClass("Rarity" + rarity);
          SaveData(p, "iRarity", rarity);
          libs.render(() => (() => {
            const _el$ = libs.createElement("Panel", {
                id: "AwardItemContainer"
              }, null),
              _el$2 = libs.createElement("Panel", {}, _el$),
              _el$3 = libs.createElement("Panel", {}, _el$),
              _el$4 = libs.createElement("Panel", {}, _el$),
              _el$1 = libs.createElement("Panel", {}, _el$);
            libs.setProp(_el$2, "className", "AwardBG");
            libs.setProp(_el$3, "className", "New");
            libs.setProp(_el$4, "className", "Mask");
            libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "MaskMain",
              get children() {
                return [libs.createComponent(ProductItem.ProductItem, {
                  id: "StoreItemImage",
                  itemid: itemID,
                  rarity: rarity,
                  get count() {
                    return data.origin_item_id == undefined ? data.amounts : 1;
                  }
                }), libs.createComponent(CosmeticCard.CosmeticImage, {
                  hittest: false,
                  width: "200px",
                  height: "200px",
                  y: "-10px",
                  align: "center center",
                  get itemid() {
                    return itemID.toString();
                  }
                })];
              }
            }), null);
            libs.insert(_el$4, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  when: rarity == 3,
                  get children() {
                    return [(() => {
                      const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                        squarePixels: true,
                        particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "0 0 200",
                        fov: 30
                      }, null);
                      libs.setProp(_el$5, "style", {
                        width: "260px",
                        height: "260px",
                        align: "center center"
                      });
                      return _el$5;
                    })(), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                }), libs.createComponent(libs.Match, {
                  when: rarity == 4,
                  get children() {
                    return [libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle3",
                      squarePixels: true,
                      particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "0 0 200",
                      fov: 30
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                })];
              }
            }), null);
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return data.origin_item_id != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "Conversion",
                  get children() {
                    return [libs.createElement("Image", {
                      id: "ConversionBG"
                    }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ConversionInfo",
                      get children() {
                        return [libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return $.Localize("#Conversion");
                          }
                        }), libs.createComponent(EOM_Image.EOM_Image, {
                          id: "TokenIcon",
                          get src() {
                            return getPayTypeIconPath(data.itemId);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return "×" + data.amounts;
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
              IsNew: true
            }), _$p));
            return _el$;
          })(), p);
        }
      }));
      seq.actions.push(new WaitAction(0.5));
      seq.actions.push(new RunFunctionAction(() => {
        if (pRewardList) {
          let flipSeqList = new RunStaggeredActions(fFlipTime$1 / 2);
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p && LoadData(p, "Flipped") != "1") {
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                GoldParticle.StopParticlesWithEndcaps();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StopParticlesWithEndcaps();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                RedParticle.StopParticlesWithEndcaps();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StopParticlesWithEndcaps();
              }
              p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime$1 + "s";
              let flipSeq = new RunSequentialActions();
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid()) {
                  if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                    p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                  }
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$1 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                  p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                }
              }));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  Game.EmitSound("playercard.flip");
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime$1 / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  SaveData(p, "Flipped", "1");
                  if (GoldParticle && GoldParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle.StartParticles();
                  }
                  if (GoldParticle2 && GoldParticle2.IsValid()) {
                    GoldParticle2.StartParticles();
                  }
                  if (RedParticle && RedParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    RedParticle.StartParticles();
                  }
                  if (RedParticle2 && RedParticle2.IsValid()) {
                    RedParticle2.StartParticles();
                  }
                }
                if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                  setDrawButtonEnable$1(true);
                }
              }));
              flipSeqList.actions.push(flipSeq);
            }
          }
          RunSingleAction(flipSeqList);
        }
      }));
      RunSingleAction(seq);
    }
  };
  const funcRewardShowContinue = () => {
    let bBack = true;
    setDrawButtonEnable$1(true);
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow$1(false);
        setRewardList$1([]);
        _removeHidden(BGButtonLists);
        _removeHidden(BGLayer);
        _removeHidden(BG2);
        _removeHidden(Hero);
        _removeHidden(Content1);
        _removeHidden(Content2);
        _removeHidden(Content3);
        _removeHidden(Content4);
        _removeHidden($("#MiaoSkipButton"));
        _removeHidden($("#NewYearExchangeRewardTooltip"));
        _removeHidden($("#PortalCircle"));
      }
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  libs.createEffect(libs.on(exchangeShow, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_miao",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return [libs.createComponent(Player.PlayerCurrency, {
            type: "boxes",
            tokenID: activityToken
          }), libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: exchangeTokenID$1
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainContainer",
        hittest: false,
        get children() {
          return [libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "MiaoDrawPortalGold",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
            fov: 120,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "MiaoDrawPortal",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "MiaoDrawPortalRed",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createComponent(EOM_PortraitFullBody.EOM_PortraitFullBody, {
            id: "Hero3D",
            hittest: false,
            showPedestal: false,
            unitname: "5203058",
            allowrotation: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            ref(r$) {
              const _ref$ = BGLayer;
              typeof _ref$ === "function" ? _ref$(r$) : BGLayer = r$;
            },
            hittest: false,
            get children() {
              return [libs.createComponent(InfoButton.InfoButton, {
                className: language$7,
                id: "ActivityInfoButton",
                info: "#SnowballInfo",
                onmouseover: self => {
                  if (language$7 != "schinese") {
                    ShowCustomTooltip(self, "long_text", {
                      text: "#Activity_miao_infodesc"
                    });
                  } else {
                    $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_miao_infodesc");
                  }
                },
                onmouseout: self => {
                  if (language$7 != "schinese") {
                    HideCustomTooltip(self, "long_text");
                  } else {
                    $.DispatchEvent("DOTAHideTextTooltip", self);
                  }
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language$7,
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityCountdown",
                className: language$7,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    align: "right center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "timeIcon"
                      }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return endtime();
                        },
                        text: "#countdown_time"
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PoolInfoIcon",
                className: language$7,
                size: "24",
                get src() {
                  return getSrcPath("icon/c_info.png");
                },
                customTooltip: {
                  name: "custom_text",
                  text: "#Activity_miao_poolchance"
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return boxAmounts() > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "NewYearBoxFastAccess",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "NewYearBoxImage",
                        get children() {
                          return [libs.createComponent(ProductImage.ProductImage, {
                            itemid: 9314005
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x ${boxAmounts()}`;
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Button.EOM_Button, {
                        color: "Gold",
                        text: "#UseSelfPickBox",
                        onactivate: () => {
                          showPopup("BackpackItemUse", {
                            id: 9314005
                          });
                        }
                      })];
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CenterCircle",
            ref(r$) {
              const _ref$2 = BG2;
              typeof _ref$2 === "function" ? _ref$2(r$) : BG2 = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return nextUpNeedCount() != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "DropBanner",
                    hittest: false,
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        text: "#Activity_miao_chanceup",
                        get dialogVariables() {
                          return {
                            count: nextUpNeedCount()
                          };
                        },
                        html: true
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "ExchangeButton",
            ref(r$) {
              const _ref$3 = Content4;
              typeof _ref$3 === "function" ? _ref$3(r$) : Content4 = r$;
            },
            get className() {
              return $.Language().toLowerCase();
            },
            text: `#Store_Exchange_Button`,
            onactivate: () => setExchangeShow(true)
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        ref(r$) {
          const _ref$4 = BGButtonLists;
          typeof _ref$4 === "function" ? _ref$4(r$) : BGButtonLists = r$;
        },
        id: "DrawButtonList",
        get children() {
          return [libs.createComponent(DrawButton$1, {
            get enable() {
              return drawButtonEnable$1();
            },
            get ticket() {
              return boxToken();
            },
            discountToken: 0,
            count: 1,
            drawCallback: Draw
          }), libs.createComponent(DrawButton$1, {
            get enable() {
              return drawButtonEnable$1();
            },
            get ticket() {
              return boxToken();
            },
            discountToken: 0,
            count: 10,
            drawCallback: Draw
          })];
        }
      }), libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "MiaoSkipButton",
        get ["class"]() {
          return libs.classNames("SkipButton", {
            Active: willSkip()
          });
        },
        onactivate: () => setWillSkip(v => !v),
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Square",
            get src() {
              return getSrcPath("draw/c_square.png");
            }
          }), libs.createComponent(EOM_Icon.EOM_Icon, {
            id: "Hook",
            get src() {
              return getSrcPath("draw/c_hook.png");
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            text: "#Skip_Button"
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("DrawCardResultWindow", {
            Show: rewardShow$1()
          });
        },
        ref(r$) {
          const _ref$5 = pDrawWindow;
          typeof _ref$5 === "function" ? _ref$5(r$) : pDrawWindow = r$;
        },
        acceptsfocus: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ResultContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "NewYearRewardList",
                hittest: false
              }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                id: "RewardClose",
                onactivate: () => funcRewardShowContinue()
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Currencies",
                get children() {
                  return [libs.createComponent(Player.PlayerCurrency, {
                    type: "boxes",
                    tokenID: activityToken
                  }), libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: exchangeTokenID$1
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton$1, {
                get enable() {
                  return drawButtonEnable$1();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton$1, {
                get enable() {
                  return drawButtonEnable$1();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangePanel",
        get className() {
          return libs.classNames({
            Show: exchangeShow()
          });
        },
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$14 = libs.createElement("Panel", {
              id: "TopBarBG"
            }, null);
            libs.insert(_el$14, libs.createComponent(Player.CurrencyGroup, {
              tokens: [exchangeTokenID$1]
            }));
            return _el$14;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeContainer",
            onactivate: () => setExchangeShow(false),
            get children() {
              return [(() => {
                const _el$15 = libs.createElement("Panel", {
                  id: "ExchangeList"
                }, null);
                libs.setProp(_el$15, "onactivate", () => {});
                libs.insert(_el$15, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeListTitle",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "ExchangeListTitleLabel",
                      text: `#${activityPool$1}_exchange`
                    }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                      onactivate: () => {
                        setExchangeShow(false);
                      }
                    })];
                  }
                }), null);
                libs.insert(_el$15, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeItemList",
                  flowChildren: "right-wrap",
                  scroll: "y",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return exchangeShow();
                      },
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return storeItemData();
                          },
                          children: (storeItem, index) => {
                            return libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                              storeItem: storeItem(),
                              purchased_product: purchased_product(),
                              player_hero: playerHero(),
                              player_ornament: playerOrnament(),
                              previewing_id: previewInfo().cid,
                              onPreview: (cosmetic_id, exchange_id) => {
                                previewTimer = $.Schedule(0.3, () => {
                                  previewTimer = -1;
                                  if (previewInfo().eid != exchange_id) {
                                    setPreviewInfo({
                                      cid: cosmetic_id,
                                      eid: exchange_id
                                    });
                                  }
                                });
                              },
                              onCancelPreview: () => {
                                if (previewTimer != -1) {
                                  $.CancelScheduled(previewTimer);
                                  previewTimer = -1;
                                }
                              }
                            })));
                          }
                        });
                      }
                    });
                  }
                }), null);
                return _el$15;
              })(), (() => {
                const _el$16 = libs.createElement("Panel", {
                  id: "ExchangePreview"
                }, null);
                libs.insert(_el$16, libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid != -1;
                  },
                  get children() {
                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ExchangePreviewMain",
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return KeyValues.CosmeticsKv[previewInfo().cid];
                          },
                          get fallback() {
                            return libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return previewInfo().cid;
                              }
                            });
                          },
                          get children() {
                            return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                              get cosmetic_id() {
                                return previewInfo().cid;
                              }
                            });
                          }
                        });
                      }
                    }), (() => {
                      const _el$17 = libs.createElement("Panel", {
                        id: "CosmeticDesc"
                      }, null);
                      libs.insert(_el$17, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticName",
                        get text() {
                          return '#' + previewInfo().cid;
                        }
                      }), null);
                      libs.insert(_el$17, libs.createComponent(EOM_Separator.EOM_Separator, {
                        size: "short"
                      }), null);
                      libs.insert(_el$17, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticAccess",
                        get text() {
                          return GetCosmeticAccessDescription(previewInfo().cid);
                        }
                      }), null);
                      return _el$17;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return previewInfo().cid.toString().slice(0, 3) == "531";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          text: "#CosmeticToEquip",
                          align: "center bottom",
                          color: "Blue",
                          marginBottom: "68px",
                          x: "175px",
                          onactivate: () => {
                            ToggleWindows('MenuButton_cosmetics', true);
                            clientSideEvent("jump_to_bunny_cosmetic", {});
                          }
                        });
                      }
                    })];
                  }
                }));
                return _el$16;
              })()];
            }
          })];
        }
      })];
    }
  });
};
const DrawButton$1 = props => {
  const costInfo = libs.createMemo(() => {
    const single = singleCost$1();
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("MiaoDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900280,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + boxID$1 + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              });
            }
          })];
        }
      })];
    }
  });
};

const language$6 = $.Language().toLowerCase();
const [filterText$1, setFilterText$1] = libs.createSignal("");
const [taskTarget$1, setTaskTarget$1] = libs.createSignal(3);
const [taskRewards$1, setTaskRewards$1] = libs.createSignal({});
const taskRewardList$1 = () => Object.keys(taskRewards$1());
const [cooldown$1, setCooldown$1] = libs.createSignal(false);
const inviteFriend$1 = (uid, activityID) => {
  if (cooldown$1()) return;
  setCooldown$1(true);
  $.Schedule(0.4, () => setCooldown$1(false));
  serverRequest("activity_invition", {
    target_uid: uid,
    activity_id: activityID
  }, data => {
    if (data.status == 0) {
      showPopup("NewPlayerInvited", {
        uid
      });
    }
  });
};
let task_id$1 = 1002001;
const Activity_NewPlayer = props => {
  const activityID = props.activity_id;
  const localPlayerID = Players.GetLocalPlayer();
  const [receiving, setReceiving] = libs.createSignal(false);
  const [endtime, setEndtime] = libs.createSignal(0);
  const [unpublished, setUnpublished] = libs.createSignal(false);
  const [loading, setLoading] = libs.createSignal(false);
  const [error, setError] = libs.createSignal(false);
  const [originalFriendList, setOriginalFriendList] = libs.createSignal([]);
  const [processedFriendData, setProcessedFriendData] = libs.createSignal({});
  const [taskProgresses, setTaskProgresses] = libs.createSignal({});
  const [activityProgress, setActivityProgress] = libs.createSignal(0);
  const [activityRewardState, setActivityRewardState] = libs.createSignal({});
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const taskCount = () => {
    return Object.keys(taskProgresses()).length;
  };
  const [taskInited, setTaskInited] = libs.createSignal(false);
  let inited = false;
  libs.createEffect(libs.on(() => props.selected, _selected => {
    if (!_selected) return;
    if (inited) return;
    inited = true;
    setLoading(true);
    setUnpublished(false);
    setError(false);
    GameEvents.SendCustomEventToServer("get_steam_friend_list", {});
  }));
  libs.onMount(() => {
    const gameEventIDList = [];
    gameEventIDList.push(useNetData("info_activity_task", data => {
      if (data[task_id$1] && Number(data[task_id$1]?.target)) {
        setTaskTarget$1(Number(data[task_id$1].target));
        const rewards = JSON.parseSafe(data[task_id$1].reward);
        if (Object.keys(rewards).length > 0) {
          setTaskRewards$1(rewards[0]);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      if (data) {
        for (const info of data) {
          if (info.activity_id == activityID) {
            const reward = JSON.parse(info.extra_information);
            setRewardInfoList(reward.rewards);
            setEndtime(reward.activity_end_time);
          }
        }
      }
    }));
    gameEventIDList.push(useNetData("player_steam_friend_list", data => {
      libs.batch(() => {
        setLoading(false);
        if (data.state == "success") {
          setUnpublished(false);
          setError(false);
          setOriginalFriendList(data.uids.map(id => steam_64_3(id)));
        } else if (data.state == "unpublished") {
          setUnpublished(true);
        } else if (data.state == "failure") {
          setError(true);
        }
      });
    }, localPlayerID));
    gameEventIDList.push(useNetData("player_basic_datas", data => {
      setProcessedFriendData(data);
    }, localPlayerID));
    gameEventIDList.push(useNetData("new_player_task_progresses", data => {
      setTaskInited(true);
      setTaskProgresses(data[task_id$1.toString()] ?? {});
    }, localPlayerID));
    gameEventIDList.push(useNetData("invition_activity_data", data => {
      setTaskInited(true);
      setActivityProgress(data.progress ?? 0);
      setActivityRewardState(data.rewards);
    }, localPlayerID));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  let searchEntry;
  let friendListRef;
  let superRewardRoot;
  let ActivityMain;
  const receiveTaskReward = (self, uid, type) => {
    if (receiving()) return;
    setReceiving(true);
    serverRequest("activity_task_reward", {
      task_id: task_id$1,
      unique_task_id: `${task_id$1}-${uid}-${type}`
    }, data => {
      setReceiving(false);
      if (data.status == 0) {
        callAction("activity_data", {
          activity_id: activityID
        });
      }
    });
  };
  const friendSortList = libs.createMemo(() => {
    const current_originalFriendList = originalFriendList();
    const current_processedFriendData = processedFriendData();
    const current_taskProgresses = taskProgresses();
    if (taskInited()) {
      const timeS = Math.floor(Date.now() / 1000);
      const isNewPlayer = time => {
        if (time) {
          const diff = Math.floor(Math.abs(time - timeS));
          return Math.floor(diff / 86400) < 3;
        }
        return true;
      };
      return current_originalFriendList.filter(v => {
        if (current_processedFriendData[v]?.first_login_time != undefined) {
          return isNewPlayer(current_processedFriendData[v].first_login_time);
        }
        return true;
      }).sort((a, b) => multiCompare((current_taskProgresses[a]?.receive_progress ?? 0) - (current_taskProgresses[b]?.receive_progress ?? 0), (current_taskProgresses[b]?.progress ?? -1) - (current_taskProgresses[a]?.progress ?? -1), (current_taskProgresses[b]?.type ?? -1) - (current_taskProgresses[a]?.type ?? -1), (current_processedFriendData[b]?.rank_score ?? 999999) - (current_processedFriendData[a]?.rank_score ?? 999999), (current_processedFriendData[b]?.last_login_time ?? 9999999999) - (current_processedFriendData[a]?.last_login_time ?? 9999999999))).map(id => {
        return {
          uid: id,
          name: SteamFriends.RequestPersonaName(steam_3_64(id), undefined).toLowerCase()
        };
      });
    }
    return [];
  });
  const friendFilterList = libs.createMemo(() => {
    const current_filterText = filterText$1().toLowerCase();
    return friendSortList().filter(({
      uid,
      name
    }) => {
      return name.includes(current_filterText);
    }).sort((a, b) => a.name.indexOf(current_filterText) - b.name.indexOf(current_filterText)).map(data => data.uid);
  });
  let pageListPanel;
  const pageMaxCount = 50;
  const [seletedPage, setSeletedPage] = libs.createSignal(1);
  libs.createEffect(libs.on(seletedPage, _ => {
    if (friendListRef?.IsValid()) {
      friendListRef.ScrollToTop();
    }
    if (pageListPanel?.IsValid()) {
      const child = pageListPanel.GetChild(_ - 1);
      if (child?.IsValid()) {
        child.ScrollParentToMakePanelFit(3, false);
      }
    }
  }));
  const pageList = () => [...Array(Math.ceil(friendSortList().length / pageMaxCount))];
  const friendLayoutList = () => {
    const index = (seletedPage() - 1) * 50;
    return friendFilterList().slice(index, index + 50);
  };
  const progressIndex = () => {
    let index = 0;
    const current_rewardInfoList = rewardInfoList();
    const current_progress = activityProgress();
    for (let i = current_rewardInfoList.length - 1; i >= 0; i--) {
      const info = current_rewardInfoList[i];
      if (info.threshold != undefined && current_progress >= info.threshold) {
        index = i + 1;
        break;
      }
    }
    return index;
  };
  libs.createEffect(libs.on(filterText$1, () => {
    setSeletedPage(1);
    if (friendListRef?.IsValid()) {
      friendListRef.ScrollToTop();
    }
  }));
  const maxTaskRewardsCount = 10;
  const taskRewardLimited = () => activityProgress() >= maxTaskRewardsCount;
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    ref(r$) {
      const _ref$ = ActivityMain;
      typeof _ref$ === "function" ? _ref$(r$) : ActivityMain = r$;
    },
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !props.selected
      });
    },
    id: "Activity_NewPlayer",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Activity_NewPlayerMain",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            marginTop: "70px",
            onactivate: () => {
              if (searchEntry?.IsValid()) {
                setFilterText$1(searchEntry.text);
                $.DispatchEvent("DropInputFocus", searchEntry);
              }
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            hittest: false,
            get children() {
              return [libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language$6,
                hittest: false
              }), libs.createComponent(InfoButton.InfoButton, {
                className: language$6,
                info: "#SnowballInfo",
                tooltip: "#newplayer_activity_infodesc"
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityProgressLabels",
                get children() {
                  return [libs.createComponent(EOM_Label.EOM_Label, {
                    className: "ActivityProgressLabel Left",
                    html: true,
                    text: "#activity_invite_progress",
                    get dialogVariables() {
                      return {
                        count: taskCount()
                      };
                    },
                    hittest: false
                  }), libs.createComponent(EOM_Label.EOM_Label, {
                    className: "ActivityProgressLabel Right",
                    html: true,
                    text: "#activity_invite_completed",
                    get dialogVariables() {
                      return {
                        count: activityProgress()
                      };
                    },
                    hittest: false
                  })];
                }
              }), libs.createComponent(libs.Index, {
                get each() {
                  return rewardInfoList();
                },
                children: (data, i) => {
                  const rewardState = () => {
                    if (data().reward_id != undefined) {
                      return activityRewardState()[data().reward_id.toString()] ?? 2;
                    }
                    return 2;
                  };
                  const itemID = () => {
                    return data().rewards?.[0]?.item_id ?? -1;
                  };
                  const count = () => {
                    return data().rewards?.[0]?.amounts ?? 1;
                  };
                  return [libs.createComponent(libs.Show, {
                    when: i != 0,
                    get children() {
                      return libs.createComponent(EOM_Image.EOM_Image, {
                        get className() {
                          return libs.classNames("RewardArrow", "Index_" + i, {
                            HighLight: progressIndex() >= i
                          });
                        }
                      });
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    get className() {
                      return libs.classNames("ProgressRewardButton", "Index_" + i, {
                        HighLight: rewardState() == 0,
                        Received: rewardState() == 1
                      });
                    },
                    get children() {
                      return [libs.createComponent(EOM_Button.EOM_BaseButton, {
                        get enabled() {
                          return rewardState() == 0;
                        },
                        onactivate: () => {
                          callAction("activity_receive", {
                            activity_id: activityID,
                            reward_id: data().reward_id
                          });
                        },
                        get children() {
                          return [libs.createComponent(EOM_Image.EOM_Image, {
                            id: "BG",
                            hittest: false
                          }), libs.createComponent(libs.Switch, {
                            fallback: () => [libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return itemID();
                              }
                            }), libs.createComponent(libs.Show, {
                              get when() {
                                return libs.memo(() => !!count())() && count() > 1;
                              },
                              get children() {
                                return libs.createComponent(GenericPanel.CLabel, {
                                  className: "ProductCount",
                                  get text() {
                                    return "×" + count();
                                  },
                                  hittest: false
                                });
                              }
                            })],
                            get children() {
                              return libs.createComponent(libs.Match, {
                                when: i % 2 == 1,
                                get children() {
                                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                                    className: "ProductImage",
                                    onmouseover: self => {
                                      $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + itemID(), "#" + itemID() + "_description");
                                    },
                                    onmouseout: self => {
                                      $.DispatchEvent("DOTAHideTitleTextTooltip", self);
                                    }
                                  });
                                }
                              });
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Image.EOM_Image, {
                        id: "RewardReceived",
                        hittest: false
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "Mask",
                        hittest: false,
                        get children() {
                          return libs.createComponent(GenericPanel.CLabel, {
                            text: `#activity_invite_progress_count`,
                            get dialogVariables() {
                              return {
                                count: data().threshold ?? -1
                              };
                            },
                            hittest: false
                          });
                        }
                      })];
                    }
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardsContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "SearchBlock",
                get children() {
                  return (() => {
                    return (() => {
                      const _el$ = libs.createElement("Panel", {}, null);
                      libs.setProp(_el$, "className", "Activity_SearchBox");
                      libs.insert(_el$, libs.createComponent(Player.EOM_TextEntry, {
                        ref(r$) {
                          const _ref$3 = searchEntry;
                          typeof _ref$3 === "function" ? _ref$3(r$) : searchEntry = r$;
                        },
                        placeholder: "#DOTA_Search",
                        onChange: self => {},
                        oninputsubmit: self => {
                          setFilterText$1(self.text);
                        }
                      }), null);
                      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
                        id: "SearchButton",
                        onactivate: () => {
                          if (searchEntry?.IsValid()) {
                            setFilterText$1(searchEntry.text);
                            $.DispatchEvent("DropInputFocus", searchEntry);
                          }
                        }
                      }), null);
                      return _el$;
                    })();
                  })();
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return !loading();
                },
                fallback: () => libs.createComponent(EOM_Loading.EOM_Loading, {
                  align: "center center",
                  type: "PointSpin"
                }),
                get children() {
                  return libs.createComponent(libs.Switch, {
                    fallback: () => [libs.createComponent(EOM_Panel.EOM_Panel, {
                      ref(r$) {
                        const _ref$4 = friendListRef;
                        typeof _ref$4 === "function" ? _ref$4(r$) : friendListRef = r$;
                      },
                      id: "FriendList",
                      scroll: "y",
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return friendLayoutList();
                          },
                          children: (uid, index) => {
                            const task_info = () => {
                              if (taskProgresses()[uid()]) {
                                return taskProgresses()[uid()];
                              }
                            };
                            const user_info = () => {
                              return processedFriendData()[uid()] ?? {
                                uid: Number(uid())
                              };
                            };
                            return libs.createComponent(NewPlayerInfo$1, {
                              activity_id: activityID,
                              get task_limited() {
                                return taskRewardLimited();
                              },
                              get uid() {
                                return uid();
                              },
                              get user_info() {
                                return user_info();
                              },
                              get task_info() {
                                return task_info();
                              },
                              onReceiveTaskReward: (self, uid, type) => receiveTaskReward(self, uid, type)
                            });
                          }
                        });
                      }
                    }), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "PageContainer",
                      get children() {
                        return [libs.createComponent(libs.Show, {
                          get when() {
                            return pageList().length > 1;
                          },
                          get children() {
                            return libs.createComponent(EOM_Button.EOM_BaseButton, {
                              id: "LeftPage",
                              get className() {
                                return libs.classNames("ActivityPageButton", {});
                              },
                              get enabled() {
                                return seletedPage() != 1;
                              },
                              onactivate: self => setSeletedPage(v => v - 1),
                              get children() {
                                return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "pageBg"
                                }), libs.createComponent(GenericPanel.CLabel, {
                                  text: "<"
                                })];
                              }
                            });
                          }
                        }), libs.createComponent(EOM_Panel.EOM_Panel, {
                          ref(r$) {
                            const _ref$5 = pageListPanel;
                            typeof _ref$5 === "function" ? _ref$5(r$) : pageListPanel = r$;
                          },
                          id: "PageList",
                          scroll: "x",
                          get children() {
                            return libs.createComponent(libs.For, {
                              get each() {
                                return pageList();
                              },
                              children: (_, i) => {
                                const page = () => i() + 1;
                                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                  get className() {
                                    return libs.classNames("ActivityPageButton", {
                                      Selected: seletedPage() == page()
                                    });
                                  },
                                  get enabled() {
                                    return libs.memo(() => seletedPage() != page())() && friendFilterList().length > i() * pageMaxCount;
                                  },
                                  onactivate: self => setSeletedPage(page()),
                                  get children() {
                                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                      id: "pageBg"
                                    }), libs.createComponent(GenericPanel.CLabel, {
                                      get text() {
                                        return page();
                                      }
                                    })];
                                  }
                                });
                              }
                            });
                          }
                        }), libs.createComponent(libs.Show, {
                          get when() {
                            return pageList().length > 1;
                          },
                          get children() {
                            return libs.createComponent(EOM_Button.EOM_BaseButton, {
                              id: "RightPage",
                              get className() {
                                return libs.classNames("ActivityPageButton", {});
                              },
                              get enabled() {
                                return libs.memo(() => seletedPage() != pageList().length)() && friendFilterList().length > seletedPage() * pageMaxCount;
                              },
                              onactivate: self => setSeletedPage(v => v + 1),
                              get children() {
                                return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "pageBg"
                                }), libs.createComponent(GenericPanel.CLabel, {
                                  text: ">"
                                })];
                              }
                            });
                          }
                        })];
                      }
                    })],
                    get children() {
                      return [libs.createComponent(libs.Match, {
                        get when() {
                          return error();
                        },
                        get children() {
                          return libs.createComponent(EOM_Button.EOM_BaseButton, {
                            align: "center center",
                            padding: "6px",
                            onactivate: () => {
                              setLoading(true);
                              setUnpublished(false);
                              setError(false);
                              GameEvents.SendCustomEventToServer("get_steam_friend_list", {});
                            },
                            get children() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "FriendListLabel",
                                textDecoration: "underline",
                                text: "#Steam_RequestFailure"
                              });
                            }
                          });
                        }
                      }), libs.createComponent(libs.Match, {
                        get when() {
                          return unpublished();
                        },
                        get children() {
                          return libs.createComponent(EOM_Button.EOM_BaseButton, {
                            align: "center center",
                            padding: "6px",
                            onactivate: () => {
                              $.DispatchEvent("BrowserGoToURL", "https://steamcommunity.com/id/" + Game.GetPlayerInfo(localPlayerID).player_steamid + "/edit/settings");
                            },
                            get children() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "FriendListLabel",
                                textDecoration: "underline",
                                text: "#Steam_NotPublishProfile"
                              });
                            }
                          });
                        }
                      }), libs.createComponent(libs.Match, {
                        get when() {
                          return friendLayoutList().length == 0;
                        },
                        get children() {
                          return [libs.createComponent(EOM_Icon.EOM_Icon, {
                            y: "-50px",
                            width: "350px",
                            height: "350px",
                            align: "center center",
                            get src() {
                              return getSrcPath("activity/new_player/h4_icon_01.png");
                            }
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            className: "FriendListLabel",
                            y: "-50px",
                            align: "center top",
                            marginTop: "570px",
                            text: "#Activity_NewPlayerNullList",
                            html: true
                          })];
                        }
                      })];
                    }
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        ref(r$) {
          const _ref$2 = superRewardRoot;
          typeof _ref$2 === "function" ? _ref$2(r$) : superRewardRoot = r$;
        },
        id: "SuperRewardRoot",
        onload: self => {
          self.hittest = false;
        },
        onactivate: self => {
          if (LoadData(self, "Closing")) return;
          let p = self.FindChildTraverse("SuperReward");
          if (p?.IsValid()) {
            p.SetHasClass("PopupOut", true);
            SaveData(self, "Closing", 1);
            self.SetHasClass("ShowReward", false);
            $.Schedule(0.4, () => {
              if (self?.IsValid()) {
                SaveData(self, "Closing", undefined);
                self.hittest = false;
                self.RemoveAndDeleteChildren();
              }
            });
          } else {
            self.RemoveAndDeleteChildren();
          }
        }
      })];
    }
  });
};
const NewPlayerInfo$1 = props => {
  const uid = () => props.uid;
  const steamid = () => {
    let result = steam_3_64(uid());
    return result;
  };
  const last_login_time = () => props.user_info?.last_login_time;
  const rank_score = () => {
    if (props.user_info?.first_login_time != undefined) {
      return props.user_info?.rank_score ?? 0;
    }
  };
  const RankTitleText = () => {
    const current_rank_score = rank_score();
    if (current_rank_score == undefined) return "";
    let {
      tier,
      num
    } = getRankInfo(current_rank_score);
    if (tier == 8) {
      return $.Localize(`#RankTitle_${tier}`);
    }
    return $.Localize(`#RankTitle_${tier}`) + num;
  };
  const countDownText = () => {
    if (!last_login_time()) return "#LastLoginDayTime";
    const current_last_login_time = last_login_time();
    const diff = Math.floor(Math.abs(current_last_login_time - Date.now() / 1000));
    const days = Math.max(0, Math.floor(diff / 86400));
    if (days > 0) {
      return "#LastLoginDayTime";
    }
    return "#LastLoginHourTime";
  };
  const isNewPlayer = () => {
    let time = props.user_info?.first_login_time;
    if (time) {
      const diff = Math.floor(Math.abs(time - Date.now() / 1000));
      return Math.floor(diff / 86400) < 3;
    }
    return true;
  };
  const taskProgress = () => {
    if (props.task_info) {
      return props.task_info?.progress ?? 0;
    }
  };
  const receiveRewards = () => {
    if (props.task_info) {
      return props.task_info.receive_progress == 1;
    }
    return false;
  };
  const taskCompleted = () => typeof taskProgress() == "number" && taskProgress() >= taskTarget$1();
  const taskTypeText = () => {
    return (props.task_info?.type ?? 0) == 1 ? "#HasInvited" : "#WasInvited";
  };
  const avatarBorder = () => props.user_info.oid ?? 5710000;
  return (() => {
    const _el$2 = libs.createElement("Panel", {}, null);
    libs.insert(_el$2, libs.createComponent(Player.PlayerAvatar, {
      get steamID() {
        return uid();
      },
      get avatar_border() {
        return avatarBorder();
      },
      dota2tooltip: true
    }), null);
    libs.insert(_el$2, libs.createComponent(Player.EOM_UserName, {
      get steamid() {
        return steamid();
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "RankContainer",
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return rank_score() != undefined;
          },
          fallback: () => libs.createComponent(EOM_Label.EOM_Label, {
            className: "NewPlayer",
            text: "#NewPlayer"
          }),
          get children() {
            return [libs.createComponent(RankTierIcon.RankTierIcon, {
              size: "64",
              get rank_score() {
                return rank_score();
              }
            }), libs.createComponent(EOM_Label.EOM_Label, {
              get text() {
                return RankTitleText();
              }
            })];
          }
        });
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return receiveRewards() || !props.task_limited;
      },
      get children() {
        return libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "TaskRewards",
          get children() {
            return libs.createComponent(libs.Index, {
              get each() {
                return taskRewardList$1();
              },
              children: (item_id, index) => {
                const amounts = () => taskRewards$1()[item_id()] ?? 1;
                return libs.createComponent(ActivityInviteReward$1, {
                  get className() {
                    return libs.classNames({
                      Received: receiveRewards()
                    });
                  },
                  rarity: 0,
                  get itemId() {
                    return item_id();
                  },
                  get amounts() {
                    return amounts();
                  }
                });
              }
            });
          }
        });
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "RightContainer",
      get children() {
        return [libs.createComponent(libs.Show, {
          get when() {
            return last_login_time() != undefined;
          },
          fallback: () => libs.createComponent(EOM_Label.EOM_Label, {
            id: "NotLastLogin",
            text: "#NewPlayer"
          }),
          get children() {
            return libs.createComponent(EOM_Countdown.EOM_Countdown, {
              get text() {
                return countDownText();
              },
              limitTime: {
                day: 30
              },
              get endTime() {
                return last_login_time();
              },
              onlyCoundown: false
            });
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          get className() {
            return libs.classNames("ButtonContainer", {
              tasking: taskProgress() != undefined && !taskCompleted()
            });
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return taskProgress() == undefined;
              },
              fallback: () => libs.createComponent(libs.Show, {
                get when() {
                  return taskCompleted();
                },
                fallback: () => [libs.createComponent(EOM_Label.EOM_Label, {
                  id: "taskType",
                  get text() {
                    return taskTypeText();
                  }
                }), libs.createComponent(EOM_Label.EOM_Label, {
                  id: "taskProgress",
                  get text() {
                    return $.Localize("#" + task_id$1) + ": <font color='#49E399'>" + taskProgress() + "/" + taskTarget$1() + "</font>";
                  },
                  html: true
                })],
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    className: "Reward",
                    get enabled() {
                      return libs.memo(() => !!taskCompleted())() && !receiveRewards();
                    },
                    onactivate: self => {
                      props.onReceiveTaskReward(self, uid(), props.task_info?.type ?? 0);
                    },
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        get text() {
                          return receiveRewards() ? "#activity_receive" : "#mail_action_receive";
                        }
                      });
                    }
                  });
                }
              }),
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  className: "Invite",
                  get enabled() {
                    return isNewPlayer();
                  },
                  onactivate: self => {
                    inviteFriend$1(Number(uid()), props.activity_id);
                  },
                  get children() {
                    return libs.createComponent(GenericPanel.CLabel, {
                      text: "#InviteFriend"
                    });
                  }
                });
              }
            });
          }
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$2, "className", libs.classNames("NewPlayerInfo", {
      Hidden: false
    }), _$p));
    return _el$2;
  })();
};
const ActivityInviteReward$1 = props => {
  const [local, others] = libs.splitProps(props, ["children", "itemId", "amounts", "rarity"]);
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
    className: "ActivityInviteReward"
  }), {
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("ActivityInviteRewardBG", "Rarity" + local.rarity);
        },
        get children() {
          return libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return local.itemId;
            },
            get count() {
              return local.amounts;
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Light"
      })];
    }
  }));
};

const language$5 = $.Language().toLowerCase();
const [filterText, setFilterText] = libs.createSignal("");
const [taskTarget, setTaskTarget] = libs.createSignal(3);
const [taskRewards, setTaskRewards] = libs.createSignal({});
const taskRewardList = () => Object.keys(taskRewards());
const [cooldown, setCooldown] = libs.createSignal(false);
const inviteFriend = (uid, activityID) => {
  if (cooldown()) return;
  setCooldown(true);
  $.Schedule(0.4, () => setCooldown(false));
  serverRequest("activity_invition", {
    target_uid: uid,
    activity_id: activityID
  }, data => {
    if (data.status == 0) {
      showPopup("NewPlayerInvited", {
        uid
      });
    }
  });
};
let task_id = 1002002;
const Activity_NewPlayer2 = props => {
  const activityID = props.activity_id;
  const localPlayerID = Players.GetLocalPlayer();
  const [receiving, setReceiving] = libs.createSignal(false);
  const [endtime, setEndtime] = libs.createSignal(0);
  const [unpublished, setUnpublished] = libs.createSignal(false);
  const [loading, setLoading] = libs.createSignal(false);
  const [error, setError] = libs.createSignal(false);
  const [originalFriendList, setOriginalFriendList] = libs.createSignal([]);
  const [processedFriendData, setProcessedFriendData] = libs.createSignal({});
  const [taskProgresses, setTaskProgresses] = libs.createSignal({});
  const [activityProgress, setActivityProgress] = libs.createSignal(0);
  const [activityRewardState, setActivityRewardState] = libs.createSignal({});
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const taskCount = () => {
    return Object.keys(taskProgresses()).length;
  };
  const [taskInited, setTaskInited] = libs.createSignal(false);
  let inited = false;
  libs.createEffect(libs.on(() => props.selected, _selected => {
    if (!_selected) return;
    if (inited) return;
    inited = true;
    setLoading(true);
    setUnpublished(false);
    setError(false);
    GameEvents.SendCustomEventToServer("get_steam_friend_list", {});
  }));
  libs.onMount(() => {
    const gameEventIDList = [];
    gameEventIDList.push(useNetData("info_activity_task", data => {
      if (data[task_id] && Number(data[task_id]?.target)) {
        setTaskTarget(Number(data[task_id].target));
        const rewards = JSON.parseSafe(data[task_id].reward);
        if (Object.keys(rewards).length > 0) {
          setTaskRewards(rewards[0]);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      if (data) {
        for (const info of data) {
          if (info.activity_id == activityID) {
            const reward = JSON.parseSafe(info.extra_information);
            if (reward && Array.isArray(reward.rewards)) {
              setRewardInfoList(reward.rewards);
            } else {
              $.Msg("[new_player2] invalid extra_information", info.extra_information);
              setRewardInfoList([]);
            }
            setEndtime(info.end_time);
          }
        }
      }
    }));
    gameEventIDList.push(useNetData("player_steam_friend_list", data => {
      libs.batch(() => {
        setLoading(false);
        if (data.state == "success") {
          setUnpublished(false);
          setError(false);
          setOriginalFriendList(data.uids.map(id => steam_64_3(id)));
        } else if (data.state == "unpublished") {
          setUnpublished(true);
        } else if (data.state == "failure") {
          setError(true);
        }
      });
    }, localPlayerID));
    gameEventIDList.push(useNetData("player_basic_datas", data => {
      setProcessedFriendData(data);
    }, localPlayerID));
    gameEventIDList.push(useNetData("new_player_task_progresses", data => {
      setTaskInited(true);
      setTaskProgresses(data[task_id.toString()] ?? {});
    }, localPlayerID));
    gameEventIDList.push(useNetData("invition_activity_data", data => {
      setTaskInited(true);
      setActivityProgress(data.progress ?? 0);
      setActivityRewardState(data.rewards);
    }, localPlayerID));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  let searchEntry;
  let friendListRef;
  let superRewardRoot;
  let ActivityMain;
  const receiveTaskReward = (self, uid, type) => {
    if (receiving()) return;
    setReceiving(true);
    serverRequest("activity_task_reward", {
      task_id: task_id,
      unique_task_id: `${task_id}-${uid}-${type}`
    }, data => {
      setReceiving(false);
      if (data.status == 0) {
        callAction("activity_data", {
          activity_id: activityID
        });
      }
    });
  };
  const friendSortList = libs.createMemo(() => {
    const current_originalFriendList = originalFriendList();
    const current_processedFriendData = processedFriendData();
    const current_taskProgresses = taskProgresses();
    if (taskInited()) {
      const timeS = Math.floor(Date.now() / 1000);
      const isNewPlayer = time => {
        if (time) {
          const diff = Math.floor(Math.abs(time - timeS));
          return Math.floor(diff / 86400) < 3;
        }
        return true;
      };
      return current_originalFriendList.filter(v => {
        if (current_processedFriendData[v]?.first_login_time != undefined) {
          return isNewPlayer(current_processedFriendData[v].first_login_time);
        }
        return true;
      }).sort((a, b) => multiCompare((current_taskProgresses[a]?.receive_progress ?? 0) - (current_taskProgresses[b]?.receive_progress ?? 0), (current_taskProgresses[b]?.progress ?? -1) - (current_taskProgresses[a]?.progress ?? -1), (current_taskProgresses[b]?.type ?? -1) - (current_taskProgresses[a]?.type ?? -1), (current_processedFriendData[b]?.rank_score ?? 999999) - (current_processedFriendData[a]?.rank_score ?? 999999), (current_processedFriendData[b]?.last_login_time ?? 9999999999) - (current_processedFriendData[a]?.last_login_time ?? 9999999999))).map(id => {
        return {
          uid: id,
          name: SteamFriends.RequestPersonaName(steam_3_64(id), undefined).toLowerCase()
        };
      });
    }
    return [];
  });
  const friendFilterList = libs.createMemo(() => {
    const current_filterText = filterText().toLowerCase();
    return friendSortList().filter(({
      uid,
      name
    }) => {
      return name.includes(current_filterText);
    }).sort((a, b) => a.name.indexOf(current_filterText) - b.name.indexOf(current_filterText)).map(data => data.uid);
  });
  let pageListPanel;
  const pageMaxCount = 50;
  const [seletedPage, setSeletedPage] = libs.createSignal(1);
  libs.createEffect(libs.on(seletedPage, _ => {
    if (friendListRef?.IsValid()) {
      friendListRef.ScrollToTop();
    }
    if (pageListPanel?.IsValid()) {
      const child = pageListPanel.GetChild(_ - 1);
      if (child?.IsValid()) {
        child.ScrollParentToMakePanelFit(3, false);
      }
    }
  }));
  const pageList = () => [...Array(Math.ceil(friendSortList().length / pageMaxCount))];
  const friendLayoutList = () => {
    const index = (seletedPage() - 1) * 50;
    return friendFilterList().slice(index, index + 50);
  };
  const progressIndex = () => {
    let index = 0;
    const current_rewardInfoList = rewardInfoList();
    const current_progress = activityProgress();
    for (let i = current_rewardInfoList.length - 1; i >= 0; i--) {
      const info = current_rewardInfoList[i];
      if (info.threshold != undefined && current_progress >= info.threshold) {
        index = i + 1;
        break;
      }
    }
    return index;
  };
  libs.createEffect(libs.on(filterText, () => {
    setSeletedPage(1);
    if (friendListRef?.IsValid()) {
      friendListRef.ScrollToTop();
    }
  }));
  const maxTaskRewardsCount = 10;
  const taskRewardLimited = () => activityProgress() >= maxTaskRewardsCount;
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    ref(r$) {
      const _ref$ = ActivityMain;
      typeof _ref$ === "function" ? _ref$(r$) : ActivityMain = r$;
    },
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !props.selected
      });
    },
    id: "Activity_NewPlayer2",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Activity_NewPlayerMain",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            marginTop: "70px",
            onactivate: () => {
              if (searchEntry?.IsValid()) {
                setFilterText(searchEntry.text);
                $.DispatchEvent("DropInputFocus", searchEntry);
              }
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "LeftContainer",
            hittest: false,
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "ActivityTitle",
                    className: language$5,
                    hittest: false
                  }), libs.createComponent(InfoButton.InfoButton, {
                    className: language$5,
                    info: "#SnowballInfo",
                    tooltip: "#newplayer_activity_infodesc"
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "BGLayer",
                hittest: false,
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "ActivityCountdown",
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        align: "center center",
                        flowChildren: "right",
                        get children() {
                          return [libs.createComponent(EOM_Image.EOM_Image, {
                            id: "timeIcon",
                            get backgroundImage() {
                              return getImagePath("activity/dragonboat/s12_icon_01.png");
                            }
                          }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                            get endTime() {
                              return endtime();
                            },
                            text: "#countdown_time"
                          })];
                        }
                      });
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "ActivityProgressLabels",
                    get children() {
                      return [libs.createComponent(EOM_Label.EOM_Label, {
                        className: "ActivityProgressLabel Left",
                        html: true,
                        text: "#activity_invite_progress",
                        get dialogVariables() {
                          return {
                            count: taskCount()
                          };
                        },
                        hittest: false
                      }), libs.createComponent(EOM_Label.EOM_Label, {
                        className: "ActivityProgressLabel Right",
                        html: true,
                        text: "#activity_invite_completed",
                        get dialogVariables() {
                          return {
                            count: activityProgress()
                          };
                        },
                        hittest: false
                      })];
                    }
                  }), libs.createComponent(libs.Index, {
                    get each() {
                      return rewardInfoList();
                    },
                    children: (data, i) => {
                      const rewardState = () => {
                        if (data().reward_id != undefined) {
                          return activityRewardState()[data().reward_id.toString()] ?? 2;
                        }
                        return 2;
                      };
                      const itemID = () => {
                        return data().rewards?.[0]?.item_id ?? -1;
                      };
                      const count = () => {
                        return data().rewards?.[0]?.amounts ?? 1;
                      };
                      return [libs.createComponent(libs.Show, {
                        when: i != 0,
                        get children() {
                          return libs.createComponent(EOM_Image.EOM_Image, {
                            get className() {
                              return libs.classNames("RewardArrow", "Index_" + i, {
                                HighLight: progressIndex() >= i
                              });
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        get className() {
                          return libs.classNames("ProgressRewardButton", "Index_" + i, {
                            HighLight: rewardState() == 0,
                            Received: rewardState() == 1
                          });
                        },
                        get children() {
                          return [libs.createComponent(EOM_Button.EOM_BaseButton, {
                            get enabled() {
                              return rewardState() == 0;
                            },
                            onactivate: () => {
                              callAction("activity_receive", {
                                activity_id: activityID,
                                reward_id: data().reward_id
                              });
                            },
                            get children() {
                              return [libs.createComponent(EOM_Image.EOM_Image, {
                                id: "BG",
                                hittest: false
                              }), libs.createComponent(ProductImage.ProductImage, {
                                get itemid() {
                                  return itemID();
                                }
                              }), libs.createComponent(libs.Show, {
                                get when() {
                                  return libs.memo(() => !!count())() && count() > 1;
                                },
                                get children() {
                                  return libs.createComponent(GenericPanel.CLabel, {
                                    className: "ProductCount",
                                    get text() {
                                      return "×" + count();
                                    },
                                    hittest: false
                                  });
                                }
                              })];
                            }
                          }), libs.createComponent(EOM_Image.EOM_Image, {
                            id: "RewardReceived",
                            hittest: false
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "Mask",
                            hittest: false,
                            get children() {
                              return libs.createComponent(GenericPanel.CLabel, {
                                text: `#activity_invite_progress_count`,
                                get dialogVariables() {
                                  return {
                                    count: data().threshold ?? -1
                                  };
                                },
                                hittest: false
                              });
                            }
                          })];
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "LinkActivityJumpButton",
                    onactivate: () => {
                      clientSideEvent("switchActivityTag", {
                        id: "Activity_DragonBoat"
                      });
                    },
                    get children() {
                      return libs.createElement("Label", {
                        text: "#Activity_NewPlayer2_Jump"
                      }, null);
                    }
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardsContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "SearchBlock",
                get children() {
                  return (() => {
                    return (() => {
                      const _el$2 = libs.createElement("Panel", {}, null);
                      libs.setProp(_el$2, "className", "Activity_SearchBox");
                      libs.insert(_el$2, libs.createComponent(Player.EOM_TextEntry, {
                        ref(r$) {
                          const _ref$3 = searchEntry;
                          typeof _ref$3 === "function" ? _ref$3(r$) : searchEntry = r$;
                        },
                        placeholder: "#DOTA_Search",
                        onChange: self => {},
                        oninputsubmit: self => {
                          setFilterText(self.text);
                        }
                      }), null);
                      libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_BaseButton, {
                        id: "SearchButton",
                        onactivate: () => {
                          if (searchEntry?.IsValid()) {
                            setFilterText(searchEntry.text);
                            $.DispatchEvent("DropInputFocus", searchEntry);
                          }
                        }
                      }), null);
                      return _el$2;
                    })();
                  })();
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return !loading();
                },
                fallback: () => libs.createComponent(EOM_Loading.EOM_Loading, {
                  align: "center center",
                  type: "PointSpin"
                }),
                get children() {
                  return libs.createComponent(libs.Switch, {
                    fallback: () => [libs.createComponent(EOM_Panel.EOM_Panel, {
                      ref(r$) {
                        const _ref$4 = friendListRef;
                        typeof _ref$4 === "function" ? _ref$4(r$) : friendListRef = r$;
                      },
                      id: "FriendList",
                      scroll: "y",
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return friendLayoutList();
                          },
                          children: (uid, index) => {
                            const task_info = () => {
                              if (taskProgresses()[uid()]) {
                                return taskProgresses()[uid()];
                              }
                            };
                            const user_info = () => {
                              return processedFriendData()[uid()] ?? {
                                uid: Number(uid())
                              };
                            };
                            return libs.createComponent(NewPlayerInfo, {
                              activity_id: activityID,
                              get task_limited() {
                                return taskRewardLimited();
                              },
                              get uid() {
                                return uid();
                              },
                              get user_info() {
                                return user_info();
                              },
                              get task_info() {
                                return task_info();
                              },
                              onReceiveTaskReward: (self, uid, type) => receiveTaskReward(self, uid, type)
                            });
                          }
                        });
                      }
                    }), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "PageContainer",
                      get children() {
                        return [libs.createComponent(libs.Show, {
                          get when() {
                            return pageList().length > 1;
                          },
                          get children() {
                            return libs.createComponent(EOM_Button.EOM_BaseButton, {
                              id: "LeftPage",
                              get className() {
                                return libs.classNames("ActivityPageButton", {});
                              },
                              get enabled() {
                                return seletedPage() != 1;
                              },
                              onactivate: self => setSeletedPage(v => v - 1),
                              get children() {
                                return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "pageBg"
                                }), libs.createComponent(GenericPanel.CLabel, {
                                  text: "<"
                                })];
                              }
                            });
                          }
                        }), libs.createComponent(EOM_Panel.EOM_Panel, {
                          ref(r$) {
                            const _ref$5 = pageListPanel;
                            typeof _ref$5 === "function" ? _ref$5(r$) : pageListPanel = r$;
                          },
                          id: "PageList",
                          scroll: "x",
                          get children() {
                            return libs.createComponent(libs.For, {
                              get each() {
                                return pageList();
                              },
                              children: (_, i) => {
                                const page = () => i() + 1;
                                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                  get className() {
                                    return libs.classNames("ActivityPageButton", {
                                      Selected: seletedPage() == page()
                                    });
                                  },
                                  get enabled() {
                                    return libs.memo(() => seletedPage() != page())() && friendFilterList().length > i() * pageMaxCount;
                                  },
                                  onactivate: self => setSeletedPage(page()),
                                  get children() {
                                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                      id: "pageBg"
                                    }), libs.createComponent(GenericPanel.CLabel, {
                                      get text() {
                                        return page();
                                      }
                                    })];
                                  }
                                });
                              }
                            });
                          }
                        }), libs.createComponent(libs.Show, {
                          get when() {
                            return pageList().length > 1;
                          },
                          get children() {
                            return libs.createComponent(EOM_Button.EOM_BaseButton, {
                              id: "RightPage",
                              get className() {
                                return libs.classNames("ActivityPageButton", {});
                              },
                              get enabled() {
                                return libs.memo(() => seletedPage() != pageList().length)() && friendFilterList().length > seletedPage() * pageMaxCount;
                              },
                              onactivate: self => setSeletedPage(v => v + 1),
                              get children() {
                                return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "pageBg"
                                }), libs.createComponent(GenericPanel.CLabel, {
                                  text: ">"
                                })];
                              }
                            });
                          }
                        })];
                      }
                    })],
                    get children() {
                      return [libs.createComponent(libs.Match, {
                        get when() {
                          return error();
                        },
                        get children() {
                          return libs.createComponent(EOM_Button.EOM_BaseButton, {
                            align: "center center",
                            padding: "6px",
                            onactivate: () => {
                              setLoading(true);
                              setUnpublished(false);
                              setError(false);
                              GameEvents.SendCustomEventToServer("get_steam_friend_list", {});
                            },
                            get children() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "FriendListLabel",
                                textDecoration: "underline",
                                text: "#Steam_RequestFailure"
                              });
                            }
                          });
                        }
                      }), libs.createComponent(libs.Match, {
                        get when() {
                          return unpublished();
                        },
                        get children() {
                          return libs.createComponent(EOM_Button.EOM_BaseButton, {
                            align: "center center",
                            padding: "6px",
                            onactivate: () => {
                              $.DispatchEvent("BrowserGoToURL", "https://steamcommunity.com/id/" + Game.GetPlayerInfo(localPlayerID).player_steamid + "/edit/settings");
                            },
                            get children() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "FriendListLabel",
                                textDecoration: "underline",
                                text: "#Steam_NotPublishProfile"
                              });
                            }
                          });
                        }
                      }), libs.createComponent(libs.Match, {
                        get when() {
                          return friendLayoutList().length == 0;
                        },
                        get children() {
                          return [libs.createComponent(EOM_Icon.EOM_Icon, {
                            y: "-50px",
                            width: "350px",
                            height: "350px",
                            align: "center center",
                            get src() {
                              return getSrcPath("activity/new_player/h4_icon_01.png");
                            }
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            className: "FriendListLabel",
                            y: "-50px",
                            align: "center top",
                            marginTop: "570px",
                            text: "#Activity_NewPlayerNullList",
                            html: true
                          })];
                        }
                      })];
                    }
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        ref(r$) {
          const _ref$2 = superRewardRoot;
          typeof _ref$2 === "function" ? _ref$2(r$) : superRewardRoot = r$;
        },
        id: "SuperRewardRoot",
        onload: self => {
          self.hittest = false;
        },
        onactivate: self => {
          if (LoadData(self, "Closing")) return;
          let p = self.FindChildTraverse("SuperReward");
          if (p?.IsValid()) {
            p.SetHasClass("PopupOut", true);
            SaveData(self, "Closing", 1);
            self.SetHasClass("ShowReward", false);
            $.Schedule(0.4, () => {
              if (self?.IsValid()) {
                SaveData(self, "Closing", undefined);
                self.hittest = false;
                self.RemoveAndDeleteChildren();
              }
            });
          } else {
            self.RemoveAndDeleteChildren();
          }
        }
      })];
    }
  });
};
const NewPlayerInfo = props => {
  const uid = () => props.uid;
  const steamid = () => {
    let result = steam_3_64(uid());
    return result;
  };
  const last_login_time = () => props.user_info?.last_login_time;
  const rank_score = () => {
    if (props.user_info?.first_login_time != undefined) {
      return props.user_info?.rank_score ?? 0;
    }
  };
  const RankTitleText = () => {
    const current_rank_score = rank_score();
    if (current_rank_score == undefined) return "";
    let {
      tier,
      num
    } = getRankInfo(current_rank_score);
    if (tier == 8) {
      return $.Localize(`#RankTitle_${tier}`);
    }
    return $.Localize(`#RankTitle_${tier}`) + num;
  };
  const countDownText = () => {
    if (!last_login_time()) return "#LastLoginDayTime";
    const current_last_login_time = last_login_time();
    const diff = Math.floor(Math.abs(current_last_login_time - Date.now() / 1000));
    const days = Math.max(0, Math.floor(diff / 86400));
    if (days > 0) {
      return "#LastLoginDayTime";
    }
    return "#LastLoginHourTime";
  };
  const isNewPlayer = () => {
    let time = props.user_info?.first_login_time;
    if (time) {
      const diff = Math.floor(Math.abs(time - Date.now() / 1000));
      return Math.floor(diff / 86400) < 3;
    }
    return true;
  };
  const taskProgress = () => {
    if (props.task_info) {
      return props.task_info?.progress ?? 0;
    }
  };
  const receiveRewards = () => {
    if (props.task_info) {
      return props.task_info.receive_progress == 1;
    }
    return false;
  };
  const taskCompleted = () => typeof taskProgress() == "number" && taskProgress() >= taskTarget();
  const taskTypeText = () => {
    return (props.task_info?.type ?? 0) == 1 ? "#HasInvited" : "#WasInvited";
  };
  const avatarBorder = () => props.user_info.oid ?? 5710000;
  return (() => {
    const _el$3 = libs.createElement("Panel", {}, null);
    libs.insert(_el$3, libs.createComponent(Player.PlayerAvatar, {
      get steamID() {
        return uid();
      },
      get avatar_border() {
        return avatarBorder();
      },
      dota2tooltip: true
    }), null);
    libs.insert(_el$3, libs.createComponent(Player.EOM_UserName, {
      get steamid() {
        return steamid();
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "RankContainer",
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return rank_score() != undefined;
          },
          fallback: () => libs.createComponent(EOM_Label.EOM_Label, {
            className: "NewPlayer",
            text: "#NewPlayer"
          }),
          get children() {
            return [libs.createComponent(RankTierIcon.RankTierIcon, {
              size: "64",
              get rank_score() {
                return rank_score();
              }
            }), libs.createComponent(EOM_Label.EOM_Label, {
              get text() {
                return RankTitleText();
              }
            })];
          }
        });
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return receiveRewards() || !props.task_limited;
      },
      get children() {
        return libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "TaskRewards",
          get children() {
            return libs.createComponent(libs.Index, {
              get each() {
                return taskRewardList();
              },
              children: (item_id, index) => {
                const amounts = () => taskRewards()[item_id()] ?? 1;
                return libs.createComponent(ActivityInviteReward, {
                  get className() {
                    return libs.classNames({
                      Received: receiveRewards()
                    });
                  },
                  rarity: 0,
                  get itemId() {
                    return item_id();
                  },
                  get amounts() {
                    return amounts();
                  }
                });
              }
            });
          }
        });
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "RightContainer",
      get children() {
        return [libs.createComponent(libs.Show, {
          get when() {
            return last_login_time() != undefined;
          },
          fallback: () => libs.createComponent(EOM_Label.EOM_Label, {
            id: "NotLastLogin",
            text: "#NewPlayer"
          }),
          get children() {
            return libs.createComponent(EOM_Countdown.EOM_Countdown, {
              get text() {
                return countDownText();
              },
              limitTime: {
                day: 30
              },
              get endTime() {
                return last_login_time();
              },
              onlyCoundown: false
            });
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          get className() {
            return libs.classNames("ButtonContainer", {
              tasking: taskProgress() != undefined && !taskCompleted()
            });
          },
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return taskProgress() == undefined;
              },
              fallback: () => libs.createComponent(libs.Show, {
                get when() {
                  return taskCompleted();
                },
                fallback: () => [libs.createComponent(EOM_Label.EOM_Label, {
                  id: "taskType",
                  get text() {
                    return taskTypeText();
                  }
                }), libs.createComponent(EOM_Label.EOM_Label, {
                  id: "taskProgress",
                  get text() {
                    return $.Localize("#" + task_id) + ": <font color='#49E399'>" + taskProgress() + "/" + taskTarget() + "</font>";
                  },
                  html: true
                })],
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    className: "Reward",
                    get enabled() {
                      return libs.memo(() => !!taskCompleted())() && !receiveRewards();
                    },
                    onactivate: self => {
                      props.onReceiveTaskReward(self, uid(), props.task_info?.type ?? 0);
                    },
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        get text() {
                          return receiveRewards() ? "#activity_receive" : "#mail_action_receive";
                        }
                      });
                    }
                  });
                }
              }),
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  className: "Invite",
                  get enabled() {
                    return isNewPlayer();
                  },
                  onactivate: self => {
                    inviteFriend(Number(uid()), props.activity_id);
                  },
                  get children() {
                    return libs.createComponent(GenericPanel.CLabel, {
                      text: "#InviteFriend"
                    });
                  }
                });
              }
            });
          }
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$3, "className", libs.classNames("NewPlayerInfo", {
      Hidden: false
    }), _$p));
    return _el$3;
  })();
};
const ActivityInviteReward = props => {
  const [local, others] = libs.splitProps(props, ["children", "itemId", "amounts", "rarity"]);
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
    className: "ActivityInviteReward"
  }), {
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("ActivityInviteRewardBG", "Rarity" + local.rarity);
        },
        get children() {
          return libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return local.itemId;
            },
            get count() {
              return local.amounts;
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Light"
      })];
    }
  }));
};

const language$4 = $.Language().toLowerCase();
let previewTimer = -1;
const Activity_NewPlayerCheck = props => {
  const [previewID, setPreviewID] = libs.createSignal(2000002);
  const localPlayerID = Players.GetLocalPlayer();
  const activityID = props.activity_id;
  const merged = libs.mergeProps$1({}, props);
  const [local, others] = libs.splitProps(merged, ["selected", "onDayChange", "onAllCompleted"]);
  const [endtime, setEndtime] = libs.createSignal(1716220799);
  const [progress, setProgress] = libs.createSignal(0);
  const [activityTokenID, setActivityTokenID] = libs.createSignal(-1);
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [progressRewardsState, setProgressRewardsState] = libs.createSignal({});
  const [taskData, setTaskData] = libs.createSignal([]);
  const [taskProgress, setTaskProgress] = libs.createSignal({});
  const [day, setDay] = libs.createSignal(1);
  libs.createEffect(() => {
    local.onDayChange?.(day());
  });
  const currentAutoDay = libs.createMemo(() => {
    const progress = taskProgress();
    let hasDay3 = false;
    let hasDay2 = false;
    for (const task_id in progress) {
      const dayNum = Math.floor(Number(task_id) % 1000 / 100);
      if (dayNum === 3 && (progress[task_id].start_time ?? 0) > 0) hasDay3 = true;
      if (dayNum === 2 && (progress[task_id].start_time ?? 0) > 0) hasDay2 = true;
    }
    return hasDay3 ? 3 : hasDay2 ? 2 : 1;
  });
  libs.createEffect(() => {
    setDay(currentAutoDay());
  });
  netdata_utils.createNetDataEffect("info_activity_task", data => {
    if (data) {
      const task = [];
      for (const task_id in data) {
        if (data[task_id].activity_id == activityID) task.push(data[task_id]);
      }
      setTaskData(task.sort((a, b) => a.task_id - b.task_id));
    }
  });
  netdata_utils.createNetDataEffect("info_activity_data", data => {
    for (const activityInfo of data) {
      if (activityInfo.activity_id == activityID) {
        const reward = JSON.parse(activityInfo.extra_information);
        let reawrd_list = reward.rewards;
        if (reawrd_list) {
          reawrd_list = reawrd_list.map((v, i) => {
            if (reawrd_list?.[i - 1]?.threshold != undefined) v.last_threshold = reawrd_list[i - 1].threshold;
            return v;
          });
        }
        setRewardInfoList(reawrd_list);
        setEndtime(reward.activity_end_time);
        setActivityTokenID(reward.activity_token);
      }
    }
  });
  netdata_utils.createNetDataEffect("task_activity_data", data => {
    if (data?.[activityID]) {
      setProgressRewardsState(data[activityID].rewards);
      setProgress(data[activityID].progress ?? 0);
    }
  }, localPlayerID);
  netdata_utils.createNetDataEffect("activity_task_progresses", data => {
    if (data) {
      const output = {};
      for (const unique_task_id in data) {
        const element = data[unique_task_id];
        output[element.task_id] = {
          progress: element.progress ?? 0,
          unique_task_id: element.unique_task_id,
          receive_progress: element.receive_progress ?? 0,
          start_time: element.start_time ?? 0
        };
      }
      setTaskProgress(output);
    }
  }, localPlayerID);
  let requesting = false;
  const receiveTaskReward = (task_id, addProgress, unique_task_id) => {
    if (unique_task_id != undefined && !requesting) {
      requesting = true;
      serverRequest("activity_task_reward", {
        task_id: task_id,
        unique_task_id: unique_task_id
      }, ({
        status
      }) => {
        requesting = false;
        if (status == 0) {
          callAction("activity_data", {
            activity_id: activityID
          });
        }
      });
    }
  };
  const currentDayTaskData = libs.createMemo(() => taskData().filter(t => Math.floor(t.task_id % 1000 / 100) === day()));
  const isAllCompleted = libs.createMemo(() => {
    if (taskData().length === 0 || rewardInfoList().length === 0) return false;
    const allTasksDone = taskData().every(task => {
      const td = taskProgress()[task.task_id];
      if (!td) return false;
      const prog = Math.min(finiteNumber(Number(task.target)), td.progress ?? 0);
      return prog >= finiteNumber(Number(task.target)) && td.receive_progress == 1;
    });
    const allProgressDone = rewardInfoList().every(reward => (progressRewardsState()?.[reward.reward_id] ?? 2) === 1);
    return allTasksDone && allProgressDone;
  });
  libs.createEffect(() => {
    if (isAllCompleted()) {
      local.onAllCompleted?.();
    }
  });
  callAction("activity_task_progress", {
    task_type: 2,
    sid: 0,
    aid: activityID
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !local.selected
      });
    },
    id: "Activity_NewPlayerCheck",
    hittest: false,
    get children() {
      return [libs.createComponent(EOM_Image.EOM_Image, {
        id: "ActivityBG",
        get className() {
          return "Day" + day();
        },
        hittest: false
      }), libs.createComponent(EOM_Image.EOM_Image, {
        id: "ActivityTitle",
        get className() {
          return libs.classNames(language$4, "Day" + day());
        },
        hittest: false
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return day() == 1;
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Tutorial",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Icon"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Info",
                    tooltip_text: "#Activity_NewPlayerCheck_Tutorial_Info"
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Hero",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Icon"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Info",
                    tooltip_text: "#Activity_NewPlayerCheck_Hero_Info"
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Book",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Icon"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Info",
                    tooltip_text: "#Activity_NewPlayerCheck_Book_Info"
                  })];
                }
              })];
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return day() == 3;
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "LadderList",
                tooltip_text: "#Activity_NewPlayerCheck_LadderList_Info",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    text: "#LadderList"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "PointList",
                tooltip_text: "#Activity_NewPlayerCheck_PointList_Info",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    text: "#PointList"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ChickenList",
                tooltip_text: "#Activity_NewPlayerCheck_ChickenList_Info",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    text: "#ChickenList"
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "TaskDayChoose",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TaskDayChooseBG"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            flowChildren: "right",
            get children() {
              return libs.createComponent(libs.Index, {
                each: [1, 2, 3],
                children: data => {
                  const dayNum = () => data();
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "ChooseButtonWrapper",
                    onactivate: () => {
                      if (currentAutoDay() >= dayNum()) {
                        setDay(dayNum());
                      }
                    },
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "ChooseButton",
                        get classList() {
                          return {
                            Selected: day() === dayNum()
                          };
                        },
                        get children() {
                          return libs.createComponent(GenericPanel.CLabel, {
                            get text() {
                              return "#Activity_NewPlayer_Day_" + dayNum();
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Image.EOM_Image, {
                        id: "Locked",
                        get classList() {
                          return {
                            enable: currentAutoDay() >= dayNum()
                          };
                        }
                      })];
                    }
                  });
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardsContainer",
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TaskList",
                scroll: "y",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return currentDayTaskData();
                    },
                    children: (data, index) => {
                      const rewards = libs.createMemo(() => {
                        const output = JSON.parseSafe(data().reward);
                        if (typeof output == "object" && Object.keys(output).length > 0) {
                          let sID = activityTokenID().toString();
                          return Object.keys(output[0]).sort((a, b) => (a == sID ? 1 : 0) - (b == sID ? 1 : 0)).map((id, index) => {
                            return {
                              itemId: id,
                              amounts: output[0][id] ?? 0
                            };
                          });
                        }
                        return [];
                      });
                      const task_data = () => {
                        if (taskProgress()[data().task_id]) {
                          return taskProgress()[data().task_id];
                        }
                      };
                      const progress = () => Math.min(finiteNumber(Number(data().target)), task_data()?.progress ?? 0);
                      const state = () => {
                        if (progress() >= finiteNumber(Number(data().target))) {
                          if (task_data()?.receive_progress == 1) {
                            return 1;
                          }
                          return 0;
                        }
                        return 2;
                      };
                      return [libs.createComponent(libs.Show, {
                        when: index != 0,
                        get children() {
                          return libs.createComponent(EOM_Panel.EOM_Panel, {
                            className: "TaskUnderline"
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "ActivityTaskRow",
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "TaskInfo",
                            get children() {
                              return [libs.createComponent(GenericPanel.CLabel, {
                                id: "title",
                                get text() {
                                  return `#${data().task_id}`;
                                }
                              }), libs.createComponent(GenericPanel.CLabel, {
                                id: "progress",
                                html: true,
                                get dialogVariables() {
                                  return {
                                    current: progress(),
                                    target: Number(data().target)
                                  };
                                },
                                text: "#Activity_NewPlayer_Progress"
                              })];
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "Rewards",
                            get children() {
                              return libs.createComponent(libs.Index, {
                                get each() {
                                  return rewards();
                                },
                                children: (reward, i) => {
                                  const reward_id = () => Number(reward().itemId);
                                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                                    className: "ElvesTaskRewardButton",
                                    enabled: false,
                                    get children() {
                                      return libs.createComponent(ElvesReward, {
                                        get reawrd_info() {
                                          return {
                                            item_id: reward_id(),
                                            rarity: -1,
                                            amounts: reward().amounts
                                          };
                                        },
                                        get state() {
                                          return state();
                                        },
                                        onPreview: id => {
                                          previewTimer = $.Schedule(0.3, () => {
                                            previewTimer = -1;
                                            if (previewID() != id) {
                                              setPreviewID(id);
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          }), libs.createComponent(EOM_Button.EOM_Button, {
                            id: "TaskReceiveButton",
                            get enabled() {
                              return state() == 0;
                            },
                            get text() {
                              return libs.memo(() => state() == 1)() ? "#activity_receive" : state() == 0 ? "#activity_action_receive" : "#Activity_Task_Unfinished";
                            },
                            onactivate: () => {
                              receiveTaskReward(data().task_id, 0, task_data()?.unique_task_id);
                            }
                          })];
                        }
                      })];
                    }
                  });
                }
              });
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "GoldIcon"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "GoldProgress",
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            get text() {
              return progress();
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Progress",
        get children() {
          return [libs.createComponent(libs.Index, {
            get each() {
              return rewardInfoList();
            },
            children: (data, index) => libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "ProgressRoot",
              marginLeft: 120 * (index + 1) + "px",
              get classList() {
                return {
                  achieve: progress() >= data().threshold
                };
              }
            })
          }), libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
            id: "RemainProgress",
            get value() {
              return progress();
            },
            max: 500
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ProgressThresholds",
        get children() {
          return libs.createComponent(libs.Index, {
            get each() {
              return rewardInfoList();
            },
            children: (data, index) => libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "ProgressThreshold",
              marginLeft: 120 * (index + 1) - 20 + "px",
              get children() {
                return libs.createComponent(GenericPanel.CLabel, {
                  get text() {
                    return `${data().threshold}`;
                  }
                });
              }
            })
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ProgressRewards",
        get children() {
          return libs.createComponent(libs.Index, {
            get each() {
              return rewardInfoList();
            },
            children: (data, index) => libs.createComponent(EOM_Panel.EOM_Panel, {
              width: "72px",
              height: "72px",
              overflow: "noclip",
              marginLeft: 120 * (index + 1) - 27 + "px",
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  onactivate: () => {
                    if ((progressRewardsState()?.[data().reward_id] ?? 2) == 0) {
                      callAction("activity_receive", {
                        activity_id: activityID,
                        reward_id: data().reward_id
                      });
                    }
                  },
                  get children() {
                    return libs.createComponent(ElvesReward, {
                      get reawrd_info() {
                        return {
                          item_id: data().rewards?.[0]?.item_id ?? -1,
                          rarity: data().rewards?.[0]?.rarity ?? -1,
                          amounts: data().rewards?.[0]?.amounts ?? 0
                        };
                      },
                      get state() {
                        return progressRewardsState()?.[data().reward_id] ?? 2;
                      },
                      onPreview: id => {
                        previewTimer = $.Schedule(0.3, () => {
                          previewTimer = -1;
                          if (previewID() != id) {
                            setPreviewID(id);
                          }
                        });
                      }
                    });
                  }
                });
              }
            })
          });
        }
      })];
    }
  });
};
const ElvesReward = props => {
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ElvesReward", "Rarity" + props.reawrd_info.rarity, "State" + props.state);
    },
    onmouseover: self => {
      props.onPreview(props.reawrd_info.item_id);
    },
    onmouseout: self => {
      if (previewTimer != -1) {
        $.CancelScheduled(previewTimer);
        previewTimer = -1;
      }
    },
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BG",
        get children() {
          return [libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return props.reawrd_info.item_id;
            }
          }), libs.createComponent(GenericPanel.CLabel, {
            id: "RewardCount",
            get text() {
              return `${props.reawrd_info.amounts}`;
            },
            hittest: false
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Light",
        hittest: false
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "ElvesActivityCheck",
        hittest: false
      })];
    }
  });
};

const Activity_PDD = props => {
  const activityID = props.activity_id;
  const playerID = Players.GetLocalPlayer();
  const language = $.Language().toLowerCase();
  const rewardCnt = 10;
  const [playerToken] = libs.createSignal(1100083);
  const [activityTokenCnt, setActivityTokenCnt] = libs.createSignal(0);
  const [endTime, setEndTime] = libs.createSignal(1761840000);
  const [step, setStep] = libs.createSignal(0);
  const [triggerStep, setTriggerStep] = libs.createSignal(0);
  const [showBtnParticle, setShowBtnParticle] = libs.createSignal(false);
  let preScheduleID = 0;
  const [decrease, setDecrease] = libs.createSignal(0);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const [canTurnCard, setCanTurnCard] = libs.createSignal(false);
  const [isButtonCD, setIsButtonCD] = libs.createSignal(false);
  const playerWallet = netdata_utils.createPlayerNetData("player_wallet", playerID, {
    moonstone: 0,
    starlight: 0
  });
  const [dropEnable, setDropEnable] = libs.createSignal(false);
  const updateServerTime = () => {
    setDropEnable(ServerTimestamp() <= 1761494400);
  };
  updateServerTime();
  netdata_utils.createNetTableEffect("service", "server_time", data => {
    updateServerTime();
  });
  const FAKE_TOKEN_STORE_DATA = () => {
    let _decrease = decrease();
    let _step = step();
    const nowRewardData = rewardList().find(v => v.reward_id == _step);
    if (nowRewardData) {
      let pid = nowRewardData.rewards[0].item_id;
      let rarity = nowRewardData.rewards[0].rarity;
      let fake_items = nowRewardData.rewards.map(v => {
        return {
          status: 1,
          pid: 9760000 + _step,
          orderby: 1,
          ...v
        };
      });
      let data = {
        limit_count: 1,
        tag: "arena",
        overseas_real_price: 0,
        russia_origin_price: 0,
        russia_real_price: 0,
        is_first: 0,
        items: fake_items,
        title: rarity.toString(),
        overseas_origin_price: 0,
        pay_type: nowRewardData.pdd_use_token,
        start_time: 0,
        end_time: 0,
        id: pid,
        origin_price: nowRewardData.pdd_origin_price,
        real_price: nowRewardData.pdd_origin_price - _decrease,
        discount: 0,
        vip: 0,
        img: "",
        order_by: 1,
        status: 1,
        limit_type: 1,
        limit_num: 1
      };
      return data;
    }
  };
  const [pddFucardDropAmount, setPddFucardDropAmount] = libs.createSignal(0);
  const leftCardCnt = 3;
  const turnTime = 1.4;
  const rewardListLength = 12;
  netdata_utils.createNetDataEffect("pdd_activity_data", data => {
    if (data) {
      if (step() != data.step) {
        setStep(data.step);
      }
      setDecrease(data.decrease);
    }
  }, playerID);
  libs.createEffect(libs.on(step, () => {
    if (step() <= rewardListLength) {
      setCanTurnCard(true);
      $.Schedule(turnTime, () => {
        setTriggerStep(step());
        setCanTurnCard(false);
      });
    } else {
      setTriggerStep(step() - 1);
    }
  }));
  netdata_utils.createNetDataEffect("info_activity_data", data => {
    if (data) {
      for (const info of data) {
        if (info.activity_id == activityID) {
          setEndTime(info.end_time);
          const data = JSON.parseSafe(info.extra_information);
          if (data.rewards) {
            setRewardList(data.rewards);
          }
          break;
        }
      }
    }
  });
  netdata_utils.createNetDataEffect("player_token", data => {
    if (data) {
      setActivityTokenCnt(data[playerToken().toString()]?.num ?? 0);
    }
  }, playerID);
  netdata_utils.createNetDataEffect("red_envelope_count", data => {
    if (data) {
      if (data) {
        Object.keys(data.idKv).forEach(key => {
          const numberKey = Number(key);
          if (numberKey == playerToken()) {
            setPddFucardDropAmount(data.idKv[numberKey]);
          }
        });
      }
    }
  }, playerID);
  const SetBtnParticleState = () => {
    if (preScheduleID != 0) {
      $.CancelScheduled(preScheduleID);
      setShowBtnParticle(false);
    }
    setShowBtnParticle(true);
    preScheduleID = $.Schedule(1.3, () => {
      setShowBtnParticle(false);
    });
  };
  const GetShopCardList = () => {
    if (rewardList() == undefined || rewardList().length == 0 || triggerStep() == 0) {
      return [];
    }
    const rewardCnt1 = rewardList().length;
    let cardIdList = [];
    const step1 = triggerStep();
    if (step1 <= leftCardCnt) {
      for (let i = 0; i < 8; i++) {
        cardIdList.push(i);
      }
    } else {
      const trigger = triggerStep();
      let j = 0;
      for (let i = trigger - leftCardCnt; j < 8 && i <= rewardCnt1; i++) {
        j++;
        cardIdList.push(i - 1);
      }
    }
    return cardIdList;
  };
  const GetCardPosAndRotateZ = index => {
    const rotate = Math.floor((index - Math.min(triggerStep() - 1, leftCardCnt)) * (360 / rewardCnt));
    return [0, 0, rotate];
  };
  const GetRedLineWidth = value => {
    if (value < 100) {
      return "20%";
    }
    if (value < 1000) {
      return "25%";
    }
    if (value < 10000) {
      return "30%";
    }
    if (value < 100000) {
      return "60%";
    }
  };
  const GetOriginPrice = () => {
    if (rewardList() == undefined || rewardList().length == 0 || triggerStep() == 0) {
      return "0";
    }
    let index = triggerStep() - 1;
    if (triggerStep() > rewardList().length) {
      index--;
    }
    return rewardList()[index]?.pdd_origin_price.toString();
  };
  const GetCurPrice = () => {
    if (rewardList() == undefined || rewardList().length == 0 || triggerStep() == 0) {
      return "0";
    }
    let index = triggerStep() - 1;
    if (triggerStep() > rewardList().length) {
      index--;
    }
    return (rewardList()[index]?.pdd_origin_price - decrease()).toString();
  };
  const GetPopTxt = IsMinPrice => {
    if (IsMinPrice) {
      return "#PDD_Progress_End";
    }
    if (decrease() > 0) {
      return "#PDD_Price_Limit";
    }
    return "#PDD_POP_Normal";
  };
  const showPriceLimit = () => {
    if (rewardList() == undefined || rewardList().length == 0 || triggerStep() == 0) {
      return false;
    }
    return decrease() > rewardList()[triggerStep() - 1].pdd_origin_price;
  };
  const canPdd = () => {
    if (step() > rewardListLength) return false;
    if (step() == 0 || rewardList().length == 0) return false;
    return decrease() < rewardList()[step() - 1].pdd_origin_price;
  };
  const IsSoldOut = index => {
    return index < step() || step() > rewardList().length;
  };
  const OnDecrease = () => {
    serverRequest("pdd_decrease", {
      activity_id: activityID
    }, data => {
      if (data.status == 0 && data?.data?.pdd_activity_data && data?.data?.player_token) {
        setDecrease(data.data.pdd_activity_data.decrease);
        setActivityTokenCnt(data.data.player_token[0].num);
      }
    });
  };
  const PDDShopCard = props => {
    const [local, others] = libs.splitProps(props, ["item_id", "amount", "rarity", "isSoldOut", "isNext"]);
    return libs.createComponent(EOM_Panel.EOM_Panel, {
      get className() {
        return libs.classNames("PDDShopCard", "Rarity" + local.rarity);
      },
      get children() {
        return [libs.createComponent(GenericPanel.CLabel, {
          id: "ItemTxt",
          get text() {
            return "#" + local.item_id.toString();
          },
          hittest: false
        }), libs.createComponent(ProductImage.ProductImage, {
          id: "ItemImg",
          get itemid() {
            return local.item_id;
          },
          get count() {
            return local.amount;
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          get className() {
            return libs.classNames("ShopState", {
              SoldOut: local.isSoldOut
            }, {
              NextShop: local.isNext
            });
          }
        })];
      }
    });
  };
  let tooltipText = $.Localize("#Activity_PDD_infodesc") + "<br><br>" + $.Localize("#ActivitySpecialPlayer") + "<br>" + $.Localize("#ActivitySpecialPlayer_description");
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      });
    },
    id: "Activity_PDD",
    hittest: false,
    get children() {
      return [libs.createComponent(Player.CurrencyGroup, {
        get tokens() {
          return [1000001, playerToken()];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.selected;
        },
        get children() {
          return libs.createElement("DOTAParticleScenePanel", {
            id: "Activity_PDD_Particle",
            particleName: "particles/eom/ui/ui_fx/ui_fx_ending_s2.vpcf",
            squarePixels: true,
            cameraOrigin: "0 800 0",
            lookAt: "0 0 0",
            fov: 90,
            hittest: false
          }, null);
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BGLayer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityTitle",
            get className() {
              return libs.classNames(language);
            },
            hittest: false
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityCountdown",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                align: "center center",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "timeIcon"
                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return endTime();
                    },
                    text: "#countdown_time"
                  })];
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityInfoButton",
            onmouseover: self => {
              if (language != "schinese") {
                ShowCustomTooltip(self, "long_text", {
                  text: tooltipText
                });
              } else {
                $.DispatchEvent("DOTAShowTextTooltip", self, tooltipText);
              }
            },
            onmouseout: self => {
              if (language != "schinese") {
                HideCustomTooltip(self, "long_text");
              } else {
                $.DispatchEvent("DOTAHideTextTooltip", self);
              }
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "InfoButtonLabelBoard",
            get children() {
              return libs.createComponent(GenericPanel.CLabel, {
                id: "InfoButtonLabel",
                text: "#ActivityRule"
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainLayer",
        hittest: false,
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CardListBg",
            hittest: false,
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                get className() {
                  return libs.classNames({
                    CanTurnCard: canTurnCard()
                  });
                },
                id: "PddShopRotateParent",
                hittest: false,
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return GetShopCardList();
                    },
                    children: (data, idx) => {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "PDDShopCardParent",
                        get style() {
                          return {
                            transform: `rotateZ(${GetCardPosAndRotateZ(idx)[2]}deg)`
                          };
                        },
                        hittest: false,
                        get children() {
                          return libs.createComponent(PDDShopCard, {
                            get item_id() {
                              return rewardList()[data()]?.rewards[0].item_id;
                            },
                            get amount() {
                              return rewardList()[data()]?.rewards[0].amounts;
                            },
                            get rarity() {
                              return rewardList()[data()]?.rewards[0].rarity;
                            },
                            get isSoldOut() {
                              return IsSoldOut(data() + 1);
                            },
                            get isNext() {
                              return data() == triggerStep();
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "PDDShopCardParent",
                        hittest: false,
                        get style() {
                          return {
                            transform: `rotateZ(${GetCardPosAndRotateZ(idx)[2] - 360 / rewardCnt / 2}deg)`
                          };
                        },
                        get children() {
                          return libs.createComponent(libs.Show, {
                            get when() {
                              return idx != 0 || triggerStep() > leftCardCnt;
                            },
                            get children() {
                              return libs.createComponent(EOM_Image.EOM_Image, {
                                id: "Arrow"
                              });
                            }
                          });
                        }
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "K2Mask",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "blackBoard"
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "blackBoard"
                  }), libs.createComponent(libs.Show, {
                    get when() {
                      return dropEnable();
                    },
                    get fallback() {
                      return libs.createComponent(EOM_Label.EOM_Label, {
                        text: "#Activity_PDD_DropEnd"
                      });
                    },
                    get children() {
                      return libs.createComponent(EOM_Label.EOM_Label, {
                        text: "#Activity_PDD_DropCount",
                        get dialogVariables() {
                          return {
                            count: pddFucardDropAmount(),
                            target: 30
                          };
                        }
                      });
                    }
                  })];
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return step() <= rewardListLength;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "BuyCardButton",
                    get enabled() {
                      return !canTurnCard();
                    },
                    onactivate: () => {
                      if (step() <= rewardList().length) {
                        const fake_data = FAKE_TOKEN_STORE_DATA();
                        if (fake_data) {
                          if (playerWallet().moonstone >= fake_data.real_price) {
                            showPopup("StoreBuyItem", {
                              itemData: fake_data,
                              group: "StoreBuyItem",
                              custom_buy_callback: () => {
                                callAction("activity_receive", {
                                  activity_id: activityID,
                                  reward_id: rewardList()[step() - 1].reward_id
                                });
                              }
                            });
                          } else {
                            showPopup("StoreBuyItem", {
                              itemData: fake_data,
                              group: "StoreBuyItem",
                              custom_buy_callback: () => {
                                showPopup("StoreBuyItemResult", {
                                  result: "failure",
                                  reason: "no_enough_moon",
                                  group: String(fake_data.id)
                                });
                              }
                            });
                          }
                        }
                      }
                    },
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "BuyBtnOriginPrice",
                        hittest: false,
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            id: "redLine",
                            get width() {
                              return GetRedLineWidth(Number(GetOriginPrice()));
                            },
                            hittest: false
                          }), libs.createComponent(GenericPanel.CLabel, {
                            get text() {
                              return GetOriginPrice();
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "BuyBtnCurPrice ",
                        hittest: false,
                        get children() {
                          return [libs.createComponent(EOM_Panel.EOM_Panel, {
                            get className() {
                              return libs.classNames("ItemImg");
                            },
                            get backgroundImage() {
                              return getImagePath("tokens/1000001.png");
                            },
                            hittest: false
                          }), libs.createComponent(GenericPanel.CLabel, {
                            get text() {
                              return GetCurPrice();
                            },
                            hittest: false
                          })];
                        }
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "BgBottomMask"
              }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                id: "PDDButton",
                get enabled() {
                  return libs.memo(() => !!(!canTurnCard() && activityTokenCnt() > 0))() && canPdd();
                },
                onactivate: () => {
                  if (activityTokenCnt() > 0 && step() <= rewardListLength) {
                    if (isButtonCD()) {
                      return;
                    } else {
                      setIsButtonCD(true);
                      $.Schedule(0.3, () => {
                        setIsButtonCD(false);
                      });
                    }
                    SetBtnParticleState();
                    $.Schedule(0.2, () => {
                      OnDecrease();
                    });
                  }
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "PDDButtonBG",
                    hittest: false
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "ButtonTxt",
                    text: "#PDD_Btn_Txt",
                    hittest: false
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "CurPriceParent",
                    hittest: false,
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "ItemImg",
                        hittest: false
                      }), libs.createComponent(GenericPanel.CLabel, {
                        id: "CurPrice",
                        text: "x1",
                        hittest: false
                      })];
                    }
                  })];
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return !canTurnCard();
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "PriceLimit",
                    get children() {
                      const _el$2 = libs.createElement("Panel", {
                        id: "txtSizePanel"
                      }, null);
                      libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
                        get text() {
                          return GetPopTxt(showPriceLimit());
                        },
                        hittest: false
                      }));
                      return _el$2;
                    }
                  });
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return showBtnParticle();
                },
                get children() {
                  return [libs.createElement("DOTAParticleScenePanel", {
                    id: "Button_PDD_Particle_Bottom",
                    particleName: "particles/eom/ui/ui_fx/ui_kanjia_1_06ae_bottom.vpcf.vpcf",
                    squarePixels: true,
                    cameraOrigin: "0 0 800",
                    lookAt: "0 0 0",
                    fov: 40,
                    hittest: false
                  }, null), libs.createElement("DOTAParticleScenePanel", {
                    id: "Button_PDD_Particle",
                    particleName: "particles/eom/ui/ui_fx/ui_kanjia_1_fx.vpcf",
                    squarePixels: true,
                    cameraOrigin: "0 0 800",
                    lookAt: "0 0 0",
                    fov: 60,
                    hittest: false
                  }, null), libs.createElement("DOTAParticleScenePanel", {
                    id: "BuyButton_PDD_Particle",
                    particleName: "particles/eom/ui/ui_fx/ui_kanjia_2_fx.vpcf",
                    squarePixels: true,
                    cameraOrigin: "0 0 400",
                    lookAt: "0 0 0",
                    fov: 70,
                    hittest: false
                  }, null)];
                }
              })];
            }
          });
        }
      })];
    }
  });
};

const language$3 = $.Language().toLowerCase();
const Activity_Regression = props => {
  const activityID = props.activity_id;
  const localPlayerID = Players.GetLocalPlayer();
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [rewardStateList, setRewardStateList] = libs.createSignal({});
  const [endTime, setEndTime] = libs.createSignal(0);
  const [exchangeShopData, setExchangeShopData] = libs.createSignal();
  const [canBuyPack, setCanBuyPack] = libs.createSignal(false);
  const [experienceHeroPropInfo, setExperienceHeroPropInfo] = libs.createSignal();
  const [playerExperiencePropIDList, setPlayerExperiencePropIDList] = libs.createSignal([]);
  const canExperience = () => experienceHeroPropInfo() != undefined && playerExperiencePropIDList().length > 0;
  const onExperience = () => {
    const info = experienceHeroPropInfo();
    const playerPropsList = playerExperiencePropIDList();
    if (playerPropsList.length > 0 && info && info.param) {
      let params = JSON.parseSafe(info.param);
      showPopup("UniversalHeroCard", {
        hero_ids: params.hero_ids,
        prop_id: info.id,
        uid: playerPropsList[0]
      });
    }
  };
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useNetData("info_prop", data => {
      if (data && data["9310014"]) {
        setExperienceHeroPropInfo(data["9310014"]);
      }
    }));
    gameEventIDList.push(useNetData("player_props", data => {
      if (data) {
        setPlayerExperiencePropIDList(Object.entries(data).filter(v => {
          return v[1].prop_id == 9310014 && v[1].amounts > 0;
        }).map(v => v[0]));
      }
    }, localPlayerID));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      if (data && data["Return"]) {
        data["Return"].forEach((storeData, i) => {
          if (storeData.id == 9900263) {
            setExchangeShopData(storeData);
          }
        });
      }
    }));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID) {
          const reward = JSON.parse(activityInfo.extra_information);
          let reawrd_list = reward.rewards;
          setRewardInfoList(reawrd_list);
        }
      }
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      if (data && data.purchased_products) {
        setCanBuyPack((data.purchased_products[9900263] ?? 0) == 0);
      } else {
        setCanBuyPack(false);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("login_activity_data", data => {
      if (data && data[activityID]) {
        let activityData = data[activityID];
        setRewardStateList(activityData.rewards);
      }
    }, localPlayerID));
    gameEventIDList.push(useNetData("player_regression_data", data => {
      if (data && typeof data.regression_time == "number") {
        setEndTime(data.regression_time + 60 * 60 * 24 * 14);
      } else {
        setEndTime(0);
      }
    }, localPlayerID));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  let cooldown = false;
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !props.selected
      });
    },
    id: "Activity_Regression",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BGLayer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "ActivityTitle",
            className: language$3,
            hittest: false
          }), libs.createComponent(InfoButton.InfoButton, {
            className: language$3,
            info: "#SnowballInfo",
            tooltip: "#regression_activity_infodesc"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityCountdown",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                align: "center center",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "timeIcon"
                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return endTime();
                    },
                    text: "#countdown_time"
                  })];
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardList",
        scroll: "x",
        get children() {
          return [...Array(7)].map((_, index) => {
            const data = libs.createMemo(() => rewardInfoList()[index] ?? {
              reward_id: -1,
              rewards: [{
                item_id: -1,
                amounts: 1,
                rarity: 0
              }],
              threshold: 99
            });
            const canReceive = () => rewardStateList()[data().reward_id.toString()] == 0;
            const received = () => rewardStateList()[data().reward_id.toString()] == 1;
            return libs.createComponent(libs.Show, {
              get when() {
                return data().reward_id != -1;
              },
              get children() {
                return libs.createComponent(RegressionItem, {
                  get rarity() {
                    return index == 6 ? 3 : data().rewards[0].rarity;
                  },
                  get item_id() {
                    return data().rewards[0].item_id;
                  },
                  get amounts() {
                    return data().rewards[0].amounts;
                  },
                  get canReceive() {
                    return canReceive();
                  },
                  get received() {
                    return received();
                  },
                  day: index + 1,
                  get canExperience() {
                    return canExperience();
                  },
                  onExperience: onExperience,
                  OnReceive: () => {
                    if (cooldown) return;
                    $.Schedule(0.1, () => {
                      cooldown = false;
                    });
                    cooldown = true;
                    callAction("activity_receive", {
                      activity_id: activityID,
                      reward_id: data().reward_id
                    });
                  }
                });
              }
            });
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BottomPack",
        get children() {
          return [libs.createComponent(EOM_Label.EOM_Label, {
            id: "LeftLabel",
            text: "#9900263"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CenterPack",
            get children() {
              return [libs.createComponent(EOM_Image.EOM_Image, {}), libs.createComponent(EOM_Label.EOM_Label, {
                text: "x12000"
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RightBuyButtonContainer",
            get children() {
              return [libs.createComponent(EOM_Button.EOM_Button, {
                id: "RightBuyButton",
                get enabled() {
                  return canBuyPack();
                },
                color: "Blue",
                width: "186px",
                height: "58px",
                text: "180",
                get icon() {
                  return libs.createComponent(EOM_Image.EOM_Image, {
                    get backgroundImage() {
                      return getImagePath("tokens/1000001.png");
                    },
                    width: "40px",
                    height: "40px"
                  });
                },
                onactivate: () => {
                  if (exchangeShopData() != undefined) {
                    showPopup("StoreBuyItem", {
                      itemData: exchangeShopData(),
                      purchased_num: 1,
                      group: "StoreBuyItem"
                    });
                  } else {
                    showPopup("ErrorMessage", {
                      msg: "#Steam_RequestFailure"
                    });
                  }
                },
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    id: "OriginalPrice",
                    text: `${360}`
                  });
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return !canBuyPack();
                },
                get children() {
                  return libs.createComponent(EOM_Icon.EOM_Icon, {
                    width: "130px",
                    height: "78px",
                    style: {
                      uiScale: "50%"
                    },
                    align: "right top",
                    opacity: "0.7",
                    backgroundSize: "100%",
                    get src() {
                      return getSrcPath("store/new/store_sold_out.png");
                    }
                  });
                }
              })];
            }
          })];
        }
      })];
    }
  });
};
const RegressionItem = props => {
  const rarity = () => {
    return finiteNumber(Number(props.rarity), 0);
  };
  const switchToCard = () => {
    return props.canExperience && (props.day == 1 || props.day == 4);
  };
  const ImgPath = () => {
    if (props.received && switchToCard()) {
      return getSrcPath("activity/regression/self_pick_card.png");
    }
    return getSrcPath("store_items/" + props.item_id + ".png");
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("RegressionItem", {
        down: props.day % 2 == 0
      });
    },
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("GiftPackBG", "Rarity" + rarity());
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "GiftPackMain",
        get children() {
          return [libs.createComponent(EOM_Label.EOM_Label, {
            id: "ItemName",
            text: "#login7day_title",
            get dialogVariables() {
              return {
                day: props.day
              };
            }
          }), libs.createComponent(EOM_Image.EOM_Image, {
            onmouseover: self => {
              $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#" + props.item_id, "#" + props.item_id + "_description");
            },
            onmouseout: self => {
              $.DispatchEvent("DOTAHideTitleTextTooltip", self);
            },
            marginTop: "140px",
            horizontalAlign: "center",
            width: "150px",
            height: "150px",
            style: {
              backgroundPosition: "center"
            },
            get src() {
              return ImgPath();
            }
          }), libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return props.received;
                },
                get children() {
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return switchToCard();
                    },
                    get fallback() {
                      return libs.createComponent(EOM_Icon.EOM_Icon, {
                        id: "ReceivedIcon"
                      });
                    },
                    get children() {
                      return libs.createComponent(EOM_Button.EOM_Button, {
                        className: "ReceiveButton",
                        color: "Blue",
                        text: "#CustomPickHero",
                        onactivate: () => {
                          props.onExperience();
                        }
                      });
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return props.canReceive;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    className: "ReceiveButton",
                    color: "Green",
                    text: "#activity_action_receive",
                    onactivate: () => {
                      props.OnReceive();
                    }
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return !(props.received && switchToCard());
        },
        get children() {
          return libs.createComponent(GenericPanel.CLabel, {
            className: "ItemCount",
            get text() {
              return "×" + props.amounts;
            }
          });
        }
      })];
    }
  });
};

const language$2 = $.Language().toLowerCase();
const handleActivityShopData = data => {
  let output = {};
  data.forEach(info => {
    output[info.id.toString()] = info;
  });
  return output;
};
const getActivityButtonData = itemData => {
  if (itemData.pay_type == undefined || itemData.pay_type == PayType.MONEY) {
    let dollarMark = "￥";
    let price = itemData.real_price;
    if (language$2 == "schinese") {
      dollarMark = "￥";
      price = itemData.real_price;
    } else if (language$2 == "english") {
      dollarMark = "$";
      price = itemData.overseas_real_price;
    } else if (language$2 == "russian") {
      dollarMark = "₽";
      price = itemData.russia_real_price;
    }
    return {
      text: dollarMark + price.toFixed(2)
    };
  } else if (itemData.pay_type == PayType.MOON) {
    return {
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("tokens/1000001.png");
        },
        width: "28px",
        height: "28px"
      })
    };
  } else if (itemData.pay_type == PayType.STAR) {
    return {
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("money_icon/star.png");
        },
        width: "20px",
        height: "20px"
      })
    };
  } else if (itemData.pay_type == PayType.SHARD) {
    return {
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("money_icon/shard.png");
        },
        width: "20px",
        height: "20px"
      })
    };
  } else if (itemData.pay_type == PayType.SHARD) {
    return {
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("money_icon/shard.png");
        },
        width: "20px",
        height: "20px"
      })
    };
  } else if (Math.floor(itemData.pay_type / 10000) == 110) {
    return {
      color: "Light",
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("tokens/" + itemData.pay_type + ".png");
        },
        width: "28px",
        height: "28px"
      })
    };
  }
  return {
    text: String(Round(itemData.real_price, 2)),
    icon: libs.createComponent(EOM_Image.EOM_Image, {
      get backgroundImage() {
        return getImagePath("money_icon/shard.png");
      },
      width: "20px",
      height: "20px"
    })
  };
};
const Activity_StarryTreasure3 = props => {
  const [previewID, setPreviewID] = libs.createSignal(-1);
  const activity_id = props.activity_id;
  const localPlayerID = Players.GetLocalPlayer();
  const maxShowAmount = 5;
  const playerToken = netdata_utils.createPlayerNetData("player_token", localPlayerID);
  const progress = () => {
    let token = playerToken();
    if (!token) return 0;
    return token[activityProgress().toString() ?? 0]?.num ?? 0;
  };
  const [endtime, setEndtime] = libs.createSignal(1730217600);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const [ornamentList, setOrnamentList] = libs.createSignal([]);
  const [redPoints, setRedPoints] = libs.createSignal(getClientGlobalData("red_points") ?? []);
  const [activityTags, setActivityTags] = libs.createSignal(getClientGlobalData("activity_tag_list") ?? {});
  libs.createEffect(() => {
    let shop_data = activityShopData();
    let reward_list = rewardList();
    let ornament_list = [];
    reward_list.forEach((reward, index) => {
      if (reward.item_id.length == 7 && reward.item_id.startsWith("510")) {
        ornament_list.push(Number(reward.item_id));
      } else {
        let data = shop_data[reward.product_id.toString()];
        if (data?.items) {
          data.items.forEach(item => {
            let id = item.item_id.toString();
            if (id.length == 7 && id.startsWith("510")) {
              ornament_list.push(item.item_id);
            }
          });
        }
      }
    });
    setOrnamentList(ornament_list);
  });
  const lastRewardOrnament = () => (ornamentList()?.[ornamentList().length - 1] ?? -1).toString();
  const showLast = () => {
    let current_list = currentList();
    for (let index of current_list) {
      let info = rewardList()[index];
      if (info && info.item_id == lastRewardOrnament()) {
        return false;
      }
    }
    return true;
  };
  const [activityShopData, setActivityShopData] = libs.createSignal({});
  const [activityProgress, setActivityProgress] = libs.createSignal(0);
  const player_ornament = netdata_utils.createPlayerNetData("player_ornament", Players.GetLocalPlayer());
  libs.createEffect(libs.on(activityProgress, progress => {
    updateInfoDeepSea(getNetDataCache("info_deep_sea")?.[activity_id.toString()]);
  }));
  const updateInfoDeepSea = data => {
    if (data && activityProgress() != 0) {
      setRewardList(Object.keys(data).map((key, index) => {
        const items_data = JSON.parseSafe(data[key].items);
        let item_id = "-1";
        let amounts = 0;
        for (const itemID in items_data) {
          if (itemID != activityProgress().toString()) {
            item_id = itemID;
            amounts = items_data[itemID];
            break;
          }
        }
        return {
          product_id: data[key].product_id,
          item_id,
          amounts
        };
      }));
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const ornamentListProgess = libs.createMemo(() => {
    let _progress = progress();
    let _rewardList = rewardList();
    const _shopData = activityShopData();
    let list = ornamentList();
    let stateMap = new Map();
    list.forEach(id => stateMap.set(id, false));
    if (_rewardList.length > 0) {
      for (let i = 0; i < _progress; i++) {
        if (_rewardList[i]) {
          if (stateMap.get(Number(_rewardList[i].item_id)) === false) {
            stateMap.set(Number(_rewardList[i].item_id), true);
          } else if (_rewardList[i].product_id != 0) {
            if (_shopData[_rewardList[i].product_id]) {
              const itemData = _shopData[_rewardList[i].product_id];
              for (const v of itemData.items) {
                if (KeyValues.CosmeticsKv[v.item_id] && stateMap.get(v.item_id) === false) {
                  stateMap.set(v.item_id, true);
                }
              }
            }
          }
        }
      }
    }
    return stateMap;
  });
  libs.onMount(() => {
    const gameEventIDList = [];
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_deep_sea", data => {
      updateInfoDeepSea(data?.[activity_id.toString()]);
    }));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      if (data?.["DeepSea"] != undefined) {
        setActivityShopData(handleActivityShopData(data["DeepSea"]));
      }
    }));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      if (data) {
        data.forEach(info => {
          if (info.activity_id == activity_id) {
            const data = JSON.parseSafe(info.extra_information);
            setActivityProgress(data.activity_progress ?? 0);
            setEndtime(data.activity_end_time);
          }
        });
      }
    }));
    gameEventIDList.push(useClientGlobalData("red_points", setRedPoints));
    gameEventIDList.push(useClientGlobalData("activity_tag_list", setActivityTags));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  const currentList = libs.createMemo(() => {
    let list = [];
    if (rewardList() && rewardList().length > 0) {
      let max = rewardList().length;
      let start = Math.min(progress(), max - maxShowAmount);
      let end = Math.min(start + maxShowAmount, max);
      for (let i = start; i < end; i++) {
        list.push(i);
      }
    }
    return list;
  });
  const currentRewardListStart = libs.createMemo(() => currentList()[0]);
  const [displayRewardListStart, setDisplayRewardListStart] = libs.createSignal();
  const [rewardListAnimating, setRewardListAnimating] = libs.createSignal(false);
  const [rewardListSliding, setRewardListSliding] = libs.createSignal(false);
  const displayList = libs.createMemo(() => {
    const start = displayRewardListStart();
    if (start == undefined) {
      return currentList();
    }
    const max = rewardList().length;
    const count = rewardListAnimating() ? maxShowAmount + 1 : maxShowAmount;
    const end = Math.min(start + count, max);
    const list = [];
    for (let index = start; index < end; index++) {
      list.push(index);
    }
    return list;
  });
  let previousRewardListStart;
  let rewardListAnimationStartTimer;
  let rewardListAnimationTimer;
  libs.createEffect(libs.on(currentRewardListStart, currentStart => {
    if (currentStart == undefined) {
      previousRewardListStart = undefined;
      setDisplayRewardListStart(undefined);
      return;
    }
    if (previousRewardListStart != undefined && currentStart > previousRewardListStart) {
      setRewardListAnimating(true);
      setDisplayRewardListStart(previousRewardListStart);
      if (rewardListAnimationStartTimer != undefined) {
        $.CancelScheduled(rewardListAnimationStartTimer);
      }
      rewardListAnimationStartTimer = $.Schedule(0, () => {
        setRewardListSliding(true);
        rewardListAnimationStartTimer = undefined;
      });
      if (rewardListAnimationTimer != undefined) {
        $.CancelScheduled(rewardListAnimationTimer);
      }
      rewardListAnimationTimer = $.Schedule(0.3, () => {
        libs.batch(() => {
          setRewardListSliding(false);
          setDisplayRewardListStart(currentStart);
          setRewardListAnimating(false);
        });
        rewardListAnimationTimer = undefined;
      });
    } else {
      setDisplayRewardListStart(currentStart);
    }
    previousRewardListStart = currentStart;
  }));
  libs.onCleanup(() => {
    if (rewardListAnimationStartTimer != undefined) {
      $.CancelScheduled(rewardListAnimationStartTimer);
    }
    if (rewardListAnimationTimer != undefined) {
      $.CancelScheduled(rewardListAnimationTimer);
    }
  });
  const hasFreeRewardRedPoint = (reward, stage) => {
    const tab = activityTags()[activity_id];
    return reward?.product_id == 0 && tab != undefined && red_point_utils.hasRedPoint(redPoints(), "activity", tab, "starry_treasure", stage);
  };
  let cooldowning = false;
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("ActivityMain", {
        Hidden: !props.selected
      });
    },
    id: "Activity_StarryTreasure",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: 1100062
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "BGLayer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "ActivityTitle",
            className: language$2,
            hittest: false
          }), libs.createComponent(InfoButton.InfoButton, {
            className: language$2,
            info: "#SnowballInfo",
            get tooltip() {
              return "#starry_treasure_activity_infodesc_" + props.activity_id;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityCountdown",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                width: "100%",
                verticalAlign: "center",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "timeIcon",
                    get backgroundImage() {
                      return getImagePath("activity/elves_dance/t3_icon_time.png");
                    }
                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return endtime();
                    },
                    text: "#countdown_time"
                  })];
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardsContainer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "StarryRewardTitle",
            get children() {
              return [libs.createComponent(GenericPanel.CLabel, {
                text: "#Activity_StarryTreasure_Title"
              }), libs.createComponent(EOM_Image.EOM_Image, {
                className: "StarryRewardTitleArrow Left"
              }), libs.createComponent(EOM_Image.EOM_Image, {
                className: "StarryRewardTitleArrow Right"
              })];
            }
          }), (() => {
            const _el$ = libs.createElement("Panel", {
              id: "RewardListContainer"
            }, null);
            libs.insert(_el$, libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "RewardList",
              get hittestchildren() {
                return !rewardListAnimating();
              },
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return displayList().length > 0;
                  },
                  get children() {
                    return libs.createComponent(libs.For, {
                      get each() {
                        return displayList();
                      },
                      children: (listIndex, i) => {
                        const rewardData = () => {
                          return rewardList()[listIndex];
                        };
                        const productInfo = () => {
                          if ((rewardData()?.product_id ?? 0) != 0 && activityShopData()[rewardData().product_id.toString()] != undefined) {
                            const storeData = activityShopData()[rewardData().product_id.toString()];
                            if (storeData.items && storeData.items.length > 1) {
                              storeData.items = storeData.items.filter(v => v.item_id != activityProgress());
                            }
                            return storeData;
                          }
                        };
                        const storeItems = libs.createMemo(() => {
                          let result = {
                            storeItemInfo: undefined,
                            cosmeticID: undefined
                          };
                          let itemData = productInfo();
                          if (itemData != undefined) {
                            itemData.items = itemData.items.filter(data => {
                              return data.item_id != activityProgress();
                            });
                            for (const v of itemData.items) {
                              if (KeyValues.CosmeticsKv[v.item_id]) {
                                result.cosmeticID = v.item_id;
                                break;
                              }
                            }
                            result.storeItemInfo = StoreItem.getStoreItemProps({
                              itemData: itemData,
                              playerOrnament: playerOrnament()
                            });
                            return result;
                          }
                          return result;
                        });
                        const storeItemInfo = () => storeItems().storeItemInfo;
                        const cosmeticID = () => storeItems().cosmeticID;
                        const discount = () => {
                          let info = storeItemInfo();
                          if (info == undefined) return;
                          let res = "";
                          info.labels?.concat().filter((data, index) => {
                            if (data.type == "discount") {
                              res = data.label;
                            }
                          });
                          return res;
                        };
                        const buttonInfo = () => {
                          if (productInfo() != undefined) {
                            const buttonData = getActivityButtonData(productInfo());
                            return buttonData;
                          }
                        };
                        const enabled = () => {
                          return progress() == listIndex;
                        };
                        const productID = () => {
                          return (rewardData()?.product_id ?? 0) != 0 ? rewardData()?.product_id.toString() : rewardData()?.item_id;
                        };
                        const type = () => {
                          if (progress() == listIndex) {
                            return "golden";
                          } else if (productID()) {
                            let index = ornamentList().indexOf(Number(productID()));
                            if (index != -1 && index != ornamentList().length - 1) {
                              return "purple";
                            }
                          }
                          return "normal";
                        };
                        return libs.createComponent(StarryTreasureReward, {
                          get type() {
                            return type();
                          },
                          get index() {
                            return i() - (rewardListSliding() ? 1 : 0);
                          },
                          get discount() {
                            return discount();
                          },
                          rewardId: listIndex + 1,
                          get rewardData() {
                            return rewardData();
                          },
                          get buttonInfo() {
                            return buttonInfo();
                          },
                          get product_id() {
                            return productID();
                          },
                          get cosmetic_id() {
                            return cosmeticID();
                          },
                          get owned() {
                            return storeItemInfo()?.owned;
                          },
                          get className() {
                            return libs.classNames({
                              Light: enabled(),
                              Received: progress() > listIndex
                            });
                          },
                          get received() {
                            return progress() > listIndex;
                          },
                          get buttonEnable() {
                            return enabled();
                          },
                          get redPoint() {
                            return hasFreeRewardRedPoint(rewardData(), listIndex);
                          },
                          onUnlock: () => {
                            if (cooldowning) return;
                            cooldowning = true;
                            $.Schedule(0.2, () => {
                              cooldowning = false;
                            });
                            if (progress() < listIndex) {
                              ErrorMessage("error_unlock_previously_received_reward");
                            } else if (productInfo() == undefined) {
                              callAction("starry_receive_reward", {
                                activity_id: activity_id,
                                reward_id: listIndex + 1
                              });
                            } else {
                              showPopup("StoreBuyItem", {
                                itemData: productInfo(),
                                group: "StoreBuyItem"
                              });
                            }
                          }
                        });
                      }
                    });
                  }
                });
              }
            }));
            return _el$;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardRowBG",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RewardRow",
                get children() {
                  return libs.createComponent(libs.For, {
                    get each() {
                      return displayList();
                    },
                    children: (listIndex, i) => {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        get className() {
                          return libs.classNames("StarryTreasureRewardArrow", "Index" + (i() - (rewardListSliding() ? 1 : 0)));
                        }
                      });
                    }
                  });
                }
              });
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangeContainer",
        hittest: false,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeTitle",
            get children() {
              return [libs.createComponent(EOM_Image.EOM_Image, {
                className: "StarryRewardTitleArrow Left"
              }), libs.createComponent(EOM_Label.EOM_Label, {
                horizontalAlign: "center",
                text: "#Activity_StarryTreasure_Preview"
              }), libs.createComponent(EOM_Image.EOM_Image, {
                className: "StarryRewardTitleArrow Right"
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeList",
            scroll: "x",
            get children() {
              return libs.createComponent(libs.For, {
                get each() {
                  return ornamentList();
                },
                children: (id, i) => {
                  let rewarded = () => {
                    return ornamentListProgess().get(id) == true;
                  };
                  const owned = libs.createMemo(() => {
                    if (player_ornament() && player_ornament()[id.toString()] && player_ornament()[id.toString()].permanent == 1) {
                      return true;
                    }
                    return false;
                  });
                  return libs.createComponent(StarryTreasureExhcangeItem, {
                    get owned() {
                      return owned();
                    },
                    item_id: id,
                    get rewarded() {
                      return rewarded();
                    },
                    get free() {
                      return i() <= 1;
                    },
                    onPreview: id => setPreviewID(id)
                  });
                }
              });
            }
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return previewID() != -1;
        },
        get children() {
          return libs.createComponent(PreviewPage, {
            get previewID() {
              return previewID();
            },
            onPreview: id => setPreviewID(id)
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return showLast();
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("LastRewardGuide", props.activity_id);
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "guideIcon",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "guideImage",
                    get backgroundImage() {
                      return getImagePath(`cosmetics_items/${lastRewardOrnament()}.png`);
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "guideArrow"
              })];
            }
          });
        }
      }), libs.createComponent(EOM_Button.EOM_Button, {
        id: "StarryExchangeButton",
        get className() {
          return $.Language().toLowerCase();
        },
        text: `#Store_Exchange_Button`,
        onactivate: () => setExchangeShow(true)
      }), libs.createComponent(ExchangePage, {
        get show() {
          return exchangeShow();
        },
        exchange_token: 1100062,
        onClose: () => setExchangeShow(false),
        get playerOrnament() {
          return playerOrnament();
        }
      })];
    }
  });
};
const StarryTreasureReward = props => {
  const merged = libs.mergeProps$1({
    type: "normal",
    buttonEnable: false,
    redPoint: false,
    received: false,
    owned: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["rewardData", "product_id", "discount", "onUnlock", "index", "rewardId", "type", "buttonInfo", "limitInfo", "buttonEnable", "redPoint", "received", "cosmetic_id", "owned", "children"]);
  const resolved = libs.children(() => local.children);
  const productID = () => props.product_id;
  const cosmeticData = libs.createMemo(() => {
    return getCosmeticData(local.cosmetic_id);
  });
  const repeatConvertAmount = () => {
    if (cosmeticData()?.rarity == CosmeticRarity.SUPER) {
      return 3000;
    }
    return 0;
  };
  const storeTagPath = libs.createMemo(() => {
    let icon;
    if (cosmeticData()?.slot == OrnamentType.COURIER_SKIN) {
      icon = "520";
    }
    if (cosmeticData()?.slot == OrnamentType.WISP_SKIN) {
      icon = "545";
    }
    if (icon) {
      if (language$2 == "schinese") {
        return getImagePath(`store/cosmetic_tag/${icon}_ch.png`);
      }
      if (language$2 == "russian") {
        return getImagePath(`store/cosmetic_tag/${icon}_ru.png`);
      }
      return getImagePath(`store/cosmetic_tag/${icon}_en.png`);
    }
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
    className: libs.classNames("StarryTreasureReward", "Index" + merged.index, {
      isProduct: merged.type == "golden",
      isEnabled: merged.buttonEnable,
      purple: merged.type == "purple"
    })
  }), {
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardBGBox",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardBG",
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return !merged.buttonEnable && !merged.received;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "RewardLock"
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "RewardLight"
          }), libs.createComponent(GenericPanel.CLabel, {
            id: "RewardTitle",
            get text() {
              return "#" + productID();
            }
          }), libs.createComponent(ProductImage.ProductImage, {
            get itemid() {
              return `${productID()}`;
            },
            get count() {
              return merged.rewardData?.amounts;
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return storeTagPath() != undefined;
            },
            get children() {
              return libs.createComponent(EOM_Image.EOM_Image, {
                id: "ProductTagIcon",
                hittest: false,
                get backgroundImage() {
                  return storeTagPath();
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return merged.limitInfo != undefined;
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "StoreLimit",
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    get className() {
                      return libs.classNames("LimitLabel", language$2);
                    },
                    get text() {
                      return $.Localize("#LimitLabel") + " " + merged.limitInfo;
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return !local.received && props.owned;
            },
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return repeatConvertAmount() > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "RepeatConvertBanner",
                    hittestchildren: false,
                    tooltip_text: "#ItemRepeatConvert_tips",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "left",
                        get children() {
                          return libs.createComponent(EOM_Label.EOM_Label, {
                            text: "#ItemRepeatConvert"
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "right",
                        flowChildren: "right",
                        get children() {
                          return [libs.createComponent(EOM_Icon.EOM_Icon, {
                            size: "32",
                            get src() {
                              return getSrcPath(`tokens/${1100062}.png`);
                            }
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x${repeatConvertAmount()}`;
                            }
                          })];
                        }
                      })];
                    }
                  });
                }
              });
            }
          }), libs.memo(() => resolved())];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "RewardButtonContainer",
        get children() {
          return libs.createComponent(libs.Switch, {
            fallback: () => [libs.createComponent(EOM_Button.EOM_Button, {
              id: "RewardButton",
              text: "#Free",
              enabled: true,
              onactivate: () => {
                merged.onUnlock();
              }
            }), libs.createComponent(libs.Show, {
              get when() {
                return local.redPoint;
              },
              get children() {
                return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                  hittest: false
                });
              }
            })],
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return local.received;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    id: "RewardButton",
                    text: "#activity_receive",
                    enabled: false
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return merged.buttonInfo != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    enabled: true,
                    id: "RewardButton",
                    get text() {
                      return merged.buttonInfo.text ?? "";
                    },
                    get icon() {
                      return merged.buttonInfo?.icon;
                    },
                    onactivate: () => {
                      merged.onUnlock();
                    }
                  });
                }
              })];
            }
          });
        }
      })];
    }
  }));
};
const StarryTreasureExhcangeItem = props => {
  const itemData = () => getCosmeticData(props.item_id);
  const mark = () => getCosmeticMark(props.item_id);
  const rarity = () => itemData()?.rarity ?? CosmeticRarity.DEFAULT;
  const repeatConvertAmount = () => {
    if (rarity() == CosmeticRarity.SUPER) {
      return 3000;
    }
    return 0;
  };
  const storeTagPath = libs.createMemo(() => {
    let icon;
    if (itemData()?.slot == OrnamentType.COURIER_SKIN) {
      icon = "520";
    }
    if (itemData()?.slot == OrnamentType.WISP_SKIN) {
      icon = "545";
    }
    if (icon) {
      if (language$2 == "schinese") {
        return getImagePath(`store/cosmetic_tag/${icon}_ch.png`);
      }
      if (language$2 == "russian") {
        return getImagePath(`store/cosmetic_tag/${icon}_ru.png`);
      }
      return getImagePath(`store/cosmetic_tag/${icon}_en.png`);
    }
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("StarryTreasureExhcangeItem", {
        OwnedConvert: repeatConvertAmount() > 0 && props.owned
      });
    },
    onactivate: () => {
      props.onPreview(props.item_id);
    },
    get children() {
      return [libs.createComponent(libs.Show, {
        get when() {
          return props.rewarded;
        },
        get fallback() {
          return libs.createComponent(libs.Show, {
            get when() {
              return props.owned;
            },
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return repeatConvertAmount() > 0;
                },
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "RepeatConvertBanner",
                    hittestchildren: false,
                    tooltip_text: "#ItemRepeatConvert_tips",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "left",
                        get children() {
                          return libs.createComponent(EOM_Label.EOM_Label, {
                            text: "#ItemRepeatConvert"
                          });
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "right",
                        flowChildren: "right",
                        get children() {
                          return [libs.createComponent(EOM_Icon.EOM_Icon, {
                            size: "32",
                            get src() {
                              return getSrcPath(`tokens/${1100062}.png`);
                            }
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x${repeatConvertAmount()}`;
                            }
                          })];
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Image.EOM_Image, {
                    id: "SoldoutTag"
                  })];
                }
              });
            }
          });
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "StarryTreasureExhcangeItemRewarded"
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.shine;
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "StarryTreasureExhcangeItemShine"
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "StarryTreasureExhcangeItemBg",
        get classList() {
          return {
            "free": props.free == true
          };
        },
        get children() {
          return [libs.createComponent(GenericPanel.CImage, {
            id: "HeroCosmeticImage",
            get src() {
              return getCosmeticImagePath(props.item_id.toString());
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return storeTagPath() != undefined;
            },
            get children() {
              return libs.createComponent(EOM_Image.EOM_Image, {
                id: "ProductTagIcon",
                hittest: false,
                get backgroundImage() {
                  return storeTagPath();
                }
              });
            }
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return mark();
        },
        get children() {
          return libs.createComponent(CosmeticCard.MarkIcon, {
            get mark() {
              return mark();
            }
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.free;
        },
        get children() {
          const _el$2 = libs.createElement("Image", {
            id: "freeIcon",
            get ["class"]() {
              return $.Language().toLowerCase();
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$2, "class", $.Language().toLowerCase(), _$p));
          return _el$2;
        }
      }), libs.createElement("Image", {
        id: "previewIcon"
      }, null), libs.createComponent(libs.Show, {
        get when() {
          return itemData()?.hero;
        },
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            id: "HeroName",
            get text() {
              return "#" + GetHeroNameByGoodID(Number(itemData()?.hero));
            }
          });
        }
      }), libs.createComponent(GenericPanel.CLabel, {
        id: "CosmeticName",
        get text() {
          return "#" + props.item_id;
        }
      })];
    }
  });
};
const PreviewPage = props => {
  const previewID = () => props.previewID;
  const previewCosmeticTagPath = libs.createMemo(() => {
    let icon;
    let cid = previewID();
    if (cid == -1) return;
    let itemData = getCosmeticData(cid);
    if (itemData?.slot == OrnamentType.COURIER_SKIN) {
      icon = "520";
    }
    if (itemData?.slot == OrnamentType.WISP_SKIN) {
      icon = "545";
    }
    if (icon) {
      if (language$2 == "schinese") {
        return getImagePath(`store/cosmetic_tag/${icon}_ch.png`);
      }
      if (language$2 == "russian") {
        return getImagePath(`store/cosmetic_tag/${icon}_ru.png`);
      }
      return getImagePath(`store/cosmetic_tag/${icon}_en.png`);
    }
  });
  return (() => {
    const _el$4 = libs.createElement("Panel", {
        id: "PreviewPanel"
      }, null),
      _el$5 = libs.createElement("Panel", {
        id: "PreviewContainer"
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        id: "PreviewList"
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        id: "PreviewContent"
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "PackName"
      }, _el$7);
      libs.createElement("Image", {
        id: "Divider"
      }, _el$7);
      const _el$1 = libs.createElement("Panel", {
        id: "PreviewPreview"
      }, _el$5),
      _el$10 = libs.createElement("Panel", {
        id: "CosmeticDesc"
      }, _el$1);
    libs.setProp(_el$6, "onactivate", () => {});
    libs.insert(_el$6, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "PreviewListTitle",
      get children() {
        return [libs.createComponent(GenericPanel.CLabel, {
          id: "PreviewListTitleLabel",
          text: "#CosmeticPreview"
        }), libs.createComponent(EOM_Button.EOM_CloseButton, {
          onactivate: () => {
            props.onPreview(-1);
          }
        })];
      }
    }), _el$7);
    libs.insert(_el$8, libs.createComponent(GenericPanel.CLabel, {
      get text() {
        return "#" + previewID();
      }
    }));
    libs.insert(_el$7, libs.createComponent(GenericPanel.CLabel, {
      id: "PackDesc",
      get text() {
        return "#" + previewID() + "_description";
      }
    }), null);
    libs.insert(_el$7, libs.createComponent(EOM_Panel.EOM_Panel, {
      flowChildren: "right",
      horizontalAlign: "center",
      get children() {
        return libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "PackItemList",
          horizontalAlign: "center",
          flowChildren: "right",
          scroll: "x",
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "PreviewItem",
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ProductItemContainer",
                  get children() {
                    return [libs.createComponent(ProductItem.ProductItem, {
                      get itemid() {
                        return previewID();
                      },
                      get rarity() {
                        return getCosmeticRarity(previewID()) ?? 0;
                      }
                    }), libs.createComponent(CosmeticCard.CosmeticImage, {
                      get itemid() {
                        return previewID();
                      },
                      hittest: false,
                      verticalAlign: "center"
                    }), libs.createElement("Panel", {
                      id: "HoverBorder",
                      hittest: false
                    }, null), libs.createComponent(libs.Show, {
                      get when() {
                        return previewCosmeticTagPath() != undefined;
                      },
                      get children() {
                        return libs.createComponent(EOM_Image.EOM_Image, {
                          id: "PreviewTagIcon",
                          hittest: false,
                          get backgroundImage() {
                            return previewCosmeticTagPath();
                          }
                        });
                      }
                    })];
                  }
                });
              }
            });
          }
        });
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return KeyValues.CosmeticsKv[previewID()] != undefined;
          },
          get children() {
            return libs.createComponent(CosmeticPreview.CosmeticPreview, {
              get cosmetic_id() {
                return previewID();
              },
              showPedestal: true,
              showCourierPedestal: true
            });
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return KeyValues.CosmeticsKv[previewID()] == undefined;
          },
          get children() {
            return [libs.createComponent(CosmeticCard.CosmeticImage, {
              className: "CosmeticPreviewImage",
              get itemid() {
                return previewID().toString();
              }
            }), libs.createComponent(ProductImage.ProductImage, {
              className: "CosmeticPreviewImage",
              get itemid() {
                return previewID();
              }
            })];
          }
        })];
      }
    }), _el$10);
    libs.insert(_el$10, libs.createComponent(GenericPanel.CLabel, {
      id: "CosmeticName",
      get text() {
        return '#' + previewID();
      }
    }), null);
    libs.insert(_el$10, libs.createComponent(EOM_Separator.EOM_Separator, {
      size: "short"
    }), null);
    libs.insert(_el$10, libs.createComponent(GenericPanel.CLabel, {
      id: "CosmeticAccess",
      get text() {
        return GetCosmeticAccessDescription(previewID());
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$4, "className", libs.classNames({
      Show: previewID() != -1
    }), _$p));
    return _el$4;
  })();
};
const ExchangePage = props => {
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const playerOrnament = () => props.playerOrnament;
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  libs.createEffect(libs.on(() => props.show, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  libs.onMount(() => {
    let gameEventIDList = [];
    let NetTableIDList = [];
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["DeepSea_1"] ?? [];
      let itemHasCosmetic = item => {
        if (item.title == 3) return false;
        return item?.items?.[0] && KeyValues.CosmeticsKv?.[item.items[0].item_id.toString()] != undefined;
      };
      result.sort((a, b) => {
        if (itemHasCosmetic(a) && itemHasCosmetic(b)) {
          return b.order_by - a.order_by;
        }
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "StarryExchangePage",
    get className() {
      return libs.classNames({
        Show: props.show
      });
    },
    onactivate: () => {},
    get children() {
      return [(() => {
        const _el$11 = libs.createElement("Panel", {
          id: "TopBarBG"
        }, null);
        libs.insert(_el$11, libs.createComponent(Player.CurrencyGroup, {
          get tokens() {
            return [props.exchange_token];
          }
        }));
        return _el$11;
      })(), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "StarryExchangeContainer",
        onactivate: () => props.onClose(),
        get children() {
          return [(() => {
            const _el$12 = libs.createElement("Panel", {
              id: "StarryExchangeList"
            }, null);
            libs.setProp(_el$12, "onactivate", () => {});
            libs.insert(_el$12, libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "StarryExchangeListTitle",
              get children() {
                return [libs.createComponent(GenericPanel.CLabel, {
                  id: "StarryExchangeListTitleLabel",
                  text: "#StarryTreasure_exchange"
                }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                  onactivate: () => {
                    props.onClose();
                  }
                })];
              }
            }), null);
            libs.insert(_el$12, libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "StarryExchangeItemList",
              flowChildren: "right-wrap",
              scroll: "y",
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return props.show;
                  },
                  get children() {
                    return libs.createComponent(libs.Index, {
                      get each() {
                        return storeItemData();
                      },
                      children: (storeItem, index) => {
                        const purchased_num = () => purchased_product()?.[storeItem().id] ?? 0;
                        const owned = () => getCosmeticByStoreItem(storeItem(), playerOrnament()) || getHerobyStoreItem(storeItem(), playerHero());
                        const enable = () => !owned() && (storeItem().limit_type == 0 || purchased_num() < storeItem().limit_count);
                        const cosmetic_id = () => {
                          const current_storeItem = storeItem();
                          if (current_storeItem?.items?.[0]) {
                            const cid = current_storeItem.items[0].item_id.toString();
                            if (KeyValues.CosmeticsKv?.[cid] != undefined) {
                              return current_storeItem.items[0].item_id;
                            }
                            return current_storeItem.items[0].item_id;
                          }
                        };
                        return libs.createComponent(EOM_Panel.EOM_Panel, {
                          get className() {
                            return libs.classNames("StarryExchangeItem", {
                              Disabled: owned(),
                              CanPreview: cosmetic_id() != undefined,
                              Previewing: cosmetic_id() != undefined && previewInfo().cid == cosmetic_id()
                            });
                          },
                          onmouseover: self => {
                            const current_cid = cosmetic_id();
                            const current_eid = storeItem().id;
                            if (current_cid != undefined) {
                              previewTimer = $.Schedule(0.3, () => {
                                previewTimer = -1;
                                if (previewInfo().eid != current_eid) {
                                  setPreviewInfo({
                                    cid: current_cid,
                                    eid: current_eid
                                  });
                                }
                              });
                            }
                          },
                          onmouseout: self => {
                            if (previewTimer != -1) {
                              $.CancelScheduled(previewTimer);
                              previewTimer = -1;
                            }
                          },
                          get children() {
                            return [libs.createComponent(libs.Show, {
                              get when() {
                                return owned();
                              },
                              get children() {
                                return libs.createComponent(EOM_Panel.EOM_Panel, {
                                  className: "Owned"
                                });
                              }
                            }), libs.createComponent(EOM_Panel.EOM_Panel, {
                              id: "ProductItemContainer",
                              get children() {
                                return [libs.createComponent(ProductItem.ProductItem, {
                                  get itemid() {
                                    return storeItem().id;
                                  },
                                  get count() {
                                    return libs.memo(() => storeItem().items.length == 1)() ? storeItem().items[0].amounts : 1;
                                  },
                                  get rarity() {
                                    return storeItem().title;
                                  },
                                  get children() {
                                    return libs.createComponent(libs.Show, {
                                      get when() {
                                        return storeItem().limit_type > 0;
                                      },
                                      get children() {
                                        return libs.createComponent(EOM_Panel.EOM_Panel, {
                                          className: "StoreLimit",
                                          get children() {
                                            return libs.createComponent(GenericPanel.CLabel, {
                                              className: "LimitLabel",
                                              get text() {
                                                return $.Localize("#LimitLabel") + ` ${purchased_num()}/${storeItem().limit_count}`;
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                }), libs.createElement("Panel", {
                                  id: "HoverBorder",
                                  hittest: false
                                }, null)];
                              }
                            }), libs.createComponent(EOM_Button.EOM_Button, {
                              horizontalAlign: "center",
                              get enabled() {
                                return enable();
                              },
                              color: "Light",
                              get text() {
                                return storeItem().real_price;
                              },
                              get icon() {
                                return libs.createComponent(EOM_Image.EOM_Image, {
                                  get src() {
                                    return getPayTypeIconPath(storeItem().pay_type);
                                  },
                                  width: "35px",
                                  height: "35px"
                                });
                              },
                              onactivate: () => {
                                showPopup("StoreBuyItem", {
                                  itemData: storeItem(),
                                  group: "StoreBuyItem"
                                });
                              }
                            }), libs.createComponent(libs.Show, {
                              get when() {
                                return isToolMode();
                              },
                              get children() {
                                return libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "ToolMode",
                                  get children() {
                                    return [libs.createComponent(EOM_Label.EOM_Label, {
                                      align: "center top",
                                      textShadow: "0 0 2px 2 #000000",
                                      color: "white",
                                      get text() {
                                        return storeItem().id;
                                      }
                                    }), libs.createComponent(EOM_Label.EOM_Label, {
                                      align: "right top",
                                      textShadow: "0 0 2px 2 #000000",
                                      marginRight: "10px",
                                      color: "red",
                                      get text() {
                                        return storeItem().order_by;
                                      }
                                    })];
                                  }
                                });
                              }
                            })];
                          }
                        });
                      }
                    });
                  }
                });
              }
            }), null);
            return _el$12;
          })(), (() => {
            const _el$13 = libs.createElement("Panel", {
              id: "StarryExchangePreview"
            }, null);
            libs.insert(_el$13, libs.createComponent(libs.Show, {
              get when() {
                return previewInfo().cid != -1;
              },
              get children() {
                return [libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "StarryExchangePreviewMain",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return KeyValues.CosmeticsKv[previewInfo().cid];
                      },
                      get fallback() {
                        return libs.createComponent(ProductImage.ProductImage, {
                          get itemid() {
                            return previewInfo().cid;
                          }
                        });
                      },
                      get children() {
                        return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                          get cosmetic_id() {
                            return previewInfo().cid;
                          }
                        });
                      }
                    });
                  }
                }), (() => {
                  const _el$14 = libs.createElement("Panel", {
                    id: "CosmeticDesc"
                  }, null);
                  libs.insert(_el$14, libs.createComponent(GenericPanel.CLabel, {
                    id: "CosmeticName",
                    get text() {
                      return '#' + previewInfo().cid;
                    }
                  }), null);
                  libs.insert(_el$14, libs.createComponent(EOM_Separator.EOM_Separator, {
                    size: "short"
                  }), null);
                  libs.insert(_el$14, libs.createComponent(GenericPanel.CLabel, {
                    id: "CosmeticAccess",
                    get text() {
                      return GetCosmeticAccessDescription(previewInfo().cid);
                    }
                  }), null);
                  return _el$14;
                })(), libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid.toString().slice(0, 3) == "531";
                  },
                  get children() {
                    return libs.createComponent(EOM_Button.EOM_Button, {
                      text: "#CosmeticToEquip",
                      align: "center bottom",
                      color: "Blue",
                      marginBottom: "68px",
                      x: "175px",
                      onactivate: () => {
                        ToggleWindows('MenuButton_cosmetics', true);
                        clientSideEvent("jump_to_bunny_cosmetic", {});
                      }
                    });
                  }
                })];
              }
            }));
            return _el$13;
          })()];
        }
      })];
    }
  });
};

const language$1 = $.Language().toLowerCase();
var TIMatchStage = function (TIMatchStage) {
  TIMatchStage[TIMatchStage["GROUP_STAGE"] = 0] = "GROUP_STAGE";
  TIMatchStage[TIMatchStage["KNOCKOUT_STAGE"] = 1] = "KNOCKOUT_STAGE";
  return TIMatchStage;
}(TIMatchStage || {});
var TITeamList = function (TITeamList) {
  TITeamList["Iron Wing"] = "Iron Wing";
  TITeamList["Aurora Gaming"] = "Aurora Gaming";
  TITeamList["BoomBoys"] = "BoomBoys";
  TITeamList["GamerLegion"] = "GamerLegion";
  TITeamList["HULIGANI"] = "HULIGANI";
  TITeamList["LGD Gaming"] = "LGD Gaming";
  TITeamList["Nigma Galaxy"] = "Nigma Galaxy";
  TITeamList["OG"] = "OG";
  TITeamList["Team Falcons"] = "Team Falcons";
  TITeamList["Team Liquid"] = "Team Liquid";
  TITeamList["Team Resilience"] = "Team Resilience";
  TITeamList["Team Spirit"] = "Team Spirit";
  TITeamList["TEAM VISION"] = "TEAM VISION";
  TITeamList["Team Yandex"] = "Team Yandex";
  TITeamList["Vici Gaming"] = "Vici Gaming";
  TITeamList["Xtreme Gaming"] = "Xtreme Gaming";
  return TITeamList;
}(TITeamList || {});
var TeamIDConfig = function (TeamIDConfig) {
  TeamIDConfig[TeamIDConfig["Iron Wing"] = 5755001] = "Iron Wing";
  TeamIDConfig[TeamIDConfig["Aurora Gaming"] = 5755002] = "Aurora Gaming";
  TeamIDConfig[TeamIDConfig["BoomBoys"] = 5755003] = "BoomBoys";
  TeamIDConfig[TeamIDConfig["GamerLegion"] = 5755004] = "GamerLegion";
  TeamIDConfig[TeamIDConfig["HULIGANI"] = 5755005] = "HULIGANI";
  TeamIDConfig[TeamIDConfig["LGD Gaming"] = 5755006] = "LGD Gaming";
  TeamIDConfig[TeamIDConfig["Nigma Galaxy"] = 5755007] = "Nigma Galaxy";
  TeamIDConfig[TeamIDConfig["OG"] = 5755008] = "OG";
  TeamIDConfig[TeamIDConfig["Team Falcons"] = 5755009] = "Team Falcons";
  TeamIDConfig[TeamIDConfig["Team Liquid"] = 5755010] = "Team Liquid";
  TeamIDConfig[TeamIDConfig["Team Resilience"] = 5755011] = "Team Resilience";
  TeamIDConfig[TeamIDConfig["Team Spirit"] = 5755012] = "Team Spirit";
  TeamIDConfig[TeamIDConfig["TEAM VISION"] = 5755013] = "TEAM VISION";
  TeamIDConfig[TeamIDConfig["Team Yandex"] = 5755014] = "Team Yandex";
  TeamIDConfig[TeamIDConfig["Vici Gaming"] = 5755015] = "Vici Gaming";
  TeamIDConfig[TeamIDConfig["Xtreme Gaming"] = 5755016] = "Xtreme Gaming";
  return TeamIDConfig;
}(TeamIDConfig || {});
const GetTeamMedalSrc = team => {
  let id = TeamIDConfig[team] ?? 5750001;
  return getCosmeticImagePath(id.toString());
};
const TiStageTimeConfig = {
  [TIMatchStage.GROUP_STAGE]: {
    start: 1786586400,
    end: 1786896000
  },
  [TIMatchStage.KNOCKOUT_STAGE]: {
    start: 1787191200,
    end: 1787500800
  }
};
const TiMainTeamTime = 1786896000;
const Activity_TIActivity = props => {
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const playerHero = netdata_utils.createPlayerNetData("player_hero", Players.GetLocalPlayer(), {});
  const playerOrnament = netdata_utils.createPlayerNetData("player_ornament", Players.GetLocalPlayer(), {});
  netdata_utils.createNetDataEffect("player_purchased_products", data => {
    setPurchasedProduct(data.purchased_products);
  }, Players.GetLocalPlayer());
  netdata_utils.createNetDataEffect("info_shop_product_group_by_tag", data => {
    const result = data?.["ti15"] ?? [];
    result.sort((a, b) => {
      return a.order_by - b.order_by;
    });
    setStoreItemData(result);
  });
  const [selectedMainTeam, setSelectedMainTeam] = libs.createSignal("");
  const [selectedGroupTeam, setSelectedGroupTeam] = libs.createSignal("");
  const [selectedKnockoutTeam, setSelectedKnockoutTeam] = libs.createSignal("");
  const activity_data = netdata_utils.createPlayerServiceNetTable("ti_bet_data", Players.GetLocalPlayer(), {
    ti_season: -1,
    pick_team: "",
    earned_points: 0,
    claimed_points: 0,
    claimable_points: 0,
    group_stage_team: "",
    knockout_stage_team: ""
  });
  libs.createEffect(libs.on(activity_data, v => {
    if (v.pick_team != "" && v.pick_team != selectedMainTeam()) {
      setSelectedMainTeam(v.pick_team);
    }
    if (v.group_stage_team != "" && v.group_stage_team != selectedGroupTeam()) {
      setSelectedGroupTeam(v.group_stage_team);
    }
    if (v.knockout_stage_team != "" && v.knockout_stage_team != selectedKnockoutTeam()) {
      setSelectedKnockoutTeam(v.knockout_stage_team);
    }
  }));
  const [timeNow, setTimeNow] = libs.createSignal(ServerTimestamp());
  libs.createSignal(TIMatchStage.GROUP_STAGE);
  const teamList = libs.createMemo(() => Object.values(TITeamList));
  const SeasonIsValid = () => activity_data().ti_season == props.ti_season;
  const MainTeamChangeEnable = () => timeNow() < TiMainTeamTime;
  const StageTeamChangeEnable = stage => {
    if (timeNow() < TiStageTimeConfig[stage].start) {
      return true;
    }
    if (timeNow() > TiStageTimeConfig[stage].end) {
      return false;
    }
    if (stage == TIMatchStage.GROUP_STAGE) {
      return activity_data().group_stage_team == "";
    } else if (stage == TIMatchStage.KNOCKOUT_STAGE) {
      return activity_data().knockout_stage_team == "";
    }
    return true;
  };
  const getStageTeam = stage => {
    if (stage == TIMatchStage.GROUP_STAGE) {
      return activity_data().group_stage_team;
    }
    return activity_data().knockout_stage_team;
  };
  const canPickStageTeam = stage => {
    if (!SeasonIsValid()) {
      return false;
    }
    if (StageTeamChangeEnable(stage)) {
      return true;
    }
    return getStageTeam(stage) == "";
  };
  const pickMainTeam = team => {
    if (!SeasonIsValid()) {
      return;
    }
    if (!MainTeamChangeEnable()) {
      return;
    }
    callAction("ti_pick_team", {
      ti_season: props.ti_season,
      pick_team: team
    });
  };
  const pickStageTeam = (stage, team) => {
    if (!SeasonIsValid()) {
      return;
    }
    if (stage == TIMatchStage.GROUP_STAGE) {
      if (!StageTeamChangeEnable(stage) && activity_data().group_stage_team != "") {
        return;
      }
      callAction("ti_pick_group_stage_team", {
        ti_season: props.ti_season,
        pick_team: team
      });
    } else {
      if (!StageTeamChangeEnable(stage) && activity_data().knockout_stage_team != "") {
        return;
      }
      callAction("ti_pick_knockout_stage_team", {
        ti_season: props.ti_season,
        pick_team: team
      });
    }
  };
  const claimPoints = () => {
    if (activity_data().claimable_points <= 0) {
      return;
    }
    callAction("ti_receive_points", {
      ti_season: props.ti_season
    });
  };
  const confirmPickMainTeam = team => {
    if (!SeasonIsValid() || !MainTeamChangeEnable()) {
      return;
    }
    showPopup("Confrim", {
      title: "#Activity_TIActivity_SelectHomeTeam",
      msg: "#Activity_TIActivity_PickMainTeamConfirm",
      callback: () => pickMainTeam(team)
    });
  };
  const confirmPickStageTeam = (stage, team) => {
    if (!canPickStageTeam(stage)) {
      return;
    }
    showPopup("Confrim", {
      title: stage == TIMatchStage.GROUP_STAGE ? "#Activity_TIActivity_Stage_Group" : "#Activity_TIActivity_Stage_Knockout",
      msg: "#Activity_TIActivity_PickStageTeamConfirm",
      callback: () => pickStageTeam(stage, team)
    });
  };
  libs.createMemo(() => {
    const data = activity_data();
    if (data.earned_points <= 0) {
      return 0;
    }
    return Math.min(100, Math.round(data.claimed_points / data.earned_points * 100));
  });
  libs.onMount(() => {
    let timer = setInterval(() => {
      setTimeNow(ServerTimestamp());
    }, 1000);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected
      }, language$1);
    },
    id: "Activity_TIActivity",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: 1100204
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "RuleTitle",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "50px",
            height: "50px",
            get src() {
              return getSrcPath("peakcup/d3_star.png");
            }
          }), libs.createComponent(EOM_Label.EOM_Label, {
            id: "RuleTitleLabel",
            text: "#Activity_TIActivity_Title"
          }), libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "50px",
            height: "50px",
            get src() {
              return getSrcPath("peakcup/d3_star.png");
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ActivityMainWrap",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "TeamSelectWrap",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TiPickBody",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "TiPickSection",
                    id: "MainTeamSection",
                    flowChildren: "down",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "TiSectionTitleRow",
                        flowChildren: "down",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            className: "TiSectionTitle",
                            text: "#Activity_TIActivity_SelectHomeTeam"
                          }), libs.createComponent(libs.Show, {
                            get when() {
                              return MainTeamChangeEnable();
                            },
                            get fallback() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "TiSectionLocked",
                                text: "#Activity_TIActivity_Expired"
                              });
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                className: "TiCountdown",
                                flowChildren: "right",
                                get children() {
                                  return [libs.createComponent(EOM_Icon.EOM_Icon, {
                                    width: "18px",
                                    height: "18px",
                                    get src() {
                                      return getSrcPath("activity/elves_dance/t3_icon_time.png");
                                    }
                                  }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                    endTime: TiMainTeamTime,
                                    text: "#countdown_time",
                                    server_time: true
                                  })];
                                }
                              });
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "TiSelectedInfo",
                        get children() {
                          return libs.createComponent(libs.Show, {
                            get when() {
                              return selectedMainTeam() != "";
                            },
                            get fallback() {
                              return libs.createComponent(EOM_Image.EOM_Image, {
                                get className() {
                                  return libs.classNames("TiSelectedTeamLogo", "Unselect");
                                },
                                src: "s2r://panorama/images/events/international_2026/artwork/shield_outline.vsvg"
                              });
                            },
                            get children() {
                              return libs.createComponent(EOM_Image.EOM_Image, {
                                get className() {
                                  return libs.classNames("TiSelectedTeamLogo");
                                },
                                get src() {
                                  return GetTeamMedalSrc(selectedMainTeam());
                                }
                              });
                            }
                          });
                        }
                      }), libs.createElement("Label", {
                        id: "MainTeamTitle",
                        text: "#Activity_TIActivity_MainTeamTitle"
                      }, null), (() => {
                        const _el$2 = libs.createElement("Panel", {}, null);
                        libs.setProp(_el$2, "style", {
                          horizontalAlign: "center"
                        });
                        libs.insert(_el$2, libs.createComponent(GenericPanel.DynamicKey, {
                          key: () => activity_data().pick_team,
                          children: key => libs.createComponent(EOM_DropDown.EOM_DropDown, {
                            id: "MainTeamDropDown",
                            get index() {
                              return libs.memo(() => teamList().indexOf(key) == -1)() ? undefined : teamList().indexOf(key);
                            },
                            placeholder: "#Activity_TIActivity_SelectHomeTeam",
                            get enable() {
                              return libs.memo(() => activity_data().pick_team == "")() && MainTeamChangeEnable();
                            },
                            onChange: (index, item) => {
                              setSelectedMainTeam(teamList()[index]);
                            },
                            onClear: () => {
                              setSelectedMainTeam("");
                            },
                            get children() {
                              return libs.createComponent(libs.For, {
                                get each() {
                                  return teamList();
                                },
                                children: team => {
                                  return (() => {
                                    const _el$7 = libs.createElement("Label", {
                                      text: team
                                    }, null);
                                    libs.setProp(_el$7, "text", team);
                                    return _el$7;
                                  })();
                                }
                              });
                            }
                          })
                        }), null);
                        libs.insert(_el$2, libs.createComponent(libs.Show, {
                          get when() {
                            return libs.memo(() => !!MainTeamChangeEnable())() && selectedMainTeam() == "";
                          },
                          get children() {
                            return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                              marginTop: "6px",
                              hittest: false
                            });
                          }
                        }), null);
                        return _el$2;
                      })(), libs.createComponent(libs.Show, {
                        get when() {
                          return activity_data().pick_team == "";
                        },
                        get children() {
                          const _el$3 = libs.createElement("Panel", {}, null);
                          libs.setProp(_el$3, "style", {
                            horizontalAlign: "center"
                          });
                          libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_Button, {
                            "class": "TeamSelectConfirmButton",
                            text: "#Popup_Button_Confirm",
                            color: "Blue",
                            get enabled() {
                              return libs.memo(() => selectedMainTeam() != "")() && MainTeamChangeEnable();
                            },
                            onactivate: self => {
                              let p = self;
                              p.enabled = false;
                              $.Schedule(0.2, () => {
                                if (p?.IsValid()) {
                                  p.enabled = true;
                                }
                              });
                              confirmPickMainTeam(selectedMainTeam());
                            }
                          }), null);
                          libs.insert(_el$3, libs.createComponent(libs.Show, {
                            get when() {
                              return libs.memo(() => !!MainTeamChangeEnable())() && selectedMainTeam() != "";
                            },
                            get children() {
                              return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                marginTop: "6px",
                                hittest: false
                              });
                            }
                          }), null);
                          return _el$3;
                        }
                      })];
                    }
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "TiPickSection",
                    id: "GuessTeamSection",
                    flowChildren: "down",
                    horizontalAlign: "right",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "TiSectionTitleRow",
                        flowChildren: "down",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            className: "TiSectionTitle",
                            text: "#Activity_TIActivity_Stage_Group"
                          }), libs.createComponent(libs.Show, {
                            get when() {
                              return StageTeamChangeEnable(TIMatchStage.GROUP_STAGE);
                            },
                            get fallback() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "TiSectionLocked",
                                text: "#Activity_TIActivity_Expired"
                              });
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                className: "TiCountdown",
                                flowChildren: "right",
                                get children() {
                                  return [libs.createComponent(EOM_Icon.EOM_Icon, {
                                    width: "18px",
                                    height: "18px",
                                    get src() {
                                      return getSrcPath("activity/elves_dance/t3_icon_time.png");
                                    }
                                  }), libs.createComponent(libs.Show, {
                                    get when() {
                                      return timeNow() < TiStageTimeConfig[TIMatchStage.GROUP_STAGE].start;
                                    },
                                    get fallback() {
                                      return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                        get endTime() {
                                          return TiStageTimeConfig[TIMatchStage.GROUP_STAGE].end;
                                        },
                                        text: "#countdown_time",
                                        server_time: true
                                      });
                                    },
                                    get children() {
                                      return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                        get endTime() {
                                          return TiStageTimeConfig[TIMatchStage.GROUP_STAGE].start;
                                        },
                                        text: "#countdown_time",
                                        server_time: true
                                      });
                                    }
                                  })];
                                }
                              });
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        flowChildren: "down",
                        horizontalAlign: "center",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            className: "TiSelectedTeam",
                            get text() {
                              return $.Localize("#Activity_TIActivity_SelectedTeam") + activity_data().group_stage_team;
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            horizontalAlign: "center",
                            flowChildren: "right",
                            get children() {
                              return [(() => {
                                const _el$4 = libs.createElement("Panel", {}, null);
                                libs.setProp(_el$4, "style", {
                                  verticalAlign: "center"
                                });
                                libs.insert(_el$4, libs.createComponent(GenericPanel.DynamicKey, {
                                  key: () => activity_data().group_stage_team,
                                  children: key => libs.createComponent(EOM_DropDown.EOM_DropDown, {
                                    id: "StageDropDown",
                                    verticalAlign: "center",
                                    get index() {
                                      return libs.memo(() => teamList().indexOf(key) == -1)() ? undefined : teamList().indexOf(key);
                                    },
                                    placeholder: "#Activity_TIActivity_NotSelected",
                                    get enable() {
                                      return StageTeamChangeEnable(TIMatchStage.GROUP_STAGE);
                                    },
                                    onChange: (index, item) => {
                                      setSelectedGroupTeam(teamList()[index]);
                                    },
                                    onClear: () => {
                                      setSelectedGroupTeam("");
                                    },
                                    get children() {
                                      return libs.createComponent(libs.For, {
                                        get each() {
                                          return teamList();
                                        },
                                        children: team => {
                                          return (() => {
                                            const _el$8 = libs.createElement("Label", {
                                              text: team
                                            }, null);
                                            libs.setProp(_el$8, "text", team);
                                            return _el$8;
                                          })();
                                        }
                                      });
                                    }
                                  })
                                }), null);
                                libs.insert(_el$4, libs.createComponent(libs.Show, {
                                  get when() {
                                    return libs.memo(() => selectedGroupTeam() == "")() && StageTeamChangeEnable(TIMatchStage.GROUP_STAGE);
                                  },
                                  get children() {
                                    return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                      hittest: false
                                    });
                                  }
                                }), null);
                                return _el$4;
                              })(), libs.createComponent(libs.Show, {
                                get when() {
                                  return StageTeamChangeEnable(TIMatchStage.GROUP_STAGE);
                                },
                                get children() {
                                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                                    verticalAlign: "center",
                                    get children() {
                                      return [libs.createComponent(EOM_Button.EOM_Button, {
                                        horizontalAlign: "center",
                                        "class": "TeamSelectConfirmButton Stage",
                                        get text() {
                                          return activity_data().group_stage_team == "" ? "#Popup_Button_Confirm" : "#Activity_TIActivity_TeamChange";
                                        },
                                        color: "Blue",
                                        get enabled() {
                                          return libs.memo(() => selectedGroupTeam() != "")() && StageTeamChangeEnable(TIMatchStage.GROUP_STAGE);
                                        },
                                        onactivate: self => {
                                          let p = self;
                                          p.enabled = false;
                                          $.Schedule(0.2, () => {
                                            if (p?.IsValid()) {
                                              p.enabled = true;
                                            }
                                          });
                                          if (selectedGroupTeam() != activity_data().group_stage_team) {
                                            confirmPickStageTeam(TIMatchStage.GROUP_STAGE, selectedGroupTeam());
                                          }
                                        }
                                      }), libs.createComponent(libs.Show, {
                                        get when() {
                                          return libs.memo(() => !!(StageTeamChangeEnable(TIMatchStage.GROUP_STAGE) && selectedGroupTeam() != ""))() && activity_data().group_stage_team == "";
                                        },
                                        get children() {
                                          return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                            marginTop: "6px",
                                            hittest: false
                                          });
                                        }
                                      })];
                                    }
                                  });
                                }
                              })];
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        className: "TiSectionTitleRow",
                        marginTop: "40px",
                        flowChildren: "down",
                        verticalAlign: "bottom",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            className: "TiSectionTitle",
                            text: "#Activity_TIActivity_Stage_Knockout"
                          }), libs.createComponent(libs.Show, {
                            get when() {
                              return StageTeamChangeEnable(TIMatchStage.KNOCKOUT_STAGE);
                            },
                            get fallback() {
                              return libs.createComponent(EOM_Label.EOM_Label, {
                                className: "TiSectionLocked",
                                text: "#Activity_TIActivity_Expired"
                              });
                            },
                            get children() {
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                className: "TiCountdown",
                                flowChildren: "right",
                                get children() {
                                  return [libs.createComponent(EOM_Icon.EOM_Icon, {
                                    width: "18px",
                                    height: "18px",
                                    get src() {
                                      return getSrcPath("activity/elves_dance/t3_icon_time.png");
                                    }
                                  }), libs.createComponent(libs.Show, {
                                    get when() {
                                      return timeNow() < TiStageTimeConfig[TIMatchStage.KNOCKOUT_STAGE].start;
                                    },
                                    get fallback() {
                                      return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                        get endTime() {
                                          return TiStageTimeConfig[TIMatchStage.KNOCKOUT_STAGE].end;
                                        },
                                        text: "#countdown_time",
                                        server_time: true
                                      });
                                    },
                                    get children() {
                                      return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                        get endTime() {
                                          return TiStageTimeConfig[TIMatchStage.KNOCKOUT_STAGE].start;
                                        },
                                        text: "#countdown_time",
                                        server_time: true
                                      });
                                    }
                                  })];
                                }
                              });
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        flowChildren: "down",
                        horizontalAlign: "center",
                        get children() {
                          return [libs.createComponent(EOM_Label.EOM_Label, {
                            className: "TiSelectedTeam",
                            get text() {
                              return $.Localize("#Activity_TIActivity_SelectedTeam") + activity_data().knockout_stage_team;
                            }
                          }), libs.createComponent(EOM_Panel.EOM_Panel, {
                            horizontalAlign: "center",
                            flowChildren: "right",
                            get children() {
                              return [(() => {
                                const _el$5 = libs.createElement("Panel", {}, null);
                                libs.setProp(_el$5, "style", {
                                  verticalAlign: "center"
                                });
                                libs.insert(_el$5, libs.createComponent(GenericPanel.DynamicKey, {
                                  key: () => activity_data().knockout_stage_team,
                                  children: key => libs.createComponent(EOM_DropDown.EOM_DropDown, {
                                    id: "StageDropDown",
                                    verticalAlign: "center",
                                    get index() {
                                      return libs.memo(() => teamList().indexOf(key) == -1)() ? undefined : teamList().indexOf(key);
                                    },
                                    placeholder: "#Activity_TIActivity_NotSelected",
                                    get enable() {
                                      return StageTeamChangeEnable(TIMatchStage.KNOCKOUT_STAGE);
                                    },
                                    onChange: (index, item) => {
                                      setSelectedKnockoutTeam(teamList()[index]);
                                    },
                                    onClear: () => {
                                      setSelectedKnockoutTeam("");
                                    },
                                    get children() {
                                      return libs.createComponent(libs.For, {
                                        get each() {
                                          return teamList();
                                        },
                                        children: team => {
                                          return (() => {
                                            const _el$9 = libs.createElement("Label", {
                                              text: team
                                            }, null);
                                            libs.setProp(_el$9, "text", team);
                                            return _el$9;
                                          })();
                                        }
                                      });
                                    }
                                  })
                                }), null);
                                libs.insert(_el$5, libs.createComponent(libs.Show, {
                                  get when() {
                                    return libs.memo(() => selectedKnockoutTeam() == "")() && StageTeamChangeEnable(TIMatchStage.KNOCKOUT_STAGE);
                                  },
                                  get children() {
                                    return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                      hittest: false
                                    });
                                  }
                                }), null);
                                return _el$5;
                              })(), libs.createComponent(libs.Show, {
                                get when() {
                                  return StageTeamChangeEnable(TIMatchStage.KNOCKOUT_STAGE);
                                },
                                get children() {
                                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                                    verticalAlign: "center",
                                    get children() {
                                      return [libs.createComponent(EOM_Button.EOM_Button, {
                                        horizontalAlign: "center",
                                        "class": "TeamSelectConfirmButton Stage",
                                        get text() {
                                          return activity_data().knockout_stage_team == "" ? "#Popup_Button_Confirm" : "#Activity_TIActivity_TeamChange";
                                        },
                                        color: "Blue",
                                        get enabled() {
                                          return libs.memo(() => selectedKnockoutTeam() != "")() && StageTeamChangeEnable(TIMatchStage.KNOCKOUT_STAGE);
                                        },
                                        onactivate: self => {
                                          let p = self;
                                          p.enabled = false;
                                          $.Schedule(0.2, () => {
                                            if (p?.IsValid()) {
                                              p.enabled = true;
                                            }
                                          });
                                          if (selectedKnockoutTeam() != activity_data().knockout_stage_team) {
                                            confirmPickStageTeam(TIMatchStage.KNOCKOUT_STAGE, selectedKnockoutTeam());
                                          }
                                        }
                                      }), libs.createComponent(libs.Show, {
                                        get when() {
                                          return libs.memo(() => !!(StageTeamChangeEnable(TIMatchStage.KNOCKOUT_STAGE) && selectedKnockoutTeam() != ""))() && activity_data().knockout_stage_team == "";
                                        },
                                        get children() {
                                          return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                                            marginTop: "6px",
                                            hittest: false
                                          });
                                        }
                                      })];
                                    }
                                  });
                                }
                              })];
                            }
                          })];
                        }
                      })];
                    }
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "TiRedemption",
                flowChildren: "right",
                get children() {
                  return [(() => {
                    const _el$6 = libs.createElement("Label", {
                      id: "TiRedemptionLabel",
                      text: "#Activity_TIActivity_ScoreGain",
                      get dialogVariables() {
                        return {
                          score: activity_data().claimable_points
                        };
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$6, "dialogVariables", {
                      score: activity_data().claimable_points
                    }, _$p));
                    return _el$6;
                  })(), libs.createComponent(EOM_Panel.EOM_Panel, {
                    get children() {
                      return [libs.createComponent(EOM_Button.EOM_Button, {
                        text: "#activity_action_receive",
                        get enabled() {
                          return activity_data().claimable_points > 0;
                        },
                        onactivate: self => {
                          let p = self;
                          p.enabled = false;
                          $.Schedule(0.2, () => {
                            if (p?.IsValid()) {
                              p.enabled = true;
                            }
                          });
                          claimPoints();
                        }
                      }), libs.createComponent(libs.Show, {
                        get when() {
                          return activity_data().claimable_points > 0;
                        },
                        get children() {
                          return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                            marginTop: "2px",
                            hittest: false
                          });
                        }
                      })];
                    }
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ActivityRules",
            flowChildren: "down",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RulesTitle",
                flowChildren: "right",
                get children() {
                  return [libs.createComponent(EOM_Icon.EOM_Icon, {
                    width: "36px",
                    height: "36px",
                    get src() {
                      return getSrcPath("peakcup/d3_star.png");
                    }
                  }), libs.createComponent(EOM_Label.EOM_Label, {
                    id: "RulesTitleLabel",
                    text: "#Activity_TIActivity_Rules"
                  })];
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "RulesList",
                scroll: "y",
                get children() {
                  return libs.createComponent(EOM_Label.EOM_Label, {
                    className: "TiRuleLine",
                    text: "#Activity_TIActivity_Rule",
                    html: true
                  });
                }
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangeWrap",
        flowChildren: "down",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeTitleRow",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                id: "ExchangeTitle",
                text: "#Activity_TIActivity_Exchange"
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeBody",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ExchangeCards",
                flowChildren: "right",
                scroll: "x",
                get children() {
                  return libs.createComponent(libs.Index, {
                    get each() {
                      return storeItemData();
                    },
                    children: (storeItem, index) => {
                      return libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                        storeItem: storeItem(),
                        purchased_product: purchased_product(),
                        player_hero: playerHero(),
                        player_ornament: playerOrnament()
                      })));
                    }
                  });
                }
              });
            }
          })];
        }
      })];
    }
  });
};

let fFlipTime = 0.5;
const language = $.Language().toLowerCase();
const [singleCost] = libs.createSignal(1);
const [rewardShow, setRewardShow] = libs.createSignal(false);
const [rewardList, setRewardList] = libs.createSignal([]);
const [drawButtonEnable, setDrawButtonEnable] = libs.createSignal(true);
const [info_box_content, setInfoBoxContent] = libs.createSignal();
const [drawSuccess, setDrawSuccess] = libs.createSignal(false);
const [drawEnd, setDrawEnd] = libs.createSignal(false);
const [drawSoundIndex, setDrawSoundIndex] = libs.createSignal(-1);
const [ultimateSkinClaimedInSession, setUltimateSkinClaimedInSession] = libs.createSignal(false);
const [awakeRewardClaimedInSession, setAwakeRewardClaimedInSession] = libs.createSignal(false);
libs.createEffect(libs.on(rewardList, _rewardList => {
  if (_rewardList.length == 0 && rewardShow()) {
    setRewardShow(false);
  }
}));
const getRarity = (itemID, amount) => {
  let rarity = 0;
  let gotten = false;
  let type = Number(itemID.toString().slice(0, 3));
  let content = info_box_content();
  if (content) {
    for (const v of content) {
      if (v.item_id == itemID) {
        if (type == 110) {
          if (amount >= v.amount_min && amount <= v.amount_max) {
            if (v.rarity == "n") {
              rarity = 0;
              gotten = true;
            } else if (v.rarity == "r") {
              rarity = 1;
              gotten = true;
            } else if (v.rarity == "sr") {
              rarity = 2;
              gotten = true;
            } else if (v.rarity == "ssr") {
              rarity = 3;
              gotten = true;
            }
          }
        } else {
          if (v.rarity == "n") {
            rarity = 0;
            gotten = true;
          } else if (v.rarity == "r") {
            rarity = 1;
            gotten = true;
          } else if (v.rarity == "sr") {
            rarity = 2;
            gotten = true;
          } else if (v.rarity == "ssr") {
            rarity = 3;
            gotten = true;
          }
        }
        if (gotten) break;
      }
    }
    return rarity;
  }
};
const activityPool = 99100010;
const boxID = 2000095;
const exchangeTokenID = 1100064;
const awakeningTokenID = 1100254;
const awakeningSkinID = 5100074;
const awakeRewardSkinID = 5100075;
const balanceMaximum = 160;
const heroSceneMapNormal = "scene/yange_activity.vmap";
const heroSceneMapTransformed = "scene/yange_normal_activity.vmap";
const heroSceneMapTransformedUlt = "scene/yange_ult_activity.vmap";
const Activity_yange = props => {
  const show = () => props.show;
  const activityToken = boxID;
  const activityID = props.activity_id;
  const [activityCollection, setActivityCollection] = libs.createSignal({});
  const [endtime, setEndtime] = libs.createSignal(1787846400);
  const [boxToken, setBoxToken] = libs.createSignal(0);
  const [progress, setProgress] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal([]);
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [playerHero, setPlayerHero] = libs.createSignal({});
  const [willHeroTooltip] = libs.createSignal(false);
  const [showHeroTooltip] = libs.createSignal(true);
  libs.createEffect(() => {
    if (showHeroTooltip() && willHeroTooltip()) {
      showHeroInfo();
    } else {
      hideHeroInfo();
    }
  });
  const updateBoxContent = () => {
    const info_box_pool_data = getNetDataCache("info_box_pool_data");
    const info_box_content = getNetDataCache("info_box_content");
    if (info_box_pool_data && info_box_content) {
      const dropName = info_box_pool_data.find(v => v.pool == activityPool)?.drop_content;
      if (dropName && info_box_content[dropName]) {
        setInfoBoxContent(info_box_content[dropName]);
      }
    }
  };
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  const [luck, setLuck] = libs.createSignal(0);
  const nextUpNeedCount = libs.createMemo(() => {
    if (luck() == 0) {
      return 180;
    }
    return Math.max(1, 180 - luck() + 1);
  });
  const [boxAmounts, setBoxAmounts] = libs.createSignal(0);
  const [ultimateSkinId, setUltimateSkinId] = libs.createSignal(5100075);
  const balanceMax = () => balanceMaximum;
  const [storedBalanceValue, setStoredBalanceValue] = libs.createSignal(0);
  const [ultimateClaiming, setUltimateClaiming] = libs.createSignal(false);
  const [awakeRewardClaiming, setAwakeRewardClaiming] = libs.createSignal(false);
  const [awakeRewardReceived, setAwakeRewardReceived] = libs.createSignal(getNetDataCache("player_ultimate_skin_rewards", Players.GetLocalPlayer())?.some(v => v.ultimate_skin_id == awakeRewardSkinID && v.awake_reward_received === true) ?? false);
  const [showRuneTips, setShowRuneTips] = libs.createSignal(false);
  const awakeningSkinOwned = libs.createMemo(() => Object.values(playerOrnament()).some(v => v.oid == awakeningSkinID));
  const isAwakened = libs.createMemo(() => awakeningSkinOwned());
  const balanceValue = libs.createMemo(() => isAwakened() ? storedBalanceValue() : 0);
  const balancePercent = libs.createMemo(() => Math.min(100, balanceValue() / balanceMax() * 100));
  const ultimateSkinOwned = libs.createMemo(() => Object.values(playerOrnament()).some(v => v.oid == ultimateSkinId()));
  const ultimateClaimed = libs.createMemo(() => ultimateSkinOwned() || ultimateSkinClaimedInSession());
  const ultimateClaimable = libs.createMemo(() => isAwakened() && balanceValue() >= balanceMax() && !ultimateClaimed());
  const ultimateClaimEnabled = libs.createMemo(() => ultimateClaimable() && !ultimateClaiming());
  const awakeRewardClaimed = libs.createMemo(() => awakeRewardReceived() || awakeRewardClaimedInSession());
  const awakeRewardClaimable = libs.createMemo(() => isAwakened() && !awakeRewardClaimed());
  const awakeRewardClaimEnabled = libs.createMemo(() => awakeRewardClaimable() && !awakeRewardClaiming());
  const [heroSceneMap, setHeroSceneMap] = libs.createSignal(heroSceneMapNormal);
  let heroSceneAwakened;
  libs.createEffect(libs.on(isAwakened, awakened => {
    if (heroSceneAwakened == awakened) {
      return;
    }
    heroSceneAwakened = awakened;
    setHeroSceneMap(awakened ? heroSceneMapTransformedUlt : heroSceneMapNormal);
  }));
  const toggleHeroScene = () => {
    const currentSceneMap = heroSceneMap();
    setHeroSceneMap(currentSceneMap == heroSceneMapNormal ? heroSceneMapTransformed : currentSceneMap == heroSceneMapTransformed ? heroSceneMapTransformedUlt : heroSceneMapNormal);
  };
  const heroSceneButtonText = () => heroSceneMap() == heroSceneMapNormal ? "#Normal_Transformed" : heroSceneMap() == heroSceneMapTransformed ? "#Awake_Transformed" : "#Activity_yange_revert";
  const updateUltimateSkin = (poolData = getNetDataCache("info_box_pool_data"), skinConfig = getNetDataCache("info_ultimate_skin")) => {
    const sid = poolData?.find(v => v.pool == activityPool)?.ultimate_skin_id;
    const poolConfig = sid == undefined ? undefined : skinConfig?.[sid];
    const config = poolConfig?.token_id == awakeningTokenID ? poolConfig : Object.values(skinConfig ?? {}).find(v => v.token_id == awakeningTokenID);
    if (config == undefined) {
      $.Msg(`[yange awakening] config missing: pool=${activityPool}, poolSid=${sid}, token=${awakeningTokenID}, poolData=${poolData != undefined}, skinConfig=${skinConfig != undefined}`);
      return;
    }
    const skinId = Number(config.id);
    $.Msg(`[yange awakening] config loaded: skin=${skinId}, token=${config.token_id}, max=${balanceMax()}, awakeningSkin=${awakeningSkinID}, poolSid=${sid}`);
    setUltimateSkinId(skinId);
    setStoredBalanceValue(value => Math.max(0, Math.min(value, balanceMax())));
  };
  const updateBalanceValue = (tokenData = getNetDataCache("player_token", Players.GetLocalPlayer())) => {
    if (tokenData) {
      const entry = tokenData[awakeningTokenID] ?? Object.values(tokenData).find(v => v.token_id == awakeningTokenID);
      const rawValue = Number(entry?.num ?? 0);
      const value = Math.max(0, Math.min(rawValue, balanceMax()));
      $.Msg(`[yange awakening] player token: token=${awakeningTokenID}, rawValue=${rawValue}, value=${value}, max=${balanceMax()}, directKey=${tokenData[awakeningTokenID] != undefined}, entryFound=${entry != undefined}`);
      setStoredBalanceValue(value);
    } else {
      $.Msg(`[yange awakening] player_token missing: player=${Players.GetLocalPlayer()}, token=${awakeningTokenID}`);
    }
  };
  libs.createEffect(() => {
    $.Msg(`[yange awakening] state: value=${balanceValue()}, awakened=${isAwakened()}, awakeningSkinOwned=${awakeningSkinOwned()}, ultimateOwned=${ultimateSkinOwned()}, claimed=${ultimateClaimed()}, claimable=${ultimateClaimable()}, scene=${heroSceneMap()}`);
  });
  const addBalanceValue = amount => {
    if (!isAwakened()) {
      return;
    }
    const tokenData = getNetDataCache("player_token", Players.GetLocalPlayer());
    const entry = tokenData?.[awakeningTokenID] ?? Object.values(tokenData ?? {}).find(v => v.token_id == awakeningTokenID);
    const total = Math.max(0, Math.min(Math.max(balanceValue(), Number(entry?.num ?? 0)) + amount, balanceMax()));
    if (tokenData) {
      if (entry) {
        entry.num = total;
      } else {
        tokenData[awakeningTokenID] = {
          token_id: awakeningTokenID,
          num: total
        };
      }
    }
    setStoredBalanceValue(total);
  };
  const claimUltimateSkin = () => {
    if (!ultimateClaimable() || ultimateClaiming()) {
      return;
    }
    setUltimateClaiming(true);
    $.Msg(`[yange awakening] claim request: skin=${ultimateSkinId()}, value=${balanceValue()}, max=${balanceMax()}`);
    serverRequest("box_ultimate_skin_max_reward", {
      ultimate_skin_id: ultimateSkinId()
    }, data => {
      setUltimateClaiming(false);
      $.Msg(`[yange awakening] claim response: status=${data.status}, rewardCount=${data.data?.length ?? 0}`);
      if (data.status == 0) {
        setUltimateSkinClaimedInSession(true);
        if (data.data?.length > 0) {
          addItemMessage(data.data.map(v => ({
            itemId: v.itemId.toString(),
            amounts: v.amounts
          })));
        }
      }
    });
  };
  const claimAwakeReward = () => {
    if (!awakeRewardClaimable() || awakeRewardClaiming()) {
      return;
    }
    setAwakeRewardClaiming(true);
    $.Msg(`[yange awakening] awake reward request: ultimate_skin_id=${awakeRewardSkinID}`);
    serverRequest("box_ultimate_skin_awake_reward", {
      ultimate_skin_id: awakeRewardSkinID
    }, data => {
      setAwakeRewardClaiming(false);
      $.Msg(`[yange awakening] awake reward response: status=${data.status}, rewardCount=${data.data?.length ?? 0}`);
      if (data.status == 0) {
        setAwakeRewardClaimedInSession(true);
        setAwakeRewardReceived(true);
        if (data.data?.length > 0) {
          addItemMessage(data.data.map(v => ({
            itemId: v.itemId.toString(),
            amounts: v.amounts
          })));
        }
      }
    });
  };
  libs.onMount(() => {
    callAction("box_luck", {
      bid: boxID,
      pool: activityPool
    });
    updateUltimateSkin();
    updateBalanceValue();
    let gameEventIDList = [];
    let NetTableIDList = [];
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    gameEventIDList.push(useNetData("player_box_luck", data => {
      if (data && data[activityPool]) {
        setLuck(data[activityPool].luck);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("open_box_activity_data", data => {
      if (data[activityID]) {
        if (data[activityID]?.rewards != undefined) {
          setActivityCollection(data[activityID].rewards);
        }
        setProgress(data[activityID]?.progress ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("player_props", data => {
      if (data) {
        setBoxAmounts(Object.values(data).find(v => v.prop_id == 9314005 && v.amounts > 0)?.amounts ?? 0);
      }
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == activityID && activityInfo.extra_information) {
          const reward = JSON.parse(activityInfo.extra_information);
          setEndtime(reward.activity_end_time);
        }
      }
    }));
    gameEventIDList.push(useNetData("info_box_content", data => {
      updateBoxContent();
    }));
    gameEventIDList.push(useNetData("info_box_pool_data", data => {
      updateBoxContent();
      updateUltimateSkin(data);
    }));
    gameEventIDList.push(useNetData("info_ultimate_skin", data => {
      updateUltimateSkin(getNetDataCache("info_box_pool_data"), data);
    }));
    gameEventIDList.push(useNetData("player_token", data => {
      updateBalanceValue(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("player_ultimate_skin_rewards", data => {
      setAwakeRewardReceived(data?.some(v => v.ultimate_skin_id == awakeRewardSkinID && v.awake_reward_received === true) ?? false);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("player_boxes", data => {
      setBoxToken(data[boxID]?.amounts ?? 0);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product_group_by_tag", data => {
      const result = data?.["tb"] ?? [];
      result.sort((a, b) => {
        return a.order_by - b.order_by;
      });
      setStoreItemData(result);
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
      const owned = Object.values(data ?? {}).some(v => v.oid == ultimateSkinId());
      $.Msg(`[yange awakening] player ornament: skin=${ultimateSkinId()}, owned=${owned}, count=${Object.keys(data ?? {}).length}`);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const [willSkip, setWillSkip] = libs.createSignal(false);
  let pDrawWindow;
  let BGButtonLists;
  let BGLayer;
  let BG2;
  let Hero;
  let Content1;
  let Content2;
  let Content3;
  let Content4;
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (itemID.toString().startsWith("931") && KeyValues.BackpackKv[itemID]) {
        rarity = KeyValues.BackpackKv[itemID].quality;
      } else if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        rarity = getRarity(itemID, data.amounts);
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  libs.createEffect(libs.on(() => ({
    _show: show(),
    _selected: props.selected
  }), v => {
    if (v._show && !rewardShow() && handledRewardData().list.length > 0) {
      showDrawRewards(handledRewardData().list);
    }
    if (v._selected && v._show) {
      if (willHeroTooltip() && showHeroTooltip()) {
        $.Schedule(0.4, () => {
          showHeroInfo();
        });
      }
    } else {
      hideHeroInfo();
    }
  }));
  const showHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      ShowCustomTooltip(self, "cosmetic_tooltip", {
        cosmeticID: 3000062,
        text: "#3000062",
        showPreview: 0
      });
    }
  };
  const hideHeroInfo = self => {
    if (self == undefined) {
      self = Content2;
    }
    if (self?.IsValid()) {
      HideCustomTooltip(self, "cosmetic_tooltip");
    }
  };
  const _addHidden = p => {
    if (p?.IsValid()) {
      p.AddClass("Hidden");
    }
  };
  const _removeHidden = p => {
    if (p?.IsValid()) {
      p.RemoveClass("Hidden");
    }
  };
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex(-1);
    }
    if (show()) {
      let p1 = $("#YanGeDrawPortal");
      let p2 = $("#YanGeDrawPortalGold");
      let p3 = $("#YanGeDrawPortalRed");
      if (p1?.IsValid()) {
        p1.StopParticlesImmediately(false);
        p1.style.opacity = "1";
      }
      if (p2?.IsValid()) {
        p2.StopParticlesImmediately(false);
        p2.style.opacity = "0";
      }
      if (p3?.IsValid()) {
        p3.StopParticlesImmediately(false);
        p3.style.opacity = "0";
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd(false);
    setDrawButtonEnable(false);
    setRewardList([]);
    let seq = new RunSequentialActions();
    if (rewardShow()) {
      setRewardShow(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        _addHidden(BGLayer);
        _addHidden(BG2);
        _addHidden(Hero);
        _addHidden(Content1);
        _addHidden(Content2);
        _addHidden(Content3);
        _addHidden(Content4);
        _addHidden($("#YanGeSkipButton"));
        _addHidden($("#NewYearExchangeRewardTooltip"));
        _addHidden($("#PortalCircle"));
        _addHidden($("#ButtonDecoration"));
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        $("#YanGeDrawPortal").StartParticles();
        $("#YanGeDrawPortalRed").StartParticles();
        $("#YanGeDrawPortalGold").StartParticles();
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex()) return true;
        if (handledRewardData().list.length > 0 || drawEnd()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex()) return false;
        if (handledRewardData().list.length > 0 || drawEnd()) {
          if (handledRewardData().resultType != 0) {
            $("#YanGeDrawPortal").style.opacity = "0";
            if (handledRewardData().resultType == 2) {
              $("#YanGeDrawPortalRed").style.opacity = "1";
            } else {
              $("#YanGeDrawPortalGold").style.opacity = "1";
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: boxID,
      pool: activityPool,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        const responseData = data.data;
        const openBoxRewards = responseData.filter(v => v.way != "other");
        const awakeningProgress = responseData.filter(v => v.way == "other" && v.itemId == awakeningTokenID).reduce((total, v) => total + v.amounts, 0) ?? 0;
        if (awakeningProgress > 0) {
          addBalanceValue(awakeningProgress);
        }
        setRewardList(openBoxRewards);
        setDrawSuccess(true);
      } else {
        setDrawSuccess(false);
      }
      setDrawEnd(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      let seq = new RunSequentialActions();
      seq.actions.push(new RunFunctionAction(() => {
        setRewardShow(true);
        pRewardList.RemoveAndDeleteChildren();
        const count = items.length;
        for (let i = 0; i < count; i++) {
          const data = items[i];
          let itemID = data.origin_item_id ?? data.itemId;
          let rarity = data.rarity;
          let p = $.CreatePanel("Panel", pRewardList, "");
          p.AddClass("AwardItem");
          if (count == 1) {
            p.AddClass("Single");
          } else {
            p.AddClass("Multi" + (i + 1));
          }
          p.AddClass("Rarity" + rarity);
          SaveData(p, "iRarity", rarity);
          libs.render(() => (() => {
            const _el$ = libs.createElement("Panel", {
                id: "AwardItemContainer"
              }, null),
              _el$2 = libs.createElement("Panel", {}, _el$),
              _el$3 = libs.createElement("Panel", {}, _el$),
              _el$4 = libs.createElement("Panel", {}, _el$),
              _el$1 = libs.createElement("Panel", {}, _el$);
            libs.setProp(_el$2, "className", "AwardBG");
            libs.setProp(_el$3, "className", "New");
            libs.setProp(_el$4, "className", "Mask");
            libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
              className: "MaskMain",
              get children() {
                return [libs.createComponent(ProductItem.ProductItem, {
                  id: "StoreItemImage",
                  itemid: itemID,
                  rarity: rarity,
                  get count() {
                    return data.origin_item_id == undefined ? data.amounts : 1;
                  }
                }), libs.createComponent(CosmeticCard.CosmeticImage, {
                  hittest: false,
                  width: "200px",
                  height: "200px",
                  y: "-10px",
                  align: "center center",
                  get itemid() {
                    return itemID.toString();
                  }
                })];
              }
            }), null);
            libs.insert(_el$4, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  when: rarity == 3,
                  get children() {
                    return [(() => {
                      const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                        squarePixels: true,
                        particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "0 0 200",
                        fov: 30
                      }, null);
                      libs.setProp(_el$5, "style", {
                        width: "260px",
                        height: "260px",
                        align: "center center"
                      });
                      return _el$5;
                    })(), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "GoldParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                }), libs.createComponent(libs.Match, {
                  when: rarity == 4,
                  get children() {
                    return [libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle3",
                      squarePixels: true,
                      particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "0 0 200",
                      fov: 30
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "250 0 0",
                      fov: 18
                    }, null), libs.createElement("DOTAParticleScenePanel", {
                      id: "RedParticle2",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "400 0 0",
                      fov: 16
                    }, null)];
                  }
                })];
              }
            }), null);
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return data.origin_item_id != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "Conversion",
                  get children() {
                    return [libs.createElement("Image", {
                      id: "ConversionBG"
                    }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ConversionInfo",
                      get children() {
                        return [libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return $.Localize("#Conversion");
                          }
                        }), libs.createComponent(EOM_Image.EOM_Image, {
                          id: "TokenIcon",
                          get src() {
                            return getPayTypeIconPath(data.itemId);
                          }
                        }), libs.createComponent(GenericPanel.CLabel, {
                          id: "TokenCount",
                          get text() {
                            return "×" + data.amounts;
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
              IsNew: true
            }), _$p));
            return _el$;
          })(), p);
        }
      }));
      seq.actions.push(new WaitAction(0.5));
      seq.actions.push(new RunFunctionAction(() => {
        if (pRewardList) {
          let flipSeqList = new RunStaggeredActions(fFlipTime / 2);
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p && LoadData(p, "Flipped") != "1") {
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                GoldParticle.StopParticlesWithEndcaps();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StopParticlesWithEndcaps();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                RedParticle.StopParticlesWithEndcaps();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StopParticlesWithEndcaps();
              }
              p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime + "s";
              let flipSeq = new RunSequentialActions();
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid()) {
                  if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                    p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                  }
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                  p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                }
              }));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  Game.EmitSound("playercard.flip");
                }
              }));
              flipSeq.actions.push(new WaitAction(fFlipTime / 2));
              flipSeq.actions.push(new RunFunctionAction(() => {
                if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                  SaveData(p, "Flipped", "1");
                  if (GoldParticle && GoldParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    GoldParticle.StartParticles();
                  }
                  if (GoldParticle2 && GoldParticle2.IsValid()) {
                    GoldParticle2.StartParticles();
                  }
                  if (RedParticle && RedParticle.IsValid()) {
                    $.Schedule(0.2, () => {
                      Game.EmitSound("ui.treasure_01");
                    });
                    RedParticle.StartParticles();
                  }
                  if (RedParticle2 && RedParticle2.IsValid()) {
                    RedParticle2.StartParticles();
                  }
                }
                if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                  setDrawButtonEnable(true);
                }
              }));
              flipSeqList.actions.push(flipSeq);
            }
          }
          RunSingleAction(flipSeqList);
        }
      }));
      RunSingleAction(seq);
    }
  };
  const funcRewardShowContinue = () => {
    let bBack = true;
    setDrawButtonEnable(true);
    if (pDrawWindow) {
      let pRewardList = pDrawWindow.FindChildTraverse("NewYearRewardList");
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow(false);
        setRewardList([]);
        _removeHidden(BGButtonLists);
        _removeHidden(BGLayer);
        _removeHidden(BG2);
        _removeHidden(Hero);
        _removeHidden(Content1);
        _removeHidden(Content2);
        _removeHidden(Content3);
        _removeHidden(Content4);
        _removeHidden($("#YanGeSkipButton"));
        _removeHidden($("#NewYearExchangeRewardTooltip"));
        _removeHidden($("#PortalCircle"));
        _removeHidden($("#ButtonDecoration"));
      }
    }
  };
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [previewInfo, setPreviewInfo] = libs.createSignal({
    cid: -1,
    eid: -1
  });
  let previewTimer = -1;
  libs.createEffect(libs.on(exchangeShow, _show => {
    if (!_show) {
      setPreviewInfo({
        cid: -1,
        eid: -1
      });
    } else {
      for (const storeItem of storeItemData()) {
        if (storeItem?.items?.[0]) {
          const cid = storeItem.items[0].item_id.toString();
          if (KeyValues.CosmeticsKv?.[cid] != undefined) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
          if (cid.slice(0, 3) == "300" && cid.length == 7) {
            setPreviewInfo({
              cid: storeItem.items[0].item_id,
              eid: -1
            });
            break;
          }
        }
      }
    }
  }));
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames({
        Hidden: !props.selected,
        Awakened: isAwakened()
      });
    },
    id: "Activity_yange",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Currencies",
        get children() {
          return [libs.createComponent(Player.PlayerCurrency, {
            type: "boxes",
            tokenID: activityToken
          }), libs.createComponent(Player.PlayerCurrency, {
            type: "token",
            tokenID: exchangeTokenID
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "MainContainer",
        hittest: false,
        hittestchildren: true,
        get children() {
          return [libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "YanGeDrawPortalGold",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
            fov: 120,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "YanGeDrawPortal",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createElement("DOTAParticleScenePanel", {
            hittest: false,
            id: "YanGeDrawPortalRed",
            startActive: false,
            light: "light",
            camera: "camera_top",
            map: "scene/draw_open",
            renderdeferred: false,
            deferredalpha: true,
            particleonly: false,
            squarePixels: true,
            particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
            fov: 80,
            cameraOrigin: "0 0 900",
            lookAt: "0 0 0"
          }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "Hero3D",
            ref(r$) {
              const _ref$ = Hero;
              typeof _ref$ === "function" ? _ref$(r$) : Hero = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              const _el$14 = libs.createElement("DOTAScenePanel", {
                allowrotation: false,
                get map() {
                  return heroSceneMap();
                },
                camera: "preview_camera",
                light: "preview_light",
                particleonly: false,
                deferredalpha: true,
                antialias: true
              }, null);
              libs.setProp(_el$14, "style", {
                width: "100%",
                height: "100%"
              });
              libs.effect(_$p => libs.setProp(_el$14, "map", heroSceneMap(), _$p));
              return _el$14;
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "BGLayer",
            ref(r$) {
              const _ref$2 = BGLayer;
              typeof _ref$2 === "function" ? _ref$2(r$) : BGLayer = r$;
            },
            hittest: false,
            get children() {
              return [libs.createComponent(InfoButton.InfoButton, {
                className: language,
                id: "ActivityInfoButton",
                info: "#SnowballInfo",
                onmouseover: self => {
                  if (language != "schinese") {
                    ShowCustomTooltip(self, "long_text", {
                      text: "#Activity_yange_infodesc"
                    });
                  } else {
                    $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_yange_infodesc");
                  }
                },
                onmouseout: self => {
                  if (language != "schinese") {
                    HideCustomTooltip(self, "long_text");
                  } else {
                    $.DispatchEvent("DOTAHideTextTooltip", self);
                  }
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "ActivityTitle",
                className: language,
                hittest: false
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "ActivityCountdown",
                className: language,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    align: "right center",
                    flowChildren: "right",
                    get children() {
                      return [libs.createComponent(EOM_Image.EOM_Image, {
                        id: "timeIcon"
                      }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                        get endTime() {
                          return endtime();
                        },
                        text: "#countdown_time"
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "PoolInfoIcon",
                className: language,
                size: "24",
                get src() {
                  return getSrcPath("icon/c_info.png");
                },
                customTooltip: {
                  name: "custom_text",
                  text: "#Activity_yange_poolchance"
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return boxAmounts() > 0;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "NewYearBoxFastAccess",
                    get children() {
                      return [libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "NewYearBoxImage",
                        get children() {
                          return [libs.createComponent(ProductImage.ProductImage, {
                            itemid: 9314005
                          }), libs.createComponent(EOM_Label.EOM_Label, {
                            get text() {
                              return `x ${boxAmounts()}`;
                            }
                          })];
                        }
                      }), libs.createComponent(EOM_Button.EOM_Button, {
                        color: "Gold",
                        text: "#UseSelfPickBox",
                        onactivate: () => {
                          showPopup("BackpackItemUse", {
                            id: 9314005
                          });
                        }
                      })];
                    }
                  });
                }
              }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                id: "HeroSwitchButton",
                get className() {
                  return libs.classNames({
                    Transformed: heroSceneMap() != heroSceneMapNormal,
                    TransformedUlt: heroSceneMap() == heroSceneMapTransformedUlt
                  });
                },
                onactivate: toggleHeroScene,
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return heroSceneButtonText();
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "UltimateSkin",
            hittest: false,
            hittestchildren: true,
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "USTrack",
                hittest: false,
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "USFill",
                    hittest: false,
                    get style() {
                      return {
                        height: balancePercent() + "%"
                      };
                    }
                  });
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "USBottom",
                hittest: false,
                hittestchildren: true,
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "Icon",
                    get className() {
                      return libs.classNames({
                        Claimable: awakeRewardClaimable(),
                        Claiming: awakeRewardClaiming(),
                        Claimed: awakeRewardClaimed()
                      });
                    },
                    get enabled() {
                      return awakeRewardClaimEnabled();
                    },
                    onactivate: claimAwakeReward,
                    get children() {
                      return libs.createComponent(libs.Show, {
                        get when() {
                          return awakeRewardClaimable();
                        },
                        get children() {
                          return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                            type: "default",
                            hittest: false
                          });
                        }
                      });
                    }
                  });
                }
              }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                id: "USHorns",
                get className() {
                  return libs.classNames({
                    Claimable: ultimateClaimable(),
                    Claimed: balanceValue() >= balanceMax() && ultimateClaimed()
                  });
                },
                get enabled() {
                  return ultimateClaimEnabled();
                },
                onactivate: claimUltimateSkin,
                get children() {
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return ultimateClaimable();
                    },
                    get children() {
                      return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                        type: "default",
                        hittest: false
                      });
                    }
                  });
                }
              }), libs.createComponent(EOM_Image.EOM_Image, {
                id: "USTop",
                get children() {
                  return libs.createComponent(EOM_Image.EOM_Image, {
                    id: "USTopFrame",
                    hittest: false
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "USValue",
                hittest: false,
                hittestchildren: true,
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "USValueIcon",
                    get src() {
                      return getSrcPath("icon/c_info.png");
                    },
                    hittest: true,
                    onmouseover: () => setShowRuneTips(true),
                    onmouseout: () => setShowRuneTips(false)
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "USValueLabel",
                    text: "#Activity_yange_balance",
                    get dialogVariables() {
                      return {
                        count: balanceValue(),
                        max: balanceMax()
                      };
                    },
                    hittest: false
                  })];
                }
              }), libs.createComponent(libs.Show, {
                get when() {
                  return showRuneTips();
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "USTips",
                    hittest: false,
                    hittestchildren: false,
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        id: "USTipsLabel",
                        text: "#Activity_yange_awake_infodesc",
                        html: true,
                        hittest: false
                      });
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CenterCircle",
            ref(r$) {
              const _ref$3 = BG2;
              typeof _ref$3 === "function" ? _ref$3(r$) : BG2 = r$;
            },
            hittest: false,
            hittestchildren: false,
            get children() {
              return libs.createComponent(libs.Show, {
                get when() {
                  return nextUpNeedCount() != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "DropBanner",
                    hittest: false,
                    get children() {
                      return libs.createComponent(GenericPanel.CLabel, {
                        text: "#Activity_yange_chanceup",
                        get dialogVariables() {
                          return {
                            count: nextUpNeedCount()
                          };
                        },
                        html: true
                      });
                    }
                  });
                }
              });
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "ExchangeButton",
            ref(r$) {
              const _ref$4 = Content4;
              typeof _ref$4 === "function" ? _ref$4(r$) : Content4 = r$;
            },
            get className() {
              return $.Language().toLowerCase();
            },
            text: `#Store_Exchange_Button`,
            onactivate: () => setExchangeShow(true)
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            ref(r$) {
              const _ref$5 = BGButtonLists;
              typeof _ref$5 === "function" ? _ref$5(r$) : BGButtonLists = r$;
            },
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton, {
                get enable() {
                  return drawButtonEnable();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton, {
                get enable() {
                  return drawButtonEnable();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          }), libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "YanGeSkipButton",
            get ["class"]() {
              return libs.classNames("SkipButton", {
                Active: willSkip()
              });
            },
            onactivate: () => setWillSkip(v => !v),
            get children() {
              return [libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "Square",
                get src() {
                  return getSrcPath("draw/c_square.png");
                }
              }), libs.createComponent(EOM_Icon.EOM_Icon, {
                id: "Hook",
                get src() {
                  return getSrcPath("draw/c_hook.png");
                }
              }), libs.createComponent(GenericPanel.CLabel, {
                text: "#Skip_Button"
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("DrawCardResultWindow", {
            Show: rewardShow()
          });
        },
        ref(r$) {
          const _ref$6 = pDrawWindow;
          typeof _ref$6 === "function" ? _ref$6(r$) : pDrawWindow = r$;
        },
        acceptsfocus: true,
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ResultContainer",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "NewYearRewardList",
                hittest: false
              }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                id: "RewardClose",
                onactivate: () => funcRewardShowContinue()
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Currencies",
                get children() {
                  return [libs.createComponent(Player.PlayerCurrency, {
                    type: "boxes",
                    tokenID: activityToken
                  }), libs.createComponent(Player.PlayerCurrency, {
                    type: "token",
                    tokenID: exchangeTokenID
                  })];
                }
              })];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "DrawButtonList",
            get children() {
              return [libs.createComponent(DrawButton, {
                get enable() {
                  return drawButtonEnable();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 1,
                drawCallback: Draw
              }), libs.createComponent(DrawButton, {
                get enable() {
                  return drawButtonEnable();
                },
                get ticket() {
                  return boxToken();
                },
                discountToken: 0,
                count: 10,
                drawCallback: Draw
              })];
            }
          })];
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ExchangePanel",
        get className() {
          return libs.classNames({
            Show: exchangeShow()
          });
        },
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$15 = libs.createElement("Panel", {
              id: "TopBarBG"
            }, null);
            libs.insert(_el$15, libs.createComponent(Player.CurrencyGroup, {
              tokens: [exchangeTokenID]
            }));
            return _el$15;
          })(), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "ExchangeContainer",
            onactivate: () => setExchangeShow(false),
            get children() {
              return [(() => {
                const _el$16 = libs.createElement("Panel", {
                  id: "ExchangeList"
                }, null);
                libs.setProp(_el$16, "onactivate", () => {});
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeListTitle",
                  get children() {
                    return [libs.createComponent(GenericPanel.CLabel, {
                      id: "ExchangeListTitleLabel",
                      text: `#${activityPool}_exchange`
                    }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                      onactivate: () => {
                        setExchangeShow(false);
                      }
                    })];
                  }
                }), null);
                libs.insert(_el$16, libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "ExchangeItemList",
                  flowChildren: "right-wrap",
                  scroll: "y",
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return exchangeShow();
                      },
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return storeItemData();
                          },
                          children: (storeItem, index) => {
                            return libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps(() => ExchangeItem.getExchangeItemProps({
                              storeItem: storeItem(),
                              purchased_product: purchased_product(),
                              player_hero: playerHero(),
                              player_ornament: playerOrnament(),
                              previewing_id: previewInfo().cid,
                              onPreview: (cosmetic_id, exchange_id) => {
                                previewTimer = $.Schedule(0.3, () => {
                                  previewTimer = -1;
                                  if (previewInfo().eid != exchange_id) {
                                    setPreviewInfo({
                                      cid: cosmetic_id,
                                      eid: exchange_id
                                    });
                                  }
                                });
                              },
                              onCancelPreview: () => {
                                if (previewTimer != -1) {
                                  $.CancelScheduled(previewTimer);
                                  previewTimer = -1;
                                }
                              }
                            })));
                          }
                        });
                      }
                    });
                  }
                }), null);
                return _el$16;
              })(), (() => {
                const _el$17 = libs.createElement("Panel", {
                  id: "ExchangePreview"
                }, null);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return previewInfo().cid != -1;
                  },
                  get children() {
                    return [libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "ExchangePreviewMain",
                      get children() {
                        return libs.createComponent(libs.Show, {
                          get when() {
                            return KeyValues.CosmeticsKv[previewInfo().cid];
                          },
                          get fallback() {
                            return libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return previewInfo().cid;
                              }
                            });
                          },
                          get children() {
                            return libs.createComponent(CosmeticPreview.CosmeticPreview, {
                              get cosmetic_id() {
                                return previewInfo().cid;
                              }
                            });
                          }
                        });
                      }
                    }), (() => {
                      const _el$18 = libs.createElement("Panel", {
                        id: "CosmeticDesc"
                      }, null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticName",
                        get text() {
                          return '#' + previewInfo().cid;
                        }
                      }), null);
                      libs.insert(_el$18, libs.createComponent(EOM_Separator.EOM_Separator, {
                        size: "short"
                      }), null);
                      libs.insert(_el$18, libs.createComponent(GenericPanel.CLabel, {
                        id: "CosmeticAccess",
                        get text() {
                          return GetCosmeticAccessDescription(previewInfo().cid);
                        }
                      }), null);
                      return _el$18;
                    })(), libs.createComponent(libs.Show, {
                      get when() {
                        return previewInfo().cid.toString().slice(0, 3) == "531";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          text: "#CosmeticToEquip",
                          align: "center bottom",
                          color: "Blue",
                          marginBottom: "68px",
                          x: "175px",
                          onactivate: () => {
                            ToggleWindows('MenuButton_cosmetics', true);
                            clientSideEvent("jump_to_bunny_cosmetic", {});
                          }
                        });
                      }
                    })];
                  }
                }));
                return _el$17;
              })()];
            }
          })];
        }
      })];
    }
  });
};
const DrawButton = props => {
  const costInfo = libs.createMemo(() => {
    const single = singleCost();
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("YanGeDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900280,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + boxID + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              });
            }
          })];
        }
      })];
    }
  });
};

if (!isSpectator()) {
  const defaultOpenActivity = ["Activity_login7day", "Activity_YuanXiaoTurntable", "Activity_Dianfengsai2", "Activity_NewPlayer2", "Activity_NewPlayer", "Activity_BountyCompetition", "Activity_26WuYiTurntable"];
  const activityMap = {
    ["1001"]: "Activity_login7day",
    ["1005"]: "Activity_GuoqingLogin",
    ["9027"]: "Activity_StarryTreasure",
    ["9028"]: "Activity_StarryTreasure2",
    ["5001"]: "Activity_MillionSubscription",
    ["6007"]: "Activity_tutu1",
    ["7015"]: "Activity_LuckyTurntable",
    ["7028"]: "Activity_LuckCheck",
    ["7018"]: "Activity_XinChunTurntable",
    ["7019"]: "Activity_YuanXiaoTurntable",
    ["7026"]: "Activity_26WuYiTurntable",
    ["8001"]: "Activity_NewPlayer",
    ["8002"]: "Activity_NewPlayer2",
    ["11001"]: "Activity_HeroUnlock",
    ["1004"]: "Activity_Regression",
    ["1006"]: "Activity_Carnival",
    ["12001"]: "Activity_IkunWinter",
    ["3002"]: "Activity_Fireworks",
    ["14001"]: "Activity_NewYear25",
    ["16002"]: "Activity_Anniversary2",
    ["17001"]: "Activity_nezha51",
    ["18001"]: "Activity_duanwu",
    ["19001"]: "Activity_jianhao",
    ["19013"]: "Activity_Dai",
    ["19003"]: "Activity_Alchemist",
    ["19004"]: "Activity_meiji",
    ["19005"]: "Activity_nianshou",
    ["19006"]: "Activity_samo",
    ["19007"]: "Activity_caijue",
    ["19008"]: "Activity_linji",
    ["19009"]: "Activity_miao",
    ["19010"]: "Activity_emo",
    ["19011"]: "Activity_yange",
    ["19012"]: "Activity_kuangtu",
    ["2004"]: "Activity_LabourDay25",
    ["7011"]: "Activity_C4T12",
    ["7023"]: "Activity_C4C1",
    ["20001"]: "Activity_PDD",
    ["21001"]: "Activity_DragonBoat",
    ["21002"]: "Activity_Football",
    ["22001"]: "Activity_NewPlayerCheck"
  };
  let residentList = ["Activity_arena", "Activity_GiftPack"];
  const activityOrders = {
    ["Activity_login7day"]: -1,
    ["Activity_NewPlayer"]: 2,
    ["Activity_QiXiTurntable"]: 80,
    ["Activity_XinChunTurntable"]: 81,
    ["Activity_YuanXiaoTurntable"]: 82,
    ["Activity_PDD"]: 52,
    ["Activity_GuoqingLogin"]: 53,
    ["Activity_Doctor"]: 56,
    ["Activity_LuckyTurntable"]: 60,
    ["Activity_nezha51"]: 76,
    ["Activity_Dai"]: 133,
    ["Activity_meiji"]: 78,
    ["Activity_nianshou"]: 79,
    ["Activity_NewPlayer2"]: 84,
    ["Activity_Anniversary2"]: 90,
    ["Activity_DragonBoat"]: 98,
    ["Activity_BountyCompetition"]: 99,
    ["Activity_StarryTreasure"]: 118,
    ["Activity_NewPlayerCheck"]: 109,
    ["Activity_TIActivity"]: 110,
    ["Activity_caijue"]: 110,
    ["Activity_26WuYiTurntable"]: 118,
    ["Activity_Football"]: 112,
    ["Activity_Dianfengsai2"]: 113,
    ["Activity_miao"]: 114,
    ["Activity_StarryTreasure2"]: 116,
    ["Activity_LuckCheck"]: 117,
    ["Activity_C4C1"]: 119,
    ["Activity_tutu2"]: 120,
    ["Activity_tutu1"]: 120,
    ["Activity_tutu"]: 120,
    ["Activity_tutu3"]: 120,
    ["Activity_emo"]: 121,
    ["Activity_Carnival"]: 130,
    ["Activity_yange"]: 131,
    ["Activity_kuangtu"]: 132
  };
  const language = $.Language();
  const [show, setShow] = libs.createSignal(false);
  const [seleted_menu, setSelectedMenu] = libs.createSignal();
  const Activity = () => {
    let initedLogin7 = false;
    const [paymentOpen, setPaymentOpen] = libs.createSignal(false);
    netdata_utils.createNetDataEffect("open_payment", data => {
      setPaymentOpen(data.open);
    }, Players.GetLocalPlayer());
    const [activityData, setActivityData] = libs.createSignal([]);
    const [login7Open, setLogin7Open] = libs.createSignal(false);
    const [regressionLogin7Open, setRegressionLogin7Open] = libs.createSignal(false);
    const menuList = libs.createMemo(() => {
      let list = {};
      if (activityData().length == 0) {
        if (login7Open()) {
          list["Activity_login7day"] = [];
        }
        return list;
      }
      const activitySet = new Set(residentList);
      for (const activityInfo of activityData()) {
        if (activityMap[activityInfo.activity_id] != undefined) {
          activitySet.add(activityMap[activityInfo.activity_id]);
        }
      }
      Array.from(activitySet).sort((a, b) => {
        return (activityOrders[b] ?? 0) - (activityOrders[a] ?? 0);
      }).forEach(id => {
        if (id == "Activity_Dianfengsai2") {
          list[id] = [];
        } else if (id == "Activity_BountyCompetition") {
          list[id] = ["Activity_BountyCompetition_Team", "Activity_BountyCompetition_Rank", "Activity_BountyPass"];
        } else {
          list[id] = [];
        }
      });
      if (!GiftPackMenuVisible()) {
        delete list["Activity_GiftPack"];
      }
      if (!login7Open()) {
        delete list["Activity_login7day"];
      }
      if (!regressionLogin7Open()) {
        delete list["Activity_Regression"];
      }
      if (list["Activity_NewPlayer2"]) {
        delete list["Activity_NewPlayer"];
      }
      if (newPlayerCheckDone()) {
        delete list["Activity_NewPlayerCheck"];
      }
      if (!paymentOpen()) {
        Object.keys(list).forEach(key => {
          if (!defaultOpenActivity.includes(key)) {
            delete list[key];
          }
        });
      }
      setClientGlobalData("menu_bar_activity_tabs", Object.keys(list), true);
      return list;
    });
    const [seleted_menu2, setSelectedMenu2] = libs.createSignal();
    const [newPlayerCheckDay, setNewPlayerCheckDay] = libs.createSignal(1);
    const [newPlayerCheckDone, setNewPlayerCheckDone] = libs.createSignal(false);
    libs.createEffect(libs.on(menuList, _menuList => {
      if (Object.keys(_menuList).length > 0) {
        setSelectedMenu(Object.keys(_menuList)[0]);
      }
    }));
    const info_shop_product_group_by_tag = netdata_utils.createNetData("info_shop_product_group_by_tag");
    const player_purchased_products = netdata_utils.createPlayerNetData("player_purchased_products", Players.GetLocalPlayer());
    let giftInited = false;
    const [GiftPackMenuVisible, setGiftPackMenuVisible] = libs.createSignal(false);
    libs.createEffect(() => {
      let visible = false;
      const items = info_shop_product_group_by_tag()?.["NewUserShop"] ?? [];
      const purchased = player_purchased_products()?.["purchased_products"];
      if (!giftInited && items.length > 0 && purchased != undefined) {
        visible = items.some(item_data => item_data.status == 1 && (item_data.limit_type >= 1 ? finiteNumber(Number(purchased[item_data.id])) < item_data.limit_count : true));
        setGiftPackMenuVisible(visible);
        giftInited = true;
      }
    });
    libs.onMount(() => {
      let gameEventIDList = [];
      let activityBoundaryTimer;
      const updateActivityData = data => {
        if (activityBoundaryTimer != undefined) {
          $.CancelScheduled(activityBoundaryTimer);
          activityBoundaryTimer = undefined;
        }
        const now = Math.floor(Date.now() / 1000);
        const filterData = [];
        let nextBoundary = 0;
        for (const activityInfo of data) {
          if (now < activityInfo.start_time) {
            nextBoundary = nextBoundary == 0 ? activityInfo.start_time : Math.min(nextBoundary, activityInfo.start_time);
            continue;
          }
          if (activityInfo.end_time > now || activityInfo.end_time == 0) {
            filterData.push(activityInfo);
            if (activityInfo.end_time > now) {
              nextBoundary = nextBoundary == 0 ? activityInfo.end_time : Math.min(nextBoundary, activityInfo.end_time);
            }
          }
        }
        setActivityData(filterData);
        if (nextBoundary > now) {
          activityBoundaryTimer = $.Schedule(nextBoundary - now + 0.1, () => updateActivityData(data));
        }
      };
      gameEventIDList.push(useNetData("login_activity_data", data => {
        if (data && data[1001]) {
          if (!initedLogin7) {
            initedLogin7 = true;
            setLogin7Open(Object.values(data[1001].rewards).some(v => v == 0 || v == 2));
          }
        }
      }, Players.GetLocalPlayer()));
      gameEventIDList.push(useNetData("player_regression_data", data => {
        if (data && data.is_regression_player) {
          setRegressionLogin7Open(true);
        } else {
          setRegressionLogin7Open(false);
        }
      }, Players.GetLocalPlayer()));
      gameEventIDList.push(useToggleWindow("MenuButton_activity", show, setShow));
      gameEventIDList.push(useClientSideEvent("switchActivityTag", data => {
        if (data && data.id) {
          let id = data.id.toString();
          let tag = id;
          if (activityMap[id]) {
            tag = activityMap[id];
          }
          let arr = Object.keys(menuList());
          for (let index = 0; index < arr.length; index++) {
            const menu = arr[index];
            if (menu.toLowerCase() == tag.toLowerCase()) {
              setSelectedMenu(menu);
              break;
            }
          }
        }
      }));
      gameEventIDList.push(useClientSideEvent("switchActivityTag2", data => {
        if (data && data.id) {
          let id = data.id.toString();
          if (Object.values(menuList()).some(v => v.includes(id))) {
            setSelectedMenu2(id);
          }
        }
      }));
      gameEventIDList.push(useNetData("info_activity_data", updateActivityData));
      libs.onCleanup(() => {
        for (const id of gameEventIDList) {
          GameEvents.Unsubscribe(id);
        }
        if (activityBoundaryTimer != undefined) $.CancelScheduled(activityBoundaryTimer);
      });
    });
    let secMenuTabRecord = {};
    libs.createEffect(libs.on([seleted_menu, menuList], () => {
      let v = seleted_menu();
      let _menuList = menuList();
      if (v && _menuList[v]) {
        if (_menuList[v].length > 0 && !secMenuTabRecord[v]) {
          secMenuTabRecord[v] = true;
          setSelectedMenu2(_menuList[v][0]);
        }
        if (seleted_menu2() && !_menuList[v].includes(seleted_menu2())) {
          setSelectedMenu2();
        }
        if (v == "Activity_NewPlayerCheck") {
          setSelectedMenu2("Day" + newPlayerCheckDay());
        }
      }
    }));
    return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
      get className() {
        return libs.classNames(seleted_menu(), seleted_menu2());
      },
      get show() {
        return show();
      },
      name: "MenuButton_activity",
      get children() {
        return [libs.createElement("Image", {
          id: "ExtraBG"
        }, null), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Menu, {
          menuName: "activity",
          get menuList() {
            return menuList();
          },
          get selectedMenu() {
            return seleted_menu();
          },
          get show() {
            return show();
          },
          mark_icon: (menu, menu2) => {
            let index = Object.values(activityMap).indexOf(menu);
            if (index != -1) {
              let aid = Object.keys(activityMap)[Object.values(activityMap).indexOf(menu)];
              return libs.createComponent(EOM_Image.EOM_Image, {
                className: "ActivityMenuMark",
                get src() {
                  return getSrcPath("activity/activity_mark/" + aid + "_" + ($.Language().toLowerCase() == "schinese" ? "ch" : "en") + ".png");
                },
                hittest: false
              });
            }
          },
          onToggleMenu: (menu, menu2) => {
            if (menu != "") {
              setSelectedMenu(menu);
            }
            if (menu2 && menu2 != "") {
              setSelectedMenu2(menu2);
            }
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "Activity_CustomBG_Dynamic",
          hittest: false,
          hittestchildren: false,
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return seleted_menu();
              },
              get children() {
                return libs.createComponent(libs.Dynamic, {
                  get component() {
                    return {
                      Activity_Dai: () => (() => {
                        const _el$2 = libs.createElement("DOTAScenePanel", {
                          particleonly: false,
                          allowrotation: false,
                          light: "preview_light",
                          camera: "preview_camera",
                          map: "scene/dai_activity_preview",
                          renderwaterreflections: true,
                          deferredalpha: true,
                          renderdeferred: true,
                          rendershadows: true,
                          allowsuspendrepaint: true
                        }, null);
                        libs.setProp(_el$2, "className", "CustomBG_Dynamic");
                        libs.setProp(_el$2, "style", {
                          width: "100%",
                          height: "100%",
                          transform: "rotateY(180deg)"
                        });
                        return _el$2;
                      })()
                    }[seleted_menu()];
                  }
                });
              }
            });
          }
        }), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
          id: "HudActivityContent",
          get children() {
            return [libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_login7day",
              activity_id: 1001,
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return login7Open();
                  },
                  get children() {
                    return libs.createComponent(Activity_login7day, {
                      get selected() {
                        return seleted_menu() == "Activity_login7day";
                      },
                      activity_id: 1001
                    });
                  }
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_Regression",
              activity_id: 1004,
              get children() {
                return libs.createComponent(libs.Show, {
                  get when() {
                    return regressionLogin7Open();
                  },
                  get children() {
                    return libs.createComponent(Activity_Regression, {
                      get selected() {
                        return seleted_menu() == "Activity_Regression";
                      },
                      activity_id: 1004
                    });
                  }
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_Carnival",
              activity_id: 1006,
              get children() {
                return libs.createComponent(Activity_Carnival, {
                  get selected() {
                    return seleted_menu() == "Activity_Carnival";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 1006
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_arena",
              activity_id: 50001,
              get children() {
                return libs.createComponent(Activity_arena, {
                  get selected() {
                    return seleted_menu() == "Activity_arena";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 50001
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_tutu1",
              activity_id: 6007,
              get children() {
                return libs.createComponent(Activity_tutu1, {
                  get selected() {
                    return seleted_menu() == "Activity_tutu1";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 6007
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_26WuYiTurntable",
              activity_id: 7026,
              get children() {
                return libs.createComponent(Activity_26WuYiTurntable, {
                  get selected() {
                    return seleted_menu() == "Activity_26WuYiTurntable";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 7026
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_LuckCheck",
              activity_id: 7028,
              get children() {
                return libs.createComponent(Activity_LuckCheck, {
                  get selected() {
                    return seleted_menu() == "Activity_LuckCheck";
                  },
                  activity_id: 7028,
                  season: 15
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_NewPlayerCheck",
              activity_id: 22001,
              get children() {
                return libs.createComponent(Activity_NewPlayerCheck, {
                  get selected() {
                    return seleted_menu() == "Activity_NewPlayerCheck";
                  },
                  activity_id: 22001,
                  onDayChange: day => {
                    setNewPlayerCheckDay(day);
                    setSelectedMenu2("Day" + day);
                  },
                  onAllCompleted: () => setNewPlayerCheckDone(true)
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_GiftPack",
              get children() {
                return libs.createComponent(Activity_GiftPack, {
                  get selected() {
                    return seleted_menu() == "Activity_GiftPack";
                  }
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_NewPlayer2",
              activity_id: 8002,
              get children() {
                return libs.createComponent(Activity_NewPlayer2, {
                  get selected() {
                    return seleted_menu() == "Activity_NewPlayer2";
                  },
                  activity_id: 8002
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_NewPlayer",
              activity_id: 8001,
              get children() {
                return libs.createComponent(Activity_NewPlayer, {
                  get selected() {
                    return seleted_menu() == "Activity_NewPlayer";
                  },
                  activity_id: 8001
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_StarryTreasure2",
              activity_id: 9028,
              get children() {
                return libs.createComponent(Activity_StarryTreasure3, {
                  get selected() {
                    return seleted_menu() == "Activity_StarryTreasure2";
                  },
                  activity_id: 9028
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_StarryTreasure",
              activity_id: 9027,
              get children() {
                return libs.createComponent(Activity_StarryTreasure3, {
                  get selected() {
                    return seleted_menu() == "Activity_StarryTreasure";
                  },
                  activity_id: 9027
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_miao",
              activity_id: 19009,
              get children() {
                return libs.createComponent(Activity_miao, {
                  get selected() {
                    return seleted_menu() == "Activity_miao";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 19009
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_emo",
              activity_id: 19010,
              get children() {
                return libs.createComponent(Activity_emo, {
                  get selected() {
                    return seleted_menu() == "Activity_emo";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 19010
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_yange",
              activity_id: 19011,
              get children() {
                return libs.createComponent(Activity_yange, {
                  get selected() {
                    return seleted_menu() == "Activity_yange";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 19011
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_kuangtu",
              activity_id: 19012,
              get children() {
                return libs.createComponent(Activity_kuangtu, {
                  get selected() {
                    return seleted_menu() == "Activity_kuangtu";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 19012
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_Dai",
              activity_id: 19013,
              get children() {
                return libs.createComponent(Activity_Dai, {
                  get selected() {
                    return seleted_menu() == "Activity_Dai";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 19013
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_C4C1",
              activity_id: 7023,
              get children() {
                return libs.createComponent(Activity_C4C1, {
                  get selected() {
                    return seleted_menu() == "Activity_C4C1";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 7023
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_PDD",
              activity_id: 20001,
              get children() {
                return libs.createComponent(Activity_PDD, {
                  get selected() {
                    return seleted_menu() == "Activity_PDD";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 20001
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_DragonBoat",
              activity_id: 21001,
              renderOnShow: false,
              get children() {
                return libs.createComponent(Activity_DragonBoat, {
                  get selected() {
                    return seleted_menu() == "Activity_DragonBoat";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 21001
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_Football",
              activity_id: 21002,
              get children() {
                return libs.createComponent(Activity_Football, {
                  get selected() {
                    return seleted_menu() == "Activity_Football";
                  },
                  get show() {
                    return show();
                  },
                  activity_id: 21002
                });
              }
            }), libs.createComponent(ActivityMenuContent, {
              menu_name: "Activity_TIActivity",
              on_init: () => callAction("ti_activity_data", {
                ti_season: 15
              }),
              get children() {
                return libs.createComponent(Activity_TIActivity, {
                  get selected() {
                    return seleted_menu() == "Activity_TIActivity";
                  },
                  get show() {
                    return show();
                  },
                  ti_season: 15
                });
              }
            })];
          }
        })];
      }
    });
  };
  const ActivityMenuContent = props => {
    if (props.on_init) {
      props.on_init();
    }
    if (props.activity_id) {
      const activityIDList = Array.isArray(props.activity_id) ? props.activity_id : [props.activity_id];
      activityIDList.forEach(activityID => callAction("activity_data", {
        activity_id: activityID
      }));
    }
    const render_on_show = () => props.renderOnShow != undefined ? props.renderOnShow : true;
    if (props.activity_id != undefined) {
      if (typeof props.activity_id == "number") {
        setClientGlobalData("activity_tag_list", {
          [props.activity_id]: props.menu_name
        });
      } else if (props.activity_id.length > 0) {
        let list = {};
        props.activity_id.forEach(activityID => {
          list[activityID] = props.menu_name;
        });
        setClientGlobalData("activity_tag_list", list);
      }
    }
    return libs.createComponent(libs.Show, {
      get when() {
        return !render_on_show() || seleted_menu() == props.menu_name;
      },
      get children() {
        return props.children;
      }
    });
  };
  const Activity_login7day = props => {
    const activity_id = props.activity_id;
    const [rewardStateList, setRewardStateList] = libs.createSignal({});
    const defaultRewardList = [{
      itemName: "1100001",
      itemCount: 2000,
      rarity: 2
    }, {
      itemName: "3000045",
      itemCount: 1,
      rarity: 4
    }, {
      itemName: "9310001",
      itemCount: 10,
      rarity: 1
    }, {
      itemName: "2000002",
      itemCount: 1,
      rarity: 3
    }, {
      itemName: "2000002",
      itemCount: 2,
      rarity: 3
    }, {
      itemName: "2000002",
      itemCount: 3,
      rarity: 3
    }, {
      itemName: "3000028",
      itemCount: 1,
      rarity: 4
    }];
    const [rewardList, setRewardList] = libs.createSignal(defaultRewardList);
    libs.onMount(() => {
      let gameEventIDList = [];
      gameEventIDList.push(useNetData("login_activity_data", data => {
        if (data && data[activity_id]) {
          let activityData = data[activity_id];
          setRewardStateList(activityData.rewards);
        }
      }, Players.GetLocalPlayer()));
      gameEventIDList.push(useNetData("info_activity_data", data => {
        for (const activityInfo of data) {
          if (activityInfo.activity_id == activity_id) {
            let extraInfo = JSON.parseSafe(activityInfo.extra_information);
            if (extraInfo && Object.keys(extraInfo).length > 0) {
              let rewards = extraInfo.rewards;
              let list = [];
              Object.values(rewards).forEach((v, i) => {
                if (v.rewards?.[0]) {
                  list[v.reward_id - 1] = {
                    itemName: v.rewards[0].item_id.toString(),
                    itemCount: v.rewards[0].amounts,
                    rarity: v.rewards[0].rarity
                  };
                }
              });
              setRewardList(list);
            }
          }
        }
      }));
      libs.onCleanup(() => {
        for (const id of gameEventIDList) {
          GameEvents.Unsubscribe(id);
        }
      });
    });
    const getRewardState = day => rewardStateList()?.[day.toString()] ?? 2;
    const isActivity = state => state != 2;
    const isReceive = state => state == 1;
    return libs.createComponent(EOM_Panel.EOM_Panel, {
      get className() {
        return libs.classNames({
          Hidden: !props.selected
        }, language);
      },
      id: "Login7dayMain",
      align: "center center",
      flowChildren: "down",
      get children() {
        return [libs.createComponent(EOM_Panel.EOM_Panel, {
          horizontalAlign: "right",
          get children() {
            return [libs.createElement("Image", {
              id: "Login7dayLogo"
            }, null), (() => {
              const _el$4 = libs.createElement("Panel", {
                id: "Login7dayDesc"
              }, null);
              libs.insert(_el$4, libs.createComponent(GenericPanel.CLabel, {
                html: true,
                text: "#Login7dayDesc"
              }));
              libs.effect(_$p => libs.setProp(_el$4, "className", $.Language().toLowerCase(), _$p));
              return _el$4;
            })()];
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          flowChildren: "right",
          get children() {
            return [libs.createComponent(EOM_Panel.EOM_Panel, {
              flowChildren: "right-wrap",
              className: "RewardList",
              get children() {
                return [1, 2, 3, 4, 5, 6].map((day, index) => {
                  return libs.createComponent(LoginRewardCard, {
                    day: day,
                    get itemName() {
                      return rewardList()[index].itemName;
                    },
                    get itemCount() {
                      return rewardList()[index].itemCount;
                    },
                    get activity() {
                      return isActivity(getRewardState(day));
                    },
                    get recevied() {
                      return isReceive(getRewardState(day));
                    },
                    get rarity() {
                      return rewardList()[index].rarity;
                    },
                    onClick: step => {
                      callAction("activity_receive", {
                        activity_id,
                        reward_id: step
                      });
                    }
                  });
                });
              }
            }), libs.createComponent(LoginRewardCard, {
              day: 7,
              get itemName() {
                return rewardList()[6].itemName;
              },
              get itemCount() {
                return rewardList()[6].itemCount;
              },
              get activity() {
                return isActivity(getRewardState(7));
              },
              get recevied() {
                return isReceive(getRewardState(7));
              },
              get rarity() {
                return rewardList()[6].rarity;
              },
              onClick: step => {
                callAction("activity_receive", {
                  activity_id,
                  reward_id: step
                });
              }
            })];
          }
        })];
      }
    });
  };
  const LoginRewardCard = props => {
    return (() => {
      const _el$5 = libs.createElement("Panel", {}, null);
      libs.insert(_el$5, libs.createComponent(GenericPanel.CLabel, {
        className: "Title",
        text: "#login7day_title",
        get dialogVariables() {
          return {
            day: props.day
          };
        }
      }), null);
      libs.insert(_el$5, libs.createComponent(ProductImage.ProductImage, {
        get itemid() {
          return props.itemName;
        },
        get count() {
          return props.itemCount;
        }
      }), null);
      libs.insert(_el$5, libs.createComponent(CosmeticCard.CosmeticImage, {
        get itemid() {
          return props.itemName;
        },
        hittest: false
      }), null);
      libs.insert(_el$5, libs.createComponent(libs.Show, {
        get when() {
          return props.activity;
        },
        get children() {
          return [libs.createComponent(EOM_Button.EOM_Button, {
            color: "Blue",
            get enabled() {
              return !props.recevied;
            },
            get text() {
              return props.recevied ? "#activity_receive" : "#activity_action_receive";
            },
            onactivate: () => {
              props.onClick(props.day);
            }
          }), libs.createComponent(EOM_Image.EOM_Image, {
            get visible() {
              return props.activity && !props.recevied;
            },
            get className() {
              return libs.classNames("red_point");
            },
            hittest: false,
            get backgroundImage() {
              return getImagePath("activity/s_dot_01.png");
            }
          })];
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$5, "className", libs.classNames("LoginRewardCard", language, "rarity" + String(props.rarity), {
        Activity: props.activity,
        Recevied: props.recevied,
        Last: props.day == 7,
        language
      }), _$p));
      return _el$5;
    })();
  };
  libs.render(() => libs.createComponent(Activity, {}), $.GetContextPanel());
}