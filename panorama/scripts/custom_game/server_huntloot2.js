--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('server_huntloot2', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function Huntloot(props) {
  const iconName = () => KeyValues.info_item_huntloot[props.huntloot_item_id]?.icon;
  const showTooltip = panel => {
    if (props.tooltipData === undefined) return;
    ShowCustomTooltip(panel, "server_huntloot", {
      data: JSON.stringify(props.tooltipData)
    });
  };
  const hideTooltip = panel => {
    if (props.tooltipData !== undefined) HideCustomTooltip(panel, "server_huntloot");
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return `Huntloot Rarity${props.rarity}${props.panelClass === undefined ? "" : ` ${props.panelClass}`}`;
        }
      }, null),
      _el$2 = libs.createElement("Image", {
        id: "HuntlootIcon",
        get src() {
          return `file://{images}/custom_game/store_items/${iconName()}.png`;
        }
      }, _el$);
    libs.setProp(_el$, "onmouseover", showTooltip);
    libs.setProp(_el$, "onmouseout", hideTooltip);
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
        return libs.createElement("Image", {
          id: "EquipedTag"
        }, null);
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.level > 0;
      },
      get children() {
        const _el$5 = libs.createElement("Label", {
          id: "LevelLabel",
          get text() {
            return "+" + props.level;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$5, "text", "+" + props.level, _$p));
        return _el$5;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = `Huntloot Rarity${props.rarity}${props.panelClass === undefined ? "" : ` ${props.panelClass}`}`,
        _v$2 = `file://{images}/custom_game/store_items/${iconName()}.png`;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "src", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}

exports.Huntloot = Huntloot;