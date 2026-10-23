--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Popup = require('./EOM_Popup.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Loading = require('./EOM_Loading.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_TextEntry = require('./EOM_TextEntry.js');
var solid_utils = require('./solid_utils.js');

const SET_PASSWORD_URL = "https://eomaccount.eomgames.net";
const LAUNCH_ASSISTANT_URL = "https://vgbattle.eomgames.net/";
const LOCAL_AUTH_PREVIEW = false;
const LOGIN_FLOW_STEPS = [{
  key: "login",
  label: "#LoginStep_login"
}, {
  key: "setting",
  label: "#LoginStep_setting"
}, {
  key: "equipment",
  label: "#LoginStep_equipment"
}, {
  key: "attributes",
  label: "#LoginStep_attributes"
}];
const gameState = solid_utils.createNetDataSignal("common", "game_state", {
  state: "GameState_Login",
  start_time: -1,
  end_time: -1
});
const loginState = solid_utils.createNetDataSignal("common", "login_state", {});
const settings = solid_utils.createNetDataSignal("common", "settings", {
  is_local_host: false,
  is_in_tools_mode: false,
  is_cheat_mode: false
});
function Root() {
  const [showPasswordBrowser, setShowPasswordBrowser] = libs.createSignal(false);
  const [previewLocalAuth, setPreviewLocalAuth] = libs.createSignal(LOCAL_AUTH_PREVIEW );
  const [inviteKey, setInviteKey] = libs.createSignal("");
  const [submittingInviteKey, setSubmittingInviteKey] = libs.createSignal(false);
  const [authPassword, setAuthPassword] = libs.createSignal("");
  const [submittingAuth, setSubmittingAuth] = libs.createSignal(false);
  const localPlayerLoginState = libs.createMemo(() => previewLocalAuth() ? PlayerLoginState.NeedAuth : loginState()?.[Players.GetLocalPlayer()]?.state ?? PlayerLoginState.None);
  const localPlayerSteps = libs.createMemo(() => previewLocalAuth() ? undefined : loginState()?.[Players.GetLocalPlayer()]?.steps);
  const isLocalHost = libs.createMemo(() => settings()?.is_local_host == true || settings()?.is_local_host);
  const openLaunchAssistant = () => $.DispatchEvent("ExternalBrowserGoToURL", LAUNCH_ASSISTANT_URL);
  const copyLaunchAssistantLink = () => $.DispatchEvent("CopyStringToClipboard", LAUNCH_ASSISTANT_URL, null);
  const LaunchAssistantTip = () => (() => {
    const _el$ = libs.createElement("Panel", {
        id: "LaunchAssistantTip"
      }, null),
      _el$2 = libs.createElement("Label", {
        id: "LaunchAssistantMainTitle",
        get text() {
          return GetLocalization("#TeamSelect_LaunchAssistantMainTitle", "请下载【VG游廊启动助手】");
        }
      }, _el$),
      _el$3 = libs.createElement("Label", {
        id: "LaunchAssistantTitle",
        get text() {
          return GetLocalization("#TeamSelect_LaunchAssistantTitle", "目前需使用【VG游廊启动助手】进入游戏，可正常游玩！");
        }
      }, _el$),
      _el$4 = libs.createElement("Button", {
        id: "LaunchAssistantLink"
      }, _el$),
      _el$5 = libs.createElement("Label", {
        id: "LaunchAssistantLinkLabel",
        get text() {
          return GetLocalization("#TeamSelect_LaunchAssistantLink", "点此下载VG游廊启动助手");
        }
      }, _el$4),
      _el$6 = libs.createElement("Button", {
        id: "CopyLaunchAssistantLink"
      }, _el$),
      _el$7 = libs.createElement("Label", {
        id: "CopyLaunchAssistantLinkLabel",
        get text() {
          return GetLocalization("#TeamSelect_CopyLaunchAssistantLink", "点此复制启动助手下载链接");
        }
      }, _el$6),
      _el$8 = libs.createElement("Label", {
        id: "LaunchAssistantNotice",
        get text() {
          return GetLocalization("#TeamSelect_LaunchAssistantNotice", "请注意：Dota2浏览器不支持下载，请复制链接到外部浏览器打开！");
        }
      }, _el$),
      _el$9 = libs.createElement("Label", {
        id: "LaunchAssistantStepTwo",
        get text() {
          return GetLocalization("#TeamSelect_LaunchAssistantStepTwo", "下载【VG游廊启动助手】，绑定Steam，创建房间，即刻开始游戏！");
        }
      }, _el$);
    libs.setProp(_el$4, "onactivate", openLaunchAssistant);
    libs.setProp(_el$4, "oncontextmenu", copyLaunchAssistantLink);
    libs.setProp(_el$6, "onactivate", copyLaunchAssistantLink);
    libs.effect(_p$ => {
      const _v$ = GetLocalization("#TeamSelect_LaunchAssistantMainTitle", "请下载【VG游廊启动助手】"),
        _v$2 = GetLocalization("#TeamSelect_LaunchAssistantTitle", "目前需使用【VG游廊启动助手】进入游戏，可正常游玩！"),
        _v$3 = GetLocalization("#TeamSelect_LaunchAssistantLink", "点此下载VG游廊启动助手"),
        _v$4 = GetLocalization("#TeamSelect_CopyLaunchAssistantLink", "点此复制启动助手下载链接"),
        _v$5 = GetLocalization("#TeamSelect_LaunchAssistantNotice", "请注意：Dota2浏览器不支持下载，请复制链接到外部浏览器打开！"),
        _v$6 = GetLocalization("#TeamSelect_LaunchAssistantStepTwo", "下载【VG游廊启动助手】，绑定Steam，创建房间，即刻开始游戏！");
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "text", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$5, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "text", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$8, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$9, "text", _v$6, _p$._v$6));
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
  })();
  libs.createEffect(() => {
    $.GetContextPanel().SwitchClass("GameState_Login", previewLocalAuth() ? "GameState_Login" : gameState().state);
  });
  libs.createEffect(libs.on(localPlayerLoginState, state => {
    print(localPlayerLoginState());
    if (state != PlayerLoginState.NoPermission) {
      setSubmittingInviteKey(false);
    }
    if (state != PlayerLoginState.NeedAuth) {
      setSubmittingAuth(false);
      setShowPasswordBrowser(false);
    }
  }));
  const submitInviteKey = () => {
    let key = inviteKey().trim();
    if (key === "") return;
    setSubmittingInviteKey(true);
    CallAction("/v1/white_list/add", {
      key
    });
    GameEvents.SendCustomEventToServer("login_retry_white_list", {});
  };
  const submitAuthPassword = () => {
    if (previewLocalAuth()) return;
    let password = authPassword().trim();
    if (password === "") return;
    setSubmittingAuth(true);
    ServerRequest("player_auth_login", {
      password
    }, result => {
      if (result.code !== 0 && result.code !== 200) {
        setSubmittingAuth(false);
      }
    }, undefined, () => setSubmittingAuth(false));
  };
  return [libs.createComponent(EOM_Button.EOM_BaseButton, {
    id: "Return",
    "class": "MenuButton",
    onactivate: self => $.DispatchEvent("DOTAHUDShowDashboard", self),
    get children() {
      return [libs.createElement("Panel", {
        id: "SelectedHover"
      }, null), (() => {
        const _el$1 = libs.createElement("Panel", {
            id: "SelectParticleRoot"
          }, null);
          libs.createElement("DOTAParticleScenePanel", {
            id: "SelectParticle",
            particleName: "particles/ui/game/ui_game_general_special_effects_02_fx.vpcf",
            cameraOrigin: "0 0 60",
            fov: 40,
            lookAt: "0 0 0",
            hittest: false,
            squarePixels: true
          }, _el$1);
        return _el$1;
      })(), (() => {
        const _el$11 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("BGImage", "Return");
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$11, "class", libs.classNames("BGImage", "Return"), _$p));
        return _el$11;
      })(), (() => {
        const _el$12 = libs.createElement("Label", {
          get ["class"]() {
            return libs.classNames("MenuLabel", "Return");
          },
          text: "#MenuButton_Return"
        }, null);
        libs.effect(_$p => libs.setProp(_el$12, "class", libs.classNames("MenuLabel", "Return"), _$p));
        return _el$12;
      })()];
    }
  }), (() => {
    const _el$13 = libs.createElement("Panel", {
      id: "PlayerReadyUp"
    }, null);
    libs.insert(_el$13, libs.createComponent(libs.For, {
      get each() {
        return Object.keys(loginState());
      },
      children: (_, index) => {
        const playerID = () => toFiniteNumber(_);
        const playerSteamID = () => {
          return Game.GetPlayerInfo(playerID())?.player_steamid;
        };
        const state = () => {
          return loginState()?.[playerID()]?.state ?? PlayerLoginState.None;
        };
        return (() => {
          const _el$43 = libs.createElement("Panel", {
              get ["class"]() {
                return libs.classNames("PlayerReadySlot", {
                  Accepted: state() == PlayerLoginState.Success,
                  Declined: state() != PlayerLoginState.Success
                });
              }
            }, null),
            _el$44 = libs.createElement("DOTAAvatarImage", {
              id: "AvatarImage",
              get steamid() {
                return playerSteamID();
              },
              width: "100%",
              height: "100%",
              hittest: false
            }, _el$43);
            libs.createElement("Panel", {
              "class": "AcceptedMatch",
              hittest: false
            }, _el$43);
            libs.createElement("Panel", {
              "class": "DeclinedMatch",
              hittest: false
            }, _el$43);
          libs.setProp(_el$44, "width", "100%");
          libs.setProp(_el$44, "height", "100%");
          libs.effect(_p$ => {
            const _v$9 = libs.classNames("PlayerReadySlot", {
                Accepted: state() == PlayerLoginState.Success,
                Declined: state() != PlayerLoginState.Success
              }),
              _v$0 = playerSteamID();
            _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$43, "class", _v$9, _p$._v$9));
            _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$44, "steamid", _v$0, _p$._v$0));
            return _p$;
          }, {
            _v$9: undefined,
            _v$0: undefined
          });
          return _el$43;
        })();
      }
    }));
    return _el$13;
  })(), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerSteps();
    },
    children: () => (() => {
      const _el$47 = libs.createElement("Panel", {
        id: "LoginStepsContainer"
      }, null);
      libs.insert(_el$47, libs.createComponent(libs.For, {
        each: LOGIN_FLOW_STEPS,
        children: (step, index) => {
          const completed = () => localPlayerSteps()?.[step.key] ?? false;
          return (() => {
            const _el$48 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("LoginStepItem", {
                    Completed: completed()
                  });
                }
              }, null);
              libs.createElement("Panel", {
                "class": "LoginStepIndicator"
              }, _el$48);
              const _el$50 = libs.createElement("Label", {
                "class": "LoginStepLabel",
                color: "white",
                get text() {
                  return `${index() + 1}. ${GetLocalization(step.label)}`;
                }
              }, _el$48);
            libs.effect(_p$ => {
              const _v$1 = libs.classNames("LoginStepItem", {
                  Completed: completed()
                }),
                _v$10 = `${index() + 1}. ${GetLocalization(step.label)}`;
              _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$48, "class", _v$1, _p$._v$1));
              _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$50, "text", _v$10, _p$._v$10));
              return _p$;
            }, {
              _v$1: undefined,
              _v$10: undefined
            });
            return _el$48;
          })();
        }
      }));
      return _el$47;
    })()
  }), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerLoginState() == PlayerLoginState.MatchIDPre;
    },
    get children() {
      const _el$14 = libs.createElement("Panel", {
          id: "LoadingContainer"
        }, null),
        _el$15 = libs.createElement("Label", {
          color: "white",
          get text() {
            return GetLocalization("#Login_MatchIDPreparing");
          },
          horizontalAlign: "center",
          marginTop: "20px"
        }, _el$14);
      libs.insert(_el$14, libs.createComponent(EOM_Loading.EOM_Loading, {
        id: "Loading"
      }), _el$15);
      libs.setProp(_el$15, "horizontalAlign", "center");
      libs.setProp(_el$15, "marginTop", "20px");
      libs.effect(_$p => libs.setProp(_el$15, "text", GetLocalization("#Login_MatchIDPreparing"), _$p));
      return _el$14;
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerLoginState() == PlayerLoginState.Failed;
    },
    get children() {
      const _el$16 = libs.createElement("Panel", {
          id: "LoadingContainer"
        }, null),
        _el$17 = libs.createElement("Label", {
          color: "white",
          get text() {
            return GetLocalization("#Login_MatchIDFailed");
          },
          horizontalAlign: "center"
        }, _el$16);
      libs.setProp(_el$17, "horizontalAlign", "center");
      libs.effect(_$p => libs.setProp(_el$17, "text", GetLocalization("#Login_MatchIDFailed"), _$p));
      return _el$16;
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerLoginState() == PlayerLoginState.None;
    },
    get children() {
      const _el$18 = libs.createElement("Panel", {
          id: "LoadingContainer"
        }, null),
        _el$19 = libs.createElement("Label", {
          color: "white",
          text: "#Login_Loading",
          horizontalAlign: "center",
          marginTop: "20px"
        }, _el$18);
      libs.insert(_el$18, libs.createComponent(EOM_Loading.EOM_Loading, {
        id: "Loading"
      }), _el$19);
      libs.setProp(_el$19, "horizontalAlign", "center");
      libs.setProp(_el$19, "marginTop", "20px");
      return _el$18;
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerLoginState() == PlayerLoginState.MatchIDPre || localPlayerLoginState() == PlayerLoginState.None;
    },
    get children() {
      return libs.createComponent(LaunchAssistantTip, {});
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return previewLocalAuth() || isLocalHost() && localPlayerLoginState() == PlayerLoginState.NeedAuth;
    },
    get children() {
      const _el$20 = libs.createElement("Panel", {
          id: "InviteKey"
        }, null),
        _el$21 = libs.createElement("Panel", {
          id: "InviteKeyContainer"
        }, _el$20),
        _el$22 = libs.createElement("Label", {
          id: "InviteKeyTitle",
          get text() {
            return GetLocalization("#Login_LocalAuth_Title");
          }
        }, _el$21),
        _el$23 = libs.createElement("Label", {
          id: "InviteKeyDesc",
          html: true,
          get text() {
            return GetLocalization("#Login_LocalAuth_Desc");
          }
        }, _el$21),
        _el$24 = libs.createElement("Panel", {
          id: "InviteKeyForm"
        }, _el$21),
        _el$25 = libs.createElement("Panel", {
          id: "LocalAuthActions"
        }, _el$21);
      libs.insert(_el$24, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
        id: "InviteKeyEntry",
        textmode: "password",
        get text() {
          return authPassword();
        },
        get placeholder() {
          return GetLocalization("#Login_LocalAuth_Placeholder");
        },
        onChange: (self, _, text) => setAuthPassword(text),
        oninputsubmit: submitAuthPassword
      }), null);
      libs.insert(_el$24, libs.createComponent(EOM_Button.EOM_Button, {
        id: "InviteKeyConfirm",
        get enabled() {
          return libs.memo(() => !!(!previewLocalAuth() && !submittingAuth()))() && authPassword().trim() !== "";
        },
        size: "Small",
        get text() {
          return libs.memo(() => !!submittingAuth())() ? GetLocalization("#Login_Submitting") : GetLocalization("#Login_Unlock");
        },
        onactivate: submitAuthPassword
      }), null);
      libs.insert(_el$25, libs.createComponent(EOM_Button.EOM_Button, {
        id: "SetPassword",
        size: "Small",
        get text() {
          return GetLocalization("#Login_SetPassword");
        },
        onactivate: () => {
          {
            $.DispatchEvent("ExternalBrowserGoToURL", SET_PASSWORD_URL);
          }
        }
      }), null);
      libs.insert(_el$25, libs.createComponent(libs.Show, {
        get when() {
          return previewLocalAuth();
        },
        get children() {
          return libs.createComponent(EOM_Button.EOM_Button, {
            size: "Small",
            color: "Cancel",
            get text() {
              return GetLocalization("#Login_LocalAuth_ClosePreview");
            },
            onactivate: () => {
              setAuthPassword("");
              setPreviewLocalAuth(false);
            }
          });
        }
      }), null);
      libs.insert(_el$21, libs.createComponent(libs.Show, {
        get when() {
          return previewLocalAuth();
        },
        get children() {
          const _el$26 = libs.createElement("Label", {
            id: "LocalAuthPreviewHint",
            get text() {
              return GetLocalization("#Login_LocalAuth_PreviewHint");
            }
          }, null);
          libs.effect(_$p => libs.setProp(_el$26, "text", GetLocalization("#Login_LocalAuth_PreviewHint"), _$p));
          return _el$26;
        }
      }), null);
      libs.effect(_p$ => {
        const _v$7 = GetLocalization("#Login_LocalAuth_Title"),
          _v$8 = GetLocalization("#Login_LocalAuth_Desc");
        _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$22, "text", _v$7, _p$._v$7));
        _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$23, "text", _v$8, _p$._v$8));
        return _p$;
      }, {
        _v$7: undefined,
        _v$8: undefined
      });
      return _el$20;
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerLoginState() == PlayerLoginState.NoPermission;
    },
    get children() {
      const _el$27 = libs.createElement("Panel", {
          id: "InviteKey"
        }, null),
        _el$28 = libs.createElement("Panel", {
          id: "InviteKeyContainer"
        }, _el$27);
        libs.createElement("Label", {
          id: "InviteKeyTitle",
          text: "#Login_NoPermission_Title"
        }, _el$28);
        libs.createElement("Label", {
          id: "InviteKeyDesc",
          text: "#Login_NoPermission_Desc"
        }, _el$28);
        const _el$31 = libs.createElement("Panel", {
          id: "InviteKeyForm"
        }, _el$28);
      libs.insert(_el$31, libs.createComponent(EOM_TextEntry.EOM_TextEntry, {
        id: "InviteKeyEntry",
        get text() {
          return inviteKey();
        },
        placeholder: "#Login_InviteKey_Placeholder",
        onChange: (self, _, text) => setInviteKey(text),
        oninputsubmit: submitInviteKey
      }), null);
      libs.insert(_el$31, libs.createComponent(EOM_Button.EOM_Button, {
        id: "InviteKeyConfirm",
        get enabled() {
          return libs.memo(() => !!!submittingInviteKey())() && inviteKey().trim() !== "";
        },
        size: "Small",
        get text() {
          return libs.memo(() => !!submittingInviteKey())() ? GetLocalization("#Login_Submitting") : GetLocalization("#Login_Unlock");
        },
        onactivate: submitInviteKey
      }), null);
      return _el$27;
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return localPlayerLoginState() == PlayerLoginState.Banned;
    },
    get children() {
      return libs.createComponent(EOM_Popup.EOM_Popup, {
        id: "BannedContainer",
        size: "normal",
        "class": "EOM_PopupMainShow",
        hideClose: true,
        title: "Login_Banned",
        get children() {
          return [libs.createElement("Label", {
            id: "BannedContent",
            text: "#Login_Banned_Content",
            html: true
          }, null), (() => {
            const _el$33 = libs.createElement("Panel", {
                id: "BanCountdownContainer"
              }, null);
              libs.createElement("Label", {
                text: "#Login_Banned_Endtime"
              }, _el$33);
            libs.insert(_el$33, libs.createComponent(EOM_Countdown.EOM_Countdown, {
              id: "BanCountdown",
              get endTime() {
                return loginState()?.[Players.GetLocalPlayer()]?.ban_end_time ?? 0;
              }
            }), null);
            return _el$33;
          })(), (() => {
            const _el$35 = libs.createElement("Panel", {
                flowChildren: "down",
                align: "right bottom",
                marginBottom: "20px"
              }, null),
              _el$36 = libs.createElement("Panel", {
                id: "BanQrCode",
                get ["class"]() {
                  return Language();
                }
              }, _el$35);
              libs.createElement("Label", {
                id: "BanContact",
                text: "#BanContact"
              }, _el$35);
            libs.setProp(_el$35, "flowChildren", "down");
            libs.setProp(_el$35, "align", "right bottom");
            libs.setProp(_el$35, "marginBottom", "20px");
            libs.effect(_$p => libs.setProp(_el$36, "class", Language(), _$p));
            return _el$35;
          })()];
        }
      });
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return showPasswordBrowser();
    },
    get children() {
      const _el$38 = libs.createElement("Panel", {
          id: "PasswordBrowserOverlay",
          hittest: true
        }, null),
        _el$39 = libs.createElement("Panel", {
          id: "PasswordBrowserWindow"
        }, _el$38),
        _el$40 = libs.createElement("Panel", {
          id: "PasswordBrowserHeader"
        }, _el$39),
        _el$41 = libs.createElement("Label", {
          id: "PasswordBrowserTitle",
          get text() {
            return GetLocalization("#Login_SetPassword");
          }
        }, _el$40),
        _el$42 = libs.createElement("GenericPanel", {
          id: "PasswordBrowserContent",
          type: "DOTAHTMLPanel",
          url: SET_PASSWORD_URL,
          acceptsinput: true,
          hittest: true
        }, _el$39);
      libs.setProp(_el$38, "onactivate", () => {});
      libs.insert(_el$40, libs.createComponent(EOM_Button.EOM_CloseButton, {
        id: "PasswordBrowserClose",
        onactivate: () => setShowPasswordBrowser(false)
      }), null);
      libs.setProp(_el$42, "url", SET_PASSWORD_URL);
      libs.setProp(_el$42, "onload", self => {
        self.SetAcceptsFocus(true);
        self.SetIgnoreCursor(false);
        self.SetFocus();
      });
      libs.effect(_$p => libs.setProp(_el$41, "text", GetLocalization("#Login_SetPassword"), _$p));
      return _el$38;
    }
  })];
}
(() => {
  $.GetContextPanel().SetPanelEvent("onactivate", () => {});
  libs.render(() => libs.createComponent(Root, {}), $.GetContextPanel());
})();