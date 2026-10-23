--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');

function DungeonUpgrade() {
  const playerID = Players.GetLocalPlayer();
  const upgradeOptions = solid_utils.createPlayerNetDataSignal("dungeon", `upgrade_options_p${playerID}`);
  const handleSelectUpgrade = upgradeID => {
    ServerRequest("select_upgrade", {
      upgradeID
    });
    $.Msg(`[UI] Selected upgrade: ${upgradeID}`);
  };
  return libs.createComponent(libs.Show, {
    get when() {
      return libs.memo(() => upgradeOptions() !== undefined)() && upgradeOptions().length > 0;
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "DungeonUpgradeContainer"
        }, null);
        libs.createElement("Panel", {
          "class": "UpgradeOverlay"
        }, _el$);
        const _el$3 = libs.createElement("Panel", {
          "class": "UpgradeContent"
        }, _el$);
        libs.createElement("Label", {
          "class": "UpgradeTitle",
          text: "#UpgradeTitle"
        }, _el$3);
        const _el$5 = libs.createElement("Panel", {
          "class": "UpgradeCards"
        }, _el$3);
      libs.insert(_el$5, libs.createComponent(libs.For, {
        get each() {
          return upgradeOptions();
        },
        children: upgrade => (() => {
          const _el$6 = libs.createElement("Panel", {
              get ["class"]() {
                return `UpgradeCard rarity-${upgrade.rarity}`;
              }
            }, null),
            _el$7 = libs.createElement("Label", {
              "class": "CardRarity",
              get text() {
                return upgrade.rarity;
              }
            }, _el$6),
            _el$8 = libs.createElement("Label", {
              "class": "CardName",
              get text() {
                return GetLocalization(upgrade.nameToken);
              }
            }, _el$6),
            _el$9 = libs.createElement("Label", {
              "class": "CardDescription",
              get text() {
                return GetLocalization(upgrade.descriptionToken);
              }
            }, _el$6),
            _el$0 = libs.createElement("Label", {
              "class": "CardValue",
              get text() {
                return `+${upgrade.effectValue}`;
              }
            }, _el$6);
          libs.setProp(_el$6, "onactivate", () => handleSelectUpgrade(upgrade.upgradeID));
          libs.effect(_p$ => {
            const _v$ = `UpgradeCard rarity-${upgrade.rarity}`,
              _v$2 = upgrade.rarity,
              _v$3 = GetLocalization(upgrade.nameToken),
              _v$4 = GetLocalization(upgrade.descriptionToken),
              _v$5 = `+${upgrade.effectValue}`;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "class", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$7, "text", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "text", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "text", _v$4, _p$._v$4));
            _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "text", _v$5, _p$._v$5));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined,
            _v$4: undefined,
            _v$5: undefined
          });
          return _el$6;
        })()
      }));
      return _el$;
    }
  });
}
libs.render(() => libs.createComponent(DungeonUpgrade, {}), $.GetContextPanel());