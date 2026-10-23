--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('server_dungeon_key', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

function DungeonKey(props) {
  const playerKeys = solid_utils.createServiceNetData("player_keys", {}, props.playerID ?? Players.GetLocalPlayer());
  const keyData = libs.createMemo(() => {
    if ("data" in props) {
      return props.data;
    }
    if (props.keyID == undefined) {
      return undefined;
    }
    return playerKeys()[String(props.keyID)];
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return keyData();
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          get ["class"]() {
            return "DungeonKey Rarity" + keyData().rarity;
          },
          get oncontextmenu() {
            return props.oncontextmenu;
          },
          get onDragStart() {
            return props.onDragStart;
          },
          get onDragEnd() {
            return props.onDragEnd;
          }
        }, null),
        _el$2 = libs.createElement("Image", {
          id: "DungeonKeyIcon",
          get src() {
            return `file://{images}/custom_game/store_items/${KeyValues.info_item_key[keyData().key_item_id].icon}.png`;
          }
        }, _el$);
      libs.setProp(_el$, "onmouseover", panel => {
        if (props.showTooltip != false) {
          ShowCustomTooltip(panel, "server_key", {
            key_data: JSON.stringify(keyData())
          });
        }
      });
      libs.setProp(_el$, "onmouseout", panel => {
        if (props.showTooltip != false) {
          HideCustomTooltip(panel, "server_key");
        }
      });
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return keyData().locked;
        },
        get children() {
          return libs.createElement("Panel", {
            id: "Lock"
          }, null);
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return props.equipped;
        },
        get children() {
          const _el$4 = libs.createElement("Panel", {
              id: "Equipped"
            }, null);
            libs.createElement("Label", {
              text: "#ServerEquipEquipped"
            }, _el$4);
          return _el$4;
        }
      }), null);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return keyData().level > 0;
        },
        get children() {
          const _el$6 = libs.createElement("Label", {
            id: "LevelLabel",
            get text() {
              return "+" + keyData().level;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$6, "text", "+" + keyData().level, _$p));
          return _el$6;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$ = "DungeonKey Rarity" + keyData().rarity,
          _v$2 = props.oncontextmenu,
          _v$3 = props.onDragStart,
          _v$4 = props.onDragEnd,
          _v$5 = `file://{images}/custom_game/store_items/${KeyValues.info_item_key[keyData().key_item_id].icon}.png`;
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "oncontextmenu", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$, "onDragStart", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$, "onDragEnd", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$2, "src", _v$5, _p$._v$5));
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
}

exports.DungeonKey = DungeonKey;