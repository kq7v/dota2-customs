--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Button = require('./EOM_Button.js');
var ProductImage = require('./ProductImage.js');
require('./EOMDesign.js');
require('./GenericPanel.js');
require('./EOM_Icon.js');

const language = $.Language().toLowerCase();
const dataMap = {
  "3000012": {
    itemid: 9900303,
    count: 1
  },
  "3000018": {
    itemid: 9900302,
    count: 1
  },
  "3000004": {
    itemid: 9900307,
    count: 1
  },
  "3000037": {
    itemid: 9900316,
    count: 1
  },
  "1100001": {
    itemid: 1100001,
    count: 3000
  }
};
function FirstRecharge() {
  const [show, setShow] = libs.createSignal(false);
  const [rewardInfoList, setRewardInfoList] = libs.createSignal([]);
  const [loginActivityData, setLoginActivityData] = libs.createSignal();
  const itemid = () => dataMap[loginActivityData()?.extra ?? ""]?.itemid;
  const count = () => dataMap[loginActivityData()?.extra ?? ""]?.count;
  const haveReceived = () => Object.keys(loginActivityData()?.rewards ?? {}).some(index => loginActivityData()?.rewards[index] == 0);
  libs.createEffect(libs.on(show, showed => {
    if (showed) {
      callAction("activity_data", {
        activity_id: 1002
      });
    }
  }));
  libs.onMount(() => {
    let gameEventIDList = [];
    gameEventIDList.push(useToggleWindow("MenuButton_recharge", show, setShow));
    gameEventIDList.push(useNetData("info_activity_data", data => {
      for (const activityInfo of data) {
        if (activityInfo.activity_id == 1002) {
          const reward = JSON.parse(activityInfo.extra_information);
          setRewardInfoList(reward.rewards);
        }
      }
    }));
    gameEventIDList.push(useNetData("login_activity_data", data => {
      if (data["1002"] != undefined) {
        setLoginActivityData(data["1002"]);
      }
    }, Players.GetLocalPlayer()));
    libs.onCleanup(() => {
      gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
    });
  });
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    id: "FirstRecharge",
    get ["class"]() {
      return libs.classNames({
        Show: show()
      });
    },
    get children() {
      return libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "Main",
        horizontalAlign: "center",
        marginTop: "96px",
        onactivate: () => {},
        get children() {
          return [(() => {
            const _el$ = libs.createElement("Image", {
              id: "Title",
              "class": language
            }, null);
            libs.setProp(_el$, "class", language);
            return _el$;
          })(), libs.createElement("Image", {
            id: "BG"
          }, null), (() => {
            const _el$3 = libs.createElement("Image", {
                id: "Ornaments",
                "class": language
              }, null);
              libs.createElement("Label", {
                text: "#total_value",
                id: "TotalValue"
              }, _el$3);
              const _el$5 = libs.createElement("Label", {
                html: true,
                text: "#total_value_Label",
                id: "TotalValueLabel",
                dialogVariables: {
                  value: 300
                }
              }, _el$3);
            libs.setProp(_el$3, "class", language);
            libs.setProp(_el$5, "dialogVariables", {
              value: 300
            });
            return _el$3;
          })(), libs.createElement("Image", {
            id: "Pudge"
          }, null), libs.createElement("Image", {
            id: "Sniper"
          }, null), libs.createElement("Image", {
            id: "Ogre"
          }, null), libs.createElement("Image", {
            id: "Lycan"
          }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
            zIndex: 2,
            marginLeft: "789px",
            tooltip: "#FirstRechargeInfo",
            get children() {
              return [libs.createElement("Image", {
                id: "InfoImage"
              }, null), libs.createElement("Label", {
                id: "InfoLabel",
                text: "#SnowballInfo"
              }, null)];
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            align: "center bottom",
            marginBottom: "105px",
            flowChildren: "right",
            zIndex: 10,
            get children() {
              return libs.createComponent(libs.Index, {
                get each() {
                  return rewardInfoList();
                },
                children: (reward, index) => {
                  const itemName = () => index == 0 ? itemid() : reward()?.rewards?.[0]?.item_id;
                  const itemCount = () => index == 0 ? count() : reward()?.rewards?.[0]?.amounts;
                  const enable = () => reward().reward_id == 1 ? loginActivityData()?.rewards["1"] == 0 : false;
                  const received = () => loginActivityData()?.rewards[String(index + 1)] == 1;
                  return libs.createComponent(Selection, {
                    get day() {
                      return reward().reward_id;
                    },
                    get enable() {
                      return enable();
                    },
                    get received() {
                      return received();
                    },
                    get itemName() {
                      return itemName();
                    },
                    get count() {
                      return itemCount();
                    }
                  });
                }
              });
            }
          }), libs.createComponent(libs.Switch, {
            get children() {
              return [libs.createComponent(libs.Match, {
                get when() {
                  return (loginActivityData()?.active ?? false) == false;
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "UnlockButton",
                    onactivate: () => {
                      clientSideEvent("toggle_store_tag", {
                        menu: "Resource"
                      });
                    },
                    get children() {
                      return libs.createElement("Label", {
                        text: "#UnlockRecharge",
                        id: "UnlockLabel"
                      }, null);
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => !!(loginActivityData()?.active ?? false))() && haveReceived();
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "UnlockButton",
                    onactivate: () => {
                      callAction("activity_receive", {
                        activity_id: 1002,
                        reward_id: loginActivityData()?.progress ?? 1
                      });
                    },
                    get children() {
                      return libs.createElement("Label", {
                        text: "#activity_action_receive",
                        id: "UnlockLabel"
                      }, null);
                    }
                  });
                }
              }), libs.createComponent(libs.Match, {
                get when() {
                  return libs.memo(() => !!(loginActivityData()?.active ?? false))() && !haveReceived();
                },
                get children() {
                  return libs.createComponent(EOM_Button.EOM_BaseButton, {
                    id: "UnlockButton",
                    enabled: false,
                    get children() {
                      return libs.createElement("Label", {
                        text: "#TomorrowCanReceive",
                        id: "UnlockLabel"
                      }, null);
                    }
                  });
                }
              })];
            }
          }), libs.createComponent(EOM_Button.EOM_CloseButton, {
            onactivate: () => ToggleWindows("MenuButton_recharge", false)
          })];
        }
      });
    }
  });
}
function Selection(props) {
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    margin: "0px 88px",
    get children() {
      return [(() => {
        const _el$15 = libs.createElement("Image", {
            "class": "Mark"
          }, null),
          _el$16 = libs.createElement("Label", {
            text: "#RechargeReceive",
            get dialogVariables() {
              return {
                day: props.day
              };
            }
          }, _el$15);
        libs.effect(_$p => libs.setProp(_el$16, "dialogVariables", {
          day: props.day
        }, _$p));
        return _el$15;
      })(), libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "RewardContainer",
        get enabled() {
          return props.enable ?? false;
        },
        onactivate: () => {
          showPopup("FirstRecharge", {});
        },
        get children() {
          return libs.createElement("Image", {
            "class": "Add"
          }, null);
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.received;
        },
        get children() {
          return libs.createElement("Image", {
            "class": "Check"
          }, null);
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.day == 1;
        },
        get children() {
          const _el$19 = libs.createElement("Image", {
              "class": "HeroSelect"
            }, null);
            libs.createElement("Label", {
              text: "#RechargeHeroSelect"
            }, _el$19);
          return _el$19;
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.itemName != undefined;
        },
        get children() {
          return libs.createComponent(ProductImage.ProductImage, {
            width: "179px",
            height: "179px",
            horizontalAlign: "center",
            get itemid() {
              return Number(props.itemName);
            }
          });
        }
      }), libs.createComponent(libs.Show, {
        get when() {
          return props.count != undefined;
        },
        get children() {
          const _el$21 = libs.createElement("Label", {
            "class": "ItemCount",
            get text() {
              return "×" + props.count;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$21, "text", "×" + props.count, _$p));
          return _el$21;
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(FirstRecharge, {}), $.GetContextPanel());