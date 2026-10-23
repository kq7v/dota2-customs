--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('hero_selection_bar', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var RecycleView = require('./RecycleView.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');

function HeroSmallAvatar(props) {
  const merged = libs.mergeProps({
    selected: false
  }, props);
  const [local, others] = libs.splitProps(merged, ["heroname", "quality", "selected"]);
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Panel", {
        id: "Selected"
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get className() {
        return "HeroSmallAvatar Quality_" + local.quality;
      },
      get classList() {
        return {
          Selected: local.selected
        };
      }
    }), true);
    libs.insert(_el$, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
      id: "HeroMidIconContainer",
      heroimagestyle: "icon",
      get heroname() {
        return local.heroname;
      }
    }), _el$2);
    return _el$;
  })();
}

const HeroSelectionBar = props => {
  const player_heroes = solid_utils.createServiceNetData("player_heroes", {});
  const heroList = libs.createMemo(() => {
    let heroes = player_heroes() ?? {};
    return Object.keys(KeyValues.heroes).sort((a, b) => {
      const heroIDA = GetHeroIDByHeroName(a);
      const heroIDB = GetHeroIDByHeroName(b);
      return (heroes[heroIDB]?.star ?? 0) - (heroes[heroIDA]?.star ?? 0);
    });
  });
  const [selectHeroName, setSelectHeroName] = libs.createSignal(props.selecteHeroName ?? "npc_dota_hero_alp");
  libs.createEffect(() => {
    if (props.selecteHeroName != undefined) {
      setSelectHeroName(props.selecteHeroName);
    }
  });
  let refList;
  const [scrollPercent, SetScrollPercent] = libs.createSignal(0);
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HeroSelectionBar"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "HeroListContainer"
      }, _el$);
      libs.createElement("Panel", {
        id: "Line"
      }, _el$2);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "LeftArrow",
      "class": "HeroSelectionArrow",
      get enabled() {
        return scrollPercent() > 0;
      },
      onactivate: () => refList?.scroll(0, {
        bSet: true
      })
    }), _el$2);
    libs.insert(_el$2, libs.createComponent(RecycleView.RecycleView, {
      id: "HeroSelectionList",
      input: heroList,
      direction: "Horizontal",
      childConfig: {
        width: 72,
        height: 72,
        margin_left: 5,
        margin_right: 5
      },
      showBar: false,
      handle: h => refList = h,
      onScrollPercent: percent => SetScrollPercent(percent),
      children: heroName => {
        const currentHeroName = () => heroName();
        const heroID = GetHeroIDByHeroName(currentHeroName());
        return (() => {
          const _el$4 = libs.createElement("Panel", {
            id: "HeroIconContainer",
            get ["class"]() {
              return libs.classNames({
                Disabled: player_heroes()[heroID] == undefined
              });
            }
          }, null);
          libs.setProp(_el$4, "onactivate", () => {
            const nextHeroName = currentHeroName();
            setSelectHeroName(nextHeroName);
            props.onchange?.(nextHeroName, heroID);
          });
          libs.setProp(_el$4, "onload", self => {
            if (selectHeroName() == currentHeroName()) {
              self.ScrollParentToMakePanelFit(3, false);
            }
          });
          libs.insert(_el$4, libs.createComponent(HeroSmallAvatar, {
            id: "HeroIcon",
            get heroname() {
              return currentHeroName();
            },
            quality: 1,
            get selected() {
              return selectHeroName() == currentHeroName();
            }
          }), null);
          libs.insert(_el$4, libs.createComponent(libs.Show, {
            get when() {
              return props.redPoints?.()[String(heroID)];
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                hittest: false
              });
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$4, "class", libs.classNames({
            Disabled: player_heroes()[heroID] == undefined
          }), _$p));
          return _el$4;
        })();
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "RightArrow",
      "class": "HeroSelectionArrow",
      get enabled() {
        return scrollPercent() < 1;
      },
      onactivate: () => refList?.scroll(100, {
        bSet: true,
        bPercent: true
      })
    }), null);
    return _el$;
  })();
};

exports.HeroSelectionBar = HeroSelectionBar;