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
var StoreTagPage = require('./StoreTagPage.js');
var EOM_Loading = require('./EOM_Loading.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_HeroImage = require('./EOM_HeroImage.js');
var EOM_RedMark = require('./EOM_RedMark.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./StoreItem.js');
require('./EOM_ImageNumber.js');
require('./equipment_utils.js');

const PAGE_SIZE = 10;
const MAX_PAGE = 10;
const PAGE_BUTTON_COUNT = 10;
const DEFAULT_AVATAR_BORDER_ID$1 = "1710000";
const MIN_REQUEST_INTERVAL_MS = 30 * 1000;
const leaderboardCache = CustomUIConfig.__commonMatchLeaderboardCache ??= {};
const lastRequestTimes = {};
function getLeaderboardKey(leaderboardType, extraKey) {
  return `${leaderboardType}:${extraKey}`;
}
function getLeaderboardPageKey(leaderboardType, extraKey, page) {
  return `${getLeaderboardKey(leaderboardType, extraKey)}:page:${page}`;
}
function safeParseTeamExtraData(data) {
  if (data == undefined || data == "") {
    return {};
  }
  const result = JSON.parseSafe(data);
  if (result == undefined || typeof result != "object") {
    return {};
  }
  return result;
}
function firstFiniteNumber(defaultValue, ...values) {
  for (const value of values) {
    const result = toFiniteNumber(value, NaN);
    if (isFinite(result)) {
      return result;
    }
  }
  return defaultValue;
}
function firstText(defaultValue, ...values) {
  for (const value of values) {
    const text = toString(value);
    if (text != undefined && text != "") {
      return text;
    }
  }
  return defaultValue;
}
function normalizeRankData(data) {
  const teamExtra = safeParseTeamExtraData(data.team_extra_data);
  return {
    ...data,
    teamExtra,
    diff: firstFiniteNumber(0, teamExtra.diff),
    totalTime: firstFiniteNumber(0, teamExtra.total_time)
  };
}
function getDisplayPlayerID(data) {
  const mvpUID = firstText("", data.teamExtra.mvp_uid);
  if (mvpUID != "" && data.player_extra_data?.[mvpUID] != undefined) {
    return mvpUID;
  }
  const playerID = Object.keys(data.player_extra_data ?? {})[0];
  return firstText("", playerID);
}
function getPlayerIDs(data) {
  return Object.keys(data.player_extra_data ?? {});
}
function getPlayerExtraData(data, playerID = getDisplayPlayerID(data)) {
  return data.player_extra_data?.[playerID]?.extra_data;
}
function getPlayerHeroID(data, playerID) {
  return firstFiniteNumber(0, data.teamExtra.player_data?.[playerID]?.hero_id);
}
function getAvatarBorder$1(extraData) {
  const border = extraData?.border;
  if (border == undefined || border == "" || border == "0") {
    return DEFAULT_AVATAR_BORDER_ID$1;
  }
  return border;
}
function formatClearTime(totalTime) {
  const totalSeconds = Math.max(0, Math.floor(totalTime));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function openPlayerInfo(rankData, playerID, self = false) {
  const playerExtraData = getPlayerExtraData(rankData, playerID);
  if (playerID == "" || playerExtraData?.invalid_name == "1" || playerExtraData?.is_robot == "1") {
    return;
  }
  const localAccountID = Steam_64_3(Game.GetLocalPlayerInfo().player_steamid);
  const steamID = self && (getPlayerIDs(rankData).length == 1 || playerID == localAccountID) ? localAccountID : playerID;
  JumpToMenu({
    window_name: "book",
    menu: "PlayerInfo_Menu",
    force: true,
    data: {
      steamID
    }
  });
}
function CommonMatchLeaderboard(props) {
  const [page, setPage] = libs.createSignal(1);
  const [loading, setLoading] = libs.createSignal(false);
  const [rankDataCache, setRankDataCache] = libs.createSignal({});
  const getCachedRankData = leaderboardPageKey => rankDataCache()[leaderboardPageKey] ?? leaderboardCache[leaderboardPageKey]?.data;
  const currentLeaderboardPageKey = libs.createMemo(() => getLeaderboardPageKey(props.leaderboardType, props.extraKey, page()));
  const currentRankData = libs.createMemo(() => getCachedRankData(currentLeaderboardPageKey()));
  const firstPageRankData = libs.createMemo(() => {
    const firstPageKey = getLeaderboardPageKey(props.leaderboardType, props.extraKey, 1);
    return getCachedRankData(firstPageKey);
  });
  const displayLeaderboard = libs.createMemo(() => (currentRankData()?.leaderboard ?? []).map(normalizeRankData));
  const topRanks = libs.createMemo(() => (firstPageRankData()?.leaderboard ?? []).map(normalizeRankData).filter(data => data.rank > 0 && data.rank <= 3));
  const listRanks = libs.createMemo(() => {
    const minRank = (page() - 1) * PAGE_SIZE + 1;
    const maxRank = page() * PAGE_SIZE;
    return displayLeaderboard().filter(data => data.rank >= minRank && data.rank <= maxRank);
  });
  const displaySelfRank = libs.createMemo(() => {
    const data = firstPageRankData()?.selfRank;
    return data == undefined ? undefined : normalizeRankData(data);
  });
  let disposed = false;
  let pendingRequestTimer;
  const cancelPendingRequest = () => {
    if (pendingRequestTimer == undefined) return;
    clearTimeout(pendingRequestTimer);
    pendingRequestTimer = undefined;
  };
  const requestRankData = (leaderboardType, extraKey, requestedPage) => {
    const leaderboardPageKey = getLeaderboardPageKey(leaderboardType, extraKey, requestedPage);
    const cached = getCachedRankData(leaderboardPageKey);
    const requestTime = Date.now();
    lastRequestTimes[leaderboardPageKey] = requestTime;
    setLoading(cached == undefined);
    CallActionRequest("/v1/leaderboard/fetch", {
      leaderboard_type: leaderboardType,
      extra_keys: [extraKey],
      start: (requestedPage - 1) * PAGE_SIZE + 1,
      end: requestedPage * PAGE_SIZE
    }, result => {
      const isLatestPageRequest = lastRequestTimes[leaderboardPageKey] == requestTime;
      if (result?.code == 0) {
        const leaderboardDatas = result.data?.leaderboard_datas ?? [];
        const data = leaderboardDatas.find(data => data.leaderboard_data?.length > 0) ?? leaderboardDatas[0];
        const selfData = leaderboardDatas.find(data => data.self_data != undefined)?.self_data;
        const cacheData = {
          leaderboard: data?.leaderboard_data ?? [],
          selfRank: selfData
        };
        if (isLatestPageRequest) {
          leaderboardCache[leaderboardPageKey] = {
            data: cacheData,
            updatedAt: Date.now() / 1000
          };
          if (!disposed) {
            setRankDataCache(cache => ({
              ...cache,
              [leaderboardPageKey]: cacheData
            }));
          }
        }
        const isCurrentPage = !disposed && props.visible && currentLeaderboardPageKey() == leaderboardPageKey;
        if (!isLatestPageRequest || !isCurrentPage) return;
        setLoading(false);
        return;
      }
      if (!isLatestPageRequest || disposed || !props.visible || currentLeaderboardPageKey() != leaderboardPageKey) return;
      setLoading(false);
    });
  };
  const scheduleRankDataRequest = (leaderboardType, extraKey, requestedPage) => {
    cancelPendingRequest();
    const leaderboardPageKey = getLeaderboardPageKey(leaderboardType, extraKey, requestedPage);
    const cached = getCachedRankData(leaderboardPageKey);
    const lastRequestTime = lastRequestTimes[leaderboardPageKey] ?? (leaderboardCache[leaderboardPageKey]?.updatedAt ?? 0) * 1000;
    const delay = Math.max(0, lastRequestTime + MIN_REQUEST_INTERVAL_MS - Date.now());
    if (delay == 0) {
      requestRankData(leaderboardType, extraKey, requestedPage);
      return;
    }
    setLoading(cached == undefined);
    pendingRequestTimer = setTimeout(() => {
      pendingRequestTimer = undefined;
      if (!props.visible || props.leaderboardType != leaderboardType || props.extraKey != extraKey || page() != requestedPage) return;
      requestRankData(leaderboardType, extraKey, requestedPage);
    }, delay);
  };
  let selectedLeaderboard = "";
  libs.createEffect(libs.on([() => props.visible, page, () => props.leaderboardType, () => props.extraKey], ([visible, currentPage, leaderboardType, extraKey]) => {
    cancelPendingRequest();
    setLoading(false);
    const nextLeaderboard = getLeaderboardKey(leaderboardType, extraKey);
    if (selectedLeaderboard != nextLeaderboard) {
      selectedLeaderboard = nextLeaderboard;
      if (currentPage != 1) {
        setPage(1);
        return;
      }
    }
    selectedLeaderboard = nextLeaderboard;
    if (visible && extraKey != "") {
      scheduleRankDataRequest(leaderboardType, extraKey, currentPage);
    }
  }));
  libs.onCleanup(() => {
    disposed = true;
    cancelPendingRequest();
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "CommonMatchLeaderboard",
    shadow_border: true,
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            id: "RankPanel"
          }, null),
          _el$2 = libs.createElement("Panel", {
            id: "RankTable"
          }, _el$),
          _el$3 = libs.createElement("Panel", {
            id: "RankHeader"
          }, _el$2),
          _el$4 = libs.createElement("Label", {
            "class": "RankCol RankNumber",
            get text() {
              return GetLocalization("#Rank_Rank");
            }
          }, _el$3),
          _el$5 = libs.createElement("Label", {
            "class": "RankCol RankPlayer",
            get text() {
              return GetLocalization("#Rank_Player");
            }
          }, _el$3),
          _el$6 = libs.createElement("Label", {
            "class": "RankCol UseHero",
            get text() {
              return GetLocalization("#Rank_Hero");
            }
          }, _el$3),
          _el$7 = libs.createElement("Label", {
            "class": "RankCol RankGroup",
            get text() {
              return GetLocalization("#Rank_Difficulty");
            }
          }, _el$3),
          _el$8 = libs.createElement("Label", {
            "class": "RankCol RankScore",
            get text() {
              return GetLocalization("#Rank_ClearTime");
            }
          }, _el$3),
          _el$9 = libs.createElement("Panel", {
            "class": "RankListVerticalScroll"
          }, _el$2),
          _el$0 = libs.createElement("Panel", {
            id: "RankList",
            flowChildren: "down",
            scroll: "y"
          }, _el$9);
        libs.insert(_el$, libs.createComponent(TopRankList, {
          get ranks() {
            return topRanks();
          }
        }), _el$2);
        libs.setProp(_el$0, "flowChildren", "down");
        libs.setProp(_el$0, "scroll", "y");
        libs.insert(_el$0, libs.createComponent(EmptyRankList, {
          get visible() {
            return listRanks().length == 0;
          }
        }), null);
        libs.insert(_el$0, libs.createComponent(libs.For, {
          get each() {
            return listRanks();
          },
          children: rank => libs.createComponent(RankRow, {
            rankData: rank
          })
        }), null);
        libs.insert(_el$2, libs.createComponent(libs.Show, {
          get when() {
            return displaySelfRank();
          },
          keyed: true,
          children: rankData => libs.createComponent(RankRow, {
            rankData: rankData,
            self: true
          })
        }), null);
        libs.insert(_el$, libs.createComponent(PageControl, {
          get page() {
            return page();
          },
          setPage: setPage
        }), null);
        libs.effect(_p$ => {
          const _v$ = GetLocalization("#Rank_Rank"),
            _v$2 = GetLocalization("#Rank_Player"),
            _v$3 = GetLocalization("#Rank_Hero"),
            _v$4 = GetLocalization("#Rank_Difficulty"),
            _v$5 = GetLocalization("#Rank_ClearTime"),
            _v$6 = libs.classNames("VerticalScrollStyle", {
              Show: !loading()
            });
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$4, "text", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "text", _v$5, _p$._v$5));
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$0, "className", _v$6, _p$._v$6));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined,
          _v$6: undefined
        });
        return _el$;
      })(), libs.memo(() => libs.memo(() => !!loading())() && libs.createComponent(EOM_Loading.EOM_Loading, {
        align: "center center",
        type: "PointSpin"
      }))];
    }
  });
}
function TopRankList(props) {
  const rankData = rank => props.ranks?.find(data => data.rank == rank);
  return (() => {
    const _el$1 = libs.createElement("Panel", {
      id: "TopRankList"
    }, null);
    libs.insert(_el$1, libs.createComponent(TopRankCard, {
      rank: 2,
      get rankData() {
        return rankData(2);
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(TopRankCard, {
      rank: 1,
      get rankData() {
        return rankData(1);
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(TopRankCard, {
      rank: 3,
      get rankData() {
        return rankData(3);
      }
    }), null);
    return _el$1;
  })();
}
function TopRankCard(props) {
  const playerIDs = libs.createMemo(() => props.rankData == undefined ? [] : getPlayerIDs(props.rankData));
  const isMultiple = libs.createMemo(() => playerIDs().length > 1);
  const playerID = () => firstText("", playerIDs()[0]);
  const nameExtraData = () => props.rankData != undefined ? getPlayerExtraData(props.rankData, playerID()) : undefined;
  const title = () => firstText("", nameExtraData()?.title);
  const invalidName = () => nameExtraData()?.invalid_name == "1";
  const playerName = () => {
    if (props.rankData == undefined) {
      return libs.createElement("Label", {
        "class": "TopRankName",
        text: "-"
      }, null);
    }
    if (invalidName()) {
      return (() => {
        const _el$11 = libs.createElement("Label", {
          "class": "TopRankName",
          get text() {
            return GetLocalization("#Rank_AnonymousPlayer");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$11, "text", GetLocalization("#Rank_AnonymousPlayer"), _$p));
        return _el$11;
      })();
    }
    return libs.createComponent(Player.PlayerName, {
      "class": "TopRankName",
      get accountid() {
        return playerID();
      }
    });
  };
  return (() => {
    const _el$12 = libs.createElement("Panel", {}, null),
      _el$13 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("TitleContainer");
        }
      }, _el$12),
      _el$14 = libs.createElement("Panel", {
        "class": "AvatarItemContainer"
      }, _el$12),
      _el$15 = libs.createElement("Panel", {
        "class": "TopRankNameContainer"
      }, _el$12);
      libs.createElement("Panel", {
        "class": "RankBG"
      }, _el$12);
    libs.insert(_el$13, (() => {
      const _c$ = libs.memo(() => title() == "");
      return () => _c$() ? undefined : libs.createComponent(Player.PlayerTitle, {
        "class": "Preview_AVATAR_NAME",
        get titleid() {
          return title();
        }
      });
    })());
    libs.insert(_el$14, libs.createComponent(libs.For, {
      get each() {
        return playerIDs();
      },
      children: playerID => (() => {
        const _el$17 = libs.createElement("Panel", {
          "class": "TopRankAvatarRoot"
        }, null);
        libs.insert(_el$17, libs.createComponent(LeaderboardAvatar, {
          get rankData() {
            return props.rankData;
          },
          playerID: playerID,
          "class": "TopRankAvatar",
          onactivate: () => openPlayerInfo(props.rankData, playerID)
        }));
        return _el$17;
      })()
    }));
    libs.insert(_el$15, libs.createComponent(libs.Show, {
      get when() {
        return props.rankData != undefined;
      },
      get fallback() {
        return libs.createElement("Label", {
          "class": "EmptyRankName",
          text: "#EmptyRankName"
        }, null);
      },
      get children() {
        return playerName();
      }
    }));
    libs.effect(_p$ => {
      const _v$7 = libs.classNames("TopRankCard", "Rank" + props.rank, `PlayerCount${playerIDs().length}`, {
          Multiple: isMultiple()
        }),
        _v$8 = libs.classNames("TitleContainer");
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$12, "className", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$13, "class", _v$8, _p$._v$8));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined
    });
    return _el$12;
  })();
}
function LeaderboardAvatar(props) {
  const extraData = () => getPlayerExtraData(props.rankData, props.playerID);
  const localAccountID = libs.createMemo(() => Steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
  const accountID = libs.createMemo(() => {
    const isSelfPlayer = props.self && (getPlayerIDs(props.rankData).length == 1 || props.playerID == localAccountID());
    if (isSelfPlayer) {
      return localAccountID();
    }
    if (extraData()?.invalid_avatar == "1" || props.playerID == "") {
      return "0";
    }
    return props.playerID;
  });
  const playerInfoTooltip = libs.createMemo(() => {
    if (accountID() == "0" || extraData()?.invalid_name == "1") {
      return undefined;
    }
    return {
      name: "player_info",
      steam_id: accountID()
    };
  });
  return libs.createComponent(Player.AvatarBorder, {
    get ["class"]() {
      return props.class;
    },
    get borderid() {
      return getAvatarBorder$1(extraData());
    },
    get children() {
      return [libs.createComponent(Player.EOM_Avatar, {
        id: "Avatar",
        get accountid() {
          return accountID();
        }
      }), (() => {
        const _el$19 = libs.createElement("Panel", {
          "class": "TipsArea",
          width: "100%",
          height: "100%",
          get onactivate() {
            return props.onactivate;
          }
        }, null);
        libs.setProp(_el$19, "width", "100%");
        libs.setProp(_el$19, "height", "100%");
        libs.effect(_p$ => {
          const _v$9 = playerInfoTooltip(),
            _v$0 = props.onactivate;
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$19, "customTooltip", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$19, "onactivate", _v$0, _p$._v$0));
          return _p$;
        }, {
          _v$9: undefined,
          _v$0: undefined
        });
        return _el$19;
      })()];
    }
  });
}
function RankRow(props) {
  const rankData = () => props.rankData;
  const playerIDs = libs.createMemo(() => getPlayerIDs(rankData()));
  const isMultiple = libs.createMemo(() => playerIDs().length > 1);
  const playerID = () => firstText("", playerIDs()[0]);
  const extraData = () => getPlayerExtraData(rankData(), playerID());
  const invalidName = () => extraData()?.invalid_name == "1";
  const hasRank = () => rankData().rank > 0 && playerIDs().length > 0;
  const localAccountID = libs.createMemo(() => Steam_64_3(Game.GetLocalPlayerInfo().player_steamid));
  const nameAccountID = libs.createMemo(() => props.self && (playerIDs().length == 1 || playerID() == localAccountID()) ? localAccountID() : playerID());
  const playerName = () => {
    if (nameAccountID() == "") {
      return libs.createElement("Label", {
        "class": "RankPlayerName",
        text: "-"
      }, null);
    }
    if (invalidName()) {
      return (() => {
        const _el$21 = libs.createElement("Label", {
          "class": "RankPlayerName",
          get text() {
            return GetLocalization("#Rank_AnonymousPlayer");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$21, "text", GetLocalization("#Rank_AnonymousPlayer"), _$p));
        return _el$21;
      })();
    }
    return libs.createComponent(Player.PlayerName, {
      "class": "RankPlayerName",
      get accountid() {
        return nameAccountID();
      }
    });
  };
  return (() => {
    const _el$22 = libs.createElement("Panel", {}, null),
      _el$23 = libs.createElement("Panel", {
        "class": "RankCol RankNumber"
      }, _el$22),
      _el$24 = libs.createElement("Panel", {
        id: "RankIcon"
      }, _el$23),
      _el$25 = libs.createElement("Panel", {
        "class": "RankCol RankPlayer"
      }, _el$22),
      _el$26 = libs.createElement("Panel", {
        "class": "RankAvatarList"
      }, _el$25),
      _el$27 = libs.createElement("Panel", {
        "class": "RankCol UseHero"
      }, _el$22),
      _el$28 = libs.createElement("Panel", {
        "class": "RankHeroList"
      }, _el$27),
      _el$29 = libs.createElement("Panel", {
        "class": "RankCol RankGroup"
      }, _el$22),
      _el$30 = libs.createElement("Label", {
        get text() {
          return libs.memo(() => rankData().diff > 0)() ? GetLocalization("DiffSelection_DiffName" + rankData().diff) : "-";
        }
      }, _el$29),
      _el$31 = libs.createElement("Panel", {
        "class": "RankCol RankScore"
      }, _el$22),
      _el$32 = libs.createElement("Label", {
        get text() {
          return formatClearTime(rankData().totalTime);
        }
      }, _el$31);
    libs.insert(_el$24, (() => {
      const _c$2 = libs.memo(() => !!(rankData().rank >= 1 && rankData().rank <= 3));
      return () => _c$2() ? undefined : (() => {
        const _el$33 = libs.createElement("Label", {
          get text() {
            return libs.memo(() => !!hasRank())() ? rankData().rank : "-";
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$33, "text", libs.memo(() => !!hasRank())() ? rankData().rank : "-", _$p));
        return _el$33;
      })();
    })());
    libs.insert(_el$26, libs.createComponent(libs.For, {
      get each() {
        return playerIDs();
      },
      children: playerID => (() => {
        const _el$34 = libs.createElement("Panel", {
          "class": "AvatarRoot"
        }, null);
        libs.insert(_el$34, libs.createComponent(LeaderboardAvatar, {
          get rankData() {
            return rankData();
          },
          playerID: playerID,
          "class": "RankAvatar",
          get self() {
            return props.self;
          },
          onactivate: () => openPlayerInfo(rankData(), playerID, props.self)
        }));
        return _el$34;
      })()
    }));
    libs.insert(_el$25, playerName, null);
    libs.insert(_el$28, libs.createComponent(libs.For, {
      get each() {
        return playerIDs().filter(playerID => getPlayerHeroID(rankData(), playerID) > 0);
      },
      children: playerID => (() => {
        const _el$35 = libs.createElement("Image", {
          "class": "RankHeroImage",
          get src() {
            return `s2r://panorama/images/heroes/icons/${GetHeroNameByHeroID(getPlayerHeroID(rankData(), playerID))}_png.vtex`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$35, "src", `s2r://panorama/images/heroes/icons/${GetHeroNameByHeroID(getPlayerHeroID(rankData(), playerID))}_png.vtex`, _$p));
        return _el$35;
      })()
    }));
    libs.effect(_p$ => {
      const _v$1 = libs.classNames("RankRow", "Rank" + rankData().rank, `PlayerCount${playerIDs().length}`, {
          Self: props.self,
          Multiple: isMultiple()
        }),
        _v$10 = libs.memo(() => rankData().diff > 0)() ? GetLocalization("DiffSelection_DiffName" + rankData().diff) : "-",
        _v$11 = formatClearTime(rankData().totalTime);
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$22, "className", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$30, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$32, "text", _v$11, _p$._v$11));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined
    });
    return _el$22;
  })();
}
function EmptyRankList(props) {
  return (() => {
    const _el$36 = libs.createElement("Panel", {
        id: "EmptyRankList"
      }, null),
      _el$37 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#Rank_Empty");
        }
      }, _el$36);
    libs.effect(_p$ => {
      const _v$12 = props.visible,
        _v$13 = GetLocalization("#Rank_Empty");
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$36, "visible", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$37, "text", _v$13, _p$._v$13));
      return _p$;
    }, {
      _v$12: undefined,
      _v$13: undefined
    });
    return _el$36;
  })();
}
function PageControl(props) {
  const pageCount = () => props.pageCount ?? MAX_PAGE;
  const pages = libs.createMemo(() => {
    const start = Math.floor((props.page - 1) / PAGE_BUTTON_COUNT) * PAGE_BUTTON_COUNT + 1;
    const end = Math.min(start + PAGE_BUTTON_COUNT - 1, pageCount());
    return Array.from({
      length: end - start + 1
    }, (_, index) => start + index);
  });
  return (() => {
    const _el$38 = libs.createElement("Panel", {
        id: "RankPageControl"
      }, null),
      _el$39 = libs.createElement("Panel", {
        "class": "PageContainer"
      }, _el$38);
    libs.insert(_el$38, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get enabled() {
        return props.page > 1;
      },
      onactivate: () => props.setPage(props.page - 1),
      className: "PageLeft"
    }), _el$39);
    libs.insert(_el$39, libs.createComponent(libs.For, {
      get each() {
        return pages();
      },
      children: page => libs.createComponent(EOM_Button.EOM_BaseButton, {
        onactivate: () => props.setPage(page),
        get className() {
          return libs.classNames("PageButton", {
            Selected: props.page == page
          });
        },
        get children() {
          const _el$40 = libs.createElement("Label", {
            text: page
          }, null);
          libs.setProp(_el$40, "text", page);
          return _el$40;
        }
      })
    }));
    libs.insert(_el$38, libs.createComponent(EOM_Button.EOM_BaseButton, {
      get enabled() {
        return props.page < pageCount();
      },
      onactivate: () => props.setPage(props.page + 1),
      className: "PageRight"
    }), null);
    return _el$38;
  })();
}

const PVP_AUTO_REQUEST_INTERVAL = 5 * 60;
const DEFAULT_PVP_SCORE = 1000;
const DEFAULT_AVATAR_BORDER_ID = "1710000";
const DAILY_PVP_BATTLE_COUNT = 5;
const LEADERBOARD_PAGE_SIZE = 10;
const LEADERBOARD_MAX_PAGE = 50;
const LEADERBOARD_MIN_REQUEST_INTERVAL_MS = 30 * 1000;
let lastPvpRequestTime = 0;
const pvpLeaderboardCache = CustomUIConfig.__pvpLeaderboardCache ??= {};
const pvpLeaderboardLastRequestTimes = {};
const [pvpLeaderboardCacheVersion, setPvpLeaderboardCacheVersion] = libs.createSignal(0);
function getPvpLeaderboardPageKey(seasonID, page) {
  return `${seasonID}:${page}`;
}
function getAvatarBorder(extraData) {
  const border = extraData?.border;
  if (border == undefined || border == "" || border == "0") {
    return DEFAULT_AVATAR_BORDER_ID;
  }
  return border;
}
function normalizeLadderRank(data, defaultScore = DEFAULT_PVP_SCORE, defaultPvpPower = 0) {
  const extraData = JSON.parseSafe(data.team_extra_data);
  const playerExtraData = data.player_extra_data?.[data.team_id]?.extra_data;
  const pvpPower = Number(playerExtraData?.pvp_power);
  return {
    accountID: data.team_id,
    rank: data.rank,
    score: toFiniteNumber(extraData?.score, defaultScore),
    pvpPower: Number.isFinite(pvpPower) ? pvpPower : defaultPvpPower,
    borderID: getAvatarBorder(playerExtraData)
  };
}
function LadderButton(props) {
  const [local, others] = libs.splitProps(props, ["class", "children"]);
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1(others, {
    get ["class"]() {
      return libs.classNames("LadderButton", local.class);
    },
    get children() {
      return [libs.createElement("Image", {
        "class": "LadderButtonIcon"
      }, null), (() => {
        const _el$2 = libs.createElement("Panel", {
            "class": "LadderButtonContent"
          }, null),
          _el$3 = libs.createElement("Label", {
            "class": "LadderButtonLabel",
            get text() {
              return props.labelText ?? "";
            }
          }, _el$2);
        libs.effect(_$p => libs.setProp(_el$3, "text", props.labelText ?? "", _$p));
        return _el$2;
      })(), libs.memo(() => local.children)];
    }
  }));
}
function PlayerAvatar(props) {
  const accountID = () => props.accountID ?? "0";
  return (() => {
    const _el$4 = libs.createElement("Panel", {
      "class": "PlayerAvatar"
    }, null);
    libs.insert(_el$4, libs.createComponent(Player.AvatarBorder, {
      get borderid() {
        return props.borderID ?? DEFAULT_AVATAR_BORDER_ID;
      },
      get children() {
        return [libs.createComponent(Player.EOM_Avatar, {
          "class": "Avatar",
          get accountid() {
            return accountID();
          }
        }), (() => {
          const _el$5 = libs.createElement("Panel", {
            "class": "TipsArea"
          }, null);
          libs.effect(_$p => libs.setProp(_el$5, "customTooltip", accountID() === "0" ? undefined : {
            name: "player_info",
            steam_id: accountID()
          }, _$p));
          return _el$5;
        })()];
      }
    }));
    return _el$4;
  })();
}
function LadderChartScore(props) {
  return (() => {
    const _el$6 = libs.createElement("Panel", {
        "class": "LadderChartScore"
      }, null);
      libs.createElement("Image", {
        "class": "ChartScoreBadge"
      }, _el$6);
      const _el$8 = libs.createElement("Label", {
        "class": "ChartScoreValue",
        get text() {
          return `${props.score ?? 0}`;
        }
      }, _el$6);
    libs.effect(_$p => libs.setProp(_el$8, "text", `${props.score ?? 0}`, _$p));
    return _el$6;
  })();
}
function LadderLobbyBigChartItem(props) {
  const [local, others] = libs.splitProps(props, ["class", "rankData"]);
  return (() => {
    const _el$9 = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("LadderLobbyBigChartItem", local.class);
        }
      }), null);
      libs.createElement("Image", {
        "class": "LadderLobbyBigChartItemBG"
      }, _el$9);
      const _el$1 = libs.createElement("Panel", {
        "class": "LadderLobbyBigChartItemContent"
      }, _el$9),
      _el$10 = libs.createElement("Panel", {
        "class": "ChartPlayerName"
      }, _el$1);
      libs.createElement("Image", {
        "class": "ChartPlayerNameBG"
      }, _el$10);
      const _el$12 = libs.createElement("Panel", {
        "class": "LadderLobbyBigChartScoreContent"
      }, _el$1);
      libs.createElement("Image", {
        "class": "LadderLobbyBigChartScoreBG"
      }, _el$12);
    libs.spread(_el$9, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("LadderLobbyBigChartItem", local.class);
      }
    }), true);
    libs.insert(_el$1, libs.createComponent(PlayerAvatar, {
      get accountID() {
        return local.rankData?.accountID;
      },
      get borderID() {
        return local.rankData?.borderID;
      }
    }), _el$10);
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return local.rankData !== undefined;
      },
      get fallback() {
        return libs.createElement("Label", {
          text: "-"
        }, null);
      },
      get children() {
        return libs.createComponent(Player.PlayerName, {
          get accountid() {
            return local.rankData?.accountID;
          }
        });
      }
    }), null);
    libs.insert(_el$12, libs.createComponent(LadderChartScore, {
      get score() {
        return local.rankData?.score;
      }
    }), null);
    return _el$9;
  })();
}
function LadderChartRowHeader() {
  return (() => {
    const _el$15 = libs.createElement("Panel", {
        id: "LadderChartRowHeader"
      }, null),
      _el$16 = libs.createElement("Panel", {
        "class": "LadderChartHeaderCol LadderNumber"
      }, _el$15),
      _el$17 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#LadderChart_LadderNumber");
        }
      }, _el$16),
      _el$18 = libs.createElement("Panel", {
        "class": "LadderChartHeaderCol PlayerInfo"
      }, _el$15),
      _el$19 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#LadderChart_LadderPlayer");
        }
      }, _el$18),
      _el$20 = libs.createElement("Panel", {
        "class": "LadderChartHeaderCol LadderGroup"
      }, _el$15),
      _el$21 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#LadderChart_LadderPower");
        }
      }, _el$20),
      _el$22 = libs.createElement("Panel", {
        "class": "LadderChartHeaderCol LadderScore"
      }, _el$15),
      _el$23 = libs.createElement("Label", {
        get text() {
          return GetLocalization("#LadderChart_LadderScore");
        }
      }, _el$22);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#LadderChart_LadderNumber"),
        _v$2 = GetLocalization("#LadderChart_LadderPlayer"),
        _v$3 = GetLocalization("#LadderChart_LadderPower"),
        _v$4 = GetLocalization(`#Ladder_Tips2`),
        _v$5 = GetLocalization("#LadderChart_LadderScore"),
        _v$6 = GetLocalization(`#Ladder_Tips3`);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$17, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$19, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$21, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$21, "tooltip_text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$23, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$23, "tooltip_text", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$15;
  })();
}
function LadderChartRow(props) {
  const rank = () => props.rankData?.rank ?? 0;
  const hasRank = () => rank() > 0;
  const isTopRank = () => rank() >= 1 && rank() <= 3;
  const accountID = () => props.rankData?.accountID ?? "0";
  return (() => {
    const _el$24 = libs.createElement("Panel", {
        get id() {
          return props.id;
        },
        get ["class"]() {
          return libs.classNames("LadderChartRow", {
            [`Rank${rank()}`]: isTopRank()
          });
        }
      }, null);
      libs.createElement("Image", {
        "class": "LadderChartRowBG"
      }, _el$24);
      const _el$26 = libs.createElement("Panel", {
        "class": "LadderChartRowContent"
      }, _el$24),
      _el$27 = libs.createElement("Panel", {
        "class": "LadderChartRowCol LadderNumber"
      }, _el$26),
      _el$31 = libs.createElement("Panel", {
        "class": "LadderChartRowCol PlayerInfo"
      }, _el$26),
      _el$32 = libs.createElement("Panel", {
        "class": "LadderChartRowCol LadderGroup"
      }, _el$26),
      _el$33 = libs.createElement("Label", {
        "class": "LadderChartGroupValue",
        get text() {
          return FormatNumber(props.rankData?.pvpPower ?? 0);
        }
      }, _el$32),
      _el$34 = libs.createElement("Panel", {
        "class": "LadderChartRowCol LadderScore"
      }, _el$26);
    libs.insert(_el$27, libs.createComponent(libs.Show, {
      get when() {
        return hasRank();
      },
      get fallback() {
        return (() => {
          const _el$35 = libs.createElement("Panel", {
              "class": "LadderChartRowRankNoRank"
            }, null),
            _el$36 = libs.createElement("Label", {
              get text() {
                return GetLocalization("#LadderLobby_ChartNoRank");
              }
            }, _el$35);
          libs.effect(_$p => libs.setProp(_el$36, "text", GetLocalization("#LadderLobby_ChartNoRank"), _$p));
          return _el$35;
        })();
      },
      get children() {
        const _el$28 = libs.createElement("Panel", {
            "class": "LadderChartRowRank"
          }, null);
          libs.createElement("Image", {
            "class": "LadderChartRankBG"
          }, _el$28);
        libs.insert(_el$28, libs.createComponent(libs.Show, {
          get when() {
            return !isTopRank();
          },
          get children() {
            const _el$30 = libs.createElement("Label", {
              "class": "LadderChartRankValue",
              get text() {
                return `${rank()}`;
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$30, "text", `${rank()}`, _$p));
            return _el$30;
          }
        }), null);
        return _el$28;
      }
    }));
    libs.insert(_el$31, libs.createComponent(PlayerAvatar, {
      get accountID() {
        return accountID();
      },
      get borderID() {
        return props.rankData?.borderID;
      }
    }), null);
    libs.insert(_el$31, libs.createComponent(libs.Show, {
      get when() {
        return accountID() !== "0";
      },
      get fallback() {
        return libs.createElement("Label", {
          "class": "LadderChartPlayerName",
          text: "-"
        }, null);
      },
      get children() {
        return libs.createComponent(Player.PlayerName, {
          "class": "LadderChartPlayerName",
          get accountid() {
            return accountID();
          }
        });
      }
    }), null);
    libs.insert(_el$34, libs.createComponent(LadderChartScore, {
      get score() {
        return props.rankData?.score;
      }
    }));
    libs.effect(_p$ => {
      const _v$7 = props.id,
        _v$8 = libs.classNames("LadderChartRow", {
          [`Rank${rank()}`]: isTopRank()
        }),
        _v$9 = FormatNumber(props.rankData?.pvpPower ?? 0);
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$24, "id", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$24, "class", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$33, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$24;
  })();
}
function isHeroID(heroID) {
  return heroID > 0;
}
function LadderBattleTeamSlot(props) {
  const [local, others] = libs.splitProps(props, ["class", "heroId", "locked"]);
  return libs.createComponent(EOM_Button.EOM_BaseButton, libs.mergeProps$1({
    "class": "LadderBattleTeamSlot",
    onactivate: () => {
      GameEvents.SendCustomEventToServer("arena_enter_team_editor", {
        kind: "attack"
      });
      ToggleWindow("MenuButton_rank", false);
    },
    get classList() {
      return {
        Lock: local.locked == true,
        Idle: local.heroId == undefined && local.locked != true
      };
    }
  }, others, {
    get children() {
      return [libs.createElement("Image", {
        "class": "LadderBattleTeamSlotBG"
      }, null), libs.createElement("Image", {
        "class": "LadderBattleTeamSlotAddIcon"
      }, null), libs.createElement("Image", {
        "class": "LadderBattleTeamSlotLockIcon"
      }, null), libs.createComponent(libs.Show, {
        get when() {
          return local.heroId !== undefined;
        },
        get children() {
          return libs.createComponent(EOM_HeroImage.EOM_HeroImage, {
            "class": "LadderBattleTeamSlotHero",
            get heroid() {
              return local.heroId;
            },
            heroimagestyle: "portrait"
          });
        }
      })];
    }
  }));
}
function LadderBattleTeam(props) {
  return (() => {
    const _el$41 = libs.createElement("Panel", {
        "class": "LadderBattleTeam"
      }, null),
      _el$42 = libs.createElement("Panel", {
        "class": "LadderBattleTeamTitle"
      }, _el$41),
      _el$43 = libs.createElement("Label", {
        "class": "LadderBattleTeamTitleLabel",
        get text() {
          return GetLocalization("#LadderLobby_BattleTeamTitle");
        }
      }, _el$42),
      _el$44 = libs.createElement("Label", {
        "class": "LadderBattleTeamBP",
        get text() {
          return LocalizeWithVars("#LadderLobby_BattleTeamTitleBP", {
            bp: FormatNumber(props.team?.power ?? 0)
          });
        }
      }, _el$42),
      _el$45 = libs.createElement("Panel", {
        "class": "LadderBattleTeamContent"
      }, _el$41);
    libs.insert(_el$45, () => [1, 2, 3, 4].map(slotID => {
      const slot = props.team?.slots.find(item => item.slot === slotID);
      return libs.createComponent(LadderBattleTeamSlot, {
        get enabled() {
          return props.team !== undefined;
        },
        get heroId() {
          return slot !== undefined && isHeroID(slot.hero_id) ? slot.hero_id : undefined;
        }
      });
    }));
    libs.effect(_p$ => {
      const _v$0 = GetLocalization("#LadderLobby_BattleTeamTitle"),
        _v$1 = LocalizeWithVars("#LadderLobby_BattleTeamTitleBP", {
          bp: FormatNumber(props.team?.power ?? 0)
        });
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$43, "text", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$44, "text", _v$1, _p$._v$1));
      return _p$;
    }, {
      _v$0: undefined,
      _v$1: undefined
    });
    return _el$41;
  })();
}
function GetCurrentPvpSeason() {
  const serverTime = Math.floor(CustomUIConfig.GetServerTimeStamp());
  let currentSeason = KeyValues.pvp_season["1"];
  for (let index = 1; index <= 1000; index++) {
    const season = KeyValues.pvp_season[String(index)];
    if (season === undefined) break;
    if (serverTime >= season.start_time) currentSeason = season;
  }
  return currentSeason;
}
function LadderLobby() {
  const settings = solid_utils.createNetDataSignal("common", "settings");
  const teamData = solid_utils.createPlayerNetDataSignal("arena", "team_setting");
  const pvpRequest = solid_utils.createPlayerNetDataSignal("arena", "pvp_request");
  const playerPvpDatas = solid_utils.createServiceNetData("player_pvp_datas", {});
  const playerCounters = solid_utils.createServiceNetData("player_counters", {});
  const [leaderboardPage, setLeaderboardPage] = libs.createSignal(1);
  const [leaderboardPages, setLeaderboardPages] = libs.createSignal({});
  const [redPointVersion, setRedPointVersion] = libs.createSignal(0);
  const currentSeason = GetCurrentPvpSeason();
  const seasonID = currentSeason?.sid ?? 1;
  const getCachedLeaderboardPage = page => {
    pvpLeaderboardCacheVersion();
    return leaderboardPages()[page] ?? pvpLeaderboardCache[getPvpLeaderboardPageKey(seasonID, page)]?.data;
  };
  const currentPvpData = libs.createMemo(() => playerPvpDatas()[String(seasonID)]);
  const attackTeam = libs.createMemo(() => {
    const data = teamData();
    return data?.setting.teams.find(team => team.team_id === data.setting.attack_team);
  });
  const currentLeaderboardData = libs.createMemo(() => getCachedLeaderboardPage(leaderboardPage()));
  const firstLeaderboardData = libs.createMemo(() => getCachedLeaderboardPage(1));
  const leaderboardRanks = libs.createMemo(() => (currentLeaderboardData()?.leaderboard_data ?? []).map(data => normalizeLadderRank(data)));
  const topRanks = libs.createMemo(() => (firstLeaderboardData()?.leaderboard_data ?? []).map(data => normalizeLadderRank(data)));
  const topRank = rank => topRanks().find(data => data.rank === rank);
  const selfRank = libs.createMemo(() => {
    const data = firstLeaderboardData()?.self_data;
    if (data !== undefined) return normalizeLadderRank(data, currentPvpData()?.score ?? DEFAULT_PVP_SCORE, attackTeam()?.power ?? 0);
    return {
      accountID: Steam_64_3(Game.GetLocalPlayerInfo().player_steamid),
      rank: 0,
      score: currentPvpData()?.score ?? DEFAULT_PVP_SCORE,
      pvpPower: attackTeam()?.power ?? 0
    };
  });
  const requestPvpData = (force = false) => {
    const now = CustomUIConfig.GetServerTimeStamp();
    if (!force && now - lastPvpRequestTime < PVP_AUTO_REQUEST_INTERVAL) return;
    lastPvpRequestTime = now;
    GameEvents.SendCustomEventToServer("ladder_request_pvp_data", {
      seasonID
    });
  };
  const pvpLoading = libs.createMemo(() => pvpRequest()?.loading ?? currentPvpData() === undefined);
  libs.createMemo(() => settings()?.is_local_host === true);
  const remainingBattleCount = libs.createMemo(() => Math.max(0, DAILY_PVP_BATTLE_COUNT - (playerCounters()["daily_pvp_play"]?.count ?? 0)));
  const pvpReady = libs.createMemo(() => {
    const request = pvpRequest();
    return request !== undefined && request.seasonID === seasonID && !request.loading && request.error === undefined && currentPvpData() !== undefined;
  });
  const battleButtonText = libs.createMemo(() => remainingBattleCount() <= 0 ? GetLocalization("#LadderBattle_ButtonCountExhausted") : pvpLoading() ? GetLocalization("#LadderBattle_ButtonLoading") : pvpReady() ? GetLocalization("#LadderBattle_ButtonBattleStart") : GetLocalization("#LadderBattle_ButtonRetry"));
  const battleHintText = libs.createMemo(() => {
    const error = pvpRequest()?.error;
    if (!pvpLoading() && error === "opponents_empty") return GetLocalization("#LadderBattle_EmptyOpponents");
    if (!pvpLoading() && error !== undefined) return GetLocalization("#LadderBattle_MatchError");
    return LocalizeWithVars("#LadderBattle_BattleCount", {
      allowCount: remainingBattleCount(),
      totalCount: DAILY_PVP_BATTLE_COUNT
    });
  });
  const showWeeklyTaskRedPoint = () => {
    redPointVersion();
    return CustomUIConfig.GetRedPoint("rank", "Ladder", "ladder_lobby", "LadderLobbyButtonStore");
  };
  let disposed = false;
  let pendingLeaderboardRequestTimer;
  const cancelPendingLeaderboardRequest = () => {
    if (pendingLeaderboardRequestTimer === undefined) return;
    clearTimeout(pendingLeaderboardRequestTimer);
    pendingLeaderboardRequestTimer = undefined;
  };
  const requestLeaderboardPage = page => {
    const pageKey = getPvpLeaderboardPageKey(seasonID, page);
    const requestTime = Date.now();
    pvpLeaderboardLastRequestTimes[pageKey] = requestTime;
    CallActionRequest("/v1/leaderboard/fetch", {
      leaderboard_type: "pvp",
      extra_keys: [String(seasonID)],
      start: (page - 1) * LEADERBOARD_PAGE_SIZE + 1,
      end: page * LEADERBOARD_PAGE_SIZE
    }, result => {
      if (result?.code !== 0 || pvpLeaderboardLastRequestTimes[pageKey] !== requestTime) return;
      const data = result.data?.leaderboard_datas?.[0];
      const cacheData = data ?? {
        leaderboard_data: []
      };
      pvpLeaderboardCache[pageKey] = {
        data: cacheData,
        updatedAt: Date.now() / 1000
      };
      setPvpLeaderboardCacheVersion(version => version + 1);
      if (!disposed) setLeaderboardPages(pages => ({
        ...pages,
        [page]: cacheData
      }));
    });
  };
  const scheduleLeaderboardPageRequest = page => {
    cancelPendingLeaderboardRequest();
    const pageKey = getPvpLeaderboardPageKey(seasonID, page);
    const lastRequestTime = pvpLeaderboardLastRequestTimes[pageKey] ?? (pvpLeaderboardCache[pageKey]?.updatedAt ?? 0) * 1000;
    const delay = Math.max(0, lastRequestTime + LEADERBOARD_MIN_REQUEST_INTERVAL_MS - Date.now());
    if (delay === 0) {
      requestLeaderboardPage(page);
      return;
    }
    pendingLeaderboardRequestTimer = setTimeout(() => {
      pendingLeaderboardRequestTimer = undefined;
      if (disposed || leaderboardPage() !== page) return;
      requestLeaderboardPage(page);
    }, delay);
  };
  const changeLeaderboardPage = page => {
    setLeaderboardPage(page);
    scheduleLeaderboardPageRequest(page);
  };
  libs.onMount(() => {
    const redPointListenerID = CustomUIConfig.SubscribeRedPointChange(() => {
      setRedPointVersion(version => version + 1);
    }, "rank");
    libs.onCleanup(() => {
      disposed = true;
      cancelPendingLeaderboardRequest();
      GameEvents.Unsubscribe(redPointListenerID);
    });
    GameEvents.SendCustomEventToServer("ladder_request_team_setting", {
      seasonID
    });
    requestPvpData();
    scheduleLeaderboardPageRequest(1);
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
    id: "LadderLobby",
    get children() {
      const _el$46 = libs.createElement("Panel", {
          id: "LadderLobbyContent"
        }, null),
        _el$47 = libs.createElement("Panel", {
          id: "LadderLobbyPageBar"
        }, _el$46);
        libs.createElement("Image", {
          "class": "LadderLobbyPageArrorw PageArrorLeft"
        }, _el$47);
        const _el$49 = libs.createElement("Panel", {
          "class": "LadderLobbyPageContent"
        }, _el$47);
        libs.createElement("Image", {
          "class": "LadderLobbyPageBG"
        }, _el$49);
        const _el$51 = libs.createElement("Label", {
          "class": "LadderLobbyPageLabel",
          get text() {
            return GetLocalization("#LadderGroup_Group3");
          }
        }, _el$49);
        libs.createElement("Image", {
          "class": "LadderLobbyPageArrorw PageArrorRight"
        }, _el$47);
        const _el$53 = libs.createElement("Panel", {
          id: "LadderLobbyTopContent"
        }, _el$46),
        _el$54 = libs.createElement("Panel", {
          id: "LadderLobbySessionContent"
        }, _el$53);
        libs.createElement("Image", {
          "class": "LadderLobbySessionBG"
        }, _el$54);
        const _el$56 = libs.createElement("Panel", {
          "class": "LadderLobbySessionInfo"
        }, _el$54),
        _el$57 = libs.createElement("Label", {
          "class": "LadderLobbySessionLabel",
          get text() {
            return GetLocalization("#LadderLobby_SessionLabel");
          }
        }, _el$56),
        _el$58 = libs.createElement("Label", {
          "class": "LadderLobbySessionValue",
          get text() {
            return GetLocalization("#LadderGroup_Group3");
          }
        }, _el$56),
        _el$59 = libs.createElement("Panel", {
          id: "LadderLobbyBigChart"
        }, _el$53),
        _el$60 = libs.createElement("Panel", {
          id: "LadderLobbyTopOptionContent"
        }, _el$53),
        _el$61 = libs.createElement("Panel", {
          id: "LadderLobbyChart"
        }, _el$46);
        libs.createElement("Image", {
          id: "LadderLobbyChartBG"
        }, _el$61);
        const _el$63 = libs.createElement("Panel", {
          id: "LadderChartPanel"
        }, _el$61),
        _el$64 = libs.createElement("Panel", {
          "class": "ChartListVerticalScroll VerticalScrollStyle"
        }, _el$63),
        _el$65 = libs.createElement("Panel", {
          id: "LadderRankPagination"
        }, _el$46),
        _el$66 = libs.createElement("Panel", {
          id: "LadderLobbyBottomContent"
        }, _el$46),
        _el$67 = libs.createElement("Panel", {
          "class": "LadderBattleButtonContent"
        }, _el$66),
        _el$68 = libs.createElement("Label", {
          "class": "LadderBattleCount",
          get text() {
            return battleHintText();
          }
        }, _el$67),
        _el$71 = libs.createElement("Panel", {
          "class": "LadderBottomOptions"
        }, _el$66);
      libs.insert(_el$53, libs.createComponent(EOM_Countdown.EOM_Countdown, {
        icon: true,
        get endTime() {
          return currentSeason?.end_time ?? 0;
        },
        text: "#Ladder_TimeLimit"
      }), _el$54);
      libs.insert(_el$59, libs.createComponent(LadderLobbyBigChartItem, {
        "class": "Rank2",
        get rankData() {
          return topRank(2);
        }
      }), null);
      libs.insert(_el$59, libs.createComponent(LadderLobbyBigChartItem, {
        "class": "Rank1",
        get rankData() {
          return topRank(1);
        }
      }), null);
      libs.insert(_el$59, libs.createComponent(LadderLobbyBigChartItem, {
        "class": "Rank3",
        get rankData() {
          return topRank(3);
        }
      }), null);
      libs.insert(_el$60, libs.createComponent(LadderButton, {
        "class": "LadderLobbyButtonGroup",
        get labelText() {
          return GetLocalization("#LadderLobby_ButtonGroupDescription");
        },
        onactivate: () => {
          ShowPopup("CommonConfirm", {
            title: GetLocalization("#LadderGroupDescription_Title"),
            text: GetLocalization("#LadderGroupDescription_Text"),
            showCancel: false,
            size: "normal"
          });
        }
      }), null);
      libs.insert(_el$60, libs.createComponent(LadderButton, {
        "class": "LadderLobbyButtonLadderRewards",
        onactivate: () => {
          ShowPopup("PvpReward", {
            seasonID
          });
        },
        get labelText() {
          return GetLocalization("#LadderLobby_ButtonLadderRewards");
        }
      }), null);
      libs.insert(_el$63, libs.createComponent(LadderChartRowHeader, {}), _el$64);
      libs.insert(_el$64, libs.createComponent(libs.For, {
        get each() {
          return leaderboardRanks();
        },
        children: rankData => libs.createComponent(LadderChartRow, {
          rankData: rankData
        })
      }));
      libs.insert(_el$63, libs.createComponent(LadderChartRow, {
        id: "LadderChartSelfRow",
        get rankData() {
          return selfRank();
        }
      }), null);
      libs.insert(_el$65, libs.createComponent(PageControl, {
        get page() {
          return leaderboardPage();
        },
        setPage: changeLeaderboardPage,
        pageCount: LEADERBOARD_MAX_PAGE
      }));
      libs.insert(_el$66, libs.createComponent(LadderBattleTeam, {
        get team() {
          return attackTeam();
        }
      }), _el$67);
      libs.insert(_el$67, libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "LadderBattleButton",
        get enabled() {
          return libs.memo(() => remainingBattleCount() > 0)() && !pvpLoading();
        },
        onactivate: () => {
          if (!pvpReady()) {
            requestPvpData(true);
            return;
          }
          GameEvents.SendCustomEventToServer("arena_enter", {});
          ToggleWindow("MenuButton_rank", false);
        },
        get children() {
          return [libs.createElement("Image", {
            "class": "LadderBattleButtonBG"
          }, null), (() => {
            const _el$70 = libs.createElement("Label", {
              "class": "LadderBattleButtonLabel",
              get text() {
                return battleButtonText();
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$70, "text", battleButtonText(), _$p));
            return _el$70;
          })()];
        }
      }), null);
      libs.insert(_el$71, libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "LadderButton LadderLobbyButtonDefense",
        get enabled() {
          return teamData() !== undefined;
        },
        onactivate: () => {
          GameEvents.SendCustomEventToServer("arena_enter_team_editor", {
            kind: "defense"
          });
          ToggleWindow("MenuButton_rank", false);
        },
        get children() {
          return [libs.createElement("Image", {
            "class": "LadderButtonIcon"
          }, null), (() => {
            const _el$73 = libs.createElement("Panel", {
                "class": "LadderButtonContent"
              }, null),
              _el$74 = libs.createElement("Label", {
                "class": "LadderButtonLabel",
                get text() {
                  return GetLocalization("#LadderLobby_ButtonDefensiveTeam");
                }
              }, _el$73);
            libs.effect(_$p => libs.setProp(_el$74, "text", GetLocalization("#LadderLobby_ButtonDefensiveTeam"), _$p));
            return _el$73;
          })()];
        }
      }), null);
      libs.insert(_el$71, libs.createComponent(LadderButton, {
        "class": "LadderLobbyButtonRecord",
        onactivate: () => {
          ShowPopup("PvpCombatLog", {
            seasonID
          });
        },
        get labelText() {
          return GetLocalization("#LadderLobby_ButtonBattleRecord");
        }
      }), null);
      libs.insert(_el$71, libs.createComponent(LadderButton, {
        "class": "LadderLobbyButtonStore",
        onactivate: () => {
          CustomUIConfig.__rankRedPointState?.markWeeklyPvpTaskViewed();
          ShowPopup("PvpWeeklyTask", {});
        },
        get labelText() {
          return GetLocalization("#LadderWeekTask");
        },
        get children() {
          return libs.createComponent(libs.Show, {
            get when() {
              return showWeeklyTaskRedPoint();
            },
            get children() {
              return libs.createComponent(EOM_RedMark.EOM_RedMark, {
                align: "right top",
                hittest: false
              });
            }
          });
        }
      }), null);
      libs.effect(_p$ => {
        const _v$10 = GetLocalization("#LadderGroup_Group3"),
          _v$11 = GetLocalization("#LadderLobby_SessionLabel"),
          _v$12 = GetLocalization("#LadderGroup_Group3"),
          _v$13 = battleHintText();
        _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$51, "text", _v$10, _p$._v$10));
        _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$57, "text", _v$11, _p$._v$11));
        _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$58, "text", _v$12, _p$._v$12));
        _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$68, "text", _v$13, _p$._v$13));
        return _p$;
      }, {
        _v$10: undefined,
        _v$11: undefined,
        _v$12: undefined,
        _v$13: undefined
      });
      return _el$46;
    }
  });
}

const heroTabs = Object.entries(GameUI.CustomUIConfig().heroes ?? {}).filter(([, hero]) => hero.IsHero == 1 && hero.HeroID != undefined).map(([heroName, hero]) => ({
  key: heroName,
  heroID: String(hero.HeroID)
}));
const heroTabMap = Object.fromEntries(heroTabs.map(hero => [hero.key, hero]));
const menuList = {
  Ladder: ["ladder_lobby", "pvp_shop"],
  Rank_CommonMatchHero: heroTabs.map(hero => hero.key)
};
const {
  LayoutMenu,
  show,
  menuName,
  secondTabName
} = EOM_MenuLayout.createMenuLayout("rank", () => menuList);
function Rank() {
  const isLadder = libs.createMemo(() => menuName() == "Ladder");
  const leaderboardType = libs.createMemo(() => menuName() == "Rank_CommonMatchHero" ? "common_match_hero" : "common_match");
  const extraKey = libs.createMemo(() => {
    const tab = secondTabName();
    if (leaderboardType() == "common_match") {
      return tab.replace("Rank_PlayerNum_", "");
    }
    return heroTabMap[tab]?.heroID ?? "";
  });
  const title = libs.createMemo(() => GetLocalization("#" + menuName()));
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    renderOnShow: true,
    id: "RankMain",
    get show() {
      return show();
    },
    name: "MenuButton_rank",
    get classList() {
      return {
        Ladder: isLadder()
      };
    },
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(libs.Show, {
        get when() {
          return isLadder();
        },
        get children() {
          return libs.createComponent(Player.CurrencyGroup, {
            currencyType: "top",
            tokens: [110022]
          });
        }
      }), libs.createComponent(libs.Switch, {
        get children() {
          return [libs.createComponent(libs.Match, {
            get when() {
              return menuName() == "Rank_CommonMatchHero" || menuName() == "Rank_CommonMatch";
            },
            get children() {
              return libs.createComponent(CommonMatchLeaderboard, {
                get visible() {
                  return show();
                },
                get leaderboardType() {
                  return leaderboardType();
                },
                get extraKey() {
                  return extraKey();
                },
                get title() {
                  return title();
                }
              });
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return libs.memo(() => !!isLadder())() && secondTabName() == "ladder_lobby";
            },
            get children() {
              return libs.createComponent(LadderLobby, {});
            }
          }), libs.createComponent(libs.Match, {
            get when() {
              return libs.memo(() => !!isLadder())() && secondTabName() == "pvp_shop";
            },
            get children() {
              return libs.createComponent(StoreTagPage.StoreTagPage, {
                tag: "pvp_shop"
              });
            }
          })];
        }
      })];
    }
  });
}
libs.render(() => libs.createComponent(Rank, {}), $.GetContextPanel());
print("Rank loaded");