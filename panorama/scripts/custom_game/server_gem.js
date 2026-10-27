--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var equip_details = require('./equip_details.js');
var equipment_utils = require('./equipment_utils.js');
require('./EOM_Loading.js');
require('./solid_utils.js');
require('./attribute_formatter.js');
require('./server_equipment.js');
require('./drawing_attr_row.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_Button.js');
require('./EOM_TextEntry.js');

let root = $.GetContextPanel();
const [gemData, setGemData] = libs.createSignal();
const [id2, setID2] = libs.createSignal();
const [gemData2, setGemData2] = libs.createSignal();
function SetupTooltip() {
  (async () => {
    libs.batch(() => {
      setGemData();
      setID2();
      setGemData2();
    });
    let id1 = root.GetAttributeString("id1", "");
    let id2 = root.GetAttributeString("id2", "");
    const embeddedGemDataStr = root.GetAttributeString("embedded_gem_data", "");
    let idList = [];
    id1 && id1 != "" && idList.push(id1);
    id2 && id2 != "" && idList.push(id2);
    if (idList.length > 0) {
      equipment_utils.GetGemDetail(idList, list => {
        libs.batch(() => {
          list[id1] && setGemData(list[id1]);
          setID2(id2);
          if (list[id2]) {
            setGemData2(list[id2]);
          } else {
            if (embeddedGemDataStr) {
              setGemData2(JSON.parseSafe(embeddedGemDataStr));
            }
          }
        });
      });
    } else if (embeddedGemDataStr != "") {
      setGemData2(JSON.parseSafe(embeddedGemDataStr));
    }
  })();
}
function ServerGemDetail(props) {
  const gemProps = () => props.data;
  const gemItemConfig = () => KeyValues.info_item_gem[gemProps().gem_item_id];
  const gemClass = () => gemItemConfig().class + 10;
  const showMythEntry = () => gemProps().myth_entry_data && gemProps().myth_entry_data.length > 0;
  const showChaosEntry = () => gemProps().chaos_entry_data && gemProps().chaos_entry_data.length > 0;
  const [isAlt, setIsAlt] = libs.createSignal(false);
  const compareMainMap = libs.createMemo(() => {
    const compare = props.compareData;
    if (!compare) return undefined;
    const map = {};
    compare.main_entry_data.forEach(entry => {
      map[entry.id] = entry.value;
    });
    return map;
  });
  const rarity = () => {
    let rarity = gemProps().rarity;
    if (!rarity) {
      let cfg = gemItemConfig();
      if (cfg) {
        rarity = toFiniteNumber(cfg.rarity);
      }
    }
    return toFiniteNumber(rarity);
  };
  const compareAdverbMap = libs.createMemo(() => {
    const compare = props.compareData;
    if (!compare) return undefined;
    const map = {};
    compare.adverb_entry_data.forEach(entry => {
      map[entry.id] = entry.value;
    });
    return map;
  });
  const featureText = libs.createMemo(() => {
    const data = gemProps();
    const tags = new Set();
    const lines = [];
    const collectTags = id => {
      const propText = $.Localize("#property_" + id, $.GetContextPanel());
      GetTagsFromString(propText).forEach(tag => tags.add(tag));
      const privText = $.Localize("#DOTA_Tooltip_ability_" + id, $.GetContextPanel());
      GetTagsFromString(privText).forEach(tag => tags.add(tag));
      const propDesc = GetLocalization("#property_" + id + "_description", "");
      if (propDesc) {
        const propName = Localize("#property_" + id).replace("%", "");
        lines.push(`${propName}:${propDesc}`);
      }
    };
    data.main_entry_data.forEach(entry => collectTags(entry.id));
    data.adverb_entry_data.forEach(entry => collectTags(entry.id));
    if (data.myth_entry_data) data.myth_entry_data.forEach(entry => collectTags(entry.id));
    if (data.chaos_entry_data) data.chaos_entry_data.forEach(entry => {
      collectTags(entry.id);
      if (entry.id.startsWith("privilege_gem_suit_")) {
        const level = Math.max(1, Math.floor(toFiniteNumber(entry.value, 1)));
        const suitData = KeyValues.gem_entry_suit[entry.id];
        const entryName = GetLocalization(`#${entry.id}`, suitData?.name ?? entry.id);
        const description = GetPrivilegeDesc(entry.id, level);
        if (description) lines.push(`${entryName}:${description}`);
      }
    });
    if (data.ability_entry_data) data.ability_entry_data.forEach(entry => collectTags(entry.id));
    tags.forEach(tag => {
      const tagDesc = $.Localize("#feature_" + tag + "_description", $.GetContextPanel());
      GetTagsFromString(tagDesc).forEach(nestedTag => tags.add(nestedTag));
    });
    const featureLines = Array.from(tags).map(tag => {
      const name = Localize("#feature_" + tag);
      const desc = GetLocalization("#feature_" + tag + "_description");
      return `${name}:${desc}`;
    });
    const allLines = [...featureLines, ...lines];
    if (allLines.length === 0) return "";
    return allLines.join("<br>");
  });
  libs.onMount(() => {
    const interval = setInterval(() => {
      setIsAlt(GameUI.IsAltDown());
    }, 300);
    libs.onCleanup(() => {
      clearInterval(interval);
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "ServerGemDetailLoaded",
        get ["class"]() {
          return "TipsRarity" + rarity();
        }
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "Top"
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "NameArea"
      }, _el$2),
      _el$4 = libs.createElement("Label", {
        id: "Name",
        get text() {
          return "#" + gemProps().gem_item_id;
        }
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "OtherInfo"
      }, _el$3),
      _el$6 = libs.createElement("Label", {
        id: "EquipClass",
        "class": "TopLabel",
        get text() {
          return LocalizeWithVars("#Gem_Class", {
            value: gemClass()
          });
        }
      }, _el$5),
      _el$7 = libs.createElement("Label", {
        id: "Change",
        "class": "GemRollChange",
        get text() {
          return LocalizeWithVars("#Gem_Change", {
            value: toFiniteNumber(gemProps().gem_roll_change)
          });
        }
      }, _el$5),
      _el$8 = libs.createElement("Panel", {
        id: "AttrList"
      }, _el$),
      _el$1 = libs.createElement("Panel", {
        id: "Bottom"
      }, _el$);
    libs.insert(_el$3, libs.createComponent(libs.Show, {
      get when() {
        return gemProps().main_entry_data.length > 0;
      },
      get children() {
        return libs.createComponent(libs.Index, {
          get each() {
            return gemProps().main_entry_data;
          },
          children: data => {
            if (data().id.startsWith("privilege_")) {
              return (() => {
                const _el$16 = libs.createElement("Panel", {
                    "class": "PrivilegeEntry"
                  }, null),
                  _el$17 = libs.createElement("Label", {
                    get text() {
                      return GetPrivilegeDesc(data().id, 1, {
                        value: data().value
                      });
                    },
                    html: true
                  }, _el$16);
                libs.effect(_$p => libs.setProp(_el$17, "text", GetPrivilegeDesc(data().id, 1, {
                  value: data().value
                }), _$p));
                return _el$16;
              })();
            }
            return libs.createComponent(equip_details.EquipmentAttrRow, {
              get data() {
                return data();
              },
              type: "Main",
              get compareMap() {
                return compareMainMap();
              }
            });
          }
        });
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return gemProps().adverb_entry_data.length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return gemProps().adverb_entry_data;
          },
          children: data => libs.createComponent(equip_details.EquipmentAttrRow, {
            get data() {
              return data();
            },
            type: "Adverb",
            get compareMap() {
              return compareAdverbMap();
            }
          })
        })];
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return showMythEntry() || showChaosEntry();
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), libs.createComponent(libs.Show, {
          get when() {
            return showMythEntry();
          },
          get children() {
            return libs.createComponent(libs.Index, {
              get each() {
                return gemProps().myth_entry_data;
              },
              children: data => {
                const entryKv = KeyValues.equip_entry[data().id];
                return (() => {
                  const _el$18 = libs.createElement("Panel", {
                      "class": "MythEntry"
                    }, null);
                    libs.createElement("Image", {}, _el$18);
                    const _el$20 = libs.createElement("Label", {
                      get text() {
                        return GetPrivilegeDesc(data().id, 1, {
                          value: data().value,
                          min: entryKv.value_min,
                          max: entryKv.value_max
                        });
                      },
                      html: true
                    }, _el$18);
                  libs.effect(_$p => libs.setProp(_el$20, "text", GetPrivilegeDesc(data().id, 1, {
                    value: data().value,
                    min: entryKv.value_min,
                    max: entryKv.value_max
                  }), _$p));
                  return _el$18;
                })();
              }
            });
          }
        }), libs.createComponent(libs.Show, {
          get when() {
            return showChaosEntry();
          },
          get children() {
            return libs.createComponent(libs.Index, {
              get each() {
                return gemProps().chaos_entry_data;
              },
              children: data => data().id.startsWith("privilege_gem_suit_") ? libs.createComponent(equip_details.GemSpecialEffectRow, {
                get data() {
                  return data();
                },
                showDescription: false
              }) : (() => {
                const _el$21 = libs.createElement("Panel", {
                    "class": `ChaosEntry`
                  }, null);
                  libs.createElement("Panel", {
                    id: "Point"
                  }, _el$21);
                  const _el$23 = libs.createElement("Label", {
                    id: "EntryText",
                    get text() {
                      return equipment_utils.GetChaosRowInfo(data());
                    },
                    html: true
                  }, _el$21);
                libs.setProp(_el$21, "class", `ChaosEntry`);
                libs.effect(_$p => libs.setProp(_el$23, "text", equipment_utils.GetChaosRowInfo(data()), _$p));
                return _el$21;
              })()
            });
          }
        })];
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!isAlt())() && featureText();
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), (() => {
          const _el$11 = libs.createElement("Label", {
            id: "FeatureLabel",
            get text() {
              return featureText();
            },
            html: true
          }, null);
          libs.effect(_$p => libs.setProp(_el$11, "text", featureText(), _$p));
          return _el$11;
        })()];
      }
    }), null);
    libs.insert(_el$1, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!!isAlt())() && featureText();
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "Separator"
        }, null), (() => {
          const _el$13 = libs.createElement("Panel", {
              id: "ModeDetailsTips"
            }, null);
            libs.createElement("Label", {
              id: "Tips",
              text: "#EquipmentTips_Details"
            }, _el$13);
            libs.createElement("Label", {
              id: "Hotkey",
              text: "ALT"
            }, _el$13);
          return _el$13;
        })()];
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "TipsRarity" + rarity(),
        _v$2 = "#" + gemProps().gem_item_id,
        _v$3 = LocalizeWithVars("#Gem_Class", {
          value: gemClass()
        }),
        _v$4 = {
          Active: toFiniteNumber(gemProps().gem_roll_change) > 0
        },
        _v$5 = LocalizeWithVars("#Gem_Change", {
          value: toFiniteNumber(gemProps().gem_roll_change)
        });
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$4, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$6, "text", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$7, "classList", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$7, "text", _v$5, _p$._v$5));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined
    });
    return _el$;
  })();
}
function TooltipContents() {
  return [libs.createComponent(libs.Show, {
    get when() {
      return gemData2();
    },
    get children() {
      const _el$24 = libs.createElement("Panel", {
        id: "Detail2",
        "class": "DetailContainer"
      }, null);
      libs.insert(_el$24, libs.createComponent(ServerGemDetail, {
        get data() {
          return gemData2();
        }
      }));
      return _el$24;
    }
  }), libs.createComponent(libs.Show, {
    get when() {
      return gemData() != undefined;
    },
    get children() {
      const _el$25 = libs.createElement("Panel", {
        "class": "DetailContainer"
      }, null);
      libs.insert(_el$25, libs.createComponent(ServerGemDetail, {
        get data() {
          return gemData();
        },
        get compareData() {
          return gemData2();
        }
      }));
      return _el$25;
    }
  })];
}
(function () {
  libs.render(() => libs.createComponent(TooltipContents, {}), root);
  root.GetParent().style.overflow = "noclip";
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();