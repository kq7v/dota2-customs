--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('close_rookie', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');
var EOM_Label = require('./EOM_Label.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Popup = require('./EOM_Popup.js');

const BasePopup = props => {
  const merged = libs.mergeProps({
    size: "normal",
    closeOnClickOuter: true,
    closeOnEsc: true,
    closeGroup: true,
    hideClose: false,
    type: EOM_Panel.ADDON_NAME
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "id", "title", "size", "closeOnClickOuter", "closeOnEsc", "closeGroup", "PopupID", "group", "hideClose", "type"]);
  const onClickOuter = () => {
    if (local.closeOnClickOuter) {
      closePopup(local.PopupID);
    }
  };
  const onEsc = () => {
    if (local.closeOnEsc) {
      closePopup(local.PopupID);
    }
  };
  libs.onMount(() => {
    const id = GameEvents.Subscribe("client_side_event", eventData => {
      if ("close_popup_fadeout" == eventData.event_name) {
        let data = eventData.event_data;
        if (data.PopupID) {
          if (local.PopupID == data.PopupID) {
            setPopupShow(false);
            setPopupClose(true);
          }
        } else if (data.group) {
          if (local.group == data.group) {
            setPopupShow(false);
            setPopupClose(true);
          }
        }
      }
    });
    libs.onCleanup(() => GameEvents.Unsubscribe(id));
  });
  const [popupShow, setPopupShow] = libs.createSignal(false);
  const [popupClose, setPopupClose] = libs.createSignal(false);
  return (() => {
    const _el$ = libs.createElement("Button", libs.mergeProps$1({
      get id() {
        return local.PopupID;
      }
    }, () => EOM_Panel.EOMProps(others, {
      className: "PopupContainer"
    })), null);
    libs.spread(_el$, libs.mergeProps$1({
      get id() {
        return local.PopupID;
      }
    }, () => EOM_Panel.EOMProps(others, {
      className: "PopupContainer"
    }), {
      "onactivate": self => onClickOuter(),
      "onload": self => {
        setPopupShow(true);
        self.SetFocus();
      },
      "oncancel": self => onEsc()
    }), true);
    libs.insert(_el$, libs.createComponent(EOM_Popup.EOM_Popup, {
      id: "EOM_PopupMain",
      get type() {
        return local.type;
      },
      popType: "PopupType_PopOut",
      get size() {
        return local.size;
      },
      get title() {
        return local.title;
      },
      get className() {
        return libs.classNames({
          EOM_PopupMainShow: popupShow(),
          EOM_PopupMainClose: popupClose()
        });
      },
      get hideClose() {
        return local.hideClose;
      },
      align: "center center",
      onClose: () => {
        closePopup(local.PopupID);
      },
      get children() {
        return local.children;
      }
    }));
    return _el$;
  })();
};
const PopupBox = props => {
  const [local, others] = libs.splitProps(props, ["children"]);
  return (() => {
    const _el$2 = libs.createElement("Panel", libs.mergeProps$1(() => EOM_Panel.EOMProps(others, {
      className: "PopupBox"
    })), null);
    libs.spread(_el$2, libs.mergeProps$1(() => EOM_Panel.EOMProps(others, {
      className: "PopupBox"
    })), true);
    libs.insert(_el$2, () => local.children);
    return _el$2;
  })();
};

const Popup_CloseRookie = props => {
  const [local, others] = libs.splitProps(props, ["PopupID", "group"]);
  return libs.createComponent(BasePopup, {
    get PopupID() {
      return local.PopupID;
    },
    get group() {
      return local.group;
    },
    title: "#RookieTitle",
    size: "small",
    get children() {
      return [libs.createComponent(EOM_Panel.EOM_Panel, {
        height: '80%',
        width: '100%',
        get children() {
          return libs.createComponent(EOM_Label.EOM_Label, {
            color: "white",
            fontSize: "24px",
            html: true,
            align: 'center center',
            text: "#RookieCloseDesc"
          });
        }
      }), libs.createComponent(EOM_Panel.EOM_Panel, {
        align: 'center bottom',
        flowChildren: "right",
        get children() {
          return [libs.createComponent(EOM_Button.EOM_Button, {
            horizontalAlign: "right",
            color: "Red",
            text: "#RookieCloseFull",
            onactivate: () => {
              GameEvents.SendCustomEventToServer("PlayerSettingToggleBoolean", {
                setting_name: "rookie",
                value: "0"
              });
              closePopup(local.PopupID);
            }
          }), libs.createComponent(EOM_Button.EOM_Button, {
            horizontalAlign: "right",
            marginLeft: "100px",
            color: "Blue",
            text: "#RookieClose",
            onactivate: () => {
              clientSideEvent("rookie_close", {});
              closePopup(local.PopupID);
            }
          })];
        }
      })];
    }
  });
};

exports.BasePopup = BasePopup;
exports.PopupBox = PopupBox;
exports.Popup_CloseRookie = Popup_CloseRookie;