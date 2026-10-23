--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b, _c, _d, _e;
var FollowHeroCameraState = /** @class */ (function () {
    function FollowHeroCameraState() {
        this.name = "FollowHero";
    }
    FollowHeroCameraState.prototype.enter = function (_ctx) {
        this.ResetComfortTarget();
    };
    FollowHeroCameraState.prototype.update = function (ctx) {
        return { frame: this.sampleFrame(ctx) };
    };
    FollowHeroCameraState.prototype.exit = function (_ctx) { };
    FollowHeroCameraState.prototype.sampleFrame = function (ctx) {
        var heroEntIndex = ctx.GetLocalHeroEntityIndex();
        if (heroEntIndex === undefined) {
            ctx.WarnOnce("follow-hero-missing-local-hero", "[FollowHero] Local hero is unavailable; camera frame skipped");
            return undefined;
        }
        ctx.ClearWarn("follow-hero-missing-local-hero");
        var targetPosition = ctx.GetEntityTargetPosition(heroEntIndex, 0);
        if (targetPosition === undefined) {
            ctx.WarnOnce("follow-hero-missing-target-position", "[FollowHero] Failed to resolve target position for hero ".concat(heroEntIndex));
            return undefined;
        }
        ctx.ClearWarn("follow-hero-missing-target-position");
        var cameraTargetPosition = ctx.GetCameraFollowMode() === "comfort"
            ? this.SampleComfortTargetPosition(ctx, targetPosition)
            : this.SampleClassicTargetPosition(targetPosition);
        return {
            targetPosition: cameraTargetPosition,
            distance: ctx.GetCameraDistance(),
            forceTargetPosition: ctx.ShouldForceDefaultTargetPosition() ? true : undefined,
        };
    };
    FollowHeroCameraState.prototype.SampleClassicTargetPosition = function (targetPosition) {
        this.ResetComfortTarget();
        return targetPosition;
    };
    FollowHeroCameraState.prototype.SampleComfortTargetPosition = function (ctx, targetPosition) {
        var now = ctx.GetTime();
        var lastPosition = this.smoothedTargetPosition;
        var lastSampleTime = this.lastSampleTime;
        if (lastPosition === undefined || lastSampleTime === undefined) {
            this.smoothedTargetPosition = targetPosition;
            this.lastSampleTime = now;
            return targetPosition;
        }
        var targetDelta = this.VectorDelta2D(targetPosition, lastPosition);
        var targetDistance = this.VectorLength2D(targetDelta);
        if (targetDistance >= FollowHeroCameraState.teleportResetDistance) {
            this.smoothedTargetPosition = targetPosition;
            this.lastSampleTime = now;
            return targetPosition;
        }
        var desiredPosition = lastPosition;
        var deadZoneRadius = ctx.GetCameraComfortDeadZoneRadius();
        if (targetDistance > deadZoneRadius) {
            var overshoot = targetDistance - deadZoneRadius;
            var ratio = overshoot / targetDistance;
            desiredPosition = [
                lastPosition[0] + targetDelta[0] * ratio,
                lastPosition[1] + targetDelta[1] * ratio,
                targetPosition[2],
            ];
        }
        var dt = Math.min(Math.max(now - lastSampleTime, 0.001), 0.1);
        var halfLife = Math.max(ctx.GetCameraComfortHalfLife(), FollowHeroCameraState.minComfortHalfLife);
        var alpha = 1 - Math.pow(0.5, dt / halfLife);
        var nextPosition = [
            lastPosition[0] + (desiredPosition[0] - lastPosition[0]) * alpha,
            lastPosition[1] + (desiredPosition[1] - lastPosition[1]) * alpha,
            targetPosition[2],
        ];
        this.smoothedTargetPosition = nextPosition;
        this.lastSampleTime = now;
        return nextPosition;
    };
    FollowHeroCameraState.prototype.ResetComfortTarget = function () {
        this.smoothedTargetPosition = undefined;
        this.lastSampleTime = undefined;
    };
    FollowHeroCameraState.prototype.VectorDelta2D = function (to, from) {
        return [to[0] - from[0], to[1] - from[1]];
    };
    FollowHeroCameraState.prototype.VectorLength2D = function (vector) {
        return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    };
    FollowHeroCameraState.minComfortHalfLife = 0.001;
    FollowHeroCameraState.teleportResetDistance = 900;
    return FollowHeroCameraState;
}());
var FollowEntityCameraState = /** @class */ (function () {
    function FollowEntityCameraState(options) {
        var _a, _b;
        this.name = "FollowEntity";
        this.targetEntIndex = options.targetEntIndex;
        this.heightOffset = (_a = options.heightOffset) !== null && _a !== void 0 ? _a : 0;
        this.fallbackToDefault = (_b = options.fallbackToDefault) !== null && _b !== void 0 ? _b : true;
        this.transitionOnFallback = options.transitionOnFallback;
    }
    FollowEntityCameraState.prototype.enter = function (_ctx) { };
    FollowEntityCameraState.prototype.update = function (ctx) {
        var frame = this.sampleFrame(ctx);
        if (frame !== undefined) {
            ctx.ClearWarn("follow-entity-invalid-".concat(this.targetEntIndex));
            return { frame: frame };
        }
        if (this.fallbackToDefault) {
            ctx.WarnOnce("follow-entity-invalid-".concat(this.targetEntIndex), "[FollowEntity] Target ".concat(this.targetEntIndex, " became invalid; fallback to default state"));
            return {
                nextState: ctx.CreateDefaultState(),
                transition: this.transitionOnFallback,
            };
        }
        return {};
    };
    FollowEntityCameraState.prototype.exit = function (_ctx) { };
    FollowEntityCameraState.prototype.sampleFrame = function (ctx) {
        var targetPosition = ctx.GetEntityTargetPosition(this.targetEntIndex, this.heightOffset);
        if (targetPosition === undefined) {
            return undefined;
        }
        return {
            targetPosition: targetPosition,
            distance: ctx.GetCameraDistance(),
            forceTargetPosition: true,
        };
    };
    return FollowEntityCameraState;
}());
var FollowPositionCameraState = /** @class */ (function () {
    function FollowPositionCameraState(options) {
        this.options = options;
        this.name = "FollowPosition";
    }
    FollowPositionCameraState.prototype.enter = function (_ctx) { };
    FollowPositionCameraState.prototype.update = function (ctx) {
        return { frame: this.sampleFrame(ctx) };
    };
    FollowPositionCameraState.prototype.exit = function (_ctx) { };
    FollowPositionCameraState.prototype.sampleFrame = function (ctx) {
        var _a, _b;
        return {
            targetPosition: this.options.position,
            distance: (_a = this.options.distance) !== null && _a !== void 0 ? _a : ctx.GetCameraDistance(),
            yaw: this.options.yaw,
            pitch: this.options.pitch,
            lockPitch: (_b = this.options.lockPitch) !== null && _b !== void 0 ? _b : (this.options.pitch !== undefined),
            forceTargetPosition: true,
        };
    };
    return FollowPositionCameraState;
}());
var BossIntroCameraState = /** @class */ (function () {
    function BossIntroCameraState(options) {
        var _a, _b, _c, _d;
        this.name = "BossIntro";
        this.startTime = 0;
        this.introHoldEndTime = 0;
        this.savedCameraYaw = 0;
        this.savedCameraPitch = 60;
        this.savedCameraDistance = 1150;
        this.introYawStart = 0;
        this.introYawEnd = 0;
        this.introPitchTarget = 28;
        this.defaultCameraPitch = 60;
        this.sweepStartOffset = -180;
        this.sweepEndOffset = 180;
        this.sweepForwardOffset = 48;
        this.sweepArcForwardOffset = 56;
        this.sweepArcHeightOffset = 22;
        this.targetEntIndex = options.targetEntIndex;
        this.fallbackTargetPosition = options.targetPosition;
        this.fallbackTargetForward = options.targetForward;
        this.duration = Math.max(0.5, (_a = options.duration) !== null && _a !== void 0 ? _a : 2.2);
        this.focusDistance = (_b = options.focusDistance) !== null && _b !== void 0 ? _b : 700;
        this.heightOffset = (_c = options.heightOffset) !== null && _c !== void 0 ? _c : 120;
        this.restoreDuration = Math.max(0.2, (_d = options.restoreDuration) !== null && _d !== void 0 ? _d : 0.6);
        this.nextState = options.nextState;
    }
    BossIntroCameraState.prototype.enter = function (ctx) {
        var _a, _b, _c, _d;
        var now = ctx.GetTime();
        var cameraGameUI = GameUI;
        this.startTime = now;
        this.introHoldEndTime = now + Math.min(0.22, Math.max(0.12, this.duration * 0.18));
        this.savedCameraDistance = ctx.GetCameraDistance();
        this.savedCameraYaw = (_b = (_a = cameraGameUI.GetCameraYaw) === null || _a === void 0 ? void 0 : _a.call(cameraGameUI)) !== null && _b !== void 0 ? _b : 0;
        this.savedCameraPitch = (_d = (_c = cameraGameUI.GetCameraPitch) === null || _c === void 0 ? void 0 : _c.call(cameraGameUI)) !== null && _d !== void 0 ? _d : this.defaultCameraPitch;
        if (this.savedCameraPitch <= 0) {
            this.savedCameraPitch = this.defaultCameraPitch;
        }
        this.introYawStart = this.savedCameraYaw - 14;
        this.introYawEnd = this.savedCameraYaw + 10;
        this.introPitchTarget = Math.min(this.savedCameraPitch, 28);
        ctx.LogDebug("[BossIntro] enter target=".concat(this.targetEntIndex, " duration=").concat(this.duration.toFixed(2), " focusDistance=").concat(this.focusDistance, " restoreDuration=").concat(this.restoreDuration.toFixed(2)));
    };
    BossIntroCameraState.prototype.update = function (ctx) {
        var _a, _b;
        var now = ctx.GetTime();
        var progress = this.getProgress(now, this.startTime, this.startTime + this.duration);
        var frame = this.buildFrame(ctx, progress);
        if (frame === undefined) {
            ctx.WarnOnce("boss-intro-invalid-".concat(this.targetEntIndex), "[BossIntro] Target ".concat(this.targetEntIndex, " is unavailable; restore to next state"));
            return {
                nextState: (_a = this.nextState) !== null && _a !== void 0 ? _a : ctx.CreateDefaultState(),
                transition: {
                    duration: this.restoreDuration,
                    easing: "easeInOut",
                    targetFrameOverride: this.getRestoreFrameOverride(),
                },
            };
        }
        ctx.ClearWarn("boss-intro-invalid-".concat(this.targetEntIndex));
        if (progress >= 1) {
            ctx.LogDebug("[BossIntro] complete target=".concat(this.targetEntIndex, "; requesting restore transition"));
            return {
                frame: frame,
                nextState: (_b = this.nextState) !== null && _b !== void 0 ? _b : ctx.CreateDefaultState(),
                transition: {
                    duration: this.restoreDuration,
                    easing: "easeInOut",
                    targetFrameOverride: this.getRestoreFrameOverride(),
                },
            };
        }
        return { frame: frame };
    };
    BossIntroCameraState.prototype.exit = function (_ctx) { };
    BossIntroCameraState.prototype.sampleFrame = function (ctx) {
        return this.buildFrame(ctx, 0);
    };
    BossIntroCameraState.prototype.CreateRestoreTransition = function (forceTargetPosition) {
        if (forceTargetPosition === void 0) { forceTargetPosition = false; }
        return {
            duration: this.restoreDuration,
            easing: "easeInOut",
            forceTargetPosition: forceTargetPosition,
            targetFrameOverride: this.getRestoreFrameOverride(),
        };
    };
    BossIntroCameraState.prototype.getRestoreFrameOverride = function () {
        return {
            distance: this.savedCameraDistance,
            yaw: this.savedCameraYaw,
            pitch: this.savedCameraPitch,
            lockPitch: true,
        };
    };
    BossIntroCameraState.prototype.buildFrame = function (ctx, introProgress) {
        var sweepProgress = this.getProgress(ctx.GetTime(), this.introHoldEndTime, this.startTime + this.duration);
        var targetPosition = this.getBossIntroTargetPosition(ctx, sweepProgress);
        if (targetPosition === undefined) {
            return undefined;
        }
        var easedSweepProgress = ctx.Ease(sweepProgress, "easeInOut");
        return {
            targetPosition: targetPosition,
            distance: this.focusDistance,
            yaw: ctx.Lerp(this.introYawStart, this.introYawEnd, easedSweepProgress),
            pitch: this.introPitchTarget,
            lockPitch: true,
            forceTargetPosition: true,
        };
    };
    BossIntroCameraState.prototype.getBossIntroTargetPosition = function (ctx, sweepProgress) {
        var easedProgress = ctx.Ease(sweepProgress, "easeInOut");
        var arcProgress = Math.sin(Math.PI * easedProgress);
        var hasTargetEntity = Entities.IsValidEntity(this.targetEntIndex);
        var forward = hasTargetEntity
            ? Entities.GetForward(this.targetEntIndex)
            : this.fallbackTargetForward;
        var origin = hasTargetEntity
            ? Entities.GetAbsOrigin(this.targetEntIndex)
            : this.fallbackTargetPosition;
        if (forward === undefined || origin === undefined) {
            return undefined;
        }
        var rightX = -forward[1];
        var rightY = forward[0];
        var sweepOffset = ctx.Lerp(this.sweepStartOffset, this.sweepEndOffset, easedProgress);
        var forwardOffset = this.sweepForwardOffset + arcProgress * this.sweepArcForwardOffset;
        // 保留旧实现中的经验缩放：heightOffset * 10。
        // 如果后续确认单位语义，应在这里统一调整。
        var heightOffset = this.heightOffset * 10 + arcProgress * this.sweepArcHeightOffset;
        return [
            origin[0] + rightX * sweepOffset + forward[0] * forwardOffset,
            origin[1] + rightY * sweepOffset + forward[1] * forwardOffset,
            origin[2] + heightOffset,
        ];
    };
    BossIntroCameraState.prototype.getProgress = function (now, startTime, endTime) {
        if (endTime <= startTime) {
            return 1;
        }
        var progress = (now - startTime) / (endTime - startTime);
        if (progress <= 0)
            return 0;
        if (progress >= 1)
            return 1;
        return progress;
    };
    return BossIntroCameraState;
}());
var CPanoramaScript_Camera = /** @class */ (function () {
    function CPanoramaScript_Camera() {
        this.cameraDistance = 1150;
        this.cameraLockEnabled = true;
        this.cameraFollowMode = "classic";
        this.cameraComfortDeadZoneRadius = 300;
        this.cameraComfortHalfLife = 0.16;
        this.started = false;
        this.updateSequence = 0;
        this.currentState = this.CreateDefaultState();
        this.currentStateEntered = false;
        this.warnOnceFlags = {};
        this.forceDefaultTargetPositionUntil = 0;
        this.defaultTargetPositionForceSeconds = 0.35;
    }
    CPanoramaScript_Camera.prototype.LogDebug = function (message) {
        if (!Game.IsInToolsMode()) {
            return;
        }
        $.Msg("[Camera] ".concat(message));
    };
    CPanoramaScript_Camera.prototype.WarnOnce = function (key, message) {
        if (this.warnOnceFlags[key] !== undefined) {
            return;
        }
        this.warnOnceFlags[key] = true;
        this.LogDebug(message);
    };
    CPanoramaScript_Camera.prototype.ClearWarn = function (key) {
        if (this.warnOnceFlags[key] === undefined) {
            return;
        }
        delete this.warnOnceFlags[key];
    };
    CPanoramaScript_Camera.prototype.ResetForHotReload = function () {
        this.LogDebug("ResetForHotReload sequence=".concat(this.updateSequence, " currentState=").concat(this.currentState.name));
        this.started = false;
        this.updateSequence += 1;
        this.currentState = this.CreateDefaultState();
        this.currentStateEntered = false;
        this.activeTransition = undefined;
        this.warnOnceFlags = {};
        this.lastBossIntroKey = undefined;
        this.forceDefaultTargetPositionUntil = 0;
    };
    CPanoramaScript_Camera.prototype.Start = function () {
        this.EnsureListener();
        if (this.started) {
            this.LogDebug("Start skipped sequence=".concat(this.updateSequence, "; camera loop already running"));
            return;
        }
        this.started = true;
        this.updateSequence += 1;
        this.LogDebug("Start sequence=".concat(this.updateSequence, " state=").concat(this.currentState.name));
        if (!this.currentStateEntered) {
            this.LogDebug("Entering initial state ".concat(this.currentState.name));
            this.currentState.enter(this);
            this.currentStateEntered = true;
        }
        this.Update(this.updateSequence);
    };
    CPanoramaScript_Camera.prototype.EnsureListener = function () {
        var _this = this;
        this.unsubscribeExistingListeners();
        this.LogDebug("Rebinding camera event listeners");
        CustomUIConfig.CameraBossIntroListener = GameEvents.Subscribe("boss_camera_intro", function (eventData) {
            var _a, _b, _c, _d;
            _this.LogDebug("Event boss_camera_intro target=".concat(eventData.targetEntIndex, " duration=").concat((_a = eventData.duration) !== null && _a !== void 0 ? _a : "default", " focusDistance=").concat((_b = eventData.focusDistance) !== null && _b !== void 0 ? _b : "default", " heightOffset=").concat((_c = eventData.heightOffset) !== null && _c !== void 0 ? _c : "default", " restoreDuration=").concat((_d = eventData.restoreDuration) !== null && _d !== void 0 ? _d : "default"));
            _this.HandleBossIntroPayload(eventData, "event");
        });
        CustomUIConfig.CameraBossIntroNetTableListener = CustomNetTables.SubscribeNetTableListener("common", function (_tableName, key, value) {
            if (key !== "boss_intro_camera") {
                return;
            }
            _this.HandleBossIntroPayload(value, "nettable");
        });
        this.HandleBossIntroPayload(CustomNetTables.GetTableValue("common", "boss_intro_camera"), "nettable");
        CustomUIConfig.CameraFollowTargetListener = GameEvents.Subscribe("camera_follow_target", function (eventData) {
            var _a, _b;
            _this.LogDebug("Event camera_follow_target target=".concat(eventData.targetEntIndex, " heightOffset=").concat((_a = eventData.heightOffset) !== null && _a !== void 0 ? _a : 0));
            _this.EnterFollowEntity({
                targetEntIndex: eventData.targetEntIndex,
                heightOffset: (_b = eventData.heightOffset) !== null && _b !== void 0 ? _b : 0,
                fallbackToDefault: true,
                transitionOnFallback: {
                    duration: 0.5,
                    easing: "easeInOut",
                },
            }, {
                forceTargetPosition: true,
            });
        });
        CustomUIConfig.CameraFollowHeroListener = GameEvents.Subscribe("camera_follow_hero", function (eventData) {
            var _a, _b;
            _this.LogDebug("Event camera_follow_hero Dur=".concat((_a = eventData.transitionDuration) !== null && _a !== void 0 ? _a : "null"));
            var targetFrameOverride = eventData.x !== undefined && eventData.y !== undefined
                ? { targetPosition: [eventData.x, eventData.y, (_b = eventData.z) !== null && _b !== void 0 ? _b : 0] }
                : undefined;
            var transitionOptions = eventData.transitionDuration !== undefined ? {
                transition: {
                    duration: eventData.transitionDuration,
                    easing: "easeInOut",
                    forceTargetPosition: true,
                    targetFrameOverride: targetFrameOverride,
                },
            } : { forceTargetPosition: true, targetFrameOverride: targetFrameOverride };
            _this.EnterDefaultStateWithBossIntroRestore(transitionOptions);
        });
        CustomUIConfig.CameraFollowPositionListener = GameEvents.Subscribe("camera_follow_position", function (eventData) {
            var _a, _b, _c;
            var lockPitch = eventData.lockPitch === true || eventData.lockPitch === 1;
            _this.LogDebug("Event camera_follow_position position=[".concat(eventData.x, ", ").concat(eventData.y, ", ").concat((_a = eventData.z) !== null && _a !== void 0 ? _a : 0, "] distance=").concat((_b = eventData.distance) !== null && _b !== void 0 ? _b : _this.cameraDistance));
            _this.EnterFollowPosition({
                position: [eventData.x, eventData.y, (_c = eventData.z) !== null && _c !== void 0 ? _c : 0],
                distance: eventData.distance,
                yaw: eventData.yaw,
                pitch: eventData.pitch,
                lockPitch: lockPitch,
            }, eventData.transitionDuration !== undefined
                ? {
                    transition: {
                        duration: eventData.transitionDuration,
                        easing: "easeInOut",
                        forceTargetPosition: true,
                    },
                }
                : { forceTargetPosition: true });
        });
    };
    CPanoramaScript_Camera.prototype.ToggleCameraLock = function () {
        this.SetCameraLockEnabled(!this.cameraLockEnabled);
    };
    CPanoramaScript_Camera.prototype.SetCameraLockEnabled = function (enabled) {
        if (this.cameraLockEnabled === enabled) {
            return;
        }
        this.cameraLockEnabled = enabled;
        this.LogDebug("SetCameraLockEnabled -> ".concat(this.cameraLockEnabled ? "on" : "off"));
        if (!this.cameraLockEnabled && this.lastAppliedFrame !== undefined) {
            this.lastAppliedFrame = {
                targetPosition: undefined,
                distance: this.lastAppliedFrame.distance,
                yaw: this.lastAppliedFrame.yaw,
                pitch: this.lastAppliedFrame.pitch,
                lockPitch: this.lastAppliedFrame.lockPitch,
            };
        }
    };
    CPanoramaScript_Camera.prototype.SetCameraDistance = function (distance) {
        this.LogDebug("SetCameraDistance ".concat(this.cameraDistance, " -> ").concat(distance));
        this.cameraDistance = distance;
    };
    CPanoramaScript_Camera.prototype.GetCameraDistance = function () {
        return this.cameraDistance;
    };
    CPanoramaScript_Camera.prototype.SetCameraFollowMode = function (mode) {
        var nextMode = mode === "free" || mode === "comfort" ? mode : "classic";
        if (this.cameraFollowMode === nextMode) {
            this.SetCameraLockEnabled(nextMode !== "free");
            return;
        }
        this.LogDebug("SetCameraFollowMode ".concat(this.cameraFollowMode, " -> ").concat(nextMode));
        this.cameraFollowMode = nextMode;
        this.SetCameraLockEnabled(nextMode !== "free");
        if (this.currentState.name === "FollowHero") {
            this.ChangeState(this.CreateDefaultState());
        }
    };
    CPanoramaScript_Camera.prototype.GetCameraFollowMode = function () {
        return this.cameraFollowMode;
    };
    CPanoramaScript_Camera.prototype.SetCameraComfortFollowOptions = function (deadZoneRadius, halfLife) {
        var nextDeadZoneRadius = Math.min(Math.max(deadZoneRadius, 0), 1000);
        var nextHalfLife = Math.min(Math.max(halfLife, 0.001), 2);
        if (this.cameraComfortDeadZoneRadius === nextDeadZoneRadius && this.cameraComfortHalfLife === nextHalfLife) {
            return;
        }
        this.LogDebug("SetCameraComfortFollowOptions deadZone ".concat(this.cameraComfortDeadZoneRadius, " -> ").concat(nextDeadZoneRadius, ", halfLife ").concat(this.cameraComfortHalfLife, " -> ").concat(nextHalfLife));
        this.cameraComfortDeadZoneRadius = nextDeadZoneRadius;
        this.cameraComfortHalfLife = nextHalfLife;
        if (this.currentState.name === "FollowHero" && this.cameraFollowMode === "comfort") {
            this.ChangeState(this.CreateDefaultState());
        }
    };
    CPanoramaScript_Camera.prototype.GetCameraComfortDeadZoneRadius = function () {
        return this.cameraComfortDeadZoneRadius;
    };
    CPanoramaScript_Camera.prototype.GetCameraComfortHalfLife = function () {
        return this.cameraComfortHalfLife;
    };
    CPanoramaScript_Camera.prototype.GetLastAppliedFrame = function () {
        return this.lastAppliedFrame;
    };
    CPanoramaScript_Camera.prototype.ShouldForceDefaultTargetPosition = function () {
        return this.GetTime() <= this.forceDefaultTargetPositionUntil;
    };
    CPanoramaScript_Camera.prototype.CreateDefaultState = function () {
        return new FollowHeroCameraState();
    };
    CPanoramaScript_Camera.prototype.EnterDefaultState = function (options) {
        this.LogDebug("EnterDefaultState transition=".concat(this.FormatTransition(options === null || options === void 0 ? void 0 : options.transition)));
        this.ArmDefaultTargetPositionForce(options);
        this.ChangeState(this.CreateDefaultState(), options);
    };
    CPanoramaScript_Camera.prototype.EnterFollowHero = function (options) {
        this.EnterDefaultState(options);
    };
    CPanoramaScript_Camera.prototype.EnterFollowEntity = function (options, changeOptions) {
        var _a;
        if (!Entities.IsValidEntity(options.targetEntIndex)) {
            this.LogDebug("EnterFollowEntity ignored invalid target=".concat(options.targetEntIndex));
            return;
        }
        this.LogDebug("EnterFollowEntity target=".concat(options.targetEntIndex, " heightOffset=").concat((_a = options.heightOffset) !== null && _a !== void 0 ? _a : 0, " transition=").concat(this.FormatTransition(changeOptions === null || changeOptions === void 0 ? void 0 : changeOptions.transition)));
        this.ChangeState(new FollowEntityCameraState(options), changeOptions);
    };
    CPanoramaScript_Camera.prototype.EnterFollowPosition = function (options, changeOptions) {
        var _a;
        this.LogDebug("EnterFollowPosition position=[".concat(options.position.join(", "), "] distance=").concat((_a = options.distance) !== null && _a !== void 0 ? _a : this.cameraDistance, " transition=").concat(this.FormatTransition(changeOptions === null || changeOptions === void 0 ? void 0 : changeOptions.transition)));
        this.ChangeState(new FollowPositionCameraState(options), changeOptions);
    };
    CPanoramaScript_Camera.prototype.EnterBossIntro = function (options) {
        var _a, _b;
        if (!Entities.IsValidEntity(options.targetEntIndex) && options.targetPosition === undefined) {
            this.LogDebug("EnterBossIntro ignored invalid target=".concat(options.targetEntIndex));
            return;
        }
        this.LogDebug("EnterBossIntro target=".concat(options.targetEntIndex, " duration=").concat((_a = options.duration) !== null && _a !== void 0 ? _a : "default", " focusDistance=").concat((_b = options.focusDistance) !== null && _b !== void 0 ? _b : "default"));
        this.ChangeState(new BossIntroCameraState(options));
    };
    CPanoramaScript_Camera.prototype.HandleBossIntroPayload = function (payload, source) {
        var _this = this;
        var _a, _b, _c;
        this.LogDebug("HandleBossIntroPayload000");
        if (payload === undefined) {
            return;
        }
        this.LogDebug("HandleBossIntroPayload state=".concat("state" in payload ? payload.state : "undefined"));
        if ("state" in payload && !payload.state) {
            this.InterruptBossIntro(source);
            return;
        }
        if (payload.targetEntIndex === undefined) {
            return;
        }
        var now = this.GetTime();
        var remainingDuration = payload.endTime !== undefined
            ? Math.max(1.2, payload.endTime - now)
            : payload.duration;
        if (remainingDuration !== undefined && remainingDuration <= 0) {
            this.LogDebug("Boss intro ".concat(source, " ignored expired target=").concat(payload.targetEntIndex));
            return;
        }
        var targetPosition = this.GetBossIntroFallbackPosition(payload);
        var targetForward = this.GetBossIntroFallbackForward(payload);
        if (!Entities.IsValidEntity(payload.targetEntIndex) && targetPosition === undefined) {
            this.LogDebug("Boss intro ".concat(source, " waiting for target=").concat(payload.targetEntIndex));
            $.Schedule(0.1, function () {
                _this.HandleBossIntroPayload(CustomNetTables.GetTableValue("common", "boss_intro_camera"), "nettable");
            });
            return;
        }
        var introKey = "".concat((_c = (_b = (_a = payload.sequence) !== null && _a !== void 0 ? _a : payload.startTime) !== null && _b !== void 0 ? _b : payload.endTime) !== null && _c !== void 0 ? _c : "event", ":").concat(payload.targetEntIndex);
        if (this.lastBossIntroKey === introKey) {
            this.LogDebug("Boss intro ".concat(source, " ignored duplicate key=").concat(introKey));
            return;
        }
        this.lastBossIntroKey = introKey;
        this.EnterBossIntro({
            targetEntIndex: payload.targetEntIndex,
            targetPosition: targetPosition,
            targetForward: targetForward,
            duration: remainingDuration !== null && remainingDuration !== void 0 ? remainingDuration : payload.duration,
            focusDistance: payload.focusDistance,
            heightOffset: payload.heightOffset,
            restoreDuration: payload.restoreDuration,
        });
    };
    CPanoramaScript_Camera.prototype.InterruptBossIntro = function (source) {
        if (!(this.currentState instanceof BossIntroCameraState)) {
            this.LogDebug("Boss intro ".concat(source, " cancellation ignored; current state=").concat(this.currentState.name));
            return;
        }
        this.LogDebug("Boss intro ".concat(source, " cancelled; restoring player camera"));
        this.EnterDefaultStateWithBossIntroRestore();
    };
    CPanoramaScript_Camera.prototype.EnterDefaultStateWithBossIntroRestore = function (options) {
        var _a, _b, _c;
        if (!(this.currentState instanceof BossIntroCameraState)) {
            this.EnterDefaultState(options);
            return;
        }
        var bossRestoreTransition = this.currentState.CreateRestoreTransition(true);
        var requestedTransition = options === null || options === void 0 ? void 0 : options.transition;
        var requestedTargetFrameOverride = (_a = requestedTransition === null || requestedTransition === void 0 ? void 0 : requestedTransition.targetFrameOverride) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.targetFrameOverride;
        this.LogDebug("Restoring saved Boss intro camera frame before returning to FollowHero");
        this.EnterDefaultState({
            transition: __assign(__assign({}, bossRestoreTransition), { duration: (_b = requestedTransition === null || requestedTransition === void 0 ? void 0 : requestedTransition.duration) !== null && _b !== void 0 ? _b : bossRestoreTransition.duration, easing: (_c = requestedTransition === null || requestedTransition === void 0 ? void 0 : requestedTransition.easing) !== null && _c !== void 0 ? _c : bossRestoreTransition.easing, forceTargetPosition: true, targetFrameOverride: this.MergeFrame(requestedTargetFrameOverride, bossRestoreTransition.targetFrameOverride) }),
        });
    };
    CPanoramaScript_Camera.prototype.GetBossIntroFallbackPosition = function (payload) {
        if (payload.targetX === undefined || payload.targetY === undefined || payload.targetZ === undefined) {
            return undefined;
        }
        return [payload.targetX, payload.targetY, payload.targetZ];
    };
    CPanoramaScript_Camera.prototype.GetBossIntroFallbackForward = function (payload) {
        if (payload.forwardX === undefined || payload.forwardY === undefined || payload.forwardZ === undefined) {
            return undefined;
        }
        return [payload.forwardX, payload.forwardY, payload.forwardZ];
    };
    CPanoramaScript_Camera.prototype.ChangeState = function (nextState, options) {
        var _a, _b, _c;
        var previousStateName = this.currentState.name;
        var forceTargetPosition = (options === null || options === void 0 ? void 0 : options.forceTargetPosition) === true || ((_a = options === null || options === void 0 ? void 0 : options.transition) === null || _a === void 0 ? void 0 : _a.forceTargetPosition) === true;
        this.LogDebug("ChangeState ".concat(previousStateName, " -> ").concat(nextState.name, " transition=").concat(this.FormatTransition(options === null || options === void 0 ? void 0 : options.transition)));
        var transitionOptions = options === null || options === void 0 ? void 0 : options.transition;
        if (transitionOptions !== undefined && transitionOptions.duration > 0) {
            var created = this.TryBeginTransition(nextState, transitionOptions);
            if (created) {
                this.LogDebug("ChangeState transition started ".concat(previousStateName, " -> ").concat(nextState.name));
                return;
            }
            this.LogDebug("ChangeState transition skipped ".concat(previousStateName, " -> ").concat(nextState.name, "; falling back to immediate switch"));
        }
        this.CancelTransitionOnly();
        this.ExitCurrentStateIfNeeded();
        this.currentState = nextState;
        this.LogDebug("Entering state ".concat(this.currentState.name));
        this.currentState.enter(this);
        this.currentStateEntered = true;
        if (forceTargetPosition) {
            this.ApplyForcedTargetFrame(this.MergeFrame((_c = (_b = this.currentState).sampleFrame) === null || _c === void 0 ? void 0 : _c.call(_b, this), options === null || options === void 0 ? void 0 : options.targetFrameOverride));
        }
    };
    CPanoramaScript_Camera.prototype.GetTime = function () {
        return Game.GetGameTime();
    };
    CPanoramaScript_Camera.prototype.GetLocalHeroEntityIndex = function () {
        var playerId = Players.GetLocalPlayer();
        var heroEntIndex = Players.GetPlayerHeroEntityIndex(playerId);
        if (heroEntIndex === -1 || !Entities.IsValidEntity(heroEntIndex)) {
            this.WarnOnce("local-hero-entity-invalid", "[Camera] Local hero entity is invalid for player ".concat(playerId));
            return undefined;
        }
        this.ClearWarn("local-hero-entity-invalid");
        return heroEntIndex;
    };
    CPanoramaScript_Camera.prototype.GetEntityTargetPosition = function (entIndex, heightOffset) {
        if (heightOffset === void 0) { heightOffset = 0; }
        if (!Entities.IsValidEntity(entIndex)) {
            return undefined;
        }
        var origin = Entities.GetAbsOrigin(entIndex);
        return [origin[0], origin[1], origin[2] + heightOffset];
    };
    CPanoramaScript_Camera.prototype.Lerp = function (startValue, endValue, progress) {
        return startValue + (endValue - startValue) * progress;
    };
    CPanoramaScript_Camera.prototype.LerpVector = function (startValue, endValue, progress) {
        return [
            this.Lerp(startValue[0], endValue[0], progress),
            this.Lerp(startValue[1], endValue[1], progress),
            this.Lerp(startValue[2], endValue[2], progress),
        ];
    };
    CPanoramaScript_Camera.prototype.Ease = function (progress, easing) {
        if (easing === void 0) { easing = "easeInOut"; }
        var clamped = this.Clamp01(progress);
        switch (easing) {
            case "linear":
                return clamped;
            case "easeIn":
                return clamped * clamped * clamped;
            case "easeOut":
                return 1 - Math.pow(1 - clamped, 3);
            case "easeInOut":
            default:
                return clamped < 0.5
                    ? 4 * clamped * clamped * clamped
                    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
        }
    };
    CPanoramaScript_Camera.prototype.Update = function (updateSequence) {
        var _this = this;
        $.Schedule(0, function () {
            if (!_this.started || _this.updateSequence !== updateSequence) {
                return;
            }
            _this.Tick();
            _this.Update(updateSequence);
        });
    };
    CPanoramaScript_Camera.prototype.Tick = function () {
        if (this.activeTransition !== undefined) {
            var frame = this.UpdateTransition(this.activeTransition);
            this.ApplyFrame(frame);
            return;
        }
        var result = this.currentState.update(this);
        if (result.frame !== undefined) {
            this.ApplyFrame(result.frame);
        }
        if (result.nextState !== undefined) {
            this.ChangeState(result.nextState, {
                transition: result.transition,
            });
        }
    };
    CPanoramaScript_Camera.prototype.TryBeginTransition = function (nextState, options) {
        var _a, _b, _c;
        var fromFrame = this.lastAppliedFrame;
        if (fromFrame === undefined) {
            this.LogDebug("TryBeginTransition ".concat(this.currentState.name, " -> ").concat(nextState.name, " skipped: missing lastAppliedFrame"));
            return false;
        }
        var sampledTargetFrame = (_a = nextState.sampleFrame) === null || _a === void 0 ? void 0 : _a.call(nextState, this);
        var fallbackTargetFrame = this.MergeFrame(sampledTargetFrame, options.targetFrameOverride);
        if (fallbackTargetFrame === undefined) {
            this.LogDebug("TryBeginTransition ".concat(this.currentState.name, " -> ").concat(nextState.name, " skipped: missing target frame"));
            return false;
        }
        this.CancelTransitionOnly();
        this.ExitCurrentStateIfNeeded();
        this.activeTransition = {
            fromFrame: fromFrame,
            fallbackTargetFrame: fallbackTargetFrame,
            nextState: nextState,
            startTime: this.GetTime(),
            duration: Math.max(0.01, options.duration),
            easing: (_b = options.easing) !== null && _b !== void 0 ? _b : "easeInOut",
            targetFrameOverride: options.targetFrameOverride,
            forceTargetPosition: options.forceTargetPosition,
        };
        this.LogDebug("TryBeginTransition ".concat(this.currentState.name, " -> ").concat(nextState.name, " duration=").concat(Math.max(0.01, options.duration).toFixed(2), " easing=").concat((_c = options.easing) !== null && _c !== void 0 ? _c : "easeInOut"));
        return true;
    };
    CPanoramaScript_Camera.prototype.UpdateTransition = function (transition) {
        var _a, _b, _c;
        var now = this.GetTime();
        var rawProgress = (now - transition.startTime) / transition.duration;
        var progress = this.Clamp01(rawProgress);
        var easedProgress = this.Ease(progress, transition.easing);
        var sampledTargetFrame = (_b = (_a = transition.nextState).sampleFrame) === null || _b === void 0 ? void 0 : _b.call(_a, this);
        var targetFrame = (_c = this.MergeFrame(sampledTargetFrame, transition.targetFrameOverride)) !== null && _c !== void 0 ? _c : transition.fallbackTargetFrame;
        var frame = this.InterpolateFrame(transition.fromFrame, targetFrame, easedProgress);
        frame.forceTargetPosition = transition.forceTargetPosition;
        if (progress >= 1) {
            this.activeTransition = undefined;
            this.currentState = transition.nextState;
            this.LogDebug("Transition complete -> ".concat(this.currentState.name));
            this.currentState.enter(this);
            this.currentStateEntered = true;
        }
        return frame;
    };
    CPanoramaScript_Camera.prototype.InterpolateFrame = function (fromFrame, toFrame, progress) {
        var _a, _b;
        return {
            targetPosition: this.interpolateVectorField(fromFrame.targetPosition, toFrame.targetPosition, progress),
            distance: this.interpolateNumberField(fromFrame.distance, toFrame.distance, progress),
            yaw: this.interpolateNumberField(fromFrame.yaw, toFrame.yaw, progress),
            pitch: this.interpolateNumberField(fromFrame.pitch, toFrame.pitch, progress),
            lockPitch: (_a = toFrame.lockPitch) !== null && _a !== void 0 ? _a : fromFrame.lockPitch,
            forceTargetPosition: (_b = toFrame.forceTargetPosition) !== null && _b !== void 0 ? _b : fromFrame.forceTargetPosition,
        };
    };
    CPanoramaScript_Camera.prototype.ApplyFrame = function (frame) {
        var _a, _b, _c;
        var filteredFrame = this.FilterFrameForCameraLock(frame);
        var cameraGameUI = GameUI;
        if (filteredFrame.targetPosition !== undefined) {
            GameUI.SetCameraTargetPosition(filteredFrame.targetPosition, -1);
        }
        if (filteredFrame.distance !== undefined) {
            GameUI.SetCameraDistance(filteredFrame.distance);
        }
        if (filteredFrame.yaw !== undefined) {
            (_a = cameraGameUI.SetCameraYaw) === null || _a === void 0 ? void 0 : _a.call(cameraGameUI, filteredFrame.yaw);
        }
        if (filteredFrame.pitch !== undefined && filteredFrame.lockPitch) {
            (_b = cameraGameUI.SetCameraPitchMin) === null || _b === void 0 ? void 0 : _b.call(cameraGameUI, filteredFrame.pitch);
            (_c = cameraGameUI.SetCameraPitchMax) === null || _c === void 0 ? void 0 : _c.call(cameraGameUI, filteredFrame.pitch);
        }
        this.lastAppliedFrame = this.MergeFrameForCache(this.lastAppliedFrame, filteredFrame);
    };
    CPanoramaScript_Camera.prototype.ApplyForcedTargetFrame = function (frame) {
        if (frame === undefined) {
            return;
        }
        this.ApplyFrame(__assign(__assign({}, frame), { forceTargetPosition: true }));
    };
    CPanoramaScript_Camera.prototype.ArmDefaultTargetPositionForce = function (options) {
        var _a, _b, _c, _d;
        var shouldForceTargetPosition = (options === null || options === void 0 ? void 0 : options.forceTargetPosition) === true || ((_a = options === null || options === void 0 ? void 0 : options.transition) === null || _a === void 0 ? void 0 : _a.forceTargetPosition) === true;
        if (!shouldForceTargetPosition) {
            return;
        }
        var transitionDuration = (_c = (_b = options === null || options === void 0 ? void 0 : options.transition) === null || _b === void 0 ? void 0 : _b.duration) !== null && _c !== void 0 ? _c : 0;
        var holdSeconds = Math.max((_d = this.defaultTargetPositionForceSeconds) !== null && _d !== void 0 ? _d : 0.35, transitionDuration + 0.12);
        this.forceDefaultTargetPositionUntil = Math.max(this.forceDefaultTargetPositionUntil, this.GetTime() + holdSeconds);
    };
    CPanoramaScript_Camera.prototype.ExitCurrentStateIfNeeded = function () {
        if (!this.currentStateEntered) {
            return;
        }
        this.LogDebug("Exit state ".concat(this.currentState.name));
        this.currentState.exit(this);
        this.currentStateEntered = false;
    };
    CPanoramaScript_Camera.prototype.CancelTransitionOnly = function () {
        if (this.activeTransition !== undefined) {
            this.LogDebug("CancelTransitionOnly target=".concat(this.activeTransition.nextState.name));
            this.activeTransition = undefined;
        }
    };
    CPanoramaScript_Camera.prototype.unsubscribeExistingListeners = function () {
        if (CustomUIConfig.CameraBossIntroListener !== undefined) {
            GameEvents.Unsubscribe(CustomUIConfig.CameraBossIntroListener);
            CustomUIConfig.CameraBossIntroListener = undefined;
        }
        if (CustomUIConfig.CameraBossIntroNetTableListener !== undefined) {
            CustomNetTables.UnsubscribeNetTableListener(CustomUIConfig.CameraBossIntroNetTableListener);
            CustomUIConfig.CameraBossIntroNetTableListener = undefined;
        }
        if (CustomUIConfig.CameraFollowTargetListener !== undefined) {
            GameEvents.Unsubscribe(CustomUIConfig.CameraFollowTargetListener);
            CustomUIConfig.CameraFollowTargetListener = undefined;
        }
        if (CustomUIConfig.CameraFollowHeroListener !== undefined) {
            GameEvents.Unsubscribe(CustomUIConfig.CameraFollowHeroListener);
            CustomUIConfig.CameraFollowHeroListener = undefined;
        }
        if (CustomUIConfig.CameraFollowPositionListener !== undefined) {
            GameEvents.Unsubscribe(CustomUIConfig.CameraFollowPositionListener);
            CustomUIConfig.CameraFollowPositionListener = undefined;
        }
    };
    CPanoramaScript_Camera.prototype.MergeFrame = function (baseFrame, overrideFrame) {
        var _a, _b, _c, _d, _e, _f;
        if (baseFrame === undefined && overrideFrame === undefined) {
            return undefined;
        }
        return {
            targetPosition: (_a = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.targetPosition) !== null && _a !== void 0 ? _a : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.targetPosition,
            distance: (_b = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.distance) !== null && _b !== void 0 ? _b : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.distance,
            yaw: (_c = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.yaw) !== null && _c !== void 0 ? _c : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.yaw,
            pitch: (_d = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.pitch) !== null && _d !== void 0 ? _d : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.pitch,
            lockPitch: (_e = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.lockPitch) !== null && _e !== void 0 ? _e : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.lockPitch,
            forceTargetPosition: (_f = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.forceTargetPosition) !== null && _f !== void 0 ? _f : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.forceTargetPosition,
        };
    };
    CPanoramaScript_Camera.prototype.MergeFrameForCache = function (baseFrame, overrideFrame) {
        var _a, _b, _c, _d, _e;
        if (baseFrame === undefined && overrideFrame === undefined) {
            return undefined;
        }
        return {
            targetPosition: this.cameraLockEnabled || (overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.forceTargetPosition)
                ? ((_a = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.targetPosition) !== null && _a !== void 0 ? _a : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.targetPosition)
                : undefined,
            distance: (_b = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.distance) !== null && _b !== void 0 ? _b : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.distance,
            yaw: (_c = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.yaw) !== null && _c !== void 0 ? _c : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.yaw,
            pitch: (_d = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.pitch) !== null && _d !== void 0 ? _d : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.pitch,
            lockPitch: (_e = overrideFrame === null || overrideFrame === void 0 ? void 0 : overrideFrame.lockPitch) !== null && _e !== void 0 ? _e : baseFrame === null || baseFrame === void 0 ? void 0 : baseFrame.lockPitch,
        };
    };
    CPanoramaScript_Camera.prototype.FilterFrameForCameraLock = function (frame) {
        if (this.cameraLockEnabled || frame.forceTargetPosition) {
            return frame;
        }
        return {
            targetPosition: undefined,
            distance: frame.distance,
            yaw: frame.yaw,
            pitch: frame.pitch,
            lockPitch: frame.lockPitch,
            forceTargetPosition: frame.forceTargetPosition,
        };
    };
    CPanoramaScript_Camera.prototype.interpolateNumberField = function (fromValue, toValue, progress) {
        if (fromValue !== undefined && toValue !== undefined) {
            return this.Lerp(fromValue, toValue, progress);
        }
        return toValue !== null && toValue !== void 0 ? toValue : fromValue;
    };
    CPanoramaScript_Camera.prototype.interpolateVectorField = function (fromValue, toValue, progress) {
        if (fromValue !== undefined && toValue !== undefined) {
            return this.LerpVector(fromValue, toValue, progress);
        }
        return toValue !== null && toValue !== void 0 ? toValue : fromValue;
    };
    CPanoramaScript_Camera.prototype.Clamp01 = function (value) {
        if (value <= 0)
            return 0;
        if (value >= 1)
            return 1;
        return value;
    };
    CPanoramaScript_Camera.prototype.FormatTransition = function (transition) {
        var _a;
        if (transition === undefined) {
            return "none";
        }
        return "duration=".concat(transition.duration.toFixed(2), ", easing=").concat((_a = transition.easing) !== null && _a !== void 0 ? _a : "easeInOut");
    };
    return CPanoramaScript_Camera;
}());
var existingCamera = CustomUIConfig.Camera;
if (existingCamera !== undefined) {
    Object.setPrototypeOf(existingCamera, CPanoramaScript_Camera.prototype);
    (_a = existingCamera.cameraDistance) !== null && _a !== void 0 ? _a : (existingCamera.cameraDistance = 1150);
    (_b = existingCamera.cameraLockEnabled) !== null && _b !== void 0 ? _b : (existingCamera.cameraLockEnabled = true);
    (_c = existingCamera.cameraFollowMode) !== null && _c !== void 0 ? _c : (existingCamera.cameraFollowMode = "classic");
    (_d = existingCamera.cameraComfortDeadZoneRadius) !== null && _d !== void 0 ? _d : (existingCamera.cameraComfortDeadZoneRadius = 300);
    (_e = existingCamera.cameraComfortHalfLife) !== null && _e !== void 0 ? _e : (existingCamera.cameraComfortHalfLife = 0.16);
    // 热重载后直接重启模块。状态对象结构可能已变化，因此回到默认状态更安全。
    CustomUIConfig.Camera = existingCamera;
    CustomUIConfig.Camera.LogDebug("Hot reload detected; reusing existing camera instance");
    CustomUIConfig.Camera.ResetForHotReload();
    CustomUIConfig.Camera.Start();
}
else {
    CustomUIConfig.Camera = new CPanoramaScript_Camera();
    CustomUIConfig.Camera.LogDebug("Create new camera instance");
    CustomUIConfig.Camera.Start();
}