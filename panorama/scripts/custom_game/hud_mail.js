--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Countdown = require('./EOM_Countdown.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_MenuLayout = require('./EOM_MenuLayout.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./service_netdata_helper.js');
require('./EOM_RedMark.js');
require('./EOM_ImageNumber.js');
require('./Player.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

const language = Language();
if (Game.IsInToolsMode()) {
  [{
    mail_id: 0,
    category: "category",
    title: "这是本地测试代码",
    title_en: "title_en",
    title_ru: "title_ru",
    sub_title: "这是本地测试代码",
    sub_title_en: "sub_title_ensub_title_ensub_title_ensub_title _ensub_title_ensub_title_ensub_title_en",
    sub_title_ru: "sub_title_ru",
    content: Array.from({
      length: 1000
    }).fill("测试").join(),
    content_en: "content_en",
    content_ru: "content_ru",
    expire_time: 0,
    items: [{
      item_id: "190001",
      amounts: 999
    }, {
      item_id: "110001",
      amounts: 999
    }, {
      item_id: "110001",
      amounts: 999
    }],
    step: 0
  }, {
    mail_id: 0,
    category: "category",
    title: "这是本地测试代码",
    title_en: "title_en",
    title_ru: "title_ru",
    sub_title: "这是本地测试代码",
    sub_title_en: "sub_title_en",
    sub_title_ru: "sub_title_ru",
    content: Array.from({
      length: 10
    }).fill("测试").join(),
    content_en: "content_en",
    content_ru: "content_ru",
    expire_time: 0,
    items: [{
      item_id: "190001",
      amounts: 999
    }, {
      item_id: "110002",
      amounts: 999
    }, {
      item_id: "110002",
      amounts: 999
    }],
    step: 1
  }, {
    mail_id: 0,
    category: "category",
    title: "这是本地测试代码",
    title_en: "title_en",
    title_ru: "title_ru",
    sub_title: "这是本地测试代码",
    sub_title_en: "sub_title_en",
    sub_title_ru: "sub_title_ru",
    content: Array.from({
      length: 1000
    }).fill("测试").join(),
    content_en: "content_en",
    content_ru: "content_ru",
    expire_time: 0,
    items: [{
      item_id: "190001",
      amounts: 999
    }, {
      item_id: "110003",
      amounts: 999
    }, {
      item_id: "110003",
      amounts: 999
    }],
    step: 2
  }];
}
const getTitle = mailData => {
  if (mailData == undefined) {
    return "";
  }
  const mapData = {
    ["schinese"]: mailData.title,
    ["english"]: mailData.title_en,
    ["russian"]: mailData.title_ru
  };
  return mapData[language] ?? mailData.title_en;
};
const getSubTitle = mailData => {
  if (mailData == undefined) {
    return "";
  }
  const mapData = {
    ["schinese"]: mailData.sub_title,
    ["english"]: mailData.sub_title_en,
    ["russian"]: mailData.sub_title_ru
  };
  return mapData[language] ?? mailData.sub_title_en;
};
const getContent = mailData => {
  if (mailData == undefined) {
    return "";
  }
  const mapData = {
    ["schinese"]: mailData.content,
    ["english"]: mailData.content_en,
    ["russian"]: mailData.content_ru
  };
  return mapData[language] ?? mailData.content_en;
};
const mailOperate = (mail_id, step, operate_type) => {
  CallAction("/v1/mails/operate", {
    mail_id,
    step,
    operate_type
  });
};
const mailOperateAll = step => {
  CallAction("/v1/mails/operate", {
    step,
    operate_type: 2
  });
  if (step == 9) {
    setMailPreviewIndex(undefined);
  }
};
const [mailPreviewIndex, setMailPreviewIndex] = libs.createSignal();
const [category, setCategory] = libs.createStore({
  "mail_all": []
});
const {
  LayoutMenu,
  show,
  setShow,
  menuName,
  secondTabName,
  setMenuName,
  setSecondTabName
} = EOM_MenuLayout.createMenuLayout("mail", () => category);
const Mail = () => {
  const [mailList, setMailList] = libs.createSignal([]);
  const [filter, setFilter] = libs.createSignal("mail_all");
  const playerMails = solid_utils.createServiceNetData("player_mails", {});
  libs.createEffect(() => {
    if (show()) {
      CallAction("/v1/mails/fetch", {});
    }
  });
  const mailPreview = libs.createMemo(() => {
    if (mailPreviewIndex() != undefined) {
      return mailList()[mailPreviewIndex()];
    }
  });
  libs.createEffect(() => {
    const data = playerMails();
    const nameList = {};
    for (const mid in data) {
      const mailData = data[mid];
      if (nameList[mailData.category] == undefined) {
        nameList[mailData.category] = [];
      }
    }
    setCategory(nameList);
    setMailList(Object.values(data).sort((a, b) => b.mail_id - a.mail_id));
  });
  const needShowRedPoint = libs.createMemo(() => {
    const currentMailList = mailList();
    const now = Date.now() / 1000;
    return currentMailList.some(data => data.expire_time > now && data.step < 2 && data.items.length > 0);
  });
  libs.createEffect(() => {
    CustomUIConfig.SetRedPoint(needShowRedPoint(), "mail");
    print("mail:", needShowRedPoint());
  });
  return libs.createComponent(EOM_MenuLayout.EOM_MenuLayout, {
    id: "MenuButton_mail",
    get show() {
      return show();
    },
    name: "MenuButton_mail",
    get children() {
      return [libs.createComponent(LayoutMenu, {}), libs.createComponent(EOM_MenuLayout.EOM_MenuLayout_Content, {
        id: "MailRoot",
        get children() {
          return libs.createComponent(libs.Show, {
            get when() {
              return mailList().length > 0;
            },
            get fallback() {
              return libs.createComponent(EmptyFallback, {});
            },
            get children() {
              const _el$ = libs.createElement("Panel", {
                  id: "MailBolck"
                }, null),
                _el$2 = libs.createElement("Panel", {
                  id: "MailLeft"
                }, _el$),
                _el$3 = libs.createElement("Panel", {
                  id: "MailList",
                  scroll: "y",
                  "class": "VerticalScrollStyle"
                }, _el$2),
                _el$4 = libs.createElement("Panel", {
                  "class": "ButtonBox"
                }, _el$2),
                _el$5 = libs.createElement("Panel", {
                  id: "MailRight"
                }, _el$),
                _el$6 = libs.createElement("Panel", {
                  id: "MailContent"
                }, _el$5),
                _el$14 = libs.createElement("Panel", {
                  "class": "ButtonBox"
                }, _el$5);
              libs.setProp(_el$3, "scroll", "y");
              libs.insert(_el$3, libs.createComponent(libs.Index, {
                get each() {
                  return mailList();
                },
                children: (mailData, i) => {
                  return libs.createComponent(libs.Show, {
                    get when() {
                      return filter() == "mail_all" || filter() == mailData()?.category;
                    },
                    get children() {
                      return libs.createComponent(MailRow, {
                        get mailData() {
                          return mailData();
                        },
                        callback: () => {
                          setMailPreviewIndex(i);
                        }
                      });
                    }
                  });
                }
              }));
              libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_Button, {
                text: "#mail_action_receive_all",
                color: "Confirm",
                get enabled() {
                  return mailList().some(v => v.step < 2);
                },
                onactivate: () => mailOperateAll(2)
              }), null);
              libs.insert(_el$4, libs.createComponent(EOM_Button.EOM_Button, {
                text: "#mail_action_remove_all",
                marginLeft: "66px",
                color: "Cancel",
                get enabled() {
                  return mailList().some(v => v.step == 2);
                },
                onactivate: () => mailOperateAll(9)
              }), null);
              libs.insert(_el$6, libs.createComponent(libs.Show, {
                get when() {
                  return mailPreview() != undefined;
                },
                get children() {
                  return [(() => {
                    const _el$7 = libs.createElement("Label", {
                      hittest: false,
                      html: true,
                      padding: "0px 16px",
                      get text() {
                        return getTitle(mailPreview());
                      }
                    }, null);
                    libs.setProp(_el$7, "className", "ContentTitle");
                    libs.setProp(_el$7, "padding", "0px 16px");
                    libs.effect(_$p => libs.setProp(_el$7, "text", getTitle(mailPreview()), _$p));
                    return _el$7;
                  })(), libs.createElement("Panel", {
                    "class": "HorizontalLine"
                  }, null), (() => {
                    const _el$9 = libs.createElement("Panel", {
                        scroll: "y"
                      }, null),
                      _el$0 = libs.createElement("Label", {
                        hittest: false,
                        html: true,
                        get text() {
                          return getContent(mailPreview());
                        }
                      }, _el$9);
                    libs.setProp(_el$9, "className", "ContentBody VerticalScrollStyle");
                    libs.setProp(_el$9, "scroll", "y");
                    libs.setProp(_el$0, "className", "ContentLabel");
                    libs.effect(_$p => libs.setProp(_el$0, "text", getContent(mailPreview()), _$p));
                    return _el$9;
                  })(), (() => {
                    const _el$1 = libs.createElement("Panel", {
                        width: "100%",
                        flowChildren: "right",
                        padding: "0px 16px"
                      }, null);
                      libs.createElement("Image", {
                        id: "Attachment"
                      }, _el$1);
                      libs.createElement("Label", {
                        id: "AttachmentLabel",
                        text: "#mail_attachment"
                      }, _el$1);
                    libs.setProp(_el$1, "width", "100%");
                    libs.setProp(_el$1, "flowChildren", "right");
                    libs.setProp(_el$1, "padding", "0px 16px");
                    return _el$1;
                  })(), libs.createElement("Panel", {
                    "class": "HorizontalLine"
                  }, null), (() => {
                    const _el$13 = libs.createElement("Panel", {
                      id: "MailItemList",
                      "class": "HorizontalScrollBar",
                      flowChildren: "right",
                      scroll: "x",
                      hittest: false
                    }, null);
                    libs.setProp(_el$13, "flowChildren", "right");
                    libs.setProp(_el$13, "scroll", "x");
                    libs.insert(_el$13, libs.createComponent(libs.Index, {
                      get each() {
                        return mailPreview()?.items ?? [];
                      },
                      children: (item, index) => libs.createComponent(StoreItem.StoreItemBlock, {
                        get item_id() {
                          return item().item_id;
                        },
                        get amounts() {
                          return item().amounts;
                        }
                      })
                    }));
                    return _el$13;
                  })()];
                }
              }));
              libs.insert(_el$14, libs.createComponent(libs.Switch, {
                get fallback() {
                  return libs.createComponent(EOM_Button.EOM_Button, {
                    text: "#mail_delete",
                    color: "Cancel",
                    get enabled() {
                      return (mailPreview()?.step ?? 0) == 2;
                    },
                    onactivate: () => {
                      const mid = mailPreview()?.mail_id;
                      if (mid) {
                        mailOperate(mid, 9, 1);
                      }
                    }
                  });
                },
                get children() {
                  return libs.createComponent(libs.Match, {
                    get when() {
                      return libs.memo(() => (mailPreview()?.step ?? 0) < 2)() && (mailPreview()?.items ?? "{}") != "{}";
                    },
                    get children() {
                      return libs.createComponent(EOM_Button.EOM_Button, {
                        text: "#mail_action_receive",
                        color: "Confirm",
                        onactivate: () => {
                          const mid = mailPreview()?.mail_id;
                          if (mid) {
                            mailOperate(mid, 2, 1);
                          }
                        }
                      });
                    }
                  });
                }
              }));
              return _el$;
            }
          });
        }
      })];
    }
  });
};
const MailRow = props => {
  return (() => {
    const _el$15 = libs.createElement("TabButton", {
        group: "MailRow"
      }, null),
      _el$16 = libs.createElement("Panel", {
        id: "RowMain",
        hittest: false
      }, _el$15),
      _el$17 = libs.createElement("Image", {}, _el$16),
      _el$18 = libs.createElement("Label", {
        get text() {
          return getSubTitle(props.mailData);
        }
      }, _el$16),
      _el$19 = libs.createElement("Panel", {
        id: "IconCountDown"
      }, _el$16);
      libs.createElement("Panel", {
        id: "Icon"
      }, _el$19);
      libs.createElement("Panel", {
        id: "Select"
      }, _el$16);
    libs.setProp(_el$15, "className", "MailRow");
    libs.setProp(_el$15, "onactivate", self => {
      if (props.mailData.items && props.mailData.items.length > 0) {
        if (props.mailData.step == 0) {
          mailOperate(props.mailData.mail_id, 1, 1);
        }
      } else {
        if (props.mailData.step <= 1) {
          mailOperate(props.mailData.mail_id, 2, 1);
        }
      }
      props.callback();
    });
    libs.setProp(_el$18, "className", "MailTitle");
    libs.insert(_el$19, libs.createComponent(EOM_Countdown.EOM_Countdown, {
      className: "MailTimeout",
      get endTime() {
        return props.mailData.expire_time;
      }
    }), null);
    libs.insert(_el$15, libs.createComponent(libs.Show, {
      get when() {
        return props.mailData.step == 0;
      },
      get children() {
        const _el$22 = libs.createElement("Image", {}, null);
        libs.setProp(_el$22, "className", "MailUnRead");
        return _el$22;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = {
          Open: props.mailData.step > 1
        },
        _v$2 = libs.classNames("MailIcon", props.mailData.category),
        _v$3 = getSubTitle(props.mailData);
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$15, "classList", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$17, "className", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$18, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$15;
  })();
};
const EmptyFallback = () => {
  return (() => {
    const _el$23 = libs.createElement("Panel", {
        id: "EmptyFallback"
      }, null);
      libs.createElement("Image", {}, _el$23);
      const _el$25 = libs.createElement("Panel", {
        align: "center center",
        flowChildren: "down"
      }, _el$23);
      libs.createElement("Label", {
        id: "Title",
        text: "#Props_EmptyFallbackTitle"
      }, _el$25);
      libs.createElement("Label", {
        id: "Desc",
        text: "#Mail_EmptyFallback"
      }, _el$25);
    libs.setProp(_el$25, "align", "center center");
    libs.setProp(_el$25, "flowChildren", "down");
    return _el$23;
  })();
};
libs.render(() => libs.createComponent(Mail, {}), $.GetContextPanel());