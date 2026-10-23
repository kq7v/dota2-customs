--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";
var _a, _b, _c;
var _d, _e, _f;
var CPanoramaScript_Timer = /** @class */ (function () {
    function CPanoramaScript_Timer() {
        this.timers = {};
        this.timerKeys = [];
        this.removedTimerCount = 0;
    }
    CPanoramaScript_Timer.prototype.EnsureTimerStorage = function () {
        var _a;
        if (typeof this.timers !== "object") {
            this.timers = {};
        }
        if (!Array.isArray(this.timerKeys)) {
            this.timerKeys = Object.keys(this.timers);
        }
        (_a = this.removedTimerCount) !== null && _a !== void 0 ? _a : (this.removedTimerCount = 0);
    };
    CPanoramaScript_Timer.prototype.RemoveTimerByKey = function (sKey) {
        if (this.timers[sKey] !== undefined) {
            delete this.timers[sKey];
            this.removedTimerCount++;
        }
    };
    CPanoramaScript_Timer.prototype.CompactTimerKeys = function () {
        var _this = this;
        if (this.removedTimerCount <= 0)
            return;
        if (this.removedTimerCount < 32 && this.removedTimerCount * 2 < this.timerKeys.length)
            return;
        this.timerKeys = this.timerKeys.filter(function (sKey) { return _this.timers[sKey] !== undefined; });
        this.removedTimerCount = 0;
    };
    CPanoramaScript_Timer.prototype.TimerFunction = function () {
        var _this = this;
        this.EnsureTimerStorage();
        var fTime = Game.Time();
        var bNoSchedule = false;
        for (var index = this.timerKeys.length - 1; index >= 0; index--) {
            var sKey = this.timerKeys[index];
            var tData = this.timers[sKey];
            if (tData) {
                var time = tData.time;
                if (typeof time === "number") {
                    if (fTime < time)
                        continue;
                    if (tData.running === true) {
                        bNoSchedule = true;
                        continue;
                    }
                    var callback = tData.callback;
                    if (typeof callback === "function") {
                        tData.running = true;
                        var result = callback();
                        tData.running = false;
                        if (this.timers[sKey] !== tData) {
                            continue;
                        }
                        if (typeof result === "number") {
                            tData.time = fTime + result;
                            continue;
                        }
                    }
                }
            }
            this.RemoveTimerByKey(sKey);
        }
        this.CompactTimerKeys();
        if (!bNoSchedule && this.timerKeys.length > 0) {
            this.scheduleHandle = $.Schedule(Game.GetGameFrameTime(), function () { return _this.TimerFunction(); });
        }
        else {
            this.scheduleHandle = undefined;
        }
    };
    /**
     * 创建/删除计时器
     * @param sKey 计时器唯一标识
     * @param fTime 延迟时间（秒）
     * @param funcCallback 回调函数，返回数字则继续循环
     */
    CPanoramaScript_Timer.prototype.CreateTimer = function (sKey, fTime, funcCallback) {
        this.EnsureTimerStorage();
        if (typeof fTime === "number" && typeof funcCallback === "function") {
            if (fTime === 0)
                fTime = 0.0001;
            if (this.timers[sKey] === undefined) {
                this.timerKeys.push(sKey);
            }
            this.timers[sKey] = {
                time: Game.Time() + fTime,
                callback: funcCallback,
                running: false,
            };
        }
        else {
            this.RemoveTimerByKey(sKey);
        }
        if (this.scheduleHandle) {
            try {
                $.CancelScheduled(this.scheduleHandle);
            }
            catch (error) { }
            this.scheduleHandle = undefined;
        }
        this.TimerFunction();
    };
    CPanoramaScript_Timer.prototype.Wait = function (time) {
        return new Promise(function (resolve) {
            $.Schedule(time, function () {
                resolve();
            });
        });
    };
    CPanoramaScript_Timer.prototype.WaitConditionPromise = function (conditon) {
        return new Promise(function (resolve) {
            function check() {
                var result = conditon();
                if (result) {
                    return resolve();
                }
                $.Schedule(0, check);
            }
            check();
        });
    };
    /**
     * 移除计时器
     * @param sKey 计时器唯一标识
     */
    CPanoramaScript_Timer.prototype.RemoveTimer = function (sKey) {
        this.EnsureTimerStorage();
        this.RemoveTimerByKey(sKey);
        this.CompactTimerKeys();
    };
    /**
     * 清空所有计时器
     */
    CPanoramaScript_Timer.prototype.ClearAllTimers = function () {
        this.timers = {};
        this.timerKeys = [];
        this.removedTimerCount = 0;
        if (this.scheduleHandle) {
            try {
                $.CancelScheduled(this.scheduleHandle);
            }
            catch (error) { }
            this.scheduleHandle = undefined;
        }
    };
    return CPanoramaScript_Timer;
}());
var timer = CustomUIConfig.Timer;
if (timer !== undefined) {
    Object.setPrototypeOf(timer, CPanoramaScript_Timer.prototype);
    (_a = (_d = timer).timers) !== null && _a !== void 0 ? _a : (_d.timers = {});
    (_b = (_e = timer).timerKeys) !== null && _b !== void 0 ? _b : (_e.timerKeys = Object.keys(timer.timers));
    (_c = (_f = timer).removedTimerCount) !== null && _c !== void 0 ? _c : (_f.removedTimerCount = 0);
}
else {
    CustomUIConfig.Timer = new CPanoramaScript_Timer();
}