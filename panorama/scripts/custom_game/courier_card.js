--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('courier_card', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');

function CourierCard(props) {
  const [local, others] = libs.splitProps(libs.mergeProps({
    quality: 0,
    star: 0,
    equipped: false,
    assisted: false,
    showLock: true,
    toolOnly: false
  }, props), ["courier_id", "star", "quality", "equipped", "assisted", "explored", "class", "selected", "toolOnly", "showLock", "hideTips"]);
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(others, {
    get ["class"]() {
      return libs.classNames(local.class, "CourierCard", "Rarity" + local.quality, {
        Selected: local.selected,
        Unlock: local.star > 0 || local.showLock == false,
        Equiped: local.equipped,
        Assisted: local.assisted,
        Explored: local.explored
      });
    },
    hittestchildren: false,
    get children() {
      return [libs.createComponent(libs.Show, {
        get when() {
          return local.selected;
        },
        get children() {
          return libs.createElement("DOTAParticleScenePanel", {
            id: "BorderParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
            cameraOrigin: "0 0 93",
            fov: 45,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, null);
        }
      }), libs.createElement("Image", {
        "class": "CourierBG"
      }, null), libs.createComponent(StoreItem.StoreItemImage, {
        get itemid() {
          return local.courier_id;
        },
        get hideTips() {
          return local.hideTips;
        }
      }), (() => {
        const _el$3 = libs.createElement("Image", {
            "class": "CourierAssisted"
          }, null);
          libs.createElement("Label", {
            text: "#courier_assisted"
          }, _el$3);
        return _el$3;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return local.toolOnly;
        },
        get children() {
          return libs.createElement("Label", {
            "class": "CourierInTool",
            text: "ToolOnly"
          }, null);
        }
      }), libs.createElement("Image", {
        "class": "CourierBorder",
        hittest: false
      }, null), (() => {
        const _el$7 = libs.createElement("Image", {
            "class": "CourierEquiped",
            hittest: false
          }, null);
          libs.createElement("Label", {
            text: "#courier_equipped"
          }, _el$7);
        return _el$7;
      })(), libs.createElement("Image", {
        "class": "CourierExplored",
        hittest: false
      }, null), libs.createElement("Image", {
        "class": "CourierLock",
        hittest: false
      }, null)];
    }
  }));
}

exports.CourierCard = CourierCard;