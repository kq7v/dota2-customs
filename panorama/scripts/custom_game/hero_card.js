--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('hero_card', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
var EOM_Button = require('./EOM_Button.js');

const HeroCard = props => {
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(() => libs.mergeProps(props, {
    class: libs.classNames("HeroCard", {
      Selected: props.selected == true
    }, props.class)
  }), {
    get children() {
      return [libs.createElement("DOTAParticleScenePanel", {
        "class": "BorderParticle",
        particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
        cameraOrigin: "0 0 90",
        fov: 45,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null), libs.createElement("Panel", {
        id: "HeroCardBG"
      }, null), libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
        get heroname() {
          return props.heroName;
        },
        heroimagestyle: "portrait",
        get opacityMask() {
          return getImagePath("h2_hero/h2_mask.png");
        }
      }), libs.createElement("Panel", {
        id: "HeroCardBorder"
      }, null)];
    }
  }));
};

exports.HeroCard = HeroCard;