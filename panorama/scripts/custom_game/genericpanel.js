--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('GenericPanel', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const CLabel = props => {
  return (() => {
    const _el$2 = libs.createElement("Label", props, null);
    libs.spread(_el$2, props, false);
    return _el$2;
  })();
};
const CImage = props => {
  return (() => {
    const _el$3 = libs.createElement("Image", props, null);
    libs.spread(_el$3, props, false);
    return _el$3;
  })();
};
const CDOTAScenePanel = props => {
  return (() => {
    const _el$12 = libs.createElement("DOTAScenePanel", props, null);
    libs.spread(_el$12, props, false);
    return _el$12;
  })();
};
const CTextButton = props => {
  return (() => {
    const _el$23 = libs.createElement("TextButton", props, null);
    libs.spread(_el$23, props, false);
    return _el$23;
  })();
};
function GenericPanel2(props) {
  let [local, other] = libs.splitProps(props, ["type"]);
  let [, other2] = libs.splitProps(props, ["type", "children"]);
  return (() => {
    const el = libs.createElement(local.type, other2, null);
    libs.spread(el, other, false);
    return el;
  })();
}
const LabelChild = props => {
  let [local, other] = libs.splitProps(props, ["type", "text", "html", "children"]);
  const resolved = libs.children(() => local.children);
  return libs.createComponent(GenericPanel2, libs.mergeProps({
    get type() {
      return local.type;
    }
  }, other, {
    get children() {
      return [libs.createComponent(libs.Show, {
        get when() {
          return local.text != undefined && local.text != "";
        },
        get children() {
          return libs.createComponent(CLabel, {
            get text() {
              return local.text;
            },
            get html() {
              return local.html;
            }
          });
        }
      }), libs.memo(() => resolved())];
    }
  }));
};
const TabButton = props => {
  return libs.createComponent(LabelChild, libs.mergeProps({
    type: "TabButton"
  }, props));
};
const UICanvas = props => {
  return libs.createComponent(GenericPanel2, libs.mergeProps({
    type: "UICanvas"
  }, props));
};
function DynamicKey(props) {
  const memo = libs.createMemo(() => props.key());
  return libs.createMemo(() => {
    let input = memo();
    return libs.untrack(() => props.children(input));
  });
}

exports.CDOTAScenePanel = CDOTAScenePanel;
exports.CImage = CImage;
exports.CLabel = CLabel;
exports.CTextButton = CTextButton;
exports.DynamicKey = DynamicKey;
exports.TabButton = TabButton;
exports.UICanvas = UICanvas;