--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
require('./service_netdata_helper.js');
require('./solid_utils.js');
require('./EOM_RedMark.js');

const MENU_LIST = {
  Community_Menu: []
};
const communityCache = CustomUIConfig.__communityCache ??= {};
let communityOpenHandler;
const {
  show
} = EOM_MenuLayout.createMenuLayout("community", () => MENU_LIST, {
  beforeShow: () => communityOpenHandler?.()
});
const CDK_LINKS = {
  zh: "https://docs.qq.com/sheet/DTkZNeWxBZXhvU1BY?tab=BB08J2",
  en: "https://docs.google.com/spreadsheets/d/17PQvZO9GS9MnsZoqKRn3b8JGFOhxKR59asS7whRv33I/edit?usp=sharing",
  ru: "https://docs.google.com/spreadsheets/d/1sAfyheyX2iWpjQDu87q_8ZFWYNuU0Ivbo1hdP-B6cYE/edit?usp=sharing"
};
const BANNER_INTERVAL = 5;
const COMMUNITY_REFRESH_INTERVAL = 5 * 60;
const FEEDBACK_SUBMIT_INTERVAL = 0;
const HIDE_MENU_BAR = false;
const [inGameBrowserURL, setInGameBrowserURL] = libs.createSignal();
const GUIDE_TAGS = [{
  tag: "basics",
  localization: "#Community_Guide_Basics"
}, {
  tag: "advanced",
  localization: "#Community_Guide_Advanced"
}, {
  tag: "heroes",
  localization: "#Community_Guide_Heroes"
}, {
  tag: "meta",
  localization: "#Community_Guide_Meta"
}];
const FEEDBACK_TYPES = [{
  type: "bug",
  localization: "#Community_Feedback_Bug"
}, {
  type: "suggestion",
  localization: "#Community_Feedback_Suggestion"
}, {
  type: "other",
  localization: "#Community_Feedback_Other"
}];
function GetCommunityLanguage() {
  const language = Language();
  if (language == "russian") return "ru";
  if (language == "english") return "en";
  return "zh";
}
function GetLanguageCache(lang) {
  return communityCache[lang] ??= {
    guideContents: {}
  };
}
function IsCacheFresh(cache) {
  if (cache == undefined) return false;
  const age = Date.now() / 1000 - cache.updatedAt;
  return age >= 0 && age < COMMUNITY_REFRESH_INTERVAL;
}
function OpenExternalURL2(url) {
  if (typeof url != "string" || url == "" || url == "#") return;
  setInGameBrowserURL(url);
}
function ReportCommunity(detail) {
  GameUI.CustomUIConfig().ReportClick("community", detail);
}
function FormatDate(value) {
  if (typeof value != "string" || value == "") return "";
  return value.slice(0, 10);
}
function SortCommunityItems(items) {
  return [...items].sort((a, b) => {
    const priorityDifference = (b.priority ?? 0) - (a.priority ?? 0);
    if (priorityDifference != 0) return priorityDifference;
    const aPublishedAt = Date.parse(a.publishedAt ?? "") || 0;
    const bPublishedAt = Date.parse(b.publishedAt ?? "") || 0;
    return bPublishedAt - aPublishedAt;
  });
}
function BannerCarousel(props) {
  const [bannerIndex, setBannerIndex] = libs.createSignal(0);
  let scheduleID;
  const getBannerPosition = index => {
    const count = props.banners.length;
    if (count <= 1) return 0;
    let position = index - bannerIndex();
    if (position > count / 2) position -= count;
    if (position < -count / 2) position += count;
    if (position < -1) return -2;
    if (position > 1) return 2;
    return position;
  };
  const scheduleRotation = () => {
    if (scheduleID != undefined) {
      $.CancelScheduled(scheduleID);
    }
    scheduleID = $.Schedule(BANNER_INTERVAL, () => {
      scheduleID = undefined;
      const count = props.banners.length;
      if (count > 1) {
        setBannerIndex(index => (index + 1) % count);
      }
      scheduleRotation();
    });
  };
  const changeBanner = offset => {
    const count = props.banners.length;
    if (count <= 1) return;
    setBannerIndex(index => (index + offset + count) % count);
    scheduleRotation();
  };
  const selectBanner = index => {
    setBannerIndex(index);
    scheduleRotation();
  };
  libs.createEffect(() => {
    const count = props.banners.length;
    if (count == 0 || bannerIndex() >= count) {
      setBannerIndex(0);
    }
  });
  libs.onMount(() => {
    scheduleRotation();
  });
  libs.onCleanup(() => {
    if (scheduleID != undefined) {
      $.CancelScheduled(scheduleID);
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "Banner",
        "class": "CommonBannerWindow"
      }, null),
      _el$2 = libs.createElement("Panel", {
        "class": "BannerList"
      }, _el$),
      _el$5 = libs.createElement("Panel", {
        "class": "BannerBorder",
        hittest: false
      }, _el$);
    libs.insert(_el$2, libs.createComponent(libs.For, {
      get each() {
        return props.banners;
      },
      children: (banner, index) => libs.createComponent(EOM_Button.EOM_BaseButton, {
        get ["class"]() {
          return `BannerSlide Index${getBannerPosition(index())}`;
        },
        get hittest() {
          return getBannerPosition(index()) == 0;
        },
        onactivate: () => {
          ReportCommunity("banner");
          OpenExternalURL2(banner.link);
        },
        get children() {
          return [(() => {
            const _el$6 = libs.createElement("Image", {
              "class": "BannerImage",
              scaling: "none",
              get src() {
                return banner.imageUrl ?? "";
              },
              hittest: false
            }, null);
            libs.effect(_$p => libs.setProp(_el$6, "src", banner.imageUrl ?? "", _$p));
            return _el$6;
          })(), libs.createElement("Panel", {
            "class": "BannerMask"
          }, null), (() => {
            const _el$8 = libs.createElement("Label", {
              "class": "BannerTitle",
              get text() {
                return banner.title ?? "";
              },
              hittest: false
            }, null);
            libs.effect(_p$ => {
              const _v$ = banner.title ?? "",
                _v$2 = (banner.title ?? "") != "";
              _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$8, "text", _v$, _p$._v$));
              _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "visible", _v$2, _p$._v$2));
              return _p$;
            }, {
              _v$: undefined,
              _v$2: undefined
            });
            return _el$8;
          })()];
        }
      })
    }));
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.banners.length == 0;
      },
      get children() {
        const _el$3 = libs.createElement("Label", {
          "class": "CommunityState BannerState",
          get text() {
            return GetLocalization(props.loading ? "#Community_Loading" : props.error ? "#Community_LoadFailed" : "#Community_Empty");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$3, "text", GetLocalization(props.loading ? "#Community_Loading" : props.error ? "#Community_LoadFailed" : "#Community_Empty"), _$p));
        return _el$3;
      }
    }), _el$5);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.banners.length > 1;
      },
      get children() {
        return [libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "BannerArrow Left",
          onactivate: () => changeBanner(-1)
        }), libs.createComponent(EOM_Button.EOM_BaseButton, {
          "class": "BannerArrow Right",
          onactivate: () => changeBanner(1)
        }), (() => {
          const _el$4 = libs.createElement("Panel", {
            "class": "BannerDots"
          }, null);
          libs.insert(_el$4, libs.createComponent(libs.For, {
            get each() {
              return props.banners;
            },
            children: (_, index) => libs.createComponent(EOM_Button.EOM_BaseButton, {
              "class": "BannerDot",
              get classList() {
                return {
                  Selected: index() == bannerIndex()
                };
              },
              onactivate: () => selectBanner(index())
            })
          }));
          return _el$4;
        })()];
      }
    }), _el$5);
    return _el$;
  })();
}
const Community = () => {
  const lang = GetCommunityLanguage();
  const languageCache = GetLanguageCache(lang);
  const [homeData, setHomeData] = libs.createSignal(languageCache.home?.data);
  const [homeLoading, setHomeLoading] = libs.createSignal(false);
  const [homeError, setHomeError] = libs.createSignal(false);
  const [selectedGuideTag, setSelectedGuideTag] = libs.createSignal();
  const [categoryContents, setCategoryContents] = libs.createSignal([]);
  const [categoryLoading, setCategoryLoading] = libs.createSignal(false);
  const [categoryError, setCategoryError] = libs.createSignal(false);
  const [weeklyClaiming, setWeeklyClaiming] = libs.createSignal(false);
  const [weeklyState, setWeeklyState] = libs.createSignal(CustomUIConfig.__communityWeeklyRewardCache?.data ?? "available");
  const [weeklyStateLoading, setWeeklyStateLoading] = libs.createSignal(false);
  const [weeklyStatus, setWeeklyStatus] = libs.createSignal("");
  const [feedbackType, setFeedbackType] = libs.createSignal("bug");
  const [feedbackContent, setFeedbackContent] = libs.createSignal("");
  const [feedbackSubmitting, setFeedbackSubmitting] = libs.createSignal(false);
  const [feedbackCooldown, setFeedbackCooldown] = libs.createSignal(0);
  const [feedbackStatus, setFeedbackStatus] = libs.createSignal("");
  const [feedbackSucceeded, setFeedbackSucceeded] = libs.createSignal(false);
  let homeRequest;
  let guideRequest;
  let guideRequestTag;
  let weeklyStateRequest;
  let weeklyRequest;
  let feedbackRequest;
  let feedbackCooldownSchedule;
  const updateFeedbackCooldown = () => {
    feedbackCooldownSchedule = undefined;
    const submittedAt = CustomUIConfig.__communityFeedbackSubmittedAt ?? 0;
    const remaining = Math.max(0, Math.ceil(submittedAt + FEEDBACK_SUBMIT_INTERVAL - Date.now() / 1000));
    setFeedbackCooldown(remaining);
    if (remaining > 0) {
      feedbackCooldownSchedule = $.Schedule(1, updateFeedbackCooldown);
    }
  };
  updateFeedbackCooldown();
  const guideContents = libs.createMemo(() => {
    const contents = selectedGuideTag() == undefined ? homeData()?.homeContents ?? [] : categoryContents();
    return SortCommunityItems(contents);
  });
  const banners = libs.createMemo(() => SortCommunityItems(homeData()?.banners ?? []));
  const notices = libs.createMemo(() => SortCommunityItems(homeData()?.notices ?? []));
  const guideLoading = libs.createMemo(() => {
    return selectedGuideTag() == undefined ? homeLoading() && guideContents().length == 0 : categoryLoading();
  });
  const guideError = libs.createMemo(() => {
    return selectedGuideTag() == undefined ? homeError() : categoryError();
  });
  const loadHomeData = () => {
    const cached = languageCache.home;
    if (cached != undefined) {
      setHomeData(cached.data);
    }
    if (IsCacheFresh(cached)) {
      setHomeLoading(false);
      setHomeError(false);
      return;
    }
    if (homeRequest != undefined) return;
    setHomeLoading(true);
    setHomeError(false);
    homeRequest = ServerRequest("community_refresh", {
      lang
    }, result => {
      homeRequest = undefined;
      setHomeLoading(false);
      if (result.ok) {
        const cache = {
          data: result.data,
          updatedAt: Date.now() / 1000
        };
        languageCache.home = cache;
        setHomeData(cache.data);
        setHomeError(false);
      } else {
        if (languageCache.home == undefined) {
          setHomeData(result.data);
        }
        setHomeError(true);
      }
    }, 15, () => {
      homeRequest = undefined;
      setHomeLoading(false);
      setHomeError(true);
    });
  };
  const loadGuideCategory = tag => {
    setSelectedGuideTag(tag);
    const cached = languageCache.guideContents[tag];
    setCategoryContents(cached?.data ?? []);
    setCategoryError(false);
    if (IsCacheFresh(cached)) {
      setCategoryLoading(false);
      return;
    }
    if (guideRequest != undefined && guideRequestTag == tag) return;
    if (guideRequest != undefined) CancelRequest(guideRequest);
    setCategoryLoading(true);
    guideRequestTag = tag;
    guideRequest = ServerRequest("community_contents", {
      lang,
      tag
    }, result => {
      if (guideRequestTag != tag) return;
      guideRequest = undefined;
      guideRequestTag = undefined;
      if (selectedGuideTag() != tag) return;
      setCategoryLoading(false);
      if (result.ok) {
        const cache = {
          data: result.contents,
          updatedAt: Date.now() / 1000
        };
        languageCache.guideContents[tag] = cache;
        setCategoryContents(cache.data);
      } else {
        setCategoryError(true);
        ErrorMessage(result.message ?? GetLocalization("#Community_LoadFailed"));
      }
    }, 15, () => {
      if (guideRequestTag != tag) return;
      guideRequest = undefined;
      guideRequestTag = undefined;
      if (selectedGuideTag() != tag) return;
      setCategoryLoading(false);
      setCategoryError(true);
      ErrorMessage(GetLocalization("#Community_LoadFailed"));
    });
  };
  const showGuideHome = () => {
    if (guideRequest != undefined) {
      const request = guideRequest;
      guideRequest = undefined;
      guideRequestTag = undefined;
      CancelRequest(request);
    }
    setSelectedGuideTag(undefined);
    setCategoryLoading(false);
    setCategoryError(false);
  };
  const cacheWeeklyState = state => {
    setWeeklyState(state);
    CustomUIConfig.__communityWeeklyRewardCache = {
      data: state,
      updatedAt: Date.now() / 1000
    };
  };
  const loadWeeklyState = () => {
    const cached = CustomUIConfig.__communityWeeklyRewardCache;
    if (cached != undefined) {
      setWeeklyState(cached.data);
    }
    if (IsCacheFresh(cached)) {
      setWeeklyStateLoading(false);
      return;
    }
    if (weeklyStateRequest != undefined) return;
    setWeeklyStateLoading(true);
    weeklyStateRequest = ServerRequest("community_weekly_status", {}, result => {
      weeklyStateRequest = undefined;
      setWeeklyStateLoading(false);
      if (result.ok && result.state != undefined) {
        cacheWeeklyState(result.state);
        setWeeklyStatus("");
      }
    }, 15, () => {
      weeklyStateRequest = undefined;
      setWeeklyStateLoading(false);
    });
  };
  const handleCommunityOpen = (forceRefresh = false) => {
    if (forceRefresh) {
      if (homeRequest != undefined) {
        CancelRequest(homeRequest);
        homeRequest = undefined;
      }
      if (weeklyStateRequest != undefined) {
        CancelRequest(weeklyStateRequest);
        weeklyStateRequest = undefined;
      }
      languageCache.home = undefined;
      languageCache.guideContents = {};
      CustomUIConfig.__communityWeeklyRewardCache = undefined;
      setHomeData(undefined);
      setHomeLoading(false);
      setHomeError(false);
      setWeeklyState("available");
      setWeeklyStateLoading(false);
      setWeeklyStatus("");
    }
    showGuideHome();
    loadHomeData();
    loadWeeklyState();
  };
  communityOpenHandler = handleCommunityOpen;
  libs.onCleanup(() => {
    if (communityOpenHandler == handleCommunityOpen) {
      communityOpenHandler = undefined;
    }
    for (const request of [homeRequest, guideRequest, weeklyStateRequest, weeklyRequest, feedbackRequest]) {
      if (request != undefined) CancelRequest(request);
    }
    if (feedbackCooldownSchedule != undefined) {
      $.CancelScheduled(feedbackCooldownSchedule);
    }
  });
  const claimWeeklyGift = () => {
    if (weeklyStateLoading() || weeklyClaiming() || weeklyState() == "received") return;
    setWeeklyClaiming(true);
    setWeeklyStatus("");
    weeklyRequest = ServerRequest("community_claim_weekly", {}, result => {
      weeklyRequest = undefined;
      setWeeklyClaiming(false);
      if (result.ok) {
        ReportCommunity("weekly_welfare");
        cacheWeeklyState(result.state ?? "received");
        setWeeklyStatus(GetLocalization("#Community_Weekly_ClaimSuccess"));
        CustomUIConfig.showPopup("CommonConfirm", {
          title: GetLocalization("#Community_Weekly_Name"),
          text: GetLocalization("#Community_Weekly_ClaimSuccess"),
          icon: "conv_checkmark",
          showCancel: false
        });
      } else {
        if (result.state != undefined) {
          cacheWeeklyState(result.state);
        }
        const message = result.message ?? GetLocalization("#Community_Weekly_ClaimFailed");
        setWeeklyStatus(GetLocalization("#Community_Weekly_ClaimFailed"));
        ErrorMessage(message);
      }
    }, 15, () => {
      weeklyRequest = undefined;
      setWeeklyClaiming(false);
      setWeeklyStatus(GetLocalization("#Community_Weekly_ClaimFailed"));
      ErrorMessage(GetLocalization("#Community_Weekly_ClaimFailed"));
    });
  };
  const submitFeedback = () => {
    const content = feedbackContent().trim();
    if (feedbackSubmitting() || feedbackCooldown() > 0 || content.length <= 5) return;
    ReportCommunity(`feedback_${feedbackType()}`);
    setFeedbackSubmitting(true);
    setFeedbackStatus("");
    feedbackRequest = ServerRequest("community_submit_feedback", {
      type: feedbackType(),
      content
    }, result => {
      feedbackRequest = undefined;
      setFeedbackSubmitting(false);
      if (result.ok) {
        CustomUIConfig.__communityFeedbackSubmittedAt = Date.now() / 1000;
        updateFeedbackCooldown();
        setFeedbackContent("");
        setFeedbackSucceeded(true);
        setFeedbackStatus(GetLocalization("#Community_Feedback_Success"));
      } else {
        setFeedbackSucceeded(false);
        setFeedbackStatus(GetLocalization("#Community_Feedback_Failed"));
        ErrorMessage(result.message ?? GetLocalization("#Community_Feedback_Failed"));
      }
    }, 15, () => {
      feedbackRequest = undefined;
      setFeedbackSubmitting(false);
      setFeedbackSucceeded(false);
      setFeedbackStatus(GetLocalization("#Community_Feedback_Failed"));
      ErrorMessage(GetLocalization("#Community_Feedback_Failed"));
    });
  };
  return (() => {
    const _el$9 = libs.createElement("Panel", {
        id: "Community"
      }, null),
      _el$0 = libs.createElement("Panel", {
        flowChildren: "right"
      }, _el$9),
      _el$1 = libs.createElement("Panel", {
        id: "GameGuide",
        "class": "CommonBannerWindow"
      }, _el$0),
      _el$10 = libs.createElement("Panel", {
        "class": "Content"
      }, _el$1),
      _el$11 = libs.createElement("Label", {
        "class": "GuideTitle",
        get text() {
          return GetLocalization("#Community_GameGuide");
        }
      }, _el$10);
      libs.createElement("Panel", {
        "class": "DividingLine1"
      }, _el$10);
      const _el$13 = libs.createElement("Panel", {
        "class": "PageFlow"
      }, _el$10),
      _el$14 = libs.createElement("Panel", {
        "class": "PageTab"
      }, _el$13),
      _el$15 = libs.createElement("Panel", {
        "class": "GuideList VerticalScrollStyle",
        scroll: "y"
      }, _el$13),
      _el$16 = libs.createElement("Label", {
        "class": "CommunityState",
        get text() {
          return GetLocalization(guideLoading() ? "#Community_Loading" : guideError() ? "#Community_LoadFailed" : "#Community_Empty");
        }
      }, _el$15);
      libs.createElement("Panel", {
        "class": "BannerBorder",
        hittest: false
      }, _el$1);
      const _el$18 = libs.createElement("Panel", {
        flowChildren: "right",
        marginTop: "18px"
      }, _el$9),
      _el$19 = libs.createElement("Panel", {
        id: "GameNotice"
      }, _el$18),
      _el$20 = libs.createElement("Label", {
        "class": "NoticeTitle",
        get text() {
          return GetLocalization("#Community_GameNotice");
        }
      }, _el$19),
      _el$21 = libs.createElement("Panel", {
        "class": "NoticeListContainer"
      }, _el$19),
      _el$22 = libs.createElement("Panel", {
        "class": "NoticeList",
        scroll: "y"
      }, _el$21),
      _el$24 = libs.createElement("Panel", {
        id: "GiftAndFeedback"
      }, _el$18),
      _el$25 = libs.createElement("Panel", {
        "class": "GiftContent"
      }, _el$24),
      _el$26 = libs.createElement("Label", {
        "class": "NoticeTitle",
        get text() {
          return GetLocalization("#Community_GameWelfare");
        }
      }, _el$25),
      _el$27 = libs.createElement("Panel", {
        "class": "ClaimPanel"
      }, _el$25),
      _el$28 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "right"
      }, _el$27),
      _el$39 = libs.createElement("Panel", {
        "class": "FeedbackContent"
      }, _el$24),
      _el$40 = libs.createElement("Label", {
        "class": "NoticeTitle",
        get text() {
          return GetLocalization("#Community_Feedback_Title");
        }
      }, _el$39),
      _el$41 = libs.createElement("Panel", {
        "class": "FeedbackPanel"
      }, _el$39),
      _el$42 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "right"
      }, _el$41),
      _el$43 = libs.createElement("Panel", {
        "class": "FeedbackTypeList"
      }, _el$42);
    libs.setProp(_el$0, "flowChildren", "right");
    libs.insert(_el$0, libs.createComponent(BannerCarousel, {
      get banners() {
        return banners();
      },
      get loading() {
        return homeLoading();
      },
      get error() {
        return homeError();
      }
    }), _el$1);
    libs.insert(_el$14, libs.createComponent(libs.For, {
      each: GUIDE_TAGS,
      children: item => libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "PageTabBtn",
        get classList() {
          return {
            Selected: selectedGuideTag() == item.tag
          };
        },
        onactivate: () => {
          ReportCommunity(`guide_tab_${item.tag}`);
          loadGuideCategory(item.tag);
        },
        get children() {
          const _el$45 = libs.createElement("Label", {
            get text() {
              return GetLocalization(item.localization);
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$45, "text", GetLocalization(item.localization), _$p));
          return _el$45;
        }
      })
    }));
    libs.setProp(_el$15, "scroll", "y");
    libs.insert(_el$15, libs.createComponent(libs.For, {
      get each() {
        return guideContents();
      },
      children: (content, index) => (() => {
        const _el$46 = libs.createElement("Panel", {
            "class": "GuideItem"
          }, null),
          _el$47 = libs.createElement("Panel", {
            "class": "GuideLine"
          }, _el$46);
        libs.insert(_el$46, libs.createComponent(EOM_Button.EOM_BaseButton, {
          width: "100%",
          onactivate: () => {
            ReportCommunity(`guide_content_${selectedGuideTag() ?? "home"}`);
            OpenExternalURL2(content.link);
          },
          get children() {
            const _el$48 = libs.createElement("Label", {
              get text() {
                return content.title ?? "";
              }
            }, null);
            libs.effect(_$p => libs.setProp(_el$48, "text", content.title ?? "", _$p));
            return _el$48;
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$47, "visible", index() != 0, _$p));
        return _el$46;
      })()
    }), _el$16);
    libs.setProp(_el$18, "flowChildren", "right");
    libs.setProp(_el$18, "marginTop", "18px");
    libs.setProp(_el$22, "scroll", "y");
    libs.insert(_el$22, libs.createComponent(libs.For, {
      get each() {
        return notices();
      },
      children: (notice, index) => (() => {
        const _el$49 = libs.createElement("Panel", {
            "class": "NoticeItem"
          }, null),
          _el$50 = libs.createElement("Panel", {
            "class": "NoticeLine",
            hittest: false
          }, _el$49);
        libs.insert(_el$49, libs.createComponent(EOM_Button.EOM_BaseButton, {
          width: "100%",
          flowChildren: "right",
          onactivate: () => {
            ReportCommunity("notice");
            OpenExternalURL2(notice.link);
          },
          get children() {
            return [(() => {
              const _el$51 = libs.createElement("Label", {
                "class": "NoticeLabel",
                get text() {
                  return notice.title ?? "";
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$51, "text", notice.title ?? "", _$p));
              return _el$51;
            })(), (() => {
              const _el$52 = libs.createElement("Label", {
                "class": "NoticeDate",
                get text() {
                  return FormatDate(notice.publishedAt);
                }
              }, null);
              libs.effect(_$p => libs.setProp(_el$52, "text", FormatDate(notice.publishedAt), _$p));
              return _el$52;
            })()];
          }
        }), null);
        libs.effect(_$p => libs.setProp(_el$50, "visible", index() != 0, _$p));
        return _el$49;
      })()
    }), null);
    libs.insert(_el$22, libs.createComponent(libs.Show, {
      get when() {
        return notices().length == 0;
      },
      get children() {
        const _el$23 = libs.createElement("Label", {
          "class": "CommunityState NoticeState",
          get text() {
            return GetLocalization(homeLoading() ? "#Community_Loading" : homeError() ? "#Community_LoadFailed" : "#Community_Empty");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$23, "text", GetLocalization(homeLoading() ? "#Community_Loading" : homeError() ? "#Community_LoadFailed" : "#Community_Empty"), _$p));
        return _el$23;
      }
    }), null);
    libs.setProp(_el$28, "align", "center center");
    libs.setProp(_el$28, "flowChildren", "right");
    libs.insert(_el$28, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "ClaimBtn",
      get enabled() {
        return libs.memo(() => !!(!weeklyStateLoading() && !weeklyClaiming()))() && weeklyState() == "available";
      },
      onactivate: claimWeeklyGift,
      get children() {
        const _el$29 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "down"
          }, null),
          _el$30 = libs.createElement("Label", {
            "class": "GiftName",
            get text() {
              return GetLocalization("#Community_Weekly_Name");
            }
          }, _el$29),
          _el$31 = libs.createElement("Panel", {
            "class": "GiftDescContainer"
          }, _el$29),
          _el$32 = libs.createElement("Label", {
            "class": "GiftDesc",
            get text() {
              return GetLocalization("#Community_Weekly_Items");
            }
          }, _el$31),
          _el$33 = libs.createElement("Label", {
            "class": "GiftState",
            get text() {
              return libs.memo(() => !!weeklyStateLoading())() ? GetLocalization("#Community_Loading") : libs.memo(() => !!weeklyClaiming())() ? GetLocalization("#Community_Weekly_Claiming") : libs.memo(() => weeklyState() == "received")() ? GetLocalization("#Community_Weekly_Claimed") : weeklyStatus() || GetLocalization("#Community_Weekly_Claim");
            }
          }, _el$29);
        libs.setProp(_el$29, "align", "center center");
        libs.setProp(_el$29, "flowChildren", "down");
        libs.effect(_p$ => {
          const _v$3 = GetLocalization("#Community_Weekly_Name"),
            _v$4 = GetLocalization("#Community_Weekly_Items"),
            _v$5 = libs.memo(() => !!weeklyStateLoading())() ? GetLocalization("#Community_Loading") : libs.memo(() => !!weeklyClaiming())() ? GetLocalization("#Community_Weekly_Claiming") : libs.memo(() => weeklyState() == "received")() ? GetLocalization("#Community_Weekly_Claimed") : weeklyStatus() || GetLocalization("#Community_Weekly_Claim");
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$30, "text", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$32, "text", _v$4, _p$._v$4));
          _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$33, "text", _v$5, _p$._v$5));
          return _p$;
        }, {
          _v$3: undefined,
          _v$4: undefined,
          _v$5: undefined
        });
        return _el$29;
      }
    }), null);
    libs.insert(_el$28, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "ClaimBtn",
      onactivate: () => {
        ReportCommunity("cdk");
        OpenExternalURL2(CDK_LINKS[lang]);
      },
      get children() {
        const _el$34 = libs.createElement("Panel", {
            align: "center center",
            flowChildren: "down"
          }, null),
          _el$35 = libs.createElement("Label", {
            "class": "GiftName",
            get text() {
              return GetLocalization("#Community_CDK_Name");
            }
          }, _el$34),
          _el$36 = libs.createElement("Panel", {
            "class": "GiftDescContainer"
          }, _el$34),
          _el$37 = libs.createElement("Label", {
            "class": "GiftDesc",
            get text() {
              return GetLocalization("#Community_CDK_Desc");
            }
          }, _el$36),
          _el$38 = libs.createElement("Label", {
            "class": "GiftState",
            get text() {
              return GetLocalization("#Community_CDK_Action");
            }
          }, _el$34);
        libs.setProp(_el$34, "align", "center center");
        libs.setProp(_el$34, "flowChildren", "down");
        libs.effect(_p$ => {
          const _v$6 = GetLocalization("#Community_CDK_Name"),
            _v$7 = GetLocalization("#Community_CDK_Desc"),
            _v$8 = GetLocalization("#Community_CDK_Action");
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$35, "text", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$37, "text", _v$7, _p$._v$7));
          _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$38, "text", _v$8, _p$._v$8));
          return _p$;
        }, {
          _v$6: undefined,
          _v$7: undefined,
          _v$8: undefined
        });
        return _el$34;
      }
    }), null);
    libs.setProp(_el$42, "align", "center center");
    libs.setProp(_el$42, "flowChildren", "right");
    libs.insert(_el$43, libs.createComponent(libs.For, {
      each: FEEDBACK_TYPES,
      children: item => libs.createComponent(EOM_Button.EOM_BaseButton, {
        "class": "FeedTypeBtn",
        get classList() {
          return {
            Selected: feedbackType() == item.type
          };
        },
        get text() {
          return GetLocalization(item.localization);
        },
        onactivate: () => setFeedbackType(item.type)
      })
    }));
    libs.insert(_el$42, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
      multiline: true,
      maxchars: 2000,
      get text() {
        return feedbackContent();
      },
      get placeholder() {
        return GetLocalization("#Community_Feedback_Placeholder");
      },
      onChange: (_, __, text) => {
        setFeedbackContent(text);
        setFeedbackStatus("");
      }
    }), null);
    libs.insert(_el$42, libs.createComponent(EOM_Button.EOM_BaseButton, {
      "class": "PushBtn",
      get enabled() {
        return libs.memo(() => !!(!feedbackSubmitting() && feedbackCooldown() == 0))() && feedbackContent().trim().length > 5;
      },
      get text() {
        return libs.memo(() => !!feedbackSubmitting())() ? GetLocalization("#Community_Feedback_Submitting") : libs.memo(() => feedbackCooldown() > 0)() ? LocalizeWithVars("#Community_Feedback_Cooldown", {
          seconds: feedbackCooldown()
        }) : GetLocalization("#Community_Feedback_Submit");
      },
      onactivate: submitFeedback
    }), null);
    libs.insert(_el$41, libs.createComponent(libs.Show, {
      get when() {
        return feedbackStatus() != "";
      },
      get children() {
        const _el$44 = libs.createElement("Label", {
          "class": "FeedbackStatus",
          get text() {
            return feedbackStatus();
          }
        }, null);
        libs.effect(_p$ => {
          const _v$9 = {
              Success: feedbackSucceeded()
            },
            _v$0 = feedbackStatus();
          _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$44, "classList", _v$9, _p$._v$9));
          _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$44, "text", _v$0, _p$._v$0));
          return _p$;
        }, {
          _v$9: undefined,
          _v$0: undefined
        });
        return _el$44;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$1 = GetLocalization("#Community_GameGuide"),
        _v$10 = guideContents().length == 0,
        _v$11 = GetLocalization(guideLoading() ? "#Community_Loading" : guideError() ? "#Community_LoadFailed" : "#Community_Empty"),
        _v$12 = GetLocalization("#Community_GameNotice"),
        _v$13 = GetLocalization("#Community_GameWelfare"),
        _v$14 = GetLocalization("#Community_Feedback_Title");
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$11, "text", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$16, "visible", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$16, "text", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$20, "text", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$26, "text", _v$13, _p$._v$13));
      _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$40, "text", _v$14, _p$._v$14));
      return _p$;
    }, {
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined
    });
    return _el$9;
  })();
};
function CommunityRoot() {
  const [useOnlineCommunityURL, setUseOnlineCommunityURL] = libs.createSignal(false);
  const [switchingCommunityURL, setSwitchingCommunityURL] = libs.createSignal(false);
  let communityOpenedAt;
  let testURLRequest;
  const reportStayTime = () => {
    if (communityOpenedAt == undefined) return;
    const seconds = Math.max(0, Math.round(Date.now() / 1000 - communityOpenedAt));
    communityOpenedAt = undefined;
    ReportCommunity(`stay_${seconds}`);
  };
  libs.createEffect(previousVisible => {
    const visible = show();
    if (visible && !previousVisible) {
      communityOpenedAt = Date.now() / 1000;
      ReportCommunity("entry");
    } else if (!visible && previousVisible) {
      reportStayTime();
    }
    return visible;
  }, false);
  libs.createEffect(previousHide => {
    const visible = show();
    if (!visible) {
      setInGameBrowserURL(undefined);
    }
    const hide = HIDE_MENU_BAR ;
    if (hide != previousHide) {
      GameEvents.SendEventClientSide("client_side_event", {
        event_name: "set_menu_bar_visible",
        event_data: JSON.stringify({
          key: "community",
          hide
        })
      });
    }
    return hide;
  }, false);
  libs.onCleanup(() => {
    if (testURLRequest != undefined) {
      CancelRequest(testURLRequest);
    }
    reportStayTime();
    GameEvents.SendEventClientSide("client_side_event", {
      event_name: "set_menu_bar_visible",
      event_data: JSON.stringify({
        key: "community",
        hide: false
      })
    });
  });
  const handleClose = () => {
    setInGameBrowserURL(undefined);
    ClientSideEvent("custom_ui_toggle_windows", {
      windowName: "MenuButton_community",
      state: 0
    });
  };
  const switchCommunityURL = () => {
    if (!Game.IsInToolsMode() || switchingCommunityURL()) return;
    const useOnline = !useOnlineCommunityURL();
    setSwitchingCommunityURL(true);
    testURLRequest = ServerRequest("community_set_test_url", {
      useOnline
    }, result => {
      testURLRequest = undefined;
      setSwitchingCommunityURL(false);
      if (!result.ok) {
        ErrorMessage(result.message ?? GetLocalization("#Community_LoadFailed"));
        return;
      }
      setUseOnlineCommunityURL(result.useOnline);
      communityOpenHandler?.(true);
    }, 5, () => {
      testURLRequest = undefined;
      setSwitchingCommunityURL(false);
      ErrorMessage(GetLocalization("#Community_LoadFailed"));
    });
  };
  return (() => {
    const _el$53 = libs.createElement("Panel", {
        id: "CommunityRoot",
        get hittest() {
          return show();
        },
        get acceptsfocus() {
          return show();
        }
      }, null),
      _el$54 = libs.createElement("Panel", {
        id: "AspectAdpater"
      }, _el$53);
    libs.insert(_el$54, libs.createComponent(Community, {}));
    libs.insert(_el$53, libs.createComponent(EOM_Button.EOM_CloseButton, {
      onactivate: handleClose
    }), null);
    libs.insert(_el$53, libs.createComponent(libs.Show, {
      get when() {
        return inGameBrowserURL();
      },
      get children() {
        const _el$55 = libs.createElement("Panel", {
            id: "CommunityBrowser"
          }, null),
          _el$56 = libs.createElement("GenericPanel", {
            id: "CommunityBrowserContent",
            acceptsinput: true,
            hittest: true,
            type: "DOTAHTMLPanel",
            get url() {
              return inGameBrowserURL();
            }
          }, _el$55);
        libs.setProp(_el$56, "onload", self => {
          self.SetAcceptsFocus(true);
          self.SetIgnoreCursor(true);
          $.Schedule(0.1, () => {
            if (!self.IsValid()) return;
            self.SetIgnoreCursor(false);
            self.SetFocus();
          });
        });
        libs.insert(_el$55, libs.createComponent(EOM_Button.EOM_CloseButton, {
          id: "CommunityBrowserClose",
          onactivate: () => setInGameBrowserURL(undefined)
        }), null);
        libs.effect(_$p => libs.setProp(_el$56, "url", inGameBrowserURL(), _$p));
        return _el$55;
      }
    }), null);
    libs.insert(_el$53, libs.createComponent(EOM_Button.EOM_BaseButton, {
      id: "TESTButton",
      get visible() {
        return Game.IsInToolsMode();
      },
      get enabled() {
        return !switchingCommunityURL();
      },
      onactivate: switchCommunityURL,
      get children() {
        const _el$57 = libs.createElement("Label", {
          get text() {
            return GetLocalization(switchingCommunityURL() ? "#Community_Test_Switching" : useOnlineCommunityURL() ? "#Community_Test_SwitchLocal" : "#Community_Test_SwitchOnline");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$57, "text", GetLocalization(switchingCommunityURL() ? "#Community_Test_Switching" : useOnlineCommunityURL() ? "#Community_Test_SwitchLocal" : "#Community_Test_SwitchOnline"), _$p));
        return _el$57;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$15 = {
          Show: show()
        },
        _v$16 = show(),
        _v$17 = show();
      _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$53, "classList", _v$15, _p$._v$15));
      _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$53, "hittest", _v$16, _p$._v$16));
      _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$53, "acceptsfocus", _v$17, _p$._v$17));
      return _p$;
    }, {
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined
    });
    return _el$53;
  })();
}
libs.render(() => libs.createComponent(CommunityRoot, {}), $.GetContextPanel());