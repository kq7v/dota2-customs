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
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
var number_format = require('./number_format.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

let root = $.GetContextPanel();
const playerTreasures = solid_utils.createServiceNetData("player_collection_treasures", {});
function getTreasureID() {
  return root.GetAttributeString("treasure_id", "") || root.GetAttributeString("item_id", "") || root.GetAttributeString("id", "");
}
function attributeTexts(attribute) {
  return Object.entries(attribute ?? {}).map(([attributeName, value]) => {
    return "<panel class='PropPoint'/>" + GetPropertyLocalization(attributeName, number_format.normalizeDisplayNumber(toFiniteNumber(value, 0)));
  });
}
function privilegeTexts(effect, level) {
  if (!effect) return [];
  return effect.split("|").map(privilege => {
    const privilegeID = privilege.trim();
    if (!privilegeID) return "";
    const privilegeData = KeyValues.privilege[privilegeID];
    if (privilegeData == undefined) return "";
    return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilegeID}`, ""), privilegeData.AbilityValues, {
      level,
      onlyShowNowLevel: true
    });
  }).filter(text => text != "");
}
function levelEffectTexts(data, level) {
  return [...attributeTexts(data.attribute), ...privilegeTexts(data.effect, level)].filter(text => text != "");
}
function getTreasureLevels(itemID) {
  const levelConfig = KeyValues.collection_treasure?.[itemID];
  if (!levelConfig) return [];
  return Object.entries(levelConfig).map(([level, data]) => ({
    level: toFiniteNumber(level, 0),
    data: data
  })).filter(({
    level
  }) => level > 0).sort((a, b) => a.level - b.level);
}
function TooltipSection(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "TreasureInfoTooltipSection"
      }, null),
      _el$2 = libs.createElement("Label", {
        "class": "TreasureInfoTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$);
    libs.insert(_el$, () => props.children, null);
    libs.effect(_$p => libs.setProp(_el$2, "text", props.title, _$p));
    return _el$;
  })();
}
function TooltipContents(props) {
  const levels = libs.createMemo(() => getTreasureLevels(props.treasureID));
  const maxLevel = libs.createMemo(() => levels()[levels().length - 1]?.level ?? 0);
  const playerLevel = libs.createMemo(() => {
    const treasureData = playerTreasures()[props.treasureID];
    return Math.max(0, toFiniteNumber(treasureData?.level, 0));
  });
  const currentLevel = libs.createMemo(() => {
    const max = maxLevel();
    return max > 0 ? Math.min(playerLevel(), max) : 0;
  });
  libs.createMemo(() => currentLevel() > 0 ? currentLevel() : 1);
  const effectTexts = libs.createMemo(() => {
    const level = currentLevel();
    if (level <= 0) {
      const firstLevel = levels().find(entry => entry.level == 1);
      if (firstLevel) {
        return levelEffectTexts(firstLevel.data, 1);
      }
      return [];
    }
    const totals = {};
    const privileges = [];
    for (const entry of levels()) {
      if (entry.level > level) continue;
      for (const [attributeName, value] of Object.entries(entry.data.attribute ?? {})) {
        totals[attributeName] = (totals[attributeName] ?? 0) + toFiniteNumber(value, 0);
      }
      const texts = privilegeTexts(entry.data.effect, entry.level);
      if (texts.length > 0) {
        privileges.push(...texts);
      }
    }
    const attributes = Object.entries(totals).map(([attributeName, value]) => {
      return "<panel class='PropPoint'/>" + GetPropertyLocalization(attributeName, number_format.normalizeDisplayNumber(value));
    });
    return [...attributes, ...privileges];
  });
  const sectionTitle = libs.createMemo(() => {
    return currentLevel() <= 0 ? GetLocalization("#TreasureUnlockEffect", "解锁效果") : GetLocalization("#TreasureCurrentAttributeTag", "当前属性");
  });
  return (() => {
    const _el$3 = libs.createElement("Panel", {
        id: "TreasureInfoTooltip"
      }, null),
      _el$4 = libs.createElement("Label", {
        id: "TreasureInfoTooltipTitle",
        html: true,
        get text() {
          return GetLocalization("#" + props.treasureID, props.treasureID);
        }
      }, _el$3),
      _el$5 = libs.createElement("Label", {
        "class": "TooltipPropType",
        get text() {
          return "[" + GetLocalization("#PropType_CollectionTreasure") + "]";
        }
      }, _el$3);
    libs.insert(_el$3, libs.createComponent(StoreItem.StoreItemImage, {
      id: "TreasureInfoTooltipImage",
      get itemid() {
        return props.treasureID;
      },
      hideTips: true
    }), null);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return effectTexts().length > 0;
      },
      get children() {
        return libs.createComponent(TooltipSection, {
          get title() {
            return sectionTitle();
          },
          get children() {
            const _el$6 = libs.createElement("Label", {
              "class": "TreasureInfoTooltipEffectDesc",
              html: true,
              get text() {
                return effectTexts().join("<br>");
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$6, "text", effectTexts().join("<br>"), _$p));
            return _el$6;
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#" + props.treasureID, props.treasureID),
        _v$2 = "[" + GetLocalization("#PropType_CollectionTreasure") + "]";
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$3;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get treasureID() {
      return getTreasureID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();