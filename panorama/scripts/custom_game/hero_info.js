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

let root = $.GetContextPanel();
const playerHeroes = solid_utils.createServiceNetData("player_heroes", {});
function getHeroID() {
  const rawID = root.GetAttributeString("hero_id", "") || root.GetAttributeString("id", "");
  if (rawID !== "") {
    return rawID;
  }
  const heroName = getHeroName();
  if (heroName !== "") {
    return String(GetHeroIDByHeroName(heroName));
  }
  return "";
}
function getHeroName() {
  const attrHeroName = root.GetAttributeString("hero_name", "") || root.GetAttributeString("heroName", "") || root.GetAttributeString("unit", "");
  if (attrHeroName !== "") {
    return attrHeroName;
  }
  const heroID = root.GetAttributeString("hero_id", "") || root.GetAttributeString("id", "");
  if (heroID === "") {
    return "";
  }
  for (const heroName in KeyValues.heroes) {
    if (String(GetHeroIDByHeroName(heroName)) === heroID) {
      return heroName;
    }
  }
  return "";
}
function getCurrentStar(heroID) {
  const attrStar = root.GetAttributeInt("current_star", -1);
  if (attrStar >= 0) {
    return attrStar;
  }
  const star = root.GetAttributeInt("star", -1);
  if (star >= 0) {
    return star;
  }
  return playerHeroes()[heroID]?.star ?? 0;
}
function shouldShowNextSoulEffect() {
  const rawValue = root.GetAttributeString("show_next_soul", "");
  if (rawValue === "") {
    return true;
  }
  return rawValue !== "0" && rawValue !== "false";
}
function getPrivilegeDescription(privilege) {
  const privilegeData = KeyValues.privilege[privilege];
  if (!privilegeData) {
    return "";
  }
  return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, privilege), privilegeData.AbilityValues, {
    level: 1,
    onlyShowNowLevel: true
  });
}
function getHeroSoulRows(heroID) {
  return Object.values(KeyValues.hero_soul_infusion_effect[heroID] ?? {}).sort((rowA, rowB) => rowA.soul_level - rowB.soul_level);
}
function getHeroSoulRow(heroID, level) {
  return getHeroSoulRows(heroID).find(row => row.soul_level == level);
}
function getHeroSoulDescription(heroID, level) {
  const row = getHeroSoulRow(heroID, level);
  const descriptions = [];
  for (const [effectKey, effectValue] of Object.entries(row?.soul_effect ?? {})) {
    if (typeof effectValue === "number") {
      descriptions.push(GetPropertyLocalization(effectKey, effectValue));
    } else if (KeyValues.privilege[effectKey]) {
      const desc = getPrivilegeDescription(effectKey);
      if (desc) {
        descriptions.push(desc);
      }
    }
  }
  return descriptions.length > 0 ? descriptions.join("<br>") : GetLocalization("#Hero_Breakthrough_NoAttributeEffect");
}
function TooltipContents(props) {
  const maxLevel = () => getHeroSoulRows(props.heroID).length;
  const currentLevel = () => Math.min(Math.max(getCurrentStar(props.heroID), 1), maxLevel() || 1);
  const nextLevel = () => currentLevel() + 1;
  const showNextSoulEffect = shouldShowNextSoulEffect();
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "HeroInfoTooltip"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.heroID !== "" || props.heroName !== "";
      },
      get children() {
        return [libs.createComponent(TooltipSoulSection, {
          get title() {
            return GetLocalization("#CurrentSoulEffect");
          },
          get level() {
            return currentLevel();
          },
          get desc() {
            return getHeroSoulDescription(props.heroID, currentLevel());
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return showNextSoulEffect && nextLevel() <= maxLevel();
          },
          get children() {
            return libs.createComponent(TooltipSoulSection, {
              get title() {
                return GetLocalization("#NextSoulEffect");
              },
              get level() {
                return nextLevel();
              },
              get desc() {
                return getHeroSoulDescription(props.heroID, nextLevel());
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
function TooltipSoulSection(props) {
  return (() => {
    const _el$2 = libs.createElement("Panel", {
        "class": "HeroInfoTooltipSection"
      }, null),
      _el$3 = libs.createElement("Label", {
        "class": "HeroInfoTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        "class": "HeroInfoTooltipSoulRow"
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        "class": "HeroInfoTooltipSoulBadge"
      }, _el$4),
      _el$6 = libs.createElement("Label", {
        get text() {
          return props.level;
        }
      }, _el$5),
      _el$7 = libs.createElement("Label", {
        "class": "HeroInfoTooltipEffectDesc",
        html: true,
        get text() {
          return props.desc;
        }
      }, _el$4);
    libs.effect(_p$ => {
      const _v$ = {
          Muted: props.muted == true
        },
        _v$2 = props.title,
        _v$3 = props.level,
        _v$4 = props.desc;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$2;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get heroName() {
      return getHeroName();
    },
    get heroID() {
      return getHeroID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();