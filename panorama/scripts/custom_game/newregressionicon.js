--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('NewRegressionIcon', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Panel = require('./EOM_Panel.js');

const NewRegressionIcon = props => {
  const [local, others] = libs.splitProps(props, ["show_tooltip", "children"]);
  let timer;
  libs.onCleanup(() => {
    if (timer) {
      $.CancelScheduled(timer);
    }
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps(() => EOM_Panel.EOMProps(others, {
        className: libs.classNames("NewRegressionIcon", {
          ShowTooltip: local.show_tooltip
        })
      }), {
        get hittest() {
          return !local.show_tooltip;
        }
      }), null);
      libs.createElement("DOTAParticleScenePanel", {
        id: "NewRegressionIcon_Particle",
        hittest: false,
        particleName: "particles/eom/ui/ui_fx/activity_special_player.vpcf",
        squarePixels: true,
        startActive: false,
        cameraOrigin: "0 0 300",
        lookAt: "0 0 0",
        fov: 25
      }, _el$);
      const _el$3 = libs.createElement("Image", {
        id: "NewRegressionIcon_Image"
      }, _el$);
    libs.spread(_el$, libs.mergeProps(() => EOM_Panel.EOMProps(others, {
      className: libs.classNames("NewRegressionIcon", {
        ShowTooltip: local.show_tooltip
      })
    }), {
      get hittest() {
        return !local.show_tooltip;
      }
    }), true);
    libs.setProp(_el$3, "onmouseover", self => {
      if (local.show_tooltip) {
        if (timer) {
          $.CancelScheduled(timer);
        }
        timer = $.Schedule(0.2, () => {
          timer = undefined;
          if (self?.IsValid()) {
            let p = self.GetParent();
            let scene = p?.FindChild("NewRegressionIcon_Particle");
            if (scene) {
              scene.style.opacity = ".7";
              scene.StartParticles();
            }
            self.AddClass("Hover");
            $.DispatchEvent("DOTAShowTitleTextTooltip", self, "#ActivitySpecialPlayer", "#ActivitySpecialPlayer_description");
          }
        });
      }
    });
    libs.setProp(_el$3, "onmouseout", self => {
      if (timer) {
        $.CancelScheduled(timer);
      }
      timer = undefined;
      let p = self.GetParent();
      let scene = p?.FindChild("NewRegressionIcon_Particle");
      if (scene) {
        scene.style.opacity = "0.01";
        scene.StopParticlesWithEndcaps();
      }
      self.RemoveClass("Hover");
      $.DispatchEvent("DOTAHideTitleTextTooltip", self);
    });
    return _el$;
  })();
};

exports.NewRegressionIcon = NewRegressionIcon;