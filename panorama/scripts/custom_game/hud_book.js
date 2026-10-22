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
var collection = require('./collection.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var solid_utils = require('./solid_utils.js');
var EOM_CheckBox = require('./EOM_CheckBox.js');
var EOM_FilterChip = require('./EOM_FilterChip.js');
var EOM_SearchBox = require('./EOM_SearchBox.js');
var common_box = require('./common_box.js');
var common_item = require('./common_item.js');
var upgrade_box = require('./upgrade_box.js');
var upgrade_icon = require('./upgrade_icon.js');
var hero_selection_bar = require('./hero_selection_bar.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
var EOM_Loading = require('./EOM_Loading.js');
var Player = require('./Player.js');
var RankBadgeBanner = require('./RankBadgeBanner.js');
var hero_card = require('./hero_card.js');
var fishRod3DPreview = require('./fishRod3DPreview.js');
var weapon3DPreview = require('./weapon3DPreview.js');
var server_equipment = require('./server_equipment.js');
require('./EOM_CostLabel.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');
require('./EOM_Icon.js');
require('./EOM_HotKeyDisplay.js');
require('./hotkey_label.js');
require('./EOM_GamePad.js');
require('./RecycleView.js');
require('./EOM_TextEntry.js');

function GetAchieveCfg(type, playerAchievements) {
  let ret = {};
  const tempGroups = {};
  for (let value of Object.values(KeyValues.task)) {
    if (value.type != type) {
      continue;
    }
    if (value.status != 1) {
      continue;
    }
    if (tempGroups[value.achievement_group] == undefined) {
      tempGroups[value.achievement_group] = [];
    }
    tempGroups[value.achievement_group].push(value);
  }
  for (const [groupId, tasks] of Object.entries(tempGroups)) {
    const groupKey = toFiniteNumber(groupId);
    const items = tasks.map(task => {
      const playerData = playerAchievements[task.task_id];
      const progress = playerData?.progress ?? 0;
      const target = task.target ?? 0;
      const receiveProgress = playerData?.receive_progress ?? 0;
      const rewards = task.rewards ?? {};
      const rewardKeys = Object.keys(rewards);
      const rewardValues = Object.values(rewards);
      const DescID = String(task.task_description == 1 ? task.task_id : task.event_id == 10 ? `${task.event_id}_${task.param_1}` : task.event_id);
      return {
        task_id: task.task_id,
        extra_id: playerData?.extra_id ?? 0,
        target: target,
        description: DescID,
        reward: rewardValues.length > 0 ? {
          itemId: toFiniteNumber(rewardKeys[0]),
          count: rewardValues[0]
        } : undefined,
        progress: progress,
        isCompleted: progress >= target,
        isReceived: receiveProgress > 0,
        predecessor_id: task.activity_id || undefined,
        param_1: task.param_1,
        param_2: task.param_2,
        param_3: task.param_3,
        param_4: task.param_4,
        param_s1: task.param_s1,
        icon: task.icon
      };
    });
    const chains = buildAchievementChains(items);
    chains.sort((a, b) => {
      const aAllCompleted = a.items.every(item => item.isCompleted);
      const bAllCompleted = b.items.every(item => item.isCompleted);
      const aAllReceived = a.items.every(item => item.isReceived);
      const bAllReceived = b.items.every(item => item.isReceived);
      if (aAllReceived !== bAllReceived) {
        return aAllReceived ? 1 : -1;
      }
      if (aAllCompleted !== bAllCompleted) {
        return aAllCompleted ? -1 : 1;
      }
      return 0;
    });
    const completedCount = chains.filter(chain => chain.items.every(item => item.isReceived)).length;
    const totalCount = chains.length;
    ret[groupKey] = {
      chains,
      completedCount,
      totalCount
    };
  }
  return ret;
}
function buildAchievementChains(items) {
  const chains = [];
  const processedIds = new Set();
  const itemMap = new Map();
  items.forEach(item => {
    itemMap.set(item.task_id, item);
  });
  items.forEach(item => {
    if (processedIds.has(item.task_id)) {
      return;
    }
    let chainStart = item;
    let current = item;
    while (current.predecessor_id && itemMap.has(current.predecessor_id)) {
      chainStart = itemMap.get(current.predecessor_id);
      current = chainStart;
    }
    const chainItems = [];
    current = chainStart;
    while (current) {
      if (processedIds.has(current.task_id)) {
        break;
      }
      chainItems.push(current);
      processedIds.add(current.task_id);
      const nextItem = items.find(i => i.predecessor_id === current.task_id);
      current = nextItem || undefined;
    }
    if (chainItems.length > 0) {
      const displayIndex = selectDisplayItem(chainItems);
      chains.push({
        items: chainItems,
        displayIndex: displayIndex
      });
    }
  });
  return chains;
}
function selectDisplayItem(chainItems) {
  const notReceivedIndex = chainItems.findIndex(item => !item.isReceived);
  if (notReceivedIndex === -1) {
    return chainItems.length - 1;
  }
  return notReceivedIndex;
}
const [bRequesting, SetRequesting] = libs.createSignal(false);
const receive = info => {
  if (bRequesting()) return;
  if (info == undefined || info.isCompleted == false || info.isReceived) return;
  SetRequesting(true);
  CallActionRequest("/v1/task/receive_rewards", {
    task_id: info.task_id,
    extra_id: info.extra_id
  }, data => {
    SetRequesting(false);
  });
};
const playerAchievements = service_netdata_helper.usePlayerAchievements();
const groupedAchievements = libs.createMemo(() => {
  return GetAchieveCfg(3, playerAchievements());
});
libs.createEffect(() => {
  const groups = groupedAchievements();
  for (const groupId of Object.keys(groups)) {
    const group = groups[toFiniteNumber(groupId)];
    const canReceive = group.chains.some(chain => {
      const item = chain.items[chain.displayIndex];
      return item.isCompleted && !item.isReceived;
    });
    CustomUIConfig.SetRedPoint(canReceive, "book", "Achieve_Menu", `Achievement_Group_${groupId}`);
  }
});
const Achievement = () => {
  const [selectGroup, setSelectGroup] = libs.createSignal(Object.keys(groupedAchievements())[0] ?? 0);
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Achievement",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "AchievementBlock"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "AchievementTop"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "AchievementContent",
          scroll: "y",
          "class": "VerticalScrollStyle"
        }, _el$);
      libs.insert(_el$2, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(groupedAchievements());
        },
        children: achievement_group => {
          const group = () => groupedAchievements()[toFiniteNumber(achievement_group)];
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            get ["class"]() {
              return libs.classNames("AchievementGroup", "Group" + achievement_group, {
                "Selected": selectGroup() == achievement_group
              });
            },
            onactivate: () => {
              setSelectGroup(achievement_group);
            },
            get children() {
              return [(() => {
                const _el$4 = libs.createElement("Panel", {
                    width: "100%",
                    height: "178px",
                    align: "center top",
                    hittest: false,
                    hittestchildren: false
                  }, null);
                  libs.createElement("Panel", {
                    "class": "Border"
                  }, _el$4);
                  libs.createElement("Panel", {
                    "class": "Bg"
                  }, _el$4);
                  const _el$7 = libs.createElement("Image", {
                    "class": "Icon",
                    get src() {
                      return getSrcPath(`a1_achievement/group_${toFiniteNumber(achievement_group)}.png`);
                    }
                  }, _el$4);
                libs.setProp(_el$4, "width", "100%");
                libs.setProp(_el$4, "height", "178px");
                libs.setProp(_el$4, "align", "center top");
                libs.effect(_$p => libs.setProp(_el$7, "src", getSrcPath(`a1_achievement/group_${toFiniteNumber(achievement_group)}.png`), _$p));
                return _el$4;
              })(), (() => {
                const _el$8 = libs.createElement("Panel", {
                    width: "100%",
                    height: "46px",
                    align: "center bottom",
                    flowChildren: "down"
                  }, null),
                  _el$9 = libs.createElement("Label", {
                    "class": "GroupName",
                    text: `#AchieveGroup_${achievement_group}`
                  }, _el$8),
                  _el$0 = libs.createElement("Label", {
                    "class": "GroupCount",
                    get text() {
                      return `${group().completedCount}/${group().totalCount}`;
                    }
                  }, _el$8);
                libs.setProp(_el$8, "width", "100%");
                libs.setProp(_el$8, "height", "46px");
                libs.setProp(_el$8, "align", "center bottom");
                libs.setProp(_el$8, "flowChildren", "down");
                libs.setProp(_el$9, "text", `#AchieveGroup_${achievement_group}`);
                libs.effect(_$p => libs.setProp(_el$0, "text", `${group().completedCount}/${group().totalCount}`, _$p));
                return _el$8;
              })(), libs.createComponent(libs.Show, {
                get when() {
                  return group().chains.some(chain => {
                    const item = chain.items[chain.displayIndex];
                    return item.isCompleted && !item.isReceived;
                  });
                },
                get children() {
                  return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                    align: "right top",
                    type: "exclamation"
                  });
                }
              })];
            }
          });
        }
      }));
      libs.setProp(_el$3, "scroll", "y");
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return groupedAchievements()[toFiniteNumber(selectGroup())]?.chains ?? [];
        },
        children: achievementChain => {
          const achievementItem = achievementChain.items[achievementChain.displayIndex];
          return (() => {
            const _el$1 = libs.createElement("Panel", {
                "class": "AchievementRow"
              }, null),
              _el$10 = libs.createElement("Image", {
                id: "Icon",
                get src() {
                  return libs.memo(() => !!achievementItem.icon)() ? getSrcPath(`task_icons/${achievementItem.icon}.png`) : getSrcPath(`task_icons/${achievementItem.task_id}.png`);
                },
                hittest: false
              }, _el$1);
              libs.createElement("Panel", {
                id: "Line"
              }, _el$1);
              const _el$12 = libs.createElement("Panel", {
                width: "546px",
                marginTop: "32px",
                marginLeft: "128px"
              }, _el$1),
              _el$13 = libs.createElement("Panel", {
                width: "100%"
              }, _el$12),
              _el$14 = libs.createElement("Label", {
                id: "Name",
                get text() {
                  return toFiniteNumber(selectGroup()) == 999 && !achievementItem.isCompleted ? "?????" : `#Task_Name_${achievementItem.description}`;
                }
              }, _el$13),
              _el$15 = libs.createElement("Label", {
                id: "Description",
                get vars() {
                  return {
                    param_s1: GetLocalization("#" + achievementItem.param_s1),
                    target: String(achievementItem.target)
                  };
                },
                get text() {
                  return toFiniteNumber(selectGroup()) == 999 && !achievementItem.isCompleted ? "?????" : `#Task_Desc_${achievementItem.description}`;
                }
              }, _el$12),
              _el$16 = libs.createElement("Panel", {
                height: "20px",
                marginTop: "60px"
              }, _el$12),
              _el$17 = libs.createElement("Panel", {
                "class": "AchievementExpBar"
              }, _el$16),
              _el$18 = libs.createElement("Panel", {
                "class": "AchievementExpFill",
                get width() {
                  return `${achievementItem.target > 0 ? achievementItem.progress / achievementItem.target * 100 : 0}%`;
                }
              }, _el$17),
              _el$19 = libs.createElement("Label", {
                "class": "AchievementExpValue",
                get text() {
                  return `${achievementItem.progress}/${achievementItem.target}`;
                }
              }, _el$16),
              _el$22 = libs.createElement("Panel", {
                id: "Light"
              }, _el$1);
            libs.setProp(_el$1, "onactivate", () => {
              receive(achievementItem);
            });
            libs.setProp(_el$12, "width", "546px");
            libs.setProp(_el$12, "marginTop", "32px");
            libs.setProp(_el$12, "marginLeft", "128px");
            libs.setProp(_el$13, "width", "100%");
            libs.setProp(_el$16, "height", "20px");
            libs.setProp(_el$16, "marginTop", "60px");
            libs.insert(_el$1, libs.createComponent(libs.Show, {
              get when() {
                return achievementItem.reward !== undefined;
              },
              get children() {
                const _el$20 = libs.createElement("Panel", {
                    id: "CollectionIconContainer"
                  }, null),
                  _el$21 = libs.createElement("Panel", {
                    id: "Claimed"
                  }, _el$20);
                libs.insert(_el$20, libs.createComponent(StoreItem.StoreItemBlock, {
                  id: "CollectionIcon",
                  get item_id() {
                    return achievementItem.reward.itemId;
                  },
                  get amounts() {
                    return achievementItem.reward.count;
                  }
                }), _el$21);
                return _el$20;
              }
            }), _el$22);
            libs.effect(_p$ => {
              const _v$ = {
                  Finished: achievementItem.isCompleted,
                  Received: achievementItem.isReceived
                },
                _v$2 = achievementItem.isCompleted,
                _v$3 = libs.memo(() => !!achievementItem.icon)() ? getSrcPath(`task_icons/${achievementItem.icon}.png`) : getSrcPath(`task_icons/${achievementItem.task_id}.png`),
                _v$4 = toFiniteNumber(selectGroup()) == 999 && !achievementItem.isCompleted ? "?????" : `#Task_Name_${achievementItem.description}`,
                _v$5 = {
                  param_s1: GetLocalization("#" + achievementItem.param_s1),
                  target: String(achievementItem.target)
                },
                _v$6 = toFiniteNumber(selectGroup()) == 999 && !achievementItem.isCompleted ? "?????" : `#Task_Desc_${achievementItem.description}`,
                _v$7 = `${achievementItem.target > 0 ? achievementItem.progress / achievementItem.target * 100 : 0}%`,
                _v$8 = `${achievementItem.progress}/${achievementItem.target}`;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$1, "classList", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "enabled", _v$2, _p$._v$2));
              _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "src", _v$3, _p$._v$3));
              _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "text", _v$4, _p$._v$4));
              _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "vars", _v$5, _p$._v$5));
              _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$15, "text", _v$6, _p$._v$6));
              _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$18, "width", _v$7, _p$._v$7));
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$19, "text", _v$8, _p$._v$8));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined,
              _v$3: undefined,
              _v$4: undefined,
              _v$5: undefined,
              _v$6: undefined,
              _v$7: undefined,
              _v$8: undefined
            });
            return _el$1;
          })();
        }
      }));
      return _el$;
    }
  });
};

const blessingList = {};
Object.entries(KeyValues.info_item_blessing).forEach(([key, data], idx) => {
  if (data.hide == 1) return;
  const rarity = GetServiceItemRarity(data.id);
  blessingList[rarity] ??= [];
  blessingList[rarity].push(data);
});
const player_blessings = solid_utils.createServiceNetData("player_blessings", {});
const getBuffIdFromItemId = itemId => {
  return itemId.slice(-3);
};
function getBlessingEffectText(data) {
  const parts = [];
  if (data.attribute) {
    Object.entries(data.attribute).forEach(([attribute, value]) => {
      parts.push("<panel class='PropPoint'/>" + GetPropertyLocalization(attribute, value));
    });
  }
  if (data.blessing_effect) {
    data.blessing_effect.split("|").forEach(effect => {
      parts.push("<panel class='PropPoint'/>" + GetPrivilegeDesc(effect));
    });
  }
  return parts.join("<br>");
}
const Blessing = () => {
  const [selectedID, SetSelectedID] = libs.createSignal(Object.keys(KeyValues.info_item_blessing)[0]);
  const selectedData = libs.createMemo(() => KeyValues.info_item_blessing[selectedID()]);
  const selectedItemRarity = libs.createMemo(() => GetServiceItemRarity(selectedID()));
  const upgradeAttributeText = libs.createMemo(() => {
    return getBlessingEffectText(selectedData());
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Blessing",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "BlessingBlock"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "BlessingList",
          scroll: "y",
          "class": "VerticalScrollStyle"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "BlessingDetail"
        }, _el$),
        _el$4 = libs.createElement("Label", {
          id: "BlessingName",
          get text() {
            return "#" + selectedID();
          },
          get ["class"]() {
            return "Rarity" + selectedItemRarity();
          }
        }, _el$3),
        _el$5 = libs.createElement("Panel", {
          id: "BlessingImageBG"
        }, _el$3),
        _el$6 = libs.createElement("Panel", {
          id: "AccessDivider"
        }, _el$3);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$6);
        libs.createElement("Label", {
          id: "AccessTitle",
          text: "#Blessing_Effect"
        }, _el$6);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$6);
        const _el$0 = libs.createElement("Panel", {
          id: "BlessingEffectBlock"
        }, _el$3),
        _el$1 = libs.createElement("Label", {
          id: "BlessingEffect",
          html: true,
          get text() {
            return upgradeAttributeText();
          }
        }, _el$0),
        _el$10 = libs.createElement("Panel", {
          id: "AccessDivider"
        }, _el$3);
        libs.createElement("Image", {
          id: "LineLeft"
        }, _el$10);
        libs.createElement("Label", {
          id: "AccessTitle",
          text: "#Blessing_Access"
        }, _el$10);
        libs.createElement("Image", {
          id: "LineRight"
        }, _el$10);
        const _el$14 = libs.createElement("Label", {
          id: "AccessDesc",
          get text() {
            return GetLocalization(`#${selectedID()}_Access`);
          }
        }, _el$3);
      libs.setProp(_el$2, "scroll", "y");
      libs.insert(_el$2, libs.createComponent(libs.For, {
        get each() {
          return Object.keys(blessingList).sort((a, b) => Number(b) - Number(a));
        },
        children: (rarity, index) => {
          return [(() => {
            const _el$15 = libs.createElement("Panel", {
                "class": "BlessingRarityTitle Rarity" + rarity
              }, null),
              _el$16 = libs.createElement("Label", {
                "class": "RarityTitle",
                text: `#Blessing_Rarity${rarity}`
              }, _el$15);
            libs.setProp(_el$15, "class", "BlessingRarityTitle Rarity" + rarity);
            libs.setProp(_el$16, "text", `#Blessing_Rarity${rarity}`);
            libs.effect(_$p => libs.setProp(_el$15, "classList", {
              First: index() == 0
            }, _$p));
            return _el$15;
          })(), libs.createComponent(libs.For, {
            get each() {
              return blessingList[rarity];
            },
            children: ({
              id
            }) => {
              const itemData = () => player_blessings()[getBuffIdFromItemId(String(id))];
              const isOwned = () => {
                const data = itemData();
                if (!data) return false;
                if (data.permanent) return true;
                return data.expire_time > Date.now() / 1000;
              };
              return (() => {
                const _el$17 = libs.createElement("Panel", {
                    "class": "BlessingCard"
                  }, null);
                  libs.createElement("DOTAParticleScenePanel", {
                    id: "SelectParticle",
                    particleName: "particles/ui/game/ui_game_general_special_effects_03_fx.vpcf",
                    cameraOrigin: "0 0 37",
                    fov: 90,
                    lookAt: "0 0 0",
                    hittest: false,
                    squarePixels: true
                  }, _el$17);
                  libs.createElement("Panel", {
                    id: "CardBG"
                  }, _el$17);
                  const _el$20 = libs.createElement("Label", {
                    id: "Name",
                    text: "#" + id
                  }, _el$17);
                  libs.createElement("Image", {
                    id: "LockIcon",
                    hittest: false
                  }, _el$17);
                  libs.createElement("Panel", {
                    id: "SelectedHover",
                    hittest: false
                  }, _el$17);
                libs.setProp(_el$17, "onactivate", () => SetSelectedID(String(id)));
                libs.insert(_el$17, libs.createComponent(StoreItem.StoreItemImage, {
                  id: "BlessingIcon",
                  itemid: id
                }), _el$20);
                libs.setProp(_el$20, "text", "#" + id);
                libs.insert(_el$17, libs.createComponent(libs.Show, {
                  get when() {
                    return libs.memo(() => itemData() != undefined)() && itemData().expire_time > 0;
                  },
                  get children() {
                    return libs.createComponent(EOM_Countdown.EOM_Countdown, {
                      get endTime() {
                        return itemData().expire_time;
                      }
                    });
                  }
                }), null);
                libs.effect(_$p => libs.setProp(_el$17, "classList", {
                  ["Rarity" + rarity]: true,
                  Lock: !isOwned(),
                  Selected: selectedID() == String(id)
                }, _$p));
                return _el$17;
              })();
            }
          })];
        }
      }));
      libs.insert(_el$5, libs.createComponent(StoreItem.StoreItemImage, {
        id: "BlessingIcon",
        get itemid() {
          return selectedID();
        }
      }));
      libs.effect(_p$ => {
        const _v$ = "#" + selectedID(),
          _v$2 = "Rarity" + selectedItemRarity(),
          _v$3 = upgradeAttributeText(),
          _v$4 = GetLocalization(`#${selectedID()}_Access`);
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "class", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "text", _v$4, _p$._v$4));
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined,
        _v$3: undefined,
        _v$4: undefined
      });
      return _el$;
    }
  });
};

const parsePipeField = value => {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    const list = [];
    for (let i = 0; i < value.length; i++) {
      const text = String(value[i]).trim();
      if (text !== "") {
        list.push(text);
      }
    }
    return list;
  }
  if (typeof value === "object") {
    const list = [];
    for (const key in value) {
      const text = String(value[key]).trim();
      if (text !== "") {
        list.push(text);
      }
    }
    return list;
  }
  const all = String(value).split("|");
  const result = [];
  for (let i = 0; i < all.length; i++) {
    const item = all[i].trim();
    if (item !== "") {
      result.push(item);
    }
  }
  return result;
};
const HandbookLayout = props => {
  const [localSelectedFilter, setLocalSelectedFilter] = libs.createSignal("all");
  const [localSearchKeyword, setLocalSearchKeyword] = libs.createSignal("");
  const filterTabs = libs.createMemo(() => props.filterTabs ?? [{
    filter: "all",
    label: "#Handbook_Filter_All",
    dotColor: "#9eb4ca"
  }]);
  const selectedFilter = () => props.selectedFilter ?? localSelectedFilter();
  const searchKeyword = () => props.searchKeyword ?? localSearchKeyword();
  const setSelectedFilter = filter => {
    props.onFilterSelect?.(filter);
    if (props.selectedFilter === undefined) {
      setLocalSelectedFilter(filter);
    }
  };
  const setSearchKeyword = keyword => {
    props.onSearch?.(keyword);
    if (props.searchKeyword === undefined) {
      setLocalSearchKeyword(keyword);
    }
  };
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Handbook",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "HandbookShell"
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "HandbookListPanel"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "HandbookListHeader"
        }, _el$2),
        _el$4 = libs.createElement("Panel", {
          id: "HandbookSearchRow"
        }, _el$3),
        _el$5 = libs.createElement("Panel", {
          id: "HandbookFilterRow"
        }, _el$3),
        _el$6 = libs.createElement("Panel", {
          id: "HandbookList",
          scroll: "y",
          "class": "VerticalScrollStyle"
        }, _el$2),
        _el$7 = libs.createElement("Panel", {
          id: "HandbookDetailPanel",
          scroll: "y",
          "class": "VerticalScrollStyle"
        }, _el$);
      libs.insert(_el$4, libs.createComponent(EOM_SearchBox.EOM_SearchBox, {
        id: "HandbookSearch",
        get placeholder() {
          return GetLocalization("#Handbook_SearchPlaceholder");
        },
        get text() {
          return searchKeyword();
        },
        onSearch: setSearchKeyword
      }), null);
      libs.insert(_el$4, () => props.searchRightChildren, null);
      libs.insert(_el$5, () => props.filterChildren ?? (() => {
        const _el$8 = libs.createElement("Panel", {
          id: "HandbookFilterTabs"
        }, null);
        libs.insert(_el$8, libs.createComponent(libs.For, {
          get each() {
            return filterTabs();
          },
          children: tab => libs.createComponent(EOM_FilterChip.EOM_FilterChip, {
            "class": "HandbookFilter",
            get selected() {
              return selectedFilter() === tab.filter;
            },
            get text() {
              return tab.label;
            },
            get dotColor() {
              return tab.dotColor;
            },
            onactivate: () => setSelectedFilter(tab.filter)
          })
        }));
        return _el$8;
      })());
      libs.setProp(_el$6, "scroll", "y");
      libs.insert(_el$6, () => props.children ?? (() => {
        const _el$9 = libs.createElement("Panel", {
            id: "HandbookEmptyTip"
          }, null);
          libs.createElement("Panel", {
            id: "EmptyImage"
          }, _el$9);
          const _el$1 = libs.createElement("Label", {
            get text() {
              return props.emptyText;
            }
          }, _el$9);
        libs.effect(_$p => libs.setProp(_el$1, "text", props.emptyText, _$p));
        return _el$9;
      })());
      libs.setProp(_el$7, "scroll", "y");
      libs.insert(_el$7, () => props.detailChildren ?? [(() => {
        const _el$10 = libs.createElement("Panel", {
            id: "HandbookDetailHero"
          }, null);
          libs.createElement("Panel", {
            id: "HandbookDetailGlow"
          }, _el$10);
          libs.createElement("Panel", {
            id: "HandbookDetailIcon"
          }, _el$10);
        return _el$10;
      })(), (() => {
        const _el$13 = libs.createElement("Label", {
          id: "HandbookDetailName",
          get text() {
            return props.detailTitle;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$13, "text", props.detailTitle, _$p));
        return _el$13;
      })(), (() => {
        const _el$14 = libs.createElement("Panel", {
            id: "HandbookDetailBody"
          }, null),
          _el$15 = libs.createElement("Panel", {
            "class": "DetailSection"
          }, _el$14);
          libs.createElement("Label", {
            "class": "DetailSectionTitle",
            text: "#Handbook_Detail"
          }, _el$15);
          const _el$17 = libs.createElement("Label", {
            "class": "DetailDescription",
            get text() {
              return props.detailPlaceholder;
            }
          }, _el$15);
        libs.effect(_$p => libs.setProp(_el$17, "text", props.detailPlaceholder, _$p));
        return _el$14;
      })()]);
      libs.effect(_$p => libs.setProp(_el$6, "data-keyword", searchKeyword(), _$p));
      return _el$;
    }
  });
};
const GUARANTEED_BLESS_KEY_TYPE = "privilege_cosmetic_003";
const GUARANTEED_BLESS_SUIT_KEY = "bless_suit";
const getBlessName = blessName => {
  return GetLocalization("#DOTA_Tooltip_ability_" + blessName, blessName);
};
const rarityColors = ["#7C918E", "#69944A", "#4472CE", "#875DD4", "#CEAD3C"];
const getRarityRange = value => {
  const range = parsePipeField(value).map(v => toFiniteNumber(v, 1));
  if (range.length === 0) {
    return [1];
  }
  return range;
};
const HandbookRequireBlessGroup = props => {
  const sectName = libs.createMemo(() => {
    const firstBless = props.requireList[0];
    const suitList = parsePipeField(KeyValues.bless[firstBless]?.Suit);
    return suitList[0] ?? "";
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return props.requireList.length > 0;
    },
    get children() {
      return [(() => {
        const _el$18 = libs.createElement("Panel", {
            "class": "RequireGroupHeader"
          }, null),
          _el$19 = libs.createElement("Label", {
            "class": "BlessMetaText",
            text: "#Handbook_Blessing_RequireAny"
          }, _el$18);
        libs.insert(_el$18, libs.createComponent(libs.Show, {
          get when() {
            return sectName() !== "";
          },
          get children() {
            return libs.createComponent(common_box.SectIcon, {
              get sectName() {
                return sectName();
              },
              large: true
            });
          }
        }), _el$19);
        return _el$18;
      })(), (() => {
        const _el$20 = libs.createElement("Panel", {
          flowChildren: "right-wrap"
        }, null);
        libs.setProp(_el$20, "flowChildren", "right-wrap");
        libs.insert(_el$20, libs.createComponent(libs.For, {
          get each() {
            return props.requireList;
          },
          children: itemName => (() => {
            const _el$21 = libs.createElement("Panel", {
                "class": "RequireItemRow"
              }, null),
              _el$22 = libs.createElement("Label", {
                "class": "RequireBlessName",
                get text() {
                  return getBlessName(itemName);
                }
              }, _el$21);
            libs.insert(_el$21, libs.createComponent(common_item.CommonItem, {
              "class": "RequireBlessBox",
              itemName: itemName,
              showTips: true
            }), _el$22);
            libs.effect(_$p => libs.setProp(_el$22, "text", getBlessName(itemName), _$p));
            return _el$21;
          })()
        }));
        return _el$20;
      })()];
    }
  });
};
const HandbookGuaranteedSelection = props => {
  let hasUserSelected = false;
  let dismissed = false;
  libs.onMount(() => {
    CallActionRequest("/v1/key/fetch", {
      type: GUARANTEED_BLESS_KEY_TYPE
    }, result => {
      if (dismissed || hasUserSelected || result.code != 0 && result.code != 200) {
        return;
      }
      const savedSuit = result.data?.player_key_values.find(item => item.key === GUARANTEED_BLESS_SUIT_KEY)?.value;
      const validSuit = props.suitList.some(item => item.suit === savedSuit) ? savedSuit : undefined;
      props.onFetched(validSuit);
    }, () => {}, false);
  });
  libs.onCleanup(() => {
    dismissed = true;
    props.onDismiss(props.selectedSuit);
  });
  return (() => {
    const _el$23 = libs.createElement("Panel", {
        id: "HandbookGuaranteedSelection"
      }, null),
      _el$24 = libs.createElement("Panel", {
        id: "HandbookGuaranteedHeader"
      }, _el$23),
      _el$25 = libs.createElement("Label", {
        id: "HandbookGuaranteedTitle",
        get text() {
          return GetLocalization("#Handbook_Blessing_GuaranteedTitle");
        }
      }, _el$24),
      _el$26 = libs.createElement("Label", {
        id: "HandbookGuaranteedDescription",
        get text() {
          return GetLocalization("#Handbook_Blessing_GuaranteedDescription");
        }
      }, _el$24),
      _el$27 = libs.createElement("Panel", {
        id: "HandbookGuaranteedOptions"
      }, _el$23);
    libs.insert(_el$27, libs.createComponent(libs.For, {
      get each() {
        return props.suitList;
      },
      children: suit => {
        const selected = () => props.selectedSuit === suit.suit;
        return (() => {
          const _el$28 = libs.createElement("Button", {
              "class": "HandbookGuaranteedOption"
            }, null),
            _el$29 = libs.createElement("Label", {
              "class": "HandbookGuaranteedOptionLabel",
              get text() {
                return suit.label;
              }
            }, _el$28);
          libs.setProp(_el$28, "onactivate", () => {
            hasUserSelected = true;
            props.onToggle(suit.suit);
          });
          libs.insert(_el$28, libs.createComponent(EOM_CheckBox.EOM_CheckBox2, {
            "class": "HandbookGuaranteedCheckBox",
            text: "",
            get checked() {
              return selected();
            },
            hittest: false
          }), _el$29);
          libs.insert(_el$28, libs.createComponent(common_box.SectIcon, {
            "class": "HandbookGuaranteedSuitIcon",
            get sectName() {
              return suit.suit;
            },
            large: true
          }), _el$29);
          libs.effect(_p$ => {
            const _v$3 = {
                Selected: selected()
              },
              _v$4 = suit.label;
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$28, "classList", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$29, "text", _v$4, _p$._v$4));
            return _p$;
          }, {
            _v$3: undefined,
            _v$4: undefined
          });
          return _el$28;
        })();
      }
    }));
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#Handbook_Blessing_GuaranteedTitle"),
        _v$2 = GetLocalization("#Handbook_Blessing_GuaranteedDescription");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$25, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$26, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$23;
  })();
};
const HandbookBlessing = () => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const playerPrivileges = solid_utils.createPlayerNetDataSignal("common", "player_privileges", {});
  const toggleList = libs.createMemo(() => {
    const next = {};
    for (const itemName in KeyValues.bless) {
      const itemData = KeyValues.bless[itemName];
      if (itemData.Suit == undefined) {
        continue;
      }
      const suitList = parsePipeField(itemData.Suit);
      suitList.forEach(suit => {
        next[suit] = GetLocalization("#Bless_" + suit);
      });
    }
    return next;
  });
  const filterTabs = libs.createMemo(() => {
    const tabs = [{
      filter: "all",
      label: "#Handbook_Filter_All",
      dotColor: "#9eb4ca"
    }];
    for (const [suit, label] of Object.entries(toggleList())) {
      tabs.push({
        filter: suit,
        label,
        dotColor: "#d7b66b00"
      });
    }
    return tabs;
  });
  const itemList = libs.createMemo(() => Object.keys(KeyValues.bless).filter(itemName => KeyValues.bless[itemName]?.ExcludeFromRandom != 1));
  const [selectedSuit, setSelectedSuit] = libs.createSignal("all");
  const [searchKeyword, setSearchKeyword] = libs.createSignal("");
  const [selectedBlessID, setSelectedBlessID] = libs.createSignal(Object.keys(KeyValues.bless)[0] ?? "");
  const [detailView, setDetailView] = libs.createSignal("detail");
  const [selectedGuaranteedSuit, setSelectedGuaranteedSuit] = libs.createSignal();
  const selectedBlessData = libs.createMemo(() => KeyValues.bless[selectedBlessID()]);
  const guaranteedSuitList = libs.createMemo(() => Object.entries(toggleList()).map(([suit, label]) => ({
    suit,
    label
  })));
  const toggleGuaranteedSuit = suit => {
    setSelectedGuaranteedSuit(currentSuit => currentSuit === suit ? undefined : suit);
  };
  const toggleGuaranteedView = () => {
    if (detailView() === "guaranteedSelection") {
      setDetailView("detail");
      return;
    }
    if (gameState()?.state === "GameState_Dungeon") {
      ErrorMessage(GetLocalization("#Handbook_Blessing_GuaranteedGamingMessageTip"));
    }
    setDetailView("guaranteedSelection");
  };
  const outputGuaranteedSelection = suit => {
    const value = suit ?? "";
    CallActionRequest("/v1/key/save", {
      type: GUARANTEED_BLESS_KEY_TYPE,
      key: GUARANTEED_BLESS_SUIT_KEY,
      value
    }, result => {
      if (result.code != 0 && result.code != 200) {
        return;
      }
      GameEvents.SendCustomGameEventToServer("update_guaranteed_bless_suit", {
        suit: value
      });
    });
  };
  const selectBless = itemName => {
    if (itemName === selectedBlessID()) {
      return;
    }
    setSelectedBlessID(itemName);
    setDetailView("detail");
  };
  const getBlessSuits = itemName => {
    return parsePipeField(KeyValues.bless[itemName]?.Suit);
  };
  const suitMatched = itemName => {
    if (selectedSuit() === "all") {
      return true;
    }
    const suitList = getBlessSuits(itemName);
    return suitList.includes(selectedSuit());
  };
  const textMatched = itemName => {
    const keyword = searchKeyword().trim().toLowerCase();
    if (keyword === "") {
      return true;
    }
    const name = GetLocalization("#DOTA_Tooltip_ability_" + itemName, itemName).toLowerCase();
    const description = GetLocalization("#DOTA_Tooltip_ability_" + itemName + "_Description", "").toLowerCase();
    return itemName.toLowerCase().includes(keyword) || name.includes(keyword) || description.includes(keyword);
  };
  const visibleBlessList = libs.createMemo(() => itemList().filter(itemName => suitMatched(itemName) && textMatched(itemName)).sort((a, b) => {
    const rarityA = toFiniteNumber(String(KeyValues.bless[a]?.RarityRange).split("|")[0], 1);
    const rarityB = toFiniteNumber(String(KeyValues.bless[b]?.RarityRange).split("|")[0], 1);
    return rarityA - rarityB;
  }));
  const requireBless1List = libs.createMemo(() => parsePipeField(selectedBlessData()?.RequireBless1));
  const requireBless2List = libs.createMemo(() => parsePipeField(selectedBlessData()?.RequireBless2));
  const hasRequireRule = libs.createMemo(() => requireBless1List().length > 0 || requireBless2List().length > 0);
  const rarityRange = libs.createMemo(() => {
    return getRarityRange(selectedBlessData()?.RarityRange);
  });
  const [selectedRarity, setSelectedRarity] = libs.createSignal(1);
  libs.createEffect(() => {
    const range = rarityRange();
    setSelectedRarity(range[0] ?? 1);
  });
  return libs.createComponent(HandbookLayout, {
    emptyText: "#Handbook_Blessing_Empty",
    detailTitle: "#Handbook_Blessing_DetailTitle",
    detailPlaceholder: "#Handbook_Blessing_DetailPlaceholder",
    get filterTabs() {
      return filterTabs();
    },
    get filterChildren() {
      return (() => {
        const _el$30 = libs.createElement("Panel", {
          id: "HandbookFilterTabs"
        }, null);
        libs.insert(_el$30, libs.createComponent(libs.For, {
          get each() {
            return filterTabs();
          },
          children: tab => libs.createComponent(EOM_FilterChip.EOM_FilterChip, {
            get ["class"]() {
              return "HandbookFilter " + tab.filter;
            },
            get selected() {
              return selectedSuit() === tab.filter;
            },
            get text() {
              return tab.label;
            },
            get dotColor() {
              return tab.dotColor;
            },
            onactivate: () => setSelectedSuit(tab.filter)
          })
        }));
        return _el$30;
      })();
    },
    get selectedFilter() {
      return selectedSuit();
    },
    onFilterSelect: setSelectedSuit,
    get searchKeyword() {
      return searchKeyword();
    },
    onSearch: setSearchKeyword,
    get searchRightChildren() {
      return libs.createComponent(libs.Show, {
        get when() {
          return playerPrivileges()["privilege_cosmetic_003"] === true;
        },
        get children() {
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            get ["class"]() {
              return libs.classNames("HandbookGuaranteedButton", {
                Selected: detailView() === "guaranteedSelection"
              });
            },
            get text() {
              return GetLocalization("#Handbook_Blessing_Guaranteed");
            },
            onactivate: toggleGuaranteedView
          });
        }
      });
    },
    get detailChildren() {
      return libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => detailView() === "guaranteedSelection")() && playerPrivileges()["privilege_cosmetic_003"] === true;
        },
        get fallback() {
          return [libs.createComponent(common_box.CommonBox, {
            "class": "HandbookBlessCommonBox",
            get itemName() {
              return selectedBlessID();
            },
            get rarity() {
              return selectedRarity();
            },
            get customTooltip() {
              return {
                name: "feature_tags",
                tags: GetArtifactTags(selectedBlessID()).join("|")
              };
            }
          }), (() => {
            const _el$31 = libs.createElement("Panel", {
                id: "AccessDivider"
              }, null);
              libs.createElement("Image", {
                id: "LineLeft"
              }, _el$31);
              libs.createElement("Label", {
                id: "AccessTitle",
                text: "#Equipment_Rarity"
              }, _el$31);
              libs.createElement("Image", {
                id: "LineRight"
              }, _el$31);
            return _el$31;
          })(), (() => {
            const _el$35 = libs.createElement("Panel", {
              "class": "BlessRarityRow",
              flowChildren: "right"
            }, null);
            libs.setProp(_el$35, "flowChildren", "right");
            libs.insert(_el$35, libs.createComponent(libs.For, {
              get each() {
                return rarityRange();
              },
              children: rarity => libs.createComponent(EOM_FilterChip.EOM_FilterChip, {
                "class": "HandbookBlessRarityChip",
                get selected() {
                  return selectedRarity() === rarity;
                },
                get text() {
                  return String(rarity);
                },
                get dotColor() {
                  return rarityColors[rarity - 1] ?? "#9eb4ca";
                },
                onmouseover: () => setSelectedRarity(rarity)
              })
            }));
            return _el$35;
          })(), (() => {
            const _el$36 = libs.createElement("Panel", {
                id: "AccessDivider"
              }, null);
              libs.createElement("Image", {
                id: "LineLeft"
              }, _el$36);
              libs.createElement("Label", {
                id: "AccessTitle",
                text: "#Handbook_Blessing_RequireTitle"
              }, _el$36);
              libs.createElement("Image", {
                id: "LineRight"
              }, _el$36);
            return _el$36;
          })(), (() => {
            const _el$40 = libs.createElement("Panel", {
              "class": "BlessMetaSection"
            }, null);
            libs.insert(_el$40, libs.createComponent(libs.Show, {
              get when() {
                return hasRequireRule();
              },
              get fallback() {
                return libs.createElement("Label", {
                  "class": "BlessMetaText",
                  text: "#Handbook_Blessing_RequireNone"
                }, null);
              },
              get children() {
                return [libs.createComponent(HandbookRequireBlessGroup, {
                  get requireList() {
                    return requireBless1List();
                  }
                }), libs.createComponent(HandbookRequireBlessGroup, {
                  get requireList() {
                    return requireBless2List();
                  }
                })];
              }
            }));
            return _el$40;
          })()];
        },
        get children() {
          return libs.createComponent(HandbookGuaranteedSelection, {
            get suitList() {
              return guaranteedSuitList();
            },
            get selectedSuit() {
              return selectedGuaranteedSuit();
            },
            onToggle: toggleGuaranteedSuit,
            onFetched: setSelectedGuaranteedSuit,
            onDismiss: outputGuaranteedSelection
          });
        }
      });
    },
    get children() {
      return libs.createComponent(libs.Show, {
        get when() {
          return visibleBlessList().length > 0;
        },
        get fallback() {
          return (() => {
            const _el$42 = libs.createElement("Panel", {
                id: "HandbookEmptyTip"
              }, null);
              libs.createElement("Panel", {
                id: "EmptyImage"
              }, _el$42);
              libs.createElement("Label", {
                text: "#Handbook_Blessing_Empty"
              }, _el$42);
            return _el$42;
          })();
        },
        get children() {
          return libs.createComponent(libs.For, {
            get each() {
              return visibleBlessList();
            },
            children: itemName => (() => {
              const _el$45 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("HandbookBlessCard", {
                      Selected: selectedBlessID() === itemName
                    });
                  }
                }, null),
                _el$46 = libs.createElement("Label", {
                  "class": "HandbookBlessName",
                  get text() {
                    return getBlessName(itemName);
                  }
                }, _el$45);
              libs.setProp(_el$45, "onactivate", () => selectBless(itemName));
              libs.insert(_el$45, libs.createComponent(common_item.CommonItem, {
                itemName: itemName,
                width: "64px",
                height: "64px",
                marginBottom: "8px",
                showTips: true
              }), _el$46);
              libs.effect(_p$ => {
                const _v$5 = libs.classNames("HandbookBlessCard", {
                    Selected: selectedBlessID() === itemName
                  }),
                  _v$6 = getBlessName(itemName);
                _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$45, "class", _v$5, _p$._v$5));
                _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$46, "text", _v$6, _p$._v$6));
                return _p$;
              }, {
                _v$5: undefined,
                _v$6: undefined
              });
              return _el$45;
            })()
          });
        }
      });
    }
  });
};
const getArtifactName = itemName => {
  return GetLocalization("#DOTA_Tooltip_ability_" + itemName, itemName);
};
const getArtifactUpgradeTarget = itemName => {
  return String(KeyValues.artifact[itemName]?.Upgrade ?? "").trim();
};
const getArtifactAccess = itemName => {
  return String(KeyValues.artifact[itemName]?.Access ?? "").trim();
};
const HandbookArtifact = () => {
  const filterTabs = libs.createMemo(() => {
    const tabs = [{
      filter: "0",
      label: "#Handbook_Filter_All",
      dotColor: "#9eb4ca"
    }];
    for (let rarity = 1; rarity <= 5; rarity++) {
      tabs.push({
        filter: String(rarity),
        label: "#Equipment_Rarity_" + rarity,
        dotColor: rarityColors[rarity - 1] ?? "#9eb4ca"
      });
    }
    return tabs;
  });
  const itemList = libs.createMemo(() => Object.keys(KeyValues.artifact).filter(itemName => getArtifactAccess(itemName) !== "").sort((a, b) => {
    const rarityA = getRarityRange(KeyValues.artifact[a]?.RarityRange)[0] ?? 1;
    const rarityB = getRarityRange(KeyValues.artifact[b]?.RarityRange)[0] ?? 1;
    return rarityA - rarityB;
  }));
  const [selectedRarityFilter, setSelectedRarityFilter] = libs.createSignal("0");
  const [searchKeyword, setSearchKeyword] = libs.createSignal("");
  const [selectedArtifactID, setSelectedArtifactID] = libs.createSignal(itemList()[0] ?? "");
  const selectedArtifactData = libs.createMemo(() => KeyValues.artifact[selectedArtifactID()]);
  const selectedArtifactAccess = libs.createMemo(() => getArtifactAccess(selectedArtifactID()));
  const rarityRange = libs.createMemo(() => getRarityRange(selectedArtifactData()?.RarityRange));
  const [previewRarity, setPreviewRarity] = libs.createSignal(1);
  const rarityMatched = itemName => {
    if (selectedRarityFilter() === "0") {
      return true;
    }
    return getRarityRange(KeyValues.artifact[itemName]?.RarityRange).includes(toFiniteNumber(selectedRarityFilter(), 0));
  };
  const abilityValuesMatched = (itemName, keyword) => {
    const abilityValues = KeyValues.npc_items_custom[itemName]?.AbilityValues;
    if (typeof abilityValues !== "object") {
      return false;
    }
    for (const key in abilityValues) {
      const propertyKey = key.substring(0, 5) === "item_" ? key.substring(5) : key;
      if (key.toLowerCase().includes(keyword) || propertyKey.toLowerCase().includes(keyword) || GetLocalization("#property_" + propertyKey, "").toLowerCase().includes(keyword)) {
        return true;
      }
      const valueData = abilityValues[key];
      if (typeof valueData === "object") {
        for (const valueKey in valueData) {
          const keyText = valueKey.replaceAll(/\s/g, "").toLowerCase();
          if (keyText.includes(keyword) || GetLocalization("#dota_ability_special_variable" + keyText, "").toLowerCase().includes(keyword)) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const textMatched = itemName => {
    const keyword = searchKeyword().trim().toLowerCase();
    if (keyword === "") {
      return true;
    }
    const name = getArtifactName(itemName).toLowerCase();
    const description = GetLocalization("#DOTA_Tooltip_ability_" + itemName + "_Description", "").toLowerCase();
    return itemName.toLowerCase().includes(keyword) || name.includes(keyword) || description.includes(keyword) || abilityValuesMatched(itemName, keyword);
  };
  const visibleArtifactList = libs.createMemo(() => itemList().filter(itemName => rarityMatched(itemName) && textMatched(itemName)));
  const relatedArtifactList = libs.createMemo(() => {
    const selected = selectedArtifactID();
    if (selected === "") {
      return [];
    }
    const visited = {};
    const availableMap = {};
    itemList().forEach(itemName => {
      availableMap[itemName] = true;
    });
    const previousList = [];
    const nextList = [];
    const collectPrevious = itemName => {
      const sources = itemList().filter(sourceName => getArtifactUpgradeTarget(sourceName) === itemName && !visited[sourceName]);
      sources.forEach(sourceName => {
        visited[sourceName] = true;
        collectPrevious(sourceName);
        previousList.push(sourceName);
      });
    };
    const collectNext = itemName => {
      const nextName = getArtifactUpgradeTarget(itemName);
      if (nextName === "" || !availableMap[nextName] || visited[nextName]) {
        return;
      }
      visited[nextName] = true;
      nextList.push(nextName);
      collectNext(nextName);
    };
    visited[selected] = true;
    collectPrevious(selected);
    collectNext(selected);
    return [...previousList, selected, ...nextList];
  });
  libs.createEffect(() => {
    const list = visibleArtifactList();
    const selected = selectedArtifactID();
    if (selected === "" || !list.includes(selected)) {
      setSelectedArtifactID(list[0] ?? "");
    }
  });
  libs.createEffect(() => {
    const range = rarityRange();
    setPreviewRarity(range[0] ?? 1);
  });
  return libs.createComponent(HandbookLayout, {
    emptyText: "#Handbook_Artifact_Empty",
    detailTitle: "#Handbook_Artifact_DetailTitle",
    detailPlaceholder: "#Handbook_Artifact_DetailPlaceholder",
    get filterTabs() {
      return filterTabs();
    },
    get selectedFilter() {
      return selectedRarityFilter();
    },
    onFilterSelect: setSelectedRarityFilter,
    get searchKeyword() {
      return searchKeyword();
    },
    onSearch: setSearchKeyword,
    get detailChildren() {
      return libs.createComponent(libs.Show, {
        get when() {
          return selectedArtifactID() !== "";
        },
        get fallback() {
          return libs.createElement("Label", {
            "class": "DetailDescription",
            text: "#Handbook_Artifact_DetailPlaceholder"
          }, null);
        },
        get children() {
          return [libs.createComponent(common_box.CommonBox, {
            "class": "HandbookArtifactCommonBox",
            get itemName() {
              return selectedArtifactID();
            },
            get rarity() {
              return previewRarity();
            },
            get customTooltip() {
              return {
                name: "artifact",
                itemName: selectedArtifactID(),
                rarity: previewRarity()
              };
            }
          }), (() => {
            const _el$47 = libs.createElement("Panel", {
                id: "AccessDivider"
              }, null);
              libs.createElement("Image", {
                id: "LineLeft"
              }, _el$47);
              libs.createElement("Label", {
                id: "AccessTitle",
                text: "#Equipment_Rarity"
              }, _el$47);
              libs.createElement("Image", {
                id: "LineRight"
              }, _el$47);
            return _el$47;
          })(), (() => {
            const _el$51 = libs.createElement("Panel", {
              "class": "BlessRarityRow",
              flowChildren: "right"
            }, null);
            libs.setProp(_el$51, "flowChildren", "right");
            libs.insert(_el$51, libs.createComponent(libs.For, {
              get each() {
                return rarityRange();
              },
              children: rarity => libs.createComponent(EOM_FilterChip.EOM_FilterChip, {
                "class": "HandbookBlessRarityChip",
                get selected() {
                  return previewRarity() === rarity;
                },
                get text() {
                  return String(rarity);
                },
                get dotColor() {
                  return rarityColors[rarity - 1] ?? "#9eb4ca";
                },
                onmouseover: () => setPreviewRarity(rarity)
              })
            }));
            return _el$51;
          })(), libs.createComponent(libs.Show, {
            get when() {
              return selectedArtifactAccess() === "Meepo";
            },
            get children() {
              return [(() => {
                const _el$52 = libs.createElement("Panel", {
                    id: "AccessDivider"
                  }, null);
                  libs.createElement("Image", {
                    id: "LineLeft"
                  }, _el$52);
                  libs.createElement("Label", {
                    id: "AccessTitle",
                    text: "#Handbook_Artifact_AccessTitle"
                  }, _el$52);
                  libs.createElement("Image", {
                    id: "LineRight"
                  }, _el$52);
                return _el$52;
              })(), (() => {
                const _el$56 = libs.createElement("Panel", {
                    "class": "ArtifactAccessSection"
                  }, null);
                  libs.createElement("Label", {
                    "class": "ArtifactAccessText",
                    text: "#Handbook_Artifact_Access_Meepo"
                  }, _el$56);
                return _el$56;
              })()];
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return relatedArtifactList().length > 1;
            },
            get children() {
              return [(() => {
                const _el$58 = libs.createElement("Panel", {
                    id: "AccessDivider"
                  }, null);
                  libs.createElement("Image", {
                    id: "LineLeft"
                  }, _el$58);
                  libs.createElement("Label", {
                    id: "AccessTitle",
                    text: "#Handbook_Artifact_RelatedTitle"
                  }, _el$58);
                  libs.createElement("Image", {
                    id: "LineRight"
                  }, _el$58);
                return _el$58;
              })(), (() => {
                const _el$62 = libs.createElement("Panel", {
                  "class": "ArtifactRelatedList",
                  flowChildren: "right-wrap"
                }, null);
                libs.setProp(_el$62, "flowChildren", "right-wrap");
                libs.insert(_el$62, libs.createComponent(libs.For, {
                  get each() {
                    return relatedArtifactList();
                  },
                  children: itemName => (() => {
                    const _el$64 = libs.createElement("Panel", {
                        get ["class"]() {
                          return libs.classNames("ArtifactRelatedItem", {
                            Selected: selectedArtifactID() === itemName
                          });
                        }
                      }, null),
                      _el$65 = libs.createElement("Label", {
                        "class": "ArtifactRelatedName",
                        get text() {
                          return getArtifactName(itemName);
                        }
                      }, _el$64);
                    libs.setProp(_el$64, "onactivate", () => setSelectedArtifactID(itemName));
                    libs.insert(_el$64, libs.createComponent(common_item.CommonItem, {
                      itemName: itemName,
                      width: "52px",
                      height: "52px",
                      marginBottom: "6px",
                      showTips: true
                    }), _el$65);
                    libs.effect(_p$ => {
                      const _v$7 = libs.classNames("ArtifactRelatedItem", {
                          Selected: selectedArtifactID() === itemName
                        }),
                        _v$8 = getArtifactName(itemName);
                      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$64, "class", _v$7, _p$._v$7));
                      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$65, "text", _v$8, _p$._v$8));
                      return _p$;
                    }, {
                      _v$7: undefined,
                      _v$8: undefined
                    });
                    return _el$64;
                  })()
                }));
                return _el$62;
              })()];
            }
          })];
        }
      });
    },
    get children() {
      return libs.createComponent(libs.Show, {
        get when() {
          return visibleArtifactList().length > 0;
        },
        get fallback() {
          return (() => {
            const _el$66 = libs.createElement("Panel", {
                id: "HandbookEmptyTip"
              }, null);
              libs.createElement("Panel", {
                id: "EmptyImage"
              }, _el$66);
              libs.createElement("Label", {
                text: "#Handbook_Artifact_Empty"
              }, _el$66);
            return _el$66;
          })();
        },
        get children() {
          return libs.createComponent(libs.For, {
            get each() {
              return visibleArtifactList();
            },
            children: itemName => (() => {
              const _el$69 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("HandbookArtifactCard", {
                      Selected: selectedArtifactID() === itemName
                    });
                  }
                }, null),
                _el$70 = libs.createElement("Label", {
                  "class": "HandbookArtifactName",
                  get text() {
                    return getArtifactName(itemName);
                  }
                }, _el$69);
              libs.setProp(_el$69, "onactivate", () => setSelectedArtifactID(itemName));
              libs.insert(_el$69, libs.createComponent(common_item.CommonItem, {
                itemName: itemName,
                width: "64px",
                height: "64px",
                marginBottom: "8px",
                showTips: true
              }), _el$70);
              libs.effect(_p$ => {
                const _v$9 = libs.classNames("HandbookArtifactCard", {
                    Selected: selectedArtifactID() === itemName
                  }),
                  _v$0 = getArtifactName(itemName);
                _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$69, "class", _v$9, _p$._v$9));
                _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$70, "text", _v$0, _p$._v$0));
                return _p$;
              }, {
                _v$9: undefined,
                _v$0: undefined
              });
              return _el$69;
            })()
          });
        }
      });
    }
  });
};
const getUpgradeHeroCode = upgradeID => {
  const abilityName = String(KeyValues.ability_upgrades[upgradeID]?.ability_name ?? "");
  if (abilityName !== "" && abilityName.indexOf("_") > 0) {
    return abilityName.substring(0, abilityName.indexOf("_"));
  }
  const index = upgradeID.indexOf("_upgrade_");
  if (index > 0) {
    return upgradeID.substring(0, index);
  }
  return "";
};
const getUpgradeHeroName = upgradeID => {
  const heroCode = getUpgradeHeroCode(upgradeID);
  if (heroCode === "") {
    return "";
  }
  return "npc_dota_hero_" + heroCode;
};
const getUpgradeName = upgradeID => {
  return GetLocalization("#" + upgradeID, upgradeID);
};
const isUpgradeHidden = upgradeID => {
  return Number(KeyValues.ability_upgrades[upgradeID]?.Hidden ?? 0) === 1;
};
const getUpgradeRequireList = upgradeID => {
  return parsePipeField(KeyValues.ability_upgrades[upgradeID]?.RequireUpgrades).filter(itemName => KeyValues.ability_upgrades[itemName] !== undefined && !isUpgradeHidden(itemName));
};
const HandbookAbilityUpgrade = () => {
  const itemList = libs.createMemo(() => Object.keys(KeyValues.ability_upgrades).filter(upgradeID => !isUpgradeHidden(upgradeID)));
  const defaultHeroName = libs.createMemo(() => {
    const list = itemList();
    for (let i = 0; i < list.length; i++) {
      const heroName = getUpgradeHeroName(list[i]);
      if (heroName !== "" && KeyValues.heroes[heroName] !== undefined) {
        return heroName;
      }
    }
    return "npc_dota_hero_alp";
  });
  const [selectedHeroName, setSelectedHeroName] = libs.createSignal(defaultHeroName());
  const [searchKeyword, setSearchKeyword] = libs.createSignal("");
  const [selectedUpgradeID, setSelectedUpgradeID] = libs.createSignal("");
  const heroMatched = upgradeID => {
    return getUpgradeHeroName(upgradeID) === selectedHeroName();
  };
  const textMatched = upgradeID => {
    const keyword = searchKeyword().trim().toLowerCase();
    if (keyword === "") {
      return true;
    }
    const name = getUpgradeName(upgradeID).toLowerCase();
    const description = GetLocalization("#" + upgradeID + "_description", "").toLowerCase();
    return upgradeID.toLowerCase().includes(keyword) || name.includes(keyword) || description.includes(keyword);
  };
  const visibleUpgradeList = libs.createMemo(() => itemList().filter(upgradeID => heroMatched(upgradeID) && textMatched(upgradeID)));
  const requireUpgradeList = libs.createMemo(() => getUpgradeRequireList(selectedUpgradeID()));
  const relatedUpgradeList = libs.createMemo(() => {
    const selected = selectedUpgradeID();
    if (selected === "") {
      return [];
    }
    const connectedMap = {};
    const queue = [selected];
    connectedMap[selected] = true;
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      const neighborList = [...getUpgradeRequireList(current), ...itemList().filter(upgradeID => getUpgradeRequireList(upgradeID).includes(current))];
      neighborList.forEach(upgradeID => {
        if (!connectedMap[upgradeID]) {
          connectedMap[upgradeID] = true;
          queue.push(upgradeID);
        }
      });
    }
    return itemList().filter(upgradeID => connectedMap[upgradeID]);
  });
  libs.createEffect(() => {
    const list = visibleUpgradeList();
    const selected = selectedUpgradeID();
    if (selected === "" || !list.includes(selected)) {
      setSelectedUpgradeID(list[0] ?? "");
    }
  });
  return libs.createComponent(HandbookLayout, {
    emptyText: "#Handbook_AbilityUpgrade_Empty",
    detailTitle: "#Handbook_AbilityUpgrade_DetailTitle",
    detailPlaceholder: "#Handbook_AbilityUpgrade_DetailPlaceholder",
    get filterChildren() {
      return libs.createComponent(hero_selection_bar.HeroSelectionBar, {
        get selecteHeroName() {
          return selectedHeroName();
        },
        onchange: heroName => setSelectedHeroName(heroName)
      });
    },
    get searchKeyword() {
      return searchKeyword();
    },
    onSearch: setSearchKeyword,
    get detailChildren() {
      return libs.createComponent(libs.Show, {
        get when() {
          return selectedUpgradeID() !== "";
        },
        get fallback() {
          return libs.createElement("Label", {
            "class": "DetailDescription",
            text: "#Handbook_AbilityUpgrade_DetailPlaceholder"
          }, null);
        },
        get children() {
          return [libs.createComponent(upgrade_box.UpgradeBox, {
            "class": "HandbookUpgradeBox",
            get upgradeID() {
              return selectedUpgradeID();
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return requireUpgradeList().length > 0;
            },
            get children() {
              return [(() => {
                const _el$71 = libs.createElement("Panel", {
                    id: "AccessDivider"
                  }, null);
                  libs.createElement("Image", {
                    id: "LineLeft"
                  }, _el$71);
                  libs.createElement("Label", {
                    id: "AccessTitle",
                    text: "#Handbook_AbilityUpgrade_RequireTitle"
                  }, _el$71);
                  libs.createElement("Image", {
                    id: "LineRight"
                  }, _el$71);
                return _el$71;
              })(), (() => {
                const _el$75 = libs.createElement("Panel", {
                  "class": "UpgradeRelatedList",
                  flowChildren: "right-wrap"
                }, null);
                libs.setProp(_el$75, "flowChildren", "right-wrap");
                libs.insert(_el$75, libs.createComponent(libs.For, {
                  get each() {
                    return requireUpgradeList();
                  },
                  children: upgradeID => (() => {
                    const _el$82 = libs.createElement("Panel", {
                        get ["class"]() {
                          return libs.classNames("UpgradeRelatedItem", {
                            Selected: selectedUpgradeID() === upgradeID
                          });
                        }
                      }, null),
                      _el$83 = libs.createElement("Label", {
                        "class": "UpgradeRelatedName",
                        get text() {
                          return getUpgradeName(upgradeID);
                        }
                      }, _el$82);
                    libs.setProp(_el$82, "onactivate", () => setSelectedUpgradeID(upgradeID));
                    libs.insert(_el$82, libs.createComponent(upgrade_icon.UpgradeIcon, {
                      upgradeID: upgradeID,
                      width: "52px",
                      height: "52px",
                      marginBottom: "6px",
                      showTips: false
                    }), _el$83);
                    libs.effect(_p$ => {
                      const _v$1 = libs.classNames("UpgradeRelatedItem", {
                          Selected: selectedUpgradeID() === upgradeID
                        }),
                        _v$10 = getUpgradeName(upgradeID);
                      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$82, "class", _v$1, _p$._v$1));
                      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$83, "text", _v$10, _p$._v$10));
                      return _p$;
                    }, {
                      _v$1: undefined,
                      _v$10: undefined
                    });
                    return _el$82;
                  })()
                }));
                return _el$75;
              })()];
            }
          }), libs.createComponent(libs.Show, {
            get when() {
              return relatedUpgradeList().length > 0;
            },
            get children() {
              return [(() => {
                const _el$76 = libs.createElement("Panel", {
                    id: "AccessDivider"
                  }, null);
                  libs.createElement("Image", {
                    id: "LineLeft"
                  }, _el$76);
                  libs.createElement("Label", {
                    id: "AccessTitle",
                    text: "#Handbook_AbilityUpgrade_RelatedTitle"
                  }, _el$76);
                  libs.createElement("Image", {
                    id: "LineRight"
                  }, _el$76);
                return _el$76;
              })(), (() => {
                const _el$80 = libs.createElement("Panel", {
                  "class": "UpgradeRelatedList",
                  flowChildren: "right-wrap"
                }, null);
                libs.setProp(_el$80, "flowChildren", "right-wrap");
                libs.insert(_el$80, libs.createComponent(libs.For, {
                  get each() {
                    return relatedUpgradeList();
                  },
                  children: upgradeID => (() => {
                    const _el$84 = libs.createElement("Panel", {
                        get ["class"]() {
                          return libs.classNames("UpgradeRelatedItem", {
                            Selected: selectedUpgradeID() === upgradeID
                          });
                        }
                      }, null),
                      _el$85 = libs.createElement("Label", {
                        "class": "UpgradeRelatedName",
                        get text() {
                          return getUpgradeName(upgradeID);
                        }
                      }, _el$84);
                    libs.setProp(_el$84, "onactivate", () => setSelectedUpgradeID(upgradeID));
                    libs.insert(_el$84, libs.createComponent(upgrade_icon.UpgradeIcon, {
                      upgradeID: upgradeID,
                      width: "52px",
                      height: "52px",
                      marginBottom: "6px",
                      showTips: false
                    }), _el$85);
                    libs.effect(_p$ => {
                      const _v$11 = libs.classNames("UpgradeRelatedItem", {
                          Selected: selectedUpgradeID() === upgradeID
                        }),
                        _v$12 = getUpgradeName(upgradeID);
                      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$84, "class", _v$11, _p$._v$11));
                      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$85, "text", _v$12, _p$._v$12));
                      return _p$;
                    }, {
                      _v$11: undefined,
                      _v$12: undefined
                    });
                    return _el$84;
                  })()
                }));
                return _el$80;
              })()];
            }
          })];
        }
      });
    },
    get children() {
      return libs.createComponent(libs.Show, {
        get when() {
          return visibleUpgradeList().length > 0;
        },
        get fallback() {
          return (() => {
            const _el$86 = libs.createElement("Panel", {
                id: "HandbookEmptyTip"
              }, null);
              libs.createElement("Panel", {
                id: "EmptyImage"
              }, _el$86);
              libs.createElement("Label", {
                text: "#Handbook_AbilityUpgrade_Empty"
              }, _el$86);
            return _el$86;
          })();
        },
        get children() {
          return libs.createComponent(libs.For, {
            get each() {
              return visibleUpgradeList();
            },
            children: upgradeID => (() => {
              const _el$89 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("HandbookUpgradeCard", {
                      Selected: selectedUpgradeID() === upgradeID
                    });
                  }
                }, null),
                _el$90 = libs.createElement("Label", {
                  "class": "HandbookUpgradeName",
                  get text() {
                    return getUpgradeName(upgradeID);
                  }
                }, _el$89);
              libs.setProp(_el$89, "onactivate", () => setSelectedUpgradeID(upgradeID));
              libs.insert(_el$89, libs.createComponent(upgrade_icon.UpgradeIcon, {
                upgradeID: upgradeID,
                width: "64px",
                height: "64px",
                marginBottom: "8px",
                showTips: true
              }), _el$90);
              libs.effect(_p$ => {
                const _v$13 = libs.classNames("HandbookUpgradeCard", {
                    Selected: selectedUpgradeID() === upgradeID
                  }),
                  _v$14 = getUpgradeName(upgradeID);
                _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$89, "class", _v$13, _p$._v$13));
                _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$90, "text", _v$14, _p$._v$14));
                return _p$;
              }, {
                _v$13: undefined,
                _v$14: undefined
              });
              return _el$89;
            })()
          });
        }
      });
    }
  });
};

const SHOW_ROOM_SETTING_KEY = "SHOMROOM_TABLES";
const SHOW_ROOM_SETTING_READ_KEYS = [SHOW_ROOM_SETTING_KEY, "SHOWROOM_TABLES"];
const SHOW_ROOM_DISPLAY_TYPES = ["weapon", "equipment", "courier", "cosmetic"];
const DEFAULT_SHOW_ROOM_DISPLAY_TYPES = ["weapon", "equipment", "courier"];
const getShowRoomSettingValue = keyValues => {
  for (const key of SHOW_ROOM_SETTING_READ_KEYS) {
    const value = keyValues[key]?.value;
    if (value != undefined) return value;
  }
  return undefined;
};
const parseShowRoomDisplayTypes = value => {
  const parsed = value == undefined ? undefined : JSON.parseSafe(value);
  if (!Array.isArray(parsed)) return [...DEFAULT_SHOW_ROOM_DISPLAY_TYPES];
  const result = parsed.filter((type, index) => {
    return SHOW_ROOM_DISPLAY_TYPES.includes(type) && parsed.indexOf(type) == index;
  });
  return result.length == 3 ? result : [...DEFAULT_SHOW_ROOM_DISPLAY_TYPES];
};

const MATCH_RECORDS_CACHE_INTERVAL = 300;
const SHOW_ROOM_TYPE_LOCALIZATION = {
  weapon: "#WeaponShowRoom_Menu",
  equipment: "#EquipmentShowRoom_Menu",
  courier: "#CourierShowRoom_Menu",
  cosmetic: "#CosmeticShowRoom_Menu"
};
const matchRecordsLastFetchTimeByUID = {};
const matchRecordsCacheByUID = {};
const getFishStarCount = weight => {
  if (weight === undefined) {
    return 1;
  }
  const clampedWeight = Math.max(0, Math.min(100, weight));
  if (clampedWeight <= 0) {
    return 1;
  }
  return Math.min(5, Math.ceil(clampedWeight / 20));
};
const PlayerInfo = props => {
  const playerInfo = service_netdata_helper.GetPlayerInfo({
    playerID: props.playerID,
    steamID: props.steamID,
    steam64ID: props.steam64ID
  });
  const targetKey = libs.createMemo(() => String(playerInfo.steamID() ?? ""));
  const playerInfoReady = libs.createMemo(() => {
    const data = playerInfo.data();
    const steamID = playerInfo.steamID();
    return !playerInfo.loading() && data != undefined && steamID != undefined && data.steamID == steamID;
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "PlayerInfo",
    get children() {
      return libs.createComponent(libs.Show, {
        get when() {
          return playerInfoReady();
        },
        get fallback() {
          return libs.createComponent(EOM_Loading.EOM_Loading, {
            type: "Wave",
            horizontalAlign: "center",
            verticalAlign: "center"
          });
        },
        get children() {
          return libs.createComponent(solid_utils.DynamicKey, {
            key: targetKey,
            children: () => libs.createComponent(PlayerInfoContent, {
              get show() {
                return props.show;
              },
              get playerID() {
                return props.playerID?.();
              },
              playerInfo: playerInfo
            })
          });
        }
      });
    }
  });
};
const PlayerInfoContent = props => {
  const playerInfo = props.playerInfo;
  const playerInfoData = libs.createMemo(() => playerInfo.data() ?? {});
  const accountLvData = libs.createMemo(() => playerInfoData().player_account_levels?.hero_level ?? {
    level: 1,
    extra_exp: 0
  });
  const MAX_LEVEL = Object.keys(KeyValues.hero_level_exp).length;
  const maxExp = libs.createMemo(() => {
    return KeyValues.hero_level_exp[Math.min(accountLvData().level, MAX_LEVEL)]?.exp ?? 1;
  });
  const maxExpText = libs.createMemo(() => {
    return maxExp() == 0 ? "\u221e" : String(maxExp());
  });
  const progressPercent = libs.createMemo(() => {
    if (maxExp() <= 0) return 0;
    return Math.max(0, Math.min(100, accountLvData().extra_exp / maxExp() * 100));
  });
  const playerUID = libs.createMemo(() => playerInfo.steamID() ?? service_netdata_helper.getPlayerSteamID({
    playerID: props.playerID
  }));
  const localPlayerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const briefMatchData = libs.createMemo(() => playerInfoData().player_common_match_data);
  const briefCommonData = libs.createMemo(() => playerInfoData().player_common_data);
  const playerHeroes = libs.createMemo(() => playerInfoData().player_heroes ?? {});
  const playerAchievements = libs.createMemo(() => playerInfoData().player_achievements ?? {});
  const playerCosmeticEquips = libs.createMemo(() => playerInfoData().player_cosmetic_equips ?? {});
  const [requestedMatchRecords, setRequestedMatchRecords] = libs.createSignal();
  const matchRecords = libs.createMemo(() => requestedMatchRecords() ?? []);
  const playerFishes = libs.createMemo(() => playerInfoData().player_idle_game_fishes ?? {});
  const playerFishData = libs.createMemo(() => playerInfoData().player_idle_game_fish_data ?? {
    aquarium_level: 0,
    equipment_level: 0,
    rod_level: 0,
    fish_bait: 0,
    fish_hooks: [],
    fish_courier_ids: [],
    times: 1,
    auto_switch_tools: false
  });
  const showRoomData = libs.createMemo(() => playerInfoData().player_show_rooms ?? {});
  const showRoomWeapon = libs.createMemo(() => {
    const data = showRoomData()?.["weapon-1"];
    if (!data?.weapon) return undefined;
    return data.weapon;
  });
  const showRoomEquipment = libs.createMemo(() => {
    const data = showRoomData()?.["equipment-1"];
    if (!data?.equipment) return undefined;
    return data.equipment;
  });
  const showRoomCourier = libs.createMemo(() => {
    const data = showRoomData()?.["courier-1"];
    if (!data?.courier) return undefined;
    return data.courier;
  });
  const showRoomCosmetic = libs.createMemo(() => {
    const data = showRoomData()?.["cosmetic-1"];
    if (data?.id == undefined) return undefined;
    return KeyValues.info_item_cosmetic[String(data.id)];
  });
  const showRoomWeaponTooltip = () => {
    const weapon = showRoomWeapon();
    if (weapon?.weapon_id == undefined) return undefined;
    return {
      name: "weapon_info",
      weapon_id: weapon.weapon_id
    };
  };
  const showRoomEquipmentTooltip = () => {
    const equipment = showRoomEquipment();
    if (equipment?.equipment_item_id == undefined) return undefined;
    return {
      name: "server_equip",
      data: JSON.stringify(equipment)
    };
  };
  const showRoomCourierTooltip = () => {
    const courier = showRoomCourier();
    if (courier?.courier_id == undefined) return undefined;
    return {
      name: "courier_info",
      courier_id: courier.courier_id
    };
  };
  const showRoomCosmeticTooltip = () => {
    const cosmetic = showRoomCosmetic();
    if (cosmetic?.id == undefined) return undefined;
    const image = getSrcPath(`store_items/${cosmetic.id}.png`);
    return StoreItem.GetStoreItemImageTooltipData(cosmetic.id, image);
  };
  const highestRarityFish = libs.createMemo(() => {
    const fishes = Object.values(playerFishes());
    const displayed = fishes.filter(f => f.show === true);
    if (displayed.length === 0) return undefined;
    displayed.sort((a, b) => {
      const rarityA = GetServiceItemRarity(a.fish_item_id);
      const rarityB = GetServiceItemRarity(b.fish_item_id);
      if (rarityB !== rarityA) return rarityB - rarityA;
      const starA = getFishStarCount(a.weight);
      const starB = getFishStarCount(b.weight);
      if (starB !== starA) return starB - starA;
      return b.get_time - a.get_time;
    });
    return displayed[0];
  });
  const fishStarCount = libs.createMemo(() => {
    const fish = highestRarityFish();
    return fish ? getFishStarCount(fish.weight) : 0;
  });
  const currentRodLevel = libs.createMemo(() => {
    const level = playerFishData()?.rod_level ?? 0;
    return Math.max(0, level);
  });
  const titleCosmeticID = libs.createMemo(() => {
    for (const equip of Object.values(playerCosmeticEquips())) {
      const cosmeticInfo = KeyValues.info_item_cosmetic[String(equip.cosmetic_id)];
      if (cosmeticInfo != undefined && cosmeticInfo.type == COSMETIC_TYPE.TITLE) {
        return String(equip.cosmetic_id);
      }
    }
    return "";
  });
  libs.createEffect(() => {
    if (props.show()) {
      const targetUID = playerUID();
      if (targetUID == undefined) return;
      const now = Game.Time();
      const cacheKey = String(targetUID);
      const cachedRecords = matchRecordsCacheByUID[cacheKey];
      if (cachedRecords != undefined) {
        setRequestedMatchRecords(cachedRecords);
      }
      if ((matchRecordsLastFetchTimeByUID[cacheKey] ?? -MATCH_RECORDS_CACHE_INTERVAL) + MATCH_RECORDS_CACHE_INTERVAL <= now) {
        CallActionRequest("/v1/brief/match_records", {
          target_uid: targetUID,
          limit: 10
        }, result => {
          const records = result.data?.player_common_match_records;
          if (Array.isArray(records)) {
            matchRecordsCacheByUID[cacheKey] = records;
            setRequestedMatchRecords(records);
          }
        }, undefined, false);
        matchRecordsLastFetchTimeByUID[cacheKey] = now;
      }
    }
  });
  const statInfos = libs.createMemo(() => {
    const matchData = briefMatchData();
    const commonData = briefCommonData();
    const achievements = playerAchievements();
    const parseDamage = val => {
      if (val == undefined) return "0";
      const num = Number(val);
      if (isNaN(num) || num === 0) return "0";
      return FormatNumber(num, 2);
    };
    const maxDiff = matchData?.max_diff ?? 0;
    const achievementProgress = commonData?.achievement_progress ?? 0;
    const achievementTotal = Object.keys(achievements).length;
    return [{
      title: "#PlayerInfo_MaxTotalDamage",
      text: parseDamage(matchData?.max_total_damage)
    }, {
      title: "#PlayerInfo_MaxDPS",
      text: parseDamage(matchData?.max_damage_per_second)
    }, {
      type: "small",
      title: "#PlayerInfo_Difficulty",
      text: String(maxDiff)
    }, {
      title: "#PlayerInfo_AchievementProgress",
      text: `${achievementProgress}/${achievementTotal}`
    }];
  });
  const heroCards = libs.createMemo(() => {
    const heroes = playerHeroes() ?? {};
    return Object.values(heroes).map(heroData => ({
      hero: GetHeroNameByHeroID(heroData.hero_id),
      heroID: heroData.hero_id,
      lv: heroData.star ?? 1
    })).filter(h => h.hero != undefined);
  });
  const settlementInfo = libs.createMemo(() => {
    const records = matchRecords();
    const latest = Array.isArray(records) ? records[0] : undefined;
    if (latest == undefined) {
      return {
        ret: "",
        hero: "",
        diff: "",
        bless: [],
        artifact: []
      };
    }
    const parseItemNames = str => {
      if (!str || str.startsWith("[")) return [];
      return str.split(",").map(pair => {
        const parts = pair.split(":");
        return {
          name: parts[0],
          rarity: Number(parts[1]) || 0
        };
      }).filter(item => item.name).sort((a, b) => b.rarity - a.rarity).map(item => item.name);
    };
    return {
      ret: latest.pass ? "WIN" : "LOSE",
      hero: GetHeroNameByHeroID(latest.hero_id) ?? "",
      diff: `${GetLocalization("#PlayerInfo_DiffPrefix")}${latest.diff}`,
      bless: parseItemNames(latest.bless).slice(0, 3),
      artifact: parseItemNames(latest.artifact).slice(0, 3)
    };
  });
  const playerCosmeticID = slot => {
    const cosmeticID = playerCosmeticEquips()[slot]?.cosmetic_id;
    return cosmeticID != undefined && cosmeticID > 0 ? String(cosmeticID) : undefined;
  };
  const borderCosmeticID = libs.createMemo(() => playerCosmeticID(COSMETIC_SLOT.BORDER) ?? "1710000");
  const medalCosmeticID = libs.createMemo(() => playerCosmeticID(COSMETIC_SLOT.MEDAL));
  const isLocalPlayer = libs.createMemo(() => {
    if (props.playerID != undefined) {
      return props.playerID == Players.GetLocalPlayer();
    }
    const targetSteamID = playerUID();
    const localSteamID = service_netdata_helper.getPlayerSteamID({
      playerID: Players.GetLocalPlayer()
    });
    return targetSteamID != undefined && localSteamID != undefined && targetSteamID == localSteamID;
  });
  const storedShowRoomDisplayTypes = libs.createMemo(() => {
    const keyValues = isLocalPlayer() ? localPlayerKeyValues() : playerInfoData().player_key_values ?? {};
    return parseShowRoomDisplayTypes(getShowRoomSettingValue(keyValues));
  });
  const [showRoomSettingOpen, setShowRoomSettingOpen] = libs.createSignal(false);
  const [showRoomSettingSaving, setShowRoomSettingSaving] = libs.createSignal(false);
  const [showRoomSettingTypes, setShowRoomSettingTypes] = libs.createSignal();
  const showRoomDisplayTypes = libs.createMemo(() => showRoomSettingTypes() ?? storedShowRoomDisplayTypes());
  let showRoomSettingInitialValue = "";
  let showRoomSettingSelectionOrder = [];
  const openShowRoomSetting = () => {
    if (showRoomSettingOpen() || showRoomSettingSaving()) return;
    const types = [...showRoomDisplayTypes()];
    showRoomSettingInitialValue = JSON.stringify(types);
    showRoomSettingSelectionOrder = types;
    setShowRoomSettingTypes(types);
    setShowRoomSettingOpen(true);
  };
  const selectShowRoomSettingType = type => {
    if (!showRoomSettingOpen()) return;
    if (showRoomSettingSelectionOrder.includes(type)) {
      const unselectedType = SHOW_ROOM_DISPLAY_TYPES.find(item => !showRoomSettingSelectionOrder.includes(item));
      if (unselectedType == undefined) return;
      showRoomSettingSelectionOrder = [...showRoomSettingSelectionOrder.filter(item => item != type), unselectedType];
    } else {
      showRoomSettingSelectionOrder = [...showRoomSettingSelectionOrder.slice(1), type];
    }
    setShowRoomSettingTypes(SHOW_ROOM_DISPLAY_TYPES.filter(item => showRoomSettingSelectionOrder.includes(item)));
  };
  const closeShowRoomSetting = () => {
    if (!showRoomSettingOpen()) return;
    setShowRoomSettingOpen(false);
    const nextTypes = showRoomSettingTypes() ?? storedShowRoomDisplayTypes();
    const value = JSON.stringify(nextTypes);
    if (value == showRoomSettingInitialValue) {
      return;
    }
    setShowRoomSettingSaving(true);
    const restoreInitialTypes = () => {
      setShowRoomSettingTypes(parseShowRoomDisplayTypes(showRoomSettingInitialValue));
      setShowRoomSettingSaving(false);
      playerInfo.refresh();
    };
    CallActionRequest("/v1/key/save", {
      type: "setting",
      key: SHOW_ROOM_SETTING_KEY,
      value
    }, result => {
      setShowRoomSettingSaving(false);
      if (result.code != 0 && result.code != 200) {
        setShowRoomSettingTypes(parseShowRoomDisplayTypes(showRoomSettingInitialValue));
        ErrorMessage(result.message ?? "");
      }
      playerInfo.refresh();
    }, restoreInitialTypes, false);
  };
  libs.onCleanup(closeShowRoomSetting);
  const openAquarium = () => JumpToMenu({
    window_name: "aquarium",
    menu: "Aquarium_Menu",
    force: true,
    data: {
      playerID: props.playerID,
      steamID: playerUID()
    }
  });
  const openFishingItem = () => {
    if (!isLocalPlayer()) return;
    JumpToMenu({
      window_name: "fishingitem",
      menu: "FishingItem",
      force: true
    });
  };
  const openShowRoom = menu => {
    JumpToMenu({
      window_name: "show_room",
      menu,
      force: true,
      data: {
        playerID: props.playerID,
        steamID: playerUID()
      }
    });
  };
  const ShowRoomDisplayItem = itemProps => {
    switch (itemProps.type) {
      case "weapon":
        return libs.createComponent(DisplayItemComp, {
          get title() {
            return GetLocalization("#Weapon_Menu");
          },
          get rarity() {
            return libs.memo(() => showRoomWeapon()?.weapon_id != undefined)() ? KeyValues.weapon[showRoomWeapon().weapon_id]?.rarity : undefined;
          },
          get name() {
            return libs.memo(() => showRoomWeapon()?.weapon_id != undefined)() ? GetLocalization(String(showRoomWeapon().weapon_id)) : undefined;
          },
          get customTooltip() {
            return showRoomWeaponTooltip();
          },
          onactivate: () => openShowRoom("WeaponShowRoom_Menu"),
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return showRoomWeapon()?.weapon_id != undefined;
              },
              get children() {
                return libs.createComponent(solid_utils.DynamicKey, {
                  key: showRoomWeapon,
                  children: data => libs.createComponent(weapon3DPreview.Weapon3DPreview, {
                    "class": "WeaponScenePreview",
                    get model() {
                      return KeyValues.weapon[data.weapon_id].model;
                    },
                    get defaultConfig() {
                      return KeyValues.weapon[data.weapon_id].hero;
                    }
                  })
                });
              }
            });
          }
        });
      case "equipment":
        return libs.createComponent(DisplayItemComp, {
          get title() {
            return GetLocalization("#PlayerInfo_Equipment");
          },
          get rarity() {
            return showRoomEquipment()?.rarity;
          },
          get name() {
            return libs.memo(() => showRoomEquipment()?.equipment_item_id != undefined)() ? GetLocalization(String(showRoomEquipment().equipment_item_id)) : undefined;
          },
          get customTooltip() {
            return showRoomEquipmentTooltip();
          },
          onactivate: () => openShowRoom("EquipmentShowRoom_Menu"),
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return showRoomEquipment()?.equipment_item_id != undefined;
              },
              get children() {
                return libs.createComponent(server_equipment.EquipmentIcon, {
                  get equipment_item_id() {
                    return showRoomEquipment().equipment_item_id;
                  },
                  get rarity() {
                    return showRoomEquipment().rarity;
                  }
                });
              }
            });
          }
        });
      case "courier":
        return libs.createComponent(DisplayItemComp, {
          get title() {
            return GetLocalization("#Courier_Menu");
          },
          get rarity() {
            return libs.memo(() => showRoomCourier()?.courier_id != undefined)() ? KeyValues.service_courier[showRoomCourier().courier_id]?.quality : undefined;
          },
          get name() {
            return libs.memo(() => showRoomCourier()?.courier_id != undefined)() ? GetLocalization(String(showRoomCourier().courier_id)) : undefined;
          },
          get customTooltip() {
            return showRoomCourierTooltip();
          },
          onactivate: () => openShowRoom("CourierShowRoom_Menu"),
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return showRoomCourier();
              },
              get children() {
                return libs.createComponent(solid_utils.DynamicKey, {
                  key: showRoomCourier,
                  children: data => libs.createComponent(StoreItem.StoreItemImage, {
                    get itemid() {
                      return data.courier_id;
                    }
                  })
                });
              }
            });
          }
        });
      case "cosmetic":
        return libs.createComponent(DisplayItemComp, {
          get title() {
            return GetLocalization("#CosmeticShowRoom_Menu");
          },
          get rarity() {
            return Number(showRoomCosmetic()?.rarity) || undefined;
          },
          get name() {
            return libs.memo(() => showRoomCosmetic()?.id != undefined)() ? GetLocalization(String(showRoomCosmetic().id)) : undefined;
          },
          get customTooltip() {
            return showRoomCosmeticTooltip();
          },
          onactivate: () => openShowRoom("CosmeticShowRoom_Menu"),
          get children() {
            return libs.createComponent(libs.Show, {
              get when() {
                return showRoomCosmetic()?.id != undefined;
              },
              get children() {
                return libs.createComponent(solid_utils.DynamicKey, {
                  key: showRoomCosmetic,
                  children: cosmetic => (() => {
                    const _el$ = libs.createElement("Image", {
                      "class": "CosmeticImage",
                      get src() {
                        return getSrcPath(`store_items/${cosmetic.id}.png`);
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$, "src", getSrcPath(`store_items/${cosmetic.id}.png`), _$p));
                    return _el$;
                  })()
                });
              }
            });
          }
        });
    }
  };
  return (() => {
    const _el$2 = libs.createElement("Panel", {
        id: "CenterBlock"
      }, null),
      _el$3 = libs.createElement("Panel", {
        id: "LeftArea"
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "TopInfo"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "TitleAndLv"
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        "class": "Title"
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        "class": "HeroLevelMain"
      }, _el$5),
      _el$8 = libs.createElement("Panel", {
        id: "LvContainer"
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        "class": "Lv",
        get text() {
          return "Lv." + accountLvData().level;
        }
      }, _el$8),
      _el$0 = libs.createElement("Panel", {
        id: "ProgressContainer"
      }, _el$7),
      _el$1 = libs.createElement("Panel", {
        id: "HeroLevelProgressBar"
      }, _el$0);
      libs.createElement("Panel", {
        id: "ProgressBarBG"
      }, _el$1);
      const _el$11 = libs.createElement("Panel", {
        id: "ProgressBar",
        get width() {
          return progressPercent();
        }
      }, _el$1),
      _el$12 = libs.createElement("Label", {
        id: "ProgressLabel",
        get text() {
          return `${accountLvData().extra_exp}/${maxExpText()}`;
        }
      }, _el$0),
      _el$13 = libs.createElement("Panel", {
        "class": "MedalList"
      }, _el$4),
      _el$14 = libs.createElement("Label", {
        id: "SteamID",
        get text() {
          return playerUID() ?? "";
        }
      }, _el$4),
      _el$15 = libs.createElement("Panel", {
        id: "HeroCards"
      }, _el$3),
      _el$16 = libs.createElement("Panel", {
        id: "InfoStat"
      }, _el$3),
      _el$17 = libs.createElement("Panel", {
        "class": "SettlementInfo"
      }, _el$3),
      _el$18 = libs.createElement("Panel", {
        id: "Title"
      }, _el$17);
      libs.createElement("Label", {
        "class": "Row Row1",
        text: "#PlayerInfo_BattleResult"
      }, _el$18);
      libs.createElement("Label", {
        "class": "Row Row2",
        text: "#PlayerInfo_UsedHero"
      }, _el$18);
      libs.createElement("Label", {
        "class": "Row Row3",
        text: "#PlayerInfo_Difficulty"
      }, _el$18);
      libs.createElement("Label", {
        "class": "Row Row4",
        text: "#PlayerInfo_Blessing"
      }, _el$18);
      libs.createElement("Label", {
        "class": "Row Row5",
        text: "#PlayerInfo_Artifact"
      }, _el$18);
      const _el$24 = libs.createElement("Panel", {
        "class": "SettlementDesc"
      }, _el$17),
      _el$25 = libs.createElement("Label", {
        get ["class"]() {
          return libs.classNames("Row Row1", settlementInfo().ret);
        },
        get text() {
          return settlementInfo().ret;
        }
      }, _el$24),
      _el$26 = libs.createElement("Panel", {
        "class": "Row Row2"
      }, _el$24),
      _el$27 = libs.createElement("Label", {
        "class": "Row Row3",
        get text() {
          return settlementInfo().diff;
        }
      }, _el$24),
      _el$28 = libs.createElement("Panel", {
        "class": "Row Row4"
      }, _el$24),
      _el$29 = libs.createElement("Panel", {
        horizontalAlign: "center",
        flowChildren: "right"
      }, _el$28),
      _el$30 = libs.createElement("Panel", {
        "class": "Row Row5"
      }, _el$24),
      _el$31 = libs.createElement("Panel", {
        horizontalAlign: "center",
        flowChildren: "right"
      }, _el$30),
      _el$32 = libs.createElement("Panel", {
        id: "RightArea"
      }, _el$2),
      _el$33 = libs.createElement("Panel", {
        marginTop: "32px",
        horizontalAlign: "center",
        flowChildren: "right"
      }, _el$32),
      _el$38 = libs.createElement("Panel", {
        "class": "Row2",
        marginTop: "25px",
        horizontalAlign: "center",
        flowChildren: "right"
      }, _el$32);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return playerUID();
      },
      get children() {
        return libs.createComponent(Player.PlayerAvatar, {
          get accountid() {
            return playerUID();
          },
          get borderid() {
            return borderCosmeticID();
          }
        });
      }
    }), _el$5);
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return titleCosmeticID() != "";
      },
      get children() {
        return libs.createComponent(Player.PlayerTitle, {
          "class": "TitleImage",
          get titleid() {
            return titleCosmeticID();
          }
        });
      }
    }));
    libs.insert(_el$8, libs.createComponent(Player.PlayerName, {
      id: "PlayerName",
      get accountid() {
        return playerUID();
      }
    }), null);
    libs.insert(_el$13, libs.createComponent(libs.Show, {
      get when() {
        return medalCosmeticID();
      },
      keyed: true,
      get children() {
        return libs.createComponent(Player.PlayerMedal, {
          get medalID() {
            return medalCosmeticID();
          }
        });
      }
    }), null);
    libs.insert(_el$13, libs.createComponent(RankBadgeBanner.PlayerRankBadgeBanner, {
      data: playerInfoData,
      get active() {
        return props.show;
      }
    }), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return props.playerID == Players.GetLocalPlayer();
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "EditIcon",
          onactivate: () => {
            ShowPopup("AvatarEdit", {});
          }
        });
      }
    }), null);
    libs.insert(_el$3, libs.createComponent(TitleComp, {
      text: "#PlayerInfo_HeroSoul",
      marginTop: "15px"
    }), _el$15);
    libs.insert(_el$15, libs.createComponent(libs.For, {
      get each() {
        return heroCards();
      },
      children: (data, i) => {
        return (() => {
          const _el$39 = libs.createElement("Panel", {
              "class": "HeroCardItem"
            }, null),
            _el$40 = libs.createElement("Label", {
              "class": "Lv",
              get text() {
                return data.lv;
              }
            }, _el$39);
          libs.insert(_el$39, libs.createComponent(hero_card.HeroCard, {
            get heroName() {
              return data.hero;
            }
          }), _el$40);
          libs.effect(_p$ => {
            const _v$8 = {
                name: "hero_info",
                hero_id: data.heroID,
                current_star: data.lv,
                show_next_soul: 0
              },
              _v$9 = data.lv;
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$39, "customTooltip", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$40, "text", _v$9, _p$._v$9));
            return _p$;
          }, {
            _v$8: undefined,
            _v$9: undefined
          });
          return _el$39;
        })();
      }
    }));
    libs.insert(_el$3, libs.createComponent(TitleComp, {
      text: "#PlayerInfo_PersonalData",
      marginTop: "31px"
    }), _el$16);
    libs.insert(_el$16, libs.createComponent(libs.For, {
      get each() {
        return statInfos();
      },
      children: (data, i) => {
        return (() => {
          const _el$41 = libs.createElement("Panel", {
              get ["class"]() {
                return "StatItem " + data.type;
              }
            }, null),
            _el$42 = libs.createElement("Panel", {
              width: "100%",
              height: "45px"
            }, _el$41),
            _el$43 = libs.createElement("Label", {
              "class": "StatTitle",
              get text() {
                return data.title;
              }
            }, _el$42),
            _el$44 = libs.createElement("Label", {
              "class": "StatValue",
              get text() {
                return data.text;
              }
            }, _el$41);
          libs.setProp(_el$42, "width", "100%");
          libs.setProp(_el$42, "height", "45px");
          libs.effect(_p$ => {
            const _v$0 = "StatItem " + data.type,
              _v$1 = data.title,
              _v$10 = data.text;
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$41, "class", _v$0, _p$._v$0));
            _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$43, "text", _v$1, _p$._v$1));
            _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$44, "text", _v$10, _p$._v$10));
            return _p$;
          }, {
            _v$0: undefined,
            _v$1: undefined,
            _v$10: undefined
          });
          return _el$41;
        })();
      }
    }));
    libs.insert(_el$3, libs.createComponent(TitleComp, {
      "class": "CombatLogTitle",
      text: "#PlayerInfo_CombatLog",
      marginTop: "41px",
      get onactivate() {
        return props.playerID != undefined ? () => {
          ShowPopup("CombatLog", {
            playerID: props.playerID
          });
        } : undefined;
      }
    }), _el$17);
    libs.insert(_el$26, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
      get heroname() {
        return settlementInfo().hero;
      },
      heroimagestyle: "icon"
    }));
    libs.setProp(_el$29, "horizontalAlign", "center");
    libs.setProp(_el$29, "flowChildren", "right");
    libs.insert(_el$29, libs.createComponent(libs.For, {
      get each() {
        return settlementInfo().bless;
      },
      children: data => {
        return libs.createComponent(common_item.CommonItem, {
          itemName: data,
          showTips: true
        });
      }
    }));
    libs.setProp(_el$31, "horizontalAlign", "center");
    libs.setProp(_el$31, "flowChildren", "right");
    libs.insert(_el$31, libs.createComponent(libs.For, {
      get each() {
        return settlementInfo().artifact;
      },
      children: data => {
        return libs.createComponent(common_item.CommonItem, {
          itemName: data,
          showTips: true
        });
      }
    }));
    libs.insert(_el$32, libs.createComponent(TitleComp, {
      "class": "ArrowTitle",
      text: "#Aquarium",
      type: "Large",
      onactivate: openAquarium,
      tooltip_text: "#PlayerInfo_Tips1"
    }), _el$33);
    libs.setProp(_el$33, "marginTop", "32px");
    libs.setProp(_el$33, "horizontalAlign", "center");
    libs.setProp(_el$33, "flowChildren", "right");
    libs.insert(_el$33, libs.createComponent(DisplayItemComp, {
      title: "#PlayerInfo_RareFish",
      get rarity() {
        return GetServiceItemRarity(highestRarityFish()?.fish_item_id);
      },
      get name() {
        return libs.memo(() => highestRarityFish()?.fish_item_id != undefined)() ? "#Normal_" + highestRarityFish().fish_item_id : undefined;
      },
      onactivate: openAquarium,
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return highestRarityFish();
          },
          get children() {
            return [libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return Number(highestRarityFish().fish_item_id);
              }
            }), (() => {
              const _el$34 = libs.createElement("Panel", {
                "class": "FishStarList"
              }, null);
              libs.insert(_el$34, libs.createComponent(libs.For, {
                each: [1, 2, 3, 4, 5],
                children: idx => (() => {
                  const _el$45 = libs.createElement("Image", {
                    "class": "FishStarIcon"
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$45, "visible", fishStarCount() >= idx, _$p));
                  return _el$45;
                })()
              }));
              return _el$34;
            })()];
          }
        });
      }
    }), null);
    libs.insert(_el$33, libs.createComponent(DisplayItemComp, {
      title: "#PlayerInfo_FishingGear",
      get rarity() {
        return KeyValues.idle_game_fish_rod[String(currentRodLevel())]?.rarity;
      },
      get name() {
        return libs.memo(() => currentRodLevel() >= 0)() ? GetLocalization("#rod_level" + currentRodLevel()) : undefined;
      },
      get customTooltip() {
        return libs.memo(() => currentRodLevel() >= 0)() ? {
          name: "fish_rod_info",
          item_id: currentRodLevel()
        } : undefined;
      },
      get onactivate() {
        return isLocalPlayer() ? openFishingItem : undefined;
      },
      get children() {
        return libs.createComponent(libs.Show, {
          get when() {
            return currentRodLevel() >= 0;
          },
          get children() {
            return libs.createComponent(fishRod3DPreview.FishRod3DPreview, {
              "class": "FishRodScenePreview",
              get model() {
                return KeyValues.idle_game_fish_rod[String(currentRodLevel())].model;
              }
            });
          }
        });
      }
    }), null);
    libs.insert(_el$32, libs.createComponent(TitleComp, {
      "class": "ArrowTitle",
      get text() {
        return GetLocalization("#PlayerInfo_ShowRoom");
      },
      type: "Large",
      marginTop: "37px",
      get tooltip_text() {
        return GetLocalization("#PlayerInfo_Tips2");
      },
      get setting() {
        return isLocalPlayer() ? openShowRoomSetting : undefined;
      },
      onactivate: () => openShowRoom()
    }), _el$38);
    libs.insert(_el$32, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!isLocalPlayer())() && showRoomSettingOpen();
      },
      get children() {
        return [libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "ShowRoomSettingDismiss",
          onactivate: closeShowRoomSetting
        }), (() => {
          const _el$35 = libs.createElement("Panel", {
              "class": "ShowRoomSettingDropdown"
            }, null);
            libs.createElement("Panel", {
              id: "DropdownBG"
            }, _el$35);
            const _el$37 = libs.createElement("Panel", {
              "class": "DropdownContainer"
            }, _el$35);
          libs.insert(_el$37, libs.createComponent(libs.For, {
            each: SHOW_ROOM_DISPLAY_TYPES,
            children: type => {
              const selected = () => showRoomDisplayTypes().includes(type);
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                get ["class"]() {
                  return libs.classNames("ShowRoomSettingOption", {
                    Selected: selected()
                  });
                },
                onactivate: () => selectShowRoomSettingType(type),
                get children() {
                  return [(() => {
                    const _el$46 = libs.createElement("Panel", {
                        "class": "ShowRoomSettingCheckBox"
                      }, null);
                      libs.createElement("Panel", {
                        "class": "ShowRoomSettingCheckMark"
                      }, _el$46);
                    return _el$46;
                  })(), (() => {
                    const _el$48 = libs.createElement("Label", {
                      get text() {
                        return GetLocalization(SHOW_ROOM_TYPE_LOCALIZATION[type]);
                      }
                    }, null);
                    libs.effect(_$p => libs.setProp(_el$48, "text", GetLocalization(SHOW_ROOM_TYPE_LOCALIZATION[type]), _$p));
                    return _el$48;
                  })()];
                }
              });
            }
          }));
          return _el$35;
        })()];
      }
    }), _el$38);
    libs.setProp(_el$38, "marginTop", "25px");
    libs.setProp(_el$38, "horizontalAlign", "center");
    libs.setProp(_el$38, "flowChildren", "right");
    libs.insert(_el$38, libs.createComponent(libs.For, {
      get each() {
        return showRoomDisplayTypes();
      },
      children: type => libs.createComponent(ShowRoomDisplayItem, {
        type: type
      })
    }));
    libs.effect(_p$ => {
      const _v$ = "Lv." + accountLvData().level,
        _v$2 = progressPercent(),
        _v$3 = `${accountLvData().extra_exp}/${maxExpText()}`,
        _v$4 = playerUID() ?? "",
        _v$5 = libs.classNames("Row Row1", settlementInfo().ret),
        _v$6 = settlementInfo().ret,
        _v$7 = settlementInfo().diff;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$9, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$11, "width", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$12, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$14, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$25, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$25, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$27, "text", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$2;
  })();
};
const DisplayItemComp = props => {
  const resolvedChildren = libs.children(() => libs.untrack(() => props.children));
  return (() => {
    const _el$49 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("DisplayItemComp", {
            IsEmpty: props.name == undefined,
            CanClick: props.onactivate != undefined
          });
        }
      }, null),
      _el$50 = libs.createElement("Label", {
        "class": "Title",
        get text() {
          return props.title;
        }
      }, _el$49);
      libs.createElement("Panel", {
        "class": "SegmentLine"
      }, _el$49);
      const _el$52 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("Frame", props.rarity ? `Rarity${props.rarity}` : undefined);
        }
      }, _el$49),
      _el$53 = libs.createElement("Label", {
        "class": "ItemName",
        get text() {
          return props.name;
        }
      }, _el$49);
    libs.insert(_el$52, resolvedChildren);
    libs.insert(_el$49, libs.createComponent(libs.Show, {
      get when() {
        return props.onactivate != undefined;
      },
      get children() {
        const _el$54 = libs.createElement("Panel", {
          "class": "ClickLayer",
          get onactivate() {
            return props.onactivate;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$11 = props.onactivate,
            _v$12 = props.customTooltip;
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$54, "onactivate", _v$11, _p$._v$11));
          _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$54, "customTooltip", _v$12, _p$._v$12));
          return _p$;
        }, {
          _v$11: undefined,
          _v$12: undefined
        });
        return _el$54;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$13 = libs.classNames("DisplayItemComp", {
          IsEmpty: props.name == undefined,
          CanClick: props.onactivate != undefined
        }),
        _v$14 = props.title,
        _v$15 = libs.classNames("Frame", props.rarity ? `Rarity${props.rarity}` : undefined),
        _v$16 = props.customTooltip,
        _v$17 = props.name;
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$49, "class", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$50, "text", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$52, "class", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$52, "customTooltip", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$53, "text", _v$17, _p$._v$17));
      return _p$;
    }, {
      _v$13: undefined,
      _v$14: undefined,
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined
    });
    return _el$49;
  })();
};
const TitleComp = props => {
  const [local, other] = libs.splitProps(props, ["text", "class", "type", "setting"]);
  return (() => {
    const _el$55 = libs.createElement("Panel", libs.mergeProps$1({
        get ["class"]() {
          return libs.classNames({
            CanClick: props.onactivate != undefined
          }, "TitleComp", local.type, local.class);
        }
      }, other), null),
      _el$56 = libs.createElement("Label", {
        "class": "TitleLabel",
        get text() {
          return local.text;
        }
      }, _el$55);
    libs.spread(_el$55, libs.mergeProps$1({
      get ["class"]() {
        return libs.classNames({
          CanClick: props.onactivate != undefined
        }, "TitleComp", local.type, local.class);
      }
    }, other), true);
    libs.insert(_el$55, libs.createComponent(libs.Show, {
      get when() {
        return local.setting;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "EditIcon",
          get onactivate() {
            return local.setting;
          }
        });
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$56, "text", local.text, _$p));
    return _el$55;
  })();
};

const MENU_LIST = {
  PlayerInfo_Menu: [],
  Blessing_Menu: [],
  Collection_Menu: [],
  Handbook_Menu: ["Handbook_Blessing_Menu", "Handbook_Artifact_Menu", "Handbook_AbilityUpgrade_Menu"],
  Achieve_Menu: []
};
const {
  LayoutMenu,
  show,
  menuName,
  secondTabName,
  jumpInfo
} = EOM_MenuLayout.createMenuLayout("book", () => MENU_LIST);
const playerInfoPlayerID = libs.createMemo(() => {
  const event = jumpInfo();
  const targetPlayerID = event?.menu == "PlayerInfo_Menu" ? event.data?.playerID : undefined;
  if (typeof targetPlayerID == "number") return targetPlayerID;
  if (event?.menu == "PlayerInfo_Menu" && (event.data?.steamID != undefined || event.data?.steam64ID != undefined)) return undefined;
  return Players.GetLocalPlayer();
});
const playerInfoSteamID = libs.createMemo(() => {
  const event = jumpInfo();
  const targetSteamID = event?.menu == "PlayerInfo_Menu" ? event.data?.steamID : undefined;
  return typeof targetSteamID == "number" || typeof targetSteamID == "string" ? targetSteamID : undefined;
});
const playerInfoSteam64ID = libs.createMemo(() => {
  const event = jumpInfo();
  const targetSteam64ID = event?.menu == "PlayerInfo_Menu" ? event.data?.steam64ID : undefined;
  return typeof targetSteam64ID == "number" || typeof targetSteam64ID == "string" ? targetSteam64ID : undefined;
});
function Book() {
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "BookRoot",
    name: "MenuButton_book",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "PlayerInfo_Menu";
            },
            get children() {
              return libs.createComponent(PlayerInfo, {
                show: show,
                playerID: playerInfoPlayerID,
                steamID: playerInfoSteamID,
                steam64ID: playerInfoSteam64ID
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Blessing_Menu";
            },
            get children() {
              return libs.createComponent(Blessing, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Collection_Menu";
            },
            get children() {
              return libs.createComponent(collection.Collection, {
                type: "collection"
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return libs.memo(() => menuName() == "Handbook_Menu")() && secondTabName() == "Handbook_Blessing_Menu";
            },
            get children() {
              return libs.createComponent(HandbookBlessing, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return libs.memo(() => menuName() == "Handbook_Menu")() && secondTabName() == "Handbook_Artifact_Menu";
            },
            get children() {
              return libs.createComponent(HandbookArtifact, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return libs.memo(() => menuName() == "Handbook_Menu")() && secondTabName() == "Handbook_AbilityUpgrade_Menu";
            },
            get children() {
              return libs.createComponent(HandbookAbilityUpgrade, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Achieve_Menu";
            },
            get children() {
              return libs.createComponent(Achievement, {});
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(Book, {}), $.GetContextPanel());