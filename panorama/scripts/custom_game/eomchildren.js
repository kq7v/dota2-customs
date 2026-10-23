--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOMChildren', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function GenericPanel2(props) {
  let [local, other] = libs.splitProps(props, ["type", "children"]);
  return (() => {
    const el = libs.createElement(local.type, other, null);
    libs.spread(el, other, false);
    libs.insert(el, () => local.children);
    return el;
  })();
}
function Portal(props) {
  const mount = () => props.mount;
  let content;
  const owner = libs.getOwner();
  libs.createEffect(() => {
    const mountRoot = mount();
    if (!(mountRoot && mountRoot.IsValid())) {
      return;
    }
    content ??= libs.runWithOwner(owner, () => libs.createMemo(() => {
      return props.children;
    }));
    const [clean, setClean] = libs.createSignal(false);
    libs.createRoot(dispose => libs.insert(mountRoot, () => clean() ? dispose() : content(), null));
    libs.onCleanup(() => setClean(true));
  }, undefined, {
    render: true
  });
}

exports.GenericPanel2 = GenericPanel2;
exports.Portal = Portal;