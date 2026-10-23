--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('RankBadgeBanner', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const RANK_BADGE_INTERVAL_SECONDS = 2;
const RANK_BADGE_HEROES = {
  224: "assa",
  225: "guns",
  226: "mage",
  227: "pala"
};
const getRankBadgeAssetRank = rank => rank <= 3 ? rank : 10;
function getPlayerRankBadges(data) {
  const briefMatchData = data?.player_common_match_data ?? {};
  const leaderboardDatas = data?.leaderboard_datas ?? briefMatchData.leaderboard_datas ?? [];
  const badges = [];
  for (const leaderboard of Array.isArray(leaderboardDatas) ? leaderboardDatas : []) {
    const rank = toFiniteNumber(leaderboard?.self_data?.rank, -1);
    const leaderboardKey = leaderboard?.leaderboard_key;
    const [, language, keyHeroID] = leaderboardKey?.split(":") ?? [];
    const heroID = Number(keyHeroID);
    const heroName = RANK_BADGE_HEROES[heroID];
    if (heroName == undefined || rank < 1 || rank > 10) continue;
    badges.push({
      image: getSrcPath(`conv/badge/${heroName}_${getRankBadgeAssetRank(rank)}_${language == "cn" ? "cn" : "en"}.png`),
      rank,
      heroID
    });
  }
  return badges.sort((a, b) => a.rank - b.rank || a.heroID - b.heroID);
}
const PlayerHeroRankBadge = props => {
  const rankBadge = libs.createMemo(() => getPlayerRankBadges(props.data()).find(badge => badge.heroID == props.heroID()));
  return (() => {
    const _el$ = libs.createElement("Image", {
      "class": "PlayerHeroRankBadge",
      get src() {
        return rankBadge()?.image ?? "";
      },
      hittest: false
    }, null);
    libs.effect(_p$ => {
      const _v$ = rankBadge()?.image ?? "",
        _v$2 = rankBadge() != undefined;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "src", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "visible", _v$2, _p$._v$2));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
};
const PlayerRankBadgeBanner = props => {
  const rankBadges = libs.createMemo(() => getPlayerRankBadges(props.data()));
  const [rankBadgeIndex, setRankBadgeIndex] = libs.createSignal(0);
  const getRankBadgePosition = index => {
    const count = rankBadges().length;
    if (count <= 1) return 0;
    const currentIndex = Math.min(rankBadgeIndex(), count - 1);
    let position = index - currentIndex;
    if (position > count / 2) position -= count;
    if (position < -count / 2) position += count;
    return Math.max(-2, Math.min(2, position));
  };
  libs.createEffect(() => {
    const count = rankBadges().length;
    if (count == 0 || rankBadgeIndex() >= count) setRankBadgeIndex(0);
  });
  libs.createEffect(() => {
    const count = rankBadges().length;
    if (!(props.active?.() ?? true) || count <= 1) return;
    const timer = setInterval(() => {
      setRankBadgeIndex(index => (index + 1) % count);
    }, RANK_BADGE_INTERVAL_SECONDS * 1000);
    libs.onCleanup(() => clearInterval(timer));
  });
  return libs.createComponent(libs.Show, {
    get when() {
      return rankBadges().length > 0;
    },
    get children() {
      const _el$2 = libs.createElement("Panel", {
          "class": "PlayerRankBadgeBanner"
        }, null),
        _el$3 = libs.createElement("Panel", {
          "class": "RankBadgeList"
        }, _el$2);
      libs.insert(_el$3, libs.createComponent(libs.For, {
        get each() {
          return rankBadges();
        },
        children: (badge, index) => (() => {
          const _el$4 = libs.createElement("Panel", {
              get ["class"]() {
                return `RankBadgeSlide Index${getRankBadgePosition(index())}`;
              },
              hittest: false
            }, null),
            _el$5 = libs.createElement("Image", {
              "class": "RankBadgeImage",
              get src() {
                return badge.image;
              },
              hittest: false
            }, _el$4);
          libs.effect(_p$ => {
            const _v$3 = `RankBadgeSlide Index${getRankBadgePosition(index())}`,
              _v$4 = badge.image;
            _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "class", _v$3, _p$._v$3));
            _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$5, "src", _v$4, _p$._v$4));
            return _p$;
          }, {
            _v$3: undefined,
            _v$4: undefined
          });
          return _el$4;
        })()
      }));
      return _el$2;
    }
  });
};

exports.PlayerHeroRankBadge = PlayerHeroRankBadge;
exports.PlayerRankBadgeBanner = PlayerRankBadgeBanner;