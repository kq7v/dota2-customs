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

const INTELLIGENCE_CARDS = {
  1: {
    className: "Rarity_3",
    title: "#HuntIntelligence_Rare"
  },
  2: {
    className: "Rarity_4",
    title: "#HuntIntelligence_Epic"
  },
  3: {
    className: "Rarity_5",
    title: "#HuntIntelligence_Legendary"
  }
};
const INTELLIGENCE_LIMIT = solid_utils.parseTokenCosts(KeyValues.hunt_common?.intelligence_max?.value).find(item => item.name === "110025")?.value || 300;
const HuntIntelligenceHud = () => {
  const intelligence = solid_utils.createPlayerNetDataSignal("hunt_boss", "intelligence");
  const [dismissed, setDismissed] = libs.createSignal(false);
  const [displayedProgress, setDisplayedProgress] = libs.createSignal(0);
  const amount = libs.createMemo(() => intelligence()?.amount ?? 0);
  const selectedRarity = libs.createMemo(() => amount() <= 20 ? 1 : amount() <= 50 ? 2 : 3);
  const selectedCard = libs.createMemo(() => INTELLIGENCE_CARDS[selectedRarity()]);
  const visible = libs.createMemo(() => amount() > 0 && !dismissed());
  let dismissSchedule;
  let progressStartSchedule;
  let progressTickSchedule;
  const cancelSchedules = () => {
    if (dismissSchedule !== undefined) $.CancelScheduled(dismissSchedule);
    if (progressStartSchedule !== undefined) $.CancelScheduled(progressStartSchedule);
    if (progressTickSchedule !== undefined) $.CancelScheduled(progressTickSchedule);
    dismissSchedule = undefined;
    progressStartSchedule = undefined;
    progressTickSchedule = undefined;
  };
  libs.createEffect(() => {
    const data = intelligence();
    cancelSchedules();
    if (data === undefined || data.amount <= 0) {
      return;
    }
    const previous = Math.max(0, data.current - data.amount);
    setDismissed(false);
    setDisplayedProgress(previous);
    progressStartSchedule = $.Schedule(1.05, () => {
      progressStartSchedule = undefined;
      let step = 0;
      const tick = () => {
        step++;
        setDisplayedProgress(Math.min(data.current, previous + Math.floor((data.current - previous) * step / 14)));
        progressTickSchedule = step < 14 ? $.Schedule(0.05, tick) : undefined;
      };
      tick();
    });
    dismissSchedule = $.Schedule(5, () => {
      dismissSchedule = undefined;
      setDismissed(true);
    });
  });
  libs.onCleanup(() => {
    cancelSchedules();
  });
  const HuntIntelligenceDisplay = () => {
    return (() => {
      const _el$ = libs.createElement("Panel", {
          id: "HuntIntelligenceRoot",
          hittest: false
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "HuntIntelligenceContent",
          hittest: false
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "CardMain",
          hittest: false
        }, _el$2);
        libs.createElement("Panel", {
          id: "RarityBG",
          hittest: false
        }, _el$3);
        const _el$5 = libs.createElement("Panel", {
          id: "HuntIntelligenceCardText",
          hittest: false
        }, _el$3),
        _el$6 = libs.createElement("Label", {
          "class": "HuntIntelligenceCardRarity",
          get text() {
            return GetLocalization(selectedCard().title);
          }
        }, _el$5),
        _el$7 = libs.createElement("Label", {
          "class": "HuntIntelligenceCardAmount",
          get text() {
            return LocalizeWithVars("#HuntIntelligence_Amount", {
              amount: amount()
            });
          }
        }, _el$5),
        _el$8 = libs.createElement("Label", {
          "class": "HuntIntelligenceCardState",
          get text() {
            return GetLocalization("#HuntIntelligence_Obtained");
          }
        }, _el$5),
        _el$9 = libs.createElement("Panel", {
          id: "HuntIntelligenceProgress"
        }, _el$2),
        _el$0 = libs.createElement("Panel", {
          id: "HuntIntelligenceProgressTrack"
        }, _el$9),
        _el$1 = libs.createElement("Panel", {
          id: "HuntIntelligenceProgressFill",
          get style() {
            return {
              width: `${Math.min(100, Math.max(0, displayedProgress() / INTELLIGENCE_LIMIT * 100))}%`
            };
          }
        }, _el$0),
        _el$10 = libs.createElement("Label", {
          id: "HuntIntelligenceProgressValue",
          get text() {
            return `${displayedProgress()} / ${INTELLIGENCE_LIMIT}`;
          }
        }, _el$9);
      libs.effect(_p$ => {
        const _v$ = {
            [selectedCard().className]: true
          },
          _v$2 = GetLocalization(selectedCard().title),
          _v$3 = LocalizeWithVars("#HuntIntelligence_Amount", {
            amount: amount()
          }),
          _v$4 = GetLocalization("#HuntIntelligence_Obtained"),
          _v$5 = {
            width: `${Math.min(100, Math.max(0, displayedProgress() / INTELLIGENCE_LIMIT * 100))}%`
          },
          _v$6 = `${displayedProgress()} / ${INTELLIGENCE_LIMIT}`;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "classList", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$8, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "style", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$10, "text", _v$6, _p$._v$6));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined,
        _v$4: undefined,
        _v$5: undefined,
        _v$6: undefined
      });
      return _el$;
    })();
  };
  return libs.createComponent(libs.Show, {
    get when() {
      return visible();
    },
    get children() {
      return libs.createComponent(HuntIntelligenceDisplay, {});
    }
  });
};
libs.render(() => libs.createComponent(HuntIntelligenceHud, {}), $.GetContextPanel());