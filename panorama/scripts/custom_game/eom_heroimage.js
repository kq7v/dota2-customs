--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_HeroImage', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_HeroImage = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_HeroImage", props.heroimagestyle ?? "landscape", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "heroname", "heroid", "heroimagestyle"]);
  const src = libs.createMemo(() => {
    let prefix = "";
    if (local.heroimagestyle == 'icon') {
      prefix = "icons/";
    } else if (local.heroimagestyle == 'portrait') {
      prefix = "selection/";
    }
    if (local.heroname != undefined) {
      return `s2r://panorama/images/heroes/${prefix}${local.heroname}_png.vtex`;
    } else if (local.heroid != undefined) {
      return `s2r://panorama/images/heroes/${prefix}${GetHeroNameByHeroID(local.heroid)}_png.vtex`;
    }
    return "";
  });
  return (() => {
    const _el$ = libs.createElement("Image", libs.mergeProps$1(others, {
      get src() {
        return src();
      },
      scaling: "stretch-to-cover-preserve-aspect"
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get src() {
        return src();
      },
      "scaling": "stretch-to-cover-preserve-aspect"
    }), true);
    libs.insert(_el$, () => local.children);
    return _el$;
  })();
};

exports.EOM_HeroImage = EOM_HeroImage;