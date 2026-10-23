--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const exports = {}; GameUI.__loadModule('portraitsFullBodyLoadout', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const PortraitsFullBodyLoadout = props => {
  const [local, others] = libs.splitProps(props, ["unit", "class", "camera", "background", "allowrotation", "children"]);
  const [key, SetKey] = libs.createSignal(undefined);
  const [sceneEnabled, setSceneEnabled] = libs.createSignal(false);
  const entityName = "portraits_full_body_loadout";
  let camera = libs.createMemo(() => local.camera ?? "default");
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
          return libs.classNames("PortraitsFullBodyLoadout", local.class);
        }
      }), null),
      _el$2 = libs.createElement("DOTAScenePanel", {
        id: "PortraitsFullBodyLoadoutBG",
        hittest: false
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1(others, {
      get ["class"]() {
        return libs.classNames("PortraitsFullBodyLoadout", local.class);
      }
    }), true);
    libs.use(self => {
      if (local.background) {
        const kv = KeyValues.npc_units_custom[local.unit] ?? KeyValues.heroes[local.unit];
        if (kv != undefined && kv.Model2D != undefined && kv.Model2D != "") {
          self.SetUnit(kv.Model2D, "", true);
        }
      }
    }, _el$2);
    libs.insert(_el$, libs.createComponent(libs.Show, {
      get when() {
        return sceneEnabled();
      },
      get children() {
        const _el$3 = libs.createElement("DOTAScenePanel", {
          id: "PortraitsFullBodyLoadoutScene",
          "animate-during-pause": true,
          map: "scene/portraits_full_body_loadout",
          get camera() {
            return camera();
          },
          light: "portrait_light",
          renderdeferred: true,
          rendershadows: true,
          deferredalpha: true,
          particleonly: false,
          get allowrotation() {
            return local.allowrotation;
          },
          antialias: true
        }, null);
        libs.use(self => {
          reload = false;
          SetKey(WaitSceneEntityLoad(entityName, {
            unitname: local.unit,
            camera: camera()
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
        }, _el$3);
        libs.setProp(_el$3, "onload", self => {
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
        libs.effect(_p$ => {
          const _v$ = camera(),
            _v$2 = local.allowrotation;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "camera", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "allowrotation", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$3;
      }
    }), null);
    libs.insert(_el$, () => local.children, null);
    return _el$;
  })();
};

exports.PortraitsFullBodyLoadout = PortraitsFullBodyLoadout;