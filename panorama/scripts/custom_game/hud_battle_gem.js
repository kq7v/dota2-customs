--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var server_dungeon_key = require('./server_dungeon_key.js');
var solid_utils = require('./solid_utils.js');
var abyss_hud_shared = require('./abyss_hud_shared.js');

const BattleGemFinishedSummary = props => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "BattleGemFinishedSummary",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "BattleGemFinishedTitle",
        get text() {
          return props.title;
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "BattleGemFinishedLevel",
        get text() {
          return props.level;
        }
      }, _el$);
    libs.effect(_p$ => {
      const _v$ = props.title,
        _v$2 = props.level;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const HUDBattleGem = () => {
  const battleGemState = solid_utils.createNetDataSignal("common", "battle_gem_state");
  const difficultyKey = solid_utils.createNetDataSignal("common", "difficulty_key");
  const now = abyss_hud_shared.createGameTimeSignal(100);
  const isVisible = libs.createMemo(() => {
    const state = battleGemState();
    return state?.isLoading === true || state?.isRunning === true || state?.isFinished === true;
  });
  const isFinished = libs.createMemo(() => battleGemState()?.isFinished === true);
  const remainSeconds = libs.createMemo(() => {
    const state = battleGemState();
    const endTime = state?.attackEndTime;
    const attackDuration = state?.attackDuration ?? 0;
    if (endTime === undefined) {
      return attackDuration;
    }
    return Math.max(0, Math.ceil(endTime - now()));
  });
  const progressPercent = libs.createMemo(() => {
    const attackDuration = battleGemState()?.attackDuration ?? 0;
    if (attackDuration <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(100, remainSeconds() / attackDuration * 100));
  });
  const levelText = libs.createMemo(() => {
    const state = battleGemState();
    return LocalizeWithVars("#BattleGemHudLevel", {
      current: state?.currentLevel ?? 0,
      max: state?.maxLevel ?? 0
    });
  });
  const enemyText = libs.createMemo(() => {
    const state = battleGemState();
    return LocalizeWithVars("#BattleGemHudEnemyCount", {
      alive: state?.aliveEnemyCount ?? 0,
      total: state?.totalEnemyCount ?? 0
    });
  });
  return (() => {
    const _el$4 = libs.createElement("Panel", {
        id: "HUDBattleGemRoot",
        get ["class"]() {
          return libs.classNames({
            Show: isVisible(),
            Finished: isFinished()
          });
        },
        hittest: false
      }, null),
      _el$5 = libs.createElement("Panel", {
        id: "BattleGemTopCenter",
        hittest: false
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        id: "BattleGemTopTextPanel"
      }, _el$5),
      _el$7 = libs.createElement("Label", {
        id: "BattleGemTitle",
        get text() {
          return GetLocalization("#BattleGemHudTitle");
        }
      }, _el$6),
      _el$8 = libs.createElement("Label", {
        id: "BattleGemEnemyCount",
        get text() {
          return enemyText();
        }
      }, _el$6),
      _el$9 = libs.createElement("Panel", {
        id: "BattleGemProgressBar",
        "class": "BattleGemProgressBar",
        hittest: false
      }, _el$5);
      libs.createElement("Image", {
        id: "BattleGemProgressBarBg",
        "class": "BattleGemProgressBarBg"
      }, _el$9);
      const _el$1 = libs.createElement("Panel", {
        id: "BattleGemProgressFillClip",
        "class": "BattleGemProgressFillClip",
        get style() {
          return {
            width: abyss_hud_shared.formatPercent(progressPercent())
          };
        }
      }, _el$9);
      libs.createElement("Image", {
        id: "BattleGemProgressFill",
        "class": "BattleGemProgressFill"
      }, _el$1);
      const _el$11 = libs.createElement("Label", {
        id: "BattleGemTimeLabel",
        get text() {
          return `${remainSeconds()}S`;
        }
      }, _el$9),
      _el$12 = libs.createElement("Label", {
        id: "BattleGemLevelLabel",
        get text() {
          return levelText();
        }
      }, _el$9);
    libs.insert(_el$5, libs.createComponent(BattleGemFinishedSummary, {
      get title() {
        return GetLocalization("#BattleGemHudTitle");
      },
      get level() {
        return levelText();
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return difficultyKey();
      },
      get children() {
        const _el$13 = libs.createElement("Panel", {
            id: "BattleGemDungeonKeyDock"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "BattleGemDungeonKeyDockParticle",
            particleName: "particles/generic_gameplay/rune/wishing_pool_exite.vpcf",
            cameraOrigin: "0 0 300",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$13);
        libs.insert(_el$13, libs.createComponent(server_dungeon_key.DungeonKey, {
          get data() {
            return difficultyKey().key_data;
          }
        }), null);
        return _el$13;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = libs.classNames({
          Show: isVisible(),
          Finished: isFinished()
        }),
        _v$4 = GetLocalization("#BattleGemHudTitle"),
        _v$5 = enemyText(),
        _v$6 = {
          width: abyss_hud_shared.formatPercent(progressPercent())
        },
        _v$7 = `${remainSeconds()}S`,
        _v$8 = levelText();
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "class", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$1, "style", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$11, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$12, "text", _v$8, _p$._v$8));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined
    });
    return _el$4;
  })();
};
libs.render(() => libs.createComponent(HUDBattleGem, {}), $.GetContextPanel());