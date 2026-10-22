--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var equip_details = require('./equip_details.js');
var equipment_utils = require('./equipment_utils.js');
var drawing_attr_row = require('./drawing_attr_row.js');
require('./EOM_Loading.js');
require('./solid_utils.js');
require('./attribute_formatter.js');
require('./server_equipment.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_Button.js');
require('./EOM_TextEntry.js');

let root = $.GetContextPanel();
const [equipData, setEquipData] = libs.createSignal();
const [id2, SetID2] = libs.createSignal();
const [equipData2, setEquipData2] = libs.createSignal();
function parseEntries(value) {
  if (!value) return [];
  if (typeof value === "string") {
    return JSON.parseSafe(value) ?? [];
  }
  return value;
}
function normalizeEquipmentData(rawData) {
  if (!rawData) return undefined;
  const drawingEntries = drawing_attr_row.parseDrawingEntries(rawData.drawing_entry_data);
  const result = {
    ...rawData,
    id: rawData.id ?? 0,
    main_entry_data: parseEntries(rawData.main_entry_data),
    adverb_entry_data: parseEntries(rawData.adverb_entry_data),
    drawing_entry_data: drawingEntries,
    ability_entry_data: parseEntries(rawData.ability_entry_data),
    myth_entry_data: parseEntries(rawData.myth_entry_data),
    chaos_entry_data: parseEntries(rawData.chaos_entry_data),
    inlay_gems_data: rawData.inlay_gems_data ?? "",
    in_equip_suit: rawData.in_equip_suit ?? "",
    locked: rawData.locked ?? false
  };
  const kv = KeyValues.info_item_equipment[result.equipment_item_id];
  if (kv != undefined) {
    const classSetting = KeyValues.equip_class_setting[kv.class];
    result.rarity = result.rarity ?? kv.rarity;
    result.equip_part = result.equip_part ?? kv.equip_part;
    result.class = result.class ?? kv.class;
    result.need_level = result.need_level ?? classSetting?.need_level ?? 1;
  }
  return result;
}
function SetupTooltip() {
  (async () => {
    setEquipData();
    setEquipData2();
    SetID2();
    const data = root.GetAttributeString("data", "");
    if (data !== "") {
      const parsedData = normalizeEquipmentData(JSON.parseSafe(data));
      if (parsedData != undefined) {
        setEquipData({
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
      equipment_utils.GetEquipmentDetail(idList, list => {
        libs.batch(() => {
          list[id1] && setEquipData({
            data: list[id1],
            hero_id: hero_id
          });
          SetID2(id2);
          list[id2] && setEquipData2({
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
              ShowOrnament: equipData2() != undefined && equipData2().data.rarity >= 7
            });
          }
        }, null);
        libs.createElement("Panel", {
          "class": "BGImg"
        }, _el$);
        const _el$3 = libs.createElement("Panel", {
          "class": "OrnamentPanel"
        }, _el$);
      libs.insert(_el$, libs.createComponent(equip_details.ServerEquipDetail, {
        get data() {
          return libs.memo(() => !!equipData2())() ? {
            ...equipData2(),
            hideExtraValue: equipData() != undefined
          } : undefined;
        }
      }), _el$3);
      libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("DetailContainer", {
        ShowOrnament: equipData2() != undefined && equipData2().data.rarity >= 7
      }), _$p));
      return _el$;
    }
  }), (() => {
    const _el$4 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("DetailContainer", {
            ShowOrnament: equipData() != undefined && equipData().data.rarity >= 7
          });
        }
      }, null);
      libs.createElement("Panel", {
        "class": "BGImg"
      }, _el$4);
      const _el$6 = libs.createElement("Panel", {
        "class": "OrnamentPanel"
      }, _el$4);
    libs.insert(_el$4, libs.createComponent(equip_details.ServerEquipDetail, {
      get data() {
        return (() => {
          const d = equipData();
          return d ? {
            ...d,
            compareData: equipData2()?.data
          } : undefined;
        })();
      }
    }), _el$6);
    libs.effect(_$p => libs.setProp(_el$4, "class", libs.classNames("DetailContainer", {
      ShowOrnament: equipData() != undefined && equipData().data.rarity >= 7
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