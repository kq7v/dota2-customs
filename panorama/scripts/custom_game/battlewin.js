--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('BattleWin', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Image = require('./EOM_Image.js');
var GenericPanel = require('./GenericPanel.js');

const BattleWin = props => {
  const merged = libs.mergeProps({
    type: "normal",
    oid: 5420000
  }, props);
  const replay = panel => {
    if (props.type == "preview") {
      $.Schedule(1.4, () => {
        if (panel.IsValid()) {
          panel.FindChildTraverse("BattleWinSloganEffect")?.TriggerClass("BattleWinSloganEffect");
          panel.FindChildTraverse("BattleWinTextEffect")?.TriggerClass("BattleWinTextEffect");
          panel.FindChildTraverse("Left")?.TriggerClass("Left");
          panel.FindChildTraverse("Right")?.TriggerClass("Right");
          panel.FindChildTraverse("Center")?.TriggerClass("Center");
          replay(panel);
        }
      });
    }
  };
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    get className() {
      return libs.classNames("BattleWin", merged.type, merged.oid);
    },
    onload: self => replay(self),
    get children() {
      return libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return merged.type == "normal";
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "BattleWinSlogan",
                get backgroundImage() {
                  return getImagePath("battle_message/battle_win/" + merged.oid + ".png");
                },
                get children() {
                  return libs.createComponent(GenericPanel.CLabel, {
                    id: "BattleWinText",
                    get text() {
                      return $.Localize(`#BattleWin_default`);
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return merged.type == "effect";
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "BattleWinSloganEffect",
                "class": "BattleWinSloganEffect",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    "class": "BattleWinImage Left",
                    id: "Left",
                    get backgroundImage() {
                      return getImagePath("battle_message/battle_win/" + merged.oid + "_left.png");
                    }
                  }), libs.createComponent(EOM_Image.EOM_Image, {
                    "class": "BattleWinImage Right",
                    id: "Right",
                    get backgroundImage() {
                      return getImagePath("battle_message/battle_win/" + merged.oid + "_right.png");
                    }
                  }), libs.createComponent(EOM_Image.EOM_Image, {
                    "class": "BattleWinImage Center",
                    id: "Center",
                    get backgroundImage() {
                      return getImagePath("battle_message/battle_win/" + merged.oid + ".png");
                    }
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "BattleWinTextEffect",
                    "class": "BattleWinTextEffect",
                    get text() {
                      return $.Localize(`#BattleWin_default`);
                    }
                  })];
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return merged.type == "preview";
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                id: "BattleWinSloganEffect",
                "class": "BattleWinSloganEffect",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    "class": "BattleWinImage Left",
                    id: "Left",
                    get backgroundImage() {
                      return getImagePath("battle_message/battle_win/" + merged.oid + "_left.png");
                    }
                  }), libs.createComponent(EOM_Image.EOM_Image, {
                    "class": "BattleWinImage Right",
                    id: "Right",
                    get backgroundImage() {
                      return getImagePath("battle_message/battle_win/" + merged.oid + "_right.png");
                    }
                  }), libs.createComponent(EOM_Image.EOM_Image, {
                    "class": "BattleWinImage Center",
                    id: "Center",
                    get backgroundImage() {
                      return getImagePath("battle_message/battle_win/" + merged.oid + ".png");
                    }
                  }), libs.createComponent(GenericPanel.CLabel, {
                    id: "BattleWinTextEffect",
                    "class": "BattleWinTextEffect",
                    get text() {
                      return $.Localize(`#BattleWin_default`);
                    }
                  })];
                }
              });
            }
          })];
        }
      });
    }
  });
};

exports.BattleWin = BattleWin;