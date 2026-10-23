--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('Player', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');

const EOM_Currency = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_Currency type_" + (props.currencyType ?? "top"))
  });
  const [local, others] = libs.splitProps(merged, ["icon", "value", "onaddbuttonactivate"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
      libs.createElement("Panel", {
        id: 'Background'
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        "class": "EOM_CurrencyIcon",
        get backgroundImage() {
          return local.icon;
        }
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        "class": "EOM_CurrencyLabelContainer"
      }, _el$),
      _el$5 = libs.createElement("Label", {
        get text() {
          return local.value;
        }
      }, _el$4);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.onaddbuttonactivate != undefined;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_IconButton, {
          "class": "EOM_CurrencyRecharge",
          get icon() {
            return libs.createElement("Image", {}, null);
          },
          get onactivate() {
            return local.onaddbuttonactivate;
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = local.icon,
        _v$2 = local.value;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "backgroundImage", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

const DEFAULT_AVATAR_BORDER_ID = "1710000";
function getEquippedAvatarBorderID(cosmeticEquips) {
  for (const equip of Object.values(cosmeticEquips ?? {})) {
    const cosmeticID = String(equip.cosmetic_id);
    if (KeyValues.info_item_cosmetic[cosmeticID]?.type == COSMETIC_TYPE.BORDER) {
      return cosmeticID;
    }
  }
  return undefined;
}
const PlayerAvatar = props => {
  const [local, other] = libs.splitProps(props, ["playerid", "steamid", "accountid", "borderid", "classList"]);
  const player_cosmetic_equips = solid_utils.createServiceNetData("player_cosmetic_equips", {});
  const cachedPlayerInfo = service_netdata_helper.GetPlayerInfoCache({
    playerID: () => local.playerid,
    steamID: () => local.accountid,
    steam64ID: () => local.steamid
  });
  const localPlayerSteamID = libs.createMemo(() => CustomUIConfig.PlayerManager.ResolveSteamID({
    playerID: Players.GetLocalPlayer()
  }));
  const isLocalPlayer = libs.createMemo(() => {
    if (local.playerid != undefined) return local.playerid == Players.GetLocalPlayer();
    const targetSteamID = cachedPlayerInfo.steamID();
    return targetSteamID != undefined && targetSteamID == localPlayerSteamID();
  });
  const borderID = libs.createMemo(() => {
    if (local.borderid != undefined) {
      return String(local.borderid);
    }
    const cachedBorderID = getEquippedAvatarBorderID(cachedPlayerInfo.data()?.player_cosmetic_equips);
    if (isLocalPlayer()) {
      return getEquippedAvatarBorderID(player_cosmetic_equips()) ?? cachedBorderID ?? DEFAULT_AVATAR_BORDER_ID;
    }
    return cachedBorderID ?? DEFAULT_AVATAR_BORDER_ID;
  });
  const steamid = libs.createMemo(() => {
    if (local.steamid != undefined) {
      return local.steamid.toString();
    }
    if (local.playerid != undefined) {
      return Game.GetPlayerInfo(local.playerid)?.player_steamid;
    }
    return "-1";
  });
  const accountid = libs.createMemo(() => {
    if (local.accountid != undefined) {
      return local.accountid.toString();
    }
    const steamID = steamid();
    return steamID != undefined ? Steam_64_3(steamID) : undefined;
  });
  return libs.createComponent(AvatarBorder, libs.mergeProps$1({
    get ["class"]() {
      return libs.classNames("PlayerAvatar", {
        ...local.classList
      });
    },
    get borderid() {
      return borderID();
    }
  }, other, {
    hittest: false,
    get children() {
      return libs.createComponent(EOM_Avatar, {
        get steamid() {
          return steamid();
        },
        get accountid() {
          return accountid();
        },
        style: {
          width: "48.04688%",
          height: "48.04688%",
          align: "center center",
          borderRadius: "10%"
        }
      });
    }
  }));
};
const AvatarBorder = props => {
  const [local, other] = libs.splitProps(props, ["borderid", "classList", "children"]);
  const resolved = libs.children(() => local.children);
  const particleName = libs.createMemo(() => KeyValues.info_item_cosmetic[String(local.borderid)]?.particle ?? "");
  return (() => {
    const _el$ = libs.createElement("Panel", other, null),
      _el$2 = libs.createElement("Panel", {
        id: "BaseBorder",
        hittest: false,
        get style() {
          return {
            width: "100%",
            height: "100%",
            align: "center center",
            zIndex: 1,
            overflow: "noclip",
            backgroundImage: getImagePath(`store_items/${local.borderid}.png`),
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
          };
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1({
      get classList() {
        return {
          "AvatarBorder": true,
          ...local.classList
        };
      }
    }, other), true);
    libs.insert(_el$, resolved, _el$2);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return particleName() != "";
      },
      get children() {
        const _el$3 = libs.createElement("DOTAParticleScenePanel", {
          "class": "AvatarBorderParticle",
          get particleName() {
            return particleName();
          },
          cameraOrigin: "0 0 280",
          lookAt: "0 0 0",
          fov: 60,
          hittest: false,
          squarePixels: true,
          particleonly: true
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "particleName", particleName(), _$p));
        return _el$3;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$2, "style", {
      width: "100%",
      height: "100%",
      align: "center center",
      zIndex: 1,
      overflow: "noclip",
      backgroundImage: getImagePath(`store_items/${local.borderid}.png`),
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }, _$p));
    return _el$;
  })();
};
const PlayerTitle = props => {
  const [local, other] = libs.splitProps(props, ["titleid", "classList"]);
  const titleID = libs.createMemo(() => String(local.titleid));
  const particleName = libs.createMemo(() => KeyValues.info_item_cosmetic[titleID()]?.particle?.trim() ?? "");
  return (() => {
    const _el$4 = libs.createElement("Panel", other, null),
      _el$5 = libs.createElement("Image", {
        "class": "PlayerTitleImage",
        get src() {
          return getSrcPath(`cosmetic/AVATAR_NAME/${Language()}/${titleID()}.png`);
        },
        scaling: "stretch-to-cover-preserve-aspect",
        hittest: false
      }, _el$4);
    libs.spread(_el$4, libs.mergeProps$1({
      get classList() {
        return {
          "PlayerTitle": true,
          ...local.classList
        };
      }
    }, other), true);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return particleName();
      },
      get children() {
        const _el$6 = libs.createElement("DOTAParticleScenePanel", {
          "class": "PlayerTitleParticle",
          get particleName() {
            return particleName();
          },
          cameraOrigin: "0 0 200",
          lookAt: "0 0 0",
          fov: 60,
          hittest: false,
          squarePixels: true,
          particleonly: true
        }, null);
        libs.effect(_$p => libs.setProp(_el$6, "particleName", particleName(), _$p));
        return _el$6;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$5, "src", getSrcPath(`cosmetic/AVATAR_NAME/${Language()}/${titleID()}.png`), _$p));
    return _el$4;
  })();
};
const PlayerMedal = props => {
  const [local, other] = libs.splitProps(props, ["medalID", "classList"]);
  const medalID = libs.createMemo(() => String(local.medalID));
  return (() => {
    const _el$7 = libs.createElement("Panel", other, null),
      _el$8 = libs.createElement("Image", {
        "class": "PlayerMedalImage",
        get src() {
          return getSrcPath(`cosmetic/MEDAL/${Language()}/${medalID()}.png`);
        },
        scaling: "stretch-to-cover-preserve-aspect",
        hittest: false
      }, _el$7);
    libs.spread(_el$7, libs.mergeProps$1({
      get classList() {
        return {
          "PlayerMedal": true,
          ...local.classList
        };
      }
    }, other), true);
    libs.effect(_$p => libs.setProp(_el$8, "src", getSrcPath(`cosmetic/MEDAL/${Language()}/${medalID()}.png`), _$p));
    return _el$7;
  })();
};
function GetPropNum(props, item_id) {
  if (!props) return 0;
  let num = 0;
  for (let prop of Object.values(props)) {
    if (prop.prop_id == item_id) {
      num += prop.amounts;
    }
  }
  return num;
}
const PlayerCurrency = props => {
  const propType = GetPropType(props.itemID);
  const icon = libs.createMemo(() => {
    if (propType == PropType.Token) {
      return getImagePath(`tokens/${props.itemID}.png`);
    }
    return getImagePath(`store_items/${props.itemID}.png`);
  });
  const hasAddbutton = () => {
    if (props.itemID == 110001 || props.itemID == 110014) {
      return true;
    }
    return false;
  };
  const sourceValue = (() => {
    if (propType == PropType.Token) {
      const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
      return libs.createMemo(() => playerTokens()[props.itemID.toString()]?.amounts ?? 0);
    }
    if (propType == PropType.Hero) {
      const heroID = GetHeroInfoByGoodID(props.itemID)?.heroID;
      const playerHeroes = solid_utils.createServiceNetData("player_heroes", {});
      return libs.createMemo(() => heroID != undefined ? playerHeroes()[heroID.toString()]?.extra_star_exp ?? 0 : 0);
    }
    if (propType == PropType.Courier) {
      const playerCouriers = solid_utils.createServiceNetData("player_couriers", {});
      return libs.createMemo(() => playerCouriers()[props.itemID.toString()]?.extra_star_exp ?? 0);
    }
    if (propType == PropType.Essences) {
      const playerCollectionEssences = solid_utils.createServiceNetData("player_collection_essences", {});
      return libs.createMemo(() => playerCollectionEssences()[props.itemID.toString()]?.extra_exp ?? 0);
    }
    const playerProps = solid_utils.createServiceNetData("player_props", {});
    return libs.createMemo(() => GetPropNum(playerProps(), props.itemID));
  })();
  const value = libs.createMemo(() => props.value ?? sourceValue());
  return libs.createComponent(EOM_Currency, {
    get currencyType() {
      return props.currencyType;
    },
    get icon() {
      return icon();
    },
    get value() {
      return value();
    },
    get titleTooltip() {
      return {
        title: "#" + props.itemID,
        text: "#" + props.itemID + "_description"
      };
    },
    get onaddbuttonactivate() {
      return hasAddbutton() ? () => {
        if (props.itemID == 110001) {
          JumpToMenu({
            window_name: "store",
            menu: "Resource",
            force: true
          });
        }
        if (props.itemID == 110014) {
          ClientSideEvent("directly_purchase", {
            itemid: 802207,
            source: "DiceTokenAddButton"
          });
        }
      } : undefined;
    }
  });
};
const getCdkeyFailText = message => {
  if (message?.includes("fetch cdkey error")) {
    return "#fetch_cdkey_error";
  }
  return "#" + (message?.replace(/\s+/g, "_") ?? "");
};
const getCdkeyRewardItems = data => {
  return data.data?.add_items?.common ?? [];
};
const showCdkeyReceiveResult = data => {
  $.Msg(data);
  if (data.code == 0) {
    CustomUIConfig.showPopup("CommonConfirm", {
      text: "",
      title: "#CDK_Success",
      icon: "conv_checkmark",
      items: getCdkeyRewardItems(data)
    });
  } else {
    CustomUIConfig.showPopup("CommonConfirm", {
      text: getCdkeyFailText(data.message),
      title: "#CDK_Fail",
      icon: "conv_worngmark"
    });
  }
};
const ExchangeEntry = () => {
  const [key, setKey] = libs.createSignal("");
  return (() => {
    const _el$9 = libs.createElement("Panel", {
      hittest: false
    }, null);
    libs.setProp(_el$9, "className", "ExchangeEntry");
    libs.insert(_el$9, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
      style: {
        border: "0px",
        backgroundColor: "none"
      },
      get className() {
        return Language();
      },
      placeholder: "#Store_Exchange_Placeholder",
      onChange: self => {
        setKey(self.text);
      },
      oninputsubmit: self => {
        CallActionRequest("/v1/cdkey/receive", {
          key: key()
        }, showCdkeyReceiveResult);
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "ExchangeBTN",
      onactivate: () => {
        CallActionRequest("/v1/cdkey/receive", {
          key: key()
        }, showCdkeyReceiveResult);
      }
    }), null);
    return _el$9;
  })();
};
const CurrencyGroup = props => {
  const merged = libs.mergeProps(props, {
    class: "CurrencyGroup"
  });
  const [local, others] = libs.splitProps(merged, ["tokens", "values", "exchangeButton", "recentOrder", "currencyType"]);
  return (() => {
    const _el$0 = libs.createElement("Panel", libs.mergeProps$1(others, {
      hittest: false
    }), null);
    libs.spread(_el$0, libs.mergeProps$1(others, {
      "hittest": false
    }), true);
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return local.recentOrder;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          id: "RecentOrder",
          size: "Small",
          onactivate: self => {
            self.enabled = false;
            CallActionRequest("/v1/shop/supplement_orders", {}, () => {
              self.enabled = true;
            });
          },
          get children() {
            return libs.createElement("Label", {
              id: "RecentOrderLabel",
              text: "#StoreRechargeReport"
            }, null);
          }
        });
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return local.exchangeButton;
      },
      get children() {
        return libs.createComponent(ExchangeEntry, {});
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(libs.For, {
      get each() {
        return props.tokens;
      },
      children: tokenID => {
        return libs.createComponent(PlayerCurrency, {
          get currencyType() {
            return local.currencyType;
          },
          itemID: tokenID,
          get value() {
            return local.values?.[tokenID];
          }
        });
      }
    }), null);
    return _el$0;
  })();
};
const CurrencyIcon = props => {
  const defaultClass = () => props.tokenID == PayType.MONEY ? {
    class: "CurrencyIcon " + props.tokenID
  } : {
    class: "CurrencyIcon CurrencyCash " + props.tokenID
  };
  const merged = libs.mergeProps(props, defaultClass());
  const [local, others] = libs.splitProps(merged, ["tokenID"]);
  return libs.createComponent(libs.Show, {
    get when() {
      return props.tokenID == PayType.MONEY;
    },
    get fallback() {
      return (() => {
        const _el$11 = libs.createElement("Image", libs.mergeProps$1(others, {
          get src() {
            return getSrcPath(`tokens/${props.tokenID}.png`);
          }
        }), null);
        libs.spread(_el$11, libs.mergeProps$1(others, {
          get src() {
            return getSrcPath(`tokens/${props.tokenID}.png`);
          }
        }), false);
        return _el$11;
      })();
    },
    get children() {
      const _el$10 = libs.createElement("Label", libs.mergeProps$1(others, {
        get text() {
          return (() => {
            const language = Language();
            let dollarMark = "￥";
            if (language == "english") {
              dollarMark = "$";
            } else if (language == "russian") {
              dollarMark = "₽";
            }
            return dollarMark;
          })();
        }
      }), null);
      libs.spread(_el$10, libs.mergeProps$1(others, {
        get text() {
          return (() => {
            const language = Language();
            let dollarMark = "￥";
            if (language == "english") {
              dollarMark = "$";
            } else if (language == "russian") {
              dollarMark = "₽";
            }
            return dollarMark;
          })();
        }
      }), false);
      return _el$10;
    }
  });
};
const PlayerName = props => {
  const merged = libs.mergeProps({
    showgGild: false
  }, props);
  const [local, other] = libs.splitProps(merged, ["children", "steamid", "accountid", "showgGild", "classList"]);
  const resolved = libs.children(() => local.children);
  const showgGild = libs.createMemo(() => local.showgGild);
  const steamid = libs.createMemo(() => local.steamid != undefined ? local.steamid.toString() : undefined);
  const accountid = libs.createMemo(() => {
    if (local.accountid != undefined) {
      return local.accountid.toString();
    }
    const steamID = steamid();
    return steamID != undefined ? Steam_64_3(steamID) : undefined;
  });
  let userNamePanel;
  const [username, setUserName] = libs.createSignal("");
  let p_timer = -1;
  const updateName = () => {
    if (p_timer != -1) {
      clearInterval(p_timer);
    }
    p_timer = setInterval(() => {
      if (userNamePanel != undefined && userNamePanel.IsValid()) {
        let label = userNamePanel.GetChild(0);
        let gild = label.text.match(/\[.*?\]/g);
        if (gild && gild[gild.length - 1]) {
          setUserName(label.text.replace(gild[gild.length - 1], ""));
        } else {
          setUserName(label.text);
        }
      }
    }, 10);
  };
  libs.onMount(() => {
    let interval_id = setInterval(() => {
      if (userNamePanel != undefined && userNamePanel.IsValid()) {
        if (accountid() != undefined) {
          userNamePanel.accountid = accountid();
        }
        if (local.showgGild == false) {
          userNamePanel.visible = false;
          updateName();
        }
        clearInterval(interval_id);
        interval_id = -1;
      }
    }, 10);
    libs.onCleanup(() => {
      if (interval_id != -1) {
        clearInterval(interval_id);
      }
      if (p_timer != -1) {
        clearInterval(p_timer);
      }
    });
  });
  libs.createEffect(libs.on(showgGild, show_gild => {
    if (userNamePanel) {
      if (!show_gild) {
        userNamePanel.visible = false;
        updateName();
      } else {
        userNamePanel.visible = true;
        if (p_timer != -1) {
          clearInterval(p_timer);
          p_timer = -1;
        }
      }
    }
  }));
  libs.createEffect(() => {
    if (userNamePanel && accountid() != undefined) {
      userNamePanel.accountid = accountid();
    }
  });
  return (() => {
    const _el$12 = libs.createElement("Panel", other, null),
      _el$13 = libs.createElement("Label", {
        get text() {
          return username();
        }
      }, _el$12),
      _el$14 = libs.createElement("DOTAUserName", {
        get steamid() {
          return steamid();
        },
        hittest: false
      }, _el$12);
    libs.spread(_el$12, libs.mergeProps$1({
      get classList() {
        return {
          "PlayerName": true,
          ...local.classList
        };
      }
    }, other), true);
    const _ref$ = userNamePanel;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$14) : userNamePanel = _el$14;
    libs.insert(_el$12, resolved, null);
    libs.effect(_p$ => {
      const _v$ = username(),
        _v$2 = steamid();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$13, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$14, "steamid", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$12;
  })();
};
const EOM_Avatar = props => {
  let avatarImage;
  const merged = libs.mergeProps({
    steamid: "-1",
    accountid: "-1"
  }, props, {
    class: "EOM_Avatar"
  });
  const [local, others] = libs.splitProps(merged, ["children", "steamid", "accountid"]);
  libs.onMount(() => {
    let interval_id = setInterval(() => {
      if (avatarImage != undefined && avatarImage?.IsValid()) {
        avatarImage.accountid = local.accountid.toString();
        clearInterval(interval_id);
        interval_id = -1;
      }
    }, 10);
    libs.onCleanup(() => {
      if (interval_id != -1) {
        clearInterval(interval_id);
      }
    });
  });
  libs.createEffect(() => {
    if (avatarImage != undefined && avatarImage?.IsValid()) {
      if (local.accountid) {
        avatarImage.accountid = local.accountid.toString();
      }
    }
  });
  return (() => {
    const _el$15 = libs.createElement("Panel", others, null),
      _el$16 = libs.createElement("DOTAAvatarImage", {
        get steamid() {
          return local.steamid;
        },
        width: "100%",
        height: "100%",
        hittest: false
      }, _el$15);
    libs.spread(_el$15, others, true);
    const _ref$2 = avatarImage;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$16) : avatarImage = _el$16;
    libs.setProp(_el$16, "width", "100%");
    libs.setProp(_el$16, "height", "100%");
    libs.insert(_el$15, () => local.children, null);
    libs.effect(_$p => libs.setProp(_el$16, "steamid", local.steamid, _$p));
    return _el$15;
  })();
};

exports.AvatarBorder = AvatarBorder;
exports.CurrencyGroup = CurrencyGroup;
exports.CurrencyIcon = CurrencyIcon;
exports.EOM_Avatar = EOM_Avatar;
exports.EOM_Currency = EOM_Currency;
exports.ExchangeEntry = ExchangeEntry;
exports.PlayerAvatar = PlayerAvatar;
exports.PlayerMedal = PlayerMedal;
exports.PlayerName = PlayerName;
exports.PlayerTitle = PlayerTitle;