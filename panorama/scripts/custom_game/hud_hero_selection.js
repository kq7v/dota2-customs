--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_Button = require('./EOM_Button.js');
var hero_card = require('./hero_card.js');
var hero_level_main = require('./hero_level_main.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var weapon3DPreview = require('./weapon3DPreview.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_HeroImage.js');

const HeroSelection = () => {
  const playerID = Players.GetLocalPlayer();
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
  const GetPlayerConfig = (key, defaultValue) => {
    return player_key_values()[key] != undefined ? player_key_values()[key].value : defaultValue;
  };
  const first_hero_selection = solid_utils.createPlayerNetDataSignal("common", "first_hero_selection", {
    end_time: -1
  }, playerID);
  const hero_selection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const playerAccountLevel = service_netdata_helper.usePlayerAccountLevel("hero_level");
  const heroNames = Object.keys(KeyValues.heroes).sort((a, b) => (KeyValues.heroes[b].SortOrder ?? 0) - (KeyValues.heroes[a].SortOrder ?? 0));
  const [previewHeroName, setPreviewHeroName] = libs.createSignal(heroNames[0]);
  libs.createEffect(libs.on(player_key_values, () => {
    const lastSelectedHero = GetPlayerConfig("select_hero");
    if (lastSelectedHero && lastSelectedHero != "" && heroNames.includes(lastSelectedHero)) {
      setPreviewHeroName(lastSelectedHero);
    }
  }));
  const [countdown, setCountdown] = libs.createSignal(0);
  const heroKV = libs.createMemo(() => KeyValues.heroes[previewHeroName()]);
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  const [gamepadBindings, setGamepadBindings] = libs.createSignal({
    ...DEFAULT_GAMEPAD_BINDINGS
  });
  libs.createEffect(libs.on(player_key_values, data => {
    const nextGamepadBindings = {
      ...DEFAULT_GAMEPAD_BINDINGS
    };
    for (const key in data) {
      if (key.startsWith("keybind_gamepad_")) {
        const func = key.replace("keybind_gamepad_", "");
        nextGamepadBindings[func] = data[key].value;
      }
    }
    setGamepadBindings(nextGamepadBindings);
  }));
  const getGamepadHotkey = func => {
    return gamepadBindings()[func] ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
  };
  let countdownTimer;
  const heroID = libs.createMemo(() => GetHeroIDByHeroName(previewHeroName()));
  const player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  const equipWeaponID = libs.createMemo(() => {
    const heroData = player_heroes()[String(heroID())];
    return heroData?.equip_weapon;
  });
  const previewWeaponData = libs.createMemo(() => KeyValues.weapon[equipWeaponID()]);
  libs.createEffect(libs.on(() => gameState()?.state, state => {
    if (state === "GameState_Login") {
      CallAction("/v1/player/set_lang", {
        lang: $.Language().toLowerCase()
      });
      print("Set Lang:", $.Language().toLowerCase());
    }
  }));
  const stopCountdown = () => {
    if (countdownTimer != undefined) {
      clearInterval(countdownTimer);
      countdownTimer = undefined;
    }
  };
  libs.createEffect(libs.on(() => [hero_selection()?.heroIndex, first_hero_selection().end_time], ([heroIndex, endTime]) => {
    stopCountdown();
    if (heroIndex != undefined || endTime == undefined || endTime < 0) {
      setCountdown(0);
      return;
    }
    const updateCountdown = () => {
      const remain = Math.max(0, Math.floor(endTime - Game.GetGameTime()));
      setCountdown(remain);
      if (remain <= 0) {
        stopCountdown();
      }
    };
    updateCountdown();
    if (endTime > Game.GetGameTime()) {
      countdownTimer = setInterval(() => {
        updateCountdown();
      }, 1000);
    }
  }));
  const movePreviewHero = delta => {
    if (heroNames.length <= 0) {
      return;
    }
    const currentIndex = heroNames.indexOf(previewHeroName());
    const baseIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (baseIndex + delta + heroNames.length) % heroNames.length;
    setPreviewHeroName(heroNames[nextIndex]);
  };
  let hasReportedHeroSelectionPick = false;
  const selectPreviewHero = () => {
    if (!hasReportedHeroSelectionPick) {
      hasReportedHeroSelectionPick = true;
      GameUI.CustomUIConfig().PlayerTypeReport("hero_selection|pick");
    }
    GameEvents.SendCustomEventToServer("select_hero", {
      heroName: previewHeroName()
    });
  };
  useClientSideEvent("key_pressed", data => {
    if (isGamepad() != true) {
      return;
    }
    if (hero_selection()?.pickHeroName != undefined || gameState()?.state == "GameState_Login") {
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp || data.keyFunction == KeyFunction.Up) {
      movePreviewHero(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown || data.keyFunction == KeyFunction.Down) {
      movePreviewHero(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm) {
      selectPreviewHero();
    }
  });
  libs.onCleanup(() => {
    stopCountdown();
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HeroSelection",
        get ["class"]() {
          return libs.classNames({
            Show: hero_selection()?.pickHeroName == undefined && gameState()?.state != "GameState_Login"
          });
        }
      }, null);
      libs.createElement("DOTAScenePanel", {
        id: "HeroSelection3DScene",
        map: "scene/hero_selection",
        camera: "camera_1",
        light: "global_light"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "Countdown"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "NumberContent"
      }, _el$3),
      _el$5 = libs.createElement("Label", {
        id: "Value",
        get text() {
          return String(countdown());
        }
      }, _el$4);
      libs.createElement("Label", {
        id: "Unit",
        text: "s"
      }, _el$4);
      const _el$7 = libs.createElement("Panel", {
        id: "HeroSelectionList"
      }, _el$);
      libs.createElement("Panel", {
        id: "TopDecorator"
      }, _el$7);
      libs.createElement("Label", {
        id: "HeroSelectionLabel",
        text: "#HeroSelection_Title"
      }, _el$7);
      libs.createElement("Panel", {
        id: "LineTop"
      }, _el$7);
      const _el$1 = libs.createElement("Panel", {
        id: "LineBottom"
      }, _el$7),
      _el$10 = libs.createElement("DOTAParticleScenePanel", {
        "class": "HeroSelectionParticleScene",
        hittest: false,
        squarePixels: true,
        particleName: "particles/ui/game/ui_game_chuangjue_smoke_fxa.vpcf",
        cameraOrigin: "200 0 0",
        lookAt: "0 0 0",
        fov: 90
      }, _el$),
      _el$11 = libs.createElement("Panel", {
        id: "HeroDetail"
      }, _el$),
      _el$12 = libs.createElement("Panel", {
        id: "HeroNameRow"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Divider"
      }, _el$11);
      const _el$14 = libs.createElement("Panel", {
        id: "HeroAttribute"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Health",
        "class": "AttributeIcon"
      }, _el$14);
      libs.createElement("Label", {
        "class": "AttributeName",
        text: "#property_health"
      }, _el$14);
      const _el$17 = libs.createElement("Label", {
        "class": "AttributeValue",
        get text() {
          return heroKV()?.StatusHealth;
        }
      }, _el$14),
      _el$18 = libs.createElement("Panel", {
        id: "HeroAttribute"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Attack",
        "class": "AttributeIcon"
      }, _el$18);
      libs.createElement("Label", {
        "class": "AttributeName",
        text: "#property_attack"
      }, _el$18);
      const _el$21 = libs.createElement("Label", {
        "class": "AttributeValue",
        get text() {
          return heroKV()?.AttackDamageMax;
        }
      }, _el$18),
      _el$22 = libs.createElement("Panel", {
        id: "HeroAttribute"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Armor",
        "class": "AttributeIcon"
      }, _el$22);
      libs.createElement("Label", {
        "class": "AttributeName",
        text: "#property_damage_reduction"
      }, _el$22);
      const _el$25 = libs.createElement("Label", {
        "class": "AttributeValue",
        get text() {
          return heroKV()?.ArmorPhysical;
        }
      }, _el$22),
      _el$26 = libs.createElement("Panel", {
        id: "HeroAttribute"
      }, _el$11);
      libs.createElement("Panel", {
        id: "Movespeed",
        "class": "AttributeIcon"
      }, _el$26);
      libs.createElement("Label", {
        "class": "AttributeName",
        text: "#property_movespeed"
      }, _el$26);
      const _el$29 = libs.createElement("Label", {
        "class": "AttributeValue",
        get text() {
          return heroKV()?.MovementSpeed;
        }
      }, _el$26),
      _el$30 = libs.createElement("Panel", {
        id: "LabelDivider"
      }, _el$11);
      libs.createElement("Label", {
        text: "#HeroSelection_Ability"
      }, _el$30);
      libs.createElement("Image", {}, _el$30);
      const _el$33 = libs.createElement("Panel", {
        id: "AbilityList"
      }, _el$11),
      _el$34 = libs.createElement("Panel", {
        id: "LabelDivider"
      }, _el$11);
      libs.createElement("Label", {
        text: "#HeroSelection_Weapon"
      }, _el$34);
      libs.createElement("Image", {}, _el$34);
      const _el$37 = libs.createElement("Panel", {
        id: "WeaponContainer"
      }, _el$11);
    libs.insert(_el$7, libs.createComponent(libs.For, {
      each: heroNames,
      children: (heroName, index) => {
        return libs.createComponent(hero_card.HeroCard, {
          heroName: heroName,
          get selected() {
            return previewHeroName() == heroName;
          },
          get marginTop() {
            return index() == 0 ? "0px" : "26px";
          },
          onactivate: () => {
            GameUI.CustomUIConfig().PlayerTypeReport(`hero_selection|card|${heroName}`);
            setPreviewHeroName(heroName);
          }
        });
      }
    }), _el$1);
    libs.insert(_el$, libs.createComponent(solid_utils.DynamicKey, {
      key: previewHeroName,
      children: hero => libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
        id: "FullBodyPreview",
        unit: hero
      })
    }), _el$10);
    libs.insert(_el$12, libs.createComponent(hero_level_main.HeroLevelMain, {
      get level() {
        return playerAccountLevel().level;
      },
      get extraExp() {
        return playerAccountLevel().extra_exp;
      },
      get title() {
        return "#" + previewHeroName();
      }
    }));
    libs.insert(_el$33, libs.createComponent(libs.For, {
      each: [3, 0, 1, 2, 5],
      children: (abilityIndex, index) => {
        const abilityName = libs.createMemo(() => heroKV()["Ability" + (abilityIndex + 1)]);
        return (() => {
          const _el$38 = libs.createElement("Panel", {
              id: "AbilityContainer",
              get marginLeft() {
                return index() == 0 ? "0px" : "12px";
              }
            }, null),
            _el$39 = libs.createElement("DOTAAbilityImage", {
              get abilityname() {
                return abilityName();
              }
            }, _el$38);
          libs.effect(_p$ => {
            const _v$8 = index() == 0 ? "0px" : "12px",
              _v$9 = {
                name: "hero_ability",
                abilityName: abilityName()
              },
              _v$0 = abilityName();
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$38, "marginLeft", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$38, "customTooltip", _v$9, _p$._v$9));
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$39, "abilityname", _v$0, _p$._v$0));
            return _p$;
          }, {
            _v$8: undefined,
            _v$9: undefined,
            _v$0: undefined
          });
          return _el$38;
        })();
      }
    }));
    libs.insert(_el$37, libs.createComponent(solid_utils.DynamicKey, {
      key: previewWeaponData,
      children: data => {
        if (data != undefined) {
          return libs.createComponent(weapon3DPreview.Weapon3DPreview, {
            id: "WeaponIcon",
            get model() {
              return data.model;
            },
            get defaultConfig() {
              return data.hero;
            }
          });
        }
      }
    }));
    libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_Button, {
      id: "SelectHero",
      text: "#HeroSelection_Pick",
      onactivate: selectPreviewHero,
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return isGamepad();
          },
          get children() {
            return libs.createComponent(EOM_GamePad.EOM_GamePad, {
              get keyName() {
                return getGamepadHotkey(KeyFunction.OptionConfirm);
              }
            });
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames({
          Show: hero_selection()?.pickHeroName == undefined && gameState()?.state != "GameState_Login"
        }),
        _v$2 = hero_selection()?.heroIndex == undefined,
        _v$3 = String(countdown()),
        _v$4 = heroKV()?.StatusHealth,
        _v$5 = heroKV()?.AttackDamageMax,
        _v$6 = heroKV()?.ArmorPhysical,
        _v$7 = heroKV()?.MovementSpeed;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "visible", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$17, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$21, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$25, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$29, "text", _v$7, _p$._v$7));
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
libs.render(() => libs.createComponent(HeroSelection, {}), $.GetContextPanel());