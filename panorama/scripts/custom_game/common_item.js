--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('common_item', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const CommonItem = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("CommonItem", props.class, props.size ?? "small"),
    showRarity: true
  });
  const [local, others] = libs.splitProps(merged, ["itemName", "showRarity", "stackCount", "rarity", "showTips", "class"]);
  const itemData = libs.createMemo(() => {
    const kv = KeyValues.npc_items_custom[local.itemName];
    let itemType = "none";
    if (KeyValues.artifact[local.itemName]) {
      itemType = "artifact";
    } else if (KeyValues.bless[local.itemName]) {
      itemType = "bless";
    }
    return {
      kv,
      itemType
    };
  });
  const rarity = libs.createMemo(() => {
    if (local.rarity != undefined) return local.rarity;
    let kv = KeyValues.npc_items_custom[local.itemName];
    let rarity = toFiniteNumber(String(kv?.RarityRange).split("|")[0], 1);
    return rarity;
  });
  const tooltip = libs.createMemo(() => {
    const data = itemData();
    return local.showTips && data.itemType !== "none" ? {
      name: "artifact",
      itemName: local.itemName,
      rarity: rarity()
    } : undefined;
  });
  const src = libs.createMemo(() => {
    const abilityTextureName = itemData().kv?.AbilityTextureName;
    if (abilityTextureName == undefined || abilityTextureName == "") return undefined;
    if (abilityTextureName.startsWith("item_")) {
      return `file://{images}/items/${abilityTextureName.substring(5)}.png`;
    }
    return `file://{images}/spellicons/${abilityTextureName}.png`;
  });
  const defaultsrc = libs.createMemo(() => {
    const abilityTextureName = itemData().kv?.AbilityTextureName;
    if (abilityTextureName == undefined || abilityTextureName == "") return undefined;
    if (abilityTextureName.startsWith("item_")) {
      return `raw://resource/flash3/images/items/${abilityTextureName.substring(5)}.png`;
    }
    return `raw://resource/flash3/images/spellicons/${abilityTextureName}.png`;
  });
  const panelClass = libs.createMemo(() => libs.classNames(local.class, itemData().itemType));
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return panelClass();
        }
      }), null),
      _el$2 = libs.createElement("Image", {
        "class": "ItemIcon",
        scaling: "stretch-to-fit-y-preserve-aspect",
        get src() {
          return src();
        }
      }, _el$),
      _el$3 = libs.createElement("Image", {
        width: "100%",
        height: "100%",
        scaling: "stretch-to-fit-y-preserve-aspect",
        get src() {
          return defaultsrc();
        }
      }, _el$2);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return panelClass();
      },
      get customTooltip() {
        return tooltip();
      }
    }), true);
    libs.setProp(_el$3, "width", "100%");
    libs.setProp(_el$3, "height", "100%");
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.showRarity;
      },
      get children() {
        const _el$4 = libs.createElement("Panel", {
          get ["class"]() {
            return "Border Rarity" + rarity();
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$4, "class", "Border Rarity" + rarity(), _$p));
        return _el$4;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.stackCount != undefined && local.stackCount > 0;
      },
      get children() {
        const _el$5 = libs.createElement("Label", {
          "class": "StackCount",
          get text() {
            return local.stackCount;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$5, "text", local.stackCount, _$p));
        return _el$5;
      }
    }), null);
    libs.insert(_el$, () => props.children, null);
    libs.effect(_p$ => {
      const _v$ = src(),
        _v$2 = defaultsrc();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "src", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "src", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

exports.CommonItem = CommonItem;