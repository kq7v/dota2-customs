--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var StoreItem = require('./StoreItem.js');
var tooltip_base = require('./tooltip_base.js');
var service_netdata_helper = require('./service_netdata_helper.js');
require('./solid_utils.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_Button.js');
require('./Player.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

const maxStar = 6;
let root = $.GetContextPanel();
function getCourierID() {
  return root.GetAttributeString("courier_id", "") || root.GetAttributeString("item_id", "") || root.GetAttributeString("id", "");
}
function getCourierName(courierID) {
  return GetLocalization("#" + courierID);
}
function getCourierAbilityDescription(abilityName, level) {
  if (!abilityName) return "";
  const abilityData = KeyValues.courier_abilities[abilityName];
  if (!abilityData) return "";
  return getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${abilityName}_Description`), abilityData.AbilityValues ?? {}, {
    level
  });
}
function getCourierHomeBonusInfo(skillName) {
  if (!skillName) return {
    desc: ""
  };
  const parts = skillName.split(":");
  if (parts.length === 2) {
    return {
      desc: GetPropertyLocalization(parts[0], toFiniteNumber(parts[1], 0))
    };
  }
  const cfg = KeyValues.idle_game_drop_privilege[skillName];
  if (cfg == undefined) {
    return {
      desc: ""
    };
  }
  const desc = getKeyValueDescription(GetLocalization(`#${skillName}`), {
    chance: cfg.chance
  });
  return {
    desc: `${desc}：`,
    item: {
      id: String(cfg.itemid),
      count: toFiniteNumber(cfg.num, 1)
    }
  };
}
function getCourierStarDescription(courierData, star) {
  if (courierData == undefined || star <= 0) {
    return GetLocalization("#CourierTooltip_NoAttributeEffect");
  }
  const effectData = courierData["star_effect" + star];
  const descriptions = [];
  for (const [attributeName, value] of Object.entries(effectData ?? {})) {
    if (typeof value === "number") {
      descriptions.push(GetPropertyLocalization(attributeName, value));
    }
  }
  return descriptions.length > 0 ? descriptions.join("<br>") : GetLocalization("#CourierTooltip_NoAttributeEffect");
}
function getDropItemTooltip(itemID) {
  const holdNum = GetServiceItemCount(itemID);
  const holdNumLabel = GetLocalization("#Store_HoldNum") + holdNum;
  const description = GetLocalization(`${itemID}_description`);
  return {
    name: "title_image_text",
    title: GetLocalization(itemID),
    image: getSrcPath(`store_items/${itemID}.png`),
    text: `${holdNumLabel}<br>${description}`
  };
}
function TooltipContents(props) {
  const courierData = KeyValues.service_courier[props.courierID];
  const playerCouriers = service_netdata_helper.usePlayerCouriers();
  const courierLevel = libs.createMemo(() => Math.min(Math.max(playerCouriers()?.[props.courierID]?.star ?? 0, 0), maxStar));
  const nextCourierLevel = libs.createMemo(() => courierLevel() + 1);
  const homeBonusLevel = libs.createMemo(() => Math.max(courierLevel(), 1));
  const currentHomeSkill = libs.createMemo(() => {
    if (courierData == undefined) return undefined;
    const data = courierData;
    const level = homeBonusLevel();
    const fishSkill = data[`fish_skill${level}`];
    if (fishSkill) {
      return {
        skillName: fishSkill,
        type: "fish"
      };
    }
    const exploreSkill = data[`explore_skill${level}`];
    if (exploreSkill) {
      return {
        skillName: exploreSkill,
        type: "explore"
      };
    }
    return undefined;
  });
  const activeDesc = libs.createMemo(() => getCourierAbilityDescription(courierData?.active_skill ?? "", courierLevel()));
  const homeBonus = libs.createMemo(() => getCourierHomeBonusInfo(currentHomeSkill()?.skillName ?? ""));
  const homeBonusTitle = libs.createMemo(() => GetLocalization(currentHomeSkill()?.type === "fish" ? "#courier_ability_fish_bonus" : "#courier_ability_explore_bonus"));
  const currentStarDesc = libs.createMemo(() => getCourierStarDescription(courierData, courierLevel()));
  const nextStarDesc = libs.createMemo(() => getCourierStarDescription(courierData, nextCourierLevel()));
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "CourierInfoTooltip"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      when: courierData,
      get children() {
        return [(() => {
          const _el$2 = libs.createElement("Label", {
            id: "CourierInfoTooltipTitle",
            html: true,
            get text() {
              return getCourierName(props.courierID);
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$2, "text", getCourierName(props.courierID), _$p));
          return _el$2;
        })(), (() => {
          const _el$3 = libs.createElement("Label", {
            "class": "TooltipPropType",
            get text() {
              return "[" + GetLocalization("#PropType_Courier") + "]";
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$3, "text", "[" + GetLocalization("#PropType_Courier") + "]", _$p));
          return _el$3;
        })(), (() => {
          const _el$4 = libs.createElement("Panel", {
            id: "CourierInfoTooltipImageFrame"
          }, null);
          libs.insert(_el$4, libs.createComponent(StoreItem.StoreItemImage, {
            get itemid() {
              return props.courierID;
            },
            hideTips: true
          }));
          return _el$4;
        })(), (() => {
          const _el$5 = libs.createElement("Panel", {
            id: "CourierInfoTooltipEffectList"
          }, null);
          libs.insert(_el$5, libs.createComponent(libs.Show, {
            get when() {
              return activeDesc() !== "";
            },
            get children() {
              return libs.createComponent(TooltipSection, {
                get title() {
                  return GetLocalization("#courier_ability_active");
                },
                get children() {
                  const _el$6 = libs.createElement("Panel", {
                      "class": "CourierInfoTooltipAbilityRow"
                    }, null),
                    _el$7 = libs.createElement("DOTAAbilityImage", {
                      "class": "CourierInfoTooltipAbilityImage",
                      get abilityname() {
                        return courierData?.active_skill ?? "";
                      },
                      showtooltip: false
                    }, _el$6),
                    _el$8 = libs.createElement("Label", {
                      "class": "CourierInfoTooltipEffectDesc",
                      html: true,
                      get text() {
                        return activeDesc();
                      }
                    }, _el$6);
                  libs.effect(_p$ => {
                    const _v$ = courierData?.active_skill ?? "",
                      _v$2 = activeDesc();
                    _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$7, "abilityname", _v$, _p$._v$));
                    _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "text", _v$2, _p$._v$2));
                    return _p$;
                  }, {
                    _v$: undefined,
                    _v$2: undefined
                  });
                  return _el$6;
                }
              });
            }
          }), null);
          libs.insert(_el$5, libs.createComponent(libs.Show, {
            get when() {
              return homeBonus().desc !== "";
            },
            get children() {
              return libs.createComponent(TooltipSection, {
                get title() {
                  return homeBonusTitle();
                },
                get children() {
                  const _el$9 = libs.createElement("Panel", {
                      "class": "CourierInfoTooltipHomeBonusRow"
                    }, null),
                    _el$0 = libs.createElement("Label", {
                      "class": "CourierInfoTooltipEffectDesc",
                      html: true,
                      get text() {
                        return homeBonus().desc;
                      }
                    }, _el$9);
                  libs.insert(_el$9, libs.createComponent(libs.Show, {
                    get when() {
                      return homeBonus().item != undefined;
                    },
                    get children() {
                      return libs.createComponent(StoreItem.StoreItemBlock, {
                        "class": "CourierInfoTooltipDropItem",
                        get item_id() {
                          return homeBonus().item.id;
                        },
                        get amounts() {
                          return homeBonus().item.count;
                        },
                        hideTips: true,
                        get customTooltip() {
                          return getDropItemTooltip(homeBonus().item.id);
                        }
                      });
                    }
                  }), null);
                  libs.effect(_$p => libs.setProp(_el$0, "text", homeBonus().desc, _$p));
                  return _el$9;
                }
              });
            }
          }), null);
          libs.insert(_el$5, libs.createComponent(TooltipStarSection, {
            get title() {
              return GetLocalization("#Courier_CurrentStarEffect");
            },
            get level() {
              return courierLevel();
            },
            get desc() {
              return currentStarDesc();
            }
          }), null);
          libs.insert(_el$5, libs.createComponent(libs.Show, {
            get when() {
              return nextCourierLevel() <= maxStar;
            },
            get children() {
              return libs.createComponent(TooltipStarSection, {
                get title() {
                  return GetLocalization("#Courier_NextStarEffect");
                },
                get level() {
                  return nextCourierLevel();
                },
                get desc() {
                  return nextStarDesc();
                },
                muted: true
              });
            }
          }), null);
          return _el$5;
        })()];
      }
    }));
    return _el$;
  })();
}
function TooltipSection(props) {
  return (() => {
    const _el$1 = libs.createElement("Panel", {
        "class": "CourierInfoTooltipSection"
      }, null),
      _el$10 = libs.createElement("Label", {
        "class": "CourierInfoTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$1);
    libs.insert(_el$1, () => props.children, null);
    libs.effect(_$p => libs.setProp(_el$10, "text", props.title, _$p));
    return _el$1;
  })();
}
function TooltipStarSection(props) {
  return (() => {
    const _el$11 = libs.createElement("Panel", {
        "class": "CourierInfoTooltipSection"
      }, null),
      _el$12 = libs.createElement("Label", {
        "class": "CourierInfoTooltipSectionTitle",
        html: true,
        get text() {
          return props.title;
        }
      }, _el$11),
      _el$13 = libs.createElement("Panel", {
        "class": "CourierInfoTooltipStarRow"
      }, _el$11),
      _el$14 = libs.createElement("Panel", {
        "class": "CourierInfoTooltipStarBadge"
      }, _el$13),
      _el$15 = libs.createElement("Label", {
        get text() {
          return props.level;
        }
      }, _el$14),
      _el$16 = libs.createElement("Label", {
        "class": "CourierInfoTooltipEffectDesc",
        html: true,
        get text() {
          return props.desc;
        }
      }, _el$13);
    libs.effect(_p$ => {
      const _v$3 = {
          Muted: props.muted == true
        },
        _v$4 = props.title,
        _v$5 = props.level,
        _v$6 = props.desc;
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$11, "classList", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$15, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$16, "text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$11;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get courierID() {
      return getCourierID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "BaseTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();