--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('hunt_buff_icon', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const huntKeyValues = KeyValues;
function getLevelValue(raw, level) {
  const values = String(raw).trim().split(/\s+/);
  const value = Number(values[Math.min(level, values.length) - 1]);
  return Number.isFinite(value) ? value : 0;
}
function GetHuntBuffData(id, level = 1) {
  if (!Number.isInteger(level) || level < 1) return undefined;
  const config = huntKeyValues.hunt_field_buff?.[id];
  const type = Number(config?.Type);
  if (config === undefined || type !== 1 && type !== 2) return undefined;
  const params = {};
  for (const entry of (config.EffectParams ?? "").split("|")) {
    const separator = entry.indexOf(":");
    if (separator <= 0) continue;
    const key = entry.substring(0, separator).trim();
    if (key !== "") params[key] = getLevelValue(entry.substring(separator + 1), level);
  }
  return {
    id,
    level,
    type,
    time: Math.max(0, getLevelValue(config.Time ?? 0, level)),
    abilityTextureName: (config.AbilityTextureName ?? "").trim(),
    params
  };
}
function GetHuntBuffCatalog() {
  return Object.keys(huntKeyValues.hunt_field_buff ?? {}).map(id => GetHuntBuffData(id)).filter(buff => buff !== undefined);
}

function GetHuntEffectName(id, level = 1) {
  return LocalizeWithVars("#HuntBossBuffLevelShort", {
    lv: level
  }) + " " + GetLocalization(`#Demo_HuntEffect_Name_${id}`);
}
function GetHuntEffectDescription(id, level = 1) {
  const params = GetHuntBuffData(id, level)?.params ?? {};
  return LocalizeWithVars(`#Demo_HuntEffect_Desc_${id}`, params).replace(/%(\w+)%/g, (match, key) => params[key] === undefined ? match : String(params[key]));
}
const HuntBuffIcon = props => {
  const merged = libs.mergeProps({
    tooltipType: "fixed",
    showTips: true
  }, props);
  const [local, others] = libs.splitProps(merged, ["buff", "tooltipType", "showTips", "class"]);
  const [imagePanel, setImagePanel] = libs.createSignal();
  const src = libs.createMemo(() => GetTexturePath(GetHuntBuffData(local.buff.id, local.buff.level)?.abilityTextureName, "dota"));
  const levelText = libs.createMemo(() => LocalizeWithVars("#HuntBossBuffLevelShort", {
    lv: local.buff.level ?? 1
  }));
  libs.createEffect(() => {
    const panel = imagePanel();
    const path = src();
    if (!panel?.IsValid()) return;
    panel.SetImage(path ?? "");
  });
  const tooltip = libs.createMemo(() => {
    if (!local.showTips) return undefined;
    return GetHuntEffectName(local.buff.id, local.buff.level) + "<br>" + GetHuntEffectDescription(local.buff.id, local.buff.level);
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
        get ["class"]() {
          return libs.classNames("HuntBuffIcon", local.class);
        }
      }), null),
      _el$2 = libs.createElement("Image", {
        "class": "HuntBuffIconImage",
        scaling: "stretch-to-fit-preserve-aspect",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Label", {
        "class": "HuntBuffIconLevel",
        get text() {
          return levelText();
        },
        hittest: false
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("HuntBuffIcon", local.class);
      },
      get tooltip_text() {
        return tooltip();
      }
    }), true);
    libs.use(panel => setImagePanel(panel), _el$2);
    libs.effect(_$p => libs.setProp(_el$3, "text", levelText(), _$p));
    return _el$;
  })();
};

exports.GetHuntBuffCatalog = GetHuntBuffCatalog;
exports.GetHuntBuffData = GetHuntBuffData;
exports.GetHuntEffectDescription = GetHuntEffectDescription;
exports.GetHuntEffectName = GetHuntEffectName;
exports.HuntBuffIcon = HuntBuffIcon;