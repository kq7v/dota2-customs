--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

const customUIConfig = GameUI.CustomUIConfig();
const hudMessageState = customUIConfig.HudMessageState ??= {
  receiveItemList: [],
  gameplayTextList: [],
  listenerIDs: []
};
const ABYSSAL_RUNE_END_SCORE = 10000;
const ABYSSAL_ENGRAVING_END_SCORE = 20000;
const getToastManager = id => {
  const panel = $(`#${id}`);
  return panel != undefined && panel.IsValid() ? panel : undefined;
};
Timer.CreateTimer("Message", 0, () => {
  if (hudMessageState.receiveItemList.length == 0) {
    return 0.3;
  }
  const receiveItemToast = getToastManager("ReceiveItemToast");
  if (receiveItemToast === undefined) {
    return 0.3;
  }
  const receiveItemData = hudMessageState.receiveItemList.shift();
  if (receiveItemData === undefined) {
    return 0.3;
  }
  const {
    item_id,
    rarity,
    uid,
    item_name,
    src
  } = receiveItemData;
  let panel = $.CreatePanel("Panel", receiveItemToast, "");
  libs.insert(panel, (() => {
    const _el$ = libs.createElement("Panel", {}, null);
      libs.createElement("Panel", {
        "class": "ItemBg"
      }, _el$);
      const _el$3 = libs.createElement("Label", {
        "class": "ItemName",
        text: item_name,
        html: true
      }, _el$);
    libs.setProp(_el$, "className", "AddItemRow Rarity" + rarity);
    libs.insert(_el$, libs.createComponent(StoreItem.StoreItemImage, {
      itemid: item_id,
      src: src,
      uid: uid
    }), _el$3);
    libs.setProp(_el$3, "text", item_name);
    return _el$;
  })());
  receiveItemToast.QueueToast(panel);
  return 0.3;
});
Timer.CreateTimer("GameplayMessage", 0, () => {
  if (hudMessageState.gameplayTextList.length == 0) {
    return 0.15;
  }
  const gameplayTextToast = getToastManager("GameplayTextToast");
  if (gameplayTextToast === undefined) {
    return 0.15;
  }
  const gameplayTextData = hudMessageState.gameplayTextList.shift();
  if (gameplayTextData === undefined) {
    return 0.15;
  }
  let panel = $.CreatePanel("Panel", gameplayTextToast, "");
  libs.insert(panel, (() => {
    const _el$4 = libs.createElement("Panel", {
        "class": "GameplayTextRow"
      }, null),
      _el$5 = libs.createElement("Label", {
        "class": "GameplayTextLabel",
        get text() {
          return gameplayTextData.text;
        }
      }, _el$4);
    libs.effect(_$p => libs.setProp(_el$5, "text", gameplayTextData.text, _$p));
    return _el$4;
  })());
  gameplayTextToast.QueueToast(panel);
  return 0.15;
});
function OnReceiveItem(data) {
  const formatData = JSON.parse(data.json);
  if (formatData != undefined) {
    for (const itemData of formatData) {
      let itemID = String(itemData.item_id);
      const uid = itemData.uid != undefined ? String(itemData.uid) : undefined;
      let itemName = GetLocalization(`#${itemID}`, itemID);
      let src;
      let rarity = toFiniteNumber(itemData.item_rarity, 1);
      hudMessageState.receiveItemList.push({
        item_id: itemID,
        uid,
        rarity,
        item_name: itemName + (itemData.amounts > 1 ? "×" + itemData.amounts : ""),
        src
      });
    }
  }
}
function OnReceiveGameplayText(data) {
  const text = String(data.text ?? data.message ?? "").trim();
  if (text.length <= 0) {
    return;
  }
  hudMessageState.gameplayTextList.push({
    text
  });
}
(function () {
  for (const listenerID of hudMessageState.listenerIDs) {
    try {
      GameEvents.Unsubscribe(listenerID);
    } catch (error) {}
  }
  hudMessageState.listenerIDs = [GameEvents.Subscribe("ReceiveRewards", OnReceiveItem), useClientSideEvent("ReceiveRewards", OnReceiveItem), GameEvents.Subscribe("ReceiveGameplayText", OnReceiveGameplayText)];
})();
const RequestPanel = props => {
  const playerID = Players.GetLocalPlayer();
  const [request, setRequest] = libs.createSignal(getNetDataKey("common", props.requestKey));
  const [countDown, setCountDown] = libs.createSignal(0);
  let countDownTimer;
  const clearCountDownTimer = () => {
    if (countDownTimer !== undefined) {
      clearInterval(countDownTimer);
      countDownTimer = undefined;
    }
  };
  const updateCountDown = () => {
    const data = request();
    const state = getRequestState(data);
    const endTime = state === "pending" ? getEndTime(data) : getCloseTime(data);
    if (endTime === undefined) {
      setCountDown(0);
      return;
    }
    setCountDown(Math.max(0, Math.ceil(endTime - Game.GetGameTime())));
  };
  const restartCountDownTimer = () => {
    clearCountDownTimer();
    updateCountDown();
    const data = request();
    const state = getRequestState(data);
    const endTime = state === "pending" ? getEndTime(data) : getCloseTime(data);
    if (endTime !== undefined && endTime - Game.GetGameTime() > 0) {
      countDownTimer = setInterval(updateCountDown, 100);
    }
  };
  libs.onMount(() => {
    restartCountDownTimer();
    const listener = useNetDataKey("common", props.requestKey, value => {
      setRequest(value);
      restartCountDownTimer();
    });
    libs.onCleanup(() => {
      GameUI.CustomUIConfig().EndDrag();
      clearCountDownTimer();
      CustomNetTables.UnsubscribeNetTableListener(listener);
    });
  });
  const isVisible = libs.createMemo(() => (props.isVisible ?? true) && getRequestState(request()) !== undefined);
  const isPending = libs.createMemo(() => getRequestState(request()) === "pending");
  const localChoice = libs.createMemo(() => getLocalChoice(request(), playerID));
  const canChoose = libs.createMemo(() => isPending() && localChoice() === "pending");
  const isInitiator = libs.createMemo(() => getInitiatorPlayerId(request()) == playerID);
  const messageText = libs.createMemo(() => {
    const data = request();
    const state = getRequestState(data);
    if (state === undefined) {
      return "";
    }
    if (state === "success") {
      return props.successText;
    }
    if (state === "failed") {
      return getFailReason(data) === "rejected" ? props.rejectedText : props.timeoutText;
    }
    return isInitiator() ? props.pendingInitiatorText : props.pendingOtherText;
  });
  const submitChoice = result => {
    if (!canChoose()) {
      return;
    }
    const data = request();
    if (props.eventName === "team_request_response") {
      GameEvents.SendCustomEventToServer(props.eventName, {
        result,
        requestId: isTeamRequest(data) ? data.requestId : undefined
      });
      return;
    }
    GameEvents.SendCustomEventToServer(props.eventName, {
      result
    });
  };
  let dragable = false;
  let dragPanel = undefined;
  const dragStart = panel => {
    dragable = true;
    dragPanel = panel;
    dragTimer();
  };
  const dragTimer = () => {
    if (dragable) {
      if (dragPanel != undefined && dragPanel.IsValid()) {
        if (GameUI.IsMouseDown(0)) {
          let position = GameUI.GetCursorPosition();
          if (dragPanel.offsetX == undefined || dragPanel.offsetY == undefined) {
            dragPanel.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
            dragPanel.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
            dragPanel.style.align = "left top";
            dragPanel.style.margin = "0px 0px 0px 0px";
          }
          if (dragPanel.offsetX != undefined && dragPanel.offsetY != undefined) {
            dragPanel.SetPositionInPixels((position[0] + dragPanel.offsetX) / dragPanel.actualuiscale_x, (position[1] + dragPanel.offsetY) / dragPanel.actualuiscale_y, 0);
          }
        } else {
          dragPanel.offsetX = undefined;
          dragPanel.offsetY = undefined;
        }
        $.Schedule(Game.GetGameFrameTime(), dragTimer);
      }
    } else {
      dragPanel = undefined;
    }
  };
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        get id() {
          return props.panelID;
        },
        get hittest() {
          return isVisible();
        }
      }, null),
      _el$7 = libs.createElement("Label", {
        get id() {
          return props.countDownID;
        },
        get text() {
          return messageText();
        },
        get vars() {
          return {
            value: countDown()
          };
        }
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "RequestActionList"
      }, _el$6);
    libs.setProp(_el$6, "onmouseover", self => dragStart(self));
    libs.setProp(_el$6, "onmouseout", self => dragable = false);
    libs.insert(_el$6, () => props.children, _el$7);
    libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      color: "Cancel",
      text: "#Popup_Button_Cancel",
      get enabled() {
        return canChoose();
      },
      onactivate: () => submitChoice("rejected")
    }), null);
    libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      color: "Confirm",
      text: "#Popup_Button_Confirm",
      get enabled() {
        return canChoose();
      },
      onactivate: () => submitChoice("accepted")
    }), null);
    libs.effect(_p$ => {
      const _v$ = props.panelID,
        _v$2 = isVisible(),
        _v$3 = isVisible(),
        _v$4 = props.countDownID,
        _v$5 = messageText(),
        _v$6 = {
          value: countDown()
        },
        _v$7 = isPending();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "id", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "visible", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "hittest", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "id", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$7, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$7, "vars", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$8, "visible", _v$7, _p$._v$7));
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
    return _el$6;
  })();
};
const DungeonStartWaitNotice = () => {
  const waitData = solid_utils.createNetDataSignal("common", "dungeon_start_wait");
  const [now, setNow] = libs.createSignal(Game.GetGameTime());
  let timer;
  libs.onMount(() => {
    timer = setInterval(() => setNow(Game.GetGameTime()), 250);
    libs.onCleanup(() => {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    });
  });
  const data = libs.createMemo(() => waitData());
  const elapsedSeconds = libs.createMemo(() => {
    const startTime = data()?.start_time;
    return startTime === undefined ? 0 : Math.max(0, now() - startTime);
  });
  const remainingSeconds = libs.createMemo(() => {
    const endTime = data()?.end_time;
    return endTime === undefined ? 0 : Math.max(0, Math.ceil(endTime - now()));
  });
  const showLongWait = libs.createMemo(() => {
    const value = data();
    return value?.state === "pending" && elapsedSeconds() >= (value.long_wait_second ?? 10);
  });
  return (() => {
    const _el$9 = libs.createElement("Panel", {
        id: "DungeonStartWaitNotice",
        get hittest() {
          return showLongWait();
        }
      }, null);
      libs.createElement("Label", {
        id: "DungeonStartWaitTitle",
        text: "#DungeonStartWaitTitle"
      }, _el$9);
      const _el$1 = libs.createElement("Label", {
        id: "DungeonStartWaitDesc",
        text: "#DungeonStartWaitDesc",
        get vars() {
          return {
            value: remainingSeconds()
          };
        }
      }, _el$9),
      _el$10 = libs.createElement("Panel", {
        id: "DungeonStartWaitActionList"
      }, _el$9);
    libs.insert(_el$10, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      color: "Cancel",
      text: "#DungeonStartWaitCancel",
      onactivate: () => GameEvents.SendCustomEventToServer("dungeon_start_wait_cancel", {})
    }));
    libs.effect(_p$ => {
      const _v$8 = showLongWait(),
        _v$9 = showLongWait(),
        _v$0 = {
          value: remainingSeconds()
        };
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$9, "visible", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$9, "hittest", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$1, "vars", _v$0, _p$._v$0));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined
    });
    return _el$9;
  })();
};
const GameStartRequest = () => {
  return libs.createComponent(RequestPanel, {
    requestKey: "game_mode_prepare_request",
    eventName: "game_mode_prepare_response",
    panelID: "GameStartRequest",
    countDownID: "StartGameRequestCountDown",
    pendingInitiatorText: "#StartGameRequestWaiting",
    pendingOtherText: "#StartGameRequestCountDown",
    successText: "#StartGameRequestAccepted",
    rejectedText: "#StartGameRequestRejected",
    timeoutText: "#StartGameRequestTimeout"
  });
};
const RestartGameRequest = () => {
  return libs.createComponent(RequestPanel, {
    requestKey: "restart_game_request",
    eventName: "restart_game",
    panelID: "RestartGameRequest",
    countDownID: "RestartGameRequestCountDown",
    pendingInitiatorText: "#RestartGameRequestWaiting",
    pendingOtherText: "#RestartGameRequestCountDown",
    successText: "#RestartGameRequestAccepted",
    rejectedText: "#RestartGameRequestRejected",
    timeoutText: "#RestartGameRequestTimeout"
  });
};
const GemBattleRequest = () => {
  const request = solid_utils.createNetDataSignal("common", "team_request");
  const isVisible = libs.createMemo(() => {
    const data = request();
    return isTeamRequest(data) && data.requestType === "gem_enter" && getRequestState(data) !== undefined;
  });
  return libs.createComponent(RequestPanel, {
    requestKey: "team_request",
    eventName: "team_request_response",
    panelID: "GemBattleRequest",
    countDownID: "GemBattleRequestCountDown",
    get isVisible() {
      return isVisible();
    },
    get pendingInitiatorText() {
      return GetLocalization("#GemBattleRequestWaiting");
    },
    get pendingOtherText() {
      return GetLocalization("#GemBattleRequestConfirm");
    },
    get successText() {
      return GetLocalization("#GemBattleRequestAccepted");
    },
    get rejectedText() {
      return GetLocalization("#GemBattleRequestRejected");
    },
    get timeoutText() {
      return GetLocalization("#GemBattleRequestTimeout");
    },
    get children() {
      const _el$11 = libs.createElement("Panel", {
          id: "RequestHeader"
        }, null),
        _el$12 = libs.createElement("Label", {
          id: "RequestTitle",
          get text() {
            return GetLocalization("#GemBattleRequestTitle");
          }
        }, _el$11),
        _el$13 = libs.createElement("Label", {
          id: "RequestSubtitle",
          get text() {
            return GetLocalization("#GemBattleRequestSubtitle");
          }
        }, _el$11);
      libs.effect(_p$ => {
        const _v$1 = GetLocalization("#GemBattleRequestTitle"),
          _v$10 = GetLocalization("#GemBattleRequestSubtitle");
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$12, "text", _v$1, _p$._v$1));
        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$13, "text", _v$10, _p$._v$10));
        return _p$;
      }, {
        _v$1: undefined,
        _v$10: undefined
      });
      return _el$11;
    }
  });
};
const AbyssalEndRequest = () => {
  const abyssalState = solid_utils.createNetDataSignal("common", "abyssal_state");
  const comboState = solid_utils.createNetDataSignal("common", "combo_state");
  const [dismissedRunStartTime, setDismissedRunStartTime] = libs.createSignal(hudMessageState.abyssalEndRequestDismissedStartTime);
  const [submittingRunStartTime, setSubmittingRunStartTime] = libs.createSignal(hudMessageState.abyssalEndRequestSubmittingStartTime);
  const requestConfig = libs.createMemo(() => {
    const state = abyssalState();
    if (state?.state !== "running") {
      return undefined;
    }
    const difficulty = String(state.difficulty);
    if (KeyValues.engraving_drop[difficulty] != undefined) {
      return {
        score: ABYSSAL_ENGRAVING_END_SCORE,
        text: "#AbyssalGame_EndRequestByEngraving"
      };
    }
    if (KeyValues.rune_drop[difficulty] != undefined) {
      return {
        score: ABYSSAL_RUNE_END_SCORE,
        text: "#AbyssalGame_EndRequestByRune"
      };
    }
    return undefined;
  });
  const isVisible = libs.createMemo(() => {
    const state = abyssalState();
    const config = requestConfig();
    if (state?.state !== "running" || config == undefined) {
      return false;
    }
    return (comboState()?.comboScore ?? 0) >= config.score && dismissedRunStartTime() !== state.start_time && submittingRunStartTime() !== state.start_time;
  });
  const continuePlaying = () => {
    const state = abyssalState();
    if (state?.state !== "running") {
      return;
    }
    hudMessageState.abyssalEndRequestDismissedStartTime = state.start_time;
    setDismissedRunStartTime(state.start_time);
  };
  const endGame = () => {
    const state = abyssalState();
    if (state?.state !== "running" || submittingRunStartTime() === state.start_time) {
      return;
    }
    hudMessageState.abyssalEndRequestSubmittingStartTime = state.start_time;
    setSubmittingRunStartTime(state.start_time);
    GameEvents.SendCustomEventToServer("abyssal_early_settle", {});
  };
  return (() => {
    const _el$14 = libs.createElement("Panel", {
        id: "AbyssalEndRequest",
        get hittest() {
          return isVisible();
        }
      }, null),
      _el$15 = libs.createElement("Panel", {
        id: "AbyssalEndRequestHeader"
      }, _el$14),
      _el$16 = libs.createElement("Label", {
        id: "AbyssalEndRequestTitle",
        get text() {
          return GetLocalization("#AbyssalGame_EndRequest_Title");
        }
      }, _el$15),
      _el$17 = libs.createElement("Label", {
        id: "AbyssalEndRequestDescription",
        get text() {
          return GetLocalization(requestConfig()?.text ?? "");
        }
      }, _el$15),
      _el$18 = libs.createElement("Panel", {
        id: "AbyssalEndRequestActionList"
      }, _el$14);
    libs.insert(_el$18, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      color: "Cancel",
      get text() {
        return GetLocalization("#AbyssalGame_EndRequest_Continue");
      },
      onactivate: continuePlaying
    }), null);
    libs.insert(_el$18, libs.createComponent(EOM_Button.EOM_Button, {
      size: "Small",
      color: "Confirm",
      get text() {
        return GetLocalization("#AbyssalGame_EndRequest_EndGame");
      },
      onactivate: endGame
    }), null);
    libs.effect(_p$ => {
      const _v$11 = isVisible(),
        _v$12 = isVisible(),
        _v$13 = GetLocalization("#AbyssalGame_EndRequest_Title"),
        _v$14 = GetLocalization(requestConfig()?.text ?? "");
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$14, "visible", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$14, "hittest", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$16, "text", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$17, "text", _v$14, _p$._v$14));
      return _p$;
    }, {
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined
    });
    return _el$14;
  })();
};
const GameStartRequestLayer = () => [libs.createComponent(GameStartRequest, {}), libs.createComponent(GemBattleRequest, {}), libs.createComponent(DungeonStartWaitNotice, {}), libs.createComponent(AbyssalEndRequest, {})];
libs.render(() => libs.createComponent(GameStartRequestLayer, {}), $("#GameStartRequestContainer"));
libs.render(() => libs.createComponent(RestartGameRequest, {}), $("#RestartGameRequestContainer"));
const SavingPotProgress = () => {
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const savingPotDailyDrop = libs.createMemo(() => playerCounters()["saving_pot_daily_drop"]);
  const count = libs.createMemo(() => savingPotDailyDrop()?.count ?? 0);
  const savingPotActivity = libs.createMemo(() => {
    for (const activityID in KeyValues.activity_data) {
      const activityData = KeyValues.activity_data[activityID];
      if (activityData.name == "saving_pot") {
        return KeyValues.activity_saving_pot?.[activityData.activity_id];
      }
    }
    return Object.values(KeyValues.activity_saving_pot ?? {})[0];
  });
  const max = libs.createMemo(() => savingPotActivity()?.progress ?? 0);
  const [visible, setVisible] = libs.createSignal(false);
  let lastCount;
  let hideScheduleID;
  const showProgress = () => {
    setVisible(true);
    if (hideScheduleID != undefined) {
      $.CancelScheduled(hideScheduleID);
    }
    hideScheduleID = $.Schedule(5, () => {
      hideScheduleID = undefined;
      setVisible(false);
    });
  };
  libs.createEffect(() => {
    const counter = savingPotDailyDrop();
    if (counter == undefined) {
      return;
    }
    const nextCount = count();
    if (lastCount == undefined) {
      lastCount = nextCount;
      return;
    }
    if (nextCount != lastCount) {
      lastCount = nextCount;
      showProgress();
    }
  });
  libs.onCleanup(() => {
    if (hideScheduleID != undefined) {
      $.CancelScheduled(hideScheduleID);
    }
  });
  return (() => {
    const _el$19 = libs.createElement("Panel", {
        id: "SavingPotProgress",
        get hittest() {
          return visible();
        }
      }, null);
      libs.createElement("Panel", {
        id: "ProgressBarIcon"
      }, _el$19);
      const _el$21 = libs.createElement("Label", {
        id: "ProgressLabel",
        get text() {
          return `${count()}/${max()}`;
        }
      }, _el$19);
    libs.setProp(_el$19, "onactivate", () => {
      ClientSideEvent("toggle_window_tag", {
        window_name: "MenuButton_activity",
        menu: "saving_pot",
        force: true
      });
    });
    libs.insert(_el$19, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
      min: 0,
      get max() {
        return max();
      },
      get value() {
        return count();
      }
    }), _el$21);
    libs.effect(_p$ => {
      const _v$15 = visible(),
        _v$16 = {
          Show: visible()
        },
        _v$17 = `${count()}/${max()}`;
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$19, "hittest", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$19, "classList", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$21, "text", _v$17, _p$._v$17));
      return _p$;
    }, {
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined
    });
    return _el$19;
  })();
};
libs.render(() => libs.createComponent(SavingPotProgress, {}), $("#SavingPotContainer"));
function isTeamRequest(data) {
  return data !== undefined && "playerResponses" in data && "requestType" in data;
}
function isResponseRequest(data) {
  return data !== undefined && "playerResponses" in data;
}
function getRequestState(data) {
  if (data === undefined) {
    return undefined;
  }
  if (isResponseRequest(data)) {
    if (data.state === "None") {
      return undefined;
    }
    if (data.state === "success" || data.state === "failed" || data.state === "pending") {
      return data.state;
    }
    return undefined;
  }
  return data.state;
}
function getEndTime(data) {
  if (data === undefined) {
    return undefined;
  }
  return isResponseRequest(data) ? data.endTime : data.end_time;
}
function getCloseTime(data) {
  if (data === undefined) {
    return undefined;
  }
  return isResponseRequest(data) ? data.closeTime : data.close_time;
}
function getFailReason(data) {
  if (data === undefined) {
    return undefined;
  }
  return isResponseRequest(data) ? data.failReason : data.fail_reason;
}
function getInitiatorPlayerId(data) {
  if (data === undefined) {
    return undefined;
  }
  return isResponseRequest(data) ? data.requesterPlayerId : data.initiator_player_id;
}
function getLocalChoice(data, playerID) {
  if (data === undefined) {
    return "pending";
  }
  if (!isResponseRequest(data)) {
    return data.players?.[playerID]?.status ?? "pending";
  }
  const response = data.playerResponses?.[playerID];
  if (response === "Ready") {
    return "accepted";
  }
  if (response === "Rejected") {
    return "rejected";
  }
  return "pending";
}