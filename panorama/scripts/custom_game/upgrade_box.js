--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('upgrade_box', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var hotkey_label = require('./hotkey_label.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');
var upgrade_icon = require('./upgrade_icon.js');

const UpgradeBox = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("UpgradeBox", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["upgradeID", "hotkey"]);
  const kv = libs.createMemo(() => KeyValues.ability_upgrades[local.upgradeID] ?? KeyValues.ability_upgrades_service[local.upgradeID] ?? {});
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Panel", {
        "class": "UpgradeInfo"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        "class": "UpgradeNameRow"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        "class": "UpgradeName",
        html: true,
        get text() {
          return `#${local.upgradeID}`;
        }
      }, _el$3);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(upgrade_icon.UpgradeIcon, {
      get upgradeID() {
        return local.upgradeID;
      },
      size: "large"
    }), _el$2);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return local.hotkey;
      },
      get children() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return local.hotkey;
          },
          marginLeft: "6px",
          verticalAlign: "center",
          hittest: false,
          hittestchildren: false
        });
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(hotkey_label.HotkeyLabel, {
      "class": "UpgradeDescription",
      html: true,
      get text() {
        return getKeyValueDescription(GetLocalization(`#${local.upgradeID}_description`), kv().AbilityValues ?? {});
      }
    }), null);
    libs.insert(_el$, () => props.children, null);
    libs.effect(_$p => libs.setProp(_el$4, "text", `#${local.upgradeID}`, _$p));
    return _el$;
  })();
};

exports.UpgradeBox = UpgradeBox;