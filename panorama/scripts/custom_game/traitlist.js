--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('TraitList', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');

function readEquippedTraits(playerId) {
  const data = CustomNetTables.GetTableValue('traits', 'equipped_' + playerId)?.data;
  return data ? Object.values(JSON.parseSafe(data) ?? {}) : [];
}
function useEquippedTraits(playerId) {
  const [items, setItems] = libs.createSignal([]);
  libs.createEffect(() => {
    const id = playerId();
    setItems(readEquippedTraits(id));
    const listener = CustomNetTables.SubscribeNetTableListener('traits', (_, key) => {
      if (key == 'equipped_' + id) setItems(readEquippedTraits(id));
    });
    libs.onCleanup(() => CustomNetTables.UnsubscribeNetTableListener(listener));
  });
  return items;
}
function TraitList(props) {
  const equipped = useEquippedTraits(() => props.playerId);
  const ids = () => props.playerId >= 0 ? equipped().map(e => e.traitId) : props.history ?? [];
  return libs.createComponent(EOM_Panel.EOM_Panel, {
    className: "TraitList",
    flowChildren: "down",
    get children() {
      return libs.createComponent(libs.For, {
        get each() {
          return ids();
        },
        children: id => props.renderItem(id)
      });
    }
  });
}

exports.TraitList = TraitList;
exports.useEquippedTraits = useEquippedTraits;