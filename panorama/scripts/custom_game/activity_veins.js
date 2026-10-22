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

function ActivityVeinsTooltip(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "ActivityVeinsTooltip"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "ActivityVeinsTooltipTitle"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        "class": "ActivityVeinsTooltipTitleLabel",
        get text() {
          return GetLocalization("#ActivityVeins_Tooltip_RewardTitle");
        }
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        "class": "ActivityVeinsTooltipReward"
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        "class": "ActivityVeinsTooltipRewardIcon"
      }, _el$4);
      libs.createElement("Image", {
        "class": "ActivityVeinsTooltipRewardIconBG"
      }, _el$5);
      const _el$7 = libs.createElement("Panel", {
        "class": "ActivityVeinsTooltipRewardInfo"
      }, _el$4),
      _el$8 = libs.createElement("Label", {
        "class": "ActivityVeinsTooltipRewardInfoName",
        get text() {
          return GetLocalization(`#${props.itemID}`);
        }
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        "class": "ActivityVeinsTooltipRewardInfoAmount",
        get text() {
          return `x${props.displayValue}`;
        }
      }, _el$7);
    libs.insert(_el$5, libs.createComponent(StoreItem.StoreItemImage, {
      get itemid() {
        return props.itemID;
      },
      hideTips: true
    }), null);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#ActivityVeins_Tooltip_RewardTitle"),
        _v$2 = GetLocalization(`#${props.itemID}`),
        _v$3 = `x${props.displayValue}`;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
const root = $.GetContextPanel();
function SetupTooltip() {
  libs.render(() => libs.createComponent(ActivityVeinsTooltip, {
    get itemID() {
      return root.GetAttributeString("item_id", "");
    },
    get displayValue() {
      return root.GetAttributeString("displayValue", "");
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();