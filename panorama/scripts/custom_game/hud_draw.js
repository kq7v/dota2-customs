--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var CosmeticCard = require('./CosmeticCard.js');
var CosmeticPreview = require('./CosmeticPreview.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Icon = require('./EOM_Icon.js');
var EOM_Image = require('./EOM_Image.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var EOM_Separator = require('./EOM_Separator.js');
var ExchangeItem = require('./ExchangeItem.js');
var GenericPanel = require('./GenericPanel.js');
var InfoButton = require('./InfoButton.js');
var Player = require('./Player.js');
var ProductItem = require('./ProductItem.js');
var netdata_utils = require('./netdata_utils.js');
var EOM_PortraitFullBody = require('./EOM_PortraitFullBody.js');
require('./CourierTitle.js');
require('./WinStreak.js');
require('./Heroes.js');
require('./profile_info.js');
require('./MenuMarkIcon.js');
require('./red_point_utils.js');
require('./ProductImage.js');

const _addHidden = p => {
  if (p?.IsValid()) {
    p.AddClass("Hidden");
  }
};
const _removeHidden = p => {
  if (p?.IsValid()) {
    p.RemoveClass("Hidden");
  }
};
const EarthshakerMachineDraw = props => {
  const drawButtonEnable = () => props.drawButtonEnable;
  const setDrawButtonEnable = state => props.setDrawButtonEnable(state);
  const rewardShow = () => props.rewardShow;
  const setRewardShow = state => props.setRewardShow(state);
  const language = $.Language().toLowerCase();
  const show = () => props.show;
  const localPlayerID = Players.GetLocalPlayer();
  const [luck, setLuck] = libs.createSignal(0);
  const GuaranteedAmount = 180;
  const nextUpNeedCount = libs.createMemo(() => {
    if (luck() == 0) {
      return GuaranteedAmount;
    }
    return Math.max(1, GuaranteedAmount - luck() + 1);
  });
  netdata_utils.createNetDataEffect("player_box_luck", data => {
    if (data && data[props.pool_data.pool]) {
      setLuck(data[props.pool_data.pool].luck);
    }
  }, localPlayerID);
  const [boxToken, setBoxToken] = libs.createSignal(0);
  netdata_utils.createNetDataEffect("player_boxes", data => {
    setBoxToken(data[props.pool_data.bid]?.amounts ?? 0);
  }, localPlayerID);
  libs.onMount(() => {
    let gameEventListeners = [];
    gameEventListeners.push(useClientSideEvent("close_draw_reward_windows", data => {
      if (data.state == 1) {
        funcRewardShowContinue();
      }
    }));
    libs.onCleanup(() => {
      gameEventListeners.forEach(v => GameEvents.Unsubscribe(v));
    });
  });
  const fFlipTime = 0.5;
  let pDrawPortalRef;
  let pWillHideList = [];
  const AddWillHide = p => {
    if (p?.IsValid()) {
      p.AddClass("ActivityWillHidden");
      pWillHideList.push(p);
    }
  };
  let pDrawWindow;
  let BGButtonLists;
  let pRewardList;
  const [drawSuccess, setDrawSuccess] = libs.createSignal(false);
  const [rewardList, setRewardList] = libs.createSignal([]);
  const [willSkip, setWillSkip] = libs.createSignal(false);
  const [drawEnd, setDrawEnd] = libs.createSignal(false);
  const [drawSoundIndex, setDrawSoundIndex] = libs.createSignal(-1);
  const handledRewardData = libs.createMemo(() => {
    const list = [];
    let resultType = 0;
    const current_rewardList = rewardList();
    current_rewardList.forEach((data, index) => {
      let itemID = data.origin_item_id ?? data.itemId;
      let rarity = 0;
      if (itemID.toString().startsWith("931") && KeyValues.BackpackKv[itemID]) {
        rarity = KeyValues.BackpackKv[itemID].quality;
      } else if (KeyValues.CosmeticsKv[itemID.toString()] != undefined) {
        rarity = getCosmeticRarity(itemID);
      } else {
        rarity = props.getRarity(props.pool_data.drop, itemID, data.amounts);
      }
      list.push({
        itemId: data.itemId,
        rarity,
        origin_item_id: data.origin_item_id,
        amounts: data.amounts
      });
      if (rarity == 3) {
        resultType = 1;
      } else if (rarity == 4) {
        resultType = 2;
      }
    });
    return {
      list,
      resultType
    };
  });
  const endDrawAnimation = (soundIndex, clickSkip = false) => {
    if (soundIndex == -1) return;
    if (soundIndex != drawSoundIndex()) return;
    if (soundIndex != -1) {
      Game.StopSound(soundIndex);
      setDrawSoundIndex(-1);
    }
    if (show()) {
      if (pDrawPortalRef?.IsValid()) {
        let normal = pDrawPortalRef.FindChild("ActivityDrawPortal");
        if (normal?.IsValid()) {
          normal.StopParticlesImmediately(false);
          normal.style.opacity = "1";
        }
        let golden = pDrawPortalRef.FindChild("ActivityDrawPortalGold");
        if (golden?.IsValid()) {
          golden.StopParticlesImmediately(false);
          golden.style.opacity = "0.01";
        }
        let red = pDrawPortalRef.FindChild("ActivityDrawPortalRed");
        if (red?.IsValid()) {
          red.StopParticlesImmediately(false);
          red.style.opacity = "0.01";
        }
      }
      Game.EmitSound("ui.portal_close");
      showDrawRewards(handledRewardData().list);
      if (clickSkip) {
        $.Schedule(0.2, () => {
          if (rewardShow()) funcRewardShowContinue();
        });
      }
      if (!drawSuccess()) {
        funcRewardShowContinue();
        showPopup("ErrorMessage", {
          msg: "#ErrorMessage_DrawFailure"
        });
      }
    }
  };
  const Draw = count => {
    setDrawEnd(false);
    setDrawButtonEnable(false);
    setRewardList([]);
    let seq = new RunSequentialActions();
    if (rewardShow()) {
      setRewardShow(false);
    }
    let index = -1;
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        _addHidden(BGButtonLists);
        pWillHideList = pWillHideList.filter(v => {
          if (v?.IsValid()) {
            _addHidden(v);
            return true;
          }
          return false;
        });
      }
    }));
    if (!BGButtonLists.BHasClass("Hidden")) {
      seq.actions.push(new WaitAction(0.4));
    }
    seq.actions.push(new RunFunctionAction(() => {
      if (show()) {
        if (pDrawPortalRef?.IsValid()) {
          let normal = pDrawPortalRef.FindChild("ActivityDrawPortal");
          if (normal?.IsValid()) {
            normal.StartParticles();
          }
          let golden = pDrawPortalRef.FindChild("ActivityDrawPortalGold");
          if (golden?.IsValid()) {
            golden.StartParticles();
          }
          let red = pDrawPortalRef.FindChild("ActivityDrawPortalRed");
          if (red?.IsValid()) {
            red.StartParticles();
          }
        }
        index = Game.EmitSound("ui.portal_open");
        setDrawSoundIndex(index);
      }
    }));
    if (willSkip()) {
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex()) return true;
        if (handledRewardData().list.length > 0 || drawEnd()) {
          endDrawAnimation(index, true);
          return true;
        }
        return false;
      }));
    } else {
      seq.actions.push(new WaitAction(1.5));
      seq.actions.push(new WaitForConditionAction(() => {
        if (index != drawSoundIndex()) return false;
        if (handledRewardData().list.length > 0 || drawEnd()) {
          if (handledRewardData().resultType != 0) {
            if (pDrawPortalRef?.IsValid()) {
              let normal = pDrawPortalRef.FindChild("ActivityDrawPortal");
              if (normal?.IsValid()) {
                normal.style.opacity = "0";
              }
              if (handledRewardData().resultType == 1) {
                let golden = pDrawPortalRef.FindChild("ActivityDrawPortalGold");
                if (golden?.IsValid()) {
                  golden.style.opacity = "1";
                }
              } else {
                let red = pDrawPortalRef.FindChild("ActivityDrawPortalRed");
                if (red?.IsValid()) {
                  red.style.opacity = "1";
                }
              }
            }
          }
          return true;
        }
        return false;
      }));
      seq.actions.push(new WaitAction(1));
      seq.actions.push(new RunFunctionAction(() => {
        endDrawAnimation(index);
      }));
    }
    RunSingleAction(seq);
    serverRequest("box_open", {
      bid: props.pool_data.bid,
      pool: props.pool_data.pool,
      amounts: count
    }, data => {
      if (data.status == 0 && data?.data != undefined) {
        setRewardList(data.data.map(v => {
          if (v.orderby == undefined) {
            v.orderby = Round(Math.random() * 100);
          }
          return v;
        }).sort((a, b) => a.orderby - b.orderby));
        setDrawSuccess(true);
      } else {
        setDrawSuccess(false);
      }
      setDrawEnd(true);
    });
  };
  const showDrawRewards = items => {
    if (pDrawWindow) {
      if (pRewardList?.IsValid()) {
        let seq = new RunSequentialActions();
        seq.actions.push(new RunFunctionAction(() => {
          setRewardShow(true);
          pRewardList.RemoveAndDeleteChildren();
          const count = items.length;
          for (let i = 0; i < count; i++) {
            const data = items[i];
            let itemID = data.origin_item_id ?? data.itemId;
            let rarity = data.rarity;
            let p = $.CreatePanel("Panel", pRewardList, "");
            p.AddClass("AwardItem");
            if (count == 1) {
              p.AddClass("Single");
            } else {
              p.AddClass("Multi" + (i + 1));
            }
            p.AddClass("Rarity" + rarity);
            SaveData(p, "iRarity", rarity);
            libs.render(() => (() => {
              const _el$ = libs.createElement("Panel", {
                  id: "AwardItemContainer"
                }, null),
                _el$2 = libs.createElement("Panel", {}, _el$),
                _el$3 = libs.createElement("Panel", {}, _el$),
                _el$4 = libs.createElement("Panel", {}, _el$),
                _el$1 = libs.createElement("Panel", {}, _el$);
              libs.setProp(_el$2, "className", "AwardBG");
              libs.setProp(_el$3, "className", "New");
              libs.setProp(_el$4, "className", "Mask");
              libs.insert(_el$4, libs.createComponent(EOM_Panel.EOM_Panel, {
                className: "MaskMain",
                get children() {
                  return [libs.createComponent(ProductItem.ProductItem, {
                    id: "StoreItemImage",
                    itemid: itemID,
                    rarity: rarity,
                    get count() {
                      return data.origin_item_id == undefined ? data.amounts : 1;
                    }
                  }), libs.createComponent(CosmeticCard.CosmeticImage, {
                    hittest: false,
                    width: "200px",
                    height: "200px",
                    y: "-10px",
                    align: "center center",
                    get itemid() {
                      return itemID.toString();
                    }
                  })];
                }
              }), null);
              libs.insert(_el$4, libs.createComponent(libs.Switch, {
                get children() {
                  return [libs.createComponent(libs.Match, {
                    when: rarity == 3,
                    get children() {
                      return [(() => {
                        const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                          squarePixels: true,
                          particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                          lookAt: "0 0 0",
                          cameraOrigin: "0 0 200",
                          fov: 30
                        }, null);
                        libs.setProp(_el$5, "style", {
                          width: "260px",
                          height: "260px",
                          align: "center center"
                        });
                        return _el$5;
                      })(), libs.createElement("DOTAParticleScenePanel", {
                        id: "GoldParticle",
                        squarePixels: true,
                        particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "250 0 0",
                        fov: 18
                      }, null), libs.createElement("DOTAParticleScenePanel", {
                        id: "GoldParticle2",
                        squarePixels: true,
                        particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "400 0 0",
                        fov: 30
                      }, null)];
                    }
                  }), libs.createComponent(libs.Match, {
                    when: rarity == 4,
                    get children() {
                      return [libs.createElement("DOTAParticleScenePanel", {
                        id: "RedParticle3",
                        squarePixels: true,
                        particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "0 0 200",
                        fov: 30
                      }, null), libs.createElement("DOTAParticleScenePanel", {
                        id: "RedParticle",
                        squarePixels: true,
                        particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "250 0 0",
                        fov: 18
                      }, null), libs.createElement("DOTAParticleScenePanel", {
                        id: "RedParticle2",
                        squarePixels: true,
                        particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                        lookAt: "0 0 0",
                        cameraOrigin: "400 0 0",
                        fov: 30
                      }, null)];
                    }
                  })];
                }
              }), null);
              libs.insert(_el$, libs.createComponent(libs.Show, {
                get when() {
                  return data.origin_item_id != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Conversion",
                    get children() {
                      return [libs.createElement("Image", {
                        id: "ConversionBG"
                      }, null), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "ConversionInfo",
                        get children() {
                          return [libs.createComponent(GenericPanel.CLabel, {
                            id: "TokenCount",
                            get text() {
                              return $.Localize("#Conversion");
                            }
                          }), libs.createComponent(EOM_Image.EOM_Image, {
                            id: "TokenIcon",
                            get src() {
                              return getPayTypeIconPath(data.itemId);
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "TokenCount",
                            get text() {
                              return "×" + data.amounts;
                            }
                          })];
                        }
                      })];
                    }
                  });
                }
              }), null);
              libs.effect(_$p => libs.setProp(_el$1, "className", libs.classNames({
                IsNew: true
              }), _$p));
              return _el$;
            })(), p);
          }
        }));
        seq.actions.push(new WaitAction(0.5));
        seq.actions.push(new RunFunctionAction(() => {
          if (pRewardList) {
            let flipSeqList = new RunStaggeredActions(fFlipTime / 2);
            for (let i = 0; i < pRewardList.GetChildCount(); i++) {
              const p = pRewardList.GetChild(i);
              if (p && LoadData(p, "Flipped") != "1") {
                let GoldParticle = p.FindChildTraverse("GoldParticle");
                let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
                if (GoldParticle && GoldParticle.IsValid()) {
                  GoldParticle.StopParticlesWithEndcaps();
                }
                if (GoldParticle2 && GoldParticle2.IsValid()) {
                  GoldParticle2.StopParticlesWithEndcaps();
                }
                let RedParticle = p.FindChildTraverse("RedParticle");
                let RedParticle2 = p.FindChildTraverse("RedParticle2");
                if (RedParticle && RedParticle.IsValid()) {
                  RedParticle.StopParticlesWithEndcaps();
                }
                if (RedParticle2 && RedParticle2.IsValid()) {
                  RedParticle2.StopParticlesWithEndcaps();
                }
                p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime + "s";
                let flipSeq = new RunSequentialActions();
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p && p.IsValid()) {
                    if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                      p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                    }
                  }
                }));
                flipSeq.actions.push(new WaitAction(fFlipTime / 2));
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                    p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                  }
                }));
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                    Game.EmitSound("playercard.flip");
                  }
                }));
                flipSeq.actions.push(new WaitAction(fFlipTime / 2));
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                    SaveData(p, "Flipped", "1");
                    if (GoldParticle && GoldParticle.IsValid()) {
                      $.Schedule(0.2, () => {
                        Game.EmitSound("ui.treasure_01");
                      });
                      GoldParticle.StartParticles();
                    }
                    if (GoldParticle2 && GoldParticle2.IsValid()) {
                      GoldParticle2.StartParticles();
                    }
                    if (RedParticle && RedParticle.IsValid()) {
                      $.Schedule(0.2, () => {
                        Game.EmitSound("ui.treasure_01");
                      });
                      RedParticle.StartParticles();
                    }
                    if (RedParticle2 && RedParticle2.IsValid()) {
                      RedParticle2.StartParticles();
                    }
                    if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                      setDrawButtonEnable(true);
                    }
                  }
                }));
                flipSeqList.actions.push(flipSeq);
              }
            }
            RunSingleAction(flipSeqList);
          }
        }));
        RunSingleAction(seq);
      }
    }
  };
  const funcRewardShowContinue = () => {
    if (!rewardShow()) return;
    let bBack = true;
    setDrawButtonEnable(true);
    if (pDrawWindow) {
      if (pRewardList) {
        for (let i = 0; i < pRewardList.GetChildCount(); i++) {
          const p = pRewardList.GetChild(i);
          if (p) {
            if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
              SaveData(p, "Flipped", "1");
              let GoldParticle = p.FindChildTraverse("GoldParticle");
              let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
              if (GoldParticle && GoldParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                GoldParticle.StartParticles();
              }
              if (GoldParticle2 && GoldParticle2.IsValid()) {
                GoldParticle2.StartParticles();
              }
              let RedParticle = p.FindChildTraverse("RedParticle");
              let RedParticle2 = p.FindChildTraverse("RedParticle2");
              if (RedParticle && RedParticle.IsValid()) {
                $.Schedule(0.2, () => {
                  Game.EmitSound("ui.treasure_01");
                });
                RedParticle.StartParticles();
              }
              if (RedParticle2 && RedParticle2.IsValid()) {
                RedParticle2.StartParticles();
              }
            }
            if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
              bBack = false;
              p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
              p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
              {
                let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                pNew.AddClass("RewardNew");
              }
              let iRarity = p.iRarity;
              if (iRarity != -1) {
                let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX1");
                scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                  particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                  cameraOrigin: "0 500 -50",
                  lookAt: "0 0 -50",
                  fov: 60,
                  particleonly: true
                });
                scene.AddClass("RewardFX2");
              }
            }
          }
        }
      }
      if (bBack) {
        setRewardShow(false);
        setRewardList([]);
        _removeHidden(BGButtonLists);
        pWillHideList = pWillHideList.filter(v => {
          if (v?.IsValid()) {
            _removeHidden(v);
            return true;
          }
          return false;
        });
      }
    }
  };
  return (() => {
    const _el$11 = libs.createElement("Panel", {}, null);
    libs.insert(_el$11, libs.createComponent(libs.Show, {
      get when() {
        return show();
      },
      get children() {
        return libs.createComponent(EOM_Panel.EOM_Panel, {
          ref(r$) {
            const _ref$ = pDrawPortalRef;
            typeof _ref$ === "function" ? _ref$(r$) : pDrawPortalRef = r$;
          },
          id: "ActivityDrawPortalContainer",
          get children() {
            return [libs.createElement("DOTAParticleScenePanel", {
              hittest: false,
              id: "ActivityDrawPortal",
              startActive: false,
              light: "light",
              camera: "camera_top",
              map: "scene/draw_open",
              particleonly: false,
              squarePixels: true,
              particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_2.vpcf",
              fov: 90,
              cameraOrigin: "0 0 900",
              lookAt: "0 0 0"
            }, null), libs.createElement("DOTAParticleScenePanel", {
              hittest: false,
              id: "ActivityDrawPortalGold",
              startActive: false,
              light: "light",
              camera: "camera_top",
              map: "scene/draw_open",
              renderdeferred: false,
              deferredalpha: true,
              particleonly: false,
              squarePixels: true,
              particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_gold.vpcf",
              fov: 90,
              cameraOrigin: "0 0 900",
              lookAt: "0 0 0"
            }, null), libs.createElement("DOTAParticleScenePanel", {
              hittest: false,
              id: "ActivityDrawPortalRed",
              startActive: false,
              light: "light",
              camera: "camera_top",
              map: "scene/draw_open",
              renderdeferred: false,
              deferredalpha: true,
              particleonly: false,
              squarePixels: true,
              particleName: "particles/eom/events/tunvlang_draw_portal/tunvlang_draw_portal_red.vpcf",
              fov: 90,
              cameraOrigin: "0 0 900",
              lookAt: "0 0 0"
            }, null)];
          }
        });
      }
    }), null);
    libs.insert(_el$11, libs.createComponent(EOM_Panel.EOM_Panel, {
      id: "BGLayer",
      ref: self => AddWillHide(self),
      hittest: false,
      get children() {
        return [libs.createComponent(EOM_PortraitFullBody.EOM_PortraitFullBody, {
          id: "EarthshakerMachineModel",
          unitname: "5100051",
          allowrotation: false,
          showPedestal: false,
          hittest: false
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "ActivityInfoButton",
          onmouseover: self => {
            if (language != "schinese") {
              ShowCustomTooltip(self, "long_text", {
                text: "#Activity_dai_infodesc"
              });
            } else {
              $.DispatchEvent("DOTAShowTextTooltip", self, "#Activity_dai_infodesc");
            }
          },
          onmouseout: self => {
            if (language != "schinese") {
              HideCustomTooltip(self, "long_text");
            } else {
              $.DispatchEvent("DOTAHideTextTooltip", self);
            }
          }
        }), libs.createComponent(InfoButton.InfoButton, {
          className: language,
          info: "#PoolInfo",
          tooltip: "#Activity_Earthershaker_infodesc"
        }), libs.createComponent(EOM_Image.EOM_Image, {
          id: "ActivityTitle",
          className: language,
          hittest: false
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "ActivityCountdown",
          className: language,
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              align: "center center",
              flowChildren: "right",
              get children() {
                return [libs.createComponent(EOM_Image.EOM_Image, {
                  id: "timeIcon"
                }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                  get endTime() {
                    return Number(props.pool_data.endTime);
                  },
                  text: "#countdown_time"
                })];
              }
            });
          }
        }), libs.createComponent(EOM_Icon.EOM_Icon, {
          id: "PoolInfoIcon",
          className: language,
          size: "24",
          get src() {
            return getSrcPath("icon/c_info.png");
          },
          customTooltip: {
            name: "custom_text",
            text: "#Activity_Earthershaker_poolchance"
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return nextUpNeedCount() != undefined;
          },
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "DropBanner",
              hittest: false,
              get children() {
                return libs.createComponent(GenericPanel.CLabel, {
                  text: "#Activity_Earthershaker_chanceup",
                  get dialogVariables() {
                    return {
                      count: nextUpNeedCount()
                    };
                  },
                  html: true
                });
              }
            });
          }
        }), libs.createComponent(EOM_Button.EOM_Button, {
          id: "ActivityExchangeButton",
          get className() {
            return $.Language().toLowerCase();
          },
          text: `#Store_Exchange_Button`,
          onactivate: () => props.OnOpenExchange()
        })];
      }
    }), null);
    libs.insert(_el$11, libs.createComponent(EOM_Panel.EOM_Panel, {
      ref(r$) {
        const _ref$2 = BGButtonLists;
        typeof _ref$2 === "function" ? _ref$2(r$) : BGButtonLists = r$;
      },
      id: "DrawButtonList",
      get children() {
        return [libs.createComponent(ActivityDrawButton, {
          get enable() {
            return drawButtonEnable();
          },
          get ticket() {
            return boxToken();
          },
          discountToken: 0,
          count: 1,
          get boxID() {
            return props.pool_data.bid;
          },
          drawCallback: Draw
        }), libs.createComponent(ActivityDrawButton, {
          get enable() {
            return drawButtonEnable();
          },
          get ticket() {
            return boxToken();
          },
          discountToken: 0,
          count: 10,
          get boxID() {
            return props.pool_data.bid;
          },
          drawCallback: Draw
        })];
      }
    }), null);
    libs.insert(_el$11, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "SkipButton",
      ref: self => AddWillHide(self),
      get ["class"]() {
        return libs.classNames("SkipButton", {
          Active: willSkip()
        });
      },
      onactivate: () => setWillSkip(v => !v),
      get children() {
        return [libs.createComponent(EOM_Icon.EOM_Icon, {
          id: "Square",
          get src() {
            return getSrcPath("draw/c_square.png");
          }
        }), libs.createComponent(EOM_Icon.EOM_Icon, {
          id: "Hook",
          get src() {
            return getSrcPath("draw/c_hook.png");
          }
        }), libs.createComponent(GenericPanel.CLabel, {
          text: "#Skip_Button"
        })];
      }
    }), null);
    libs.insert(_el$11, libs.createComponent(EOM_Panel.EOM_Panel, {
      get className() {
        return libs.classNames("DrawCardResultWindow", {
          Show: rewardShow()
        });
      },
      ref(r$) {
        const _ref$3 = pDrawWindow;
        typeof _ref$3 === "function" ? _ref$3(r$) : pDrawWindow = r$;
      },
      acceptsfocus: true,
      get children() {
        return [libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "ResultContainer",
          get children() {
            return libs.createComponent(EOM_Panel.EOM_Panel, {
              ref(r$) {
                const _ref$4 = pRewardList;
                typeof _ref$4 === "function" ? _ref$4(r$) : pRewardList = r$;
              },
              id: "RewardList",
              hittest: false
            });
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "DrawButtonList",
          get children() {
            return [libs.createComponent(ActivityDrawButton, {
              get enable() {
                return drawButtonEnable();
              },
              get ticket() {
                return boxToken();
              },
              discountToken: 0,
              count: 1,
              get boxID() {
                return props.pool_data.bid;
              },
              drawCallback: Draw
            }), libs.createComponent(ActivityDrawButton, {
              get enable() {
                return drawButtonEnable();
              },
              get ticket() {
                return boxToken();
              },
              discountToken: 0,
              count: 10,
              get boxID() {
                return props.pool_data.bid;
              },
              drawCallback: Draw
            })];
          }
        })];
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$11, "className", libs.classNames("EarthshakerMachineDraw"), _$p));
    return _el$11;
  })();
};
const ActivityDrawButton = props => {
  const costInfo = libs.createMemo(() => {
    const single = 1;
    let origin_cost = single * props.count;
    let real_cost = origin_cost;
    if (props.discountToken > 0) {
      real_cost -= Math.min(props.count, props.discountToken) * single * 0.5;
    }
    return {
      origin_cost,
      real_cost,
      discount: origin_cost != real_cost
    };
  });
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get className() {
      return libs.classNames("ActivityDrawButton", "Count" + props.count);
    },
    get enabled() {
      return props.enable;
    },
    onactivate: () => {
      if (props.ticket >= costInfo().real_cost) {
        props.drawCallback(props.count);
      } else {
        let count = costInfo().real_cost - props.ticket;
        clientSideEvent("directly_purchase", {
          itemid: 9900280,
          count
        });
      }
    },
    get children() {
      return [libs.createComponent(EOM_Label.EOM_Label, {
        id: "DrawLabel",
        get text() {
          return "#Draw_Acitivity_Action_" + props.count;
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        id: "cost",
        get children() {
          return [libs.createComponent(EOM_Icon.EOM_Icon, {
            width: "40px",
            height: "40px",
            get src() {
              return getSrcPath("tokens/" + props.boxID + ".png");
            }
          }), libs.createComponent(EOM_Panel.EOM_Panel, {
            width: "100%",
            height: "100%",
            flowChildren: "right",
            get children() {
              return libs.createComponent(EOM_Label.EOM_Label, {
                className: "TicketLabel",
                verticalAlign: "center",
                get text() {
                  return costInfo().real_cost;
                }
              });
            }
          })];
        }
      })];
    }
  });
};

if (!isSpectator()) {
  let fFlipTime = 0.5;
  const language = $.Language().toLowerCase();
  const isActivityPoolBlackListed = pool => {
    return pool.toString().startsWith('991');
  };
  const isGoldCourierPool = pool => {
    return pool.drop.startsWith('courier_pool_gold_');
  };
  const isMoonPool = pool => {
    return pool.bid == 2000002;
  };
  const isActivityPool = pool => {
    return pool.bid == 2000003;
  };
  const ActivityPoolExchangeTag = {
    [99100002]: "qingtian"
  };
  const RedActivityPoolList = [99100002, 91000078];
  const [show, setShow] = libs.createSignal(false);
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  const [exchangeShow, setExchangeShow] = libs.createSignal(false);
  const [exchangeTopId, setExchangeTopId] = libs.createSignal(-1);
  let ExchangeItemToPoolIndexList = {};
  const [isToolMode, setIsToolMode] = libs.createSignal((CustomNetTables.GetTableValue("common", "settings")?.is_in_tools_mode ?? 0) == 1);
  const [info_box_pool_data, setInfoBoxPoolData] = libs.createSignal();
  const [cardPoolList, setCardPoolList] = libs.createSignal([]);
  const GoldCourierPoolList = {
    includes: poolID => {
      return cardPoolList().some(pool => pool.pool == poolID && isGoldCourierPool(pool));
    }
  };
  libs.createEffect(() => {
    const pool_list = [];
    const static_info_box_pool_data = info_box_pool_data();
    const timeStamp = Math.floor(Date.now() / 1000);
    if (static_info_box_pool_data != undefined) {
      static_info_box_pool_data.forEach((data, index) => {
        let type = data.pool.toString().slice(0, 3);
        const pool = data.pool;
        const name = data.name;
        const currency = data.exchange_currency_id;
        const endTime = data.end_time.toString();
        const startTime = data.start_time;
        const orderby = data.orderby ?? 0;
        const open_luck = data.open_luck ?? 0;
        let bid = data.bid;
        const drop = data.drop_content;
        const nEndTime = Number(endTime);
        const nStartTime = Number(startTime);
        if (bid != -1 && (nStartTime == 0 || timeStamp >= Number(nStartTime)) && (nEndTime == 0 || timeStamp < Number(endTime))) {
          if (isActivityPoolBlackListed(pool)) {
            return;
          }
          if (type == "910") {
            pool_list.push({
              pool,
              name,
              bid,
              currency,
              endTime,
              orderby,
              open_luck,
              drop,
              type: "normal"
            });
          }
        }
      });
    }
    pool_list.sort((a, b) => multiCompare(a.orderby - b.orderby, b.pool - a.pool));
    const goldHeroIndex = pool_list.findIndex(pool => pool.pool == 91000014);
    const goldCourierIndex = pool_list.findIndex(isGoldCourierPool);
    if (goldHeroIndex != -1 && goldCourierIndex != -1) {
      [pool_list[goldHeroIndex], pool_list[goldCourierIndex]] = [pool_list[goldCourierIndex], pool_list[goldHeroIndex]];
    }
    setCardPoolList(pool_list);
  });
  let luckInitedList = [];
  libs.createEffect(() => {
    const current_cardPoolList = cardPoolList();
    if (current_cardPoolList.length > 0) {
      for (let i = 0; i < current_cardPoolList.length; i++) {
        const element = current_cardPoolList[i];
        if (element.open_luck == 1 && !luckInitedList.includes(element.pool)) {
          luckInitedList.push(element.pool);
          callAction("box_luck", {
            bid: element.bid,
            pool: element.pool
          });
        }
      }
    }
  });
  libs.createEffect(libs.on(show, _show => {
    if (!_show) {
      setExchangeShow(false);
    }
  }));
  libs.createEffect(libs.on(cardPoolList, card_pool_list => {
    setClientGlobalData("menu_bar_draw_pools", card_pool_list.map(pool => ({
      id: pool.pool,
      label: pool.pool.toString()
    })), true);
    if (card_pool_list.length == 0) {
      setSelectedIndex(0);
      return;
    }
    setSelectedIndex(prev => {
      if (prev < 0) {
        return 0;
      }
      if (prev >= card_pool_list.length) {
        return card_pool_list.length - 1;
      }
      return prev;
    });
  }));
  libs.onMount(() => {
    const NetTableIDList = [];
    const gameEventListeners = [];
    gameEventListeners.push(useToggleWindow("MenuButton_draw", show, setShow));
    gameEventListeners.push(useClientSideEvent("switchDrawPool", data => {
      if (data && data.pid) {
        const pid = finiteNumber(Number(data.pid));
        let poolList = cardPoolList().map((data, _) => data.pool);
        let index = poolList.indexOf(pid);
        if (index != -1) {
          setSelectedIndex(index);
        } else if (data.pid == 91000001) {
          for (let index = cardPoolList().length - 1; index >= 0; index--) {
            if (isGoldCourierPool(cardPoolList()[index])) {
              setSelectedIndex(index);
              break;
            }
          }
        }
      }
    }));
    gameEventListeners.push(useClientSideEvent("openDrawExchange", data => {
      const mappedIndex = ExchangeItemToPoolIndexList[data.itemId];
      if (mappedIndex != undefined && cardPoolList()[mappedIndex] != undefined) {
        let index = mappedIndex;
        if (index != -1) {
          setSelectedIndex(index);
        }
      }
      if (data && data.state) {
        setExchangeShow(true);
      }
      if (data && data.itemId) {
        setExchangeTopId(Number(data.itemId));
      }
    }));
    gameEventListeners.push(useNetData("info_box_pool_data", data => {
      setInfoBoxPoolData(data.filter(v => v.pool.toString().indexOf("930") != 0));
    }));
    NetTableIDList.push(useNetTableKey("common", "settings", data => {
      setIsToolMode(data.is_in_tools_mode == 1);
    }));
    libs.onCleanup(() => {
      gameEventListeners.forEach(id => GameEvents.Unsubscribe(id));
      NetTableIDList.forEach(id => CustomNetTables.UnsubscribeNetTableListener(id));
    });
  });
  const CenterCardPopup = (self, delay = 0) => {
    let seq = new RunSequentialActions();
    if (delay > 0) {
      seq.actions.push(new WaitAction(delay));
    }
    seq.actions.push(new AddClassAction(self, "ShowAnim"));
    seq.actions.push(new WaitAction(1));
    seq.actions.push(new AddClassAction(self, "Idle"));
    RunSingleAction(seq);
  };
  const SideCardPopup = (self, delay = 0.5) => {
    let seq = new RunSequentialActions();
    if (delay > 0) {
      seq.actions.push(new WaitAction(delay));
    }
    seq.actions.push(new AddClassAction(self, "ShowAnim"));
    seq.actions.push(new WaitAction(0.5));
    seq.actions.push(new RemoveClassAction(self, "ShowAnim"));
    seq.actions.push(new AddClassAction(self, "Idle"));
    RunSingleAction(seq);
  };
  const box_up_time = {
    [91000011]: {
      start_time: 1714060800,
      end_time: -1
    },
    [91000024]: {
      start_time: 0,
      end_time: -1
    }
  };
  const DrawMain = () => {
    const player_boxes = netdata_utils.createPlayerNetData("player_boxes", Players.GetLocalPlayer(), {});
    const playerBoxLuck = netdata_utils.createPlayerNetData("player_box_luck", Players.GetLocalPlayer(), {});
    const playerOrnament = netdata_utils.createPlayerNetData("player_ornament", Players.GetLocalPlayer(), {});
    const playerHero = netdata_utils.createPlayerNetData("player_hero", Players.GetLocalPlayer(), {});
    const [paymentOpen, setPaymentOpen] = libs.createSignal(false);
    const [storeItemData, setStoreItemData] = libs.createSignal([]);
    const [purchased_product, setPurchasedProduct] = libs.createSignal({});
    const [info_box_content, setInfoBoxContent] = libs.createSignal();
    const isTiedPrizePool = pool => {
      if (!isMoonPool(pool) && !isActivityPool(pool)) {
        return false;
      }
      let ssrCount = 0;
      for (const reward of info_box_content()?.[pool.drop] ?? []) {
        if (reward.rarity == 'ssr') {
          ssrCount++;
          if (ssrCount >= 2) {
            return true;
          }
        }
      }
      return false;
    };
    const storeItemDataSorted = () => {
      return storeItemData().sort((a, b) => {
        let atop = a.id == exchangeTopId() ? 0 : 1;
        let btop = b.id == exchangeTopId() ? 0 : 1;
        return multiCompare(atop - btop, a.order_by - b.order_by);
      });
    };
    libs.createEffect(() => {
      const current_storeItemData = storeItemData();
      const static_info_box_pool_data = info_box_pool_data() ?? [];
      const current_cardPoolList = cardPoolList();
      if (current_cardPoolList.length > 0 && current_storeItemData.length > 0 && static_info_box_pool_data.length > 0) {
        ExchangeItemToPoolIndexList = {};
        let poolIndex = {};
        current_cardPoolList.forEach((data, i) => {
          poolIndex[data.pool] = i;
        });
        let exchangeIDToPool = {};
        static_info_box_pool_data.forEach((data, i) => {
          if (poolIndex[data.pool] != undefined) {
            if (exchangeIDToPool[data.exchange_currency_id] == undefined) {
              exchangeIDToPool[data.exchange_currency_id] = data.pool;
            }
          }
        });
        current_storeItemData.forEach((data, i) => {
          if (exchangeIDToPool[data.pay_type] != undefined) {
            ExchangeItemToPoolIndexList[data.id.toString()] = poolIndex[exchangeIDToPool[data.pay_type]];
          }
        });
      }
    });
    const getRarity = (drop, itemID, amount) => {
      let rarity = 0;
      let gotten = false;
      let type = Number(itemID.toString().slice(0, 3));
      let content = info_box_content();
      if (content && content[drop]) {
        for (const v of content[drop]) {
          if (v.item_id == itemID) {
            if (type == 110) {
              if (amount >= v.amount_min && amount <= v.amount_max) {
                if (v.rarity == "n") {
                  rarity = 0;
                  gotten = true;
                } else if (v.rarity == "r") {
                  rarity = 1;
                  gotten = true;
                } else if (v.rarity == "sr") {
                  rarity = 2;
                  gotten = true;
                } else if (v.rarity == "ssr") {
                  rarity = 3;
                  gotten = true;
                }
              }
            } else {
              if (v.rarity == "n") {
                rarity = 0;
                gotten = true;
              } else if (v.rarity == "r") {
                rarity = 1;
                gotten = true;
              } else if (v.rarity == "sr") {
                rarity = 2;
                gotten = true;
              } else if (v.rarity == "ssr") {
                rarity = 3;
                gotten = true;
              }
            }
            if (gotten) break;
          }
        }
      }
      return rarity;
    };
    netdata_utils.createNetDataEffect("info_box_content", data => {
      if (data) {
        let content = {};
        for (const drop in data) {
          if (drop != "bunny girl_pool_1") {
            content[drop] = data[drop];
          }
        }
        setInfoBoxContent(content);
      }
    }, undefined);
    netdata_utils.createNetDataEffect("info_shop_product_group_by_tag", data => {
      let result = [];
      let ActivityExchangeTag = {};
      cardPoolList().forEach(v => {
        if (ActivityPoolExchangeTag[v.pool]) {
          ActivityExchangeTag[ActivityPoolExchangeTag[v.pool]] = true;
        }
      });
      if (data) {
        for (const tag in data) {
          if (ActivityExchangeTag[tag] == true) {
            result = result.concat(data[tag]);
          } else if (tag != "MeijiRedeem" && tag != "TutuRedeem" && tag.includes("Redeem")) {
            result = result.concat(data[tag]);
          }
        }
      }
      setStoreItemData(result);
    }, undefined, [cardPoolList]);
    libs.onMount(() => {
      let gameEventListeners = [];
      gameEventListeners.push(useClientSideEvent("close_draw_reward_windows", data => {
        if (data.state == 1) {
          funcRewardShowContinue();
        }
      }));
      gameEventListeners.push(useNetData("player_purchased_products", data => {
        setPurchasedProduct(data.purchased_products);
      }, Players.GetLocalPlayer()));
      gameEventListeners.push(useNetData("open_payment", data => {
        setPaymentOpen(data.open);
      }, Players.GetLocalPlayer()));
      gameEventListeners.push(GameEvents.Subscribe("custom_callback", tData => {
        if (tData.event == "draw_1") {
          Draw(1);
        }
        if (tData.event == "draw_10") {
          Draw(10);
        }
      }));
      const timer_poolElimination = setInterval(() => {
        if (!show() || !paymentOpen()) {
          return;
        }
        let changed = false;
        const timeStamp = Math.floor(Date.now() / 1000);
        const cardPool = cardPoolList().filter((data, index) => {
          const nEndTime = Number(data.endTime);
          if (nEndTime == 0 || timeStamp < nEndTime) {
            return true;
          } else {
            changed = true;
          }
        });
        if (box_up_time) {
          cardPool.map((data, index) => {
            if (box_up_time[data.pool] != undefined) {
              if (timeStamp > box_up_time[data.pool].start_time) {
                if (box_up_time[data.pool].end_time == 0) {
                  if (!data.up) {
                    box_up_time[data.pool].end_time = Number(data.endTime);
                    changed = true;
                    data.up = true;
                    return data;
                  }
                } else if (timeStamp < box_up_time[data.pool].end_time) {
                  if (!data.up) {
                    changed = true;
                    data.up = true;
                  }
                  return data;
                }
              }
            }
            if (data.up) {
              changed = true;
              data.up = false;
            }
            return data;
          });
        }
        if (changed) {
          setCardPoolList(cardPool);
        }
      }, 1000);
      libs.onCleanup(() => {
        for (const id of gameEventListeners) {
          GameEvents.Unsubscribe(id);
        }
        clearInterval(timer_poolElimination);
      });
    });
    const cardPool = () => cardPoolList()[selectedIndex()];
    libs.createEffect(() => {
      console.log("isTiedPrizePool(cardPool())", isTiedPrizePool(cardPool()), cardPool());
    });
    const selectedCardPoolType = () => cardPool()?.type ?? "none";
    let centerContentRef;
    let PoolListRef;
    let CurrencyGroupRef;
    const [drawButtonEnable, setDrawButtonEnable] = libs.createSignal(true);
    const [rewardShow, setRewardShow] = libs.createSignal(false);
    const [rewardList, setRewardList] = libs.createSignal([]);
    const [rewardDrop, setRewardDrop] = libs.createSignal("");
    const [drawEnd, setDrawEnd] = libs.createSignal(false);
    const [drawSuccess, setDrawSuccess] = libs.createSignal(false);
    const [drawSoundIndex, setDrawSoundIndex] = libs.createSignal(-1);
    let pDrawWindow;
    const [willSkip, setWillSkip] = libs.createSignal(false);
    const handledRewardData = libs.createMemo(() => {
      const list = [];
      let hasSSR = false;
      const current_rewardList = rewardList();
      current_rewardList.forEach((data, index) => {
        let itemID = data.origin_item_id ?? data.itemId;
        let drop = rewardDrop();
        let rarity = 0;
        if (data.origin_item_id == undefined) {
          rarity = getRarity(drop, itemID, data.amounts);
        } else {
          rarity = getRarity(drop, data.origin_item_id, data.amounts);
        }
        list.push({
          itemId: data.itemId,
          rarity,
          origin_item_id: data.origin_item_id,
          amounts: data.amounts
        });
        if (rarity == 3) {
          hasSSR = true;
        }
      });
      return {
        list,
        hasSSR
      };
    });
    libs.createEffect(libs.on(show, showed => {
      if (showed && !rewardShow() && handledRewardData().list.length > 0) {
        showDrawRewards(handledRewardData().list);
      }
    }));
    const endDrawAnimation = (soundIndex, clickSkip = false) => {
      if (soundIndex == -1) return;
      if (soundIndex != drawSoundIndex()) return;
      Game.StopSound(soundIndex);
      setDrawSoundIndex(-1);
      if (show() && !rewardShow()) {
        $("#DrawPortal").StopParticlesWithEndcaps();
        $("#DrawPortalGold").StopParticlesWithEndcaps();
        $("#DrawPortal").style.opacity = "1";
        $("#DrawPortalGold").style.opacity = "0";
        Game.EmitSound("ui.portal_close");
        centerContentRef.RemoveClass("DrawCardAnim");
        showDrawRewards(handledRewardData().list);
        if (clickSkip) {
          $.Schedule(0.2, () => {
            if (rewardShow()) funcRewardShowContinue();
          });
        }
        if (!drawSuccess()) {
          funcRewardShowContinue();
          showPopup("ErrorMessage", {
            msg: "#ErrorMessage_DrawFailure"
          });
        }
      }
    };
    const Draw = count => {
      if (cardPoolList()[selectedIndex()] != undefined) {
        setDrawEnd(false);
        setDrawButtonEnable(false);
        setRewardList([]);
        setRewardDrop("");
        let seq = new RunSequentialActions();
        if (rewardShow()) {
          setRewardShow(false);
        }
        let index = -1;
        seq.actions.push(new RunFunctionAction(() => {
          if (show()) {
            CurrencyGroupRef.AddClass("Hidden");
            $("#ExchangeButton")?.AddClass("Hidden");
            $("#SkipButton")?.AddClass("Hidden");
            $("#PoolInfo")?.AddClass("Hidden");
            let pDrawLuckOrb = $("#DrawLuckOrb");
            if (pDrawLuckOrb?.IsValid()) {
              pDrawLuckOrb.AddClass("Hidden");
            }
            centerContentRef.AddClass("DrawCardAnim");
            centerContentRef.AddClass("DrawCardHideUI");
            $("#DrawPortal")?.StartParticles();
            $("#DrawPortalGold")?.StartParticles();
            index = Game.EmitSound("ui.portal_open");
            setDrawSoundIndex(index);
          }
        }));
        if (willSkip()) {
          seq.actions.push(new WaitForConditionAction(() => {
            if (index != drawSoundIndex()) {
              return true;
            }
            if (handledRewardData().list.length > 0 || drawEnd()) {
              endDrawAnimation(index, true);
              return true;
            }
            return false;
          }));
        } else {
          seq.actions.push(new WaitAction(1));
          seq.actions.push(new RunFunctionAction(() => {
            if (index != drawSoundIndex()) {
              return;
            }
            if (show()) {
              centerContentRef.AddClass("DrawCardHideCard");
            }
          }));
          seq.actions.push(new WaitAction(0.5));
          seq.actions.push(new WaitForConditionAction(() => {
            if (index != drawSoundIndex()) {
              return true;
            }
            if (handledRewardData().list.length > 0 || drawEnd()) {
              if (handledRewardData().hasSSR) {
                if ($("#DrawPortal")?.IsValid()) {
                  $("#DrawPortal").style.opacity = "0";
                }
                if ($("#DrawPortalGold")?.IsValid()) {
                  $("#DrawPortalGold").style.opacity = "1";
                }
              }
              return true;
            }
            return false;
          }));
          seq.actions.push(new WaitAction(1));
          seq.actions.push(new RunFunctionAction(() => {
            endDrawAnimation(index);
          }));
        }
        RunSingleAction(seq);
        let bid = cardPoolList()[selectedIndex()].bid;
        let pool = cardPoolList()[selectedIndex()].pool;
        let drop_content = cardPoolList()[selectedIndex()].drop;
        serverRequest("box_open", {
          bid: bid,
          pool: pool,
          amounts: count
        }, data => {
          if (data.status == 0 && data?.data != undefined) {
            setRewardDrop(drop_content);
            setRewardList(data.data);
            setDrawSuccess(true);
          } else {
            setDrawSuccess(false);
          }
          setDrawEnd(true);
        });
      } else {
        ErrorMessage("#HandBook_Sub_Nav_Lose");
      }
    };
    const showDrawRewards = items => {
      if (pDrawWindow) {
        let pRewardList = pDrawWindow.FindChildTraverse("RewardList");
        let disposeArr = LoadData(pRewardList, "_SOLIDJS_DISPOSE_");
        if (disposeArr && Array.isArray(disposeArr)) {
          disposeArr.forEach(v => v());
        }
        SaveData(pRewardList, "_SOLIDJS_DISPOSE_", undefined);
        pRewardList.RemoveAndDeleteChildren();
        setRewardShow(true);
        let seq = new RunSequentialActions();
        seq.actions.push(new RunFunctionAction(() => {
          let newDisposeList = [];
          const count = items.length;
          for (let i = 0; i < count; i++) {
            const data = items[i];
            let itemID = data.origin_item_id ?? data.itemId;
            let rarity = data.rarity;
            let p = $.CreatePanel("Panel", pRewardList, "");
            p.AddClass("AwardItem");
            if (count == 1) {
              p.AddClass("Single");
            } else {
              p.AddClass("Multi" + (i + 1));
            }
            p.AddClass("Rarity" + rarity);
            SaveData(p, "iRarity", rarity);
            newDisposeList.push(libs.render(() => (() => {
              const _el$ = libs.createElement("Panel", {
                  id: "AwardItemContainer"
                }, null),
                _el$2 = libs.createElement("Panel", {}, _el$),
                _el$3 = libs.createElement("Panel", {}, _el$),
                _el$4 = libs.createElement("Panel", {}, _el$),
                _el$8 = libs.createElement("Panel", {}, _el$);
              libs.setProp(_el$2, "className", "AwardBG");
              libs.setProp(_el$3, "className", "New");
              libs.setProp(_el$4, "className", "Mask");
              libs.insert(_el$4, libs.createComponent(ProductItem.ProductItem, {
                id: "StoreItemImage",
                itemid: itemID,
                rarity: rarity,
                get count() {
                  return data.origin_item_id == undefined ? data.amounts : 1;
                }
              }), null);
              libs.insert(_el$4, libs.createComponent(CosmeticCard.CosmeticImage, {
                hittest: false,
                width: "200px",
                height: "200px",
                y: "-10px",
                align: "center center",
                get itemid() {
                  return itemID.toString();
                }
              }), null);
              libs.insert(_el$4, libs.createComponent(libs.Show, {
                when: rarity == 3,
                get children() {
                  return [(() => {
                    const _el$5 = libs.createElement("DOTAParticleScenePanel", {
                      particleName: "particles/eom/ui/card_fx/card_star_fx.vpcf",
                      lookAt: "0 0 0",
                      cameraOrigin: "0 0 200",
                      fov: 30
                    }, null);
                    libs.setProp(_el$5, "style", {
                      width: "260px",
                      height: "260px",
                      align: "center center"
                    });
                    return _el$5;
                  })(), libs.createElement("DOTAParticleScenePanel", {
                    id: "GoldParticle",
                    particleName: "particles/eom/events/draw_open/draw_open_ssrc.vpcf",
                    lookAt: "0 0 0",
                    cameraOrigin: "250 0 0",
                    fov: 24
                  }, null), libs.createElement("DOTAParticleScenePanel", {
                    id: "GoldParticle2",
                    particleName: "particles/eom/events/draw_open/draw_open_ssr.vpcf",
                    lookAt: "0 0 0",
                    cameraOrigin: "400 0 0",
                    fov: 30
                  }, null)];
                }
              }), null);
              libs.insert(_el$, libs.createComponent(libs.Show, {
                get when() {
                  return data.origin_item_id != undefined;
                },
                get children() {
                  return libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "Conversion",
                    get children() {
                      return [libs.createComponent(GenericPanel.CImage, {
                        id: "ConversionBG"
                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "ConversionInfo",
                        get children() {
                          return [libs.createComponent(GenericPanel.CLabel, {
                            id: "TokenCount",
                            get text() {
                              return $.Localize("#Conversion");
                            }
                          }), libs.createComponent(EOM_Image.EOM_Image, {
                            id: "TokenIcon",
                            get src() {
                              return getPayTypeIconPath(data.itemId);
                            }
                          }), libs.createComponent(GenericPanel.CLabel, {
                            id: "TokenCount",
                            get text() {
                              return "×" + data.amounts;
                            }
                          })];
                        }
                      })];
                    }
                  });
                }
              }), null);
              libs.effect(_$p => libs.setProp(_el$8, "className", libs.classNames({
                IsNew: true
              }), _$p));
              return _el$;
            })(), p));
          }
          SaveData(pRewardList, "_SOLIDJS_DISPOSE_", newDisposeList);
        }));
        seq.actions.push(new WaitAction(0.5));
        seq.actions.push(new RunFunctionAction(() => {
          if (pRewardList) {
            let flipSeqList = new RunStaggeredActions(fFlipTime / 2);
            for (let i = 0; i < pRewardList.GetChildCount(); i++) {
              const p = pRewardList.GetChild(i);
              if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                let GoldParticle = p.FindChildTraverse("GoldParticle");
                let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
                if (GoldParticle && GoldParticle.IsValid()) {
                  GoldParticle.StopParticlesWithEndcaps();
                }
                if (GoldParticle2 && GoldParticle2.IsValid()) {
                  GoldParticle2.StopParticlesWithEndcaps();
                }
                p.FindChildTraverse("AwardItemContainer").style.animationDuration = fFlipTime + "s";
                let flipSeq = new RunSequentialActions();
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p && p.IsValid()) {
                    if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                      p.FindChildTraverse("AwardItemContainer").AddClass("AwardAnim");
                    }
                  }
                }));
                flipSeq.actions.push(new WaitAction(fFlipTime / 2));
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p?.IsValid() && p.FindChildTraverse("AwardItemContainer")?.IsValid()) {
                    p.FindChildTraverse("AwardItemContainer")?.AddClass("AwardShow");
                  }
                }));
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                    Game.EmitSound("playercard.flip");
                  }
                }));
                flipSeq.actions.push(new WaitAction(fFlipTime / 2));
                flipSeq.actions.push(new RunFunctionAction(() => {
                  if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                    SaveData(p, "Flipped", "1");
                    if (GoldParticle && GoldParticle.IsValid()) {
                      $.Schedule(0.2, () => {
                        Game.EmitSound("ui.treasure_01");
                      });
                      GoldParticle.StartParticles();
                    }
                    if (GoldParticle2 && GoldParticle2.IsValid()) {
                      GoldParticle2.StartParticles();
                    }
                    if (pRewardList?.IsValid() && i == pRewardList.GetChildCount() - 1) {
                      setDrawButtonEnable(true);
                    }
                  }
                }));
                flipSeqList.actions.push(flipSeq);
              }
            }
            RunSingleAction(flipSeqList);
          }
        }));
        RunSingleAction(seq);
      }
    };
    const funcRewardShowContinue = () => {
      if (!rewardShow()) return;
      let bBack = true;
      setDrawButtonEnable(true);
      if (pDrawWindow?.IsValid()) {
        let pRewardList = pDrawWindow.FindChildTraverse("RewardList");
        if (pRewardList) {
          for (let i = 0; i < pRewardList.GetChildCount(); i++) {
            const p = pRewardList.GetChild(i);
            if (p) {
              if (p && p.IsValid() && LoadData(p, "Flipped") != "1") {
                SaveData(p, "Flipped", "1");
                let GoldParticle = p.FindChildTraverse("GoldParticle");
                let GoldParticle2 = p.FindChildTraverse("GoldParticle2");
                if (GoldParticle && GoldParticle.IsValid()) {
                  $.Schedule(0.2, () => {
                    Game.EmitSound("ui.treasure_01");
                  });
                  GoldParticle.StartParticles();
                }
                if (GoldParticle2 && GoldParticle2.IsValid()) {
                  GoldParticle2.StartParticles();
                }
              }
              if (!p.FindChildTraverse("AwardItemContainer").BHasClass("AwardShow")) {
                bBack = false;
                p.FindChildTraverse("AwardItemContainer").RemoveClass("AwardAnim");
                p.FindChildTraverse("AwardItemContainer").AddClass("AwardShow");
                {
                  let pNew = $.CreatePanel("Panel", p.FindChildTraverse("AwardItemContainer"), "");
                  pNew.AddClass("RewardNew");
                }
                let iRarity = p.iRarity;
                if (iRarity != -1) {
                  let scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                    particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                    cameraOrigin: "0 500 -50",
                    lookAt: "0 0 -50",
                    fov: 60,
                    particleonly: true
                  });
                  scene.AddClass("RewardFX1");
                  scene = $.CreatePanel("DOTAParticleScenePanel", p.FindChildTraverse("AwardItemContainer"), "", {
                    particleName: `particles/ui/draw_reward_${iRarity}.vpcf`,
                    cameraOrigin: "0 500 -50",
                    lookAt: "0 0 -50",
                    fov: 60,
                    particleonly: true
                  });
                  scene.AddClass("RewardFX2");
                }
              }
            }
          }
        }
        if (bBack) {
          setRewardShow(false);
          setRewardList([]);
          setRewardDrop("");
          centerContentRef.RemoveClass("DrawCardHideCard");
          centerContentRef.RemoveClass("DrawCardHideUI");
          CurrencyGroupRef.RemoveClass("Hidden");
          $("#ExchangeButton")?.RemoveClass("Hidden");
          $("#PoolInfo")?.RemoveClass("Hidden");
          $("#SkipButton")?.RemoveClass("Hidden");
          let pDrawLuckOrb = $("#DrawLuckOrb");
          if (pDrawLuckOrb?.IsValid()) {
            pDrawLuckOrb.RemoveClass("Hidden");
          }
        }
      }
    };
    const [previewInfo, setPreviewInfo] = libs.createSignal({
      cid: -1,
      eid: -1
    });
    let previewTimer = -1;
    libs.createEffect(libs.on(exchangeShow, _show => {
      if (!_show) {
        setPreviewInfo({
          cid: -1,
          eid: -1
        });
        setExchangeTopId(-1);
      } else {
        const currentCardPool = cardPool();
        if (currentCardPool == undefined) {
          return;
        }
        for (const storeItem of storeItemDataSorted()) {
          if (storeItem.pay_type == currentCardPool.currency) {
            if (storeItem?.items?.[0]) {
              const cid = storeItem.items[0].item_id.toString();
              if (KeyValues.CosmeticsKv?.[cid] != undefined) {
                setPreviewInfo({
                  cid: storeItem.items[0].item_id,
                  eid: -1
                });
                break;
              }
              if (cid.slice(0, 3) == "300" && cid.length == 7) {
                setPreviewInfo({
                  cid: storeItem.items[0].item_id,
                  eid: -1
                });
                break;
              }
            }
          }
        }
      }
    }));
    return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
      id: "MenuButton_draw",
      get show() {
        return libs.memo(() => !!show())() && paymentOpen();
      },
      renderOnShow: true,
      name: "MenuButton_draw",
      close: () => {
        if (rewardShow()) {
          clientSideEvent("close_draw_reward_windows", {
            state: 1
          });
        } else {
          GameEvents.SendEventClientSide("custom_ui_toggle_windows", {
            window_name: "MenuButton_draw",
            state: 0
          });
        }
      },
      get children() {
        return [libs.createComponent(EOM_Image.EOM_Image, {
          get className() {
            return libs.classNames("DrawBGCommon");
          },
          hittest: false
        }), libs.createComponent(libs.Index, {
          get each() {
            return cardPoolList();
          },
          children: (pool, index) => libs.createComponent(EOM_Image.EOM_Image, {
            get className() {
              return libs.classNames("DrawBG", "Pool" + pool().pool, {
                ShowBG: selectedIndex() == index
              });
            },
            hittest: false
          })
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          ref(r$) {
            const _ref$ = PoolListRef;
            typeof _ref$ === "function" ? _ref$(r$) : PoolListRef = r$;
          },
          id: "PoolList",
          scroll: "y",
          get classList() {
            return {
              Hidden: !drawButtonEnable() || rewardShow()
            };
          },
          marginTop: "100px",
          marginLeft: "28px",
          flowChildren: "down",
          zIndex: 1,
          overflow: "noclip",
          hittest: false,
          get children() {
            return libs.createComponent(libs.Index, {
              get each() {
                return cardPoolList();
              },
              children: (pool, index) => libs.createComponent(CardPoolTab, {
                get pool() {
                  return pool();
                },
                get selected() {
                  return selectedIndex() == index;
                },
                onClick: () => {
                  setSelectedIndex(index);
                }
              })
            });
          }
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "DrawMain",
          get children() {
            return [libs.createComponent(libs.Show, {
              get when() {
                return libs.memo(() => !!(selectedCardPoolType() == "normal" && show()))() && paymentOpen();
              },
              get children() {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  id: "DrawPoolNormalContent",
                  get children() {
                    return [libs.createElement("DOTAParticleScenePanel", {
                      hittest: false,
                      id: "BGScene",
                      squarePixels: true,
                      particleName: "particles/eom/ui/ui_fx/ui_fx_draw_portal.vpcf",
                      cameraOrigin: "0 0 -900",
                      lookAt: "0 0 0",
                      fov: 30
                    }, null), libs.createComponent(GenericPanel.CImage, {
                      id: "DrawFront"
                    }), libs.createElement("DOTAParticleScenePanel", {
                      hittest: false,
                      id: "Portal",
                      squarePixels: true,
                      particleName: "particles/eom/events/draw_portal/draw_portal.vpcf",
                      cameraOrigin: "0 0 900",
                      lookAt: "0 0 0",
                      fov: 60
                    }, null), libs.createComponent(libs.Show, {
                      get when() {
                        return libs.memo(() => cardPool() != undefined)() && show();
                      },
                      get children() {
                        return [libs.createComponent(EOM_Panel.EOM_Panel, {
                          id: "DrawPoolNormalMain",
                          ref(r$) {
                            const _ref$2 = centerContentRef;
                            typeof _ref$2 === "function" ? _ref$2(r$) : centerContentRef = r$;
                          },
                          get className() {
                            return libs.classNames("Pool" + cardPool().pool, {
                              TiedPrize: isTiedPrizePool(cardPool()),
                              GoldCourierPool: isGoldCourierPool(cardPool()),
                              MoonPool: isMoonPool(cardPool()),
                              ActivityPool: isActivityPool(cardPool())
                            });
                          },
                          get children() {
                            return [libs.createComponent(EOM_Panel.EOM_Panel, {
                              id: "CenterContent",
                              get children() {
                                return [(() => {
                                  const _el$1 = libs.createElement("Panel", {
                                      id: "CenterCard"
                                    }, null),
                                    _el$10 = libs.createElement("Image", {
                                      id: "Front",
                                      get src() {
                                        return getSrcPath("draw/" + cardPool().pool + "/frame_01.png");
                                      }
                                    }, _el$1);
                                  libs.setProp(_el$10, "onload", self => {
                                    let delay;
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      delay = 0.3;
                                    }
                                    CenterCardPopup(self, delay);
                                  });
                                  libs.insert(_el$10, libs.createComponent(libs.Show, {
                                    get when() {
                                      return cardPool().up;
                                    },
                                    get children() {
                                      return [libs.createComponent(EOM_Image.EOM_Image, {
                                        id: "PoolUpTag",
                                        get src() {
                                          return getSrcPath("draw/" + cardPool().pool + "/up_tag_big.png");
                                        }
                                      }), libs.createComponent(EOM_Panel.EOM_Panel, {
                                        id: "UpTime",
                                        get backgroundImage() {
                                          return getImagePath("draw/" + cardPool().pool + "/up_bg.png");
                                        },
                                        get children() {
                                          return [libs.createComponent(GenericPanel.CImage, {
                                            className: "CountDownIcon"
                                          }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                                            get endTime() {
                                              return box_up_time[cardPool().pool]?.end_time ?? Number(cardPool().endTime ?? 0);
                                            }
                                          })];
                                        }
                                      })];
                                    }
                                  }));
                                  libs.insert(_el$1, libs.createComponent(libs.Show, {
                                    get when() {
                                      return isTiedPrizePool(cardPool());
                                    },
                                    get children() {
                                      const _el$11 = libs.createElement("Image", {
                                        id: "Back",
                                        get src() {
                                          return getSrcPath("draw/" + cardPool().pool + "/frame_02.png");
                                        }
                                      }, null);
                                      libs.setProp(_el$11, "onload", self => {
                                        let delay;
                                        if (GoldCourierPoolList.includes(cardPool().pool)) {
                                          delay = 0.3;
                                        }
                                        CenterCardPopup(self, delay);
                                      });
                                      libs.effect(_$p => libs.setProp(_el$11, "src", getSrcPath("draw/" + cardPool().pool + "/frame_02.png"), _$p));
                                      return _el$11;
                                    }
                                  }), null);
                                  libs.effect(_$p => libs.setProp(_el$10, "src", getSrcPath("draw/" + cardPool().pool + "/frame_01.png"), _$p));
                                  return _el$1;
                                })(), (() => {
                                  const _el$12 = libs.createElement("Panel", {
                                      id: "AroundCard1"
                                    }, null),
                                    _el$13 = libs.createElement("Image", {
                                      get src() {
                                        return (() => {
                                          if (GoldCourierPoolList.includes(cardPool().pool)) {
                                            return getSrcPath("draw/courier_common/frame_03.png");
                                          }
                                          return getSrcPath("draw/" + cardPool().pool + "/frame_03.png");
                                        })();
                                      }
                                    }, _el$12);
                                  libs.setProp(_el$12, "className", "AroundCard");
                                  libs.setProp(_el$12, "onload", self => {
                                    let delay;
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      delay = 0.2;
                                    }
                                    SideCardPopup(self, delay);
                                  });
                                  libs.effect(_$p => libs.setProp(_el$13, "src", (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_03.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_03.png");
                                  })(), _$p));
                                  return _el$12;
                                })(), (() => {
                                  const _el$14 = libs.createElement("Panel", {
                                      id: "AroundCard2"
                                    }, null),
                                    _el$15 = libs.createElement("Image", {
                                      get src() {
                                        return (() => {
                                          if (GoldCourierPoolList.includes(cardPool().pool)) {
                                            return getSrcPath("draw/courier_common/frame_04.png");
                                          }
                                          return getSrcPath("draw/" + cardPool().pool + "/frame_04.png");
                                        })();
                                      }
                                    }, _el$14);
                                  libs.setProp(_el$14, "className", "AroundCard");
                                  libs.setProp(_el$14, "onload", self => {
                                    let delay;
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      delay = 0.2;
                                    }
                                    SideCardPopup(self, delay);
                                  });
                                  libs.effect(_$p => libs.setProp(_el$15, "src", (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_04.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_04.png");
                                  })(), _$p));
                                  return _el$14;
                                })(), (() => {
                                  const _el$16 = libs.createElement("Panel", {
                                      id: "AroundCard3"
                                    }, null),
                                    _el$17 = libs.createElement("Image", {
                                      get src() {
                                        return (() => {
                                          if (GoldCourierPoolList.includes(cardPool().pool)) {
                                            return getSrcPath("draw/courier_common/frame_05.png");
                                          }
                                          return getSrcPath("draw/" + cardPool().pool + "/frame_05.png");
                                        })();
                                      }
                                    }, _el$16);
                                  libs.setProp(_el$16, "className", "AroundCard");
                                  libs.setProp(_el$16, "onload", self => {
                                    let delay;
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      delay = 0.2;
                                    }
                                    SideCardPopup(self, delay);
                                  });
                                  libs.effect(_$p => libs.setProp(_el$17, "src", (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_05.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_05.png");
                                  })(), _$p));
                                  return _el$16;
                                })(), libs.createElement("DOTAParticleScenePanel", {
                                  hittest: false,
                                  id: "DrawPortalGold",
                                  startActive: false,
                                  light: "light",
                                  camera: "camera_top",
                                  map: "scene/draw_open",
                                  useMapCamera: true,
                                  renderdeferred: false,
                                  deferredalpha: true,
                                  particleonly: false,
                                  particleName: "particles/eom/events/s3_lucky_gift_fx/s3_lucky_gift_fx.vpcf",
                                  fov: 80,
                                  cameraOrigin: "0 0 900",
                                  lookAt: "0 0 0"
                                }, null), libs.createElement("DOTAParticleScenePanel", {
                                  hittest: false,
                                  id: "DrawPortal",
                                  startActive: false,
                                  light: "light",
                                  camera: "camera_top",
                                  map: "scene/draw_open",
                                  useMapCamera: true,
                                  renderdeferred: false,
                                  deferredalpha: true,
                                  particleonly: false,
                                  particleName: "particles/eom/events/s3_lucky_gift_fx/s3_lucky_gift_general.vpcf",
                                  fov: 80,
                                  cameraOrigin: "0 0 900",
                                  lookAt: "0 0 0"
                                }, null)];
                              }
                            }), (() => {
                              const _el$20 = libs.createElement("Panel", {
                                  id: "ExtraFrontCards"
                                }, null),
                                _el$21 = libs.createElement("Panel", {
                                  id: "AroundCard4"
                                }, _el$20),
                                _el$22 = libs.createElement("Image", {
                                  get src() {
                                    return (() => {
                                      if (GoldCourierPoolList.includes(cardPool().pool)) {
                                        return getSrcPath("draw/courier_common/frame_06.png");
                                      }
                                      return getSrcPath("draw/" + cardPool().pool + "/frame_06.png");
                                    })();
                                  }
                                }, _el$21),
                                _el$23 = libs.createElement("Panel", {
                                  id: "AroundCard5"
                                }, _el$20),
                                _el$24 = libs.createElement("Image", {
                                  get src() {
                                    return (() => {
                                      if (GoldCourierPoolList.includes(cardPool().pool)) {
                                        return getSrcPath("draw/courier_common/frame_07.png");
                                      }
                                      return getSrcPath("draw/" + cardPool().pool + "/frame_07.png");
                                    })();
                                  }
                                }, _el$23),
                                _el$25 = libs.createElement("Panel", {
                                  id: "AroundCard6"
                                }, _el$20),
                                _el$26 = libs.createElement("Image", {
                                  get src() {
                                    return (() => {
                                      if (GoldCourierPoolList.includes(cardPool().pool)) {
                                        return getSrcPath("draw/courier_common/frame_08.png");
                                      }
                                      return getSrcPath("draw/" + cardPool().pool + "/frame_08.png");
                                    })();
                                  }
                                }, _el$25),
                                _el$27 = libs.createElement("Panel", {
                                  id: "AroundCard7"
                                }, _el$20),
                                _el$28 = libs.createElement("Image", {
                                  get src() {
                                    return (() => {
                                      if (GoldCourierPoolList.includes(cardPool().pool)) {
                                        return getSrcPath("draw/courier_common/frame_09.png");
                                      }
                                      return getSrcPath("draw/" + cardPool().pool + "/frame_09.png");
                                    })();
                                  }
                                }, _el$27);
                              libs.setProp(_el$21, "className", "AroundCard");
                              libs.setProp(_el$21, "onload", self => {
                                let delay;
                                if (GoldCourierPoolList.includes(cardPool().pool)) {
                                  delay = 0.2;
                                }
                                SideCardPopup(self, delay);
                              });
                              libs.setProp(_el$23, "className", "AroundCard");
                              libs.setProp(_el$23, "onload", self => {
                                let delay;
                                if (GoldCourierPoolList.includes(cardPool().pool)) {
                                  delay = 0.2;
                                }
                                SideCardPopup(self, delay);
                              });
                              libs.setProp(_el$25, "className", "AroundCard");
                              libs.setProp(_el$25, "onload", self => {
                                let delay;
                                if (GoldCourierPoolList.includes(cardPool().pool)) {
                                  delay = 0.2;
                                }
                                SideCardPopup(self, delay);
                              });
                              libs.setProp(_el$27, "className", "AroundCard");
                              libs.setProp(_el$27, "onload", self => {
                                let delay;
                                if (GoldCourierPoolList.includes(cardPool().pool)) {
                                  delay = 0.2;
                                }
                                SideCardPopup(self, delay);
                              });
                              libs.effect(_p$ => {
                                const _v$ = (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_06.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_06.png");
                                  })(),
                                  _v$2 = (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_07.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_07.png");
                                  })(),
                                  _v$3 = (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_08.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_08.png");
                                  })(),
                                  _v$4 = (() => {
                                    if (GoldCourierPoolList.includes(cardPool().pool)) {
                                      return getSrcPath("draw/courier_common/frame_09.png");
                                    }
                                    return getSrcPath("draw/" + cardPool().pool + "/frame_09.png");
                                  })();
                                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$22, "src", _v$, _p$._v$));
                                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$24, "src", _v$2, _p$._v$2));
                                _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$26, "src", _v$3, _p$._v$3));
                                _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$28, "src", _v$4, _p$._v$4));
                                return _p$;
                              }, {
                                _v$: undefined,
                                _v$2: undefined,
                                _v$3: undefined,
                                _v$4: undefined
                              });
                              return _el$20;
                            })(), libs.createComponent(GenericPanel.CLabel, {
                              id: "PoolName",
                              className: language,
                              get text() {
                                return "#" + cardPool().pool;
                              }
                            }), libs.createComponent(GenericPanel.CImage, {
                              id: "PoolRibbon",
                              get src() {
                                return `file://{images}/custom_game/draw/${cardPool().pool}/c_ribbon.png`;
                              },
                              get children() {
                                const _el$29 = libs.createElement("Panel", {
                                  id: "PoolRibbonInfo"
                                }, null);
                                libs.insert(_el$29, libs.createComponent(GenericPanel.CLabel, {
                                  get className() {
                                    return libs.classNames({
                                      "english": language != "schinese"
                                    });
                                  },
                                  get text() {
                                    return "#" + cardPool().pool + "_ribbon";
                                  }
                                }), null);
                                libs.insert(_el$29, libs.createComponent(EOM_Icon.EOM_Icon, {
                                  size: "24",
                                  get src() {
                                    return getSrcPath("icon/c_info.png");
                                  },
                                  get customTooltip() {
                                    return {
                                      name: "custom_text",
                                      text: "#" + cardPool().pool + "_chance" + (cardPool().up ? "_up" : "")
                                    };
                                  }
                                }), null);
                                return _el$29;
                              }
                            }), libs.createComponent(EOM_Panel.EOM_Panel, {
                              id: "DrawButtonList",
                              align: "center bottom",
                              marginBottom: "86px",
                              flowChildren: "right",
                              get children() {
                                return [libs.createComponent(DrawButton, {
                                  get bid() {
                                    return cardPool().bid;
                                  },
                                  get enable() {
                                    return drawButtonEnable();
                                  },
                                  get ticket() {
                                    return player_boxes()?.[cardPool().bid]?.amounts ?? 0;
                                  },
                                  cost: 1,
                                  drawCallback: Draw
                                }), libs.createComponent(DrawButton, {
                                  get bid() {
                                    return cardPool().bid;
                                  },
                                  get enable() {
                                    return drawButtonEnable();
                                  },
                                  get ticket() {
                                    return player_boxes()?.[cardPool().bid]?.amounts ?? 0;
                                  },
                                  cost: 10,
                                  drawCallback: Draw
                                })];
                              }
                            })];
                          }
                        }), libs.createComponent(libs.Show, {
                          get when() {
                            return cardPool().open_luck == 1;
                          },
                          get children() {
                            return (() => {
                              let luckValue = () => {
                                return playerBoxLuck()[cardPool().pool]?.luck ?? 0;
                              };
                              let yOffset = () => {
                                return `${90 - RemapValClamped(luckValue(), 0, 100, 0, 90 + 90)}px`;
                              };
                              return libs.createComponent(EOM_Panel.EOM_Panel, {
                                id: "DrawLuckOrb",
                                get children() {
                                  return [libs.createComponent(EOM_Panel.EOM_Panel, {
                                    get className() {
                                      return libs.classNames("LuckOrbParticleMask", {
                                        Middle: luckValue() > 35,
                                        High: luckValue() > 75
                                      });
                                    },
                                    get children() {
                                      const _el$34 = libs.createElement("DOTAParticleScenePanel", {
                                        id: "LuckOrbParticle",
                                        particleName: "particles/eom/ui/ui_fx/ui_fx_jackpot_flow_fx.vpcf",
                                        lookAt: "0 0 -0",
                                        cameraOrigin: "0 0 -300",
                                        fov: 35,
                                        get style() {
                                          return {
                                            y: yOffset()
                                          };
                                        }
                                      }, null);
                                      libs.effect(_$p => libs.setProp(_el$34, "style", {
                                        y: yOffset()
                                      }, _$p));
                                      return _el$34;
                                    }
                                  }), libs.createComponent(EOM_Label.EOM_Label, {
                                    id: "DrawLuckValue",
                                    get text() {
                                      return `${luckValue()}`;
                                    }
                                  }), libs.createComponent(EOM_Label.EOM_Label, {
                                    id: "DrawLuckLabel",
                                    text: "#LuckValue"
                                  })];
                                }
                              });
                            })();
                          }
                        }), libs.createComponent(EOM_Button.EOM_BaseButton, {
                          id: "SkipButton",
                          get ["class"]() {
                            return libs.classNames("SkipButton", {
                              Active: willSkip()
                            });
                          },
                          onactivate: () => setWillSkip(v => !v),
                          get children() {
                            return [libs.createComponent(EOM_Icon.EOM_Icon, {
                              id: "Square",
                              get src() {
                                return getSrcPath("draw/c_square.png");
                              }
                            }), libs.createComponent(EOM_Icon.EOM_Icon, {
                              id: "Hook",
                              get src() {
                                return getSrcPath("draw/c_hook.png");
                              }
                            }), libs.createComponent(GenericPanel.CLabel, {
                              text: "#Skip_Button"
                            })];
                          }
                        }), libs.createComponent(InfoButton.InfoButton, {
                          id: "PoolInfo",
                          info: "#PoolInfo",
                          get customTooltip() {
                            return {
                              name: "custom_text",
                              text: "#" + cardPool()?.pool + "_detail"
                            };
                          }
                        }), libs.createComponent(EOM_Button.EOM_Button, {
                          id: "ExchangeButton",
                          get className() {
                            return $.Language().toLowerCase();
                          },
                          color: "Blue",
                          horizontalAlign: "right",
                          get text() {
                            return `#${cardPool()?.pool}_exchange`;
                          },
                          onactivate: () => setExchangeShow(true)
                        })];
                      }
                    }), libs.createComponent(EOM_Panel.EOM_Panel, {
                      get className() {
                        return libs.classNames("DrawCardResultWindow", {
                          Show: rewardShow()
                        });
                      },
                      ref(r$) {
                        const _ref$3 = pDrawWindow;
                        typeof _ref$3 === "function" ? _ref$3(r$) : pDrawWindow = r$;
                      },
                      acceptsfocus: true,
                      get children() {
                        return libs.createComponent(EOM_Panel.EOM_Panel, {
                          id: "ResultContainer",
                          get children() {
                            return [libs.createComponent(EOM_Panel.EOM_Panel, {
                              id: "RewardList"
                            }), libs.createComponent(libs.Show, {
                              get when() {
                                return rewardShow();
                              },
                              get children() {
                                return libs.createComponent(EOM_Panel.EOM_Panel, {
                                  id: "DrawButtonList",
                                  align: "center bottom",
                                  marginBottom: "86px",
                                  flowChildren: "right",
                                  get children() {
                                    return [libs.createComponent(DrawButton, {
                                      get bid() {
                                        return cardPool().bid;
                                      },
                                      get enable() {
                                        return drawButtonEnable();
                                      },
                                      get ticket() {
                                        return player_boxes()?.[cardPool().bid]?.amounts ?? 0;
                                      },
                                      cost: 1,
                                      drawCallback: Draw
                                    }), libs.createComponent(DrawButton, {
                                      get bid() {
                                        return cardPool().bid;
                                      },
                                      get enable() {
                                        return drawButtonEnable();
                                      },
                                      get ticket() {
                                        return player_boxes()?.[cardPool().bid]?.amounts ?? 0;
                                      },
                                      cost: 10,
                                      drawCallback: Draw
                                    })];
                                  }
                                });
                              }
                            })];
                          }
                        });
                      }
                    })];
                  }
                });
              }
            }), libs.createComponent(libs.Index, {
              get each() {
                return libs.memo(() => !!(show() && paymentOpen()))() ? cardPoolList().filter(v => v.type == "activity") : [];
              },
              children: (pool, index) => {
                return libs.createComponent(EOM_Panel.EOM_Panel, {
                  get className() {
                    return libs.classNames("DrawPoolContent", {
                      Show: selectedIndex() == index
                    });
                  },
                  get children() {
                    return libs.createComponent(libs.Switch, {
                      get fallback() {
                        return [];
                      },
                      get children() {
                        return libs.createComponent(libs.Match, {
                          get when() {
                            return pool().pool == 99100002;
                          },
                          get children() {
                            return libs.createComponent(EarthshakerMachineDraw, {
                              get pool_data() {
                                return pool();
                              },
                              OnOpenExchange: () => setExchangeShow(true),
                              getRarity: getRarity,
                              get show() {
                                return show();
                              },
                              setDrawButtonEnable: setDrawButtonEnable,
                              get drawButtonEnable() {
                                return drawButtonEnable();
                              },
                              setRewardShow: setRewardShow,
                              get rewardShow() {
                                return rewardShow();
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            })];
          }
        }), libs.createComponent(Player.CurrencyGroup, {
          ref(r$) {
            const _ref$4 = CurrencyGroupRef;
            typeof _ref$4 === "function" ? _ref$4(r$) : CurrencyGroupRef = r$;
          },
          get tokens() {
            return [cardPool()?.bid, "moonstone", "coin"];
          },
          exchangeButton: true
        }), libs.createComponent(EOM_Panel.EOM_Panel, {
          id: "ExchangePanel",
          get className() {
            return libs.classNames({
              Show: exchangeShow()
            });
          },
          onactivate: () => {},
          get children() {
            return [(() => {
              const _el$30 = libs.createElement("Panel", {
                id: "TopBarBG"
              }, null);
              libs.insert(_el$30, libs.createComponent(libs.Show, {
                get when() {
                  return cardPool() != undefined;
                },
                get children() {
                  return libs.createComponent(Player.CurrencyGroup, {
                    get tokens() {
                      return [cardPool().currency];
                    }
                  });
                }
              }));
              return _el$30;
            })(), libs.createComponent(EOM_Panel.EOM_Panel, {
              id: "ExchangeContainer",
              onactivate: () => setExchangeShow(false),
              get children() {
                return [(() => {
                  const _el$31 = libs.createElement("Panel", {
                    id: "ExchangeList"
                  }, null);
                  libs.setProp(_el$31, "onactivate", () => {});
                  libs.insert(_el$31, libs.createComponent(EOM_Panel.EOM_Panel, {
                    id: "ExchangeListTitle",
                    get children() {
                      return [libs.createComponent(libs.Show, {
                        get when() {
                          return cardPool() != undefined;
                        },
                        get children() {
                          return libs.createComponent(GenericPanel.CLabel, {
                            id: "ExchangeListTitleLabel",
                            get text() {
                              return `#${cardPool().pool}_exchange`;
                            }
                          });
                        }
                      }), libs.createComponent(EOM_Button.EOM_CloseButton, {
                        onactivate: () => {
                          setExchangeShow(false);
                        }
                      })];
                    }
                  }), null);
                  libs.insert(_el$31, libs.createComponent(libs.Show, {
                    get when() {
                      return cardPool() != undefined;
                    },
                    get children() {
                      return libs.createComponent(EOM_Panel.EOM_Panel, {
                        id: "ExchangeItemList",
                        flowChildren: "right-wrap",
                        scroll: "y",
                        get children() {
                          return libs.createComponent(libs.Show, {
                            get when() {
                              return exchangeShow();
                            },
                            get children() {
                              return libs.createComponent(libs.Index, {
                                get each() {
                                  return storeItemDataSorted();
                                },
                                children: (storeItem, index) => libs.createComponent(ExchangeItem.ExchangeItem, libs.mergeProps({
                                  get visible() {
                                    return cardPool().currency == storeItem().pay_type;
                                  }
                                }, () => ExchangeItem.getExchangeItemProps({
                                  storeItem: storeItem(),
                                  purchased_product: purchased_product(),
                                  player_hero: playerHero(),
                                  player_ornament: playerOrnament(),
                                  previewing_id: previewInfo().cid,
                                  onPreview: (cosmetic_id, exchange_id) => {
                                    previewTimer = $.Schedule(0.3, () => {
                                      previewTimer = -1;
                                      if (previewInfo().eid != exchange_id) {
                                        setPreviewInfo({
                                          cid: cosmetic_id,
                                          eid: exchange_id
                                        });
                                      }
                                    });
                                  },
                                  onCancelPreview: () => {
                                    if (previewTimer != -1) {
                                      $.CancelScheduled(previewTimer);
                                      previewTimer = -1;
                                    }
                                  }
                                })))
                              });
                            }
                          });
                        }
                      });
                    }
                  }), null);
                  return _el$31;
                })(), (() => {
                  const _el$32 = libs.createElement("Panel", {
                    id: "ExchangePreview"
                  }, null);
                  libs.insert(_el$32, libs.createComponent(libs.Show, {
                    get when() {
                      return previewInfo().cid != -1;
                    },
                    get children() {
                      return [libs.createComponent(CosmeticPreview.CosmeticPreview, {
                        get cosmetic_id() {
                          return previewInfo().cid;
                        }
                      }), (() => {
                        const _el$33 = libs.createElement("Panel", {
                          id: "CosmeticDesc"
                        }, null);
                        libs.insert(_el$33, libs.createComponent(GenericPanel.CLabel, {
                          id: "CosmeticName",
                          get text() {
                            return '#' + previewInfo().cid;
                          }
                        }), null);
                        libs.insert(_el$33, libs.createComponent(EOM_Separator.EOM_Separator, {
                          size: "short"
                        }), null);
                        libs.insert(_el$33, libs.createComponent(GenericPanel.CLabel, {
                          id: "CosmeticAccess",
                          get text() {
                            return GetCosmeticAccessDescription(previewInfo().cid);
                          }
                        }), null);
                        return _el$33;
                      })()];
                    }
                  }));
                  return _el$32;
                })()];
              }
            })];
          }
        })];
      }
    });
  };
  const CardPoolTab = props => {
    return (() => {
      const _el$35 = libs.createElement("Panel", {}, null);
      libs.setProp(_el$35, "onactivate", () => props.onClick());
      libs.insert(_el$35, libs.createComponent(GenericPanel.CImage, {
        className: "CardPoolBG",
        get src() {
          return getSrcPath("draw/" + props.pool.pool + "/tab_button.png");
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(GenericPanel.CImage, {
        get className() {
          return libs.classNames("CardPoolSelected", {
            Show: props.selected
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(GenericPanel.CLabel, {
        get className() {
          return libs.classNames("CardPoolTitle", language);
        },
        get text() {
          return "#" + props.pool.pool;
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(libs.Show, {
        when: language == "english",
        get children() {
          return libs.createComponent(GenericPanel.CImage, {
            id: "MarkIcon",
            get src() {
              return getSrcPath(`draw/${props.pool.pool}/tab_mark_en.png`);
            }
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(libs.Show, {
        when: language == "schinese",
        get children() {
          return libs.createComponent(GenericPanel.CImage, {
            id: "MarkIcon",
            get src() {
              return getSrcPath(`draw/${props.pool.pool}/tab_mark_ch.png`);
            }
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(libs.Show, {
        when: language == "russian",
        get children() {
          return libs.createComponent(GenericPanel.CImage, {
            id: "MarkIcon",
            get src() {
              return getSrcPath(`draw/${props.pool.pool}/tab_mark_en.png`);
            }
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(libs.Show, {
        get when() {
          return props.pool.endTime != "0";
        },
        get children() {
          return libs.createComponent(EOM_Panel.EOM_Panel, {
            get className() {
              return libs.classNames("CardPoolCountdown", language);
            },
            get children() {
              return [libs.createComponent(GenericPanel.CImage, {
                className: "CountDownIcon"
              }), libs.createComponent(EOM_Countdown.EOM_Countdown, {
                get endTime() {
                  return Number(props.pool.endTime);
                }
              })];
            }
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(libs.Show, {
        get when() {
          return props.pool.up;
        },
        get children() {
          return libs.createComponent(GenericPanel.CImage, {
            className: "UPtag",
            get src() {
              return getSrcPath("draw/" + props.pool.pool + "/up_tag.png");
            }
          });
        }
      }), null);
      libs.insert(_el$35, libs.createComponent(GenericPanel.CImage, {
        className: "MarkTag",
        get src() {
          return getSrcPath("draw/" + props.pool.pool + "/mark_" + ($.Language().toLowerCase() == "schinese" ? "ch" : "en") + ".png");
        }
      }), null);
      libs.effect(_$p => libs.setProp(_el$35, "className", libs.classNames("CardPoolTab", "Bid" + props.pool.pool, {
        MoonPool: isMoonPool(props.pool),
        GoldPool: isGoldCourierPool(props.pool),
        ActivityPool: isActivityPool(props.pool),
        RedPool: RedActivityPoolList.includes(props.pool.pool)
      }), _$p));
      return _el$35;
    })();
  };
  const DrawButton = props => {
    const Bid_To_Sid = {
      [2000001]: 9900104,
      [2000002]: 9900103,
      [2000003]: 9900105
    };
    return libs.createComponent(EOM_Panel.EOM_Panel, {
      flowChildren: "down",
      className: "DrawButton",
      get children() {
        return [libs.createComponent(EOM_Panel.EOM_Panel, {
          horizontalAlign: "center",
          get children() {
            return [libs.createComponent(EOM_Image.EOM_Image, {
              className: "TicketBG",
              get backgroundImage() {
                return getImagePath("draw/c_buy_bottom.png");
              },
              width: "140px",
              height: "30px"
            }), libs.createComponent(EOM_Panel.EOM_Panel, {
              align: "center center",
              flowChildren: "right",
              get children() {
                return [libs.createComponent(EOM_Icon.EOM_Icon, {
                  width: "26px",
                  height: "26px",
                  get backgroundImage() {
                    return getImagePath("tokens/" + props.bid + ".png");
                  }
                }), libs.createComponent(EOM_Label.EOM_Label, {
                  className: "TicketLabel",
                  verticalAlign: "center",
                  get text() {
                    return "× " + props.cost;
                  }
                })];
              }
            })];
          }
        }), libs.createComponent(EOM_Button.EOM_Button, {
          color: "Blue",
          get enabled() {
            return props.enable;
          },
          get text() {
            return "#Draw_Action_" + props.cost;
          },
          margin: "0px 65px",
          onactivate: () => {
            if (props.ticket >= props.cost) {
              props.drawCallback(props.cost);
            } else {
              let count = 1;
              if (props.cost == 10) {
                count = 10 - props.ticket;
              }
              if (Bid_To_Sid[props.bid] != undefined) {
                clientSideEvent("directly_purchase", {
                  itemid: Bid_To_Sid?.[props.bid],
                  count
                });
              }
            }
          }
        })];
      }
    });
  };
  libs.render(() => libs.createComponent(DrawMain, {}), $.GetContextPanel());
}