--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var StoreItem = require('./StoreItem.js');
var tooltip_base = require('./tooltip_base.js');
require('./solid_utils.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

let root = $.GetContextPanel();
function getExploreSkillDescription(exploreSkill) {
  if (exploreSkill === "") {
    return "";
  }
  const parts = exploreSkill.split(":");
  if (parts.length === 2) {
    return GetPropertyLocalization(parts[0], toFiniteNumber(parts[1], 0));
  }
  const cfg = KeyValues.idle_game_drop_privilege[exploreSkill];
  if (cfg == undefined) {
    return "";
  }
  const desc = getKeyValueDescription(GetLocalization(`#${exploreSkill}`, ""), {
    chance: cfg.chance
  });
  const itemName = GetLocalization(String(cfg.itemid), "");
  return itemName ? `${desc}：${itemName}` : desc;
}
function TooltipContents(props) {
  const baseDropEntries = props.baseDrops.map(drop => {
    const [itemID, count] = drop.split(":");
    return [itemID, parseFloat(count)];
  });
  const extraDropEntries = props.extraDrops.map(drop => {
    const [itemID, count] = drop.split(":");
    return [itemID, parseFloat(count)];
  });
  const exploreSkillDescription = getExploreSkillDescription(props.exploreSkill);
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "CourierExploreTooltip"
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "TooltipTitle0",
        html: true,
        get text() {
          return GetLocalization(props.title);
        }
      }, _el$);
    libs.insert(_el$, exploreSkillDescription !== "" && (() => {
      const _el$3 = libs.createElement("Panel", {
          "class": "ExploreEffectSection"
        }, null),
        _el$4 = libs.createElement("Label", {
          "class": "TooltipSectionTitle",
          get text() {
            return GetLocalization("#CourierExplore_Effect", "信使探险效果");
          }
        }, _el$3),
        _el$5 = libs.createElement("Label", {
          "class": "ExploreEffectDesc",
          html: true,
          text: exploreSkillDescription
        }, _el$3);
      libs.setProp(_el$5, "text", exploreSkillDescription);
      libs.effect(_$p => libs.setProp(_el$4, "text", GetLocalization("#CourierExplore_Effect", "信使探险效果"), _$p));
      return _el$3;
    })(), null);
    libs.insert(_el$, (() => {
      const _c$ = libs.memo(() => baseDropEntries.length > 0);
      return () => _c$() && (() => {
        const _el$6 = libs.createElement("Panel", {
            "class": "DropSection"
          }, null),
          _el$7 = libs.createElement("Label", {
            id: "TooltipTitle1",
            "class": "TooltipSectionTitle",
            get text() {
              return GetLocalization("#CourierExplore_BaseDropPreview");
            }
          }, _el$6),
          _el$8 = libs.createElement("Panel", {
            "class": "DropList"
          }, _el$6);
        libs.insert(_el$8, libs.createComponent(libs.For, {
          each: baseDropEntries,
          children: ([itemID, count]) => {
            return libs.createComponent(StoreItem.StoreItemBlock, {
              item_id: itemID,
              amounts: count
            });
          }
        }));
        libs.effect(_$p => libs.setProp(_el$7, "text", GetLocalization("#CourierExplore_BaseDropPreview"), _$p));
        return _el$6;
      })();
    })(), null);
    libs.insert(_el$, (() => {
      const _c$2 = libs.memo(() => extraDropEntries.length > 0);
      return () => _c$2() && (() => {
        const _el$9 = libs.createElement("Panel", {
            "class": "DropSection"
          }, null),
          _el$0 = libs.createElement("Label", {
            id: "TooltipTitle2",
            "class": "TooltipSectionTitle",
            get text() {
              return GetLocalization("#CourierExplore_ExtraDropPreview");
            }
          }, _el$9),
          _el$1 = libs.createElement("Panel", {
            "class": "DropList"
          }, _el$9);
        libs.insert(_el$1, libs.createComponent(libs.For, {
          each: extraDropEntries,
          children: ([itemID, count]) => {
            return libs.createComponent(StoreItem.StoreItemBlock, {
              item_id: itemID,
              amounts: count
            });
          }
        }));
        libs.effect(_$p => libs.setProp(_el$0, "text", GetLocalization("#CourierExplore_ExtraDropPreview"), _$p));
        return _el$9;
      })();
    })(), null);
    libs.effect(_$p => libs.setProp(_el$2, "text", GetLocalization(props.title), _$p));
    return _el$;
  })();
}
function SetupTooltip() {
  const baseDrops = root.GetAttributeString("baseDrops", "").split("|").filter(drop => drop.trim() !== "");
  const extraDrops = root.GetAttributeString("extraDrops", "").split("|").filter(drop => drop.trim() !== "");
  const exploreSkill = root.GetAttributeString("explore_skill", "") || root.GetAttributeString("exploreSkill", "");
  libs.render(() => libs.createComponent(TooltipContents, {
    get title() {
      return root.GetAttributeString("title", "");
    },
    exploreSkill: exploreSkill,
    baseDrops: baseDrops,
    extraDrops: extraDrops
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();