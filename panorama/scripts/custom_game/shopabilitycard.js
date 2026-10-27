--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('ShopAbilityCard', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_Button = require('./EOM_Button.js');
var GenericPanel = require('./GenericPanel.js');
var SectAbility = require('./SectAbility.js');
var SectIcon = require('./SectIcon.js');

const ShopAbilityCard = props => {
  const language = $.Language().toLowerCase();
  const merged = libs.mergeProps$1({
    playerGold: 0
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "isLock", "playerGold", "onClick", "sect_rookie", "effect_rookie", "cost_rookie", "soldOut", "level", "name", "cost", "rookie", "bRefresh", "fu", "team_bless", "bless_enable"]);
  const playerGold = () => local.playerGold;
  const kv = () => KeyValues.AbilityUpgradesKv[local.name];
  const sectList = () => kv().sect.split("|");
  const maxLevel = () => kv().MaxLevel;
  const cost = () => local.cost != undefined ? local.cost : kv().cost;
  const sectDescription = () => $.Localize("#DOTA_Tooltip_ability_mechanics_" + local.name + "_description");
  const goldNotEnough = () => playerGold() < cost();
  const [initLock, setInitLock] = libs.createSignal(!local.isLock);
  libs.createEffect(() => {
    if (local.isLock) {
      setInitLock(false);
    }
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps(() => EOM_Panel.EOMProps(others), {
    get className() {
      return libs.classNames("ShopCard", "Rarity_" + kv().rarity, {
        soldOut: local.soldOut,
        goldNotEnough: goldNotEnough(),
        discount: cost() != -1 && cost() < kv().cost,
        english: language != "schinese",
        Fu: local.fu
      });
    },
    get customTooltip() {
      return libs.memo(() => !!hasKeyWord(sectDescription()))() ? {
        name: "keyword_list",
        keyword_list: JSON.stringify(getKeyWordList(sectDescription()))
      } : undefined;
    },
    onactivate: self => {
      if (!local.soldOut && local.onClick) {
        local.onClick(self);
      }
    },
    get children() {
      return [libs.createComponent(EOM_Image.EOM_Image, {
        id: "ShopCardBG"
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.fu;
        },
        get children() {
          return libs.createElement("DOTAParticleScenePanel", {
            id: "FuCardParticle",
            particleName: "particles/eom/ui/ui_fx/ui_fx_skill_card_fx.vpcf",
            squarePixels: true,
            cameraOrigin: "0 0 400",
            lookAt: "0 0 0",
            fov: 19.5,
            hittest: false
          }, null);
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "TagList",
        onload: self => {
          if (local.sect_rookie) {
            local.sect_rookie(self);
          }
        },
        get children() {
          return libs.createComponent(libs.Index, {
            get each() {
              return sectList();
            },
            children: (sectName, index) => {
              return libs.createComponent(SectIcon.SectIcon, {
                width: "54px",
                height: "54px",
                get sectName() {
                  return sectName();
                }
              });
            }
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "SectImageContainer",
        width: "76px",
        height: "76px",
        horizontalAlign: "center",
        marginTop: "65px",
        get children() {
          return libs.createComponent(SectAbility.SectAbilityImage, {
            get sectAbilityID() {
              return local.name;
            },
            showtooltip: false
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "StarList",
        get children() {
          return [...Array(maxLevel())].map((_, index) => {
            if (local.level < index) {
              return libs.createComponent(EOM_Image.EOM_Image, {
                className: "AbilityStar Black"
              });
            } else if (local.level == index) {
              return libs.createComponent(EOM_Image.EOM_Image, {
                className: "AbilityStar NextLevel"
              });
            } else {
              return libs.createComponent(EOM_Image.EOM_Image, {
                className: "AbilityStar"
              });
            }
          });
        }
      }), libs.createComponent(EOM_Label.EOM_Label, {
        html: true,
        id: "ItemName",
        get text() {
          return "#DOTA_Tooltip_ability_mechanics_" + local.name;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "ItemDescriptionContainer",
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            html: true,
            id: "ItemDescription",
            get text() {
              return getSectDescription(local.name, local.level + 1);
            },
            onload: self => {
              if (local.effect_rookie) {
                local.effect_rookie(self);
              }
            }
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return cost() != -1;
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            id: "CostContainer",
            onload: self => {
              if (local.cost_rookie) {
                local.cost_rookie(self);
              }
            },
            get children() {
              return libs.createComponent(EOM_Panel.EOM_Panel, {
                flowChildren: "right",
                align: "center center",
                get children() {
                  return [libs.createComponent(EOM_Image.EOM_Image, {
                    id: "GoldIcon",
                    get classList() {
                      return {
                        CostHealth: props.costHealth == true
                      };
                    }
                  }), libs.createComponent(GenericPanel.CLabel, {
                    get text() {
                      return cost();
                    }
                  })];
                }
              });
            }
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.soldOut;
        },
        get fallback() {
          return [libs.createComponent(EOM_Image.EOM_Image, {
            id: "ShopCardLockIcon",
            get className() {
              return libs.classNames({
                Lock: local.isLock,
                Unlock: !initLock() && !local.isLock
              });
            }
          }), libs.createComponent(EOM_Image.EOM_Image, {
            id: "ShopCardBlessIcon",
            get tooltip_text() {
              return libs.memo(() => !!local.bless_enable)() ? $.Localize("#TeamBlessAbility") + "<br>" + $.Localize("#TeamBlessAbility_Description") : "#TeamBlessAbilityDisable";
            },
            get className() {
              return libs.classNames({
                BlessOn: local.team_bless,
                BlessEnable: local.bless_enable
              });
            }
          })];
        },
        get children() {
          return libs.createComponent(EOM_Image.EOM_Image, {
            id: "SoldOutBanner"
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.cost == 0 && !local.soldOut;
        },
        get children() {
          return libs.createComponent(EOM_Image.EOM_Image, {
            id: "FreeBanner",
            get children() {
              const _el$2 = libs.createElement("Label", {
                get text() {
                  return ((1 - cost() / kv().cost) * 100).toFixed(0);
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$2, "text", ((1 - cost() / kv().cost) * 100).toFixed(0), _$p));
              return _el$2;
            }
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return local.rookie;
        },
        get children() {
          return libs.createComponent(EOM_Image.EOM_Image, {
            id: "Rookie"
          });
        }
      })];
    }
  }));
};

exports.ShopAbilityCard = ShopAbilityCard;