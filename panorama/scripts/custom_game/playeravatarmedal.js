--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('PlayerAvatarMedal', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var GenericPanel = require('./GenericPanel.js');
var Heroes = require('./Heroes.js');
var EOM_Image = require('./EOM_Image.js');

const WinStreak = props => {
  let scene;
  const merged = libs.mergeProps$1({
    winnerPosition: "left",
    winStreak: 5,
    type: "normal",
    leftHeroName: "sniper",
    rightHeroName: "nevermore"
  }, props);
  const [local, others] = libs.splitProps(merged, ["oid", "winnerPosition", "winStreak", "type", "leftHeroName", "rightHeroName"]);
  const particleName = () => {
    const kv = KeyValues.CosmeticsKv[props.oid];
    if (kv != undefined && typeof kv.resource == "string") {
      return kv.resource;
    }
    return "particles/eom/ui/ui_fx/ui_fx_streak_broadcast.vpcf";
  };
  const replay = panel => {
    if (props.type == "preview") {
      $.Schedule(3, () => {
        if (panel.IsValid()) {
          panel.TriggerClass("preview");
          panel.FindChildTraverse("WinStreakBG")?.TriggerClass("preview");
          scene?.ReloadScene();
          replay(panel);
        }
      });
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps(() => EOM_Panel.EOMProps(others, {
      className: libs.classNames("WinStreak", local.type, local.oid)
    }), {
      hittest: false
    }), null);
    libs.spread(_el$, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
      className: libs.classNames("WinStreak", local.type, local.oid)
    }), {
      "onload": self => replay(self),
      "hittest": false
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return local.type == "normal";
          },
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "Middle",
              get backgroundImage() {
                return getImagePath("battle_message/win_streak/" + local.oid + ".png");
              },
              hittest: false,
              get children() {
                return libs.createComponent(GenericPanel.CLabel, {
                  id: "WinStreak_Label",
                  get text() {
                    return `#WinStreak_${Math.min(11, local.winStreak)}`;
                  }
                });
              }
            });
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return local.type == "effect";
          },
          get children() {
            const _el$2 = libs.createElement("Panel", {
                id: "MiddleEffect",
                hittest: false,
                hittestchildren: false
              }, null),
              _el$3 = libs.createElement("DOTAParticleScenePanel", {
                get particleName() {
                  return particleName();
                },
                squarePixels: true,
                cameraOrigin: "0 0 100",
                lookAt: "0 0 0",
                fov: 90,
                particleonly: true
              }, _el$2);
            libs.setProp(_el$3, "className", "WinStreakParticle");
            libs.insert(_el$2, libs.createComponent(GenericPanel.CLabel, {
              id: "WinStreakEffect_Label",
              get text() {
                return $.Localize(`#WinStreak_${Math.min(11, local.winStreak)}`);
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$3, "particleName", particleName(), _$p));
            return _el$2;
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return local.type == "preview";
          },
          get children() {
            const _el$4 = libs.createElement("Panel", {
                id: "MiddleEffect",
                hittest: false,
                hittestchildren: false
              }, null),
              _el$5 = libs.createElement("DOTAParticleScenePanel", {
                get particleName() {
                  return particleName();
                },
                squarePixels: true,
                cameraOrigin: "0 0 100",
                lookAt: "0 0 0",
                fov: 90,
                particleonly: true
              }, _el$4);
            const _ref$ = scene;
            typeof _ref$ === "function" ? libs.use(_ref$, _el$5) : scene = _el$5;
            libs.setProp(_el$5, "className", "WinStreakParticle");
            libs.insert(_el$4, libs.createComponent(GenericPanel.CLabel, {
              id: "WinStreakEffect_Label",
              get text() {
                return $.Localize(`#WinStreak_${Math.min(11, local.winStreak)}`);
              }
            }), null);
            libs.effect(_$p => libs.setProp(_el$5, "particleName", particleName(), _$p));
            return _el$4;
          }
        })];
      }
    }), null);
    libs.insert(_el$, libs.createComponent(GenericPanel.CImage, {
      id: "WinStreakBG",
      get src() {
        return getSrcPath("battle_message/win_streak/" + local.oid + ".png");
      },
      hittest: false
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "left",
      get className() {
        return libs.classNames("HeroContainer");
      },
      get children() {
        return [libs.createComponent(EOM_Panel.EOM_Panel, {
          className: 'HeroImageContainer',
          get children() {
            return [libs.createComponent(Heroes.HeroImage, {
              className: "HeroImage",
              get hero_name() {
                return local.leftHeroName;
              },
              get oid() {
                return props.leftSkinID;
              },
              type: "default"
            }), libs.createComponent(EOM_Panel.EOM_Panel, {
              className: 'HeroBorderOverlay'
            })];
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return local.winnerPosition == "right";
          },
          get children() {
            return [libs.createComponent(EOM_Panel.EOM_Panel, {
              className: 'LoserOverlay'
            }), libs.createComponent(EOM_Panel.EOM_Panel, {
              className: 'LoserOverlayMask'
            })];
          }
        })];
      }
    }), null);
    libs.insert(_el$, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "right",
      get className() {
        return libs.classNames("HeroContainer");
      },
      get children() {
        return [libs.createComponent(EOM_Panel.EOM_Panel, {
          className: 'HeroImageContainer',
          get children() {
            return [libs.createComponent(Heroes.HeroImage, {
              className: "HeroImage",
              get hero_name() {
                return local.rightHeroName;
              },
              get oid() {
                return props.rightSkinID;
              },
              type: "default"
            }), libs.createComponent(EOM_Panel.EOM_Panel, {
              className: 'HeroBorderOverlay'
            })];
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return local.winnerPosition == "left";
          },
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              className: 'LoserOverlay'
            });
          }
        })];
      }
    }), null);
    return _el$;
  })();
};

const PlayerAvatarMedal = props => {
  const [local, others] = libs.splitProps(props, ["oid"]);
  const particlePath = libs.createMemo(() => {
    if (local.oid == "5750026") {
      const language = $.Language().toLowerCase();
      if (language == "english") {
        return "particles/eom/ui/ui_fx/ui_fx_s3_s5_champion_en_fx.vpcf";
      } else if (language == "russian") {
        return "particles/eom/ui/ui_fx/ui_fx_s3_s5_champion_ru_fx.vpcf";
      }
      return "particles/eom/ui/ui_fx/ui_fx_s3_s5_champion_fx.vpcf";
    }
    if (KeyValues.CosmeticsKv[local.oid] && KeyValues.CosmeticsKv[local.oid].extra_resource) {
      return KeyValues.CosmeticsKv[local.oid].extra_resource;
    }
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
    className: libs.classNames("PlayerAvatarMedal")
  }), {
    get children() {
      return [libs.createComponent(EOM_Image.EOM_Image, {
        className: "PlayerAvatarMedal_Image",
        get src() {
          return getCosmeticImagePath(local.oid, undefined, false);
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return particlePath();
        },
        get children() {
          const _el$ = libs.createElement("DOTAParticleScenePanel", {
            get particleName() {
              return particlePath();
            },
            cameraOrigin: "0 0 370",
            lookAt: "0 0 0",
            fov: 60
          }, null);
          libs.setProp(_el$, "className", "PlayerAvatarMedal_Particle");
          libs.effect(_$p => libs.setProp(_el$, "particleName", particlePath(), _$p));
          return _el$;
        }
      })];
    }
  }));
};

exports.PlayerAvatarMedal = PlayerAvatarMedal;
exports.WinStreak = WinStreak;