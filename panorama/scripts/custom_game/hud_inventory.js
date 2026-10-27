--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var StoreItemImage = require('./StoreItemImage.js');
require('./EOMDesign.js');
require('./EOM_Icon.js');
require('./GenericPanel.js');
require('./EOM_Label.js');

let pSelf = $.GetContextPanel();
let fakeData = {
  "Skin": {},
  "Emoji": {},
  "Courier": {},
  "Base": {},
  "Avatar": {},
  "Particle": {}
};
for (const key in fakeData) {
  for (let index = 0; index < 20; index++) {
    fakeData[key][key + "_" + index] = {};
  }
}
let fake_data = {
  ["1"]: [{
    oid: 5010001,
    pool: 1,
    hid: 1234,
    equip: 1
  }]
};
const Inventory = ({
  ornamentData
}) => {
  const [show, setShow] = libs.createSignal(false);
  libs.onMount(() => {
    let id = useToggleWindow("MenuButton_inventory", show, setShow);
    return () => {
      GameEvents.Unsubscribe(id);
    };
  });
  const [tabName, setTabName] = libs.createSignal("Skin");
  const OnChangeTab = (index, name) => {
    setTabName(name.replace("#InventoryTab_", ""));
  };
  const [courier, _setCourier] = libs.createSignal(CustomNetTables.GetTableValue("service", "player_courier"));
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("service", function (_, k, v) {
      if (k === "player_courier") {
        _setCourier(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return libs.createComponent(EOM_Popup.EOM_Popup, {
    type: "P2",
    id: "Inventory",
    title: "#Inventory",
    get className() {
      return libs.classNames({
        EOM_PopupMainShow: show()
      }, tabName());
    },
    verticalAlign: "top",
    marginTop: "120px",
    onClose: () => ToggleWindows("MenuButton_inventory", false),
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        className: "EOM_PopupContent",
        width: "100%",
        height: "100%",
        margin: "0px",
        get children() {
          return [libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            flowChildren: "down",
            get children() {
              return libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
                className: "First",
                group: "Store",
                list: ["#InventoryTab_Skin", "#InventoryTab_Emoji", "#InventoryTab_Courier", "#InventoryTab_Base", "#InventoryTab_Avatar", "#InventoryTab_Particle"],
                onChange: OnChangeTab,
                defaultSelected: 1
              });
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            marginTop: "8px",
            get children() {
              return [libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Skin",
                className: "InventoryContainer",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "ItemContainer",
                    get children() {
                      return (ornamentData?.[1] ?? []).map((itemData, index) => {
                        return libs.createComponent(InventoryItem, {
                          OrnamentData: itemData
                        });
                      });
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Emoji",
                className: "InventoryContainer",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "ItemContainer"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Courier",
                className: "InventoryContainer",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "ItemContainer",
                    get children() {
                      return Object.keys((courier() ?? {})?.[Players.GetLocalPlayer()] ?? {}).map((id, index) => {
                        let courierData = courier()?.[Players.GetLocalPlayer()]?.id;
                        return libs.createComponent(EOM_Button.EOM_BaseButton, {
                          className: "StoreItem",
                          onactivate: () => {
                            GameEvents.SendCustomEventToServer("courier_equip", {
                              cid: id
                            });
                          },
                          get children() {
                            return libs.createComponent(StoreItemImage.StoreItemImage, {
                              get itemName() {
                                return $.Localize("#" + courierData?.cid);
                              },
                              get itemImage() {
                                return "file://{images}/custom_game/store_items/" + courierData?.cid + ".png";
                              }
                            });
                          }
                        });
                      });
                    }
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Base",
                className: "InventoryContainer",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "ItemContainer"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Avatar",
                className: "InventoryContainer",
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "ItemContainer"
                  });
                }
              }), libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "Particle",
                className: "InventoryContainer",
                get children() {
                  return [libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
                    group: "InventoryParticle",
                    list: ["#InventoryTab_Particle_Ambient", "#InventoryTab_Particle_Win", "#InventoryTab_Particle_Attack", "#InventoryTab_Particle_Teleport", "#InventoryTab_Particle_Blink", "#InventoryTab_Particle_Sect"]
                  }), libs.createComponent(EOM_Panel.EOM_Panel, {
                    className: "ItemContainer"
                  })];
                }
              })];
            }
          })];
        }
      });
    }
  });
};
const InventoryItem = props => {
  const [local, other] = libs.splitProps(props, ["OrnamentData"]);
  const {
    oid,
    hid,
    pool,
    equip
  } = local.OrnamentData;
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    className: "StoreItem",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Image", {}, null);
        libs.setProp(_el$, "className", "StoreItemBG");
        return _el$;
      })(), (() => {
        const _el$2 = libs.createElement("Label", {
          get text() {
            return $.Localize("#" + oid);
          }
        }, null);
        libs.setProp(_el$2, "className", "StoreItemTitle");
        libs.effect(_$p => libs.setProp(_el$2, "text", $.Localize("#" + oid), _$p));
        return _el$2;
      })(), (() => {
        const _el$3 = libs.createElement("Image", {
          src: "file://{images}/custom_game/store_items/" + oid + ".png"
        }, null);
        libs.setProp(_el$3, "className", "StoreItemImage");
        libs.setProp(_el$3, "src", "file://{images}/custom_game/store_items/" + oid + ".png");
        return _el$3;
      })(), libs.createComponent(EOM_Button.EOM_Button, {
        type: "P2",
        color: "Gold",
        text: equip == 1 ? "#Inventory_Unequip" : "#Inventory_Equip",
        marginTop: "277px",
        horizontalAlign: "center",
        onactivate: () => {
          if (equip == 1) {
            GameEvents.SendCustomEventToServer("ornament_equip", {
              hid: hid,
              pool: pool
            });
          } else {
            GameEvents.SendCustomEventToServer("ornament_equip", {
              oid: oid,
              hid: hid,
              pool: pool
            });
          }
        }
      })];
    }
  });
};
libs.render(() => libs.createComponent(Inventory, {
  ornamentData: fake_data
}), pSelf);
ServerRequest("ornament_list", {}, data => {
  if (data.status == 0) {
    let list = {};
    for (const key in data.data.ornament) {
      const ornamentData = data.data.ornament[key];
      if (list[ornamentData.pool] == undefined) {
        list[ornamentData.pool] = [];
      }
      list[ornamentData.pool].push(ornamentData);
    }
    for (const pool in list) {
      list[pool].sort((a, b) => {
        return a.oid - b.oid;
      });
    }
    libs.render(() => libs.createComponent(Inventory, {
      ornamentData: list
    }), pSelf);
  }
});
GameEvents.Subscribe("Update_ornament", event => {
  let list = {};
  for (const key in event) {
    const ornamentData = event[key];
    if (list[ornamentData.pool] == undefined) {
      list[ornamentData.pool] = [];
    }
    list[ornamentData.pool].push(ornamentData);
  }
  for (const pool in list) {
    list[pool].sort((a, b) => {
      return a.oid - b.oid;
    });
  }
  libs.render(() => libs.createComponent(Inventory, {
    ornamentData: list
  }), pSelf);
});