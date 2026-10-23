--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('EOM_Loading', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Loading = props => {
  const merged = libs.mergeProps({
    color: "#fff"
  }, props, {
    class: libs.classNames("EOM_Loading", props.type)
  });
  const [local, others] = libs.splitProps(merged, ["type", "color"]);
  const {
    type = "Wave",
    color
  } = local;
  if (type == "Wave") {
    return (() => {
      const _el$ = libs.createElement("Panel", others, null),
        _el$2 = libs.createElement("Image", {
          "class": "WaveCol1",
          backgroundColor: color
        }, _el$),
        _el$3 = libs.createElement("Image", {
          "class": "WaveCol2",
          backgroundColor: color
        }, _el$),
        _el$4 = libs.createElement("Image", {
          "class": "WaveCol3",
          backgroundColor: color
        }, _el$),
        _el$5 = libs.createElement("Image", {
          "class": "WaveCol4",
          backgroundColor: color
        }, _el$),
        _el$6 = libs.createElement("Image", {
          "class": "WaveCol5",
          backgroundColor: color
        }, _el$),
        _el$7 = libs.createElement("Image", {
          "class": "WaveCol6",
          backgroundColor: color
        }, _el$),
        _el$8 = libs.createElement("Image", {
          "class": "WaveCol7",
          backgroundColor: color
        }, _el$),
        _el$9 = libs.createElement("Image", {
          "class": "WaveCol8",
          backgroundColor: color
        }, _el$);
      libs.spread(_el$, others, true);
      libs.setProp(_el$2, "backgroundColor", color);
      libs.setProp(_el$3, "backgroundColor", color);
      libs.setProp(_el$4, "backgroundColor", color);
      libs.setProp(_el$5, "backgroundColor", color);
      libs.setProp(_el$6, "backgroundColor", color);
      libs.setProp(_el$7, "backgroundColor", color);
      libs.setProp(_el$8, "backgroundColor", color);
      libs.setProp(_el$9, "backgroundColor", color);
      return _el$;
    })();
  } else if (type == "Matrix") {
    return (() => {
      const _el$0 = libs.createElement("Panel", others, null),
        _el$1 = libs.createElement("Panel", {
          width: "100%",
          height: "100%",
          flowChildren: "down"
        }, _el$0),
        _el$10 = libs.createElement("Panel", {
          width: "100%",
          height: "25%",
          "class": "Row1",
          flowChildren: "right"
        }, _el$1),
        _el$11 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$10),
        _el$12 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$10),
        _el$13 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$10),
        _el$14 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$10),
        _el$15 = libs.createElement("Panel", {
          width: "100%",
          height: "25%",
          "class": "Row2",
          flowChildren: "right"
        }, _el$1),
        _el$16 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$15),
        _el$17 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$15),
        _el$18 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$15),
        _el$19 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$15),
        _el$20 = libs.createElement("Panel", {
          width: "100%",
          height: "25%",
          "class": "Row3",
          flowChildren: "right"
        }, _el$1),
        _el$21 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$20),
        _el$22 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$20),
        _el$23 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$20),
        _el$24 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$20),
        _el$25 = libs.createElement("Panel", {
          width: "100%",
          height: "25%",
          "class": "Row4",
          flowChildren: "right"
        }, _el$1),
        _el$26 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$25),
        _el$27 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$25),
        _el$28 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$25),
        _el$29 = libs.createElement("Image", {
          backgroundColor: color
        }, _el$25);
      libs.spread(_el$0, others, true);
      libs.setProp(_el$1, "width", "100%");
      libs.setProp(_el$1, "height", "100%");
      libs.setProp(_el$1, "flowChildren", "down");
      libs.setProp(_el$10, "width", "100%");
      libs.setProp(_el$10, "height", "25%");
      libs.setProp(_el$10, "flowChildren", "right");
      libs.setProp(_el$11, "backgroundColor", color);
      libs.setProp(_el$12, "backgroundColor", color);
      libs.setProp(_el$13, "backgroundColor", color);
      libs.setProp(_el$14, "backgroundColor", color);
      libs.setProp(_el$15, "width", "100%");
      libs.setProp(_el$15, "height", "25%");
      libs.setProp(_el$15, "flowChildren", "right");
      libs.setProp(_el$16, "backgroundColor", color);
      libs.setProp(_el$17, "backgroundColor", color);
      libs.setProp(_el$18, "backgroundColor", color);
      libs.setProp(_el$19, "backgroundColor", color);
      libs.setProp(_el$20, "width", "100%");
      libs.setProp(_el$20, "height", "25%");
      libs.setProp(_el$20, "flowChildren", "right");
      libs.setProp(_el$21, "backgroundColor", color);
      libs.setProp(_el$22, "backgroundColor", color);
      libs.setProp(_el$23, "backgroundColor", color);
      libs.setProp(_el$24, "backgroundColor", color);
      libs.setProp(_el$25, "width", "100%");
      libs.setProp(_el$25, "height", "25%");
      libs.setProp(_el$25, "flowChildren", "right");
      libs.setProp(_el$26, "backgroundColor", color);
      libs.setProp(_el$27, "backgroundColor", color);
      libs.setProp(_el$28, "backgroundColor", color);
      libs.setProp(_el$29, "backgroundColor", color);
      return _el$0;
    })();
  } else if (type == "PointSpin") {
    return (() => {
      const _el$30 = libs.createElement("Panel", others, null),
        _el$31 = libs.createElement("Image", {
          "class": "Point1",
          backgroundColor: color
        }, _el$30),
        _el$32 = libs.createElement("Image", {
          "class": "Point2",
          backgroundColor: color
        }, _el$30),
        _el$33 = libs.createElement("Image", {
          "class": "Point3",
          backgroundColor: color
        }, _el$30),
        _el$34 = libs.createElement("Image", {
          "class": "Point4",
          backgroundColor: color
        }, _el$30);
      libs.spread(_el$30, others, true);
      libs.setProp(_el$31, "backgroundColor", color);
      libs.setProp(_el$32, "backgroundColor", color);
      libs.setProp(_el$33, "backgroundColor", color);
      libs.setProp(_el$34, "backgroundColor", color);
      return _el$30;
    })();
  } else if (type == "PointQueue") {
    return (() => {
      const _el$35 = libs.createElement("Panel", others, null),
        _el$36 = libs.createElement("Image", {
          "class": "Point1",
          backgroundColor: color
        }, _el$35),
        _el$37 = libs.createElement("Image", {
          "class": "Point2",
          backgroundColor: color
        }, _el$35),
        _el$38 = libs.createElement("Image", {
          "class": "Point3",
          backgroundColor: color
        }, _el$35);
      libs.spread(_el$35, others, true);
      libs.setProp(_el$36, "backgroundColor", color);
      libs.setProp(_el$37, "backgroundColor", color);
      libs.setProp(_el$38, "backgroundColor", color);
      return _el$35;
    })();
  }
};

exports.EOM_Loading = EOM_Loading;