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
var common_box = require('./common_box.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');
var equip_details = require('./equip_details.js');
var server_dungeon_key = require('./server_dungeon_key.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');
var EOM_ToggleButton = require('./EOM_ToggleButton.js');
var portraitsFullBodyLoadout = require('./portraitsFullBodyLoadout.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var abyss_hud_shared = require('./abyss_hud_shared.js');
var common_item = require('./common_item.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
var EOM_Loading = require('./EOM_Loading.js');
var Player = require('./Player.js');
var RankBadgeBanner = require('./RankBadgeBanner.js');
var upgrade_box = require('./upgrade_box.js');
var upgrade_icon = require('./upgrade_icon.js');
require('./EOM_Icon.js');
require('./hotkey_label.js');
require('./attribute_formatter.js');
require('./equipment_utils.js');
require('./server_equipment.js');
require('./drawing_attr_row.js');
require('./EOM_TextEntry.js');

const ArtifactSelection = () => {
  const [maxRefreshCount, setMaxRefreshCount] = libs.createSignal(0);
  const selection = solid_utils.createPlayerNetDataSignal("common", "artifact_selection", {
    options: [],
    refresh_count: 0,
    allin_count: 0,
    give_up: false,
    draw_count: 0
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    active_type: undefined,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  const optionPanels = [];
  let currentTooltipPanel;
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const optionHotkeys = libs.createMemo(() => SELECTION_KEY_FUNCTIONS.map(func => GetKeyBind(func, playerKeyValues())));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  libs.createEffect(libs.on(selection, () => {
    if (selection().refresh_count > maxRefreshCount()) {
      setMaxRefreshCount(selection().refresh_count);
    }
  }));
  libs.createEffect(libs.on(() => selection().options.map(option => option.name).join("|"), optionsKey => {
    if (optionsKey != "") {
      setSelectedIndex(0);
    }
  }));
  const handleSelectArtifact = artifactName => {
    GameEvents.SendCustomGameEventToServer("select_artifact", {
      artifactName: artifactName
    });
  };
  const giveUpGold = libs.createMemo(() => {
    return selection().options.reduce((sum, option) => sum + (SHOP_RARITY_COST[option.rarity] ?? 0), 0);
  });
  const footerActions = libs.createMemo(() => {
    const actions = [];
    if (selection().give_up == true) {
      actions.push({
        key: "give_up",
        onActivate: () => handleSelectArtifact()
      });
    }
    if (selection().refresh_count > 0) {
      actions.push({
        key: "refresh",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_artifact_refresh", {});
        }
      });
    }
    if (selection().allin_count > 0) {
      actions.push({
        key: "allin",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_artifact_allin", {});
        }
      });
    }
    return actions;
  });
  const selectableCount = libs.createMemo(() => selection().options.length + footerActions().length);
  const getFooterActionIndex = key => footerActions().findIndex(action => action.key == key);
  const isFooterSelected = key => {
    const actionIndex = getFooterActionIndex(key);
    return isGamepad() && actionIndex >= 0 && selectedIndex() == selection().options.length + actionIndex;
  };
  const setFooterSelection = key => {
    const actionIndex = getFooterActionIndex(key);
    if (actionIndex >= 0) {
      setSelectedIndex(selection().options.length + actionIndex);
    }
  };
  const moveSelection = delta => {
    const total = selectableCount();
    if (total <= 0) return;
    setSelectedIndex((selectedIndex() + delta + total) % total);
  };
  const confirmSelection = () => {
    const currentIndex = selectedIndex();
    const option = selection().options[currentIndex];
    if (option !== undefined) {
      handleSelectArtifact(option.name);
      return;
    }
    const footerAction = footerActions()[currentIndex - selection().options.length];
    if (footerAction !== undefined) {
      footerAction.onActivate();
    }
  };
  libs.createEffect(libs.on(selectableCount, total => {
    if (total <= 0) {
      setSelectedIndex(0);
      return;
    }
    if (selectedIndex() >= total) {
      setSelectedIndex(total - 1);
    }
  }));
  libs.createEffect(() => {
    const gamepad = isGamepad();
    const currentIndex = selectedIndex();
    const options = selection().options;
    const currentOption = options[currentIndex];
    const currentPanel = currentOption !== undefined ? optionPanels[currentIndex] : undefined;
    if (currentTooltipPanel !== undefined && (currentTooltipPanel !== currentPanel || !gamepad)) {
      HideCustomTooltip(currentTooltipPanel, "artifact");
      currentTooltipPanel = undefined;
    }
    if (gamepad && currentOption !== undefined && currentPanel !== undefined && currentTooltipPanel !== currentPanel) {
      ShowCustomTooltip(currentPanel, "artifact", {
        itemName: currentOption.name,
        rarity: currentOption.rarity
      });
      currentTooltipPanel = currentPanel;
    }
  });
  useClientSideEvent("key_pressed", data => {
    if (multiChoiceState().active_type !== "Artifact" || selectableCount() <= 0) {
      return;
    }
    const optionIndex = SELECTION_KEY_FUNCTIONS.indexOf(data.keyFunction);
    if (optionIndex >= 0) {
      const option = selection().options[optionIndex];
      if (option !== undefined) handleSelectArtifact(option.name);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm && isGamepad()) {
      confirmSelection();
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "ArtifactSelection",
        hittest: true
      }, null);
      libs.createElement("Panel", {
        id: "BG"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "SelectionConent"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "Title"
      }, _el$3);
      libs.createElement("Image", {
        "class": "LeftIcon"
      }, _el$4);
      const _el$6 = libs.createElement("Label", {
        width: "230px",
        align: "center center",
        text: "#ArtifactSelectionTitle"
      }, _el$4);
      libs.createElement("Image", {
        "class": "RightIcon"
      }, _el$4);
      const _el$8 = libs.createElement("Panel", {
        id: "Options"
      }, _el$3),
      _el$9 = libs.createElement("Panel", {
        id: "Footer"
      }, _el$3),
      _el$0 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$9),
      _el$1 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$9),
      _el$13 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$9);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "ParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_huang_01.vpcf",
        cameraOrigin: "0 0 700",
        fov: 80,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
    libs.setProp(_el$6, "width", "230px");
    libs.setProp(_el$6, "align", "center center");
    libs.insert(_el$8, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, i) => {
        const delay = (selection().options.length - 1 - i()) * 0.08;
        return (() => {
          const _el$15 = libs.createElement("Panel", {
            "class": "SelectionOption",
            animationDelay: `${delay}s`
          }, null);
          libs.use(panel => optionPanels[i()] = panel, _el$15);
          libs.setProp(_el$15, "onactivate", () => handleSelectArtifact(option.name));
          libs.setProp(_el$15, "onmouseover", self => ShowCustomTooltip(self, "artifact", {
            itemName: option.name,
            rarity: option.rarity
          }));
          libs.setProp(_el$15, "onmouseout", self => HideCustomTooltip(self, "artifact"));
          libs.setProp(_el$15, "animationDelay", `${delay}s`);
          libs.insert(_el$15, libs.createComponent(common_box.CommonBox, {
            get itemName() {
              return option.name;
            },
            get rarity() {
              return option.rarity;
            },
            get hotkey() {
              return libs.memo(() => !!!isGamepad())() ? optionHotkeys()[i()] : undefined;
            }
          }));
          libs.effect(_$p => libs.setProp(_el$15, "classList", {
            Selected: selectedIndex() == i() && isGamepad()
          }, _$p));
          return _el$15;
        })();
      }
    }));
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return selection().refresh_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isFooterSelected("refresh")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_artifact_refresh", {});
          },
          onmouseover: () => setFooterSelection("refresh"),
          text: "#refresh_count",
          get vars() {
            return {
              cur: selection().refresh_count
            };
          }
        });
      }
    }));
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return selection().give_up == true;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          html: true,
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isFooterSelected("give_up")
            });
          },
          onactivate: () => handleSelectArtifact(),
          onmouseover: () => setFooterSelection("give_up"),
          get children() {
            const _el$10 = libs.createElement("Panel", {
                align: "center center",
                flowChildren: "right"
              }, null);
              libs.createElement("Label", {
                text: "#artifact_give_up"
              }, _el$10);
              const _el$12 = libs.createElement("Label", {
                id: "GiveUpGold",
                get text() {
                  return giveUpGold();
                }
              }, _el$10);
            libs.setProp(_el$10, "align", "center center");
            libs.setProp(_el$10, "flowChildren", "right");
            libs.effect(_$p => libs.setProp(_el$12, "text", giveUpGold(), _$p));
            return _el$10;
          }
        });
      }
    }));
    libs.insert(_el$13, libs.createComponent(libs.Show, {
      get when() {
        return selection().allin_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isFooterSelected("allin")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_artifact_allin", {});
          },
          onmouseover: () => setFooterSelection("allin"),
          text: "#allin_count",
          get vars() {
            return {
              cur: selection().allin_count
            };
          }
        });
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "classList", {
      Show: multiChoiceState().active_type === "Artifact"
    }, _$p));
    return _el$;
  })();
};

const ATTRIBUTE_CATEGORIES = ["attack", "defence", "special", "farm"];
const PLAYER_FALLBACK_PROPERTIES = ["equip_drop_pct", "equip_drop_num_pct", "equip_rarity_chance"];
const AttributeSummary = () => {
  const [refreshTick, setRefreshTick] = libs.createSignal(0);
  const [show, setShow] = libs.createSignal(false);
  const [categoryIndex, setCategoryIndex] = libs.createSignal(0);
  const categoryLabels = ATTRIBUTE_CATEGORIES.map(category => GetLocalization(`AttributeSummary_Category_${category}`));
  let attributesPanel;
  let cachedEntIndex;
  const attrCache = new Map();
  const targetEntIndex = libs.createMemo(() => {
    refreshTick();
    return Players.GetLocalPlayerPortraitUnit();
  });
  const attributes = libs.createMemo(() => {
    refreshTick();
    const entIndex = targetEntIndex();
    if (entIndex === -1 || entIndex === undefined) {
      attrCache.clear();
      cachedEntIndex = undefined;
      return [];
    }
    if (cachedEntIndex !== entIndex) {
      attrCache.clear();
      cachedEntIndex = entIndex;
    }
    const category = ATTRIBUTE_CATEGORIES[categoryIndex()];
    const propertyIDs = PROPERTY_UI_CATEGORIES[category];
    return propertyIDs.map(id => {
      const value = Entities.GetPropertyValue(entIndex, id, PLAYER_FALLBACK_PROPERTIES);
      const cached = attrCache.get(id);
      if (cached && cached.value === value) {
        return cached;
      }
      const next = {
        id,
        base_value: value,
        value
      };
      attrCache.set(id, next);
      return next;
    }).filter(attr => attr.value > 0);
  });
  const themes = libs.createMemo(() => {
    refreshTick();
    return categoryIndex() === 0 ? Object.keys(PROPERTY_UI_ATTACK_GROUPS) : [""];
  });
  const groupedAttributes = libs.createMemo(() => {
    const byID = new Map(attributes().map(attr => [attr.id, attr]));
    return new Map(themes().map(theme => {
      const propertyIDs = categoryIndex() === 0 ? PROPERTY_UI_ATTACK_GROUPS[theme] : PROPERTY_UI_CATEGORIES[ATTRIBUTE_CATEGORIES[categoryIndex()]];
      return [theme, propertyIDs.map(id => byID.get(id)).filter(attr => attr !== undefined)];
    }));
  });
  const selectCategory = index => {
    setCategoryIndex(index);
    attributesPanel?.ScrollToTop();
  };
  useClientSideEvent("ToggleAttributeSummary", data => {
    setShow(data.state);
  });
  useClientSideEvent("key_pressed", data => {
    if (data.keyFunction === KeyFunction.Attribute) {
      setShow(true);
    }
  });
  useClientSideEvent("key_released", data => {
    if (data.keyFunction === KeyFunction.Attribute) {
      setShow(false);
    }
  });
  libs.createEffect(() => {
    if (!show()) return;
    setRefreshTick(prev => prev + 1);
    const timer = setInterval(() => {
      setRefreshTick(prev => prev + 1);
    }, 1000);
    libs.onCleanup(() => clearInterval(timer));
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "AttributeSummary"
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "AttributesSummary"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "AttributesSummaryTitle",
        get text() {
          return GetLocalization("Equipment_AttributesSummary");
        }
      }, _el$2);
      libs.createElement("Panel", {
        id: "TitleLine"
      }, _el$2);
      const _el$5 = libs.createElement("Panel", {
        id: "Attributes",
        "class": "VerticalScrollStyle",
        scroll: "y"
      }, _el$2);
    libs.setProp(_el$, "onmouseout", self => {
      if (!self.BHasHoverStyle()) setShow(false);
    });
    libs.insert(_el$2, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
      id: "AttributeCategoryTabs",
      group: "AttributeSummaryCategories",
      list: categoryLabels,
      get selected() {
        return categoryIndex() + 1;
      },
      onChange: selectCategory
    }), _el$5);
    const _ref$ = attributesPanel;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$5) : attributesPanel = _el$5;
    libs.setProp(_el$5, "scroll", "y");
    libs.insert(_el$5, libs.createComponent(libs.Show, {
      get when() {
        return attributes().length > 0;
      },
      get fallback() {
        return (() => {
          const _el$6 = libs.createElement("Label", {
            id: "EmptyAttributeTips",
            get text() {
              return GetLocalization("AttributeSummary_EmptyCategory");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$6, "text", GetLocalization("AttributeSummary_EmptyCategory"), _$p));
          return _el$6;
        })();
      },
      get children() {
        return libs.createComponent(libs.For, {
          get each() {
            return themes();
          },
          children: theme => libs.createComponent(libs.Show, {
            get when() {
              return groupedAttributes().get(theme).length > 0;
            },
            get children() {
              const _el$7 = libs.createElement("Panel", {
                "class": "AttributeGroup"
              }, null);
              libs.insert(_el$7, libs.createComponent(libs.Show, {
                when: theme !== "",
                get children() {
                  const _el$8 = libs.createElement("Panel", {
                      "class": "AttributeGroupHeader"
                    }, null),
                    _el$9 = libs.createElement("Label", {
                      get text() {
                        return GetLocalization(`AttributeSummary_Theme_${theme}`);
                      }
                    }, _el$8);
                    libs.createElement("Panel", {
                      "class": "Separator"
                    }, _el$8);
                  libs.effect(_$p => libs.setProp(_el$9, "text", GetLocalization(`AttributeSummary_Theme_${theme}`), _$p));
                  return _el$8;
                }
              }), null);
              libs.insert(_el$7, libs.createComponent(libs.For, {
                get each() {
                  return groupedAttributes().get(theme);
                },
                children: attr => libs.createComponent(equip_details.EquipmentAttrRow, {
                  data: attr,
                  type: "Main",
                  get attributNameColor() {
                    return PLAYER_FALLBACK_PROPERTIES.includes(attr.id) ? "#4472CE" : "#BFAA82";
                  },
                  showAttributeRange: false
                })
              }), null);
              return _el$7;
            }
          })
        });
      }
    }));
    libs.effect(_p$ => {
      const _v$ = {
          Show: show()
        },
        _v$2 = GetLocalization("Equipment_AttributesSummary");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

const parseItemCost$1 = value => {
  const parts = (value ?? "0:0").toString().split(":");
  const itemCount = Number(parts[1] ?? 0);
  return {
    itemId: parts[0] ?? "0",
    itemCount: itemCount > 0 ? itemCount : 0
  };
};
const BlessSelection = () => {
  const [maxRefreshCount, setMaxRefreshCount] = libs.createSignal(0);
  const selection = solid_utils.createPlayerNetDataSignal("common", "bless_selection", {
    options: [],
    free_refresh_count: 0,
    pay_refresh_count: 0,
    allin_count: 0,
    give_up: false,
    draw_count: 0
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    active_type: undefined,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  const optionPanels = [];
  let currentTooltipPanel;
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const optionHotkeys = libs.createMemo(() => SELECTION_KEY_FUNCTIONS.map(func => GetKeyBind(func, playerKeyValues())));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  libs.createEffect(libs.on(selection, () => {
    const totalCount = selection().free_refresh_count + selection().pay_refresh_count;
    if (totalCount > maxRefreshCount()) {
      setMaxRefreshCount(totalCount);
    }
  }));
  libs.createEffect(libs.on(() => selection().options.map(option => option.name).join("|"), optionsKey => {
    if (optionsKey != "") {
      setSelectedIndex(0);
    }
  }));
  const handleSelectUpgrade = blessName => {
    GameEvents.SendCustomGameEventToServer("select_bless", {
      blessName: blessName
    });
  };
  const giveUpGold = libs.createMemo(() => {
    return selection().options.reduce((sum, option) => sum + BLESS_GIVEUP_REWARD + (option.rarity - 1) * BLESS_GIVEUP_RARITY_REWARD, 0);
  });
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const payRefreshCost = libs.createMemo(() => parseItemCost$1(KeyValues.game_setting.in_game_bless_refresh_cost.value));
  const payRefreshItemCount = libs.createMemo(() => playerTokens()[payRefreshCost().itemId]?.amounts ?? 0);
  const payRefreshAvailableCount = libs.createMemo(() => Math.floor(payRefreshItemCount() / Math.max(payRefreshCost().itemCount, 1)));
  const footerActions = libs.createMemo(() => {
    const actions = [];
    if (selection().give_up == true) {
      actions.push({
        key: "give_up",
        onActivate: () => handleSelectUpgrade()
      });
    }
    if (selection().free_refresh_count > 0) {
      actions.push({
        key: "free_refresh",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_bless_refresh", {
            type: "free"
          });
        }
      });
    } else if (selection().pay_refresh_count > 0 && payRefreshAvailableCount() > 0) {
      actions.push({
        key: "pay_refresh",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_bless_refresh", {
            type: "pay"
          });
        }
      });
    }
    if (selection().allin_count > 0) {
      actions.push({
        key: "allin",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_bless_allin", {});
        }
      });
    }
    return actions;
  });
  const selectableCount = libs.createMemo(() => selection().options.length + footerActions().length);
  const moveSelection = delta => {
    const total = selectableCount();
    if (total <= 0) return;
    setSelectedIndex((selectedIndex() + delta + total) % total);
  };
  const confirmSelection = () => {
    const currentIndex = selectedIndex();
    const option = selection().options[currentIndex];
    if (option !== undefined) {
      handleSelectUpgrade(option.name);
      return;
    }
    const footerAction = footerActions()[currentIndex - selection().options.length];
    if (footerAction !== undefined) {
      footerAction.onActivate();
    }
  };
  libs.createEffect(libs.on(selectableCount, total => {
    if (total <= 0) {
      setSelectedIndex(0);
      return;
    }
    if (selectedIndex() >= total) {
      setSelectedIndex(total - 1);
    }
  }));
  libs.createEffect(() => {
    const gamepad = isGamepad();
    const currentIndex = selectedIndex();
    const options = selection().options;
    const currentOption = options[currentIndex];
    const currentPanel = currentOption !== undefined ? optionPanels[currentIndex] : undefined;
    if (currentTooltipPanel !== undefined && (currentTooltipPanel !== currentPanel || !gamepad)) {
      HideCustomTooltip(currentTooltipPanel, "bless_selection");
      currentTooltipPanel = undefined;
    }
    if (gamepad && currentOption !== undefined && currentPanel !== undefined && currentTooltipPanel !== currentPanel) {
      ShowCustomTooltip(currentPanel, "bless_selection", {
        itemName: currentOption.name,
        upText: currentOption.up ? "#Bless_UP" : ""
      });
      currentTooltipPanel = currentPanel;
    }
  });
  useClientSideEvent("key_pressed", data => {
    if (multiChoiceState().active_type !== "Blessing" || selectableCount() <= 0) {
      return;
    }
    const optionIndex = SELECTION_KEY_FUNCTIONS.indexOf(data.keyFunction);
    if (optionIndex >= 0) {
      const option = selection().options[optionIndex];
      if (option !== undefined) handleSelectUpgrade(option.name);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm && isGamepad()) {
      confirmSelection();
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "BlessSelection",
        hittest: true
      }, null);
      libs.createElement("Panel", {
        id: "BG"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "SelectionConent"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "Title"
      }, _el$3);
      libs.createElement("Image", {
        "class": "LeftIcon"
      }, _el$4);
      const _el$6 = libs.createElement("Panel", {
        "class": "TitleCenter"
      }, _el$4),
      _el$7 = libs.createElement("Panel", {
        "class": "TitleTextRow"
      }, _el$6);
      libs.createElement("Label", {
        id: "UpgradeTitle",
        text: "#BlessSelectionTitle"
      }, _el$7);
      libs.createElement("Image", {
        "class": "RightIcon"
      }, _el$4);
      const _el$1 = libs.createElement("Panel", {
        id: "Options"
      }, _el$3),
      _el$10 = libs.createElement("Panel", {
        id: "Footer"
      }, _el$3),
      _el$11 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$10),
      _el$17 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$10),
      _el$22 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$10);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "ParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_huang_01.vpcf",
        cameraOrigin: "0 0 700",
        fov: 80,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return multiChoiceState().bless_selection > 1;
      },
      get children() {
        const _el$9 = libs.createElement("Label", {
          id: "UpgradeCount",
          get text() {
            return `(${multiChoiceState().bless_selection})`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$9, "text", `(${multiChoiceState().bless_selection})`, _$p));
        return _el$9;
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, i) => {
        const delay = (selection().options.length - 1 - i()) * 0.08;
        return (() => {
          const _el$25 = libs.createElement("Panel", {
            "class": "SelectionOption",
            animationDelay: `${delay}s`
          }, null);
          libs.use(panel => optionPanels[i()] = panel, _el$25);
          libs.setProp(_el$25, "onactivate", () => handleSelectUpgrade(option.name));
          libs.setProp(_el$25, "onmouseover", self => ShowCustomTooltip(self, "bless_selection", {
            itemName: option.name,
            upText: option.up ? "#Bless_UP" : ""
          }));
          libs.setProp(_el$25, "onmouseout", self => HideCustomTooltip(self, "bless_selection"));
          libs.setProp(_el$25, "animationDelay", `${delay}s`);
          libs.insert(_el$25, libs.createComponent(common_box.CommonBox, {
            get itemName() {
              return option.name;
            },
            get rarity() {
              return option.rarity;
            },
            get hotkey() {
              return libs.memo(() => !!!isGamepad())() ? optionHotkeys()[i()] : undefined;
            }
          }), null);
          libs.insert(_el$25, libs.createComponent(libs.Show, {
            get when() {
              return option.up;
            },
            get children() {
              return libs.createElement("Panel", {
                id: "UpgradeIcon"
              }, null);
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$25, "classList", {
            Selected: selectedIndex() == i() && isGamepad()
          }, _$p));
          return _el$25;
        })();
      }
    }));
    libs.insert(_el$11, libs.createComponent(libs.Show, {
      get when() {
        return selection().free_refresh_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isGamepad() && footerActions().findIndex(action => action.key == "free_refresh") >= 0 && selectedIndex() == selection().options.length + footerActions().findIndex(action => action.key == "free_refresh")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_bless_refresh", {
              type: "free"
            });
          },
          onmouseover: () => {
            const actionIndex = footerActions().findIndex(action => action.key == "free_refresh");
            if (actionIndex >= 0) {
              setSelectedIndex(selection().options.length + actionIndex);
            }
          },
          text: "#refresh_count",
          get vars() {
            return {
              cur: selection().free_refresh_count
            };
          },
          get children() {
            return libs.createElement("Panel", {
              id: "ButtonGamepadSelected"
            }, null);
          }
        });
      }
    }), null);
    libs.insert(_el$11, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!(selection().pay_refresh_count > 0 && selection().free_refresh_count <= 0))() && payRefreshAvailableCount() > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          html: true,
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isGamepad() && footerActions().findIndex(action => action.key == "pay_refresh") >= 0 && selectedIndex() == selection().options.length + footerActions().findIndex(action => action.key == "pay_refresh")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_bless_refresh", {
              type: "pay"
            });
          },
          onmouseover: () => {
            const actionIndex = footerActions().findIndex(action => action.key == "pay_refresh");
            if (actionIndex >= 0) {
              setSelectedIndex(selection().options.length + actionIndex);
            }
          },
          get children() {
            return [libs.createElement("Panel", {
              id: "ButtonGamepadSelected"
            }, null), (() => {
              const _el$14 = libs.createElement("Panel", {
                  align: "center center",
                  flowChildren: "right"
                }, null),
                _el$15 = libs.createElement("Label", {
                  text: "#refresh_count",
                  get vars() {
                    return {
                      cur: Math.min(selection().pay_refresh_count, payRefreshAvailableCount())
                    };
                  }
                }, _el$14),
                _el$16 = libs.createElement("Label", {
                  id: "PayRefreshCost",
                  get text() {
                    return payRefreshCost().itemCount;
                  }
                }, _el$14);
              libs.setProp(_el$14, "align", "center center");
              libs.setProp(_el$14, "flowChildren", "right");
              libs.effect(_p$ => {
                const _v$ = {
                    cur: Math.min(selection().pay_refresh_count, payRefreshAvailableCount())
                  },
                  _v$2 = payRefreshCost().itemCount;
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$15, "vars", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "text", _v$2, _p$._v$2));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined
              });
              return _el$14;
            })()];
          }
        });
      }
    }), null);
    libs.insert(_el$17, libs.createComponent(libs.Show, {
      get when() {
        return selection().give_up == true;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          html: true,
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isGamepad() && footerActions()[0]?.key == "give_up" && selectedIndex() == selection().options.length
            });
          },
          onactivate: () => handleSelectUpgrade(),
          onmouseover: () => setSelectedIndex(selection().options.length),
          get children() {
            return [libs.createElement("Panel", {
              id: "ButtonGamepadSelected"
            }, null), (() => {
              const _el$19 = libs.createElement("Panel", {
                  align: "center center",
                  flowChildren: "right"
                }, null);
                libs.createElement("Label", {
                  text: "#bless_give_up"
                }, _el$19);
                const _el$21 = libs.createElement("Label", {
                  id: "GiveUpGold",
                  get text() {
                    return giveUpGold();
                  }
                }, _el$19);
              libs.setProp(_el$19, "align", "center center");
              libs.setProp(_el$19, "flowChildren", "right");
              libs.effect(_$p => libs.setProp(_el$21, "text", giveUpGold(), _$p));
              return _el$19;
            })()];
          }
        });
      }
    }));
    libs.insert(_el$22, libs.createComponent(libs.Show, {
      get when() {
        return selection().allin_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isGamepad() && footerActions().findIndex(action => action.key == "allin") >= 0 && selectedIndex() == selection().options.length + footerActions().findIndex(action => action.key == "allin")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_bless_allin", {});
          },
          onmouseover: () => {
            const actionIndex = footerActions().findIndex(action => action.key == "allin");
            if (actionIndex >= 0) {
              setSelectedIndex(selection().options.length + actionIndex);
            }
          },
          text: "#allin_count",
          get vars() {
            return {
              cur: selection().allin_count
            };
          },
          get children() {
            return libs.createElement("Panel", {
              id: "ButtonGamepadSelected"
            }, null);
          }
        });
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "classList", {
      Show: multiChoiceState().active_type === "Blessing"
    }, _$p));
    return _el$;
  })();
};

const INTERACT_UPDATE_INTERVAL = 1000 / 30;
const isSameInteractCostInfo = (left, right) => {
  return left === right || left?.cost === right?.cost && left?.costType === right?.costType && left?.costSource === right?.costSource && left?.resourceKey === right?.resourceKey && left?.freeKey === right?.freeKey && left?.freeCount === right?.freeCount;
};
const isSameInteractPrompt = (left, right) => {
  return left === right || left?.key === right?.key && left?.type === right?.type && left?.tooltip === right?.tooltip && left?.icon === right?.icon && isSameInteractCostInfo(left?.costInfo, right?.costInfo) && left?.enoughResource === right?.enoughResource && left?.hasSecondaryAction === right?.hasSecondaryAction && left?.secondaryTooltip === right?.secondaryTooltip && isSameInteractCostInfo(left?.secondaryCostInfo, right?.secondaryCostInfo) && left?.secondaryEnoughResource === right?.secondaryEnoughResource && left?.itemName === right?.itemName && left?.rarity === right?.rarity && left?.isUpgrade === right?.isUpgrade;
};
const BottomBar = () => {
  const playerID = Players.GetLocalPlayer();
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const difficultyKey = solid_utils.createNetDataSignal("common", "difficulty_key");
  const heroSelection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const autoCastState = solid_utils.createPlayerNetDataSignal("common", "autocast_enabled", {
    enabled: 1
  });
  const playerResource = solid_utils.createPlayerNetDataSignal("player_data", "resource");
  const interactHold = solid_utils.createPlayerNetDataSignal("common", "interact_hold", {
    active: 0,
    progress: 0,
    threshold: 1.5
  });
  const player_tokens = solid_utils.createServiceNetData("player_tokens", {});
  const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
  const player_counters = solid_utils.createServiceNetData("player_counters", {});
  const interactables = solid_utils.createNetDataSignal("interactables", "list");
  const showDungeonKeyInfo = libs.createMemo(() => gameState()?.state === "GameState_Dungeon" && difficultyKey() != undefined);
  const dungeonKeyName = libs.createMemo(() => {
    const key = difficultyKey();
    if (key == undefined) {
      return "";
    }
    return GetLocalization("#" + key.key_data.key_item_id);
  });
  libs.createEffect(libs.on(showDungeonKeyInfo, visible => {
    if (visible) {
      $.Schedule(3, () => {
        Game.EmitSound("UI.Key.Show");
      });
    }
  }));
  const [upgradeExpPct, setUpgradeExpPct] = libs.createSignal(0);
  const [heroName, setHeroName] = libs.createSignal(Object.keys(KeyValues.heroes)[0]);
  const [heroLevel, setHeroLevel] = libs.createSignal(1);
  const [health, setHealth] = libs.createSignal(0);
  const [attack, setAttack] = libs.createSignal(0);
  const [armor, setArmor] = libs.createSignal(0);
  const [maxHealth, setMaxHealth] = libs.createSignal(1);
  const [healthPercent, setHealthPercent] = libs.createSignal(100);
  const [mana, setMana] = libs.createSignal(0);
  const [maxMana, setMaxMana] = libs.createSignal(1);
  const [manaPercent, setManaPercent] = libs.createSignal(100);
  const [interactInfo, setInteractInfo] = libs.createSignal();
  const [keyBindings, setKeyBindings] = libs.createSignal({
    ...DEFAULT_KEYBOARD_BINDINGS
  });
  const [gamepadBindings, setGamepadBindings] = libs.createSignal({
    ...DEFAULT_GAMEPAD_BINDINGS
  });
  const autoCastHotkey = libs.createMemo(() => keyBindings()[KeyFunction.ToggleAutoCast] ?? DEFAULT_KEYBOARD_BINDINGS[KeyFunction.ToggleAutoCast] ?? "");
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  libs.createEffect(libs.on(player_key_values, data => {
    const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
    const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
    const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
    const bindings = {
      ...defaults
    };
    const nextGamepadBindings = {
      ...DEFAULT_GAMEPAD_BINDINGS
    };
    for (const key in data) {
      const kbPrefix = `keybind_keyboard${modePrefix}_`;
      if (key.startsWith(kbPrefix)) {
        const func = key.replace(kbPrefix, "");
        bindings[func] = data[key].value;
      }
      if (key.startsWith("keybind_gamepad_")) {
        const func = key.replace("keybind_gamepad_", "");
        nextGamepadBindings[func] = data[key].value;
      }
    }
    setKeyBindings(bindings);
    setGamepadBindings(nextGamepadBindings);
  }));
  const getAbilityHotkey = index => {
    const keyFunctions = [KeyFunction.Attack, KeyFunction.Skill, KeyFunction.Dodge, KeyFunction.Defense, KeyFunction.Ultimate];
    if (index < keyFunctions.length) {
      const func = keyFunctions[index];
      if (isGamepad()) {
        return gamepadBindings()[func] ?? DEFAULT_GAMEPAD_BINDINGS[func] ?? "";
      }
      return keyBindings()[func] ?? DEFAULT_KEYBOARD_BINDINGS[func] ?? "";
    }
    return "";
  };
  const getInteractHotkey = () => {
    if (isGamepad()) {
      return gamepadBindings()[KeyFunction.Interact] ?? DEFAULT_GAMEPAD_BINDINGS[KeyFunction.Interact] ?? "";
    }
    return keyBindings()[KeyFunction.Interact] ?? DEFAULT_KEYBOARD_BINDINGS[KeyFunction.Interact];
  };
  const hasEnoughCost = costInfo => {
    if (costInfo === undefined || costInfo.cost <= 0) {
      return true;
    }
    if (costInfo.costSource === "tokens") {
      const tokenKey = String(costInfo.resourceKey ?? costInfo.costType ?? "");
      return (player_tokens()?.[tokenKey]?.amounts ?? 0) >= costInfo.cost;
    }
    const resourceKey = String(costInfo.resourceKey ?? costInfo.costType ?? "gold");
    const resourceValue = playerResource()?.[resourceKey] ?? 0;
    return resourceValue >= costInfo.cost;
  };
  const getFreeCount = freeKey => {
    if (!freeKey) return 0;
    return player_counters()?.[freeKey]?.count ?? 0;
  };
  const findNearestInteractable = heroIndex => {
    const interactableList = interactables();
    if (interactableList === undefined) {
      return undefined;
    }
    const heroOrigin = Entities.GetAbsOrigin(heroIndex);
    let nearestInteractable = undefined;
    let nearestDistanceSquared = Infinity;
    for (const key in interactableList) {
      const interactable = interactableList[key];
      if (interactable.visibleToPlayerID != undefined && interactable.visibleToPlayerID != playerID) {
        continue;
      }
      const currentCount = interactable.totalInteractions ?? 0;
      const maxInteractions = interactable.maxInteractions ?? 1;
      if (currentCount >= maxInteractions) {
        continue;
      }
      const dx = heroOrigin[0] - interactable.x;
      const dy = heroOrigin[1] - interactable.y;
      const distanceSquared = dx * dx + dy * dy;
      const radiusSquared = interactable.radius * interactable.radius;
      if (distanceSquared > radiusSquared || distanceSquared >= nearestDistanceSquared) {
        continue;
      }
      const costInfo = interactable.costInfo !== undefined ? {
        cost: interactable.costInfo.cost ?? 0,
        costType: interactable.costInfo.costType ?? "gold",
        costSource: interactable.costInfo.costSource,
        resourceKey: interactable.costInfo.resourceKey,
        freeCount: getFreeCount(interactable.costInfo?.freeKey)
      } : interactable.type == "ShopItem" ? {
        cost: service_netdata_helper.getShopItemDisplayCost(heroIndex, interactable.name, interactable.level),
        costType: "gold",
        costSource: "resource",
        resourceKey: "gold",
        freeCount: 0
      } : undefined;
      const secondaryCostInfo = interactable.secondaryCostInfo !== undefined ? {
        cost: interactable.secondaryCostInfo.cost ?? 0,
        costType: interactable.secondaryCostInfo.costType ?? "gold",
        costSource: interactable.secondaryCostInfo.costSource,
        resourceKey: interactable.secondaryCostInfo.resourceKey,
        freeCount: interactable.secondaryCostInfo?.freeCount ?? 0
      } : undefined;
      const enoughResource = hasEnoughCost(costInfo);
      const secondaryEnoughResource = hasEnoughCost(secondaryCostInfo);
      nearestInteractable = {
        key: key,
        type: interactable.type ?? "",
        tooltip: interactable.tooltip,
        icon: interactable.icon,
        costInfo,
        enoughResource,
        hasSecondaryAction: Boolean(interactable.hasSecondaryAction),
        secondaryTooltip: interactable.secondaryTooltip,
        secondaryCostInfo,
        secondaryEnoughResource,
        itemName: interactable.name,
        rarity: interactable.level,
        isUpgrade: interactable.type == "ShopItem" && service_netdata_helper.getShopItemUpgradeInfo(heroIndex, interactable.name)?.isUpgrade === true
      };
      nearestDistanceSquared = distanceSquared;
    }
    return nearestInteractable;
  };
  const updateInteractInfo = () => {
    const heroIndex = heroSelection()?.heroIndex;
    const nextInteractInfo = heroIndex && Entities.IsValidEntity(heroIndex) ? findNearestInteractable(heroIndex) : undefined;
    setInteractInfo(currentInteractInfo => isSameInteractPrompt(currentInteractInfo, nextInteractInfo) ? currentInteractInfo : nextInteractInfo);
  };
  const updateHeroData = () => {
    const heroIndex = heroSelection()?.heroIndex;
    if (!heroIndex || !Entities.IsValidEntity(heroIndex)) {
      return;
    }
    setHeroName(Entities.GetUnitName(heroIndex));
    const level = Entities.GetLevel(heroIndex);
    const maxLv = HERO_XP_PER_LEVEL_TABLE.length;
    let isMax = level >= maxLv;
    let expPct = 0;
    if (isMax) {
      expPct = 100;
    } else {
      const totalUpgradeNeedXp = Entities.GetNeededXPToLevel(heroIndex);
      const totalXp = Entities.GetCurrentXP(heroIndex);
      const needUpgradeXp = totalUpgradeNeedXp - totalXp;
      const lvUpgradeXp = Math.max(1, totalUpgradeNeedXp - toFiniteNumber(HERO_XP_PER_LEVEL_TABLE[level - 1]));
      expPct = (lvUpgradeXp - needUpgradeXp) / lvUpgradeXp * 100;
    }
    setHeroLevel(level);
    setUpgradeExpPct(expPct);
    const currentHealth = Entities.GetHealth(heroIndex);
    const currentMaxHealth = Entities.GetMaxHealth(heroIndex);
    setHealth(currentHealth);
    setMaxHealth(currentMaxHealth);
    setHealthPercent(currentMaxHealth > 0 ? currentHealth / currentMaxHealth * 100 : 0);
    const currentMana = Entities.GetMana(heroIndex);
    const currentMaxMana = Entities.GetMaxMana(heroIndex);
    setMana(currentMana);
    setMaxMana(currentMaxMana);
    setManaPercent(currentMaxMana > 0 ? currentMana / currentMaxMana * 100 : 0);
    setAttack(Round(Entities.GetAttackDamage(heroIndex)));
    setArmor(Entities.GetPropertyValue(heroIndex, "damage_reduction"));
    const currentTime = Game.GetGameTime() * 1000;
    if (currentTime - lastAbilityUpdateTime >= ABILITY_UPDATE_INTERVAL) {
      updateAbilityList();
      lastAbilityUpdateTime = currentTime;
    }
  };
  let uiAbilityList;
  let usedAbilityPanels = 0;
  let abilityPanels = [];
  let lastAbilityUpdateTime = 0;
  const ABILITY_UPDATE_INTERVAL = 100;
  const indexList = [3, 0, 1, 2, 5];
  function initAbilityList() {
    if (!uiAbilityList) {
      return;
    }
    const heroIndex = heroSelection()?.heroIndex;
    if (!heroIndex || !Entities.IsValidEntity(heroIndex)) {
      return;
    }
    usedAbilityPanels = 0;
    for (let i = 0; i < indexList.length; i++) {
      const abilityIdx = indexList[i];
      const abilityIndex = Entities.GetAbility(heroIndex, abilityIdx);
      if (!abilityIndex) {
        continue;
      }
      const abilityName = Abilities.GetAbilityName(abilityIndex);
      if (abilityName && !abilityName.includes("attribute_bonus") && !abilityName.includes("empty")) {
        let abilityPanel;
        if (usedAbilityPanels >= abilityPanels.length) {
          abilityPanel = libs.insert(uiAbilityList, libs.createComponent(AbilitySlot, {}));
          abilityPanels.push(abilityPanel);
        }
        abilityPanel = abilityPanels[usedAbilityPanels];
        abilityPanel.abilityEntityIndex = abilityIndex;
        abilityPanel.abilityName = abilityName;
        abilityPanel.hotkey = getAbilityHotkey(i);
        abilityPanel.abilityIdx = abilityIdx;
        let initFunc = LoadData(abilityPanel, "init");
        if (initFunc) {
          initFunc();
        }
        abilityPanel.RemoveClass("Hidden");
        usedAbilityPanels++;
      }
    }
    for (let i = usedAbilityPanels; i < abilityPanels.length; ++i) {
      let abilityPanel = abilityPanels[i];
      abilityPanel.AddClass("Hidden");
    }
  }
  function updateAbilityList() {
    if (!uiAbilityList) {
      return;
    }
    for (let i = 0; i < usedAbilityPanels; i++) {
      const panel = abilityPanels[i];
      panel.hotkey = getAbilityHotkey(i);
      let updateFunc = LoadData(panel, "update");
      if (updateFunc) {
        updateFunc();
      }
    }
  }
  libs.onMount(() => {
    const heroDataTimer = setInterval(() => {
      updateHeroData();
    }, 0);
    const interactTimer = setInterval(updateInteractInfo, INTERACT_UPDATE_INTERVAL);
    updateInteractInfo();
    let events = [GameEvents.Subscribe("dota_portrait_ability_layout_changed", initAbilityList), GameEvents.Subscribe("dota_player_update_selected_unit", initAbilityList), GameEvents.Subscribe("dota_player_update_query_unit", initAbilityList), GameEvents.Subscribe("dota_hero_ability_points_changed", initAbilityList)];
    initAbilityList();
    libs.onCleanup(() => {
      clearInterval(heroDataTimer);
      clearInterval(interactTimer);
      events.forEach(event => {
        GameEvents.Unsubscribe(event);
      });
    });
  });
  const abyssalState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_state");
  const hordeState = abyss_hud_shared.createNullableNetDataSignal("common", "abyssal_horde_state");
  const horde = libs.createMemo(() => hordeState());
  const modeState = libs.createMemo(() => abyssalState());
  const isVisible = libs.createMemo(() => {
    const state = modeState();
    const hordeSnapshot = horde();
    const isAbyssal = state?.state === "running" || hordeSnapshot?.isRunning === true || hordeSnapshot?.isLoading === true;
    return !isAbyssal;
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "BottomBar",
        hittest: false
      }, null),
      _el$7 = libs.createElement("Panel", {
        id: "LevelAndHealth"
      }, _el$),
      _el$8 = libs.createElement("Panel", {
        id: "HeroLevel"
      }, _el$7),
      _el$9 = libs.createElement("Image", {
        id: "HeroXpProgress",
        get style() {
          return {
            clip: `radial( 50% 50%, 360deg, ${upgradeExpPct() * 3.6}deg )`
          };
        }
      }, _el$8),
      _el$0 = libs.createElement("Label", {
        id: "HeroLevelLabel",
        get text() {
          return heroLevel().toString();
        }
      }, _el$8),
      _el$1 = libs.createElement("Panel", {
        id: "HealthBarContainer"
      }, _el$7);
      libs.createElement("Image", {
        "class": "HeroHealthBG"
      }, _el$1);
      const _el$11 = libs.createElement("Image", {
        "class": "HealthBar",
        get style() {
          return {
            clip: `rect( 0%, ${healthPercent()}%, 100%, 0% )`
          };
        }
      }, _el$1),
      _el$12 = libs.createElement("Panel", {
        "class": "ManaBarContainer"
      }, _el$1),
      _el$13 = libs.createElement("Image", {
        "class": "ManaBar",
        get style() {
          return {
            clip: `rect( 0%, ${manaPercent()}%, 100%, 0% )`
          };
        }
      }, _el$12),
      _el$14 = libs.createElement("Label", {
        "class": "HealthText",
        get text() {
          return `${Math.floor(health())}/${Math.floor(maxHealth())}`;
        }
      }, _el$1),
      _el$15 = libs.createElement("Label", {
        "class": "ManaText",
        get text() {
          return `${Math.floor(mana())}/${Math.floor(maxMana())}`;
        }
      }, _el$1),
      _el$16 = libs.createElement("Panel", {
        id: "AttributeContainer"
      }, _el$),
      _el$17 = libs.createElement("Panel", {
        "class": "PropRow"
      }, _el$16);
      libs.createElement("Image", {
        id: "PropAttack"
      }, _el$17);
      const _el$19 = libs.createElement("Label", {
        id: "PropValue",
        get text() {
          return attack();
        }
      }, _el$17),
      _el$20 = libs.createElement("Panel", {
        id: "UnitPanel"
      }, _el$),
      _el$22 = libs.createElement("Panel", {
        id: "PortraitContainer",
        hittest: false,
        hittestchildren: false
      }, _el$20);
      libs.createElement("Panel", {
        id: "PortraitBG"
      }, _el$22);
      const _el$24 = libs.createElement("Panel", {
        id: "AbilityBar"
      }, _el$20);
      libs.createElement("Image", {
        id: "AbilityBarBG"
      }, _el$24);
      const _el$26 = libs.createElement("Panel", {
        id: "AbilityList"
      }, _el$24),
      _el$27 = libs.createElement("Panel", {
        id: "ResourceList"
      }, _el$);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return showDungeonKeyInfo();
      },
      get children() {
        const _el$2 = libs.createElement("Panel", {
            id: "DungeonKeyInfo",
            hittest: false,
            hittestchildren: false
          }, null),
          _el$3 = libs.createElement("Panel", {
            horizontalAlign: "center"
          }, _el$2);
          libs.createElement("DOTAParticleScenePanel", {
            id: "SelectParticle",
            particleName: "particles/generic_gameplay/rune/wishing_pool_exite.vpcf",
            cameraOrigin: "0 0 300",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$3);
          const _el$5 = libs.createElement("Panel", {
            id: "DungeonKeyInfoTextContainer"
          }, _el$2),
          _el$6 = libs.createElement("Label", {
            id: "DungeonKeyInfoText",
            text: "#Key_UseName",
            get vars() {
              return {
                name: dungeonKeyName()
              };
            }
          }, _el$5);
        libs.setProp(_el$3, "horizontalAlign", "center");
        libs.insert(_el$3, libs.createComponent(server_dungeon_key.DungeonKey, {
          get data() {
            return difficultyKey().key_data;
          },
          showTooltip: false
        }), null);
        libs.effect(_$p => libs.setProp(_el$6, "vars", {
          name: dungeonKeyName()
        }, _$p));
        return _el$2;
      }
    }), _el$7);
    libs.setProp(_el$8, "onmouseover", () => ClientSideEvent("ToggleAttributeSummary", {
      state: true
    }));
    libs.setProp(_el$17, "tooltip", "#property_attack");
    libs.insert(_el$, libs.createComponent(ControlGuide, {
      get keyBindings() {
        return keyBindings();
      }
    }), _el$20);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return isVisible();
      },
      get children() {
        return libs.createComponent(InteractInfo, {
          get hotkey() {
            return getInteractHotkey();
          },
          get interactInfo() {
            return interactInfo();
          },
          get holdState() {
            return interactHold();
          },
          get isGamepad() {
            return isGamepad();
          }
        });
      }
    }), _el$20);
    libs.insert(_el$20, libs.createComponent(libs.Show, {
      get when() {
        return autoCastState()?.enabled !== 1;
      },
      get children() {
        const _el$21 = libs.createElement("Label", {
          id: "AutoCastTip",
          text: "#ControlGuide_AutoCastDisabled",
          get vars() {
            return {
              key: autoCastHotkey()
            };
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$21, "vars", {
          key: autoCastHotkey()
        }, _$p));
        return _el$21;
      }
    }), _el$22);
    libs.insert(_el$22, libs.createComponent(solid_utils.DynamicKey, {
      key: heroName,
      children: hero => libs.createComponent(portraitsFullBodyLoadout.PortraitsFullBodyLoadout, {
        id: "portraitHUD",
        unit: hero,
        background: true,
        camera: "card",
        get style() {
          return {
            align: "center center",
            width: "125px",
            height: "125px",
            opacityMask: getImagePath("hud/h_role_avatar_mask.png")
          };
        }
      })
    }), null);
    const _ref$ = uiAbilityList;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$26) : uiAbilityList = _el$26;
    libs.insert(_el$27, libs.createComponent(ResourceItem, {
      type: "Heart",
      get value() {
        return playerResource()?.heart ?? 0;
      },
      icon: "h_heart.png",
      tooltip: "#HeartInfo"
    }), null);
    libs.insert(_el$27, libs.createComponent(ResourceItem, {
      type: "Gold",
      get value() {
        return playerResource()?.gold ?? 0;
      },
      icon: "h_coin.png",
      tooltip: "#GoldInfo"
    }), null);
    libs.insert(_el$27, libs.createComponent(ResourceItem, {
      type: "RevivalCoin",
      get value() {
        return player_tokens()?.["110009"]?.amounts ?? 0;
      },
      get iconPath() {
        return getSrcPath("tokens/110009.png");
      },
      titleTooltip: {
        title: "#110009",
        text: "#110009_description"
      }
    }), null);
    libs.insert(_el$27, libs.createComponent(ResourceItem, {
      type: "BountyKey",
      get value() {
        return player_tokens()?.["110006"]?.amounts ?? 0;
      },
      get iconPath() {
        return getSrcPath("tokens/110006.png");
      },
      titleTooltip: {
        title: "#110006",
        text: "#110006_description"
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          clip: `radial( 50% 50%, 360deg, ${upgradeExpPct() * 3.6}deg )`
        },
        _v$2 = heroLevel().toString(),
        _v$3 = {
          clip: `rect( 0%, ${healthPercent()}%, 100%, 0% )`
        },
        _v$4 = {
          clip: `rect( 0%, ${manaPercent()}%, 100%, 0% )`
        },
        _v$5 = `${Math.floor(health())}/${Math.floor(maxHealth())}`,
        _v$6 = `${Math.floor(mana())}/${Math.floor(maxMana())}`,
        _v$7 = attack();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$9, "style", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$0, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$11, "style", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$13, "style", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$14, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$15, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$19, "text", _v$7, _p$._v$7));
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
  })();
};
const ResourceItem = props => {
  const merged = libs.mergeProps(props, {
    class: "ResourceItem"
  }, {
    id: props.type
  });
  const [local, others] = libs.splitProps(merged, ['type', 'icon', 'iconPath', "value"]);
  return (() => {
    const _el$28 = libs.createElement("Panel", others, null),
      _el$29 = libs.createElement("Panel", {
        align: "right center",
        flowChildren: "left"
      }, _el$28),
      _el$30 = libs.createElement("Image", {
        get src() {
          return local.iconPath ?? getSrcPath("hud/" + (local.icon ?? ""));
        }
      }, _el$29),
      _el$31 = libs.createElement("Label", {
        get text() {
          return local.value;
        }
      }, _el$29);
    libs.spread(_el$28, others, true);
    libs.setProp(_el$29, "align", "right center");
    libs.setProp(_el$29, "flowChildren", "left");
    libs.effect(_p$ => {
      const _v$8 = local.iconPath ?? getSrcPath("hud/" + (local.icon ?? "")),
        _v$9 = local.value;
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$30, "src", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$31, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$28;
  })();
};
const getInteractActionText = (interactType, tooltip) => {
  const actionKey = tooltip && tooltip !== "" ? tooltip : interactType;
  if (actionKey === "") {
    return "";
  }
  const token = `#Interact_${actionKey}`;
  return GetLocalization(token, "#Interact_Default");
};
const getCostTypeClass = costType => {
  return costType === "gold" ? "Gold" : costType;
};
const InteractInfoRow = props => {
  const freeCount = () => {
    return props.costInfo?.freeCount ?? 0;
  };
  const hasCost = () => (props.costInfo?.cost ?? 0) > 0 || freeCount() > 0;
  const costTypeClass = () => getCostTypeClass(props.costInfo?.costType ?? "");
  const costIcon = () => costTypeClass().startsWith("1") ? (() => {
    const _el$32 = libs.createElement("Panel", {
      get ["class"]() {
        return libs.classNames("CostIcon");
      },
      get backgroundImage() {
        return getImagePath(`tokens/${costTypeClass()}.png`);
      }
    }, null);
    libs.effect(_p$ => {
      const _v$0 = libs.classNames("CostIcon"),
        _v$1 = getImagePath(`tokens/${costTypeClass()}.png`);
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$32, "class", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$32, "backgroundImage", _v$1, _p$._v$1));
      return _p$;
    }, {
      _v$0: undefined,
      _v$1: undefined
    });
    return _el$32;
  })() : (() => {
    const _el$33 = libs.createElement("Panel", {
      get ["class"]() {
        return libs.classNames("CostIcon", `${costTypeClass()}Icon`);
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$33, "class", libs.classNames("CostIcon", `${costTypeClass()}Icon`), _$p));
    return _el$33;
  })();
  const progressPercent = () => Math.floor(Math.max(0, Math.min(1, props.progress ?? 0)) * 100);
  return (() => {
    const _el$34 = libs.createElement("Panel", {
        "class": "InteractInfoRow"
      }, null),
      _el$35 = libs.createElement("Panel", {
        "class": "InteractProgressTrack"
      }, _el$34),
      _el$36 = libs.createElement("Panel", {
        "class": "InteractProgressFill",
        get style() {
          return {
            clip: `rect( 0%, ${progressPercent()}%, 100%, 0% )`
          };
        }
      }, _el$35),
      _el$38 = libs.createElement("Label", {
        "class": "InteractAction",
        get text() {
          return props.actionText;
        }
      }, _el$34),
      _el$39 = libs.createElement("Panel", {
        "class": "InteractCost"
      }, _el$34);
      libs.createElement("Label", {
        "class": "InteractCostPrefix",
        text: "("
      }, _el$39);
      const _el$42 = libs.createElement("Label", {
        "class": "InteractCostSuffix",
        text: ")"
      }, _el$39);
    libs.insert(_el$34, libs.createComponent(libs.Show, {
      get when() {
        return props.longPress === true;
      },
      get children() {
        return libs.createElement("Label", {
          "class": "InteractPrefix",
          text: "#Interact_LongPress"
        }, null);
      }
    }), _el$38);
    libs.insert(_el$34, libs.createComponent(libs.Show, {
      get when() {
        return props.isGamepad === true;
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return props.hotkey;
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return props.hotkey;
          }
        });
      }
    }), _el$38);
    libs.insert(_el$39, libs.createComponent(libs.Switch, {
      get fallback() {
        return [libs.memo(costIcon), (() => {
          const _el$43 = libs.createElement("Label", {
            "class": "InteractCostValue",
            get text() {
              return `-${props.costInfo?.cost ?? 0}`;
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$43, "text", `-${props.costInfo?.cost ?? 0}`, _$p));
          return _el$43;
        })()];
      },
      get children() {
        return libs.createComponent(libs.Match, {
          get when() {
            return freeCount() > 0;
          },
          get children() {
            const _el$41 = libs.createElement("Label", {
              "class": "InteractCostValue",
              get text() {
                return `剩余${freeCount()}次`;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$41, "text", `剩余${freeCount()}次`, _$p));
            return _el$41;
          }
        });
      }
    }), _el$42);
    libs.effect(_p$ => {
      const _v$10 = {
          Secondary: props.longPress === true
        },
        _v$11 = props.longPress === true,
        _v$12 = {
          clip: `rect( 0%, ${progressPercent()}%, 100%, 0% )`
        },
        _v$13 = props.actionText,
        _v$14 = hasCost(),
        _v$15 = {
          NoEnough: props.enoughResource === false && freeCount() <= 0
        };
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$34, "classList", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$35, "visible", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$36, "style", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$38, "text", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$39, "visible", _v$14, _p$._v$14));
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$39, "classList", _v$15, _p$._v$15));
      return _p$;
    }, {
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined,
      _v$15: undefined
    });
    return _el$34;
  })();
};
const AbilitySlot = () => {
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const [hasCharges, setHasCharges] = libs.createSignal(false);
  const [abilityName, setAbilityName] = libs.createSignal("");
  const [abilityEntityIndex, setAbilityEntityIndex] = libs.createSignal(-1);
  const [hotkey, setHotKey] = libs.createSignal("");
  const [hasCooldown, setHasCooldown] = libs.createSignal(false);
  const [noMana, setNoMana] = libs.createSignal(false);
  const [cooldownText, setCooldownText] = libs.createSignal(0);
  const [cooldownPercent, setCooldownPercent] = libs.createSignal(100);
  const [chargeRestorePercent, setChargeRestorePercent] = libs.createSignal(0);
  const [charges, setCharges] = libs.createSignal(0);
  const [shouldNoTransition, setShouldNoTransition] = libs.createSignal(false);
  const [self, setSelf] = libs.createSignal();
  const [manaCost, setManaCost] = libs.createSignal(0);
  const [canAutoCast, setCanAutoCast] = libs.createSignal(false);
  const [isAutoCast, setIsAutoCast] = libs.createSignal(false);
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  const getAutoCastState = abilityIndex => {
    return Boolean(Abilities.GetAutoCastState?.(abilityIndex));
  };
  const updateAutoCastState = abilityIndex => {
    if (abilityIndex === undefined) {
      return;
    }
    const behavior = Abilities.GetBehavior(abilityIndex);
    const hasAutoCastBehavior = (behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST;
    setCanAutoCast(hasAutoCastBehavior);
    setIsAutoCast(hasAutoCastBehavior && getAutoCastState(abilityIndex));
  };
  const toggleAutoCast = () => {
    const abilityIndex = abilityEntityIndex();
    if (!abilityIndex || !Entities.IsValidEntity(abilityIndex) || !canAutoCast()) {
      return;
    }
    Game.PrepareUnitOrders({
      OrderType: dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO,
      UnitIndex: Abilities.GetCaster(abilityIndex),
      AbilityIndex: abilityIndex,
      QueueBehavior: OrderQueueBehavior_t.DOTA_ORDER_QUEUE_NEVER,
      ShowEffects: false
    });
    const AbilityTag = KeyValues.npc_abilities_custom[abilityName()]?.AbilityTag;
    if (AbilityTag != undefined && AbilityTag != "") {
      Players.SetPlayerSetting("setting_switch_" + AbilityTag, !Players.GetPlayerSetting("setting_switch_" + AbilityTag, false));
    }
    setIsAutoCast(getAutoCastState(abilityIndex));
  };
  function Init() {
    const selfPanel = self();
    if (!selfPanel) {
      return;
    }
    setAbilityName(selfPanel.abilityName);
    setAbilityEntityIndex(selfPanel.abilityEntityIndex);
    updateAutoCastState(selfPanel.abilityEntityIndex);
  }
  function UpdateData() {
    const selfPanel = self();
    if (!selfPanel) {
      return;
    }
    const abilityIndex = abilityEntityIndex();
    if (!abilityIndex || !Entities.IsValidEntity(abilityIndex)) {
      return;
    }
    setHotKey(selfPanel.hotkey || "");
    const manaCost = Abilities.GetManaCost(abilityIndex);
    const cooldownRemaining = Abilities.GetCooldownTimeRemaining(abilityIndex);
    const cooldownLength = Abilities.GetAbilityCooldown(abilityIndex);
    const chargeInfo = Abilities.GetChargeInfo(abilityIndex);
    updateAutoCastState(abilityIndex);
    const maxCharges = chargeInfo.maxCharge;
    const currentCharges = chargeInfo.charge;
    const chargeRemainingTime = chargeInfo.isChargeCooldownFrozen ? Math.max(0, chargeInfo.chargeFrozenCooldownRemaining ?? 0) : Math.max(0, chargeInfo.chargeRestoreTime - Game.GetGameTime());
    setHasCharges(maxCharges > 1);
    setCharges(currentCharges);
    const oldProgress = chargeRestorePercent();
    if (maxCharges > 1 && chargeInfo.chargeRestoreTime > 0) {
      const progress = Math.max(0, Math.min(100, (1 - chargeRemainingTime / Math.max(cooldownLength, 0.001)) * 100));
      setShouldNoTransition(progress < oldProgress);
      setChargeRestorePercent(progress);
    } else {
      setShouldNoTransition(true);
      setChargeRestorePercent(100);
    }
    if (selfPanel.abilityIdx == 3) {
      return;
    }
    const displayCooldownRemaining = maxCharges > 1 && currentCharges === 0 ? Math.max(cooldownRemaining, chargeRemainingTime) : cooldownRemaining;
    setHasCooldown(displayCooldownRemaining > 0);
    setManaCost(manaCost);
    setNoMana(!Abilities.IsOwnersManaEnough(abilityIndex));
    setCooldownText(Math.ceil(displayCooldownRemaining));
    if (displayCooldownRemaining <= 0) {
      setCooldownPercent(100);
    } else {
      setCooldownPercent(cooldownLength > 0 ? displayCooldownRemaining / cooldownLength * 100 : 0);
    }
  }
  libs.createEffect(libs.on(self, () => {
    const selfPanel = self();
    if (!selfPanel) {
      return;
    }
    if (selfPanel) {
      Init();
      UpdateData();
      SaveData(selfPanel, "init", Init);
      SaveData(selfPanel, "update", UpdateData);
    }
  }));
  return (() => {
    const _el$44 = libs.createElement("Panel", {
        "class": "AbilitySlot"
      }, null),
      _el$45 = libs.createElement("Panel", {
        "class": "AbilityImageContainer"
      }, _el$44);
      libs.createElement("Image", {
        id: "AbilitySlotBorder",
        hittest: false
      }, _el$45);
      const _el$47 = libs.createElement("DOTAAbilityImage", {
        get abilityname() {
          return abilityName();
        }
      }, _el$45),
      _el$48 = libs.createElement("Panel", {
        "class": "CooldownOverlay",
        hittest: false
      }, _el$45),
      _el$49 = libs.createElement("Label", {
        "class": "CooldownNumber",
        get text() {
          return cooldownText();
        },
        hittest: false
      }, _el$48),
      _el$50 = libs.createElement("Image", {
        "class": "CooldownSweep",
        get height() {
          return `${cooldownPercent()}%`;
        },
        hittest: false
      }, _el$48);
      libs.createElement("DOTAParticleScenePanel", {
        id: "AutoCasting",
        particleName: "particles/ui/hud/autocasting_square.vpcf",
        cameraOrigin: "0 0 32",
        lookAt: "0 0 0",
        fov: "110",
        hittest: false,
        particleonly: true
      }, _el$45);
      const _el$52 = libs.createElement("Panel", {
        id: "AbilityCharges",
        hittest: false,
        hittestchildren: false
      }, _el$45),
      _el$53 = libs.createElement("Panel", {
        id: "AbilityChargesBorder",
        get style() {
          return {
            clip: `radial( 50% 50%, 0deg, ${chargeRestorePercent() * 3.6}deg )`
          };
        }
      }, _el$52),
      _el$54 = libs.createElement("Label", {
        "class": "NormalCount",
        get text() {
          return charges().toString();
        }
      }, _el$52),
      _el$55 = libs.createElement("Label", {
        id: "ManaCost",
        get text() {
          return manaCost();
        }
      }, _el$45);
    libs.use(p => setSelf(p), _el$44);
    libs.setProp(_el$44, "oncontextmenu", toggleAutoCast);
    libs.insert(_el$44, libs.createComponent(libs.Show, {
      get when() {
        return isGamepad();
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return hotkey();
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return hotkey();
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$16 = {
          Cooldown: hasCooldown(),
          NoMana: noMana(),
          AutoCast: isAutoCast(),
          CanAutoCast: canAutoCast()
        },
        _v$17 = abilityName(),
        _v$18 = {
          name: "hero_ability",
          abilityName: abilityName(),
          entIndex: abilityEntityIndex()
        },
        _v$19 = hasCooldown(),
        _v$20 = cooldownText(),
        _v$21 = `${cooldownPercent()}%`,
        _v$22 = hasCharges(),
        _v$23 = {
          clip: `radial( 50% 50%, 0deg, ${chargeRestorePercent() * 3.6}deg )`
        },
        _v$24 = {
          NoTransition: shouldNoTransition()
        },
        _v$25 = charges().toString(),
        _v$26 = manaCost() > 0,
        _v$27 = manaCost();
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$44, "classList", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$47, "abilityname", _v$17, _p$._v$17));
      _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$47, "customTooltip", _v$18, _p$._v$18));
      _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$48, "visible", _v$19, _p$._v$19));
      _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$49, "text", _v$20, _p$._v$20));
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$50, "height", _v$21, _p$._v$21));
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$52, "visible", _v$22, _p$._v$22));
      _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$53, "style", _v$23, _p$._v$23));
      _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$53, "classList", _v$24, _p$._v$24));
      _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$54, "text", _v$25, _p$._v$25));
      _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$55, "visible", _v$26, _p$._v$26));
      _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$55, "text", _v$27, _p$._v$27));
      return _p$;
    }, {
      _v$16: undefined,
      _v$17: undefined,
      _v$18: undefined,
      _v$19: undefined,
      _v$20: undefined,
      _v$21: undefined,
      _v$22: undefined,
      _v$23: undefined,
      _v$24: undefined,
      _v$25: undefined,
      _v$26: undefined,
      _v$27: undefined
    });
    return _el$44;
  })();
};
const ControlGuide = props => {
  const player_diff_first_passes = solid_utils.createServiceNetData("player_common_first_passes", {});
  const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
  const [bRequesting, SetRequesting] = libs.createSignal(false);
  const hide = () => player_diff_first_passes()[1] != undefined;
  const movekeys = libs.createMemo(() => {
    const keyFunctions = ["", KeyFunction.Up, "", KeyFunction.Left, KeyFunction.Down, KeyFunction.Right];
    let keys = [];
    for (let i = 0; i < keyFunctions.length; i++) {
      let key = props.keyBindings[keyFunctions[i]];
      keys.push(key);
    }
    return keys;
  });
  const abilityKeys = libs.createMemo(() => {
    const keyFunctions = [KeyFunction.Attack, KeyFunction.Skill];
    let keys = [];
    for (let i = 0; i < keyFunctions.length; i++) {
      let key = props.keyBindings[keyFunctions[i]];
      keys.push(key);
    }
    return keys;
  });
  const show_control_guide_key = "show_control_guide";
  return (() => {
    const _el$56 = libs.createElement("Panel", {
        id: "ControlGuideRoot",
        get ["class"]() {
          return libs.classNames({
            Hide: hide(),
            FoldUp: Boolean(player_key_values()[show_control_guide_key]?.value ?? false)
          });
        }
      }, null),
      _el$57 = libs.createElement("Panel", {
        id: "ControlGuidePanel"
      }, _el$56),
      _el$58 = libs.createElement("Panel", {
        id: "MoveKeys",
        "class": "KeysContainer"
      }, _el$57),
      _el$59 = libs.createElement("Panel", {
        "class": "KeyList"
      }, _el$58);
      libs.createElement("Label", {
        id: "KeyDes",
        text: "#ControlGuide_Move"
      }, _el$58);
      const _el$61 = libs.createElement("Panel", {
        id: "AbilityKeys",
        "class": "KeysContainer"
      }, _el$57),
      _el$62 = libs.createElement("Panel", {
        "class": "KeyList"
      }, _el$61);
      libs.createElement("Label", {
        id: "KeyDes",
        text: "#ControlGuide_CastSkill"
      }, _el$61);
      const _el$64 = libs.createElement("Panel", {
        id: "MoveKeys",
        "class": "KeysContainer FoldUpShow"
      }, _el$56),
      _el$65 = libs.createElement("Panel", {
        "class": "KeyList"
      }, _el$64);
      libs.createElement("Label", {
        id: "KeyDes",
        text: "#ControlGuide_Move"
      }, _el$64);
    libs.insert(_el$59, libs.createComponent(libs.For, {
      get each() {
        return movekeys();
      },
      children: key => {
        return (() => {
          const _el$67 = libs.createElement("Panel", {
            "class": "KeyContainer"
          }, null);
          libs.insert(_el$67, libs.createComponent(libs.Show, {
            when: key,
            get children() {
              return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                hotkey: key
              });
            }
          }));
          return _el$67;
        })();
      }
    }));
    libs.insert(_el$62, libs.createComponent(libs.For, {
      get each() {
        return abilityKeys();
      },
      children: key => {
        const replaceKey = () => {
          return key == "MOUSE0" || key == "MOUSE1" ? getSrcPath("hud/h_key_mouse_big_01.png") : key;
        };
        return (() => {
          const _el$68 = libs.createElement("Panel", {
            "class": "KeyContainer"
          }, null);
          libs.insert(_el$68, libs.createComponent(libs.Show, {
            get when() {
              return replaceKey();
            },
            get children() {
              return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                get hotkey() {
                  return replaceKey();
                },
                filp: key == "MOUSE1"
              });
            }
          }));
          return _el$68;
        })();
      }
    }));
    libs.insert(_el$57, libs.createComponent(EOM_ToggleButton.EOM_ToggleButton, {
      id: "ShowTips",
      text: "#ControlGuide_DontShowAgain",
      get selected() {
        return Boolean(player_key_values()[show_control_guide_key]?.value ?? false);
      },
      onchange: (p, b) => {
        if (bRequesting()) return;
        SetRequesting(true);
        CallActionRequest("/v1/key/save", {
          type: "setting",
          key: show_control_guide_key,
          value: b ? "TRUE" : "FALSE"
        }, result => {
          SetRequesting(false);
        });
      }
    }), null);
    libs.insert(_el$65, libs.createComponent(libs.For, {
      get each() {
        return movekeys();
      },
      children: key => {
        return (() => {
          const _el$69 = libs.createElement("Panel", {
            "class": "KeyContainer"
          }, null);
          libs.insert(_el$69, libs.createComponent(libs.Show, {
            when: key,
            get children() {
              return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                hotkey: key
              });
            }
          }));
          return _el$69;
        })();
      }
    }));
    libs.effect(_$p => libs.setProp(_el$56, "class", libs.classNames({
      Hide: hide(),
      FoldUp: Boolean(player_key_values()[show_control_guide_key]?.value ?? false)
    }), _$p));
    return _el$56;
  })();
};
const InteractInfo = props => {
  const actionText = () => {
    if (props.interactInfo?.type === "ShopItem" && props.interactInfo.isUpgrade === true) {
      return GetLocalization("#Interact_ShopItemUpgrade", "#Interact_ShopItem");
    }
    const type = props.interactInfo?.type ?? "";
    const tooltip = props.interactInfo?.tooltip;
    return getInteractActionText(type, tooltip);
  };
  const secondaryActionText = () => {
    const type = props.interactInfo?.type ?? "";
    const tooltip = props.interactInfo?.secondaryTooltip;
    return getInteractActionText(type, tooltip);
  };
  const npcIconPath = libs.createMemo(() => {
    const icon = props.interactInfo?.icon;
    if (icon === undefined) return undefined;
    return getSrcPath("hud/hud_icon/h_room_" + icon + ".png");
  });
  const showSecondaryRow = () => props.interactInfo?.hasSecondaryAction === true && secondaryActionText() !== "";
  const secondaryProgress = () => props.interactInfo?.hasSecondaryAction === true && props.holdState?.active === 1 ? props.holdState.progress ?? 0 : 0;
  const showItemInfo = () => {
    const itemName = props.interactInfo?.itemName;
    return itemName !== undefined && itemName !== null && itemName !== "" && (props.interactInfo?.type === "ShopItem" || props.interactInfo?.type === "Chest");
  };
  const isShopItem = () => props.interactInfo?.type === "ShopItem";
  return (() => {
    const _el$70 = libs.createElement("Panel", {
        id: "InteractInfo"
      }, null),
      _el$75 = libs.createElement("Panel", {
        id: "InteractInfoContainer"
      }, _el$70);
    libs.insert(_el$70, libs.createComponent(libs.Show, {
      get when() {
        return npcIconPath() !== undefined;
      },
      get children() {
        const _el$71 = libs.createElement("Panel", {
            id: "NpcIcon"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "SelectParticle",
            particleName: "particles/generic_gameplay/rune/wishing_pool_exite.vpcf",
            cameraOrigin: "0 0 300",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$71);
          const _el$73 = libs.createElement("Image", {
            get src() {
              return npcIconPath();
            },
            scaling: "stretch-to-fit-preserve-aspect"
          }, _el$71),
          _el$74 = libs.createElement("DOTAParticleScenePanel", {
            opacity: "0.2",
            id: "SelectParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
            cameraOrigin: "0 0 45",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$71);
        libs.setProp(_el$74, "opacity", "0.2");
        libs.effect(_$p => libs.setProp(_el$73, "src", npcIconPath(), _$p));
        return _el$71;
      }
    }), _el$75);
    libs.insert(_el$75, libs.createComponent(libs.Show, {
      get when() {
        return showItemInfo();
      },
      get children() {
        return [libs.createElement("DOTAParticleScenePanel", {
          id: "InteractInfoBackgroundParticle",
          particleName: "particles/ui/game/ui_game_background_light_fx.vpcf",
          cameraOrigin: "0 0 200",
          fov: 40,
          lookAt: "0 0 0",
          hittest: false,
          squarePixels: true
        }, null), (() => {
          const _el$77 = libs.createElement("Panel", {
            id: "InteractInfoItemBox"
          }, null);
          libs.insert(_el$77, libs.createComponent(common_box.CommonBox, {
            get itemName() {
              return props.interactInfo?.itemName ?? "item_discount_card";
            },
            get rarity() {
              return props.interactInfo?.rarity;
            },
            get cost() {
              return isShopItem() ? props.interactInfo?.costInfo?.cost : undefined;
            },
            get entIndex() {
              return Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
            },
            get showCost() {
              return isShopItem();
            }
          }));
          return _el$77;
        })()];
      }
    }), null);
    libs.insert(_el$75, libs.createComponent(InteractInfoRow, {
      get hotkey() {
        return props.hotkey;
      },
      get actionText() {
        return actionText();
      },
      get costInfo() {
        return props.interactInfo?.costInfo;
      },
      get enoughResource() {
        return props.interactInfo?.enoughResource ?? true;
      },
      get isGamepad() {
        return props.isGamepad;
      }
    }), null);
    libs.insert(_el$75, libs.createComponent(libs.Show, {
      get when() {
        return showSecondaryRow();
      },
      get children() {
        return libs.createComponent(InteractInfoRow, {
          get hotkey() {
            return props.hotkey;
          },
          get actionText() {
            return secondaryActionText();
          },
          get costInfo() {
            return props.interactInfo?.secondaryCostInfo;
          },
          get enoughResource() {
            return props.interactInfo?.secondaryEnoughResource ?? true;
          },
          get progress() {
            return secondaryProgress();
          },
          longPress: true,
          get isGamepad() {
            return props.isGamepad;
          }
        });
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$70, "visible", props.interactInfo !== undefined, _$p));
    return _el$70;
  })();
};

const [itemTag, setItemTag] = libs.createSignal();
const LeftBar = () => {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "LeftBar",
        hittest: false
      }, null);
      libs.createElement("Image", {
        id: "Background",
        hittest: false
      }, _el$);
    libs.insert(_el$, libs.createComponent(ArtifactList, {}), null);
    libs.insert(_el$, libs.createComponent(UpgradeList, {}), null);
    return _el$;
  })();
};
const ArtifactList = () => {
  const heroSelection = solid_utils.createPlayerNetDataSignal("common", "hero_selection");
  const heroKey = libs.createMemo(() => {
    const hero = heroSelection();
    return `${hero?.heroIndex ?? -1}:${hero?.heroName ?? ""}`;
  });
  const [itemList, setItemList] = libs.createSignal([]);
  const itemsByEntity = new Map();
  const runtimeStates = new Map();
  const updateItem = item => {
    let entry = itemsByEntity.get(item.entIndex);
    if (!entry || entry.itemName !== item.itemName) {
      const [level, setLevel] = libs.createSignal(item.level);
      const [stackCount, setStackCount] = libs.createSignal(item.stackCount);
      entry = {
        entIndex: item.entIndex,
        itemName: item.itemName,
        level,
        setLevel,
        stackCount,
        setStackCount
      };
      itemsByEntity.set(item.entIndex, entry);
    } else {
      entry.setLevel(item.level);
      entry.setStackCount(item.stackCount);
    }
    return entry;
  };
  const applyAbilityState = state => {
    const unitIndex = heroSelection()?.heroIndex;
    if (!state || state.unitIndex !== unitIndex) return;
    runtimeStates.set(state.entIndex, state);
    const entry = itemsByEntity.get(state.entIndex);
    if (!entry || entry.itemName !== state.abilityName) return;
    libs.batch(() => {
      entry.setLevel(state.level);
      entry.setStackCount(state.stackCount);
    });
  };
  const updateItems = value => {
    const unitIndex = heroSelection()?.heroIndex;
    libs.batch(() => {
      const items = unitIndex === undefined ? [] : (value?.items ?? []).map(item => {
        const state = runtimeStates.get(item.entIndex);
        const data = state?.abilityName === item.itemName ? {
          ...item,
          level: state.level,
          stackCount: state.stackCount
        } : getUnitItemNetData(unitIndex, item);
        return updateItem(data);
      });
      const activeEntities = new Set(items.map(item => item.entIndex));
      for (const entIndex of itemsByEntity.keys()) {
        if (!activeEntities.has(entIndex)) itemsByEntity.delete(entIndex);
      }
      setItemList(items);
    });
  };
  const sectInfos = libs.createMemo(() => {
    const tags = {};
    itemList().map(item => {
      const access = KeyValues.npc_items_custom[item.itemName]?.Access;
      if (access == "Bless") {
        String(KeyValues.npc_items_custom[item.itemName]?.Suit ?? "").split("|").map(suit => {
          if (suit !== "") {
            tags[suit] ??= {
              level: 0,
              exp: 0,
              maxExp: SUIT_EXP[1],
              items: []
            };
            tags[suit].exp += item.level();
            tags[suit].items.push(item);
            if (tags[suit].exp >= tags[suit].maxExp) {
              tags[suit].level += 1;
              tags[suit].maxExp = SUIT_EXP[tags[suit].level + 1] ?? tags[suit].maxExp;
            }
          }
        });
      } else if (access == "Shop" || access == "Meepo") {
        tags["Shop"] ??= {
          level: 0,
          exp: 0,
          maxExp: SUIT_EXP[1],
          items: []
        };
        tags["Shop"].items.push(item);
        tags["Shop"].exp += 1;
      }
    });
    return tags;
  });
  let hadSectInfosData = false;
  libs.createEffect(() => {
    const keys = Object.keys(sectInfos());
    const hasData = keys.length > 0;
    const selectedTag = itemTag();
    if (hasData && (!hadSectInfosData && selectedTag === undefined || selectedTag !== undefined && !keys.includes(selectedTag))) {
      const firstTag = keys.sort((a, b) => {
        if (a === "Shop") {
          return 1;
        }
        if (b === "Shop") {
          return -1;
        }
        return sectInfos()[b].exp - sectInfos()[a].exp;
      })[0];
      if (firstTag !== undefined) {
        setItemTag(firstTag);
      }
    }
    hadSectInfosData = hasData;
  });
  libs.createEffect(libs.on(heroKey, currentHeroKey => {
    const heroIndex = heroSelection()?.heroIndex;
    setItemList([]);
    itemsByEntity.clear();
    runtimeStates.clear();
    hadSectInfosData = false;
    setItemTag(undefined);
    if (heroIndex == undefined || heroIndex <= 0) {
      return;
    }
    const stateID = ListenNetDataTable("ability_state", (key, state) => {
      if (heroKey() !== currentHeroKey) return;
      if (!state) {
        runtimeStates.delete(Number(key));
        return;
      }
      applyAbilityState(state);
    });
    const id = useNetDataKey("unit", heroIndex.toString(), value => {
      if (heroKey() !== currentHeroKey) return;
      updateItems(value);
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
      CustomNetTables.UnsubscribeNetTableListener(stateID);
    });
  }));
  return (() => {
    const _el$3 = libs.createElement("Panel", {
      id: "ArtifactList"
    }, null);
    libs.insert(_el$3, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(sectInfos()).sort((a, b) => {
          if (a === "Shop") {
            return 1;
          }
          if (b === "Shop") {
            return -1;
          }
          return sectInfos()[b].exp - sectInfos()[a].exp;
        });
      },
      children: tag => {
        const sectInfo = libs.createMemo(() => sectInfos()[tag] ?? {
          level: 0,
          exp: 0,
          maxExp: 1,
          items: []
        });
        const isExpanded = () => tag === "Shop" || tag === itemTag();
        return [libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "ArtifactTypeItem",
          onactivate: () => {
            if (tag !== "Shop") {
              setItemTag(tag != itemTag() ? tag : undefined);
            }
          },
          customTooltip: {
            name: "artifact_type_list",
            type: tag
          },
          get children() {
            return [(() => {
              const _el$4 = libs.createElement("Panel", {
                  "class": "ArtifactTypeIcon"
                }, null),
                _el$6 = libs.createElement("Label", {
                  "class": "ArtifactTypeLabel",
                  get text() {
                    return GetLocalization("#Bless_" + tag);
                  }
                }, _el$4);
              libs.insert(_el$4, libs.createComponent(libs.Switch, {
                get fallback() {
                  return libs.createComponent(common_box.SectIcon, {
                    sectName: tag,
                    large: true
                  });
                },
                get children() {
                  return libs.createComponent(libs.Match, {
                    when: tag == "Shop",
                    get children() {
                      return libs.createElement("Panel", {
                        "class": "ArtifactTypeShop"
                      }, null);
                    }
                  });
                }
              }), _el$6);
              libs.effect(_$p => libs.setProp(_el$6, "text", GetLocalization("#Bless_" + tag), _$p));
              return _el$4;
            })(), libs.createComponent(libs.Switch, {
              get fallback() {
                return (() => {
                  const _el$12 = libs.createElement("Panel", {
                      "class": "ArtifactCount"
                    }, null),
                    _el$13 = libs.createElement("Label", {
                      get text() {
                        return sectInfo().exp;
                      }
                    }, _el$12);
                  libs.setProp(_el$13, "className", "ArtifactCountLabel");
                  libs.effect(_$p => libs.setProp(_el$13, "text", sectInfo().exp, _$p));
                  return _el$12;
                })();
              },
              get children() {
                return libs.createComponent(libs.Match, {
                  when: tag != "Shop",
                  get children() {
                    const _el$7 = libs.createElement("Panel", {
                        "class": "ArtifactDesc"
                      }, null),
                      _el$8 = libs.createElement("Panel", {}, _el$7),
                      _el$9 = libs.createElement("Panel", {
                        get width() {
                          return sectInfo().level / 4 * 59 + "px";
                        }
                      }, _el$7),
                      _el$0 = libs.createElement("Image", {}, _el$7),
                      _el$1 = libs.createElement("Label", {
                        get text() {
                          return sectInfo().exp;
                        }
                      }, _el$7),
                      _el$10 = libs.createElement("Label", {
                        get text() {
                          return "/" + sectInfo().maxExp;
                        }
                      }, _el$7);
                    libs.setProp(_el$8, "className", "ExpProgressBG");
                    libs.setProp(_el$9, "className", "ExpProgress");
                    libs.setProp(_el$0, "className", "ExpShield");
                    libs.setProp(_el$1, "className", "ExpLabel");
                    libs.setProp(_el$10, "className", "ExpMaxLabel");
                    libs.effect(_p$ => {
                      const _v$ = sectInfo().level / 4 * 59 + "px",
                        _v$2 = sectInfo().exp,
                        _v$3 = "/" + sectInfo().maxExp;
                      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$9, "width", _v$, _p$._v$));
                      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$1, "text", _v$2, _p$._v$2));
                      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$10, "text", _v$3, _p$._v$3));
                      return _p$;
                    }, {
                      _v$: undefined,
                      _v$2: undefined,
                      _v$3: undefined
                    });
                    return _el$7;
                  }
                });
              }
            })];
          }
        }), (() => {
          const _el$11 = libs.createElement("Panel", {
            "class": "ArtifactItemList",
            get height() {
              return (isExpanded() ? 40 * Math.ceil(sectInfo().items.length / 5) : 0) + "px";
            }
          }, null);
          libs.insert(_el$11, libs.createComponent(libs.For, {
            get each() {
              return sectInfo().items;
            },
            children: item => {
              return libs.createComponent(common_item.CommonItem, {
                get itemName() {
                  return item.itemName;
                },
                get rarity() {
                  return item.level();
                },
                get stackCount() {
                  return item.stackCount();
                },
                showTips: true
              });
            }
          }));
          libs.effect(_p$ => {
            const _v$4 = {
                Show: isExpanded()
              },
              _v$5 = (isExpanded() ? 40 * Math.ceil(sectInfo().items.length / 5) : 0) + "px";
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$11, "classList", _v$4, _p$._v$4));
            _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "height", _v$5, _p$._v$5));
            return _p$;
          }, {
            _v$4: undefined,
            _v$5: undefined
          });
          return _el$11;
        })()];
      }
    }));
    return _el$3;
  })();
};
const UPGRADE_TAG_ORDER = [AbilityTag[AbilityTag.Attack], AbilityTag[AbilityTag.Skill], AbilityTag[AbilityTag.Dodge], AbilityTag[AbilityTag.Defense], AbilityTag[AbilityTag.Ultimate]];
const UpgradeList = () => {
  const upgradeList = solid_utils.createPlayerNetDataSignal("common", "upgrade_list", {
    upgrades: []
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const getAbilityTagByUpgradeID = upgradeID => {
    const abilityName = String(KeyValues.ability_upgrades?.[upgradeID]?.ability_name ?? "");
    if (abilityName === "") {
      return undefined;
    }
    const abilityTag = String(KeyValues.npc_abilities_custom?.[abilityName]?.AbilityTag ?? KeyValues.hero_abilities?.[abilityName]?.AbilityTag ?? "");
    for (let i = 0; i < UPGRADE_TAG_ORDER.length; i++) {
      if (UPGRADE_TAG_ORDER[i] === abilityTag) {
        return abilityTag;
      }
    }
    return undefined;
  };
  const tagActiveMap = libs.createMemo(() => {
    const result = {};
    const upgrades = upgradeList().upgrades;
    for (let i = 0; i < upgrades.length; i++) {
      const tag = getAbilityTagByUpgradeID(upgrades[i]);
      if (tag !== undefined) {
        result[tag] = true;
      }
    }
    return result;
  });
  const tagTextureMap = libs.createMemo(() => {
    const result = {};
    const upgrades = upgradeList().upgrades;
    for (let i = 0; i < upgrades.length; i++) {
      const upgradeID = upgrades[i];
      const tag = getAbilityTagByUpgradeID(upgradeID);
      if (tag === undefined || result[tag] !== undefined) {
        continue;
      }
      const abilityName = String(KeyValues.ability_upgrades?.[upgradeID]?.ability_name ?? "");
      if (abilityName === "") {
        continue;
      }
      const abilityTextureName = String(KeyValues.npc_abilities_custom?.[abilityName]?.AbilityTextureName ?? KeyValues.ability_upgrades?.[upgradeID]?.AbilityTextureName ?? "");
      if (abilityTextureName !== "") {
        result[tag] = GetTexturePath(abilityTextureName);
      }
    }
    return result;
  });
  const tagCountMap = libs.createMemo(() => {
    const result = {};
    const upgrades = upgradeList().upgrades;
    for (let i = 0; i < upgrades.length; i++) {
      const tag = getAbilityTagByUpgradeID(upgrades[i]);
      if (tag === undefined) {
        continue;
      }
      const current = result[tag] ?? 0;
      result[tag] = current + 1;
    }
    return result;
  });
  const displayList = () => {
    const upgrades = UPGRADE_TAG_ORDER;
    const hasSelection = multiChoiceState().skill_upgrade > 0;
    return hasSelection ? [...upgrades, "__UPGRADE_BUTTON__"] : upgrades;
  };
  return (() => {
    const _el$14 = libs.createElement("Panel", {
      id: "UpgradeList"
    }, null);
    libs.insert(_el$14, libs.createComponent(libs.For, {
      get each() {
        return displayList();
      },
      children: (item, index) => {
        if (item === "__UPGRADE_BUTTON__") {
          return libs.createComponent(EOM_Button.EOM_BaseButton, {
            id: "UpgradeBtn",
            get ["class"]() {
              return "Index" + index() % 2;
            },
            onactivate: () => {
              ClientSideEvent("key_pressed", {
                keyFunction: KeyFunction.Upgrade
              });
            },
            get children() {
              return [libs.createElement("Label", {
                id: "UpgradeBtnText",
                text: "#UpgradeText"
              }, null), (() => {
                const _el$16 = libs.createElement("Panel", {
                    id: "UpgradeIconMask"
                  }, null),
                  _el$17 = libs.createElement("Image", {
                    align: "center center",
                    width: "34px",
                    height: "34px",
                    src: "file://{images}/custom_game/conv/common/conv_add.png"
                  }, _el$16);
                libs.setProp(_el$17, "align", "center center");
                libs.setProp(_el$17, "width", "34px");
                libs.setProp(_el$17, "height", "34px");
                return _el$16;
              })()];
            }
          });
        }
        const tooltip = libs.createMemo(() => {
          const upgradeIDs = upgradeList().upgrades.filter(upgradeID => getAbilityTagByUpgradeID(upgradeID) === item);
          if (upgradeIDs.length > 0) {
            return {
              name: "ability_upgrade_list",
              upgradeIDs: upgradeIDs.join("|")
            };
          }
          return undefined;
        });
        const hasTooltip = libs.createMemo(() => tooltip() !== undefined);
        return libs.createComponent(solid_utils.DynamicKey, {
          key: hasTooltip,
          children: _ => (() => {
            const _el$18 = libs.createElement("Panel", {
                get ["class"]() {
                  return "UpgradeListItem UpgradeSlot Index" + index() % 2;
                }
              }, null);
              libs.createElement("Image", {
                "class": "UpgradeSlotImage"
              }, _el$18);
              const _el$20 = libs.createElement("Image", {
                "class": "UpgradeSlotTag " + item,
                get src() {
                  return tagTextureMap()[item];
                }
              }, _el$18),
              _el$21 = libs.createElement("Label", {
                "class": "UpgradeCount",
                get text() {
                  return String(tagCountMap()[item] ?? 0);
                }
              }, _el$18);
            libs.setProp(_el$20, "class", "UpgradeSlotTag " + item);
            libs.effect(_p$ => {
              const _v$6 = "UpgradeListItem UpgradeSlot Index" + index() % 2,
                _v$7 = {
                  Active: tagActiveMap()[item] == true
                },
                _v$8 = tooltip(),
                _v$9 = tagTextureMap()[item],
                _v$0 = (tagCountMap()[item] ?? 0) > 1,
                _v$1 = String(tagCountMap()[item] ?? 0);
              _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$18, "class", _v$6, _p$._v$6));
              _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$18, "classList", _v$7, _p$._v$7));
              _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$18, "customTooltip", _v$8, _p$._v$8));
              _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$20, "src", _v$9, _p$._v$9));
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$21, "visible", _v$0, _p$._v$0));
              _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$21, "text", _v$1, _p$._v$1));
              return _p$;
            }, {
              _v$6: undefined,
              _v$7: undefined,
              _v$8: undefined,
              _v$9: undefined,
              _v$0: undefined,
              _v$1: undefined
            });
            return _el$18;
          })()
        });
      }
    }));
    return _el$14;
  })();
};

const PrivilegeRewardSelection = () => {
  const selection = solid_utils.createPlayerNetDataSignal("common", "privilege_reward_selection", {
    options: [],
    title: "",
    remaining_count: 0
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    active_type: undefined,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  libs.createEffect(libs.on(() => selection().options.map(option => option.name).join("|"), () => {
    setSelectedIndex(0);
  }));
  const handleSelect = itemName => {
    GameEvents.SendCustomGameEventToServer("select_privilege_reward", {
      itemName
    });
  };
  const moveSelection = delta => {
    const count = selection().options.length;
    if (count <= 0) {
      return;
    }
    setSelectedIndex((selectedIndex() + delta + count) % count);
  };
  useClientSideEvent("key_pressed", data => {
    if (multiChoiceState().active_type !== "PrivilegeReward" || selection().options.length <= 0) {
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm && isGamepad()) {
      const option = selection().options[selectedIndex()];
      if (option !== undefined) {
        handleSelect(option.name);
      }
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "PrivilegeRewardSelection",
        hittest: true
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "PrivilegeRewardSelectionContent"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "PrivilegeRewardSelectionTitle"
      }, _el$2);
      libs.createElement("Image", {
        "class": "PrivilegeRewardSelectionLeftIcon"
      }, _el$3);
      const _el$5 = libs.createElement("Panel", {
        "class": "PrivilegeRewardSelectionTitleCenter"
      }, _el$3),
      _el$6 = libs.createElement("Label", {
        id: "PrivilegeRewardSelectionTitleLabel",
        get text() {
          return GetLocalization(selection().title);
        }
      }, _el$5);
      libs.createElement("Image", {
        "class": "PrivilegeRewardSelectionRightIcon"
      }, _el$3);
      const _el$8 = libs.createElement("Panel", {
        id: "PrivilegeRewardSelectionOptions",
        "class": "VerticalScrollStyle",
        flowChildren: "right-wrap",
        scroll: "y"
      }, _el$2);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "PrivilegeRewardSelectionParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_lan.vpcf",
        cameraOrigin: "0 0 600",
        fov: 100,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
    libs.setProp(_el$8, "flowChildren", "right-wrap");
    libs.setProp(_el$8, "scroll", "y");
    libs.insert(_el$8, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, index) => libs.createComponent(common_item.CommonItem, {
        "class": "PrivilegeRewardSelectionOption",
        get classList() {
          return {
            Selected: selectedIndex() == index() && isGamepad()
          };
        },
        get itemName() {
          return option.name;
        },
        get rarity() {
          return option.rarity;
        },
        onactivate: () => handleSelect(option.name),
        get animationDelay() {
          return `${Math.min(index() * 0.03, 0.36)}s`;
        },
        showTips: true
      })
    }));
    libs.effect(_p$ => {
      const _v$ = {
          Show: multiChoiceState().active_type === "PrivilegeReward"
        },
        _v$2 = GetLocalization(selection().title);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
const ABILITY_TAG_INDEX = {
  [AbilityTag.Attack]: 3,
  [AbilityTag.Skill]: 0,
  [AbilityTag.Dodge]: 1,
  [AbilityTag.Defense]: 2,
  [AbilityTag.Ultimate]: 5
};
const ABILITY_TAG_KEY_FUNCTION = {
  [AbilityTag.Attack]: KeyFunction.Attack,
  [AbilityTag.Skill]: KeyFunction.Skill,
  [AbilityTag.Dodge]: KeyFunction.Dodge,
  [AbilityTag.Defense]: KeyFunction.Defense,
  [AbilityTag.Ultimate]: KeyFunction.Ultimate
};
function getTutorialAbilityName(abilityTag) {
  if (abilityTag === undefined) {
    return undefined;
  }
  const hero = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
  const abilityIndex = ABILITY_TAG_INDEX[abilityTag];
  if (abilityIndex === undefined) {
    return undefined;
  }
  const ability = Entities.GetAbility(hero, abilityIndex);
  const abilityName = Abilities.GetAbilityName(ability);
  return abilityName !== "" ? abilityName : undefined;
}
function getTutorialAbilityHotkey(abilityTag) {
  const keyFunction = abilityTag === undefined ? undefined : ABILITY_TAG_KEY_FUNCTION[abilityTag];
  if (keyFunction === undefined) {
    return "";
  }
  const data = playerKeyValues();
  const moveMode = data?.move_mode?.value ?? MOVE_MODE_KEYBOARD;
  const modePrefix = moveMode === MOVE_MODE_KEYBOARD ? "" : `_m${moveMode}`;
  const customKey = data?.[`keybind_keyboard${modePrefix}_${keyFunction}`]?.value;
  const defaultBindings = MOVE_MODE_DEFAULTS[moveMode] ?? DEFAULT_KEYBOARD_BINDINGS;
  return customKey ?? defaultBindings[keyFunction] ?? DEFAULT_KEYBOARD_BINDINGS[keyFunction] ?? "";
}
function getPrepareStatus(request, playerID) {
  if (request === undefined || request.state === "None") {
    return undefined;
  }
  const response = request.playerResponses?.[playerID];
  if (response === "Ready") {
    return "accepted";
  }
  if (response === "Rejected") {
    return "rejected";
  }
  return "pending";
}
const RightBar = () => {
  const [request, setRequest] = libs.createSignal(getNetDataKey("common", "game_mode_prepare_request"));
  libs.onMount(() => {
    const listener = useNetDataKey("common", "game_mode_prepare_request", value => {
      setRequest(value);
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(listener);
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "RightBar",
        hittest: false
      }, null);
      libs.createElement("Panel", {
        id: "RightBlack",
        hittest: false
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "PlayerList"
      }, _el$);
    libs.insert(_el$3, () => libs.createComponent(libs.For, {
      get each() {
        return Game.GetAllPlayerIDs();
      },
      children: playerID => libs.createComponent(PlayerBar, {
        playerID: playerID,
        get status() {
          return getPrepareStatus(request(), playerID);
        }
      })
    }));
    libs.insert(_el$, libs.createComponent(TutorialTask, {}), null);
    return _el$;
  })();
};
const PlayerBar = props => {
  const [heroEntityIndex, setHeroEntityIndex] = libs.createSignal(-1);
  const [healthPercent, setHealthPercent] = libs.createSignal(0);
  const [disconnect, setDisconnect] = libs.createSignal(Game.GetPlayerInfo(props.playerID)?.player_connection_state != DOTAConnectionState_t.DOTA_CONNECTION_STATE_CONNECTED);
  const playerInfo = service_netdata_helper.GetPlayerInfo({
    playerID: props.playerID
  });
  const playerInfoData = libs.createMemo(() => playerInfo.data() ?? {});
  const medalCosmeticID = libs.createMemo(() => {
    const cosmeticID = playerInfoData().player_cosmetic_equips?.[COSMETIC_SLOT.MEDAL]?.cosmetic_id;
    return cosmeticID != undefined && cosmeticID > 0 ? String(cosmeticID) : undefined;
  });
  const heroID = libs.createMemo(() => {
    if (heroEntityIndex() < 0) return undefined;
    return GetHeroIDByHeroName(Entities.GetUnitName(heroEntityIndex()));
  });
  libs.onMount(() => {
    const timer = setInterval(() => {
      const heroIndex = Players.GetPlayerHeroEntityIndex(props.playerID);
      if (heroIndex == -1) {
        return;
      }
      const currentHealth = Entities.GetHealth(heroIndex);
      const currentMaxHealth = Entities.GetMaxHealth(heroIndex);
      setHealthPercent(currentMaxHealth > 0 ? currentHealth / currentMaxHealth * 100 : 0);
      setHeroEntityIndex(heroIndex);
    }, 100);
    libs.createEffect(() => {
      const id = GameEvents.Subscribe("player_disconnect", event => {
        if (event.PlayerID == props.playerID) {
          setDisconnect(true);
        }
      });
      libs.onCleanup(() => {
        GameEvents.Unsubscribe(id);
      });
    });
    libs.createEffect(() => {
      const id = GameEvents.Subscribe("player_connect_full", event => {
        if (event.PlayerID == props.playerID) {
          setDisconnect(false);
        }
      });
      libs.onCleanup(() => {
        GameEvents.Unsubscribe(id);
      });
    });
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  return (() => {
    const _el$4 = libs.createElement("Panel", {
        id: "PlayerBar"
      }, null),
      _el$5 = libs.createElement("Panel", {
        "class": "MedalList"
      }, _el$4);
    libs.insert(_el$4, libs.createComponent(PlayerState, {
      get status() {
        return props.status;
      }
    }), _el$5);
    libs.insert(_el$5, libs.createComponent(libs.Show, {
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
    libs.insert(_el$5, libs.createComponent(RankBadgeBanner.PlayerHeroRankBadge, {
      data: playerInfoData,
      heroID: heroID
    }), null);
    libs.insert(_el$4, libs.createComponent(PlayerItem, {
      get playerID() {
        return props.playerID;
      },
      get heroEntityIndex() {
        return heroEntityIndex();
      },
      get healthPercent() {
        return healthPercent();
      },
      get disconnect() {
        return disconnect();
      }
    }), null);
    return _el$4;
  })();
};
const PlayerItem = props => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state", {
    state: "GameState_Prepare",
    start_time: -1,
    end_time: -1
  });
  const playerName = libs.createMemo(() => Players.GetPlayerName(props.playerID));
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        get id() {
          return "Player" + props.playerID;
        },
        "class": "PlayerItem",
        hittest: true
      }, null),
      _el$7 = libs.createElement("Panel", {
        "class": "PlayerHealthBarContainer"
      }, _el$6),
      _el$8 = libs.createElement("Image", {
        "class": "HealthBar",
        get style() {
          return {
            clip: `rect( 0%, ${props.healthPercent}%, 100%, 0% )`
          };
        }
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        id: "PlayerName",
        get text() {
          return playerName();
        }
      }, _el$6);
    libs.insert(_el$6, libs.createComponent(PlayerAvatar, {
      get heroEntityIndex() {
        return props.heroEntityIndex;
      },
      get disconnect() {
        return props.disconnect;
      },
      hittest: true,
      onactivate: () => {
        if (gameState().state === "GameState_Dungeon") return;
        JumpToMenu({
          window_name: "book",
          menu: "PlayerInfo_Menu",
          force: true,
          data: {
            playerID: props.playerID
          }
        });
      }
    }), _el$7);
    libs.effect(_p$ => {
      const _v$ = "Player" + props.playerID,
        _v$2 = {
          clip: `rect( 0%, ${props.healthPercent}%, 100%, 0% )`
        },
        _v$3 = playerName();
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "id", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "style", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$9, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$6;
  })();
};
const PlayerAvatar = props => {
  const merged = libs.mergeProps(props, {
    class: "PlayerAvatar"
  });
  const [local, other] = libs.splitProps(merged, ["heroEntityIndex", "disconnect", "class"]);
  const heroName = libs.createMemo(() => {
    return Entities.GetUnitName(local.heroEntityIndex);
  });
  return (() => {
    const _el$0 = libs.createElement("Panel", libs.mergeProps$1(other, {
        get ["class"]() {
          return libs.classNames("PlayerAvatar", local.class);
        }
      }), null),
      _el$1 = libs.createElement("Panel", {
        id: "AvatarMask"
      }, _el$0),
      _el$10 = libs.createElement("Image", {
        id: "DisconnectIcon"
      }, _el$1);
    libs.spread(_el$0, libs.mergeProps$1(other, {
      get ["class"]() {
        return libs.classNames("PlayerAvatar", local.class);
      },
      get classList() {
        return {
          Disconnect: local.disconnect
        };
      }
    }), true);
    libs.insert(_el$1, libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
      id: "HeroIcon",
      heroimagestyle: "icon",
      get heroname() {
        return heroName();
      }
    }), _el$10);
    libs.insert(_el$0, libs.createComponent(PlayerBorder, {}), null);
    return _el$0;
  })();
};
const PlayerBorder = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("PlayerBorder", props.class, {
      defaultBorder: props.borderID == undefined
    })
  });
  const [local, other] = libs.splitProps(merged, ["borderID"]);
  return (() => {
    const _el$11 = libs.createElement("Panel", other, null);
    libs.spread(_el$11, other, false);
    return _el$11;
  })();
};
const PlayerState = props => {
  return (() => {
    const _el$12 = libs.createElement("Panel", {
      "class": "PlayerState"
    }, null);
    libs.insert(_el$12, libs.createComponent(libs.Switch, {
      get children() {
        return [libs.createComponent(libs.Match, {
          get when() {
            return props.status === "accepted";
          },
          get children() {
            return [libs.createElement("Image", {
              id: "Check"
            }, null), libs.createElement("Label", {
              text: "#PlayerReady"
            }, null)];
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return props.status === "rejected";
          },
          get children() {
            return [libs.createElement("Image", {
              id: "Close"
            }, null), libs.createElement("Label", {
              text: "#PlayerNotReady"
            }, null)];
          }
        }), libs.createComponent(libs.Match, {
          get when() {
            return props.status === "pending";
          },
          get children() {
            return libs.createComponent(EOM_Loading.EOM_Loading, {
              type: "PointQueue"
            });
          }
        })];
      }
    }));
    return _el$12;
  })();
};
const TutorialTask = () => {
  const tutorialTaskData = solid_utils.createNetDataSignal("common", "tutorial_task");
  const allSuccess = libs.createMemo(() => {
    return tutorialTaskData()?.task_data?.every(v => v.success) ?? false;
  });
  const show = libs.createMemo(() => {
    let _show = false;
    if (tutorialTaskData()) {
      _show = !allSuccess();
    }
    return _show;
  });
  const taskTitle = () => "#" + tutorialTaskData()?.tutorial_key;
  const taskList = libs.createMemo(() => {
    return tutorialTaskData()?.task_data ?? [];
  });
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const isGamepad = () => inputMode().isGamepad === 1;
  return (() => {
    const _el$17 = libs.createElement("Panel", {
        id: "TutorialTask",
        hittest: false
      }, null),
      _el$18 = libs.createElement("Label", {
        id: "TaskTitle",
        get text() {
          return taskTitle();
        }
      }, _el$17);
    libs.insert(_el$17, libs.createComponent(libs.Index, {
      get each() {
        return taskList();
      },
      children: (single, i) => {
        const abilityName = () => getTutorialAbilityName(single().ability);
        const hotkey = () => getTutorialAbilityHotkey(single().ability);
        return (() => {
          const _el$19 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("SingleTaskRow", libs.classNames({
                  Success: single().success
                }));
              }
            }, null);
            libs.createElement("Image", {
              "class": "SingleTaskBox"
            }, _el$19);
            const _el$24 = libs.createElement("Label", {
              "class": "TaskText",
              get text() {
                return "#" + single().text;
              }
            }, _el$19);
            libs.createElement("Panel", {
              "class": "finishLine",
              hittest: false
            }, _el$19);
          libs.insert(_el$19, libs.createComponent(libs.Show, {
            get when() {
              return abilityName() !== undefined;
            },
            get children() {
              return [(() => {
                const _el$21 = libs.createElement("Panel", {
                    "class": "TaskAbility"
                  }, null),
                  _el$22 = libs.createElement("DOTAAbilityImage", {
                    "class": "TaskAbilityIcon",
                    get abilityname() {
                      return abilityName();
                    },
                    showtooltip: false
                  }, _el$21);
                libs.effect(_p$ => {
                  const _v$6 = abilityName(),
                    _v$7 = {
                      name: "hero_ability",
                      abilityName: abilityName()
                    };
                  _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$22, "abilityname", _v$6, _p$._v$6));
                  _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$22, "customTooltip", _v$7, _p$._v$7));
                  return _p$;
                }, {
                  _v$6: undefined,
                  _v$7: undefined
                });
                return _el$21;
              })(), (() => {
                const _el$23 = libs.createElement("Panel", {
                  width: "40px",
                  margin: "0 10px",
                  verticalAlign: "center"
                }, null);
                libs.setProp(_el$23, "width", "40px");
                libs.setProp(_el$23, "margin", "0 10px");
                libs.setProp(_el$23, "verticalAlign", "center");
                libs.insert(_el$23, libs.createComponent(libs.Show, {
                  get when() {
                    return isGamepad();
                  },
                  get fallback() {
                    return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
                      horizontalAlign: "center",
                      get hotkey() {
                        return hotkey();
                      }
                    });
                  },
                  get children() {
                    return libs.createComponent(EOM_GamePad.EOM_GamePad, {
                      horizontalAlign: "center",
                      get keyName() {
                        return hotkey();
                      }
                    });
                  }
                }));
                return _el$23;
              })()];
            }
          }), _el$24);
          libs.effect(_p$ => {
            const _v$8 = libs.classNames("SingleTaskRow", libs.classNames({
                Success: single().success
              })),
              _v$9 = "#" + single().text;
            _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$19, "class", _v$8, _p$._v$8));
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$24, "text", _v$9, _p$._v$9));
            return _p$;
          }, {
            _v$8: undefined,
            _v$9: undefined
          });
          return _el$19;
        })();
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = {
          Show: show(),
          AllSuccess: allSuccess()
        },
        _v$5 = taskTitle();
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$17, "classList", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$18, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$17;
  })();
};

const TopBar = () => {
  const gameState = solid_utils.createNetDataSignal("common", "game_state");
  const difficultySelection = solid_utils.createNetDataSignal("common", "game_mode_difficulty_selection");
  const difficultyKey = solid_utils.createNetDataSignal("common", "difficulty_key");
  const heroSelection = libs.createMemo(() => {
    return difficultySelection()?.resolvedDifficulty ?? 1;
  });
  const boss_round = solid_utils.createNetDataSignal("common", "values");
  const battleGemState = solid_utils.createNetDataSignal("common", "battle_gem_state");
  const labelText = libs.createMemo(() => {
    if (gameState()?.state === "GameState_Dungeon") {
      const zoneIndex = toFiniteNumber(boss_round()?.zone_index, 0);
      const roomIndex = toFiniteNumber(boss_round()?.room_index, 0);
      const keyIntensity = difficultyKey()?.key_data.intensity;
      const keyIntensityText = keyIntensity == undefined ? "" : `-${keyIntensity}`;
      return GetLocalization("DiffSelection_DiffName" + (heroSelection() ?? 1)) + keyIntensityText + ` [${zoneIndex} - ${roomIndex + 1}]`;
    }
    return "#" + gameState()?.state;
  });
  const state = libs.createMemo(() => {
    return gameState()?.state ?? "None";
  });
  const [dungeonBossEntIdx, setDungeonBossEntIdx] = libs.createSignal(-1);
  const [bossHealth, setBossHealth] = libs.createSignal(0);
  const [bossMaxHealth, setBossMaxHealth] = libs.createSignal(1);
  const [bossShrinkTimer, setBossShrinkTimer] = libs.createSignal(0);
  let bossShrinkTimerID;
  const battleGemBossEntIdx = () => toFiniteNumber(battleGemState()?.bossEntIndex, -1);
  const isDungeonBossRound = () => Entities.IsValidEntity(dungeonBossEntIdx()) && toFiniteNumber(boss_round()?.boss_round, -1) == 1;
  const isBattleGemBossRound = () => battleGemState()?.isRunning === true && Entities.IsValidEntity(battleGemBossEntIdx());
  const isBossRound = () => isDungeonBossRound() || isBattleGemBossRound();
  const activeBossEntIdx = () => isBattleGemBossRound() ? battleGemBossEntIdx() : dungeonBossEntIdx();
  const getBossDisplayedHealth = entIndex => {
    const logicalHealth = CustomNetTables.GetTableValue("large_number_health", String(entIndex));
    if (logicalHealth != undefined) {
      const current = toFiniteNumber(logicalHealth.current, -1);
      const maximum = toFiniteNumber(logicalHealth.maximum, -1);
      if (current >= 0 && maximum > 0) {
        return {
          current,
          maximum
        };
      }
    }
    return {
      current: Entities.GetHealth(entIndex),
      maximum: Math.max(1, Entities.GetMaxHealth(entIndex))
    };
  };
  const showDungeonKeyDock = libs.createMemo(() => gameState()?.state === "GameState_Dungeon" && difficultyKey() != undefined);
  libs.createEffect(libs.on(showDungeonKeyDock, visible => {
    if (visible) {
      $.Schedule(6.55, () => {
        Game.EmitSound("ui.inv_pickup_key");
      });
    }
  }));
  const bossShrinkTime = libs.createMemo(() => toFiniteNumber(boss_round()?.boss_shrink_time, 0));
  const bossShrinkState = libs.createMemo(() => {
    const shrinkTime = bossShrinkTime();
    const visible = isDungeonBossRound() && shrinkTime > 0;
    const active = visible && Game.GetGameTime() >= shrinkTime;
    const displaySeconds = visible ? Math.max(0, bossShrinkTimer()) : 0;
    const timer = displaySeconds;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const timeText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return {
      shrinkTime,
      visible,
      active,
      displaySeconds,
      timeText,
      label: `${timeText}`
    };
  });
  libs.onMount(() => {
    const interval = setInterval(() => {
      if (boss_round()?.boss_round == 1) {
        for (const ent of Entities.GetAllEntitiesByClassname("npc_dota_creature")) {
          if (Entities.GetUnitLabel(ent).startsWith("boss")) {
            setDungeonBossEntIdx(ent);
            break;
          }
        }
      }
      libs.batch(() => {
        const bossEntIdx = activeBossEntIdx();
        const health = Entities.IsValidEntity(bossEntIdx) ? getBossDisplayedHealth(bossEntIdx) : {
          current: 0,
          maximum: 1
        };
        setBossHealth(health.current);
        setBossMaxHealth(health.maximum);
      });
    }, 0);
    libs.onCleanup(() => {
      clearInterval(interval);
    });
  });
  libs.createEffect(libs.on(() => toFiniteNumber(boss_round()?.boss_round, 0), bossRound => {
    if (bossRound !== 1) {
      setDungeonBossEntIdx(-1);
      setBossShrinkTimer(0);
      setBossHealth(0);
      setBossMaxHealth(1);
    }
  }));
  libs.createEffect(libs.on(() => `${bossShrinkTime()}_${isBossRound() ? 1 : 0}`, () => {
    if (bossShrinkTimerID != undefined) {
      clearInterval(bossShrinkTimerID);
      bossShrinkTimerID = undefined;
    }
    const shrinkTime = bossShrinkTime();
    if (shrinkTime <= 0 || isBossRound() == false) {
      setBossShrinkTimer(0);
      return;
    }
    const updateBossShrinkTimer = () => {
      if (isBossRound() == false) {
        setBossShrinkTimer(0);
        if (bossShrinkTimerID != undefined) {
          clearInterval(bossShrinkTimerID);
          bossShrinkTimerID = undefined;
        }
        return;
      }
      const current = Game.GetGameTime();
      const remaining = Math.ceil(shrinkTime - current);
      if (remaining > 0) {
        setBossShrinkTimer(remaining);
      } else {
        setBossShrinkTimer(Math.floor(current - shrinkTime));
      }
    };
    updateBossShrinkTimer();
    bossShrinkTimerID = setInterval(updateBossShrinkTimer, 200);
  }));
  libs.onCleanup(() => {
    if (bossShrinkTimerID != undefined) {
      clearInterval(bossShrinkTimerID);
      bossShrinkTimerID = undefined;
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "TopBar",
        get ["class"]() {
          return libs.classNames({
            BossRound: isBossRound(),
            BattleGemBoss: isBattleGemBossRound()
          }, state());
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "GameStateInfo"
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "TopBar_Label",
        get text() {
          return labelText();
        }
      }, _el$2),
      _el$6 = libs.createElement("Panel", {
        id: "BossHealthContainer"
      }, _el$);
      libs.createElement("Panel", {
        id: "BarBG"
      }, _el$6);
      const _el$8 = libs.createElement("Panel", {
        id: "Bar",
        get width() {
          return bossHealth() / bossMaxHealth() * 100 + "%";
        }
      }, _el$6),
      _el$9 = libs.createElement("Label", {
        get text() {
          return `${FormatNumber(bossHealth())}/${FormatNumber(bossMaxHealth())}`;
        }
      }, _el$6),
      _el$0 = libs.createElement("Panel", {
        id: "BossInfo"
      }, _el$),
      _el$1 = libs.createElement("Panel", {
        id: "BossShrinkTimer"
      }, _el$0),
      _el$10 = libs.createElement("Label", {
        get text() {
          return bossShrinkState().label;
        }
      }, _el$1);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return showDungeonKeyDock();
      },
      get children() {
        const _el$4 = libs.createElement("Panel", {
            id: "DungeonKeyDock"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "DungeonKeyDockParticle",
            particleName: "particles/generic_gameplay/rune/wishing_pool_exite.vpcf",
            cameraOrigin: "0 0 300",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$4);
        libs.insert(_el$4, libs.createComponent(server_dungeon_key.DungeonKey, {
          get data() {
            return difficultyKey().key_data;
          }
        }), null);
        return _el$4;
      }
    }), _el$6);
    libs.effect(_p$ => {
      const _v$ = libs.classNames({
          BossRound: isBossRound(),
          BattleGemBoss: isBattleGemBossRound()
        }, state()),
        _v$2 = labelText(),
        _v$3 = bossHealth() / bossMaxHealth() * 100 + "%",
        _v$4 = `${FormatNumber(bossHealth())}/${FormatNumber(bossMaxHealth())}`,
        _v$5 = {
          ShrinkActive: bossShrinkState().active
        },
        _v$6 = bossShrinkState().visible,
        _v$7 = bossShrinkState().label;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$8, "width", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$9, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$1, "classList", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$1, "visible", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$10, "text", _v$7, _p$._v$7));
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
  })();
};

const UpgradeArtifactSelection = () => {
  const selection = solid_utils.createPlayerNetDataSignal("common", "artifact_upgrade_selection", {
    options: []
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    active_type: undefined,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  const optionPanels = [];
  let currentTooltipPanel;
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const optionHotkeys = libs.createMemo(() => SELECTION_KEY_FUNCTIONS.map(func => GetKeyBind(func, playerKeyValues())));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  libs.createEffect(libs.on(() => selection().options.map(option => option.name).join("|"), optionsKey => {
    if (optionsKey != "") {
      setSelectedIndex(0);
    }
  }));
  libs.createEffect(libs.on(() => selection().options.length, length => {
    if (length <= 0) {
      setSelectedIndex(0);
      return;
    }
    if (selectedIndex() >= length) {
      setSelectedIndex(length - 1);
    }
  }));
  const handleSelectUpgrade = (artifactName, rarity) => {
    GameEvents.SendCustomGameEventToServer("select_artifact_upgrade", {
      artifactName: artifactName,
      artifactLevel: rarity
    });
  };
  const moveSelection = delta => {
    const options = selection().options;
    if (options.length <= 0) return;
    setSelectedIndex((selectedIndex() + delta + options.length) % options.length);
  };
  const confirmSelection = () => {
    const option = selection().options[selectedIndex()];
    if (option !== undefined) {
      handleSelectUpgrade(option.name, option.rarity);
    }
  };
  libs.createEffect(() => {
    const gamepad = isGamepad();
    const currentIndex = selectedIndex();
    const options = selection().options;
    const currentOption = options[currentIndex];
    const currentPanel = currentOption !== undefined ? optionPanels[currentIndex] : undefined;
    if (currentTooltipPanel !== undefined && (currentTooltipPanel !== currentPanel || !gamepad)) {
      HideCustomTooltip(currentTooltipPanel, "feature_tags");
      currentTooltipPanel = undefined;
    }
    if (gamepad && currentOption !== undefined && currentPanel !== undefined && currentTooltipPanel !== currentPanel) {
      ShowCustomTooltip(currentPanel, "feature_tags", {
        tags: GetArtifactTags(currentOption.name).join("|")
      });
      currentTooltipPanel = currentPanel;
    }
  });
  useClientSideEvent("key_pressed", data => {
    if (multiChoiceState().active_type !== "ArtifactUpgrade" || selection().options.length <= 0) {
      return;
    }
    const optionIndex = SELECTION_KEY_FUNCTIONS.indexOf(data.keyFunction);
    if (optionIndex >= 0) {
      const option = selection().options[optionIndex];
      if (option !== undefined) handleSelectUpgrade(option.name, option.rarity);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm && isGamepad()) {
      confirmSelection();
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "UpgradeArtifactSelection",
        hittest: true
      }, null);
      libs.createElement("Panel", {
        id: "BG"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "SelectionConent"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "Title"
      }, _el$3);
      libs.createElement("Image", {
        "class": "LeftIcon"
      }, _el$4);
      const _el$6 = libs.createElement("Panel", {
        "class": "TitleCenter"
      }, _el$4),
      _el$7 = libs.createElement("Panel", {
        "class": "TitleTextRow"
      }, _el$6);
      libs.createElement("Label", {
        id: "UpgradeTitle",
        text: "#UpgradeArtifactSelectionTitle"
      }, _el$7);
      libs.createElement("Image", {
        "class": "RightIcon"
      }, _el$4);
      const _el$1 = libs.createElement("Panel", {
        id: "Options"
      }, _el$3);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "ParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_huang_01.vpcf",
        cameraOrigin: "0 0 700",
        fov: 80,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return multiChoiceState().artifact_upgrade > 1;
      },
      get children() {
        const _el$9 = libs.createElement("Label", {
          id: "UpgradeCount",
          get text() {
            return `(${multiChoiceState().artifact_upgrade})`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$9, "text", `(${multiChoiceState().artifact_upgrade})`, _$p));
        return _el$9;
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, i) => {
        const total = selection().options.length;
        const delay = (total - 1 - i()) * 0.08;
        return (() => {
          const _el$11 = libs.createElement("Panel", {
            "class": "SelectionOption",
            animationDelay: `${delay}s`
          }, null);
          libs.use(panel => optionPanels[i()] = panel, _el$11);
          libs.setProp(_el$11, "onactivate", () => handleSelectUpgrade(option.name, option.rarity));
          libs.setProp(_el$11, "onmouseover", () => setSelectedIndex(i()));
          libs.setProp(_el$11, "animationDelay", `${delay}s`);
          libs.insert(_el$11, libs.createComponent(common_box.CommonBox, {
            get itemName() {
              return option.name;
            },
            get rarity() {
              return option.rarity;
            },
            upgradeLevel: 1,
            get hotkey() {
              return libs.memo(() => !!!isGamepad())() ? optionHotkeys()[i()] : undefined;
            }
          }));
          libs.effect(_p$ => {
            const _v$ = {
                Selected: selectedIndex() == i() && isGamepad()
              },
              _v$2 = {
                name: "feature_tags",
                tags: GetArtifactTags(option.name).join("|")
              };
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$11, "classList", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$11, "customTooltip", _v$2, _p$._v$2));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined
          });
          return _el$11;
        })();
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "classList", {
      Show: multiChoiceState().active_type === "ArtifactUpgrade"
    }, _$p));
    return _el$;
  })();
};

const UpgradeBlessSelection = () => {
  const selection = solid_utils.createPlayerNetDataSignal("common", "bless_upgrade_selection", {
    options: [],
    allin_count: 0
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    active_type: undefined,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  const optionPanels = [];
  let currentTooltipPanel;
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const optionHotkeys = libs.createMemo(() => SELECTION_KEY_FUNCTIONS.map(func => GetKeyBind(func, playerKeyValues())));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  libs.createEffect(libs.on(() => selection().options.map(option => option.name).join("|"), optionsKey => {
    if (optionsKey != "") {
      setSelectedIndex(0);
    }
  }));
  const selectableCount = libs.createMemo(() => selection().options.length + (selection().allin_count > 0 ? 1 : 0));
  libs.createEffect(libs.on(selectableCount, count => {
    if (count <= 0) {
      setSelectedIndex(0);
      return;
    }
    if (selectedIndex() >= count) {
      setSelectedIndex(count - 1);
    }
  }));
  const handleSelectUpgrade = blessName => {
    GameEvents.SendCustomGameEventToServer("select_bless_upgrade", {
      blessName: blessName
    });
  };
  const moveSelection = delta => {
    const count = selectableCount();
    if (count <= 0) return;
    setSelectedIndex((selectedIndex() + delta + count) % count);
  };
  const confirmSelection = () => {
    const option = selection().options[selectedIndex()];
    if (option !== undefined) {
      handleSelectUpgrade(option.name);
      return;
    }
    if (selection().allin_count > 0 && selectedIndex() == selection().options.length) {
      GameEvents.SendCustomGameEventToServer("select_bless_upgrade_allin", {});
    }
  };
  libs.createEffect(() => {
    const gamepad = isGamepad();
    const currentIndex = selectedIndex();
    const options = selection().options;
    const currentOption = options[currentIndex];
    const currentPanel = currentOption !== undefined ? optionPanels[currentIndex] : undefined;
    if (currentTooltipPanel !== undefined && (currentTooltipPanel !== currentPanel || !gamepad)) {
      HideCustomTooltip(currentTooltipPanel, "bless_selection");
      currentTooltipPanel = undefined;
    }
    if (gamepad && currentOption !== undefined && currentPanel !== undefined && currentTooltipPanel !== currentPanel) {
      ShowCustomTooltip(currentPanel, "bless_selection", {
        itemName: currentOption.name,
        upText: currentOption.upgradeLevel > 1 ? "#Bless_UP" : ""
      });
      currentTooltipPanel = currentPanel;
    }
  });
  useClientSideEvent("key_pressed", data => {
    if (multiChoiceState().active_type !== "BlessUpgrade" || selectableCount() <= 0) {
      return;
    }
    const optionIndex = SELECTION_KEY_FUNCTIONS.indexOf(data.keyFunction);
    if (optionIndex >= 0) {
      const option = selection().options[optionIndex];
      if (option !== undefined) handleSelectUpgrade(option.name);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm && isGamepad()) {
      confirmSelection();
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "UpgradeBlessSelection",
        hittest: true
      }, null);
      libs.createElement("Panel", {
        id: "BG"
      }, _el$);
      const _el$3 = libs.createElement("Panel", {
        id: "SelectionConent"
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "Title"
      }, _el$3);
      libs.createElement("Image", {
        "class": "LeftIcon"
      }, _el$4);
      const _el$6 = libs.createElement("Panel", {
        "class": "TitleCenter"
      }, _el$4),
      _el$7 = libs.createElement("Panel", {
        "class": "TitleTextRow"
      }, _el$6);
      libs.createElement("Label", {
        id: "UpgradeTitle",
        text: "#UpgradeBlessSelectionTitle"
      }, _el$7);
      libs.createElement("Image", {
        "class": "RightIcon"
      }, _el$4);
      const _el$1 = libs.createElement("Panel", {
        id: "Options"
      }, _el$3),
      _el$10 = libs.createElement("Panel", {
        id: "Footer"
      }, _el$3);
      libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$10);
      libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$10);
      const _el$13 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$10);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "ParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_huang_01.vpcf",
        cameraOrigin: "0 0 700",
        fov: 80,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
    libs.insert(_el$7, libs.createComponent(libs.Show, {
      get when() {
        return multiChoiceState().bless_upgrade > 1;
      },
      get children() {
        const _el$9 = libs.createElement("Label", {
          id: "UpgradeCount",
          get text() {
            return `(${multiChoiceState().bless_upgrade})`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$9, "text", `(${multiChoiceState().bless_upgrade})`, _$p));
        return _el$9;
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, i) => {
        const total = selection().options.length;
        const delay = (total - 1 - i()) * 0.08;
        return (() => {
          const _el$15 = libs.createElement("Panel", {
            "class": "SelectionOption",
            animationDelay: `${delay}s`
          }, null);
          libs.use(panel => optionPanels[i()] = panel, _el$15);
          libs.setProp(_el$15, "onactivate", () => handleSelectUpgrade(option.name));
          libs.setProp(_el$15, "onmouseover", self => {
            setSelectedIndex(i());
            if (!isGamepad()) {
              ShowCustomTooltip(self, "bless_selection", {
                itemName: option.name,
                upText: option.upgradeLevel > 1 ? "#Bless_UpgradeLevel" : ""
              });
            }
          });
          libs.setProp(_el$15, "onmouseout", self => {
            if (!isGamepad()) {
              HideCustomTooltip(self, "bless_selection");
            }
          });
          libs.setProp(_el$15, "animationDelay", `${delay}s`);
          libs.insert(_el$15, libs.createComponent(common_box.CommonBox, {
            get itemName() {
              return option.name;
            },
            get rarity() {
              return option.rarity;
            },
            get upgradeLevel() {
              return option.upgradeLevel;
            },
            get hotkey() {
              return libs.memo(() => !!!isGamepad())() ? optionHotkeys()[i()] : undefined;
            }
          }), null);
          libs.insert(_el$15, libs.createComponent(libs.Show, {
            get when() {
              return option.upgradeLevel > 1;
            },
            get children() {
              return libs.createElement("Panel", {
                id: "UpgradeIcon"
              }, null);
            }
          }), null);
          libs.effect(_$p => libs.setProp(_el$15, "classList", {
            Selected: selectedIndex() == i() && isGamepad()
          }, _$p));
          return _el$15;
        })();
      }
    }));
    libs.insert(_el$13, libs.createComponent(libs.Show, {
      get when() {
        return selection().allin_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isGamepad() && selectedIndex() == selection().options.length
            });
          },
          onactivate: () => GameEvents.SendCustomGameEventToServer("select_bless_upgrade_allin", {}),
          onmouseover: () => setSelectedIndex(selection().options.length),
          text: "#bless_upgrade_allin_count",
          get vars() {
            return {
              cur: selection().allin_count
            };
          }
        });
      }
    }));
    libs.effect(_$p => libs.setProp(_el$, "classList", {
      Show: multiChoiceState().active_type === "BlessUpgrade"
    }, _$p));
    return _el$;
  })();
};

const parseItemCost = value => {
  const parts = (value ?? "0:0").toString().split(":");
  const itemCount = Number(parts[1] ?? 0);
  return {
    itemId: parts[0] ?? "0",
    itemCount: itemCount > 0 ? itemCount : 0
  };
};
const UpgradeSelection = () => {
  const selection = solid_utils.createPlayerNetDataSignal("common", "upgrade_selection", {
    options: []
  });
  const selectionEx = solid_utils.createPlayerNetDataSignal("common", "upgrade_selection_ex", {
    free_refresh_count: 0,
    pay_refresh_count: 0,
    allin_count: 0
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const [selectedIndex, setSelectedIndex] = libs.createSignal(0);
  const optionPanels = [];
  let currentTooltipPanel;
  const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
    mode: "keyboard",
    isGamepad: 0
  });
  const playerKeyValues = solid_utils.createServiceNetData("player_key_values", {});
  const optionHotkeys = libs.createMemo(() => SELECTION_KEY_FUNCTIONS.map(func => GetKeyBind(func, playerKeyValues())));
  const isGamepad = libs.createMemo(() => inputMode().isGamepad == 1);
  libs.createEffect(libs.on(() => selection().options.map(option => option.id).join("|"), optionsKey => {
    if (optionsKey != "") {
      setSelectedIndex(0);
    }
  }));
  const particleFxKey = () => {
    const options = selection().options;
    if (options.length <= 0) return undefined;
    return options.map(option => option.id).join("|");
  };
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const payRefreshCost = libs.createMemo(() => parseItemCost(KeyValues.game_setting.in_game_ability_upgrade_cost.value));
  const payRefreshItemCount = libs.createMemo(() => playerTokens()[payRefreshCost().itemId]?.amounts ?? 0);
  const payRefreshAvailableCount = libs.createMemo(() => Math.floor(payRefreshItemCount() / Math.max(payRefreshCost().itemCount, 1)));
  const footerActions = libs.createMemo(() => {
    const actions = [];
    if (selectionEx().free_refresh_count > 0) {
      actions.push({
        key: "free_refresh",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_upgrade_refresh", {
            type: "free"
          });
        }
      });
    } else if (selectionEx().pay_refresh_count > 0 && payRefreshAvailableCount() > 0) {
      actions.push({
        key: "pay_refresh",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_upgrade_refresh", {
            type: "pay"
          });
        }
      });
    }
    if (selectionEx().allin_count > 0) {
      actions.push({
        key: "allin",
        onActivate: () => {
          GameEvents.SendCustomGameEventToServer("select_upgrade_allin", {});
        }
      });
    }
    return actions;
  });
  const selectableCount = libs.createMemo(() => selection().options.length + footerActions().length);
  const handleSelectUpgrade = upgradeId => {
    GameEvents.SendCustomGameEventToServer("select_upgrade", {
      upgrade_id: upgradeId
    });
  };
  const getFooterActionIndex = key => footerActions().findIndex(action => action.key == key);
  const isFooterActionSelected = key => {
    const actionIndex = getFooterActionIndex(key);
    return isGamepad() && actionIndex >= 0 && selectedIndex() == selection().options.length + actionIndex;
  };
  const setFooterSelection = key => {
    const actionIndex = getFooterActionIndex(key);
    if (actionIndex >= 0) {
      setSelectedIndex(selection().options.length + actionIndex);
    }
  };
  const moveSelection = delta => {
    const total = selectableCount();
    if (total <= 0) return;
    setSelectedIndex((selectedIndex() + delta + total) % total);
  };
  const confirmSelection = () => {
    const currentIndex = selectedIndex();
    const option = selection().options[currentIndex];
    if (option !== undefined) {
      handleSelectUpgrade(option.id);
      return;
    }
    const footerAction = footerActions()[currentIndex - selection().options.length];
    if (footerAction !== undefined) {
      footerAction.onActivate();
    }
  };
  libs.createEffect(libs.on(selectableCount, total => {
    if (total <= 0) {
      setSelectedIndex(0);
      return;
    }
    if (selectedIndex() >= total) {
      setSelectedIndex(total - 1);
    }
  }));
  libs.createEffect(() => {
    const gamepad = isGamepad();
    const currentIndex = selectedIndex();
    const options = selection().options;
    const currentOption = options[currentIndex];
    const currentPanel = currentOption !== undefined ? optionPanels[currentIndex] : undefined;
    if (currentTooltipPanel !== undefined && (currentTooltipPanel !== currentPanel || !gamepad)) {
      HideCustomTooltip(currentTooltipPanel, "feature_tags");
      currentTooltipPanel = undefined;
    }
    if (gamepad && currentOption !== undefined && currentPanel !== undefined && currentTooltipPanel !== currentPanel) {
      ShowCustomTooltip(currentPanel, "feature_tags", {
        tags: GetAbilityUpgradeTags(currentOption.id).join("|")
      });
      currentTooltipPanel = currentPanel;
    }
  });
  useClientSideEvent("key_pressed", data => {
    if (multiChoiceState().active_type !== "SkillUpgrade" || selectableCount() <= 0) {
      return;
    }
    const optionIndex = SELECTION_KEY_FUNCTIONS.indexOf(data.keyFunction);
    if (optionIndex >= 0) {
      const option = selection().options[optionIndex];
      if (option !== undefined) handleSelectUpgrade(option.id);
      return;
    }
    if (data.keyFunction == "upgrade") {
      GameEvents.SendCustomGameEventToServer("toggle_skill_upgrade_selection", {});
      return;
    }
    if (data.keyFunction == KeyFunction.OptionUp) {
      moveSelection(-1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionDown) {
      moveSelection(1);
      return;
    }
    if (data.keyFunction == KeyFunction.OptionConfirm && isGamepad()) {
      confirmSelection();
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "UpgradeSelection",
        hittest: true
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "UpgradeConent"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "Title"
      }, _el$2);
      libs.createElement("Image", {
        "class": "LeftIcon"
      }, _el$3);
      const _el$5 = libs.createElement("Panel", {
        "class": "TitleCenter"
      }, _el$3),
      _el$6 = libs.createElement("Panel", {
        "class": "TitleTextRow"
      }, _el$5);
      libs.createElement("Label", {
        id: "UpgradeTitle",
        text: "#UpgradeTitle"
      }, _el$6);
      libs.createElement("Image", {
        "class": "RightIcon"
      }, _el$3);
      const _el$0 = libs.createElement("Panel", {
        id: "UpgradeOptions"
      }, _el$2),
      _el$1 = libs.createElement("Panel", {
        id: "Footer"
      }, _el$2),
      _el$10 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$1);
      libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$1);
      const _el$15 = libs.createElement("Panel", {
        "class": "FooterButtonPlaceholder"
      }, _el$1);
    libs.insert(_el$6, libs.createComponent(libs.Show, {
      get when() {
        return multiChoiceState().skill_upgrade > 1;
      },
      get children() {
        const _el$8 = libs.createElement("Label", {
          id: "UpgradeCount",
          get text() {
            return `(${multiChoiceState().skill_upgrade})`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$8, "text", `(${multiChoiceState().skill_upgrade})`, _$p));
        return _el$8;
      }
    }), null);
    libs.insert(_el$0, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, i) => {
        const total = selection().options.length;
        const delay = (total - 1 - i()) * 0.08;
        return libs.createComponent(upgrade_box.UpgradeBox, {
          get hotkey() {
            return libs.memo(() => !!!isGamepad())() ? optionHotkeys()[i()] : undefined;
          },
          get customTooltip() {
            return {
              name: "feature_tags",
              tags: GetAbilityUpgradeTags(option.id).join("|")
            };
          },
          "class": "UpgradeOption",
          get classList() {
            return {
              Selected: selectedIndex() == i() && isGamepad()
            };
          },
          get upgradeID() {
            return option.id;
          },
          ref: panel => optionPanels[i()] = panel,
          onactivate: () => handleSelectUpgrade(option.id),
          onmouseover: () => setSelectedIndex(i()),
          animationDelay: `${delay}s`
        });
      }
    }));
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return selectionEx().free_refresh_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isFooterActionSelected("free_refresh")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_upgrade_refresh", {
              type: "free"
            });
          },
          onmouseover: () => setFooterSelection("free_refresh"),
          text: "#refresh_count",
          get vars() {
            return {
              cur: selectionEx().free_refresh_count
            };
          }
        });
      }
    }), null);
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!(selectionEx().free_refresh_count <= 0 && selectionEx().pay_refresh_count > 0))() && payRefreshAvailableCount() > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          html: true,
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isFooterActionSelected("pay_refresh")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_upgrade_refresh", {
              type: "pay"
            });
          },
          onmouseover: () => setFooterSelection("pay_refresh"),
          get children() {
            const _el$11 = libs.createElement("Panel", {
                align: "center center",
                flowChildren: "right"
              }, null),
              _el$12 = libs.createElement("Label", {
                text: "#refresh_count",
                get vars() {
                  return {
                    cur: Math.min(selectionEx().pay_refresh_count, payRefreshAvailableCount())
                  };
                }
              }, _el$11),
              _el$13 = libs.createElement("Label", {
                id: "PayRefreshCost",
                get text() {
                  return payRefreshCost().itemCount;
                }
              }, _el$11);
            libs.setProp(_el$11, "align", "center center");
            libs.setProp(_el$11, "flowChildren", "right");
            libs.effect(_p$ => {
              const _v$ = {
                  cur: Math.min(selectionEx().pay_refresh_count, payRefreshAvailableCount())
                },
                _v$2 = payRefreshCost().itemCount;
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$12, "vars", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$13, "text", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$11;
          }
        });
      }
    }), null);
    libs.insert(_el$15, libs.createComponent(libs.Show, {
      get when() {
        return selectionEx().allin_count > 0;
      },
      get children() {
        return libs.createComponent(EOM_Button.EOM_Button, {
          size: "Small",
          get ["class"]() {
            return libs.classNames({
              GamepadSelected: isFooterActionSelected("allin")
            });
          },
          onactivate: () => {
            GameEvents.SendCustomGameEventToServer("select_upgrade_allin", {});
          },
          onmouseover: () => setFooterSelection("allin"),
          text: "#allin_count",
          get vars() {
            return {
              cur: selectionEx().allin_count
            };
          }
        });
      }
    }));
    libs.insert(_el$, libs.createComponent(solid_utils.DynamicKey, {
      key: particleFxKey,
      children: () => libs.createElement("DOTAParticleScenePanel", {
        "class": "ParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_lan.vpcf",
        cameraOrigin: "0 0 600",
        fov: 100,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, null)
    }), null);
    libs.effect(_$p => libs.setProp(_el$, "classList", {
      Show: multiChoiceState().active_type === "SkillUpgrade"
    }, _$p));
    return _el$;
  })();
};

const UpgradeSelectionAll = () => {
  const selection = solid_utils.createPlayerNetDataSignal("common", "upgrade_selection_all", {
    options: []
  });
  const multiChoiceState = solid_utils.createPlayerNetDataSignal("common", "multi_choice_state", {
    sum_count: 0,
    active_type: undefined,
    skill_upgrade: 0,
    bless_selection: 0,
    bless_upgrade: 0,
    artifact_upgrade: 0,
    artifact_selection: 0
  });
  const handleSelectUpgrade = upgradeId => {
    GameEvents.SendCustomGameEventToServer("select_upgrade_all", {
      upgrade_id: upgradeId
    });
  };
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "UpgradeSelectionAll",
        hittest: true
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "UpgradeSelectionAllContent"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "UpgradeSelectionAllTitle"
      }, _el$2);
      libs.createElement("Image", {
        "class": "UpgradeSelectionAllLeftIcon"
      }, _el$3);
      const _el$5 = libs.createElement("Panel", {
        "class": "UpgradeSelectionAllTitleCenter"
      }, _el$3),
      _el$6 = libs.createElement("Label", {
        id: "UpgradeSelectionAllTitleLabel",
        get text() {
          return GetLocalization("#UpgradeTitle");
        }
      }, _el$5);
      libs.createElement("Image", {
        "class": "UpgradeSelectionAllRightIcon"
      }, _el$3);
      const _el$8 = libs.createElement("Panel", {
        id: "UpgradeSelectionAllOptions",
        "class": "VerticalScrollStyle",
        flowChildren: "right-wrap",
        scroll: "y"
      }, _el$2);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "UpgradeSelectionAllParticleFx",
        particleName: "particles/ui/game/ui_fx_zhufuchuxian_lan.vpcf",
        cameraOrigin: "0 0 600",
        fov: 100,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$);
    libs.setProp(_el$8, "flowChildren", "right-wrap");
    libs.setProp(_el$8, "scroll", "y");
    libs.insert(_el$8, libs.createComponent(libs.For, {
      get each() {
        return selection().options;
      },
      children: (option, index) => libs.createComponent(upgrade_icon.UpgradeIcon, {
        "class": "UpgradeSelectionAllOption",
        get upgradeID() {
          return option.id;
        },
        showTips: true,
        onactivate: () => handleSelectUpgrade(option.id),
        get animationDelay() {
          return `${Math.min(index() * 0.03, 0.36)}s`;
        }
      })
    }));
    libs.effect(_p$ => {
      const _v$ = {
          Show: multiChoiceState().active_type === "SkillUpgradeAll"
        },
        _v$2 = GetLocalization("#UpgradeTitle");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$6, "text", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};

function HudMain() {
  const errorMessageListener = GameEvents.Subscribe("error_message", ({
    message,
    sound = "General.CastFail_Custom",
    vars
  }) => {
    const text = vars ? LocalizeWithVars(message, vars) : GetLocalization(message);
    GameUI.SendCustomHUDError(text, sound);
  });
  libs.onCleanup(() => GameEvents.Unsubscribe(errorMessageListener));
  ReportPing();
  const dungeon_loading = solid_utils.createPlayerNetDataSignal("common", "dungeon_loading", {
    state: false
  });
  libs.createEffect(() => {
    console.log("dungeon_loading", dungeon_loading()?.state);
  });
  const boss_intro = solid_utils.createNetDataSignal("common", "boss_intro", {
    state: false
  });
  libs.createEffect(() => {
    $.GetContextPanel().SetHasClass("DungeonLoading", (dungeon_loading()?.state ?? false) || (boss_intro()?.state ?? false));
  });
  const fish_state = solid_utils.createPlayerNetDataSignal("common", "fish_state", "none");
  libs.createEffect(libs.on(fish_state, v => {
    $.GetContextPanel().SetHasClass("Fishing", v != "none");
  }));
  const [exploreVisible] = solid_utils.createToggleWindowSignal("HudExplore", false);
  libs.createEffect(libs.on(exploreVisible, v => {
    $.GetContextPanel().SetHasClass("Explore", v);
  }));
  const arenaSession = solid_utils.createPlayerNetDataSignal("arena", "session");
  libs.createEffect(libs.on(arenaSession, v => {
    $.GetContextPanel().SetHasClass("Arena", v !== undefined);
  }));
  return [libs.createElement("Image", {
    id: "Logo",
    hittest: false
  }, null), libs.createComponent(TopBar, {}), libs.createComponent(LeftBar, {}), libs.createComponent(RightBar, {}), libs.createComponent(BottomBar, {}), libs.createComponent(UpgradeSelection, {}), libs.createComponent(UpgradeSelectionAll, {}), libs.createComponent(PrivilegeRewardSelection, {}), libs.createComponent(BlessSelection, {}), libs.createComponent(ArtifactSelection, {}), libs.createComponent(UpgradeBlessSelection, {}), libs.createComponent(UpgradeArtifactSelection, {}), libs.createComponent(AttributeSummary, {}), (() => {
    const _el$2 = libs.createElement("Label", {
      hittest: false,
      id: "Version",
      get text() {
        return `v${(Object.keys(KeyValues.version).map(key => toFiniteNumber(key, 100)).sort((a, b) => b - a)[0] / 100).toFixed(2)}`;
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$2, "text", `v${(Object.keys(KeyValues.version).map(key => toFiniteNumber(key, 100)).sort((a, b) => b - a)[0] / 100).toFixed(2)}`, _$p));
    return _el$2;
  })()];
}
{
  useNetDataKey("common", "server_time", data => {
    if (data) {
      let clientTime = Date.now() / 1000;
      let serverTime = data.time_stamp;
      let timeDiff = serverTime - clientTime;
      CustomUIConfig.__serverTimeDiff = timeDiff;
    }
  });
  const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
  let gameModeActive = false;
  let previousGameState;
  const getCameraDistanceSetting = () => {
    const data = player_key_values();
    const settingName = gameModeActive ? "Setting_BattleCameraDistance" : "Setting_BaseCameraDistance";
    const defaultDistance = gameModeActive ? 1150 : 900;
    const distance = toFiniteNumber(data?.[settingName]?.value ?? data?.["Setting_CameraDistance"]?.value, defaultDistance);
    return Math.min(Math.max(distance, 900), 1675);
  };
  const applyCameraDistanceSetting = () => {
    CustomUIConfig.Camera.SetCameraDistance(getCameraDistanceSetting());
  };
  const getCameraFollowModeSetting = () => {
    const value = player_key_values()?.["Setting_CameraFollowMode"]?.value;
    return value === "free" || value === "comfort" ? value : "classic";
  };
  const applyCameraFollowModeSetting = () => {
    CustomUIConfig.Camera.SetCameraFollowMode(getCameraFollowModeSetting());
  };
  const getCameraComfortDeadZoneRadiusSetting = () => {
    const value = toFiniteNumber(player_key_values()?.["Setting_CameraComfortDeadZoneRadius"]?.value, 300);
    return Math.min(Math.max(value, 0), 600);
  };
  const getCameraComfortHalfLifeSetting = () => {
    const value = toFiniteNumber(player_key_values()?.["Setting_CameraComfortHalfLife"]?.value, 160);
    return Math.min(Math.max(value, 50), 500);
  };
  const applyCameraComfortFollowSetting = () => {
    CustomUIConfig.Camera.SetCameraComfortFollowOptions(getCameraComfortDeadZoneRadiusSetting(), getCameraComfortHalfLifeSetting() / 1000);
  };
  useNetDataKey("common", "game_state", data => {
    const currentGameState = data?.state;
    gameModeActive = currentGameState === "GameState_Dungeon";
    applyCameraDistanceSetting();
    if (currentGameState === "GameState_Prepare" && previousGameState !== currentGameState) {
      const partySize = Game.GetAllPlayerIDs().length;
      GameUI.CustomUIConfig().PlayerTypeReport(`login|party_${partySize}`);
    }
    previousGameState = currentGameState;
  });
  libs.createEffect(libs.on(player_key_values, () => {
    applyCameraDistanceSetting();
    applyCameraFollowModeSetting();
    applyCameraComfortFollowSetting();
  }));
}
function ReportPing() {
  const pingSamples = [];
  let pingSchedule;
  let pingRequest;
  let pingReportDisposed = false;
  const schedulePingSample = () => {
    if (pingReportDisposed || pingSamples.length >= 5) return;
    pingSchedule = $.Schedule(1, measurePing);
  };
  const measurePing = () => {
    pingSchedule = undefined;
    const startTime = Date.now();
    pingRequest = ServerRequest("measure_ping", {}, () => {
      pingRequest = undefined;
      if (pingReportDisposed) return;
      const receiveTime = Date.now();
      const ping = receiveTime - startTime;
      pingSamples.push(ping);
      if (pingSamples.length >= 5) {
        pingSamples.sort((a, b) => a - b);
        const medianPing = pingSamples[Math.floor(pingSamples.length / 2)];
        GameUI.CustomUIConfig().ReportClick("ping", `${medianPing}ms`);
        return;
      }
      schedulePingSample();
    }, 5, () => {
      pingRequest = undefined;
      schedulePingSample();
    });
  };
  schedulePingSample();
  libs.onCleanup(() => {
    pingReportDisposed = true;
    if (pingSchedule !== undefined) {
      $.CancelScheduled(pingSchedule);
    }
    if (pingRequest !== undefined) {
      CancelRequest(pingRequest);
    }
  });
}
(function () {
  GameEvents.Subscribe("toggle_window_tag", data => {
    JumpToMenu({
      window_name: data.window_name,
      menu: data.menu,
      menu2: data.menu2,
      force: data.force == 1 ? true : false,
      data: data.data
    });
  });
  let pHud = $.GetContextPanel();
  while (pHud && pHud.id != "Hud") {
    pHud = pHud.GetParent();
  }
  const open_store = solid_utils.createServiceNetData("open_shop", {
    value: false
  });
  libs.createEffect(() => {
    pHud.SetHasClass("ShowStoreContent", open_store().value);
  });
})();
libs.render(HudMain, $.GetContextPanel());