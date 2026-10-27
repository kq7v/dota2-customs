--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('collections', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var CosmeticCard = require('./CosmeticCard.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Icon = require('./EOM_Icon.js');
var GenericPanel = require('./GenericPanel.js');
var MenuMarkIcon = require('./MenuMarkIcon.js');

const useCollections = props => {
  const merged = libs.mergeProps({
    playerId: Players.GetLocalPlayer()
  }, props);
  const [local, others] = libs.splitProps(merged, ["playerId", "onClick"]);
  const [collections, setCollections] = libs.createSignal([]);
  const playerId = () => local.playerId;
  libs.createEffect(libs.on(() => merged.player_ornament_slots, data => {
    if (data != undefined) {
      let collections = [];
      data.forEach(collection => {
        collections[collection.slot - 1] = collection.oid.toString();
      });
      setCollections(collections);
    }
  }));
  libs.onMount(() => {
    const NetTableListenerIDs = [];
    NetTableListenerIDs.push(useServiceNetTable("player_ornament_slots", (data, playerID) => {
      if (merged.player_ornament_slots == undefined && playerID == playerId()) {
        let collections = [];
        data.forEach(collection => {
          collections[collection.slot - 1] = collection.oid.toString();
        });
        setCollections(collections);
      }
    }, -1));
    libs.onCleanup(() => {
      NetTableListenerIDs.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  return {
    collections,
    setCollections
  };
};
const CollectionList = props => {
  const merged = libs.mergeProps({
    playerId: Players.GetLocalPlayer(),
    listCount: 10
  }, props);
  const [local, others] = libs.splitProps(merged, ["playerId", "onClick", "onClose", "selectedSlot", "listCount"]);
  const {
    collections,
    setCollections
  } = useCollections(props);
  const list = () => [...Array(local.listCount)].map((_, i) => i);
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "CollectionList",
    scroll: "x",
    get children() {
      return libs.createComponent(libs.Index, {
        get each() {
          return list();
        },
        children: index => {
          let show = () => collections()[index()] != undefined;
          let data = () => GameUI.CustomUIConfig().CosmeticsKv[collections()[index()]];
          return (() => {
            const _el$ = libs.createElement("Panel", {
              id: "Collection"
            }, null);
            libs.setProp(_el$, "onactivate", () => {
              if (local.onClick) local.onClick(index());
            });
            libs.insert(_el$, libs.createComponent(libs.Switch, {
              fallback: () => libs.createComponent(GenericPanel.CImage, {
                id: "CollectionAdd",
                get src() {
                  return getSrcPath("profile/d_icon_02.png");
                }
              }),
              get children() {
                return libs.createComponent(libs.Match, {
                  get when() {
                    return show();
                  },
                  get children() {
                    return [libs.createComponent(CosmeticCard.CosmeticCard, {
                      get itemid() {
                        return collections()[index()];
                      },
                      get rarity() {
                        return data()?.rarity ?? 0;
                      },
                      get mark() {
                        return data()?.mark ?? 0;
                      },
                      enableHover: false
                    }), libs.createComponent(libs.Show, {
                      get when() {
                        return libs.memo(() => local.onClose != undefined)() && index() == local.selectedSlot;
                      },
                      get children() {
                        return libs.createComponent(EOM_Icon.EOM_Icon, {
                          size: '24',
                          margin: '6px',
                          onactivate: () => {
                            local.onClose(index());
                          },
                          get src() {
                            return getSrcPath("hero_collection/s5_close.png");
                          }
                        });
                      }
                    })];
                  }
                });
              }
            }), null);
            libs.insert(_el$, libs.createComponent(libs.Show, {
              get when() {
                return props.markType != undefined;
              },
              get children() {
                return libs.createComponent(MenuMarkIcon.MenuMarkIcon, {
                  get type() {
                    return props.markType;
                  }
                });
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$, "classList", {
              "add": !show(),
              "self": local.playerId == Players.GetLocalPlayer(),
              "selected": local.selectedSlot == index()
            }, _$p));
            return _el$;
          })();
        }
      });
    }
  });
};

exports.CollectionList = CollectionList;
exports.useCollections = useCollections;