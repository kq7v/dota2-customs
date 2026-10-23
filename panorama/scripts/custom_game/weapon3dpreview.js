--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('weapon3DPreview', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const Weapon3DPreview = props => {
  const [local, others] = libs.splitProps(props, ["class", "children"]);
  const [key, SetKey] = libs.createSignal(undefined);
  const [sceneEnabled, setSceneEnabled] = libs.createSignal(false);
  const entityName = "weapon_3d_preview";
  let queueReleased = false;
  let reload = false;
  let queueToken = QueueSerialSceneEntityLoad(entityName, () => {
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
        return libs.classNames("Weapon3DPreview", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("Weapon3DPreview", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return sceneEnabled();
      },
      get children() {
        const _el$2 = libs.createElement("DOTAScenePanel", {
          id: "Weapon3DPreviewScene",
          "animate-during-pause": true,
          map: "scene/weapon_3d_preview",
          camera: "camera_1",
          light: "portrait_light",
          renderdeferred: true,
          rendershadows: true,
          deferredalpha: true,
          particleonly: false,
          allowrotation: true,
          antialias: true
        }, null);
        libs.use(self => {
          reload = false;
          SetKey(WaitSceneEntityLoad(entityName, {
            model: props.model,
            default_config: String(props.defaultConfig)
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
          if (reload) {
            setSceneEnabled(false);
            queueReleased = false;
            queueToken = QueueSerialSceneEntityLoad(entityName, () => {
              setSceneEnabled(true);
            });
          } else {
            let s = key();
            if (s != undefined) {
              StopWaitSceneEntityLoad(entityName, s);
              SetKey(undefined);
            }
            releaseQueueToken();
            if (reload == false) {
              reload = true;
            }
          }
        });
        return _el$2;
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

exports.Weapon3DPreview = Weapon3DPreview;