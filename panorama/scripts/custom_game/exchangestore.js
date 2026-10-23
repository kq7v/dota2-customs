--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('ExchangeStore', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');

const EOM_DrawerLayout = props => {
  const merged = libs.mergeProps(props, {
    class: "EOM_DrawerLayout"
  });
  const [local, others] = libs.splitProps(merged, ["children", "show", "title", "onclose"]);
  const [show, setShow] = libs.createSignal(local.show);
  libs.createRenderEffect(() => {
    setShow(props.show);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$4 = libs.createElement("Panel", {
        id: "DrawerContents"
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get classList() {
        return {
          DrawerVisible: show()
        };
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.title;
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            id: "TitleContainer",
            hittest: false
          }, null),
          _el$3 = libs.createElement("Label", {
            get text() {
              return local.title;
            }
          }, _el$2);
        libs.effect(_$p => libs.setProp(_el$3, "text", local.title, _$p));
        return _el$2;
      }
    }), _el$4);
    libs.setProp(_el$4, "onactivate", () => {});
    libs.insert(_el$4, () => libs.untrack(() => local.children));
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "EOM_DrawerLayoutClose",
      onactivate: () => {
        setShow(false);
        local.onclose?.();
      }
    }), null);
    return _el$;
  })();
};

const ExchangeStore = params => {
  const player_shop_product_limit = solid_utils.createServiceNetData("player_shop_product_limits", {});
  const getStoreItemData = () => {
    const list = [];
    const now = CustomUIConfig.GetServerTimeStamp();
    for (const itemname in KeyValues.info_shop_product) {
      const itemdata = KeyValues.info_shop_product[itemname];
      if ((itemdata.start_time < now || itemdata.start_time == 0) && (itemdata.end_time > now || itemdata.end_time == 0)) {
        const tags = itemdata.tag.split("|");
        tags.forEach(tag => {
          if (tag == params.tag) {
            list.push(itemdata);
          }
        });
      }
    }
    return list;
  };
  const [storeItemData, setStoreItemData] = libs.createSignal(getStoreItemData());
  const [plusPreviewID, setPlusPreviewID] = libs.createSignal(storeItemData()[0]?.id ?? -1);
  libs.createEffect(libs.on(() => params.show, v => {
    if (params.show == true) {
      const data = getStoreItemData();
      setStoreItemData(data);
      setPlusPreviewID(data[0]?.id ?? -1);
    }
  }));
  const previewItemID = libs.createMemo(() => {
    const productID = plusPreviewID();
    if (productID == -1) return;
    const productData = KeyValues.info_shop_product[productID];
    return Object.keys(productData?.items ?? {})[0] ?? productID;
  });
  const previewItemLocalizeKey = () => {
    const itemID = previewItemID();
    return itemID == undefined ? "" : "#" + itemID;
  };
  const previewItemDescriptionKey = () => {
    const itemID = previewItemID();
    return itemID == undefined ? "" : "#" + itemID + "_description";
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "ExchangeStore",
        get hittest() {
          return params.show;
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "TitleBG",
        hittest: false
      }, _el$);
      libs.createElement("Panel", {
        id: "BG",
        hittest: false
      }, _el$);
      libs.createElement("DOTAParticleScenePanel", {
        id: "LightParticle",
        particleName: "particles/ui/game/ui_game_signin_04.vpcf",
        particleonly: true,
        cameraOrigin: "0 0 600",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
      libs.createElement("DOTAParticleScenePanel", {
        id: "BgParticle",
        particleName: "particles/ui/game/ui_game_signin_05.vpcf",
        particleonly: true,
        cameraOrigin: "0 0 400",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
      const _el$7 = libs.createElement("Panel", {
        id: "RewardPreview"
      }, _el$),
      _el$8 = libs.createElement("Panel", {
        id: "PreviewDesc"
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        id: "Name",
        get text() {
          return previewItemLocalizeKey();
        },
        html: true
      }, _el$8);
      libs.createElement("Panel", {
        id: "Line"
      }, _el$8);
      const _el$1 = libs.createElement("Label", {
        id: "Access",
        get text() {
          return previewItemDescriptionKey();
        },
        html: true
      }, _el$8);
    libs.setProp(_el$, "onactivate", () => {});
    libs.insert(_el$, libs.createComponent(EOM_DrawerLayout, {
      id: "PlusRewards",
      get title() {
        return "#" + params.tag;
      },
      get show() {
        return params.show;
      },
      onclose: () => params.onclose(),
      get children() {
        const _el$6 = libs.createElement("Panel", {
          id: "PlusItemList",
          scroll: "y",
          "class": "VerticalScrollStyle"
        }, null);
        libs.setProp(_el$6, "scroll", "y");
        libs.insert(_el$6, libs.createComponent(libs.Index, {
          get each() {
            return storeItemData().sort((a, b) => b.orderby - a.orderby);
          },
          children: (data, index) => (() => {
            const _el$10 = libs.createElement("Panel", {}, null);
            libs.setProp(_el$10, "onmouseover", () => setPlusPreviewID(data().id));
            libs.insert(_el$10, libs.createComponent(StoreItem.StoreItem, {
              get itemid() {
                return data().id;
              },
              get purchased_num() {
                return player_shop_product_limit()[data().id];
              }
            }));
            return _el$10;
          })()
        }));
        return _el$6;
      }
    }), _el$7);
    libs.insert(_el$7, () => libs.createMemo(() => {
      let id = previewItemID();
      if (id == undefined) return;
      return libs.createComponent(StoreItem.StoreItemImage, {
        itemid: id
      });
    }), _el$8);
    libs.effect(_p$ => {
      const _v$ = {
          showPlusPreview: params.show
        },
        _v$2 = params.show,
        _v$3 = params.show,
        _v$4 = previewItemLocalizeKey(),
        _v$5 = previewItemDescriptionKey();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "hittest", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$2, "visible", _v$3, _p$._v$3));
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
  })();
};

exports.EOM_DrawerLayout = EOM_DrawerLayout;
exports.ExchangeStore = ExchangeStore;