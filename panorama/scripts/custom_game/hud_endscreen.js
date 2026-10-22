--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var solid_utils = require('./solid_utils.js');
var common_item = require('./common_item.js');
var upgrade_icon = require('./upgrade_icon.js');
var EOM_ImageNumber = require('./EOM_ImageNumber.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var server_rune_utils = require('./server_rune_utils.js');
var rune_data = require('./rune_data.js');
var StoreItem = require('./StoreItem.js');
var server_huntloot = require('./server_huntloot2.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./attribute_formatter.js');
require('./equipment_utils.js');
require('./EOM_Countdown.js');

const localizeAbilityName = name => {
  if (name === undefined || name === "") {
    return GetLocalization("#EndScreen_Unknown");
  }
  const token = `#DOTA_Tooltip_ability_${name}`;
  const localized = GetLocalization(token);
  if (localized !== token) {
    return localized;
  }
  return name.replace(/^item_artifact_/, "").replace(/^item_/, "").replace(/^ability_/, "").replace(/^privilege_/, "").replace(/_/g, " ");
};
const getDamageSourceItemRarity = (abilityName, blessings, artifacts) => {
  for (let i = 0; i < blessings.length; i++) {
    if (blessings[i].name === abilityName) {
      return blessings[i].rarity;
    }
  }
  for (let i = 0; i < artifacts.length; i++) {
    if (artifacts[i].item_name === abilityName) {
      return artifacts[i].level;
    }
  }
  const rarityRange = KeyValues.npc_items_custom[abilityName]?.RarityRange;
  return toFiniteNumber(String(rarityRange).split("|")[0], 1);
};
const getHeroAbilityEntityIndex = (heroIndex, abilityName) => {
  if (heroIndex === undefined || !Entities.IsValidEntity(heroIndex)) {
    return undefined;
  }
  for (let slot = 0; slot < 32; slot++) {
    const abilityIndex = Entities.GetAbility(heroIndex, slot);
    if (abilityIndex && Entities.IsValidEntity(abilityIndex) && Abilities.GetAbilityName(abilityIndex) === abilityName) {
      return abilityIndex;
    }
  }
  return undefined;
};
const getDamageSourceKind = abilityName => {
  if (KeyValues.artifact[abilityName] !== undefined || KeyValues.bless[abilityName] !== undefined) {
    return "item";
  }
  if (KeyValues.hero_abilities[abilityName] !== undefined) {
    return "hero_ability";
  }
  return "unknown";
};
const getDamageSourceTooltip = item => {
  if (item.sourceKind === "item") {
    return {
      name: "artifact",
      itemName: item.abilityName,
      rarity: item.rarity ?? 1
    };
  }
  if (item.sourceKind === "hero_ability") {
    return {
      name: "hero_ability",
      abilityName: item.abilityName,
      entIndex: item.entIndex ?? -1
    };
  }
  return {
    name: "text",
    text: item.name
  };
};
const DamageSourceIcon = props => {
  if (props.item.sourceKind === "item") {
    return libs.createComponent(common_item.CommonItem, {
      "class": "DamageAbilityIcon",
      get itemName() {
        return props.item.abilityName;
      },
      get rarity() {
        return props.item.rarity ?? 1;
      },
      showTips: true
    });
  }
  return (() => {
    const _el$ = libs.createElement("DOTAAbilityImage", {
      "class": "DamageAbilityIcon",
      get abilityname() {
        return props.item.abilityName;
      },
      showtooltip: false
    }, null);
    libs.effect(_p$ => {
      const _v$ = props.item.abilityName,
        _v$2 = getDamageSourceTooltip(props.item);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "abilityname", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "customTooltip", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const formatDuration = totalSeconds => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor(safeSeconds % 3600 / 60);
  const seconds = safeSeconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
const buildDamageSourceItems = (sources, blessings, artifacts, heroIndex) => {
  return sources.map(ability => {
    const sourceKind = getDamageSourceKind(ability.ability_name);
    return {
      abilityName: ability.ability_name,
      name: localizeAbilityName(ability.ability_name),
      value: ability.total_damage,
      ratio: ability.ratio,
      sourceKind,
      rarity: sourceKind === "item" ? getDamageSourceItemRarity(ability.ability_name, blessings, artifacts) : undefined,
      entIndex: sourceKind === "hero_ability" ? getHeroAbilityEntityIndex(heroIndex, ability.ability_name) : undefined
    };
  });
};

var AbyssalBoxType = function (AbyssalBoxType) {
  AbyssalBoxType["RuneBox"] = "RuneBox";
  AbyssalBoxType["EngravingBox"] = "EngravingBox";
  return AbyssalBoxType;
}(AbyssalBoxType || {});
const DEFAULT_HERO_NAME = "npc_dota_hero_vexis";
const ABYSSAL_DAILY_FREE_REWARD_LIMIT = 3;
const RUNE_BAG_MAX_CAPACITY = 400;
const ENGRAVING_BAG_MAX_CAPACITY = 400;
const ABYSSAL_MENU_BAR_HIDE_KEY = "abyssal_endscreen";
const ABYSSAL_CONTENT_ENTER_DELAY = 1.15;
const ABYSSAL_CONTENT_VISIBLE_DELAY = 1.2;
const ABYSSAL_PARTICLE_READY_DELAY = 0.1;
const ABYSSAL_BOX_OPEN_FLASH_PARTICLE = "particles/ui/game/ui_game_box_open_fx.vpcf";
const ABYSSAL_BOX_NORMAL_PARTICLE = "particles/ui/game/ui_game_box_select_fx.vpcf";
const ABYSSAL_BOX_FLOWING_LIGHT_PARTICLE = "particles/ui/game/ui_game_box_flowing_light_effect_fx.vpcf";
const ABYSSAL_REWARD_PREVIEW_REVEAL_INTERVAL = 0.1;
const ABYSSAL_REWARD_BOX_TRANSITION_DURATION = 0.35;
const ABYSSAL_REWARD_CARD_FLASH_PARTICLE = "particles/ui/game/ui_game_fx_chouka_shanguang_01l.vpcf";
const ABYSSAL_REWARD_CARD_PARTICLES = {
  3: "particles/ui/game/ui_game_fx_chouka_pinzhi_lanse_zong.vpcf",
  4: "particles/ui/game/ui_game_fx_chouka_pinzhi_zise_zong.vpcf",
  5: "particles/ui/game/ui_game_fx_chouka_pinzhi_jinse_zong.vpcf",
  6: "particles/ui/game/ui_game_fx_chouka_pinzhi_jinse_zong.vpcf",
  7: "particles/ui/game/ui_game_fx_chouka_pinzhi_jinse_zong.vpcf"
};
const ABYSSAL_BOX_CONFIG = {
  [AbyssalBoxType.RuneBox]: {
    costKey: 110011,
    costAmount: 1,
    freeKey: "daily_free_abyssal_rewards",
    purchaseKey: 800020,
    defaultPosition: "center"
  },
  [AbyssalBoxType.EngravingBox]: {
    costKey: 110011,
    costAmount: 2,
    freeKey: "daily_free_abyssal_engraving_rewards",
    purchaseKey: 800020,
    defaultPosition: "right"
  }
};
const ABYSSAL_BOX_TYPES = Object.keys(ABYSSAL_BOX_CONFIG);
const INITIAL_ABYSSAL_BOX_POSITIONS = ABYSSAL_BOX_TYPES.reduce((positions, boxType) => {
  positions[boxType] = ABYSSAL_BOX_CONFIG[boxType].defaultPosition;
  return positions;
}, {});
const getRewardRuneIconPath = runeItemID => {
  const icon = KeyValues.info_item_rune[runeItemID]?.icon;
  if (icon == undefined) {
    return undefined;
  }
  return `file://{images}/custom_game/store_items/${icon}.png`;
};
const getRewardEngravingIconPath = engravingItemID => {
  const icon = KeyValues.info_item_engraving[engravingItemID]?.icon;
  if (icon == undefined) {
    return undefined;
  }
  return `file://{images}/custom_game/store_items/${icon}.png`;
};
const isRuneReward = reward => "rune_item_id" in reward;
const isRewardBoxVisible = (boxType, difficulty) => {
  switch (boxType) {
    case AbyssalBoxType.RuneBox:
      return KeyValues.rune_drop[String(difficulty)] != undefined;
    case AbyssalBoxType.EngravingBox:
      return KeyValues.engraving_drop[String(difficulty)] != undefined;
  }
};
const showRewardTooltip = (panel, reward) => {
  if (isRuneReward(reward)) {
    server_rune_utils.ShowServerRuneTooltip(panel, {
      id1: reward.id
    });
  } else {
    server_rune_utils.ShowServerEngravingTooltip(panel, {
      id1: reward.id
    });
  }
};
const hideRewardTooltip = (panel, reward) => {
  HideCustomTooltip(panel, isRuneReward(reward) ? "server_rune" : "server_engraving");
};
const getRewardIconPath = reward => isRuneReward(reward) ? getRewardRuneIconPath(reward.rune_item_id) : getRewardEngravingIconPath(reward.engraving_item_id);
const sortRewardsByRarity = rewards => {
  return [...rewards].sort((a, b) => (b.rarity ?? 0) - (a.rarity ?? 0));
};
const SummaryRewardItem = props => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("AbyssalSummaryRewardItem", `Rarity${props.reward.rarity}`);
        },
        get transitionDelay() {
          return props.transitionDelay;
        }
      }, null);
      libs.createElement("Image", {
        "class": "SummaryRewardBG"
      }, _el$);
      const _el$3 = libs.createElement("Image", {
        "class": "RewardRuneIcon",
        get src() {
          return getRewardIconPath(props.reward);
        }
      }, _el$);
    libs.setProp(_el$, "onmouseover", panel => showRewardTooltip(panel, props.reward));
    libs.setProp(_el$, "onmouseout", panel => hideRewardTooltip(panel, props.reward));
    libs.effect(_p$ => {
      const _v$ = libs.classNames("AbyssalSummaryRewardItem", `Rarity${props.reward.rarity}`),
        _v$2 = props.classList,
        _v$3 = props.transitionDelay,
        _v$4 = getRewardIconPath(props.reward);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "classList", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$, "transitionDelay", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$3, "src", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
};
const RewardItemCard = props => {
  const rewardRarity = () => {
    return props.reward.rarity ?? 0;
  };
  const cardFxName = () => ABYSSAL_REWARD_CARD_PARTICLES[rewardRarity()];
  const revealDelay = () => props.index * ABYSSAL_REWARD_PREVIEW_REVEAL_INTERVAL;
  return (() => {
    const _el$4 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("AbyssalRewardItemCard", `Rarity${props.reward.rarity}`);
        },
        get style() {
          return {
            animationDelay: revealDelay() + "s"
          };
        }
      }, null),
      _el$6 = libs.createElement("Image", {
        "class": "RewardItemBG"
      }, _el$4),
      _el$7 = libs.createElement("Image", {
        "class": "RewardRuneIcon",
        get src() {
          return getRewardIconPath(props.reward);
        }
      }, _el$4);
    libs.setProp(_el$4, "onmouseover", panel => showRewardTooltip(panel, props.reward));
    libs.setProp(_el$4, "onmouseout", panel => hideRewardTooltip(panel, props.reward));
    libs.setProp(_el$4, "onload", async panel => {
      await Timer.Wait(revealDelay() + 0.05);
      if (!panel.IsValid()) {
        return;
      }
      const cardFx = panel.FindChildTraverse("CardFx");
      if (cardFx?.IsValid()) {
        cardFx.ReloadScene();
      }
      await Timer.Wait(0.28);
      if (!panel.IsValid()) {
        return;
      }
      const cardFlashFx = panel.FindChildTraverse("CardFlashFx");
      if (cardFlashFx?.IsValid()) {
        cardFlashFx.ReloadScene();
        cardFlashFx.AddClass("FxShow");
      }
    });
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!props.particleReady)() && cardFxName();
      },
      get children() {
        const _el$5 = libs.createElement("DOTAParticleScenePanel", {
          id: "CardFx",
          get particleName() {
            return cardFxName();
          },
          cameraOrigin: "0 0 320",
          lookAt: "0 0 0",
          fov: 90,
          hittest: false
        }, null);
        libs.effect(_$p => libs.setProp(_el$5, "particleName", cardFxName(), _$p));
        return _el$5;
      }
    }), _el$6);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return rewardRarity() >= 4;
      },
      get children() {
        const _el$8 = libs.createElement("DOTAParticleScenePanel", {
          id: "CardFlashFx",
          particleName: ABYSSAL_REWARD_CARD_FLASH_PARTICLE,
          cameraOrigin: "0 0 159",
          lookAt: "0 0 0",
          fov: 90,
          hittest: false
        }, null);
        libs.setProp(_el$8, "particleName", ABYSSAL_REWARD_CARD_FLASH_PARTICLE);
        return _el$8;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = libs.classNames("AbyssalRewardItemCard", `Rarity${props.reward.rarity}`),
        _v$6 = {
          animationDelay: revealDelay() + "s"
        },
        _v$7 = getRewardIconPath(props.reward);
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$4, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$4, "style", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$7, "src", _v$7, _p$._v$7));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined
    });
    return _el$4;
  })();
};
const AbyssalRewardsPreviewPanel = props => {
  return (() => {
    const _el$9 = libs.createElement("Panel", {
        id: "AbyssalRewardsPreviewPanel",
        "class": "AbyssalContentSubPanel",
        hittest: true
      }, null),
      _el$0 = libs.createElement("Panel", {
        id: "RewardsPreviewViewport"
      }, _el$9),
      _el$1 = libs.createElement("Panel", {
        id: "RewardsPreviewList",
        scroll: "y"
      }, _el$0),
      _el$10 = libs.createElement("Panel", {
        id: "RewardsPreviewBottom"
      }, _el$9);
    libs.setProp(_el$1, "scroll", "y");
    libs.insert(_el$1, libs.createComponent(libs.For, {
      get each() {
        return sortRewardsByRarity(props.rewards);
      },
      children: (reward, index) => libs.createComponent(RewardItemCard, {
        reward: reward,
        get index() {
          return index();
        },
        get particleReady() {
          return props.particleReady;
        }
      })
    }));
    libs.insert(_el$10, libs.createComponent(EOM_Button.EOM_Button, {
      id: "RewardsPreviewConfirmButton",
      color: "Confirm",
      get text() {
        return libs.memo(() => !!props.isSummaryWaiting)() ? LocalizeWithVars("#AbyssalEndScreen_RewardsPreviewConfirmWait", {
          coolTime: props.summaryWaitRemaining
        }) : GetLocalization("#AbyssalEndScreen_RewardsPreviewConfirm");
      },
      get onactivate() {
        return props.onClose;
      }
    }));
    return _el$9;
  })();
};
const AbyssalRewardsBoxPanel = props => {
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  let rewardBoxTransitionSchedule;
  const [rewardBoxPositions, setRewardBoxPositions] = libs.createSignal({
    ...INITIAL_ABYSSAL_BOX_POSITIONS
  });
  const [rewardBoxTransitioning, setRewardBoxTransitioning] = libs.createSignal(false);
  const selectedBoxType = libs.createMemo(() => ABYSSAL_BOX_TYPES.find(boxType => rewardBoxPositions()[boxType] == "center"));
  libs.createEffect(() => props.onSelectedBoxTypeChange(selectedBoxType()));
  const selectedClaimState = libs.createMemo(() => props.claimStates[selectedBoxType()]);
  const isAnyRewardBoxOpening = libs.createMemo(() => ABYSSAL_BOX_TYPES.some(boxType => props.claimStates[boxType] == "opening"));
  const selectedBoxConfig = libs.createMemo(() => ABYSSAL_BOX_CONFIG[selectedBoxType()]);
  const usedFreeRewardCount = libs.createMemo(() => playerCounters()?.[selectedBoxConfig().freeKey]?.count ?? 0);
  const remainingFreeRewardCount = libs.createMemo(() => Math.max(0, ABYSSAL_DAILY_FREE_REWARD_LIMIT - usedFreeRewardCount()));
  const isFree = libs.createMemo(() => remainingFreeRewardCount() > 0);
  const abyssalRewardKeyCount = libs.createMemo(() => playerTokens()?.[String(selectedBoxConfig().costKey)]?.amounts ?? 0);
  const abyssalRewardKeyCost = libs.createMemo(() => selectedBoxConfig().costAmount);
  const hasEnoughAbyssalRewardKey = libs.createMemo(() => abyssalRewardKeyCount() >= abyssalRewardKeyCost());
  const needsPurchase = libs.createMemo(() => !isFree() && !hasEnoughAbyssalRewardKey());
  const visibleRewardBoxCount = libs.createMemo(() => ABYSSAL_BOX_TYPES.filter(boxType => isRewardBoxVisible(boxType, props.difficulty)).length);
  const hasMultipleRewardBoxes = libs.createMemo(() => visibleRewardBoxCount() > 1);
  const cancelButtonText = () => {
    if (props.isSummaryWaiting) {
      return LocalizeWithVars(hasMultipleRewardBoxes() ? "#AbyssalEndScreen_RewardsBoxCloseAllWait" : "#AbyssalEndScreen_RewardsBoxCloseWait", {
        coolTime: props.summaryWaitRemaining
      });
    }
    return GetLocalization(hasMultipleRewardBoxes() ? "#AbyssalEndScreen_RewardsBoxCloseAll" : "#AbyssalEndScreen_RewardsBoxClose");
  };
  const clearRewardBoxTransitionSchedule = () => {
    if (rewardBoxTransitionSchedule != undefined) {
      $.CancelScheduled(rewardBoxTransitionSchedule);
      rewardBoxTransitionSchedule = undefined;
    }
  };
  const resetRewardBoxPositions = () => {
    clearRewardBoxTransitionSchedule();
    setRewardBoxTransitioning(false);
    setRewardBoxPositions({
      ...INITIAL_ABYSSAL_BOX_POSITIONS
    });
  };
  const rotateRewardBoxes = selectedPosition => {
    if (selectedPosition == "center" || rewardBoxTransitioning() || isAnyRewardBoxOpening()) {
      return;
    }
    const nextPosition = selectedPosition == "right" ? {
      left: "right",
      center: "left",
      right: "center"
    } : {
      left: "center",
      center: "right",
      right: "left"
    };
    setRewardBoxTransitioning(true);
    setRewardBoxPositions(current => ABYSSAL_BOX_TYPES.reduce((positions, boxType) => {
      positions[boxType] = nextPosition[current[boxType]];
      return positions;
    }, {}));
    rewardBoxTransitionSchedule = $.Schedule(ABYSSAL_REWARD_BOX_TRANSITION_DURATION, () => {
      rewardBoxTransitionSchedule = undefined;
      setRewardBoxTransitioning(false);
    });
  };
  const claimDisabled = () => selectedClaimState() != "idle" || !props.settled;
  const claimButtonText = () => GetLocalization(!props.settled ? "#AbyssalEndScreen_SummaryInSettle" : selectedClaimState() == "received" ? "#AbyssalEndScreen_ClaimButtonReceived" : needsPurchase() ? "#AbyssalEndScreen_ClaimButtonPurchase" : "#AbyssalEndScreen_FreeClaimButton");
  const handleClaimActivate = () => {
    if (claimDisabled()) {
      return;
    }
    if (needsPurchase()) {
      ClientSideEvent("directly_purchase", {
        itemid: selectedBoxConfig().purchaseKey,
        buy_count: 1,
        source: "abyssal_summary"
      });
      return;
    }
    props.onClaim(selectedBoxType());
  };
  libs.createEffect(libs.on(() => props.difficulty, resetRewardBoxPositions, {
    defer: true
  }));
  libs.onCleanup(clearRewardBoxTransitionSchedule);
  return (() => {
    const _el$11 = libs.createElement("Panel", {
        id: "AbyssalRewardsBoxPanel",
        "class": "AbyssalContentSubPanel",
        hittest: true
      }, null),
      _el$12 = libs.createElement("Panel", {
        id: "RewardBoxDisplay"
      }, _el$11),
      _el$14 = libs.createElement("Panel", {
        id: "RewardBoxList"
      }, _el$12),
      _el$15 = libs.createElement("Panel", {
        id: "RewardsOperations"
      }, _el$11),
      _el$16 = libs.createElement("Panel", {
        "class": "RewardsOperationButtonContainer"
      }, _el$15),
      _el$17 = libs.createElement("Panel", {
        "class": "RewardsOperationButtonContainer"
      }, _el$15);
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!props.particleReady)() && hasMultipleRewardBoxes();
      },
      get children() {
        const _el$13 = libs.createElement("DOTAParticleScenePanel", {
          id: "RewardBoxFlowingLightParticle",
          particleName: ABYSSAL_BOX_FLOWING_LIGHT_PARTICLE,
          cameraOrigin: "0 0 320",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, null);
        libs.setProp(_el$13, "particleName", ABYSSAL_BOX_FLOWING_LIGHT_PARTICLE);
        return _el$13;
      }
    }), _el$14);
    libs.insert(_el$14, libs.createComponent(libs.For, {
      each: ABYSSAL_BOX_TYPES,
      children: boxType => {
        const position = () => rewardBoxPositions()[boxType];
        const selected = () => position() == "center";
        const claimState = () => props.claimStates[boxType];
        return libs.createComponent(libs.Show, {
          get when() {
            return isRewardBoxVisible(boxType, props.difficulty);
          },
          get children() {
            const _el$25 = libs.createElement("Panel", {
                get hittest() {
                  return libs.memo(() => !!(!isAnyRewardBoxOpening() && !rewardBoxTransitioning()))() && !selected();
                }
              }, null),
              _el$27 = libs.createElement("Panel", {
                "class": "RewardBoxItemIcon"
              }, _el$25);
            libs.setProp(_el$25, "onactivate", () => rotateRewardBoxes(position()));
            libs.insert(_el$25, libs.createComponent(libs.Show, {
              get when() {
                return libs.memo(() => !!(props.particleReady && selected()))() && claimState() != "received";
              },
              get children() {
                const _el$26 = libs.createElement("DOTAParticleScenePanel", {
                  "class": "RewardBoxNormalParticle",
                  particleName: ABYSSAL_BOX_NORMAL_PARTICLE,
                  cameraOrigin: "0 0 210",
                  fov: 90,
                  lookAt: "0 0 0",
                  hittest: false,
                  squarePixels: true
                }, null);
                libs.setProp(_el$26, "particleName", ABYSSAL_BOX_NORMAL_PARTICLE);
                return _el$26;
              }
            }), _el$27);
            libs.insert(_el$25, libs.createComponent(libs.Show, {
              get when() {
                return selected() && props.claimParticleTrigger > 0;
              },
              get children() {
                return libs.createComponent(solid_utils.DynamicKey, {
                  key: () => props.claimParticleTrigger,
                  children: () => (() => {
                    const _el$28 = libs.createElement("DOTAParticleScenePanel", {
                      "class": "RewardBoxFlashParticle",
                      particleName: ABYSSAL_BOX_OPEN_FLASH_PARTICLE,
                      cameraOrigin: "0 0 420",
                      fov: 90,
                      lookAt: "0 0 0",
                      hittest: false,
                      squarePixels: true
                    }, null);
                    libs.setProp(_el$28, "particleName", ABYSSAL_BOX_OPEN_FLASH_PARTICLE);
                    return _el$28;
                  })()
                });
              }
            }), _el$27);
            libs.effect(_p$ => {
              const _v$0 = {
                  "RewardBoxItem": true,
                  [boxType]: true,
                  "BoxPositionLeft": position() == "left",
                  "BoxPositionCenter": selected(),
                  "BoxPositionRight": position() == "right",
                  "Opening": selected() && claimState() == "opening",
                  "Locked": selected() && claimState() == "idle",
                  "Received": claimState() == "received"
                },
                _v$1 = libs.memo(() => !!(!isAnyRewardBoxOpening() && !rewardBoxTransitioning()))() && !selected();
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$25, "classList", _v$0, _p$._v$0));
              _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$25, "hittest", _v$1, _p$._v$1));
              return _p$;
            }, {
              _v$0: undefined,
              _v$1: undefined
            });
            return _el$25;
          }
        });
      }
    }));
    libs.insert(_el$16, libs.createComponent(EOM_Button.EOM_Button, {
      id: "RewardsCancelButton",
      color: "Cancel",
      get text() {
        return cancelButtonText();
      },
      get onactivate() {
        return props.onCancel;
      }
    }));
    libs.insert(_el$17, libs.createComponent(libs.Show, {
      get when() {
        return !isFree();
      },
      get children() {
        const _el$18 = libs.createElement("Panel", {
            id: "RewardsClaimDesc",
            hittest: false
          }, null);
          libs.createElement("Image", {
            id: "ClaimDescBG",
            hittest: false
          }, _el$18);
          const _el$20 = libs.createElement("Panel", {
            id: "ClaimCostContent"
          }, _el$18),
          _el$21 = libs.createElement("Label", {
            id: "ClaimDescLabel",
            get text() {
              return `x${abyssalRewardKeyCost()} (${abyssalRewardKeyCount()})`;
            }
          }, _el$20);
        libs.insert(_el$20, libs.createComponent(StoreItem.StoreItemImage, {
          get itemid() {
            return selectedBoxConfig().costKey;
          }
        }), _el$21);
        libs.effect(_p$ => {
          const _v$8 = {
              NotEnough: !hasEnoughAbyssalRewardKey()
            },
            _v$9 = `x${abyssalRewardKeyCost()} (${abyssalRewardKeyCount()})`;
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$21, "classList", _v$8, _p$._v$8));
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$21, "text", _v$9, _p$._v$9));
          return _p$;
        }, {
          _v$8: undefined,
          _v$9: undefined
        });
        return _el$18;
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(libs.Show, {
      get when() {
        return isFree();
      },
      get children() {
        const _el$22 = libs.createElement("Panel", {
            id: "RewardsFreeClaimDesc",
            hittest: false
          }, null);
          libs.createElement("Image", {
            id: "FreeClaimDescBG",
            hittest: false
          }, _el$22);
          const _el$24 = libs.createElement("Label", {
            id: "FreeClaimDescLabel",
            get text() {
              return LocalizeWithVars("#AbyssalEndScreen_FreeClaimDesc", {
                fcount: remainingFreeRewardCount()
              });
            }
          }, _el$22);
        libs.effect(_$p => libs.setProp(_el$24, "text", LocalizeWithVars("#AbyssalEndScreen_FreeClaimDesc", {
          fcount: remainingFreeRewardCount()
        }), _$p));
        return _el$22;
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(EOM_Button.EOM_Button, {
      id: "RewardsFreeClaimButton",
      get color() {
        return needsPurchase() ? "Gold" : "Green";
      },
      get enabled() {
        return !claimDisabled();
      },
      get text() {
        return claimButtonText();
      },
      onactivate: handleClaimActivate
    }), null);
    return _el$11;
  })();
};
const AbyssalRewardsPanel = props => {
  const playerRunes = solid_utils.createServiceNetData("player_runes", {});
  const playerEngravings = solid_utils.createServiceNetData("player_engravings", {});
  const [selectedBoxType, setSelectedBoxType] = libs.createSignal(AbyssalBoxType.RuneBox);
  const runeBagCount = libs.createMemo(() => rune_data.buildRuneBagItems(playerRunes()).length);
  const engravingBagCount = libs.createMemo(() => server_rune_utils.buildEngravingBagItems(playerEngravings()).length);
  const selectedBagType = libs.createMemo(() => selectedBoxType() == AbyssalBoxType.RuneBox ? "rune" : "engraving");
  const selectedBagCount = libs.createMemo(() => selectedBoxType() == AbyssalBoxType.RuneBox ? runeBagCount() : engravingBagCount());
  const selectedBagCapacity = libs.createMemo(() => selectedBoxType() == AbyssalBoxType.RuneBox ? RUNE_BAG_MAX_CAPACITY : ENGRAVING_BAG_MAX_CAPACITY);
  const breakButtonText = libs.createMemo(() => GetLocalization(selectedBoxType() == AbyssalBoxType.RuneBox ? "#AbyssalEndScreen_RuneBreakPreview" : "#AbyssalEndScreen_EngravingBreakPreview"));
  return (() => {
    const _el$29 = libs.createElement("Panel", {
        id: "AbyssalRewardsPanel",
        "class": "AbyssalContentPanel"
      }, null),
      _el$31 = libs.createElement("Panel", {
        id: "RewardsHeaderContainer"
      }, _el$29),
      _el$32 = libs.createElement("Panel", {
        id: "RewardsHeader"
      }, _el$31),
      _el$33 = libs.createElement("Label", {
        id: "RewardsHeaderText",
        get text() {
          return LocalizeWithVars("#AbyssalEndScreen_RewardsTitle", {
            diff: props.difficulty
          });
        }
      }, _el$32),
      _el$34 = libs.createElement("Panel", {
        id: "RewardsHeaderInfoIcon",
        "class": "ToolTipInfo"
      }, _el$32);
      libs.createElement("Image", {
        id: "RewardsDivider",
        hittest: false
      }, _el$31);
      const _el$36 = libs.createElement("Panel", {
        id: "RewardsScoreContainer"
      }, _el$31);
      libs.createElement("Label", {
        id: "RewardsScoreTitleText",
        text: "#AbyssalEndScreen_CurrentScore"
      }, _el$36);
      const _el$38 = libs.createElement("Label", {
        id: "RewardsScoreValue",
        get text() {
          return props.score;
        }
      }, _el$36);
    libs.insert(_el$29, libs.createComponent(libs.Show, {
      get when() {
        return props.particleReady;
      },
      get children() {
        return libs.createElement("DOTAParticleScenePanel", {
          id: "BottomParticle",
          particleName: "particles/ui/game/ui_game_general_special_effects_05_1_fx.vpcf",
          cameraOrigin: "0 0 800",
          fov: 90,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, null);
      }
    }), _el$31);
    libs.setProp(_el$34, "tooltip_text", "#AbyssalEndScreen_RewardsInfoIconTooltip");
    libs.insert(_el$29, libs.createComponent(libs.Show, {
      get when() {
        return props.view == "preview";
      },
      get children() {
        return libs.createComponent(AbyssalRewardsPreviewPanel, {
          get rewards() {
            return props.rewards;
          },
          get particleReady() {
            return props.particleReady;
          },
          get isSummaryWaiting() {
            return props.isSummaryWaiting;
          },
          get summaryWaitRemaining() {
            return props.summaryWaitRemaining;
          },
          get onClose() {
            return props.onPreviewClose;
          }
        });
      }
    }), null);
    libs.insert(_el$29, libs.createComponent(libs.Show, {
      get when() {
        return props.view == "rewards";
      },
      get children() {
        return libs.createComponent(AbyssalRewardsBoxPanel, {
          get difficulty() {
            return props.difficulty;
          },
          get claimStates() {
            return props.claimStates;
          },
          get claimParticleTrigger() {
            return props.claimParticleTrigger;
          },
          get particleReady() {
            return props.particleReady;
          },
          get settled() {
            return props.settled;
          },
          get isSummaryWaiting() {
            return props.isSummaryWaiting;
          },
          get summaryWaitRemaining() {
            return props.summaryWaitRemaining;
          },
          get onCancel() {
            return props.onCancel;
          },
          get onClaim() {
            return props.onClaim;
          },
          onSelectedBoxTypeChange: setSelectedBoxType
        });
      }
    }), null);
    libs.insert(_el$29, libs.createComponent(libs.Show, {
      get when() {
        return props.view == "rewards";
      },
      get children() {
        const _el$39 = libs.createElement("Panel", {
            "class": "BagPreviewContent"
          }, null),
          _el$40 = libs.createElement("Panel", {
            "class": "BagPreviewCapacity"
          }, _el$39);
          libs.createElement("Image", {
            "class": "BagPreviewCapacityBG",
            hittest: false
          }, _el$40);
          const _el$42 = libs.createElement("Panel", {
            "class": "BagPreviewCapacityContent"
          }, _el$40);
          libs.createElement("Image", {
            id: "RuneBreakQuickEntryIcon",
            hittest: false
          }, _el$42);
          const _el$44 = libs.createElement("Label", {
            "class": "BagPreviewCapacityText",
            get text() {
              return `${selectedBagCount()}/${selectedBagCapacity()}`;
            },
            hittest: false
          }, _el$42),
          _el$45 = libs.createElement("Button", {
            id: "RuneBreakQuickEntryButton",
            "class": "SecondaryButtonStates"
          }, _el$39),
          _el$46 = libs.createElement("Panel", {
            id: "RuneBreakQuickEntryContent",
            hittest: false
          }, _el$45),
          _el$47 = libs.createElement("Label", {
            get text() {
              return breakButtonText();
            },
            hittest: false
          }, _el$46);
        libs.setProp(_el$45, "onactivate", () => {
          JumpToMenu({
            window_name: "rune",
            menu: "RuneBreak_Menu",
            force: true,
            data: {
              bagType: selectedBagType()
            }
          });
        });
        libs.effect(_p$ => {
          const _v$10 = `${selectedBagCount()}/${selectedBagCapacity()}`,
            _v$11 = breakButtonText();
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$44, "text", _v$10, _p$._v$10));
          _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$47, "text", _v$11, _p$._v$11));
          return _p$;
        }, {
          _v$10: undefined,
          _v$11: undefined
        });
        return _el$39;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$12 = LocalizeWithVars("#AbyssalEndScreen_RewardsTitle", {
          diff: props.difficulty
        }),
        _v$13 = props.score;
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$33, "text", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$38, "text", _v$13, _p$._v$13));
      return _p$;
    }, {
      _v$12: undefined,
      _v$13: undefined
    });
    return _el$29;
  })();
};
const AbyssalSummary = props => {
  const lastEndScreenMeta = solid_utils.createNetDataSignal("common", "last_end_screen_meta");
  const lastEndScreenMvp = solid_utils.createNetDataSignal("common", "last_end_screen_mvp");
  const settle_info = solid_utils.createNetDataSignal("common", "settle_info", {
    end_time: -1,
    show_menu_bar: false,
    end_by_custom: false
  });
  const [countDown, setCountDown] = libs.createSignal(0);
  let countDownTimer;
  let hasHandledCountDownElapsed = false;
  const localHeroSelection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const lastAbyssalSummary = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_end_summary");
  const lastAbyssalBattle = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_end_battle");
  const lastAbyssalBuild = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_end_build");
  const lastAbyssalRewardOverview = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_reward_overview");
  const snapshotID = libs.createMemo(() => lastEndScreenMeta()?.mode == "abyssal" ? lastEndScreenMeta()?.snapshot_id : undefined);
  const isCurrentSnapshot = data => snapshotID() != undefined && data?.snapshot_id == snapshotID();
  const activeSummary = libs.createMemo(() => {
    const snapshot = lastAbyssalSummary();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeBattle = libs.createMemo(() => {
    const snapshot = lastAbyssalBattle();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeBuild = libs.createMemo(() => {
    const snapshot = lastAbyssalBuild();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeRewards = libs.createMemo(() => {
    const snapshot = lastAbyssalRewardOverview();
    if (isCurrentSnapshot(snapshot)) {
      return [...(snapshot?.rewards_by_box.RuneBox ?? []), ...(snapshot?.rewards_by_box.EngravingBox ?? [])];
    }
    return [];
  });
  const activeMvpSummary = libs.createMemo(() => {
    const snapshot = lastEndScreenMvp();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const mvpPlayerID = libs.createMemo(() => activeMvpSummary()?.player_id);
  const mvpSteamID = libs.createMemo(() => {
    const playerID = mvpPlayerID();
    if (playerID === undefined) {
      return Game.GetPlayerInfo(Players.GetLocalPlayer())?.player_steamid ?? "-1";
    }
    return Game.GetPlayerInfo(playerID)?.player_steamid ?? "-1";
  });
  const heroName = libs.createMemo(() => activeMvpSummary()?.hero_name ?? DEFAULT_HERO_NAME);
  const blessingList = libs.createMemo(() => activeBuild()?.blessings ?? []);
  const artifactList = libs.createMemo(() => activeBuild()?.artifacts ?? []);
  const abilityUpgradeList = libs.createMemo(() => activeBuild()?.ability_upgrades ?? []);
  const aliveTime = libs.createMemo(() => formatDuration(activeSummary()?.alive_time ?? 0));
  const summaryDifficulty = libs.createMemo(() => activeSummary()?.difficulty ?? 0);
  const summaryScore = libs.createMemo(() => `${activeSummary()?.score ?? 0}`);
  const stageProgressMetrics = libs.createMemo(() => {
    const summary = activeSummary();
    return [{
      label: "#EndScreen_ClearTime",
      value: aliveTime()
    }, {
      label: "#EndScreen_Difficulty",
      value: `${summary?.difficulty ?? 0}`
    }, {
      label: "#EndScreen_Score",
      value: `${summary?.score ?? 0}`
    }, {
      label: "#EndScreen_KillCount",
      value: `${summary?.kill_count ?? 0}`
    }];
  });
  const battleMetrics = libs.createMemo(() => {
    const summary = activeSummary();
    return [{
      label: "#EndScreen_MaxMultiplier",
      value: `${(summary?.combo_multiplier_max ?? 0).toFixed(1)}`
    }, {
      label: "#EndScreen_KillCount",
      value: `${summary?.kill_count ?? 0}`
    }];
  });
  const skillDamageTotal = libs.createMemo(() => activeBattle()?.skill_damage_total ?? 0);
  const isCountDownActive = libs.createMemo(() => settle_info().end_by_custom !== true && countDown() > 0);
  const damageSources = libs.createMemo(() => {
    const sources = activeBattle()?.ability_damage_sources ?? [];
    const blessings = blessingList();
    const artifacts = artifactList();
    const heroIndex = localHeroSelection()?.heroIndex;
    return buildDamageSourceItems(sources, blessings, artifacts, heroIndex);
  });
  libs.createEffect(libs.on(() => settle_info().end_time, endTime => {
    if (countDownTimer != undefined) {
      clearInterval(countDownTimer);
      countDownTimer = undefined;
    }
    hasHandledCountDownElapsed = false;
    if (endTime == undefined || endTime < 0) {
      setCountDown(0);
      return;
    }
    console.log(`[AbyssalSummary] settlement countdown endTime=${endTime} endByCustom=${String(settle_info().end_by_custom)}`);
    const updateCountDown = () => {
      const remaining = Math.max(0, Math.ceil(endTime - Game.GetGameTime()));
      setCountDown(remaining);
      if (remaining <= 0 && countDownTimer != undefined) {
        clearInterval(countDownTimer);
        countDownTimer = undefined;
      }
      if (remaining <= 0 && !hasHandledCountDownElapsed) {
        hasHandledCountDownElapsed = true;
        if (settle_info().end_by_custom === true) {
          console.log("[AbyssalSummary] settlement countdown elapsed; custom settlement flow keeps the end screen open.");
          return;
        }
        console.log("[AbyssalSummary] settlement countdown elapsed; closing end screen.");
        props.onCountdownElapsed();
      }
    };
    updateCountDown();
    if (endTime - Game.GetGameTime() > 0) {
      countDownTimer = setInterval(updateCountDown, 1000);
    }
  }));
  libs.onCleanup(() => {
    if (countDownTimer != undefined) {
      clearInterval(countDownTimer);
      countDownTimer = undefined;
    }
  });
  return (() => {
    const _el$48 = libs.createElement("Panel", {
        id: "AbyssalSummaryStage"
      }, null),
      _el$49 = libs.createElement("Panel", {
        id: "Certificate"
      }, _el$48),
      _el$50 = libs.createElement("Panel", {
        id: "Header"
      }, _el$49),
      _el$51 = libs.createElement("Panel", {
        id: "SummaryHeaderContainer"
      }, _el$50),
      _el$52 = libs.createElement("Panel", {
        id: "SummaryHeader"
      }, _el$51),
      _el$53 = libs.createElement("Label", {
        id: "SummaryHeaderText",
        get text() {
          return LocalizeWithVars("#AbyssalEndScreen_RewardsTitle", {
            diff: summaryDifficulty()
          });
        }
      }, _el$52),
      _el$54 = libs.createElement("Panel", {
        id: "SummaryHeaderInfoIcon",
        "class": "ToolTipInfo"
      }, _el$52);
      libs.createElement("Image", {
        id: "SummaryDivider",
        hittest: false
      }, _el$51);
      const _el$56 = libs.createElement("Panel", {
        id: "SummaryScoreContainer"
      }, _el$51);
      libs.createElement("Label", {
        id: "SummaryScoreTitleText",
        text: "#AbyssalEndScreen_CurrentScore"
      }, _el$56);
      const _el$58 = libs.createElement("Label", {
        id: "SummaryScoreValue",
        get text() {
          return summaryScore();
        }
      }, _el$56),
      _el$59 = libs.createElement("Panel", {
        id: "HalfHero"
      }, _el$49),
      _el$60 = libs.createElement("Panel", {
        id: "MvpInfo"
      }, _el$59),
      _el$61 = libs.createElement("Panel", {
        "class": "Mvp"
      }, _el$60);
      libs.createElement("Image", {}, _el$61);
      const _el$63 = libs.createElement("Panel", {
        "class": "PlayerInfo"
      }, _el$60),
      _el$64 = libs.createElement("Panel", {
        "class": "NamePanel"
      }, _el$63),
      _el$65 = libs.createElement("Panel", {
        "class": "PlayerAvatar"
      }, _el$63);
      libs.createElement("Panel", {
        "class": "CustomBorder"
      }, _el$65);
      const _el$67 = libs.createElement("DOTAAvatarImage", {
        get steamid() {
          return mvpSteamID();
        },
        align: "center center",
        width: "71%",
        height: "71%",
        hittest: false
      }, _el$65),
      _el$68 = libs.createElement("Panel", {
        id: "CertificateBody"
      }, _el$49),
      _el$69 = libs.createElement("Panel", {
        id: "InfoColumn"
      }, _el$68),
      _el$70 = libs.createElement("Panel", {
        "class": "DataSection Bless"
      }, _el$69),
      _el$71 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$70);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$71);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_Blessing"
      }, _el$71);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$71);
      const _el$75 = libs.createElement("Panel", {
        "class": "BadgeList BlessingList",
        scroll: "y"
      }, _el$70),
      _el$76 = libs.createElement("Panel", {
        "class": "DataSection Artifact"
      }, _el$69),
      _el$77 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$76);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$77);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_Artifact"
      }, _el$77);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$77);
      const _el$81 = libs.createElement("Panel", {
        "class": "BadgeList ArtifactList",
        scroll: "x"
      }, _el$76),
      _el$82 = libs.createElement("Panel", {
        "class": "DataSection Upgrade"
      }, _el$69),
      _el$83 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$82);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$83);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_AbilityUpgrade"
      }, _el$83);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$83);
      const _el$87 = libs.createElement("Panel", {
        "class": "BadgeList UpgradeList",
        scroll: "x"
      }, _el$82),
      _el$88 = libs.createElement("Panel", {
        id: "RewardList"
      }, _el$69),
      _el$89 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$88);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$89);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_Loot"
      }, _el$89);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$89);
      const _el$93 = libs.createElement("Panel", {
        id: "RewardItemList",
        scroll: "y"
      }, _el$88),
      _el$94 = libs.createElement("Panel", {
        id: "SummaryColumn"
      }, _el$68),
      _el$95 = libs.createElement("Panel", {
        "class": "SideSection ProgressSection"
      }, _el$94),
      _el$96 = libs.createElement("Panel", {
        "class": "SideTitleRow"
      }, _el$95),
      _el$97 = libs.createElement("Label", {
        "class": "SideTitle",
        horizontalAlign: "center",
        text: "#EndScreen_StageProgress"
      }, _el$96),
      _el$98 = libs.createElement("Panel", {
        "class": "MetricsGrid"
      }, _el$94),
      _el$99 = libs.createElement("Panel", {
        "class": "SideSection DamageSection"
      }, _el$94),
      _el$100 = libs.createElement("Panel", {
        "class": "DamageHeaderRow"
      }, _el$99);
      libs.createElement("Label", {
        "class": "SideTitle DamageTitle",
        text: "#EndScreen_DamageSource"
      }, _el$100);
      const _el$102 = libs.createElement("Label", {
        "class": "DamageTotal",
        get text() {
          return FormatNumber(skillDamageTotal());
        }
      }, _el$100),
      _el$103 = libs.createElement("Panel", {
        "class": "DamageRowList",
        scroll: "y"
      }, _el$99),
      _el$104 = libs.createElement("Label", {
        id: "SummaryWaitTips",
        get text() {
          return LocalizeWithVars("#AbyssalEndScreen_SummaryWaitTips", {
            coolTime: props.summaryWaitRemaining
          });
        }
      }, _el$48);
    libs.setProp(_el$54, "tooltip_text", "#AbyssalEndScreen_RewardsInfoIconTooltip");
    libs.insert(_el$59, libs.createComponent(solid_utils.DynamicKey, {
      key: heroName,
      children: heroname => libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
        unit: heroname,
        camera: "endscreen"
      })
    }), _el$60);
    libs.insert(_el$64, libs.createComponent(Player.PlayerName, {
      get steamid() {
        return mvpSteamID();
      },
      showgGild: false
    }));
    libs.setProp(_el$67, "style", {
      borderRadius: "50%"
    });
    libs.setProp(_el$67, "align", "center center");
    libs.setProp(_el$67, "width", "71%");
    libs.setProp(_el$67, "height", "71%");
    libs.setProp(_el$75, "scroll", "y");
    libs.insert(_el$75, libs.createComponent(libs.For, {
      get each() {
        return blessingList();
      },
      children: (item, index) => libs.createComponent(common_item.CommonItem, {
        showTips: true,
        get itemName() {
          return item.name;
        },
        get rarity() {
          return item.rarity;
        },
        get transitionDelay() {
          return 0.1 + index() * 0.3 + "s";
        },
        get classList() {
          return {
            Show: props.showItems
          };
        }
      })
    }));
    libs.setProp(_el$81, "scroll", "x");
    libs.insert(_el$81, libs.createComponent(libs.For, {
      get each() {
        return artifactList();
      },
      children: (item, index) => libs.createComponent(common_item.CommonItem, {
        showTips: true,
        get itemName() {
          return item.item_name;
        },
        get transitionDelay() {
          return 0.2 + index() * 0.3 + "s";
        },
        get classList() {
          return {
            Show: props.showItems
          };
        }
      })
    }));
    libs.setProp(_el$87, "scroll", "x");
    libs.insert(_el$87, libs.createComponent(libs.For, {
      get each() {
        return abilityUpgradeList();
      },
      children: (item, index) => libs.createComponent(upgrade_icon.UpgradeIcon, {
        showTips: true,
        get upgradeID() {
          return item.name;
        },
        get transitionDelay() {
          return 0.3 + index() * 0.3 + "s";
        },
        get classList() {
          return {
            Show: props.showItems
          };
        }
      })
    }));
    libs.setProp(_el$93, "scroll", "y");
    libs.insert(_el$93, libs.createComponent(libs.For, {
      get each() {
        return sortRewardsByRarity(activeRewards());
      },
      children: (data, index) => (() => {
        const _el$105 = libs.createElement("Panel", {
          "class": "RewardCard"
        }, null);
        libs.insert(_el$105, libs.createComponent(SummaryRewardItem, {
          reward: data,
          get transitionDelay() {
            return 0.5 + index() * 0.3 + "s";
          },
          get classList() {
            return {
              Show: props.showItems
            };
          }
        }));
        return _el$105;
      })()
    }));
    libs.setProp(_el$97, "horizontalAlign", "center");
    libs.insert(_el$95, libs.createComponent(libs.For, {
      get each() {
        return stageProgressMetrics();
      },
      children: (metric, idx) => [libs.createElement("Panel", {
        "class": "StatLine"
      }, null), (() => {
        const _el$107 = libs.createElement("Panel", {
            "class": "StatRow ProgressRow"
          }, null),
          _el$108 = libs.createElement("Panel", {
            verticalAlign: "center",
            flowChildren: "right"
          }, _el$107),
          _el$109 = libs.createElement("Image", {
            get ["class"]() {
              return "StatRowImg img" + idx();
            }
          }, _el$108),
          _el$110 = libs.createElement("Label", {
            "class": "StatLabel",
            get text() {
              return metric.label;
            },
            get vars() {
              return metric.vars;
            }
          }, _el$108),
          _el$111 = libs.createElement("Label", {
            "class": `StatValue`,
            get text() {
              return metric.value;
            },
            get vars() {
              return metric.vars;
            }
          }, _el$107);
        libs.setProp(_el$108, "verticalAlign", "center");
        libs.setProp(_el$108, "flowChildren", "right");
        libs.setProp(_el$111, "class", `StatValue`);
        libs.effect(_p$ => {
          const _v$20 = "StatRowImg img" + idx(),
            _v$21 = metric.label,
            _v$22 = metric.vars,
            _v$23 = metric.value,
            _v$24 = metric.vars;
          _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$109, "class", _v$20, _p$._v$20));
          _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$110, "text", _v$21, _p$._v$21));
          _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$110, "vars", _v$22, _p$._v$22));
          _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$111, "text", _v$23, _p$._v$23));
          _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$111, "vars", _v$24, _p$._v$24));
          return _p$;
        }, {
          _v$20: undefined,
          _v$21: undefined,
          _v$22: undefined,
          _v$23: undefined,
          _v$24: undefined
        });
        return _el$107;
      })()]
    }), null);
    libs.insert(_el$98, libs.createComponent(libs.For, {
      get each() {
        return battleMetrics();
      },
      children: (metric, idx) => [(() => {
        const _el$112 = libs.createElement("Panel", {
            "class": `MetricCard`
          }, null),
          _el$113 = libs.createElement("Label", {
            "class": "MetricLabel",
            get text() {
              return metric.label;
            }
          }, _el$112),
          _el$114 = libs.createElement("Label", {
            "class": "MetricValue",
            get text() {
              return metric.value;
            }
          }, _el$112);
        libs.setProp(_el$112, "class", `MetricCard`);
        libs.effect(_p$ => {
          const _v$25 = metric.label,
            _v$26 = metric.value;
          _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$113, "text", _v$25, _p$._v$25));
          _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$114, "text", _v$26, _p$._v$26));
          return _p$;
        }, {
          _v$25: undefined,
          _v$26: undefined
        });
        return _el$112;
      })(), (() => {
        const _el$115 = libs.createElement("Panel", {
          "class": "MetricsLine"
        }, null);
        libs.effect(_$p => libs.setProp(_el$115, "visible", idx() != battleMetrics().length - 1, _$p));
        return _el$115;
      })()]
    }));
    libs.setProp(_el$103, "scroll", "y");
    libs.insert(_el$103, libs.createComponent(libs.For, {
      get each() {
        return damageSources();
      },
      children: item => (() => {
        const _el$116 = libs.createElement("Panel", {
            "class": "DamageRow"
          }, null),
          _el$117 = libs.createElement("Panel", {
            "class": "DamageBarTrack"
          }, _el$116),
          _el$118 = libs.createElement("Panel", {
            "class": "DamageBarFill",
            get style() {
              return {
                width: item.ratio > 0 ? `${Math.max(8, Math.round(item.ratio * 100))}%` : "0%"
              };
            }
          }, _el$117),
          _el$119 = libs.createElement("Label", {
            "class": "DamageAmount",
            get text() {
              return FormatNumber(item.value);
            }
          }, _el$116);
        libs.insert(_el$116, libs.createComponent(DamageSourceIcon, {
          item: item
        }), _el$117);
        libs.effect(_p$ => {
          const _v$27 = {
              width: item.ratio > 0 ? `${Math.max(8, Math.round(item.ratio * 100))}%` : "0%"
            },
            _v$28 = FormatNumber(item.value);
          _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$118, "style", _v$27, _p$._v$27));
          _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$119, "text", _v$28, _p$._v$28));
          return _p$;
        }, {
          _v$27: undefined,
          _v$28: undefined
        });
        return _el$116;
      })()
    }));
    libs.insert(_el$48, libs.createComponent(EOM_ImageNumber.EOM_ImageNumber, {
      id: "CountDown",
      get visible() {
        return isCountDownActive();
      },
      type: "5",
      get value() {
        return countDown();
      }
    }), null);
    libs.effect(_p$ => {
      const _v$14 = LocalizeWithVars("#AbyssalEndScreen_RewardsTitle", {
          diff: summaryDifficulty()
        }),
        _v$15 = summaryScore(),
        _v$16 = mvpSteamID(),
        _v$17 = FormatNumber(skillDamageTotal()),
        _v$18 = props.isSummaryWaiting && props.summaryWaitRemaining > 0,
        _v$19 = LocalizeWithVars("#AbyssalEndScreen_SummaryWaitTips", {
          coolTime: props.summaryWaitRemaining
        });
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$53, "text", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$58, "text", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$67, "steamid", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$102, "text", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$104, "visible", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$104, "text", _v$19, _p$._v$19));
      return _p$;
    }, {
      _v$14: undefined,
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined,
      _v$18: undefined,
      _v$19: undefined
    });
    return _el$48;
  })();
};
const Abyssal = props => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const lastEndScreenMeta = solid_utils.createNetDataSignal("common", "last_end_screen_meta");
  const abyssalSettleInfo = solid_utils.createNetDataSignal("common", "abyssal_settle_info");
  const lastAbyssalSummary = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_end_summary");
  const lastAbyssalRewardPreview = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_reward_preview");
  const lastAbyssalRewardOverview = solid_utils.createPlayerNetDataSignal("player_data", "last_abyssal_reward_overview");
  const [view, setView] = libs.createSignal("rewards");
  const [activeClaimBoxType, setActiveClaimBoxType] = libs.createSignal();
  const [claimParticleTrigger, setClaimParticleTrigger] = libs.createSignal(0);
  const [contentStage, setContentStage] = libs.createSignal();
  const [particleReady, setParticleReady] = libs.createSignal(false);
  const [summaryWaitRemaining, setSummaryWaitRemaining] = libs.createSignal(0);
  let receivedTimer;
  let previewTimer;
  let summaryWaitTimer;
  let contentEnteringSchedule;
  let contentVisibleSchedule;
  let particleReadySchedule;
  let cancelRewardConfirmPopupID;
  let handledPreviewRevision = 0;
  let hasLoggedSummaryWaitElapsed = false;
  const snapshotID = libs.createMemo(() => lastEndScreenMeta()?.mode == "abyssal" ? lastEndScreenMeta()?.snapshot_id : undefined);
  const isAbyssalDefeat = libs.createMemo(() => lastEndScreenMeta()?.result != "victory");
  const isAbyssalSettling = libs.createMemo(() => gameState()?.state == "GameState_Settle" && lastEndScreenMeta()?.mode == "abyssal");
  const activeAbyssalSettleInfo = libs.createMemo(() => {
    const info = abyssalSettleInfo();
    return snapshotID() != undefined && info?.snapshot_id == snapshotID() ? info : undefined;
  });
  const isSummaryWaiting = libs.createMemo(() => activeAbyssalSettleInfo()?.state == "waiting_participants");
  const activeSummary = libs.createMemo(() => {
    const snapshot = lastAbyssalSummary();
    return snapshotID() != undefined && snapshot?.snapshot_id == snapshotID() ? snapshot : undefined;
  });
  const isAbyssalSettled = libs.createMemo(() => activeSummary()?.settled === true);
  const activeRewardPreview = libs.createMemo(() => {
    const snapshot = lastAbyssalRewardPreview();
    return snapshotID() != undefined && snapshot?.snapshot_id == snapshotID() ? snapshot : undefined;
  });
  const activeRewardOverview = libs.createMemo(() => {
    const snapshot = lastAbyssalRewardOverview();
    return snapshotID() != undefined && snapshot?.snapshot_id == snapshotID() ? snapshot : undefined;
  });
  const receivedBoxTypes = libs.createMemo(() => activeRewardOverview()?.received_box_types ?? []);
  const isBoxReceived = boxType => receivedBoxTypes().includes(boxType);
  const claimStates = libs.createMemo(() => ({
    [AbyssalBoxType.RuneBox]: activeClaimBoxType() == AbyssalBoxType.RuneBox ? "opening" : isBoxReceived(AbyssalBoxType.RuneBox) ? "received" : "idle",
    [AbyssalBoxType.EngravingBox]: activeClaimBoxType() == AbyssalBoxType.EngravingBox ? "opening" : isBoxReceived(AbyssalBoxType.EngravingBox) ? "received" : "idle"
  }));
  const visibleBoxTypes = libs.createMemo(() => ABYSSAL_BOX_TYPES.filter(boxType => isRewardBoxVisible(boxType, activeSummary()?.difficulty ?? 0)));
  const hasUnreceivedVisibleBox = libs.createMemo(() => visibleBoxTypes().some(boxType => !isBoxReceived(boxType)));
  const previewRewards = libs.createMemo(() => {
    return activeRewardPreview()?.rewards ?? [];
  });
  const clearPreviewTimer = () => {
    if (previewTimer != undefined) {
      $.CancelScheduled(previewTimer);
      previewTimer = undefined;
    }
  };
  const clearReceivedTimer = () => {
    if (receivedTimer != undefined) {
      $.CancelScheduled(receivedTimer);
      receivedTimer = undefined;
    }
  };
  const clearClaimRevealTimers = () => {
    clearReceivedTimer();
    clearPreviewTimer();
  };
  const clearSummaryWaitTimer = () => {
    if (summaryWaitTimer != undefined) {
      clearInterval(summaryWaitTimer);
      summaryWaitTimer = undefined;
    }
  };
  const clearContentStageTimers = () => {
    if (contentEnteringSchedule != undefined) {
      $.CancelScheduled(contentEnteringSchedule);
      contentEnteringSchedule = undefined;
    }
    if (contentVisibleSchedule != undefined) {
      $.CancelScheduled(contentVisibleSchedule);
      contentVisibleSchedule = undefined;
    }
  };
  const clearParticleReadySchedule = () => {
    if (particleReadySchedule != undefined) {
      $.CancelScheduled(particleReadySchedule);
      particleReadySchedule = undefined;
    }
  };
  const replayContentStage = () => {
    clearContentStageTimers();
    clearParticleReadySchedule();
    setParticleReady(false);
    setContentStage(undefined);
    contentEnteringSchedule = $.Schedule(ABYSSAL_CONTENT_ENTER_DELAY, () => {
      contentEnteringSchedule = undefined;
      setContentStage("entering");
    });
    contentVisibleSchedule = $.Schedule(ABYSSAL_CONTENT_VISIBLE_DELAY, () => {
      contentVisibleSchedule = undefined;
      setContentStage("visible");
    });
  };
  const closeCancelRewardConfirmPopup = () => {
    if (cancelRewardConfirmPopupID == undefined) {
      return;
    }
    const popupID = cancelRewardConfirmPopupID;
    cancelRewardConfirmPopupID = undefined;
    ClosePopup(popupID);
  };
  const showSummary = () => {
    clearClaimRevealTimers();
    setClaimParticleTrigger(0);
    setView("summary");
  };
  const closeRewardPreview = () => {
    clearClaimRevealTimers();
    setClaimParticleTrigger(0);
    if (hasUnreceivedVisibleBox()) {
      setView("rewards");
      return;
    }
    showSummary();
  };
  const showCancelRewardConfirm = () => {
    if (cancelRewardConfirmPopupID != undefined) {
      return;
    }
    const popupID = CustomUIConfig.showPopup("CommonConfirm", {
      title: GetLocalization("#AbyssalEndScreen_CancelRewardConfirmTitle"),
      text: GetLocalization("#AbyssalEndScreen_CancelRewardConfirmText"),
      confirm_text: GetLocalization("#AbyssalEndScreen_CancelRewardConfirmCancel"),
      cancel_text: GetLocalization("#AbyssalEndScreen_CancelRewardConfirmContinue"),
      onconfirm: showSummary,
      onresult: () => {
        if (cancelRewardConfirmPopupID == popupID) {
          cancelRewardConfirmPopupID = undefined;
        }
      }
    });
    cancelRewardConfirmPopupID = popupID;
  };
  libs.createEffect(libs.on(isAbyssalSettling, settling => {
    ClientSideEvent("set_menu_bar_visible", {
      key: ABYSSAL_MENU_BAR_HIDE_KEY,
      hide: settling
    });
  }));
  libs.createEffect(libs.on(snapshotID, () => {
    closeCancelRewardConfirmPopup();
    clearClaimRevealTimers();
    setView("rewards");
    setActiveClaimBoxType(undefined);
    setClaimParticleTrigger(0);
    handledPreviewRevision = 0;
    replayContentStage();
  }));
  libs.createEffect(libs.on(() => [props.visible, snapshotID(), contentStage()], ([visible, currentSnapshotID, currentContentStage]) => {
    clearParticleReadySchedule();
    setParticleReady(false);
    if (!visible || currentSnapshotID == undefined || currentContentStage != "visible") {
      return;
    }
    particleReadySchedule = $.Schedule(ABYSSAL_PARTICLE_READY_DELAY, () => {
      particleReadySchedule = undefined;
      if (!props.visible || snapshotID() != currentSnapshotID || contentStage() != "visible") {
        return;
      }
      setParticleReady(true);
    });
  }));
  libs.createEffect(libs.on(() => isSummaryWaiting() ? activeAbyssalSettleInfo()?.wait_end_time ?? -1 : -1, endTime => {
    clearSummaryWaitTimer();
    hasLoggedSummaryWaitElapsed = false;
    if (endTime < 0) {
      setSummaryWaitRemaining(0);
      return;
    }
    console.log(`[Abyssal] participant wait countdown endTime=${endTime} snapshot=${snapshotID() ?? "unknown"}`);
    const updateSummaryWaitRemaining = () => {
      const remaining = Math.max(0, Math.ceil(endTime - Game.GetGameTime()));
      setSummaryWaitRemaining(remaining);
      if (remaining <= 0) {
        clearSummaryWaitTimer();
        if (!hasLoggedSummaryWaitElapsed) {
          hasLoggedSummaryWaitElapsed = true;
          console.log(`[Abyssal] participant wait elapsed for snapshot=${snapshotID() ?? "unknown"}; awaiting server state transition from waiting_participants.`);
        }
      }
    };
    updateSummaryWaitRemaining();
    if (endTime > Game.GetGameTime()) {
      summaryWaitTimer = setInterval(updateSummaryWaitRemaining, 1000);
    }
  }));
  libs.createEffect(libs.on(() => activeAbyssalSettleInfo()?.state == "all_summary_ready" && isAbyssalSettling() && view() != "summary", shouldShowSummary => {
    if (shouldShowSummary) {
      closeCancelRewardConfirmPopup();
      showSummary();
    }
  }));
  libs.createEffect(libs.on(view, currentView => {
    if (currentView == "summary") {
      GameEvents.SendCustomEventToServer("abyssal_summary_ready", {});
    }
  }));
  libs.createEffect(libs.on(activeRewardPreview, preview => {
    const claimingBoxType = activeClaimBoxType();
    if (preview == undefined || claimingBoxType == undefined || preview.box_type != claimingBoxType || preview.revision <= handledPreviewRevision || view() != "rewards") {
      return;
    }
    handledPreviewRevision = preview.revision;
    clearClaimRevealTimers();
    setClaimParticleTrigger(trigger => trigger + 1);
    receivedTimer = $.Schedule(1, () => {
      receivedTimer = undefined;
      if (view() == "rewards" && activeClaimBoxType() == preview.box_type) {
        setActiveClaimBoxType(undefined);
      }
    });
    previewTimer = $.Schedule(2.1, () => {
      previewTimer = undefined;
      if (view() == "rewards") {
        setView("preview");
      }
    });
  }));
  const claimFailedListener = GameEvents.Subscribe("abyssal_rewards_claim_failed", event => {
    console.log("Receive Rewards Error");
    let errorLocalizationKey = "#error_receive_abyssal_rewards";
    if (event.message === "rune count reach limit") {
      errorLocalizationKey = "#error_rune_count_reach_limit";
    } else if (event.message === "engraving count reach limit") {
      errorLocalizationKey = "#error_engraving_count_reach_limit";
    }
    ErrorMessage(GetLocalization(errorLocalizationKey));
    clearClaimRevealTimers();
    setClaimParticleTrigger(0);
    if (activeClaimBoxType() == event.box_type) {
      setActiveClaimBoxType(undefined);
    }
  });
  libs.onCleanup(() => {
    closeCancelRewardConfirmPopup();
    clearClaimRevealTimers();
    clearSummaryWaitTimer();
    clearContentStageTimers();
    clearParticleReadySchedule();
    GameEvents.Unsubscribe(claimFailedListener);
    ClientSideEvent("set_menu_bar_visible", {
      key: ABYSSAL_MENU_BAR_HIDE_KEY,
      hide: false
    });
  });
  const claimRewards = boxType => {
    if (activeClaimBoxType() != undefined || isBoxReceived(boxType) || !isAbyssalSettled()) {
      return;
    }
    setActiveClaimBoxType(boxType);
    GameEvents.SendCustomEventToServer("receive_abyssal_rewards", {
      box_type: boxType
    });
  };
  return (() => {
    const _el$120 = libs.createElement("Panel", {
        id: "AbyssalSummary",
        get ["class"]() {
          return libs.classNames({
            AbyssalDefeat: isAbyssalDefeat(),
            AbyssalStageSummaryEntering: contentStage() == "entering",
            AbyssalStageSummaryVisible: contentStage() == "visible"
          });
        }
      }, null),
      _el$121 = libs.createElement("Panel", {
        id: "AbyssalSummaryLayer"
      }, _el$120);
      libs.createElement("Image", {
        id: "SummaryBackground",
        hittest: false
      }, _el$121);
      const _el$123 = libs.createElement("Panel", {
        id: "AbyssalContentStage",
        get hittest() {
          return contentStage() == "visible";
        }
      }, _el$121);
    libs.insert(_el$123, libs.createComponent(libs.Show, {
      get when() {
        return view() == "rewards" || view() == "preview";
      },
      get children() {
        return libs.createComponent(AbyssalRewardsPanel, {
          get score() {
            return `${activeSummary()?.score ?? 0}`;
          },
          get difficulty() {
            return activeSummary()?.difficulty ?? 0;
          },
          get view() {
            return view();
          },
          get claimStates() {
            return claimStates();
          },
          get claimParticleTrigger() {
            return claimParticleTrigger();
          },
          get particleReady() {
            return particleReady();
          },
          get settled() {
            return isAbyssalSettled();
          },
          get rewards() {
            return previewRewards();
          },
          get isSummaryWaiting() {
            return isSummaryWaiting();
          },
          get summaryWaitRemaining() {
            return summaryWaitRemaining();
          },
          onCancel: showCancelRewardConfirm,
          onClaim: claimRewards,
          onPreviewClose: closeRewardPreview
        });
      }
    }), null);
    libs.insert(_el$123, libs.createComponent(libs.Show, {
      get when() {
        return view() == "summary";
      },
      get children() {
        return libs.createComponent(AbyssalSummary, {
          get showItems() {
            return contentStage() == "visible";
          },
          get isSummaryWaiting() {
            return isSummaryWaiting();
          },
          get summaryWaitRemaining() {
            return summaryWaitRemaining();
          },
          get onCountdownElapsed() {
            return props.onCountdownElapsed;
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$29 = libs.classNames({
          AbyssalDefeat: isAbyssalDefeat(),
          AbyssalStageSummaryEntering: contentStage() == "entering",
          AbyssalStageSummaryVisible: contentStage() == "visible"
        }),
        _v$30 = contentStage() == "visible";
      _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$120, "class", _v$29, _p$._v$29));
      _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$123, "hittest", _v$30, _p$._v$30));
      return _p$;
    }, {
      _v$29: undefined,
      _v$30: undefined
    });
    return _el$120;
  })();
};

const bottomParticleName = ["particles/ui/game/ui_game_general_special_effects_05_fx.vpcf", "particles/ui/game/ui_game_general_special_effects_05_2_fx.vpcf"];
const resultParticleName = ["particles/ui/game/ui_game_settlement_interface_01_fx.vpcf", "particles/ui/game/ui_game_settlement_interface_02_fx.vpcf"];
const DungeonSummary = props => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const lastEndScreenMeta = solid_utils.createNetDataSignal("common", "last_end_screen_meta");
  const lastEndScreenMvp = solid_utils.createNetDataSignal("common", "last_end_screen_mvp");
  const settle_info = solid_utils.createNetDataSignal("common", "settle_info", {
    end_time: -1,
    show_menu_bar: false
  });
  const vistory = libs.createMemo(() => lastEndScreenMeta()?.result == "victory");
  const [step, setStep] = libs.createSignal(1);
  const [countDown, setCountDown] = libs.createSignal(0);
  let countDownTimer;
  const localHeroSelection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const lastEndScreenPlayer = solid_utils.createPlayerNetDataSignal("player_data", "last_end_screen_player");
  const lastDungeonEndProgress = solid_utils.createPlayerNetDataSignal("player_data", "last_dungeon_end_progress");
  const lastDungeonEndBattle = solid_utils.createPlayerNetDataSignal("player_data", "last_dungeon_end_battle");
  const lastDungeonEndBuild = solid_utils.createPlayerNetDataSignal("player_data", "last_dungeon_end_build");
  const lastEndScreenRewards = solid_utils.createPlayerNetDataSignal("player_data", "last_end_screen_rewards");
  const snapshotID = libs.createMemo(() => lastEndScreenMeta()?.mode == "dungeon" ? lastEndScreenMeta()?.snapshot_id : undefined);
  const isCurrentSnapshot = data => snapshotID() != undefined && data?.snapshot_id == snapshotID();
  const activePlayerSnapshot = libs.createMemo(() => {
    const snapshot = lastEndScreenPlayer();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeProgress = libs.createMemo(() => {
    const snapshot = lastDungeonEndProgress();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeBattle = libs.createMemo(() => {
    const snapshot = lastDungeonEndBattle();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeBuild = libs.createMemo(() => {
    const snapshot = lastDungeonEndBuild();
    return isCurrentSnapshot(snapshot) ? snapshot : undefined;
  });
  const activeRewards = libs.createMemo(() => {
    const snapshot = lastEndScreenRewards();
    if (isCurrentSnapshot(snapshot)) {
      return snapshot?.rewards ?? [];
    }
    return [];
  });
  const sortedRewards = libs.createMemo(() => {
    return [...activeRewards()].sort((a, b) => {
      const aIsDrawing = KeyValues.info_item_drawing[a.item_id] != undefined;
      const bIsDrawing = KeyValues.info_item_drawing[b.item_id] != undefined;
      if (aIsDrawing != bIsDrawing) {
        return aIsDrawing ? -1 : 1;
      }
      const aIsKey = KeyValues.info_item_key[a.item_id] != undefined;
      const bIsKey = KeyValues.info_item_key[b.item_id] != undefined;
      if (aIsKey != bIsKey) {
        return aIsKey ? -1 : 1;
      }
      return (b.item_rarity ?? 0) - (a.item_rarity ?? 0);
    });
  });
  const activeMvpSummary = libs.createMemo(() => {
    const snapshot = lastEndScreenMvp();
    if (snapshotID() != undefined && snapshot?.snapshot_id == snapshotID()) {
      return snapshot;
    }
    return undefined;
  });
  const mvpPlayerID = libs.createMemo(() => activeMvpSummary()?.player_id);
  const mvpSteamID = libs.createMemo(() => {
    const playerID = mvpPlayerID();
    if (playerID === undefined) {
      return Game.GetPlayerInfo(Players.GetLocalPlayer())?.player_steamid ?? "-1";
    }
    return Game.GetPlayerInfo(playerID)?.player_steamid ?? "-1";
  });
  const heroName = libs.createMemo(() => activeMvpSummary()?.hero_name ?? activePlayerSnapshot()?.hero_name ?? "npc_dota_hero_vexis");
  const blessingList = libs.createMemo(() => activeBuild()?.blessings ?? []);
  const artifactList = libs.createMemo(() => activeBuild()?.artifacts ?? []);
  const abilityUpgradeList = libs.createMemo(() => activeBuild()?.ability_upgrades ?? []);
  const completionTime = libs.createMemo(() => formatDuration(activePlayerSnapshot()?.completion_time ?? 0));
  const stageProgressMetrics = libs.createMemo(() => {
    const progress = activeProgress();
    const meta = lastEndScreenMeta();
    const difficulty = meta?.difficulty ?? 1;
    const difficultyText = meta?.key_intensity == undefined ? `${difficulty}` : `${difficulty}-${meta.key_intensity}`;
    return [{
      label: "#EndScreen_ClearTime",
      value: completionTime()
    }, {
      label: "#EndScreen_Difficulty",
      value: difficultyText
    }, {
      label: "#EndScreen_ZoneProgress",
      value: progress != undefined ? `${progress.zone_index}/${progress.zone_total}` : "-"
    }, {
      label: "#EndScreen_RoomProgress",
      value: progress != undefined ? `${progress.room_step}/${progress.room_total}` : "-"
    }];
  });
  const battleMetrics = libs.createMemo(() => {
    const battle = activeBattle();
    return [{
      label: "#EndScreen_NormalKills",
      value: `${battle?.normal_kills ?? 0}`
    }, {
      label: "#EndScreen_EliteKills",
      value: `${battle?.elite_kills ?? 0}`
    }];
  });
  const skillDamageTotal = libs.createMemo(() => activeBattle()?.skill_damage_total ?? 0);
  const damageSources = libs.createMemo(() => {
    const sources = activeBattle()?.ability_damage_sources ?? [];
    const blessings = blessingList();
    const artifacts = artifactList();
    const heroIndex = localHeroSelection()?.heroIndex;
    return buildDamageSourceItems(sources, blessings, artifacts, heroIndex);
  });
  libs.createEffect(libs.on(() => settle_info().end_time, endTime => {
    if (countDownTimer != undefined) {
      clearInterval(countDownTimer);
      countDownTimer = undefined;
    }
    if (endTime == undefined) {
      setCountDown(0);
      return;
    }
    const updateCountDown = () => {
      const remaining = Math.max(0, Math.ceil(endTime - Game.GetGameTime()));
      setCountDown(remaining);
      if (remaining <= 0 && countDownTimer != undefined) {
        clearInterval(countDownTimer);
        countDownTimer = undefined;
      }
    };
    updateCountDown();
    if (endTime - Game.GetGameTime() > 0) {
      countDownTimer = setInterval(updateCountDown, 100);
    }
  }));
  libs.onCleanup(() => {
    if (countDownTimer != undefined) {
      clearInterval(countDownTimer);
      countDownTimer = undefined;
    }
  });
  libs.createEffect(() => {
    if (gameState()?.state == "GameState_Settle") {
      replay();
    } else if (gameState()?.state == "GameState_Dungeon") {
      setStep(1);
    }
  });
  const replay = async () => {
    ClientSideEvent("set_menu_bar_visible", {
      key: "endscreen",
      hide: true
    });
    setStep(1);
    Game.EmitSound(vistory() ? "dsadowski_02.stinger.radiant_win" : "dsadowski_02.stinger.dire_lose");
    await Timer.Wait(2);
    setStep(2);
    await Timer.Wait(3);
    setStep(3);
    ClientSideEvent("set_menu_bar_visible", {
      key: "endscreen",
      hide: false
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "EndScreenDungeon",
        get ["class"]() {
          return libs.classNames("Step" + step(), vistory() ? "Victory" : "Defeat", {
            ShowHud: props.visible
          });
        }
      }, null);
      libs.createElement("Image", {
        id: "Background"
      }, _el$);
      libs.createElement("Image", {
        id: "BackgroundOverlay"
      }, _el$);
      const _el$4 = libs.createElement("Panel", {
        id: "ResultMedal"
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        id: "ResultIcon"
      }, _el$4),
      _el$8 = libs.createElement("Panel", {
        id: "Certificate"
      }, _el$);
      libs.createElement("Panel", {
        id: "Header"
      }, _el$8);
      const _el$0 = libs.createElement("Panel", {
        id: "HalfHero"
      }, _el$8),
      _el$1 = libs.createElement("Panel", {
        id: "MvpInfo"
      }, _el$0),
      _el$10 = libs.createElement("Panel", {
        "class": "Mvp"
      }, _el$1);
      libs.createElement("Image", {}, _el$10);
      const _el$12 = libs.createElement("Panel", {
        "class": "PlayerInfo"
      }, _el$1),
      _el$13 = libs.createElement("Panel", {
        "class": "NamePanel"
      }, _el$12),
      _el$14 = libs.createElement("Panel", {
        "class": "PlayerAvatar"
      }, _el$12);
      libs.createElement("Panel", {
        "class": "CustomBorder"
      }, _el$14);
      const _el$16 = libs.createElement("DOTAAvatarImage", {
        get steamid() {
          return mvpSteamID();
        },
        align: "center center",
        width: "71%",
        height: "71%",
        hittest: false
      }, _el$14),
      _el$17 = libs.createElement("Panel", {
        id: "CertificateBody"
      }, _el$8),
      _el$18 = libs.createElement("Panel", {
        id: "InfoColumn"
      }, _el$17),
      _el$19 = libs.createElement("Panel", {
        "class": "DataSection Bless"
      }, _el$18),
      _el$20 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$19);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$20);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_Blessing"
      }, _el$20);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$20);
      const _el$24 = libs.createElement("Panel", {
        "class": "BadgeList BlessingList",
        scroll: "y"
      }, _el$19),
      _el$25 = libs.createElement("Panel", {
        "class": "DataSection Artifact"
      }, _el$18),
      _el$26 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$25);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$26);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_Artifact"
      }, _el$26);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$26);
      const _el$30 = libs.createElement("Panel", {
        "class": "BadgeList ArtifactList",
        scroll: "x"
      }, _el$25),
      _el$31 = libs.createElement("Panel", {
        "class": "DataSection Upgrade"
      }, _el$18),
      _el$32 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$31);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$32);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_AbilityUpgrade"
      }, _el$32);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$32);
      const _el$36 = libs.createElement("Panel", {
        "class": "BadgeList UpgradeList",
        scroll: "x"
      }, _el$31),
      _el$37 = libs.createElement("Panel", {
        id: "RewardList"
      }, _el$18),
      _el$38 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$37);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$38);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "#EndScreen_Loot"
      }, _el$38);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$38);
      const _el$42 = libs.createElement("Panel", {
        id: "RewardItemList",
        scroll: "y"
      }, _el$37),
      _el$43 = libs.createElement("Panel", {
        id: "SummaryColumn"
      }, _el$17),
      _el$44 = libs.createElement("Panel", {
        "class": "SideSection ProgressSection"
      }, _el$43),
      _el$45 = libs.createElement("Panel", {
        "class": "SideTitleRow"
      }, _el$44),
      _el$46 = libs.createElement("Label", {
        "class": "SideTitle",
        horizontalAlign: "center",
        text: "#EndScreen_StageProgress"
      }, _el$45),
      _el$47 = libs.createElement("Panel", {
        "class": "MetricsGrid"
      }, _el$43),
      _el$48 = libs.createElement("Panel", {
        "class": "SideSection DamageSection"
      }, _el$43),
      _el$49 = libs.createElement("Panel", {
        "class": "DamageHeaderRow"
      }, _el$48);
      libs.createElement("Label", {
        "class": "SideTitle DamageTitle",
        text: "#EndScreen_DamageSource"
      }, _el$49);
      const _el$51 = libs.createElement("Label", {
        "class": "DamageTotal",
        get text() {
          return FormatNumber(skillDamageTotal());
        }
      }, _el$49),
      _el$52 = libs.createElement("Panel", {
        "class": "DamageRowList",
        scroll: "y"
      }, _el$48);
    libs.insert(_el$4, () => libs.createMemo(libs.on(vistory, win => (() => {
      const _el$53 = libs.createElement("DOTAParticleScenePanel", {
        id: "ResultParticle",
        get particleName() {
          return win ? resultParticleName[0] : resultParticleName[1];
        },
        cameraOrigin: "0 0 50",
        fov: 90,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null);
      libs.effect(_$p => libs.setProp(_el$53, "particleName", win ? resultParticleName[0] : resultParticleName[1], _$p));
      return _el$53;
    })())), _el$5);
    libs.setProp(_el$5, "onload", self => print("onload ResultIcon"));
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return step() == 2;
      },
      get children() {
        return [(() => {
          const _el$6 = libs.createElement("DOTAParticleScenePanel", {
            id: "BottomParticle",
            get particleName() {
              return vistory() ? bottomParticleName[0] : bottomParticleName[1];
            },
            cameraOrigin: "0 0 800",
            fov: 90,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, null);
          libs.effect(_$p => libs.setProp(_el$6, "particleName", vistory() ? bottomParticleName[0] : bottomParticleName[1], _$p));
          return _el$6;
        })(), (() => {
          const _el$7 = libs.createElement("Panel", {
            id: "HeroList"
          }, null);
          libs.insert(_el$7, libs.createComponent(libs.For, {
            get each() {
              return Game.GetAllPlayerIDs();
            },
            children: playerID => (() => {
              const _el$54 = libs.createElement("Panel", {
                  "class": "HeroShow"
                }, null),
                _el$55 = libs.createElement("Panel", {
                  id: "Mvp"
                }, _el$54);
                libs.createElement("Image", {}, _el$55);
              libs.insert(_el$54, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
                get unit() {
                  return getNetDataKey("common", "hero_selection", playerID)?.heroName ?? "npc_dota_hero_vespera";
                }
              }), null);
              libs.effect(_$p => libs.setProp(_el$54, "classList", {
                IsMvp: playerID === mvpPlayerID()
              }, _$p));
              return _el$54;
            })()
          }));
          return _el$7;
        })()];
      }
    }), _el$8);
    libs.insert(_el$0, libs.createComponent(solid_utils.DynamicKey, {
      key: heroName,
      children: heroname => libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
        unit: heroname,
        camera: "endscreen"
      })
    }), _el$1);
    libs.insert(_el$13, libs.createComponent(Player.PlayerName, {
      get steamid() {
        return mvpSteamID();
      },
      showgGild: false
    }));
    libs.setProp(_el$16, "style", {
      borderRadius: "50%"
    });
    libs.setProp(_el$16, "align", "center center");
    libs.setProp(_el$16, "width", "71%");
    libs.setProp(_el$16, "height", "71%");
    libs.setProp(_el$24, "scroll", "y");
    libs.insert(_el$24, libs.createComponent(libs.For, {
      get each() {
        return blessingList();
      },
      children: (item, index) => libs.createComponent(common_item.CommonItem, {
        showTips: true,
        get itemName() {
          return item.name;
        },
        get rarity() {
          return item.rarity;
        },
        get transitionDelay() {
          return 0.1 + index() * 0.3 + "s";
        },
        get classList() {
          return {
            Show: step() == 3
          };
        }
      })
    }));
    libs.setProp(_el$30, "scroll", "x");
    libs.insert(_el$30, libs.createComponent(libs.For, {
      get each() {
        return artifactList();
      },
      children: (item, index) => libs.createComponent(common_item.CommonItem, {
        showTips: true,
        get itemName() {
          return item.item_name;
        },
        get transitionDelay() {
          return 0.2 + index() * 0.3 + "s";
        },
        get classList() {
          return {
            Show: step() == 3
          };
        }
      })
    }));
    libs.setProp(_el$36, "scroll", "x");
    libs.insert(_el$36, libs.createComponent(libs.For, {
      get each() {
        return abilityUpgradeList();
      },
      children: (item, index) => libs.createComponent(upgrade_icon.UpgradeIcon, {
        showTips: true,
        get upgradeID() {
          return item.name;
        },
        get transitionDelay() {
          return 0.3 + index() * 0.3 + "s";
        },
        get classList() {
          return {
            Show: step() == 3
          };
        }
      })
    }));
    libs.setProp(_el$42, "scroll", "y");
    libs.insert(_el$42, libs.createComponent(libs.For, {
      get each() {
        return sortedRewards();
      },
      children: (data, index) => (() => {
        const _el$57 = libs.createElement("Panel", {
          "class": "RewardCard"
        }, null);
        libs.insert(_el$57, libs.createComponent(StoreItem.StoreItemBlock, {
          get classList() {
            return {
              Show: step() == 3
            };
          },
          get transitionDelay() {
            return 0.5 + index() * 0.3 + "s";
          },
          get item_id() {
            return data.item_id;
          },
          get uid() {
            return data.uid;
          },
          get amounts() {
            return data.amounts;
          },
          get rarity() {
            return data.item_rarity;
          }
        }));
        return _el$57;
      })()
    }));
    libs.setProp(_el$46, "horizontalAlign", "center");
    libs.insert(_el$44, libs.createComponent(libs.For, {
      get each() {
        return stageProgressMetrics();
      },
      children: (metric, idx) => [libs.createElement("Panel", {
        "class": "StatLine"
      }, null), (() => {
        const _el$59 = libs.createElement("Panel", {
            "class": "StatRow ProgressRow"
          }, null),
          _el$60 = libs.createElement("Panel", {
            verticalAlign: "center",
            flowChildren: "right"
          }, _el$59),
          _el$61 = libs.createElement("Image", {
            get ["class"]() {
              return "StatRowImg img" + idx();
            }
          }, _el$60),
          _el$62 = libs.createElement("Label", {
            "class": "StatLabel",
            get text() {
              return metric.label;
            },
            get vars() {
              return metric.vars;
            }
          }, _el$60),
          _el$63 = libs.createElement("Label", {
            "class": `StatValue`,
            get text() {
              return metric.value;
            },
            get vars() {
              return metric.vars;
            }
          }, _el$59);
        libs.setProp(_el$60, "verticalAlign", "center");
        libs.setProp(_el$60, "flowChildren", "right");
        libs.setProp(_el$63, "class", `StatValue`);
        libs.effect(_p$ => {
          const _v$4 = "StatRowImg img" + idx(),
            _v$5 = metric.label,
            _v$6 = metric.vars,
            _v$7 = metric.value,
            _v$8 = metric.vars;
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$61, "class", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$62, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$62, "vars", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$63, "text", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$63, "vars", _v$8, _p$._v$8));
          return _p$;
        }, {
          _v$4: undefined,
          _v$5: undefined,
          _v$6: undefined,
          _v$7: undefined,
          _v$8: undefined
        });
        return _el$59;
      })()]
    }), null);
    libs.insert(_el$47, libs.createComponent(libs.For, {
      get each() {
        return battleMetrics();
      },
      children: (metric, idx) => [(() => {
        const _el$64 = libs.createElement("Panel", {
            "class": `MetricCard`
          }, null),
          _el$65 = libs.createElement("Label", {
            "class": "MetricLabel",
            get text() {
              return metric.label;
            }
          }, _el$64),
          _el$66 = libs.createElement("Label", {
            "class": "MetricValue",
            get text() {
              return metric.value;
            }
          }, _el$64);
        libs.setProp(_el$64, "class", `MetricCard`);
        libs.effect(_p$ => {
          const _v$9 = metric.label,
            _v$0 = metric.value;
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$65, "text", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$66, "text", _v$0, _p$._v$0));
          return _p$;
        }, {
          _v$9: undefined,
          _v$0: undefined
        });
        return _el$64;
      })(), (() => {
        const _el$67 = libs.createElement("Panel", {
          "class": "MetricsLine"
        }, null);
        libs.effect(_$p => libs.setProp(_el$67, "visible", idx() != battleMetrics().length - 1, _$p));
        return _el$67;
      })()]
    }));
    libs.setProp(_el$52, "scroll", "y");
    libs.insert(_el$52, libs.createComponent(libs.For, {
      get each() {
        return damageSources();
      },
      children: item => (() => {
        const _el$68 = libs.createElement("Panel", {
            "class": "DamageRow"
          }, null),
          _el$69 = libs.createElement("Panel", {
            "class": "DamageBarTrack"
          }, _el$68),
          _el$70 = libs.createElement("Panel", {
            "class": "DamageBarFill",
            get style() {
              return {
                width: item.ratio > 0 ? `${Math.max(8, Math.round(item.ratio * 100))}%` : "0%"
              };
            }
          }, _el$69),
          _el$71 = libs.createElement("Label", {
            "class": "DamageAmount",
            get text() {
              return FormatNumber(item.value);
            }
          }, _el$68);
        libs.insert(_el$68, libs.createComponent(DamageSourceIcon, {
          item: item
        }), _el$69);
        libs.effect(_p$ => {
          const _v$1 = {
              width: item.ratio > 0 ? `${Math.max(8, Math.round(item.ratio * 100))}%` : "0%"
            },
            _v$10 = FormatNumber(item.value);
          _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$70, "style", _v$1, _p$._v$1));
          _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$71, "text", _v$10, _p$._v$10));
          return _p$;
        }, {
          _v$1: undefined,
          _v$10: undefined
        });
        return _el$68;
      })()
    }));
    libs.insert(_el$, libs.createComponent(EOM_ImageNumber.EOM_ImageNumber, {
      id: "CountDown",
      get visible() {
        return libs.memo(() => !!(props.visible && countDown() > 0))() && step() >= 3;
      },
      type: "5",
      get value() {
        return countDown();
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames("Step" + step(), vistory() ? "Victory" : "Defeat", {
          ShowHud: props.visible
        }),
        _v$2 = mvpSteamID(),
        _v$3 = FormatNumber(skillDamageTotal());
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "steamid", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$51, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
};

const HuntBossSummary = props => {
  const settleInfo = solid_utils.createNetDataSignal("common", "settle_info", {
    end_time: -1,
    show_menu_bar: false
  });
  const huntBossMeta = libs.createMemo(() => props.meta);
  const playerResult = libs.createMemo(() => huntBossMeta()?.player_results?.[Game.GetLocalPlayerID()]);
  const isVictory = libs.createMemo(() => (playerResult()?.result ?? huntBossMeta()?.result) === "victory");
  const lastHuntEndRewards = solid_utils.createPlayerNetDataSignal("player_data", "last_hunt_end_rewards");
  const activeRewardSnapshot = libs.createMemo(() => {
    const meta = huntBossMeta();
    const snapshot = lastHuntEndRewards();
    return meta?.mode === "hunt_boss" && snapshot?.snapshot_id === meta.snapshot_id ? snapshot : undefined;
  });
  const rewards = libs.createMemo(() => {
    const issuedRewards = activeRewardSnapshot()?.rewards;
    return (Array.isArray(issuedRewards) ? issuedRewards : []).map(reward => ({
      ...reward,
      need_level: KeyValues.huntloot_class_setting[reward.class]?.need_level ?? 0
    })).sort((a, b) => b.rarity - a.rarity);
  });
  const localHeroSelection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const heroName = libs.createMemo(() => localHeroSelection()?.heroName ?? "npc_dota_hero_vexis");
  const level = libs.createMemo(() => playerResult()?.level ?? huntBossMeta()?.level ?? 0);
  const reason = libs.createMemo(() => playerResult()?.reason ?? huntBossMeta()?.reason);
  const statusText = libs.createMemo(() => reason() === "AllPlayersRetreated" ? GetLocalization("#HuntBossSettle_Retreated") : isVictory() ? GetLocalization("#HuntBossSettle_Completed") : GetLocalization("#HuntBossSettle_Failed"));
  const [countDown, setCountDown] = libs.createSignal(0);
  let countDownTimer;
  libs.createEffect(libs.on(() => props.visible && !props.personal ? settleInfo().end_time : -1, endTime => {
    if (countDownTimer !== undefined) {
      clearInterval(countDownTimer);
      countDownTimer = undefined;
    }
    const update = () => setCountDown(Math.max(0, Math.ceil((endTime ?? 0) - Game.GetGameTime())));
    update();
    if ((endTime ?? 0) > Game.GetGameTime()) {
      countDownTimer = setInterval(update, 100);
    }
  }));
  libs.onCleanup(() => {
    if (countDownTimer !== undefined) {
      clearInterval(countDownTimer);
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "HuntBossSummary",
        get ["class"]() {
          return libs.classNames({
            HuntBossDefeat: !isVictory(),
            HuntBossStageSummaryVisible: props.visible
          });
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "HuntBossSummaryLayer"
      }, _el$);
      libs.createElement("Image", {
        id: "SummaryBackground",
        hittest: false
      }, _el$2);
      const _el$4 = libs.createElement("Panel", {
        id: "HuntBossContentStage",
        hittest: false
      }, _el$2),
      _el$5 = libs.createElement("Panel", {
        id: "HuntBossSummaryStage"
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        id: "Certificate"
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        id: "Header"
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "SummaryHeaderContainer"
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        id: "SummaryHeader"
      }, _el$8),
      _el$0 = libs.createElement("Label", {
        id: "SummaryHeaderText",
        get text() {
          return GetLocalization("#HuntBossSettle_Title");
        }
      }, _el$9);
      libs.createElement("Image", {
        id: "SummaryDivider",
        hittest: false
      }, _el$8);
      const _el$10 = libs.createElement("Panel", {
        id: "SummaryScoreContainer"
      }, _el$8),
      _el$11 = libs.createElement("Label", {
        id: "SummaryScoreTitleText",
        get text() {
          return LocalizeWithVars("#HuntBossHudLevel", {
            level: level()
          });
        }
      }, _el$10),
      _el$12 = libs.createElement("Label", {
        id: "SummaryScoreValue",
        get text() {
          return statusText();
        }
      }, _el$10),
      _el$13 = libs.createElement("Panel", {
        id: "HalfHero"
      }, _el$6),
      _el$14 = libs.createElement("Panel", {
        id: "CertificateBody"
      }, _el$6),
      _el$15 = libs.createElement("Panel", {
        id: "InfoColumn"
      }, _el$14),
      _el$16 = libs.createElement("Panel", {
        id: "RewardList"
      }, _el$15),
      _el$17 = libs.createElement("Panel", {
        "class": "SectionTitleRow"
      }, _el$16);
      libs.createElement("Image", {
        "class": "TitleIcon"
      }, _el$17);
      const _el$19 = libs.createElement("Label", {
        "class": "SectionTitle",
        get text() {
          return GetLocalization("#HuntBossSettle_Rewards");
        }
      }, _el$17);
      libs.createElement("Panel", {
        "class": "SectionLine"
      }, _el$17);
      const _el$21 = libs.createElement("Panel", {
        id: "RewardItemList",
        scroll: "y"
      }, _el$16);
    libs.insert(_el$13, libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
      get unit() {
        return heroName();
      },
      camera: "endscreen"
    }));
    libs.setProp(_el$21, "scroll", "y");
    libs.insert(_el$21, libs.createComponent(libs.Show, {
      get when() {
        return rewards().length > 0;
      },
      get fallback() {
        return (() => {
          const _el$22 = libs.createElement("Label", {
            id: "HuntBossRewardEmpty",
            get text() {
              return GetLocalization(activeRewardSnapshot() === undefined ? "#HuntBossSettle_RewardsPending" : "#HuntBossSettle_NoRewards");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$22, "text", GetLocalization(activeRewardSnapshot() === undefined ? "#HuntBossSettle_RewardsPending" : "#HuntBossSettle_NoRewards"), _$p));
          return _el$22;
        })();
      },
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return rewards();
          },
          children: (reward, index) => (() => {
            const _el$23 = libs.createElement("Panel", {
              "class": "HuntBossSummaryRewardCard",
              get style() {
                return {
                  animationDelay: 0.5 + index() * 0.3 + "s"
                };
              }
            }, null);
            libs.insert(_el$23, libs.createComponent(server_huntloot.Huntloot, libs.mergeProps$1(reward, {
              panelClass: "HuntBossSummaryReward",
              tooltipData: reward
            })));
            libs.effect(_$p => libs.setProp(_el$23, "style", {
              animationDelay: 0.5 + index() * 0.3 + "s"
            }, _$p));
            return _el$23;
          })()
        });
      }
    }));
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return !props.personal;
      },
      get children() {
        return libs.createComponent(EOM_ImageNumber.EOM_ImageNumber, {
          id: "CountDown",
          type: "5",
          get value() {
            return countDown();
          }
        });
      }
    }), null);
    libs.insert(_el$2, libs.createComponent(libs.Show, {
      get when() {
        return props.personal;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_CloseButton, {
          id: "HuntBossSummaryClose",
          get tooltip_text() {
            return GetLocalization("#HuntBossSettle_Close");
          },
          onactivate: () => props.onClose()
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames({
          HuntBossDefeat: !isVictory(),
          HuntBossStageSummaryVisible: props.visible
        }),
        _v$2 = GetLocalization("#HuntBossSettle_Title"),
        _v$3 = LocalizeWithVars("#HuntBossHudLevel", {
          level: level()
        }),
        _v$4 = statusText(),
        _v$5 = GetLocalization("#HuntBossSettle_Rewards");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$0, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$11, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$12, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$19, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$;
  })();
};

const QUESTIONNAIRE_COMPLETED_COUNTER = "questionnaire_completed";
const EndScreen = () => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const loginState = solid_utils.createNetDataSignal("common", "login_state", {});
  const lastEndScreenMeta = solid_utils.createNetDataSignal("common", "last_end_screen_meta");
  const gameModeState = solid_utils.createNetDataSignal("common", "game_mode_state");
  const lastHuntEndMeta = solid_utils.createPlayerNetDataSignal("player_data", "last_hunt_end_meta");
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const [show, setShow] = solid_utils.createToggleWindowSignal("MenuButton_endscreen", gameState()?.state == "GameState_Settle", {
    ignoreOtherWindows: true
  });
  const personalHuntMeta = libs.createMemo(() => {
    const personal = lastHuntEndMeta();
    const global = lastEndScreenMeta();
    const state = gameState()?.state;
    const isHunting = (state === "GameState_Dungeon" || state === "GameState_Settle") && gameModeState()?.activeModeId === "hunt_boss";
    const isCurrent = isHunting || state !== "GameState_Dungeon" && global?.mode === "hunt_boss" && global.snapshot_id === personal?.snapshot_id;
    return personal?.mode === "hunt_boss" && isCurrent ? personal : undefined;
  });
  const summaryMode = libs.createMemo(() => personalHuntMeta()?.mode ?? lastEndScreenMeta()?.mode);
  const huntSummaryMeta = libs.createMemo(() => personalHuntMeta() ?? (lastEndScreenMeta()?.mode === "hunt_boss" ? lastEndScreenMeta() : undefined));
  const shownHuntSnapshots = new Set();
  const questionnaireCompleted = libs.createMemo(() => {
    return toFiniteNumber(playerCounters()[QUESTIONNAIRE_COMPLETED_COUNTER]?.count, 0) > 0;
  });
  let questionnaireShown = false;
  let questionnaireSchedule;
  const closeAbyssalEndScreen = () => {
    console.log("[EndScreen] abyssal settlement countdown elapsed; hiding end screen.");
    setShow(false);
    ToggleWindow("MenuButton_endscreen", false);
  };
  const closeHuntEndScreen = () => {
    console.log(`[EndScreen] hunt closed snapshot=${huntSummaryMeta()?.snapshot_id ?? "none"} personal=${personalHuntMeta() !== undefined}`);
    setShow(false);
    ToggleWindow("MenuButton_endscreen", false);
  };
  libs.createEffect(libs.on(() => [gameState()?.state, summaryMode(), huntSummaryMeta()?.snapshot_id, personalHuntMeta() !== undefined], ([state, mode, snapshotID, personal]) => {
    console.log(`[EndScreen] transition state=${state ?? "none"} mode=${mode ?? "none"} huntSnapshot=${snapshotID ?? "none"} personal=${personal} alreadyShown=${snapshotID !== undefined && shownHuntSnapshots.has(snapshotID)}`);
    if (state === "GameState_Dungeon" && personal || state === "GameState_Settle" && mode === "hunt_boss") {
      if (snapshotID === undefined || shownHuntSnapshots.has(snapshotID)) return;
      shownHuntSnapshots.add(snapshotID);
      setShow(true);
      ToggleWindow("MenuButton_endscreen", true);
    } else if (state == "GameState_Settle") {
      setShow(true);
      ToggleWindow("MenuButton_endscreen", true);
    } else if (state == "GameState_Prepare") {
      $.Schedule(0.5, () => {
        if (gameState()?.state == "GameState_Prepare") {
          setShow(false);
        }
      });
    } else {
      setShow(false);
    }
  }));
  libs.createEffect(() => {
    console.log(`[EndScreen] visible=${show()} mode=${summaryMode() ?? "none"} globalSnapshot=${lastEndScreenMeta()?.snapshot_id ?? "none"} personalSnapshot=${lastHuntEndMeta()?.snapshot_id ?? "none"}`);
  });
  const shouldShowQuestionnaire = () => {
    const localPlayerID = Players.GetLocalPlayer();
    return gameState()?.state == "GameState_Settle" && loginState()?.[localPlayerID]?.state == PlayerLoginState.Success && !questionnaireCompleted() && !questionnaireShown;
  };
  libs.createEffect(() => {
    if (!shouldShowQuestionnaire()) {
      if (questionnaireSchedule != undefined) {
        $.CancelScheduled(questionnaireSchedule);
        questionnaireSchedule = undefined;
      }
      return;
    }
    if (questionnaireSchedule != undefined) return;
    questionnaireSchedule = $.Schedule(0.5, () => {
      questionnaireSchedule = undefined;
      if (!shouldShowQuestionnaire()) return;
      questionnaireShown = true;
      ShowPopup("CommunitySurvey", {});
    });
  });
  libs.onCleanup(() => {
    if (questionnaireSchedule != undefined) {
      $.CancelScheduled(questionnaireSchedule);
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "HudEndScreenRoot",
      get ["class"]() {
        return libs.classNames("CustomHudRoot", {
          ShowHud: show()
        });
      }
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return summaryMode() == "abyssal";
      },
      get children() {
        return libs.createComponent(Abyssal, {
          get visible() {
            return show();
          },
          onCountdownElapsed: closeAbyssalEndScreen
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return summaryMode() == "dungeon" || summaryMode() == "tutorial";
      },
      get children() {
        return libs.createComponent(DungeonSummary, {
          get visible() {
            return show();
          }
        });
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return summaryMode() == "hunt_boss";
      },
      get children() {
        return libs.createComponent(HuntBossSummary, {
          get visible() {
            return show();
          },
          get meta() {
            return huntSummaryMeta();
          },
          get personal() {
            return personalHuntMeta() !== undefined;
          },
          onClose: closeHuntEndScreen
        });
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$, "class", libs.classNames("CustomHudRoot", {
      ShowHud: show()
    }), _$p));
    return _el$;
  })();
};
libs.render(EndScreen, $.GetContextPanel());