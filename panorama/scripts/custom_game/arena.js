--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('arena', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');
var ProductImage = require('./ProductImage.js');

const language = $.Language().toLowerCase();
const getArenaActivityTime = () => {
  const TIMEZONE_OFFSET_S = 8 * 60 * 60;
  const now = new Date(Date.now() + TIMEZONE_OFFSET_S * 1000);
  const currentDay = now.getUTCDay();
  let daysUntilSaturday;
  if (currentDay === 6) {
    daysUntilSaturday = 0;
  } else {
    daysUntilSaturday = (6 - currentDay + 7) % 7;
  }
  const nextTokenTime = new Date(now);
  nextTokenTime.setUTCDate(now.getUTCDate() + daysUntilSaturday);
  nextTokenTime.setUTCHours(17, 50, 0, 0);
  const nextStartTime = new Date(now);
  nextStartTime.setUTCDate(now.getUTCDate() + daysUntilSaturday);
  nextStartTime.setUTCHours(18, 0, 0, 0);
  const nextEndTime = new Date(now);
  nextEndTime.setUTCDate(now.getUTCDate() + daysUntilSaturday);
  nextEndTime.setUTCHours(24, 0, 0, 0);
  return {
    token_time: Math.floor(nextTokenTime.getTime() / 1000) - TIMEZONE_OFFSET_S,
    start_time: Math.floor(nextStartTime.getTime() / 1000) - TIMEZONE_OFFSET_S,
    end_time: Math.floor(nextEndTime.getTime() / 1000) - TIMEZONE_OFFSET_S
  };
};
const activityID = 50001;
const Activity_arena = props => {
  const [ticketToken, setTicketToken] = libs.createSignal(1000001);
  const [ticketPrice, setTicketPrice] = libs.createSignal(10);
  const [moonstone, setMoonstone] = libs.createSignal(0);
  const costEnough = () => moonstone() >= ticketPrice();
  const [activityTime, setActivityTime] = libs.createSignal({
    start_time: 0,
    end_time: 0
  });
  let [countdownType, setCountdownType] = libs.createSignal(3);
  let [activityCountdown, setActivityCountdown] = libs.createSignal(0);
  const [received, setReceived] = libs.createSignal(false);
  const [activated, setActivated] = libs.createSignal(false);
  const [taskProgress, setTaskProgress] = libs.createSignal(0);
  const [failProgress, setFailProgress] = libs.createSignal(0);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const previewRewardList = libs.createMemo(() => {
    if (rewardList().length > 0) {
      return rewardList()[rewardList().length - 1]?.rewards ?? [];
    }
    return [];
  });
  let [tokenUseEnable, setTokenUseEnable] = libs.createSignal(false);
  let timer;
  libs.createEffect(() => {
    if (props.selected && props.show) {
      let time = getArenaActivityTime();
      timer = setInterval(() => {
        if (countdownType() != 3) {
          let t = Math.floor(Date.now() / 1000);
          if (t > time.start_time) {
            setCountdownType(2);
            setActivityCountdown(time.end_time);
          } else {
            setCountdownType(1);
            setActivityCountdown(time.start_time);
          }
          setTokenUseEnable(t >= time.token_time && t < time.end_time);
        }
      }, 1000);
    } else {
      if (timer != undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    }
  });
  libs.onMount(() => {
    let gameEventIDList = [];
    let NetTableIDList = [];
    callAction("activity_data", {
      activity_id: activityID
    });
    gameEventIDList.push(useNetData("player_wallet", data => {
      setMoonstone(data.moonstone);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      if (data) {
        let activity_data = data.find(v => v.activity_id == activityID);
        if (activity_data) {
          let extra_information = JSON.parseSafe(activity_data.extra_information);
          if (Object.keys(extra_information).length > 0) {
            setTicketToken(extra_information.arena_ticket_token);
            setTicketPrice(extra_information.arena_ticket_price);
            setActivityTime({
              start_time: extra_information.arena_start_time,
              end_time: extra_information.arena_end_time
            });
            setRewardList(extra_information.rewards.sort((a, b) => a.reward_id - b.reward_id));
          }
        }
      }
    }));
    gameEventIDList.push(useNetData("arena_activity_data", data => {
      if (data?.[activityID.toString()]) {
        let _data = data[activityID.toString()];
        console.log("_data");
        DeepPrint(_data);
        setReceived(_data.received);
        setActivated(_data.active);
        if (_data.active && !_data.received) {
          setCountdownType(3);
          setActivityCountdown(_data.task_end_time);
        } else {
          setCountdownType(1);
        }
        setTaskProgress(_data.progress);
        setFailProgress(_data.fail_progress);
      }
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
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
              return libs.createComponent(libs.Show, {
                get when() {
                  return activated();
                },
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
                      return tokenUseEnable();
                    },
                    get color() {
                      return costEnough() ? "Gold" : "Red";
                    },
                    text: "#Activity_arena_tokenaccess",
                    onactivate: () => {
                      if (costEnough()) {
                        callAction("start_arena", {
                          activity_id: activityID
                        });
                      } else {
                        clientSideEvent("toggle_store_tag", {
                          menu: "Resource"
                        });
                      }
                    }
                  })];
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    id: "TokenAccessButton",
                    enabled: false,
                    color: "Green",
                    text: "#mail_action_receive"
                  });
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
                        server_time: true
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
                    UnLocked: taskProgress() == 0,
                    Complete: taskProgress() > 0
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
                                return libs.createComponent(ProductImage.ProductImage, {
                                  get itemid() {
                                    return reward().item_id;
                                  },
                                  get count() {
                                    return reward().amounts;
                                  }
                                });
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
                    UnLocked: taskProgress() == 1,
                    Complete: taskProgress() > 1
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
                                return libs.createComponent(ProductImage.ProductImage, {
                                  get itemid() {
                                    return reward().item_id;
                                  },
                                  get count() {
                                    return reward().amounts;
                                  }
                                });
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
                    UnLocked: taskProgress() == 2,
                    Complete: taskProgress() > 2
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
                                return libs.createComponent(ProductImage.ProductImage, {
                                  get itemid() {
                                    return reward().item_id;
                                  },
                                  get count() {
                                    return reward().amounts;
                                  }
                                });
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
            id: "FailureMission",
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
                            return libs.createComponent(ProductImage.ProductImage, {
                              get itemid() {
                                return reward().item_id;
                              },
                              get count() {
                                return reward().amounts;
                              }
                            });
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
        id: "ActivityDescription",
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            className: language,
            text: "#Activity_arena_infodesc",
            html: true
          });
        }
      }), libs.createComponent(ArenaRank, {})];
    }
  });
};
const ArenaRank = () => {
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
            scroll: "y"
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "SelfRank"
          })];
        }
      })];
    }
  }), libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "RankPages"
  })];
};

exports.Activity_arena = Activity_arena;
exports.getArenaActivityTime = getArenaActivityTime;