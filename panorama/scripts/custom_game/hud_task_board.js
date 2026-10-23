--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var Player = require('./Player.js');
var StoreTagPage = require('./StoreTagPage.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const TAB_WEEKLY = "week_board";
const TAB_MY_BOUNTY = "my_bounty";
const PAGE_SIZE = 5;
const BOUNTY_DONATION_EVENT_ID = 21;
const TASK_SLOT_FIRST_ANIMATION_DELAY = 0.1;
const TASK_SLOT_ANIMATION_CLEAR_DELAY = 0.96;
const TASK_SLOT_APPEAR_SOUND = "UI.TaskBoard.PaperPickup";
const PERIOD_CONFIG = {
  daily: {
    acceptLimit: "daily_bounty_num",
    acceptLimitProperty: "daily_bounty_num",
    freeRefreshLimit: "daily_refresh_num",
    freeRefreshLimitProperty: "daily_bounty_free_count",
    paidRefreshLimit: "daily_pay_refresh_num",
    paidRefreshCost: "daily_pay_refresh_cost",
    refreshCounter: "daily_bounty_refresh",
    paidRefreshCounter: "daily_bounty_pay_refresh",
    completeLimitProperty: "daily_bounty_complete_count",
    completeCounter: "daily_bounty_complete"
  },
  weekly: {
    acceptLimit: "week_bounty_num",
    acceptLimitProperty: "week_bounty_num",
    freeRefreshLimit: "week_refresh_num",
    freeRefreshLimitProperty: "weekly_bounty_free_count",
    paidRefreshLimit: "week_pay_refresh_num",
    paidRefreshCost: "week_pay_refresh_cost",
    refreshCounter: "weekly_bounty_refresh",
    paidRefreshCounter: "weekly_bounty_pay_refresh",
    completeLimitProperty: "weekly_bounty_complete_count",
    completeCounter: "weekly_bounty_complete"
  }
};
const dailyBountyTasks = solid_utils.createServiceNetData("player_daily_bounty_tasks", {});
const weeklyBountyTasks = solid_utils.createServiceNetData("player_weekly_bounty_tasks", {});
const playerBlessings = solid_utils.createServiceNetData("player_blessings", {});
const playerCounters = solid_utils.createServiceNetData("player_counters", {});
const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
const isTaskInCurrentPeriod = (task, timestamp) => {
  return task.end_time >= timestamp && task.start_time <= timestamp;
};
const currentPeriodTasks = source => {
  const timestamp = CustomUIConfig.GetServerTimeStamp();
  return Object.values(source).filter(task => KeyValues.task[task.task_id] != undefined && isTaskInCurrentPeriod(task, timestamp)).sort((a, b) => a.index - b.index);
};
const createBountyBoardList = (source, period) => {
  let lastDuplicateSignature = "";
  return libs.createMemo(() => {
    const tasks = source().filter(task => Number.isInteger(task.index) && task.index >= 1 && task.index <= PAGE_SIZE);
    const slots = new Set();
    const list = tasks.filter(task => {
      if (slots.has(task.index)) return false;
      slots.add(task.index);
      return true;
    });
    const duplicateSignature = tasks.length > list.length ? JSON.stringify(tasks.map(({
      task_id,
      extra_id,
      index,
      start_time,
      end_time,
      active
    }) => ({
      task_id,
      extra_id,
      index,
      start_time,
      end_time,
      active
    }))) : "";
    if (duplicateSignature && duplicateSignature !== lastDuplicateSignature) {
      console.warn(`[TaskBoard] Duplicate ${period} bounty slots: ${duplicateSignature}`);
    }
    lastDuplicateSignature = duplicateSignature;
    return list;
  });
};
const taskState = task => {
  if (task.receive_progress == 1) return "Received";
  if (task.active === true && task.progress >= task.target) return "CanReceive";
  return task.active === true ? "Accepted" : "Available";
};
const isTaskFinished = task => task.receive_progress == 1 || task.progress >= task.target;
const getMyBountyStateOrder = task => {
  switch (taskState(task)) {
    case "CanReceive":
      return 0;
    case "Accepted":
      return 1;
    case "Received":
      return 2;
    default:
      return 3;
  }
};
const needShowRedPoint = source => {
  const timestamp = CustomUIConfig.GetServerTimeStamp();
  return Object.values(source).some(task => task.active === true && task.receive_progress != 1 && task.progress >= task.target && isTaskInCurrentPeriod(task, timestamp));
};
const needShowDailyRedPoint = () => needShowRedPoint(dailyBountyTasks());
const needShowWeeklyRedPoint = () => needShowRedPoint(weeklyBountyTasks());
const getBountySettingNumber = key => {
  const value = Number(KeyValues.bounty_setting?.[key]?.value);
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
};
const getBountyPropertyNumber = (properties, key) => {
  const value = Number(properties[key] ?? 0);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
};
const getAcceptLimit = (period, properties) => {
  const config = PERIOD_CONFIG[period];
  return getBountySettingNumber(config.acceptLimit) + getBountyPropertyNumber(properties, config.acceptLimitProperty);
};
const getRefreshInfo = (period, properties) => {
  const config = PERIOD_CONFIG[period];
  const privilegeRefreshCount = getBountyPropertyNumber(properties, config.freeRefreshLimitProperty);
  const freeTotal = getBountySettingNumber(config.freeRefreshLimit) + privilegeRefreshCount;
  const paidTotal = getBountySettingNumber(config.paidRefreshLimit);
  const total = freeTotal + paidTotal;
  const rawFreeUsedCount = Number(playerCounters()[config.refreshCounter]?.count ?? 0);
  const rawPaidUsedCount = Number(playerCounters()[config.paidRefreshCounter]?.count ?? 0);
  const freeUsedCount = Number.isFinite(rawFreeUsedCount) && rawFreeUsedCount > 0 ? Math.floor(rawFreeUsedCount) : 0;
  const paidUsedCount = Number.isFinite(rawPaidUsedCount) && rawPaidUsedCount > 0 ? Math.floor(rawPaidUsedCount) : 0;
  const usedCount = freeUsedCount + paidUsedCount;
  const freeRemaining = Math.max(0, freeTotal - freeUsedCount);
  const paidRemaining = Math.max(0, paidTotal - paidUsedCount);
  return {
    freeTotal,
    total,
    used: Math.min(usedCount, total),
    freeRemaining,
    paidRemaining,
    phase: freeRemaining > 0 ? "free" : paidRemaining > 0 ? "paid" : "exhausted"
  };
};
const getCompleteInfo = (period, properties) => {
  const config = PERIOD_CONFIG[period];
  const total = getBountyPropertyNumber(properties, config.completeLimitProperty);
  const rawUsedCount = Number(playerCounters()[config.completeCounter]?.count ?? 0);
  const usedCount = Number.isFinite(rawUsedCount) && rawUsedCount > 0 ? Math.floor(rawUsedCount) : 0;
  return {
    total,
    used: Math.min(usedCount, total),
    remaining: Math.max(0, total - usedCount)
  };
};
const getCompleteExhaustedToken = period => {
  return period === "daily" ? "#TaskBoard_DailyCompleteNowExhausted" : "#TaskBoard_WeeklyCompleteNowExhausted";
};
const getPaidRefreshCost = period => {
  const value = KeyValues.bounty_setting?.[PERIOD_CONFIG[period].paidRefreshCost]?.value;
  if (typeof value != "string") return;
  const parts = value.split(":");
  if (parts.length != 2) return;
  const itemID = Number(parts[0]);
  const amount = Number(parts[1]);
  if (!Number.isFinite(itemID) || !Number.isFinite(amount) || itemID <= 0 || amount <= 0) return;
  return {
    itemID: Math.floor(itemID),
    amount: Math.floor(amount)
  };
};
const getTaskRarity = task => {
  const rarity = Number(KeyValues.bounty_mission?.[task.task_id]?.rarity ?? 1);
  const normalizedRarity = Number.isFinite(rarity) ? Math.floor(rarity) : 1;
  return Math.max(1, Math.min(5, normalizedRarity));
};
const getTaskDescriptionID = task => {
  const config = KeyValues.task[task.task_id];
  return config.task_description == 1 ? config.task_id : config.event_id;
};
const getTaskName = task => {
  return GetLocalization("#Task_Name_" + getTaskDescriptionID(task));
};
const getTaskDescription = task => {
  const config = KeyValues.task[task.task_id];
  const localizationVars = {
    target: task.target,
    "s:target": task.target,
    param_1: config.param_1,
    param_2: config.param_2,
    param_3: config.param_3,
    param_4: config.param_4,
    param_s1: config.param_s1,
    "s:param_s1": config.param_s1
  };
  if (config.event_id == BOUNTY_DONATION_EVENT_ID) {
    return LocalizeWithVars("#Task_Donate_Description", {
      ...localizationVars,
      item: GetLocalization("#" + config.param_1)
    });
  }
  return LocalizeWithVars("#Task_Desc_" + getTaskDescriptionID(task), localizationVars);
};
const getTaskRewards = (task, blessings) => {
  const config = KeyValues.task[task.task_id];
  if (!config?.rewards) return [];
  const rewards = [];
  for (const [id, num] of Object.entries(config.rewards)) {
    rewards.push({
      id,
      num
    });
  }
  if (config.blessing_reward) {
    const now = Math.floor(Date.now() / 1000);
    const buffData = blessings[config.vip_blessing];
    const hasBuff = buffData != undefined && (buffData.permanent == true || now < buffData.expire_time && buffData.expire_time != -1);
    for (const [id, num] of Object.entries(config.blessing_reward)) {
      rewards.push({
        id,
        num,
        lock: !hasBuff,
        vip: config.vip_blessing
      });
    }
  }
  return rewards;
};
const BountyTaskCard = props => {
  const rarity = () => getTaskRarity(props.task);
  const state = () => taskState(props.task);
  const rewards = libs.createMemo(() => getTaskRewards(props.task, playerBlessings()));
  const paidRefreshCost = libs.createMemo(() => getPaidRefreshCost(props.period));
  const periodToken = () => props.period === "daily" ? "#TaskBoard_DailyTag" : "#TaskBoard_WeeklyTag";
  const isDonationTask = () => KeyValues.task[props.task.task_id]?.event_id == BOUNTY_DONATION_EVENT_ID;
  const completeTooltip = () => LocalizeWithVars("#TaskBoard_CompleteNowUsage", {
    remaining: props.completeInfo.remaining,
    total: props.completeInfo.total
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return `TaskBoxWrapper TaskSlot${props.slotIndex + 1}`;
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        get ["class"]() {
          return `TaskBox Rarity${rarity()} ${state()}`;
        }
      }, _el$);
      libs.createElement("Image", {
        id: "TaskBoxHoverFrame",
        hittest: false
      }, _el$2);
      const _el$4 = libs.createElement("Panel", {
        "class": "TaskTag"
      }, _el$2);
      libs.createElement("Panel", {
        "class": "TagIcon"
      }, _el$4);
      const _el$8 = libs.createElement("Panel", {
        id: "TaskBoxTop",
        flowChildren: "down"
      }, _el$2),
      _el$9 = libs.createElement("Label", {
        id: "TaskBoxTitle",
        get text() {
          return getTaskName(props.task);
        }
      }, _el$8),
      _el$0 = libs.createElement("Image", {
        id: "TaskBoxIcon",
        get src() {
          return `file://{images}/custom_game/task_icons/${KeyValues.task[props.task.task_id].icon}.png`;
        }
      }, _el$8),
      _el$1 = libs.createElement("Panel", {
        id: "TaskBoxDescLine",
        flowChildren: "right"
      }, _el$8),
      _el$10 = libs.createElement("Label", {
        id: "TaskBoxDesc",
        get text() {
          return getTaskDescription(props.task);
        }
      }, _el$1),
      _el$11 = libs.createElement("Label", {
        id: "ProgressLabel",
        get text() {
          return LocalizeWithVars("#TaskBoard_TaskProgressInline", {
            progress: props.task.progress,
            target: props.task.target
          });
        }
      }, _el$1),
      _el$12 = libs.createElement("Panel", {
        id: "TaskBoxBottom"
      }, _el$2);
      libs.createElement("Panel", {
        id: "TaskRewardLine"
      }, _el$12);
      const _el$14 = libs.createElement("Panel", {
        id: "TaskRewardList"
      }, _el$12),
      _el$24 = libs.createElement("Image", {
        id: "TaskBoxReceived",
        hittest: false,
        src: "file://{images}/custom_game/r2_reward/r2_cross.png"
      }, _el$);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return props.mode === "mine";
      },
      get children() {
        const _el$6 = libs.createElement("Panel", {
            "class": "TaskPeriodTag"
          }, null),
          _el$7 = libs.createElement("Label", {
            get text() {
              return GetLocalization(periodToken());
            }
          }, _el$6);
        libs.effect(_$p => libs.setProp(_el$7, "text", GetLocalization(periodToken()), _$p));
        return _el$6;
      }
    }), null);
    libs.setProp(_el$8, "flowChildren", "down");
    libs.setProp(_el$1, "flowChildren", "right");
    libs.insert(_el$14, libs.createComponent(libs.Index, {
      get each() {
        return rewards();
      },
      children: reward => (() => {
        const _el$25 = libs.createElement("Panel", {
            "class": "TaskRewardItem"
          }, null),
          _el$26 = libs.createElement("Panel", {
            id: "VIPIcon",
            get ["class"]() {
              return `Buff${reward().vip}`;
            }
          }, _el$25);
        libs.insert(_el$25, libs.createComponent(StoreItem.StoreItemBlock, {
          id: "TaskReward",
          get item_id() {
            return Number(reward().id);
          },
          get amounts() {
            return reward().num;
          }
        }), _el$26);
        libs.insert(_el$25, libs.createComponent(EOM_Icon.EOM_Icon, {
          id: "TaskRewardLock",
          type: "LockSmall"
        }), _el$26);
        libs.effect(_p$ => {
          const _v$8 = {
              RewardLock: reward().lock ?? false,
              Vip: reward().vip != undefined && reward().vip > 0
            },
            _v$9 = `Buff${reward().vip}`,
            _v$0 = reward().vip ? GetLocalization("#" + reward().vip) : "";
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$25, "classList", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$26, "class", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$26, "tooltip", _v$0, _p$._v$0));
          return _p$;
        }, {
          _v$8: undefined,
          _v$9: undefined,
          _v$0: undefined
        });
        return _el$25;
      })()
    }));
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => props.mode === "board")() && state() === "Available";
      },
      get children() {
        const _el$15 = libs.createElement("Panel", {
          "class": "TaskActionRow"
        }, null);
        libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "TaskSmallButton RefreshTaskButton",
          get enabled() {
            return !props.requesting() && props.refreshInfo.phase !== "exhausted";
          },
          get tooltip() {
            return libs.memo(() => props.refreshInfo.phase === "exhausted")() ? GetLocalization("#TaskBoard_RefreshExhausted") : undefined;
          },
          onactivate: () => props.onRefresh(props.task, props.period),
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return props.refreshInfo.phase === "free";
              },
              get fallback() {
                return (() => {
                  const _el$27 = libs.createElement("Panel", {
                      "class": "PaidRefreshContent",
                      flowChildren: "right"
                    }, null),
                    _el$28 = libs.createElement("Label", {
                      get text() {
                        return GetLocalization("#TaskBoard_Refresh");
                      }
                    }, _el$27);
                  libs.setProp(_el$27, "flowChildren", "right");
                  libs.insert(_el$27, libs.createComponent(libs.Show, {
                    get when() {
                      return paidRefreshCost() != undefined;
                    },
                    get children() {
                      const _el$29 = libs.createElement("Panel", {
                          "class": "PaidRefreshCost",
                          flowChildren: "right"
                        }, null),
                        _el$30 = libs.createElement("Label", {
                          get text() {
                            return paidRefreshCost().amount;
                          }
                        }, _el$29);
                      libs.setProp(_el$29, "flowChildren", "right");
                      libs.insert(_el$29, libs.createComponent(StoreItem.StoreItemImage, {
                        get itemid() {
                          return paidRefreshCost().itemID;
                        },
                        hideTips: true
                      }), _el$30);
                      libs.effect(_$p => libs.setProp(_el$30, "text", paidRefreshCost().amount, _$p));
                      return _el$29;
                    }
                  }), null);
                  libs.effect(_$p => libs.setProp(_el$28, "text", GetLocalization("#TaskBoard_Refresh"), _$p));
                  return _el$27;
                })();
              },
              get children() {
                const _el$16 = libs.createElement("Label", {
                  "class": "FreeRefreshText",
                  get text() {
                    return GetLocalization("#TaskBoard_FreeRefresh");
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$16, "text", GetLocalization("#TaskBoard_FreeRefresh"), _$p));
                return _el$16;
              }
            });
          }
        }), null);
        libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "TaskSmallButton AcceptButton",
          get enabled() {
            return !props.requesting() && props.canAccept;
          },
          get tooltip() {
            return libs.memo(() => !!!props.canAccept)() ? GetLocalization("#TaskBoard_AcceptLimitReached") : undefined;
          },
          onactivate: () => props.onAccept(props.task, props.period),
          get children() {
            const _el$17 = libs.createElement("Label", {
              get text() {
                return GetLocalization("#TaskBoard_Accept");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$17, "text", GetLocalization("#TaskBoard_Accept"), _$p));
            return _el$17;
          }
        }), null);
        return _el$15;
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => props.mode === "board")() && state() === "Accepted";
      },
      get children() {
        const _el$18 = libs.createElement("Label", {
          id: "TaskAcceptedText",
          get text() {
            return GetLocalization("#TaskBoard_Accepted");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$18, "text", GetLocalization("#TaskBoard_Accepted"), _$p));
        return _el$18;
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => props.mode === "mine")() && state() === "Accepted";
      },
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return props.completeInfo.remaining > 0;
          },
          get fallback() {
            return libs.createComponent(libs.Show, {
              get when() {
                return isDonationTask();
              },
              get fallback() {
                return (() => {
                  const _el$32 = libs.createElement("Panel", {
                      id: "DoingTag",
                      flowChildren: "right"
                    }, null);
                    libs.createElement("Image", {
                      id: "DoingIconLeft"
                    }, _el$32);
                    const _el$34 = libs.createElement("Panel", {
                      id: "DoingMiddle"
                    }, _el$32);
                    libs.createElement("Image", {
                      id: "DoingIconMid"
                    }, _el$34);
                    const _el$36 = libs.createElement("Label", {
                      id: "DoingText",
                      get text() {
                        return GetLocalization("#Task_Bord_Doing");
                      }
                    }, _el$34);
                    libs.createElement("Image", {
                      id: "DoingIconRight"
                    }, _el$32);
                  libs.setProp(_el$32, "flowChildren", "right");
                  libs.effect(_$p => libs.setProp(_el$36, "text", GetLocalization("#Task_Bord_Doing"), _$p));
                  return _el$32;
                })();
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  id: "TaskDonateButton",
                  get enabled() {
                    return !props.requesting();
                  },
                  onactivate: () => props.onDonate(props.task),
                  get children() {
                    const _el$31 = libs.createElement("Label", {
                      align: "center center",
                      width: "100%",
                      get text() {
                        return GetLocalization("#Task_Donate");
                      }
                    }, null);
                    libs.setProp(_el$31, "align", "center center");
                    libs.setProp(_el$31, "width", "100%");
                    libs.effect(_$p => libs.setProp(_el$31, "text", GetLocalization("#Task_Donate"), _$p));
                    return _el$31;
                  }
                });
              }
            });
          },
          get children() {
            const _el$19 = libs.createElement("Panel", {
              "class": "MineTaskActionRow"
            }, null);
            libs.insert(_el$19, libs.createComponent(libs.Show, {
              get when() {
                return isDonationTask();
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  id: "TaskDonateButton",
                  get enabled() {
                    return !props.requesting();
                  },
                  onactivate: () => props.onDonate(props.task),
                  get children() {
                    const _el$20 = libs.createElement("Label", {
                      align: "center center",
                      width: "100%",
                      get text() {
                        return GetLocalization("#Task_Donate");
                      }
                    }, null);
                    libs.setProp(_el$20, "align", "center center");
                    libs.setProp(_el$20, "width", "100%");
                    libs.effect(_$p => libs.setProp(_el$20, "text", GetLocalization("#Task_Donate"), _$p));
                    return _el$20;
                  }
                });
              }
            }), null);
            libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_BaseButton, {
              id: "TaskCompleteButton",
              get enabled() {
                return !props.requesting() && props.completeInfo.remaining > 0;
              },
              get tooltip() {
                return completeTooltip();
              },
              onactivate: () => props.onComplete(props.task, props.period),
              get children() {
                const _el$21 = libs.createElement("Label", {
                  align: "center center",
                  width: "100%",
                  get text() {
                    return LocalizeWithVars("#TaskBoard_CompleteNow", {
                      used: props.completeInfo.used,
                      total: props.completeInfo.total
                    });
                  }
                }, null);
                libs.setProp(_el$21, "align", "center center");
                libs.setProp(_el$21, "width", "100%");
                libs.effect(_$p => libs.setProp(_el$21, "text", LocalizeWithVars("#TaskBoard_CompleteNow", {
                  used: props.completeInfo.used,
                  total: props.completeInfo.total
                }), _$p));
                return _el$21;
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$19, "classList", {
              HasDonateAction: isDonationTask()
            }, _$p));
            return _el$19;
          }
        });
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return state() === "CanReceive";
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "TaskBoxGetButton",
          get enabled() {
            return !props.requesting();
          },
          onactivate: () => props.onClaim(props.task),
          get children() {
            return [libs.createComponent(EOM_RedMark.EOM_RedMark, {
              align: "left top",
              marginLeft: "10px",
              size: "medium"
            }), (() => {
              const _el$22 = libs.createElement("Label", {
                align: "center center",
                width: "100%",
                get text() {
                  return GetLocalization("#Task_ReceiveReward");
                }
              }, null);
              libs.setProp(_el$22, "align", "center center");
              libs.setProp(_el$22, "width", "100%");
              libs.effect(_$p => libs.setProp(_el$22, "text", GetLocalization("#Task_ReceiveReward"), _$p));
              return _el$22;
            })()];
          }
        });
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return state() === "Received";
      },
      get children() {
        const _el$23 = libs.createElement("Label", {
          id: "TaskReceivedText",
          get text() {
            return GetLocalization("#TaskBoard_Received");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$23, "text", GetLocalization("#TaskBoard_Received"), _$p));
        return _el$23;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = `TaskBoxWrapper TaskSlot${props.slotIndex + 1}`,
        _v$2 = `TaskBox Rarity${rarity()} ${state()}`,
        _v$3 = getTaskName(props.task),
        _v$4 = `file://{images}/custom_game/task_icons/${KeyValues.task[props.task.task_id].icon}.png`,
        _v$5 = getTaskDescription(props.task),
        _v$6 = LocalizeWithVars("#TaskBoard_TaskProgressInline", {
          progress: props.task.progress,
          target: props.task.target
        }),
        _v$7 = {
          Show: state() === "Received"
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "src", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$11, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$24, "classList", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$;
  })();
};
const AcceptedTaskSummary = props => {
  const progressPercent = libs.createMemo(() => {
    const progress = Number(props.task.progress);
    const target = Number(props.task.target);
    if (!Number.isFinite(progress) || !Number.isFinite(target) || target <= 0) return 0;
    return Math.max(0, Math.min(100, progress / target * 100));
  });
  return (() => {
    const _el$38 = libs.createElement("Panel", {
        "class": "AcceptedTaskSummary"
      }, null),
      _el$39 = libs.createElement("Label", {
        "class": "AcceptedTaskPeriod",
        get text() {
          return GetLocalization(props.period === "daily" ? "#TaskBoard_DailyTag" : "#TaskBoard_WeeklyTag");
        }
      }, _el$38),
      _el$40 = libs.createElement("Label", {
        "class": "AcceptedTaskName",
        get text() {
          return getTaskName(props.task);
        }
      }, _el$38),
      _el$41 = libs.createElement("Label", {
        "class": "AcceptedTaskProgressText",
        get text() {
          return LocalizeWithVars("#TaskBoard_TaskProgress", {
            progress: props.task.progress,
            target: props.task.target
          });
        }
      }, _el$38),
      _el$42 = libs.createElement("Panel", {
        "class": "ProgressContainer"
      }, _el$38),
      _el$43 = libs.createElement("Panel", {
        "class": "ProgressBarBG"
      }, _el$42),
      _el$44 = libs.createElement("Panel", {
        "class": "ProgressBar",
        get width() {
          return `${progressPercent()}%`;
        }
      }, _el$43);
    libs.effect(_p$ => {
      const _v$1 = GetLocalization(props.period === "daily" ? "#TaskBoard_DailyTag" : "#TaskBoard_WeeklyTag"),
        _v$10 = getTaskName(props.task),
        _v$11 = LocalizeWithVars("#TaskBoard_TaskProgress", {
          progress: props.task.progress,
          target: props.task.target
        }),
        _v$12 = `${progressPercent()}%`;
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$39, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$40, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$41, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$44, "width", _v$12, _p$._v$12));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined
    });
    return _el$38;
  })();
};
const TaskBoard = props => {
  const [requesting, setRequesting] = libs.createSignal(false);
  const [page, setPage] = libs.createSignal(1);
  const [playTaskEnterAnimation, setPlayTaskEnterAnimation] = libs.createSignal(true);
  let taskAnimationStartSchedule;
  let taskAnimationSoundSchedule;
  let taskAnimationClearSchedule;
  const playerPropertyData = solid_utils.createPlayerPropertyData(() => Players.GetLocalPlayer());
  const secondTabName = () => props.secondTabName;
  const isMyBounty = () => secondTabName() === TAB_MY_BOUNTY;
  const period = () => secondTabName() === TAB_WEEKLY ? "weekly" : "daily";
  const dailyAllList = libs.createMemo(() => currentPeriodTasks(dailyBountyTasks()));
  const weeklyAllList = libs.createMemo(() => currentPeriodTasks(weeklyBountyTasks()));
  const dailyList = createBountyBoardList(dailyAllList, "daily");
  const weeklyList = createBountyBoardList(weeklyAllList, "weekly");
  const boardList = libs.createMemo(() => period() === "daily" ? dailyList() : weeklyList());
  const dailyAcceptedList = libs.createMemo(() => dailyAllList().filter(task => task.active === true));
  const weeklyAcceptedList = libs.createMemo(() => weeklyAllList().filter(task => task.active === true));
  const acceptedTaskList = libs.createMemo(() => {
    return [...dailyAcceptedList().map(task => ({
      task,
      period: "daily"
    })), ...weeklyAcceptedList().map(task => ({
      task,
      period: "weekly"
    }))].sort((a, b) => {
      const stateOrder = getMyBountyStateOrder(a.task) - getMyBountyStateOrder(b.task);
      if (stateOrder != 0) return stateOrder;
      const periodOrder = Number(a.period === "weekly") - Number(b.period === "weekly");
      return periodOrder != 0 ? periodOrder : a.task.index - b.task.index;
    });
  });
  const myBountyPageList = libs.createMemo(() => {
    const start = (page() - 1) * PAGE_SIZE;
    return acceptedTaskList().slice(start, start + PAGE_SIZE);
  });
  const totalPages = libs.createMemo(() => Math.max(1, Math.ceil(acceptedTaskList().length / PAGE_SIZE)));
  const acceptedForPeriod = libs.createMemo(() => {
    const tasks = period() === "daily" ? dailyAcceptedList() : weeklyAcceptedList();
    return [...tasks].sort((a, b) => {
      const receivedOrder = Number(a.receive_progress == 1) - Number(b.receive_progress == 1);
      return receivedOrder != 0 ? receivedOrder : a.index - b.index;
    });
  });
  const acceptedLimit = () => getAcceptLimit(period(), playerPropertyData());
  const refreshInfo = () => getRefreshInfo(period(), playerPropertyData());
  const displayedRefreshInfo = () => getRefreshInfo(isMyBounty() ? "daily" : period(), playerPropertyData());
  const completedBoardCount = libs.createMemo(() => boardList().filter(isTaskFinished).length);
  const myCompletedCount = libs.createMemo(() => acceptedTaskList().filter(item => isTaskFinished(item.task)).length);
  const myDoingCount = libs.createMemo(() => acceptedTaskList().length - myCompletedCount());
  const getEarliestEndTime = tasks => {
    const endTimes = tasks.map(task => Number(task.end_time)).filter(time => Number.isFinite(time) && time > 0);
    return endTimes.length > 0 ? Math.min(...endTimes) : undefined;
  };
  const dailyAcceptedEndTime = libs.createMemo(() => getEarliestEndTime(dailyAcceptedList()));
  const weeklyAcceptedEndTime = libs.createMemo(() => getEarliestEndTime(weeklyAcceptedList()));
  const taskEndTime = libs.createMemo(() => {
    return getEarliestEndTime(boardList()) ?? new Date().setHours(24, 0, 0, 0) / 1000;
  });
  libs.createEffect(libs.on(secondTabName, () => setPage(1)));
  libs.createEffect(libs.on(secondTabName, () => {
    if (taskAnimationStartSchedule != undefined) $.CancelScheduled(taskAnimationStartSchedule);
    if (taskAnimationSoundSchedule != undefined) $.CancelScheduled(taskAnimationSoundSchedule);
    if (taskAnimationClearSchedule != undefined) $.CancelScheduled(taskAnimationClearSchedule);
    setPlayTaskEnterAnimation(false);
    taskAnimationStartSchedule = $.Schedule(0, () => {
      taskAnimationStartSchedule = undefined;
      setPlayTaskEnterAnimation(true);
      taskAnimationSoundSchedule = $.Schedule(TASK_SLOT_FIRST_ANIMATION_DELAY, () => {
        taskAnimationSoundSchedule = undefined;
        const hasTasks = isMyBounty() ? myBountyPageList().length > 0 : boardList().length > 0;
        if (hasTasks) Game.EmitSound(TASK_SLOT_APPEAR_SOUND);
      });
      taskAnimationClearSchedule = $.Schedule(TASK_SLOT_ANIMATION_CLEAR_DELAY, () => {
        taskAnimationClearSchedule = undefined;
        setPlayTaskEnterAnimation(false);
      });
    });
  }));
  libs.onCleanup(() => {
    if (taskAnimationStartSchedule != undefined) $.CancelScheduled(taskAnimationStartSchedule);
    if (taskAnimationSoundSchedule != undefined) $.CancelScheduled(taskAnimationSoundSchedule);
    if (taskAnimationClearSchedule != undefined) $.CancelScheduled(taskAnimationClearSchedule);
  });
  libs.createEffect(() => {
    if (page() > totalPages()) setPage(totalPages());
  });
  const finishRequest = result => {
    setRequesting(false);
    if (result.code != 0 && result.code != 200) {
      ErrorMessage(GetLocalization(result.message ?? "#TaskBoard_RequestFailed"));
    }
  };
  const requestTimeout = () => {
    setRequesting(false);
    ErrorMessage(GetLocalization("#TaskBoard_RequestTimeout"));
  };
  const claimTask = task => {
    if (requesting() || taskState(task) !== "CanReceive") return;
    setRequesting(true);
    CallActionRequest("/v1/task/receive_rewards", {
      task_id: task.task_id,
      extra_id: task.extra_id
    }, finishRequest, requestTimeout);
  };
  const performRefresh = (task, pay) => {
    if (requesting() || task.active === true) return;
    setRequesting(true);
    ServerRequest("bounty_refresh", {
      task_id: task.task_id,
      extra_id: task.extra_id,
      pay
    }, finishRequest, undefined, requestTimeout);
  };
  const refreshTask = (task, taskPeriod) => {
    if (requesting() || task.active === true) return;
    const info = getRefreshInfo(taskPeriod, playerPropertyData());
    if (info.phase === "free") {
      performRefresh(task, false);
      return;
    }
    if (info.phase === "exhausted") {
      ErrorMessage(GetLocalization("#TaskBoard_RefreshExhausted"));
      return;
    }
    const cost = getPaidRefreshCost(taskPeriod);
    if (cost == undefined) {
      ErrorMessage(GetLocalization("#TaskBoard_RefreshCostInvalid"));
      return;
    }
    CustomUIConfig.showPopup("CommonConfirm", {
      title: GetLocalization("#TaskBoard_PaidRefreshTitle"),
      size: "normal",
      text: LocalizeWithVars("#TaskBoard_PaidRefreshConfirm", {
        item: GetLocalization("#" + cost.itemID),
        amount: FormatNumber(cost.amount),
        remaining: info.paidRemaining
      }),
      items: [{
        item_id: cost.itemID,
        amounts: cost.amount
      }],
      onconfirm: () => performRefresh(task, true)
    });
  };
  const acceptTask = (task, taskPeriod) => {
    if (requesting() || task.active === true) return;
    const acceptedCount = taskPeriod === "daily" ? dailyAcceptedList().length : weeklyAcceptedList().length;
    if (acceptedCount >= getAcceptLimit(taskPeriod, playerPropertyData())) {
      ErrorMessage(GetLocalization("#TaskBoard_AcceptLimitReached"));
      return;
    }
    setRequesting(true);
    CallActionRequest("/v1/bounty/accept", {
      task_id: task.task_id,
      extra_id: task.extra_id
    }, finishRequest, requestTimeout);
  };
  const performComplete = (task, taskPeriod) => {
    if (requesting() || taskState(task) !== "Accepted") return;
    if (getCompleteInfo(taskPeriod, playerPropertyData()).remaining <= 0) {
      ErrorMessage(GetLocalization(getCompleteExhaustedToken(taskPeriod)));
      return;
    }
    setRequesting(true);
    CallActionRequest("/v1/bounty/complete", {
      task_id: task.task_id,
      extra_id: task.extra_id
    }, finishRequest, requestTimeout);
  };
  const completeTask = (task, taskPeriod) => {
    if (requesting() || taskState(task) !== "Accepted") return;
    if (getCompleteInfo(taskPeriod, playerPropertyData()).remaining <= 0) {
      ErrorMessage(GetLocalization(getCompleteExhaustedToken(taskPeriod)));
      return;
    }
    CustomUIConfig.showPopup("CommonConfirm", {
      title: GetLocalization("#TaskBoard_CompleteNowTitle"),
      size: "normal",
      text: GetLocalization("#TaskBoard_CompleteNowConfirm"),
      onconfirm: () => performComplete(task, taskPeriod)
    });
  };
  const donateTask = task => {
    if (requesting() || taskState(task) !== "Accepted") return;
    const config = KeyValues.task[task.task_id];
    if (config?.event_id != BOUNTY_DONATION_EVENT_ID) return;
    const itemID = Number(config.param_1);
    const donationAmount = Number(config.param_2);
    if (!Number.isFinite(itemID) || itemID <= 0 || !Number.isFinite(donationAmount) || donationAmount <= 0) {
      ErrorMessage(GetLocalization("#TaskBoard_DonateConfigInvalid"));
      return;
    }
    const ownedAmount = Number(playerTokens()[String(itemID)]?.amounts ?? 0);
    if (ownedAmount < donationAmount) {
      ErrorMessage(GetLocalization("#Task_Donate_Insufficient"));
      return;
    }
    CustomUIConfig.showPopup("BountyDonate", {
      itemID,
      amount: donationAmount,
      ownedAmount,
      rarity: getTaskRarity(task),
      onconfirm: () => {
        if (requesting()) return;
        setRequesting(true);
        CallActionRequest("/v1/task/donate_item", {
          task_id: task.task_id,
          extra_id: task.extra_id
        }, finishRequest, requestTimeout);
      }
    });
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "TaskBoard",
    get children() {
      return [(() => {
        const _el$45 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$46 = libs.createElement("Panel", {
            width: "100%",
            flowChildren: "down"
          }, _el$45),
          _el$49 = libs.createElement("Panel", {
            id: "TitleArea"
          }, _el$46),
          _el$50 = libs.createElement("Panel", {
            "class": "CountdownContainer"
          }, _el$49);
        libs.setProp(_el$46, "width", "100%");
        libs.setProp(_el$46, "flowChildren", "down");
        libs.insert(_el$46, libs.createComponent(libs.Show, {
          get when() {
            return !isMyBounty();
          },
          get children() {
            const _el$47 = libs.createElement("Panel", {
                id: "RefreshCountPlate"
              }, null),
              _el$48 = libs.createElement("Label", {
                get text() {
                  return LocalizeWithVars("#TaskBoard_FreeRefreshCount", {
                    current: displayedRefreshInfo().freeRemaining,
                    total: displayedRefreshInfo().freeTotal
                  });
                }
              }, _el$47);
            libs.effect(_p$ => {
              const _v$13 = GetLocalization("TaskBoardTips1"),
                _v$14 = LocalizeWithVars("#TaskBoard_FreeRefreshCount", {
                  current: displayedRefreshInfo().freeRemaining,
                  total: displayedRefreshInfo().freeTotal
                });
              _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$47, "tooltip_text", _v$13, _p$._v$13));
              _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$48, "text", _v$14, _p$._v$14));
              return _p$;
            }, {
              _v$13: undefined,
              _v$14: undefined
            });
            return _el$47;
          }
        }), _el$49);
        libs.insert(_el$50, libs.createComponent(EOM_Countdown.EOM_Countdown, {
          icon: true,
          get endTime() {
            return taskEndTime();
          },
          text: "#CountdownTime"
        }));
        libs.insert(_el$49, libs.createComponent(libs.Show, {
          get when() {
            return isMyBounty();
          },
          get fallback() {
            return libs.createComponent(libs.Show, {
              get when() {
                return period() === "weekly";
              },
              get children() {
                const _el$61 = libs.createElement("Label", {
                  id: "ProgressLabelShow",
                  get text() {
                    return LocalizeWithVars("#TaskBoard_CompleteProgress", {
                      completed: completedBoardCount(),
                      total: boardList().length
                    });
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$61, "text", LocalizeWithVars("#TaskBoard_CompleteProgress", {
                  completed: completedBoardCount(),
                  total: boardList().length
                }), _$p));
                return _el$61;
              }
            });
          },
          get children() {
            const _el$51 = libs.createElement("Label", {
              id: "ProgressLabelShow2",
              get text() {
                return LocalizeWithVars("#TaskBoard_MySummary", {
                  doing: myDoingCount(),
                  completed: myCompletedCount()
                });
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$51, "text", LocalizeWithVars("#TaskBoard_MySummary", {
              doing: myDoingCount(),
              completed: myCompletedCount()
            }), _$p));
            return _el$51;
          }
        }), null);
        libs.insert(_el$46, libs.createComponent(libs.Show, {
          get when() {
            return !isMyBounty();
          },
          get fallback() {
            return (() => {
              const _el$62 = libs.createElement("Panel", {
                  id: "MyBountyContent"
                }, null),
                _el$63 = libs.createElement("Panel", {
                  id: "MyBountyGroupHeaders"
                }, _el$62),
                _el$64 = libs.createElement("Panel", {
                  "class": "MyBountyGroupHeader"
                }, _el$63),
                _el$65 = libs.createElement("Label", {
                  get text() {
                    return LocalizeWithVars("#TaskBoard_MyDailyGroup", {
                      current: dailyAcceptedList().length,
                      total: getAcceptLimit("daily", playerPropertyData())
                    });
                  }
                }, _el$64),
                _el$66 = libs.createElement("Panel", {
                  "class": "MyBountyGroupHeader"
                }, _el$63),
                _el$67 = libs.createElement("Label", {
                  get text() {
                    return LocalizeWithVars("#TaskBoard_MyWeeklyGroup", {
                      current: weeklyAcceptedList().length,
                      total: getAcceptLimit("weekly", playerPropertyData())
                    });
                  }
                }, _el$66);
              libs.insert(_el$62, libs.createComponent(libs.Show, {
                get when() {
                  return myBountyPageList().length > 0;
                },
                get fallback() {
                  return (() => {
                    const _el$69 = libs.createElement("Panel", {
                        id: "MyBountyEmpty"
                      }, null);
                      libs.createElement("Image", {
                        id: "MyBountyEmptyMark",
                        hittest: false
                      }, _el$69);
                      const _el$71 = libs.createElement("Label", {
                        get text() {
                          return GetLocalization("#TaskBoard_MyEmpty");
                        }
                      }, _el$69);
                    libs.effect(_$p => libs.setProp(_el$71, "text", GetLocalization("#TaskBoard_MyEmpty"), _$p));
                    return _el$69;
                  })();
                },
                get children() {
                  const _el$68 = libs.createElement("Panel", {
                    id: "MyBountyList"
                  }, null);
                  libs.insert(_el$68, libs.createComponent(libs.Index, {
                    get each() {
                      return myBountyPageList();
                    },
                    children: (item, index) => libs.createComponent(BountyTaskCard, {
                      get task() {
                        return item().task;
                      },
                      get period() {
                        return item().period;
                      },
                      mode: "mine",
                      slotIndex: index,
                      requesting: requesting,
                      get refreshInfo() {
                        return getRefreshInfo(item().period, playerPropertyData());
                      },
                      get completeInfo() {
                        return getCompleteInfo(item().period, playerPropertyData());
                      },
                      canAccept: true,
                      onClaim: claimTask,
                      onRefresh: refreshTask,
                      onAccept: acceptTask,
                      onDonate: donateTask,
                      onComplete: completeTask
                    })
                  }));
                  return _el$68;
                }
              }), null);
              libs.effect(_p$ => {
                const _v$15 = {
                    PlayTaskEnterAnimation: playTaskEnterAnimation()
                  },
                  _v$16 = LocalizeWithVars("#TaskBoard_MyDailyGroup", {
                    current: dailyAcceptedList().length,
                    total: getAcceptLimit("daily", playerPropertyData())
                  }),
                  _v$17 = LocalizeWithVars("#TaskBoard_MyWeeklyGroup", {
                    current: weeklyAcceptedList().length,
                    total: getAcceptLimit("weekly", playerPropertyData())
                  });
                _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$62, "classList", _v$15, _p$._v$15));
                _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$65, "text", _v$16, _p$._v$16));
                _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$67, "text", _v$17, _p$._v$17));
                return _p$;
              }, {
                _v$15: undefined,
                _v$16: undefined,
                _v$17: undefined
              });
              return _el$62;
            })();
          },
          get children() {
            const _el$52 = libs.createElement("Panel", {
              id: "TaskBoardContent"
            }, null);
            libs.insert(_el$52, libs.createComponent(libs.Index, {
              get each() {
                return boardList();
              },
              children: (task, index) => libs.createComponent(BountyTaskCard, {
                get task() {
                  return task();
                },
                get period() {
                  return period();
                },
                mode: "board",
                slotIndex: index,
                requesting: requesting,
                get refreshInfo() {
                  return refreshInfo();
                },
                get completeInfo() {
                  return getCompleteInfo(period(), playerPropertyData());
                },
                get canAccept() {
                  return acceptedForPeriod().length < acceptedLimit();
                },
                onClaim: claimTask,
                onRefresh: refreshTask,
                onAccept: acceptTask,
                onDonate: donateTask,
                onComplete: completeTask
              })
            }));
            libs.effect(_$p => libs.setProp(_el$52, "classList", {
              PlayTaskEnterAnimation: playTaskEnterAnimation()
            }, _$p));
            return _el$52;
          }
        }), null);
        libs.insert(_el$45, libs.createComponent(libs.Show, {
          get when() {
            return !isMyBounty();
          },
          get children() {
            const _el$53 = libs.createElement("Panel", {
                id: "AcceptedSummaryPanel"
              }, null),
              _el$54 = libs.createElement("Label", {
                id: "AcceptedSummaryTitle",
                get text() {
                  return LocalizeWithVars("#TaskBoard_CurrentAccepted", {
                    current: acceptedForPeriod().length,
                    total: acceptedLimit()
                  });
                }
              }, _el$53),
              _el$55 = libs.createElement("Panel", {
                id: "AcceptedSummaryList",
                scroll: "y"
              }, _el$53);
            libs.setProp(_el$55, "scroll", "y");
            libs.insert(_el$55, libs.createComponent(libs.Show, {
              get when() {
                return acceptedForPeriod().length > 0;
              },
              get fallback() {
                return (() => {
                  const _el$72 = libs.createElement("Label", {
                    id: "AcceptedSummaryEmpty",
                    get text() {
                      return GetLocalization("#TaskBoard_AcceptedEmpty");
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$72, "text", GetLocalization("#TaskBoard_AcceptedEmpty"), _$p));
                  return _el$72;
                })();
              },
              get children() {
                return libs.createComponent(libs.Index, {
                  get each() {
                    return acceptedForPeriod().slice(0, 2);
                  },
                  children: task => libs.createComponent(AcceptedTaskSummary, {
                    get task() {
                      return task();
                    },
                    get period() {
                      return period();
                    }
                  })
                });
              }
            }));
            libs.insert(_el$53, libs.createComponent(EOM_Button.EOM_BaseButton, {
              id: "GoToMyBounty",
              get onactivate() {
                return props.onNavigateToMyBounty;
              },
              get children() {
                return [(() => {
                  const _el$56 = libs.createElement("Label", {
                    get text() {
                      return GetLocalization("#TaskBoard_GoToMyBounty");
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$56, "text", GetLocalization("#TaskBoard_GoToMyBounty"), _$p));
                  return _el$56;
                })(), libs.createElement("Panel", {
                  "class": "GoToArrow"
                }, null)];
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$54, "text", LocalizeWithVars("#TaskBoard_CurrentAccepted", {
              current: acceptedForPeriod().length,
              total: acceptedLimit()
            }), _$p));
            return _el$53;
          }
        }), null);
        libs.insert(_el$45, libs.createComponent(libs.Show, {
          get when() {
            return libs.memo(() => !!isMyBounty())() && acceptedTaskList().length > 0;
          },
          get children() {
            const _el$58 = libs.createElement("Panel", {
                "class": "EndTimeArea"
              }, null),
              _el$59 = libs.createElement("Panel", {
                horizontalAlign: "center",
                flowChildren: "right"
              }, _el$58),
              _el$60 = libs.createElement("Label", {
                id: "BountyExpiryHint",
                get text() {
                  return GetLocalization("#TaskBoard_BountyExpiryHint");
                }
              }, _el$58);
            libs.setProp(_el$59, "horizontalAlign", "center");
            libs.setProp(_el$59, "flowChildren", "right");
            libs.insert(_el$59, libs.createComponent(libs.Show, {
              get when() {
                return dailyAcceptedEndTime() != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                  icon: true,
                  get endTime() {
                    return dailyAcceptedEndTime();
                  },
                  text: "#TaskBoard_DailyBountyEndTime"
                });
              }
            }), null);
            libs.insert(_el$59, libs.createComponent(libs.Show, {
              get when() {
                return weeklyAcceptedEndTime() != undefined;
              },
              get children() {
                return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                  icon: true,
                  get endTime() {
                    return weeklyAcceptedEndTime();
                  },
                  text: "#TaskBoard_WeeklyBountyEndTime"
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$60, "text", GetLocalization("#TaskBoard_BountyExpiryHint"), _$p));
            return _el$58;
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$45, "classList", {
          MyBountyView: isMyBounty()
        }, _$p));
        return _el$45;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!isMyBounty())() && page() > 1;
        },
        get children() {
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "PagePrev",
            onactivate: () => setPage(page() - 1)
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!isMyBounty())() && page() < totalPages();
        },
        get children() {
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "PageNext",
            onactivate: () => setPage(page() + 1)
          });
        }
      })];
    }
  });
};

const MENU_LIST = {
  task_board: ["daily_board", "week_board", "my_bounty"],
  Flowers: []
};
const {
  LayoutMenu,
  show,
  secondTabName,
  setSecondTabName,
  menuName
} = EOM_MenuLayout.createMenuLayout("task_board", () => MENU_LIST);
const flowersRedPoint = StoreTagPage.createStoreTagRedPointData("Flowers");
function Battlepass() {
  libs.createEffect(() => {
    CustomUIConfig.SetRedPoint(needShowDailyRedPoint(), "task_board", "task_board", "daily_board");
    CustomUIConfig.SetRedPoint(needShowWeeklyRedPoint(), "task_board", "task_board", "week_board");
    CustomUIConfig.SetRedPoint(flowersRedPoint(), "task_board", "task_board", "Flowers");
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "TaskBoardRoot",
    name: "MenuButton_board",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(Player.CurrencyGroup, {
        tokens: [110007]
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "daily_board" || secondTabName() == "week_board" || secondTabName() == "my_bounty";
            },
            get children() {
              return libs.createComponent(TaskBoard, {
                get secondTabName() {
                  return secondTabName();
                },
                onNavigateToMyBounty: () => setSecondTabName("my_bounty")
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Flowers";
            },
            get children() {
              return libs.createComponent(StoreTagPage.StoreTagPage, {
                tag: "Flowers"
              });
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(Battlepass, {}), $.GetContextPanel());