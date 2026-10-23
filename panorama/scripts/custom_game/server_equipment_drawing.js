--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('server_equipment_drawing', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function EquipmentDrawingItem(props) {
  const drawingKV = () => {
    return props.drawing_item_id != undefined ? KeyValues.info_item_drawing[props.drawing_item_id] : undefined;
  };
  const iconName = () => {
    return drawingKV()?.icon ?? "";
  };
  const handleMouseOver = panel => {
    if (props.showTooltip !== false) {
      ShowCustomTooltip(panel, "server_drawing", {
        drawing_data: JSON.stringify(props)
      });
    }
    if (typeof props.onmouseover === "function") {
      props.onmouseover(panel);
    }
  };
  const handleMouseOut = panel => {
    if (props.showTooltip !== false) {
      HideCustomTooltip(panel, "server_drawing");
    }
    if (typeof props.onmouseout === "function") {
      props.onmouseout(panel);
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
      get ["class"]() {
        return "DungeonKey Rarity" + props.rarity;
      },
      get onmouseover() {
        return props.showTooltip === false ? props.onmouseover : handleMouseOver;
      },
      get onmouseout() {
        return props.showTooltip === false ? props.onmouseout : handleMouseOut;
      },
      get onactivate() {
        return props.onactivate;
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
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return iconName() != "";
      },
      get children() {
        const _el$2 = libs.createElement("Image", {
          id: "DungeonKeyIcon",
          get src() {
            return `file://{images}/custom_game/store_items/${iconName()}.png`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$2, "src", `file://{images}/custom_game/store_items/${iconName()}.png`, _$p));
        return _el$2;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.locked;
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
        return props.level > 0;
      },
      get children() {
        const _el$6 = libs.createElement("Label", {
          id: "LevelLabel",
          get text() {
            return "+" + props.level;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$6, "text", "+" + props.level, _$p));
        return _el$6;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "DungeonKey Rarity" + props.rarity,
        _v$2 = props.showTooltip === false ? props.onmouseover : handleMouseOver,
        _v$3 = props.showTooltip === false ? props.onmouseout : handleMouseOut,
        _v$4 = props.onactivate,
        _v$5 = props.oncontextmenu,
        _v$6 = props.onDragStart,
        _v$7 = props.onDragEnd;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "onmouseover", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$, "onmouseout", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$, "onactivate", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$, "oncontextmenu", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$, "onDragStart", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$, "onDragEnd", _v$7, _p$._v$7));
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
  })();
}

exports.EquipmentDrawingItem = EquipmentDrawingItem;