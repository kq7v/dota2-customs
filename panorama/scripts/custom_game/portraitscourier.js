--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('portraitsCourier', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const PortraitsCourier = props => {
  const [local, others] = libs.splitProps(props, ["class", "scale", "courier_id", "allowrotation"]);
  const [key, SetKey] = libs.createSignal(undefined);
  const [sceneEnabled, setSceneEnabled] = libs.createSignal(false);
  const entityName = "courier";
  let queueReleased = false;
  const queueToken = QueueSerialSceneEntityLoad(entityName, () => {
    setSceneEnabled(true);
  });
  const releaseQueueToken = () => {
    if (!queueReleased) {
      queueReleased = true;
      ReleaseSerialSceneEntityLoad(entityName, queueToken);
    }
  };
  libs.onCleanup(() => {
    let s = key();
    if (s != undefined) {
      StopWaitSceneEntityLoad(entityName, s);
      SetKey(undefined);
    }
    releaseQueueToken();
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("PortraitsCourier", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("PortraitsCourier", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return sceneEnabled();
      },
      get children() {
        const _el$2 = libs.createElement("DOTAScenePanel", {
          id: "PortraitsCourierScene",
          "animate-during-pause": true,
          map: "scene/courier",
          camera: "camera_1",
          light: "portrait_light",
          renderdeferred: true,
          rendershadows: true,
          deferredalpha: true,
          particleonly: false,
          get allowrotation() {
            return local.allowrotation;
          },
          antialias: true,
          yawmax: 40,
          yawmin: 40
        }, null);
        libs.use(self => {
          SetKey(WaitSceneEntityLoad(entityName, {
            id: local.courier_id,
            scale: local.scale
          }));
          let checkUpdate = () => {
            let s = key();
            if (!self.IsValid() || s == undefined) {
              if (s != undefined) {
                StopWaitSceneEntityLoad(entityName, s);
                SetKey(undefined);
              }
              releaseQueueToken();
            } else {
              $.Schedule(0, checkUpdate);
            }
          };
          checkUpdate();
        }, _el$2);
        libs.setProp(_el$2, "onload", self => {
          let s = key();
          if (s != undefined) {
            StopWaitSceneEntityLoad(entityName, s);
            SetKey(undefined);
            self.FireEntityInput("courier", "SetIdleAnimation", "ACT_DOTA_SPAWN");
            self.FireEntityInput("courier", "SetIdleAnimationLooping", "ACT_DOTA_IDLE");
          }
          releaseQueueToken();
        });
        libs.effect(_$p => libs.setProp(_el$2, "allowrotation", local.allowrotation, _$p));
        return _el$2;
      }
    }));
    return _el$;
  })();
};

exports.PortraitsCourier = PortraitsCourier;