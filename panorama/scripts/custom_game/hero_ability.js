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

const HeroAbility = props => {
  const abilityData = libs.createMemo(() => {
    const config = GameUI.CustomUIConfig()?.hero_abilities;
    return config?.[props.abilityName];
  });
  const abilityDisplayName = libs.createMemo(() => {
    return GetLocalization("#DOTA_Tooltip_ability_" + props.abilityName);
  });
  const abilityTag = libs.createMemo(() => {
    return "#feature_" + abilityData()?.AbilityTag;
  });
  const [cooldown, setCooldown] = libs.createSignal(abilityData()?.AbilityCooldown ?? 0);
  const [manaCost, setManaCost] = libs.createSignal(abilityData()?.AbilityManaCost ?? 0);
  libs.onMount(() => {
    const update = () => {
      if (props.entIndex != undefined && Entities.IsValidEntity(props.entIndex)) {
        setCooldown(Round(Abilities.GetAbilityCooldown(props.entIndex), 1));
        setManaCost(Abilities.GetManaCost(props.entIndex));
      }
    };
    update();
    const timer = setInterval(update, 200);
    libs.onCleanup(() => clearInterval(timer));
  });
  const abilityValues = libs.createMemo(() => {
    const data = abilityData();
    const baseValues = data?.AbilityValues || {};
    if (props.entIndex != undefined && Entities.IsValidEntity(props.entIndex)) {
      const unitEntIndex = Abilities.GetCaster(props.entIndex);
      return Abilities.GetUpgradedAbilityValues(props.abilityName, baseValues, unitEntIndex);
    }
    return baseValues;
  });
  const abilityDescription = libs.createMemo(() => {
    return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${props.abilityName}_description`), abilityValues());
  });
  const abilityLore = libs.createMemo(() => {
    return GetLocalization(`#DOTA_Tooltip_ability_${props.abilityName}_lore`, "");
  });
  const abilityDetailValues = libs.createMemo(() => {
    const values = abilityValues();
    return Object.entries(values).map(([key, value]) => {
      let label = GetLocalization(`DOTA_Tooltip_ability_${props.abilityName}_${key}`, "");
      if (label.startsWith('DOTA_Tooltip')) label = key;
      const bHasPercent = label.startsWith('%');
      if (bHasPercent) label = label.substring(1);
      return {
        key,
        label,
        value: GetAbilityValue(value) + (bHasPercent ? '%' : '')
      };
    }).filter(item => item.label !== "");
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "HeroAbility"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "HeroAbility__Header"
      }, _el$),
      _el$3 = libs.createElement("DOTAAbilityImage", {
        "class": "HeroAbility__Icon",
        get abilityname() {
          return props.abilityName;
        }
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        flowChildren: "down"
      }, _el$2),
      _el$5 = libs.createElement("Label", {
        "class": "HeroAbility__Name",
        get text() {
          return abilityDisplayName();
        }
      }, _el$4),
      _el$6 = libs.createElement("Label", {
        "class": "HeroAbility__Tag",
        get text() {
          return abilityTag();
        }
      }, _el$4),
      _el$7 = libs.createElement("Label", {
        "class": "HeroAbility__Description",
        html: true,
        get text() {
          return abilityDescription();
        }
      }, _el$),
      _el$9 = libs.createElement("Panel", {
        "class": "HeroAbility__Properties"
      }, _el$),
      _el$0 = libs.createElement("Label", {
        "class": "HeroAbility__PropertyValue AbilityCooldown",
        get text() {
          return cooldown();
        }
      }, _el$9),
      _el$1 = libs.createElement("Label", {
        "class": "HeroAbility__PropertyValue AbilityManaCost",
        get text() {
          return manaCost();
        }
      }, _el$9),
      _el$10 = libs.createElement("Label", {
        "class": "HeroAbility__PropertyValue AbilityCastRange",
        get text() {
          return abilityData()?.AbilityCastRange;
        }
      }, _el$9),
      _el$11 = libs.createElement("Panel", {
        "class": "HeroAbility_Lore"
      }, _el$),
      _el$12 = libs.createElement("Label", {
        get text() {
          return abilityLore();
        }
      }, _el$11);
    libs.setProp(_el$4, "flowChildren", "down");
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return abilityDetailValues().length > 0;
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
          "class": "HeroAbility__Details"
        }, null);
        libs.insert(_el$8, libs.createComponent(libs.For, {
          get each() {
            return abilityDetailValues();
          },
          children: detail => (() => {
            const _el$13 = libs.createElement("Panel", {
                "class": "HeroAbility__Detail"
              }, null),
              _el$14 = libs.createElement("Label", {
                "class": "HeroAbility__DetailLabel",
                get text() {
                  return detail.label;
                }
              }, _el$13),
              _el$15 = libs.createElement("Label", {
                "class": "HeroAbility__DetailValue",
                html: true,
                get text() {
                  return detail.value;
                }
              }, _el$13);
            libs.effect(_p$ => {
              const _v$11 = detail.label,
                _v$12 = detail.value;
              _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$14, "text", _v$11, _p$._v$11));
              _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$15, "text", _v$12, _p$._v$12));
              return _p$;
            }, {
              _v$11: undefined,
              _v$12: undefined
            });
            return _el$13;
          })()
        }));
        return _el$8;
      }
    }), _el$9);
    libs.effect(_p$ => {
      const _v$ = props.abilityName,
        _v$2 = abilityDisplayName(),
        _v$3 = abilityTag(),
        _v$4 = abilityDescription(),
        _v$5 = abilityData()?.AbilityCooldown != undefined,
        _v$6 = cooldown(),
        _v$7 = manaCost() > 0,
        _v$8 = manaCost(),
        _v$9 = abilityData()?.AbilityCastRange != undefined,
        _v$0 = abilityData()?.AbilityCastRange,
        _v$1 = abilityLore() != "",
        _v$10 = abilityLore();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "abilityname", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "visible", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$0, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$1, "visible", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$1, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$10, "visible", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$10, "text", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$11, "visible", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$12, "text", _v$10, _p$._v$10));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined
    });
    return _el$;
  })();
};

let root = $.GetContextPanel();
function TooltipContents(props) {
  return libs.createComponent(HeroAbility, {
    get abilityName() {
      return props.abilityName;
    },
    get entIndex() {
      return props.entIndex;
    }
  });
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get abilityName() {
      return root.GetAttributeString("abilityName", "");
    },
    get entIndex() {
      return root.GetAttributeInt("entIndex", -1);
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root);
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();