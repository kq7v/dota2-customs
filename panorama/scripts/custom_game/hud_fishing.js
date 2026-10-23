--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_GamePad = require('./EOM_GamePad.js');
var EOM_HotKeyDisplay = require('./EOM_HotKeyDisplay.js');
var StoreItem = require('./StoreItem.js');
var solid_utils = require('./solid_utils.js');
require('./EOM_Countdown.js');
require('./EOM_ImageNumber.js');
require('./EOM_Button.js');
require('./Player.js');
require('./service_netdata_helper.js');
require('./EOM_TextEntry.js');
require('./equipment_utils.js');

const BRAKING_AUTO_FISHING_CONFIG = {
  enabled: true,
  topLockZone: 520,
  topReleaseZone: 900,
  bottomInterceptZone: 420,
  bottomRepressWindow: 260,
  bottomSoftLandingVelocity: 120,
  bottomRepressVelocityThreshold: 80,
  fishLeadFrames: 5,
  catchUpDeadZone: 120,
  brakeBuffer: 180,
  maintainDeadZone: 110,
  velocityMatchThreshold: 50,
  minPressFrames: 2,
  minReleaseFrames: 2,
  reactionDelayMinFrames: 2,
  reactionDelayMaxFrames: 5,
  brakeLookaheadFrames: 90,
  edgeBuffer: 220,
  edgeVelocityThreshold: 130
};
const ACTIVE_AUTO_FISHING_CONFIG = BRAKING_AUTO_FISHING_CONFIG;
const AUTO_BOX_PROGRESS_FRAMES = 45;
class SingleFishing {
  fish_state = "waiting";
  canceled = false;
  started = false;
  ready_fishing = false;
  netdata_listeners = [];
  gameevent_listeners = [];
  timer_tick = 1 / 60;
  fishing_frame = 0;
  hook_frame = 0;
  last_unhook_frame = 0;
  last_hook_state = false;
  start_delay = 100;
  obs_info = [];
  object_info = {};
  opreate_record = "";
  frame_operate = false;
  fishing_unique = "";
  interactioning = false;
  auto_press_frames = 0;
  auto_release_frames = 0;
  auto_reaction_delay_frames = 0;
  action_seq = [];
  action_seq_step = 0;
  current_action_seq = null;
  playerFishData = {
    wait_time: 0,
    hook_width: 0,
    hook_force: 0,
    hook_need_frame: 0,
    operate_bag_index: 0,
    unique: "",
    box_auto_success: false
  };
  constructor() {
    this.default_config = getNetDataKey("common", "fish_interaction_config");
  }
  start(props) {
    if (this.started) {
      return;
    }
    this.set_fish_ui_props = props.setFishUIProps;
    this.set_fish_state = props.setFishingResult;
    this.get_auto_fishing_enabled = props.getAutoFishingEnabled;
    this.started = true;
    props.setFishUIProps({
      ["hook"]: {
        height: 0,
        hook_width: 0
      },
      ["fish"]: {
        height: 0,
        progress: this.default_config.start_progress / this.default_config.progress_limit * 100
      }
    });
    this.gameevent_listeners.push(GameEvents.Subscribe("fishing_action_seq_sync", eventData => {
      if (this.fishing_unique != eventData.unique) {
        return;
      }
      const step = eventData.step;
      if (step != this.action_seq_step) {
        return;
      }
      this.action_seq_step++;
      if (this.action_seq_step == 1) {
        this.startFishing();
      }
      const decoded_seqs = JSON.parse(eventData.action_seqs);
      this.action_seq = this.action_seq.concat(decoded_seqs);
    }));
    this.netdata_listeners.push(useNetDataKey("common", "fish_state", state => {
      this.fish_state = state ?? "none";
      props.setFishingResult(this.fish_state);
      this.waitFishHook();
    }, Players.GetLocalPlayer()));
    this.netdata_listeners.push(useNetDataKey("common", "fishing_data", data => {
      if (data !== undefined) {
        this.playerFishData = data;
        this.waitFishHook();
      }
    }, Players.GetLocalPlayer()));
  }
  cancel() {
    if (!this.started) {
      return;
    }
    if (this.canceled) {
      return;
    }
    this.stopFishTimer();
    if (this.wait_timer != undefined) {
      $.CancelScheduled(this.wait_timer);
      delete this.wait_timer;
    }
    if (this.set_fish_state) {
      this.set_fish_state("none");
    }
    if (this.set_fish_ui_props) {
      this.set_fish_ui_props({});
    }
    this.canceled = true;
    this.fish_state = "none";
    this.dispose();
  }
  init() {
    this.ready_fishing = false;
    this.fishing_frame = 0;
    this.last_unhook_frame = 0;
    this.last_hook_state = false;
    this.fishing_unique = this.playerFishData.unique;
    this.action_seq_step = 0;
    this.hook_frame = 0;
    this.action_seq = [];
    this.opreate_record = "";
    this.hooked_state = undefined;
    this.current_action_seq = null;
    this.auto_press_frames = 0;
    this.auto_release_frames = 0;
    this.auto_pending_operate = undefined;
    this.auto_pending_apply_frame = undefined;
    this.auto_reaction_delay_frames = 0;
    if (this.set_fish_ui_props) {
      this.set_fish_ui_props({
        ["hook"]: {
          height: 0,
          hook_width: 0
        },
        ["fish"]: {
          height: 0,
          type: this.playerFishData.fish_type,
          progress: this.default_config.start_progress / this.default_config.progress_limit * 100
        }
      });
      this.set_fish_ui_props("box", undefined);
    }
  }
  dispose() {
    this.stopFishTimer();
    if (this.wait_timer != undefined) {
      $.CancelScheduled(this.wait_timer);
      delete this.wait_timer;
    }
    this.gameevent_listeners.forEach(v => GameEvents.Unsubscribe(v));
    this.gameevent_listeners = [];
    this.netdata_listeners.forEach(v => CustomNetTables.UnsubscribeNetTableListener(v));
    this.netdata_listeners = [];
    this.object_info = {};
    this.action_seq = [];
    this.current_action_seq = null;
    this.hooked_state = undefined;
    this.interactioning = false;
    this.frame_operate = false;
    this.ready_fishing = false;
    this.started = false;
  }
  hookFish() {
    if (this.hooked_state != undefined) {
      return this.hooked_state;
    }
    GameEvents.SendCustomEventToServer("fishing_interactive", {
      state: 2,
      extra_data: this.hook_frame
    });
    this.stopFishTimer();
    this.hooked_state = this.hook_frame <= this.playerFishData.hook_need_frame;
    if (this.playerFishData.fish_type == "rubbish") {
      this.fish_state = this.hooked_state ? "hooked" : "unhook";
    } else {
      this.fish_state = this.hooked_state ? "fishing" : "unhook";
      this.set_fish_ui_props("hook", "hook_width", this.playerFishData.hook_width);
    }
    this.set_fish_state(this.fish_state);
    return this.hooked_state;
  }
  readyFishing() {
    if (this.ready_fishing) {
      return;
    }
    this.ready_fishing = true;
    this.startFishing();
  }
  OnInteractionPress() {
    if (this.isAutoFishingEnabled()) {
      return;
    }
    if (this.fish_state == "hook") {
      this.hookFish();
    } else if (this.fish_state == "fishing") {
      this.interactioning = true;
      this.frame_operate = true;
    }
  }
  OnInteractionRelease() {
    if (this.isAutoFishingEnabled()) {
      return;
    }
    this.interactioning = false;
  }
  waitFishHook() {
    if (this.fish_state == "waiting" && this.fishing_unique != this.playerFishData.unique && this.playerFishData.wait_time > 0 && this.wait_timer == undefined) {
      this.init();
      this.wait_timer = $.Schedule(this.playerFishData.wait_time, () => {
        this.fish_state = "hook";
        this.wait_timer = undefined;
        this.set_fish_state(this.fish_state);
        this.startTimer();
        this.scheduleAutoHook();
      });
    }
  }
  startFishing() {
    print("startFishing000", this.ready_fishing, this.action_seq_step);
    if (this.ready_fishing && this.action_seq_step == 1) {
      print("startFishing111");
      this.object_info = {
        ["hook"]: {
          position: 0,
          velocity: 0,
          hook_width: this.playerFishData.hook_width
        },
        ["fish"]: {
          position: 0,
          velocity: 0,
          progress: this.default_config.start_progress
        }
      };
      this.startTimer(true);
    }
  }
  startTimer(fishing = false) {
    if (fishing) print("startTimer000");
    if (!this.started) {
      return;
    }
    if (fishing) print("startTimer111");
    if (this.canceled) {
      return;
    }
    if (fishing) print("startTimer222");
    if (this.fish_timer != undefined) {
      return;
    }
    if (fishing) print("startTimer333");
    this.frame_operate = this.interactioning;
    this.onFishTimer();
  }
  onFishTimer() {
    this.frameUpdate();
    this.fish_timer = $.Schedule(this.timer_tick, () => {
      this.onFishTimer();
    });
  }
  frameUpdate() {
    if (Game.IsGamePaused()) {
      return;
    }
    if (this.fish_state == "hook") {
      this.hook_frame++;
      if (this.hook_frame > this.playerFishData.hook_need_frame) {
        this.hookFish();
      }
      return;
    }
    if (this.fish_state != "fishing") {
      this.stopFishTimer();
      return;
    }
    this.fishing_frame++;
    this.updateAutoInteraction();
    this.updateHook();
    this.updateFish();
    this.updateBox();
    const finish = this.checkProgress();
    libs.batch(() => {
      const newFishProp = {
        height: (this.object_info["fish"]?.position ?? 0) / this.default_config.height_limit * 100,
        progress: this.object_info["fish"]?.progress ? this.object_info["fish"].progress / this.default_config.progress_limit * 100 : 0,
        success: this.object_info["fish"]?.success ?? false,
        type: this.playerFishData.fish_type
      };
      const newHookProp = {
        height: (this.object_info["hook"]?.position ?? 0) / this.default_config.height_limit * 100,
        hook_width: (this.playerFishData.hook_width || 0) / this.default_config.height_limit * 100
      };
      this.set_fish_ui_props("fish", newFishProp);
      this.set_fish_ui_props("hook", newHookProp);
      if (this.object_info["box"] != undefined) {
        const boxProp = {
          height: (this.object_info["box"]?.position ?? 0) / this.default_config.height_limit * 100,
          progress: this.object_info["box"]?.progress ? this.object_info["box"].progress / this.default_config.box_progress * 100 : 0,
          success: this.object_info["box"]?.success ?? false
        };
        this.set_fish_ui_props("box", boxProp);
      }
    });
    if (finish === true) {
      GameEvents.SendCustomEventToServer("update_fishing_operate", {
        operate_seqs: this.opreate_record,
        bag_index: this.playerFishData.operate_bag_index,
        unique: this.fishing_unique,
        finish: true
      });
      return;
    }
    if (this.fishing_frame % this.default_config.operate_sync_frame == 0) {
      GameEvents.SendCustomEventToServer("update_fishing_operate", {
        operate_seqs: this.opreate_record,
        bag_index: this.playerFishData.operate_bag_index,
        unique: this.fishing_unique
      });
      this.opreate_record = "";
    }
    if (this.fishing_frame % this.default_config.action_sync_frame == 0) {
      GameEvents.SendCustomEventToServer("request_fishing_action_seq", {
        step: this.action_seq_step
      });
    }
  }
  stopFishTimer() {
    if (this.fish_timer != undefined) {
      $.CancelScheduled(this.fish_timer);
      this.fish_timer = undefined;
    }
  }
  getAutoFishingConfig() {
    const enabled = this.get_auto_fishing_enabled ? this.get_auto_fishing_enabled() === true : false;
    return {
      ...ACTIVE_AUTO_FISHING_CONFIG,
      enabled
    };
  }
  isAutoFishingEnabled() {
    return this.getAutoFishingConfig().enabled === true;
  }
  isFishInTopLockZone(fishPosition, heightLimit, config) {
    return fishPosition >= heightLimit - config.topLockZone;
  }
  isFishInTopReleaseZone(fishPosition, heightLimit, config) {
    return fishPosition >= heightLimit - config.topReleaseZone;
  }
  isFishInBottomInterceptZone(fishPosition, config) {
    return fishPosition <= config.bottomInterceptZone;
  }
  getCoverageError(fishPosition, hookTop, hookBottom) {
    if (fishPosition > hookBottom) {
      return fishPosition - hookBottom;
    }
    if (fishPosition < hookTop) {
      return fishPosition - hookTop;
    }
    return 0;
  }
  getHookAcceleration(pressing, velocity) {
    if (pressing) {
      return this.playerFishData.hook_force;
    }
    let acceleration = -this.playerFishData.hook_force;
    if (velocity > 0) {
      acceleration -= this.default_config.hook_resi;
    } else if (velocity < 0) {
      acceleration += this.default_config.hook_resi;
    }
    return acceleration;
  }
  getHookStoppingDistance(velocity, config) {
    if (velocity === 0) {
      return 0;
    }
    const brakingPress = velocity < 0;
    let simulateVelocity = velocity;
    let simulateDistance = 0;
    let frame = 0;
    while (frame < config.brakeLookaheadFrames) {
      simulateDistance += simulateVelocity;
      const nextVelocity = Clamp(simulateVelocity + this.getHookAcceleration(brakingPress, simulateVelocity), -this.default_config.hook_max_speed, this.default_config.hook_max_speed);
      if (simulateVelocity > 0 && nextVelocity <= 0 || simulateVelocity < 0 && nextVelocity >= 0) {
        break;
      }
      simulateVelocity = Round(nextVelocity);
      frame++;
    }
    return simulateDistance;
  }
  shouldBrakeToTarget(targetCenter, hookCenter, hookVelocity, config) {
    if (hookVelocity === 0) {
      return false;
    }
    const stopCenter = hookCenter + this.getHookStoppingDistance(hookVelocity, config);
    if (hookVelocity > 0) {
      return stopCenter >= targetCenter - config.brakeBuffer;
    }
    return stopCenter <= targetCenter + config.brakeBuffer;
  }
  canSwitchAutoOperate(nextOperate, config) {
    if (nextOperate === this.interactioning) {
      return true;
    }
    if (nextOperate) {
      return this.auto_release_frames >= config.minReleaseFrames;
    }
    return this.auto_press_frames >= config.minPressFrames;
  }
  updateAutoOperateFrames(nextOperate) {
    if (nextOperate) {
      this.auto_press_frames++;
      this.auto_release_frames = 0;
      return;
    }
    this.auto_release_frames++;
    this.auto_press_frames = 0;
  }
  clearPendingAutoOperate() {
    this.auto_pending_operate = undefined;
    this.auto_pending_apply_frame = undefined;
    this.auto_reaction_delay_frames = 0;
  }
  getRandomAutoReactionDelay(config) {
    const minFrames = Math.max(0, Math.min(config.reactionDelayMinFrames, config.reactionDelayMaxFrames));
    const maxFrames = Math.max(minFrames, Math.max(config.reactionDelayMinFrames, config.reactionDelayMaxFrames));
    const delayRange = maxFrames - minFrames + 1;
    return minFrames + Math.floor(Math.random() * delayRange);
  }
  scheduleAutoHook() {
    if (!this.isAutoFishingEnabled()) {
      return;
    }
    this.hookFish();
  }
  updateAutoInteraction() {
    if (!this.isAutoFishingEnabled() || this.fish_state != "fishing") {
      this.clearPendingAutoOperate();
      return;
    }
    const config = this.getAutoFishingConfig();
    const currentOperate = this.interactioning;
    const idealOperate = this.decideAutoOperate();
    if (idealOperate === currentOperate) {
      this.clearPendingAutoOperate();
      this.updateAutoOperateFrames(currentOperate);
      return;
    }
    if (!this.canSwitchAutoOperate(idealOperate, config)) {
      this.clearPendingAutoOperate();
      this.updateAutoOperateFrames(currentOperate);
      return;
    }
    if (this.auto_pending_operate !== idealOperate || this.auto_pending_apply_frame === undefined) {
      this.auto_pending_operate = idealOperate;
      this.auto_reaction_delay_frames = this.getRandomAutoReactionDelay(config);
      this.auto_pending_apply_frame = this.fishing_frame + this.auto_reaction_delay_frames;
    }
    if (this.auto_pending_apply_frame !== undefined && this.fishing_frame >= this.auto_pending_apply_frame) {
      this.interactioning = idealOperate;
      this.clearPendingAutoOperate();
    }
    this.updateAutoOperateFrames(this.interactioning);
  }
  decideTopLockOperate(props) {
    const shouldEnterTopLock = this.isFishInTopLockZone(props.fishPosition, this.default_config.height_limit, props.config);
    const shouldKeepTopLock = props.currentlyPressing && props.hookTop >= props.limitHeight - props.config.topReleaseZone && this.isFishInTopReleaseZone(props.fishPosition, this.default_config.height_limit, props.config);
    if (!shouldEnterTopLock && !shouldKeepTopLock) {
      return undefined;
    }
    return true;
  }
  decideBottomInterceptOperate(props) {
    const inBottomZone = this.isFishInBottomInterceptZone(props.fishPosition, props.config);
    const shouldKeepBottomMode = props.hookTop <= props.config.bottomRepressWindow && props.fishPosition <= props.config.bottomInterceptZone + props.config.bottomRepressWindow;
    if (!inBottomZone && !shouldKeepBottomMode) {
      return undefined;
    }
    if (props.hookVelocity > props.config.bottomRepressVelocityThreshold) {
      return false;
    }
    if (props.hookTop > props.config.bottomRepressWindow) {
      return false;
    }
    if (props.hookVelocity < -props.config.bottomSoftLandingVelocity) {
      return true;
    }
    if (props.hookVelocity > props.config.bottomSoftLandingVelocity) {
      return false;
    }
    if (props.fishPosition > props.hookBottom) {
      return true;
    }
    return false;
  }
  decideAutoOperate() {
    const hook_info = this.object_info["hook"];
    const fish_info = this.object_info["fish"];
    if (hook_info == undefined || fish_info == undefined) {
      return false;
    }
    const config = this.getAutoFishingConfig();
    const hook_width = this.playerFishData.hook_width || hook_info.hook_width || 0;
    const height_limit = this.default_config.height_limit;
    const limit_height = height_limit - hook_width;
    const hook_top = hook_info.position;
    const hook_bottom = hook_top + hook_width;
    const hook_center = hook_top + hook_width / 2;
    const fish_position = fish_info.position;
    const predicted_fish = Clamp(fish_position + fish_info.velocity * config.fishLeadFrames, hook_width / 2, height_limit - hook_width / 2);
    const target_center = predicted_fish;
    const error = target_center - hook_center;
    const coverage_error = this.getCoverageError(fish_position, hook_top, hook_bottom);
    const hook_velocity = hook_info.velocity;
    const fish_velocity = fish_info.velocity;
    const currentlyPressing = this.interactioning;
    const insideHook = coverage_error === 0;
    let nextOperate = currentlyPressing;
    const brakingNow = this.shouldBrakeToTarget(target_center, hook_center, hook_velocity, config);
    const topLockOperate = this.decideTopLockOperate({
      fishPosition: fish_position,
      hookTop: hook_top,
      hookVelocity: hook_velocity,
      limitHeight: limit_height,
      currentlyPressing,
      config
    });
    const bottomInterceptOperate = this.decideBottomInterceptOperate({
      fishPosition: fish_position,
      hookTop: hook_top,
      hookBottom: hook_bottom,
      hookVelocity: hook_velocity,
      currentlyPressing,
      config
    });
    if (topLockOperate !== undefined) {
      nextOperate = topLockOperate;
    } else if (bottomInterceptOperate !== undefined) {
      nextOperate = bottomInterceptOperate;
    } else if (hook_top <= config.edgeBuffer && hook_velocity < -config.edgeVelocityThreshold) {
      nextOperate = true;
    } else if (hook_bottom >= height_limit - config.edgeBuffer && hook_velocity > config.edgeVelocityThreshold) {
      nextOperate = false;
    } else if (insideHook) {
      if (brakingNow) {
        nextOperate = hook_velocity < 0;
      } else if (error > config.maintainDeadZone) {
        nextOperate = true;
      } else if (error < -config.maintainDeadZone) {
        nextOperate = false;
      } else if (hook_velocity - fish_velocity > config.velocityMatchThreshold) {
        nextOperate = false;
      } else if (fish_velocity - hook_velocity > config.velocityMatchThreshold) {
        nextOperate = true;
      }
    } else {
      if (brakingNow) {
        nextOperate = hook_velocity < 0;
      } else if (coverage_error > config.catchUpDeadZone) {
        nextOperate = true;
      } else if (coverage_error < -config.catchUpDeadZone) {
        nextOperate = false;
      } else if (coverage_error > 0) {
        nextOperate = true;
      } else if (coverage_error < 0) {
        nextOperate = false;
      } else if (error > 0) {
        nextOperate = true;
      } else if (error < 0) {
        nextOperate = false;
      }
    }
    return nextOperate;
  }
  getFishActionSeq(frame) {
    let shouldShift = false;
    if (this.current_action_seq == null) {
      shouldShift = true;
    } else {
      shouldShift = frame > this.current_action_seq.start_frame + this.current_action_seq.keep_frame;
    }
    if (shouldShift && this.action_seq.length > 0) {
      this.current_action_seq = this.action_seq.shift();
    }
    return this.current_action_seq;
  }
  updateFish() {
    const action_seq = this.getFishActionSeq(this.fishing_frame);
    if (action_seq == null) {
      return;
    }
    const fish_info = this.object_info["fish"];
    fish_info.position += fish_info.velocity;
    fish_info.velocity += action_seq.accelerate;
    fish_info.velocity = Round(fish_info.velocity);
    const height_limit = this.default_config.height_limit;
    if (fish_info.position < 0) {
      fish_info.position = 0;
      fish_info.velocity = 0;
    } else if (fish_info.position > height_limit) {
      fish_info.position = height_limit;
      fish_info.velocity = 0;
    }
  }
  updateHook() {
    const current_opreate = this.interactioning;
    this.frame_operate = current_opreate;
    if (current_opreate) {
      this.opreate_record += "1";
    } else {
      this.opreate_record += "0";
    }
    const hook_info = this.object_info["hook"];
    let acc_now = 0;
    const limit_height = this.default_config.height_limit - (this.playerFishData.hook_width || 0);
    let bounce = true;
    hook_info.position += hook_info.velocity;
    if (current_opreate) {
      acc_now = this.playerFishData.hook_force;
      if (hook_info.position >= limit_height) {
        hook_info.position = limit_height;
        hook_info.velocity = 0;
        bounce = false;
      } else {
        hook_info.velocity = Clamp(hook_info.velocity + acc_now, -this.default_config.hook_max_speed, this.default_config.hook_max_speed);
      }
    } else {
      acc_now = -this.playerFishData.hook_force;
      if (hook_info.velocity > 0) {
        acc_now -= this.default_config.hook_resi;
      } else if (hook_info.velocity < 0) {
        acc_now += this.default_config.hook_resi;
      }
      hook_info.velocity = Clamp(hook_info.velocity + acc_now, -this.default_config.hook_max_speed, this.default_config.hook_max_speed);
    }
    if (bounce) {
      if (hook_info.position < 0) {
        hook_info.position = 0;
        hook_info.velocity = Math.max(0, Math.abs(hook_info.velocity) - this.default_config.collision_velocity_reduce);
      } else if (hook_info.position > limit_height) {
        hook_info.position = limit_height;
        hook_info.velocity = Math.min(0, -(Math.abs(hook_info.velocity) - this.default_config.collision_velocity_reduce));
      }
    }
    hook_info.velocity = Round(hook_info.velocity);
  }
  updateBox() {
    if (this.playerFishData.box_appear_frame == undefined) {
      return;
    }
    if (this.object_info["box"] != undefined) {
      return;
    }
    if (this.fishing_frame >= this.playerFishData.box_appear_frame) {
      this.object_info["box"] = {
        position: this.playerFishData.box_position,
        velocity: 0,
        progress: 0,
        success: false
      };
    }
  }
  checkProgress() {
    const fish_info = this.object_info["fish"];
    const hook_info = this.object_info["hook"];
    if (fish_info === undefined || hook_info === undefined) {
      return;
    }
    const hook_top = hook_info.position;
    const hook_bottom = hook_info.position + (this.playerFishData.hook_width || 0);
    const box_info = this.object_info["box"];
    if (box_info != undefined && !box_info.success) {
      if (this.playerFishData.box_auto_success === true) {
        box_info.progress += this.default_config.box_progress / AUTO_BOX_PROGRESS_FRAMES;
      } else {
        const box_pos = box_info.position;
        if (box_pos >= hook_top && box_pos <= hook_bottom) {
          box_info.progress += this.default_config.hook_force;
        } else {
          box_info.progress -= this.default_config.unhook_force;
        }
      }
      box_info.progress = Clamp(box_info.progress, 0, this.default_config.box_progress);
      if (box_info.progress == this.default_config.box_progress) {
        box_info.success = true;
      }
    }
    const fish_pos = fish_info.position;
    const is_hooked = fish_pos >= hook_top && fish_pos <= hook_bottom;
    if (!is_hooked && this.last_hook_state) {
      this.last_unhook_frame = this.fishing_frame;
    }
    this.last_hook_state = is_hooked;
    if (fish_info.progress !== undefined) {
      if (is_hooked) {
        fish_info.progress += this.default_config.hook_force;
      } else {
        if (this.fishing_frame - this.last_unhook_frame >= this.default_config.unhook_delay) {
          fish_info.progress -= this.default_config.unhook_force;
        }
      }
      fish_info.progress = Clamp(fish_info.progress, 0, this.default_config.progress_limit);
      if (fish_info.progress >= this.default_config.progress_limit) {
        fish_info.success = true;
        this.fish_state = "success";
        this.set_fish_state("success");
        this.stopFishTimer();
        return true;
      } else if (fish_info.progress <= 0) {
        this.fish_state = "failure";
        this.set_fish_state("failure");
        this.stopFishTimer();
        return true;
      }
    }
  }
}

const MAX_FISH_STAR_COUNT = 5;
const clampFishWeight = weight => Math.max(0, Math.min(100, weight ?? 0));
const formatFishNumber = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const getFishRewardWeight = reward => reward?.fish_weight ?? reward?.weight;
const getFishCollectionData = fishItemID => {
  if (fishItemID === undefined) {
    return undefined;
  }
  return KeyValues.collection[String(fishItemID)];
};
const getFishStarCount = weight => {
  if (weight === undefined) {
    return 1;
  }
  const normalizedWeight = clampFishWeight(weight);
  if (normalizedWeight <= 0) {
    return 1;
  }
  return Math.min(MAX_FISH_STAR_COUNT, Math.ceil(normalizedWeight / 20));
};
const getMappedFishStatValue = (weight, min, max) => {
  if (min === undefined || max === undefined) {
    return undefined;
  }
  const normalizedWeight = clampFishWeight(weight);
  return min + (max - min) * normalizedWeight / 100;
};
const getMappedFishStatText = (weight, min, max, unit) => {
  const mappedValue = getMappedFishStatValue(weight, min, max);
  if (mappedValue === undefined) {
    return "-";
  }
  return `${Round(mappedValue, 1)}${unit}`;
};
const getFishLocalizedToken = (fishType, fishID) => {
  if (fishType == "rubbish") {
    return "#FishRubbish_" + fishID;
  }
  if (fishType == "normal") {
    return "#Normal_" + fishID;
  }
  return "#" + fishID;
};
const parseRewardItems = (rawRewards, valueTokenID) => {
  const parsedRewards = JSON.parseSafe(rawRewards);
  const rewards = Array.isArray(parsedRewards) ? parsedRewards : [];
  return rewards.map(reward => ({
    itemID: reward.item_id,
    amounts: reward.amounts,
    amountText: "x" + reward.amounts,
    localizedToken: "#" + reward.item_id,
    isValueToken: reward.item_id === valueTokenID
  }));
};
const createFishingSettlementModel = (payload, valueTokenID) => {
  const fishID = String(payload.fish_id);
  const fishWeight = getFishRewardWeight(payload);
  const fishCollection = getFishCollectionData(fishID);
  const fishRewards = parseRewardItems(payload.fish_rewards, valueTokenID);
  const boxRewards = parseRewardItems(payload.box_rewards, valueTokenID);
  const priceRewards = parseRewardItems(payload.fish_price, valueTokenID);
  const fishValue = priceRewards[0]?.amounts ?? 0;
  const boxCount = payload.box_count ?? 0;
  return {
    raw: payload,
    fish: {
      id: fishID,
      type: payload.fish_type,
      localizedToken: getFishLocalizedToken(payload.fish_type, fishID),
      level: KeyValues.idle_game_fish_type[fishID]?.level ?? 1,
      count: payload.fish_type === "rubbish" ? 1 : payload.fish_count,
      weight: fishWeight,
      starCount: getFishStarCount(fishWeight),
      weightText: getMappedFishStatText(fishWeight, fishCollection?.weight_min, fishCollection?.weight_max, "kg"),
      lengthText: getMappedFishStatText(fishWeight, fishCollection?.length_min, fishCollection?.length_max, "cm"),
      value: fishValue,
      valueText: formatFishNumber(fishValue),
      valueTokenID: valueTokenID,
      rewards: fishRewards,
      displayRewards: fishRewards.filter(reward => !reward.isValueToken)
    },
    box: {
      visible: boxCount > 0,
      type: payload.box_type,
      count: boxCount,
      rewards: boxRewards
    }
  };
};

const FISH_VALUE_TOKEN_ID = 110003;
const DEFAULT_FISH_BAG_CAPACITY = 200;
const [fishingTipsReady, setFishingTipsReady] = libs.createSignal(false);
const FISH_BAG_FULL_EVENT = "fishing_bag_full";
const player_key_values = solid_utils.createServiceNetData("player_key_values", {});
const [keyBindings, setKeyBindings] = libs.createSignal({
  ...DEFAULT_KEYBOARD_BINDINGS
});
const [gamepadBindings, setGamepadBindings] = libs.createSignal({
  ...DEFAULT_GAMEPAD_BINDINGS
});
libs.createEffect(libs.on(player_key_values, data => {
  const mode = data?.["move_mode"]?.value ?? MOVE_MODE_KEYBOARD;
  const modePrefix = mode == MOVE_MODE_KEYBOARD ? "" : `_m${mode}`;
  const defaults = MOVE_MODE_DEFAULTS[mode] ?? DEFAULT_KEYBOARD_BINDINGS;
  const bindings = {
    ...defaults
  };
  const nextGamepadBindings = {
    ...DEFAULT_GAMEPAD_BINDINGS
  };
  for (const key in data) {
    const kbPrefix = `keybind_keyboard${modePrefix}_`;
    if (key.startsWith(kbPrefix)) {
      const func = key.replace(kbPrefix, "");
      bindings[func] = data[key].value;
    }
    if (key.startsWith("keybind_gamepad_")) {
      const func = key.replace("keybind_gamepad_", "");
      nextGamepadBindings[func] = data[key].value;
    }
  }
  setKeyBindings(bindings);
  setGamepadBindings(nextGamepadBindings);
}));
const inputMode = solid_utils.createPlayerNetDataSignal("common", "input_mode", {
  mode: "keyboard",
  isGamepad: 0
});
const isGamepad = () => inputMode().isGamepad === 1;
function getHotKey(key) {
  if (isGamepad()) {
    return gamepadBindings()[key] ?? DEFAULT_GAMEPAD_BINDINGS[key] ?? "";
  }
  return keyBindings()[key] ?? DEFAULT_KEYBOARD_BINDINGS[key] ?? "";
}
function isKeyMatch(eventKey, keyFunc) {
  return eventKey === getHotKey(keyFunc);
}
const getFishCapacityLimit = () => {
  const configuredCapacity = Number(GameUI.CustomUIConfig().idle_game_setting?.fish_num_max?.value ?? 0);
  return configuredCapacity > 0 ? configuredCapacity : DEFAULT_FISH_BAG_CAPACITY;
};
const getFishInventoryCount = fishes => {
  let fishCount = 0;
  const values = Object.values(fishes);
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== undefined) {
      fishCount++;
    }
  }
  return fishCount;
};
const FishResultComp = props => {
  const [local, others] = libs.splitProps(props, ["fish_name", "fish_type", "player_id"]);
  let fishLv = () => {
    return KeyValues.idle_game_fish_type[local.fish_name]?.level ?? 1;
  };
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Panel", {
        id: "FishResultCompBG",
        get ["class"]() {
          return libs.classNames("Lv" + fishLv());
        }
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "FishResultCompBorder",
        get ["class"]() {
          return libs.classNames(`${local.fish_type}`);
        }
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "FishResultCompContent"
      }, _el$);
    libs.spread(_el$, libs.mergeProps$1({
      get classList() {
        return {
          "FishResultComp": true,
          IsSelf: local.player_id === Players.GetLocalPlayer()
        };
      }
    }, others), true);
    libs.insert(_el$4, libs.createComponent(FishIcon, {
      get fish_type() {
        return local.fish_type;
      },
      get fish_id() {
        return props.fish_name;
      }
    }));
    libs.effect(_p$ => {
      const _v$ = libs.classNames("Lv" + fishLv()),
        _v$2 = libs.classNames(`${local.fish_type}`),
        _v$3 = local.fish_type === "rainbow";
      _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$2, "class", _v$, _p$._v$));
      _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "class", _v$2, _p$._v$2));
      _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "visible", _v$3, _p$._v$3));
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$;
  })();
};
const FishIcon = props => {
  return libs.createComponent(libs.Show, {
    get when() {
      return props.fish_type === "rubbish";
    },
    get fallback() {
      return libs.createComponent(StoreItem.StoreItemImage, {
        hittest: false,
        id: "FishResultIcon",
        get itemid() {
          return props.fish_id;
        }
      });
    },
    get children() {
      const _el$5 = libs.createElement("Image", {
        hittest: false,
        id: "FishResultIcon",
        get src() {
          return getSrcPath(`store_items/FishRubbish_${props.fish_id}.png`);
        }
      }, null);
      libs.effect(_$p => libs.setProp(_el$5, "src", getSrcPath(`store_items/FishRubbish_${props.fish_id}.png`), _$p));
      return _el$5;
    }
  });
};
let _fishPopupId = 0;
const FishResultDisplay = () => {
  const [entries, setEntries] = libs.createSignal([]);
  const panelRefs = {};
  const updatePositions = () => {
    const list = entries();
    for (let i = 0; i < list.length; i++) {
      const entry = list[i];
      const panel = panelRefs[entry.id];
      if (panel !== undefined) {
        const [wx, wy, wz] = entry.worldPos;
        const sx = (Game.WorldToScreenX(wx, wy, wz + 50) - panel.actuallayoutwidth / 2) / panel.actualuiscale_x;
        const sy = (Game.WorldToScreenY(wx, wy, wz + 50) - panel.actuallayoutheight) / panel.actualuiscale_y;
        panel.SetPositionInPixels(sx, sy, 0);
      }
    }
  };
  let posTimer;
  libs.createEffect(() => {
    if (entries().length > 0) {
      if (posTimer === undefined) {
        posTimer = setInterval(() => {
          updatePositions();
        }, 16);
      }
    } else {
      if (posTimer !== undefined) {
        clearInterval(posTimer);
        posTimer = undefined;
      }
    }
  });
  libs.onMount(() => {
    const listener = GameEvents.Subscribe("fishing_result", event => {
      const parts = event.pos.split(",");
      const worldPos = [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])];
      const id = _fishPopupId++;
      setEntries(prev => [...prev, {
        id,
        fish_name: event.fish_name,
        fish_type: event.fish_type,
        worldPos,
        player_id: event.player_id
      }]);
      $.Schedule(3, () => {
        setEntries(prev => prev.filter(e => e.id !== id));
        delete panelRefs[id];
      });
    });
    libs.onCleanup(() => {
      GameEvents.Unsubscribe(listener);
      if (posTimer !== undefined) {
        clearInterval(posTimer);
        posTimer = undefined;
      }
    });
  });
  return (() => {
    const _el$6 = libs.createElement("Panel", {
      id: "FishResultDisplayRoot",
      hittest: false
    }, null);
    libs.insert(_el$6, libs.createComponent(libs.For, {
      get each() {
        return entries();
      },
      children: entry => libs.createComponent(FishResultComp, {
        ref: el => {
          panelRefs[entry.id] = el;
        },
        get fish_name() {
          return entry.fish_name;
        },
        get fish_type() {
          return entry.fish_type;
        },
        get player_id() {
          return entry.player_id;
        }
      })
    }));
    return _el$6;
  })();
};
const updateFishOverheadUI = panel => {
  if (panel != undefined) {
    let entIndex = Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer());
    const origin = Entities.GetAbsOrigin(entIndex);
    const offset = 150;
    let x_offset = 250;
    const x = (Game.WorldToScreenX(origin[0], origin[1], origin[2] + offset) - panel.actuallayoutwidth) / panel.actualuiscale_x + x_offset;
    const y = (Game.WorldToScreenY(origin[0], origin[1], origin[2] + offset) - panel.actuallayoutheight / 2) / panel.actualuiscale_y;
    panel.SetPositionInPixels(x, y, 0);
  }
};
function FishRoot() {
  const idle_game_data = solid_utils.createServiceNetData("player_idle_game_data", {
    power: 0,
    max_power: 1,
    update_time: 0
  });
  const playerIdleGameFishes = solid_utils.createServiceNetData("player_idle_game_fishes", {});
  const fish_state = solid_utils.createPlayerNetDataSignal("common", "fish_state", "none");
  const game_state = solid_utils.createNetDataSignal("common", "game_state");
  const fishBagFull = libs.createMemo(() => getFishInventoryCount(playerIdleGameFishes()) >= getFishCapacityLimit());
  const fishShow = libs.createMemo(() => fish_state() != "none");
  const [autoFishingEnabled, setAutoFishingEnabled] = libs.createSignal(false);
  const [fishResultShow, setFishResultShow] = libs.createSignal(false);
  const [singleFishSettlement, setSingleFishSettlement] = libs.createSignal();
  let [ELabel, setELabel] = libs.createSignal("");
  let [M0Label, setM0Label] = libs.createSignal("");
  const resetFishingViewState = () => {
    setFishResultShow(false);
    setSingleFishSettlement(undefined);
    setELabel("");
    setM0Label("");
  };
  let timer;
  let gameUI;
  libs.createEffect(libs.on(fishShow, v => {
    if (timer !== undefined) {
      clearInterval(timer);
    }
    if (v) {
      timer = setInterval(() => {
        updateFishOverheadUI(gameUI);
      }, 10);
    } else {
      resetFishingViewState();
      timer = undefined;
    }
  }));
  libs.onMount(() => {
    let events = [];
    events.push(GameEvents.Subscribe("fishing_reward", event => {
      setSingleFishSettlement(createFishingSettlementModel(event, FISH_VALUE_TOKEN_ID));
      setFishResultShow(true);
    }));
    events.push(GameEvents.Subscribe(FISH_BAG_FULL_EVENT, () => {
      setAutoFishingEnabled(false);
      ErrorMessage("#FishingBag_Full");
    }));
    libs.onCleanup(() => {
      events.forEach(event => GameEvents.Unsubscribe(event));
    });
  });
  const QLabel = libs.createMemo(() => autoFishingEnabled() ? "#FishingInteraction_6" : "#FishingInteraction_5");
  const toggleAutoFishing = () => {
    if (fishBagFull()) {
      setAutoFishingEnabled(false);
      ErrorMessage("#FishingBag_Full");
      return;
    }
    setAutoFishingEnabled(prev => !prev);
  };
  libs.createEffect(libs.on(game_state, state => {
    const stateName = state?.state;
    if (stateName == "GameState_Prepare" || stateName == "GameState_Login") {
      resetFishingViewState();
      setAutoFishingEnabled(false);
    }
  }));
  libs.createEffect(() => {
    let state = fish_state();
    console.log("state", state);
    let e_label = "";
    let m0_label = "";
    if (state == "none") {
      resetFishingViewState();
      setELabel("");
      setM0Label("");
      return;
    }
    switch (state) {
      case "idle":
        setFishResultShow(false);
        e_label = "#FishingInteraction_1";
        m0_label = "#FishingInteraction_3";
        break;
      case "success":
      case "hooked":
      case "waiting":
        setFishResultShow(false);
        e_label = "#FishingInteraction_1";
        break;
      case "fishing":
        e_label = "#FishingInteraction_1";
        m0_label = "#FishingInteraction_4";
        break;
      case "unhook":
        setFishResultShow(false);
        break;
    }
    setELabel(e_label);
    setM0Label(m0_label);
  });
  return (() => {
    const _el$7 = libs.createElement("Panel", {
        id: "FishRoot",
        hittest: false
      }, null),
      _el$8 = libs.createElement("Panel", {
        id: "LeftBar"
      }, _el$7),
      _el$9 = libs.createElement("Panel", {
        id: "TipsContainer"
      }, _el$8),
      _el$0 = libs.createElement("Panel", {}, _el$9),
      _el$1 = libs.createElement("Label", {
        "class": "TipsLabel",
        get text() {
          return ELabel();
        }
      }, _el$0),
      _el$10 = libs.createElement("Panel", {}, _el$9),
      _el$11 = libs.createElement("Label", {
        "class": "TipsLabel",
        get text() {
          return M0Label();
        }
      }, _el$10),
      _el$12 = libs.createElement("Panel", {}, _el$9),
      _el$13 = libs.createElement("Label", {
        "class": "TipsLabel",
        get text() {
          return QLabel();
        }
      }, _el$12),
      _el$14 = libs.createElement("Panel", {
        id: "PlayerPower"
      }, _el$7),
      _el$15 = libs.createElement("Panel", {
        id: "PowerBarBG"
      }, _el$14),
      _el$16 = libs.createElement("Image", {
        id: "PowerBarFill",
        get style() {
          return {
            clip: `radial( 50% 50%, 360deg, ${idle_game_data().power / idle_game_data().max_power * 100 * 3.6}deg )`
          };
        }
      }, _el$15),
      _el$17 = libs.createElement("Label", {
        id: "PowerValueLabel",
        get text() {
          return idle_game_data().power;
        }
      }, _el$15);
      libs.createElement("Label", {
        id: "PowerBarLabel",
        text: "#IdleGamePower"
      }, _el$14);
      const _el$19 = libs.createElement("TextButton", {
        id: "BackpackBtn",
        text: "#FishingBag"
      }, _el$7),
      _el$20 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FishResultContainer", {
            Show: fishResultShow()
          });
        }
      }, _el$7);
    libs.insert(_el$7, libs.createComponent(FishResultDisplay, {}), _el$8);
    libs.insert(_el$0, libs.createComponent(libs.Show, {
      get when() {
        return isGamepad();
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return getHotKey(KeyFunction.Interact);
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return getHotKey(KeyFunction.Interact);
          }
        });
      }
    }), _el$1);
    libs.insert(_el$10, libs.createComponent(libs.Show, {
      get when() {
        return isGamepad();
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return getHotKey(KeyFunction.Attack);
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return getHotKey(KeyFunction.Attack);
          }
        });
      }
    }), _el$11);
    libs.setProp(_el$12, "className", "TipsRow");
    libs.insert(_el$12, libs.createComponent(libs.Show, {
      get when() {
        return isGamepad();
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return getHotKey(KeyFunction.Upgrade);
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return getHotKey(KeyFunction.Upgrade);
          }
        });
      }
    }), _el$13);
    libs.setProp(_el$14, "tooltip_text", '#IdleGamePower_Description');
    libs.setProp(_el$19, "onactivate", () => JumpToMenu({
      window_name: "fishingitem",
      menu: "FishingBag",
      force: true
    }));
    libs.insert(_el$20, libs.createComponent(libs.Show, {
      get when() {
        return singleFishSettlement();
      },
      children: settlement => (() => {
        const _el$21 = libs.createElement("Panel", {
            id: "FishResultContent"
          }, null),
          _el$22 = libs.createElement("Panel", {
            id: "FishResultMainContent"
          }, _el$21),
          _el$23 = libs.createElement("Panel", {
            get ["class"]() {
              return libs.classNames("FishResult", "Fish");
            }
          }, _el$22),
          _el$24 = libs.createElement("Label", {
            id: "FishResultTitle",
            get text() {
              return settlement().fish.localizedToken;
            }
          }, _el$23),
          _el$25 = libs.createElement("Panel", {
            id: "FishResultStarList"
          }, _el$23),
          _el$26 = libs.createElement("Label", {
            id: "FishResultRarityLabel",
            get ["class"]() {
              return `Rarity${GetServiceItemRarity(settlement().fish.id)}`;
            },
            get text() {
              return GetLocalization(`#FishRarity_${GetServiceItemRarity(settlement().fish.id)}`);
            }
          }, _el$23);
          libs.createElement("Image", {
            "class": "FishResultDivider"
          }, _el$23);
          const _el$28 = libs.createElement("Panel", {
            "class": "FishResultSubTitle",
            id: "FishResultCount"
          }, _el$23),
          _el$29 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel",
            get text() {
              return GetLocalization("#FishResult_amounts") + ": ";
            }
          }, _el$28),
          _el$30 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel value",
            get text() {
              return settlement().fish.count;
            }
          }, _el$28);
          libs.createElement("Image", {
            "class": "FishResultDivider"
          }, _el$23);
          const _el$32 = libs.createElement("Panel", {
            "class": "FishResultSubTitle",
            id: "FishResultWeight"
          }, _el$23),
          _el$33 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel",
            get text() {
              return GetLocalization("#FishingBag_Weight") + ": ";
            }
          }, _el$32),
          _el$34 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel value",
            get text() {
              return settlement().fish.weightText;
            }
          }, _el$32);
          libs.createElement("Image", {
            "class": "FishResultDivider"
          }, _el$23);
          const _el$36 = libs.createElement("Panel", {
            "class": "FishResultSubTitle",
            id: "FishResultLength"
          }, _el$23),
          _el$37 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel",
            get text() {
              return GetLocalization("#FishingBag_Length") + ": ";
            }
          }, _el$36),
          _el$38 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel value",
            get text() {
              return settlement().fish.lengthText;
            }
          }, _el$36);
          libs.createElement("Image", {
            "class": "FishResultDivider"
          }, _el$23);
          const _el$40 = libs.createElement("Panel", {
            "class": "FishResultSubTitle Value",
            id: "FishResultValue"
          }, _el$23),
          _el$41 = libs.createElement("Label", {
            "class": "FishResultSubTitleLabel",
            get text() {
              return GetLocalization("#FishResult_value") + ": ";
            }
          }, _el$40),
          _el$42 = libs.createElement("Panel", {
            "class": "FishResultSubTitleLabel valueIcon",
            flowChildren: 'right'
          }, _el$40),
          _el$43 = libs.createElement("Image", {
            id: "FishResultValueIcon",
            get src() {
              return getSrcPath(`tokens/${settlement().fish.valueTokenID}.png`);
            }
          }, _el$42),
          _el$44 = libs.createElement("Label", {
            align: 'left center',
            get text() {
              return settlement().fish.valueText;
            }
          }, _el$42),
          _el$45 = libs.createElement("Panel", {
            id: "FishExtraRewardList"
          }, _el$21);
        libs.insert(_el$23, libs.createComponent(FishIcon, {
          get fish_type() {
            return settlement().fish.type;
          },
          get fish_id() {
            return settlement().fish.id;
          }
        }), _el$24);
        libs.insert(_el$25, libs.createComponent(libs.For, {
          each: [1, 2, 3, 4, 5, 6],
          children: idx => {
            return (() => {
              const _el$46 = libs.createElement("Image", {
                "class": "FishStarIcon"
              }, null);
              libs.effect(_$p => libs.setProp(_el$46, "visible", settlement().fish.starCount >= idx, _$p));
              return _el$46;
            })();
          }
        }));
        libs.setProp(_el$42, "flowChildren", 'right');
        libs.setProp(_el$44, "align", 'left center');
        libs.insert(_el$45, libs.createComponent(libs.For, {
          get each() {
            return settlement().fish.rewards;
          },
          children: reward => (() => {
            const _el$47 = libs.createElement("Panel", {}, null),
              _el$49 = libs.createElement("Label", {
                "class": "ItemName",
                get text() {
                  return reward.localizedToken;
                },
                html: true
              }, _el$47);
            libs.setProp(_el$47, "className", 'FishResultItem');
            libs.insert(_el$47, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return reward.itemID;
              },
              get children() {
                const _el$48 = libs.createElement("Label", {
                  "class": "FishResultItemAmounts",
                  get text() {
                    return reward.amountText;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$48, "text", reward.amountText, _$p));
                return _el$48;
              }
            }), _el$49);
            libs.effect(_$p => libs.setProp(_el$49, "text", reward.localizedToken, _$p));
            return _el$47;
          })()
        }), null);
        libs.insert(_el$45, libs.createComponent(libs.For, {
          get each() {
            return settlement().box.rewards;
          },
          children: reward => (() => {
            const _el$50 = libs.createElement("Panel", {}, null),
              _el$52 = libs.createElement("Label", {
                "class": "ItemName",
                get text() {
                  return reward.localizedToken;
                },
                html: true
              }, _el$50);
            libs.setProp(_el$50, "className", 'FishResultItem');
            libs.insert(_el$50, libs.createComponent(StoreItem.StoreItemImage, {
              get itemid() {
                return reward.itemID;
              },
              get children() {
                const _el$51 = libs.createElement("Label", {
                  "class": "FishResultItemAmounts",
                  get text() {
                    return reward.amountText;
                  }
                }, null);
                libs.effect(_$p => libs.setProp(_el$51, "text", reward.amountText, _$p));
                return _el$51;
              }
            }), _el$52);
            libs.effect(_$p => libs.setProp(_el$52, "text", reward.localizedToken, _$p));
            return _el$50;
          })()
        }), null);
        libs.effect(_p$ => {
          const _v$14 = libs.classNames("FishResult", "Fish"),
            _v$15 = settlement().fish.localizedToken,
            _v$16 = `Rarity${GetServiceItemRarity(settlement().fish.id)}`,
            _v$17 = GetLocalization(`#FishRarity_${GetServiceItemRarity(settlement().fish.id)}`),
            _v$18 = GetLocalization("#FishResult_amounts") + ": ",
            _v$19 = settlement().fish.count,
            _v$20 = GetLocalization("#FishingBag_Weight") + ": ",
            _v$21 = settlement().fish.weightText,
            _v$22 = GetLocalization("#FishingBag_Length") + ": ",
            _v$23 = settlement().fish.lengthText,
            _v$24 = GetLocalization("#FishResult_value") + ": ",
            _v$25 = getSrcPath(`tokens/${settlement().fish.valueTokenID}.png`),
            _v$26 = settlement().fish.valueText;
          _v$14 !== _p$._v$14 && (_p$._v$14 = libs.setProp(_el$23, "class", _v$14, _p$._v$14));
          _v$15 !== _p$._v$15 && (_p$._v$15 = libs.setProp(_el$24, "text", _v$15, _p$._v$15));
          _v$16 !== _p$._v$16 && (_p$._v$16 = libs.setProp(_el$26, "class", _v$16, _p$._v$16));
          _v$17 !== _p$._v$17 && (_p$._v$17 = libs.setProp(_el$26, "text", _v$17, _p$._v$17));
          _v$18 !== _p$._v$18 && (_p$._v$18 = libs.setProp(_el$29, "text", _v$18, _p$._v$18));
          _v$19 !== _p$._v$19 && (_p$._v$19 = libs.setProp(_el$30, "text", _v$19, _p$._v$19));
          _v$20 !== _p$._v$20 && (_p$._v$20 = libs.setProp(_el$33, "text", _v$20, _p$._v$20));
          _v$21 !== _p$._v$21 && (_p$._v$21 = libs.setProp(_el$34, "text", _v$21, _p$._v$21));
          _v$22 !== _p$._v$22 && (_p$._v$22 = libs.setProp(_el$37, "text", _v$22, _p$._v$22));
          _v$23 !== _p$._v$23 && (_p$._v$23 = libs.setProp(_el$38, "text", _v$23, _p$._v$23));
          _v$24 !== _p$._v$24 && (_p$._v$24 = libs.setProp(_el$41, "text", _v$24, _p$._v$24));
          _v$25 !== _p$._v$25 && (_p$._v$25 = libs.setProp(_el$43, "src", _v$25, _p$._v$25));
          _v$26 !== _p$._v$26 && (_p$._v$26 = libs.setProp(_el$44, "text", _v$26, _p$._v$26));
          return _p$;
        }, {
          _v$14: undefined,
          _v$15: undefined,
          _v$16: undefined,
          _v$17: undefined,
          _v$18: undefined,
          _v$19: undefined,
          _v$20: undefined,
          _v$21: undefined,
          _v$22: undefined,
          _v$23: undefined,
          _v$24: undefined,
          _v$25: undefined,
          _v$26: undefined
        });
        return _el$21;
      })()
    }));
    libs.insert(_el$7, libs.createComponent(FishGameUI, {
      get visible() {
        return fishShow();
      },
      ref(r$) {
        const _ref$ = gameUI;
        typeof _ref$ === "function" ? _ref$(r$) : gameUI = r$;
      },
      get fish_state() {
        return fish_state();
      },
      toggleAutoFishing: toggleAutoFishing,
      getAutoFishingEnabled: autoFishingEnabled,
      getFishBagFull: fishBagFull
    }), null);
    libs.effect(_p$ => {
      const _v$4 = fishShow(),
        _v$5 = libs.classNames("TipsRow", {
          Hidden: ELabel() == ""
        }),
        _v$6 = ELabel(),
        _v$7 = libs.classNames("TipsRow", {
          Hidden: M0Label() == ""
        }),
        _v$8 = M0Label(),
        _v$9 = QLabel(),
        _v$0 = fishShow(),
        _v$1 = {
          clip: `radial( 50% 50%, 360deg, ${idle_game_data().power / idle_game_data().max_power * 100 * 3.6}deg )`
        },
        _v$10 = idle_game_data().power,
        _v$11 = fishShow(),
        _v$12 = libs.classNames("FishResultContainer", {
          Show: fishResultShow()
        }),
        _v$13 = fishShow();
      _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$8, "visible", _v$4, _p$._v$4));
      _v$5 !== _p$._v$5 && (_p$._v$5 = libs.setProp(_el$0, "className", _v$5, _p$._v$5));
      _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$1, "text", _v$6, _p$._v$6));
      _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$10, "className", _v$7, _p$._v$7));
      _v$8 !== _p$._v$8 && (_p$._v$8 = libs.setProp(_el$11, "text", _v$8, _p$._v$8));
      _v$9 !== _p$._v$9 && (_p$._v$9 = libs.setProp(_el$13, "text", _v$9, _p$._v$9));
      _v$0 !== _p$._v$0 && (_p$._v$0 = libs.setProp(_el$14, "visible", _v$0, _p$._v$0));
      _v$1 !== _p$._v$1 && (_p$._v$1 = libs.setProp(_el$16, "style", _v$1, _p$._v$1));
      _v$10 !== _p$._v$10 && (_p$._v$10 = libs.setProp(_el$17, "text", _v$10, _p$._v$10));
      _v$11 !== _p$._v$11 && (_p$._v$11 = libs.setProp(_el$19, "visible", _v$11, _p$._v$11));
      _v$12 !== _p$._v$12 && (_p$._v$12 = libs.setProp(_el$20, "class", _v$12, _p$._v$12));
      _v$13 !== _p$._v$13 && (_p$._v$13 = libs.setProp(_el$20, "visible", _v$13, _p$._v$13));
      return _p$;
    }, {
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$0: undefined,
      _v$1: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined
    });
    return _el$7;
  })();
}
var FishUIState = function (FishUIState) {
  FishUIState[FishUIState["NONE"] = 0] = "NONE";
  FishUIState[FishUIState["IDLE"] = 1] = "IDLE";
  FishUIState[FishUIState["FISHING"] = 2] = "FISHING";
  return FishUIState;
}(FishUIState || {});
const FishGameUI = props => {
  const [local, others] = libs.splitProps(props, ["fish_state", "toggleAutoFishing", "getAutoFishingEnabled", "getFishBagFull"]);
  const fish_ui_state = libs.createMemo(() => {
    switch (local.fish_state) {
      case "none":
        return FishUIState.NONE;
      case "idle":
        return FishUIState.IDLE;
      default:
        return FishUIState.FISHING;
    }
  });
  const stateEvents = {};
  stateEvents[FishUIState.NONE] = {
    onStart: () => {
      CancelFish();
      setTipsBoxContent("");
      setCooldown(0);
    },
    onEnd: () => {},
    OnKeyPressed: _key => {},
    OnKeyReleased: _key => {}
  };
  stateEvents[FishUIState.IDLE] = {
    onStart: () => {
      startCooldown(0.1);
    },
    onEnd: () => {},
    OnKeyPressed: key => {
      if (local.fish_state != "idle") {
        return;
      }
      if (isKeyMatch(key, KeyFunction.Attack)) {
        if (local.getFishBagFull()) {
          ErrorMessage("#FishingBag_Full");
          return;
        }
        setTipsBoxContent("");
        GameEvents.SendCustomEventToServer("fishing_interactive", {
          state: 1
        });
      }
    },
    OnKeyReleased: key => {
      if (local.fish_state != "idle") {
        return;
      }
      if (isKeyMatch(key, KeyFunction.Interact)) {
        GameEvents.SendCustomEventToServer("fishing_interactive", {
          state: 0
        });
      }
      if (isKeyMatch(key, KeyFunction.Upgrade)) {
        local.toggleAutoFishing();
      }
    }
  };
  stateEvents[FishUIState.FISHING] = {
    onStart: () => {
      StartFish();
    },
    onEnd: () => {
      CancelFish();
    },
    OnKeyPressed: key => {
      if (isKeyMatch(key, KeyFunction.Attack)) {
        singleFishInstance?.OnInteractionPress();
      }
    },
    OnKeyReleased: key => {
      if (isKeyMatch(key, KeyFunction.Attack)) {
        singleFishInstance?.OnInteractionRelease();
      }
      if (isKeyMatch(key, KeyFunction.Interact)) {
        GameEvents.SendCustomEventToServer("fishing_interactive", {
          state: 0
        });
      }
      if (isKeyMatch(key, KeyFunction.Upgrade)) {
        local.toggleAutoFishing();
      }
    }
  };
  const [fishPosition, setFishPosition] = libs.createSignal(0);
  const [playerPosition, setPlayerPosition] = libs.createSignal(0);
  const [playerBarHeight, setPlayerBarHeight] = libs.createSignal(12);
  const [progress, setProgress] = libs.createSignal(25);
  let lastFishProgress = 0;
  const [fishingAdding, setFishingAdding] = libs.createSignal(false);
  const [boxPosition, setBoxPosition] = libs.createSignal(0);
  const [boxProgress, setBoxProgress] = libs.createSignal(0);
  const [boxShow, setBoxShow] = libs.createSignal(false);
  let lastBoxProgress = 0;
  const [boxAdding, setBoxAdding] = libs.createSignal(false);
  libs.createEffect(() => {
    setPlayerPosition(singleFishUIProps.hook?.height || 0);
    setPlayerBarHeight(singleFishUIProps.hook?.hook_width || 0);
    setFishPosition(singleFishUIProps.fish?.height || 0);
    let progress = singleFishUIProps.fish?.progress || 0;
    setProgress(progress);
    setFishingAdding(singleFishUIProps.box?.success === true || progress > lastFishProgress);
    if (singleFishUIProps.box) {
      let box_progress = singleFishUIProps.box.progress || 0;
      setBoxPosition(singleFishUIProps.box.height || 0);
      setBoxProgress(box_progress);
      setBoxAdding(box_progress > 0 && box_progress >= lastBoxProgress);
      lastBoxProgress = box_progress;
      setBoxShow(true);
    } else {
      setBoxPosition(0);
      setBoxProgress(0);
      setBoxShow(false);
      lastBoxProgress = 0;
    }
    lastFishProgress = progress;
  });
  let singleFishInstance = null;
  const [singleFishResult, setFishingResult] = libs.createSignal("idle");
  const [singleFishUIProps, setFishUIProps] = libs.createStore({});
  const StartFish = cancel => {
    if (singleFishInstance != undefined) {
      singleFishInstance.cancel();
      singleFishInstance = null;
    } else {
      let single_fishing = new SingleFishing();
      single_fishing.start({
        setFishUIProps,
        setFishingResult,
        getAutoFishingEnabled: local.getAutoFishingEnabled
      });
      singleFishInstance = single_fishing;
    }
  };
  const CancelFish = () => {
    if (singleFishInstance != undefined) {
      singleFishInstance.cancel();
      singleFishInstance = null;
    }
    setFishingResult("idle");
    setFishUIProps({});
  };
  const readyFishing = () => {
    if (singleFishInstance != undefined) {
      singleFishInstance.readyFishing();
    }
  };
  libs.createEffect(libs.on(singleFishResult, v => {
    let tipsLabel = "";
    setFishingTipsReady(false);
    if (v == "idle") {
      tipsLabel = "#FishingInteractionLong_1";
    }
    if (v == "hook") {
      tipsLabel = "#FishingInteractionLong_3";
    }
    if (v == "fishing") {
      Game.EmitSound("drodo_Courier.fish_catch");
      $.Schedule(0.8, () => {
        if (singleFishResult() != "fishing") {
          return;
        }
        readyFishing();
        setFishingTipsReady(true);
      });
    } else if (v == "failure") {
      Game.EmitSound("drodo_Courier.fish_slam");
    }
    setTipsBoxContent(tipsLabel);
  }));
  libs.createEffect(() => {
    if (singleFishResult() != "fishing") {
      return;
    }
    if (fishingTipsReady() !== true) {
      return;
    }
    setTipsBoxContent(local.getAutoFishingEnabled() ? "" : "#FishingInteractionLong_2");
  });
  let max_cooldown = 1;
  const [cooldown, setCooldown] = libs.createSignal(0);
  let cooldownTimer;
  const startCooldown = end_time => {
    if (end_time - Game.GetGameTime() <= 0) {
      return;
    }
    if (cooldownTimer != undefined) {
      clearInterval(cooldownTimer);
    }
    max_cooldown = end_time - Game.GetGameTime();
    setCooldown(end_time - Game.GetGameTime());
    cooldownTimer = setInterval(() => {
      setCooldown(end_time - Game.GetGameTime());
      if (cooldown() <= 0) {
        clearInterval(cooldownTimer);
        cooldownTimer = undefined;
      }
    }, 100);
  };
  let cooldownPercentage = () => cooldown() <= 0 ? 100 : cooldown() / max_cooldown;
  libs.createEffect(libs.on(cooldown, cd => {
    if (cd > 0) {
      if (cooldownTimer == undefined) {
        cooldownTimer = setInterval(() => {
          setCooldown(v => v);
        }, 100);
      }
    }
  }));
  libs.onMount(() => {
    let events = [];
    events.push(useClientSideEvent("key_pressed", event => {
      stateEvents[fish_ui_state()].OnKeyPressed(event.key);
    }));
    events.push(useClientSideEvent("key_released", event => {
      stateEvents[fish_ui_state()].OnKeyReleased(event.key);
    }));
    events.push(GameEvents.Subscribe("fishing_cooldown", event => {
      setCooldown(0);
      startCooldown(event.next_time);
    }));
    libs.onCleanup(() => {
      if (singleFishInstance != undefined) {
        singleFishInstance.cancel();
        singleFishInstance = null;
      }
      events.forEach(event => GameEvents.Unsubscribe(event));
    });
  });
  libs.createEffect(libs.on(fish_ui_state, v => {
    if (v == FishUIState.IDLE) {
      stateEvents[FishUIState.FISHING].onEnd();
    } else if (v == FishUIState.FISHING) {
      stateEvents[FishUIState.IDLE].onEnd();
    }
    stateEvents[v].onStart();
  }));
  const [TipsBoxContent, setTipsBoxContent] = libs.createSignal("");
  return (() => {
    const _el$53 = libs.createElement("Panel", libs.mergeProps$1(others, {
        id: "FishGameUI",
        hittest: false
      }), null),
      _el$54 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FishingCooldownBar", {
            Show: cooldown() > 0
          });
        }
      }, _el$53),
      _el$55 = libs.createElement("Panel", {
        id: "FishingCooldownBar_Fill",
        get width() {
          return `${cooldownPercentage() * 100}%`;
        }
      }, _el$54),
      _el$56 = libs.createElement("Image", {
        id: "FishingHookWarning",
        hittest: false
      }, _el$53),
      _el$57 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FishingTipsBox", {
            Show: TipsBoxContent() != ""
          });
        },
        hittest: false,
        hittestchildren: false
      }, _el$53),
      _el$58 = libs.createElement("Panel", {
        id: "FishingTipsKey"
      }, _el$57),
      _el$59 = libs.createElement("Label", {
        get text() {
          return TipsBoxContent();
        },
        html: true
      }, _el$57),
      _el$60 = libs.createElement("Panel", {
        id: "FishingMain",
        hittest: false
      }, _el$53),
      _el$61 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("SingleFishUI", {
            Show: singleFishResult() == "fishing" || singleFishResult() == "failure" || singleFishResult() == "success"
          });
        }
      }, _el$60),
      _el$62 = libs.createElement("Panel", {
        id: "SingleFishBar"
      }, _el$61),
      _el$63 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FishingTrackArea");
        }
      }, _el$62),
      _el$64 = libs.createElement("Panel", {
        "class": "TrackContent"
      }, _el$63),
      _el$65 = libs.createElement("Panel", {
        "class": "TrackInBox"
      }, _el$64),
      _el$66 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FishIndicator", {
            Progressing: fishingAdding(),
            Escaped: singleFishResult() == "failure"
          });
        },
        get style() {
          return {
            transform: `translateY(${100 - fishPosition()}%)`
          };
        }
      }, _el$65),
      _el$67 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("FishIcon", singleFishUIProps["fish"]?.type);
        }
      }, _el$66),
      _el$68 = libs.createElement("Panel", {
        "class": "PlayerBar",
        get style() {
          return {
            transform: `translateY(${100 - playerPosition()}%)`,
            y: `-${playerBarHeight()}%`,
            height: `${playerBarHeight()}%`
          };
        }
      }, _el$65);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "PlayerBarParticle",
        particleName: "particles/ui/hud/healthbar_burner_horizontal_cloud.vpcf",
        cameraOrigin: "0 0 600",
        fov: 15,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$68);
      const _el$70 = libs.createElement("Panel", {
        get ["class"]() {
          return libs.classNames("BoxIndicator", {
            Show: boxShow(),
            Progressing: boxAdding(),
            Success: boxProgress() >= 100
          });
        },
        get style() {
          return {
            transform: `translateY(${100 - boxPosition()}%)`
          };
        }
      }, _el$65),
      _el$71 = libs.createElement("Panel", {
        "class": "BoxProgressBar"
      }, _el$70),
      _el$72 = libs.createElement("Panel", {
        "class": "BoxProgressFill",
        get style() {
          return {
            width: `${boxProgress()}%`
          };
        }
      }, _el$71);
      libs.createElement("Panel", {
        "class": "BoxIcon"
      }, _el$70);
      const _el$74 = libs.createElement("Panel", {
        "class": "ProgressContainer"
      }, _el$62),
      _el$75 = libs.createElement("Panel", {
        "class": "ProgressBarBackground"
      }, _el$74),
      _el$76 = libs.createElement("Panel", {
        "class": "ProgressBarFill",
        get style() {
          return {
            height: `${progress()}%`
          };
        }
      }, _el$75);
      libs.createElement("DOTAParticleScenePanel", {
        "class": "ProgressBarParticle",
        particleName: "particles/ui/hud/healthbar_burner_horizontal.vpcf",
        cameraOrigin: "0 0 200",
        fov: 4,
        lookAt: "0 0 0",
        hittest: false,
        squarePixels: true
      }, _el$76);
    libs.spread(_el$53, libs.mergeProps$1(others, {
      "id": "FishGameUI",
      "hittest": false
    }), true);
    libs.insert(_el$58, libs.createComponent(libs.Show, {
      get when() {
        return isGamepad();
      },
      get fallback() {
        return libs.createComponent(EOM_HotKeyDisplay.EOM_HotKeyDisplay, {
          get hotkey() {
            return getHotKey(KeyFunction.Attack);
          }
        });
      },
      get children() {
        return libs.createComponent(EOM_GamePad.EOM_GamePad, {
          get keyName() {
            return getHotKey(KeyFunction.Attack);
          }
        });
      }
    }));
    libs.effect(_p$ => {
      const _v$27 = libs.classNames("FishingCooldownBar", {
          Show: cooldown() > 0
        }),
        _v$28 = `${cooldownPercentage() * 100}%`,
        _v$29 = {
          Show: singleFishResult() == "hook",
          Escaped: singleFishResult() == "unhook"
        },
        _v$30 = libs.classNames("FishingTipsBox", {
          Show: TipsBoxContent() != ""
        }),
        _v$31 = TipsBoxContent(),
        _v$32 = fish_ui_state() == FishUIState.FISHING,
        _v$33 = libs.classNames("SingleFishUI", {
          Show: singleFishResult() == "fishing" || singleFishResult() == "failure" || singleFishResult() == "success"
        }),
        _v$34 = libs.classNames("FishingTrackArea"),
        _v$35 = libs.classNames("FishIndicator", {
          Progressing: fishingAdding(),
          Escaped: singleFishResult() == "failure"
        }),
        _v$36 = {
          transform: `translateY(${100 - fishPosition()}%)`
        },
        _v$37 = libs.classNames("FishIcon", singleFishUIProps["fish"]?.type),
        _v$38 = {
          transform: `translateY(${100 - playerPosition()}%)`,
          y: `-${playerBarHeight()}%`,
          height: `${playerBarHeight()}%`
        },
        _v$39 = libs.classNames("BoxIndicator", {
          Show: boxShow(),
          Progressing: boxAdding(),
          Success: boxProgress() >= 100
        }),
        _v$40 = {
          transform: `translateY(${100 - boxPosition()}%)`
        },
        _v$41 = {
          width: `${boxProgress()}%`
        },
        _v$42 = {
          height: `${progress()}%`
        };
      _v$27 !== _p$._v$27 && (_p$._v$27 = libs.setProp(_el$54, "class", _v$27, _p$._v$27));
      _v$28 !== _p$._v$28 && (_p$._v$28 = libs.setProp(_el$55, "width", _v$28, _p$._v$28));
      _v$29 !== _p$._v$29 && (_p$._v$29 = libs.setProp(_el$56, "classList", _v$29, _p$._v$29));
      _v$30 !== _p$._v$30 && (_p$._v$30 = libs.setProp(_el$57, "class", _v$30, _p$._v$30));
      _v$31 !== _p$._v$31 && (_p$._v$31 = libs.setProp(_el$59, "text", _v$31, _p$._v$31));
      _v$32 !== _p$._v$32 && (_p$._v$32 = libs.setProp(_el$60, "visible", _v$32, _p$._v$32));
      _v$33 !== _p$._v$33 && (_p$._v$33 = libs.setProp(_el$61, "class", _v$33, _p$._v$33));
      _v$34 !== _p$._v$34 && (_p$._v$34 = libs.setProp(_el$63, "class", _v$34, _p$._v$34));
      _v$35 !== _p$._v$35 && (_p$._v$35 = libs.setProp(_el$66, "class", _v$35, _p$._v$35));
      _v$36 !== _p$._v$36 && (_p$._v$36 = libs.setProp(_el$66, "style", _v$36, _p$._v$36));
      _v$37 !== _p$._v$37 && (_p$._v$37 = libs.setProp(_el$67, "class", _v$37, _p$._v$37));
      _v$38 !== _p$._v$38 && (_p$._v$38 = libs.setProp(_el$68, "style", _v$38, _p$._v$38));
      _v$39 !== _p$._v$39 && (_p$._v$39 = libs.setProp(_el$70, "class", _v$39, _p$._v$39));
      _v$40 !== _p$._v$40 && (_p$._v$40 = libs.setProp(_el$70, "style", _v$40, _p$._v$40));
      _v$41 !== _p$._v$41 && (_p$._v$41 = libs.setProp(_el$72, "style", _v$41, _p$._v$41));
      _v$42 !== _p$._v$42 && (_p$._v$42 = libs.setProp(_el$76, "style", _v$42, _p$._v$42));
      return _p$;
    }, {
      _v$27: undefined,
      _v$28: undefined,
      _v$29: undefined,
      _v$30: undefined,
      _v$31: undefined,
      _v$32: undefined,
      _v$33: undefined,
      _v$34: undefined,
      _v$35: undefined,
      _v$36: undefined,
      _v$37: undefined,
      _v$38: undefined,
      _v$39: undefined,
      _v$40: undefined,
      _v$41: undefined,
      _v$42: undefined
    });
    return _el$53;
  })();
};
libs.render(FishRoot, $.GetContextPanel());