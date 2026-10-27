--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('GreevilIcon', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Button = require('./EOM_Button.js');

const GreevilIcon = props => {
  const [shopInfoShow, setShopInfoShow] = libs.createSignal(false);
  const [levelUpFlash, setLevelUpFlash] = libs.createSignal(false);
  let levelUpFlashTimer;
  let _shopInfoShowLast = shopInfoShow();
  if (props.refresh) {
    libs.createEffect(libs.on(props.refresh, () => {
      setShopInfoShow(false);
    }));
  }
  let ref;
  libs.createEffect(() => {
    const state = shopInfoShow();
    if (state != _shopInfoShowLast && state == false) {
      ref?.TriggerClass("ShopInfoHide");
    }
    _shopInfoShowLast = state;
  });
  const _DEFAULT_GREEVIL_SHOP_RECORD = {
    trait: false,
    card_effect: false,
    greevil_effect: false,
    attribute: false
  };
  const _DEFAULT_GREEVIL_DATA = {
    egg_type: "",
    greevil_name: "",
    stage: GreevilStage.EGG,
    exp: 0,
    level: 0,
    total_exp: 0,
    next_level_exp: 1
  };
  const [greevilData, setGreevilData] = libs.createStore(_DEFAULT_GREEVIL_DATA);
  const [greevilShopRecord, setGreevilShopRecord] = libs.createStore(_DEFAULT_GREEVIL_SHOP_RECORD);
  libs.createEffect(libs.on(() => props.playerID, () => {
    UpdateGreevilData();
    UpdateGreevilShopRecord();
  }));
  libs.createEffect(libs.on(() => greevilData, _data => {
    if (_data.stage != GreevilStage.GREEVIL) {
      setShopInfoShow(false);
    }
  }));
  const UpdateGreevilData = (data = getSyncDataKey("common", "greevil_data", props.playerID)) => {
    if (props.playerID != -1 && data) {
      Object.entries(data).forEach(([key, value]) => {
        setGreevilData(key, value);
      });
    } else {
      setGreevilData(_DEFAULT_GREEVIL_DATA);
    }
  };
  const UpdateGreevilShopRecord = (data = getSyncDataKey("common", "greevil_shop_record", props.playerID)) => {
    if (props.playerID != -1 && data) {
      setGreevilShopRecord("trait", (data.trait ?? []).length > 0);
      setGreevilShopRecord("card_effect", (data.card_effect ?? []).length > 0);
      setGreevilShopRecord("greevil_effect", (data.greevil_effect ?? []).length > 0);
      setGreevilShopRecord("attribute", Object.keys(data.attribute ?? {}).length > 0);
    } else {
      setGreevilShopRecord(_DEFAULT_GREEVIL_SHOP_RECORD);
    }
  };
  const greevilLevelProgress = () => {
    if (greevilData.next_level_exp == 0) {
      return 100;
    }
    return Clamp(greevilData.exp / greevilData.next_level_exp * 100, 0, 100);
  };
  const canHatch = () => props.playerID == Players.GetLocalPlayer() && greevilData.stage == GreevilStage.EGG && greevilData.exp >= greevilData.next_level_exp;
  const greevilExpTooltip = () => {
    let tooltip = "";
    tooltip += `${$.Localize("#Greevil_Level")}：${greevilData.level}<br>`;
    tooltip += `${$.Localize("#Greevil_Exp")}：${greevilData.exp}/${greevilData.next_level_exp}`;
    return tooltip;
  };
  libs.createEffect(libs.on(() => greevilData.level, (newLevel, oldLevel) => {
    if (oldLevel == undefined || props.playerID == -1 || newLevel <= oldLevel) {
      return;
    }
    setLevelUpFlash(true);
    if (levelUpFlashTimer != undefined) {
      $.CancelScheduled(levelUpFlashTimer);
    }
    levelUpFlashTimer = $.Schedule(0.45, () => {
      setLevelUpFlash(false);
      levelUpFlashTimer = undefined;
    });
  }));
  libs.onCleanup(() => {
    if (levelUpFlashTimer != undefined) {
      $.CancelScheduled(levelUpFlashTimer);
    }
  });
  libs.onMount(() => {
    const nettableListenerIDs = [];
    nettableListenerIDs.push(useSyncDataKey("common", "greevil_data", (data, id) => {
      if (id == props.playerID) {
        UpdateGreevilData(data);
      }
    }, -1));
    nettableListenerIDs.push(useSyncDataKey("common", "greevil_shop_record", (data, id) => {
      if (id == props.playerID) {
        UpdateGreevilShopRecord(data);
      }
    }, -1));
    libs.onCleanup(() => {
      nettableListenerIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("GreevilIcon", {
            Reverse: props.reverse
          });
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("GreevilShopInfoBlock", {
            Show: shopInfoShow()
          });
        }
      }, _el$),
      _el$3 = libs.createElement("Panel", {}, _el$),
      _el$4 = libs.createElement("Panel", {
        "class": "GreevilPregress"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        "class": "GreevilPregress_Full",
        get style() {
          return {
            clip: `radial( 50% 50%, 225deg, ${greevilLevelProgress() * 2.7}deg )`
          };
        }
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "GreevilAbilityIconBox"
      }, _el$3),
      _el$9 = libs.createElement("Panel", {
        "class": "GreevilAbilityMask",
        hittest: false
      }, _el$6),
      _el$10 = libs.createElement("Panel", {}, _el$),
      _el$11 = libs.createElement("Label", {
        get text() {
          return String(greevilData.level);
        }
      }, _el$10);
    const _ref$ = ref;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$2) : ref = _el$2;
    libs.insert(_el$2, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(greevilShopRecord);
      },
      children: (recordType, index) => {
        const state = () => greevilShopRecord[recordType];
        return (() => {
          const _el$13 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("GreevilShopCategoryAnimation", "Anim_Pos" + index());
            },
            hittest: false
          }, null);
          libs.insert(_el$13, libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("GreevilShopCategory", "Pos" + index(), {
                Empty: !state()
              });
            },
            get customTooltip() {
              return {
                name: "greevil_record",
                record_type: recordType,
                player_id: props.playerID
              };
            },
            get children() {
              const _el$14 = libs.createElement("Panel", {}, null);
                libs.createElement("Image", {}, _el$14);
              libs.effect(_$p => libs.setProp(_el$14, "className", libs.classNames("GreevilShopCategoryIcon", recordType), _$p));
              return _el$14;
            }
          }));
          libs.effect(_$p => libs.setProp(_el$13, "class", libs.classNames("GreevilShopCategoryAnimation", "Anim_Pos" + index()), _$p));
          return _el$13;
        })();
      }
    }));
    libs.setProp(_el$3, "onactivate", () => {
      props.onHatchClick?.(canHatch());
    });
    libs.insert(_el$6, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return greevilData.stage == GreevilStage.EGG && greevilData.egg_type != "";
          },
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              "class": "GreevilAbility",
              get customTooltip() {
                return {
                  name: "greevil_ability",
                  player_id: props.playerID
                };
              },
              get children() {
                const _el$7 = libs.createElement("DOTAAbilityImage", {
                  get abilityname() {
                    return greevilData.egg_type;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$7, "abilityname", greevilData.egg_type, _$p));
                return _el$7;
              }
            });
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return greevilData.stage == GreevilStage.GREEVIL && greevilData.greevil_name != "";
          },
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              "class": "GreevilAbility",
              get customTooltip() {
                return {
                  name: "greevil_ability",
                  player_id: props.playerID
                };
              },
              get children() {
                const _el$8 = libs.createElement("DOTAAbilityImage", {
                  get abilityname() {
                    return greevilData.greevil_name;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$8, "abilityname", greevilData.greevil_name, _$p));
                return _el$8;
              }
            });
          }
        })];
      }
    }), _el$9);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return canHatch();
      },
      get children() {
        const _el$0 = libs.createElement("Panel", {
            hittest: false
          }, null);
          libs.createElement("Label", {
            text: "#Greevil_Hatch"
          }, _el$0);
        libs.setProp(_el$0, "className", "GreevilHatchHint");
        return _el$0;
      }
    }), _el$10);
    libs.setProp(_el$10, "onmouseover", self => {
      $.DispatchEvent("DOTAShowTextTooltip", self, greevilExpTooltip());
    });
    libs.setProp(_el$10, "onmouseout", self => {
      $.DispatchEvent("DOTAHideTextTooltip", self);
    });
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return greevilData.stage == GreevilStage.GREEVIL;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_BaseButton, {
          get className() {
            return libs.classNames("GreevilShopOpenButton", {
              Active: shopInfoShow()
            });
          },
          tooltip_text: "#Greevil_Shop_Record",
          onactivate: () => setShopInfoShow(v => !v),
          get children() {
            return libs.createElement("Image", {
              "class": "GreevilShopOpenButtonIcon"
            }, null);
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames("GreevilIcon", {
          Reverse: props.reverse
        }),
        _v$2 = libs.classNames("GreevilShopInfoBlock", {
          Show: shopInfoShow()
        }),
        _v$3 = libs.classNames("GreevilAbilityIcon", {
          CanHatch: canHatch(),
          EggStage: greevilData.stage == GreevilStage.EGG,
          LevelUpFlash: levelUpFlash()
        }),
        _v$4 = {
          clip: `radial( 50% 50%, 225deg, ${greevilLevelProgress() * 2.7}deg )`
        },
        _v$5 = libs.classNames("GreevilLevelBadge", {
          CanHatch: canHatch(),
          LevelUpFlash: levelUpFlash()
        }),
        _v$6 = String(greevilData.level);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "className", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$5, "style", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$10, "className", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$11, "text", _v$6, _p$._v$6));
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

exports.GreevilIcon = GreevilIcon;