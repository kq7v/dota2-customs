--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_RedMark.js');
require('./EOM_Button.js');

const MENU_LIST = {
  Guide1: [],
  Guide2: [],
  Guide3: []
};
const TUTORIAL_FIRST_PLAY_KEY = "tutorial_first_play";
const {
  LayoutMenu,
  show,
  menuName
} = EOM_MenuLayout.createMenuLayout("guide", () => MENU_LIST);
const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
const [guideRedPointStates, setGuideRedPointStates] = libs.createStore({});
function getGuideRedPointKey(menu) {
  return `guide_menu_clicked_${menu}`;
}
function getSavedGuideRedPointState(menu) {
  const value = player_key_values()[getGuideRedPointKey(menu)]?.value;
  if (value == undefined) return;
  const state = JSON.parseSafe(value);
  if (typeof state?.clicked != "boolean") return;
  return state;
}
function getGuideRedPointState(menu) {
  return guideRedPointStates[menu] ?? getSavedGuideRedPointState(menu);
}
function isGuideMenuUnread(menu) {
  return getGuideRedPointState(menu)?.clicked !== true;
}
function hasCompletedTutorialFirstPlay() {
  return player_key_values()[TUTORIAL_FIRST_PLAY_KEY]?.value == "1";
}
function shouldShowGuideMenuRedPoint(menu) {
  return hasCompletedTutorialFirstPlay() && isGuideMenuUnread(menu);
}
function saveGuideRedPointState(menu, state) {
  setGuideRedPointStates(menu, state);
  CallAction("/v1/key/save", {
    type: "setting",
    key: getGuideRedPointKey(menu),
    value: JSON.stringify(state)
  });
}
function markGuideMenuViewed(menu) {
  if (!hasCompletedTutorialFirstPlay()) return;
  if (!isGuideMenuUnread(menu)) return;
  saveGuideRedPointState(menu, {
    clicked: true
  });
}
libs.createEffect(() => {
  for (const menu of Object.keys(MENU_LIST)) {
    CustomUIConfig.SetRedPoint(shouldShowGuideMenuRedPoint(menu), "guide", menu);
  }
});
libs.createEffect(() => {
  if (!show()) return;
  markGuideMenuViewed(menuName());
});
function GuideRoot() {
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "MenuButton_guide",
    name: "MenuButton_guide",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
        id: "GuideRoot",
        get children() {
          const _el$ = libs.createElement("Panel", {
            "class": "GuideImage"
          }, null);
          libs.effect(_$p => libs.setProp(_el$, "classList", {
            [menuName()]: true
          }, _$p));
          return _el$;
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(GuideRoot, {}), $.GetContextPanel());