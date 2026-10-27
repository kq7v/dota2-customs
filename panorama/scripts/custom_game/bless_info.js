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
require('./solid_utils.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

let root = $.GetContextPanel();
function getBlessID() {
  return root.GetAttributeString("bless_id", "") || root.GetAttributeString("item_id", "") || root.GetAttributeString("id", "");
}
function getBlessEffectText(blessData) {
  if (!blessData) return "";
  const parts = [];
  if (blessData.attribute) {
    Object.entries(blessData.attribute).forEach(([attribute, value]) => {
      parts.push("<panel class='PropPoint'/>" + GetPropertyLocalization(attribute, value));
    });
  }
  if (blessData.blessing_effect) {
    blessData.blessing_effect.split("|").forEach(effect => {
      parts.push("<panel class='PropPoint'/>" + GetPrivilegeDesc(effect));
    });
  }
  return parts.join("<br>");
}
function TooltipSection(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "BlessInfoTooltipSection"
      }, null),
      _el$2 = libs.createElement("Label", {
        "class": "BlessInfoTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        horizontalAlign: "center",
        marginLeft: "10px",
        flowChildren: "down"
      }, _el$);
    libs.setProp(_el$3, "horizontalAlign", "center");
    libs.setProp(_el$3, "marginLeft", "10px");
    libs.setProp(_el$3, "flowChildren", "down");
    libs.insert(_el$3, () => props.children);
    libs.effect(_$p => libs.setProp(_el$2, "text", props.title, _$p));
    return _el$;
  })();
}
function TooltipContents(props) {
  const blessData = KeyValues.info_item_blessing[props.blessID];
  return (() => {
    const _el$4 = libs.createElement("Panel", {
      id: "BlessInfoTooltip"
    }, null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      when: blessData,
      get children() {
        return [(() => {
          const _el$5 = libs.createElement("Label", {
            id: "BlessInfoTooltipTitle",
            html: true,
            get text() {
              return GetLocalization("#" + props.blessID, props.blessID);
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$5, "text", GetLocalization("#" + props.blessID, props.blessID), _$p));
          return _el$5;
        })(), (() => {
          const _el$6 = libs.createElement("Label", {
            "class": "TooltipPropType",
            get text() {
              return "[" + GetLocalization("#PropType_Bless") + "]";
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$6, "text", "[" + GetLocalization("#PropType_Bless") + "]", _$p));
          return _el$6;
        })(), libs.createComponent(StoreItem.StoreItemImage, {
          id: "BlessInfoTooltipImage",
          get itemid() {
            return props.blessID;
          },
          hideTips: true
        }), libs.createComponent(TooltipSection, {
          get title() {
            return GetLocalization("#Blessing_Effect");
          },
          get children() {
            const _el$7 = libs.createElement("Label", {
              "class": "BlessInfoTooltipEffectDesc",
              html: true,
              get text() {
                return getBlessEffectText(blessData);
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$7, "text", getBlessEffectText(blessData), _$p));
            return _el$7;
          }
        })];
      }
    }));
    return _el$4;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get blessID() {
      return getBlessID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();