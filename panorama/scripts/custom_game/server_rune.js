--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Loading = require('./EOM_Loading.js');
var equipment_utils = require('./equipment_utils.js');
var rune_data = require('./rune_data.js');
var server_rune_utils = require('./server_rune_utils.js');
var rune_components = require('./rune_components.js');
require('./solid_utils.js');
require('./attribute_formatter.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');

const transferEntryPattern = /_([1-5])_transfer$/;
const strengthenEntryPattern = /_([1-5])_strengthen$/;
const getEngravingSkillID = (entryID, pattern) => {
  const match = entryID.match(pattern);
  return match == undefined ? undefined : toFiniteNumber(match[1], 0);
};
const getTransferSkillID = entryID => getEngravingSkillID(entryID, transferEntryPattern);
const getStrengthenSkillID = entryID => getEngravingSkillID(entryID, strengthenEntryPattern);
function ServerRuneDetail(props) {
  const [local, others] = libs.splitProps(props, ["data", "class"]);
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("ServerRuneDetail", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("ServerRuneDetail", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return local.data;
      },
      get fallback() {
        return libs.createComponent(EOM_Loading.EOM_Loading, {});
      },
      children: () => libs.createComponent(ServerEquipDetailLoaded, libs.mergeProps$1(() => local.data))
    }));
    return _el$;
  })();
}
function ServerEquipDetailLoaded(props) {
  const runeData = () => {
    return props.data;
  };
  libs.createMemo(() => {
    return KeyValues.info_item_rune[runeData().rune_item_id];
  });
  const runeRaritySetting = libs.createMemo(() => {
    return KeyValues.rune_rarity_setting[runeData().rarity];
  });
  const equippedData = () => {
    let sData = runeData().in_rune_equip_suit;
    return sData.split(";").map(v => v.split(":").map(id => toFiniteNumber(id)));
  };
  const equipped = () => runeData().in_rune_equip_suit && runeData().in_rune_equip_suit != "";
  const engravingSlots = libs.createMemo(() => runeData().inlay_engravings_data ?? []);
  const transferEntries = libs.createMemo(() => {
    const result = [];
    for (const engraving of engravingSlots()) {
      for (const entry of engraving.adverb_entry_data ?? []) {
        if (getTransferSkillID(entry.id) != undefined) {
          result.push(entry);
        }
      }
    }
    return result;
  });
  const equippedSkillID = libs.createMemo(() => props.equippedSkillID != undefined && props.equippedSkillID >= 1 && props.equippedSkillID <= 5 ? props.equippedSkillID : undefined);
  const isTransferStrikethrough = entry => {
    const transferSkillID = getTransferSkillID(entry.id);
    return transferSkillID != undefined && transferSkillID === equippedSkillID();
  };
  const hasActiveTransfer = libs.createMemo(() => equippedSkillID() != undefined && transferEntries().some(entry => !isTransferStrikethrough(entry)));
  const shouldStrikethroughEngravingEntry = entry => {
    const currentSkillID = equippedSkillID();
    if (currentSkillID == undefined) {
      return false;
    }
    const transferSkillID = getTransferSkillID(entry.id);
    if (transferSkillID != undefined) {
      return transferSkillID === currentSkillID;
    }
    const strengthenSkillID = getStrengthenSkillID(entry.id);
    return strengthenSkillID != undefined && (strengthenSkillID !== currentSkillID || hasActiveTransfer());
  };
  const canWear = () => {
    const heroLv = getServiceNetData("player_account_levels", Players.GetLocalPlayer())?.hero_level?.level ?? 1;
    return heroLv >= runeRaritySetting().need_level;
  };
  const featureText = libs.createMemo(() => {
    const data = runeData();
    const tags = new Set();
    const tagQueue = [];
    const lines = [];
    const addTags = collectedTags => {
      collectedTags.forEach(tag => {
        if (!tags.has(tag)) {
          tags.add(tag);
          tagQueue.push(tag);
        }
      });
    };
    const collectTags = id => {
      const collected = CollectLocalizationFeatureTags(() => {
        const propName = GetLocalization("#property_" + id);
        GetLocalization("#DOTA_Tooltip_ability_" + id);
        const propDesc = GetLocalization("#property_" + id + "_description", "");
        return {
          propName,
          propDesc
        };
      });
      addTags(collected.tags);
      const {
        propName,
        propDesc
      } = collected.result;
      if (propDesc) {
        lines.push(`${propName.replace("%", "")}:${propDesc}`);
      }
    };
    data.main_entry_data.forEach(entry => collectTags(entry.id));
    data.adverb_entry_data.forEach(entry => collectTags(entry.id));
    data.inlay_engravings_data?.forEach(engraving => {
      engraving.adverb_entry_data?.forEach(entry => collectTags(entry.id));
    });
    data.rune_suit_data.forEach(suit => {
      const collected = CollectLocalizationFeatureTags(() => GetLocalization("#RuneSuit_" + suit.id));
      addTags(collected.tags);
    });
    const featureLines = [];
    for (let index = 0; index < tagQueue.length; index++) {
      const tag = tagQueue[index];
      const collected = CollectLocalizationFeatureTags(() => {
        const name = GetLocalization("#feature_" + tag, "");
        const desc = GetLocalization("#feature_" + tag + "_description", "");
        return {
          name,
          desc
        };
      });
      const {
        name,
        desc
      } = collected.result;
      if (name && desc) {
        featureLines.push(`${name}:${desc}`);
      }
      addTags(collected.tags);
    }
    const allLines = [...featureLines, ...lines];
    return allLines;
  });
  const displayName = libs.createMemo(() => {
    const nameStr = GetLocalization("#" + runeData().rune_item_id);
    return nameStr;
  });
  return (() => {
    const _el$2 = libs.createElement("Panel", {
        id: "ServerRuneDetailLoaded",
        get ["class"]() {
          return libs.classNames("TipsRarity" + runeData().rarity, {
            UnableWear: !canWear()
          });
        }
      }, null),
      _el$3 = libs.createElement("Panel", {
        id: "RuneTop"
      }, _el$2),
      _el$4 = libs.createElement("Panel", {
        id: "RuneTopLeft"
      }, _el$3),
      _el$5 = libs.createElement("Label", {
        id: "RuneName",
        get text() {
          return displayName();
        }
      }, _el$4),
      _el$6 = libs.createElement("Panel", {
        id: "RuneOtherInfo"
      }, _el$4),
      _el$7 = libs.createElement("Label", {
        id: "EquipNeedLevel",
        "class": "TopLabel",
        get vars() {
          return {
            value: canWear() ? runeRaritySetting().need_level.toString() : ToColor(runeRaritySetting().need_level.toString(), "#E55043")
          };
        },
        text: "#RuneEquipNeedLevel",
        html: true
      }, _el$6),
      _el$8 = libs.createElement("Panel", {
        id: "RuneAttrList"
      }, _el$2),
      _el$13 = libs.createElement("Panel", {
        id: "RuneBottom"
      }, _el$2),
      _el$14 = libs.createElement("Panel", {
        id: "RuneFeatureLabelContainer",
        width: "100%",
        flowChildren: "down"
      }, _el$13),
      _el$16 = libs.createElement("Panel", {
        id: "EquipedInfoContainer",
        width: "100%",
        flowChildren: "down"
      }, _el$13);
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return runeData().main_entry_data.length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "RuneSeparator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return rune_data.buildRuneAttributeDisplays(runeData().main_entry_data, 1);
          },
          children: data => libs.createComponent(rune_components.RuneAttributeRow, {
            get attr_name_html() {
              return data().nameHtml;
            },
            get attr_value_html() {
              return data().valueText;
            },
            entry_type: "Main",
            get color_name() {
              return data().colorName;
            }
          })
        })];
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return runeData().adverb_entry_data.length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "RuneSeparator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return rune_data.buildRuneAttributeDisplays(runeData().adverb_entry_data, 2);
          },
          children: data => libs.createComponent(rune_components.RuneAttributeRow, {
            get attr_name_html() {
              return data().nameHtml;
            },
            get attr_value_html() {
              return data().valueText;
            },
            entry_type: "Adverb",
            get color_name() {
              return data().colorName;
            }
          })
        })];
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return engravingSlots().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "RuneSeparator"
        }, null), (() => {
          const _el$10 = libs.createElement("Panel", {
            "class": "RuneDetailEngravings"
          }, null);
          libs.insert(_el$10, libs.createComponent(libs.For, {
            get each() {
              return engravingSlots();
            },
            children: engraving => libs.createComponent(rune_components.RuneDetailEngravingRow, {
              engraving: engraving,
              shouldStrikethroughEntry: shouldStrikethroughEngravingEntry
            })
          }));
          return _el$10;
        })()];
      }
    }), null);
    libs.insert(_el$8, libs.createComponent(libs.Show, {
      get when() {
        return runeData().rune_suit_data.length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "RuneSeparator"
        }, null), (() => {
          const _el$12 = libs.createElement("Panel", {
            id: "RuneSuitContainer",
            width: "100%",
            flowChildren: "right"
          }, null);
          libs.setProp(_el$12, "width", "100%");
          libs.setProp(_el$12, "flowChildren", "right");
          libs.insert(_el$12, libs.createComponent(libs.Index, {
            get each() {
              return rune_data.buildRuneSuitDisplays(runeData().rune_suit_data);
            },
            children: data => libs.createComponent(rune_components.RuneBondItem, {
              get suitKey() {
                return data().suitKey;
              },
              get currentPoint() {
                return data().currentPoint;
              },
              get suitPoint() {
                return data().currentPoint;
              },
              showTooltip: true
            })
          }));
          return _el$12;
        })()];
      }
    }), null);
    libs.setProp(_el$14, "width", "100%");
    libs.setProp(_el$14, "flowChildren", "down");
    libs.insert(_el$14, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!featureText())() && featureText().length > 0;
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "RuneSeparator"
        }, null), libs.createComponent(libs.Index, {
          get each() {
            return featureText();
          },
          children: text => {
            return (() => {
              const _el$25 = libs.createElement("Label", {
                id: "RuneFeatureLabel",
                get text() {
                  return text();
                },
                html: true
              }, null);
              libs.effect(_$p => libs.setProp(_el$25, "text", text(), _$p));
              return _el$25;
            })();
          }
        })];
      }
    }));
    libs.setProp(_el$16, "width", "100%");
    libs.setProp(_el$16, "flowChildren", "down");
    libs.insert(_el$16, libs.createComponent(libs.Show, {
      get when() {
        return equipped();
      },
      get children() {
        return [libs.createElement("Panel", {
          "class": "RuneSeparator"
        }, null), libs.createElement("Label", {
          id: "RuneEquipedTips",
          text: "#EquipedTips"
        }, null), (() => {
          const _el$19 = libs.createElement("Panel", {
            id: "RuneEquipedInfo"
          }, null);
          libs.insert(_el$19, libs.createComponent(libs.For, {
            get each() {
              return equippedData();
            },
            children: data => {
              const [heroID, suitID] = data;
              return (() => {
                const _el$26 = libs.createElement("Panel", {
                    "class": "RuneEquipState"
                  }, null),
                  _el$27 = libs.createElement("Image", {
                    "class": "HeroSmallAvatar",
                    get src() {
                      return `s2r://panorama/images/heroes/icons/${equipment_utils.HeroID2Name[heroID]}_png.vtex`;
                    }
                  }, _el$26),
                  _el$28 = libs.createElement("Label", {
                    id: "RuneEquipSuit",
                    text: "#EquipmentSuitType",
                    dialogVariables: {
                      value: suitID
                    }
                  }, _el$26);
                libs.setProp(_el$28, "dialogVariables", {
                  value: suitID
                });
                libs.effect(_$p => libs.setProp(_el$27, "src", `s2r://panorama/images/heroes/icons/${equipment_utils.HeroID2Name[heroID]}_png.vtex`, _$p));
                return _el$26;
              })();
            }
          }));
          return _el$19;
        })()];
      }
    }));
    libs.insert(_el$13, libs.createComponent(libs.Show, {
      get when() {
        return libs.memo(() => !!featureText())() && featureText().length > 0;
      },
      get children() {
        const _el$20 = libs.createElement("Panel", {
            id: "RuneALTTipsContainer",
            width: "100%"
          }, null);
          libs.createElement("Panel", {
            "class": "RuneSeparator"
          }, _el$20);
          const _el$22 = libs.createElement("Panel", {
            id: "RuneModeDetailsTips"
          }, _el$20);
          libs.createElement("Label", {
            id: "RuneTips",
            text: "#EquipmentTips_Details"
          }, _el$22);
          libs.createElement("Label", {
            id: "RuneHotkey",
            text: "ALT"
          }, _el$22);
        libs.setProp(_el$20, "width", "100%");
        return _el$20;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = libs.classNames("TipsRarity" + runeData().rarity, {
          UnableWear: !canWear()
        }),
        _v$2 = displayName(),
        _v$3 = {
          value: canWear() ? runeRaritySetting().need_level.toString() : ToColor(runeRaritySetting().need_level.toString(), "#E55043")
        };
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$5, "text", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$7, "vars", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$2;
  })();
}
let root = $.GetContextPanel();
const [equipData, setEquipData] = libs.createSignal();
function TooltipContents() {
  return (() => {
    const _el$29 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("RuneDetailContainer", {
            ShowOrnament: equipData() != undefined && equipData().data.rarity >= 7
          });
        }
      }, null);
      libs.createElement("Panel", {
        "class": "RuneBGImg"
      }, _el$29);
      const _el$31 = libs.createElement("Panel", {
        "class": "RuneOrnamentPanel"
      }, _el$29);
    libs.insert(_el$29, libs.createComponent(ServerRuneDetail, {
      get data() {
        return equipData();
      }
    }), _el$31);
    libs.effect(_$p => libs.setProp(_el$29, "class", libs.classNames("RuneDetailContainer", {
      ShowOrnament: equipData() != undefined && equipData().data.rarity >= 7
    }), _$p));
    return _el$29;
  })();
}
function SetupTooltip() {
  (async () => {
    setEquipData();
    let id1 = root.GetAttributeString("id1", "");
    const equippedSkillID = root.GetAttributeInt("equipped_skill_id", 0);
    server_rune_utils.GetRuneDetail(id1, data => {
      setEquipData({
        data: data,
        equippedSkillID: equippedSkillID >= 1 && equippedSkillID <= 5 ? equippedSkillID : undefined
      });
    });
  })();
}
(function () {
  libs.render(() => libs.createComponent(TooltipContents, {}), root);
  root.style.overflow = "noclip";
  root.GetParent().style.overflow = "noclip";
  root.GetParent().GetParent().style.overflow = "noclip";
  root.SetPanelEvent("ontooltiploaded", SetupTooltip);
})();