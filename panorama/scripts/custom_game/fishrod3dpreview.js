--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('fishRod3DPreview', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const FishRod3DPreview = props => {
  const [local, others] = libs.splitProps(props, ["model", "class", "children"]);
  const [key, setKey] = libs.createSignal(undefined);
  const [sceneEnabled, setSceneEnabled] = libs.createSignal(false);
  const entityName = "fish_rod_preview";
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
    const currentKey = key();
    if (currentKey != undefined) {
      StopWaitSceneEntityLoad(entityName, currentKey);
      setKey(undefined);
    }
    releaseQueueToken();
  });
  return (() => {
    const _el$ = libs.createElement("Panel", libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("FishRod3DPreview", local.class);
      }
    }), null);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("FishRod3DPreview", local.class);
      }
    }), true);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return sceneEnabled();
      },
      get children() {
        const _el$2 = libs.createElement("DOTAScenePanel", {
          id: "FishRod3DPreviewScene",
          "animate-during-pause": true,
          map: "scene/fish_rod_preview",
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
          setKey(WaitSceneEntityLoad(entityName, {
            model: local.model
          }));
          const checkUpdate = () => {
            const currentKey = key();
            if (!self.IsValid() || currentKey == undefined) {
              if (currentKey != undefined) {
                StopWaitSceneEntityLoad(entityName, currentKey);
                setKey(undefined);
              }
              releaseQueueToken();
            } else {
              $.Schedule(0, checkUpdate);
            }
          };
          checkUpdate();
        }, _el$2);
        libs.setProp(_el$2, "onload", () => {
          const currentKey = key();
          if (currentKey != undefined) {
            StopWaitSceneEntityLoad(entityName, currentKey);
            setKey(undefined);
          }
          releaseQueueToken();
        });
        return _el$2;
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

exports.FishRod3DPreview = FishRod3DPreview;