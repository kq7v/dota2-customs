--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var server_dungeon_key = require('./server_dungeon_key.js');
var attribute_formatter = require('./attribute_formatter.js');
require('./solid_utils.js');
require('./equipment_utils.js');

let root = $.GetContextPanel();
const [keyData, setKeyData] = libs.createSignal();
function parseKeyMainEntries(value) {
  if (!value) {
    return [];
  }
  if (typeof value === "string") {
    return JSON.parseSafe(value) ?? [];
  }
  return Array.isArray(value) ? value : [];
}
function getKeyTooltipAttributes(data) {
  if (!data) {
    return [];
  }
  return parseKeyMainEntries(data.main_entry_data).filter(entry => entry.id != "" && entry.value != undefined).map(entry => {
    const entryConfig = KeyValues.key_entry[entry.id];
    const attributeID = entryConfig?.entry_name ?? entry.id;
    const baseValue = toFiniteNumber(entry.base_value ?? entry.value, 0);
    const value = toFiniteNumber(entry.value ?? entry.base_value, 0);
    return {
      data: {
        id: attributeID,
        value,
        base_value: baseValue,
        percent: entry.percent != undefined ? toFiniteNumber(entry.percent, 0) : undefined,
        base_min: entry.base_min != undefined ? toFiniteNumber(entry.base_min, 0) : undefined,
        base_max: entry.base_max != undefined ? toFiniteNumber(entry.base_max, 0) : undefined
      },
      config: entryConfig
    };
  });
}
function getKeyDebuffEntries(data) {
  if (!data) {
    return [];
  }
  return parseKeyMainEntries(data.adverb_entry_data).filter(entry => entry.id != "").map(entry => {
    const level = toFiniteNumber(entry.value, 1);
    const keyName = "key_" + entry.id;
    const kv = KeyValues.keys[keyName];
    const name = GetLocalization("#" + keyName, keyName);
    const localizationKey = `#DOTA_Tooltip_ability_${keyName}`;
    const localizationText = GetLocalization(localizationKey, "");
    const text = kv ? getKeyValueDescription(localizationText, kv.AbilityValues, {
      level: level,
      onlyShowNowLevel: true
    }) : localizationText;
    return {
      id: entry.id,
      level,
      name,
      text: text != "" ? text : localizationText
    };
  }).filter(entry => entry.text != "");
}
function KeyAttrRow(props) {
  const info = libs.createMemo(() => {
    return attribute_formatter.formatAttributeDisplay(props.data.data, {
      config: props.data.config,
      attributeNameColor: "#BFAA82"
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return `KeyAttrRow EquipmentAttrRow Main ${info().colorName ?? ""}`.trim();
        }
      }, null);
      libs.createElement("Panel", {
        id: "Point"
      }, _el$);
      const _el$3 = libs.createElement("Label", {
        id: "AttrValue",
        get text() {
          return info().valueText;
        },
        html: true
      }, _el$),
      _el$4 = libs.createElement("Label", {
        id: "AttrName",
        get text() {
          return info().nameHtml;
        },
        html: true
      }, _el$);
    libs.effect(_p$ => {
      const _v$ = `KeyAttrRow EquipmentAttrRow Main ${info().colorName ?? ""}`.trim(),
        _v$2 = info().valueText,
        _v$3 = info().nameHtml;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$4, "text", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
}
function SetupTooltip() {
  setKeyData();
  const keyDataStr = root.GetAttributeString("key_data", "");
  if (keyDataStr != "") {
    const data = JSON.parseSafe(keyDataStr);
    if (data != undefined) {
      setKeyData(data);
    }
    return;
  }
  const keyId = root.GetAttributeString("key_id", "");
  if (keyId == "") {
    return;
  }
  const playerID = Game.GetLocalPlayerID();
  const allKeys = getServiceNetData("player_keys", playerID) ?? {};
  const data = allKeys[keyId];
  if (data != undefined) {
    setKeyData(data);
  }
}
function ServerKeyDetail(props) {
  const keyData = () => props.data;
  const displayName = libs.createMemo(() => {
    return GetLocalization("#" + keyData().key_item_id);
  });
  const originDurability = libs.createMemo(() => {
    return toFiniteNumber(keyData().origin_durability, 3) || 3;
  });
  const currentDurability = libs.createMemo(() => {
    return toFiniteNumber(keyData().durability, originDurability());
  });
  const intensity = libs.createMemo(() => {
    return toFiniteNumber(keyData().intensity, 1);
  });
  const classLevel = libs.createMemo(() => {
    return toFiniteNumber(KeyValues.info_item_key[keyData().key_item_id].class, 1);
  });
  const initialIntensity = libs.createMemo(() => {
    const raritySetting = KeyValues.key_rarity_setting[keyData().rarity] ?? KeyValues.key_rarity_setting[String(keyData().rarity)];
    const classSetting = KeyValues.key_class_setting[classLevel()] ?? KeyValues.key_class_setting[String(classLevel())];
    const rarityIntensity = toFiniteNumber(raritySetting?.intensity, 0);
    const classIntensityBonus = toFiniteNumber(classSetting?.intensity_bonus, 0);
    return rarityIntensity * (1 + classIntensityBonus);
  });
  const intensityIncrease = libs.createMemo(() => {
    return intensity() - initialIntensity();
  });
  const mainAttrList = libs.createMemo(() => {
    return getKeyTooltipAttributes(keyData());
  });
  const featureText = libs.createMemo(() => {
    const tags = new Set(["Durability", "Intensity"]);
    const collectTags = attrData => {
      const localizationKey = "#property_" + attrData.id;
      const propText = $.Localize(localizationKey, $.GetContextPanel());
      const attrTags = GetTagsFromString(propText);
      attrTags.forEach(tag => tags.add(tag));
    };
    mainAttrList().forEach(attr => collectTags(attr.data));
    tags.forEach(tag => {
      const tagDescription = $.Localize("#feature_" + tag + "_description", $.GetContextPanel());
      GetTagsFromString(tagDescription).forEach(nestedTag => tags.add(nestedTag));
    });
    return Array.from(tags).map(tag => {
      const name = GetLocalization("#feature_" + tag, "");
      const description = GetLocalization("#feature_" + tag + "_description", "");
      return name != "" && description != "" ? `${name}:${description}` : "";
    }).filter(text => text != "");
  });
  const adverbEntryList = libs.createMemo(() => {
    return getKeyDebuffEntries(keyData());
  });
  return (() => {
    const _el$5 = libs.createElement("Panel", {
        "class": "ServerKeyDetail"
      }, null),
      _el$6 = libs.createElement("Panel", {
        id: "ServerEquipDetailLoaded",
        get ["class"]() {
          return "TipsRarity" + keyData().rarity;
        }
      }, _el$5),
      _el$7 = libs.createElement("Panel", {
        id: "Top"
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "TopLeft"
      }, _el$7),
      _el$9 = libs.createElement("Label", {
        id: "Name",
        get text() {
          return displayName();
        }
      }, _el$8),
      _el$0 = libs.createElement("Panel", {
        id: "MetaInfo"
      }, _el$8),
      _el$1 = libs.createElement("Label", {
        "class": "TopLabel",
        get text() {
          return GetLocalization("#Equipment_Durability");
        },
        html: true
      }, _el$0),
      _el$10 = libs.createElement("Panel", {
        "class": "KeyDurabilityList"
      }, _el$0),
      _el$11 = libs.createElement("Panel", {
        "class": "KeyIntensityList"
      }, _el$8),
      _el$12 = libs.createElement("Panel", {
        "class": "KeyIntensityInfo"
      }, _el$11);
      libs.createElement("Label", {
        "class": "KeyIntensityLabel",
        text: "#Equipment_ClassLevel"
      }, _el$12);
      const _el$14 = libs.createElement("Label", {
        "class": "KeyIntensityValue",
        get text() {
          return classLevel();
        }
      }, _el$12),
      _el$15 = libs.createElement("Panel", {
        "class": "KeyIntensityInfo",
        marginLeft: "30px"
      }, _el$11),
      _el$16 = libs.createElement("Label", {
        "class": "KeyIntensityLabel",
        get text() {
          return GetLocalization("#Equipment_Intensity");
        },
        html: true
      }, _el$15),
      _el$17 = libs.createElement("Label", {
        "class": "KeyIntensityValue",
        get text() {
          return initialIntensity();
        }
      }, _el$15),
      _el$19 = libs.createElement("Panel", {
        id: "AttrList"
      }, _el$6),
      _el$24 = libs.createElement("Panel", {
        id: "Bottom"
      }, _el$6),
      _el$25 = libs.createElement("Panel", {
        id: "FeatureLabelContainer"
      }, _el$24);
    libs.insert(_el$7, libs.createComponent(server_dungeon_key.DungeonKey, {
      get data() {
        return keyData();
      },
      showTooltip: false
    }), _el$8);
    libs.insert(_el$10, libs.createComponent(libs.For, {
      get each() {
        return Array.from({
          length: currentDurability()
        });
      },
      children: (_, idx) => libs.createElement("Panel", {
        "class": "KeyDurabilityStar"
      }, null)
    }));
    libs.setProp(_el$15, "marginLeft", "30px");
    libs.insert(_el$15, libs.createComponent(libs.Show, {
      get when() {
        return intensityIncrease() > 0;
      },
      get children() {
        const _el$18 = libs.createElement("Label", {
          "class": "KeyIntensityIncrease",
          get text() {
            return `+${intensityIncrease()}`;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$18, "text", `+${intensityIncrease()}`, _$p));
        return _el$18;
      }
    }), null);
    libs.insert(_el$19, libs.createComponent(libs.Show, {
      get when() {
        return mainAttrList().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createElement("Label", {
          "class": "KeySectionTitle Positive",
          text: "#Key_GoodEffect"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return mainAttrList();
          },
          children: data => libs.createComponent(KeyAttrRow, {
            get data() {
              return data();
            }
          })
        })];
      }
    }), null);
    libs.insert(_el$19, libs.createComponent(libs.Show, {
      get when() {
        return adverbEntryList().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createElement("Label", {
          "class": "KeySectionTitle Negative",
          text: "#Key_BadEffect"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return adverbEntryList();
          },
          children: data => (() => {
            const _el$33 = libs.createElement("Panel", {
                "class": "KeyDebuffEntry"
              }, null),
              _el$34 = libs.createElement("Label", {
                "class": "KeyDebuffName",
                get text() {
                  return `${data().name} Lv.${data().level}`;
                }
              }, _el$33),
              _el$35 = libs.createElement("Label", {
                "class": "KeyDebuffDesc",
                get text() {
                  return data().text;
                },
                html: true
              }, _el$33);
            libs.effect(_p$ => {
              const _v$0 = `${data().name} Lv.${data().level}`,
                _v$1 = data().text;
              _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$34, "text", _v$0, _p$._v$0));
              _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$35, "text", _v$1, _p$._v$1));
              return _p$;
            }, {
              _v$0: undefined,
              _v$1: undefined
            });
            return _el$33;
          })()
        })];
      }
    }), null);
    libs.insert(_el$25, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return featureText();
          },
          children: text => (() => {
            const _el$36 = libs.createElement("Label", {
              id: "FeatureLabel",
              get text() {
                return text();
              },
              html: true
            }, null);
            libs.effect(_$p => libs.setProp(_el$36, "text", text(), _$p));
            return _el$36;
          })()
        })];
      }
    }));
    libs.insert(_el$24, libs.createComponent(libs.Show, {
      get when() {
        return featureText().length > 0;
      },
      get children() {
        const _el$27 = libs.createElement("Panel", {
            id: "ALTTipsContainer",
            width: "100%"
          }, null);
          libs.createElement("Panel", {
            "class": "Separator"
          }, _el$27);
          const _el$29 = libs.createElement("Panel", {
            id: "ModeDetailsTips"
          }, _el$27),
          _el$30 = libs.createElement("Label", {
            id: "Tips",
            get text() {
              return GetLocalization("#EquipmentTips_Details");
            }
          }, _el$29);
          libs.createElement("Label", {
            id: "Hotkey",
            text: "ALT"
          }, _el$29);
        libs.setProp(_el$27, "width", "100%");
        libs.effect(_$p => libs.setProp(_el$30, "text", GetLocalization("#EquipmentTips_Details"), _$p));
        return _el$27;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$4 = "TipsRarity" + keyData().rarity,
        _v$5 = displayName(),
        _v$6 = GetLocalization("#Equipment_Durability"),
        _v$7 = classLevel(),
        _v$8 = GetLocalization("#Equipment_Intensity"),
        _v$9 = initialIntensity();
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$6, "class", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$9, "text", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$1, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$14, "text", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$16, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$17, "text", _v$9, _p$._v$9));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined
    });
    return _el$5;
  })();
}
function TooltipContents() {
  return libs.createComponent(libs.Show, {
    get when() {
      return keyData();
    },
    get children() {
      const _el$37 = libs.createElement("Panel", {
          "class": "DetailContainer"
        }, null);
        libs.createElement("Panel", {
          "class": "BGImg"
        }, _el$37);
      libs.insert(_el$37, libs.createComponent(ServerKeyDetail, {
        get data() {
          return keyData();
        }
      }), null);
      return _el$37;
    }
  });
}
(function () {
  libs.render(() => libs.createComponent(TooltipContents, {}), root);
  root.style.overflow = "noclip";
  root.GetParent().style.overflow = "noclip";
  root.GetParent().GetParent().style.overflow = "noclip";
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();