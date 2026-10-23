--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('upgrade_icon', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const UpgradeIcon = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("UpgradeIcon", props.class, props.size ?? "small"),
    showRarity: true
  });
  const [local, others] = libs.splitProps(merged, ["upgradeID", "showRarity", "showTips"]);
  const kv = libs.createMemo(() => KeyValues.ability_upgrades[local.upgradeID]);
  const src = libs.createMemo(() => {
    const getTexturePath = name => {
      if (!name) return;
      if (name.startsWith("item_")) {
        const rawPath = `resource/flash3/images/items/${name.substring(5)}.png`;
        if (HasResource(rawPath)) {
          return "raw://" + rawPath;
        }
        return `file://{images}/items/${name.substring(5)}.png`;
      }
      const rawPath = `resource/flash3/images/spellicons/${name}.png`;
      if (HasResource(rawPath)) {
        return "raw://" + rawPath;
      }
      return `file://{images}/spellicons/${name}.png`;
    };
    let abilityTextureName = kv()?.AbilityTextureName;
    if (!abilityTextureName) {
      const abilityName = kv()?.ability_name;
      if (abilityName) {
        const abilityKv = KeyValues.npc_abilities_custom[abilityName];
        abilityTextureName = abilityKv?.AbilityTextureName;
      }
    }
    return getTexturePath(abilityTextureName);
  });
  const rarity = libs.createMemo(() => {
    return toFiniteNumber(kv()?.Rarity);
  });
  const tooltipProps = libs.createMemo(() => {
    return local.showTips ? {
      customTooltip: {
        name: "ability_upgrade",
        upgradeID: local.upgradeID
      }
    } : undefined;
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, tooltipProps), null),
      _el$2 = libs.createElement("Image", {
        id: "UpgradeImage",
        scaling: "stretch-to-fit-y-preserve-aspect",
        get src() {
          return src();
        }
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, tooltipProps), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.showRarity;
      },
      get children() {
        const _el$3 = libs.createElement("Panel", {
          id: "Border",
          get ["class"]() {
            return "Rarity" + rarity();
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "class", "Rarity" + rarity(), _$p));
        return _el$3;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$2, "src", src(), _$p));
    return _el$;
  })();
};

exports.UpgradeIcon = UpgradeIcon;