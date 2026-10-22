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
var solid_utils = require('./solid_utils.js');
var activity_menu = require('./activity_menu.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var ExchangeStore = require('./ExchangeStore.js');
var RecycleView = require('./RecycleView.js');
var StoreItem = require('./StoreItem.js');
var dig_veins_logic = require('./dig_veins_logic.js');
var mining_activity_redpoints = require('./mining_activity_redpoints.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOMChildren = require('./EOMChildren.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
var EOM_RedMark = require('./EOM_RedMark.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const playerBPInfo$2 = solid_utils.createServiceNetData("player_battle_passes", {});
const CurrentBPSeason = libs.createMemo(() => {
  const serverTime = Math.floor(CustomUIConfig.GetServerTimeStamp());
  let season = 1;
  for (let i = 1; i <= 1000; i++) {
    const config = KeyValues.bp_season[String(i)];
    if (!config) break;
    if (serverTime >= config.start_time) {
      season = i;
    }
  }
  return season;
});
const [selectedBPSeason, setSelectedBPSeason] = libs.createSignal(CurrentBPSeason());
const BPSeason = libs.createMemo(() => selectedBPSeason());
const availableBPSeasons = libs.createMemo(() => {
  const currentSeason = CurrentBPSeason();
  return Object.keys(KeyValues.bp_season).map(Number).filter(season => Number.isInteger(season) && season >= 1 && season <= currentSeason).sort((a, b) => b - a);
});
const currentBPInfo$2 = libs.createMemo(() => playerBPInfo$2()[BPSeason()]);
const BPConfig = libs.createMemo(() => KeyValues.bp_season[BPSeason()]);
const BPExpConfig = libs.createMemo(() => KeyValues.bp_level_exp[BPSeason()]);
const BATTLE_PASS_ENDING_REMINDER_SECONDS = 5 * 24 * 60 * 60;
const BPRewardData = libs.createMemo(() => {
  const seasonReward = KeyValues.bp_rewards[BPSeason()] ?? {};
  const seasonRewardKeys = Object.keys(seasonReward);
  const arr = [];
  const rec = {};
  for (let i = 0; i < seasonRewardKeys.length; i++) {
    let lv = seasonRewardKeys[i];
    let lvData = seasonReward[lv];
    let commonReward;
    let plusReward;
    if (lvData[0]) {
      const [itemID, amount] = lvData[0].rewards.split(":");
      commonReward = {
        id: lvData[0].id,
        itemID: Number(itemID),
        amount: Number(amount),
        rarity: lvData[0].values
      };
    }
    if (lvData[1]) {
      const [itemID, amount] = lvData[1].rewards.split(":");
      plusReward = {
        id: lvData[1].id,
        itemID: Number(itemID),
        amount: Number(amount),
        rarity: lvData[1].values
      };
    }
    let data = {
      idx: i,
      level: Number(lv),
      commonReward,
      plusReward
    };
    rec[Number(lv)] = data;
    arr.push(data);
  }
  arr.sort((a, b) => a.level - b.level);
  return {
    arr,
    rec
  };
});
const BPRewards = () => BPRewardData().arr;
const BPRewardRecord = () => BPRewardData().rec;
const RewardDimensions = {
  width: 148,
  height: 481
};
let listHandle;
const [iNextSpecial, SetNextSpecial] = libs.createSignal(10);
const [canScrollLeft, setCanScrollLeft] = libs.createSignal(false);
const [canScrollRight, setCanScrollRight] = libs.createSignal(true);
const [showPreviewReward, setShowPreviewReward] = libs.createSignal(false);
const getReceiveKey = (level, plus) => `${level}_${plus ? "plus" : "common"}`;
const isInfiniteRewardLevel = level => level > BPConfig().max_level;
const infiniteRewardIndex = libs.createMemo(() => {
  return BPRewards().findIndex(reward => isInfiniteRewardLevel(reward.level));
});
const scrollToPlayerLevel = () => {
  const playerLevel = currentBPInfo$2()?.level ?? 1;
  if (playerLevel > BPConfig().max_level) {
    const index = infiniteRewardIndex();
    return index >= 0 ? index : Math.max(BPRewards().length - 1, 0);
  }
  const index = BPRewards().findIndex(reward => reward.level >= playerLevel);
  return index >= 0 ? index : Math.max(BPRewards().length - 1, 0);
};
const getNextSpecialReward = () => {
  return BPRewardRecord()[iNextSpecial()] ?? BPRewards().find(reward => reward.level > iNextSpecial()) ?? BPRewards()[BPRewards().length - 1];
};
const updateScrollButtons = percent => {
  setCanScrollLeft(percent > 0.001);
  setCanScrollRight(percent < 0.999);
};
const isSameReceiveStateRecord = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
};
const reciveStateRecord = libs.createMemo(prev => {
  const received = currentBPInfo$2()?.received || [];
  const playerLevel = currentBPInfo$2()?.level ?? 1;
  const maxLevel = BPConfig().max_level;
  const receivedSet = new Set();
  const result = {};
  for (const item of received) {
    const key = `${item.level}_${item.plus ? "plus" : "common"}`;
    receivedSet.add(key);
    if (BPRewardRecord()[item.level]) {
      result[key] = "Recviced";
    }
  }
  for (const reward of BPRewards()) {
    const commonKey = `${reward.level}_common`;
    if (!result[commonKey]) {
      if (playerLevel < reward.level) {
        result[commonKey] = "Unreached";
      } else {
        result[commonKey] = "CanRecvice";
      }
    }
    if (reward.plusReward) {
      const plusKey = `${reward.level}_plus`;
      if (!result[plusKey]) {
        if (playerLevel < reward.level) {
          result[plusKey] = "Unreached";
        } else if (currentBPInfo$2()?.plus ?? false) {
          result[plusKey] = "CanRecvice";
        }
      }
    }
  }
  const getInfiniteState = plus => {
    if (plus && !(currentBPInfo$2()?.plus ?? false)) {
      return "Unreached";
    }
    if (playerLevel <= maxLevel) {
      return "Unreached";
    }
    for (let level = maxLevel + 1; level <= playerLevel; level++) {
      if (!receivedSet.has(getReceiveKey(level, plus))) {
        return "CanRecvice";
      }
    }
    return "Recviced";
  };
  for (const reward of BPRewards()) {
    if (!isInfiniteRewardLevel(reward.level)) continue;
    if (reward.commonReward) {
      result[getReceiveKey(reward.level, false)] = getInfiniteState(false);
    }
    if (reward.plusReward) {
      result[getReceiveKey(reward.level, true)] = getInfiniteState(true);
    }
  }
  return isSameReceiveStateRecord(prev, result) ? prev : result;
}, {});
const _bpHasClaimable = libs.createMemo(() => {
  const states = reciveStateRecord();
  for (const key in states) {
    if (states[key] === "CanRecvice") return true;
  }
  return false;
});
libs.createEffect(libs.on(() => [BPSeason(), _bpHasClaimable()], ([season, red]) => {
  if (season === CurrentBPSeason()) {
    CustomUIConfig.SetRedPoint(red, "activity", "battlepass", "battlepass");
  }
}));
const BattlePass = () => {
  libs.onMount(() => {
    libs.onCleanup(() => {
      setShowPreviewReward(false);
    });
  });
  const isInfiniteLevel = () => (currentBPInfo$2()?.level ?? 1) > BPConfig().max_level;
  const progressMaxLvExp = () => {
    const expLevel = isInfiniteLevel() ? 10001 : currentBPInfo$2()?.level ?? 1;
    return BPExpConfig()[expLevel]?.exp ?? BPExpConfig()[10001]?.exp ?? 1;
  };
  const maxLvExp = () => {
    return String(progressMaxLvExp());
  };
  const expPercent = () => {
    const maxExp = progressMaxLvExp();
    if (maxExp <= 0) return 0;
    return Math.max(0, Math.min(100, (currentBPInfo$2()?.extra_exp ?? 0) / maxExp * 100));
  };
  const selectBPSeason = season => {
    setSelectedBPSeason(season);
    CallAction("/v1/battle_pass/fetch", {
      season
    });
    SetNextSpecial(10);
    setCanScrollLeft(false);
    setCanScrollRight(true);
    $.Schedule(0, () => listHandle?.scroll2Child(scrollToPlayerLevel(), "center", true));
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Battlepass",
    get ["class"]() {
      return libs.classNames({
        ShowPreviewReward: showPreviewReward()
      });
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "BPSeasonInfo"
          }, _el$),
          _el$3 = libs.createElement("Panel", {
            id: "Season"
          }, _el$2);
          libs.createElement("Image", {
            id: "S"
          }, _el$3);
          const _el$5 = libs.createElement("Image", {
            id: "SeasonNum",
            get ["class"]() {
              return String(BPSeason());
            }
          }, _el$3);
          libs.createElement("Label", {
            id: "Text",
            text: "#BP_SeasonPass"
          }, _el$3);
          libs.createElement("Panel", {
            id: "SeasonLine"
          }, _el$2);
          const _el$8 = libs.createElement("Panel", {
            id: "PassRewardListContainer"
          }, _el$),
          _el$9 = libs.createElement("Panel", {
            id: "PassType"
          }, _el$8);
          libs.createElement("Panel", {
            id: "Normal"
          }, _el$9);
          libs.createElement("Panel", {
            id: "Advanced"
          }, _el$9);
          const _el$10 = libs.createElement("Panel", {
            id: "NextSpecialRewardContainer"
          }, _el$8),
          _el$11 = libs.createElement("Panel", {
            id: "LvInfo"
          }, _el$),
          _el$12 = libs.createElement("Panel", {
            id: "Lv"
          }, _el$11),
          _el$13 = libs.createElement("Label", {
            get text() {
              return currentBPInfo$2()?.level ?? 1;
            }
          }, _el$12),
          _el$14 = libs.createElement("Panel", {
            id: "ExpInfo"
          }, _el$11),
          _el$15 = libs.createElement("Label", {
            id: "Exp",
            text: "#BP_ExpFormat",
            get dialogVariables() {
              return {
                cur: currentBPInfo$2()?.extra_exp ?? 0,
                max: maxLvExp()
              };
            }
          }, _el$14),
          _el$16 = libs.createElement("Panel", {
            id: "ExpBarContainer"
          }, _el$14),
          _el$17 = libs.createElement("Panel", {
            id: "Bar",
            get style() {
              return {
                clip: `rect( 0%, ${expPercent()}%, 100%, 0% )`
              };
            }
          }, _el$16),
          _el$18 = libs.createElement("Panel", {
            id: "Btns"
          }, _el$);
        libs.insert(_el$3, libs.createComponent(libs.Show, {
          get when() {
            return CurrentBPSeason() > 1;
          },
          get children() {
            return libs.createComponent(EOM_DropDown.EOM_DropDown, {
              type: "EquipmentDropDown",
              customWidth: "300px",
              get index() {
                return availableBPSeasons().indexOf(BPSeason());
              },
              onChange: index => {
                const season = availableBPSeasons()[index];
                if (season !== undefined) {
                  selectBPSeason(season);
                }
              },
              get children() {
                return libs.createComponent(libs.For, {
                  get each() {
                    return availableBPSeasons();
                  },
                  children: season => (() => {
                    const _el$20 = libs.createElement("Label", {
                      text: "#BP_SeasonTitle",
                      vars: {
                        value: season
                      }
                    }, null);
                    libs.setProp(_el$20, "vars", {
                      value: season
                    });
                    return _el$20;
                  })()
                });
              }
            });
          }
        }), null);
        libs.insert(_el$2, libs.createComponent(EOM_Countdown.EOM_Countdown, {
          icon: true,
          get endTime() {
            return BPConfig().end_time;
          },
          text: "#BP_EndTime2"
        }), null);
        libs.insert(_el$8, libs.createComponent(RecycleView.RecycleView, {
          id: "RewardList",
          input: BPRewards,
          direction: "Horizontal",
          childConfig: RewardDimensions,
          showBar: false,
          wheelStep: 148 * 0.5,
          onScrollPercent: updateScrollButtons,
          handle: h => listHandle = h,
          onScroll: (fScroll, handler) => {
            const pList = handler.refRoot;
            if (pList) {
              const fRightEdge = fScroll + pList.actuallayoutwidth;
              for (let i = 10; i <= BPConfig().max_level; i += 10) {
                if (i * RewardDimensions.width > fRightEdge) {
                  SetNextSpecial(i);
                  return;
                }
              }
              SetNextSpecial(BPConfig().max_level);
            }
          },
          onload: p => {
            let id = setInterval(() => {
              if (p?.IsValid() && p.actuallayoutwidth > 0 && p.actuallayoutheight > 0) {
                listHandle?.scroll2Child(scrollToPlayerLevel(), "center");
                clearInterval(id);
              }
            }, 0.1);
          },
          children: info => libs.createComponent(RewardDetails, libs.mergeProps$1(info, {
            get HighlightReward() {
              return info().level % 10 === 0;
            }
          }))
        }), _el$10);
        libs.insert(_el$10, libs.createComponent(RewardDetails, libs.mergeProps$1(getNextSpecialReward, {
          special: true
        })));
        libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "RightArrow",
          get enabled() {
            return canScrollRight();
          },
          onactivate: () => {
            listHandle?.scroll(toFiniteNumber(listHandle.refRoot?.actuallayoutwidth));
          }
        }), null);
        libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "LeftArrow",
          get enabled() {
            return canScrollLeft();
          },
          onactivate: () => {
            listHandle?.scroll(-toFiniteNumber(listHandle.refRoot?.actuallayoutwidth));
          }
        }), null);
        libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "AddExpBtn",
          onactivate: () => {
            ClientSideEvent("directly_purchase", {
              itemid: BPConfig().exp_goods_id,
              source: "battlepass"
            });
          }
        }), null);
        libs.insert(_el$18, libs.createComponent(libs.Show, {
          get when() {
            return !(currentBPInfo$2()?.plus ?? false);
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_Button, {
              marginRight: "10px",
              color: "Confirm",
              text: "#BP_UnlockPass",
              onactivate: () => {
                if (BPConfig().end_time - CustomUIConfig.GetServerTimeStamp() <= BATTLE_PASS_ENDING_REMINDER_SECONDS) {
                  ErrorMessage("#error_bp_endtime");
                }
                ClientSideEvent("directly_purchase", {
                  itemid: BPConfig().plus_goods_id,
                  source: "battlepass"
                });
              }
            });
          }
        }), null);
        libs.insert(_el$18, libs.createComponent(EOM_Button.EOM_Button, {
          text: "#Activity_ReceiveALl",
          get enabled() {
            return _bpHasClaimable();
          },
          onactivate: () => {
            CallAction("/v1/battle_pass/receive_rewards", {
              season: BPSeason(),
              receive_all: true
            });
          }
        }), null);
        libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "PreviewReward",
          onactivate: () => {
            setShowPreviewReward(prev => {
              return !prev;
            });
          },
          get children() {
            return libs.createElement("Label", {
              text: "#BP_ViewRewards"
            }, null);
          }
        }), null);
        libs.effect(_p$ => {
          const _v$ = String(BPSeason()),
            _v$2 = currentBPInfo$2()?.level ?? 1,
            _v$3 = {
              cur: currentBPInfo$2()?.extra_exp ?? 0,
              max: maxLvExp()
            },
            _v$4 = {
              clip: `rect( 0%, ${expPercent()}%, 100%, 0% )`
            };
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "class", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$13, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "dialogVariables", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$17, "style", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return showPreviewReward();
        },
        get children() {
          return libs.createComponent(PreviewRewardWindow, {});
        }
      })];
    }
  });
};
function RewardDetails(props) {
  const commonState = libs.createMemo(() => reciveStateRecord()[getReceiveKey(props.level, false)]);
  const plusState = libs.createMemo(() => reciveStateRecord()[getReceiveKey(props.level, true)]);
  const isActive = libs.createMemo(() => (currentBPInfo$2()?.level ?? 1) >= props.level || (currentBPInfo$2()?.level ?? 1) > BPConfig().max_level);
  const plusLocked = libs.createMemo(() => !(currentBPInfo$2()?.plus ?? false));
  return (() => {
    const _el$21 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("RewardItem", {
            HighlightReward: props.HighlightReward
          });
        }
      }, null),
      _el$22 = libs.createElement("Panel", {
        id: "RewardLevel"
      }, _el$21);
    libs.setProp(_el$21, "onactivate", () => {
      if (commonState() == "CanRecvice" || plusState() == "CanRecvice") {
        CallAction("/v1/battle_pass/receive_rewards", {
          season: BPSeason(),
          receive_all: true
        });
      }
    });
    libs.insert(_el$22, libs.createComponent(libs.Show, {
      get when() {
        return props.level <= BPConfig().max_level;
      },
      get fallback() {
        return libs.createElement("Label", {
          text: "\u221e"
        }, null);
      },
      get children() {
        const _el$23 = libs.createElement("Label", {
          get text() {
            return props.level;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$23, "text", props.level, _$p));
        return _el$23;
      }
    }));
    libs.insert(_el$21, libs.createComponent(libs.Show, {
      get when() {
        return props.commonReward;
      },
      children: reward => libs.createComponent(BPItem, libs.mergeProps$1(reward, {
        isPlus: false,
        get recviceState() {
          return commonState();
        },
        isLock: false
      }))
    }), null);
    libs.insert(_el$21, libs.createComponent(libs.Show, {
      get when() {
        return props.plusReward;
      },
      children: reward => libs.createComponent(BPItem, libs.mergeProps$1(reward, {
        isPlus: true,
        get recviceState() {
          return plusState();
        },
        get isLock() {
          return plusLocked();
        }
      }))
    }), null);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames("RewardItem", {
          HighlightReward: props.HighlightReward
        }),
        _v$6 = {
          Active: isActive()
        };
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$21, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$22, "classList", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$21;
  })();
}
function BPItem(props) {
  return (() => {
    const _el$25 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("BPItem", "Rarity_" + props.rarity, props.recviceState, {
            IsPlus: props.isPlus,
            Locked: props.isLock
          });
        }
      }, null),
      _el$26 = libs.createElement("Panel", {
        id: "Border",
        hittest: false
      }, _el$25);
      libs.createElement("Panel", {
        id: "LockIcon",
        hittest: false
      }, _el$25);
      libs.createElement("Panel", {
        id: "RecvicedIcon",
        hittest: false
      }, _el$25);
    libs.insert(_el$25, libs.createComponent(StoreItem.StoreItemBlock, {
      get item_id() {
        return props.itemID;
      },
      get rarity() {
        return props.rarity;
      },
      get amounts() {
        return props.amount;
      }
    }), _el$26);
    libs.effect(_$p => libs.setProp(_el$25, "class", libs.classNames("BPItem", "Rarity_" + props.rarity, props.recviceState, {
      IsPlus: props.isPlus,
      Locked: props.isLock
    }), _$p));
    return _el$25;
  })();
}
const PreviewRewardWindow = () => {
  const plusRewards = libs.createMemo(() => {
    const map = new Map();
    for (const r of BPRewards()) {
      if (!r.plusReward) continue;
      const existing = map.get(r.plusReward.itemID);
      if (existing) {
        existing.amount += r.plusReward.amount;
        existing.maxConfigRarity = Math.max(existing.maxConfigRarity, r.plusReward.rarity);
      } else {
        map.set(r.plusReward.itemID, {
          itemID: r.plusReward.itemID,
          amount: r.plusReward.amount,
          maxConfigRarity: r.plusReward.rarity
        });
      }
    }
    const items = [];
    for (const v of map.values()) {
      const rarity = KeyValues.info_item_rarity[v.itemID]?.rarity ?? v.maxConfigRarity;
      items.push({
        id: String(v.itemID),
        itemID: v.itemID,
        amount: v.amount,
        rarity
      });
    }
    items.sort((a, b) => b.rarity - a.rarity);
    return items;
  });
  const [hoverItem, setHoverItem] = libs.createSignal();
  libs.createEffect(libs.on(plusRewards, rewards => {
    const currentItemID = hoverItem()?.itemID;
    setHoverItem(rewards.find(item => item.itemID === currentItemID) ?? rewards[0]);
  }));
  const access = libs.createMemo(() => {
    if (!hoverItem()) {
      return "";
    }
    return GetLocalization(`#${hoverItem().itemID}_description`);
  });
  return (() => {
    const _el$29 = libs.createElement("Panel", {
      id: "PreviewRewardWindow"
    }, null);
    libs.insert(_el$29, libs.createComponent(ExchangeStore.EOM_DrawerLayout, {
      get title() {
        return `#${BPConfig().plus_goods_id}`;
      },
      get show() {
        return showPreviewReward();
      },
      onclose: () => setShowPreviewReward(false),
      get children() {
        return [(() => {
          const _el$30 = libs.createElement("Panel", {
            id: "ItemList",
            scroll: "y",
            "class": "VerticalScrollStyle"
          }, null);
          libs.setProp(_el$30, "scroll", "y");
          libs.insert(_el$30, libs.createComponent(libs.For, {
            get each() {
              return plusRewards();
            },
            children: reward => libs.createComponent(BPRewardCard, libs.mergeProps$1(reward, {
              onmouseover: () => setHoverItem(reward)
            }))
          }));
          return _el$30;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return !(currentBPInfo$2()?.plus ?? false);
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_Button, {
              align: "center bottom",
              text: "#BP_UnlockPass",
              onactivate: () => {
                ClientSideEvent("directly_purchase", {
                  itemid: BPConfig().plus_goods_id,
                  source: "battlepass"
                });
              }
            });
          }
        })];
      }
    }), null);
    libs.insert(_el$29, libs.createComponent(libs.Show, {
      get when() {
        return hoverItem();
      },
      get children() {
        return [libs.createComponent(StoreItem.StoreItemImage, {
          id: "HoverItemImage",
          get itemid() {
            return hoverItem().itemID;
          }
        }), (() => {
          const _el$31 = libs.createElement("Panel", {
              id: "ItemInfo"
            }, null),
            _el$32 = libs.createElement("Panel", {
              flowChildren: "right"
            }, _el$31),
            _el$33 = libs.createElement("Label", {
              id: "Name",
              get text() {
                return "#" + hoverItem().itemID;
              }
            }, _el$32),
            _el$34 = libs.createElement("Label", {
              id: "Amount",
              get text() {
                return "x" + hoverItem().amount;
              }
            }, _el$32);
          libs.setProp(_el$32, "flowChildren", "right");
          libs.insert(_el$31, libs.createComponent(libs.Show, {
            get when() {
              return !access().startsWith("#");
            },
            get children() {
              return [libs.createElement("Panel", {
                "class": "Line"
              }, null), (() => {
                const _el$36 = libs.createElement("Label", {
                  id: "Access",
                  get text() {
                    return access();
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$36, "text", access(), _$p));
                return _el$36;
              })()];
            }
          }), null);
          libs.effect(_p$ => {
            const _v$7 = "#" + hoverItem().itemID,
              _v$8 = "x" + hoverItem().amount;
            _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$33, "text", _v$7, _p$._v$7));
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$34, "text", _v$8, _p$._v$8));
            return _p$;
          }, {
            _v$7: undefined,
            _v$8: undefined
          });
          return _el$31;
        })()];
      }
    }), null);
    return _el$29;
  })();
};
function BPRewardCard(props) {
  return (() => {
    const _el$37 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("BPRewardCard", "Rarity" + props.rarity);
        },
        get onmouseover() {
          return props.onmouseover;
        },
        get onmouseout() {
          return props.onmouseout;
        }
      }, null),
      _el$38 = libs.createElement("Label", {
        id: "ItemName",
        get text() {
          return "#" + props.itemID;
        }
      }, _el$37);
      libs.createElement("Image", {
        id: "SplitLine"
      }, _el$37);
      const _el$40 = libs.createElement("Label", {
        id: "ItemCount",
        get text() {
          return "×" + props.amount;
        },
        hittest: false
      }, _el$37);
    libs.insert(_el$37, libs.createComponent(StoreItem.StoreItemImage, {
      get itemid() {
        return props.itemID;
      }
    }), _el$40);
    libs.effect(_p$ => {
      const _v$9 = libs.classNames("BPRewardCard", "Rarity" + props.rarity),
        _v$0 = props.onmouseover,
        _v$1 = props.onmouseout,
        _v$10 = "#" + props.itemID,
        _v$11 = "×" + props.amount,
        _v$12 = props.amount > 1;
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$37, "class", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$37, "onmouseover", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$37, "onmouseout", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$38, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$40, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$40, "visible", _v$12, _p$._v$12));
      return _p$;
    }, {
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined
    });
    return _el$37;
  })();
}

const BattlepassInfo = props => {
  const BPConfig = () => KeyValues.bp_season[props.season];
  const BPExpConfig = () => KeyValues.bp_level_exp[props.season];
  const isInfiniteLevel = () => props.level > BPConfig().max_level;
  const upgradeExp = () => {
    const expLevel = isInfiniteLevel() ? 10001 : props.level;
    return BPExpConfig()[expLevel]?.exp ?? BPExpConfig()[10001]?.exp ?? 1;
  };
  const displayUpgradeExp = () => String(upgradeExp());
  const expPercent = () => {
    const maxExp = upgradeExp();
    if (maxExp <= 0) return 0;
    return Math.max(0, Math.min(100, props.extraExp / maxExp * 100));
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return "BattlepassInfo " + props.type;
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "BpLevel"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        get text() {
          return props.level;
        }
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        id: "SeasonTitle",
        get vars() {
          return {
            value: props.season
          };
        },
        text: "#BP_SeasonTitle"
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        id: "ExpBarContainer"
      }, _el$),
      _el$6 = libs.createElement("Panel", {
        id: "Bar",
        get style() {
          return {
            clip: `rect( 0%, ${expPercent()}%, 100%, 0% )`
          };
        }
      }, _el$5),
      _el$7 = libs.createElement("Label", {
        id: "ExpLabel",
        text: "#BP_ExpText",
        get vars() {
          return {
            value1: props.extraExp,
            value2: displayUpgradeExp()
          };
        }
      }, _el$),
      _el$8 = libs.createElement("Panel", {
        id: "EndTime"
      }, _el$);
      libs.createElement("Label", {
        id: "EndTimeTitle",
        text: "#BP_EndTimeTitle"
      }, _el$8);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
      id: "BuyBpLvBtn",
      size: "Small",
      text: "#BP_BuyLv",
      onactivate: () => {
        ClientSideEvent("directly_purchase", {
          itemid: BPConfig().exp_goods_id,
          source: "battlepass_info"
        });
      }
    }), _el$8);
    libs.insert(_el$8, libs.createComponent(EOM_Countdown.EOM_Countdown, {
      icon: true,
      get endTime() {
        return BPConfig().end_time;
      },
      text: "#BP_EndTime"
    }), null);
    libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_Button, {
      id: "BuyBpPlusBtn",
      text: "#BP_Plus",
      onactivate: () => {
        ClientSideEvent("directly_purchase", {
          itemid: BPConfig().plus_goods_id,
          source: "battlepass_info"
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "BattlepassInfo " + props.type,
        _v$2 = props.level,
        _v$3 = {
          value: props.season
        },
        _v$4 = {
          clip: `rect( 0%, ${expPercent()}%, 100%, 0% )`
        },
        _v$5 = {
          value1: props.extraExp,
          value2: displayUpgradeExp()
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "vars", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "style", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$7, "vars", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$;
  })();
};

const dayrewardConfig = KeyValues.dayreward ?? {};
const dayBoxEntry = Object.entries(dayrewardConfig)[0];
const dayBoxNeedCount = dayBoxEntry ? dayBoxEntry[1].task_num : 5;
const playerBPInfo$1 = solid_utils.createServiceNetData("player_battle_passes", {});
const currentSeason$1 = libs.createMemo(() => {
  const serverTime = Math.floor(CustomUIConfig.GetServerTimeStamp());
  let season = 1;
  for (let i = 1; i <= 1000; i++) {
    const config = KeyValues.bp_season[String(i)];
    if (!config) break;
    if (serverTime >= config.start_time) {
      season = i;
    }
  }
  return season;
});
const currentBPInfo$1 = libs.createMemo(() => playerBPInfo$1()[currentSeason$1()]);
const daily_task = solid_utils.createServiceNetData("player_daily_tasks", {});
const player_blessings$2 = solid_utils.createServiceNetData("player_blessings", {});
const player_daily_task_box_receive_records = solid_utils.createServiceNetData("player_daily_task_box_receive_records", {});
const BEIJING_TIME_OFFSET_SECONDS = 8 * 60 * 60;
const [currentServerTime, setCurrentServerTime] = libs.createSignal(Math.floor(CustomUIConfig.GetServerTimeStamp()));
setInterval(() => {
  setCurrentServerTime(Math.floor(CustomUIConfig.GetServerTimeStamp()));
}, 1000);
function getBeijingDayStart(timestamp) {
  const seconds = Math.floor(timestamp);
  return seconds - (seconds + BEIJING_TIME_OFFSET_SECONDS) % 86400;
}
function isTaskUnlocked$1(taskID, serverTime = currentServerTime()) {
  const blessingCondition = KeyValues.task[taskID]?.blessing_condition ?? 0;
  if (blessingCondition <= 0) return true;
  const buffData = player_blessings$2()?.[blessingCondition];
  if (buffData == undefined) return false;
  if (buffData.permanent) return true;
  return buffData.expire_time > serverTime;
}
function getTaskRewardList(taskID) {
  const kv = KeyValues.task[taskID];
  if (!kv) return [];
  return Object.entries(kv.rewards).map(([id, num]) => {
    return {
      id,
      num
    };
  });
}
const taskList$1 = libs.createMemo(() => {
  const timestamp = CustomUIConfig.GetServerTimeStamp();
  return Object.values(daily_task()).filter(task => {
    let kv = KeyValues.task[task.task_id];
    if (!kv || kv.type != 1) return false;
    if (task.end_time < timestamp) return false;
    if (task.start_time > timestamp) return false;
    return true;
  }).sort((a, b) => {
    const canReceive1 = a.progress >= a.target ? 1 : 0;
    const canReceive2 = b.progress >= b.target ? 1 : 0;
    const buff_condition1 = KeyValues.task[a.task_id]?.blessing_condition ?? 0;
    const buff_condition2 = KeyValues.task[b.task_id]?.blessing_condition ?? 0;
    return multiCompare(a.receive_progress - b.receive_progress, canReceive2 - canReceive1, buff_condition2 - buff_condition1);
  });
});
const receiveDailyTaskCount = libs.createMemo(() => taskList$1().filter(t => t.receive_progress == 1 && isTaskUnlocked$1(t.task_id)).length);
const isDailyBoxReceived = libs.createMemo(() => {
  const records = player_daily_task_box_receive_records();
  const today = String(getBeijingDayStart(CustomUIConfig.GetServerTimeStamp()));
  const record = records[today];
  return record != undefined;
});
const _dailyHasClaimable = libs.createMemo(() => {
  const tasks = taskList$1();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.receive_progress == 1) continue;
    if (!isTaskUnlocked$1(task.task_id)) continue;
    if (task.progress >= task.target) return true;
  }
  if (receiveDailyTaskCount() >= dayBoxNeedCount && !isDailyBoxReceived()) {
    return true;
  }
  return false;
});
libs.createEffect(libs.on(_dailyHasClaimable, red => {
  CustomUIConfig.SetRedPoint(red, "activity", "battlepass", "daily_task");
}));
function DailyTask() {
  const [bRequesting, SetRequesting] = libs.createSignal(false);
  const canReciveDailyBox = () => receiveDailyTaskCount() >= dayBoxNeedCount;
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "DailyTask",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "CenterBlock",
          hittest: false
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "BattlepassInfoContainer"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "DailyTaskContent"
        }, _el$),
        _el$4 = libs.createElement("Panel", {
          id: "DailyBox"
        }, _el$3),
        _el$5 = libs.createElement("Panel", {
          id: "DailyBoxIcon"
        }, _el$4);
        libs.createElement("Panel", {
          id: "DailyBoxReceived"
        }, _el$5);
        const _el$7 = libs.createElement("Panel", {
          id: "DailyBoxTitle"
        }, _el$4);
        libs.createElement("Label", {
          text: "#DailyTask_Box"
        }, _el$7);
        const _el$9 = libs.createElement("Label", {
          id: "DailyBoxProgressTitle",
          text: "#DailyTask_Progress",
          dialogVariables: {
            count: dayBoxNeedCount
          }
        }, _el$4),
        _el$0 = libs.createElement("Panel", {
          id: "ProgressContainer"
        }, _el$4),
        _el$1 = libs.createElement("Panel", {
          id: "ProgressBG"
        }, _el$0),
        _el$10 = libs.createElement("Panel", {
          id: "Bar",
          get style() {
            return {
              clip: `rect( 0%, ${receiveDailyTaskCount() / dayBoxNeedCount * 100}%, 100%, 0% )`
            };
          }
        }, _el$1),
        _el$11 = libs.createElement("Label", {
          id: "DailyBoxProgressValue",
          get text() {
            return `${receiveDailyTaskCount()}/${dayBoxNeedCount}`;
          }
        }, _el$0),
        _el$12 = libs.createElement("Panel", {
          id: "TaskList",
          flowChildren: "down",
          scroll: "y"
        }, _el$3);
      libs.insert(_el$2, libs.createComponent(BattlepassInfo, {
        type: "Long",
        get extraExp() {
          return currentBPInfo$1()?.extra_exp ?? 0;
        },
        get level() {
          return currentBPInfo$1()?.level ?? 1;
        },
        get season() {
          return currentSeason$1();
        }
      }));
      libs.setProp(_el$9, "dialogVariables", {
        count: dayBoxNeedCount
      });
      libs.insert(_el$4, libs.createComponent(libs.Show, {
        get when() {
          return !isDailyBoxReceived();
        },
        get fallback() {
          return libs.createElement("Panel", {
            id: "ReceivedTag"
          }, null);
        },
        get children() {
          return libs.createComponent(EOM_Button.EOM_Button, {
            id: "DailyBoxGetButton",
            get enabled() {
              return canReciveDailyBox();
            },
            text: "#DailyTask_Get",
            onactivate: () => {
              if (bRequesting()) {
                return;
              }
              SetRequesting(true);
              CallActionRequest("/v1/task/receive_daily_task_box", {
                day: getBeijingDayStart(CustomUIConfig.GetServerTimeStamp()),
                task_num: dayBoxNeedCount
              }, data => {
                SetRequesting(false);
              });
            }
          });
        }
      }), null);
      libs.setProp(_el$12, "flowChildren", "down");
      libs.setProp(_el$12, "scroll", "y");
      libs.insert(_el$12, libs.createComponent(libs.Index, {
        get each() {
          return taskList$1();
        },
        children: task => {
          const buffCondition = () => KeyValues.task[task().task_id].blessing_condition;
          const state = () => {
            if (!isTaskUnlocked$1(task().task_id)) return "Locked";
            if (task().receive_progress == 1) return "Received";
            if (task().progress >= task().target) return "CanReceive";
            return "WaitFinish";
          };
          const taskConfig = () => KeyValues.task[task().task_id];
          const descID = () => {
            let config = taskConfig();
            if (config.task_description == 1) {
              return config.task_id;
            } else {
              return config.event_id;
            }
          };
          const rewards = () => {
            return getTaskRewardList(task().task_id);
          };
          return (() => {
            const _el$14 = libs.createElement("Panel", {
                get ["class"]() {
                  return "TaskItem " + state();
                }
              }, null),
              _el$16 = libs.createElement("Label", {
                id: "TaskDes",
                get text() {
                  return "#Task_Desc_" + descID();
                },
                get vars() {
                  return {
                    target: GetLocalization(String(taskConfig().target)),
                    v1: GetLocalization(String(taskConfig().param_1)),
                    v2: GetLocalization(String(taskConfig().param_2)),
                    v3: GetLocalization(String(taskConfig().param_3))
                  };
                }
              }, _el$14),
              _el$17 = libs.createElement("Panel", {
                id: "TaskProgressContainer"
              }, _el$14),
              _el$18 = libs.createElement("Panel", {
                id: "ProgressBarBg"
              }, _el$17),
              _el$19 = libs.createElement("Panel", {
                id: "Bar",
                get style() {
                  return {
                    clip: `rect( 0%, ${task().progress / task().target * 100}%, 100%, 0% )`
                  };
                }
              }, _el$18),
              _el$20 = libs.createElement("Label", {
                get text() {
                  return `${task().progress}/${task().target}`;
                }
              }, _el$17),
              _el$21 = libs.createElement("Panel", {
                id: "TaskRewardList"
              }, _el$14);
            libs.insert(_el$14, libs.createComponent(libs.Show, {
              get when() {
                return buffCondition() > 0;
              },
              get children() {
                const _el$15 = libs.createElement("Image", {
                  id: "BuffIcon",
                  get src() {
                    return getSrcPath("tokens/" + buffCondition() + ".png");
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$15, "src", getSrcPath("tokens/" + buffCondition() + ".png"), _$p));
                return _el$15;
              }
            }), _el$16);
            libs.insert(_el$21, libs.createComponent(libs.For, {
              get each() {
                return rewards();
              },
              children: reward => {
                return libs.createComponent(StoreItem.StoreItemBlock, {
                  id: "TaskReward",
                  get item_id() {
                    return Number(reward.id);
                  },
                  get amounts() {
                    return reward.num;
                  }
                });
              }
            }));
            libs.insert(_el$14, libs.createComponent(libs.Show, {
              get when() {
                return state() != "Received";
              },
              get fallback() {
                return libs.createElement("Panel", {
                  id: "ReceivedTag"
                }, null);
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_Button, {
                  size: "Small",
                  id: "TaskReceiveBtn",
                  get enabled() {
                    return state() == "CanReceive";
                  },
                  get text() {
                    return libs.memo(() => state() == "Locked")() ? "#Task_NeedUnlock" : `#Task_${state()}`;
                  },
                  get vars() {
                    return libs.memo(() => state() == "Locked")() ? {
                      name: GetLocalization(String(buffCondition()))
                    } : undefined;
                  },
                  onactivate: () => {
                    const currentTask = task();
                    const serverTime = Math.floor(CustomUIConfig.GetServerTimeStamp());
                    if (bRequesting() || currentTask.receive_progress == 1 || currentTask.progress < currentTask.target || !isTaskUnlocked$1(currentTask.task_id, serverTime)) {
                      return;
                    }
                    SetRequesting(true);
                    CallActionRequest("/v1/task/receive_rewards", {
                      task_id: currentTask.task_id,
                      extra_id: currentTask.extra_id
                    }, data => {
                      SetRequesting(false);
                    });
                  }
                });
              }
            }), null);
            libs.effect(_p$ => {
              const _v$4 = "TaskItem " + state(),
                _v$5 = "#Task_Desc_" + descID(),
                _v$6 = {
                  target: GetLocalization(String(taskConfig().target)),
                  v1: GetLocalization(String(taskConfig().param_1)),
                  v2: GetLocalization(String(taskConfig().param_2)),
                  v3: GetLocalization(String(taskConfig().param_3))
                },
                _v$7 = {
                  clip: `rect( 0%, ${task().progress / task().target * 100}%, 100%, 0% )`
                },
                _v$8 = `${task().progress}/${task().target}`;
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "class", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$16, "text", _v$5, _p$._v$5));
              _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$16, "vars", _v$6, _p$._v$6));
              _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$19, "style", _v$7, _p$._v$7));
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$20, "text", _v$8, _p$._v$8));
              return _p$;
            }, {
              _v$4: undefined,
              _v$5: undefined,
              _v$6: undefined,
              _v$7: undefined,
              _v$8: undefined
            });
            return _el$14;
          })();
        }
      }));
      libs.effect(_p$ => {
        const _v$ = (() => {
            const rewards = {};
            if (dayBoxEntry) {
              for (const pair of dayBoxEntry[1].rewards.split("|")) {
                const [id, num] = pair.split(":");
                rewards[id] = Number(num);
              }
            }
            return {
              name: "bundle_preview",
              item_list: JSON.stringify(rewards)
            };
          })(),
          _v$2 = {
            clip: `rect( 0%, ${receiveDailyTaskCount() / dayBoxNeedCount * 100}%, 100%, 0% )`
          },
          _v$3 = `${receiveDailyTaskCount()}/${dayBoxNeedCount}`;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "customTooltip", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$10, "style", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$11, "text", _v$3, _p$._v$3));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined
      });
      return _el$;
    }
  });
}

const player_weekly_tasks = solid_utils.createServiceNetData("player_weekly_tasks", {});
const player_blessings$1 = solid_utils.createServiceNetData("player_blessings");
const playerBPInfo = solid_utils.createServiceNetData("player_battle_passes", {});
const currentSeason = libs.createMemo(() => {
  const serverTime = Math.floor(CustomUIConfig.GetServerTimeStamp());
  let season = 1;
  for (let i = 1; i <= 1000; i++) {
    const config = KeyValues.bp_season[String(i)];
    if (!config) break;
    if (serverTime >= config.start_time) {
      season = i;
    }
  }
  return season;
});
const currentBPInfo = libs.createMemo(() => playerBPInfo()[currentSeason()]);
function isTaskUnlocked(taskID) {
  const blessingCondition = KeyValues.task[taskID]?.blessing_condition ?? 0;
  if (blessingCondition <= 0) return true;
  const buffData = player_blessings$1()?.[blessingCondition];
  return buffData != undefined && !(buffData.expire_time != -1 && buffData.permanent == false && buffData.expire_time < Math.floor(CustomUIConfig.GetServerTimeStamp()));
}
function getTaskState(task) {
  if (!isTaskUnlocked(task.task_id)) return "Locked";
  if (task.receive_progress == 1) return "Received";
  if (task.progress >= task.target) return "CanReceive";
  return "WaitFinish";
}
function isTaskClaimable(task) {
  return getTaskState(task) == "CanReceive";
}
function getTaskSortWeight(task) {
  if (task.receive_progress == 1) return 2;
  if (isTaskClaimable(task)) return 0;
  return 1;
}
function getTaskRewardTooltip(taskID) {
  const kv = KeyValues.task[taskID];
  const rewards = {};
  if (kv) {
    for (const [id, num] of Object.entries(kv.rewards)) {
      rewards[id] = num;
    }
  }
  return {
    name: "bundle_preview",
    item_list: JSON.stringify(rewards)
  };
}
const taskList = libs.createMemo(() => {
  const timestamp = CustomUIConfig.GetServerTimeStamp();
  return Object.values(player_weekly_tasks()).filter(task => {
    let kv = KeyValues.task[task.task_id];
    if (!kv || kv.type != 2) return false;
    if (task.end_time < timestamp) return false;
    if (task.start_time > timestamp) return false;
    return true;
  }).sort((a, b) => getTaskSortWeight(a) - getTaskSortWeight(b));
});
const _weekHasClaimable = libs.createMemo(() => {
  const tasks = taskList();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (isTaskClaimable(task)) return true;
  }
  return false;
});
libs.createEffect(libs.on(_weekHasClaimable, red => {
  CustomUIConfig.SetRedPoint(red, "activity", "battlepass", "week_task");
}));
function WeekTask() {
  const [bRequesting, SetRequesting] = libs.createSignal(false);
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "WeekTask",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "CenterBlock",
          hittest: false
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "BattlepassInfoContainer"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "WeekTaskContent",
          flowChildren: "right",
          scroll: "x"
        }, _el$);
      libs.insert(_el$2, libs.createComponent(BattlepassInfo, {
        type: "Long",
        get extraExp() {
          return currentBPInfo()?.extra_exp ?? 0;
        },
        get level() {
          return currentBPInfo()?.level ?? 1;
        },
        get season() {
          return currentSeason();
        }
      }));
      libs.setProp(_el$3, "flowChildren", "right");
      libs.setProp(_el$3, "scroll", "x");
      libs.insert(_el$3, libs.createComponent(libs.Index, {
        get each() {
          return taskList();
        },
        children: task => {
          const buffCondition = () => KeyValues.task[task().task_id].blessing_condition;
          const state = () => getTaskState(task());
          const taskConfig = () => KeyValues.task[task().task_id];
          const descID = () => {
            const config = taskConfig();
            if (config.task_description == 1) {
              return config.task_id;
            } else {
              return config.event_id;
            }
          };
          return (() => {
            const _el$4 = libs.createElement("Panel", {
                "class": "TaskBox"
              }, null),
              _el$6 = libs.createElement("Panel", {
                id: "TaskBoxIcon"
              }, _el$4),
              _el$7 = libs.createElement("Panel", {
                id: "TaskBoxTitle"
              }, _el$4);
              libs.createElement("Label", {
                text: "#WeekTask_Box"
              }, _el$7);
              const _el$9 = libs.createElement("Label", {
                id: "TaskBoxProgressTitle",
                get text() {
                  return "#Task_Desc_" + descID();
                },
                get vars() {
                  return {
                    target: GetLocalization(String(taskConfig().target)),
                    v1: GetLocalization(String(taskConfig().param_1)),
                    v2: GetLocalization(String(taskConfig().param_2)),
                    v3: GetLocalization(String(taskConfig().param_3))
                  };
                }
              }, _el$4),
              _el$0 = libs.createElement("Panel", {
                id: "ProgressContainer"
              }, _el$4),
              _el$1 = libs.createElement("Panel", {
                id: "ProgressBG"
              }, _el$0),
              _el$10 = libs.createElement("Panel", {
                id: "Bar",
                get style() {
                  return {
                    clip: `rect( 0%, ${task().progress / task().target * 100}%, 100%, 0% )`
                  };
                }
              }, _el$1),
              _el$11 = libs.createElement("Label", {
                id: "TaskBoxProgressValue",
                get text() {
                  return `${task().progress}/${task().target}`;
                }
              }, _el$0);
            libs.insert(_el$4, libs.createComponent(libs.Show, {
              get when() {
                return buffCondition() > 0;
              },
              get children() {
                const _el$5 = libs.createElement("Image", {
                  id: "BuffIcon",
                  get src() {
                    return getSrcPath("tokens/" + buffCondition() + ".png");
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$5, "src", getSrcPath("tokens/" + buffCondition() + ".png"), _$p));
                return _el$5;
              }
            }), _el$6);
            libs.insert(_el$4, libs.createComponent(libs.Show, {
              get when() {
                return state() != "Received";
              },
              get fallback() {
                return libs.createElement("Panel", {
                  id: "ReceivedTag"
                }, null);
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_Button, {
                  id: "TaskBoxGetButton",
                  get enabled() {
                    return state() == "CanReceive";
                  },
                  get text() {
                    return libs.memo(() => state() == "Locked")() ? "#Task_NeedUnlock" : `#Task_${state()}`;
                  },
                  get vars() {
                    return libs.memo(() => state() == "Locked")() ? {
                      name: GetLocalization(String(buffCondition()))
                    } : undefined;
                  },
                  onactivate: () => {
                    if (bRequesting()) {
                      return;
                    }
                    SetRequesting(true);
                    CallActionRequest("/v1/task/receive_rewards", {
                      task_id: task().task_id,
                      extra_id: task().extra_id
                    }, data => {
                      SetRequesting(false);
                    });
                  }
                });
              }
            }), null);
            libs.effect(_p$ => {
              const _v$ = getTaskRewardTooltip(task().task_id),
                _v$2 = "#Task_Desc_" + descID(),
                _v$3 = {
                  target: GetLocalization(String(taskConfig().target)),
                  v1: GetLocalization(String(taskConfig().param_1)),
                  v2: GetLocalization(String(taskConfig().param_2)),
                  v3: GetLocalization(String(taskConfig().param_3))
                },
                _v$4 = {
                  clip: `rect( 0%, ${task().progress / task().target * 100}%, 100%, 0% )`
                },
                _v$5 = `${task().progress}/${task().target}`;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "customTooltip", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "text", _v$2, _p$._v$2));
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "vars", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$10, "style", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "text", _v$5, _p$._v$5));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined,
              _v$3: undefined,
              _v$4: undefined,
              _v$5: undefined
            });
            return _el$4;
          })();
        }
      }));
      return _el$;
    }
  });
}

function clampFrame(index, frameCount) {
  if (frameCount <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(frameCount - 1, Math.floor(index)));
}
function normalizeInterval(interval) {
  return interval != undefined && Number.isFinite(interval) ? Math.max(1, interval) : 100;
}
function createSequenceFrame(options) {
  const frames = libs.createMemo(() => typeof options.frames === "function" ? options.frames() : options.frames);
  const frameCount = libs.createMemo(() => frames().length);
  const [controlledIsLoop, setControlledIsLoop] = libs.createSignal();
  const isLoop = libs.createMemo(() => {
    const controlled = controlledIsLoop();
    if (controlled != undefined) {
      return controlled;
    }
    return typeof options.isLoop === "function" ? options.isLoop() : options.isLoop ?? true;
  });
  const autoPlay = options.autoPlay ?? true;
  const [controlledInterval, setControlledInterval] = libs.createSignal();
  const interval = libs.createMemo(() => {
    const controlled = controlledInterval();
    if (controlled != undefined) {
      return controlled;
    }
    const optionInterval = typeof options.interval === "function" ? options.interval() : options.interval;
    return normalizeInterval(optionInterval);
  });
  const [currentFrame, setCurrentFrame] = libs.createSignal(0);
  const [isPlaying, setIsPlaying] = libs.createSignal(false);
  const [isFinished, setIsFinished] = libs.createSignal(frameCount() <= 1 && !isLoop());
  let timer;
  let timerInterval;
  function clearTimer() {
    if (timer != undefined) {
      clearInterval(timer);
      timer = undefined;
      timerInterval = undefined;
    }
  }
  function startTimer() {
    timerInterval = interval();
    timer = setInterval(tick, timerInterval);
  }
  function restartTimer() {
    clearTimer();
    startTimer();
  }
  function finish() {
    clearTimer();
    setIsPlaying(false);
    setIsFinished(true);
  }
  function tick() {
    const count = frameCount();
    if (count <= 0) {
      finish();
      setCurrentFrame(0);
      return;
    }
    if (count <= 1) {
      if (!isLoop()) {
        finish();
      }
      setCurrentFrame(0);
      return;
    }
    setCurrentFrame(frame => {
      const lastFrame = count - 1;
      if (frame >= lastFrame) {
        if (isLoop()) {
          return 0;
        }
        finish();
        return lastFrame;
      }
      return frame + 1;
    });
  }
  function play() {
    if (timer != undefined || isPlaying()) {
      return;
    }
    const count = frameCount();
    if (count <= 0) {
      setCurrentFrame(0);
      setIsFinished(true);
      setIsPlaying(false);
      return;
    }
    if (count <= 1) {
      setCurrentFrame(0);
      setIsFinished(!isLoop());
      setIsPlaying(false);
      return;
    }
    if (!isLoop() && isFinished()) {
      return;
    }
    setIsFinished(false);
    setIsPlaying(true);
    startTimer();
  }
  function pause() {
    clearTimer();
    setIsPlaying(false);
  }
  function reset() {
    pause();
    setCurrentFrame(0);
    setIsFinished(frameCount() <= 1 && !isLoop());
  }
  function stop() {
    reset();
  }
  function replay() {
    reset();
    play();
  }
  function gotoFrame(index) {
    setCurrentFrame(clampFrame(index, frameCount()));
    setIsFinished(false);
  }
  function setLoop(loop) {
    setControlledIsLoop(loop);
    if (loop && isFinished()) {
      setIsFinished(false);
    }
  }
  function setFrameInterval(frameInterval) {
    setControlledInterval(normalizeInterval(frameInterval));
  }
  libs.createEffect(() => {
    const nextInterval = interval();
    if (timer != undefined && timerInterval !== nextInterval && libs.untrack(isPlaying)) {
      restartTimer();
    }
  });
  libs.createEffect(previous => {
    const frameList = frames();
    const count = frameList.length;
    const loop = isLoop();
    setCurrentFrame(frame => clampFrame(frame, count));
    if (count <= 1) {
      clearTimer();
      setIsPlaying(false);
      setIsFinished(!loop);
    } else if (previous != undefined && (previous.frames !== frameList || previous.loop !== loop) && libs.untrack(isFinished)) {
      setIsFinished(false);
    }
    return {
      frames: frameList,
      loop
    };
  });
  libs.onMount(() => {
    if (autoPlay) {
      play();
    }
  });
  libs.onCleanup(() => {
    clearTimer();
  });
  const SequenceFrame = props => {
    const merged = libs.mergeProps(props, {
      class: libs.classNames("SequenceFrame", props.class, props.className)
    });
    const [local, others] = libs.splitProps(merged, ["children", "className"]);
    return (() => {
      const _el$ = libs.createElement("Panel", others, null);
      libs.spread(_el$, others, true);
      libs.insert(_el$, libs.createComponent(libs.Index, {
        get each() {
          return frames();
        },
        children: (src, index) => (() => {
          const _el$2 = libs.createElement("Image", {
            "class": "SequenceFrameImage",
            get src() {
              return src();
            },
            hittest: false
          }, null);
          libs.effect(_p$ => {
            const _v$ = src(),
              _v$2 = currentFrame() == index;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "src", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "visible", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$2;
        })()
      }), null);
      libs.insert(_el$, () => local.children, null);
      return _el$;
    })();
  };
  return {
    SequenceFrame,
    currentFrame,
    isPlaying,
    isFinished,
    isLoop,
    interval,
    frameCount,
    setLoop,
    setFrameInterval,
    play,
    pause,
    stop,
    reset,
    replay,
    gotoFrame
  };
}

const DICE_EVENT_KEYS = ["move_dice", "move_pos", "move_neg", "move_start", "add_slot_exp", "add_type_exp", "receive_rewards", "receive_box", "generate_box", "reward_next_slot"];
const SORTED_DICE_EVENT_KEYS = [...DICE_EVENT_KEYS].sort((left, right) => right.length - left.length);
const DICE_EVENT_ARG_COUNTS = {
  move_dice: 1,
  move_pos: 1,
  move_neg: 1,
  move_start: 0,
  add_slot_exp: 2,
  add_type_exp: 2,
  receive_rewards: 1,
  receive_box: 3,
  generate_box: 1,
  reward_next_slot: 1
};
const getMatchedDiceEventKey = event => {
  return SORTED_DICE_EVENT_KEYS.find(key => event == key || event.startsWith(`${key}_`));
};
const getRawArgs = (event, key) => {
  if (event == key) {
    return [];
  }
  return event.slice(key.length + 1).split("_");
};
const parseNumberArgs = rawArgs => {
  const args = [];
  for (const rawArg of rawArgs) {
    if (!/^-?\d+$/.test(rawArg)) {
      return {
        args,
        reason: `invalid number arg: ${rawArg}`
      };
    }
    args.push(Number(rawArg));
  }
  return {
    args
  };
};
const parseDiceEvent = event => {
  const key = getMatchedDiceEventKey(event);
  if (key == undefined) {
    return {
      raw: event,
      key: "unknown",
      matched: false,
      valid: false,
      args: [],
      reason: "unknown dice event key"
    };
  }
  const rawArgs = getRawArgs(event, key);
  const numberArgsResult = parseNumberArgs(rawArgs);
  const args = numberArgsResult.args;
  if (numberArgsResult.reason != undefined) {
    return {
      raw: event,
      key,
      matched: true,
      valid: false,
      args,
      reason: numberArgsResult.reason
    };
  }
  const expectedArgCount = DICE_EVENT_ARG_COUNTS[key];
  if (args.length != expectedArgCount) {
    return {
      raw: event,
      key,
      matched: true,
      valid: false,
      args,
      reason: `invalid arg count: expected ${expectedArgCount}, got ${args.length}`
    };
  }
  return {
    raw: event,
    key,
    matched: true,
    valid: true,
    args: args
  };
};
const parseDicePlayResult = result => {
  return (result ?? []).map((item, index) => ({
    index,
    slotID: item.slot_id,
    event: parseDiceEvent(item.event),
    raw: item
  }));
};

const DICE_ROLL_ONCE_TIMES = 1;
const DICE_ROLL_TEN_TIMES = 10;
const DICE_TILE_FINISH_EFFECT_DURATION_SECONDS = 3;
const DICE_TILE_LEVEL_UP_EFFECT_DURATION_SECONDS = 1.5;
const DICE_BOX_PREVIEW_DURATION_SECONDS = 2;
const SLOT_TYPE_START = 1;
const SLOT_TYPE_TOKEN = 2;
const SLOT_TYPE_EVENT = 3;
const SLOT_TYPE_REWARD = 4;
const DEFAULT_SLOT_LEVEL = 0;
const DEFAULT_TILE_CONFIG = {
  tileType: "stone",
  decorationType: "none",
  iconType: "none"
};
const STOREITEMIMAGE_SRCPATH = {
  [110013]: getSrcPath("activity/a4_dice/a4_product_token.png"),
  [110014]: getSrcPath("activity/a4_dice/a4_product_dice.png"),
  [110023]: getSrcPath("activity/a4_dice/a4_product_token2.png"),
  [110024]: getSrcPath("activity/a4_dice/a4_product_dice2.png")
};
const SLOT_TYPE_TILE_CONFIG = {
  [SLOT_TYPE_START]: {
    tileType: "grass",
    decorationType: "start"
  },
  [SLOT_TYPE_EVENT]: {
    tileType: "grass",
    decorationType: "que"
  }
};
const SLOT_LEVEL_TILE_CONFIG = {
  0: "stone",
  1: "level1",
  2: "level2",
  3: "level3"
};
const SLOT_LEVEL_RARITY_CONFIG = {
  0: 1,
  1: 3,
  2: 4,
  3: 5
};
const REWARD_SLOT_ICON_CONFIG = {
  110011: "icon3",
  110006: "icon3",
  110009: "icon2",
  110010: "icon2",
  110013: "icon1",
  120001: "icon1",
  120002: "icon1",
  120003: "icon1",
  120008: "icon1"
};
const PLAYER_IDLE_SEQUENCE_FRAMES = [getSrcPath("activity/a4_dice/player_idle/1_1.png"), getSrcPath("activity/a4_dice/player_idle/1_2.png"), getSrcPath("activity/a4_dice/player_idle/1_3.png"), getSrcPath("activity/a4_dice/player_idle/1_4.png"), getSrcPath("activity/a4_dice/player_idle/1_5.png"), getSrcPath("activity/a4_dice/player_idle/1_6.png"), getSrcPath("activity/a4_dice/player_idle/1_7.png"), getSrcPath("activity/a4_dice/player_idle/1_8.png")];
const PLAYER_JUMP_SEQUENCE_FRAMES = [getSrcPath("activity/a4_dice/player_jump/2_1.png"), getSrcPath("activity/a4_dice/player_jump/2_2.png"), getSrcPath("activity/a4_dice/player_jump/2_3.png"), getSrcPath("activity/a4_dice/player_jump/2_4.png"), getSrcPath("activity/a4_dice/player_jump/2_5.png"), getSrcPath("activity/a4_dice/player_jump/2_6.png"), getSrcPath("activity/a4_dice/player_jump/2_7.png"), getSrcPath("activity/a4_dice/player_jump/2_8.png")];
const DICE_SEQUENCE_FRAMES = [getSrcPath("activity/a4_dice/dice_cube/1.png"), getSrcPath("activity/a4_dice/dice_cube/2.png"), getSrcPath("activity/a4_dice/dice_cube/3.png"), getSrcPath("activity/a4_dice/dice_cube/4.png"), getSrcPath("activity/a4_dice/dice_cube/5.png"), getSrcPath("activity/a4_dice/dice_cube/6.png"), getSrcPath("activity/a4_dice/dice_cube/7.png"), getSrcPath("activity/a4_dice/dice_cube/8.png"), getSrcPath("activity/a4_dice/dice_cube/9.png"), getSrcPath("activity/a4_dice/dice_cube/10.png"), getSrcPath("activity/a4_dice/dice_cube/11.png")];
const DICE_RESULT_FRAME_BY_VALUE = {
  1: getSrcPath("activity/a4_dice/dice_cube/end_1.png"),
  2: getSrcPath("activity/a4_dice/dice_cube/end_2.png"),
  3: getSrcPath("activity/a4_dice/dice_cube/end_3.png"),
  4: getSrcPath("activity/a4_dice/dice_cube/end_4.png"),
  5: getSrcPath("activity/a4_dice/dice_cube/end_5.png"),
  6: getSrcPath("activity/a4_dice/dice_cube/end_6.png")
};
const SUMMARY_EVENT = {
  "add_type_exp": "#ActivityDice_SummaryEvent_AddTypeExp",
  "move_pos": "#ActivityDice_SummaryEvent_MovePos",
  "move_neg": "#ActivityDice_SummaryEvent_MoveNeg",
  "move_start": "#ActivityDice_SummaryEvent_MoveStart",
  "receive_box": "#ActivityDice_SummaryEvent_ReceiveBox",
  "generate_box": "#ActivityDice_SummaryEvent_GenerateBox"
};
const isDiceSummaryEventKey = key => key in SUMMARY_EVENT;
const PLAYER_SEQUENCE_FRAME_IDLE_INTERVAL = 130;
const PLAYER_SEQUENCE_FRAME_JUMP_INTERVAL = 70;
const DICE_SEQUENCE_FRAME_INTERVAL = 65;
const FAST_PLAYER_SEQUENCE_FRAME_JUMP_INTERVAL = 20;
const NORMAL_DICE_PLAYBACK_CONFIG = {
  playerJumpFrameIntervalMs: PLAYER_SEQUENCE_FRAME_JUMP_INTERVAL,
  diceFrameIntervalMs: DICE_SEQUENCE_FRAME_INTERVAL,
  playerMoveStepDurationSeconds: PLAYER_JUMP_SEQUENCE_FRAMES.length * PLAYER_SEQUENCE_FRAME_JUMP_INTERVAL / 1000,
  moveEventDelaySeconds: 1,
  eventLayerDisplayDurationSeconds: 2.5
};
const FAST_DICE_PLAYBACK_CONFIG = {
  playerJumpFrameIntervalMs: FAST_PLAYER_SEQUENCE_FRAME_JUMP_INTERVAL,
  diceFrameIntervalMs: 32,
  playerMoveStepDurationSeconds: PLAYER_JUMP_SEQUENCE_FRAMES.length * FAST_PLAYER_SEQUENCE_FRAME_JUMP_INTERVAL / 1000,
  moveEventDelaySeconds: 0,
  eventLayerDisplayDurationSeconds: 0.2
};
const DICE_BOARD_COLUMN_COUNT = 8;
const DICE_BOARD_ROW_COUNT = 7;
const DICE_BOARD_CELL_WIDTH = 96;
const DICE_BOARD_CELL_HEIGHT = 82;
const DICE_BOARD_ROW_OFFSET_X_LIST = [150, 100, 50, 0, -50, -100, -150];
const DICE_PLAYER_PIECE_SIZE = 400 * 0.5;
const DICE_PLAYER_ANCHOR_X = DICE_PLAYER_PIECE_SIZE / 2 + 50;
const DICE_PLAYER_ANCHOR_Y = DICE_PLAYER_PIECE_SIZE;
const DICE_PLAYER_OFFSET_X = 0;
const DICE_PLAYER_OFFSET_Y = 30;
const DICE_EVENT_LAYER_OFFSET_X = 12;
const DICE_EVENT_LAYER_OFFSET_Y = 0;
const TilePath = [8, 9, 10, 2, 3, 4, 5, 13, 14, 22, 30, 31, 39, 47, 46, 54, 53, 52, 51, 50, 42, 41, 33, 25, 24, 16];
const getBoardSlotConfigMap = activityID => {
  const boardSlotRewardConfig = KeyValues.activity_boardslot_reward ?? {};
  return Object.values(boardSlotRewardConfig).reduce((slotConfigMap, slotConfig) => {
    if (slotConfig.activity_id == activityID) {
      slotConfigMap[slotConfig.slot_id] = slotConfig;
    }
    return slotConfigMap;
  }, {});
};
const getBoardSlotConfigBySlotID = (activityID, slotID) => {
  return getBoardSlotConfigMap(activityID)[slotID];
};
const parseDiceNumberList = value => {
  if (value == undefined || value.length == 0) {
    return [];
  }
  return value.split("|").map(item => Number(item)).filter(item => Number.isFinite(item));
};
const getRewardNumList = slotConfig => {
  return parseDiceNumberList(slotConfig?.reward_num);
};
const getLevelupExpList = slotConfig => {
  return parseDiceNumberList(slotConfig?.levelup_exp);
};
const getSlotMaxLevel = slotConfig => {
  const rewardNumList = getRewardNumList(slotConfig);
  const levelupExpList = getLevelupExpList(slotConfig);
  return Math.max(DEFAULT_SLOT_LEVEL, rewardNumList.length > 0 ? rewardNumList.length - 1 : levelupExpList.length);
};
const clampSlotLevel = (slotConfig, level) => {
  const maxLevel = getSlotMaxLevel(slotConfig);
  const normalizedLevel = Number.isFinite(level) ? Math.trunc(Number(level)) : DEFAULT_SLOT_LEVEL;
  return Math.max(DEFAULT_SLOT_LEVEL, Math.min(maxLevel, normalizedLevel));
};
const calculateSlotLevelExp = (slotConfig, currentLevel, currentExp, addExp) => {
  const levelupExpList = getLevelupExpList(slotConfig);
  const maxLevel = getSlotMaxLevel(slotConfig);
  let level = clampSlotLevel(slotConfig, currentLevel);
  let exp = Math.max(0, Number(currentExp) || 0) + Math.max(0, addExp);
  while (level < maxLevel) {
    const needExp = levelupExpList[level];
    if (needExp == undefined || needExp <= 0 || exp < needExp) {
      break;
    }
    exp -= needExp;
    level += 1;
  }
  return {
    level,
    exp
  };
};
const getSlotRewardAmount = (slotConfig, level) => {
  const rewardNumList = getRewardNumList(slotConfig);
  if (rewardNumList.length == 0) {
    return 0;
  }
  const rewardLevel = clampSlotLevel(slotConfig, level);
  return rewardNumList[rewardLevel] ?? 0;
};
const isRewardSlot = slotConfig => {
  return slotConfig.slot_type == SLOT_TYPE_REWARD;
};
const isLevelableSlot = slotConfig => {
  return slotConfig.slot_type == SLOT_TYPE_TOKEN || slotConfig.slot_type == SLOT_TYPE_REWARD;
};
const getSlotTileType = (slotConfig, slotData) => {
  const level = clampSlotLevel(slotConfig, slotData?.level);
  return SLOT_LEVEL_TILE_CONFIG[level] ?? DEFAULT_TILE_CONFIG.tileType;
};
const getSlotRarity = level => {
  return SLOT_LEVEL_RARITY_CONFIG[level] ?? SLOT_LEVEL_RARITY_CONFIG[DEFAULT_SLOT_LEVEL];
};
const getTileConfigBySlotConfig = (slotConfig, slotData) => {
  if (slotConfig == undefined) {
    return DEFAULT_TILE_CONFIG;
  }
  const tileConfig = SLOT_TYPE_TILE_CONFIG[slotConfig.slot_type];
  if (tileConfig !== undefined) {
    return {
      ...tileConfig,
      decorationType: slotData?.with_box ? "box" : tileConfig.decorationType
    };
  }
  if (isLevelableSlot(slotConfig)) {
    const rewardID = Number(slotConfig.reward_id);
    return {
      tileType: getSlotTileType(slotConfig, slotData),
      iconType: isRewardSlot(slotConfig) ? REWARD_SLOT_ICON_CONFIG[rewardID] ?? "none" : "none",
      decorationType: slotData?.with_box ? "box" : slotConfig.slot_type == SLOT_TYPE_TOKEN ? "token" : "none"
    };
  }
  return DEFAULT_TILE_CONFIG;
};
const buildTileConfigMap = (activityID, activitySlotData) => {
  const slotConfigMap = getBoardSlotConfigMap(activityID);
  return TilePath.reduce((tileConfigMap, _tileIndex, index) => {
    const slotID = index + 1;
    const slotData = activitySlotData?.[slotID];
    tileConfigMap[slotID] = getTileConfigBySlotConfig(slotConfigMap[slotID], slotData);
    return tileConfigMap;
  }, {});
};
const getActivitySlotData = slotData => {
  return Object.values(slotData ?? {}).reduce((activitySlotData, data) => {
    if (data.activity_id == dig_veins_logic.ACTIVITY_DICE_ID) {
      activitySlotData[data.slot_id] = data;
    }
    return activitySlotData;
  }, {});
};
const getActivityGameData = gameData => {
  return gameData?.[dig_veins_logic.ACTIVITY_DICE_ID];
};
const getActivityBoardslotConfig = activityID => {
  return KeyValues.activity_boardslot?.[activityID];
};
const getDiceSlotTooltipData = (activityID, slotID, slotData) => {
  const slotConfig = getBoardSlotConfigBySlotID(activityID, slotID);
  if (slotConfig == undefined) {
    return undefined;
  }
  const levelable = isLevelableSlot(slotConfig);
  const level = clampSlotLevel(slotConfig, slotData?.level);
  const maxLevel = getSlotMaxLevel(slotConfig);
  const levelupExpList = getLevelupExpList(slotConfig);
  const requiredExp = levelupExpList[level] ?? 0;
  const currentExp = Math.max(0, Number(slotData?.extra_exp) || 0);
  const rewardID = Number(slotConfig.reward_id);
  const rewardAmount = getSlotRewardAmount(slotConfig, level);
  const rewards = [];
  const nextRewards = [];
  if (Number.isFinite(rewardID) && rewardAmount > 0) {
    rewards.push({
      item_id: rewardID,
      amount: rewardAmount,
      src_path: STOREITEMIMAGE_SRCPATH[rewardID]
    });
  }
  if (slotData?.with_box) {
    const boxID = 1800008;
    if (Number.isFinite(boxID) && boxID > 0) {
      rewards.push({
        item_id: boxID,
        amount: 1,
        src_path: STOREITEMIMAGE_SRCPATH[boxID]
      });
    }
  }
  const nextLevel = level + 1;
  const nextRewardAmount = levelable && level < maxLevel ? getSlotRewardAmount(slotConfig, nextLevel) : 0;
  if (Number.isFinite(rewardID) && nextRewardAmount > 0) {
    nextRewards.push({
      item_id: rewardID,
      amount: nextRewardAmount,
      src_path: STOREITEMIMAGE_SRCPATH[rewardID]
    });
  }
  const hasNextReward = nextRewards.length > 0;
  const nextRequiredExp = levelupExpList[nextLevel] ?? 0;
  const description = slotConfig.slot_type == SLOT_TYPE_START || slotConfig.slot_type == SLOT_TYPE_EVENT ? GetLocalization(`#ActivityDice_TileDescription_${slotConfig.slot_type}`) : "";
  return {
    title: GetLocalization(`#ActivityDice_TileType_${slotConfig.slot_type}`),
    level_key: levelable ? GetLocalization(`#ActivityDice_RewardRarity_${level}`) : undefined,
    rarity: levelable ? getSlotRarity(level) : undefined,
    exp_desc: levelable && level < maxLevel && requiredExp > 0 ? LocalizeWithVars(`#ActivityDice_DiceTooltip_ExpDesc`, {
      current_exp: currentExp,
      exp_max: requiredExp
    }) : "",
    description,
    rewards,
    next_level_key: hasNextReward ? GetLocalization(`#ActivityDice_RewardRarity_${nextLevel}`) : undefined,
    next_rarity: hasNextReward ? getSlotRarity(nextLevel) : undefined,
    next_exp_desc: hasNextReward && nextLevel < maxLevel && nextRequiredExp > 0 ? LocalizeWithVars(`#ActivityDice_DiceTooltip_ExpDesc`, {
      current_exp: 0,
      exp_max: nextRequiredExp
    }) : "",
    next_rewards: nextRewards
  };
};
const getPlayerPathIndexBySlotID = slotID => {
  if (slotID == undefined) {
    return 0;
  }
  const index = slotID - 1;
  if (index < 0 || index >= TilePath.length) {
    return 0;
  }
  return index;
};
const getDiceBoardRowOffsetX = rowIndex => {
  return DICE_BOARD_ROW_OFFSET_X_LIST[rowIndex] ?? 0;
};
const getDiceBoardPiecePosition = tileIndex => {
  const rowIndex = Math.floor(tileIndex / DICE_BOARD_COLUMN_COUNT);
  const columnIndex = tileIndex % DICE_BOARD_COLUMN_COUNT;
  return {
    left: columnIndex * DICE_BOARD_CELL_WIDTH + getDiceBoardRowOffsetX(rowIndex),
    top: rowIndex * DICE_BOARD_CELL_HEIGHT
  };
};
const normalizePlayerPathIndex = index => {
  return (index % TilePath.length + TilePath.length) % TilePath.length;
};
const isPlayerSlotFacingForward = pathIndex => {
  const slotID = normalizePlayerPathIndex(pathIndex) + 1;
  return slotID <= 6 || slotID >= 20;
};
const isDiceValue = value => {
  return value != undefined && value >= 1 && value <= 6;
};
const getValidDiceRollValue = parsedResult => {
  const {
    event
  } = parsedResult;
  if (event.key != "move_dice" || !event.valid) {
    return undefined;
  }
  const diceValue = event.args[0];
  return isDiceValue(diceValue) ? diceValue : undefined;
};
const getValidDiceRollValues = parsedResults => {
  return parsedResults.map(getValidDiceRollValue).filter(diceValue => diceValue != undefined);
};
const getBatchLastMovement = (startPathIndex, parsedResults) => {
  let currentPathIndex = startPathIndex;
  let lastMovement;
  for (const parsedResult of parsedResults) {
    const {
      event
    } = parsedResult;
    if (!event.matched || !event.valid) {
      continue;
    }
    switch (event.key) {
      case "move_dice":
        if (!isDiceValue(event.args[0])) {
          break;
        }
        currentPathIndex = normalizePlayerPathIndex(currentPathIndex + event.args[0]);
        lastMovement = {
          eventIndex: parsedResult.index,
          pathIndex: currentPathIndex
        };
        break;
      case "move_pos":
        currentPathIndex = normalizePlayerPathIndex(currentPathIndex + event.args[0]);
        lastMovement = {
          eventIndex: parsedResult.index,
          pathIndex: currentPathIndex
        };
        break;
      case "move_neg":
        currentPathIndex = normalizePlayerPathIndex(currentPathIndex - event.args[0]);
        lastMovement = {
          eventIndex: parsedResult.index,
          pathIndex: currentPathIndex
        };
        break;
      case "move_start":
        currentPathIndex = 0;
        lastMovement = {
          eventIndex: parsedResult.index,
          pathIndex: currentPathIndex
        };
        break;
    }
  }
  return lastMovement;
};
const buildDiceBoardLayoutRows = () => {
  const slotIDByTileIndex = TilePath.reduce((slotIDMap, tileIndex, index) => {
    slotIDMap[tileIndex] = index + 1;
    return slotIDMap;
  }, {});
  return Array.from({
    length: DICE_BOARD_ROW_COUNT
  }, (_, rowIndex) => Array.from({
    length: DICE_BOARD_COLUMN_COUNT
  }, (_, columnIndex) => {
    const tileIndex = rowIndex * DICE_BOARD_COLUMN_COUNT + columnIndex;
    const id = tileIndex + 1;
    const slotID = slotIDByTileIndex[tileIndex];
    const progress = `${tileIndex}/${DICE_BOARD_COLUMN_COUNT * DICE_BOARD_ROW_COUNT - 1}`;
    if (slotID === undefined) {
      return {
        id,
        tileIndex,
        progress,
        shouldRenderPiece: false
      };
    }
    return {
      id,
      tileIndex,
      progress,
      shouldRenderPiece: true,
      slotID
    };
  }));
};
const DICE_BOARD_LAYOUT_ROWS = buildDiceBoardLayoutRows();
const cloneDiceNetDataRecord = data => {
  if (data == undefined) {
    return undefined;
  }
  return Object.keys(data).reduce((clonedData, key) => {
    const numericKey = Number(key);
    clonedData[numericKey] = {
      ...data[numericKey]
    };
    return clonedData;
  }, {});
};
const getDiceTaskSortWeight = task => {
  switch (mining_activity_redpoints.getDiceTaskState(task)) {
    case "Claimable":
      return 0;
    case "InProgress":
      return 1;
    case "Received":
      return 2;
  }
};
const getDiceTaskKey = task => `${task.task_id}_${task.extra_id}`;
const shouldShowDiceTaskGroup = tasks => tasks.some(task => mining_activity_redpoints.getDiceTaskState(task) != "Received");
const player_activity_tasks$1 = solid_utils.createServiceNetData("player_activity_tasks", {});
const [diceTaskServerTime, setDiceTaskServerTime] = libs.createSignal(Math.floor(CustomUIConfig.GetServerTimeStamp()));
setInterval(() => {
  setDiceTaskServerTime(Math.floor(CustomUIConfig.GetServerTimeStamp()));
}, 1000);
const diceTasksByType = libs.createMemo(() => {
  const timestamp = diceTaskServerTime();
  const taskGroups = {
    6: [],
    7: []
  };
  Object.values(player_activity_tasks$1()).forEach(task => {
    const taskConfig = KeyValues.task[task.task_id];
    if (!mining_activity_redpoints.isDiceTask(task)) return;
    if (taskConfig.type != 6 && taskConfig.type != 7) return;
    if (!mining_activity_redpoints.isDiceTaskActive(task, timestamp)) return;
    taskGroups[taskConfig.type].push(task);
  });
  taskGroups[6].sort((a, b) => getDiceTaskSortWeight(a) - getDiceTaskSortWeight(b) || a.index - b.index || a.task_id - b.task_id);
  taskGroups[7].sort((a, b) => getDiceTaskSortWeight(a) - getDiceTaskSortWeight(b) || a.index - b.index || a.task_id - b.task_id);
  return taskGroups;
});
function DiceRoundRewardsWindow(props) {
  const [shown, setShown] = libs.createSignal(false);
  const [selectedID, setSelectedID] = libs.createSignal(props.defaultNode?.id);
  const nodePanels = {};
  let initialPositionSchedule;
  const positionNode = (nodeID, immediate) => {
    const panel = nodeID == undefined ? undefined : nodePanels[nodeID];
    if (panel?.IsValid()) {
      panel.ScrollParentToMakePanelFit(3, immediate);
    }
  };
  libs.onCleanup(() => {
    if (initialPositionSchedule != undefined) {
      $.CancelScheduled(initialPositionSchedule);
    }
  });
  const selectedNode = libs.createMemo(() => props.nodes.find(node => node.id == selectedID()));
  const rewards = node => Object.entries(node?.reward ?? {});
  const activateNode = node => {
    setSelectedID(node.id);
    positionNode(node.id, false);
    if (props.getNodeState(node) == "Claimable") {
      props.onClaim(node);
    }
  };
  const segmentProgress = index => {
    const start = index == 0 ? 0 : props.nodes[index - 1].coin_num;
    const end = props.nodes[index].coin_num;
    return end <= start ? props.progressValue >= end ? 100 : 0 : Math.max(0, Math.min(100, (props.progressValue - start) / (end - start) * 100));
  };
  return (() => {
    const _el$ = libs.createElement("Button", {
      "class": "DiceRoundRewardsOverlay"
    }, null);
    libs.setProp(_el$, "onload", self => {
      setShown(true);
      self.SetFocus();
    });
    libs.insert(_el$, libs.createComponent(EOM_Popup.EOM_Popup, {
      size: "large",
      popType: "PopupType_PopOut",
      get title() {
        return GetLocalization("#ActivityDice_CP_Title");
      },
      get classList() {
        return {
          DiceRoundRewardsWindow: true,
          EOM_PopupMainShow: shown()
        };
      },
      get onClose() {
        return props.onClose;
      },
      get children() {
        return [(() => {
          const _el$2 = libs.createElement("Panel", {
              "class": "RewardPreviewContainer"
            }, null),
            _el$3 = libs.createElement("Panel", {
              "class": "RewardPreviewHeaderContainer"
            }, _el$2);
            libs.createElement("Image", {
              "class": "HeaderBorder HeaderBorderLeft"
            }, _el$3);
            const _el$5 = libs.createElement("Label", {
              "class": "RewardPreviewHeader",
              get text() {
                return GetLocalization("#ActivityDice_CP_RewardHeader");
              }
            }, _el$3);
            libs.createElement("Image", {
              "class": "HeaderBorder HeaderBorderRight"
            }, _el$3);
          libs.insert(_el$2, libs.createComponent(libs.Show, {
            get when() {
              return selectedNode();
            },
            get fallback() {
              return (() => {
                const _el$0 = libs.createElement("Label", {
                  get text() {
                    return GetLocalization("#ActivityDice_CP_RewardEmpty");
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$0, "text", GetLocalization("#ActivityDice_CP_RewardEmpty"), _$p));
                return _el$0;
              })();
            },
            get children() {
              const _el$7 = libs.createElement("Panel", {
                "class": "RewardPreviewDisplay",
                scroll: "x"
              }, null);
              libs.setProp(_el$7, "scroll", "x");
              libs.insert(_el$7, libs.createComponent(libs.For, {
                get each() {
                  return rewards(selectedNode());
                },
                children: ([itemID, amount]) => (() => {
                  const _el$1 = libs.createElement("Panel", {
                      get ["class"]() {
                        return libs.classNames("RewardPreviewCard", "Rarity" + GetServiceItemRarity(itemID), selectedNode() && props.getNodeState(selectedNode()));
                      }
                    }, null),
                    _el$10 = libs.createElement("Label", {
                      "class": "RewardPreviewName",
                      get text() {
                        return GetLocalization("#" + itemID);
                      },
                      hittest: false
                    }, _el$1);
                    libs.createElement("Image", {
                      "class": "RewardPreviewSplitLine",
                      hittest: false
                    }, _el$1);
                    const _el$12 = libs.createElement("Label", {
                      "class": "RewardPreviewAmount",
                      text: `×${amount}`,
                      hittest: false
                    }, _el$1);
                  libs.insert(_el$1, libs.createComponent(StoreItem.StoreItemImage, {
                    id: "RewardPreviewIcon",
                    get itemid() {
                      return Number(itemID);
                    },
                    scaling: "stretch-to-cover-preserve-aspect"
                  }), _el$12);
                  libs.setProp(_el$12, "text", `×${amount}`);
                  libs.effect(_p$ => {
                    const _v$ = libs.classNames("RewardPreviewCard", "Rarity" + GetServiceItemRarity(itemID), selectedNode() && props.getNodeState(selectedNode())),
                      _v$2 = GetLocalization("#" + itemID);
                    _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$1, "class", _v$, _p$._v$));
                    _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$10, "text", _v$2, _p$._v$2));
                    return _p$;
                  }, {
                    _v$: undefined,
                    _v$2: undefined
                  });
                  return _el$1;
                })()
              }));
              return _el$7;
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$5, "text", GetLocalization("#ActivityDice_CP_RewardHeader"), _$p));
          return _el$2;
        })(), (() => {
          const _el$8 = libs.createElement("Panel", {
              "class": "DiceRoundRewardsFooter"
            }, null),
            _el$9 = libs.createElement("Panel", {
              "class": "DiceRoundRewardsBar",
              scroll: "x"
            }, _el$8);
          libs.setProp(_el$9, "scroll", "x");
          libs.setProp(_el$9, "onload", () => {
            initialPositionSchedule = $.Schedule(0, () => {
              initialPositionSchedule = undefined;
              positionNode(selectedID(), true);
            });
          });
          libs.insert(_el$9, libs.createComponent(libs.For, {
            get each() {
              return props.nodes;
            },
            children: (node, index) => (() => {
              const _el$13 = libs.createElement("Button", {
                  get ["class"]() {
                    return libs.classNames("DiceRoundRewardsBarItem", props.getNodeState(node));
                  }
                }, null),
                _el$14 = libs.createElement("Panel", {
                  "class": "ProgressBar",
                  hittest: false,
                  hittestchildren: false
                }, _el$13);
                libs.createElement("Panel", {
                  "class": "ProgressBarBG"
                }, _el$14);
                const _el$16 = libs.createElement("Panel", {
                  "class": "ProgressBarFill",
                  get style() {
                    return {
                      width: segmentProgress(index()) + "%"
                    };
                  }
                }, _el$14),
                _el$17 = libs.createElement("Panel", {
                  "class": "RewardDisplayRow",
                  hittest: false
                }, _el$13),
                _el$18 = libs.createElement("Panel", {
                  "class": "RewardDisplayValue",
                  hittest: false,
                  hittestchildren: false
                }, _el$17);
                libs.createElement("Image", {
                  "class": "RewardDisplayBG"
                }, _el$18);
                const _el$20 = libs.createElement("Label", {
                  "class": "ProgressBarValue",
                  get text() {
                    return node.coin_num;
                  }
                }, _el$18),
                _el$21 = libs.createElement("Panel", {
                  "class": "RewardDisplayContent",
                  hittest: false
                }, _el$17);
              libs.use(panel => {
                nodePanels[node.id] = panel;
              }, _el$13);
              libs.setProp(_el$13, "onactivate", () => activateNode(node));
              libs.insert(_el$21, libs.createComponent(libs.For, {
                get each() {
                  return rewards(node);
                },
                children: ([itemID, amount]) => (() => {
                  const _el$22 = libs.createElement("Panel", {
                      "class": "RewardItem",
                      hittest: false
                    }, null),
                    _el$23 = libs.createElement("Panel", {
                      "class": "RewardDisplayItem",
                      hittest: false
                    }, _el$22);
                    libs.createElement("Image", {
                      "class": "RewardItemBGBorder",
                      hittest: false
                    }, _el$23);
                    const _el$25 = libs.createElement("Label", {
                      "class": "RewardDisplayAmount",
                      text: `${amount}`,
                      hittest: false
                    }, _el$23);
                    libs.createElement("Image", {
                      "class": "RewardItemSelectedBorder",
                      hittest: false
                    }, _el$23);
                    libs.createElement("Image", {
                      "class": "RewardItemHighlightBorder",
                      hittest: false
                    }, _el$23);
                    libs.createElement("Image", {
                      "class": "RewardItemReceivedIcon",
                      hittest: false
                    }, _el$23);
                    const _el$29 = libs.createElement("Label", {
                      "class": "RewardItemReceivedLabel",
                      get text() {
                        return GetLocalization("#ActivityDice_CP_RewardClaimableTip");
                      },
                      hittest: false
                    }, _el$22);
                  libs.insert(_el$23, libs.createComponent(StoreItem.StoreItemImage, {
                    "class": "RewardDisplayIcon",
                    get itemid() {
                      return Number(itemID);
                    }
                  }), _el$25);
                  libs.setProp(_el$25, "text", `${amount}`);
                  libs.effect(_$p => libs.setProp(_el$29, "text", GetLocalization("#ActivityDice_CP_RewardClaimableTip"), _$p));
                  return _el$22;
                })()
              }));
              libs.effect(_p$ => {
                const _v$3 = libs.classNames("DiceRoundRewardsBarItem", props.getNodeState(node)),
                  _v$4 = {
                    Selected: selectedID() == node.id
                  },
                  _v$5 = {
                    width: segmentProgress(index()) + "%"
                  },
                  _v$6 = node.coin_num;
                _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$13, "class", _v$3, _p$._v$3));
                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$13, "classList", _v$4, _p$._v$4));
                _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$16, "style", _v$5, _p$._v$5));
                _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$20, "text", _v$6, _p$._v$6));
                return _p$;
              }, {
                _v$3: undefined,
                _v$4: undefined,
                _v$5: undefined,
                _v$6: undefined
              });
              return _el$13;
            })()
          }));
          return _el$8;
        })()];
      }
    }));
    return _el$;
  })();
}
function DiceTaskItem(props) {
  const taskConfig = libs.createMemo(() => KeyValues.task[props.task.task_id]);
  const reward = libs.createMemo(() => Object.entries(taskConfig().rewards ?? {})[0]);
  const taskState = libs.createMemo(() => mining_activity_redpoints.getDiceTaskState(props.task));
  return (() => {
    const _el$30 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("DiceTaskItem", taskState(), {
            Claiming: props.claiming
          });
        }
      }, null);
      libs.createElement("Image", {
        "class": "DiceTaskItemBG"
      }, _el$30);
      const _el$32 = libs.createElement("Panel", {
        "class": "DiceTaskItemLayer"
      }, _el$30),
      _el$33 = libs.createElement("Panel", {
        "class": "DiceTaskContent"
      }, _el$32),
      _el$34 = libs.createElement("Panel", {
        "class": "DiceTaskHeader"
      }, _el$33),
      _el$35 = libs.createElement("Label", {
        "class": "DiceTaskTitle",
        get text() {
          return GetLocalization(`#Task_Name_${props.task.task_id}`);
        }
      }, _el$34),
      _el$36 = libs.createElement("Label", {
        "class": "DiceTaskProgress",
        get text() {
          return `(${Math.min(props.task.progress, props.task.target)}/${props.task.target})`;
        }
      }, _el$34),
      _el$37 = libs.createElement("Label", {
        "class": "DiceTaskDescription",
        get text() {
          return LocalizeWithVars(`#Task_Desc_${props.task.task_id}`, {
            target: GetLocalization(String(taskConfig().target)),
            v1: GetLocalization(String(taskConfig().param_1)),
            v2: GetLocalization(String(taskConfig().param_2)),
            v3: GetLocalization(String(taskConfig().param_3))
          });
        }
      }, _el$33);
      libs.createElement("Panel", {
        "class": "DiceTaskItemBottomLine"
      }, _el$30);
    libs.setProp(_el$30, "onactivate", () => {
      if (!mining_activity_redpoints.isDiceTaskClaimable(props.task) || props.claiming) {
        return;
      }
      props.onClaim(props.task);
    });
    libs.insert(_el$32, libs.createComponent(libs.Show, {
      get when() {
        return reward();
      },
      children: rewardEntry => (() => {
        const _el$39 = libs.createElement("Panel", {
            "class": "DiceTaskReward"
          }, null);
          libs.createElement("Image", {
            "class": "DiceTaskRewardBG"
          }, _el$39);
          const _el$42 = libs.createElement("Label", {
            "class": "DiceTaskRewardValue",
            get text() {
              return String(rewardEntry()[1]);
            }
          }, _el$39);
        libs.insert(_el$39, libs.createComponent(libs.Show, {
          get when() {
            return taskState() == "Claimable";
          },
          get children() {
            return libs.createElement("Image", {
              "class": "DiceTaskBorder"
            }, null);
          }
        }), _el$42);
        libs.insert(_el$39, libs.createComponent(StoreItem.StoreItemImage, {
          "class": "DiceTaskRewardIcon",
          get itemid() {
            return rewardEntry()[0];
          },
          get src() {
            return STOREITEMIMAGE_SRCPATH[Number(rewardEntry()[0])];
          }
        }), _el$42);
        libs.effect(_$p => libs.setProp(_el$42, "text", String(rewardEntry()[1]), _$p));
        return _el$39;
      })()
    }), null);
    libs.effect(_p$ => {
      const _v$7 = libs.classNames("DiceTaskItem", taskState(), {
          Claiming: props.claiming
        }),
        _v$8 = GetLocalization(`#Task_Name_${props.task.task_id}`),
        _v$9 = `(${Math.min(props.task.progress, props.task.target)}/${props.task.target})`,
        _v$0 = LocalizeWithVars(`#Task_Desc_${props.task.task_id}`, {
          target: GetLocalization(String(taskConfig().target)),
          v1: GetLocalization(String(taskConfig().param_1)),
          v2: GetLocalization(String(taskConfig().param_2)),
          v3: GetLocalization(String(taskConfig().param_3))
        });
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$30, "class", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$35, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$36, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$37, "text", _v$0, _p$._v$0));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined
    });
    return _el$30;
  })();
}
function DiceTaskGroup(props) {
  return (() => {
    const _el$43 = libs.createElement("Panel", {
        "class": "DiceTaskGroup"
      }, null),
      _el$44 = libs.createElement("Panel", {
        "class": "DiceTaskGroupTitle"
      }, _el$43);
      libs.createElement("Image", {
        "class": "DiceTaskGroupTitleBG"
      }, _el$44);
      const _el$46 = libs.createElement("Label", {
        get text() {
          return GetLocalization(`#ActivityDice_TaskTitleType_${props.taskType}`);
        }
      }, _el$44),
      _el$47 = libs.createElement("Panel", {
        "class": "DiceTaskGroupContent"
      }, _el$43);
    libs.insert(_el$47, libs.createComponent(libs.For, {
      get each() {
        return props.tasks;
      },
      children: task => libs.createComponent(DiceTaskItem, {
        task: task,
        get claiming() {
          return props.claimingTaskKey == getDiceTaskKey(task);
        },
        get onClaim() {
          return props.onClaim;
        }
      })
    }));
    libs.effect(_$p => libs.setProp(_el$46, "text", GetLocalization(`#ActivityDice_TaskTitleType_${props.taskType}`), _$p));
    return _el$43;
  })();
}
function DiceGamePiece(props) {
  return (() => {
    const _el$48 = libs.createElement("Panel", {
        "class": "DiceGamePiece"
      }, null),
      _el$49 = libs.createElement("Panel", {
        "class": "DiceGameTileRotate"
      }, _el$48),
      _el$50 = libs.createElement("Image", {
        get ["class"]() {
          return libs.classNames("DiceGamePieceBG", `PieceType_${props.tileType}`);
        }
      }, _el$49),
      _el$51 = libs.createElement("Image", {
        get ["class"]() {
          return libs.classNames("DiceGamePieceIcon", `IconType_${props.iconType}`);
        }
      }, _el$49),
      _el$52 = libs.createElement("Image", {
        get ["class"]() {
          return libs.classNames("DiceGamePieceDecoration", `DecorationType_${props.decorationType}`);
        }
      }, _el$49);
    libs.insert(_el$48, libs.createComponent(libs.Show, {
      get when() {
        return props.finishEffectToken;
      },
      keyed: true,
      children: () => libs.createElement("DOTAParticleScenePanel", {
        "class": "DiceGameTileEffect1",
        particleName: "particles/ui/game/ui_game_checkerboard/ui_game_checkerboard_fx.vpcf",
        cameraOrigin: "0 0 320",
        lookAt: "0 0 0",
        fov: 90,
        hittest: false
      }, null)
    }), null);
    libs.insert(_el$48, libs.createComponent(libs.Show, {
      get when() {
        return props.levelUpEffectToken;
      },
      keyed: true,
      children: () => libs.createElement("DOTAParticleScenePanel", {
        "class": "DiceGameTileEffectLevelUp",
        particleName: "particles/ui/game/ui_game_checkerboard/ui_game_checkerboard_up_fx.vpcf",
        cameraOrigin: "0 0 320",
        lookAt: "0 0 0",
        fov: 90,
        hittest: false
      }, null)
    }), null);
    libs.effect(_p$ => {
      const _v$1 = libs.classNames("DiceGamePieceBG", `PieceType_${props.tileType}`),
        _v$10 = libs.classNames("DiceGamePieceIcon", `IconType_${props.iconType}`),
        _v$11 = libs.classNames("DiceGamePieceDecoration", `DecorationType_${props.decorationType}`);
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$50, "class", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$51, "class", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$52, "class", _v$11, _p$._v$11));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined
    });
    return _el$48;
  })();
}
function DiceGamePiecePlaceholder() {
  return libs.createElement("Panel", {
    "class": "DiceGamePiecePlaceholder"
  }, null);
}
function DiceGamePlayerPiece(props) {
  const IdleSequenceFrame = props.IdleSequenceFrame;
  const JumpSequenceFrame = props.JumpSequenceFrame;
  return (() => {
    const _el$56 = libs.createElement("Panel", {
      get ["class"]() {
        return libs.classNames("DiceGamePlayerPiece", {
          PlayerMoving: props.positionTransitionEnabled,
          FastForward: props.fastForward,
          FacingForward: props.facingForward
        });
      },
      get style() {
        return {
          position: props.position
        };
      }
    }, null);
    libs.insert(_el$56, libs.createComponent(IdleSequenceFrame, {
      "class": "DiceGamePlayerSequenceFrame",
      get visible() {
        return !props.moving;
      }
    }), null);
    libs.insert(_el$56, libs.createComponent(JumpSequenceFrame, {
      "class": "DiceGamePlayerSequenceFrame",
      get visible() {
        return props.moving;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$12 = libs.classNames("DiceGamePlayerPiece", {
          PlayerMoving: props.positionTransitionEnabled,
          FastForward: props.fastForward,
          FacingForward: props.facingForward
        }),
        _v$13 = {
          position: props.position
        };
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$56, "class", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$56, "style", _v$13, _p$._v$13));
      return _p$;
    }, {
      _v$12: undefined,
      _v$13: undefined
    });
    return _el$56;
  })();
}
function DiceGameDiceCube(props) {
  const SequenceFrame = props.SequenceFrame;
  return (() => {
    const _el$57 = libs.createElement("Panel", {
      id: "DiceGameDiceCube",
      hittest: false,
      hittestchildren: false
    }, null);
    libs.insert(_el$57, libs.createComponent(SequenceFrame, {
      "class": "DiceGameDiceSequenceFrame"
    }));
    libs.effect(_$p => libs.setProp(_el$57, "visible", props.visible, _$p));
    return _el$57;
  })();
}
function Dice() {
  const [roundRewardsOpen, setRoundRewardsOpen] = libs.createSignal(false);
  const logoLang = libs.createMemo(() => {
    const lang = Language();
    if (lang == "schinese") {
      return "Language_schinese";
    } else if (lang == "russian") {
      return "Language_russian";
    } else {
      return "Language_english";
    }
  });
  const ruleTooltip = libs.createMemo(() => ({
    name: Language() == "schinese" ? "text" : "activity_veins_rule",
    text: "#ActivityDice_TitleTooltip"
  }));
  const [isMultiRollPlaying, setIsMultiRollPlaying] = libs.createSignal(false);
  const dicePlaybackConfig = libs.createMemo(() => isMultiRollPlaying() ? FAST_DICE_PLAYBACK_CONFIG : NORMAL_DICE_PLAYBACK_CONFIG);
  const playerIdle = createSequenceFrame({
    frames: PLAYER_IDLE_SEQUENCE_FRAMES,
    interval: PLAYER_SEQUENCE_FRAME_IDLE_INTERVAL,
    isLoop: true,
    autoPlay: true
  });
  const playerJump = createSequenceFrame({
    frames: PLAYER_JUMP_SEQUENCE_FRAMES,
    interval: () => dicePlaybackConfig().playerJumpFrameIntervalMs,
    isLoop: false,
    autoPlay: false
  });
  const [diceResult, setDiceResult] = libs.createSignal(1);
  const diceSequence = createSequenceFrame({
    frames: () => [...DICE_SEQUENCE_FRAMES, DICE_RESULT_FRAME_BY_VALUE[diceResult()]],
    interval: () => dicePlaybackConfig().diceFrameIntervalMs,
    isLoop: false,
    autoPlay: false
  });
  const activityData = libs.createMemo(() => KeyValues.activity_data[dig_veins_logic.ACTIVITY_DICE_ID]);
  const isActivityEnded = Date.now() / 1000 >= activityData().end_time;
  const [claimingTaskKey, setClaimingTaskKey] = libs.createSignal();
  const receiveDiceTaskReward = task => {
    const timestamp = Math.floor(CustomUIConfig.GetServerTimeStamp());
    if (!mining_activity_redpoints.isDiceTaskActive(task, timestamp) || !mining_activity_redpoints.isDiceTaskClaimable(task) || claimingTaskKey() != undefined) {
      return;
    }
    setClaimingTaskKey(getDiceTaskKey(task));
    CallActionRequest("/v1/task/receive_rewards", {
      task_id: task.task_id,
      extra_id: task.extra_id
    }, () => {
      setClaimingTaskKey(undefined);
    }, () => {
      setClaimingTaskKey(undefined);
    });
  };
  const diceTileData = solid_utils.createServiceNetData("player_boardslot_activity_slot_data", {});
  const diceGameData = solid_utils.createServiceNetData("player_boardslot_activity_data", {});
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const playerProps = solid_utils.createServiceNetData("player_props", {});
  const milestoneNodes = mining_activity_redpoints.getDiceMilestoneNodes();
  const milestoneProgress = libs.createMemo(() => mining_activity_redpoints.getDiceMilestoneProgress(playerTokens()));
  const receivedMilestones = libs.createMemo(() => mining_activity_redpoints.getDiceReceivedMilestones(getActivityGameData(diceGameData())));
  const [confirmedMilestones, setConfirmedMilestones] = libs.createSignal([]);
  const [claimingMilestone, setClaimingMilestone] = libs.createSignal();
  libs.createEffect(() => {
    const received = receivedMilestones();
    setConfirmedMilestones(current => current.filter(value => !received.has(value)));
  });
  const getMilestoneState = node => {
    if (receivedMilestones().has(node.coin_num) || confirmedMilestones().includes(node.coin_num)) {
      return "Received";
    }
    return mining_activity_redpoints.isDiceMilestoneClaimable(node, milestoneProgress(), receivedMilestones()) ? "Claimable" : "InProgress";
  };
  const hasClaimableMilestone = libs.createMemo(() => {
    return milestoneNodes.some(node => getMilestoneState(node) == "Claimable");
  });
  const targetMilestone = libs.createMemo(() => milestoneNodes.find(node => getMilestoneState(node) == "Claimable") ?? milestoneNodes.find(node => getMilestoneState(node) == "InProgress") ?? milestoneNodes[milestoneNodes.length - 1]);
  const progressMilestone = libs.createMemo(() => milestoneNodes.find(node => node.coin_num > milestoneProgress()) ?? milestoneNodes[milestoneNodes.length - 1]);
  const milestonePreviewReward = libs.createMemo(() => Object.entries(progressMilestone()?.reward ?? {})[0]);
  const milestoneProgressPercent = libs.createMemo(() => {
    const target = progressMilestone();
    return target ? Math.max(0, Math.min(100, milestoneProgress() / target.coin_num * 100)) : 0;
  });
  const receiveMilestoneReward = node => {
    if (getMilestoneState(node) != "Claimable" || claimingMilestone() != undefined) return;
    setClaimingMilestone(node.coin_num);
    CallActionRequest("/v1/activity/receive_rewards", {
      activity_id: dig_veins_logic.ACTIVITY_DICE_ID,
      reward_id: node.coin_num
    }, result => {
      if ((result?.code == 0 || result?.code == 200) && !receivedMilestones().has(node.coin_num)) {
        setConfirmedMilestones(current => [...current, node.coin_num]);
      }
      setClaimingMilestone(undefined);
    }, () => setClaimingMilestone(undefined));
  };
  const [displayTileData, setDisplayTileData] = libs.createSignal(cloneDiceNetDataRecord(diceTileData()));
  const [displayGameData, setDisplayGameData] = libs.createSignal(cloneDiceNetDataRecord(diceGameData()));
  const [isDisplaySyncPaused, setIsDisplaySyncPaused] = libs.createSignal(false);
  const activityBoardslotConfig = libs.createMemo(() => getActivityBoardslotConfig(dig_veins_logic.ACTIVITY_DICE_ID));
  const diceTicketID = libs.createMemo(() => activityBoardslotConfig()?.ticket_id ?? 0);
  const diceTicketCount = libs.createMemo(() => {
    playerTokens();
    playerProps();
    return GetServiceItemCount(diceTicketID());
  });
  const maxDiceRollTimes = libs.createMemo(() => Math.min(DICE_ROLL_TEN_TIMES, Math.max(0, Math.trunc(diceTicketCount()))));
  const diceRoll10ButtonTimes = libs.createMemo(() => maxDiceRollTimes() >= DICE_ROLL_ONCE_TIMES ? maxDiceRollTimes() : DICE_ROLL_TEN_TIMES);
  const hasEnoughDiceTicket = playTimes => diceTicketCount() >= playTimes;
  const activitySlotData = libs.createMemo(() => getActivitySlotData(displayTileData()));
  const activityGameData = libs.createMemo(() => getActivityGameData(displayGameData()));
  const nextSlotExtraExp = libs.createMemo(() => Math.max(0, Number(activityGameData()?.next_slot_extra_exp) || 0));
  const hasPlayerEvent = libs.createMemo(() => nextSlotExtraExp() > 0);
  const tileConfigMap = libs.createMemo(() => buildTileConfigMap(dig_veins_logic.ACTIVITY_DICE_ID, activitySlotData()));
  const [diceEventQueue, setDiceEventQueue] = libs.createSignal([]);
  const [currentDiceEvent, setCurrentDiceEvent] = libs.createSignal();
  const [isExecutingDiceEvents, setIsExecutingDiceEvents] = libs.createSignal(false);
  const [currentBatchLastMovement, setCurrentBatchLastMovement] = libs.createSignal();
  const [playerPathIndex, setPlayerPathIndex] = libs.createSignal(0);
  const [remainingMoveSteps, setRemainingMoveSteps] = libs.createSignal(0);
  const [isPlayerMoveStepping, setIsPlayerMoveStepping] = libs.createSignal(false);
  const [playerMoveDirection, setPlayerMoveDirection] = libs.createSignal(0);
  const [isDiceVisible, setIsDiceVisible] = libs.createSignal(false);
  const [isRollRequesting, setIsRollRequesting] = libs.createSignal(false);
  const [isDiceEventLayerVisible, setIsDiceEventLayerVisible] = libs.createSignal(false);
  const [diceEventLayerPosition, setDiceEventLayerPosition] = libs.createSignal("0px 0px 0px");
  const [diceEventLayerTitle, setDiceEventLayerTitle] = libs.createSignal(GetLocalization("#ActivityDice_DiceEventTitle"));
  const [diceEventLayerDescription, setDiceEventLayerDescription] = libs.createSignal("");
  const [diceEventLayerType, setDiceEventLayerType] = libs.createSignal("good");
  const [isMultiRollPointLayerVisible, setIsMultiRollPointLayerVisible] = libs.createSignal(false);
  const [multiRollPointValue, setMultiRollPointValue] = libs.createSignal(1);
  const [multiRollCurrentIndex, setMultiRollCurrentIndex] = libs.createSignal(0);
  const [multiRollTotalCount, setMultiRollTotalCount] = libs.createSignal(0);
  const [multiRollSummaryItems, setMultiRollSummaryItems] = libs.createSignal([]);
  const [isMultiRollSummaryLayerVisible, setIsMultiRollSummaryLayerVisible] = libs.createSignal(false);
  const [isBoxPreviewLayerVisible, setIsBoxPreviewLayerVisible] = libs.createSignal(false);
  const [boxPreviewReward, setBoxPreviewReward] = libs.createSignal();
  const [finishTileEffect, setFinishTileEffect] = libs.createSignal();
  const [levelUpTileEffectTokens, setLevelUpTileEffectTokens] = libs.createSignal({});
  let moveScheduleID;
  let diceEventDelayScheduleID;
  let boxPreviewScheduleID;
  let finishTileEffectScheduleID;
  let nextTileEffectToken = 0;
  let diceEventRunID = 0;
  let finishDiceRoll;
  const pendingRewardItems = new Map();
  const levelUpTileEffectScheduleIDs = new Map();
  const clearMoveSchedule = () => {
    if (moveScheduleID !== undefined) {
      $.CancelScheduled(moveScheduleID);
      moveScheduleID = undefined;
    }
  };
  const clearDiceEventDelaySchedule = () => {
    if (diceEventDelayScheduleID !== undefined) {
      $.CancelScheduled(diceEventDelayScheduleID);
      diceEventDelayScheduleID = undefined;
    }
  };
  const clearBoxPreview = () => {
    if (boxPreviewScheduleID !== undefined) {
      $.CancelScheduled(boxPreviewScheduleID);
      boxPreviewScheduleID = undefined;
    }
    setIsBoxPreviewLayerVisible(false);
    setBoxPreviewReward(undefined);
  };
  const clearFinishTileEffectSchedule = () => {
    if (finishTileEffectScheduleID !== undefined) {
      $.CancelScheduled(finishTileEffectScheduleID);
      finishTileEffectScheduleID = undefined;
    }
  };
  const showFinishTileEffect = slotID => {
    clearFinishTileEffectSchedule();
    const token = ++nextTileEffectToken;
    setFinishTileEffect({
      slotID,
      token
    });
    finishTileEffectScheduleID = $.Schedule(DICE_TILE_FINISH_EFFECT_DURATION_SECONDS, () => {
      finishTileEffectScheduleID = undefined;
      setFinishTileEffect(currentEffect => currentEffect?.token == token ? undefined : currentEffect);
    });
  };
  const showLevelUpTileEffect = slotID => {
    const currentScheduleID = levelUpTileEffectScheduleIDs.get(slotID);
    if (currentScheduleID !== undefined) {
      $.CancelScheduled(currentScheduleID);
    }
    const token = ++nextTileEffectToken;
    setLevelUpTileEffectTokens(currentTokens => ({
      ...currentTokens,
      [slotID]: token
    }));
    const scheduleID = $.Schedule(DICE_TILE_LEVEL_UP_EFFECT_DURATION_SECONDS, () => {
      levelUpTileEffectScheduleIDs.delete(slotID);
      setLevelUpTileEffectTokens(currentTokens => {
        if (currentTokens[slotID] != token) {
          return currentTokens;
        }
        const nextTokens = {
          ...currentTokens
        };
        delete nextTokens[slotID];
        return nextTokens;
      });
    });
    levelUpTileEffectScheduleIDs.set(slotID, scheduleID);
  };
  const clearTileEffectSchedules = () => {
    clearFinishTileEffectSchedule();
    for (const scheduleID of levelUpTileEffectScheduleIDs.values()) {
      $.CancelScheduled(scheduleID);
    }
    levelUpTileEffectScheduleIDs.clear();
  };
  const syncDisplayDataFromNetData = () => {
    setDisplayTileData(cloneDiceNetDataRecord(diceTileData()));
    setDisplayGameData(cloneDiceNetDataRecord(diceGameData()));
  };
  const pauseDisplaySync = () => {
    syncDisplayDataFromNetData();
    setIsDisplaySyncPaused(true);
  };
  const resumeDisplaySync = () => {
    setIsDisplaySyncPaused(false);
    syncDisplayDataFromNetData();
  };
  const resetMultiRollState = () => {
    setIsMultiRollPlaying(false);
    setIsMultiRollPointLayerVisible(false);
    setMultiRollPointValue(1);
    setMultiRollCurrentIndex(0);
    setMultiRollTotalCount(0);
  };
  const clearMultiRollSummary = () => {
    setMultiRollSummaryItems([]);
    setIsMultiRollSummaryLayerVisible(false);
  };
  const clearPendingRewardItems = () => {
    pendingRewardItems.clear();
  };
  const initializePendingRewardItems = rewardItems => {
    clearPendingRewardItems();
    if (!Array.isArray(rewardItems)) {
      console.log("[DiceReward] missing add_items.common", rewardItems);
      return;
    }
    for (const rewardItem of rewardItems) {
      const {
        item_id: itemID,
        amounts,
        item_rarity: itemRarity
      } = rewardItem;
      if (!Number.isInteger(itemID) || itemID <= 0 || !Number.isFinite(amounts) || amounts <= 0) {
        console.log("[DiceReward] invalid reward item", rewardItem);
        continue;
      }
      const normalizedRarity = Number.isFinite(itemRarity) ? itemRarity : GetServiceItemRarity(itemID);
      if (!Number.isFinite(itemRarity)) {
        console.log("[DiceReward] invalid item rarity", rewardItem);
      }
      const pendingRewardItem = pendingRewardItems.get(itemID);
      if (pendingRewardItem == undefined) {
        pendingRewardItems.set(itemID, {
          item_id: itemID,
          amounts,
          item_rarity: normalizedRarity
        });
        continue;
      }
      if (pendingRewardItem.item_rarity != normalizedRarity) {
        console.log("[DiceReward] inconsistent item rarity", pendingRewardItem, rewardItem);
      }
      pendingRewardItems.set(itemID, {
        ...pendingRewardItem,
        amounts: pendingRewardItem.amounts + amounts
      });
    }
  };
  const getPendingRewardItems = () => Array.from(pendingRewardItems.values()).filter(rewardItem => rewardItem.amounts > 0);
  const emitDiceRewardToast = rewardItems => {
    if (rewardItems.length == 0) {
      return;
    }
    ClientSideEvent("ReceiveRewards", {
      json: JSON.stringify(rewardItems)
    });
  };
  const consumePendingRewardItem = rewardItem => {
    const pendingRewardItem = pendingRewardItems.get(rewardItem.item_id);
    if (pendingRewardItem == undefined) {
      console.log("[DiceReward] displayed reward missing from pending rewards", rewardItem);
      return;
    }
    if (rewardItem.amounts >= pendingRewardItem.amounts) {
      if (rewardItem.amounts > pendingRewardItem.amounts) {
        console.log("[DiceReward] displayed reward exceeds pending amount", rewardItem, pendingRewardItem);
      }
      pendingRewardItems.delete(rewardItem.item_id);
      return;
    }
    pendingRewardItems.set(rewardItem.item_id, {
      ...pendingRewardItem,
      amounts: pendingRewardItem.amounts - rewardItem.amounts
    });
  };
  const showAndConsumeDiceRewards = rewardItems => {
    emitDiceRewardToast(rewardItems);
    for (const rewardItem of rewardItems) {
      consumePendingRewardItem(rewardItem);
    }
  };
  const finishPendingRewardItems = () => {
    const remainingRewardItems = getPendingRewardItems();
    if (remainingRewardItems.length > 0) {
      console.log("[DiceReward] rewards remain after normal playback", remainingRewardItems);
    }
    clearPendingRewardItems();
  };
  const finishMultiRollState = () => {
    const shouldShowSummary = isMultiRollPlaying() && multiRollSummaryItems().length > 0;
    resetMultiRollState();
    setIsMultiRollSummaryLayerVisible(shouldShowSummary);
  };
  const syncPlayerPathIndexFromDisplayData = () => {
    setPlayerPathIndex(getPlayerPathIndexBySlotID(getActivityGameData(displayGameData())?.now_slot_id));
  };
  const updateDisplaySlotExp = (slotID, addExp) => {
    const slotConfig = getBoardSlotConfigBySlotID(dig_veins_logic.ACTIVITY_DICE_ID, slotID);
    if (slotConfig == undefined) {
      console.log("[DiceEvent] missing slot config for add exp", slotID);
      return;
    }
    let didLevelUp = false;
    setDisplayTileData(currentData => {
      const nextData = cloneDiceNetDataRecord(currentData) ?? {};
      const currentSlotData = nextData[slotID];
      const currentSlotExp = currentSlotData?.extra_exp;
      const currentLevel = clampSlotLevel(slotConfig, currentSlotData?.level);
      const nextLevelExp = calculateSlotLevelExp(slotConfig, currentSlotData?.level, currentSlotExp, addExp);
      didLevelUp = nextLevelExp.level > currentLevel;
      nextData[slotID] = {
        ...(currentSlotData ?? {}),
        activity_id: dig_veins_logic.ACTIVITY_DICE_ID,
        slot_id: slotID,
        level: nextLevelExp.level,
        extra_exp: nextLevelExp.exp
      };
      return nextData;
    });
    if (didLevelUp) {
      showLevelUpTileEffect(slotID);
    }
  };
  const getUpgradedSlotIDs = (currentData, finalData) => {
    const currentActivitySlotData = getActivitySlotData(currentData);
    const finalActivitySlotData = getActivitySlotData(finalData);
    const slotConfigMap = getBoardSlotConfigMap(dig_veins_logic.ACTIVITY_DICE_ID);
    return Object.values(slotConfigMap).filter(slotConfig => isLevelableSlot(slotConfig)).filter(slotConfig => {
      const slotID = slotConfig.slot_id;
      const currentLevel = clampSlotLevel(slotConfig, currentActivitySlotData[slotID]?.level);
      const finalLevel = clampSlotLevel(slotConfig, finalActivitySlotData[slotID]?.level);
      return finalLevel > currentLevel;
    }).map(slotConfig => slotConfig.slot_id);
  };
  const updateDisplaySlotTypeExp = (slotType, addExp) => {
    const slotConfigMap = getBoardSlotConfigMap(dig_veins_logic.ACTIVITY_DICE_ID);
    for (const slotConfig of Object.values(slotConfigMap)) {
      if (slotConfig.slot_type != slotType) {
        continue;
      }
      updateDisplaySlotExp(slotConfig.slot_id, addExp);
    }
  };
  const updateDisplaySlotBox = (slotID, withBox) => {
    if (getBoardSlotConfigBySlotID(dig_veins_logic.ACTIVITY_DICE_ID, slotID) == undefined) {
      console.log("[DiceEvent] missing slot config for box update", slotID);
      return;
    }
    setDisplayTileData(currentData => {
      const nextData = cloneDiceNetDataRecord(currentData) ?? {};
      const currentSlotData = nextData[slotID];
      nextData[slotID] = {
        ...(currentSlotData ?? {}),
        activity_id: dig_veins_logic.ACTIVITY_DICE_ID,
        slot_id: slotID,
        with_box: withBox
      };
      return nextData;
    });
  };
  const showDiceReceiveRewardToast = slotID => {
    const slotConfig = getBoardSlotConfigBySlotID(dig_veins_logic.ACTIVITY_DICE_ID, slotID);
    if (slotConfig == undefined || slotConfig.reward_id == undefined || slotConfig.reward_id.length == 0) {
      console.log("[DiceEvent] missing reward config", slotID);
      return;
    }
    const slotData = activitySlotData()[slotID];
    const rewardID = Number(slotConfig.reward_id);
    const rewardAmount = getSlotRewardAmount(slotConfig, slotData?.level);
    if (!Number.isFinite(rewardID) || rewardAmount <= 0) {
      console.log("[DiceEvent] invalid reward data", slotID, slotConfig);
      return;
    }
    const rewardItem = {
      item_id: rewardID,
      amounts: rewardAmount,
      item_rarity: pendingRewardItems.get(rewardID)?.item_rarity ?? GetServiceItemRarity(rewardID)
    };
    showAndConsumeDiceRewards([rewardItem]);
  };
  const showDiceReceiveBoxToast = (itemID, amounts) => {
    const rewardItem = {
      item_id: itemID,
      amounts,
      item_rarity: pendingRewardItems.get(itemID)?.item_rarity ?? GetServiceItemRarity(itemID)
    };
    showAndConsumeDiceRewards([rewardItem]);
  };
  const playerPiecePosition = libs.createMemo(() => {
    const tileIndex = TilePath[playerPathIndex()];
    const piecePosition = getDiceBoardPiecePosition(tileIndex);
    const targetLeft = piecePosition.left + DICE_BOARD_CELL_WIDTH / 2;
    const targetTop = piecePosition.top + DICE_BOARD_CELL_HEIGHT / 2;
    const left = targetLeft - DICE_PLAYER_ANCHOR_X + DICE_PLAYER_OFFSET_X;
    const top = targetTop - DICE_PLAYER_ANCHOR_Y + DICE_PLAYER_OFFSET_Y;
    return `${left}px ${top}px 0px`;
  });
  const isPlayerPieceFacingForward = libs.createMemo(() => {
    const slotFacingForward = isPlayerSlotFacingForward(playerPathIndex());
    const isMovingBackward = playerMoveDirection() == -1;
    return slotFacingForward != isMovingBackward;
  });
  const showDiceEventLayer = () => {
    setIsDiceEventLayerVisible(true);
  };
  const hideDiceEventLayer = () => {
    setIsDiceEventLayerVisible(false);
  };
  const setDiceEventLayerContent = (description, eventType = "good") => {
    setDiceEventLayerTitle(GetLocalization("#ActivityDice_DiceEventTitle"));
    setDiceEventLayerDescription(description);
    setDiceEventLayerType(eventType);
  };
  const setDiceEventLayerPositionToSlot = slotID => {
    const pathIndex = getPlayerPathIndexBySlotID(slotID);
    const tileIndex = TilePath[pathIndex];
    const piecePosition = getDiceBoardPiecePosition(tileIndex);
    const left = piecePosition.left + DICE_BOARD_CELL_WIDTH + DICE_EVENT_LAYER_OFFSET_X;
    const top = piecePosition.top + DICE_EVENT_LAYER_OFFSET_Y;
    setDiceEventLayerPosition(`${left}px ${top}px 0px`);
  };
  const setupDiceEventLayer = (parsedResult, description, eventType = "good") => {
    setDiceEventLayerContent(description, eventType);
    setDiceEventLayerPositionToSlot(parsedResult.slotID);
  };
  const getDiceTileTypeLocalization = slotType => {
    return GetLocalization(`#ActivityDice_TileType_${slotType}`);
  };
  const getDiceEventDescription = parsedResult => {
    const {
      event
    } = parsedResult;
    if (!event.matched || !event.valid) {
      return "";
    }
    switch (event.key) {
      case "add_type_exp":
        return LocalizeWithVars("#ActivityDice_DiceEvent_AddTypeExp", {
          slot_type: getDiceTileTypeLocalization(event.args[0]),
          slot_exp: event.args[1]
        });
      case "add_slot_exp":
        {
          const slotConfig = getBoardSlotConfigBySlotID(dig_veins_logic.ACTIVITY_DICE_ID, event.args[0]);
          return LocalizeWithVars("#ActivityDice_DiceEvent_AddTypeExp", {
            slot_type: getDiceTileTypeLocalization(slotConfig?.slot_type ?? 0),
            slot_exp: event.args[1]
          });
        }
      case "move_pos":
        return LocalizeWithVars("#ActivityDice_DiceEvent_MovePos", {
          step: event.args[0]
        });
      case "move_neg":
        return LocalizeWithVars("#ActivityDice_DiceEvent_MoveNeg", {
          step: event.args[0]
        });
      case "move_start":
        return GetLocalization("#ActivityDice_DiceEvent_MoveStart");
      case "reward_next_slot":
        return GetLocalization("#ActivityDice_DiceEvent_RewardNextSlot");
      default:
        return "";
    }
  };
  const formatAddTypeExpSummary = (parsedResult, localizationKey) => {
    const {
      event
    } = parsedResult;
    if (event.key != "add_type_exp" || !event.valid) {
      return undefined;
    }
    return LocalizeWithVars(localizationKey, {
      slot_type: getDiceTileTypeLocalization(event.args[0]),
      slot_exp: event.args[1]
    });
  };
  const formatMovePosSummary = (parsedResult, localizationKey) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_pos" || !event.valid) {
      return undefined;
    }
    return LocalizeWithVars(localizationKey, {
      step: event.args[0]
    });
  };
  const formatMoveNegSummary = (parsedResult, localizationKey) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_neg" || !event.valid) {
      return undefined;
    }
    return LocalizeWithVars(localizationKey, {
      step: event.args[0]
    });
  };
  const formatMoveStartSummary = (parsedResult, localizationKey) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_start" || !event.valid) {
      return undefined;
    }
    return GetLocalization(localizationKey);
  };
  const formatReceiveBoxSummary = (parsedResult, localizationKey) => {
    const {
      event
    } = parsedResult;
    if (event.key != "receive_box" || !event.valid) {
      return undefined;
    }
    return LocalizeWithVars(localizationKey, {
      item_name: GetLocalization(`#${event.args[1]}`),
      item_amount: event.args[2]
    });
  };
  const formatGenerateBoxSummary = (parsedResult, localizationKey) => {
    const {
      event
    } = parsedResult;
    if (event.key != "generate_box" || !event.valid) {
      return undefined;
    }
    return LocalizeWithVars(localizationKey, {
      slot: event.args[0]
    });
  };
  const diceSummaryEventFormatters = {
    add_type_exp: formatAddTypeExpSummary,
    move_pos: formatMovePosSummary,
    move_neg: formatMoveNegSummary,
    move_start: formatMoveStartSummary,
    receive_box: formatReceiveBoxSummary,
    generate_box: formatGenerateBoxSummary
  };
  const getDiceSummaryEventDescription = parsedResult => {
    const {
      event
    } = parsedResult;
    if (!event.matched || !event.valid || !isDiceSummaryEventKey(event.key)) {
      return undefined;
    }
    return diceSummaryEventFormatters[event.key](parsedResult, SUMMARY_EVENT[event.key]);
  };
  const buildDiceMultiRollSummary = parsedResults => {
    return parsedResults.map(getDiceSummaryEventDescription).filter(description => description != undefined && description.length > 0);
  };
  const isCurrentDiceEventRun = runID => {
    return runID == diceEventRunID;
  };
  const clearDiceAnimation = () => {
    finishDiceRoll = undefined;
    diceSequence.stop();
    setIsDiceVisible(false);
  };
  const movePlayerInstantlyToPathIndex = pathIndex => {
    clearMoveSchedule();
    playerJump.stop();
    setIsPlayerMoveStepping(false);
    setPlayerMoveDirection(0);
    setPlayerPathIndex(normalizePlayerPathIndex(pathIndex));
    setRemainingMoveSteps(0);
  };
  const movePlayerBySteps = (steps, done, runID) => {
    if (!isCurrentDiceEventRun(runID)) {
      return;
    }
    clearMoveSchedule();
    let remainingSteps = Math.abs(steps);
    const stepDirection = steps >= 0 ? 1 : -1;
    if (remainingSteps == 0) {
      setPlayerMoveDirection(0);
      done();
      return;
    }
    setRemainingMoveSteps(remainingSteps);
    setPlayerMoveDirection(stepDirection);
    const startNextMoveStep = () => {
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      if (remainingSteps <= 0) {
        setRemainingMoveSteps(0);
        setIsPlayerMoveStepping(false);
        setPlayerMoveDirection(0);
        playerJump.stop();
        done();
        return;
      }
      setIsPlayerMoveStepping(true);
      setPlayerPathIndex(index => normalizePlayerPathIndex(index + stepDirection));
      playerJump.replay();
      Game.EmitSound("Hero_Zuus.Taunt.Jump");
      moveScheduleID = $.Schedule(dicePlaybackConfig().playerMoveStepDurationSeconds, () => {
        moveScheduleID = undefined;
        if (!isCurrentDiceEventRun(runID)) {
          return;
        }
        remainingSteps -= 1;
        setRemainingMoveSteps(remainingSteps);
        setIsPlayerMoveStepping(false);
        if (remainingSteps <= 0) {
          setPlayerMoveDirection(0);
          playerJump.stop();
          done();
          return;
        }
        startNextMoveStep();
      });
    };
    startNextMoveStep();
  };
  const movePlayerToPathIndex = (targetPathIndex, done, runID) => {
    if (!isCurrentDiceEventRun(runID)) {
      return;
    }
    movePlayerInstantlyToPathIndex(targetPathIndex);
    done();
  };
  const playDiceRoll = (value, done, runID) => {
    if (!isCurrentDiceEventRun(runID)) {
      return;
    }
    clearMoveSchedule();
    setDiceResult(value);
    setIsDiceVisible(true);
    diceSequence.replay();
    Game.EmitSound("UI.Dice.Roll");
    finishDiceRoll = () => {
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      done();
    };
  };
  const resetDiceEventExecutionState = () => {
    clearMoveSchedule();
    clearDiceEventDelaySchedule();
    clearBoxPreview();
    clearDiceAnimation();
    playerJump.stop();
    hideDiceEventLayer();
    setRemainingMoveSteps(0);
    setIsPlayerMoveStepping(false);
    setPlayerMoveDirection(0);
    setCurrentDiceEvent(undefined);
    setDiceEventQueue([]);
    setIsExecutingDiceEvents(false);
  };
  const skipDiceEvents = () => {
    if (!isExecutingDiceEvents()) {
      return;
    }
    diceEventRunID += 1;
    const batchLastMovement = currentBatchLastMovement();
    const finalPathIndex = batchLastMovement?.pathIndex ?? playerPathIndex();
    const finalSlotID = normalizePlayerPathIndex(finalPathIndex) + 1;
    const upgradedSlotIDs = getUpgradedSlotIDs(displayTileData(), diceTileData());
    const remainingRewardItems = getPendingRewardItems();
    resetDiceEventExecutionState();
    finishMultiRollState();
    movePlayerInstantlyToPathIndex(finalPathIndex);
    setCurrentBatchLastMovement(undefined);
    resumeDisplaySync();
    syncPlayerPathIndexFromDisplayData();
    emitDiceRewardToast(remainingRewardItems);
    clearPendingRewardItems();
    if (batchLastMovement != undefined) {
      showFinishTileEffect(finalSlotID);
    }
    for (const slotID of upgradedSlotIDs) {
      showLevelUpTileEffect(slotID);
    }
  };
  const finishCurrentDiceEvent = runID => {
    if (!isCurrentDiceEventRun(runID)) {
      return;
    }
    const finishedEvent = currentDiceEvent();
    const isLastEvent = diceEventQueue().length <= 1;
    const batchLastMovement = currentBatchLastMovement();
    if (finishedEvent?.event.key == "move_dice") {
      clearDiceAnimation();
    }
    if (batchLastMovement != undefined && finishedEvent?.index == batchLastMovement.eventIndex) {
      const finalSlotID = normalizePlayerPathIndex(batchLastMovement.pathIndex) + 1;
      showFinishTileEffect(finalSlotID);
    }
    setDiceEventQueue(queue => queue.slice(1));
    setCurrentDiceEvent(undefined);
    setIsExecutingDiceEvents(false);
    if (isLastEvent) {
      finishMultiRollState();
      setCurrentBatchLastMovement(undefined);
      resumeDisplaySync();
      syncPlayerPathIndexFromDisplayData();
      finishPendingRewardItems();
    }
  };
  const executeMoveDiceEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_dice" || !event.valid) {
      done();
      return;
    }
    const diceValue = event.args[0];
    if (!isDiceValue(diceValue)) {
      console.log("[DiceEvent] invalid dice value", parsedResult);
      done();
      return;
    }
    if (isMultiRollPointLayerVisible()) {
      const remainingRollCount = getValidDiceRollValues(diceEventQueue()).length;
      const currentRollIndex = multiRollTotalCount() - remainingRollCount + 1;
      setMultiRollPointValue(diceValue);
      setMultiRollCurrentIndex(Math.max(1, Math.min(multiRollTotalCount(), currentRollIndex)));
    }
    playDiceRoll(diceValue, () => {
      movePlayerBySteps(diceValue, done, runID);
    }, runID);
  };
  const executeMovePosEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_pos" || !event.valid) {
      done();
      return;
    }
    if (isMultiRollPlaying()) {
      movePlayerBySteps(event.args[0], done, runID);
      return;
    }
    setupDiceEventLayer(parsedResult, getDiceEventDescription(parsedResult), "good");
    showDiceEventLayer();
    clearDiceEventDelaySchedule();
    diceEventDelayScheduleID = $.Schedule(dicePlaybackConfig().moveEventDelaySeconds, () => {
      diceEventDelayScheduleID = undefined;
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      movePlayerBySteps(event.args[0], () => {
        hideDiceEventLayer();
        done();
      }, runID);
    });
  };
  const executeMoveNegEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_neg" || !event.valid) {
      done();
      return;
    }
    if (isMultiRollPlaying()) {
      movePlayerBySteps(-event.args[0], done, runID);
      return;
    }
    setupDiceEventLayer(parsedResult, getDiceEventDescription(parsedResult), "bad");
    showDiceEventLayer();
    clearDiceEventDelaySchedule();
    diceEventDelayScheduleID = $.Schedule(dicePlaybackConfig().moveEventDelaySeconds, () => {
      diceEventDelayScheduleID = undefined;
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      movePlayerBySteps(-event.args[0], () => {
        hideDiceEventLayer();
        done();
      }, runID);
    });
  };
  const executeMoveStartEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "move_start" || !event.valid) {
      done();
      return;
    }
    if (isMultiRollPlaying()) {
      movePlayerToPathIndex(0, done, runID);
      return;
    }
    setupDiceEventLayer(parsedResult, getDiceEventDescription(parsedResult), "good");
    showDiceEventLayer();
    clearDiceEventDelaySchedule();
    diceEventDelayScheduleID = $.Schedule(dicePlaybackConfig().moveEventDelaySeconds, () => {
      diceEventDelayScheduleID = undefined;
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      movePlayerToPathIndex(0, () => {
        hideDiceEventLayer();
        done();
      }, runID);
    });
  };
  const executeTimedDiceEvent = (parsedResult, done, runID) => {
    if (isMultiRollPlaying()) {
      done();
      return;
    }
    setupDiceEventLayer(parsedResult, getDiceEventDescription(parsedResult), "good");
    showDiceEventLayer();
    clearDiceEventDelaySchedule();
    diceEventDelayScheduleID = $.Schedule(dicePlaybackConfig().eventLayerDisplayDurationSeconds, () => {
      diceEventDelayScheduleID = undefined;
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      hideDiceEventLayer();
      done();
    });
  };
  const executeAddSlotExpEvent = (parsedResult, done, _runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "add_slot_exp" || !event.valid) {
      done();
      return;
    }
    updateDisplaySlotExp(event.args[0], event.args[1]);
    done();
  };
  const executeAddTypeExpEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "add_type_exp" || !event.valid) {
      done();
      return;
    }
    updateDisplaySlotTypeExp(event.args[0], event.args[1]);
    executeTimedDiceEvent(parsedResult, done, runID);
  };
  const executeReceiveRewardsEvent = (parsedResult, done) => {
    const {
      event
    } = parsedResult;
    if (event.key != "receive_rewards" || !event.valid) {
      done();
      return;
    }
    showDiceReceiveRewardToast(event.args[0]);
    done();
  };
  const executeReceiveBoxEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (event.key != "receive_box" || !event.valid) {
      done();
      return;
    }
    const [slotID, itemID, itemAmounts] = event.args;
    if (!Number.isInteger(slotID) || slotID <= 0 || !Number.isInteger(itemID) || itemID <= 0 || !Number.isFinite(itemAmounts) || itemAmounts <= 0) {
      console.log("[DiceEvent] invalid receive box data", parsedResult);
      done();
      return;
    }
    updateDisplaySlotBox(slotID, false);
    showDiceReceiveBoxToast(itemID, itemAmounts);
    Game.EmitSound("UI.Dice.Treasure");
    if (isMultiRollPlaying()) {
      done();
      return;
    }
    clearBoxPreview();
    setBoxPreviewReward({
      item_id: itemID,
      amounts: itemAmounts,
      item_rarity: pendingRewardItems.get(itemID)?.item_rarity ?? GetServiceItemRarity(itemID)
    });
    setIsBoxPreviewLayerVisible(true);
    boxPreviewScheduleID = $.Schedule(DICE_BOX_PREVIEW_DURATION_SECONDS, () => {
      boxPreviewScheduleID = undefined;
      if (!isCurrentDiceEventRun(runID)) {
        return;
      }
      setIsBoxPreviewLayerVisible(false);
      setBoxPreviewReward(undefined);
      done();
    });
  };
  const executeGenerateBoxEvent = (parsedResult, done) => {
    const {
      event
    } = parsedResult;
    if (event.key != "generate_box" || !event.valid) {
      done();
      return;
    }
    updateDisplaySlotBox(event.args[0], true);
    done();
  };
  const diceEventExecutors = {
    move_dice: executeMoveDiceEvent,
    add_type_exp: executeAddTypeExpEvent,
    add_slot_exp: executeAddSlotExpEvent,
    receive_rewards: executeReceiveRewardsEvent,
    receive_box: executeReceiveBoxEvent,
    generate_box: executeGenerateBoxEvent,
    move_pos: executeMovePosEvent,
    move_neg: executeMoveNegEvent,
    move_start: executeMoveStartEvent,
    reward_next_slot: executeTimedDiceEvent
  };
  const executeDiceEvent = (parsedResult, done, runID) => {
    const {
      event
    } = parsedResult;
    if (!event.matched || !event.valid) {
      console.log("[DiceEvent] invalid or unknown event", parsedResult);
      done();
      return;
    }
    const executor = diceEventExecutors[event.key];
    if (executor == undefined) {
      console.log("[DiceEvent] unhandled event", parsedResult);
      done();
      return;
    }
    executor(parsedResult, done, runID);
  };
  const requestRollDice = playTimes => {
    if (Date.now() / 1000 >= activityData().end_time) {
      ErrorMessage(GetLocalization("#Activity_TimeEnd"));
      return;
    }
    if (isRollRequesting() || isExecutingDiceEvents() || diceEventQueue().length > 0) {
      return;
    }
    const actualPlayTimes = Math.min(Math.max(0, Math.trunc(playTimes)), Math.max(0, Math.trunc(diceTicketCount())));
    if (actualPlayTimes < DICE_ROLL_ONCE_TIMES) {
      ErrorMessage(GetLocalization("#ActivityDice_RollTokenNotAllow"));
      return;
    }
    resetMultiRollState();
    clearMultiRollSummary();
    clearBoxPreview();
    clearPendingRewardItems();
    setCurrentBatchLastMovement(undefined);
    pauseDisplaySync();
    const gameData = activityGameData();
    setIsRollRequesting(true);
    CallActionRequest("/v1/activity/play_boardslot", {
      activity_id: dig_veins_logic.ACTIVITY_DICE_ID,
      play_times: actualPlayTimes,
      play_num: gameData?.play_num ?? 0
    }, result => {
      setIsRollRequesting(false);
      if (result.code != 0 && result.code != 200) {
        console.log("[DiceEvent] roll dice request failed");
        resetMultiRollState();
        clearMultiRollSummary();
        clearPendingRewardItems();
        resumeDisplaySync();
        syncPlayerPathIndexFromDisplayData();
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
        return;
      }
      const gameResult = result.data?.player_boardslot_activity_play_result;
      if (!Array.isArray(gameResult) || gameResult.length == 0) {
        console.log("[DiceEvent] roll dice request returned empty result");
        resetMultiRollState();
        clearMultiRollSummary();
        clearPendingRewardItems();
        resumeDisplaySync();
        syncPlayerPathIndexFromDisplayData();
        return;
      }
      const parsedResults = parseDicePlayResult(gameResult);
      if (parsedResults.length == 0) {
        console.log("[DiceEvent] roll dice request returned no valid events");
        resetMultiRollState();
        clearMultiRollSummary();
        clearPendingRewardItems();
        resumeDisplaySync();
        syncPlayerPathIndexFromDisplayData();
        return;
      }
      const diceRollValues = getValidDiceRollValues(parsedResults);
      initializePendingRewardItems(result.data?.add_items?.common);
      if (actualPlayTimes > DICE_ROLL_ONCE_TIMES && diceRollValues.length > DICE_ROLL_ONCE_TIMES) {
        setIsMultiRollPlaying(true);
        setMultiRollPointValue(diceRollValues[0]);
        setMultiRollCurrentIndex(1);
        setMultiRollTotalCount(diceRollValues.length);
        setIsMultiRollPointLayerVisible(true);
        setMultiRollSummaryItems(buildDiceMultiRollSummary(parsedResults));
        setIsMultiRollSummaryLayerVisible(false);
      } else {
        resetMultiRollState();
        clearMultiRollSummary();
      }
      setCurrentBatchLastMovement(getBatchLastMovement(playerPathIndex(), parsedResults));
      setDiceEventQueue(currentQueue => [...currentQueue, ...parsedResults]);
    }, () => {
      console.log("[DiceEvent] roll dice request failed (network error) ");
      setIsRollRequesting(false);
      resetMultiRollState();
      clearMultiRollSummary();
      clearPendingRewardItems();
      resumeDisplaySync();
      syncPlayerPathIndexFromDisplayData();
    }, false);
  };
  libs.createEffect(() => {
    const latestTileData = diceTileData();
    const latestGameData = diceGameData();
    if (isDisplaySyncPaused()) {
      return;
    }
    setDisplayTileData(cloneDiceNetDataRecord(latestTileData));
    setDisplayGameData(cloneDiceNetDataRecord(latestGameData));
  });
  libs.createEffect(() => {
    if (isExecutingDiceEvents()) {
      return;
    }
    const nextEvent = diceEventQueue()[0];
    if (nextEvent == undefined) {
      return;
    }
    const runID = diceEventRunID;
    setCurrentDiceEvent(nextEvent);
    setIsExecutingDiceEvents(true);
    executeDiceEvent(nextEvent, () => finishCurrentDiceEvent(runID), runID);
  });
  libs.createEffect(() => {
    if (!isDiceVisible() || !diceSequence.isFinished()) {
      return;
    }
    finishDiceRoll?.();
    finishDiceRoll = undefined;
  });
  const isPlayerMoving = libs.createMemo(() => remainingMoveSteps() > 0);
  const isRollBusy = libs.createMemo(() => isRollRequesting() || isExecutingDiceEvents() || diceEventQueue().length > 0 || isDisplaySyncPaused());
  const canRollDice = libs.createMemo(() => !isRollBusy());
  libs.createEffect(() => {
    if (isDisplaySyncPaused()) {
      return;
    }
    if (isExecutingDiceEvents()) {
      return;
    }
    syncPlayerPathIndexFromDisplayData();
  });
  libs.onCleanup(() => {
    clearMoveSchedule();
    clearDiceEventDelaySchedule();
    clearBoxPreview();
    clearTileEffectSchedules();
    clearPendingRewardItems();
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "SubMenu_dice",
    get children() {
      return [(() => {
        const _el$58 = libs.createElement("Panel", {
            id: "DiceTopRight"
          }, null),
          _el$59 = libs.createElement("Panel", {
            id: "DiceTopTitle"
          }, _el$58),
          _el$60 = libs.createElement("Image", {
            id: "DiceTopTitleIcon",
            get ["class"]() {
              return logoLang();
            }
          }, _el$59),
          _el$61 = libs.createElement("Image", {
            id: "DiceTopTitleTooltipIcon",
            get ["class"]() {
              return logoLang();
            }
          }, _el$59),
          _el$62 = libs.createElement("Panel", {
            id: "DiceTopSubTitle"
          }, _el$58);
          libs.createElement("Image", {
            id: "DiceTopSubTitleBG"
          }, _el$62);
          const _el$64 = libs.createElement("Panel", {
            id: "DiceActivityTask"
          }, _el$58);
          libs.createElement("Image", {
            id: "DiceActivityTaskBG"
          }, _el$64);
          const _el$66 = libs.createElement("Panel", {
            id: "DiceActivityTaskContent",
            scroll: "y"
          }, _el$64),
          _el$67 = libs.createElement("Panel", {
            "class": "DiceRoundReward"
          }, _el$58),
          _el$68 = libs.createElement("Panel", {
            "class": "DiceRoundRewardTitle"
          }, _el$67);
          libs.createElement("Image", {
            "class": "DiceRoundRewardTitleBG"
          }, _el$68);
          const _el$70 = libs.createElement("Panel", {
            "class": "DiceRoundRewardTitleContent"
          }, _el$68),
          _el$71 = libs.createElement("Panel", {
            "class": "ContentTitle"
          }, _el$70),
          _el$72 = libs.createElement("Label", {
            "class": "DiceRoundRewardTitleLabel",
            get text() {
              return GetLocalization("#ActivityDice_CPMini_Title");
            }
          }, _el$71),
          _el$73 = libs.createElement("Image", {
            "class": "DiceRoundRewardTooltipIcon"
          }, _el$71),
          _el$74 = libs.createElement("Panel", {
            "class": "ContentCooldown"
          }, _el$70),
          _el$76 = libs.createElement("Panel", {
            "class": "DiceRoundRewardContent"
          }, _el$67),
          _el$77 = libs.createElement("Panel", {
            "class": "DiceRoundRewardRound"
          }, _el$76);
          libs.createElement("Image", {
            "class": "DiceRoundRewardRoundBG"
          }, _el$77);
          const _el$79 = libs.createElement("Panel", {
            "class": "DiceRoundRewardRoundContent"
          }, _el$77),
          _el$80 = libs.createElement("Label", {
            "class": "DiceRoundRewardRoundText",
            get text() {
              return GetLocalization("#ActivityDice_CPMini_RoundText");
            }
          }, _el$79),
          _el$81 = libs.createElement("Panel", {
            "class": "DiceRoundRewardRoundValueContent"
          }, _el$79),
          _el$82 = libs.createElement("Label", {
            "class": "DiceRoundRewardRoundValue",
            get text() {
              return `${milestoneProgress()}`;
            }
          }, _el$81),
          _el$83 = libs.createElement("Label", {
            "class": "DiceRoundRewardRoundValueMAX",
            get text() {
              return `/${progressMilestone()?.coin_num ?? 0}`;
            }
          }, _el$81),
          _el$84 = libs.createElement("Panel", {
            "class": "DiceRoundRewardBar"
          }, _el$76);
          libs.createElement("Image", {
            "class": "DiceRoundRewardBarBG"
          }, _el$84);
          const _el$86 = libs.createElement("Panel", {
            "class": "DiceRoundRewardBarFill",
            get style() {
              return {
                width: milestoneProgressPercent() + "%"
              };
            }
          }, _el$84);
          libs.createElement("Image", {
            "class": "DiceRoundRewardBarFillImage"
          }, _el$86);
          const _el$88 = libs.createElement("Label", {
            "class": "DiceRoundRewardRoundValue",
            get text() {
              return `${milestoneProgress()}/${progressMilestone()?.coin_num ?? 0}`;
            }
          }, _el$84),
          _el$89 = libs.createElement("Panel", {
            "class": "DiceRoundRewardBarValueFill",
            hittest: false,
            hittestchildren: false,
            get style() {
              return {
                clip: `rect(0%, ${milestoneProgressPercent()}%, 100%, 0%)`
              };
            }
          }, _el$84),
          _el$90 = libs.createElement("Label", {
            "class": "DiceRoundRewardRoundValue",
            get text() {
              return `${milestoneProgress()}/${progressMilestone()?.coin_num ?? 0}`;
            }
          }, _el$89),
          _el$91 = libs.createElement("Button", {
            "class": "DiceRoundRewardItem"
          }, _el$76),
          _el$92 = libs.createElement("DOTAParticleScenePanel", {
            "class": "DiceRoundRewardClaimableBorder",
            particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
            cameraOrigin: "0 0 90",
            fov: 45,
            lookAt: "0 0 0",
            hittest: false
          }, _el$91);
          libs.createElement("Image", {
            "class": "DiceRoundRewardItemBG",
            hittest: false
          }, _el$91);
          const _el$94 = libs.createElement("Image", {
            "class": "DiceRoundRewardItemRedPoint",
            hittest: false
          }, _el$91);
        libs.insert(_el$62, libs.createComponent(libs.Show, {
          when: !isActivityEnded,
          get fallback() {
            return (() => {
              const _el$157 = libs.createElement("Label", {
                "class": "DiceActivityEndText",
                get text() {
                  return GetLocalization("#ActivityDice_EndTimeLimit");
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$157, "text", GetLocalization("#ActivityDice_EndTimeLimit"), _$p));
              return _el$157;
            })();
          },
          get children() {
            return libs.createComponent(EOM_Countdown.EOM_Countdown, {
              icon: true,
              text: "#ActivityDice_TimeLimit",
              get endTime() {
                return activityData().end_time;
              }
            });
          }
        }), null);
        libs.setProp(_el$66, "scroll", "y");
        libs.insert(_el$66, libs.createComponent(DiceTaskGroup, {
          taskType: 7,
          get tasks() {
            return diceTasksByType()[7];
          },
          get claimingTaskKey() {
            return claimingTaskKey();
          },
          onClaim: receiveDiceTaskReward
        }), null);
        libs.insert(_el$66, libs.createComponent(libs.Show, {
          get when() {
            return shouldShowDiceTaskGroup(diceTasksByType()[6]);
          },
          get children() {
            return libs.createComponent(DiceTaskGroup, {
              taskType: 6,
              get tasks() {
                return diceTasksByType()[6];
              },
              get claimingTaskKey() {
                return claimingTaskKey();
              },
              onClaim: receiveDiceTaskReward
            });
          }
        }), null);
        libs.insert(_el$74, libs.createComponent(EOM_Countdown.EOM_Countdown, {
          icon: true,
          text: "#ActivityDice_TimeLimit",
          get endTime() {
            return activityData().data_end_time;
          }
        }));
        libs.insert(_el$70, libs.createComponent(libs.Show, {
          when: isActivityEnded,
          get children() {
            const _el$75 = libs.createElement("Label", {
              "class": "DiceRoundRewardEndText",
              get text() {
                return GetLocalization("#ActivityDice_CPMini_EndTitle");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$75, "text", GetLocalization("#ActivityDice_CPMini_EndTitle"), _$p));
            return _el$75;
          }
        }), null);
        libs.setProp(_el$91, "onactivate", () => setRoundRewardsOpen(true));
        libs.insert(_el$91, libs.createComponent(libs.Show, {
          get when() {
            return milestonePreviewReward();
          },
          children: reward => [libs.createComponent(StoreItem.StoreItemImage, {
            get itemid() {
              return Number(reward()[0]);
            }
          }), (() => {
            const _el$158 = libs.createElement("Label", {
              "class": "DiceRoundRewardItemAmount",
              get text() {
                return reward()[1];
              },
              hittest: false
            }, null);
            libs.effect(_$p => libs.setProp(_el$158, "text", reward()[1], _$p));
            return _el$158;
          })()]
        }), _el$94);
        libs.effect(_p$ => {
          const _v$14 = logoLang(),
            _v$15 = logoLang(),
            _v$16 = ruleTooltip(),
            _v$17 = GetLocalization("#ActivityDice_CPMini_Title"),
            _v$18 = GetLocalization("#ActivityDice_CPMini_RoundTooltip"),
            _v$19 = GetLocalization("#ActivityDice_CPMini_RoundText"),
            _v$20 = `${milestoneProgress()}`,
            _v$21 = `/${progressMilestone()?.coin_num ?? 0}`,
            _v$22 = {
              width: milestoneProgressPercent() + "%"
            },
            _v$23 = `${milestoneProgress()}/${progressMilestone()?.coin_num ?? 0}`,
            _v$24 = {
              clip: `rect(0%, ${milestoneProgressPercent()}%, 100%, 0%)`
            },
            _v$25 = `${milestoneProgress()}/${progressMilestone()?.coin_num ?? 0}`,
            _v$26 = hasClaimableMilestone(),
            _v$27 = hasClaimableMilestone();
          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$60, "class", _v$14, _p$._v$14));
          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$61, "class", _v$15, _p$._v$15));
          _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$61, "customTooltip", _v$16, _p$._v$16));
          _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$72, "text", _v$17, _p$._v$17));
          _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$73, "tooltip_text", _v$18, _p$._v$18));
          _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$80, "text", _v$19, _p$._v$19));
          _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$82, "text", _v$20, _p$._v$20));
          _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$83, "text", _v$21, _p$._v$21));
          _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$86, "style", _v$22, _p$._v$22));
          _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$88, "text", _v$23, _p$._v$23));
          _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$89, "style", _v$24, _p$._v$24));
          _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$90, "text", _v$25, _p$._v$25));
          _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$92, "visible", _v$26, _p$._v$26));
          _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$94, "visible", _v$27, _p$._v$27));
          return _p$;
        }, {
          _v$14: undefined,
          _v$15: undefined,
          _v$16: undefined,
          _v$17: undefined,
          _v$18: undefined,
          _v$19: undefined,
          _v$20: undefined,
          _v$21: undefined,
          _v$22: undefined,
          _v$23: undefined,
          _v$24: undefined,
          _v$25: undefined,
          _v$26: undefined,
          _v$27: undefined
        });
        return _el$58;
      })(), (() => {
        const _el$95 = libs.createElement("Panel", {
            id: "DiceGameContainer"
          }, null),
          _el$96 = libs.createElement("Panel", {
            id: "DiceGameBoardLocation"
          }, _el$95);
          libs.createElement("Image", {
            id: "DiceGameBoardBG"
          }, _el$96);
          const _el$98 = libs.createElement("Panel", {
            id: "DiceGamePieceLayerRotated"
          }, _el$96),
          _el$99 = libs.createElement("Panel", {
            id: "DiceGamePieceGrid"
          }, _el$98),
          _el$100 = libs.createElement("Panel", {
            id: "DiceGamePlayerLayer",
            hittest: false,
            hittestchildren: false
          }, _el$98),
          _el$101 = libs.createElement("Panel", {
            id: "DiceEventLayer",
            "class": "DiceLayer",
            get style() {
              return {
                position: diceEventLayerPosition()
              };
            },
            hittest: false,
            hittestchildren: false
          }, _el$96);
          libs.createElement("Panel", {
            "class": "DiceLayerBG"
          }, _el$101);
          libs.createElement("Panel", {
            "class": "DiceLayerBorder"
          }, _el$101);
          const _el$104 = libs.createElement("Image", {
            id: "DiceEventHeadIcon",
            get ["class"]() {
              return libs.classNames({
                DiceEventGoodEvent: diceEventLayerType() == "good",
                DiceEventBadEvent: diceEventLayerType() == "bad"
              });
            }
          }, _el$101),
          _el$105 = libs.createElement("Panel", {
            "class": "DiceLayerContent"
          }, _el$101),
          _el$106 = libs.createElement("Panel", {
            "class": "DiceLayerTitleContent"
          }, _el$105),
          _el$107 = libs.createElement("Label", {
            "class": "DiceLayerTitleContentText",
            get text() {
              return diceEventLayerTitle();
            }
          }, _el$106),
          _el$108 = libs.createElement("Panel", {
            "class": "DiceLayerBodyContent"
          }, _el$105),
          _el$109 = libs.createElement("Label", {
            "class": "DiceLayerContentDesc",
            get text() {
              return diceEventLayerDescription();
            }
          }, _el$108),
          _el$110 = libs.createElement("Panel", {
            id: "DiceMultiRollPointLayer",
            "class": "DiceLayer",
            hittest: false,
            hittestchildren: false
          }, _el$96);
          libs.createElement("Panel", {
            "class": "DiceLayerBG"
          }, _el$110);
          libs.createElement("Panel", {
            "class": "DiceLayerBorder"
          }, _el$110);
          const _el$113 = libs.createElement("Panel", {
            "class": "DiceLayerContent"
          }, _el$110),
          _el$114 = libs.createElement("Panel", {
            "class": "DiceLayerTitleContent"
          }, _el$113),
          _el$115 = libs.createElement("Label", {
            "class": "DiceLayerTitleContentText",
            get text() {
              return GetLocalization("#ActivityDice_MultiRollPointTitle");
            }
          }, _el$114),
          _el$116 = libs.createElement("Panel", {
            "class": "DiceLayerBodyContent"
          }, _el$113),
          _el$117 = libs.createElement("Label", {
            id: "DiceMultiRollPointValue",
            "class": "DiceLayerContentDesc",
            get text() {
              return `${multiRollPointValue()}`;
            }
          }, _el$116),
          _el$118 = libs.createElement("Label", {
            id: "DiceMultiRollPointProgress",
            "class": "DiceLayerContentDesc",
            get text() {
              return `${multiRollCurrentIndex()}/${multiRollTotalCount()}`;
            }
          }, _el$116),
          _el$119 = libs.createElement("Panel", {
            id: "DiceMultiBoxPreviewLayer",
            "class": "DiceLayer",
            hittest: false,
            hittestchildren: true
          }, _el$96);
          libs.createElement("Panel", {
            "class": "DiceLayerBG"
          }, _el$119);
          libs.createElement("Panel", {
            "class": "DiceLayerBorder"
          }, _el$119);
          const _el$122 = libs.createElement("Panel", {
            "class": "DiceLayerContent"
          }, _el$119),
          _el$123 = libs.createElement("Panel", {
            "class": "DiceLayerTitleContent"
          }, _el$122),
          _el$124 = libs.createElement("Label", {
            "class": "DiceLayerTitleContentText",
            get text() {
              return GetLocalization("#ActivityDice_BoxRewardPreviewTitle");
            }
          }, _el$123),
          _el$125 = libs.createElement("Panel", {
            "class": "DiceLayerBodyContent"
          }, _el$122),
          _el$126 = libs.createElement("Label", {
            "class": "DiceLayerContentDesc",
            get text() {
              return GetLocalization("#ActivityDice_BoxRewardPreviewContent");
            }
          }, _el$125),
          _el$127 = libs.createElement("Panel", {
            "class": "DiceTaskReward"
          }, _el$125);
          libs.createElement("Image", {
            "class": "DiceTaskRewardBG"
          }, _el$127);
          const _el$129 = libs.createElement("Label", {
            "class": "DiceTaskRewardValue",
            get text() {
              return boxPreviewReward()?.amounts ?? 0;
            }
          }, _el$127),
          _el$130 = libs.createElement("Panel", {
            id: "DiceMultiRollSummaryLayer",
            "class": "DiceLayer",
            hittest: true,
            hittestchildren: true
          }, _el$96);
          libs.createElement("Panel", {
            "class": "DiceLayerBG"
          }, _el$130);
          libs.createElement("Panel", {
            "class": "DiceLayerBorder"
          }, _el$130);
          const _el$133 = libs.createElement("Panel", {
            "class": "DiceLayerContent"
          }, _el$130),
          _el$134 = libs.createElement("Panel", {
            "class": "DiceLayerTitleContent"
          }, _el$133),
          _el$135 = libs.createElement("Label", {
            "class": "DiceLayerTitleContentText",
            get text() {
              return GetLocalization("#ActivityDice_MultiRollSummaryTitle");
            }
          }, _el$134),
          _el$136 = libs.createElement("Panel", {
            "class": "DiceLayerBodyContent"
          }, _el$133),
          _el$137 = libs.createElement("Panel", {
            id: "DiceGameOperation"
          }, _el$95),
          _el$138 = libs.createElement("Panel", {
            id: "DiceGamePlayerEventContainer",
            get hittest() {
              return hasPlayerEvent();
            },
            get hittestchildren() {
              return hasPlayerEvent();
            }
          }, _el$137),
          _el$139 = libs.createElement("Label", {
            id: "DiceGamePlayerEventTitle",
            get text() {
              return GetLocalization("#ActivityDice_PlayerEventTitle");
            }
          }, _el$138),
          _el$140 = libs.createElement("Panel", {
            id: "DiceGamePlayerEventContent"
          }, _el$138),
          _el$141 = libs.createElement("Panel", {
            "class": "DiceGamePlayerEventItem"
          }, _el$140);
          libs.createElement("Image", {
            id: "DiceGamePlayerEventBG"
          }, _el$141);
          const _el$143 = libs.createElement("Panel", {
            "class": "DiceGamePlayerEventItemContent"
          }, _el$141),
          _el$144 = libs.createElement("Label", {
            "class": "DiceGamePlayerEventDesc",
            get text() {
              return GetLocalization("#ActivityDice_PlayerEvent_RewardNextSlot");
            }
          }, _el$143),
          _el$146 = libs.createElement("Panel", {
            id: "DiceGameRollButtonContainer"
          }, _el$137),
          _el$147 = libs.createElement("Panel", {
            id: "DiceGameCostInfo"
          }, _el$146);
          libs.createElement("Image", {
            id: "DiceGameCostInfoBG"
          }, _el$147);
          const _el$149 = libs.createElement("Panel", {
            id: "DiceGameCostInfoContent"
          }, _el$147),
          _el$150 = libs.createElement("Label", {
            id: "DiceGameCostValue",
            text: `x${DICE_ROLL_ONCE_TIMES}`
          }, _el$149);
        libs.insert(_el$99, libs.createComponent(libs.For, {
          each: DICE_BOARD_LAYOUT_ROWS,
          children: (row, index) => (() => {
            const _el$159 = libs.createElement("Panel", {
              get ["class"]() {
                return `DiceGamePieceRow DiceGamePieceRow_${index()}`;
              }
            }, null);
            libs.insert(_el$159, libs.createComponent(libs.For, {
              each: row,
              children: piece => {
                const tileConfig = () => piece.shouldRenderPiece ? tileConfigMap()[piece.slotID] ?? DEFAULT_TILE_CONFIG : DEFAULT_TILE_CONFIG;
                return (() => {
                  const _el$160 = libs.createElement("Panel", {
                    "class": "DiceGamePieceCell"
                  }, null);
                  libs.insert(_el$160, (() => {
                    const _c$ = libs.memo(() => !!piece.shouldRenderPiece);
                    return () => _c$() ? libs.createComponent(DiceGamePiece, {
                      get id() {
                        return piece.id;
                      },
                      get tileIndex() {
                        return piece.tileIndex;
                      },
                      get progress() {
                        return piece.progress;
                      },
                      get shouldRenderPiece() {
                        return piece.shouldRenderPiece;
                      },
                      get tileType() {
                        return tileConfig().tileType;
                      },
                      get decorationType() {
                        return tileConfig().decorationType ?? "none";
                      },
                      get iconType() {
                        return tileConfig().iconType ?? "none";
                      },
                      get finishEffectToken() {
                        return libs.memo(() => finishTileEffect()?.slotID == piece.slotID)() ? finishTileEffect()?.token : undefined;
                      },
                      get levelUpEffectToken() {
                        return levelUpTileEffectTokens()[piece.slotID];
                      }
                    }) : libs.createComponent(DiceGamePiecePlaceholder, {});
                  })());
                  libs.effect(_$p => libs.setProp(_el$160, "customTooltip", piece.shouldRenderPiece ? (() => {
                    const tooltipData = getDiceSlotTooltipData(dig_veins_logic.ACTIVITY_DICE_ID, piece.slotID, activitySlotData()[piece.slotID]);
                    if (tooltipData == undefined) {
                      return undefined;
                    }
                    const tooltipParams = {
                      ...tooltipData,
                      rewards: JSON.stringify(tooltipData.rewards),
                      next_rewards: JSON.stringify(tooltipData.next_rewards)
                    };
                    const definedTooltipParams = Object.entries(tooltipParams).reduce((params, [key, value]) => {
                      if (typeof value == "string" || typeof value == "number") {
                        params[key] = value;
                      }
                      return params;
                    }, {});
                    return {
                      name: "activity_dice",
                      ...definedTooltipParams
                    };
                  })() : undefined, _$p));
                  return _el$160;
                })();
              }
            }));
            libs.effect(_$p => libs.setProp(_el$159, "class", `DiceGamePieceRow DiceGamePieceRow_${index()}`, _$p));
            return _el$159;
          })()
        }));
        libs.insert(_el$100, libs.createComponent(DiceGamePlayerPiece, {
          get position() {
            return playerPiecePosition();
          },
          get moving() {
            return isPlayerMoving();
          },
          get positionTransitionEnabled() {
            return isPlayerMoveStepping();
          },
          get fastForward() {
            return isMultiRollPlaying();
          },
          get facingForward() {
            return isPlayerPieceFacingForward();
          },
          get IdleSequenceFrame() {
            return playerIdle.SequenceFrame;
          },
          get JumpSequenceFrame() {
            return playerJump.SequenceFrame;
          }
        }));
        libs.insert(_el$96, libs.createComponent(DiceGameDiceCube, {
          get visible() {
            return isDiceVisible();
          },
          get SequenceFrame() {
            return diceSequence.SequenceFrame;
          }
        }), _el$101);
        libs.insert(_el$127, libs.createComponent(StoreItem.StoreItemImage, {
          "class": "DiceTaskRewardIcon",
          get itemid() {
            return boxPreviewReward()?.item_id ?? 1800008;
          }
        }), _el$129);
        libs.insert(_el$136, libs.createComponent(libs.For, {
          get each() {
            return multiRollSummaryItems();
          },
          children: summaryText => (() => {
            const _el$161 = libs.createElement("Label", {
              "class": "DiceLayerContentDesc",
              text: summaryText
            }, null);
            libs.setProp(_el$161, "text", summaryText);
            return _el$161;
          })()
        }));
        libs.insert(_el$143, libs.createComponent(libs.Show, {
          get when() {
            return nextSlotExtraExp() > 1;
          },
          get children() {
            const _el$145 = libs.createElement("Label", {
              "class": "DiceGamePlayerEventValue",
              get text() {
                return `x${nextSlotExtraExp()}`;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$145, "text", `x${nextSlotExtraExp()}`, _$p));
            return _el$145;
          }
        }), null);
        libs.insert(_el$149, libs.createComponent(StoreItem.StoreItemImage, {
          get itemid() {
            return diceTicketID();
          },
          get src() {
            return STOREITEMIMAGE_SRCPATH[diceTicketID()];
          }
        }), _el$150);
        libs.setProp(_el$150, "text", `x${DICE_ROLL_ONCE_TIMES}`);
        libs.insert(_el$146, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "DiceGameRollButton",
          "class": "DiceGameActionButton",
          get enabled() {
            return canRollDice();
          },
          onactivate: () => requestRollDice(DICE_ROLL_ONCE_TIMES),
          get children() {
            return [libs.createElement("Image", {
              "class": "DiceGameActionButtonBG"
            }, null), libs.createElement("Label", {
              "class": "DiceGameActionButtonText",
              text: "#ActivityDice_RollAction"
            }, null)];
          }
        }), null);
        libs.insert(_el$137, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "DiceGameRollMiniButton",
          get enabled() {
            return !isRollBusy();
          },
          onactivate: () => requestRollDice(maxDiceRollTimes()),
          get children() {
            return [libs.createElement("Image", {
              "class": "DiceGameRollMiniButtonBG"
            }, null), (() => {
              const _el$154 = libs.createElement("Label", {
                "class": "DiceGameRollMiniButtonText",
                get text() {
                  return `x${diceRoll10ButtonTimes()}`;
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$154, "text", `x${diceRoll10ButtonTimes()}`, _$p));
              return _el$154;
            })()];
          }
        }), null);
        libs.insert(_el$137, libs.createComponent(libs.Show, {
          get when() {
            return isExecutingDiceEvents();
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_BaseButton, {
              id: "DiceGameSkipButton",
              "class": "DiceGameRollMiniButton",
              enabled: true,
              onactivate: skipDiceEvents,
              get children() {
                return [libs.createElement("Image", {
                  "class": "DiceGameRollMiniButtonBG"
                }, null), libs.createElement("Label", {
                  "class": "DiceGameRollMiniButtonText",
                  text: "#ActivityDice_SkipAction"
                }, null)];
              }
            });
          }
        }), null);
        libs.effect(_p$ => {
          const _v$28 = isDiceEventLayerVisible(),
            _v$29 = {
              position: diceEventLayerPosition()
            },
            _v$30 = libs.classNames({
              DiceEventGoodEvent: diceEventLayerType() == "good",
              DiceEventBadEvent: diceEventLayerType() == "bad"
            }),
            _v$31 = diceEventLayerTitle(),
            _v$32 = diceEventLayerDescription(),
            _v$33 = isMultiRollPointLayerVisible(),
            _v$34 = GetLocalization("#ActivityDice_MultiRollPointTitle"),
            _v$35 = `${multiRollPointValue()}`,
            _v$36 = `${multiRollCurrentIndex()}/${multiRollTotalCount()}`,
            _v$37 = isBoxPreviewLayerVisible(),
            _v$38 = GetLocalization("#ActivityDice_BoxRewardPreviewTitle"),
            _v$39 = GetLocalization("#ActivityDice_BoxRewardPreviewContent"),
            _v$40 = boxPreviewReward()?.amounts ?? 0,
            _v$41 = isMultiRollSummaryLayerVisible(),
            _v$42 = GetLocalization("#ActivityDice_MultiRollSummaryTitle"),
            _v$43 = {
              NoEvents: !hasPlayerEvent()
            },
            _v$44 = hasPlayerEvent(),
            _v$45 = hasPlayerEvent(),
            _v$46 = GetLocalization("#ActivityDice_PlayerEventTitle"),
            _v$47 = GetLocalization("#ActivityDice_PlayerEvent_RewardNextSlot"),
            _v$48 = {
              NotEnough: !hasEnoughDiceTicket(DICE_ROLL_ONCE_TIMES)
            };
          _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$101, "visible", _v$28, _p$._v$28));
          _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$101, "style", _v$29, _p$._v$29));
          _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$104, "class", _v$30, _p$._v$30));
          _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$107, "text", _v$31, _p$._v$31));
          _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$109, "text", _v$32, _p$._v$32));
          _v$33 !== _p$._v$33 && (_p$._v$33 = libs.setProp(_el$110, "visible", _v$33, _p$._v$33));
          _v$34 !== _p$._v$34 && (_p$._v$34 = libs.setProp(_el$115, "text", _v$34, _p$._v$34));
          _v$35 !== _p$._v$35 && (_p$._v$35 = libs.setProp(_el$117, "text", _v$35, _p$._v$35));
          _v$36 !== _p$._v$36 && (_p$._v$36 = libs.setProp(_el$118, "text", _v$36, _p$._v$36));
          _v$37 !== _p$._v$37 && (_p$._v$37 = libs.setProp(_el$119, "visible", _v$37, _p$._v$37));
          _v$38 !== _p$._v$38 && (_p$._v$38 = libs.setProp(_el$124, "text", _v$38, _p$._v$38));
          _v$39 !== _p$._v$39 && (_p$._v$39 = libs.setProp(_el$126, "text", _v$39, _p$._v$39));
          _v$40 !== _p$._v$40 && (_p$._v$40 = libs.setProp(_el$129, "text", _v$40, _p$._v$40));
          _v$41 !== _p$._v$41 && (_p$._v$41 = libs.setProp(_el$130, "visible", _v$41, _p$._v$41));
          _v$42 !== _p$._v$42 && (_p$._v$42 = libs.setProp(_el$135, "text", _v$42, _p$._v$42));
          _v$43 !== _p$._v$43 && (_p$._v$43 = libs.setProp(_el$138, "classList", _v$43, _p$._v$43));
          _v$44 !== _p$._v$44 && (_p$._v$44 = libs.setProp(_el$138, "hittest", _v$44, _p$._v$44));
          _v$45 !== _p$._v$45 && (_p$._v$45 = libs.setProp(_el$138, "hittestchildren", _v$45, _p$._v$45));
          _v$46 !== _p$._v$46 && (_p$._v$46 = libs.setProp(_el$139, "text", _v$46, _p$._v$46));
          _v$47 !== _p$._v$47 && (_p$._v$47 = libs.setProp(_el$144, "text", _v$47, _p$._v$47));
          _v$48 !== _p$._v$48 && (_p$._v$48 = libs.setProp(_el$150, "classList", _v$48, _p$._v$48));
          return _p$;
        }, {
          _v$28: undefined,
          _v$29: undefined,
          _v$30: undefined,
          _v$31: undefined,
          _v$32: undefined,
          _v$33: undefined,
          _v$34: undefined,
          _v$35: undefined,
          _v$36: undefined,
          _v$37: undefined,
          _v$38: undefined,
          _v$39: undefined,
          _v$40: undefined,
          _v$41: undefined,
          _v$42: undefined,
          _v$43: undefined,
          _v$44: undefined,
          _v$45: undefined,
          _v$46: undefined,
          _v$47: undefined,
          _v$48: undefined
        });
        return _el$95;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return roundRewardsOpen();
        },
        get children() {
          return libs.createComponent(DiceRoundRewardsWindow, {
            onClose: () => setRoundRewardsOpen(false),
            nodes: milestoneNodes,
            get progressValue() {
              return milestoneProgress();
            },
            get defaultNode() {
              return targetMilestone();
            },
            getNodeState: getMilestoneState,
            onClaim: receiveMilestoneReward
          });
        }
      })];
    }
  });
}

function getDiceStoreItems(infoProducts) {
  const result = [];
  const now = Date.now() / 1000;
  for (const itemname in KeyValues.info_shop_product) {
    const itemdata = KeyValues.info_shop_product[itemname];
    const info_product = infoProducts[itemdata.id];
    const effective_start_time = info_product ? info_product.start_time : itemdata.start_time;
    const effective_end_time = info_product ? info_product.end_time : itemdata.end_time;
    if ((effective_start_time < now || effective_start_time == 0) && (effective_end_time > now || effective_end_time == 0) && (itemdata.hide_time > now || !itemdata.hide_time) && itemdata.hide == 0 || itemdata.tag == "Privilege") {
      const tags = itemdata.tag.split("|");
      if (tags.includes("BoardSlotGift")) {
        result.push(itemdata);
      }
    }
  }
  result.sort((a, b) => b.orderby - a.orderby);
  return result;
}
function DiceGift() {
  const activityData = libs.createMemo(() => KeyValues.activity_data[dig_veins_logic.ACTIVITY_DICE_ID]);
  const infoProducts = solid_utils.createGlobalServiceNetData("info_products", {});
  const purchasedProduct = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const storeItems = libs.createMemo(() => getDiceStoreItems(infoProducts()));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "DiceGift",
    "class": "DiceStoreGift",
    shadow_border: true,
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "DiceGiftTitleTime",
            "class": "DiceStoreGiftTitleTime"
          }, null);
          libs.createElement("Image", {
            id: "DiceTopSubTitleBG",
            "class": "DiceStoreGiftTitleTimeBG"
          }, _el$);
          const _el$3 = libs.createElement("Panel", {
            "class": "DiceStoreGiftTitleTimeContent"
          }, _el$),
          _el$4 = libs.createElement("Image", {
            "class": "DiceStoreGiftTitleTooltipIcon"
          }, _el$3);
        libs.insert(_el$3, libs.createComponent(EOM_Countdown.EOM_Countdown, {
          icon: true,
          text: "#ActivityDice_DiceGift_TimeLimit",
          get endTime() {
            return activityData().end_time;
          }
        }), _el$4);
        libs.effect(_$p => libs.setProp(_el$4, "tooltip_text", GetLocalization("#ActivityDice_DiceGift_TimeTooltip"), _$p));
        return _el$;
      })(), (() => {
        const _el$5 = libs.createElement("Panel", {
          id: "DiceGiftList",
          "class": "VerticalScrollStyle DiceStoreGiftList",
          scroll: "y"
        }, null);
        libs.setProp(_el$5, "scroll", "y");
        libs.insert(_el$5, libs.createComponent(libs.Index, {
          get each() {
            return storeItems();
          },
          children: data => {
            return libs.createComponent(StoreItem.StoreItem, {
              get itemid() {
                return data().id;
              },
              get purchased_num() {
                return purchasedProduct()[data().id];
              },
              endTime: 0
            });
          }
        }));
        return _el$5;
      })()];
    }
  });
}

const MINE_GRID_COLUMNS = 8;
const MINE_GRID_VISIBLE_ROWS = 7;
const MINE_GRID_CELL_MARGIN = 3;
const MINE_GRID_CELL_SIZE = 94;
const MINE_GRID_COLUMN_STRIDE = MINE_GRID_CELL_SIZE + MINE_GRID_CELL_MARGIN * 2;
const MINE_GRID_ROW_STRIDE = 102;
const MINE_GRID_CELL_CENTER = MINE_GRID_CELL_MARGIN + MINE_GRID_CELL_SIZE * 0.5;
const MINE_GRID_SCROLL_ANIMATION_DURATION = 0.2;
const MINE_GRID_CELL_REMOVE_STAGE_DURATION = 0.8;
const MINE_GRID_TIMELINE_TICK_INTERVAL = 0.05;
const MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION = 0.05;
const MINE_GRID_DRILL_CELL_INTERVAL = 0.2;
const MINE_GRID_DRILL_EFFECT_TO_HIDE_DELAY = 0.2;
const MINE_GRID_DRILL_CELL_FADE_DURATION = 0.2;
const MINE_GRID_DRILL_FINISH_HOLD_DURATION = 0.4;
const DIG_VEINS_PICKAXE_PRESENTATION_DELAY = 0.32;
const DIG_VEINS_BOMB_PRESENTATION_DELAY = 0.4;
const DIG_VEINS_DRILL_PRESENTATION_DELAY = 0.08;
const DIG_VEINS_PICKAXE_FLOW_WAIT_DURATION = 0.4;
const DIG_VEINS_BOMB_FLOW_WAIT_DURATION = 0.4;
const DIG_VEINS_PICKAXE_EFFECT_DURATION = 1.2;
const DIG_VEINS_BOMB_EFFECT_DURATION = 1.2;
const DIG_VEINS_PICKAXE_SECOND_SOUND_DELAY = 0.88;
const DIG_VEINS_SOUND_EVENT_PICKAXE_FIRST = "UI.Wakuang.TieGao1";
const DIG_VEINS_SOUND_EVENT_PICKAXE_SECOND = "UI.Wakuang.TieGao2";
const DIG_VEINS_SOUND_EVENT_BOMB = "UI.Wakuang.ZhaDan1";
const DIG_VEINS_SOUND_EVENT_DRILL = "UI.Wakuang.DianZuan1";
const TOOL_CURSOR_ICON_SIZE = 64;
const DIG_VEINS_PICKAXE_PRODUCT_ID = 802307;
const DIG_VEINS_DRILL_PRODUCT_ID = 802308;
const DIG_VEINS_REWARD_TIP_VISIBLE_DURATION = 2;
const DIG_VEINS_REWARD_ITEM_IDS = ["190003", "190002", "190001"];
const openVeinsGift = () => {
  JumpToMenu({
    window_name: "activity",
    menu: "mining",
    menu2: "veins_gift",
    force: true
  });
};
const purchaseVeinsTool = productID => {
  ClientSideEvent("directly_purchase", {
    itemid: productID,
    source: "veins_game_tool_bar"
  });
};
const PICKAXE_SEQ_FRAMES = [getSrcPath("m4_mining/seq_pickaxe/01.png"), getSrcPath("m4_mining/seq_pickaxe/02.png"), getSrcPath("m4_mining/seq_pickaxe/03.png"), getSrcPath("m4_mining/seq_pickaxe/04.png"), getSrcPath("m4_mining/seq_pickaxe/05.png"), getSrcPath("m4_mining/seq_pickaxe/06.png"), getSrcPath("m4_mining/seq_pickaxe/07.png"), getSrcPath("m4_mining/seq_pickaxe/01.png"), getSrcPath("m4_mining/seq_pickaxe/02.png"), getSrcPath("m4_mining/seq_pickaxe/03.png"), getSrcPath("m4_mining/seq_pickaxe/04.png"), getSrcPath("m4_mining/seq_pickaxe/05.png"), getSrcPath("m4_mining/seq_pickaxe/06.png"), getSrcPath("m4_mining/seq_pickaxe/07.png"), getSrcPath("m4_mining/seq_pickaxe/08.png")];
const DRILL_SEQ_FRAMES = [getSrcPath("m4_mining/seq_drill/01.png"), getSrcPath("m4_mining/seq_drill/02.png"), getSrcPath("m4_mining/seq_drill/03.png"), getSrcPath("m4_mining/seq_drill/04.png"), getSrcPath("m4_mining/seq_drill/02.png"), getSrcPath("m4_mining/seq_drill/03.png"), getSrcPath("m4_mining/seq_drill/04.png"), getSrcPath("m4_mining/seq_drill/02.png"), getSrcPath("m4_mining/seq_drill/03.png"), getSrcPath("m4_mining/seq_drill/04.png"), getSrcPath("m4_mining/seq_drill/02.png"), getSrcPath("m4_mining/seq_drill/03.png"), getSrcPath("m4_mining/seq_drill/04.png"), getSrcPath("m4_mining/seq_drill/02.png"), getSrcPath("m4_mining/seq_drill/03.png"), getSrcPath("m4_mining/seq_drill/04.png"), getSrcPath("m4_mining/seq_drill/05.png"), getSrcPath("m4_mining/seq_drill/06.png"), getSrcPath("m4_mining/seq_drill/07.png"), getSrcPath("m4_mining/seq_drill/08.png")];
const BOMB_SEQ_FRAMES = [getSrcPath("m4_mining/seq_bomb/01.png"), getSrcPath("m4_mining/seq_bomb/02.png"), getSrcPath("m4_mining/seq_bomb/03.png"), getSrcPath("m4_mining/seq_bomb/04.png"), getSrcPath("m4_mining/seq_bomb/05.png"), getSrcPath("m4_mining/seq_bomb/06.png"), getSrcPath("m4_mining/seq_bomb/07.png"), getSrcPath("m4_mining/seq_bomb/08.png")];
const DIG_VEINS_SLOT_IMAGE = {
  "0": getSrcPath("m4_mining/m4_img_block_0.png"),
  "1": getSrcPath("m4_mining/m4_img_block_soil.png"),
  "2": getSrcPath("m4_mining/m4_img_block_blackstone.png"),
  "120001": getSrcPath("m4_mining/m4_img_block_iron.png"),
  "120002": getSrcPath("m4_mining/m4_img_block_copper.png"),
  "120003": getSrcPath("m4_mining/m4_img_block_silver.png"),
  "1800013": getSrcPath("m4_mining/m4_img_block_chest2.png"),
  "1800014": getSrcPath("m4_mining/m4_img_block_chest3.png"),
  "190001": getSrcPath("m4_mining/m4_img_block_chest6.png"),
  "190002": getSrcPath("m4_mining/m4_img_block_chest4.png"),
  "190003": getSrcPath("m4_mining/m4_img_block_chest5.png"),
  "default": getSrcPath("m4_mining/m4_img_block_soil2.png")
};
const DONOT_SHOW_TOOLTIP = {
  "0": true,
  "1": true,
  "2": true,
  "3": true
};
const SPECIAL_REWARDS = {
  "190001": true,
  "190002": true,
  "190003": true
};
const collectDigVeinsSpecialRewards = items => {
  const rewards = new Map();
  for (const item of items) {
    const itemID = String(item.item_id);
    if (SPECIAL_REWARDS[itemID] !== true) {
      continue;
    }
    const reward = rewards.get(itemID);
    if (reward != undefined) {
      reward.amounts += item.amounts;
    } else {
      rewards.set(itemID, {
        item_id: itemID,
        amounts: item.amounts
      });
    }
  }
  return Array.from(rewards.values()).filter(reward => reward.amounts > 0);
};
const DIG_VEINS_TOOL_OPERATE_TYPE = {
  Pickaxe: 1,
  Bomb: 2,
  Drill: 3
};
const getDigVeinsVisibleStartRow = depth => depth - MINE_GRID_VISIBLE_ROWS + 1;
const createEmptyDigVeinsMapRow = () => Array.from({
  length: MINE_GRID_COLUMNS
}, () => undefined);
const parseDigVeinsMap = (mapValue, startRow, endRow) => {
  const rows = {};
  for (let row = startRow; row <= endRow; row++) {
    rows[row] = createEmptyDigVeinsMapRow();
  }
  if (typeof mapValue != "string" || mapValue.length == 0) {
    return rows;
  }
  for (const rawRow of mapValue.split(";")) {
    const separatorIndex = rawRow.indexOf(":");
    if (separatorIndex < 0) {
      continue;
    }
    const depth = Number(rawRow.slice(0, separatorIndex));
    if (!Number.isInteger(depth) || depth < 0 || depth < startRow || depth > endRow) {
      continue;
    }
    const layout = rawRow.slice(separatorIndex + 1).split("|");
    rows[depth] = Array.from({
      length: MINE_GRID_COLUMNS
    }, (_, column) => {
      const [type, displayValue] = (layout[column] ?? "").split(":");
      return type == "" ? undefined : {
        type,
        displayValue
      };
    });
  }
  return rows;
};
const cloneDigVeinsMapRows = rows => {
  const clonedRows = {};
  for (const key of Object.keys(rows)) {
    const row = Number(key);
    const slots = rows[row];
    if (slots != undefined) {
      clonedRows[row] = slots.slice();
    }
  }
  return clonedRows;
};
const parseDigVeinsSnapshot = (data, startRow) => {
  if (data == undefined || !Number.isFinite(data.activity_id) || !Number.isInteger(data.depth) || data.depth < 0 || typeof data.map != "string") {
    return undefined;
  }
  const snapshotStartRow = startRow ?? getDigVeinsVisibleStartRow(data.depth);
  return {
    activityID: data.activity_id,
    depth: data.depth,
    rows: parseDigVeinsMap(data.map, snapshotStartRow, data.depth)
  };
};
const cloneDigVeinsSnapshot = snapshot => ({
  activityID: snapshot.activityID,
  depth: snapshot.depth,
  rows: cloneDigVeinsMapRows(snapshot.rows)
});
const getDigVeinsSnapshotWindow = (snapshot, startRow, endRow) => {
  const rows = {};
  for (let row = startRow; row <= endRow; row++) {
    rows[row] = snapshot.rows[row]?.slice() ?? createEmptyDigVeinsMapRow();
  }
  return {
    activityID: snapshot.activityID,
    depth: snapshot.depth,
    rows
  };
};
const getDigVeinsSnapshotDiff = (previous, next) => {
  const removedTiles = [];
  const addedTiles = [];
  const removedRows = [];
  const addedRows = [];
  const rowKeys = {};
  for (const key of Object.keys(previous.rows)) {
    rowKeys[Number(key)] = true;
  }
  for (const key of Object.keys(next.rows)) {
    rowKeys[Number(key)] = true;
  }
  const rows = Object.keys(rowKeys).map(Number).sort((a, b) => a - b);
  for (const row of rows) {
    const previousRow = previous.rows[row];
    const nextRow = next.rows[row];
    if (previousRow != undefined && nextRow == undefined) {
      removedRows.push(row);
    } else if (previousRow == undefined && nextRow != undefined) {
      addedRows.push(row);
    }
    for (let column = 0; column < MINE_GRID_COLUMNS; column++) {
      const previousType = previousRow?.[column];
      const nextType = nextRow?.[column];
      if (previousType?.type === nextType?.type) {
        continue;
      }
      const index = row * MINE_GRID_COLUMNS + column;
      if (previousType != undefined && previousType.type != "0") {
        removedTiles.push({
          index,
          ...previousType
        });
      }
      if (nextType != undefined) {
        addedTiles.push({
          index,
          ...nextType
        });
      }
    }
  }
  return {
    removedTiles,
    addedTiles,
    removedRows,
    addedRows
  };
};
const buildDigVeinsPickaxeTimeline = (context, previousSnapshot, targetSnapshot, diff) => {
  const events = [];
  let nextOrder = 0;
  let elapsed = DIG_VEINS_PICKAXE_PRESENTATION_DELAY;
  const push = (at, command) => {
    events.push({
      at,
      order: nextOrder++,
      command
    });
  };
  push(0, {
    type: "startToolSequenceFrame",
    state: {
      actionID: context.id,
      tool: context.tool,
      row: context.row,
      column: context.column
    }
  });
  push(elapsed, {
    type: "playSound",
    soundEvent: DIG_VEINS_SOUND_EVENT_PICKAXE_FIRST
  });
  push(elapsed, {
    type: "showToolEffect",
    effect: {
      id: `${context.id}|main`,
      actionID: context.id,
      tool: context.tool,
      row: context.row,
      column: context.column
    }
  });
  push(DIG_VEINS_PICKAXE_SECOND_SOUND_DELAY, {
    type: "playSound",
    soundEvent: DIG_VEINS_SOUND_EVENT_PICKAXE_SECOND
  });
  elapsed += DIG_VEINS_PICKAXE_FLOW_WAIT_DURATION;
  const hasRemovedTiles = diff.removedTiles.length > 0 || diff.removedRows.length > 0;
  const hasAddedTiles = diff.addedTiles.length > 0 || diff.addedRows.length > 0;
  if (hasRemovedTiles) {
    push(elapsed, {
      type: "startRemove",
      tiles: diff.removedTiles
    });
    elapsed += MINE_GRID_CELL_REMOVE_STAGE_DURATION;
    push(elapsed, {
      type: "commitRemove",
      tiles: diff.removedTiles,
      rows: diff.removedRows
    });
  }
  if (hasAddedTiles) {
    push(elapsed, {
      type: "applyAdd",
      tiles: diff.addedTiles,
      rows: diff.addedRows
    });
  }
  if (previousSnapshot.depth !== targetSnapshot.depth) {
    if (hasRemovedTiles || hasAddedTiles) {
      elapsed += MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
      push(elapsed, {
        type: "enableTransition"
      });
    }
    push(elapsed, {
      type: "startScroll",
      fromDepth: previousSnapshot.depth,
      toDepth: targetSnapshot.depth
    });
    elapsed += MINE_GRID_SCROLL_ANIMATION_DURATION;
    push(elapsed, {
      type: "finishScroll"
    });
  }
  push(elapsed, {
    type: "calibrate"
  });
  elapsed += MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
  push(elapsed, {
    type: "enableTransition"
  });
  push(elapsed, {
    type: "finishFlow"
  });
  const toolEffectEndTime = DIG_VEINS_PICKAXE_PRESENTATION_DELAY + DIG_VEINS_PICKAXE_EFFECT_DURATION;
  push(toolEffectEndTime, {
    type: "hideToolEffects",
    actionID: context.id
  });
  events.sort((a, b) => a.at - b.at || a.order - b.order);
  return {
    context,
    events,
    duration: Math.max(elapsed, toolEffectEndTime),
    targetSnapshot: cloneDigVeinsSnapshot(targetSnapshot),
    stableTargetSnapshot: getDigVeinsSnapshotWindow(targetSnapshot, getDigVeinsVisibleStartRow(targetSnapshot.depth), targetSnapshot.depth)
  };
};
const buildDigVeinsBombTimeline = (context, previousSnapshot, targetSnapshot, diff) => {
  const events = [];
  let nextOrder = 0;
  let elapsed = DIG_VEINS_BOMB_PRESENTATION_DELAY;
  const push = (at, command) => {
    events.push({
      at,
      order: nextOrder++,
      command
    });
  };
  push(0, {
    type: "startToolSequenceFrame",
    state: {
      actionID: context.id,
      tool: context.tool,
      row: context.row,
      column: context.column
    }
  });
  push(elapsed, {
    type: "playSound",
    soundEvent: DIG_VEINS_SOUND_EVENT_BOMB
  });
  push(elapsed, {
    type: "showToolEffect",
    effect: {
      id: `${context.id}|main`,
      actionID: context.id,
      tool: context.tool,
      row: context.row,
      column: context.column
    }
  });
  elapsed += DIG_VEINS_BOMB_FLOW_WAIT_DURATION;
  const hasRemovedTiles = diff.removedTiles.length > 0 || diff.removedRows.length > 0;
  const hasAddedTiles = diff.addedTiles.length > 0 || diff.addedRows.length > 0;
  if (hasRemovedTiles) {
    push(elapsed, {
      type: "startRemove",
      tiles: diff.removedTiles
    });
    elapsed += MINE_GRID_CELL_REMOVE_STAGE_DURATION;
    push(elapsed, {
      type: "commitRemove",
      tiles: diff.removedTiles,
      rows: diff.removedRows
    });
  }
  if (hasAddedTiles) {
    push(elapsed, {
      type: "applyAdd",
      tiles: diff.addedTiles,
      rows: diff.addedRows
    });
  }
  if (previousSnapshot.depth !== targetSnapshot.depth) {
    if (hasRemovedTiles || hasAddedTiles) {
      elapsed += MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
      push(elapsed, {
        type: "enableTransition"
      });
    }
    push(elapsed, {
      type: "startScroll",
      fromDepth: previousSnapshot.depth,
      toDepth: targetSnapshot.depth
    });
    elapsed += MINE_GRID_SCROLL_ANIMATION_DURATION;
    push(elapsed, {
      type: "finishScroll"
    });
  }
  push(elapsed, {
    type: "calibrate"
  });
  elapsed += MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
  push(elapsed, {
    type: "enableTransition"
  });
  push(elapsed, {
    type: "finishFlow"
  });
  const toolEffectEndTime = DIG_VEINS_BOMB_PRESENTATION_DELAY + DIG_VEINS_BOMB_EFFECT_DURATION;
  push(toolEffectEndTime, {
    type: "hideToolEffects",
    actionID: context.id
  });
  events.sort((a, b) => a.at - b.at || a.order - b.order);
  return {
    context,
    events,
    duration: Math.max(elapsed, toolEffectEndTime),
    targetSnapshot: cloneDigVeinsSnapshot(targetSnapshot),
    stableTargetSnapshot: getDigVeinsSnapshotWindow(targetSnapshot, getDigVeinsVisibleStartRow(targetSnapshot.depth), targetSnapshot.depth)
  };
};
const buildDigVeinsDrillTimeline = (context, previousSnapshot, targetSnapshot, diff) => {
  const events = [];
  let nextOrder = 0;
  let elapsed = 0;
  const push = (at, command) => {
    events.push({
      at,
      order: nextOrder++,
      command
    });
  };
  const visibleStartRow = previousSnapshot.depth - MINE_GRID_VISIBLE_ROWS + 1;
  push(0, {
    type: "startToolSequenceFrame",
    state: {
      actionID: context.id,
      tool: context.tool,
      row: visibleStartRow,
      column: context.column
    }
  });
  push(0, {
    type: "playSound",
    soundEvent: DIG_VEINS_SOUND_EVENT_DRILL
  });
  const drillTiles = diff.removedTiles.filter(tile => {
    const row = Math.floor(tile.index / MINE_GRID_COLUMNS);
    const column = tile.index % MINE_GRID_COLUMNS;
    return column === context.column && row >= visibleStartRow && row <= previousSnapshot.depth;
  }).sort((a, b) => a.index - b.index);
  const drillTileIndexes = {};
  for (const tile of drillTiles) {
    drillTileIndexes[tile.index] = true;
  }
  const otherRemovedTiles = diff.removedTiles.filter(tile => drillTileIndexes[tile.index] !== true);
  const hasRemovedTiles = diff.removedTiles.length > 0 || diff.removedRows.length > 0;
  const hasAddedTiles = diff.addedTiles.length > 0 || diff.addedRows.length > 0;
  if (drillTiles.length > 0) {
    const firstRow = Math.floor(drillTiles[0].index / MINE_GRID_COLUMNS);
    let lastHideAt = DIG_VEINS_DRILL_PRESENTATION_DELAY;
    for (const tile of drillTiles) {
      const row = Math.floor(tile.index / MINE_GRID_COLUMNS);
      const effectAt = DIG_VEINS_DRILL_PRESENTATION_DELAY + (row - firstRow) * MINE_GRID_DRILL_CELL_INTERVAL;
      const hideAt = effectAt + MINE_GRID_DRILL_EFFECT_TO_HIDE_DELAY;
      push(effectAt, {
        type: "moveToolSequenceFrame",
        actionID: context.id,
        row,
        column: context.column
      });
      push(effectAt, {
        type: "showToolEffect",
        effect: {
          id: `${context.id}|drill|${tile.index}`,
          actionID: context.id,
          tool: context.tool,
          row,
          column: context.column
        }
      });
      push(hideAt, {
        type: "startRemove",
        tiles: [tile]
      });
      lastHideAt = hideAt;
    }
    if (otherRemovedTiles.length > 0) {
      push(DIG_VEINS_DRILL_PRESENTATION_DELAY + MINE_GRID_DRILL_EFFECT_TO_HIDE_DELAY, {
        type: "startRemove",
        tiles: otherRemovedTiles
      });
    }
    elapsed = lastHideAt + MINE_GRID_DRILL_CELL_FADE_DURATION + MINE_GRID_DRILL_FINISH_HOLD_DURATION;
  } else if (hasRemovedTiles) {
    if (otherRemovedTiles.length > 0) {
      push(DIG_VEINS_DRILL_PRESENTATION_DELAY, {
        type: "startRemove",
        tiles: otherRemovedTiles
      });
    }
    elapsed = DIG_VEINS_DRILL_PRESENTATION_DELAY + MINE_GRID_DRILL_CELL_FADE_DURATION;
  } else {
    elapsed = DIG_VEINS_DRILL_PRESENTATION_DELAY;
  }
  if (hasRemovedTiles) {
    push(elapsed, {
      type: "hideToolEffects",
      actionID: context.id
    });
    push(elapsed, {
      type: "commitRemove",
      tiles: diff.removedTiles,
      rows: diff.removedRows
    });
  }
  if (hasAddedTiles) {
    push(elapsed, {
      type: "applyAdd",
      tiles: diff.addedTiles,
      rows: diff.addedRows
    });
  }
  if (previousSnapshot.depth !== targetSnapshot.depth) {
    if (hasRemovedTiles || hasAddedTiles) {
      elapsed += MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
      push(elapsed, {
        type: "enableTransition"
      });
    }
    push(elapsed, {
      type: "startScroll",
      fromDepth: previousSnapshot.depth,
      toDepth: targetSnapshot.depth
    });
    elapsed += MINE_GRID_SCROLL_ANIMATION_DURATION;
    push(elapsed, {
      type: "finishScroll"
    });
  }
  push(elapsed, {
    type: "calibrate"
  });
  elapsed += MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
  push(elapsed, {
    type: "enableTransition"
  });
  push(elapsed, {
    type: "finishFlow"
  });
  events.sort((a, b) => a.at - b.at || a.order - b.order);
  return {
    context,
    events,
    duration: elapsed,
    targetSnapshot: cloneDigVeinsSnapshot(targetSnapshot),
    stableTargetSnapshot: getDigVeinsSnapshotWindow(targetSnapshot, getDigVeinsVisibleStartRow(targetSnapshot.depth), targetSnapshot.depth)
  };
};
const DIG_VEINS_TOOL_TIMELINE_BUILDERS = {
  Pickaxe: buildDigVeinsPickaxeTimeline,
  Bomb: buildDigVeinsBombTimeline,
  Drill: buildDigVeinsDrillTimeline
};
const insertDigVeinsRewardTipTimelineEvent = (plan, rewards) => {
  if (rewards.length == 0) {
    return;
  }
  let insertIndex = plan.events.findIndex(event => event.command.type == "startScroll");
  if (insertIndex < 0) {
    insertIndex = plan.events.findIndex(event => event.command.type == "calibrate");
  }
  if (insertIndex < 0) {
    insertIndex = plan.events.findIndex(event => event.command.type == "finishFlow");
  }
  const at = insertIndex < 0 ? plan.duration : plan.events[insertIndex].at;
  if (insertIndex < 0) {
    insertIndex = plan.events.length;
  }
  plan.events.splice(insertIndex, 0, {
    at,
    order: 0,
    command: {
      type: "showRewardTip",
      rewards
    }
  });
  plan.events.forEach((event, index) => event.order = index);
};
const buildDigVeinsMineGridLayout = (rows, depth) => {
  const backendRows = Object.keys(rows).map(Number).filter(Number.isInteger).sort((a, b) => a - b);
  const visibleStartRow = depth - MINE_GRID_VISIBLE_ROWS + 1;
  const startRow = Math.min(visibleStartRow, backendRows[0] ?? depth);
  const endRow = Math.max(depth, backendRows[backendRows.length - 1] ?? depth);
  const slots = [];
  const layoutRows = [];
  for (let row = startRow; row <= endRow; row++) {
    const cells = [];
    for (let column = 0; column < MINE_GRID_COLUMNS; column++) {
      const slot = {
        index: row * MINE_GRID_COLUMNS + column,
        ...rows[row]?.[column]
      };
      slots.push(slot);
      cells.push(slot);
    }
    layoutRows.push({
      row,
      cells
    });
  }
  return {
    startRow,
    endRow,
    rows: layoutRows,
    slots
  };
};
function DigVeinsMineGridCell(prop) {
  const isDisabled = () => prop.disabled === true;
  const slotType = () => prop.type ?? "0";
  const slotImage = () => DIG_VEINS_SLOT_IMAGE[slotType()];
  const tooltip = () => {
    if (DONOT_SHOW_TOOLTIP[slotType()] || prop.displayValue == undefined || prop.displayValue == "") {
      return undefined;
    }
    return {
      name: "activity_veins",
      item_id: slotType(),
      displayValue: prop.displayValue
    };
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("DigVeinsMineGridCellContainer", prop.class);
        }
      }, null);
      libs.createElement("Image", {
        "class": "DigVeinsSlotBG"
      }, _el$);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return SPECIAL_REWARDS[slotType()] === true;
      },
      get children() {
        const _el$3 = libs.createElement("DOTAParticleScenePanel", {
          "class": "DigVeinsSpecialRewardBorder",
          particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
          cameraOrigin: "0 0 90",
          fov: 45,
          lookAt: "0 0 0",
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "classList", {
          FadingOut: prop.fadingOut === true
        }, _$p));
        return _el$3;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get ["class"]() {
        return libs.classNames("DigVeinsMineGridCell", prop.class, {
          Disabled: isDisabled(),
          FadingOut: prop.fadingOut === true
        });
      },
      get enabled() {
        return !isDisabled();
      },
      onmouseover: () => {
        if (isDisabled()) {
          return;
        }
        prop.oncellmouseover?.(prop.index);
      },
      onmouseout: () => {
        if (isDisabled()) {
          return;
        }
        prop.oncellmouseout?.(prop.index);
      },
      onactivate: () => {
        if (isDisabled()) {
          return;
        }
        const tool = prop.tool;
        if (tool == undefined) {
          return;
        }
        prop.oncellactivate?.(prop.index, tool);
      },
      get children() {
        return [(() => {
          const _el$4 = libs.createElement("Image", {
            "class": "DigVeinsSlotDisplay",
            get src() {
              return slotImage() ?? DIG_VEINS_SLOT_IMAGE.default;
            },
            hittest: false
          }, null);
          libs.effect(_$p => libs.setProp(_el$4, "src", slotImage() ?? DIG_VEINS_SLOT_IMAGE.default, _$p));
          return _el$4;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return slotImage() == undefined;
          },
          get children() {
            return libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return slotType();
              },
              hideTips: true,
              hittest: false
            });
          }
        }), libs.createElement("Panel", {
          "class": "DigVeinsMineGridCellHover",
          hittest: false
        }, null), libs.createElement("Panel", {
          "class": "DigVeinsMineGridCellSelected",
          hittest: false
        }, null), libs.createElement("Panel", {
          "class": "DigVeinsMineGridCellDisabled",
          hittest: false
        }, null)];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames("DigVeinsMineGridCellContainer", prop.class),
        _v$2 = tooltip();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "customTooltip", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}
function DigVeinsToolRangePreview(prop) {
  const visible = () => prop.tool != undefined && prop.tool !== "Pickaxe" && prop.cellIndex != undefined;
  const previewX = libs.createMemo(() => {
    const cellIndex = prop.cellIndex;
    if (cellIndex == undefined) {
      return 0;
    }
    return cellIndex % MINE_GRID_COLUMNS * MINE_GRID_COLUMN_STRIDE + MINE_GRID_CELL_MARGIN;
  });
  const previewY = libs.createMemo(() => {
    const cellIndex = prop.cellIndex;
    if (cellIndex == undefined) {
      return 0;
    }
    if (prop.tool === "Drill") {
      return MINE_GRID_CELL_MARGIN;
    }
    const row = Math.floor(cellIndex / MINE_GRID_COLUMNS);
    return (row - prop.visibleStartRow) * MINE_GRID_ROW_STRIDE + MINE_GRID_CELL_MARGIN;
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return visible();
    },
    get children() {
      const _el$8 = libs.createElement("Panel", {
          id: "DigVeinsToolRangePreviewLayer",
          hittest: false,
          hittestchildren: false
        }, null),
        _el$9 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("DigVeinsToolRangePreview", prop.tool);
          },
          get style() {
            return {
              x: `${previewX()}px`,
              y: `${previewY()}px`
            };
          },
          hittest: false,
          hittestchildren: false
        }, _el$8),
        _el$0 = libs.createElement("Panel", {
          "class": "DigVeinsToolRangePreviewContent",
          hittest: false,
          hittestchildren: false
        }, _el$9);
        libs.createElement("Image", {
          "class": "DigVeinsToolRangeMask",
          hittest: false
        }, _el$0);
      libs.insert(_el$0, libs.createComponent(libs.Show, {
        get when() {
          return prop.tool === "Bomb";
        },
        get children() {
          return [libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow TopLeft",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow Top",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow TopRight",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow Left",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow Right",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow BottomLeft",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow Bottom",
            hittest: false
          }, null), libs.createElement("Image", {
            "class": "DigVeinsToolRangeArrow BottomRight",
            hittest: false
          }, null)];
        }
      }), null);
      libs.effect(_p$ => {
        const _v$3 = libs.classNames("DigVeinsToolRangePreview", prop.tool),
          _v$4 = {
            x: `${previewX()}px`,
            y: `${previewY()}px`
          };
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "class", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "style", _v$4, _p$._v$4));
        return _p$;
      }, {
        _v$3: undefined,
        _v$4: undefined
      });
      return _el$8;
    }
  });
}
const getDigVeinsTaskSortWeight = task => {
  switch (dig_veins_logic.getDigVeinsTaskState(task)) {
    case "Claimable":
      return 0;
    case "InProgress":
      return 1;
    case "Received":
      return 2;
  }
};
const getDigVeinsTaskKey = task => `${task.task_id}_${task.extra_id}`;
function DigVeinsTaskItem(props) {
  const taskConfig = libs.createMemo(() => KeyValues.task[props.task.task_id]);
  const rewards = libs.createMemo(() => Object.entries(taskConfig()?.rewards ?? {}).slice(0, 2));
  const taskState = libs.createMemo(() => dig_veins_logic.getDigVeinsTaskState(props.task));
  const taskDescription = libs.createMemo(() => {
    const config = taskConfig();
    if (config == undefined) {
      return "";
    }
    return LocalizeWithVars(`#Task_Desc_${props.task.task_id}`, {
      target: GetLocalization(String(config.target)),
      v1: GetLocalization(String(config.param_1)),
      v2: GetLocalization(String(config.param_2)),
      v3: GetLocalization(String(config.param_3))
    });
  });
  return (() => {
    const _el$18 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("DigVeinsTaskTaskItem", taskState(), {
            Claiming: props.claiming
          });
        }
      }, null),
      _el$19 = libs.createElement("Panel", {
        "class": "DigVeinsTaskItemMain"
      }, _el$18),
      _el$20 = libs.createElement("Panel", {
        "class": "DigVeinsTaskItemContent"
      }, _el$19),
      _el$21 = libs.createElement("Panel", {
        "class": "DigVeinsTaskTitle"
      }, _el$20),
      _el$22 = libs.createElement("Label", {
        "class": "DigVeinsTaskTitleText",
        get text() {
          return GetLocalization(`#Task_Name_${props.task.task_id}`);
        }
      }, _el$21),
      _el$23 = libs.createElement("Label", {
        "class": "DigVeinsTaskTitleValue",
        get text() {
          return `(${Math.min(props.task.progress, props.task.target)}/${props.task.target})`;
        }
      }, _el$21),
      _el$24 = libs.createElement("Label", {
        "class": "DigVeinsTaskItemDescription",
        get text() {
          return taskDescription();
        }
      }, _el$20),
      _el$25 = libs.createElement("Panel", {
        "class": "DigVeinsTaskItemRewardList"
      }, _el$19);
      libs.createElement("Image", {
        "class": "DigVeinsTaskItemBottomLine"
      }, _el$18);
    libs.setProp(_el$18, "onactivate", () => {
      if (!dig_veins_logic.isDigVeinsTaskClaimable(props.task) || props.claiming) {
        return;
      }
      props.onClaim(props.task);
    });
    libs.insert(_el$25, libs.createComponent(libs.For, {
      get each() {
        return rewards();
      },
      children: reward => (() => {
        const _el$28 = libs.createElement("Panel", {
          "class": "DigVeinsTaskItemReward"
        }, null);
        libs.insert(_el$28, libs.createComponent(StoreItem.StoreItemBlock, {
          get item_id() {
            return reward[0];
          },
          get amounts() {
            return reward[1];
          }
        }), null);
        libs.insert(_el$28, libs.createComponent(libs.Show, {
          get when() {
            return taskState() == "Received";
          },
          get children() {
            return libs.createElement("Image", {
              "class": "DigVeinsTaskItemRewardReceivedIcon"
            }, null);
          }
        }), null);
        return _el$28;
      })()
    }));
    libs.insert(_el$18, libs.createComponent(libs.Show, {
      get when() {
        return taskState() == "Claimable";
      },
      get children() {
        return libs.createElement("Image", {
          "class": "DigVeinsTaskDoneBorder",
          hittest: false
        }, null);
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames("DigVeinsTaskTaskItem", taskState(), {
          Claiming: props.claiming
        }),
        _v$6 = GetLocalization(`#Task_Name_${props.task.task_id}`),
        _v$7 = `(${Math.min(props.task.progress, props.task.target)}/${props.task.target})`,
        _v$8 = taskDescription();
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$22, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$23, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$24, "text", _v$8, _p$._v$8));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined
    });
    return _el$18;
  })();
}
function DigVeins() {
  const playerMiningActivityData = solid_utils.createServiceNetData("player_mining_activity_data", {});
  const playerActivityTasks = solid_utils.createServiceNetData("player_activity_tasks", {});
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const getRewardCount = itemID => {
    return playerCounters()[`mining_box_count_${dig_veins_logic.ACTIVITY_MINING_ID}_${itemID}`]?.count ?? 0;
  };
  const totalRewardCount = libs.createMemo(() => {
    return DIG_VEINS_REWARD_ITEM_IDS.reduce((total, itemID) => total + getRewardCount(itemID), 0);
  });
  const maxRewardCount = libs.createMemo(() => {
    const config = Object.values(KeyValues.activity_mining).find(entry => entry.activity_id == dig_veins_logic.ACTIVITY_MINING_ID);
    return Number(config?.box_max_num.split("|")[0] ?? 0);
  });
  const [selectedTaskType, setSelectedTaskType] = libs.createSignal(7);
  let taskScrollPanel;
  const selectTaskType = taskType => {
    if (selectedTaskType() == taskType) {
      return;
    }
    setSelectedTaskType(taskType);
    taskScrollPanel?.ScrollToTop();
    console.log("[DigVeins] Task tab switched");
  };
  const miningActivityData = libs.createMemo(() => playerMiningActivityData()?.[dig_veins_logic.ACTIVITY_MINING_ID]);
  const [taskRefreshRevision, setTaskRefreshRevision] = libs.createSignal(0);
  const taskSnapshot = libs.createMemo(() => {
    taskRefreshRevision();
    return {
      tasks: playerActivityTasks(),
      timestamp: Math.floor(CustomUIConfig.GetServerTimeStamp())
    };
  });
  libs.createEffect(() => {
    const snapshot = taskSnapshot();
    mining_activity_redpoints.refreshMiningActivityRedPoint(snapshot.tasks, snapshot.timestamp);
    console.log("[DigVeins] Task list and red point refreshed");
  });
  const digVeinsTasksByType = libs.createMemo(() => {
    const snapshot = taskSnapshot();
    const taskGroups = {
      6: [],
      7: []
    };
    Object.values(snapshot.tasks).forEach(task => {
      if (!dig_veins_logic.isDigVeinsTask(task) || !dig_veins_logic.isDigVeinsTaskActive(task, snapshot.timestamp)) {
        return;
      }
      const taskType = KeyValues.task[task.task_id].type;
      taskGroups[taskType].push(task);
    });
    taskGroups[6].sort((a, b) => getDigVeinsTaskSortWeight(a) - getDigVeinsTaskSortWeight(b) || a.index - b.index || a.task_id - b.task_id);
    taskGroups[7].sort((a, b) => getDigVeinsTaskSortWeight(a) - getDigVeinsTaskSortWeight(b) || a.index - b.index || a.task_id - b.task_id);
    return taskGroups;
  });
  const activityData = libs.createMemo(() => KeyValues.activity_data[dig_veins_logic.ACTIVITY_MINING_ID]);
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const [claimingTaskKey, setClaimingTaskKey] = libs.createSignal();
  const receiveTaskReward = task => {
    const timestamp = Math.floor(CustomUIConfig.GetServerTimeStamp());
    if (!dig_veins_logic.isDigVeinsTaskActive(task, timestamp)) {
      setTaskRefreshRevision(revision => revision + 1);
      console.log("[DigVeins] Expired task claim skipped; task snapshot refreshed");
      return;
    }
    if (!dig_veins_logic.isDigVeinsTaskClaimable(task) || claimingTaskKey() != undefined) {
      return;
    }
    setClaimingTaskKey(getDigVeinsTaskKey(task));
    console.log("[DigVeins] Task reward requested");
    CallActionRequest("/v1/task/receive_rewards", {
      task_id: task.task_id,
      extra_id: task.extra_id
    }, () => {
      setClaimingTaskKey(undefined);
    }, () => {
      setClaimingTaskKey(undefined);
    });
  };
  const miningConfig = libs.createMemo(() => {
    const activityID = miningActivityData()?.activity_id;
    if (!Number.isFinite(activityID)) {
      return undefined;
    }
    return Object.values(KeyValues.activity_mining ?? {}).find(config => config.activity_id == activityID);
  });
  const getToolItemName = itemID => {
    return itemID == undefined ? "" : GetLocalization(`#${itemID}`);
  };
  const getPlayerTokenAmount = itemID => {
    if (itemID == undefined || itemID <= 0) {
      return 0;
    }
    return playerTokens()[String(itemID)]?.amounts ?? 0;
  };
  const bombAmount = libs.createMemo(() => getPlayerTokenAmount(miningConfig()?.explosive_id));
  const pickaxeAmount = libs.createMemo(() => getPlayerTokenAmount(miningConfig()?.pickaxe_id));
  const drillAmount = libs.createMemo(() => getPlayerTokenAmount(miningConfig()?.bit_id));
  const getToolAmount = tool => {
    switch (tool) {
      case "Bomb":
        return bombAmount();
      case "Pickaxe":
        return pickaxeAmount();
      case "Drill":
        return drillAmount();
    }
  };
  const logoLang = libs.createMemo(() => {
    const lang = Language();
    if (lang == "schinese") {
      return "Language_schinese";
    } else if (lang == "russian") {
      return "Language_russian";
    } else {
      return "Language_english";
    }
  });
  const ruleTooltip = libs.createMemo(() => ({
    name: Language() == "schinese" ? "text" : "activity_veins_rule",
    text: "#ActivityVeins_RuleTooltip"
  }));
  const pickaxeSequence = createSequenceFrame({
    frames: PICKAXE_SEQ_FRAMES,
    interval: 60,
    isLoop: false,
    autoPlay: false
  });
  const bombSequence = createSequenceFrame({
    frames: BOMB_SEQ_FRAMES,
    interval: 80,
    isLoop: false,
    autoPlay: false
  });
  const drillSequence = createSequenceFrame({
    frames: DRILL_SEQ_FRAMES,
    interval: 80,
    isLoop: false,
    autoPlay: false
  });
  const PickaxeSequenceFrame = pickaxeSequence.SequenceFrame;
  const BombSequenceFrame = bombSequence.SequenceFrame;
  const DrillSequenceFrame = drillSequence.SequenceFrame;
  const [equippedTool, setEquippedTool] = libs.createSignal("Pickaxe");
  const [hoveredCellIndex, setHoveredCellIndex] = libs.createSignal();
  const [mineGridBottomRow, setMineGridBottomRow] = libs.createSignal(0);
  const displayDepth = libs.createMemo(() => dig_veins_logic.getDigVeinsDisplayDepth(mineGridBottomRow()));
  const depthPartToken = libs.createMemo(() => {
    if (displayDepth() < 360) {
      return "#ActivityVeins_DepthTitle_Part1";
    }
    if (displayDepth() < 720) {
      return "#ActivityVeins_DepthTitle_Part2";
    }
    return "#ActivityVeins_DepthTitle_Part3";
  });
  const [mineGridRowKeys, setMineGridRowKeys] = libs.createSignal([]);
  const [mineGridRowCellKeys, setMineGridRowCellKeys] = libs.createStore({});
  const [mineGridScrollOffset, setMineGridScrollOffset] = libs.createSignal(0);
  const [mineGridTransitionDisabled, setMineGridTransitionDisabled] = libs.createSignal(true);
  const [isMiningRequesting, setIsMiningRequesting] = libs.createSignal(false);
  const [isMineGridAnimating, setIsMineGridAnimating] = libs.createSignal(false);
  const [isMineGridScrolling, setIsMineGridScrolling] = libs.createSignal(false);
  const [isRewardTipVisible, setIsRewardTipVisible] = libs.createSignal(false);
  const [isRewardFinishVisible, setIsRewardFinishVisible] = libs.createSignal(false);
  const [rewardFinishAction, setRewardFinishAction] = libs.createSignal();
  const [isRewardFinishPending, setIsRewardFinishPending] = libs.createSignal(false);
  let hasShownRewardFinish = false;
  const [rewardTipRewards, setRewardTipRewards] = libs.createSignal([]);
  const [activeMineGridToolEffects, setActiveMineGridToolEffects] = libs.createSignal([]);
  const [activeMineGridToolSequenceFrame, setActiveMineGridToolSequenceFrame] = libs.createSignal({
    actionID: 0,
    tool: "Pickaxe",
    row: 0,
    column: 0
  });
  const [isMineGridToolSequenceFrameVisible, setIsMineGridToolSequenceFrameVisible] = libs.createSignal(false);
  const [isMineGridToolSequenceFrameMoving, setIsMineGridToolSequenceFrameMoving] = libs.createSignal(false);
  const [mineGridSlots, setMineGridSlots] = libs.createStore({});
  const [fadingOutCells, setFadingOutCells] = libs.createStore({});
  let cursorPanel;
  let mineGridViewportPanel;
  let mineGridTransitionResetScheduleId;
  let mineGridTimelineRuntime;
  let rewardTipShowScheduleID;
  let rewardTipHideScheduleID;
  let parsedMineGridSnapshot;
  let displayMineGridSnapshot;
  let lastCalibratedMineGridNetData;
  let nextMiningActionID = 0;
  let isDisposed = false;
  const mineGridSlotGenerations = {};
  const canActivateToolButton = tool => !isMiningRequesting() && !isRewardFinishVisible() && (tool == "Pickaxe" || getToolAmount(tool) > 0);
  const isMineGridInteractionLocked = () => isMiningRequesting() || isMineGridScrolling() || isRewardFinishVisible();
  const canShowToolRangePreview = () => !isMineGridInteractionLocked() && equippedTool() !== "Pickaxe" && hoveredCellIndex() != undefined;
  const cancelRewardTipSchedule = scheduleID => {
    if (scheduleID == undefined) {
      return;
    }
    try {
      $.CancelScheduled(scheduleID);
    } catch (error) {}
  };
  const hideRewardTip = () => {
    cancelRewardTipSchedule(rewardTipShowScheduleID);
    cancelRewardTipSchedule(rewardTipHideScheduleID);
    rewardTipShowScheduleID = undefined;
    rewardTipHideScheduleID = undefined;
    setIsRewardTipVisible(false);
  };
  const showRewardTip = rewards => {
    hideRewardTip();
    rewardTipShowScheduleID = $.Schedule(0, () => {
      rewardTipShowScheduleID = undefined;
      if (isDisposed) {
        return;
      }
      libs.batch(() => {
        setRewardTipRewards(rewards);
        setIsRewardTipVisible(true);
      });
      rewardTipHideScheduleID = $.Schedule(DIG_VEINS_REWARD_TIP_VISIBLE_DURATION, () => {
        rewardTipHideScheduleID = undefined;
        hideRewardTip();
      });
    });
  };
  const getMineGridSlot = index => mineGridSlots[index];
  const isMineGridCellFadingOut = index => fadingOutCells[index] === true;
  const replaceMineGridSlots = slots => {
    setMineGridSlots(libs.produce(record => {
      const retainedIndexes = {};
      for (const slot of slots) {
        retainedIndexes[slot.index] = true;
        const currentSlot = record[slot.index];
        if (currentSlot == undefined) {
          record[slot.index] = {
            ...slot
          };
        } else {
          currentSlot.type = slot.type;
          currentSlot.displayValue = slot.displayValue;
        }
      }
      for (const key of Object.keys(record)) {
        const index = Number(key);
        if (retainedIndexes[index] !== true) {
          delete record[index];
        }
      }
    }));
  };
  const clearMineGridSlots = () => {
    setMineGridSlots(libs.produce(record => {
      for (const key of Object.keys(record)) {
        delete record[Number(key)];
      }
    }));
    setMineGridRowCellKeys(libs.produce(record => {
      for (const key of Object.keys(record)) {
        delete record[Number(key)];
      }
    }));
    setMineGridRowKeys([]);
  };
  const clearFadingOutCells = () => {
    setFadingOutCells(libs.produce(record => {
      for (const key of Object.keys(record)) {
        delete record[Number(key)];
      }
    }));
  };
  const getMineGridCellClass = index => {
    const type = getMineGridSlot(index)?.type;
    return libs.classNames({
      Empty: type == undefined || type == "0"
    });
  };
  const getLatestMineGridSnapshot = () => parsedMineGridSnapshot ?? parseDigVeinsSnapshot(miningActivityData()) ?? displayMineGridSnapshot;
  const getLogicalMineGridSlotType = index => {
    const snapshot = getLatestMineGridSnapshot();
    if (snapshot == undefined) {
      return undefined;
    }
    const row = Math.floor(index / MINE_GRID_COLUMNS);
    const column = index % MINE_GRID_COLUMNS;
    const visibleStartRow = getDigVeinsVisibleStartRow(snapshot.depth);
    if (row < visibleStartRow || row > snapshot.depth) {
      return undefined;
    }
    return snapshot.rows[row]?.[column]?.type;
  };
  const isLogicalMineGridSlotClickable = index => {
    const type = getLogicalMineGridSlotType(index);
    return type != undefined && type != "0";
  };
  const getVisibleStartRow = getDigVeinsVisibleStartRow;
  const getMineGridToolEffectAnchorStyle = effect => {
    const visibleStartRow = getVisibleStartRow(mineGridBottomRow());
    return {
      x: `${effect.column * MINE_GRID_COLUMN_STRIDE + MINE_GRID_CELL_CENTER}px`,
      y: `${(effect.row - visibleStartRow) * MINE_GRID_ROW_STRIDE + MINE_GRID_CELL_CENTER}px`
    };
  };
  const getMineGridToolSequenceFrameAnchorStyle = () => {
    const state = activeMineGridToolSequenceFrame();
    const visibleStartRow = getVisibleStartRow(mineGridBottomRow());
    return {
      x: `${state.column * MINE_GRID_COLUMN_STRIDE + MINE_GRID_CELL_CENTER}px`,
      y: `${(state.row - visibleStartRow) * MINE_GRID_ROW_STRIDE + MINE_GRID_CELL_CENTER}px`
    };
  };
  const isKnownEmptyLogicalMineGridSlot = (snapshot, row, column, visibleStartRow, visibleEndRow) => {
    if (row < visibleStartRow || row > visibleEndRow) {
      return false;
    }
    if (row < 0) {
      return true;
    }
    const slots = snapshot.rows[row];
    return slots != undefined && (slots[column] == undefined || slots[column]?.type == "0");
  };
  const hasAdjacentEmptyLogicalMineGridSlot = index => {
    const snapshot = getLatestMineGridSnapshot();
    if (snapshot == undefined) {
      return false;
    }
    const row = Math.floor(index / MINE_GRID_COLUMNS);
    const column = index % MINE_GRID_COLUMNS;
    const visibleEndRow = snapshot.depth;
    const visibleStartRow = getVisibleStartRow(visibleEndRow);
    if (row < visibleStartRow || row > visibleEndRow) {
      return false;
    }
    if (isKnownEmptyLogicalMineGridSlot(snapshot, row - 1, column, visibleStartRow, visibleEndRow) || isKnownEmptyLogicalMineGridSlot(snapshot, row + 1, column, visibleStartRow, visibleEndRow)) {
      return true;
    }
    if (column > 0 && isKnownEmptyLogicalMineGridSlot(snapshot, row, column - 1, visibleStartRow, visibleEndRow)) {
      return true;
    }
    if (column < MINE_GRID_COLUMNS - 1 && isKnownEmptyLogicalMineGridSlot(snapshot, row, column + 1, visibleStartRow, visibleEndRow)) {
      return true;
    }
    return false;
  };
  const getMineGridCellIndexFromKey = key => Number(key.slice(0, key.lastIndexOf("|")));
  const bumpMineGridSlotGeneration = index => {
    mineGridSlotGenerations[index] = (mineGridSlotGenerations[index] ?? 0) + 1;
  };
  const syncMineGridLayout = snapshot => {
    const layout = buildDigVeinsMineGridLayout(snapshot.rows, snapshot.depth);
    const retainedIndexes = {};
    for (const slot of layout.slots) {
      retainedIndexes[slot.index] = true;
      const currentSlot = mineGridSlots[slot.index];
      if (currentSlot != undefined && currentSlot.type !== slot.type) {
        bumpMineGridSlotGeneration(slot.index);
      }
    }
    for (const key of Object.keys(mineGridSlotGenerations)) {
      const index = Number(key);
      if (retainedIndexes[index] !== true) {
        delete mineGridSlotGenerations[index];
      }
    }
    replaceMineGridSlots(layout.slots);
    setMineGridRowCellKeys(libs.produce(record => {
      const retainedRows = {};
      for (const layoutRow of layout.rows) {
        retainedRows[layoutRow.row] = true;
        record[layoutRow.row] = layoutRow.cells.map(slot => `${slot.index}|${mineGridSlotGenerations[slot.index] ?? 0}`);
      }
      for (const key of Object.keys(record)) {
        const row = Number(key);
        if (retainedRows[row] !== true) {
          delete record[row];
        }
      }
    }));
    setMineGridRowKeys(layout.rows.map(layoutRow => layoutRow.row));
    setMineGridScrollOffset(0);
  };
  const cancelMineGridTransitionReset = () => {
    if (mineGridTransitionResetScheduleId != undefined) {
      try {
        $.CancelScheduled(mineGridTransitionResetScheduleId);
      } catch (error) {}
      mineGridTransitionResetScheduleId = undefined;
    }
  };
  const clearMineGridToolEffects = actionID => {
    if (actionID == undefined) {
      setActiveMineGridToolEffects([]);
      return;
    }
    setActiveMineGridToolEffects(effects => effects.filter(effect => effect.actionID !== actionID));
  };
  const getMineGridToolSequenceFrame = tool => {
    switch (tool) {
      case "Pickaxe":
        return pickaxeSequence;
      case "Bomb":
        return bombSequence;
      case "Drill":
        return drillSequence;
    }
  };
  const startMineGridToolSequenceFrame = state => {
    const currentState = activeMineGridToolSequenceFrame();
    if (currentState.actionID !== state.actionID) {
      getMineGridToolSequenceFrame(currentState.tool).stop();
    }
    getMineGridToolSequenceFrame(state.tool).replay();
    libs.batch(() => {
      setIsMineGridToolSequenceFrameMoving(false);
      setActiveMineGridToolSequenceFrame({
        ...state
      });
      setIsMineGridToolSequenceFrameVisible(true);
    });
  };
  const moveMineGridToolSequenceFrame = (actionID, row, column) => {
    const state = activeMineGridToolSequenceFrame();
    if (!isMineGridToolSequenceFrameVisible() || state.actionID !== actionID || state.tool !== "Drill" || drillSequence.isFinished()) {
      return;
    }
    libs.batch(() => {
      setIsMineGridToolSequenceFrameMoving(true);
      setActiveMineGridToolSequenceFrame({
        ...state,
        row,
        column
      });
    });
  };
  const stopMineGridToolSequenceFrame = actionID => {
    const state = activeMineGridToolSequenceFrame();
    if (actionID != undefined && state.actionID !== actionID) {
      return;
    }
    getMineGridToolSequenceFrame(state.tool).stop();
    libs.batch(() => {
      setIsMineGridToolSequenceFrameMoving(false);
      setIsMineGridToolSequenceFrameVisible(false);
    });
  };
  libs.createEffect(() => {
    const state = activeMineGridToolSequenceFrame();
    if (!isMineGridToolSequenceFrameVisible() || !getMineGridToolSequenceFrame(state.tool).isFinished()) {
      return;
    }
    if (activeMineGridToolSequenceFrame().actionID === state.actionID) {
      libs.batch(() => {
        setIsMineGridToolSequenceFrameVisible(false);
        setIsMineGridToolSequenceFrameMoving(false);
      });
    }
  });
  const cancelMineGridTimeline = () => {
    const runtime = mineGridTimelineRuntime;
    stopMineGridToolSequenceFrame(runtime?.plan.context.id);
    if (runtime == undefined) {
      return;
    }
    if (runtime.scheduleID != undefined) {
      try {
        $.CancelScheduled(runtime.scheduleID);
      } catch (error) {}
    }
    clearMineGridToolEffects(runtime.plan.context.id);
    mineGridTimelineRuntime = undefined;
  };
  const setDisplayMineGridSnapshot = (snapshot, resetTransitionNextFrame = true) => {
    const displaySnapshot = cloneDigVeinsSnapshot(snapshot);
    displayMineGridSnapshot = displaySnapshot;
    cancelMineGridTransitionReset();
    libs.batch(() => {
      clearFadingOutCells();
      setMineGridTransitionDisabled(true);
      setMineGridBottomRow(displaySnapshot.depth);
      syncMineGridLayout(displaySnapshot);
      setHoveredCellIndex(undefined);
    });
    if (!resetTransitionNextFrame) {
      return;
    }
    mineGridTransitionResetScheduleId = $.Schedule(0, () => {
      mineGridTransitionResetScheduleId = undefined;
      if (isDisposed) {
        return;
      }
      setMineGridTransitionDisabled(false);
      if (!isMineGridInteractionLocked()) {
        refreshHoveredCellFromCursor();
      }
    });
  };
  const calibrateMineGridFromNetTable = (resetTransitionNextFrame = true) => {
    const netTableData = miningActivityData();
    const netTableSnapshot = parseDigVeinsSnapshot(netTableData);
    if (netTableSnapshot != undefined) {
      lastCalibratedMineGridNetData = netTableData;
      parsedMineGridSnapshot = cloneDigVeinsSnapshot(netTableSnapshot);
      setDisplayMineGridSnapshot(netTableSnapshot, resetTransitionNextFrame);
    } else if (parsedMineGridSnapshot != undefined) {
      setDisplayMineGridSnapshot(parsedMineGridSnapshot, resetTransitionNextFrame);
    }
  };
  const destroyCursorPanel = () => {
    if (cursorPanel != undefined && cursorPanel.IsValid()) {
      cursorPanel.DeleteAsync(-1);
    }
    cursorPanel = undefined;
  };
  const createCursorPanel = tool => {
    destroyCursorPanel();
    const panel = $.CreatePanel("Panel", $.GetContextPanel(), "DigVeinsEquippedToolCursor");
    panel.hittest = false;
    panel.AddClass(tool);
    cursorPanel = panel;
    libs.render(() => {
      return libs.createElement("Panel", {
        "class": "DigVeinsEquippedToolCursorIcon",
        hittest: false
      }, null);
    }, panel);
  };
  const updateCursorPosition = () => {
    if (cursorPanel == undefined || !cursorPanel.IsValid()) {
      return;
    }
    cursorPanel.visible = !isRewardFinishVisible();
    const cursor = GameUI.GetCursorPosition();
    const parent = cursorPanel.GetParent();
    const parentPosition = parent?.GetPositionWithinWindow();
    const scaleX = parent?.actualuiscale_x ?? cursorPanel.actualuiscale_x ?? 1;
    const scaleY = parent?.actualuiscale_y ?? cursorPanel.actualuiscale_y ?? 1;
    const parentX = parentPosition?.x ?? 0;
    const parentY = parentPosition?.y ?? 0;
    cursorPanel.SetPositionInPixels((cursor[0] - parentX - TOOL_CURSOR_ICON_SIZE * 0.5) / scaleX, (cursor[1] - parentY - TOOL_CURSOR_ICON_SIZE * 0.5) / scaleY, 0);
  };
  const refreshHoveredCellFromCursor = () => {
    if (isRewardFinishVisible()) {
      setHoveredCellIndex(undefined);
      return;
    }
    const viewport = mineGridViewportPanel;
    if (viewport == undefined || !viewport.IsValid()) {
      setHoveredCellIndex(undefined);
      return;
    }
    const cursor = GameUI.GetCursorPosition();
    const viewportPosition = viewport.GetPositionWithinWindow();
    const scaleX = viewport.actualuiscale_x || 1;
    const scaleY = viewport.actualuiscale_y || 1;
    const localX = (cursor[0] - viewportPosition.x) / scaleX;
    const localY = (cursor[1] - viewportPosition.y) / scaleY;
    const column = Math.floor(localX / MINE_GRID_COLUMN_STRIDE);
    const visibleRow = Math.floor(localY / MINE_GRID_ROW_STRIDE);
    if (localX < 0 || localY < 0 || column < 0 || column >= MINE_GRID_COLUMNS || visibleRow < 0 || visibleRow >= MINE_GRID_VISIBLE_ROWS) {
      setHoveredCellIndex(undefined);
      return;
    }
    const row = getVisibleStartRow(mineGridBottomRow()) + visibleRow;
    const index = row * MINE_GRID_COLUMNS + column;
    setHoveredCellIndex(isLogicalMineGridSlotClickable(index) ? index : undefined);
  };
  const equipTool = tool => {
    libs.batch(() => {
      setHoveredCellIndex(undefined);
      setEquippedTool(tool);
    });
    createCursorPanel(tool);
    $.Schedule(0, updateCursorPosition);
  };
  const handleCellMouseOver = index => {
    setHoveredCellIndex(index);
  };
  const handleCellMouseOut = index => {
    if (hoveredCellIndex() === index) {
      setHoveredCellIndex(undefined);
    }
  };
  const validateMiningAction = (index, tool) => {
    if (isMineGridInteractionLocked() || equippedTool() !== tool || !isLogicalMineGridSlotClickable(index)) {
      return false;
    }
    if (tool == "Pickaxe") {
      if (pickaxeAmount() < 1) {
        ErrorMessage(GetLocalization("#ActivityVeins_ResourceNotEnough"));
        return false;
      }
      if (!hasAdjacentEmptyLogicalMineGridSlot(index)) {
        ErrorMessage(GetLocalization("#ActivityVeins_PickaxeNotAllow"));
        return false;
      }
    } else if (getToolAmount(tool) <= 0) {
      ErrorMessage(GetLocalization("#ActivityVeins_ResourceNotEnough"));
      return false;
    }
    return true;
  };
  const submitMiningAction = context => {
    const rewardCountBefore = totalRewardCount();
    libs.batch(() => {
      setHoveredCellIndex(undefined);
      setIsMiningRequesting(true);
    });
    CallActionRequest("/v1/activity/play_mining", {
      activity_id: dig_veins_logic.ACTIVITY_MINING_ID,
      row: context.column,
      line: context.row,
      operate_type: context.operateType
    }, result => {
      if (isDisposed) {
        return;
      }
      if (result.code != 0 && result.code != 200) {
        setIsMiningRequesting(false);
        if (result.message != undefined) {
          ErrorMessage(result.message);
        }
        return;
      }
      if (context.tool != "Pickaxe" && getToolAmount(context.tool) <= 0) {
        equipTool("Pickaxe");
      }
      const responseData = result.data?.player_mining_activity_data;
      const activityData = Array.isArray(responseData) ? responseData.find(data => data?.activity_id == dig_veins_logic.ACTIVITY_MINING_ID) : undefined;
      const responseStartRow = getVisibleStartRow(parsedMineGridSnapshot?.depth ?? mineGridBottomRow());
      const responseSnapshot = parseDigVeinsSnapshot(activityData, responseStartRow);
      if (responseSnapshot == undefined) {
        console.log("[DigVeins] mining request returned no valid activity snapshot");
        setIsMiningRequesting(false);
        return;
      }
      const specialRewards = collectDigVeinsSpecialRewards(result.data?.add_items?.common ?? []);
      libs.batch(() => {
        startMineGridPresentation(context, responseSnapshot, specialRewards);
        if (!hasShownRewardFinish && specialRewards.length > 0 && rewardCountBefore < maxRewardCount()) {
          setRewardFinishAction({
            actionID: context.id,
            countBefore: rewardCountBefore
          });
        }
        setIsMiningRequesting(false);
      });
    }, () => {
      setIsMiningRequesting(false);
    });
  };
  const handleCellActivate = (index, tool) => {
    if (Date.now() / 1000 >= activityData().end_time) {
      ErrorMessage(GetLocalization("#Activity_TimeEnd"));
      return;
    }
    const runtime = mineGridTimelineRuntime;
    const activeIndex = runtime == undefined ? undefined : runtime.plan.context.row * MINE_GRID_COLUMNS + runtime.plan.context.column;
    if (activeIndex === index || !validateMiningAction(index, tool)) {
      return;
    }
    if (mineGridTimelineRuntime != undefined && interruptMineGridPresentation()) {
      return;
    }
    if (isRewardFinishPending() || isRewardFinishVisible()) {
      return;
    }
    const row = Math.floor(index / MINE_GRID_COLUMNS);
    const column = index % MINE_GRID_COLUMNS;
    const context = {
      id: ++nextMiningActionID,
      tool,
      row,
      column,
      operateType: DIG_VEINS_TOOL_OPERATE_TYPE[tool]
    };
    submitMiningAction(context);
  };
  const executeMineGridTimelineCommand = command => {
    switch (command.type) {
      case "startToolSequenceFrame":
        startMineGridToolSequenceFrame(command.state);
        return;
      case "moveToolSequenceFrame":
        moveMineGridToolSequenceFrame(command.actionID, command.row, command.column);
        return;
      case "playSound":
        Game.EmitSound(command.soundEvent);
        return;
      case "showToolEffect":
        setActiveMineGridToolEffects(effects => [...effects.filter(effect => effect.id !== command.effect.id), command.effect]);
        return;
      case "hideToolEffects":
        clearMineGridToolEffects(command.actionID);
        return;
      case "startRemove":
        setFadingOutCells(libs.produce(record => {
          for (const tile of command.tiles) {
            record[tile.index] = true;
          }
        }));
        return;
      case "commitRemove":
        libs.batch(() => {
          setMineGridTransitionDisabled(true);
          const displaySnapshot = displayMineGridSnapshot;
          if (displaySnapshot != undefined) {
            const removedRowSet = {};
            for (const row of command.rows) {
              removedRowSet[row] = true;
            }
            for (const tile of command.tiles) {
              const row = Math.floor(tile.index / MINE_GRID_COLUMNS);
              const column = tile.index % MINE_GRID_COLUMNS;
              const slots = displaySnapshot.rows[row];
              if (slots != undefined && removedRowSet[row] !== true) {
                slots[column] = undefined;
              }
            }
            for (const row of command.rows) {
              delete displaySnapshot.rows[row];
            }
            syncMineGridLayout(displaySnapshot);
          }
          setFadingOutCells(libs.produce(record => {
            for (const tile of command.tiles) {
              delete record[tile.index];
            }
          }));
        });
        return;
      case "applyAdd":
        {
          setMineGridTransitionDisabled(true);
          const displaySnapshot = displayMineGridSnapshot;
          if (displaySnapshot != undefined) {
            for (const row of command.rows) {
              displaySnapshot.rows[row] = Array.from({
                length: MINE_GRID_COLUMNS
              }, () => undefined);
            }
            for (const tile of command.tiles) {
              const row = Math.floor(tile.index / MINE_GRID_COLUMNS);
              const column = tile.index % MINE_GRID_COLUMNS;
              displaySnapshot.rows[row] ??= Array.from({
                length: MINE_GRID_COLUMNS
              }, () => undefined);
              displaySnapshot.rows[row][column] = {
                type: tile.type,
                displayValue: tile.displayValue
              };
            }
            syncMineGridLayout(displaySnapshot);
          }
          return;
        }
      case "enableTransition":
        setMineGridTransitionDisabled(false);
        return;
      case "showRewardTip":
        showRewardTip(command.rewards);
        return;
      case "startScroll":
        {
          setIsMineGridScrolling(true);
          const nextBottomRow = command.toDepth;
          if (displayMineGridSnapshot != undefined) {
            displayMineGridSnapshot.depth = nextBottomRow;
          }
          libs.batch(() => {
            setMineGridBottomRow(nextBottomRow);
            setMineGridScrollOffset(Math.max(0, (command.toDepth - command.fromDepth) * MINE_GRID_ROW_STRIDE));
          });
          return;
        }
      case "finishScroll":
        if (mineGridTimelineRuntime != undefined) {
          mineGridTimelineRuntime.scrollFinished = true;
        }
        libs.batch(() => {
          setMineGridTransitionDisabled(true);
          if (displayMineGridSnapshot != undefined) {
            const targetDepth = displayMineGridSnapshot.depth;
            const stableSnapshot = getDigVeinsSnapshotWindow(displayMineGridSnapshot, getVisibleStartRow(targetDepth), targetDepth);
            displayMineGridSnapshot = stableSnapshot;
            syncMineGridLayout(stableSnapshot);
          }
        });
        return;
      case "calibrate":
        calibrateMineGridFromNetTable(false);
        return;
      case "finishFlow":
        libs.batch(() => {
          setIsMineGridAnimating(false);
          setIsMineGridScrolling(false);
        });
        if (!isMiningRequesting()) {
          refreshHoveredCellFromCursor();
        }
        return;
    }
  };
  const tickMineGridTimeline = runtime => {
    if (isDisposed || mineGridTimelineRuntime !== runtime) {
      return;
    }
    const elapsed = Math.max(runtime.lastElapsed, Date.now() / 1000 - runtime.startedAt);
    runtime.lastElapsed = elapsed;
    while (runtime.nextEventIndex < runtime.plan.events.length) {
      const event = runtime.plan.events[runtime.nextEventIndex];
      if (event.at > elapsed) {
        break;
      }
      runtime.nextEventIndex++;
      executeMineGridTimelineCommand(event.command);
    }
    if (runtime.nextEventIndex >= runtime.plan.events.length && elapsed >= runtime.plan.duration) {
      runtime.scheduleID = undefined;
      mineGridTimelineRuntime = undefined;
      return;
    }
    runtime.scheduleID = $.Schedule(MINE_GRID_TIMELINE_TICK_INTERVAL, () => tickMineGridTimeline(runtime));
  };
  const playMineGridTimeline = (plan, scrolling = false) => {
    cancelMineGridTimeline();
    const runtime = {
      plan,
      startedAt: Date.now() / 1000,
      lastElapsed: 0,
      nextEventIndex: 0,
      scrollFinished: false
    };
    mineGridTimelineRuntime = runtime;
    libs.batch(() => {
      setIsMineGridAnimating(true);
      setIsMineGridScrolling(scrolling);
    });
    tickMineGridTimeline(runtime);
  };
  const interruptMineGridPresentation = () => {
    const runtime = mineGridTimelineRuntime;
    if (runtime == undefined) {
      libs.batch(() => {
        setIsMineGridAnimating(false);
        setIsMineGridScrolling(false);
      });
      return false;
    }
    const scrollEvent = runtime.plan.events.find(event => event.command.type == "startScroll");
    const rewardTipEventIndex = runtime.plan.events.findIndex(event => event.command.type == "showRewardTip");
    const pendingRewardTipCommand = rewardTipEventIndex >= runtime.nextEventIndex && runtime.plan.events[rewardTipEventIndex]?.command.type == "showRewardTip" ? runtime.plan.events[rewardTipEventIndex].command : undefined;
    cancelMineGridTimeline();
    clearFadingOutCells();
    if (scrollEvent?.command.type != "startScroll" || runtime.scrollFinished) {
      if (pendingRewardTipCommand != undefined) {
        showRewardTip(pendingRewardTipCommand.rewards);
      }
      setDisplayMineGridSnapshot(runtime.plan.stableTargetSnapshot);
      libs.batch(() => {
        setIsMineGridAnimating(false);
        setIsMineGridScrolling(false);
      });
      return false;
    }
    const preparedScrollSnapshot = cloneDigVeinsSnapshot(runtime.plan.targetSnapshot);
    preparedScrollSnapshot.depth = scrollEvent.command.fromDepth;
    setDisplayMineGridSnapshot(preparedScrollSnapshot, false);
    const scrollStartAt = MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
    const scrollFinishAt = scrollStartAt + MINE_GRID_SCROLL_ANIMATION_DURATION;
    const finishFlowAt = scrollFinishAt + MINE_GRID_TIMELINE_RENDER_BARRIER_DURATION;
    const scrollOnlyEvents = [];
    let nextOrder = 0;
    if (pendingRewardTipCommand != undefined) {
      scrollOnlyEvents.push({
        at: 0,
        order: nextOrder++,
        command: pendingRewardTipCommand
      });
    }
    scrollOnlyEvents.push({
      at: scrollStartAt,
      order: nextOrder++,
      command: {
        type: "enableTransition"
      }
    }, {
      at: scrollStartAt,
      order: nextOrder++,
      command: scrollEvent.command
    }, {
      at: scrollFinishAt,
      order: nextOrder++,
      command: {
        type: "finishScroll"
      }
    }, {
      at: finishFlowAt,
      order: nextOrder++,
      command: {
        type: "enableTransition"
      }
    }, {
      at: finishFlowAt,
      order: nextOrder++,
      command: {
        type: "finishFlow"
      }
    });
    const scrollOnlyPlan = {
      context: runtime.plan.context,
      targetSnapshot: cloneDigVeinsSnapshot(runtime.plan.targetSnapshot),
      stableTargetSnapshot: cloneDigVeinsSnapshot(runtime.plan.stableTargetSnapshot),
      duration: finishFlowAt,
      events: scrollOnlyEvents
    };
    playMineGridTimeline(scrollOnlyPlan, true);
    return true;
  };
  const startMineGridPresentation = (context, responseSnapshot, specialRewards) => {
    const currentParsedSnapshot = parsedMineGridSnapshot ?? parseDigVeinsSnapshot(miningActivityData()) ?? cloneDigVeinsSnapshot(responseSnapshot);
    if (parsedMineGridSnapshot == undefined) {
      parsedMineGridSnapshot = cloneDigVeinsSnapshot(currentParsedSnapshot);
    }
    if (displayMineGridSnapshot == undefined) {
      setDisplayMineGridSnapshot(currentParsedSnapshot);
    }
    const targetSnapshot = cloneDigVeinsSnapshot(responseSnapshot);
    const stableTargetSnapshot = getDigVeinsSnapshotWindow(targetSnapshot, getVisibleStartRow(targetSnapshot.depth), targetSnapshot.depth);
    const diff = getDigVeinsSnapshotDiff(currentParsedSnapshot, targetSnapshot);
    const timeline = DIG_VEINS_TOOL_TIMELINE_BUILDERS[context.tool](context, currentParsedSnapshot, targetSnapshot, diff);
    if (displayMineGridSnapshot != undefined) {
      for (const rowKey of Object.keys(targetSnapshot.rows)) {
        const row = Number(rowKey);
        const displayedRow = displayMineGridSnapshot.rows[row];
        targetSnapshot.rows[row]?.forEach((cell, column) => {
          if (cell != undefined && displayedRow?.[column]?.type == cell.type) {
            displayedRow[column] = cell;
          }
        });
      }
      syncMineGridLayout(displayMineGridSnapshot);
    }
    insertDigVeinsRewardTipTimelineEvent(timeline, specialRewards);
    parsedMineGridSnapshot = stableTargetSnapshot;
    playMineGridTimeline(timeline);
  };
  const hideRewardFinish = () => {
    setIsRewardFinishVisible(false);
    updateCursorPosition();
    console.log("[DigVeins] Reward completion popup closed");
  };
  libs.createEffect(() => {
    const action = rewardFinishAction();
    const limit = maxRewardCount();
    if (action != undefined && !hasShownRewardFinish && limit > 0 && action.countBefore < limit && totalRewardCount() >= limit) {
      libs.batch(() => {
        setRewardFinishAction(undefined);
        setIsRewardFinishPending(true);
      });
      console.log("[DigVeins] Special reward collection completed");
    }
  });
  libs.createEffect(() => {
    if (!isRewardFinishPending() || isDisposed || isMiningRequesting() || isMineGridAnimating() || isRewardTipVisible() || rewardTipShowScheduleID != undefined) {
      return;
    }
    hasShownRewardFinish = true;
    libs.batch(() => {
      setIsRewardFinishPending(false);
      setHoveredCellIndex(undefined);
      setIsRewardFinishVisible(true);
    });
    updateCursorPosition();
    console.log("[DigVeins] Reward completion popup shown");
  });
  libs.createEffect(() => {
    const netTableData = miningActivityData();
    if (!isMiningRequesting() && !isMineGridAnimating() && netTableData !== lastCalibratedMineGridNetData) {
      calibrateMineGridFromNetTable();
    }
  });
  libs.onMount(() => {
    console.log("[DigVeins] Mining page mounted");
    equipTool("Pickaxe");
    const cursorTimer = setInterval(() => {
      updateCursorPosition();
    }, 10);
    libs.onCleanup(() => {
      isDisposed = true;
      setRewardFinishAction(undefined);
      setIsRewardFinishPending(false);
      setIsRewardFinishVisible(false);
      clearInterval(cursorTimer);
      cancelMineGridTimeline();
      cancelMineGridTransitionReset();
      hideRewardTip();
      clearMineGridToolEffects();
      destroyCursorPanel();
      clearFadingOutCells();
      clearMineGridSlots();
    });
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "DigVeinsRoot",
    get children() {
      return [(() => {
        const _el$31 = libs.createElement("Panel", {
            id: "DigVeinsContainer",
            hittest: true
          }, null),
          _el$32 = libs.createElement("Panel", {
            id: "DigVeinsLeftPage"
          }, _el$31),
          _el$33 = libs.createElement("Panel", {
            id: "DigVeinsToolBar"
          }, _el$32),
          _el$34 = libs.createElement("Panel", {
            "class": "DigVeinsToolItem Bomb"
          }, _el$33);
          libs.createElement("Image", {
            "class": "DigVeinsToolItemBG"
          }, _el$34);
          const _el$41 = libs.createElement("Panel", {
            "class": "DigVeinsToolItem Pickaxe"
          }, _el$33);
          libs.createElement("Image", {
            "class": "DigVeinsToolItemBG"
          }, _el$41);
          const _el$48 = libs.createElement("Panel", {
            "class": "DigVeinsToolItem Drill"
          }, _el$33);
          libs.createElement("Image", {
            "class": "DigVeinsToolItemBG"
          }, _el$48);
          const _el$55 = libs.createElement("Panel", {
            id: "DigVeinsMainPage"
          }, _el$31),
          _el$56 = libs.createElement("Panel", {
            "class": "DigVeinsMainHeaderContainer"
          }, _el$55);
          libs.createElement("Image", {
            "class": "DigVeinsMainHeaderBG",
            hittest: false
          }, _el$56);
          const _el$58 = libs.createElement("Panel", {
            "class": "DigVeinsDepthContent"
          }, _el$56),
          _el$59 = libs.createElement("Panel", {
            "class": "DigVeinsDepthTitle"
          }, _el$58),
          _el$60 = libs.createElement("Label", {
            "class": "DigVeinsDepthTitleLabel",
            get text() {
              return GetLocalization("#ActivityVeins_DepthTitle");
            }
          }, _el$59),
          _el$61 = libs.createElement("Panel", {
            "class": "DigVeinsDepthDescription"
          }, _el$58),
          _el$62 = libs.createElement("Label", {
            "class": "DigVeinsDepthPartDesc",
            get text() {
              return GetLocalization(depthPartToken());
            }
          }, _el$61),
          _el$63 = libs.createElement("Label", {
            "class": "DigVeinsDepthPartValue",
            get text() {
              return `${displayDepth()}M`;
            }
          }, _el$61),
          _el$64 = libs.createElement("Panel", {
            id: "DigVeinsCoreContainer"
          }, _el$55);
          libs.createElement("Image", {
            id: "DigVeinsCoreBG"
          }, _el$64);
          const _el$66 = libs.createElement("Panel", {
            id: "DigVeinsMineGridViewport"
          }, _el$64),
          _el$67 = libs.createElement("Panel", {
            id: "DigVeinsMineGridCellContainer",
            get style() {
              return {
                transform: `translateY(${-mineGridScrollOffset()}px)`
              };
            }
          }, _el$66),
          _el$68 = libs.createElement("Panel", {
            id: "DigVeinsToolEffectLayer",
            hittest: false,
            hittestchildren: false
          }, _el$64),
          _el$69 = libs.createElement("Panel", {
            id: "DigVeinsToolSequenceFrameLayer",
            hittest: false,
            hittestchildren: false
          }, _el$64),
          _el$70 = libs.createElement("Panel", {
            id: "DigVeinsToolSequenceFrameAnchor",
            get style() {
              return getMineGridToolSequenceFrameAnchorStyle();
            },
            hittest: false,
            hittestchildren: false
          }, _el$69),
          _el$71 = libs.createElement("Panel", {
            id: "DigDepthLine"
          }, _el$64),
          _el$72 = libs.createElement("Label", {
            id: "DigDepthLineLabel",
            get text() {
              return LocalizeWithVars("#ActivityVeins_DepthLineValue", {
                depth: displayDepth()
              });
            }
          }, _el$71);
          libs.createElement("Image", {
            id: "DigDepthLineIcon"
          }, _el$71);
          const _el$79 = libs.createElement("Panel", {
            id: "DigVeinsRightPage"
          }, _el$31),
          _el$80 = libs.createElement("Panel", {
            id: "DigVeinsHeader"
          }, _el$79),
          _el$81 = libs.createElement("Image", {
            id: "DigVeinsTitleImage",
            get ["class"]() {
              return logoLang();
            }
          }, _el$80),
          _el$82 = libs.createElement("Image", {
            get ["class"]() {
              return libs.classNames("DigVeinsHeaderButtonIcon", logoLang());
            }
          }, _el$80),
          _el$83 = libs.createElement("Panel", {
            id: "DigVeinsHeaderTime"
          }, _el$79);
          libs.createElement("Panel", {
            id: "DigVeinsHeaderTimeBG"
          }, _el$83);
          const _el$85 = libs.createElement("Panel", {
            id: "DigVeinsTaskPanel"
          }, _el$79);
          libs.createElement("Image", {
            id: "DigVeinsTaskPanelBG",
            hittest: false
          }, _el$85);
          const _el$87 = libs.createElement("Panel", {
            "class": "DigVeinsTaskContainer"
          }, _el$85),
          _el$88 = libs.createElement("Panel", {
            "class": "DigVeinsTaskTabList"
          }, _el$87),
          _el$89 = libs.createElement("Panel", {
            "class": "DigVeinsTaskTab First"
          }, _el$88);
          libs.createElement("Image", {
            "class": "DigVeinsTaskTabBG"
          }, _el$89);
          const _el$91 = libs.createElement("Panel", {
            "class": "DigVeinsTaskTabContent"
          }, _el$89),
          _el$92 = libs.createElement("Label", {
            "class": "DigVeinsTaskTabLabel",
            get text() {
              return GetLocalization("ActivityVeins_TaskTitleType_7");
            }
          }, _el$91),
          _el$93 = libs.createElement("Panel", {
            "class": "DigVeinsTaskTab Last"
          }, _el$88);
          libs.createElement("Image", {
            "class": "DigVeinsTaskTabBG"
          }, _el$93);
          const _el$95 = libs.createElement("Panel", {
            "class": "DigVeinsTaskTabContent"
          }, _el$93),
          _el$96 = libs.createElement("Label", {
            "class": "DigVeinsTaskTabLabel",
            get text() {
              return GetLocalization("ActivityVeins_TaskTitleType_6");
            }
          }, _el$95),
          _el$97 = libs.createElement("Panel", {
            id: "DigVeinsTaskScrollContent",
            scroll: "y"
          }, _el$87),
          _el$98 = libs.createElement("Panel", {
            "class": "DigVeinsTaskItemsContent"
          }, _el$97),
          _el$99 = libs.createElement("Panel", {
            id: "DigVeinsRewardContainer"
          }, _el$79);
          libs.createElement("Image", {
            "class": "DigVeinsRewardsContainerBG",
            hittest: false
          }, _el$99);
          const _el$101 = libs.createElement("Panel", {
            "class": "DigVeinsRewardsContent"
          }, _el$99),
          _el$102 = libs.createElement("Panel", {
            "class": "DigVeinsRewardsHeader"
          }, _el$101);
          libs.createElement("Image", {
            "class": "RewardsHeaderBG"
          }, _el$102);
          const _el$104 = libs.createElement("Panel", {
            "class": "RewardsHeaderDescription"
          }, _el$102),
          _el$105 = libs.createElement("Label", {
            "class": "RewardsHeaderTitle",
            get text() {
              return GetLocalization("#ActivityVeins_Rewards_HeaderTitle");
            }
          }, _el$104),
          _el$106 = libs.createElement("Label", {
            "class": "RewardsHeaderValue",
            get text() {
              return `${totalRewardCount()}/${maxRewardCount()}`;
            }
          }, _el$104),
          _el$107 = libs.createElement("Panel", {
            "class": "DigVeinsRewardsList"
          }, _el$101);
        libs.insert(_el$34, libs.createComponent(EOM_Button.EOM_BaseButton, {
          get ["class"]() {
            return libs.classNames("DigVeinsToolButton", "Bomb", {
              Selected: equippedTool() === "Bomb"
            });
          },
          get enabled() {
            return canActivateToolButton("Bomb");
          },
          onactivate: () => equipTool("Bomb"),
          get children() {
            return [libs.createElement("Image", {
              "class": "DigVeinsToolButtonIcon",
              hittest: false
            }, null), (() => {
              const _el$37 = libs.createElement("Label", {
                "class": "DigVeinsToolItemName",
                get text() {
                  return getToolItemName(miningConfig()?.explosive_id);
                },
                hittest: false
              }, null);
              libs.effect(_$p => libs.setProp(_el$37, "text", getToolItemName(miningConfig()?.explosive_id), _$p));
              return _el$37;
            })(), (() => {
              const _el$38 = libs.createElement("Panel", {
                  "class": "DigVeinsToolItemAmount"
                }, null),
                _el$39 = libs.createElement("Label", {
                  "class": "DigVeinsToolItemAmountValue",
                  get text() {
                    return bombAmount();
                  }
                }, _el$38);
              libs.effect(_$p => libs.setProp(_el$39, "text", bombAmount(), _$p));
              return _el$38;
            })()];
          }
        }), null);
        libs.insert(_el$34, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "DigVeinsToolOption DigVeinsToolOptionAdd",
          onactivate: openVeinsGift,
          get children() {
            return libs.createElement("Image", {
              "class": "DigVeinsToolOptionIcon",
              hittest: false
            }, null);
          }
        }), null);
        libs.insert(_el$41, libs.createComponent(EOM_Button.EOM_BaseButton, {
          get ["class"]() {
            return libs.classNames("DigVeinsToolButton", "Pickaxe", {
              Selected: equippedTool() === "Pickaxe"
            });
          },
          get enabled() {
            return canActivateToolButton("Pickaxe");
          },
          onactivate: () => equipTool("Pickaxe"),
          get children() {
            return [libs.createElement("Image", {
              "class": "DigVeinsToolButtonIcon",
              hittest: false
            }, null), (() => {
              const _el$44 = libs.createElement("Label", {
                "class": "DigVeinsToolItemName",
                get text() {
                  return getToolItemName(miningConfig()?.pickaxe_id);
                },
                hittest: false
              }, null);
              libs.effect(_$p => libs.setProp(_el$44, "text", getToolItemName(miningConfig()?.pickaxe_id), _$p));
              return _el$44;
            })(), (() => {
              const _el$45 = libs.createElement("Panel", {
                  "class": "DigVeinsToolItemAmount"
                }, null),
                _el$46 = libs.createElement("Label", {
                  "class": "DigVeinsToolItemAmountValue",
                  get text() {
                    return pickaxeAmount();
                  }
                }, _el$45);
              libs.effect(_$p => libs.setProp(_el$46, "text", pickaxeAmount(), _$p));
              return _el$45;
            })()];
          }
        }), null);
        libs.insert(_el$41, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "DigVeinsToolOption DigVeinsToolOptionAdd",
          onactivate: () => purchaseVeinsTool(DIG_VEINS_PICKAXE_PRODUCT_ID),
          get children() {
            return libs.createElement("Image", {
              "class": "DigVeinsToolOptionIcon",
              hittest: false
            }, null);
          }
        }), null);
        libs.insert(_el$48, libs.createComponent(EOM_Button.EOM_BaseButton, {
          get ["class"]() {
            return libs.classNames("DigVeinsToolButton", "Drill", {
              Selected: equippedTool() === "Drill"
            });
          },
          get enabled() {
            return canActivateToolButton("Drill");
          },
          onactivate: () => equipTool("Drill"),
          get children() {
            return [libs.createElement("Image", {
              "class": "DigVeinsToolButtonIcon",
              hittest: false
            }, null), (() => {
              const _el$51 = libs.createElement("Label", {
                "class": "DigVeinsToolItemName",
                get text() {
                  return getToolItemName(miningConfig()?.bit_id);
                },
                hittest: false
              }, null);
              libs.effect(_$p => libs.setProp(_el$51, "text", getToolItemName(miningConfig()?.bit_id), _$p));
              return _el$51;
            })(), (() => {
              const _el$52 = libs.createElement("Panel", {
                  "class": "DigVeinsToolItemAmount"
                }, null),
                _el$53 = libs.createElement("Label", {
                  "class": "DigVeinsToolItemAmountValue",
                  get text() {
                    return drillAmount();
                  }
                }, _el$52);
              libs.effect(_$p => libs.setProp(_el$53, "text", drillAmount(), _$p));
              return _el$52;
            })()];
          }
        }), null);
        libs.insert(_el$48, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "DigVeinsToolOption DigVeinsToolOptionAdd",
          onactivate: () => purchaseVeinsTool(DIG_VEINS_DRILL_PRODUCT_ID),
          get children() {
            return libs.createElement("Image", {
              "class": "DigVeinsToolOptionIcon",
              hittest: false
            }, null);
          }
        }), null);
        libs.use(panel => mineGridViewportPanel = panel, _el$66);
        libs.insert(_el$67, libs.createComponent(libs.For, {
          get each() {
            return mineGridRowKeys();
          },
          children: row => (() => {
            const _el$120 = libs.createElement("Panel", {
              "class": "DigVeinsMineGridRow"
            }, null);
            libs.insert(_el$120, libs.createComponent(libs.For, {
              get each() {
                return mineGridRowCellKeys[row] ?? [];
              },
              children: key => {
                const index = getMineGridCellIndexFromKey(key);
                return libs.createComponent(DigVeinsMineGridCell, {
                  index: index,
                  get type() {
                    return getMineGridSlot(index)?.type;
                  },
                  get displayValue() {
                    return getMineGridSlot(index)?.displayValue;
                  },
                  get ["class"]() {
                    return getMineGridCellClass(index);
                  },
                  get fadingOut() {
                    return isMineGridCellFadingOut(index);
                  },
                  get disabled() {
                    return isMineGridInteractionLocked() || !isLogicalMineGridSlotClickable(index);
                  },
                  get tool() {
                    return equippedTool();
                  },
                  oncellmouseover: handleCellMouseOver,
                  oncellmouseout: handleCellMouseOut,
                  oncellactivate: handleCellActivate
                });
              }
            }));
            return _el$120;
          })()
        }));
        libs.insert(_el$66, libs.createComponent(libs.Show, {
          get when() {
            return canShowToolRangePreview();
          },
          get children() {
            return libs.createComponent(DigVeinsToolRangePreview, {
              get tool() {
                return equippedTool();
              },
              get cellIndex() {
                return hoveredCellIndex();
              },
              get visibleStartRow() {
                return getVisibleStartRow(mineGridBottomRow());
              }
            });
          }
        }), null);
        libs.insert(_el$68, libs.createComponent(libs.For, {
          get each() {
            return activeMineGridToolEffects();
          },
          children: effect => [libs.createComponent(libs.Show, {
            get when() {
              return effect.tool == "Pickaxe";
            },
            get children() {
              const _el$121 = libs.createElement("Panel", {
                  "class": "DigVeinsToolEffectAnchor Pickaxe",
                  get style() {
                    return getMineGridToolEffectAnchorStyle(effect);
                  },
                  hittest: false,
                  hittestchildren: false
                }, null);
                libs.createElement("DOTAParticleScenePanel", {
                  "class": "DigVeinsToolEffectParticle Pickaxe",
                  particleName: "particles/ui/game/ui_game_m4_broken_fx.vpcf",
                  cameraOrigin: "0 0 320",
                  lookAt: "0 0 0",
                  fov: 90,
                  hittest: false,
                  squarePixels: true
                }, _el$121);
              libs.effect(_$p => libs.setProp(_el$121, "style", getMineGridToolEffectAnchorStyle(effect), _$p));
              return _el$121;
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return effect.tool == "Drill";
            },
            get children() {
              const _el$123 = libs.createElement("Panel", {
                  "class": "DigVeinsToolEffectAnchor Drill",
                  get style() {
                    return getMineGridToolEffectAnchorStyle(effect);
                  },
                  hittest: false,
                  hittestchildren: false
                }, null);
                libs.createElement("DOTAParticleScenePanel", {
                  "class": "DigVeinsToolEffectParticle Drill",
                  particleName: "particles/ui/game/ui_game_m4_drill_fx.vpcf",
                  cameraOrigin: "0 0 320",
                  lookAt: "0 0 0",
                  fov: 90,
                  hittest: false,
                  squarePixels: true
                }, _el$123);
              libs.effect(_$p => libs.setProp(_el$123, "style", getMineGridToolEffectAnchorStyle(effect), _$p));
              return _el$123;
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return effect.tool == "Bomb";
            },
            get children() {
              const _el$125 = libs.createElement("Panel", {
                  "class": "DigVeinsToolEffectAnchor Bomb",
                  get style() {
                    return getMineGridToolEffectAnchorStyle(effect);
                  },
                  hittest: false,
                  hittestchildren: false
                }, null);
                libs.createElement("DOTAParticleScenePanel", {
                  "class": "DigVeinsToolEffectParticle Bomb",
                  particleName: "particles/ui/game/ui_game_m4_bomb_fx.vpcf",
                  cameraOrigin: "0 0 320",
                  lookAt: "0 0 0",
                  fov: 90,
                  hittest: false,
                  squarePixels: true
                }, _el$125);
              libs.effect(_$p => libs.setProp(_el$125, "style", getMineGridToolEffectAnchorStyle(effect), _$p));
              return _el$125;
            }
          })]
        }));
        libs.insert(_el$70, libs.createComponent(PickaxeSequenceFrame, {
          "class": "DigVeinsToolSequenceFrame PickaxeFrame",
          get visible() {
            return libs.memo(() => !!(isMineGridToolSequenceFrameVisible() && activeMineGridToolSequenceFrame().tool == "Pickaxe"))() && !pickaxeSequence.isFinished();
          }
        }), null);
        libs.insert(_el$70, libs.createComponent(BombSequenceFrame, {
          "class": "DigVeinsToolSequenceFrame BombFrame",
          get visible() {
            return libs.memo(() => !!(isMineGridToolSequenceFrameVisible() && activeMineGridToolSequenceFrame().tool == "Bomb"))() && !bombSequence.isFinished();
          }
        }), null);
        libs.insert(_el$70, libs.createComponent(DrillSequenceFrame, {
          "class": "DigVeinsToolSequenceFrame DrillFrame",
          get visible() {
            return libs.memo(() => !!(isMineGridToolSequenceFrameVisible() && activeMineGridToolSequenceFrame().tool == "Drill"))() && !drillSequence.isFinished();
          }
        }), null);
        libs.insert(_el$64, libs.createComponent(libs.Show, {
          get when() {
            return isRewardTipVisible();
          },
          get children() {
            const _el$74 = libs.createElement("Panel", {
                id: "DigRewardTipWindow",
                hittest: true,
                hittestchildren: false
              }, null),
              _el$75 = libs.createElement("Panel", {
                id: "DigRewardTipContent",
                "class": "TooltipContent",
                hittest: false,
                hittestchildren: false
              }, _el$74),
              _el$76 = libs.createElement("Label", {
                id: "DigRewardTipTitle",
                get text() {
                  return GetLocalization("#ActivityVeins_SpecialRewardTitle");
                }
              }, _el$75),
              _el$77 = libs.createElement("Panel", {
                id: "DigRewardTipRewardList"
              }, _el$75),
              _el$78 = libs.createElement("Label", {
                id: "DigRewardTipSkipTips",
                get text() {
                  return GetLocalization("#ActivityVeins_SpecialRewardSkipTips");
                }
              }, _el$75);
            libs.setProp(_el$74, "onactivate", hideRewardTip);
            libs.insert(_el$77, libs.createComponent(libs.For, {
              get each() {
                return rewardTipRewards();
              },
              children: reward => (() => {
                const _el$127 = libs.createElement("Panel", {
                    "class": "DigRewardTipReward"
                  }, null),
                  _el$129 = libs.createElement("Label", {
                    "class": "DigRewardTipItemName",
                    get text() {
                      return GetLocalization(`#${reward.item_id}`);
                    }
                  }, _el$127);
                libs.insert(_el$127, libs.createComponent(StoreItem.StoreItemBlock, {
                  get item_id() {
                    return reward.item_id;
                  },
                  get amounts() {
                    return reward.amounts;
                  },
                  hideTips: true,
                  get children() {
                    return libs.createComponent(libs.Show, {
                      get when() {
                        return reward.amounts == 1;
                      },
                      get children() {
                        return libs.createElement("Label", {
                          id: "ItemCount",
                          hittest: false,
                          text: "×1"
                        }, null);
                      }
                    });
                  }
                }), _el$129);
                libs.effect(_$p => libs.setProp(_el$129, "text", GetLocalization(`#${reward.item_id}`), _$p));
                return _el$127;
              })()
            }));
            libs.effect(_p$ => {
              const _v$9 = GetLocalization("#ActivityVeins_SpecialRewardTitle"),
                _v$0 = GetLocalization("#ActivityVeins_SpecialRewardSkipTips");
              _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$76, "text", _v$9, _p$._v$9));
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$78, "text", _v$0, _p$._v$0));
              return _p$;
            }, {
              _v$9: undefined,
              _v$0: undefined
            });
            return _el$74;
          }
        }), null);
        libs.insert(_el$83, libs.createComponent(EOM_Countdown.EOM_Countdown, {
          icon: true,
          text: "#ActivityDice_TimeLimit",
          get endTime() {
            return activityData().end_time;
          }
        }), null);
        libs.setProp(_el$89, "onactivate", () => selectTaskType(7));
        libs.setProp(_el$93, "onactivate", () => selectTaskType(6));
        libs.use(panel => taskScrollPanel = panel, _el$97);
        libs.setProp(_el$97, "scroll", "y");
        libs.insert(_el$98, libs.createComponent(libs.For, {
          get each() {
            return digVeinsTasksByType()[selectedTaskType()];
          },
          children: task => libs.createComponent(DigVeinsTaskItem, {
            task: task,
            get claiming() {
              return claimingTaskKey() == getDigVeinsTaskKey(task);
            },
            onClaim: receiveTaskReward
          })
        }));
        libs.insert(_el$107, libs.createComponent(libs.For, {
          each: DIG_VEINS_REWARD_ITEM_IDS,
          children: item => {
            return (() => {
              const _el$130 = libs.createElement("Panel", {
                  "class": `DigVeinsRewardsBoxContent BoxType-${item}`
                }, null),
                _el$131 = libs.createElement("Panel", {
                  "class": "RewardBoxHeader"
                }, _el$130),
                _el$132 = libs.createElement("Label", {
                  "class": "RewardBoxName",
                  get text() {
                    return GetLocalization(`#ActivityVeins_Rewards_BoxType_${item}`);
                  }
                }, _el$131);
                libs.createElement("Image", {
                  "class": "RewardBoxImage"
                }, _el$130);
                const _el$134 = libs.createElement("Panel", {
                  "class": "RewardBoxValueContent"
                }, _el$130);
                libs.createElement("Image", {
                  "class": "RewardBoxValueBG"
                }, _el$134);
                const _el$136 = libs.createElement("Label", {
                  "class": "RewardBoxValueText",
                  get text() {
                    return getRewardCount(item);
                  }
                }, _el$134);
              libs.setProp(_el$130, "class", `DigVeinsRewardsBoxContent BoxType-${item}`);
              libs.effect(_p$ => {
                const _v$29 = GetLocalization(`#ActivityVeins_Rewards_BoxType_${item}`),
                  _v$30 = getRewardCount(item);
                _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$132, "text", _v$29, _p$._v$29));
                _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$136, "text", _v$30, _p$._v$30));
                return _p$;
              }, {
                _v$29: undefined,
                _v$30: undefined
              });
              return _el$130;
            })();
          }
        }));
        libs.effect(_p$ => {
          const _v$1 = GetLocalization("#ActivityVeins_DepthTitle"),
            _v$10 = GetLocalization(depthPartToken()),
            _v$11 = `${displayDepth()}M`,
            _v$12 = {
              NoTransition: mineGridTransitionDisabled()
            },
            _v$13 = {
              transform: `translateY(${-mineGridScrollOffset()}px)`
            },
            _v$14 = {
              Moving: isMineGridToolSequenceFrameMoving()
            },
            _v$15 = isMineGridToolSequenceFrameVisible(),
            _v$16 = getMineGridToolSequenceFrameAnchorStyle(),
            _v$17 = LocalizeWithVars("#ActivityVeins_DepthLineValue", {
              depth: displayDepth()
            }),
            _v$18 = logoLang(),
            _v$19 = libs.classNames("DigVeinsHeaderButtonIcon", logoLang()),
            _v$20 = ruleTooltip(),
            _v$21 = {
              Selected: selectedTaskType() == 7
            },
            _v$22 = GetLocalization("ActivityVeins_TaskTitleType_7"),
            _v$23 = {
              Selected: selectedTaskType() == 6
            },
            _v$24 = GetLocalization("ActivityVeins_TaskTitleType_6"),
            _v$25 = GetLocalization("#ActivityVeins_Rewards_HeaderTitle"),
            _v$26 = `${totalRewardCount()}/${maxRewardCount()}`;
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$60, "text", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$62, "text", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$63, "text", _v$11, _p$._v$11));
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$67, "classList", _v$12, _p$._v$12));
          _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$67, "style", _v$13, _p$._v$13));
          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$70, "classList", _v$14, _p$._v$14));
          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$70, "visible", _v$15, _p$._v$15));
          _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$70, "style", _v$16, _p$._v$16));
          _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$72, "text", _v$17, _p$._v$17));
          _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$81, "class", _v$18, _p$._v$18));
          _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$82, "class", _v$19, _p$._v$19));
          _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$82, "customTooltip", _v$20, _p$._v$20));
          _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$89, "classList", _v$21, _p$._v$21));
          _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$92, "text", _v$22, _p$._v$22));
          _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$93, "classList", _v$23, _p$._v$23));
          _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$96, "text", _v$24, _p$._v$24));
          _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$105, "text", _v$25, _p$._v$25));
          _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$106, "text", _v$26, _p$._v$26));
          return _p$;
        }, {
          _v$1: undefined,
          _v$10: undefined,
          _v$11: undefined,
          _v$12: undefined,
          _v$13: undefined,
          _v$14: undefined,
          _v$15: undefined,
          _v$16: undefined,
          _v$17: undefined,
          _v$18: undefined,
          _v$19: undefined,
          _v$20: undefined,
          _v$21: undefined,
          _v$22: undefined,
          _v$23: undefined,
          _v$24: undefined,
          _v$25: undefined,
          _v$26: undefined
        });
        return _el$31;
      })(), libs.createComponent(EOMChildren.Portal, {
        get mount() {
          return $.GetContextPanel();
        },
        get children() {
          return libs.createComponent(libs.Show, {
            get when() {
              return isRewardFinishVisible();
            },
            get children() {
              const _el$108 = libs.createElement("Panel", {
                  "class": "DigVeinsRewardFinishOverlay",
                  hittest: true,
                  hittestchildren: false
                }, null),
                _el$109 = libs.createElement("Panel", {
                  "class": "RewardBoxFinishPopWindow",
                  hittest: false,
                  hittestchildren: false
                }, _el$108);
                libs.createElement("Image", {
                  "class": "PopWindowBG"
                }, _el$109);
                const _el$111 = libs.createElement("Panel", {
                  "class": "PopWindowContainer"
                }, _el$109),
                _el$112 = libs.createElement("Panel", {
                  "class": "PopWindowTitle"
                }, _el$111);
                libs.createElement("Image", {
                  "class": "PopWindowTitleBG"
                }, _el$112);
                const _el$114 = libs.createElement("Panel", {
                  "class": "PopWindowTitleContent"
                }, _el$112);
                libs.createElement("Image", {
                  "class": "PopWindowTitleDivider Left"
                }, _el$114);
                const _el$116 = libs.createElement("Label", {
                  "class": "PopWindowTitleLabel",
                  get text() {
                    return GetLocalization("#ActivityVeins_Popup_BoxFinishedTitle");
                  }
                }, _el$114);
                libs.createElement("Image", {
                  "class": "PopWindowTitleDivider Right"
                }, _el$114);
                const _el$118 = libs.createElement("Panel", {
                  "class": "PopWindowMainContent"
                }, _el$111),
                _el$119 = libs.createElement("Label", {
                  "class": "PopWindowMainContentLabel",
                  html: true,
                  get text() {
                    return GetLocalization("#ActivityVeins_Popup_BoxFinishedDesc");
                  }
                }, _el$118);
              libs.setProp(_el$108, "onactivate", hideRewardFinish);
              libs.effect(_p$ => {
                const _v$27 = GetLocalization("#ActivityVeins_Popup_BoxFinishedTitle"),
                  _v$28 = GetLocalization("#ActivityVeins_Popup_BoxFinishedDesc");
                _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$116, "text", _v$27, _p$._v$27));
                _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$119, "text", _v$28, _p$._v$28));
                return _p$;
              }, {
                _v$27: undefined,
                _v$28: undefined
              });
              return _el$108;
            }
          });
        }
      })];
    }
  });
}

const titleIconPaths = {
  "301": ["f4_title_en", "f4_title_cn", "f4_title_ru"]
};
const player_growth_fund_activity_data = solid_utils.createServiceNetData("player_growth_fund_activity_data", {});
const [activityID, SetActivityID] = libs.createSignal("301");
libs.createMemo(() => KeyValues.activity_data[activityID()]);
const allActivityID = ["301"];
const hasAnyUnreceived = libs.createMemo(() => {
  const fund_Playerdata = () => player_growth_fund_activity_data();
  const fundConfig = () => KeyValues.activity_growth_fund_rewards;
  let temp = {};
  for (const activityID of allActivityID) {
    temp[activityID] = false;
    const playerProgress = fund_Playerdata()[activityID]?.progress;
    const playerReceived = fund_Playerdata()[activityID]?.received;
    const playerPlus = fund_Playerdata()[activityID]?.plus;
    const growthReward = Object.values(fundConfig()[parseInt(activityID)]).sort((a, b) => a.reward_id - b.reward_id);
    for (let j = 0; j < growthReward.length; j++) {
      if (growthReward[j].plus == 1 && !playerPlus) {
        break;
      }
      if (playerProgress >= growthReward[j].num) {
        if (playerReceived == undefined || !playerReceived.some(r => r.reward_id === growthReward[j].reward_id)) {
          temp[activityID] = true;
          break;
        }
      }
    }
  }
  for (let i = 0; i < allActivityID.length; i++) {
    temp[allActivityID[i]] = false;
    const playerProgress = fund_Playerdata()[allActivityID[i]]?.progress;
    const playerReceived = fund_Playerdata()[allActivityID[i]]?.received;
    const playerPlus = fund_Playerdata()[allActivityID[i]]?.plus;
    const growthReward = Object.values(fundConfig()[parseInt(allActivityID[i])]).sort((a, b) => a.reward_id - b.reward_id);
    for (let j = 0; j < growthReward.length; j++) {
      if (growthReward[j].plus == 1 && !playerPlus) {
        break;
      }
      if (playerProgress >= growthReward[j].num) {
        if (playerReceived == undefined || !playerReceived.some(r => r.reward_id === growthReward[j].reward_id)) {
          temp[allActivityID[i]] = true;
          break;
        }
      }
    }
  }
  return temp;
});
libs.createEffect(() => {
  CustomUIConfig.SetRedPoint(hasAnyUnreceived()["301"], "activity", "growth_fund", "growth_fund_301");
});
const lang = Language();
function GrowthFund(params) {
  SetActivityID(params.activityID);
  const growth_fund_activity_data = libs.createMemo(() => player_growth_fund_activity_data()?.[activityID()] || {
    progress: 0,
    received: [],
    plus: false
  });
  const progress = () => growth_fund_activity_data()?.progress;
  let currentMaxProgress = 0;
  const plus = () => growth_fund_activity_data().plus ? 1 : 0;
  let imagePath = titleIconPaths[params.activityID][0];
  if (lang == "schinese") {
    imagePath = titleIconPaths[params.activityID][1];
  } else if (lang == "russian") {
    imagePath = titleIconPaths[params.activityID][2];
  }
  const FundConfig = KeyValues.activity_growth_fund[params.activityID];
  const FundPlusProductID = FundConfig.product_id;
  const growthRewards = Object.values(KeyValues.activity_growth_fund_rewards[parseInt(activityID())]).sort((a, b) => a.num - b.num);
  const currentFundMaxValue = growthRewards[growthRewards.length - 1]?.num;
  switch (activityID()) {
    case "301":
      Math.min(Math.floor(progress() / 2), currentFundMaxValue);
      currentMaxProgress = currentFundMaxValue;
      break;
  }
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "GrowthFund"
      }, null);
      libs.createElement("Panel", {
        id: "BG"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "TopContent"
      }, _el$),
      _el$4 = libs.createElement("Image", {
        id: "ImgTitle",
        src: `file://{images}/custom_game/activity/growth_fund/imgTitle/${imagePath}.png`
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "Info"
      }, _el$3),
      _el$6 = libs.createElement("Label", {
        id: "InfoText",
        get text() {
          return "#Info_" + activityID();
        }
      }, _el$5),
      _el$7 = libs.createElement("Image", {
        id: "InfoIcon"
      }, _el$5),
      _el$8 = libs.createElement("Image", {
        id: "LevelBG"
      }, _el$3),
      _el$9 = libs.createElement("Label", {
        id: "LevelNumber",
        get text() {
          return Math.min(progress(), currentFundMaxValue);
        }
      }, _el$8),
      _el$0 = libs.createElement("Label", {
        id: "LevelTitle",
        get text() {
          return "#LevelInfo_" + activityID();
        }
      }, _el$3),
      _el$1 = libs.createElement("Panel", {
        id: "ExpBarContainer"
      }, _el$3);
      libs.createElement("Panel", {
        id: "ExpBarBG"
      }, _el$1);
      const _el$11 = libs.createElement("Panel", {
        id: "Bar",
        get style() {
          return {
            clip: `rect( 0%, ${Math.min(progress(), currentFundMaxValue) / currentMaxProgress * 100}%, 100%, 0% )`
          };
        }
      }, _el$1),
      _el$12 = libs.createElement("Label", {
        id: "ExpValue",
        get text() {
          return Math.min(progress(), currentFundMaxValue) + "/" + currentMaxProgress;
        }
      }, _el$3),
      _el$13 = libs.createElement("Panel", {
        id: "RewardList",
        scroll: "x"
      }, _el$),
      _el$14 = libs.createElement("Panel", {
        id: "RewardFirstBG"
      }, _el$13);
      libs.createElement("Image", {
        id: "TopImg"
      }, _el$14);
      libs.createElement("Label", {
        id: "TopText",
        text: "#SimpleBook"
      }, _el$14);
      const _el$17 = libs.createElement("Image", {
        id: "BottomImg"
      }, _el$14),
      _el$18 = libs.createElement("Image", {
        id: "Lock"
      }, _el$17);
      libs.createElement("Label", {
        id: "BottomText",
        text: "#LuxuryBook"
      }, _el$14);
      const _el$20 = libs.createElement("Panel", {}, _el$),
      _el$21 = libs.createElement("Label", {
        id: "PlusTipText",
        get text() {
          return "#PlusTipText_" + activityID();
        }
      }, _el$20),
      _el$22 = libs.createElement("Panel", {
        id: "BottomContent"
      }, _el$);
    libs.setProp(_el$4, "src", `file://{images}/custom_game/activity/growth_fund/imgTitle/${imagePath}.png`);
    libs.setProp(_el$13, "scroll", "x");
    libs.insert(_el$13, libs.createComponent(libs.For, {
      each: growthRewards,
      children: (rewardConfig, i) => {
        if (i() % 2 != 1) {
          let received = () => {
            return growth_fund_activity_data().received && growth_fund_activity_data().received.some(r => r.reward_id === rewardConfig.reward_id);
          };
          let receivedPlus = () => {
            return growth_fund_activity_data().received && growth_fund_activity_data().received.some(r => r.reward_id === growthRewards[i() + 1].reward_id);
          };
          let canReceive = () => {
            return !received() && progress() >= rewardConfig.num;
          };
          let canReceivePlus = () => {
            return !receivedPlus() && plus() && progress() >= growthRewards[i() + 1].num;
          };
          let topReward = rewardConfig.rewards.split(':');
          let IsDouble = false;
          let bottomSolo;
          let bottomItem1;
          let bottomItem2;
          if (growthRewards[i() + 1].rewards.includes('|')) {
            IsDouble = true;
            let rewards = growthRewards[i() + 1].rewards.split('|');
            bottomItem1 = rewards[0].split(':');
            bottomItem2 = rewards[1].split(':');
          } else {
            bottomSolo = growthRewards[i() + 1].rewards.split(':');
          }
          return (() => {
            const _el$23 = libs.createElement("Panel", {
                id: "RewardBG"
              }, null),
              _el$24 = libs.createElement("Panel", {
                id: "Reward",
                "class": "Top"
              }, _el$23),
              _el$25 = libs.createElement("Image", {
                id: "Lock"
              }, _el$24),
              _el$26 = libs.createElement("Image", {
                hittest: false
              }, _el$24),
              _el$27 = libs.createElement("Panel", {
                "class": "Top",
                hittest: false
              }, _el$23),
              _el$28 = libs.createElement("Panel", {
                "class": "Top",
                hittest: false
              }, _el$23),
              _el$29 = libs.createElement("Panel", {
                id: "CenterIcon"
              }, _el$23),
              _el$30 = libs.createElement("Label", {
                id: "CenterText",
                get text() {
                  return rewardConfig.num;
                }
              }, _el$29);
            libs.setProp(_el$24, "onactivate", () => {
              if (!received() && canReceive()) {
                CallActionRequest("/v1/activity/receive_rewards", {
                  activity_id: Number(activityID()),
                  reward_id: rewardConfig.reward_id
                }, () => {});
              }
            });
            libs.insert(_el$24, libs.createComponent(StoreItem.StoreItemBlock, {
              get classList() {
                return {
                  black: received()
                };
              },
              get item_id() {
                return topReward[0];
              },
              get rarity() {
                return GetServiceItemRarity(topReward[0]);
              },
              get amounts() {
                return toFiniteNumber(topReward[1]);
              }
            }), _el$25);
            libs.setProp(_el$28, "style", {
              animationDelay: "0.9s"
            });
            libs.insert(_el$23, libs.createComponent(libs.Show, {
              when: IsDouble,
              fallback: () => {
                return [(() => {
                  const _el$41 = libs.createElement("Panel", {
                      id: "Reward",
                      "class": "BottomSolo"
                    }, null),
                    _el$42 = libs.createElement("Image", {
                      id: "Lock"
                    }, _el$41),
                    _el$43 = libs.createElement("Image", {
                      hittest: false
                    }, _el$41);
                  libs.setProp(_el$41, "onactivate", () => {
                    if (!receivedPlus() && canReceivePlus()) {
                      CallActionRequest("/v1/activity/receive_rewards", {
                        activity_id: Number(activityID()),
                        reward_id: growthRewards[i() + 1].reward_id
                      }, () => {});
                    }
                  });
                  libs.insert(_el$41, libs.createComponent(StoreItem.StoreItemBlock, {
                    get classList() {
                      return {
                        black: receivedPlus()
                      };
                    },
                    get item_id() {
                      return bottomSolo[0];
                    },
                    get rarity() {
                      return GetServiceItemRarity(bottomSolo[0]);
                    },
                    get amounts() {
                      return toFiniteNumber(bottomSolo[1]);
                    }
                  }), _el$42);
                  libs.effect(_p$ => {
                    const _v$17 = {
                        Hide: receivedPlus() || canReceivePlus()
                      },
                      _v$18 = {
                        Received: receivedPlus()
                      };
                    _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$42, "classList", _v$17, _p$._v$17));
                    _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$43, "classList", _v$18, _p$._v$18));
                    return _p$;
                  }, {
                    _v$17: undefined,
                    _v$18: undefined
                  });
                  return _el$41;
                })(), (() => {
                  const _el$44 = libs.createElement("Panel", {
                    "class": "BottomSolo",
                    hittest: false
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$44, "classList", {
                    RewardBoraderAnimation: canReceivePlus() && !receivedPlus()
                  }, _$p));
                  return _el$44;
                })(), (() => {
                  const _el$45 = libs.createElement("Panel", {
                    "class": "BottomSolo",
                    hittest: false
                  }, null);
                  libs.setProp(_el$45, "style", {
                    animationDelay: "0.9s"
                  });
                  libs.effect(_$p => libs.setProp(_el$45, "classList", {
                    RewardBoraderAnimation: canReceivePlus() && !receivedPlus()
                  }, _$p));
                  return _el$45;
                })()];
              },
              get children() {
                return [(() => {
                  const _el$31 = libs.createElement("Panel", {
                      id: "Reward",
                      "class": "BottomOne"
                    }, null),
                    _el$32 = libs.createElement("Image", {
                      id: "Lock"
                    }, _el$31),
                    _el$33 = libs.createElement("Image", {
                      hittest: false
                    }, _el$31);
                  libs.setProp(_el$31, "onactivate", () => {
                    if (!receivedPlus() && canReceivePlus()) {
                      CallActionRequest("/v1/activity/receive_rewards", {
                        activity_id: Number(activityID()),
                        reward_id: growthRewards[i() + 1].reward_id
                      }, () => {});
                    }
                  });
                  libs.insert(_el$31, libs.createComponent(StoreItem.StoreItemBlock, {
                    get classList() {
                      return {
                        black: receivedPlus()
                      };
                    },
                    get item_id() {
                      return bottomItem1[0];
                    },
                    get rarity() {
                      return GetServiceItemRarity(bottomItem1[0]);
                    },
                    get amounts() {
                      return toFiniteNumber(bottomItem1[1]);
                    }
                  }), _el$32);
                  libs.effect(_p$ => {
                    const _v$0 = {
                        Hide: receivedPlus() || canReceivePlus()
                      },
                      _v$1 = {
                        Received: receivedPlus()
                      };
                    _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$32, "classList", _v$0, _p$._v$0));
                    _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$33, "classList", _v$1, _p$._v$1));
                    return _p$;
                  }, {
                    _v$0: undefined,
                    _v$1: undefined
                  });
                  return _el$31;
                })(), (() => {
                  const _el$34 = libs.createElement("Panel", {
                    "class": "BottomOne",
                    hittest: false
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$34, "classList", {
                    RewardBoraderAnimation: canReceivePlus() && !receivedPlus()
                  }, _$p));
                  return _el$34;
                })(), (() => {
                  const _el$35 = libs.createElement("Panel", {
                    "class": "BottomOne",
                    hittest: false
                  }, null);
                  libs.setProp(_el$35, "style", {
                    animationDelay: "0.9s"
                  });
                  libs.effect(_$p => libs.setProp(_el$35, "classList", {
                    RewardBoraderAnimation: canReceivePlus() && !receivedPlus()
                  }, _$p));
                  return _el$35;
                })(), (() => {
                  const _el$36 = libs.createElement("Panel", {
                      id: "Reward",
                      "class": "BottomTwo"
                    }, null),
                    _el$37 = libs.createElement("Image", {
                      id: "Lock"
                    }, _el$36),
                    _el$38 = libs.createElement("Image", {
                      hittest: false
                    }, _el$36);
                  libs.setProp(_el$36, "onactivate", () => {
                    if (!receivedPlus() && canReceivePlus()) {
                      CallActionRequest("/v1/activity/receive_rewards", {
                        activity_id: Number(activityID()),
                        reward_id: growthRewards[i() + 1].reward_id
                      }, () => {});
                    }
                  });
                  libs.insert(_el$36, libs.createComponent(StoreItem.StoreItemBlock, {
                    get classList() {
                      return {
                        black: receivedPlus()
                      };
                    },
                    get item_id() {
                      return bottomItem2[0];
                    },
                    get rarity() {
                      return GetServiceItemRarity(bottomItem2[0]);
                    },
                    get amounts() {
                      return toFiniteNumber(bottomItem2[1]);
                    }
                  }), _el$37);
                  libs.effect(_p$ => {
                    const _v$10 = {
                        Hide: receivedPlus() || canReceivePlus()
                      },
                      _v$11 = {
                        Received: receivedPlus()
                      };
                    _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$37, "classList", _v$10, _p$._v$10));
                    _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$38, "classList", _v$11, _p$._v$11));
                    return _p$;
                  }, {
                    _v$10: undefined,
                    _v$11: undefined
                  });
                  return _el$36;
                })(), (() => {
                  const _el$39 = libs.createElement("Panel", {
                    "class": "BottomTwo",
                    hittest: false
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$39, "classList", {
                    RewardBoraderAnimation: canReceivePlus() && !receivedPlus()
                  }, _$p));
                  return _el$39;
                })(), (() => {
                  const _el$40 = libs.createElement("Panel", {
                    "class": "BottomTwo",
                    hittest: false
                  }, null);
                  libs.setProp(_el$40, "style", {
                    animationDelay: "0.9s"
                  });
                  libs.effect(_$p => libs.setProp(_el$40, "classList", {
                    RewardBoraderAnimation: canReceivePlus() && !receivedPlus()
                  }, _$p));
                  return _el$40;
                })()];
              }
            }), null);
            libs.effect(_p$ => {
              const _v$12 = {
                  Hide: received() || canReceive()
                },
                _v$13 = {
                  Received: received()
                },
                _v$14 = {
                  RewardBoraderAnimation: canReceive() && !received()
                },
                _v$15 = {
                  RewardBoraderAnimation: canReceive() && !received()
                },
                _v$16 = rewardConfig.num;
              _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$25, "classList", _v$12, _p$._v$12));
              _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$26, "classList", _v$13, _p$._v$13));
              _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$27, "classList", _v$14, _p$._v$14));
              _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$28, "classList", _v$15, _p$._v$15));
              _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$30, "text", _v$16, _p$._v$16));
              return _p$;
            }, {
              _v$12: undefined,
              _v$13: undefined,
              _v$14: undefined,
              _v$15: undefined,
              _v$16: undefined
            });
            return _el$23;
          })();
        }
      }
    }), null);
    libs.insert(_el$22, libs.createComponent(EOM_Button.EOM_Button, {
      id: "ReceiveAllBtn",
      get classList() {
        return {
          Plus: plus() == 1,
          NoPlus: plus() == 0
        };
      },
      get enabled() {
        return hasAnyUnreceived()[params.activityID];
      },
      text: "#Activity_ReceiveALl",
      onactivate: () => {
        CallActionRequest("/v1/activity/batch_receive_rewards", {
          activity_id: Number(activityID())
        }, () => {});
      }
    }), null);
    libs.insert(_el$22, libs.createComponent(libs.Show, {
      get when() {
        return !plus();
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          id: "BuyPlusBtn",
          get enabled() {
            return !plus();
          },
          color: "Gold",
          text: "#Fund_BuyPlus",
          onactivate: () => {
            ClientSideEvent("directly_purchase", {
              itemid: FundPlusProductID,
              source: "growth_fund"
            });
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "#Info_" + activityID(),
        _v$2 = "#Introduction_" + activityID(),
        _v$3 = Math.min(progress(), currentFundMaxValue),
        _v$4 = "#LevelInfo_" + activityID(),
        _v$5 = {
          clip: `rect( 0%, ${Math.min(progress(), currentFundMaxValue) / currentMaxProgress * 100}%, 100%, 0% )`
        },
        _v$6 = Math.min(progress(), currentFundMaxValue) + "/" + currentMaxProgress,
        _v$7 = {
          Hide: growth_fund_activity_data().plus
        },
        _v$8 = {
          PlusTip: plus() == 0
        },
        _v$9 = "#PlusTipText_" + activityID();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "tooltip_text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "style", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$18, "classList", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$20, "classList", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$21, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$;
  })();
}

function parseReceiveDetails(rawDetails) {
  if (typeof rawDetails !== "string" || rawDetails === "") return [];
  try {
    const details = JSON.parse(rawDetails);
    if (!Array.isArray(details)) return [];
    return details.map(rewards => Array.isArray(rewards) ? rewards.filter(reward => typeof reward?.item_id === "number" && typeof reward?.amounts === "number") : []);
  } catch {
    return [];
  }
}
const ASSET_ROOT = "file://{images}/custom_game/m5_moonstore-wish";
const DISPLAY_ACTIVITY_ID = 902;
const DEFAULT_PAYMENT_ACTIVITY_ID = 1101;
const DRAW_REWARD_ITEM_ID = 110026;
const MOONSTONE_TICKET_ID = 190007;
const DRAW_ROLL_COUNT = 8;
const DRAW_ROLL_INTERVAL = 0.09;
const moonstonePaymentActivityData = solid_utils.createServiceNetData("player_payment_activity_data", {});
const moonstonePlayerTokens = solid_utils.createServiceNetData("player_tokens", {});
const moonstoneShopProductLimits = solid_utils.createServiceNetData("player_shop_product_limits", {});
const canDrawMoonstoneWish = libs.createMemo(() => {
  const drawCount = Number(moonstonePaymentActivityData()[String(DEFAULT_PAYMENT_ACTIVITY_ID)]?.step ?? 0);
  const drawTotal = Object.values(KeyValues.activity_moonstone[String(DISPLAY_ACTIVITY_ID)] ?? {}).filter(tier => tier.num < 99999999).length;
  const ticketCount = Number(moonstonePlayerTokens()[String(MOONSTONE_TICKET_ID)]?.amounts ?? 0);
  return ticketCount >= 1 && drawCount < drawTotal;
});
const canClaimMoonstoneExchangeDaily = libs.createMemo(() => {
  const now = CustomUIConfig.GetServerTimeStamp();
  return Object.values(KeyValues.info_shop_product).some(product => {
    const isMoonDrawDailyFreebie = String(product.tag ?? "").split("|").includes("MoonDraw") && product.hide === 0 && product.real_price === 0;
    const isActive = (product.start_time === 0 || product.start_time < now) && (product.end_time === 0 || product.end_time > now);
    const purchaseCount = moonstoneShopProductLimits()[product.id] ?? 0;
    const hasReachedLimit = product.limit_type > 0 && purchaseCount >= product.limit_count;
    return isMoonDrawDailyFreebie && isActive && !hasReachedLimit;
  });
});
const DEFAULT_ACTIVITY_DATA = {
  received: "",
  extra_num: 0,
  total_num: 0,
  round: 0
};
const ActivityMoonstone = props => {
  const activityID = () => props.activityID ?? DISPLAY_ACTIVITY_ID;
  const paymentActivityID = () => props.paymentActivityID ?? DEFAULT_PAYMENT_ACTIVITY_ID;
  const activityData = libs.createMemo(() => KeyValues.activity_data[activityID()]);
  const drawTotal = libs.createMemo(() => Object.values(KeyValues.activity_moonstone[String(activityID())] ?? {}).filter(tier => tier.num < 99999999).length);
  const rechargeProducts = libs.createMemo(() => Object.values(KeyValues.info_shop_product).filter(product => String(product.tag ?? "").split("|").includes("Resource") && product.pay_type === 0 && product.hide === 0).sort((left, right) => left.real_price - right.real_price));
  const playerMoonstoneActivityData = solid_utils.createServiceNetData("player_moonstone_activity_data", {});
  const [claimingRewardID, setClaimingRewardID] = libs.createSignal();
  const [drawingRewardID, setDrawingRewardID] = libs.createSignal();
  const [lastDrawResult, setLastDrawResult] = libs.createSignal();
  const [rollingDigits, setRollingDigits] = libs.createSignal();
  const [drawResultReveal, setDrawResultReveal] = libs.createSignal(false);
  const [immediateReceiveDetails, setImmediateReceiveDetails] = libs.createSignal();
  const [immediatePaymentStep, setImmediatePaymentStep] = libs.createSignal();
  const [confirmedRewardIDs, setConfirmedRewardIDs] = libs.createSignal([]);
  let drawRollSchedule;
  let initialRewardTrackSchedule;
  let hasPositionedInitialRewardTrack = false;
  let rewardTrackLoaded = false;
  const rewardTierPanels = [];
  const tiers = libs.createMemo(() => {
    const configured = Object.values(KeyValues.activity_moonstone[String(activityID())] ?? {});
    return configured.filter(tier => tier.num < 99999999).sort((a, b) => a.num - b.num);
  });
  const playerActivityData = libs.createMemo(() => playerMoonstoneActivityData()[String(activityID())] ?? DEFAULT_ACTIVITY_DATA);
  const paymentActivityData = libs.createMemo(() => moonstonePaymentActivityData()[String(paymentActivityID())]);
  const currentDrawCount = libs.createMemo(() => immediatePaymentStep() ?? Number(paymentActivityData()?.step ?? 0));
  const nextDrawRewardID = libs.createMemo(() => currentDrawCount() + 1);
  const previewRewardID = libs.createMemo(() => drawingRewardID() ?? nextDrawRewardID());
  const drawRewardPreview = libs.createMemo(() => {
    if (previewRewardID() > drawTotal()) return undefined;
    const row = KeyValues.activity_payment_rewards[String(paymentActivityID())]?.[String(previewRewardID())];
    if (row?.activity_id !== paymentActivityID() || row.reward_num !== previewRewardID() || typeof row.rewards !== "string") return undefined;
    const rewards = row.rewards.split("-").map(entry => entry.split(";").map(Number));
    if (rewards.some(entry => entry.length !== 3 || entry[0] !== DRAW_REWARD_ITEM_ID || !Number.isSafeInteger(entry[1]) || entry[1] <= 0 || !Number.isFinite(entry[2]) || entry[2] < 0)) return undefined;
    const possibleRewards = rewards.filter(entry => entry[2] > 0);
    const totalWeight = possibleRewards.reduce((sum, entry) => sum + entry[2], 0);
    if (!Number.isFinite(totalWeight) || totalWeight <= 0) return undefined;
    return {
      min: Math.min(...possibleRewards.map(entry => entry[1])),
      max: Math.max(...possibleRewards.map(entry => entry[1])),
      tooltip: possibleRewards.map(entry => LocalizeWithVars("#MoonstoneWish_DrawDetail", {
        amount: entry[1],
        chance: (entry[2] / totalWeight * 100).toFixed(2)
      })).concat(GetLocalization("#MoonstoneWish_DrawProbabilityNote")).join("<br>")
    };
  });
  const receiveDetails = libs.createMemo(() => immediateReceiveDetails() ?? parseReceiveDetails(paymentActivityData()?.receive_details));
  const ticketCount = libs.createMemo(() => Number(moonstonePlayerTokens()[String(MOONSTONE_TICKET_ID)]?.amounts ?? 0));
  const canReceiveDrawReward = libs.createMemo(() => drawingRewardID() === undefined && nextDrawRewardID() <= drawTotal() && ticketCount() >= 1);
  const rechargeProgress = () => Number(playerActivityData().extra_num ?? 0);
  const rechargeTip = product => {
    const language = Language();
    const price = language === "english" ? product.overseas_realprice : language === "russian" ? product.russia_realprice : product.real_price;
    const currency = language === "english" ? "$" : language === "russian" ? "₽" : "¥";
    return LocalizeWithVars("#MoonstoneWish_RechargeTip", {
      currency,
      price,
      points: product.real_price
    });
  };
  const rechargeTooltipText = libs.createMemo(() => rechargeProducts().map(rechargeTip).join("<br>"));
  const receivedRewardIDs = libs.createMemo(() => {
    const received = playerActivityData().received;
    return Array.isArray(received) ? received.map(Number) : String(received ?? "").split(",").filter(Boolean).map(Number);
  });
  const finalTier = libs.createMemo(() => tiers()[tiers().length - 1]);
  const nextTier = libs.createMemo(() => tiers().find(tier => tier.num > rechargeProgress()));
  const poolConfig = libs.createMemo(() => {
    const [item, amount] = Object.entries(nextTier()?.rewards ?? {})[0] ?? ["0", 0];
    return {
      item: Number(item),
      amount
    };
  });
  const tierState = tier => {
    if (receivedRewardIDs().includes(tier.reward_id) || confirmedRewardIDs().includes(tier.reward_id)) return "Received";
    return rechargeProgress() >= tier.num ? "Claimable" : "Locked";
  };
  const getInitialRewardTrackIndex = () => {
    const tierList = tiers();
    const claimableIndex = tierList.findIndex(tier => tierState(tier) === "Claimable");
    if (claimableIndex !== -1) return claimableIndex;
    let lastReceivedIndex = -1;
    tierList.forEach((tier, index) => {
      if (tierState(tier) === "Received") lastReceivedIndex = index;
    });
    return Math.min(lastReceivedIndex + 1, tierList.length - 1);
  };
  const scheduleInitialRewardTrackPosition = () => {
    if (!rewardTrackLoaded || hasPositionedInitialRewardTrack || initialRewardTrackSchedule !== undefined) return;
    initialRewardTrackSchedule = $.Schedule(0, () => {
      initialRewardTrackSchedule = undefined;
      if (hasPositionedInitialRewardTrack) return;
      const targetPanel = rewardTierPanels[getInitialRewardTrackIndex()];
      if (!targetPanel?.IsValid()) return;
      targetPanel.ScrollParentToMakePanelFit(3, true);
      hasPositionedInitialRewardTrack = true;
    });
  };
  libs.createEffect(() => {
    tiers();
    receivedRewardIDs();
    rechargeProgress();
    scheduleInitialRewardTrackPosition();
  });
  const receiveTierReward = tier => {
    if (tierState(tier) !== "Claimable" || claimingRewardID() !== undefined) return;
    setClaimingRewardID(tier.reward_id);
    CallActionRequest("/v1/activity/receive_rewards", {
      activity_id: activityID(),
      reward_id: tier.reward_id
    }, result => {
      if ((result?.code === 0 || result?.code === 200) && !receivedRewardIDs().includes(tier.reward_id)) {
        setConfirmedRewardIDs(ids => [...ids, tier.reward_id]);
      }
      setClaimingRewardID(undefined);
    }, () => setClaimingRewardID(undefined));
  };
  const clearDrawRollSchedule = () => {
    if (drawRollSchedule === undefined) return;
    $.CancelScheduled(drawRollSchedule);
    drawRollSchedule = undefined;
  };
  const formatDrawDigits = amount => String(Math.max(0, Math.floor(amount))).padStart(5, "0").split("");
  const playDrawResult = amount => {
    clearDrawRollSchedule();
    setDrawResultReveal(false);
    let rollIndex = 0;
    const roll = () => {
      if (rollIndex < DRAW_ROLL_COUNT) {
        setRollingDigits(Array.from({
          length: 5
        }, (_, index) => String((amount + rollIndex * (3 + index) + index * 3) % 10)));
        rollIndex += 1;
        drawRollSchedule = $.Schedule(DRAW_ROLL_INTERVAL, roll);
        return;
      }
      setRollingDigits(undefined);
      setLastDrawResult(amount);
      setDrawResultReveal(true);
      drawRollSchedule = $.Schedule(0.3, () => {
        drawRollSchedule = undefined;
        setDrawResultReveal(false);
        setDrawingRewardID(undefined);
      });
    };
    roll();
  };
  const receiveDrawReward = () => {
    const rewardID = nextDrawRewardID();
    if (drawingRewardID() !== undefined || rewardID > drawTotal()) return;
    setDrawingRewardID(rewardID);
    CallActionRequest("/v1/activity/receive_rewards", {
      activity_id: paymentActivityID(),
      reward_id: rewardID
    }, result => {
      const responseData = result.data;
      const paymentActivity = responseData.player_payment_activity_data?.find(data => data.activity_id === paymentActivityID());
      if (paymentActivity?.receive_details != undefined) {
        setImmediateReceiveDetails(parseReceiveDetails(paymentActivity.receive_details));
      }
      if (paymentActivity?.step != undefined) {
        setImmediatePaymentStep(paymentActivity.step);
      }
      const commonItems = result?.data?.add_items?.common;
      const moonstoneReward = Array.isArray(commonItems) ? commonItems.find(item => item.item_id === DRAW_REWARD_ITEM_ID && Number.isFinite(item.amounts)) : undefined;
      if (moonstoneReward?.amounts === undefined) {
        setDrawingRewardID(undefined);
        return;
      }
      playDrawResult(moonstoneReward.amounts);
    }, () => {
      setDrawingRewardID(undefined);
    });
  };
  const segmentProgress = index => {
    const end = tiers()[index]?.num ?? 0;
    const start = index === 0 ? 0 : tiers()[index - 1]?.num ?? 0;
    if (end <= start) return rechargeProgress() >= end ? 100 : 0;
    return Math.max(0, Math.min(100, (rechargeProgress() - start) / (end - start) * 100));
  };
  const displayDigits = libs.createMemo(() => rollingDigits() ?? formatDrawDigits(lastDrawResult() ?? 0));
  libs.onCleanup(() => {
    clearDrawRollSchedule();
    if (initialRewardTrackSchedule !== undefined) $.CancelScheduled(initialRewardTrackSchedule);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "ActivityMoonstoneRoot",
      "class": "RootContainer"
    }, null);
    libs.insert(_el$, libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
      get children() {
        const _el$2 = libs.createElement("Panel", {
            id: "MoonstoneWishContent",
            flowChildren: "down"
          }, null),
          _el$3 = libs.createElement("Panel", {
            id: "MoonstoneWishTop"
          }, _el$2),
          _el$4 = libs.createElement("Panel", {
            id: "MoonstoneWishTitleArea"
          }, _el$3);
          libs.createElement("Image", {
            id: "MoonstoneWishTitle"
          }, _el$4);
          const _el$6 = libs.createElement("Panel", {
            id: "MoonstoneWishTitleTime"
          }, _el$4);
          libs.createElement("Image", {
            id: "MoonstoneWishTitleTimeBG",
            hittest: false
          }, _el$6);
          const _el$8 = libs.createElement("Panel", {
            id: "MoonstoneWishTitleTimeContent",
            flowChildren: "right"
          }, _el$6),
          _el$9 = libs.createElement("Image", {
            id: "MoonstoneWishRulesIcon",
            hittest: true
          }, _el$8),
          _el$1 = libs.createElement("Panel", {
            id: "MoonstoneWishHistory"
          }, _el$3),
          _el$10 = libs.createElement("Panel", {
            id: "MoonstoneWishHistoryTitle"
          }, _el$1);
          libs.createElement("Image", {
            "class": "MoonstoneWishTitleLine"
          }, _el$10);
          const _el$12 = libs.createElement("Label", {
            get text() {
              return GetLocalization("#MoonstoneWish_History");
            }
          }, _el$10);
          libs.createElement("Image", {
            "class": "MoonstoneWishTitleLine Right"
          }, _el$10);
          const _el$14 = libs.createElement("Panel", {
            id: "MoonstoneWishRecords",
            flowChildren: "down",
            scroll: "y"
          }, _el$1),
          _el$15 = libs.createElement("Panel", {
            id: "MoonstoneWishMiddle"
          }, _el$2),
          _el$16 = libs.createElement("Panel", {
            id: "MoonstoneWishBoard"
          }, _el$15),
          _el$17 = libs.createElement("Panel", {
            id: "MoonstoneWishDrawInfo"
          }, _el$16),
          _el$18 = libs.createElement("Label", {
            id: "MoonstoneWishDrawCount",
            get text() {
              return LocalizeWithVars("#MoonstoneWish_DrawCount", {
                current: currentDrawCount(),
                total: drawTotal()
              });
            }
          }, _el$17);
          libs.createElement("Image", {
            id: "MoonstoneWishDivider"
          }, _el$17);
          const _el$20 = libs.createElement("Panel", {
            id: "MoonstoneWishRange"
          }, _el$16);
          libs.createElement("Image", {
            hittest: false
          }, _el$20);
          const _el$23 = libs.createElement("Panel", {
            id: "MoonstoneWishDigits",
            flowChildren: "right",
            get ["class"]() {
              return `MoonstoneWishDigits ${rollingDigits() !== undefined ? "Rolling" : ""} ${drawResultReveal() ? "Reveal" : ""}`;
            }
          }, _el$16),
          _el$26 = libs.createElement("Panel", {
            id: "MoonstoneWishBottom"
          }, _el$2),
          _el$27 = libs.createElement("Panel", {
            id: "MoonstoneWishRechargeProgress"
          }, _el$26),
          _el$28 = libs.createElement("Panel", {
            id: "MoonstoneWishRewardTrack",
            flowChildren: "right",
            scroll: "x"
          }, _el$27),
          _el$29 = libs.createElement("Panel", {
            id: "MoonstoneWishRechargeInfo",
            flowChildren: "down"
          }, _el$27),
          _el$30 = libs.createElement("Panel", {
            id: "MoonstoneWishRechargeTitle"
          }, _el$29);
          libs.createElement("Image", {}, _el$30);
          const _el$32 = libs.createElement("Label", {
            get text() {
              return GetLocalization("#MoonstoneWish_Recharge");
            }
          }, _el$30),
          _el$33 = libs.createElement("Label", {
            id: "MoonstoneWishRechargeValue",
            get text() {
              return LocalizeWithVars("#MoonstoneWish_RechargeValue", {
                current: rechargeProgress(),
                total: finalTier()?.num ?? 0
              });
            }
          }, _el$29),
          _el$34 = libs.createElement("Panel", {
            id: "MoonstoneWishRechargeHint"
          }, _el$26),
          _el$35 = libs.createElement("Label", {
            id: "MoonstoneWishRechargeHintText",
            get text() {
              return LocalizeWithVars("#MoonstoneWish_RechargeHint", {
                value: Math.max(0, (nextTier()?.num ?? rechargeProgress()) - rechargeProgress())
              });
            }
          }, _el$34),
          _el$36 = libs.createElement("Panel", {
            id: "MoonstoneWishRechargeReward",
            flowChildren: "right"
          }, _el$34);
        libs.setProp(_el$2, "flowChildren", "down");
        libs.setProp(_el$8, "flowChildren", "right");
        libs.insert(_el$8, libs.createComponent(EOM_Countdown.EOM_Countdown, {
          icon: true,
          text: "#MoonstoneWish_TimeLimit",
          get endTime() {
            return activityData()?.end_time ?? 0;
          }
        }), _el$9);
        libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "MoonstoneWishExchange",
          get classList() {
            return {
              MoonstoneWishExchangeClaimable: canClaimMoonstoneExchangeDaily()
            };
          },
          onactivate: () => props.setShowExchangeStore(true),
          get children() {
            return [(() => {
              const _el$0 = libs.createElement("Label", {
                get text() {
                  return GetLocalization("#MoonstoneWish_Exchange");
                },
                hittest: false
              }, null);
              libs.effect(_$p => libs.setProp(_el$0, "text", GetLocalization("#MoonstoneWish_Exchange"), _$p));
              return _el$0;
            })(), libs.createComponent(libs.Show, {
              get when() {
                return canClaimMoonstoneExchangeDaily();
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                  "class": "MoonstoneWishButtonRedMark",
                  size: "large",
                  breathe: true
                });
              }
            })];
          }
        }), _el$1);
        libs.setProp(_el$14, "flowChildren", "down");
        libs.setProp(_el$14, "scroll", "y");
        libs.insert(_el$14, libs.createComponent(libs.For, {
          get each() {
            return [...receiveDetails()].reverse();
          },
          children: (rewards, index) => (() => {
            const _el$39 = libs.createElement("Panel", {
                "class": "MoonstoneWishRecord",
                flowChildren: "right"
              }, null),
              _el$40 = libs.createElement("Label", {
                "class": "MoonstoneWishRecordRound",
                get text() {
                  return LocalizeWithVars("#MoonstoneWish_RecordRound", {
                    value: receiveDetails().length - index()
                  });
                }
              }, _el$39);
            libs.setProp(_el$39, "flowChildren", "right");
            libs.insert(_el$39, libs.createComponent(libs.For, {
              each: rewards,
              children: reward => [libs.createComponent(StoreItem.StoreItemImage, {
                get itemid() {
                  return reward.item_id;
                }
              }), (() => {
                const _el$41 = libs.createElement("Label", {
                  get text() {
                    return `×${reward.amounts}`;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$41, "text", `×${reward.amounts}`, _$p));
                return _el$41;
              })()]
            }), null);
            libs.effect(_$p => libs.setProp(_el$40, "text", LocalizeWithVars("#MoonstoneWish_RecordRound", {
              value: receiveDetails().length - index()
            }), _$p));
            return _el$39;
          })()
        }));
        libs.insert(_el$20, libs.createComponent(libs.Show, {
          get when() {
            return drawRewardPreview();
          },
          keyed: true,
          get fallback() {
            return (() => {
              const _el$42 = libs.createElement("Label", {
                hittest: false,
                get text() {
                  return GetLocalization(previewRewardID() > drawTotal() ? "#MoonstoneWish_DrawComplete" : "#MoonstoneWish_DrawUnavailable");
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$42, "text", GetLocalization(previewRewardID() > drawTotal() ? "#MoonstoneWish_DrawComplete" : "#MoonstoneWish_DrawUnavailable"), _$p));
              return _el$42;
            })();
          },
          get children() {
            const _el$22 = libs.createElement("Label", {
              get text() {
                return LocalizeWithVars("#MoonstoneWish_DrawRange", {
                  min: drawRewardPreview().min,
                  max: drawRewardPreview().max
                });
              }
            }, null);
            libs.effect(_p$ => {
              const _v$ = LocalizeWithVars("#MoonstoneWish_DrawRange", {
                  min: drawRewardPreview().min,
                  max: drawRewardPreview().max
                }),
                _v$2 = {
                  name: "text",
                  text: drawRewardPreview().tooltip
                };
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$22, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$22, "customTooltip", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$22;
          }
        }), null);
        libs.setProp(_el$23, "flowChildren", "right");
        libs.insert(_el$23, libs.createComponent(libs.For, {
          get each() {
            return displayDigits();
          },
          children: digit => (() => {
            const _el$43 = libs.createElement("Panel", {
                "class": "MoonstoneWishDigitCard"
              }, null),
              _el$44 = libs.createElement("Image", {
                "class": "MoonstoneWishDigit",
                width: "76px",
                height: "120px",
                src: `${ASSET_ROOT}/m5_nub_${digit}.png`
              }, _el$43);
            libs.setProp(_el$44, "width", "76px");
            libs.setProp(_el$44, "height", "120px");
            libs.setProp(_el$44, "src", `${ASSET_ROOT}/m5_nub_${digit}.png`);
            return _el$43;
          })()
        }));
        libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "MoonstoneWishDrawButton",
          get classList() {
            return {
              MoonstoneWishDrawButtonClaimable: canReceiveDrawReward()
            };
          },
          get enabled() {
            return canReceiveDrawReward();
          },
          onactivate: receiveDrawReward,
          get children() {
            return [(() => {
              const _el$24 = libs.createElement("Label", {
                id: "MoonstoneWishDrawText",
                get text() {
                  return GetLocalization("#MoonstoneWish_DrawOnce");
                },
                html: true
              }, null);
              libs.effect(_$p => libs.setProp(_el$24, "text", GetLocalization("#MoonstoneWish_DrawOnce"), _$p));
              return _el$24;
            })(), libs.createComponent(Player.CurrencyIcon, {
              id: "MoonstoneWishTicketCoin",
              tokenID: MOONSTONE_TICKET_ID
            }), libs.createElement("Label", {
              id: "MoonstoneWishTicketCount",
              text: "1"
            }, null), libs.createComponent(libs.Show, {
              get when() {
                return canDrawMoonstoneWish();
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                  "class": "MoonstoneWishButtonRedMark",
                  size: "large",
                  breathe: true
                });
              }
            })];
          }
        }), null);
        libs.setProp(_el$28, "flowChildren", "right");
        libs.setProp(_el$28, "scroll", "x");
        libs.setProp(_el$28, "onload", () => {
          rewardTrackLoaded = true;
          scheduleInitialRewardTrackPosition();
        });
        libs.insert(_el$28, libs.createComponent(libs.For, {
          get each() {
            return tiers();
          },
          children: (tier, index) => {
            const state = () => tierState(tier);
            const [rewardID, rewardAmount] = Object.entries(tier.rewards)[0] ?? ["0", 0];
            return (() => {
              const _el$45 = libs.createElement("Panel", {}, null),
                _el$46 = libs.createElement("Panel", {
                  "class": "MoonstoneWishSegment",
                  hittest: false,
                  hittestchildren: false
                }, _el$45),
                _el$50 = libs.createElement("Label", {
                  "class": "MoonstoneWishMilestoneValue",
                  get text() {
                    return LocalizeWithVars("#MoonstoneWish_Number", {
                      value: tier.num
                    });
                  },
                  hittest: false
                }, _el$45);
              libs.use(panel => {
                rewardTierPanels[index()] = panel;
              }, _el$45);
              libs.insert(_el$46, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
                "class": "EOM_ProgressBar MoonstoneWishSegmentProgress",
                get value() {
                  return segmentProgress(index());
                }
              }));
              libs.insert(_el$45, libs.createComponent(EOM_Button.EOM_BaseButton, {
                "class": "MoonstoneWishMilestoneRing",
                onactivate: () => receiveTierReward(tier),
                get children() {
                  return [libs.createComponent(StoreItem.StoreItemImage, {
                    "class": "MoonstoneWishRewardIcon",
                    get itemid() {
                      return Number(rewardID);
                    },
                    hittest: false
                  }), (() => {
                    const _el$47 = libs.createElement("Label", {
                      "class": "MoonstoneWishRewardAmount",
                      get text() {
                        return String(rewardAmount);
                      },
                      hittest: false
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$47, "text", String(rewardAmount), _$p));
                    return _el$47;
                  })(), libs.createElement("Image", {
                    "class": "MoonstoneWishRewardReceivedIcon",
                    hittest: false
                  }, null), (() => {
                    const _el$49 = libs.createElement("Image", {
                      "class": "MoonstoneWishClaimableGlow",
                      hittest: false
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$49, "visible", state() === "Claimable", _$p));
                    return _el$49;
                  })()];
                }
              }), _el$50);
              libs.effect(_p$ => {
                const _v$1 = {
                    MoonstoneWishMilestone: true,
                    Received: state() === "Received",
                    Claimable: state() === "Claimable",
                    Claiming: claimingRewardID() === tier.reward_id,
                    Locked: state() === "Locked"
                  },
                  _v$10 = LocalizeWithVars("#MoonstoneWish_Number", {
                    value: tier.num
                  });
                _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$45, "classList", _v$1, _p$._v$1));
                _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$50, "text", _v$10, _p$._v$10));
                return _p$;
              }, {
                _v$1: undefined,
                _v$10: undefined
              });
              return _el$45;
            })();
          }
        }));
        libs.setProp(_el$29, "flowChildren", "down");
        libs.setProp(_el$36, "flowChildren", "right");
        libs.insert(_el$36, libs.createComponent(libs.Show, {
          get when() {
            return poolConfig().item > 0;
          },
          get children() {
            return [libs.createComponent(Player.CurrencyIcon, {
              get tokenID() {
                return poolConfig().item;
              }
            }), (() => {
              const _el$37 = libs.createElement("Label", {
                get text() {
                  return LocalizeWithVars("#MoonstoneWish_Number", {
                    value: poolConfig().amount
                  });
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$37, "text", LocalizeWithVars("#MoonstoneWish_Number", {
                value: poolConfig().amount
              }), _$p));
              return _el$37;
            })()];
          }
        }));
        libs.insert(_el$34, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "MoonstoneWishRechargeButton",
          onactivate: () => JumpToMenu({
            window_name: "store",
            menu: "Resource",
            force: true
          }),
          get children() {
            const _el$38 = libs.createElement("Label", {
              get text() {
                return GetLocalization("#MoonstoneWish_TopUp");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$38, "text", GetLocalization("#MoonstoneWish_TopUp"), _$p));
            return _el$38;
          }
        }), null);
        libs.effect(_p$ => {
          const _v$3 = {
              name: "text",
              text: GetLocalization("#MoonstoneWish_Rules")
            },
            _v$4 = GetLocalization("#MoonstoneWish_History"),
            _v$5 = LocalizeWithVars("#MoonstoneWish_DrawCount", {
              current: currentDrawCount(),
              total: drawTotal()
            }),
            _v$6 = `MoonstoneWishDigits ${rollingDigits() !== undefined ? "Rolling" : ""} ${drawResultReveal() ? "Reveal" : ""}`,
            _v$7 = {
              name: "text",
              text: rechargeTooltipText()
            },
            _v$8 = GetLocalization("#MoonstoneWish_Recharge"),
            _v$9 = LocalizeWithVars("#MoonstoneWish_RechargeValue", {
              current: rechargeProgress(),
              total: finalTier()?.num ?? 0
            }),
            _v$0 = LocalizeWithVars("#MoonstoneWish_RechargeHint", {
              value: Math.max(0, (nextTier()?.num ?? rechargeProgress()) - rechargeProgress())
            });
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "customTooltip", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$23, "class", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$29, "customTooltip", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$32, "text", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$33, "text", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$35, "text", _v$0, _p$._v$0));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined,
          _v$6: undefined,
          _v$7: undefined,
          _v$8: undefined,
          _v$9: undefined,
          _v$0: undefined
        });
        return _el$2;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(ExchangeStore.ExchangeStore, {
      tag: "MoonDraw",
      get show() {
        return props.showExchangeStore;
      },
      onclose: () => props.setShowExchangeStore(false)
    }), null);
    return _el$;
  })();
};

const ID = 101;
const rewards = Object.entries(KeyValues.activity_login[ID]).map(([day, reward]) => {
  let [item_id, amounts] = reward.rewards.split(":");
  return {
    item_id: Number(item_id),
    amounts: Number(amounts),
    day: Number(day)
  };
});
const player_login_activity_data$1 = solid_utils.createServiceNetTableDataStore("player_login_activity_data", Game.GetLocalPlayerID());
const login_data = libs.createMemo(() => player_login_activity_data$1?.[ID]);
var ReceiveState = function (ReceiveState) {
  ReceiveState[ReceiveState["WaitReceive"] = 0] = "WaitReceive";
  ReceiveState[ReceiveState["CanReceive"] = 1] = "CanReceive";
  ReceiveState[ReceiveState["Received"] = 2] = "Received";
  return ReceiveState;
}(ReceiveState || {});
libs.createEffect(() => {
  let anyCanReceive = false;
  for (let i = 0; i < 7; i++) {
    let day = i + 1;
    const state = (() => {
      if (!login_data()) return ReceiveState.WaitReceive;
      if (day <= login_data().step) {
        return ReceiveState.Received;
      }
      if (login_data().next_can_receive && day == login_data().step + 1) {
        return ReceiveState.CanReceive;
      }
      return ReceiveState.WaitReceive;
    })();
    if (state == ReceiveState.CanReceive) {
      anyCanReceive = true;
      break;
    }
  }
  CustomUIConfig.SetRedPoint(anyCanReceive, "activity", "seven_days");
});
function SevenDaysRoot() {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "SevenDaysRoot"
      }, null);
      libs.createElement("Image", {
        id: "MainBg",
        hittest: false
      }, _el$);
      libs.createElement("Image", {
        id: "DrawIllust",
        hittest: false
      }, _el$);
      libs.createElement("Image", {
        id: "TitleImg",
        hittest: false
      }, _el$);
      const _el$5 = libs.createElement("Panel", {
        id: "SevenDaysList"
      }, _el$);
    libs.insert(_el$5, libs.createComponent(libs.For, {
      each: rewards,
      children: (reward, index) => {
        let day = index() + 1;
        const state = () => {
          if (!login_data()) return ReceiveState.WaitReceive;
          if (day <= login_data().step) {
            return ReceiveState.Received;
          }
          if (login_data().next_can_receive && day == login_data().step + 1) {
            return ReceiveState.CanReceive;
          }
          return ReceiveState.WaitReceive;
        };
        const isGold = reward.item_id.toString().startsWith("190") && reward.amounts >= 10;
        const stateClass = () => {
          switch (state()) {
            case ReceiveState.WaitReceive:
              return "WaitReceive";
            case ReceiveState.CanReceive:
              return "CanReceive";
            case ReceiveState.Received:
              return "Received";
          }
        };
        const [showReceiveParticle, setShowReceiveParticle] = libs.createSignal(false);
        return (() => {
          const _el$6 = libs.createElement("Panel", {}, null);
            libs.createElement("Image", {
              "class": "PanelBg",
              hittest: false
            }, _el$6);
            const _el$9 = libs.createElement("Panel", {
              hittest: false
            }, _el$6);
            libs.createElement("Label", {
              id: "nth",
              text: "#nth"
            }, _el$9);
            libs.createElement("Image", {
              hittest: false
            }, _el$9);
            libs.createElement("Label", {
              id: "day",
              text: "#day"
            }, _el$9);
          libs.insert(_el$6, libs.createComponent(libs.Show, {
            get when() {
              return state() == ReceiveState.Received;
            },
            get children() {
              return libs.createElement("Image", {
                "class": "ReceivedMask",
                hittest: false
              }, null);
            }
          }), _el$9);
          libs.insert(_el$6, libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return reward.item_id;
            },
            get amounts() {
              return reward.amounts;
            }
          }), null);
          libs.insert(_el$6, libs.createComponent(libs.Show, {
            get when() {
              return state() == ReceiveState.Received;
            },
            get children() {
              return libs.createElement("Image", {
                id: "ReceivedTick",
                hittest: false
              }, null);
            }
          }), null);
          libs.insert(_el$6, libs.createComponent(libs.Show, {
            get when() {
              return state() == ReceiveState.CanReceive;
            },
            get fallback() {
              return (() => {
                const _el$15 = libs.createElement("Image", {
                    hittest: false
                  }, null),
                  _el$16 = libs.createElement("Label", {
                    get text() {
                      return state() == ReceiveState.Received ? "#TaskFinished" : "#WaitReceive";
                    }
                  }, _el$15);
                libs.effect(_p$ => {
                  const _v$3 = libs.classNames("FrameImg", {
                      Received: state() == ReceiveState.Received
                    }),
                    _v$4 = state() == ReceiveState.Received ? "#TaskFinished" : "#WaitReceive";
                  _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "className", _v$3, _p$._v$3));
                  _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "text", _v$4, _p$._v$4));
                  return _p$;
                }, {
                  _v$3: undefined,
                  _v$4: undefined
                });
                return _el$15;
              })();
            },
            get children() {
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                id: "ReceiveBtn",
                onactivate: () => {
                  CallAction("/v1/activity/receive_rewards", {
                    activity_id: ID,
                    reward_id: day
                  });
                  setShowReceiveParticle(true);
                },
                get children() {
                  return [libs.createElement("Image", {
                    id: "ReceiveBtnBg",
                    hittest: false
                  }, null), libs.createElement("Label", {
                    id: "btnText",
                    text: "#TaskReceive"
                  }, null)];
                }
              });
            }
          }), null);
          libs.insert(_el$6, libs.createComponent(libs.Show, {
            get when() {
              return state() == ReceiveState.CanReceive;
            },
            get children() {
              return libs.createElement("Image", {
                id: "RedMark",
                hittest: false
              }, null);
            }
          }), null);
          libs.effect(_p$ => {
            const _v$ = libs.classNames("SevenDaysItem", stateClass(), {
                Gold: isGold,
                Received: state() == ReceiveState.Received
              }),
              _v$2 = libs.classNames("DayNum", "Day" + day);
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "className", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$9, "className", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$6;
        })();
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "className", libs.classNames("RootContainer"), _$p));
    return _el$;
  })();
}

const player_blessings = solid_utils.createServiceNetData("player_blessings");
const purchased_product = solid_utils.createServiceNetData("player_shop_product_limits", {});
function ShopAndTask(params) {
  const player_activity_tasks = solid_utils.createServiceNetData("player_activity_tasks", {});
  libs.createEffect(() => {
    CallAction("/v1/activity/data", {
      activity_id: Number(params.activityID)
    });
  });
  const activityData = libs.createMemo(() => KeyValues.activity_data[params.activityID]);
  const config = libs.createMemo(() => SymbolSpliter(activityData().config, "|", ";"));
  const itemList = libs.createMemo(() => {
    const list = [];
    for (const itemname in KeyValues.info_shop_product) {
      const itemdata = KeyValues.info_shop_product[itemname];
      const tags = itemdata.tag.split("|");
      if (tags.includes(config().shop_tag)) {
        list.push(itemdata);
      }
    }
    return list;
  });
  const activityTasks = libs.createMemo(() => {
    return Object.values(player_activity_tasks()).filter(task => {
      let kv = KeyValues.task[task.task_id];
      if (!kv || kv.type != 6) return false;
      if (!String(task.task_id).startsWith(config().task_id)) return false;
      return true;
    }).sort((a, b) => {
      const canReceive1 = a.progress >= a.target ? 1 : 0;
      const canReceive2 = b.progress >= b.target ? 1 : 0;
      const buff_condition1 = KeyValues.task[a.task_id]?.blessing_condition ?? 0;
      const buff_condition2 = KeyValues.task[b.task_id]?.blessing_condition ?? 0;
      return multiCompare(a.receive_progress - b.receive_progress, canReceive2 - canReceive1, buff_condition2 - buff_condition1);
    });
  });
  const titleImagePath = libs.createMemo(() => {
    const lang = Language();
    let imagePath = "title_en.png";
    if (lang == "schinese") {
      imagePath = "title_cn.png";
    } else if (lang == "russian") {
      imagePath = "title_ru.png";
    }
    return getSrcPath(`activity/shop_and_task/${params.activityID}/${imagePath}`);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "ShopAndTaskRoot",
        get ["class"]() {
          return activityData().name;
        }
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "ToolOnly",
        text: "ToolOnly"
      }, _el$),
      _el$3 = libs.createElement("Image", {
        id: "BG",
        get src() {
          return getSrcPath(`activity/shop_and_task/${params.activityID}/bg.png`);
        }
      }, _el$);
    libs.insert(_el$, libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
      get children() {
        return [(() => {
          const _el$4 = libs.createElement("Panel", {
              id: "ShopAndTaskStore"
            }, null),
            _el$5 = libs.createElement("Panel", {
              id: "TitleArea"
            }, _el$4),
            _el$6 = libs.createElement("Image", {
              id: "StoreTitleImage",
              get src() {
                return titleImagePath();
              }
            }, _el$5),
            _el$7 = libs.createElement("Panel", {
              id: "TipsIcon"
            }, _el$5),
            _el$8 = libs.createElement("Panel", {
              id: "StoreTitle"
            }, _el$4),
            _el$9 = libs.createElement("Label", {
              id: "StoreTitleLabel",
              get text() {
                return "#" + activityData().name + "_title";
              }
            }, _el$8),
            _el$0 = libs.createElement("Panel", {
              id: "StoreItemContent"
            }, _el$4),
            _el$1 = libs.createElement("Panel", {
              id: "StoreItemList",
              scroll: "y",
              flowChildren: "right-wrap",
              horizontalAlign: "center"
            }, _el$0);
          libs.setProp(_el$1, "scroll", "y");
          libs.setProp(_el$1, "flowChildren", "right-wrap");
          libs.setProp(_el$1, "horizontalAlign", "center");
          libs.insert(_el$1, libs.createComponent(libs.For, {
            get each() {
              return itemList();
            },
            children: data => libs.createComponent(StoreItem.StoreItem, {
              get itemid() {
                return data.id;
              },
              get purchased_num() {
                return purchased_product()[data.id];
              }
            })
          }));
          libs.effect(_p$ => {
            const _v$ = titleImagePath(),
              _v$2 = "#ActivityTips_" + params.activityID,
              _v$3 = "#" + activityData().name + "_title";
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "src", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "tooltip", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined
          });
          return _el$4;
        })(), (() => {
          const _el$10 = libs.createElement("Panel", {
            id: "ShopAndTaskTask",
            scroll: "y",
            flowChildren: "down",
            "class": "VerticalScrollStyle"
          }, null);
          libs.setProp(_el$10, "scroll", "y");
          libs.setProp(_el$10, "flowChildren", "down");
          libs.insert(_el$10, libs.createComponent(libs.Index, {
            get each() {
              return activityTasks();
            },
            children: (task, idx) => {
              const state = () => {
                const kv = KeyValues.task[task().task_id];
                if (kv.blessing_condition > 0 && !player_blessings()?.[kv.blessing_condition]) return "Locked";
                if (task().receive_progress == 1) return "Received";
                if (task().progress >= task().target) return "CanReceive";
                return "WaitReceive";
              };
              const taskConfig = () => KeyValues.task[task().task_id];
              const DescID = () => {
                let config = taskConfig();
                if (config.task_description) {
                  return config.task_id;
                } else {
                  return config.event_id;
                }
              };
              const rewards = () => {
                const kv = KeyValues.task[task().task_id];
                if (!kv) return [];
                return Object.entries(kv.rewards).map(([id, num]) => {
                  return {
                    id: id,
                    num: num
                  };
                });
              };
              return (() => {
                const _el$11 = libs.createElement("Panel", {
                    id: "TaskRow",
                    get ["class"]() {
                      return libs.classNames(state(), {
                        Last: idx == activityTasks().length - 1
                      });
                    }
                  }, null),
                  _el$12 = libs.createElement("Image", {
                    id: "TaskIcon",
                    get src() {
                      return `file://{images}/custom_game/task_icons/${taskConfig().icon}.png`;
                    }
                  }, _el$11),
                  _el$13 = libs.createElement("Panel", {
                    flowChildren: "down",
                    marginLeft: "114px",
                    verticalAlign: "center"
                  }, _el$11),
                  _el$14 = libs.createElement("Label", {
                    color: "#968A69",
                    fontSize: "16px",
                    get text() {
                      return "#Task_Name_" + DescID();
                    }
                  }, _el$13),
                  _el$15 = libs.createElement("Label", {
                    id: "TaskDes",
                    get text() {
                      return "#Task_Desc_" + DescID();
                    },
                    get vars() {
                      return {
                        target: GetLocalization(String(taskConfig().target)),
                        v1: GetLocalization(String(taskConfig().param_1)),
                        v2: GetLocalization(String(taskConfig().param_2)),
                        v3: GetLocalization(String(taskConfig().param_3))
                      };
                    }
                  }, _el$13),
                  _el$17 = libs.createElement("Panel", {
                    id: "TaskRewardList"
                  }, _el$11);
                libs.setProp(_el$13, "flowChildren", "down");
                libs.setProp(_el$13, "marginLeft", "114px");
                libs.setProp(_el$13, "verticalAlign", "center");
                libs.insert(_el$13, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
                  id: "TaskProgress",
                  get value() {
                    return Clamp(task().progress / task().target, 0, 1) * 100;
                  },
                  get children() {
                    const _el$16 = libs.createElement("Label", {
                      id: "TaskProgressValue",
                      get text() {
                        return `${task().progress}/${task().target}`;
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$16, "text", `${task().progress}/${task().target}`, _$p));
                    return _el$16;
                  }
                }), null);
                libs.insert(_el$17, libs.createComponent(libs.For, {
                  get each() {
                    return rewards();
                  },
                  children: reward => {
                    return libs.createComponent(StoreItem.StoreItemBlock, {
                      id: "TaskReward",
                      get item_id() {
                        return Number(reward.id);
                      },
                      get amounts() {
                        return reward.num;
                      }
                    });
                  }
                }));
                libs.insert(_el$11, libs.createComponent(libs.Switch, {
                  get children() {
                    return [libs.createComponent(libs.Match, {
                      get when() {
                        return state() == "Received";
                      },
                      get children() {
                        const _el$18 = libs.createElement("Panel", {
                            id: "TaskReceivePanel"
                          }, null);
                          libs.createElement("Label", {
                            text: "#TaskFinished"
                          }, _el$18);
                        return _el$18;
                      }
                    }), libs.createComponent(libs.Match, {
                      get when() {
                        return state() == "CanReceive";
                      },
                      get children() {
                        return libs.createComponent(EOM_Button.EOM_Button, {
                          id: "TaskBtn",
                          size: "Small",
                          color: "Gold",
                          text: "#TaskReceive",
                          onactivate: () => {
                            CallAction("/v1/task/receive_rewards", {
                              task_id: task().task_id,
                              extra_id: toFiniteNumber(task().extra_id)
                            });
                          }
                        });
                      }
                    }), libs.createComponent(libs.Match, {
                      get when() {
                        return state() == "WaitReceive";
                      },
                      get children() {
                        return libs.createElement("Label", {
                          id: "TaskUnFinished",
                          text: "#TaskUnFinished"
                        }, null);
                      }
                    }), libs.createComponent(libs.Match, {
                      get when() {
                        return state() == "Locked";
                      },
                      get children() {
                        const _el$21 = libs.createElement("Panel", {
                            id: "VipLock"
                          }, null);
                          libs.createElement("Panel", {
                            id: "VipIcon"
                          }, _el$21);
                          libs.createElement("Label", {
                            text: "#TaskVipUnLock"
                          }, _el$21);
                        libs.setProp(_el$21, "onactivate", () => {});
                        return _el$21;
                      }
                    })];
                  }
                }), null);
                libs.effect(_p$ => {
                  const _v$7 = libs.classNames(state(), {
                      Last: idx == activityTasks().length - 1
                    }),
                    _v$8 = `file://{images}/custom_game/task_icons/${taskConfig().icon}.png`,
                    _v$9 = "#Task_Name_" + DescID(),
                    _v$0 = "#Task_Desc_" + DescID(),
                    _v$1 = {
                      target: GetLocalization(String(taskConfig().target)),
                      v1: GetLocalization(String(taskConfig().param_1)),
                      v2: GetLocalization(String(taskConfig().param_2)),
                      v3: GetLocalization(String(taskConfig().param_3))
                    };
                  _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$11, "class", _v$7, _p$._v$7));
                  _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$12, "src", _v$8, _p$._v$8));
                  _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$14, "text", _v$9, _p$._v$9));
                  _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$15, "text", _v$0, _p$._v$0));
                  _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$15, "vars", _v$1, _p$._v$1));
                  return _p$;
                }, {
                  _v$7: undefined,
                  _v$8: undefined,
                  _v$9: undefined,
                  _v$0: undefined,
                  _v$1: undefined
                });
                return _el$11;
              })();
            }
          }));
          return _el$10;
        })()];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = activityData().name,
        _v$5 = activityData().in_tool == 1,
        _v$6 = getSrcPath(`activity/shop_and_task/${params.activityID}/bg.png`);
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$, "class", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$2, "visible", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$3, "src", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$;
  })();
}

function Info(props) {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("Info", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["tooltip_text", "text", "src", "color"]);
  const tooltip = libs.createMemo(() => local.tooltip_text ?? local.text + "_desc");
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Image", {
        id: "InfoIcon",
        get src() {
          return local.src;
        }
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "InfoLabel"
      }, _el$),
      _el$4 = libs.createElement("Label", {
        get text() {
          return local.text;
        },
        get style() {
          return {
            color: local.color
          };
        }
      }, _el$3);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get tooltip_text() {
        return tooltip();
      }
    }), true);
    libs.effect(_p$ => {
      const _v$ = local.src,
        _v$2 = local.text,
        _v$3 = {
          color: local.color
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "src", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "style", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}

const player_starsea_activity_data = solid_utils.createServiceNetData("player_starsea_activity_data", {});
const showCount = 5;
function StarSea(params) {
  const activityData = libs.createMemo(() => KeyValues.activity_data[params.activityID]);
  const step = libs.createMemo(() => toFiniteNumber(player_starsea_activity_data()[params.activityID]?.step));
  const [showPlusPreview, SetShowPlusPreview] = libs.createSignal(false);
  const activity_starsea = libs.createMemo(() => KeyValues.activity_starsea[params.activityID]);
  const starseaRewardindexs = libs.createMemo(() => Object.keys(activity_starsea()));
  const showCardList = libs.createMemo(() => Object.keys(activity_starsea()).filter((reward_id, index) => {
    if (index - step() > showCount - 1 || index < Math.min(step(), starseaRewardindexs().length - showCount)) {
      return false;
    }
    return true;
  }));
  const showIDList = libs.createMemo(() => starseaRewardindexs().filter(reward_id => {
    const rewardData = activity_starsea()[reward_id];
    return rewardData.show == 1;
  }).map(reward_id => {
    const rewardData = activity_starsea()[reward_id];
    if (rewardData.product_id != 0) {
      return String(rewardData.product_id);
    } else {
      return Object.keys(rewardData.rewards)[0];
    }
  }));
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "StarSeaRoot",
        "class": "RootContainer"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "TopPanel"
      }, _el$);
      libs.createElement("Image", {
        id: "BigStar"
      }, _el$2);
      const _el$4 = libs.createElement("Panel", {
        id: "Item1",
        "class": "BubbleItem"
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        id: "Item2",
        "class": "BubbleItem"
      }, _el$2),
      _el$6 = libs.createElement("Panel", {
        id: "Item3",
        "class": "BubbleItem"
      }, _el$2);
    libs.setProp(_el$4, "style", {
      animationDuration: "5s"
    });
    libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemImage, {
      get itemid() {
        return showIDList()[0];
      }
    }));
    libs.setProp(_el$5, "style", {
      animationDuration: "6s"
    });
    libs.insert(_el$5, libs.createComponent(StoreItem.StoreItemImage, {
      get itemid() {
        return showIDList()[2];
      }
    }));
    libs.setProp(_el$6, "style", {
      animationDuration: "4s"
    });
    libs.insert(_el$6, libs.createComponent(StoreItem.StoreItemImage, {
      get itemid() {
        return showIDList()[1];
      }
    }));
    libs.insert(_el$, libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
      get children() {
        return [libs.createElement("Image", {
          id: "Title"
        }, null), libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "GoExchange",
          text: "#Store_Exchange_Button",
          onactivate: () => {
            SetShowPlusPreview(true);
          }
        }), (() => {
          const _el$8 = libs.createElement("Panel", {
            id: "CountdownMain"
          }, null);
          libs.insert(_el$8, libs.createComponent(EOM_Countdown.EOM_Countdown, {
            icon: true,
            text: "#Activity_EndTime",
            get endTime() {
              return activityData().end_time;
            }
          }));
          return _el$8;
        })(), libs.createComponent(Info, {
          id: "Info",
          text: "#Activity_RuleTitle",
          get tooltip_text() {
            return "#" + activityData().name + "_desc_" + params.activityID;
          }
        }), (() => {
          const _el$9 = libs.createElement("Panel", {
              id: "ShowBubble"
            }, null),
            _el$0 = libs.createElement("Panel", {
              id: "Bubble"
            }, _el$9);
            libs.createElement("Panel", {
              id: "RightArrow"
            }, _el$9);
          libs.insert(_el$0, libs.createComponent(StoreItem.StoreItemImage, {
            get itemid() {
              return showIDList()[2];
            }
          }));
          libs.effect(_$p => libs.setProp(_el$9, "visible", step() < 26, _$p));
          return _el$9;
        })(), (() => {
          const _el$10 = libs.createElement("Panel", {
            id: "ItemList"
          }, null);
          libs.insert(_el$10, libs.createComponent(libs.For, {
            get each() {
              return showCardList();
            },
            children: (reward_id, index) => {
              const disable = libs.createMemo(() => step() + 2 <= toFiniteNumber(activity_starsea()[reward_id].reward_id));
              const received = libs.createMemo(() => activity_starsea()[reward_id].reward_id <= step());
              return [libs.createComponent(RewardItem, libs.mergeProps$1(() => activity_starsea()[reward_id], {
                get activity_id() {
                  return params.activityID;
                },
                get disabled() {
                  return disable();
                },
                get received() {
                  return received();
                }
              })), (() => {
                const _el$11 = libs.createElement("Image", {
                  id: "Arrow"
                }, null);
                libs.effect(_$p => libs.setProp(_el$11, "visible", index() != showCardList().length - 1, _$p));
                return _el$11;
              })()];
            }
          }));
          return _el$10;
        })()];
      }
    }), null);
    libs.insert(_el$, libs.createComponent(ExchangeStore.ExchangeStore, {
      tag: "StarseaShop",
      get show() {
        return showPlusPreview();
      },
      onclose: () => SetShowPlusPreview(false)
    }), null);
    return _el$;
  })();
}
const RewardItem = itemInfo => {
  const itemID = Object.keys(itemInfo.rewards)[0];
  const itemCount = itemInfo.rewards[itemID];
  const itemData = KeyValues.info_shop_product[itemInfo.product_id];
  return (() => {
    const _el$12 = libs.createElement("Panel", {
        get id() {
          return "RewardID" + itemInfo.reward_id;
        },
        "class": "RewardItem"
      }, null);
      libs.createElement("Image", {
        id: "Icon"
      }, _el$12);
      const _el$14 = libs.createElement("Label", {
        id: "ItemCount",
        text: "×" + itemCount
      }, _el$12),
      _el$15 = libs.createElement("Label", {
        id: "ItemName",
        get text() {
          return "#" + (itemInfo.product_id == 0 ? itemID : itemInfo.product_id);
        }
      }, _el$12);
    libs.insert(_el$12, libs.createComponent(libs.Switch, {
      get fallback() {
        return libs.createComponent(StoreItem.StoreItemImage, {
          itemid: itemID
        });
      },
      get children() {
        return libs.createComponent(libs.Match, {
          get when() {
            return itemInfo.product_id != 0;
          },
          get children() {
            return libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return itemInfo.product_id;
              }
            });
          }
        });
      }
    }), _el$14);
    libs.setProp(_el$14, "visible", itemCount > 1);
    libs.setProp(_el$14, "text", "×" + itemCount);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return itemInfo.disabled;
      },
      get children() {
        return libs.createElement("Image", {
          id: "Lock"
        }, null);
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Switch, {
      get fallback() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          id: "Receive",
          text: "#Store_Free_Button",
          onactivate: () => {
            if (!itemInfo.disabled) {
              CallAction("/v1/activity/receive_rewards", {
                activity_id: itemInfo.activity_id,
                reward_id: itemInfo.reward_id
              });
            }
          }
        });
      },
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return itemInfo.received;
          },
          get children() {
            return libs.createElement("Image", {
              id: "Received"
            }, null);
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return itemInfo.product_id != 0;
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_Button, {
              id: "Receive",
              onactivate: () => {
                if (!itemInfo.disabled) {
                  ClientSideEvent("directly_purchase", {
                    itemid: itemInfo.product_id,
                    buy_count: 1,
                    source: "starsea"
                  });
                }
              },
              get children() {
                const _el$18 = libs.createElement("Panel", {
                    flowChildren: "right",
                    align: "center center"
                  }, null),
                  _el$19 = libs.createElement("Label", {
                    get text() {
                      return Float(GetStoreItemCost(itemData, 1));
                    }
                  }, _el$18);
                libs.setProp(_el$18, "flowChildren", "right");
                libs.setProp(_el$18, "align", "center center");
                libs.insert(_el$18, libs.createComponent(Player.CurrencyIcon, {
                  get tokenID() {
                    return itemData.pay_type;
                  }
                }), _el$19);
                libs.setProp(_el$19, "className", "CostLabel");
                libs.effect(_$p => libs.setProp(_el$19, "text", Float(GetStoreItemCost(itemData, 1)), _$p));
                return _el$18;
              }
            });
          }
        })];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "RewardID" + itemInfo.reward_id,
        _v$2 = {
          ["Rarity" + itemInfo.rarity]: true
        },
        _v$3 = "#" + (itemInfo.product_id == 0 ? itemID : itemInfo.product_id);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$12, "id", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$12, "classList", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$12;
  })();
};

let activityDataMap = {};
for (const activity_id in KeyValues.activity_data) {
  const activity_data = KeyValues.activity_data[activity_id];
  activityDataMap[activity_data.name] = activity_data;
}
const storeActivityMenus = new Set(["battlepass", "growth_fund", "starsea"]);
const MENU_LIST = {
  first_celebration: [],
  battlepass: ["battlepass", "daily_task", "week_task"],
  growth_fund: ["growth_fund_301"],
  starsea: [],
  activity_moonstone: [],
  seven_days: [],
  boardslot: ["dice_game", "dice_gift"],
  mining: ["veins_game"]
};
const player_activity_tasks = solid_utils.createServiceNetData("player_activity_tasks", {});
const player_login_activity_data = solid_utils.createServiceNetData("player_login_activity_data", {});
const open_store = solid_utils.createServiceNetData("open_shop", {
  value: false
});
const getActivityMenuList = now => activity_menu.buildActivityMenuList({
  menuList: MENU_LIST,
  storeMenus: storeActivityMenus
}, {
  now,
  tasks: player_activity_tasks(),
  loginActivities: player_login_activity_data(),
  openStore: open_store().value
});
function buildActivityViewSnapshot() {
  const now = CustomUIConfig.GetServerTimeStamp();
  return {
    menuList: getActivityMenuList(now),
    starseaActivityID: activity_menu.getActiveStarseaActivityID(now)
  };
}
const initialActivityViewSnapshot = buildActivityViewSnapshot();
const [displayStarseaActivityID, setDisplayStarseaActivityID] = libs.createSignal(initialActivityViewSnapshot.starseaActivityID);
const [displayMenuList, setDisplayMenuList] = libs.createSignal(initialActivityViewSnapshot.menuList);
function commitActivityViewSnapshot() {
  const snapshot = buildActivityViewSnapshot();
  libs.batch(() => {
    setDisplayStarseaActivityID(snapshot.starseaActivityID);
    setDisplayMenuList(currentMenuList => activity_menu.areActivityMenuListsEqual(currentMenuList, snapshot.menuList) ? currentMenuList : snapshot.menuList);
  });
}
const {
  LayoutMenu,
  show,
  secondTabName,
  menuName
} = EOM_MenuLayout.createMenuLayout("activity", displayMenuList, {
  beforeShow: commitActivityViewSnapshot
});
libs.createEffect(libs.on(show, visible => {
  if (!visible) commitActivityViewSnapshot();
}));
libs.createEffect(libs.on(() => open_store().value, () => {
  if (!show()) commitActivityViewSnapshot();
}));
libs.createEffect(() => {
  const tasks = player_activity_tasks();
  for (const activity_id in KeyValues.activity_data) {
    if (Number(activity_id) == dig_veins_logic.ACTIVITY_DICE_ID) continue;
    const ad = KeyValues.activity_data[activity_id];
    if (!ad.config) continue;
    const config = SymbolSpliter(ad.config, "|", ";");
    if (!config.task_id) continue;
    const anyCanReceive = Object.values(tasks).some(task => {
      let kv = KeyValues.task[task.task_id];
      if (!kv || kv.type != 6) return false;
      if (!String(task.task_id).startsWith(config.task_id)) return false;
      return task.progress >= task.target && task.receive_progress != 1;
    });
    CustomUIConfig.SetRedPoint(anyCanReceive, "activity", String(ad.name));
  }
});
function ActivityRoot() {
  const [showMoonstoneExchange, setShowMoonstoneExchange] = libs.createSignal(false);
  const activityData = libs.createMemo(() => {
    if (menuName() == "boardslot") {
      return KeyValues.activity_data[dig_veins_logic.ACTIVITY_DICE_ID];
    }
    if (menuName() == "starsea") {
      const activityID = displayStarseaActivityID();
      return activityID == undefined ? undefined : KeyValues.activity_data[activityID];
    }
    if (menuName() == "activity_moonstone") {
      return KeyValues.activity_data[902];
    }
    return activityDataMap[menuName()];
  });
  const tokenIDs = libs.createMemo(() => {
    const data = activityData();
    if (data == undefined || data.tokens == undefined || data.tokens == "") {
      return [];
    }
    return data.tokens.split("|").map(Number);
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "ActivityRoot",
    name: "MenuButton_activity",
    renderOnShow: true,
    get show() {
      return show();
    },
    close: () => {
      if (showMoonstoneExchange()) {
        setShowMoonstoneExchange(false);
        return;
      }
      ClientSideEvent("custom_ui_toggle_windows", {
        windowName: "MenuButton_activity",
        state: 0
      });
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(Player.CurrencyGroup, {
        get tokens() {
          return tokenIDs();
        },
        get recentOrder() {
          return activityData()?.template == "starsea";
        }
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "battlepass";
            },
            get children() {
              return libs.createComponent(BattlePass, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "daily_task";
            },
            get children() {
              return libs.createComponent(DailyTask, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "week_task";
            },
            get children() {
              return libs.createComponent(WeekTask, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return activityData()?.template == "shop_and_task";
            },
            get children() {
              return libs.createComponent(ShopAndTask, {
                get activityID() {
                  return activityData().activity_id;
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "growth_fund";
            },
            get children() {
              return libs.createComponent(GrowthFund, {
                get activityID() {
                  return secondTabName().replace("growth_fund_", "");
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return libs.memo(() => menuName() == "starsea")() && displayStarseaActivityID() != undefined;
            },
            get children() {
              return libs.createComponent(StarSea, {
                get activityID() {
                  return displayStarseaActivityID();
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "activity_moonstone";
            },
            get children() {
              return libs.createComponent(ActivityMoonstone, {
                activityID: 902,
                paymentActivityID: 1101,
                get showExchangeStore() {
                  return showMoonstoneExchange();
                },
                setShowExchangeStore: setShowMoonstoneExchange
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "seven_days";
            },
            get children() {
              return libs.createComponent(SevenDaysRoot, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "dice_game";
            },
            get children() {
              return libs.createComponent(Dice, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "dice_gift";
            },
            get children() {
              return libs.createComponent(DiceGift, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return secondTabName() == "veins_game";
            },
            get children() {
              return libs.createComponent(DigVeins, {});
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(ActivityRoot, {}), $.GetContextPanel());