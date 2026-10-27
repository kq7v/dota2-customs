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

function ActivityDiceTooltipRewardRarity(props) {
  return libs.createComponent(libs.Show, {
    get when() {
      return props.level_key != undefined && props.level_key != "";
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          "class": "ActivityDiceTooltipRewardRarity"
        }, null),
        _el$2 = libs.createElement("Label", {
          html: true,
          get text() {
            return props.level_key ?? "";
          }
        }, _el$);
      libs.insert(_el$, libs.createComponent(libs.Show, {
        get when() {
          return props.exp_desc != undefined && props.exp_desc != "";
        },
        get children() {
          const _el$3 = libs.createElement("Label", {
            get text() {
              return props.exp_desc;
            }
          }, null);
          libs.effect(_p$ => {
            const _v$ = {
                [`Rarity${props.rarity}`]: props.rarity != undefined,
                ["RewardRarityDesc"]: true
              },
              _v$2 = props.exp_desc;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "classList", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$3;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$3 = {
            [`Rarity${props.rarity}`]: props.rarity != undefined,
            ["RewardRarityTitle"]: true
          },
          _v$4 = props.level_key ?? "";
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$2, "classList", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$2, "text", _v$4, _p$._v$4));
        return _p$;
      }, {
        _v$3: undefined,
        _v$4: undefined
      });
      return _el$;
    }
  });
}
function ActivityDiceTooltipRewardList(props) {
  return libs.createComponent(libs.Show, {
    get when() {
      return (props.rewards?.length ?? 0) > 0;
    },
    children: (() => {
      const _el$4 = libs.createElement("Panel", {
        "class": "ActivityDiceTooltipRewardList"
      }, null);
      libs.insert(_el$4, libs.createComponent(libs.For, {
        get each() {
          return props.rewards;
        },
        children: reward => (() => {
          const _el$5 = libs.createElement("Panel", {
              "class": "ActivityDiceTooltipReward"
            }, null),
            _el$6 = libs.createElement("Panel", {
              "class": "ActivityDiceTooltipRewardIcon"
            }, _el$5);
            libs.createElement("Image", {
              "class": "ActivityDiceTooltipRewardIconBG"
            }, _el$6);
            const _el$8 = libs.createElement("Panel", {
              "class": "ActivityDiceTooltipRewardInfo"
            }, _el$5),
            _el$9 = libs.createElement("Label", {
              "class": "ActivityDiceTooltipRewardInfoName",
              html: true,
              get text() {
                return GetLocalization(`#${reward.item_id}`);
              }
            }, _el$8),
            _el$0 = libs.createElement("Label", {
              "class": "ActivityDiceTooltipRewardInfoAmount",
              get text() {
                return `x${reward.amount}`;
              }
            }, _el$8);
          libs.insert(_el$6, libs.createComponent(StoreItem.StoreItemImage, {
            get itemid() {
              return reward.item_id;
            },
            get src() {
              return reward.src_path;
            },
            hideTips: true
          }), null);
          libs.effect(_p$ => {
            const _v$5 = GetLocalization(`#${reward.item_id}`),
              _v$6 = `x${reward.amount}`;
            _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$9, "text", _v$5, _p$._v$5));
            _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$0, "text", _v$6, _p$._v$6));
            return _p$;
          }, {
            _v$5: undefined,
            _v$6: undefined
          });
          return _el$5;
        })()
      }));
      return _el$4;
    })()
  });
}
function ActivityDiceTooltip(props) {
  const hasCurrentPreview = () => props.level_key != undefined && props.level_key != "" || (props.rewards?.length ?? 0) > 0;
  const hasNextPreview = () => hasCurrentPreview() && props.next_level_key != undefined && props.next_level_key != "" && (props.next_rewards?.length ?? 0) > 0;
  return (() => {
    const _el$1 = libs.createElement("Panel", {
        id: "ActivityDiceTooltip"
      }, null);
      libs.createElement("Panel", {
        "class": "ActivityDiceTooltipBG"
      }, _el$1);
      libs.createElement("Panel", {
        "class": "ActivityDiceTooltipBorder"
      }, _el$1);
      const _el$12 = libs.createElement("Panel", {
        "class": "ActivityDiceTooltipContent"
      }, _el$1),
      _el$13 = libs.createElement("Panel", {
        "class": "ActivityDiceTooltipTitle"
      }, _el$12),
      _el$14 = libs.createElement("Label", {
        "class": "ActivityDiceTooltipTitleText",
        get text() {
          return props.title;
        }
      }, _el$13);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return props.description != undefined && props.description != "";
      },
      get children() {
        const _el$15 = libs.createElement("Panel", {
            "class": "ActivityDiceTooltipDescription"
          }, null),
          _el$16 = libs.createElement("Label", {
            html: true,
            get text() {
              return props.description;
            }
          }, _el$15);
        libs.effect(_$p => libs.setProp(_el$16, "text", props.description, _$p));
        return _el$15;
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return hasCurrentPreview() || hasNextPreview();
      },
      get children() {
        const _el$17 = libs.createElement("Panel", {
          "class": "ActivityDiceTooltipRewards"
        }, null);
        libs.insert(_el$17, libs.createComponent(libs.Show, {
          get when() {
            return hasCurrentPreview();
          },
          get children() {
            const _el$18 = libs.createElement("Panel", {
              "class": "ActivityDiceTooltipRewardPreview Current"
            }, null);
            libs.insert(_el$18, libs.createComponent(ActivityDiceTooltipRewardRarity, {
              get level_key() {
                return props.level_key;
              },
              get rarity() {
                return props.rarity;
              },
              get exp_desc() {
                return props.exp_desc;
              }
            }), null);
            libs.insert(_el$18, libs.createComponent(ActivityDiceTooltipRewardList, {
              get rewards() {
                return props.rewards;
              }
            }), null);
            return _el$18;
          }
        }), null);
        libs.insert(_el$17, libs.createComponent(libs.Show, {
          get when() {
            return hasNextPreview();
          },
          get children() {
            return [libs.createElement("Panel", {
              "class": "ActivityDiceTooltipRewardDivider"
            }, null), (() => {
              const _el$20 = libs.createElement("Panel", {
                "class": "ActivityDiceTooltipRewardPreview Next"
              }, null);
              libs.insert(_el$20, libs.createComponent(ActivityDiceTooltipRewardRarity, {
                get level_key() {
                  return props.next_level_key;
                },
                get rarity() {
                  return props.next_rarity;
                },
                get exp_desc() {
                  return props.next_exp_desc;
                }
              }), null);
              libs.insert(_el$20, libs.createComponent(ActivityDiceTooltipRewardList, {
                get rewards() {
                  return props.next_rewards;
                }
              }), null);
              return _el$20;
            })()];
          }
        }), null);
        return _el$17;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$14, "text", props.title, _$p));
    return _el$1;
  })();
}
const root = $.GetContextPanel();
function SetupTooltip() {
  const rewards = JSON.parseSafe(root.GetAttributeString("rewards", "[]"));
  const nextRewards = JSON.parseSafe(root.GetAttributeString("next_rewards", "[]"));
  libs.render(() => libs.createComponent(ActivityDiceTooltip, {
    get title() {
      return root.GetAttributeString("title", "");
    },
    get level_key() {
      return root.GetAttributeString("level_key", "");
    },
    get rarity() {
      return root.GetAttributeInt("rarity", 0) || undefined;
    },
    get exp_desc() {
      return root.GetAttributeString("exp_desc", "");
    },
    get description() {
      return root.GetAttributeString("description", "");
    },
    get rewards() {
      return Array.isArray(rewards) ? rewards : [];
    },
    get next_level_key() {
      return root.GetAttributeString("next_level_key", "");
    },
    get next_rarity() {
      return root.GetAttributeInt("next_rarity", 0) || undefined;
    },
    get next_exp_desc() {
      return root.GetAttributeString("next_exp_desc", "");
    },
    get next_rewards() {
      return Array.isArray(nextRewards) ? nextRewards : [];
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();