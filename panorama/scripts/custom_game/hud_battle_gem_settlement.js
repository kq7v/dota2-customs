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
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var EOM_Button = require('./EOM_Button.js');
var Player = require('./Player.js');
var server_equipment = require('./server_equipment.js');
require('./service_netdata_helper.js');
require('./EOM_RedMark.js');
require('./EOM_TextEntry.js');

const GRID_CELL_WIDTH = 108;
const GRID_CELL_HEIGHT = 78;
const GRID_CELL_PADDING = 1;
const GRID_CELL_SLOT_WIDTH = GRID_CELL_WIDTH + GRID_CELL_PADDING * 2;
const GRID_CELL_SLOT_HEIGHT = GRID_CELL_HEIGHT + GRID_CELL_PADDING * 2;
const ACTION_PIPS_WIDTH = 337;
const ACTION_PIP_MAX_SIZE = 40;
const REWARD_ITEM_SIZE = 88;
const TOWER_ACTION_PRODUCT_ID = "800151";
const TOWER_ACTION_ITEM_COUNT = 1;
const GRID_CELL_CONTAINER_STYLE = {
  padding: `${GRID_CELL_PADDING}px`
};
const GRID_CELL_STYLE = {
  width: `${GRID_CELL_WIDTH}px`,
  height: `${GRID_CELL_HEIGHT}px`
};
const ACTION_PIPS_STYLE = {
  width: `${ACTION_PIPS_WIDTH}px`,
  height: `${ACTION_PIP_MAX_SIZE}px`
};
const REWARD_ITEM_STYLE = {
  width: `${REWARD_ITEM_SIZE}px`,
  height: `${REWARD_ITEM_SIZE}px`
};
const EMPTY_RESOURCE_STATE = {
  essence: 0,
  material: 0,
  chaosMaterial: 0
};
const EMPTY_PREVIEW_STATE = {
  total_action_chance: 0,
  base_gem_rewards: "{}",
  preview: ""
};
const GemSettlementHud = () => {
  const towerRewardsPreview = solid_utils.createServiceNetData("player_tower_rewards_preview", EMPTY_PREVIEW_STATE);
  const playerTokens = solid_utils.createServiceNetData("player_tokens", {});
  const battleGemState = solid_utils.createNetDataSignal("common", "battle_gem_state");
  const [actions, setActions] = libs.createSignal([]);
  const [hoveredGridType, setHoveredGridType] = libs.createSignal();
  let receiveRewardsLocked = false;
  const previewData = libs.createMemo(() => towerRewardsPreview());
  const parsedPreview = libs.createMemo(() => ParseTowerPreview(previewData()));
  const buyActionsConfig = libs.createMemo(() => ParseBuyActionsConfig(KeyValues.gem_setting.buy_actions?.value));
  const buyActionsCurrencyTokens = libs.createMemo(() => {
    const itemID = buyActionsConfig()?.itemID;
    return itemID === undefined || itemID === 110001 ? [110001] : [110001, itemID];
  });
  const towerActionProduct = libs.createMemo(() => KeyValues.info_shop_product[TOWER_ACTION_PRODUCT_ID]);
  const localPlayerID = Players.GetLocalPlayer();
  const isBuyingActions = libs.createMemo(() => (battleGemState()?.actionPurchasingPlayerIds ?? []).includes(localPlayerID));
  const hasBoughtActions = libs.createMemo(() => (battleGemState()?.actionPurchasedPlayerIds ?? []).includes(localPlayerID));
  const hasEnoughActionItem = libs.createMemo(() => {
    const config = buyActionsConfig();
    if (config === undefined) {
      return false;
    }
    return (playerTokens()[String(config.itemID)]?.amounts ?? 0) >= TOWER_ACTION_ITEM_COUNT;
  });
  const buyActionsCost = libs.createMemo(() => {
    const config = buyActionsConfig();
    if (config === undefined) {
      return undefined;
    }
    if (hasEnoughActionItem()) {
      return {
        itemID: config.itemID,
        amount: TOWER_ACTION_ITEM_COUNT
      };
    }
    const product = towerActionProduct();
    if (product === undefined) {
      return undefined;
    }
    return {
      itemID: product.pay_type,
      amount: product.real_price
    };
  });
  libs.createEffect(() => {
    previewData();
    setActions([]);
    setHoveredGridType(undefined);
    receiveRewardsLocked = false;
  });
  const isVisible = libs.createMemo(() => {
    return battleGemState()?.isFinished === true && parsedPreview() !== undefined;
  });
  const simulation = libs.createMemo(() => {
    const preview = parsedPreview();
    if (preview === undefined) {
      return undefined;
    }
    return SimulateSettlement(preview, actions());
  });
  const gridRows = libs.createMemo(() => parsedPreview()?.grid ?? []);
  const gridPixelWidth = libs.createMemo(() => {
    const rows = gridRows();
    if (rows.length <= 0) {
      return 0;
    }
    const maxColumnCount = rows.reduce((maxCount, rowData) => Math.max(maxCount, rowData.length), 0);
    if (maxColumnCount <= 0) {
      return 0;
    }
    return maxColumnCount * GRID_CELL_SLOT_WIDTH;
  });
  const gridPixelHeight = libs.createMemo(() => {
    const rowCount = gridRows().length;
    if (rowCount <= 0) {
      return 0;
    }
    return rowCount * GRID_CELL_SLOT_HEIGHT;
  });
  const gridBoxStyle = libs.createMemo(() => ({
    width: `${gridPixelWidth()}px`,
    height: `${gridPixelHeight()}px`
  }));
  const originPosition = libs.createMemo(() => {
    const preview = parsedPreview();
    if (preview === undefined) {
      return undefined;
    }
    return {
      row: preview.originRow,
      column: preview.originColumn
    };
  });
  const pathSegments = libs.createMemo(() => {
    const preview = parsedPreview();
    const origin = originPosition();
    if (preview === undefined || origin === undefined) {
      return [];
    }
    const points = [origin, ...actions()];
    const segments = [];
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const startCenter = GetCellCenter(start.row, start.column);
      const endCenter = GetCellCenter(end.row, end.column);
      const dx = endCenter.x - startCenter.x;
      const dy = endCenter.y - startCenter.y;
      segments.push({
        id: `${i}:${start.row}-${start.column}:${end.row}-${end.column}`,
        x: startCenter.x,
        y: startCenter.y - 2,
        length: Math.sqrt(dx * dx + dy * dy),
        angle: Math.atan2(dy, dx) * 180 / Math.PI
      });
    }
    return segments;
  });
  const actionCapacity = libs.createMemo(() => {
    const preview = parsedPreview();
    const result = simulation();
    if (preview === undefined || result === undefined) {
      return 0;
    }
    return Math.max(preview.totalActionChance, Math.max(0, result.remainingActionChance) + actions().length);
  });
  const actionSummaryText = libs.createMemo(() => {
    const result = simulation();
    if (result === undefined) {
      return "<font color='#E2B367'>0</font><font color='#7F7559'> / 0</font>";
    }
    return `<font color='#E2B367'>${Math.max(0, result.remainingActionChance)}</font><font color='#7F7559'> / ${actionCapacity()}</font>`;
  });
  const actionPips = libs.createMemo(() => {
    const result = simulation();
    if (result === undefined) {
      return [];
    }
    const total = actionCapacity();
    const remaining = Math.max(0, result.remainingActionChance);
    const list = [];
    for (let i = 0; i < total; i++) {
      list.push(i >= remaining ? "used" : "available");
    }
    return list;
  });
  const actionPipStyle = libs.createMemo(() => {
    const count = actionPips().length;
    const size = count > 0 ? Math.max(1, Math.min(ACTION_PIP_MAX_SIZE, Math.floor((ACTION_PIPS_WIDTH - 5) / count))) : ACTION_PIP_MAX_SIZE;
    return {
      width: `${size}px`,
      height: `${size}px`
    };
  });
  const gridHintText = libs.createMemo(() => {
    const gridType = hoveredGridType();
    if (gridType !== undefined && gridType !== "") {
      return GetLocalization(`#${gridType}_description`);
    }
    return GetLocalization("#BattleGemGridHintDefault");
  });
  const specialStatuses = libs.createMemo(() => {
    const result = simulation();
    if (result === undefined) {
      return [];
    }
    const list = [];
    for (let i = 0; i < result.anyCellChance; i++) {
      list.push("anycell");
    }
    for (let i = 0; i < result.doubleRewardsChance; i++) {
      list.push("double_cell");
    }
    return list;
  });
  const activatedEffects = libs.createMemo(() => {
    const preview = parsedPreview();
    if (preview === undefined) {
      return [];
    }
    const list = [];
    const effectByGridType = {};
    for (const action of actions()) {
      const gridType = preview.grid[action.row]?.[action.column]?.grid_type ?? "";
      if (gridType === "") {
        continue;
      }
      const existing = effectByGridType[gridType];
      if (existing !== undefined) {
        existing.count++;
        continue;
      }
      const effect = {
        gridType,
        count: 1
      };
      effectByGridType[gridType] = effect;
      list.push(effect);
    }
    return list;
  });
  const resourceItems = libs.createMemo(() => {
    const resources = simulation()?.resources ?? EMPTY_RESOURCE_STATE;
    return [{
      itemID: "120011",
      count: resources.essence
    }, {
      itemID: "120014",
      count: resources.material
    }, {
      itemID: "120016",
      count: resources.chaosMaterial
    }];
  });
  const gemPreviewItems = libs.createMemo(() => {
    const result = [];
    for (const reward of simulation()?.gemRewards ?? []) {
      if (reward.type === "perfect") {
        const id = `battle_gem_preview_${result.length}`;
        result.push({
          type: "perfect",
          id,
          gem: {
            id: -(result.length + 1),
            gem_item_id: reward.detail.gem_item_id,
            locked: false,
            level: 0,
            rarity: reward.rarity,
            gem_roll_change: 0
          },
          embeddedGemData: reward.embeddedGemData
        });
        continue;
      }
      result.push({
        type: "quantity",
        id: `battle_gem_preview_${result.length}`,
        rarity: reward.rarity,
        count: reward.count
      });
    }
    return result;
  });
  const canConfirm = libs.createMemo(() => {
    return actions().length > 0;
  });
  const onCellActivate = (row, column) => {
    const preview = parsedPreview();
    const cell = preview?.grid[row]?.[column];
    print(`[BattleGemSettlement] BattleGemGridCell clicked row=${row} column=${column} gridType=${cell?.grid_type ?? "unknown"}`);
    if (preview === undefined || cell === undefined || !IsInsideBoard(preview.grid, row, column)) {
      return;
    }
    const result = simulation();
    if (result === undefined || !result.isValid || !CanAffordCellAction(result, cell.grid_type)) {
      return;
    }
    const key = BuildCellKey(row, column);
    if (result.visitedKeySet[key] === true) {
      return;
    }
    if (result.anyCellChance <= 0 && !IsNeighbor(result.currentPosition, {
      row,
      column
    })) {
      return;
    }
    PlayCellPickSound(preview.grid[row][column].grid_type);
    setActions(prev => [...prev, {
      row,
      column
    }]);
  };
  const onGridContextMenu = () => {
    setActions(prev => prev.length > 0 ? prev.slice(0, prev.length - 1) : prev);
  };
  const onReceiveRewards = () => {
    if (!canConfirm() || receiveRewardsLocked) {
      return;
    }
    receiveRewardsLocked = true;
    $.Schedule(0.5, () => {
      receiveRewardsLocked = false;
    });
    GameEvents.SendCustomGameEventToServer("battle_gem_receive_rewards", {
      actions: JSON.stringify(actions().map(action => ({
        row: action.row,
        column: action.column
      })))
    });
  };
  const onBuyActions = () => {
    const config = buyActionsConfig();
    if (config === undefined || hasBoughtActions() || isBuyingActions()) {
      return;
    }
    GameEvents.SendCustomGameEventToServer("battle_gem_buy_actions", {
      buy_product: !hasEnoughActionItem()
    });
  };
  print("BattleGemSettlement");
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "BattleGemSettlementRoot",
    name: "MenuButton_battle_gem_settlement",
    "class": "CustomHudRoot",
    get show() {
      return isVisible();
    },
    renderOnShow: true,
    hittest: false,
    get backgroundChildren() {
      return libs.createComponent(Player.CurrencyGroup, {
        currencyType: "top",
        get tokens() {
          return buyActionsCurrencyTokens();
        }
      });
    },
    get children() {
      const _el$ = libs.createElement("Panel", {
          id: "BattleGemSettlementScreen",
          hittest: true
        }, null),
        _el$2 = libs.createElement("Panel", {
          id: "BattleGemSettlementTop"
        }, _el$),
        _el$3 = libs.createElement("Panel", {
          id: "BattleGemSettlementTitleImages",
          hittest: false
        }, _el$2);
        libs.createElement("Image", {
          "class": "BattleGemSettlementTitleLine"
        }, _el$3);
        const _el$5 = libs.createElement("Image", {
          id: "BattleGemSettlementTitleText",
          get ["class"]() {
            return `Language_${Language()}`;
          }
        }, _el$3);
        libs.createElement("Image", {
          "class": "BattleGemSettlementTitleLine Reversed"
        }, _el$3);
        const _el$7 = libs.createElement("Panel", {
          id: "BattleGemSettlementContent"
        }, _el$),
        _el$8 = libs.createElement("Panel", {
          id: "BattleGemLeftPanel"
        }, _el$7),
        _el$9 = libs.createElement("Panel", {
          id: "BattleGemActionBar",
          hittest: false
        }, _el$8),
        _el$0 = libs.createElement("Panel", {
          id: "BattleGemActionPips",
          hittest: false
        }, _el$9),
        _el$1 = libs.createElement("Panel", {
          id: "BattleGemActionPipList"
        }, _el$0),
        _el$10 = libs.createElement("Panel", {
          id: "BattleGemActionSummary"
        }, _el$9),
        _el$11 = libs.createElement("Label", {
          id: "BattleGemActionLabel",
          get text() {
            return GetLocalization("#BattleGemAction");
          }
        }, _el$10),
        _el$12 = libs.createElement("Label", {
          id: "BattleGemActionCount",
          html: true,
          get text() {
            return actionSummaryText();
          }
        }, _el$10),
        _el$18 = libs.createElement("Panel", {
          "class": "BattleGemInfoBlock"
        }, _el$8),
        _el$19 = libs.createElement("Panel", {
          "class": "BattleGemSectionHeader"
        }, _el$18);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine"
        }, _el$19);
        const _el$21 = libs.createElement("Label", {
          "class": "BattleGemSectionTitle",
          get text() {
            return GetLocalization("#BattleGemSpecialStatus");
          }
        }, _el$19);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine Reversed"
        }, _el$19);
        const _el$23 = libs.createElement("Panel", {
          "class": "BattleGemStatusList"
        }, _el$18),
        _el$24 = libs.createElement("Panel", {
          "class": "BattleGemInfoBlock"
        }, _el$8),
        _el$25 = libs.createElement("Panel", {
          "class": "BattleGemSectionHeader"
        }, _el$24);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine"
        }, _el$25);
        const _el$27 = libs.createElement("Label", {
          "class": "BattleGemSectionTitle",
          get text() {
            return GetLocalization("#BattleGemActivatedEffects");
          }
        }, _el$25);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine Reversed"
        }, _el$25);
        const _el$29 = libs.createElement("Panel", {
          "class": "BattleGemStatusList ActivatedEffects"
        }, _el$24),
        _el$30 = libs.createElement("Panel", {
          id: "BattleGemGridPanel"
        }, _el$7),
        _el$31 = libs.createElement("Panel", {
          id: "BattleGemGridContainer"
        }, _el$30),
        _el$32 = libs.createElement("Panel", {
          id: "BattleGemGridRows",
          get style() {
            return gridBoxStyle();
          }
        }, _el$31),
        _el$33 = libs.createElement("Panel", {
          id: "BattleGemGridPathOverlay",
          get style() {
            return gridBoxStyle();
          },
          hittest: false
        }, _el$31),
        _el$34 = libs.createElement("Label", {
          id: "BattleGemGridHint",
          get text() {
            return gridHintText();
          }
        }, _el$30),
        _el$35 = libs.createElement("Panel", {
          id: "BattleGemSidePanel"
        }, _el$7),
        _el$36 = libs.createElement("Panel", {
          "class": "BattleGemResourceBlock"
        }, _el$35),
        _el$37 = libs.createElement("Panel", {
          "class": "BattleGemSectionHeader"
        }, _el$36);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine"
        }, _el$37);
        const _el$39 = libs.createElement("Label", {
          "class": "BattleGemSectionTitle",
          get text() {
            return GetLocalization("#BattleGemResourceTitle");
          }
        }, _el$37);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine Reversed"
        }, _el$37);
        const _el$41 = libs.createElement("Panel", {
          "class": "BattleGemResourceList"
        }, _el$36),
        _el$42 = libs.createElement("Panel", {
          "class": "BattleGemRewardBlock"
        }, _el$35),
        _el$43 = libs.createElement("Panel", {
          "class": "BattleGemSectionHeader"
        }, _el$42);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine"
        }, _el$43);
        const _el$45 = libs.createElement("Label", {
          "class": "BattleGemSectionTitle",
          get text() {
            return GetLocalization("#BattleGemRewardTitle");
          }
        }, _el$43);
        libs.createElement("Image", {
          "class": "BattleGemSectionTitleLine Reversed"
        }, _el$43);
        const _el$47 = libs.createElement("Panel", {
          id: "BattleGemRewardList",
          "class": "VerticalScrollStyle",
          scroll: "y"
        }, _el$42),
        _el$48 = libs.createElement("Panel", {
          id: "BattleGemSettlementButtons"
        }, _el$35);
      libs.setProp(_el$0, "style", ACTION_PIPS_STYLE);
      libs.insert(_el$1, libs.createComponent(libs.For, {
        get each() {
          return actionPips();
        },
        children: state => (() => {
          const _el$49 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("BattleGemActionPip", state === "used" ? "Used" : "Available");
            },
            get style() {
              return actionPipStyle();
            }
          }, null);
          libs.effect(_p$ => {
            const _v$12 = libs.classNames("BattleGemActionPip", state === "used" ? "Used" : "Available"),
              _v$13 = actionPipStyle();
            _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$49, "class", _v$12, _p$._v$12));
            _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$49, "style", _v$13, _p$._v$13));
            return _p$;
          }, {
            _v$12: undefined,
            _v$13: undefined
          });
          return _el$49;
        })()
      }));
      libs.insert(_el$8, libs.createComponent(libs.Show, {
        get when() {
          return libs.memo(() => !!(!hasBoughtActions() && buyActionsConfig() !== undefined))() && buyActionsCost() !== undefined;
        },
        get children() {
          return libs.createComponent(EOM_Button.EOM_Button, {
            id: "BattleGemActionAddButton",
            color: "Cancel",
            get loading() {
              return isBuyingActions();
            },
            onactivate: onBuyActions,
            get children() {
              const _el$13 = libs.createElement("Panel", {
                  "class": "BattleGemActionAddContent",
                  hittest: false
                }, null),
                _el$14 = libs.createElement("Label", {
                  "class": "BattleGemActionAddText",
                  get text() {
                    return LocalizeWithVars("#BattleGemActionAdd", {
                      action_count: buyActionsConfig().actionCount
                    });
                  }
                }, _el$13),
                _el$15 = libs.createElement("Panel", {
                  "class": "BattleGemActionAddCost",
                  hittest: false
                }, _el$13),
                _el$16 = libs.createElement("Image", {
                  "class": "BattleGemActionAddMoonIcon",
                  get src() {
                    return `file://{images}/custom_game/tokens/${buyActionsCost().itemID}.png`;
                  }
                }, _el$15),
                _el$17 = libs.createElement("Label", {
                  "class": "BattleGemActionAddCostText",
                  get text() {
                    return buyActionsCost().amount;
                  }
                }, _el$15);
              libs.effect(_p$ => {
                const _v$ = LocalizeWithVars("#BattleGemActionAdd", {
                    action_count: buyActionsConfig().actionCount
                  }),
                  _v$2 = `file://{images}/custom_game/tokens/${buyActionsCost().itemID}.png`,
                  _v$3 = buyActionsCost().amount;
                _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$14, "text", _v$, _p$._v$));
                _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "src", _v$2, _p$._v$2));
                _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$17, "text", _v$3, _p$._v$3));
                return _p$;
              }, {
                _v$: undefined,
                _v$2: undefined,
                _v$3: undefined
              });
              return _el$13;
            }
          });
        }
      }), _el$18);
      libs.insert(_el$23, libs.createComponent(libs.For, {
        get each() {
          return specialStatuses();
        },
        children: status => (() => {
          const _el$50 = libs.createElement("Panel", {
              "class": "BattleGemStatusItem"
            }, null),
            _el$51 = libs.createElement("Image", {
              "class": "BattleGemStatusIcon",
              src: `file://{images}/custom_game/g1_gem/icon_s/${status}.png`
            }, _el$50),
            _el$52 = libs.createElement("Label", {
              "class": "BattleGemStatusText",
              get text() {
                return GetLocalization(`#${status}`);
              }
            }, _el$50);
          libs.setProp(_el$51, "src", `file://{images}/custom_game/g1_gem/icon_s/${status}.png`);
          libs.effect(_$p => libs.setProp(_el$52, "text", GetLocalization(`#${status}`), _$p));
          return _el$50;
        })()
      }));
      libs.insert(_el$29, libs.createComponent(libs.For, {
        get each() {
          return activatedEffects();
        },
        children: effect => (() => {
          const _el$53 = libs.createElement("Panel", {
              "class": "BattleGemStatusItem"
            }, null),
            _el$54 = libs.createElement("Image", {
              "class": "BattleGemStatusIcon",
              get src() {
                return `file://{images}/custom_game/g1_gem/icon_s/${effect.gridType}.png`;
              }
            }, _el$53),
            _el$55 = libs.createElement("Label", {
              "class": "BattleGemStatusText",
              get text() {
                return GetLocalization(`#${effect.gridType}`);
              }
            }, _el$53),
            _el$56 = libs.createElement("Label", {
              "class": "BattleGemStatusCount",
              get text() {
                return `x ${effect.count}`;
              }
            }, _el$53);
          libs.effect(_p$ => {
            const _v$14 = `file://{images}/custom_game/g1_gem/icon_s/${effect.gridType}.png`,
              _v$15 = GetLocalization(`#${effect.gridType}`),
              _v$16 = `x ${effect.count}`;
            _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$54, "src", _v$14, _p$._v$14));
            _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$55, "text", _v$15, _p$._v$15));
            _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$56, "text", _v$16, _p$._v$16));
            return _p$;
          }, {
            _v$14: undefined,
            _v$15: undefined,
            _v$16: undefined
          });
          return _el$53;
        })()
      }));
      libs.setProp(_el$31, "oncontextmenu", onGridContextMenu);
      libs.insert(_el$32, libs.createComponent(libs.For, {
        get each() {
          return gridRows();
        },
        children: (rowData, rowIndex) => (() => {
          const _el$57 = libs.createElement("Panel", {
            "class": "BattleGemGridRow"
          }, null);
          libs.insert(_el$57, libs.createComponent(libs.For, {
            each: rowData,
            children: (cell, columnIndex) => {
              const row = rowIndex();
              const column = columnIndex();
              const key = BuildCellKey(row, column);
              const isOrigin = row === parsedPreview().originRow && column === parsedPreview().originColumn;
              const visitedOrder = libs.createMemo(() => GetVisitedOrder(actions(), row, column));
              const cellState = libs.createMemo(() => {
                const result = simulation();
                if (result === undefined) {
                  return {
                    isCurrent: false,
                    isVisited: false,
                    isReachable: false,
                    isTeleportTarget: false
                  };
                }
                const isVisited = result.visitedKeySet[key] === true;
                return {
                  isCurrent: result.currentPosition.row === row && result.currentPosition.column === column,
                  isVisited,
                  isReachable: !isVisited && CanAffordCellAction(result, cell.grid_type) && (result.anyCellChance > 0 || IsNeighbor(result.currentPosition, {
                    row,
                    column
                  })),
                  isTeleportTarget: result.anyCellChance > 0 && !isVisited && CanAffordCellAction(result, cell.grid_type)
                };
              });
              const rarity = ResolveCellRarity(cell.grid_type);
              return libs.createComponent(EOM_Button.EOM_BaseButton, {
                "class": "BattleGemGridCellContainer",
                style: GRID_CELL_CONTAINER_STYLE,
                hittestchildren: false,
                onmouseover: () => setHoveredGridType(cell.grid_type || undefined),
                onmouseout: () => setHoveredGridType(undefined),
                onactivate: () => onCellActivate(row, column),
                get children() {
                  const _el$58 = libs.createElement("Panel", {
                      get ["class"]() {
                        return libs.classNames("BattleGemGridCell", `Rarity-${rarity}`, {
                          Origin: isOrigin,
                          Visited: cellState().isVisited,
                          Current: cellState().isCurrent,
                          Reachable: cellState().isReachable,
                          Unreachable: !isOrigin && !cellState().isVisited && !cellState().isReachable,
                          TeleportTarget: cellState().isTeleportTarget
                        });
                      }
                    }, null);
                    libs.createElement("Panel", {
                      "class": "BattleGemGridCellSelection",
                      hittest: false
                    }, _el$58);
                  libs.setProp(_el$58, "style", GRID_CELL_STYLE);
                  libs.insert(_el$58, libs.createComponent(libs.Show, {
                    get when() {
                      return visitedOrder() > 0;
                    },
                    get children() {
                      const _el$60 = libs.createElement("Panel", {
                          "class": "BattleGemGridCellOrder"
                        }, null),
                        _el$61 = libs.createElement("Label", {
                          get text() {
                            return String(visitedOrder());
                          }
                        }, _el$60);
                      libs.effect(_$p => libs.setProp(_el$61, "text", String(visitedOrder()), _$p));
                      return _el$60;
                    }
                  }), null);
                  libs.insert(_el$58, libs.createComponent(libs.Show, {
                    when: isOrigin,
                    get fallback() {
                      return (() => {
                        const _el$64 = libs.createElement("Panel", {
                            "class": "BattleGemGridCellContent"
                          }, null),
                          _el$66 = libs.createElement("Label", {
                            "class": "BattleGemGridCellName",
                            get text() {
                              return GetLocalization(`#${cell.grid_type}`);
                            }
                          }, _el$64);
                        libs.insert(_el$64, libs.createComponent(libs.Show, {
                          get when() {
                            return cell.grid_type !== "";
                          },
                          get children() {
                            const _el$65 = libs.createElement("Image", {
                              "class": "BattleGemGridCellIcon",
                              get src() {
                                return `file://{images}/custom_game/g1_gem/icon/${cell.grid_type}.png`;
                              }
                            }, null);
                            libs.effect(_$p => libs.setProp(_el$65, "src", `file://{images}/custom_game/g1_gem/icon/${cell.grid_type}.png`, _$p));
                            return _el$65;
                          }
                        }), _el$66);
                        libs.effect(_$p => libs.setProp(_el$66, "text", GetLocalization(`#${cell.grid_type}`), _$p));
                        return _el$64;
                      })();
                    },
                    get children() {
                      const _el$62 = libs.createElement("Panel", {
                          "class": "BattleGemGridCellContent"
                        }, null),
                        _el$63 = libs.createElement("Label", {
                          "class": "BattleGemGridCellName",
                          verticalAlign: "center",
                          marginBottom: "0px",
                          get text() {
                            return GetLocalization("#ORIGIN_LABEL");
                          }
                        }, _el$62);
                      libs.setProp(_el$63, "verticalAlign", "center");
                      libs.setProp(_el$63, "marginBottom", "0px");
                      libs.effect(_$p => libs.setProp(_el$63, "text", GetLocalization("#ORIGIN_LABEL"), _$p));
                      return _el$62;
                    }
                  }), null);
                  libs.effect(_$p => libs.setProp(_el$58, "class", libs.classNames("BattleGemGridCell", `Rarity-${rarity}`, {
                    Origin: isOrigin,
                    Visited: cellState().isVisited,
                    Current: cellState().isCurrent,
                    Reachable: cellState().isReachable,
                    Unreachable: !isOrigin && !cellState().isVisited && !cellState().isReachable,
                    TeleportTarget: cellState().isTeleportTarget
                  }), _$p));
                  return _el$58;
                }
              });
            }
          }));
          return _el$57;
        })()
      }));
      libs.insert(_el$33, libs.createComponent(libs.For, {
        get each() {
          return pathSegments();
        },
        children: segment => (() => {
          const _el$67 = libs.createElement("Panel", {
            "class": "BattleGemPathSegment",
            get style() {
              return {
                x: `${segment.x}px`,
                y: `${segment.y}px`,
                width: `${segment.length}px`,
                transform: `rotateZ(${segment.angle}deg)`
              };
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$67, "style", {
            x: `${segment.x}px`,
            y: `${segment.y}px`,
            width: `${segment.length}px`,
            transform: `rotateZ(${segment.angle}deg)`
          }, _$p));
          return _el$67;
        })()
      }));
      libs.insert(_el$41, libs.createComponent(libs.For, {
        get each() {
          return resourceItems();
        },
        children: item => (() => {
          const _el$68 = libs.createElement("Panel", {
              "class": "BattleGemResourceItem"
            }, null),
            _el$69 = libs.createElement("Panel", {
              "class": "BattleGemResourceItemTop"
            }, _el$68),
            _el$70 = libs.createElement("Image", {
              "class": "BattleGemResourceIcon",
              get src() {
                return getSrcPath(`store_items/${item.itemID}.png`);
              }
            }, _el$69),
            _el$71 = libs.createElement("Label", {
              "class": "BattleGemResourceName",
              get text() {
                return GetLocalization(item.itemID);
              }
            }, _el$69),
            _el$72 = libs.createElement("Label", {
              "class": "BattleGemResourceCount",
              get text() {
                return String(item.count);
              }
            }, _el$69);
            libs.createElement("Image", {
              "class": "BattleGemResourceDivider"
            }, _el$68);
          libs.effect(_p$ => {
            const _v$17 = getSrcPath(`store_items/${item.itemID}.png`),
              _v$18 = GetLocalization(item.itemID),
              _v$19 = String(item.count);
            _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$70, "src", _v$17, _p$._v$17));
            _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$71, "text", _v$18, _p$._v$18));
            _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$72, "text", _v$19, _p$._v$19));
            return _p$;
          }, {
            _v$17: undefined,
            _v$18: undefined,
            _v$19: undefined
          });
          return _el$68;
        })()
      }));
      libs.setProp(_el$47, "scroll", "y");
      libs.insert(_el$47, libs.createComponent(libs.For, {
        get each() {
          return gemPreviewItems();
        },
        children: preview => (() => {
          const _el$74 = libs.createElement("Panel", {
            "class": "BattleGemRewardItem"
          }, null);
          libs.setProp(_el$74, "style", REWARD_ITEM_STYLE);
          libs.insert(_el$74, (() => {
            const _c$ = libs.memo(() => preview.type === "perfect");
            return () => _c$() ? libs.createComponent(PerfectGemWithTooltip, {
              preview: preview
            }) : libs.createComponent(FakeGem, {
              get rarity() {
                return preview.rarity;
              },
              get count() {
                return preview.count;
              }
            });
          })());
          return _el$74;
        })()
      }));
      libs.insert(_el$48, libs.createComponent(EOM_Button.EOM_Button, {
        id: "BattleGemConfirmButton",
        get enabled() {
          return canConfirm();
        },
        get text() {
          return GetLocalization("#TaskReceive");
        },
        onactivate: onReceiveRewards
      }), null);
      libs.insert(_el$48, libs.createComponent(EOM_Button.EOM_Button, {
        id: "BattleGemResetButton",
        color: "Cancel",
        get text() {
          return GetLocalization("#ResetGemPath");
        },
        onactivate: () => setActions([])
      }), null);
      libs.effect(_p$ => {
        const _v$4 = `Language_${Language()}`,
          _v$5 = GetLocalization("#BattleGemAction"),
          _v$6 = actionSummaryText(),
          _v$7 = GetLocalization("#BattleGemSpecialStatus"),
          _v$8 = GetLocalization("#BattleGemActivatedEffects"),
          _v$9 = gridBoxStyle(),
          _v$0 = gridBoxStyle(),
          _v$1 = gridHintText(),
          _v$10 = GetLocalization("#BattleGemResourceTitle"),
          _v$11 = GetLocalization("#BattleGemRewardTitle");
        _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$5, "class", _v$4, _p$._v$4));
        _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$11, "text", _v$5, _p$._v$5));
        _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$12, "text", _v$6, _p$._v$6));
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$21, "text", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$27, "text", _v$8, _p$._v$8));
        _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$32, "style", _v$9, _p$._v$9));
        _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$33, "style", _v$0, _p$._v$0));
        _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$34, "text", _v$1, _p$._v$1));
        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$39, "text", _v$10, _p$._v$10));
        _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$45, "text", _v$11, _p$._v$11));
        return _p$;
      }, {
        _v$4: undefined,
        _v$5: undefined,
        _v$6: undefined,
        _v$7: undefined,
        _v$8: undefined,
        _v$9: undefined,
        _v$0: undefined,
        _v$1: undefined,
        _v$10: undefined,
        _v$11: undefined
      });
      return _el$;
    }
  });
};
function PerfectGemWithTooltip(props) {
  return (() => {
    const _el$75 = libs.createElement("Panel", {
      "class": "PerfectGemWithTooltip",
      hittestchildren: false
    }, null);
    libs.setProp(_el$75, "onmouseover", panel => {
      ShowCustomTooltip(panel, "server_gem", {
        id1: "",
        id2: "",
        embedded_gem_data: props.preview.embeddedGemData
      });
    });
    libs.setProp(_el$75, "onmouseout", panel => {
      HideCustomTooltip(panel, "server_gem");
    });
    libs.insert(_el$75, libs.createComponent(server_equipment.Gem, libs.mergeProps$1(() => props.preview.gem)));
    return _el$75;
  })();
}
function FakeGem(props) {
  return (() => {
    const _el$76 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FakeGem", `Rarity${props.rarity}`);
        },
        hittestchildren: false
      }, null),
      _el$77 = libs.createElement("Image", {
        "class": "FakeGemIcon",
        get src() {
          return `file://{images}/custom_game/g1_gem/gem_rarity_${props.rarity}.png`;
        }
      }, _el$76),
      _el$78 = libs.createElement("Label", {
        "class": "FakeGemCount",
        get text() {
          return String(props.count);
        }
      }, _el$76);
    libs.setProp(_el$76, "onmouseover", panel => {
      ShowCustomTooltip(panel, "text", {
        text: GetLocalization(`#gem_rarity_tip_${props.rarity}`)
      });
    });
    libs.setProp(_el$76, "onmouseout", panel => {
      HideCustomTooltip(panel, "text");
    });
    libs.effect(_p$ => {
      const _v$20 = libs.classNames("FakeGem", `Rarity${props.rarity}`),
        _v$21 = `file://{images}/custom_game/g1_gem/gem_rarity_${props.rarity}.png`,
        _v$22 = String(props.count);
      _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$76, "class", _v$20, _p$._v$20));
      _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$77, "src", _v$21, _p$._v$21));
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$78, "text", _v$22, _p$._v$22));
      return _p$;
    }, {
      _v$20: undefined,
      _v$21: undefined,
      _v$22: undefined
    });
    return _el$76;
  })();
}
function ParseBuyActionsConfig(raw) {
  if (raw === undefined) {
    return undefined;
  }
  const [actionCountText, itemCostText] = raw.split("|");
  const [itemIDText] = (itemCostText ?? "").split(":");
  const actionCount = Number(actionCountText);
  const itemID = Number(itemIDText);
  if (!Number.isFinite(actionCount) || actionCount <= 0 || !Number.isFinite(itemID) || itemID <= 0) {
    return undefined;
  }
  return {
    actionCount: Math.trunc(actionCount),
    itemID: Math.trunc(itemID)
  };
}
function ParseTowerPreview(raw) {
  if (raw === undefined || raw.preview === undefined || raw.preview === "") {
    return undefined;
  }
  const grid = SafeParseJson(raw.preview, []);
  if (grid.length <= 0) {
    return undefined;
  }
  const baseGemRewards = SafeParseJson(raw.base_gem_rewards, {});
  const resultBaseGemRewards = {};
  for (const key in baseGemRewards) {
    const rarity = toFiniteNumber(key, -1);
    if (rarity > 0) {
      resultBaseGemRewards[rarity] = Math.max(0, Math.floor(toFiniteNumber(baseGemRewards[key], 0)));
    }
  }
  const originIndex = Math.floor(grid.length / 2);
  const originColumn = Math.floor((grid[originIndex]?.length ?? 0) / 2);
  return {
    matchID: raw.match_id,
    totalActionChance: Math.max(0, Math.floor(toFiniteNumber(raw.total_action_chance, 0))),
    baseGemRewards: resultBaseGemRewards,
    grid,
    originRow: originIndex,
    originColumn
  };
}
function SimulateSettlement(preview, actions) {
  const result = {
    isValid: true,
    remainingActionChance: preview.totalActionChance,
    anyCellChance: 0,
    doubleRewardsChance: 0,
    currentPosition: {
      row: preview.originRow,
      column: preview.originColumn
    },
    visitedKeySet: {
      [BuildCellKey(preview.originRow, preview.originColumn)]: true
    },
    resources: {
      ...EMPTY_RESOURCE_STATE
    },
    gemRewards: [],
    allGemRarityUp: false,
    gemRarityUp2Triggers: 0
  };
  const gemCounts = CloneGemCounts(preview.baseGemRewards);
  const perfectGems = [];
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (result.remainingActionChance <= 0) {
      result.isValid = false;
      result.invalidReason = "action_exhausted";
      break;
    }
    if (!IsInsideBoard(preview.grid, action.row, action.column)) {
      result.isValid = false;
      result.invalidReason = "action_out_of_range";
      break;
    }
    if (!CanAffordCellAction(result, preview.grid[action.row][action.column].grid_type)) {
      result.isValid = false;
      result.invalidReason = "cost_action_not_enough";
      break;
    }
    const actionKey = BuildCellKey(action.row, action.column);
    if (result.visitedKeySet[actionKey] === true) {
      result.isValid = false;
      result.invalidReason = "action_repeated";
      break;
    }
    if (result.anyCellChance > 0) {
      result.anyCellChance -= 1;
    } else if (!IsNeighbor(result.currentPosition, action)) {
      result.isValid = false;
      result.invalidReason = "action_not_neighbor";
      break;
    }
    result.remainingActionChance -= 1;
    result.visitedKeySet[actionKey] = true;
    result.currentPosition = {
      row: action.row,
      column: action.column
    };
    let rate = 1;
    if (result.doubleRewardsChance > 0) {
      rate = 2;
      result.doubleRewardsChance -= 1;
    }
    ReceiveCellReward(preview, action.row, action.column, rate, actions.length, result, gemCounts, perfectGems);
  }
  if (result.allGemRarityUp) {
    gemCounts[6] = (gemCounts[6] ?? 0) + (gemCounts[5] ?? 0);
    gemCounts[5] = 0;
  }
  for (let i = 0; i < result.gemRarityUp2Triggers; i++) {
    if ((gemCounts[6] ?? 0) >= 4) {
      gemCounts[6] -= 4;
      gemCounts[7] = (gemCounts[7] ?? 0) + 1;
    }
  }
  result.gemRewards = BuildGemRewardList(gemCounts, perfectGems);
  return result;
}
function ReceiveCellReward(preview, row, column, rate, totalActions, result, gemCounts, perfectGems) {
  if (!IsInsideBoard(preview.grid, row, column)) {
    return;
  }
  const cell = preview.grid[row]?.[column];
  if (cell === undefined) {
    return;
  }
  switch (cell.grid_type) {
    case "cell_move_3":
      result.remainingActionChance += 3 * rate;
      result.doubleRewardsChance += 2 * rate;
      return;
    case "item_120011_70":
      result.resources.essence += 70 * rate;
      return;
    case "gem_all_lvup":
      result.allGemRarityUp = true;
      return;
    case "gain_cell_8":
      for (let nextRow = row - 1; nextRow <= row + 1; nextRow++) {
        for (let nextColumn = column - 1; nextColumn <= column + 1; nextColumn++) {
          if (nextRow === row && nextColumn === column) {
            continue;
          }
          ReceiveCellReward(preview, nextRow, nextColumn, rate, totalActions, result, gemCounts, perfectGems);
        }
      }
      return;
    case "gem_per_cell_1":
      gemCounts[6] = (gemCounts[6] ?? 0) + Math.floor(totalActions / 3) * rate;
      return;
    case "item_120014_1":
      result.resources.material += 1 * rate;
      return;
    case "gem_per_cell_2":
      gemCounts[5] = (gemCounts[5] ?? 0) + Math.floor(totalActions / 4) * rate;
      return;
    case "full_gem_1":
      if (cell.gem_detail !== undefined) {
        const embeddedGemData = BuildEmbeddedGemData(cell.gem_detail);
        const rarity = ResolvePerfectGemRarity(cell.gem_detail);
        for (let i = 0; i < rate; i++) {
          perfectGems.push({
            type: "perfect",
            detail: cell.gem_detail,
            embeddedGemData,
            rarity
          });
        }
      }
      return;
    case "gem_rarity_up":
      for (let i = 0; i < rate; i++) {
        if ((gemCounts[5] ?? 0) > 0) {
          gemCounts[5] -= 1;
          gemCounts[6] = (gemCounts[6] ?? 0) + 1;
        }
      }
      return;
    case "cell_move_2":
      result.remainingActionChance += 2 * rate;
      return;
    case "item_120011_30":
      result.resources.essence += 30 * rate;
      return;
    case "anycell":
      result.anyCellChance += 1 * rate;
      return;
    case "gem_rarity_6":
      gemCounts[6] = (gemCounts[6] ?? 0) + 1 * rate;
      return;
    case "double_cell":
      result.doubleRewardsChance += 1 * rate;
      return;
    case "item_120011_10":
      result.resources.essence += 10 * rate;
      return;
    case "cell_move_1":
      result.remainingActionChance += 1 * rate;
      return;
    case "gem_rarity_5":
      gemCounts[5] = (gemCounts[5] ?? 0) + 1 * rate;
      return;
    case "gem_rarity_7":
      gemCounts[7] = (gemCounts[7] ?? 0) + 2 * rate;
      result.resources.essence += 100 * rate;
      return;
    case "gem_per_cell_3":
      gemCounts[7] = (gemCounts[7] ?? 0) + Math.floor(totalActions / 8) * rate;
      result.resources.essence += 100 * rate;
      return;
    case "gem_rarity_up_2":
      result.gemRarityUp2Triggers += rate;
      result.resources.essence += 100 * rate;
      return;
    case "item_120016_1":
      result.resources.chaosMaterial += 1 * rate;
      result.resources.essence += 100 * rate;
      return;
    case "cost_action":
      result.remainingActionChance -= 2 * rate;
      gemCounts[7] = (gemCounts[7] ?? 0) + 2 * rate;
      result.resources.essence += 100 * rate;
      return;
    default:
      return;
  }
}
function PlayCellPickSound(gridType) {
  if (gridType === "gem_rarity_up" || gridType === "gem_rarity_up_2" || gridType === "gem_all_lvup") {
    Game.EmitSound("UI.Pick.GemUp");
    return;
  }
  if (gridType === "anycell") {
    Game.EmitSound("UI.Pick.Anycell");
    return;
  }
  if (gridType.startsWith("item_")) {
    Game.EmitSound("UI.Pick.GemItem");
    return;
  }
  if (gridType.startsWith("gem_rarity_") || gridType.startsWith("gem_per_cell_") || gridType === "full_gem_1" || gridType === "cost_action") {
    Game.EmitSound("UI.Pick.Gem");
  }
}
function BuildGemRewardList(gemCounts, perfectGems) {
  const result = [];
  const orderedRarities = Object.keys(gemCounts).map(key => toFiniteNumber(key, -1)).filter(rarity => rarity > 0).sort((a, b) => b - a);
  for (let i = 0; i < orderedRarities.length; i++) {
    const rarity = orderedRarities[i];
    const count = gemCounts[rarity] ?? 0;
    if (count > 0) {
      result.push({
        type: "quantity",
        rarity,
        count
      });
    }
  }
  for (let i = 0; i < perfectGems.length; i++) {
    result.push(perfectGems[i]);
  }
  return result;
}
function GetGridEffect(gridType) {
  if (gridType === "") {
    return undefined;
  }
  const list = Object.values(GameUI.CustomUIConfig().gem_drop_entry ?? {});
  for (let i = 0; i < list.length; i++) {
    if (list[i].effect_key === gridType) {
      return list[i];
    }
  }
  return undefined;
}
function ResolveCellRarity(gridType) {
  if (gridType === "") {
    return 0;
  }
  return GetGridEffect(gridType)?.rarity ?? 0;
}
function ResolvePerfectGemRarity(detail) {
  const gemInfo = KeyValues.gem?.[String(detail.gem_item_id)];
  return Math.max(3, toFiniteNumber(gemInfo?.rarity, 6));
}
function BuildEmbeddedGemData(detail) {
  return JSON.stringify({
    ...detail,
    main_entry_data: ParseGemEntries(detail.main_entry_data),
    adverb_entry_data: ParseGemEntries(detail.adverb_entry_data),
    ability_entry_data: ParseGemEntries(detail.ability_entry_data),
    myth_entry_data: ParseGemEntries(detail.myth_entry_data),
    chaos_entry_data: ParseGemEntries(detail.chaos_entry_data)
  });
}
function ParseGemEntries(raw) {
  return SafeParseJson(raw, []);
}
function CloneGemCounts(source) {
  const result = {};
  for (const key in source) {
    const rarity = toFiniteNumber(key, -1);
    if (rarity > 0) {
      result[rarity] = source[rarity] ?? 0;
    }
  }
  return result;
}
function GetVisitedOrder(actions, row, column) {
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].row === row && actions[i].column === column) {
      return i + 1;
    }
  }
  return 0;
}
function BuildCellKey(row, column) {
  return `${row}:${column}`;
}
function IsNeighbor(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.column - b.column) === 1;
}
function CanAffordCellAction(result, gridType) {
  if (gridType === "cost_action") {
    const rate = result.doubleRewardsChance > 0 ? 2 : 1;
    return result.remainingActionChance >= 1 + 2 * rate;
  }
  return result.remainingActionChance > 0;
}
function IsInsideBoard(grid, row, column) {
  return row >= 0 && row < grid.length && column >= 0 && column < (grid[row]?.length ?? 0);
}
function GetCellCenter(row, column) {
  return {
    x: column * GRID_CELL_SLOT_WIDTH + GRID_CELL_SLOT_WIDTH / 2,
    y: row * GRID_CELL_SLOT_HEIGHT + GRID_CELL_SLOT_HEIGHT / 2
  };
}
function SafeParseJson(raw, fallback) {
  if (raw === undefined || raw === "") {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
libs.render(() => libs.createComponent(GemSettlementHud, {}), $.GetContextPanel());