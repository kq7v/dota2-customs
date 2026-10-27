--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Loading = require('./EOM_Loading.js');
var Player = require('./Player.js');
var RankBadgeBanner = require('./RankBadgeBanner.js');
var service_netdata_helper = require('./service_netdata_helper.js');
var tooltip_base = require('./tooltip_base.js');
require('./solid_utils.js');
require('./EOM_Button.js');
require('./EOM_TextEntry.js');

const root = $.GetContextPanel();
const DEFAULT_AVATAR_BORDER_ID = "1710000";
function getAttributeString(...names) {
  for (const name of names) {
    const value = root.GetAttributeString(name, "");
    if (value !== "") {
      return value;
    }
  }
  return undefined;
}
function getPlayerID() {
  const playerID = root.GetAttributeInt("player_id", root.GetAttributeInt("playerID", -1));
  return playerID >= 0 ? playerID : undefined;
}
function TooltipContents(props) {
  const playerInfo = service_netdata_helper.GetPlayerInfo(props);
  const playerInfoData = libs.createMemo(() => playerInfo.data() ?? {});
  const playerInfoReady = libs.createMemo(() => {
    const data = playerInfo.data();
    const steamID = playerInfo.steamID();
    return !playerInfo.loading() && data != undefined && steamID != undefined && data.steamID == steamID;
  });
  const accountLvData = libs.createMemo(() => playerInfoData().player_account_levels?.hero_level ?? {
    level: 1,
    extra_exp: 0
  });
  const playerCosmeticEquips = libs.createMemo(() => playerInfoData().player_cosmetic_equips ?? {});
  const playerCosmeticID = slot => {
    const cosmeticID = playerCosmeticEquips()[slot]?.cosmetic_id;
    return cosmeticID != undefined && cosmeticID > 0 ? String(cosmeticID) : undefined;
  };
  const borderCosmeticID = libs.createMemo(() => playerCosmeticID(COSMETIC_SLOT.BORDER) ?? DEFAULT_AVATAR_BORDER_ID);
  const titleCosmeticID = libs.createMemo(() => playerCosmeticID(COSMETIC_SLOT.TITLE) ?? "");
  const medalCosmeticID = libs.createMemo(() => playerCosmeticID(COSMETIC_SLOT.MEDAL));
  const maxLevel = Object.keys(KeyValues.hero_level_exp).length;
  const maxExp = libs.createMemo(() => KeyValues.hero_level_exp[Math.min(accountLvData().level, maxLevel)]?.exp ?? 1);
  const maxExpText = libs.createMemo(() => maxExp() == 0 ? "\u221e" : String(maxExp()));
  const progressPercent = libs.createMemo(() => {
    if (maxExp() <= 0) return 0;
    return Math.max(0, Math.min(100, accountLvData().extra_exp / maxExp() * 100));
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
      id: "PlayerInfoTooltip"
    }, null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
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
        return [libs.createComponent(libs.Show, {
          get when() {
            return playerInfo.steamID();
          },
          get children() {
            return libs.createComponent(Player.PlayerAvatar, {
              get accountid() {
                return playerInfo.steamID();
              },
              get borderid() {
                return borderCosmeticID();
              }
            });
          }
        }), (() => {
          const _el$2 = libs.createElement("Panel", {
              id: "TitleAndLv"
            }, null),
            _el$3 = libs.createElement("Panel", {
              "class": "Title"
            }, _el$2),
            _el$4 = libs.createElement("Panel", {
              "class": "HeroLevelMain"
            }, _el$2),
            _el$5 = libs.createElement("Panel", {
              id: "LvContainer"
            }, _el$4),
            _el$6 = libs.createElement("Label", {
              "class": "Lv",
              get text() {
                return "Lv." + accountLvData().level;
              }
            }, _el$5),
            _el$7 = libs.createElement("Panel", {
              id: "ProgressContainer"
            }, _el$4),
            _el$8 = libs.createElement("Panel", {
              id: "HeroLevelProgressBar"
            }, _el$7);
            libs.createElement("Panel", {
              id: "ProgressBarBG"
            }, _el$8);
            const _el$0 = libs.createElement("Panel", {
              id: "ProgressBar",
              get width() {
                return progressPercent();
              }
            }, _el$8),
            _el$1 = libs.createElement("Label", {
              id: "ProgressLabel",
              get text() {
                return `${accountLvData().extra_exp}/${maxExpText()}`;
              }
            }, _el$7);
          libs.insert(_el$3, libs.createComponent(libs.Show, {
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
          libs.insert(_el$5, libs.createComponent(Player.PlayerName, {
            id: "PlayerName",
            get accountid() {
              return playerInfo.steamID();
            }
          }), null);
          libs.effect(_p$ => {
            const _v$ = "Lv." + accountLvData().level,
              _v$2 = progressPercent(),
              _v$3 = `${accountLvData().extra_exp}/${maxExpText()}`;
            _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$6, "text", _v$, _p$._v$));
            _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$0, "width", _v$2, _p$._v$2));
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$1, "text", _v$3, _p$._v$3));
            return _p$;
          }, {
            _v$: undefined,
            _v$2: undefined,
            _v$3: undefined
          });
          return _el$2;
        })(), (() => {
          const _el$10 = libs.createElement("Panel", {
            "class": "MedalList"
          }, null);
          libs.insert(_el$10, libs.createComponent(libs.Show, {
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
          libs.insert(_el$10, libs.createComponent(RankBadgeBanner.PlayerRankBadgeBanner, {
            data: playerInfoData
          }), null);
          return _el$10;
        })(), (() => {
          const _el$11 = libs.createElement("Label", {
            id: "SteamID",
            get text() {
              return playerInfo.steamID() ?? "";
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$11, "text", playerInfo.steamID() ?? "", _$p));
          return _el$11;
        })()];
      }
    }));
    return _el$;
  })();
}
function SetupTooltip() {
  libs.render(() => libs.createComponent(TooltipContents, {
    get steamID() {
      return getAttributeString("steam_id", "steamID", "accountid");
    },
    get steam64ID() {
      return getAttributeString("steam64_id", "steam64ID");
    },
    get playerID() {
      return getPlayerID();
    }
  }), root);
}
(function () {
  tooltip_base.InitTooltipStyle(root, "EmptyTooltip");
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();