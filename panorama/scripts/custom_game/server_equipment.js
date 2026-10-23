--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('server_equipment', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function Equipment(props) {
  const iconName = () => {
    return KeyValues.info_item_equipment[props.equipment_item_id].icon;
  };
  const inlayGems = libs.createMemo(() => {
    if (!props.inlay_gems_data) return [];
    return JSON.parseSafe(props.inlay_gems_data) ?? [];
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        get ["class"]() {
          return "Equipment Rarity" + props.rarity;
        },
        get onmouseover() {
          return props.onmouseover;
        },
        get onmouseout() {
          return props.onmouseout;
        }
      }, null),
      _el$2 = libs.createElement("Image", {
        id: "EquipmentIcon",
        get src() {
          return `file://{images}/custom_game/store_items/${iconName()}.png`;
        }
      }, _el$);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.locked;
      },
      get children() {
        return libs.createElement("Panel", {
          id: "Lock"
        }, null);
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.equipped;
      },
      get children() {
        return libs.createElement("Image", {
          id: "EquipedTag"
        }, null);
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props.level > 0;
      },
      get children() {
        const _el$5 = libs.createElement("Label", {
          id: "LevelLabel",
          get text() {
            return "+" + props.level;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$5, "text", "+" + props.level, _$p));
        return _el$5;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return inlayGems().length > 0;
      },
      get children() {
        const _el$6 = libs.createElement("Panel", {
          id: "EquipGemSlots"
        }, null);
        libs.insert(_el$6, libs.createComponent(libs.For, {
          get each() {
            return inlayGems();
          },
          children: gem => {
            const empty = gem?.gem_item_id == undefined;
            const rarity = () => {
              if (!empty) {
                return KeyValues.info_item_gem[gem.gem_item_id]?.rarity ?? 5;
              }
              return 0;
            };
            return (() => {
              const _el$7 = libs.createElement("Panel", {
                get ["class"]() {
                  return libs.classNames("GemSlot", {
                    EmptySlot: empty
                  });
                }
              }, null);
              libs.insert(_el$7, libs.createComponent(libs.Show, {
                when: !empty,
                get children() {
                  const _el$8 = libs.createElement("Image", {
                    get ["class"]() {
                      return "GemIcon Rarity" + rarity();
                    }
                  }, null);
                  libs.effect(_$p => libs.setProp(_el$8, "class", "GemIcon Rarity" + rarity(), _$p));
                  return _el$8;
                }
              }));
              libs.effect(_$p => libs.setProp(_el$7, "class", libs.classNames("GemSlot", {
                EmptySlot: empty
              }), _$p));
              return _el$7;
            })();
          }
        }));
        return _el$6;
      }
    }), null);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return props?.ability_entry_data?.[0]?.id;
      },
      get children() {
        return libs.createComponent(SuitIcon, {
          get suitName() {
            return props.ability_entry_data[0].id;
          }
        });
      }
    }), null);
    libs.effect(_p$ => {
      const _v$ = "Equipment Rarity" + props.rarity,
        _v$2 = props.onmouseover,
        _v$3 = props.onmouseout,
        _v$4 = `file://{images}/custom_game/store_items/${iconName()}.png`;
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$, "onmouseover", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$, "onmouseout", _v$3, _p$._v$3));
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$2, "src", _v$4, _p$._v$4));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$;
  })();
}
function Gem(props) {
  const iconName = () => KeyValues.info_item_gem[props.gem_item_id]?.icon;
  const rarity = () => {
    if (props.rarity != undefined) {
      return props.rarity;
    }
    return KeyValues.info_item_gem[props.gem_item_id]?.rarity ?? 0;
  };
  return (() => {
    const _el$9 = libs.createElement("Panel", {
        get ["class"]() {
          return "Gem Rarity" + rarity();
        }
      }, null),
      _el$0 = libs.createElement("Image", {
        id: "GemIcon",
        get src() {
          return `file://{images}/custom_game/store_items/${iconName()}.png`;
        }
      }, _el$9);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return props.locked;
      },
      get children() {
        return libs.createElement("Panel", {
          id: "Lock"
        }, null);
      }
    }), null);
    libs.insert(_el$9, libs.createComponent(libs.Show, {
      get when() {
        return props.level > 0;
      },
      get children() {
        const _el$10 = libs.createElement("Label", {
          id: "LevelLabel",
          get text() {
            return "+" + props.level;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$10, "text", "+" + props.level, _$p));
        return _el$10;
      }
    }), null);
    libs.effect(_p$ => {
      const _v$5 = "Gem Rarity" + rarity(),
        _v$6 = `file://{images}/custom_game/store_items/${iconName()}.png`;
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$9, "class", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$0, "src", _v$6, _p$._v$6));
      return _p$;
    }, {
      _v$5: undefined,
      _v$6: undefined
    });
    return _el$9;
  })();
}
function SuitIcon(props) {
  return (() => {
    const _el$11 = libs.createElement("Image", {
      "class": "SuitIcon",
      get backgroundImage() {
        return getImagePath(`suit_icons/${props.suitName}.png`);
      }
    }, null);
    libs.effect(_$p => libs.setProp(_el$11, "backgroundImage", getImagePath(`suit_icons/${props.suitName}.png`), _$p));
    return _el$11;
  })();
}
function EquipmentIcon(props) {
  const iconName = () => KeyValues.info_item_equipment[props.equipment_item_id].icon;
  return (() => {
    const _el$12 = libs.createElement("Panel", {
        get ["class"]() {
          return "EquipmentIcon Rarity" + props.rarity;
        }
      }, null),
      _el$13 = libs.createElement("Image", {
        get src() {
          return `file://{images}/custom_game/store_items/${iconName()}.png`;
        }
      }, _el$12);
    libs.effect(_p$ => {
      const _v$7 = "EquipmentIcon Rarity" + props.rarity,
        _v$8 = `file://{images}/custom_game/store_items/${iconName()}.png`;
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$12, "class", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$13, "src", _v$8, _p$._v$8));
      return _p$;
    }, {
      _v$7: undefined,
      _v$8: undefined
    });
    return _el$12;
  })();
}

exports.Equipment = Equipment;
exports.EquipmentIcon = EquipmentIcon;
exports.Gem = Gem;
exports.SuitIcon = SuitIcon;