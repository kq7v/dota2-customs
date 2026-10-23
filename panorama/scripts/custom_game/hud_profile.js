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
var Player = require('./Player.js');
var EOM_CostLabel = require('./EOM_CostLabel.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var EOM_Button = require('./EOM_Button.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
var service_netdata_helper = require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const essencesCfgs = {};
const essenceHitAreaIndexes = [0, 1, 2];
const essenceIcon = {
  "1100001": "e4_essence/e4_zeus.png",
  "1100002": "e4_essence/e4_poison.png",
  "1100003": "e4_essence/e4_ice.png",
  "1100004": "e4_essence/e4_blood.png",
  "1100005": "e4_essence/e4_shield.png",
  "1100006": "e4_essence/e4_anti.png"
};
Object.entries(KeyValues.collection_essence).forEach(([key, data], idx) => {
  essencesCfgs[data.item_id] ??= [];
  essencesCfgs[data.item_id].push(data);
  essencesCfgs[data.item_id].sort((a, b) => {
    return b.essence_lv - a.essence_lv;
  });
});
const essencesList = Object.keys(essencesCfgs);
const essenceMaxLevel = {};
const essenceLevelCost = {};
for (const idStr of essencesList) {
  const cfgList = essencesCfgs[Number(idStr)];
  if (!cfgList || cfgList.length === 0) continue;
  essenceMaxLevel[idStr] = cfgList[0].essence_lv;
  const costMap = {};
  for (const cfg of cfgList) {
    costMap[cfg.essence_lv - 1] = cfg.level_cost;
  }
  essenceLevelCost[idStr] = costMap;
}
const _essencePlayerData = solid_utils.createServiceNetData("player_collection_essences", {});
const hasAnyEssenceCanLevelUp = libs.createMemo(() => {
  const playerData = _essencePlayerData();
  for (const idStr of essencesList) {
    const data = playerData[idStr] ?? {
      level: 0,
      extra_exp: 0
    };
    if (data.level >= essenceMaxLevel[idStr]) continue;
    const cost = essenceLevelCost[idStr]?.[data.level] ?? 0;
    if (cost > 0 && data.extra_exp >= cost) {
      return true;
    }
  }
  return false;
});
libs.createEffect(libs.on(hasAnyEssenceCanLevelUp, red => {
  CustomUIConfig.SetRedPoint(red, "profile", "Essences_Menu");
}));
const Essences = () => {
  const player_collection_essences = solid_utils.createServiceNetData("player_collection_essences", {});
  const [selectedID, setSelectedID] = libs.createSignal(Number(essencesList[0]));
  const [hoveredID, setHoveredID] = libs.createSignal();
  const viewEssenceData = libs.createMemo(() => player_collection_essences()[selectedID()] ?? {
    level: 0,
    extra_exp: 0
  });
  const selectedCfgList = libs.createMemo(() => essencesCfgs[selectedID()] ?? []);
  const maxLevel = libs.createMemo(() => selectedCfgList()[0]?.essence_lv ?? 0);
  const currentLevelCfg = libs.createMemo(() => {
    return selectedCfgList().find(cfg => cfg.essence_lv === viewEssenceData().level);
  });
  const nextLevelCfg = libs.createMemo(() => {
    return selectedCfgList().find(cfg => cfg.essence_lv === viewEssenceData().level + 1);
  });
  const levelCost = libs.createMemo(() => nextLevelCfg()?.level_cost ?? 0);
  const isMax = libs.createMemo(() => viewEssenceData().level >= maxLevel());
  const canLevelUp = libs.createMemo(() => levelCost() > 0 && viewEssenceData().extra_exp >= levelCost());
  const [requesting, SetRequesting] = libs.createSignal(false);
  const currentAttributeText = libs.createMemo(() => {
    const level = viewEssenceData().level;
    if (level <= 0) return "";
    const cfgs = selectedCfgList();
    const sumAttr = {};
    let hasAttr = false;
    for (let i = cfgs.length - 1; i >= 0; i--) {
      if (cfgs[i].essence_lv > level) continue;
      const attr = cfgs[i].attribute;
      if (attr) {
        hasAttr = true;
        for (const [k, v] of Object.entries(attr)) {
          sumAttr[k] = (sumAttr[k] ?? 0) + Number(v);
        }
      }
    }
    if (!hasAttr) return "";
    return Object.entries(sumAttr).map(([attribute, value]) => "<panel class='EffectIcon'/>" + GetPropertyLocalization(attribute, value)).join("<br>");
  });
  const nextAttributeText = libs.createMemo(() => {
    const attr = nextLevelCfg()?.attribute;
    if (!attr) return "";
    return Object.entries(attr).map(([attribute, value]) => "<panel class='EffectIcon'/>" + GetPropertyLocalization(attribute, value)).join("<br>");
  });
  const currentPrivilegeText = libs.createMemo(() => {
    const level = viewEssenceData().level;
    let privilegeLv = 0;
    let privilege_effect;
    const cfgs = essencesCfgs[selectedID()];
    for (let i = 0; i < cfgs.length; i++) {
      if (cfgs[i].essence_lv <= level) {
        if (cfgs[i].privilege_effect) {
          privilege_effect = cfgs[i].privilege_effect;
          privilegeLv++;
        }
      }
    }
    if (!privilege_effect) {
      return;
    }
    return "<panel class='EffectIcon'/>" + GetPrivilegeDesc(privilege_effect, privilegeLv);
  });
  const nextPrivilegeText = libs.createMemo(() => {
    const nextLevel = viewEssenceData().level + 1;
    let privilegeLv = 0;
    let privilege_effect;
    const cfgs = essencesCfgs[selectedID()];
    for (let i = 0; i < cfgs.length; i++) {
      if (cfgs[i].essence_lv <= nextLevel) {
        if (cfgs[i].privilege_effect) {
          privilege_effect = cfgs[i].privilege_effect;
          privilegeLv++;
        }
      }
    }
    if (!privilege_effect) return;
    const curPrivilege = currentPrivilegeText();
    const text = "<panel class='EffectIcon'/>" + GetPrivilegeDesc(privilege_effect, privilegeLv);
    if (text === curPrivilege) return;
    return text;
  });
  let refImageBg;
  function ShowLevelupFx() {
    if (!refImageBg?.IsValid()) return;
    $.CreatePanel("DOTAParticleScenePanel", refImageBg, "LevelupFx", {
      particleName: "particles/ui/game/ui_game_falling_star_01.vpcf",
      cameraOrigin: "0 0 256",
      lookAt: "0 0 0",
      squarePixels: true,
      fov: 90,
      hittest: false
    }).DeleteAsync(3);
    Game.EmitSound("ui.npe_badge");
  }
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "Essences",
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "CenterBlock"
        }, null);
        libs.createElement("Panel", {
          id: "gravels"
        }, _el$);
        const _el$3 = libs.createElement("Panel", {
          id: "EssenceContainer"
        }, _el$),
        _el$4 = libs.createElement("Panel", {
          id: "EssenceDetail",
          get ["class"]() {
            return "Essence" + selectedID();
          }
        }, _el$),
        _el$5 = libs.createElement("Image", {
          id: "EssenceImg",
          get src() {
            return getSrcPath(essenceIcon[selectedID()]);
          }
        }, _el$4),
        _el$6 = libs.createElement("Label", {
          id: "Name",
          get text() {
            return "#" + (currentLevelCfg()?.item_id ?? nextLevelCfg()?.item_id ?? "");
          }
        }, _el$4),
        _el$7 = libs.createElement("Label", {
          id: "Level",
          get text() {
            return `${GetLocalization("#Essence_Level")}${viewEssenceData().level}/${maxLevel()}`;
          }
        }, _el$4),
        _el$8 = libs.createElement("Panel", {
          id: "EssenceEffectBlock"
        }, _el$4),
        _el$1 = libs.createElement("Panel", {
          marginTop: "12px",
          width: "100%",
          flowChildren: "down"
        }, _el$8),
        _el$10 = libs.createElement("Label", {
          get text() {
            return viewEssenceData().level === 0 ? "#Essence_UnlockEffect" : "#Essence_NextLevelEffect";
          }
        }, _el$1),
        _el$11 = libs.createElement("Label", {
          id: "EssenceNext",
          html: true,
          get text() {
            return nextAttributeText();
          }
        }, _el$1);
      libs.insert(_el$3, libs.createComponent(libs.For, {
        each: essencesList,
        children: (id, idx) => {
          const essenceData = () => player_collection_essences()[id] ?? {
            level: 0,
            extra_exp: 0
          };
          const cfgList = essencesCfgs[Number(id)] ?? [];
          const itemID = cfgList[cfgList.length - 1]?.item_id ?? "";
          const isCurrentMax = () => essenceData().level >= (essenceMaxLevel[id] ?? 0);
          const canCurrentLevelUp = () => {
            if (isCurrentMax()) return false;
            const cost = essenceLevelCost[id]?.[essenceData().level] ?? 0;
            return cost > 0 && essenceData().extra_exp >= cost;
          };
          return (() => {
            const _el$17 = libs.createElement("Panel", {
                id: id,
                "class": "EssenceItem",
                hittest: false
              }, null),
              _el$18 = libs.createElement("Panel", {
                id: "EssenceInfo",
                hittest: false
              }, _el$17);
              libs.createElement("Panel", {
                id: "Glow"
              }, _el$18);
              libs.createElement("Panel", {
                id: "IdxBG"
              }, _el$18);
              const _el$21 = libs.createElement("Panel", {
                id: "EssenceIconBG",
                hittest: false
              }, _el$18),
              _el$22 = libs.createElement("Image", {
                id: "EssenceIcon",
                get src() {
                  return getSrcPath(essenceIcon[id]);
                }
              }, _el$21);
              libs.createElement("Panel", {
                id: "Lock"
              }, _el$21);
              const _el$24 = libs.createElement("Label", {
                id: "IdxLabel",
                get text() {
                  return "Lv." + essenceData().level;
                }
              }, _el$18),
              _el$25 = libs.createElement("Label", {
                id: "EssenceName",
                text: "#" + itemID
              }, _el$18);
            libs.setProp(_el$17, "id", id);
            libs.insert(_el$17, libs.createComponent(libs.For, {
              each: essenceHitAreaIndexes,
              children: index => (() => {
                const _el$26 = libs.createElement("Panel", {
                  "class": "EssenceHitArea",
                  id: `HitArea_${id}_${index}`
                }, null);
                libs.setProp(_el$26, "id", `HitArea_${id}_${index}`);
                libs.setProp(_el$26, "onactivate", () => setSelectedID(Number(id)));
                libs.setProp(_el$26, "onmouseover", () => setHoveredID(Number(id)));
                libs.setProp(_el$26, "onmouseout", () => setHoveredID(current => current === Number(id) ? undefined : current));
                return _el$26;
              })()
            }), _el$18);
            libs.setProp(_el$25, "text", "#" + itemID);
            libs.insert(_el$17, libs.createComponent(libs.Show, {
              get when() {
                return canCurrentLevelUp();
              },
              get children() {
                return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                  type: "exclamation"
                });
              }
            }), null);
            libs.effect(_p$ => {
              const _v$8 = {
                  Active: selectedID() === Number(id),
                  Hover: hoveredID() === Number(id),
                  Lock: essenceData().level === 0
                },
                _v$9 = getSrcPath(essenceIcon[id]),
                _v$0 = "Lv." + essenceData().level;
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$17, "classList", _v$8, _p$._v$8));
              _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$22, "src", _v$9, _p$._v$9));
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$24, "text", _v$0, _p$._v$0));
              return _p$;
            }, {
              _v$8: undefined,
              _v$9: undefined,
              _v$0: undefined
            });
            return _el$17;
          })();
        }
      }));
      const _ref$ = refImageBg;
      typeof _ref$ === "function" ? libs.use(_ref$, _el$5) : refImageBg = _el$5;
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return currentAttributeText();
        },
        get children() {
          const _el$9 = libs.createElement("Label", {
            id: "EssenceCurrent",
            html: true,
            get text() {
              return currentAttributeText();
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$9, "text", currentAttributeText(), _$p));
          return _el$9;
        }
      }), _el$1);
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return currentPrivilegeText();
        },
        get children() {
          const _el$0 = libs.createElement("Label", {
            id: "PrivilegeEffet",
            html: true,
            get text() {
              return currentPrivilegeText();
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$0, "text", currentPrivilegeText(), _$p));
          return _el$0;
        }
      }), _el$1);
      libs.setProp(_el$1, "marginTop", "12px");
      libs.setProp(_el$1, "width", "100%");
      libs.setProp(_el$1, "flowChildren", "down");
      libs.insert(_el$1, libs.createComponent(libs.Show, {
        get when() {
          return nextPrivilegeText();
        },
        get children() {
          const _el$12 = libs.createElement("Label", {
            id: "NextPrivilegeEffet",
            html: true,
            get text() {
              return nextPrivilegeText();
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$12, "text", nextPrivilegeText(), _$p));
          return _el$12;
        }
      }), null);
      libs.insert(_el$4, libs.createComponent(libs.Show, {
        get when() {
          return !isMax();
        },
        get children() {
          return [(() => {
            const _el$13 = libs.createElement("Panel", {
                id: "ConsumeDivider"
              }, null);
              libs.createElement("Image", {
                id: "LineLeft"
              }, _el$13);
              libs.createElement("Label", {
                id: "ConsumeTitle",
                text: "#Essence_Consume"
              }, _el$13);
              libs.createElement("Image", {
                id: "LineRight"
              }, _el$13);
            return _el$13;
          })(), libs.createComponent(StoreItem.StoreItemBlock, {
            get item_id() {
              return selectedID();
            }
          }), libs.createComponent(EOM_CostLabel.EOM_CostLabel, {
            id: "UpgradeCost",
            get have() {
              return viewEssenceData().extra_exp;
            },
            get cost() {
              return levelCost();
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            id: "UpgradeBtn",
            get text() {
              return (() => viewEssenceData().level == 0 ? "#Essence_Activate" : "#Collection_UpgradeBtn")();
            },
            color: "Confirm",
            get enabled() {
              return libs.memo(() => !!!requesting())() && canLevelUp();
            },
            onactivate: self => {
              if (requesting()) return;
              if (!canLevelUp()) return;
              SetRequesting(true);
              CallActionRequest("/v1/collection/levelup_essence", {
                collection_essence_id: toFiniteNumber(selectedID())
              }, () => {
                SetRequesting(false);
                ShowLevelupFx();
              });
            }
          })];
        }
      }), null);
      libs.effect(_p$ => {
        const _v$ = "Essence" + selectedID(),
          _v$2 = getSrcPath(essenceIcon[selectedID()]),
          _v$3 = "#" + (currentLevelCfg()?.item_id ?? nextLevelCfg()?.item_id ?? ""),
          _v$4 = `${GetLocalization("#Essence_Level")}${viewEssenceData().level}/${maxLevel()}`,
          _v$5 = nextAttributeText() != undefined && nextAttributeText() != "" || !!nextPrivilegeText(),
          _v$6 = viewEssenceData().level === 0 ? "#Essence_UnlockEffect" : "#Essence_NextLevelEffect",
          _v$7 = nextAttributeText();
        _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "class", _v$, _p$._v$));
        _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "src", _v$2, _p$._v$2));
        _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "visible", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$10, "text", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$11, "text", _v$7, _p$._v$7));
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
      return _el$;
    }
  });
};

const TALENT_NODE_POSITIONS = [[0, -294], [-108, -200], [108, -200], [-65, -114], [65, -114], [-108, -28], [108, -28], [-65, 58], [65, 58], [-108, 146], [108, 146], [0, 210], [0, 360], [132, 285]];
const CONNECTION_LINES = {
  "01": {
    to: 1,
    style: {
      x: "-54.0px",
      y: "-247.0px",
      width: "4px",
      height: "143.2px",
      transform: "rotateZ(49.0deg)"
    }
  },
  "02": {
    to: 2,
    style: {
      x: "54.0px",
      y: "-247.0px",
      width: "4px",
      height: "143.2px",
      transform: "rotateZ(-49.0deg)"
    }
  },
  "13": {
    to: 3,
    style: {
      x: "-86.5px",
      y: "-157.0px",
      width: "4px",
      height: "96.2px",
      transform: "rotateZ(-26.6deg)"
    }
  },
  "24": {
    to: 4,
    style: {
      x: "86.5px",
      y: "-157.0px",
      width: "4px",
      height: "96.2px",
      transform: "rotateZ(26.6deg)"
    }
  },
  "35": {
    to: 5,
    style: {
      x: "-86.5px",
      y: "-71.0px",
      width: "4px",
      height: "96.2px",
      transform: "rotateZ(26.6deg)"
    }
  },
  "46": {
    to: 6,
    style: {
      x: "86.5px",
      y: "-71.0px",
      width: "4px",
      height: "96.2px",
      transform: "rotateZ(-26.6deg)"
    }
  },
  "57": {
    to: 7,
    style: {
      x: "-86.5px",
      y: "15.0px",
      width: "4px",
      height: "96.2px",
      transform: "rotateZ(-26.6deg)"
    }
  },
  "68": {
    to: 8,
    style: {
      x: "86.5px",
      y: "15.0px",
      width: "4px",
      height: "96.2px",
      transform: "rotateZ(26.6deg)"
    }
  },
  "79": {
    to: 9,
    style: {
      x: "-86.5px",
      y: "102.0px",
      width: "4px",
      height: "97.9px",
      transform: "rotateZ(26.0deg)"
    }
  },
  "810": {
    to: 10,
    style: {
      x: "86.5px",
      y: "102.0px",
      width: "4px",
      height: "97.9px",
      transform: "rotateZ(-26.0deg)"
    }
  },
  "911": {
    to: 11,
    style: {
      x: "-54.0px",
      y: "178.0px",
      width: "4px",
      height: "125.5px",
      transform: "rotateZ(-59.3deg)"
    }
  },
  "1011": {
    to: 11,
    style: {
      x: "54.0px",
      y: "178.0px",
      width: "4px",
      height: "125.5px",
      transform: "rotateZ(59.3deg)"
    }
  },
  "1112": {
    to: 12,
    style: {
      x: "0.0px",
      y: "285.0px",
      width: "4px",
      height: "150.0px",
      transform: "rotateZ(0.0deg)"
    }
  },
  "1213": {
    to: 13,
    style: {
      x: "66.0px",
      y: "322.5px",
      width: "4px",
      height: "151.8px",
      transform: "rotateZ(60.4deg)"
    }
  }
};
const TALENT_CONFIG = KeyValues.talent ?? {};
const TALENT_EFFECT_CONFIG = KeyValues.talent_effect ?? {};
const CATEGORY_PARTICLE = {
  1: "particles/ui/game/ui_game_potential_compass_red_fx.vpcf",
  2: "particles/ui/game/ui_game_potential_compass_blue_fx.vpcf",
  3: "particles/ui/game/ui_game_potential_compass_green_fx.vpcf"
};
const CATEGORY_PARTICLE_ULT = {
  1: "particles/ui/game/ui_game_potential_compass_red_01_fx.vpcf",
  2: "particles/ui/game/ui_game_potential_compass_blue_01_fx.vpcf",
  3: "particles/ui/game/ui_game_potential_compass_green_01_fx.vpcf"
};
const CATEGORY_LIST = Object.values(TALENT_CONFIG).reduce((categories, talent) => {
  const category = talent.category;
  if (category != null && !categories.includes(category)) {
    categories.push(category);
  }
  return categories;
}, []).sort((a, b) => a - b);
const TALENTS_BY_CATEGORY = Object.entries(TALENT_CONFIG).reduce((result, [talentId, talentCfg]) => {
  const category = talentCfg.category;
  if (category == null) {
    return result;
  }
  if (result[category] == null) {
    result[category] = [];
  }
  result[category].push(talentId);
  return result;
}, {});
const TALENT_EFFECT_BY_TALENT_ID_AND_LEVEL = Object.values(TALENT_EFFECT_CONFIG).reduce((result, effect) => {
  const talentEffect = effect;
  if (result[talentEffect.talent_id] == null) {
    result[talentEffect.talent_id] = {};
  }
  result[talentEffect.talent_id][talentEffect.level] = talentEffect;
  return result;
}, {});
function getTokenAmount(playerTokens, tokenId) {
  return playerTokens[tokenId]?.amounts ?? 0;
}
function hasEnoughTalentCost(playerTokens, effect, savedCost) {
  if (!effect?.talent_cost) {
    return true;
  }
  for (const [tokenId, requiredCost] of Object.entries(effect.talent_cost)) {
    const available = getTokenAmount(playerTokens, tokenId) - (savedCost?.[tokenId] ?? 0);
    if (available < requiredCost) {
      return false;
    }
  }
  return true;
}
function getTalentConfig(talentId) {
  return TALENT_CONFIG[talentId];
}
function getTalentEffect(talentId, level) {
  return TALENT_EFFECT_BY_TALENT_ID_AND_LEVEL[talentId]?.[level];
}
function getTalentIconSrc(talentId, active) {
  return getSrcPath(`t1_talent/icon_talent/${talentId}${active ? "_1" : "_0"}.png`);
}
function TalentCostTokenIDs() {
  if (!KeyValues.talent_effect) {
    return [];
  }
  let cost_tokens = [];
  Object.values(TALENT_EFFECT_CONFIG).forEach(talent => {
    const talentEffect = talent;
    if (talentEffect.talent_cost) {
      Object.keys(talentEffect.talent_cost).forEach(key => {
        let token = toFiniteNumber(key);
        if (token != 0 && !cost_tokens.includes(token)) {
          cost_tokens.push(token);
        }
      });
    }
  });
  return cost_tokens;
}
function checkTalentUnlock(talentConfig, talentId, talentLevels, accountLevel) {
  const cfg = talentConfig[talentId];
  if (!cfg) {
    return false;
  }
  let unlock = cfg.lock == undefined ? true : accountLevel >= cfg.lock;
  for (const requiredId in cfg.requires ?? {}) {
    const requiredLevel = cfg.requires[requiredId];
    if (requiredLevel > service_netdata_helper.getTalentLevel(requiredId, talentLevels)) {
      unlock = false;
      break;
    }
  }
  return unlock;
}
function checkCanAfford(talentId, currentLevel, playerTokens, savedCost) {
  const cfg = getTalentConfig(talentId);
  if (!cfg) return true;
  if (currentLevel >= cfg.max_level) {
    return false;
  }
  const effect = getTalentEffect(talentId, currentLevel);
  return hasEnoughTalentCost(playerTokens, effect, savedCost);
}
function getTalentsByCategory(category, talentLevels, accountLevel, playerTokens, savedCost) {
  if (!KeyValues.talent) {
    return [];
  }
  const normalNodes = [];
  const finalNodes = [];
  const categoryTalents = TALENTS_BY_CATEGORY[category] ?? [];
  for (const key of categoryTalents) {
    const cfg = getTalentConfig(key);
    if (!cfg) continue;
    const level = service_netdata_helper.getTalentLevel(key, talentLevels);
    const unlock = checkTalentUnlock(TALENT_CONFIG, key, talentLevels, accountLevel);
    const canAfford = checkCanAfford(key, level, playerTokens, savedCost);
    const node = {
      id: key,
      level,
      y: cfg.y ?? 1,
      unlock,
      type: cfg.type,
      maxLevel: cfg.max_level,
      canAfford
    };
    if (cfg.type == 4 || cfg.type == 5) {
      finalNodes.push(node);
    } else {
      normalNodes.push(node);
    }
  }
  normalNodes.sort((a, b) => {
    const lockA = getTalentConfig(a.id)?.lock ?? 0;
    const lockB = getTalentConfig(b.id)?.lock ?? 0;
    if (lockA != lockB) return lockA - lockB;
    return a.y - b.y;
  });
  normalNodes.push(...finalNodes.sort((a, b) => a.type - b.type));
  return normalNodes;
}
function getTalentColumnViewData(category, talentLevels, accountLevel, playerTokens, savedCost) {
  const nodes = getTalentsByCategory(category, talentLevels, accountLevel, playerTokens, savedCost);
  const lines = Object.entries(CONNECTION_LINES).map(([key, line]) => ({
    key,
    locked: !nodes[line.to]?.unlock,
    style: line.style
  }));
  return {
    category,
    nodes,
    lines
  };
}
function getTalentLevelsTable(currentLevels, changeId, add) {
  const result = {};
  for (const t in currentLevels) {
    result[t] = toFiniteNumber(currentLevels[t]);
  }
  result[changeId] = toFiniteNumber(result[changeId] ?? 0) + add;
  return result;
}
const talentLevels = service_netdata_helper.useTalentLevels();
const playerAccountLevel = service_netdata_helper.usePlayerAccountLevel();
const player_tokens = solid_utils.createServiceNetData("player_tokens", {});
const savedTalentCost = libs.createMemo(() => {
  const costMap = {};
  const levels = talentLevels();
  for (const talentId in levels) {
    const level = levels[talentId];
    for (let i = 0; i < level; i++) {
      const effect = getTalentEffect(talentId, i);
      if (effect?.talent_cost) {
        for (const [tokenId, cost] of Object.entries(effect.talent_cost)) {
          costMap[tokenId] = (costMap[tokenId] ?? 0) + cost;
        }
      }
    }
  }
  return costMap;
});
const hasUpgradableTalent = libs.createMemo(() => {
  if (!KeyValues.talent) return false;
  const accountLevel = playerAccountLevel().level;
  const levels = talentLevels();
  const tokens = player_tokens();
  const cost = savedTalentCost();
  for (const key in TALENT_CONFIG) {
    const cfg = getTalentConfig(key);
    if (!cfg) continue;
    if (accountLevel < cfg.lock) continue;
    const currentLevel = levels[key] ?? 0;
    if (currentLevel >= cfg.max_level) continue;
    const unlock = checkTalentUnlock(TALENT_CONFIG, key, levels, accountLevel);
    if (!unlock) continue;
    if (checkCanAfford(key, currentLevel, tokens, cost)) {
      return true;
    }
  }
  return false;
});
const TALENT_MATERIAL_TOKEN_IDS = TalentCostTokenIDs().map(String);
const [talentRedPoint, setTalentRedPoint] = libs.createSignal(false);
let talentRedPointInitialized = false;
let previousTalentMaterialAmounts = {};
libs.createEffect(() => {
  const tokens = player_tokens();
  const materialAmounts = {};
  for (const tokenID of TALENT_MATERIAL_TOKEN_IDS) {
    materialAmounts[tokenID] = tokens[tokenID]?.amounts ?? 0;
  }
  const materialChanged = talentRedPointInitialized && TALENT_MATERIAL_TOKEN_IDS.some(tokenID => materialAmounts[tokenID] !== previousTalentMaterialAmounts[tokenID]);
  const canUpgrade = hasUpgradableTalent();
  if (!talentRedPointInitialized || materialChanged) {
    setTalentRedPoint(canUpgrade);
  } else if (!canUpgrade) {
    setTalentRedPoint(false);
  }
  previousTalentMaterialAmounts = materialAmounts;
  talentRedPointInitialized = true;
});
libs.createEffect(libs.on(talentRedPoint, red => {
  CustomUIConfig.SetRedPoint(red, "profile", "Talent_Menu");
}));
function ProfileTab_talent() {
  libs.onMount(() => {
    setTalentRedPoint(false);
  });
  const [showOverviewAttr, setShowOverviewAttr] = libs.createSignal(false);
  const hasAnyTalentPoints = libs.createMemo(() => {
    return Object.values(talentLevels()).some(level => level > 0);
  });
  const handleTalentChange = (talentId, change) => {
    CallActionRequest("/v1/talent/change", {
      "talents": getTalentLevelsTable(talentLevels(), talentId, change)
    }, ret => {});
  };
  const handleResetTalents = () => {
    CustomUIConfig.showPopup("CommonConfirm", {
      text: "#talent_reset",
      title: "#talent_reset_title",
      showCancel: true,
      onconfirm: () => {
        CallActionRequest("/v1/talent/change", {
          "talents": {}
        }, ret => {});
      }
    });
  };
  const columns = libs.createMemo(() => {
    const levels = talentLevels();
    const accountLevel = playerAccountLevel().level;
    const tokens = player_tokens();
    const cost = savedTalentCost();
    return CATEGORY_LIST.map(category => getTalentColumnViewData(category, levels, accountLevel, tokens, cost));
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "TalentRoot",
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
          "class": "ColumnsContainer"
        }, null);
        libs.insert(_el$, libs.createComponent(libs.Index, {
          get each() {
            return columns();
          },
          children: (column, colIdx) => {
            const particleName = () => CATEGORY_PARTICLE[CATEGORY_LIST[colIdx]] ?? CATEGORY_PARTICLE[1];
            const ultParticleName = () => CATEGORY_PARTICLE_ULT[CATEGORY_LIST[colIdx]] ?? CATEGORY_PARTICLE_ULT[1];
            return (() => {
              const _el$0 = libs.createElement("Panel", {
                  width: "fill-parent-flow(0.33)"
                }, null),
                _el$1 = libs.createElement("Panel", {
                  get ["class"]() {
                    return libs.classNames("TalentColumn", "category" + column().category);
                  }
                }, _el$0);
                libs.createElement("Panel", {
                  "class": "TalentColumnBK"
                }, _el$1);
                const _el$11 = libs.createElement("DOTAParticleScenePanel", {
                  id: "TopParticle",
                  get particleName() {
                    return particleName();
                  },
                  cameraOrigin: "0 0 60",
                  fov: 60,
                  lookAt: "0 0 0",
                  hittest: false,
                  squarePixels: true
                }, _el$1);
              libs.setProp(_el$0, "width", "fill-parent-flow(0.33)");
              libs.insert(_el$1, libs.createComponent(libs.Index, {
                get each() {
                  return column().lines;
                },
                children: line => (() => {
                  const _el$12 = libs.createElement("Panel", {
                    get ["class"]() {
                      return libs.classNames("ConnectionLine", {
                        locked: line().locked
                      });
                    },
                    get style() {
                      return line().style;
                    }
                  }, null);
                  libs.effect(_p$ => {
                    const _v$3 = libs.classNames("ConnectionLine", {
                        locked: line().locked
                      }),
                      _v$4 = line().style;
                    _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$12, "class", _v$3, _p$._v$3));
                    _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "style", _v$4, _p$._v$4));
                    return _p$;
                  }, {
                    _v$3: undefined,
                    _v$4: undefined
                  });
                  return _el$12;
                })()
              }), null);
              libs.insert(_el$1, libs.createComponent(libs.Index, {
                get each() {
                  return column().nodes;
                },
                children: (node, idx) => {
                  const pos = TALENT_NODE_POSITIONS[idx];
                  const isActiveIcon = () => node().unlock && node().canAfford || node().level > 0;
                  const showUltFx = () => node().type == 4 && node().unlock;
                  const showLevelBg = () => node().type != 4;
                  return (() => {
                    const _el$13 = libs.createElement("Panel", {
                      "class": "TalentNodeContainer",
                      get style() {
                        return {
                          x: `${pos[0]}px`,
                          y: `${pos[1]}px`
                        };
                      }
                    }, null);
                    libs.insert(_el$13, libs.createComponent(EOM_Button.EOM_BaseButton, {
                      get ["class"]() {
                        return libs.classNames("TalentNode", `type${node().type}`, {
                          "is-locked": !node().unlock,
                          "is-max": node().maxLevel == node().level,
                          "is-zero-level": node().level == 0,
                          "can-afford": node().canAfford
                        });
                      },
                      get customTooltip() {
                        return {
                          name: "talent",
                          talentName: node().id
                        };
                      },
                      onactivate: () => {
                        if (!node().unlock) return;
                        if (node().maxLevel == node().level) return;
                        if (!node().canAfford) {
                          ErrorMessage("#error_token_no_enough");
                          return;
                        }
                        handleTalentChange(node().id, 1);
                      },
                      oncontextmenu: () => {
                        if (node().level <= 0) return;
                        handleTalentChange(node().id, -1);
                      },
                      get children() {
                        return [libs.memo(() => libs.memo(() => !!showLevelBg())() && libs.createElement("Panel", {
                          "class": "TalentNodeLvBg"
                        }, null)), (() => {
                          const _el$14 = libs.createElement("Image", {
                            "class": "TalentNodeBg",
                            get src() {
                              return getTalentIconSrc(node().id, isActiveIcon());
                            }
                          }, null);
                          libs.effect(_$p => libs.setProp(_el$14, "src", getTalentIconSrc(node().id, isActiveIcon()), _$p));
                          return _el$14;
                        })(), libs.createElement("Panel", {
                          "class": "TalentNodeLockTag"
                        }, null), (() => {
                          const _el$16 = libs.createElement("Panel", {
                              "class": "TalentNodeLevel"
                            }, null),
                            _el$17 = libs.createElement("Label", {
                              width: "100%",
                              get text() {
                                return `${node().level}/${node().maxLevel}`;
                              }
                            }, _el$16);
                          libs.setProp(_el$17, "width", "100%");
                          libs.effect(_$p => libs.setProp(_el$17, "text", `${node().level}/${node().maxLevel}`, _$p));
                          return _el$16;
                        })()];
                      }
                    }), null);
                    libs.insert(_el$13, libs.createComponent(libs.Show, {
                      get when() {
                        return showUltFx();
                      },
                      get children() {
                        const _el$18 = libs.createElement("DOTAParticleScenePanel", {
                          "class": "TalentNodeUltFxScene",
                          get particleName() {
                            return ultParticleName();
                          },
                          cameraOrigin: "0 0 80",
                          fov: 60,
                          lookAt: "0 0 0",
                          hittest: false,
                          squarePixels: true
                        }, null);
                        libs.effect(_$p => libs.setProp(_el$18, "particleName", ultParticleName(), _$p));
                        return _el$18;
                      }
                    }), null);
                    libs.effect(_$p => libs.setProp(_el$13, "style", {
                      x: `${pos[0]}px`,
                      y: `${pos[1]}px`
                    }, _$p));
                    return _el$13;
                  })();
                }
              }), null);
              libs.effect(_p$ => {
                const _v$ = libs.classNames("TalentColumn", "category" + column().category),
                  _v$2 = particleName();
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$1, "class", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$11, "particleName", _v$2, _p$._v$2));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined
              });
              return _el$0;
            })();
          }
        }));
        return _el$;
      })(), (() => {
        const _el$2 = libs.createElement("Panel", {
          "class": "BottomButtons",
          align: "right top",
          marginRight: "39px",
          marginTop: "67px",
          flowChildren: "down"
        }, null);
        libs.setProp(_el$2, "align", "right top");
        libs.setProp(_el$2, "marginRight", "39px");
        libs.setProp(_el$2, "marginTop", "67px");
        libs.setProp(_el$2, "flowChildren", "down");
        libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "BottomButton",
          get enabled() {
            return hasAnyTalentPoints();
          },
          onactivate: handleResetTalents,
          get children() {
            return [libs.createElement("Panel", {
              "class": "Button_Icon Button_Refresh"
            }, null), (() => {
              const _el$4 = libs.createElement("Panel", {
                  "class": "Button_Text"
                }, null),
                _el$5 = libs.createElement("Label", {
                  align: "center center",
                  text: "#Button_Reset"
                }, _el$4);
              libs.setProp(_el$5, "align", "center center");
              return _el$4;
            })()];
          }
        }), null);
        libs.insert(_el$2, libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "BottomButton",
          marginTop: "32px",
          onactivate: () => {
            setShowOverviewAttr(!showOverviewAttr());
          },
          get children() {
            return [libs.createElement("Panel", {
              "class": "Button_Icon Button_Overview"
            }, null), (() => {
              const _el$7 = libs.createElement("Panel", {
                  "class": "Button_Text"
                }, null),
                _el$8 = libs.createElement("Label", {
                  align: "center center",
                  text: "#Button_View"
                }, _el$7);
              libs.setProp(_el$8, "align", "center center");
              return _el$7;
            })()];
          }
        }), null);
        return _el$2;
      })(), (() => {
        const _el$9 = libs.createElement("Panel", {
          id: "AttributesSummaryContainer",
          get ["class"]() {
            return libs.classNames({
              Show: showOverviewAttr()
            });
          }
        }, null);
        libs.setProp(_el$9, "onactivate", () => {
          setShowOverviewAttr(false);
        });
        libs.insert(_el$9, libs.createComponent(AttributesSummary, {
          get talentLevels() {
            return talentLevels();
          }
        }));
        libs.effect(_$p => libs.setProp(_el$9, "class", libs.classNames({
          Show: showOverviewAttr()
        }), _$p));
        return _el$9;
      })()];
    }
  });
}
function AttributesSummary(props) {
  const summaryData = libs.createMemo(() => {
    if (!KeyValues.talent_effect) return {
      attrList: [],
      privilegeList: []
    };
    const attributeSet = {};
    const privilegeList = [];
    Object.entries(props.talentLevels).forEach(([name, level]) => {
      const talentCfg = getTalentConfig(name);
      if (!talentCfg) return;
      const talentEffect = getTalentEffect(name, level);
      if (!talentEffect) {
        return;
      }
      if (talentEffect.attribute) {
        Object.entries(talentEffect.attribute).forEach(([attribute, value]) => {
          attributeSet[attribute] = (attributeSet[attribute] ?? 0) + value;
        });
      }
      if (talentEffect.privilege_effect) {
        talentEffect.privilege_effect.split("|").forEach(privilege => {
          const privilegeData = KeyValues.privilege[privilege];
          if (privilegeData) {
            privilegeList.push(getKeyValueDescription(GetLocalization(`#DOTA_Tooltip_ability_${privilege}`, ""), privilegeData.AbilityValues, {
              level,
              onlyShowNowLevel: true
            }));
          }
        });
      }
    });
    const attrList = Object.entries(attributeSet).map(([attribute, value]) => GetPropertyLocalization(attribute, value));
    return {
      attrList,
      privilegeList
    };
  });
  return (() => {
    const _el$20 = libs.createElement("Panel", {
        id: "AttributesSummary"
      }, null);
      libs.createElement("Label", {
        id: "AttributesSummaryTitle",
        text: "#talent_attributes_summary"
      }, _el$20);
      libs.createElement("Panel", {
        id: "TitleLine"
      }, _el$20);
    libs.insert(_el$20, libs.createComponent(libs.For, {
      get each() {
        return summaryData().attrList;
      },
      children: attr => (() => {
        const _el$23 = libs.createElement("Label", {
          "class": "AttributeRow",
          text: attr,
          html: true
        }, null);
        libs.setProp(_el$23, "text", attr);
        return _el$23;
      })()
    }), null);
    libs.insert(_el$20, libs.createComponent(libs.For, {
      get each() {
        return summaryData().privilegeList;
      },
      children: privilege => (() => {
        const _el$24 = libs.createElement("Label", {
          "class": "AttributeRow",
          text: privilege,
          html: true
        }, null);
        libs.setProp(_el$24, "text", privilege);
        return _el$24;
      })()
    }), null);
    return _el$20;
  })();
}
function TalentCurrencyGroup() {
  return (() => {
    const _el$25 = libs.createElement("Panel", {
      "class": "CurrencyGroup CustomCurrencyGroup",
      hittest: false,
      align: "right top"
    }, null);
    libs.setProp(_el$25, "align", "right top");
    libs.insert(_el$25, libs.createComponent(libs.For, {
      get each() {
        return TalentCostTokenIDs();
      },
      children: tokenID => {
        const actualAmount = () => player_tokens()?.[String(tokenID)]?.amounts ?? 0;
        const cost = () => savedTalentCost()[String(tokenID)] ?? 0;
        const displayValue = () => actualAmount() - cost();
        return libs.createComponent(Player.EOM_Currency, {
          titleTooltip: {
            title: "#" + tokenID,
            text: "#" + tokenID + "_description"
          },
          get icon() {
            return getImagePath(`tokens/${tokenID}.png`);
          },
          get value() {
            return displayValue();
          }
        });
      }
    }));
    return _el$25;
  })();
}

const MENU_LIST = {
  Talent_Menu: [],
  Essences_Menu: []
};
const {
  LayoutMenu,
  show,
  menuName
} = EOM_MenuLayout.createMenuLayout("profile", () => MENU_LIST);
const tokenIDs = libs.createMemo(() => {
  if (menuName() == "Essences_Menu") {
    return [1100001, 1100002, 1100003, 1100004, 1100005, 1100006];
  }
  return [];
});
const isTalentTab = libs.createMemo(() => menuName() == "Talent_Menu");
function Profile() {
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "ProfileRoot",
    get ["class"]() {
      return menuName();
    },
    name: "MenuButton_profile",
    renderOnShow: true,
    get show() {
      return show();
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.memo(() => libs.memo(() => !!isTalentTab())() ? libs.createComponent(TalentCurrencyGroup, {}) : libs.createComponent(Player.CurrencyGroup, {
        currencyType: "popup",
        get tokens() {
          return tokenIDs();
        }
      })), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Talent_Menu";
            },
            get children() {
              return libs.createComponent(ProfileTab_talent, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Essences_Menu";
            },
            get children() {
              return libs.createComponent(Essences, {});
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(Profile, {}), $.GetContextPanel());