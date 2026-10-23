--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var abyss_hud_shared = require('./abyss_hud_shared.js');

const DebugAbyss = () => {
  const abyssalState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_state");
  const hordeState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_horde_state");
  const hordeDebugState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_horde_debug_state");
  const hordeDropState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_drop_state");
  const activeEvents = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_events");
  const comboState = abyss_hud_shared.createNullableNetDataSignal("common", "combo_state");
  const now = abyss_hud_shared.createGameTimeSignal(100);
  const [debugScoreInput, setDebugScoreInput] = libs.createSignal("1000");
  const {
    broadcastEvent,
    showBroadcast
  } = abyss_hud_shared.createAbyssEventBroadcast(activeEvents);
  const combo = libs.createMemo(() => comboState() ?? abyss_hud_shared.EMPTY_COMBO_STATE);
  const horde = libs.createMemo(() => hordeState());
  const hordeDebug = libs.createMemo(() => hordeDebugState());
  const hordeDrop = libs.createMemo(() => hordeDropState() ?? []);
  const modeState = libs.createMemo(() => abyssalState());
  const timeLeft = libs.createMemo(() => Math.max(0, (modeState()?.end_time ?? 0) - now()));
  const comboTimeLeft = libs.createMemo(() => abyss_hud_shared.getComboTimeRemaining(combo(), now()));
  const timePercent = libs.createMemo(() => {
    const duration = modeState()?.duration ?? 0;
    if (duration <= 0) {
      return 0;
    }
    return timeLeft() / duration * 100;
  });
  const comboTimerPercent = libs.createMemo(() => {
    const duration = COMBO_CONFIG.comboCountdownDuration;
    return duration > 0 ? comboTimeLeft() / duration * 100 : 0;
  });
  const comboGrowthPercent = libs.createMemo(() => combo().multiplierProgressCount / COMBO_CONFIG.multiplierIncreaseEveryCount * 100);
  const eventChargePercent = libs.createMemo(() => {
    const snapshot = horde();
    if (snapshot === undefined || snapshot.currentAbyssalEventTriggerCount <= 0) {
      return 0;
    }
    return snapshot.abyssalEventRoundKillCount / snapshot.currentAbyssalEventTriggerCount * 100;
  });
  const currentBroadcast = libs.createMemo(() => broadcastEvent());
  const broadcastRemaining = libs.createMemo(() => {
    const event = currentBroadcast();
    return event === undefined ? 0 : Math.max(0, event.endTime - now());
  });
  const broadcastPercent = libs.createMemo(() => {
    const event = currentBroadcast();
    return event === undefined || event.duration <= 0 ? 0 : broadcastRemaining() / event.duration * 100;
  });
  const visibleEvents = libs.createMemo(() => {
    return (activeEvents() ?? []).filter(event => event.endTime > now());
  });
  const debugScoreValue = libs.createMemo(() => {
    const value = Number(debugScoreInput());
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.floor(value);
  });
  const canSubmitDebugScore = libs.createMemo(() => debugScoreValue() > 0);
  const submitDebugScore = () => {
    const score = debugScoreValue();
    if (score <= 0) {
      return;
    }
    GameEvents.SendCustomEventToServer("debug_abyss_add_score", {
      score
    });
  };
  const endDebugAbyss = () => {
    GameEvents.SendCustomEventToServer("debug_abyss_end_game", {});
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HUDAbyss",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "AbyssTopCenter",
        "class": "HUDAbyssSection"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "AbyssMainStats"
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        "class": "AbyssStatBlock Difficulty"
      }, _el$3);
      libs.createElement("Label", {
        "class": "AbyssStatLabel",
        text: "DIFFICULTY"
      }, _el$4);
      const _el$6 = libs.createElement("Label", {
        "class": "AbyssStatValue",
        get text() {
          return `Abyss ${modeState()?.difficulty ?? "-"}`;
        }
      }, _el$4);
      libs.createElement("Panel", {
        "class": "AbyssStatDivider"
      }, _el$3);
      const _el$8 = libs.createElement("Panel", {
        "class": "AbyssStatBlock Time"
      }, _el$3);
      libs.createElement("Label", {
        "class": "AbyssStatLabel",
        text: "TIME LEFT"
      }, _el$8);
      const _el$0 = libs.createElement("Label", {
        "class": "AbyssStatValue TimeValue",
        get text() {
          return abyss_hud_shared.formatClock(timeLeft());
        }
      }, _el$8);
      libs.createElement("Panel", {
        "class": "AbyssStatDivider"
      }, _el$3);
      const _el$10 = libs.createElement("Panel", {
        "class": "AbyssStatBlock Kills"
      }, _el$3);
      libs.createElement("Label", {
        "class": "AbyssStatLabel",
        text: "KILLS"
      }, _el$10);
      const _el$12 = libs.createElement("Label", {
        "class": "AbyssStatValue",
        get text() {
          return abyss_hud_shared.formatInteger(hordeDebug()?.killCount ?? modeState()?.kill_count);
        }
      }, _el$10);
      libs.createElement("Panel", {
        "class": "AbyssStatDivider"
      }, _el$3);
      const _el$14 = libs.createElement("Panel", {
        "class": "AbyssStatBlock Score"
      }, _el$3);
      libs.createElement("Label", {
        "class": "AbyssStatLabel",
        text: "COMBO SCORE"
      }, _el$14);
      const _el$16 = libs.createElement("Label", {
        "class": "AbyssStatValue ScoreValue",
        get text() {
          return abyss_hud_shared.formatInteger(combo().comboScore);
        }
      }, _el$14),
      _el$17 = libs.createElement("Panel", {
        "class": "AbyssTopTimeTrack"
      }, _el$2),
      _el$18 = libs.createElement("Panel", {
        "class": "AbyssProgressFill",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(timePercent())
          };
        }
      }, _el$17),
      _el$19 = libs.createElement("Panel", {
        id: "AbyssComboPanel",
        get ["class"]() {
          return libs.classNames({
            Paused: combo().isPaused
          });
        }
      }, _el$2),
      _el$20 = libs.createElement("Panel", {
        id: "AbyssComboMultiplier"
      }, _el$19),
      _el$21 = libs.createElement("Label", {
        id: "AbyssComboValue",
        get text() {
          return abyss_hud_shared.formatMultiplier(combo().currentMultiplier);
        }
      }, _el$20),
      _el$22 = libs.createElement("Label", {
        id: "AbyssComboText",
        get text() {
          return combo().isPaused ? "COMBO PAUSED" : "CURRENT MULTIPLIER";
        }
      }, _el$20),
      _el$23 = libs.createElement("Panel", {
        id: "AbyssComboDetails"
      }, _el$19),
      _el$24 = libs.createElement("Panel", {
        "class": "AbyssMiniStat"
      }, _el$23);
      libs.createElement("Label", {
        "class": "AbyssMiniLabel",
        text: "Combo Count"
      }, _el$24);
      const _el$26 = libs.createElement("Label", {
        "class": "AbyssMiniValue",
        get text() {
          return abyss_hud_shared.formatInteger(combo().comboCount);
        }
      }, _el$24),
      _el$27 = libs.createElement("Panel", {
        "class": "AbyssMiniStat"
      }, _el$23);
      libs.createElement("Label", {
        "class": "AbyssMiniLabel",
        text: "Peak"
      }, _el$27);
      const _el$29 = libs.createElement("Label", {
        "class": "AbyssMiniValue",
        get text() {
          return abyss_hud_shared.formatMultiplier(combo().peakMultiplier);
        }
      }, _el$27),
      _el$30 = libs.createElement("Panel", {
        "class": "AbyssMiniStat"
      }, _el$23);
      libs.createElement("Label", {
        "class": "AbyssMiniLabel",
        text: "Next Growth"
      }, _el$30);
      const _el$32 = libs.createElement("Label", {
        "class": "AbyssMiniValue",
        get text() {
          return `${combo().multiplierProgressCount} / ${COMBO_CONFIG.multiplierIncreaseEveryCount}`;
        }
      }, _el$30),
      _el$33 = libs.createElement("Panel", {
        "class": "AbyssMiniTrack"
      }, _el$30),
      _el$34 = libs.createElement("Panel", {
        "class": "AbyssProgressFill",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(comboGrowthPercent())
          };
        }
      }, _el$33),
      _el$35 = libs.createElement("Panel", {
        id: "AbyssComboTimer"
      }, _el$19),
      _el$36 = libs.createElement("Panel", {
        "class": "AbyssProgressHeader"
      }, _el$35);
      libs.createElement("Label", {
        "class": "AbyssProgressLabel",
        text: "COMBO TIMER"
      }, _el$36);
      const _el$38 = libs.createElement("Label", {
        "class": "AbyssProgressValue",
        get text() {
          return `${comboTimeLeft().toFixed(1)}s / ${COMBO_CONFIG.comboCountdownDuration.toFixed(1)}s`;
        }
      }, _el$36),
      _el$39 = libs.createElement("Panel", {
        "class": "AbyssProgressTrack"
      }, _el$35),
      _el$40 = libs.createElement("Panel", {
        id: "AbyssComboTimerFill",
        "class": "AbyssProgressFill",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(comboTimerPercent())
          };
        }
      }, _el$39),
      _el$41 = libs.createElement("Panel", {
        id: "AbyssEventBroadcastPanel",
        get ["class"]() {
          return libs.classNames({
            Show: showBroadcast()
          });
        }
      }, _el$),
      _el$42 = libs.createElement("Panel", {
        id: "AbyssEventIcon"
      }, _el$41);
      libs.createElement("Label", {
        text: "!"
      }, _el$42);
      const _el$44 = libs.createElement("Panel", {
        id: "AbyssEventTextWrap"
      }, _el$41),
      _el$45 = libs.createElement("Label", {
        id: "AbyssEventBroadcast",
        get text() {
          return `#${currentBroadcast()?.eventId ?? ""}`;
        }
      }, _el$44),
      _el$46 = libs.createElement("Panel", {
        "class": "AbyssProgressTrack EventTrack"
      }, _el$44),
      _el$47 = libs.createElement("Panel", {
        id: "AbyssEventTimerFill",
        "class": "AbyssProgressFill",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(broadcastPercent())
          };
        }
      }, _el$46),
      _el$48 = libs.createElement("Label", {
        id: "AbyssEventTime",
        get text() {
          return abyss_hud_shared.formatSeconds(broadcastRemaining());
        }
      }, _el$41),
      _el$49 = libs.createElement("Panel", {
        id: "AbyssRightStatus",
        "class": "HUDAbyssSection",
        hittest: true
      }, _el$);
      libs.createElement("Label", {
        id: "AbyssRightTitle",
        text: "ABYSS STATUS"
      }, _el$49);
      const _el$51 = libs.createElement("Panel", {
        "class": "AbyssStatusGrid"
      }, _el$49),
      _el$52 = libs.createElement("Panel", {
        "class": "AbyssStatusCell"
      }, _el$51);
      libs.createElement("Label", {
        "class": "AbyssStatusLabel",
        text: "Phase"
      }, _el$52);
      const _el$54 = libs.createElement("Label", {
        "class": "AbyssStatusValue",
        get text() {
          return `${hordeDebug()?.currentPhase ?? 1}`;
        }
      }, _el$52),
      _el$55 = libs.createElement("Panel", {
        "class": "AbyssStatusCell"
      }, _el$51);
      libs.createElement("Label", {
        "class": "AbyssStatusLabel",
        text: "Alive"
      }, _el$55);
      const _el$57 = libs.createElement("Label", {
        "class": "AbyssStatusValue",
        get text() {
          return `${hordeDebug()?.aliveEnemyCount ?? 0} / ${hordeDebug()?.maxAliveEnemyCount ?? ABYSS_CONFIG.spawn.maxAliveEnemyCount}`;
        }
      }, _el$55),
      _el$58 = libs.createElement("Panel", {
        "class": "AbyssStatusCell"
      }, _el$51);
      libs.createElement("Label", {
        "class": "AbyssStatusLabel",
        text: "Next Event"
      }, _el$58);
      const _el$60 = libs.createElement("Label", {
        "class": "AbyssStatusValue Cyan",
        get text() {
          return `${horde()?.abyssalEventRoundKillCount ?? 0} / ${horde()?.currentAbyssalEventTriggerCount ?? ABYSS_CONFIG.event.initialTriggerCount}`;
        }
      }, _el$58),
      _el$61 = libs.createElement("Panel", {
        id: "AbyssDebugControls"
      }, _el$49);
      libs.createElement("Label", {
        "class": "AbyssPanelSubTitle",
        text: "DEBUG ACTIONS"
      }, _el$61);
      const _el$63 = libs.createElement("Panel", {
        "class": "AbyssDebugScoreRow"
      }, _el$61),
      _el$64 = libs.createElement("TextEntry", {
        id: "AbyssDebugScoreEntry",
        get text() {
          return debugScoreInput();
        },
        textmode: "numeric",
        placeholder: "Score"
      }, _el$63),
      _el$65 = libs.createElement("Button", {
        "class": "AbyssDebugButton Confirm"
      }, _el$63);
      libs.createElement("Label", {
        text: "ADD"
      }, _el$65);
      const _el$67 = libs.createElement("Button", {
        id: "AbyssDebugEndButton",
        "class": "AbyssDebugButton Danger"
      }, _el$61);
      libs.createElement("Label", {
        text: "END ABYSS"
      }, _el$67);
      const _el$69 = libs.createElement("Panel", {
        id: "AbyssEventProgressBlock"
      }, _el$49),
      _el$70 = libs.createElement("Panel", {
        "class": "AbyssProgressHeader"
      }, _el$69),
      _el$71 = libs.createElement("Label", {
        "class": "AbyssProgressLabel",
        get text() {
          return horde()?.hasPendingEventElite ? "ELITE EVENT READY" : "EVENT CHARGE";
        }
      }, _el$70),
      _el$72 = libs.createElement("Label", {
        "class": "AbyssProgressValue",
        get text() {
          return abyss_hud_shared.formatPercent(eventChargePercent());
        }
      }, _el$70),
      _el$73 = libs.createElement("Panel", {
        "class": "AbyssProgressTrack"
      }, _el$69),
      _el$74 = libs.createElement("Panel", {
        id: "AbyssEventChargeFill",
        "class": "AbyssProgressFill",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(eventChargePercent())
          };
        }
      }, _el$73),
      _el$75 = libs.createElement("Panel", {
        id: "AbyssActiveEvents"
      }, _el$49);
      libs.createElement("Label", {
        "class": "AbyssPanelSubTitle",
        text: "ACTIVE EVENTS"
      }, _el$75);
    libs.insert(_el$51, libs.createComponent(libs.For, {
      get each() {
        return hordeDrop();
      },
      children: (drop, index) => (() => {
        const _el$77 = libs.createElement("Panel", {
            "class": "AbyssStatusCell AbyssalDropRow"
          }, null),
          _el$78 = libs.createElement("Label", {
            "class": "AbyssStatusLabel",
            get text() {
              return `Drop ${drop?.dropId ?? index()}`;
            }
          }, _el$77),
          _el$79 = libs.createElement("Label", {
            "class": "AbyssStatusValue Gold",
            get text() {
              return `${(drop?.currentChance ?? 0).toFixed(0)}% · ${drop?.droppedCount ?? 0}/${drop?.dropMax ?? "∞"}`;
            }
          }, _el$77);
        libs.effect(_p$ => {
          const _v$25 = `Drop ${drop?.dropId ?? index()}`,
            _v$26 = `${(drop?.currentChance ?? 0).toFixed(0)}% · ${drop?.droppedCount ?? 0}/${drop?.dropMax ?? "∞"}`;
          _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$78, "text", _v$25, _p$._v$25));
          _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$79, "text", _v$26, _p$._v$26));
          return _p$;
        }, {
          _v$25: undefined,
          _v$26: undefined
        });
        return _el$77;
      })()
    }), null);
    libs.setProp(_el$64, "ontextentrychange", self => setDebugScoreInput(self.text));
    libs.setProp(_el$64, "oninputsubmit", submitDebugScore);
    libs.setProp(_el$65, "onactivate", submitDebugScore);
    libs.setProp(_el$67, "onactivate", endDebugAbyss);
    libs.insert(_el$75, libs.createComponent(libs.Show, {
      get when() {
        return visibleEvents().length > 0;
      },
      get fallback() {
        return (() => {
          const _el$80 = libs.createElement("Panel", {
              "class": "AbyssEventRow"
            }, null);
            libs.createElement("Panel", {
              "class": "AbyssEventDot"
            }, _el$80);
            const _el$82 = libs.createElement("Panel", {
              "class": "AbyssEventRowText"
            }, _el$80);
            libs.createElement("Label", {
              "class": "AbyssEventRowName",
              text: "No active event"
            }, _el$82);
            libs.createElement("Label", {
              "class": "AbyssEventRowDesc",
              text: "Defeat the marked elite to trigger one"
            }, _el$82);
          return _el$80;
        })();
      },
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return visibleEvents();
          },
          children: event => {
            const remaining = libs.createMemo(() => Math.max(0, event.endTime - now()));
            return (() => {
              const _el$85 = libs.createElement("Panel", {
                  "class": "AbyssEventRow Active"
                }, null);
                libs.createElement("Panel", {
                  "class": "AbyssEventDot"
                }, _el$85);
                const _el$87 = libs.createElement("Panel", {
                  "class": "AbyssEventRowText"
                }, _el$85),
                _el$88 = libs.createElement("Label", {
                  "class": "AbyssEventRowName",
                  get text() {
                    return `#${event.eventId}`;
                  }
                }, _el$87),
                _el$89 = libs.createElement("Label", {
                  "class": "AbyssEventRowDesc",
                  get text() {
                    return `${abyss_hud_shared.formatSeconds(remaining())} remaining`;
                  }
                }, _el$87);
              libs.effect(_p$ => {
                const _v$27 = `#${event.eventId}`,
                  _v$28 = `${abyss_hud_shared.formatSeconds(remaining())} remaining`;
                _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$88, "text", _v$27, _p$._v$27));
                _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$89, "text", _v$28, _p$._v$28));
                return _p$;
              }, {
                _v$27: undefined,
                _v$28: undefined
              });
              return _el$85;
            })();
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = `Abyss ${modeState()?.difficulty ?? "-"}`,
        _v$2 = abyss_hud_shared.formatClock(timeLeft()),
        _v$3 = abyss_hud_shared.formatInteger(hordeDebug()?.killCount ?? modeState()?.kill_count),
        _v$4 = abyss_hud_shared.formatInteger(combo().comboScore),
        _v$5 = {
          width: abyss_hud_shared.formatPercent(timePercent())
        },
        _v$6 = libs.classNames({
          Paused: combo().isPaused
        }),
        _v$7 = abyss_hud_shared.formatMultiplier(combo().currentMultiplier),
        _v$8 = combo().isPaused ? "COMBO PAUSED" : "CURRENT MULTIPLIER",
        _v$9 = abyss_hud_shared.formatInteger(combo().comboCount),
        _v$0 = abyss_hud_shared.formatMultiplier(combo().peakMultiplier),
        _v$1 = `${combo().multiplierProgressCount} / ${COMBO_CONFIG.multiplierIncreaseEveryCount}`,
        _v$10 = {
          width: abyss_hud_shared.formatPercent(comboGrowthPercent())
        },
        _v$11 = `${comboTimeLeft().toFixed(1)}s / ${COMBO_CONFIG.comboCountdownDuration.toFixed(1)}s`,
        _v$12 = {
          width: abyss_hud_shared.formatPercent(comboTimerPercent())
        },
        _v$13 = libs.classNames({
          Show: showBroadcast()
        }),
        _v$14 = `#${currentBroadcast()?.eventId ?? ""}`,
        _v$15 = {
          width: abyss_hud_shared.formatPercent(broadcastPercent())
        },
        _v$16 = abyss_hud_shared.formatSeconds(broadcastRemaining()),
        _v$17 = `${hordeDebug()?.currentPhase ?? 1}`,
        _v$18 = `${hordeDebug()?.aliveEnemyCount ?? 0} / ${hordeDebug()?.maxAliveEnemyCount ?? ABYSS_CONFIG.spawn.maxAliveEnemyCount}`,
        _v$19 = `${horde()?.abyssalEventRoundKillCount ?? 0} / ${horde()?.currentAbyssalEventTriggerCount ?? ABYSS_CONFIG.event.initialTriggerCount}`,
        _v$20 = debugScoreInput(),
        _v$21 = canSubmitDebugScore(),
        _v$22 = horde()?.hasPendingEventElite ? "ELITE EVENT READY" : "EVENT CHARGE",
        _v$23 = abyss_hud_shared.formatPercent(eventChargePercent()),
        _v$24 = {
          width: abyss_hud_shared.formatPercent(eventChargePercent())
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$0, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$12, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "style", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$19, "class", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$21, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$22, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$26, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$29, "text", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$32, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$34, "style", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$38, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$40, "style", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$41, "class", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$45, "text", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$47, "style", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$48, "text", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$54, "text", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$57, "text", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$60, "text", _v$19, _p$._v$19));
      _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$64, "text", _v$20, _p$._v$20));
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$65, "enabled", _v$21, _p$._v$21));
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$71, "text", _v$22, _p$._v$22));
      _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$72, "text", _v$23, _p$._v$23));
      _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$74, "style", _v$24, _p$._v$24));
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
      _v$9: undefined,
      _v$0: undefined,
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
      _v$24: undefined
    });
    return _el$;
  })();
};

const NormalAbyss = () => {
  const abyssalState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_state");
  const hordeState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_horde_state");
  const activeEvents = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_events");
  const comboState = abyss_hud_shared.createNullableNetDataSignal("common", "combo_state");
  const now = abyss_hud_shared.createGameTimeSignal(100);
  const {
    broadcastEvent,
    showBroadcast
  } = abyss_hud_shared.createAbyssEventBroadcast(activeEvents);
  const [scoreBurstVariant, setScoreBurstVariant] = libs.createSignal(0);
  let previousScore;
  let scoreBurstSchedule;
  const combo = libs.createMemo(() => comboState() ?? abyss_hud_shared.EMPTY_COMBO_STATE);
  const horde = libs.createMemo(() => hordeState());
  const modeState = libs.createMemo(() => abyssalState());
  const timeLeft = libs.createMemo(() => Math.max(0, (modeState()?.end_time ?? 0) - now()));
  const comboTimeLeft = libs.createMemo(() => abyss_hud_shared.getComboTimeRemaining(combo(), now()));
  const comboTimerPercent = libs.createMemo(() => {
    const duration = COMBO_CONFIG.comboCountdownDuration;
    return duration > 0 ? comboTimeLeft() / duration * 100 : 0;
  });
  const remainingEventHits = libs.createMemo(() => {
    const snapshot = horde();
    if (snapshot === undefined) {
      return Math.ceil(ABYSS_CONFIG.event.initialTriggerCount / 2);
    }
    return Math.max(0, Math.ceil((snapshot.currentAbyssalEventTriggerCount - snapshot.abyssalEventRoundKillCount) / 2));
  });
  const eventText = libs.createMemo(() => horde()?.hasPendingEventElite ? "#AbyssalEventReady" : `#AbyssalEventNextHit`);
  const visibleEvents = libs.createMemo(() => {
    return (activeEvents() ?? []).filter(event => event.endTime > now());
  });
  libs.createEffect(() => {
    const score = combo().comboScore;
    if (previousScore !== undefined && score > previousScore) {
      if (scoreBurstSchedule !== undefined) {
        $.CancelScheduled(scoreBurstSchedule);
      }
      setScoreBurstVariant(current => current === 1 ? 2 : 1);
      scoreBurstSchedule = $.Schedule(0.36, () => {
        setScoreBurstVariant(0);
        scoreBurstSchedule = undefined;
      });
    }
    previousScore = score;
  });
  libs.onCleanup(() => {
    if (scoreBurstSchedule !== undefined) {
      $.CancelScheduled(scoreBurstSchedule);
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "NormalAbyss",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "NormalAbyssTopCenter",
        hittest: false
      }, _el$);
      libs.createElement("Image", {
        id: "NormalAbyssTopCenterImage"
      }, _el$2);
      const _el$4 = libs.createElement("Panel", {
        id: "TopTextPanel"
      }, _el$2),
      _el$5 = libs.createElement("Label", {
        id: "NormalAbyssTopLeftLabel",
        get text() {
          return LocalizeWithVars("#AbyssalGameTimeLimit", {
            time: abyss_hud_shared.formatClock(timeLeft())
          });
        }
      }, _el$4),
      _el$6 = libs.createElement("Label", {
        id: "NormalAbyssTopRightLabel",
        text: `#AbyssalScoreDescription`,
        get vars() {
          return {
            diff: modeState()?.difficulty ?? "-",
            score: abyss_hud_shared.formatInteger(combo().comboScore)
          };
        }
      }, _el$4),
      _el$7 = libs.createElement("Panel", {
        id: "NormalAbyssComboBar",
        "class": "NormalAbyssComboBar"
      }, _el$2);
      libs.createElement("Image", {
        id: "NormalAbyssComboBarBg",
        "class": "NormalAbyssComboBarBg"
      }, _el$7);
      const _el$9 = libs.createElement("Panel", {
        id: "NormalAbyssComboBarFillClip",
        "class": "NormalAbyssComboBarFillClip",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(comboTimerPercent())
          };
        }
      }, _el$7);
      libs.createElement("Image", {
        id: "NormalAbyssComboBarFill",
        "class": "NormalAbyssComboBarFill"
      }, _el$9);
      const _el$1 = libs.createElement("Label", {
        id: "ComboBarLeftLabel",
        get text() {
          return `${comboTimeLeft().toFixed(1)}S`;
        }
      }, _el$7),
      _el$10 = libs.createElement("Label", {
        id: "ComboBarRightLabel",
        get text() {
          return `${combo().currentMultiplier.toFixed(1)}X`;
        }
      }, _el$7),
      _el$11 = libs.createElement("Panel", {
        id: "NormalAbyssEventPanel"
      }, _el$2),
      _el$12 = libs.createElement("Label", {
        id: "NormalAbyssEventLabel",
        get text() {
          return eventText();
        },
        get vars() {
          return {
            hit: remainingEventHits()
          };
        }
      }, _el$11),
      _el$13 = libs.createElement("Panel", {
        id: "NormalAbyssBroadCastPanel",
        get ["class"]() {
          return libs.classNames({
            Show: showBroadcast()
          });
        },
        hittest: false
      }, _el$);
      libs.createElement("Image", {
        id: "NormalAbyssBroadCastBg"
      }, _el$13);
      const _el$15 = libs.createElement("Panel", {
        id: "NormalAbyssBroadCastContentPanel"
      }, _el$13);
      libs.createElement("Image", {
        "class": "NormalAbyssBroadCastIcon"
      }, _el$15);
      const _el$17 = libs.createElement("Label", {
        id: "NormalAbyssBroadCastLabel",
        get text() {
          return `#${broadcastEvent()?.eventId ?? ""}`;
        }
      }, _el$15);
      libs.createElement("Image", {
        "class": "NormalAbyssBroadCastIcon"
      }, _el$15);
      const _el$19 = libs.createElement("Panel", {
        id: "NoromalAbyssBottomContainer",
        hittest: false
      }, _el$),
      _el$20 = libs.createElement("Panel", {
        id: "NormalAbyssBottomComboBar",
        "class": "NormalAbyssComboBar"
      }, _el$19);
      libs.createElement("Image", {
        id: "NormalAbyssBottomComboBarBg",
        "class": "NormalAbyssComboBarBg"
      }, _el$20);
      const _el$22 = libs.createElement("Panel", {
        id: "NormalAbyssBottomComboBarFillClip",
        "class": "NormalAbyssComboBarFillClip",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(comboTimerPercent())
          };
        }
      }, _el$20);
      libs.createElement("Image", {
        id: "NormalAbyssBottomComboBarFill",
        "class": "NormalAbyssComboBarFill"
      }, _el$22);
      const _el$24 = libs.createElement("Label", {
        id: "NormalAbyssBottomComboBarLeftLabel",
        "class": "NormalAbyssComboBarLeftLabel",
        get text() {
          return `${comboTimeLeft().toFixed(1)}S`;
        }
      }, _el$20),
      _el$25 = libs.createElement("Label", {
        id: "NormalAbyssBottomComboBarRightLabel",
        "class": "NormalAbyssComboBarRightLabel",
        get text() {
          return `${combo().currentMultiplier.toFixed(1)}X`;
        }
      }, _el$20),
      _el$26 = libs.createElement("Label", {
        id: "NormalAbyssBottomScoreLabel",
        get ["class"]() {
          return libs.classNames({
            ScoreBurstA: scoreBurstVariant() === 1,
            ScoreBurstB: scoreBurstVariant() === 2
          });
        },
        get text() {
          return combo().comboScore;
        }
      }, _el$19),
      _el$27 = libs.createElement("Panel", {
        id: "NormalAbyssRightEvents",
        hittest: false
      }, _el$);
    libs.setProp(_el$6, "text", `#AbyssalScoreDescription`);
    libs.insert(_el$27, libs.createComponent(libs.For, {
      get each() {
        return visibleEvents();
      },
      children: event => {
        const remaining = libs.createMemo(() => 100 * Math.max(0, event.endTime - now()) / event.duration);
        return (() => {
          const _el$28 = libs.createElement("Panel", {
              "class": "NormalAbyssEventRow"
            }, null);
            libs.createElement("Panel", {
              "class": "NormalAbyssEventBG"
            }, _el$28);
            const _el$30 = libs.createElement("Panel", {
              "class": "NormalAbyssEventRowContent"
            }, _el$28),
            _el$31 = libs.createElement("Panel", {
              "class": "NormalAbyssEventRowText"
            }, _el$30),
            _el$32 = libs.createElement("Label", {
              "class": "NormalAbyssEventRowName",
              get text() {
                return `#${event.eventId}`;
              }
            }, _el$31),
            _el$33 = libs.createElement("Panel", {
              "class": "NormalAbyssEventBar"
            }, _el$30);
            libs.createElement("Image", {
              "class": "NormalAbyssEventBarBg"
            }, _el$33);
            const _el$35 = libs.createElement("Panel", {
              "class": "NormalAbyssEventBarFillClip",
              get style() {
                return {
                  width: abyss_hud_shared.formatPercent(remaining())
                };
              }
            }, _el$33);
            libs.createElement("Image", {
              "class": "NormalAbyssEventBarFill"
            }, _el$35);
          libs.effect(_p$ => {
            const _v$13 = `#${event.eventId}`,
              _v$14 = {
                width: abyss_hud_shared.formatPercent(remaining())
              };
            _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$32, "text", _v$13, _p$._v$13));
            _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$35, "style", _v$14, _p$._v$14));
            return _p$;
          }, {
            _v$13: undefined,
            _v$14: undefined
          });
          return _el$28;
        })();
      }
    }));
    libs.effect(_p$ => {
      const _v$ = LocalizeWithVars("#AbyssalGameTimeLimit", {
          time: abyss_hud_shared.formatClock(timeLeft())
        }),
        _v$2 = {
          diff: modeState()?.difficulty ?? "-",
          score: abyss_hud_shared.formatInteger(combo().comboScore)
        },
        _v$3 = {
          width: abyss_hud_shared.formatPercent(comboTimerPercent())
        },
        _v$4 = `${comboTimeLeft().toFixed(1)}S`,
        _v$5 = `${combo().currentMultiplier.toFixed(1)}X`,
        _v$6 = eventText(),
        _v$7 = {
          hit: remainingEventHits()
        },
        _v$8 = libs.classNames({
          Show: showBroadcast()
        }),
        _v$9 = `#${broadcastEvent()?.eventId ?? ""}`,
        _v$0 = {
          width: abyss_hud_shared.formatPercent(comboTimerPercent())
        },
        _v$1 = `${comboTimeLeft().toFixed(1)}S`,
        _v$10 = `${combo().currentMultiplier.toFixed(1)}X`,
        _v$11 = libs.classNames({
          ScoreBurstA: scoreBurstVariant() === 1,
          ScoreBurstB: scoreBurstVariant() === 2
        }),
        _v$12 = combo().comboScore;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "vars", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "style", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$1, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$12, "vars", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$13, "class", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$17, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$22, "style", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$24, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$25, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$26, "class", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$26, "text", _v$12, _p$._v$12));
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
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined
    });
    return _el$;
  })();
};

const HUDAbyss = () => {
  const [mode, setMode] = libs.createSignal("normal");
  const settings = solid_utils.createNetDataSignal("common", "settings");
  const abyssalState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_state");
  const hordeState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_horde_state");
  const horde = libs.createMemo(() => hordeState());
  const modeState = libs.createMemo(() => abyssalState());
  const isVisible = libs.createMemo(() => {
    const state = modeState();
    const hordeSnapshot = horde();
    return state?.state === "running" || hordeSnapshot?.isRunning === true || hordeSnapshot?.isLoading === true;
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "HUDAbyssRoot",
      get ["class"]() {
        return libs.classNames({
          Show: isVisible()
        });
      },
      hittest: false
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return settings()?.is_in_tools_mode;
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            id: "AbyssHudModeSwitch",
            hittest: true
          }, null),
          _el$3 = libs.createElement("Button", {
            get ["class"]() {
              return libs.classNames("AbyssHudModeButton", {
                Active: mode() === "debug"
              });
            }
          }, _el$2);
          libs.createElement("Label", {
            text: "Debug"
          }, _el$3);
          const _el$5 = libs.createElement("Button", {
            get ["class"]() {
              return libs.classNames("AbyssHudModeButton", {
                Active: mode() === "normal"
              });
            }
          }, _el$2);
          libs.createElement("Label", {
            text: "Normal"
          }, _el$5);
        libs.setProp(_el$3, "onactivate", () => setMode("debug"));
        libs.setProp(_el$5, "onactivate", () => setMode("normal"));
        libs.effect(_p$ => {
          const _v$ = libs.classNames("AbyssHudModeButton", {
              Active: mode() === "debug"
            }),
            _v$2 = libs.classNames("AbyssHudModeButton", {
              Active: mode() === "normal"
            });
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "class", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "class", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$2;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return mode() === "debug";
          },
          get children() {
            return libs.createComponent(DebugAbyss, {});
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return mode() === "normal";
          },
          get children() {
            return libs.createComponent(NormalAbyss, {});
          }
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames({
      Show: isVisible()
    }), _$p));
    return _el$;
  })();
};
libs.render(() => libs.createComponent(HUDAbyss, {}), $.GetContextPanel());
print("HUDAbyss loaded");