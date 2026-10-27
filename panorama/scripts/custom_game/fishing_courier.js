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
function TooltipContents(props) {
  const extraDropEntries = props.extraDrops.map(drop => {
    const [itemID, count] = drop.split(":");
    return [itemID, parseFloat(count)];
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "FishingCourierTooltip"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.text !== "";
      },
      get children() {
        const _el$2 = libs.createElement("Label", {
          id: "TooltipDesc",
          html: true,
          get text() {
            return GetLocalization(props.text, props.text);
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$2, "text", GetLocalization(props.text, props.text), _$p));
        return _el$2;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return extraDropEntries.length > 0;
      },
      get children() {
        const _el$3 = libs.createElement("Panel", {
            "class": "DropSection"
          }, null),
          _el$4 = libs.createElement("Label", {
            "class": "TooltipSectionTitle",
            get text() {
              return GetLocalization("#CourierExplore_ExtraDropPreview");
            }
          }, _el$3),
          _el$5 = libs.createElement("Panel", {
            "class": "DropList"
          }, _el$3);
        libs.insert(_el$5, libs.createComponent(libs.For, {
          each: extraDropEntries,
          children: ([itemID, count]) => {
            return libs.createComponent(StoreItem.StoreItemBlock, {
              item_id: itemID,
              amounts: count
            });
          }
        }));
        libs.effect(_$p => libs.setProp(_el$4, "text", GetLocalization("#CourierExplore_ExtraDropPreview"), _$p));
        return _el$3;
      }
    }), null);
    return _el$;
  })();
}
function SetupTooltip() {
  const extraDrops = root.GetAttributeString("extraDrops", "").split("|").filter(drop => drop.trim() !== "");
  libs.render(() => libs.createComponent(TooltipContents, {
    get text() {
      return root.GetAttributeString("text", "");
    },
    extraDrops: extraDrops
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();