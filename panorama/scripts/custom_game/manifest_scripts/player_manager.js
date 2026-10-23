--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";
/** 玩家简要资料管理器：跨 Panorama 页面统一缓存、请求和订阅。 */
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var PLAYER_INFO_CACHE_INTERVAL = 180;
var PLAYER_EQUIPMENT_SIMPLIFY_KEYS = [
    "id",
    "equipment_item_id",
    "level",
    "remaining_potential",
    "total_potential",
    "locked",
    "in_equip_suit",
    "ability_entry_data",
    "inlay_gems_data",
    "in_check",
];
var CPlayerManager = /** @class */ (function () {
    function CPlayerManager() {
        this.entries = {};
    }
    CPlayerManager.prototype.ResolveSteamID = function (target) {
        var _a;
        var directSteamID = this.NormalizeSteamID(target.steamID);
        if (directSteamID != undefined)
            return directSteamID;
        if (target.steam64ID != undefined) {
            var steam64ID = this.NormalizeSteam64ID(target.steam64ID);
            if (steam64ID != undefined)
                return steam64ID;
        }
        if (target.playerID == undefined)
            return undefined;
        var playerSteam64ID = (_a = Game.GetPlayerInfo(target.playerID)) === null || _a === void 0 ? void 0 : _a.player_steamid;
        return this.NormalizeSteam64ID(playerSteam64ID);
    };
    CPlayerManager.prototype.GetSnapshot = function (steamID) {
        var entry = this.GetOrCreateEntry(steamID);
        return {
            steamID: entry.steamID,
            data: entry.data,
            status: entry.status,
            lastSuccessTime: entry.lastSuccessTime,
            error: entry.error,
        };
    };
    CPlayerManager.prototype.EnsurePlayerInfo = function (steamID, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var entry = this.GetOrCreateEntry(steamID);
        var now = Game.Time();
        var cacheFresh = entry.data != undefined && entry.lastSuccessTime + PLAYER_INFO_CACHE_INTERVAL > now;
        if (!force && cacheFresh)
            return;
        if (entry.status == "loading" || entry.status == "refreshing")
            return;
        entry.status = entry.data == undefined ? "loading" : "refreshing";
        entry.error = undefined;
        this.Notify(entry);
        GameUI.CustomUIConfig().ServerRequest("get_player_info", { steamID: steamID }, function (result) {
            var _a, _b;
            if ((result.code == 0 || result.code == 200) && result.data != undefined) {
                entry.data = _this.NormalizePlayerInfoData(result.data, steamID);
                entry.lastSuccessTime = Game.Time();
                entry.status = "ready";
                entry.error = undefined;
                _this.Notify(entry);
                return;
            }
            entry.status = "error";
            entry.error = String((_b = (_a = result.message) !== null && _a !== void 0 ? _a : result.code) !== null && _b !== void 0 ? _b : "get_player_info failed");
            _this.Notify(entry);
        }, undefined, function () {
            entry.status = "error";
            entry.error = "get_player_info timeout";
            _this.Notify(entry);
        });
    };
    CPlayerManager.prototype.RefreshPlayerInfo = function (steamID) {
        this.EnsurePlayerInfo(steamID, true);
    };
    CPlayerManager.prototype.InvalidatePlayerInfo = function (steamID, clearData) {
        if (clearData === void 0) { clearData = false; }
        var entry = this.GetOrCreateEntry(steamID);
        entry.lastSuccessTime = -PLAYER_INFO_CACHE_INTERVAL;
        entry.error = undefined;
        if (clearData) {
            entry.data = undefined;
            entry.status = "idle";
        }
        this.Notify(entry);
    };
    CPlayerManager.prototype.Subscribe = function (steamID, listener) {
        var entry = this.GetOrCreateEntry(steamID);
        entry.listeners.push(listener);
        return function () {
            var index = entry.listeners.indexOf(listener);
            if (index >= 0) {
                entry.listeners.splice(index, 1);
            }
        };
    };
    CPlayerManager.prototype.GetOrCreateEntry = function (steamID) {
        var _a;
        var _b;
        return (_a = (_b = this.entries)[steamID]) !== null && _a !== void 0 ? _a : (_b[steamID] = {
            steamID: steamID,
            status: "idle",
            lastSuccessTime: -PLAYER_INFO_CACHE_INTERVAL,
            listeners: [],
        });
    };
    CPlayerManager.prototype.Notify = function (entry) {
        for (var _i = 0, _a = __spreadArray([], entry.listeners, true); _i < _a.length; _i++) {
            var listener = _a[_i];
            try {
                listener();
            }
            catch (error) {
                if (Game.IsInToolsMode()) {
                    $.Msg("[PlayerManager] listener failed: ".concat(error));
                }
            }
        }
    };
    CPlayerManager.prototype.NormalizeSteamID = function (raw) {
        if (raw == undefined)
            return undefined;
        var text = String(raw);
        if (!/^\d+$/.test(text))
            return undefined;
        var value = Number(text);
        return value > 0 ? value : undefined;
    };
    CPlayerManager.prototype.NormalizeSteam64ID = function (raw) {
        if (raw == undefined)
            return undefined;
        var text = String(raw);
        if (!/^\d+$/.test(text) || text.length <= 4)
            return undefined;
        return this.NormalizeSteamID(Number(text.substring(4)) - 1197960265728);
    };
    CPlayerManager.prototype.ReconstructByKey = function (data, key) {
        var result = {};
        if (data == undefined)
            return result;
        for (var _i = 0, _a = Object.values(data); _i < _a.length; _i++) {
            var value = _a[_i];
            if (value == undefined || typeof value != "object")
                continue;
            var id = value[key];
            if (id == undefined)
                continue;
            result[String(id)] = value;
        }
        return result;
    };
    CPlayerManager.prototype.NormalizeShowRoomData = function (data) {
        var _a;
        var _b;
        var result = {};
        if (data == undefined)
            return result;
        for (var _i = 0, _c = Object.values(data); _i < _c.length; _i++) {
            var value = _c[_i];
            if (value == undefined || typeof value != "object")
                continue;
            var showType = value.show_type;
            var slot = value.slot;
            if (showType == undefined || slot == undefined)
                continue;
            var key = "".concat(showType, "-").concat(slot);
            if (value.id === 0) {
                result[key] = "nil";
                continue;
            }
            var parsed = {};
            if (typeof value.details == "string") {
                try {
                    var decoded = JSON.parse(value.details);
                    parsed = Array.isArray(decoded) ? (_b = decoded[0]) !== null && _b !== void 0 ? _b : {} : decoded !== null && decoded !== void 0 ? decoded : {};
                }
                catch (_) {
                    parsed = {};
                }
            }
            else if (value[showType] != undefined) {
                parsed = value[showType];
            }
            result[key] = (_a = {
                    show_type: showType,
                    slot: slot,
                    id: value.id
                },
                _a[showType] = parsed,
                _a);
        }
        return result;
    };
    CPlayerManager.prototype.ExtractShowRoomData = function (data) {
        if ((data === null || data === void 0 ? void 0 : data.player_show_rooms) != undefined)
            return data.player_show_rooms;
        if ((data === null || data === void 0 ? void 0 : data.show_room) != undefined)
            return data.show_room;
        if ((data === null || data === void 0 ? void 0 : data.show_rooms) != undefined)
            return data.show_rooms;
        if (data == undefined || typeof data != "object")
            return undefined;
        var rows = Object.values(data).filter(function (value) {
            return value != undefined && typeof value == "object" && value.show_type != undefined && value.slot != undefined;
        });
        return rows.length > 0 ? rows : undefined;
    };
    CPlayerManager.prototype.NormalizeEquipments = function (data) {
        var result = {};
        if (data == undefined)
            return result;
        var _loop_1 = function (value) {
            if (value == undefined || value == "nil")
                return "continue";
            if (Array.isArray(value)) {
                var id_1 = value[0];
                if (id_1 != undefined)
                    result[String(id_1)] = value;
                return "continue";
            }
            if (typeof value != "object")
                return "continue";
            var id = value.id;
            if (id == undefined)
                return "continue";
            result[String(id)] = PLAYER_EQUIPMENT_SIMPLIFY_KEYS.map(function (key) { return value[key]; });
        };
        for (var _i = 0, _a = Object.values(data); _i < _a.length; _i++) {
            var value = _a[_i];
            _loop_1(value);
        }
        return result;
    };
    CPlayerManager.prototype.NormalizePlayerInfoData = function (rawData, steamID) {
        var data = rawData !== null && rawData !== void 0 ? rawData : {};
        var showRoomData = this.ExtractShowRoomData(data);
        return __assign(__assign({}, data), { steamID: steamID, player_account_levels: data.player_account_levels != undefined ? this.ReconstructByKey(data.player_account_levels, "account_type") : data.player_account_levels, player_heroes: data.player_heroes != undefined ? this.ReconstructByKey(data.player_heroes, "hero_id") : data.player_heroes, player_achievements: data.player_achievements != undefined ? this.ReconstructByKey(data.player_achievements, "task_id") : data.player_achievements, player_cosmetic_equips: data.player_cosmetic_equips != undefined ? this.ReconstructByKey(data.player_cosmetic_equips, "slot_id") : data.player_cosmetic_equips, player_key_values: data.player_key_values != undefined ? this.ReconstructByKey(data.player_key_values, "key") : data.player_key_values, player_idle_game_fishes: data.player_idle_game_fishes != undefined ? this.ReconstructByKey(data.player_idle_game_fishes, "id") : data.player_idle_game_fishes, player_weapons: data.player_weapons != undefined ? this.ReconstructByKey(data.player_weapons, "weapon_id") : data.player_weapons, player_couriers: data.player_couriers != undefined ? this.ReconstructByKey(data.player_couriers, "courier_id") : data.player_couriers, player_equipments: data.player_equipments != undefined ? this.NormalizeEquipments(data.player_equipments) : data.player_equipments, player_counters: data.player_counters != undefined ? this.ReconstructByKey(data.player_counters, "counter_type") : data.player_counters, player_show_rooms: this.NormalizeShowRoomData(showRoomData !== null && showRoomData !== void 0 ? showRoomData : {}) });
    };
    return CPlayerManager;
}());
var playerManager = GameUI.CustomUIConfig().PlayerManager;
if (playerManager != undefined) {
    Object.setPrototypeOf(playerManager, CPlayerManager.prototype);
}
else {
    GameUI.CustomUIConfig().PlayerManager = new CPlayerManager();
}