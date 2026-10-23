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

const DAMAGE_COUNTER_LOG_EVENT = "damage_counter_log";
const DAMAGE_COUNTER_LOG_LIMIT = 40;
const EMPTY_SNAPSHOT = {
  sequence: 0,
  updatedAt: 0,
  players: {}
};
const CATEGORY_META = {
  damage_type: {
    label: "伤害类型",
    icon: "◈",
    color: "#75a3ff",
    bg: "#1a2945"
  },
  damage_category: {
    label: "伤害类别",
    icon: "◎",
    color: "#7de4ff",
    bg: "#16303c"
  },
  damage_flag: {
    label: "伤害标记",
    icon: "⚑",
    color: "#f0c35b",
    bg: "#433218"
  },
  ability: {
    label: "技能来源",
    icon: "✦",
    color: "#63d587",
    bg: "#183120"
  }
};
const CATEGORY_ORDER = ["ability", "damage_type", "damage_category", "damage_flag"];
const PLAYER_ACCENT_COLORS = ["#7c5af7", "#ff6b76", "#ff9955", "#00c8f0", "#63d587", "#f0c35b"];
const LOG_CATEGORY_META = CATEGORY_META.damage_category;
const LOG_FLAG_META = CATEGORY_META.damage_flag;
const MAX_LOG_FLAG_PILLS = 3;
function formatCompact(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toFixed(0);
}
function formatFull(value) {
  const raw = Math.floor(value).toString();
  let result = "";
  let groupCount = 0;
  for (let i = raw.length - 1; i >= 0; i--) {
    result = raw[i] + result;
    groupCount += 1;
    if (groupCount === 3 && i > 0) {
      result = "," + result;
      groupCount = 0;
    }
  }
  return result;
}
function formatGameClock(gameTime) {
  const totalSeconds = Math.max(0, Math.floor(gameTime));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}
function localizeUnitName(unitName) {
  if (unitName === "") {
    return "";
  }
  const localized = GetLocalization("#" + unitName);
  if (localized === "#" + unitName) {
    return unitName;
  }
  return localized;
}
function localizeGenericKey(rawKey) {
  if (rawKey === "") {
    return "";
  }
  const localized = GetLocalization("#" + rawKey);
  if (localized === "#" + rawKey) {
    return rawKey;
  }
  return localized;
}
function getAccentColor(playerID) {
  return PLAYER_ACCENT_COLORS[playerID % PLAYER_ACCENT_COLORS.length] ?? "#75a3ff";
}
function getOwnerMeta(unitResult) {
  const playerName = Players.GetPlayerName(unitResult.playerID) || "玩家 " + String(unitResult.playerID + 1);
  const localizedOwnerName = localizeUnitName(unitResult.ownerName);
  const entityUnitName = Entities.IsValidEntity(unitResult.ownerEntityIndex) ? localizeUnitName(Entities.GetUnitName(unitResult.ownerEntityIndex) || "") : "";
  const ownerName = localizedOwnerName || entityUnitName || playerName;
  const badge = ownerName.slice(0, 1).toUpperCase() || String(unitResult.playerID + 1);
  return {
    ownerEntityIndex: unitResult.ownerEntityIndex,
    ownerName,
    badge,
    accentColor: getAccentColor(unitResult.playerID),
    playerName
  };
}
function buildCategoryView(category, categoryResult) {
  const meta = CATEGORY_META[category];
  const nodes = Object.values(categoryResult);
  let totalDamage = 0;
  let count = 0;
  for (let i = 0; i < nodes.length; i++) {
    totalDamage += nodes[i].totalDamage;
    count += nodes[i].count;
  }
  return {
    category,
    label: meta.label,
    icon: meta.icon,
    color: meta.color,
    bg: meta.bg,
    nodes,
    totalDamage,
    count
  };
}
function buildUnitView(unitResult) {
  const ownerMeta = getOwnerMeta(unitResult);
  const categoryViews = [];
  for (let i = 0; i < CATEGORY_ORDER.length; i++) {
    const category = CATEGORY_ORDER[i];
    const categoryResult = unitResult.categories[category];
    if (categoryResult === undefined) {
      continue;
    }
    categoryViews.push(buildCategoryView(category, categoryResult));
  }
  let tagCount = 0;
  const tags = Object.values(unitResult.tags);
  for (let i = 0; i < tags.length; i++) {
    tagCount += 1;
  }
  return {
    ...unitResult,
    ownerName: ownerMeta.ownerName,
    badge: ownerMeta.badge,
    accentColor: ownerMeta.accentColor,
    playerName: ownerMeta.playerName,
    categoryViews,
    tagCount
  };
}
function buildLogView(entry) {
  const accentColor = getAccentColor(entry.playerID);
  let sourceLabel = undefined;
  if (entry.abilityKey !== undefined && entry.abilityKey !== "") {
    const localizedAbility = localizeGenericKey(entry.abilityKey);
    if (localizedAbility !== "") {
      sourceLabel = localizedAbility;
    }
  }
  let categoryPill = undefined;
  if (entry.damageCategoryKey !== undefined && entry.damageCategoryKey !== "") {
    const categoryLabel = localizeGenericKey(entry.damageCategoryKey);
    if (categoryLabel !== "") {
      categoryPill = {
        label: categoryLabel,
        color: LOG_CATEGORY_META.color,
        backgroundColor: LOG_CATEGORY_META.color + "22",
        borderColor: LOG_CATEGORY_META.color
      };
    }
  }
  const flagPills = [];
  const flagKeys = entry.damageFlagKeys ?? [];
  let hiddenFlagCount = 0;
  for (let i = 0; i < flagKeys.length; i++) {
    const flagKey = flagKeys[i];
    if (flagKey === undefined || flagKey === "") {
      continue;
    }
    if (flagPills.length >= MAX_LOG_FLAG_PILLS) {
      hiddenFlagCount += 1;
      continue;
    }
    const flagLabel = localizeGenericKey(flagKey);
    if (flagLabel !== "") {
      flagPills.push({
        label: flagLabel,
        color: LOG_FLAG_META.color,
        backgroundColor: LOG_FLAG_META.color + "22",
        borderColor: LOG_FLAG_META.color
      });
    }
  }
  if (hiddenFlagCount > 0) {
    flagPills.push({
      label: "+" + hiddenFlagCount,
      color: "#d9e2ff",
      backgroundColor: "#d9e2ff18",
      borderColor: "#53627f"
    });
  }
  return {
    ...entry,
    accentColor,
    sourceLabel,
    categoryPill,
    flagPills,
    damageColor: categoryPill?.color ?? accentColor
  };
}
function LogPill(props) {
  return (() => {
    const _el$ = libs.createElement("Panel", {
        "class": "LogPill",
        get style() {
          return {
            backgroundColor: props.pill.backgroundColor,
            borderColor: props.pill.borderColor
          };
        }
      }, null),
      _el$2 = libs.createElement("Label", {
        get text() {
          return props.pill.label;
        },
        get style() {
          return {
            color: props.pill.color
          };
        }
      }, _el$);
    libs.effect(_p$ => {
      const _v$ = {
          backgroundColor: props.pill.backgroundColor,
          borderColor: props.pill.borderColor
        },
        _v$2 = props.pill.label,
        _v$3 = {
          color: props.pill.color
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "style", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$2, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$2, "style", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
function DamageLogRow(props) {
  const logView = libs.createMemo(() => buildLogView(props.entry));
  const hasSource = libs.createMemo(() => {
    const sourceLabel = logView().sourceLabel;
    return sourceLabel !== undefined && sourceLabel !== "";
  });
  const hasTagPills = libs.createMemo(() => {
    const currentLogView = logView();
    return currentLogView.categoryPill !== undefined || currentLogView.flagPills.length > 0;
  });
  const showMetaRow = libs.createMemo(() => hasSource() || hasTagPills());
  return (() => {
    const _el$3 = libs.createElement("Panel", {
        "class": "LogRow"
      }, null),
      _el$4 = libs.createElement("Panel", {
        "class": "LogHeaderRow"
      }, _el$3),
      _el$5 = libs.createElement("Label", {
        "class": "LogDamage",
        get text() {
          return "+" + formatCompact(logView().damage);
        },
        get style() {
          return {
            color: logView().damageColor
          };
        }
      }, _el$4),
      _el$6 = libs.createElement("Label", {
        "class": "LogPlayer",
        get text() {
          return logView().ownerName;
        },
        get style() {
          return {
            color: logView().accentColor
          };
        }
      }, _el$4),
      _el$7 = libs.createElement("Label", {
        "class": "LogTime",
        get text() {
          return logView().time;
        }
      }, _el$4);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return showMetaRow();
      },
      get children() {
        const _el$8 = libs.createElement("Panel", {
          "class": "LogTagRow"
        }, null);
        libs.insert(_el$8, libs.createComponent(libs.Show, {
          get when() {
            return hasSource();
          },
          get children() {
            const _el$9 = libs.createElement("Label", {
              "class": "LogSource",
              get text() {
                return logView().sourceLabel ?? "";
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$9, "text", logView().sourceLabel ?? "", _$p));
            return _el$9;
          }
        }), null);
        libs.insert(_el$8, libs.createComponent(libs.Show, {
          get when() {
            return logView().categoryPill !== undefined;
          },
          get children() {
            return libs.createComponent(LogPill, {
              get pill() {
                return logView().categoryPill;
              }
            });
          }
        }), null);
        libs.insert(_el$8, libs.createComponent(libs.For, {
          get each() {
            return logView().flagPills;
          },
          children: pill => libs.createComponent(LogPill, {
            pill: pill
          })
        }), null);
        return _el$8;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = {
          NewEntry: props.entry.isNew === true
        },
        _v$5 = "+" + formatCompact(logView().damage),
        _v$6 = {
          color: logView().damageColor
        },
        _v$7 = logView().ownerName,
        _v$8 = {
          color: logView().accentColor
        },
        _v$9 = logView().time;
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$3, "classList", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$5, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$5, "style", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$6, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$6, "style", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$7, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$3;
  })();
}
function getNodeMetric(node, mode) {
  return mode === "damage" ? node.totalDamage : node.count;
}
function sortNodesByMode(nodes, mode) {
  return [...nodes].sort((left, right) => getNodeMetric(right, mode) - getNodeMetric(left, mode));
}
function areExpandedCategoriesEqual(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (let i = 0; i < leftKeys.length; i++) {
    const key = leftKeys[i];
    if (left[key] !== right[key]) {
      return false;
    }
  }
  return true;
}
function Counter() {
  const snapshotSignal = solid_utils.createNetDataSignal("damage_counter", "snapshot", EMPTY_SNAPSHOT);
  const snapshot = libs.createMemo(() => snapshotSignal());
  let lastExpandedOwnerEntityIndex = undefined;
  const unitViews = libs.createMemo(() => {
    const players = Object.values(snapshot().players);
    const list = [];
    for (let i = 0; i < players.length; i++) {
      list.push(buildUnitView(players[i]));
    }
    list.sort((a, b) => b.totalDamage - a.totalDamage);
    return list;
  });
  const grandTotalDamage = libs.createMemo(() => {
    const units = unitViews();
    let total = 0;
    for (let i = 0; i < units.length; i++) {
      total += units[i].totalDamage;
    }
    return total;
  });
  const grandTotalCount = libs.createMemo(() => {
    const units = unitViews();
    let total = 0;
    for (let i = 0; i < units.length; i++) {
      total += units[i].count;
    }
    return total;
  });
  const [collapsed, setCollapsed] = libs.createSignal(true);
  const [viewMode, setViewMode] = libs.createSignal("overview");
  const [currentTab, setCurrentTab] = libs.createSignal("damage");
  const [currentOwnerEntityIndex, setCurrentOwnerEntityIndex] = libs.createSignal(undefined);
  const [expandedCategories, setExpandedCategories] = libs.createSignal({});
  const [logEntries, setLogEntries] = libs.createSignal([]);
  const currentUnit = libs.createMemo(() => {
    const currentOwner = currentOwnerEntityIndex();
    const units = unitViews();
    for (let i = 0; i < units.length; i++) {
      if (units[i].ownerEntityIndex === currentOwner) {
        return units[i];
      }
    }
    return units[0];
  });
  const sortedCategoryViews = libs.createMemo(() => {
    const unit = currentUnit();
    if (unit === undefined) {
      return [];
    }
    return unit.categoryViews;
  });
  const logCountLabel = libs.createMemo(() => "(" + logEntries().length + " 条)");
  const topUnit = libs.createMemo(() => unitViews()[0]);
  const snapshotStatus = libs.createMemo(() => {
    if (snapshot().sequence <= 0) {
      return "等待后端快照";
    }
    return "玩家聚合快照 · Seq " + snapshot().sequence;
  });
  libs.createEffect(() => {
    const units = unitViews();
    const currentOwner = currentOwnerEntityIndex();
    if (units.length <= 0) {
      if (viewMode() !== "overview") {
        setViewMode("overview");
      }
      if (currentOwner !== undefined) {
        setCurrentOwnerEntityIndex(undefined);
      }
      return;
    }
    let exists = false;
    for (let i = 0; i < units.length; i++) {
      if (units[i].ownerEntityIndex === currentOwner) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      setCurrentOwnerEntityIndex(units[0].ownerEntityIndex);
    }
  });
  libs.createEffect(() => {
    const unit = currentUnit();
    const categories = sortedCategoryViews();
    const currentExpanded = expandedCategories();
    const nextOwnerEntityIndex = unit?.ownerEntityIndex;
    const ownerChanged = nextOwnerEntityIndex !== lastExpandedOwnerEntityIndex;
    lastExpandedOwnerEntityIndex = nextOwnerEntityIndex;
    if (categories.length <= 0) {
      if (!areExpandedCategoriesEqual(currentExpanded, {})) {
        setExpandedCategories({});
      }
      return;
    }
    const nextExpanded = {};
    if (ownerChanged) {
      nextExpanded[String(categories[0].category)] = true;
    } else {
      for (let i = 0; i < categories.length; i++) {
        const key = String(categories[i].category);
        if (currentExpanded[key] === true) {
          nextExpanded[key] = true;
        }
      }
    }
    if (!areExpandedCategoriesEqual(currentExpanded, nextExpanded)) {
      setExpandedCategories(nextExpanded);
    }
  });
  libs.onMount(() => {
    const listener = GameEvents.Subscribe(DAMAGE_COUNTER_LOG_EVENT, eventData => {
      const payload = eventData;
      const nextEntry = {
        ...payload,
        time: formatGameClock(payload.gameTime),
        isNew: true
      };
      setLogEntries(current => {
        const next = [...current, nextEntry];
        if (next.length > DAMAGE_COUNTER_LOG_LIMIT) {
          next.splice(0, next.length - DAMAGE_COUNTER_LOG_LIMIT);
        }
        return next;
      });
      $.Schedule(2, () => {
        setLogEntries(current => {
          let changed = false;
          const next = [];
          for (let i = 0; i < current.length; i++) {
            const entry = current[i];
            if (entry.id === nextEntry.id && entry.isNew === true) {
              changed = true;
              next.push({
                ...entry,
                isNew: false
              });
            } else {
              next.push(entry);
            }
          }
          return changed ? next : current;
        });
      });
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(listener);
    });
  });
  const showOverview = () => {
    setViewMode("overview");
  };
  const showDetail = ownerEntityIndex => {
    setCurrentOwnerEntityIndex(ownerEntityIndex);
    setCurrentTab("damage");
    setViewMode("detail");
  };
  const toggleCategory = category => {
    const current = expandedCategories();
    const key = String(category);
    setExpandedCategories({
      ...current,
      [key]: current[key] !== true
    });
  };
  const clearLogs = () => {
    setLogEntries([]);
  };
  const resetCounter = () => {
    GameEvents.SendCustomEventToServer("reset_damage_counter", {});
  };
  return (() => {
    const _el$0 = libs.createElement("Panel", {
        id: "DamageCounterRoot",
        hittest: false
      }, null),
      _el$1 = libs.createElement("Panel", {
        id: "DamageCounterDock",
        hittest: false
      }, _el$0),
      _el$10 = libs.createElement("Panel", {
        id: "DamageCounterViewport",
        hittest: false
      }, _el$1),
      _el$11 = libs.createElement("Panel", {
        id: "DamageCounterPanel"
      }, _el$10),
      _el$12 = libs.createElement("Panel", {
        id: "DamageCounterHeader",
        "class": "CounterCard"
      }, _el$11),
      _el$13 = libs.createElement("Panel", {
        "class": "HeaderTitleBlock"
      }, _el$12),
      _el$14 = libs.createElement("Panel", {
        "class": "HeaderIconWrap"
      }, _el$13);
      libs.createElement("Label", {
        "class": "HeaderIcon",
        text: "⚔"
      }, _el$14);
      const _el$16 = libs.createElement("Panel", {
        "class": "HeaderTextWrap"
      }, _el$13);
      libs.createElement("Label", {
        "class": "HeaderTitle",
        text: "伤害统计面板"
      }, _el$16);
      const _el$18 = libs.createElement("Label", {
        "class": "HeaderSubtitle",
        get text() {
          return snapshotStatus();
        }
      }, _el$16),
      _el$19 = libs.createElement("Button", {
        "class": "CounterReset"
      }, _el$13);
      libs.createElement("Label", {
        text: "重置伤害统计"
      }, _el$19);
      const _el$21 = libs.createElement("Panel", {
        "class": "HeaderStatsRow"
      }, _el$12),
      _el$22 = libs.createElement("Panel", {
        id: "DamageCounterBody"
      }, _el$11),
      _el$23 = libs.createElement("Panel", {
        id: "DamageCounterSidebar",
        "class": "CounterCard"
      }, _el$22);
      libs.createElement("Label", {
        "class": "SectionEyebrow",
        text: "玩家 / 视图"
      }, _el$23);
      const _el$25 = libs.createElement("Button", {
        "class": "OverviewButton"
      }, _el$23),
      _el$26 = libs.createElement("Panel", {
        "class": "OverviewButtonIcon"
      }, _el$25);
      libs.createElement("Label", {
        text: "★"
      }, _el$26);
      const _el$28 = libs.createElement("Panel", {
        "class": "OverviewButtonText"
      }, _el$25);
      libs.createElement("Label", {
        "class": "OverviewButtonTitle",
        text: "伤害总览"
      }, _el$28);
      libs.createElement("Label", {
        "class": "OverviewButtonSubtitle",
        text: "玩家聚合快照"
      }, _el$28);
      libs.createElement("Panel", {
        "class": "SidebarDivider"
      }, _el$23);
      const _el$32 = libs.createElement("Panel", {
        "class": "SidebarScroll"
      }, _el$23),
      _el$33 = libs.createElement("Panel", {
        id: "DamageCounterContentShell",
        "class": "CounterCard"
      }, _el$22),
      _el$34 = libs.createElement("Panel", {
        id: "DamageCounterContent"
      }, _el$33),
      _el$35 = libs.createElement("Panel", {
        id: "DamageCounterLog",
        "class": "CounterCard"
      }, _el$11),
      _el$36 = libs.createElement("Panel", {
        "class": "LogHeader"
      }, _el$35),
      _el$37 = libs.createElement("Panel", {
        "class": "LogTitleWrap"
      }, _el$36);
      libs.createElement("Panel", {
        "class": "LogDot"
      }, _el$37);
      libs.createElement("Label", {
        "class": "LogTitle",
        text: "伤害日志"
      }, _el$37);
      const _el$40 = libs.createElement("Label", {
        "class": "LogCount",
        get text() {
          return logCountLabel();
        }
      }, _el$37),
      _el$41 = libs.createElement("Panel", {
        "class": "LogActions"
      }, _el$36),
      _el$42 = libs.createElement("Button", {
        "class": "LogActionButton"
      }, _el$41);
      libs.createElement("Label", {
        text: "清空"
      }, _el$42);
      const _el$44 = libs.createElement("Panel", {
        "class": "LogScroll"
      }, _el$35),
      _el$48 = libs.createElement("Button", {
        id: "DamageCounterToggle",
        "class": "DamageCounterClickTarget"
      }, _el$1),
      _el$49 = libs.createElement("Label", {
        "class": "DamageCounterToggleArrow",
        get text() {
          return collapsed() ? "◀" : "▶";
        }
      }, _el$48);
    libs.setProp(_el$19, "onactivate", resetCounter);
    libs.insert(_el$21, libs.createComponent(StatChip, {
      get value() {
        return formatCompact(grandTotalDamage());
      },
      label: "总伤害",
      accent: "Blue"
    }), null);
    libs.insert(_el$21, libs.createComponent(StatChip, {
      get value() {
        return formatFull(grandTotalCount());
      },
      label: "总次数",
      accent: "Cyan"
    }), null);
    libs.insert(_el$21, libs.createComponent(StatChip, {
      get value() {
        return formatFull(unitViews().length);
      },
      label: "玩家数",
      accent: "Gold"
    }), null);
    libs.setProp(_el$25, "onactivate", showOverview);
    libs.insert(_el$32, libs.createComponent(libs.For, {
      get each() {
        return unitViews();
      },
      children: (unit, index) => {
        const maxDamage = topUnit()?.totalDamage ?? 1;
        const share = Math.round(unit.totalDamage / Math.max(maxDamage, 1) * 100);
        return (() => {
          const _el$50 = libs.createElement("Button", {
              "class": "PlayerButton"
            }, null),
            _el$51 = libs.createElement("Panel", {
              "class": "PlayerAvatar",
              get style() {
                return {
                  backgroundColor: unit.accentColor
                };
              }
            }, _el$50),
            _el$52 = libs.createElement("Label", {
              get text() {
                return unit.badge;
              }
            }, _el$51),
            _el$53 = libs.createElement("Panel", {
              "class": "PlayerRankBadge"
            }, _el$51),
            _el$54 = libs.createElement("Label", {
              get text() {
                return String(index() + 1);
              }
            }, _el$53),
            _el$55 = libs.createElement("Panel", {
              "class": "PlayerButtonMain"
            }, _el$50),
            _el$56 = libs.createElement("Panel", {
              "class": "PlayerButtonTopRow"
            }, _el$55),
            _el$57 = libs.createElement("Label", {
              "class": "PlayerName",
              get text() {
                return unit.ownerName;
              }
            }, _el$56),
            _el$58 = libs.createElement("Label", {
              "class": "PlayerValue",
              get text() {
                return formatCompact(unit.totalDamage);
              },
              get style() {
                return {
                  color: unit.accentColor
                };
              }
            }, _el$56),
            _el$59 = libs.createElement("Label", {
              "class": "PlayerMeta",
              get text() {
                return unit.playerName + " · " + formatFull(unit.count) + " 次 / " + unit.tagCount + " 标签";
              }
            }, _el$55),
            _el$60 = libs.createElement("Panel", {
              "class": "ProgressTrack"
            }, _el$55),
            _el$61 = libs.createElement("Panel", {
              "class": "ProgressFill",
              get style() {
                return {
                  width: share + "%",
                  backgroundColor: unit.accentColor
                };
              }
            }, _el$60);
          libs.setProp(_el$50, "onactivate", () => showDetail(unit.ownerEntityIndex));
          libs.effect(_p$ => {
            const _v$13 = {
                Active: viewMode() === "detail" && currentOwnerEntityIndex() === unit.ownerEntityIndex
              },
              _v$14 = {
                backgroundColor: unit.accentColor
              },
              _v$15 = unit.badge,
              _v$16 = String(index() + 1),
              _v$17 = unit.ownerName,
              _v$18 = formatCompact(unit.totalDamage),
              _v$19 = {
                color: unit.accentColor
              },
              _v$20 = unit.playerName + " · " + formatFull(unit.count) + " 次 / " + unit.tagCount + " 标签",
              _v$21 = {
                width: share + "%",
                backgroundColor: unit.accentColor
              };
            _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$50, "classList", _v$13, _p$._v$13));
            _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$51, "style", _v$14, _p$._v$14));
            _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$52, "text", _v$15, _p$._v$15));
            _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$54, "text", _v$16, _p$._v$16));
            _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$57, "text", _v$17, _p$._v$17));
            _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$58, "text", _v$18, _p$._v$18));
            _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$58, "style", _v$19, _p$._v$19));
            _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$59, "text", _v$20, _p$._v$20));
            _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$61, "style", _v$21, _p$._v$21));
            return _p$;
          }, {
            _v$13: undefined,
            _v$14: undefined,
            _v$15: undefined,
            _v$16: undefined,
            _v$17: undefined,
            _v$18: undefined,
            _v$19: undefined,
            _v$20: undefined,
            _v$21: undefined
          });
          return _el$50;
        })();
      }
    }));
    libs.insert(_el$34, libs.createComponent(libs.Show, {
      get when() {
        return viewMode() === "overview";
      },
      get fallback() {
        return libs.createComponent(OwnerDetailView, {
          get unit() {
            return currentUnit();
          },
          get units() {
            return unitViews();
          },
          get grandTotalDamage() {
            return grandTotalDamage();
          },
          get currentTab() {
            return currentTab();
          },
          onTabChange: setCurrentTab,
          get categories() {
            return sortedCategoryViews();
          },
          get expandedCategories() {
            return expandedCategories();
          },
          onToggleCategory: toggleCategory
        });
      },
      get children() {
        return libs.createComponent(OverviewView, {
          get units() {
            return unitViews();
          },
          get grandTotalDamage() {
            return grandTotalDamage();
          },
          get grandTotalCount() {
            return grandTotalCount();
          }
        });
      }
    }));
    libs.setProp(_el$42, "onactivate", clearLogs);
    libs.insert(_el$44, libs.createComponent(libs.For, {
      get each() {
        return logEntries();
      },
      children: entry => libs.createComponent(DamageLogRow, {
        entry: entry
      })
    }), null);
    libs.insert(_el$44, libs.createComponent(libs.Show, {
      get when() {
        return logEntries().length === 0;
      },
      get children() {
        const _el$45 = libs.createElement("Panel", {
            "class": "EmptyLogState"
          }, null);
          libs.createElement("Label", {
            "class": "EmptyLogTitle",
            text: "等待伤害日志"
          }, _el$45);
          libs.createElement("Label", {
            "class": "EmptyLogDesc",
            text: "后端会通过实时事件流把最新伤害日志推送到这里。"
          }, _el$45);
        return _el$45;
      }
    }), null);
    libs.setProp(_el$48, "onactivate", () => setCollapsed(!collapsed()));
    libs.effect(_p$ => {
      const _v$0 = {
          Collapsed: collapsed()
        },
        _v$1 = snapshotStatus(),
        _v$10 = {
          Active: viewMode() === "overview"
        },
        _v$11 = logCountLabel(),
        _v$12 = collapsed() ? "◀" : "▶";
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$11, "classList", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$18, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$25, "classList", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$40, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$49, "text", _v$12, _p$._v$12));
      return _p$;
    }, {
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined
    });
    return _el$0;
  })();
}
function StatChip(props) {
  return (() => {
    const _el$62 = libs.createElement("Panel", {
        get ["class"]() {
          return "StatChip " + props.accent;
        }
      }, null),
      _el$63 = libs.createElement("Label", {
        "class": "StatChipValue",
        get text() {
          return props.value;
        }
      }, _el$62),
      _el$64 = libs.createElement("Label", {
        "class": "StatChipLabel",
        get text() {
          return props.label;
        }
      }, _el$62);
    libs.effect(_p$ => {
      const _v$22 = "StatChip " + props.accent,
        _v$23 = props.value,
        _v$24 = props.label;
      _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$62, "class", _v$22, _p$._v$22));
      _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$63, "text", _v$23, _p$._v$23));
      _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$64, "text", _v$24, _p$._v$24));
      return _p$;
    }, {
      _v$22: undefined,
      _v$23: undefined,
      _v$24: undefined
    });
    return _el$62;
  })();
}
function OverviewView(props) {
  return (() => {
    const _el$65 = libs.createElement("Panel", {
        "class": "OverviewView"
      }, null),
      _el$66 = libs.createElement("Panel", {
        "class": "OverviewSummaryRow"
      }, _el$65),
      _el$67 = libs.createElement("Panel", {
        "class": "SectionHeader"
      }, _el$65),
      _el$68 = libs.createElement("Panel", {
        "class": "SectionHeaderLeft"
      }, _el$67),
      _el$69 = libs.createElement("Panel", {
        "class": "SectionIconBox"
      }, _el$68);
      libs.createElement("Label", {
        text: "★"
      }, _el$69);
      libs.createElement("Label", {
        "class": "SectionTitle",
        text: "玩家伤害排行"
      }, _el$68);
      const _el$72 = libs.createElement("Label", {
        "class": "SectionBadge",
        get text() {
          return props.units.length + " 个玩家";
        }
      }, _el$67);
    libs.insert(_el$66, libs.createComponent(SummaryCard, {
      title: "当前伤害榜首",
      get value() {
        return props.units[0]?.ownerName ?? "-";
      },
      accent: "Gold",
      icon: "♛"
    }));
    libs.insert(_el$65, libs.createComponent(libs.Show, {
      get when() {
        return props.units.length > 0;
      },
      get fallback() {
        return (() => {
          const _el$74 = libs.createElement("Panel", {
              "class": "EmptyLogState"
            }, null);
            libs.createElement("Label", {
              "class": "EmptyLogTitle",
              text: "暂无伤害快照"
            }, _el$74);
            libs.createElement("Label", {
              "class": "EmptyLogDesc",
              text: "等待后端同步第一份玩家聚合统计。"
            }, _el$74);
          return _el$74;
        })();
      },
      get children() {
        const _el$73 = libs.createElement("Panel", {
          "class": "OverviewRankList"
        }, null);
        libs.insert(_el$73, libs.createComponent(libs.For, {
          get each() {
            return props.units;
          },
          children: (unit, index) => {
            const leaderValue = props.units[0]?.totalDamage ?? 1;
            const rankShare = Math.round(unit.totalDamage / Math.max(leaderValue, 1) * 100);
            const totalShare = (unit.totalDamage / Math.max(props.grandTotalDamage, 1) * 100).toFixed(1);
            return (() => {
              const _el$77 = libs.createElement("Panel", {
                  "class": "RankRow"
                }, null),
                _el$78 = libs.createElement("Panel", {
                  "class": "RankRowTop"
                }, _el$77),
                _el$79 = libs.createElement("Panel", {
                  "class": "RankIndex"
                }, _el$78),
                _el$80 = libs.createElement("Label", {
                  get text() {
                    return String(index() + 1);
                  }
                }, _el$79),
                _el$81 = libs.createElement("Panel", {
                  "class": "RankAvatar",
                  get style() {
                    return {
                      backgroundColor: unit.accentColor
                    };
                  }
                }, _el$78),
                _el$82 = libs.createElement("Label", {
                  get text() {
                    return unit.badge;
                  }
                }, _el$81),
                _el$83 = libs.createElement("Panel", {
                  "class": "RankInfo"
                }, _el$78),
                _el$84 = libs.createElement("Label", {
                  "class": "RankName",
                  get text() {
                    return unit.ownerName;
                  }
                }, _el$83),
                _el$85 = libs.createElement("Label", {
                  "class": "RankMeta",
                  get text() {
                    return unit.playerName + " · " + unit.categoryViews.length + " 分类 / " + unit.tagCount + " 标签 · 占比 " + totalShare + "%";
                  }
                }, _el$83),
                _el$86 = libs.createElement("Panel", {
                  "class": "RankValueWrap"
                }, _el$78),
                _el$87 = libs.createElement("Label", {
                  "class": "RankValue",
                  get text() {
                    return formatCompact(unit.totalDamage);
                  },
                  get style() {
                    return {
                      color: unit.accentColor
                    };
                  }
                }, _el$86),
                _el$88 = libs.createElement("Label", {
                  "class": "RankValueSub",
                  get text() {
                    return formatFull(unit.count) + " 次";
                  }
                }, _el$86),
                _el$89 = libs.createElement("Panel", {
                  "class": "RankRowBottom"
                }, _el$77),
                _el$90 = libs.createElement("Panel", {
                  "class": "RankBarTrack"
                }, _el$89),
                _el$91 = libs.createElement("Panel", {
                  "class": "RankBarFill",
                  get style() {
                    return {
                      width: rankShare + "%",
                      backgroundColor: unit.accentColor
                    };
                  }
                }, _el$90);
              libs.effect(_p$ => {
                const _v$25 = {
                    Gold: index() === 0,
                    Silver: index() === 1,
                    Bronze: index() === 2
                  },
                  _v$26 = String(index() + 1),
                  _v$27 = {
                    backgroundColor: unit.accentColor
                  },
                  _v$28 = unit.badge,
                  _v$29 = unit.ownerName,
                  _v$30 = unit.playerName + " · " + unit.categoryViews.length + " 分类 / " + unit.tagCount + " 标签 · 占比 " + totalShare + "%",
                  _v$31 = formatCompact(unit.totalDamage),
                  _v$32 = {
                    color: unit.accentColor
                  },
                  _v$33 = formatFull(unit.count) + " 次",
                  _v$34 = {
                    width: rankShare + "%",
                    backgroundColor: unit.accentColor
                  };
                _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$79, "classList", _v$25, _p$._v$25));
                _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$80, "text", _v$26, _p$._v$26));
                _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$81, "style", _v$27, _p$._v$27));
                _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$82, "text", _v$28, _p$._v$28));
                _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$84, "text", _v$29, _p$._v$29));
                _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$85, "text", _v$30, _p$._v$30));
                _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$87, "text", _v$31, _p$._v$31));
                _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$87, "style", _v$32, _p$._v$32));
                _v$33 !== _p$._v$33 && (_p$._v$33 = libs.setProp(_el$88, "text", _v$33, _p$._v$33));
                _v$34 !== _p$._v$34 && (_p$._v$34 = libs.setProp(_el$91, "style", _v$34, _p$._v$34));
                return _p$;
              }, {
                _v$25: undefined,
                _v$26: undefined,
                _v$27: undefined,
                _v$28: undefined,
                _v$29: undefined,
                _v$30: undefined,
                _v$31: undefined,
                _v$32: undefined,
                _v$33: undefined,
                _v$34: undefined
              });
              return _el$77;
            })();
          }
        }));
        return _el$73;
      }
    }), null);
    libs.effect(_$p => libs.setProp(_el$72, "text", props.units.length + " 个玩家", _$p));
    return _el$65;
  })();
}
function SummaryCard(props) {
  return (() => {
    const _el$92 = libs.createElement("Panel", {
        get ["class"]() {
          return "SummaryCard " + props.accent;
        }
      }, null),
      _el$93 = libs.createElement("Panel", {
        "class": "SummaryIcon"
      }, _el$92),
      _el$94 = libs.createElement("Label", {
        get text() {
          return props.icon;
        }
      }, _el$93),
      _el$95 = libs.createElement("Panel", {
        "class": "SummaryText"
      }, _el$92),
      _el$96 = libs.createElement("Label", {
        "class": "SummaryValue",
        get text() {
          return props.value;
        }
      }, _el$95),
      _el$97 = libs.createElement("Label", {
        "class": "SummaryLabel",
        get text() {
          return props.title;
        }
      }, _el$95);
    libs.effect(_p$ => {
      const _v$35 = "SummaryCard " + props.accent,
        _v$36 = props.icon,
        _v$37 = props.value,
        _v$38 = props.title;
      _v$35 !== _p$._v$35 && (_p$._v$35 = libs.setProp(_el$92, "class", _v$35, _p$._v$35));
      _v$36 !== _p$._v$36 && (_p$._v$36 = libs.setProp(_el$94, "text", _v$36, _p$._v$36));
      _v$37 !== _p$._v$37 && (_p$._v$37 = libs.setProp(_el$96, "text", _v$37, _p$._v$37));
      _v$38 !== _p$._v$38 && (_p$._v$38 = libs.setProp(_el$97, "text", _v$38, _p$._v$38));
      return _p$;
    }, {
      _v$35: undefined,
      _v$36: undefined,
      _v$37: undefined,
      _v$38: undefined
    });
    return _el$92;
  })();
}
function OwnerDetailView(props) {
  const rank = libs.createMemo(() => {
    if (props.unit === undefined) {
      return 1;
    }
    for (let i = 0; i < props.units.length; i++) {
      if (props.units[i].ownerEntityIndex === props.unit.ownerEntityIndex) {
        return i + 1;
      }
    }
    return 1;
  });
  libs.createMemo(() => {
    if (props.unit === undefined) {
      return 0;
    }
    return Math.round(props.unit.totalDamage / Math.max(props.unit.count, 1));
  });
  const totalShare = libs.createMemo(() => {
    if (props.unit === undefined) {
      return "0.0";
    }
    return (props.unit.totalDamage / Math.max(props.grandTotalDamage, 1) * 100).toFixed(1);
  });
  const categoryLeaderMetric = libs.createMemo(() => {
    let maxMetric = 1;
    for (let i = 0; i < props.categories.length; i++) {
      const categoryView = props.categories[i];
      const metric = props.currentTab === "damage" ? categoryView.totalDamage : categoryView.count;
      if (metric > maxMetric) {
        maxMetric = metric;
      }
    }
    return maxMetric;
  });
  return (() => {
    const _el$98 = libs.createElement("Panel", {
      "class": "PlayerView"
    }, null);
    libs.insert(_el$98, libs.createComponent(libs.Show, {
      get when() {
        return props.unit !== undefined;
      },
      get fallback() {
        return (() => {
          const _el$113 = libs.createElement("Panel", {
              "class": "EmptyLogState"
            }, null);
            libs.createElement("Label", {
              "class": "EmptyLogTitle",
              text: "暂无统计对象"
            }, _el$113);
            libs.createElement("Label", {
              "class": "EmptyLogDesc",
              text: "等待后端同步玩家聚合快照后再显示详情。"
            }, _el$113);
          return _el$113;
        })();
      },
      get children() {
        return [(() => {
          const _el$99 = libs.createElement("Panel", {
              "class": "DetailHeroCard"
            }, null),
            _el$100 = libs.createElement("Panel", {
              "class": "DetailHeaderRow"
            }, _el$99),
            _el$101 = libs.createElement("Panel", {
              "class": "DetailAvatar",
              get style() {
                return {
                  backgroundColor: props.unit?.accentColor
                };
              }
            }, _el$100),
            _el$102 = libs.createElement("Label", {
              get text() {
                return props.unit?.badge ?? "?";
              }
            }, _el$101),
            _el$103 = libs.createElement("Panel", {
              "class": "DetailInfoWrap"
            }, _el$100),
            _el$104 = libs.createElement("Label", {
              "class": "DetailName",
              get text() {
                return props.unit?.ownerName ?? "-";
              }
            }, _el$103),
            _el$105 = libs.createElement("Label", {
              "class": "DetailSub",
              get text() {
                return (props.unit?.playerName ?? "") + " · 总榜第 " + rank() + " · 占全场 " + totalShare() + "% 伤害";
              }
            }, _el$103),
            _el$106 = libs.createElement("Panel", {
              "class": "DetailStatsRow"
            }, _el$99);
          libs.insert(_el$106, libs.createComponent(DetailStat, {
            get value() {
              return formatCompact(props.unit?.totalDamage ?? 0);
            },
            label: "总伤害",
            accent: "Blue"
          }), null);
          libs.insert(_el$106, libs.createComponent(DetailStat, {
            get value() {
              return formatFull(props.unit?.count ?? 0);
            },
            label: "统计次数",
            accent: "Cyan"
          }), null);
          libs.effect(_p$ => {
            const _v$39 = {
                backgroundColor: props.unit?.accentColor
              },
              _v$40 = props.unit?.badge ?? "?",
              _v$41 = props.unit?.ownerName ?? "-",
              _v$42 = (props.unit?.playerName ?? "") + " · 总榜第 " + rank() + " · 占全场 " + totalShare() + "% 伤害";
            _v$39 !== _p$._v$39 && (_p$._v$39 = libs.setProp(_el$101, "style", _v$39, _p$._v$39));
            _v$40 !== _p$._v$40 && (_p$._v$40 = libs.setProp(_el$102, "text", _v$40, _p$._v$40));
            _v$41 !== _p$._v$41 && (_p$._v$41 = libs.setProp(_el$104, "text", _v$41, _p$._v$41));
            _v$42 !== _p$._v$42 && (_p$._v$42 = libs.setProp(_el$105, "text", _v$42, _p$._v$42));
            return _p$;
          }, {
            _v$39: undefined,
            _v$40: undefined,
            _v$41: undefined,
            _v$42: undefined
          });
          return _el$99;
        })(), (() => {
          const _el$107 = libs.createElement("Panel", {
              "class": "TabBar"
            }, null),
            _el$108 = libs.createElement("Button", {
              "class": "TabButton"
            }, _el$107);
            libs.createElement("Label", {
              text: "按伤害排序"
            }, _el$108);
            const _el$110 = libs.createElement("Button", {
              "class": "TabButton"
            }, _el$107);
            libs.createElement("Label", {
              text: "按次数排序"
            }, _el$110);
          libs.setProp(_el$108, "onactivate", () => props.onTabChange("damage"));
          libs.setProp(_el$110, "onactivate", () => props.onTabChange("count"));
          libs.effect(_p$ => {
            const _v$43 = {
                Active: props.currentTab === "damage"
              },
              _v$44 = {
                Active: props.currentTab === "count"
              };
            _v$43 !== _p$._v$43 && (_p$._v$43 = libs.setProp(_el$108, "classList", _v$43, _p$._v$43));
            _v$44 !== _p$._v$44 && (_p$._v$44 = libs.setProp(_el$110, "classList", _v$44, _p$._v$44));
            return _p$;
          }, {
            _v$43: undefined,
            _v$44: undefined
          });
          return _el$107;
        })(), libs.createComponent(libs.Show, {
          get when() {
            return props.categories.length > 0;
          },
          get fallback() {
            return (() => {
              const _el$116 = libs.createElement("Panel", {
                  "class": "EmptyLogState"
                }, null);
                libs.createElement("Label", {
                  "class": "EmptyLogTitle",
                  text: "当前玩家暂无分类数据"
                }, _el$116);
                libs.createElement("Label", {
                  "class": "EmptyLogDesc",
                  text: "等待更多伤害样本后，这里会显示详细标签分类。"
                }, _el$116);
              return _el$116;
            })();
          },
          get children() {
            const _el$112 = libs.createElement("Panel", {
              "class": "CategoryList"
            }, null);
            libs.insert(_el$112, libs.createComponent(libs.For, {
              get each() {
                return props.categories;
              },
              children: (categoryView, index) => {
                const expanded = libs.createMemo(() => props.expandedCategories[String(categoryView.category)] === true);
                const sortedNodes = libs.createMemo(() => sortNodesByMode(categoryView.nodes, props.currentTab));
                const currentMetric = libs.createMemo(() => props.currentTab === "damage" ? categoryView.totalDamage : categoryView.count);
                const secondaryMetric = libs.createMemo(() => props.currentTab === "damage" ? categoryView.count : categoryView.totalDamage);
                const barWidth = libs.createMemo(() => Math.round(currentMetric() / Math.max(categoryLeaderMetric(), 1) * 100));
                return (() => {
                  const _el$119 = libs.createElement("Panel", {
                      "class": "CategoryCard"
                    }, null),
                    _el$120 = libs.createElement("Button", {
                      "class": "CategoryHeader"
                    }, _el$119),
                    _el$121 = libs.createElement("Panel", {
                      "class": "CategoryHeaderTop"
                    }, _el$120),
                    _el$122 = libs.createElement("Panel", {
                      "class": "CategoryRank"
                    }, _el$121),
                    _el$123 = libs.createElement("Label", {
                      get text() {
                        return String(index() + 1);
                      }
                    }, _el$122),
                    _el$124 = libs.createElement("Panel", {
                      "class": "CategoryIcon",
                      get style() {
                        return {
                          backgroundColor: categoryView.bg
                        };
                      }
                    }, _el$121),
                    _el$125 = libs.createElement("Label", {
                      get text() {
                        return categoryView.icon;
                      },
                      get style() {
                        return {
                          color: categoryView.color
                        };
                      }
                    }, _el$124),
                    _el$126 = libs.createElement("Panel", {
                      "class": "CategoryInfo"
                    }, _el$121),
                    _el$127 = libs.createElement("Label", {
                      "class": "CategoryName",
                      get text() {
                        return categoryView.label;
                      },
                      get style() {
                        return {
                          color: categoryView.color
                        };
                      }
                    }, _el$126),
                    _el$128 = libs.createElement("Label", {
                      "class": "CategoryMeta",
                      get text() {
                        return categoryView.nodes.length + " 个标签节点";
                      }
                    }, _el$126),
                    _el$129 = libs.createElement("Panel", {
                      "class": "CategoryValueWrap"
                    }, _el$121),
                    _el$130 = libs.createElement("Label", {
                      "class": "CategoryValue",
                      get text() {
                        return libs.memo(() => props.currentTab === "damage")() ? formatCompact(currentMetric()) : formatFull(currentMetric()) + " 次";
                      },
                      get style() {
                        return {
                          color: categoryView.color
                        };
                      }
                    }, _el$129),
                    _el$131 = libs.createElement("Label", {
                      "class": "CategoryValueSub",
                      get text() {
                        return libs.memo(() => props.currentTab === "damage")() ? formatFull(secondaryMetric()) + " 次" : formatCompact(secondaryMetric());
                      }
                    }, _el$129),
                    _el$132 = libs.createElement("Label", {
                      "class": "CategoryChevron",
                      get text() {
                        return expanded() ? "▼" : "▶";
                      }
                    }, _el$121),
                    _el$133 = libs.createElement("Panel", {
                      "class": "CategoryHeaderBottom"
                    }, _el$120),
                    _el$134 = libs.createElement("Panel", {
                      "class": "CategoryProgressWrap"
                    }, _el$133),
                    _el$135 = libs.createElement("Panel", {
                      "class": "CategoryProgressTrack"
                    }, _el$134),
                    _el$136 = libs.createElement("Panel", {
                      "class": "CategoryProgressFill",
                      get style() {
                        return {
                          width: barWidth() + "%",
                          backgroundColor: categoryView.color
                        };
                      }
                    }, _el$135),
                    _el$137 = libs.createElement("Label", {
                      "class": "CategoryBarMeta",
                      get text() {
                        return props.currentTab === "damage" ? "按总伤害排序" : "按累计次数排序";
                      }
                    }, _el$133);
                  libs.setProp(_el$120, "onactivate", () => props.onToggleCategory(categoryView.category));
                  libs.insert(_el$119, libs.createComponent(libs.Show, {
                    get when() {
                      return expanded();
                    },
                    get children() {
                      const _el$138 = libs.createElement("Panel", {
                        "class": "TagList"
                      }, null);
                      libs.insert(_el$138, libs.createComponent(libs.For, {
                        get each() {
                          return sortedNodes();
                        },
                        children: (node, nodeIndex) => {
                          const nodeMetric = libs.createMemo(() => getNodeMetric(node, props.currentTab));
                          const nodeLeaderMetric = libs.createMemo(() => getNodeMetric(sortedNodes()[0] ?? node, props.currentTab));
                          const nodeSubMetric = libs.createMemo(() => props.currentTab === "damage" ? node.count : node.totalDamage);
                          const nodeBarWidth = libs.createMemo(() => Math.round(nodeMetric() / Math.max(nodeLeaderMetric(), 1) * 100));
                          return (() => {
                            const _el$139 = libs.createElement("Panel", {
                                "class": "TagRow"
                              }, null),
                              _el$140 = libs.createElement("Panel", {
                                "class": "TagRowTop"
                              }, _el$139),
                              _el$141 = libs.createElement("Panel", {
                                "class": "TagRank"
                              }, _el$140),
                              _el$142 = libs.createElement("Label", {
                                get text() {
                                  return String(nodeIndex() + 1);
                                }
                              }, _el$141),
                              _el$143 = libs.createElement("Panel", {
                                "class": "TagInfo"
                              }, _el$140),
                              _el$144 = libs.createElement("Label", {
                                "class": "TagName",
                                get text() {
                                  return node.key;
                                }
                              }, _el$143),
                              _el$145 = libs.createElement("Panel", {
                                "class": "TypePill",
                                get style() {
                                  return {
                                    backgroundColor: categoryView.color + "22",
                                    borderColor: categoryView.color
                                  };
                                }
                              }, _el$143),
                              _el$146 = libs.createElement("Label", {
                                get text() {
                                  return categoryView.label;
                                },
                                get style() {
                                  return {
                                    color: categoryView.color
                                  };
                                }
                              }, _el$145),
                              _el$147 = libs.createElement("Panel", {
                                "class": "TagValueWrap"
                              }, _el$140),
                              _el$148 = libs.createElement("Label", {
                                "class": "TagValue",
                                get text() {
                                  return libs.memo(() => props.currentTab === "damage")() ? formatCompact(nodeMetric()) : formatFull(nodeMetric()) + " 次";
                                },
                                get style() {
                                  return {
                                    color: categoryView.color
                                  };
                                }
                              }, _el$147),
                              _el$149 = libs.createElement("Label", {
                                "class": "TagValueSub",
                                get text() {
                                  return libs.memo(() => props.currentTab === "damage")() ? formatFull(nodeSubMetric()) + " 次" : formatCompact(nodeSubMetric());
                                }
                              }, _el$147),
                              _el$150 = libs.createElement("Panel", {
                                "class": "TagRowBottom"
                              }, _el$139),
                              _el$151 = libs.createElement("Panel", {
                                "class": "TagProgressWrap"
                              }, _el$150),
                              _el$152 = libs.createElement("Panel", {
                                "class": "CategoryProgressTrack"
                              }, _el$151),
                              _el$153 = libs.createElement("Panel", {
                                "class": "CategoryProgressFill",
                                get style() {
                                  return {
                                    width: nodeBarWidth() + "%",
                                    backgroundColor: categoryView.color
                                  };
                                }
                              }, _el$152);
                            libs.effect(_p$ => {
                              const _v$60 = {
                                  Gold: nodeIndex() === 0,
                                  Silver: nodeIndex() === 1,
                                  Bronze: nodeIndex() === 2
                                },
                                _v$61 = String(nodeIndex() + 1),
                                _v$62 = node.key,
                                _v$63 = {
                                  backgroundColor: categoryView.color + "22",
                                  borderColor: categoryView.color
                                },
                                _v$64 = categoryView.label,
                                _v$65 = {
                                  color: categoryView.color
                                },
                                _v$66 = libs.memo(() => props.currentTab === "damage")() ? formatCompact(nodeMetric()) : formatFull(nodeMetric()) + " 次",
                                _v$67 = {
                                  color: categoryView.color
                                },
                                _v$68 = libs.memo(() => props.currentTab === "damage")() ? formatFull(nodeSubMetric()) + " 次" : formatCompact(nodeSubMetric()),
                                _v$69 = {
                                  width: nodeBarWidth() + "%",
                                  backgroundColor: categoryView.color
                                };
                              _v$60 !== _p$._v$60 && (_p$._v$60 = libs.setProp(_el$141, "classList", _v$60, _p$._v$60));
                              _v$61 !== _p$._v$61 && (_p$._v$61 = libs.setProp(_el$142, "text", _v$61, _p$._v$61));
                              _v$62 !== _p$._v$62 && (_p$._v$62 = libs.setProp(_el$144, "text", _v$62, _p$._v$62));
                              _v$63 !== _p$._v$63 && (_p$._v$63 = libs.setProp(_el$145, "style", _v$63, _p$._v$63));
                              _v$64 !== _p$._v$64 && (_p$._v$64 = libs.setProp(_el$146, "text", _v$64, _p$._v$64));
                              _v$65 !== _p$._v$65 && (_p$._v$65 = libs.setProp(_el$146, "style", _v$65, _p$._v$65));
                              _v$66 !== _p$._v$66 && (_p$._v$66 = libs.setProp(_el$148, "text", _v$66, _p$._v$66));
                              _v$67 !== _p$._v$67 && (_p$._v$67 = libs.setProp(_el$148, "style", _v$67, _p$._v$67));
                              _v$68 !== _p$._v$68 && (_p$._v$68 = libs.setProp(_el$149, "text", _v$68, _p$._v$68));
                              _v$69 !== _p$._v$69 && (_p$._v$69 = libs.setProp(_el$153, "style", _v$69, _p$._v$69));
                              return _p$;
                            }, {
                              _v$60: undefined,
                              _v$61: undefined,
                              _v$62: undefined,
                              _v$63: undefined,
                              _v$64: undefined,
                              _v$65: undefined,
                              _v$66: undefined,
                              _v$67: undefined,
                              _v$68: undefined,
                              _v$69: undefined
                            });
                            return _el$139;
                          })();
                        }
                      }));
                      return _el$138;
                    }
                  }), null);
                  libs.effect(_p$ => {
                    const _v$45 = {
                        Expanded: expanded()
                      },
                      _v$46 = {
                        Gold: index() === 0,
                        Silver: index() === 1,
                        Bronze: index() === 2
                      },
                      _v$47 = String(index() + 1),
                      _v$48 = {
                        backgroundColor: categoryView.bg
                      },
                      _v$49 = categoryView.icon,
                      _v$50 = {
                        color: categoryView.color
                      },
                      _v$51 = categoryView.label,
                      _v$52 = {
                        color: categoryView.color
                      },
                      _v$53 = categoryView.nodes.length + " 个标签节点",
                      _v$54 = libs.memo(() => props.currentTab === "damage")() ? formatCompact(currentMetric()) : formatFull(currentMetric()) + " 次",
                      _v$55 = {
                        color: categoryView.color
                      },
                      _v$56 = libs.memo(() => props.currentTab === "damage")() ? formatFull(secondaryMetric()) + " 次" : formatCompact(secondaryMetric()),
                      _v$57 = expanded() ? "▼" : "▶",
                      _v$58 = {
                        width: barWidth() + "%",
                        backgroundColor: categoryView.color
                      },
                      _v$59 = props.currentTab === "damage" ? "按总伤害排序" : "按累计次数排序";
                    _v$45 !== _p$._v$45 && (_p$._v$45 = libs.setProp(_el$119, "classList", _v$45, _p$._v$45));
                    _v$46 !== _p$._v$46 && (_p$._v$46 = libs.setProp(_el$122, "classList", _v$46, _p$._v$46));
                    _v$47 !== _p$._v$47 && (_p$._v$47 = libs.setProp(_el$123, "text", _v$47, _p$._v$47));
                    _v$48 !== _p$._v$48 && (_p$._v$48 = libs.setProp(_el$124, "style", _v$48, _p$._v$48));
                    _v$49 !== _p$._v$49 && (_p$._v$49 = libs.setProp(_el$125, "text", _v$49, _p$._v$49));
                    _v$50 !== _p$._v$50 && (_p$._v$50 = libs.setProp(_el$125, "style", _v$50, _p$._v$50));
                    _v$51 !== _p$._v$51 && (_p$._v$51 = libs.setProp(_el$127, "text", _v$51, _p$._v$51));
                    _v$52 !== _p$._v$52 && (_p$._v$52 = libs.setProp(_el$127, "style", _v$52, _p$._v$52));
                    _v$53 !== _p$._v$53 && (_p$._v$53 = libs.setProp(_el$128, "text", _v$53, _p$._v$53));
                    _v$54 !== _p$._v$54 && (_p$._v$54 = libs.setProp(_el$130, "text", _v$54, _p$._v$54));
                    _v$55 !== _p$._v$55 && (_p$._v$55 = libs.setProp(_el$130, "style", _v$55, _p$._v$55));
                    _v$56 !== _p$._v$56 && (_p$._v$56 = libs.setProp(_el$131, "text", _v$56, _p$._v$56));
                    _v$57 !== _p$._v$57 && (_p$._v$57 = libs.setProp(_el$132, "text", _v$57, _p$._v$57));
                    _v$58 !== _p$._v$58 && (_p$._v$58 = libs.setProp(_el$136, "style", _v$58, _p$._v$58));
                    _v$59 !== _p$._v$59 && (_p$._v$59 = libs.setProp(_el$137, "text", _v$59, _p$._v$59));
                    return _p$;
                  }, {
                    _v$45: undefined,
                    _v$46: undefined,
                    _v$47: undefined,
                    _v$48: undefined,
                    _v$49: undefined,
                    _v$50: undefined,
                    _v$51: undefined,
                    _v$52: undefined,
                    _v$53: undefined,
                    _v$54: undefined,
                    _v$55: undefined,
                    _v$56: undefined,
                    _v$57: undefined,
                    _v$58: undefined,
                    _v$59: undefined
                  });
                  return _el$119;
                })();
              }
            }));
            return _el$112;
          }
        })];
      }
    }));
    return _el$98;
  })();
}
function DetailStat(props) {
  return (() => {
    const _el$154 = libs.createElement("Panel", {
        get ["class"]() {
          return "DetailStat " + props.accent;
        }
      }, null),
      _el$155 = libs.createElement("Label", {
        "class": "DetailStatValue",
        get text() {
          return props.value;
        }
      }, _el$154),
      _el$156 = libs.createElement("Label", {
        "class": "DetailStatLabel",
        get text() {
          return props.label;
        }
      }, _el$154);
    libs.effect(_p$ => {
      const _v$70 = "DetailStat " + props.accent,
        _v$71 = props.value,
        _v$72 = props.label;
      _v$70 !== _p$._v$70 && (_p$._v$70 = libs.setProp(_el$154, "class", _v$70, _p$._v$70));
      _v$71 !== _p$._v$71 && (_p$._v$71 = libs.setProp(_el$155, "text", _v$71, _p$._v$71));
      _v$72 !== _p$._v$72 && (_p$._v$72 = libs.setProp(_el$156, "text", _v$72, _p$._v$72));
      return _p$;
    }, {
      _v$70: undefined,
      _v$71: undefined,
      _v$72: undefined
    });
    return _el$154;
  })();
}
function DamageCounterHUD() {
  const [demoSetting, _setDemoSetting] = libs.createSignal(CustomNetTables.GetTableValue("common", "demo_settings"));
  libs.createEffect(() => {
    const id = CustomNetTables.SubscribeNetTableListener("common", function (_, k, v) {
      if (k === "demo_settings") {
        _setDemoSetting(v);
      }
    });
    libs.onCleanup(() => {
      CustomNetTables.UnsubscribeNetTableListener(id);
    });
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return demoSetting()?.damage_counter == 1;
    },
    get children() {
      return libs.createComponent(Counter, {});
    }
  });
}
libs.render(() => libs.createComponent(DamageCounterHUD, {}), $.GetContextPanel());