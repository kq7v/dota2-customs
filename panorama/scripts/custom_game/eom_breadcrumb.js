--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Breadcrumb', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var GenericPanel = require('./GenericPanel.js');
var EOM_Panel = require('./EOM_Panel.js');

const EOM_Breadcrumb = props => {
  const merged = libs.mergeProps({
    list: [],
    activateType: "onactivate",
    group: doUniqueString("EOM_Breadcrumb")
  }, props);
  const [local, others] = libs.splitProps(merged, ["children", "list", "defaultSelected", "selected", "group", "activateType"]);
  const [selectedIndex, setSelectedIndex] = libs.createSignal(local.defaultSelected != undefined ? Math.min(local.list.length - 1, Math.max(0, local.defaultSelected - 1)) : undefined);
  const onHover = index => {
    if (local.activateType == "onhover") {
      onSelect(index);
    }
  };
  const onSelect = index => {
    setSelectedIndex(index);
    if (others.onChange) {
      others.onChange(index + 1, local.list[index]);
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(() => EOM_Panel.EOMProps(others, {
      className: "EOM_Breadcrumb"
    })), null);
    libs.spread(_el$, libs.mergeProps$1(() => EOM_Panel.EOMProps(others, {
      className: "EOM_Breadcrumb"
    })), true);
    libs.insert(_el$, () => {
      let selected = local.selected;
      return libs.createComponent(libs.For, {
        get each() {
          return local.list;
        },
        children: (name, index) => {
          if (index() > 0) {
            return [libs.createComponent(GenericPanel.CLabel, {
              className: "EOM_BreadcrumbSeparator",
              text: "/"
            }), libs.createComponent(GenericPanel.TabButton, {
              get selected() {
                return selected != undefined ? selected - 1 == index() : selectedIndex() == index();
              },
              get group() {
                return local.group;
              },
              onactivate: () => onSelect(index()),
              text: "#" + name,
              onmouseover: () => onHover(index())
            })];
          } else {
            return libs.createComponent(GenericPanel.TabButton, {
              get selected() {
                return selected != undefined ? selected - 1 == index() : selectedIndex() == index();
              },
              get group() {
                return local.group;
              },
              onactivate: () => onSelect(index()),
              text: "#" + name,
              onmouseover: () => onHover(index())
            });
          }
        }
      });
    });
    return _el$;
  })();
};

exports.EOM_Breadcrumb = EOM_Breadcrumb;