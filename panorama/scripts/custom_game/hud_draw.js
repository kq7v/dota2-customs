--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Loading = require('./EOM_Loading.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_ToggleButton = require('./EOM_ToggleButton.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var ExchangeStore = require('./ExchangeStore.js');
var Player = require('./Player.js');
var portraitsCourier = require('./portraitsCourier.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var weapon3DPreview = require('./weapon3DPreview.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_RedMark.js');
require('./EOM_TextEntry.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

var EDrawState = function (EDrawState) {
  EDrawState[EDrawState["common"] = 0] = "common";
  EDrawState[EDrawState["waiting"] = 1] = "waiting";
  EDrawState[EDrawState["waiting_circle"] = 2] = "waiting_circle";
  EDrawState[EDrawState["result_flip"] = 3] = "result_flip";
  EDrawState[EDrawState["result"] = 4] = "result";
  return EDrawState;
}(EDrawState || {});
let PoolIDList = Object.entries(KeyValues.drawcards).sort((a, b) => a[1].order - b[1].order).map(([k, v]) => k);
const timestamp = CustomUIConfig.GetServerTimeStamp();
const getHeroModelList = pool => {
  const list = [];
  const poolData = KeyValues.drawcards_pond[String(pool)];
  if (poolData == undefined) return;
  poolData.map(v => {
    if (v.drop_rarity == 5) {
      const heroName = GetHeroNameByGoodID(String(v.drop_id));
      if (heroName) {
        list.push(heroName);
      }
    }
  });
  return list;
};
const getCourierModelList = pool => {
  const list = [];
  const poolData = KeyValues.drawcards_pond[String(pool)];
  if (poolData == undefined) return;
  poolData.map(v => {
    if (v.drop_rarity == 5) {
      const itemID = String(v.drop_id);
      if (KeyValues.service_courier[itemID]) {
        let draw_scale = KeyValues.service_courier[itemID].draw_scale;
        if (draw_scale == 0) {
          draw_scale = 1;
        }
        list.push({
          id: Number(itemID),
          scale: draw_scale
        });
      }
    }
  });
  return list;
};
const getWeaponModelList = pool => {
  const list = [];
  const poolData = KeyValues.drawcards_pond[String(pool)];
  if (poolData == undefined) return;
  poolData.map(v => {
    if (v.drop_rarity == 5) {
      const itemID = String(v.drop_id);
      if (KeyValues.weapon[itemID]) {
        list.push({
          id: Number(itemID),
          scale: 1
        });
      }
    }
  });
  return list;
};
const localPoolConfigs = (() => {
  const data = {};
  Object.values(KeyValues.drawcards).map(pool => {
    if (pool.show == 1) {
      data[pool.id] = {
        type: pool.type,
        hero_model: getHeroModelList(pool.id),
        courier_model: getCourierModelList(pool.id),
        weapon_model: getWeaponModelList(pool.id)
      };
    }
  });
  return data;
})();
function getDefaultDrawPool() {
  return PoolIDList.filter(poolID => {
    const config = KeyValues.drawcards[poolID];
    const validTime = config.open_time < timestamp && (config.end_time > timestamp || config.end_time == 0);
    return config.show == 1 && validTime;
  })[0];
}
const animationDelay = 0.12;
const animationDelay2 = 0.05;
const [show, setShow] = solid_utils.createToggleWindowSignal("MenuButton_draw");
let selectedPool = getDefaultDrawPool;
let SetSelectedPool = () => getDefaultDrawPool();
let drawState = () => EDrawState.common;
let SetDrawState = () => EDrawState.common;
let bSkipAnimation = () => false;
let SetSkipAnimation = () => false;
let resultList = () => [];
let SetResultList = () => [];
let poolConfig = () => KeyValues.drawcards[getDefaultDrawPool()];
let poolLocalConfig = () => localPoolConfigs[getDefaultDrawPool()];
let tokens = () => [];
let heroModelList = () => [];
let flipSchedule = undefined;
function CancelFlip() {
  if (flipSchedule != undefined) {
    try {
      $.CancelScheduled(flipSchedule);
    } catch (error) {} finally {
      flipSchedule = undefined;
    }
  }
}
let player_card_lucky_choice = () => ({});
let player_card_guarantees = () => ({});
const player_props = solid_utils.createServiceNetData("player_props");
const player_tokens = solid_utils.createServiceNetData("player_tokens");
const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
const [poolRedPointStates, setPoolRedPointStates] = libs.createStore({});
function getPoolRedPointKey(poolID) {
  return `draw_pool_new_${poolID}`;
}
function getSavedPoolRedPointState(poolID) {
  const value = player_key_values()[getPoolRedPointKey(poolID)]?.value;
  if (value == undefined) return;
  const state = JSON.parseSafe(value);
  if (typeof state?.itemCount != "number" || typeof state?.unread != "boolean") return;
  return state;
}
function getPoolRedPointState(poolID) {
  return poolRedPointStates[poolID] ?? getSavedPoolRedPointState(poolID);
}
function savePoolRedPointState(poolID, state) {
  setPoolRedPointStates(poolID, state);
  CallAction("/v1/key/save", {
    type: "setting",
    key: getPoolRedPointKey(poolID),
    value: JSON.stringify(state)
  });
}
function getPoolItemCount(poolID) {
  const itemID = KeyValues.drawcards[poolID].item;
  const propType = GetPropType(itemID);
  if (propType == PropType.Token) {
    return player_tokens()?.[String(itemID)]?.amounts ?? 0;
  }
  if (propType == PropType.Collection) {
    let amounts = 0;
    const props = player_props();
    if (props == undefined) return amounts;
    for (const prop of Object.values(props)) {
      if (prop.prop_id == itemID) {
        amounts += prop.amounts;
      }
    }
    return amounts;
  }
  return 0;
}
function isPoolItemDataReady(poolID) {
  const propType = GetPropType(KeyValues.drawcards[poolID].item);
  if (propType == PropType.Token) return player_tokens() != undefined;
  if (propType == PropType.Collection) return player_props() != undefined;
  return true;
}
function isPoolNew(poolID) {
  if (KeyValues.drawcards[poolID].red_point != 1) return false;
  const state = getPoolRedPointState(poolID);
  return state == undefined || state.unread;
}
function markPoolViewed(poolID) {
  if (KeyValues.drawcards[poolID].red_point != 1) return;
  if (!isPoolItemDataReady(poolID)) return;
  savePoolRedPointState(poolID, {
    itemCount: getPoolItemCount(poolID),
    unread: false
  });
}
libs.createEffect(() => {
  for (const poolID of PoolIDList) {
    if (KeyValues.drawcards[poolID].red_point != 1) continue;
    if (!isPoolItemDataReady(poolID)) continue;
    const state = getPoolRedPointState(poolID);
    if (state == undefined) continue;
    const itemCount = getPoolItemCount(poolID);
    if (itemCount == state.itemCount) continue;
    savePoolRedPointState(poolID, {
      itemCount,
      unread: state.unread || itemCount > state.itemCount
    });
  }
});
const info_cards = solid_utils.createGlobalServiceNetData("info_cards", {});
libs.createEffect(() => {
  const cards = info_cards();
  const hasNew = PoolIDList.some(poolID => {
    const config = KeyValues.drawcards[poolID];
    const infoCard = cards[poolID];
    const validTime = infoCard != undefined && infoCard.start_time < timestamp && (infoCard.end_time > timestamp || infoCard.end_time == 0);
    return config.show == 1 && validTime && isPoolNew(poolID);
  });
  CustomUIConfig.SetRedPoint(hasNew, "draw");
});
const curPoolSelectLucky = () => {
  return player_card_lucky_choice()?.[selectedPool()]?.lucky_choice ?? undefined;
};
function createDrawPageState() {
  [selectedPool, SetSelectedPool] = libs.createSignal(getDefaultDrawPool());
  [drawState, SetDrawState] = libs.createSignal(EDrawState.common);
  [bSkipAnimation, SetSkipAnimation] = libs.createSignal(false);
  [resultList, SetResultList] = libs.createSignal([]);
  poolConfig = libs.createMemo(() => KeyValues.drawcards[selectedPool()]);
  poolLocalConfig = libs.createMemo(() => localPoolConfigs[selectedPool()]);
  tokens = libs.createMemo(() => {
    let result = [];
    if (poolConfig().store_tag != "") {
      result = Array.from(new Set(Object.values(KeyValues.info_shop_product).map(v => {
        if (v.tag == poolConfig().store_tag) {
          return v.pay_type;
        }
        return undefined;
      }))).filter(v => v !== undefined);
    }
    return result.concat([poolConfig().item, 110001]);
  });
  heroModelList = libs.createMemo(() => {
    let hero_model = [...(poolLocalConfig()?.hero_model ?? [])];
    if (hero_model.length > 0) {
      let result = [];
      for (let i = hero_model.length - 1; i > 0; i--) {
        let j = $.RandomInt(0, i);
        [hero_model[j], hero_model[i]] = [hero_model[i], hero_model[j]];
      }
      for (let i = 0; i < 3; i++) {
        if (hero_model[i]) {
          result.push(hero_model[i]);
        }
      }
      return result;
    }
    return poolLocalConfig()?.hero_model;
  });
  player_card_lucky_choice = solid_utils.createServiceNetData("player_card_lucky_choice", {});
  player_card_guarantees = solid_utils.createServiceNetData("player_card_guarantees", {});
  solid_utils.createServiceNetData("player_shop_product_limits", {});
  libs.createEffect(old => {
    let s = show();
    let state = drawState();
    let hide = s && state != EDrawState.common;
    if (hide != old) {
      GameEvents.SendEventClientSide("client_side_event", {
        event_name: "set_menu_bar_visible",
        event_data: JSON.stringify({
          key: "draw",
          hide: hide
        })
      });
    }
    return hide;
  }, false);
  libs.onCleanup(() => {
    GameEvents.SendEventClientSide("client_side_event", {
      event_name: "set_menu_bar_visible",
      event_data: JSON.stringify({
        key: "draw",
        hide: false
      })
    });
  });
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useClientSideEvent("draw_select_pool", event => {
      const poolID = String(event.poolID);
      const config = KeyValues.drawcards[poolID];
      const timestamp = CustomUIConfig.GetServerTimeStamp();
      const validTime = config != undefined && config.open_time < timestamp && (config.end_time > timestamp || config.end_time == 0);
      if (config == undefined || config.show != 1 || !validTime) {
        return;
      }
      SetSelectedPool(poolID);
      markPoolViewed(poolID);
    }));
    libs.onCleanup(() => {
      for (const id of gameEventIDList) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
}
function DrawPage() {
  createDrawPageState();
  const [showExchangeStore, setShowExchangeStore] = libs.createSignal(false);
  libs.onMount(() => {
    const id = useClientSideEvent("draw_show_exchange_store", () => {
      setShowExchangeStore(true);
    });
    libs.onCleanup(() => GameEvents.Unsubscribe(id));
  });
  const currencyTokens = libs.createMemo(() => {
    const currentTokens = tokens();
    if (!showExchangeStore()) return currentTokens;
    return currentTokens.map((token, index) => index == currentTokens.length - 1 && token == 110001 ? 110002 : token);
  });
  const luckyValue = libs.createMemo(() => {
    const data = player_card_guarantees()[poolConfig().inheritance_lucky ?? 0];
    const rarity = 5;
    return data?.[rarity] ?? 0;
  });
  const luckyPercent = () => luckyValue() / Math.max(1, poolConfig().q5_must);
  libs.createEffect(libs.on(selectedPool, pool => {
  }));
  let PoolMenu;
  const debugItems = [{
    item_id: 180101,
    amounts: 1,
    item_rarity: 1,
    draw_card_rarity: 1
  }, {
    item_id: 180101,
    amounts: 1,
    item_rarity: 1,
    draw_card_rarity: 4
  }, {
    item_id: 1000025,
    amounts: 1,
    item_rarity: 1,
    draw_card_rarity: 1
  }, {
    item_id: 600001,
    amounts: 1,
    item_rarity: 1,
    draw_card_rarity: 1
  }, {
    item_id: 510001,
    amounts: 40,
    item_rarity: 1,
    draw_card_rarity: 5
  }, {
    item_id: 510002,
    amounts: 40,
    item_rarity: 1,
    draw_card_rarity: 2
  }, {
    item_id: 510003,
    amounts: 40,
    item_rarity: 1,
    draw_card_rarity: 3
  }, {
    item_id: 510004,
    amounts: 40,
    item_rarity: 1,
    draw_card_rarity: 1
  }, {
    item_id: 180101,
    amounts: 1,
    item_rarity: 1,
    draw_card_rarity: 1
  }, {
    item_id: 180101,
    amounts: 1,
    item_rarity: 1,
    draw_card_rarity: 6
  }];
  async function Draw(count, debug = false) {
    CancelFlip();
    let error = false;
    const skipAnimation = bSkipAnimation();
    SetResultList([]);
    SetDrawState(EDrawState.waiting);
    Game.EmitSound("playercard.deal_five");
    if (debug) {
      if (count == 1) {
        SetResultList([{
          item_id: 403201,
          amounts: 1,
          item_rarity: 2,
          draw_card_rarity: 2
        }]);
      } else {
        SetResultList(debugItems);
      }
    } else {
      ServerRequest("draw_card", {
        count,
        id: poolConfig().id
      }, data => {
        if (data.items_list && data.items_list.length > 0) {
          SetResultList(data.items_list);
        } else {
          error = true;
        }
      }, 15, () => {
        error = true;
      });
    }
    if (resultList().length <= 0) {
      SetDrawState(EDrawState.waiting_circle);
      await Timer.WaitConditionPromise(() => error || resultList().length > 0);
    }
    if (error) {
      SetDrawState(EDrawState.common);
      return;
    }
    if (skipAnimation) {
      SetDrawState(EDrawState.result);
    } else {
      SetDrawState(EDrawState.result_flip);
      flipSchedule = $.Schedule(animationDelay * (count - 1) + 0.3, () => SetDrawState(EDrawState.result));
    }
  }
  const particleRecord = {
    5: "particles/ui/game/ui_game_fx_chouka_pinzhi_jinse_zong.vpcf",
    4: "particles/ui/game/ui_game_fx_chouka_pinzhi_zise_zong.vpcf",
    3: "particles/ui/game/ui_game_fx_chouka_pinzhi_lanse_zong.vpcf"
  };
  const DrawItem = props => {
    const [local, others] = libs.splitProps(props, ["data", "i", "rowClass", "animTime"]);
    let {
      item_id,
      draw_card_rarity,
      amounts,
      origin_item_id
    } = local.data;
    let transformed = undefined;
    let transformed_amounts = undefined;
    if (origin_item_id != undefined) {
      transformed = item_id;
      transformed_amounts = amounts;
      item_id = origin_item_id;
      amounts = 1;
    }
    let propType = GetPropType(item_id);
    let itemName = String(item_id);
    let amountShowText = "";
    const heroInfo = GetHeroInfoByGoodID(item_id);
    if (heroInfo != undefined) {
      if (amounts >= 40) {
        amountShowText = "#Draw_Convert_Amount";
        itemName = heroInfo.heroName;
      } else {
        amountShowText = "#Draw_Fragment_Amount";
      }
    } else {
      amountShowText = `X${amounts}`;
    }
    const fxName = particleRecord[draw_card_rarity];
    if (draw_card_rarity == 5) {
      Game.EmitSound("ui.treasure_0" + $.RandomInt(1, 3));
    } else if (draw_card_rarity == 4) {
      Game.EmitSound("UI.Draw.Rarity4");
    }
    return (() => {
      const _el$ = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("ResultItem", "Rarity_" + draw_card_rarity, local.rowClass, "PropType" + propType);
          },
          hittest: false
        }, null),
        _el$3 = libs.createElement("Panel", {
          id: "CardMain"
        }, _el$);
        libs.createElement("Panel", {
          id: "RarityBG",
          hittest: false
        }, _el$3);
        const _el$5 = libs.createElement("Panel", {
          id: "ClipContainer",
          get ["class"]() {
            return poolConfig()?.type;
          }
        }, _el$3),
        _el$7 = libs.createElement("Label", {
          id: "ItemTitle",
          text: "#" + itemName
        }, _el$3);
        libs.createElement("Panel", {
          id: "SplitLine"
        }, _el$3);
      libs.setProp(_el$, "onload", async p => {
        let fx = () => {
          let cardFlashFx = p.FindChild("CardFlashFx");
          if (cardFlashFx) {
            cardFlashFx.ReloadScene();
            cardFlashFx.AddClass("FxShow");
          }
        };
        await Timer.Wait(0.1);
        const cardFx = p.FindChildTraverse("CardFx");
        if (cardFx) {
          cardFx.ReloadScene();
        }
        await Timer.Wait(local.animTime);
        if (p.IsValid()) {
          p.AddClass("PreFade");
          p.AddClass("FadeOk");
          await Timer.Wait(0.4);
          fx();
        }
      });
      libs.insert(_el$, libs.createComponent(libs.Show, {
        when: fxName,
        get children() {
          const _el$2 = libs.createElement("DOTAParticleScenePanel", {
            id: "CardFx",
            particleName: fxName,
            cameraOrigin: "0 0 320",
            lookAt: "0 0 0",
            fov: 90,
            hittest: false
          }, null);
          libs.setProp(_el$2, "particleName", fxName);
          return _el$2;
        }
      }), _el$3);
      libs.insert(_el$5, libs.createComponent(libs.Switch, {
        get fallback() {
          return libs.createComponent(StoreItem.StoreItemImage, {
            itemid: item_id
          });
        },
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return heroInfo != undefined && heroInfo.heroName == itemName;
            },
            get children() {
              const _el$6 = libs.createElement("Panel", {
                "class": "ModelContainer",
                hittest: true,
                hittestchildren: false
              }, null);
              libs.setProp(_el$6, "onmouseover", p => ShowCustomTooltip(p, "hero_info", {
                hero_id: String(heroInfo.heroID)
              }));
              libs.setProp(_el$6, "onmouseout", p => HideCustomTooltip(p, "hero_info"));
              libs.insert(_el$6, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
                camera: "draw_card",
                get id() {
                  return heroInfo?.heroName ?? "";
                },
                "class": "ResultHeroModel",
                get unit() {
                  return heroInfo?.heroName ?? "";
                }
              }));
              return _el$6;
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return KeyValues.weapon[item_id];
            },
            get children() {
              return libs.createComponent(weapon3DPreview.Weapon3DPreview, {
                hittest: true,
                hittestchildren: false,
                get model() {
                  return KeyValues.weapon[item_id]?.model ?? "";
                },
                get defaultConfig() {
                  return KeyValues.weapon[item_id]?.hero;
                },
                onmouseover: p => ShowCustomTooltip(p, "weapon_info", {
                  weapon_id: String(item_id)
                }),
                onmouseout: p => HideCustomTooltip(p, "weapon_info")
              });
            }
          })];
        }
      }));
      libs.setProp(_el$7, "text", "#" + itemName);
      libs.insert(_el$3, libs.createComponent(libs.Show, {
        when: amounts > 1,
        get children() {
          const _el$9 = libs.createElement("Label", {
            id: "ItemCount",
            vars: {
              value: amounts
            },
            text: amountShowText,
            html: true
          }, null);
          libs.setProp(_el$9, "vars", {
            value: amounts
          });
          libs.setProp(_el$9, "text", amountShowText);
          return _el$9;
        }
      }), null);
      libs.insert(_el$3, libs.createComponent(libs.Show, {
        when: transformed != undefined,
        get children() {
          return [(() => {
            const _el$0 = libs.createElement("Panel", {
                id: "TransformName"
              }, null);
              libs.createElement("Label", {
                text: "#Draw_Transform"
              }, _el$0);
            return _el$0;
          })(), (() => {
            const _el$10 = libs.createElement("Panel", {
              id: "TransformItemContainer"
            }, null);
            libs.insert(_el$10, libs.createComponent(StoreItem.StoreItemBlock, {
              item_id: transformed,
              amounts: transformed_amounts
            }));
            return _el$10;
          })()];
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        when: draw_card_rarity >= 4,
        get children() {
          return libs.createElement("DOTAParticleScenePanel", {
            id: "CardFlashFx",
            particleName: "particles/ui/game/ui_game_fx_chouka_shanguang_01l.vpcf",
            cameraOrigin: "0 0 159",
            lookAt: "0 0 0",
            fov: 90,
            hittest: false
          }, null);
        }
      }), null);
      libs.effect(_p$ => {
        const _v$ = libs.classNames("ResultItem", "Rarity_" + draw_card_rarity, local.rowClass, "PropType" + propType),
          _v$2 = poolConfig()?.type;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "class", _v$2, _p$._v$2));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined
      });
      return _el$;
    })();
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "HudDrawRoot",
    name: "MenuButton_draw",
    renderOnShow: true,
    get show() {
      return show();
    },
    get ["class"]() {
      return libs.classNames(`Pool_${selectedPool()}`, `PoolType_${poolConfig()?.type}`, `State_${EDrawState[drawState()]}`);
    },
    get backgroundChildren() {
      return (() => {
        const _el$49 = libs.createElement("Panel", {
            "class": "HudBG"
          }, null);
          libs.createElement("Panel", {
            "class": "Background"
          }, _el$49);
          libs.createElement("Panel", {
            "class": "Background2"
          }, _el$49);
        return _el$49;
      })();
    },
    close: () => {
      if (drawState() >= EDrawState.result_flip) {
        CancelFlip();
        SetDrawState(EDrawState.common);
      } else {
        if (showExchangeStore()) {
          setShowExchangeStore(false);
        } else {
          ClientSideEvent("custom_ui_toggle_windows", {
            windowName: "MenuButton_draw",
            state: 0
          });
        }
      }
    },
    get children() {
      return [libs.createComponent(Player.CurrencyGroup, {
        get tokens() {
          return currencyTokens();
        }
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return poolConfig()?.type == "weapon";
            },
            get children() {
              return [libs.createElement("DOTAParticleScenePanel", {
                id: "BGLight",
                particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
                cameraOrigin: "0 0 700",
                fov: 90,
                lookAt: "0 0 0",
                hittest: false,
                squarePixels: true
              }, null), libs.createElement("DOTAParticleScenePanel", {
                id: "BottomParticle",
                particleName: "particles/ui/game/ui_game_spark_particle_fx.vpcf",
                cameraOrigin: "0 0 800",
                fov: 90,
                lookAt: "0 0 0",
                hittest: false,
                squarePixels: true
              }, null), libs.createElement("Panel", {
                id: "WeaponBG"
              }, null)];
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return selectedPool() == "2004";
            },
            get children() {
              return libs.createElement("DOTAParticleScenePanel", {
                id: "BGLight",
                particleName: "particles/ui/lottery/ui_lottery_eye_back_fx.vpcf",
                cameraOrigin: "0 0 700",
                fov: 90,
                lookAt: "0 0 0",
                hittest: false,
                squarePixels: true
              }, null);
            }
          })];
        }
      }), (() => {
        const _el$16 = libs.createElement("Panel", {
          id: "CenterModels",
          hittest: false
        }, null);
        libs.insert(_el$16, libs.createComponent(libs.Show, {
          get when() {
            return poolLocalConfig()?.hero_model;
          },
          get children() {
            return libs.createComponent(libs.For, {
              get each() {
                return heroModelList();
              },
              children: (hero, idx) => {
                const duration = 0.25;
                const fxTime = 0.25;
                const interval = 0;
                return (() => {
                  const _el$52 = libs.createElement("Panel", {
                      get id() {
                        return `${selectedPool()}_${idx()}`;
                      },
                      get ["class"]() {
                        return libs.classNames("HeroWithShowFx", `ModelIndex_${idx()}`);
                      }
                    }, null),
                    _el$53 = libs.createElement("DOTAParticleScenePanel", {
                      id: "ShowFx",
                      particleName: "particles/ui/lottery/ui_lottery_back_appear_fx.vpcf",
                      cameraOrigin: "0 0 380",
                      lookAt: "0 0 0",
                      fov: 90,
                      hittest: false
                    }, _el$52);
                  libs.use(p => {
                    p.SetControlPoint(1, -200, 0, 0);
                    $.Schedule((duration + interval) * idx(), () => {
                      if (p.IsValid()) {
                        p.ReloadScene();
                        p.AddClass("Show");
                        Game.EmitSound("UI.Draw.Fall");
                      }
                    });
                  }, _el$53);
                  libs.insert(_el$52, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
                    id: "HeroModelScene",
                    unit: hero,
                    get style() {
                      return {
                        animationDuration: duration + "s",
                        animationDelay: fxTime + (duration + interval) * idx() + "s",
                        animationFillMode: "both"
                      };
                    }
                  }), null);
                  libs.effect(_p$ => {
                    const _v$12 = `${selectedPool()}_${idx()}`,
                      _v$13 = libs.classNames("HeroWithShowFx", `ModelIndex_${idx()}`);
                    _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$52, "id", _v$12, _p$._v$12));
                    _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$52, "class", _v$13, _p$._v$13));
                    return _p$;
                  }, {
                    _v$12: undefined,
                    _v$13: undefined
                  });
                  return _el$52;
                })();
              }
            });
          }
        }), null);
        libs.insert(_el$16, libs.createComponent(libs.For, {
          get each() {
            return (() => {
              const courierList = poolLocalConfig()?.courier_model;
              if (!courierList?.length) return [];
              if (courierList.length <= 2) return courierList;
              const shuffled = [...courierList];
              for (let i = shuffled.length - 1; i > 0; i--) {
                const j = $.RandomInt(0, i);
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
              }
              return shuffled.slice(0, 2);
            })();
          },
          children: ({
            id: courierID,
            scale
          }, idx) => {
            const duration = 0.25;
            const fxTime = 0.25;
            const interval = 0;
            const courierKV = KeyValues.courier[courierID];
            if (courierKV == undefined) return;
            return (() => {
              const _el$54 = libs.createElement("Panel", {
                  get id() {
                    return `${selectedPool()}_${idx()}`;
                  },
                  get ["class"]() {
                    return libs.classNames("CourierWithShowFx", `ModelIndex_${idx()}`);
                  }
                }, null),
                _el$55 = libs.createElement("DOTAParticleScenePanel", {
                  id: "ShowFx",
                  particleName: "particles/ui/lottery/ui_lottery_back_appear_fx.vpcf",
                  cameraOrigin: "0 0 500",
                  lookAt: "0 0 0",
                  fov: 90,
                  hittest: false
                }, _el$54);
              libs.use(p => {
                p.SetControlPoint(1, -200, 0, 0);
                $.Schedule((duration + interval) * idx(), () => {
                  if (p.IsValid()) {
                    p.ReloadScene();
                    p.AddClass("Show");
                    Game.EmitSound("UI.Draw.Fall");
                  }
                });
              }, _el$55);
              libs.insert(_el$54, libs.createComponent(portraitsCourier.PortraitsCourier, {
                id: "CourierPreview",
                courier_id: courierID,
                scale: scale ?? 1,
                get style() {
                  return {
                    animationDuration: duration + "s",
                    animationDelay: fxTime + (duration + interval) * idx() + "s",
                    animationFillMode: "both"
                  };
                }
              }), null);
              libs.effect(_p$ => {
                const _v$14 = `${selectedPool()}_${idx()}`,
                  _v$15 = libs.classNames("CourierWithShowFx", `ModelIndex_${idx()}`);
                _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$54, "id", _v$14, _p$._v$14));
                _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$54, "class", _v$15, _p$._v$15));
                return _p$;
              }, {
                _v$14: undefined,
                _v$15: undefined
              });
              return _el$54;
            })();
          }
        }), null);
        libs.insert(_el$16, libs.createComponent(libs.For, {
          get each() {
            return (() => {
              const weaponList = poolLocalConfig()?.weapon_model;
              if (!weaponList?.length) return [];
              if (weaponList.length <= 2) return weaponList;
              const shuffled = [...weaponList];
              for (let i = shuffled.length - 1; i > 0; i--) {
                const j = $.RandomInt(0, i);
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
              }
              return shuffled.slice(0, 2);
            })();
          },
          children: ({
            id: weaponID,
            scale
          }, idx) => {
            const duration = 0.25;
            const fxTime = 0.25;
            const interval = 0;
            const weaponKV = KeyValues.weapon[weaponID];
            if (weaponKV == undefined) return;
            return (() => {
              const _el$56 = libs.createElement("Panel", {
                get id() {
                  return `${selectedPool()}_${idx()}`;
                },
                get ["class"]() {
                  return libs.classNames("WeaponWithShowFx", `ModelIndex_${idx()}`);
                }
              }, null);
              libs.insert(_el$56, libs.createComponent(weapon3DPreview.Weapon3DPreview, {
                id: "WeaponPreview",
                get model() {
                  return weaponKV.model;
                },
                get defaultConfig() {
                  return weaponKV.hero;
                },
                get style() {
                  return {
                    animationDuration: duration + "s",
                    animationDelay: fxTime + (duration + interval) * idx() + "s"
                  };
                }
              }));
              libs.effect(_p$ => {
                const _v$16 = `${selectedPool()}_${idx()}`,
                  _v$17 = libs.classNames("WeaponWithShowFx", `ModelIndex_${idx()}`);
                _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$56, "id", _v$16, _p$._v$16));
                _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$56, "class", _v$17, _p$._v$17));
                return _p$;
              }, {
                _v$16: undefined,
                _v$17: undefined
              });
              return _el$56;
            })();
          }
        }), null);
        return _el$16;
      })(), libs.createElement("DOTAScenePanel", {
        id: "EyeScene",
        map: "scene/drawcard_eye",
        camera: "camera_1",
        light: "light_1",
        renderdeferred: true,
        rendershadows: true,
        renderwaterreflections: true,
        deferredalpha: true,
        particleonly: false,
        hittest: false
      }, null), (() => {
        const _el$18 = libs.createElement("Panel", {
            id: "AspectAdpater",
            hittest: false
          }, null),
          _el$19 = libs.createElement("Panel", {
            id: "PoolNameContainer"
          }, _el$18);
          libs.createElement("DOTAParticleScenePanel", {
            id: "PoolNameParticle",
            particleName: "particles/ui/game/ui_game_fx_chouka_huoyan_03k.vpcf",
            cameraOrigin: "0 0 75",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$19);
          const _el$21 = libs.createElement("Image", {
            id: "PoolName",
            get src() {
              return `file://{images}/custom_game/draw/${selectedPool()}/title_${Language()}.png`;
            }
          }, _el$19),
          _el$22 = libs.createElement("Panel", {
            id: "DescAndInfo",
            hittest: false
          }, _el$18);
          libs.createElement("Panel", {
            id: "InfoBG"
          }, _el$22);
          const _el$24 = libs.createElement("Image", {
            id: "Info"
          }, _el$22),
          _el$25 = libs.createElement("Label", {
            id: "PoolDesc",
            get text() {
              return `#Draw_PoolRibbon_${selectedPool()}`;
            }
          }, _el$22),
          _el$26 = libs.createElement("Panel", {
            id: "LeftPanel",
            get ["class"]() {
              return libs.classNames({
                Show: show()
              });
            },
            hittest: false
          }, _el$18),
          _el$27 = libs.createElement("Panel", {
            id: "PoolMenu",
            hittest: false
          }, _el$26),
          _el$28 = libs.createElement("Panel", {
            id: "BottomPanel",
            get ["class"]() {
              return libs.classNames({
                Show: show()
              });
            },
            hittest: false
          }, _el$18),
          _el$42 = libs.createElement("Panel", {
            id: "DrawResultWindow",
            get ["class"]() {
              return libs.classNames({
                Show: drawState() >= EDrawState.waiting
              });
            },
            get hittest() {
              return drawState() >= EDrawState.result_flip;
            }
          }, _el$28),
          _el$47 = libs.createElement("Panel", {
            "class": "DrawButtonList"
          }, _el$28);
        const _ref$ = PoolMenu;
        typeof _ref$ === "function" ? libs.use(_ref$, _el$27) : PoolMenu = _el$27;
        libs.insert(_el$27, libs.createComponent(libs.For, {
          each: PoolIDList,
          children: poolID => {
            const inToolMode = Game.IsInToolsMode();
            const info_card = info_cards()[poolID];
            const config = KeyValues.drawcards[poolID];
            const validTime = info_card != undefined && info_card.start_time < timestamp && (info_card.end_time > timestamp || info_card.end_time == 0);
            const toolOnly = (config.show == 0 || !validTime) && inToolMode;
            const show = config.show == 1 && validTime || inToolMode;
            if (show) {
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                get ["class"]() {
                  return libs.classNames("PoolMenuTab", "Pool_" + poolID, {
                    Limit: config.end_time > 0
                  });
                },
                onactivate: () => {
                  SetSelectedPool(poolID);
                  markPoolViewed(poolID);
                  GameUI.CustomUIConfig().ReportClick("draw", poolID.toString());
                },
                get children() {
                  return [(() => {
                    const _el$57 = libs.createElement("Panel", {
                        id: "PoolMenuCard"
                      }, null),
                      _el$58 = libs.createElement("Image", {
                        id: "BG",
                        get src() {
                          return getSrcPath(`draw/${poolID}/tab_button.png`);
                        }
                      }, _el$57),
                      _el$59 = libs.createElement("Image", {
                        id: "SelectedMark"
                      }, _el$57),
                      _el$60 = libs.createElement("Label", {
                        id: "Title",
                        text: "#Draw_PoolName_" + poolID
                      }, _el$57);
                    libs.setProp(_el$60, "text", "#Draw_PoolName_" + poolID);
                    libs.insert(_el$57, libs.createComponent(libs.Show, {
                      get when() {
                        return config.end_time;
                      },
                      get children() {
                        return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                          get endTime() {
                            return info_card.end_time;
                          },
                          icon: true
                        });
                      }
                    }), null);
                    libs.effect(_p$ => {
                      const _v$18 = getSrcPath(`draw/${poolID}/tab_button.png`),
                        _v$19 = {
                          Show: selectedPool() == poolID
                        };
                      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$58, "src", _v$18, _p$._v$18));
                      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$59, "classList", _v$19, _p$._v$19));
                      return _p$;
                    }, {
                      _v$18: undefined,
                      _v$19: undefined
                    });
                    return _el$57;
                  })(), libs.createComponent(libs.Show, {
                    get when() {
                      return isPoolNew(poolID);
                    },
                    get children() {
                      return libs.createElement("Panel", {
                        id: "NewTag",
                        hittest: false
                      }, null);
                    }
                  }), (() => {
                    const _el$62 = libs.createElement("Panel", {
                      id: "AbyssTag"
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$62, "visible", config.end_time != 0, _$p));
                    return _el$62;
                  })(), (() => {
                    const _el$63 = libs.createElement("Label", {
                      id: "ToolOnly",
                      text: "ToolOnly"
                    }, null);
                    libs.setProp(_el$63, "visible", toolOnly);
                    return _el$63;
                  })()];
                }
              });
            }
          }
        }));
        libs.insert(_el$28, libs.createComponent(libs.Show, {
          get when() {
            return poolConfig().choose == 1;
          },
          get children() {
            return libs.createComponent(EOM_Button.EOM_BaseButton, {
              id: "WishButton",
              classList: {
                LuckyChoice: true
              },
              get tooltip_text() {
                return "#Draw_Wish_Button_Tip_" + poolLocalConfig()?.type;
              },
              onactivate: () => {
                let localConfig = poolLocalConfig();
                if (localConfig == undefined) return;
                ShowPopup("ChooseDrawLucky", {
                  pool_id: selectedPool(),
                  pool_type: localConfig.type
                });
              },
              get children() {
                return [(() => {
                  const _el$29 = libs.createElement("Panel", {
                      id: "WishContainer"
                    }, null),
                    _el$30 = libs.createElement("Panel", {
                      id: "ClipContainer"
                    }, _el$29);
                  libs.insert(_el$30, () => libs.createMemo(() => {
                    let localConfig = poolLocalConfig();
                    const lucky_choice = curPoolSelectLucky();
                    if (localConfig == undefined) return;
                    if (!lucky_choice) return;
                    let src = "";
                    let classNames = ["WishItemImage"];
                    if (localConfig.type == "courier") {
                      src = `file://{images}/custom_game/store_items/${lucky_choice}.png`;
                      classNames.push("CourierImage");
                    } else if (localConfig.type == "weapon") {
                      src = `file://{images}/custom_game/store_items/${lucky_choice}.png`;
                      classNames.push("WeaponImage");
                    } else if (localConfig.type == "treasure") {
                      src = `file://{images}/custom_game/store_items/${lucky_choice}.png`;
                      classNames.push("TreasureImage");
                    } else if (localConfig.type == "hero") {
                      let heroName = GetHeroNameByGoodID(lucky_choice);
                      if (heroName) {
                        src = `file://{images}/heroes/selection/${heroName}.png`;
                        classNames.push("HeroImage");
                      }
                    }
                    if (src != "") {
                      return (() => {
                        const _el$64 = libs.createElement("Image", {
                          get ["class"]() {
                            return classNames.join(" ");
                          },
                          src: src
                        }, null);
                        libs.setProp(_el$64, "src", src);
                        libs.effect(_$p => libs.setProp(_el$64, "class", classNames.join(" "), _$p));
                        return _el$64;
                      })();
                    }
                  }));
                  libs.insert(_el$29, libs.createComponent(libs.Show, {
                    get when() {
                      return !curPoolSelectLucky();
                    },
                    get children() {
                      return libs.createElement("Image", {
                        id: "EmptyIcon"
                      }, null);
                    }
                  }), null);
                  return _el$29;
                })(), (() => {
                  const _el$32 = libs.createElement("Panel", {
                      "class": "BottomArea"
                    }, null);
                    libs.createElement("Label", {
                      id: "WishLabel",
                      text: "#Draw_Wish_Button"
                    }, _el$32);
                    libs.createElement("Image", {
                      id: "RefreshIcon"
                    }, _el$32);
                  return _el$32;
                })()];
              }
            });
          }
        }), _el$42);
        libs.insert(_el$28, libs.createComponent(libs.Show, {
          get when() {
            return poolConfig().q5_must;
          },
          get children() {
            const _el$35 = libs.createElement("Panel", {
                id: "LuckyContainer",
                get ["class"]() {
                  return libs.classNames({
                    HighLuckyValue: luckyPercent() >= 0.5
                  });
                }
              }, null);
              libs.createElement("DOTAParticleScenePanel", {
                id: "LuckyParticle",
                particleName: "particles/ui/game/ui_game_fx_chouka_huoyan_zong1.vpcf",
                cameraOrigin: "0 0 50",
                fov: 90,
                lookAt: "0 0 0",
                hittest: false,
                squarePixels: true
              }, _el$35);
              const _el$37 = libs.createElement("Panel", {
                id: "ProgressMask",
                get style() {
                  return {
                    height: `${RemapValClamped(luckyPercent(), 0, 1, 25, 70)}%`
                  };
                }
              }, _el$35);
              libs.createElement("Image", {
                scaling: "none",
                id: "LuckyProgressImg"
              }, _el$37);
              const _el$39 = libs.createElement("Label", {
                id: "LuckyValue",
                get text() {
                  return `${Round(luckyPercent() * 100, 1)}%`;
                }
              }, _el$35);
              libs.createElement("Label", {
                id: "LuckyTitle",
                text: "#Draw_Pool_LuckyValue"
              }, _el$35);
            libs.setProp(_el$35, "tooltip_text", "#Draw_Lucky_Tips");
            libs.effect(_p$ => {
              const _v$3 = libs.classNames({
                  HighLuckyValue: luckyPercent() >= 0.5
                }),
                _v$4 = {
                  height: `${RemapValClamped(luckyPercent(), 0, 1, 25, 70)}%`
                },
                _v$5 = `${Round(luckyPercent() * 100, 1)}%`;
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$35, "class", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$37, "style", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$39, "text", _v$5, _p$._v$5));
              return _p$;
            }, {
              _v$3: undefined,
              _v$4: undefined,
              _v$5: undefined
            });
            return _el$35;
          }
        }), _el$42);
        libs.insert(_el$28, libs.createComponent(EOM_Button.EOM_BaseButton, {
          id: "ExchangeBtn",
          get visible() {
            return poolConfig().store_tag != "";
          },
          onactivate: () => setShowExchangeStore(true),
          get children() {
            return libs.createElement("Label", {
              text: "#Draw_Exchange"
            }, null);
          }
        }), _el$42);
        libs.setProp(_el$42, "onactivate", () => {
          if (drawState() != EDrawState.result_flip) return;
          CancelFlip();
          SetDrawState(EDrawState.result);
        });
        libs.insert(_el$42, libs.createComponent(libs.Show, {
          get when() {
            return drawState() == EDrawState.waiting_circle;
          },
          get children() {
            return libs.createComponent(EOM_Loading.EOM_Loading, {
              align: "center center"
            });
          }
        }), null);
        libs.insert(_el$42, libs.createComponent(libs.Show, {
          get when() {
            return drawState() >= EDrawState.result_flip;
          },
          get children() {
            return [(() => {
              const _el$43 = libs.createElement("DOTAParticleScenePanel", {
                id: "BottomParticle",
                particleName: "particles/ui/game/ui_game_general_special_effects_05_1_fx.vpcf",
                cameraOrigin: "0 0 800",
                fov: 90,
                lookAt: "0 0 0",
                hittest: false,
                squarePixels: true
              }, null);
              libs.effect(_$p => libs.setProp(_el$43, "classList", {
                show: (state => state == EDrawState.result)(drawState())
              }, _$p));
              return _el$43;
            })(), (() => {
              const _el$44 = libs.createElement("Panel", {
                id: "ResultList",
                get ["class"]() {
                  return libs.classNames({
                    TenItems: resultList().length == 10
                  });
                }
              }, null);
              libs.insert(_el$44, libs.createComponent(libs.Show, {
                get when() {
                  return resultList().length == 10;
                },
                get fallback() {
                  return libs.createComponent(libs.For, {
                    get each() {
                      return resultList();
                    },
                    children: (data, i) => {
                      return libs.createComponent(DrawItem, {
                        data: data,
                        get i() {
                          return i();
                        },
                        rowClass: "Common",
                        get animTime() {
                          return Math.max(0, i() * (bSkipAnimation() ? animationDelay2 : animationDelay));
                        }
                      });
                    }
                  });
                },
                get children() {
                  return [(() => {
                    const _el$45 = libs.createElement("Panel", {
                      id: "FirstRowContainer",
                      "class": "RowContainer"
                    }, null);
                    libs.insert(_el$45, libs.createComponent(libs.For, {
                      get each() {
                        return resultList().slice(0, 5);
                      },
                      children: (data, i) => {
                        return libs.createComponent(DrawItem, {
                          data: data,
                          get i() {
                            return i();
                          },
                          rowClass: "FirstRow",
                          get animTime() {
                            return Math.max(0, i() * (bSkipAnimation() ? animationDelay2 : animationDelay));
                          }
                        });
                      }
                    }));
                    return _el$45;
                  })(), (() => {
                    const _el$46 = libs.createElement("Panel", {
                      id: "SecondRowContainer",
                      "class": "RowContainer"
                    }, null);
                    libs.insert(_el$46, libs.createComponent(libs.For, {
                      get each() {
                        return resultList().slice(5);
                      },
                      children: (data, i) => {
                        let animIdx = 4 - i();
                        return libs.createComponent(DrawItem, {
                          data: data,
                          get i() {
                            return i();
                          },
                          rowClass: "SecondRow",
                          get animTime() {
                            return Math.max(0, animIdx * (bSkipAnimation() ? animationDelay2 : animationDelay));
                          }
                        });
                      }
                    }));
                    return _el$46;
                  })()];
                }
              }));
              libs.effect(_$p => libs.setProp(_el$44, "class", libs.classNames({
                TenItems: resultList().length == 10
              }), _$p));
              return _el$44;
            })()];
          }
        }), null);
        libs.insert(_el$47, libs.createComponent(libs.For, {
          each: ["one_num", "ten_num"],
          children: key => {
            const count = () => poolConfig()[key];
            const drawCount = key == "one_num" ? 1 : 10;
            return (() => {
              const _el$65 = libs.createElement("Panel", {
                  id: "Button_" + key,
                  "class": "DrawButtonContainer",
                  hittest: false
                }, null),
                _el$66 = libs.createElement("Panel", {
                  id: "TopContainer",
                  hittest: false
                }, _el$65);
                libs.createElement("Panel", {
                  id: "TopContainerBG"
                }, _el$66);
                const _el$68 = libs.createElement("Panel", {
                  id: "TopCenter"
                }, _el$66),
                _el$69 = libs.createElement("Label", {
                  id: "TicketLabel",
                  get text() {
                    return "X " + count();
                  }
                }, _el$68);
              libs.setProp(_el$65, "id", "Button_" + key);
              libs.insert(_el$68, libs.createComponent(Player.CurrencyIcon, {
                get tokenID() {
                  return poolConfig().item;
                }
              }), _el$69);
              libs.insert(_el$65, libs.createComponent(EOM_Button.EOM_Button, {
                id: "DrawButton",
                text: "#Draw_Count_" + key,
                color: key == "one_num" ? "Confirm" : "Gold",
                onactivate: async () => {
                  let itemId = poolConfig().item;
                  let pCount = GetServiceItemCount(itemId);
                  let debug = Game.IsInToolsMode() && GameUI.IsAltDown();
                  if (pCount >= count() || debug) {
                    await Draw(drawCount, debug);
                  } else {
                    const itemid = KeyValues.drawcards[poolConfig().id]?.store_id;
                    if (itemid) {
                      ClientSideEvent("directly_purchase", {
                        itemid: itemid,
                        buy_count: count() - pCount,
                        source: "draw"
                      });
                    }
                  }
                }
              }), null);
              libs.effect(_$p => libs.setProp(_el$69, "text", "X " + count(), _$p));
              return _el$65;
            })();
          }
        }));
        libs.insert(_el$28, libs.createComponent(EOM_ToggleButton.EOM_ToggleButton, {
          id: "SKipAnimBtn",
          text: "#Draw_Skip_Animation",
          get selected() {
            return bSkipAnimation();
          },
          get classList() {
            return {
              show: (state => state == EDrawState.common || state == EDrawState.result)(drawState())
            };
          },
          onchange: (p, b) => SetSkipAnimation(b)
        }), null);
        libs.effect(_p$ => {
          const _v$6 = `file://{images}/custom_game/draw/${selectedPool()}/title_${Language()}.png`,
            _v$7 = `#Draw_Pool_Detail_${selectedPool()}`,
            _v$8 = `#Draw_PoolRibbon_${selectedPool()}`,
            _v$9 = libs.classNames({
              Show: show()
            }),
            _v$0 = libs.classNames({
              Show: show()
            }),
            _v$1 = libs.classNames({
              Show: drawState() >= EDrawState.waiting
            }),
            _v$10 = drawState() >= EDrawState.result_flip,
            _v$11 = {
              show: (state => state == EDrawState.common || state == EDrawState.result)(drawState())
            };
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$21, "src", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$24, "tooltip_text", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$25, "text", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$26, "class", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$28, "class", _v$0, _p$._v$0));
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$42, "class", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$42, "hittest", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$47, "classList", _v$11, _p$._v$11));
          return _p$;
        }, {
          _v$6: undefined,
          _v$7: undefined,
          _v$8: undefined,
          _v$9: undefined,
          _v$0: undefined,
          _v$1: undefined,
          _v$10: undefined,
          _v$11: undefined
        });
        return _el$18;
      })(), (() => {
        const _el$48 = libs.createElement("Panel", {
          id: "MovieContainer",
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$48, "visible", drawState() == EDrawState.waiting, _$p));
        return _el$48;
      })(), libs.createComponent(ExchangeStore.ExchangeStore, {
        tag: "StarStone",
        get show() {
          return showExchangeStore();
        },
        onclose: () => setShowExchangeStore(false)
      })];
    }
  });
}
function HudDraw() {
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(DrawPage, {});
    }
  });
}
libs.render(HudDraw, $.GetContextPanel());