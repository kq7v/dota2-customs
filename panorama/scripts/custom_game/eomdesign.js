--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOMDesign', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const ADDON_NAME = "C4";
const SUPPORT_CSS_LIST = ["flowChildren", "width", "height", "tooltipPosition", "verticalAlign", "horizontalAlign", "align", "margin", "marginTop", "marginLeft", "marginBottom", "marginRight", "padding", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "overflow", "backgroundImage", "backgroundSize", "backgroundColor", "washColor", "opacity", "opacity", "x", "y", "zIndex", "fontSize", "fontFamily", "textShadow", "textDecoration", "color", "scroll", "style"];
function EOMProps(props, defaultProps = {}) {
  const [css, others] = libs.splitProps(props, SUPPORT_CSS_LIST);
  const [combine, final] = libs.splitProps(others, ["class", "classList", "className", "customTooltip", "tooltip", "titleTooltip"]);
  if (css.scroll != undefined) {
    css.overflow = getOverflow(css.scroll);
    delete css.scroll;
  }
  const [htmlStyle, htmlCss] = libs.splitProps(css, ["style"]);
  let style = {
    style: htmlCss
  };
  if (htmlStyle.style != undefined) {
    style.style = Object.assign(style.style, {
      ...htmlStyle.style
    });
  }
  defaultProps.style = Object.assign(Object.fromEntries(Object.entries(defaultProps.style ?? {}).filter(([key, value]) => value !== undefined)), style.style ?? {});
  defaultProps.class = (defaultProps.class ?? "") + " " + (props.class ?? "");
  defaultProps.classList = Object.assign(defaultProps.classList ?? {}, props.classList ?? {});
  defaultProps.className = libs.classNames(defaultProps.className ?? "", props.className ?? "");
  if (combine.customTooltip != undefined) {
    defaultProps.custom_tooltip = [props.customTooltip.name, `file://{resources}/layout/custom_game/${props.customTooltip.name}.xml`];
    defaultProps.custom_tooltip_params = props.customTooltip;
  }
  if (combine.tooltip != undefined) {
    defaultProps.tooltip_text = combine.tooltip;
  }
  return libs.mergeProps$1(defaultProps, final);
}
function getOverflow(scroll) {
  switch (scroll) {
    case "x":
      return "scroll squish";
    case "y":
      return "squish scroll";
    case "both":
      return "scroll scroll";
    case "none":
    case ["none", "none"]:
      return "squish squish";
  }
}

exports.ADDON_NAME = ADDON_NAME;
exports.EOMProps = EOMProps;