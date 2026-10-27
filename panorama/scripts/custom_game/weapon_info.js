--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var tooltip_base = require('./tooltip_base.js');
var solid_utils = require('./solid_utils.js');

const maxStar = 6;
let root = $.GetContextPanel();
const playerWeapons = solid_utils.createServiceNetData("player_weapons", {});
function getPrivilegeDescription(privilege, level = 1) {
  const privilegeData = KeyValues.privilege[privilege];
  if (!privilegeData || !privilegeData.AbilityValues) {
    return GetLocalization(`#DOTA_Tooltip_ability_${privilege}`);
  }
  const abilityValues = {};
  for (const key in privilegeData.AbilityValues) {
    if (key.startsWith("desc_key")) continue;
    abilityValues[key] = privilegeData.AbilityValues[key];
  }
  const upgradeKeys = privilegeData.AbilityValues["desc_key"] !== undefined ? String(privilegeData.AbilityValues["desc_key"]).split(" ") : [];
  for (const upgradeKey of upgradeKeys) {
    const abilityUpgradeData = KeyValues.ability_upgrades_service[upgradeKey];
    const upgradeValue = abilityUpgradeData?.AbilityValues;
    if (!upgradeValue) continue;
    for (const key in upgradeValue) {
      abilityValues[key] = upgradeValue[key];
    }
  }
  return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilege}`), abilityValues, {
    level
  });
}
function getWeaponID() {
  return root.GetAttributeString("weapon_id", "") || root.GetAttributeString("item_id", "") || root.GetAttributeString("id", "");
}
function getWeaponName(weaponID) {
  return GetLocalization("#" + weaponID);
}
function getWeaponSkillDesc(weaponData, level) {
  const privilege = weaponData?.weapon_effect;
  if (!privilege) {
    return GetLocalization("#Weapon_NoAbilityEffect");
  }
  return getPrivilegeDescription(privilege, level);
}
function getWeaponSoulDescription(weaponData, star) {
  if (!weaponData || star <= 0) {
    return GetLocalization("#Weapon_NoAttributeEffect");
  }
  const result = [];
  const effectData = weaponData["star_effect" + star];
  for (const [attribute, value] of Object.entries(effectData ?? {})) {
    result.push(GetPropertyLocalization(attribute, value));
  }
  const privilegeData = weaponData["star_privilege" + star];
  for (const privilege of privilegeData ? privilegeData.split("|").filter(Boolean) : []) {
    const desc = getPrivilegeDescription(privilege);
    if (desc) {
      result.push(desc);
    }
  }
  return result.length > 0 ? result.join("<br>") : GetLocalization("#Weapon_NoAttributeEffect");
}
function TooltipContents(props) {
  const weaponData = KeyValues.weapon[props.weaponID];
  const currentStar = () => Math.min(Math.max(playerWeapons()[props.weaponID]?.star ?? 0, 0), maxStar);
  const nextStar = () => currentStar() + 1;
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "WeaponTooltip"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      when: weaponData,
      get children() {
        return [(() => {
          const _el$2 = libs.createElement("Label", {
            id: "WeaponTooltipTitle",
            html: true,
            get text() {
              return getWeaponName(props.weaponID);
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$2, "text", getWeaponName(props.weaponID), _$p));
          return _el$2;
        })(), (() => {
          const _el$3 = libs.createElement("Label", {
            "class": "TooltipPropType",
            get text() {
              return "[" + GetLocalization("#PropType_Weapon") + "]";
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$3, "text", "[" + GetLocalization("#PropType_Weapon") + "]", _$p));
          return _el$3;
        })(), libs.createComponent(TooltipSection, {
          get title() {
            return GetLocalization("#Weapon_Effect_Title");
          },
          get children() {
            const _el$4 = libs.createElement("Label", {
              "class": "WeaponTooltipEffectDesc",
              html: true,
              get text() {
                return getWeaponSkillDesc(weaponData, currentStar());
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$4, "text", getWeaponSkillDesc(weaponData, currentStar()), _$p));
            return _el$4;
          }
        }), libs.createComponent(TooltipSoulSection, {
          get title() {
            return GetLocalization("#CurrentSoulEffect");
          },
          get level() {
            return currentStar();
          },
          get desc() {
            return getWeaponSoulDescription(weaponData, currentStar());
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return nextStar() <= maxStar;
          },
          get children() {
            return libs.createComponent(TooltipSoulSection, {
              get title() {
                return GetLocalization("#NextSoulEffect");
              },
              get level() {
                return nextStar();
              },
              get desc() {
                return getWeaponSoulDescription(weaponData, nextStar());
              },
              muted: true
            });
          }
        })];
      }
    }));
    return _el$;
  })();
}
function TooltipSection(props) {
  return (() => {
    const _el$5 = libs.createElement("Panel", {
        "class": "WeaponTooltipSection"
      }, null),
      _el$6 = libs.createElement("Label", {
        "class": "WeaponTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$5);
    libs.insert(_el$5, () => props.children, null);
    libs.effect(_$p => libs.setProp(_el$6, "text", props.title, _$p));
    return _el$5;
  })();
}
function TooltipSoulSection(props) {
  return (() => {
    const _el$7 = libs.createElement("Panel", {
        "class": "WeaponTooltipSection"
      }, null),
      _el$8 = libs.createElement("Label", {
        "class": "WeaponTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        "class": "WeaponTooltipSoulRow"
      }, _el$7),
      _el$0 = libs.createElement("Panel", {
        "class": "WeaponTooltipSoulBadge"
      }, _el$9),
      _el$1 = libs.createElement("Label", {
        get text() {
          return props.level;
        }
      }, _el$0),
      _el$10 = libs.createElement("Label", {
        "class": "WeaponTooltipEffectDesc",
        html: true,
        get text() {
          return props.desc;
        }
      }, _el$9);
    libs.effect(_p$ => {
      const _v$ = {
          Muted: props.muted == true
        },
        _v$2 = props.title,
        _v$3 = props.level,
        _v$4 = props.desc;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$7, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$10, "text", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$7;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get weaponID() {
      return getWeaponID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();