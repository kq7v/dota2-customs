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
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var Player = require('./Player.js');
var RecycleView = require('./RecycleView.js');
var StoreItem = require('./StoreItem.js');
var courier_card = require('./courier_card.js');
var portraitsCourier = require('./portraitsCourier.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var global_selection = require('./global_selection.js');
var hotkey_label = require('./hotkey_label.js');
var EOM_CostLabel = require('./EOM_CostLabel.js');
var EOM_SectionDivider = require('./EOM_SectionDivider.js');
var hero_card = require('./hero_card.js');
var hero_level_main = require('./hero_level_main.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var weapon3DPreview = require('./weapon3DPreview.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_TextEntry.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');
require('./EOM_GamePad.js');
require('./EOM_HotKeyDisplay.js');
require('./EOM_HeroImage.js');

const STAR_LEVELS = [1, 2, 3, 4, 5, 6];
const UPGRADE_COST = 1;
const StarEffectItem = props => {
  const effectContent = libs.createMemo(() => {
    const descriptions = [];
    Object.entries(props.effects).forEach(([attributeName, value]) => {
      if (typeof value === "number") {
        descriptions.push(GetPropertyLocalization(attributeName, value));
      }
    });
    if (descriptions.length === 0) {
      return "#Courier_NoAttributeEffect";
    }
    return descriptions.join("<br>");
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "StarEffectItem"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "StarList"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("EffectRowList", {
            Unlock: props.currentStar > props.level - 1
          });
        }
      }, _el$),
      _el$4 = libs.createElement("Label", {
        "class": "StarEffectLabel",
        html: true,
        get text() {
          return effectContent();
        }
      }, _el$3);
    libs.insert(_el$2, libs.createComponent(libs.Index, {
      each: STAR_LEVELS,
      children: (_item, starIndex) => libs.createComponent(libs.Show, {
        get when() {
          return starIndex <= props.level - 1;
        },
        get children() {
          const _el$5 = libs.createElement("Image", {
            get ["class"]() {
              return libs.classNames("CourierStar2", {
                Unlock: props.currentStar > starIndex
              });
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$5, "class", libs.classNames("CourierStar2", {
            Unlock: props.currentStar > starIndex
          }), _$p));
          return _el$5;
        }
      })
    }));
    libs.effect(_p$ => {
      const _v$ = libs.classNames("EffectRowList", {
          Unlock: props.currentStar > props.level - 1
        }),
        _v$2 = effectContent();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const CourierAbility = props => {
  const abilityValues = libs.createMemo(() => {
    const kv = KeyValues.courier_abilities[props.abilityName];
    return kv?.AbilityValues ?? {};
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        "class": "CourierAbility"
      }, null),
      _el$7 = libs.createElement("Panel", {
        "class": "CourierAbilityName"
      }, _el$6);
      libs.createElement("Image", {
        "class": "AbilityNameleft"
      }, _el$7);
      const _el$9 = libs.createElement("Label", {
        width: "160px",
        verticalAlign: "center",
        get text() {
          return "#courier_ability_" + props.type;
        }
      }, _el$7);
      libs.createElement("Image", {
        "class": "AbilityNameRight"
      }, _el$7);
      const _el$1 = libs.createElement("Panel", {
        "class": "CourierAbilityDescription",
        flowChildren: "right"
      }, _el$6),
      _el$10 = libs.createElement("DOTAAbilityImage", {
        width: "76.8px",
        height: "76.8px",
        get abilityname() {
          return props.abilityName;
        },
        showtooltip: false
      }, _el$1);
    libs.setProp(_el$9, "width", "160px");
    libs.setProp(_el$9, "verticalAlign", "center");
    libs.setProp(_el$1, "flowChildren", "right");
    libs.setProp(_el$10, "width", "76.8px");
    libs.setProp(_el$10, "height", "76.8px");
    libs.insert(_el$1, libs.createComponent(hotkey_label.HotkeyLabel, {
      "class": "CourierAbilityText",
      html: true,
      get text() {
        return getKeyValueDescription(GetLocalization("#DOTA_Tooltip_ability_" + props.abilityName + "_Description", ""), abilityValues(), {
          level: props.abilityLevel
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$3 = "#courier_ability_" + props.type,
        _v$4 = props.abilityName;
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$10, "abilityname", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$6;
  })();
};
const CourierFishExplore = props => {
  const abilityInfo = libs.createMemo(() => {
    const type = props.fish_skill ? "fish" : "explore";
    const rawValue = props.fish_skill || props.explore_skill;
    if (rawValue == undefined) {
      return {
        txt: "",
        type
      };
    }
    const parts = rawValue.split(":");
    if (parts.length == 2) {
      return {
        type,
        txt: GetPropertyLocalization(parts[0], toFiniteNumber(parts[1], 0))
      };
    }
    const cfg = KeyValues.idle_game_drop_privilege[rawValue];
    if (cfg == undefined) {
      return {
        txt: "",
        type
      };
    }
    return {
      type,
      txt: getKeyValueDescription(GetLocalization(`#${rawValue}`, ""), {
        chance: cfg.chance
      }),
      item: {
        id: cfg.itemid.toString(),
        count: cfg.num
      }
    };
  });
  const titleKey = libs.createMemo(() => abilityInfo().type === "fish" ? "#courier_ability_fish_bonus" : "#courier_ability_explore_bonus");
  const itemTooltip = libs.createMemo(() => {
    const item = abilityInfo().item;
    if (item == undefined) return undefined;
    const holdNum = GetServiceItemCount(item.id);
    const holdNumLabel = GetLocalization("#Store_HoldNum") + holdNum;
    const description = GetLocalization(`${item.id}_description`, "");
    return {
      name: "title_image_text",
      title: GetLocalization(item.id),
      image: getSrcPath(`store_items/${item.id}.png`),
      text: `${holdNumLabel}<br>${description}`
    };
  });
  return (() => {
    const _el$11 = libs.createElement("Panel", {
        "class": "CourierAbility"
      }, null),
      _el$12 = libs.createElement("Panel", {
        "class": "CourierAbilityName"
      }, _el$11);
      libs.createElement("Image", {
        "class": "AbilityNameleft"
      }, _el$12);
      const _el$14 = libs.createElement("Label", {
        width: "160px",
        verticalAlign: "center",
        get text() {
          return titleKey();
        }
      }, _el$12);
      libs.createElement("Image", {
        "class": "AbilityNameRight"
      }, _el$12);
      const _el$16 = libs.createElement("Panel", {
        "class": "CourierAbilityDescription",
        flowChildren: "down"
      }, _el$11),
      _el$17 = libs.createElement("Label", {
        "class": "CourierAbilityText",
        html: true,
        get text() {
          return abilityInfo().txt;
        }
      }, _el$16);
    libs.setProp(_el$14, "width", "160px");
    libs.setProp(_el$14, "verticalAlign", "center");
    libs.setProp(_el$16, "flowChildren", "down");
    libs.insert(_el$16, libs.createComponent(libs.Show, {
      get when() {
        return abilityInfo().item != undefined;
      },
      get children() {
        return libs.createComponent(StoreItem.StoreItemBlock, {
          get item_id() {
            return abilityInfo().item.id;
          },
          get amounts() {
            return abilityInfo().item.count;
          },
          hideTips: true,
          get customTooltip() {
            return itemTooltip();
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = titleKey(),
        _v$6 = abilityInfo().txt;
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$14, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$17, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$11;
  })();
};
const courierIDList = Object.keys(KeyValues.courier);
const CourierDisplay = props => {
  const [courierID, setCourierID] = global_selection.createPreviewCourierIDSignal();
  const playerCouriers = service_netdata_helper.usePlayerCouriers();
  const serviceCourierCfg = libs.createMemo(() => KeyValues.service_courier[courierID()]);
  libs.createMemo(() => KeyValues.courier[courierID()] ?? {});
  const courierStar = libs.createMemo(() => {
    return playerCouriers()?.[courierID()]?.star ?? 0;
  });
  const courierEquipped = libs.createMemo(() => {
    return playerCouriers()?.[courierID()]?.equipped ?? false;
  });
  const courierExp = libs.createMemo(() => {
    return playerCouriers()?.[courierID()]?.extra_star_exp ?? 0;
  });
  const currentAbilityLevel = libs.createMemo(() => Math.max(1, courierStar()));
  const courierAbility = libs.createMemo(() => {
    return serviceCourierCfg()["active_skill"];
  });
  const courierFish = libs.createMemo(() => {
    return serviceCourierCfg()["fish_skill" + currentAbilityLevel()];
  });
  const courierExplore = libs.createMemo(() => {
    return serviceCourierCfg()["explore_skill" + currentAbilityLevel()];
  });
  const courierCategories = libs.createMemo(() => service_netdata_helper.getCourierCategories());
  const [selectCategoryID, setSelectCategoryID] = libs.createSignal(0);
  const sortCourierList = libs.createMemo(() => {
    return service_netdata_helper.getSortedCourierIDs(playerCouriers(), selectCategoryID()).filter(id => {
      return KeyValues.service_courier[id]?.in_tool != 1 || Game.IsInToolsMode();
    });
  });
  let listHandle;
  const [scrollPercent, setScrollPercent] = libs.createSignal(0);
  const [currentPage, setCurrentPage] = libs.createSignal(1);
  const [totalPage, setTotalPage] = libs.createSignal(1);
  const [starUpRequesting, setStarUpRequesting] = libs.createSignal(false);
  let initialized = false;
  let courierUpgradeParticle;
  let courierUpgradeParticleSchedule;
  const playCourierUpgradeParticle = () => {
    if (!courierUpgradeParticle) return;
    if (courierUpgradeParticleSchedule != undefined) {
      $.CancelScheduled(courierUpgradeParticleSchedule);
    }
    courierUpgradeParticle.AddClass("Show");
    courierUpgradeParticle.ReloadScene();
    courierUpgradeParticleSchedule = $.Schedule(1.2, () => {
      courierUpgradeParticleSchedule = undefined;
      courierUpgradeParticle?.RemoveClass("Show");
    });
  };
  libs.onCleanup(() => {
    if (courierUpgradeParticleSchedule != undefined) {
      $.CancelScheduled(courierUpgradeParticleSchedule);
    }
  });
  const [tokens, setTokens] = libs.createSignal([]);
  libs.createEffect(libs.on(courierID, () => {
    if (courierID() != undefined) {
      setTokens([toFiniteNumber(courierID())]);
    } else {
      setTokens([]);
    }
  }));
  libs.createEffect(libs.on(sortCourierList, list => {
    if (list.length === 0) return;
    if (!initialized) {
      setCourierID(list[0]);
      initialized = true;
    } else if (!list.includes(courierID())) {
      setCourierID(list[0]);
    }
    const currentIndex = list.indexOf(courierID());
    if (currentIndex !== -1) {
      $.Schedule(0.2, () => {
        listHandle?.scroll2Child(currentIndex, "center");
      });
    }
  }));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "CourierDisplay",
    get topbarChildren() {
      return (() => {
        const _el$40 = libs.createElement("Panel", {
            id: "BGRoot"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "BottomParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_05_1_fx.vpcf",
            cameraOrigin: "0 0 800",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$40);
          const _el$42 = libs.createElement("Panel", {
            id: "CustomTopBottomBG"
          }, _el$40);
        libs.insert(_el$42, libs.createComponent(Player.CurrencyGroup, {
          get tokens() {
            return tokens();
          }
        }));
        return _el$40;
      })();
    },
    get children() {
      const _el$18 = libs.createElement("Panel", {
          id: "CourierBlock",
          hittest: false
        }, null),
        _el$19 = libs.createElement("Panel", {
          id: "LeftContent"
        }, _el$18),
        _el$20 = libs.createElement("DOTAParticleScenePanel", {
          id: "CourierUpgradeParticle",
          particleName: "particles/ui/game/ui_game_equipment_interface_02_fx.vpcf",
          cameraOrigin: "0 0 250",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$19),
        _el$21 = libs.createElement("Panel", {
          id: "CourierListBlock",
          align: "center bottom",
          marginBottom: "105px",
          flowChildren: "down"
        }, _el$19),
        _el$22 = libs.createElement("Panel", {
          flowChildren: "right",
          horizontalAlign: "center"
        }, _el$21),
        _el$23 = libs.createElement("Label", {
          id: "CourierListPageLabel",
          get text() {
            return `${currentPage()}/${totalPage()}`;
          }
        }, _el$21),
        _el$24 = libs.createElement("Panel", {
          id: "RightContent"
        }, _el$18),
        _el$25 = libs.createElement("Panel", {
          id: "CourierName"
        }, _el$24),
        _el$26 = libs.createElement("Label", {
          marginLeft: "15px",
          width: "311px",
          get text() {
            return "#" + courierID();
          }
        }, _el$25),
        _el$27 = libs.createElement("Panel", {
          "class": "StarList"
        }, _el$25),
        _el$28 = libs.createElement("Panel", {
          id: "StarEffectList",
          "class": "VerticalScrollStyle"
        }, _el$24),
        _el$29 = libs.createElement("Panel", {
          id: "StarDescription"
        }, _el$24),
        _el$30 = libs.createElement("Panel", {
          "class": "CourierAbilityName"
        }, _el$29);
        libs.createElement("Image", {
          "class": "AbilityNameleft"
        }, _el$30);
        const _el$32 = libs.createElement("Label", {
          width: "160px",
          verticalAlign: "center",
          text: "#courier_access"
        }, _el$30);
        libs.createElement("Image", {
          "class": "AbilityNameRight"
        }, _el$30);
        const _el$34 = libs.createElement("Label", {
          "class": "AccessLabel",
          get text() {
            return "#" + courierID() + "_access";
          }
        }, _el$29),
        _el$35 = libs.createElement("Panel", {
          "class": "Footer"
        }, _el$24);
        libs.createElement("Label", {
          id: "WeaponStarInfo",
          text: "#WeaponStarInfo"
        }, _el$24);
      libs.insert(_el$19, libs.createComponent(libs.For, {
        each: courierIDList,
        children: (id, index) => libs.createComponent(libs.Show, {
          get when() {
            return courierID() == id;
          },
          get children() {
            return libs.createComponent(portraitsCourier.PortraitsCourier, {
              get courier_id() {
                return toFiniteNumber(id);
              },
              allowrotation: true,
              style: {
                width: "100%",
                height: "100%",
                horizontalAlign: "center",
                y: "-95px",
                x: "30px"
              }
            });
          }
        })
      }), _el$20);
      const _ref$ = courierUpgradeParticle;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$20) : courierUpgradeParticle = _el$20;
      libs.insert(_el$19, libs.createComponent(EOM_DropDown.EOM_DropDown, {
        id: "CategoryDropDown",
        type: "EquipmentDropDown",
        menuPosition: "top",
        get index() {
          return selectCategoryID();
        },
        onChange: (category, item) => {
          setSelectCategoryID(category);
        },
        get children() {
          return libs.createComponent(libs.For, {
            get each() {
              return courierCategories();
            },
            children: type => {
              return (() => {
                const _el$43 = libs.createElement("Label", {
                  get text() {
                    return "#CourierCategory" + String(type);
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$43, "text", "#CourierCategory" + String(type), _$p));
                return _el$43;
              })();
            }
          });
        }
      }), _el$21);
      libs.setProp(_el$21, "align", "center bottom");
      libs.setProp(_el$21, "marginBottom", "105px");
      libs.setProp(_el$21, "flowChildren", "down");
      libs.setProp(_el$22, "flowChildren", "right");
      libs.setProp(_el$22, "horizontalAlign", "center");
      libs.insert(_el$22, libs.createComponent(EOM_Button.EOM_BaseButton, {
        get visible() {
          return sortCourierList().length > 6;
        },
        get enabled() {
          return scrollPercent() != 0;
        },
        id: "LeftArrow",
        onactivate: () => listHandle?.scroll(-666)
      }), null);
      libs.insert(_el$22, libs.createComponent(RecycleView.RecycleView, {
        id: "CourierList",
        direction: "Horizontal",
        handle: h => listHandle = h,
        wheelStep: 121,
        input: () => sortCourierList(),
        childConfig: {
          width: 111,
          height: 121
        },
        showBar: false,
        onScrollPercent: v => setScrollPercent(v),
        onPageChange: (page, total) => {
          setCurrentPage(page);
          setTotalPage(total);
        },
        onload: () => {
          $.Schedule(0.2, () => {
            listHandle?.scroll2Child(sortCourierList().indexOf(String(courierID())), "center");
          });
        },
        children: _courierID => {
          const courierData = libs.createMemo(() => KeyValues.service_courier[_courierID()]);
          const quality = libs.createMemo(() => courierData()?.quality ?? 0);
          const playerCourier = libs.createMemo(() => playerCouriers()?.[_courierID()]);
          const star = libs.createMemo(() => playerCourier()?.star ?? 0);
          const isSelected = libs.createMemo(() => courierID() == _courierID());
          const isAssisted = libs.createMemo(() => (playerCourier()?.assist_slot ?? 0) > 0);
          return (() => {
            const _el$44 = libs.createElement("Panel", {}, null);
            libs.insert(_el$44, libs.createComponent(courier_card.CourierCard, {
              get courier_id() {
                return _courierID();
              },
              get star() {
                return star();
              },
              get quality() {
                return quality();
              },
              get explored() {
                return playerCourier()?.equipped;
              },
              get assisted() {
                return isAssisted();
              },
              get selected() {
                return isSelected();
              },
              onactivate: () => {
                setCourierID(_courierID);
              },
              get toolOnly() {
                return KeyValues.service_courier[_courierID()]?.in_tool == 1;
              }
            }), null);
            libs.insert(_el$44, libs.createComponent(libs.Show, {
              get when() {
                return !!props.courierRedPoints()[_courierID()];
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
              }
            }), null);
            return _el$44;
          })();
        }
      }), null);
      libs.insert(_el$22, libs.createComponent(EOM_Button.EOM_BaseButton, {
        get visible() {
          return sortCourierList().length > 6;
        },
        get enabled() {
          return scrollPercent() != 1;
        },
        id: "RightArrow",
        onactivate: () => listHandle?.scroll(666)
      }), null);
      libs.setProp(_el$26, "marginLeft", "15px");
      libs.setProp(_el$26, "width", "311px");
      libs.insert(_el$27, libs.createComponent(libs.Index, {
        each: STAR_LEVELS,
        children: (item, starIndex) => {
          return (() => {
            const _el$45 = libs.createElement("Image", {
              get ["class"]() {
                return libs.classNames("CourierStar", {
                  Unlock: courierStar() > starIndex
                });
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$45, "class", libs.classNames("CourierStar", {
              Unlock: courierStar() > starIndex
            }), _$p));
            return _el$45;
          })();
        }
      }));
      libs.insert(_el$24, libs.createComponent(libs.Show, {
        get when() {
          return courierAbility() != undefined;
        },
        get children() {
          return libs.createComponent(CourierAbility, {
            get abilityName() {
              return courierAbility();
            },
            get abilityLevel() {
              return currentAbilityLevel();
            },
            type: "active"
          });
        }
      }), _el$28);
      libs.insert(_el$24, libs.createComponent(libs.Show, {
        get when() {
          return courierFish() != undefined || courierExplore() != undefined;
        },
        get children() {
          return libs.createComponent(CourierFishExplore, {
            get explore_skill() {
              return courierExplore();
            },
            get fish_skill() {
              return courierFish();
            }
          });
        }
      }), _el$28);
      libs.insert(_el$28, libs.createComponent(libs.Index, {
        each: STAR_LEVELS,
        children: star => {
          const effects = libs.createMemo(() => {
            const attributeName = `star_effect${star()}`;
            return serviceCourierCfg()[attributeName] ?? {};
          });
          return libs.createComponent(StarEffectItem, {
            get level() {
              return star();
            },
            get currentStar() {
              return courierStar();
            },
            get effects() {
              return effects();
            }
          });
        }
      }));
      libs.setProp(_el$32, "width", "160px");
      libs.setProp(_el$32, "verticalAlign", "center");
      libs.insert(_el$35, libs.createComponent(EOM_Button.EOM_Button, {
        btnScale: "95%",
        get enabled() {
          return libs.memo(() => courierStar() > 0)() && courierEquipped() == false;
        },
        verticalAlign: "bottom",
        size: "Normal",
        color: "Gold",
        get text() {
          return courierEquipped() ? "#courier_unequip" : "#courier_equip";
        },
        onactivate: () => {
          CallAction("/v1/courier/equip", {
            courier_id: toFiniteNumber(courierID())
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(libs.Show, {
        get when() {
          return courierStar() < STAR_LEVELS.length;
        },
        get children() {
          const _el$36 = libs.createElement("Panel", {
              flowChildren: "down",
              marginLeft: "31px"
            }, null),
            _el$37 = libs.createElement("Panel", {
              flowChildren: "right",
              horizontalAlign: "center"
            }, _el$36),
            _el$38 = libs.createElement("Label", {
              id: "UpgradeCostLabel",
              html: true,
              get text() {
                return ` X<font color='${UPGRADE_COST <= courierExp() ? "#B6A391" : "#ec5b51"}'>${UPGRADE_COST}</font>`;
              }
            }, _el$37);
          libs.setProp(_el$36, "flowChildren", "down");
          libs.setProp(_el$36, "marginLeft", "31px");
          libs.setProp(_el$37, "flowChildren", "right");
          libs.setProp(_el$37, "horizontalAlign", "center");
          libs.insert(_el$37, libs.createComponent(Player.CurrencyIcon, {
            id: "UpgradeCostIcon",
            get tokenID() {
              return toFiniteNumber(courierID());
            }
          }), _el$38);
          libs.insert(_el$36, libs.createComponent(EOM_Button.EOM_Button, {
            btnScale: "95%",
            get enabled() {
              return libs.memo(() => courierStar() > 0)() && UPGRADE_COST <= courierExp();
            },
            get loading() {
              return starUpRequesting();
            },
            size: "Normal",
            text: "#courier_starup",
            onactivate: () => {
              if (starUpRequesting()) return;
              setStarUpRequesting(true);
              CallActionRequest("/v1/courier/starup", {
                courier_id: toFiniteNumber(courierID())
              }, () => {
                setStarUpRequesting(false);
                playCourierUpgradeParticle();
                Game.EmitSound("ui.treasure_01");
              }, () => {
                setStarUpRequesting(false);
              });
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$38, "text", ` X<font color='${UPGRADE_COST <= courierExp() ? "#B6A391" : "#ec5b51"}'>${UPGRADE_COST}</font>`, _$p));
          return _el$36;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$7 = sortCourierList().length > 6,
          _v$8 = `${currentPage()}/${totalPage()}`,
          _v$9 = "Rarity" + serviceCourierCfg().quality,
          _v$0 = "#" + courierID(),
          _v$1 = "#" + courierID() + "_access";
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$23, "visible", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$23, "text", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$26, "className", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$26, "text", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$34, "text", _v$1, _p$._v$1));
        return _p$;
      }, {
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$0: undefined,
        _v$1: undefined
      });
      return _el$18;
    }
  });
};

function parseHeroStoryReward(reward) {
  if (!reward) return undefined;
  const [itemID, amount] = reward.split(":");
  if (!itemID || amount == undefined) return undefined;
  return {
    rewardItemID: itemID,
    rewardAmount: toFiniteNumber(amount)
  };
}
const Hero = props => {
  const player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  const playerHeroStarRewardsReceiveRecords = solid_utils.createServiceNetData("player_hero_star_rewards_receive_records", {});
  const [previewHeroName, setPreviewHeroName] = global_selection.createPreviewHeroNameSignal();
  const heroID = libs.createMemo(() => GetHeroIDByHeroName(previewHeroName()));
  const [selectTab, setSelectTab] = libs.createSignal("Detail");
  const [showAttributes, setShowAttributes] = libs.createSignal(false);
  const [showHeroStore, setHeroStore] = libs.createSignal(false);
  const [selectedStoryChapter, setSelectedStoryChapter] = libs.createSignal(0);
  const heroKV = libs.createMemo(() => KeyValues.heroes[previewHeroName()]);
  const previewHeroServiceData = libs.createMemo(() => {
    return player_heroes()[String(heroID())];
  });
  const playerAccountLevel = service_netdata_helper.usePlayerAccountLevel("hero_level");
  const equipWeaponID = libs.createMemo(() => {
    const heroData = player_heroes()[String(heroID())];
    return heroData?.equip_weapon;
  });
  const previewWeaponData = libs.createMemo(() => KeyValues.weapon[equipWeaponID()]);
  const heroSoulInfusionEffect = libs.createMemo(() => {
    return KeyValues.hero_soul_infusion_effect[String(heroID())];
  });
  const currentHeroSoulInfusion = libs.createMemo(() => {
    return KeyValues.hero_soul_infusion[String(previewHeroServiceData()?.star ?? 0)];
  });
  const previewHeroSoulDisplayLevel = libs.createMemo(() => {
    const star = previewHeroServiceData()?.star ?? 0;
    if (star <= 0) return 0;
    const config = KeyValues.hero_soul_infusion[String(star - 1)];
    if (config == undefined) return star;
    return config.show_level == "soul_up" ? config.soul_level : config.show_level;
  });
  const maxExp = libs.createMemo(() => {
    return currentHeroSoulInfusion()?.soul_infusion_cost;
  });
  const previewHeroSoulIsMax = libs.createMemo(() => {
    return (previewHeroServiceData()?.star ?? 0) >= Object.keys(heroSoulInfusionEffect() ?? {}).length;
  });
  const previewHeroSoulFragment = libs.createMemo(() => {
    return KeyValues.hero[String(heroID())]?.hero_fragment;
  });
  const canLevelUp = libs.createMemo(() => {
    return (previewHeroServiceData()?.extra_star_exp ?? 0) >= maxExp() && !previewHeroSoulIsMax();
  });
  const [requesting, SetRequesting] = libs.createSignal(false);
  let refImageBg;
  function ShowLevelupFx() {
    if (!refImageBg?.IsValid()) return;
    $.CreatePanel("DOTAParticleScenePanel", refImageBg, "LevelupFx", {
      particleName: "particles/ui/game/ui_game_falling_star_01.vpcf",
      cameraOrigin: "0 0 256",
      lookAt: "0 0 0",
      squarePixels: true,
      fov: 90,
      hittest: false
    }).DeleteAsync(3);
    Game.EmitSound("ui.npe_badge");
    breakthroughListHandle?.scroll2Child(previewHeroServiceData()?.star ?? 0, "center");
  }
  let breakthroughListHandle;
  const [scrollPercent, setScrollPercent] = libs.createSignal(0);
  const breakthroughEffectList = libs.createMemo(() => Object.values(heroSoulInfusionEffect() ?? {}));
  const previewHeroSoulLevel = libs.createMemo(() => previewHeroServiceData()?.star ?? 0);
  const visibleBreakthroughEffectList = libs.createMemo(() => {
    const list = breakthroughEffectList();
    const pendingSoulUpIndex = list.findIndex(effectData => {
      const config = KeyValues.hero_soul_infusion[String(effectData.soul_level - 1)];
      return config?.show_level == "soul_up" && previewHeroSoulLevel() < effectData.soul_level;
    });
    return pendingSoulUpIndex == -1 ? list : list.slice(0, pendingSoulUpIndex + 1);
  });
  const heroStoryChapters = libs.createMemo(() => {
    return breakthroughEffectList().map(effectData => {
      const reward = parseHeroStoryReward(effectData.reward);
      if (reward == undefined) return undefined;
      return {
        unlockLevel: effectData.soul_level,
        ...reward
      };
    }).filter(chapter => chapter != undefined).sort((a, b) => a.unlockLevel - b.unlockLevel);
  });
  const selectedStoryIndex = libs.createMemo(() => {
    const lastIndex = heroStoryChapters().length - 1;
    return lastIndex < 0 ? 0 : Math.min(selectedStoryChapter(), lastIndex);
  });
  const selectedStory = libs.createMemo(() => heroStoryChapters()[selectedStoryIndex()]);
  const selectedStoryUnlocked = libs.createMemo(() => {
    const story = selectedStory();
    return story != undefined && previewHeroSoulLevel() >= story.unlockLevel;
  });
  const selectedStoryUnlockLevel = libs.createMemo(() => {
    const story = selectedStory();
    return story?.unlockLevel ?? 0;
  });
  const selectedStoryTitleKey = libs.createMemo(() => `#${previewHeroName()}_store_${selectedStoryIndex() + 1}_title`);
  const selectedStoryTextKey = libs.createMemo(() => `#${previewHeroName()}_store_${selectedStoryIndex() + 1}`);
  const currentHeroStoryRewardRed = libs.createMemo(() => !!props.storyRewardRedPoints()[String(heroID())]);
  const selectedStoryReceived = libs.createMemo(() => {
    const story = selectedStory();
    if (story == undefined) return false;
    return playerHeroStarRewardsReceiveRecords()[String(heroID())]?.[String(story.unlockLevel)] === true;
  });
  const selectedStoryCanReceive = libs.createMemo(() => selectedStoryUnlocked() && !selectedStoryReceived());
  const [tokens, setTokens] = libs.createSignal([]);
  libs.createEffect(libs.on(previewHeroSoulFragment, () => {
    if (previewHeroSoulFragment() != undefined) {
      setTokens([previewHeroSoulFragment()]);
    } else {
      setTokens([]);
    }
  }));
  libs.createEffect(libs.on(previewHeroName, () => {
    setShowAttributes(false);
    setHeroStore(false);
    setSelectedStoryChapter(0);
  }));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Hero",
    get topbarChildren() {
      return (() => {
        const _el$71 = libs.createElement("Panel", {
            id: "BGRoot"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "BottomParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_05_fx.vpcf",
            cameraOrigin: "0 0 800",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$71);
          libs.createElement("DOTAParticleScenePanel", {
            id: "BGLight",
            particleName: "particles/ui/game/ui_game_general_special_effects_04_1_fx.vpcf",
            cameraOrigin: "0 0 800",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$71);
          const _el$74 = libs.createElement("Panel", {
            id: "CustomTopBottomBG"
          }, _el$71);
        libs.insert(_el$74, libs.createComponent(Player.CurrencyGroup, {
          get tokens() {
            return tokens();
          }
        }));
        return _el$71;
      })();
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "HeroBlock"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "HeroSelectionList"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "TalentPopup"
        }, _el$);
        libs.createElement("DOTAParticleScenePanel", {
          id: "TalentParticleBack",
          particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
          cameraOrigin: "0 0 60",
          fov: 36,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$3);
        libs.createElement("Image", {
          id: "Talent1",
          "class": "TalentIcon"
        }, _el$3);
        libs.createElement("Image", {
          id: "Talent2",
          "class": "TalentIcon"
        }, _el$3);
        libs.createElement("Image", {
          id: "Talent3",
          "class": "TalentIcon"
        }, _el$3);
        libs.createElement("Image", {
          id: "Talent4",
          "class": "TalentIcon"
        }, _el$3);
        libs.createElement("DOTAParticleScenePanel", {
          id: "TalentParticle",
          particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
          cameraOrigin: "0 0 60",
          fov: 36,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, _el$3);
        const _el$10 = libs.createElement("Panel", {
          id: "HeroDetail"
        }, _el$),
        _el$11 = libs.createElement("Panel", {
          id: "TabContainer"
        }, _el$10),
        _el$14 = libs.createElement("Panel", {
          id: "DetailContent"
        }, _el$10),
        _el$15 = libs.createElement("Panel", {
          "class": "DetailTabContent"
        }, _el$14),
        _el$16 = libs.createElement("Panel", {
          id: "HeroBaseDetail"
        }, _el$15),
        _el$17 = libs.createElement("Panel", {
          id: "AbilityList"
        }, _el$16),
        _el$18 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$16);
        libs.createElement("Panel", {
          id: "Health",
          "class": "AttributeIcon"
        }, _el$18);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_health"
        }, _el$18);
        const _el$21 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.StatusHealth;
          }
        }, _el$18),
        _el$22 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$16);
        libs.createElement("Panel", {
          id: "Attack",
          "class": "AttributeIcon"
        }, _el$22);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_attack"
        }, _el$22);
        const _el$25 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.AttackDamageMax;
          }
        }, _el$22),
        _el$26 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$16);
        libs.createElement("Panel", {
          id: "Armor",
          "class": "AttributeIcon"
        }, _el$26);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_attackspeed"
        }, _el$26);
        const _el$29 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.BaseAttackSpeed;
          }
        }, _el$26),
        _el$30 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$16);
        libs.createElement("Panel", {
          id: "SpellDamageAmplify",
          "class": "AttributeIcon"
        }, _el$30);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_movespeed"
        }, _el$30);
        const _el$33 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.MovementSpeed;
          }
        }, _el$30),
        _el$34 = libs.createElement("Panel", {
          id: "HeroAttributeDetail"
        }, _el$15),
        _el$35 = libs.createElement("Panel", {
          id: "Attributes"
        }, _el$34),
        _el$36 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$35);
        libs.createElement("Panel", {
          id: "Health",
          "class": "AttributeIcon"
        }, _el$36);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_health"
        }, _el$36);
        const _el$39 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.StatusHealth;
          }
        }, _el$36),
        _el$40 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$35);
        libs.createElement("Panel", {
          id: "Attack",
          "class": "AttributeIcon"
        }, _el$40);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_attack"
        }, _el$40);
        const _el$43 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.AttackDamageMax;
          }
        }, _el$40),
        _el$44 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$35);
        libs.createElement("Panel", {
          id: "Armor",
          "class": "AttributeIcon"
        }, _el$44);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_attackspeed"
        }, _el$44);
        const _el$47 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.BaseAttackSpeed;
          }
        }, _el$44),
        _el$48 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$35);
        libs.createElement("Panel", {
          id: "Movespeed",
          "class": "AttributeIcon"
        }, _el$48);
        libs.createElement("Label", {
          "class": "AttributeName",
          text: "#property_movespeed"
        }, _el$48);
        const _el$51 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return heroKV()?.MovementSpeed;
          }
        }, _el$48),
        _el$52 = libs.createElement("Panel", {
          id: "HeroAttribute"
        }, _el$35);
        libs.createElement("Panel", {
          id: "SpellDamageAmplify",
          "class": "AttributeIcon"
        }, _el$52);
        const _el$54 = libs.createElement("Label", {
          "class": "AttributeName",
          get text() {
            return GetLocalization("#property_spell_damage_amplify").replace("%", "");
          }
        }, _el$52),
        _el$55 = libs.createElement("Label", {
          "class": "AttributeValue",
          get text() {
            return `${heroKV()?.SpellDamageAmplify ?? 0}%`;
          }
        }, _el$52),
        _el$56 = libs.createElement("Panel", {
          id: "HeroStoryDetail"
        }, _el$15),
        _el$57 = libs.createElement("Panel", {
          id: "HeroStoryContent",
          "class": "VerticalScrollStyle",
          scroll: "y"
        }, _el$56),
        _el$58 = libs.createElement("Label", {
          id: "HeroStoryTitle",
          get text() {
            return libs.memo(() => selectedStory() != undefined)() ? selectedStoryTitleKey() : "#HeroStore";
          }
        }, _el$57),
        _el$59 = libs.createElement("Label", {
          id: "HeroStoryText",
          html: true,
          get text() {
            return selectedStoryTextKey();
          }
        }, _el$57),
        _el$67 = libs.createElement("Panel", {
          id: "HeroStoryChapterList"
        }, _el$56),
        _el$68 = libs.createElement("Panel", {
          id: "Breakthrough",
          "class": "DetailTabContent"
        }, _el$14),
        _el$69 = libs.createElement("Panel", {
          id: "BreakthroughLevel"
        }, _el$68),
        _el$70 = libs.createElement("Label", {
          get text() {
            return previewHeroSoulDisplayLevel();
          }
        }, _el$69);
      libs.insert(_el$2, libs.createComponent(hero_level_main.HeroLevelMain, {
        get level() {
          return playerAccountLevel().level;
        },
        get extraExp() {
          return playerAccountLevel().extra_exp;
        },
        get title() {
          return "#" + previewHeroName();
        }
      }), null);
      libs.insert(_el$2, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(KeyValues.heroes);
        },
        children: (heroName, index) => {
          const id = String(KeyValues.heroes[heroName].HeroID);
          const showRed = () => !!props.soulRedPoints()[id] || !!props.talentRedPoints()[id] || !!props.storyRewardRedPoints()[id];
          return (() => {
            const _el$75 = libs.createElement("Panel", {
              marginTop: "26px"
            }, null);
            libs.setProp(_el$75, "marginTop", "26px");
            libs.insert(_el$75, libs.createComponent(hero_card.HeroCard, {
              heroName: heroName,
              get selected() {
                return previewHeroName() == heroName;
              },
              onactivate: () => {
                setPreviewHeroName(heroName);
              }
            }), null);
            libs.insert(_el$75, libs.createComponent(libs.Show, {
              get when() {
                return showRed();
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
              }
            }), null);
            return _el$75;
          })();
        }
      }), null);
      libs.insert(_el$, libs.createComponent(solid_utils.DynamicKey, {
        key: previewHeroName,
        children: hero => libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
          id: "FullBodyPreview",
          unit: hero,
          ref(r$) {
            const _ref$ = refImageBg;
            typeof _ref$ === "function" ? _ref$(r$) : refImageBg = r$;
          }
        })
      }), _el$3);
      libs.setProp(_el$3, "classList", {
        Activited: true
      });
      libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "TalentPopupBtn",
        tooltip_text: "#talent_tips",
        onactivate: () => {
          props.onTalentViewed();
          ShowPopup("HeroTalent", {
            group: "HeroTalent",
            heroName: previewHeroName()
          });
        },
        get children() {
          const _el$0 = libs.createElement("Panel", {
              id: "Button_Text"
            }, null),
            _el$1 = libs.createElement("Label", {
              width: "100%",
              text: "#HeroTalent_Menu"
            }, _el$0);
          libs.setProp(_el$1, "width", "100%");
          return _el$0;
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return !!props.talentRedPoints()[String(heroID())];
        },
        get children() {
          return libs.createComponent(EOM_RedMark.EOM_RedMark, {
            id: "TalentPopupRed",
            type: "exclamation",
            size: "small"
          });
        }
      }), _el$10);
      libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "TabBtn",
        get classList() {
          return {
            Selected: selectTab() == "Detail"
          };
        },
        onactivate: () => {
          setSelectTab("Detail");
        },
        get children() {
          return libs.createElement("Label", {
            text: "#Hero_Detail"
          }, null);
        }
      }), null);
      libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "TabBtn",
        get classList() {
          return {
            Selected: selectTab() == "Breakthrough"
          };
        },
        onactivate: () => {
          setSelectTab("Breakthrough");
        },
        get children() {
          return [libs.createElement("Label", {
            text: "#Hero_Breakthrough"
          }, null), libs.createComponent(libs.Show, {
            get when() {
              return canLevelUp();
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
            }
          })];
        }
      }), null);
      libs.insert(_el$16, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
        text: "#HeroSelection_Ability",
        marginTop: "37px"
      }), _el$17);
      libs.insert(_el$17, libs.createComponent(libs.For, {
        each: [3, 0, 1, 2, 5],
        children: (abilityIndex, index) => {
          const abilityName = libs.createMemo(() => heroKV()["Ability" + (abilityIndex + 1)]);
          return (() => {
            const _el$76 = libs.createElement("Panel", {
                id: "AbilityContainer",
                get marginLeft() {
                  return index() == 0 ? "0px" : "12px";
                }
              }, null),
              _el$77 = libs.createElement("DOTAAbilityImage", {
                get abilityname() {
                  return abilityName();
                }
              }, _el$76);
            libs.effect(_p$ => {
              const _v$20 = index() == 0 ? "0px" : "12px",
                _v$21 = {
                  name: "hero_ability",
                  abilityName: abilityName(),
                  entIndex: -1
                },
                _v$22 = abilityName();
              _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$76, "marginLeft", _v$20, _p$._v$20));
              _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$76, "customTooltip", _v$21, _p$._v$21));
              _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$77, "abilityname", _v$22, _p$._v$22));
              return _p$;
            }, {
              _v$20: undefined,
              _v$21: undefined,
              _v$22: undefined
            });
            return _el$76;
          })();
        }
      }));
      libs.insert(_el$16, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
        text: "#HeroSelection_Attribute",
        margin: "20px 0px"
      }), _el$18);
      libs.insert(_el$16, libs.createComponent(EOM_Button.EOM_Button, {
        id: "HeroStoreButton",
        text: "#HeroStore",
        size: "Small",
        horizontalAlign: "center",
        marginTop: "20px",
        onactivate: () => {
          setHeroStore(true);
          setShowAttributes(false);
        },
        get children() {
          return libs.createComponent(libs.Show, {
            get when() {
              return currentHeroStoryRewardRed();
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
            }
          });
        }
      }), null);
      libs.insert(_el$16, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
        text: "#HeroSelection_Weapon",
        marginTop: "20px"
      }), null);
      libs.insert(_el$16, libs.createComponent(solid_utils.DynamicKey, {
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
              },
              get customTooltip() {
                return {
                  name: "weapon_info",
                  weapon_id: data.id
                };
              }
            });
          }
        }
      }), null);
      libs.insert(_el$34, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
        text: "#HeroSelection_AttributeDetail",
        marginTop: "37px",
        marginBottom: "20px"
      }), _el$35);
      libs.insert(_el$34, libs.createComponent(EOM_Button.EOM_Button, {
        text: "#MenuButton_Return",
        size: "Small",
        horizontalAlign: "center",
        marginTop: "20px",
        onactivate: () => setShowAttributes(false)
      }), null);
      libs.insert(_el$56, libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
        text: "#HeroStore",
        marginTop: "37px",
        marginBottom: "26px"
      }), _el$57);
      libs.setProp(_el$57, "scroll", "y");
      libs.insert(_el$57, libs.createComponent(StoreItem.StoreItemBlock, {
        id: "HeroStoryReward",
        get visible() {
          return libs.memo(() => !!selectedStoryUnlocked())() && selectedStory() != undefined;
        },
        get classList() {
          return {
            received: selectedStoryReceived(),
            locked: !selectedStoryUnlocked()
          };
        },
        get item_id() {
          return selectedStory().rewardItemID;
        },
        get amounts() {
          return selectedStory().rewardAmount;
        },
        onactivate: () => {
          const heroId = heroID();
          const soul_level = selectedStory()?.unlockLevel;
          if (!heroId || soul_level == undefined || !selectedStoryCanReceive()) {
            return;
          }
          CallAction("/v1/hero/receive_star_rewards", {
            hero_id: heroId,
            star: soul_level
          });
        },
        get children() {
          return [libs.createComponent(libs.Show, {
            get when() {
              return libs.memo(() => !!currentHeroStoryRewardRed())() && selectedStoryCanReceive();
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
            }
          }), libs.createElement("Panel", {
            "class": "ReceivedIcon"
          }, null), libs.createElement("Panel", {
            "class": "LockIcon"
          }, null)];
        }
      }), null);
      libs.insert(_el$57, libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => selectedStory() != undefined)() && !selectedStoryUnlocked();
        },
        get children() {
          const _el$62 = libs.createElement("Panel", {
              id: "LockArea"
            }, null);
            libs.createElement("Panel", {
              "class": "Empty"
            }, _el$62);
            const _el$64 = libs.createElement("Panel", {
              marginBottom: "45px",
              width: "100%",
              align: "center bottom",
              flowChildren: "down"
            }, _el$62),
            _el$65 = libs.createElement("Label", {
              id: "StoreLockTitle",
              get text() {
                return GetLocalization("UnLockStoreTipsTitle");
              }
            }, _el$64),
            _el$66 = libs.createElement("Label", {
              id: "StoreLockText",
              get text() {
                return LocalizeWithVars("UnLockStoreTips", {
                  value: selectedStoryUnlockLevel()
                });
              }
            }, _el$64);
          libs.setProp(_el$64, "marginBottom", "45px");
          libs.setProp(_el$64, "width", "100%");
          libs.setProp(_el$64, "align", "center bottom");
          libs.setProp(_el$64, "flowChildren", "down");
          libs.effect(_p$ => {
            const _v$ = GetLocalization("UnLockStoreTipsTitle"),
              _v$2 = LocalizeWithVars("UnLockStoreTips", {
                value: selectedStoryUnlockLevel()
              });
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$65, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$66, "text", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$62;
        }
      }), null);
      libs.insert(_el$67, libs.createComponent(libs.For, {
        get each() {
          return heroStoryChapters();
        },
        children: (chapter, index) => {
          const unlocked = libs.createMemo(() => previewHeroSoulLevel() >= chapter.unlockLevel);
          const received = libs.createMemo(() => playerHeroStarRewardsReceiveRecords()[String(heroID())]?.[String(chapter.unlockLevel)] === true);
          const canReceive = libs.createMemo(() => unlocked() && !received());
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            get ["class"]() {
              return `HeroStoryChapterButton Index${index() + 1}`;
            },
            get classList() {
              return {
                Selected: selectedStoryIndex() == index(),
                Locked: !unlocked()
              };
            },
            onactivate: () => setSelectedStoryChapter(index()),
            get children() {
              return [libs.createElement("Panel", {
                "class": "Border"
              }, null), libs.createElement("Panel", {
                "class": "Lock"
              }, null), libs.createComponent(libs.Show, {
                get when() {
                  return canReceive();
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
                }
              })];
            }
          });
        }
      }));
      libs.insert(_el$56, libs.createComponent(EOM_Button.EOM_Button, {
        text: "#MenuButton_Return",
        size: "Small",
        horizontalAlign: "center",
        marginTop: "21px",
        onactivate: () => setHeroStore(false)
      }), null);
      libs.insert(_el$68, libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "TopArrow",
        get visible() {
          return visibleBreakthroughEffectList().length > 0;
        },
        get enabled() {
          return scrollPercent() != 0;
        },
        onactivate: () => breakthroughListHandle?.scroll(-84)
      }), null);
      libs.insert(_el$68, libs.createComponent(RecycleView.RecycleView, {
        id: "BreakthroughAttributes",
        direction: "Vertical",
        handle: h => breakthroughListHandle = h,
        input: () => visibleBreakthroughEffectList(),
        childConfig: {
          width: 370,
          height: 84
        },
        showBar: false,
        onScrollPercent: v => setScrollPercent(v),
        onload: () => {
          $.Schedule(0, () => {
            breakthroughListHandle?.scroll2Child(visibleBreakthroughEffectList().findIndex(v => v.soul_level == previewHeroServiceData().star), "start");
          });
        },
        children: effectData => {
          const soulInfusionConfig = libs.createMemo(() => {
            return KeyValues.hero_soul_infusion[String(effectData().soul_level - 1)];
          });
          const isSoulUp = libs.createMemo(() => soulInfusionConfig()?.show_level == "soul_up");
          const content = libs.createMemo(() => {
            const data = effectData();
            const result = [];
            Object.entries(data.soul_effect ?? {}).forEach(([effKey, effVal]) => {
              if (typeof effVal == "number") {
                result.push(GetPropertyLocalization(effKey, effVal));
              } else {
                if (KeyValues.privilege[effKey]) {
                  const privilegeData = KeyValues.privilege[effKey];
                  result.push(getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${effKey}`, effKey), privilegeData?.AbilityValues, {
                    level: 1,
                    onlyShowNowLevel: true
                  }));
                }
              }
            });
            if (result.length === 0) {
              return "#Hero_Breakthrough_NoAttributeEffect";
            }
            return result.join("<br>");
          });
          return (() => {
            const _el$80 = libs.createElement("Panel", {
                "class": "AttributeRow"
              }, null),
              _el$83 = libs.createElement("Label", {
                "class": "AttributeRowLabel",
                html: true,
                get text() {
                  return content();
                }
              }, _el$80);
            libs.insert(_el$80, libs.createComponent(libs.Show, {
              get when() {
                return !isSoulUp();
              },
              get children() {
                const _el$81 = libs.createElement("Panel", {
                    "class": "AttributeRowIcon"
                  }, null),
                  _el$82 = libs.createElement("Label", {
                    "class": "AttributeRowIconLabel",
                    get text() {
                      return soulInfusionConfig()?.show_level ?? effectData().soul_level;
                    }
                  }, _el$81);
                libs.effect(_$p => libs.setProp(_el$82, "text", soulInfusionConfig()?.show_level ?? effectData().soul_level, _$p));
                return _el$81;
              }
            }), _el$83);
            libs.effect(_p$ => {
              const _v$23 = {
                  Active: (previewHeroServiceData()?.star ?? 0) >= effectData().soul_level,
                  SoulUp: isSoulUp()
                },
                _v$24 = content();
              _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$80, "classList", _v$23, _p$._v$23));
              _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$83, "text", _v$24, _p$._v$24));
              return _p$;
            }, {
              _v$23: undefined,
              _v$24: undefined
            });
            return _el$80;
          })();
        }
      }), null);
      libs.insert(_el$68, libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "BottomArrow",
        get visible() {
          return visibleBreakthroughEffectList().length > 0;
        },
        get enabled() {
          return scrollPercent() != 1;
        },
        onactivate: () => breakthroughListHandle?.scroll(84)
      }), null);
      libs.insert(_el$68, libs.createComponent(libs.Show, {
        get when() {
          return !previewHeroSoulIsMax();
        },
        get children() {
          return [libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return previewHeroSoulFragment();
            }
          }), libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
            id: "UpgradeCost",
            get have() {
              return previewHeroServiceData()?.extra_star_exp ?? 0;
            },
            get cost() {
              return maxExp();
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "UpgradeBtn",
            get text() {
              return GetLocalization(currentHeroSoulInfusion()?.show_level == "soul_up" ? "#Hero_SoulUp" : "#Hero_Breakthrough");
            },
            color: "Confirm",
            get enabled() {
              return libs.memo(() => !!!requesting())() && canLevelUp();
            },
            onactivate: self => {
              if (requesting()) return;
              if (!canLevelUp()) return;
              SetRequesting(true);
              CallActionRequest("/v1/hero/starup", {
                hero_id: heroID()
              }, () => {
                SetRequesting(false);
                ShowLevelupFx();
              });
            }
          })];
        }
      }), null);
      libs.effect(_p$ => {
        const _v$3 = {
            Selected: selectTab() == "Detail"
          },
          _v$4 = {
            Selected: !showAttributes() && !showHeroStore()
          },
          _v$5 = heroKV()?.StatusHealth,
          _v$6 = heroKV()?.AttackDamageMax,
          _v$7 = heroKV()?.BaseAttackSpeed,
          _v$8 = heroKV()?.MovementSpeed,
          _v$9 = {
            Selected: showAttributes()
          },
          _v$0 = heroKV()?.StatusHealth,
          _v$1 = heroKV()?.AttackDamageMax,
          _v$10 = heroKV()?.BaseAttackSpeed,
          _v$11 = heroKV()?.MovementSpeed,
          _v$12 = GetLocalization("#property_spell_damage_amplify").replace("%", ""),
          _v$13 = `${heroKV()?.SpellDamageAmplify ?? 0}%`,
          _v$14 = {
            Selected: showHeroStore()
          },
          _v$15 = libs.memo(() => selectedStory() != undefined)() ? selectedStoryTitleKey() : "#HeroStore",
          _v$16 = selectedStoryUnlocked(),
          _v$17 = selectedStoryTextKey(),
          _v$18 = {
            Selected: selectTab() == "Breakthrough"
          },
          _v$19 = previewHeroSoulDisplayLevel();
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$15, "classList", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "classList", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$21, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$25, "text", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$29, "text", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$33, "text", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$34, "classList", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$39, "text", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$43, "text", _v$1, _p$._v$1));
        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$47, "text", _v$10, _p$._v$10));
        _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$51, "text", _v$11, _p$._v$11));
        _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$54, "text", _v$12, _p$._v$12));
        _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$55, "text", _v$13, _p$._v$13));
        _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$56, "classList", _v$14, _p$._v$14));
        _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$58, "text", _v$15, _p$._v$15));
        _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$59, "visible", _v$16, _p$._v$16));
        _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$59, "text", _v$17, _p$._v$17));
        _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$68, "classList", _v$18, _p$._v$18));
        _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$70, "text", _v$19, _p$._v$19));
        return _p$;
      }, {
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
        _v$19: undefined
      });
      return _el$;
    }
  });
};

const maxStar = 6;
const Weapon = props => {
  const player_weapons = solid_utils.createServiceNetData("player_weapons", {});
  const player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  const [previewHeroName, setPreviewHeroName] = global_selection.createPreviewHeroNameSignal();
  const heroID = libs.createMemo(() => GetHeroIDByHeroName(previewHeroName()));
  const equipWeaponID = libs.createMemo(() => {
    const heroData = player_heroes()[String(heroID())];
    return heroData?.equip_weapon;
  });
  const weaponList = libs.createMemo(() => {
    const list = Object.keys(KeyValues.weapon).filter(id => KeyValues.weapon[id].hero == heroID()).filter(id => {
      return KeyValues.weapon[id].in_tool != 1 || Game.IsInToolsMode();
    }).sort((weapon1, weapon2) => {
      const unlocked1 = player_weapons()[weapon1]?.star > 0;
      const unlocked2 = player_weapons()[weapon2]?.star > 0;
      if (unlocked1 && !unlocked2) {
        return -1;
      } else if (!unlocked1 && unlocked2) {
        SaveData;
        return 1;
      } else {
        return 0;
      }
    });
    return list;
  });
  const [previewWeaponID, setPreviewWeaponID] = global_selection.createPreviewWeaponIDSignal();
  const previewWeaponData = libs.createMemo(() => KeyValues.weapon[previewWeaponID()]);
  const previewWeaponServiceData = libs.createMemo(() => {
    return player_weapons()[previewWeaponID()] ?? {
      star: 0,
      extra_star_exp: 0
    };
  });
  const previewWeaponIsMax = libs.createMemo(() => {
    return (previewWeaponServiceData()?.star ?? 0) >= maxStar;
  });
  const weaponRarity = name => KeyValues.weapon[name].rarity;
  const getPrivilegeDescription = (privilege, level = 1) => {
    const privilegeData = KeyValues.privilege[privilege];
    if (!privilegeData || !privilegeData.AbilityValues) {
      return GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, "");
    }
    const abilityValues = {};
    for (const key in privilegeData.AbilityValues) {
      if (key.startsWith("desc_key")) continue;
      abilityValues[key] = privilegeData.AbilityValues[key];
    }
    const upgradeKeys = privilegeData.AbilityValues["desc_key"] !== undefined ? String(privilegeData.AbilityValues['desc_key']).split(" ") : [];
    for (const upgradeKey of upgradeKeys) {
      const abilityUpgradeData = KeyValues.ability_upgrades_service[upgradeKey];
      const upgradeValue = abilityUpgradeData.AbilityValues;
      if (!upgradeValue) continue;
      for (const key in upgradeValue) {
        abilityValues[key] = upgradeValue[key];
      }
    }
    return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, ""), abilityValues, {
      level: level
    });
  };
  const [attributeCanScrollUp, setAttributeCanScrollUp] = libs.createSignal(false);
  const [attributeCanScrollDown, setAttributeCanScrollDown] = libs.createSignal(false);
  const weaponEffectList = libs.createMemo(() => {
    const result = [];
    for (let i = 1; i <= maxStar; i++) {
      const effectData = previewWeaponData()?.["star_effect" + i];
      const privilegeData = previewWeaponData()?.["star_privilege" + i];
      result.push({
        star: i,
        entries: Object.entries(effectData ?? {}),
        privileges: privilegeData ? privilegeData.split("|").filter(Boolean) : []
      });
    }
    return result;
  });
  const weaponUnlocked = libs.createMemo(() => {
    return (previewWeaponServiceData()?.star ?? 0) > 0;
  });
  const showAccessSection = libs.createMemo(() => {
    return !weaponUnlocked();
  });
  const showUpgradeSection = libs.createMemo(() => {
    return weaponUnlocked() && !previewWeaponIsMax();
  });
  const canLevelUp = libs.createMemo(() => {
    return previewWeaponServiceData().extra_star_exp >= 1 && !previewWeaponIsMax();
  });
  const weaponSkillDesc = libs.createMemo(() => {
    const star = previewWeaponServiceData()?.star ?? 0;
    const privilege = previewWeaponData()?.weapon_effect;
    let desc = "";
    if (!privilege) {
      desc = GetLocalization("#Weapon_NoAbilityEffect", "");
    } else {
      desc = getPrivilegeDescription(privilege, Math.max(1, Math.min(star, maxStar)));
      if (!weaponUnlocked()) {
        desc = `${desc}<font color='#999999'>(${GetLocalization("#Weapon_NoAbilityUnlockTips", "")})</font>`;
      }
    }
    return desc;
  });
  const [requesting, SetRequesting] = libs.createSignal(false);
  let refImageBg;
  let refAttributeViewport;
  let attributeRowRefs = [];
  function getAttributeRows() {
    const result = [];
    for (let i = 0; i < attributeRowRefs.length; i++) {
      const panel = attributeRowRefs[i];
      if (panel?.IsValid()) {
        result.push(panel);
      }
    }
    return result;
  }
  function updateAttributeArrowState() {
    if (!refAttributeViewport?.IsValid()) {
      setAttributeCanScrollUp(false);
      setAttributeCanScrollDown(false);
      return;
    }
    const rows = getAttributeRows();
    if (rows.length === 0) {
      setAttributeCanScrollUp(false);
      setAttributeCanScrollDown(false);
      return;
    }
    const firstRow = rows[0];
    const lastRow = rows[rows.length - 1];
    const viewportHeight = refAttributeViewport.actuallayoutheight;
    const tolerance = 2;
    const firstPosition = firstRow.GetPositionWithinAncestor(refAttributeViewport);
    const lastPosition = lastRow.GetPositionWithinAncestor(refAttributeViewport);
    setAttributeCanScrollUp(firstPosition.y < -tolerance);
    setAttributeCanScrollDown(lastPosition.y + lastRow.actuallayoutheight > viewportHeight + tolerance);
  }
  function scrollAttributeList(direction) {
    if (!refAttributeViewport?.IsValid()) return;
    const rows = getAttributeRows();
    if (rows.length === 0) return;
    const viewportHeight = refAttributeViewport.actuallayoutheight;
    const step = Math.max(72, Math.floor(viewportHeight * 0.35));
    let targetRow;
    if (direction > 0) {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const position = row.GetPositionWithinAncestor(refAttributeViewport);
        if (position.y >= step || position.y + row.actuallayoutheight > viewportHeight + 2) {
          targetRow = row;
          break;
        }
      }
      if (!targetRow && attributeCanScrollDown()) {
        targetRow = rows[rows.length - 1];
      }
      if (targetRow?.IsValid()) {
        targetRow.ScrollParentToMakePanelFit(targetRow === rows[rows.length - 1] ? 2 : 1, false);
      }
    } else {
      for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const position = row.GetPositionWithinAncestor(refAttributeViewport);
        if (position.y <= -step || position.y < -2) {
          targetRow = row;
          break;
        }
      }
      if (!targetRow && attributeCanScrollUp()) {
        targetRow = rows[0];
      }
      if (targetRow?.IsValid()) {
        targetRow.ScrollParentToMakePanelFit(1, false);
      }
    }
  }
  function ShowLevelupFx() {
    if (!refImageBg?.IsValid()) return;
    $.CreatePanel("DOTAParticleScenePanel", refImageBg, "LevelupFx", {
      particleName: "particles/ui/game/ui_game_falling_star_01.vpcf",
      cameraOrigin: "0 0 256",
      lookAt: "0 0 0",
      squarePixels: true,
      fov: 90,
      hittest: false
    }).DeleteAsync(3);
    Game.EmitSound("ui.npe_badge");
  }
  let listHandle;
  const [scrollPercent, setScrollPercent] = libs.createSignal(0);
  const [currentPage, setCurrentPage] = libs.createSignal(1);
  const [totalPage, setTotalPage] = libs.createSignal(1);
  let selectionInitialized = false;
  libs.createEffect(libs.on(weaponList, list => {
    if (selectionInitialized || list.length === 0) return;
    selectionInitialized = true;
    const equippedWeaponID = String(equipWeaponID());
    const selectedWeaponID = list.includes(equippedWeaponID) ? equippedWeaponID : list[0];
    setPreviewWeaponID(selectedWeaponID);
    listHandle?.scroll2Child(list.indexOf(selectedWeaponID), "center");
  }));
  const [tokens, setTokens] = libs.createSignal([]);
  libs.createEffect(libs.on(previewWeaponID, () => {
    if (previewWeaponID() != undefined) {
      setTokens([Number(previewWeaponID())]);
    } else {
      setTokens([]);
    }
  }));
  libs.createEffect(() => {
    previewWeaponID();
    showAccessSection();
    showUpgradeSection();
    weaponEffectList();
    setAttributeCanScrollUp(false);
    setAttributeCanScrollDown(false);
    let scheduleId;
    let disposed = false;
    const tick = () => {
      if (disposed) return;
      updateAttributeArrowState();
      scheduleId = $.Schedule(0.05, tick);
    };
    scheduleId = $.Schedule(0, tick);
    libs.onCleanup(() => {
      disposed = true;
      if (scheduleId !== undefined) {
        try {
          $.CancelScheduled(scheduleId);
        } catch (error) {}
      }
    });
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Weapon",
    get topbarChildren() {
      return (() => {
        const _el$12 = libs.createElement("Panel", {
            id: "BGRoot"
          }, null);
          libs.createElement("Panel", {
            id: "BGImage"
          }, _el$12);
          libs.createElement("DOTAParticleScenePanel", {
            id: "BGLight",
            particleName: "particles/ui/game/ui_game_general_special_effects_04_fx.vpcf",
            cameraOrigin: "0 0 700",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$12);
          const _el$15 = libs.createElement("Panel", {
            id: "CustomTopBottomBG"
          }, _el$12);
        libs.insert(_el$15, libs.createComponent(Player.CurrencyGroup, {
          get tokens() {
            return tokens();
          }
        }));
        return _el$12;
      })();
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "WeaponBlock"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "HeroSelectionList"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "WeaponPreview"
        }, _el$),
        _el$4 = libs.createElement("Panel", {
          id: "WeaponIconBG"
        }, _el$3),
        _el$5 = libs.createElement("Panel", {
          id: "WeaponListBlock"
        }, _el$3),
        _el$6 = libs.createElement("Panel", {
          id: "WeaponListContainer"
        }, _el$5),
        _el$7 = libs.createElement("Label", {
          id: "WeaponListPageLabel",
          get text() {
            return `${currentPage()}/${totalPage()}`;
          }
        }, _el$5),
        _el$8 = libs.createElement("Panel", {
          id: "WeaponDetails"
        }, _el$),
        _el$9 = libs.createElement("Label", {
          id: "WeaponName",
          get text() {
            return "#" + previewWeaponID();
          }
        }, _el$8),
        _el$0 = libs.createElement("Panel", {
          id: "WeaponSkill"
        }, _el$8),
        _el$1 = libs.createElement("Label", {
          id: "WeaponSkillDesc",
          html: true,
          get text() {
            return weaponSkillDesc();
          }
        }, _el$0),
        _el$11 = libs.createElement("Label", {
          id: "WeaponStarInfo",
          text: "#WeaponStarInfo"
        }, _el$8);
      libs.insert(_el$2, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(KeyValues.heroes);
        },
        children: (heroName, index) => {
          const id = Number(KeyValues.heroes[heroName].HeroID);
          const hasWeaponRed = libs.createMemo(() => {
            const reds = props.weaponRedPoints();
            const weaponIDs = Object.keys(KeyValues.weapon).filter(wid => KeyValues.weapon[wid].hero == id);
            return weaponIDs.some(wid => !!reds[wid]);
          });
          return (() => {
            const _el$16 = libs.createElement("Panel", {
              marginTop: "26px"
            }, null);
            libs.setProp(_el$16, "marginTop", "26px");
            libs.insert(_el$16, libs.createComponent(hero_card.HeroCard, {
              heroName: heroName,
              get selected() {
                return previewHeroName() == heroName;
              },
              onactivate: () => {
                setPreviewHeroName(heroName);
              }
            }), null);
            libs.insert(_el$16, libs.createComponent(libs.Show, {
              get when() {
                return hasWeaponRed();
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
              }
            }), null);
            return _el$16;
          })();
        }
      }));
      const _ref$ = refImageBg;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$4) : refImageBg = _el$4;
      libs.insert(_el$4, libs.createComponent(solid_utils.DynamicKey, {
        key: previewWeaponData,
        children: data => libs.createComponent(weapon3DPreview.Weapon3DPreview, {
          id: "WeaponIcon",
          get model() {
            return data.model;
          },
          get defaultConfig() {
            return data.hero;
          }
        })
      }));
      libs.insert(_el$3, libs.createComponent(libs.Switch, {
        get fallback() {
          return libs.createComponent(EOM_Button.EOM_Button, {
            id: "WeaponEquip",
            size: "Small",
            text: "#Weapon_Equip",
            get enabled() {
              return !requesting();
            },
            onactivate: () => {
              if (heroID() == undefined) return;
              if (requesting()) return;
              SetRequesting(true);
              Game.EmitSound("ui.inv_equip_metalblade");
              CallActionRequest("/v1/hero/equip_weapon", {
                hero_id: heroID(),
                weapon_id: toFiniteNumber(previewWeaponData().id)
              }, () => {
                SetRequesting(false);
              });
            }
          });
        },
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return previewWeaponServiceData().star == 0;
            },
            get children() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                id: "WeaponEquip",
                size: "Small",
                enabled: false,
                text: "#Weapon_NotObtained"
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return equipWeaponID() == previewWeaponData().id;
            },
            get children() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                id: "WeaponEquip",
                size: "Small",
                enabled: false,
                text: "#Weapon_Equipped"
              });
            }
          })];
        }
      }), _el$5);
      libs.insert(_el$6, libs.createComponent(EOM_Button.EOM_BaseButton, {
        get visible() {
          return weaponList().length > 5;
        },
        get enabled() {
          return scrollPercent() != 0;
        },
        id: "LeftArrow",
        onactivate: () => listHandle?.scroll(-370)
      }), null);
      libs.insert(_el$6, libs.createComponent(RecycleView.RecycleView, {
        id: "WeaponList",
        direction: "Horizontal",
        handle: h => listHandle = h,
        input: () => weaponList(),
        paddingLeft: "10px",
        childConfig: {
          width: 76 + 2 * 15,
          height: 76 + 2 * 15
        },
        wheelStep: 370,
        showBar: false,
        onScrollPercent: v => setScrollPercent(v),
        onPageChange: (page, total) => {
          setCurrentPage(page);
          setTotalPage(total);
        },
        onload: () => {
          $.Schedule(1, () => {
            listHandle?.scroll2Child(weaponList().indexOf(String(equipWeaponID())), "center");
          });
        },
        children: weaponName => libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "WeaponOption",
          get classList() {
            return {
              Selected: previewWeaponID() == weaponName(),
              Equipped: String(equipWeaponID()) == weaponName(),
              Locked: (player_weapons()[weaponName()]?.star ?? 0) === 0
            };
          },
          onactivate: () => {
            setPreviewWeaponID(weaponName());
          },
          get children() {
            return [libs.createElement("DOTAParticleScenePanel", {
              "class": "SelectParticle",
              particleName: "particles/ui/game/ui_game_general_special_effects_06_fx.vpcf",
              cameraOrigin: "0 0 58",
              fov: 45,
              lookAt: "0 0 0",
              hittest: false,
              squarePixels: true
            }, null), libs.createElement("Panel", {
              id: "SelectedBorder"
            }, null), libs.createComponent(StoreItem.StoreItemBlock, {
              get rarity() {
                return weaponRarity(weaponName());
              },
              get item_id() {
                return weaponName();
              }
            }), libs.createComponent(libs.Show, {
              get when() {
                return String(equipWeaponID()) == weaponName();
              },
              get children() {
                return libs.createElement("Image", {
                  id: "EquipedTag"
                }, null);
              }
            }), libs.createComponent(libs.Show, {
              get when() {
                return KeyValues.weapon[weaponName()].in_tool == 1;
              },
              get children() {
                return libs.createElement("Label", {
                  id: "ToolOnly",
                  text: "ToolOnly"
                }, null);
              }
            }), libs.createComponent(libs.Show, {
              get when() {
                return !!props.weaponRedPoints()[weaponName()];
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {});
              }
            })];
          }
        })
      }), null);
      libs.insert(_el$6, libs.createComponent(EOM_Button.EOM_BaseButton, {
        get visible() {
          return weaponList().length > 5;
        },
        get enabled() {
          return scrollPercent() != 1;
        },
        id: "RightArrow",
        onactivate: () => listHandle?.scroll(370)
      }), null);
      libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "AttributeTopArrow",
        get visible() {
          return weaponEffectList().length > 0;
        },
        get enabled() {
          return attributeCanScrollUp();
        },
        onactivate: () => scrollAttributeList(-1)
      }), _el$11);
      libs.insert(_el$8, libs.createComponent(solid_utils.DynamicKey, {
        key: previewWeaponID,
        children: () => {
          attributeRowRefs = [];
          return (() => {
            const _el$21 = libs.createElement("Panel", {
                id: "WeaponDetailAttributeViewport"
              }, null),
              _el$22 = libs.createElement("Panel", {
                id: "WeaponDetailAttributeList"
              }, _el$21);
            libs.use(panel => {
              refAttributeViewport = panel;
            }, _el$21);
            libs.insert(_el$22, libs.createComponent(libs.For, {
              get each() {
                return weaponEffectList();
              },
              children: (rowData, index) => {
                const content = libs.createMemo(() => {
                  const result = [];
                  for (let i = 0; i < rowData.entries.length; i++) {
                    const [attribute, value] = rowData.entries[i];
                    result.push(GetPropertyLocalization(attribute, value));
                  }
                  for (let i = 0; i < rowData.privileges.length; i++) {
                    const privilege = rowData.privileges[i];
                    const privilegeDesc = getPrivilegeDescription(privilege);
                    if (privilegeDesc) {
                      result.push(privilegeDesc);
                    }
                  }
                  if (result.length === 0) {
                    return "#Weapon_NoAttributeEffect";
                  }
                  return result.join("<br>");
                });
                const rowActivated = () => (previewWeaponServiceData().star ?? 0) >= rowData.star;
                const currentWeaponStar = () => previewWeaponServiceData().star ?? 0;
                return (() => {
                  const _el$23 = libs.createElement("Panel", {
                      "class": "AttributeRow"
                    }, null),
                    _el$24 = libs.createElement("Panel", {
                      "class": "AttributeRowHeader"
                    }, _el$23),
                    _el$25 = libs.createElement("Panel", {
                      "class": "AttributeRowStars"
                    }, _el$24),
                    _el$26 = libs.createElement("Label", {
                      "class": "AttributeRowTitle",
                      get text() {
                        return libs.memo(() => currentWeaponStar() >= rowData.star)() ? `${rowData.star}${GetLocalization("#ShowRoom_StarSuffix")}` : `${rowData.star}${GetLocalization("#ShowRoom_StarNoActivated")}`;
                      }
                    }, _el$24),
                    _el$27 = libs.createElement("Label", {
                      "class": "AttributeRowDesc",
                      html: true,
                      get text() {
                        return content();
                      }
                    }, _el$23);
                  libs.use(panel => {
                    attributeRowRefs[index()] = panel;
                  }, _el$23);
                  libs.insert(_el$25, libs.createComponent(libs.For, {
                    get each() {
                      return Array.from({
                        length: rowData.star
                      });
                    },
                    children: (_, starIndex) => (() => {
                      const _el$28 = libs.createElement("Panel", {
                        "class": "AttributeRowIcon"
                      }, null);
                      libs.effect(_$p => libs.setProp(_el$28, "classList", {
                        RowActivated: rowActivated(),
                        PartialActivated: !rowActivated() && starIndex() < currentWeaponStar()
                      }, _$p));
                      return _el$28;
                    })()
                  }));
                  libs.effect(_p$ => {
                    const _v$6 = {
                        Active: rowActivated()
                      },
                      _v$7 = libs.memo(() => currentWeaponStar() >= rowData.star)() ? `${rowData.star}${GetLocalization("#ShowRoom_StarSuffix")}` : `${rowData.star}${GetLocalization("#ShowRoom_StarNoActivated")}`,
                      _v$8 = content();
                    _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$23, "classList", _v$6, _p$._v$6));
                    _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$26, "text", _v$7, _p$._v$7));
                    _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$27, "text", _v$8, _p$._v$8));
                    return _p$;
                  }, {
                    _v$6: undefined,
                    _v$7: undefined,
                    _v$8: undefined
                  });
                  return _el$23;
                })();
              }
            }));
            libs.effect(_$p => libs.setProp(_el$21, "classList", {
              AccessVisible: showAccessSection(),
              UpgradeVisible: showUpgradeSection()
            }, _$p));
            return _el$21;
          })();
        }
      }), _el$11);
      libs.insert(_el$8, libs.createComponent(EOM_Button.EOM_BaseButton, {
        id: "AttributeBottomArrow",
        get visible() {
          return weaponEffectList().length > 0;
        },
        get enabled() {
          return attributeCanScrollDown();
        },
        onactivate: () => scrollAttributeList(1)
      }), _el$11);
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return showAccessSection();
        },
        get children() {
          return [libs.createComponent(EOM_SectionDivider.EOM_SectionDivider, {
            id: "AccessDivider",
            text: "#Blessing_Access"
          }), (() => {
            const _el$10 = libs.createElement("Label", {
              id: "AccessDesc",
              get text() {
                return GetLocalization(`#${previewWeaponID()}_Access`);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$10, "text", GetLocalization(`#${previewWeaponID()}_Access`), _$p));
            return _el$10;
          })()];
        }
      }), _el$11);
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return showUpgradeSection();
        },
        get children() {
          return [libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return previewWeaponID();
            },
            get rarity() {
              return previewWeaponData().rarity;
            },
            get amounts() {
              return previewWeaponServiceData().extra_star_exp;
            }
          }), libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
            id: "UpgradeCost",
            get have() {
              return previewWeaponServiceData().extra_star_exp;
            },
            cost: 1
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "UpgradeBtn",
            text: "#Collection_UpgradeBtn",
            color: "Confirm",
            get enabled() {
              return libs.memo(() => !!!requesting())() && canLevelUp();
            },
            onactivate: self => {
              if (requesting()) return;
              if (!canLevelUp()) return;
              SetRequesting(true);
              CallActionRequest("/v1/weapon/starup", {
                weapon_id: toFiniteNumber(previewWeaponID())
              }, () => {
                SetRequesting(false);
                ShowLevelupFx();
              });
            }
          })];
        }
      }), _el$11);
      libs.effect(_p$ => {
        const _v$ = weaponList().length > 5,
          _v$2 = `${currentPage()}/${totalPage()}`,
          _v$3 = "Rarity" + previewWeaponData().rarity,
          _v$4 = "#" + previewWeaponID(),
          _v$5 = weaponSkillDesc();
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$7, "visible", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "className", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "text", _v$5, _p$._v$5));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined,
        _v$4: undefined,
        _v$5: undefined
      });
      return _el$;
    }
  });
};

const MENU_LIST = {
  Hero_Menu: [],
  Weapon_Menu: [],
  Courier_Menu: []
};
const {
  LayoutMenu,
  show,
  menuName
} = EOM_MenuLayout.createMenuLayout("hero", () => MENU_LIST);
const emptyHeroRedPoints = () => ({});
const heroSoulRedPoints = () => CustomUIConfig.__heroRedPointState?.heroSoulRedPoints() ?? {};
const heroTalentRedPoints = () => CustomUIConfig.__heroRedPointState?.heroTalentRedPoints() ?? {};
const heroStoryRewardRedPoints = () => CustomUIConfig.__heroRedPointState?.heroStoryRewardRedPoints() ?? {};
const heroWeaponRedPoints = () => CustomUIConfig.__heroRedPointState?.heroWeaponRedPoints() ?? {};
const heroCourierRedPoints = () => CustomUIConfig.__heroRedPointState?.heroCourierRedPoints() ?? {};
const clearHeroTalentRedPoints = () => CustomUIConfig.__heroRedPointState?.clearHeroTalentRedPoints();
function HudHero() {
  return libs.createComponent(libs.Show, {
    get when() {
      return show();
    },
    get children() {
      return libs.createComponent(HeroPage, {});
    }
  });
}
function HeroPage() {
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "HeroRoot",
    name: "MenuButton_hero",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Hero_Menu";
            },
            get children() {
              return libs.createComponent(Hero, {
                talentRedPoints: heroTalentRedPoints ?? emptyHeroRedPoints,
                soulRedPoints: heroSoulRedPoints ?? emptyHeroRedPoints,
                storyRewardRedPoints: heroStoryRewardRedPoints ?? emptyHeroRedPoints,
                onTalentViewed: clearHeroTalentRedPoints
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Weapon_Menu";
            },
            get children() {
              return libs.createComponent(Weapon, {
                weaponRedPoints: heroWeaponRedPoints ?? emptyHeroRedPoints
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Courier_Menu";
            },
            get children() {
              return libs.createComponent(CourierDisplay, {
                courierRedPoints: heroCourierRedPoints ?? emptyHeroRedPoints
              });
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(HudHero, {}), $.GetContextPanel());