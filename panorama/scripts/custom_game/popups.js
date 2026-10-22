--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');
var solid_utils = require('./solid_utils.js');
var StoreItem = require('./StoreItem.js');
var hero_card = require('./hero_card.js');
var courier_card = require('./courier_card.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
var common_item = require('./common_item.js');
require('./EOM_MultiDropDown.js');
require('./equipment_utils.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var RecycleView = require('./RecycleView.js');
var global_selection = require('./global_selection.js');
var BackpackItem = require('./BackpackItem.js');
var EOM_NumberAdjust = require('./EOM_NumberAdjust.js');
var EOM_Loading = require('./EOM_Loading.js');
var EOMChildren = require('./EOMChildren.js');
var EOM_DropDown = require('./EOM_DropDown.js');
var EOM_SearchBox = require('./EOM_SearchBox.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var EOM_ProgressBar = require('./EOM_ProgressBar.js');
require('./EOM_TextEntry.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');

const BasePopup = props => {
  const merged = libs.mergeProps({
    size: "normal",
    closeOnClickOuter: true,
    closeOnEsc: true,
    closeGroup: true,
    hideClose: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "id", "title", "size", "closeOnClickOuter", "closeOnEsc", "closeGroup", "PopupID", "group", "hideClose"]);
  const onClickOuter = () => {
    if (local.closeOnClickOuter) {
      ClosePopup(local.PopupID);
    }
  };
  const onEsc = () => {
    if (local.closeOnEsc) {
      ClosePopup(local.PopupID);
    }
  };
  libs.onMount(() => {
    const id = GameEvents.Subscribe("client_side_event", eventData => {
      if ("close_popup_fadeout" == eventData.event_name) {
        let data = eventData.event_data;
        if (data.PopupID) {
          if (local.PopupID == data.PopupID) {
            setPopupShow(false);
            setPopupClose(true);
          }
        } else if (data.group) {
          if (local.group == data.group) {
            setPopupShow(false);
            setPopupClose(true);
          }
        }
      }
    });
    libs.onCleanup(() => GameEvents.Unsubscribe(id));
  });
  const [popupShow, setPopupShow] = libs.createSignal(false);
  const [popupClose, setPopupClose] = libs.createSignal(false);
  return (() => {
    const _el$ = libs.createElement("Button", libs.mergeProps$1({
      get id() {
        return local.PopupID;
      }
    }, others), null);
    libs.spread(_el$, libs.mergeProps$1({
      get id() {
        return local.PopupID;
      }
    }, others, {
      "className": "PopupContainer",
      "onactivate": self => onClickOuter(),
      "onload": self => {
        setPopupShow(true);
        self.SetFocus();
      },
      "oncancel": self => onEsc()
    }), true);
    libs.insert(_el$, libs.createComponent(EOM_Popup.EOM_Popup, {
      get id() {
        return local.id ?? "EOM_PopupMain";
      },
      popType: "PopupType_PopOut",
      get size() {
        return local.size;
      },
      get title() {
        return local.title;
      },
      get className() {
        return libs.classNames({
          EOM_PopupMainShow: popupShow(),
          EOM_PopupMainClose: popupClose()
        });
      },
      get hideClose() {
        return local.hideClose;
      },
      align: "center center",
      onClose: () => {
        ClosePopup(local.PopupID);
      },
      get children() {
        return libs.untrack(() => local.children);
      }
    }));
    return _el$;
  })();
};

const DEFAULT_AVATAR_BORDER_ID = "1710000";
const Popup_AvatarEdit = props => {
  const tabs = [{
    label: "#BORDER",
    type: COSMETIC_TYPE.BORDER
  }, {
    label: "#TITLE",
    type: COSMETIC_TYPE.TITLE
  }, {
    label: "#ShowRoom_AvatarEdit_Background",
    type: ""
  }];
  const sortTabs = [{
    label: "#ShowRoom_AvatarEdit_SortDefault",
    type: "default"
  }, {
    label: "#Equipment_Rarity",
    type: "rarity"
  }];
  const [selectedTab, setTab] = libs.createSignal(tabs[0].type);
  const [sortTab, setSortTab] = libs.createSignal(sortTabs[0].type);
  const [cosmeticID, setCosmeticID] = libs.createSignal("");
  const player_cosmetics = solid_utils.createServiceNetData("player_cosmetics", {});
  const player_cosmetic_equips = solid_utils.createServiceNetData("player_cosmetic_equips", {});
  const tabType = libs.createMemo(() => {
    return selectedTab();
  });
  const cosmeticList = libs.createMemo(() => {
    const type = tabType();
    if (type == "") return [];
    return Object.values(KeyValues.info_item_cosmetic).filter(item => {
      return item.type == type && (item.hide !== 1 || Game.IsInToolsMode());
    }).map((item, index) => ({
      item,
      index
    })).sort((a, b) => {
      const aUnlocked = isCosmeticUnlocked(a.item);
      const bUnlocked = isCosmeticUnlocked(b.item);
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
      if (sortTab() == "rarity") {
        const rarityDiff = (Number(b.item.rarity) || 0) - (Number(a.item.rarity) || 0);
        if (rarityDiff != 0) return rarityDiff;
      }
      return a.index - b.index;
    }).map(({
      item
    }) => item);
  });
  const equippedCosmeticID = libs.createMemo(() => {
    const type = tabType();
    if (type == "") return "";
    for (const equip of Object.values(player_cosmetic_equips())) {
      const cosmeticInfo = KeyValues.info_item_cosmetic[String(equip.cosmetic_id)];
      if (cosmeticInfo != undefined && cosmeticInfo.type == type) {
        return String(equip.cosmetic_id);
      }
    }
    return "";
  });
  const previewCosmeticID = libs.createMemo(() => {
    return cosmeticID() || equippedCosmeticID() || String(cosmeticList().find(item => String(item.id) == DEFAULT_AVATAR_BORDER_ID)?.id ?? cosmeticList().find(item => item.default == 1)?.id ?? cosmeticList()[0]?.id ?? "");
  });
  const previewCosmeticData = libs.createMemo(() => {
    return KeyValues.info_item_cosmetic[previewCosmeticID()];
  });
  libs.createEffect(() => {
    const list = cosmeticList();
    if (list.length == 0) {
      setCosmeticID("");
      return;
    }
    setCosmeticID(equippedCosmeticID() || String(list.find(item => String(item.id) == DEFAULT_AVATAR_BORDER_ID)?.id ?? list.find(item => item.default == 1)?.id ?? list[0].id));
  });
  return libs.createComponent(BasePopup, {
    id: "Popup_AvatarEdit",
    size: "large",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    title: "#ShowRoom_AvatarEdit_Title",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
          id: "TabBtns",
          flowChildren: "down"
        }, null);
        libs.setProp(_el$, "flowChildren", "down");
        libs.insert(_el$, libs.createComponent(libs.For, {
          each: tabs,
          children: tab => {
            return libs.createComponent(EOM_Button.EOM_BaseButton, {
              get ["class"]() {
                return libs.classNames({
                  Selected: selectedTab() == tab.type
                });
              },
              onactivate: () => {
                setTab(tab.type);
              },
              get children() {
                const _el$8 = libs.createElement("Label", {
                  get text() {
                    return tab.label;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$8, "text", tab.label, _$p));
                return _el$8;
              }
            });
          }
        }));
        return _el$;
      })(), (() => {
        const _el$2 = libs.createElement("Panel", {
          id: "AvatarPreview"
        }, null);
        libs.insert(_el$2, libs.createComponent(libs.Switch, {
          get children() {
            return [libs.createComponent(libs.Match, {
              get when() {
                return tabType() == COSMETIC_TYPE.BORDER;
              },
              get children() {
                return libs.createComponent(Player.AvatarBorder, {
                  "class": "Preview_AVATAR_BORDER",
                  get borderid() {
                    return previewCosmeticID() || DEFAULT_AVATAR_BORDER_ID;
                  },
                  get children() {
                    const _el$3 = libs.createElement("DOTAAvatarImage", {
                      steamid: "local",
                      nocompendiumborder: true,
                      hittest: false,
                      hittestchildren: false
                    }, null);
                    libs.setProp(_el$3, "style", {
                      width: "48.04688%",
                      height: "48.04688%",
                      align: "center center",
                      borderRadius: "10%"
                    });
                    return _el$3;
                  }
                });
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return tabType() == COSMETIC_TYPE.TITLE;
              },
              get children() {
                return libs.createComponent(Player.PlayerTitle, {
                  "class": "Preview_AVATAR_NAME",
                  get titleid() {
                    return previewCosmeticID();
                  }
                });
              }
            })];
          }
        }));
        return _el$2;
      })(), (() => {
        const _el$4 = libs.createElement("Label", {
          id: "PreviewName",
          get text() {
            return libs.memo(() => previewCosmeticData() != undefined)() ? "#" + previewCosmeticData().id : "";
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$4, "text", libs.memo(() => previewCosmeticData() != undefined)() ? "#" + previewCosmeticData().id : "", _$p));
        return _el$4;
      })(), libs.createElement("Panel", {
        "class": "Line"
      }, null), (() => {
        const _el$6 = libs.createElement("Panel", {
          id: "SortTabs"
        }, null);
        libs.insert(_el$6, libs.createComponent(libs.For, {
          each: sortTabs,
          children: tab => {
            return libs.createComponent(EOM_Button.EOM_BaseButton, {
              get ["class"]() {
                return libs.classNames({
                  Selected: sortTab() == tab.type
                });
              },
              onactivate: () => {
                setSortTab(tab.type);
              },
              get children() {
                const _el$9 = libs.createElement("Label", {
                  get text() {
                    return tab.label;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$9, "text", tab.label, _$p));
                return _el$9;
              }
            });
          }
        }));
        return _el$6;
      })(), (() => {
        const _el$7 = libs.createElement("Panel", {
          id: "GridList"
        }, null);
        libs.insert(_el$7, libs.createComponent(libs.For, {
          get each() {
            return cosmeticList();
          },
          children: item => {
            return libs.createComponent(AvatarEditItem, item);
          }
        }));
        return _el$7;
      })()];
    }
  });
  function isCosmeticUnlocked(item) {
    return player_cosmetics()[item.id] != undefined || item.default == 1;
  }
  function AvatarEditItem(props) {
    const unlock = libs.createMemo(() => {
      return isCosmeticUnlocked(props);
    });
    const equipped = libs.createMemo(() => {
      if (equippedCosmeticID() != "") {
        return equippedCosmeticID() == String(props.id);
      }
      return props.default == 1;
    });
    const icon = () => {
      return getSrcPath("store_items/" + props.id + ".png");
    };
    return libs.createComponent(EOM_Button.EOM_BaseButton, {
      get className() {
        return libs.classNames("CosmeticItem", "Rarity" + props.rarity, [tabType()], {
          Selected: cosmeticID() == props.id.toString()
        });
      },
      onactivate: p => {
        setCosmeticID(props.id.toString());
        if (!unlock()) return;
        if (equipped()) return;
        CallAction("/v1/cosmetic/equip", {
          slot_id: COSMETIC_SLOT[props.type],
          cosmetic_id: props.default == 1 ? 0 : Number(props.id)
        });
      },
      get children() {
        return [libs.createElement("Image", {
          id: "HoverBorder"
        }, null), (() => {
          const _el$1 = libs.createElement("Label", {
            id: "CosmeticItemName",
            get text() {
              return "#" + props.id;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$1, "text", "#" + props.id, _$p));
          return _el$1;
        })(), (() => {
          const _el$10 = libs.createElement("Image", {
            id: "CosmeticItemImage",
            get src() {
              return icon();
            },
            scaling: "stretch-to-cover-preserve-aspect"
          }, null);
          libs.effect(_$p => libs.setProp(_el$10, "src", icon(), _$p));
          return _el$10;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return equipped();
          },
          get children() {
            return libs.createElement("Image", {
              id: "EquippedIcon"
            }, null);
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return !unlock();
          },
          get children() {
            return libs.createElement("Image", {
              id: "CosmeticLock"
            }, null);
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return props.hide == 1;
          },
          get children() {
            return libs.createElement("Label", {
              id: "ToolOnly",
              text: "#ShowRoom_AvatarEdit_ToolOnly"
            }, null);
          }
        })];
      }
    });
  }
};

const BOUNTY_RARITY_TOKENS = ["#TaskBoard_Rarity_C", "#TaskBoard_Rarity_B", "#TaskBoard_Rarity_A", "#TaskBoard_Rarity_S", "#TaskBoard_Rarity_SS"];
function Popup_BountyDonate(props) {
  let confirmed = false;
  libs.onCleanup(() => {
    if (confirmed) props.onconfirm?.();
  });
  return libs.createComponent(BasePopup, {
    "class": "Popup_BountyDonate",
    get title() {
      return GetLocalization("#TaskBoard_DonateTitle");
    },
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "DonateContent",
            flowChildren: "right"
          }, _el$),
          _el$3 = libs.createElement("Panel", {
            get ["class"]() {
              return `BountyDonateRewardCard Rarity${GetServiceItemRarity(props.itemID)}`;
            }
          }, _el$2),
          _el$4 = libs.createElement("Label", {
            id: "ItemName",
            get text() {
              return GetLocalization("#" + props.itemID);
            }
          }, _el$3);
          libs.createElement("Image", {
            id: "SplitLine"
          }, _el$3);
          const _el$6 = libs.createElement("Panel", {
            "class": "DonateDesc",
            flowChildren: "down"
          }, _el$2),
          _el$7 = libs.createElement("Panel", {
            "class": "Title"
          }, _el$6);
          libs.createElement("Panel", {
            "class": "TitleLine"
          }, _el$7);
          const _el$9 = libs.createElement("Label", {
            get ["class"]() {
              return `Rarity${props.rarity}`;
            },
            get text() {
              return LocalizeWithVars("#TaskBoard_BountyRarityTitle", {
                rarity: GetLocalization(BOUNTY_RARITY_TOKENS[Math.max(0, Math.min(4, props.rarity - 1))])
              });
            }
          }, _el$7);
          libs.createElement("Panel", {
            id: "TitleLine2",
            "class": "TitleLine"
          }, _el$7);
          const _el$1 = libs.createElement("Panel", {
            "class": "DonateInfo",
            flowChildren: "down"
          }, _el$6),
          _el$10 = libs.createElement("Panel", {
            "class": "DonateInfoRow",
            flowChildren: "right"
          }, _el$1),
          _el$11 = libs.createElement("Label", {
            "class": "InfoName",
            get text() {
              return GetLocalization("#TaskBoard_DonateRequirement");
            }
          }, _el$10),
          _el$12 = libs.createElement("Label", {
            "class": "InfoValue",
            get text() {
              return LocalizeWithVars("#TaskBoard_DonateValue", {
                value: FormatNumber(props.amount)
              });
            }
          }, _el$10),
          _el$13 = libs.createElement("Panel", {
            "class": "DonateInfoRow",
            flowChildren: "right"
          }, _el$1),
          _el$14 = libs.createElement("Label", {
            "class": "InfoName",
            get text() {
              return GetLocalization("#TaskBoard_DonateOwned");
            }
          }, _el$13),
          _el$15 = libs.createElement("Label", {
            "class": "InfoValue Owned",
            get text() {
              return LocalizeWithVars("#TaskBoard_DonateValue", {
                value: FormatNumber(props.ownedAmount)
              });
            }
          }, _el$13),
          _el$16 = libs.createElement("Panel", {
            "class": "FixedDonateAmount",
            flowChildren: "down"
          }, _el$6),
          _el$17 = libs.createElement("Label", {
            "class": "FixedAmountTitle",
            get text() {
              return GetLocalization("#TaskBoard_DonateAmount");
            }
          }, _el$16),
          _el$18 = libs.createElement("Label", {
            "class": "FixedAmountValue",
            get text() {
              return LocalizeWithVars("#TaskBoard_DonateValue", {
                value: FormatNumber(props.amount)
              });
            }
          }, _el$16);
        libs.setProp(_el$2, "flowChildren", "right");
        libs.insert(_el$3, libs.createComponent(StoreItem.StoreItemImage, {
          get itemid() {
            return props.itemID;
          }
        }), null);
        libs.setProp(_el$6, "flowChildren", "down");
        libs.setProp(_el$1, "flowChildren", "down");
        libs.setProp(_el$10, "flowChildren", "right");
        libs.setProp(_el$13, "flowChildren", "right");
        libs.setProp(_el$16, "flowChildren", "down");
        libs.effect(_p$ => {
          const _v$ = `BountyDonateRewardCard Rarity${GetServiceItemRarity(props.itemID)}`,
            _v$2 = GetLocalization("#" + props.itemID),
            _v$3 = `Rarity${props.rarity}`,
            _v$4 = LocalizeWithVars("#TaskBoard_BountyRarityTitle", {
              rarity: GetLocalization(BOUNTY_RARITY_TOKENS[Math.max(0, Math.min(4, props.rarity - 1))])
            }),
            _v$5 = GetLocalization("#TaskBoard_DonateRequirement"),
            _v$6 = LocalizeWithVars("#TaskBoard_DonateValue", {
              value: FormatNumber(props.amount)
            }),
            _v$7 = GetLocalization("#TaskBoard_DonateOwned"),
            _v$8 = LocalizeWithVars("#TaskBoard_DonateValue", {
              value: FormatNumber(props.ownedAmount)
            }),
            _v$9 = GetLocalization("#TaskBoard_DonateAmount"),
            _v$0 = LocalizeWithVars("#TaskBoard_DonateValue", {
              value: FormatNumber(props.amount)
            });
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "class", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "class", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "text", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$14, "text", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$15, "text", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$17, "text", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$18, "text", _v$0, _p$._v$0));
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
          _v$0: undefined
        });
        return _el$;
      })(), (() => {
        const _el$19 = libs.createElement("Panel", {
          id: "BottomButtons",
          hittest: false
        }, null);
        libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_Button, {
          id: "Cancel",
          color: "Cancel",
          get text() {
            return GetLocalization("#Popup_Button_Cancel");
          },
          onactivate: () => ClosePopup(props.PopupID)
        }), null);
        libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          get text() {
            return GetLocalization("#TaskBoard_ConfirmDonate");
          },
          onactivate: () => {
            confirmed = true;
            ClosePopup(props.PopupID);
          }
        }), null);
        return _el$19;
      })()];
    }
  });
}

const WeaponCard = props => {
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(() => libs.mergeProps(props, {
    class: libs.classNames("WeaponCard", {
      Selected: props.selected == true
    }, props.class)
  }), {
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        "class": "BorderParticle",
        particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
        cameraOrigin: "0 0 90",
        fov: 45,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), libs.createElement("Panel", {
        id: "WeaponCardBG"
      }, null), libs.createComponent(StoreItem.StoreItemImage, {
        get itemid() {
          return props.weapon_id;
        }
      }), libs.createElement("Panel", {
        id: "WeaponCardBorder",
        hittest: false
      }, null)];
    }
  }));
};

const Popup_ChooseDrawLucky = props => {
  const pondConfig = KeyValues.drawcards_pond[props.pool_id];
  const player_card_lucky_choice = solid_utils.createServiceNetData("player_card_lucky_choice", {});
  const [tempChosen, setTempChosen] = libs.createSignal();
  libs.onMount(() => {
    const luckyChoice = player_card_lucky_choice()[props.pool_id]?.lucky_choice;
    if (luckyChoice) {
      setTempChosen(luckyChoice);
    }
  });
  libs.createSignal("all");
  const [bRequesting, SetRequesting] = libs.createSignal(false);
  return libs.createComponent(BasePopup, {
    id: "Popup_ChooseDrawLucky",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    title: "#Draw_Wish_Title",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock"
          }, null),
          _el$2 = libs.createElement("Label", {
            id: "ChosenTip",
            get text() {
              return `#Draw_Wish_${props.pool_type}`;
            }
          }, _el$),
          _el$3 = libs.createElement("Panel", {
            id: "CardList",
            scroll: "x"
          }, _el$),
          _el$4 = libs.createElement("Label", {
            id: "SelectTip",
            get text() {
              return `#Wish_Select_${props.pool_type}_Tips`;
            }
          }, _el$);
        libs.setProp(_el$3, "scroll", "x");
        libs.insert(_el$3, libs.createComponent(libs.Switch, {
          get children() {
            return [libs.createComponent(libs.Match, {
              get when() {
                return props.pool_type == "hero";
              },
              get children() {
                return libs.createComponent(libs.For, {
                  get each() {
                    return pondConfig.filter(v => v.drop_rarity == 5);
                  },
                  children: itemData => {
                    let itemID = itemData.drop_id;
                    let search = GetHeroInfoByGoodID(itemID);
                    if (search == undefined) return;
                    let {
                      heroName,
                      heroID
                    } = search;
                    return (() => {
                      const _el$5 = libs.createElement("Panel", {}, null);
                      libs.insert(_el$5, libs.createComponent(hero_card.HeroCard, {
                        heroName: heroName,
                        get selected() {
                          return tempChosen() == itemID;
                        },
                        customTooltip: {
                          name: "hero_info",
                          hero_id: heroID
                        },
                        onactivate: () => {
                          setTempChosen(Number(itemID));
                        }
                      }));
                      return _el$5;
                    })();
                  }
                });
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return props.pool_type == "courier";
              },
              get children() {
                return libs.createComponent(libs.For, {
                  get each() {
                    return pondConfig.filter(v => v.drop_rarity == 5);
                  },
                  children: itemData => {
                    let courierID = itemData.drop_id;
                    return (() => {
                      const _el$6 = libs.createElement("Panel", {}, null);
                      libs.insert(_el$6, libs.createComponent(courier_card.CourierCard, {
                        courier_id: courierID,
                        get quality() {
                          return KeyValues.service_courier[courierID].quality;
                        },
                        star: 1,
                        hideTips: true,
                        customTooltip: {
                          name: "courier_info",
                          courier_id: courierID
                        },
                        get selected() {
                          return tempChosen() == courierID;
                        },
                        onactivate: () => {
                          setTempChosen(Number(courierID));
                        }
                      }));
                      return _el$6;
                    })();
                  }
                });
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return props.pool_type == "weapon";
              },
              get children() {
                return libs.createComponent(libs.For, {
                  get each() {
                    return pondConfig.filter(v => v.drop_rarity == 5);
                  },
                  children: itemData => {
                    let weaponID = itemData.drop_id;
                    return (() => {
                      const _el$7 = libs.createElement("Panel", {}, null);
                      libs.insert(_el$7, libs.createComponent(WeaponCard, {
                        weapon_id: weaponID,
                        get selected() {
                          return tempChosen() == weaponID;
                        },
                        onactivate: () => {
                          setTempChosen(Number(weaponID));
                        }
                      }));
                      return _el$7;
                    })();
                  }
                });
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return props.pool_type == "treasure";
              },
              get children() {
                return libs.createComponent(libs.For, {
                  get each() {
                    return pondConfig.filter(v => v.drop_rarity == 5);
                  },
                  children: itemData => {
                    let treasureID = itemData.drop_id;
                    return (() => {
                      const _el$8 = libs.createElement("Panel", {}, null);
                      libs.insert(_el$8, libs.createComponent(StoreItem.StoreItemCard, {
                        item_id: treasureID,
                        hideTips: true,
                        get customTooltip() {
                          return {
                            name: "treasure_info",
                            treasure_id: String(treasureID)
                          };
                        },
                        get selected() {
                          return tempChosen() == treasureID;
                        },
                        showName: false,
                        onactivate: () => {
                          setTempChosen(Number(treasureID));
                        }
                      }));
                      return _el$8;
                    })();
                  }
                });
              }
            })];
          }
        }));
        libs.effect(_p$ => {
          const _v$ = `#Draw_Wish_${props.pool_type}`,
            _v$2 = `#Wish_Select_${props.pool_type}_Tips`;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$;
      })(), libs.createComponent(EOM_Button.EOM_Button, {
        color: "Confirm",
        horizontalAlign: "center",
        marginTop: "39px",
        text: "#Popup_Button_Confirm",
        onactivate: () => {
          let temp = tempChosen();
          if (temp == undefined) return;
          if (bRequesting()) return;
          SetRequesting(true);
          ServerRequest("change_lucky_choice", {
            pool_id: Number(props.pool_id),
            lucky_choice: temp
          }, () => {
            SetRequesting(false);
            ClosePopup(props.PopupID);
          });
        }
      })];
    }
  });
};

const RECORDS_PER_PAGE$1 = 5;
function getPlayerUID(playerID) {
  const steamID = Game.GetPlayerInfo(playerID)?.player_steamid;
  if (steamID == undefined || !/^\d+$/.test(steamID)) {
    return undefined;
  }
  return Number(Steam_64_3(steamID));
}
const parseItemNames = str => {
  if (!str || str.startsWith("[")) return [];
  return str.split(",").map(pair => {
    const parts = pair.split(":");
    return {
      name: parts[0],
      rarity: Number(parts[1]) || 0
    };
  }).filter(item => item.name).sort((a, b) => b.rarity - a.rarity).map(item => item.name);
};
const formatTime$1 = timestamp => {
  if (!timestamp) return "";
  const d = new Date(timestamp * 1000);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
};
const formatDamage = val => {
  if (val == undefined) return "0";
  const num = Number(val);
  if (isNaN(num) || num === 0) return "0";
  return FormatNumber(num, 2);
};
const Popup_CombatLog = props => {
  const [currentPage, setCurrentPage] = libs.createSignal(1);
  const targetPlayerID = props.playerID ?? Players.GetLocalPlayer();
  const serviceMatchRecords = solid_utils.createServiceNetData("player_common_match_records", [], targetPlayerID);
  const [requestedMatchRecords, setRequestedMatchRecords] = libs.createSignal();
  const matchRecords = libs.createMemo(() => requestedMatchRecords() ?? serviceMatchRecords());
  libs.createEffect(() => {
    const targetUID = getPlayerUID(targetPlayerID);
    if (targetUID == undefined) return;
    CallActionRequest("/v1/brief/match_records", {
      target_uid: targetUID,
      limit: 10
    }, result => {
      const records = result.data?.player_common_match_records;
      if (Array.isArray(records)) {
        setRequestedMatchRecords(records);
        setCurrentPage(1);
      }
    }, undefined, false);
  });
  const totalPages = libs.createMemo(() => {
    const records = matchRecords();
    const len = Array.isArray(records) ? records.length : 0;
    return Math.max(1, Math.ceil(len / RECORDS_PER_PAGE$1));
  });
  const pageRecords = libs.createMemo(() => {
    const records = matchRecords();
    if (!Array.isArray(records)) return [];
    const start = (currentPage() - 1) * RECORDS_PER_PAGE$1;
    return records.slice(start, start + RECORDS_PER_PAGE$1);
  });
  const goToPage = page => {
    const total = totalPages();
    if (page < 1) page = 1;
    if (page > total) page = total;
    setCurrentPage(page);
  };
  return libs.createComponent(BasePopup, {
    id: "Popup_CombatLog",
    size: "large",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    title: "#PlayerInfo_CombatLog",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CombatLogContent"
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "RecordHeader"
          }, _el$);
          libs.createElement("Label", {
            "class": "Col ColTime",
            text: "#CombatLog_Time"
          }, _el$2);
          libs.createElement("Label", {
            "class": "Col ColResult",
            text: "#CombatLog_Result"
          }, _el$2);
          libs.createElement("Label", {
            "class": "Col ColHero",
            text: "#CombatLog_Hero"
          }, _el$2);
          libs.createElement("Label", {
            "class": "Col ColDiff",
            text: "#PlayerInfo_Difficulty"
          }, _el$2);
          libs.createElement("Label", {
            "class": "Col ColDamage",
            text: "#CombatLog_Damage"
          }, _el$2);
          libs.createElement("Label", {
            "class": "Col ColBless",
            text: "#PlayerInfo_Blessing"
          }, _el$2);
          libs.createElement("Label", {
            "class": "Col ColArtifact",
            text: "#PlayerInfo_Artifact"
          }, _el$2);
          libs.createElement("Panel", {
            "class": "Line"
          }, _el$);
          const _el$1 = libs.createElement("Panel", {
            id: "RecordList"
          }, _el$);
        libs.insert(_el$1, libs.createComponent(libs.For, {
          get each() {
            return pageRecords();
          },
          children: record => {
            const blessItems = parseItemNames(record.bless);
            const artifactItems = parseItemNames(record.artifact);
            return (() => {
              const _el$12 = libs.createElement("Panel", {
                  "class": "RecordRow"
                }, null),
                _el$13 = libs.createElement("Label", {
                  "class": "Col ColTime",
                  get text() {
                    return formatTime$1(record.start_time);
                  }
                }, _el$12),
                _el$14 = libs.createElement("Label", {
                  get ["class"]() {
                    return libs.classNames("Col ColResult", record.pass ? "Win" : "Lose");
                  },
                  get text() {
                    return record.pass ? "#CombatLog_Win" : "#CombatLog_Lose";
                  }
                }, _el$12),
                _el$15 = libs.createElement("Panel", {
                  "class": "Col ColHero"
                }, _el$12),
                _el$16 = libs.createElement("Label", {
                  "class": "Col ColDiff",
                  get text() {
                    return `${GetLocalization("#CombatLog_DiffPrefix")}${record.diff}`;
                  }
                }, _el$12),
                _el$17 = libs.createElement("Label", {
                  "class": "Col ColDamage",
                  get text() {
                    return formatDamage(record.total_damage);
                  }
                }, _el$12),
                _el$18 = libs.createElement("Panel", {
                  "class": "Col ColBless ItemCol"
                }, _el$12),
                _el$19 = libs.createElement("Panel", {
                  "class": "Scroll",
                  flowChildren: "right",
                  scroll: "x"
                }, _el$18),
                _el$20 = libs.createElement("Panel", {
                  "class": "Col ColArtifact ItemCol"
                }, _el$12),
                _el$21 = libs.createElement("Panel", {
                  "class": "Scroll",
                  flowChildren: "right",
                  scroll: "x"
                }, _el$20);
              libs.insert(_el$15, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
                get heroname() {
                  return GetHeroNameByHeroID(record.hero_id) ?? "";
                },
                heroimagestyle: "icon"
              }));
              libs.setProp(_el$19, "flowChildren", "right");
              libs.setProp(_el$19, "scroll", "x");
              libs.insert(_el$19, libs.createComponent(libs.For, {
                each: blessItems,
                children: name => libs.createComponent(common_item.CommonItem, {
                  itemName: name,
                  showTips: true
                })
              }));
              libs.setProp(_el$21, "flowChildren", "right");
              libs.setProp(_el$21, "scroll", "x");
              libs.insert(_el$21, libs.createComponent(libs.For, {
                each: artifactItems,
                children: name => libs.createComponent(common_item.CommonItem, {
                  itemName: name,
                  showTips: true
                })
              }));
              libs.effect(_p$ => {
                const _v$ = formatTime$1(record.start_time),
                  _v$2 = libs.classNames("Col ColResult", record.pass ? "Win" : "Lose"),
                  _v$3 = record.pass ? "#CombatLog_Win" : "#CombatLog_Lose",
                  _v$4 = `${GetLocalization("#CombatLog_DiffPrefix")}${record.diff}`,
                  _v$5 = formatDamage(record.total_damage);
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$13, "text", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$14, "class", _v$2, _p$._v$2));
                _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$14, "text", _v$3, _p$._v$3));
                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$16, "text", _v$4, _p$._v$4));
                _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$17, "text", _v$5, _p$._v$5));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined,
                _v$3: undefined,
                _v$4: undefined,
                _v$5: undefined
              });
              return _el$12;
            })();
          }
        }));
        return _el$;
      })(), (() => {
        const _el$10 = libs.createElement("Panel", {
            id: "Pagination"
          }, null),
          _el$11 = libs.createElement("Label", {
            "class": "PageText",
            get text() {
              return `${currentPage()}/${totalPages()}`;
            }
          }, _el$10);
        libs.insert(_el$10, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "PageBtn PrevBtn",
          get enabled() {
            return currentPage() > 1;
          },
          onactivate: () => goToPage(currentPage() - 1)
        }), _el$11);
        libs.insert(_el$10, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "PageBtn NextBtn",
          get enabled() {
            return currentPage() < totalPages();
          },
          onactivate: () => goToPage(currentPage() + 1)
        }), null);
        libs.effect(_$p => libs.setProp(_el$11, "text", `${currentPage()}/${totalPages()}`, _$p));
        return _el$10;
      })()];
    }
  });
};

function Popup_CommonConfirm(props) {
  const merged = libs.mergeProps({
    showCancel: true,
    size: "small"
  }, props);
  const items = libs.createMemo(() => props.items ?? []);
  let bConfirm = false;
  libs.onCleanup(() => {
    if (bConfirm && props.onconfirm) {
      props.onconfirm();
    }
    if (props.onresult) {
      props.onresult(bConfirm);
    }
  });
  return libs.createComponent(BasePopup, {
    "class": "Popup_CommonConfirm",
    get PopupID() {
      return props.PopupID;
    },
    get size() {
      return merged.size;
    },
    get group() {
      return props.group;
    },
    get title() {
      return props.title;
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$2 = libs.createElement("Panel", {
            "class": "ConfirmContent",
            align: "center center",
            flowChildren: "down"
          }, _el$),
          _el$3 = libs.createElement("Label", {
            id: "Text",
            get text() {
              return props.text;
            },
            html: true,
            get vars() {
              return props.vars;
            }
          }, _el$2);
        libs.setProp(_el$2, "align", "center center");
        libs.setProp(_el$2, "flowChildren", "down");
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return items().length > 0;
          },
          get children() {
            const _el$4 = libs.createElement("Panel", {
              id: "ItemList",
              get scroll() {
                return props.scrollItems ? "y" : undefined;
              }
            }, null);
            libs.insert(_el$4, libs.createComponent(libs.For, {
              get each() {
                return items();
              },
              children: item => {
                return libs.createComponent(StoreItem.StoreItemBlock, {
                  get item_id() {
                    return item.item_id;
                  },
                  get uid() {
                    return item.uid;
                  },
                  get amounts() {
                    return item.amounts;
                  },
                  get rarity() {
                    return item.item_rarity ?? item.rarity;
                  }
                });
              }
            }));
            libs.effect(_p$ => {
              const _v$ = {
                  VerticalScrollStyle: props.scrollItems === true
                },
                _v$2 = props.scrollItems ? "y" : undefined;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "classList", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "scroll", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$4;
          }
        }), null);
        libs.effect(_p$ => {
          const _v$3 = {
              HideConfirm: props.hideconfirm == true
            },
            _v$4 = {
              Scrollable: props.scrollItems === true
            },
            _v$5 = props.text,
            _v$6 = props.vars,
            _v$7 = props.text != "";
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$, "classList", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$2, "classList", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$3, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$3, "vars", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$3, "visible", _v$7, _p$._v$7));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined,
          _v$6: undefined,
          _v$7: undefined
        });
        return _el$;
      })(), (() => {
        const _el$5 = libs.createElement("Panel", {
          id: "BottomButtons",
          hittest: false
        }, null);
        libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_Button, {
          id: "Cancel",
          color: "Cancel",
          get visible() {
            return merged.showCancel;
          },
          get text() {
            return props.cancel_text ?? "#Popup_Button_Cancel";
          },
          onactivate: () => {
            ClosePopup(props.PopupID);
          }
        }), null);
        libs.insert(_el$5, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          get visible() {
            return !props.hideconfirm;
          },
          get text() {
            return props.confirm_text ?? "#Popup_Button_Confirm";
          },
          onactivate: () => {
            bConfirm = true;
            ClosePopup(props.PopupID);
          }
        }), null);
        return _el$5;
      })()];
    }
  });
}

const CHINESE_SOURCE_OPTIONS = [{
  id: "zh_arcade_home",
  localization: "#Community_Survey_Source_ZH_01"
}, {
  id: "zh_friend",
  localization: "#Community_Survey_Source_ZH_02"
}, {
  id: "zh_eom_group",
  localization: "#Community_Survey_Source_ZH_03"
}, {
  id: "zh_custom_hero_chaos",
  localization: "#Community_Survey_Source_ZH_04"
}, {
  id: "zh_auto_gladiators",
  localization: "#Community_Survey_Source_ZH_05"
}, {
  id: "zh_daoke_alin",
  localization: "#Community_Survey_Source_ZH_06"
}, {
  id: "zh_aoki",
  localization: "#Community_Survey_Source_ZH_07"
}, {
  id: "zh_nannan",
  localization: "#Community_Survey_Source_ZH_08"
}, {
  id: "zh_shanhaijing_online",
  localization: "#Community_Survey_Source_ZH_09"
}, {
  id: "zh_chixiaochao",
  localization: "#Community_Survey_Source_ZH_10"
}, {
  id: "zh_feizhai_kuailelang",
  localization: "#Community_Survey_Source_ZH_18"
}, {
  id: "zh_bino",
  localization: "#Community_Survey_Source_ZH_11"
}, {
  id: "zh_douyin_ximen",
  localization: "#Community_Survey_Source_ZH_12"
}, {
  id: "zh_pencil_hb",
  localization: "#Community_Survey_Source_ZH_13"
}, {
  id: "zh_sad_sweet_potato",
  localization: "#Community_Survey_Source_ZH_14"
}, {
  id: "zh_dota_romance",
  localization: "#Community_Survey_Source_ZH_15"
}, {
  id: "zh_dota2_chuangge",
  localization: "#Community_Survey_Source_ZH_16"
}, {
  id: "zh_dota_daily_rhythm",
  localization: "#Community_Survey_Source_ZH_17"
}, {
  id: "zh_murong_ruolan",
  localization: "#Community_Survey_Source_ZH_19"
}, {
  id: "zh_liu_dadu_dota2",
  localization: "#Community_Survey_Source_ZH_20"
}, {
  id: "zh_xinsheng_dota2",
  localization: "#Community_Survey_Source_ZH_21"
}];
const INTERNATIONAL_SOURCE_OPTIONS = [{
  id: "arcade_browse",
  text: {
    en: "Browsing the Dota 2 Arcade",
    ru: "Листал аркаду в Dota 2"
  }
}, {
  id: "eom_discord",
  text: {
    en: "Found through another EOM Discord server",
    ru: "Из другого Discord-сервера EOM"
  }
}, {
  id: "friend_or_spectator",
  text: {
    en: "A friend told me / saw someone playing",
    ru: "Друг посоветовал / увидел, как играют"
  }
}, {
  id: "stream_or_video",
  text: {
    en: "Watched a streamer or video about it",
    ru: "Смотрел стрим или видео"
  }
}, {
  id: "random",
  text: {
    en: "Just found it randomly",
    ru: "Случайно наткнулся"
  }
}, {
  id: "custom_hero_chaos",
  text: {
    en: "Via the Custom Hero Chaos collab event",
    ru: "Коллаб с Custom Hero Chaos"
  }
}, {
  id: "auto_gladiators",
  text: {
    en: "Via the Auto Gladiators collab event",
    ru: "Коллаб с Auto Gladiators"
  }
}];
const RECOMMEND_OPTIONS = [{
  id: "yes",
  localization: "#Community_Survey_Recommend_Yes"
}, {
  id: "no",
  localization: "#Community_Survey_Recommend_No"
}];
function GetCommunitySurveyLanguage() {
  const language = Language();
  if (language == "english") return "en";
  if (language == "russian") return "ru";
  return "zh";
}
function GetCommunitySurveyOptionText(option, language) {
  const text = option.text?.[language];
  if (text != undefined) return text;
  return option.localization == undefined ? "" : GetLocalization(option.localization);
}
function Popup_CommunitySurvey(props) {
  const language = GetCommunitySurveyLanguage();
  const sourceOptions = language == "zh" ? CHINESE_SOURCE_OPTIONS : INTERNATIONAL_SOURCE_OPTIONS;
  const [selectedSourceID, setSelectedSourceID] = libs.createSignal();
  const [selectedRecommend, setSelectedRecommend] = libs.createSignal();
  const [submitAttempted, setSubmitAttempted] = libs.createSignal(false);
  const [submitting, setSubmitting] = libs.createSignal(false);
  const canSubmit = libs.createMemo(() => selectedSourceID() != undefined && selectedRecommend() != undefined);
  const sourceColumns = libs.createMemo(() => {
    const splitIndex = Math.ceil(sourceOptions.length / 2);
    return [sourceOptions.slice(0, splitIndex), sourceOptions.slice(splitIndex)];
  });
  let requestSent = false;
  const getAnswers = () => {
    const sourceID = selectedSourceID();
    const recommend = selectedRecommend();
    if (sourceID == undefined || recommend == undefined) return;
    const sourceOption = sourceOptions.find(option => option.id == sourceID);
    const recommendOption = RECOMMEND_OPTIONS.find(option => option.id == "yes" == recommend);
    if (sourceOption == undefined || recommendOption == undefined) return;
    return [{
      id: 1,
      answer: GetCommunitySurveyOptionText(sourceOption, language)
    }, {
      id: 2,
      answer: GetCommunitySurveyOptionText(recommendOption, language)
    }];
  };
  const submit = () => {
    setSubmitAttempted(true);
    const answers = getAnswers();
    if (answers == undefined || submitting()) return;
    setSubmitting(true);
    requestSent = true;
    CallActionRequest("/v1/player/submit_questionnaire", {
      answers
    }, result => {
      setSubmitting(false);
      if (result.code == 0 || result.code == 200) {
        ClosePopup(props.PopupID);
        return;
      }
      requestSent = false;
      ErrorMessage(result.message ?? GetLocalization("#Community_Survey_SubmitFailed"));
    }, () => {
      setSubmitting(false);
      requestSent = false;
      ErrorMessage(GetLocalization("#Community_Survey_SubmitFailed"));
    });
  };
  libs.onCleanup(() => {
    const answers = getAnswers();
    if (requestSent) return;
    requestSent = true;
    CallActionRequest("/v1/player/submit_questionnaire", answers == undefined ? {} : {
      answers
    }, () => {});
  });
  return libs.createComponent(BasePopup, {
    id: "Popup_CommunitySurvey",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    closeOnClickOuter: false,
    size: "large",
    get title() {
      return GetLocalization("#Community_Survey_Title");
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "SurveyShell"
        }, null);
        libs.createElement("Panel", {
          "class": "SurveyBackdrop",
          hittest: false
        }, _el$);
        const _el$3 = libs.createElement("Image", {
          "class": "SurveyHero Left",
          hittest: false,
          scaling: "stretch-to-fit-preserve-aspect",
          get src() {
            return getImagePath("activity/f2_football/f5_hero_03.png");
          }
        }, _el$),
        _el$4 = libs.createElement("Image", {
          "class": "SurveyHero Right",
          hittest: false,
          scaling: "stretch-to-fit-preserve-aspect",
          get src() {
            return getImagePath("activity/f2_football/f5_hero_04.png");
          }
        }, _el$),
        _el$5 = libs.createElement("Panel", {
          id: "SurveyBody"
        }, _el$),
        _el$6 = libs.createElement("Panel", {
          id: "SurveyIntro"
        }, _el$5),
        _el$7 = libs.createElement("Label", {
          "class": "SurveyIntroText",
          get text() {
            return GetLocalization("#Community_Survey_Intro");
          }
        }, _el$6);
        libs.createElement("Panel", {
          "class": "SurveyIntroLine"
        }, _el$6);
        const _el$9 = libs.createElement("Panel", {
          id: "SurveyQuestions"
        }, _el$5),
        _el$0 = libs.createElement("Panel", {
          "class": "SurveyQuestion SourceQuestion"
        }, _el$9),
        _el$1 = libs.createElement("Label", {
          "class": "SurveyQuestionTitle",
          get text() {
            return GetLocalization("#Community_Survey_Question_1");
          }
        }, _el$0),
        _el$10 = libs.createElement("Panel", {
          "class": "SurveySourceColumns"
        }, _el$0),
        _el$11 = libs.createElement("Panel", {
          id: "SurveySideColumn"
        }, _el$9),
        _el$12 = libs.createElement("Panel", {
          "class": "SurveyQuestion RecommendQuestion"
        }, _el$11),
        _el$13 = libs.createElement("Label", {
          "class": "SurveyQuestionTitle",
          get text() {
            return GetLocalization("#Community_Survey_Question_2");
          }
        }, _el$12),
        _el$14 = libs.createElement("Panel", {
          "class": "SurveyRecommendOptions"
        }, _el$12),
        _el$15 = libs.createElement("Panel", {
          id: "SurveyReward"
        }, _el$11),
        _el$16 = libs.createElement("Label", {
          "class": "SurveyRewardTitle",
          get text() {
            return GetLocalization("#Community_Survey_Reward_Title");
          }
        }, _el$15),
        _el$17 = libs.createElement("Label", {
          "class": "SurveyRewardName",
          get text() {
            return GetLocalization("#Community_Survey_Reward_Name");
          }
        }, _el$15),
        _el$18 = libs.createElement("Panel", {
          id: "SurveyFooter"
        }, _el$5),
        _el$19 = libs.createElement("Label", {
          "class": "SurveyValidation",
          get text() {
            return GetLocalization("#Community_Survey_Validation");
          }
        }, _el$18);
      libs.setProp(_el$, "classList", {
        International: language != "zh"
      });
      libs.insert(_el$10, libs.createComponent(libs.For, {
        get each() {
          return sourceColumns();
        },
        children: column => (() => {
          const _el$20 = libs.createElement("Panel", {
            "class": "SurveyOptionColumn VerticalScrollStyle",
            scroll: "y"
          }, null);
          libs.setProp(_el$20, "scroll", "y");
          libs.insert(_el$20, libs.createComponent(libs.For, {
            each: column,
            children: option => libs.createComponent(EOM_Button.EOM_BaseButton, {
              "class": "SurveyOption",
              get classList() {
                return {
                  Selected: selectedSourceID() == option.id
                };
              },
              onactivate: () => setSelectedSourceID(option.id),
              get children() {
                return [(() => {
                  const _el$21 = libs.createElement("Panel", {
                      "class": "SurveyRadioBox"
                    }, null);
                    libs.createElement("Panel", {
                      "class": "SurveyRadioDot"
                    }, _el$21);
                  return _el$21;
                })(), (() => {
                  const _el$23 = libs.createElement("Label", {
                    get text() {
                      return GetCommunitySurveyOptionText(option, language);
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$23, "text", GetCommunitySurveyOptionText(option, language), _$p));
                  return _el$23;
                })()];
              }
            })
          }));
          return _el$20;
        })()
      }));
      libs.insert(_el$14, libs.createComponent(libs.For, {
        each: RECOMMEND_OPTIONS,
        children: option => {
          const value = option.id == "yes";
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            "class": "SurveyOption",
            get classList() {
              return {
                Selected: selectedRecommend() == value
              };
            },
            onactivate: () => setSelectedRecommend(value),
            get children() {
              return [(() => {
                const _el$24 = libs.createElement("Panel", {
                    "class": "SurveyRadioBox"
                  }, null);
                  libs.createElement("Panel", {
                    "class": "SurveyRadioDot"
                  }, _el$24);
                return _el$24;
              })(), (() => {
                const _el$26 = libs.createElement("Label", {
                  get text() {
                    return GetCommunitySurveyOptionText(option, language);
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$26, "text", GetCommunitySurveyOptionText(option, language), _$p));
                return _el$26;
              })()];
            }
          });
        }
      }));
      libs.insert(_el$15, libs.createComponent(StoreItem.StoreItemBlock, {
        "class": "SurveyRewardItem",
        item_id: "190001",
        amounts: 5
      }), _el$17);
      libs.insert(_el$18, libs.createComponent(EOM_Button.EOM_Button, {
        id: "SurveySubmit",
        color: "Confirm",
        get loading() {
          return submitting();
        },
        get text() {
          return GetLocalization("#Community_Survey_Submit");
        },
        onactivate: submit
      }), null);
      libs.effect(_p$ => {
        const _v$ = getImagePath("activity/f2_football/f5_hero_03.png"),
          _v$2 = getImagePath("activity/f2_football/f5_hero_04.png"),
          _v$3 = GetLocalization("#Community_Survey_Intro"),
          _v$4 = {
            Incomplete: submitAttempted() && selectedSourceID() == undefined
          },
          _v$5 = GetLocalization("#Community_Survey_Question_1"),
          _v$6 = {
            Incomplete: submitAttempted() && selectedRecommend() == undefined
          },
          _v$7 = GetLocalization("#Community_Survey_Question_2"),
          _v$8 = GetLocalization("#Community_Survey_Reward_Title"),
          _v$9 = GetLocalization("#Community_Survey_Reward_Name"),
          _v$0 = submitAttempted() && !canSubmit(),
          _v$1 = GetLocalization("#Community_Survey_Validation");
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "src", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "src", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "classList", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "classList", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$13, "text", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$16, "text", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$17, "text", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$19, "visible", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$19, "text", _v$1, _p$._v$1));
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
        _v$1: undefined
      });
      return _el$;
    }
  });
}

Object.values(KeyValues.equip_class_setting).map(setting => setting.need_level);
function Popup_EquipmentCapacityDialog(props) {
  const capacityType = () => props.capacityType ?? "equipment";
  const capacityLimit = () => props.limit ?? 400;
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const capacityCount = () => playerCounters()?.[capacityType() === "gem" ? "gem_count" : "equipment_count"]?.count ?? props.count ?? 0;
  const isFull = () => props.full === true || props.full === 1 || capacityCount() >= capacityLimit();
  const title = () => capacityType() === "gem" ? GetLocalization(isFull() ? "#Equipment_GemCapacityTipTitle2" : "#Equipment_GemCapacityTipTitle") : GetLocalization(isFull() ? "#Equipment_EquipmentTipTitle2" : "#Equipment_EquipmentTipTitle");
  const contentToken = () => capacityType() === "gem" ? "#Equipment_GemCapacityTipContent" : "#Equipment_EquipmentTipContent";
  const onConfirm = () => {
    ClosePopup(props.PopupID);
    if (isFull()) {
      JumpToMenu({
        window_name: "equipment",
        menu: "EquipmentTab_break",
        force: true,
        data: {
          itemTab: capacityType()
        }
      });
    }
  };
  return libs.createComponent(BasePopup, {
    "class": "Popup_EquipmentCapacityDialog",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    get title() {
      return title();
    },
    size: "normal",
    get children() {
      const _el$ = libs.createElement("Panel", {
          width: "100%",
          height: "100%"
        }, null),
        _el$2 = libs.createElement("Label", {
          id: "CapacityTipContent",
          get text() {
            return LocalizeWithVars(contentToken(), {
              count: capacityCount(),
              limit: capacityLimit()
            });
          },
          html: true
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "WarningButtons"
        }, _el$);
      libs.setProp(_el$, "width", "100%");
      libs.setProp(_el$, "height", "100%");
      libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_Button, {
        color: "Confirm",
        get text() {
          return GetLocalization(isFull() ? "#Equipment_EquipmentTipGoBreak" : "#Equipment_EquipmentTipKnow");
        },
        onactivate: onConfirm
      }));
      libs.effect(_$p => libs.setProp(_el$2, "text", LocalizeWithVars(contentToken(), {
        count: capacityCount(),
        limit: capacityLimit()
      }), _$p));
      return _el$;
    }
  });
}

const Popup_HeroTalent = props => {
  const [previewHeroName, setPreviewHeroName] = libs.createSignal(props.heroName);
  const heroID = () => String(KeyValues.heroes[previewHeroName()]?.HeroID ?? 225);
  const player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  const playerAccountLevel = service_netdata_helper.usePlayerAccountLevel("hero_level");
  const heroLevel = () => playerAccountLevel().level ?? 0;
  const [changedTalentLevels, setChangedTalentLevels] = libs.createStore({});
  const [savedTalentLevels, setSavedTalentLevels] = libs.createStore({});
  const prerequisiteMap = {};
  Object.values(KeyValues.hero_talent).forEach(config => {
    if (config.requires) {
      const requires = config.requires.split("|");
      for (const require of requires) {
        const [requireId, requireLevel] = require.split(":");
        if (!prerequisiteMap[requireId]) {
          prerequisiteMap[requireId] = [];
        }
        prerequisiteMap[requireId].push({
          dependentId: config.talent_id,
          requiredLevel: toFiniteNumber(requireLevel)
        });
      }
    }
  });
  const getTalentTotalLevel = talentID => {
    return toFiniteNumber(savedTalentLevels[talentID]) + toFiniteNumber(changedTalentLevels[talentID]);
  };
  const getTalentTempLevel = talentID => {
    return toFiniteNumber(changedTalentLevels[talentID]);
  };
  const cancelTalentChanged = () => {
    libs.batch(() => {
      for (const key in changedTalentLevels) {
        setChangedTalentLevels(key, undefined);
      }
    });
  };
  const getTalentLevelsTable = () => {
    let talentLevels = {};
    for (const t in savedTalentLevels) {
      talentLevels[t] = savedTalentLevels[t];
    }
    for (const t in changedTalentLevels) {
      talentLevels[t] = toFiniteNumber(talentLevels[t]) + changedTalentLevels[t];
    }
    return talentLevels;
  };
  const player_tokens = solid_utils.createServiceNetData("player_tokens", {});
  function getTalentTokenCost(talents) {
    const costMap = {};
    for (const talentID in talents) {
      const savedLevel = toFiniteNumber(talents[talentID]);
      for (let i = 0; i < savedLevel; i++) {
        const effectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(i)];
        if (effectCfg?.talent_cost) {
          for (const cost of solid_utils.parseTokenCosts(effectCfg.talent_cost)) {
            costMap[cost.name] = (costMap[cost.name] ?? 0) + cost.value;
          }
        }
      }
    }
    return costMap;
  }
  const savedTokenCost = libs.createMemo(() => {
    const heroInfo = player_heroes()[heroID()];
    const talents = JSON.parseSafe(heroInfo?.talents ?? "") ?? {};
    return getTalentTokenCost(talents);
  });
  const tempTokenCost = libs.createMemo(() => {
    const costMap = {};
    for (const talentID in changedTalentLevels) {
      const changeAmount = changedTalentLevels[talentID];
      if (changeAmount <= 0) continue;
      const savedLevel = toFiniteNumber(savedTalentLevels[talentID]);
      for (let i = 0; i < changeAmount; i++) {
        const level = savedLevel + i;
        const effectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(level)];
        if (effectCfg?.talent_cost) {
          for (const cost of solid_utils.parseTokenCosts(effectCfg.talent_cost)) {
            costMap[cost.name] = (costMap[cost.name] ?? 0) + cost.value;
          }
        }
      }
    }
    return costMap;
  });
  const totalTokenCost = libs.createMemo(() => {
    const costMap = {
      ...savedTokenCost()
    };
    for (const costName in tempTokenCost()) {
      costMap[costName] = (costMap[costName] ?? 0) + tempTokenCost()[costName];
    }
    return costMap;
  });
  const canAffordTalentUpgrade = talentID => {
    const currentLevel = getTalentTotalLevel(talentID);
    const nextLevel = currentLevel + 1;
    const nextEffectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(nextLevel)];
    if (!nextEffectCfg) {
      return false;
    }
    if (toFiniteNumber(nextEffectCfg.lock) > 0 && heroLevel() < nextEffectCfg.lock) return false;
    const curEffectCfg = KeyValues.hero_talent_effect?.[talentID]?.[String(currentLevel)];
    if (!curEffectCfg?.talent_cost) return true;
    const costs = solid_utils.parseTokenCosts(curEffectCfg.talent_cost);
    if (costs.length === 0) return false;
    return costs.every(cost => {
      const actualAmount = player_tokens()?.[cost.name]?.amounts ?? 0;
      const totalCost = totalTokenCost()[cost.name] ?? 0;
      return actualAmount - totalCost - cost.value >= 0;
    });
  };
  const hasAnyChange = () => {
    for (const talentName in changedTalentLevels) {
      if (changedTalentLevels[talentName] != 0) {
        return true;
      }
    }
    return false;
  };
  libs.createEffect(libs.on([heroID, player_heroes], () => {
    const curHeroID = heroID();
    const heroInfo = player_heroes()[curHeroID];
    const talents = JSON.parseSafe(heroInfo?.talents ?? "");
    libs.batch(() => {
      for (const key in savedTalentLevels) {
        setSavedTalentLevels(key, undefined);
      }
      if (talents) {
        for (const key in talents) {
          if (savedTalentLevels[key] == undefined) {
            setSavedTalentLevels(key, talents[key]);
          }
        }
      }
      cancelTalentChanged();
    });
  }));
  let startX = 0;
  let startY = 0;
  let dragPanel;
  let dragNodeKey;
  let dragPanelInitx = 0;
  let dragPanelInity = 0;
  const [changePos, setChangePos] = libs.createStore({});
  const [isAlt, setIsAlt] = libs.createSignal(false);
  const getNodePos = (nodeKey, defaultX, defaultY) => {
    if (changePos[nodeKey]) {
      return {
        x: changePos[nodeKey].x,
        y: changePos[nodeKey].y
      };
    }
    return {
      x: defaultX,
      y: defaultY
    };
  };
  const getCursorPos = () => {
    const cursor = GameUI.GetCursorPosition();
    return {
      x: cursor[0] - Game.GetScreenWidth() / 2,
      y: cursor[1] - Game.GetScreenHeight() / 2
    };
  };
  const getNodeHalfSize = node => {
    const scaleX = node.actualuiscale_x;
    const scaleY = node.actualuiscale_y;
    return {
      width: node.actuallayoutwidth / scaleX * 0.5,
      height: node.actuallayoutheight / scaleY * 0.5,
      scaleX,
      scaleY
    };
  };
  const getDependentTalents = talentID => {
    const map = prerequisiteMap;
    const dependents = map[talentID];
    if (!dependents || dependents.length === 0) {
      return [];
    }
    return dependents.map(({
      dependentId,
      requiredLevel
    }) => ({
      dependentId,
      currentLevel: getTalentTotalLevel(dependentId),
      requiredLevel
    }));
  };
  const isPrerequisiteForOtherTalents = talentIDToCheck => {
    const currentLevel = getTalentTotalLevel(talentIDToCheck);
    if (currentLevel <= 0) {
      return false;
    }
    const levelAfterRefund = currentLevel - 1;
    const dependents = getDependentTalents(talentIDToCheck);
    return dependents.some(({
      currentLevel,
      requiredLevel
    }) => currentLevel > 0 && levelAfterRefund < requiredLevel);
  };
  const [uiCanvas, setCanvas] = libs.createSignal();
  libs.onMount(() => {
    const timer = setInterval(() => {
      if (dragNodeKey) {
        const cursor = getCursorPos();
        const offsetX = cursor.x - startX;
        const offsetY = cursor.y - startY;
        let newX = dragPanelInitx + offsetX;
        let newY = dragPanelInity + offsetY;
        let newRecord = {
          ...changePos
        };
        newRecord[dragNodeKey] = {
          x: newX,
          y: newY
        };
        setChangePos(newRecord);
      }
      setIsAlt(GameUI.IsAltDown() && Game.IsInToolsMode());
    }, 10);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  libs.createEffect(() => {
    const canvas = uiCanvas();
    if (canvas == undefined) {
      return;
    }
    canvas.ClearJS("transparent");
    const talents = Object.values(KeyValues.hero_talent).filter(talent => {
      return String(talent.hero) == heroID();
    });
    const halfNodeSize = 84 / 2;
    for (let i = 0; i < talents.length; i++) {
      const value = talents[i];
      const id = value.talent_id;
      if (value.requires) {
        const requires = value.requires.split("|");
        const [require_id, require_level] = requires[requires.length - 1].split(":");
        const startPos = getNodePos(require_id, toFiniteNumber(KeyValues.hero_talent[require_id].x), toFiniteNumber(KeyValues.hero_talent[require_id].y));
        const endPos = getNodePos(id, toFiniteNumber(value.x), toFiniteNumber(value.y));
        const isUnlock = getTalentTotalLevel(require_id) >= toFiniteNumber(require_level);
        canvas.DrawSoftLinePointsJS(2, [startPos.x + halfNodeSize, startPos.y + halfNodeSize, endPos.x + halfNodeSize, endPos.y + halfNodeSize], 4, 1, isUnlock ? "#C69947" : "#6e5d44");
      }
    }
  });
  libs.createEffect(() => {
    for (const key in savedTalentLevels) {
      savedTalentLevels[key];
    }
    libs.untrack(() => {
      cancelTalentChanged();
    });
  });
  return libs.createComponent(BasePopup, {
    id: "HeroTalentPopup",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    size: "large",
    get title() {
      return LocalizeWithVars("HeroTalentTitle", {
        value: GetLocalization("#" + previewHeroName())
      });
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "Talent",
          get ["class"]() {
            return "SelectHero" + heroID();
          }
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "TalentBlock"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "HeroSelectionList"
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "TalentContainer"
        }, _el$2),
        _el$5 = libs.createElement("UICanvas", {
          id: "Canvas"
        }, _el$4);
        libs.createElement("Panel", {
          "class": "Decoration"
        }, _el$4);
        const _el$7 = libs.createElement("Panel", {
          id: "TalentPoint",
          hittest: false
        }, _el$2),
        _el$8 = libs.createElement("Panel", {
          "class": "CurrencyGroup",
          hittest: false
        }, _el$7),
        _el$9 = libs.createElement("Panel", {
          id: "Btns",
          marginTop: "10px",
          horizontalAlign: "right",
          flowChildren: "down"
        }, _el$7);
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(KeyValues.heroes);
        },
        children: (heroName, index) => {
          return libs.createComponent(hero_card.HeroCard, {
            heroName: heroName,
            get selected() {
              return previewHeroName() == heroName;
            },
            marginTop: "26px",
            onactivate: () => {
              setPreviewHeroName(heroName);
            }
          });
        }
      }));
      libs.use(p => {
        $.Schedule(0.2, () => {
          setCanvas(p);
        });
      }, _el$5);
      libs.insert(_el$4, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(KeyValues.hero_talent);
        },
        children: (talentID, _) => {
          const config = KeyValues.hero_talent[talentID];
          let x = toFiniteNumber(config.x);
          let y = toFiniteNumber(config.y);
          const talentRequiresMemo = libs.createMemo(() => {
            if (!config.requires) {
              return [];
            }
            return config.requires.split("|").map(d => {
              const [id, lv] = d.split(":");
              return {
                id,
                lv: toFiniteNumber(lv)
              };
            });
          });
          const isUnlocked = libs.createMemo(() => {
            const requires = talentRequiresMemo();
            for (const {
              id,
              lv
            } of requires) {
              if (getTalentTotalLevel(id) < lv) {
                return false;
              }
            }
            return true;
          });
          const talentLevel = libs.createMemo(() => getTalentTotalLevel(talentID));
          const isMaxLevel = libs.createMemo(() => talentLevel() >= config.max_level);
          const canUpgradeTalent = libs.createMemo(() => {
            return isUnlocked() && !isMaxLevel() && canAffordTalentUpgrade(talentID);
          });
          const actualPos = libs.createMemo(() => {
            const pos = getNodePos(talentID, x, y);
            return {
              x: pos.x,
              y: pos.y
            };
          });
          const iconPath = config.icon ? getImagePath("h3_hero_talent_tree/" + config.icon + ".png") : undefined;
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: talentID,
            get style() {
              return {
                x: actualPos().x,
                y: actualPos().y
              };
            },
            get ["class"]() {
              return libs.classNames("TalentNode", {
                HideNode: heroID() != String(config.hero),
                Unlock: isUnlocked(),
                MaxLv: isMaxLevel()
              });
            },
            draggable: true,
            get customTooltip() {
              return {
                name: "hero_talent",
                heroID: heroID(),
                talentName: talentID,
                level: talentLevel(),
                talentLevels: JSON.stringify(getTalentLevelsTable()),
                tokenCosts: JSON.stringify(totalTokenCost())
              };
            },
            onDragStart: (p, c) => {
              if (!isAlt()) {
                return;
              }
              c.displayPanel = $.CreatePanel("Panel", $.GetContextPanel(), "DragPanel");
              dragPanel = p;
              const parent = dragPanel.GetParent();
              const cursor = getCursorPos();
              startX = cursor.x;
              startY = cursor.y;
              const pos = dragPanel.GetPositionWithinAncestor(parent);
              const {
                scaleX,
                scaleY
              } = getNodeHalfSize(dragPanel);
              dragPanelInitx = pos.x / scaleX;
              dragPanelInity = pos.y / scaleY;
              dragNodeKey = talentID;
            },
            onDragEnd: (p, c) => {
              c.DeleteAsync(-1);
              dragNodeKey = undefined;
            },
            onactivate: () => {
              if (!canUpgradeTalent()) {
                return;
              }
              libs.batch(() => {
                setChangedTalentLevels(talentID, v => toFiniteNumber(v) + 1);
                ClientSideEvent("FreshTalentLv", {
                  name: talentID,
                  level: getTalentTotalLevel(talentID),
                  talentLevels: getTalentLevelsTable()
                });
              });
            },
            oncontextmenu: () => {
              libs.batch(() => {
                const tempLevel = getTalentTempLevel(talentID);
                if (tempLevel <= 0) {
                  return;
                }
                if (isPrerequisiteForOtherTalents(talentID)) {
                  return;
                }
                setChangedTalentLevels(talentID, v => toFiniteNumber(v) - 1);
                ClientSideEvent("FreshTalentLv", {
                  name: talentID,
                  level: getTalentTotalLevel(talentID),
                  talentLevels: getTalentLevelsTable()
                });
              });
            },
            get children() {
              return [libs.createComponent(libs.Show, {
                get when() {
                  return canUpgradeTalent();
                },
                get children() {
                  return libs.createElement("Panel", {
                    "class": "TalentNodeLvBg"
                  }, null);
                }
              }), (() => {
                const _el$1 = libs.createElement("Panel", {
                  id: "TalentImage",
                  backgroundImage: iconPath
                }, null);
                libs.setProp(_el$1, "classList", {
                  CustomIcon: iconPath != undefined
                });
                libs.setProp(_el$1, "backgroundImage", iconPath);
                return _el$1;
              })(), (() => {
                const _el$10 = libs.createElement("Label", {
                  id: "TalentLv",
                  get text() {
                    return `${talentLevel()}/${config.max_level}`;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$10, "text", `${talentLevel()}/${config.max_level}`, _$p));
                return _el$10;
              })(), libs.createElement("Panel", {
                id: "LockImg"
              }, null), libs.createComponent(libs.Show, {
                get when() {
                  return isAlt();
                },
                get children() {
                  return [(() => {
                    const _el$12 = libs.createElement("Label", {
                      id: "TalentPos",
                      get text() {
                        return `${actualPos().x.toFixed(2)},${actualPos().y.toFixed(2)}`;
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$12, "text", `${actualPos().x.toFixed(2)},${actualPos().y.toFixed(2)}`, _$p));
                    return _el$12;
                  })(), (() => {
                    const _el$13 = libs.createElement("Label", {
                      id: "TalentName",
                      text: talentID
                    }, null);
                    libs.setProp(_el$13, "text", talentID);
                    return _el$13;
                  })()];
                }
              })];
            }
          });
        }
      }), null);
      libs.insert(_el$8, libs.createComponent(libs.For, {
        each: [120012, 120013],
        children: tokenID => {
          const actualAmount = () => player_tokens()?.[String(tokenID)]?.amounts ?? 0;
          const cost = () => totalTokenCost()[String(tokenID)] ?? 0;
          const displayValue = () => actualAmount() - cost();
          return libs.createComponent(Player.EOM_Currency, {
            titleTooltip: {
              title: "#" + tokenID,
              text: "#" + tokenID + "_description"
            },
            get icon() {
              return getImagePath(`tokens/${tokenID}.png`);
            },
            get value() {
              return displayValue();
            },
            currencyType: "popup"
          });
        }
      }));
      libs.setProp(_el$9, "marginTop", "10px");
      libs.setProp(_el$9, "horizontalAlign", "right");
      libs.setProp(_el$9, "flowChildren", "down");
      libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
        id: "ResetBtn",
        size: "Small",
        text: "#Button_TalentReset",
        onactivate: () => {
          CallAction("/v1/hero/change_talent", {
            hero_id: String(heroID()),
            talents: {}
          });
        },
        html: true
      }), null);
      libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
        id: "SaveBtn",
        get enabled() {
          return hasAnyChange();
        },
        size: "Small",
        text: "#Button_Save",
        onactivate: () => {
          CallAction("/v1/hero/change_talent", {
            hero_id: String(heroID()),
            talents: getTalentLevelsTable()
          });
        }
      }), null);
      libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
        id: "CancelBtn",
        get visible() {
          return hasAnyChange();
        },
        size: "Small",
        text: "#Popup_Button_Cancel",
        onactivate: () => {
          cancelTalentChanged();
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$, "class", "SelectHero" + heroID(), _$p));
      return _el$;
    }
  });
};

const SAVE_LIMIT = 5;
const CURRENT_RUN = {
  id: 0,
  time: "09/17 22:16",
  hero: "npc_dota_hero_axe",
  difficulty: 12,
  strength: 22,
  damage: 1284567,
  blessings: ["item_bleed_attack", "item_bleed_raze", "item_bleed_ultimate"],
  artifacts: ["item_artifact_giant_killer_1", "item_artifact_healing_potion"]
};
const EMPTY_SLOTS = [undefined, undefined, undefined, undefined, undefined];
const deserializeSave = save => {
  if (save === undefined) return undefined;
  const snapshot = JSON.parseSafe(save.data);
  if (snapshot?.hero_name === undefined) return undefined;
  return {
    id: save.slot_id,
    time: global_selection.formatDateText(Number(snapshot.time)),
    hero: snapshot.hero_name,
    difficulty: save.diff,
    strength: snapshot.strength ?? 0,
    damage: snapshot.total_damage ?? 0,
    blessings: snapshot.blessings?.map(blessing => blessing.name) ?? [],
    artifacts: snapshot.artifacts?.map(artifact => artifact.item_name) ?? []
  };
};
const formatDifficulty = record => LocalizeWithVars("#HuntSaveArchive_DifficultyValue", {
  difficulty: record.difficulty,
  strength: record.strength
});
function HuntSaveItems(props) {
  const width = () => props.items.length * 36;
  return (() => {
    const _el$ = libs.createElement("Panel", {
      "class": "HuntSaveItemsColumn"
    }, null);
    libs.insert(_el$, libs.createComponent(RecycleView.RecycleView, {
      "class": "HuntSaveItems",
      get style() {
        return {
          width: `${width()}px`
        };
      },
      input: () => props.items,
      direction: "Horizontal",
      showBar: false,
      childConfig: {
        width: 36,
        height: 36
      },
      children: item => libs.createComponent(common_item.CommonItem, {
        get itemName() {
          return item();
        },
        showTips: true
      })
    }));
    return _el$;
  })();
}
function HuntSaveSnapshot(props) {
  return (() => {
    const _el$2 = libs.createElement("Panel", {
        id: "HuntSaveCurrentRecord"
      }, null),
      _el$3 = libs.createElement("Panel", {
        "class": "HuntSaveRecordHeader"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        "class": "HuntSaveSnapshotTime",
        get text() {
          return props.record.time;
        }
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        "class": "HuntSaveSnapshotHero"
      }, _el$3),
      _el$6 = libs.createElement("Label", {
        "class": "HuntSaveSnapshotDamage",
        get text() {
          return FormatNumber(props.record.damage);
        }
      }, _el$3);
    libs.insert(_el$5, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
      get heroname() {
        return props.record.hero;
      },
      heroimagestyle: "icon"
    }));
    libs.insert(_el$3, libs.createComponent(HuntSaveItems, {
      get items() {
        return props.record.blessings;
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(HuntSaveItems, {
      get items() {
        return props.record.artifacts;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = props.record.time,
        _v$2 = FormatNumber(props.record.damage);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$2;
  })();
}
const Popup_HuntSaveArchive = props => {
  const [selectedSlot, setSelectedSlot] = libs.createSignal();
  const huntSaveSnapshot = solid_utils.createPlayerNetDataSignal("player_data", "hunt_save_snapshot");
  const playerHuntSaveDatas = solid_utils.createServiceNetData("player_hunt_save_datas", {});
  const slots = libs.createMemo(() => {
    const serviceSlots = Object.values(playerHuntSaveDatas());
    const slotRecords = EMPTY_SLOTS.slice();
    for (const save of serviceSlots) {
      if (save.slot_id >= 1 && save.slot_id <= SAVE_LIMIT) slotRecords[save.slot_id - 1] = save;
    }
    return slotRecords.map(deserializeSave);
  });
  libs.createMemo(() => slots().filter(record => record !== undefined).length);
  const selectedRecord = libs.createMemo(() => selectedSlot() === undefined ? undefined : slots()[selectedSlot()]);
  const hasSaved = libs.createMemo(() => huntSaveSnapshot()?.has_saved === true);
  const currentRun = libs.createMemo(() => {
    const snapshot = huntSaveSnapshot();
    if (snapshot === undefined) return CURRENT_RUN;
    return {
      ...CURRENT_RUN,
      time: global_selection.formatDateText(snapshot.time),
      hero: snapshot.hero_name,
      damage: snapshot.total_damage,
      blessings: snapshot.blessings.map(blessing => blessing.name),
      artifacts: snapshot.artifacts.map(artifact => artifact.item_name)
    };
  });
  const saveToSelectedSlot = () => {
    const slot = selectedSlot();
    if (hasSaved() || slot === undefined || selectedRecord() !== undefined) return;
    GameEvents.SendCustomEventToServer("hunt_save_archive_save", {
      slot_id: slot + 1
    });
  };
  const replaceSelected = () => {
    const record = selectedRecord();
    if (hasSaved() || record === undefined || selectedSlot() === undefined) return;
    CustomUIConfig.showPopup("CommonConfirm", {
      title: GetLocalization("#HuntSaveArchive_Title"),
      text: LocalizeWithVars("#HuntSaveArchive_ReplaceConfirm", {
        time: record.time,
        damage: FormatNumber(record.damage)
      }),
      onconfirm: () => {
        const slot = selectedSlot();
        if (slot === undefined) return;
        GameEvents.SendCustomEventToServer("hunt_save_archive_save", {
          slot_id: slot + 1
        });
      }
    });
  };
  return libs.createComponent(BasePopup, {
    id: "Popup_HuntSaveArchive",
    size: "normal",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    get title() {
      return GetLocalization("#HuntSaveArchive_Title");
    },
    get children() {
      const _el$7 = libs.createElement("Panel", {
          id: "HuntSaveArchiveContent"
        }, null),
        _el$8 = libs.createElement("Panel", {
          id: "HuntSaveSnapshotHeader"
        }, _el$7),
        _el$9 = libs.createElement("Label", {
          "class": "HuntSaveHeaderTime",
          get text() {
            return GetLocalization("#HuntSaveArchive_Time");
          }
        }, _el$8),
        _el$0 = libs.createElement("Label", {
          "class": "HuntSaveHeaderHero",
          get text() {
            return GetLocalization("#HuntSaveArchive_Hero");
          }
        }, _el$8),
        _el$1 = libs.createElement("Label", {
          "class": "HuntSaveHeaderDamage",
          get text() {
            return GetLocalization("#HuntSaveArchive_Damage");
          }
        }, _el$8),
        _el$10 = libs.createElement("Label", {
          "class": "HuntSaveHeaderItems",
          get text() {
            return GetLocalization("#HuntSaveArchive_Blessing");
          }
        }, _el$8),
        _el$11 = libs.createElement("Label", {
          "class": "HuntSaveHeaderItems",
          get text() {
            return GetLocalization("#HuntSaveArchive_Artifact");
          }
        }, _el$8),
        _el$12 = libs.createElement("Label", {
          "class": "HuntSaveSectionTitle",
          get text() {
            return GetLocalization("#HuntSaveArchive_ExistingSaves");
          }
        }, _el$7),
        _el$13 = libs.createElement("Panel", {
          id: "HuntSaveSlotList"
        }, _el$7);
      libs.insert(_el$7, libs.createComponent(HuntSaveSnapshot, {
        get record() {
          return currentRun();
        }
      }), _el$12);
      libs.insert(_el$13, libs.createComponent(libs.For, {
        get each() {
          return slots();
        },
        children: (record, index) => (() => {
          const _el$17 = libs.createElement("Panel", {}, null);
          libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_BaseButton, {
            "class": "HuntSaveSlotContent",
            onactivate: () => setSelectedSlot(index()),
            get children() {
              return libs.createComponent(libs.Show, {
                when: record,
                get fallback() {
                  return (() => {
                    const _el$21 = libs.createElement("Label", {
                      "class": "HuntSaveEmptySlot",
                      get text() {
                        return GetLocalization("#HuntSaveArchive_EmptySlot");
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$21, "text", GetLocalization("#HuntSaveArchive_EmptySlot"), _$p));
                    return _el$21;
                  })();
                },
                get children() {
                  return [libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
                    "class": "HuntSaveSlotHero",
                    get heroname() {
                      return record.hero;
                    },
                    heroimagestyle: "icon"
                  }), (() => {
                    const _el$18 = libs.createElement("Label", {
                      "class": "HuntSaveSlotPrimary",
                      get text() {
                        return formatDifficulty(record);
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$18, "text", formatDifficulty(record), _$p));
                    return _el$18;
                  })(), (() => {
                    const _el$19 = libs.createElement("Label", {
                      "class": "HuntSaveSlotDamage",
                      get text() {
                        return FormatNumber(record.damage);
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$19, "text", FormatNumber(record.damage), _$p));
                    return _el$19;
                  })(), (() => {
                    const _el$20 = libs.createElement("Label", {
                      "class": "HuntSaveSlotTime",
                      get text() {
                        return record.time;
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$20, "text", record.time, _$p));
                    return _el$20;
                  })()];
                }
              });
            }
          }));
          libs.effect(_$p => libs.setProp(_el$17, "classList", {
            HuntSaveSlot: true,
            Empty: record === undefined,
            Selected: selectedSlot() === index()
          }, _$p));
          return _el$17;
        })()
      }));
      libs.insert(_el$7, libs.createComponent(libs.Show, {
        get when() {
          return hasSaved();
        },
        get fallback() {
          return libs.createComponent(libs.Show, {
            get when() {
              return selectedRecord();
            },
            get fallback() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                id: "HuntSaveAction",
                color: "Confirm",
                get enabled() {
                  return selectedSlot() !== undefined;
                },
                get text() {
                  return GetLocalization("#HuntSaveArchive_Save");
                },
                onactivate: saveToSelectedSlot
              });
            },
            get children() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                id: "HuntSaveAction",
                color: "Confirm",
                get text() {
                  return GetLocalization("#HuntSaveArchive_Replace");
                },
                onactivate: replaceSelected
              });
            }
          });
        },
        get children() {
          const _el$14 = libs.createElement("Panel", {
              id: "HuntSaveSavedState"
            }, null),
            _el$15 = libs.createElement("Label", {
              get text() {
                return GetLocalization("#HuntSaveArchive_SavedHint");
              }
            }, _el$14);
          libs.effect(_$p => libs.setProp(_el$15, "text", GetLocalization("#HuntSaveArchive_SavedHint"), _$p));
          return _el$14;
        }
      }), null);
      libs.insert(_el$7, libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!!hasSaved())() && selectedSlot() === undefined;
        },
        get children() {
          const _el$16 = libs.createElement("Label", {
            id: "HuntSaveReplaceHint",
            get text() {
              return GetLocalization("#HuntSaveArchive_SelectReplace");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$16, "text", GetLocalization("#HuntSaveArchive_SelectReplace"), _$p));
          return _el$16;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$3 = GetLocalization("#HuntSaveArchive_Time"),
          _v$4 = GetLocalization("#HuntSaveArchive_Hero"),
          _v$5 = GetLocalization("#HuntSaveArchive_Damage"),
          _v$6 = GetLocalization("#HuntSaveArchive_Blessing"),
          _v$7 = GetLocalization("#HuntSaveArchive_Artifact"),
          _v$8 = GetLocalization("#HuntSaveArchive_ExistingSaves");
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$0, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$10, "text", _v$6, _p$._v$6));
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
      return _el$7;
    }
  });
};

function Popup_PropUse(props) {
  const player_cosmetics = solid_utils.createServiceNetData("player_cosmetics", {});
  const propData = libs.createMemo(() => KeyValues.info_item_prop[props.prop_id]);
  const dropItems = libs.createMemo(() => {
    const data = propData();
    if (data === undefined || data.prop_drop === undefined) return [];
    return Object.keys(data.prop_drop);
  });
  const isItemOwned = item_id => player_cosmetics()[item_id] !== undefined;
  const [pickItemID, setPickItemID] = libs.createSignal();
  const handleConfirm = () => {
    const pickID = pickItemID();
    if (pickID === undefined) return;
    CallAction("/v1/prop/open", {
      prop_id: Number(props.prop_id),
      pick_item_id: Number(pickID)
    });
    ClosePopup(props.PopupID);
  };
  return libs.createComponent(BasePopup, {
    "class": "Popup_PropUse",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    title: "#Props_Action",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock"
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "PickList",
            "class": "VerticalScrollStyle",
            scroll: "y"
          }, _el$);
        libs.setProp(_el$2, "scroll", "y");
        libs.insert(_el$2, libs.createComponent(libs.For, {
          get each() {
            return dropItems();
          },
          children: item_id => (() => {
            const _el$4 = libs.createElement("Panel", {
                "class": "DropItemBlock"
              }, null),
              _el$5 = libs.createElement("Panel", {
                "class": "SelectedBorder",
                hittest: false
              }, _el$4);
            libs.setProp(_el$4, "onactivate", () => {
              if (!isItemOwned(item_id)) setPickItemID(item_id);
            });
            libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemBlock, {
              item_id: item_id,
              hideTips: false
            }), _el$5);
            libs.effect(_$p => libs.setProp(_el$4, "classList", {
              Selected: pickItemID() == item_id,
              Disabled: isItemOwned(item_id)
            }, _$p));
            return _el$4;
          })()
        }));
        return _el$;
      })(), (() => {
        const _el$3 = libs.createElement("Panel", {
          id: "BottomButtons",
          hittest: false
        }, null);
        libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_Button, {
          id: "Cancel",
          color: "Cancel",
          text: "#Popup_Button_Cancel",
          onactivate: () => {
            ClosePopup(props.PopupID);
          }
        }), null);
        libs.insert(_el$3, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          text: "#Popup_Button_Confirm",
          get enabled() {
            return pickItemID() !== undefined;
          },
          onactivate: handleConfirm
        }), null);
        return _el$3;
      })()];
    }
  });
}

function Popup_ReviveCoinDialog(props) {
  const coinCount = props.coinCount ?? 0;
  const timeout = props.timeout ?? 100;
  const [remaining, setRemaining] = libs.createSignal(timeout);
  let resolved = false;
  const sendChoice = use => {
    if (resolved) return;
    resolved = true;
    if (use === 1) {
      GameUI.CustomUIConfig().ReportClick("revive_coin", "dialog|use");
    }
    GameEvents.SendCustomGameEventToServer("revive_coin_choice", {
      use,
      requestId: props.requestId
    });
    ClosePopup(props.PopupID);
  };
  libs.onMount(() => {
    GameUI.CustomUIConfig().ReportClick("revive_coin", "dialog|show");
  });
  libs.createEffect(() => {
    const timer = setInterval(() => {
      const r = remaining() - 1;
      if (r <= 0) {
        setRemaining(0);
        clearInterval(timer);
        sendChoice(0);
        return;
      }
      setRemaining(r);
    }, 1000);
    libs.onCleanup(() => clearInterval(timer));
  });
  return libs.createComponent(BasePopup, {
    "class": "Popup_ReviveCoinDialog",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    title: "#ReviveCoin_Title",
    size: "small",
    closeOnClickOuter: false,
    closeOnEsc: false,
    hideClose: true,
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$2 = libs.createElement("Label", {
            text: "#ReviveCoin_Confirm",
            vars: {
              value: coinCount
            }
          }, _el$);
        libs.setProp(_el$2, "vars", {
          value: coinCount
        });
        return _el$;
      })(), (() => {
        const _el$3 = libs.createElement("Panel", {
            id: "CountdownBar",
            hittest: false
          }, null),
          _el$4 = libs.createElement("Panel", {
            id: "CountdownFill",
            get style() {
              return {
                width: `${remaining() / timeout * 100}%`
              };
            }
          }, _el$3);
        libs.effect(_$p => libs.setProp(_el$4, "style", {
          width: `${remaining() / timeout * 100}%`
        }, _$p));
        return _el$3;
      })(), (() => {
        const _el$5 = libs.createElement("Panel", {
            id: "CountdownText",
            hittest: false
          }, null),
          _el$6 = libs.createElement("Label", {
            get text() {
              return remaining().toString() + "s";
            }
          }, _el$5);
        libs.effect(_$p => libs.setProp(_el$6, "text", remaining().toString() + "s", _$p));
        return _el$5;
      })(), (() => {
        const _el$7 = libs.createElement("Panel", {
          id: "BottomButtons",
          hittest: false
        }, null);
        libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_Button, {
          id: "Cancel",
          color: "Cancel",
          text: "#ReviveCoin_GiveUp",
          onactivate: () => {
            sendChoice(0);
          }
        }), null);
        libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          text: "#ReviveCoin_Use",
          onactivate: () => {
            sendChoice(1);
          }
        }), null);
        return _el$7;
      })()];
    }
  });
}

const REVIVE_COIN_PRODUCT_ID = 800018;
function Popup_ReviveCoinPurchaseDialog(props) {
  const timeout = props.timeout ?? 100;
  const [remaining, setRemaining] = libs.createSignal(timeout);
  const itemData = KeyValues.info_shop_product[REVIVE_COIN_PRODUCT_ID];
  let resolved = false;
  const sendChoice = buy => {
    if (resolved) return;
    resolved = true;
    GameEvents.SendCustomGameEventToServer("revive_coin_purchase_choice", {
      buy,
      requestId: props.requestId
    });
    ClosePopup(props.PopupID);
  };
  libs.createEffect(() => {
    const timer = setInterval(() => {
      const r = remaining() - 1;
      if (r <= 0) {
        setRemaining(0);
        clearInterval(timer);
        sendChoice(0);
        return;
      }
      setRemaining(r);
    }, 1000);
    libs.onCleanup(() => clearInterval(timer));
  });
  return libs.createComponent(BasePopup, {
    "class": "Popup_ReviveCoinPurchaseDialog",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    title: "#ReviveCoinPurchase_Title",
    size: "small",
    closeOnClickOuter: false,
    closeOnEsc: false,
    hideClose: true,
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null);
          libs.createElement("Label", {
            text: "#ReviveCoinPurchase_Text"
          }, _el$);
        return _el$;
      })(), (() => {
        const _el$3 = libs.createElement("Panel", {
            id: "CountdownBar",
            hittest: false
          }, null),
          _el$4 = libs.createElement("Panel", {
            id: "CountdownFill",
            get style() {
              return {
                width: `${remaining() / timeout * 100}%`
              };
            }
          }, _el$3);
        libs.effect(_$p => libs.setProp(_el$4, "style", {
          width: `${remaining() / timeout * 100}%`
        }, _$p));
        return _el$3;
      })(), (() => {
        const _el$5 = libs.createElement("Panel", {
            id: "CountdownText",
            hittest: false
          }, null),
          _el$6 = libs.createElement("Label", {
            get text() {
              return remaining().toString() + "s";
            }
          }, _el$5);
        libs.effect(_$p => libs.setProp(_el$6, "text", remaining().toString() + "s", _$p));
        return _el$5;
      })(), (() => {
        const _el$7 = libs.createElement("Panel", {
          id: "BottomButtons",
          hittest: false
        }, null);
        libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_Button, {
          id: "Cancel",
          color: "Cancel",
          text: "#ReviveCoin_GiveUp",
          onactivate: () => {
            sendChoice(0);
          }
        }), null);
        libs.insert(_el$7, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Confirm",
          onactivate: () => {
            sendChoice(1);
          },
          get children() {
            const _el$8 = libs.createElement("Panel", {
                flowChildren: "right",
                align: "center center"
              }, null);
              libs.createElement("Label", {
                text: "#ReviveCoinPurchase_Confirm"
              }, _el$8);
              const _el$0 = libs.createElement("Label", {
                get text() {
                  return Float(GetStoreItemCost(itemData, 1));
                }
              }, _el$8);
            libs.setProp(_el$8, "flowChildren", "right");
            libs.setProp(_el$8, "align", "center center");
            libs.insert(_el$8, libs.createComponent(Player.CurrencyIcon, {
              get tokenID() {
                return itemData.pay_type;
              }
            }), _el$0);
            libs.setProp(_el$0, "className", "CostLabel");
            libs.effect(_$p => libs.setProp(_el$0, "text", Float(GetStoreItemCost(itemData, 1)), _$p));
            return _el$8;
          }
        }), null);
        return _el$7;
      })()];
    }
  });
}

const Popup_StoreBuyItem = props => {
  const [local, others] = libs.splitProps(props, ["itemData", "PopupID", "group"]);
  const getCost = () => {
    if (getMaxCount() == 0) ;
    return Float(GetStoreItemCost(local.itemData, count()));
  };
  const player_tokens = solid_utils.createServiceNetData("player_tokens", {});
  solid_utils.createServiceNetData("player_props", {});
  const player_couriers = solid_utils.createServiceNetData("player_couriers", {});
  let purchased_num = libs.createMemo(() => {
    let data = props.itemData;
    let items = data.items ?? {};
    let itemList = Object.keys(items);
    let purchased_num = props.purchased_num ?? 0;
    let couriers = player_couriers();
    let star = 0;
    itemList.map(item_id => {
      if (couriers[item_id]) {
        star += (couriers[item_id]?.star ?? 0) + (couriers[item_id]?.extra_star_exp ?? 0);
      }
    });
    if (star > 0) {
      return star;
    }
    return purchased_num;
  });
  const getMaxCount = () => {
    return local.itemData.limit_type > 0 ? local.itemData.limit_count - purchased_num() : 999;
  };
  const buyItem = () => {
    const itemData = local.itemData;
    if (itemData.pay_type == PayType.MONEY) {
      ShowPopup("PaymentOrder", {
        itemData: itemData,
        PopupID: props.PopupID,
        count: count(),
        group: String(itemData.id)
      });
    } else {
      ShowPopup("StoreBuyItemResult", {
        result: "loading",
        PopupID: props.PopupID,
        group: String(itemData.id)
      });
      ServerRequest("product_buy", {
        product_id: itemData.id,
        amounts: count()
      }, res => {
        if (res.status == 0) {
          let items = [];
          const itemsData = itemData.items ?? {};
          for (const itemID in itemsData) {
            const amount = itemsData[itemID];
            items.push({
              item_id: Number(itemID),
              amounts: amount * count()
            });
          }
          ShowPopup("StoreBuyItemResult", {
            result: "success",
            PopupID: props.PopupID,
            group: String(itemData.id),
            items: items
          });
        } else {
          ShowPopup("StoreBuyItemResult", {
            result: "failure",
            reason: res.msg,
            PopupID: props.PopupID,
            group: String(itemData.id)
          });
        }
      });
    }
  };
  const getItemKeys = () => Object.keys(local.itemData.items ?? {});
  const desc = () => {
    const key = "#" + itemData.id + "_description";
    let description = GetLocalization(key);
    const itemListKeys = getItemKeys();
    if (description == key) {
      if (itemListKeys.length >= 1) {
        description = GetLocalization("#" + itemListKeys[0] + "_description");
      }
    }
    return description;
  };
  const showBundleInfo = () => getItemKeys().length >= 1 && itemData.id != 802039 && itemData.id != 802040;
  const nameStr = () => {
    const key = "#" + itemData.id;
    let nameText = GetLocalization(key, "");
    if (nameText == key) {
      const itemListKeys = getItemKeys();
      if (itemListKeys.length >= 1) {
        nameText = GetLocalization("#" + itemListKeys[0], "");
      }
    }
    return nameText;
  };
  const [count, setCount] = libs.createSignal(1);
  const {
    itemData,
    PopupID
  } = local;
  const canBuy = libs.createMemo(() => {
    if (getMaxCount() <= 0) return;
    if (itemData.pay_type == 0) return true;
    let cost = getCost();
    if ((player_tokens()[itemData.pay_type]?.amounts ?? 0) >= cost) return true;
    if (GetServiceItemCount(itemData.pay_type) >= cost) return true;
    return false;
  });
  return libs.createComponent(BasePopup, {
    id: "StoreBuyItemPopup",
    PopupID: PopupID,
    get group() {
      return String(itemData.id);
    },
    title: "#Popup_StoreBuyItem_title",
    get children() {
      return [libs.createComponent(Player.CurrencyGroup, {
        currencyType: "popup",
        get tokens() {
          return [local.itemData.pay_type];
        },
        get classList() {
          return {
            Cash: local.itemData.pay_type == 0
          };
        }
      }), (() => {
        const _el$ = libs.createElement("Panel", {
            id: "CenterBlock"
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "ItemInfo"
          }, _el$),
          _el$3 = libs.createElement("Panel", {
            width: "100%"
          }, _el$2),
          _el$4 = libs.createElement("Label", {
            html: true,
            id: "ItemName",
            get text() {
              return nameStr();
            }
          }, _el$3),
          _el$6 = libs.createElement("Label", {
            html: true,
            id: "ItemDesc",
            get text() {
              return desc();
            },
            scroll: "y",
            "class": "VerticalScrollStyle"
          }, _el$2),
          _el$9 = libs.createElement("Panel", {
            id: "ItemList"
          }, _el$2);
          libs.createElement("Panel", {
            id: "Separator"
          }, _el$2);
          const _el$1 = libs.createElement("Panel", {
            height: "40px",
            flowChildren: "right"
          }, _el$2),
          _el$10 = libs.createElement("Label", {
            text: "#Popup_StoreBuyItem_cost"
          }, _el$1),
          _el$11 = libs.createElement("Label", {
            get text() {
              return getCost();
            }
          }, _el$1),
          _el$12 = libs.createElement("Panel", {
            height: "40px",
            flowChildren: "right"
          }, _el$2),
          _el$13 = libs.createElement("Label", {
            text: "#Popup_StoreBuyItem_count"
          }, _el$12);
        libs.insert(_el$, libs.createComponent(StoreItem.StoreItem, {
          btnDisable: true,
          get itemid() {
            return itemData.id;
          },
          get purchased_num() {
            return purchased_num();
          },
          priceBtnHide: true
        }), _el$2);
        libs.setProp(_el$3, "width", "100%");
        libs.insert(_el$3, libs.createComponent(libs.Show, {
          get when() {
            return itemData.limit_type > 0;
          },
          get children() {
            const _el$5 = libs.createElement("Label", {
              html: true,
              id: "ItemLimit",
              get text() {
                return "#Popup_Store_LimitCount" + itemData.limit_type;
              },
              get vars() {
                return {
                  num: purchased_num(),
                  max: local.itemData.limit_count
                };
              }
            }, null);
            libs.effect(_p$ => {
              const _v$ = "#Popup_Store_LimitCount" + itemData.limit_type,
                _v$2 = {
                  num: purchased_num(),
                  max: local.itemData.limit_count
                };
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$5, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "vars", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$5;
          }
        }), null);
        libs.setProp(_el$6, "scroll", "y");
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return itemData.limit_repeat != undefined;
          },
          get children() {
            const _el$7 = libs.createElement("Label", {
              "class": "PurchaseLimitTips",
              get text() {
                return LocalizeWithVars("Goods_Repeat_Buy_Notice", {
                  value: itemData.limit_repeat
                });
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$7, "text", LocalizeWithVars("Goods_Repeat_Buy_Notice", {
              value: itemData.limit_repeat
            }), _$p));
            return _el$7;
          }
        }), _el$9);
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return showBundleInfo();
          },
          get children() {
            return libs.createElement("Label", {
              id: "ItemBundleInfo",
              text: "#StoreItem_BundleInfo"
            }, null);
          }
        }), _el$9);
        libs.insert(_el$9, libs.createComponent(libs.For, {
          get each() {
            return Object.keys(itemData.items ?? {});
          },
          children: itemID => {
            const itemsData = itemData.items ?? {};
            return libs.createComponent(BackpackItem.BackpackItemContent, {
              itemid: itemID,
              get amounts() {
                return itemsData[itemID];
              }
            });
          }
        }));
        libs.setProp(_el$1, "height", "40px");
        libs.setProp(_el$1, "flowChildren", "right");
        libs.setProp(_el$10, "className", "LeftLabel");
        libs.insert(_el$1, libs.createComponent(Player.CurrencyIcon, {
          get tokenID() {
            return local.itemData.pay_type;
          }
        }), _el$11);
        libs.setProp(_el$11, "className", "CostLabel");
        libs.setProp(_el$12, "height", "40px");
        libs.setProp(_el$12, "flowChildren", "right");
        libs.setProp(_el$13, "className", "LeftLabel");
        libs.insert(_el$12, libs.createComponent(EOM_NumberAdjust.EOM_NumberAdjust, {
          get value() {
            return props.buy_count ?? 1;
          },
          onChange: (self, value) => {
            setCount(value);
          },
          min: 1,
          get max() {
            return getMaxCount();
          }
        }), null);
        libs.effect(_p$ => {
          const _v$3 = nameStr(),
            _v$4 = desc(),
            _v$5 = getCost();
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "text", _v$5, _p$._v$5));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined
        });
        return _el$;
      })(), (() => {
        const _el$14 = libs.createElement("Panel", {
          flowChildren: "right",
          horizontalAlign: "center",
          marginTop: "22px"
        }, null);
        libs.setProp(_el$14, "flowChildren", "right");
        libs.setProp(_el$14, "horizontalAlign", "center");
        libs.setProp(_el$14, "marginTop", "22px");
        libs.insert(_el$14, libs.createComponent(EOM_Button.EOM_Button, {
          color: "Cancel",
          text: "#Popup_Button_Cancel",
          onactivate: () => ClosePopup(PopupID)
        }), null);
        libs.insert(_el$14, libs.createComponent(EOM_Button.EOM_Button, {
          get enabled() {
            return canBuy();
          },
          marginLeft: "82px",
          color: "Gold",
          text: "#Popup_Button_Buy",
          onactivate: () => buyItem()
        }), null);
        return _el$14;
      })()];
    }
  });
};

const Popup_StoreBuyItemResult = props => {
  const [local, others] = libs.splitProps(props, ["title", "result", "PopupID", "group", "reason", "items"]);
  const getTitle = () => {
    if (local.title != undefined) {
      return local.title;
    }
    switch (local.result) {
      case "loading":
        return "#Popup_StoreBuyItem_Result";
      case "success":
        return "#Popup_StoreBuyItem_Result";
      case "failure":
        return "#Popup_StoreBuyItem_Result";
      case "gotoUrl":
        return "#Popup_StoreBuyItem_GotoURL";
      default:
        return "#Popup_StoreBuyItem_Result";
    }
  };
  return libs.createComponent(BasePopup, {
    "class": "StoreBuyItemResult",
    get PopupID() {
      return local.PopupID;
    },
    get group() {
      return local.group;
    },
    get title() {
      return getTitle();
    },
    size: "small",
    get children() {
      const _el$ = libs.createElement("Panel", {
        width: "100%",
        height: "100%"
      }, null);
      libs.setProp(_el$, "width", "100%");
      libs.setProp(_el$, "height", "100%");
      libs.insert(_el$, libs.createComponent(libs.Switch, {
        get fallback() {
          return libs.createComponent(EOM_Loading.EOM_Loading, {
            align: "center center",
            type: "Wave"
          });
        },
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return local.result == "loading";
            },
            get children() {
              const _el$2 = libs.createElement("Panel", {
                  align: "center center",
                  flowChildren: "down"
                }, null),
                _el$3 = libs.createElement("Label", {
                  id: "TipLabel",
                  text: "#Popup_StoreOverseaPayment_Loading"
                }, _el$2);
              libs.setProp(_el$2, "align", "center center");
              libs.setProp(_el$2, "flowChildren", "down");
              libs.insert(_el$2, libs.createComponent(EOM_Loading.EOM_Loading, {
                horizontalAlign: "center",
                type: "Wave",
                color: "#D9B88D"
              }), _el$3);
              return _el$2;
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return local.result == "success";
            },
            get children() {
              return libs.createComponent(libs.Switch, {
                get fallback() {
                  return [(() => {
                    const _el$12 = libs.createElement("Image", {}, null);
                    libs.setProp(_el$12, "className", "Popup_StoreBuyItemResultIcon Success");
                    return _el$12;
                  })(), libs.createElement("Label", {
                    id: "TipLabel",
                    text: "#Popup_StoreBuyItem_Success"
                  }, null)];
                },
                get children() {
                  return libs.createComponent(libs.Match, {
                    get when() {
                      return local.items != undefined && local.items.length > 0;
                    },
                    get children() {
                      const _el$4 = libs.createElement("Panel", {
                        id: "RewardList"
                      }, null);
                      libs.insert(_el$4, libs.createComponent(libs.For, {
                        get each() {
                          return local.items;
                        },
                        children: item => libs.createComponent(BackpackItem.BackpackItemContent, {
                          get itemid() {
                            return item.item_id;
                          },
                          get amounts() {
                            return item.amounts;
                          },
                          get children() {
                            const _el$14 = libs.createElement("DOTAParticleScenePanel", {
                              id: "Bubble",
                              hittest: false,
                              particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
                              cameraOrigin: "0 0 40",
                              fov: 40,
                              lookAt: "0 0 0"
                            }, null);
                            libs.effect(_$p => libs.setProp(_el$14, "visible", item.item_id == 110016, _$p));
                            return _el$14;
                          }
                        })
                      }));
                      return _el$4;
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return local.result == "failure";
            },
            get children() {
              return [(() => {
                const _el$5 = libs.createElement("Image", {}, null);
                libs.setProp(_el$5, "className", "Popup_StoreBuyItemResultIcon Failure");
                return _el$5;
              })(), libs.createElement("Label", {
                id: "TipLabel",
                text: "#Popup_StoreBuyItem_Failure"
              }, null), (() => {
                const _el$7 = libs.createElement("Label", {
                  id: "Reason",
                  get text() {
                    return local.reason;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$7, "text", local.reason, _$p));
                return _el$7;
              })()];
            }
          })];
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Switch, {
        fallback: () => (() => {
          const _el$15 = libs.createElement("Panel", {
            align: "center bottom",
            flowChildren: "right"
          }, null);
          libs.setProp(_el$15, "align", "center bottom");
          libs.setProp(_el$15, "flowChildren", "right");
          libs.insert(_el$15, libs.createComponent(EOM_Button.EOM_Button, {
            color: "Cancel",
            text: "#GameUI_Close",
            onactivate: () => {
              ClosePopup(local.PopupID);
            }
          }));
          return _el$15;
        })(),
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return props.reason == "no_enough_moon";
            },
            get children() {
              return [libs.createElement("Label", {
                id: "ErrorMsg",
                text: "#no_enough_moon"
              }, null), (() => {
                const _el$9 = libs.createElement("Panel", {
                  align: "center bottom",
                  flowChildren: "right"
                }, null);
                libs.setProp(_el$9, "align", "center bottom");
                libs.setProp(_el$9, "flowChildren", "right");
                libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
                  color: "Cancel",
                  text: "#no_thanks",
                  onactivate: () => {
                    ClosePopup(local.PopupID);
                  }
                }), null);
                libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_Button, {
                  text: "#go_buy",
                  onactivate: () => {
                    ClosePopup(local.PopupID);
                    ClientSideEvent("toggle_store_tag", {
                      menu: "Resource"
                    });
                  }
                }), null);
                return _el$9;
              })()];
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return props.reason == "no_enough_coin";
            },
            get children() {
              return [libs.createElement("Label", {
                id: "ErrorMsg",
                text: "#no_enough_token"
              }, null), (() => {
                const _el$1 = libs.createElement("Panel", {
                  align: "center bottom",
                  flowChildren: "right"
                }, null);
                libs.setProp(_el$1, "align", "center bottom");
                libs.setProp(_el$1, "flowChildren", "right");
                libs.insert(_el$1, libs.createComponent(EOM_Button.EOM_Button, {
                  color: "Cancel",
                  text: "#no_thanks",
                  onactivate: () => {
                    ClosePopup(local.PopupID);
                  }
                }), null);
                libs.insert(_el$1, libs.createComponent(EOM_Button.EOM_Button, {
                  text: "#go_buy",
                  onactivate: () => {
                    ClosePopup(local.PopupID);
                    ClientSideEvent("directly_purchase", {
                      itemid: 9900208
                    });
                  }
                }), null);
                return _el$1;
              })()];
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return props.reason == "no_enough_token";
            },
            get children() {
              return [libs.createElement("Label", {
                id: "ErrorMsg",
                text: "#no_enough_token_2"
              }, null), (() => {
                const _el$11 = libs.createElement("Panel", {
                  align: "center bottom",
                  flowChildren: "right"
                }, null);
                libs.setProp(_el$11, "align", "center bottom");
                libs.setProp(_el$11, "flowChildren", "right");
                libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_Button, {
                  color: "Cancel",
                  text: "#no_thanks",
                  onactivate: () => {
                    ClosePopup(local.PopupID);
                  }
                }), null);
                libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_Button, {
                  text: "#CosmeticGet",
                  onactivate: () => {
                    ClosePopup(local.PopupID);
                    ToggleWindow('MenuButton_draw', true);
                  }
                }), null);
                return _el$11;
              })()];
            }
          })];
        }
      }), null);
      return _el$;
    }
  });
};

/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */


let qrcodegen;
(function (_qrcodegen) {
  class QrCode {
    static encodeText(text, ecl) {
      const segs = qrcodegen.QrSegment.makeSegments(text);
      return QrCode.encodeSegments(segs, ecl);
    }
    static encodeBinary(data, ecl) {
      const seg = qrcodegen.QrSegment.makeBytes(data);
      return QrCode.encodeSegments([seg], ecl);
    }
    static encodeSegments(segs, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
      if (!(QrCode.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= QrCode.MAX_VERSION) || mask < -1 || mask > 7) throw new RangeError("Invalid value");
      let version;
      let dataUsedBits;
      for (version = minVersion;; version++) {
        const dataCapacityBits = QrCode.getNumDataCodewords(version, ecl) * 8;
        const usedBits = QrSegment.getTotalBits(segs, version);
        if (usedBits <= dataCapacityBits) {
          dataUsedBits = usedBits;
          break;
        }
        if (version >= maxVersion) throw new RangeError("Data too long");
      }
      for (const newEcl of [QrCode.Ecc.MEDIUM, QrCode.Ecc.QUARTILE, QrCode.Ecc.HIGH]) {
        if (boostEcl && dataUsedBits <= QrCode.getNumDataCodewords(version, newEcl) * 8) ecl = newEcl;
      }
      let bb = [];
      for (const seg of segs) {
        appendBits(seg.mode.modeBits, 4, bb);
        appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
        for (const b of seg.getData()) bb.push(b);
      }
      assert(bb.length == dataUsedBits);
      const dataCapacityBits = QrCode.getNumDataCodewords(version, ecl) * 8;
      assert(bb.length <= dataCapacityBits);
      appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
      appendBits(0, (8 - bb.length % 8) % 8, bb);
      assert(bb.length % 8 == 0);
      for (let padByte = 0xEC; bb.length < dataCapacityBits; padByte ^= 0xEC ^ 0x11) appendBits(padByte, 8, bb);
      let dataCodewords = [];
      while (dataCodewords.length * 8 < bb.length) dataCodewords.push(0);
      bb.forEach((b, i) => dataCodewords[i >>> 3] |= b << 7 - (i & 7));
      return new QrCode(version, ecl, dataCodewords, mask);
    }
    modules = [];
    isFunction = [];
    constructor(version, errorCorrectionLevel, dataCodewords, msk) {
      this.version = version;
      this.errorCorrectionLevel = errorCorrectionLevel;
      if (version < QrCode.MIN_VERSION || version > QrCode.MAX_VERSION) throw new RangeError("Version value out of range");
      if (msk < -1 || msk > 7) throw new RangeError("Mask value out of range");
      this.size = version * 4 + 17;
      let row = [];
      for (let i = 0; i < this.size; i++) row.push(false);
      for (let i = 0; i < this.size; i++) {
        this.modules.push(row.slice());
        this.isFunction.push(row.slice());
      }
      this.drawFunctionPatterns();
      const allCodewords = this.addEccAndInterleave(dataCodewords);
      this.drawCodewords(allCodewords);
      if (msk == -1) {
        let minPenalty = 1000000000;
        for (let i = 0; i < 8; i++) {
          this.applyMask(i);
          this.drawFormatBits(i);
          const penalty = this.getPenaltyScore();
          if (penalty < minPenalty) {
            msk = i;
            minPenalty = penalty;
          }
          this.applyMask(i);
        }
      }
      assert(0 <= msk && msk <= 7);
      this.mask = msk;
      this.applyMask(msk);
      this.drawFormatBits(msk);
      this.isFunction = [];
    }
    getModule(x, y) {
      return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
    }
    getModules() {
      return this.modules;
    }
    drawFunctionPatterns() {
      for (let i = 0; i < this.size; i++) {
        this.setFunctionModule(6, i, i % 2 == 0);
        this.setFunctionModule(i, 6, i % 2 == 0);
      }
      this.drawFinderPattern(3, 3);
      this.drawFinderPattern(this.size - 4, 3);
      this.drawFinderPattern(3, this.size - 4);
      const alignPatPos = this.getAlignmentPatternPositions();
      const numAlign = alignPatPos.length;
      for (let i = 0; i < numAlign; i++) {
        for (let j = 0; j < numAlign; j++) {
          if (!(i == 0 && j == 0 || i == 0 && j == numAlign - 1 || i == numAlign - 1 && j == 0)) this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
        }
      }
      this.drawFormatBits(0);
      this.drawVersion();
    }
    drawFormatBits(mask) {
      const data = this.errorCorrectionLevel.formatBits << 3 | mask;
      let rem = data;
      for (let i = 0; i < 10; i++) rem = rem << 1 ^ (rem >>> 9) * 0x537;
      const bits = (data << 10 | rem) ^ 0x5412;
      assert(bits >>> 15 == 0);
      for (let i = 0; i <= 5; i++) this.setFunctionModule(8, i, getBit(bits, i));
      this.setFunctionModule(8, 7, getBit(bits, 6));
      this.setFunctionModule(8, 8, getBit(bits, 7));
      this.setFunctionModule(7, 8, getBit(bits, 8));
      for (let i = 9; i < 15; i++) this.setFunctionModule(14 - i, 8, getBit(bits, i));
      for (let i = 0; i < 8; i++) this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
      for (let i = 8; i < 15; i++) this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
      this.setFunctionModule(8, this.size - 8, true);
    }
    drawVersion() {
      if (this.version < 7) return;
      let rem = this.version;
      for (let i = 0; i < 12; i++) rem = rem << 1 ^ (rem >>> 11) * 0x1F25;
      const bits = this.version << 12 | rem;
      assert(bits >>> 18 == 0);
      for (let i = 0; i < 18; i++) {
        const color = getBit(bits, i);
        const a = this.size - 11 + i % 3;
        const b = Math.floor(i / 3);
        this.setFunctionModule(a, b, color);
        this.setFunctionModule(b, a, color);
      }
    }
    drawFinderPattern(x, y) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          const xx = x + dx;
          const yy = y + dy;
          if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
        }
      }
    }
    drawAlignmentPattern(x, y) {
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
      }
    }
    setFunctionModule(x, y, isDark) {
      this.modules[y][x] = isDark;
      this.isFunction[y][x] = true;
    }
    addEccAndInterleave(data) {
      const ver = this.version;
      const ecl = this.errorCorrectionLevel;
      if (data.length != QrCode.getNumDataCodewords(ver, ecl)) throw new RangeError("Invalid argument");
      const numBlocks = QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
      const blockEccLen = QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
      const rawCodewords = Math.floor(QrCode.getNumRawDataModules(ver) / 8);
      const numShortBlocks = numBlocks - rawCodewords % numBlocks;
      const shortBlockLen = Math.floor(rawCodewords / numBlocks);
      let blocks = [];
      const rsDiv = QrCode.reedSolomonComputeDivisor(blockEccLen);
      for (let i = 0, k = 0; i < numBlocks; i++) {
        let dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
        k += dat.length;
        const ecc = QrCode.reedSolomonComputeRemainder(dat, rsDiv);
        if (i < numShortBlocks) dat.push(0);
        blocks.push(dat.concat(ecc));
      }
      let result = [];
      for (let i = 0; i < blocks[0].length; i++) {
        blocks.forEach((block, j) => {
          if (i != shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]);
        });
      }
      assert(result.length == rawCodewords);
      return result;
    }
    drawCodewords(data) {
      if (data.length != Math.floor(QrCode.getNumRawDataModules(this.version) / 8)) throw new RangeError("Invalid argument");
      let i = 0;
      for (let right = this.size - 1; right >= 1; right -= 2) {
        if (right == 6) right = 5;
        for (let vert = 0; vert < this.size; vert++) {
          for (let j = 0; j < 2; j++) {
            const x = right - j;
            const upward = (right + 1 & 2) == 0;
            const y = upward ? this.size - 1 - vert : vert;
            if (!this.isFunction[y][x] && i < data.length * 8) {
              this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
              i++;
            }
          }
        }
      }
      assert(i == data.length * 8);
    }
    applyMask(mask) {
      if (mask < 0 || mask > 7) throw new RangeError("Mask value out of range");
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          let invert;
          switch (mask) {
            case 0:
              invert = (x + y) % 2 == 0;
              break;
            case 1:
              invert = y % 2 == 0;
              break;
            case 2:
              invert = x % 3 == 0;
              break;
            case 3:
              invert = (x + y) % 3 == 0;
              break;
            case 4:
              invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;
              break;
            case 5:
              invert = x * y % 2 + x * y % 3 == 0;
              break;
            case 6:
              invert = (x * y % 2 + x * y % 3) % 2 == 0;
              break;
            case 7:
              invert = ((x + y) % 2 + x * y % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          if (!this.isFunction[y][x] && invert) this.modules[y][x] = !this.modules[y][x];
        }
      }
    }
    getPenaltyScore() {
      let result = 0;
      for (let y = 0; y < this.size; y++) {
        let runColor = false;
        let runX = 0;
        let runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0; x < this.size; x++) {
          if (this.modules[y][x] == runColor) {
            runX++;
            if (runX == 5) result += QrCode.PENALTY_N1;else if (runX > 5) result++;
          } else {
            this.finderPenaltyAddHistory(runX, runHistory);
            if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY_N3;
            runColor = this.modules[y][x];
            runX = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * QrCode.PENALTY_N3;
      }
      for (let x = 0; x < this.size; x++) {
        let runColor = false;
        let runY = 0;
        let runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let y = 0; y < this.size; y++) {
          if (this.modules[y][x] == runColor) {
            runY++;
            if (runY == 5) result += QrCode.PENALTY_N1;else if (runY > 5) result++;
          } else {
            this.finderPenaltyAddHistory(runY, runHistory);
            if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY_N3;
            runColor = this.modules[y][x];
            runY = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * QrCode.PENALTY_N3;
      }
      for (let y = 0; y < this.size - 1; y++) {
        for (let x = 0; x < this.size - 1; x++) {
          const color = this.modules[y][x];
          if (color == this.modules[y][x + 1] && color == this.modules[y + 1][x] && color == this.modules[y + 1][x + 1]) result += QrCode.PENALTY_N2;
        }
      }
      let dark = 0;
      for (const row of this.modules) dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
      const total = this.size * this.size;
      const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
      assert(0 <= k && k <= 9);
      result += k * QrCode.PENALTY_N4;
      assert(0 <= result && result <= 2568888);
      return result;
    }
    getAlignmentPatternPositions() {
      if (this.version == 1) return [];else {
        const numAlign = Math.floor(this.version / 7) + 2;
        const step = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
        let result = [6];
        for (let pos = this.size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
        return result;
      }
    }
    static getNumRawDataModules(ver) {
      if (ver < QrCode.MIN_VERSION || ver > QrCode.MAX_VERSION) throw new RangeError("Version number out of range");
      let result = (16 * ver + 128) * ver + 64;
      if (ver >= 2) {
        const numAlign = Math.floor(ver / 7) + 2;
        result -= (25 * numAlign - 10) * numAlign - 55;
        if (ver >= 7) result -= 36;
      }
      assert(208 <= result && result <= 29648);
      return result;
    }
    static getNumDataCodewords(ver, ecl) {
      return Math.floor(QrCode.getNumRawDataModules(ver) / 8) - QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    }
    static reedSolomonComputeDivisor(degree) {
      if (degree < 1 || degree > 255) throw new RangeError("Degree out of range");
      let result = [];
      for (let i = 0; i < degree - 1; i++) result.push(0);
      result.push(1);
      let root = 1;
      for (let i = 0; i < degree; i++) {
        for (let j = 0; j < result.length; j++) {
          result[j] = QrCode.reedSolomonMultiply(result[j], root);
          if (j + 1 < result.length) result[j] ^= result[j + 1];
        }
        root = QrCode.reedSolomonMultiply(root, 0x02);
      }
      return result;
    }
    static reedSolomonComputeRemainder(data, divisor) {
      let result = divisor.map(_ => 0);
      for (const b of data) {
        const factor = b ^ result.shift();
        result.push(0);
        divisor.forEach((coef, i) => result[i] ^= QrCode.reedSolomonMultiply(coef, factor));
      }
      return result;
    }
    static reedSolomonMultiply(x, y) {
      if (x >>> 8 != 0 || y >>> 8 != 0) throw new RangeError("Byte out of range");
      let z = 0;
      for (let i = 7; i >= 0; i--) {
        z = z << 1 ^ (z >>> 7) * 0x11D;
        z ^= (y >>> i & 1) * x;
      }
      assert(z >>> 8 == 0);
      return z;
    }
    finderPenaltyCountPatterns(runHistory) {
      const n = runHistory[1];
      assert(n <= this.size * 3);
      const core = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
      return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
    }
    finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
      if (currentRunColor) {
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        currentRunLength = 0;
      }
      currentRunLength += this.size;
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      return this.finderPenaltyCountPatterns(runHistory);
    }
    finderPenaltyAddHistory(currentRunLength, runHistory) {
      if (runHistory[0] == 0) currentRunLength += this.size;
      runHistory.pop();
      runHistory.unshift(currentRunLength);
    }
    static MIN_VERSION = 1;
    static MAX_VERSION = 40;
    static PENALTY_N1 = 3;
    static PENALTY_N2 = 3;
    static PENALTY_N3 = 40;
    static PENALTY_N4 = 10;
    static ECC_CODEWORDS_PER_BLOCK = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]];
    static NUM_ERROR_CORRECTION_BLOCKS = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]];
  }
  _qrcodegen.QrCode = QrCode;
  function appendBits(val, len, bb) {
    if (len < 0 || len > 31 || val >>> len != 0) throw new RangeError("Value out of range");
    for (let i = len - 1; i >= 0; i--) bb.push(val >>> i & 1);
  }
  function getBit(x, i) {
    return (x >>> i & 1) != 0;
  }
  function assert(cond) {
    if (!cond) throw new Error("Assertion error");
  }
  class QrSegment {
    static makeBytes(data) {
      let bb = [];
      for (const b of data) appendBits(b, 8, bb);
      return new QrSegment(QrSegment.Mode.BYTE, data.length, bb);
    }
    static makeNumeric(digits) {
      if (!QrSegment.isNumeric(digits)) throw new RangeError("String contains non-numeric characters");
      let bb = [];
      for (let i = 0; i < digits.length;) {
        const n = Math.min(digits.length - i, 3);
        appendBits(parseInt(digits.substr(i, n), 10), n * 3 + 1, bb);
        i += n;
      }
      return new QrSegment(QrSegment.Mode.NUMERIC, digits.length, bb);
    }
    static makeAlphanumeric(text) {
      if (!QrSegment.isAlphanumeric(text)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
      let bb = [];
      let i;
      for (i = 0; i + 2 <= text.length; i += 2) {
        let temp = QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
        temp += QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
        appendBits(temp, 11, bb);
      }
      if (i < text.length) appendBits(QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
      return new QrSegment(QrSegment.Mode.ALPHANUMERIC, text.length, bb);
    }
    static makeSegments(text) {
      if (text == "") return [];else if (QrSegment.isNumeric(text)) return [QrSegment.makeNumeric(text)];else if (QrSegment.isAlphanumeric(text)) return [QrSegment.makeAlphanumeric(text)];else return [QrSegment.makeBytes(QrSegment.toUtf8ByteArray(text))];
    }
    static makeEci(assignVal) {
      let bb = [];
      if (assignVal < 0) throw new RangeError("ECI assignment value out of range");else if (assignVal < 1 << 7) appendBits(assignVal, 8, bb);else if (assignVal < 1 << 14) {
        appendBits(0b10, 2, bb);
        appendBits(assignVal, 14, bb);
      } else if (assignVal < 1000000) {
        appendBits(0b110, 3, bb);
        appendBits(assignVal, 21, bb);
      } else throw new RangeError("ECI assignment value out of range");
      return new QrSegment(QrSegment.Mode.ECI, 0, bb);
    }
    static isNumeric(text) {
      return QrSegment.NUMERIC_REGEX.test(text);
    }
    static isAlphanumeric(text) {
      return QrSegment.ALPHANUMERIC_REGEX.test(text);
    }
    constructor(mode, numChars, bitData) {
      this.mode = mode;
      this.numChars = numChars;
      this.bitData = bitData;
      if (numChars < 0) throw new RangeError("Invalid argument");
      this.bitData = bitData.slice();
    }
    getData() {
      return this.bitData.slice();
    }
    static getTotalBits(segs, version) {
      let result = 0;
      for (const seg of segs) {
        const ccbits = seg.mode.numCharCountBits(version);
        if (seg.numChars >= 1 << ccbits) return Infinity;
        result += 4 + ccbits + seg.bitData.length;
      }
      return result;
    }
    static toUtf8ByteArray(str) {
      str = encodeURI(str);
      let result = [];
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != "%") result.push(str.charCodeAt(i));else {
          result.push(parseInt(str.substr(i + 1, 2), 16));
          i += 2;
        }
      }
      return result;
    }
    static NUMERIC_REGEX = /^[0-9]*$/;
    static ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/;
    static ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
  }
  _qrcodegen.QrSegment = QrSegment;
})(qrcodegen || (qrcodegen = {}));
(function (_qrcodegen2) {
  let QrCode;
  (function (_QrCode) {
    class Ecc {
      static LOW = new Ecc(0, 1);
      static MEDIUM = new Ecc(1, 0);
      static QUARTILE = new Ecc(2, 3);
      static HIGH = new Ecc(3, 2);
      constructor(ordinal, formatBits) {
        this.ordinal = ordinal;
        this.formatBits = formatBits;
      }
    }
    _QrCode.Ecc = Ecc;
  })(QrCode || (QrCode = _qrcodegen2.QrCode || (_qrcodegen2.QrCode = {})));
})(qrcodegen || (qrcodegen = {}));
(function (_qrcodegen3) {
  let QrSegment;
  (function (_QrSegment) {
    class Mode {
      static NUMERIC = new Mode(0x1, [10, 12, 14]);
      static ALPHANUMERIC = new Mode(0x2, [9, 11, 13]);
      static BYTE = new Mode(0x4, [8, 16, 16]);
      static KANJI = new Mode(0x8, [8, 10, 12]);
      static ECI = new Mode(0x7, [0, 0, 0]);
      constructor(modeBits, numBitsCharCount) {
        this.modeBits = modeBits;
        this.numBitsCharCount = numBitsCharCount;
      }
      numCharCountBits(ver) {
        return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
      }
    }
    _QrSegment.Mode = Mode;
  })(QrSegment || (QrSegment = _qrcodegen3.QrSegment || (_qrcodegen3.QrSegment = {})));
})(qrcodegen || (qrcodegen = {}));
var qrcodegen$1 = qrcodegen;

const EOM_QRCode = props => {
  const [local, others] = libs.splitProps(props, ["value", "qrcodesize", "imageSrc"]);
  const {
    value,
    qrcodesize,
    imageSrc
  } = local;
  const [qrcode, setQrcode] = libs.createSignal(qrcodegen$1.QrCode.encodeText(local.value, qrcodegen$1.QrCode.Ecc.QUARTILE));
  const defaultStyle = () => {
    let size = qrcode().size;
    const pixSize = Math.floor(qrcodesize / size);
    return {
      width: qrcodesize + pixSize * 2 + "px",
      height: qrcodesize + pixSize * 2 + "px",
      backgroundColor: "white"
    };
  };
  let size = qrcode().size;
  const pixSize = Math.floor(qrcodesize / size);
  const style = libs.mergeProps(others, defaultStyle());
  libs.createEffect(() => {
    $.Msg("支付渠道ICON==========", imageSrc);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", style, null);
    libs.spread(_el$, style, true);
    libs.insert(_el$, libs.createComponent(EOMChildren.GenericPanel2, {
      type: "UICanvas",
      style: {
        width: `${size * pixSize}px`,
        height: `${size * pixSize}px`,
        horizontalAlign: "center",
        verticalAlign: "center"
      },
      onload: canvas => {
        canvas.ClearJS("#00000000");
        for (let x = 0; x < size; ++x) {
          for (let y = 0; y < size; ++y) {
            if (qrcode().getModule(x, y)) {
              canvas.DrawSoftLinePointsJS(2, [x * pixSize, (y + 0.5) * pixSize, (x + 1) * pixSize, (y + 0.5) * pixSize], pixSize, 0, "#000000");
            }
          }
        }
      }
    }), null);
    libs.insert(_el$, imageSrc && (() => {
      const _el$2 = libs.createElement("Image", {
        src: imageSrc
      }, null);
      libs.setProp(_el$2, "src", imageSrc);
      libs.setProp(_el$2, "style", {
        backgroundColor: "white",
        width: qrcodesize * 0.28 + "px",
        height: qrcodesize * 0.28 + "px",
        horizontalAlign: "center",
        verticalAlign: "center",
        zIndex: 100
      });
      return _el$2;
    })(), null);
    return _el$;
  })();
};

GameEvents.Subscribe("order_payed", event => {
  if (event.state == 1) {
    CustomUIConfig.showPopup("PaymentSuccess", {
      product_id: event.p_id,
      count: event.count
    });
  }
});
function RequestPaymentOrder(data, callback) {
  let request = {
    title: GetLocalization("#" + data.product_id),
    body: GetLocalization("#" + data.product_id + "_description"),
    product_id: data.product_id,
    product_num: data.count,
    country: CustomUIConfig.__LocalISOCode ?? "",
    unique: data.unique,
    fast: data.fast ? 1 : 0
  };
  let pay_type = finiteNumber(Number(data.pay_way), -1);
  if (pay_type == -1) {
    pay_type = KeyValues.payments_order[data.pay_way]?.pid ?? -1;
  }
  if (pay_type == -1) {
    return "";
  }
  request.pay_type = pay_type;
  return ServerRequest("order_create", request, data => {
    if (data.status == 0) {
      callback(true, data.data.order_link);
    } else {
      callback(false, "Error: 404");
    }
  });
}
function recordPaymentHistory(payWay) {
  let max = 3;
  let historyList = [];
  const config = getServiceNetData("player_key_values", Players.GetLocalPlayer())?.["order_payway_history"];
  if (config != undefined) {
    historyList = config.value.split(",");
  }
  let sameRecord = {};
  historyList.unshift(payWay);
  historyList = historyList.filter(item => {
    if (sameRecord[item]) {
      return false;
    }
    sameRecord[item] = true;
    return true;
  });
  if (historyList.length > max) {
    historyList = historyList.slice(0, max);
  }
  GameEvents.SendCustomEventToServer("order_payway_history", {
    key: historyList.join(",")
  });
  return historyList;
}
function getPaymentHistory() {
  const config = getServiceNetData("player_key_values", Players.GetLocalPlayer())?.["order_payway_history"];
  if (config != undefined) {
    return (config?.value ?? "").split(",").filter(item => KeyValues.payments_order[item] != undefined).slice(0, 3);
  }
  return [];
}
const language = Language();
const Popup_PaymentOrder = props => {
  const [local, others] = libs.splitProps(props, ["itemData", "PopupID", "group", "count"]);
  const {
    itemData,
    count,
    group,
    PopupID
  } = local;
  const [tab, setTab] = libs.createSignal(0);
  const [filteredRegionIndex, setFilteredRegionIndex] = libs.createSignal(-1);
  const [searchText, setSearchText] = libs.createSignal("");
  const ChineseDefaultPayWay = ["Alipay", "WeChat_Pay"];
  const [qrinfo, setQrinfo] = libs.createStore({});
  const [payStateConfirm, setPayStateConfirm] = libs.createSignal(false);
  const mainPaymentList = [];
  let otherDefaultList = [];
  let paymentsRegions = [];
  let payPopupUnique = "";
  function createNewPopupUnique() {
    if (payPopupUnique != "") {
      payUniqueList = payUniqueList.filter(v => v != payPopupUnique);
    }
    payPopupUnique = DoUniqueString(Players.GetLocalPlayer().toString() + "_");
  }
  let payUniqueList = [];
  createNewPopupUnique();
  const [historyPaymentList, setHistoryPaymentList] = libs.createSignal(getPaymentHistory());
  function PaymentWaySort(list, all = false) {
    return list.sort((a, b) => multiCompare(all ? (KeyValues.payments_order[b].region == "" ? 1 : 0) - (KeyValues.payments_order[a].region == "" ? 1 : 0) : (KeyValues.payments_order[a].region == "" ? 1 : 0) - (KeyValues.payments_order[b].region == "" ? 1 : 0), finiteNumber(KeyValues.payments_order[b].order, 0) - finiteNumber(KeyValues.payments_order[a].order, 0), a < b ? -1 : a > b ? 1 : 0));
  }
  {
    const BLACK_LIST = {
      ["russian"]: {
        main: ["VISA_MasterCard__Global", "PayPal_Global", "YooMoney_RU", "SBP_RU"],
        others: []
      },
      ["english"]: {
        main: [],
        others: ["YooMoney_RU"]
      }
    };
    Object.keys(KeyValues.payments_order).forEach(key => {
      if (KeyValues.payments_order[key].state != 1) {
        return;
      }
      let region = KeyValues.payments_order[key].region ?? "";
      if (region != "" && !paymentsRegions.includes(region)) {
        paymentsRegions.push(region);
      }
      let flag = false;
      if (language == "schinese") {
        flag = region == "CN";
      } else if (language == "russian") {
        flag = region == "RU" || region == "";
      } else {
        flag = region == "";
      }
      if (flag) {
        if (!BLACK_LIST[language]?.main?.includes(key)) {
          mainPaymentList.push(key);
        }
      }
      if (!BLACK_LIST[language]?.others?.includes(key)) {
        otherDefaultList.push(key);
      }
    });
    otherDefaultList = PaymentWaySort(otherDefaultList, true);
    paymentsRegions = paymentsRegions.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    paymentsRegions.push("Global");
  }
  const [filteredPaymentList, setFilteredPaymentList] = libs.createSignal([]);
  libs.createEffect(() => {
    let filteredRegion = "";
    let otherList = otherDefaultList.concat([]);
    if (filteredRegionIndex() >= 0) {
      filteredRegion = paymentsRegions[filteredRegionIndex()];
      otherList = otherList.filter(v => KeyValues.payments_order[v].region == filteredRegion || KeyValues.payments_order[v].region == "" || KeyValues.payments_order[v].region == undefined);
    }
    if (searchText() != "") {
      let filteredList = [];
      let entries = searchText().toLowerCase().split(" ").filter(s => s != "");
      otherList.filter(key => {
        let localize = GetLocalization("#PaymentWay_" + key).toLowerCase();
        if (entries.some(v => localize.includes(v) || key.toLowerCase().includes(v))) {
          filteredList.push(key);
        }
      });
      setFilteredPaymentList(PaymentWaySort(filteredList, filteredRegionIndex() == -1));
    } else {
      setFilteredPaymentList(PaymentWaySort(otherList, filteredRegionIndex() == -1));
    }
  });
  if (language == "schinese") {
    libs.onMount(() => {
      let requestIDList = [];
      ChineseDefaultPayWay.forEach(payWay => {
        let unique = DoUniqueString(Players.GetLocalPlayer().toString() + "_");
        payUniqueList.push(unique);
        requestIDList.push(RequestPaymentOrder({
          product_id: itemData.id,
          count: count,
          pay_way: payWay,
          unique: unique,
          fast: true
        }, (success, msg) => {
          if (success && msg) {
            setQrinfo(payWay, msg);
          }
        }));
      });
      libs.onCleanup(() => {
        requestIDList.forEach(id => CancelRequest(id));
      });
    });
  }
  libs.onMount(() => {
    let id = GameEvents.Subscribe("order_payed", event => {
      if (payUniqueList.includes(event.unique)) {
        if (event.state == 1) {
          ClosePopup(PopupID);
        } else {
          setPayStateConfirm(false);
        }
      }
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
  });
  function showOrderCreaterPopup(way) {
    setHistoryPaymentList(recordPaymentHistory(way));
    CustomUIConfig.showPopup("PaymentOrderCreater", {
      product_id: itemData.id,
      count: count,
      pay_way: way,
      unique: payPopupUnique
    });
    payUniqueList.push(payPopupUnique);
    setPayStateConfirm(true);
  }
  libs.onCleanup(() => {
    payUniqueList.forEach(unique => {
      GameEvents.SendCustomEventToServer("order_pay_choice", {
        unique: unique,
        state: 0
      });
    });
  });
  let payment_currency = () => {
    let dollarMark = "￥";
    if (language == "english") {
      dollarMark = "$";
    } else if (language == "russian") {
      dollarMark = "₽";
    }
    return dollarMark;
  };
  return libs.createComponent(BasePopup, {
    PopupID: PopupID,
    group: group,
    "class": "Popup_PaymentOrder",
    title: "#Popup_StoreMoneyPayment_Title",
    closeOnClickOuter: false,
    closeOnEsc: false,
    get children() {
      return libs.createComponent(libs.Show, {
        get when() {
          return !payStateConfirm();
        },
        get fallback() {
          return [(() => {
            const _el$17 = libs.createElement("Panel", {
                align: "center center",
                id: "PaymentOrderMain",
                "class": language
              }, null),
              _el$18 = libs.createElement("Label", {
                horizontalAlign: "center",
                marginTop: "175px",
                text: "#PaymentOrder_isPaid"
              }, _el$17);
            libs.setProp(_el$17, "align", "center center");
            libs.setProp(_el$17, "class", language);
            libs.setProp(_el$18, "horizontalAlign", "center");
            libs.setProp(_el$18, "marginTop", "175px");
            return _el$17;
          })(), (() => {
            const _el$19 = libs.createElement("Panel", {
              id: "PaymentOrderBottom"
            }, null);
            libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_Button, {
              align: "center center",
              marginLeft: "300px",
              color: "Confirm",
              text: "#PaymentOrder_Payed",
              onactivate: () => {
                setPayStateConfirm(false);
                GameEvents.SendCustomEventToServer("order_pay_choice", {
                  unique: payPopupUnique,
                  state: 1
                });
                createNewPopupUnique();
              }
            }), null);
            libs.insert(_el$19, libs.createComponent(EOM_Button.EOM_Button, {
              align: "center center",
              marginRight: "300px",
              color: "Cancel",
              text: "#PaymentOrder_NotPayed",
              onactivate: () => {
                setPayStateConfirm(false);
                GameEvents.SendCustomEventToServer("order_pay_choice", {
                  unique: payPopupUnique,
                  state: 0
                });
                createNewPopupUnique();
              }
            }), null);
            return _el$19;
          })()];
        },
        get children() {
          return [(() => {
            const _el$ = libs.createElement("Panel", {
                id: "PaymentOrderTitle"
              }, null),
              _el$2 = libs.createElement("Panel", {
                id: "PaymentOrderInfo"
              }, _el$),
              _el$3 = libs.createElement("Label", {
                "class": "PaymentTitleLabel",
                get text() {
                  return GetLocalization("#StoreItemName") + ":";
                }
              }, _el$2),
              _el$4 = libs.createElement("Label", {
                width: "150px",
                textOverflow: "shrink",
                marginRight: "20px",
                get text() {
                  return "#" + props.itemData.id;
                }
              }, _el$2),
              _el$5 = libs.createElement("Label", {
                "class": "PaymentTitleLabel",
                get text() {
                  return GetLocalization("#PaymentAmount") + ":";
                }
              }, _el$2),
              _el$6 = libs.createElement("Label", {
                color: "#FFD05F",
                fontSize: "24px",
                get text() {
                  return GetStoreItemCost(itemData, count) + payment_currency();
                }
              }, _el$2),
              _el$7 = libs.createElement("Panel", {
                id: "PaymentOrderSearcher"
              }, _el$);
            libs.setProp(_el$4, "width", "150px");
            libs.setProp(_el$4, "marginRight", "20px");
            libs.insert(_el$7, libs.createComponent(EOM_DropDown.EOM_DropDown, {
              id: "RegionFilterDropDown",
              placeholder: "#PaymentRegion_Choice",
              hasClear: true,
              onChange: (index, item) => {
                setFilteredRegionIndex(index);
              },
              onClear: () => {
                setFilteredRegionIndex(-1);
              },
              get children() {
                return paymentsRegions.map(region => (() => {
                  const _el$20 = libs.createElement("Label", {
                    text: `#PaymentRegion_${region}`
                  }, null);
                  libs.setProp(_el$20, "text", `#PaymentRegion_${region}`);
                  return _el$20;
                })());
              }
            }), null);
            libs.insert(_el$7, libs.createComponent(EOM_SearchBox.EOM_SearchBox, {
              onSearch: text => {
                setSearchText(text);
              }
            }), null);
            libs.effect(_p$ => {
              const _v$ = GetLocalization("#StoreItemName") + ":",
                _v$2 = "#" + props.itemData.id,
                _v$3 = GetLocalization("#PaymentAmount") + ":",
                _v$4 = GetStoreItemCost(itemData, count) + payment_currency(),
                _v$5 = tab() == 1;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "text", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$7, "visible", _v$5, _p$._v$5));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined,
              _v$3: undefined,
              _v$4: undefined,
              _v$5: undefined
            });
            return _el$;
          })(), (() => {
            const _el$8 = libs.createElement("Panel", {
              id: "PaymentOrderMain",
              "class": language
            }, null);
            libs.setProp(_el$8, "class", language);
            libs.insert(_el$8, libs.createComponent(libs.Switch, {
              get children() {
                return [libs.createComponent(libs.Match, {
                  get when() {
                    return tab() == 1;
                  },
                  get children() {
                    const _el$9 = libs.createElement("Panel", {
                      height: "100%"
                    }, null);
                    libs.setProp(_el$9, "className", "PaymentsTypeList");
                    libs.setProp(_el$9, "height", "100%");
                    libs.insert(_el$9, libs.createComponent(libs.For, {
                      get each() {
                        return filteredPaymentList();
                      },
                      children: payWay => {
                        return (() => {
                          const _el$21 = libs.createElement("Panel", {}, null),
                            _el$22 = libs.createElement("Image", {
                              src: `file://{images}/custom_game/payment/payermax_icon/${payWay}.png`
                            }, _el$21);
                          libs.setProp(_el$21, "className", "Paytype");
                          libs.setProp(_el$21, "onactivate", () => showOrderCreaterPopup(payWay));
                          libs.setProp(_el$22, "src", `file://{images}/custom_game/payment/payermax_icon/${payWay}.png`);
                          return _el$21;
                        })();
                      }
                    }));
                    return _el$9;
                  }
                }), libs.createComponent(libs.Match, {
                  get when() {
                    return tab() == 0;
                  },
                  get children() {
                    return libs.createComponent(libs.Show, {
                      when: language != "schinese",
                      get fallback() {
                        return (() => {
                          const _el$23 = libs.createElement("Panel", {
                            align: "center center",
                            flowChildren: "right"
                          }, null);
                          libs.setProp(_el$23, "align", "center center");
                          libs.setProp(_el$23, "flowChildren", "right");
                          libs.insert(_el$23, () => ChineseDefaultPayWay.map(payType => {
                            return (() => {
                              const _el$24 = libs.createElement("Panel", {
                                width: "250px",
                                height: "250px",
                                margin: "0 40px"
                              }, null);
                              libs.setProp(_el$24, "width", "250px");
                              libs.setProp(_el$24, "height", "250px");
                              libs.setProp(_el$24, "margin", "0 40px");
                              libs.insert(_el$24, libs.createComponent(libs.Show, {
                                get when() {
                                  return qrinfo[payType] != undefined;
                                },
                                get fallback() {
                                  return libs.createComponent(EOM_Loading.EOM_Loading, {
                                    align: "center center",
                                    type: "Wave"
                                  });
                                },
                                get children() {
                                  return libs.createComponent(EOM_QRCode, {
                                    align: "center center",
                                    get value() {
                                      return qrinfo[payType];
                                    },
                                    qrcodesize: 200,
                                    imageSrc: `file://{images}/custom_game/payment/${payType}_logo.png`
                                  });
                                }
                              }));
                              return _el$24;
                            })();
                          }));
                          return _el$23;
                        })();
                      },
                      get children() {
                        return [libs.createComponent(libs.Show, {
                          get when() {
                            return historyPaymentList().length > 0;
                          },
                          get children() {
                            const _el$0 = libs.createElement("Panel", {
                                width: "100%",
                                flowChildren: "right"
                              }, null),
                              _el$1 = libs.createElement("Label", {
                                "class": "PaymentTitleLabel",
                                marginTop: "40px",
                                text: "#PaymentWayLast"
                              }, _el$0),
                              _el$10 = libs.createElement("Panel", {}, _el$0);
                            libs.setProp(_el$0, "width", "100%");
                            libs.setProp(_el$0, "flowChildren", "right");
                            libs.setProp(_el$1, "marginTop", "40px");
                            libs.setProp(_el$10, "className", "PaymentsTypeList NoBorder");
                            libs.insert(_el$10, libs.createComponent(libs.For, {
                              get each() {
                                return historyPaymentList();
                              },
                              children: payWay => (() => {
                                const _el$25 = libs.createElement("Panel", {}, null),
                                  _el$26 = libs.createElement("Image", {
                                    src: `file://{images}/custom_game/payment/payermax_icon/${payWay}.png`
                                  }, _el$25);
                                libs.setProp(_el$25, "className", "Paytype");
                                libs.setProp(_el$25, "onactivate", () => showOrderCreaterPopup(payWay));
                                libs.setProp(_el$26, "src", `file://{images}/custom_game/payment/payermax_icon/${payWay}.png`);
                                return _el$25;
                              })()
                            }));
                            return _el$0;
                          }
                        }), (() => {
                          const _el$11 = libs.createElement("Panel", {
                              width: "100%",
                              marginTop: "50px",
                              flowChildren: "right"
                            }, null),
                            _el$12 = libs.createElement("Label", {
                              "class": "PaymentTitleLabel",
                              marginTop: "40px",
                              text: "#PaymentWayUsual"
                            }, _el$11),
                            _el$13 = libs.createElement("Panel", {}, _el$11);
                          libs.setProp(_el$11, "width", "100%");
                          libs.setProp(_el$11, "marginTop", "50px");
                          libs.setProp(_el$11, "flowChildren", "right");
                          libs.setProp(_el$12, "marginTop", "40px");
                          libs.setProp(_el$13, "className", "PaymentsTypeList NoBorder");
                          libs.insert(_el$13, libs.createComponent(libs.For, {
                            each: mainPaymentList,
                            children: payWay => (() => {
                              const _el$27 = libs.createElement("Panel", {}, null),
                                _el$28 = libs.createElement("Image", {
                                  src: `file://{images}/custom_game/payment/payermax_icon/${payWay}.png`
                                }, _el$27);
                              libs.setProp(_el$27, "className", "Paytype");
                              libs.setProp(_el$27, "onactivate", () => showOrderCreaterPopup(payWay));
                              libs.setProp(_el$28, "src", `file://{images}/custom_game/payment/payermax_icon/${payWay}.png`);
                              return _el$27;
                            })()
                          }));
                          return _el$11;
                        })()];
                      }
                    });
                  }
                })];
              }
            }));
            return _el$8;
          })(), (() => {
            const _el$14 = libs.createElement("Panel", {
              id: "PaymentOrderBottom"
            }, null);
            libs.insert(_el$14, libs.createComponent(libs.Show, {
              get when() {
                return tab();
              },
              get fallback() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  "class": "PaymentOrderTabButton",
                  onactivate: () => setTab(1),
                  get children() {
                    return [libs.createElement("Panel", {
                      id: "PaymentOrderTabButtonBG"
                    }, null), libs.createElement("Label", {
                      text: "#PaymentMoreType"
                    }, null)];
                  }
                });
              },
              get children() {
                return libs.createComponent(EOM_Button.EOM_BaseButton, {
                  "class": "PaymentOrderTabButton reverse",
                  onactivate: () => setTab(0),
                  get children() {
                    return [libs.createElement("Panel", {
                      id: "PaymentOrderTabButtonBG"
                    }, null), libs.createElement("Label", {
                      text: "#PaymentNormalType"
                    }, null)];
                  }
                });
              }
            }));
            return _el$14;
          })()];
        }
      });
    }
  });
};
const Popup_PaymentOrderCreater = props => {
  const [local, others] = libs.splitProps(props, ["product_id", "PopupID", "group", "count", "unique", "pay_way"]);
  const {
    product_id,
    count,
    unique,
    pay_way,
    group,
    PopupID
  } = local;
  let isQRCode = KeyValues.payments_order[pay_way]?.QRCode == 1;
  const [state, setState] = libs.createSignal(0);
  const [msg, setMsg] = libs.createSignal("");
  libs.onMount(() => {
    let requestID = RequestPaymentOrder({
      product_id: product_id,
      count: count,
      pay_way: pay_way,
      unique: unique
    }, (success, msg) => {
      libs.batch(() => {
        if (success) {
          if (isQRCode) {
            setState(2);
          } else {
            if (msg) {
              $.DispatchEvent("ExternalBrowserGoToURL", msg);
            }
            setState(1);
          }
        } else {
          setState(-1);
        }
        setMsg(msg ?? "");
      });
    });
    let id = GameEvents.Subscribe("order_payed", event => {
      if (event.unique == unique) {
        ClosePopup(PopupID);
      }
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(id);
    });
    libs.onCleanup(() => {
      CancelRequest(requestID);
    });
  });
  return libs.createComponent(BasePopup, {
    PopupID: PopupID,
    group: group,
    "class": "Popup_PaymentOrderCreater",
    title: "#Popup_StoreMoneyPayment_Title",
    closeOnClickOuter: false,
    closeOnEsc: false,
    get children() {
      return [(() => {
        const _el$31 = libs.createElement("Panel", {
            width: "100%",
            height: "450px",
            horizontalAlign: "center"
          }, null),
          _el$32 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "down"
          }, _el$31);
        libs.setProp(_el$31, "width", "100%");
        libs.setProp(_el$31, "height", "450px");
        libs.setProp(_el$31, "horizontalAlign", "center");
        libs.setProp(_el$32, "align", "center center");
        libs.setProp(_el$32, "flowChildren", "down");
        libs.insert(_el$32, libs.createComponent(libs.Switch, {
          get children() {
            return [libs.createComponent(libs.Match, {
              get when() {
                return state() == 0;
              },
              get children() {
                return [libs.createElement("Label", {
                  "class": "PopupMainLabel",
                  text: "#PaymentOrder_OrderCreating"
                }, null), libs.createComponent(EOM_Loading.EOM_Loading, {
                  horizontalAlign: "center",
                  type: "Wave"
                })];
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return state() == 1;
              },
              get children() {
                return [libs.createElement("Label", {
                  "class": "PopupMainLabel",
                  text: "#PaymentOrder_OrderCreated"
                }, null), (() => {
                  const _el$35 = libs.createElement("Label", {
                    "class": "PopupMainLabel",
                    id: "BrowserUrl",
                    text: "#PaymentOrder_OrderCreatedLink"
                  }, null);
                  libs.setProp(_el$35, "onactivate", () => {
                    $.DispatchEvent("CopyStringToClipboard", msg(), null);
                  });
                  return _el$35;
                })()];
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return state() == 2;
              },
              get children() {
                return libs.createComponent(EOM_QRCode, {
                  align: "center center",
                  get value() {
                    return msg();
                  },
                  qrcodesize: 200,
                  imageSrc: `file://{images}/custom_game/payment/${pay_way}_logo.png`
                });
              }
            }), libs.createComponent(libs.Match, {
              get when() {
                return state() == -1;
              },
              get children() {
                return [libs.createElement("Image", {
                  "class": "PaymentOrderStateIcon Failure"
                }, null), (() => {
                  const _el$37 = libs.createElement("Label", {
                    "class": "PopupMainLabel",
                    text: "#PaymentOrder_Failure",
                    get dialogVariables() {
                      return {
                        error: msg()
                      };
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$37, "dialogVariables", {
                    error: msg()
                  }, _$p));
                  return _el$37;
                })()];
              }
            })];
          }
        }));
        return _el$31;
      })(), (() => {
        const _el$38 = libs.createElement("Panel", {
          align: "center bottom",
          flowChildren: "right"
        }, null);
        libs.setProp(_el$38, "align", "center bottom");
        libs.setProp(_el$38, "flowChildren", "right");
        libs.insert(_el$38, libs.createComponent(EOM_Button.EOM_Button, {
          text: "#Popup_Button_Cancel",
          onactivate: () => {
            ClosePopup(PopupID);
          }
        }));
        return _el$38;
      })()];
    }
  });
};
const Popup_PaymentSuccess = props => {
  const [local, others] = libs.splitProps(props, ["product_id", "PopupID", "group", "count"]);
  const {
    product_id,
    count,
    group,
    PopupID
  } = local;
  let itemData = undefined;
  Object.values(KeyValues.info_shop_product ?? {}).forEach(item => {
    if (itemData == undefined && item.id == product_id) {
      itemData = item;
    }
  });
  let cost = itemData != undefined ? GetStoreItemCost(itemData, count) : undefined;
  let payment_currency = () => {
    let dollarMark = "￥";
    if (language == "english") {
      dollarMark = "$";
    } else if (language == "russian") {
      dollarMark = "₽";
    }
    return dollarMark;
  };
  return libs.createComponent(BasePopup, {
    PopupID: PopupID,
    group: group,
    "class": "Popup_PaymentSuccess",
    title: "#Popup_StoreMoneyPayment_Title",
    closeOnClickOuter: true,
    closeOnEsc: true,
    size: "small",
    get children() {
      const _el$39 = libs.createElement("Panel", {
          width: "100%",
          height: "450px",
          horizontalAlign: "center"
        }, null),
        _el$40 = libs.createElement("Panel", {
          align: "center center",
          flowChildren: "down"
        }, _el$39),
        _el$41 = libs.createElement("Panel", {
          horizontalAlign: "center",
          flowChildren: "right",
          marginBottom: "50px"
        }, _el$40),
        _el$42 = libs.createElement("Label", {
          "class": "PaymentTitleLabel",
          fontSize: "24px",
          get text() {
            return GetLocalization("#StoreItemName") + ":";
          }
        }, _el$41),
        _el$43 = libs.createElement("Label", {
          width: "150px",
          fontSize: "24px",
          color: "#fff",
          textOverflow: "shrink",
          marginRight: "20px",
          text: "#" + product_id
        }, _el$41);
        libs.createElement("Image", {
          "class": "PaymentOrderStateIcon Success"
        }, _el$40);
        const _el$47 = libs.createElement("Label", {
          marginTop: "20px",
          horizontalAlign: "center",
          text: "#PaymentOrder_Success"
        }, _el$40);
      libs.setProp(_el$39, "width", "100%");
      libs.setProp(_el$39, "height", "450px");
      libs.setProp(_el$39, "horizontalAlign", "center");
      libs.setProp(_el$40, "align", "center center");
      libs.setProp(_el$40, "flowChildren", "down");
      libs.setProp(_el$41, "horizontalAlign", "center");
      libs.setProp(_el$41, "flowChildren", "right");
      libs.setProp(_el$41, "marginBottom", "50px");
      libs.setProp(_el$43, "width", "150px");
      libs.setProp(_el$43, "marginRight", "20px");
      libs.setProp(_el$43, "text", "#" + product_id);
      libs.insert(_el$41, libs.createComponent(libs.Show, {
        when: cost != undefined,
        get children() {
          return [(() => {
            const _el$44 = libs.createElement("Label", {
              "class": "PaymentTitleLabel",
              fontSize: "24px",
              get text() {
                return GetLocalization("#PaymentAmount") + ":";
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$44, "text", GetLocalization("#PaymentAmount") + ":", _$p));
            return _el$44;
          })(), (() => {
            const _el$45 = libs.createElement("Label", {
              color: "#FFD05F",
              fontSize: "24px",
              get text() {
                return cost + payment_currency();
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$45, "text", cost + payment_currency(), _$p));
            return _el$45;
          })()];
        }
      }), null);
      libs.setProp(_el$47, "marginTop", "20px");
      libs.setProp(_el$47, "horizontalAlign", "center");
      libs.effect(_$p => libs.setProp(_el$42, "text", GetLocalization("#StoreItemName") + ":", _$p));
      return _el$39;
    }
  });
};

const RECORDS_PER_PAGE = 5;
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
}
function formatPower(value) {
  if (value == "") return "-";
  const power = Number(value);
  return isNaN(power) ? value : FormatNumber(power, 2);
}
const Popup_PvpCombatLog = props => {
  const [currentPage, setCurrentPage] = libs.createSignal(1);
  const [recordSide, setRecordSide] = libs.createSignal("attack");
  const [recordCache, setRecordCache] = libs.createSignal({});
  const records = libs.createMemo(() => recordCache()[recordSide()] ?? []);
  const totalPages = libs.createMemo(() => Math.max(1, Math.ceil(records().length / RECORDS_PER_PAGE)));
  const pageRecords = libs.createMemo(() => {
    const start = (currentPage() - 1) * RECORDS_PER_PAGE;
    return records().slice(start, start + RECORDS_PER_PAGE);
  });
  libs.createEffect(() => {
    $.Msg(pageRecords());
  });
  libs.createEffect(() => {
    const side = recordSide();
    if (recordCache()[side] !== undefined) return;
    CallActionRequest("/v1/pvp/fetch_records", {
      season_id: props.seasonID,
      limit: 10,
      as_attacker: side === "attack"
    }, result => {
      if (result.code != 0) return;
      setRecordCache(cache => ({
        ...cache,
        [side]: result.data.player_pvp_match_records ?? []
      }));
    }, undefined, false);
  });
  const selectRecordSide = side => {
    setRecordSide(side);
    setCurrentPage(1);
  };
  const goToPage = page => setCurrentPage(Math.max(1, Math.min(page, totalPages())));
  return libs.createComponent(BasePopup, {
    id: "Popup_PvpCombatLog",
    size: "large",
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    get title() {
      return GetLocalization("#PvpCombatLog_Title");
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "PvpCombatLogContent"
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "PvpRecordHeader"
          }, _el$),
          _el$3 = libs.createElement("Label", {
            "class": "PvpCol PvpColTime",
            get text() {
              return GetLocalization("#PvpCombatLog_Time");
            }
          }, _el$2),
          _el$4 = libs.createElement("Label", {
            "class": "PvpCol PvpColResult",
            get text() {
              return GetLocalization("#PvpCombatLog_Result");
            }
          }, _el$2),
          _el$5 = libs.createElement("Label", {
            "class": "PvpCol PvpColOpponent",
            get text() {
              return GetLocalization("#PvpCombatLog_Opponent");
            }
          }, _el$2),
          _el$6 = libs.createElement("Label", {
            "class": "PvpCol PvpColSelfPower",
            get text() {
              return GetLocalization("#PvpCombatLog_SelfPower");
            }
          }, _el$2),
          _el$7 = libs.createElement("Label", {
            "class": "PvpCol PvpColOpponentPower",
            get text() {
              return GetLocalization("#PvpCombatLog_OpponentPower");
            }
          }, _el$2),
          _el$8 = libs.createElement("Label", {
            "class": "PvpCol PvpColScore",
            get text() {
              return GetLocalization("#PvpCombatLog_Score");
            }
          }, _el$2),
          _el$9 = libs.createElement("Label", {
            "class": "PvpCol PvpColScore",
            get text() {
              return GetLocalization("#PvpCombatLog_OpponentScore");
            }
          }, _el$2);
          libs.createElement("Panel", {
            "class": "Line"
          }, _el$);
          const _el$1 = libs.createElement("Panel", {
            id: "PvpRecordList"
          }, _el$);
        libs.insert(_el$, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
          id: "PvpRecordTabs",
          get list() {
            return [GetLocalization("#PvpCombatLog_Attack"), GetLocalization("#PvpCombatLog_Defense")];
          },
          get selected() {
            return recordSide() === "attack" ? 1 : 2;
          },
          onChange: index => selectRecordSide(index === 0 ? "attack" : "defense")
        }), _el$2);
        libs.insert(_el$1, libs.createComponent(libs.For, {
          get each() {
            return pageRecords();
          },
          children: record => {
            const asAttacker = recordSide() === "attack";
            const won = asAttacker ? record.win : !record.win;
            const opponentUID = `${asAttacker ? record.target_uid : record.uid}`;
            const opponentIsBot = asAttacker && record.target_is_bot;
            const selfPower = asAttacker ? record.power : record.target_power;
            const opponentPower = asAttacker ? record.target_power : record.power;
            const selfStartScore = toFiniteNumber(asAttacker ? record.start_score : record.opponent_start_score);
            const selfEndScore = toFiniteNumber(asAttacker ? record.end_score : record.opponent_end_score);
            const opponentStartScore = toFiniteNumber(asAttacker ? record.opponent_start_score : record.start_score);
            const opponentEndScore = toFiniteNumber(asAttacker ? record.opponent_end_score : record.end_score);
            const selfScoreDelta = selfEndScore - selfStartScore;
            const opponentScoreDelta = opponentEndScore - opponentStartScore;
            return (() => {
              const _el$13 = libs.createElement("Panel", {
                  "class": "PvpRecordRow"
                }, null),
                _el$14 = libs.createElement("Label", {
                  "class": "PvpCol PvpColTime",
                  get text() {
                    return formatTime(record.start_time);
                  }
                }, _el$13),
                _el$15 = libs.createElement("Label", {
                  get ["class"]() {
                    return libs.classNames("PvpCol PvpColResult", won ? "Win" : "Lose");
                  },
                  get text() {
                    return GetLocalization(won ? "#CombatLog_Win" : "#CombatLog_Lose");
                  }
                }, _el$13),
                _el$16 = libs.createElement("Panel", {
                  "class": "PvpCol PvpColOpponent"
                }, _el$13),
                _el$18 = libs.createElement("Label", {
                  "class": "PvpCol PvpColSelfPower",
                  get text() {
                    return formatPower(selfPower);
                  }
                }, _el$13),
                _el$19 = libs.createElement("Label", {
                  "class": "PvpCol PvpColOpponentPower",
                  get text() {
                    return formatPower(opponentPower);
                  }
                }, _el$13),
                _el$20 = libs.createElement("Panel", {
                  "class": "PvpCol PvpColScore"
                }, _el$13),
                _el$21 = libs.createElement("Label", {
                  "class": "ScoreRange",
                  text: `${selfStartScore} → ${selfEndScore}`
                }, _el$20),
                _el$22 = libs.createElement("Label", {
                  get ["class"]() {
                    return libs.classNames("ScoreDelta", selfScoreDelta >= 0 ? "Positive" : "Negative");
                  },
                  text: `(${selfScoreDelta >= 0 ? "+" : ""}${selfScoreDelta})`
                }, _el$20),
                _el$23 = libs.createElement("Panel", {
                  "class": "PvpCol PvpColScore"
                }, _el$13),
                _el$24 = libs.createElement("Label", {
                  "class": "ScoreRange",
                  text: `${opponentStartScore} → ${opponentEndScore}`
                }, _el$23),
                _el$25 = libs.createElement("Label", {
                  get ["class"]() {
                    return libs.classNames("ScoreDelta", opponentScoreDelta >= 0 ? "Positive" : "Negative");
                  },
                  text: `(${opponentScoreDelta >= 0 ? "+" : ""}${opponentScoreDelta})`
                }, _el$23);
              libs.insert(_el$16, libs.createComponent(Player.AvatarBorder, {
                borderid: "1710000",
                get children() {
                  return [libs.createComponent(Player.EOM_Avatar, {
                    accountid: opponentIsBot ? "0" : opponentUID
                  }), (() => {
                    const _el$17 = libs.createElement("Panel", {
                      "class": "TipsArea"
                    }, null);
                    libs.setProp(_el$17, "customTooltip", opponentIsBot ? undefined : {
                      name: "player_info",
                      steam_id: opponentUID
                    });
                    return _el$17;
                  })()];
                }
              }), null);
              libs.insert(_el$16, libs.createComponent(libs.Show, {
                when: !opponentIsBot,
                get fallback() {
                  return (() => {
                    const _el$26 = libs.createElement("Label", {
                      "class": "OpponentName",
                      get text() {
                        return GetLocalization("#PvpCombatLog_Bot");
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$26, "text", GetLocalization("#PvpCombatLog_Bot"), _$p));
                    return _el$26;
                  })();
                },
                get children() {
                  return libs.createComponent(Player.PlayerName, {
                    "class": "OpponentName",
                    accountid: opponentUID
                  });
                }
              }), null);
              libs.setProp(_el$21, "text", `${selfStartScore} → ${selfEndScore}`);
              libs.setProp(_el$22, "text", `(${selfScoreDelta >= 0 ? "+" : ""}${selfScoreDelta})`);
              libs.setProp(_el$24, "text", `${opponentStartScore} → ${opponentEndScore}`);
              libs.setProp(_el$25, "text", `(${opponentScoreDelta >= 0 ? "+" : ""}${opponentScoreDelta})`);
              libs.effect(_p$ => {
                const _v$8 = formatTime(record.start_time),
                  _v$9 = libs.classNames("PvpCol PvpColResult", won ? "Win" : "Lose"),
                  _v$0 = GetLocalization(won ? "#CombatLog_Win" : "#CombatLog_Lose"),
                  _v$1 = formatPower(selfPower),
                  _v$10 = formatPower(opponentPower),
                  _v$11 = libs.classNames("ScoreDelta", selfScoreDelta >= 0 ? "Positive" : "Negative"),
                  _v$12 = libs.classNames("ScoreDelta", opponentScoreDelta >= 0 ? "Positive" : "Negative");
                _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$14, "text", _v$8, _p$._v$8));
                _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$15, "class", _v$9, _p$._v$9));
                _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$15, "text", _v$0, _p$._v$0));
                _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$18, "text", _v$1, _p$._v$1));
                _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$19, "text", _v$10, _p$._v$10));
                _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$22, "class", _v$11, _p$._v$11));
                _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$25, "class", _v$12, _p$._v$12));
                return _p$;
              }, {
                _v$8: undefined,
                _v$9: undefined,
                _v$0: undefined,
                _v$1: undefined,
                _v$10: undefined,
                _v$11: undefined,
                _v$12: undefined
              });
              return _el$13;
            })();
          }
        }), null);
        libs.insert(_el$1, libs.createComponent(libs.Show, {
          get when() {
            return pageRecords().length === 0;
          },
          get children() {
            const _el$10 = libs.createElement("Label", {
              "class": "EmptyPvpRecords",
              get text() {
                return GetLocalization("#PvpCombatLog_Empty");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$10, "text", GetLocalization("#PvpCombatLog_Empty"), _$p));
            return _el$10;
          }
        }), null);
        libs.effect(_p$ => {
          const _v$ = GetLocalization("#PvpCombatLog_Time"),
            _v$2 = GetLocalization("#PvpCombatLog_Result"),
            _v$3 = GetLocalization("#PvpCombatLog_Opponent"),
            _v$4 = GetLocalization("#PvpCombatLog_SelfPower"),
            _v$5 = GetLocalization("#PvpCombatLog_OpponentPower"),
            _v$6 = GetLocalization("#PvpCombatLog_Score"),
            _v$7 = GetLocalization("#PvpCombatLog_OpponentScore");
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$7, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$8, "text", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$9, "text", _v$7, _p$._v$7));
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
      })(), (() => {
        const _el$11 = libs.createElement("Panel", {
            id: "Pagination"
          }, null),
          _el$12 = libs.createElement("Label", {
            "class": "PageText",
            get text() {
              return `${currentPage()}/${totalPages()}`;
            }
          }, _el$11);
        libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "PageBtn PrevBtn",
          get enabled() {
            return currentPage() > 1;
          },
          onactivate: () => goToPage(currentPage() - 1)
        }), _el$12);
        libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "PageBtn NextBtn",
          get enabled() {
            return currentPage() < totalPages();
          },
          onactivate: () => goToPage(currentPage() + 1)
        }), null);
        libs.effect(_$p => libs.setProp(_el$12, "text", `${currentPage()}/${totalPages()}`, _$p));
        return _el$11;
      })()];
    }
  });
};

function Popup_PvpReward(props) {
  const rewardTiers = libs.createMemo(() => {
    const tiers = Object.entries(KeyValues.pvp_reward[String(props.seasonID)] ?? {}).map(([rank, reward]) => ({
      rank: Number(rank),
      textKey: reward.txt
    })).filter(tier => Number.isFinite(tier.rank) && tier.rank > 0).sort((a, b) => a.rank - b.rank);
    return tiers.map((tier, index) => ({
      ...tier,
      startRank: index === 0 ? 1 : tiers[index - 1].rank + 1
    }));
  });
  return libs.createComponent(BasePopup, {
    "class": "Popup_PvpReward",
    get title() {
      return GetLocalization("#PvpReward_Title");
    },
    get PopupID() {
      return props.PopupID;
    },
    get group() {
      return props.group;
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Label", {
          "class": "RewardDescription",
          html: true,
          get text() {
            return GetLocalization("#PvpReward_Description");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$, "text", GetLocalization("#PvpReward_Description"), _$p));
        return _el$;
      })(), (() => {
        const _el$2 = libs.createElement("Panel", {
            id: "CenterBlock",
            hittest: false
          }, null),
          _el$3 = libs.createElement("Panel", {
            "class": "RewardTierList VerticalScrollStyle",
            scroll: "y"
          }, _el$2);
        libs.setProp(_el$3, "scroll", "y");
        libs.insert(_el$3, libs.createComponent(libs.For, {
          get each() {
            return rewardTiers();
          },
          children: tier => (() => {
            const _el$5 = libs.createElement("Panel", {
                "class": "RewardTier"
              }, null),
              _el$6 = libs.createElement("Panel", {
                "class": "RankRequirement"
              }, _el$5),
              _el$7 = libs.createElement("Panel", {
                "class": "RankRequirementContent"
              }, _el$6),
              _el$9 = libs.createElement("Label", {
                get text() {
                  return libs.memo(() => tier.startRank === tier.rank)() ? LocalizeWithVars("#PvpReward_Rank", {
                    rank: tier.rank
                  }) : LocalizeWithVars("#PvpReward_RankRange", {
                    start: tier.startRank,
                    end: tier.rank
                  });
                }
              }, _el$7),
              _el$0 = libs.createElement("Label", {
                "class": "RewardText",
                get text() {
                  return GetLocalization(`#${tier.textKey}`);
                }
              }, _el$5);
            libs.insert(_el$7, libs.createComponent(libs.Show, {
              get when() {
                return tier.startRank === tier.rank && tier.rank <= 3;
              },
              get children() {
                const _el$8 = libs.createElement("Image", {
                  get ["class"]() {
                    return `RankIcon Rank${tier.rank}`;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$8, "class", `RankIcon Rank${tier.rank}`, _$p));
                return _el$8;
              }
            }), _el$9);
            libs.effect(_p$ => {
              const _v$ = libs.memo(() => tier.startRank === tier.rank)() ? LocalizeWithVars("#PvpReward_Rank", {
                  rank: tier.rank
                }) : LocalizeWithVars("#PvpReward_RankRange", {
                  start: tier.startRank,
                  end: tier.rank
                }),
                _v$2 = GetLocalization(`#${tier.textKey}`);
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$9, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$0, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$5;
          })()
        }), null);
        libs.insert(_el$3, libs.createComponent(libs.Show, {
          get when() {
            return rewardTiers().length === 0;
          },
          get children() {
            const _el$4 = libs.createElement("Label", {
              "class": "EmptyReward",
              get text() {
                return GetLocalization("#PvpReward_Empty");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$4, "text", GetLocalization("#PvpReward_Empty"), _$p));
            return _el$4;
          }
        }), null);
        return _el$2;
      })(), libs.createComponent(EOM_Button.EOM_Button, {
        color: "Confirm",
        get text() {
          return GetLocalization("#Popup_Button_Confirm");
        },
        onactivate: () => {
          ClosePopup(props.PopupID);
        }
      })];
    }
  });
}

const ARENA_TASK_ID = 8001001;
const player_weekly_pvp_tasks = solid_utils.createServiceNetData("player_weekly_pvp_tasks", {});
function Popup_PvpWeeklyTask(props) {
  const [requesting, setRequesting] = libs.createSignal(false);
  const taskConfig = KeyValues.task[ARENA_TASK_ID];
  const taskDescriptionID = taskConfig.task_description == 1 ? taskConfig.task_id : taskConfig.event_id;
  const weeklyTask = libs.createMemo(() => {
    const serverTime = Math.floor(CustomUIConfig.GetServerTimeStamp());
    let currentTask;
    let latestStartedTask;
    let earliestUpcomingTask;
    for (const task of Object.values(player_weekly_pvp_tasks())) {
      if (task.task_id !== ARENA_TASK_ID) continue;
      if (task.start_time <= serverTime && serverTime <= task.end_time) {
        if (currentTask === undefined || task.extra_id > currentTask.extra_id) currentTask = task;
      } else if (task.start_time <= serverTime) {
        if (latestStartedTask === undefined || task.extra_id > latestStartedTask.extra_id) latestStartedTask = task;
      } else if (earliestUpcomingTask === undefined || task.extra_id < earliestUpcomingTask.extra_id) {
        earliestUpcomingTask = task;
      }
    }
    return currentTask ?? latestStartedTask ?? earliestUpcomingTask;
  });
  const taskProgress = () => weeklyTask()?.progress ?? 0;
  const taskTarget = () => weeklyTask()?.target ?? taskConfig.target;
  const taskState = libs.createMemo(() => {
    const task = weeklyTask();
    if (task?.receive_progress == 1) return "Received";
    if (task !== undefined && task.progress >= task.target) return "CanReceive";
    return "WaitReceive";
  });
  const taskButtonText = libs.createMemo(() => {
    switch (taskState()) {
      case "Received":
        return GetLocalization("#TaskFinished");
      case "WaitReceive":
        return GetLocalization("#TaskUnFinished");
      default:
        return GetLocalization("#TaskReceive");
    }
  });
  const rewards = Object.entries(taskConfig.rewards);
  const taskIcon = getSrcPath(`task_icons/${taskConfig.icon || "pass"}.png`);
  const receiveReward = () => {
    const task = weeklyTask();
    if (task === undefined || taskState() !== "CanReceive" || requesting()) return;
    setRequesting(true);
    CallActionRequest("/v1/task/receive_rewards", {
      task_id: task.task_id,
      extra_id: task.extra_id
    }, () => setRequesting(false), () => setRequesting(false));
  };
  return libs.createComponent(BasePopup, {
    "class": "Popup_PvpWeeklyTask",
    get PopupID() {
      return props.PopupID;
    },
    size: "small",
    get group() {
      return props.group;
    },
    get title() {
      return GetLocalization("#LadderWeekTask");
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "PvpWeeklyTaskContent"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "TaskRow",
          get ["class"]() {
            return taskState();
          }
        }, _el$),
        _el$3 = libs.createElement("Image", {
          id: "TaskIcon",
          src: taskIcon
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "TaskInfo"
        }, _el$2),
        _el$5 = libs.createElement("Label", {
          id: "TaskName",
          get text() {
            return GetLocalization(`#Task_Name_${taskDescriptionID}`);
          }
        }, _el$4),
        _el$6 = libs.createElement("Label", {
          id: "TaskDes",
          get text() {
            return LocalizeWithVars(`#Task_Desc_${taskDescriptionID}`, {
              target: GetLocalization(String(taskConfig.target)),
              v1: GetLocalization(String(taskConfig.param_1)),
              v2: GetLocalization(String(taskConfig.param_2)),
              v3: GetLocalization(String(taskConfig.param_3))
            });
          }
        }, _el$4),
        _el$8 = libs.createElement("Panel", {
          id: "TaskRewardList"
        }, _el$2);
      libs.setProp(_el$3, "src", taskIcon);
      libs.insert(_el$4, libs.createComponent(EOM_ProgressBar.EOM_ProgressBar, {
        id: "TaskProgress",
        get value() {
          return Clamp(taskProgress() / taskTarget(), 0, 1) * 100;
        },
        get children() {
          const _el$7 = libs.createElement("Label", {
            id: "TaskProgressValue",
            get text() {
              return `${taskProgress()}/${taskTarget()}`;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$7, "text", `${taskProgress()}/${taskTarget()}`, _$p));
          return _el$7;
        }
      }), null);
      libs.insert(_el$8, libs.createComponent(libs.For, {
        each: rewards,
        children: ([itemID, amount]) => libs.createComponent(StoreItem.StoreItemBlock, {
          id: "TaskReward",
          item_id: itemID,
          amounts: amount
        })
      }));
      libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {
        id: "TaskBtn",
        color: "Gold",
        get enabled() {
          return taskState() === "CanReceive";
        },
        get loading() {
          return requesting();
        },
        get text() {
          return taskButtonText();
        },
        onactivate: receiveReward
      }), null);
      libs.effect(_p$ => {
        const _v$ = taskState(),
          _v$2 = GetLocalization(`#Task_Name_${taskDescriptionID}`),
          _v$3 = LocalizeWithVars(`#Task_Desc_${taskDescriptionID}`, {
            target: GetLocalization(String(taskConfig.target)),
            v1: GetLocalization(String(taskConfig.param_1)),
            v2: GetLocalization(String(taskConfig.param_2)),
            v3: GetLocalization(String(taskConfig.param_3))
          });
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
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

const PopupComponents = {
  CommonConfirm: Popup_CommonConfirm,
  BountyDonate: Popup_BountyDonate,
  CommunitySurvey: Popup_CommunitySurvey,
  EquipmentCapacityDialog: Popup_EquipmentCapacityDialog,
  StoreBuyItem: Popup_StoreBuyItem,
  StoreBuyItemResult: Popup_StoreBuyItemResult,
  ChooseDrawLucky: Popup_ChooseDrawLucky,
  HeroTalent: Popup_HeroTalent,
  HuntSaveArchive: Popup_HuntSaveArchive,
  ReviveCoinDialog: Popup_ReviveCoinDialog,
  ReviveCoinPurchaseDialog: Popup_ReviveCoinPurchaseDialog,
  AvatarEdit: Popup_AvatarEdit,
  CombatLog: Popup_CombatLog,
  PropUse: Popup_PropUse,
  PaymentOrder: Popup_PaymentOrder,
  PaymentOrderCreater: Popup_PaymentOrderCreater,
  PaymentSuccess: Popup_PaymentSuccess,
  PvpReward: Popup_PvpReward,
  PvpCombatLog: Popup_PvpCombatLog,
  PvpWeeklyTask: Popup_PvpWeeklyTask
};
const StaticPopup = [];
const Popups = () => {
  const [popupData, setPopupData] = libs.createStore({});
  CustomUIConfig.showPopup = function (popupName, props) {
    const PopupID = StaticPopup.includes(popupName) ? popupName : props.PopupID ?? DoUniqueString("Popup");
    setPopupData(PopupID, {
      ...props,
      ...{
        popupName,
        PopupID
      }
    });
    return PopupID;
  };
  CustomUIConfig.setPopupData = function (PopupID, props) {
    if (popupData[PopupID]) {
      setPopupData(PopupID, Object.assign({}, libs.mergeProps(popupData[PopupID], props)));
    }
  };
  libs.onMount(() => {
    const id = GameEvents.Subscribe("client_side_event", eventData => {
      if ("show_popup" == eventData.event_name) {
        let data = JSON.parse(eventData.event_data);
        if (data.popupName && PopupComponents[data.popupName]) {
          setPopupData(data.PopupID, data);
        } else {
          console.error("invalid popupName: " + data.popupName);
        }
      }
      if ("close_popup" == eventData.event_name) {
        let data = eventData.event_data;
        if (data.PopupID) {
          setPopupData(data.PopupID, undefined);
        }
      }
    });
    libs.onCleanup(() => GameEvents.Unsubscribe(id));
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "Popups",
      hittest: false
    }, null);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(popupData);
      },
      children: (PopupID, index) => {
        return libs.createComponent(libs.Show, {
          get when() {
            return popupData[PopupID].popupName;
          },
          get children() {
            return PopupComponents[popupData[PopupID].popupName](popupData[PopupID]);
          }
        });
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "className", libs.classNames({
      ShowPopup: Object.keys(popupData).length > 0
    }), _$p));
    return _el$;
  })();
};
libs.render(() => Popups(), $.GetContextPanel());