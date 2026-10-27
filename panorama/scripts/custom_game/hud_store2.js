--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('hud_store2', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var Player = require('./Player.js');
var hud_bp = require('./hud_bp.js');
var EOMDesign = require('./EOMDesign.js');
var EOM_Label = require('./EOM_Label.js');

const StoreItemImage = props => {
  const mergerd = libs.mergeProps({
    rarity: "n"
  }, props);
  const [local, others] = libs.splitProps(mergerd, ["itemName", "rarity", "itemImage", "itemCount"]);
  const rarity = () => {
    return finiteNumber(Number(local.rarity), 0) + 1;
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps$1(() => EOMDesign.EOMProps(others, {
    className: "StoreItemImage"
  }), {
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("StoreItemBG", "Rarity" + rarity());
        },
        get backgroundImage() {
          return getImagePath(`store/new/store_item_bg_${rarity()}.png`);
        },
        backgroundSize: "100%"
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("StoreItemTitle", "Rarity" + rarity());
        },
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            horizontalAlign: "left",
            width: "12px",
            height: "100%",
            backgroundSize: "100%",
            get backgroundImage() {
              return getImagePath(`store/new/store_name_bg_l_${rarity()}.png`);
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            horizontalAlign: "center",
            margin: "0px 12px",
            style: {
              minHeight: "28px"
            },
            width: "100%",
            backgroundSize: "100%",
            get backgroundImage() {
              return getImagePath(`store/new/store_name_bg_${rarity()}.png`);
            },
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                style: {
                  textAlign: "center"
                },
                textOverflow: "shrink",
                get text() {
                  return local.itemName;
                }
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            horizontalAlign: "right",
            width: "12px",
            height: "100%",
            backgroundSize: "100%",
            get backgroundImage() {
              return getImagePath(`store/new/store_name_bg_r_${rarity()}.png`);
            }
          })];
        }
      }), (() => {
        const _el$ = libs.createElement("Image", {
          get src() {
            return local.itemImage;
          }
        }, null);
        libs.setProp(_el$, "className", "StoreItemImage_Image");
        libs.effect(_$p => libs.setProp(_el$, "src", local.itemImage, _$p));
        return _el$;
      })(), libs.memo(() => libs.memo(() => !!(local.itemCount && local.itemCount > 1))() && (() => {
        const _el$2 = libs.createElement("Label", {
          get text() {
            return "×" + local.itemCount;
          }
        }, null);
        libs.setProp(_el$2, "className", "StoreItemCount");
        libs.effect(_$p => libs.setProp(_el$2, "text", "×" + local.itemCount, _$p));
        return _el$2;
      })())];
    }
  }));
};

const useStoreItem = props => {
  const [local, others] = libs.splitProps(props, ["itemName", "enabled", "owned", "tagName", "rarity", "labels", "itemImage", "itemCount", "button", "end_time", "onBuyItem"]);
  const [discount, setDiscount] = libs.createSignal("");
  const [label_data, setLabelData] = libs.createSignal([]);
  libs.createEffect(() => {
    if (local.labels != undefined) {
      setLabelData(local.labels.concat().filter((data, index) => {
        if (data.type == "discount") {
          setDiscount(data.label);
          return false;
        }
      }));
    }
  });
  return {
    local,
    others,
    discount,
    label_data
  };
};
const StoreItem = props => {
  const {
    local,
    others,
    discount,
    label_data
  } = useStoreItem(props);
  const limitInfo = () => local.labels?.filter(label => label.type == "limit")?.[0];
  const sLanguage = $.Language().toLowerCase();
  let now = Math.floor(Date.now() / 1000);
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps$1(() => EOMDesign.EOMProps(others, {
    className: "StoreItem"
  }), {
    get children() {
      return [libs.createComponent(EOM_Button.EOM_BaseButton, {
        className: "StoreItemMain",
        onactivate: () => {
          if (local.onBuyItem && local.enabled) {
            local.onBuyItem();
          }
        },
        get children() {
          return [libs.createComponent(libs.Show, {
            get when() {
              return limitInfo() != undefined;
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "StoreLimit",
                get children() {
                  const _el$ = libs.createElement("Label", {
                    get text() {
                      return $.Localize("#LimitLabel") + " " + limitInfo()?.label;
                    }
                  }, null);
                  libs.effect(_p$ => {
                    const _v$ = libs.classNames("LimitLabel", sLanguage),
                      _v$2 = $.Localize("#LimitLabel") + " " + limitInfo()?.label;
                    _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "className", _v$, _p$._v$));
                    _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "text", _v$2, _p$._v$2));
                    return _p$;
                  }, {
                    _v$: undefined,
                    _v$2: undefined
                  });
                  return _el$;
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return local.end_time && local.end_time > 0;
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                get classList() {
                  return {
                    StoreCountdown: true,
                    LowTime: now > (local.end_time ?? 0) - 24 * 60 * 60
                  };
                },
                get children() {
                  return [(() => {
                    const _el$2 = libs.createElement("Image", {}, null);
                    libs.setProp(_el$2, "className", "CountDownIcon");
                    return _el$2;
                  })(), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                    get endTime() {
                      return Number(local.end_time);
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(StoreItemImage, {
            get itemName() {
              return local.itemName;
            },
            get rarity() {
              return local.rarity;
            },
            get itemImage() {
              return local.itemImage;
            },
            get itemCount() {
              return local.itemCount;
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return local.owned;
            },
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "Owned"
              }), (() => {
                const _el$3 = libs.createElement("Image", {}, null);
                libs.setProp(_el$3, "className", "OwnedMask");
                return _el$3;
              })()];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            className: "StoreItemLabels",
            verticalAlign: "bottom",
            marginBottom: "74px",
            flowChildren: "up",
            get children() {
              return libs.createComponent(libs.Index, {
                get each() {
                  return label_data();
                },
                children: (labelInfo, index) => {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    flowChildren: "down",
                    get children() {
                      return [libs.createComponent(libs.Show, {
                        get when() {
                          return labelInfo().countdown != undefined;
                        },
                        get children() {
                          return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                            get className() {
                              return libs.classNames("CountDown", {
                                Show: false
                              });
                            },
                            get endTime() {
                              return labelInfo().countdown;
                            },
                            text: "#countdown_time",
                            hittest: false
                          });
                        }
                      }), libs.createComponent(EOM_Image.EOM_Image, {
                        get className() {
                          return libs.classNames("StoreItemLabel", labelInfo().type);
                        },
                        get children() {
                          const _el$5 = libs.createElement("Label", {
                            get text() {
                              return labelInfo().label;
                            }
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$5, "text", labelInfo().label, _$p));
                          return _el$5;
                        }
                      })];
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return local.onBuyItem;
            },
            get children() {
              return libs.createComponent(EOM_Button.EOM_Button, {
                get enabled() {
                  return local.enabled;
                },
                get color() {
                  return local.button?.color;
                },
                width: "186px",
                height: "58px",
                marginTop: "298px",
                horizontalAlign: "center",
                get text() {
                  return local.button?.text ?? "";
                },
                get icon() {
                  return local.button?.icon;
                }
              });
            }
          })];
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.tagName != undefined;
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("StoreItemTag", local.tagName);
            },
            hittest: false,
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "StoreItemTagBG"
              }), (() => {
                const _el$4 = libs.createElement("Label", {
                  get text() {
                    return $.Localize("#StoreTag_" + local.tagName);
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$4, "text", $.Localize("#StoreTag_" + local.tagName), _$p));
                return _el$4;
              })()];
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        get className() {
          return libs.classNames("StoreItemDiscount", "discount" + discount(), "Top");
        },
        hittest: false
      })];
    }
  }));
};

function getLabels(itemData) {
  const labels = [];
  if (itemData.discount && itemData.discount > 0) {
    labels.push({
      type: "discount",
      label: `-${itemData.discount}`
    });
  }
  if (itemData.limit_type == 1 && itemData.limit_count > 0) {
    labels.push({
      type: "limit",
      label: `${itemData.purchased_num ?? 0}/${itemData.limit_count}`
    });
  }
  return labels;
}
function getTagName(itemData) {
  if (itemData.limit_count > 0 && (Number(itemData.purchased_num) ?? 0) >= itemData.limit_count) ;
  const isVip = itemData.vip == 1;
  if (isVip) {
    return "vip";
  }
}
function getButtonData(itemData) {
  if (itemData.real_price == 0) {
    return {
      color: "Green",
      text: "#Free"
    };
  }
  const sLanguage = $.Language().toLowerCase();
  if (itemData.pay_type == undefined || itemData.pay_type == PayType.MONEY) {
    let dollarMark = "￥";
    let price = itemData.real_price;
    if (sLanguage == "schinese") {
      dollarMark = "￥";
      price = itemData.real_price;
    } else if (sLanguage == "english") {
      dollarMark = "$";
      price = itemData.overseas_real_price;
    } else if (sLanguage == "russian") {
      dollarMark = "₽";
      price = itemData.russia_real_price;
    }
    return {
      color: "Purple",
      text: dollarMark + price.toFixed(2)
    };
  } else if (itemData.pay_type == PayType.MOON) {
    return {
      color: "Blue",
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("tokens/1000001.png");
        },
        width: "28px",
        height: "28px"
      })
    };
  } else if (itemData.pay_type == PayType.STAR) {
    return {
      color: "Purple",
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("money_icon/star.png");
        },
        width: "20px",
        height: "20px"
      })
    };
  } else if (itemData.pay_type == PayType.SHARD) {
    return {
      color: "Purple",
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("money_icon/shard.png");
        },
        width: "20px",
        height: "20px"
      })
    };
  } else if (itemData.pay_type == 1100001) {
    return {
      color: "Light",
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("tokens/1100001.png");
        },
        width: "28px",
        height: "28px"
      })
    };
  } else if (itemData.pay_type == PayType.SHARD) {
    return {
      color: "Purple",
      text: String(Round(itemData.real_price, 2)),
      icon: libs.createComponent(EOM_Image.EOM_Image, {
        get backgroundImage() {
          return getImagePath("money_icon/shard.png");
        },
        width: "20px",
        height: "20px"
      })
    };
  }
  return {
    color: "Gold",
    text: String(Round(itemData.real_price, 2)),
    icon: libs.createComponent(EOM_Image.EOM_Image, {
      get backgroundImage() {
        return getImagePath("money_icon/shard.png");
      },
      width: "20px",
      height: "20px"
    })
  };
}
const getStoreItemProps = ({
  itemData,
  purchased_num,
  playerOrnament,
  playerHeroes
}) => {
  const item_data = libs.createMemo(() => {
    return {
      ...itemData,
      purchased_num: purchased_num
    };
  });
  const owned = libs.createMemo(() => {
    return getCosmeticByStoreItem(item_data(), playerOrnament) || getHerobyStoreItem(item_data(), playerHeroes);
  });
  const enabled = () => {
    return item_data().status == 1 && (item_data().limit_type == 1 ? finiteNumber(Number(item_data().purchased_num)) < item_data().limit_count : true) && !owned();
  };
  const labels = () => {
    return getLabels(item_data());
  };
  return {
    itemName: $.Localize("#" + item_data().id),
    itemImage: "file://{images}/custom_game/store_items/" + item_data().id + ".png",
    itemCount: item_data().items.length == 1 ? item_data()?.items?.[0]?.amounts ?? 1 : 1,
    enabled: enabled(),
    end_time: item_data().end_time,
    button: getButtonData(item_data()),
    tagName: getTagName(item_data()),
    owned: !enabled(),
    rarity: Number(item_data().title),
    labels: labels(),
    onBuyItem: () => {
      let now = Math.floor(Date.now() / 1000);
      if (item_data().end_time < now && item_data().end_time != 0) {
        return;
      }
      if (item_data().real_price == 0) {
        serverRequest("product_buy", {
          product_id: item_data().id,
          product_num: 1
        }, res => {
          if (res.status == 0) {
            showPopup("StoreBuyItemResult", {
              result: "success"
            });
          } else {
            console.log("buy error");
            showPopup("StoreBuyItemResult", {
              result: "failure"
            });
          }
        });
      } else {
        showPopup("StoreBuyItem", {
          itemData: item_data(),
          purchased_num: purchased_num,
          playerOrnament: playerOrnament,
          playerHeroes: playerHeroes,
          group: "StoreBuyItem"
        });
      }
    }
  };
};
const handleProduceData = data => {
  const result = {};
  let now = Math.floor(Date.now() / 1000);
  for (const storeItem of data) {
    if (storeItem.end_time < now && storeItem.end_time != 0) {
      continue;
    }
    if (storeItem.id.toString().slice(0, 3) == "980") {
      continue;
    }
    const tagList = storeItem.tag.split("|");
    for (const tag of tagList) {
      if (result[tag] == undefined) {
        result[tag] = [];
      }
      result[tag].push(storeItem);
    }
  }
  return result;
};
const useStoreData = () => {
  const [show, setShow] = libs.createSignal(false);
  const [paymentOpen, setPaymentOpen] = libs.createSignal(false);
  const [tabIndex, setTabIndex] = libs.createSignal(0);
  const [storeItemData, setStoreItemData] = libs.createSignal({});
  const [player_hero, setPlayerHero] = libs.createSignal({});
  const DefaultPage = ["battlepass"];
  const menuList = libs.createMemo(() => {
    const fixedSort = ["Must", "MoonShop", "GoldShop", "Resource"];
    const list = {};
    const sortedTags = Object.keys(storeItemData()).filter(tag => {
      if (isBlackList(getPlayerData(Players.GetLocalPlayer(), "steamID"))) {
        return tag != "Resource";
      }
      return true;
    }).sort((a, b) => {
      const aIndex = fixedSort.indexOf(a);
      const bIndex = fixedSort.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      } else if (aIndex !== -1) {
        return -1;
      } else if (bIndex !== -1) {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    });
    sortedTags.forEach((tag, index) => {
      list[tag] = [];
    });
    DefaultPage.forEach(page => {
      list[page] = [];
    });
    return list;
  });
  const menuKeys = () => {
    let res = Object.keys(storeItemData());
    DefaultPage.forEach(page => {
      res.push(page);
    });
    return res.sort();
  };
  const [purchased_product, setPurchasedProduct] = libs.createSignal({});
  const [playerOrnament, setPlayerOrnament] = libs.createSignal({});
  const [player_wallet, setPlayerWallet] = libs.createSignal({
    moonstone: 0,
    starlight: 0
  });
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useNetData("player_wallet", data => {
      setPlayerWallet(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("info_shop_product", data => {
      setStoreItemData(handleProduceData(data));
    }));
    gameEventIDList.push(useNetData("player_purchased_products", data => {
      setPurchasedProduct(data.purchased_products);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData('player_hero', data => {
      setPlayerHero(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useClientSideEvent("toggle_store_tag", event => {
      if (event.tabIndex) {
        setTabIndex(event.tabIndex);
        ToggleWindows("MenuButton_store", true);
      }
    }));
    gameEventIDList.push(useNetData('player_ornament', data => {
      setPlayerOrnament(data);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useNetData("open_payment", data => {
      setPaymentOpen(data.open);
    }, Players.GetLocalPlayer()));
    gameEventIDList.push(useClientSideEvent("directly_purchase", event => {
      if (event.itemid) {
        let hasFind = false;
        for (const tag in storeItemData()) {
          const itemList = storeItemData()[tag];
          for (const itemData of itemList) {
            if (itemData.id == event.itemid) {
              if (itemData.real_price == 0) {
                serverRequest("product_buy", {
                  product_id: itemData.id,
                  product_num: 1
                }, res => {
                  if (res.status == 0) {
                    showPopup("StoreBuyItemResult", {
                      result: "success"
                    });
                  } else {
                    console.log("buy error");
                    showPopup("StoreBuyItemResult", {
                      result: "failure"
                    });
                  }
                });
                hasFind = true;
                break;
              } else {
                hasFind = true;
                showPopup("StoreBuyItem", {
                  itemData: itemData,
                  initCount: finiteNumber(Number(event.count), 1),
                  group: "StoreBuyItem"
                });
                break;
              }
            }
          }
          if (hasFind) {
            break;
          }
        }
      }
    }));
    gameEventIDList.push(useToggleWindow("MenuButton_store", show, setShow));
    libs.onCleanup(() => {
      for (const id of gameEventIDList) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
  return {
    show,
    paymentOpen,
    setTabIndex,
    tabIndex,
    storeItemData,
    menuList,
    purchased_product,
    player_wallet,
    menuKeys,
    playerOrnament,
    player_hero
  };
};
function Store() {
  const {
    show,
    paymentOpen,
    setTabIndex,
    tabIndex,
    storeItemData,
    menuList,
    purchased_product,
    player_wallet,
    menuKeys,
    playerOrnament,
    player_hero
  } = useStoreData();
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "StoreMain",
    get show() {
      return libs.memo(() => !!show())() && paymentOpen();
    },
    name: "MenuButton_store",
    get children() {
      return [libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Menu, {
        get menuList() {
          return menuList();
        },
        onToggleMenu: (menu, menu2) => {
          if (menu != '') {
            setTabIndex(menuKeys().indexOf(menu));
          }
        },
        get selectedMenu() {
          return menuKeys()?.[tabIndex()];
        }
      }), libs.createComponent(Player.CurrencyGroup, {
        tokens: ["moonstone", "coin"],
        exchangeButton: true
      }), libs.createComponent(libs.For, {
        get each() {
          return menuKeys();
        },
        children: (tag, index) => {
          const itemList = () => {
            return storeItemData()[tag];
          };
          if (isBlackList(getPlayerData(Players.GetLocalPlayer(), "steamID")) && tag == "Resource") {
            return;
          }
          return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
            id: tag,
            get show() {
              return tabIndex() == index();
            },
            get children() {
              return (() => {
                switch (tag) {
                  case "VIP":
                    return libs.createComponent(VipPage, {});
                  case "battlepass":
                    return libs.createComponent(hud_bp.BPRoot, {});
                  default:
                    return libs.createComponent(EOM_Panel.EOM_Panel, {
                      id: "StoreList",
                      marginTop: "70px",
                      flowChildren: "right-wrap",
                      width: "100%",
                      height: "100%",
                      scroll: "y",
                      get children() {
                        return libs.createComponent(libs.Index, {
                          get each() {
                            return itemList();
                          },
                          children: (data, index) => {
                            return libs.createComponent(StoreItem, libs.mergeProps$1(() => getStoreItemProps({
                              itemData: data(),
                              purchased_num: purchased_product()?.[data().id],
                              playerOrnament: playerOrnament(),
                              playerHeroes: player_hero()
                            })));
                          }
                        });
                      }
                    });
                }
              })();
            }
          });
        }
      })];
    }
  });
}
const VipPage = () => {
  const [tag, setTag] = libs.createSignal("mounth");
  const tags = ["mounth", "year"];
  const [mounthVipData, setmounthVipData] = libs.createSignal({
    id: 0,
    start_time: 0,
    end_time: 0,
    pay_type: 0,
    order_by: 0,
    overseas_origin_price: 0,
    overseas_real_price: 0,
    russia_origin_price: 0,
    russia_real_price: 0,
    status: 0,
    origin_price: 0,
    real_price: 0,
    discount: 0,
    limit_type: 0,
    limit_count: 0,
    items: [],
    tag: "",
    title: 0,
    img: ""
  });
  const [yearVipData, setyearVipData] = libs.createSignal({
    id: 0,
    start_time: 0,
    end_time: 0,
    pay_type: 0,
    order_by: 0,
    overseas_origin_price: 0,
    overseas_real_price: 0,
    russia_origin_price: 0,
    russia_real_price: 0,
    status: 0,
    origin_price: 0,
    real_price: 0,
    discount: 0,
    limit_type: 0,
    limit_count: 0,
    items: [],
    tag: "",
    title: 0,
    img: ""
  });
  const [playerVipExpire, setPlayerVipExpire] = libs.createSignal(-1);
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useNetData("info_shop_product", data => {
      let lists = handleProduceData(data);
      for (let tag in lists) {
        let itemList = lists[tag];
        for (let itemData of itemList) {
          if (itemData.id == 9900010) {
            setmounthVipData(itemData);
          }
          if (itemData.id == 9900011) {
            setyearVipData(itemData);
          }
        }
      }
    }));
    gameEventIDList.push(useNetData("player_vip", data => {
      if (data.vip_valid == 1) {
        setPlayerVipExpire(data.expire);
      }
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      for (let id of gameEventIDList) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
  return (() => {
    const _el$5 = libs.createElement("Panel", {
        id: "VipPage"
      }, null),
      _el$6 = libs.createElement("Panel", {
        id: "discount",
        get ["class"]() {
          return tag();
        }
      }, _el$5);
      libs.createElement("Label", {
        "class": "number",
        text: "-20",
        html: true
      }, _el$6);
      libs.createElement("Label", {
        "class": "pct",
        text: "%",
        html: true
      }, _el$6);
    libs.insert(_el$5, libs.createComponent(libs.For, {
      each: tags,
      children: p => {
        return [(() => {
          const _el$9 = libs.createElement("Panel", {
              id: "tab_" + p
            }, null),
            _el$10 = libs.createElement("Label", {
              text: "#vip_" + p
            }, _el$9);
          libs.setProp(_el$9, "id", "tab_" + p);
          libs.setProp(_el$9, "onactivate", () => {
            setTag(p);
          });
          libs.setProp(_el$10, "text", "#vip_" + p);
          libs.effect(_$p => libs.setProp(_el$9, "className", libs.classNames("tab", {
            "selected": p == tag()
          }, $.Language().toLowerCase()), _$p));
          return _el$9;
        })(), (() => {
          const _el$11 = libs.createElement("Panel", {
              id: "vip_" + p
            }, null),
            _el$12 = libs.createElement("Label", {
              text: "#vip_" + p
            }, _el$11),
            _el$13 = libs.createElement("Label", {
              text: "#vip_" + p
            }, _el$11),
            _el$14 = libs.createElement("Panel", {
              "class": "PrivilegeList"
            }, _el$11);
          libs.setProp(_el$11, "id", "vip_" + p);
          libs.setProp(_el$12, "text", "#vip_" + p);
          libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_Button, {
            "class": "BuyBtn",
            color: "Blue",
            get text() {
              return getButtonData(p == "mounth" ? mounthVipData() : yearVipData())?.text ?? "0";
            },
            get icon() {
              return getButtonData(p == "mounth" ? mounthVipData() : yearVipData())?.icon ?? "";
            },
            onactivate: () => {
              showPopup("StoreBuyItem", {
                itemData: p == "mounth" ? mounthVipData() : yearVipData(),
                group: "StoreBuyItem"
              });
            }
          }), _el$13);
          libs.setProp(_el$13, "text", "#vip_" + p);
          libs.insert(_el$14, libs.createComponent(libs.For, {
            each: new Array(5),
            children: (i, index) => {
              return (() => {
                const _el$19 = libs.createElement("Panel", {}, null),
                  _el$20 = libs.createElement("Panel", {
                    "class": "line"
                  }, _el$19);
                  libs.createElement("Image", {}, _el$20);
                  const _el$22 = libs.createElement("Label", {
                    get text() {
                      return "#vip_privilege_" + p + index();
                    },
                    html: true
                  }, _el$20);
                libs.insert(_el$19, libs.createComponent(libs.Show, {
                  get when() {
                    return index() != 4;
                  },
                  get children() {
                    return libs.createElement("Image", {
                      "class": "div"
                    }, null);
                  }
                }), null);
                libs.effect(_p$ => {
                  const _v$4 = libs.classNames("privilege", $.Language().toLowerCase()),
                    _v$5 = "#vip_privilege_" + p + index();
                  _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$19, "className", _v$4, _p$._v$4));
                  _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$22, "text", _v$5, _p$._v$5));
                  return _p$;
                }, {
                  _v$4: undefined,
                  _v$5: undefined
                });
                return _el$19;
              })();
            }
          }));
          libs.insert(_el$11, libs.createComponent(libs.Show, {
            get when() {
              return playerVipExpire() != -1;
            },
            get children() {
              return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                id: "remain",
                get className() {
                  return $.Language().toLowerCase();
                },
                get endTime() {
                  return playerVipExpire();
                },
                text: "#vip_remain"
              });
            }
          }), null);
          libs.insert(_el$11, libs.createComponent(libs.Show, {
            when: p == "year",
            get children() {
              const _el$15 = libs.createElement("Panel", {
                  id: "year_discount"
                }, null);
                libs.createElement("Label", {
                  id: "number",
                  text: "20",
                  html: true
                }, _el$15);
                libs.createElement("Label", {
                  id: "pct",
                  text: "%",
                  html: true
                }, _el$15);
                libs.createElement("Label", {
                  id: "off",
                  text: "OFF",
                  html: true
                }, _el$15);
              return _el$15;
            }
          }), null);
          libs.effect(_p$ => {
            const _v$ = libs.classNames("vip", {
                "show": p == tag()
              }),
              _v$2 = libs.classNames("vipTitle", $.Language().toLowerCase()),
              _v$3 = libs.classNames("LeftTitle", $.Language().toLowerCase());
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$11, "className", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$12, "className", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$13, "className", _v$3, _p$._v$3));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined
          });
          return _el$11;
        })()];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$6, "class", tag(), _$p));
    return _el$5;
  })();
};
libs.render(() => libs.createComponent(Store, {}), $.GetContextPanel());

exports.StoreItemImage = StoreItemImage;
exports.getLabels = getLabels;
exports.getTagName = getTagName;