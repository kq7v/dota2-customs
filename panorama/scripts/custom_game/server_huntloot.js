--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var huntloot_details = require('./huntloot_details.js');
require('./EOM_Loading.js');
require('./solid_utils.js');
require('./attribute_formatter.js');
require('./equipment_utils.js');
require('./server_huntloot2.js');

let root = $.GetContextPanel();
const [huntlootData, setHuntlootData] = libs.createSignal();
const [id2, SetID2] = libs.createSignal();
const [huntlootData2, setHuntlootData2] = libs.createSignal();
let tooltipRequestVersion = 0;
function parseEntries(value) {
  if (!value) return [];
  if (typeof value === "string") {
    return JSON.parseSafe(value) ?? [];
  }
  return value;
}
function normalizeHuntlootData(rawData) {
  if (!rawData) return undefined;
  const result = {
    ...rawData,
    id: rawData.id ?? 0,
    adverb_entry_data: parseEntries(rawData.adverb_entry_data),
    spell_entry_data: parseEntries(rawData.spell_entry_data),
    in_equip_suit: rawData.in_equip_suit ?? "",
    locked: rawData.locked ?? false
  };
  const kv = KeyValues.info_item_huntloot[result.huntloot_item_id];
  if (kv != undefined) {
    const classSetting = KeyValues.huntloot_class_setting[kv.class];
    result.rarity = result.rarity ?? kv.rarity;
    result.huntloot_part = result.huntloot_part ?? kv.huntloot_part;
    result.class = result.class ?? kv.class;
    result.need_level = result.need_level ?? classSetting?.need_level ?? 1;
  }
  return result;
}
function SetupTooltip() {
  const requestVersion = ++tooltipRequestVersion;
  (async () => {
    setHuntlootData();
    setHuntlootData2();
    SetID2();
    const data = root.GetAttributeString("data", "");
    if (data !== "") {
      const parsedData = normalizeHuntlootData(JSON.parseSafe(data));
      if (parsedData != undefined) {
        setHuntlootData({
          data: parsedData
        });
      }
      return;
    }
    let id1 = root.GetAttributeString("id1", "");
    let id2 = root.GetAttributeString("id2", "");
    const hero_id = root.GetAttributeInt("hero_id", -1);
    let idList = [];
    id1 && idList.push(id1);
    id2 && idList.push(id2);
    if (idList.length > 0) {
      huntloot_details.GetHuntlootDetail(idList, list => {
        if (requestVersion !== tooltipRequestVersion || !root.IsValid()) return;
        libs.batch(() => {
          list[id1] && setHuntlootData({
            data: list[id1],
            hero_id: hero_id
          });
          SetID2(list[id2] ? id2 : undefined);
          list[id2] && setHuntlootData2({
            data: list[id2]
          });
        });
      });
    }
  })();
}
function TooltipContents() {
  return [libs.createComponent(libs.Show, {
    get when() {
      return id2();
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "Detail2",
          get ["class"]() {
            return libs.classNames("DetailContainer", {
              ShowOrnament: huntlootData2() != undefined && huntlootData2().data.rarity >= 7
            });
          }
        }, null);
        libs.createElement("Panel", {
          "class": "BGImg"
        }, _el$);
        const _el$3 = libs.createElement("Panel", {
          "class": "OrnamentPanel"
        }, _el$);
      libs.insert(_el$, libs.createComponent(huntloot_details.ServerHuntlootDetail, {
        get data() {
          return libs.memo(() => !!huntlootData2())() ? {
            ...huntlootData2(),
            hideExtraValue: huntlootData() != undefined
          } : undefined;
        }
      }), _el$3);
      libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("DetailContainer", {
        ShowOrnament: huntlootData2() != undefined && huntlootData2().data.rarity >= 7
      }), _$p));
      return _el$;
    }
  }), (() => {
    const _el$4 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("DetailContainer", {
            ShowOrnament: huntlootData() != undefined && huntlootData().data.rarity >= 7
          });
        }
      }, null);
      libs.createElement("Panel", {
        "class": "BGImg"
      }, _el$4);
      const _el$6 = libs.createElement("Panel", {
        "class": "OrnamentPanel"
      }, _el$4);
    libs.insert(_el$4, libs.createComponent(huntloot_details.ServerHuntlootDetail, {
      get data() {
        return (() => {
          const d = huntlootData();
          return d ? {
            ...d,
            compareData: huntlootData2()?.data
          } : undefined;
        })();
      }
    }), _el$6);
    libs.effect(_$p => libs.setProp(_el$4, "class", libs.classNames("DetailContainer", {
      ShowOrnament: huntlootData() != undefined && huntlootData().data.rarity >= 7
    }), _$p));
    return _el$4;
  })()];
}
(function () {
  libs.render(() => libs.createComponent(TooltipContents, {}), root);
  root.style.overflow = "noclip";
  root.GetParent().style.overflow = "noclip";
  root.GetParent().GetParent().style.overflow = "noclip";
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();